const { test, expect } = require("@playwright/test");
const {
  PUBLIC_ORIGIN,
  installCandidateAtProductionOrigin,
} = require("./helpers/candidate-staging-origin");
const {
  buildUniqueEmail,
  waitForVerificationCode,
} = require("./helpers/resend-verification");

test.use({ trace: "off", screenshot: "off", video: "off" });

const ENROLLMENT_API_PATHS = new Set([
  "/v1/account/passkeys/registration/options",
  "/v1/account/passkeys/registration/verify",
  "/v1/authentication/passkeys/options",
  "/v1/authentication/passkeys/verify",
  "/v1/authentication/session",
  "/v1/account/community-commitment",
]);

function observeEnrollmentApi(page) {
  const results = [];
  page.on("response", (response) => {
    const pathname = new URL(response.url()).pathname;
    if (!ENROLLMENT_API_PATHS.has(pathname)) return;
    results.push(
      `${response.request().method()} ${pathname} -> ${response.status()}`
    );
  });
  return results;
}

async function expectViewOrExplain({
  success,
  visibleError,
  operation,
  apiResults,
}) {
  try {
    await expect(success).toBeVisible({ timeout: 15_000 });
  } catch (assertionError) {
    const errorIsVisible = await visibleError.isVisible().catch(() => false);
    const errorText = errorIsVisible
      ? (await visibleError.textContent()) || ""
      : "";
    const apiSummary = apiResults.length
      ? apiResults.join(", ")
      : "no matching API response captured";
    const uiSummary = errorText.trim()
      ? ` UI error: ${errorText.trim()}.`
      : " No visible UI error was shown.";
    throw new Error(`${operation} did not reach its success state.${uiSummary} API: ${apiSummary}`, {
      cause: assertionError,
    });
  }
}

test.describe("staging account enrollment", () => {
  test("completes email, password, passkey, and authenticated session", async ({
    page,
  }) => {
    const emailTemplate = process.env.TOWN_E2E_EMAIL_BASE;
    const resendApiKey = process.env.TOWN_RESEND_API_KEY;
    test.skip(!emailTemplate || !resendApiKey, "Staging enrollment secrets are not configured");

    await installCandidateAtProductionOrigin(page);

    const cdp = await page.context().newCDPSession(page);
    await cdp.send("WebAuthn.enable");
    await cdp.send("WebAuthn.addVirtualAuthenticator", {
      options: {
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      },
    });

    const runTag = [
      "gh",
      process.env.GITHUB_RUN_ID || Date.now(),
      process.env.GITHUB_RUN_ATTEMPT || "1",
    ].join("-");
    const email = buildUniqueEmail(emailTemplate, runTag);
    const password = `Town-E2E-${runTag}-secure!`;
    const enrollmentApiResults = observeEnrollmentApi(page);

    await page.goto(`${PUBLIC_ORIGIN}/#/feed`);
    await expect(page.locator("#view-feed")).toBeVisible();

    const seeToo = page
      .locator(
        '[data-feed-index]:visible [data-feed-role="feed-see-too"]:visible'
      )
      .first();
    await expect(seeToo).toBeVisible();
    await expect(seeToo).toHaveText(/I SEE THIS TOO/i);
    await seeToo.click();

    await expect(page.locator("#membership-invite")).toBeVisible();
    await page.locator("#invite-continue").click();
    await expect(page.locator("#view-membership")).toBeVisible();
    await page.locator("#membership-continue").click();
    await expect(page.locator("#view-account")).toBeVisible();
    await page.locator("#account-continue").click();

    await expect(page.locator("#view-email")).toBeVisible();
    await page.locator("#email-input").fill(email);
    const requestedAfter = new Date().toISOString();
    await page.locator("#email-continue").click();
    await expect(page.locator("#view-code")).toBeVisible();

    const code = await waitForVerificationCode({
      apiKey: resendApiKey,
      recipient: email,
      requestedAfter,
    });
    await page.locator("#code-input").fill(code);
    await page.locator("#code-verify").click();

    await expect(page.locator("#view-password")).toBeVisible();
    await page.locator("#password-input").fill(password);
    await page.locator("#password-confirm").fill(password);
    await page.locator("#password-continue").click();

    await expect(page.locator("#view-passkey")).toBeVisible();
    await page.locator("#passkey-create").click();
    await expectViewOrExplain({
      success: page.locator("#view-ready"),
      visibleError: page.locator("#passkey-error"),
      operation: "Passkey registration",
      apiResults: enrollmentApiResults,
    });
    expect(enrollmentApiResults).toContain(
      "POST /v1/account/passkeys/registration/options -> 200"
    );
    expect(enrollmentApiResults).toContain(
      "POST /v1/account/passkeys/registration/verify -> 200"
    );

    await page.locator("#ready-continue").click();
    await expectViewOrExplain({
      success: page.locator("#view-commitment"),
      visibleError: page.locator("#ready-error"),
      operation: "Post-registration passkey authentication",
      apiResults: enrollmentApiResults,
    });
    expect(enrollmentApiResults).toContain(
      "POST /v1/authentication/passkeys/options -> 200"
    );
    expect(enrollmentApiResults).toContain(
      "POST /v1/authentication/passkeys/verify -> 200"
    );
    expect(enrollmentApiResults).toContain(
      "GET /v1/authentication/session -> 200"
    );
    expect(enrollmentApiResults).toContain(
      "GET /v1/account/community-commitment -> 200"
    );
  });
});

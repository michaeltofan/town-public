const { test, expect } = require("@playwright/test");
const { installStagingApiProxy } = require("./helpers/staging-api-proxy");
const {
  buildUniqueEmail,
  waitForVerificationCode,
} = require("./helpers/resend-verification");

test.use({ trace: "off", screenshot: "off", video: "off" });

test.describe("staging account enrollment", () => {
  test("completes email, password, passkey, and authenticated session", async ({
    page,
  }) => {
    const emailTemplate = process.env.TOWN_E2E_EMAIL_BASE;
    const resendApiKey = process.env.TOWN_RESEND_API_KEY;
    test.skip(!emailTemplate || !resendApiKey, "Staging enrollment secrets are not configured");

    await installStagingApiProxy(page);

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

    await page.goto("/#/membership");
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
    await expect(page.locator("#passkey-success")).toBeVisible();
    await page.locator("#passkey-continue").click();

    await expect(page.locator("#view-ready")).toBeVisible();
    const authenticatedRequest = page.waitForResponse(
      (response) =>
        response.url().includes("/v1/account/community-commitment") &&
        response.status() === 200
    );
    await page.locator("#ready-continue").click();
    await authenticatedRequest;
    await expect(page.locator("#view-commitment")).toBeVisible();
  });
});

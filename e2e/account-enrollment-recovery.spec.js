const { test, expect } = require("@playwright/test");
const {
  PUBLIC_ORIGIN,
  installCandidateAtProductionOrigin,
} = require("./helpers/candidate-staging-origin");

async function installVerificationStub(page) {
  let requestCount = 0;

  await page.route(
    "https://api.towncivic.org/v1/account/email-verifications/complete",
    async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          error: { code: "INVALID_OR_EXPIRED_CHALLENGE" },
        }),
      });
    }
  );

  await page.route(
    "https://api.towncivic.org/v1/account/email-verifications",
    async (route) => {
      requestCount += 1;
      await route.fulfill({
        status: 202,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            status: "VERIFICATION_REQUEST_ACCEPTED",
            verificationId: `verification-${requestCount}`,
          },
        }),
      });
    }
  );

  return () => requestCount;
}

async function reachVerificationCode(page, email) {
  await page.goto(`${PUBLIC_ORIGIN}/#/feed`);
  const seeToo = page
    .locator(
      '[data-feed-index]:visible [data-feed-role="feed-see-too"]:visible'
    )
    .first();
  await expect(seeToo).toBeVisible();
  await seeToo.click();
  await page.locator("#invite-continue").click();
  await page.locator("#membership-continue").click();
  await page.locator("#account-continue").click();
  await page.locator("#email-input").fill(email);
  await page.locator("#email-continue").click();
  await expect(page.locator("#view-code")).toBeVisible();
}

test.describe("account enrollment recovery", () => {
  test.beforeEach(async ({ page }) => {
    await installCandidateAtProductionOrigin(page);
  });

  test("reload restarts safely from email without persisting a setup grant", async ({
    page,
  }) => {
    const requestCount = await installVerificationStub(page);
    const email = "refresh-recovery@example.com";

    await reachVerificationCode(page, email);
    expect(requestCount()).toBe(1);

    await page.reload();

    await expect(page.locator("#view-email")).toBeVisible();
    await expect(page.locator("#email-error")).toContainText(
      /secure setup was interrupted/i
    );
    await expect(page.locator("#email-input")).toHaveValue("");

    await page.locator("#email-input").fill(email);
    await page.locator("#email-continue").click();
    await expect(page.locator("#view-code")).toBeVisible();
    expect(requestCount()).toBe(2);
  });

  test("expired code offers a new code and preserves the entered email", async ({
    page,
  }) => {
    const requestCount = await installVerificationStub(page);
    const email = "expired-code-recovery@example.com";

    await reachVerificationCode(page, email);
    await page.locator("#code-input").fill("000000");
    await page.locator("#code-verify").click();

    await expect(page.locator("#code-error")).toContainText(
      /incorrect or has expired/i
    );
    await expect(page.locator("#code-change-email")).toContainText(
      /request a new code/i
    );
    await page.locator("#code-change-email").click();

    await expect(page.locator("#view-email")).toBeVisible();
    await expect(page.locator("#email-input")).toHaveValue(email);
    await page.locator("#email-continue").click();
    await expect(page.locator("#view-code")).toBeVisible();
    expect(requestCount()).toBe(2);
  });
});

const { test, expect } = require("@playwright/test");
const { installStagingApiProxy } = require("./helpers/staging-api-proxy");

test.describe("Etapa 3 member nav + feed states", () => {
  test.beforeEach(async ({ page }) => {
    await installStagingApiProxy(page);
  });

  test("feed shows live panels or an honest empty/retry state", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const panels = page.locator("[data-feed-index]");
    const feedState = page.locator("#feed-state");
    const retry = page.locator("#feed-state-retry");
    const status = page.locator("#feed-live-status");

    await expect(status).toBeAttached();

    const panelCount = await panels.count();
    if (panelCount > 0) {
      await expect(panels.first()).toBeVisible();
      await expect(feedState).toBeHidden();
    } else {
      await expect(feedState).toBeVisible();
      await expect(retry).toBeVisible();
      await expect(page.locator("#feed-state-title")).not.toHaveText("");
    }
  });

  test("CHAT is unavailable; MEMBERSHIP opens auth for visitors", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const chat = page.locator("#nav-chat");
    await expect(chat).toHaveClass(/is-unavailable/);
    await chat.click();
    await expect(page.locator("#feed-live-status")).toContainText(
      /not available|noch nicht|non è ancora|nu este încă|aún no/i
    );
    await expect(page.locator("#auth-window")).toBeHidden();

    await page.locator("#nav-membership").click();
    await expect(page.locator("#auth-window")).toBeVisible();
    await expect(page.locator("#auth-window-title")).toBeVisible();
  });

  test("desktop MEMBERSHIP still opens auth for visitors", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.locator("#nav-membership").click();
    await expect(page.locator("#auth-window")).toBeVisible();
  });
});

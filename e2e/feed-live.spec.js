const { test, expect } = require("@playwright/test");

test.describe("public feed live signals", () => {
  test("loads live feed panels without fictional fallback text", async ({
    page,
  }) => {
    const signalResponses = [];
    page.on("response", (response) => {
      const url = response.url();
      if (url.includes("/v1/communities/") && url.includes("/signals")) {
        signalResponses.push({
          url,
          status: response.status(),
        });
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(signalResponses.length).toBeGreaterThan(0);
    const pageHost = new URL(process.env.TOWN_PUBLIC_BASE_URL || "https://towncivic.org").hostname;
    const expectedApiHost =
      pageHost === "localhost" || pageHost === "127.0.0.1"
        ? "api-staging.towncivic.org"
        : "api.towncivic.org";
    expect(
      signalResponses.every((item) => item.url.includes(expectedApiHost))
    ).toBeTruthy();
    expect(signalResponses.some((item) => item.status === 200)).toBeTruthy();

    const panels = page.locator('[data-feed-index]');
    const status = page.locator("#feed-live-status");
    await expect(status).toBeVisible();

    const panelCount = await panels.count();
    if (panelCount > 0) {
      await expect(panels.first()).toBeVisible();
      await expect(status).not.toContainText("Couldn't reach TOWN");
    } else {
      await expect(status).toContainText(/Couldn't reach TOWN|try again/i);
    }
  });
});

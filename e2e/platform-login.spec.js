const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

function readOperatorCredentials() {
  const email = process.env.TOWN_PLATFORM_EMAIL;
  const password = process.env.TOWN_PLATFORM_PASSWORD;
  if (email && password) {
    return { email, password };
  }
  const artifact = "/opt/cursor/artifacts/platform-login.txt";
  if (!fs.existsSync(artifact)) {
    return null;
  }
  const text = fs.readFileSync(artifact, "utf8");
  const out = {};
  for (const line of text.split("\n")) {
    if (line.startsWith("Email:")) out.email = line.slice(6).trim();
    if (line.startsWith("Password:")) out.password = line.slice(9).trim();
  }
  if (out.email && out.password) return out;
  return null;
}

test.describe("platform console login", () => {
  test("signs in against production API and opens Monitor", async ({ page }) => {
    const credentials = readOperatorCredentials();
    test.skip(
      !credentials,
      "Set TOWN_PLATFORM_EMAIL/PASSWORD or provide platform-login artifact"
    );

    const apiCalls = [];
    page.on("request", (request) => {
      const url = request.url();
      if (url.includes("api.towncivic.org")) {
        apiCalls.push(url);
      }
    });

    await page.goto("/platform/");
    await expect(page.locator("#gate")).toBeVisible();
    await expect(page.locator("#platform-email")).toBeVisible();

    await page.fill("#platform-email", credentials.email);
    await page.fill("#platform-password", credentials.password);
    await page.click("#platform-sign-in");

    await expect(page.locator("#console")).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("#operator-role")).toContainText(/role_/i);
    await expect(page.locator("#status-components")).toBeVisible();

    expect(
      apiCalls.some((url) => url.includes("/v1/authentication/password"))
    ).toBeTruthy();
    expect(
      apiCalls.some((url) => url.includes("/v1/platform/session"))
    ).toBeTruthy();
    expect(
      apiCalls.every((url) => url.startsWith("https://api.towncivic.org"))
    ).toBeTruthy();
  });
});

const { defineConfig } = require("@playwright/test");

const baseURL = process.env.TOWN_PUBLIC_BASE_URL || "https://towncivic.org";

module.exports = defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.js",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});

async function installStagingApiProxy(page) {
  const baseURL = process.env.TOWN_PUBLIC_BASE_URL || "https://towncivic.org";
  const hostname = new URL(baseURL).hostname;
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    return;
  }

  await page.route("https://api-staging.towncivic.org/**", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        "access-control-allow-origin": baseURL,
        "access-control-allow-credentials": "true",
        vary: "Origin",
      },
    });
  });
}

module.exports = { installStagingApiProxy };

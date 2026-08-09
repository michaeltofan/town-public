"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const PUBLIC_ORIGIN = "https://towncivic.org";
const PRODUCTION_API_ORIGIN = "https://api.towncivic.org";
const STAGING_API_ORIGIN = "https://api-staging.towncivic.org";
const repositoryRoot = path.resolve(__dirname, "..", "..");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function candidatePath(url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(repositoryRoot, relative);
  if (resolved !== repositoryRoot && !resolved.startsWith(`${repositoryRoot}${path.sep}`)) {
    throw new Error("Candidate asset path escaped the repository root");
  }
  return resolved;
}

async function installCandidateAtProductionOrigin(page) {
  await page.route(`${PUBLIC_ORIGIN}/**`, async (route) => {
    if (route.request().method() !== "GET") {
      await route.abort();
      return;
    }
    try {
      const file = candidatePath(route.request().url());
      const body = await fs.readFile(file);
      await route.fulfill({
        status: 200,
        body,
        contentType: contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
      });
    } catch (error) {
      if (error && error.code === "ENOENT") {
        await route.fulfill({ status: 404, body: "Not found" });
        return;
      }
      throw error;
    }
  });

  await page.route(`${PRODUCTION_API_ORIGIN}/**`, async (route) => {
    const request = route.request();
    const stagingUrl = request.url().replace(PRODUCTION_API_ORIGIN, STAGING_API_ORIGIN);
    const response = await route.fetch({
      url: stagingUrl,
      headers: {
        ...request.headers(),
        origin: PUBLIC_ORIGIN,
      },
    });
    await route.fulfill({
      response,
      headers: {
        ...response.headers(),
        "access-control-allow-origin": PUBLIC_ORIGIN,
        "access-control-allow-credentials": "true",
        vary: "Origin",
      },
    });
  });
}

module.exports = {
  PUBLIC_ORIGIN,
  candidatePath,
  installCandidateAtProductionOrigin,
};

/**
 * Smoke + behavioral checks for the single active API base.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "api-base.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const platformHtml = fs.readFileSync(
  path.join(root, "platform/index.html"),
  "utf8"
);
const platformJs = fs.readFileSync(
  path.join(root, "platform/platform.js"),
  "utf8"
);
const productJs = fs.readFileSync(path.join(root, "script.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(html.includes('src="api-base.js'), "product loads api-base.js");
assert(
  platformHtml.includes('src="../api-base.js"'),
  "platform console loads shared api-base.js"
);
assert(
  platformJs.includes("resolveApiBaseSafe"),
  "platform console uses fail-closed resolver"
);
assert(
  platformJs.includes("api_base_misconfigured"),
  "platform console blocks requests when API base is unavailable"
);
assert(
  !platformJs.includes("productionPageUsesStagingApi"),
  "platform console has no cutover messaging helper"
);
assert(
  !platformJs.includes('var API_BASE = "https://api-staging.towncivic.org"'),
  "platform console no longer hardcodes staging API"
);
assert(
  !productJs.includes('const API_BASE = "https://api-staging.towncivic.org"'),
  "product no longer hardcodes staging API"
);
assert(
  productJs.includes("resolveApiBaseSafe"),
  "product uses fail-closed resolver"
);
assert(source.includes("ACTIVE_API_BASE"), "single active API constant present");
assert(
  !source.includes("PRODUCTION_PAGE_API_BASE"),
  "cutover production-page constant removed"
);
assert(
  readme.includes("https://towncivic.org/platform/"),
  "README documents the one console URL"
);
assert(
  !readme.includes("town-public-staging-staging.up.railway.app/platform"),
  "README does not push Railway as operator login URL"
);

const sandbox = { window: {}, globalThis: {} };
sandbox.globalThis = sandbox;
vm.runInNewContext(source, sandbox);
const TownApiBase = sandbox.window.TownApiBase || sandbox.TownApiBase;
assert(!!TownApiBase, "TownApiBase exported");

const active = TownApiBase.ACTIVE_API_BASE;
assert(
  active === "https://api-staging.towncivic.org",
  "active API is staging for this phase"
);

assert(
  TownApiBase.resolveApiBase("towncivic.org") === active,
  "towncivic.org → active API"
);
assert(
  TownApiBase.resolveApiBase("www.towncivic.org") === active,
  "www → active API"
);
assert(
  TownApiBase.resolveApiBase("localhost") === active,
  "localhost → active API"
);
assert(
  TownApiBase.resolveApiBase("town-public-staging-staging.up.railway.app") ===
    active,
  "railway host → active API"
);

const safe = TownApiBase.resolveApiBaseSafe("towncivic.org");
assert(safe.ok === true, "safe resolve ok");
assert(safe.apiBase === active, "safe resolve returns active API");

assert(
  TownApiBase.allowApiBaseForHost("towncivic.org", active),
  "active API allowed"
);
assert(
  !TownApiBase.allowApiBaseForHost(
    "towncivic.org",
    "https://api.towncivic.org"
  ),
  "inactive production API refused while staging is active"
);
assert(
  !TownApiBase.allowApiBaseForHost("towncivic.org", ""),
  "empty API refused"
);
assert(
  TownApiBase.isStagingApiBase(active),
  "active API detected as staging"
);
assert(
  !TownApiBase.isProductionApiBase(active),
  "active staging API is not production"
);

console.log("PASSED: " + passed + " api-base assertions");

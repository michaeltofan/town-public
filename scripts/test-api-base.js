/**
 * Smoke + behavioral checks for host-aware API base routing.
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
assert(source.includes("ACTIVE_API_BASE"), "active API constant present");
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

const production = "https://api.towncivic.org";
const staging = "https://api-staging.towncivic.org";
assert(
  TownApiBase.ACTIVE_API_BASE === production,
  "ACTIVE_API_BASE default is production"
);

assert(
  TownApiBase.resolveApiBase("towncivic.org") === production,
  "towncivic.org → production API"
);
assert(
  TownApiBase.resolveApiBase("www.towncivic.org") === production,
  "www → production API"
);
assert(
  TownApiBase.resolveApiBase("localhost") === staging,
  "localhost → staging API"
);
assert(
  TownApiBase.resolveApiBase("town-public-staging-staging.up.railway.app") ===
    staging,
  "railway staging host → staging API"
);

const safe = TownApiBase.resolveApiBaseSafe("towncivic.org");
assert(safe.ok === true, "safe resolve ok");
assert(safe.apiBase === production, "safe resolve returns production API");

assert(
  TownApiBase.allowApiBaseForHost("towncivic.org", production),
  "production API allowed on production host"
);
assert(
  !TownApiBase.allowApiBaseForHost("towncivic.org", staging),
  "staging API refused on production host"
);
assert(
  TownApiBase.allowApiBaseForHost(
    "town-public-staging-staging.up.railway.app",
    staging
  ),
  "staging API allowed on staging host"
);
assert(
  !TownApiBase.allowApiBaseForHost(
    "town-public-staging-staging.up.railway.app",
    production
  ),
  "production API refused on staging host"
);
assert(
  !TownApiBase.allowApiBaseForHost("towncivic.org", ""),
  "empty API refused"
);
assert(
  TownApiBase.isProductionApiBase(production),
  "production API detected"
);
assert(TownApiBase.isStagingApiBase(staging), "staging API detected");

console.log("PASSED: " + passed + " api-base assertions");

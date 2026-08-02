/**
 * Smoke + behavioral checks for hostname → API base resolution.
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

const sandbox = { window: {}, globalThis: {} };
sandbox.globalThis = sandbox;
vm.runInNewContext(source, sandbox);
const TownApiBase = sandbox.window.TownApiBase || sandbox.TownApiBase;
assert(!!TownApiBase, "TownApiBase exported");

assert(
  TownApiBase.resolveApiBase("towncivic.org") ===
    "https://api.towncivic.org",
  "production host → production API"
);
assert(
  TownApiBase.resolveApiBase("www.towncivic.org") ===
    "https://api.towncivic.org",
  "www production host → production API"
);
assert(
  TownApiBase.resolveApiBase("localhost") ===
    "https://api-staging.towncivic.org",
  "localhost → staging API"
);
assert(
  TownApiBase.resolveApiBase("town-public-staging.up.railway.app") ===
    "https://api-staging.towncivic.org",
  "railway staging host → staging API"
);

const prodSafe = TownApiBase.resolveApiBaseSafe("towncivic.org");
assert(prodSafe.ok === true, "production host resolves safely");
assert(
  prodSafe.apiBase === "https://api.towncivic.org",
  "production safe base is production API"
);

const stagingSafe = TownApiBase.resolveApiBaseSafe("localhost");
assert(stagingSafe.ok === true, "staging host resolves safely");
assert(
  stagingSafe.apiBase === "https://api-staging.towncivic.org",
  "staging safe base is staging API"
);

assert(
  TownApiBase.isProductionHost("towncivic.org"),
  "towncivic.org is production host"
);
assert(
  !TownApiBase.isProductionHost("api-staging.towncivic.org"),
  "API staging host is not a production page host"
);
assert(
  TownApiBase.isStagingApiBase("https://api-staging.towncivic.org"),
  "staging API detector"
);
assert(
  !TownApiBase.isStagingApiBase("https://api.towncivic.org"),
  "production API is not staging"
);

assert(
  TownApiBase.allowApiBaseForHost(
    "towncivic.org",
    "https://api.towncivic.org"
  ),
  "production host allows production API"
);
assert(
  !TownApiBase.allowApiBaseForHost(
    "towncivic.org",
    "https://api-staging.towncivic.org"
  ),
  "production host refuses staging API"
);
assert(
  !TownApiBase.allowApiBaseForHost("towncivic.org", ""),
  "production host refuses empty API"
);
assert(
  TownApiBase.allowApiBaseForHost(
    "localhost",
    "https://api-staging.towncivic.org"
  ),
  "non-production host may use staging API"
);

console.log("PASSED: " + passed + " api-base assertions");

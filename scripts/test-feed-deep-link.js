/**
 * Structural checks for #/feed/<signalSlug> deep links (Pilot Madrid M6).
 * Full behavioral coverage lives in the Playwright E2E suite; this guards
 * the source-level wiring so a refactor can't silently drop it.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(
  /pendingFeedDeepLinkSlug\s*=\s*null;/.test(source),
  "pendingFeedDeepLinkSlug is declared"
);
assert(
  source.includes(
    'const deepLinkMatch = /^feed\\/([a-z0-9-]{1,128})$/.exec(raw);'
  ),
  "parseRoute extracts the signal slug from #/feed/<slug>"
);
assert(
  source.includes("pendingFeedDeepLinkSlug = deepLinkMatch ? deepLinkMatch[1] : null;"),
  "parseRoute stores the parsed slug"
);
assert(
  /current === target ||\s*\n\s*\/\^#\\\/feed\\\/\[a-z0-9-\]\{1,128\}\$\/\.test\(current\)/.test(
    source
  ),
  "ensureProductOnlyFeedHash preserves a valid #/feed/<slug> hash instead of collapsing it"
);
assert(
  source.includes("function resolvePendingFeedDeepLink()"),
  "resolvePendingFeedDeepLink is defined"
);
assert(
  /scene && scene\.id === pendingFeedDeepLinkSlug/.test(source),
  "resolvePendingFeedDeepLink matches on scene.id (the signal slug)"
);

// Called from both the render() product-only branch and after live scenes load.
const renderCallSite = source.indexOf("resolvePendingFeedDeepLink();\n      showView(PRODUCT_ONLY_FEED_ROUTE);");
assert(renderCallSite !== -1, "render() resolves the deep link before showing the feed");

const loadCallSite = source.indexOf(
  "resolvePendingFeedDeepLink();\n    if (currentScenes().length) {"
);
assert(
  loadCallSite !== -1,
  "loadProductOnlyLiveFeed() resolves the deep link once scenes are loaded"
);

console.log("PASSED: " + passed + " feed-deep-link assertions");

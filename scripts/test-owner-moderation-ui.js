/**
 * Smoke assertions for owner moderation UI wiring.
 * Covers existing hide/unhide + ban/unban tools only — no approval queue / report UI.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const recovery = fs.readFileSync(path.join(root, "membership-recovery.js"), "utf8");

let passed = 0;
function assert(cond, message) {
  if (!cond) {
    console.error("FAIL:", message);
    process.exit(1);
  }
  passed += 1;
  console.log("OK:", message);
}

assert(html.includes('id="owner-moderation"'), "moderation sheet present");
assert(html.includes('id="profile-moderation"'), "profile moderation CTA present");
assert(html.includes('id="owner-moderation-reason"'), "reason select present");
assert(html.includes('id="owner-moderation-signals-list"'), "signals list present");
assert(html.includes('id="owner-moderation-accounts-list"'), "suspended accounts list present");

assert(js.includes("function canUseOwnerModeration"), "owner gate helper");
assert(js.includes("function openOwnerModeration"), "open helper");
assert(js.includes("function runOwnerModerationAction"), "action helper");
assert(js.includes('/v1/signals/"') || js.includes("/v1/signals/"), "hide/unhide path");
assert(js.includes("/hide"), "hide endpoint");
assert(js.includes("/unhide"), "unhide endpoint");
assert(js.includes("/ban"), "ban endpoint");
assert(js.includes("/unban"), "unban endpoint");
assert(
  js.includes("/v1/communities/") && js.includes("/moderation/signals"),
  "owner signals inventory path"
);
assert(js.includes("/v1/moderation/accounts/suspended"), "suspended inventory path");
assert(js.includes('"immoral"'), "fixed reason categories");
assert(js.includes("isOwnerAccount"), "uses membership isOwner");
assert(!js.includes("pending_review"), "does not introduce approval queue");
assert(!js.includes("/report"), "does not introduce report UI");

assert(recovery.includes("isOwner: data.isOwner === true"), "snapshot keeps isOwner");
assert(recovery.includes("function isOwnerAccount"), "recovery exposes isOwnerAccount");

assert(css.includes(".owner-moderation"), "moderation styles present");
assert(
  /script\.js\?v=[^"]+/.test(html),
  "cache buster present"
);

console.log("PASSED: " + passed + " owner moderation UI assertions");

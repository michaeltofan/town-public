/**
 * Static checks for public-site security hardening config.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

const caddy = fs.readFileSync(path.join(root, "Caddyfile"), "utf8");
assert(caddy.includes("frame-ancestors 'none'"), "CSP denies framing");
assert(caddy.includes('X-Frame-Options "DENY"'), "X-Frame-Options DENY");
assert(
  caddy.includes('Strict-Transport-Security "max-age=31536000"'),
  "HSTS enabled without premature includeSubDomains"
);
assert(caddy.includes("script-src 'self'"), "CSP script-src is self-only");
assert(!caddy.includes("script-src 'self' 'unsafe-inline'"), "no script unsafe-inline");
assert(
  caddy.includes("https://api.towncivic.org") &&
    caddy.includes("https://api-staging.towncivic.org"),
  "CSP connect-src allows both API hosts"
);
assert(caddy.includes("redir @www https://towncivic.org{uri} permanent"), "www redirects to apex");

const securityTxt = fs.readFileSync(
  path.join(root, ".well-known/security.txt"),
  "utf8"
);
assert(securityTxt.includes("Contact: mailto:"), "security.txt has Contact");
assert(securityTxt.includes("Expires:"), "security.txt has Expires");
assert(
  securityTxt.includes("Canonical: https://towncivic.org/.well-known/security.txt"),
  "security.txt Canonical points at live host"
);

const boundaryFiles = fs
  .readdirSync(root)
  .filter(
    (name) =>
      name.endsWith("-boundary.html") || name === "country.html"
  );
assert(boundaryFiles.length > 0, "boundary/country HTML files present");
for (const name of boundaryFiles) {
  const html = fs.readFileSync(path.join(root, name), "utf8");
  assert(!/<script[\s>]/i.test(html), name + " has no inline/external script");
  assert(/http-equiv="refresh"/i.test(html), name + " keeps meta refresh");
}

console.log("PASSED: " + passed + " security-headers-config assertions");

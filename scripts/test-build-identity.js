const fs = require("fs");
const os = require("os");
const path = require("path");
const childProcess = require("child_process");

const root = path.resolve(__dirname, "..");
const workflow = fs.readFileSync(
  path.join(root, ".github", "workflows", "e2e.yml"),
  "utf8"
);
const caddy = fs.readFileSync(path.join(root, "Caddyfile"), "utf8");
let passed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

assert(
  (workflow.match(/# build-identity-writer-begin/g) || []).length === 2,
  "both staging and production generate build identity before deployment"
);
assert(
  workflow.includes("TOWN_BUILD_SHA: ${{ github.sha }}"),
  "workflow uses the exact checked-out commit SHA"
);
assert(
  workflow.includes("TOWN_BUILD_REPOSITORY: ${{ github.repository }}"),
  "workflow records the source repository"
);
assert(
  workflow.includes("TOWN_BUILD_ENVIRONMENT: staging") &&
    workflow.includes("TOWN_BUILD_ENVIRONMENT: production"),
  "workflow records the deployment environment"
);
assert(
  workflow.includes('fs.writeFileSync("build-identity.json"'),
  "workflow writes the public identity into the deployed artifact"
);
assert(
  caddy.includes("@buildIdentity path /build-identity.json") &&
    caddy.includes('header @buildIdentity Cache-Control "no-store"'),
  "build identity is served without cache"
);

const writerMatch = workflow.match(
  /# build-identity-writer-begin\n([\s\S]*?)\n\s*# build-identity-writer-end/
);
assert(!!writerMatch, "build identity writer is extractable for testing");
const writerLines = writerMatch[1].split("\n");
assert(writerLines[0].trim() === "node <<'NODE'", "writer uses a literal heredoc");
assert(writerLines[writerLines.length - 1].trim() === "NODE", "writer heredoc terminates");
const writerSource = writerLines
  .slice(1, -1)
  .map((line) => line.replace(/^\s{10}/, ""))
  .join("\n");
assert(
  !/RAILWAY_TOKEN|PASSWORD|RESEND|SECRET|API_KEY/.test(writerSource),
  "writer cannot copy deployment secrets into the public artifact"
);

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "town-build-identity-"));
const writerPath = path.join(tempRoot, "writer.js");
fs.writeFileSync(writerPath, writerSource, "utf8");

const expectedSha = "0123456789abcdef0123456789abcdef01234567";
childProcess.execFileSync(process.execPath, [writerPath], {
  cwd: tempRoot,
  env: {
    PATH: process.env.PATH,
    TOWN_BUILD_SHA: expectedSha,
    TOWN_BUILD_ENVIRONMENT: "production",
    TOWN_BUILD_REPOSITORY: "michaeltofan/town-public",
    TOWN_BUILD_RUN_ID: "123456789",
  },
});

const identity = JSON.parse(
  fs.readFileSync(path.join(tempRoot, "build-identity.json"), "utf8")
);
assert(identity.service === "town-public", "artifact identifies the service");
assert(identity.environment === "production", "artifact identifies the environment");
assert(identity.repository === "michaeltofan/town-public", "artifact identifies repository");
assert(identity.commit === expectedSha, "artifact preserves the full exact SHA");
assert(identity.workflowRunId === "123456789", "artifact identifies the workflow run");
assert(!Number.isNaN(Date.parse(identity.builtAt)), "artifact has an ISO build timestamp");
assert(
  Object.keys(identity).sort().join(",") ===
    "builtAt,commit,environment,repository,service,workflowRunId",
  "artifact exposes only the approved fields"
);

fs.rmSync(tempRoot, { recursive: true, force: true });
console.log("PASSED: " + passed + " build-identity assertions");

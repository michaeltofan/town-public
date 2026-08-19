#!/usr/bin/env node
/**
 * TOWN Madrid pilot supervisor — operational readiness (built ≠ ready).
 *
 * Read-only. Inspects live API + Madrid hosts. Does not mutate platform state.
 *
 * Usage:
 *   node scripts/supervise-madrid-pilot.js
 *   node scripts/supervise-madrid-pilot.js --offline
 *   node scripts/supervise-madrid-pilot.js --offline --skip-units
 *   node scripts/supervise-madrid-pilot.js --json
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const https = require("https");
const http = require("http");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const MADRID_SLUG = "madrid-es";
const EXPECTED_SIGNAL_COUNT = 3;
const EXPECTED_STAGE = "confirmation";
const EXPECTED_THRESHOLD = 5;

const MADRID_SIGNAL_IDS = [
  "00000000-0000-4000-8000-000000001901",
  "00000000-0000-4000-8000-000000001902",
  "00000000-0000-4000-8000-000000001903",
];

const ENDPOINTS = {
  prodHost: "https://madrid.towncivic.org/",
  stagingHost: "https://madrid-staging.towncivic.org/",
  platform: "https://towncivic.org/platform/",
  prodReady: "https://api.towncivic.org/health/ready",
  stagingReady: "https://api-staging.towncivic.org/health/ready",
  prodActivity: "https://api.towncivic.org/v1/account/activity",
  stagingActivity: "https://api-staging.towncivic.org/v1/account/activity",
  prodSignals: `https://api.towncivic.org/v1/communities/${MADRID_SLUG}/signals`,
  stagingSignals: `https://api-staging.towncivic.org/v1/communities/${MADRID_SLUG}/signals`,
  prodCommunities: "https://api.towncivic.org/v1/communities",
  stagingCommunities: "https://api-staging.towncivic.org/v1/communities",
  prodCivic: (id) =>
    "https://api.towncivic.org/v1/signals/" + id + "/civic-process",
  stagingCivic: (id) =>
    "https://api-staging.towncivic.org/v1/signals/" + id + "/civic-process",
};

const LOCAL_MADRID_TESTS = [
  "scripts/test-madrid-pilot-host.js",
  "scripts/test-madrid-pilot-intro.js",
  "scripts/test-madrid-discussion-guide.js",
  "scripts/test-api-base.js",
  "scripts/test-spanish-localization.js",
  "scripts/test-member-chat-welcome.js",
];

const args = new Set(process.argv.slice(2));
const OFFLINE = args.has("--offline");
const AS_JSON = args.has("--json");
const SKIP_UNITS = args.has("--skip-units");

const findings = [];

function record(level, id, message, detail) {
  const row = { level: level, id: id, message: message };
  if (detail !== undefined) row.detail = detail;
  findings.push(row);
}

function fetchText(url, timeoutMs) {
  const timeout = timeoutMs || 15000;
  return new Promise(function (resolve, reject) {
    const lib = url.indexOf("https:") === 0 ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": "town-madrid-pilot-supervisor/2.0",
          Accept: "application/json,text/html,*/*",
        },
      },
      function (res) {
        const chunks = [];
        res.on("data", function (c) {
          chunks.push(c);
        });
        res.on("end", function () {
          resolve({
            status: res.statusCode || 0,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      }
    );
    req.setTimeout(timeout, function () {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

function signalList(payload) {
  if (!payload || typeof payload !== "object") return [];
  const data = payload.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.signals)) return data.signals;
  return [];
}

function loadTownApiBase() {
  const source = fs.readFileSync(path.join(ROOT, "api-base.js"), "utf8");
  const sandbox = { window: {}, globalThis: {} };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(source, sandbox);
  return sandbox.window.TownApiBase || sandbox.TownApiBase || null;
}

function checkLocalRouting() {
  const pilotHost = require(path.join(ROOT, "madrid-pilot-host.js"));
  if (pilotHost.isMadridPilotHost("madrid.towncivic.org")) {
    record("pass", "routing.host.prod", "madrid.towncivic.org is Madrid pilot host");
  } else {
    record("fail", "routing.host.prod", "madrid.towncivic.org should be Madrid pilot host");
  }
  if (pilotHost.isMadridPilotHost("madrid-staging.towncivic.org")) {
    record(
      "pass",
      "routing.host.staging",
      "madrid-staging.towncivic.org is Madrid pilot host"
    );
  } else {
    record(
      "fail",
      "routing.host.staging",
      "madrid-staging.towncivic.org should be Madrid pilot host"
    );
  }
  if (!pilotHost.isMadridPilotHost("towncivic.org")) {
    record("pass", "routing.host.apex", "towncivic.org is not Madrid-locked");
  } else {
    record("fail", "routing.host.apex", "towncivic.org must not be Madrid-locked");
  }

  const TownApiBase = loadTownApiBase();
  const staging = "https://api-staging.towncivic.org";
  const production = "https://api.towncivic.org";
  if (!TownApiBase || typeof TownApiBase.resolveApiBase !== "function") {
    record("fail", "routing.api.module", "TownApiBase failed to load");
    return;
  }
  if (TownApiBase.resolveApiBase("madrid-staging.towncivic.org") === staging) {
    record("pass", "routing.api.staging", "madrid-staging → staging API");
  } else {
    record("fail", "routing.api.staging", "madrid-staging must hit staging API");
  }
  if (TownApiBase.resolveApiBase("madrid.towncivic.org") === production) {
    record("pass", "routing.api.prod", "madrid.towncivic.org → production API");
  } else {
    record("fail", "routing.api.prod", "madrid.towncivic.org must hit production API");
  }
}

function runUnitSuite() {
  for (let i = 0; i < LOCAL_MADRID_TESTS.length; i++) {
    const rel = LOCAL_MADRID_TESTS[i];
    const result = spawnSync(process.execPath, [path.join(ROOT, rel)], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 60000,
    });
    if (result.status === 0) {
      record("pass", "unit." + path.basename(rel), rel + " passed");
    } else {
      record("fail", "unit." + path.basename(rel), rel + " failed", {
        status: result.status,
        stderr: String(result.stderr || "").slice(0, 400),
      });
    }
  }
}

async function checkReady(label, url) {
  try {
    const res = await fetchText(url);
    const payload = parseJsonSafe(res.body);
    if (res.status === 200 && payload && payload.status === "ready") {
      record("pass", "ops.ready." + label, url + " is ready");
      return;
    }
    record("fail", "ops.ready." + label, url + " not ready", {
      status: res.status,
      body: res.body.slice(0, 200),
    });
  } catch (err) {
    record("fail", "ops.ready." + label, "ready probe failed", String(err.message || err));
  }
}

async function checkActivityGate(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status === 401) {
      record(
        "pass",
        "ops.activity." + label,
        "anonymous activity correctly returns 401 (not 500)"
      );
      return;
    }
    if (res.status >= 500) {
      record("fail", "ops.activity." + label, "activity returned server error", {
        status: res.status,
        body: res.body.slice(0, 200),
      });
      return;
    }
    record("warn", "ops.activity." + label, "unexpected activity status " + res.status, {
      body: res.body.slice(0, 200),
    });
  } catch (err) {
    record(
      "fail",
      "ops.activity." + label,
      "activity probe failed",
      String(err.message || err)
    );
  }
}

async function checkHost(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status === 200) {
      record("pass", "ops.host." + label, url + " HTTP 200");
      return res.body;
    }
    record("fail", "ops.host." + label, url + " HTTP " + res.status);
    return null;
  } catch (err) {
    record("fail", "ops.host." + label, "host fetch failed", String(err.message || err));
    return null;
  }
}

async function checkCatalog(label, url) {
  try {
    const res = await fetchText(url);
    const payload = parseJsonSafe(res.body);
    const rows = payload && Array.isArray(payload.data) ? payload.data : [];
    const madrid = rows.find(function (row) {
      return row && row.slug === MADRID_SLUG;
    });
    if (!madrid) {
      record("fail", "ops.catalog." + label, "madrid-es missing from catalog");
      return;
    }
    if (madrid.countryCode !== "ES" || madrid.cityName !== "Madrid") {
      record("fail", "ops.catalog." + label, "madrid-es identity mismatch", madrid);
      return;
    }
    record("pass", "ops.catalog." + label, "madrid-es present (ES)");
  } catch (err) {
    record("fail", "ops.catalog." + label, "catalog failed", String(err.message || err));
  }
}

async function checkSignals(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status !== 200) {
      record("fail", "ops.signals." + label, url + " HTTP " + res.status);
      return [];
    }
    const signals = signalList(parseJsonSafe(res.body));
    if (signals.length !== EXPECTED_SIGNAL_COUNT) {
      record(
        "warn",
        "ops.signals." + label + ".count",
        "expected " + EXPECTED_SIGNAL_COUNT + " seed signals, found " + signals.length
      );
    } else {
      record(
        "pass",
        "ops.signals." + label + ".count",
        "Madrid feed has " + signals.length + " signals"
      );
    }
    const badLocale = signals.filter(function (s) {
      return s.locale && s.locale !== "es-ES";
    });
    if (badLocale.length) {
      record("fail", "ops.signals." + label + ".locale", "non es-ES locales in Madrid feed");
    } else if (signals.length) {
      record("pass", "ops.signals." + label + ".locale", "signal locales are es-ES");
    }
    return signals;
  } catch (err) {
    record("fail", "ops.signals." + label, "signals failed", String(err.message || err));
    return [];
  }
}

async function checkCivicProcess(label, urlForId) {
  let ok = 0;
  for (let i = 0; i < MADRID_SIGNAL_IDS.length; i++) {
    const id = MADRID_SIGNAL_IDS[i];
    const short = id.slice(-4);
    try {
      const res = await fetchText(urlForId(id));
      const payload = parseJsonSafe(res.body);
      const data = payload && payload.data;
      if (res.status !== 200 || !data) {
        record("fail", "ops.civic." + label + "." + short, "civic-process HTTP " + res.status, {
          body: res.body.slice(0, 180),
        });
        continue;
      }
      if (data.communitySlug !== MADRID_SLUG) {
        record("fail", "ops.civic." + label + "." + short, "unexpected communitySlug", data.communitySlug);
        continue;
      }
      if (data.currentStage !== EXPECTED_STAGE) {
        record("warn", "ops.civic." + label + "." + short + ".stage", "stage is " + data.currentStage, {
          confirmationCount: data.confirmationCount,
          transitionRule: data.transitionRule,
        });
      } else {
        record(
          "pass",
          "ops.civic." + label + "." + short + ".stage",
          "stage=confirmation count=" +
            data.confirmationCount +
            "/" +
            ((data.transitionRule && data.transitionRule.requiredConfirmations) ||
              EXPECTED_THRESHOLD)
        );
        ok += 1;
      }
      const required =
        data.transitionRule && data.transitionRule.requiredConfirmations;
      if (required && required !== EXPECTED_THRESHOLD) {
        record(
          "warn",
          "ops.civic." + label + "." + short + ".threshold",
          "requiredConfirmations=" + required + " (expected " + EXPECTED_THRESHOLD + ")"
        );
      }
    } catch (err) {
      record(
        "fail",
        "ops.civic." + label + "." + short,
        "civic-process probe failed",
        String(err.message || err)
      );
    }
  }
  if (ok === MADRID_SIGNAL_IDS.length) {
    record(
      "pass",
      "ops.civic." + label + ".summary",
      "all " + ok + " Madrid seed signals at confirmation"
    );
  }
}

async function checkPlatformShell() {
  try {
    const res = await fetchText(ENDPOINTS.platform);
    if (res.status === 200 && res.body.indexOf("Monitor") !== -1) {
      record("pass", "ops.platform.shell", "platform console shell reachable");
    } else if (res.status === 200) {
      record("warn", "ops.platform.shell", "platform HTML 200 but Monitor marker missing");
    } else {
      record("fail", "ops.platform.shell", "platform HTTP " + res.status);
    }
  } catch (err) {
    record("fail", "ops.platform.shell", "platform fetch failed", String(err.message || err));
  }

  const email = process.env.TOWN_PLATFORM_EMAIL;
  const password = process.env.TOWN_PLATFORM_PASSWORD;
  if (!email || !password) {
    record(
      "pass",
      "ops.platform.auth",
      "platform authenticated Monitor skipped (no TOWN_PLATFORM_EMAIL/PASSWORD)"
    );
  } else {
    record(
      "warn",
      "ops.platform.auth",
      "platform credentials present but authenticated Monitor not implemented in phase 1"
    );
  }
}

function summarize() {
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (let i = 0; i < findings.length; i++) {
    const level = findings[i].level;
    counts[level] = (counts[level] || 0) + 1;
  }
  let status = "OPERATIONAL";
  if (counts.fail > 0) status = "DOWN";
  else if (counts.warn > 0) status = "DEGRADED";
  return { status: status, counts: counts, findings: findings };
}

async function main() {
  checkLocalRouting();

  if (!SKIP_UNITS) {
    runUnitSuite();
  } else {
    record("pass", "mode.skip_units", "skipped unit suite (--skip-units)");
  }

  if (!OFFLINE) {
    await checkReady("production", ENDPOINTS.prodReady);
    await checkReady("staging", ENDPOINTS.stagingReady);
    await checkActivityGate("production", ENDPOINTS.prodActivity);
    await checkActivityGate("staging", ENDPOINTS.stagingActivity);
    await checkHost("production", ENDPOINTS.prodHost);
    await checkHost("staging", ENDPOINTS.stagingHost);
    await checkCatalog("production", ENDPOINTS.prodCommunities);
    await checkCatalog("staging", ENDPOINTS.stagingCommunities);
    await checkSignals("production", ENDPOINTS.prodSignals);
    await checkSignals("staging", ENDPOINTS.stagingSignals);
    await checkCivicProcess("production", ENDPOINTS.prodCivic);
    await checkCivicProcess("staging", ENDPOINTS.stagingCivic);
    await checkPlatformShell();
  } else {
    record("pass", "mode.offline", "skipped live operational probes (--offline)");
  }

  const report = summarize();
  report.generatedAt = new Date().toISOString();
  report.scope = "madrid-pilot-operational-supervision";
  report.mode = OFFLINE ? "offline" : "live";

  if (AS_JSON) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    console.log("Madrid pilot — " + report.status);
    console.log(
      "pass=" +
        report.counts.pass +
        " warn=" +
        report.counts.warn +
        " fail=" +
        report.counts.fail +
        " mode=" +
        report.mode
    );
    console.log("");
    for (let i = 0; i < report.findings.length; i++) {
      const row = report.findings[i];
      const tag = row.level.toUpperCase().padEnd(4);
      console.log(tag + " " + row.id + " — " + row.message);
      if (row.detail !== undefined) {
        const detail =
          typeof row.detail === "string" ? row.detail : JSON.stringify(row.detail);
        console.log("     " + detail.split("\n").join("\n     "));
      }
    }
  }

  if (report.status === "DOWN") process.exitCode = 1;
}

main().catch(function (err) {
  console.error(err);
  process.exitCode = 1;
});

#!/usr/bin/env node
/**
 * TOWN Madrid pilot supervisor — read-only health + contract checks.
 *
 * Phase 1 scope: observe Pilot Madrid surfaces and local contracts.
 * Does not mutate platform state, open payments, or grant memberships.
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

const HOSTS = {
  production: "https://madrid.towncivic.org/",
  staging: "https://madrid-staging.towncivic.org/",
  platform: "https://towncivic.org/platform/",
  prodApiSignals: `https://api.towncivic.org/v1/communities/${MADRID_SLUG}/signals`,
  stagingApiSignals: `https://api-staging.towncivic.org/v1/communities/${MADRID_SLUG}/signals`,
  prodCommunities: "https://api.towncivic.org/v1/communities",
  stagingCommunities: "https://api-staging.towncivic.org/v1/communities",
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
  const row = { level, id, message };
  if (detail !== undefined) row.detail = detail;
  findings.push(row);
}

function fetchText(url, timeoutMs) {
  const timeout = timeoutMs || 15000;
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https:") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": "town-madrid-pilot-supervisor/1.0",
          Accept: "text/html,application/json,*/*",
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 0,
            body: Buffer.concat(chunks).toString("utf8"),
            headers: res.headers,
          });
        });
      }
    );
    req.setTimeout(timeout, () => {
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
  if (Array.isArray(payload.signals)) return payload.signals;
  return [];
}

function loadTownApiBase() {
  const source = fs.readFileSync(path.join(ROOT, "api-base.js"), "utf8");
  const sandbox = { window: {}, globalThis: {} };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(source, sandbox);
  return sandbox.window.TownApiBase || sandbox.TownApiBase || null;
}

function checkLocalContracts() {
  const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const mustInclude = [
    "madrid-pilot-host.js",
    "madrid-discussion-guide.js",
    "api-base.js?v=madrid-pilot-1",
    "script.js?v=madrid-es-6",
    'id="madrid-pilot-intro"',
    'id="chat-madrid-link"',
  ];
  for (const needle of mustInclude) {
    if (indexHtml.includes(needle)) {
      record("pass", "local.index." + needle, "index.html includes " + needle);
    } else {
      record("fail", "local.index." + needle, "index.html missing " + needle);
    }
  }

  const pilotHost = require(path.join(ROOT, "madrid-pilot-host.js"));
  if (pilotHost.isMadridPilotHost("madrid.towncivic.org")) {
    record("pass", "local.host.prod", "madrid.towncivic.org is a pilot host");
  } else {
    record("fail", "local.host.prod", "madrid.towncivic.org should be a pilot host");
  }
  if (pilotHost.isMadridPilotHost("madrid-staging.towncivic.org")) {
    record("pass", "local.host.staging", "madrid-staging.towncivic.org is a pilot host");
  } else {
    record(
      "fail",
      "local.host.staging",
      "madrid-staging.towncivic.org should be a pilot host"
    );
  }
  if (!pilotHost.isMadridPilotHost("towncivic.org")) {
    record("pass", "local.host.apex", "towncivic.org is not locked to Madrid");
  } else {
    record("fail", "local.host.apex", "towncivic.org must not be a Madrid pilot host");
  }

  const TownApiBase = loadTownApiBase();
  const staging = "https://api-staging.towncivic.org";
  const production = "https://api.towncivic.org";
  if (!TownApiBase || typeof TownApiBase.resolveApiBase !== "function") {
    record("fail", "local.api.module", "TownApiBase failed to load from api-base.js");
  } else {
    if (TownApiBase.resolveApiBase("madrid-staging.towncivic.org") === staging) {
      record("pass", "local.api.staging", "madrid-staging → staging API");
    } else {
      record("fail", "local.api.staging", "madrid-staging must resolve to staging API");
    }
    if (TownApiBase.resolveApiBase("madrid.towncivic.org") === production) {
      record("pass", "local.api.prod", "madrid.towncivic.org → production API");
    } else {
      record("fail", "local.api.prod", "madrid.towncivic.org must resolve to production API");
    }
  }

  const guide = require(path.join(ROOT, "madrid-discussion-guide.js"));
  if (typeof guide.suggestMatches === "function" && typeof guide.isStrongMatch === "function") {
    record("pass", "local.guide.api", "discussion guide exports suggestMatches + isStrongMatch");
  } else {
    record("fail", "local.guide.api", "discussion guide missing suggestMatches/isStrongMatch", {
      keys: Object.keys(guide || {}),
    });
  }
}

function runUnitSuite() {
  for (const rel of LOCAL_MADRID_TESTS) {
    const full = path.join(ROOT, rel);
    const result = spawnSync(process.execPath, [full], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: 60000,
    });
    if (result.status === 0) {
      record("pass", "unit." + path.basename(rel), rel + " passed");
    } else {
      record("fail", "unit." + path.basename(rel), rel + " failed", {
        status: result.status,
        stderr: (result.stderr || "").slice(0, 500),
        stdout: (result.stdout || "").slice(-500),
      });
    }
  }
}

async function checkLiveHost(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status !== 200) {
      record("fail", "live.host." + label, url + " returned HTTP " + res.status);
      return null;
    }
    record("pass", "live.host." + label, url + " is HTTP 200");
    return res.body;
  } catch (err) {
    record("fail", "live.host." + label, "fetch failed for " + url, String(err.message || err));
    return null;
  }
}

function assertLiveHtmlContracts(label, html) {
  if (!html) return;
  const needles = [
    "madrid-pilot-host.js",
    "madrid-discussion-guide.js",
    "api-base.js?v=madrid-pilot-1",
    "script.js?v=madrid-es-6",
    'id="madrid-pilot-intro"',
    'id="chat-madrid-link"',
    "https://datos.madrid.es/dataset/",
  ];
  for (const needle of needles) {
    const id = "live.html." + label + "." + needle.replace(/[^a-z0-9]+/gi, "_");
    if (html.includes(needle)) {
      record("pass", id, label + " HTML includes " + needle);
    } else {
      record("fail", id, label + " HTML missing " + needle);
    }
  }
}

async function checkCommunitiesCatalog(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status !== 200) {
      record("fail", "live.catalog." + label, url + " HTTP " + res.status);
      return;
    }
    const payload = parseJsonSafe(res.body);
    const rows = payload && Array.isArray(payload.data) ? payload.data : [];
    const madrid = rows.find((row) => row && row.slug === MADRID_SLUG);
    if (!madrid) {
      record("fail", "live.catalog." + label, "madrid-es missing from communities catalog");
      return;
    }
    if (madrid.cityName !== "Madrid" || madrid.countryCode !== "ES") {
      record("fail", "live.catalog." + label, "madrid-es identity mismatch", madrid);
      return;
    }
    if (madrid.defaultLocale && madrid.defaultLocale !== "es-ES") {
      record("warn", "live.catalog." + label, "unexpected defaultLocale", madrid.defaultLocale);
    } else {
      record("pass", "live.catalog." + label, "madrid-es present with ES identity");
    }
  } catch (err) {
    record("fail", "live.catalog." + label, "catalog fetch failed", String(err.message || err));
  }
}

async function checkSignals(label, url) {
  try {
    const res = await fetchText(url);
    if (res.status !== 200) {
      record("fail", "live.signals." + label, url + " HTTP " + res.status, res.body.slice(0, 200));
      return;
    }
    const payload = parseJsonSafe(res.body);
    const signals = signalList(payload);
    if (signals.length !== EXPECTED_SIGNAL_COUNT) {
      record(
        "warn",
        "live.signals." + label + ".count",
        "expected " + EXPECTED_SIGNAL_COUNT + " Madrid seed signals, found " + signals.length
      );
    } else {
      record(
        "pass",
        "live.signals." + label + ".count",
        "Madrid feed has " + signals.length + " signals"
      );
    }
    const nonEs = signals.filter((s) => s.locale && s.locale !== "es-ES");
    if (nonEs.length) {
      record("fail", "live.signals." + label + ".locale", "non-Spanish signal locales present", {
        locales: nonEs.map((s) => s.locale),
      });
    } else if (signals.length) {
      record("pass", "live.signals." + label + ".locale", "signal locales are es-ES");
    }
    const emptyHeadline = signals.filter((s) => !String(s.headline || "").trim());
    if (emptyHeadline.length) {
      record("fail", "live.signals." + label + ".headline", "signals missing headlines");
    } else if (signals.length) {
      record("pass", "live.signals." + label + ".headline", "all signals have headlines");
    }
  } catch (err) {
    record("fail", "live.signals." + label, "signals fetch failed", String(err.message || err));
  }
}

async function checkPlatformSurface() {
  try {
    const res = await fetchText(HOSTS.platform);
    if (res.status !== 200) {
      record("fail", "live.platform", "platform console HTTP " + res.status);
      return;
    }
    if (res.body.includes("Monitor") && res.body.includes("Platform")) {
      record("pass", "live.platform", "platform console shell is reachable");
    } else {
      record("warn", "live.platform", "platform HTML missing expected Monitor markers");
    }
  } catch (err) {
    record("fail", "live.platform", "platform fetch failed", String(err.message || err));
  }
}

function summarize() {
  const counts = { pass: 0, warn: 0, fail: 0 };
  for (const row of findings) {
    counts[row.level] = (counts[row.level] || 0) + 1;
  }
  const status = counts.fail > 0 ? "FAIL" : counts.warn > 0 ? "WARN" : "PASS";
  return { status, counts, findings };
}

async function main() {
  checkLocalContracts();
  if (!SKIP_UNITS) {
    runUnitSuite();
  } else {
    record("pass", "mode.skip_units", "skipped unit suite (--skip-units)");
  }

  if (!OFFLINE) {
    const prodHtml = await checkLiveHost("production", HOSTS.production);
    assertLiveHtmlContracts("production", prodHtml);
    const stagingHtml = await checkLiveHost("staging", HOSTS.staging);
    assertLiveHtmlContracts("staging", stagingHtml);
    await checkCommunitiesCatalog("production", HOSTS.prodCommunities);
    await checkCommunitiesCatalog("staging", HOSTS.stagingCommunities);
    await checkSignals("production", HOSTS.prodApiSignals);
    await checkSignals("staging", HOSTS.stagingApiSignals);
    await checkPlatformSurface();
  } else {
    record("pass", "mode.offline", "skipped live probes (--offline)");
  }

  const report = summarize();
  report.generatedAt = new Date().toISOString();
  report.scope = "madrid-pilot-supervision-phase-1";
  report.mode = OFFLINE ? "offline" : "live";

  if (AS_JSON) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    console.log("TOWN Madrid pilot supervisor — " + report.status);
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
    for (const row of report.findings) {
      const tag = row.level.toUpperCase().padEnd(4);
      console.log(tag + " " + row.id + " — " + row.message);
      if (row.detail !== undefined) {
        const detail =
          typeof row.detail === "string" ? row.detail : JSON.stringify(row.detail);
        console.log("     " + detail.split("\n").join("\n     "));
      }
    }
  }

  if (report.status === "FAIL") process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

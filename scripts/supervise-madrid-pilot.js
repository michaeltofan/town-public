#!/usr/bin/env node
/**
 * TOWN Madrid pilot — operator utility digest (read-only).
 *
 * Answers: what should Mickey do about Madrid right now?
 * Health checks are a gate, not the product.
 *
 * Usage:
 *   node scripts/supervise-madrid-pilot.js
 *   node scripts/supervise-madrid-pilot.js --json
 *   node scripts/supervise-madrid-pilot.js --offline
 */
"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const MADRID_SLUG = "madrid-es";
const SEED_IDS = [
  "00000000-0000-4000-8000-000000001901",
  "00000000-0000-4000-8000-000000001902",
  "00000000-0000-4000-8000-000000001903",
];

const args = new Set(process.argv.slice(2));
const AS_JSON = args.has("--json");
const OFFLINE = args.has("--offline");

function fetchText(url) {
  return new Promise(function (resolve, reject) {
    const lib = url.indexOf("https:") === 0 ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": "town-madrid-operator-digest/3.0",
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
    req.setTimeout(15000, function () {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
  });
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

async function getJson(url) {
  const res = await fetchText(url);
  return {
    status: res.status,
    json: parseJson(res.body),
    body: res.body,
  };
}

function actionsFromDigest(digest) {
  const actions = [];
  if (digest.health.status !== "OPERATIONAL") {
    actions.push({
      priority: 1,
      kind: "infra",
      text:
        "API/host Madrid nu e healthy — verifică Railway/api ready înainte de orice civic work.",
    });
    return actions;
  }

  const stuck = digest.signals.filter(function (s) {
    return (
      s.stage === "confirmation" &&
      typeof s.confirmationCount === "number" &&
      s.requiredConfirmations &&
      s.confirmationCount === 0
    );
  });
  if (stuck.length === digest.signals.length && digest.signals.length) {
    actions.push({
      priority: 2,
      kind: "growth",
      text:
        "Nicio confirmare pe semnalele seed (toate 0/" +
        (stuck[0].requiredConfirmations || 5) +
        "). Pilotul e live dar bucla civică n-a pornit — prioritate: 1–2 membri reali pe madrid.towncivic.org care fac YO TAMBIÉN LO VEO.",
    });
  }

  digest.signals.forEach(function (s) {
    if (
      s.stage === "confirmation" &&
      s.confirmationCount > 0 &&
      s.confirmationCount < s.requiredConfirmations
    ) {
      const left = s.requiredConfirmations - s.confirmationCount;
      actions.push({
        priority: 2,
        kind: "civic",
        text:
          s.area +
          ": " +
          s.confirmationCount +
          "/" +
          s.requiredConfirmations +
          " confirmări — mai trebuie " +
          left +
          " ca să treacă la proposals. Headline: " +
          s.headline,
      });
    }
    if (s.stage === "confirmation" && s.reached) {
      actions.push({
        priority: 1,
        kind: "civic",
        text:
          s.area +
          " a atins pragul de confirmare — verifică pe platformă/UI că etapa proposals e vizibilă.",
      });
    }
    if (s.stage && s.stage !== "confirmation") {
      actions.push({
        priority: 1,
        kind: "civic",
        text:
          s.area +
          " e în etapa " +
          s.stage +
          " — supraveghează proposals/deliberation/vote după caz.",
      });
    }
  });

  if (digest.nonSeedCount > 0) {
    actions.push({
      priority: 2,
      kind: "moderation",
      text:
        digest.nonSeedCount +
        " semnal(e) noi peste seed — deschide platformă → Moderation/Signals și decide hide/keep.",
    });
  }

  if (!actions.length) {
    actions.push({
      priority: 3,
      kind: "ok",
      text: "Nimic urgent. Revină la următorul run; urmărește delta confirmărilor.",
    });
  }

  actions.sort(function (a, b) {
    return a.priority - b.priority;
  });
  return actions;
}

async function buildDigest() {
  const digest = {
    generatedAt: new Date().toISOString(),
    scope: "madrid-operator-utility",
    health: { status: "UNKNOWN", checks: [] },
    signals: [],
    seedCount: 0,
    nonSeedCount: 0,
    actions: [],
  };

  if (OFFLINE) {
    digest.health.status = "OFFLINE";
    digest.actions = [
      {
        priority: 3,
        kind: "ok",
        text: "Mod offline — fără probe live.",
      },
    ];
    return digest;
  }

  const checks = [];
  async function check(name, fn) {
    try {
      const result = await fn();
      checks.push({ name: name, ok: !!result.ok, detail: result.detail });
      return result.ok;
    } catch (err) {
      checks.push({ name: name, ok: false, detail: String(err.message || err) });
      return false;
    }
  }

  const readyOk = await check("prod.ready", async function () {
    const r = await getJson("https://api.towncivic.org/health/ready");
    return {
      ok: r.status === 200 && r.json && r.json.status === "ready",
      detail: "HTTP " + r.status,
    };
  });
  await check("staging.ready", async function () {
    const r = await getJson("https://api-staging.towncivic.org/health/ready");
    return {
      ok: r.status === 200 && r.json && r.json.status === "ready",
      detail: "HTTP " + r.status,
    };
  });
  await check("prod.activity", async function () {
    const r = await getJson("https://api.towncivic.org/v1/account/activity");
    return { ok: r.status === 401, detail: "HTTP " + r.status };
  });
  await check("host.prod", async function () {
    const r = await fetchText("https://madrid.towncivic.org/");
    return { ok: r.status === 200, detail: "HTTP " + r.status };
  });
  await check("host.staging", async function () {
    const r = await fetchText("https://madrid-staging.towncivic.org/");
    return { ok: r.status === 200, detail: "HTTP " + r.status };
  });

  digest.health.checks = checks;
  const failed = checks.filter(function (c) {
    return !c.ok;
  });
  digest.health.status = failed.length ? "DOWN" : "OPERATIONAL";

  if (!readyOk) {
    digest.actions = actionsFromDigest(digest);
    return digest;
  }

  const signalsRes = await getJson(
    "https://api.towncivic.org/v1/communities/" + MADRID_SLUG + "/signals"
  );
  const list =
    signalsRes.json &&
    signalsRes.json.data &&
    Array.isArray(signalsRes.json.data.signals)
      ? signalsRes.json.data.signals
      : [];

  const seedSet = {};
  SEED_IDS.forEach(function (id) {
    seedSet[id] = true;
  });
  digest.seedCount = list.filter(function (s) {
    return seedSet[s.id];
  }).length;
  digest.nonSeedCount = list.filter(function (s) {
    return !seedSet[s.id];
  }).length;

  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    const civicRes = await getJson(
      "https://api.towncivic.org/v1/signals/" + s.id + "/civic-process"
    );
    const d = civicRes.json && civicRes.json.data ? civicRes.json.data : null;
    const required =
      d && d.transitionRule && d.transitionRule.requiredConfirmations
        ? d.transitionRule.requiredConfirmations
        : null;
    const reached = !!(d && d.transitionRule && d.transitionRule.reached);
    digest.signals.push({
      id: s.id,
      slug: s.slug,
      area: s.area || "",
      headline: s.headline || "",
      locale: s.locale || "",
      isSeed: !!seedSet[s.id],
      stage: d ? d.currentStage : null,
      confirmationCount: d ? d.confirmationCount : null,
      requiredConfirmations: required,
      reached: reached,
      canConfirm: d ? d.canConfirm : null,
      civicHttp: civicRes.status,
    });
  }

  digest.actions = actionsFromDigest(digest);
  return digest;
}

function printDigest(digest) {
  console.log("Madrid operator digest — " + digest.health.status);
  console.log("Time: " + digest.generatedAt);
  console.log("");
  console.log("## Ce ai de făcut");
  digest.actions.forEach(function (a, idx) {
    console.log(idx + 1 + ". [" + a.kind + "] " + a.text);
  });
  console.log("");
  console.log("## Semnale madrid-es");
  if (!digest.signals.length) {
    console.log("(none)");
  }
  digest.signals.forEach(function (s) {
    const prog =
      s.confirmationCount == null
        ? "civic n/a HTTP " + s.civicHttp
        : s.stage +
          " " +
          s.confirmationCount +
          "/" +
          (s.requiredConfirmations || "?") +
          (s.reached ? " REACHED" : "");
    console.log(
      "- " +
        (s.isSeed ? "seed" : "NEW") +
        " · " +
        s.area +
        " · " +
        prog +
        " · " +
        s.headline
    );
  });
  console.log("");
  console.log(
    "## Feed: seed=" +
      digest.seedCount +
      " new=" +
      digest.nonSeedCount +
      " total=" +
      digest.signals.length
  );
  console.log("## Health gate");
  digest.health.checks.forEach(function (c) {
    console.log("- " + (c.ok ? "OK" : "FAIL") + " " + c.name + " — " + c.detail);
  });
}

async function main() {
  const digest = await buildDigest();
  if (AS_JSON) {
    process.stdout.write(JSON.stringify(digest, null, 2) + "\n");
  } else {
    printDigest(digest);
  }
  if (digest.health.status === "DOWN") process.exitCode = 1;
}

main().catch(function (err) {
  console.error(err);
  process.exitCode = 1;
});

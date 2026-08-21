#!/usr/bin/env node
/**
 * Unit tests for TOWN Super-Agent cognition (no network).
 */
"use strict";

const assert = require("assert");
const cognition = require("./town-cognition");
const fs = require("fs");
const path = require("path");

let failed = 0;
function ok(cond, msg) {
  try {
    assert.ok(cond, msg);
    console.log("ok - " + msg);
  } catch (err) {
    failed += 1;
    console.error("FAIL - " + msg);
    console.error("  " + err.message);
  }
}

function equal(a, b, msg) {
  try {
    assert.deepStrictEqual(a, b);
    console.log("ok - " + msg);
  } catch (err) {
    failed += 1;
    console.error("FAIL - " + msg);
    console.error("  " + err.message);
  }
}

// --- parse feedback ---
equal(cognition.parseFeedbackText("util: civico e bun").verdict, "useful", "parse util");
equal(cognition.parseFeedbackText("zgomot: uptime theatre").verdict, "noise", "parse zgomot");
equal(cognition.parseFeedbackText("regulă: mutările rămân umane").verdict, "rule", "parse regulă");

// --- delta ---
const delta = cognition.computeMadridDelta(
  {
    health: "OPERATIONAL",
    nonSeedCount: 0,
    signals: [
      {
        id: "a",
        area: "Centro",
        stage: "confirmation",
        confirmationCount: 0,
        requiredConfirmations: 5,
        isSeed: true,
      },
    ],
  },
  {
    health: "OPERATIONAL",
    nonSeedCount: 1,
    signals: [
      {
        id: "a",
        area: "Centro",
        stage: "confirmation",
        confirmationCount: 2,
        requiredConfirmations: 5,
        isSeed: true,
      },
      {
        id: "b",
        area: "Latina",
        stage: "confirmation",
        confirmationCount: 0,
        requiredConfirmations: 5,
        isSeed: false,
      },
    ],
  }
);
ok(delta.hasChanges, "delta detects changes");
ok(
  delta.changes.some(function (c) {
    return c.kind === "confirmations";
  }),
  "delta includes confirmations"
);
ok(
  delta.changes.some(function (c) {
    return c.kind === "signal_new";
  }),
  "delta includes new signal"
);
ok(
  delta.changes.some(function (c) {
    return c.kind === "feed";
  }),
  "delta includes feed count"
);

// --- lessons ranking ---
const lessons = {
  items: [
    {
      id: "les_noise_ok",
      match: { actionKind: "ok" },
      effect: "suppress",
      weight: 2,
      note: "nu raporta ok ca victorie",
      hits: 0,
    },
    {
      id: "les_prefer_civico",
      match: { actionKind: "civico" },
      effect: "prefer_kind",
      weight: 1,
      note: "prioritizează civic",
      hits: 0,
    },
  ],
};
const ranked = cognition.applyLessons(
  [
    { priority: 3, kind: "ok", text: "Nada urgente" },
    { priority: 2, kind: "civico", text: "faltan 3 confirmaciones" },
    { priority: 1, kind: "infra", text: "API down" },
  ],
  lessons
);
ok(
  ranked.actions.every(function (a) {
    return a.kind !== "ok";
  }),
  "noise lesson drops ok actions"
);
const infra = ranked.actions.find(function (a) {
  return a.kind === "infra";
});
const civico = ranked.actions.find(function (a) {
  return a.kind === "civico";
});
ok(infra && infra.priority === 1, "infra stays urgent");
ok(civico && civico.priority === 1, "civico boosted to match urgency band");
ok(
  ranked.actions.some(function (a) {
    return a.kind === "civico" && a.priority <= 2;
  }),
  "civico preferred"
);
ok(lessons.items[0].hits >= 1, "lesson hits increment");

// --- feedback → lesson (dry) ---
const ingested = cognition.ingestFeedback("zgomot: ok uptime", {
  dryRun: true,
  lessons: { version: 1, items: [] },
  state: cognition.emptyState(),
});
equal(ingested.entry.verdict, "noise", "ingest noise verdict");
equal(ingested.lesson.effect, "suppress", "noise becomes suppress");
ok(ingested.lessons.items.length === 1, "lesson appended in memory");

const ruleIngest = cognition.ingestFeedback("regulă: zero mutații pe production", {
  dryRun: true,
  lessons: { version: 1, items: [] },
  state: cognition.emptyState(),
});
ok(
  ruleIngest.state.beliefs.some(function (b) {
    return /muta/i.test(b.text);
  }),
  "rule becomes belief"
);
equal(
  ruleIngest.lesson.match.actionKind,
  "platform",
  "mutation rule scopes to platform actions only"
);

// --- integrate sense ---
const integrated = cognition.integrateMadridSense(
  cognition.emptyState(),
  {
    at: "2026-08-21T00:00:00.000Z",
    health: "OPERATIONAL",
    nonSeedCount: 0,
    signals: [],
  },
  [{ name: "prod.ready", ok: true, detail: "HTTP 200" }]
);
equal(integrated.state.runCount, 1, "runCount increments");
equal(integrated.state.identity, "town-super-agent", "identity fixed");
equal(integrated.state.domains.madrid.health, "OPERATIONAL", "madrid domain updated");

// --- files exist ---
const paths = cognition.paths();
ok(fs.existsSync(paths.state), "state.json exists");
ok(fs.existsSync(paths.lessons), "lessons.json exists");
ok(fs.existsSync(path.join(paths.dir, "MODEL.md")), "MODEL.md exists");

// --- offline super-agent dry-run ---
process.argv = process.argv.filter(function (a) {
  return a !== "--offline" && a !== "--dry-run" && a !== "--json";
});
process.argv.push("--offline", "--dry-run", "--json");
const superAgent = require("./town-super-agent");
superAgent
  .run()
  .then(function (report) {
    ok(report.identity === "town-super-agent", "super-agent identity");
    ok(report.health === "OFFLINE", "offline health");
    ok(Array.isArray(report.actions), "actions array");
    ok(report.dryRun === true, "dry-run flag");
    if (failed) {
      console.error("\n" + failed + " failure(s)");
      process.exitCode = 1;
    } else {
      console.log("\nAll cognition tests passed");
    }
  })
  .catch(function (err) {
    console.error(err);
    process.exitCode = 1;
  });

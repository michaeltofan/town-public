#!/usr/bin/env node
/**
 * TOWN Super-Agent — one cognitive mind.
 *
 * Senses (not separate agents) → world model → lessons → decisions → learning.
 *
 * Usage:
 *   node scripts/town-super-agent.js
 *   node scripts/town-super-agent.js --json
 *   node scripts/town-super-agent.js --offline
 *   node scripts/town-super-agent.js --feedback "util: prioritează civico"
 *   node scripts/town-super-agent.js --feedback "zgomot: ok" --offline
 *   node scripts/town-super-agent.js --dry-run
 */
"use strict";

const path = require("path");
const cognition = require("./town-cognition");
const madridSense = require("./supervise-madrid-pilot");

const args = process.argv.slice(2);
const AS_JSON = args.indexOf("--json") !== -1;
const OFFLINE = args.indexOf("--offline") !== -1;
const DRY_RUN = args.indexOf("--dry-run") !== -1;

function readFlagValue(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  const next = args[idx + 1];
  if (!next || next.indexOf("--") === 0) return "";
  return next;
}

const FEEDBACK_RAW = readFlagValue("--feedback");

function printReport(report) {
  console.log("TOWN Super-Agent — o singură minte");
  console.log("Run #" + report.runCount + " · " + report.generatedAt);
  console.log("Health (poartă): " + report.health);
  console.log("");
  console.log("## A. Ce trebuie făcut acum");
  if (!report.actions.length) console.log("(nimic)");
  report.actions.forEach(function (a, idx) {
    const note =
      a.lessonNotes && a.lessonNotes.length
        ? " · lessons[" + a.lessonNotes.join(",") + "]"
        : "";
    console.log(idx + 1 + ". [" + a.kind + "] " + a.text + note);
  });
  console.log("");
  console.log("## B. Delta vs run anterior");
  if (!report.delta.changes.length) {
    console.log("- Fără schimbări față de modelul lumii salvat.");
  } else {
    report.delta.changes.forEach(function (c) {
      console.log("- [" + c.kind + "] " + c.text);
    });
  }
  console.log("");
  console.log("## C. Observații (simț Madrid)");
  if (!report.signals.length) console.log("(ninguna)");
  report.signals.forEach(function (s) {
    const prog =
      s.confirmationCount == null
        ? "civic n/d"
        : s.stage +
          " " +
          s.confirmationCount +
          "/" +
          (s.requiredConfirmations || "?") +
          (s.reached ? " UMBRAL" : "");
    console.log(
      "- " +
        (s.isSeed ? "seed" : "NUEVA") +
        " · " +
        s.area +
        " · " +
        prog +
        " · " +
        s.headline
    );
  });
  console.log(
    "Feed: seed=" +
      report.seedCount +
      " nuevas=" +
      report.nonSeedCount +
      " total=" +
      report.signals.length
  );
  console.log("");
  console.log("## D. Lecții aplicate");
  if (!report.lessonsApplied.length) {
    console.log("- Nicio lecție potrivită în acest run (încă înveți).");
  } else {
    report.lessonsApplied.forEach(function (l) {
      console.log("- " + l.id + " · " + l.effect + " · " + l.note);
    });
  }
  console.log("");
  console.log("## E. Învățare");
  console.log(
    "- Modelul lumii: " +
      path.relative(process.cwd(), cognition.paths().state) +
      (DRY_RUN ? " (dry-run, nescris)" : " actualizat")
  );
  console.log(
    "- Lecții: " +
      report.lessonCount +
      " în " +
      path.relative(process.cwd(), cognition.paths().lessons)
  );
  if (report.feedbackIngested) {
    console.log(
      "- Feedback ingerat: " +
        report.feedbackIngested.verdict +
        " → lesson " +
        report.feedbackIngested.lessonId
    );
  } else {
    console.log(
      '- Feedback așteptat: --feedback "util: …" | "zgomot: …" | "regulă: …"'
    );
  }
  console.log("");
  console.log("Beliefs (ancoră):");
  report.beliefs.forEach(function (b) {
    console.log("- " + b.text);
  });
}

async function run() {
  let feedbackResult = null;
  if (FEEDBACK_RAW != null && String(FEEDBACK_RAW).trim()) {
    feedbackResult = cognition.ingestFeedback(FEEDBACK_RAW, {
      dryRun: DRY_RUN,
    });
  }

  const digest = await madridSense.buildDigest({ offline: OFFLINE });

  const prevState =
    feedbackResult && feedbackResult.state
      ? feedbackResult.state
      : cognition.loadState();
  const lessons =
    feedbackResult && feedbackResult.lessons
      ? feedbackResult.lessons
      : cognition.loadLessons();
  const integrated = cognition.integrateMadridSense(
    prevState,
    digest.memory,
    digest.health && digest.health.checks ? digest.health.checks : []
  );

  const ranked = cognition.applyLessons(digest.actions || [], lessons);
  if (!DRY_RUN) {
    cognition.saveLessons(lessons);
    cognition.saveState(integrated.state);
  }

  const report = {
    identity: "town-super-agent",
    generatedAt: digest.generatedAt || new Date().toISOString(),
    runCount: integrated.state.runCount,
    health: digest.health ? digest.health.status : "UNKNOWN",
    actions: ranked.actions.slice(0, 5),
    delta: integrated.delta,
    signals: digest.signals || [],
    seedCount: digest.seedCount || 0,
    nonSeedCount: digest.nonSeedCount || 0,
    lessonsApplied: ranked.applied,
    lessonCount: (lessons.items || []).length,
    beliefs: integrated.state.beliefs || [],
    feedbackIngested: feedbackResult
      ? {
          verdict: feedbackResult.entry.verdict,
          lessonId: feedbackResult.lesson.id,
          note: feedbackResult.lesson.note,
        }
      : null,
    cognitionPaths: cognition.paths(),
    dryRun: DRY_RUN,
  };

  if (AS_JSON) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    printReport(report);
  }

  if (report.health === "DOWN") process.exitCode = 1;
  return report;
}

if (require.main === module) {
  run().catch(function (err) {
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = { run: run };

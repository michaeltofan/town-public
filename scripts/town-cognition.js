#!/usr/bin/env node
/**
 * TOWN Super-Agent — cognition core (pure, no network).
 *
 * One mind: load/save world model, compute deltas, apply lessons, ingest feedback.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const COGNITION_DIR = path.join(__dirname, "..", "agents", "cognition");
const STATE_PATH = path.join(COGNITION_DIR, "state.json");
const LESSONS_PATH = path.join(COGNITION_DIR, "lessons.json");
const FEEDBACK_PATH = path.join(COGNITION_DIR, "feedback.jsonl");

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    if (err && err.code === "ENOENT") return fallback;
    throw err;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function emptyState() {
  return {
    version: 1,
    identity: "town-super-agent",
    updatedAt: null,
    runCount: 0,
    domains: {
      madrid: { health: null, nonSeedCount: null, signals: [] },
      platform: { probes: [], notes: "" },
    },
    beliefs: [],
  };
}

function emptyLessons() {
  return { version: 1, updatedAt: null, items: [] };
}

function loadState() {
  return readJson(STATE_PATH, emptyState());
}

function saveState(state) {
  writeJson(STATE_PATH, state);
  return state;
}

function loadLessons() {
  return readJson(LESSONS_PATH, emptyLessons());
}

function saveLessons(lessons) {
  writeJson(LESSONS_PATH, lessons);
  return lessons;
}

function appendFeedback(entry) {
  const line = JSON.stringify(entry) + "\n";
  fs.appendFileSync(FEEDBACK_PATH, line, "utf8");
  return entry;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function signalKey(signal) {
  return signal && signal.id ? String(signal.id) : "";
}

/**
 * Compare previous madrid domain vs new memory snapshot from the Madrid sense.
 */
function computeMadridDelta(previousMadrid, nextMemory) {
  const prev = previousMadrid || { signals: [], nonSeedCount: null, health: null };
  const next = nextMemory || { signals: [], nonSeedCount: null, health: null };
  const changes = [];

  if (prev.health !== next.health) {
    changes.push({
      kind: "health",
      text:
        "Health: " +
        (prev.health == null ? "?" : prev.health) +
        " → " +
        (next.health == null ? "?" : next.health),
    });
  }

  if (prev.nonSeedCount !== next.nonSeedCount) {
    changes.push({
      kind: "feed",
      text:
        "Señales nuevas: " +
        (prev.nonSeedCount == null ? "?" : prev.nonSeedCount) +
        " → " +
        (next.nonSeedCount == null ? "?" : next.nonSeedCount),
    });
  }

  const prevById = {};
  (prev.signals || []).forEach(function (s) {
    const id = signalKey(s);
    if (id) prevById[id] = s;
  });

  (next.signals || []).forEach(function (s) {
    const id = signalKey(s);
    if (!id) return;
    const before = prevById[id];
    if (!before) {
      changes.push({
        kind: "signal_new",
        text:
          "Nueva señal " +
          (s.area || id) +
          (s.isSeed ? " (seed)" : "") +
          " · " +
          (s.stage || "?") +
          " " +
          (s.confirmationCount == null ? "?" : s.confirmationCount) +
          "/" +
          (s.requiredConfirmations || "?"),
      });
      return;
    }
    if (before.confirmationCount !== s.confirmationCount) {
      changes.push({
        kind: "confirmations",
        text:
          (s.area || id) +
          ": confirmaciones " +
          (before.confirmationCount == null ? "?" : before.confirmationCount) +
          " → " +
          (s.confirmationCount == null ? "?" : s.confirmationCount) +
          "/" +
          (s.requiredConfirmations || "?"),
      });
    }
    if (before.stage !== s.stage) {
      changes.push({
        kind: "stage",
        text:
          (s.area || id) +
          ": etapa " +
          (before.stage || "?") +
          " → " +
          (s.stage || "?"),
      });
    }
  });

  return {
    hasChanges: changes.length > 0,
    changes: changes,
  };
}

function lessonMatchesAction(lesson, action) {
  const match = lesson && lesson.match ? lesson.match : {};
  const hasScope = !!(match.actionKind || match.textIncludes || match.any);
  if (!hasScope) return false;
  if (match.actionKind && action.kind !== match.actionKind) return false;
  if (match.textIncludes) {
    const needle = String(match.textIncludes).toLowerCase();
    if (String(action.text || "").toLowerCase().indexOf(needle) === -1) {
      return false;
    }
  }
  return true;
}

/**
 * Rank / filter actions using durable lessons.
 * Effects: boost (−priority), suppress (+priority or drop), prefer_kind.
 */
function applyLessons(actions, lessons) {
  const items = (lessons && lessons.items) || [];
  const applied = [];
  const scored = (actions || []).map(function (action) {
    const copy = {
      priority: action.priority,
      kind: action.kind,
      text: action.text,
      lessonNotes: [],
    };
    let drop = false;
    items.forEach(function (lesson) {
      if (!lessonMatchesAction(lesson, copy)) return;
      applied.push({
        id: lesson.id,
        effect: lesson.effect,
        note: lesson.note,
      });
      lesson.hits = (lesson.hits || 0) + 1;
      if (lesson.effect === "boost") {
        copy.priority = Math.max(1, (copy.priority || 3) - (lesson.weight || 1));
        copy.lessonNotes.push("boost:" + lesson.id);
      } else if (lesson.effect === "suppress") {
        if ((lesson.weight || 1) >= 2) {
          drop = true;
          copy.lessonNotes.push("drop:" + lesson.id);
        } else {
          copy.priority = (copy.priority || 3) + (lesson.weight || 1);
          copy.lessonNotes.push("suppress:" + lesson.id);
        }
      } else if (lesson.effect === "prefer_kind" && lesson.match && lesson.match.actionKind) {
        if (copy.kind === lesson.match.actionKind) {
          copy.priority = Math.max(1, (copy.priority || 3) - 1);
          copy.lessonNotes.push("prefer:" + lesson.id);
        }
      }
    });
    return drop ? null : copy;
  });

  const kept = scored.filter(Boolean);
  kept.sort(function (a, b) {
    return a.priority - b.priority;
  });
  return { actions: kept, applied: applied };
}

function parseFeedbackText(raw) {
  const text = String(raw || "").trim();
  const lower = text.toLowerCase();
  let verdict = "rule";
  let body = text;
  if (/^(util|useful|keep)\b[:\s-]+/i.test(text)) {
    verdict = "useful";
    body = text.replace(/^(util|useful|keep)\b[:\s-]+/i, "").trim();
  } else if (/^(zgomot|noise|ignore)\b[:\s-]+/i.test(text)) {
    verdict = "noise";
    body = text.replace(/^(zgomot|noise|ignore)\b[:\s-]+/i, "").trim();
  } else if (/^(regul[aă]|rule)\b[:\s-]+/i.test(text)) {
    verdict = "rule";
    body = text.replace(/^(regul[aă]|rule)\b[:\s-]+/i, "").trim();
  } else if (lower.indexOf("zgomot") === 0 || lower.indexOf("noise") === 0) {
    verdict = "noise";
  } else if (lower.indexOf("util") === 0 || lower.indexOf("useful") === 0) {
    verdict = "useful";
  }
  return { verdict: verdict, body: body || text };
}

function inferLessonFromFeedback(parsed) {
  const id =
    "les_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 7);
  const now = new Date().toISOString();
  const body = parsed.body;
  const lower = body.toLowerCase();

  // Heuristic: if feedback mentions an action kind, bind to it.
  const kinds = [
    "infra",
    "crecimiento",
    "civico",
    "moderacion",
    "idioma",
    "ok",
    "platform",
  ];
  let actionKind = null;
  for (let i = 0; i < kinds.length; i++) {
    if (lower.indexOf(kinds[i]) !== -1) {
      actionKind = kinds[i];
      break;
    }
  }

  if (parsed.verdict === "noise") {
    return {
      id: id,
      kind: "avoid",
      match: actionKind
        ? { actionKind: actionKind }
        : { textIncludes: body.slice(0, 48) || "uptime" },
      effect: "suppress",
      weight: actionKind === "ok" || /uptime|verde|green|ok ratio/i.test(body) ? 2 : 1,
      note: body,
      source: "feedback",
      createdAt: now,
      hits: 0,
    };
  }

  if (parsed.verdict === "useful") {
    return {
      id: id,
      kind: "prefer",
      match: actionKind ? { actionKind: actionKind } : { any: true },
      effect: actionKind ? "prefer_kind" : "boost",
      weight: 1,
      note: body,
      source: "feedback",
      createdAt: now,
      hits: 0,
    };
  }

  // rule → primarily a durable belief; ranking lesson only when scoped
  if (/mutaci[oó]n|mutate|stripe|production|platform/i.test(body)) {
    return {
      id: id,
      kind: "rule",
      match: { actionKind: "platform" },
      effect: "suppress",
      weight: 2,
      note: body,
      source: "feedback",
      createdAt: now,
      hits: 0,
    };
  }

  if (actionKind) {
    return {
      id: id,
      kind: "rule",
      match: { actionKind: actionKind },
      effect: "prefer_kind",
      weight: 1,
      note: body,
      source: "feedback",
      createdAt: now,
      hits: 0,
    };
  }

  // Belief-only rule (no ranking side effects)
  return {
    id: id,
    kind: "rule",
    match: {},
    effect: "boost",
    weight: 0,
    note: body,
    source: "feedback",
    createdAt: now,
    hits: 0,
  };
}

function ingestFeedback(rawText, options) {
  const opts = options || {};
  const parsed = parseFeedbackText(rawText);
  const entry = {
    at: new Date().toISOString(),
    verdict: parsed.verdict,
    text: parsed.body,
    raw: String(rawText || ""),
  };
  if (!opts.dryRun) appendFeedback(entry);

  const lesson = inferLessonFromFeedback(parsed);
  const lessons = opts.lessons || loadLessons();
  lessons.items = lessons.items || [];
  lessons.items.push(lesson);
  lessons.updatedAt = entry.at;
  if (!opts.dryRun) saveLessons(lessons);

  // Durable belief for explicit rules.
  let state = opts.state || loadState();
  if (parsed.verdict === "rule") {
    state.beliefs = state.beliefs || [];
    state.beliefs.push({
      id: "belief_" + lesson.id,
      text: parsed.body,
      confidence: 0.9,
      source: "feedback",
      updatedAt: entry.at,
    });
    state.updatedAt = entry.at;
    if (!opts.dryRun) saveState(state);
  }

  return { entry: entry, lesson: lesson, lessons: lessons, state: state };
}

function integrateMadridSense(state, madridMemory, healthChecks) {
  const next = clone(state || emptyState());
  const previousMadrid = clone(next.domains.madrid || {});
  const delta = computeMadridDelta(previousMadrid, madridMemory);

  next.domains.madrid = {
    health: madridMemory ? madridMemory.health : null,
    nonSeedCount: madridMemory ? madridMemory.nonSeedCount : null,
    signals: madridMemory && madridMemory.signals ? madridMemory.signals : [],
    at: madridMemory ? madridMemory.at : null,
  };
  next.domains.platform = next.domains.platform || { probes: [], notes: "" };
  next.domains.platform.probes = healthChecks || next.domains.platform.probes || [];
  next.runCount = (next.runCount || 0) + 1;
  next.updatedAt = new Date().toISOString();
  next.identity = "town-super-agent";

  return {
    state: next,
    previousMadrid: previousMadrid,
    delta: delta,
  };
}

function paths() {
  return {
    dir: COGNITION_DIR,
    state: STATE_PATH,
    lessons: LESSONS_PATH,
    feedback: FEEDBACK_PATH,
  };
}

module.exports = {
  paths: paths,
  loadState: loadState,
  saveState: saveState,
  loadLessons: loadLessons,
  saveLessons: saveLessons,
  appendFeedback: appendFeedback,
  computeMadridDelta: computeMadridDelta,
  applyLessons: applyLessons,
  parseFeedbackText: parseFeedbackText,
  inferLessonFromFeedback: inferLessonFromFeedback,
  ingestFeedback: ingestFeedback,
  integrateMadridSense: integrateMadridSense,
  emptyState: emptyState,
  emptyLessons: emptyLessons,
};

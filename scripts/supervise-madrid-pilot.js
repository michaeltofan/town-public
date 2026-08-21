#!/usr/bin/env node
/**
 * TOWN Madrid pilot — digest operativo (solo lectura, español).
 *
 * Entrena y prueba el piloto Madrid. Responde: ¿qué debe hacer Mickey ahora?
 * Health es una puerta, no el producto.
 *
 * Usage:
 *   node scripts/supervise-madrid-pilot.js
 *   node scripts/supervise-madrid-pilot.js --json
 *   node scripts/supervise-madrid-pilot.js --offline
 */
"use strict";

const https = require("https");
const http = require("http");

const MADRID_SLUG = "madrid-es";
const SEED_IDS = [
  "00000000-0000-4000-8000-000000001901",
  "00000000-0000-4000-8000-000000001902",
  "00000000-0000-4000-8000-000000001903",
];

function cliFlags(argv) {
  const args = new Set(argv || process.argv.slice(2));
  return {
    asJson: args.has("--json"),
    offline: args.has("--offline"),
  };
}

const startupFlags = cliFlags();
const AS_JSON = startupFlags.asJson;
const OFFLINE = startupFlags.offline;

function fetchText(url) {
  return new Promise(function (resolve, reject) {
    const lib = url.indexOf("https:") === 0 ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent": "town-madrid-operator-digest/4.0-es",
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
        "API/host de Madrid no está sano — revisa Railway / health/ready antes de cualquier trabajo cívico.",
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
      kind: "crecimiento",
      text:
        "Cero confirmaciones en las señales seed (todas 0/" +
        (stuck[0].requiredConfirmations || 5) +
        "). El piloto está en vivo pero el bucle cívico no ha arrancado — prioridad: 1–2 miembros reales en madrid.towncivic.org que pulsen YO TAMBIÉN LO VEO.",
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
        kind: "civico",
        text:
          s.area +
          ": " +
          s.confirmationCount +
          "/" +
          s.requiredConfirmations +
          " confirmaciones — faltan " +
          left +
          " para pasar a proposals. Titular: " +
          s.headline,
      });
    }
    if (s.stage === "confirmation" && s.reached) {
      actions.push({
        priority: 1,
        kind: "civico",
        text:
          s.area +
          " alcanzó el umbral de confirmación — verifica en la UI/plataforma que la etapa proposals sea visible.",
      });
    }
    if (s.stage && s.stage !== "confirmation") {
      actions.push({
        priority: 1,
        kind: "civico",
        text:
          s.area +
          " está en etapa " +
          s.stage +
          " — supervisa proposals/deliberación/voto según corresponda.",
      });
    }
  });

  if (digest.nonSeedCount > 0) {
    actions.push({
      priority: 2,
      kind: "moderacion",
      text:
        digest.nonSeedCount +
        " señal(es) nueva(s) además del seed — abre Plataforma → Moderation/Signals y decide hide/keep.",
    });
  }

  const badLocale = digest.signals.filter(function (s) {
    return s.locale && s.locale !== "es-ES";
  });
  if (badLocale.length) {
    actions.push({
      priority: 1,
      kind: "idioma",
      text:
        "Hay señales con locale ≠ es-ES en madrid-es — el piloto Madrid es solo español; investiga.",
    });
  }

  if (!actions.length) {
    actions.push({
      priority: 3,
      kind: "ok",
      text: "Nada urgente. Vuelve en el próximo run; vigila el delta de confirmaciones.",
    });
  }

  actions.sort(function (a, b) {
    return a.priority - b.priority;
  });
  return actions;
}

function memorySnapshot(digest) {
  return {
    at: digest.generatedAt,
    health: digest.health.status,
    nonSeedCount: digest.nonSeedCount,
    signals: digest.signals.map(function (s) {
      return {
        id: s.id,
        area: s.area,
        stage: s.stage,
        confirmationCount: s.confirmationCount,
        requiredConfirmations: s.requiredConfirmations,
        isSeed: s.isSeed,
      };
    }),
  };
}

async function buildDigest(options) {
  const opts = options || {};
  const offline =
    typeof opts.offline === "boolean" ? opts.offline : cliFlags().offline;
  const digest = {
    generatedAt: new Date().toISOString(),
    scope: "madrid-operator-es",
    locale: "es",
    health: { status: "UNKNOWN", checks: [] },
    signals: [],
    seedCount: 0,
    nonSeedCount: 0,
    actions: [],
    memory: null,
  };

  if (offline) {
    digest.health.status = "OFFLINE";
    digest.actions = [
      { priority: 3, kind: "ok", text: "Modo offline — sin sondas en vivo." },
    ];
    digest.memory = memorySnapshot(digest);
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
  digest.health.status = checks.some(function (c) {
    return !c.ok;
  })
    ? "DOWN"
    : "OPERATIONAL";

  if (!readyOk) {
    digest.actions = actionsFromDigest(digest);
    digest.memory = memorySnapshot(digest);
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
      reached: !!(d && d.transitionRule && d.transitionRule.reached),
      canConfirm: d ? d.canConfirm : null,
      civicHttp: civicRes.status,
    });
  }

  digest.actions = actionsFromDigest(digest);
  digest.memory = memorySnapshot(digest);
  return digest;
}

function printDigest(digest) {
  console.log("Digest operativo Madrid — " + digest.health.status);
  console.log("Hora: " + digest.generatedAt);
  console.log("Idioma: es (piloto Madrid)");
  console.log("");
  console.log("## A. Qué debes hacer ahora");
  digest.actions.forEach(function (a, idx) {
    console.log(idx + 1 + ". [" + a.kind + "] " + a.text);
  });
  console.log("");
  console.log("## C. Señales madrid-es");
  if (!digest.signals.length) console.log("(ninguna)");
  digest.signals.forEach(function (s) {
    const prog =
      s.confirmationCount == null
        ? "civic n/d HTTP " + s.civicHttp
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
  console.log("");
  console.log(
    "## Feed: seed=" +
      digest.seedCount +
      " nuevas=" +
      digest.nonSeedCount +
      " total=" +
      digest.signals.length
  );
  console.log("## D. Health (puerta)");
  digest.health.checks.forEach(function (c) {
    console.log(
      "- " + (c.ok ? "OK" : "FAIL") + " " + c.name + " — " + c.detail
    );
  });
  console.log("");
  console.log("## Memories (guardar esto)");
  console.log(JSON.stringify(digest.memory));
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

if (require.main === module) {
  main().catch(function (err) {
    console.error(err);
    process.exitCode = 1;
  });
}

module.exports = {
  buildDigest: buildDigest,
  memorySnapshot: memorySnapshot,
  actionsFromDigest: actionsFromDigest,
};
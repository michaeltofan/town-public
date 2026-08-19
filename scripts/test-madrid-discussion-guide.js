/**
 * Madrid discussion-routing agent — pure matcher + wiring contracts.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const guide = require(path.join(root, "madrid-discussion-guide.js"));
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

function ok(condition, message) {
  assert.ok(condition, message);
  console.log("OK:", message);
}

// --- Pure agent behaviour ---

ok(typeof guide.suggestMatches === "function", "suggestMatches exported");
ok(typeof guide.isStrongMatch === "function", "isStrongMatch exported");
ok(
  guide.tokenize("El Parque Central de AZCA necesita riego").indexOf("azca") >=
    0,
  "tokenizes AZCA place"
);
ok(
  guide.tokenize("La acera de la calle Argumosa").indexOf("argumosa") >= 0,
  "tokenizes Argumosa"
);

const madridScenes = [
  {
    id: "madrid-signal-1",
    signalId: "00000000-0000-4000-8000-000000001901",
    headline: "La acera de la calle Argumosa sigue agrietada frente al mercado",
    summary:
      "Varias baldosas rotas obligan a los peatones a esquivar la zona pegados a la calzada.",
    area: "Lavapiés",
    category: "ESPACIO PÚBLICO",
    description: "Baldosas rotas en Argumosa junto al mercado.",
  },
  {
    id: "madrid-signal-2",
    signalId: "00000000-0000-4000-8000-000000001902",
    headline:
      "Varias farolas llevan semanas apagadas junto al parque Tierno Galván",
    summary:
      "El tramo entre la estación y las viviendas queda a oscuras después del anochecer.",
    area: "Legazpi",
    category: "ALUMBRADO PÚBLICO",
  },
  {
    id: "madrid-signal-3",
    signalId: "00000000-0000-4000-8000-000000001903",
    headline:
      "Los contenedores junto a la puerta de Alcalá del parque del Retiro se desbordan los fines de semana",
    summary:
      "Bolsas y envases quedan alrededor de los contenedores llenos tras la alta afluencia del fin de semana.",
    area: "Retiro",
    category: "MEDIO AMBIENTE",
  },
];

const azcaDraft = {
  title: "El Parque Central de AZCA necesita riego urgente",
  description:
    "28 árboles aislados tras la valla de obras en Tetuán no reciben riego. Basura en la zona Oeste.",
  category: "MEDIO AMBIENTE",
};
ok(
  guide.suggestMatches(azcaDraft, madridScenes).length === 0,
  "AZCA draft does not falsely match unrelated Madrid seed signals"
);

const argumosaDraft = {
  title: "Siguen rotas las baldosas de Argumosa en Lavapiés",
  description:
    "La acera frente al mercado sigue agrietada y hay que caminar pegados a la calzada.",
  category: "ESPACIO PÚBLICO",
};
const argumosaHits = guide.suggestMatches(argumosaDraft, madridScenes);
ok(argumosaHits.length >= 1, "Argumosa draft matches an existing signal");
ok(
  argumosaHits[0].scene.id === "madrid-signal-1",
  "top match is the Argumosa sidewalk signal"
);
ok(guide.isStrongMatch(argumosaHits[0]), "Argumosa match is strong enough to guide");

const retiroDraft = {
  title: "Contenedores desbordados en el Retiro junto a la puerta de Alcalá",
  description: "El parque del Retiro acumula bolsas alrededor de los contenedores.",
  category: "MEDIO AMBIENTE",
};
const retiroHits = guide.suggestMatches(retiroDraft, madridScenes);
ok(retiroHits.length >= 1, "Retiro draft matches existing signal");
ok(
  retiroHits[0].scene.id === "madrid-signal-3",
  "top match is the Retiro containers signal"
);

const azcaScene = {
  id: "madrid-azca-1",
  signalId: "azca-uuid",
  headline: "El Parque Central de AZCA se deteriora por falta de riego",
  summary: "Árboles dentro de la valla de obras en Tetuán sin riego.",
  area: "Tetuán",
  category: "MEDIO AMBIENTE",
  description: "Basura y rotura del sistema de riego en AZCA.",
};
const azcaHits = guide.suggestMatches(azcaDraft, madridScenes.concat([azcaScene]));
ok(azcaHits.length >= 1, "AZCA draft matches AZCA scene when present");
ok(azcaHits[0].scene.id === "madrid-azca-1", "AZCA is the top match");
ok(
  azcaHits[0].reason === "same_place" || azcaHits[0].placeHits.length >= 1,
  "AZCA match cites place identity"
);

ok(
  guide.suggestMatches({ title: "Hola", description: "" }, madridScenes)
    .length === 0,
  "too-short draft yields no suggestions"
);

// --- Wiring contracts ---

ok(
  html.includes('src="madrid-discussion-guide.js'),
  "guide script is loaded on the public surface"
);
ok(
  html.includes('id="signal-create-guide"'),
  "signal-create hosts the guide panel"
);
ok(
  html.includes('id="signal-create-guide-list"'),
  "guide list container present"
);
ok(
  html.includes('id="signal-create-guide-continue"'),
  "publish-anyway control present"
);
ok(css.includes("signal-create__guide"), "guide styles present");
ok(js.includes("TownMadridDiscussionGuide"), "script reads the guide agent");
ok(js.includes("function refreshMadridDiscussionGuide"), "refresh helper wired");
ok(js.includes("function openMadridGuidedDiscussion"), "join-discussion helper wired");
ok(js.includes("madridPilotCityId"), "guide remains Madrid-pilot scoped");
ok(
  js.includes('SIGNAL_CREATE_CATEGORIES') &&
    /Madrid:\s*\[[^\]]*"ESPACIO PÚBLICO"/.test(js),
  "Madrid signal-create categories include ESPACIO PÚBLICO"
);
ok(
  /Madrid:\s*\[[^\]]*"MEDIO AMBIENTE"/.test(js),
  "Madrid signal-create categories include MEDIO AMBIENTE"
);
ok(
  html.includes("madrid-discussion-guide.js?v=") &&
    html.includes("script.js?v=madrid-es-4"),
  "cache keys bumped for guide ship"
);

console.log("PASSED: madrid discussion guide assertions");

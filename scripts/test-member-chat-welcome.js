/**
 * Member CHAT welcome — unlocks after civic membership activation with a
 * system intro and Madrid open-data link (not peer messaging).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const i18nSrc = fs.readFileSync(path.join(root, "public-i18n.js"), "utf8");
const i18n = require(path.join(root, "public-i18n.js"));

let passed = 0;
function assert(condition, message) {
  if (!condition) {
    console.error("FAILED:", message);
    process.exit(1);
  }
  passed += 1;
}

function fnBody(name) {
  const re = new RegExp("function " + name + "\\(\\)\\s*\\{");
  const match = js.match(re);
  assert(!!match, name + " function exists");
  const start = match.index + match[0].length;
  let depth = 1;
  let i = start;
  while (i < js.length && depth > 0) {
    const ch = js[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") depth -= 1;
    i += 1;
  }
  return js.slice(start, i - 1);
}

assert(html.includes('id="chat-panel"'), "chat panel markup present");
assert(html.includes('id="chat-madrid-link"'), "Madrid link element present");
assert(
  html.includes('href="https://datos.madrid.es/dataset/"'),
  "Madrid open-data href is wired in markup"
);
assert(
  /rel="noopener noreferrer"/.test(
    html.slice(html.indexOf('id="chat-madrid-link"'), html.indexOf('id="chat-madrid-link"') + 280)
  ),
  "Madrid link uses noopener noreferrer"
);

assert(
  js.includes('MADRID_OPEN_DATA_CATALOG_URL = "https://datos.madrid.es/dataset/"'),
  "script keeps Madrid catalog URL constant"
);
assert(
  js.includes("function canAccessMemberChatWelcome"),
  "chat welcome access helper exists"
);
assert(
  js.includes("function shouldShowMadridChatResource"),
  "Madrid resource gate helper exists"
);
assert(
  js.includes("function openChatWelcomePanel") &&
    js.includes("function closeChatWelcomePanel") &&
    js.includes("function applyChatWelcomeCopy"),
  "chat welcome open/close/copy helpers exist"
);

const access = fnBody("canAccessMemberChatWelcome");
assert(
  access.includes("canTakeCivicAction"),
  "chat welcome unlocks only with civic participation"
);

const madridGate = fnBody("shouldShowMadridChatResource");
assert(
  madridGate.includes("isMadridPilotHost") && madridGate.includes('"Madrid"'),
  "Madrid resource shows on pilot host or Madrid home community"
);

const chatNav = fnBody("handleChatNav");
assert(
  chatNav.includes("canAccessMemberChatWelcome") &&
    chatNav.includes("openChatWelcomePanel") &&
    chatNav.includes("showTransientFeedNotice") &&
    chatNav.includes("chatUnavailable") &&
    !chatNav.includes("openAuthWindow"),
  "CHAT nav branches member welcome vs visitor unavailable"
);

const openWelcome = fnBody("openChatWelcomePanel");
assert(
  openWelcome.includes("canAccessMemberChatWelcome") &&
    openWelcome.includes("applyChatWelcomeCopy") &&
    openWelcome.includes("closeActivityPanel") &&
    openWelcome.includes("closeProfilePanel"),
  "opening welcome requires access and closes competing panels"
);

const applyCopy = fnBody("applyChatWelcomeCopy");
assert(
  applyCopy.includes("shouldShowMadridChatResource") &&
    applyCopy.includes("chatMessage.hidden") &&
    applyCopy.includes("MADRID_OPEN_DATA_CATALOG_URL"),
  "copy applies Madrid message only when resource gate passes"
);

const navCopy = fnBody("applyPublicNavCopy");
assert(
  navCopy.includes("canAccessMemberChatWelcome") &&
    navCopy.includes('classList.remove("is-unavailable")') &&
    navCopy.includes('classList.add("is-unavailable")'),
  "nav chrome unlocks CHAT for members and marks unavailable otherwise"
);

assert(
  js.includes('chatClose.addEventListener("click"') &&
    js.includes('chatDim.addEventListener("click"') &&
    js.includes('chatFeed.addEventListener("click"') &&
    js.includes("closeChatWelcomePanel()"),
  "chat panel close controls are wired"
);
assert(
  js.includes("!chatPanel.hidden") && js.includes("closeChatWelcomePanel"),
  "Escape / overlay stack includes chat panel"
);

const langs = ["en", "es", "fr", "hu", "it", "de", "ro"];
for (let i = 0; i < langs.length; i++) {
  const lang = langs[i];
  const chrome = i18n.feedChromeCopy(lang);
  assert(!!chrome.chatWelcomeTitle, "chatWelcomeTitle present for " + lang);
  assert(!!chrome.chatWelcomeBody, "chatWelcomeBody present for " + lang);
  assert(
    !!chrome.chatWelcomeMessageText,
    "chatWelcomeMessageText present for " + lang
  );
  assert(
    !!chrome.chatWelcomeLinkLabel,
    "chatWelcomeLinkLabel present for " + lang
  );
  assert(
    String(chrome.chatWelcomeLinkLabel).indexOf("datos.madrid.es") !== -1,
    "chatWelcomeLinkLabel mentions datos.madrid.es for " + lang
  );
  assert(!!chrome.chatUnavailable, "chatUnavailable still present for " + lang);
}

assert(
  i18nSrc.includes("chatWelcomeAvailable") &&
    i18nSrc.includes("chatWelcomeMessageMeta"),
  "i18n source includes welcome keys"
);

console.log("PASSED: " + passed + " member chat welcome assertions");

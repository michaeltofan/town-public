"use strict";

const RESEND_API_BASE = "https://api.resend.com";

function buildUniqueEmail(template, tag) {
  const value = String(template || "").trim().toLowerCase();
  const safeTag = String(tag || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  if (!value.includes("{tag}")) {
    throw new Error("TOWN_E2E_EMAIL_BASE must contain the literal {tag} placeholder");
  }
  if (!safeTag) {
    throw new Error("A non-empty email tag is required");
  }

  const email = value.replaceAll("{tag}", safeTag);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("TOWN_E2E_EMAIL_BASE does not produce a valid email address");
  }
  return email;
}

function recipientMatches(message, recipient) {
  const expected = String(recipient).toLowerCase();
  const recipients = Array.isArray(message && message.to) ? message.to : [];
  return recipients.some((value) => String(value).toLowerCase() === expected);
}

function extractVerificationCode(message) {
  const text = [message && message.subject, message && message.text, message && message.html]
    .filter(Boolean)
    .join("\n")
    .replace(/<[^>]*>/g, " ");
  const matches = [...text.matchAll(/(?:^|\D)(\d{6})(?!\d)/g)].map(
    (match) => match[1]
  );
  const unique = [...new Set(matches)];
  if (unique.length !== 1) {
    throw new Error("Expected exactly one six-digit verification code in the email");
  }
  return unique[0];
}

async function resendRequest(apiKey, path) {
  const response = await fetch(`${RESEND_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) {
    throw new Error(`Resend API request failed with status ${response.status}`);
  }
  return response.json();
}

async function waitForVerificationCode({
  apiKey,
  recipient,
  requestedAfter,
  timeoutMs = 60_000,
  pollIntervalMs = 2_000,
}) {
  const deadline = Date.now() + timeoutMs;
  const threshold = new Date(requestedAfter).getTime() - 5_000;

  while (Date.now() < deadline) {
    const listing = await resendRequest(apiKey, "/emails?limit=100");
    const messages = Array.isArray(listing && listing.data) ? listing.data : [];
    const match = messages.find((message) => {
      const createdAt = new Date(message.created_at || 0).getTime();
      return createdAt >= threshold && recipientMatches(message, recipient);
    });

    if (match && match.id) {
      const message = await resendRequest(apiKey, `/emails/${encodeURIComponent(match.id)}`);
      return extractVerificationCode(message);
    }
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error("Timed out waiting for the verification email in Resend");
}

module.exports = {
  buildUniqueEmail,
  extractVerificationCode,
  recipientMatches,
  waitForVerificationCode,
};

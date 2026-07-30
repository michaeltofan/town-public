/**
 * Deterministic tests for TownMembershipRecovery — advisory marker, snapshot
 * derivation, fail-closed access rules, and bounded polling with fake timers.
 */
"use strict";

const path = require("path");
const recovery = require(path.join(__dirname, "..", "membership-recovery.js"));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed += 1;
    console.log("OK: " + message);
  } else {
    failed += 1;
    console.error("FAIL: " + message);
  }
}

function assertEqual(actual, expected, message) {
  const ok = Object.is(actual, expected);
  assert(
    ok,
    message +
      " (expected " +
      JSON.stringify(expected) +
      ", got " +
      JSON.stringify(actual) +
      ")"
  );
}

function makeMemoryStorage() {
  const map = Object.create(null);
  return {
    getItem: function (key) {
      return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : null;
    },
    setItem: function (key, value) {
      map[key] = String(value);
    },
    removeItem: function (key) {
      delete map[key];
    },
    _map: map,
  };
}

function makeFakeClock() {
  let now = 0;
  const timers = [];
  let nextId = 1;
  return {
    now: function () {
      return now;
    },
    setTimeout: function (fn, ms) {
      const id = nextId++;
      timers.push({ id: id, fn: fn, due: now + ms });
      return id;
    },
    clearTimeout: function (id) {
      for (let i = 0; i < timers.length; i++) {
        if (timers[i].id === id) {
          timers.splice(i, 1);
          return;
        }
      }
    },
    advance: function (ms) {
      now += ms;
      timers.sort(function (a, b) {
        return a.due - b.due;
      });
      let guard = 0;
      while (timers.length && timers[0].due <= now && guard < 1000) {
        guard += 1;
        const t = timers.shift();
        t.fn();
      }
    },
    pendingCount: function () {
      return timers.length;
    },
  };
}

function membershipPayload(status, canParticipate, extra) {
  const body = {
    data: {
      membership: {
        status: status,
        accessUntil: "2027-01-01T00:00:00.000Z",
        cancelAtPeriodEnd: status === "cancelling",
      },
      access: {
        level: "member",
        canParticipate: canParticipate,
        localEligibility: "eligible",
      },
    },
  };
  if (extra) {
    Object.assign(body.data.membership, extra.membership || {});
    Object.assign(body.data.access, extra.access || {});
  }
  return body;
}

// --- 1. Checkout redirect records only an advisory pending marker ---
const store = makeMemoryStorage();
assert(
  recovery.setCheckoutPendingMarker(store) === true,
  "checkout pending marker can be recorded"
);
assertEqual(
  store.getItem(recovery.CHECKOUT_PENDING_KEY),
  recovery.CHECKOUT_PENDING_VALUE,
  "marker value is the advisory constant only"
);
assertEqual(
  Object.keys(store._map).length,
  1,
  "marker storage holds only the advisory key"
);
assert(
  store.getItem(recovery.CHECKOUT_PENDING_KEY).indexOf("cus_") === -1 &&
    store.getItem(recovery.CHECKOUT_PENDING_KEY).indexOf("cs_") === -1 &&
    store.getItem(recovery.CHECKOUT_PENDING_KEY).indexOf("pi_") === -1,
  "marker contains no provider/payment identifiers"
);

// --- 2. Marker alone never grants membership or participation ---
assert(
  recovery.hasCheckoutPendingMarker(store) === true,
  "marker is readable after set"
);
assert(
  recovery.markerGrantsAuthorization(true) === false,
  "markerGrantsAuthorization is always false"
);
assert(
  recovery.enablesMemberAuthorizedState(null) === false,
  "null snapshot does not authorize membership"
);
assert(
  recovery.enablesCivicParticipation(null) === false,
  "null snapshot does not authorize civic participation"
);
assert(
  recovery.isPaidMembership(null) === false,
  "paid membership fails closed without snapshot"
);

// --- 3/4. Active + canParticipate true enables member-authorized state ---
const activeOk = recovery.deriveMembershipSnapshot(
  membershipPayload("active", true)
);
assert(activeOk !== null, "active payload derives a snapshot");
assertEqual(activeOk.status, "active", "active status preserved");
assertEqual(activeOk.canParticipate, true, "canParticipate true preserved");
assert(
  recovery.enablesMemberAuthorizedState(activeOk) === true,
  "active + canParticipate enables member-authorized state"
);
assert(
  recovery.enablesCivicParticipation(activeOk) === true,
  "active + canParticipate enables civic participation"
);

// --- 5. Active + canParticipate false does not enable civic participation ---
const activeNoPart = recovery.deriveMembershipSnapshot(
  membershipPayload("active", false)
);
assert(
  recovery.isPaidMembership(activeNoPart) === true,
  "active without participation is still paid membership"
);
assert(
  recovery.enablesCivicParticipation(activeNoPart) === false,
  "active + canParticipate false does not enable civic participation"
);
assert(
  recovery.enablesMemberAuthorizedState(activeNoPart) === false,
  "active without canParticipate is not fully member-authorized"
);

const cancelling = recovery.deriveMembershipSnapshot(
  membershipPayload("cancelling", true)
);
assert(
  recovery.isPaidMembership(cancelling) === true,
  "cancelling counts as paid membership"
);

// --- 6. Inactive, expired, suspended, paid_pending_binding, malformed, failures fail closed ---
["inactive", "expired", "suspended", "paid_pending_binding"].forEach(
  function (status) {
    const snap = recovery.deriveMembershipSnapshot(
      membershipPayload(status, true)
    );
    assert(
      recovery.isPaidMembership(snap) === false,
      status + " is not paid membership"
    );
    assert(
      recovery.enablesMemberAuthorizedState(snap) === false,
      status + " does not authorize member state even if canParticipate true"
    );
    assert(
      recovery.isTerminalMembershipOutcome(snap) === true,
      status + " is a terminal outcome for recovery polling"
    );
  }
);

assert(
  recovery.deriveMembershipSnapshot(null) === null,
  "null payload fails closed"
);
assert(
  recovery.deriveMembershipSnapshot({}) === null,
  "empty payload fails closed"
);
assert(
  recovery.deriveMembershipSnapshot({ data: {} }) === null,
  "missing membership/access fails closed"
);
assert(
  recovery.deriveMembershipSnapshot({
    data: { membership: { status: "active" }, access: null },
  }) === null,
  "missing access object fails closed"
);
assert(
  recovery.deriveMembershipSnapshot({
    data: {
      membership: { status: 1 },
      access: { canParticipate: true },
    },
  }) === null,
  "non-string status fails closed"
);
assert(
  recovery.canParticipate(
    recovery.deriveMembershipSnapshot(membershipPayload("active", "yes"))
  ) === false,
  "non-boolean canParticipate fails closed"
);

function flushMicrotasks() {
  return new Promise(function (resolve) {
    setImmediate(resolve);
  });
}

// --- 7/8. Webhook delay: bounded retries; stop after success, timeout, or exit ---
function testPollerBoundedUntilActive() {
  const clock = makeFakeClock();
  let polls = 0;
  let stoppedWith = null;
  const poller = recovery.createBoundedPoller({
    maxMs: 10000,
    intervalMs: 2000,
    now: clock.now,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    poll: function () {
      polls += 1;
      if (polls < 3) {
        // Malformed / not-yet-ready → keep waiting
        return { data: { membership: {}, access: {} } };
      }
      return membershipPayload("active", true);
    },
    shouldStop: function (payload) {
      const snap = recovery.deriveMembershipSnapshot(payload);
      return recovery.isTerminalMembershipOutcome(snap);
    },
    onStop: function (reason) {
      stoppedWith = reason;
    },
  });
  poller.start();
  return flushMicrotasks()
    .then(function () {
      assertEqual(polls, 1, "poller runs first attempt immediately");
      clock.advance(2000);
      return flushMicrotasks();
    })
    .then(function () {
      assertEqual(polls, 2, "poller retries after interval");
      clock.advance(2000);
      return flushMicrotasks();
    })
    .then(function () {
      assertEqual(polls, 3, "poller retries again");
      assertEqual(
        stoppedWith,
        "success",
        "poller stops after authoritative terminal success"
      );
      assertEqual(clock.pendingCount(), 0, "no further timers after success");
      const pollsAfterSuccess = polls;
      clock.advance(20000);
      assertEqual(polls, pollsAfterSuccess, "no infinite polling after success");
    });
}

function testPollerTimeout() {
  const clock = makeFakeClock();
  let polls = 0;
  let stoppedWith = null;
  const poller = recovery.createBoundedPoller({
    maxMs: 5000,
    intervalMs: 2000,
    now: clock.now,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    poll: function () {
      polls += 1;
      return { data: { membership: {}, access: {} } };
    },
    shouldStop: function (payload) {
      return recovery.isTerminalMembershipOutcome(
        recovery.deriveMembershipSnapshot(payload)
      );
    },
    onStop: function (reason) {
      stoppedWith = reason;
    },
  });
  poller.start();
  return flushMicrotasks()
    .then(function () {
      clock.advance(2000);
      return flushMicrotasks();
    })
    .then(function () {
      clock.advance(2000);
      return flushMicrotasks();
    })
    .then(function () {
      clock.advance(2000);
      return flushMicrotasks();
    })
    .then(function () {
      assertEqual(stoppedWith, "timeout", "poller stops at bounded timeout");
      const pollsAtTimeout = polls;
      clock.advance(20000);
      assertEqual(
        polls,
        pollsAtTimeout,
        "timeout ends polling — no infinite loop"
      );
      assert(pollsAtTimeout <= 4, "timeout uses a small bounded attempt count");
    });
}

function testPollerExit() {
  const clock = makeFakeClock();
  let polls = 0;
  let stoppedWith = null;
  const poller = recovery.createBoundedPoller({
    maxMs: 20000,
    intervalMs: 2000,
    now: clock.now,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    poll: function () {
      polls += 1;
      return { data: { membership: {}, access: {} } };
    },
    shouldStop: function () {
      return false;
    },
    onStop: function (reason) {
      stoppedWith = reason;
    },
  });
  poller.start();
  return flushMicrotasks().then(function () {
    clock.advance(2000);
    poller.stop();
    assertEqual(stoppedWith, "exit", "explicit exit stops the recovery poller");
    const pollsAtExit = polls;
    clock.advance(20000);
    assertEqual(polls, pollsAtExit, "exit prevents further polls");
  });
}

function testNoOverlappingPolls() {
  const clock = makeFakeClock();
  let started = 0;
  let resolvePoll = null;
  const poller = recovery.createBoundedPoller({
    maxMs: 20000,
    intervalMs: 1000,
    now: clock.now,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    poll: function () {
      started += 1;
      return new Promise(function (resolve) {
        resolvePoll = function () {
          resolve({ data: { membership: {}, access: {} } });
        };
      });
    },
    shouldStop: function () {
      return false;
    },
  });
  poller.start();
  return flushMicrotasks()
    .then(function () {
      assertEqual(started, 1, "one in-flight poll starts");
      clock.advance(5000);
      assertEqual(started, 1, "no overlapping poll while prior request is open");
      resolvePoll();
      return flushMicrotasks();
    })
    .then(function () {
      clock.advance(1000);
      return flushMicrotasks();
    })
    .then(function () {
      assertEqual(
        started,
        2,
        "next poll only after prior completes + interval"
      );
      poller.stop();
    });
}

// --- 9. Manual retry performs a new authoritative membership read (helper contract) ---
assert(
  typeof recovery.deriveMembershipSnapshot === "function",
  "manual retry reuses deriveMembershipSnapshot on a fresh payload"
);
const manual = recovery.deriveMembershipSnapshot(
  membershipPayload("active", true)
);
assert(
  recovery.enablesMemberAuthorizedState(manual) === true,
  "manual retry can establish authorized state from a new read"
);

// --- Clear marker helpers ---
assert(recovery.clearCheckoutPendingMarker(store) === true, "marker clears");
assert(
  recovery.hasCheckoutPendingMarker(store) === false,
  "marker absent after clear"
);

// Direct navigation / absent marker cannot manufacture membership
assert(
  recovery.enablesMemberAuthorizedState(
    recovery.deriveMembershipSnapshot(undefined)
  ) === false,
  "direct navigation without backend payload cannot manufacture membership"
);

testPollerBoundedUntilActive()
  .then(testPollerTimeout)
  .then(testPollerExit)
  .then(testNoOverlappingPolls)
  .then(function () {
    console.log("");
    console.log(passed + " passed, " + failed + " failed");
    if (failed > 0) process.exit(1);
  })
  .catch(function (err) {
    console.error(err);
    process.exit(1);
  });

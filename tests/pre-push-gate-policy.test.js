import test from "node:test";
import assert from "node:assert/strict";

import {
  classifyPrePushGate,
  parsePrePushUpdates,
} from "../scripts/pre-push-gate-policy.mjs";

const ZERO = "0".repeat(40);
const MAIN = "1".repeat(40);
const CONTENT = "2".repeat(40);
const REMOTE = "3".repeat(40);

function update(localRef, localOid, remoteRef, remoteOid) {
  return `${localRef} ${localOid} ${remoteRef} ${remoteOid}`;
}

test("pre-push parser does not advance on empty or malformed input", () => {
  assert.equal(parsePrePushUpdates("").ok, false);
  assert.equal(parsePrePushUpdates("not a ref update").ok, false);
  assert.deepEqual(
    classifyPrePushGate({ input: "", originMainOid: MAIN }),
    { action: "run", reason: "no ref updates received" }
  );
  assert.deepEqual(
    classifyPrePushGate({
      input: update("refs/heads/codex/test", "not-an-oid", "refs/heads/codex/test", ZERO),
      originMainOid: MAIN,
    }),
    { action: "run", reason: "malformed object id" }
  );
});

test("pre-push policy skips one or more pure ref deletions", () => {
  const input = [
    update("(delete)", ZERO, "refs/heads/codex/old-one", REMOTE),
    update("(delete)", ZERO, "refs/heads/codex/old-two", CONTENT),
  ].join("\n");

  assert.deepEqual(classifyPrePushGate({ input, originMainOid: "" }), {
    action: "skip",
    reason: "all updates delete remote refs",
  });
});

test("pre-push policy skips a new codex branch at exact origin/main", () => {
  const input = update(
    "refs/heads/codex/successor",
    MAIN,
    "refs/heads/codex/successor",
    ZERO
  );

  assert.deepEqual(classifyPrePushGate({ input, originMainOid: MAIN }), {
    action: "skip",
    reason: "all updates create codex branches at exact origin/main",
  });
});

test("pre-push policy runs for content-bearing, existing, or non-codex refs", () => {
  const cases = [
    update("refs/heads/codex/topic", CONTENT, "refs/heads/codex/topic", ZERO),
    update("refs/heads/codex/topic", MAIN, "refs/heads/codex/topic", REMOTE),
    update("refs/heads/topic", MAIN, "refs/heads/topic", ZERO),
    update("refs/tags/v1", MAIN, "refs/tags/v1", ZERO),
  ];

  for (const input of cases) {
    assert.deepEqual(classifyPrePushGate({ input, originMainOid: MAIN }), {
      action: "run",
      reason: "push contains content-bearing ref updates",
    });
  }
});

test("pre-push policy runs for mixed deletion and successor creation", () => {
  const input = [
    update("(delete)", ZERO, "refs/heads/codex/old", REMOTE),
    update("refs/heads/codex/new", MAIN, "refs/heads/codex/new", ZERO),
  ].join("\n");

  assert.deepEqual(classifyPrePushGate({ input, originMainOid: MAIN }), {
    action: "run",
    reason: "push contains content-bearing ref updates",
  });
});

test("pre-push policy runs when origin/main cannot be verified", () => {
  const input = update(
    "refs/heads/codex/successor",
    MAIN,
    "refs/heads/codex/successor",
    ZERO
  );

  assert.deepEqual(classifyPrePushGate({ input, originMainOid: "" }), {
    action: "run",
    reason: "origin/main object id unavailable",
  });
});

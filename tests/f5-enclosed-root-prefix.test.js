import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import {
  BRIDGE_PATH, PREFIX_SCHEMA,
  REDUCER_PATH, assertPrefixAgreement, assertPrefixOrder,
  verifyPrefixSnapshot,
} from "../scripts/eom/verify-f5-enclosed-root-prefix.mjs";

const ROOT = process.cwd();
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
const H = "a".repeat(64), OTHER = "b".repeat(64);

// Abstract summary-only controls are not root packets and cannot be passed to
// the production verifier. No test fabricates an accepted production receipt.
function summaries(order = [8, 32]) {
  return order.map((rungSamples) => ({ rungSamples, campaignId: "composition-control",
    runId: "not-actual-evidence", bindingSetSha256: H,
    implementationBindingSetSha256: H, memberSetSha256: H, controlSetSha256: H }));
}
const identity = { campaignId: "composition-control", runId: "not-actual-evidence" };

function negativeFiles(rungSamples = 8) {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-prefix-negative-"));
  const history = path.join(directory, "invalid-history.json");
  const rung = path.join(directory, "incomplete-rung.json");
  const output = path.join(directory, "rejection.json");
  writeFileSync(history, "{}\n");
  writeFileSync(rung, `${JSON.stringify({ rungSamples })}\n`);
  return { directory, history, rung, output };
}

function cli(files, extra = [], script = path.join(ROOT, BRIDGE_PATH)) {
  return spawnSync(process.execPath, [script, "--repo-root", ROOT,
    "--history-manifest", files.history, "--rung", files.rung,
    "--out", files.output, ...extra], { cwd: ROOT, encoding: "utf8", timeout: 15000 });
}





test("only genuine initial rung orders are admissible", () => {
  assert.equal(assertPrefixOrder([8]), undefined);
  assert.equal(assertPrefixOrder([8, 32]), undefined);
  for (const order of [[], [32], [128], [8, 8], [32, 8], [8, 128],
    [8, 32, 128], ["8"], [8, "32"], null, { 0: 8, length: 1 }]) {
    assert.throws(() => assertPrefixOrder(order), /genuine prefix/u);
  }
});

test("summary composition succeeds without returning acceptance authority", () => {
  assert.equal(assertPrefixAgreement(summaries([8]), identity), undefined);
  assert.equal(assertPrefixAgreement(summaries(), identity), undefined);
});

test("campaign and run must match every rung and the original manifest", () => {
  for (const field of ["campaignId", "runId"]) {
    const rows = summaries();
    rows[1][field] = "different";
    assert.throws(() => assertPrefixAgreement(rows, identity), new RegExp(field, "u"));
    assert.throws(() => assertPrefixAgreement(summaries(), { ...identity, [field]: "different" }), new RegExp(field, "u"));
    assert.throws(() => assertPrefixAgreement(summaries(), { ...identity, [field]: "" }), new RegExp(field, "u"));
  }
});

test("all four checked binding-summary identities must agree", () => {
  for (const field of ["bindingSetSha256", "implementationBindingSetSha256", "memberSetSha256", "controlSetSha256"]) {
    const rows = summaries();
    rows[1][field] = OTHER;
    assert.throws(() => assertPrefixAgreement(rows, identity), new RegExp(field, "u"));
    delete rows[1][field];
    assert.throws(() => assertPrefixAgreement(rows, identity), new RegExp(field, "u"));
    rows[1][field] = "not-a-hash";
    assert.throws(() => assertPrefixAgreement(rows, identity), new RegExp(field, "u"));
  }
});



test("fresh production CLI rejects unsupported rung order, never fabricates missing rungs", () => {
  const files = negativeFiles(32);
  const result = cli(files);
  assert.equal(result.status, 1, result.stderr);
  const receipt = JSON.parse(readFileSync(files.output));
  assert.equal(receipt.schema, PREFIX_SCHEMA);
  assert.equal(receipt.accepted, false);
  assert.equal(receipt.h3EvidenceEligible, false);
  assert.equal(receipt.completeLadder, false);
  assert.match(receipt.failure, /genuine prefix/u);
});

test("fresh production CLI reaches frozen manifest validation and rejects incomplete evidence", () => {
  const files = negativeFiles(8);
  const result = cli(files);
  assert.equal(result.status, 1, result.stderr);
  const receipt = JSON.parse(readFileSync(files.output));
  assert.equal(receipt.accepted, false);
  assert.equal(receipt.h3EvidenceEligible, false);
  assert.match(receipt.failure, /history manifest.*missing schema/u);
});

test("create-exclusive output preserves an existing rejection byte for byte", () => {
  const files = negativeFiles();
  const original = Buffer.from("existing evidence must not change\n");
  writeFileSync(files.output, original);
  const result = cli(files);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /output already exists/u);
  assert.deepEqual(readFileSync(files.output), original);
});

test("ambiguous CLI singleton overrides are rejected", () => {
  const files = negativeFiles();
  const result = cli(files, ["--repo-root", ROOT]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /duplicate argument/u);
});

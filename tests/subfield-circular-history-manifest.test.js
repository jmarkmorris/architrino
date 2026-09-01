import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import {
  SUBFIELD_CIRCULAR_FROZEN_BINDINGS, SUBFIELD_CIRCULAR_HISTORY_SCHEMA, SUBFIELD_CIRCULAR_PROOF_SCHEMA,
  inspectSubfieldCircularHistoryStructureForTests,
} from "../scripts/eom/verify-subfield-circular-history.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const CLI = path.join(ROOT, "scripts/eom/verify-subfield-circular-history.mjs");
const reference = JSON.parse(readFileSync(path.join(ROOT,
  SUBFIELD_CIRCULAR_FROZEN_BINDINGS.find((binding) => binding.id === "root-reference").path)));
const POSITION_ERROR = "0.0000000000072759576141834259033203125";
const VELOCITY_ERROR = "0.0000002384185791015625";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");

function millionths(value) {
  const whole = Math.floor(value / 1000000), remainder = value % 1000000;
  return remainder === 0 ? String(whole) : `${whole}.${String(remainder).padStart(6, "0").replace(/0+$/u, "")}`;
}
function bits(token) {
  const bytes = Buffer.alloc(8);
  bytes.writeDoubleBE(Number(token));
  return bytes.toString("hex");
}

// Independent transcription of History.cpp's length-prefixed FNV chain.
// No production/helper fingerprint output supplies this expected value.
function chain(segments) {
  let result = 0xcbf29ce484222325n;
  const update = (text) => {
    const payload = Buffer.from(text, "utf8");
    const framed = Buffer.concat([Buffer.from(String(payload.length) + ":"), payload]);
    for (const byte of framed) result = ((result ^ BigInt(byte)) * 0x100000001b3n) & 0xffffffffffffffffn;
  };
  update("eom_history_segment_chain/v1");
  for (const segment of segments) {
    [segment.tStart, segment.tEnd, ...segment.coefficients.flat(),
      ...segment.positionErrors, ...segment.velocityErrors].forEach(update);
  }
  return `fnv1a64-chain-v1:${result.toString(16).padStart(16, "0")}`;
}

// PLUMBING ONLY: these constant polynomials are intentionally NOT the approved
// circular histories. No whole-manifest positive mathematical fixture or sub-field circular
// subject adapter is manufactured by this suite.
function plumbingManifest(candidateId = "coincident-midpoint-common-frequency", rung = 2, phase = 0) {
  const chosen = reference.results.find((row) => row.id === candidateId);
  const source = JSON.parse(readFileSync(path.join(ROOT, chosen.sourcePath)));
  const time = 4000000 + 4000000 * phase / rung;
  assert.equal(Number.isSafeInteger(time), true);
  const lower = time - 2000000;
  const manifestId = `subfield-circular-history/v1:${candidateId}:T=${millionths(time)}`;
  const constituents = new Map(source.constituents.map((member) => [member.id, member]));
  const worldlines = new Map(source.worldlines.map((member) => [member.constituentId, member]));
  const members = source.relationships.sourceOrder.map((id, index) => {
    const worldline = worldlines.get(id), constituent = constituents.get(id);
    const segments = Array.from({ length: 1000 }, (_, segmentIndex) => {
      const tStart = millionths(lower + 2000 * segmentIndex), tEnd = millionths(lower + 2000 * (segmentIndex + 1));
      return { index: segmentIndex, tStart, tEnd,
        coefficients: [[String(index + 1), "0", "0", "0"], ["0", "0", "0", "0"], ["0", "0", "0", "0"]],
        positionErrors: [POSITION_ERROR, POSITION_ERROR, POSITION_ERROR],
        velocityErrors: [VELOCITY_ERROR, VELOCITY_ERROR, VELOCITY_ERROR],
        parsedEndpointBits: [bits(tStart), bits(tEnd)] };
    });
    return { index, constituentId: id, worldlineId: worldline.id, polarity: constituent.polarity,
      historyId: `${manifestId}/${worldline.id}`, historyFingerprint: chain(segments), segments };
  });
  return { schema: SUBFIELD_CIRCULAR_HISTORY_SCHEMA, manifestId, candidateId,
    sourceBinding: { path: chosen.sourcePath, sha256: chosen.sourceSha256 },
    normalizedFieldSpeed: "1", receptionTime: millionths(time), retainedInterval: [millionths(lower), millionths(time)], members };
}

const PLUMBING = plumbingManifest();
const bytes = (object = PLUMBING) => Buffer.from(JSON.stringify(object));
const inspect = (object = PLUMBING, rung = 2, phase = 0) => inspectSubfieldCircularHistoryStructureForTests(bytes(object), rung, phase);
function fails(mutate, pattern) {
  const altered = structuredClone(PLUMBING);
  mutate(altered);
  assert.throws(() => inspect(altered), pattern);
}

test("complete synthetic census is plumbing only and never actual evidence", () => {
  const result = inspect();
  assert.equal(result.plumbingValidated, true);
  assert.equal(result.accepted, false);
  assert.equal(result.actualCarrierValidated, false);
  assert.equal(result.h3EvidenceEligible, false);
  assert.equal(result.authority, "test-only-structural-plumbing-not-actual-evidence");
  assert.equal(result.memberCount, 6);
  assert.equal(result.segmentCount, 6000);
  assert.equal(result.manifestSha256, sha(bytes()));
});

test("repeated receptions retain exact manifest identity independently of rung", () => {
  const expected = inspect();
  for (const rung of [8, 32, 128]) {
    const result = inspect(PLUMBING, rung, 0);
    assert.equal(result.manifestId, expected.manifestId);
    assert.equal(result.manifestSha256, expected.manifestSha256);
  }
  assert.throws(() => inspect(PLUMBING, 3, 0), /rung/);
  assert.throws(() => inspect(PLUMBING, 2, 2), /phase/);
  assert.throws(() => inspect(PLUMBING, 128, 1), /exact reception/);
  fails((manifest) => { manifest.receptionTime = "4.0"; }, /exact reception/);
  fails((manifest) => { manifest.runId = "not-part-of-history-identity"; }, /extra fields/);
});

test("nonzero repeated phases and the twelve-member final phase retain complete plumbing coverage", () => {
  const shared = plumbingManifest("coincident-midpoint-common-frequency", 2, 1);
  assert.equal(inspect(shared, 2, 1).manifestSha256, inspect(shared, 8, 4).manifestSha256);
  const final = plumbingManifest("coincident-center-two-component-circular-co-rotating", 128, 127);
  const result = inspect(final, 128, 127);
  assert.equal(result.manifestId, "subfield-circular-history/v1:coincident-center-two-component-circular-co-rotating:T=7.96875");
  assert.equal(result.memberCount, 12);
  assert.equal(result.segmentCount, 12000);
  assert.equal(result.accepted, false);
  assert.equal(final.retainedInterval[0], "5.96875");
});

test("candidate source and complete member order/polarity are frozen", () => {
  fails((manifest) => { manifest.sourceBinding.sha256 = "0".repeat(64); }, /frozen source/);
  fails((manifest) => { manifest.sourceBinding.path = reference.results[1].sourcePath; }, /frozen source/);
  fails((manifest) => { manifest.candidateId = "unknown"; manifest.manifestId = "subfield-circular-history/v1:unknown:T=4"; }, /reference census/);
  fails((manifest) => { manifest.members.pop(); }, /member coverage/);
  fails((manifest) => { manifest.members[0].polarity *= -1; }, /identity\/order\/polarity/);
  fails((manifest) => { [manifest.members[0], manifest.members[1]] = [manifest.members[1], manifest.members[0]]; }, /identity\/order\/polarity/);
  fails((manifest) => { manifest.members[0].worldlineId = manifest.members[1].worldlineId; }, /identity\/order\/polarity/);
});

test("every exact partition cell and parsed endpoint bits are checked", () => {
  fails((manifest) => { manifest.members[0].segments.pop(); }, /exactly 1000/);
  fails((manifest) => { manifest.members[0].segments.push(manifest.members[0].segments[999]); }, /exactly 1000/);
  fails((manifest) => { manifest.members[0].segments[500].tStart = "2.999"; }, /partition mismatch/);
  fails((manifest) => { manifest.members[0].segments[999].tEnd = "4.002"; }, /partition mismatch/);
  fails((manifest) => { manifest.members[0].segments[0].parsedEndpointBits[0] = "4000000000000001"; }, /endpoint bits mismatch/);
});

test("actual coefficient/error tokens own the EOM chain fingerprint", () => {
  fails((manifest) => { manifest.members[0].segments[0].coefficients[0][0] = "1.0"; }, /fingerprint mismatch/);
  fails((manifest) => { manifest.members[0].segments[0].coefficients[0][0] = 1; }, /decimal token/);
  fails((manifest) => { manifest.members[0].segments[0].positionErrors[0] = "0"; }, /literal positionErrors/);
  fails((manifest) => { manifest.members[0].segments[0].velocityErrors[0] = "2.384185791015625e-7"; }, /literal velocityErrors/);
  fails((manifest) => { manifest.members[0].historyFingerprint = "fnv1a64-chain-v1:0000000000000000"; }, /fingerprint mismatch/);
});

test("original JSON rejects duplicate decoded keys and invalid UTF-8", () => {
  const duplicate = bytes().toString().replace('"candidateId":"coincident-midpoint-common-frequency"', '"candidateId":"coincident-midpoint-common-frequency","candidate\\u0049d":"coincident-midpoint-common-frequency"');
  assert.throws(() => inspectSubfieldCircularHistoryStructureForTests(Buffer.from(duplicate), 2, 0), /duplicate JSON key/);
  assert.throws(() => inspectSubfieldCircularHistoryStructureForTests(Buffer.from([0xff]), 2, 0), /encoded data/);
  assert.throws(() => inspectSubfieldCircularHistoryStructureForTests(PLUMBING, 2, 0), /original JSON bytes/);
});

test("fresh CLI rejects plumbing as actual geometry and preserves its rejected receipt", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfieldCircular-manifest-plumbing-test-"));
  try {
    const manifest = path.join(directory, "synthetic-plumbing-not-geometry.json");
    const output = path.join(directory, "rejected-proof.json");
    writeFileSync(manifest, bytes());
    const args = [CLI, "--manifest", manifest, "--rung", "2", "--phase", "0", "--out", output];
    const result = spawnSync(process.execPath, args, { encoding: "utf8", timeout: 10000 });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /proof-heartbeat/);
    const receiptBytes = readFileSync(output), receipt = JSON.parse(receiptBytes);
    assert.equal(receipt.schema, SUBFIELD_CIRCULAR_PROOF_SCHEMA);
    assert.equal(receipt.accepted, false);
    assert.equal(receipt.actualCarrierValidated, false);
    assert.equal(receipt.h3EvidenceEligible, false);
    assert.match(receipt.error, /actual segment conformance failed at member 0, segment 0/);
    assert.equal(receipt.lastProgress.manifestSha256, sha(bytes()));
    const retry = spawnSync(process.execPath, args, { encoding: "utf8", timeout: 10000 });
    assert.equal(retry.status, 1);
    assert.deepEqual(readFileSync(output), receiptBytes);
  } finally { rmSync(directory, { recursive: true }); }
});

test("CLI rejects a FIFO without a writer before attempting a blocking read", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfieldCircular-manifest-fifo-test-"));
  try {
    const manifest = path.join(directory, "unconnected.fifo"), output = path.join(directory, "rejected.json");
    const created = spawnSync("mkfifo", [manifest], { encoding: "utf8", timeout: 5000 });
    assert.equal(created.status, 0, created.stderr);
    const began = performance.now();
    const result = spawnSync(process.execPath,
      [CLI, "--manifest", manifest, "--rung", "2", "--phase", "0", "--out", output],
      { encoding: "utf8", timeout: 10000 });
    assert.equal(result.status, 1, result.stderr);
    assert.ok(performance.now() - began < 10000);
    const receipt = JSON.parse(readFileSync(output));
    assert.equal(receipt.accepted, false);
    assert.equal(receipt.h3EvidenceEligible, false);
    assert.match(receipt.error, /regular file/);
  } finally { rmSync(directory, { recursive: true }); }
});

function copiedProofTree(directory) {
  const root = path.join(realpathSync(directory), "project");
  mkdirSync(path.join(root, "scripts/eom"), { recursive: true });
  mkdirSync(path.join(root, "src/prescribed-path-analysis"), { recursive: true });
  symlinkSync(path.join(ROOT, "reference"), path.join(root, "reference"), "dir");
  symlinkSync(path.join(ROOT, ".local-data"), path.join(root, ".local-data"), "dir");
  const files = ["scripts/eom/verify-subfield-circular-history.mjs",
    ...SUBFIELD_CIRCULAR_FROZEN_BINDINGS.filter((binding) => ["circular-core", "integer-primitive", "budget-cli"].includes(binding.id))
      .map((binding) => binding.path)];
  for (const relative of files) copyFileSync(path.join(ROOT, relative), path.join(root, relative));
  return { root, cli: path.join(root, "scripts/eom/verify-subfield-circular-history.mjs"),
    generationFiles: files.filter((relative) => !relative.endsWith("derive-subfield-circular-history-budget.mjs"))
      .map((relative) => path.join(root, relative)) };
}

test("fresh worker executes captured sources after disk generation changes, then fails closed", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfieldCircular-manifest-generation-test-"));
  try {
    const fixture = copiedProofTree(directory);
    const originalWrapperHash = sha(readFileSync(fixture.cli));
    const manifest = path.join(directory, "manifest.json"), output = path.join(directory, "rejected.json");
    writeFileSync(manifest, "{}\n");
    // This preloader changes only disposable copies, exactly when the outer
    // supervisor launches its worker, after all three sources were captured.
    // Loading any changed file from disk would execute the explicit throw.
    const preload = `
      import workers from 'node:worker_threads';
      import { syncBuiltinESMExports } from 'node:module';
      import { writeFileSync } from 'node:fs';
      const OriginalWorker = workers.Worker;
      workers.Worker = class extends OriginalWorker {
        constructor(...args) {
          for (const file of ${JSON.stringify(fixture.generationFiles)})
            writeFileSync(file, 'throw new Error("DISK_GENERATION_B_EXECUTED");\\n');
          super(...args);
        }
      };
      syncBuiltinESMExports();
    `;
    const result = spawnSync(process.execPath,
      ["--import", `data:text/javascript;base64,${Buffer.from(preload).toString("base64")}`,
        fixture.cli, "--manifest", manifest, "--rung", "2", "--phase", "0", "--out", output],
      { encoding: "utf8", timeout: 10000 });
    assert.equal(result.status, 1, result.stderr);
    const receipt = JSON.parse(readFileSync(output));
    assert.equal(receipt.accepted, false);
    assert.equal(receipt.h3EvidenceEligible, false);
    assert.match(receipt.error, /bound bytes changed: circular-core/);
    assert.doesNotMatch(receipt.error, /DISK_GENERATION_B_EXECUTED/);
    assert.equal(receipt.lastProgress.execution.mode, "captured-source-worker");
    const executed = receipt.lastProgress.execution.sourceBindings;
    assert.equal(executed.find((binding) => binding.id === "whole-manifest-verifier").sha256, originalWrapperHash);
    for (const id of ["circular-core", "integer-primitive"]) {
      assert.equal(executed.find((binding) => binding.id === id).sha256,
        SUBFIELD_CIRCULAR_FROZEN_BINDINGS.find((binding) => binding.id === id).sha256);
    }
    assert.notEqual(sha(readFileSync(fixture.cli)), originalWrapperHash);
  } finally { rmSync(directory, { recursive: true }); }
});

test("changed core bytes are rejected before their top-level code executes", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "subfieldCircular-manifest-core-hash-test-"));
  try {
    const fixture = copiedProofTree(directory);
    writeFileSync(path.join(fixture.root, "src/prescribed-path-analysis/CircularHistoryConformance.mjs"),
      'throw new Error("UNVERIFIED_CORE_EXECUTED");\n');
    const result = spawnSync(process.execPath, [fixture.cli], { encoding: "utf8", timeout: 10000 });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /bound bytes changed: circular-core/);
    assert.doesNotMatch(result.stderr, /UNVERIFIED_CORE_EXECUTED/);
  } finally { rmSync(directory, { recursive: true }); }
});

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { inspectSubfieldCircularHistoryStructureForTests } from "../scripts/eom/verify-subfield-circular-history.mjs";

// Subject plumbing controls only. The coordinator must run the unchanged
// whole-manifest analytic proof separately; no test here invokes root work.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const binary = process.env.AAA_SUBFIELD_CIRCULAR_ADAPTER_BIN && path.resolve(process.env.AAA_SUBFIELD_CIRCULAR_ADAPTER_BIN);
const lane = path.join(root, ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1");
let directory, firstPath, firstBytes;
const gate = { skip: !binary };
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");

function run(args) {
  const result = spawnSync(binary, args, { cwd: root, encoding: "utf8", timeout: 20000, maxBuffer: 4 * 1024 * 1024 });
  assert.equal(result.error, undefined);
  assert.doesNotMatch(result.stderr, /"event":"row-started"/u, "controls must never call the root API");
  return result;
}
function args(mode, candidate, rung, phase, output) {
  return [mode, "--repo-root", root, "--candidate", candidate, "--rung", String(rung),
    "--phase", String(phase), "--out", output];
}
function structure(bytes, rung, phase) {
  const result = inspectSubfieldCircularHistoryStructureForTests(bytes, rung, phase);
  assert.equal(result.plumbingValidated, true);
  assert.equal(result.accepted, false);
  assert.equal(result.actualCarrierValidated, false);
  assert.equal(result.h3EvidenceEligible, false);
  assert.equal(result.manifestSha256, sha(bytes));
  return result;
}

test("sub-field circular subject help and syntax controls require a fresh explicitly selected binary", gate, () => {
  assert.ok(statSync(binary).mtimeMs >= statSync(path.join(root, "src/eom/native/eom_subfield_circular_root_cli.cpp")).mtimeMs);
  mkdirSync(lane, { recursive: true });
  directory = mkdtempSync(path.join(lane, "adapter-controls."));
  assert.equal(run(["--help"]).status, 0);
  assert.notEqual(run([]).status, 0);
  assert.notEqual(run(args("manifest", "coincident-midpoint-common-frequency", 16, 0, path.join(directory, "bad-rung.json"))).status, 0);
  assert.notEqual(run([...args("manifest", "coincident-midpoint-common-frequency", 2, 0, path.join(directory, "caller-hash.json")), "--source-hash", "invented"]).status, 0);
});

test("six-member actual manifest preserves exact grid, source order, errors, endpoint bits and EOM fingerprints", gate, () => {
  firstPath = path.join(directory, "coincident-midpoint-common-frequency-T4.json");
  const result = run(args("manifest", "coincident-midpoint-common-frequency", 2, 0, firstPath));
  assert.equal(result.status, 0, result.stderr);
  firstBytes = readFileSync(firstPath);
  const census = structure(firstBytes, 2, 0);
  assert.equal(census.memberCount, 6);
  assert.equal(census.segmentCount, 6000);
  const manifest = JSON.parse(firstBytes);
  assert.equal(manifest.manifestId, "subfield-circular-history/v1:coincident-midpoint-common-frequency:T=4");
  assert.deepEqual(manifest.retainedInterval, ["2", "4"]);
  // The first circle lies exactly in yz. This closed-form zero coordinate
  // is a local control, not evidence for the other constructed coordinates.
  for (const segment of manifest.members[0].segments) assert.deepEqual(segment.coefficients[0], ["0", "0", "0", "0"]);
  assert.match(result.stderr, /"event":"environment-controls-passed"/u);
  assert.match(result.stderr, /"strictlySubField":true/u);
});

test("repeated reception across rungs has identical original manifest bytes", gate, () => {
  const output = path.join(directory, "coincident-midpoint-common-frequency-T4-rung128.json");
  const result = run(args("manifest", "coincident-midpoint-common-frequency", 128, 0, output));
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(readFileSync(output), firstBytes);
  structure(firstBytes, 128, 0);
});

test("twelve-member arbitrary-vector candidate preserves final pilot reception and full coverage", gate, () => {
  const output = path.join(directory, "coaxial-separated-two-component-circular-co-rotating-T7.96875.json");
  const result = run(args("manifest", "coaxial-separated-two-component-circular-co-rotating", 128, 127, output));
  assert.equal(result.status, 0, result.stderr);
  const bytes = readFileSync(output), manifest = JSON.parse(bytes);
  assert.equal(structure(bytes, 128, 127).segmentCount, 12000);
  assert.deepEqual(manifest.retainedInterval, ["5.96875", "7.96875"]);
});

test("existing output cannot be overwritten and semantic-only manifest equality is insufficient", gate, () => {
  assert.notEqual(run(args("manifest", "coincident-midpoint-common-frequency", 2, 0, firstPath)).status, 0);
  assert.deepEqual(readFileSync(firstPath), firstBytes);
  const changed = path.join(directory, "reformatted.json");
  writeFileSync(changed, Buffer.concat([firstBytes, Buffer.from("\n")]), { flag: "wx" });
  const result = run([...args("serve", "coincident-midpoint-common-frequency", 2, 0, path.join(directory, "reformatted-rejected.ndjson")),
    "--history-manifest", changed, "--conformance", path.join(directory, "not-read.json")]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /not byte-identical/u);
});

test("unaccepted conformance receipt cannot open the root execution path", gate, () => {
  const proof = path.join(directory, "rejected-proof.json");
  writeFileSync(proof, JSON.stringify({ schema: "braid-program/subfield-circular-history-conformance.v1", accepted: false }), { flag: "wx" });
  const result = run([...args("serve", "coincident-midpoint-common-frequency", 2, 0, path.join(directory, "proof-rejected.ndjson")),
    "--history-manifest", firstPath, "--conformance", proof]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /conformance receipt does not accept/u);
});

test("FIFO manifest without a writer rejects without entering a blocking read or root call", gate, () => {
  const fifo = path.join(directory, "manifest.fifo");
  assert.equal(spawnSync("mkfifo", [fifo]).status, 0);
  const result = run([...args("serve", "coincident-midpoint-common-frequency", 2, 0, path.join(directory, "fifo-rejected.ndjson")),
    "--history-manifest", fifo, "--conformance", path.join(directory, "not-read.json")]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /regular file/u);
});

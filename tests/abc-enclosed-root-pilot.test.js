import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { installPilotSnapshot, parseMacProfile, parsePilotArgs, PILOT_CANDIDATES,
  pilotFileOperation, pilotProjection, pilotSchedule, rowDispositions, runSerialABCPilot,
  validatePilotPhase, validatePilotProof, validatePilotSummary, watchedPilotFileOperation,
} from "../scripts/eom/run-abc-enclosed-root-pilot.mjs";

// Scheduling/provenance controls only. No EOM root call or actual history
// construction is executed. Synthetic receipt agreement is not physics evidence.
const ROOT = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const SELF = "scripts/eom/run-abc-enclosed-root-pilot.mjs";
const BASE = ".local-data/braid-analysis/abc-h3-root-pilot-20260827-v1/";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const directory = () => realpathSync(mkdtempSync(path.join(os.tmpdir(), "abc-pilot-control-")));
const source = relative => { const bytes = readFileSync(path.join(ROOT, relative)); return { path: relative, bytes, sha256: sha(bytes) }; };

test("pilot CLI requires a new scoped directory and exact external reviewed source hash", () => {
  const args = ["--out", BASE + "synthetic", "--runner-sha256", "a".repeat(64)];
  assert.deepEqual(parsePilotArgs(args), { output: BASE + "synthetic", runnerSha256: "a".repeat(64) });
  for (const invalid of [[], args.slice(0, 2), [...args, "--out", "second"], ["--out", BASE + "../escape", ...args.slice(2)],
    ["--out", "/absolute", ...args.slice(2)], ["--out", BASE + "synthetic/", ...args.slice(2)],
    ["--out", BASE + "synthetic", "--runner-sha256", "A".repeat(64)]]) assert.throws(() => parsePilotArgs(invalid));
});

test("canonical two-phase census is candidate-major with 2448 rows, not a partial pair sample", () => {
  const schedule = pilotSchedule(); assert.equal(schedule.length, 32);
  assert.deepEqual(schedule.filter((_, index) => index % 2 === 0).map(row => row.candidateId), PILOT_CANDIDATES);
  assert.deepEqual(schedule.map(row => row.receptionTime), Array.from({ length: 16 }, () => ["4", "6"]).flat());
  assert.equal(schedule.reduce((sum, row) => sum + row.rowCount, 0), 2448);
  assert.equal(schedule.reduce((sum, row) => sum + row.ordinaryRootCount, 0), 2184);
  assert.equal(schedule.reduce((sum, row) => sum + row.selfEndpointCount, 0), 264);
});

test("projection is measured two-phase maximum and blocks only later ladder", () => {
  assert.deepEqual(pilotProjection([10, 12]), { projected128PhaseSeconds: 1536, estimateOnly: true,
    resourcePlanRequired: false, laterLadderAuthorized: false });
  assert.equal(pilotProjection([1800 / 128, 0]).resourcePlanRequired, false);
  assert.equal(pilotProjection([1, 20]).resourcePlanRequired, true);
  for (const invalid of [[1], [1, NaN], [-1, 1], [Infinity, 0]]) assert.throws(() => pilotProjection(invalid));
});

test("profile requires actual unique wall/user/system/RSS measurements and never zero-fills missing output", () => {
  const text = 'diagnostic\n{"event":"stopped"}\n  12.34 real 11.00 user 0.25 sys\n 456789 maximum resident set size\n';
  const profile = parseMacProfile(text);
  assert.equal(profile.childWallSeconds, 12.34); assert.equal(profile.childUserSeconds, 11);
  assert.equal(profile.childSystemSeconds, .25); assert.equal(profile.maximumIndividualProcessResidentBytes, 456789);
  assert.match(profile.rssScope, /not-aggregate/u);
  for (const invalid of ["", text + text, text.replace("456789", "0"), text.replace("12.34 real", "NaN real"),
    text.replace(/.*maximum resident set size/u, "")]) assert.throws(() => parseMacProfile(invalid));
});

test("failure dispositions retain accepted phases, mark attempted unaccepted rows failed and all unvisited rows not-run", () => {
  const schedule = pilotSchedule();
  const disposition = rowDispositions(schedule, [{ status: "phase-ledger-accepted", process: { dispatchedRows: 36 } },
    { status: "failed", process: { dispatchedRows: 3, checkedRows: 2 } }]);
  assert.deepEqual(disposition[0].ranges, [{ from: 0, count: 36, disposition: "passed" }]);
  assert.equal(disposition[1].ranges[0].count, 3); assert.equal(disposition[1].ranges[0].disposition, "failed");
  assert.match(disposition[1].ranges[0].reason, /not-a-geometry-rejection/u);
  assert.deepEqual(disposition[1].ranges[1], { from: 3, count: 33, disposition: "not-run" });
  assert.deepEqual(disposition[2].ranges, [{ from: 0, count: 36, disposition: "not-run" }]);
  assert.equal(disposition.flatMap(row => row.ranges).reduce((sum, range) => sum + range.count, 0), 2448);
  assert.throws(() => rowDispositions(schedule, [{ process: { dispatchedRows: 37 } }]));
});

function syntheticProof() {
  const expected = pilotSchedule()[0], manifest = { path: "/synthetic/manifest", sha256: "a".repeat(64) };
  const proofPath = "scripts/eom/verify-abc-circular-history.mjs";
  const bindings = [{ path: proofPath, sha256: "b213094bb38c73d291615042df27e8feac6711c8a7958b21688fc7414208630d" },
    { path: "src/prescribed-path-analysis/CircularHistoryConformance.mjs", sha256: "c".repeat(64) },
    { path: "scripts/eom/derive-abc-subfield-root-reference.mjs", sha256: "d".repeat(64) }];
  return { expected, manifest, proof: { ...expected, schema: "braid-program/abc-circular-history-conformance.v1",
    accepted: true, actualCarrierValidated: true, h3EvidenceEligible: false, normalizedFieldSpeed: "1",
    authority: "source-bound-whole-manifest-analytic-conformance-only", manifestPath: manifest.path, manifestSha256: manifest.sha256,
    segmentCount: 6000, members: Array.from({ length: 6 }, () => ({})), bindings,
    execution: { mode: "captured-source-worker", sourceBindings: bindings } } };
}

test("proof receipt plumbing rejects wrong identity, partial census and stale worker generation", () => {
  const { expected, manifest, proof } = syntheticProof(); validatePilotProof(proof, expected, manifest);
  for (const change of [{ accepted: false }, { candidateId: "a1-2" }, { phase: 1 }, { segmentCount: 5999 },
    { h3EvidenceEligible: true }, { normalizedFieldSpeed: "2" }, { manifestSha256: "b".repeat(64) },
    { execution: { mode: "captured-source-worker", sourceBindings: [] } }])
    assert.throws(() => validatePilotProof({ ...proof, ...change }, expected, manifest));
});

test("phase receipt plumbing demands original raw/proof/build hashes and exact pair census", () => {
  const expected = pilotSchedule()[0], bindings = { manifestId: "synthetic:T=4" };
  for (const field of ["historyManifest", "conformance", "buildReceipt", "rawRows", "reducer", "cli"])
    bindings[field] = { path: `/synthetic/${field}`, sha256: "a".repeat(64), bytes: 10 };
  const receipt = { ...expected, ...bindings, schema: "braid-program/abc-enclosed-root-phase-reduction.v1", accepted: true,
    h3EvidenceEligible: false, rootExecutionAuthorized: false, authority: "source-byte-build-bound-independent-phase-ledger-only",
    rawRows: { ...bindings.rawRows, rowCount: 36 } };
  validatePilotPhase(receipt, expected, bindings);
  for (const change of [{ rowCount: 35 }, { selfEndpointCount: 0 }, { accepted: false }, { rootExecutionAuthorized: true },
    { conformance: { ...receipt.conformance, sha256: "b".repeat(64) } }, { rawRows: { ...receipt.rawRows, bytes: 11 } }])
    assert.throws(() => validatePilotPhase({ ...receipt, ...change }, expected, bindings));
});

test("summary plumbing requires all32 authenticated ordered phase receipts", () => {
  const phaseReceipts = pilotSchedule().map((row, index) => ({ ...row, path: `/synthetic/${index}`, sha256: sha(String(index)) }));
  const receipt = { schema: "braid-program/abc-enclosed-root-summary-reduction.v1", accepted: true,
    h3EvidenceEligible: false, rootExecutionAuthorized: false, authority: "authenticated-phase-summary-chain-only", scope: "pilot",
    phaseCount: 32, rowCount: 2448, ordinaryRootCount: 2184, selfEndpointCount: 264, candidateIds: PILOT_CANDIDATES,
    phaseReceipts, phaseReceiptChainSha256: sha(phaseReceipts.map(row => row.sha256).join("\n") + "\n") };
  validatePilotSummary(receipt, phaseReceipts);
  for (const change of [{ phaseCount: 31 }, { rowCount: 2447 }, { candidateIds: [...PILOT_CANDIDATES].reverse() },
    { phaseReceipts: [...phaseReceipts].reverse() }, { phaseReceiptChainSha256: "a".repeat(64) }, { h3EvidenceEligible: true }])
    assert.throws(() => validatePilotSummary({ ...receipt, ...change }, phaseReceipts));
});

test("bounded same-fd file checker rejects a FIFO and wrong content hash without blocking", () => {
  const root = directory(), fifo = path.join(root, "input.fifo"), filename = path.join(root, "input.json");
  execFileSync("mkfifo", [fifo]);
  assert.throws(() => pilotFileOperation({ kind: "files", root, files: [{ path: fifo }] }), /regular.*file/u);
  writeFileSync(filename, '{"synthetic":true}\n', { flag: "wx" });
  assert.throws(() => pilotFileOperation({ kind: "files", root, files: [{ path: filename, sha256: "a".repeat(64) }] }), /changed/u);
  const [actual] = pilotFileOperation({ kind: "files", root, files: [{ path: filename, json: true }] });
  assert.deepEqual(actual.value, { synthetic: true }); assert.equal(actual.bytes, 19);
});

test("captured file worker operates from exact bytes and honors cancellation", async () => {
  const root = directory(), filename = path.join(root, "fixture"), self = source(SELF);
  writeFileSync(filename, "synthetic", { flag: "wx" });
  const options = { runnerBytes: self.bytes, runnerSha256: self.sha256, limitMs: 3000 };
  const [record] = await watchedPilotFileOperation({ kind: "files", root, files: [{ path: filename }] }, options);
  assert.equal(record.sha256, sha("synthetic"));
  await assert.rejects(watchedPilotFileOperation({ kind: "files", root, files: [] }, { ...options, runnerSha256: "a".repeat(64) }), /source/u);
  const abort = new AbortController(); abort.abort(new Error("synthetic stop"));
  await assert.rejects(watchedPilotFileOperation({ kind: "files", root, files: [] }, { ...options, signal: abort.signal }), /synthetic stop/u);
});

test("closed runtime loader executes captured source even after disk generation changes", async () => {
  const root = directory(), relative = "synthetic.mjs", filename = path.join(root, relative);
  const bytes = Buffer.from("export const generation='captured';\n");
  writeFileSync(filename, bytes, { flag: "wx" });
  const snapshot = installPilotSnapshot([{ path: relative, bytes, sha256: sha(bytes) }], root);
  writeFileSync(filename, "export const generation='changed-on-disk';\n");
  try { assert.equal((await snapshot.import(relative)).generation, "captured"); }
  finally { snapshot.close(); }
});

test("closed runtime loader rejects a newly introduced uncaptured file import", async () => {
  const root = directory(), bytes = Buffer.from("import './other.mjs';\n"), other = path.join(root, "other.mjs");
  writeFileSync(other, "export const wrong=true;\n", { flag: "wx" });
  const snapshot = installPilotSnapshot([{ path: "synthetic.mjs", bytes, sha256: sha(bytes) }], root);
  try { await assert.rejects(snapshot.import("synthetic.mjs"), /uncaptured/u); }
  finally { snapshot.close(); }
});

test("composed first-stage failure preserves exclusive receipts and all2448 not-run rows without invoking EOM", async () => {
  // This checks current recorded build bytes read-only, then injects a failed
  // synthetic launcher. It does not run even the adapter's manifest mode.
  const reserved = mkdtempSync(path.join(ROOT, BASE, "runner-failure-control-"));
  const output = path.relative(ROOT, path.join(reserved, "run"));
  const sources = [SELF, "src/prescribed-path-analysis/ABCPhaseProcess.mjs", "src/prescribed-path-analysis/ABCPhaseLedgerWorker.mjs",
    "scripts/eom/prepare-f5-enclosed-root.mjs", "src/prescribed-path-analysis/ABCEnclosedRootLedgerReducer.mjs",
    "scripts/eom/reduce-abc-enclosed-root-ledger.mjs", "scripts/eom/verify-abc-circular-history.mjs"].map(source);
  let launchCalls = 0;
  const runtime = {
    async runWatched(_command, _args, options) {
      launchCalls++; assert.equal(options.stage, "manifest");
      writeFileSync(options.logPath, "synthetic launcher failure\n", { flag: "wx" });
      throw Object.assign(new Error("synthetic launcher refused before EOM"), { processResult: { code: 1, processGroupClosed: true } });
    },
    runABCPhaseProcess() { assert.fail("no scientific root process may start"); },
    openABCPhaseLedgerWorker() { assert.fail("no scientific ledger context may start"); },
  };
  let error;
  try { await runSerialABCPilot({ root: ROOT, options: { output, runnerSha256: sources[0].sha256 }, sources, runtime }); }
  catch (caught) { error = caught; }
  assert.ok(error?.pilotReceipt, error?.stack); assert.equal(launchCalls, 1);
  assert.match(error.message, /synthetic launcher refused/u);
  const receipt = JSON.parse(readFileSync(path.join(ROOT, output, "pilot-process.json")));
  assert.equal(receipt.accepted, false); assert.equal(receipt.h3EvidenceEligible, false);
  assert.equal(receipt.stages.length, 1); assert.match(receipt.stages[0].measurementFailure, /profile/u);
  const ranges = receipt.rowDispositions.flatMap(row => row.ranges);
  assert.ok(ranges.every(row => row.disposition === "not-run"));
  assert.equal(ranges.reduce((sum, row) => sum + row.count, 0), 2448);
  assert.equal(JSON.parse(readFileSync(path.join(ROOT, output, "terminal.json"))).accepted, false);
  assert.equal(existsSync(path.join(ROOT, output, "a1-1-T4", "rows.ndjson")), false);
  await assert.rejects(runSerialABCPilot({ root: ROOT, options: { output }, sources, runtime }), /new/u);
});

test("composed operator interruption reaches the worker while ledger context is still preparing", async () => {
  const reserved = mkdtempSync(path.join(ROOT, BASE, "runner-interruption-control-"));
  const output = path.relative(ROOT, path.join(reserved, "run"));
  const sources = [SELF, "src/prescribed-path-analysis/ABCPhaseProcess.mjs", "src/prescribed-path-analysis/ABCPhaseLedgerWorker.mjs",
    "scripts/eom/prepare-f5-enclosed-root.mjs", "src/prescribed-path-analysis/ABCEnclosedRootLedgerReducer.mjs",
    "scripts/eom/reduce-abc-enclosed-root-ledger.mjs", "scripts/eom/verify-abc-circular-history.mjs"].map(source);
  let signalObserved = false;
  const runtime = {
    async runWatched(_command, args, options) {
      const out = args[args.indexOf("--out") + 1];
      if (options.stage === "manifest") writeFileSync(out, "synthetic manifest bytes\n", { flag: "wx" });
      else {
        assert.equal(options.stage, "conformance");
        const manifestPath = args[args.indexOf("--manifest") + 1], { proof } = syntheticProof();
        proof.manifestPath = manifestPath; proof.manifestSha256 = sha(readFileSync(manifestPath));
        writeFileSync(out, JSON.stringify(proof), { flag: "wx" });
      }
      writeFileSync(options.logPath, " 0.01 real 0.00 user 0.00 sys\n 123 maximum resident set size\n", { flag: "wx" });
      return { code: 0, processGroupClosed: true, syntheticOnly: true };
    },
    runABCPhaseProcess() { assert.fail("interrupted startup cannot dispatch roots"); },
    async openABCPhaseLedgerWorker(options) {
      assert.ok(options.signal instanceof AbortSignal); signalObserved = true;
      setImmediate(() => process.emit("SIGTERM"));
      return new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true }));
    },
  };
  await assert.rejects(runSerialABCPilot({ root: ROOT, options: { output, runnerSha256: sources[0].sha256 }, sources, runtime }), /operator signal/u);
  assert.equal(signalObserved, true);
  const receipt = JSON.parse(readFileSync(path.join(ROOT, output, "pilot-process.json")));
  assert.equal(receipt.accepted, false); assert.ok(receipt.rowDispositions.every(row => row.ranges.every(range => range.disposition === "not-run")));
});

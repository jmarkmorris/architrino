import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import { createHash } from "node:crypto";
import path from "node:path";
import {
  API_CONTROLS, API_SUBJECT_BINDINGS, assembleRung, parseRunArgs, projectFinalRung,
  validateApiReceipt, validateLedgerReceipt, verifyBindings, writeCompactPacketOnce,
} from "../scripts/eom/run-f5-enclosed-root.mjs";

// Synthetic orchestration controls only. No fixture here establishes a geometry,
// root certificate, independent ledger, or execution authorization.
const fixture = () => {
  const controls = { rungSamples: 8, normalizedFieldSpeed: "1", period: "19.63359163663986",
    retainedHistoryDepth: "1", rootTolerance: "1e-8", rootMaxDepth: 192, rootMaxCells: 300000,
    initialMpfrBits: 128, maximumMpfrBits: 512, workerCount: 8,
    receptionTokenRule: "exact-decimal-period-rational/v1" };
  const manifest = { campaignId: "control-only", runId: "not-science", maximumSegmentStep: "0.02",
    positionWidth: "1.528724905003159e-10", velocityWidth: "2.866983034112353e-7",
    members: Array.from({ length: 12 }, (_, index) => ({ index, segments: [] })) };
  const rows = Array.from({ length: 1152 }, (_, index) => ({ phaseIndex: Math.floor(index / 144),
    receiverIndex: Math.floor(index % 144 / 12), transmitterIndex: index % 12 })).reverse();
  const events = [{ status: "started", detail: { mode: "rung", campaignId: manifest.campaignId,
    runId: manifest.runId, controls, bindings: [] } },
    ...Array.from({ length: 8 }, (_, phaseIndex) => ({ status: "phase-complete", detail: { phaseIndex, phaseElapsedWallSeconds: 1 } })),
    { status: "complete", completedRows: 1152, passingRows: 1152, failureCount: 0,
      failureCode: "", historyManifestSha256: "a".repeat(64) }];
  return { manifest, manifestSha256: "a".repeat(64), samples: 8, rows, events, implementationBindings: [], elapsedSeconds: 8 };
};

test("explicit arguments reject duplicates, omitted prerequisites and foreign options", () => {
  assert.deepEqual(parseRunArgs(["--preparation", "a", "--api-proof", "b", "--out", "c"]),
    { "--preparation": "a", "--api-proof": "b", "--out": "c" });
  for (const args of [[], ["--out", "x"], ["--preparation", "a", "--preparation", "b"], ["--samples", "128"]]) {
    assert.throws(() => parseRunArgs(args));
  }
});

test("projection includes total overhead and slowest phase; no incomplete estimate accepted", () => {
  assert.equal(projectFinalRung(8, 12, Array(8).fill(1)), 192);
  assert.equal(projectFinalRung(32, 40, Array(32).fill(2)), 256);
  for (const args of [[2, 12, [1, 1]], [8, 0, Array(8).fill(1)], [8, 12, [1]], [8, Infinity, Array(8).fill(1)]]) {
    assert.throws(() => projectFinalRung(...args));
  }
});

test("assembler sorts completion-order rows without manufacturing certificate fields", () => {
  const input = fixture(), packet = assembleRung(input);
  assert.equal(packet.rows.length, 1152);
  assert.deepEqual(packet.rows[0], { phaseIndex: 0, receiverIndex: 0, transmitterIndex: 0 });
  assert.deepEqual(packet.rows.at(-1), { phaseIndex: 7, receiverIndex: 11, transmitterIndex: 11 });
  assert.equal(packet.rows[0].certificate, undefined);
  assert.equal(packet.resourceControl.projectedFinalRungSeconds, "128");
  assert.equal(input.rows[0].phaseIndex, 7);
});

test("assembler rejects failures, incomplete/raw mismatches, wrong manifest and phase census", () => {
  const mutations = [
    (x) => { x.rows.pop(); },
    (x) => { x.events.at(-1).failureCount = 1; },
    (x) => { x.events.at(-1).status = "failed"; },
    (x) => { x.events.at(-1).historyManifestSha256 = "b".repeat(64); },
    (x) => { x.events[0].detail.runId = "wrong"; },
    (x) => { x.events[1].detail.phaseIndex = 7; },
    (x) => { x.events.splice(1, 1); },
    (x) => { x.events.splice(1, 0, { status: "row-failed" }); },
  ];
  for (const mutate of mutations) { const input = fixture(); mutate(input); assert.throws(() => assembleRung(input)); }
});

test("cost contact refuses packet acceptance", () => {
  const input = fixture(); input.elapsedSeconds = 113;
  assert.throws(() => assembleRung(input), /projection exceeds/);
});

test("API receipt validation rejects accepted-looking incomplete identity", () => {
  const preparation = { campaignId: "c", runId: "r", historyManifest: { sha256: "a" }, conformance: { sha256: "b" },
    references: Array.from({ length: 8 }, (_, i) => ({ path: `ref-${i}`, sha256: `hash-${i}` })) };
  const receipt = { ...structuredClone(API_CONTROLS), schema: "braid-program/f5-api-domain-conformance.v1", accepted: true,
    status: "api-domain-conformance-passed", resourceContact: false, failure: null, h3EvidenceEligible: false,
    processedMemberSegments: 12384, expectedMemberSegments: 12384, campaignId: "c", runId: "r",
    historyManifestSha256: "a", nominalCertificateSha256: "b", normalizedFieldSpeed: "1",
    sourceBindings: preparation.references.slice(0, 5),
    instrumentBindings: [...preparation.references.slice(5, 8), { path: "scripts/eom/oracle/f5_api_domain_conformance.py", sha256: "test-only" }],
    subjectApiBindings: structuredClone(API_SUBJECT_BINDINGS) };
  validateApiReceipt(receipt, preparation, "test-only");
  for (const field of ["accepted", "h3EvidenceEligible", "resourceContact", "historyManifestSha256", "nominalCertificateSha256", "processedMemberSegments"]) {
    assert.throws(() => validateApiReceipt({ ...receipt, [field]: "wrong" }, preparation, "test-only"));
  }
  assert.throws(() => validateApiReceipt({ ...receipt, instrumentBindings: [] }, preparation, "test-only"));
  for (let i = 0; i < 6; i += 1) {
    const changed = structuredClone(receipt); changed.subjectApiBindings[i].sha256 = "wrong";
    assert.throws(() => validateApiReceipt(changed, preparation, "test-only"));
  }
  for (const field of Object.keys(API_CONTROLS)) {
    assert.throws(() => validateApiReceipt({ ...receipt, [field]: "wrong" }, preparation, "test-only"));
  }
});

test("prefix receipt admission binds exact original packets and executed interface", () => {
  const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  const reducerPath = "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs";
  const appendix = "\nexport { validateConfigAndPilot, validateEnclosureReport, expectedMembersFromConfig, validateHistoryManifest, validateRungPacket, validateRepeatedReceptionRoots, repositoryReader };\n";
  const reducerBytes = readFileSync(reducerPath);
  const packet = assembleRung(fixture());
  const manifestBinding = { path: ".local-data/control-only-manifest.json", sha256: "a".repeat(64) };
  const file = { path: ".local-data/control-only-packet.json", sha256: "b".repeat(64) };
  const context = { manifestBinding, manifest: fixture().manifest, packetFiles: [file], packets: [packet], bridgeHash: "control-only" };
  const summary = { campaignId: packet.campaignId, runId: packet.runId, rawSha256: file.sha256, rungSamples: 8,
    rowCount: 1152, bindingSetSha256: hash("[]"), implementationBindingSetSha256: hash("[]") };
  const receipt = {
    schema: "braid-program/f5-enclosed-root-prefix-reduction.v1", accepted: true, h3EvidenceEligible: false,
    status: "genuine-prefix-ledger-checks-passed", completeLadder: false, resourceContact: false, limitSeconds: 1800, heartbeatSeconds: 15,
    authority: "source-and-byte-bound-frozen-validator-prefix-composition",
    campaignId: packet.campaignId, runId: packet.runId, historyManifestSha256: manifestBinding.sha256,
    rungOrder: [8], totalRows: 1152, rungSummaries: [summary],
    rawHistoryManifest: { path: path.resolve(manifestBinding.path), sha256: manifestBinding.sha256 },
    rawRungFiles: [{ path: path.resolve(file.path), sha256: file.sha256, rungSamples: 8 }],
    reducerSource: { path: reducerPath, sha256: hash(reducerBytes) },
    exportAppendix: { sha256: hash(appendix), utf8: appendix },
    executedAugmentedReducerSha256: hash(Buffer.concat([reducerBytes, Buffer.from(appendix)])),
    bridgeSource: { path: "scripts/eom/verify-f5-enclosed-root-prefix.mjs", sha256: "control-only" },
    sourceBindings: [], implementationBindings: [],
  };
  validateLedgerReceipt(receipt, context);
  const mutations = [
    (x) => { x.schema = "other"; }, (x) => { x.authority = "test-only"; },
    (x) => { x.runId = "other"; }, (x) => { x.completeLadder = true; },
    (x) => { x.resourceContact = true; }, (x) => { x.limitSeconds = 1801; },
    (x) => { x.rawHistoryManifest.sha256 = "other"; },
    (x) => { x.rawRungFiles[0].sha256 = "other"; },
    (x) => { x.rungSummaries[0].rawSha256 = "other"; },
    (x) => { x.rungSummaries[0].bindingSetSha256 = "other"; },
    (x) => { x.reducerSource.sha256 = "other"; },
    (x) => { x.bridgeSource.sha256 = "other"; },
    (x) => { x.exportAppendix.utf8 += " "; },
    (x) => { x.executedAugmentedReducerSha256 = "other"; },
    (x) => { x.sourceBindings = [{ id: "other" }]; },
  ];
  for (const mutate of mutations) { const changed = structuredClone(receipt); mutate(changed); assert.throws(() => validateLedgerReceipt(changed, context)); }
});

test("file binding validates actual bytes and rejects mismatch", () => {
  assert.ok(readFileSync("scripts/eom/run-f5-enclosed-root.mjs").length > 0);
  assert.throws(() => verifyBindings([{ path: "scripts/eom/run-f5-enclosed-root.mjs", sha256: "0".repeat(64) }]), /bound bytes changed/);
});

test("row-wise packet publication preserves every value and hashes exact compact bytes", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "f5-compact-packet-"));
  const filename = path.join(directory, "packet.json"), packet = assembleRung(fixture());
  packet.rows[0].certificate = { unicode: "α", line: "one\ntwo", roots: [{ lower: "1e-8", upper: "2e-8" }] };
  const binding = writeCompactPacketOnce(filename, packet), bytes = readFileSync(filename);
  assert.deepEqual(JSON.parse(bytes), packet);
  assert.equal(bytes.toString(), `${JSON.stringify(packet)}\n`);
  assert.equal(binding.sha256, createHash("sha256").update(bytes).digest("hex"));
  assert.throws(() => writeCompactPacketOnce(filename, { rows: [] }), /EEXIST/);
  assert.deepEqual(readFileSync(filename), bytes);
});

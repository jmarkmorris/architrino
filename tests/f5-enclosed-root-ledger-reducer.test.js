import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  F5_FIXED_BINDINGS,
  F5_HISTORY_MANIFEST_SCHEMA,
  F5_REDUCTION_SCHEMA,
  F5_RUNG_SCHEMA,
  reduceF5EnclosedRootLedgers,
  reduceF5EnclosedRootLedgersForTests,
  verifyF5ImplementationBindings,
  writeF5ReductionOnce,
} from "../src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs";

const ZERO_SHA = "0".repeat(64);
const PERIOD = decimal("19.63359163663986");
const POSITION_WIDTH = "1.528724905003159e-10";
const VELOCITY_WIDTH = "2.866983034112353e-7";
const CONFIG = JSON.parse(readFileSync(
  new URL(
    "../reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json",
    import.meta.url,
  ),
  "utf8",
));

function decimal(token) {
  const match = /^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u.exec(token);
  assert.notEqual(match, null);
  const [, sign, whole, fraction = "", exponent = "0"] = match;
  return normalize({
    coefficient: BigInt(`${sign}${whole}${fraction}`),
    exponent: Number(exponent) - fraction.length,
  });
}

function normalize(value) {
  if (value.coefficient === 0n) return { coefficient: 0n, exponent: 0 };
  let { coefficient, exponent } = value;
  while (coefficient % 10n === 0n) {
    coefficient /= 10n;
    exponent += 1;
  }
  return { coefficient, exponent };
}

function align(left, right) {
  const exponent = Math.min(left.exponent, right.exponent);
  return {
    left: left.coefficient * 10n ** BigInt(left.exponent - exponent),
    right: right.coefficient * 10n ** BigInt(right.exponent - exponent),
    exponent,
  };
}

function add(left, right) {
  const values = align(left, right);
  return normalize({
    coefficient: values.left + values.right,
    exponent: values.exponent,
  });
}

function subtract(left, right) {
  return add(left, { coefficient: -right.coefficient, exponent: right.exponent });
}

function phaseTime(phase, samples) {
  const power = Math.log2(samples);
  return normalize({
    coefficient: PERIOD.coefficient * BigInt(phase) * 5n ** BigInt(power),
    exponent: PERIOD.exponent - power,
  });
}

function token(value) {
  if (value.coefficient === 0n) return "0";
  const negative = value.coefficient < 0n;
  const digits = (negative ? -value.coefficient : value.coefficient).toString();
  let body;
  if (value.exponent >= 0) {
    body = `${digits}${"0".repeat(value.exponent)}`;
  } else {
    const split = digits.length + value.exponent;
    body = split > 0
      ? `${digits.slice(0, split)}.${digits.slice(split)}`
      : `0.${"0".repeat(-split)}${digits}`;
  }
  return `${negative ? "-" : ""}${body}`;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function fnv1a64Token(state, value) {
  const prime = 1099511628211n;
  const mask = (1n << 64n) - 1n;
  const update = (byte) => ((state ^ BigInt(byte)) * prime) & mask;
  for (const byte of Buffer.from(Buffer.byteLength(value, "utf8").toString())) {
    state = update(byte);
  }
  state = update(58);
  for (const byte of Buffer.from(value)) state = update(byte);
  return state;
}

function fingerprint(segments) {
  let state = 14695981039346656037n;
  state = fnv1a64Token(state, "eom_history_segment_chain/v1");
  for (const segment of segments) {
    for (const value of [segment.tStart, segment.tEnd]) {
      state = fnv1a64Token(state, value);
    }
    for (const axis of segment.coefficients) {
      for (const value of axis) state = fnv1a64Token(state, value);
    }
    for (const value of segment.positionErrors) state = fnv1a64Token(state, value);
    for (const value of segment.velocityErrors) state = fnv1a64Token(state, value);
  }
  return `fnv1a64-chain-v1:${state.toString(16).padStart(16, "0")}`;
}

function sourceMembers() {
  const constituentById = new Map(CONFIG.constituents.map((item) => [item.id, item]));
  const worldlineByConstituent = new Map(
    CONFIG.worldlines.map((item) => [item.constituentId, item]),
  );
  return CONFIG.relationships.sourceOrder.map((constituentId, index) => ({
    index,
    constituentId,
    worldlineId: worldlineByConstituent.get(constituentId).id,
    polarity: constituentById.get(constituentId).polarity,
    historyId: `${worldlineByConstituent.get(constituentId).id}/enclosed-cubic`,
  }));
}

function historyManifest() {
  const step = (19.63359163663986 + 1) / 1032;
  return {
    schema: F5_HISTORY_MANIFEST_SCHEMA,
    campaignId: "f5-enclosed-root-restart-20260826-v1",
    runId: "synthetic-reducer-control",
    normalizedFieldSpeed: "1",
    retainedInterval: ["-1", "19.63359163663986"],
    maximumSegmentStep: "0.02",
    positionWidth: POSITION_WIDTH,
    velocityWidth: VELOCITY_WIDTH,
    members: sourceMembers().map((member) => {
      const segments = Array.from({ length: 1032 }, (_, index) => {
        return {
          index,
          tStart: String(-1 + step * index),
          tEnd: index === 1031 ? "19.63359163663986" : String(-1 + step * (index + 1)),
          coefficients: [[String(member.index), "0", "0", "0"],
            ["0", "0", "0", "0"], ["0", "0", "0", "0"]],
          positionErrors: [POSITION_WIDTH, POSITION_WIDTH, POSITION_WIDTH],
          velocityErrors: [VELOCITY_WIDTH, VELOCITY_WIDTH, VELOCITY_WIDTH],
        };
      });
      return { ...member, historyFingerprint: fingerprint(segments), segments };
    }),
  };
}

const HISTORY_MANIFEST = historyManifest();
const HISTORY_BYTES = Buffer.from(`${JSON.stringify(HISTORY_MANIFEST, null, 2)}\n`);

function members() {
  return HISTORY_MANIFEST.members.map(({ segments: _segments, ...member }) => ({ ...member }));
}

function segmentIndices(lower, upper) {
  return HISTORY_MANIFEST.members[0].segments
    .filter((segment) => Number(segment.tEnd) >= Number(lower) &&
      Number(segment.tStart) <= Number(upper))
    .map((segment) => segment.index);
}

function rootFreeCell(searchLower, upper) {
  return {
    transmitter_segment_index: 0,
    lower: token(searchLower),
    upper: token(upper),
    residual_lower: "-2",
    residual_upper: "-1",
    receiver_factor_lower: "-1",
    receiver_factor_upper: "1",
  };
}

function partnerRoot(reception) {
  const center = subtract(reception, decimal("0.5"));
  const lower = token(subtract(center, decimal("1e-10")));
  const upper = token(add(center, decimal("1e-10")));
  return {
    lower,
    upper,
    transmitter_factor_lower: "0.5",
    transmitter_factor_upper: "0.6",
    receiver_factor_lower: "-0.6",
    receiver_factor_upper: "-0.5",
    transmitter_factor_sign: 1,
    transmitter_segment_indices: segmentIndices(lower, upper),
    precision_route: "binary64_outward",
    precision_bits: 53,
  };
}

function certificate({ rowId, receiver, transmitter, reception, self }) {
  const searchLower = subtract(reception, decimal("1"));
  const root = self ? null : partnerRoot(reception);
  const rootFreeCells = [];
  return {
    schema: "eom_native_exact_pair_certificate/v1",
    row_id: rowId,
    receiver_history_id: receiver.historyId,
    transmitter_history_id: transmitter.historyId,
    receiver_history_fingerprint: receiver.historyFingerprint,
    transmitter_history_fingerprint: transmitter.historyFingerprint,
    reception_time: token(reception),
    searched_lower: token(searchLower),
    searched_upper: token(reception),
    field_speed: "1",
    root_tolerance: "1e-8",
    status: "certified_complete",
    failure_code: "",
    root_free_complement: true,
    memory_boundary_contact: false,
    coincident_endpoint_excluded: self,
    precision_escalated: false,
    achieved_precision_bits: 53,
    visited_cells: 10,
    excluded_cells: 1,
    difficult_cells: 0,
    diagnostic_detail: "synthetic independent reducer control",
    roots: root === null ? [] : [root],
    mpfr_attempt_count: 0,
    mpfr_escalation_attempt_count: 0,
    warm_excluded_cells: 0,
    reevaluated_cells: 0,
    warm_residual_drift_upper: 0,
    stable_negative_prefix_certified: false,
    stable_negative_prefix_upper: "",
    incremental_prefix_reuse_count: 0,
    root_free_cells: rootFreeCells,
    has_difficult_cell: false,
    difficult_source_segment_index: 0,
    difficult_cell_lower: "",
    difficult_cell_upper: "",
    difficult_point: "",
    difficult_point_residual_lower: "",
    difficult_point_residual_upper: "",
    difficult_transmitter_factor_lower: "",
    difficult_transmitter_factor_upper: "",
    difficult_receiver_factor_lower: "",
    difficult_receiver_factor_upper: "",
    difficult_lower_sign: 0,
    difficult_upper_sign: 0,
  };
}

function implementationBindings() {
  const sourcePaths = {
    "adapter-source": "src/eom/native/eom_f5_enclosed_root_cli.cpp",
    "exact-pair-header": "src/eom/include/architrino/eom/ExactPairBatch.hpp",
    "exact-pair-source": "src/eom/src/ExactPairBatch.cpp",
    "reducer-source": "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs",
  };
  return [
    "adapter-source", "adapter-executable", "exact-pair-header",
    "exact-pair-source", "eom-library", "reducer-source", "compiler",
    "toolchain",
  ].map((id, index) => ({
    id,
    path: sourcePaths[id] ?? `.local-data/synthetic-reducer-control/${id}`,
    descriptor: `${id}-synthetic-control`,
    sha256: String(index + 1).padStart(64, "0"),
  }));
}

function bindings() {
  return Object.entries(F5_FIXED_BINDINGS).map(([id, value]) => ({ id, ...value }));
}

function rung(samples) {
  const sourceMembers = members();
  const rows = [];
  for (let phase = 0; phase < samples; phase += 1) {
    const reception = phaseTime(phase, samples);
    for (let receiverIndex = 0; receiverIndex < 12; receiverIndex += 1) {
      for (let transmitterIndex = 0; transmitterIndex < 12; transmitterIndex += 1) {
        const receiver = sourceMembers[receiverIndex];
        const transmitter = sourceMembers[transmitterIndex];
        const rowId = `${receiver.worldlineId}/${transmitter.worldlineId}/phase-${phase}`;
        rows.push({
          phaseIndex: phase,
          receptionTime: token(reception),
          receiverIndex,
          transmitterIndex,
          receiverConstituentId: receiver.constituentId,
          transmitterConstituentId: transmitter.constituentId,
          receiverWorldlineId: receiver.worldlineId,
          transmitterWorldlineId: transmitter.worldlineId,
          rowId,
          certificate: certificate({
            rowId, receiver, transmitter, reception,
            self: receiverIndex === transmitterIndex,
          }),
        });
      }
    }
  }
  return {
    schema: F5_RUNG_SCHEMA,
    campaignId: "f5-enclosed-root-restart-20260826-v1",
    runId: "synthetic-reducer-control",
    rungSamples: samples,
    bindings: bindings(),
    implementationBindings: implementationBindings(),
    normalizedFieldSpeed: "1",
    period: "19.63359163663986",
    retainedHistoryDepth: "1",
    maximumSegmentStep: "0.02",
    positionWidth: "1.528724905003159e-10",
    velocityWidth: "2.866983034112353e-7",
    rootTolerance: "1e-8",
    rootMaxDepth: 192,
    rootMaxCells: 300000,
    initialMpfrBits: 128,
    maximumMpfrBits: 512,
    workerCount: 8,
    analyticInterpolationErrorBounded: true,
    receptionTokenRule: "exact-decimal-period-rational/v1",
    historyManifestSha256: sha256(HISTORY_BYTES),
    elapsedWallSeconds: 0,
    resourceControl: {
      projectedFinalRungSeconds: "100",
      limitSeconds: 1800,
      contact: false,
    },
    members: sourceMembers,
    rows,
    terminalStatus: "passed",
    completedRows: rows.length,
    passingRows: rows.length,
    failureCount: 0,
  };
}

const PACKETS = [rung(8), rung(32), rung(128)];

function reduce() {
  return reduceF5EnclosedRootLedgersForTests(PACKETS, {
    manifest: HISTORY_MANIFEST, bytes: HISTORY_BYTES,
  });
}

function rejectMutation(apply, restore, pattern) {
  apply();
  try {
    assert.throws(reduce, pattern);
  } finally {
    restore();
  }
}

test("synthetic complete census is structurally valid but cannot grant evidence authority", () => {
  const result = reduce();
  assert.equal(result.schema, F5_REDUCTION_SCHEMA);
  assert.equal(result.accepted, false);
  assert.equal(result.structurallyAccepted, true);
  assert.equal(result.authority, "test-only-bypassed-file-authority");
  assert.equal(result.h3EvidenceEligible, false);
  assert.equal(result.totalRows, 24192);
  assert.deepEqual(result.rungOrder, [8, 32, 128]);
  assert.match(result.combinedScientificLedgerSha256, /^[0-9a-f]{64}$/u);
});

test("the exact cell limit is admissible and precision provenance is coherent", () => {
  const row = PACKETS[0].rows[1].certificate;
  row.visited_cells = 300000;
  try {
    assert.equal(reduce().structurallyAccepted, true);
  } finally {
    row.visited_cells = 10;
  }
  rejectMutation(
    () => { row.precision_escalated = true; },
    () => { row.precision_escalated = false; },
    /binary64 precision provenance/u,
  );
  rejectMutation(
    () => { row.roots[0].precision_bits = 128; },
    () => { row.roots[0].precision_bits = 53; },
    /precision provenance/u,
  );
  rejectMutation(
    () => { row.roots[0].precision_route = "mpfr_directed_interval"; },
    () => { row.roots[0].precision_route = "binary64_outward"; },
    /precision provenance/u,
  );
});

test("enclosure, elapsed time, projection, and phase-token declarations are mandatory", () => {
  rejectMutation(
    () => { PACKETS[0].analyticInterpolationErrorBounded = false; },
    () => { PACKETS[0].analyticInterpolationErrorBounded = true; },
    /analyticInterpolationErrorBounded/u,
  );
  rejectMutation(
    () => { PACKETS[0].elapsedWallSeconds = -1; },
    () => { PACKETS[0].elapsedWallSeconds = 0; },
    /elapsedWallSeconds/u,
  );
  rejectMutation(
    () => { PACKETS[0].resourceControl.projectedFinalRungSeconds = "-1"; },
    () => { PACKETS[0].resourceControl.projectedFinalRungSeconds = "100"; },
    /nonnegative/u,
  );
  rejectMutation(
    () => { PACKETS[0].receptionTokenRule = "binary64-rounded"; },
    () => { PACKETS[0].receptionTokenRule = "exact-decimal-period-rational/v1"; },
    /receptionTokenRule/u,
  );
});

test("history manifest rejects altered widths, coefficient chains, and coverage", () => {
  const manifest = structuredClone(HISTORY_MANIFEST);
  const reduceManifest = () => reduceF5EnclosedRootLedgersForTests(PACKETS, manifest);
  const segment = manifest.members[0].segments[0];
  segment.positionErrors[0] = "0";
  assert.throws(reduceManifest, /positionErrors.*wrong exact value/u);
  segment.positionErrors[0] = POSITION_WIDTH;
  segment.velocityErrors[2] = "0";
  assert.throws(reduceManifest, /velocityErrors.*wrong exact value/u);
  segment.velocityErrors[2] = VELOCITY_WIDTH;
  segment.coefficients[0][0] = "1";
  assert.throws(reduceManifest, /exact segment-token chain/u);
  segment.coefficients[0][0] = "0";
  segment.tStart = "-0.999";
  assert.throws(reduceManifest, /frozen grid/u);
  segment.tStart = "-1";
  manifest.members[0].segments.pop();
  assert.throws(reduceManifest, /exactly 1032/u);
});

test("root and warm-cache diagnostics reject impossible serialization", () => {
  const row = PACKETS[0].rows[1].certificate;
  const root = row.roots[0];
  const originalIndices = [...root.transmitter_segment_indices];
  rejectMutation(
    () => { root.transmitter_segment_indices = [0, 0]; },
    () => { root.transmitter_segment_indices = [...originalIndices]; },
    /transmitter_segment_indices/u,
  );
  rejectMutation(
    () => { root.transmitter_segment_indices = [1032]; },
    () => { root.transmitter_segment_indices = [...originalIndices]; },
    /transmitter_segment_indices/u,
  );
  const touchingRoot = { ...structuredClone(root), lower: root.upper,
    upper: token(add(decimal(root.upper), decimal("1e-10"))) };
  row.roots.push(touchingRoot);
  assert.throws(reduce, /touches, overlaps/u);
  row.roots.pop();
  rejectMutation(
    () => { row.warm_residual_drift_upper = -1; },
    () => { row.warm_residual_drift_upper = 0; },
    /nonnegative/u,
  );
  rejectMutation(
    () => { row.difficult_point = "0"; },
    () => { row.difficult_point = ""; },
    /nondefault difficult-cell/u,
  );
  const cell = rootFreeCell(decimal("-1"), decimal("-0.99"));
  row.root_free_cells.push(cell);
  cell.numeric_values_valid = true;
  cell.lower_value = Number(cell.lower);
  cell.upper_value = Number(cell.upper);
  cell.residual_lower_value = 999;
  cell.residual_upper_value = Number(cell.residual_upper);
  assert.throws(reduce, /does not mirror/u);
  row.root_free_cells.pop();
});

test("production reduction rejects the former file-verification bypass", () => {
  assert.throws(
    () => reduceF5EnclosedRootLedgers(PACKETS, HISTORY_MANIFEST, { verifyFiles: false }),
    /unrecognized field verifyFiles/u,
  );
  assert.throws(
    () => reduceF5EnclosedRootLedgers(PACKETS, HISTORY_MANIFEST),
    /requires the original rung and history-manifest bytes/u,
  );
});

test("cited segments and repeated reception phases must describe the same roots", () => {
  const row = PACKETS[0].rows[1].certificate;
  const original = structuredClone(row.roots[0]);
  rejectMutation(
    () => { row.roots[0].transmitter_segment_indices = [0]; },
    () => { row.roots[0] = structuredClone(original); },
    /not covered by its cited segment intervals/u,
  );
  rejectMutation(
    () => {
      row.roots[0].lower = token(add(decimal(original.lower), decimal("1e-9")));
      row.roots[0].upper = token(add(decimal(original.upper), decimal("1e-9")));
    },
    () => { row.roots[0] = structuredClone(original); },
    /common reception.*inconsistent root brackets/u,
  );
  row.root_free_cells.push(rootFreeCell(decimal("-1"), decimal("-0.9")));
  assert.throws(reduce, /outside its cited segment interval/u);
  row.root_free_cells.pop();
});

test("eligible warm-start drift does not require successful cache reuse", () => {
  const row = PACKETS[0].rows[1].certificate;
  row.warm_residual_drift_upper = 0.1;
  try {
    assert.equal(reduce().structurallyAccepted, true);
  } finally {
    row.warm_residual_drift_upper = 0;
  }
});

test("all repeated-rung brackets share compatible intersections, not only adjacent overlap", () => {
  const roots = PACKETS.map((packet) => packet.rows[1].certificate.roots[0]);
  const originals = roots.map((root) => structuredClone(root));
  const bounds = [
    ["-0.500000004", "-0.5"],
    ["-0.500000001", "-0.499999997"],
    ["-0.499999998", "-0.499999994"],
  ];
  roots.forEach((root, index) => { [root.lower, root.upper] = bounds[index]; });
  try {
    assert.throws(reduce, /common reception.*inconsistent root brackets/u);
  } finally {
    PACKETS.forEach((packet, index) => {
      packet.rows[1].certificate.roots[0] = originals[index];
    });
  }
});

test("binary64 cache boundaries accept only identical-carrier alternate decimal spellings", () => {
  const row = PACKETS[0].rows[1].certificate;
  const cell = rootFreeCell(decimal("-1"), decimal("-0.98000620965441876"));
  assert.equal(Number(cell.upper), Number(HISTORY_MANIFEST.members[0].segments[0].tEnd));
  row.root_free_cells.push(cell);
  try {
    assert.equal(reduce().structurallyAccepted, true);
    cell.upper = "-0.9800062096544186";
    assert.throws(reduce, /outside its cited segment interval/u);
  } finally {
    row.root_free_cells.pop();
  }
});

test("scientific ledger hash excludes run labels and runtime projections", () => {
  const baseline = reduce().combinedScientificLedgerSha256;
  const alternateManifest = { ...HISTORY_MANIFEST, runId: "another-run" };
  const bytes = Buffer.from(`${JSON.stringify(alternateManifest, null, 2)}\n`);
  for (const packet of PACKETS) {
    packet.runId = "another-run";
    packet.historyManifestSha256 = sha256(bytes);
    packet.resourceControl.projectedFinalRungSeconds = "101";
  }
  try {
    const alternate = reduceF5EnclosedRootLedgersForTests(PACKETS, {
      manifest: alternateManifest, bytes,
    });
    assert.equal(alternate.combinedScientificLedgerSha256, baseline);
  } finally {
    for (const packet of PACKETS) {
      packet.runId = "synthetic-reducer-control";
      packet.historyManifestSha256 = sha256(HISTORY_BYTES);
      packet.resourceControl.projectedFinalRungSeconds = "100";
    }
  }
});

test("implementation verification hashes every bound file and catches mutation", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-binding-check-"));
  const implementation = implementationBindings();
  for (const binding of implementation) {
    const file = path.join(directory, binding.path);
    mkdirSync(path.dirname(file), { recursive: true });
    const bytes = Buffer.from(`${binding.id} independent byte-binding control\n`);
    writeFileSync(file, bytes, { flag: "wx" });
    binding.sha256 = sha256(bytes);
  }
  assert.deepEqual(verifyF5ImplementationBindings(implementation, { repoRoot: directory }),
    { verified: true, bindingCount: 8 });
  const changed = implementation.find((binding) => binding.id === "adapter-executable");
  writeFileSync(path.join(directory, changed.path), "changed executable bytes\n");
  assert.throws(
    () => verifyF5ImplementationBindings(implementation, { repoRoot: directory }),
    /adapter-executable differs from the bound file bytes/u,
  );
});

test("reducer rejects frozen-binding, control, and resource drift", () => {
  rejectMutation(
    () => { PACKETS[0].bindings[0].sha256 = ZERO_SHA; },
    () => { PACKETS[0].bindings[0].sha256 = Object.values(F5_FIXED_BINDINGS)[0].sha256; },
    /frozen path and hash/u,
  );
  rejectMutation(
    () => { PACKETS[0].positionWidth = "1e-12"; },
    () => { PACKETS[0].positionWidth = "1.528724905003159e-10"; },
    /positionWidth/u,
  );
  rejectMutation(
    () => { PACKETS[0].resourceControl.projectedFinalRungSeconds = "1800.1"; },
    () => { PACKETS[0].resourceControl.projectedFinalRungSeconds = "100"; },
    /exceeds 1800/u,
  );
});

test("reducer rejects missing, extra, reordered, and mistimed rows", () => {
  const removed = PACKETS[0].rows.pop();
  assert.throws(reduce, /exactly 1152 rows/u);
  PACKETS[0].rows.push(removed);
  PACKETS[0].rows.push(removed);
  assert.throws(reduce, /exactly 1152 rows/u);
  PACKETS[0].rows.pop();
  [PACKETS[0].rows[0], PACKETS[0].rows[1]] = [PACKETS[0].rows[1], PACKETS[0].rows[0]];
  assert.throws(reduce, /reordered/u);
  [PACKETS[0].rows[0], PACKETS[0].rows[1]] = [PACKETS[0].rows[1], PACKETS[0].rows[0]];
  rejectMutation(
    () => { PACKETS[0].rows[0].receptionTime = "0.1"; },
    () => { PACKETS[0].rows[0].receptionTime = "0"; },
    /wrong exact value/u,
  );
});

test("reducer rejects invalid self and partner root semantics", () => {
  const self = PACKETS[0].rows[0].certificate;
  const partner = PACKETS[0].rows[1].certificate;
  const savedPartnerRoot = structuredClone(partner.roots[0]);
  rejectMutation(
    () => { self.roots = [structuredClone(savedPartnerRoot)]; },
    () => { self.roots = []; },
    /self row has an ordinary root/u,
  );
  rejectMutation(
    () => { self.coincident_endpoint_excluded = false; },
    () => { self.coincident_endpoint_excluded = true; },
    /lacks endpoint exclusion/u,
  );
  rejectMutation(
    () => { partner.roots = []; },
    () => { partner.roots = [structuredClone(savedPartnerRoot)]; },
    /partner row lacks a root/u,
  );
  rejectMutation(
    () => {
      partner.roots[0].lower = "-0.000000001";
      partner.roots[0].upper = "0";
      partner.roots[0].transmitter_segment_indices = segmentIndices("-0.000000001", "0");
    },
    () => { partner.roots[0] = structuredClone(savedPartnerRoot); },
    /positive delay/u,
  );
});

test("reducer rejects factor, complement, boundary, status, and resource failures", () => {
  const certificateRow = PACKETS[0].rows[1].certificate;
  rejectMutation(
    () => {
      certificateRow.roots[0].transmitter_factor_lower = "-0.1";
      certificateRow.roots[0].transmitter_factor_upper = "0.1";
    },
    () => {
      certificateRow.roots[0].transmitter_factor_lower = "0.5";
      certificateRow.roots[0].transmitter_factor_upper = "0.6";
    },
    /contains zero/u,
  );
  rejectMutation(
    () => { certificateRow.roots[0].transmitter_factor_sign = -1; },
    () => { certificateRow.roots[0].transmitter_factor_sign = 1; },
    /disagrees/u,
  );
  rejectMutation(
    () => { certificateRow.root_free_complement = false; },
    () => { certificateRow.root_free_complement = true; },
    /complete accepted root certificate/u,
  );
  rejectMutation(
    () => { certificateRow.memory_boundary_contact = true; },
    () => { certificateRow.memory_boundary_contact = false; },
    /complete accepted root certificate/u,
  );
  rejectMutation(
    () => { certificateRow.status = "resource_limit"; },
    () => { certificateRow.status = "certified_complete"; },
    /complete accepted root certificate/u,
  );
  rejectMutation(
    () => { certificateRow.visited_cells = 300001; },
    () => { certificateRow.visited_cells = 10; },
    /cell limit/u,
  );
  rejectMutation(
    () => { certificateRow.achieved_precision_bits = 1024; },
    () => { certificateRow.achieved_precision_bits = 53; },
    /precision_bits/u,
  );
});

test("reducer rejects malformed brackets and incomplete certificate schema", () => {
  const certificateRow = PACKETS[0].rows[1].certificate;
  const savedUpper = certificateRow.roots[0].upper;
  rejectMutation(
    () => { certificateRow.roots[0].upper = "-0.499"; },
    () => { certificateRow.roots[0].upper = savedUpper; },
    /bracket|root tolerance/u,
  );
  delete certificateRow.diagnostic_detail;
  assert.throws(reduce, /missing diagnostic_detail/u);
  certificateRow.diagnostic_detail = "synthetic independent reducer control";
  certificateRow.unrecognized = true;
  assert.throws(reduce, /unrecognized field/u);
  delete certificateRow.unrecognized;
});

test("reducer accepts a complete MPFR certificate without warm-reuse cells", () => {
  const certificateRow = PACKETS[0].rows[1].certificate;
  const savedCells = certificateRow.root_free_cells;
  certificateRow.root_free_cells = [];
  certificateRow.precision_escalated = true;
  certificateRow.achieved_precision_bits = 128;
  certificateRow.mpfr_attempt_count = 1;
  certificateRow.mpfr_escalation_attempt_count = 0;
  certificateRow.roots[0].precision_route = "mpfr_directed_interval";
  certificateRow.roots[0].precision_bits = 128;
  try {
    assert.equal(reduce().structurallyAccepted, true);
  } finally {
    certificateRow.root_free_cells = savedCells;
    certificateRow.precision_escalated = false;
    certificateRow.achieved_precision_bits = 53;
    certificateRow.mpfr_attempt_count = 0;
    certificateRow.mpfr_escalation_attempt_count = 0;
    certificateRow.roots[0].precision_route = "binary64_outward";
    certificateRow.roots[0].precision_bits = 53;
  }
});

test("reducer output is create-exclusive", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-reducer-"));
  const output = path.join(directory, "result.json");
  const result = { schema: F5_REDUCTION_SCHEMA, accepted: true };
  assert.equal(writeF5ReductionOnce(output, result), output);
  assert.throws(() => writeF5ReductionOnce(output, result), /EEXIST/u);
});

test("reducer has no adapter, operator, EOM, or enclosure-instrument imports", () => {
  const source = readFileSync(new URL(
    "../src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs",
    import.meta.url,
  ), "utf8");
  const imports = [...source.matchAll(/^import .*$/gmu)].map((match) => match[0]);
  assert.deepEqual(imports, [
    'import { createHash } from "node:crypto";',
    'import { readFileSync, realpathSync, writeFileSync } from "node:fs";',
    'import path from "node:path";',
    'import { fileURLToPath } from "node:url";',
  ]);
});

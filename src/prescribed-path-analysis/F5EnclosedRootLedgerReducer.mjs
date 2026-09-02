import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const F5_RUNG_SCHEMA = "braid-program/f5-enclosed-root-rung.v1";
export const F5_REDUCTION_SCHEMA =
  "braid-program/f5-enclosed-root-ledger-reduction.v1";
export const F5_HISTORY_MANIFEST_SCHEMA =
  "braid-program/f5-enclosed-root-history-manifest.v1";

export const F5_FIXED_BINDINGS = Object.freeze({
  "approved-config": Object.freeze({
    path: "reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json",
    sha256: "e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb",
  }),
  "pilot-fixture": Object.freeze({
    path: "reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json",
    sha256: "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344",
  }),
  "restart-predeclaration": Object.freeze({
    path: "reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md",
    sha256: "1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5",
  }),
  "enclosure-evidence": Object.freeze({
    path: "reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md",
    sha256: "931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496",
  }),
  "accepted-enclosure-report": Object.freeze({
    path: ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json",
    sha256: "2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9",
  }),
});

const REQUIRED_IMPLEMENTATION_BINDINGS = Object.freeze([
  "adapter-source",
  "adapter-executable",
  "exact-pair-header",
  "exact-pair-source",
  "eom-library",
  "reducer-source",
  "compiler",
  "toolchain",
]);
const IMPLEMENTATION_SOURCE_PATHS = Object.freeze({
  "adapter-source": "src/eom/native/eom_f5_enclosed_root_cli.cpp",
  "exact-pair-header": "src/eom/include/architrino/eom/ExactPairBatch.hpp",
  "exact-pair-source": "src/eom/src/ExactPairBatch.cpp",
  "reducer-source": "src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs",
});

const EXPECTED_RUNG_ROWS = Object.freeze({ 8: 1152, 32: 4608, 128: 18432 });
const ALLOWED_PRECISION_BITS = new Set([53, 128, 256, 512]);
const HEX_SHA256 = /^[0-9a-f]{64}$/u;
const HISTORY_FINGERPRINT = /^fnv1a64-chain-v1:[0-9a-f]{16}$/u;
const DECIMAL_TOKEN = /^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u;
const HISTORY_SEGMENT_COUNT = 1032;
const HISTORY_START = "-1";
const HISTORY_END = "19.63359163663986";
const POSITION_WIDTH = "1.528724905003159e-10";
const VELOCITY_WIDTH = "2.866983034112353e-7";
const RECEPTION_TOKEN_RULE = "exact-decimal-period-rational/v1";
const HISTORY_GRID_STEP = (Number(HISTORY_END) - Number(HISTORY_START)) /
  HISTORY_SEGMENT_COUNT;
const HISTORY_GRID = Object.freeze(Array.from(
  { length: HISTORY_SEGMENT_COUNT + 1 },
  (_, index) => index === HISTORY_SEGMENT_COUNT
    ? HISTORY_END
    : String(Number(HISTORY_START) + HISTORY_GRID_STEP * index),
));

const PACKET_FIELDS = new Set([
  "schema", "campaignId", "runId", "rungSamples", "bindings",
  "implementationBindings", "normalizedFieldSpeed", "period",
  "retainedHistoryDepth", "maximumSegmentStep", "positionWidth",
  "velocityWidth", "rootTolerance", "rootMaxDepth", "rootMaxCells",
  "initialMpfrBits", "maximumMpfrBits", "workerCount", "resourceControl",
  "members", "rows", "terminalStatus", "completedRows", "passingRows",
  "failureCount", "elapsedWallSeconds", "analyticInterpolationErrorBounded",
  "receptionTokenRule", "historyManifestSha256",
]);
const REQUIRED_PACKET_FIELDS = Object.freeze([...PACKET_FIELDS]);
const HISTORY_MANIFEST_FIELDS = new Set([
  "schema", "campaignId", "runId", "normalizedFieldSpeed", "retainedInterval",
  "maximumSegmentStep", "positionWidth", "velocityWidth", "members",
]);
const HISTORY_MEMBER_FIELDS = new Set([
  "index", "constituentId", "worldlineId", "polarity", "historyId",
  "historyFingerprint", "segments",
]);
const HISTORY_SEGMENT_FIELDS = new Set([
  "index", "tStart", "tEnd", "coefficients", "positionErrors",
  "velocityErrors",
]);
const ROW_FIELDS = new Set([
  "phaseIndex", "receptionTime", "receiverIndex", "transmitterIndex",
  "receiverConstituentId", "transmitterConstituentId", "receiverWorldlineId",
  "transmitterWorldlineId", "rowId", "certificate",
]);
const ROOT_FIELDS = new Set([
  "lower", "upper", "transmitter_factor_lower", "transmitter_factor_upper",
  "receiver_factor_lower", "receiver_factor_upper", "transmitter_factor_sign",
  "transmitter_segment_indices", "precision_route", "precision_bits",
]);
const ROOT_FREE_CELL_FIELDS = new Set([
  "transmitter_segment_index", "lower", "upper", "residual_lower",
  "residual_upper", "receiver_factor_lower", "receiver_factor_upper",
  "lower_value", "upper_value", "residual_lower_value", "residual_upper_value",
  "numeric_values_valid",
]);

const CERTIFICATE_FIELDS = new Set([
  "schema", "row_id", "receiver_history_id", "transmitter_history_id",
  "receiver_history_fingerprint", "transmitter_history_fingerprint",
  "reception_time", "searched_lower", "searched_upper", "field_speed",
  "root_tolerance", "status", "failure_code", "root_free_complement",
  "memory_boundary_contact", "coincident_endpoint_excluded",
  "precision_escalated", "achieved_precision_bits", "visited_cells",
  "excluded_cells", "difficult_cells", "diagnostic_detail", "roots",
  "mpfr_attempt_count", "mpfr_escalation_attempt_count",
  "warm_excluded_cells", "reevaluated_cells",
  "stable_negative_prefix_certified", "stable_negative_prefix_upper",
  "incremental_prefix_reuse_count", "root_free_cells",
  "has_difficult_cell", "difficult_source_segment_index",
  "difficult_cell_lower", "difficult_cell_upper", "difficult_point",
  "difficult_point_residual_lower", "difficult_point_residual_upper",
  "difficult_transmitter_factor_lower", "difficult_transmitter_factor_upper",
  "difficult_receiver_factor_lower", "difficult_receiver_factor_upper",
  "difficult_lower_sign", "difficult_upper_sign",
  "binary64_worker_wall_seconds", "binary64_setup_wall_seconds",
  "binary64_warm_start_wall_seconds", "binary64_cell_setup_wall_seconds",
  "binary64_cell_classification_wall_seconds",
  "binary64_finalization_wall_seconds", "mpfr_worker_wall_seconds",
  "mpfr_escalation_worker_wall_seconds", "warm_residual_drift_upper",
]);

const REQUIRED_CERTIFICATE_FIELDS = Object.freeze([
  "schema", "row_id", "receiver_history_id", "transmitter_history_id",
  "receiver_history_fingerprint", "transmitter_history_fingerprint",
  "reception_time", "searched_lower", "searched_upper", "field_speed",
  "root_tolerance", "status", "failure_code", "root_free_complement",
  "memory_boundary_contact", "coincident_endpoint_excluded",
  "precision_escalated", "achieved_precision_bits", "visited_cells",
  "excluded_cells", "difficult_cells", "diagnostic_detail", "roots",
  "mpfr_attempt_count", "mpfr_escalation_attempt_count",
  "warm_excluded_cells", "reevaluated_cells",
  "stable_negative_prefix_certified", "stable_negative_prefix_upper",
  "incremental_prefix_reuse_count", "root_free_cells",
  "has_difficult_cell", "difficult_source_segment_index",
  "difficult_cell_lower", "difficult_cell_upper", "difficult_point",
  "difficult_point_residual_lower", "difficult_point_residual_upper",
  "difficult_transmitter_factor_lower", "difficult_transmitter_factor_upper",
  "difficult_receiver_factor_lower", "difficult_receiver_factor_upper",
  "difficult_lower_sign", "difficult_upper_sign",
  "warm_residual_drift_upper",
]);

function fail(message) {
  throw new Error(`F5 enclosed-root ledger rejected: ${message}`);
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertRecord(value, label) {
  if (!isRecord(value)) fail(`${label} must be an object.`);
  return value;
}

function assertExactKeys(record, allowed, required, label) {
  for (const key of Object.keys(record)) {
    if (!allowed.has(key)) fail(`${label} has unrecognized field ${key}.`);
  }
  for (const key of required) {
    if (!Object.hasOwn(record, key)) fail(`${label} is missing ${key}.`);
  }
}

function assertSha(value, label) {
  if (typeof value !== "string" || !HEX_SHA256.test(value)) {
    fail(`${label} must be a lowercase SHA-256 token.`);
  }
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
  );
}

function canonicalSha256(value) {
  return sha256Bytes(Buffer.from(JSON.stringify(canonicalize(value))));
}

function assertSafeRelativePath(value, label) {
  if (typeof value !== "string" || value.length === 0 || path.isAbsolute(value) ||
      value.split(/[\\/]/u).includes("..")) {
    fail(`${label} must be a safe repository-relative path.`);
  }
}

function assertFiniteNonnegative(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    fail(`${label} must be a finite nonnegative number.`);
  }
}

function fnv1a64Token(state, token) {
  const prime = 1099511628211n;
  const mask = (1n << 64n) - 1n;
  const update = (value) => ((state ^ BigInt(value)) * prime) & mask;
  const length = Buffer.byteLength(token, "utf8").toString();
  for (const value of Buffer.from(length, "utf8")) state = update(value);
  state = update(58);
  for (const value of Buffer.from(token, "utf8")) state = update(value);
  return state;
}

function historyFingerprint(segments) {
  let state = 14695981039346656037n;
  state = fnv1a64Token(state, "eom_history_segment_chain/v1");
  for (const segment of segments) {
    state = fnv1a64Token(state, segment.tStart);
    state = fnv1a64Token(state, segment.tEnd);
    for (const axis of segment.coefficients) {
      for (const coefficient of axis) state = fnv1a64Token(state, coefficient);
    }
    for (const error of segment.positionErrors) state = fnv1a64Token(state, error);
    for (const error of segment.velocityErrors) state = fnv1a64Token(state, error);
  }
  return `fnv1a64-chain-v1:${state.toString(16).padStart(16, "0")}`;
}

function normalizeDecimal(coefficient, exponent) {
  if (coefficient === 0n) return { coefficient: 0n, exponent: 0 };
  let next = coefficient;
  let nextExponent = exponent;
  while (next % 10n === 0n) {
    next /= 10n;
    nextExponent += 1;
  }
  return { coefficient: next, exponent: nextExponent };
}

export function parseExactDecimal(token, label = "decimal token") {
  if (typeof token !== "string" || token.length > 256) {
    fail(`${label} must be a finite decimal string.`);
  }
  const match = DECIMAL_TOKEN.exec(token);
  if (match === null) fail(`${label} is not a finite decimal string.`);
  const [, sign, whole, fraction = "", exponentToken = "0"] = match;
  const explicitExponent = Number(exponentToken);
  if (!Number.isSafeInteger(explicitExponent) || Math.abs(explicitExponent) > 1000) {
    fail(`${label} exponent is outside the accepted exact-token range.`);
  }
  const digits = `${whole}${fraction}`.replace(/^0+(?=\d)/u, "");
  let coefficient = BigInt(digits);
  if (sign === "-") coefficient = -coefficient;
  return normalizeDecimal(coefficient, explicitExponent - fraction.length);
}

function pow10(exponent) {
  if (!Number.isInteger(exponent) || exponent < 0 || exponent > 2000) {
    fail("decimal alignment exceeded the accepted exact-token range.");
  }
  return 10n ** BigInt(exponent);
}

function compareDecimal(left, right) {
  if (left.coefficient === right.coefficient && left.exponent === right.exponent) {
    return 0;
  }
  const exponent = Math.min(left.exponent, right.exponent);
  const leftInteger = left.coefficient * pow10(left.exponent - exponent);
  const rightInteger = right.coefficient * pow10(right.exponent - exponent);
  return leftInteger < rightInteger ? -1 : leftInteger > rightInteger ? 1 : 0;
}

function compareCarrierBoundary(left, right, binary64) {
  if (binary64) {
    const leftCarrier = Number(`${left.coefficient}e${left.exponent}`);
    const rightCarrier = Number(`${right.coefficient}e${right.exponent}`);
    if (Number.isFinite(leftCarrier) && leftCarrier === rightCarrier) return 0;
  }
  return compareDecimal(left, right);
}

function addDecimal(left, right) {
  const exponent = Math.min(left.exponent, right.exponent);
  return normalizeDecimal(
    left.coefficient * pow10(left.exponent - exponent) +
      right.coefficient * pow10(right.exponent - exponent),
    exponent,
  );
}

function subtractDecimal(left, right) {
  return addDecimal(left, { coefficient: -right.coefficient, exponent: right.exponent });
}

function multiplyInteger(value, integer) {
  return normalizeDecimal(value.coefficient * BigInt(integer), value.exponent);
}

function dividePowerOfTwo(value, exponent) {
  return normalizeDecimal(
    value.coefficient * (5n ** BigInt(exponent)),
    value.exponent - exponent,
  );
}

function assertDecimalEqual(actualToken, expected, label) {
  const actual = parseExactDecimal(actualToken, label);
  if (compareDecimal(actual, expected) !== 0) fail(`${label} has the wrong exact value.`);
}

function assertBoolean(value, expected, label) {
  if (value !== expected) fail(`${label} must be ${expected}.`);
}

function assertInteger(value, label, minimum = 0) {
  if (!Number.isSafeInteger(value) || value < minimum) {
    fail(`${label} must be an integer at least ${minimum}.`);
  }
}

function validateFixedBindings(packet, options) {
  if (!Array.isArray(packet.bindings)) fail("bindings must be an array.");
  const byId = new Map();
  for (const [index, binding] of packet.bindings.entries()) {
    assertRecord(binding, `bindings[${index}]`);
    if (typeof binding.id !== "string" || byId.has(binding.id)) {
      fail(`bindings[${index}].id must be unique.`);
    }
    if (typeof binding.path !== "string" || path.isAbsolute(binding.path) ||
        binding.path.split(/[\\/]/u).includes("..")) {
      fail(`bindings[${index}].path must be a safe repository-relative path.`);
    }
    assertSha(binding.sha256, `bindings[${index}].sha256`);
    byId.set(binding.id, binding);
  }
  for (const [id, expected] of Object.entries(F5_FIXED_BINDINGS)) {
    const binding = byId.get(id);
    if (binding?.path !== expected.path || binding?.sha256 !== expected.sha256) {
      fail(`binding ${id} does not match the frozen path and hash.`);
    }
    if (!options.testOnly) {
      const bytes = options.readRepositoryBytes(expected.path);
      if (sha256Bytes(bytes) !== expected.sha256) {
        fail(`binding ${id} differs from the current file bytes.`);
      }
    }
  }
  if (byId.size !== Object.keys(F5_FIXED_BINDINGS).length) {
    fail("bindings contains an undeclared source binding.");
  }
  return byId;
}

function validateImplementationBindings(packet, options) {
  if (!Array.isArray(packet.implementationBindings)) {
    fail("implementationBindings must be an array.");
  }
  const byId = new Map();
  for (const [index, binding] of packet.implementationBindings.entries()) {
    assertRecord(binding, `implementationBindings[${index}]`);
    if (typeof binding.id !== "string" || byId.has(binding.id)) {
      fail(`implementationBindings[${index}].id must be unique.`);
    }
    assertSha(binding.sha256, `implementationBindings[${index}].sha256`);
    assertSafeRelativePath(binding.path, `implementationBindings[${index}].path`);
    if (typeof binding.descriptor !== "string" || binding.descriptor.length === 0) {
      fail(`implementationBindings[${index}].descriptor must be nonempty.`);
    }
    byId.set(binding.id, binding);
  }
  for (const id of REQUIRED_IMPLEMENTATION_BINDINGS) {
    if (!byId.has(id)) fail(`implementation binding ${id} is required.`);
  }
  if (byId.size !== REQUIRED_IMPLEMENTATION_BINDINGS.length) {
    fail("implementationBindings contains an undeclared implementation binding.");
  }
  for (const [id, expectedPath] of Object.entries(IMPLEMENTATION_SOURCE_PATHS)) {
    if (byId.get(id).path !== expectedPath) {
      fail(`implementation binding ${id} has the wrong source-owner path.`);
    }
  }
  if (!options.testOnly) {
    for (const [id, binding] of byId) {
      const actual = options.readBindingBytes(binding.path);
      if (sha256Bytes(actual) !== binding.sha256) {
        fail(`implementation binding ${id} differs from the bound file bytes.`);
      }
    }
  }
}

function validateEnclosureReport(options) {
  if (options.testOnly) return;
  const report = JSON.parse(options.readRepositoryBytes(
    F5_FIXED_BINDINGS["accepted-enclosure-report"].path,
  ).toString("utf8"));
  if (report.schema !== "braid-program/f5-independent-interpolation-enclosure.v1" ||
      report.status !== "independent-enclosure-passed" || report.accepted !== true) {
    fail("accepted enclosure report is not an accepted independent enclosure.");
  }
  if (!Array.isArray(report.sourceChecks) ||
      report.sourceChecks.some((check) => check?.pass !== true ||
        check?.expectedSha256 !== check?.actualSha256)) {
    fail("accepted enclosure report has a failed source check.");
  }
  if (!Array.isArray(report.primitiveControls) || report.primitiveControls.length !== 6 ||
      report.primitiveControls.some((control) => control?.pass !== true)) {
    fail("accepted enclosure report has an incomplete primitive-control pass.");
  }
  const exactEnclosure = {
    globalFourthDerivativeBound: 0.286965499706333,
    positionWidth: 1.528724905003159e-10,
    velocityWidth: 2.866983034112353e-7,
  };
  for (const [field, expected] of Object.entries(exactEnclosure)) {
    if (report.enclosure?.[field] !== expected) {
      fail(`accepted enclosure report has the wrong ${field}.`);
    }
  }
  if (report.coverage?.segmentCount !== 1032 ||
      JSON.stringify(report.coverage?.interval) !== JSON.stringify([-1, 19.63359163663986]) ||
      report.method?.hermiteBounds?.maximumSegmentWidth !== 0.02) {
    fail("accepted enclosure report has the wrong interval or segment coverage.");
  }
  if (!Array.isArray(report.segments) || report.segments.length !== HISTORY_SEGMENT_COUNT ||
      report.segments.some((segment, index) => segment.index !== index ||
        String(segment.start) !== HISTORY_GRID[index] ||
        String(segment.end) !== HISTORY_GRID[index + 1])) {
    fail("accepted enclosure report differs from the frozen segment grid.");
  }
  if (!isRecord(report.falsifiers) ||
      Object.values(report.falsifiers).some((value) => value !== false)) {
    fail("accepted enclosure report has an active falsifier.");
  }
}

function validateConfigAndPilot(options) {
  const config = JSON.parse(options.readRepositoryBytes(
    F5_FIXED_BINDINGS["approved-config"].path,
  ).toString("utf8"));
  const pilot = JSON.parse(options.readRepositoryBytes(
    F5_FIXED_BINDINGS["pilot-fixture"].path,
  ).toString("utf8"));
  for (const field of [
    "constituents", "worldlines", "relationships", "history",
    "constraints", "display", "interpolation",
  ]) {
    if (JSON.stringify(config[field]) !== JSON.stringify(pilot[field])) {
      fail(`approved config and pilot fixture differ at ${field}.`);
    }
  }
  return config;
}

function validateControls(packet) {
  const expected = {
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
  };
  for (const [field, value] of Object.entries(expected)) {
    if (packet[field] !== value) fail(`${field} does not match the frozen control.`);
  }
  if (packet.analyticInterpolationErrorBounded !== true) {
    fail("analyticInterpolationErrorBounded must be true.");
  }
  if (packet.receptionTokenRule !== RECEPTION_TOKEN_RULE) {
    fail(`receptionTokenRule must be ${RECEPTION_TOKEN_RULE}.`);
  }
  assertSha(packet.historyManifestSha256, "historyManifestSha256");
  assertFiniteNonnegative(packet.elapsedWallSeconds, "elapsedWallSeconds");
  assertRecord(packet.resourceControl, "resourceControl");
  if (packet.resourceControl.limitSeconds !== 1800 ||
      packet.resourceControl.contact !== false) {
    fail("resource control contacted or changed the 1800-second limit.");
  }
  const projection = parseExactDecimal(
    packet.resourceControl.projectedFinalRungSeconds,
    "resourceControl.projectedFinalRungSeconds",
  );
  if (compareDecimal(projection, parseExactDecimal("0")) < 0) {
    fail("projected final rung must be nonnegative.");
  }
  if (compareDecimal(projection, parseExactDecimal("1800")) > 0) {
    fail("projected final rung exceeds 1800 seconds.");
  }
}

function expectedMembersFromConfig(config) {
  const constituentById = new Map(config.constituents.map((item) => [item.id, item]));
  const worldlineByConstituent = new Map(
    config.worldlines.map((item) => [item.constituentId, item]),
  );
  return config.relationships.sourceOrder.map((constituentId, index) => {
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineByConstituent.get(constituentId);
    if (constituent === undefined || worldline === undefined) {
      fail("approved config source order does not resolve every member.");
    }
    return {
      index,
      constituentId,
      worldlineId: worldline.id,
      polarity: constituent.polarity,
    };
  });
}

function validateHistoryErrors(errors, expectedToken, label) {
  if (!Array.isArray(errors) || errors.length !== 3) {
    fail(`${label} must contain exactly three axis tokens.`);
  }
  errors.forEach((error, axis) => {
    assertDecimalEqual(error, parseExactDecimal(expectedToken), `${label}[${axis}]`);
  });
}

function validateHistoryManifest(rawManifest, options, expectedMembers) {
  const manifest = Object.hasOwn(rawManifest, "manifest")
    ? rawManifest.manifest
    : rawManifest;
  const bytes = Object.hasOwn(rawManifest, "bytes")
    ? Buffer.from(rawManifest.bytes)
    : Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
  let parsed;
  try {
    parsed = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail("history manifest raw bytes are not valid JSON.");
  }
  if (JSON.stringify(parsed) !== JSON.stringify(manifest)) {
    fail("history manifest raw bytes do not match the reduced manifest.");
  }
  assertRecord(manifest, "history manifest");
  assertExactKeys(
    manifest, HISTORY_MANIFEST_FIELDS, HISTORY_MANIFEST_FIELDS, "history manifest",
  );
  if (manifest.schema !== F5_HISTORY_MANIFEST_SCHEMA) {
    fail(`history manifest schema must be ${F5_HISTORY_MANIFEST_SCHEMA}.`);
  }
  if (typeof manifest.campaignId !== "string" || manifest.campaignId.length === 0 ||
      typeof manifest.runId !== "string" || manifest.runId.length === 0) {
    fail("history manifest campaignId and runId must be nonempty.");
  }
  if (manifest.normalizedFieldSpeed !== "1" ||
      manifest.maximumSegmentStep !== "0.02" ||
      manifest.positionWidth !== POSITION_WIDTH ||
      manifest.velocityWidth !== VELOCITY_WIDTH ||
      !Array.isArray(manifest.retainedInterval) ||
      manifest.retainedInterval.length !== 2) {
    fail("history manifest controls differ from the frozen enclosure.");
  }
  assertDecimalEqual(
    manifest.retainedInterval[0], parseExactDecimal(HISTORY_START),
    "history manifest retainedInterval[0]",
  );
  assertDecimalEqual(
    manifest.retainedInterval[1], parseExactDecimal(HISTORY_END),
    "history manifest retainedInterval[1]",
  );
  if (!Array.isArray(manifest.members) || manifest.members.length !== 12) {
    fail("history manifest must contain exactly twelve members.");
  }
  const historyIds = new Set();
  const fingerprints = new Set();
  manifest.members.forEach((member, memberIndex) => {
    const prefix = `history manifest members[${memberIndex}]`;
    assertRecord(member, prefix);
    assertExactKeys(member, HISTORY_MEMBER_FIELDS, HISTORY_MEMBER_FIELDS, prefix);
    if (member.index !== memberIndex) fail(`${prefix}.index is not source order.`);
    for (const field of ["constituentId", "worldlineId", "polarity"]) {
      if (member[field] !== expectedMembers[memberIndex][field]) {
        fail(`${prefix}.${field} differs from approved source order.`);
      }
    }
    if (typeof member.historyId !== "string" || member.historyId.length === 0 ||
        historyIds.has(member.historyId)) {
      fail(`${prefix}.historyId must be nonempty and unique.`);
    }
    historyIds.add(member.historyId);
    if (typeof member.historyFingerprint !== "string" ||
        !HISTORY_FINGERPRINT.test(member.historyFingerprint) ||
        fingerprints.has(member.historyFingerprint)) {
      fail(`${prefix}.historyFingerprint must be a unique EOM history fingerprint.`);
    }
    fingerprints.add(member.historyFingerprint);
    if (!Array.isArray(member.segments) ||
        member.segments.length !== HISTORY_SEGMENT_COUNT) {
      fail(`${prefix}.segments must contain exactly ${HISTORY_SEGMENT_COUNT} rows.`);
    }
    let precedingEnd = parseExactDecimal(HISTORY_START);
    member.segments.forEach((segment, segmentIndex) => {
      const segmentPrefix = `${prefix}.segments[${segmentIndex}]`;
      assertRecord(segment, segmentPrefix);
      assertExactKeys(
        segment, HISTORY_SEGMENT_FIELDS, HISTORY_SEGMENT_FIELDS, segmentPrefix,
      );
      if (segment.index !== segmentIndex) fail(`${segmentPrefix}.index is not ordered.`);
      const start = parseExactDecimal(segment.tStart, `${segmentPrefix}.tStart`);
      const end = parseExactDecimal(segment.tEnd, `${segmentPrefix}.tEnd`);
      assertDecimalEqual(
        segment.tStart, parseExactDecimal(HISTORY_GRID[segmentIndex]),
        `${segmentPrefix}.tStart frozen grid`,
      );
      assertDecimalEqual(
        segment.tEnd, parseExactDecimal(HISTORY_GRID[segmentIndex + 1]),
        `${segmentPrefix}.tEnd frozen grid`,
      );
      if (compareDecimal(start, precedingEnd) !== 0 ||
          compareDecimal(start, end) >= 0 ||
          compareDecimal(subtractDecimal(end, start), parseExactDecimal("0.02")) > 0) {
        fail(`${segmentPrefix} is not a contiguous positive segment of width at most 0.02.`);
      }
      precedingEnd = end;
      if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 ||
          segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) {
        fail(`${segmentPrefix}.coefficients must have shape 3 by 4.`);
      }
      segment.coefficients.forEach((axis, axisIndex) => {
        axis.forEach((coefficient, coefficientIndex) => {
          parseExactDecimal(
            coefficient,
            `${segmentPrefix}.coefficients[${axisIndex}][${coefficientIndex}]`,
          );
          if (!Number.isFinite(Number(coefficient))) {
            fail(`${segmentPrefix} coefficient is not finite in the EOM carrier.`);
          }
        });
      });
      validateHistoryErrors(
        segment.positionErrors, POSITION_WIDTH, `${segmentPrefix}.positionErrors`,
      );
      validateHistoryErrors(
        segment.velocityErrors, VELOCITY_WIDTH, `${segmentPrefix}.velocityErrors`,
      );
    });
    if (compareDecimal(precedingEnd, parseExactDecimal(HISTORY_END)) !== 0) {
      fail(`${prefix}.segments do not end at the frozen retained-history endpoint.`);
    }
    if (historyFingerprint(member.segments) !== member.historyFingerprint) {
      fail(`${prefix}.historyFingerprint differs from its exact segment-token chain.`);
    }
  });
  return {
    manifest,
    rawSha256: sha256Bytes(bytes),
    geometrySha256: canonicalSha256(manifest.members),
    memberSet: manifest.members.map(({ segments: _segments, ...member }) => member),
  };
}

function validateMembers(packet, expectedMembers, manifestMembers) {
  if (!Array.isArray(packet.members) || packet.members.length !== 12) {
    fail("members must contain exactly twelve rows.");
  }
  const constituentIds = new Set();
  const worldlineIds = new Set();
  const historyIds = new Set();
  const fingerprints = new Set();
  packet.members.forEach((member, index) => {
    assertRecord(member, `members[${index}]`);
    if (member.index !== index) fail(`members[${index}].index is not source order.`);
    for (const [field, set] of [
      ["constituentId", constituentIds], ["worldlineId", worldlineIds],
      ["historyId", historyIds], ["historyFingerprint", fingerprints],
    ]) {
      if (typeof member[field] !== "string" || member[field].length === 0 ||
          set.has(member[field])) {
        fail(`members[${index}].${field} must be nonempty and unique.`);
      }
      set.add(member[field]);
    }
    if (!HISTORY_FINGERPRINT.test(member.historyFingerprint)) {
      fail(`members[${index}].historyFingerprint is not an EOM history fingerprint.`);
    }
    if (member.polarity !== 1 && member.polarity !== -1) {
      fail(`members[${index}].polarity must be +1 or -1.`);
    }
    for (const field of ["constituentId", "worldlineId", "polarity"]) {
      if (member[field] !== expectedMembers[index][field]) {
        fail(`members[${index}].${field} differs from approved source order.`);
      }
    }
    for (const field of [
      "index", "constituentId", "worldlineId", "polarity", "historyId",
      "historyFingerprint",
    ]) {
      if (member[field] !== manifestMembers[index][field]) {
        fail(`members[${index}].${field} differs from the checked history manifest.`);
      }
    }
  });
  return packet.members;
}

function validateFactorInterval(root, prefix, lowerField, upperField) {
  const lower = parseExactDecimal(root[lowerField], `${prefix}.${lowerField}`);
  const upper = parseExactDecimal(root[upperField], `${prefix}.${upperField}`);
  if (compareDecimal(lower, upper) > 0) fail(`${prefix} factor interval is reversed.`);
  const zero = parseExactDecimal("0");
  if (compareDecimal(lower, zero) <= 0 && compareDecimal(upper, zero) >= 0) {
    fail(`${prefix} factor interval contains zero.`);
  }
  return compareDecimal(lower, zero) > 0 ? 1 : -1;
}

function validateRoot(
  root, prefix, searchLower, reception, previousUpper, achievedPrecisionBits,
  transmitterSegments,
) {
  assertRecord(root, prefix);
  assertExactKeys(root, ROOT_FIELDS, ROOT_FIELDS, prefix);
  const lower = parseExactDecimal(root.lower, `${prefix}.lower`);
  const upper = parseExactDecimal(root.upper, `${prefix}.upper`);
  const binary64 = achievedPrecisionBits === 53;
  if (compareDecimal(lower, upper) >= 0 ||
      compareCarrierBoundary(lower, searchLower, binary64) < 0 ||
      compareCarrierBoundary(upper, reception, binary64) > 0) {
    fail(`${prefix} bracket is empty or outside the searched interval.`);
  }
  if (previousUpper !== null && compareDecimal(lower, previousUpper) <= 0) {
    fail(`${prefix} touches, overlaps, or reorders the preceding root.`);
  }
  const width = subtractDecimal(upper, lower);
  if (compareDecimal(width, parseExactDecimal("1e-8")) > 0) {
    fail(`${prefix} exceeds the root tolerance.`);
  }
  const transmitterSign = validateFactorInterval(
    root, prefix, "transmitter_factor_lower", "transmitter_factor_upper",
  );
  validateFactorInterval(root, prefix, "receiver_factor_lower", "receiver_factor_upper");
  if (root.transmitter_factor_sign !== transmitterSign) {
    fail(`${prefix}.transmitter_factor_sign disagrees with its interval.`);
  }
  if (!Array.isArray(root.transmitter_segment_indices) ||
      root.transmitter_segment_indices.length === 0 ||
      root.transmitter_segment_indices.some((item) =>
        !Number.isSafeInteger(item) || item < 0 || item >= HISTORY_SEGMENT_COUNT) ||
      root.transmitter_segment_indices.some((item, index, items) =>
        index > 0 && item <= items[index - 1])) {
    fail(`${prefix}.transmitter_segment_indices is invalid.`);
  }
  let coveredUpper = lower;
  for (const index of root.transmitter_segment_indices) {
    const segment = transmitterSegments[index];
    const start = parseExactDecimal(segment.tStart);
    const end = parseExactDecimal(segment.tEnd);
    if (compareCarrierBoundary(start, coveredUpper, binary64) > 0 ||
        compareCarrierBoundary(end, lower, binary64) < 0 ||
        compareCarrierBoundary(start, upper, binary64) > 0) {
      fail(`${prefix} bracket is not covered by its cited segment intervals.`);
    }
    if (compareDecimal(end, coveredUpper) > 0) coveredUpper = end;
  }
  if (compareCarrierBoundary(coveredUpper, upper, binary64) < 0) {
    fail(`${prefix} bracket is not covered by its cited segment intervals.`);
  }
  const expectedRoute = achievedPrecisionBits === 53
    ? "binary64_outward"
    : "mpfr_directed_interval";
  if (root.precision_route !== expectedRoute ||
      root.precision_bits !== achievedPrecisionBits) {
    fail(`${prefix} precision provenance is invalid.`);
  }
  return upper;
}

function validateRootFreeCells(
  certificate, prefix, searchLower, reception, transmitterSegments,
) {
  if (!Array.isArray(certificate.root_free_cells)) {
    fail(`${prefix}.root_free_cells must be an array.`);
  }
  for (const [index, cell] of certificate.root_free_cells.entries()) {
    const cellPrefix = `${prefix}.root_free_cells[${index}]`;
    assertRecord(cell, cellPrefix);
    assertExactKeys(
      cell,
      ROOT_FREE_CELL_FIELDS,
      [
        "transmitter_segment_index", "lower", "upper", "residual_lower",
        "residual_upper", "receiver_factor_lower", "receiver_factor_upper",
      ],
      cellPrefix,
    );
    for (const field of [
      "transmitter_segment_index", "lower", "upper", "residual_lower",
      "residual_upper", "receiver_factor_lower", "receiver_factor_upper",
    ]) {
      if (!Object.hasOwn(cell, field)) fail(`${cellPrefix} is missing ${field}.`);
    }
    assertInteger(cell.transmitter_segment_index, `${cellPrefix}.transmitter_segment_index`);
    if (cell.transmitter_segment_index >= HISTORY_SEGMENT_COUNT) {
      fail(`${cellPrefix}.transmitter_segment_index is outside the history manifest.`);
    }
    const lower = parseExactDecimal(cell.lower, `${cellPrefix}.lower`);
    const upper = parseExactDecimal(cell.upper, `${cellPrefix}.upper`);
    if (compareDecimal(lower, upper) >= 0 ||
        compareCarrierBoundary(lower, searchLower, true) < 0 ||
        compareCarrierBoundary(upper, reception, true) > 0) {
      fail(`${cellPrefix} is empty or outside the searched interval.`);
    }
    const segment = transmitterSegments[cell.transmitter_segment_index];
    if (compareCarrierBoundary(lower, parseExactDecimal(segment.tStart), true) < 0 ||
        compareCarrierBoundary(upper, parseExactDecimal(segment.tEnd), true) > 0) {
      fail(`${cellPrefix} is outside its cited segment interval.`);
    }
    validateFactorInterval(cell, cellPrefix, "residual_lower", "residual_upper");
    const receiverLower = parseExactDecimal(
      cell.receiver_factor_lower, `${cellPrefix}.receiver_factor_lower`,
    );
    const receiverUpper = parseExactDecimal(
      cell.receiver_factor_upper, `${cellPrefix}.receiver_factor_upper`,
    );
    if (compareDecimal(receiverLower, receiverUpper) > 0) {
      fail(`${cellPrefix} receiver-factor interval is reversed.`);
    }
    if (cell.numeric_values_valid === true) {
      for (const [tokenField, valueField] of [
        ["lower", "lower_value"], ["upper", "upper_value"],
        ["residual_lower", "residual_lower_value"],
        ["residual_upper", "residual_upper_value"],
      ]) {
        if (typeof cell[valueField] !== "number" || !Number.isFinite(cell[valueField]) ||
            cell[valueField] !== Number(cell[tokenField])) {
          fail(`${cellPrefix}.${valueField} does not mirror ${tokenField}.`);
        }
      }
    } else if (cell.numeric_values_valid !== undefined &&
        cell.numeric_values_valid !== false) {
      fail(`${cellPrefix}.numeric_values_valid must be boolean when present.`);
    }
  }
}

function validateCertificate(certificate, context) {
  const prefix = `rows[${context.rowIndex}].certificate`;
  assertRecord(certificate, prefix);
  assertExactKeys(certificate, CERTIFICATE_FIELDS, REQUIRED_CERTIFICATE_FIELDS, prefix);
  if (typeof certificate.diagnostic_detail !== "string") {
    fail(`${prefix}.diagnostic_detail must be a string.`);
  }
  if (certificate.schema !== "eom_native_exact_pair_certificate/v1" ||
      certificate.row_id !== context.rowId ||
      certificate.receiver_history_id !== context.receiver.historyId ||
      certificate.transmitter_history_id !== context.transmitter.historyId ||
      certificate.receiver_history_fingerprint !== context.receiver.historyFingerprint ||
      certificate.transmitter_history_fingerprint !== context.transmitter.historyFingerprint) {
    fail(`${prefix} identity or schema does not match its census row.`);
  }
  assertDecimalEqual(certificate.reception_time, context.reception, `${prefix}.reception_time`);
  assertDecimalEqual(certificate.searched_lower, context.searchLower, `${prefix}.searched_lower`);
  assertDecimalEqual(certificate.searched_upper, context.reception, `${prefix}.searched_upper`);
  if (certificate.field_speed !== "1" || certificate.root_tolerance !== "1e-8" ||
      certificate.status !== "certified_complete" || certificate.failure_code !== "" ||
      certificate.root_free_complement !== true ||
      certificate.memory_boundary_contact !== false) {
    fail(`${prefix} does not carry a complete accepted root certificate.`);
  }
  assertInteger(certificate.visited_cells, `${prefix}.visited_cells`);
  if (certificate.visited_cells > 300000) fail(`${prefix} exceeded the cell limit.`);
  if (!ALLOWED_PRECISION_BITS.has(certificate.achieved_precision_bits) ||
      certificate.achieved_precision_bits > 512) {
    fail(`${prefix}.achieved_precision_bits is outside the accepted ladder.`);
  }
  if (certificate.has_difficult_cell !== false || certificate.difficult_cells !== 0) {
    fail(`${prefix} retains an unresolved difficult cell.`);
  }
  for (const field of [
    "excluded_cells", "mpfr_attempt_count", "mpfr_escalation_attempt_count",
    "warm_excluded_cells", "reevaluated_cells", "incremental_prefix_reuse_count",
    "difficult_source_segment_index",
  ]) {
    assertInteger(certificate[field], `${prefix}.${field}`);
  }
  for (const field of [
    "precision_escalated", "stable_negative_prefix_certified",
    "has_difficult_cell",
  ]) {
    if (typeof certificate[field] !== "boolean") {
      fail(`${prefix}.${field} must be boolean.`);
    }
  }
  assertFiniteNonnegative(
    certificate.warm_residual_drift_upper,
    `${prefix}.warm_residual_drift_upper`,
  );
  if (certificate.achieved_precision_bits === 53) {
    if (certificate.precision_escalated !== false ||
        certificate.mpfr_attempt_count !== 0 ||
        certificate.mpfr_escalation_attempt_count !== 0) {
      fail(`${prefix} binary64 precision provenance is inconsistent.`);
    }
  } else {
    const attemptCount = Math.log2(certificate.achieved_precision_bits / 128) + 1;
    if (certificate.precision_escalated !== true ||
        certificate.mpfr_attempt_count !== attemptCount ||
        certificate.mpfr_escalation_attempt_count !== attemptCount - 1) {
      fail(`${prefix} MPFR precision provenance is inconsistent.`);
    }
  }
  if (certificate.stable_negative_prefix_certified) {
    const stableUpper = parseExactDecimal(
      certificate.stable_negative_prefix_upper,
      `${prefix}.stable_negative_prefix_upper`,
    );
    if (compareCarrierBoundary(stableUpper, context.searchLower, true) < 0 ||
        compareCarrierBoundary(stableUpper, context.reception, true) > 0) {
      fail(`${prefix}.stable_negative_prefix_upper is outside the searched interval.`);
    }
  }
  if (certificate.has_difficult_cell !== false ||
      certificate.difficult_source_segment_index !== 0 ||
      certificate.difficult_cell_lower !== "" ||
      certificate.difficult_cell_upper !== "" || certificate.difficult_point !== "" ||
      certificate.difficult_point_residual_lower !== "" ||
      certificate.difficult_point_residual_upper !== "" ||
      certificate.difficult_transmitter_factor_lower !== "" ||
      certificate.difficult_transmitter_factor_upper !== "" ||
      certificate.difficult_receiver_factor_lower !== "" ||
      certificate.difficult_receiver_factor_upper !== "" ||
      certificate.difficult_lower_sign !== 0 || certificate.difficult_upper_sign !== 0) {
    fail(`${prefix} retains nondefault difficult-cell diagnostics.`);
  }
  validateRootFreeCells(
    certificate, prefix, context.searchLower, context.reception,
    context.transmitterSegments,
  );
  if (!Array.isArray(certificate.roots)) fail(`${prefix}.roots must be an array.`);
  let previousUpper = null;
  for (const [index, root] of certificate.roots.entries()) {
    previousUpper = validateRoot(
      root, `${prefix}.roots[${index}]`, context.searchLower,
      context.reception, previousUpper, certificate.achieved_precision_bits,
      context.transmitterSegments,
    );
  }
  if (context.self) {
    if (certificate.roots.length !== 0 || certificate.coincident_endpoint_excluded !== true) {
      fail(`${prefix} self row has an ordinary root or lacks endpoint exclusion.`);
    }
  } else {
    if (certificate.roots.length === 0 || certificate.coincident_endpoint_excluded !== false) {
      fail(`${prefix} partner row lacks a root or claims self-endpoint exclusion.`);
    }
    for (const root of certificate.roots) {
      if (compareCarrierBoundary(
        parseExactDecimal(root.upper), context.reception,
        certificate.achieved_precision_bits === 53,
      ) >= 0) {
        fail(`${prefix} partner root does not have positive delay.`);
      }
    }
  }
}

function scientificProjection(packet, historyGeometrySha256) {
  const timingFields = new Set([
    "binary64_worker_wall_seconds", "binary64_setup_wall_seconds",
    "binary64_warm_start_wall_seconds", "binary64_cell_setup_wall_seconds",
    "binary64_cell_classification_wall_seconds",
    "binary64_finalization_wall_seconds", "mpfr_worker_wall_seconds",
    "mpfr_escalation_worker_wall_seconds", "elapsedWallSeconds",
    "runId", "projectedFinalRungSeconds", "historyManifestSha256",
    "implementationBindings",
  ]);
  function strip(value) {
    if (Array.isArray(value)) return value.map(strip);
    if (!isRecord(value)) return value;
    return Object.fromEntries(Object.entries(value)
      .filter(([key]) => !timingFields.has(key))
      .map(([key, item]) => [key, strip(item)]));
  }
  return { ...strip(packet), historyGeometrySha256 };
}

function validateRungPacket(packet, options) {
  assertRecord(packet, "rung packet");
  assertExactKeys(packet, PACKET_FIELDS, REQUIRED_PACKET_FIELDS, "rung packet");
  if (packet.schema !== F5_RUNG_SCHEMA) fail(`schema must be ${F5_RUNG_SCHEMA}.`);
  if (typeof packet.campaignId !== "string" || packet.campaignId.length === 0 ||
      typeof packet.runId !== "string" || packet.runId.length === 0) {
    fail("campaignId and runId must be nonempty.");
  }
  if (!Object.hasOwn(EXPECTED_RUNG_ROWS, packet.rungSamples)) {
    fail("rungSamples must be exactly 8, 32, or 128.");
  }
  validateFixedBindings(packet, options);
  validateImplementationBindings(packet, options);
  validateControls(packet);
  if (packet.historyManifestSha256 !== options.historySummary.rawSha256) {
    fail("historyManifestSha256 differs from the checked manifest bytes.");
  }
  const members = validateMembers(
    packet, options.expectedMembers, options.historySummary.memberSet,
  );
  const expectedRows = EXPECTED_RUNG_ROWS[packet.rungSamples];
  if (!Array.isArray(packet.rows) || packet.rows.length !== expectedRows) {
    fail(`rung ${packet.rungSamples} must contain exactly ${expectedRows} rows.`);
  }
  if (packet.terminalStatus !== "passed" || packet.completedRows !== expectedRows ||
      packet.passingRows !== expectedRows || packet.failureCount !== 0) {
    fail(`rung ${packet.rungSamples} terminal census is incomplete or failed.`);
  }
  const period = parseExactDecimal("19.63359163663986");
  const denominatorPower = Math.log2(packet.rungSamples);
  for (let phase = 0; phase < packet.rungSamples; phase += 1) {
    const reception = dividePowerOfTwo(multiplyInteger(period, phase), denominatorPower);
    const searchLower = subtractDecimal(reception, parseExactDecimal("1"));
    for (let receiverIndex = 0; receiverIndex < 12; receiverIndex += 1) {
      for (let transmitterIndex = 0; transmitterIndex < 12; transmitterIndex += 1) {
        const rowIndex = phase * 144 + receiverIndex * 12 + transmitterIndex;
        const row = assertRecord(packet.rows[rowIndex], `rows[${rowIndex}]`);
        assertExactKeys(row, ROW_FIELDS, ROW_FIELDS, `rows[${rowIndex}]`);
        const receiver = members[receiverIndex];
        const transmitter = members[transmitterIndex];
        const rowId = `${receiver.worldlineId}/${transmitter.worldlineId}/phase-${phase}`;
        if (row.phaseIndex !== phase || row.receiverIndex !== receiverIndex ||
            row.transmitterIndex !== transmitterIndex ||
            row.receiverConstituentId !== receiver.constituentId ||
            row.transmitterConstituentId !== transmitter.constituentId ||
            row.receiverWorldlineId !== receiver.worldlineId ||
            row.transmitterWorldlineId !== transmitter.worldlineId ||
            row.rowId !== rowId) {
          fail(`rows[${rowIndex}] is missing, reordered, or misidentified.`);
        }
        assertDecimalEqual(row.receptionTime, reception, `rows[${rowIndex}].receptionTime`);
        validateCertificate(row.certificate, {
          rowIndex, rowId, receiver, transmitter, reception, searchLower,
          transmitterSegments:
            options.historySummary.manifest.members[transmitterIndex].segments,
          self: receiverIndex === transmitterIndex,
        });
      }
    }
  }
  return {
    campaignId: packet.campaignId,
    runId: packet.runId,
    rungSamples: packet.rungSamples,
    rowCount: packet.rows.length,
    rawSha256: options.rawSha256,
    scientificLedgerSha256: canonicalSha256(scientificProjection(
      packet, options.historySummary.geometrySha256,
    )),
    maximumVisitedCells: Math.max(...packet.rows.map((row) => row.certificate.visited_cells)),
    maximumPrecisionBits: Math.max(...packet.rows.map((row) => row.certificate.achieved_precision_bits)),
    ordinaryRootCount: packet.rows.reduce(
      (sum, row) => sum + row.certificate.roots.length, 0,
    ),
    bindingSetSha256: canonicalSha256(packet.bindings),
    implementationBindingSetSha256: canonicalSha256(packet.implementationBindings),
    memberSetSha256: canonicalSha256(packet.members),
    controlSetSha256: canonicalSha256({
      normalizedFieldSpeed: packet.normalizedFieldSpeed,
      period: packet.period,
      retainedHistoryDepth: packet.retainedHistoryDepth,
      maximumSegmentStep: packet.maximumSegmentStep,
      positionWidth: packet.positionWidth,
      velocityWidth: packet.velocityWidth,
      rootTolerance: packet.rootTolerance,
      rootMaxDepth: packet.rootMaxDepth,
      rootMaxCells: packet.rootMaxCells,
      initialMpfrBits: packet.initialMpfrBits,
      maximumMpfrBits: packet.maximumMpfrBits,
      workerCount: packet.workerCount,
      analyticInterpolationErrorBounded: packet.analyticInterpolationErrorBounded,
      receptionTokenRule: packet.receptionTokenRule,
      historyManifestSha256: packet.historyManifestSha256,
    }),
  };
}

function repositoryReader(repoRoot) {
  const cache = new Map();
  return (relativePath) => {
    assertSafeRelativePath(relativePath, "repository binding path");
    if (!cache.has(relativePath)) {
      cache.set(relativePath, readFileSync(path.join(repoRoot, relativePath)));
    }
    return cache.get(relativePath);
  };
}

function validateRepeatedReceptionRoots(packets) {
  for (let rungIndex = 0; rungIndex < packets.length - 1; rungIndex += 1) {
    const smaller = packets[rungIndex];
    for (let otherIndex = rungIndex + 1; otherIndex < packets.length; otherIndex += 1) {
      const larger = packets[otherIndex];
      const ratio = larger.rungSamples / smaller.rungSamples;
      for (let phase = 0; phase < smaller.rungSamples; phase += 1) {
        for (let pair = 0; pair < 144; pair += 1) {
          const first = smaller.rows[phase * 144 + pair].certificate.roots;
          const second = larger.rows[phase * ratio * 144 + pair].certificate.roots;
          if (first.length !== second.length) {
            fail(`common reception phase ${phase} has inconsistent root counts across rungs.`);
          }
          first.forEach((root, index) => {
            const other = second[index];
            if (compareDecimal(parseExactDecimal(root.lower), parseExactDecimal(other.upper)) > 0 ||
                compareDecimal(parseExactDecimal(other.lower), parseExactDecimal(root.upper)) > 0 ||
                root.transmitter_factor_sign !== other.transmitter_factor_sign ||
                compareDecimal(parseExactDecimal(root.receiver_factor_lower), parseExactDecimal("0")) !==
                  compareDecimal(parseExactDecimal(other.receiver_factor_lower), parseExactDecimal("0"))) {
              fail(`common reception phase ${phase} has inconsistent root brackets or signs across rungs.`);
            }
          });
        }
      }
    }
  }
}

function reduceF5EnclosedRootLedgersCore(
  rawPackets, rawHistoryManifest, options,
) {
  if (!Array.isArray(rawPackets) || rawPackets.length !== 3) {
    fail("exactly three rung packets are required.");
  }
  if (!options.testOnly && (
    rawPackets.some((entry) => !isRecord(entry) ||
      !Object.hasOwn(entry, "packet") || !Object.hasOwn(entry, "bytes")) ||
    !isRecord(rawHistoryManifest) || !Object.hasOwn(rawHistoryManifest, "manifest") ||
    !Object.hasOwn(rawHistoryManifest, "bytes")
  )) {
    fail("authoritative reduction requires the original rung and history-manifest bytes.");
  }
  const config = validateConfigAndPilot(options);
  validateEnclosureReport(options);
  const expectedMembers = expectedMembersFromConfig(config);
  const historySummary = validateHistoryManifest(
    rawHistoryManifest, options, expectedMembers,
  );
  const normalizedOptions = { ...options, expectedMembers, historySummary };
  const summaries = rawPackets.map((entry, index) => {
    const packet = Object.hasOwn(entry, "packet") ? entry.packet : entry;
    const bytes = Object.hasOwn(entry, "bytes")
      ? entry.bytes
      : Buffer.from(`${JSON.stringify(packet, null, 2)}\n`);
    if (Object.hasOwn(entry, "bytes")) {
      let parsed;
      try {
        parsed = JSON.parse(Buffer.from(bytes).toString("utf8"));
      } catch {
        fail(`rung ${index} raw bytes are not valid JSON.`);
      }
      if (JSON.stringify(parsed) !== JSON.stringify(packet)) {
        fail(`rung ${index} raw bytes do not match the reduced packet.`);
      }
    }
    return validateRungPacket(packet, {
      ...normalizedOptions,
      rawSha256: sha256Bytes(bytes),
      rungIndex: index,
    });
  });
  if (summaries.map((summary) => summary.rungSamples).join(",") !== "8,32,128") {
    fail("rung packets must be supplied in the exact 8, 32, 128 order.");
  }
  if (new Set(summaries.map((summary) => summary.campaignId)).size !== 1 ||
      new Set(summaries.map((summary) => summary.runId)).size !== 1) {
    fail("all rung packets must share one campaignId and runId.");
  }
  if (historySummary.manifest.campaignId !== summaries[0].campaignId ||
      historySummary.manifest.runId !== summaries[0].runId) {
    fail("history manifest campaignId and runId differ from the rung packets.");
  }
  for (const field of [
    "bindingSetSha256", "implementationBindingSetSha256", "memberSetSha256",
    "controlSetSha256",
  ]) {
    if (new Set(summaries.map((summary) => summary[field])).size !== 1) {
      fail(`all rung packets must share one ${field}.`);
    }
  }
  validateRepeatedReceptionRoots(rawPackets.map((entry) =>
    Object.hasOwn(entry, "packet") ? entry.packet : entry));
  const result = {
    schema: F5_REDUCTION_SCHEMA,
    accepted: !options.testOnly,
    structurallyAccepted: true,
    authority: options.testOnly
      ? "test-only-bypassed-file-authority"
      : "source-and-byte-bound-independent-reduction",
    h3EvidenceEligible: false,
    claimBoundary:
      "root-ledger census, certificate serialization, source-byte and history-token conformance only; actual analytic-to-cubic correspondence and reviewed build provenance remain separate requirements before H3; no evolution, retention, stability, binding, score, particle identity, or physical-realization claim",
    campaignId: summaries[0].campaignId,
    runId: summaries[0].runId,
    historyManifestSha256: historySummary.rawSha256,
    rungOrder: [8, 32, 128],
    totalRows: summaries.reduce((sum, summary) => sum + summary.rowCount, 0),
    rungSummaries: summaries,
    combinedScientificLedgerSha256: canonicalSha256(
      summaries.map((summary) => summary.scientificLedgerSha256),
    ),
    checks: {
      frozenBindings: "passed",
      enclosureAuthority: "passed",
      exactHistoryManifest: "passed",
      actualAnalyticToCubicConformance: "separate-independent-receipt-required",
      reviewedBuildProvenance: "separate-reviewed-receipt-required",
      exactCensus: "passed",
      selfRows: "passed",
      partnerRows: "passed",
      factorMargins: "passed",
      rootFreeComplements: "passed",
      resourceLimits: "passed",
    },
    nextAuthority:
      "requires independent analytic-to-actual-cubic conformance bound to this history manifest and reviewed build provenance before H3 evidence review; ordinary evolution remains separately predeclared",
  };
  if (options.testOnly) {
    result.checks.frozenBindings = "test-only-byte-authority-not-verified";
    result.checks.enclosureAuthority = "test-only-byte-authority-not-verified";
    result.nextAuthority =
      "test-only structural result; cannot authorize H3 evidence or execution";
  }
  return result;
}

export function reduceF5EnclosedRootLedgers(
  rawPackets, rawHistoryManifest, options = {},
) {
  assertRecord(options, "reducer options");
  assertExactKeys(options, new Set(["repoRoot"]), [], "reducer options");
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  if (realpathSync(path.join(repoRoot, IMPLEMENTATION_SOURCE_PATHS["reducer-source"])) !==
      realpathSync(fileURLToPath(import.meta.url))) {
    fail("reducer-source must identify the executing reducer module, not another checkout.");
  }
  const readBytes = repositoryReader(repoRoot);
  return reduceF5EnclosedRootLedgersCore(rawPackets, rawHistoryManifest, {
    repoRoot,
    readRepositoryBytes: readBytes,
    readBindingBytes: readBytes,
    testOnly: false,
  });
}

export function reduceF5EnclosedRootLedgersForTests(
  rawPackets, rawHistoryManifest,
) {
  const repoRoot = process.cwd();
  const readBytes = repositoryReader(repoRoot);
  return reduceF5EnclosedRootLedgersCore(rawPackets, rawHistoryManifest, {
    repoRoot,
    readRepositoryBytes: readBytes,
    readBindingBytes: () => Buffer.alloc(0),
    testOnly: true,
  });
}

export function verifyF5ImplementationBindings(implementationBindings, options = {}) {
  assertRecord(options, "implementation verification options");
  assertExactKeys(
    options, new Set(["repoRoot"]), [], "implementation verification options",
  );
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  validateImplementationBindings({ implementationBindings }, {
    readBindingBytes: repositoryReader(repoRoot),
    testOnly: false,
  });
  return { verified: true, bindingCount: implementationBindings.length };
}

export function sha256File(file) {
  return sha256Bytes(readFileSync(file));
}

export function writeF5ReductionOnce(file, result) {
  writeFileSync(file, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return file;
}

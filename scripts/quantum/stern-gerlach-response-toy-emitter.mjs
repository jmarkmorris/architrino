#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.resolve(
  SCRIPT_DIR,
  "../tri-binary/fixtures/action-increment-source-contract-blocked.json"
);
const EPS = 1e-9;
const PARTIES = ["A", "B"];
const RESIDUAL_KEYS = ["Delta_rec", "Delta_div", "entropy_locking", "event_ledger"];
const ROW_ARRAY_KEYS = [
  "stern_gerlach_response_rows",
  "stern_gerlach_response_inputs",
  "local_stern_gerlach_rows",
  "local_apparatus_response_rows",
  "local_apparatus_response_inputs",
  "local_response_inputs",
  "records",
  "rows",
  "accepted_branch_states",
];
const ACCEPTED_RESPONSE_SOURCES = new Set([
  "substrate_derived",
  "accepted_stern_gerlach_response",
  "accepted_local_apparatus_response",
  "accepted_record_basin_pullback",
]);
const FORBIDDEN_RESPONSE_SOURCES = new Set([
  "threshold_interval",
  "eta_AB_interval",
  "correlation_interval",
  "bell_target_table",
  "chsh_target_table",
  "declared_pair_sign",
  "declared_pair_signs",
]);
const FORBIDDEN_FIELD_KEYS = [
  "correlation_interval",
  "eta_AB_interval",
  "target_correlation",
  "bell_target_table",
  "chsh_target_table",
  "declared_pair_sign",
  "declared_pair_signs",
  "probabilities",
  "contexts",
];
const FAILURE_CODES = [
  "sg-response-row-missing",
  "source-record-id-missing",
  "party-missing",
  "setting-missing",
  "response-source-not-accepted",
  "forbidden-bell-threshold-source",
  "apparatus-kernel-missing",
  "setting-axis-missing",
  "z-in-missing",
  "record-window-missing",
  "record-gate-missing",
  "signed-response-functional-missing",
  "signed-response-separatrix-zero",
  "record-cycle-phase-missing",
  "local-record-residuals-missing",
  "residual-window-missing",
  "residual-window-mismatch",
  "delta-rec-missing",
  "delta-div-missing",
  "entropy-locking-missing",
  "event-ledger-missing",
  "sg-response-duplicate-row",
];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    printContract: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.help) {
    return args;
  }
  if (args.input === undefined) {
    throw new Error("--input requires a path.");
  }
  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/stern-gerlach-response-toy-emitter.mjs [options]

Options:
  --input PATH       Read candidate local Stern-Gerlach apparatus response JSON.
                     Defaults to scripts/tri-binary/fixtures/action-increment-source-contract-blocked.json
  --print-contract  Print the required local Stern-Gerlach response input contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

This diagnostic emitter is fail-closed. It emits adapter-ready local_response
rows only when the input explicitly supplies a completed local record gate,
nonzero signed response functional, record-cycle phase, apparatus axis,
incoming local record id, accepted response source, and same-window residuals.
It does not infer signs from correlation intervals, eta_AB intervals, Bell
target tables, or context probability tables.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function nonemptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(finiteNumber);
}

function relativePath(filePath) {
  return path.relative(process.cwd(), path.resolve(filePath));
}

function contract() {
  return {
    schema: "aaa-stern-gerlach-response-toy-emitter-contract/v1",
    purpose:
      "Minimum explicit local Stern-Gerlach apparatus response input before a diagnostic emitter may produce adapter-ready local_response rows.",
    fail_closed: true,
    accepted_response_sources: [...ACCEPTED_RESPONSE_SOURCES],
    forbidden_sign_sources: [...FORBIDDEN_RESPONSE_SOURCES],
    required_input_fields: [
      "id",
      "source_record_id",
      "party",
      "setting",
      "response_source",
      "apparatus_kernel_id",
      "setting_axis",
      "Z_in_id",
      "record_window_id",
      "G_rec",
      "Q_m or mathcal_Q_m",
      "theta_rec_fraction",
      "residuals.record_window_id",
      "residuals.Delta_rec",
      "residuals.Delta_div",
      "residuals.entropy_locking",
      "residuals.event_ledger",
    ],
    emitted_adapter_fields: [
      "local_response_rows[].sign",
      "local_response_rows[].response_source",
      "local_response_rows[].apparatus_kernel_id",
      "local_response_rows[].setting_axis",
      "local_response_rows[].Z_in_id",
      "local_response_rows[].G_rec",
      "local_response_rows[].Q_m",
      "local_response_rows[].theta_rec_fraction",
      "local_response_rows[].residuals",
    ],
    sign_rule:
      "sign is +1 for positive Q_m/mathcal_Q_m and -1 for negative Q_m/mathcal_Q_m when G_rec=1.",
    failure_codes: FAILURE_CODES,
    non_claim:
      "A passing row is local-response replay input only. It does not claim Bell closure, product-screening survival, or a substrate derivation by itself.",
  };
}

function candidateId(row, fallback) {
  if (!isObject(row)) {
    return fallback;
  }
  for (const key of ["id", "response_id", "row_id"]) {
    if (nonemptyString(row[key])) {
      return row[key];
    }
  }
  return fallback;
}

function pushCandidate(candidates, sourceKind, sourcePath, row, index) {
  candidates.push({
    id: candidateId(row, `${sourceKind}_${index}`),
    source_kind: sourceKind,
    source_path: sourcePath,
    row,
  });
}

function collectCandidates(source) {
  const candidates = [];
  for (const key of ROW_ARRAY_KEYS) {
    if (!Array.isArray(source[key])) {
      continue;
    }
    source[key].forEach((row, index) => {
      pushCandidate(candidates, key.slice(0, -1) || key, `${key}[${index}]`, row, candidates.length);
    });
  }
  if (candidates.length === 0) {
    pushCandidate(candidates, "top_level_object", "$", source, 0);
  }
  return candidates;
}

function firstString(row, keys) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of keys) {
    if (nonemptyString(row[key])) {
      return row[key];
    }
  }
  return null;
}

function sourceRecordId(row) {
  return firstString(row, ["source_record_id", "source_id", "Pi_AB_id", "record_id"]);
}

function responseParty(row) {
  const value = row?.party ?? row?.wing;
  return PARTIES.includes(value) ? value : null;
}

function responseSetting(row) {
  return firstString(row, ["setting", "setting_id"]);
}

function responseSource(row) {
  return firstString(row, [
    "response_source",
    "response_status",
    "certificate_status",
    "derivation_status",
  ]);
}

function apparatusKernelId(row) {
  return firstString(row, ["apparatus_kernel_id", "kernel_id", "stern_gerlach_kernel_id"]);
}

function settingAxis(row) {
  if (!isObject(row)) {
    return null;
  }
  return row.setting_axis ?? row.axis ?? row.measurement_axis ?? null;
}

function axisIsComplete(value) {
  if (finiteVector3(value)) {
    return vectorNorm(value) > EPS;
  }
  if (!isObject(value)) {
    return false;
  }
  if (finiteVector3(value.axis)) {
    return vectorNorm(value.axis) > EPS;
  }
  if (finiteNumber(value.x) && finiteNumber(value.y) && finiteNumber(value.z)) {
    return vectorNorm([value.x, value.y, value.z]) > EPS;
  }
  return false;
}

function normalizeAxis(value) {
  if (finiteVector3(value)) {
    return value;
  }
  if (isObject(value) && finiteVector3(value.axis)) {
    return value.axis;
  }
  if (isObject(value) && finiteNumber(value.x) && finiteNumber(value.y) && finiteNumber(value.z)) {
    return [value.x, value.y, value.z];
  }
  return value ?? null;
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function zInId(row) {
  if (!isObject(row)) {
    return null;
  }
  if (nonemptyString(row.Z_in_id)) {
    return row.Z_in_id;
  }
  if (isObject(row.Z_in) && nonemptyString(row.Z_in.id)) {
    return row.Z_in.id;
  }
  return null;
}

function recordWindowId(row) {
  return firstString(row, ["record_window_id", "local_record_window_id", "window_id"]);
}

function residualWindowId(residuals) {
  return firstString(residuals, ["record_window_id", "local_record_window_id", "window_id"]);
}

function recordGateComplete(row) {
  return row?.G_rec === true || row?.G_rec === 1 || row?.G_rec === "complete";
}

function signedResponseValue(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of [
    "mathcal_Q_m",
    "mathcal_Q",
    "Q_hat_m",
    "Q_m",
    "signed_response_functional",
    "response_functional",
  ]) {
    if (finiteNumber(row[key])) {
      return { key, value: row[key] };
    }
  }
  return null;
}

function responseSign(signedResponse) {
  if (!signedResponse || !finiteNumber(signedResponse.value) || Math.abs(signedResponse.value) <= EPS) {
    return null;
  }
  return signedResponse.value > 0 ? 1 : -1;
}

function recordCyclePhase(row) {
  if (!isObject(row) || !finiteNumber(row.theta_rec_fraction)) {
    return null;
  }
  if (row.theta_rec_fraction < -EPS || row.theta_rec_fraction > 1 + EPS) {
    return null;
  }
  return Math.min(1, Math.max(0, row.theta_rec_fraction));
}

function residualObject(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of ["residuals", "local_record_residuals", "record_residuals"]) {
    if (isObject(row[key])) {
      return row[key];
    }
  }
  return null;
}

function hasForbiddenField(row) {
  return isObject(row) && FORBIDDEN_FIELD_KEYS.some((key) => row[key] !== undefined);
}

function usesForbiddenResponseSource(row) {
  const source = responseSource(row);
  return source !== null && FORBIDDEN_RESPONSE_SOURCES.has(source);
}

function failure(failureCode, requirement, fieldPath, observed = undefined) {
  const entry = {
    failure_code: failureCode,
    requirement,
    path: fieldPath,
  };
  if (observed !== undefined) {
    entry.observed = observed;
  }
  return entry;
}

function failureEntries(candidate) {
  const row = isObject(candidate.row) ? candidate.row : {};
  const failures = [];
  const sourceId = sourceRecordId(row);
  const party = responseParty(row);
  const setting = responseSetting(row);
  const source = responseSource(row);
  const kernelId = apparatusKernelId(row);
  const axis = settingAxis(row);
  const zin = zInId(row);
  const windowId = recordWindowId(row);
  const signedResponse = signedResponseValue(row);
  const theta = recordCyclePhase(row);
  const residuals = residualObject(row);
  const residualWindow = residualWindowId(residuals);

  if (!isObject(candidate.row)) {
    failures.push(
      failure("sg-response-row-missing", "Stern-Gerlach response candidate must be an object", candidate.source_path)
    );
  }
  if (!sourceId) {
    failures.push(failure("source-record-id-missing", "source_record_id is required", "source_record_id"));
  }
  if (!party) {
    failures.push(failure("party-missing", "party must be A or B", "party", row.party ?? row.wing ?? null));
  }
  if (!setting) {
    failures.push(failure("setting-missing", "setting must be a nonempty setting id", "setting"));
  }
  if (!source || !ACCEPTED_RESPONSE_SOURCES.has(source)) {
    failures.push(
      failure(
        "response-source-not-accepted",
        "response_source must identify an accepted local Stern-Gerlach apparatus response source",
        "response_source",
        source
      )
    );
  }
  if (usesForbiddenResponseSource(row) || hasForbiddenField(row)) {
    failures.push(
      failure(
        "forbidden-bell-threshold-source",
        "response signs may not be synthesized from correlation_interval, eta_AB_interval, Bell target tables, or context probability tables",
        "response_source | correlation_interval | eta_AB_interval | Bell target table | probabilities | contexts",
        source
      )
    );
  }
  if (!kernelId) {
    failures.push(
      failure(
        "apparatus-kernel-missing",
        "apparatus_kernel_id must identify the local Stern-Gerlach response kernel",
        "apparatus_kernel_id"
      )
    );
  }
  if (!axisIsComplete(axis)) {
    failures.push(failure("setting-axis-missing", "setting_axis must be a finite nonzero local three-axis", "setting_axis"));
  }
  if (!zin) {
    failures.push(failure("z-in-missing", "Z_in_id must identify the incoming local record", "Z_in_id"));
  }
  if (!windowId) {
    failures.push(failure("record-window-missing", "record_window_id must identify the local record window", "record_window_id"));
  }
  if (!recordGateComplete(row)) {
    failures.push(
      failure("record-gate-missing", "G_rec must mark the local record gate as complete", "G_rec", row.G_rec ?? null)
    );
  }
  if (!signedResponse) {
    failures.push(
      failure(
        "signed-response-functional-missing",
        "Q_m, mathcal_Q_m, or signed_response_functional must be finite and explicit",
        "Q_m | mathcal_Q_m | signed_response_functional"
      )
    );
  } else if (Math.abs(signedResponse.value) <= EPS) {
    failures.push(
      failure(
        "signed-response-separatrix-zero",
        "signed response functional must be nonzero so the row is not on the separatrix",
        signedResponse.key,
        signedResponse.value
      )
    );
  }
  if (theta === null) {
    failures.push(
      failure(
        "record-cycle-phase-missing",
        "theta_rec_fraction must be a finite fraction in [0,1]",
        "theta_rec_fraction",
        row.theta_rec_fraction ?? null
      )
    );
  }
  if (!isObject(residuals)) {
    failures.push(
      failure(
        "local-record-residuals-missing",
        "residuals must contain same-window local record residuals",
        "residuals"
      )
    );
  }
  if (isObject(residuals) && !residualWindow) {
    failures.push(
      failure(
        "residual-window-missing",
        "residuals.record_window_id must identify the same local record window",
        "residuals.record_window_id"
      )
    );
  }
  if (windowId && residualWindow && windowId !== residualWindow) {
    failures.push(
      failure(
        "residual-window-mismatch",
        "residuals must belong to the same local record window as the emitted response",
        "record_window_id | residuals.record_window_id",
        `${windowId} != ${residualWindow}`
      )
    );
  }
  for (const [key, code] of [
    ["Delta_rec", "delta-rec-missing"],
    ["Delta_div", "delta-div-missing"],
    ["entropy_locking", "entropy-locking-missing"],
    ["event_ledger", "event-ledger-missing"],
  ]) {
    if (!isObject(residuals) || !finiteNumber(residuals[key]) || residuals[key] < -EPS) {
      failures.push(
        failure(
          code,
          `${key} must be a finite nonnegative local residual for the same record window`,
          `residuals.${key}`,
          residuals?.[key] ?? null
        )
      );
    }
  }

  return failures;
}

function normalizedRow(candidate) {
  const row = candidate.row;
  const residuals = residualObject(row);
  const signedResponse = signedResponseValue(row);
  return {
    id: candidateId(row, `${sourceRecordId(row)}:${responseParty(row)}:${responseSetting(row)}`),
    source_record_id: sourceRecordId(row),
    party: responseParty(row),
    setting: responseSetting(row),
    sign: responseSign(signedResponse),
    response_source: responseSource(row),
    apparatus_kernel_id: apparatusKernelId(row),
    setting_axis: normalizeAxis(settingAxis(row)),
    Z_in_id: zInId(row),
    G_rec: 1,
    Q_m: signedResponse.value,
    theta_rec_fraction: recordCyclePhase(row),
    residuals: Object.fromEntries(RESIDUAL_KEYS.map((key) => [key, residuals[key]])),
    emitter_provenance: {
      source_path: candidate.source_path,
      signed_response_field: signedResponse.key,
      record_window_id: recordWindowId(row),
      residual_record_window_id: residualWindowId(residuals),
    },
  };
}

function rowKey(row) {
  return `${row.source_record_id}|${row.party}|${row.setting}`;
}

function duplicateFailureMap(readyRows) {
  const byKey = new Map();
  const failures = new Map();
  readyRows.forEach((row, index) => {
    const key = rowKey(row);
    if (!byKey.has(key)) {
      byKey.set(key, []);
    }
    byKey.get(key).push(index);
  });
  for (const [key, indexes] of byKey.entries()) {
    if (indexes.length <= 1) {
      continue;
    }
    for (const index of indexes) {
      failures.set(index, [
        failure(
          "sg-response-duplicate-row",
          "only one Stern-Gerlach response row may be emitted for each source_record_id, party, and setting",
          "source_record_id | party | setting",
          key
        ),
      ]);
    }
  }
  return failures;
}

function countFailureCodes(auditRows) {
  const counts = Object.fromEntries(FAILURE_CODES.map((code) => [code, 0]));
  for (const row of auditRows) {
    for (const entry of row.failures) {
      counts[entry.failure_code] = (counts[entry.failure_code] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).filter(([, count]) => count > 0));
}

function evaluate(source, inputPath) {
  const candidates = collectCandidates(source);
  const preliminary = candidates.map((candidate) => {
    const failures = failureEntries(candidate);
    return {
      candidate,
      failures,
      row: failures.length === 0 ? normalizedRow(candidate) : null,
    };
  });
  const readyPreliminary = preliminary.filter((entry) => entry.row !== null);
  const duplicateFailures = duplicateFailureMap(readyPreliminary.map((entry) => entry.row));
  readyPreliminary.forEach((entry, index) => {
    const failures = duplicateFailures.get(index);
    if (failures) {
      entry.failures.push(...failures);
      entry.row = null;
    }
  });

  const auditRows = preliminary.map((entry) => ({
    id: entry.candidate.id,
    source_kind: entry.candidate.source_kind,
    source_path: entry.candidate.source_path,
    status: entry.failures.length === 0 ? "ready_for_local_response_adapter" : "blocked",
    failures: entry.failures,
    source_fields_seen: {
      source_record_id: sourceRecordId(entry.candidate.row),
      party: responseParty(entry.candidate.row),
      setting: responseSetting(entry.candidate.row),
      response_source: responseSource(entry.candidate.row),
      apparatus_kernel_id: apparatusKernelId(entry.candidate.row),
      has_forbidden_threshold_fields: hasForbiddenField(entry.candidate.row),
      signed_response_field: signedResponseValue(entry.candidate.row)?.key ?? null,
      record_window_id: recordWindowId(entry.candidate.row),
      residual_record_window_id: residualWindowId(residualObject(entry.candidate.row)),
      has_residuals: isObject(residualObject(entry.candidate.row)),
    },
  }));
  const readyRows = preliminary.filter((entry) => entry.failures.length === 0).map((entry) => entry.row);
  const blockedCount = auditRows.filter((row) => row.status === "blocked").length;
  const output = {
    artifact: "stern-gerlach-response-toy-emitter",
    schema: "aaa-stern-gerlach-response-toy-emitter/v1",
    generated_by: "scripts/quantum/stern-gerlach-response-toy-emitter.mjs",
    input_source: inputPath ? relativePath(inputPath) : null,
    status: readyRows.length > 0 ? "local_response_rows_ready" : "blocked_no_complete_stern_gerlach_response_rows",
    classification: readyRows.length > 0 ? "adapter_input_ready" : "fail_closed_blocked",
    contract: contract(),
    audit_rows: auditRows,
    summary: {
      candidate_count: candidates.length,
      ready_count: readyRows.length,
      blocked_count: blockedCount,
      can_run_local_response_adapter: readyRows.length > 0,
      failure_codes: countFailureCodes(auditRows),
    },
    note:
      "Rows are emitted only from explicit local Stern-Gerlach apparatus response data. The emitter does not infer signs from Bell target tables, context probabilities, correlation intervals, or eta_AB intervals.",
  };
  if (readyRows.length > 0) {
    output.local_response_rows = readyRows;
  }
  return output;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const output = args.printContract
    ? contract()
    : evaluate(readJson(path.resolve(args.input)), path.resolve(args.input));
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

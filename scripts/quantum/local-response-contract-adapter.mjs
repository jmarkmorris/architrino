#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.resolve(
  SCRIPT_DIR,
  "fixtures/action-increment-source-contract-blocked.json"
);
const PARTIES = ["A", "B"];
const EPS = 1e-9;
const RESIDUAL_KEYS = ["Delta_rec", "Delta_div", "entropy_locking", "event_ledger"];
const LOCAL_RESPONSE_CONTAINER_KEYS = [
  "local_response",
  "local_responses",
  "local_apparatus_response",
  "local_apparatus_responses",
];
const EXPLICIT_ROW_ARRAY_KEYS = [
  "local_response_rows",
  "local_apparatus_response_rows",
  "local_stern_gerlach_rows",
  "stern_gerlach_response_rows",
  "accepted_local_response_rows",
  "records",
  "rows",
  "candidates",
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
];
const FAILURE_CODES = [
  "local-response-row-missing",
  "source-record-id-missing",
  "party-missing",
  "setting-missing",
  "response-sign-missing",
  "response-source-not-accepted",
  "forbidden-bell-threshold-source",
  "apparatus-kernel-missing",
  "setting-axis-missing",
  "z-in-missing",
  "record-gate-missing",
  "local-return-map-measure-missing",
  "record-cycle-phase-missing",
  "local-record-residuals-missing",
  "delta-rec-missing",
  "delta-div-missing",
  "entropy-locking-missing",
  "event-ledger-missing",
  "local-response-duplicate-row",
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
  console.log(`Usage: node scripts/quantum/local-response-contract-adapter.mjs [options]

Options:
  --input PATH       Read candidate local Stern-Gerlach apparatus response JSON.
                     Defaults to scripts/quantum/fixtures/action-increment-source-contract-blocked.json
  --print-contract  Print the required local-response intake contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

This adapter is fail-closed. It emits replay-ready local_response patches only
when each row already supplies a local one-wing sign, accepted response source,
apparatus kernel, setting axis, incoming record id, completed local record gate,
local return-map measure, record-cycle phase coordinate, and local residuals.
It does not infer signs from correlation intervals, eta_AB intervals, or Bell
target tables.`);
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

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(finiteNumber);
}

function nonemptyString(value) {
  return typeof value === "string" && value.length > 0;
}

function relativePath(filePath) {
  return path.relative(process.cwd(), path.resolve(filePath));
}

function contract() {
  return {
    schema: "aaa-local-response-contract-adapter-contract/v1",
    purpose:
      "Minimum local apparatus response row needed before a retained source row may be replayed through CHSH one-wing response signs.",
    fail_closed: true,
    accepted_response_sources: [...ACCEPTED_RESPONSE_SOURCES],
    forbidden_sign_sources: [...FORBIDDEN_RESPONSE_SOURCES],
    required_row_fields: [
      "id",
      "source_record_id",
      "party",
      "setting",
      "sign",
      "response_source",
      "apparatus_kernel_id",
      "setting_axis",
      "Z_in_id",
      "G_rec",
      "Q_m",
      "theta_rec_fraction",
      "residuals.Delta_rec",
      "residuals.Delta_div",
      "residuals.entropy_locking",
      "residuals.event_ledger",
    ],
    normalized_replay_patch:
      "source_record_patches[].local_response[party][setting] is the only positive output path.",
    failure_codes: FAILURE_CODES,
    non_claim:
      "A passing adapter row is replay input only. It does not claim Bell closure, product-screening survival, or a substrate derivation by itself.",
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

function pushCandidate(candidates, sourceKind, sourcePath, row, index, parent = null) {
  candidates.push({
    id: candidateId(row, `${sourceKind}_${index}`),
    source_kind: sourceKind,
    source_path: sourcePath,
    parent,
    row,
  });
}

function sourceRecordId(row, parent = null) {
  if (isObject(row)) {
    for (const key of ["source_record_id", "source_id", "Pi_AB_id", "record_id"]) {
      if (nonemptyString(row[key])) {
        return row[key];
      }
    }
  }
  if (isObject(parent)) {
    for (const key of ["source_record_id", "source_id", "Pi_AB_id", "record_id", "id"]) {
      if (nonemptyString(parent[key])) {
        return parent[key];
      }
    }
  }
  return null;
}

function responseParty(row, fallback = null) {
  const value = row?.party ?? row?.wing ?? fallback;
  return PARTIES.includes(value) ? value : null;
}

function responseSetting(row, fallback = null) {
  const value = row?.setting ?? row?.setting_id ?? fallback;
  return nonemptyString(value) ? value : null;
}

function parseSign(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of ["sign", "outcome", "value"]) {
    if (row[key] === -1 || row[key] === 1) {
      return { sign: row[key], source_detail: key };
    }
  }
  return null;
}

function responseSource(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of ["response_source", "response_status", "certificate_status", "derivation_status"]) {
    if (nonemptyString(row[key])) {
      return row[key];
    }
  }
  return null;
}

function apparatusKernelId(row) {
  if (!isObject(row)) {
    return null;
  }
  return row.apparatus_kernel_id ?? row.kernel_id ?? row.stern_gerlach_kernel_id ?? null;
}

function settingAxis(row) {
  if (!isObject(row)) {
    return null;
  }
  return row.setting_axis ?? row.axis ?? row.measurement_axis ?? null;
}

function axisIsComplete(value) {
  if (finiteVector3(value)) {
    return true;
  }
  if (!isObject(value)) {
    return false;
  }
  if (finiteVector3(value.axis)) {
    return true;
  }
  return finiteNumber(value.x) && finiteNumber(value.y) && finiteNumber(value.z);
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

function recordGateComplete(row) {
  return row?.G_rec === true || row?.G_rec === 1 || row?.G_rec === "complete";
}

function localReturnMapMeasure(row) {
  if (!isObject(row) || !finiteNumber(row.Q_m) || Math.abs(row.Q_m) <= EPS) {
    return null;
  }
  return row.Q_m;
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

function nestedLocalResponses(parent, sourceKind, sourcePath) {
  const candidates = [];
  if (!isObject(parent)) {
    return candidates;
  }

  for (const containerKey of LOCAL_RESPONSE_CONTAINER_KEYS) {
    const container = parent[containerKey];
    if (!isObject(container)) {
      continue;
    }
    for (const party of PARTIES) {
      if (isObject(container[party])) {
        for (const [setting, response] of Object.entries(container[party])) {
          if (isObject(response)) {
            pushCandidate(
              candidates,
              `${sourceKind}.${containerKey}`,
              `${sourcePath}.${containerKey}.${party}.${setting}`,
              { ...response, party, setting },
              candidates.length,
              parent
            );
          }
        }
      }
    }
    for (const [key, response] of Object.entries(container)) {
      const match = key.match(/^([AB])[:_](.+)$/);
      if (match && isObject(response)) {
        pushCandidate(
          candidates,
          `${sourceKind}.${containerKey}`,
          `${sourcePath}.${containerKey}.${match[1]}_${match[2]}`,
          { ...response, party: match[1], setting: match[2] },
          candidates.length,
          parent
        );
      }
    }
  }

  return candidates;
}

function collectCandidates(source) {
  const candidates = [];

  function collectFromObject(object, sourceKind, sourcePath) {
    if (!isObject(object)) {
      pushCandidate(candidates, sourceKind, sourcePath, object, candidates.length);
      return;
    }

    const nested = nestedLocalResponses(object, sourceKind, sourcePath);
    candidates.push(...nested);
    if (nested.length > 0) {
      return;
    }

    pushCandidate(candidates, sourceKind, sourcePath, object, candidates.length);
  }

  for (const key of EXPLICIT_ROW_ARRAY_KEYS) {
    if (!Array.isArray(source[key])) {
      continue;
    }
    source[key].forEach((row, index) => {
      collectFromObject(row, key.slice(0, -1) || key, `${key}[${index}]`);
    });
  }

  if (Array.isArray(source.source_records)) {
    source.source_records.forEach((row, index) => {
      collectFromObject(row, "source_record", `source_records[${index}]`);
    });
  }

  if (Array.isArray(source.accepted_branch_states)) {
    source.accepted_branch_states.forEach((row, index) => {
      collectFromObject(row, "accepted_branch_state", `accepted_branch_states[${index}]`);
    });
  }

  if (Array.isArray(source.scenarios)) {
    source.scenarios.forEach((scenario, scenarioIndex) => {
      if (Array.isArray(scenario.source_records)) {
        scenario.source_records.forEach((row, rowIndex) => {
          collectFromObject(row, "scenario_source_record", `scenarios[${scenarioIndex}].source_records[${rowIndex}]`);
        });
      }
    });
  }

  if (candidates.length === 0 && isObject(source)) {
    collectFromObject(source, "top_level_object", "$");
  }

  return candidates;
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
  const sourceId = sourceRecordId(row, candidate.parent);
  const party = responseParty(row);
  const setting = responseSetting(row);
  const sign = parseSign(row);
  const source = responseSource(row);
  const kernelId = apparatusKernelId(row);
  const axis = settingAxis(row);
  const zin = zInId(row);
  const q = localReturnMapMeasure(row);
  const theta = recordCyclePhase(row);
  const residuals = residualObject(row);

  if (!isObject(candidate.row)) {
    failures.push(
      failure(
        "local-response-row-missing",
        "local response candidate must be an object",
        candidate.source_path
      )
    );
  }
  if (!sourceId) {
    failures.push(
      failure(
        "source-record-id-missing",
        "source_record_id or a parent source record id is required",
        "source_record_id"
      )
    );
  }
  if (!party) {
    failures.push(
      failure("party-missing", "party must be A or B", "party", row.party ?? row.wing ?? null)
    );
  }
  if (!setting) {
    failures.push(
      failure("setting-missing", "setting must be a nonempty setting id", "setting")
    );
  }
  if (!sign) {
    failures.push(
      failure(
        "response-sign-missing",
        "sign, outcome, or value must already be -1 or +1",
        "sign"
      )
    );
  }
  if (!source || !ACCEPTED_RESPONSE_SOURCES.has(source)) {
    failures.push(
      failure(
        "response-source-not-accepted",
        "response_source must identify an accepted local apparatus response source",
        "response_source",
        source
      )
    );
  }
  if (usesForbiddenResponseSource(row) || (hasForbiddenField(row) && !ACCEPTED_RESPONSE_SOURCES.has(source))) {
    failures.push(
      failure(
        "forbidden-bell-threshold-source",
        "response signs may not be synthesized from correlation_interval, eta_AB_interval, or Bell target tables",
        "response_source | correlation_interval | eta_AB_interval | Bell target table",
        source
      )
    );
  }
  if (!nonemptyString(kernelId)) {
    failures.push(
      failure(
        "apparatus-kernel-missing",
        "apparatus_kernel_id must identify the local Stern-Gerlach response kernel",
        "apparatus_kernel_id",
        kernelId
      )
    );
  }
  if (!axisIsComplete(axis)) {
    failures.push(
      failure(
        "setting-axis-missing",
        "setting_axis must be a finite local three-axis",
        "setting_axis"
      )
    );
  }
  if (!zin) {
    failures.push(
      failure("z-in-missing", "Z_in_id must identify the incoming local record", "Z_in_id")
    );
  }
  if (!recordGateComplete(row)) {
    failures.push(
      failure(
        "record-gate-missing",
        "G_rec must mark the local record gate as complete",
        "G_rec",
        row.G_rec ?? null
      )
    );
  }
  if (q === null) {
    failures.push(
      failure(
        "local-return-map-measure-missing",
        "Q_m must be a finite nonzero local return-map measure",
        "Q_m",
        row.Q_m ?? null
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
        "residuals must contain the local record residuals for the same record window",
        "residuals"
      )
    );
  }
  for (const [key, code] of [
    ["Delta_rec", "delta-rec-missing"],
    ["Delta_div", "delta-div-missing"],
    ["entropy_locking", "entropy-locking-missing"],
    ["event_ledger", "event-ledger-missing"],
  ]) {
    if (!isObject(residuals) || !finiteNumber(residuals[key])) {
      failures.push(
        failure(
          code,
          `${key} must be a finite local residual for the same record window`,
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
  const party = responseParty(row);
  const setting = responseSetting(row);
  return {
    id: candidateId(row, `${sourceRecordId(row, candidate.parent)}:${party}:${setting}`),
    source_record_id: sourceRecordId(row, candidate.parent),
    party,
    setting,
    sign: parseSign(row).sign,
    response_source: responseSource(row),
    apparatus_kernel_id: apparatusKernelId(row),
    setting_axis: normalizeAxis(settingAxis(row)),
    Z_in_id: zInId(row),
    G_rec: 1,
    Q_m: localReturnMapMeasure(row),
    theta_rec_fraction: recordCyclePhase(row),
    residuals: Object.fromEntries(RESIDUAL_KEYS.map((key) => [key, residuals[key]])),
  };
}

function rowKey(row) {
  return `${row.source_record_id}|${row.party}|${row.setting}`;
}

function duplicateFailures(rows) {
  const byKey = new Map();
  const failures = new Map();
  rows.forEach((row, index) => {
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
          "local-response-duplicate-row",
          "only one local response row may be emitted for each source_record_id, party, and setting",
          "source_record_id | party | setting",
          key
        ),
      ]);
    }
  }

  return failures;
}

function responsePatch(row) {
  return {
    sign: row.sign,
    response_source: row.response_source,
    apparatus_kernel_id: row.apparatus_kernel_id,
    setting_axis: row.setting_axis,
    Z_in_id: row.Z_in_id,
    G_rec: row.G_rec,
    Q_m: row.Q_m,
    theta_rec_fraction: row.theta_rec_fraction,
    residuals: row.residuals,
  };
}

function sourceRecordPatches(rows) {
  const patches = new Map();
  for (const row of rows) {
    if (!patches.has(row.source_record_id)) {
      patches.set(row.source_record_id, {
        source_record_id: row.source_record_id,
        local_response: {},
      });
    }
    const patch = patches.get(row.source_record_id);
    patch.local_response[row.party] ??= {};
    patch.local_response[row.party][row.setting] = responsePatch(row);
  }
  return [...patches.values()];
}

function countFailureCodes(rows) {
  const counts = Object.fromEntries(FAILURE_CODES.map((code) => [code, 0]));
  for (const row of rows) {
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
    const ready = failures.length === 0;
    return {
      candidate,
      row: ready ? normalizedRow(candidate) : null,
      failures,
    };
  });
  const duplicateFailureMap = duplicateFailures(
    preliminary.map((entry) => entry.row).filter((row) => row !== null)
  );
  let readyIndex = 0;
  for (const entry of preliminary) {
    if (entry.row === null) {
      continue;
    }
    const duplicateFailuresForRow = duplicateFailureMap.get(readyIndex);
    if (duplicateFailuresForRow) {
      entry.failures.push(...duplicateFailuresForRow);
      entry.row = null;
    }
    readyIndex += 1;
  }

  const rows = preliminary.map((entry) => ({
    id: entry.candidate.id,
    source_kind: entry.candidate.source_kind,
    source_path: entry.candidate.source_path,
    status: entry.failures.length === 0 ? "ready_for_local_response_replay" : "blocked",
    failures: entry.failures,
    source_fields_seen: {
      source_record_id: sourceRecordId(entry.candidate.row, entry.candidate.parent),
      party: responseParty(entry.candidate.row),
      setting: responseSetting(entry.candidate.row),
      response_source: responseSource(entry.candidate.row),
      has_forbidden_threshold_fields: hasForbiddenField(entry.candidate.row),
      has_residuals: isObject(residualObject(entry.candidate.row)),
    },
  }));
  const readyRows = preliminary.filter((entry) => entry.failures.length === 0).map((entry) => entry.row);
  const blockedCount = rows.filter((row) => row.status === "blocked").length;

  const output = {
    artifact: "local-response-contract-adapter",
    schema: "aaa-local-response-contract-adapter/v1",
    generated_by: "scripts/quantum/local-response-contract-adapter.mjs",
    input_source: inputPath ? relativePath(inputPath) : null,
    status: readyRows.length > 0 ? "local_response_rows_ready" : "blocked_no_complete_local_response_rows",
    classification: readyRows.length > 0 ? "replay_input_ready" : "fail_closed_blocked",
    contract: contract(),
    rows,
    summary: {
      candidate_count: candidates.length,
      ready_count: readyRows.length,
      blocked_count: blockedCount,
      can_run_local_response_replay: readyRows.length > 0,
      failure_codes: countFailureCodes(rows),
    },
    note:
      "Blocked rows are expected until a local Stern-Gerlach apparatus artifact supplies one-wing signs, accepted response provenance, local record gates, return-map measures, record-cycle phases, and same-window local residuals. The adapter does not infer signs from Bell target tables or threshold intervals.",
  };

  if (readyRows.length > 0) {
    output.local_response_input = {
      artifact: "declared-local-response-rows",
      status: "adapter_ready_rows",
      local_response_rows: readyRows,
      source_record_patches: sourceRecordPatches(readyRows),
    };
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

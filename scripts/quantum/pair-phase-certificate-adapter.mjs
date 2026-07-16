#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.resolve(
  SCRIPT_DIR,
  "fixtures/action-increment-source-contract-blocked.json"
);
const LAYER_IDS = ["I", "M", "O"];
const ACCEPTED_CERTIFICATE_STATUSES = new Set([
  "accepted_branch_certificate",
  "accepted_pair_phase_certificate",
  "substrate_derived_pair_phase_certificate",
]);
const FAILURE_CODES = [
  "accepted-branch-certificate-missing",
  "pair-source-event-missing",
  "source-weight-missing",
  "daughter-certificate-missing",
  "layer-phase-ledger-missing",
  "angular-momentum-balance-missing",
  "wake-phase-ledger-missing",
  "gauge-probe-missing",
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

  if (args.input === undefined) {
    throw new Error("--input requires a path.");
  }
  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/pair-phase-certificate-adapter.mjs [options]

Options:
  --input PATH       Read a candidate accepted-history or phase-certificate source JSON.
                     Defaults to scripts/quantum/fixtures/action-increment-source-contract-blocked.json
  --print-contract  Print the required pair-phase-certificate intake contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This adapter is fail-closed. It may prepare rows for
pair-phase-certificate-emitter.mjs only when pair-source, daughter, layer-phase,
angular-momentum, wake, and gauge-probe fields are already present. Otherwise it
emits blocked rows with stable failure codes and does not manufacture phase
input.`);
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

function nonemptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

function relativePath(filePath) {
  return path.relative(process.cwd(), path.resolve(filePath));
}

function contract() {
  return {
    schema: "aaa-pair-phase-certificate-adapter-contract/v1",
    purpose:
      "Minimum accepted source needed before an adapter may feed pair-phase-certificate rows into the diagnostic emitter.",
    fail_closed: true,
    accepted_certificate_statuses: [...ACCEPTED_CERTIFICATE_STATUSES],
    required_record_fields: [
      "id",
      "weight",
      "certificate_status",
      "source_event.t0",
      "source_event.t_sep",
      "source_event.X_A",
      "source_event.X_B",
      "daughters.A.layers",
      "daughters.B.layers",
      "daughters.A.wake",
      "daughters.B.wake",
      "cross_wake_phase",
      "cross_wake_status=substrate_derived",
      "theta_rec_A_fraction",
      "theta_rec_B_fraction",
      "gauge_probes",
    ],
    layer_phase_required_fields: [
      "layer",
      "j_balance",
      "phase.phi_t0",
      "phase.omega_integral",
      "phase.root",
      "phase.frame",
    ],
    failure_codes: FAILURE_CODES,
    non_claim:
      "A passing adapter row is emitter input only. It does not claim Bell closure, product-screening survival, or a substrate derivation by itself.",
  };
}

function candidateId(row, fallback) {
  if (!isObject(row)) {
    return fallback;
  }
  if (typeof row.id === "string" && row.id.length > 0) {
    return row.id;
  }
  if (typeof row.row === "number") {
    return `row_${row.row}`;
  }
  if (typeof row.branch_label === "string" && row.branch_label.length > 0) {
    return row.branch_label;
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

function phaseRowsFrom(source) {
  for (const key of ["pair_phase_certificate_rows", "phase_certificate_rows", "records"]) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
  }
  return [];
}

function collectCandidates(source) {
  const candidates = [];

  phaseRowsFrom(source).forEach((row, index) => {
    pushCandidate(candidates, "declared_phase_record", `records[${index}]`, row, index);
  });

  const acceptedBranchStates = Array.isArray(source.accepted_branch_states)
    ? source.accepted_branch_states
    : [];
  acceptedBranchStates.forEach((row, index) => {
    pushCandidate(candidates, "accepted_branch_state", `accepted_branch_states[${index}]`, row, index);
  });

  for (const key of ["rows", "segments", "history_segments", "continuation_segments"]) {
    if (!Array.isArray(source[key])) {
      continue;
    }
    source[key].forEach((row, index) => {
      pushCandidate(candidates, key.slice(0, -1) || key, `${key}[${index}]`, row, index);
    });
  }

  if (Array.isArray(source.candidates)) {
    source.candidates.forEach((row, index) => {
      pushCandidate(candidates, "tier0_candidate", `candidates[${index}]`, row, index);
    });
  }

  if (Array.isArray(source.transitions)) {
    source.transitions.forEach((row, index) => {
      pushCandidate(candidates, "action_increment_transition", `transitions[${index}]`, row, index);
    });
  }

  if (candidates.length === 0 && isObject(source)) {
    pushCandidate(candidates, "top_level_object", "$", source, 0);
  }

  return candidates;
}

function hasAcceptedCertificate(row) {
  return ACCEPTED_CERTIFICATE_STATUSES.has(row.certificate_status);
}

function hasSourceEvent(row) {
  const event = row.source_event;
  return (
    isObject(event) &&
    finiteNumber(event.t0) &&
    finiteNumber(event.t_sep) &&
    finiteVector3(event.X_A) &&
    finiteVector3(event.X_B)
  );
}

function hasWeight(row) {
  return finiteNumber(row.weight) && row.weight > 0;
}

function layerIsComplete(layer) {
  return (
    isObject(layer) &&
    LAYER_IDS.includes(layer.layer) &&
    finiteVector3(layer.j_balance) &&
    isObject(layer.phase) &&
    finiteNumber(layer.phase.phi_t0) &&
    finiteNumber(layer.phase.omega_integral) &&
    finiteNumber(layer.phase.root) &&
    finiteNumber(layer.phase.frame)
  );
}

function daughterIsComplete(daughter) {
  return (
    isObject(daughter) &&
    nonemptyArray(daughter.layers) &&
    daughter.layers.every(layerIsComplete) &&
    isObject(daughter.wake) &&
    finiteVector3(daughter.wake.l_wake) &&
    finiteNumber(daughter.wake.phase)
  );
}

function daughtersExist(row) {
  return isObject(row.daughters) && isObject(row.daughters.A) && isObject(row.daughters.B);
}

function hasLayerPhaseLedgers(row) {
  return (
    daughtersExist(row) &&
    nonemptyArray(row.daughters.A.layers) &&
    nonemptyArray(row.daughters.B.layers) &&
    row.daughters.A.layers.every((layer) => isObject(layer.phase)) &&
    row.daughters.B.layers.every((layer) => isObject(layer.phase))
  );
}

function hasAngularMomentumBalance(row) {
  return (
    daughtersExist(row) &&
    nonemptyArray(row.daughters.A.layers) &&
    nonemptyArray(row.daughters.B.layers) &&
    row.daughters.A.layers.every((layer) => finiteVector3(layer.j_balance)) &&
    row.daughters.B.layers.every((layer) => finiteVector3(layer.j_balance))
  );
}

function hasWakeLedger(row) {
  return (
    daughtersExist(row) &&
    daughterIsComplete(row.daughters.A) &&
    daughterIsComplete(row.daughters.B) &&
    finiteNumber(row.cross_wake_phase) &&
    row.cross_wake_status === "substrate_derived"
  );
}

function hasGaugeProbes(row) {
  return (
    nonemptyArray(row.gauge_probes) &&
    row.gauge_probes.every(
      (probe) => isObject(probe) && finiteNumber(probe.common_phase_offset)
    )
  );
}

function hasRecordPhases(row) {
  return finiteNumber(row.theta_rec_A_fraction) && finiteNumber(row.theta_rec_B_fraction);
}

function failureEntries(inputRow) {
  const row = isObject(inputRow) ? inputRow : {};
  const failures = [];
  if (!hasAcceptedCertificate(row)) {
    failures.push({
      failure_code: "accepted-branch-certificate-missing",
      requirement: "certificate_status must identify an accepted branch-derived pair phase certificate",
      path: "certificate_status",
      observed: row.certificate_status ?? null,
    });
  }
  if (!hasSourceEvent(row)) {
    failures.push({
      failure_code: "pair-source-event-missing",
      requirement:
        "source_event must include finite t0, t_sep, X_A, and X_B from the retained pair source event",
      path: "source_event",
    });
  }
  if (!hasWeight(row)) {
    failures.push({
      failure_code: "source-weight-missing",
      requirement: "weight must be a finite positive source-measure weight",
      path: "weight",
      observed: row.weight ?? null,
    });
  }
  if (!daughtersExist(row)) {
    failures.push({
      failure_code: "daughter-certificate-missing",
      requirement: "daughters.A and daughters.B must both be present",
      path: "daughters",
    });
  }
  if (!hasLayerPhaseLedgers(row)) {
    failures.push({
      failure_code: "layer-phase-ledger-missing",
      requirement:
        "each daughter must include I/M/O layer phase ledgers with phi_t0, omega_integral, root, and frame terms",
      path: "daughters.*.layers.*.phase",
    });
  }
  if (!hasAngularMomentumBalance(row)) {
    failures.push({
      failure_code: "angular-momentum-balance-missing",
      requirement: "each layer must include a finite j_balance vector",
      path: "daughters.*.layers.*.j_balance",
    });
  }
  if (!hasWakeLedger(row)) {
    failures.push({
      failure_code: "wake-phase-ledger-missing",
      requirement:
        "both daughter wake ledgers, cross_wake_phase, and cross_wake_status=substrate_derived are required",
      path: "daughters.*.wake | cross_wake_phase | cross_wake_status",
      observed: row.cross_wake_status ?? null,
    });
  }
  if (!hasGaugeProbes(row) || !hasRecordPhases(row)) {
    failures.push({
      failure_code: "gauge-probe-missing",
      requirement:
        "gauge_probes and local record-cycle phase fractions are required before quotient invariance can be audited",
      path: "gauge_probes | theta_rec_A_fraction | theta_rec_B_fraction",
    });
  }
  return failures;
}

function normalizeReadyRecords(records) {
  const total = records.reduce((sum, row) => sum + row.weight, 0);
  if (total === 0) {
    return records;
  }
  return records.map((row) => ({ ...row, weight: row.weight / total }));
}

function countFailureCodes(rows) {
  const counts = Object.fromEntries(FAILURE_CODES.map((code) => [code, 0]));
  for (const row of rows) {
    for (const failure of row.failures) {
      counts[failure.failure_code] = (counts[failure.failure_code] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).filter(([, count]) => count > 0));
}

function evaluate(source, inputPath) {
  const candidates = collectCandidates(source);
  const rows = candidates.map((candidate) => {
    const row = isObject(candidate.row) ? candidate.row : {};
    const failures = failureEntries(row);
    return {
      id: candidate.id,
      source_kind: candidate.source_kind,
      source_path: candidate.source_path,
      status: failures.length === 0 ? "ready_for_phase_emitter" : "blocked",
      failures,
      source_fields_seen: {
        certificate_status: row.certificate_status ?? row.status ?? null,
        has_source_event: isObject(row.source_event),
        has_daughters: isObject(row.daughters),
        has_samples: Array.isArray(row.samples),
        has_active_causal_root_ledger: Array.isArray(row.active_causal_root_ledger),
        has_transitions: Array.isArray(row.transitions),
      },
    };
  });
  const readyRecords = candidates
    .filter((candidate, index) => rows[index].status === "ready_for_phase_emitter" && isObject(candidate.row))
    .map((candidate) => candidate.row);
  const normalizedReadyRecords = normalizeReadyRecords(readyRecords);
  const blockedCount = rows.filter((row) => row.status === "blocked").length;

  const output = {
    artifact: "pair-phase-certificate-adapter",
    schema: "aaa-pair-phase-certificate-adapter/v1",
    generated_by: "scripts/quantum/pair-phase-certificate-adapter.mjs",
    input_source: inputPath ? relativePath(inputPath) : null,
    status: normalizedReadyRecords.length > 0 ? "phase_rows_ready" : "blocked_no_complete_pair_phase_rows",
    classification: normalizedReadyRecords.length > 0 ? "emitter_input_ready" : "fail_closed_blocked",
    contract: contract(),
    rows,
    summary: {
      candidate_count: candidates.length,
      ready_count: normalizedReadyRecords.length,
      blocked_count: blockedCount,
      can_run_emitter: normalizedReadyRecords.length > 0,
      failure_codes: countFailureCodes(rows),
    },
    note:
      "Blocked rows are expected until an accepted branch certificate supplies pair-source, daughter, wake, layer-phase, angular-momentum, and quotient-audit fields. The adapter does not infer missing phase data from accepted-history samples.",
  };

  if (normalizedReadyRecords.length > 0) {
    output.phase_input = {
      artifact: "declared-pair-phase-certificate-rows",
      status: "adapter_ready_rows",
      records: normalizedReadyRecords,
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

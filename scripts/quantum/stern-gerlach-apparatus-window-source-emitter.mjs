#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.resolve(
  SCRIPT_DIR,
  "fixtures/action-increment-source-contract-blocked.json"
);
const EPS = 1e-9;
const PARTIES = ["A", "B"];
const LAYERS = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const BODY_IDS = LAYERS.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const RESIDUAL_KEYS = ["Delta_rec", "Delta_div", "entropy_locking", "event_ledger"];
const ROW_ARRAY_KEYS = [
  "stern_gerlach_apparatus_window_sources",
  "apparatus_window_sources",
  "local_apparatus_window_sources",
  "stern_gerlach_apparatus_sources",
  "accepted_history_segments",
  "history_segments",
  "records",
  "rows",
];
const ACCEPTED_HISTORY_STATUS = "accepted_history_segment";
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
  "source-row-missing",
  "accepted-history-segment-missing",
  "accepted-history-status-missing",
  "sample-ledger-missing",
  "all-required-body-states-missing",
  "active-root-ledger-missing",
  "active-root-ledger-invalid",
  "source-record-id-missing",
  "party-missing",
  "setting-missing",
  "response-source-forbidden",
  "forbidden-bell-threshold-source",
  "apparatus-kernel-missing",
  "setting-axis-missing",
  "z-in-missing",
  "record-window-missing",
  "sigma-m-in-missing",
  "lambda-m-in-out-missing",
  "response-samples-missing",
  "response-sample-invalid",
  "response-sample-time-order-invalid",
  "jdot-app-source-missing",
  "jdot-app-torque-term-invalid",
  "record-gate-fields-missing",
  "record-gate-not-complete",
  "record-cycle-phase-missing",
  "local-record-residuals-missing",
  "residual-window-missing",
  "residual-window-mismatch",
  "delta-rec-missing",
  "delta-div-missing",
  "entropy-locking-missing",
  "event-ledger-missing",
  "apparatus-window-duplicate-row",
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
  console.log(`Usage: node scripts/quantum/stern-gerlach-apparatus-window-source-emitter.mjs [options]

Options:
  --input PATH       Read explicit Stern-Gerlach apparatus-window source JSON.
                     Defaults to scripts/quantum/fixtures/action-increment-source-contract-blocked.json
  --print-contract  Print the explicit apparatus-window source contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

This emitter is fail-closed. It emits apparatus_response_windows only when the
input supplies accepted-history provenance, local apparatus target metadata,
an explicit response functional source, a complete local record gate, a
record-cycle phase, and same-window record residuals. It does not infer signs
from Bell target tables, correlation intervals, eta_AB intervals, or context
probability tables.`);
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
    schema: "aaa-stern-gerlach-apparatus-window-source-emitter-contract/v1",
    purpose:
      "Emit extractor-ready apparatus_response_windows from explicit accepted-history and local apparatus-window source data.",
    fail_closed: true,
    input_rows: ROW_ARRAY_KEYS,
    emitted_row_container: "apparatus_response_windows",
    required_source_fields: [
      "accepted_history_segment.status=accepted_history_segment",
      "accepted_history_segment.samples[*].t",
      "accepted_history_segment.samples[*].bodies.{I+,I-,M+,M-,O+,O-}.{position,velocity}",
      "accepted_history_segment.active_causal_root_ledger[*].{source,receiver,relation,delay,J,status}",
      "source_record_id",
      "party",
      "setting",
      "apparatus_kernel_id",
      "setting_axis",
      "Z_in_id",
      "record_window_id",
      "response_functional_source.Sigma_m_in",
      "response_functional_source.Lambda_m_in_out",
      "response_functional_source.integrand_samples[*].t",
      "response_functional_source.integrand_samples[*].Lambda_m_to_out",
      "response_functional_source.integrand_samples[*].N_m",
      "response_functional_source.integrand_samples[*].Jdot_app or torque terms",
      "record_gate.{R_pre,R_rec,R_star,T_rec,tau_persist}",
      "record_cycle.theta_rec_fraction or explicit theta_rec/theta_rec_period",
      "residuals.{record_window_id,Delta_rec,Delta_div,entropy_locking,event_ledger}",
    ],
    computation: {
      Jdot_app:
        "Either carry explicit Jdot_app samples or compute mu_arch sum_i (x_i-X_C) x a_i_app plus wake_Ldot.",
      record_gate: "G_rec = H(|R_rec - R_pre| - R_star) H(tau_persist - T_rec), H(0)=0.",
    },
    forbidden_sign_sources: [...FORBIDDEN_RESPONSE_SOURCES],
    failure_codes: FAILURE_CODES,
    non_claim:
      "A passing row is apparatus-window extractor input only. It does not claim Bell closure, product-screening survival, or a completed source-measure derivation by itself.",
  };
}

function firstObject(row, keys) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of keys) {
    if (isObject(row[key])) {
      return row[key];
    }
  }
  return null;
}

function objectChain(row, keys) {
  const objects = [row];
  for (const key of keys) {
    if (isObject(row?.[key])) {
      objects.push(row[key]);
    }
  }
  return objects.filter(isObject);
}

function firstString(objects, keys) {
  for (const object of objects) {
    for (const key of keys) {
      if (nonemptyString(object?.[key])) {
        return object[key];
      }
    }
  }
  return null;
}

function firstFiniteNumber(objects, keys) {
  for (const object of objects) {
    for (const key of keys) {
      if (finiteNumber(object?.[key])) {
        return object[key];
      }
    }
  }
  return null;
}

function vectorFrom(value) {
  if (finiteVector3(value)) {
    return value;
  }
  if (isObject(value) && finiteVector3(value.vector)) {
    return value.vector;
  }
  if (isObject(value) && finiteVector3(value.value)) {
    return value.value;
  }
  if (isObject(value) && finiteNumber(value.x) && finiteNumber(value.y) && finiteNumber(value.z)) {
    return [value.x, value.y, value.z];
  }
  return null;
}

function firstVector(objects, keys) {
  for (const object of objects) {
    for (const key of keys) {
      const vector = vectorFrom(object?.[key]);
      if (vector) {
        return vector;
      }
    }
  }
  return null;
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(vector, scalar) {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function vectorNorm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function cleanNumber(value) {
  if (!finiteNumber(value)) {
    return value;
  }
  if (Object.is(value, -0)) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function cleanVector(vector) {
  return vector.map(cleanNumber);
}

function acceptedHistoryObject(row) {
  const nested = firstObject(row, [
    "accepted_history_segment",
    "accepted_history",
    "history_segment",
    "history_source",
  ]);
  if (nested) {
    return nested;
  }
  if (row?.status === ACCEPTED_HISTORY_STATUS || Array.isArray(row?.samples)) {
    return row;
  }
  return null;
}

function sampleBodyState(sample, bodyId) {
  const bodies = sample?.bodies ?? sample?.state ?? sample?.states ?? null;
  if (!bodies) {
    return null;
  }
  if (Array.isArray(bodies)) {
    return bodies.find((body) => body.id === bodyId) ?? null;
  }
  return bodies[bodyId] ?? null;
}

function canonicalSamples(history) {
  const samples = Array.isArray(history?.samples) ? history.samples : Array.isArray(history?.history) ? history.history : [];
  return samples
    .map((sample) => ({
      ...sample,
      t: finiteNumber(sample.t) ? sample.t : sample.time,
    }))
    .filter((sample) => finiteNumber(sample.t))
    .sort((left, right) => left.t - right.t);
}

function sampleHasAllBodies(sample) {
  return BODY_IDS.every((bodyId) => {
    const state = sampleBodyState(sample, bodyId);
    return isObject(state) && finiteVector3(state.position) && finiteVector3(state.velocity);
  });
}

function rootLedger(history) {
  const roots =
    history?.active_causal_root_ledger ??
    history?.active_roots ??
    history?.root_ledger?.active_roots ??
    history?.root_ledger?.roots ??
    [];
  return Array.isArray(roots) ? roots : [];
}

function rootIsValid(root) {
  return (
    BODY_IDS.includes(root?.source) &&
    BODY_IDS.includes(root?.receiver) &&
    ROOT_RELATIONS.includes(root?.relation) &&
    root?.status === "active" &&
    finiteNumber(root?.delay) &&
    root.delay >= 0 &&
    finiteNumber(root?.J)
  );
}

function acceptedHistoryDiagnostics(history) {
  const samples = canonicalSamples(history);
  const roots = rootLedger(history);
  const invalidRoots = roots.filter((root) => !rootIsValid(root));
  const missingBodySamples = samples.filter((sample) => !sampleHasAllBodies(sample));
  const failures = [];
  if (!isObject(history)) {
    failures.push("accepted-history-segment-missing");
  } else if (history.status !== ACCEPTED_HISTORY_STATUS) {
    failures.push("accepted-history-status-missing");
  }
  if (samples.length < 2) {
    failures.push("sample-ledger-missing");
  }
  if (samples.length > 0 && missingBodySamples.length > 0) {
    failures.push("all-required-body-states-missing");
  }
  if (roots.length === 0) {
    failures.push("active-root-ledger-missing");
  }
  if (invalidRoots.length > 0) {
    failures.push("active-root-ledger-invalid");
  }
  return {
    status: failures.length === 0 ? "accepted_history_source_ready" : "blocked",
    failures,
    sample_count: samples.length,
    active_root_count: roots.length,
    invalid_root_count: invalidRoots.length,
    missing_body_sample_count: missingBodySamples.length,
    history_id: history?.id ?? history?.row_id ?? (Number.isInteger(history?.row) ? `row_${history.row}` : null),
    period: history?.period ?? null,
  };
}

function targetObjects(row) {
  return objectChain(row, [
    "apparatus_target",
    "local_apparatus_target",
    "target",
    "apparatus",
    "local_apparatus",
  ]);
}

function sourceRecordId(row, history) {
  return (
    firstString(targetObjects(row), ["source_record_id", "source_id", "Pi_AB_id", "record_id"]) ??
    history?.id ??
    history?.row_id ??
    (Number.isInteger(history?.row) ? `row_${history.row}` : null)
  );
}

function responseParty(row) {
  const value = firstString(targetObjects(row), ["party", "wing"]);
  return PARTIES.includes(value) ? value : null;
}

function responseSetting(row) {
  return firstString(targetObjects(row), ["setting", "setting_id"]);
}

function responseSource(row) {
  return firstString(targetObjects(row), [
    "response_source",
    "response_status",
    "certificate_status",
    "derivation_status",
  ]);
}

function outputResponseSource(row) {
  const source = responseSource(row);
  return source && ACCEPTED_RESPONSE_SOURCES.has(source) ? source : "accepted_stern_gerlach_response";
}

function apparatusKernelId(row) {
  return firstString(targetObjects(row), ["apparatus_kernel_id", "kernel_id", "stern_gerlach_kernel_id"]);
}

function settingAxis(row) {
  return firstVector(targetObjects(row), ["setting_axis", "axis", "measurement_axis"]);
}

function zInId(row) {
  const direct = firstString(targetObjects(row), ["Z_in_id", "z_in_id"]);
  if (direct) {
    return direct;
  }
  for (const object of targetObjects(row)) {
    if (isObject(object.Z_in) && nonemptyString(object.Z_in.id)) {
      return object.Z_in.id;
    }
  }
  return null;
}

function recordWindowId(row) {
  return firstString(targetObjects(row), ["record_window_id", "local_record_window_id", "window_id"]);
}

function responseFunctionalObject(row) {
  return (
    firstObject(row, [
      "response_functional_source",
      "response_functional",
      "apparatus_response_functional",
      "signed_response_functional_input",
      "apparatus_window_response",
    ]) ?? row
  );
}

function sigmaMIn(functional) {
  return firstFiniteNumber([functional], [
    "Sigma_m_in",
    "Sigma_hat_m_in",
    "Sigma_in",
    "separatrix_value_in",
  ]);
}

function lambdaMInOut(functional) {
  const direct = firstFiniteNumber([functional], [
    "Lambda_m_in_out",
    "Lambda_hat_m_in_out",
    "Lambda_in_out",
    "lambda_m_in_out",
  ]);
  if (direct !== null) {
    return direct;
  }
  for (const key of ["Lambda_m", "Lambda_hat_m", "lambda_m", "lambda_hat_m"]) {
    if (finiteNumber(functional?.[key])) {
      return functional[key];
    }
    if (isObject(functional?.[key])) {
      const nested = firstFiniteNumber([functional[key]], ["in_out", "t_in_to_t_out", "tin_to_tout", "value"]);
      if (nested !== null) {
        return nested;
      }
    }
  }
  return null;
}

function responseSamples(functional) {
  for (const key of [
    "integrand_samples",
    "response_integrand_samples",
    "apparatus_impulse_samples",
    "Jdot_app_samples",
    "samples",
  ]) {
    if (Array.isArray(functional?.[key])) {
      return functional[key];
    }
  }
  return [];
}

function sampleLambdaToOut(sample) {
  const direct = firstFiniteNumber([sample], [
    "Lambda_m_to_out",
    "Lambda_hat_m_to_out",
    "Lambda_to_out",
    "lambda_integral_to_out",
  ]);
  if (direct !== null) {
    return direct;
  }
  for (const key of ["Lambda_m", "Lambda_hat_m", "lambda_m", "lambda_hat_m"]) {
    if (finiteNumber(sample?.[key])) {
      return sample[key];
    }
    if (isObject(sample?.[key])) {
      const nested = firstFiniteNumber([sample[key]], ["to_out", "s_to_t_out", "value"]);
      if (nested !== null) {
        return nested;
      }
    }
  }
  return null;
}

function sampleNormal(sample) {
  return firstVector([sample], [
    "N_m",
    "mathcal_N_m",
    "N_hat_m",
    "separatrix_normal",
    "normal",
  ]);
}

function explicitJdot(sample) {
  return firstVector([sample], [
    "Jdot_app",
    "J_dot_app",
    "dot_J_app",
    "Jdot_C_app",
    "dot_J_C_app",
    "apparatus_angular_impulse_rate",
  ]);
}

function torqueTerms(sample) {
  for (const key of ["core_torque_terms", "torque_terms", "app_acceleration_terms", "apparatus_torque_terms"]) {
    if (Array.isArray(sample?.[key])) {
      return sample[key];
    }
  }
  return [];
}

function wakeLdot(sample) {
  return firstVector([sample], [
    "wake_Ldot",
    "Ldot_wake",
    "dot_L_wake",
    "dot_L_wake_C_A",
    "wake_angular_momentum_rate",
  ]) ?? [0, 0, 0];
}

function torqueTermVectors(term) {
  return {
    position: firstVector([term], ["x_i", "position", "x", "core_position"]),
    acceleration: firstVector([term], ["a_app", "a_i_app", "app_acceleration", "acceleration"]),
  };
}

function computedJdot(sample, functional) {
  const explicit = explicitJdot(sample);
  if (explicit) {
    return {
      status: "computed",
      failures: [],
      Jdot_app: explicit,
      source_kind: "explicit_Jdot_app",
      torque_term_count: 0,
    };
  }
  const center = firstVector([sample, functional], ["X_C", "core_center", "center", "C_center"]);
  const terms = torqueTerms(sample);
  const muArch = firstFiniteNumber([sample, functional], ["mu_arch", "mu", "architrino_mass"]);
  if (!center || !finiteNumber(muArch) || terms.length === 0) {
    return {
      status: "blocked",
      failures: ["jdot-app-source-missing"],
      Jdot_app: null,
      source_kind: null,
      torque_term_count: terms.length,
    };
  }
  let sum = [0, 0, 0];
  let invalidCount = 0;
  for (const term of terms) {
    const vectors = torqueTermVectors(term);
    if (!vectors.position || !vectors.acceleration) {
      invalidCount += 1;
      continue;
    }
    sum = add(sum, cross(sub(vectors.position, center), vectors.acceleration));
  }
  if (invalidCount > 0) {
    return {
      status: "blocked",
      failures: ["jdot-app-torque-term-invalid"],
      Jdot_app: null,
      source_kind: "computed_from_torque_terms",
      torque_term_count: terms.length,
    };
  }
  return {
    status: "computed",
    failures: [],
    Jdot_app: add(scale(sum, muArch), wakeLdot(sample)),
    source_kind: "computed_from_torque_terms",
    torque_term_count: terms.length,
  };
}

function responseFunctionalDiagnostics(row) {
  const functional = responseFunctionalObject(row);
  const sigma = sigmaMIn(functional);
  const lambdaInOut = lambdaMInOut(functional);
  const samples = responseSamples(functional);
  const failures = [];
  if (!finiteNumber(sigma)) {
    failures.push("sigma-m-in-missing");
  }
  if (!finiteNumber(lambdaInOut)) {
    failures.push("lambda-m-in-out-missing");
  }
  if (samples.length < 2) {
    failures.push("response-samples-missing");
  }
  const parsedSamples = samples.map((sample, index) => {
    const t = finiteNumber(sample?.t) ? sample.t : sample?.time;
    const lambdaToOut = sampleLambdaToOut(sample);
    const normal = sampleNormal(sample);
    const jdot = computedJdot(sample, functional);
    const sampleFailures = [];
    if (!isObject(sample) || !finiteNumber(t) || !finiteNumber(lambdaToOut) || !normal) {
      sampleFailures.push("response-sample-invalid");
    }
    sampleFailures.push(...jdot.failures);
    return {
      index,
      t,
      Lambda_m_to_out: lambdaToOut,
      N_m: normal,
      Jdot_app: jdot.Jdot_app,
      Jdot_app_source: jdot.source_kind,
      torque_term_count: jdot.torque_term_count,
      failures: sampleFailures,
    };
  });
  if (parsedSamples.some((sample) => sample.failures.includes("response-sample-invalid"))) {
    failures.push("response-sample-invalid");
  }
  if (parsedSamples.some((sample) => sample.failures.includes("jdot-app-source-missing"))) {
    failures.push("jdot-app-source-missing");
  }
  if (parsedSamples.some((sample) => sample.failures.includes("jdot-app-torque-term-invalid"))) {
    failures.push("jdot-app-torque-term-invalid");
  }
  const ordered = [...parsedSamples].sort((left, right) => left.t - right.t);
  for (let i = 1; i < ordered.length; i += 1) {
    if (!finiteNumber(ordered[i].t) || ordered[i].t <= ordered[i - 1].t) {
      failures.push("response-sample-time-order-invalid");
      break;
    }
  }
  return {
    status: failures.length === 0 ? "response_functional_source_ready" : "blocked",
    failures: [...new Set(failures)],
    Sigma_m_in: finiteNumber(sigma) ? cleanNumber(sigma) : null,
    Lambda_m_in_out: finiteNumber(lambdaInOut) ? cleanNumber(lambdaInOut) : null,
    sample_count: samples.length,
    integrand_samples: failures.length === 0
      ? ordered.map((sample) => ({
          t: cleanNumber(sample.t),
          Lambda_m_to_out: cleanNumber(sample.Lambda_m_to_out),
          N_m: cleanVector(sample.N_m),
          Jdot_app: cleanVector(sample.Jdot_app),
          source_kind: sample.Jdot_app_source,
          torque_term_count: sample.torque_term_count,
        }))
      : [],
  };
}

function recordGateObject(row) {
  return firstObject(row, ["record_gate", "G_rec_input", "recordGate"]) ?? row;
}

function recordValue(object, keys) {
  for (const key of keys) {
    if (finiteNumber(object?.[key])) {
      return object[key];
    }
    const vector = vectorFrom(object?.[key]);
    if (vector) {
      return vector;
    }
  }
  return null;
}

function recordDistance(a, b) {
  if (finiteNumber(a) && finiteNumber(b)) {
    return Math.abs(a - b);
  }
  if (finiteVector3(a) && finiteVector3(b)) {
    return vectorNorm(sub(a, b));
  }
  return null;
}

function heaviside(value) {
  return finiteNumber(value) && value > 0 ? 1 : 0;
}

function recordGateDiagnostics(row) {
  const gate = recordGateObject(row);
  const rPre = recordValue(gate, ["R_pre", "R_A_pre", "record_pre"]);
  const rRec = recordValue(gate, ["R_rec", "R_A_rec", "record_rec"]);
  const rStar = firstFiniteNumber([gate], ["R_star", "R_*", "record_threshold"]);
  const tRec = firstFiniteNumber([gate], ["T_rec", "record_time", "persistence_time"]);
  const tauPersist = firstFiniteNumber([gate], ["tau_persist", "tau_rec_persist", "persistence_bound"]);
  const deltaR = recordDistance(rRec, rPre);
  const fieldsComplete =
    finiteNumber(deltaR) &&
    finiteNumber(rStar) &&
    rStar >= 0 &&
    finiteNumber(tRec) &&
    finiteNumber(tauPersist);
  if (!fieldsComplete) {
    return {
      status: "blocked",
      failures: ["record-gate-fields-missing"],
      G_rec: null,
      Delta_R: finiteNumber(deltaR) ? cleanNumber(deltaR) : null,
    };
  }
  const amplitudeGate = heaviside(deltaR - rStar);
  const persistenceGate = heaviside(tauPersist - tRec);
  const gRec = amplitudeGate * persistenceGate;
  return {
    status: gRec === 1 ? "record_gate_complete" : "blocked",
    failures: gRec === 1 ? [] : ["record-gate-not-complete"],
    G_rec: gRec,
    R_pre: rPre,
    R_rec: rRec,
    R_star: cleanNumber(rStar),
    T_rec: cleanNumber(tRec),
    tau_persist: cleanNumber(tauPersist),
    Delta_R: cleanNumber(deltaR),
    amplitude_gate: amplitudeGate,
    persistence_gate: persistenceGate,
  };
}

function recordCycleObject(row) {
  return firstObject(row, ["record_cycle", "recordCycle", "theta_rec"]) ?? row;
}

function normalizedModulo(value, period) {
  const raw = ((value % period) + period) % period;
  return raw / period;
}

function recordCyclePhase(row) {
  const cycle = recordCycleObject(row);
  const direct = firstFiniteNumber([row, cycle], ["theta_rec_fraction", "record_cycle_phase_fraction"]);
  if (direct !== null) {
    return direct >= -EPS && direct <= 1 + EPS ? Math.min(1, Math.max(0, direct)) : null;
  }
  const theta = firstFiniteNumber([cycle], ["theta_rec", "theta", "phase"]);
  const period = firstFiniteNumber([cycle], ["theta_rec_period", "phase_period"]);
  if (finiteNumber(theta) && finiteNumber(period) && period > 0) {
    return normalizedModulo(theta, period);
  }
  const tRec = firstFiniteNumber([cycle], ["t_rec", "record_time"]);
  const cycleStart = firstFiniteNumber([cycle], ["cycle_start", "t_cycle_start"]);
  const tPeriod = firstFiniteNumber([cycle], ["T_rec", "cycle_period"]);
  if (finiteNumber(tRec) && finiteNumber(cycleStart) && finiteNumber(tPeriod) && tPeriod > 0) {
    return normalizedModulo(tRec - cycleStart, tPeriod);
  }
  return null;
}

function residualObject(row) {
  return firstObject(row, ["residuals", "local_record_residuals", "record_residuals"]);
}

function residualWindowId(residuals) {
  return firstString([residuals], ["record_window_id", "local_record_window_id", "window_id"]);
}

function residualFailures(row) {
  const failures = [];
  const windowId = recordWindowId(row);
  const residuals = residualObject(row);
  const residualWindow = residualWindowId(residuals);
  if (!isObject(residuals)) {
    failures.push("local-record-residuals-missing");
    return failures;
  }
  if (!residualWindow) {
    failures.push("residual-window-missing");
  }
  if (windowId && residualWindow && windowId !== residualWindow) {
    failures.push("residual-window-mismatch");
  }
  for (const [key, code] of [
    ["Delta_rec", "delta-rec-missing"],
    ["Delta_div", "delta-div-missing"],
    ["entropy_locking", "entropy-locking-missing"],
    ["event_ledger", "event-ledger-missing"],
  ]) {
    if (!finiteNumber(residuals[key]) || residuals[key] < -EPS) {
      failures.push(code);
    }
  }
  return failures;
}

function hasForbiddenKey(value, pathParts = []) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i += 1) {
      const found = hasForbiddenKey(value[i], [...pathParts, String(i)]);
      if (found) {
        return found;
      }
    }
    return null;
  }
  if (!isObject(value)) {
    return null;
  }
  for (const [key, nested] of Object.entries(value)) {
    if (FORBIDDEN_FIELD_KEYS.includes(key)) {
      return [...pathParts, key].join(".");
    }
    const found = hasForbiddenKey(nested, [...pathParts, key]);
    if (found) {
      return found;
    }
  }
  return null;
}

function usesForbiddenResponseSource(row) {
  const source = responseSource(row);
  return source !== null && FORBIDDEN_RESPONSE_SOURCES.has(source);
}

function baseFieldFailures(row, history) {
  const failures = [];
  const sourceId = sourceRecordId(row, history);
  const party = responseParty(row);
  const setting = responseSetting(row);
  const source = responseSource(row);
  const kernel = apparatusKernelId(row);
  const axis = settingAxis(row);
  const zin = zInId(row);
  const windowId = recordWindowId(row);
  const forbiddenKey = hasForbiddenKey(row);
  if (!isObject(row)) {
    failures.push("source-row-missing");
  }
  if (!sourceId) {
    failures.push("source-record-id-missing");
  }
  if (!party) {
    failures.push("party-missing");
  }
  if (!setting) {
    failures.push("setting-missing");
  }
  if (source && !ACCEPTED_RESPONSE_SOURCES.has(source)) {
    failures.push("response-source-forbidden");
  }
  if (usesForbiddenResponseSource(row) || forbiddenKey) {
    failures.push("forbidden-bell-threshold-source");
  }
  if (!kernel) {
    failures.push("apparatus-kernel-missing");
  }
  if (!axis || vectorNorm(axis) <= EPS) {
    failures.push("setting-axis-missing");
  }
  if (!zin) {
    failures.push("z-in-missing");
  }
  if (!windowId) {
    failures.push("record-window-missing");
  }
  return [...new Set(failures)];
}

function failureEntry(code, pathName, observed = undefined) {
  const requirements = {
    "source-row-missing": "source candidate must be an object",
    "accepted-history-segment-missing": "accepted_history_segment must be supplied or the row itself must be an accepted history segment",
    "accepted-history-status-missing": "accepted history source must have status accepted_history_segment",
    "sample-ledger-missing": "accepted history source must include at least two ordered samples",
    "all-required-body-states-missing": "accepted history samples must include finite body states for I+/I-/M+/M-/O+/O-",
    "active-root-ledger-missing": "accepted history source must include active_causal_root_ledger",
    "active-root-ledger-invalid": "active causal-root entries must use valid labels, relation, delay, J, and active status",
    "source-record-id-missing": "source_record_id is required",
    "party-missing": "party must be A or B",
    "setting-missing": "setting must be a nonempty setting id",
    "response-source-forbidden": "response_source must be absent or identify an accepted local Stern-Gerlach apparatus response source",
    "forbidden-bell-threshold-source": "response signs may not be synthesized from Bell target tables, threshold intervals, or context probability tables",
    "apparatus-kernel-missing": "apparatus_kernel_id must identify the local Stern-Gerlach response kernel",
    "setting-axis-missing": "setting_axis must be a finite nonzero local three-axis",
    "z-in-missing": "Z_in_id must identify the incoming local record",
    "record-window-missing": "record_window_id must identify the local record window",
    "sigma-m-in-missing": "response functional source must supply Sigma_m_in",
    "lambda-m-in-out-missing": "response functional source must supply Lambda_m_in_out",
    "response-samples-missing": "response functional source must supply at least two integrand samples",
    "response-sample-invalid": "each response sample must supply t, Lambda_m_to_out, and N_m",
    "response-sample-time-order-invalid": "response sample times must be strictly increasing",
    "jdot-app-source-missing": "each response sample must supply Jdot_app or computable apparatus torque terms",
    "jdot-app-torque-term-invalid": "apparatus torque terms must include finite x_i and a_i_app vectors",
    "record-gate-fields-missing": "record_gate must supply R_pre, R_rec, R_star, T_rec, and tau_persist",
    "record-gate-not-complete": "computed G_rec must be 1 using H(0)=0",
    "record-cycle-phase-missing": "record_cycle must supply theta_rec_fraction or explicit cycle data",
    "local-record-residuals-missing": "residuals must contain same-window local record residuals",
    "residual-window-missing": "residuals.record_window_id must identify the same local record window",
    "residual-window-mismatch": "residuals must belong to the same local record window as the emitted response",
    "delta-rec-missing": "Delta_rec must be finite and nonnegative",
    "delta-div-missing": "Delta_div must be finite and nonnegative",
    "entropy-locking-missing": "entropy_locking must be finite and nonnegative",
    "event-ledger-missing": "event_ledger must be finite and nonnegative",
    "apparatus-window-duplicate-row": "only one apparatus-window source row may be emitted for each source_record_id, party, and setting",
  };
  const entry = {
    failure_code: code,
    requirement: requirements[code] ?? code,
    path: pathName,
  };
  if (observed !== undefined) {
    entry.observed = observed;
  }
  return entry;
}

function rowFailures(row, history, historyDiagnostics, response, recordGate, theta) {
  const failures = [
    ...baseFieldFailures(row, history),
    ...historyDiagnostics.failures,
    ...response.failures,
    ...recordGate.failures,
    ...(theta === null ? ["record-cycle-phase-missing"] : []),
    ...residualFailures(row),
  ];
  return [...new Set(failures)].map((code) => failureEntry(code, failurePath(code)));
}

function failurePath(code) {
  if (code.startsWith("accepted-history") || code.includes("sample") || code.includes("root-ledger")) {
    return "accepted_history_segment";
  }
  if (code.startsWith("sigma") || code.startsWith("lambda") || code.startsWith("response") || code.startsWith("jdot")) {
    return "response_functional_source";
  }
  if (code.startsWith("record-gate")) {
    return "record_gate";
  }
  if (code.startsWith("record-cycle")) {
    return "record_cycle";
  }
  if (code.includes("residual") || code.startsWith("delta") || code.startsWith("entropy") || code.startsWith("event")) {
    return "residuals";
  }
  return "$";
}

function candidateId(row, fallback) {
  if (!isObject(row)) {
    return fallback;
  }
  for (const key of ["id", "source_id", "response_id", "row_id", "window_id"]) {
    if (nonemptyString(row[key])) {
      return row[key];
    }
  }
  return fallback;
}

function collectCandidates(source) {
  const candidates = [];
  for (const key of ROW_ARRAY_KEYS) {
    if (!Array.isArray(source[key])) {
      continue;
    }
    source[key].forEach((row, rowIndex) => {
      candidates.push({
        id: candidateId(row, `${key}_${rowIndex}`),
        source_kind: key.slice(0, -1) || key,
        source_path: `${key}[${rowIndex}]`,
        row,
      });
    });
  }
  if (candidates.length === 0) {
    candidates.push({
      id: candidateId(source, "top_level_object_0"),
      source_kind: "top_level_object",
      source_path: "$",
      row: source,
    });
  }
  return candidates;
}

function normalizedRow(candidate, history, historyDiagnostics, response, recordGate, theta) {
  const row = candidate.row;
  const residuals = residualObject(row);
  return {
    id: candidateId(row, `${sourceRecordId(row, history)}:${responseParty(row)}:${responseSetting(row)}`),
    source_record_id: sourceRecordId(row, history),
    party: responseParty(row),
    setting: responseSetting(row),
    response_source: outputResponseSource(row),
    apparatus_kernel_id: apparatusKernelId(row),
    setting_axis: cleanVector(settingAxis(row)),
    Z_in_id: zInId(row),
    record_window_id: recordWindowId(row),
    response_functional: {
      Sigma_m_in: response.Sigma_m_in,
      Lambda_m_in_out: response.Lambda_m_in_out,
      integrand_samples: response.integrand_samples.map((sample) => ({
        t: sample.t,
        Lambda_m_to_out: sample.Lambda_m_to_out,
        N_m: sample.N_m,
        Jdot_app: sample.Jdot_app,
      })),
    },
    record_gate: {
      R_pre: recordGate.R_pre,
      R_rec: recordGate.R_rec,
      R_star: recordGate.R_star,
      T_rec: recordGate.T_rec,
      tau_persist: recordGate.tau_persist,
    },
    record_cycle: {
      theta_rec_fraction: cleanNumber(theta),
    },
    residuals: {
      record_window_id: residualWindowId(residuals),
      ...Object.fromEntries(RESIDUAL_KEYS.map((key) => [key, cleanNumber(residuals[key])])),
    },
    source_emitter_provenance: {
      source_path: candidate.source_path,
      accepted_history_id: historyDiagnostics.history_id,
      accepted_history_sample_count: historyDiagnostics.sample_count,
      active_root_count: historyDiagnostics.active_root_count,
      Jdot_app_sources: response.integrand_samples.map((sample) => sample.source_kind),
      record_gate: {
        G_rec: recordGate.G_rec,
        Delta_R: recordGate.Delta_R,
        amplitude_gate: recordGate.amplitude_gate,
        persistence_gate: recordGate.persistence_gate,
      },
    },
  };
}

function evaluatedCandidate(candidate) {
  const row = isObject(candidate.row) ? candidate.row : {};
  const history = acceptedHistoryObject(row);
  const historyDiagnostics = acceptedHistoryDiagnostics(history);
  const response = responseFunctionalDiagnostics(row);
  const recordGate = recordGateDiagnostics(row);
  const theta = recordCyclePhase(row);
  const failures = rowFailures(row, history, historyDiagnostics, response, recordGate, theta);
  return {
    candidate,
    historyDiagnostics,
    response,
    recordGate,
    theta,
    failures,
    row: failures.length === 0 ? normalizedRow(candidate, history, historyDiagnostics, response, recordGate, theta) : null,
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
      failures.set(index, [failureEntry("apparatus-window-duplicate-row", "source_record_id | party | setting", key)]);
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
  const preliminary = candidates.map(evaluatedCandidate);
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
    status: entry.failures.length === 0 ? "ready_for_apparatus_response_input_extractor" : "blocked",
    failures: entry.failures,
    computed_fields: {
      source_record_id: sourceRecordId(entry.candidate.row, acceptedHistoryObject(entry.candidate.row)),
      party: responseParty(entry.candidate.row),
      setting: responseSetting(entry.candidate.row),
      apparatus_kernel_id: apparatusKernelId(entry.candidate.row),
      setting_axis: settingAxis(entry.candidate.row),
      Z_in_id: zInId(entry.candidate.row),
      record_window_id: recordWindowId(entry.candidate.row),
      accepted_history: entry.historyDiagnostics,
      response_functional: {
        status: entry.response.status,
        Sigma_m_in: entry.response.Sigma_m_in,
        Lambda_m_in_out: entry.response.Lambda_m_in_out,
        sample_count: entry.response.sample_count,
      },
      G_rec: entry.recordGate.G_rec,
      theta_rec_fraction: entry.theta === null ? null : cleanNumber(entry.theta),
      residual_record_window_id: residualWindowId(residualObject(entry.candidate.row)),
    },
  }));
  const readyRows = preliminary.filter((entry) => entry.failures.length === 0).map((entry) => entry.row);
  const blockedCount = auditRows.filter((row) => row.status === "blocked").length;
  const output = {
    artifact: "stern-gerlach-apparatus-window-source-emitter",
    schema: "aaa-stern-gerlach-apparatus-window-source-emitter/v1",
    generated_by: "scripts/quantum/stern-gerlach-apparatus-window-source-emitter.mjs",
    input_source: inputPath ? relativePath(inputPath) : null,
    status: readyRows.length > 0 ? "apparatus_response_windows_ready" : "blocked_no_complete_apparatus_window_sources",
    classification: readyRows.length > 0 ? "apparatus_response_input_extractor_ready" : "fail_closed_blocked",
    contract: contract(),
    audit_rows: auditRows,
    summary: {
      candidate_count: candidates.length,
      ready_count: readyRows.length,
      blocked_count: blockedCount,
      can_run_stern_gerlach_apparatus_response_input_extractor: readyRows.length > 0,
      failure_codes: countFailureCodes(auditRows),
    },
    note:
      "Rows are emitted only from explicit accepted-history and local apparatus-window source data. The emitter does not infer signs from Bell target tables, context probabilities, correlation intervals, or eta_AB intervals.",
  };
  if (readyRows.length > 0) {
    output.apparatus_response_windows = readyRows;
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

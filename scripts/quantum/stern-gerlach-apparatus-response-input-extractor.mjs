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
const TWO_PI = 2 * Math.PI;
const PARTIES = ["A", "B"];
const RESIDUAL_KEYS = ["Delta_rec", "Delta_div", "entropy_locking", "event_ledger"];
const ROW_ARRAY_KEYS = [
  "stern_gerlach_apparatus_response_windows",
  "stern_gerlach_apparatus_windows",
  "apparatus_response_windows",
  "local_apparatus_response_windows",
  "stern_gerlach_apparatus_response_rows",
  "apparatus_response_rows",
  "local_apparatus_response_rows",
  "records",
  "rows",
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
  "apparatus-window-row-missing",
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
  "response-integrand-samples-missing",
  "response-integrand-sample-invalid",
  "response-integrand-time-order-invalid",
  "signed-response-separatrix-zero",
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
  "apparatus-response-duplicate-row",
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
  console.log(`Usage: node scripts/quantum/stern-gerlach-apparatus-response-input-extractor.mjs [options]

Options:
  --input PATH       Read explicit Master-Equation apparatus-window response JSON.
                     Defaults to scripts/quantum/fixtures/action-increment-source-contract-blocked.json
  --print-contract  Print the explicit apparatus-window input contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty          Pretty-print JSON output.
  --help            Show this help.

Verification is required for advancement. This extractor emits stern_gerlach_response_rows only when
the input explicitly supplies a local apparatus-window response functional,
record gate, record-cycle phase, setting axis, incoming local record id, and
same-window residuals. It computes the signed response functional from declared
Sigma_m_in, Lambda_m, N_m, and Jdot_app samples. It does not infer signs from
Bell target tables, correlation intervals, eta_AB intervals, or context
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
    schema: "aaa-stern-gerlach-apparatus-response-input-extractor-contract/v1",
    purpose:
      "Compute toy-emitter-ready Stern-Gerlach response rows from explicit Master-Equation apparatus-window data.",
    fail_closed: true,
    input_rows: ROW_ARRAY_KEYS,
    emitted_row_container: "stern_gerlach_response_rows",
    accepted_output_response_source: "accepted_stern_gerlach_response",
    required_window_fields: [
      "id",
      "source_record_id",
      "party",
      "setting",
      "apparatus_kernel_id",
      "setting_axis",
      "Z_in_id",
      "record_window_id",
      "response_functional.Sigma_m_in",
      "response_functional.Lambda_m_in_out",
      "response_functional.integrand_samples[*].t",
      "response_functional.integrand_samples[*].Lambda_m_to_out",
      "response_functional.integrand_samples[*].N_m",
      "response_functional.integrand_samples[*].Jdot_app",
      "record_gate.R_pre",
      "record_gate.R_rec",
      "record_gate.R_star",
      "record_gate.T_rec",
      "record_gate.tau_persist",
      "record_cycle.theta_rec_fraction or explicit theta_rec/theta_rec_period",
      "residuals.record_window_id",
      "residuals.Delta_rec",
      "residuals.Delta_div",
      "residuals.entropy_locking",
      "residuals.event_ledger",
    ],
    computation: {
      H0: 0,
      signed_response:
        "mathcal_Q_m = exp(Lambda_m_in_out) Sigma_m_in + int exp(Lambda_m_to_out(s)) N_m(s).Jdot_app(s) ds",
      quadrature: "trapezoid over strictly increasing integrand sample times",
      record_gate: "G_rec = H(|R_rec - R_pre| - R_star) H(tau_persist - T_rec)",
    },
    forbidden_sign_sources: [...FORBIDDEN_RESPONSE_SOURCES],
    failure_codes: FAILURE_CODES,
    non_claim:
      "A passing row is adapter input only. It does not claim Bell closure, product-screening survival, or a completed substrate derivation beyond the supplied apparatus-window data.",
  };
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

function firstFiniteNumber(row, keys) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of keys) {
    if (finiteNumber(row[key])) {
      return row[key];
    }
  }
  return null;
}

function nestedFiniteNumber(row, objectKeys, numberKeys) {
  for (const objectKey of objectKeys) {
    const object = row?.[objectKey];
    if (!isObject(object)) {
      continue;
    }
    const value = firstFiniteNumber(object, numberKeys);
    if (value !== null) {
      return value;
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

function outputResponseSource(row) {
  const source = responseSource(row);
  return source && ACCEPTED_RESPONSE_SOURCES.has(source) ? source : "accepted_stern_gerlach_response";
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

function residualWindowId(residuals) {
  return firstString(residuals, ["record_window_id", "local_record_window_id", "window_id"]);
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

function responseFunctionalObject(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of [
    "response_functional",
    "signed_response_functional_input",
    "apparatus_response_functional",
    "responseFunctional",
  ]) {
    if (isObject(row[key])) {
      return row[key];
    }
  }
  return row;
}

function lambdaContainer(object) {
  for (const key of ["Lambda_m", "Lambda_hat_m", "lambda_m", "lambda_hat_m"]) {
    if (isObject(object?.[key])) {
      return object[key];
    }
  }
  return null;
}

function sigmaMIn(functional) {
  return firstFiniteNumber(functional, [
    "Sigma_m_in",
    "Sigma_hat_m_in",
    "Sigma_in",
    "separatrix_value_in",
  ]);
}

function lambdaMInOut(functional) {
  const direct = firstFiniteNumber(functional, [
    "Lambda_m_in_out",
    "Lambda_hat_m_in_out",
    "Lambda_in_out",
    "lambda_m_in_out",
  ]);
  if (direct !== null) {
    return direct;
  }
  if (finiteNumber(functional?.Lambda_m)) {
    return functional.Lambda_m;
  }
  if (finiteNumber(functional?.Lambda_hat_m)) {
    return functional.Lambda_hat_m;
  }
  const nested = lambdaContainer(functional);
  return firstFiniteNumber(nested, ["in_out", "t_in_to_t_out", "tin_to_tout", "value"]);
}

function responseSamples(functional) {
  if (!isObject(functional)) {
    return [];
  }
  for (const key of [
    "integrand_samples",
    "response_integrand_samples",
    "apparatus_impulse_samples",
    "Jdot_app_samples",
    "samples",
  ]) {
    if (Array.isArray(functional[key])) {
      return functional[key];
    }
  }
  return [];
}

function sampleLambdaToOut(sample) {
  const direct = firstFiniteNumber(sample, [
    "Lambda_m_to_out",
    "Lambda_hat_m_to_out",
    "Lambda_to_out",
    "lambda_integral_to_out",
  ]);
  if (direct !== null) {
    return direct;
  }
  if (finiteNumber(sample?.Lambda_m)) {
    return sample.Lambda_m;
  }
  if (finiteNumber(sample?.Lambda_hat_m)) {
    return sample.Lambda_hat_m;
  }
  const nested = lambdaContainer(sample);
  return firstFiniteNumber(nested, ["to_out", "s_to_t_out", "value"]);
}

function sampleNormal(sample) {
  for (const key of [
    "N_m",
    "mathcal_N_m",
    "N_hat_m",
    "separatrix_normal",
    "normal",
  ]) {
    const vector = vectorFrom(sample?.[key]);
    if (vector) {
      return vector;
    }
  }
  return null;
}

function sampleJdot(sample) {
  for (const key of [
    "Jdot_app",
    "J_dot_app",
    "dot_J_app",
    "Jdot_C_app",
    "dot_J_C_app",
    "apparatus_angular_impulse_rate",
  ]) {
    const vector = vectorFrom(sample?.[key]);
    if (vector) {
      return vector;
    }
  }
  return null;
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
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

function parsedIntegrandSamples(functional) {
  const samples = responseSamples(functional);
  return samples.map((sample, index) => {
    const t = sample?.t ?? sample?.time;
    const lambdaToOut = sampleLambdaToOut(sample);
    const normal = sampleNormal(sample);
    const jdot = sampleJdot(sample);
    const valid =
      isObject(sample) &&
      finiteNumber(t) &&
      finiteNumber(lambdaToOut) &&
      finiteVector3(normal) &&
      finiteVector3(jdot);
    return {
      index,
      valid,
      t,
      Lambda_m_to_out: lambdaToOut,
      N_m: normal,
      Jdot_app: jdot,
      integrand: valid ? Math.exp(lambdaToOut) * dot(normal, jdot) : null,
    };
  });
}

function responseCalculation(row) {
  const functional = responseFunctionalObject(row);
  const sigma = sigmaMIn(functional);
  const lambdaInOut = lambdaMInOut(functional);
  const samples = parsedIntegrandSamples(functional);
  const failures = [];

  if (!finiteNumber(sigma)) {
    failures.push("sigma-m-in-missing");
  }
  if (!finiteNumber(lambdaInOut)) {
    failures.push("lambda-m-in-out-missing");
  }
  if (samples.length < 2) {
    failures.push("response-integrand-samples-missing");
  }
  if (samples.some((sample) => !sample.valid)) {
    failures.push("response-integrand-sample-invalid");
  }

  const ordered = [...samples].sort((a, b) => a.t - b.t);
  for (let i = 1; i < ordered.length; i += 1) {
    if (ordered[i].t <= ordered[i - 1].t) {
      failures.push("response-integrand-time-order-invalid");
      break;
    }
  }

  if (failures.length > 0) {
    return {
      status: "blocked",
      failures: [...new Set(failures)],
      Sigma_m_in: finiteNumber(sigma) ? cleanNumber(sigma) : null,
      Lambda_m_in_out: finiteNumber(lambdaInOut) ? cleanNumber(lambdaInOut) : null,
      sample_count: samples.length,
      mathcal_Q_m: null,
    };
  }

  let integral = 0;
  for (let i = 1; i < ordered.length; i += 1) {
    const prior = ordered[i - 1];
    const next = ordered[i];
    integral += (next.t - prior.t) * 0.5 * (prior.integrand + next.integrand);
  }
  const propagatedSigma = Math.exp(lambdaInOut) * sigma;
  const q = propagatedSigma + integral;
  const zero = Math.abs(q) <= EPS;

  return {
    status: zero ? "blocked" : "computed",
    failures: zero ? ["signed-response-separatrix-zero"] : [],
    Sigma_m_in: cleanNumber(sigma),
    Lambda_m_in_out: cleanNumber(lambdaInOut),
    sample_count: samples.length,
    response_integral: cleanNumber(integral),
    propagated_sigma: cleanNumber(propagatedSigma),
    mathcal_Q_m: cleanNumber(q),
    integrand_samples: ordered.map((sample) => ({
      t: cleanNumber(sample.t),
      Lambda_m_to_out: cleanNumber(sample.Lambda_m_to_out),
      N_m: cleanVector(sample.N_m),
      Jdot_app: cleanVector(sample.Jdot_app),
      integrand: cleanNumber(sample.integrand),
    })),
  };
}

function recordGateObject(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of ["record_gate", "G_rec_input", "recordGate"]) {
    if (isObject(row[key])) {
      return row[key];
    }
  }
  return row;
}

function recordValue(object, keys) {
  if (!isObject(object)) {
    return null;
  }
  for (const key of keys) {
    if (finiteNumber(object[key])) {
      return object[key];
    }
    const vector = vectorFrom(object[key]);
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

function recordGateCalculation(row) {
  const gate = recordGateObject(row);
  const rPre = recordValue(gate, ["R_pre", "R_A_pre", "record_pre"]);
  const rRec = recordValue(gate, ["R_rec", "R_A_rec", "record_rec"]);
  const rStar = firstFiniteNumber(gate, ["R_star", "R_*", "record_threshold"]);
  const tRec = firstFiniteNumber(gate, ["T_rec", "record_time", "persistence_time"]);
  const tauPersist = firstFiniteNumber(gate, ["tau_persist", "tau_rec_persist", "persistence_bound"]);
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
  const persistGate = heaviside(tauPersist - tRec);
  const gRec = amplitudeGate * persistGate;
  return {
    status: gRec === 1 ? "computed" : "blocked",
    failures: gRec === 1 ? [] : ["record-gate-not-complete"],
    G_rec: gRec,
    Delta_R: cleanNumber(deltaR),
    R_star: cleanNumber(rStar),
    T_rec: cleanNumber(tRec),
    tau_persist: cleanNumber(tauPersist),
    amplitude_gate: amplitudeGate,
    persistence_gate: persistGate,
  };
}

function recordCycleObject(row) {
  if (!isObject(row)) {
    return null;
  }
  for (const key of ["record_cycle", "recordCycle", "theta_rec"]) {
    if (isObject(row[key])) {
      return row[key];
    }
  }
  return row;
}

function normalizedModulo(value, period) {
  const raw = ((value % period) + period) % period;
  return raw / period;
}

function recordCyclePhase(row) {
  const cycle = recordCycleObject(row);
  const direct = firstFiniteNumber(row, ["theta_rec_fraction", "record_cycle_phase_fraction"]);
  if (direct !== null) {
    return direct >= -EPS && direct <= 1 + EPS ? Math.min(1, Math.max(0, direct)) : null;
  }
  const nestedDirect = firstFiniteNumber(cycle, ["theta_rec_fraction", "record_cycle_phase_fraction"]);
  if (nestedDirect !== null) {
    return nestedDirect >= -EPS && nestedDirect <= 1 + EPS ? Math.min(1, Math.max(0, nestedDirect)) : null;
  }

  const theta = firstFiniteNumber(cycle, ["theta_rec", "theta", "phase"]);
  const period = firstFiniteNumber(cycle, ["theta_rec_period", "phase_period"]);
  if (finiteNumber(theta) && finiteNumber(period) && period > 0) {
    return normalizedModulo(theta, period);
  }

  const tRec = firstFiniteNumber(cycle, ["t_rec", "record_time"]);
  const cycleStart = firstFiniteNumber(cycle, ["cycle_start", "t_cycle_start"]);
  const tPeriod = firstFiniteNumber(cycle, ["T_rec", "cycle_period"]);
  if (finiteNumber(tRec) && finiteNumber(cycleStart) && finiteNumber(tPeriod) && tPeriod > 0) {
    return normalizedModulo(tRec - cycleStart, tPeriod);
  }

  return null;
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

function candidateId(row, fallback) {
  if (!isObject(row)) {
    return fallback;
  }
  for (const key of ["id", "response_id", "row_id", "window_id"]) {
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
    source[key].forEach((row, rowIndex) => {
      pushCandidate(candidates, key.slice(0, -1) || key, `${key}[${rowIndex}]`, row, candidates.length);
    });
  }
  if (candidates.length === 0) {
    pushCandidate(candidates, "top_level_object", "$", source, 0);
  }
  return candidates;
}

function baseFieldFailures(row) {
  const failures = [];
  const sourceId = sourceRecordId(row);
  const party = responseParty(row);
  const setting = responseSetting(row);
  const source = responseSource(row);
  const kernelId = apparatusKernelId(row);
  const axis = settingAxis(row);
  const zin = zInId(row);
  const windowId = recordWindowId(row);
  const forbiddenKeyPath = hasForbiddenKey(row);

  if (!isObject(row)) {
    failures.push(
      failure("apparatus-window-row-missing", "apparatus response candidate must be an object", "$")
    );
  }
  if (!sourceId) {
    failures.push(failure("source-record-id-missing", "source_record_id is required", "source_record_id"));
  }
  if (!party) {
    failures.push(failure("party-missing", "party must be A or B", "party", row?.party ?? row?.wing ?? null));
  }
  if (!setting) {
    failures.push(failure("setting-missing", "setting must be a nonempty setting id", "setting"));
  }
  if (source && !ACCEPTED_RESPONSE_SOURCES.has(source)) {
    failures.push(
      failure(
        "response-source-forbidden",
        "response_source must be absent or identify an accepted local Stern-Gerlach apparatus response source",
        "response_source",
        source
      )
    );
  }
  if (usesForbiddenResponseSource(row) || forbiddenKeyPath) {
    failures.push(
      failure(
        "forbidden-bell-threshold-source",
        "response signs may not be synthesized from correlation_interval, eta_AB_interval, Bell target tables, or context probability tables",
        forbiddenKeyPath ?? "response_source",
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

  return failures;
}

function responseFailures(calculation) {
  return calculation.failures.map((code) => {
    if (code === "signed-response-separatrix-zero") {
      return failure(
        code,
        "computed mathcal_Q_m must be nonzero so the row is not on the separatrix",
        "mathcal_Q_m",
        calculation.mathcal_Q_m
      );
    }
    return failure(code, "response_functional must supply explicit Sigma_m_in, Lambda_m, N_m, and Jdot_app samples", "response_functional");
  });
}

function recordGateFailures(calculation) {
  return calculation.failures.map((code) => {
    if (code === "record-gate-not-complete") {
      return failure(
        code,
        "computed G_rec must be 1 using H(0)=0 for both amplitude and persistence gates",
        "record_gate",
        calculation.G_rec
      );
    }
    return failure(
      code,
      "record_gate must supply R_pre, R_rec, R_star, T_rec, and tau_persist",
      "record_gate"
    );
  });
}

function recordCycleFailures(theta) {
  if (theta !== null) {
    return [];
  }
  return [
    failure(
      "record-cycle-phase-missing",
      "theta_rec_fraction must be finite in [0,1] or computed from explicit record-cycle data",
      "record_cycle.theta_rec_fraction | record_cycle.theta_rec"
    ),
  ];
}

function residualFailures(row) {
  const failures = [];
  const windowId = recordWindowId(row);
  const residuals = residualObject(row);
  const residualWindow = residualWindowId(residuals);
  if (!isObject(residuals)) {
    failures.push(
      failure(
        "local-record-residuals-missing",
        "residuals must contain same-window local record residuals",
        "residuals"
      )
    );
    return failures;
  }
  if (!residualWindow) {
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
    if (!finiteNumber(residuals[key]) || residuals[key] < -EPS) {
      failures.push(
        failure(
          code,
          `${key} must be a finite nonnegative local residual for the same record window`,
          `residuals.${key}`,
          residuals[key] ?? null
        )
      );
    }
  }
  return failures;
}

function evaluatedCandidate(candidate) {
  const row = isObject(candidate.row) ? candidate.row : {};
  const response = responseCalculation(row);
  const recordGate = recordGateCalculation(row);
  const theta = recordCyclePhase(row);
  const failures = [
    ...baseFieldFailures(candidate.row),
    ...responseFailures(response),
    ...recordGateFailures(recordGate),
    ...recordCycleFailures(theta),
    ...residualFailures(row),
  ];
  return {
    candidate,
    response,
    recordGate,
    theta,
    failures,
    row: failures.length === 0 ? normalizedRow(candidate, response, recordGate, theta) : null,
  };
}

function normalizedRow(candidate, response, recordGate, theta) {
  const row = candidate.row;
  const residuals = residualObject(row);
  return {
    id: candidateId(row, `${sourceRecordId(row)}:${responseParty(row)}:${responseSetting(row)}`),
    source_record_id: sourceRecordId(row),
    party: responseParty(row),
    setting: responseSetting(row),
    response_source: outputResponseSource(row),
    apparatus_kernel_id: apparatusKernelId(row),
    setting_axis: normalizeAxis(settingAxis(row)),
    Z_in_id: zInId(row),
    record_window_id: recordWindowId(row),
    G_rec: recordGate.G_rec,
    mathcal_Q_m: response.mathcal_Q_m,
    Q_m: response.mathcal_Q_m,
    theta_rec_fraction: cleanNumber(theta),
    residuals: {
      record_window_id: residualWindowId(residuals),
      ...Object.fromEntries(RESIDUAL_KEYS.map((key) => [key, cleanNumber(residuals[key])])),
    },
    extractor_provenance: {
      source_path: candidate.source_path,
      signed_response_formula:
        "exp(Lambda_m_in_out) Sigma_m_in + trapezoid(exp(Lambda_m_to_out) N_m.Jdot_app)",
      Sigma_m_in: response.Sigma_m_in,
      Lambda_m_in_out: response.Lambda_m_in_out,
      propagated_sigma: response.propagated_sigma,
      response_integral: response.response_integral,
      integrand_sample_count: response.sample_count,
      record_gate: {
        Delta_R: recordGate.Delta_R,
        R_star: recordGate.R_star,
        T_rec: recordGate.T_rec,
        tau_persist: recordGate.tau_persist,
        amplitude_gate: recordGate.amplitude_gate,
        persistence_gate: recordGate.persistence_gate,
      },
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
          "apparatus-response-duplicate-row",
          "only one apparatus response row may be emitted for each source_record_id, party, and setting",
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
    status: entry.failures.length === 0 ? "ready_for_stern_gerlach_response_toy_emitter" : "blocked",
    failures: entry.failures,
    computed_fields: {
      source_record_id: sourceRecordId(entry.candidate.row),
      party: responseParty(entry.candidate.row),
      setting: responseSetting(entry.candidate.row),
      response_source: responseSource(entry.candidate.row) ?? "accepted_stern_gerlach_response",
      apparatus_kernel_id: apparatusKernelId(entry.candidate.row),
      setting_axis: normalizeAxis(settingAxis(entry.candidate.row)),
      Z_in_id: zInId(entry.candidate.row),
      record_window_id: recordWindowId(entry.candidate.row),
      G_rec: entry.recordGate.G_rec,
      mathcal_Q_m: entry.response.mathcal_Q_m,
      theta_rec_fraction: entry.theta === null ? null : cleanNumber(entry.theta),
      residual_record_window_id: residualWindowId(residualObject(entry.candidate.row)),
    },
  }));
  const readyRows = preliminary.filter((entry) => entry.failures.length === 0).map((entry) => entry.row);
  const blockedCount = auditRows.filter((row) => row.status === "blocked").length;
  const output = {
    artifact: "stern-gerlach-apparatus-response-input-extractor",
    schema: "aaa-stern-gerlach-apparatus-response-input-extractor/v1",
    generated_by: "scripts/quantum/stern-gerlach-apparatus-response-input-extractor.mjs",
    input_source: inputPath ? relativePath(inputPath) : null,
    status: readyRows.length > 0 ? "stern_gerlach_response_rows_ready" : "blocked_no_complete_apparatus_response_rows",
    classification: readyRows.length > 0 ? "toy_emitter_input_ready" : "fail_closed_blocked",
    contract: contract(),
    audit_rows: auditRows,
    summary: {
      candidate_count: candidates.length,
      ready_count: readyRows.length,
      blocked_count: blockedCount,
      can_run_stern_gerlach_response_toy_emitter: readyRows.length > 0,
      failure_codes: countFailureCodes(auditRows),
    },
    note:
      "Rows are emitted only from explicit local Master-Equation apparatus-window data. The extractor does not infer signs from Bell target tables, context probabilities, correlation intervals, or eta_AB intervals.",
  };
  if (readyRows.length > 0) {
    output.stern_gerlach_response_rows = readyRows;
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

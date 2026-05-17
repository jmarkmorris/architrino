#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "fe-silicate-segregation-toy.json");
const DEFAULT_FEATURE_ORDER = [
  "delta_n",
  "delta_ln_n_max_obl",
  "delta_ln_chi_sea",
  "delta_S_dev",
  "delta_P_over_K_sea",
  "heavy_scaling",
];
const DEFAULT_THRESHOLDS = {
  source_abs_max: 0,
  standard_subtraction_abs_max: 1e-12,
  model_residual_abs_max: 1e-9,
  n_interval_match_abs_max: 1e-12,
  slope_upper_bound: -1e-9,
  slope_bound_only_abs_max: 1e-6,
  demote_abs_sea_residual_max: 1e-6,
};

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
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
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/fe-silicate-segregation-toy.mjs [options]

Options:
  --input PATH  Fe/silicate segregation packet. Defaults to scripts/mass-map/fe-silicate-segregation-toy.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This evaluates a toy Fe/silicate dense-medium segregation replay:
  y_M,r = mu_raw,M,r - mu_std,M,r
  yhat_M,r = Delta mu_sea,M,r from coefficient model or B_seg q_M,r
  S_Fe/sil = d y_Fe / d n - d y_sil / d n.
It is a scaffold for proof and simulation closure, not empirical geophysics.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new Error(`${label} must be nonnegative.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function thresholdMap(inputThresholds = {}) {
  const raw = { ...DEFAULT_THRESHOLDS, ...inputThresholds };
  const modelResidualAbsMax = raw.model_residual_abs_max ?? raw.shared_row_residual_abs_max;
  return {
    source_abs_max: nonnegativeNumber(raw.source_abs_max, "thresholds.source_abs_max"),
    standard_subtraction_abs_max: nonnegativeNumber(
      raw.standard_subtraction_abs_max,
      "thresholds.standard_subtraction_abs_max"
    ),
    model_residual_abs_max: nonnegativeNumber(
      modelResidualAbsMax,
      "thresholds.model_residual_abs_max"
    ),
    n_interval_match_abs_max: nonnegativeNumber(
      raw.n_interval_match_abs_max,
      "thresholds.n_interval_match_abs_max"
    ),
    slope_upper_bound: finiteNumber(raw.slope_upper_bound, "thresholds.slope_upper_bound"),
    slope_bound_only_abs_max: nonnegativeNumber(
      raw.slope_bound_only_abs_max,
      "thresholds.slope_bound_only_abs_max"
    ),
    demote_abs_sea_residual_max: nonnegativeNumber(
      raw.demote_abs_sea_residual_max,
      "thresholds.demote_abs_sea_residual_max"
    ),
  };
}

function featureOrder(input) {
  const order = input.feature_order ?? DEFAULT_FEATURE_ORDER;
  if (!Array.isArray(order) || order.length === 0 || order.some((key) => typeof key !== "string")) {
    throw new Error("feature_order must be a nonempty array of strings.");
  }
  return order;
}

function sharedRow(input, order) {
  if (input.shared_row === undefined) {
    return null;
  }
  const row = asObject(input.shared_row, "shared_row");
  return Object.fromEntries(
    order.map((key) => [key, finiteNumber(row[key], `shared_row.${key}`)])
  );
}

function dotRow(row, features, order) {
  return order.reduce((sum, key) => sum + row[key] * features[key], 0);
}

function coefficientModel(input) {
  if (input.coefficient_model === undefined) {
    return null;
  }
  const raw = asObject(input.coefficient_model, "coefficient_model");
  const weights = asObject(raw.coupling_weights ?? {}, "coefficient_model.coupling_weights");
  return {
    name: raw.name ?? "coefficient-derivation",
    convex_penalty: raw.convex_penalty ?? "half_square",
    exclusion_scale: positiveNumber(raw.exclusion_scale, "coefficient_model.exclusion_scale"),
    coupling_scale: positiveNumber(raw.coupling_scale, "coefficient_model.coupling_scale"),
    pressure_scale: finiteNumber(raw.pressure_scale ?? 0, "coefficient_model.pressure_scale"),
    coupling_weights: {
      heavy: finiteNumber(weights.heavy ?? 0, "coefficient_model.coupling_weights.heavy"),
      bonding: finiteNumber(weights.bonding ?? 0, "coefficient_model.coupling_weights.bonding"),
      alignment: finiteNumber(weights.alignment ?? 0, "coefficient_model.coupling_weights.alignment"),
    },
  };
}

function predictionModel(input, order) {
  const model = coefficientModel(input);
  const row = sharedRow(input, order);
  if (model && row) {
    throw new Error("Declare coefficient_model or shared_row, not both.");
  }
  if (model) {
    return {
      kind: "coefficient_derivation",
      coefficient_model: model,
    };
  }
  if (row) {
    return {
      kind: "shared_row",
      shared_row: row,
    };
  }
  throw new Error("Input must declare coefficient_model or shared_row.");
}

function convexPenalty(kind, x, label) {
  if (kind === "half_square") {
    return 0.5 * x * x;
  }
  throw new Error(`${label}.convex_penalty has unsupported value: ${kind}`);
}

function materialCoefficientInputs(material, materialLabel) {
  return asObject(material.coefficient_inputs ?? {}, `${materialLabel}.coefficient_inputs`);
}

function deriveCoefficients(material, materialLabel, features, prediction) {
  const model = prediction.coefficient_model;
  const input = materialCoefficientInputs(material, materialLabel);
  const heavyScaling = finiteNumber(
    features.heavy_scaling ?? input.heavy_scaling ?? 0,
    `${materialLabel}.coefficient_inputs.heavy_scaling`
  );
  const metallicBonding = finiteNumber(
    input.metallic_bonding ?? 0,
    `${materialLabel}.coefficient_inputs.metallic_bonding`
  );
  const coherentAlignment = finiteNumber(
    input.coherent_alignment ?? 0,
    `${materialLabel}.coefficient_inputs.coherent_alignment`
  );
  const strainAlignment = finiteNumber(
    input.strain_alignment ?? 1,
    `${materialLabel}.coefficient_inputs.strain_alignment`
  );
  const pressureResponse = finiteNumber(
    input.pressure_response ?? 1,
    `${materialLabel}.coefficient_inputs.pressure_response`
  );
  const weights = model.coupling_weights;
  return {
    A: model.exclusion_scale * positiveNumber(
      input.exclusion_penalty,
      `${materialLabel}.coefficient_inputs.exclusion_penalty`
    ),
    n_max_obl_ref: positiveNumber(
      input.n_max_obl_ref,
      `${materialLabel}.coefficient_inputs.n_max_obl_ref`
    ),
    G: model.coupling_scale * (
      weights.heavy * heavyScaling +
      weights.bonding * metallicBonding +
      weights.alignment * coherentAlignment
    ),
    C_chi: finiteNumber(input.delay_coupling ?? 0, `${materialLabel}.coefficient_inputs.delay_coupling`),
    C_S_Q: finiteNumber(input.strain_coupling ?? 0, `${materialLabel}.coefficient_inputs.strain_coupling`) *
      strainAlignment,
    C_P: model.pressure_scale * pressureResponse,
    term_inputs: {
      heavy_scaling: heavyScaling,
      metallic_bonding: metallicBonding,
      coherent_alignment: coherentAlignment,
      strain_alignment: strainAlignment,
      pressure_response: pressureResponse,
    },
  };
}

function mediumCostComponents(material, materialLabel, features, prediction) {
  const coefficients = deriveCoefficients(material, materialLabel, features, prediction);
  const deltaLnNMax = finiteNumber(
    features.delta_ln_n_max_obl ?? 0,
    `${materialLabel}.features.delta_ln_n_max_obl`
  );
  const nMaxObl = coefficients.n_max_obl_ref * Math.exp(deltaLnNMax);
  const n = finiteNumber(features.delta_n + 1, `${materialLabel}.features.delta_n + 1`);
  if (n <= 0) {
    throw new Error(`${materialLabel}.features.delta_n must keep n positive.`);
  }
  const x = n / nMaxObl;
  const packing = coefficients.A * convexPenalty(
    prediction.coefficient_model.convex_penalty,
    x,
    "coefficient_model"
  );
  const coupling = -coefficients.G * n;
  const delay = coefficients.C_chi * finiteNumber(
    features.delta_ln_chi_sea ?? 0,
    `${materialLabel}.features.delta_ln_chi_sea`
  );
  const strain = coefficients.C_S_Q * finiteNumber(
    features.delta_S_dev ?? 0,
    `${materialLabel}.features.delta_S_dev`
  );
  const pressure = coefficients.C_P * finiteNumber(
    features.delta_P_over_K_sea ?? 0,
    `${materialLabel}.features.delta_P_over_K_sea`
  );
  return {
    coefficients,
    n,
    n_max_obl: nMaxObl,
    x_n_over_n_max: x,
    components: {
      packing,
      coupling,
      delay,
      strain,
      pressure,
      total: packing + coupling + delay + strain + pressure,
    },
  };
}

function subtractComponents(current, baseline) {
  return Object.fromEntries(
    Object.keys(current).map((key) => [key, current[key] - baseline[key]])
  );
}

function gate(status, value, threshold, failureCode) {
  return {
    status,
    value,
    threshold,
    failure_code: status === "pass" ? null : failureCode,
  };
}

function materialKey(material, index) {
  return material.material_id ?? material.role ?? `material-${index}`;
}

function stepKey(material, materialIndex, step, stepIndex) {
  return `${materialKey(material, materialIndex)}:${step.step_index ?? stepIndex}`;
}

function sourceValue(guardrail, label) {
  const source =
    guardrail.S_Fe_nuc ??
    guardrail.S_Fe_nuc_per_s ??
    guardrail.S_Fe_nuc_density ??
    0;
  return finiteNumber(source, `${label}.S_Fe_nuc`);
}

function evaluateMaterial(material, materialIndex, order, prediction) {
  const key = materialKey(material, materialIndex);
  const guardrail = asObject(material.inventory_guardrail ?? {}, `${key}.inventory_guardrail`);
  const source = sourceValue(guardrail, `${key}.inventory_guardrail`);
  const fixedNuclei = guardrail.fixed_nuclei === true;
  const steps = Array.isArray(material.steps) ? material.steps : [];
  if (steps.length < 2) {
    throw new Error(`${key}.steps must include at least two density steps.`);
  }

  let baselineComponents = null;
  const rows = steps.map((step, stepIndex) => {
    const rowKey = stepKey(material, materialIndex, step, stepIndex);
    const featuresInput = asObject(step.features, `${rowKey}.features`);
    const features = Object.fromEntries(
      order.map((featureKey) => [
        featureKey,
        finiteNumber(featuresInput[featureKey], `${rowKey}.features.${featureKey}`),
      ])
    );
    const muRaw = finiteNumber(step.mu_raw, `${rowKey}.mu_raw`);
    const muStd = finiteNumber(step.mu_std, `${rowKey}.mu_std`);
    const seaResidual =
      step.sea_residual === undefined
        ? muRaw - muStd
        : finiteNumber(step.sea_residual, `${rowKey}.sea_residual`);
    const standardSubtractionResidual = seaResidual - (muRaw - muStd);
    let predictionRecord = null;
    let predictedSeaResidual = null;
    if (prediction.kind === "coefficient_derivation") {
      const predicted = mediumCostComponents(material, rowKey, features, prediction);
      if (baselineComponents === null) {
        baselineComponents = predicted.components;
      }
      const componentDeltas = subtractComponents(predicted.components, baselineComponents);
      predictedSeaResidual = componentDeltas.total;
      predictionRecord = {
        kind: prediction.kind,
        derived_coefficients: predicted.coefficients,
        n: predicted.n,
        n_max_obl: predicted.n_max_obl,
        x_n_over_n_max: predicted.x_n_over_n_max,
        component_values: predicted.components,
        component_deltas: componentDeltas,
      };
    } else {
      predictedSeaResidual = dotRow(prediction.shared_row, features, order);
      predictionRecord = {
        kind: prediction.kind,
      };
    }
    return {
      key: rowKey,
      step_index: step.step_index ?? stepIndex,
      n: finiteNumber(step.n, `${rowKey}.n`),
      mu_raw: muRaw,
      mu_std: muStd,
      sea_residual: seaResidual,
      standard_subtraction_residual: standardSubtractionResidual,
      features,
      predicted_sea_residual: predictedSeaResidual,
      model_residual: seaResidual - predictedSeaResidual,
      prediction: predictionRecord,
    };
  });

  const transport = material.transport_record ?? {};
  const transportRecords = Array.isArray(transport) ? transport : [transport];
  const transportFailures = transportRecords.flatMap((record, index) => {
    const R = finiteNumber(record.R_tr ?? 0, `${key}.transport_record[${index}].R_tr`);
    const RStar = record.R_tr_star === undefined
      ? Number.POSITIVE_INFINITY
      : finiteNumber(record.R_tr_star, `${key}.transport_record[${index}].R_tr_star`);
    const loggedEventChannel = record.logged_event_channel ?? null;
    if (R <= RStar || loggedEventChannel) {
      return [];
    }
    return [{
      material_id: key,
      R_tr: R,
      R_tr_star: RStar,
      failure_code: "transport-threshold-open",
    }];
  });

  return {
    key,
    material_id: material.material_id ?? null,
    role: material.role ?? null,
    phase_label: material.phase_label ?? null,
    inventory_guardrail: {
      fixed_nuclei: fixedNuclei,
      Z: guardrail.Z ?? null,
      A: guardrail.A ?? null,
      S_Fe_nuc: source,
    },
    rows,
    transport_failures: transportFailures,
  };
}

function pickMaterial(materials, role) {
  const match = materials.find((material) => material.role === role);
  if (!match) {
    throw new Error(`materials must include role ${role}.`);
  }
  return match;
}

function slopeRows(fe, sil, thresholds) {
  const length = Math.min(fe.rows.length, sil.rows.length);
  const rows = [];
  const intervalFailures = [];
  for (let i = 1; i < length; i += 1) {
    const fePrev = fe.rows[i - 1];
    const feCurrent = fe.rows[i];
    const silPrev = sil.rows[i - 1];
    const silCurrent = sil.rows[i];
    const dNFe = feCurrent.n - fePrev.n;
    const dNSil = silCurrent.n - silPrev.n;
    if (dNFe <= 0 || dNSil <= 0) {
      intervalFailures.push({
        interval_index: i - 1,
        d_n_fe: dNFe,
        d_n_sil: dNSil,
        failure_code: "density-interval-open",
      });
      continue;
    }
    const intervalMismatch = Math.abs(dNFe - dNSil);
    if (intervalMismatch > thresholds.n_interval_match_abs_max) {
      intervalFailures.push({
        interval_index: i - 1,
        d_n_fe: dNFe,
        d_n_sil: dNSil,
        interval_mismatch: intervalMismatch,
        failure_code: "density-interval-open",
      });
    }
    const slopeFe = (feCurrent.sea_residual - fePrev.sea_residual) / dNFe;
    const slopeSil = (silCurrent.sea_residual - silPrev.sea_residual) / dNSil;
    const componentSlopes = {};
    const feCurrentComponents = feCurrent.prediction?.component_deltas;
    const fePrevComponents = fePrev.prediction?.component_deltas;
    const silCurrentComponents = silCurrent.prediction?.component_deltas;
    const silPrevComponents = silPrev.prediction?.component_deltas;
    if (feCurrentComponents && fePrevComponents && silCurrentComponents && silPrevComponents) {
      for (const key of Object.keys(feCurrentComponents)) {
        const feComponentSlope = (feCurrentComponents[key] - fePrevComponents[key]) / dNFe;
        const silComponentSlope = (silCurrentComponents[key] - silPrevComponents[key]) / dNSil;
        componentSlopes[key] = {
          slope_fe: feComponentSlope,
          slope_silicate: silComponentSlope,
          S_Fe_sil: feComponentSlope - silComponentSlope,
        };
      }
    }
    rows.push({
      interval_index: i - 1,
      from_step: [fePrev.step_index, silPrev.step_index],
      to_step: [feCurrent.step_index, silCurrent.step_index],
      d_n_fe: dNFe,
      d_n_sil: dNSil,
      slope_fe: slopeFe,
      slope_silicate: slopeSil,
      S_Fe_sil: slopeFe - slopeSil,
      component_slopes: componentSlopes,
    });
  }
  return { rows, intervalFailures };
}

function evaluateNullBounds(nullBounds = {}) {
  const bounds = asObject(nullBounds, "null_bounds");
  return Object.entries(bounds).flatMap(([name, value]) => {
    if (value === true || value === "pass") {
      return [];
    }
    if (value && typeof value === "object" && value.status === "pass") {
      return [];
    }
    return [{
      bound: name,
      value,
      failure_code: "null-bound-open",
    }];
  });
}

function firstFailureCode(gates) {
  const orderedKeys = [
    "source_guardrail",
    "standard_correction_subtraction",
    "pair_coverage",
    "derived_model_fit",
    "shared_row_fit",
    "dense_medium_sign",
    "transport_threshold",
    "null_bounds",
    "failure_injections",
  ];
  for (const key of orderedKeys) {
    if (gates[key]?.status === "fail") {
      return gates[key].failure_code;
    }
  }
  return null;
}

function scenarioPromotionStatus(gates, totals, thresholds) {
  const gatesExceptSlopePass = Object.entries(gates)
    .filter(([key]) => key !== "dense_medium_sign" && key !== "failure_injections")
    .every(([, entry]) => entry.status === "pass");
  if (totals.max_abs_sea_residual <= thresholds.demote_abs_sea_residual_max && gatesExceptSlopePass) {
    return {
      promotion_status: "demoted_to_standard_geophysics",
      failure_code: "standard-correction-absorption",
    };
  }
  if (
    Math.abs(totals.max_S_Fe_sil) <= thresholds.slope_bound_only_abs_max &&
    gatesExceptSlopePass
  ) {
    return {
      promotion_status: "bound_only",
      failure_code: "dense-medium-bound-only",
    };
  }
  const failureCode = firstFailureCode(gates);
  if (failureCode) {
    return {
      promotion_status: "failed",
      failure_code: failureCode,
    };
  }
  return {
    promotion_status: "promotion_ready_toy_scaffold",
    failure_code: null,
  };
}

function applyFailureInjection(input, injection) {
  const scenario = deepClone(input);
  delete scenario.failure_injections;
  const mutations = Array.isArray(injection.mutations) ? injection.mutations : [];
  for (const mutation of mutations) {
    if (mutation.shared_row) {
      scenario.shared_row = {
        ...scenario.shared_row,
        ...mutation.shared_row,
      };
    }
    if (mutation.coefficient_model) {
      scenario.coefficient_model = {
        ...scenario.coefficient_model,
        ...mutation.coefficient_model,
      };
    }
    if (mutation.material_id) {
      const material = scenario.materials?.find((entry) => entry.material_id === mutation.material_id);
      if (!material) {
        throw new Error(`Failure injection ${injection.name} targets missing material ${mutation.material_id}.`);
      }
      if (mutation.inventory_guardrail) {
        material.inventory_guardrail = {
          ...material.inventory_guardrail,
          ...mutation.inventory_guardrail,
        };
      }
      if (mutation.coefficient_inputs) {
        material.coefficient_inputs = {
          ...material.coefficient_inputs,
          ...mutation.coefficient_inputs,
        };
      }
    }
  }
  return scenario;
}

function evaluateFailureInjections(input, inputPath) {
  const injections = Array.isArray(input.failure_injections) ? input.failure_injections : [];
  const controls = injections.map((injection, index) => {
    const name = injection.name ?? `failure-injection-${index}`;
    const scenario = applyFailureInjection(input, injection);
    const result = evaluateScenario(scenario, inputPath, { includeFailureInjections: false });
    const expectedFailureCode = injection.expected_failure_code ?? null;
    const failedAsExpected = result.promotion_status !== "promotion_ready_toy_scaffold";
    const matchedExpectedCode =
      expectedFailureCode === null || result.failure_code === expectedFailureCode;
    return {
      name,
      expected_failure_code: expectedFailureCode,
      actual_failure_code: result.failure_code,
      promotion_status: result.promotion_status,
      passed_when_should_fail: !failedAsExpected,
      expected_code_mismatch: failedAsExpected && !matchedExpectedCode,
    };
  });
  return {
    controls,
    failures: controls.filter((control) => control.passed_when_should_fail || control.expected_code_mismatch),
  };
}

function evaluateScenario(input, inputPath, options = {}) {
  const includeFailureInjections = options.includeFailureInjections ?? true;
  const order = featureOrder(input);
  const prediction = predictionModel(input, order);
  const thresholds = thresholdMap(input.thresholds);
  const materialsInput = Array.isArray(input.materials) ? input.materials : [];
  if (materialsInput.length < 2) {
    throw new Error("materials must include Fe and silicate records.");
  }

  const materials = materialsInput.map((material, index) =>
    evaluateMaterial(material, index, order, prediction)
  );
  const fe = pickMaterial(materials, "Fe");
  const sil = pickMaterial(materials, "silicate");
  const { rows: slopes, intervalFailures } = slopeRows(fe, sil, thresholds);
  if (slopes.length === 0) {
    throw new Error("At least one matched Fe/silicate density interval is required.");
  }

  const allRows = materials.flatMap((material) => material.rows);
  const sourceFailures = materials.filter((material) =>
    Math.abs(material.inventory_guardrail.S_Fe_nuc) > thresholds.source_abs_max ||
    (material.role === "Fe" && material.inventory_guardrail.fixed_nuclei !== true)
  );
  const maxStandardSubtractionResidual = Math.max(
    ...allRows.map((rowEntry) => Math.abs(rowEntry.standard_subtraction_residual))
  );
  const maxModelResidual = Math.max(
    ...allRows.map((rowEntry) => Math.abs(rowEntry.model_residual))
  );
  const maxAbsSeaResidual = Math.max(...allRows.map((rowEntry) => Math.abs(rowEntry.sea_residual)));
  const maxSFeSil = Math.max(...slopes.map((rowEntry) => rowEntry.S_Fe_sil));
  const transportFailures = materials.flatMap((material) => material.transport_failures);
  const nullBoundFailures = evaluateNullBounds(input.null_bounds ?? {});
  const failureInjections = includeFailureInjections
    ? evaluateFailureInjections(input, inputPath)
    : { controls: [], failures: [] };

  const fitGateKey = prediction.kind === "coefficient_derivation" ? "derived_model_fit" : "shared_row_fit";
  const gates = {
    source_guardrail: gate(
      sourceFailures.length === 0 ? "pass" : "fail",
      sourceFailures.map((material) => ({
        material_id: material.material_id,
        role: material.role,
        fixed_nuclei: material.inventory_guardrail.fixed_nuclei,
        S_Fe_nuc: material.inventory_guardrail.S_Fe_nuc,
      })),
      `|S_Fe_nuc| <= ${thresholds.source_abs_max} and Fe fixed_nuclei is true`,
      "transmutation-leak"
    ),
    standard_correction_subtraction: gate(
      maxStandardSubtractionResidual <= thresholds.standard_subtraction_abs_max ? "pass" : "fail",
      maxStandardSubtractionResidual,
      thresholds.standard_subtraction_abs_max,
      "standard-subtraction-open"
    ),
    pair_coverage: gate(
      fe.rows.length === sil.rows.length && intervalFailures.length === 0 ? "pass" : "fail",
      {
        fe_steps: fe.rows.length,
        silicate_steps: sil.rows.length,
        interval_failures: intervalFailures,
      },
      "matched Fe/silicate density intervals",
      "density-interval-open"
    ),
    [fitGateKey]: gate(
      maxModelResidual <= thresholds.model_residual_abs_max ? "pass" : "fail",
      maxModelResidual,
      thresholds.model_residual_abs_max,
      prediction.kind === "coefficient_derivation" ? "derived-coefficient-open" : "shared-row-open"
    ),
    dense_medium_sign: gate(
      maxSFeSil < thresholds.slope_upper_bound ? "pass" : "fail",
      maxSFeSil,
      thresholds.slope_upper_bound,
      "dense-medium-sign-open"
    ),
    transport_threshold: gate(
      transportFailures.length === 0 ? "pass" : "fail",
      transportFailures,
      "R_tr <= R_tr_star or a logged event channel exists",
      "transport-threshold-open"
    ),
    null_bounds: gate(
      nullBoundFailures.length === 0 ? "pass" : "fail",
      nullBoundFailures,
      "all declared null bounds pass",
      "null-bound-open"
    ),
    failure_injections: gate(
      failureInjections.failures.length === 0 ? "pass" : "fail",
      failureInjections.failures,
      "all declared failure injections fail as expected",
      "failure-injection-open"
    ),
  };
  const totals = {
    max_abs_sea_residual: maxAbsSeaResidual,
    max_standard_subtraction_residual: maxStandardSubtractionResidual,
    max_model_residual: maxModelResidual,
    max_S_Fe_sil: maxSFeSil,
    failure_injection_count: failureInjections.controls.length,
  };
  const classification = scenarioPromotionStatus(gates, totals, thresholds);

  return {
    schema: "fe-silicate-segregation-toy-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    metadata: input.metadata ?? {},
    feature_order: order,
    prediction_model: prediction,
    thresholds,
    materials,
    slope_rows: slopes,
    null_bounds: input.null_bounds ?? {},
    failure_injections: failureInjections.controls,
    totals,
    gates,
    promotion_status: classification.promotion_status,
    failure_code: classification.failure_code,
    note:
      "This is a toy replay scaffold for the Fe/silicate dense-medium sign condition. Passing it does not validate Earth-core iron segregation; it only checks the declared packet shape, guardrails, coefficient model, and sign logic.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const inputPath = path.resolve(args.input);
  const input = readJson(inputPath);
  const result = evaluateScenario(input, inputPath);
  const output = JSON.stringify(result, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

main();

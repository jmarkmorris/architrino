#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "thermodynamic-residual-mock.json");
const DEFAULT_EPSILON = 1e-12;
const DEFAULT_CONSTANTS = {
  k_B: 1,
  hbar: 1,
  c0: 1,
  A_align: 1,
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
  console.log(`Usage: node scripts/gravity/thermodynamic-residual.mjs [options]

Options:
  --input PATH  Thermodynamic residual packet. Defaults to scripts/gravity/thermodynamic-residual-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This evaluates the mock local-horizon thermodynamic residual gate:
  R_thermo = |dQ - T_U dS| / (|dQ| + T_U |dS| + epsilon)
with area-scaling, conservation, same-record, weak-field, and negative-control gates.
It is a validation scaffold, not a gravity simulation.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
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

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function gate(status, value, threshold, failureCode) {
  return {
    status,
    value,
    threshold,
    failure_code: status === "pass" ? null : failureCode,
  };
}

function observationKey(observation, index) {
  const observer = observation.observer_id ?? "observer";
  const patch = observation.patch_id ?? `patch-${index}`;
  return `${observer}/${patch}`;
}

function mergeConstants(inputConstants = {}) {
  const constants = { ...DEFAULT_CONSTANTS, ...inputConstants };
  return {
    k_B: positiveNumber(constants.k_B, "constants.k_B"),
    hbar: positiveNumber(constants.hbar, "constants.hbar"),
    c0: positiveNumber(constants.c0, "constants.c0"),
    A_align: positiveNumber(constants.A_align, "constants.A_align"),
  };
}

function entropyFromCount(count, constants, label) {
  const numericCount = positiveNumber(count, label);
  return constants.k_B * Math.log(numericCount);
}

function computeFlux(observation, key) {
  if (observation.flux !== undefined) {
    return finiteNumber(observation.flux, `${key}.flux`);
  }
  const terms = Array.isArray(observation.flux_terms) ? observation.flux_terms : [];
  if (terms.length === 0) {
    throw new Error(`${key} must provide flux or flux_terms.`);
  }
  return terms.reduce((sum, term, index) => {
    const sigma = finiteNumber(term.sigma ?? 1, `${key}.flux_terms[${index}].sigma`);
    const energy = finiteNumber(term.energy, `${key}.flux_terms[${index}].energy`);
    const weight = finiteNumber(term.weight ?? 1, `${key}.flux_terms[${index}].weight`);
    return sum + sigma * energy * weight;
  }, 0);
}

function computeTemperature(observation, constants, key) {
  if (observation.temperature !== undefined) {
    return positiveNumber(observation.temperature, `${key}.temperature`);
  }
  const acceleration = nonnegativeNumber(
    observation.observer_acceleration,
    `${key}.observer_acceleration`
  );
  return (constants.hbar * acceleration) / (2 * Math.PI * constants.k_B * constants.c0);
}

function computeAreaResidual(observation, constants, epsilon, key) {
  const samples = Array.isArray(observation.area_samples) ? observation.area_samples : [];
  if (samples.length < 2) {
    throw new Error(`${key}.area_samples must include at least two samples.`);
  }

  const targetSlope = constants.k_B / (4 * constants.A_align);
  const slopes = [];
  for (let i = 1; i < samples.length; i += 1) {
    const previous = samples[i - 1];
    const current = samples[i];
    const previousArea = finiteNumber(previous.area_effective, `${key}.area_samples[${i - 1}].area_effective`);
    const currentArea = finiteNumber(current.area_effective, `${key}.area_samples[${i}].area_effective`);
    const deltaArea = currentArea - previousArea;
    if (Math.abs(deltaArea) < epsilon) {
      throw new Error(`${key}.area_samples[${i}] must change area_effective.`);
    }
    const previousEntropy = entropyFromCount(
      previous.boundary_label_count,
      constants,
      `${key}.area_samples[${i - 1}].boundary_label_count`
    );
    const currentEntropy = entropyFromCount(
      current.boundary_label_count,
      constants,
      `${key}.area_samples[${i}].boundary_label_count`
    );
    const slope = (currentEntropy - previousEntropy) / deltaArea;
    slopes.push({
      from_area: previousArea,
      to_area: currentArea,
      slope,
      residual: Math.abs(slope - targetSlope) / (Math.abs(targetSlope) + epsilon),
    });
  }

  return {
    target_slope: targetSlope,
    slopes,
    max_residual: Math.max(...slopes.map((entry) => entry.residual)),
  };
}

function recordValues(recordChannels = {}) {
  return {
    metric: recordChannels.metric,
    entropy_labels: recordChannels.entropy_labels,
    temperature: recordChannels.temperature,
    flux: recordChannels.flux,
    weak_field: recordChannels.weak_field,
  };
}

function recordSplitFailures(observation, key) {
  const records = recordValues(asObject(observation.record_channels, `${key}.record_channels`));
  const base = records.metric;
  if (!base) {
    throw new Error(`${key}.record_channels.metric is required.`);
  }
  const failures = [];
  if (records.entropy_labels !== base) {
    failures.push({
      channel: "entropy_labels",
      expected_record: base,
      actual_record: records.entropy_labels ?? null,
      failure_code: "thermo-label-coverage-open",
    });
  }
  if (records.temperature !== base) {
    failures.push({
      channel: "temperature",
      expected_record: base,
      actual_record: records.temperature ?? null,
      failure_code: "thermo-temperature-split-open",
    });
  }
  if (records.flux !== base) {
    failures.push({
      channel: "flux",
      expected_record: base,
      actual_record: records.flux ?? null,
      failure_code: "thermo-flux-split-open",
    });
  }
  if (records.weak_field !== base) {
    failures.push({
      channel: "weak_field",
      expected_record: base,
      actual_record: records.weak_field ?? null,
      failure_code: "thermo-ppn-split-open",
    });
  }
  return { records, failures };
}

function weakFieldFailures(observation, key) {
  const gates = asObject(observation.weak_field_gates ?? {}, `${key}.weak_field_gates`);
  return Object.entries(gates)
    .filter(([, value]) => value !== true && value !== "pass")
    .map(([name, value]) => ({ name, value }));
}

function evaluateObservation(observation, index, constants, thresholds, epsilon) {
  const key = observationKey(observation, index);
  const initialCount = positiveNumber(
    observation.boundary_label_count_initial,
    `${key}.boundary_label_count_initial`
  );
  const finalCount = positiveNumber(
    observation.boundary_label_count_final,
    `${key}.boundary_label_count_final`
  );
  const entropyInitial = entropyFromCount(initialCount, constants, `${key}.boundary_label_count_initial`);
  const entropyFinal = entropyFromCount(finalCount, constants, `${key}.boundary_label_count_final`);
  const entropyChange = entropyFinal - entropyInitial;
  const temperature = computeTemperature(observation, constants, key);
  const flux = computeFlux(observation, key);
  const regionEnergyChange = finiteNumber(
    observation.region_energy_change,
    `${key}.region_energy_change`
  );
  const area = computeAreaResidual(observation, constants, epsilon, key);
  const thermodynamicResidual =
    Math.abs(flux - temperature * entropyChange) /
    (Math.abs(flux) + temperature * Math.abs(entropyChange) + epsilon);
  const conservationResidual =
    Math.abs(regionEnergyChange + flux) /
    (Math.abs(regionEnergyChange) + Math.abs(flux) + epsilon);
  const { records, failures: recordFailures } = recordSplitFailures(observation, key);
  const weakFailures = weakFieldFailures(observation, key);
  const coveragePass = finalCount >= thresholds.min_boundary_labels;

  return {
    key,
    observer_id: observation.observer_id ?? null,
    patch_id: observation.patch_id ?? null,
    record_channels: records,
    boundary_label_count_initial: initialCount,
    boundary_label_count_final: finalCount,
    entropy_initial: entropyInitial,
    entropy_final: entropyFinal,
    entropy_change: entropyChange,
    temperature,
    flux,
    region_energy_change: regionEnergyChange,
    area,
    thermodynamic_residual: thermodynamicResidual,
    conservation_residual: conservationResidual,
    coverage_pass: coveragePass,
    record_split_failures: recordFailures,
    weak_field_failures: weakFailures,
  };
}

function evaluateNegativeControls(inputControls = []) {
  if (!Array.isArray(inputControls)) {
    throw new Error("negative_controls must be an array when provided.");
  }
  const controls = inputControls.map((control, index) => {
    const name = control.name ?? `negative-control-${index}`;
    const failureCode = control.failure_code ?? null;
    return {
      name,
      failure_code: failureCode,
      passed_when_should_fail: failureCode === null,
      expected_failure: control.expected_failure ?? null,
    };
  });
  return {
    controls,
    passed_when_should_fail: controls.filter((control) => control.passed_when_should_fail),
  };
}

function firstFailureCode(gates) {
  const failed = Object.entries(gates).find(([, entry]) => entry.status !== "pass");
  return failed ? failed[1].failure_code : null;
}

function evaluate(input, inputPath) {
  const constants = mergeConstants(input.constants);
  const epsilon = positiveNumber(input.epsilon ?? DEFAULT_EPSILON, "epsilon");
  const thresholdsInput = asObject(input.thresholds ?? {}, "thresholds");
  const thresholds = {
    min_boundary_labels: positiveNumber(thresholdsInput.min_boundary_labels ?? 1, "thresholds.min_boundary_labels"),
    area_residual_max: nonnegativeNumber(thresholdsInput.area_residual_max ?? Infinity, "thresholds.area_residual_max"),
    thermodynamic_residual_max: nonnegativeNumber(
      thresholdsInput.thermodynamic_residual_max ?? Infinity,
      "thresholds.thermodynamic_residual_max"
    ),
    conservation_residual_max: nonnegativeNumber(
      thresholdsInput.conservation_residual_max ?? Infinity,
      "thresholds.conservation_residual_max"
    ),
  };
  const observations = Array.isArray(input.observations) ? input.observations : [];
  if (observations.length === 0) {
    throw new Error("observations must include at least one local-horizon packet row.");
  }

  const rows = observations.map((observation, index) =>
    evaluateObservation(observation, index, constants, thresholds, epsilon)
  );
  const negativeControls = evaluateNegativeControls(input.negative_controls);

  const labelCoverageFailures = rows.filter((row) => !row.coverage_pass);
  const recordSplitFailures = rows.flatMap((row) =>
    row.record_split_failures.map((failure) => ({ key: row.key, ...failure }))
  );
  const weakFailures = rows.flatMap((row) =>
    row.weak_field_failures.map((failure) => ({ key: row.key, ...failure }))
  );
  const maxAreaResidual = Math.max(...rows.map((row) => row.area.max_residual));
  const maxThermodynamicResidual = Math.max(...rows.map((row) => row.thermodynamic_residual));
  const maxConservationResidual = Math.max(...rows.map((row) => row.conservation_residual));
  const temperatureSplits = recordSplitFailures.filter((entry) => entry.failure_code === "thermo-temperature-split-open");
  const fluxSplits = recordSplitFailures.filter((entry) => entry.failure_code === "thermo-flux-split-open");
  const weakSplits = recordSplitFailures.filter((entry) => entry.failure_code === "thermo-ppn-split-open");

  const gates = {
    label_coverage: gate(
      labelCoverageFailures.length === 0 ? "pass" : "fail",
      labelCoverageFailures.map((row) => row.key),
      `each row has at least ${thresholds.min_boundary_labels} retained labels`,
      "thermo-label-coverage-open"
    ),
    temperature_same_record: gate(
      temperatureSplits.length === 0 ? "pass" : "fail",
      temperatureSplits,
      "temperature channel uses the metric record",
      "thermo-temperature-split-open"
    ),
    flux_same_record: gate(
      fluxSplits.length === 0 ? "pass" : "fail",
      fluxSplits,
      "flux channel uses the metric record",
      "thermo-flux-split-open"
    ),
    area_scaling: gate(
      maxAreaResidual <= thresholds.area_residual_max ? "pass" : "fail",
      maxAreaResidual,
      thresholds.area_residual_max,
      "thermo-area-scaling-open"
    ),
    thermodynamic_residual: gate(
      maxThermodynamicResidual <= thresholds.thermodynamic_residual_max ? "pass" : "fail",
      maxThermodynamicResidual,
      thresholds.thermodynamic_residual_max,
      "thermo-residual-open"
    ),
    conservation: gate(
      maxConservationResidual <= thresholds.conservation_residual_max ? "pass" : "fail",
      maxConservationResidual,
      thresholds.conservation_residual_max,
      "thermo-conservation-open"
    ),
    weak_field_same_record: gate(
      weakSplits.length === 0 && weakFailures.length === 0 ? "pass" : "fail",
      { record_splits: weakSplits, weak_field_failures: weakFailures },
      "same record passes weak-field ADM/Cartan and PPN gates",
      "thermo-ppn-split-open"
    ),
    negative_controls: gate(
      negativeControls.passed_when_should_fail.length === 0 ? "pass" : "fail",
      negativeControls.passed_when_should_fail,
      "all declared negative controls fail their local-horizon packet",
      "thermo-negative-control-open"
    ),
  };

  const failureCode = firstFailureCode(gates);
  return {
    schema: "thermodynamic-residual-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    metadata: input.metadata ?? {},
    constants,
    epsilon,
    observations: rows,
    negative_controls: negativeControls.controls,
    totals: {
      max_area_residual: maxAreaResidual,
      max_thermodynamic_residual: maxThermodynamicResidual,
      max_conservation_residual: maxConservationResidual,
      negative_controls_passed_when_should_fail: negativeControls.passed_when_should_fail.length,
    },
    gates,
    failure_code: failureCode,
    promotion_status: failureCode ? "mock_packet_rejected" : "mock_packet_pass",
    note:
      "This is a mock validation scaffold for the local-horizon thermodynamic residual. Passing it does not validate emergent gravity; it only confirms that the packet shape and same-record gates are coherent.",
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
  const result = evaluate(input, inputPath);
  const output = JSON.stringify(result, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

main();

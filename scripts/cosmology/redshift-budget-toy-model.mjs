#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "redshift-budget-mock.json");
const DEFAULT_C0_KM_S = 299792.458;
const DEFAULT_H_J_S = 6.62607015e-34;
const DEFAULT_MPC_KM = 3.0856775814913673e19;
const DARK_ENERGY_COMPONENTS = [
  { key: "rho", aliases: ["rho", "q_rho"] },
  { key: "w", aliases: ["w", "q_w"] },
  { key: "sea", aliases: ["sea", "q_sea"] },
  { key: "bh", aliases: ["bh", "BH", "q_bh", "q_BH"] },
];

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
  console.log(`Usage: node scripts/cosmology/redshift-budget-toy-model.mjs [options]

Options:
  --input PATH  Redshift-budget input packet. Defaults to scripts/cosmology/redshift-budget-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This replays the toy redshift-budget map:
  Y_{j+1} = Y_j + alpha_prop,j * Delta s_j
  Z_X = ln Gamma_E - ln Gamma_R + Y_N - ln B_X(E) - ln D_v.
Named transport terms and dark-energy coefficient packets, when present, are added into alpha_prop,j.
It is a fixture for closure work, not an empirical cosmology fitter.`);
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

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function lineScopedValue(container, lineKey, label) {
  if (container === undefined) {
    return undefined;
  }
  if (!container || typeof container !== "object" || Array.isArray(container)) {
    throw new Error(`${label} must be an object.`);
  }
  return Object.prototype.hasOwnProperty.call(container, lineKey) ? container[lineKey] : undefined;
}

function lineFamily(packet, lineKey) {
  const line = packet.line_families?.[lineKey];
  if (!line || typeof line !== "object") {
    throw new Error(`Missing line family: ${lineKey}`);
  }
  return {
    key: lineKey,
    nuRefHz: positiveNumber(line.nu_ref_hz, `line_families.${lineKey}.nu_ref_hz`),
  };
}

function valueByAliases(object, aliases, label) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    throw new Error(`${label} must be an object.`);
  }
  const alias = aliases.find((candidate) => Object.prototype.hasOwnProperty.call(object, candidate));
  return alias === undefined ? 0 : finiteNumber(object[alias], `${label}.${alias}`);
}

function darkEnergyRecordFromSegment(segment, lineKey, channel = "frequency") {
  const byLineKey = channel === "cadence" ? "dark_energy_transport_cadence_by_line" : "dark_energy_transport_by_line";
  const scalarKey = channel === "cadence" ? "dark_energy_transport_cadence" : "dark_energy_transport";
  const byLineRecord = lineScopedValue(segment[byLineKey], lineKey, byLineKey);
  const raw = byLineRecord ?? segment[scalarKey];

  if (raw === undefined && channel === "cadence") {
    return darkEnergyRecordFromSegment(segment, lineKey, "frequency");
  }
  if (raw === undefined) {
    return null;
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${byLineKey}.${lineKey} must be a dark-energy coefficient object.`);
  }
  return raw;
}

function darkEnergyTermsFromSegment(segment, lineKey, constants, channel = "frequency") {
  const record = darkEnergyRecordFromSegment(segment, lineKey, channel);
  if (record === null) {
    return {};
  }

  const lambdaRow = record.lambda_row;
  const qPerMpc = record.q_DE_per_mpc;
  const qPerSecond = record.q_DE_per_s;
  if (qPerMpc === undefined && qPerSecond === undefined) {
    throw new Error(`dark_energy_transport for ${lineKey} must define q_DE_per_mpc or q_DE_per_s.`);
  }

  const cGammaKmS = positiveNumber(
    record.c_gamma_km_s ?? constants.c_gamma_km_s ?? constants.c0_km_s ?? DEFAULT_C0_KM_S,
    `dark_energy_transport.${lineKey}.c_gamma_km_s`
  );
  const mpcKm = positiveNumber(constants.mpc_km ?? DEFAULT_MPC_KM, "constants.mpc_km");
  const perSecondToPerMpc = mpcKm / cGammaKmS;
  const qLabel = qPerMpc === undefined ? "q_DE_per_s" : "q_DE_per_mpc";
  const qRecord = qPerMpc ?? qPerSecond;
  const qScale = qPerMpc === undefined ? perSecondToPerMpc : 1;

  return Object.fromEntries(
    DARK_ENERGY_COMPONENTS.map(({ key, aliases }) => {
      const lambda = valueByAliases(lambdaRow, aliases, `dark_energy_transport.${lineKey}.lambda_row`);
      const q = valueByAliases(qRecord, aliases, `dark_energy_transport.${lineKey}.${qLabel}`);
      return [`dark_energy.${key}`, lambda * q * qScale];
    })
  );
}

function transportTermsFromSegment(segment, lineKey, constants, channel = "frequency") {
  const byLineKey = channel === "cadence" ? "transport_terms_cadence_by_line" : "transport_terms_by_line";
  const scalarKey = channel === "cadence" ? "transport_terms_cadence" : "transport_terms";
  let raw = null;
  let label = null;

  if (segment[byLineKey] && Object.prototype.hasOwnProperty.call(segment[byLineKey], lineKey)) {
    raw = segment[byLineKey][lineKey];
    label = `${byLineKey}.${lineKey}`;
  } else if (segment[scalarKey] !== undefined) {
    raw = segment[scalarKey];
    label = scalarKey;
  } else if (channel === "cadence") {
    return transportTermsFromSegment(segment, lineKey, constants, "frequency");
  }

  if (raw === null) {
    return darkEnergyTermsFromSegment(segment, lineKey, constants, channel);
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${label} must be an object of named finite-number transport terms.`);
  }

  return {
    ...Object.fromEntries(
      Object.entries(raw).map(([key, value]) => [key, finiteNumber(value, `${label}.${key}`)])
    ),
    ...darkEnergyTermsFromSegment(segment, lineKey, constants, channel),
  };
}

function sumTransportTerms(terms) {
  return Object.values(terms).reduce((sum, value) => sum + value, 0);
}

function alphaFromSegment(segment, lineKey, constants, channel = "frequency") {
  const byLineKey = channel === "cadence" ? "alpha_prop_cadence_by_line" : "alpha_prop_by_line";
  const scalarKey = channel === "cadence" ? "alpha_prop_cadence" : "alpha_prop";
  const transportTerms = transportTermsFromSegment(segment, lineKey, constants, channel);
  const transportAlpha = sumTransportTerms(transportTerms);

  if (segment[byLineKey] && Object.prototype.hasOwnProperty.call(segment[byLineKey], lineKey)) {
    return finiteNumber(segment[byLineKey][lineKey], `${byLineKey}.${lineKey}`) + transportAlpha;
  }
  if (segment[scalarKey] !== undefined) {
    return finiteNumber(segment[scalarKey], scalarKey) + transportAlpha;
  }
  if (transportAlpha !== 0 || Object.keys(transportTerms).length > 0) {
    return transportAlpha;
  }
  if (channel === "cadence") {
    return alphaFromSegment(segment, lineKey, constants, "frequency");
  }
  throw new Error(`Segment is missing alpha_prop for line family ${lineKey}.`);
}

function beamAlphasFromSegment(segment, lineKey) {
  const byLine = segment.beam_alpha_prop_by_line;
  const raw = byLine && Object.prototype.hasOwnProperty.call(byLine, lineKey)
    ? byLine[lineKey]
    : segment.beam_alpha_prop;
  if (raw === undefined) {
    return null;
  }
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error(`beam_alpha_prop for ${lineKey} must be a nonempty array.`);
  }
  return raw.map((value, index) => finiteNumber(value, `beam_alpha_prop[${index}]`));
}

function integrateY(segments, lineKey, constants, channel = "frequency") {
  return segments.reduce((sum, segment, index) => {
    const deltaS = positiveNumber(segment.delta_s_mpc, `segments[${index}].delta_s_mpc`);
    return sum + alphaFromSegment(segment, lineKey, constants, channel) * deltaS;
  }, 0);
}

function integrateTransportTerms(segments, lineKey, constants, channel = "frequency") {
  return segments.reduce((totals, segment, index) => {
    const deltaS = positiveNumber(segment.delta_s_mpc, `segments[${index}].delta_s_mpc`);
    const terms = transportTermsFromSegment(segment, lineKey, constants, channel);
    Object.entries(terms).forEach(([key, value]) => {
      totals[key] = (totals[key] ?? 0) + value * deltaS;
    });
    return totals;
  }, {});
}

function integrateBeamY(segments, lineKey, constants) {
  const beamCount = segments.reduce((count, segment) => {
    const beamAlphas = beamAlphasFromSegment(segment, lineKey);
    return beamAlphas ? Math.max(count, beamAlphas.length) : count;
  }, 0);
  if (beamCount === 0) {
    return [];
  }

  return Array.from({ length: beamCount }, (_, beamIndex) =>
    segments.reduce((sum, segment, segmentIndex) => {
      const deltaS = positiveNumber(segment.delta_s_mpc, `segments[${segmentIndex}].delta_s_mpc`);
      const beamAlphas = beamAlphasFromSegment(segment, lineKey);
      const alpha = beamAlphas
        ? finiteNumber(beamAlphas[Math.min(beamIndex, beamAlphas.length - 1)], `beam[${beamIndex}]`)
        : alphaFromSegment(segment, lineKey, constants, "frequency");
      return sum + alpha * deltaS;
    }, 0)
  );
}

function variance(values) {
  if (values.length === 0) {
    return 0;
  }
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

function evaluateScenario(packet, scenario, index) {
  const name = scenario.name ?? `scenario_${index}`;
  const line = lineFamily(packet, scenario.line_family);
  const comparisonLineKey = scenario.comparison_line_family;
  const comparisonLine = comparisonLineKey ? lineFamily(packet, comparisonLineKey) : null;
  const segments = Array.isArray(scenario.segments) ? scenario.segments : [];
  if (segments.length === 0) {
    throw new Error(`${name}.segments must be a nonempty array.`);
  }

  const constants = packet.constants && typeof packet.constants === "object" ? packet.constants : {};
  const c0KmS = positiveNumber(constants.c0_km_s ?? DEFAULT_C0_KM_S, "constants.c0_km_s");
  const hJs = positiveNumber(constants.h_j_s ?? DEFAULT_H_J_S, "constants.h_j_s");

  const distanceMpc = positiveNumber(
    scenario.distance_mpc ?? segments.reduce((sum, segment) => sum + positiveNumber(segment.delta_s_mpc, "delta_s_mpc"), 0),
    `${name}.distance_mpc`
  );
  const sourceBranch = positiveNumber(scenario.B_X_E ?? 1, `${name}.B_X_E`);
  const launchFactor = positiveNumber(scenario.D_v ?? 1, `${name}.D_v`);
  const gammaEmitter = positiveNumber(scenario.Gamma_N_E ?? 1, `${name}.Gamma_N_E`);
  const gammaReceiver = positiveNumber(scenario.Gamma_N_R ?? 1, `${name}.Gamma_N_R`);

  const yProp = integrateY(segments, line.key, constants, "frequency");
  const yCadence = integrateY(segments, line.key, constants, "cadence");
  const yComparison = comparisonLine ? integrateY(segments, comparisonLine.key, constants, "frequency") : null;
  const beamY = integrateBeamY(segments, line.key, constants);
  const transportTerms = integrateTransportTerms(segments, line.key, constants, "frequency");
  const transportTermsCadence = integrateTransportTerms(segments, line.key, constants, "cadence");

  const zLog =
    Math.log(gammaEmitter) -
    Math.log(gammaReceiver) +
    yProp -
    Math.log(sourceBranch) -
    Math.log(launchFactor);
  const redshift = Math.exp(zLog) - 1;
  const nuObsHz = line.nuRefHz * Math.exp(-zLog);
  const energyObsJ = hJs * nuObsHz;
  const hEffKmSPerMpc = c0KmS * yProp / distanceMpc;

  return {
    name,
    description: scenario.description ?? null,
    line_family: line.key,
    distance_mpc: distanceMpc,
    factors: {
      Gamma_N_E: gammaEmitter,
      Gamma_N_R: gammaReceiver,
      B_X_E: sourceBranch,
      D_v: launchFactor,
      P_E_to_R: Math.exp(yProp),
    },
    diagnostics: {
      Z_prop_X: yProp,
      Z_total_X: zLog,
      redshift_z: redshift,
      inferred_H_eff_km_s_Mpc: hEffKmSPerMpc,
      chromaticity_residual: yComparison === null ? null : Math.abs(yProp - yComparison),
      image_bundle_variance: variance(beamY),
      time_dilation_residual: Math.abs(yProp - yCadence),
    },
    transport_term_logs: {
      frequency: transportTerms,
      cadence: transportTermsCadence,
    },
    observables: {
      nu_obs_hz: nuObsHz,
      E_obs_j: energyObsJ,
    },
    component_logs: {
      endpoint: Math.log(gammaEmitter) - Math.log(gammaReceiver),
      propagation: yProp,
      source_branch: -Math.log(sourceBranch),
      launch: -Math.log(launchFactor),
    },
    beam_Y_values: beamY,
  };
}

function evaluatePacket(packet) {
  const scenarios = Array.isArray(packet.scenarios) ? packet.scenarios : [];
  if (scenarios.length === 0) {
    throw new Error("Input packet must contain at least one scenario.");
  }

  return {
    schema: "aaa-redshift-budget-toy-output/v1",
    metadata: packet.metadata ?? {},
    scenarios: scenarios.map((scenario, index) => evaluateScenario(packet, scenario, index)),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const packet = readJson(args.input);
  const output = evaluatePacket(packet);
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

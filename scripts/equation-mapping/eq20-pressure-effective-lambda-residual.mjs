#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {
  EQ20_DELTA_P_EFF_REPORT_ROWS,
  pressureProjectionEvidenceStatusForPath,
} from "./eq20-delta-p-eff-pressure-projection-evidence.mjs";
import { providerEvidenceStatusForPath } from "../spacetime/noether-sea-density-compression-provider-evidence.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-eq20-pressure-effective-lambda-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-eq20-pressure-effective-lambda-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const PRESSURE_PROJECTION_REPORT_ROW_SET = new Set(EQ20_DELTA_P_EFF_REPORT_ROWS);

const REQUIRED_ROWS = [
  "theta_sea_rho_NS",
  "theta_11_20",
  "noether_sea_window",
  "constitutive_response",
  "pressure_law_row",
  "sea_pressure_row",
  "sea_tension_row",
  "relaxation_memory_row",
  "effective_density_row",
  "effective_pressure_row",
  "effective_coupling_row",
  "effective_lambda_row",
  "frw_handoff",
  "source_provenance",
  "no_hidden_retune_witness",
];

const EXPECTED_SHARED_KEYS = [
  "theta_11_20_id",
  "theta_cos_id",
  "rho_NS",
  "n",
  "chi_sea",
  "Gamma_N",
  "u_sea",
  "M_sea_ab",
  "G_eff",
  "rho_DE_eff",
  "p_sea",
  "p_DE_eff",
  "w_eff",
  "Lambda_eff",
  "tau_rel",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  pressure: 1e-9,
  outerBinaryStrain: 1e-9,
  releaseChannel: 1e-9,
  pressureProjection: 1e-9,
  equationOfState: 1e-9,
  lambda: 1e-9,
  frwHandoff: 1e-9,
  sharedKey: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}
if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluateEq20PressureEffectiveLambda(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    out: null,
    pretty: false,
    summary: false,
    requirePopulated: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      parsed.input = argv[++index];
    } else if (arg === "--out") {
      parsed.out = argv[++index];
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--require-populated") {
      parsed.requirePopulated = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/eq20-pressure-effective-lambda-residual.mjs --input PATH [options]

Options:
  --input PATH          EQ-20 pressure/effective-Lambda residual input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-20 pressure/effective-Lambda
residual. Attempt rows, split carriers, fitted-Lambda-only rows, inherited
FRW handoff splits, and hidden retunes never raise equation scores.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(output, parsedArgs) {
  const payload = parsedArgs.summary ? summarizeOutput(output) : output;
  const text = JSON.stringify(payload, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function evaluateEq20PressureEffectiveLambda(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const constants = parseConstants(input.constants ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId], rowId)]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId);
  const sharedKeys = evaluateSharedKeys(packet.sharedKeys ?? [], tolerances);
  const pressure = evaluatePressure(packet.pressureLaw ?? packet.pressure ?? {}, tolerances);
  const outerBinaryStrain = evaluateOuterBinaryStrain(
    packet.outerBinaryStrain ?? packet.outerBinary ?? {},
    tolerances,
  );
  const releaseChannelAvailability = evaluateReleaseChannelAvailability(
    packet.releaseChannelAvailability ?? packet.releaseChannel ?? {},
    tolerances,
  );
  const pressureProjection = evaluatePressureProjection(
    packet.pressureProjection ?? {},
    tolerances,
  );
  const equationOfState = evaluateEquationOfState(
    packet.equationOfState ?? packet.eos ?? {},
    constants,
    tolerances,
  );
  const lambdaProjection = evaluateLambda(
    packet.lambdaProjection ?? packet.lambda ?? {},
    constants,
    tolerances,
  );
  const frwHandoff = evaluateFrwHandoff(packet.frwHandoff ?? {}, tolerances);
  const sourceProvenance = evaluateSourceProvenance(
    packet.sourceProvenance ?? {},
    tolerances,
  );
  const noHiddenRetune = evaluateScalarResidual(
    packet.noHiddenRetune?.residual ?? packet.noHiddenRetune?.maxResidual,
    tolerances.retune,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    sharedKeys,
    pressure,
    outerBinaryStrain,
    releaseChannelAvailability,
    pressureProjection,
    equationOfState,
    lambdaProjection,
    frwHandoff,
    sourceProvenance,
    noHiddenRetune,
  });

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    residual: {
      id: input.residualId ?? packet.id ?? null,
      row: "EQ-20",
      supportedRows: ["EQ-06", "EQ-11", "EQ-18", "EQ-19", "EQ-20", "EQ-24", "EQ-32"],
      claimLevel:
        "score-neutral pressure/effective-Lambda residual; accepted retained rows are required before score review",
    },
    constants,
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      missingSharedKeys: sharedKeys.missingSharedKeys,
      sharedKeyMismatchCount: sharedKeys.mismatches.length,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        carrierBinding,
        sharedKeys,
        pressure,
        outerBinaryStrain,
        releaseChannelAvailability,
        pressureProjection,
        equationOfState,
        lambdaProjection,
        frwHandoff,
        sourceProvenance,
        noHiddenRetune,
      }),
      constitutiveCarrierPass: carrierBinding.passed,
      sharedKeysAccepted: sharedKeys.accepted,
      hiddenRetuneNumericPass: sharedKeys.hiddenRetuneNumericPass,
      pressureLawComputed: pressure.computed,
      pressureResidual: pressure.residual,
      pressureResidualPass: pressure.passed,
      outerBinaryStrainComputed: outerBinaryStrain.computed,
      outerBinaryStrainResidual: outerBinaryStrain.strainResidual,
      outerBinaryStoredEnergyResidual: outerBinaryStrain.storedEnergyResidual,
      outerBinaryStrainPass: outerBinaryStrain.passed,
      releaseChannelComputed: releaseChannelAvailability.computed,
      releaseChannelCurrentResidual: releaseChannelAvailability.currentResidual,
      releaseChannelBalanceResidual: releaseChannelAvailability.noCurrentResidual,
      releaseChannelPass: releaseChannelAvailability.passed,
      pressureProjectionComputed: pressureProjection.computed,
      pressureProjectionSeaResidual: pressureProjection.seaPressureResidual,
      pressureProjectionEffectiveResidual: pressureProjection.effectivePressureResidual,
      pressureProjectionPass: pressureProjection.passed,
      equationOfStateComputed: equationOfState.computed,
      wEff: equationOfState.w_eff,
      wBench: equationOfState.wBench,
      equationOfStateResidual: equationOfState.residual,
      equationOfStateBenchmarkResidual: equationOfState.benchmarkResidual,
      equationOfStateResidualPass: equationOfState.passed,
      lambdaProjectionComputed: lambdaProjection.computed,
      lambdaProjectionResidual: lambdaProjection.residual,
      lambdaProjectionResidualPass: lambdaProjection.passed,
      frwHandoffAccepted: frwHandoff.accepted,
      frwHandoffPass: frwHandoff.passed,
      inheritedFrwBlocker: frwHandoff.inheritedBlocker,
      sourceProvenancePass: sourceProvenance.passed,
      hiddenRetunePass: noHiddenRetune.passed,
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          providerEvidence: rowChecks[rowId].providerEvidence ?? null,
          pressureProjectionEvidence: rowChecks[rowId].pressureProjectionEvidence ?? null,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    sharedKeys,
    pressure,
    outerBinaryStrain,
    releaseChannelAvailability,
    pressureProjection,
    equationOfState,
    lambdaProjection,
    frwHandoff,
    sourceProvenance,
    noHiddenRetune,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rows: output.rows,
    carrierBinding: output.carrierBinding,
    sharedKeys: {
      accepted: output.sharedKeys.accepted,
      missingSharedKeys: output.sharedKeys.missingSharedKeys,
      hiddenRetuneNumericPass: output.sharedKeys.hiddenRetuneNumericPass,
      mismatches: output.sharedKeys.mismatches,
    },
    pressure: output.pressure,
    outerBinaryStrain: output.outerBinaryStrain,
    releaseChannelAvailability: output.releaseChannelAvailability,
    pressureProjection: output.pressureProjection,
    equationOfState: output.equationOfState,
    lambdaProjection: output.lambdaProjection,
    frwHandoff: output.frwHandoff,
    sourceProvenance: output.sourceProvenance,
    noHiddenRetune: output.noHiddenRetune,
  };
}

function parseConstants(raw) {
  return {
    c0: positiveNumber(raw.c0 ?? 1, "constants.c0"),
    pi: positiveNumber(raw.pi ?? Math.PI, "constants.pi"),
  };
}

function parseTolerances(raw) {
  return {
    carrier: positiveNumber(raw.carrier ?? DEFAULT_TOLERANCES.carrier, "tolerances.carrier"),
    pressure: positiveNumber(
      raw.pressure ?? DEFAULT_TOLERANCES.pressure,
      "tolerances.pressure",
    ),
    outerBinaryStrain: positiveNumber(
      raw.outerBinaryStrain ?? DEFAULT_TOLERANCES.outerBinaryStrain,
      "tolerances.outerBinaryStrain",
    ),
    releaseChannel: positiveNumber(
      raw.releaseChannel ?? DEFAULT_TOLERANCES.releaseChannel,
      "tolerances.releaseChannel",
    ),
    pressureProjection: positiveNumber(
      raw.pressureProjection ?? DEFAULT_TOLERANCES.pressureProjection,
      "tolerances.pressureProjection",
    ),
    equationOfState: positiveNumber(
      raw.equationOfState ?? DEFAULT_TOLERANCES.equationOfState,
      "tolerances.equationOfState",
    ),
    lambda: positiveNumber(raw.lambda ?? DEFAULT_TOLERANCES.lambda, "tolerances.lambda"),
    frwHandoff: positiveNumber(
      raw.frwHandoff ?? DEFAULT_TOLERANCES.frwHandoff,
      "tolerances.frwHandoff",
    ),
    sharedKey: positiveNumber(
      raw.sharedKey ?? DEFAULT_TOLERANCES.sharedKey,
      "tolerances.sharedKey",
    ),
    sourceProvenance: positiveNumber(
      raw.sourceProvenance ?? DEFAULT_TOLERANCES.sourceProvenance,
      "tolerances.sourceProvenance",
    ),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune, "tolerances.retune"),
  };
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowCarrierIds = REQUIRED_ROWS.map((rowId) => ({
    rowId,
    carrierId: rows[rowId]?.carrierId ?? null,
  }));
  const expectedCarrierId =
    commonCarrierId ?? rowCarrierIds.find((row) => concreteString(row.carrierId))?.carrierId ?? null;
  const missingCarrierRows = rowCarrierIds
    .filter((row) => row.carrierId !== expectedCarrierId)
    .map((row) => row.rowId);
  const passed = concreteString(expectedCarrierId) && missingCarrierRows.length === 0;
  return {
    commonCarrierId: expectedCarrierId,
    passed,
    missingCarrierRows,
    rowCarrierIds,
    reason: passed ? "passed" : "eq20_pressure_lambda_rows_do_not_share_common_carrier",
  };
}

function evaluateSharedKeys(rawKeys, tolerances) {
  const keyRows = new Map(
    (Array.isArray(rawKeys) ? rawKeys : []).map((row) => [row.key, row]),
  );
  const keys = Object.fromEntries(
    EXPECTED_SHARED_KEYS.map((key) => {
      const row = keyRows.get(key);
      const check = evaluateAcceptedRow(row);
      const comparison = compareProjectionValues(row?.projectionValues ?? {}, tolerances);
      return [
        key,
        {
          status: normalizeStatus(row),
          accepted: check.accepted,
          reason: check.reason,
          sourcePath: row?.sourcePath ?? row?.source ?? null,
          values: row?.projectionValues ?? {},
          mismatch: comparison.mismatch,
          maxDelta: comparison.maxDelta,
          pass: comparison.pass,
        },
      ];
    }),
  );
  const missingSharedKeys = EXPECTED_SHARED_KEYS.filter(
    (key) => !keys[key].accepted,
  );
  const mismatches = Object.entries(keys)
    .filter(([, value]) => value.mismatch)
    .map(([key, value]) => ({
      key,
      maxDelta: value.maxDelta,
    }));
  return {
    accepted: missingSharedKeys.length === 0,
    allExpectedKeysDeclared: EXPECTED_SHARED_KEYS.every((key) => keyRows.has(key)),
    missingSharedKeys,
    expectedKeys: EXPECTED_SHARED_KEYS,
    hiddenRetuneNumericPass: mismatches.length === 0,
    mismatches,
    keys,
  };
}

function compareProjectionValues(projectionValues, tolerances) {
  const values = Object.values(projectionValues)
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  if (values.length < 2) {
    return { mismatch: false, maxDelta: 0, pass: true };
  }
  let maxDelta = 0;
  for (let index = 0; index < values.length; index += 1) {
    for (let other = index + 1; other < values.length; other += 1) {
      maxDelta = Math.max(maxDelta, Math.abs(values[index] - values[other]));
    }
  }
  return {
    mismatch: maxDelta > tolerances.sharedKey,
    maxDelta,
    pass: maxDelta <= tolerances.sharedKey,
  };
}

function evaluatePressure(raw, tolerances) {
  const p_DE_eff = finiteNumberOrNull(raw.p_DE_eff ?? raw.pEff ?? raw.P_eff);
  const projectedSeaPressure = finiteNumberOrNull(
    raw.pSeaProjected ?? raw.projectedSeaPressure ?? raw.Pi_DE_p_sea,
  );
  const residual =
    p_DE_eff !== null && projectedSeaPressure !== null
      ? Math.abs(p_DE_eff - projectedSeaPressure)
      : finiteNumberOrNull(raw.residual ?? raw.pressureResidual);
  return {
    computed: residual !== null,
    p_DE_eff,
    projectedSeaPressure,
    residual,
    tolerance: tolerances.pressure,
    passed: residual !== null && residual <= tolerances.pressure,
  };
}

function evaluateOuterBinaryStrain(raw, tolerances) {
  const R_outer = positiveNumberOrNull(raw.R_outer ?? raw.rOuter ?? raw.outerRadius);
  const R_eq = positiveNumberOrNull(raw.R_eq ?? raw.rEq ?? raw.equilibriumRadius);
  const epsilon_O = finiteNumberOrNull(raw.epsilon_O ?? raw.epsilonO ?? raw.strain);
  const computedEpsilon =
    R_outer !== null && R_eq !== null ? (R_outer - R_eq) / R_eq : null;
  const strainResidual =
    computedEpsilon !== null && epsilon_O !== null
      ? Math.abs(epsilon_O - computedEpsilon)
      : finiteNumberOrNull(raw.strainResidual ?? raw.epsilonResidual);
  const rho_NS = positiveNumberOrNull(raw.rho_NS ?? raw.rhoNs);
  const K_O = positiveNumberOrNull(raw.K_O ?? raw.kO ?? raw.stiffness);
  const u_O_str = finiteNumberOrNull(
    raw.u_O_str ?? raw.uStrain ?? raw.storedEnergyDensity,
  );
  const computedStoredEnergy =
    rho_NS !== null && K_O !== null && R_eq !== null && epsilon_O !== null
      ? rho_NS * 0.5 * K_O * R_eq ** 2 * epsilon_O ** 2
      : null;
  const storedEnergyResidual =
    computedStoredEnergy !== null && u_O_str !== null
      ? Math.abs(u_O_str - computedStoredEnergy)
      : finiteNumberOrNull(raw.storedEnergyResidual ?? raw.uStrainResidual);
  const residuals = [strainResidual, storedEnergyResidual].filter(
    (value) => value !== null,
  );
  const maxResidual = residuals.length > 0 ? Math.max(...residuals) : null;
  return {
    computed: strainResidual !== null && storedEnergyResidual !== null,
    R_outer,
    R_eq,
    epsilon_O,
    computedEpsilon,
    strainResidual,
    rho_NS,
    K_O,
    u_O_str,
    computedStoredEnergy,
    storedEnergyResidual,
    residual: maxResidual,
    tolerance: tolerances.outerBinaryStrain,
    passed: maxResidual !== null && maxResidual <= tolerances.outerBinaryStrain,
  };
}

function evaluateReleaseChannelAvailability(raw, tolerances) {
  const A_down = nonnegativeNumberOrNull(
    raw.A_down ?? raw.aDown ?? raw.availability,
  );
  const Gamma = nonnegativeNumberOrNull(
    raw.Gamma ?? raw.gamma ?? raw.transferRate,
  );
  const mu_source = finiteNumberOrNull(raw.mu_source ?? raw.muSource);
  const mu_acceptor = finiteNumberOrNull(
    raw.mu_acceptor ?? raw.muAcceptor ?? raw.mu_sink ?? raw.muSink,
  );
  const J_E_O = finiteNumberOrNull(raw.J_E_O ?? raw.jEnergy ?? raw.energyCurrent);
  const computedEnergyCurrent =
    A_down !== null && Gamma !== null && mu_source !== null && mu_acceptor !== null
      ? Gamma * A_down * (mu_source - mu_acceptor)
      : null;
  const currentResidual =
    computedEnergyCurrent !== null && J_E_O !== null
      ? Math.abs(J_E_O - computedEnergyCurrent)
      : finiteNumberOrNull(raw.currentResidual ?? raw.energyCurrentResidual);
  const noCurrentResidual = finiteNumberOrNull(
    raw.noCurrentResidual ?? raw.balanceResidual ?? raw.equilibriumResidual,
  );
  const residuals = [currentResidual, noCurrentResidual].filter(
    (value) => value !== null,
  );
  const maxResidual = residuals.length > 0 ? Math.max(...residuals) : null;
  return {
    computed: currentResidual !== null,
    A_down,
    Gamma,
    mu_source,
    mu_acceptor,
    J_E_O,
    computedEnergyCurrent,
    currentResidual,
    noCurrentResidual,
    residual: maxResidual,
    tolerance: tolerances.releaseChannel,
    passed: currentResidual !== null && maxResidual <= tolerances.releaseChannel,
  };
}

function evaluatePressureProjection(raw, tolerances) {
  const hTraceTension = finiteNumberOrNull(
    raw.hTraceTension ?? raw.h_ab_T_ab ?? raw.tensionTrace,
  );
  const p_kin = finiteNumberOrNull(raw.p_kin ?? raw.pKin ?? 0);
  const p_src = finiteNumberOrNull(raw.p_src ?? raw.pSrc ?? 0);
  const p_sea = finiteNumberOrNull(raw.p_sea ?? raw.pSea);
  const Pi_DE = finiteNumberOrNull(raw.Pi_DE ?? raw.piDE ?? raw.projectionFactor ?? 1);
  const p_DE_eff = finiteNumberOrNull(raw.p_DE_eff ?? raw.pEff ?? raw.P_eff);
  const computedSeaPressure =
    hTraceTension !== null && p_kin !== null && p_src !== null
      ? -hTraceTension / 3 + p_kin + p_src
      : null;
  const seaPressureResidual =
    computedSeaPressure !== null && p_sea !== null
      ? Math.abs(p_sea - computedSeaPressure)
      : finiteNumberOrNull(raw.seaPressureResidual);
  const computedEffectivePressure =
    Pi_DE !== null && p_sea !== null ? Pi_DE * p_sea : null;
  const effectivePressureResidual =
    computedEffectivePressure !== null && p_DE_eff !== null
      ? Math.abs(p_DE_eff - computedEffectivePressure)
      : finiteNumberOrNull(raw.effectivePressureResidual);
  const residuals = [seaPressureResidual, effectivePressureResidual].filter(
    (value) => value !== null,
  );
  const maxResidual = residuals.length > 0 ? Math.max(...residuals) : null;
  return {
    computed: seaPressureResidual !== null && effectivePressureResidual !== null,
    hTraceTension,
    p_kin,
    p_src,
    p_sea,
    Pi_DE,
    p_DE_eff,
    computedSeaPressure,
    seaPressureResidual,
    computedEffectivePressure,
    effectivePressureResidual,
    residual: maxResidual,
    tolerance: tolerances.pressureProjection,
    passed: maxResidual !== null && maxResidual <= tolerances.pressureProjection,
  };
}

function evaluateEquationOfState(raw, constants, tolerances) {
  const p_DE_eff = finiteNumberOrNull(raw.p_DE_eff ?? raw.pEff ?? raw.P_eff);
  const rho_DE_eff = positiveNumberOrNull(raw.rho_DE_eff ?? raw.rhoEff);
  const w_eff = finiteNumberOrNull(raw.w_eff ?? raw.wEff);
  const wBench = finiteNumberOrNull(raw.w_bench ?? raw.wBench);
  const computedW =
    p_DE_eff !== null && rho_DE_eff !== null
      ? p_DE_eff / (rho_DE_eff * constants.c0 ** 2)
      : null;
  const residual =
    computedW !== null && w_eff !== null
      ? Math.abs(w_eff - computedW)
      : finiteNumberOrNull(raw.residual ?? raw.equationOfStateResidual);
  const benchmarkResidual =
    w_eff !== null && wBench !== null
      ? Math.abs(w_eff - wBench)
      : finiteNumberOrNull(raw.benchmarkResidual);
  return {
    computed: residual !== null,
    p_DE_eff,
    rho_DE_eff,
    w_eff,
    wBench,
    computedW,
    residual,
    benchmarkResidual,
    tolerance: tolerances.equationOfState,
    passed:
      residual !== null &&
      residual <= tolerances.equationOfState &&
      (benchmarkResidual === null || benchmarkResidual <= tolerances.equationOfState),
  };
}

function evaluateLambda(raw, constants, tolerances) {
  const Lambda_eff = finiteNumberOrNull(raw.Lambda_eff ?? raw.lambdaEff);
  const G_eff = finiteNumberOrNull(raw.G_eff ?? raw.gEff);
  const rho_DE_eff = finiteNumberOrNull(raw.rho_DE_eff ?? raw.rhoEff);
  const target =
    G_eff !== null && rho_DE_eff !== null
      ? (8 * constants.pi * G_eff * rho_DE_eff) / constants.c0 ** 2
      : null;
  const residual =
    Lambda_eff !== null && target !== null
      ? Math.abs(Lambda_eff - target)
      : finiteNumberOrNull(raw.residual ?? raw.lambdaResidual);
  return {
    computed: residual !== null,
    Lambda_eff,
    G_eff,
    rho_DE_eff,
    target,
    residual,
    tolerance: tolerances.lambda,
    passed: residual !== null && residual <= tolerances.lambda,
  };
}

function evaluateFrwHandoff(raw, tolerances) {
  const residuals = [
    raw.P_eff_residual ?? raw.pEffResidual,
    raw.G_eff_residual ?? raw.gEffResidual,
    raw.Lambda_eff_residual ?? raw.lambdaEffResidual,
    raw.residual,
  ]
    .map((value) => finiteNumberOrNull(value))
    .filter((value) => value !== null);
  const maxResidual = residuals.length > 0 ? Math.max(...residuals.map(Math.abs)) : null;
  const inheritedBlocker = raw.inheritedBlocker ?? raw.nextBlocker ?? null;
  const rowCheck = evaluateAcceptedRow(raw);
  const accepted = rowCheck.accepted && !concreteString(inheritedBlocker);
  return {
    status: normalizeStatus(raw),
    accepted,
    reason: accepted ? "accepted" : "frw_handoff_not_accepted_or_inherited_blocker_present",
    rowReason: rowCheck.reason,
    thetaCosId: raw.thetaCosId ?? null,
    inheritedBlocker,
    residual: maxResidual,
    tolerance: tolerances.frwHandoff,
    passed: maxResidual !== null && maxResidual <= tolerances.frwHandoff,
  };
}

function evaluateSourceProvenance(raw, tolerances) {
  const rows = Array.isArray(raw.rows) ? raw.rows : [];
  const missingRows = rows
    .filter((row) => !concreteString(row.id ?? row.rowId) || !concreteString(row.kind))
    .map((row, index) => row.id ?? row.rowId ?? `source_${index}`);
  const residual = finiteNumberOrNull(raw.residual ?? raw.maxResidual);
  const passed =
    rows.length > 0 &&
    missingRows.length === 0 &&
    residual !== null &&
    residual <= tolerances.sourceProvenance;
  return {
    rows: rows.map((row, index) => ({
      id: row.id ?? row.rowId ?? `source_${index}`,
      kind: row.kind ?? null,
      contribution: finiteNumberOrNull(row.contribution),
      provenanceId: row.provenanceId ?? null,
    })),
    missingRows,
    residual,
    tolerance: tolerances.sourceProvenance,
    passed,
    reason: passed ? "passed" : "source_term_lacks_provenance_or_residual",
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = finiteNumberOrNull(value);
  return {
    computed: residual !== null,
    residual,
    tolerance,
    passed: residual !== null && residual <= tolerance,
  };
}

function decideStatus({
  missingRows,
  carrierBinding,
  sharedKeys,
  pressure,
  outerBinaryStrain,
  releaseChannelAvailability,
  pressureProjection,
  equationOfState,
  lambdaProjection,
  frwHandoff,
  sourceProvenance,
  noHiddenRetune,
}) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!sharedKeys.accepted) {
    return "blocked_missing_shared_keys";
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return "blocked_hidden_retune";
  }
  if (!carrierBinding.passed) {
    return "blocked_constitutive_carrier_split";
  }
  if (!outerBinaryStrain.computed) {
    return "blocked_missing_outer_binary_strain";
  }
  if (!outerBinaryStrain.passed) {
    return "blocked_outer_binary_strain_residual_above_tolerance";
  }
  if (!releaseChannelAvailability.computed) {
    return "blocked_missing_release_channel_availability";
  }
  if (!releaseChannelAvailability.passed) {
    return "blocked_release_channel_residual_above_tolerance";
  }
  if (!pressureProjection.computed) {
    return "blocked_missing_pressure_projection";
  }
  if (!pressureProjection.passed) {
    return "blocked_pressure_projection_residual_above_tolerance";
  }
  if (!pressure.computed) {
    return "blocked_missing_pressure_law";
  }
  if (!pressure.passed) {
    return "blocked_pressure_residual_above_tolerance";
  }
  if (!equationOfState.computed) {
    return "blocked_missing_equation_of_state";
  }
  if (!equationOfState.passed) {
    return "blocked_equation_of_state_residual_above_tolerance";
  }
  if (!lambdaProjection.computed) {
    return "blocked_missing_lambda_projection";
  }
  if (!lambdaProjection.passed) {
    return "blocked_lambda_projection_residual_above_tolerance";
  }
  if (!frwHandoff.accepted) {
    return "blocked_missing_frw_handoff";
  }
  if (!frwHandoff.passed) {
    return "blocked_frw_handoff_split";
  }
  if (!sourceProvenance.passed) {
    return "blocked_source_provenance";
  }
  if (!noHiddenRetune.passed) {
    return "blocked_hidden_retune";
  }
  return "populated";
}

function firstBlocker({
  status,
  missingRows,
  carrierBinding,
  sharedKeys,
  pressure,
  outerBinaryStrain,
  releaseChannelAvailability,
  pressureProjection,
  equationOfState,
  lambdaProjection,
  frwHandoff,
  sourceProvenance,
  noHiddenRetune,
}) {
  if (status === "populated") {
    return null;
  }
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!sharedKeys.accepted) {
    return `missing_accepted_shared_key_${sharedKeys.missingSharedKeys[0]}`;
  }
  if (!sharedKeys.hiddenRetuneNumericPass) {
    return `hidden_retune_${sharedKeys.mismatches[0]?.key ?? "shared_key"}`;
  }
  if (!carrierBinding.passed) {
    return "constitutive_carrier_split";
  }
  if (!outerBinaryStrain.computed) {
    return "missing_outer_binary_strain";
  }
  if (!outerBinaryStrain.passed) {
    return "outer_binary_strain_residual_above_tolerance";
  }
  if (!releaseChannelAvailability.computed) {
    return "missing_release_channel_availability";
  }
  if (!releaseChannelAvailability.passed) {
    return "release_channel_residual_above_tolerance";
  }
  if (!pressureProjection.computed) {
    return "missing_pressure_projection";
  }
  if (!pressureProjection.passed) {
    return "pressure_projection_residual_above_tolerance";
  }
  if (!pressure.computed) {
    return "missing_pressure_law";
  }
  if (!pressure.passed) {
    return "pressure_residual_above_tolerance";
  }
  if (!equationOfState.computed) {
    return "missing_equation_of_state";
  }
  if (!equationOfState.passed) {
    return "equation_of_state_residual_above_tolerance";
  }
  if (!lambdaProjection.computed) {
    return "missing_lambda_projection";
  }
  if (!lambdaProjection.passed) {
    return "lambda_projection_residual_above_tolerance";
  }
  if (!frwHandoff.accepted) {
    return frwHandoff.inheritedBlocker ?? "missing_frw_handoff";
  }
  if (!frwHandoff.passed) {
    return "frw_handoff_split";
  }
  if (!sourceProvenance.passed) {
    return "source_provenance";
  }
  if (!noHiddenRetune.passed) {
    return "hidden_retune";
  }
  return status;
}

function evaluateAcceptedRow(row, rowId = null) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return { accepted: false, reason: "missing_row" };
  }
  const status = row.status ?? row.retainedStatus ?? null;
  if (!ACCEPTED_STATUSES.has(status)) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!concreteString(row.rowId ?? row.id)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourcePath = row.sourcePath ?? row.source;
  const sourceCheck = firstSourceReferenceCheck(sourcePath);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason };
  }
  if (rowId === "theta_sea_rho_NS") {
    const providerEvidence = providerEvidenceStatusForPath(sourcePath, {
      repoRoot: REPO_ROOT,
    });
    if (!providerEvidence.accepted) {
      return {
        accepted: false,
        reason: `theta_sea_rho_NS_provider_${providerEvidence.reason}`,
        providerEvidence,
      };
    }
    return { accepted: true, reason: "accepted", providerEvidence };
  }
  if (PRESSURE_PROJECTION_REPORT_ROW_SET.has(rowId)) {
    const pressureProjectionEvidence = pressureProjectionEvidenceStatusForPath(sourcePath, {
      repoRoot: REPO_ROOT,
    });
    if (!pressureProjectionEvidence.accepted) {
      return {
        accepted: false,
        reason: `eq20_delta_P_eff_pressure_projection_${pressureProjectionEvidence.reason}`,
        pressureProjectionEvidence,
      };
    }
    if (
      concreteString(pressureProjectionEvidence.commonCarrierId) &&
      row.carrierId !== pressureProjectionEvidence.commonCarrierId
    ) {
      return {
        accepted: false,
        reason: "eq20_delta_P_eff_pressure_projection_row_carrier_mismatch",
        pressureProjectionEvidence,
      };
    }
    return { accepted: true, reason: "accepted", pressureProjectionEvidence };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return row.status ?? row.retainedStatus ?? "declared";
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
}

function positiveNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function nonnegativeNumberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  const lowerText = text.toLowerCase();
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !lowerText.includes("todo") &&
    !lowerText.includes("pending") &&
    !lowerText.includes("placeholder")
  );
}

function sourceReferenceExists(value) {
  return sourceReferenceCheck(value).accepted;
}

function firstSourceReferenceCheck(...values) {
  let firstFailure = { accepted: false, reason: "missing_source_path" };
  for (const value of values) {
    const check = sourceReferenceCheck(value);
    if (check.accepted) {
      return check;
    }
    if (firstFailure.reason === "missing_source_path") {
      firstFailure = check;
    }
  }
  return firstFailure;
}

function sourceReferenceCheck(value) {
  if (!concreteString(value)) {
    return { accepted: false, reason: "missing_source_path" };
  }
  const sourcePath = value.trim().replace(/#.*/, "");
  const resolvedPath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(REPO_ROOT, sourcePath);
  const rejectionReason = sourceReferenceRejectionReason(resolvedPath);
  if (rejectionReason) {
    return { accepted: false, reason: rejectionReason };
  }
  try {
    if (!fs.statSync(resolvedPath).isFile()) {
      return { accepted: false, reason: "source_not_file" };
    }
  } catch {
    return { accepted: false, reason: "source_not_found" };
  }
  return { accepted: true, reason: "accepted" };
}

function isNonDurableSourcePath(filePath) {
  return sourceReferenceRejectionReason(filePath) !== null;
}

function sourceReferenceRejectionReason(filePath) {
  const normalized = path.normalize(filePath);
  const tempRoot = path.normalize("/tmp");
  const privateTempRoot = path.normalize("/private/tmp");
  if (
    normalized.startsWith(`${tempRoot}${path.sep}`) ||
    normalized.startsWith(`${privateTempRoot}${path.sep}`)
  ) {
    return "temp_source_path";
  }
  const relative = path.relative(REPO_ROOT, normalized);
  const basename = path.basename(normalized).toLowerCase();
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    return "source_outside_repo";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  if (relative.startsWith(`content${path.sep}generated${path.sep}`)) {
    return "generated_source_path";
  }
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("source-contract") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return null;
}

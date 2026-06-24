#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-finite-window-statistical-carrier-check/v1";
const DEFAULT_TOLERANCES = {
  massClosure: 1e-12,
  invariance: 1e-3,
  retune: 1e-12,
};
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";
const DEFAULT_INPUT = {
  schema: INPUT_SCHEMA,
  claimLevel:
    "toy finite-window statistical carrier; structure-faithful, not retained evidence",
  constants: {
    hbar: 1,
  },
  tolerances: DEFAULT_TOLERANCES,
  carrier: {
    id: "eq31_two_corridor_toy",
    row: "EQ-31",
    retainedStatus: "toy",
    window: {
      id: "W_eq31_toy",
      kind: "toy_metastable_window",
      retainedStatus: "toy",
    },
    duration: 10,
    transitionMap: {
      id: "Phi_T_eq31_toy",
      retainedStatus: "toy",
    },
    finiteMeasure: {
      id: "mu_star_T_eq31_toy",
      totalMass: 1,
      invarianceResidual: 0.02,
      retainedStatus: "toy",
    },
    coarseGraining: {
      id: "Q_eq31_toy",
      retainedStatus: "toy",
    },
    detectorKernel: {
      id: "K_det_eq31_toy",
      retainedStatus: "toy",
    },
    outcomePartition: {
      id: "B_eq31_toy",
      retainedStatus: "toy",
      classes: ["stable_remnant", "corridor_alpha", "corridor_beta"],
    },
    exitCorridors: [
      {
        id: "C_alpha",
        measure: 0.03,
        retainedStatus: "toy",
        ledgerStatus: "toy",
      },
      {
        id: "C_beta",
        measure: 0.01,
        retainedStatus: "toy",
        ledgerStatus: "toy",
      },
    ],
    noHiddenRetuneWitness: {
      id: "S_retune_eq31_toy",
      residual: 0,
      retainedStatus: "toy",
    },
  },
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const input = args.input ? readJson(path.resolve(args.input)) : DEFAULT_INPUT;
const output = evaluateCarrier(input, args);
writeOutput(output, args);

if (args.requireAccepted && output.summary.status !== "accepted_retained_statistical_carrier") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    out: null,
    pretty: false,
    summary: false,
    requireAccepted: false,
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
    } else if (arg === "--require-accepted") {
      parsed.requireAccepted = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/finite-window-statistical-carrier.mjs [options]

Options:
  --input PATH            Optional finite-window statistical carrier JSON.
  --out PATH              Write JSON output to PATH.
  --summary               Emit compact summary JSON.
  --pretty                Pretty-print JSON output.
  --require-accepted      Exit nonzero unless all retained carrier rows are accepted.
  --help                  Show this help.

This checker evaluates the score-neutral finite-window statistical carrier
used by EQ-14, EQ-25, EQ-30, and EQ-31. For EQ-31 it computes escape rates,
comparison width, lifetime, and branching fractions from one corridor measure.
Toy, scaffold, attempt, or missing retained rows never raise equation scores.`);
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

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    carrier: output.carrier,
    summary: output.summary,
    eq31: output.eq31,
    missingAcceptedRows: output.retainedAcceptance.missingAcceptedRows,
    rowStatuses: output.retainedAcceptance.rowStatuses,
    rowReasons: output.retainedAcceptance.rowReasons,
  };
}

function evaluateCarrier(input) {
  const carrier = input.carrier ?? {};
  const constants = parseConstants(input.constants ?? {});
  const tolerances = parseTolerances(input.tolerances ?? {});
  const duration = positiveNumber(carrier.duration, "carrier.duration");
  const measure = carrier.finiteMeasure ?? {};
  const totalMass = positiveNumber(measure.totalMass, "carrier.finiteMeasure.totalMass");
  const corridors = parseCorridors(carrier.exitCorridors ?? [], duration, constants);
  const retainedAcceptance = evaluateRetainedAcceptance(carrier, tolerances);
  const massRows = computeMassRows(corridors, totalMass, tolerances);
  const eq31 = computeEq31Rows(corridors, constants);
  const status = decideStatus(retainedAcceptance, massRows, carrier);

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      schema: input.schema ?? null,
      schemaOk: input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    carrier: {
      id: carrier.id ?? null,
      row: carrier.row ?? null,
      retainedStatus: carrier.retainedStatus ?? null,
      claimLevel:
        "score-neutral carrier evaluator; accepted row statuses are required before score movement",
    },
    constants,
    tolerances,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      acceptedCarrierRows: retainedAcceptance.accepted,
      massClosurePassed: massRows.massClosurePassed,
      hiddenRetunePassed: retainedAcceptance.hiddenRetunePassed,
      eq31RowsComputed: eq31.computed,
      corridorCount: corridors.length,
      nextBlocker: firstBlocker(retainedAcceptance, massRows, eq31),
    },
    finiteWindowCarrier: {
      window: summarizeRow(carrier.window),
      duration,
      transitionMap: summarizeRow(carrier.transitionMap),
      finiteMeasure: summarizeRow(carrier.finiteMeasure, ["totalMass", "invarianceResidual"]),
      coarseGraining: summarizeRow(carrier.coarseGraining),
      detectorKernel: summarizeRow(carrier.detectorKernel),
      outcomePartition: summarizeRow(carrier.outcomePartition, ["classes"]),
      noHiddenRetuneWitness: summarizeRow(carrier.noHiddenRetuneWitness, ["residual"]),
    },
    retainedAcceptance,
    massRows,
    eq31,
  };
}

function parseConstants(raw) {
  return {
    hbar: positiveNumber(raw.hbar ?? 1, "constants.hbar"),
  };
}

function parseTolerances(raw) {
  return {
    massClosure: positiveNumber(
      raw.massClosure ?? DEFAULT_TOLERANCES.massClosure,
      "tolerances.massClosure",
    ),
    invariance: positiveNumber(
      raw.invariance ?? DEFAULT_TOLERANCES.invariance,
      "tolerances.invariance",
    ),
    retune: positiveNumber(raw.retune ?? DEFAULT_TOLERANCES.retune, "tolerances.retune"),
  };
}

function parseCorridors(rawCorridors, duration, constants) {
  if (!Array.isArray(rawCorridors) || rawCorridors.length === 0) {
    return [];
  }
  return rawCorridors.map((corridor, index) => {
    const measure = nonnegativeNumber(
      corridor.measure,
      `carrier.exitCorridors[${index}].measure`,
    );
    const gamma = measure / duration;
    return {
      id: corridor.id ?? `corridor_${index}`,
      measure,
      gamma,
      widthContribution: constants.hbar * gamma,
      retainedStatus: corridor.retainedStatus ?? null,
      ledgerStatus: corridor.ledgerStatus ?? null,
    };
  });
}

function computeMassRows(corridors, totalMass, tolerances) {
  const escapeMass = corridors.reduce((sum, corridor) => sum + corridor.measure, 0);
  const nonEscapeMass = totalMass - escapeMass;
  const massClosureResidual = Math.max(0, -nonEscapeMass);
  return {
    totalMass,
    escapeMass,
    nonEscapeMass,
    massClosureResidual,
    massClosurePassed: massClosureResidual <= tolerances.massClosure,
  };
}

function computeEq31Rows(corridors, constants) {
  const gammaTotal = corridors.reduce((sum, corridor) => sum + corridor.gamma, 0);
  const computed = corridors.length > 0 && gammaTotal > 0;
  const branchingFractions = computed
    ? corridors.map((corridor) => ({
        id: corridor.id,
        gamma: corridor.gamma,
        branchingFraction: corridor.gamma / gammaTotal,
      }))
    : [];
  return {
    computed,
    gammaRows: corridors.map((corridor) => ({
      id: corridor.id,
      gamma: corridor.gamma,
      widthContribution: corridor.widthContribution,
    })),
    gammaTotal,
    GammaCmp: constants.hbar * gammaTotal,
    tauCmp: computed ? 1 / gammaTotal : null,
    branchingFractions,
  };
}

function evaluateRetainedAcceptance(carrier, tolerances) {
  const rowStatuses = [
    rowStatus("W", carrier.window),
    rowStatus("Phi_T", carrier.transitionMap),
    rowStatus("mu_star_T", carrier.finiteMeasure),
    rowStatus("Q", carrier.coarseGraining),
    rowStatus("K_det", carrier.detectorKernel),
    rowStatus("B", carrier.outcomePartition),
    corridorFamilyRowStatus("C", carrier.exitCorridors ?? []),
    rowStatus("S_retune", carrier.noHiddenRetuneWitness),
  ];
  const missingAcceptedRows = rowStatuses
    .filter((row) => !row.accepted)
    .map((row) => row.id);
  const rowReasons = Object.fromEntries(
    rowStatuses.map((row) => [row.id, row.reason]),
  );
  const invarianceResidual = finiteNumberOrNull(carrier.finiteMeasure?.invarianceResidual);
  const invariancePassed =
    invarianceResidual !== null && invarianceResidual <= tolerances.invariance;
  const retuneResidual = finiteNumberOrNull(carrier.noHiddenRetuneWitness?.residual);
  const hiddenRetunePassed =
    rowStatuses.find((row) => row.id === "S_retune")?.accepted === true &&
    retuneResidual !== null &&
    retuneResidual <= tolerances.retune;
  return {
    accepted: missingAcceptedRows.length === 0 && invariancePassed && hiddenRetunePassed,
    missingAcceptedRows,
    invarianceResidual,
    invariancePassed,
    hiddenRetuneResidual: retuneResidual,
    hiddenRetunePassed,
    rowStatuses,
    rowReasons,
  };
}

function corridorFamilyRowStatus(id, corridors) {
  if (!Array.isArray(corridors) || corridors.length === 0) {
    return {
      id,
      status: null,
      accepted: false,
      reason: "missing_corridor_family",
    };
  }
  const firstMissingRetained = corridors.find(
    (corridor) => !isAcceptedStatus(corridor.retainedStatus),
  );
  if (firstMissingRetained) {
    return {
      id,
      status: firstMissingRetained.retainedStatus ?? null,
      accepted: false,
      reason: "corridor_not_accepted",
    };
  }
  const firstMissingLedger = corridors.find(
    (corridor) => !isAcceptedStatus(corridor.ledgerStatus),
  );
  if (firstMissingLedger) {
    return {
      id,
      status: firstMissingLedger.ledgerStatus ?? null,
      accepted: false,
      reason: "corridor_ledger_not_accepted",
    };
  }
  const firstMissingIdentity = corridors.find((corridor) => !concreteString(corridor.id));
  if (firstMissingIdentity) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "corridor_identity_not_concrete",
    };
  }
  const firstMissingSource = corridors.find(
    (corridor) =>
      !sourceReferenceExists(corridor.sourcePath) &&
      !sourceReferenceExists(corridor.source),
  );
  if (firstMissingSource) {
    return {
      id,
      status: "accepted",
      accepted: false,
      reason: "corridor_source_not_found",
    };
  }
  return {
    id,
    status: "accepted",
    accepted: true,
    reason: "accepted",
  };
}

function rowStatus(id, row) {
  const status = row?.retainedStatus ?? row?.status ?? null;
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return {
      id,
      status,
      accepted: false,
      reason: "missing_row",
    };
  }
  if (!isAcceptedStatus(status)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_not_accepted",
    };
  }
  if (!concreteString(row.id)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_identity_not_concrete",
    };
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return {
      id,
      status,
      accepted: false,
      reason: "row_source_not_found",
    };
  }
  return {
    id,
    status,
    accepted: true,
    reason: "accepted",
  };
}

function summarizeRow(row, extraKeys = []) {
  if (!row || typeof row !== "object") {
    return null;
  }
  const summary = {
    id: row.id ?? null,
    status: row.status ?? null,
    retainedStatus: row.retainedStatus ?? null,
  };
  for (const key of extraKeys) {
    summary[key] = row[key] ?? null;
  }
  return summary;
}

function decideStatus(retainedAcceptance, massRows, carrier) {
  if (!massRows.massClosurePassed) {
    return "blocked_corridor_measure_exceeds_window_measure";
  }
  if (carrier.retainedStatus && !isAcceptedStatus(carrier.retainedStatus)) {
    return carrier.retainedStatus === "toy"
      ? "toy_structure_only"
      : "blocked_carrier_not_retained";
  }
  if (!retainedAcceptance.accepted) {
    return "blocked_missing_accepted_retained_rows";
  }
  return "accepted_retained_statistical_carrier";
}

function firstBlocker(retainedAcceptance, massRows, eq31) {
  if (!massRows.massClosurePassed) {
    return "corridor_measure_exceeds_window_measure";
  }
  if (!eq31.computed) {
    return "missing_positive_escape_measure";
  }
  if (retainedAcceptance.missingAcceptedRows.length > 0) {
    return `missing_accepted_${retainedAcceptance.missingAcceptedRows[0]}`;
  }
  if (!retainedAcceptance.invariancePassed) {
    return "finite_measure_invariance_residual";
  }
  if (!retainedAcceptance.hiddenRetunePassed) {
    return "no_hidden_retune_witness";
  }
  return null;
}

function isAcceptedStatus(status) {
  return typeof status === "string" && ACCEPTED_STATUSES.has(status);
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
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = path.resolve(value.trim());
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function isNonDurableSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  return (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    normalized.includes(`${path.sep}content${path.sep}generated${path.sep}`) ||
    path.basename(normalized).includes(".tmp")
  );
}

function positiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label} must be a positive finite number.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${label} must be a nonnegative finite number.`);
  }
  return number;
}

function finiteNumberOrNull(value) {
  if (value === undefined || value === null) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

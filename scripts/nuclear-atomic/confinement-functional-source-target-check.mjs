#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const INPUT_SCHEMA =
  "aaa-nuclear-atomic-confinement-functional-source-target/v1";
export const OUTPUT_SCHEMA =
  "aaa-nuclear-atomic-confinement-functional-source-target-check/v1";

const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const REQUIRED_ROWS = Object.freeze([
  "sigma_eff_extraction",
  "color_singlet_nucleon_envelope",
  "delta_E_corr_NN",
  "no_open_color_far_field",
]);
const DEFAULT_INPUT =
  "scripts/nuclear-atomic/confinement-functional-source-target.v1.json";

const REQUIRED_SOURCE_ROWS = Object.freeze({
  sigma_eff_extraction: [
    "K_perp",
    "V_exc",
    "rho_NS",
    "chi_sea",
    "axis_exceptionality_charge",
    "same_record_noether_sea_response",
  ],
  color_singlet_nucleon_envelope: [
    "accepted_proton_color_singlet_envelope",
    "accepted_neutron_color_singlet_envelope",
    "no_free_color_asymptotic_state",
    "same_record_branch_interface",
  ],
  delta_E_corr_NN: [
    "accepted_sigma_eff_extraction",
    "accepted_color_singlet_nucleon_envelope",
    "accepted_branch_interface_rows",
    "finite_residual_corridor_overlap",
  ],
  no_open_color_far_field: [
    "accepted_delta_E_corr_NN",
    "finite_range_residual",
    "color_singlet_closure",
    "same_record_no_open_color_audit",
  ],
});

const EQUATION_TOKENS = Object.freeze({
  sigma_eff_extraction: [
    "sigma_eff",
    "min_{a,f}",
    "K_perp",
    "V_exc",
    "rho_NS",
    "chi_sea",
  ],
  delta_E_corr_NN: [
    "Delta E_corr_NN",
    "min_{Theta_12",
    "E_conf",
    "Gamma_N1",
    "Gamma_N2",
  ],
});

const REQUIRED_TOY_BINDING_ROWS = Object.freeze({
  coefficients: {
    alphaCorr: ["delta_E_corr_NN"],
    alphaSea: ["sigma_eff_extraction"],
    alphaSurf: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaPair: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaShell: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    alphaPack: ["delta_E_corr_NN", "no_open_color_far_field"],
    boundaryDegreeLoss: ["color_singlet_nucleon_envelope", "delta_E_corr_NN"],
    dSat: ["delta_E_corr_NN", "no_open_color_far_field"],
    maxDegree: ["delta_E_corr_NN", "no_open_color_far_field"],
    packSoftA: ["delta_E_corr_NN", "no_open_color_far_field"],
    pnCorridorPairReward: ["sigma_eff_extraction", "delta_E_corr_NN"],
    ppCorridorPairReward: ["sigma_eff_extraction", "delta_E_corr_NN"],
  },
  graphRules: {
    bounded_degree_surface_depleted_corridor_estimator: [
      "color_singlet_nucleon_envelope",
      "delta_E_corr_NN",
    ],
    finite_tail_saturation_check: [
      "delta_E_corr_NN",
      "no_open_color_far_field",
    ],
  },
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const inputPath = path.resolve(args.input);
  const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const report = buildConfinementFunctionalSourceTargetCheck(input, {
    inputPath,
  });
  writeReport(report, args);
  if (
    args.requireAccepted &&
    report.summary.status !== "accepted_confinement_functional_source_rows"
  ) {
    process.exitCode = 1;
  }
}

export function buildConfinementFunctionalSourceTargetCheck(
  input,
  { inputPath = DEFAULT_INPUT } = {},
) {
  const rows = input?.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      buildRowCheck(rowId, rows[rowId]),
    ]),
  );
  const dependencyChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [
      rowId,
      evaluateSourceRowDependencies(rowId, rows[rowId]),
    ]),
  );
  const equationChecks = {
    sigma_eff_extraction: evaluateEquationTokens(
      rows.sigma_eff_extraction?.targetEquation,
      EQUATION_TOKENS.sigma_eff_extraction,
    ),
    delta_E_corr_NN: evaluateEquationTokens(
      rows.delta_E_corr_NN?.targetEquation,
      EQUATION_TOKENS.delta_E_corr_NN,
    ),
    no_open_color_far_field: evaluateNoOpenColorBehavior(
      rows.no_open_color_far_field?.requiredBehavior,
    ),
  };
  const toyBindingCheck = evaluateToyBindingRows(input?.toyBindingRows ?? {});
  const structuralFailures = [
    ...Object.entries(dependencyChecks)
      .filter(([, check]) => check.passed !== true)
      .map(([rowId]) => `${rowId}.dependencies`),
    ...Object.entries(equationChecks)
      .filter(([, check]) => check.passed !== true)
      .map(([rowId]) => `${rowId}.equation`),
    ...(toyBindingCheck.passed ? [] : ["toyBindingRows"]),
  ];
  const missingRows = REQUIRED_ROWS.filter(
    (rowId) => rowChecks[rowId].accepted !== true,
  );
  const schemaOk = input?.schema === INPUT_SCHEMA;
  const status = decideStatus({ schemaOk, structuralFailures, missingRows });
  const firstMissingRow = missingRows[0] ?? null;

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: input?.schema ?? null,
      schemaOk,
      claimLevel: input?.claimLevel ?? null,
      status: input?.status ?? null,
    },
    summary: {
      status,
      allRequiredRowsAccepted: schemaOk && missingRows.length === 0,
      missingRows,
      firstMissingRow,
      firstMissingObject: firstMissingRow ? `missing_accepted_${firstMissingRow}` : null,
      structuralPass: structuralFailures.length === 0,
      structuralFailures,
      dependencyPass: Object.values(dependencyChecks).every(
        (check) => check.passed === true,
      ),
      equationPass: Object.values(equationChecks).every(
        (check) => check.passed === true,
      ),
      toyBindingRowsPass: toyBindingCheck.passed,
      scoreDecision: "no_score_increase",
    },
    requiredRows: [...REQUIRED_ROWS],
    rowChecks,
    dependencyChecks,
    equationChecks,
    toyBindingCheck,
    acceptanceRule:
      "The confinement-functional target is promotion-ready only when every required row is accepted and the sigma_eff, color-singlet envelope, Delta E_corr_NN, no-open-color, and toy-binding dependency checks still pass.",
  };
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT,
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
    } else if (arg === "--summary") {
      parsed.summary = true;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
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
  console.log(`Usage: node scripts/nuclear-atomic/confinement-functional-source-target-check.mjs [options]

Options:
  --input PATH          Source-target JSON to inspect.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-accepted    Exit nonzero unless all confinement-functional rows are accepted.
  --help                Show this help.

This checker keeps the Fe/Ni toy confinement-functional source target
fail-closed: it can verify the sigma_eff and Delta E_corr_NN dependency
structure without treating target-only rows as accepted source evidence.`);
}

function writeReport(report, args) {
  const payload = args.summary
    ? {
        schema: report.schema,
        generatedAt: report.generatedAt,
        input: report.input,
        summary: report.summary,
        rowChecks: report.rowChecks,
        equationChecks: report.equationChecks,
        toyBindingCheck: report.toyBindingCheck,
      }
    : report;
  const text = JSON.stringify(payload, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function buildRowCheck(rowId, row) {
  return {
    rowId,
    sourceRowId: row?.id ?? row?.rowId ?? null,
    status: normalizeStatus(row),
    accepted: acceptedSourceRow(row),
    currentEvidenceStatus: row?.currentEvidenceStatus ?? null,
  };
}

function evaluateSourceRowDependencies(rowId, row) {
  const expected = REQUIRED_SOURCE_ROWS[rowId] ?? [];
  const observed = Array.isArray(row?.requiredSourceRows)
    ? row.requiredSourceRows
    : [];
  const missing = expected.filter((value) => !observed.includes(value));
  const extra = observed.filter((value) => !expected.includes(value));
  return {
    expected,
    observed,
    missing,
    extra,
    passed: missing.length === 0 && extra.length === 0,
  };
}

function evaluateEquationTokens(raw, tokens) {
  const equation = typeof raw === "string" ? raw : "";
  const missing = tokens.filter((token) => !equation.includes(token));
  return {
    requiredTokens: tokens,
    missingTokens: missing,
    passed: missing.length === 0,
  };
}

function evaluateNoOpenColorBehavior(raw) {
  const text = typeof raw === "string" ? raw : "";
  const requiredTokens = [
    "Delta E_corr_NN(r) tends to zero",
    "r tends to infinity",
    "no residual open-color far field",
  ];
  const missingTokens = requiredTokens.filter((token) => !text.includes(token));
  return {
    requiredTokens,
    missingTokens,
    passed: missingTokens.length === 0,
  };
}

function evaluateToyBindingRows(raw) {
  const failures = [
    ...evaluateToyBindingGroup("coefficients", raw.coefficients ?? {}),
    ...evaluateToyBindingGroup("graphRules", raw.graphRules ?? {}),
  ];
  const consumedRows = new Set(
    [
      ...Object.values(raw.coefficients ?? {}).flat(),
      ...Object.values(raw.graphRules ?? {}).flat(),
    ].filter((value) => typeof value === "string"),
  );
  const unconsumedRequiredRows = REQUIRED_ROWS.filter((rowId) => !consumedRows.has(rowId));
  return {
    passed: failures.length === 0 && unconsumedRequiredRows.length === 0,
    failures,
    unconsumedRequiredRows,
  };
}

function evaluateToyBindingGroup(groupName, observedGroup) {
  const expectedGroup = REQUIRED_TOY_BINDING_ROWS[groupName] ?? {};
  const failures = [];
  for (const [id, expectedRows] of Object.entries(expectedGroup)) {
    const observedRows = observedGroup[id] ?? [];
    const missing = expectedRows.filter((row) => !observedRows.includes(row));
    const extra = observedRows.filter((row) => !expectedRows.includes(row));
    if (missing.length > 0 || extra.length > 0) {
      failures.push({ group: groupName, id, missing, extra });
    }
  }
  for (const id of Object.keys(observedGroup)) {
    if (!Object.hasOwn(expectedGroup, id)) {
      failures.push({
        group: groupName,
        id,
        missing: [],
        extra: observedGroup[id],
      });
    }
  }
  return failures;
}

function decideStatus({ schemaOk, structuralFailures, missingRows }) {
  if (!schemaOk) {
    return "schema_mismatch";
  }
  if (structuralFailures.length > 0) {
    return "confinement_functional_structure_mismatch";
  }
  if (missingRows.length > 0) {
    return "missing_accepted_confinement_functional_rows";
  }
  return "accepted_confinement_functional_source_rows";
}

function acceptedSourceRow(row) {
  return (
    row &&
    typeof row === "object" &&
    !Array.isArray(row) &&
    ACCEPTED_STATUSES.has(row.status)
  );
}

function normalizeStatus(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  return typeof row.status === "string" ? row.status : "missing";
}

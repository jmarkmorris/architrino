#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-equation-map-emit-02-04-contract-check/v1";
const INPUT_SCHEMA_PREFIX = "aaa-tri-binary-frequency-candidate-solver-report";
const SOURCE_PAYLOAD_PATH = "cases[].branchChartProjection.equationBearing";

const PROJECTION_CONTRACT = [
  {
    id: "common_carrier",
    math: "C_02-04^bin(u_k)",
    consumes: ["Pi_T^C", "Pi_xi^C", "Pi_shape^C", "Pi_tw^C"],
    requiredRows: [
      "retained_branch_chart",
      "root_starvation_row",
      "row_set_identity",
      "tail_wake_pullback",
      "vector_partition_retained",
      "energy_routing",
      "retained_noether_sea_cell",
    ],
    currentProxyRows: [
      "root_chart_reduced",
      "active_row_lineage_probe",
      "torque_wake_same_row_diagnostic",
      "energy_frequency_target",
    ],
  },
  {
    id: "clock_projection",
    math: "Pi_T^C C_02-04^bin(u_k)",
    consumes: ["R_T^bin"],
    requiredRows: [
      "clock_period_T_u_T0",
      "gamma_f_u",
      "same_branch_chart_identity",
    ],
    currentProxyRows: [
      "equal_frequency_common_clock",
      "equal_frequency_transaction_frequency_collapse",
    ],
  },
  {
    id: "envelope_projection",
    math: "Pi_xi^C C_02-04^bin(u_k)",
    consumes: ["R_xi^bin", "R_shape^bin"],
    requiredRows: [
      "envelope_axes_R_parallel_R_perp",
      "rho_u_shape_row",
      "same_branch_chart_identity",
    ],
    currentProxyRows: ["equal_frequency_lever_arm_speed_relation"],
  },
  {
    id: "two_way_signal_projection",
    math: "Pi_tw^C C_02-04^bin(u_k)",
    consumes: ["R_tw^bin"],
    requiredRows: [
      "two_way_signal_delta_tw",
      "beta_f_u",
      "same_branch_chart_identity",
    ],
    currentProxyRows: [],
  },
  {
    id: "energy_projection",
    math: "Pi_E^Theta Theta_02-04^bin(u_k)",
    consumes: ["R_E^bin"],
    requiredRows: [
      "E_CM_u",
      "M0_bin",
      "speed_convention_c_f",
      "exposure_row",
      "energy_routing",
      "same_branch_chart_identity",
    ],
    currentProxyRows: ["energy_frequency_target"],
  },
  {
    id: "momentum_projection",
    math: "Pi_p^Theta,a Theta_02-04^bin(u_k)",
    consumes: ["R_p^bin,a"],
    requiredRows: [
      "p_CM_u",
      "drift_vector_u_hat_e",
      "speed_convention_c_f",
      "vector_partition_retained",
      "recoil_or_boundary_exchange",
      "same_branch_chart_identity",
    ],
    currentProxyRows: [],
  },
  {
    id: "mass_shell_projection",
    math: "Pi_shell^Theta Theta_02-04^bin(u_k)",
    consumes: ["R_shell^bin"],
    requiredRows: [
      "E_CM_u",
      "p_CM_u",
      "M0_bin",
      "speed_convention_c_f",
      "spatial_metric_h_ab",
      "same_branch_chart_identity",
    ],
    currentProxyRows: ["energy_frequency_target"],
  },
  {
    id: "rest_mass_projection",
    math: "Pi_M0^Theta Theta_02-04^bin(u_k)",
    consumes: ["R_M0^bin"],
    requiredRows: [
      "M0_bin_at_rest",
      "M0_bin_u",
      "same_branch_chart_identity",
    ],
    currentProxyRows: [],
  },
  {
    id: "medium_response_projection",
    math: "Pi_M^Theta Theta_02-04^bin(u_k)",
    consumes: ["R_M^bin,ab"],
    requiredRows: [
      "M_sea_ab_u",
      "retained_noether_sea_cell",
      "speed_convention_c_f",
      "spatial_metric_h_ab",
      "same_branch_chart_identity",
    ],
    currentProxyRows: [],
  },
  {
    id: "same_record_witnesses",
    math: "S_root^02-04(u_k), S_retune^02-04(u_k), R_01-05^B(W_k)",
    consumes: ["same-record eligibility"],
    requiredRows: [
      "row_set_identity",
      "same_branch_chart_identity",
      "same_root_conservation_certificate",
      "retune_witness_zero",
      "split_witness_zero",
    ],
    currentProxyRows: [
      "root_chart_reduced",
      "active_row_lineage_probe",
      "torque_wake_same_row_diagnostic",
    ],
  },
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printUsage();
  process.exit(0);
}

if (!args.input) {
  throw new Error("Missing required --input PATH argument.");
}

const inputPath = path.resolve(args.input);
const report = readJson(inputPath);
const output = createOutput({ report, inputPath });
writeOutput(args, output);

if (args.requireEvaluable && output.summary.status !== "evaluable") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    out: null,
    pretty: false,
    summary: false,
    requireEvaluable: false,
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
    } else if (arg === "--require-evaluable") {
      parsed.requireEvaluable = true;
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function printUsage() {
  console.log(`Usage: node scripts/equation-mapping/check-emit-02-04-contract.mjs --input PATH [options]

Options:
  --input PATH          Tri-binary solver report JSON to inspect.
  --out PATH            Write the contract-check JSON to PATH.
  --pretty              Pretty-print the JSON output.
  --summary             Print only input, emit target, and summary fields.
  --require-evaluable   Exit nonzero unless the Emit_02-04 contract is evaluable.
  --help                Show this help.

This checker is fail-closed. It maps ${SOURCE_PAYLOAD_PATH} onto the
Emit_02-04 projection contract and reports missing retained rows instead of
treating current proxy rows as Lorentz, energy-momentum, or mass-shell evidence.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeOutput(parsedArgs, output) {
  const renderedOutput = parsedArgs.summary
    ? {
        schema: output.schema,
        generatedAt: output.generatedAt,
        input: output.input,
        emitTarget: output.emitTarget,
        summary: output.summary,
      }
    : output;
  const text = JSON.stringify(renderedOutput, null, parsedArgs.pretty ? 2 : 0);
  if (parsedArgs.out) {
    fs.writeFileSync(path.resolve(parsedArgs.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function createOutput({ report, inputPath }) {
  const cases = Array.isArray(report?.cases) ? report.cases : [];
  const caseRows = cases.map(createCaseContractRow);
  const evaluableCases = caseRows.filter((row) => row.status === "evaluable").length;
  const blockedCases = caseRows.length - evaluableCases;
  const aggregateMissingRows = aggregateMissingRowsByProjection(caseRows);
  const schemaOk =
    typeof report?.schema === "string" &&
    report.schema.startsWith(INPUT_SCHEMA_PREFIX);

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      path: inputPath,
      schema: report?.schema ?? null,
      schemaOk,
      sourcePayloadPath: SOURCE_PAYLOAD_PATH,
      caseCount: cases.length,
      retainedBranchClaim: report?.retainedBranchClaim === true,
    },
    emitTarget: {
      id: "Emit_02-04_bin",
      math: "Emit_02-04^bin(u_k)",
      claimLevel:
        "contract check only; not retained-branch certification and not score evidence",
      failClosed: true,
      rowNameSemantics: {
        requiredRows: "retained Emit_02-04 target row names",
        currentProxyRows: "current tri-binary solver report row names",
      },
    },
    summary: {
      status:
        schemaOk && cases.length > 0 && blockedCases === 0
          ? "evaluable"
          : "blocked_not_evaluable",
      scoreDecision: "no_score_increase",
      evaluableCases,
      blockedCases,
      retainedBranchClaim: report?.retainedBranchClaim === true,
      requiredProjectionCount: PROJECTION_CONTRACT.length,
      sourceRecordModeCounts: countBy(
        caseRows.map((row) => row.sourceStatus.sourceRecordMode)
      ),
      aggregateMissingRows,
    },
    projectionContract: PROJECTION_CONTRACT,
    cases: caseRows,
  };
}

function createCaseContractRow(row) {
  const projection = row?.branchChartProjection ?? {};
  const equationBearing = projection?.equationBearing ?? {};
  const hasNestedEquationBearingSource =
    Array.isArray(equationBearing?.sourceRecordRefs?.populatedRowIds) ||
    Array.isArray(equationBearing?.sourceRecordRefs?.blockedRowIds);
  const sourceRecordMode = hasNestedEquationBearingSource
    ? "nested_equationBearing_sourceRecordRefs"
    : "fallback_branchChartProjection_rows";
  const populatedRows = new Set(
    hasNestedEquationBearingSource
      ? equationBearing?.sourceRecordRefs?.populatedRowIds ?? []
      : collectIds(projection?.populatedRows)
  );
  const blockedRows = new Set(
    hasNestedEquationBearingSource
      ? equationBearing?.sourceRecordRefs?.blockedRowIds ?? []
      : collectIds(projection?.blockedRows)
  );
  const blockingFields = Array.isArray(equationBearing?.blockingFields)
    ? equationBearing.blockingFields
    : [];
  const projectionRows = PROJECTION_CONTRACT.map((contract) =>
    evaluateProjectionContract({
      contract,
      populatedRows,
      blockedRows,
      blockingFields,
      retainedBranchClaim: projection?.retainedBranchClaim === true,
    })
  );
  const blocked = projectionRows.filter((entry) => entry.status !== "evaluable");

  return {
    caseId: row?.caseId ?? null,
    familyId: row?.familyId ?? projection?.familyId ?? null,
    phaseProfileId: row?.phaseProfile?.id ?? equationBearing?.phaseProfileId ?? null,
    roleFrequencyRowIMO:
      equationBearing?.roleFrequencyRowIMO ??
      projection?.frequencyTriplet ??
      null,
    rawBinaryFrequencyRow: equationBearing?.rawBinaryFrequencyRow ?? null,
    sourceStatus: {
      sameRecordStatus: equationBearing?.sameRecordStatus ?? null,
      retainedBranchClaim: projection?.retainedBranchClaim === true,
      failClosed: equationBearing?.failClosed === true,
      reducedRowsPass: projection?.reducedRowsPass === true,
      sourceRecordMode,
    },
    status: blocked.length === 0 ? "evaluable" : "blocked_not_evaluable",
    blockedProjectionCount: blocked.length,
    populatedRowIds: [...populatedRows].sort(),
    blockedRowIds: [...blockedRows].sort(),
    projectionRows,
  };
}

function evaluateProjectionContract({
  contract,
  populatedRows,
  blockedRows,
  blockingFields,
  retainedBranchClaim,
}) {
  const missingRequiredRows = contract.requiredRows.filter(
    (requiredRow) => !populatedRows.has(requiredRow)
  );
  const presentRequiredRows = contract.requiredRows.filter((requiredRow) =>
    populatedRows.has(requiredRow)
  );
  const presentProxyRows = contract.currentProxyRows.filter((proxyRow) =>
    populatedRows.has(proxyRow)
  );
  const blockedRequiredRows = contract.requiredRows.filter((requiredRow) =>
    blockedRows.has(requiredRow)
  );
  const relatedBlockingFields = blockingFields.filter((field) =>
    contract.requiredRows.includes(field.id)
  );
  const status =
    retainedBranchClaim && missingRequiredRows.length === 0
      ? "evaluable"
      : presentProxyRows.length > 0
        ? "blocked_with_current_proxy_rows"
        : "blocked_not_evaluable";

  return {
    id: contract.id,
    math: contract.math,
    status,
    consumes: contract.consumes,
    presentRequiredRows,
    missingRequiredRows,
    blockedRequiredRows,
    presentProxyRows,
    relatedBlockingFields,
  };
}

function collectIds(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row) => row?.id).filter(Boolean);
}

function aggregateMissingRowsByProjection(caseRows) {
  const aggregate = {};
  for (const row of caseRows) {
    for (const projectionRow of row.projectionRows) {
      if (!aggregate[projectionRow.id]) {
        aggregate[projectionRow.id] = {};
      }
      for (const missingRow of projectionRow.missingRequiredRows) {
        aggregate[projectionRow.id][missingRow] =
          (aggregate[projectionRow.id][missingRow] ?? 0) + 1;
      }
    }
  }
  return aggregate;
}

function countBy(values) {
  const counts = {};
  for (const value of values) {
    const key = value ?? "unknown";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

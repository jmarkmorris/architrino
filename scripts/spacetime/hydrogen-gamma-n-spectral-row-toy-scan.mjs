#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "hydrogen-gamma-n-spectral-row-mock.json");
const RESPONSE_KEYS = ["n", "chi", "lambda", "R"];
const G_KEYS = ["n", "chi", "lambda", "xi", "R"];
const G_ALIASES = {
  n: ["ln_n"],
  chi: ["ln_chi_sea", "ln_chi"],
  lambda: ["ln_lambda"],
  xi: ["minus_ln_xi", "negative_ln_xi"],
  R: ["ln_R_core_ratio", "ln_R", "ln_R_core"],
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
  console.log(`Usage: node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs [options]

Options:
  --input PATH  Hydrogen Gamma_N spectral-row packet. Defaults to scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This replays the first hydrogen spectral coefficient-row checks:
  C_N = Gamma_N^{-1}
  b_xi = 1
  b_n a_n + b_chi a_chi + b_lambda a_lambda + b_R a_R = 1
  one shared b_N^spec row must control the declared hydrogen line set.
It is a toy closure fixture, not an empirical spectral fitter.`);
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

function optionalFiniteNumber(value, label, fallback = 0) {
  return value === undefined ? fallback : finiteNumber(value, label);
}

function numberArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must be a nonempty array.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function responseCoefficient(response, key) {
  return finiteNumber(response[`a_${key}`], `static_response.a_${key}`);
}

function rowCoefficient(row, key) {
  return optionalFiniteNumber(row[`b_${key}`], `candidate_row.${row.name ?? "unnamed"}.b_${key}`);
}

function rowXiCoefficient(row) {
  return optionalFiniteNumber(row.b_xi, `candidate_row.${row.name ?? "unnamed"}.b_xi`, 1);
}

function firstDefined(object, aliases) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return undefined;
  }
  return aliases.find((alias) => Object.prototype.hasOwnProperty.call(object, alias));
}

function gComponent(g, key) {
  const alias = firstDefined(g, G_ALIASES[key]);
  if (alias === undefined) {
    return 0;
  }
  return finiteNumber(g[alias], `g_N_H.${alias}`);
}

function normalizedG(g) {
  return Object.fromEntries(G_KEYS.map((key) => [key, gComponent(g, key)]));
}

function scenarioTolerance(packet, scenario, key) {
  return finiteNumber(scenario[key] ?? packet.defaults?.[key], key);
}

function residualPass(value, tolerance) {
  return Math.abs(value) <= tolerance;
}

function staticResponse(packet, scenario) {
  const response = scenario.static_response ?? packet.defaults?.static_response;
  if (!response || typeof response !== "object" || Array.isArray(response)) {
    throw new Error(`${scenario.name}: static_response must be an object.`);
  }
  return response;
}

function explicitRows(scenario) {
  if (!Array.isArray(scenario.candidate_rows)) {
    return [];
  }
  return scenario.candidate_rows.map((row, index) => ({
    ...row,
    name: row.name ?? `candidate_row_${index + 1}`,
  }));
}

function gridRows(scenario) {
  if (scenario.row_grid === undefined) {
    return [];
  }
  const grid = scenario.row_grid;
  const nValues = numberArray(grid.b_n, "row_grid.b_n");
  const chiValues = numberArray(grid.b_chi, "row_grid.b_chi");
  const lambdaValues = numberArray(grid.b_lambda ?? [0], "row_grid.b_lambda");
  const rValues = numberArray(grid.b_R ?? [0], "row_grid.b_R");
  const rows = [];
  for (const bN of nValues) {
    for (const bChi of chiValues) {
      for (const bLambda of lambdaValues) {
        for (const bR of rValues) {
          rows.push({
            name: `grid_b_n_${bN}_b_chi_${bChi}_b_lambda_${bLambda}_b_R_${bR}`,
            b_n: bN,
            b_chi: bChi,
            b_lambda: bLambda,
            b_R: bR,
          });
        }
      }
    }
  }
  return rows;
}

function scenarioRows(scenario) {
  const rows = [...explicitRows(scenario), ...gridRows(scenario)];
  if (rows.length === 0) {
    throw new Error(`${scenario.name}: define candidate_rows or row_grid.`);
  }
  return rows;
}

function endpointSum(row, response) {
  return RESPONSE_KEYS.reduce(
    (sum, key) => sum + rowCoefficient(row, key) * responseCoefficient(response, key),
    0,
  );
}

function rowPrediction(row, g) {
  const record = normalizedG(g);
  return (
    rowCoefficient(row, "n") * record.n +
    rowCoefficient(row, "chi") * record.chi +
    rowCoefficient(row, "lambda") * record.lambda +
    rowXiCoefficient(row) * record.xi +
    rowCoefficient(row, "R") * record.R
  );
}

function lineInferredLnGamma(line, recordLabel) {
  if (line.ln_Gamma_inferred !== undefined) {
    return finiteNumber(line.ln_Gamma_inferred, `${recordLabel}.${line.transition}.ln_Gamma_inferred`);
  }
  const gap = finiteNumber(line.envelope_gap_over_h, `${recordLabel}.${line.transition}.envelope_gap_over_h`);
  const frequency = finiteNumber(line.observed_frequency, `${recordLabel}.${line.transition}.observed_frequency`);
  if (gap <= 0 || frequency <= 0) {
    throw new Error(`${recordLabel}.${line.transition}: envelope_gap_over_h and observed_frequency must be positive.`);
  }
  return Math.log(gap / frequency);
}

function lineResidual(row, record, line, epsilonGamma) {
  const inferred = lineInferredLnGamma(line, record.ell ?? "record");
  const predicted = rowPrediction(row, record.g_N_H);
  const residual = inferred - predicted;
  return {
    transition: line.transition ?? null,
    inferred_ln_Gamma_N: inferred,
    predicted_ln_Gamma_N: predicted,
    residual,
    normalized_residual: Math.abs(residual) / (Math.abs(inferred) + epsilonGamma),
  };
}

function responseRecordMismatch(record, line, tolerance) {
  if (line.g_N_H === undefined) {
    return null;
  }
  const base = normalizedG(record.g_N_H);
  const override = normalizedG(line.g_N_H);
  const deltas = Object.fromEntries(G_KEYS.map((key) => [key, override[key] - base[key]]));
  const maxAbsDelta = Math.max(...Object.values(deltas).map((value) => Math.abs(value)));
  return {
    transition: line.transition ?? null,
    deltas,
    max_abs_delta: maxAbsDelta,
    mismatch: maxAbsDelta > tolerance,
  };
}

function flattenLines(records) {
  return records.flatMap((record, recordIndex) =>
    record.lines.map((line) => ({
      record,
      line,
      recordIndex,
    })),
  );
}

function rowRefinementResiduals(row, records, epsilonRow) {
  const residuals = [];
  for (let i = 0; i < records.length; i += 1) {
    for (let j = i + 1; j < records.length; j += 1) {
      const left = rowPrediction(row, records[i].g_N_H);
      const right = rowPrediction(row, records[j].g_N_H);
      const residual = left - right;
      residuals.push({
        left_ell: records[i].ell ?? i,
        right_ell: records[j].ell ?? j,
        left_ln_Gamma_N: left,
        right_ln_Gamma_N: right,
        residual,
        normalized_residual: Math.abs(residual) / (Math.abs(left) + epsilonRow),
      });
    }
  }
  return residuals;
}

function maxNormalizedResidual(records) {
  if (records.length === 0) {
    return 0;
  }
  return Math.max(...records.map((record) => record.normalized_residual));
}

function evaluateRow(row, response, records, tolerances) {
  const bXi = rowXiCoefficient(row);
  const bXiResidual = bXi - 1;
  const bXiPass = residualPass(bXiResidual, tolerances.endpoint);
  const endpoint = endpointSum(row, response);
  const endpointResidual = endpoint - 1;
  const endpointPass = residualPass(endpointResidual, tolerances.endpoint);
  const lineResiduals = records.flatMap((record) =>
    record.lines.map((line) => lineResidual(row, record, line, tolerances.epsilonGamma)),
  );
  const maxLineResidual = maxNormalizedResidual(lineResiduals);
  const lineSetPass = maxLineResidual <= tolerances.gamma;
  const refinementResiduals = rowRefinementResiduals(row, records, tolerances.epsilonRow);
  const maxRefinementResidual = maxNormalizedResidual(refinementResiduals);
  const refinementPass = !tolerances.requireRefinement || maxRefinementResidual <= tolerances.row;
  const status = bXiPass && endpointPass && lineSetPass && refinementPass ? "pass" : "fail";

  return {
    name: row.name,
    status,
    row: {
      b_n: rowCoefficient(row, "n"),
      b_chi: rowCoefficient(row, "chi"),
      b_lambda: rowCoefficient(row, "lambda"),
      b_xi: bXi,
      b_R: rowCoefficient(row, "R"),
    },
    diagnostics: {
      b_xi_residual: bXiResidual,
      b_xi_pass: bXiPass,
      endpoint_sum: endpoint,
      endpoint_residual: endpointResidual,
      endpoint_pass: endpointPass,
      max_line_set_normalized_residual: maxLineResidual,
      line_set_pass: lineSetPass,
      line_residuals: lineResiduals,
      max_refinement_normalized_residual: maxRefinementResidual,
      refinement_pass: refinementPass,
      refinement_residuals: refinementResiduals,
    },
  };
}

function evaluatePerLineSpoof(rows, response, records, tolerances) {
  const lines = flattenLines(records);
  if (lines.length === 0) {
    return { pass: false, lines: [] };
  }

  const lineResults = lines.map(({ record, line }) => {
    const passingRows = rows
      .map((row) => {
        const bXiPass = residualPass(rowXiCoefficient(row) - 1, tolerances.endpoint);
        const endpointPass = residualPass(endpointSum(row, response) - 1, tolerances.endpoint);
        const residual = lineResidual(row, record, line, tolerances.epsilonGamma);
        const pass = bXiPass && endpointPass && residual.normalized_residual <= tolerances.gamma;
        return { row: row.name, pass, residual };
      })
      .filter((result) => result.pass);

    return {
      record: record.ell ?? null,
      transition: line.transition ?? null,
      passing_rows: passingRows.map((result) => result.row),
      pass: passingRows.length > 0,
    };
  });

  return {
    pass: lineResults.every((result) => result.pass),
    lines: lineResults,
  };
}

function evaluateScenario(packet, scenario) {
  const records = scenario.records;
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(`${scenario.name}: records must be a nonempty array.`);
  }
  for (const [recordIndex, record] of records.entries()) {
    if (!record.g_N_H || typeof record.g_N_H !== "object" || Array.isArray(record.g_N_H)) {
      throw new Error(`${scenario.name}.records[${recordIndex}].g_N_H must be an object.`);
    }
    if (!Array.isArray(record.lines) || record.lines.length === 0) {
      throw new Error(`${scenario.name}.records[${recordIndex}].lines must be a nonempty array.`);
    }
  }

  const response = staticResponse(packet, scenario);
  const rows = scenarioRows(scenario);
  const tolerances = {
    endpoint: scenarioTolerance(packet, scenario, "endpoint_tolerance"),
    gamma: scenarioTolerance(packet, scenario, "gamma_tolerance"),
    row: scenarioTolerance(packet, scenario, "row_tolerance"),
    responseMismatch: scenarioTolerance(packet, scenario, "response_mismatch_tolerance"),
    epsilonGamma: scenarioTolerance(packet, scenario, "epsilon_gamma"),
    epsilonRow: scenarioTolerance(packet, scenario, "epsilon_row"),
    requireRefinement: scenario.require_refinement_consistency !== false,
  };

  const rowResults = rows.map((row) => evaluateRow(row, response, records, tolerances));
  const acceptedRows = rowResults.filter((result) => result.status === "pass");
  const mismatches = records.flatMap((record) =>
    record.lines
      .map((line) => responseRecordMismatch(record, line, tolerances.responseMismatch))
      .filter((result) => result !== null && result.mismatch),
  );
  const responseRecordMismatchPass = mismatches.length === 0;
  const perLineSpoof = evaluatePerLineSpoof(rows, response, records, tolerances);
  const scenarioPass = acceptedRows.length > 0 && responseRecordMismatchPass;
  const expectedPass = scenario.expect_pass !== false;
  const expectations = {
    status_matches_expectation: scenarioPass === expectedPass,
    per_line_spoof_matches_expectation:
      scenario.expect_per_line_spoof_pass === undefined
        ? true
        : perLineSpoof.pass === Boolean(scenario.expect_per_line_spoof_pass),
    response_record_mismatch_matches_expectation:
      scenario.expect_response_record_mismatch === undefined
        ? true
        : !responseRecordMismatchPass === Boolean(scenario.expect_response_record_mismatch),
  };
  const expectationPass = Object.values(expectations).every(Boolean);

  return {
    name: scenario.name,
    status: scenarioPass ? "pass" : "fail",
    expectation_status: expectationPass ? "pass" : "fail",
    expect_pass: expectedPass,
    tolerances,
    diagnostics: {
      static_response: response,
      candidate_row_count: rows.length,
      accepted_rows: acceptedRows.map((row) => row.name),
      response_record_mismatch_pass: responseRecordMismatchPass,
      response_record_mismatches: mismatches,
      per_line_spoof: perLineSpoof,
      expectations,
      row_results: rowResults,
    },
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const packet = readJson(args.input);
  if (!Array.isArray(packet.scenarios)) {
    throw new Error("Input packet must define scenarios as an array.");
  }

  const results = packet.scenarios.map((scenario) => evaluateScenario(packet, scenario));
  const output = {
    schema: "aaa-hydrogen-gamma-n-spectral-row-toy-output/v1",
    input_schema: packet.schema,
    diagnostics: {
      scenario_count: results.length,
      scenario_pass_count: results.filter((result) => result.status === "pass").length,
      scenario_fail_count: results.filter((result) => result.status === "fail").length,
      expectation_pass_count: results.filter((result) => result.expectation_status === "pass").length,
      expectation_fail_count: results.filter((result) => result.expectation_status === "fail").length,
      packet_expectations_pass: results.every((result) => result.expectation_status === "pass"),
    },
    results,
  };

  const text = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${text}\n`);
  } else {
    console.log(text);
  }
  if (!output.diagnostics.packet_expectations_pass) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

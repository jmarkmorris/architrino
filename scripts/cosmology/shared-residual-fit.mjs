#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "shared-residual-mock.json");
const DEFAULT_REQUIRED_FAMILIES = ["SN", "BAO", "CMB", "WL", "RSD", "BBN"];

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
  console.log(`Usage: node scripts/cosmology/shared-residual-fit.mjs [options]

Options:
  --input PATH  Shared residual input packet. Defaults to scripts/cosmology/shared-residual-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This evaluates the mock shared cosmology residual gate:
  R_shared = sum_X r_X^T C_X^{-1} r_X + lambda * sum_{X<Y} ||Pi_X theta_sea - Pi_Y theta_sea||^2.
It is a validation scaffold, not a cosmological parameter fitter.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function assertArrayOfNumbers(value, label) {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "number" || !Number.isFinite(entry))) {
    throw new Error(`${label} must be an array of finite numbers.`);
  }
  return value;
}

function solveLinearSystem(matrix, vector) {
  const n = vector.length;
  const augmented = matrix.map((row, i) => [...row, vector[i]]);

  for (let pivot = 0; pivot < n; pivot += 1) {
    let best = pivot;
    for (let row = pivot + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[best][pivot])) {
        best = row;
      }
    }
    if (Math.abs(augmented[best][pivot]) < 1e-15) {
      throw new Error("Covariance matrix is singular or ill-conditioned.");
    }
    if (best !== pivot) {
      [augmented[pivot], augmented[best]] = [augmented[best], augmented[pivot]];
    }

    const pivotValue = augmented[pivot][pivot];
    for (let col = pivot; col <= n; col += 1) {
      augmented[pivot][col] /= pivotValue;
    }

    for (let row = 0; row < n; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let col = pivot; col <= n; col += 1) {
        augmented[row][col] -= factor * augmented[pivot][col];
      }
    }
  }

  return augmented.map((row) => row[n]);
}

function quadraticForm(observable) {
  const residual = assertArrayOfNumbers(observable.residual, `${observable.family}.residual`);
  if (observable.covariance_diagonal) {
    const diagonal = assertArrayOfNumbers(
      observable.covariance_diagonal,
      `${observable.family}.covariance_diagonal`
    );
    if (diagonal.length !== residual.length) {
      throw new Error(`${observable.family}.covariance_diagonal length must match residual length.`);
    }
    return residual.reduce((sum, value, index) => {
      if (diagonal[index] <= 0) {
        throw new Error(`${observable.family}.covariance_diagonal entries must be positive.`);
      }
      return sum + (value * value) / diagonal[index];
    }, 0);
  }

  if (observable.covariance) {
    const matrix = observable.covariance;
    if (
      !Array.isArray(matrix) ||
      matrix.length !== residual.length ||
      matrix.some((row) => !Array.isArray(row) || row.length !== residual.length)
    ) {
      throw new Error(`${observable.family}.covariance must be a square matrix matching residual length.`);
    }
    const numericMatrix = matrix.map((row, rowIndex) =>
      assertArrayOfNumbers(row, `${observable.family}.covariance[${rowIndex}]`)
    );
    const solved = solveLinearSystem(numericMatrix, residual);
    return residual.reduce((sum, value, index) => sum + value * solved[index], 0);
  }

  return residual.reduce((sum, value) => sum + value * value, 0);
}

function projectionPenalty(left, right, weights) {
  const leftProjection = left.projection && typeof left.projection === "object" ? left.projection : {};
  const rightProjection = right.projection && typeof right.projection === "object" ? right.projection : {};
  const sharedKeys = Object.keys(leftProjection).filter((key) =>
    Object.prototype.hasOwnProperty.call(rightProjection, key)
  );
  const terms = sharedKeys.map((key) => {
    const weight = Number(weights[key] ?? 1);
    const delta = Number(leftProjection[key]) - Number(rightProjection[key]);
    if (!Number.isFinite(weight) || !Number.isFinite(delta)) {
      throw new Error(`Projection key ${key} must have finite numeric values.`);
    }
    return {
      key,
      weight,
      delta,
      contribution: weight * delta * delta,
    };
  });
  return {
    pair: `${left.family}/${right.family}`,
    shared_keys: sharedKeys,
    value: terms.reduce((sum, term) => sum + term.contribution, 0),
    terms,
  };
}

function gate(status, value, threshold, failureCode) {
  return { status, value, threshold, failure_code: status === "pass" ? null : failureCode };
}

function evaluate(input, inputPath) {
  const requiredFamilies = Array.isArray(input.required_families)
    ? input.required_families
    : DEFAULT_REQUIRED_FAMILIES;
  const observables = Array.isArray(input.observables) ? input.observables : [];
  const familySet = new Set(observables.map((observable) => observable.family));
  const missingFamilies = requiredFamilies.filter((family) => !familySet.has(family));
  const duplicateFamilies = observables
    .map((observable) => observable.family)
    .filter((family, index, families) => families.indexOf(family) !== index);

  const residualTerms = Object.fromEntries(
    observables.map((observable) => [observable.family, quadraticForm(observable)])
  );
  const residualTotal = Object.values(residualTerms).reduce((sum, value) => sum + value, 0);

  const weights = input.projection_weights && typeof input.projection_weights === "object"
    ? input.projection_weights
    : {};
  const projectionPenalties = [];
  for (let i = 0; i < observables.length; i += 1) {
    for (let j = i + 1; j < observables.length; j += 1) {
      projectionPenalties.push(projectionPenalty(observables[i], observables[j], weights));
    }
  }
  const projectionPenaltyRaw = projectionPenalties.reduce((sum, entry) => sum + entry.value, 0);
  const lambda = Number(input.lambda ?? 1);
  if (!Number.isFinite(lambda) || lambda < 0) {
    throw new Error("lambda must be a finite nonnegative number.");
  }
  const sharedResidual = residualTotal + lambda * projectionPenaltyRaw;

  const thresholds = input.thresholds && typeof input.thresholds === "object" ? input.thresholds : {};
  const residualThreshold = Number(thresholds.residual_total_max ?? Infinity);
  const projectionThreshold = Number(thresholds.projection_penalty_raw_max ?? Infinity);
  const sharedThreshold = Number(thresholds.shared_residual_max ?? Infinity);
  const minSharedKeys = Number(thresholds.min_shared_projection_keys ?? 1);
  const projectionOverlapFailures = projectionPenalties.filter(
    (entry) => entry.shared_keys.length < minSharedKeys
  );

  const gates = {
    observable_coverage: gate(
      missingFamilies.length === 0 && duplicateFamilies.length === 0 ? "pass" : "fail",
      { missing_families: missingFamilies, duplicate_families: duplicateFamilies },
      "all required families exactly once",
      "observable-coverage-open"
    ),
    residual_total: gate(
      residualTotal <= residualThreshold ? "pass" : "fail",
      residualTotal,
      residualThreshold,
      "residual-total-open"
    ),
    projection_penalty: gate(
      projectionPenaltyRaw <= projectionThreshold ? "pass" : "fail",
      projectionPenaltyRaw,
      projectionThreshold,
      "projection-penalty-open"
    ),
    projection_overlap: gate(
      projectionOverlapFailures.length === 0 ? "pass" : "fail",
      projectionOverlapFailures.map((entry) => entry.pair),
      `at least ${minSharedKeys} shared projection keys per pair`,
      "projection-overlap-open"
    ),
    shared_residual: gate(
      sharedResidual <= sharedThreshold ? "pass" : "fail",
      sharedResidual,
      sharedThreshold,
      "shared-residual-open"
    ),
  };

  const firstFailedGate = Object.entries(gates).find(([, entry]) => entry.status !== "pass");

  return {
    schema: "cosmology-shared-residual-fit-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    metadata: input.metadata ?? {},
    required_families: requiredFamilies,
    families: observables.map((observable) => observable.family),
    residual_terms: residualTerms,
    projection_penalties: projectionPenalties,
    totals: {
      observable_residual: residualTotal,
      projection_penalty_raw: projectionPenaltyRaw,
      lambda,
      projection_penalty_weighted: lambda * projectionPenaltyRaw,
      shared_residual: sharedResidual,
    },
    gates,
    failure_code: firstFailedGate ? firstFailedGate[1].failure_code : null,
    promotion_status: firstFailedGate ? "mock_packet_rejected" : "mock_packet_pass",
    note:
      "This is a mock validation scaffold for shared-state consistency. Passing it does not validate cosmology; failing it identifies residual, coverage, or projection-split structure that a real packet must repair.",
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

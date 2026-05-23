#!/usr/bin/env node
import fs from "node:fs";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const OUTPUT_SCHEMA = "a0-root-loop-branch-coordinate-checker/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const COMPONENTS = ["x", "y", "z"];
const POLARITIES = ["+", "-"];
const PROJECTIONS = ["radial", "tangential", "radial_tangential"];
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";

const FAMILY_SPECS = {
  im_loop_curl: [
    ["M", "logJ_curl"],
    ["M", "delay_curl"],
    ["M", "loop_area"],
  ],
  io_loop_curl: [
    ["O", "logJ_curl"],
    ["O", "delay_curl"],
    ["O", "loop_area"],
  ],
  imo_loop_curl: [
    ["M", "logJ_curl"],
    ["M", "delay_curl"],
    ["M", "loop_area"],
    ["O", "logJ_curl"],
    ["O", "delay_curl"],
    ["O", "loop_area"],
  ],
  im_loop_full: [
    ["M", "logJ_sum"],
    ["M", "delay_sum"],
    ["M", "logJ_curl"],
    ["M", "delay_curl"],
    ["M", "loop_area"],
  ],
};

function usage() {
  return `Usage:
  node scripts/mass-map/a0-root-loop-branch-coordinate-checker.mjs --intake PATH --out PATH [options]

Options:
  --family VALUE              ${Object.keys(FAMILY_SPECS).join(", ")}, or all. Defaults to all.
  --projection VALUE          radial, tangential, or radial_tangential. Defaults to radial_tangential.
  --tolerance VALUE           Held-out residual tolerance. Defaults to 0.02.
  --ridge VALUE               Ridge regularization. Defaults to 1e-9.
  --rows VALUE                Comma-separated row numbers. Defaults to all.
  --pretty                    Pretty-print JSON.
  --help                      Show this help.

This fail-closed checker tests two-edge active-root loop coordinates:
I<-X and X<-I, with X in {M,O}. It uses only pre-fit
active_causal_root_ledger delay/J fields and corrected carrier-frame directions.
It does not authorize corrected rerun or accepted history.`;
}

function parseArgs(argv) {
  const args = {
    intake: null,
    out: null,
    family: "all",
    projection: "radial_tangential",
    tolerance: 0.02,
    ridge: 1e-9,
    rows: null,
    pretty: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      console.log(usage());
      process.exit(0);
    } else if (arg === "--intake") {
      args.intake = argv[++index];
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--family") {
      args.family = argv[++index];
    } else if (arg === "--projection") {
      args.projection = argv[++index];
    } else if (arg === "--tolerance") {
      args.tolerance = Number(argv[++index]);
    } else if (arg === "--ridge") {
      args.ridge = Number(argv[++index]);
    } else if (arg === "--rows") {
      args.rows = String(argv[++index])
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isInteger(value));
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.intake || !args.out) {
    throw new Error("--intake and --out are required.");
  }
  if (args.family !== "all" && !FAMILY_SPECS[args.family]) {
    throw new Error(`--family must be all or one of ${Object.keys(FAMILY_SPECS).join(", ")}.`);
  }
  if (!PROJECTIONS.includes(args.projection)) {
    throw new Error(`--projection must be one of ${PROJECTIONS.join(", ")}.`);
  }
  if (!Number.isFinite(args.tolerance) || args.tolerance <= 0) {
    throw new Error("--tolerance must be positive.");
  }
  if (!Number.isFinite(args.ridge) || args.ridge < 0) {
    throw new Error("--ridge must be nonnegative.");
  }
  return args;
}

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function writeJson(path, value, pretty) {
  fs.writeFileSync(path, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function rowsOf(artifact, selectedRows) {
  const rows = Array.isArray(artifact?.rows) ? artifact.rows : [];
  if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
    return rows;
  }
  const selected = new Set(selectedRows);
  return rows.filter((row) => selected.has(row.row));
}

function finiteNumber(value) {
  return Number.isFinite(value);
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(finiteNumber);
}

function dot(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function sub(a, b) {
  return a.map((value, index) => value - b[index]);
}

function scale(a, factor) {
  return a.map((value) => value * factor);
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function normalize(a) {
  const value = norm(a);
  return value > 0 ? scale(a, 1 / value) : null;
}

function add(a, b) {
  return a.map((value, index) => value + b[index]);
}

function bodyState(sample, bodyId) {
  const body = sample?.bodies?.[bodyId];
  return finiteVector3(body?.position) && finiteVector3(body?.velocity) ? body : null;
}

function carrierFrame(sample) {
  const plus = bodyState(sample, "I+");
  const minus = bodyState(sample, "I-");
  if (!plus || !minus) {
    return null;
  }
  const radial = normalize(sub(plus.position, minus.position));
  if (!radial) {
    return null;
  }
  const relativeVelocity = sub(plus.velocity, minus.velocity);
  const tangentialRaw = sub(relativeVelocity, scale(radial, dot(relativeVelocity, radial)));
  let tangential = normalize(tangentialRaw);
  let tangentFallback = false;
  if (!tangential) {
    tangential = normalize(relativeVelocity);
    tangentFallback = true;
  }
  if (!tangential) {
    return null;
  }
  return {
    radial,
    tangential,
    used_tangent_fallback: tangentFallback,
  };
}

function circularDistance(a, b, period) {
  const raw = Math.abs(a - b);
  if (!Number.isFinite(period) || period <= 0) {
    return raw;
  }
  const wrapped = raw % period;
  return Math.min(wrapped, period - wrapped);
}

function nearestRows(rows, t, period) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const row of rows) {
    if (!Number.isFinite(row?.t)) {
      continue;
    }
    bestDistance = Math.min(bestDistance, circularDistance(row.t, t, period));
  }
  const tolerance = Math.max(Math.abs(period ?? 0) * 1e-10, 1e-12);
  return rows.filter((row) => Number.isFinite(row?.t) && circularDistance(row.t, t, period) <= bestDistance + tolerance);
}

function nearestSample(samples, t, period) {
  return nearestRows(samples, t, period)[0] ?? null;
}

function ledgerFor(row) {
  return row?.residual_ledgers?.[LEDGER_KEY] ?? null;
}

function rowMissingFields(row) {
  const missing = [];
  const ledger = ledgerFor(row);
  if (ledger?.schema !== LEDGER_SCHEMA) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.schema=${LEDGER_SCHEMA}`);
  }
  if (!Array.isArray(ledger?.sampled_forcing?.samples) || ledger.sampled_forcing.samples.length < 2) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[2+]`);
  } else {
    ledger.sampled_forcing.samples.forEach((sample, index) => {
      if (!Number.isFinite(sample?.t)) {
        missing.push(`sampled_forcing.samples[${index}].t`);
      }
      if (!finiteVector3(sample?.layers?.I?.residual_forcing)) {
        missing.push(`sampled_forcing.samples[${index}].layers.I.residual_forcing[3]`);
      }
    });
  }
  if (!Array.isArray(row?.active_causal_root_ledger) || row.active_causal_root_ledger.length < 2) {
    missing.push("rows[].active_causal_root_ledger[2+]");
  }
  if (!Array.isArray(row?.samples) || row.samples.length < 2) {
    missing.push("rows[].samples[2+] corrected carrier states");
  }
  return missing;
}

function residualSamples(row) {
  return ledgerFor(row).sampled_forcing.samples.map((sample, index) => ({
    sample_index: index,
    t: sample.t,
    target: sample.layers.I.residual_forcing,
  }));
}

function rootKey(receiver, source) {
  return `${receiver}<-${source}`;
}

function bodyId(layer, polarity) {
  return `${layer}${polarity}`;
}

function safeLogAbsJ(root) {
  const value = Math.abs(Number(root?.J));
  return value > 0 && Number.isFinite(value) ? Math.log(value) : null;
}

function finiteMean(values) {
  const finite = values.filter(Number.isFinite);
  if (finite.length === 0) {
    return null;
  }
  return finite.reduce((sum, value) => sum + value, 0) / finite.length;
}

function activeRootsAt(row, sample) {
  return nearestRows(row.active_causal_root_ledger, sample.t, row.period);
}

function rootMapAt(row, sample) {
  const map = new Map();
  for (const root of activeRootsAt(row, sample)) {
    map.set(rootKey(root.receiver, root.source), root);
  }
  return map;
}

function loopScalarsForLayer(map, layer) {
  const logJSums = [];
  const delaySums = [];
  const logJCurls = [];
  const delayCurls = [];
  const loopAreas = [];
  let pairCount = 0;
  for (const iPolarity of POLARITIES) {
    for (const xPolarity of POLARITIES) {
      const iBody = bodyId("I", iPolarity);
      const xBody = bodyId(layer, xPolarity);
      const intoI = map.get(rootKey(iBody, xBody));
      const outOfI = map.get(rootKey(xBody, iBody));
      const logIntoI = safeLogAbsJ(intoI);
      const logOutOfI = safeLogAbsJ(outOfI);
      if (
        !intoI ||
        !outOfI ||
        !Number.isFinite(intoI.delay) ||
        !Number.isFinite(outOfI.delay) ||
        logIntoI === null ||
        logOutOfI === null
      ) {
        continue;
      }
      const logJSum = logOutOfI + logIntoI;
      const delaySum = outOfI.delay + intoI.delay;
      const logJCurl = logOutOfI - logIntoI;
      const delayCurl = outOfI.delay - intoI.delay;
      logJSums.push(logJSum);
      delaySums.push(delaySum);
      logJCurls.push(logJCurl);
      delayCurls.push(delayCurl);
      loopAreas.push(logJCurl * delaySum - delayCurl * logJSum);
      pairCount += 1;
    }
  }
  if (pairCount === 0) {
    return null;
  }
  return {
    pair_count: pairCount,
    logJ_sum: finiteMean(logJSums),
    delay_sum: finiteMean(delaySums),
    logJ_curl: finiteMean(logJCurls),
    delay_curl: finiteMean(delayCurls),
    loop_area: finiteMean(loopAreas),
  };
}

function projectionDirections(frame, projection) {
  if (projection === "radial") {
    return [["e_I,r", frame.radial]];
  }
  if (projection === "tangential") {
    return [["e_I,theta", frame.tangential]];
  }
  return [
    ["e_I,r", frame.radial],
    ["e_I,theta", frame.tangential],
  ];
}

function featureScalars(family, layerScalars) {
  const spec = FAMILY_SPECS[family];
  return spec.map(([layer, scalar]) => ({
    name: `${layer}:${scalar}`,
    value: layerScalars[layer]?.[scalar] ?? null,
  }));
}

function buildPacket(row, family, args) {
  const samples = residualSamples(row);
  const equations = [];
  const featureNames = [];
  let minLoopPairCount = Number.POSITIVE_INFINITY;
  let tangentFallbackCount = 0;
  for (const sample of samples) {
    const frameSample = nearestSample(row.samples, sample.t, row.period);
    const frame = carrierFrame(frameSample);
    if (!frame) {
      return {
        status: "blocked",
        failure_code: "missing-corrected-carrier-frame",
        missing_fields: [`rows[].samples nearest t=${sample.t}`],
      };
    }
    if (frame.used_tangent_fallback) {
      tangentFallbackCount += 1;
    }
    const map = rootMapAt(row, sample);
    const layerScalars = {
      M: loopScalarsForLayer(map, "M"),
      O: loopScalarsForLayer(map, "O"),
    };
    const scalars = featureScalars(family, layerScalars);
    if (scalars.some((entry) => !Number.isFinite(entry.value))) {
      return {
        status: "blocked",
        failure_code: "missing-root-loop-pairs",
        missing_fields: [`active_causal_root_ledger reciprocal I<->X pairs at t=${sample.t}`],
      };
    }
    minLoopPairCount = Math.min(
      minLoopPairCount,
      ...Object.values(layerScalars)
        .filter(Boolean)
        .map((entry) => entry.pair_count)
    );
    const directions = projectionDirections(frame, args.projection);
    if (featureNames.length === 0) {
      for (const scalar of scalars) {
        for (const [directionName] of directions) {
          featureNames.push(`${scalar.name}:${directionName}`);
        }
      }
    }
    for (let component = 0; component < COMPONENTS.length; component += 1) {
      const values = [];
      for (const scalar of scalars) {
        for (const [, direction] of directions) {
          values.push(scalar.value * direction[component]);
        }
      }
      equations.push({
        sample_index: sample.sample_index,
        component: COMPONENTS[component],
        values,
        target: sample.target[component],
      });
    }
  }
  return {
    status: "computed",
    family,
    projection: args.projection,
    sample_count: samples.length,
    equation_count: equations.length,
    feature_count: featureNames.length,
    feature_names: featureNames,
    minimum_loop_pair_count: minLoopPairCount,
    tangent_fallback_count: tangentFallbackCount,
    equations,
  };
}

function gaussianSolve(matrix, vector) {
  const n = vector.length;
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < n; row += 1) {
      if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) {
        pivot = row;
      }
    }
    if (Math.abs(a[pivot][column]) < 1e-14) {
      return null;
    }
    [a[column], a[pivot]] = [a[pivot], a[column]];
    const pivotValue = a[column][column];
    for (let entry = column; entry <= n; entry += 1) {
      a[column][entry] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === column) {
        continue;
      }
      const factor = a[row][column];
      for (let entry = column; entry <= n; entry += 1) {
        a[row][entry] -= factor * a[column][entry];
      }
    }
  }
  return a.map((row) => row[n]);
}

function normalEquations(equations, ridge) {
  const p = equations[0]?.values.length ?? 0;
  const matrix = Array.from({ length: p }, () => new Array(p).fill(0));
  const vector = new Array(p).fill(0);
  for (const equation of equations) {
    for (let i = 0; i < p; i += 1) {
      vector[i] += equation.values[i] * equation.target;
      for (let j = 0; j < p; j += 1) {
        matrix[i][j] += equation.values[i] * equation.values[j];
      }
    }
  }
  for (let i = 0; i < p; i += 1) {
    matrix[i][i] += ridge;
  }
  return { matrix, vector };
}

function fit(equations, ridge) {
  const { matrix, vector } = normalEquations(equations, ridge);
  return gaussianSolve(matrix, vector);
}

function relativeResidual(equations, coefficients) {
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (const equation of equations) {
    const predicted = dot(equation.values, coefficients);
    const residual = equation.target - predicted;
    residualNormSquared += residual * residual;
    targetNormSquared += equation.target * equation.target;
  }
  return Math.sqrt(residualNormSquared) / Math.max(Math.sqrt(targetNormSquared), 1e-30);
}

function matrixRank(rows) {
  if (rows.length === 0) {
    return 0;
  }
  const a = rows.map((row) => [...row]);
  const m = a.length;
  const n = a[0].length;
  let rank = 0;
  for (let column = 0; column < n && rank < m; column += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < m; row += 1) {
      if (Math.abs(a[row][column]) > Math.abs(a[pivot][column])) {
        pivot = row;
      }
    }
    if (Math.abs(a[pivot][column]) < 1e-10) {
      continue;
    }
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const pivotValue = a[rank][column];
    for (let entry = column; entry < n; entry += 1) {
      a[rank][entry] /= pivotValue;
    }
    for (let row = 0; row < m; row += 1) {
      if (row === rank) {
        continue;
      }
      const factor = a[row][column];
      for (let entry = column; entry < n; entry += 1) {
        a[row][entry] -= factor * a[rank][entry];
      }
    }
    rank += 1;
  }
  return rank;
}

function leverageDiagnostics(packet, ridge) {
  const equations = packet.equations;
  const p = packet.feature_count;
  const { matrix } = normalEquations(equations, ridge);
  const rows = equations.map((equation) => equation.values);
  let trace = 0;
  let maxLeverage = 0;
  for (const row of rows) {
    const solved = gaussianSolve(matrix, row);
    const leverage = solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
    trace += leverage;
    maxLeverage = Math.max(maxLeverage, leverage);
  }
  const bucketsByFeature = [];
  for (let featureIndex = 0; featureIndex < p; featureIndex += 1) {
    const buckets = new Set();
    for (const equation of equations) {
      if (Math.abs(equation.values[featureIndex]) > 1e-12) {
        buckets.add(equation.sample_index);
      }
    }
    bucketsByFeature.push(buckets.size);
  }
  const rank = matrixRank(rows);
  return {
    equation_count: equations.length,
    coefficient_count: p,
    feature_rank: rank,
    full_column_rank: rank === p,
    trace_h: trace,
    trace_h_over_equations: trace / equations.length,
    max_leverage: maxLeverage,
    minimum_observation_buckets_per_basis_group: Math.min(...bucketsByFeature),
    overdetermined: equations.length > p,
  };
}

function dfGuard(packet, ridge) {
  const diagnostics = leverageDiagnostics(packet, ridge);
  const passed =
    diagnostics.trace_h_over_equations <= 0.5 &&
    diagnostics.max_leverage <= 0.5 &&
    diagnostics.minimum_observation_buckets_per_basis_group >= 2 &&
    diagnostics.overdetermined &&
    diagnostics.full_column_rank;
  return {
    residual: "R_df",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    ...diagnostics,
  };
}

function fullFitResidual(packet, ridge) {
  const coefficients = fit(packet.equations, ridge);
  if (!coefficients) {
    return {
      status: "failed",
      failure_code: "singular-normal-equation",
      relative_residual: null,
      coefficients: [],
    };
  }
  return {
    status: "computed",
    failure_code: null,
    relative_residual: relativeResidual(packet.equations, coefficients),
    coefficients,
  };
}

function splitIndices(sampleCount) {
  const indices = Array.from({ length: sampleCount }, (_entry, index) => index);
  const firstHalf = indices.filter((index) => index < sampleCount / 2);
  const secondHalf = indices.filter((index) => index >= sampleCount / 2);
  return [
    ["even_to_odd", indices.filter((index) => index % 2 === 0), indices.filter((index) => index % 2 === 1)],
    ["odd_to_even", indices.filter((index) => index % 2 === 1), indices.filter((index) => index % 2 === 0)],
    ["first_half_to_second_half", firstHalf, secondHalf],
    ["second_half_to_first_half", secondHalf, firstHalf],
  ];
}

function heldOutResidual(packet, ridge, tolerance) {
  const splits = [];
  let maxHeldOut = 0;
  for (const [name, trainSamples, testSamples] of splitIndices(packet.sample_count)) {
    const train = packet.equations.filter((equation) => trainSamples.includes(equation.sample_index));
    const test = packet.equations.filter((equation) => testSamples.includes(equation.sample_index));
    const coefficients = fit(train, ridge);
    const residual = coefficients ? relativeResidual(test, coefficients) : Number.POSITIVE_INFINITY;
    maxHeldOut = Math.max(maxHeldOut, residual);
    splits.push({
      split: name,
      train_sample_count: trainSamples.length,
      held_out_sample_count: testSamples.length,
      held_out_relative_residual: residual,
    });
  }
  return {
    residual: "R_xval",
    status: maxHeldOut <= tolerance ? "passed" : "failed",
    failure_code: maxHeldOut <= tolerance ? null : "overfit_holdout_fail",
    tolerance,
    max_held_out_relative_residual: maxHeldOut,
    splits,
  };
}

function solveFamily(row, family, args) {
  const packet = buildPacket(row, family, args);
  if (packet.status !== "computed") {
    return {
      family,
      status: "blocked_missing_root_loop_coordinate_fields",
      failure_code: packet.failure_code,
      missing_fields: packet.missing_fields ?? [],
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      corrected_rerun_authorized: false,
    };
  }
  const full = fullFitResidual(packet, args.ridge);
  const df = dfGuard(packet, args.ridge);
  const heldOut = heldOutResidual(packet, args.ridge, args.tolerance);
  const numericallyPassed = df.status === "passed" && heldOut.status === "passed";
  const rootLedgerStable = row?.validation?.root_ledger_stable_under_refinement === true;
  return {
    family,
    status: numericallyPassed
      ? "root_loop_branch_coordinate_diagnostic_candidate"
      : "root_loop_branch_coordinate_no_go",
    failure_code: numericallyPassed ? null : df.failure_code ?? heldOut.failure_code,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    corrected_rerun_authorized: false,
    root_ledger_stable_under_refinement: rootLedgerStable,
    source_contract: {
      coordinate_source_fields: [
        "active_causal_root_ledger.receiver",
        "active_causal_root_ledger.source",
        "active_causal_root_ledger.relation",
        "active_causal_root_ledger.t",
        "active_causal_root_ledger.delay",
        "active_causal_root_ledger.J",
        "corrected carrier state samples for e_I,r/e_I,theta projection directions",
      ],
      residual_used_as_feature: false,
      observed_benchmarks_used: false,
      root_transport_source_record_used: false,
    },
    branch_coordinate: {
      coordinate_name: "mu_root_loop_holonomy",
      revision_type: "finer_root_branch_coordinate",
      loop_family: family,
      projection: args.projection,
      definition:
        "Two-edge reciprocal active-root loops I<-X and X<-I averaged over available polarity pairs, using log|J| circulation, delay circulation, and loop area before residual fitting.",
      equality_group_key:
        "receiver/source reciprocal layer pair + polarity-pair average + loop scalar + carrier-frame projection",
    },
    fit_summary: {
      sample_count: packet.sample_count,
      equation_count: packet.equation_count,
      feature_count: packet.feature_count,
      feature_names: packet.feature_names,
      minimum_loop_pair_count: packet.minimum_loop_pair_count,
      tangent_fallback_count: packet.tangent_fallback_count,
    },
    full_fit: full,
    degrees_of_freedom_guard: df,
    held_out_residual: heldOut,
  };
}

function solveRow(row, args) {
  const missing = rowMissingFields(row);
  if (missing.length > 0) {
    return {
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_root_loop_coordinate_fields",
      failure_code: "missing-root-loop-coordinate-fields",
      missing_fields: missing,
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      corrected_rerun_authorized: false,
      families: [],
    };
  }
  const families = args.family === "all" ? Object.keys(FAMILY_SPECS) : [args.family];
  const results = families.map((family) => solveFamily(row, family, args));
  const candidateCount = results.filter((result) => result.status === "root_loop_branch_coordinate_diagnostic_candidate").length;
  const blockedCount = results.filter((result) => String(result.status).startsWith("blocked_")).length;
  return {
    row: row.row,
    status: blockedCount > 0 ? "blocked_missing_root_loop_coordinate_fields" : candidateCount > 0 ? "diagnostic_candidate" : "root_loop_branch_coordinate_no_go",
    failure_code: blockedCount > 0 ? "missing-root-loop-coordinate-fields" : candidateCount > 0 ? null : "overfit_holdout_fail",
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    corrected_rerun_authorized: false,
    families: results,
  };
}

function buildOutput(intakePath, artifact, args) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  const rows = topMissing.length === 0 ? rowsOf(artifact, args.rows).map((row) => solveRow(row, args)) : [];
  const familyRows = rows.flatMap((row) => row.families ?? []);
  const candidateCount = familyRows.filter((row) => row.status === "root_loop_branch_coordinate_diagnostic_candidate").length;
  const noGoCount = familyRows.filter((row) => row.status === "root_loop_branch_coordinate_no_go").length;
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status:
      topMissing.length > 0 || blockedCount > 0
        ? "blocked_missing_root_loop_coordinate_fields"
        : candidateCount > 0
          ? "diagnostic_candidate"
          : "no_go",
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    corrected_rerun_authorized: false,
    inputs: {
      intake: intakePath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
    },
    parameters: {
      family: args.family,
      projection: args.projection,
      tolerance: args.tolerance,
      ridge: args.ridge,
      held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      family_count: familyRows.length,
      candidate_count: candidateCount,
      no_go_count: noGoCount,
      blocked_count: blockedCount,
    },
    rows,
    promotion_decision: "priority-only",
    note:
      "This artifact is a root-loop branch-coordinate diagnostic. It does not authorize corrected rerun or accepted history.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const artifact = readJson(args.intake);
  writeJson(args.out, buildOutput(args.intake, artifact, args), args.pretty);
}

main();

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const TWO_PI = 2 * Math.PI;
const EPS = 1e-12;
const ACCEPTED_HISTORY_STATUS = "accepted_history_segment";
const LAYERS = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const BODY_IDS = LAYERS.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
const FAILURE_CODES = [
  "accepted-history-status-missing",
  "sample-ledger-missing",
  "layer-body-state-missing",
  "layer-phase-unresolved",
  "layer-plane-degenerate",
  "root-ledger-missing",
  "source-weight-missing",
  "pair-source-event-missing",
  "daughter-certificate-missing",
  "wake-phase-ledger-missing",
  "gauge-probe-missing",
];

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    pretty: false,
    printContract: false,
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
    } else if (arg === "--print-contract") {
      args.printContract = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.input === undefined) {
    throw new Error("--input requires a path.");
  }
  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }
  if (!args.printContract && !args.input) {
    throw new Error("Pass --input PATH or --print-contract.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/accepted-history-layer-phase-extractor.mjs [options]

Options:
  --input PATH       Accepted-history artifact to inspect.
  --print-contract  Print the accepted-history layer-phase extraction contract.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON output.
  --help             Show this help.

This extractor computes provisional layer relative vectors, angular-momentum
vectors, phase samples, and plane-stability residuals from accepted-history
rows. Verification is required for advancement: it does not emit pair-phase-certificate input unless
pair-source, daughter, substrate-derived wake, source-weight, and quotient-audit
fields are already explicit in the input.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(finiteNumber);
}

function cleanNumber(value) {
  return Math.abs(value) < 1e-15 ? 0 : value;
}

function cleanVector(vector) {
  return vector.map(cleanNumber);
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function sub(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function unit(vector) {
  const length = norm(vector);
  return length <= EPS ? [0, 0, 0] : scale(vector, 1 / length);
}

function meanVector(vectors) {
  if (vectors.length === 0) {
    return [0, 0, 0];
  }
  return scale(vectors.reduce(add, [0, 0, 0]), 1 / vectors.length);
}

function min(values) {
  return values.length === 0 ? null : cleanNumber(Math.min(...values));
}

function max(values) {
  return values.length === 0 ? null : cleanNumber(Math.max(...values));
}

function mean(values) {
  return values.length === 0 ? null : cleanNumber(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function projectOntoPlane(vector, normal) {
  return sub(vector, scale(normal, dot(vector, normal)));
}

function angleDistanceToTurn(angle) {
  const turnCount = Math.round(angle / TWO_PI);
  return {
    turn_count: turnCount,
    residual: cleanNumber(Math.abs(angle - turnCount * TWO_PI)),
  };
}

function unwrapAngles(angles) {
  if (angles.length === 0) {
    return [];
  }
  const unwrapped = [angles[0]];
  for (let i = 1; i < angles.length; i += 1) {
    let next = angles[i];
    const prior = unwrapped[i - 1];
    while (next - prior > Math.PI) {
      next -= TWO_PI;
    }
    while (next - prior < -Math.PI) {
      next += TWO_PI;
    }
    unwrapped.push(next);
  }
  return unwrapped;
}

function contract() {
  return {
    schema: "aaa-accepted-history-layer-phase-extractor-contract/v1",
    purpose:
      "Compute single accepted-history layer phase candidates without manufacturing pair-source or Bell-family phase rows.",
    required_history_row_fields: [
      "status=accepted_history_segment",
      "period",
      "samples[*].t",
      "samples[*].bodies.I+.{position,velocity}",
      "samples[*].bodies.I-.{position,velocity}",
      "samples[*].bodies.M+.{position,velocity}",
      "samples[*].bodies.M-.{position,velocity}",
      "samples[*].bodies.O+.{position,velocity}",
      "samples[*].bodies.O-.{position,velocity}",
      "active_causal_root_ledger",
    ],
    computed_layer_quantities: [
      "relative_position = x_{ell+} - x_{ell-}",
      "relative_velocity = v_{ell+} - v_{ell-}",
      "reduced_angular_momentum = 1/2 relative_position x relative_velocity",
      "sample-derived phase in a branch-fixed provisional plane basis",
      "plane-stability residuals",
    ],
    pair_phase_input_policy:
      "No pair-phase-certificate input is emitted unless source_event, source weight, daughters A/B, substrate-derived wake phase, local record phases, and gauge probes are explicit.",
    failure_codes: FAILURE_CODES,
  };
}

function rowList(source) {
  if (Array.isArray(source.rows)) {
    return source.rows;
  }
  if (Array.isArray(source.history_segments)) {
    return source.history_segments;
  }
  if (Array.isArray(source.segments)) {
    return source.segments;
  }
  if (Array.isArray(source.records)) {
    return source.records;
  }
  if (isObject(source)) {
    return [source];
  }
  return [];
}

function sampleBodyState(sample, bodyId) {
  const bodies = sample.bodies ?? sample.state ?? sample.states ?? null;
  if (!bodies) {
    return null;
  }
  if (Array.isArray(bodies)) {
    return bodies.find((body) => body.id === bodyId) ?? null;
  }
  return bodies[bodyId] ?? null;
}

function canonicalSamples(row) {
  const samples = Array.isArray(row.samples) ? row.samples : Array.isArray(row.history) ? row.history : [];
  return samples
    .map((sample) => ({
      ...sample,
      t: finiteNumber(sample.t) ? sample.t : sample.time,
    }))
    .filter((sample) => finiteNumber(sample.t))
    .sort((left, right) => left.t - right.t);
}

function stateFor(sample, bodyId) {
  const state = sampleBodyState(sample, bodyId);
  if (!isObject(state) || !finiteVector3(state.position) || !finiteVector3(state.velocity)) {
    return null;
  }
  return {
    position: state.position.map(Number),
    velocity: state.velocity.map(Number),
  };
}

function layerSample(sample, layer) {
  const plus = stateFor(sample, `${layer}+`);
  const minus = stateFor(sample, `${layer}-`);
  if (!plus || !minus) {
    return null;
  }
  const relativePosition = sub(plus.position, minus.position);
  const relativeVelocity = sub(plus.velocity, minus.velocity);
  return {
    t: sample.t,
    relative_position: relativePosition,
    relative_velocity: relativeVelocity,
    reduced_angular_momentum: scale(cross(relativePosition, relativeVelocity), 0.5),
  };
}

function firstNonzeroProjection(samples, normal) {
  for (const sample of samples) {
    const projected = projectOntoPlane(sample.relative_position, normal);
    if (norm(projected) > EPS) {
      return projected;
    }
  }
  return [0, 0, 0];
}

function basisForLayer(samples) {
  const angularMomenta = samples.map((sample) => sample.reduced_angular_momentum);
  let normal = unit(meanVector(angularMomenta));
  if (norm(normal) <= EPS) {
    for (const sample of samples) {
      const fallback = unit(cross(sample.relative_position, sample.relative_velocity));
      if (norm(fallback) > EPS) {
        normal = fallback;
        break;
      }
    }
  }
  if (norm(normal) <= EPS) {
    return null;
  }
  const e1Seed = firstNonzeroProjection(samples, normal);
  if (norm(e1Seed) <= EPS) {
    return null;
  }
  const e1 = unit(e1Seed);
  const e2 = unit(cross(normal, e1));
  if (norm(e2) <= EPS) {
    return null;
  }
  return { normal, e1, e2 };
}

function phaseSampleRows(samples, basis) {
  const rawAngles = samples.map((sample) =>
    Math.atan2(dot(sample.relative_position, basis.e2), dot(sample.relative_position, basis.e1))
  );
  const unwrapped = unwrapAngles(rawAngles);
  return samples.map((sample, index) => ({
    t: cleanNumber(sample.t),
    relative_position: cleanVector(sample.relative_position),
    relative_velocity: cleanVector(sample.relative_velocity),
    reduced_angular_momentum: cleanVector(sample.reduced_angular_momentum),
    phase: cleanNumber(rawAngles[index]),
    phase_unwrapped: cleanNumber(unwrapped[index]),
  }));
}

function layerDiagnostics(samples, phaseRows, basis) {
  const radii = samples.map((sample) => norm(sample.relative_position));
  const angularNorms = samples.map((sample) => norm(sample.reduced_angular_momentum));
  const planePositionResiduals = samples.map((sample) => {
    const radius = norm(sample.relative_position);
    return radius <= EPS ? 1 : Math.abs(dot(sample.relative_position, basis.normal)) / radius;
  });
  const angularNormalResiduals = samples.map((sample) => {
    const angularNorm = norm(sample.reduced_angular_momentum);
    if (angularNorm <= EPS) {
      return 1;
    }
    return 1 - Math.abs(dot(unit(sample.reduced_angular_momentum), basis.normal));
  });
  const signFlipCount = samples.filter(
    (sample) =>
      norm(sample.reduced_angular_momentum) > EPS &&
      dot(unit(sample.reduced_angular_momentum), basis.normal) < 0
  ).length;
  const firstPhase = phaseRows[0]?.phase_unwrapped ?? null;
  const lastPhase = phaseRows[phaseRows.length - 1]?.phase_unwrapped ?? null;
  const firstTime = samples[0]?.t ?? null;
  const lastTime = samples[samples.length - 1]?.t ?? null;
  const phaseSpan = firstPhase === null || lastPhase === null ? null : lastPhase - firstPhase;
  const closure = phaseSpan === null ? { turn_count: null, residual: null } : angleDistanceToTurn(phaseSpan);
  const duration = finiteNumber(firstTime) && finiteNumber(lastTime) ? lastTime - firstTime : null;
  const radiusMean = mean(radii);
  const radiusSpread =
    radiusMean === null || Math.abs(radiusMean) <= EPS ? null : cleanNumber((Math.max(...radii) - Math.min(...radii)) / radiusMean);
  return {
    sample_count: samples.length,
    time_window: {
      start: cleanNumber(firstTime),
      end: cleanNumber(lastTime),
      duration: duration === null ? null : cleanNumber(duration),
    },
    radius: {
      min: min(radii),
      max: max(radii),
      mean: radiusMean,
      relative_spread: radiusSpread,
    },
    reduced_angular_momentum_norm: {
      min: min(angularNorms),
      max: max(angularNorms),
      mean: mean(angularNorms),
    },
    mean_reduced_angular_momentum: cleanVector(meanVector(samples.map((sample) => sample.reduced_angular_momentum))),
    plane_stability_residuals: {
      max_position_plane_residual: max(planePositionResiduals),
      max_angular_momentum_normal_residual: max(angularNormalResiduals),
      normal_sign_flip_count: signFlipCount,
    },
    phase_summary: {
      phi_start: firstPhase === null ? null : cleanNumber(firstPhase),
      phi_end: lastPhase === null ? null : cleanNumber(lastPhase),
      omega_integral_candidate: phaseSpan === null ? null : cleanNumber(phaseSpan),
      winding_count_candidate: closure.turn_count,
      phase_closure_residual: closure.residual,
      mean_omega_candidate:
        phaseSpan === null || duration === null || Math.abs(duration) <= EPS
          ? null
          : cleanNumber(phaseSpan / duration),
    },
  };
}

function layerResult(row, layer) {
  const samples = canonicalSamples(row);
  const usable = [];
  let missingBodyStateCount = 0;
  for (const sample of samples) {
    const parsed = layerSample(sample, layer);
    if (!parsed) {
      missingBodyStateCount += 1;
      continue;
    }
    usable.push(parsed);
  }
  const failures = [];
  if (samples.length < 2) {
    failures.push("sample-ledger-missing");
  }
  if (missingBodyStateCount > 0) {
    failures.push("layer-body-state-missing");
  }
  if (usable.length < 2) {
    failures.push("layer-phase-unresolved");
  }
  if (usable.length < 2) {
    return {
      layer,
      status: "blocked_layer_phase_unresolved",
      failures: [...new Set(failures)],
      missing_body_state_count: missingBodyStateCount,
      sample_count: samples.length,
      usable_sample_count: usable.length,
      basis: null,
      diagnostics: null,
      ledger_candidate: null,
      phase_samples: [],
    };
  }
  const basis = basisForLayer(usable);
  if (!basis) {
    failures.push("layer-plane-degenerate");
    return {
      layer,
      status: "blocked_layer_plane_degenerate",
      failures: [...new Set(failures)],
      missing_body_state_count: missingBodyStateCount,
      sample_count: samples.length,
      usable_sample_count: usable.length,
      basis: null,
      diagnostics: null,
      ledger_candidate: null,
      phase_samples: [],
    };
  }
  const phaseRows = phaseSampleRows(usable, basis);
  const diagnostics = layerDiagnostics(usable, phaseRows, basis);
  return {
    layer,
    status: failures.length === 0 ? "layer_phase_candidate_computed" : "layer_phase_candidate_with_warnings",
    failures: [...new Set(failures)],
    missing_body_state_count: missingBodyStateCount,
    sample_count: samples.length,
    usable_sample_count: usable.length,
    basis: {
      normal: cleanVector(basis.normal),
      e1: cleanVector(basis.e1),
      e2: cleanVector(basis.e2),
      status: "sample_derived_provisional_basis",
      caveat:
        "The basis fixes a diagnostic phase chart only; pair-provenance quotient invariance is not established here.",
    },
    diagnostics,
    ledger_candidate: {
      phi_t0_candidate: diagnostics.phase_summary.phi_start,
      omega_integral_candidate: diagnostics.phase_summary.omega_integral_candidate,
      j_balance_candidate: diagnostics.mean_reduced_angular_momentum,
      root_phase_status:
        Array.isArray(row.active_causal_root_ledger) && row.active_causal_root_ledger.length > 0
          ? "blocked_root_phase_function_missing"
          : "blocked_root_ledger_missing",
      frame_phase_status: "blocked_branch_preserving_frame_audit_missing",
    },
    phase_samples: phaseRows,
  };
}

function hasSourceEvent(row) {
  const event = row.source_event;
  return (
    isObject(event) &&
    finiteNumber(event.t0) &&
    finiteNumber(event.t_sep) &&
    finiteVector3(event.X_A) &&
    finiteVector3(event.X_B)
  );
}

function hasWeight(row) {
  return finiteNumber(row.weight) && row.weight > 0;
}

function phaseLedgerComplete(phase) {
  return (
    isObject(phase) &&
    finiteNumber(phase.phi_t0) &&
    finiteNumber(phase.omega_integral) &&
    finiteNumber(phase.root) &&
    finiteNumber(phase.frame)
  );
}

function daughterLayerComplete(layer) {
  return (
    isObject(layer) &&
    LAYERS.includes(layer.layer) &&
    finiteVector3(layer.j_balance) &&
    phaseLedgerComplete(layer.phase)
  );
}

function daughterWakeComplete(wake) {
  return isObject(wake) && finiteVector3(wake.l_wake) && finiteNumber(wake.phase);
}

function daughterComplete(daughter) {
  return (
    isObject(daughter) &&
    Array.isArray(daughter.layers) &&
    daughter.layers.length > 0 &&
    daughter.layers.every(daughterLayerComplete) &&
    daughterWakeComplete(daughter.wake)
  );
}

function hasDaughters(row) {
  return isObject(row.daughters) && daughterComplete(row.daughters.A) && daughterComplete(row.daughters.B);
}

function hasWake(row) {
  return (
    hasDaughters(row) &&
    finiteNumber(row.cross_wake_phase) &&
    row.cross_wake_status === "substrate_derived"
  );
}

function hasGauge(row) {
  return (
    Array.isArray(row.gauge_probes) &&
    row.gauge_probes.length > 0 &&
    row.gauge_probes.every((probe) => isObject(probe) && finiteNumber(probe.common_phase_offset)) &&
    finiteNumber(row.theta_rec_A_fraction) &&
    finiteNumber(row.theta_rec_B_fraction)
  );
}

function pairPhaseFailures(row) {
  const failures = [];
  if (!hasSourceEvent(row)) {
    failures.push("pair-source-event-missing");
  }
  if (!hasWeight(row)) {
    failures.push("source-weight-missing");
  }
  if (!hasDaughters(row)) {
    failures.push("daughter-certificate-missing");
  }
  if (!hasWake(row)) {
    failures.push("wake-phase-ledger-missing");
  }
  if (!hasGauge(row)) {
    failures.push("gauge-probe-missing");
  }
  return failures;
}

function rowId(row, index) {
  if (typeof row.id === "string" && row.id.length > 0) {
    return row.id;
  }
  if (Number.isInteger(row.row)) {
    return `row_${row.row}`;
  }
  return `history_row_${index}`;
}

function activeRootCount(row) {
  return Array.isArray(row.active_causal_root_ledger)
    ? row.active_causal_root_ledger.filter((root) => root?.status === "active").length
    : 0;
}

function rowFailures(row, layerRows, pairFailures) {
  const failures = [];
  if (row.status !== ACCEPTED_HISTORY_STATUS) {
    failures.push("accepted-history-status-missing");
  }
  if (canonicalSamples(row).length < 2) {
    failures.push("sample-ledger-missing");
  }
  if (activeRootCount(row) === 0) {
    failures.push("root-ledger-missing");
  }
  for (const layer of layerRows) {
    failures.push(...layer.failures);
  }
  failures.push(...pairFailures);
  return [...new Set(failures)];
}

function evaluateRow(inputRow, index) {
  const row = isObject(inputRow) ? inputRow : {};
  const layers = LAYERS.map((layer) => layerResult(row, layer));
  const pairFailures = pairPhaseFailures(row);
  const failures = rowFailures(row, layers, pairFailures);
  const accepted = row.status === ACCEPTED_HISTORY_STATUS;
  const layerReady = layers.every((layer) => layer.status === "layer_phase_candidate_computed");
  const pairReady = pairFailures.length === 0;
  return {
    id: rowId(row, index),
    source_row: Number.isInteger(row.row) ? row.row : null,
    status: pairReady
      ? "pair_phase_input_explicitly_ready"
      : accepted && layerReady
        ? "layer_phase_candidates_ready_pair_blocked"
        : accepted
          ? "blocked_layer_phase_incomplete"
          : "blocked_unaccepted_history",
    source_status: row.status ?? null,
    failures,
    history_summary: {
      period: finiteNumber(row.period) ? cleanNumber(row.period) : null,
      sample_count: canonicalSamples(row).length,
      active_root_count: activeRootCount(row),
      history_window: row.history_window ?? null,
      missing_validation_fields: row.validation?.missing_validation_fields ?? null,
    },
    layer_phase_candidates: Object.fromEntries(layers.map((layer) => [layer.layer, layer])),
    pair_phase_readiness: {
      status: pairReady ? "explicit_pair_phase_fields_ready" : "blocked_missing_explicit_pair_phase_fields",
      failures: pairFailures,
      can_emit_pair_phase_input: pairReady,
    },
    caveat:
      "Layer phase candidates are single-history diagnostics. They do not establish pair-source provenance, substrate-derived wake phase, quotient invariance, or Bell-family closure.",
  };
}

function failureCounts(rows) {
  const counts = Object.fromEntries(FAILURE_CODES.map((code) => [code, 0]));
  for (const row of rows) {
    for (const failure of row.failures) {
      counts[failure] = (counts[failure] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).filter(([, count]) => count > 0));
}

function normalizedPairPhaseInput(sourceRows, evaluatedRows) {
  const readyRows = sourceRows.filter((row, index) => evaluatedRows[index]?.pair_phase_readiness.can_emit_pair_phase_input);
  const totalWeight = readyRows.reduce((sum, row) => sum + row.weight, 0);
  if (readyRows.length === 0 || totalWeight <= 0) {
    return null;
  }
  return {
    artifact: "declared-pair-phase-certificate-rows",
    status: "explicit_pair_phase_rows_from_accepted_history_layer_phase_extractor",
    weight_policy: "source weights normalized for emitter input",
    records: readyRows.map((row) => ({ ...row, weight: row.weight / totalWeight })),
  };
}

function evaluate(source, inputPath) {
  const rows = rowList(source);
  const evaluatedRows = rows.map((row, index) => evaluateRow(row, index));
  const pairPhaseInput = normalizedPairPhaseInput(rows, evaluatedRows);
  const layerCandidateRows = evaluatedRows.filter((row) =>
    Object.values(row.layer_phase_candidates).some((layer) => layer.phase_samples.length > 0)
  );
  const acceptedHistoryRows = evaluatedRows.filter((row) => row.source_status === ACCEPTED_HISTORY_STATUS);
  const output = {
    artifact: "accepted-history-layer-phase-extractor",
    schema: "aaa-accepted-history-layer-phase-extractor/v1",
    generated_by: "scripts/quantum/accepted-history-layer-phase-extractor.mjs",
    input_source: inputPath ? path.relative(process.cwd(), path.resolve(inputPath)) : null,
    status: pairPhaseInput ? "pair_phase_rows_ready" : "blocked_no_pair_phase_rows",
    classification: "single_history_layer_phase_diagnostic",
    contract: contract(),
    rows: evaluatedRows,
    summary: {
      row_count: evaluatedRows.length,
      accepted_history_row_count: acceptedHistoryRows.length,
      layer_candidate_row_count: layerCandidateRows.length,
      pair_phase_ready_row_count: pairPhaseInput?.records.length ?? 0,
      can_run_pair_phase_emitter: Boolean(pairPhaseInput),
      failure_codes: failureCounts(evaluatedRows),
    },
    note:
      "This artifact computes layer phase diagnostics from accepted-history samples when possible. Pair-phase input remains blocked unless pair-source provenance and quotient-audit fields are explicit.",
  };
  if (pairPhaseInput) {
    output.phase_input = pairPhaseInput;
  }
  return output;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const output = args.printContract
    ? contract()
    : evaluate(readJson(path.resolve(args.input)), path.resolve(args.input));
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

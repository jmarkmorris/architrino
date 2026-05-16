#!/usr/bin/env node

import fs from "node:fs";

const EPS = 1e-12;
const TWO_PI = 2 * Math.PI;
const SQRT_HALF = Math.SQRT1_2;
const P_SAME_LOW = (1 - SQRT_HALF) / 2;
const P_SAME_HIGH = (1 + SQRT_HALF) / 2;
const LAYERS = ["I", "M", "O"];
const LAYER_WEIGHTS = { I: 0.5, M: 0.3, O: 0.2 };

function parseArgs(argv) {
  const args = {
    input: null,
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

  if (args.input === undefined) {
    throw new Error("--input requires a path.");
  }
  if (args.out === undefined) {
    throw new Error("--out requires a path.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/quantum/pair-phase-certificate-emitter.mjs [options]

Options:
  --input PATH  Read declared phase-certificate rows from PATH.
  --out PATH    Write generated diagnostic JSON to PATH instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

With no --input, this emits built-in diagnostic rows. The output computes
Z_A, Z_B, phi_Pi, eta_AB, and residuals from declared rows. It is a JSON-shape
diagnostic, not an AAA Bell closure proof and not a substrate certificate.`);
}

function thresholdBins() {
  return [
    {
      id: "low",
      eta_min: 0,
      eta_max: P_SAME_LOW,
      weight: P_SAME_LOW,
    },
    {
      id: "middle",
      eta_min: P_SAME_LOW,
      eta_max: P_SAME_HIGH,
      weight: SQRT_HALF,
    },
    {
      id: "high",
      eta_min: P_SAME_HIGH,
      eta_max: 1,
      weight: P_SAME_LOW,
    },
  ];
}

function layerRows({ party, targetAngle }) {
  const sign = party === "A" ? 1 : -1;
  const phase = party === "A" ? 0 : -targetAngle;
  return LAYERS.map((layer) => ({
    layer,
    j_balance: [sign * LAYER_WEIGHTS[layer], 0, 0],
    phase: {
      phi_t0: phase,
      omega_integral: 0,
      root: 0,
      frame: 0,
    },
  }));
}

function diagnosticInput() {
  return {
    artifact: "declared-pair-phase-certificate-rows",
    status: "diagnostic_shape_only",
    note:
      "Built-in rows are declared to exercise the phase-certificate computation shape. They are not accepted branch certificates.",
    records: thresholdBins().flatMap((bin) =>
      [-1, 1].map((marginalSign) => {
        const targetFraction = (bin.eta_min + bin.eta_max) / 2;
        const targetAngle = TWO_PI * targetFraction;
        return {
          id: `phase_${bin.id}_${marginalSign === -1 ? "minus" : "plus"}`,
          weight: bin.weight / 2,
          branch_bin: bin.id,
          marginal_branch: marginalSign,
          eta_AB_interval: [bin.eta_min, bin.eta_max],
          target_phi_fraction: targetFraction,
          certificate_status: "diagnostic_declared_row",
          source_event: {
            t0: 0,
            t_sep: 1,
            X_A: [1, 0, 0],
            X_B: [-1, 0, 0],
          },
          daughters: {
            A: {
              layers: layerRows({ party: "A", targetAngle }),
              wake: {
                l_wake: [0, 0, 0],
                phase: 0,
                status: "diagnostic_zero_wake",
              },
            },
            B: {
              layers: layerRows({ party: "B", targetAngle }),
              wake: {
                l_wake: [0, 0, 0],
                phase: 0,
                status: "diagnostic_zero_wake",
              },
            },
          },
          cross_wake_phase: 0,
          cross_wake_status: "diagnostic_declared",
          theta_rec_A_fraction: 0,
          theta_rec_B_fraction: 0,
          gauge_probes: [
            { id: "identity", common_phase_offset: 0 },
            { id: "common_phase_plus", common_phase_offset: Math.PI / 9 },
            { id: "common_phase_minus", common_phase_offset: -Math.PI / 7 },
          ],
        };
      })
    ),
  };
}

function readInput(filePath) {
  if (!filePath) {
    return diagnosticInput();
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }
}

function assertVector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new Error(`${label} must be a three-vector.`);
  }
  value.forEach((entry, index) => assertNumber(entry, `${label}[${index}]`));
}

function cleanNumber(value) {
  return Math.abs(value) < 1e-15 ? 0 : value;
}

function cleanVector(vector) {
  return vector.map(cleanNumber);
}

function addVector(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subVector(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function scaleVector(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function complex(re, im) {
  return { re, im };
}

function complexAdd(left, right) {
  return complex(left.re + right.re, left.im + right.im);
}

function complexScale(value, scalar) {
  return complex(value.re * scalar, value.im * scalar);
}

function complexMul(left, right) {
  return complex(left.re * right.re - left.im * right.im, left.re * right.im + left.im * right.re);
}

function complexConj(value) {
  return complex(value.re, -value.im);
}

function expi(angle) {
  return complex(Math.cos(angle), Math.sin(angle));
}

function complexAbs(value) {
  return Math.hypot(value.re, value.im);
}

function normalizeAngle(angle) {
  return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
}

function frac(value) {
  return ((value % 1) + 1) % 1;
}

function angleDistance(left, right) {
  return Math.abs(Math.atan2(Math.sin(left - right), Math.cos(left - right)));
}

function complexSummary(value) {
  const magnitude = complexAbs(value);
  return {
    re: cleanNumber(value.re),
    im: cleanNumber(value.im),
    abs: cleanNumber(magnitude),
    arg: magnitude <= EPS ? null : cleanNumber(normalizeAngle(Math.atan2(value.im, value.re))),
    arg_fraction:
      magnitude <= EPS ? null : cleanNumber(normalizeAngle(Math.atan2(value.im, value.re)) / TWO_PI),
  };
}

function phaseLedgerAngle(phase, label) {
  if (!isObject(phase)) {
    throw new Error(`${label}.phase must be an object.`);
  }
  for (const key of ["phi_t0", "omega_integral", "root", "frame"]) {
    assertNumber(phase[key], `${label}.phase.${key}`);
  }
  return phase.phi_t0 + phase.omega_integral + phase.root + phase.frame;
}

function sourceAxis(row) {
  const event = row.source_event;
  if (!isObject(event)) {
    throw new Error(`${row.id}.source_event must be an object.`);
  }
  assertVector3(event.X_A, `${row.id}.source_event.X_A`);
  assertVector3(event.X_B, `${row.id}.source_event.X_B`);
  const delta = subVector(event.X_A, event.X_B);
  const axisNorm = norm(delta);
  return {
    axis: axisNorm <= EPS ? [0, 0, 0] : scaleVector(delta, 1 / axisNorm),
    margin: axisNorm,
  };
}

function layerLedgers(row, party, axis, commonPhaseOffset = 0) {
  const daughter = row.daughters?.[party];
  if (!isObject(daughter)) {
    throw new Error(`${row.id}.daughters.${party} must be an object.`);
  }
  if (!Array.isArray(daughter.layers) || daughter.layers.length === 0) {
    throw new Error(`${row.id}.daughters.${party}.layers must be a nonempty array.`);
  }
  return daughter.layers.map((layer, index) => {
    const label = `${row.id}.daughters.${party}.layers[${index}]`;
    if (!LAYERS.includes(layer.layer)) {
      throw new Error(`${label}.layer must be one of I, M, O.`);
    }
    assertVector3(layer.j_balance, `${label}.j_balance`);
    const theta = phaseLedgerAngle(layer.phase, label) + commonPhaseOffset;
    const projection = dot(axis, layer.j_balance);
    return {
      layer: layer.layer,
      j_balance: cleanVector(layer.j_balance),
      projection: cleanNumber(projection),
      theta: cleanNumber(theta),
    };
  });
}

function wakeLedger(row, party, axis, commonPhaseOffset = 0) {
  const wake = row.daughters?.[party]?.wake ?? {};
  const lWake = wake.l_wake ?? [0, 0, 0];
  const phase = wake.phase ?? 0;
  assertVector3(lWake, `${row.id}.daughters.${party}.wake.l_wake`);
  assertNumber(phase, `${row.id}.daughters.${party}.wake.phase`);
  return {
    l_wake: cleanVector(lWake),
    projection: cleanNumber(dot(axis, lWake)),
    theta: cleanNumber(phase + commonPhaseOffset),
    status: wake.status ?? "unspecified",
  };
}

function zForParty(row, party, axis, commonPhaseOffset = 0) {
  const layerRowsForParty = layerLedgers(row, party, axis, commonPhaseOffset);
  const wake = wakeLedger(row, party, axis, commonPhaseOffset);
  let z = complex(0, 0);
  for (const layer of layerRowsForParty) {
    z = complexAdd(z, complexScale(expi(layer.theta), layer.projection));
  }
  z = complexAdd(z, complexScale(expi(wake.theta), wake.projection));
  return {
    z,
    layers: layerRowsForParty,
    wake,
  };
}

function computePhase(row, axis, commonPhaseOffset = 0) {
  assertNumber(row.cross_wake_phase ?? 0, `${row.id}.cross_wake_phase`);
  const left = zForParty(row, "A", axis, commonPhaseOffset);
  const right = zForParty(row, "B", axis, commonPhaseOffset);
  const product = complexMul(
    complexScale(complexMul(left.z, complexConj(right.z)), -1),
    expi(row.cross_wake_phase ?? 0)
  );
  const productMagnitude = complexAbs(product);
  const phi = productMagnitude <= EPS ? null : normalizeAngle(Math.atan2(product.im, product.re));
  return {
    left,
    right,
    product,
    phi,
  };
}

function sumLayerBalance(row) {
  let total = [0, 0, 0];
  for (const party of ["A", "B"]) {
    const daughter = row.daughters?.[party];
    if (!isObject(daughter) || !Array.isArray(daughter.layers)) {
      continue;
    }
    for (const layer of daughter.layers) {
      assertVector3(layer.j_balance, `${row.id}.daughters.${party}.layers.${layer.layer}.j_balance`);
      total = addVector(total, layer.j_balance);
    }
  }
  return total;
}

function sumWakeBalance(row) {
  let total = [0, 0, 0];
  for (const party of ["A", "B"]) {
    const lWake = row.daughters?.[party]?.wake?.l_wake ?? [0, 0, 0];
    assertVector3(lWake, `${row.id}.daughters.${party}.wake.l_wake`);
    total = addVector(total, lWake);
  }
  return total;
}

function gaugeAudit(row, axis, basePhi) {
  const probes = Array.isArray(row.gauge_probes) ? row.gauge_probes : [];
  const rows = probes.map((probe, index) => {
    if (!isObject(probe)) {
      throw new Error(`${row.id}.gauge_probes[${index}] must be an object.`);
    }
    const offset = probe.common_phase_offset ?? 0;
    assertNumber(offset, `${row.id}.gauge_probes[${index}].common_phase_offset`);
    const computed = computePhase(row, axis, offset);
    const distance = basePhi === null || computed.phi === null ? null : angleDistance(computed.phi, basePhi);
    return {
      id: probe.id ?? `probe_${index}`,
      common_phase_offset: cleanNumber(offset),
      phi_Pi: computed.phi === null ? null : cleanNumber(computed.phi),
      phi_Pi_fraction: computed.phi === null ? null : cleanNumber(computed.phi / TWO_PI),
      distance: distance === null ? null : cleanNumber(distance),
    };
  });
  const finiteDistances = rows.map((entry) => entry.distance).filter((value) => value !== null);
  return {
    probes: rows,
    Delta_varphi_gauge: finiteDistances.length === 0 ? null : cleanNumber(Math.max(...finiteDistances)),
  };
}

function normalizeRecords(input) {
  const records = Array.isArray(input.records) ? input.records : [];
  if (records.length === 0) {
    throw new Error("input.records must be a nonempty array.");
  }
  let total = 0;
  for (const [index, row] of records.entries()) {
    if (!isObject(row)) {
      throw new Error(`records[${index}] must be an object.`);
    }
    if (typeof row.id !== "string" || row.id.length === 0) {
      throw new Error(`records[${index}].id must be a nonempty string.`);
    }
    assertNumber(row.weight, `${row.id}.weight`);
    if (row.weight < -EPS) {
      throw new Error(`${row.id}.weight must be nonnegative.`);
    }
    total += row.weight;
  }
  if (Math.abs(total - 1) > 1e-8) {
    throw new Error(`record weights sum to ${total}, not 1.`);
  }
  return records;
}

function computeRecord(row) {
  const axisInfo = sourceAxis(row);
  const base = computePhase(row, axisInfo.axis);
  const phiFraction = base.phi === null ? null : base.phi / TWO_PI;
  const thetaA = row.theta_rec_A_fraction ?? 0;
  const thetaB = row.theta_rec_B_fraction ?? 0;
  assertNumber(thetaA, `${row.id}.theta_rec_A_fraction`);
  assertNumber(thetaB, `${row.id}.theta_rec_B_fraction`);
  const etaFraction = phiFraction === null ? null : frac(thetaA - thetaB + phiFraction);
  const gauge = gaugeAudit(row, axisInfo.axis, base.phi);
  const angularBalance = sumLayerBalance(row);
  const wakeBalance = sumWakeBalance(row);
  const zAMag = complexAbs(base.left.z);
  const zBMag = complexAbs(base.right.z);
  const zeroMargin = Math.min(zAMag, zBMag);
  const wakeCertificateMissing = row.cross_wake_status === "substrate_derived" ? 0 : 1;
  const failureResiduals = {
    nonzero_axis: axisInfo.margin <= EPS ? 1 : 0,
    angular_momentum_balance: cleanNumber(norm(angularBalance)),
    wake_balance: cleanNumber(norm(wakeBalance)),
    wake_certificate_missing: wakeCertificateMissing,
    zero_phasor: zeroMargin <= EPS ? 1 : 0,
    zero_phasor_margin: cleanNumber(zeroMargin),
    gauge_phase: gauge.Delta_varphi_gauge,
  };

  return {
    id: row.id,
    weight: row.weight,
    branch_bin: row.branch_bin ?? null,
    marginal_branch: row.marginal_branch ?? null,
    certificate_status: row.certificate_status ?? "unspecified",
    source_event: {
      t0: row.source_event?.t0 ?? null,
      t_sep: row.source_event?.t_sep ?? null,
      X_A: cleanVector(row.source_event.X_A),
      X_B: cleanVector(row.source_event.X_B),
      separation_axis: cleanVector(axisInfo.axis),
      nonzero_axis_margin: cleanNumber(axisInfo.margin),
    },
    layer_phase_ledgers: {
      A: base.left.layers,
      B: base.right.layers,
    },
    wake_phase_ledger: {
      A: base.left.wake,
      B: base.right.wake,
      Phi_AB_wake: cleanNumber(row.cross_wake_phase ?? 0),
      status: row.cross_wake_status ?? "unspecified",
    },
    phasor_output: {
      Z_A: complexSummary(base.left.z),
      Z_B: complexSummary(base.right.z),
      product: complexSummary(base.product),
      phi_Pi: base.phi === null ? null : cleanNumber(base.phi),
      phi_Pi_fraction: phiFraction === null ? null : cleanNumber(phiFraction),
      theta_rec_A_fraction: cleanNumber(thetaA),
      theta_rec_B_fraction: cleanNumber(thetaB),
      eta_AB_fraction: etaFraction === null ? null : cleanNumber(etaFraction),
      eta_AB_interval: row.eta_AB_interval ?? null,
    },
    quotient_audit: gauge,
    failure_residuals: failureResiduals,
    caveat:
      "Diagnostic row only unless all phase, wake, root-ledger, and angular-momentum fields are supplied by an accepted branch certificate.",
  };
}

function summarize(records) {
  const gaugeValues = records
    .map((record) => record.failure_residuals.gauge_phase)
    .filter((value) => value !== null);
  return {
    record_count: records.length,
    total_weight: cleanNumber(records.reduce((sum, record) => sum + record.weight, 0)),
    max_gauge_phase_residual:
      gaugeValues.length === 0 ? null : cleanNumber(Math.max(...gaugeValues)),
    max_wake_certificate_missing: Math.max(
      ...records.map((record) => record.failure_residuals.wake_certificate_missing)
    ),
    min_zero_phasor_margin: cleanNumber(
      Math.min(...records.map((record) => record.failure_residuals.zero_phasor_margin))
    ),
    max_angular_momentum_balance_residual: cleanNumber(
      Math.max(...records.map((record) => record.failure_residuals.angular_momentum_balance))
    ),
  };
}

function emit(input, sourceLabel) {
  const rows = normalizeRecords(input).map(computeRecord);
  return {
    artifact: "pair-phase-certificate-diagnostic",
    schema: "aaa-pair-phase-certificate-diagnostic/v1",
    generated_by: "scripts/quantum/pair-phase-certificate-emitter.mjs",
    input_source: sourceLabel,
    status: "diagnostic_shape_only",
    classification: "diagnostic_candidate",
    purpose:
      "Compute the phase-certificate JSON shape for varphi_Pi before any Bell-family positive candidate is claimed.",
    benchmark_policy: {
      bell_table_inferred: false,
      substrate_derivation_claimed: false,
      setting_dependent_source_weights_allowed: false,
      role: "phase-certificate shape and residual computation only",
    },
    required_next_inputs: [
      "accepted branch certificate for the pair source event",
      "retained causal-root ledgers through source separation",
      "substrate-derived wake phase ledger",
      "apparatus record-cycle measures before Bell-family promotion",
    ],
    records: rows,
    summary: summarize(rows),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const input = readInput(args.input);
  const output = emit(input, args.input ?? "built_in_diagnostic_rows");
  const json = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

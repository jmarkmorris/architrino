#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "photon-packet-transfer-attempt.v1.json");
const INPUT_SCHEMA = "aaa-equation-map-photon-packet-transfer-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-photon-packet-transfer-check/v1";
const ACCEPTED_STATUSES = new Set(["accepted", "passed", "populated"]);
const SCORE_DECISION = "no_score_increase";

const REQUIRED_ROWS = [
  "theta_gamma_packet",
  "photon_branch_packet",
  "gate_a_kinematics_row",
  "gate_b_transverse_row",
  "gate_c_event_routing_row",
  "emission_source_row",
  "path_history_transfer_row",
  "receiver_coupling_row",
  "energy_frequency_row",
  "null_eikonal_row",
  "helicity_ledger_row",
  "event_balance_row",
  "source_depletion_row",
  "recoil_wake_remnant_row",
  "noether_sea_path_row",
  "source_provenance",
  "no_hidden_retune_witness",
];

const DEFAULT_TOLERANCES = {
  carrier: 1e-12,
  energyFrequency: 1e-12,
  nullEikonal: 1e-12,
  helicity: 1e-12,
  eventBalance: 1e-12,
  pathFrequency: 1e-12,
  sourceProvenance: 1e-12,
  retune: 1e-12,
  negativeControl: 1e-12,
};

const DEFAULT_WEIGHTS = {
  energyFrequency: 1,
  nullEikonal: 1,
  helicity: 1,
  eventBalance: 1,
  pathFrequency: 1,
};

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const inputPath = path.resolve(args.input);
const input = readJson(inputPath);
const output = evaluatePhotonPacketTransfer(input, inputPath);
writeOutput(output, args);

if (args.requirePopulated && output.summary.status !== "populated") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: DEFAULT_INPUT_PATH,
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
  console.log(`Usage: node scripts/equation-mapping/photon-packet-transfer-residual.mjs [options]

Options:
  --input PATH          EQ-12 photon packet-transfer input JSON.
  --out PATH            Write JSON output to PATH.
  --summary             Emit compact summary JSON.
  --pretty              Pretty-print JSON output.
  --require-populated   Exit nonzero unless the residual is populated.
  --help                Show this help.

This checker evaluates the score-neutral EQ-12 photon energy, null/eikonal,
helicity, event-balance, and path-frequency packet residual. Attempt rows,
per-observable packet splits, longitudinal leakage, missing source depletion,
and hidden retunes never raise equation scores.`);
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

function evaluatePhotonPacketTransfer(input, inputPath) {
  const tolerances = parseTolerances(input.tolerances ?? {});
  const weights = parseWeights(input.weights ?? {});
  const packet = input.packet ?? input;
  const rows = packet.rows ?? {};
  const rowChecks = Object.fromEntries(
    REQUIRED_ROWS.map((rowId) => [rowId, evaluateAcceptedRow(rows[rowId])]),
  );
  const missingRows = REQUIRED_ROWS.filter((rowId) => !rowChecks[rowId].accepted);
  const carrierBinding = evaluateCarrierBinding(rows, packet.commonCarrierId ?? input.commonCarrierId);
  const packetResidual = evaluatePacketResidual(packet.photonPacket ?? {}, tolerances, weights);
  const negativeControls = evaluateNegativeControls(
    packet.photonPacket ?? {},
    packet.negativeControls ?? [],
    tolerances,
  );
  const status = decideStatus({
    missingRows,
    carrierBinding,
    packetResidual,
    negativeControls,
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
      row: "EQ-12",
      supportedRows: ["EQ-12", "EQ-13", "EQ-17", "EQ-28", "EQ-29"],
      claimLevel:
        "score-neutral photon packet-transfer residual; accepted retained rows are required before score movement",
    },
    tolerances,
    weights,
    summary: {
      status,
      scoreDecision: SCORE_DECISION,
      missingRows,
      nextBlocker: firstBlocker({
        status,
        missingRows,
        carrierBinding,
        packetResidual,
        negativeControls,
      }),
      commonCarrierPass: carrierBinding.passed,
      packetNumericPass: packetResidual.passed,
      energyFrequencyPass: packetResidual.energyFrequency.passed,
      nullEikonalPass: packetResidual.nullEikonal.passed,
      helicityPass: packetResidual.helicity.passed,
      eventBalancePass: packetResidual.eventBalance.passed,
      pathFrequencyPass: packetResidual.pathFrequency.passed,
      sourceProvenancePass: packetResidual.sourceProvenance.passed,
      hiddenRetunePass: packetResidual.noHiddenRetune.passed,
      aggregateResidual: packetResidual.aggregateResidual,
      negativeControlPassCount: negativeControls.filter((control) => control.passed).length,
      negativeControlCount: negativeControls.length,
      failedNegativeControls: negativeControls.filter((control) => !control.passed).map((control) => control.id),
    },
    rows: Object.fromEntries(
      REQUIRED_ROWS.map((rowId) => [
        rowId,
        {
          status: normalizeStatus(rows[rowId]),
          accepted: rowChecks[rowId].accepted,
          reason: rowChecks[rowId].reason,
          rowId: rows[rowId]?.rowId ?? rows[rowId]?.id ?? null,
          carrierId: rows[rowId]?.carrierId ?? null,
          sourcePath: rows[rowId]?.sourcePath ?? rows[rowId]?.source ?? null,
        },
      ]),
    ),
    carrierBinding,
    packetResidual,
    negativeControls,
  };
}

function summarizeOutput(output) {
  return {
    schema: output.schema,
    generatedAt: output.generatedAt,
    input: output.input,
    residual: output.residual,
    summary: output.summary,
    rowStatuses: Object.fromEntries(
      Object.entries(output.rows).map(([rowId, row]) => [rowId, { status: row.status, reason: row.reason }]),
    ),
  };
}

function parseTolerances(tolerances) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TOLERANCES).map(([key, fallback]) => [
      key,
      finiteNumber(tolerances[key] ?? fallback, `tolerances.${key}`),
    ]),
  );
}

function parseWeights(weights) {
  return Object.fromEntries(
    Object.entries(DEFAULT_WEIGHTS).map(([key, fallback]) => [
      key,
      finiteNumber(weights[key] ?? fallback, `weights.${key}`),
    ]),
  );
}

function evaluatePacketResidual(packet, tolerances, weights) {
  const energyFrequency = evaluateEnergyFrequency(packet.energyFrequency ?? {}, tolerances.energyFrequency);
  const nullEikonal = evaluateScalarResidual(
    packet.nullEikonal?.residual ?? packet.nullEikonal?.maxResidual,
    tolerances.nullEikonal,
  );
  const helicity = evaluateScalarResidual(
    packet.helicity?.residual ?? packet.helicity?.maxResidual,
    tolerances.helicity,
  );
  const eventBalance = evaluateVectorNorm(
    packet.eventBalance?.components ?? packet.eventBalance?.delta ?? packet.eventBalance,
    tolerances.eventBalance,
  );
  const pathFrequency = evaluatePathFrequency(packet.pathFrequency ?? {}, tolerances.pathFrequency);
  const sourceProvenance = evaluateScalarResidual(
    packet.sourceProvenance?.residual ?? packet.sourceProvenance?.maxResidual,
    tolerances.sourceProvenance,
  );
  const noHiddenRetune = evaluateScalarResidual(
    packet.noHiddenRetune?.maxResidual ?? packet.noHiddenRetune?.residual,
    tolerances.retune,
  );
  const aggregateResidual =
    weights.energyFrequency * energyFrequency.residual +
    weights.nullEikonal * nullEikonal.residual +
    weights.helicity * helicity.residual +
    weights.eventBalance * eventBalance.norm +
    weights.pathFrequency * pathFrequency.residual;
  const passed =
    energyFrequency.passed &&
    nullEikonal.passed &&
    helicity.passed &&
    eventBalance.passed &&
    pathFrequency.passed &&
    sourceProvenance.passed &&
    noHiddenRetune.passed;

  return {
    passed,
    aggregateResidual,
    energyFrequency,
    nullEikonal,
    helicity,
    eventBalance,
    pathFrequency,
    sourceProvenance,
    noHiddenRetune,
  };
}

function evaluateEnergyFrequency(row, tolerance) {
  const energy = finiteNumber(row.energy, "photonPacket.energyFrequency.energy");
  const h = finiteNumber(row.planckConstant, "photonPacket.energyFrequency.planckConstant");
  const frequency = finiteNumber(row.frequency, "photonPacket.energyFrequency.frequency");
  const epsilon = finiteNumber(row.epsilonEnergy ?? 0, "photonPacket.energyFrequency.epsilonEnergy");
  const expectedEnergy = h * frequency;
  const denominator = Math.abs(energy) + epsilon;
  const residual = denominator === 0 ? Math.abs(expectedEnergy) : Math.abs((energy - expectedEnergy) / denominator);
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
    energy,
    expectedEnergy,
    frequency,
  };
}

function evaluatePathFrequency(row, tolerance) {
  const emittedFrequency = finiteNumber(row.emittedFrequency, "photonPacket.pathFrequency.emittedFrequency");
  const receivedFrequency = finiteNumber(row.receivedFrequency, "photonPacket.pathFrequency.receivedFrequency");
  const transfer = finiteNumber(row.transferFactor, "photonPacket.pathFrequency.transferFactor");
  const residual = finiteNumber(
    row.residual ?? receivedFrequency - emittedFrequency * transfer,
    "photonPacket.pathFrequency.residual",
  );
  const scale = Math.abs(receivedFrequency) + Math.abs(emittedFrequency * transfer) + 1;
  const normalizedResidual = Math.abs(residual) / scale;
  return {
    passed: normalizedResidual <= tolerance,
    residual: normalizedResidual,
    rawResidual: residual,
    tolerance,
    emittedFrequency,
    receivedFrequency,
    transferFactor: transfer,
  };
}

function evaluateScalarResidual(value, tolerance) {
  const residual = Math.abs(finiteNumber(value ?? Number.POSITIVE_INFINITY, "scalarResidual"));
  return {
    passed: residual <= tolerance,
    residual,
    tolerance,
  };
}

function evaluateVectorNorm(value, tolerance) {
  const components = Array.isArray(value) ? value : Object.values(value ?? {});
  const numbers = components.map((component, index) => finiteNumber(component, `eventBalance.${index}`));
  const norm = Math.sqrt(numbers.reduce((sum, component) => sum + component * component, 0));
  return {
    passed: norm <= tolerance,
    norm,
    tolerance,
    components: numbers,
  };
}

function evaluateNegativeControls(packet, controls, tolerances) {
  return controls.map((control) => {
    const result = evaluateNegativeControl(packet, control, tolerances);
    return {
      id: control.id ?? "unnamed_negative_control",
      expectedFailure: true,
      passed: result.failedAsExpected,
      reason: result.reason,
      residual: result.residual,
      tolerance: result.tolerance,
    };
  });
}

function evaluateNegativeControl(packet, control, tolerances) {
  if (control.kind === "energy_frequency_detuned") {
    const row = {
      ...(packet.energyFrequency ?? {}),
      ...(control.energyFrequency ?? {}),
    };
    const result = evaluateEnergyFrequency(row, tolerances.energyFrequency);
    return {
      failedAsExpected: !result.passed,
      reason: result.passed ? "detuned_energy_frequency_passed" : "detuned_energy_frequency_failed",
      residual: result.residual,
      tolerance: result.tolerance,
    };
  }
  if (control.kind === "longitudinal_leakage") {
    const residual = Math.abs(finiteNumber(control.longitudinalLeakage, "negativeControl.longitudinalLeakage"));
    return {
      failedAsExpected: residual > tolerances.helicity,
      reason: residual > tolerances.helicity ? "longitudinal_leakage_detected" : "longitudinal_leakage_not_detected",
      residual,
      tolerance: tolerances.helicity,
    };
  }
  if (control.kind === "split_packet_carrier") {
    const carrierCount = new Set(control.carrierIds ?? []).size;
    return {
      failedAsExpected: carrierCount > 1,
      reason: carrierCount > 1 ? "split_packet_carrier_detected" : "split_packet_carrier_not_detected",
      residual: carrierCount,
      tolerance: 1,
    };
  }
  if (control.kind === "hidden_retune") {
    const residual = Math.abs(finiteNumber(control.retuneResidual, "negativeControl.retuneResidual"));
    return {
      failedAsExpected: residual > tolerances.retune,
      reason: residual > tolerances.retune ? "hidden_retune_detected" : "hidden_retune_not_detected",
      residual,
      tolerance: tolerances.retune,
    };
  }
  return {
    failedAsExpected: false,
    reason: `unknown_negative_control_${control.kind ?? "missing_kind"}`,
    residual: Number.NaN,
    tolerance: tolerances.negativeControl,
  };
}

function evaluateCarrierBinding(rows, commonCarrierId) {
  const rowCarrierIds = Object.fromEntries(
    Object.entries(rows).map(([rowId, row]) => [rowId, row?.carrierId ?? null]),
  );
  const mismatches = Object.entries(rowCarrierIds)
    .filter(([, carrierId]) => carrierId !== null && commonCarrierId !== null && carrierId !== commonCarrierId)
    .map(([rowId, carrierId]) => ({ rowId, carrierId, expectedCarrierId: commonCarrierId }));
  return {
    passed: Boolean(commonCarrierId) && mismatches.length === 0,
    commonCarrierId: commonCarrierId ?? null,
    mismatches,
    rowCarrierIds,
  };
}

function evaluateAcceptedRow(row) {
  if (!row) {
    return { accepted: false, reason: "missing_row" };
  }
  if (!ACCEPTED_STATUSES.has(normalizeStatus(row))) {
    return { accepted: false, reason: "row_not_accepted" };
  }
  if (!hasConcreteIdentity(row)) {
    return { accepted: false, reason: "row_identity_not_concrete" };
  }
  const sourceCheck = evaluateSourceReference(row);
  if (!sourceCheck.accepted) {
    return { accepted: false, reason: sourceCheck.reason };
  }
  return { accepted: true, reason: "accepted" };
}

function normalizeStatus(row) {
  return String(row?.status ?? row ?? "missing").toLowerCase();
}

function hasConcreteIdentity(row) {
  const id = row?.rowId ?? row?.id;
  return typeof id === "string" && id.trim().length > 0 && !id.includes("attempt");
}

function evaluateSourceReference(row) {
  const source = row?.sourcePath ?? row?.source;
  if (typeof source !== "string" || source.trim().length === 0) {
    return { accepted: false, reason: "source_missing" };
  }
  if (/^https?:\/\//.test(source)) {
    return { accepted: true, reason: "source_url" };
  }
  const resolved = path.resolve(REPO_ROOT, source.replace(/#.*/, ""));
  const evidenceReason = sourceEvidenceReason(resolved);
  if (evidenceReason !== "accepted") {
    return { accepted: false, reason: evidenceReason };
  }
  if (!fs.existsSync(resolved)) {
    return { accepted: false, reason: "source_not_found" };
  }
  if (fs.statSync(resolved).isDirectory()) {
    return { accepted: false, reason: "source_is_directory" };
  }
  return { accepted: true, reason: "source_file" };
}

function sourceEvidenceReason(resolvedPath) {
  const normalized = path.normalize(resolvedPath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return "source_outside_repo";
  }
  if (
    normalized.startsWith(`${path.normalize("/tmp")}${path.sep}`) ||
    normalized.startsWith(`${path.normalize("/private/tmp")}${path.sep}`) ||
    relative.startsWith(`content${path.sep}generated${path.sep}`)
  ) {
    return "source_not_durable";
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return "coordination_source_path";
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return "authored_prose_source_path";
  }
  const basename = path.basename(normalized).toLowerCase();
  if (
    basename.includes("attempt") ||
    basename.includes("mock") ||
    basename.includes("toy") ||
    basename.includes("probe") ||
    basename.includes("negative-control") ||
    basename.includes(".tmp")
  ) {
    return "control_or_attempt_source_path";
  }
  return "accepted";
}

function decideStatus({ missingRows, carrierBinding, packetResidual, negativeControls }) {
  if (missingRows.length > 0) {
    return "blocked_missing_rows";
  }
  if (!carrierBinding.passed) {
    return "blocked_carrier_split";
  }
  if (!packetResidual.passed) {
    return "failed_residual";
  }
  if (negativeControls.some((control) => !control.passed)) {
    return "failed_negative_control";
  }
  return "populated";
}

function firstBlocker({ status, missingRows, carrierBinding, packetResidual, negativeControls }) {
  if (missingRows.length > 0) {
    return `missing_accepted_${missingRows[0]}`;
  }
  if (!carrierBinding.passed) {
    return "carrier_split_or_missing_common_carrier";
  }
  if (!packetResidual.energyFrequency.passed) {
    return "energy_frequency_residual_failed";
  }
  if (!packetResidual.nullEikonal.passed) {
    return "null_eikonal_residual_failed";
  }
  if (!packetResidual.helicity.passed) {
    return "helicity_residual_failed";
  }
  if (!packetResidual.eventBalance.passed) {
    return "event_balance_residual_failed";
  }
  if (!packetResidual.pathFrequency.passed) {
    return "path_frequency_residual_failed";
  }
  if (!packetResidual.sourceProvenance.passed) {
    return "source_provenance_residual_failed";
  }
  if (!packetResidual.noHiddenRetune.passed) {
    return "hidden_retune_residual_failed";
  }
  const failedControl = negativeControls.find((control) => !control.passed);
  if (failedControl) {
    return `negative_control_${failedControl.id}_did_not_fail`;
  }
  return status === "populated" ? "none" : status;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite number for ${label}`);
  }
  return number;
}

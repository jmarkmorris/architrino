#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "../..");
const INPUT_SCHEMA = "aaa-equation-map-compton-recoil-event-input/v1";
const OUTPUT_SCHEMA = "aaa-equation-map-compton-recoil-event-replay/v1";
const EVENT_ID = "e_gamma_e_0";
const DEFAULT_TOLERANCE = 1e-10;
const DEFAULT_EPSILON = 1e-12;
const LEDGER_ZERO_TOLERANCE = 1e-12;
const ACCEPTED_NATIVE_STATUSES = new Set(["accepted", "populated", "passed"]);
const DEFAULT_INPUT = {
  schema: INPUT_SCHEMA,
  claimLevel:
    "weak homogeneous comparison event; not native AAA event-ledger certification",
  constants: {
    h: 1,
    c_gamma: 1,
    M_e_exp: 1,
  },
  eq26_reference: {
    h: 1,
    c_gamma: 1,
    M_e_exp: 1,
    recoil_convention: "relativistic_elastic_recoil",
  },
  event: {
    id: EVENT_ID,
    label: "weak-homogeneous-compton-recoil-default",
    recoil_convention: "relativistic_elastic_recoil",
    incident_photon: {
      energy: 2,
      direction: [1, 0, 0],
    },
    outgoing_photon: {
      theta_degrees: 60,
    },
    medium: {
      delta_E: 0,
      delta_p: [0, 0, 0],
    },
    remnant: {
      delta_E: 0,
      delta_p: [0, 0, 0],
    },
    native_rows: {},
  },
};

const REQUIRED_NATIVE_ROWS = [
  "photon_gate_A_input_output",
  "photon_gate_B_transverse_handoff",
  "target_retained_branch",
  "recoil_branch",
  "angular_momentum_ledger_delta_J",
  "noether_sea_state_row",
  "energy_momentum_event_ledger",
];

const GATE_A_ROW = "photon_gate_A_input_output";
const GATE_A_SOURCE_OBJECT_KIND = "photon_gate_A_input_output";
const GATE_A_EVIDENCE_FAMILY = "native_compton_recoil_event";
const GATE_A_SOURCE_SUPPORT = ["EQ-13", "EQ-28", "Gate A", EVENT_ID];

const REQUIRED_EVENT_LEDGER_SUPPORT = ["medium", "remnant"];
const REQUIRED_EM_GATE_ROWS = [
  "effective_charge_current_continuity",
  "em_stress_poynting_control_volume",
  "effective_gauge_chart_witness",
  "photon_gate_C_compton_vertex_handoff",
];

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const input = args.input ? readJson(path.resolve(args.input)) : createDefaultInput(args);
const output = replayComptonEvent(input, args);
writeOutput(output, args);

if (args.requireNativeClosed && output.summary.nativeLedgerStatus !== "native_event_accepted") {
  process.exitCode = 1;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    out: null,
    summary: false,
    pretty: false,
    requireNativeClosed: false,
    tolerance: DEFAULT_TOLERANCE,
    epsilon: DEFAULT_EPSILON,
    incidentEnergy: null,
    thetaDegrees: null,
    h: null,
    cGamma: null,
    mExp: null,
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
    } else if (arg === "--require-native-closed") {
      parsed.requireNativeClosed = true;
    } else if (arg === "--tolerance") {
      parsed.tolerance = positiveNumber(argv[++index], "--tolerance");
    } else if (arg === "--epsilon") {
      parsed.epsilon = positiveNumber(argv[++index], "--epsilon");
    } else if (arg === "--incident-energy") {
      parsed.incidentEnergy = positiveNumber(argv[++index], "--incident-energy");
    } else if (arg === "--theta-degrees") {
      parsed.thetaDegrees = finiteNumber(argv[++index], "--theta-degrees");
    } else if (arg === "--h") {
      parsed.h = positiveNumber(argv[++index], "--h");
    } else if (arg === "--c-gamma") {
      parsed.cGamma = positiveNumber(argv[++index], "--c-gamma");
    } else if (arg === "--m-exp") {
      parsed.mExp = positiveNumber(argv[++index], "--m-exp");
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: node scripts/equation-mapping/compton-recoil-event-replay.mjs [options]

Options:
  --input PATH              Optional Compton event JSON input.
  --out PATH                Write JSON output to PATH.
  --summary                 Emit only status, missing-row, and residual summary.
  --pretty                  Pretty-print JSON output.
  --require-native-closed   Exit nonzero unless native AAA rows are accepted.
  --tolerance N             Residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --epsilon N               Normalization epsilon. Defaults to ${DEFAULT_EPSILON}.
  --incident-energy N       Override default incident photon energy when no input is supplied.
  --theta-degrees N         Override default scattering angle when no input is supplied.
  --h N                     Override default h when no input is supplied.
  --c-gamma N               Override default photon-channel speed when no input is supplied.
  --m-exp N                 Override default exposed electron mass when no input is supplied.
  --help                    Show this help.

This replays the weak homogeneous Compton/recoil comparison event for EQ-28.
It closes only the elastic comparison residuals unless the input also supplies
accepted native photon Gate A/B, recoil, angular-momentum, Noether sea, and
event-ledger rows. It never raises equation-map scores by itself.`);
}

function createDefaultInput(parsedArgs) {
  const input = structuredClone(DEFAULT_INPUT);
  if (parsedArgs.h !== null) {
    input.constants.h = parsedArgs.h;
    input.eq26_reference.h = parsedArgs.h;
  }
  if (parsedArgs.cGamma !== null) {
    input.constants.c_gamma = parsedArgs.cGamma;
    input.eq26_reference.c_gamma = parsedArgs.cGamma;
  }
  if (parsedArgs.mExp !== null) {
    input.constants.M_e_exp = parsedArgs.mExp;
    input.eq26_reference.M_e_exp = parsedArgs.mExp;
  }
  if (parsedArgs.incidentEnergy !== null) {
    input.event.incident_photon.energy = parsedArgs.incidentEnergy;
  }
  if (parsedArgs.thetaDegrees !== null) {
    input.event.outgoing_photon.theta_degrees = parsedArgs.thetaDegrees;
  }
  return input;
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
    event: {
      id: output.eventCarrier.id,
      label: output.eventCarrier.label,
      claimLevel: output.eventCarrier.claimLevel,
    },
    summary: output.summary,
    residuals: {
      energy: output.residuals.energy.normalized,
      momentum: output.residuals.momentum.normalized,
      comptonEnergy: output.residuals.comptonEnergy.normalized,
      wavelength: output.residuals.wavelength.normalized,
      angularMomentum: output.residuals.angularMomentum.status,
      gateA: output.residuals.gateA.status,
      gateB: output.residuals.gateB.status,
    },
    effectiveEmGate: output.effectiveEmGate,
    projectionUse: output.projectionUse,
  };
}

function replayComptonEvent(input, parsedArgs) {
  const constants = parseConstants(input.constants ?? {});
  const event = parseEvent(input.event ?? {}, constants);
  const comparison = computeComparisonRows(event, constants, parsedArgs);
  const nativeRows = evaluateNativeRows(event.nativeRows, event.id);
  const eventLedgerSupport = evaluateEventLedgerSupport(event);
  const sharedRows = evaluateSharedRows(input.eq26_reference, event, constants, parsedArgs);
  const effectiveEmGate = evaluateEffectiveEmGate({
    event,
    comparison,
    nativeRows,
    eventLedgerSupport,
    sharedRows,
    tolerance: parsedArgs.tolerance,
  });
  const closedComparison =
    comparison.residuals.energy.normalized <= parsedArgs.tolerance &&
    comparison.residuals.momentum.normalized <= parsedArgs.tolerance &&
    comparison.residuals.comptonEnergy.normalized <= parsedArgs.tolerance &&
    comparison.residuals.wavelength.normalized <= parsedArgs.tolerance;
  const nativeRowsAccepted = nativeRows.missing.length === 0;
  const eventLedgerSupportAccepted = eventLedgerSupport.missing.length === 0;
  const nativeEventAccepted = nativeRowsAccepted && eventLedgerSupportAccepted;
  const nextBlocker = firstNativeBlocker(nativeRows, eventLedgerSupport);

  return {
    schema: OUTPUT_SCHEMA,
    generatedAt: new Date().toISOString(),
    input: {
      schema: input.schema ?? null,
      schemaOk: input.schema === undefined || input.schema === INPUT_SCHEMA,
      claimLevel: input.claimLevel ?? null,
    },
    eventCarrier: {
      id: event.id,
      label: event.label,
      claimLevel:
        "weak homogeneous comparison replay; native AAA rows must be populated separately",
      constants,
      scatteringAngle: {
        radians: event.theta,
        degrees: (event.theta * 180) / Math.PI,
        cosTheta: event.cosTheta,
      },
    },
    summary: {
      status: closedComparison
        ? nativeEventAccepted
          ? "native_event_replay_closed"
          : nativeRowsAccepted
            ? "comparison_replay_closed_event_ledger_support_missing"
            : "comparison_replay_closed_native_rows_missing"
        : "comparison_replay_failed",
      scoreDecision: "no_score_increase",
      comparisonReplayClosed: closedComparison,
      nativeLedgerStatus: nativeEventAccepted
        ? "native_event_accepted"
        : nativeRowsAccepted
          ? "event_ledger_support_missing"
          : "native_rows_missing",
      sharedEq26Status: sharedRows.status,
      nextBlocker,
      nextBlockerDetails: firstNativeBlockerDetails(
        nativeRows,
        eventLedgerSupport,
      ),
      residualTolerance: parsedArgs.tolerance,
      requiredNativeRows: REQUIRED_NATIVE_ROWS,
      missingNativeRows: nativeRows.missing,
      nativeRowStatuses: nativeRows.statuses,
      requiredEventLedgerSupport: REQUIRED_EVENT_LEDGER_SUPPORT,
      missingEventLedgerSupport: eventLedgerSupport.missing,
      eventLedgerSupportStatuses: eventLedgerSupport.statuses,
      effectiveEmGateStatus: effectiveEmGate.status,
      effectiveEmGateNextBlocker: effectiveEmGate.nextBlocker,
      effectiveEmGateNextBlockerDetails: effectiveEmGate.nextBlockerDetails,
      effectiveEmGateNumericPass: effectiveEmGate.numericPass,
      missingEffectiveEmGateRows: effectiveEmGate.rows.missing,
    },
    eventRows: comparison.eventRows,
    residuals: comparison.residuals,
    sharedRows,
    effectiveEmGate,
    nativeRows,
    eventLedgerSupport,
    projectionUse: {
      EQ12: "photon Gate A/B packet and null/eikonal comparison consumer",
      EQ13: "effective EM gate continuity, stress, gauge, and same-event ledger projection",
      EQ26: "shared h, exposed electron mass, photon-channel speed, and recoil convention",
      EQ28: "Compton/recoil event balance and wavelength-shift benchmark",
      EQ29: "Compton exchange classification as frequency-exchange/scattering-shift row",
    },
  };
}

function parseConstants(constants) {
  return {
    h: positiveNumber(constants.h ?? 1, "constants.h"),
    cGamma: positiveNumber(constants.c_gamma ?? constants.cGamma ?? 1, "constants.c_gamma"),
    mExp: positiveNumber(constants.M_e_exp ?? constants.mExp ?? 1, "constants.M_e_exp"),
  };
}

function parseEvent(event, constants) {
  const incident = event.incident_photon ?? {};
  const outgoing = event.outgoing_photon ?? {};
  const incidentDirection = unitVector3(
    incident.direction ?? [1, 0, 0],
    "event.incident_photon.direction"
  );
  const outgoingDirection = outgoing.direction
    ? unitVector3(outgoing.direction, "event.outgoing_photon.direction")
    : directionFromTheta(degreesOrRadians(outgoing), incidentDirection);
  const cosTheta = clamp(dot(incidentDirection, outgoingDirection), -1, 1);
  const theta = Math.acos(cosTheta);
  const incidentEnergy = positiveNumber(
    incident.energy ?? 2,
    "event.incident_photon.energy"
  );
  const outgoingEnergy = positiveNumber(
    outgoing.energy ??
      1 / (1 / incidentEnergy + (1 - cosTheta) / (constants.mExp * constants.cGamma ** 2)),
    "event.outgoing_photon.energy"
  );
  const medium = parseLedgerDelta(event.medium, "event.medium");
  const remnant = parseLedgerDelta(event.remnant, "event.remnant");

  return {
    id: event.id ?? EVENT_ID,
    label: event.label ?? "weak-homogeneous-compton-recoil",
    recoilConvention: event.recoil_convention ?? "relativistic_elastic_recoil",
    incidentEnergy,
    incidentDirection,
    outgoingEnergy,
    outgoingDirection,
    cosTheta,
    theta,
    medium,
    remnant,
    recoilMomentum: event.recoil?.p
      ? vector3(event.recoil.p, "event.recoil.p")
      : null,
    nativeRows: event.native_rows ?? {},
    emGateRows: event.em_gate_rows ?? event.emGateRows ?? {},
    emGateResiduals: event.em_gate_residuals ?? event.emGateResiduals ?? {},
  };
}

function degreesOrRadians(outgoing) {
  if (outgoing.theta_radians !== undefined) {
    return finiteNumber(outgoing.theta_radians, "event.outgoing_photon.theta_radians");
  }
  return (finiteNumber(outgoing.theta_degrees ?? 60, "event.outgoing_photon.theta_degrees") *
    Math.PI) /
    180;
}

function directionFromTheta(theta, incidentDirection) {
  if (Math.abs(incidentDirection[0] - 1) > 1e-12 || Math.abs(incidentDirection[1]) > 1e-12 || Math.abs(incidentDirection[2]) > 1e-12) {
    throw new Error("theta-only outgoing direction currently requires incident direction [1,0,0].");
  }
  return [Math.cos(theta), Math.sin(theta), 0];
}

function parseLedgerDelta(value, label) {
  const packet = value ?? {};
  const deltaEExplicit = Object.hasOwn(packet, "delta_E") || Object.hasOwn(packet, "deltaE");
  const deltaPExplicit = Object.hasOwn(packet, "delta_p") || Object.hasOwn(packet, "deltaP");
  return {
    deltaE: finiteNumber(packet.delta_E ?? packet.deltaE ?? 0, `${label}.delta_E`),
    deltaP: vector3(packet.delta_p ?? packet.deltaP ?? [0, 0, 0], `${label}.delta_p`),
    deltaEExplicit,
    deltaPExplicit,
    status: packet.status ?? "declared",
    rowId: packet.rowId ?? null,
    sourcePath: packet.sourcePath ?? packet.source ?? null,
    eventId: packet.eventId ?? null,
  };
}

function computeComparisonRows(event, constants, parsedArgs) {
  const incidentMomentum = scale(event.incidentDirection, event.incidentEnergy / constants.cGamma);
  const outgoingMomentum = scale(event.outgoingDirection, event.outgoingEnergy / constants.cGamma);
  const recoilMomentum =
    event.recoilMomentum ??
    subtract(subtract(subtract(incidentMomentum, outgoingMomentum), event.medium.deltaP), event.remnant.deltaP);
  const recoilTotalEnergy = Math.sqrt(
    (constants.mExp * constants.cGamma ** 2) ** 2 +
      constants.cGamma ** 2 * normSquared(recoilMomentum)
  );
  const lambdaIn = (constants.h * constants.cGamma) / event.incidentEnergy;
  const lambdaOut = (constants.h * constants.cGamma) / event.outgoingEnergy;
  const comptonShift = (constants.h / (constants.mExp * constants.cGamma)) * (1 - event.cosTheta);

  const energyRaw =
    event.incidentEnergy +
    constants.mExp * constants.cGamma ** 2 -
    event.outgoingEnergy -
    recoilTotalEnergy -
    event.medium.deltaE -
    event.remnant.deltaE;
  const momentumRaw = subtract(
    subtract(subtract(incidentMomentum, outgoingMomentum), recoilMomentum),
    add(event.medium.deltaP, event.remnant.deltaP)
  );
  const comptonEnergyRaw =
    1 / event.outgoingEnergy -
    1 / event.incidentEnergy -
    (1 - event.cosTheta) / (constants.mExp * constants.cGamma ** 2);
  const wavelengthRaw = lambdaOut - lambdaIn - comptonShift;

  return {
    eventRows: {
      incidentPhoton: {
        energy: event.incidentEnergy,
        direction: event.incidentDirection,
        momentum: incidentMomentum,
        wavelength: lambdaIn,
      },
      outgoingPhoton: {
        energy: event.outgoingEnergy,
        direction: event.outgoingDirection,
        momentum: outgoingMomentum,
        wavelength: lambdaOut,
      },
      recoil: {
        momentum: recoilMomentum,
        totalEnergy: recoilTotalEnergy,
        kineticEnergy: recoilTotalEnergy - constants.mExp * constants.cGamma ** 2,
        convention: event.recoilConvention,
      },
      medium: event.medium,
      remnant: event.remnant,
    },
    residuals: {
      energy: normalizeScalarResidual(
        energyRaw,
        event.incidentEnergy +
          constants.mExp * constants.cGamma ** 2 +
          event.outgoingEnergy +
          recoilTotalEnergy +
          Math.abs(event.medium.deltaE) +
          Math.abs(event.remnant.deltaE),
        parsedArgs.epsilon
      ),
      momentum: normalizeVectorResidual(
        momentumRaw,
        norm(incidentMomentum) +
          norm(outgoingMomentum) +
          norm(recoilMomentum) +
          norm(event.medium.deltaP) +
          norm(event.remnant.deltaP),
        parsedArgs.epsilon
      ),
      comptonEnergy: normalizeScalarResidual(
        comptonEnergyRaw,
        1 / event.outgoingEnergy + 1 / event.incidentEnergy,
        parsedArgs.epsilon
      ),
      wavelength: normalizeScalarResidual(
        wavelengthRaw,
        Math.abs(lambdaOut) + Math.abs(lambdaIn),
        parsedArgs.epsilon
      ),
      angularMomentum: {
        status: "blocked_missing_native_delta_J_row",
        normalized: null,
      },
      gateA: {
        status: "comparison_declared_not_native_gate_A",
        normalized: null,
      },
      gateB: {
        status: "blocked_missing_native_transverse_handoff",
        normalized: null,
      },
    },
  };
}

function evaluateSharedRows(eq26Reference, event, constants, parsedArgs) {
  if (!eq26Reference) {
    return {
      status: "blocked_missing_eq26_reference",
      residual: null,
      missing: ["eq26_reference"],
    };
  }
  const ref = {
    h: positiveNumber(eq26Reference.h, "eq26_reference.h"),
    cGamma: positiveNumber(
      eq26Reference.c_gamma ?? eq26Reference.cGamma,
      "eq26_reference.c_gamma"
    ),
    mExp: positiveNumber(
      eq26Reference.M_e_exp ?? eq26Reference.mExp,
      "eq26_reference.M_e_exp"
    ),
    recoilConvention: eq26Reference.recoil_convention,
  };
  const hResidual = Math.abs((constants.h - ref.h) / (ref.h + parsedArgs.epsilon));
  const mResidual = Math.abs((constants.mExp - ref.mExp) / (ref.mExp + parsedArgs.epsilon));
  const cResidual = Math.abs(
    (constants.cGamma - ref.cGamma) / (ref.cGamma + parsedArgs.epsilon)
  );
  const recoilResidual = ref.recoilConvention === event.recoilConvention ? 0 : 1;
  const total = hResidual + mResidual + cResidual + recoilResidual;
  return {
    status: total <= parsedArgs.tolerance ? "shared_rows_match" : "shared_rows_split",
    residual: total,
    components: {
      hResidual,
      mExpResidual: mResidual,
      cGammaResidual: cResidual,
      recoilConventionResidual: recoilResidual,
    },
  };
}

function evaluateNativeRows(nativeRows, eventId) {
  if (!nativeRows || typeof nativeRows !== "object" || Array.isArray(nativeRows)) {
    throw new Error("event.native_rows must be an object when supplied.");
  }
  const missing = [];
  const accepted = [];
  const statuses = {};
  const details = {};
  for (const rowName of REQUIRED_NATIVE_ROWS) {
    const row = nativeRows[rowName];
    const status = normalizeNativeRowStatus(row, eventId, rowName);
    statuses[rowName] = status;
    details[rowName] = summarizeNativeRow(rowName, row, status, eventId);
    if (status === "accepted") {
      accepted.push(rowName);
    } else {
      missing.push(rowName);
    }
  }
  return {
    required: REQUIRED_NATIVE_ROWS,
    accepted,
    missing,
    statuses,
    details,
  };
}

function evaluateEventLedgerSupport(event) {
  const missing = [];
  const accepted = [];
  const statuses = {};
  const details = {};
  for (const ledgerName of REQUIRED_EVENT_LEDGER_SUPPORT) {
    const row = event[ledgerName];
    const status = normalizeLedgerSupportStatus(row, event.id);
    statuses[ledgerName] = status;
    details[ledgerName] = summarizeLedgerSupportRow(
      ledgerName,
      row,
      status,
      event.id,
    );
    if (status === "accepted") {
      accepted.push(ledgerName);
    } else {
      missing.push(ledgerName);
    }
  }
  return {
    required: REQUIRED_EVENT_LEDGER_SUPPORT,
    accepted,
    missing,
    statuses,
    details,
  };
}

function evaluateEffectiveEmGate({
  event,
  comparison,
  nativeRows,
  eventLedgerSupport,
  sharedRows,
  tolerance,
}) {
  const rows = evaluateEmGateRows(event.emGateRows, event.id);
  const residuals = {
    continuity: scalarResidualFromRaw(
      event.emGateResiduals.continuityResidual ??
        event.emGateResiduals.Delta_cont ??
        0,
    ),
    energy: comparison.residuals.energy,
    momentum: comparison.residuals.momentum,
    angularMomentum: scalarResidualFromRaw(
      event.emGateResiduals.angularMomentumResidual ??
        event.emGateResiduals.Delta_J ??
        0,
    ),
    gauge: scalarResidualFromRaw(
      event.emGateResiduals.gaugeResidual ??
        event.emGateResiduals.Delta_gauge ??
        0,
    ),
    share13_28: scalarResidualFromRaw(
      event.emGateResiduals.shareResidual ??
        event.emGateResiduals.Delta_share_13_28 ??
        (sharedRows.status === "shared_rows_match" ? 0 : 1),
    ),
    retune: scalarResidualFromRaw(
      event.emGateResiduals.retuneResidual ??
        event.emGateResiduals.S_retune ??
        0,
    ),
  };
  const numericPass = Object.values(residuals).every(
    (row) => row.normalized !== null && row.normalized <= tolerance,
  );
  const status = decideEffectiveEmGateStatus({
    nativeRows,
    eventLedgerSupport,
    rows,
    numericPass,
  });
  return {
    status,
    scoreDecision: "no_score_increase",
    nextBlocker: firstEffectiveEmGateBlocker({
      nativeRows,
      eventLedgerSupport,
      rows,
      numericPass,
    }),
    nextBlockerDetails: firstEffectiveEmGateBlockerDetails({
      nativeRows,
      eventLedgerSupport,
      rows,
      numericPass,
    }),
    requiredRows: REQUIRED_EM_GATE_ROWS,
    rows,
    numericPass,
    residuals,
  };
}

function evaluateEmGateRows(emGateRows, eventId) {
  if (!emGateRows || typeof emGateRows !== "object" || Array.isArray(emGateRows)) {
    throw new Error("event.em_gate_rows must be an object when supplied.");
  }
  const missing = [];
  const accepted = [];
  const statuses = {};
  const details = {};
  for (const rowName of REQUIRED_EM_GATE_ROWS) {
    const row = emGateRows[rowName];
    const status = normalizeNativeRowStatus(row, eventId, rowName);
    statuses[rowName] = status;
    details[rowName] = summarizeNativeRow(rowName, row, status, eventId);
    if (status === "accepted") {
      accepted.push(rowName);
    } else {
      missing.push(rowName);
    }
  }
  return {
    required: REQUIRED_EM_GATE_ROWS,
    accepted,
    missing,
    statuses,
    details,
  };
}

function summarizeNativeRow(rowName, row, status, eventId) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return {
      id: rowName,
      status,
      rowType: row === undefined || row === null ? "missing" : typeof row,
      reason: status,
    };
  }
  const sourcePath = row.sourcePath ?? row.source ?? null;
  return {
    id: rowName,
    status,
    rowId: row.rowId ?? null,
    sourcePath,
    sourceReferenceExists: sourceReferenceExists(sourcePath),
    sourceEvidenceReferenceExists: sourceEvidenceReferenceExists(sourcePath),
    eventId: row.eventId ?? null,
    eventIdMatches: row.eventId === eventId,
    sourceObjectKind: row.sourceObjectKind ?? null,
    evidenceFamily: row.evidenceFamily ?? null,
    sourceSupport: Array.isArray(row.sourceSupport) ? row.sourceSupport : null,
    retainedReferencePresent:
      concreteString(row.rowId) &&
      concreteString(sourcePath) &&
      concreteString(row.eventId),
    reason: status === "accepted" ? "accepted" : status,
  };
}

function summarizeLedgerSupportRow(rowName, row, status, eventId) {
  const base = summarizeNativeRow(rowName, row, status, eventId);
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return base;
  }
  return {
    ...base,
    deltaE: row.deltaE ?? null,
    deltaP: row.deltaP ?? null,
    deltaEExplicit: row.deltaEExplicit === true,
    deltaPExplicit: row.deltaPExplicit === true,
    zeroDeltaPass:
      Math.abs(row.deltaE ?? Number.NaN) <= LEDGER_ZERO_TOLERANCE &&
      Array.isArray(row.deltaP) &&
      norm(row.deltaP) <= LEDGER_ZERO_TOLERANCE,
  };
}

function decideEffectiveEmGateStatus({
  nativeRows,
  eventLedgerSupport,
  rows,
  numericPass,
}) {
  if (nativeRows.missing.length > 0) {
    return "blocked_missing_native_event_rows";
  }
  if (eventLedgerSupport.missing.length > 0) {
    return "blocked_missing_event_ledger_support";
  }
  if (rows.missing.length > 0) {
    return "blocked_missing_em_gate_rows";
  }
  if (!numericPass) {
    return "blocked_em_gate_residual_above_tolerance";
  }
  return "effective_em_gate_populated";
}

function firstEffectiveEmGateBlocker({
  nativeRows,
  eventLedgerSupport,
  rows,
  numericPass,
}) {
  if (nativeRows.missing.length > 0) {
    return `missing_accepted_${nativeRows.missing[0]}`;
  }
  if (eventLedgerSupport.missing.length > 0) {
    return `missing_accepted_${eventLedgerSupport.missing[0]}_support`;
  }
  if (rows.missing.length > 0) {
    return `missing_accepted_${rows.missing[0]}`;
  }
  if (!numericPass) {
    return "em_gate_residual_above_tolerance";
  }
  return null;
}

function firstEffectiveEmGateBlockerDetails({
  nativeRows,
  eventLedgerSupport,
  rows,
  numericPass,
}) {
  const nativeDetails = firstNativeBlockerDetails(nativeRows, eventLedgerSupport);
  if (nativeDetails) {
    return nativeDetails;
  }
  const firstRow = rows.missing[0];
  if (firstRow) {
    return rows.details[firstRow] ?? null;
  }
  if (!numericPass) {
    return {
      id: "em_gate_residual_above_tolerance",
      reason: "numeric_residual_above_tolerance",
    };
  }
  return null;
}

function normalizeLedgerSupportStatus(row, eventId) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return "missing";
  }
  const status = row.status ?? "declared";
  if (!ACCEPTED_NATIVE_STATUSES.has(status)) {
    return status;
  }
  if (
    !concreteString(row.rowId) ||
    !concreteString(row.sourcePath ?? row.source) ||
    !concreteString(row.eventId)
  ) {
    return "accepted_without_retained_reference";
  }
  if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
    return "accepted_without_existing_source";
  }
  if (
    !sourceEvidenceReferenceExists(row.sourcePath) &&
    !sourceEvidenceReferenceExists(row.source)
  ) {
    return "accepted_without_evidence_source";
  }
  if (row.eventId !== eventId) {
    return "accepted_event_id_mismatch";
  }
  if (row.deltaEExplicit !== true || row.deltaPExplicit !== true) {
    return "accepted_without_explicit_delta";
  }
  if (
    Math.abs(row.deltaE) > LEDGER_ZERO_TOLERANCE ||
    norm(row.deltaP) > LEDGER_ZERO_TOLERANCE
  ) {
    return "accepted_nonzero_weak_homogeneous_delta";
  }
  return "accepted";
}

function normalizeNativeRowStatus(row, eventId, rowName = null) {
  if (row === undefined || row === null) {
    return "missing";
  }
  if (typeof row === "string") {
    return row === "accepted" ? "accepted_without_retained_reference" : row;
  }
  if (typeof row === "object" && !Array.isArray(row)) {
    const status = row.status ?? "declared";
    if (!ACCEPTED_NATIVE_STATUSES.has(status)) {
      return status;
    }
    if (
      !concreteString(row.rowId) ||
      !concreteString(row.sourcePath ?? row.source) ||
      !concreteString(row.eventId)
    ) {
      return "accepted_without_retained_reference";
    }
    if (!sourceReferenceExists(row.sourcePath) && !sourceReferenceExists(row.source)) {
      return "accepted_without_existing_source";
    }
    if (
      !sourceEvidenceReferenceExists(row.sourcePath) &&
      !sourceEvidenceReferenceExists(row.source)
    ) {
      return "accepted_without_evidence_source";
    }
    if (row.eventId !== eventId) {
      return "accepted_event_id_mismatch";
    }
    if (rowName === GATE_A_ROW && !hasGateASourceObjectContract(row)) {
      return "accepted_without_source_object_contract";
    }
    return "accepted";
  }
  return "invalid";
}

function hasGateASourceObjectContract(row) {
  if (row.sourceObjectKind !== GATE_A_SOURCE_OBJECT_KIND) {
    return false;
  }
  if (row.evidenceFamily !== GATE_A_EVIDENCE_FAMILY) {
    return false;
  }
  if (!Array.isArray(row.sourceSupport)) {
    return false;
  }
  return GATE_A_SOURCE_SUPPORT.every((entry) => row.sourceSupport.includes(entry));
}

function firstNativeBlocker(nativeRows, eventLedgerSupport) {
  if (nativeRows.missing.length > 0) {
    return `missing_accepted_${nativeRows.missing[0]}`;
  }
  if (eventLedgerSupport.missing.length > 0) {
    return `missing_accepted_${eventLedgerSupport.missing[0]}_support`;
  }
  return null;
}

function firstNativeBlockerDetails(nativeRows, eventLedgerSupport) {
  const firstNativeRow = nativeRows.missing[0];
  if (firstNativeRow) {
    return nativeRows.details[firstNativeRow] ?? null;
  }
  const firstSupportRow = eventLedgerSupport.missing[0];
  if (firstSupportRow) {
    return eventLedgerSupport.details[firstSupportRow] ?? null;
  }
  return null;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== 3) {
    throw new Error(`${label} must be a three-component array.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function unitVector3(value, label) {
  const vector = vector3(value, label);
  const length = norm(vector);
  if (length <= 0) {
    throw new Error(`${label} must have nonzero length.`);
  }
  return scale(vector, 1 / length);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function normSquared(vector) {
  return dot(vector, vector);
}

function norm(vector) {
  return Math.sqrt(normSquared(vector));
}

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, scalar) {
  return vector.map((entry) => entry * scalar);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeScalarResidual(raw, scaleValue, epsilon) {
  return {
    raw,
    normalized: Math.abs(raw) / (Math.abs(scaleValue) + epsilon),
  };
}

function scalarResidualFromRaw(raw) {
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    return {
      raw,
      normalized: null,
    };
  }
  return {
    raw: value,
    normalized: Math.abs(value),
  };
}

function normalizeVectorResidual(raw, scaleValue, epsilon) {
  return {
    raw,
    norm: norm(raw),
    normalized: norm(raw) / (Math.abs(scaleValue) + epsilon),
  };
}

function concreteString(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return (
    text !== "" &&
    text !== "..." &&
    !text.includes("<") &&
    !text.toLowerCase().includes("todo") &&
    !text.toLowerCase().includes("pending") &&
    !text.toLowerCase().includes("placeholder")
  );
}

function sourceReferenceExists(value) {
  if (!concreteString(value)) {
    return false;
  }
  const resolvedPath = resolveSourcePath(value);
  if (isNonDurableSourcePath(resolvedPath)) {
    return false;
  }
  try {
    return fs.statSync(resolvedPath).isFile();
  } catch {
    return false;
  }
}

function sourceEvidenceReferenceExists(value) {
  if (!sourceReferenceExists(value)) {
    return false;
  }
  return isEvidenceSourcePath(resolveSourcePath(value));
}

function resolveSourcePath(value) {
  const source = value.trim();
  return path.isAbsolute(source)
    ? path.normalize(source)
    : path.resolve(REPO_ROOT, source);
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

function isEvidenceSourcePath(filePath) {
  const normalized = path.normalize(filePath);
  const relative = path.relative(REPO_ROOT, normalized);
  if (
    relative === "" ||
    relative.startsWith("..") ||
    path.isAbsolute(relative)
  ) {
    return false;
  }
  if (relative.startsWith(`reference${path.sep}priorities${path.sep}`)) {
    return false;
  }
  if (relative.startsWith(`content${path.sep}markdown${path.sep}aaa${path.sep}`)) {
    return false;
  }
  const lowerBasename = path.basename(normalized).toLowerCase();
  return !(
    lowerBasename.includes("attempt") ||
    lowerBasename.includes("mock") ||
    lowerBasename.includes("toy") ||
    lowerBasename.includes("probe") ||
    lowerBasename.includes("source-contract") ||
    lowerBasename.includes("negative-control")
  );
}

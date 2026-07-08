#!/usr/bin/env node

// Priority-only checker for the delayed escape certificate lemma.
// Consumes a result.json produced by held-release-causal-wake-toy.mjs and
// evaluates the certificate hypothesis ledger, envelope constant, margin,
// and ordering witness, fail-closed. See the proof packet:
// reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md

import fs from "node:fs";

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printUsage(0);
}

const row = readResultRow(options.resultPath);
const report = evaluateCertificate(row, options);
const serialized = JSON.stringify(report, null, options.pretty ? 2 : 0);
if (options.outPath) {
  fs.writeFileSync(options.outPath, `${serialized}\n`);
}
console.log(serialized);

function parseArgs(argv) {
  const rawArgs = [];
  for (const arg of argv) {
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      rawArgs.push(arg.slice(0, eq), arg.slice(eq + 1));
    } else {
      rawArgs.push(arg);
    }
  }
  const parsed = {
    help: false,
    resultPath: null,
    outPath: null,
    pretty: false,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--result") {
      parsed.resultPath = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--out") {
      parsed.outPath = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else {
      throw new TypeError(`Unknown argument: ${arg}`);
    }
  }
  if (!parsed.help && !parsed.resultPath) {
    throw new TypeError("--result <path to held-release toy result.json> is required");
  }
  return parsed;
}

function readResultRow(resultPath) {
  const parsed = JSON.parse(fs.readFileSync(resultPath, "utf8"));
  if (parsed.schema !== "braid-ideal-held-release-causal-wake-toy-result.v1") {
    throw new TypeError(`Unsupported result schema: ${parsed.schema}`);
  }
  return parsed;
}

function evaluateCertificate(row, options) {
  const configuration = row.configuration;
  const fieldSpeed = configuration.fieldSpeed;
  const coupling = Math.abs(configuration.coupling);
  const jacobianFloor = configuration.jacobianFloor;
  const samples = row.frames.map((frame) => ({
    time: frame.time,
    radiusMean: frame.metrics.radiusMean,
    radialVelocityMean: frame.metrics.radialVelocityMean,
    speedRatio: frame.metrics.fieldSpeedRatioMax,
    minSeparation: Math.min(frame.metrics.minSameDistance, frame.metrics.minOppositeDistance),
    minOppositeSeparation: frame.metrics.minOppositeDistance,
  }));
  const measuredMaxRootsPerDirectedPair = row.rootStats.maxRootsPerDirectedPair;
  // Theorem M: under (S), each directed pair retains exactly one transversal
  // causal root, so m = 1 inside every sub-field window. When the record
  // confirms a global max of one, the theorem value is fully witnessed; a
  // larger recorded max cannot be timestamped from the row alone, so the
  // checker falls back to the measured cap and flags the provenance.
  const theoremMConfirmed = measuredMaxRootsPerDirectedPair <= 1;
  const rootCountCap = theoremMConfirmed ? 1 : measuredMaxRootsPerDirectedPair;
  const rootCountCapProvenance = theoremMConfirmed
    ? "theorem_M_confirmed_by_record"
    : "measured_global_max_fallback_multi_root_timing_unresolved_on_record";
  const measuredMaxBranchWeight = row.rootStats.maxBranchWeight;
  const partnerSourceCount = row.frames[0].particles.length - 1;

  // Hypothesis (S): first recorded field-speed violation.
  const firstSpeedViolation = samples.find((sample) => sample.speedRatio >= 1) ?? null;
  const recordedWindowEnd = firstSpeedViolation ? firstSpeedViolation.time : samples[samples.length - 1].time;

  // Return turns from the step-level diagnostic.
  const returnTurnRows = row.trajectoryDiagnostics.radialTurnRows.filter(
    (turn) => turn.turnKind === "expansion_to_compression"
  );

  // Candidate certificate times: recorded samples with outward reduced-radius
  // velocity strictly before the first hypothesis violation.
  const candidates = [];
  for (const sample of samples) {
    if (sample.time >= recordedWindowEnd && firstSpeedViolation) {
      break;
    }
    if (!(sample.radialVelocityMean > 0) || !(sample.radiusMean > 0)) {
      continue;
    }
    const windowSamples = samples.filter(
      (windowSample) =>
        windowSample.time >= sample.time &&
        (firstSpeedViolation == null || windowSample.time < recordedWindowEnd)
    );
    if (windowSamples.length === 0) {
      continue;
    }
    // (S): source-path speed cap over the full retained window up to window end.
    const historySamples = samples.filter(
      (historySample) =>
        historySample.time <= windowSamples[windowSamples.length - 1].time
    );
    const beta = Math.max(
      configuration.angularMomentumRelease?.surfaceSpeedFraction ?? 0,
      ...historySamples.map((historySample) => historySample.speedRatio)
    );
    if (beta >= 1) {
      continue;
    }
    // (D) all-pair floor over the certified window (isotropic comparison form).
    const gamma = Math.min(
      ...windowSamples.map((windowSample) => windowSample.minSeparation / windowSample.radiusMean)
    );
    // (D_op) opposite-polarity floor over the certified window (signed form).
    const gammaOp = Math.min(
      ...windowSamples.map(
        (windowSample) => windowSample.minOppositeSeparation / windowSample.radiusMean
      )
    );
    if (!(gamma > 0) || !(gammaOp > 0)) {
      continue;
    }
    // (P) past-radius cap on the recorded history at the candidate time.
    const pastRadiusMax = Math.max(
      ...samples
        .filter((historySample) => historySample.time <= sample.time)
        .map((historySample) => historySample.radiusMean)
    );
    const pastRadiusCapHolds = pastRadiusMax <= sample.radiusMean * (1 + 1e-12);
    const weightCap = (1 + beta) / Math.max(jacobianFloor, 1 - beta);
    const envelopeKIsotropic =
      (partnerSourceCount * rootCountCap * coupling * weightCap * (1 + beta) ** 2) / gamma ** 2;
    const envelopeKSigned =
      rootCountCap * coupling * weightCap * (1 + beta) ** 2 * (0.25 + 2 / gammaOp ** 2);
    const marginIsotropic =
      sample.radialVelocityMean ** 2 - (2 * envelopeKIsotropic) / sample.radiusMean;
    const marginSigned = pastRadiusCapHolds
      ? sample.radialVelocityMean ** 2 - (2 * envelopeKSigned) / sample.radiusMean
      : null;
    candidates.push({
      certificateTime: sample.time,
      radialVelocity: sample.radialVelocityMean,
      radius: sample.radiusMean,
      beta: cleanNumber(beta),
      gamma: cleanNumber(gamma),
      gammaOp: cleanNumber(gammaOp),
      channelFloorConsistent: gammaOp >= 1 - 1e-6,
      pastRadiusCapHolds,
      rootCountCap,
      weightCap: cleanNumber(weightCap),
      envelopeKIsotropic: cleanNumber(envelopeKIsotropic),
      envelopeKSigned: cleanNumber(envelopeKSigned),
      envelopeSharpeningRatio: cleanNumber(envelopeKSigned / envelopeKIsotropic),
      marginRequirementIsotropic: cleanNumber((2 * envelopeKIsotropic) / sample.radiusMean),
      marginRequirementSigned: cleanNumber((2 * envelopeKSigned) / sample.radiusMean),
      outwardSpeedSquared: cleanNumber(sample.radialVelocityMean ** 2),
      marginIsotropic: cleanNumber(marginIsotropic),
      marginSigned: marginSigned == null ? null : cleanNumber(marginSigned),
      marginSatisfied: marginSigned != null && marginSigned > 0,
      windowEnd: windowSamples[windowSamples.length - 1].time,
    });
  }

  const signedCandidates = candidates.filter((candidate) => candidate.marginSigned != null);
  const bestCandidate =
    signedCandidates.length === 0
      ? candidates.length === 0
        ? null
        : candidates.reduce((best, candidate) =>
            candidate.marginIsotropic > best.marginIsotropic ? candidate : best
          )
      : signedCandidates.reduce((best, candidate) =>
          candidate.marginSigned > best.marginSigned ? candidate : best
        );
  const certifiedWindows = candidates.filter((candidate) => candidate.marginSatisfied);

  // Ordering witness: no return turn may sit inside a certified window.
  const orderingViolations = [];
  for (const window of certifiedWindows) {
    for (const turn of returnTurnRows) {
      if (turn.time > window.certificateTime && turn.time <= window.windowEnd) {
        orderingViolations.push({ certificateTime: window.certificateTime, returnTurnTime: turn.time });
      }
    }
  }
  const orderingWitnessConsistent = orderingViolations.length === 0;

  const measuredWeightWithinCap =
    bestCandidate == null ? null : measuredMaxBranchWeight <= bestCandidate.weightCap + 1e-9;

  const firstBlocker = firstPresent([
    [candidates.length === 0, "no_admissible_certificate_time_before_first_hypothesis_violation"],
    [
      signedCandidates.length === 0,
      "past_radius_cap_unsatisfied_at_every_admissible_certificate_time",
    ],
    [certifiedWindows.length === 0, "escape_margin_inequality_unsatisfied_at_every_admissible_certificate_time"],
    [firstSpeedViolation != null, "field_speed_hypothesis_violated_at_recorded_crossing"],
    [true, "hypothesis_persistence_beyond_recorded_window_unproven"],
  ]);

  return {
    schema: "braid-ideal-delayed-escape-certificate-check.v3",
    createdAt: new Date().toISOString(),
    status: "priority_only_conditional_certificate_check",
    proofPacketRef:
      "priority-proof-packet:reference/priorities/braid-ideal/delayed-escape-certificate-lemma-proof-packet.md",
    priorityOnly: true,
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
    sourceRow: {
      resultPath: options.resultPath,
      schema: row.schema,
      prehistoryMode: configuration.prehistoryMode ?? "stationary-held-release",
      surfaceSpeedFraction: configuration.angularMomentumRelease?.surfaceSpeedFraction ?? 0,
      fieldSpeed,
      coupling: configuration.coupling,
      jacobianFloor,
      softening: configuration.softening,
      partnerSourceCount,
      rootCountCap,
      rootCountCapProvenance,
      measuredMaxBranchWeight: cleanNumber(measuredMaxBranchWeight),
      missingRoots: row.rootStats.missingRoots,
    },
    hypothesisLedger: {
      channelHypothesisC: {
        applicable: row.trajectoryDiagnostics.fixedPointDrift?.applicable ?? null,
        group: row.trajectoryDiagnostics.fixedPointDrift?.group ?? null,
        fixedPointDriftResidualMax: row.trajectoryDiagnostics.fixedPointDrift?.residualMax ?? null,
      },
      wellPosednessWP: {
        rootCoverageClean: row.rootStats.missingRoots === 0,
        smallJacobianRoots: row.rootStats.smallJacobianRoots,
        transversalityNote:
          "Lemma 5: under (S) every retained root is transversal with source-normal Jacobian >= 1-beta and the root map is locally Lipschitz; sub-field multi-root or missing-root events are runner audit failures",
      },
      subFieldSpeedS: {
        firstRecordedViolationTime: firstSpeedViolation ? firstSpeedViolation.time : null,
        holdsOverFullRecord: firstSpeedViolation == null,
      },
      separationFloors: {
        allPairMinOverRadius: cleanNumber(
          Math.min(...samples.map((sample) => sample.minSeparation / sample.radiusMean))
        ),
        oppositePolarityMinOverRadius: cleanNumber(
          Math.min(...samples.map((sample) => sample.minOppositeSeparation / sample.radiusMean))
        ),
        channelFloorConsistent:
          Math.min(...samples.map((sample) => sample.minOppositeSeparation / sample.radiusMean)) >=
          1 - 1e-6,
        channelFloorStatement:
          "Lemma A: opposite-polarity non-antipodal separation >= R on the invariant channel",
      },
      rootCountCapM: {
        cap: rootCountCap,
        provenance: rootCountCapProvenance,
        measuredGlobalMaxRootsPerDirectedPair: measuredMaxRootsPerDirectedPair,
        theoremStatement:
          "Theorem M: (S) plus recorded coverage at T0 forces exactly one transversal causal root per directed pair; (M) persists under (S)",
        dischargedUnderS: true,
      },
    },
    admissibleCertificateTimes: candidates.length,
    signedAdmissibleCertificateTimes: signedCandidates.length,
    bestMarginCandidate: bestCandidate,
    envelopeSharpening:
      bestCandidate == null
        ? null
        : {
            isotropicRequirement: bestCandidate.marginRequirementIsotropic,
            signedRequirement: bestCandidate.marginRequirementSigned,
            requirementRatio: bestCandidate.envelopeSharpeningRatio,
            deficitClosedFraction: cleanNumber(1 - bestCandidate.envelopeSharpeningRatio),
            note: "signed envelope divides the margin requirement 2K/R0 by the same ratio; remaining deficit is dominated by W_max as beta -> 1",
          },
    certifiedWindows,
    returnTurnRows,
    orderingWitness: {
      consistent: orderingWitnessConsistent,
      violations: orderingViolations,
      statement:
        "a return turn cannot precede the first hypothesis violation inside a certified margin window",
    },
    measuredWeightWithinCap,
    windowCertificateGranted: certifiedWindows.length > 0 && orderingWitnessConsistent,
    eternalNoReturnCertificate: false,
    firstBlocker,
    missingAcceptedFields: [
      "hypothesis_persistence_lemma",
      "central_solver_retained_history_row",
      "same_record_causal_root_replay",
      "retained_branch_certificate",
    ],
  };
}

function firstPresent(entries) {
  for (const [condition, value] of entries) {
    if (condition) {
      return value;
    }
  }
  return null;
}

function cleanNumber(value) {
  return Number.isFinite(value) ? Number(value.toPrecision(15)) : value;
}

function requireNext(rawArgs, index, arg) {
  const value = rawArgs[index + 1];
  if (value == null || value.startsWith("--")) {
    throw new TypeError(`${arg} requires a value`);
  }
  return value;
}

function printUsage(exitCode) {
  console.log(`Usage: node scripts/braid-ideal/delayed-escape-certificate-check.mjs --result <path> [options]

Evaluates the delayed escape certificate ledger on one recorded
held-release toy row (result.json), fail-closed.

Options:
  --result <path>   result.json from held-release-causal-wake-toy.mjs (required)
  --out <path>      optional output JSON path
  --pretty          pretty-print output
`);
  process.exit(exitCode);
}

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// Bounded F6c search on the exact six-coordinate symmetry surface.
// Stage A searches a predeclared broad harmonic-history domain for certified
// trajectories with both radial and cadence turns. Stage B perturbs one such
// seed and ranks exact direct/reflected return residuals only at one declared
// scalar Poincare crossing. A focused continuation can instead vary only the
// radial-to-axial breathing-frequency ratio. Harmonic histories seed the
// forward EOM solver; they never own return acceptance.

const TWO_PI = 2 * Math.PI;
const STATE_COORDINATES = [
  "h", "rho", "theta", "hDot", "rhoDot", "thetaDot",
];

function option(name, fallback) {
  const prefix = `--${name}=`;
  const entry = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.slice(2).includes(`--${name}`);
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(option(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 1) {
    throw new TypeError(`${name} must be a positive integer.`);
  }
  return value;
}

function nonnegativeInteger(name, fallback) {
  const value = Number.parseInt(option(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a nonnegative integer.`);
  }
  return value;
}

function finiteOption(name, fallback) {
  const value = Number(option(name, String(fallback)));
  if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite.`);
  return value;
}

function finiteListOption(name, fallback) {
  const values = option(name, fallback).split(",").map((token) => Number(token));
  if (
    values.length === 0
    || values.some((value) => !Number.isFinite(value))
  ) {
    throw new TypeError(`${name} must be a comma-separated finite list.`);
  }
  return values;
}

function halton(index, base) {
  let fraction = 1;
  let value = 0;
  let remaining = index;
  while (remaining > 0) {
    fraction /= base;
    value += fraction * (remaining % base);
    remaining = Math.floor(remaining / base);
  }
  return value;
}

function sampleFraction(index, dimension) {
  const rotation = ((dimension + 1) * 0.6180339887498949) % 1;
  return (halton(index, bases[dimension]) + rotation) % 1;
}

function lerp(minimum, maximum, fraction) {
  return minimum + (maximum - minimum) * fraction;
}

function centered(fraction, radius) {
  return (2 * fraction - 1) * radius;
}

function wrapPositive(angle) {
  return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
}

function run(command, args, options = {}) {
  return new Promise((resolve) => {
    const { timeoutSeconds = null, ...spawnOptions } = options;
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      ...spawnOptions,
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = timeoutSeconds === null ? null : setTimeout(() => {
      timedOut = true;
      child.kill("SIGINT");
    }, timeoutSeconds * 1000);
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status, signal) => {
      if (timer !== null) clearTimeout(timer);
      resolve({ status, signal, stdout, stderr, timedOut });
    });
  });
}

function rms(values) {
  return Math.sqrt(values.reduce((sum, value) => sum + value ** 2, 0)
    / values.length);
}

function compactState(frameOrState) {
  const sectors = frameOrState?.sectors ?? frameOrState;
  if (!sectors) return null;
  return Object.fromEntries(["positive", "negative"].map((sector) => [
    sector,
    Object.fromEntries(STATE_COORDINATES.map((coordinate) => [
      coordinate,
      sectors[sector][coordinate],
    ])),
  ]));
}

function nearestFrame(frames, time) {
  return frames.reduce((best, frame) => (
    best === null || Math.abs(frame.time - time) < Math.abs(best.time - time)
      ? frame : best
  ), null);
}

function prescribedSpeedBound(parameters) {
  const radialBreathingRate = parameters.breathingRate
    * (parameters.radialBreathingRatio ?? 1);
  const sectorBound = (sector) => {
    const components = {
      axial: Math.abs(parameters[`${sector}HAmplitude`])
        * parameters.breathingRate,
      radial: Math.abs(parameters[`${sector}RhoAmplitude`])
        * radialBreathingRate,
      tangential: (
        0.3 + Math.abs(parameters[`${sector}RhoAmplitude`])
      ) * (
        parameters[`${sector}Rate`]
        + Math.abs(parameters[`${sector}PhaseAmplitude`])
          * parameters.breathingRate
      ),
    };
    return { components, total: Math.hypot(...Object.values(components)) };
  };
  const positive = sectorBound("positive");
  const negative = sectorBound("negative");
  return {
    positive,
    negative,
    maximum: Math.max(positive.total, negative.total),
  };
}

const stage = option("stage", "dual-turn-discovery");
if (![
  "dual-turn-discovery",
  "return-continuation",
  "radial-frequency-continuation",
].includes(stage)) {
  throw new TypeError(
    "stage must be dual-turn-discovery, return-continuation, "
      + "or radial-frequency-continuation.",
  );
}
const isContinuation = stage !== "dual-turn-discovery";

const executable = option(
  "executable",
  ".tmp/eom-native-dev/attractor-ensemble-harness",
);
const analyzer = option(
  "analyzer",
  "scripts/mapping-electromagnetism/f6c-eom-coordinate-analysis.mjs",
);
const outRoot = option("out-root", ".tmp/f6c-nonlinear-return-map-search");
const rowsRequested = positiveInteger("rows", 64);
const concurrency = positiveInteger("concurrency", 2);
const threadsPerCandidate = positiveInteger("threads-per-candidate", 2);
const seedOffset = positiveInteger("seed-offset", 1);
const endTime = finiteOption("end-time", 0.6);
const step = finiteOption("step", 0.002);
const rootTolerance = finiteOption("root-tolerance", 1e-5);
const historySegmentStep = finiteOption("history-segment-step", 0.01);
const candidateWallSeconds = finiteOption("candidate-wall-seconds", 180);
const minimumFlightTime = finiteOption("minimum-flight-time", 0.08);
const minimumShapeExcursion = finiteOption("minimum-shape-excursion", 0.02);
const minimumSectionExcursion = finiteOption(
  "minimum-section-excursion",
  1e-4,
);
const minimumLiftedPhaseAdvance = finiteOption(
  "minimum-lifted-phase-advance",
  0.12,
);
const minimumTurnBracketRate = finiteOption(
  "minimum-turn-bracket-rate",
  1e-5,
);
const materialImprovementFraction = finiteOption(
  "material-improvement-fraction",
  0.1,
);
const radialBreathingRatios = finiteListOption(
  "radial-breathing-ratios",
  "1,0.95,1.05,0.9,1.1,0.85,1.15,0.8,1.2",
);
const sectionToken = option("section", "positive:axial");
const [sectionSector, sectionCoordinate] = sectionToken.split(":");
if (
  !["positive", "negative"].includes(sectionSector)
  || !["axial", "radial"].includes(sectionCoordinate)
) {
  throw new TypeError("section must name one polarity sector and axial or radial.");
}
if (
  !(endTime > minimumFlightTime)
  || !(step > 0)
  || !(rootTolerance > 0)
  || !(historySegmentStep > 0)
  || !(candidateWallSeconds > 0)
  || !(minimumShapeExcursion > 0)
  || !(minimumSectionExcursion > 0)
  || !(minimumLiftedPhaseAdvance > 0)
  || !(minimumTurnBracketRate > 0)
  || !(materialImprovementFraction > 0 && materialImprovementFraction < 1)
) {
  throw new TypeError("search times, tolerances, marker floors, and step sizes must be positive.");
}
if (
  stage === "radial-frequency-continuation"
  && (
    rowsRequested !== radialBreathingRatios.length
    || radialBreathingRatios[0] !== 1
    || radialBreathingRatios.some((value) => !(value > 0))
    || new Set(radialBreathingRatios).size !== radialBreathingRatios.length
  )
) {
  throw new TypeError(
    "radial-frequency-continuation requires one positive distinct ratio per "
      + "requested row, with the ratio-one control first.",
  );
}

const discoveryDomain = {
  parameterization: "one-frequency harmonic histories with independent sector axial, radial, and cadence amplitudes plus independent axial/radial phases",
  positiveRate: [0.25, 1.65],
  negativeRate: [0.25, 1.65],
  negativeTheta: [0, TWO_PI],
  breathingRate: [0.35, 1.6],
  cyclePhase: [0, TWO_PI],
  positiveHAmplitude: [-0.18, 0.18],
  negativeHAmplitude: [-0.18, 0.18],
  positiveRhoAmplitude: [-0.18, 0.18],
  negativeRhoAmplitude: [-0.18, 0.18],
  positivePhaseAmplitude: [-0.45, 0.45],
  negativePhaseAmplitude: [-0.45, 0.45],
  positiveHPhaseOffset: [0, TWO_PI],
  negativeHPhaseOffset: [0, TWO_PI],
  positiveRhoPhaseOffset: [0, TWO_PI],
  negativeRhoPhaseOffset: [0, TWO_PI],
  fixedConditions: {
    fieldSpeed: 1,
    hCenter: 0.3,
    rhoCenter: 0.3,
    exactF6cMemberMap: true,
    exactSixCoordinateSymmetrySurface: true,
    conservativeWholePrehistoryMemberSpeedStrictlyBelow: 1,
    radialBreathingRatio: 1,
  },
};

const bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

function discoveryParameters(sequenceIndex) {
  const names = Object.keys(discoveryDomain).filter(
    (name) => Array.isArray(discoveryDomain[name]),
  );
  return Object.fromEntries(names.map((name, index) => [
    name,
    lerp(
      discoveryDomain[name][0],
      discoveryDomain[name][1],
      sampleFraction(sequenceIndex, index),
    ),
  ]));
}

function loadContinuationCenter() {
  const summaryPath = option("seed-summary", "");
  if (!summaryPath) {
    throw new TypeError("return-continuation requires --seed-summary=PATH.");
  }
  const rowIndex = nonnegativeInteger("seed-row", 0);
  const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  const row = summary.rows.find((candidate) =>
    candidate.status === "analyzed"
    && candidate.result?.index === rowIndex);
  if (!row) throw new TypeError(`seed row ${rowIndex} was not analyzed.`);
  if (!row.result.dualTurnDiscovery?.passed) {
    throw new TypeError(`seed row ${rowIndex} is not a certified dual-turn history.`);
  }
  return {
    parameters: {
      ...row.result.parameters,
      radialBreathingRatio: row.result.parameters.radialBreathingRatio ?? 1,
    },
    provenance: {
      summaryPath,
      schema: summary.schema,
      stage: summary.stage,
      rowIndex,
      runId: row.result.manifest.runId,
    },
  };
}

const continuationCenter = isContinuation
  ? loadContinuationCenter() : null;

function continuationParameters(sequenceIndex) {
  if (sequenceIndex === seedOffset) return { ...continuationCenter.parameters };
  const center = continuationCenter.parameters;
  const fractions = bases.map((_, dimension) =>
    sampleFraction(sequenceIndex, dimension));
  return {
    positiveRate: Math.max(0.05, center.positiveRate * (
      1 + centered(fractions[0], 0.2)
    )),
    negativeRate: Math.max(0.05, center.negativeRate * (
      1 + centered(fractions[1], 0.2)
    )),
    negativeTheta: wrapPositive(
      center.negativeTheta + centered(fractions[2], 0.5)
    ),
    breathingRate: Math.max(0.05, center.breathingRate * (
      1 + centered(fractions[3], 0.25)
    )),
    cyclePhase: wrapPositive(
      center.cyclePhase + centered(fractions[4], 0.5)
    ),
    positiveHAmplitude: center.positiveHAmplitude
      + centered(fractions[5], 0.04),
    negativeHAmplitude: center.negativeHAmplitude
      + centered(fractions[6], 0.04),
    positiveRhoAmplitude: center.positiveRhoAmplitude
      + centered(fractions[7], 0.04),
    negativeRhoAmplitude: center.negativeRhoAmplitude
      + centered(fractions[8], 0.04),
    positivePhaseAmplitude: center.positivePhaseAmplitude
      + centered(fractions[9], 0.08),
    negativePhaseAmplitude: center.negativePhaseAmplitude
      + centered(fractions[10], 0.08),
    positiveHPhaseOffset: wrapPositive(
      center.positiveHPhaseOffset + centered(fractions[11], 0.5)
    ),
    negativeHPhaseOffset: wrapPositive(
      center.negativeHPhaseOffset + centered(fractions[12], 0.5)
    ),
    positiveRhoPhaseOffset: wrapPositive(
      center.positiveRhoPhaseOffset + centered(fractions[13], 0.5)
    ),
    negativeRhoPhaseOffset: wrapPositive(
      center.negativeRhoPhaseOffset + centered(fractions[14], 0.5)
    ),
    radialBreathingRatio: center.radialBreathingRatio,
  };
}

function radialFrequencyParameters(sequenceIndex) {
  const ratioIndex = sequenceIndex - seedOffset;
  return {
    ...continuationCenter.parameters,
    radialBreathingRatio: radialBreathingRatios[ratioIndex],
  };
}

function admittedPrehistory(parameters) {
  const amplitudesAdmitted = [
    parameters.positiveHAmplitude,
    parameters.negativeHAmplitude,
    parameters.positiveRhoAmplitude,
    parameters.negativeRhoAmplitude,
  ].every((value) => Math.abs(value) < 0.3);
  const speedBound = prescribedSpeedBound(parameters);
  return {
    passed: amplitudesAdmitted && speedBound.maximum < 1,
    amplitudesAdmitted,
    speedBound,
  };
}

const candidates = [];
const prefilterRejected = [];
let sequenceIndex = seedOffset;
while (candidates.length < rowsRequested) {
  if (
    stage === "radial-frequency-continuation"
    && sequenceIndex >= seedOffset + radialBreathingRatios.length
  ) {
    throw new Error(
      "a predeclared radial-frequency ratio failed prehistory admission",
    );
  }
  if (sequenceIndex > seedOffset + rowsRequested * 100) {
    throw new Error("unable to fill the requested prehistory-admitted domain rows");
  }
  const parameters = stage === "dual-turn-discovery"
    ? discoveryParameters(sequenceIndex)
    : stage === "radial-frequency-continuation"
    ? radialFrequencyParameters(sequenceIndex)
    : continuationParameters(sequenceIndex);
  const admission = admittedPrehistory(parameters);
  if (admission.passed) {
    candidates.push({ parameters, admission, sequenceIndex });
  } else {
    prefilterRejected.push({ parameters, admission, sequenceIndex });
  }
  sequenceIndex += 1;
}

function turnRecords(packet, coordinate) {
  return ["positive", "negative"].flatMap((sector) =>
    packet.trajectorySummary.turnSequences[sector][coordinate]
      .filter((turn) => Math.min(
        Math.abs(turn.before),
        Math.abs(turn.after),
      ) >= minimumTurnBracketRate)
      .map((turn) => ({ sector, coordinate, ...turn })));
}

function actionRow(action, time, residual, state, section = null) {
  const values = Object.values(residual.componentResiduals)
    .flatMap((sector) => Object.values(sector));
  return {
    action,
    time,
    rms: rms(values),
    maximum: Math.max(...values.map(Math.abs)),
    componentResiduals: residual.componentResiduals,
    winding: residual.nearestPhaseWinding,
    state: compactState(state),
    section,
  };
}

function exactActionRows(packet) {
  if (isContinuation) {
    const crossings = packet.trajectorySummary.initialLevelReturnCrossings
      [sectionSector][sectionCoordinate];
    return crossings.flatMap((crossing) => {
      if (
        crossing.flightTime < minimumFlightTime
        || crossing.maximumAbsoluteSectionExcursionSinceRelease
          < minimumSectionExcursion
      ) return [];
      return Object.entries(crossing.properRotationReturnResidual)
        .flatMap(([action, residual]) => {
          const nonzeroWinding = residual.nearestPhaseWinding.positive !== 0
            || residual.nearestPhaseWinding.negative !== 0;
          if (action === "direct" && !nonzeroWinding) return [];
          return [actionRow(
            action,
            crossing.linearlyInterpolatedTime,
            residual,
            crossing.state,
            {
              sector: sectionSector,
              coordinate: sectionCoordinate,
              direction: crossing.direction,
              bracket: crossing.bracket,
              interpolationFraction: (
                crossing.linearlyInterpolatedTime - crossing.bracket[0]
              ) / (crossing.bracket[1] - crossing.bracket[0]),
              flightTime: crossing.flightTime,
              maximumAbsoluteExcursion:
                crossing.maximumAbsoluteSectionExcursionSinceRelease,
              minimumRequiredExcursion: minimumSectionExcursion,
            },
          )];
        });
    });
  }
  return packet.coordinateFrames
    .filter((frame) => frame.time >= minimumFlightTime)
    .flatMap((frame) => Object.entries(frame.properRotationReturnResidual)
      .flatMap(([action, residual]) => {
        const nonzeroWinding = residual.nearestPhaseWinding.positive !== 0
          || residual.nearestPhaseWinding.negative !== 0;
        if (action === "direct" && !nonzeroWinding) return [];
        return [actionRow(action, frame.time, residual, frame)];
      }));
}

function summarizeCandidate(index, candidate, outDirectory, packet) {
  const { parameters, admission, sequenceIndex: sampleIndex } = candidate;
  const manifest = JSON.parse(fs.readFileSync(
    path.join(outDirectory, "run-manifest.json"),
    "utf8",
  ));
  const censusPath = path.join(outDirectory, "census.jsonl");
  const censusRows = fs.existsSync(censusPath)
    ? fs.readFileSync(censusPath, "utf8").trim().split("\n")
      .filter(Boolean).map((line) => JSON.parse(line))
    : [];
  const frames = packet.coordinateFrames;
  const initial = frames[0];
  const final = frames.at(-1);
  const maximumShapeExcursion = Math.max(...frames.flatMap((frame) =>
    ["positive", "negative"].flatMap((sector) => ["h", "rho"].map(
      (coordinate) => Math.abs(
        frame.sectors[sector][coordinate]
          - initial.sectors[sector][coordinate],
      ),
    ))));
  const maximumLiftedPhaseAdvance = Math.max(...frames.flatMap((frame) =>
    ["positive", "negative"].map((sector) => Math.abs(
      frame.sectors[sector].theta - initial.sectors[sector].theta,
    ))));
  const radialTurns = turnRecords(packet, "radial");
  const cadenceTurns = turnRecords(packet, "phase");
  const pairs = radialTurns.flatMap((radial) => cadenceTurns.map((cadence) => {
    const firstTurnTime = Math.min(
      radial.linearlyInterpolatedTime,
      cadence.linearlyInterpolatedTime,
    );
    const secondTurnTime = Math.max(
      radial.linearlyInterpolatedTime,
      cadence.linearlyInterpolatedTime,
    );
    return {
      radial,
      cadence,
      firstTurnTime,
      secondTurnTime,
      separation: secondTurnTime - firstTurnTime,
      usableContinuationTimeAfterSecondTurn: final.time - secondTurnTime,
    };
  })).filter((pair) => pair.secondTurnTime >= minimumFlightTime)
    .sort((left, right) =>
      left.separation - right.separation
      || right.usableContinuationTimeAfterSecondTurn
        - left.usableContinuationTimeAfterSecondTurn);
  const strongestPair = pairs[0] ?? null;
  const nontrivialExcursion = maximumShapeExcursion >= minimumShapeExcursion
    && maximumLiftedPhaseAdvance >= minimumLiftedPhaseAdvance;
  const dualTurnPassed = strongestPair !== null && nontrivialExcursion;
  const actionRows = exactActionRows(packet).sort(
    (left, right) => left.rms - right.rms,
  );
  const nearestAction = actionRows[0] ?? null;
  const nearestActionFrame = nearestAction === null
    ? null : nearestFrame(frames, nearestAction.time);
  const rootRows = censusRows.map((row) => row.engine).filter(Boolean);
  const maximumRootMultiplicity = rootRows.length === 0 ? null
    : Math.max(...rootRows.map((row) => row.maximumRootMultiplicity));
  const minimumTransmitterFactorMagnitude = rootRows.length === 0 ? null
    : Math.min(...rootRows.map((row) =>
      row.minimumTransmitterFactorMagnitude ?? Infinity));
  const maximumRootTimePressureRatio = rootRows.length === 0 ? null
    : Math.max(...rootRows.map((row) =>
      row.maximumRootTimePressureRatio ?? 0));
  const guardedSubfieldHistory = packet.trajectorySummary.maximumMemberSpeed < 1;
  const turnInventory = Object.fromEntries(
    ["positive", "negative"].map((sector) => [sector, Object.fromEntries(
      ["axial", "radial", "phase"].map((coordinate) => [
        coordinate,
        packet.trajectorySummary.turnSequences[sector][coordinate],
      ]),
    )]),
  );
  const finalPhaseAdvance = Object.fromEntries(
    ["positive", "negative"].map((sector) => [sector,
      final.sectors[sector].theta - initial.sectors[sector].theta]),
  );
  return {
    index,
    sampleIndex,
    parameters,
    prescribedHistoryAdmission: admission,
    outDirectory,
    manifest: {
      runId: manifest.runId,
      status: manifest.status,
      acceptedEndTime: Number(manifest.acceptedEndTime),
      acceptedSteps: manifest.acceptedSteps,
      rejectedSteps: manifest.rejectedSteps,
      framesEmitted: manifest.framesEmitted,
      releaseRootClearance: manifest.releaseRootClearance,
      modelFingerprint: manifest.modelFingerprint,
      generatingSpec: manifest.generatingSpec,
      engineBuildId: manifest.engineBuildId,
    },
    completeStateRecords: {
      release: compactState(initial),
      secondTurn: strongestPair === null ? null : compactState(
        strongestPair.radial.linearlyInterpolatedTime
          >= strongestPair.cadence.linearlyInterpolatedTime
          ? strongestPair.radial.state : strongestPair.cadence.state,
      ),
      nearestExactAction: nearestAction?.state ?? null,
      final: compactState(final),
    },
    dualTurnDiscovery: {
      passed: dualTurnPassed,
      radialTurnCount: radialTurns.length,
      cadenceTurnCount: cadenceTurns.length,
      strongestPair,
      turnInventory,
      nontrivialExcursion: {
        passed: nontrivialExcursion,
        minimumFlightTime,
        minimumShapeExcursion,
        measuredMaximumShapeExcursion: maximumShapeExcursion,
        minimumLiftedPhaseAdvance,
        measuredMaximumLiftedPhaseAdvance: maximumLiftedPhaseAdvance,
        minimumTurnBracketRate,
      },
    },
    returnActionContract: {
      scalarSection: isContinuation ? {
        sector: sectionSector,
        coordinate: sectionCoordinate,
        otherAxialAndRadialRatesRequiredToVanish: false,
      } : null,
      direct: {
        exactProperRotation: "identity",
        modulePermutation: [0, 1, 2, 3],
        labeledHistoryEquivalent: true,
        requiredMarker: "at least one nonzero lifted sector winding",
      },
      reflected: {
        exactProperRotationMatrix: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]],
        modulePermutation: [3, 2, 1, 0],
        phaseAction: {
          positive: { slope: -1, offsetRadians: -Math.PI / 3 },
          negative: { slope: -1, offsetRadians: Math.PI / 3 },
        },
        actionOrder: 2,
        labeledHistoryEquivalent: false,
        quotientHistoryEquivalentUnderDeclaredSamePolarityPermutation: true,
      },
      nearestEligibleAction: nearestAction,
    },
    liftedPhaseRecord: {
      finalAdvance: finalPhaseAdvance,
      finalWindingReal: Object.fromEntries(Object.entries(finalPhaseAdvance)
        .map(([sector, value]) => [sector, value / TWO_PI])),
      nearestExactActionWindingCell: nearestAction?.winding ?? null,
    },
    causalGuard: {
      regime: "guarded-complete-ordinary-root",
      fieldSpeed: 1,
      releaseRootCertificateRows:
        packet.releaseAcceleration?.rootCertificateRows ?? null,
      unresolvedReleaseRootCertificateRows:
        packet.releaseAcceleration?.unresolvedRootCertificateRows ?? null,
      allRecordedAcceptedSnapshotsCertified: manifest.rejectedSteps === 0,
      attemptedContinuationStatus: manifest.status,
      maximumRootMultiplicity,
      maximumRootTimePressureRatio,
      minimumTransmitterFactorMagnitude:
        Number.isFinite(minimumTransmitterFactorMagnitude)
          ? minimumTransmitterFactorMagnitude : null,
      selfHitInventory: guardedSubfieldHistory
        ? "zero nontrivial self-hits by the derived subfield monotonicity guard"
        : "not excluded by the guarded-history certificate",
      transitionInventory: maximumRootMultiplicity === 1
        ? "all recorded accepted snapshots remained on simple single-root rows"
        : "multiple-root or unrecorded transition requires separate inspection",
    },
    spatialAndSpeedGuard: {
      minimumPair: packet.trajectorySummary.minimumResolvedFramePair,
      minimumPairInAcceptedChunks:
        packet.trajectorySummary.minimumPairDistanceInAcceptedChunks,
      maximumMemberSpeed: packet.trajectorySummary.maximumMemberSpeed,
      speedMargin: 1 - packet.trajectorySummary.maximumMemberSpeed,
      guardedSubfieldHistory,
      channelAllocationAtNearestAction: nearestActionFrame === null ? null
        : Object.fromEntries(["positive", "negative"].map((sector) => [
          sector,
          nearestActionFrame.sectors[sector].coordinateSpeedBudget,
        ])),
    },
    provenanceAndLeakage: {
      memberIds: manifest.seeds.map((seed) => seed.pathId),
      memberIdentityRule: "EOM path identities remain labeled throughout; no relabeling is performed by the analyzer",
      seedFamily: manifest.seedFamily,
      generatingSpec: manifest.generatingSpec,
      maximumNormalizedManifoldResidual:
        packet.trajectorySummary.maximumNormalizedManifoldResidual,
      maximumCentroidNorm: packet.trajectorySummary.maximumCentroidNorm,
      maximumDipoleNorm: packet.trajectorySummary.maximumDipoleNorm,
      maximumCurrentAxisOffXFraction:
        packet.trajectorySummary.maximumCurrentAxisOffXFraction,
    },
  };
}

function dualTurnComparator(left, right) {
  const leftResult = left.result;
  const rightResult = right.result;
  const leftPair = leftResult.dualTurnDiscovery.strongestPair;
  const rightPair = rightResult.dualTurnDiscovery.strongestPair;
  return leftPair.separation - rightPair.separation
    || rightPair.usableContinuationTimeAfterSecondTurn
      - leftPair.usableContinuationTimeAfterSecondTurn
    || (rightResult.causalGuard.minimumTransmitterFactorMagnitude ?? -Infinity)
      - (leftResult.causalGuard.minimumTransmitterFactorMagnitude ?? -Infinity)
    || (leftResult.causalGuard.maximumRootTimePressureRatio ?? Infinity)
      - (rightResult.causalGuard.maximumRootTimePressureRatio ?? Infinity)
    || rightResult.spatialAndSpeedGuard.minimumPair.distance
      - leftResult.spatialAndSpeedGuard.minimumPair.distance
    || rightResult.spatialAndSpeedGuard.speedMargin
      - leftResult.spatialAndSpeedGuard.speedMargin
    || leftResult.provenanceAndLeakage.maximumNormalizedManifoldResidual.velocity
      - rightResult.provenanceAndLeakage.maximumNormalizedManifoldResidual.velocity;
}

function returnComparator(left, right) {
  return left.result.returnActionContract.nearestEligibleAction.rms
    - right.result.returnActionContract.nearestEligibleAction.rms
    || dualTurnComparator(left, right);
}

fs.mkdirSync(outRoot, { recursive: true });
const summaryPath = path.join(outRoot, "search-summary.json");
const rows = [];
let nextIndex = 0;
const startedAt = Date.now();

function writeSummary(status) {
  const analyzed = rows.filter((row) => row.status === "analyzed");
  const dualTurnRows = analyzed.filter(
    (row) => row.result.dualTurnDiscovery.passed,
  ).sort(dualTurnComparator);
  const returnRows = dualTurnRows.filter(
    (row) => row.result.returnActionContract.nearestEligibleAction !== null,
  ).sort(returnComparator);
  const baselineRow = stage === "radial-frequency-continuation"
    ? analyzed.find((row) => row.index === 0) ?? null : null;
  const baselineRms = baselineRow?.result.returnActionContract
    .nearestEligibleAction?.rms ?? null;
  const bestRms = returnRows[0]?.result.returnActionContract
    .nearestEligibleAction?.rms ?? null;
  const thresholdRms = baselineRms === null
    ? null : baselineRms * (1 - materialImprovementFraction);
  const summary = {
    schema: "f6c-nonlinear-return-map-search/v3",
    claimGrade:
      "measured-bounded-eom-solver-dual-turn-and-return-search-not-independent-oracle",
    excludedClaims: [
      "retention",
      "stability",
      "clock",
      "energy-closure",
      "particle-identity",
      "generation-identity",
      "electromagnetic-recovery",
      "Lorentz-recovery",
      "global-nonexistence",
    ],
    stage,
    status,
    search: {
      strategy: stage === "radial-frequency-continuation"
        ? "predeclared one-coordinate radial breathing frequency ratio sweep"
        : "deterministic Halton sampling after conservative prehistory admission",
      discoveryDomain: stage === "dual-turn-discovery"
        ? discoveryDomain : null,
      continuationCenterProvenance: continuationCenter?.provenance ?? null,
      continuationCoordinate: stage === "radial-frequency-continuation"
        ? "radialBreathingRatio" : null,
      radialBreathingRatios: stage === "radial-frequency-continuation"
        ? radialBreathingRatios : null,
      rowsRequested,
      rowsFinished: rows.length,
      rowsAnalyzed: analyzed.length,
      concurrency,
      threadsPerCandidate,
      seedOffset,
      lastSequenceIndexConsidered: sequenceIndex - 1,
      prefilterRejectedRows: prefilterRejected.length,
      endTime,
      step,
      minimumStep: step / 4,
      rootTolerance,
      historySegmentStep,
      fieldSpeed: 1,
      candidateWallSeconds,
      maximumPlannedWallSeconds:
        Math.ceil(rowsRequested / concurrency) * candidateWallSeconds,
      scalarSection: isContinuation
        ? {
            sector: sectionSector,
            coordinate: sectionCoordinate,
            minimumExcursion: minimumSectionExcursion,
          } : null,
      dualTurnAcceptance: {
        minimumFlightTime,
        minimumShapeExcursion,
        minimumLiftedPhaseAdvance,
        minimumTurnBracketRate,
      },
      wallSeconds: (Date.now() - startedAt) / 1000,
      stoppingCondition: stage === "dual-turn-discovery"
        ? "all requested prehistory-admitted rows attempted, or a safely interrupted campaign with an advancing summary"
        : stage === "radial-frequency-continuation"
        ? "all predeclared radial breathing ratios attempted; refine only if the best guarded section RMS improves by the declared material fraction"
        : "all requested local rows attempted around the declared certified dual-turn seed",
    },
    outcomeCounts: {
      dualTurnHistories: dualTurnRows.length,
      radialTurnHistories: analyzed.filter(
        (row) => row.result.dualTurnDiscovery.radialTurnCount > 0,
      ).length,
      cadenceTurnHistories: analyzed.filter(
        (row) => row.result.dualTurnDiscovery.cadenceTurnCount > 0,
      ).length,
      radialOnlyHistories: analyzed.filter((row) =>
        row.result.dualTurnDiscovery.radialTurnCount > 0
        && row.result.dualTurnDiscovery.cadenceTurnCount === 0).length,
      cadenceOnlyHistories: analyzed.filter((row) =>
        row.result.dualTurnDiscovery.radialTurnCount === 0
        && row.result.dualTurnDiscovery.cadenceTurnCount > 0).length,
      exactActionSectionCandidates: returnRows.length,
    },
    materialImprovementContract:
      stage === "radial-frequency-continuation" ? {
        baselineRowIndex: 0,
        baselineRms,
        requiredFraction: materialImprovementFraction,
        thresholdRms,
        bestRowIndex: returnRows[0]?.index ?? null,
        bestRms,
        achieved: baselineRms !== null
          && bestRms !== null
          && bestRms <= thresholdRms,
      } : null,
    bestDualTurnRows: dualTurnRows.slice(0, 12),
    bestExactActionRows: returnRows.slice(0, 12),
    prefilterRejected,
    rows,
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  return { summary, dualTurnRows, returnRows };
}

if (hasFlag("dry-run")) {
  console.log(JSON.stringify({
    schema: "f6c-nonlinear-return-map-search-dry-run/v1",
    stage,
    discoveryDomain: stage === "dual-turn-discovery" ? discoveryDomain : null,
    continuationCenterProvenance: continuationCenter?.provenance ?? null,
    continuationCoordinate: stage === "radial-frequency-continuation"
      ? "radialBreathingRatio" : null,
    radialBreathingRatios: stage === "radial-frequency-continuation"
      ? radialBreathingRatios : null,
    materialImprovementFraction,
    candidates,
    prefilterRejected,
  }, null, 2));
}

async function evaluate(index) {
  const candidate = candidates[index];
  const { parameters } = candidate;
  const outDirectory = path.join(
    outRoot,
    `row-${String(index).padStart(3, "0")}`,
  );
  const args = [
    "--seed-family=f6c-balanced-tetrahedral-v1",
    `--f6c-positive-rate=${parameters.positiveRate}`,
    `--f6c-negative-rate=${parameters.negativeRate}`,
    `--f6c-negative-theta=${parameters.negativeTheta}`,
    `--f6c-breathing-rate=${parameters.breathingRate}`,
    `--f6c-radial-breathing-ratio=${parameters.radialBreathingRatio ?? 1}`,
    `--f6c-cycle-phase=${parameters.cyclePhase}`,
    `--f6c-positive-h-amplitude=${parameters.positiveHAmplitude}`,
    `--f6c-negative-h-amplitude=${parameters.negativeHAmplitude}`,
    `--f6c-positive-rho-amplitude=${parameters.positiveRhoAmplitude}`,
    `--f6c-negative-rho-amplitude=${parameters.negativeRhoAmplitude}`,
    `--f6c-positive-phase-amplitude=${parameters.positivePhaseAmplitude}`,
    `--f6c-negative-phase-amplitude=${parameters.negativePhaseAmplitude}`,
    `--f6c-positive-h-phase-offset=${parameters.positiveHPhaseOffset}`,
    `--f6c-negative-h-phase-offset=${parameters.negativeHPhaseOffset}`,
    `--f6c-positive-rho-phase-offset=${parameters.positiveRhoPhaseOffset}`,
    `--f6c-negative-rho-phase-offset=${parameters.negativeRhoPhaseOffset}`,
    `--end-time=${endTime}`,
    `--step=${step}`,
    `--minimum-step=${step / 4}`,
    "--history-depth=8",
    `--history-segment-step=${historySegmentStep}`,
    "--chunk-steps=5",
    "--sample-every=1",
    `--threads=${threadsPerCandidate}`,
    `--root-tolerance=${rootTolerance}`,
    `--out-dir=${outDirectory}`,
    "--record-date=2026-08-24",
    `--generating-spec=F6c-nonlinear-return-map-search-v3-${stage}`,
    "--engine-build-id=local-eom-dev-2026-08-24",
  ];
  const evolved = await run(executable, args, {
    timeoutSeconds: candidateWallSeconds,
  });
  if (!fs.existsSync(path.join(outDirectory, "run-manifest.json"))) {
    return {
      index,
      sampleIndex: candidate.sequenceIndex,
      status: "harness-rejected-before-manifest",
      parameters,
      prescribedHistoryAdmission: candidate.admission,
      exitStatus: evolved.status,
      stderrTail: evolved.stderr.trim().split("\n").slice(-8),
    };
  }
  const manifest = JSON.parse(fs.readFileSync(
    path.join(outDirectory, "run-manifest.json"),
    "utf8",
  ));
  if (Number(manifest.framesEmitted ?? 0) === 0) {
    return {
      index,
      sampleIndex: candidate.sequenceIndex,
      status: "release-root-rejected",
      parameters,
      prescribedHistoryAdmission: candidate.admission,
      harnessExitStatus: evolved.status,
      harnessSignal: evolved.signal,
      manifest: {
        runId: manifest.runId,
        status: manifest.status,
        releaseRootClearance: manifest.releaseRootClearance,
        framesEmitted: manifest.framesEmitted,
      },
      stderrTail: evolved.stderr.trim().split("\n").slice(-8),
    };
  }
  const analyzed = await run(process.execPath, [analyzer, outDirectory]);
  if (analyzed.status !== 0) {
    return {
      index,
      sampleIndex: candidate.sequenceIndex,
      status: "analysis-rejected",
      parameters,
      prescribedHistoryAdmission: candidate.admission,
      exitStatus: analyzed.status,
      stderrTail: analyzed.stderr.trim().split("\n").slice(-8),
    };
  }
  fs.writeFileSync(
    path.join(outDirectory, "analysis.json"),
    `${analyzed.stdout.trim()}\n`,
  );
  return {
    index,
    status: "analyzed",
    harnessExitStatus: evolved.status,
    harnessSignal: evolved.signal,
    timeCapped: evolved.timedOut,
    harnessStderrTail: evolved.stderr.trim().split("\n").slice(-4),
    result: summarizeCandidate(
      index,
      candidate,
      outDirectory,
      JSON.parse(analyzed.stdout),
    ),
  };
}

async function worker() {
  while (nextIndex < candidates.length) {
    const index = nextIndex;
    nextIndex += 1;
    const row = await evaluate(index);
    rows.push(row);
    rows.sort((left, right) => left.index - right.index);
    const { dualTurnRows, returnRows } = writeSummary("running");
    const bestDual = dualTurnRows[0]?.result.dualTurnDiscovery.strongestPair;
    const bestReturn = returnRows[0]?.result.returnActionContract
      .nearestEligibleAction;
    process.stderr.write(
      `heartbeat stage=${stage} finished=${rows.length}/${rowsRequested}`
      + ` row=${index} status=${row.status}`
      + ` dualTurns=${dualTurnRows.length}`
      + ` bestTurnSeparation=${bestDual?.separation ?? "none"}`
      + ` ${isContinuation
        ? "bestSectionRms" : "bestSampledActionRms"}`
      + `=${bestReturn?.rms ?? "none"}`
      + ` wallSeconds=${((Date.now() - startedAt) / 1000).toFixed(1)}\n`,
    );
  }
}

if (!hasFlag("dry-run")) {
  const heartbeat = setInterval(() => {
    process.stderr.write(
      `heartbeat stage=${stage} campaign finished=${rows.length}/${rowsRequested}`
      + ` active=${Math.min(concurrency, rowsRequested - rows.length)}`
      + ` wallSeconds=${((Date.now() - startedAt) / 1000).toFixed(1)}\n`,
    );
  }, 30000);
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  clearInterval(heartbeat);
  const { dualTurnRows, returnRows } = writeSummary("completed");
  console.log(JSON.stringify({
    summaryPath,
    stage,
    rowsFinished: rows.length,
    dualTurnHistories: dualTurnRows.length,
    bestDualTurnRows: dualTurnRows.slice(0, 5),
    bestExactActionRows: returnRows.slice(0, 5),
  }, null, 2));
}

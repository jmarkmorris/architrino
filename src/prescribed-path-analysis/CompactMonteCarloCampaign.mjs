import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";

import {
  evaluateCompleteCycleCandidate,
} from "./CompleteCycleAnalyticalCampaign.mjs";
import {
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  validateB1CompleteCycleProbeProtocol,
} from "./B1CompleteCycleProbeProtocol.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";

export const COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v1";
export const COMPACT_MONTE_CARLO_CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v1";
export const COMPACT_MONTE_CARLO_CALIBRATION_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-resolution-calibration.v1";
export const COMPACT_MONTE_CARLO_SAMPLER_ID =
  "local-reference-neighborhood/sha256-counter-v1";
export const FULL_TAXONOMY_SAMPLER_ID =
  "constraint-preserving-full-taxonomy/sha256-counter-v1";

export const FULL_TAXONOMY_DOMAIN = Object.freeze({
  geometryScale: [0.3, 0.42],
  familyCSpacingScale: [0.65, 0.8],
  relativeRadiusMultiplier: [0.85, 1.15],
  genericAxialFraction: [0.1, 0.9],
  axialDominantFraction: [0.72, 0.98],
  generalCAxialGap: [0.035, 0.075],
  returnPeriodHarmonics: [1, 2, 3],
  ratioBaseHarmonics: [1, 2],
  maximumSourceEnvelopeRadius: 0.99,
  translationMarginFraction: 0.5,
});

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finite(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return number;
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function uniform01(seed, candidateId, sampleOrdinal, coordinateId) {
  const digest = createHash("sha256")
    .update(`${seed}\0${candidateId}\0${sampleOrdinal}\0${coordinateId}`)
    .digest();
  return Number(digest.readBigUInt64BE(0)) / 2 ** 64;
}

function uniformRange(seed, candidateId, sampleOrdinal, coordinateId, range) {
  return range[0] + (range[1] - range[0]) *
    uniform01(seed, candidateId, sampleOrdinal, coordinateId);
}

function choose(seed, candidateId, sampleOrdinal, coordinateId, values) {
  const index = Math.min(
    values.length - 1,
    Math.floor(
      uniform01(seed, candidateId, sampleOrdinal, coordinateId) * values.length,
    ),
  );
  return values[index];
}

function randomSign(seed, candidateId, sampleOrdinal, coordinateId) {
  return choose(seed, candidateId, sampleOrdinal, coordinateId, [-1, 1]);
}

function randomPhase(seed, candidateId, sampleOrdinal, coordinateId) {
  return 2 * Math.PI *
    uniform01(seed, candidateId, sampleOrdinal, coordinateId);
}

function setRadiusDecomposition(binary, radius, axialFraction) {
  binary.radius = radius;
  binary.axialHalfSeparation = radius * axialFraction;
  binary.transverseOrbitRadius =
    radius * Math.sqrt(Math.max(0, 1 - axialFraction * axialFraction));
}

function shuffled(values, seed, candidateId, sampleOrdinal, coordinateId) {
  return values
    .map((value, index) => ({
      value,
      key: uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        `${coordinateId}-${index}`,
      ),
    }))
    .sort((left, right) => left.key - right.key)
    .map((row) => row.value);
}

function vectorNormArray(vector) {
  return Math.hypot(...vector);
}

function addVectorArrays(left, right) {
  return left.map((value, index) => value + right[index]);
}

function conservativeStaticExtent(spec) {
  return Math.max(...spec.braids.flatMap((braid) =>
    braid.binaries.map((binary) =>
      vectorNormArray(addVectorArrays(braid.centerOffset, binary.centerOffset)) +
      binary.radius)));
}

function assignBoundedCommonTranslation({
  spec,
  seed,
  candidateId,
  sampleOrdinal,
}) {
  const targetEnvelope = Math.min(
    spec.sphericalEnvelopeRadius,
    FULL_TAXONOMY_DOMAIN.maximumSourceEnvelopeRadius,
  );
  const availableMargin = Math.max(
    0,
    targetEnvelope - conservativeStaticExtent(spec),
  );
  const maximumAbsoluteTime = Math.max(
    1,
    Math.abs(spec.recordInterval.start),
    Math.abs(spec.recordInterval.end),
  );
  const maximumSpeed =
    FULL_TAXONOMY_DOMAIN.translationMarginFraction *
    availableMargin / maximumAbsoluteTime;
  const cosine = 2 * uniform01(
    seed,
    candidateId,
    sampleOrdinal,
    "translation-direction-cosine",
  ) - 1;
  const azimuth = randomPhase(
    seed,
    candidateId,
    sampleOrdinal,
    "translation-direction-azimuth",
  );
  const sine = Math.sqrt(Math.max(0, 1 - cosine * cosine));
  let direction = [
    sine * Math.cos(azimuth),
    sine * Math.sin(azimuth),
    cosine,
  ];
  if (spec.taxonomy.familyId === "A") {
    const sum = spec.braids[0].frameDefinition.nearRestAxes.reduce(
      (vector, axis) => addVectorArrays(vector, axis),
      [0, 0, 0],
    );
    const norm = vectorNormArray(sum);
    direction = sum.map((value) => value / norm);
  }
  const speed = maximumSpeed * uniform01(
    seed,
    candidateId,
    sampleOrdinal,
    "translation-speed-fraction",
  );
  spec.group.velocity = scaleVector(direction, speed);
  return {
    velocity: [...spec.group.velocity],
    speed,
    maximumSafeSampledSpeed: maximumSpeed,
    sourceEnvelopeRadius: targetEnvelope,
    preTranslationStaticExtent: targetEnvelope - availableMargin,
  };
}

function scaleVector(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function maximumCarrierSpeed(sourceRecord) {
  return Math.max(...sourceRecord.sources.map((source) =>
    Math.hypot(...Object.values(source.trajectory.centerVelocity)) +
      Math.abs(source.trajectory.angularVelocity) *
        Math.hypot(...Object.values(source.trajectory.radiusU))));
}

function structuredEvaluationFailure(error) {
  return {
    code: "drawn-not-evaluated",
    evaluated: false,
    stage: "analytical-evaluation",
    reasonCode:
      typeof error?.code === "string" && error.code.length > 0
        ? error.code
        : "analytical-evaluation-error",
    errorName:
      typeof error?.name === "string" && error.name.length > 0
        ? error.name
        : "Error",
    message:
      typeof error?.message === "string" && error.message.length > 0
        ? error.message
        : String(error),
    details: error?.details == null
      ? null
      : JSON.parse(JSON.stringify(error.details)),
  };
}

export function createCompactCoverageProtocol(rawProtocol) {
  const protocol = structuredClone(rawProtocol);
  protocol.protocolId = `${protocol.protocolId}-compact-coverage-v1`;
  protocol.completeCycle.primary = {
    timeSamples: 12,
    polarOrder: 8,
    azimuthCount: 16,
  };
  protocol.completeCycle.refined = {
    timeSamples: 24,
    polarOrder: 12,
    azimuthCount: 24,
  };
  return validateB1CompleteCycleProbeProtocol(protocol);
}

export function sampleLocalReferenceNeighborhood({
  candidate,
  seed,
  sampleOrdinal,
} = {}) {
  concreteString(seed, "seed");
  positiveInteger(sampleOrdinal + 1, "sampleOrdinal + 1");
  const candidateId = concreteString(
    candidate?.declaration?.candidateId,
    "candidate.declaration.candidateId",
  );
  const sampled = structuredClone(candidate.spec);
  const geometryScale =
    0.35 + 0.1 * uniform01(seed, candidateId, sampleOrdinal, "geometry-scale");
  const spacingScale =
    0.8 + 0.2 * uniform01(seed, candidateId, sampleOrdinal, "spacing-scale");
  const coordinates = {
    geometryScale,
    spacingScale:
      sampled.taxonomy.familyId === "C" ? spacingScale : null,
    familyAFlattening: null,
    braidPhaseOffsets: [],
    fixedCoordinates: {
      groupVelocity: sampled.group.velocity,
      frequencies: sampled.braids.flatMap((braid) =>
        braid.binaries.map((binary) => binary.frequency)),
      circulationSenses: sampled.braids.map((braid) => braid.circulationSense),
      polarityAssignments: sampled.braids.flatMap((braid) =>
        braid.binaries.map((binary) => binary.polarityAssignment)),
    },
  };

  sampled.braids.forEach((braid, braidIndex) => {
    const phaseOffset =
      2 * Math.PI * uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        `braid-${braidIndex}-phase-offset`,
      );
    braid.phaseOffset = phaseOffset;
    coordinates.braidPhaseOffsets.push(phaseOffset);
    if (sampled.taxonomy.familyId === "C") {
      braid.centerOffset = scaleVector(braid.centerOffset, spacingScale);
    }
    if (sampled.taxonomy.familyId === "A") {
      const flattening = uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        "family-a-flattening",
      );
      braid.frameDefinition.flattening = flattening;
      coordinates.familyAFlattening = flattening;
    }
    braid.binaries.forEach((binary) => {
      binary.radius *= geometryScale;
      binary.axialHalfSeparation *= geometryScale;
      binary.transverseOrbitRadius *= geometryScale;
      if (sampled.taxonomy.familyId === "C") {
        binary.centerOffset = scaleVector(binary.centerOffset, spacingScale);
      }
    });
  });

  return {
    spec: validatePrescribedBraidSpec(sampled),
    coordinates,
    samplingDisposition:
      "diagnostic local-neighborhood pipeline and performance sample; " +
      "not full member-degree-of-freedom coverage",
  };
}

export function sampleFullConstraintPreservingTaxonomy({
  candidate,
  seed,
  sampleOrdinal,
} = {}) {
  concreteString(seed, "seed");
  positiveInteger(sampleOrdinal + 1, "sampleOrdinal + 1");
  const candidateId = concreteString(
    candidate?.declaration?.candidateId,
    "candidate.declaration.candidateId",
  );
  const sampled = structuredClone(candidate.spec);
  const familyId = sampled.taxonomy.familyId;
  const memberId = sampled.taxonomy.memberId;
  const componentSpacingMember =
    ["C3", "C4", "C5", "C6"].includes(memberId);
  const geometryScale = uniformRange(
    seed,
    candidateId,
    sampleOrdinal,
    "geometry-scale",
    FULL_TAXONOMY_DOMAIN.geometryScale,
  );
  const spacingScale = componentSpacingMember
    ? uniformRange(
      seed,
      candidateId,
      sampleOrdinal,
      "family-c-spacing-scale",
      FULL_TAXONOMY_DOMAIN.familyCSpacingScale,
    )
    : null;
  const coordinates = {
    domain: FULL_TAXONOMY_DOMAIN,
    geometryScale,
    familyCSpacingScale: spacingScale,
    radii: [],
    axialFractions: [],
    frequencies: [],
    phases: [],
    braidPhaseOffsets: [],
    circulationSenses: [],
    polarityAssignments: [],
    familyAFlattening: null,
    orbitOrder: null,
    translation: null,
  };

  if (componentSpacingMember) {
    sampled.braids.forEach((braid) => {
      braid.centerOffset = scaleVector(braid.centerOffset, spacingScale);
      braid.binaries.forEach((binary) => {
        binary.centerOffset = scaleVector(binary.centerOffset, spacingScale);
      });
    });
  }

  const allBinaries = sampled.braids.flatMap((braid) => braid.binaries);
  const equalRadius =
    ["A1.2", "A2", "A3.2"].includes(memberId);
  const commonRadiusMultiplier = uniformRange(
    seed,
    candidateId,
    sampleOrdinal,
    "common-radius-multiplier",
    FULL_TAXONOMY_DOMAIN.relativeRadiusMultiplier,
  );
  const radiusFor = (binary, braidIndex, binaryIndex) =>
    binary.radius * geometryScale * (equalRadius
      ? commonRadiusMultiplier
      : uniformRange(
        seed,
        candidateId,
        sampleOrdinal,
        `braid-${braidIndex}-binary-${binaryIndex}-radius-multiplier`,
        FULL_TAXONOMY_DOMAIN.relativeRadiusMultiplier,
      ));

  sampled.braids.forEach((braid, braidIndex) => {
    braid.phaseOffset = randomPhase(
      seed,
      candidateId,
      sampleOrdinal,
      `braid-${braidIndex}-phase-offset`,
    );
    coordinates.braidPhaseOffsets.push(braid.phaseOffset);
    if (familyId === "A") {
      const flattening = uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        "family-a-flattening",
      );
      braid.frameDefinition.flattening = flattening;
      coordinates.familyAFlattening = flattening;
    }
    braid.binaries.forEach((binary, binaryIndex) => {
      const radius = radiusFor(binary, braidIndex, binaryIndex);
      let axialFraction;
      if (memberId === "A1" || memberId.startsWith("A1.") ||
          memberId === "B1.3" || memberId === "C5" || memberId === "C6") {
        axialFraction = 0;
      } else if (memberId === "B1.4") {
        axialFraction = 1;
      } else if (memberId === "B1.2") {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `braid-${braidIndex}-binary-${binaryIndex}-axial-fraction`,
          FULL_TAXONOMY_DOMAIN.axialDominantFraction,
        );
      } else if (memberId === "A2") {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          "a2-common-axial-fraction",
          FULL_TAXONOMY_DOMAIN.genericAxialFraction,
        );
      } else if (memberId === "C1" || memberId === "C2") {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `braid-${braidIndex}-binary-${binaryIndex}-axial-fraction`,
          [0.05, 0.2],
        );
      } else {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `braid-${braidIndex}-binary-${binaryIndex}-axial-fraction`,
          FULL_TAXONOMY_DOMAIN.genericAxialFraction,
        );
      }
      setRadiusDecomposition(binary, radius, axialFraction);
      coordinates.radii.push({
        binaryId: binary.binaryId,
        value: radius,
      });
      coordinates.axialFractions.push({
        binaryId: binary.binaryId,
        value: axialFraction,
      });
      binary.polarityAssignment = randomSign(
        seed,
        candidateId,
        sampleOrdinal,
        `braid-${braidIndex}-binary-${binaryIndex}-polarity`,
      );
      coordinates.polarityAssignments.push({
        binaryId: binary.binaryId,
        value: binary.polarityAssignment,
      });
    });
  });

  const setCommonFrequency = (binaries, coordinateId) => {
    const harmonic = choose(
      seed,
      candidateId,
      sampleOrdinal,
      coordinateId,
      FULL_TAXONOMY_DOMAIN.returnPeriodHarmonics,
    );
    binaries.forEach((binary) => {
      binary.frequency = harmonic / sampled.prescribedReturnPeriod;
    });
  };
  if (["A1.1", "A1.2", "A2", "A3.1", "A3.2"].includes(memberId)) {
    setCommonFrequency(allBinaries, "common-frequency-harmonic");
  } else if (memberId === "A1.3" || memberId === "A3.3" ||
      memberId === "A1.4" || memberId === "A3.4") {
    const ratio = memberId.endsWith(".3") ? [4, 2, 1] : [3, 2, 1];
    const baseHarmonic = choose(
      seed,
      candidateId,
      sampleOrdinal,
      "ratio-base-frequency-harmonic",
      FULL_TAXONOMY_DOMAIN.ratioBaseHarmonics,
    );
    allBinaries.forEach((binary, index) => {
      binary.frequency =
        ratio[index] * baseHarmonic / sampled.prescribedReturnPeriod;
    });
  } else if (familyId === "B" ||
      ["C3", "C4", "C5", "C6"].includes(memberId)) {
    sampled.braids.forEach((braid, braidIndex) =>
      setCommonFrequency(
        braid.binaries,
        `braid-${braidIndex}-common-frequency-harmonic`,
      ));
  } else {
    allBinaries.forEach((binary, index) => {
      const harmonic = choose(
        seed,
        candidateId,
        sampleOrdinal,
        `binary-${index}-frequency-harmonic`,
        FULL_TAXONOMY_DOMAIN.returnPeriodHarmonics,
      );
      binary.frequency = harmonic / sampled.prescribedReturnPeriod;
    });
  }

  const fixedPhasePattern =
    ["A1.2", "A2", "A3.2"].includes(memberId);
  allBinaries.forEach((binary, index) => {
    if (!fixedPhasePattern) {
      binary.phase = randomPhase(
        seed,
        candidateId,
        sampleOrdinal,
        `binary-${index}-phase`,
      );
    }
    coordinates.frequencies.push({
      binaryId: binary.binaryId,
      value: binary.frequency,
    });
    coordinates.phases.push({
      binaryId: binary.binaryId,
      value: binary.phase,
    });
  });

  const firstCirculation = randomSign(
    seed,
    candidateId,
    sampleOrdinal,
    "braid-0-circulation",
  );
  sampled.braids[0].circulationSense = firstCirculation;
  if (sampled.braids.length === 2) {
    sampled.braids[1].circulationSense =
      ["C2", "C4", "C6"].includes(memberId)
        ? -firstCirculation
        : firstCirculation;
  }
  coordinates.circulationSenses = sampled.braids.map(
    (braid) => braid.circulationSense,
  );

  if (memberId === "C1" || memberId === "C2") {
    const binaries = sampled.braids.flatMap((braid) => braid.binaries);
    const gaps = Array.from({ length: 11 }, (_, gapIndex) =>
      uniformRange(
        seed,
        candidateId,
        sampleOrdinal,
        `general-c-axial-gap-${gapIndex}`,
        FULL_TAXONOMY_DOMAIN.generalCAxialGap,
      ));
    const positions = [0];
    gaps.forEach((gap) => positions.push(positions.at(-1) + gap));
    const center = (positions[0] + positions.at(-1)) / 2;
    positions.forEach((position, index) => {
      positions[index] = position - center;
    });
    const order = shuffled(
      binaries,
      seed,
      candidateId,
      sampleOrdinal,
      "general-c-orbit-order",
    );
    order.forEach((binary, index) => {
      const lower = positions[2 * index];
      const upper = positions[2 * index + 1];
      const midpoint = (lower + upper) / 2;
      const axialHalfSeparation = (upper - lower) / 2;
      if (!(binary.radius > axialHalfSeparation)) {
        throw new RangeError(
          `general C sampled axial half-separation exceeds ${binary.binaryId} radius.`,
        );
      }
      binary.centerOffset = [0, 0, midpoint];
      setRadiusDecomposition(
        binary,
        binary.radius,
        axialHalfSeparation / binary.radius,
      );
      const coordinate = coordinates.axialFractions.find(
        (row) => row.binaryId === binary.binaryId,
      );
      coordinate.value = binary.axialHalfSeparation / binary.radius;
    });
    sampled.sourceOrder = order.map((binary) => binary.binaryId);
    coordinates.orbitOrder = [...sampled.sourceOrder];
    coordinates.generalCAxialSpacings = gaps;
    coordinates.generalCOrbitCenterPositions = positions;
  } else {
    coordinates.orbitOrder = [...sampled.sourceOrder];
  }

  coordinates.translation = assignBoundedCommonTranslation({
    spec: sampled,
    seed,
    candidateId,
    sampleOrdinal,
  });

  return {
    spec: validatePrescribedBraidSpec(sampled),
    coordinates,
    samplerId: FULL_TAXONOMY_SAMPLER_ID,
    samplingDisposition:
      "diagnostic full declared bounded taxonomy sampler; every draw is " +
      "constraint-preserving but the bounded coordinate measure is not a " +
      "coordinate-free uniform measure over an unbounded family",
  };
}

export function compactCandidateScore(packet) {
  const primary = packet.diagnosticReductions.surface.surface.primary;
  const outerRadius = Math.max(...primary.map((row) => row.radius));
  const outer = primary.find((row) => row.radius === outerRadius);
  const quadrature = packet.convergenceComparisons.surface.quadrature;
  const evaluatedGates = Object.fromEntries(
    Object.entries(packet.gates).filter(([gateId]) =>
      gateId !== "sourceSensitivity"),
  );
  const coveragePassed = Object.values(evaluatedGates).every(Boolean);
  return {
    outerRadius,
    exposures: outer.exposures,
    wakeFlux: outer.wakeFlux,
    quadrature: {
      passed: quadrature.passed,
      maximumChange: quadrature.maximumChange,
      gates: Object.fromEntries(
        Object.entries(quadrature.gates).map(([gateId, gate]) => [
          gateId,
          {
            passed: gate.passed,
            threshold: gate.threshold ?? null,
            maximumChange: gate.maximumChange ?? null,
            identityMatch: gate.identityMatch ?? null,
          },
        ]),
      ),
    },
    gates: {
      evaluated: evaluatedGates,
      skipped: {
        sourceSensitivity:
          "not evaluated in the compact coverage lane",
      },
    },
    status: {
      code: coveragePassed
        ? "compact-coverage-gates-passed"
        : "compact-coverage-gate-failed",
      passed: coveragePassed,
      disposition: "diagnostic-only",
      failedGates: Object.entries(evaluatedGates)
        .filter(([, passed]) => !passed)
        .map(([gateId]) => gateId),
    },
  };
}

export function evaluateCompactMonteCarloCase({
  candidate,
  protocol: rawProtocol,
  seed,
  sampleOrdinal,
  sample = sampleLocalReferenceNeighborhood,
  onProgress = null,
  implementationIdentity = null,
  evaluateCandidate = evaluateCompleteCycleCandidate,
  samplerId = sample === sampleFullConstraintPreservingTaxonomy
    ? FULL_TAXONOMY_SAMPLER_ID
    : COMPACT_MONTE_CARLO_SAMPLER_ID,
} = {}) {
  const caseStarted = performance.now();
  const cpuStarted = process.cpuUsage();
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (protocol.eventEvaluator.fieldSpeed !== 1) {
    throw new Error("compact Monte Carlo evaluation requires fieldSpeed 1.");
  }
  const sampled = sample({ candidate, seed, sampleOrdinal });
  const sampledSpecHash = sha256Canonical(sampled.spec);
  const exactSource = validateExactPrescribedSourceRecord(
    createPrescribedBraidExactSourceRecord(sampled.spec, {
      sourceHash: sampledSpecHash,
      generatingSpec: candidate.declaration.specPath,
    }),
  );
  const carrierSpeed = maximumCarrierSpeed(exactSource);
  const analysisStarted = performance.now();
  let packet = null;
  let evaluationFailure = null;
  try {
    packet = evaluateCandidate({
      candidateId: candidate.declaration.candidateId,
      sourceRecord: exactSource,
      sourceSpec: sampled.spec,
      completeCycleProtocol: protocol,
      includeSensitivity: false,
      evidenceMode: "compact",
      sourceOptions: {
        sourceHash: sampledSpecHash,
        generatingSpec: candidate.declaration.specPath,
      },
      onProgress,
    });
  } catch (error) {
    evaluationFailure = structuredEvaluationFailure(error);
  }
  const analysisFinished = performance.now();
  const score = packet ? compactCandidateScore(packet) : null;
  const evaluationStatus = evaluationFailure ?? {
    code: "evaluated",
    evaluated: true,
    stage: "complete",
    reasonCode: null,
    errorName: null,
    message: null,
    details: null,
  };
  const caseIdentity = {
    schema: COMPACT_MONTE_CARLO_CASE_SCHEMA,
    caseId:
      `${candidate.declaration.candidateId}/sample-${sampleOrdinal}`,
    familyId: candidate.declaration.familyId,
    memberId: candidate.declaration.memberId,
    candidateId: candidate.declaration.candidateId,
    sampleOrdinal,
    sampling: {
      samplerId: sampled.samplerId ?? samplerId,
      seed,
      coordinates: sampled.coordinates,
      disposition: sampled.samplingDisposition,
    },
    exactRerunInstruction: {
      sampledSpec: sampled.spec,
      sampledSpecHash,
      exactSourceHash: sha256Canonical(exactSource),
      protocolHash: sha256Canonical(protocol),
      implementationIdentity,
      evidenceMode: "compact",
      includeSensitivity: false,
    },
    sourceSpeed: {
      maximumCarrierSpeed: carrierSpeed,
      fieldSpeed: protocol.eventEvaluator.fieldSpeed,
      belowFieldSpeed: carrierSpeed < protocol.eventEvaluator.fieldSpeed,
      disposition:
        "diagnostic path-speed relation; event-specific causal-root isolation " +
        "does not require total path speed below fieldSpeed",
    },
    evaluationStatus,
    score,
    scoreHash: score === null ? null : sha256Canonical(score),
    evidenceDisposition:
      "diagnostic-only; raw event packets and independent acceptance were not retained",
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
  };
  const caseHash = sha256Canonical(caseIdentity);
  const finalized = performance.now();
  const cpu = process.cpuUsage(cpuStarted);
  return {
    ...caseIdentity,
    measuredCost: {
      wallSeconds: (finalized - caseStarted) / 1_000,
      sourceAndProtocolSetupSeconds: (analysisStarted - caseStarted) / 1_000,
      analyticalEvaluationSeconds:
        (analysisFinished - analysisStarted) / 1_000,
      scoreAndIdentitySeconds: (finalized - analysisFinished) / 1_000,
      userCpuSeconds: cpu.user / 1_000_000,
      systemCpuSeconds: cpu.system / 1_000_000,
      processLifetimeMaximumRssKilobytes: process.resourceUsage().maxRSS,
      retainedCaseBytes: Buffer.byteLength(JSON.stringify({
        ...caseIdentity,
        caseHash,
      })),
    },
    caseHash,
  };
}

export function buildCompactMonteCarloCampaign({
  candidates,
  protocol: rawProtocol,
  seed,
  casesPerMember,
  sample = sampleLocalReferenceNeighborhood,
  onProgress = null,
  implementationIdentity = null,
  evaluateCandidate = evaluateCompleteCycleCandidate,
  samplerId = sample === sampleFullConstraintPreservingTaxonomy
    ? FULL_TAXONOMY_SAMPLER_ID
    : COMPACT_MONTE_CARLO_SAMPLER_ID,
} = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new TypeError("compact Monte Carlo campaign requires candidates.");
  }
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  const normalizedSeed = concreteString(seed, "seed");
  const perMember = positiveInteger(casesPerMember, "casesPerMember");
  const tasks = candidates.flatMap((candidate) =>
    Array.from({ length: perMember }, (_, sampleOrdinal) => ({
      candidate,
      sampleOrdinal,
      executionKey: sha256Bytes(
        Buffer.from(
          `${normalizedSeed}\0${candidate.declaration.candidateId}\0` +
          `${sampleOrdinal}\0execution-order`,
        ),
      ),
    })));
  tasks.sort((left, right) => left.executionKey.localeCompare(right.executionKey));
  const cases = [];
  const wallStarted = performance.now();
  tasks.forEach((task, executionIndex) => {
    onProgress?.({
      stage: "case-start",
      executionIndex,
      totalCases: tasks.length,
      candidateId: task.candidate.declaration.candidateId,
      memberId: task.candidate.declaration.memberId,
      sampleOrdinal: task.sampleOrdinal,
    });
    const row = evaluateCompactMonteCarloCase({
      candidate: task.candidate,
      protocol,
      seed: normalizedSeed,
      sampleOrdinal: task.sampleOrdinal,
      sample,
      implementationIdentity,
      evaluateCandidate,
      samplerId,
      onProgress(progress) {
        onProgress?.({
          ...progress,
          executionIndex,
          totalCases: tasks.length,
          memberId: task.candidate.declaration.memberId,
          sampleOrdinal: task.sampleOrdinal,
        });
      },
    });
    cases.push({ ...row, executionIndex });
    onProgress?.({
      stage: row.evaluationStatus.evaluated
        ? "case-complete"
        : "case-not-evaluated",
      executionIndex,
      totalCases: tasks.length,
      candidateId: task.candidate.declaration.candidateId,
      memberId: task.candidate.declaration.memberId,
      sampleOrdinal: task.sampleOrdinal,
      wallSeconds: row.measuredCost.wallSeconds,
      reasonCode: row.evaluationStatus.reasonCode,
    });
  });
  cases.sort((left, right) =>
    left.familyId.localeCompare(right.familyId) ||
    left.memberId.localeCompare(right.memberId, undefined, { numeric: true }) ||
    left.sampleOrdinal - right.sampleOrdinal);
  const evaluationSummary = {
    drawnCount: cases.length,
    evaluatedCount: cases.filter(
      (row) => row.evaluationStatus.evaluated,
    ).length,
    notEvaluatedCount: cases.filter(
      (row) => !row.evaluationStatus.evaluated,
    ).length,
    notEvaluatedByReason: Object.fromEntries(
      [...cases.reduce((counts, row) => {
        if (!row.evaluationStatus.evaluated) {
          const reason = row.evaluationStatus.reasonCode;
          counts.set(reason, (counts.get(reason) ?? 0) + 1);
        }
        return counts;
      }, new Map()).entries()].sort(([left], [right]) =>
        left.localeCompare(right)),
    ),
  };
  const campaignIdentity = {
    schema: COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA,
    campaignId:
      `compact-monte-carlo-${sha256Bytes(Buffer.from(normalizedSeed)).slice(0, 12)}`,
    claimGrade: "measured",
    claimBoundary: {
      diagnosticOnly: true,
      independentAcceptancePerformed: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "stability",
        "energy",
        "retention",
        "physical-realization",
        "catalog-acceptance",
      ],
    },
    sampling: {
      samplerId,
      seed: normalizedSeed,
      casesPerMember: perMember,
      memberCount: candidates.length,
      executionOrder:
        "sha256-seeded randomized task order; output rows sorted by member and sample ordinal",
      domainDisposition: samplerId === FULL_TAXONOMY_SAMPLER_ID
        ? "complete declared bounded taxonomy-coordinate coverage; not a " +
          "coordinate-free uniform measure over an unbounded family"
        : "local reference-neighborhood pipeline validation; not complete " +
          "taxonomy-space coverage",
    },
    protocol,
    protocolHash: sha256Canonical(protocol),
    implementationIdentity,
    caseCount: cases.length,
    evaluationSummary,
    cases: cases.map((row) => ({
      caseId: row.caseId,
      caseHash: row.caseHash,
      scoreHash: row.scoreHash,
      executionIndex: row.executionIndex,
    })),
  };
  return {
    ...campaignIdentity,
    wallSeconds: (performance.now() - wallStarted) / 1_000,
    caseRows: cases,
    campaignHash: sha256Canonical(campaignIdentity),
  };
}

export function calibrateCompactCoverageAgainstFullResolution({
  candidates,
  protocol: fullRawProtocol,
  seed,
  casesPerMember,
  sample = sampleFullConstraintPreservingTaxonomy,
  onProgress = null,
  implementationIdentity = null,
  evaluateCandidate = evaluateCompleteCycleCandidate,
} = {}) {
  const fullProtocol = validateB1CompleteCycleProbeProtocol(fullRawProtocol);
  const coverageProtocol = createCompactCoverageProtocol(fullProtocol);
  const common = {
    candidates,
    seed,
    casesPerMember,
    sample,
    implementationIdentity,
    evaluateCandidate,
  };
  const coverage = buildCompactMonteCarloCampaign({
    ...common,
    protocol: coverageProtocol,
    onProgress(progress) {
      onProgress?.({ ...progress, calibrationTier: "coverage" });
    },
  });
  const full = buildCompactMonteCarloCampaign({
    ...common,
    protocol: fullProtocol,
    onProgress(progress) {
      onProgress?.({ ...progress, calibrationTier: "full-resolution" });
    },
  });
  const fullByCaseId = new Map(full.caseRows.map((row) => [row.caseId, row]));
  const comparisons = coverage.caseRows.map((coverageRow) => {
    const fullRow = fullByCaseId.get(coverageRow.caseId);
    if (!fullRow) {
      throw new Error(`full-resolution calibration lacks ${coverageRow.caseId}.`);
    }
    if (coverageRow.exactRerunInstruction.sampledSpecHash !==
        fullRow.exactRerunInstruction.sampledSpecHash) {
      throw new Error(
        `calibration source identity differs for ${coverageRow.caseId}.`,
      );
    }
    const bothEvaluated = coverageRow.evaluationStatus.evaluated &&
      fullRow.evaluationStatus.evaluated;
    const coveragePassed = bothEvaluated
      ? coverageRow.score.status.passed
      : null;
    const fullPassed = bothEvaluated
      ? fullRow.score.status.passed
      : null;
    let classification = "inconclusive-not-evaluated";
    if (bothEvaluated) {
      if (!coveragePassed && fullPassed) {
        classification = "coverage-false-negative";
      } else if (coveragePassed && !fullPassed) {
        classification = "coverage-false-positive";
      } else if (coveragePassed) {
        classification = "both-pass";
      } else {
        classification = "both-reject";
      }
    }
    const gateIds = bothEvaluated
      ? [...new Set([
        ...Object.keys(coverageRow.score.gates.evaluated),
        ...Object.keys(fullRow.score.gates.evaluated),
      ])].sort()
      : [];
    return {
      caseId: coverageRow.caseId,
      familyId: coverageRow.familyId,
      memberId: coverageRow.memberId,
      sampleOrdinal: coverageRow.sampleOrdinal,
      sampledSpecHash:
        coverageRow.exactRerunInstruction.sampledSpecHash,
      coverage: {
        evaluated: coverageRow.evaluationStatus.evaluated,
        reasonCode: coverageRow.evaluationStatus.reasonCode,
        passed: coveragePassed,
        scoreHash: coverageRow.scoreHash,
        wallSeconds: coverageRow.measuredCost.wallSeconds,
      },
      fullResolution: {
        evaluated: fullRow.evaluationStatus.evaluated,
        reasonCode: fullRow.evaluationStatus.reasonCode,
        passed: fullPassed,
        scoreHash: fullRow.scoreHash,
        wallSeconds: fullRow.measuredCost.wallSeconds,
      },
      classification,
      gateComparisons: gateIds.map((gateId) => ({
        gateId,
        coveragePassed:
          coverageRow.score.gates.evaluated[gateId] ?? null,
        fullResolutionPassed:
          fullRow.score.gates.evaluated[gateId] ?? null,
        agrees:
          coverageRow.score.gates.evaluated[gateId] ===
          fullRow.score.gates.evaluated[gateId],
      })),
    };
  });
  const count = (classification) => comparisons.filter(
    (row) => row.classification === classification,
  ).length;
  const summary = {
    drawnCaseCount: comparisons.length,
    conclusiveComparisonCount: comparisons.filter(
      (row) => row.classification !== "inconclusive-not-evaluated",
    ).length,
    inconclusiveCount: count("inconclusive-not-evaluated"),
    falseNegativeCount: count("coverage-false-negative"),
    falsePositiveCount: count("coverage-false-positive"),
    bothPassCount: count("both-pass"),
    bothRejectCount: count("both-reject"),
    observedFalseNegativeRate: null,
    gateDisagreementCount: comparisons.reduce(
      (sum, row) => sum + row.gateComparisons.filter(
        (gate) => !gate.agrees,
      ).length,
      0,
    ),
  };
  summary.observedFalseNegativeRate =
    summary.conclusiveComparisonCount === 0
      ? null
      : summary.falseNegativeCount / summary.conclusiveComparisonCount;
  const identity = {
    schema: COMPACT_MONTE_CARLO_CALIBRATION_SCHEMA,
    claimGrade: "measured",
    claimBoundary: {
      diagnosticResolutionCalibrationOnly: true,
      independentAcceptancePerformed: false,
      rawEventPacketsRetained: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      excludedClaims: [
        "catalog-acceptance",
        "stability",
        "energy",
        "retention",
        "physical-realization",
      ],
    },
    samplerId: sample === sampleFullConstraintPreservingTaxonomy
      ? FULL_TAXONOMY_SAMPLER_ID
      : COMPACT_MONTE_CARLO_SAMPLER_ID,
    seed,
    casesPerMember,
    memberCount: candidates.length,
    coverageCampaignHash: coverage.campaignHash,
    fullResolutionCampaignHash: full.campaignHash,
    coverageProtocolHash: coverage.protocolHash,
    fullResolutionProtocolHash: full.protocolHash,
    summary,
    comparisons,
  };
  return {
    ...identity,
    coverageCampaign: coverage,
    fullResolutionCampaign: full,
    calibrationHash: sha256Canonical(identity),
  };
}

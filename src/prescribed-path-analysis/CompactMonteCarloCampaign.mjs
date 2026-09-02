import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";

import {
  evaluateCompleteCycleCandidate,
} from "./CompleteCycleAnalyticalCampaign.mjs";
import {
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
} from "./CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../../scripts/eom/generate-prescribed-braid-record.mjs";
import {
  applyCircularRelationshipParameters,
  projectCircularRelationshipParameters,
} from "../prescribed-geometry/PrescribedCircularRelationshipParameters.mjs";
import {
  deriveAssemblyScientificIdentity,
} from "../prescribed-geometry/AssemblyScientificIdentity.mjs";

export const COMPACT_MONTE_CARLO_CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v2";
export const COMPACT_MONTE_CARLO_CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v2";
export const COMPACT_MONTE_CARLO_CALIBRATION_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-resolution-calibration.v2";
export const COMPACT_MONTE_CARLO_SAMPLER_ID =
  "local-reference-neighborhood/sha256-counter-v1";
export const FULL_EXACT_CONFIGURATION_SAMPLER_ID =
  "constraint-preserving-exact-configuration/sha256-counter-v2";

export const FULL_EXACT_CONFIGURATION_DOMAIN = Object.freeze({
  geometryScale: [0.3, 0.42],
  coaxialComponentSpacingScale: [0.65, 0.8],
  relativeRadiusMultiplier: [0.85, 1.15],
  genericAxialFraction: [0.1, 0.9],
  axialDominantFraction: [0.72, 0.98],
  coincidentCenterAxialGap: [0.035, 0.075],
  returnPeriodHarmonics: [1, 2, 3],
  ratioBaseHarmonics: [1, 2],
  maximumSourceEnvelopeRadius: 0.99,
  translationMarginFraction: 0.5,
});

const COAXIAL_COMPONENT_SPACING_SOURCE_SLUGS = new Set([
  "coaxial-separated-two-component-circular-co-rotating",
  "coaxial-separated-two-component-circular-counter-rotating",
  "coaxial-separated-two-planar-braid-co-rotating",
  "coaxial-separated-two-planar-braid-counter-rotating",
]);
const EQUAL_RADIUS_SOURCE_SLUGS = new Set([
  "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  "three-axis-circular-phase-compensated-symmetric",
  "three-axis-circular-axially-separated-equal-radius-common-frequency",
]);
const ZERO_AXIAL_FRACTION_SOURCE_SLUGS = new Set([
  "three-axis-circular-coincident-midpoints",
  "three-axis-circular-coincident-midpoints-common-frequency",
  "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  "three-axis-circular-coincident-midpoints-4-2-1-frequency",
  "three-axis-circular-coincident-midpoints-3-2-1-frequency",
  "planar-three-binary-common-center-reference",
  "coaxial-separated-two-planar-braid-co-rotating",
  "coaxial-separated-two-planar-braid-counter-rotating",
]);
const COINCIDENT_CENTER_TWO_COMPONENT_SOURCE_SLUGS = new Set([
  "coincident-center-two-component-circular-co-rotating",
  "coincident-center-two-component-circular-counter-rotating",
]);
const COMMON_FREQUENCY_SOURCE_SLUGS = new Set([
  "three-axis-circular-coincident-midpoints-common-frequency",
  "three-axis-circular-coincident-midpoints-equal-radius-common-frequency",
  "three-axis-circular-phase-compensated-symmetric",
  "three-axis-circular-axially-separated-common-frequency",
  "three-axis-circular-axially-separated-equal-radius-common-frequency",
]);
const FOUR_TWO_ONE_FREQUENCY_SOURCE_SLUGS = new Set([
  "three-axis-circular-coincident-midpoints-4-2-1-frequency",
  "three-axis-circular-axially-separated-4-2-1-frequency",
]);
const THREE_TWO_ONE_FREQUENCY_SOURCE_SLUGS = new Set([
  "three-axis-circular-coincident-midpoints-3-2-1-frequency",
  "three-axis-circular-axially-separated-3-2-1-frequency",
]);
const COMPONENT_COMMON_FREQUENCY_SOURCE_SLUGS = new Set([
  "axial-transverse-three-binary-interior",
  "high-axial-three-binary-interior",
  "planar-three-binary-common-center-reference",
  ...COAXIAL_COMPONENT_SPACING_SOURCE_SLUGS,
]);
const COUNTER_ROTATING_TWO_COMPONENT_SOURCE_SLUGS = new Set([
  "coincident-center-two-component-circular-counter-rotating",
  "coaxial-separated-two-component-circular-counter-rotating",
  "coaxial-separated-two-planar-braid-counter-rotating",
]);

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

function exactConfigurationIdentity(candidate) {
  const assemblyId = concreteString(
    candidate?.declaration?.assemblyId,
    "candidate.declaration.assemblyId",
  );
  const modelRevisionSha256 = concreteString(
    candidate?.declaration?.modelRevisionSha256,
    "candidate.declaration.modelRevisionSha256",
  );
  const sourceSlug = concreteString(
    candidate?.declaration?.sourceSlug,
    "candidate.declaration.sourceSlug",
  );
  if (candidate?.spec?.identity?.assemblyId !== assemblyId ||
      candidate?.spec?.identity?.modelRevisionSha256 !== modelRevisionSha256) {
    throw new TypeError(
      `candidate ${sourceSlug} must bind its exact assemblyId and modelRevisionSha256.`,
    );
  }
  return { assemblyId, modelRevisionSha256, sourceSlug };
}

function bindSampledExactIdentity(rawSpec) {
  const spec = structuredClone(rawSpec);
  const derived = deriveAssemblyScientificIdentity(spec);
  spec.identity = {
    ...spec.identity,
    assemblyId: derived.assemblyId,
    modelRevisionSha256: derived.modelRevisionSha256,
  };
  return validatePrescribedBraidSpec(spec);
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

function setRadiusDecomposition(pair, radius, axialFraction) {
  pair.radius = radius;
  pair.axialHalfSeparation = radius * axialFraction;
  pair.transverseOrbitRadius =
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
  return Math.max(...spec.components.flatMap((component) =>
    component.pairs.map((pair) =>
      vectorNormArray(addVectorArrays(component.centerOffset, pair.centerOffset)) +
      pair.radius)));
}

function assignBoundedCommonTranslation({
  spec,
  seed,
  candidateId,
  sampleOrdinal,
}) {
  const targetEnvelope = Math.min(
    spec.sphericalEnvelopeRadius,
    FULL_EXACT_CONFIGURATION_DOMAIN.maximumSourceEnvelopeRadius,
  );
  const availableMargin = Math.max(
    0,
    targetEnvelope - conservativeStaticExtent(spec),
  );
  const maximumAbsoluteTime = Math.max(
    1,
    Math.abs(spec.history.start),
    Math.abs(spec.history.end),
  );
  const maximumSpeed =
    FULL_EXACT_CONFIGURATION_DOMAIN.translationMarginFraction *
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
  if (spec.components[0].frameDefinition.type === "three-axis-flattening.v1") {
    const sum = spec.components[0].frameDefinition.nearRestAxes.reduce(
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
  spec.assemblyPlacement.velocity = scaleVector(direction, speed);
  return {
    velocity: [...spec.assemblyPlacement.velocity],
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
  return validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(protocol);
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
  const sampled = projectCircularRelationshipParameters(candidate.spec);
  const { sourceSlug } = exactConfigurationIdentity(candidate);
  const hasCoaxialComponentSpacing =
    COAXIAL_COMPONENT_SPACING_SOURCE_SLUGS.has(sourceSlug);
  const geometryScale =
    0.35 + 0.1 * uniform01(seed, candidateId, sampleOrdinal, "geometry-scale");
  const spacingScale =
    0.8 + 0.2 * uniform01(seed, candidateId, sampleOrdinal, "spacing-scale");
  const coordinates = {
    geometryScale,
    coaxialComponentSpacingScale:
      hasCoaxialComponentSpacing ? spacingScale : null,
    threeAxisFrameFlattening: null,
    braidPhaseOffsets: [],
    fixedCoordinates: {
      groupVelocity: sampled.assemblyPlacement.velocity,
      frequencies: sampled.components.flatMap((component) =>
        component.pairs.map((pair) => pair.frequency)),
      circulationSenses: sampled.components.map((component) => component.circulationSense),
      polarityAssignments: sampled.components.flatMap((component) =>
        component.pairs.map((pair) => pair.polarityAssignment)),
    },
  };

  sampled.components.forEach((component, componentIndex) => {
    const phaseOffset =
      2 * Math.PI * uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        `component-${componentIndex}-phase-offset`,
      );
    component.phaseOffset = phaseOffset;
    coordinates.braidPhaseOffsets.push(phaseOffset);
    if (hasCoaxialComponentSpacing) {
      component.centerOffset = scaleVector(component.centerOffset, spacingScale);
    }
    if (component.frameDefinition.type === "three-axis-flattening.v1") {
      const flattening = uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        "three-axis-frame-flattening",
      );
      component.frameDefinition.flattening = flattening;
      coordinates.threeAxisFrameFlattening = flattening;
    }
    component.pairs.forEach((pair) => {
      pair.radius *= geometryScale;
      pair.axialHalfSeparation *= geometryScale;
      pair.transverseOrbitRadius *= geometryScale;
      if (hasCoaxialComponentSpacing) {
        pair.centerOffset = scaleVector(pair.centerOffset, spacingScale);
      }
    });
  });

  return {
    spec: bindSampledExactIdentity(
      applyCircularRelationshipParameters(candidate.spec, sampled),
    ),
    coordinates,
    samplingDisposition:
      "diagnostic local-neighborhood pipeline and performance sample; " +
      "not full exact-configuration coordinate coverage",
  };
}

export function sampleFullConstraintPreservingConfiguration({
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
  const sampled = projectCircularRelationshipParameters(candidate.spec);
  const { sourceSlug } = exactConfigurationIdentity(candidate);
  const componentSpacingMember =
    COAXIAL_COMPONENT_SPACING_SOURCE_SLUGS.has(sourceSlug);
  const geometryScale = uniformRange(
    seed,
    candidateId,
    sampleOrdinal,
    "geometry-scale",
    FULL_EXACT_CONFIGURATION_DOMAIN.geometryScale,
  );
  const spacingScale = componentSpacingMember
    ? uniformRange(
      seed,
      candidateId,
      sampleOrdinal,
      "coaxial-component-spacing-scale",
      FULL_EXACT_CONFIGURATION_DOMAIN.coaxialComponentSpacingScale,
    )
    : null;
  const coordinates = {
    domain: FULL_EXACT_CONFIGURATION_DOMAIN,
    geometryScale,
    coaxialComponentSpacingScale: spacingScale,
    radii: [],
    axialFractions: [],
    frequencies: [],
    phases: [],
    braidPhaseOffsets: [],
    circulationSenses: [],
    polarityAssignments: [],
    threeAxisFrameFlattening: null,
    orbitOrder: null,
    translation: null,
  };

  if (componentSpacingMember) {
    sampled.components.forEach((component) => {
      component.centerOffset = scaleVector(component.centerOffset, spacingScale);
      component.pairs.forEach((pair) => {
        pair.centerOffset = scaleVector(pair.centerOffset, spacingScale);
      });
    });
  }

  const allPairs = sampled.components.flatMap((component) => component.pairs);
  const equalRadius = EQUAL_RADIUS_SOURCE_SLUGS.has(sourceSlug);
  const commonRadiusMultiplier = uniformRange(
    seed,
    candidateId,
    sampleOrdinal,
    "common-radius-multiplier",
    FULL_EXACT_CONFIGURATION_DOMAIN.relativeRadiusMultiplier,
  );
  const radiusFor = (pair, componentIndex, pairIndex) =>
    pair.radius * geometryScale * (equalRadius
      ? commonRadiusMultiplier
      : uniformRange(
        seed,
        candidateId,
        sampleOrdinal,
        `component-${componentIndex}-pair-${pairIndex}-radius-multiplier`,
        FULL_EXACT_CONFIGURATION_DOMAIN.relativeRadiusMultiplier,
      ));

  sampled.components.forEach((component, componentIndex) => {
    component.phaseOffset = randomPhase(
      seed,
      candidateId,
      sampleOrdinal,
      `component-${componentIndex}-phase-offset`,
    );
    coordinates.braidPhaseOffsets.push(component.phaseOffset);
    if (component.frameDefinition.type === "three-axis-flattening.v1") {
      const flattening = uniform01(
        seed,
        candidateId,
        sampleOrdinal,
        "three-axis-frame-flattening",
      );
      component.frameDefinition.flattening = flattening;
      coordinates.threeAxisFrameFlattening = flattening;
    }
    component.pairs.forEach((pair, pairIndex) => {
      const radius = radiusFor(pair, componentIndex, pairIndex);
      let axialFraction;
      if (ZERO_AXIAL_FRACTION_SOURCE_SLUGS.has(sourceSlug)) {
        axialFraction = 0;
      } else if (sourceSlug === "high-axial-three-binary-interior") {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `component-${componentIndex}-pair-${pairIndex}-axial-fraction`,
          FULL_EXACT_CONFIGURATION_DOMAIN.axialDominantFraction,
        );
      } else if (sourceSlug === "three-axis-circular-phase-compensated-symmetric") {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          "phase-compensated-common-axial-fraction",
          FULL_EXACT_CONFIGURATION_DOMAIN.genericAxialFraction,
        );
      } else if (COINCIDENT_CENTER_TWO_COMPONENT_SOURCE_SLUGS.has(sourceSlug)) {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `component-${componentIndex}-pair-${pairIndex}-axial-fraction`,
          [0.05, 0.2],
        );
      } else {
        axialFraction = uniformRange(
          seed,
          candidateId,
          sampleOrdinal,
          `component-${componentIndex}-pair-${pairIndex}-axial-fraction`,
          FULL_EXACT_CONFIGURATION_DOMAIN.genericAxialFraction,
        );
      }
      setRadiusDecomposition(pair, radius, axialFraction);
      coordinates.radii.push({
        pairId: pair.pairId,
        value: radius,
      });
      coordinates.axialFractions.push({
        pairId: pair.pairId,
        value: axialFraction,
      });
      pair.polarityAssignment = randomSign(
        seed,
        candidateId,
        sampleOrdinal,
        `component-${componentIndex}-pair-${pairIndex}-polarity`,
      );
      coordinates.polarityAssignments.push({
        pairId: pair.pairId,
        value: pair.polarityAssignment,
      });
    });
  });

  const setCommonFrequency = (pairs, coordinateId) => {
    const harmonic = choose(
      seed,
      candidateId,
      sampleOrdinal,
      coordinateId,
      FULL_EXACT_CONFIGURATION_DOMAIN.returnPeriodHarmonics,
    );
    pairs.forEach((pair) => {
      pair.frequency = harmonic / sampled.history.returnPeriod;
    });
  };
  if (COMMON_FREQUENCY_SOURCE_SLUGS.has(sourceSlug)) {
    setCommonFrequency(allPairs, "common-frequency-harmonic");
  } else if (FOUR_TWO_ONE_FREQUENCY_SOURCE_SLUGS.has(sourceSlug) ||
      THREE_TWO_ONE_FREQUENCY_SOURCE_SLUGS.has(sourceSlug)) {
    const ratio = FOUR_TWO_ONE_FREQUENCY_SOURCE_SLUGS.has(sourceSlug)
      ? [4, 2, 1]
      : [3, 2, 1];
    const baseHarmonic = choose(
      seed,
      candidateId,
      sampleOrdinal,
      "ratio-base-frequency-harmonic",
      FULL_EXACT_CONFIGURATION_DOMAIN.ratioBaseHarmonics,
    );
    allPairs.forEach((pair, index) => {
      pair.frequency =
        ratio[index] * baseHarmonic / sampled.history.returnPeriod;
    });
  } else if (COMPONENT_COMMON_FREQUENCY_SOURCE_SLUGS.has(sourceSlug)) {
    sampled.components.forEach((component, componentIndex) =>
      setCommonFrequency(
        component.pairs,
        `component-${componentIndex}-common-frequency-harmonic`,
      ));
  } else {
    allPairs.forEach((pair, index) => {
      const harmonic = choose(
        seed,
        candidateId,
        sampleOrdinal,
        `pair-${index}-frequency-harmonic`,
        FULL_EXACT_CONFIGURATION_DOMAIN.returnPeriodHarmonics,
      );
      pair.frequency = harmonic / sampled.history.returnPeriod;
    });
  }

  const fixedPhasePattern = EQUAL_RADIUS_SOURCE_SLUGS.has(sourceSlug);
  allPairs.forEach((pair, index) => {
    if (!fixedPhasePattern) {
      pair.phase = randomPhase(
        seed,
        candidateId,
        sampleOrdinal,
        `pair-${index}-phase`,
      );
    }
    coordinates.frequencies.push({
      pairId: pair.pairId,
      value: pair.frequency,
    });
    coordinates.phases.push({
      pairId: pair.pairId,
      value: pair.phase,
    });
  });

  const firstCirculation = randomSign(
    seed,
    candidateId,
    sampleOrdinal,
    "braid-0-circulation",
  );
  sampled.components[0].circulationSense = firstCirculation;
  if (sampled.components.length === 2) {
    sampled.components[1].circulationSense =
      COUNTER_ROTATING_TWO_COMPONENT_SOURCE_SLUGS.has(sourceSlug)
        ? -firstCirculation
        : firstCirculation;
  }
  coordinates.circulationSenses = sampled.components.map(
    (component) => component.circulationSense,
  );

  if (COINCIDENT_CENTER_TWO_COMPONENT_SOURCE_SLUGS.has(sourceSlug)) {
    const pairs = sampled.components.flatMap((component) => component.pairs);
    const gaps = Array.from({ length: 11 }, (_, gapIndex) =>
      uniformRange(
        seed,
        candidateId,
        sampleOrdinal,
        `general-c-axial-gap-${gapIndex}`,
        FULL_EXACT_CONFIGURATION_DOMAIN.coincidentCenterAxialGap,
      ));
    const positions = [0];
    gaps.forEach((gap) => positions.push(positions.at(-1) + gap));
    const center = (positions[0] + positions.at(-1)) / 2;
    positions.forEach((position, index) => {
      positions[index] = position - center;
    });
    const order = shuffled(
      pairs,
      seed,
      candidateId,
      sampleOrdinal,
      "general-c-orbit-order",
    );
    order.forEach((pair, index) => {
      const lower = positions[2 * index];
      const upper = positions[2 * index + 1];
      const midpoint = (lower + upper) / 2;
      const axialHalfSeparation = (upper - lower) / 2;
      if (!(pair.radius > axialHalfSeparation)) {
        throw new RangeError(
          `coincident-center sampled axial half-separation exceeds ${pair.pairId} radius.`,
        );
      }
      pair.centerOffset = [0, 0, midpoint];
      setRadiusDecomposition(
        pair,
        pair.radius,
        axialHalfSeparation / pair.radius,
      );
      const coordinate = coordinates.axialFractions.find(
        (row) => row.pairId === pair.pairId,
      );
      coordinate.value = pair.axialHalfSeparation / pair.radius;
    });
    sampled.pairOrder = order.map((pair) => pair.pairId);
    coordinates.orbitOrder = [...sampled.pairOrder];
    coordinates.coincidentCenterAxialSpacings = gaps;
    coordinates.coincidentCenterOrbitCenterPositions = positions;
  } else {
    coordinates.orbitOrder = [...sampled.pairOrder];
  }

  coordinates.translation = assignBoundedCommonTranslation({
    spec: sampled,
    seed,
    candidateId,
    sampleOrdinal,
  });

  return {
    spec: bindSampledExactIdentity(
      applyCircularRelationshipParameters(candidate.spec, sampled),
    ),
    coordinates,
    samplerId: FULL_EXACT_CONFIGURATION_SAMPLER_ID,
    samplingDisposition:
      "diagnostic full declared bounded exact-configuration sampler; every draw is " +
      "constraint-preserving but the bounded coordinate measure is not a " +
      "coordinate-free uniform measure over an unbounded configuration space",
  };
}

export function compactCandidateScore(packet) {
  const primary = packet.diagnosticReductions.surface.surface.primary;
  const outerRadius = Math.max(...primary.map((row) => row.radius));
  const outer = primary.find((row) => row.radius === outerRadius);
  const quadrature = packet.convergenceComparisons.surface.quadrature;
  const evaluatedGates = Object.fromEntries(
    Object.entries(packet.gates).filter(([gateId]) =>
      gateId !== "transmitterSensitivity"),
  );
  const coveragePassed = Object.values(evaluatedGates).every(Boolean);
  const primaryMemberResidual =
    packet.diagnosticReductions.internalReceivers?.primary?.reduction
      ?.pointwiseMemberResidualSearchScreen ?? null;
  const refinedMemberResidual =
    packet.diagnosticReductions.internalReceivers?.refined?.reduction
      ?.pointwiseMemberResidualSearchScreen ?? null;
  const primarySummedAcceleration =
    packet.diagnosticReductions.internalReceivers?.primary?.reduction
      ?.pointwiseSummedAccelerationNecessaryCondition ?? null;
  const refinedSummedAcceleration =
    packet.diagnosticReductions.internalReceivers?.refined?.reduction
      ?.pointwiseSummedAccelerationNecessaryCondition ?? null;
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
    pointwiseMemberResidualSearch: {
      status:
        primaryMemberResidual?.status ===
          "evaluated-falsification-and-search-guidance" &&
        refinedMemberResidual?.status ===
          "evaluated-falsification-and-search-guidance"
          ? "eligible-diagnostic-search-score"
          : "inapplicable",
      primary: primaryMemberResidual?.searchGuidance ?? null,
      refined: refinedMemberResidual?.searchGuidance ?? null,
      resolutionComparison:
        packet.convergenceComparisons.pointwiseMemberResidual ?? null,
      ordering:
        "prefer smaller refined full-cycle maximum pointwise member residual, then smaller refined full-cycle RMS; use one half-cycle only for early rejection and never for positive selection",
      evidenceDisposition:
        "diagnostic-only; rerun selected near-zeros with retained raw ledgers, additional time refinement, and independent root-residual checks",
    },
    pointwiseSummedAccelerationAudit: {
      primary: primarySummedAcceleration === null ? null : {
        status: primarySummedAcceleration.status,
        outcome: primarySummedAcceleration.outcome,
        maximumSummedEvaluatedAccelerationNorm:
          primarySummedAcceleration.summary
            ?.maximumSummedEvaluatedAccelerationNorm ?? null,
        maximumSummedEquationResidualNorm:
          primarySummedAcceleration.summary
            ?.maximumSummedEquationResidualNorm ?? null,
      },
      refined: refinedSummedAcceleration === null ? null : {
        status: refinedSummedAcceleration.status,
        outcome: refinedSummedAcceleration.outcome,
        maximumSummedEvaluatedAccelerationNorm:
          refinedSummedAcceleration.summary
            ?.maximumSummedEvaluatedAccelerationNorm ?? null,
        maximumSummedEquationResidualNorm:
          refinedSummedAcceleration.summary
            ?.maximumSummedEquationResidualNorm ?? null,
      },
      interpretation:
        "Compare with the per-member screen to count cases where vector cancellation hides large individual residuals; this audit does not weaken the per-member falsifier.",
    },
    gates: {
      evaluated: evaluatedGates,
      skipped: {
        transmitterSensitivity:
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
  samplerId = sample === sampleFullConstraintPreservingConfiguration
    ? FULL_EXACT_CONFIGURATION_SAMPLER_ID
    : COMPACT_MONTE_CARLO_SAMPLER_ID,
} = {}) {
  const caseStarted = performance.now();
  const cpuStarted = process.cpuUsage();
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(rawProtocol);
  if (protocol.eventEvaluator.fieldSpeed !== 1) {
    throw new Error("compact Monte Carlo evaluation requires fieldSpeed 1.");
  }
  const sampled = sample({ candidate, seed, sampleOrdinal });
  const sampledSpecHash = sha256Canonical(sampled.spec);
  const sampledScientificIdentity = deriveAssemblyScientificIdentity(sampled.spec);
  const exactSource = validateExactPrescribedSourceRecord(
    {
      ...createPrescribedBraidExactSourceRecord(sampled.spec, {
        sourceHash: sampledSpecHash,
        generatingSpec: candidate.declaration.specPath,
      }),
      sourceSlug: candidate.declaration.sourceSlug,
      referenceConfigurationIdentity: {
        assemblyId: candidate.declaration.assemblyId,
        modelRevisionSha256: candidate.declaration.modelRevisionSha256,
      },
      scientificIdentityPreimage: sampledScientificIdentity.canonicalModel,
    },
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
    assemblyId: sampled.spec.identity.assemblyId,
    modelRevisionSha256: sampled.spec.identity.modelRevisionSha256,
    sourceSlug: candidate.declaration.sourceSlug,
    referenceConfigurationIdentity: {
      assemblyId: candidate.declaration.assemblyId,
      modelRevisionSha256: candidate.declaration.modelRevisionSha256,
    },
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
  casesPerConfiguration,
  sample = sampleLocalReferenceNeighborhood,
  onProgress = null,
  implementationIdentity = null,
  evaluateCandidate = evaluateCompleteCycleCandidate,
  samplerId = sample === sampleFullConstraintPreservingConfiguration
    ? FULL_EXACT_CONFIGURATION_SAMPLER_ID
    : COMPACT_MONTE_CARLO_SAMPLER_ID,
} = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new TypeError("compact Monte Carlo campaign requires candidates.");
  }
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(rawProtocol);
  const normalizedSeed = concreteString(seed, "seed");
  const perConfiguration = positiveInteger(casesPerConfiguration, "casesPerConfiguration");
  const tasks = candidates.flatMap((candidate) =>
    Array.from({ length: perConfiguration }, (_, sampleOrdinal) => ({
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
      sourceSlug: task.candidate.declaration.sourceSlug,
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
          sourceSlug: task.candidate.declaration.sourceSlug,
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
      sourceSlug: task.candidate.declaration.sourceSlug,
      sampleOrdinal: task.sampleOrdinal,
      wallSeconds: row.measuredCost.wallSeconds,
      reasonCode: row.evaluationStatus.reasonCode,
    });
  });
  cases.sort((left, right) =>
    left.assemblyId.localeCompare(right.assemblyId) ||
    left.sourceSlug.localeCompare(right.sourceSlug, undefined, { numeric: true }) ||
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
      casesPerConfiguration: perConfiguration,
      configurationCount: candidates.length,
      executionOrder:
        "sha256-seeded randomized task order; output rows sorted by exact configuration and sample ordinal",
      domainDisposition: samplerId === FULL_EXACT_CONFIGURATION_SAMPLER_ID
        ? "complete declared bounded exact-configuration coordinate coverage; " +
          "not a coordinate-free uniform measure over an unbounded configuration space"
        : "local reference-neighborhood pipeline validation; not complete " +
          "exact-configuration coordinate coverage",
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
  casesPerConfiguration,
  sample = sampleFullConstraintPreservingConfiguration,
  onProgress = null,
  implementationIdentity = null,
  evaluateCandidate = evaluateCompleteCycleCandidate,
} = {}) {
  const fullProtocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(fullRawProtocol);
  const coverageProtocol = createCompactCoverageProtocol(fullProtocol);
  const common = {
    candidates,
    seed,
    casesPerConfiguration,
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
      assemblyId: coverageRow.assemblyId,
      modelRevisionSha256: coverageRow.modelRevisionSha256,
      sourceSlug: coverageRow.sourceSlug,
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
    samplerId: sample === sampleFullConstraintPreservingConfiguration
      ? FULL_EXACT_CONFIGURATION_SAMPLER_ID
      : COMPACT_MONTE_CARLO_SAMPLER_ID,
    seed,
    casesPerConfiguration,
    configurationCount: candidates.length,
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

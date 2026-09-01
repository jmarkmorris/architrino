import { createHash } from "node:crypto";

import {
  recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual,
} from "./CoincidentMidpointCommonFrequencyIndependentResidualRecomputation.mjs";

export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-continuous-root-inventory-protocol.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_RESULT_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-continuous-root-inventory-result.v1";
export const COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_SUMMARY_SCHEMA =
  "prescribed-path-analysis/coincident-midpoint-common-frequency-continuous-root-inventory-summary.v1";

const TWO_PI = 2 * Math.PI;
const EXPECTED_RATIO_BOX = Object.freeze({
  alpha1: Object.freeze([7 / 8, 15 / 16]),
  alpha2: Object.freeze([1, 1]),
  alpha3: Object.freeze([17 / 16, 9 / 8]),
});
const EXPECTED_CHI = 9 / 4;
const EXPECTED_PHASES = Object.freeze(["0", "2*pi/3", "4*pi/3"]);
const EXPECTED_BINARY_ROWS = Object.freeze([
  Object.freeze({
    binaryId: "coincident-midpoint-common-frequency-binary-1",
    worldlineIds: Object.freeze([
      "coincident-midpoint-common-frequency-binary-1-endpoint-1",
      "coincident-midpoint-common-frequency-binary-1-endpoint-2",
    ]),
    radiusParameter: "alpha1",
    polarityAssignment: 1,
  }),
  Object.freeze({
    binaryId: "coincident-midpoint-common-frequency-binary-2",
    worldlineIds: Object.freeze([
      "coincident-midpoint-common-frequency-binary-2-endpoint-1",
      "coincident-midpoint-common-frequency-binary-2-endpoint-2",
    ]),
    radiusParameter: "alpha2",
    polarityAssignment: -1,
  }),
  Object.freeze({
    binaryId: "coincident-midpoint-common-frequency-binary-3",
    worldlineIds: Object.freeze([
      "coincident-midpoint-common-frequency-binary-3-endpoint-1",
      "coincident-midpoint-common-frequency-binary-3-endpoint-2",
    ]),
    radiusParameter: "alpha3",
    polarityAssignment: 1,
  }),
]);
const EXPECTED_DISPLAY_SOURCE = Object.freeze({
  path:
    "reference/priorities/braid-program/configurations/" +
    "three-axis-circular-coincident-midpoints-common-frequency.v3.json",
  sha256: "92ddbd4c1e84c6d4e79042e8883331d832b16ab60c47da05c0c892da39a5de4c",
});
const EXPECTED_SCIENTIFIC_IDENTITY = Object.freeze({
  assemblyId: "asm-2a289a6fe32f64922ab71bae973acc80",
  modelRevisionSha256:
    "2a289a6fe32f64922ab71bae973acc80bef8ebc2369329a26822f3f0d7f159d6",
});
const EXPECTED_FRAME_ROWS = Object.freeze([
  Object.freeze({ axis: [1, 0, 0], e1: [0, 1, 0], e2: [0, 0, 1] }),
  Object.freeze({ axis: [0, 1, 0], e1: [0, 0, 1], e2: [1, 0, 0] }),
  Object.freeze({ axis: [0, 0, 1], e1: [1, 0, 0], e2: [0, 1, 0] }),
]);

const floatBuffer = new ArrayBuffer(8);
const floatView = new DataView(floatBuffer);

function nextUp(value) {
  if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) return value;
  if (Object.is(value, -0)) value = 0;
  if (value === 0) return Number.MIN_VALUE;
  floatView.setFloat64(0, value, false);
  let bits = floatView.getBigUint64(0, false);
  bits = value > 0 ? bits + 1n : bits - 1n;
  floatView.setBigUint64(0, bits, false);
  return floatView.getFloat64(0, false);
}

function nextDown(value) {
  if (Number.isNaN(value) || value === Number.NEGATIVE_INFINITY) return value;
  if (Object.is(value, 0)) value = -0;
  if (Object.is(value, -0)) return -Number.MIN_VALUE;
  floatView.setFloat64(0, value, false);
  let bits = floatView.getBigUint64(0, false);
  bits = value > 0 ? bits - 1n : bits + 1n;
  floatView.setBigUint64(0, bits, false);
  return floatView.getFloat64(0, false);
}

function padDown(value, ulps) {
  let padded = value;
  for (let index = 0; index < ulps; index += 1) padded = nextDown(padded);
  return padded;
}

function padUp(value, ulps) {
  let padded = value;
  for (let index = 0; index < ulps; index += 1) padded = nextUp(padded);
  return padded;
}

function interval(lower, upper = lower) {
  if (!Number.isFinite(lower) || !Number.isFinite(upper) || lower > upper) {
    throw new RangeError(`invalid finite interval [${lower}, ${upper}].`);
  }
  return { lower, upper };
}

function outward(lower, upper, ulps) {
  return {
    lower: padDown(lower, ulps),
    upper: padUp(upper, ulps),
  };
}

function addInterval(left, right, ulps) {
  return outward(left.lower + right.lower, left.upper + right.upper, ulps);
}

function subtractInterval(left, right, ulps) {
  return outward(left.lower - right.upper, left.upper - right.lower, ulps);
}

function multiplyInterval(left, right, ulps) {
  const products = [
    left.lower * right.lower,
    left.lower * right.upper,
    left.upper * right.lower,
    left.upper * right.upper,
  ];
  return outward(Math.min(...products), Math.max(...products), ulps);
}

function divideInterval(numerator, denominator, ulps) {
  if (denominator.lower <= 0 && denominator.upper >= 0) {
    throw new RangeError("interval division denominator contains zero.");
  }
  return multiplyInterval(
    numerator,
    outward(1 / denominator.upper, 1 / denominator.lower, ulps),
    ulps,
  );
}

function squareInterval(value, ulps) {
  if (value.lower <= 0 && value.upper >= 0) {
    return outward(0, Math.max(value.lower ** 2, value.upper ** 2), ulps);
  }
  const squares = [value.lower ** 2, value.upper ** 2];
  return outward(Math.min(...squares), Math.max(...squares), ulps);
}

function sqrtInterval(value, ulps) {
  if (value.lower < 0) throw new RangeError("cannot square-root a negative interval.");
  return outward(Math.sqrt(value.lower), Math.sqrt(value.upper), ulps);
}

function intersectInterval(left, right) {
  const lower = Math.max(left.lower, right.lower);
  const upper = Math.min(left.upper, right.upper);
  if (lower > upper) {
    throw new RangeError("interval intersection is empty.");
  }
  return interval(lower, upper);
}

function containsPeriodicPoint(value, origin, period) {
  const first = Math.ceil((value.lower - origin) / period);
  const last = Math.floor((value.upper - origin) / period);
  return first <= last;
}

function sinInterval(value, ulps) {
  if (value.upper - value.lower >= TWO_PI) return interval(-1, 1);
  let lower = Math.min(Math.sin(value.lower), Math.sin(value.upper));
  let upper = Math.max(Math.sin(value.lower), Math.sin(value.upper));
  if (containsPeriodicPoint(value, Math.PI / 2, TWO_PI)) upper = 1;
  if (containsPeriodicPoint(value, -Math.PI / 2, TWO_PI)) lower = -1;
  return outward(lower, upper, ulps);
}

function cosInterval(value, ulps) {
  if (value.upper - value.lower >= TWO_PI) return interval(-1, 1);
  let lower = Math.min(Math.cos(value.lower), Math.cos(value.upper));
  let upper = Math.max(Math.cos(value.lower), Math.cos(value.upper));
  if (containsPeriodicPoint(value, 0, TWO_PI)) upper = 1;
  if (containsPeriodicPoint(value, Math.PI, TWO_PI)) lower = -1;
  return outward(lower, upper, ulps);
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function canonicalCoincidentMidpointCommonFrequencyIntervalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256CoincidentMidpointCommonFrequencyInterval(value) {
  return createHash("sha256")
    .update(canonicalCoincidentMidpointCommonFrequencyIntervalJson(value))
    .digest("hex");
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return number;
}

function exactArray(actual, expected, label) {
  if (!Array.isArray(actual) ||
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} must equal ${JSON.stringify(expected)}.`);
  }
}

function validateFrozenDomain(protocol) {
  const domain = protocol.frozenDomain;
  for (const key of ["alpha1", "alpha2", "alpha3"]) {
    exactArray(domain?.[key], EXPECTED_RATIO_BOX[key], `protocol.frozenDomain.${key}`);
  }
  exactArray(
    domain?.receptionPhase,
    [0, TWO_PI],
    "protocol.frozenDomain.receptionPhase",
  );
  exactArray(
    domain?.dimensionlessDelay,
    [0, EXPECTED_CHI],
    "protocol.frozenDomain.dimensionlessDelay",
  );
  if (domain?.historyReachChi !== EXPECTED_CHI) {
    throw new TypeError(`protocol.frozenDomain.historyReachChi must equal ${EXPECTED_CHI}.`);
  }
  const nearZeroDelayUpper = positiveNumber(
    domain?.nearZeroDelayUpper,
    "protocol.frozenDomain.nearZeroDelayUpper",
  );
  if (!(nearZeroDelayUpper < 1 / 16)) {
    throw new RangeError(
      "protocol.frozenDomain.nearZeroDelayUpper must remain below the frozen minimum locus gap 1/16.",
    );
  }
}

function validateSourceConfiguration(protocol) {
  const sourceConfiguration = protocol.sourceConfiguration;
  if (sourceConfiguration?.scientificIdentity?.assemblyId !==
        EXPECTED_SCIENTIFIC_IDENTITY.assemblyId ||
      sourceConfiguration?.scientificIdentity?.modelRevisionSha256 !==
        EXPECTED_SCIENTIFIC_IDENTITY.modelRevisionSha256) {
    throw new TypeError(
      "protocol source configuration must bind the exact coincident-midpoint common-frequency configuration.",
    );
  }
  if (sourceConfiguration.fieldSpeed !== 1 ||
      sourceConfiguration.commonAngularFrequency !== 1 ||
      sourceConfiguration.commonCirculationSense !== 1) {
    throw new TypeError(
      "coincident-midpoint common-frequency configuration interval inventory requires normalized c_f=1, omega=1, and common circulation +1.",
    );
  }
  exactArray(sourceConfiguration.groupVelocity, [0, 0, 0], "protocol.sourceConfiguration.groupVelocity");
  exactArray(sourceConfiguration.phaseBaseline, EXPECTED_PHASES, "protocol.sourceConfiguration.phaseBaseline");
  if (sourceConfiguration.displaySourceProvenance?.path !== EXPECTED_DISPLAY_SOURCE.path ||
      sourceConfiguration.displaySourceProvenance?.sha256 !== EXPECTED_DISPLAY_SOURCE.sha256) {
    throw new TypeError("protocol source provenance must bind the reviewed coincident-midpoint common-frequency configuration display source.");
  }
  if (!Array.isArray(sourceConfiguration.binaries) || sourceConfiguration.binaries.length !== 3) {
    throw new TypeError("protocol.sourceConfiguration.binaries must contain three binaries.");
  }
  const worldlineIds = new Set();
  sourceConfiguration.binaries.forEach((binary, index) => {
    if (binary.binaryIndex !== index + 1) {
      throw new TypeError(`protocol binary ${index} must preserve binaryIndex ${index + 1}.`);
    }
    if (binary.binaryId !== EXPECTED_BINARY_ROWS[index].binaryId ||
        binary.radiusParameter !== EXPECTED_BINARY_ROWS[index].radiusParameter ||
        binary.polarityAssignment !== EXPECTED_BINARY_ROWS[index].polarityAssignment) {
      throw new TypeError(
        `protocol binary ${index + 1} must preserve its reviewed identity, radius parameter, and polarity assignment.`,
      );
    }
    if (binary.phase !== EXPECTED_PHASES[index]) {
      throw new TypeError(`protocol binary ${index + 1} has the wrong symmetric phase token.`);
    }
    if (!Array.isArray(binary.worldlineIds) || binary.worldlineIds.length !== 2) {
      throw new TypeError(`protocol binary ${index + 1} must name two worldlines.`);
    }
    exactArray(
      binary.worldlineIds,
      EXPECTED_BINARY_ROWS[index].worldlineIds,
      `protocol binary ${index + 1} worldlineIds`,
    );
    binary.worldlineIds.forEach((id) => {
      concreteString(id, `protocol binary ${index + 1} worldline id`);
      if (worldlineIds.has(id)) throw new TypeError(`duplicate worldline id ${id}.`);
      worldlineIds.add(id);
    });
    exactArray(binary.plane?.axis, EXPECTED_FRAME_ROWS[index].axis, `binary ${index + 1} axis`);
    exactArray(binary.plane?.e1, EXPECTED_FRAME_ROWS[index].e1, `binary ${index + 1} e1`);
    exactArray(binary.plane?.e2, EXPECTED_FRAME_ROWS[index].e2, `binary ${index + 1} e2`);
  });
}

export function validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" || Array.isArray(rawProtocol)) {
    throw new TypeError("coincident-midpoint common-frequency configuration interval protocol must be an object.");
  }
  if (rawProtocol.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_PROTOCOL_SCHEMA) {
    throw new TypeError(`coincident-midpoint common-frequency configuration interval protocol requires schema ${COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_PROTOCOL_SCHEMA}.`);
  }
  concreteString(rawProtocol.protocolId, "protocol.protocolId");
  if (rawProtocol.claimGrade !== "diagnostic" ||
      rawProtocol.claimBoundary?.prescribedPathAnalyticsOnly !== true ||
      rawProtocol.claimBoundary?.pathEvolutionInvoked !== false ||
      rawProtocol.claimBoundary?.eomSolverInvoked !== false ||
      rawProtocol.claimBoundary?.diagnosticOnly !== true) {
    throw new TypeError("coincident-midpoint common-frequency configuration interval protocol must preserve its diagnostic-only claim boundary.");
  }
  validateSourceConfiguration(rawProtocol);
  validateFrozenDomain(rawProtocol);
  const policy = rawProtocol.rootPolicy;
  if (policy?.rules !== 9 ||
      policy?.orderedChannelCount !== 36 ||
      policy?.selfChannelCount !== 6 ||
      policy?.sameBinaryPartnerChannelCount !== 6 ||
      policy?.interBinaryChannelCount !== 24) {
    throw new TypeError("coincident-midpoint common-frequency configuration interval protocol must preserve the frozen nine-rule 36-channel map.");
  }
  for (const field of [
    "rootResidualFloor",
    "rootSeparationFloor",
    "rootTransversalityFloor",
    "independentResidualFloor",
    "pointRootTolerance",
  ]) {
    positiveNumber(policy?.[field], `protocol.rootPolicy.${field}`);
  }
  positiveInteger(policy?.pointRootIterations, "protocol.rootPolicy.pointRootIterations");
  positiveInteger(policy?.intervalPaddingUlps, "protocol.rootPolicy.intervalPaddingUlps");
  const partition = rawProtocol.partition;
  for (const field of [
    "initialRatioSubdivisions",
    "initialReceptionPhaseSubdivisions",
    "maximumSubdivisionDepth",
    "maximumCellsPerChannel",
    "maximumCellsPerPacket",
    "maximumSummaryUnresolvedPartitions",
  ]) {
    positiveInteger(partition?.[field], `protocol.partition.${field}`);
  }
  for (const field of [
    "minimumAlphaWidth",
    "minimumReceptionPhaseWidth",
    "minimumDelayWidth",
  ]) {
    positiveNumber(partition?.[field], `protocol.partition.${field}`);
  }
  if (partition?.boundaryOwnership?.ratio !==
        "left-closed-right-open/internal; global-upper-bound-included.v1" ||
      partition?.boundaryOwnership?.receptionPhase !==
        "left-closed-right-open; two-pi-identified-with-zero.v1" ||
      partition?.boundaryOwnership?.dimensionlessDelay !==
        "left-open-right-closed/internal; near-zero-and-chi-strata-declared-separately.v1") {
    throw new TypeError("coincident-midpoint common-frequency configuration interval protocol requires explicit partition-boundary ownership.");
  }
  if (rawProtocol.foldSchema?.unresolvedDisposition !== "drawn-not-evaluated" ||
      rawProtocol.foldSchema?.score !== null) {
    throw new TypeError("coincident-midpoint common-frequency configuration fold schema must fail closed with null score.");
  }
  return structuredClone(rawProtocol);
}

function phaseFromToken(token) {
  if (token === "0") return 0;
  if (token === "2*pi/3") return 2 * Math.PI / 3;
  if (token === "4*pi/3") return 4 * Math.PI / 3;
  throw new TypeError(`unsupported phase token ${token}.`);
}

function buildWorldlines(protocol) {
  return protocol.sourceConfiguration.binaries.flatMap((binary) =>
    binary.worldlineIds.map((id, endpointIndex) => ({
      id,
      binaryIndex: binary.binaryIndex,
      binaryId: binary.binaryId,
      endpointIndex,
      endpointNumber: endpointIndex + 1,
      endpointSign: endpointIndex === 0 ? 1 : -1,
      polarity:
        (endpointIndex === 0 ? 1 : -1) * binary.polarityAssignment,
      radiusParameter: binary.radiusParameter,
      phase: phaseFromToken(binary.phase),
      plane: structuredClone(binary.plane),
    })));
}

function channelKind(receiver, transmitter) {
  if (receiver.id === transmitter.id) return "same-transmitter-self";
  if (receiver.binaryIndex === transmitter.binaryIndex) {
    return "same-binary-opposite-endpoint";
  }
  return "inter-binary";
}

export function buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(rawProtocol) {
  const protocol = validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawProtocol);
  const worldlines = buildWorldlines(protocol);
  const channels = [];
  for (const receiver of worldlines) {
    for (const transmitter of worldlines) {
      channels.push({
        channelId: `${receiver.id}<-${transmitter.id}`,
        receiver,
        transmitter,
        kind: channelKind(receiver, transmitter),
      });
    }
  }
  return channels;
}

function radiusIntervalFor(worldline, cell) {
  if (worldline.radiusParameter === "alpha1") return cell.alpha1;
  if (worldline.radiusParameter === "alpha2") return interval(1);
  if (worldline.radiusParameter === "alpha3") return cell.alpha3;
  throw new TypeError(`unsupported radius parameter ${worldline.radiusParameter}.`);
}

function analyticSameBinaryEnclosures(channel, cell, ulps) {
  const radius = radiusIntervalFor(channel.receiver, cell);
  const halfDelay = multiplyInterval(cell.delay, interval(0.5), ulps);
  if (channel.kind === "same-transmitter-self") {
    const distance = multiplyInterval(
      multiplyInterval(interval(2), radius, ulps),
      sinInterval(halfDelay, ulps),
      ulps,
    );
    const residual = subtractInterval(distance, cell.delay, ulps);
    const derivative = subtractInterval(
      multiplyInterval(radius, cosInterval(halfDelay, ulps), ulps),
      interval(1),
      ulps,
    );
    return { residual, derivative, distance };
  }
  const distance = multiplyInterval(
    multiplyInterval(interval(2), radius, ulps),
    cosInterval(halfDelay, ulps),
    ulps,
  );
  const residual = subtractInterval(distance, cell.delay, ulps);
  const derivative = subtractInterval(
    multiplyInterval(
      interval(-1),
      multiplyInterval(radius, sinInterval(halfDelay, ulps), ulps),
      ulps,
    ),
    interval(1),
    ulps,
  );
  return { residual, derivative, distance };
}

function exactVectorDot(left, right) {
  return left.reduce(
    (sum, component, index) => sum + component * right[index],
    0,
  );
}

function interBinarySharedCoordinateMode(channel) {
  const receiver = channel.receiver.plane;
  const transmitter = channel.transmitter.plane;
  const coefficients = {
    cosineCosine: exactVectorDot(receiver.e1, transmitter.e1),
    cosineSine: exactVectorDot(receiver.e1, transmitter.e2),
    sineCosine: exactVectorDot(receiver.e2, transmitter.e1),
    sineSine: exactVectorDot(receiver.e2, transmitter.e2),
  };
  const nonzero = Object.entries(coefficients).filter(([, value]) => value !== 0);
  if (nonzero.length !== 1 || nonzero[0][1] !== 1 ||
      !["cosineSine", "sineCosine"].includes(nonzero[0][0])) {
    throw new TypeError(
      `unsupported inter-binary frame relation for ${channel.channelId}.`,
    );
  }
  return nonzero[0][0];
}

function analyticInterBinaryEnclosures(channel, cell, ulps) {
  const receiverRadius = radiusIntervalFor(channel.receiver, cell);
  const transmitterRadius = radiusIntervalFor(channel.transmitter, cell);
  const phaseSum = addInterval(
    subtractInterval(
      multiplyInterval(interval(2), cell.theta, ulps),
      cell.delay,
      ulps,
    ),
    interval(channel.receiver.phase + channel.transmitter.phase),
    ulps,
  );
  const phaseDifference = addInterval(
    cell.delay,
    interval(channel.receiver.phase - channel.transmitter.phase),
    ulps,
  );
  const sineSum = sinInterval(phaseSum, ulps);
  const sineDifference = sinInterval(phaseDifference, ulps);
  const cosineSum = cosInterval(phaseSum, ulps);
  const cosineDifference = cosInterval(phaseDifference, ulps);
  const half = interval(0.5);
  const mode = interBinarySharedCoordinateMode(channel);
  const unsignedDot = mode === "sineCosine"
    ? multiplyInterval(
      half,
      addInterval(sineSum, sineDifference, ulps),
      ulps,
    )
    : multiplyInterval(
      half,
      subtractInterval(sineSum, sineDifference, ulps),
      ulps,
    );
  const unsignedDotDerivative = mode === "sineCosine"
    ? multiplyInterval(
      half,
      addInterval(
        multiplyInterval(interval(-1), cosineSum, ulps),
        cosineDifference,
        ulps,
      ),
      ulps,
    )
    : multiplyInterval(
      half,
      subtractInterval(
        multiplyInterval(interval(-1), cosineSum, ulps),
        cosineDifference,
        ulps,
      ),
      ulps,
    );
  const endpointProduct =
    channel.receiver.endpointSign * channel.transmitter.endpointSign;
  const dot = endpointProduct === 1
    ? intersectInterval(unsignedDot, interval(-1, 1))
    : multiplyInterval(
      interval(-1),
      intersectInterval(unsignedDot, interval(-1, 1)),
      ulps,
    );
  const dotDerivative = endpointProduct === 1
    ? intersectInterval(unsignedDotDerivative, interval(-1, 1))
    : multiplyInterval(
      interval(-1),
      intersectInterval(unsignedDotDerivative, interval(-1, 1)),
      ulps,
    );
  const radiusGap = subtractInterval(receiverRadius, transmitterRadius, ulps);
  const radiusProduct = multiplyInterval(
    receiverRadius,
    transmitterRadius,
    ulps,
  );
  const distanceSquared = addInterval(
    squareInterval(radiusGap, ulps),
    multiplyInterval(
      multiplyInterval(interval(2), radiusProduct, ulps),
      subtractInterval(interval(1), dot, ulps),
      ulps,
    ),
    ulps,
  );
  const distance = sqrtInterval(distanceSquared, ulps);
  const residual = subtractInterval(distance, cell.delay, ulps);
  const squaredResidual = subtractInterval(
    distanceSquared,
    squareInterval(cell.delay, ulps),
    ulps,
  );
  const squaredDelayDerivative = subtractInterval(
    multiplyInterval(
      interval(-2),
      multiplyInterval(radiusProduct, dotDerivative, ulps),
      ulps,
    ),
    multiplyInterval(interval(2), cell.delay, ulps),
    ulps,
  );
  const derivative = subtractInterval(
    divideInterval(
      multiplyInterval(
        interval(-1),
        multiplyInterval(radiusProduct, dotDerivative, ulps),
        ulps,
      ),
      distance,
      ulps,
    ),
    interval(1),
    ulps,
  );
  return {
    residual,
    derivative,
    distance,
    squaredResidual,
    squaredDelayDerivative,
  };
}

function enclosures(channel, cell, ulps) {
  if (channel.kind === "inter-binary") {
    return analyticInterBinaryEnclosures(channel, cell, ulps);
  }
  return analyticSameBinaryEnclosures(channel, cell, ulps);
}

function declaredBoxInterval(value, label) {
  if (!Array.isArray(value) || value.length !== 2) {
    throw new TypeError(`${label} must be a [lower, upper] interval.`);
  }
  return interval(
    finiteNumber(value[0], `${label}[0]`),
    finiteNumber(value[1], `${label}[1]`),
  );
}

export function createCoincidentMidpointCommonFrequencyInterBinaryRootFoldEvaluator(rawProtocol) {
  const protocol = validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawProtocol);
  const channels = buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(protocol)
    .filter((channel) => channel.kind === "inter-binary");
  const channelById = new Map(channels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const ulps = protocol.rootPolicy.intervalPaddingUlps;
  return Object.freeze({
    protocolHash: sha256CoincidentMidpointCommonFrequencyInterval(rawProtocol),
    channelIds: Object.freeze(channels.map((channel) => channel.channelId)),
    evaluate({
      channelId,
      alpha1,
      alpha3,
      receptionPhase,
      dimensionlessDelay,
    }) {
      const channel = channelById.get(channelId);
      if (!channel) {
        throw new TypeError(`unknown coincident-midpoint common-frequency configuration inter-binary channel ${channelId}.`);
      }
      const cell = {
        alpha1: declaredBoxInterval(alpha1, "alpha1"),
        alpha3: declaredBoxInterval(alpha3, "alpha3"),
        theta: declaredBoxInterval(receptionPhase, "receptionPhase"),
        delay: declaredBoxInterval(dimensionlessDelay, "dimensionlessDelay"),
        depth: 0,
      };
      const enclosure = analyticInterBinaryEnclosures(channel, cell, ulps);
      return {
        channelId,
        squaredResidualEnclosure: intervalRecord(enclosure.squaredResidual),
        squaredDelayDerivativeEnclosure:
          intervalRecord(enclosure.squaredDelayDerivative),
        causalResidualEnclosure: intervalRecord(enclosure.residual),
        delayDerivativeEnclosure: intervalRecord(enclosure.derivative),
        distanceEnclosure: intervalRecord(enclosure.distance),
      };
    },
  });
}

function analyticEmissionFixedProjectionEnclosures(channel, cell, ulps) {
  const receiverRadius = radiusIntervalFor(channel.receiver, cell);
  const transmitterRadius = radiusIntervalFor(channel.transmitter, cell);
  const receiverAngle = addInterval(
    addInterval(cell.epsilon, cell.delay, ulps),
    interval(channel.receiver.phase),
    ulps,
  );
  const transmitterAngle = addInterval(
    cell.epsilon,
    interval(channel.transmitter.phase),
    ulps,
  );
  const receiverSine = sinInterval(receiverAngle, ulps);
  const receiverCosine = cosInterval(receiverAngle, ulps);
  const transmitterSine = sinInterval(transmitterAngle, ulps);
  const transmitterCosine = cosInterval(transmitterAngle, ulps);
  const mode = interBinarySharedCoordinateMode(channel);
  const unsignedDot = mode === "sineCosine"
    ? multiplyInterval(receiverSine, transmitterCosine, ulps)
    : multiplyInterval(receiverCosine, transmitterSine, ulps);
  const unsignedReceptionDelayDerivative = mode === "sineCosine"
    ? multiplyInterval(receiverSine, transmitterSine, ulps)
    : multiplyInterval(
      interval(-1),
      multiplyInterval(receiverCosine, transmitterCosine, ulps),
      ulps,
    );
  const unsignedEmissionDelayDerivative = mode === "sineCosine"
    ? multiplyInterval(receiverCosine, transmitterCosine, ulps)
    : multiplyInterval(
      interval(-1),
      multiplyInterval(receiverSine, transmitterSine, ulps),
      ulps,
    );
  const endpointProduct =
    channel.receiver.endpointSign * channel.transmitter.endpointSign;
  const signed = (value) => endpointProduct === 1
    ? value
    : multiplyInterval(interval(-1), value, ulps);
  const dot = intersectInterval(signed(unsignedDot), interval(-1, 1));
  const receptionDotDerivative = intersectInterval(
    signed(unsignedReceptionDelayDerivative),
    interval(-1, 1),
  );
  const emissionDotDerivative = intersectInterval(
    signed(unsignedEmissionDelayDerivative),
    interval(-1, 1),
  );
  const radiusGap = subtractInterval(receiverRadius, transmitterRadius, ulps);
  const radiusProduct = multiplyInterval(
    receiverRadius,
    transmitterRadius,
    ulps,
  );
  const distanceSquared = addInterval(
    squareInterval(radiusGap, ulps),
    multiplyInterval(
      multiplyInterval(interval(2), radiusProduct, ulps),
      subtractInterval(interval(1), dot, ulps),
      ulps,
    ),
    ulps,
  );
  const distance = sqrtInterval(distanceSquared, ulps);
  const causalResidual = subtractInterval(distance, cell.delay, ulps);
  const squaredResidual = subtractInterval(
    distanceSquared,
    squareInterval(cell.delay, ulps),
    ulps,
  );
  const squaredDerivative = (dotDerivative) => subtractInterval(
    multiplyInterval(
      interval(-2),
      multiplyInterval(radiusProduct, dotDerivative, ulps),
      ulps,
    ),
    multiplyInterval(interval(2), cell.delay, ulps),
    ulps,
  );
  return {
    causalResidual,
    squaredResidual,
    receptionSquaredDelayDerivative:
      squaredDerivative(receptionDotDerivative),
    emissionSquaredDelayDerivative:
      squaredDerivative(emissionDotDerivative),
  };
}

export function createCoincidentMidpointCommonFrequencyEmissionFixedProjectionEvaluator(rawProtocol) {
  const protocol = validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawProtocol);
  const channels = buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(protocol)
    .filter((channel) => channel.kind === "inter-binary");
  const channelById = new Map(channels.map((channel) => [
    channel.channelId,
    channel,
  ]));
  const ulps = protocol.rootPolicy.intervalPaddingUlps;
  return Object.freeze({
    protocolHash: sha256CoincidentMidpointCommonFrequencyInterval(rawProtocol),
    channelIds: Object.freeze(channels.map((channel) => channel.channelId)),
    evaluate({
      channelId,
      alpha1,
      alpha3,
      emissionPhase,
      dimensionlessDelay,
    }) {
      const channel = channelById.get(channelId);
      if (!channel) {
        throw new TypeError(`unknown coincident-midpoint common-frequency configuration inter-binary channel ${channelId}.`);
      }
      const cell = {
        alpha1: declaredBoxInterval(alpha1, "alpha1"),
        alpha3: declaredBoxInterval(alpha3, "alpha3"),
        epsilon: declaredBoxInterval(emissionPhase, "emissionPhase"),
        delay: declaredBoxInterval(
          dimensionlessDelay,
          "dimensionlessDelay",
        ),
      };
      const enclosure = analyticEmissionFixedProjectionEnclosures(
        channel,
        cell,
        ulps,
      );
      return {
        channelId,
        squaredResidualEnclosure:
          intervalRecord(enclosure.squaredResidual),
        causalResidualEnclosure:
          intervalRecord(enclosure.causalResidual),
        receptionSquaredDelayDerivativeEnclosure:
          intervalRecord(enclosure.receptionSquaredDelayDerivative),
        emissionSquaredDelayDerivativeEnclosure:
          intervalRecord(enclosure.emissionSquaredDelayDerivative),
      };
    },
  });
}

function endpointInversionSymmetryKey(channel) {
  if (channel.kind !== "inter-binary") return null;
  return [
    channel.receiver.binaryIndex,
    channel.transmitter.binaryIndex,
    channel.receiver.endpointSign * channel.transmitter.endpointSign,
  ].join(":");
}

function cloneChannelResultByEndpointInversion(representative, channel) {
  const cloneRow = (row) => ({
    ...structuredClone(row),
    channelId: channel.channelId,
  });
  return {
    channel,
    status: representative.status,
    ledger: representative.ledger.map(cloneRow),
    unresolved: representative.unresolved.map(cloneRow),
    counts: {
      ...representative.counts,
      evaluatedCells: 0,
      symmetryReusedCells: representative.counts.evaluatedCells,
    },
    symmetry: {
      role: "exact-endpoint-inversion-reuse",
      representativeChannelId: representative.channel.channelId,
      key: endpointInversionSymmetryKey(channel),
      exactReason:
        "the circular distance and delay derivative depend on endpoint signs " +
        "only through their product",
    },
  };
}

function certifyChannelWithSymmetry(
  channel,
  protocol,
  packetBudget,
  representatives,
) {
  const key = endpointInversionSymmetryKey(channel);
  if (key !== null && representatives.has(key)) {
    return cloneChannelResultByEndpointInversion(
      representatives.get(key),
      channel,
    );
  }
  const result = certifyChannel(channel, protocol, packetBudget);
  result.counts.symmetryReusedCells = 0;
  if (key !== null) {
    representatives.set(key, result);
    result.symmetry = {
      role: "evaluated-representative",
      representativeChannelId: channel.channelId,
      key,
    };
  }
  return result;
}

function midpoint(value) {
  return (value.lower + value.upper) / 2;
}

function pointRadius(worldline, alpha1, alpha3) {
  if (worldline.radiusParameter === "alpha1") return alpha1;
  if (worldline.radiusParameter === "alpha2") return 1;
  return alpha3;
}

function pointCoordinates(worldline, alpha1, alpha3, commonPhase) {
  const radius = pointRadius(worldline, alpha1, alpha3);
  const angle = commonPhase + worldline.phase;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return worldline.plane.e1.map((component, index) =>
    worldline.endpointSign * radius * (
      component * cosine +
      worldline.plane.e2[index] * sine
    ));
}

function pointResidual(channel, alpha1, alpha3, theta, delay) {
  const receiver = pointCoordinates(channel.receiver, alpha1, alpha3, theta);
  const transmitter = pointCoordinates(
    channel.transmitter,
    alpha1,
    alpha3,
    theta - delay,
  );
  const distance = Math.sqrt(receiver.reduce((sum, component, index) => {
    const difference = component - transmitter[index];
    return sum + difference * difference;
  }, 0));
  return distance - delay;
}

function pointDelayDerivative(channel, alpha1, alpha3, theta, delay) {
  const step = 2 ** -24 * Math.max(1, Math.abs(delay));
  const lower = Math.max(Number.MIN_VALUE, delay - step);
  const upper = delay + step;
  return (
    pointResidual(channel, alpha1, alpha3, theta, upper) -
    pointResidual(channel, alpha1, alpha3, theta, lower)
  ) / (upper - lower);
}

function refinePointRoot(channel, cell, protocol) {
  const alpha1 = midpoint(cell.alpha1);
  const alpha3 = midpoint(cell.alpha3);
  const theta = midpoint(cell.theta);
  let lower = cell.delay.lower;
  let upper = cell.delay.upper;
  let lowerResidual = pointResidual(channel, alpha1, alpha3, theta, lower);
  let upperResidual = pointResidual(channel, alpha1, alpha3, theta, upper);
  if (Math.abs(lowerResidual) <= protocol.rootPolicy.pointRootTolerance) {
    upper = lower;
  } else if (Math.abs(upperResidual) <= protocol.rootPolicy.pointRootTolerance) {
    lower = upper;
  } else if (lowerResidual * upperResidual > 0) {
    return null;
  } else {
    for (let iteration = 0;
      iteration < protocol.rootPolicy.pointRootIterations;
      iteration += 1) {
      const middle = (lower + upper) / 2;
      const middleResidual = pointResidual(channel, alpha1, alpha3, theta, middle);
      if (Math.abs(middleResidual) <= protocol.rootPolicy.pointRootTolerance) {
        lower = middle;
        upper = middle;
        break;
      }
      if (lowerResidual * middleResidual <= 0) {
        upper = middle;
        upperResidual = middleResidual;
      } else {
        lower = middle;
        lowerResidual = middleResidual;
      }
    }
  }
  const delay = (lower + upper) / 2;
  const primaryResidual = pointResidual(channel, alpha1, alpha3, theta, delay);
  const derivative = pointDelayDerivative(channel, alpha1, alpha3, theta, delay);
  const independent = recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual({
    protocol,
    receiver: channel.receiver,
    transmitter: channel.transmitter,
    alpha1,
    alpha3,
    receptionPhase: theta,
    delay,
  });
  return {
    alpha1,
    alpha3,
    receptionPhase: theta,
    delay,
    primaryResidual,
    delayDerivative: derivative,
    independent,
  };
}

function intervalRecord(value) {
  return [value.lower, value.upper];
}

function parameterBoxRecord(cell) {
  return {
    alpha1: intervalRecord(cell.alpha1),
    alpha3: intervalRecord(cell.alpha3),
    receptionPhase: intervalRecord(cell.theta),
    dimensionlessDelay: intervalRecord(cell.delay),
  };
}

function dispositionRow(channel, cell, disposition, enclosure, extra = {}) {
  return {
    channelId: channel.channelId,
    channelKind: channel.kind,
    disposition,
    parameterBox: parameterBoxRecord(cell),
    residualEnclosure: enclosure ? intervalRecord(enclosure.residual) : null,
    delayDerivativeEnclosure: enclosure ? intervalRecord(enclosure.derivative) : null,
    distanceEnclosure: enclosure ? intervalRecord(enclosure.distance) : null,
    subdivisionDepth: cell.depth,
    boundaryOwnership: {
      ratio: "left-closed-right-open/internal; global-upper-bound-included.v1",
      receptionPhase: "left-closed-right-open; two-pi-identified-with-zero.v1",
      dimensionlessDelay:
        "left-open-right-closed/internal; near-zero-and-chi-strata-declared-separately.v1",
    },
    ...extra,
  };
}

function activeDimensions(channel) {
  const dimensions = [];
  const parameters = new Set([
    channel.receiver.radiusParameter,
    channel.transmitter.radiusParameter,
  ]);
  if (parameters.has("alpha1")) dimensions.push("alpha1");
  if (parameters.has("alpha3")) dimensions.push("alpha3");
  if (channel.kind === "inter-binary") dimensions.push("theta");
  dimensions.push("delay");
  return dimensions;
}

function splitInterval(value) {
  const middle = midpoint(value);
  return [interval(value.lower, middle), interval(middle, value.upper)];
}

function selectSplitDimension(channel, cell, protocol) {
  const fullWidths = {
    alpha1: EXPECTED_RATIO_BOX.alpha1[1] - EXPECTED_RATIO_BOX.alpha1[0],
    alpha3: EXPECTED_RATIO_BOX.alpha3[1] - EXPECTED_RATIO_BOX.alpha3[0],
    theta: TWO_PI,
    delay: EXPECTED_CHI - protocol.frozenDomain.nearZeroDelayUpper,
  };
  const minimumWidths = {
    alpha1: protocol.partition.minimumAlphaWidth,
    alpha3: protocol.partition.minimumAlphaWidth,
    theta: protocol.partition.minimumReceptionPhaseWidth,
    delay: protocol.partition.minimumDelayWidth,
  };
  return activeDimensions(channel)
    .filter((key) => cell[key].upper - cell[key].lower > minimumWidths[key])
    .map((key) => ({
      key,
      score: (cell[key].upper - cell[key].lower) / fullWidths[key],
    }))
    .sort((left, right) =>
      right.score - left.score || left.key.localeCompare(right.key))[0]?.key ?? null;
}

function splitCell(cell, dimension) {
  const halves = splitInterval(cell[dimension]);
  return halves.map((half) => ({
    ...cell,
    [dimension]: half,
    depth: cell.depth + 1,
  }));
}

function partitionInterval(value, count) {
  const width = (value.upper - value.lower) / count;
  return Array.from({ length: count }, (_, index) =>
    interval(
      value.lower + index * width,
      index + 1 === count ? value.upper : value.lower + (index + 1) * width,
    ));
}

function createInitialCells(channel, protocol) {
  const ratioCount = protocol.partition.initialRatioSubdivisions;
  const phaseCount = channel.kind === "inter-binary"
    ? protocol.partition.initialReceptionPhaseSubdivisions
    : 1;
  const alpha1Partitions = activeDimensions(channel).includes("alpha1")
    ? partitionInterval(interval(...EXPECTED_RATIO_BOX.alpha1), ratioCount)
    : [interval(...EXPECTED_RATIO_BOX.alpha1)];
  const alpha3Partitions = activeDimensions(channel).includes("alpha3")
    ? partitionInterval(interval(...EXPECTED_RATIO_BOX.alpha3), ratioCount)
    : [interval(...EXPECTED_RATIO_BOX.alpha3)];
  const phasePartitions = partitionInterval(interval(0, TWO_PI), phaseCount);
  const cells = [];
  for (const alpha1 of alpha1Partitions) {
    for (const alpha3 of alpha3Partitions) {
      for (const theta of phasePartitions) {
        cells.push({
          alpha1,
          alpha3,
          theta,
          delay: interval(protocol.frozenDomain.nearZeroDelayUpper, EXPECTED_CHI),
          depth: 0,
        });
      }
    }
  }
  return cells;
}

function faceCell(cell, delay) {
  return { ...cell, delay: interval(delay) };
}

function faceHasUniformSign(residual, floor, sign) {
  return sign > 0
    ? residual.lower > floor
    : residual.upper < -floor;
}

function classifySimpleRootSheet(channel, cell, enclosure, protocol, ulps) {
  const floor = protocol.rootPolicy.rootResidualFloor;
  let derivativeSign = 0;
  if (enclosure.derivative.lower > protocol.rootPolicy.rootTransversalityFloor) {
    derivativeSign = 1;
  } else if (enclosure.derivative.upper < -protocol.rootPolicy.rootTransversalityFloor) {
    derivativeSign = -1;
  } else {
    return null;
  }
  const lowerFace = enclosures(channel, faceCell(cell, cell.delay.lower), ulps).residual;
  const upperFace = enclosures(channel, faceCell(cell, cell.delay.upper), ulps).residual;
  const brackets =
    derivativeSign > 0
      ? faceHasUniformSign(lowerFace, floor, -1) &&
        faceHasUniformSign(upperFace, floor, 1)
      : faceHasUniformSign(lowerFace, floor, 1) &&
        faceHasUniformSign(upperFace, floor, -1);
  if (!brackets) return null;
  const recomputation = refinePointRoot(channel, cell, protocol);
  if (!recomputation ||
      Math.abs(recomputation.primaryResidual) > protocol.rootPolicy.independentResidualFloor ||
      Math.abs(recomputation.independent.normalizedResidual) >
        protocol.rootPolicy.independentResidualFloor ||
      Math.abs(recomputation.delayDerivative) <
        protocol.rootPolicy.rootTransversalityFloor) {
    return {
      failedIndependentRecomputation: true,
      recomputation,
      lowerFace,
      upperFace,
      method: "uniform-delay-face-signs.v1",
    };
  }
  return {
    failedIndependentRecomputation: false,
    derivativeSign,
    recomputation,
    lowerFace,
    upperFace,
    method: "uniform-delay-face-signs.v1",
  };
}

function certifyChannel(channel, protocol, packetBudget) {
  const ulps = protocol.rootPolicy.intervalPaddingUlps;
  const ledger = [
    {
      channelId: channel.channelId,
      channelKind: channel.kind,
      disposition: channel.kind === "same-transmitter-self"
        ? "excluded-endpoint-stratum"
        : "certified-root-free-endpoint-stratum",
      parameterBox: {
        alpha1: [...EXPECTED_RATIO_BOX.alpha1],
        alpha3: [...EXPECTED_RATIO_BOX.alpha3],
        receptionPhase: [0, TWO_PI],
        dimensionlessDelay: [0, 0],
      },
      reason: channel.kind === "same-transmitter-self"
        ? "trivial-zero-delay-self-coincidence-excluded"
        : "non-self zero-delay endpoint is root-free by positive locus gap or opposite-endpoint separation",
      subdivisionDepth: 0,
    },
    {
      channelId: channel.channelId,
      channelKind: channel.kind,
      disposition: "certified-root-free-near-zero-stratum",
      parameterBox: {
        alpha1: [...EXPECTED_RATIO_BOX.alpha1],
        alpha3: [...EXPECTED_RATIO_BOX.alpha3],
        receptionPhase: [0, TWO_PI],
        dimensionlessDelay: [0, protocol.frozenDomain.nearZeroDelayUpper],
      },
      reason: channel.kind === "same-transmitter-self"
        ? "exact circular self-residual has fixed nonzero sign for 0<delay<=1/32 in the declared speed band"
        : channel.kind === "same-binary-opposite-endpoint"
          ? "opposite-endpoint circular chord exceeds delay for 0<delay<=1/32"
          : "frozen radius gap is at least 1/16 while delay is at most 1/32",
      subdivisionDepth: 0,
    },
    {
      channelId: channel.channelId,
      channelKind: channel.kind,
      disposition: "certified-memory-edge-root-free",
      parameterBox: {
        alpha1: [...EXPECTED_RATIO_BOX.alpha1],
        alpha3: [...EXPECTED_RATIO_BOX.alpha3],
        receptionPhase: [0, TWO_PI],
        dimensionlessDelay: [EXPECTED_CHI, EXPECTED_CHI],
      },
      reason: channel.kind === "inter-binary"
        ? "maximum inter-binary distance 17/8 is strictly below chi=9/4"
        : "exact same-binary chord at chi is strictly below its 2R bound, which is at most chi",
      subdivisionDepth: 0,
    },
  ];
  const unresolved = [];
  const stack = createInitialCells(channel, protocol).reverse();
  let evaluatedCells = 0;
  let rootFreeCells = 0;
  let simpleRootSheetCells = 0;
  let possibleFoldCells = 0;
  let maximumDepthReached = 0;

  if (channel.kind === "same-transmitter-self" &&
      channel.receiver.binaryIndex < 3) {
    ledger.push({
      channelId: channel.channelId,
      channelKind: channel.kind,
      disposition: "certified-root-free",
      parameterBox: {
        alpha1: [...EXPECTED_RATIO_BOX.alpha1],
        alpha3: [...EXPECTED_RATIO_BOX.alpha3],
        receptionPhase: [0, TWO_PI],
        dimensionlessDelay: [
          protocol.frozenDomain.nearZeroDelayUpper,
          EXPECTED_CHI,
        ],
      },
      reason: channel.receiver.binaryIndex === 1
        ? "sin(x)<x and alpha1<1 imply 2*alpha1*sin(delay/2)-delay<0"
        : "sin(x)<x implies 2*sin(delay/2)-delay<0 for positive delay",
      subdivisionDepth: 0,
    });
    return {
      channel,
      status: "evaluated-diagnostic",
      ledger,
      unresolved,
      counts: {
        evaluatedCells: 1,
        rootFreeCells: 1,
        simpleRootSheetCells: 0,
        possibleFoldCells: 0,
        maximumDepthReached: 0,
      },
    };
  }

  if (channel.kind === "same-transmitter-self" &&
      channel.receiver.binaryIndex === 3) {
    const rootCell = {
      alpha1: interval(...EXPECTED_RATIO_BOX.alpha1),
      alpha3: interval(...EXPECTED_RATIO_BOX.alpha3),
      theta: interval(0, TWO_PI),
      delay: interval(1, EXPECTED_CHI),
      depth: 0,
    };
    const enclosure = enclosures(channel, rootCell, ulps);
    const rootSheet = classifySimpleRootSheet(
      channel,
      rootCell,
      enclosure,
      protocol,
      ulps,
    );
    ledger.push({
      channelId: channel.channelId,
      channelKind: channel.kind,
      disposition: "certified-root-free",
      parameterBox: {
        alpha1: [...EXPECTED_RATIO_BOX.alpha1],
        alpha3: [...EXPECTED_RATIO_BOX.alpha3],
        receptionPhase: [0, TWO_PI],
        dimensionlessDelay: [
          protocol.frozenDomain.nearZeroDelayUpper,
          1,
        ],
      },
      reason:
        "the outer self residual rises from the excluded zero root, has one maximum, and remains positive at delay 1 throughout the frozen alpha3 interval",
      subdivisionDepth: 0,
    });
    if (!rootSheet || rootSheet.failedIndependentRecomputation) {
      const row = dispositionRow(
        channel,
        rootCell,
        "unresolved-root-partition",
        enclosure,
        {
          reason: rootSheet?.failedIndependentRecomputation
            ? "independent-residual-recomputation-failed"
            : "outer-self-uniform-root-sheet-certificate-failed",
          independentRecomputation: rootSheet?.recomputation ?? null,
        },
      );
      ledger.push(row);
      unresolved.push(row);
      return {
        channel,
        status: "drawn-not-evaluated",
        ledger,
        unresolved,
        counts: {
          evaluatedCells: 2,
          rootFreeCells: 1,
          simpleRootSheetCells: 0,
          possibleFoldCells: 0,
          maximumDepthReached: 0,
        },
      };
    }
    ledger.push(dispositionRow(
      channel,
      rootCell,
      "certified-simple-root-sheet",
      enclosure,
      {
        delayDerivativeSign: rootSheet.derivativeSign,
        rootSheetCertificationMethod: rootSheet.method,
        lowerDelayFaceResidualEnclosure: intervalRecord(rootSheet.lowerFace),
        upperDelayFaceResidualEnclosure: intervalRecord(rootSheet.upperFace),
        sampleRoot: rootSheet.recomputation,
      },
    ));
    return {
      channel,
      status: "evaluated-diagnostic",
      ledger,
      unresolved,
      counts: {
        evaluatedCells: 2,
        rootFreeCells: 1,
        simpleRootSheetCells: 1,
        possibleFoldCells: 0,
        maximumDepthReached: 0,
      },
    };
  }

  while (stack.length > 0) {
    if (evaluatedCells >= protocol.partition.maximumCellsPerChannel ||
        packetBudget.evaluatedCells >= protocol.partition.maximumCellsPerPacket) {
      const reason = evaluatedCells >= protocol.partition.maximumCellsPerChannel
        ? "maximum-cells-per-channel-reached"
        : "maximum-cells-per-packet-reached";
      for (const pending of stack) {
        unresolved.push(dispositionRow(channel, pending, "unresolved-resource-partition", null, {
          reason,
        }));
      }
      stack.length = 0;
      break;
    }
    const cell = stack.pop();
    evaluatedCells += 1;
    packetBudget.evaluatedCells += 1;
    maximumDepthReached = Math.max(maximumDepthReached, cell.depth);
    const enclosure = enclosures(channel, cell, ulps);
    const residualFloor = protocol.rootPolicy.rootResidualFloor;
    if (enclosure.residual.lower > residualFloor ||
        enclosure.residual.upper < -residualFloor) {
      ledger.push(dispositionRow(channel, cell, "certified-root-free", enclosure));
      rootFreeCells += 1;
      continue;
    }
    const rootSheet = classifySimpleRootSheet(
      channel,
      cell,
      enclosure,
      protocol,
      ulps,
    );
    if (rootSheet && !rootSheet.failedIndependentRecomputation) {
      ledger.push(dispositionRow(channel, cell, "certified-simple-root-sheet", enclosure, {
        delayDerivativeSign: rootSheet.derivativeSign,
        rootSheetCertificationMethod: rootSheet.method,
        lowerDelayFaceResidualEnclosure: intervalRecord(rootSheet.lowerFace),
        upperDelayFaceResidualEnclosure: intervalRecord(rootSheet.upperFace),
        sampleRoot: rootSheet.recomputation,
      }));
      simpleRootSheetCells += 1;
      continue;
    }
    const splitDimension =
      cell.depth < protocol.partition.maximumSubdivisionDepth
        ? selectSplitDimension(channel, cell, protocol)
        : null;
    if (!splitDimension) {
      const derivativeMayVanish =
        enclosure.derivative.lower <= protocol.rootPolicy.rootTransversalityFloor &&
        enclosure.derivative.upper >= -protocol.rootPolicy.rootTransversalityFloor;
      const disposition = derivativeMayVanish
        ? "unresolved-possible-fold-partition"
        : "unresolved-root-partition";
      const reason = rootSheet?.failedIndependentRecomputation
        ? "independent-residual-recomputation-failed"
        : cell.depth >= protocol.partition.maximumSubdivisionDepth
          ? "maximum-subdivision-depth-reached"
          : "minimum-partition-width-reached";
      const row = dispositionRow(channel, cell, disposition, enclosure, {
        reason,
        independentRecomputation: rootSheet?.recomputation ?? null,
      });
      unresolved.push(row);
      ledger.push(row);
      if (derivativeMayVanish) possibleFoldCells += 1;
      continue;
    }
    const children = splitCell(cell, splitDimension);
    stack.push(children[1], children[0]);
  }

  return {
    channel,
    status: unresolved.length === 0
      ? "evaluated-diagnostic"
      : "drawn-not-evaluated",
    ledger,
    unresolved,
    counts: {
      evaluatedCells,
      rootFreeCells,
      simpleRootSheetCells,
      possibleFoldCells,
      maximumDepthReached,
    },
  };
}

function scanPointRoots(channel, protocol, point, subdivisions = 4096) {
  const start = protocol.frozenDomain.nearZeroDelayUpper;
  const end = EXPECTED_CHI;
  const tolerance = protocol.rootPolicy.pointRootTolerance;
  const roots = [];
  let separationViolation = null;
  let priorDelay = start;
  let priorResidual = pointResidual(
    channel,
    point.alpha1,
    point.alpha3,
    point.receptionPhase,
    priorDelay,
  );
  for (let index = 1; index <= subdivisions; index += 1) {
    const delay = start + (end - start) * index / subdivisions;
    const residual = pointResidual(
      channel,
      point.alpha1,
      point.alpha3,
      point.receptionPhase,
      delay,
    );
    if (priorResidual * residual < 0) {
      let low = priorDelay;
      let high = delay;
      let lowResidual = priorResidual;
      for (let iteration = 0;
        iteration < protocol.rootPolicy.pointRootIterations;
        iteration += 1) {
        const middle = (low + high) / 2;
        const middleResidual = pointResidual(
          channel,
          point.alpha1,
          point.alpha3,
          point.receptionPhase,
          middle,
        );
        if (Math.abs(middleResidual) <= tolerance) {
          low = middle;
          high = middle;
          break;
        }
        if (lowResidual * middleResidual <= 0) {
          high = middle;
        } else {
          low = middle;
          lowResidual = middleResidual;
        }
      }
      const rootDelay = (low + high) / 2;
      const nearest = roots
        .map((root) => Math.abs(root.delay - rootDelay))
        .sort((left, right) => left - right)[0] ?? Number.POSITIVE_INFINITY;
      if (nearest <= protocol.rootPolicy.rootSeparationFloor) {
        separationViolation = {
          candidateDelay: rootDelay,
          nearestRetainedDelayDistance: nearest,
          rootSeparationFloor: protocol.rootPolicy.rootSeparationFloor,
        };
      } else {
        const independent = recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual({
          protocol,
          receiver: channel.receiver,
          transmitter: channel.transmitter,
          ...point,
          delay: rootDelay,
        });
        roots.push({
          delay: rootDelay,
          primaryResidual: pointResidual(
            channel,
            point.alpha1,
            point.alpha3,
            point.receptionPhase,
            rootDelay,
          ),
          delayDerivative: pointDelayDerivative(
            channel,
            point.alpha1,
            point.alpha3,
            point.receptionPhase,
            rootDelay,
          ),
          independent,
        });
      }
    }
    priorDelay = delay;
    priorResidual = residual;
  }
  const separations = roots
    .slice(1)
    .map((root, index) => root.delay - roots[index].delay);
  return {
    roots,
    minimumRootSeparation:
      separations.length > 0 ? Math.min(...separations) : null,
    separationViolation,
    passed:
      separationViolation === null &&
      separations.every((value) =>
        value > protocol.rootPolicy.rootSeparationFloor),
  };
}

function runAnalyticReductionControls(protocol, channels) {
  const point = protocol.controls.point;
  const delays = [
    protocol.frozenDomain.nearZeroDelayUpper,
    0.5,
    1,
    1.5,
    2,
    EXPECTED_CHI,
  ];
  const ulps = protocol.rootPolicy.intervalPaddingUlps;
  const rows = channels
    .filter((channel) => channel.kind === "inter-binary")
    .flatMap((channel) => delays.map((delay) => {
      const cell = {
        alpha1: interval(point.alpha1),
        alpha3: interval(point.alpha3),
        theta: interval(point.receptionPhase),
        delay: interval(delay),
        depth: 0,
      };
      const enclosure = analyticInterBinaryEnclosures(channel, cell, ulps);
      const directResidual = pointResidual(
        channel,
        point.alpha1,
        point.alpha3,
        point.receptionPhase,
        delay,
      );
      const directDerivative = pointDelayDerivative(
        channel,
        point.alpha1,
        point.alpha3,
        point.receptionPhase,
        delay,
      );
      const independent = recomputeCoincidentMidpointCommonFrequencySquaredCausalResidual({
        protocol,
        receiver: channel.receiver,
        transmitter: channel.transmitter,
        alpha1: point.alpha1,
        alpha3: point.alpha3,
        receptionPhase: point.receptionPhase,
        delay,
      });
      const residualContained =
        directResidual >= enclosure.residual.lower &&
        directResidual <= enclosure.residual.upper;
      const derivativeTolerance = 1e-7;
      const derivativeContained =
        directDerivative >= enclosure.derivative.lower - derivativeTolerance &&
        directDerivative <= enclosure.derivative.upper + derivativeTolerance;
      return {
        channelId: channel.channelId,
        symmetryKey: endpointInversionSymmetryKey(channel),
        delay,
        analyticResidualEnclosure: intervalRecord(enclosure.residual),
        analyticDerivativeEnclosure: intervalRecord(enclosure.derivative),
        directCoordinateResidual: directResidual,
        directCoordinateDerivative: directDerivative,
        independentNormalizedResidual: independent.normalizedResidual,
        residualContained,
        derivativeContained,
      };
    }));
  const maximumEndpointInversionResidualDifference = Math.max(
    0,
    ...[...new Set(rows.map((row) => row.symmetryKey))].flatMap((key) => {
      const symmetryRows = rows.filter((row) => row.symmetryKey === key);
      return delays.map((delay) => {
        const delayRows = symmetryRows.filter((row) => row.delay === delay);
        return Math.abs(
          delayRows[0].directCoordinateResidual -
          delayRows[1].directCoordinateResidual,
        );
      });
    }),
  );
  return {
    id: "coincident-midpoint-common-frequency-exact-circular-inter-binary-reduction-controls.v1",
    grade: "same-change-diagnostic-conformance-only",
    sampleCount: rows.length,
    derivativeContainmentTolerance: 1e-7,
    directCoordinateResidualContainmentPassed:
      rows.every((row) => row.residualContained),
    directCoordinateDerivativeContainmentPassed:
      rows.every((row) => row.derivativeContained),
    endpointInversionSymmetryPassed:
      maximumEndpointInversionResidualDifference <= 1e-12,
    maximumEndpointInversionResidualDifference,
    passed:
      rows.every((row) => row.residualContained && row.derivativeContained) &&
      maximumEndpointInversionResidualDifference <= 1e-12,
    rows,
  };
}

function runControls(protocol, channels) {
  const point = protocol.controls.point;
  const pointRows = channels.map((channel) => {
    const scan = scanPointRoots(channel, protocol, point);
    return {
      channelId: channel.channelId,
      channelKind: channel.kind,
      ...scan,
    };
  });
  const outerSelfRows = pointRows.filter((row) =>
    row.channelKind === "same-transmitter-self" &&
    row.channelId.includes("binary-3"));
  const innerSelfRows = pointRows.filter((row) =>
    row.channelKind === "same-transmitter-self" &&
    row.channelId.includes("binary-1"));
  const rootRows = pointRows.flatMap((row) =>
    row.roots.map((root) => ({ channelId: row.channelId, ...root })));
  const maximumPrimaryResidual = Math.max(
    0,
    ...rootRows.map((row) => Math.abs(row.primaryResidual)),
  );
  const maximumIndependentResidual = Math.max(
    0,
    ...rootRows.map((row) => Math.abs(row.independent.normalizedResidual)),
  );
  const minimumTransversality = Math.min(
    Number.POSITIVE_INFINITY,
    ...rootRows.map((row) => Math.abs(row.delayDerivative)),
  );
  const finiteSeparations = pointRows
    .map((row) => row.minimumRootSeparation)
    .filter((value) => value !== null);
  return {
    schema: "prescribed-path-analysis/coincident-midpoint-common-frequency-continuous-root-inventory-controls.v1",
    point,
    analyticReductionControl:
      runAnalyticReductionControls(protocol, channels),
    positiveControl: {
      id: "outer-same-transmitter-nontrivial-root",
      passed: outerSelfRows.length === 2 &&
        outerSelfRows.every((row) => row.roots.length === 1),
      rows: outerSelfRows,
    },
    negativeControl: {
      id: "inner-same-transmitter-no-positive-delay-root",
      passed: innerSelfRows.length === 2 &&
        innerSelfRows.every((row) => row.roots.length === 0),
      rows: innerSelfRows,
    },
    independentResidualRecomputation: {
      id: protocol.independentRecomputation.id,
      passed:
        maximumPrimaryResidual <= protocol.rootPolicy.independentResidualFloor &&
        maximumIndependentResidual <= protocol.rootPolicy.independentResidualFloor,
      rootCount: rootRows.length,
      maximumPrimaryResidual,
      maximumIndependentNormalizedResidual: maximumIndependentResidual,
      sameChangeIndependenceBoundary:
        protocol.independentRecomputation.sameChangeIndependenceBoundary,
    },
    transversalityControl: {
      passed: minimumTransversality >= protocol.rootPolicy.rootTransversalityFloor,
      minimumAbsoluteDelayDerivative:
        Number.isFinite(minimumTransversality) ? minimumTransversality : null,
    },
    rootSeparationControl: {
      passed: pointRows.every((row) => row.passed),
      rootSeparationFloor: protocol.rootPolicy.rootSeparationFloor,
      minimumObservedRootSeparation:
        finiteSeparations.length > 0 ? Math.min(...finiteSeparations) : null,
      violations: pointRows
        .filter((row) => row.separationViolation !== null)
        .map((row) => ({
          channelId: row.channelId,
          ...row.separationViolation,
        })),
    },
    pointRows,
  };
}

export function evaluateCoincidentMidpointCommonFrequencyContinuousRootInventory({
  protocol: rawProtocol,
  executionLimits = null,
} = {}) {
  const protocol = validateCoincidentMidpointCommonFrequencyContinuousRootInventoryProtocol(rawProtocol);
  if (executionLimits !== null) {
    if (!executionLimits || typeof executionLimits !== "object" ||
        Array.isArray(executionLimits)) {
      throw new TypeError("executionLimits must be null or an explicit object.");
    }
    for (const key of [
      "maximumSubdivisionDepth",
      "maximumCellsPerChannel",
      "maximumCellsPerPacket",
    ]) {
      if (key in executionLimits) {
        protocol.partition[key] = positiveInteger(
          executionLimits[key],
          `executionLimits.${key}`,
        );
      }
    }
  }
  const channels = buildCoincidentMidpointCommonFrequencyOrderedChannelInventory(protocol);
  const packetBudget = { evaluatedCells: 0 };
  const symmetryRepresentatives = new Map();
  const channelResults = channels.map((channel) =>
    certifyChannelWithSymmetry(
      channel,
      protocol,
      packetBudget,
      symmetryRepresentatives,
    ));
  const controls = runControls(protocol, channels);
  const unresolvedPartitions = channelResults.flatMap((row) => row.unresolved);
  const statusCode = unresolvedPartitions.length === 0 &&
      controls.positiveControl.passed &&
      controls.negativeControl.passed &&
      controls.analyticReductionControl.passed &&
      controls.independentResidualRecomputation.passed &&
      controls.transversalityControl.passed &&
      controls.rootSeparationControl.passed
    ? "evaluated-diagnostic"
    : "drawn-not-evaluated";
  const resultWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_RESULT_SCHEMA,
    evaluator: {
      id: "coincident-midpoint-common-frequency-continuous-ratio-phase-prescribed-path-interval-certifier",
      version: 2,
      prescribedPathAnalyticsOnly: true,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
      eomIntervalMachineryInvoked: false,
      diagnosticOnly: true,
      interBinaryReduction: {
        distanceIdentity:
          "gap-square-plus-two-radius-product-times-one-minus-signed-plane-dot",
        phaseCoordinates: [
          "2*reception-phase-delay+receiver-phase+transmitter-phase",
          "delay+receiver-phase-transmitter-phase",
        ],
        intervalPreconditioning: [
          "exact-radius-gap-square",
          "analytic-plane-dot-range-intersection",
          "analytic-distance-derivative",
        ],
        symmetry:
          "simultaneous-receiver-transmitter-endpoint-inversion.v1",
      },
    },
    source: {
      analyticalConfigurationId:
        protocol.sourceConfiguration.analyticalConfigurationId,
      analyticalLevelId: protocol.sourceConfiguration.analyticalLevelId,
      scientificIdentity: protocol.sourceConfiguration.scientificIdentity,
      displaySourceProvenance: protocol.sourceConfiguration.displaySourceProvenance,
      commonCirculationSense: protocol.sourceConfiguration.commonCirculationSense,
      phaseBaseline: protocol.sourceConfiguration.phaseBaseline,
      endpointCount: 6,
    },
    protocolHash: sha256CoincidentMidpointCommonFrequencyInterval(rawProtocol),
    executionProtocolHash: sha256CoincidentMidpointCommonFrequencyInterval(protocol),
    frozenDomain: protocol.frozenDomain,
    rootPolicy: protocol.rootPolicy,
    partition: protocol.partition,
    status: {
      code: statusCode,
      score: null,
      reason: statusCode === "drawn-not-evaluated"
        ? unresolvedPartitions.length > 0
          ? "one-or-more-root-fold-or-resource-partitions-remain-unresolved"
          : "one-or-more-required-controls-failed"
        : "all-partitions-disposed-under-the-declared-diagnostic-protocol",
    },
    channelCoverage: {
      orderedChannelCount: channels.length,
      selfChannelCount: channels.filter((row) =>
        row.kind === "same-transmitter-self").length,
      sameBinaryPartnerChannelCount: channels.filter((row) =>
        row.kind === "same-binary-opposite-endpoint").length,
      interBinaryChannelCount: channels.filter((row) =>
        row.kind === "inter-binary").length,
      interBinarySymmetryClassCount: symmetryRepresentatives.size,
      interBinarySymmetryReusedChannelCount: channelResults.filter((row) =>
        row.symmetry?.role === "exact-endpoint-inversion-reuse").length,
    },
    counts: {
      evaluatedCells: channelResults.reduce(
        (sum, row) => sum + row.counts.evaluatedCells,
        0,
      ),
      symmetryReusedCells: channelResults.reduce(
        (sum, row) => sum + row.counts.symmetryReusedCells,
        0,
      ),
      rootFreeCells: channelResults.reduce(
        (sum, row) => sum + row.counts.rootFreeCells,
        0,
      ),
      simpleRootSheetCells: channelResults.reduce(
        (sum, row) => sum + row.counts.simpleRootSheetCells,
        0,
      ),
      possibleFoldCells: channelResults.reduce(
        (sum, row) => sum + row.counts.possibleFoldCells,
        0,
      ),
      unresolvedPartitionCount: unresolvedPartitions.length,
      topologyLedgerRowCount: channelResults.reduce(
        (sum, row) => sum + row.ledger.length,
        0,
      ),
    },
    controls,
    channelResults,
    unresolvedPartitions,
    claimBoundary: protocol.claimBoundary,
  };
  return {
    ...resultWithoutHash,
    resultHash: sha256CoincidentMidpointCommonFrequencyInterval(resultWithoutHash),
  };
}

export function summarizeCoincidentMidpointCommonFrequencyContinuousRootInventory(result) {
  if (!result || result.schema !== COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_RESULT_SCHEMA) {
    throw new TypeError(`result must use schema ${COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_RESULT_SCHEMA}.`);
  }
  const unresolvedReasonCounts = Object.fromEntries(
    [...new Set(result.unresolvedPartitions.map((row) => row.reason))]
      .sort()
      .map((reason) => [
        reason,
        result.unresolvedPartitions.filter((row) => row.reason === reason).length,
      ]),
  );
  const summaryUnresolvedLimit = result.partition.maximumSummaryUnresolvedPartitions;
  const summaryWithoutHash = {
    schema: COINCIDENT_MIDPOINT_COMMON_FREQUENCY_INTERVAL_SUMMARY_SCHEMA,
    evaluator: result.evaluator,
    source: result.source,
    protocolHash: result.protocolHash,
    executionProtocolHash: result.executionProtocolHash,
    resultHash: result.resultHash,
    frozenDomain: result.frozenDomain,
    rootPolicy: result.rootPolicy,
    partition: result.partition,
    status: result.status,
    channelCoverage: result.channelCoverage,
    counts: result.counts,
    controls: {
      positiveControl: result.controls.positiveControl,
      negativeControl: result.controls.negativeControl,
      analyticReductionControl: Object.fromEntries(
        Object.entries(result.controls.analyticReductionControl)
          .filter(([key]) => key !== "rows"),
      ),
      independentResidualRecomputation:
        result.controls.independentResidualRecomputation,
      transversalityControl: result.controls.transversalityControl,
      rootSeparationControl: result.controls.rootSeparationControl,
    },
    channelSummaries: result.channelResults.map((row) => ({
      channelId: row.channel.channelId,
      channelKind: row.channel.kind,
      status: row.status,
      counts: row.counts,
      unresolvedPartitionCount: row.unresolved.length,
      symmetry: row.symmetry ?? null,
    })),
    unresolvedPartitionLedger: {
      completeLedgerLocation: "full result artifact bound by resultHash",
      completeLedgerHash: sha256CoincidentMidpointCommonFrequencyInterval(result.unresolvedPartitions),
      count: result.unresolvedPartitions.length,
      reasonCounts: unresolvedReasonCounts,
      sampleLimit: summaryUnresolvedLimit,
      sample: result.unresolvedPartitions.slice(0, summaryUnresolvedLimit),
    },
    claimBoundary: result.claimBoundary,
  };
  return {
    ...summaryWithoutHash,
    summaryHash: sha256CoincidentMidpointCommonFrequencyInterval(summaryWithoutHash),
  };
}

// Independent exact-decimal circle/cubic comparison. The sole shared
// mathematics is the separately reviewed integer-interval primitive reference.
import {
  Q, decimalToken, floorDivide, multiply, rootHi, sinCos,
} from "../../scripts/eom/derive-subfield-circular-root-reference.mjs";

export const CIRCULAR_ERROR_CONTRACT = Object.freeze({
  segmentStep: "0.002", segmentsPerHistory: 1000, retainedDepth: "2",
  maximumProofStep: "0.00200000000001", maximumFourthDerivative: "104",
  endpointPositionError: "1e-13", endpointVelocityError: "1e-12",
  // Exactly representable in binary64: 2^-37 and 2^-22. Both EOM
  // precision routes therefore receive the exact declared error radii.
  positionError: "0.0000000000072759576141834259033203125",
  velocityError: "0.0000002384185791015625", rootTolerance: "1e-8",
});
const abs = (x) => x < 0n ? -x : x;
const max = (a, b) => a > b ? a : b;
const ceilDivide = (a, b) => -floorDivide(-a, b);
const point = (x) => [x, x];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const neg = (a) => [-a[1], -a[0]];
const sub = (a, b) => add(a, neg(b));
const scale = (a, n) => n >= 0n ? [a[0] * n, a[1] * n] : [a[1] * n, a[0] * n];
const divide = (a, positive) => {
  if (positive <= 0n) throw new Error("positive divisor required");
  return [floorDivide(a[0] * Q, positive), ceilDivide(a[1] * Q, positive)];
};
const absUpper = (value) => max(abs(value[0]), abs(value[1]));

export function parseCircularToken(token) {
  if (typeof token !== "string" || token.length > 128) throw new Error("bounded decimal token required");
  const value = decimalToken(token);
  if (!Number.isFinite(Number(token)) || (value !== 0n && Number(token) === 0)) {
    throw new Error("token is not a finite EOM carrier value");
  }
  return value;
}

export function formatCircularBound(value) {
  const magnitude = abs(value), integer = magnitude / Q;
  const fraction = (magnitude % Q).toString().padStart(60, "0").replace(/0+$/u, "");
  return `${value < 0n ? "-" : ""}${integer}${fraction ? `.${fraction}` : ""}`;
}

function vector(raw, name) {
  if (!Array.isArray(raw[name]) || raw[name].length !== 3) throw new Error(`${name} must have three tokens`);
  return raw[name].map(parseCircularToken);
}

function parseOperator(raw) {
  if (raw.kind !== "moving-circular.v1" ||
      vector(raw, "centerVelocity").some((value) => value !== 0n) ||
      parseCircularToken(raw.angularAcceleration) !== 0n) {
    throw new Error("stationary-center constant-cadence circular source required");
  }
  return { C: vector(raw, "centerAtEpoch"), U: vector(raw, "radiusU"), V: vector(raw, "radiusV"),
    phase: parseCircularToken(raw.phaseAtEpoch), omega: parseCircularToken(raw.angularVelocity),
    epoch: parseCircularToken(raw.epochTime) };
}

function fourthDerivativeBounds(source) {
  return source.U.map((value, axis) => ceilDivide(
    abs(source.omega) ** 4n * (abs(value) + abs(source.V[axis])), Q ** 4n,
  ));
}

// Exact lifts of adjacent binary64 time values. Within this pilot's [2,8)
// nominal domain all dyadic endpoints are representable at the Q=10^60 scale.
function adjacentTime(value, direction) {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  const parsedBits = view.getBigUint64(0).toString(16).padStart(16, "0");
  view.setBigUint64(0, view.getBigUint64(0) + BigInt(direction));
  const bits = view.getBigUint64(0), exponent = Number((bits >> 52n) & 2047n) - 1023 - 52;
  const significand = (bits & ((1n << 52n) - 1n)) + (1n << 52n);
  if (exponent >= 0) return { value: (significand << BigInt(exponent)) * Q, parsedBits };
  const divisor = 1n << BigInt(-exponent);
  if ((significand * Q) % divisor !== 0n) throw new Error("time lift exceeds exact decimal scale");
  return { value: significand * Q / divisor, parsedBits };
}

export function circularCarrierDomain(tStart, tEnd) {
  const start = parseCircularToken(tStart), end = parseCircularToken(tEnd);
  if (end - start !== parseCircularToken(CIRCULAR_ERROR_CONTRACT.segmentStep)) throw new Error("exact 0.002 segment required");
  if (start < 2n * Q || end >= 8n * Q) throw new Error("nominal segment lies outside pilot [2,8) domain");
  if (!(Number(tStart) < Number(tEnd))) throw new Error("parsed segment endpoints must be ordered");
  const before = adjacentTime(Number(tStart), -1), after = adjacentTime(Number(tEnd), 1);
  const left = before.value, right = after.value;
  if (left > start || right < end || left < 0n || right > 8n * Q ||
      right - left > parseCircularToken(CIRCULAR_ERROR_CONTRACT.maximumProofStep)) throw new Error("invalid expanded carrier domain");
  return { nominalStart: start, nominalEnd: end, left, right,
    parsedEndpointBits: [before.parsedBits, after.parsedBits] };
}

function state(source, time) {
  const theta = add(point(source.phase), multiply(point(source.omega), point(time - source.epoch)));
  const trigonometric = sinCos(theta);
  return {
    position: source.C.map((value, axis) => add(point(value),
      add(multiply(point(source.U[axis]), trigonometric.c), multiply(point(source.V[axis]), trigonometric.s)))),
    velocity: source.U.map((value, axis) => multiply(point(source.omega),
      add(neg(multiply(point(value), trigonometric.s)), multiply(point(source.V[axis]), trigonometric.c)))),
  };
}

// Endpoint states are integer intervals scaled by Q, independent of any
// production endpoint calculation. This helper is a mathematical control seam.
export function cubicEndpointDefects(coefficients, h, beforePosition, beforeVelocity, afterPosition, afterVelocity) {
  if (h <= 0n || !Array.isArray(coefficients) || coefficients.length !== 4) throw new Error("invalid cubic domain");
  return endpointDefects(coefficients.map((token) => point(parseCircularToken(token))), h,
    beforePosition, beforeVelocity, afterPosition, afterVelocity);
}

function endpointDefects([a0, a1, a2, a3], h, beforePosition, beforeVelocity, afterPosition, afterVelocity) {
  const width = point(h);
  const endPosition = add(multiply(add(multiply(add(multiply(a3, width), a2), width), a1), width), a0);
  const endVelocity = add(multiply(add(multiply(scale(a3, 3n), width), scale(a2, 2n)), width), a1);
  const e0 = sub(a0, beforePosition), e1 = sub(endPosition, afterPosition);
  const d0 = sub(a1, beforeVelocity), d1 = sub(endVelocity, afterVelocity);
  const third = divide(width, 3n * Q);
  const positionControls = [e0, add(e0, multiply(third, d0)), sub(e1, multiply(third, d1)), e1];
  const velocityControls = [d0, sub(sub(divide(scale(sub(e1, e0), 3n), h), d0), d1), d1];
  return {
    positionDefect: positionControls.map(absUpper).reduce(max),
    velocityDefect: velocityControls.map(absUpper).reduce(max),
    endpointPositionError: max(absUpper(e0), absUpper(e1)),
    endpointVelocityError: max(absUpper(d0), absUpper(d1)),
  };
}

function translateCubic(tokens, shift) {
  const [a0, a1, a2, a3] = tokens.map((token) => point(parseCircularToken(token)));
  const s = point(shift);
  return [
    add(multiply(add(multiply(add(multiply(a3, s), a2), s), a1), s), a0),
    add(multiply(add(multiply(scale(a3, 3n), s), scale(a2, 2n)), s), a1),
    add(a2, multiply(scale(a3, 3n), s)), a3,
  ];
}

export function circularConstructionBudget(raw, speedUpperToken) {
  const source = parseOperator(raw);
  const h = parseCircularToken(CIRCULAR_ERROR_CONTRACT.maximumProofStep);
  const hMin = parseCircularToken(CIRCULAR_ERROR_CONTRACT.segmentStep);
  const etaX = parseCircularToken(CIRCULAR_ERROR_CONTRACT.endpointPositionError);
  const etaV = parseCircularToken(CIRCULAR_ERROR_CONTRACT.endpointVelocityError);
  const epsX = parseCircularToken(CIRCULAR_ERROR_CONTRACT.positionError);
  const epsV = parseCircularToken(CIRCULAR_ERROR_CONTRACT.velocityError);
  const m4 = fourthDerivativeBounds(source);
  const maximumM4 = parseCircularToken(CIRCULAR_ERROR_CONTRACT.maximumFourthDerivative);
  if (m4.some((value) => value > maximumM4)) throw new Error("fourth derivative exceeds frozen cohort ceiling");
  const positionDefect = etaX + ceilDivide(h * etaV, 3n * Q);
  const velocityDefect = ceilDivide(6n * etaX * Q, hMin) + 2n * etaV;
  const positionBounds = m4.map((m) => positionDefect + ceilDivide(m * h ** 4n, 300n * Q ** 4n));
  const velocityBounds = m4.map((m) => velocityDefect + ceilDivide(m * h ** 3n, 8n * Q ** 3n));
  const sqrtThree = rootHi(3n, 1n) * 10n ** 48n;
  const speedUpper = parseCircularToken(speedUpperToken);
  if (speedUpper < 0n || speedUpper >= Q) throw new Error("strictly sub-field bound required");
  const factorMargin = Q - speedUpper - ceilDivide(2n * sqrtThree * epsV, Q);
  if (factorMargin <= 0n) throw new Error("error boxes lose strict sub-field margin");
  // Use the analytic source itself as the common continuous reference. The
  // cohort-wide M4 ceiling covers both receiver and source, even across joins.
  const cohortPositionBound = positionDefect + ceilDivide(maximumM4 * h ** 4n, 300n * Q ** 4n);
  const rootSpread = ceilDivide(4n * sqrtThree * (epsX + cohortPositionBound), Q - speedUpper);
  return {
    accepted: positionBounds.every((value) => value <= epsX) && velocityBounds.every((value) => value <= epsV) &&
      rootSpread < parseCircularToken(CIRCULAR_ERROR_CONTRACT.rootTolerance),
    authority: "conditional-construction-budget-only", h3EvidenceEligible: false,
    fourthDerivativeUpper: m4.map(formatCircularBound),
    positionErrorUpper: positionBounds.map(formatCircularBound),
    velocityErrorUpper: velocityBounds.map(formatCircularBound),
    errorBoxFactorMarginLower: formatCircularBound(factorMargin),
    analyticFactorMarginLower: formatCircularBound(Q - speedUpper),
    cohortPositionErrorUpper: formatCircularBound(cohortPositionBound),
    representationRootSpreadUpper: formatCircularBound(rootSpread),
  };
}

export function certifyCircularSegment(raw, segment) {
  const source = parseOperator(raw);
  const domain = circularCarrierDomain(segment.tStart, segment.tEnd);
  const { left: start, right: end } = domain, h = end - start;
  if (!Array.isArray(segment.coefficients) || segment.coefficients.length !== 3 ||
      segment.coefficients.some((axis) => !Array.isArray(axis) || axis.length !== 4)) throw new Error("3 by 4 coefficient tokens required");
  for (const [field, expected] of [["positionErrors", "positionError"], ["velocityErrors", "velocityError"]]) {
    if (!Array.isArray(segment[field]) || segment[field].length !== 3 ||
        segment[field].some((token) => parseCircularToken(token) !== parseCircularToken(CIRCULAR_ERROR_CONTRACT[expected]))) {
      throw new Error("changed frozen circular error widths");
    }
  }
  const before = state(source, start), after = state(source, end), m4 = fourthDerivativeBounds(source);
  if (m4.some((value) => value > parseCircularToken(CIRCULAR_ERROR_CONTRACT.maximumFourthDerivative))) {
    throw new Error("fourth derivative exceeds frozen cohort ceiling");
  }
  const checks = segment.coefficients.map((axis, index) => {
    const shifted = translateCubic(axis, start - domain.nominalStart);
    const defects = endpointDefects(shifted, h, before.position[index], before.velocity[index], after.position[index], after.velocity[index]);
    const position = defects.positionDefect + ceilDivide(m4[index] * h ** 4n, 300n * Q ** 4n);
    const velocity = defects.velocityDefect + ceilDivide(m4[index] * h ** 3n, 8n * Q ** 3n);
    return {
      accepted: defects.endpointPositionError <= parseCircularToken(CIRCULAR_ERROR_CONTRACT.endpointPositionError) &&
        defects.endpointVelocityError <= parseCircularToken(CIRCULAR_ERROR_CONTRACT.endpointVelocityError) &&
        position <= parseCircularToken(CIRCULAR_ERROR_CONTRACT.positionError) &&
        velocity <= parseCircularToken(CIRCULAR_ERROR_CONTRACT.velocityError),
      endpointPositionErrorUpper: formatCircularBound(defects.endpointPositionError),
      endpointVelocityErrorUpper: formatCircularBound(defects.endpointVelocityError),
      positionErrorUpper: formatCircularBound(position), velocityErrorUpper: formatCircularBound(velocity),
    };
  });
  return { accepted: checks.every((check) => check.accepted), authority: "single-segment-only",
    h3EvidenceEligible: false, proofDomain: [start, end].map(formatCircularBound),
    parsedEndpointBits: domain.parsedEndpointBits, checks };
}

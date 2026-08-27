#!/usr/bin/env node

// Independent outward-rounded interval-Taylor enclosure for the F5
// phase-varying member map. This instrument imports neither the production
// prescribed-worldline operator nor the C++ EOM adapter.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const outputIndex = process.argv.indexOf("--out");
if (outputIndex < 0 || !process.argv[outputIndex + 1]) {
  throw new Error("usage: analyze-f5-hermite-enclosure.mjs --out <path>");
}
const outputPath = path.resolve(process.argv[outputIndex + 1]);

const ORDER = 4;
const PI = Math.PI;
const TAU = 2 * PI;
const PERIOD = 19.63359163663986;
const HISTORY_START = -1;
const MAXIMUM_SEGMENT_STEP = 0.02;
const OMEGA = 0.3200222059958718;
const H = 0.31;
const RHO1 = 0.30;
const RHO2 = 0.22;
const NEGATIVE_PHASE = 3.0434178831651124;
const DENSE_SAMPLES_PER_MEMBER = 65536;
const DISPLAY_RADIUS_BOUND = 0.45;
const SPEED_BOUND = 0.5;

const predeclaration = Object.freeze({
  schema: "f5_hermite_interval_enclosure_predeclaration/v1",
  claimScope: "analytic-to-cubic interpolation enclosure only",
  intervalArithmetic: "outward-rounded-binary64",
  taylorOrder: ORDER,
  historyInterval: [HISTORY_START, PERIOD],
  maximumSegmentStep: MAXIMUM_SEGMENT_STEP,
  positionDivisor: 300,
  velocityDivisor: 8,
  roundoffMultiplier: 64,
  denseSamplesPerMember: DENSE_SAMPLES_PER_MEMBER,
  memberCount: 12,
  stopConditions: [
    "primitive-control-failure",
    "nonpositive-square-root-domain",
    "nonfinite-interval",
    "dense-residual-escape",
  ],
});
const predeclarationSha256 = crypto
  .createHash("sha256")
  .update(JSON.stringify(predeclaration))
  .digest("hex");

const bitsBuffer = new ArrayBuffer(8);
const bitsView = new DataView(bitsBuffer);

function nextUp(value) {
  if (Number.isNaN(value) || value === Infinity) return value;
  if (value === 0) return Number.MIN_VALUE;
  bitsView.setFloat64(0, value, false);
  let bits = bitsView.getBigUint64(0, false);
  bits = value > 0 ? bits + 1n : bits - 1n;
  bitsView.setBigUint64(0, bits, false);
  return bitsView.getFloat64(0, false);
}

function nextDown(value) {
  if (Number.isNaN(value) || value === -Infinity) return value;
  if (value === 0) return -Number.MIN_VALUE;
  bitsView.setFloat64(0, value, false);
  let bits = bitsView.getBigUint64(0, false);
  bits = value > 0 ? bits - 1n : bits + 1n;
  bitsView.setBigUint64(0, bits, false);
  return bitsView.getFloat64(0, false);
}

function interval(lo, hi = lo) {
  if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo > hi) {
    throw new RangeError(`invalid finite interval [${lo}, ${hi}]`);
  }
  return { lo, hi };
}

function iAdd(left, right) {
  return interval(nextDown(left.lo + right.lo), nextUp(left.hi + right.hi));
}

function iNeg(value) {
  return interval(nextDown(-value.hi), nextUp(-value.lo));
}

function iSub(left, right) {
  return iAdd(left, iNeg(right));
}

function iMul(left, right) {
  const products = [
    left.lo * right.lo,
    left.lo * right.hi,
    left.hi * right.lo,
    left.hi * right.hi,
  ];
  if (products.some((value) => !Number.isFinite(value))) {
    throw new RangeError("nonfinite interval product");
  }
  return interval(nextDown(Math.min(...products)), nextUp(Math.max(...products)));
}

function iScale(value, scalar) {
  return iMul(value, interval(scalar));
}

function iReciprocal(value) {
  if (value.lo <= 0 && value.hi >= 0) {
    throw new RangeError(`interval reciprocal crosses zero [${value.lo}, ${value.hi}]`);
  }
  return interval(
    nextDown(Math.min(1 / value.lo, 1 / value.hi)),
    nextUp(Math.max(1 / value.lo, 1 / value.hi)),
  );
}

function iDiv(left, right) {
  return iMul(left, iReciprocal(right));
}

function iSqrt(value) {
  if (!(value.lo > 0)) {
    throw new RangeError(`square-root interval is not strictly positive [${value.lo}, ${value.hi}]`);
  }
  return interval(nextDown(Math.sqrt(value.lo)), nextUp(Math.sqrt(value.hi)));
}

function includesPeriodicPoint(lo, hi, base, period) {
  const first = Math.ceil((lo - base) / period);
  const last = Math.floor((hi - base) / period);
  return first <= last;
}

function iSin(value) {
  if (value.hi - value.lo >= TAU) return interval(-1, 1);
  let lo = Math.min(Math.sin(value.lo), Math.sin(value.hi));
  let hi = Math.max(Math.sin(value.lo), Math.sin(value.hi));
  if (includesPeriodicPoint(value.lo, value.hi, PI / 2, TAU)) hi = 1;
  if (includesPeriodicPoint(value.lo, value.hi, -PI / 2, TAU)) lo = -1;
  return interval(nextDown(lo), nextUp(hi));
}

function iCos(value) {
  if (value.hi - value.lo >= TAU) return interval(-1, 1);
  let lo = Math.min(Math.cos(value.lo), Math.cos(value.hi));
  let hi = Math.max(Math.cos(value.lo), Math.cos(value.hi));
  if (includesPeriodicPoint(value.lo, value.hi, 0, TAU)) hi = 1;
  if (includesPeriodicPoint(value.lo, value.hi, PI, TAU)) lo = -1;
  return interval(nextDown(lo), nextUp(hi));
}

function iMaxAbs(value) {
  return Math.max(Math.abs(value.lo), Math.abs(value.hi));
}

function iPow(value, exponent) {
  if (!Number.isInteger(exponent) || exponent < 0) {
    throw new RangeError("interval power requires a nonnegative integer exponent");
  }
  let result = interval(1);
  for (let index = 0; index < exponent; index += 1) {
    result = iMul(result, value);
  }
  return result;
}

function iContains(container, contained) {
  return container.lo <= contained.lo && container.hi >= contained.hi;
}

function zeroTaylor() {
  return Array.from({ length: ORDER + 1 }, () => interval(0));
}

function tConstant(value) {
  const result = zeroTaylor();
  result[0] = typeof value === "number" ? interval(value) : value;
  return result;
}

function tVariable(domain) {
  const result = tConstant(domain);
  result[1] = interval(1);
  return result;
}

function asTaylor(value) {
  return Array.isArray(value) ? value : tConstant(value);
}

function tAdd(leftRaw, rightRaw) {
  const left = asTaylor(leftRaw);
  const right = asTaylor(rightRaw);
  return left.map((value, index) => iAdd(value, right[index]));
}

function tNeg(valueRaw) {
  return asTaylor(valueRaw).map(iNeg);
}

function tSub(left, right) {
  return tAdd(left, tNeg(right));
}

function tMul(leftRaw, rightRaw) {
  const left = asTaylor(leftRaw);
  const right = asTaylor(rightRaw);
  const result = zeroTaylor();
  for (let order = 0; order <= ORDER; order += 1) {
    for (let index = 0; index <= order; index += 1) {
      result[order] = iAdd(result[order], iMul(left[index], right[order - index]));
    }
  }
  return result;
}

function tScale(value, scalar) {
  return asTaylor(value).map((coefficient) => iScale(coefficient, scalar));
}

function tReciprocal(valueRaw) {
  const value = asTaylor(valueRaw);
  const result = zeroTaylor();
  result[0] = iReciprocal(value[0]);
  for (let order = 1; order <= ORDER; order += 1) {
    let sum = interval(0);
    for (let index = 1; index <= order; index += 1) {
      sum = iAdd(sum, iMul(value[index], result[order - index]));
    }
    result[order] = iNeg(iDiv(sum, value[0]));
  }
  return result;
}

function tDiv(left, right) {
  return tMul(left, tReciprocal(right));
}

function tSqrt(valueRaw) {
  const value = asTaylor(valueRaw);
  const result = zeroTaylor();
  result[0] = iSqrt(value[0]);
  for (let order = 1; order <= ORDER; order += 1) {
    let convolution = interval(0);
    for (let index = 1; index < order; index += 1) {
      convolution = iAdd(
        convolution,
        iMul(result[index], result[order - index]),
      );
    }
    result[order] = iDiv(
      iSub(value[order], convolution),
      iScale(result[0], 2),
    );
  }
  return result;
}

function tSinCos(valueRaw) {
  const value = asTaylor(valueRaw);
  const sine = zeroTaylor();
  const cosine = zeroTaylor();
  sine[0] = iSin(value[0]);
  cosine[0] = iCos(value[0]);
  for (let order = 0; order < ORDER; order += 1) {
    let sineDerivativeCoefficient = interval(0);
    let cosineDerivativeCoefficient = interval(0);
    for (let index = 0; index <= order; index += 1) {
      const derivative = iScale(value[order - index + 1], order - index + 1);
      sineDerivativeCoefficient = iAdd(
        sineDerivativeCoefficient,
        iMul(cosine[index], derivative),
      );
      cosineDerivativeCoefficient = iSub(
        cosineDerivativeCoefficient,
        iMul(sine[index], derivative),
      );
    }
    sine[order + 1] = iScale(sineDerivativeCoefficient, 1 / (order + 1));
    cosine[order + 1] = iScale(cosineDerivativeCoefficient, 1 / (order + 1));
  }
  return { sine, cosine };
}

function tSin(value) {
  return tSinCos(value).sine;
}

function tCos(value) {
  return tSinCos(value).cosine;
}

function vAdd(left, right) {
  return left.map((value, index) => tAdd(value, right[index]));
}

function vSub(left, right) {
  return left.map((value, index) => tSub(value, right[index]));
}

function vScale(value, scalar) {
  return value.map((component) => tMul(component, scalar));
}

function vDot(left, right) {
  return left.reduce(
    (sum, value, index) => tAdd(sum, tMul(value, right[index])),
    tConstant(0),
  );
}

function vCross(left, right) {
  return [
    tSub(tMul(left[1], right[2]), tMul(left[2], right[1])),
    tSub(tMul(left[2], right[0]), tMul(left[0], right[2])),
    tSub(tMul(left[0], right[1]), tMul(left[1], right[0])),
  ];
}

function memberDefinitions() {
  const definitions = [];
  for (const sector of [
    { name: "positive", polarity: 1, amplitude: 0.24, phase: 0, signs: [-1, -1, 1] },
    { name: "negative", polarity: -1, amplitude: 0.27, phase: NEGATIVE_PHASE, signs: [-1, -1, 1] },
  ]) {
    for (let axisIndex = 0; axisIndex < 3; axisIndex += 1) {
      for (const ringIndex of [1, 2]) {
        definitions.push({
          worldlineId: `f5-axis-${axisIndex + 1}-ring-${ringIndex}-${sector.name}-worldline`,
          polarity: sector.polarity,
          amplitude: sector.amplitude,
          phase: sector.phase,
          branchSign: sector.signs[axisIndex],
          axisIndex,
          ringIndex,
        });
      }
    }
  }
  return definitions;
}

function intervalPosition(member, timeDomain) {
  const time = tVariable(timeDomain);
  const theta = tAdd(tScale(time, OMEGA), member.phase);
  const phases = [theta, tAdd(theta, -2 * PI / 3), tAdd(theta, 2 * PI / 3)];
  const [u, v, w] = phases.map((phase) => tScale(tCos(phase), member.amplitude));
  const zero = tConstant(0);
  const resultants = [[zero, v, w], [u, zero, tNeg(w)], [tNeg(u), tNeg(v), zero]];
  const axes = [
    [tConstant(1), zero, zero],
    [zero, tConstant(1), zero],
    [zero, zero, tConstant(1)],
  ];
  const axis = axes[member.axisIndex];
  const resultant = resultants[member.axisIndex];
  const kappa = tSqrt(vDot(resultant, resultant));
  const e = vScale(resultant, tReciprocal(kappa));
  const tangent = vCross(axis, e);
  const difference = RHO1 ** 2 - RHO2 ** 2;
  const alpha = tDiv(tAdd(tMul(kappa, kappa), difference), tScale(kappa, 2));
  const beta = tSqrt(tSub(RHO1 ** 2, tMul(alpha, alpha)));
  const firstRing = member.ringIndex === 1;
  const transverse = firstRing
    ? vAdd(vScale(e, alpha), vScale(tangent, tScale(beta, member.branchSign)))
    : vSub(
      vScale(e, tSub(kappa, alpha)),
      vScale(tangent, tScale(beta, member.branchSign)),
    );
  const axialSign = firstRing ? member.polarity : -member.polarity;
  return vAdd(vScale(axis, axialSign * H), transverse);
}

function numberState(member, time) {
  const theta = OMEGA * time + member.phase;
  const phases = [theta, theta - 2 * PI / 3, theta + 2 * PI / 3];
  const [u, v, w] = phases.map((phase) => member.amplitude * Math.cos(phase));
  const [uDot, vDot, wDot] = phases.map(
    (phase) => -member.amplitude * OMEGA * Math.sin(phase),
  );
  const resultants = [[0, v, w], [u, 0, -w], [-u, -v, 0]];
  const rates = [[0, vDot, wDot], [uDot, 0, -wDot], [-uDot, -vDot, 0]];
  const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const axis = axes[member.axisIndex];
  const resultant = resultants[member.axisIndex];
  const rate = rates[member.axisIndex];
  const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
  const scale = (value, scalar) => value.map((component) => component * scalar);
  const add = (left, right) => left.map((value, index) => value + right[index]);
  const subtract = (left, right) => left.map((value, index) => value - right[index]);
  const cross = (left, right) => [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
  const kappa = Math.sqrt(dot(resultant, resultant));
  const e = scale(resultant, 1 / kappa);
  const kappaDot = dot(e, rate);
  const eDot = scale(subtract(rate, scale(e, kappaDot)), 1 / kappa);
  const tangent = cross(axis, e);
  const tangentDot = cross(axis, eDot);
  const difference = RHO1 ** 2 - RHO2 ** 2;
  const alpha = (kappa ** 2 + difference) / (2 * kappa);
  const alphaDot = 0.5 * kappaDot - 0.5 * difference * kappaDot / kappa ** 2;
  const beta = Math.sqrt(RHO1 ** 2 - alpha ** 2);
  const betaDot = -alpha * alphaDot / beta;
  const branchRate = add(scale(tangent, betaDot), scale(tangentDot, beta));
  const firstRing = member.ringIndex === 1;
  const transverse = firstRing
    ? add(scale(e, alpha), scale(tangent, member.branchSign * beta))
    : subtract(scale(e, kappa - alpha), scale(tangent, member.branchSign * beta));
  const transverseRate = firstRing
    ? add(add(scale(e, alphaDot), scale(eDot, alpha)), scale(branchRate, member.branchSign))
    : subtract(
      add(scale(e, kappaDot - alphaDot), scale(eDot, kappa - alpha)),
      scale(branchRate, member.branchSign),
    );
  const axialSign = firstRing ? member.polarity : -member.polarity;
  return {
    position: add(scale(axis, axialSign * H), transverse),
    velocity: transverseRate,
  };
}

function hermiteSegment(member, start, end) {
  const left = numberState(member, start);
  const right = numberState(member, end);
  const duration = end - start;
  const coefficients = left.position.map((position, axis) => {
    const delta = right.position[axis] - position;
    return [
      position,
      left.velocity[axis],
      3 * delta / duration ** 2 - (2 * left.velocity[axis] + right.velocity[axis]) / duration,
      -2 * delta / duration ** 3 + (left.velocity[axis] + right.velocity[axis]) / duration ** 2,
    ];
  });
  return { start, end, coefficients };
}

function evaluateHermite(segment, time) {
  const local = time - segment.start;
  return {
    position: segment.coefficients.map((row) => ((row[3] * local + row[2]) * local + row[1]) * local + row[0]),
    velocity: segment.coefficients.map((row) => (3 * row[3] * local + 2 * row[2]) * local + row[1]),
  };
}

function primitiveControls() {
  const domain = interval(-0.01, 0.01);
  const shiftedDomain = iAdd(interval(2), domain);
  const variable = tVariable(domain);
  const polynomial = tMul(tMul(variable, variable), tMul(variable, variable));
  const sine = tSin(variable);
  const cosine = tCos(variable);
  const reciprocal = tReciprocal(tAdd(2, variable));
  const squareRoot = tSqrt(tAdd(2, variable));
  const controls = [
    { name: "quartic", actual: interval(24), enclosed: iScale(polynomial[4], 24) },
    { name: "sine", actual: iSin(domain), enclosed: iScale(sine[4], 24) },
    { name: "cosine", actual: iCos(domain), enclosed: iScale(cosine[4], 24) },
    {
      name: "reciprocal",
      actual: iScale(iReciprocal(iPow(shiftedDomain, 5)), 24),
      enclosed: iScale(reciprocal[4], 24),
    },
    {
      name: "positive-square-root",
      actual: iScale(
        iReciprocal(iMul(iSqrt(shiftedDomain), iPow(shiftedDomain, 3))),
        -15 / 16,
      ),
      enclosed: iScale(squareRoot[4], 24),
    },
  ];
  return controls.map((control) => ({
    ...control,
    passed: iContains(control.enclosed, control.actual),
  }));
}

const controls = primitiveControls();
if (controls.some((control) => !control.passed)) {
  throw new Error(`primitive interval-Taylor control failed: ${JSON.stringify(controls)}`);
}

const segmentCount = Math.ceil((PERIOD - HISTORY_START) / MAXIMUM_SEGMENT_STEP);
const actualSegmentStep = (PERIOD - HISTORY_START) / segmentCount;
const members = memberDefinitions();
const memberBounds = [];
let globalFourthDerivativeBound = 0;
process.stderr.write(`${new Date().toISOString()} stage=interval-derivative members=0/12\n`);
for (const [memberIndex, member] of members.entries()) {
  const axisBounds = [0, 0, 0];
  for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
    const start = HISTORY_START + actualSegmentStep * segmentIndex;
    const end = segmentIndex + 1 === segmentCount
      ? PERIOD
      : HISTORY_START + actualSegmentStep * (segmentIndex + 1);
    const position = intervalPosition(member, interval(start, end));
    for (let axis = 0; axis < 3; axis += 1) {
      const bound = 24 * iMaxAbs(position[axis][4]);
      axisBounds[axis] = Math.max(axisBounds[axis], bound);
      globalFourthDerivativeBound = Math.max(globalFourthDerivativeBound, bound);
    }
  }
  memberBounds.push({ worldlineId: member.worldlineId, axisBounds });
  process.stderr.write(
    `${new Date().toISOString()} stage=interval-derivative members=${memberIndex + 1}/12 globalM4=${globalFourthDerivativeBound}\n`,
  );
}

const roundoffPosition = 64 * Number.EPSILON * Math.max(1, DISPLAY_RADIUS_BOUND);
const roundoffVelocity = 64 * Number.EPSILON * Math.max(1, SPEED_BOUND);
const positionError = globalFourthDerivativeBound * MAXIMUM_SEGMENT_STEP ** 4 / 300
  + roundoffPosition;
const velocityError = globalFourthDerivativeBound * MAXIMUM_SEGMENT_STEP ** 3 / 8
  + roundoffVelocity;

let maximumDensePositionResidual = 0;
let maximumDenseVelocityResidual = 0;
const denseRows = [];
process.stderr.write(`${new Date().toISOString()} stage=dense-residual members=0/12\n`);
for (const [memberIndex, member] of members.entries()) {
  const segments = Array.from({ length: segmentCount }, (_, segmentIndex) => {
    const start = HISTORY_START + actualSegmentStep * segmentIndex;
    const end = segmentIndex + 1 === segmentCount
      ? PERIOD
      : HISTORY_START + actualSegmentStep * (segmentIndex + 1);
    return hermiteSegment(member, start, end);
  });
  let memberPositionResidual = 0;
  let memberVelocityResidual = 0;
  for (let sample = 0; sample < DENSE_SAMPLES_PER_MEMBER; sample += 1) {
    const time = HISTORY_START + (PERIOD - HISTORY_START) * sample / DENSE_SAMPLES_PER_MEMBER;
    const segmentIndex = Math.min(
      segmentCount - 1,
      Math.floor((time - HISTORY_START) / actualSegmentStep),
    );
    const exact = numberState(member, time);
    const cubic = evaluateHermite(segments[segmentIndex], time);
    for (let axis = 0; axis < 3; axis += 1) {
      memberPositionResidual = Math.max(
        memberPositionResidual,
        Math.abs(exact.position[axis] - cubic.position[axis]),
      );
      memberVelocityResidual = Math.max(
        memberVelocityResidual,
        Math.abs(exact.velocity[axis] - cubic.velocity[axis]),
      );
    }
  }
  maximumDensePositionResidual = Math.max(maximumDensePositionResidual, memberPositionResidual);
  maximumDenseVelocityResidual = Math.max(maximumDenseVelocityResidual, memberVelocityResidual);
  denseRows.push({
    worldlineId: member.worldlineId,
    maximumPositionResidual: memberPositionResidual,
    maximumVelocityResidual: memberVelocityResidual,
  });
  process.stderr.write(
    `${new Date().toISOString()} stage=dense-residual members=${memberIndex + 1}/12 position=${memberPositionResidual} velocity=${memberVelocityResidual}\n`,
  );
}

const denseResidualPassed = maximumDensePositionResidual <= positionError
  && maximumDenseVelocityResidual <= velocityError;
if (!denseResidualPassed) {
  throw new Error(
    `dense residual escaped enclosure: position ${maximumDensePositionResidual}/${positionError}, velocity ${maximumDenseVelocityResidual}/${velocityError}`,
  );
}

const record = {
  schema: "f5_hermite_interval_enclosure/v1",
  predeclaration,
  predeclarationSha256,
  controls,
  segmentCount,
  actualSegmentStep,
  memberBounds,
  globalFourthDerivativeBound,
  positionError,
  velocityError,
  denseRows,
  maximumDensePositionResidual,
  maximumDenseVelocityResidual,
  denseResidualPassed,
  claimGrade: {
    intervalDerivativeEnclosure: "derived",
    denseResidualCheck: "measured bug detector",
  },
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(record, null, 2)}\n`);
process.stderr.write(
  `${new Date().toISOString()} stage=complete globalM4=${globalFourthDerivativeBound} positionError=${positionError} velocityError=${velocityError} output=${outputPath}\n`,
);

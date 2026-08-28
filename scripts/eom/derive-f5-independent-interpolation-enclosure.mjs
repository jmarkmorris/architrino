#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const instrumentPath = fileURLToPath(import.meta.url);
const args = process.argv.slice(2);
if (args.length !== 2 || args[0] !== "--out" || !args[1]) {
  throw new Error(
    "usage: derive-f5-independent-interpolation-enclosure.mjs --out <new-path>",
  );
}
const outputPath = path.resolve(root, args[1]);
const configPath = path.resolve(root, "reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json");

const bindings = [
  ["f5-approved-row", "reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json", "e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb"],
  ["f5-h3-predeclaration", "reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md", "1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5"],
  ["f5-independent-guard", "scripts/eom/analyze-f5-phase-varying-guard-margin.mjs", "aab128d5abbd248fb1879ad6dba71844951593b3ef636d67742729bbff886dfd"],
  ["f5-production-operator", "src/prescribed-geometry/PrescribedWorldlineOperators.mjs", "f641daba8184c7e997478494d1642291d40fd6a6d365c289c6ee8b6637ef0a01"],
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

const sourceChecks = bindings.map(([id, relativePath, expectedSha256]) => {
  const actualSha256 = sha256(path.resolve(root, relativePath));
  return { id, path: relativePath, expectedSha256, actualSha256, pass: actualSha256 === expectedSha256 };
});
if (!sourceChecks.every((row) => row.pass)) throw new Error("frozen source binding mismatch");

const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
function nextUp(x) {
  if (Number.isNaN(x) || x === Infinity) return x;
  if (Object.is(x, -0)) x = 0;
  if (x === 0) return Number.MIN_VALUE;
  view.setFloat64(0, x, false);
  let bits = view.getBigUint64(0, false);
  bits += x > 0 ? 1n : -1n;
  view.setBigUint64(0, bits, false);
  return view.getFloat64(0, false);
}
function nextDown(x) {
  if (Number.isNaN(x) || x === -Infinity) return x;
  if (Object.is(x, 0)) x = -0;
  if (Object.is(x, -0)) return -Number.MIN_VALUE;
  view.setFloat64(0, x, false);
  let bits = view.getBigUint64(0, false);
  bits += x > 0 ? -1n : 1n;
  view.setBigUint64(0, bits, false);
  return view.getFloat64(0, false);
}
function padDown(x, units = 1) { for (let i = 0; i < units; i += 1) x = nextDown(x); return x; }
function padUp(x, units = 1) { for (let i = 0; i < units; i += 1) x = nextUp(x); return x; }

const I = (lo, hi = lo) => {
  if (!(Number.isFinite(lo) && Number.isFinite(hi) && lo <= hi)) throw new Error(`invalid interval [${lo},${hi}]`);
  return { lo, hi };
};
const addI = (a, b) => I(nextDown(a.lo + b.lo), nextUp(a.hi + b.hi));
const negI = (a) => I(-a.hi, -a.lo);
const subI = (a, b) => addI(a, negI(b));
function mulI(a, b) {
  const xs = [a.lo * b.lo, a.lo * b.hi, a.hi * b.lo, a.hi * b.hi];
  return I(nextDown(Math.min(...xs)), nextUp(Math.max(...xs)));
}
function reciprocalI(a) {
  if (a.lo <= 0 && a.hi >= 0) throw new Error(`reciprocal interval contains zero [${a.lo},${a.hi}]`);
  return I(nextDown(1 / a.hi), nextUp(1 / a.lo));
}
const divI = (a, b) => mulI(a, reciprocalI(b));
const scaleI = (a, x) => mulI(a, I(x));
const sqrtAudit = { calls: 0, minimumInputLowerBound: Infinity };
function sqrtI(a) {
  if (!(a.lo > 0)) throw new Error(`sqrt interval is not strictly positive [${a.lo},${a.hi}]`);
  sqrtAudit.calls += 1;
  sqrtAudit.minimumInputLowerBound = Math.min(sqrtAudit.minimumInputLowerBound, a.lo);
  return I(nextDown(Math.sqrt(a.lo)), nextUp(Math.sqrt(a.hi)));
}
function absMaxI(a) { return Math.max(Math.abs(a.lo), Math.abs(a.hi)); }
function containsI(a, x) { return a.lo <= x && x <= a.hi; }

function trigPointSeries(x, kind) {
  const xI = I(x);
  const negativeX2 = negI(mulI(xI, xI));
  let term = kind === "sin" ? xI : I(1);
  let sum = term;
  const terms = 80;
  for (let n = 0; n < terms; n += 1) {
    const denominator = kind === "sin"
      ? (2*n + 2) * (2*n + 3)
      : (2*n + 1) * (2*n + 2);
    term = divI(mulI(term, negativeX2), I(denominator));
    sum = addI(sum, term);
  }
  const tail = absMaxI(term);
  return addI(sum, I(-tail, tail));
}
function trigInterval(a, kind) {
  // A rigorous global range follows from a rigorously enclosed Taylor value at
  // the interval midpoint and the one-Lipschitz bound for sine and cosine.
  const midpoint = (a.lo + a.hi) / 2;
  const midpointValue = trigPointSeries(midpoint, kind);
  const radius = nextUp(Math.max(midpoint - a.lo, a.hi - midpoint));
  const range = addI(midpointValue, I(-radius, radius));
  return I(Math.max(-1, range.lo), Math.min(1, range.hi));
}

const ORDER = 4;
const zeroJet = () => Array.from({ length: ORDER + 1 }, () => I(0));
function variableJet(lo, hi) { const x = zeroJet(); x[0] = I(lo, hi); x[1] = I(1); return x; }
function constantJet(x) { const a = zeroJet(); a[0] = I(x); return a; }
function addJ(a, b) { return a.map((x, n) => addI(x, b[n])); }
function negJ(a) { return a.map(negI); }
function subJ(a, b) { return addJ(a, negJ(b)); }
function mulJ(a, b) {
  const out = zeroJet();
  for (let n = 0; n <= ORDER; n += 1) {
    for (let k = 0; k <= n; k += 1) out[n] = addI(out[n], mulI(a[k], b[n - k]));
  }
  return out;
}
function scaleJ(a, x) { return a.map((v) => scaleI(v, x)); }
function reciprocalJ(a) {
  const out = zeroJet();
  out[0] = reciprocalI(a[0]);
  for (let n = 1; n <= ORDER; n += 1) {
    let sum = I(0);
    for (let k = 1; k <= n; k += 1) sum = addI(sum, mulI(a[k], out[n - k]));
    out[n] = negI(mulI(out[0], sum));
  }
  return out;
}
function divJ(a, b) { return mulJ(a, reciprocalJ(b)); }
function sqrtJ(a) {
  const out = zeroJet();
  out[0] = sqrtI(a[0]);
  for (let n = 1; n <= ORDER; n += 1) {
    let sum = I(0);
    for (let k = 1; k < n; k += 1) sum = addI(sum, mulI(out[k], out[n - k]));
    out[n] = divI(subI(a[n], sum), scaleI(out[0], 2));
  }
  return out;
}
function sinCosJ(a) {
  const s = zeroJet();
  const c = zeroJet();
  s[0] = trigInterval(a[0], "sin");
  c[0] = trigInterval(a[0], "cos");
  for (let n = 1; n <= ORDER; n += 1) {
    let ss = I(0);
    let cc = I(0);
    for (let k = 1; k <= n; k += 1) {
      ss = addI(ss, scaleI(mulI(a[k], c[n - k]), k));
      cc = addI(cc, scaleI(mulI(a[k], s[n - k]), k));
    }
    s[n] = divI(ss, I(n));
    c[n] = divI(negI(cc), I(n));
  }
  return { sin: s, cos: c };
}

function sampleRange(lo, hi, count, fn) {
  for (let j = 0; j < count; j += 1) fn(lo + (hi - lo) * j / (count - 1));
}
function checkJet(name, jet, exact, lo, hi) {
  let failures = 0;
  let comparisons = 0;
  sampleRange(lo, hi, 4097, (x) => {
    for (let n = 0; n <= ORDER; n += 1) {
      comparisons += 1;
      if (!containsI(jet[n], exact(x, n))) failures += 1;
    }
  });
  return { name, comparisons, failures, pass: failures === 0, coefficientIntervals: jet };
}
function primitiveControls() {
  const x = variableJet(-0.2, 0.3);
  const constant = constantJet(7 / 13);
  const polynomial = addJ(addJ(addJ(addJ(constantJet(3), scaleJ(x, 2)), negJ(mulJ(x, x))), scaleJ(mulJ(mulJ(x, x), x), 0.5)), scaleJ(mulJ(mulJ(x, x), mulJ(x, x)), 0.25));
  const { sin, cos } = sinCosJ(x);
  const shifted = addJ(constantJet(2), x);
  const reciprocal = reciprocalJ(shifted);
  const squareRoot = sqrtJ(shifted);
  const binomialHalf = [1, 0.5, -0.125, 0.0625, -0.0390625];
  return [
    checkJet("constant", constant, (_x, n) => n === 0 ? 7 / 13 : 0, -0.2, 0.3),
    checkJet("polynomial", polynomial, (t, n) => {
      if (n === 0) return 3 + 2*t - t*t + 0.5*t**3 + 0.25*t**4;
      if (n === 1) return 2 - 2*t + 1.5*t*t + t**3;
      if (n === 2) return (-2 + 3*t + 3*t*t) / 2;
      if (n === 3) return (3 + 6*t) / 6;
      return 6 / 24;
    }, -0.2, 0.3),
    checkJet("sine", sin, (t, n) => [Math.sin(t), Math.cos(t), -Math.sin(t)/2, -Math.cos(t)/6, Math.sin(t)/24][n], -0.2, 0.3),
    checkJet("cosine", cos, (t, n) => [Math.cos(t), -Math.sin(t), -Math.cos(t)/2, Math.sin(t)/6, Math.cos(t)/24][n], -0.2, 0.3),
    checkJet("reciprocal", reciprocal, (t, n) => ((n % 2 ? -1 : 1) / ((2 + t) ** (n + 1))), -0.2, 0.3),
    checkJet("positive-square-root", squareRoot, (t, n) => binomialHalf[n] * ((2 + t) ** (0.5 - n)), -0.2, 0.3),
  ];
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const worldlines = config.worldlines;
if (worldlines.length !== 12) throw new Error("approved F5 row does not contain twelve worldlines");
const start = config.history.start;
// The frozen predeclaration requires the analytic enclosure on [-1,P].  This
// deliberately covers a one-unit superset of the serialized display interval
// [-1,P-1]; the harmonic map is all-real and periodic.
const end = config.history.returnPeriod;
const maxInterval = config.interpolation.interval;
const positionDivisor = config.interpolation.positionDivisor;
const velocityDivisor = config.interpolation.velocityDivisor;
const roundoffMultiplier = config.interpolation.roundoffMultiplier;
if (!(start === -1 && config.history.end === 18.63359163663986 && end === 19.63359163663986 && maxInterval === 0.02 && positionDivisor === 300 && velocityDivisor === 8 && roundoffMultiplier === 64)) {
  throw new Error("approved interpolation row differs from the frozen predeclaration");
}

const axes = [[1,0,0],[0,1,0],[0,0,1]];
const addVJ = (a, b) => a.map((x, i) => addJ(x, b[i]));
const subVJ = (a, b) => a.map((x, i) => subJ(x, b[i]));
const scaleVJ = (a, s) => a.map((x) => mulJ(x, s));
const dotVJ = (a, b) => a.reduce((sum, x, i) => addJ(sum, mulJ(x, b[i])), constantJet(0));
const crossVJ = (a, b) => [subJ(mulJ(a[1], b[2]), mulJ(a[2], b[1])), subJ(mulJ(a[2], b[0]), mulJ(a[0], b[2])), subJ(mulJ(a[0], b[1]), mulJ(a[1], b[0]))];

function memberJet(raw, lo, hi) {
  const t = variableJet(lo, hi);
  const theta = addJ(scaleJ(t, raw.resultantAngularFrequency), constantJet(raw.resultantPhase));
  const u = scaleJ(sinCosJ(theta).cos, raw.resultantAmplitude);
  const v = scaleJ(sinCosJ(addJ(theta, constantJet(-2 * Math.PI / 3))).cos, raw.resultantAmplitude);
  const w = scaleJ(sinCosJ(addJ(theta, constantJet(2 * Math.PI / 3))).cos, raw.resultantAmplitude);
  const z = constantJet(0);
  const resultants = [[z,v,w],[u,z,negJ(w)],[negJ(u),negJ(v),z]];
  const c = resultants[raw.axisIndex];
  const kappa = sqrtJ(dotVJ(c, c));
  const e = c.map((component) => divJ(component, kappa));
  const n = axes[raw.axisIndex].map(constantJet);
  const tangent = crossVJ(n, e);
  const D = raw.transverseRadii[0] ** 2 - raw.transverseRadii[1] ** 2;
  const alpha = divJ(addJ(mulJ(kappa, kappa), constantJet(D)), scaleJ(kappa, 2));
  const beta = sqrtJ(subJ(constantJet(raw.transverseRadii[0] ** 2), mulJ(alpha, alpha)));
  const branch = addVJ(scaleVJ(e, alpha), scaleVJ(tangent, scaleJ(beta, raw.branchSign)));
  const r = raw.ringIndex === 1 ? branch : subVJ(c, branch);
  const epsilon = raw.ringIndex === 1 ? raw.polarity : -raw.polarity;
  return r.map((component, i) => addJ(component, constantJet(epsilon * raw.axialHalfSeparation * axes[raw.axisIndex][i])));
}

const addV = (a, b) => a.map((x, i) => x + b[i]);
const subV = (a, b) => a.map((x, i) => x - b[i]);
const scaleV = (a, s) => a.map((x) => x * s);
const dotV = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const normV = (a) => Math.sqrt(dotV(a, a));
const crossV = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];

function exactMember(raw, t) {
  const theta = raw.resultantAngularFrequency * t + raw.resultantPhase;
  const phases = [theta, theta - 2 * Math.PI / 3, theta + 2 * Math.PI / 3];
  const [u,v,w] = phases.map((phase) => raw.resultantAmplitude * Math.cos(phase));
  const [ud,vd,wd] = phases.map((phase) => -raw.resultantAmplitude * raw.resultantAngularFrequency * Math.sin(phase));
  const cs = [[0,v,w],[u,0,-w],[-u,-v,0]];
  const cds = [[0,vd,wd],[ud,0,-wd],[-ud,-vd,0]];
  const c = cs[raw.axisIndex];
  const cd = cds[raw.axisIndex];
  const n = axes[raw.axisIndex];
  const kappa = normV(c);
  const e = scaleV(c, 1 / kappa);
  const kappaDot = dotV(e, cd);
  const eDot = scaleV(subV(cd, scaleV(e, kappaDot)), 1 / kappa);
  const tangent = crossV(n, e);
  const tangentDot = crossV(n, eDot);
  const [rho1, rho2] = raw.transverseRadii;
  const D = rho1*rho1-rho2*rho2;
  const alpha = (kappa*kappa+D)/(2*kappa);
  const alphaDot = (0.5-D/(2*kappa*kappa))*kappaDot;
  const beta = Math.sqrt(rho1*rho1-alpha*alpha);
  const betaDot = -alpha*alphaDot/beta;
  const branch = addV(scaleV(e, alpha), scaleV(tangent, raw.branchSign*beta));
  const branchDot = addV(addV(scaleV(e, alphaDot), scaleV(eDot, alpha)), addV(scaleV(tangent, raw.branchSign*betaDot), scaleV(tangentDot, raw.branchSign*beta)));
  const r = raw.ringIndex === 1 ? branch : subV(c, branch);
  const rd = raw.ringIndex === 1 ? branchDot : subV(cd, branchDot);
  const epsilon = raw.ringIndex === 1 ? raw.polarity : -raw.polarity;
  return { position: addV(scaleV(n, epsilon*raw.axialHalfSeparation), r), velocity: rd };
}

const controls = primitiveControls();
if (!controls.every((row) => row.pass)) throw new Error("primitive control failure");

const segmentCount = Math.ceil((end - start) / maxInterval);
const segmentWidth = (end - start) / segmentCount;
const segments = [];
let globalFourthDerivativeBound = 0;
let maximumPositionMagnitude = 0;
let maximumVelocityMagnitude = 0;
for (let index = 0; index < segmentCount; index += 1) {
  const lo = start + segmentWidth * index;
  const hi = index + 1 === segmentCount ? end : start + segmentWidth * (index + 1);
  let segmentFourthDerivativeBound = 0;
  for (const worldline of worldlines) {
    const jets = memberJet(worldline.operator, lo, hi);
    for (const axisJet of jets) {
      segmentFourthDerivativeBound = Math.max(segmentFourthDerivativeBound, 24 * absMaxI(axisJet[4]));
      maximumPositionMagnitude = Math.max(maximumPositionMagnitude, absMaxI(axisJet[0]));
      maximumVelocityMagnitude = Math.max(maximumVelocityMagnitude, absMaxI(axisJet[1]));
    }
  }
  globalFourthDerivativeBound = Math.max(globalFourthDerivativeBound, segmentFourthDerivativeBound);
  segments.push({ index, start: lo, end: hi, width: hi - lo, fourthDerivativeBound: segmentFourthDerivativeBound });
}

const binary64RoundoffPosition = roundoffMultiplier * Number.EPSILON * Math.max(1, maximumPositionMagnitude);
const binary64RoundoffVelocity = roundoffMultiplier * Number.EPSILON * Math.max(1, maximumVelocityMagnitude);
const actualMaximumSegmentWidth = Math.max(...segments.map((segment) => segment.width));
const widthI = I(actualMaximumSegmentWidth);
const width2I = mulI(widthI, widthI);
const width3I = mulI(width2I, widthI);
const width4I = mulI(width3I, widthI);
const positionWidth = addI(divI(mulI(I(globalFourthDerivativeBound), width4I), I(positionDivisor)), I(binary64RoundoffPosition)).hi;
const velocityWidth = addI(divI(mulI(I(globalFourthDerivativeBound), width3I), I(velocityDivisor)), I(binary64RoundoffVelocity)).hi;

function hermite(a, b, fa, fb, t) {
  const h = b - a;
  const s = (t - a) / h;
  const s2 = s*s;
  const s3 = s2*s;
  const h00 = 2*s3 - 3*s2 + 1;
  const h10 = s3 - 2*s2 + s;
  const h01 = -2*s3 + 3*s2;
  const h11 = s3 - s2;
  const position = fa.position.map((x, axis) => h00*x + h10*h*fa.velocity[axis] + h01*fb.position[axis] + h11*h*fb.velocity[axis]);
  const velocity = fa.position.map((x, axis) => ((6*s2-6*s)/h)*x + (3*s2-4*s+1)*fa.velocity[axis] + ((-6*s2+6*s)/h)*fb.position[axis] + (3*s2-2*s)*fb.velocity[axis]);
  return { position, velocity };
}

const denseSamplesPerMember = 65536;
let maximumObservedPositionResidual = 0;
let maximumObservedVelocityResidual = 0;
let positionEscapeCount = 0;
let velocityEscapeCount = 0;
let nonFiniteCount = 0;
let exactEvaluations = 0;
const endpointCache = worldlines.map((worldline) => Array.from({ length: segmentCount + 1 }, (_, i) => exactMember(worldline.operator, i === segmentCount ? end : start + segmentWidth * i)));
for (let memberIndex = 0; memberIndex < worldlines.length; memberIndex += 1) {
  const raw = worldlines[memberIndex].operator;
  for (let j = 0; j < denseSamplesPerMember; j += 1) {
    const t = start + (end - start) * j / (denseSamplesPerMember - 1);
    const segmentIndex = Math.min(segmentCount - 1, Math.floor((t - start) / segmentWidth));
    const a = start + segmentWidth * segmentIndex;
    const b = segmentIndex + 1 === segmentCount ? end : start + segmentWidth * (segmentIndex + 1);
    const exact = exactMember(raw, t);
    const cubic = hermite(a, b, endpointCache[memberIndex][segmentIndex], endpointCache[memberIndex][segmentIndex + 1], t);
    exactEvaluations += 1;
    for (let axis = 0; axis < 3; axis += 1) {
      const pr = Math.abs(exact.position[axis] - cubic.position[axis]);
      const vr = Math.abs(exact.velocity[axis] - cubic.velocity[axis]);
      if (!(Number.isFinite(pr) && Number.isFinite(vr))) nonFiniteCount += 1;
      maximumObservedPositionResidual = Math.max(maximumObservedPositionResidual, pr);
      maximumObservedVelocityResidual = Math.max(maximumObservedVelocityResidual, vr);
      if (pr > positionWidth) positionEscapeCount += 1;
      if (vr > velocityWidth) velocityEscapeCount += 1;
    }
  }
}

const falsifiers = {
  sourceMismatch: sourceChecks.some((row) => !row.pass),
  primitiveControlFailure: controls.some((row) => !row.pass),
  nonpositiveSquareRootInterval: !(sqrtAudit.calls > 0 && sqrtAudit.minimumInputLowerBound > 0),
  infiniteInterval: !Number.isFinite(globalFourthDerivativeBound) || !Number.isFinite(positionWidth) || !Number.isFinite(velocityWidth) || nonFiniteCount > 0,
  densePositionEscape: positionEscapeCount > 0,
  denseVelocityEscape: velocityEscapeCount > 0,
};
const accepted = !Object.values(falsifiers).some(Boolean);
const report = {
  schema: "braid-program/f5-independent-interpolation-enclosure.v1",
  laneId: "f5-independent-enclosure",
  campaignId: "parallel-braid-prescribed-search-20260826-v1",
  status: accepted ? "independent-enclosure-passed" : "falsified",
  instrument: {
    pathWithinLaneAttempt: path.basename(instrumentPath),
    sha256: sha256(instrumentPath),
  },
  sourceChecks,
  method: {
    independence: "standalone report-lane instrument; imports neither the prescribed-worldline operator nor any root adapter",
    intervalArithmetic: "binary64 arithmetic rounded outward by adjacent representable values",
    transcendentalEnclosure: "80-term outward-rounded Maclaurin interval at each midpoint plus the global one-Lipschitz range bound; no libm value enters the proof enclosure",
    derivativeMethod: "factorial-normalized interval jets through order four over every segment",
    hermiteBounds: {
      maximumSegmentWidth: maxInterval,
      actualUniformSegmentWidth: segmentWidth,
      actualMaximumSegmentWidth,
      positionDivisor,
      velocityDivisor,
      binary64RoundoffMultiplier: roundoffMultiplier,
    },
    denseBugCheck: "independently coded scalar position/tangent and cubic-Hermite evaluator",
  },
  primitiveControls: controls,
  coverage: {
    interval: [start, end],
    serializedDisplayInterval: [config.history.start, config.history.end],
    intervalRelation: "the frozen predeclaration interval [-1,P] strictly contains the serialized display interval [-1,P-1]",
    memberCount: worldlines.length,
    cartesianAxisCount: 3,
    segmentCount,
    derivativeRows: segmentCount * worldlines.length * 3,
    denseSamplesPerMember,
    denseMemberSamples: denseSamplesPerMember * worldlines.length,
    denseScalarResidualsPerQuantity: denseSamplesPerMember * worldlines.length * 3,
  },
  enclosure: {
    squareRootIntervalCalls: sqrtAudit.calls,
    minimumSquareRootInputLowerBound: sqrtAudit.minimumInputLowerBound,
    globalFourthDerivativeBound,
    maximumPositionMagnitude,
    maximumVelocityMagnitude,
    binary64RoundoffPosition,
    binary64RoundoffVelocity,
    positionWidth,
    velocityWidth,
    maximumObservedPositionResidual,
    maximumObservedVelocityResidual,
    positionSlackRatio: positionWidth / maximumObservedPositionResidual,
    velocitySlackRatio: velocityWidth / maximumObservedVelocityResidual,
  },
  denseBugCheck: { exactEvaluations, nonFiniteCount, positionEscapeCount, velocityEscapeCount, pass: nonFiniteCount === 0 && positionEscapeCount === 0 && velocityEscapeCount === 0 },
  falsifiers,
  accepted,
  claimBoundary: {
    grade: "independent analytic-to-cubic interpolation enclosure for the frozen prescribed F5 row",
    establishes: ["finite position and velocity widths for each stored cubic segment", "dense residual non-escape under the declared bug check"],
    doesNotEstablish: ["H3 causal-root completeness", "ordinary EOM evolution", "binding", "retention", "stability", "candidate promotion", "particle identity", "physical realization"],
  },
  operatorDecisionRequired: accepted ? null : "Do not start the root-adapter batch; disposition the named falsifier first.",
  segments,
};

fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
console.log(JSON.stringify({ outputPath: path.relative(root, outputPath), accepted, enclosure: report.enclosure, denseBugCheck: report.denseBugCheck, falsifiers }, null, 2));

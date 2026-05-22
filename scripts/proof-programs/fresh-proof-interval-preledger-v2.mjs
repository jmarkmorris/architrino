#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-trig-range-v2`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v2`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const DEFAULT_SUBDIVISIONS = 32;
const SIN_TAYLOR_TERMS = 5;
const COS_TAYLOR_TERMS = 5;
const ENDPOINT_COS_CACHE = new Map();

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
    outDir: DEFAULT_OUT_DIR,
    subdivisions: DEFAULT_SUBDIVISIONS,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++i];
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--subdivisions") {
      args.subdivisions = Number.parseInt(argv[++i], 10);
      if (!Number.isSafeInteger(args.subdivisions) || args.subdivisions < 1) {
        throw new Error("--subdivisions must be a positive integer.");
      }
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v2.mjs [options]

Options:
  --contract PATH      Same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --phi-cyc PATH       Fresh phi_cyc candidate JSON. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH          Fresh shifted mesh JSON. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH  Fresh preledger input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --out-dir PATH       Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --subdivisions N     Uniform subintervals per mesh interval for row-specific X range enclosures. Defaults to ${DEFAULT_SUBDIVISIONS}.
  --pretty             Pretty-print JSON artifact.
  --help               Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function wrapJsonNumbers(source) {
  let wrapped = "";
  const tokens = [];
  let inString = false;
  let escaped = false;

  for (let i = 0; i < source.length; i += 1) {
    const ch = source[i];

    if (inString) {
      wrapped += ch;
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "\"") {
        inString = false;
      }
      continue;
    }

    if (ch === "\"") {
      inString = true;
      wrapped += ch;
      continue;
    }

    if (ch === "-" || (ch >= "0" && ch <= "9")) {
      const match = source.slice(i).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/u);
      if (!match) {
        throw new Error(`Invalid JSON number near offset ${i}`);
      }
      const token = match[0];
      tokens.push(token);
      wrapped += `{"__num":"${token}"}`;
      i += token.length - 1;
      continue;
    }

    wrapped += ch;
  }

  return { wrapped, tokens };
}

function readJsonLossless(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { wrapped, tokens } = wrapJsonNumbers(raw);
  return {
    data: JSON.parse(wrapped),
    path: filePath,
    sha256: sha256(raw),
    numericTokenCount: tokens.length,
    numericTokenSamples: tokens.slice(0, 12),
  };
}

function writeJson(filePath, value, pretty) {
  assertNoBigInt(value, filePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function assertNoBigInt(value, label) {
  const stack = [value];
  while (stack.length) {
    const next = stack.pop();
    if (typeof next === "bigint") {
      throw new Error(`BigInt leaked into JSON artifact ${label}`);
    }
    if (next && typeof next === "object") {
      for (const child of Object.values(next)) {
        stack.push(child);
      }
    }
  }
}

function isJsonNumberToken(value) {
  return Boolean(value && typeof value === "object" && typeof value.__num === "string");
}

function numberLexeme(value, label) {
  if (!isJsonNumberToken(value)) {
    throw new Error(`Expected JSON numeric token at ${label}`);
  }
  return value.__num;
}

function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
}

function rat(num, den = 1n) {
  if (den === 0n) {
    throw new Error("Zero rational denominator");
  }
  let n = num;
  let d = den;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

const Q_ZERO = rat(0n);
const Q_ONE = rat(1n);

function pow10(exp) {
  if (exp < 0) {
    throw new Error("Negative decimal exponent");
  }
  return 10n ** BigInt(exp);
}

function ratFromDecimal(lexeme) {
  let text = lexeme.trim();
  let sign = 1n;
  if (text.startsWith("-")) {
    sign = -1n;
    text = text.slice(1);
  } else if (text.startsWith("+")) {
    text = text.slice(1);
  }

  const [mantissa, exponentText = "0"] = text.toLowerCase().split("e");
  const exponent = Number.parseInt(exponentText, 10);
  if (!Number.isSafeInteger(exponent)) {
    throw new Error(`Unsupported decimal exponent in ${lexeme}`);
  }

  const pointIndex = mantissa.indexOf(".");
  const fractionalDigits = pointIndex === -1 ? 0 : mantissa.length - pointIndex - 1;
  const digits = mantissa.replace(".", "");
  const unsigned = BigInt(digits || "0");
  let num = sign * unsigned;
  let den = pow10(fractionalDigits);

  if (exponent > 0) {
    num *= pow10(exponent);
  } else if (exponent < 0) {
    den *= pow10(-exponent);
  }

  return rat(num, den);
}

function ratFromJsonNumber(value, label) {
  return ratFromDecimal(numberLexeme(value, label));
}

function intFromJsonNumber(value, label) {
  const q = ratFromJsonNumber(value, label);
  if (q.d !== 1n) {
    throw new Error(`Expected integer JSON token at ${label}`);
  }
  const asNumber = Number(q.n);
  if (!Number.isSafeInteger(asNumber)) {
    throw new Error(`Integer outside safe display range at ${label}`);
  }
  return asNumber;
}

function qAdd(a, b) {
  return rat(a.n * b.d + b.n * a.d, a.d * b.d);
}

function qSub(a, b) {
  return rat(a.n * b.d - b.n * a.d, a.d * b.d);
}

function qMul(a, b) {
  return rat(a.n * b.n, a.d * b.d);
}

function qDiv(a, b) {
  return rat(a.n * b.d, a.d * b.n);
}

function qNeg(a) {
  return rat(-a.n, a.d);
}

function qAbs(a) {
  return a.n < 0n ? qNeg(a) : a;
}

function qCmp(a, b) {
  const left = a.n * b.d;
  const right = b.n * a.d;
  return left < right ? -1 : left > right ? 1 : 0;
}

function qMin(a, b) {
  return qCmp(a, b) <= 0 ? a : b;
}

function qMax(a, b) {
  return qCmp(a, b) >= 0 ? a : b;
}

function qJson(q) {
  return { num: q.n.toString(), den: q.d.toString() };
}

function qFromJson(value) {
  return rat(BigInt(value.num), BigInt(value.den));
}

function qToFraction(q) {
  return `${q.n.toString()}/${q.d.toString()}`;
}

function qToDecimal(q, places = 15) {
  if (q.n === 0n) {
    return "0";
  }
  const sign = q.n < 0n ? "-" : "";
  const n = q.n < 0n ? -q.n : q.n;
  const integer = n / q.d;
  let rem = n % q.d;
  if (places <= 0 || rem === 0n) {
    return `${sign}${integer.toString()}`;
  }
  const scale = 10n ** BigInt(places);
  const frac = (rem * scale) / q.d;
  let fracText = frac.toString().padStart(places, "0").replace(/0+$/u, "");
  if (!fracText) {
    return `${sign}${integer.toString()}`;
  }
  return `${sign}${integer.toString()}.${fracText}`;
}

function intervalJson(interval) {
  return {
    lo: qJson(interval.lo),
    hi: qJson(interval.hi),
    display: [qToDecimal(interval.lo), qToDecimal(interval.hi)],
  };
}

function gapBetween(a, b) {
  if (qCmp(a.hi, b.lo) < 0) {
    return qSub(b.lo, a.hi);
  }
  if (qCmp(b.hi, a.lo) < 0) {
    return qSub(a.lo, b.hi);
  }
  return Q_ZERO;
}

function minPositive(values) {
  let best = null;
  for (const value of values) {
    if (qCmp(value, Q_ZERO) > 0 && (!best || qCmp(value, best) < 0)) {
      best = value;
    }
  }
  return best;
}

function unwrapSmallObject(value) {
  if (isJsonNumberToken(value)) {
    return value.__num;
  }
  if (Array.isArray(value)) {
    return value.map(unwrapSmallObject);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, unwrapSmallObject(child)]));
  }
  return value;
}

function buildXBoundCertificate(contract, phiCyc) {
  const seedHistory = contract.seed_history;
  const candidateCoefficients = phiCyc.basis.coefficients;
  const amplitudeLexeme = numberLexeme(candidateCoefficients.A, "phi_cyc.basis.coefficients.A");
  const amplitude = ratFromJsonNumber(candidateCoefficients.A, "phi_cyc.basis.coefficients.A");
  const epsilon = ratFromJsonNumber(seedHistory.epsilon, "seed_history.epsilon");
  const candidateEpsilon = ratFromJsonNumber(candidateCoefficients.epsilon, "phi_cyc.basis.coefficients.epsilon");
  if (qCmp(epsilon, candidateEpsilon) !== 0) {
    throw new Error("Contract epsilon and phi_cyc epsilon disagree.");
  }
  const witnessTerms = [];
  let witnessAbsSum = Q_ZERO;

  for (const arc of seedHistory.first_half_arcs) {
    const basis = arc.basis;
    const coeff = ratFromJsonNumber(seedHistory.witness[basis], `seed_history.witness.${basis}`);
    const candidateCoeff = ratFromJsonNumber(candidateCoefficients[basis], `phi_cyc.basis.coefficients.${basis}`);
    if (qCmp(coeff, candidateCoeff) !== 0) {
      throw new Error(`Contract witness and phi_cyc coefficient disagree for ${basis}.`);
    }
    const absCoeff = qAbs(coeff);
    witnessAbsSum = qAdd(witnessAbsSum, absCoeff);
    witnessTerms.push({
      basis,
      coefficient_lexeme: numberLexeme(seedHistory.witness[basis], `seed_history.witness.${basis}`),
      coefficient_q: qJson(coeff),
      abs_coefficient_q: qJson(absCoeff),
      theta_range_lexemes: arc.theta_range.map((entry, index) =>
        numberLexeme(entry, `seed_history.first_half_arcs.${basis}.theta_range.${index}`)
      ),
    });
  }

  const shearBound = qMul(epsilon, witnessAbsSum);
  const xAbsBound = qAdd(amplitude, shearBound);
  const simpleRationalCeiling = rat(11n, 8n);
  if (qCmp(xAbsBound, simpleRationalCeiling) >= 0) {
    throw new Error("Computed X envelope does not fit under the 11/8 simple rational ceiling.");
  }

  return {
    amplitude,
    epsilon,
    witnessAbsSum,
    shearBound,
    xAbsBound,
    artifact: {
      formula: "|X_delta(theta)| <= A + epsilon * sum_i |h_i|",
      proof_scope:
        "Uses |cos| <= 1 and 0 <= psi_i <= 1 on first-half arcs, with half-period antisymmetry preserving the same absolute bound. This does not use trigonometric interval enclosures and therefore certifies only coarse time-separated range-empty rows.",
      amplitude_source: "phi_cyc.fresh-same-packet-fold-shear-seed-v0.json:basis.coefficients.A",
      amplitude_lexeme: amplitudeLexeme,
      amplitude_q: qJson(amplitude),
      epsilon_lexeme: numberLexeme(seedHistory.epsilon, "seed_history.epsilon"),
      epsilon_q: qJson(epsilon),
      witness_terms: witnessTerms,
      witness_abs_sum_q: qJson(witnessAbsSum),
      witness_abs_sum_display: qToDecimal(witnessAbsSum),
      shear_bound_q: qJson(shearBound),
      shear_bound_display: qToDecimal(shearBound),
      x_abs_bound_q: qJson(xAbsBound),
      x_abs_bound_display: qToDecimal(xAbsBound),
      simple_rational_ceiling_q: qJson(simpleRationalCeiling),
      simple_rational_ceiling_display: qToDecimal(simpleRationalCeiling),
      simple_rational_ceiling_relation: "x_abs_bound < 11/8",
    },
  };
}

function atanUnitFractionInterval(denominator, terms) {
  const k = BigInt(denominator);
  let sum = Q_ZERO;
  for (let n = 0; n < terms; n += 1) {
    const sign = n % 2 === 0 ? 1n : -1n;
    const power = 2 * n + 1;
    const term = rat(sign, BigInt(power) * k ** BigInt(power));
    sum = qAdd(sum, term);
  }
  const nextPower = 2 * terms + 1;
  const nextSign = terms % 2 === 0 ? 1n : -1n;
  const endpoint = qAdd(sum, rat(nextSign, BigInt(nextPower) * k ** BigInt(nextPower)));
  return {
    lo: qMin(sum, endpoint),
    hi: qMax(sum, endpoint),
  };
}

function intervalScale(q, interval) {
  if (qCmp(q, Q_ZERO) >= 0) {
    return { lo: qMul(q, interval.lo), hi: qMul(q, interval.hi) };
  }
  return { lo: qMul(q, interval.hi), hi: qMul(q, interval.lo) };
}

function intervalAdd(a, b) {
  return { lo: qAdd(a.lo, b.lo), hi: qAdd(a.hi, b.hi) };
}

function intervalSub(a, b) {
  return { lo: qSub(a.lo, b.hi), hi: qSub(a.hi, b.lo) };
}

function intervalNeg(a) {
  return { lo: qNeg(a.hi), hi: qNeg(a.lo) };
}

function intervalMul(a, b) {
  const products = [qMul(a.lo, b.lo), qMul(a.lo, b.hi), qMul(a.hi, b.lo), qMul(a.hi, b.hi)];
  return {
    lo: products.reduce((best, value) => qMin(best, value), products[0]),
    hi: products.reduce((best, value) => qMax(best, value), products[0]),
  };
}

function intervalSquare(a) {
  const zeroInside = qCmp(a.lo, Q_ZERO) <= 0 && qCmp(Q_ZERO, a.hi) <= 0;
  const lo2 = qMul(a.lo, a.lo);
  const hi2 = qMul(a.hi, a.hi);
  return {
    lo: zeroInside ? Q_ZERO : qMin(lo2, hi2),
    hi: qMax(lo2, hi2),
  };
}

function intervalHull(a, b) {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  return { lo: qMin(a.lo, b.lo), hi: qMax(a.hi, b.hi) };
}

function intervalWithPoint(a, point) {
  return intervalHull(a, { lo: point, hi: point });
}

function intervalPow(base, exponent) {
  if (exponent === 0) {
    return { lo: Q_ONE, hi: Q_ONE };
  }
  let result = base;
  for (let i = 1; i < exponent; i += 1) {
    result = intervalMul(result, base);
  }
  return result;
}

function qPow(base, exponent) {
  if (exponent === 0) {
    return Q_ONE;
  }
  let result = base;
  for (let i = 1; i < exponent; i += 1) {
    result = qMul(result, base);
  }
  return result;
}

function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i += 1n) {
    result *= i;
  }
  return result;
}

function intervalMaxAbs(a) {
  return qMax(qAbs(a.lo), qAbs(a.hi));
}

function taylorTailBound(maxAbs, firstDegree) {
  const first = qDiv(qPow(maxAbs, firstDegree), rat(factorial(firstDegree)));
  const ratioDen = rat(BigInt((firstDegree + 1) * (firstDegree + 2)));
  const ratio = qDiv(qMul(maxAbs, maxAbs), ratioDen);
  if (qCmp(ratio, Q_ONE) >= 0) {
    throw new Error("Taylor tail ratio is not contractive.");
  }
  return qDiv(first, qSub(Q_ONE, ratio));
}

function intervalSinSmall(x) {
  let acc = { lo: Q_ZERO, hi: Q_ZERO };
  for (let n = 0; n < SIN_TAYLOR_TERMS; n += 1) {
    const degree = 2 * n + 1;
    const coeff = rat(n % 2 === 0 ? 1n : -1n, factorial(degree));
    acc = intervalAdd(acc, intervalScale(coeff, intervalPow(x, degree)));
  }
  const tail = taylorTailBound(intervalMaxAbs(x), 2 * SIN_TAYLOR_TERMS + 1);
  return { lo: qSub(acc.lo, tail), hi: qAdd(acc.hi, tail) };
}

function intervalCosSmall(x) {
  let acc = { lo: Q_ZERO, hi: Q_ZERO };
  for (let n = 0; n < COS_TAYLOR_TERMS; n += 1) {
    const degree = 2 * n;
    const coeff = rat(n % 2 === 0 ? 1n : -1n, factorial(degree));
    acc = intervalAdd(acc, intervalScale(coeff, intervalPow(x, degree)));
  }
  const tail = taylorTailBound(intervalMaxAbs(x), 2 * COS_TAYLOR_TERMS);
  return { lo: qSub(acc.lo, tail), hi: qAdd(acc.hi, tail) };
}

function machinPiInterval() {
  const pi = machinPiRaw();
  return {
    method: "Classical rational enclosure 333/106 < pi < 355/113 used as a conservative priority-side pi bracket for trig range enclosures.",
    pi_interval_q: intervalJson(pi),
    width_q: qJson(qSub(pi.hi, pi.lo)),
    width_display: qToFraction(qSub(pi.hi, pi.lo)),
  };
}

function machinPiRaw() {
  return { lo: rat(333n, 106n), hi: rat(355n, 113n) };
}

function trigNormalized(theta, piIntervalRaw) {
  const oneEighth = rat(1n, 8n);
  const threeEighths = rat(3n, 8n);
  const fiveEighths = rat(5n, 8n);
  const sevenEighths = rat(7n, 8n);
  let quarterIndex = 4;
  if (qCmp(theta, oneEighth) < 0) {
    quarterIndex = 0;
  } else if (qCmp(theta, threeEighths) < 0) {
    quarterIndex = 1;
  } else if (qCmp(theta, fiveEighths) < 0) {
    quarterIndex = 2;
  } else if (qCmp(theta, sevenEighths) < 0) {
    quarterIndex = 3;
  }
  const residual = qSub(theta, rat(BigInt(quarterIndex), 4n));
  const residualScale = qMul(rat(2n), residual);
  const angle = intervalScale(residualScale, piIntervalRaw);
  const sinDelta = intervalSinSmall(angle);
  const cosDelta = intervalCosSmall(angle);
  const normalizedIndex = quarterIndex % 4;
  if (normalizedIndex === 0) {
    return { sin: sinDelta, cos: cosDelta };
  }
  if (normalizedIndex === 1) {
    return { sin: cosDelta, cos: intervalNeg(sinDelta) };
  }
  if (normalizedIndex === 2) {
    return { sin: intervalNeg(sinDelta), cos: intervalNeg(cosDelta) };
  }
  return { sin: intervalNeg(cosDelta), cos: sinDelta };
}

function containsPoint(interval, point) {
  return qCmp(interval.lo, point) <= 0 && qCmp(point, interval.hi) <= 0;
}

function endpointCos(theta, piIntervalRaw) {
  const key = qToFraction(theta);
  const cached = ENDPOINT_COS_CACHE.get(key);
  if (cached) {
    return cached;
  }
  const value = trigNormalized(theta, piIntervalRaw).cos;
  ENDPOINT_COS_CACHE.set(key, value);
  return value;
}

function endpointSinSquaredHalfTurn(s, piIntervalRaw) {
  const one = { lo: Q_ONE, hi: Q_ONE };
  return intervalScale(rat(1n, 2n), intervalSub(one, endpointCos(s, piIntervalRaw)));
}

function cosRangeUnitInterval(interval, piIntervalRaw) {
  let range = intervalHull(endpointCos(interval.lo, piIntervalRaw), endpointCos(interval.hi, piIntervalRaw));
  if (containsPoint(interval, Q_ZERO) || containsPoint(interval, Q_ONE)) {
    range = intervalWithPoint(range, Q_ONE);
  }
  if (containsPoint(interval, rat(1n, 2n))) {
    range = intervalWithPoint(range, rat(-1n));
  }
  return range;
}

function sinSquaredRange01(interval, piIntervalRaw) {
  let range = intervalHull(
    endpointSinSquaredHalfTurn(interval.lo, piIntervalRaw),
    endpointSinSquaredHalfTurn(interval.hi, piIntervalRaw)
  );
  if (containsPoint(interval, Q_ZERO) || containsPoint(interval, Q_ONE)) {
    range = intervalWithPoint(range, Q_ZERO);
  }
  if (containsPoint(interval, rat(1n, 2n))) {
    range = intervalWithPoint(range, Q_ONE);
  }
  return range;
}

function thetaRange(interval, label) {
  return {
    lo: ratFromJsonNumber(interval.theta_range[0], `${label}.theta_range.0`),
    hi: ratFromJsonNumber(interval.theta_range[1], `${label}.theta_range.1`),
  };
}

function liftedTimeRange(thetaInterval, liftPeriods, period, fieldSpeed) {
  const lift = rat(BigInt(liftPeriods));
  const scale = qMul(fieldSpeed, period);
  return {
    lo: qMul(scale, qAdd(thetaInterval.lo, lift)),
    hi: qMul(scale, qAdd(thetaInterval.hi, lift)),
  };
}

function intervalIntersect(a, b) {
  const lo = qMax(a.lo, b.lo);
  const hi = qMin(a.hi, b.hi);
  if (qCmp(lo, hi) > 0) {
    return null;
  }
  return { lo, hi };
}

function sameInterval(a, b) {
  return qCmp(a.lo, b.lo) === 0 && qCmp(a.hi, b.hi) === 0;
}

function sourceThetaSegments(thetaInterval, delta) {
  const shifted = { lo: qAdd(thetaInterval.lo, delta), hi: qAdd(thetaInterval.hi, delta) };
  if (qCmp(shifted.hi, Q_ONE) <= 0) {
    return [shifted];
  }
  if (qCmp(shifted.lo, Q_ONE) >= 0) {
    return [{ lo: qSub(shifted.lo, Q_ONE), hi: qSub(shifted.hi, Q_ONE) }];
  }
  return [
    { lo: shifted.lo, hi: Q_ONE },
    { lo: Q_ZERO, hi: qSub(shifted.hi, Q_ONE) },
  ];
}

function sourceCriticalThetaPoints(contract) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  const sourceBreaks = [Q_ZERO, rat(1n, 2n), Q_ONE];
  for (const arc of contract.seed_history.first_half_arcs) {
    const arcTheta = arcRange(arc, `arc.${arc.id}`);
    const mid = qAdd(arcTheta.lo, qDiv(qSub(arcTheta.hi, arcTheta.lo), rat(2n)));
    sourceBreaks.push(arcTheta.lo, mid, arcTheta.hi);
    sourceBreaks.push(qAdd(arcTheta.lo, rat(1n, 2n)), qAdd(mid, rat(1n, 2n)), qAdd(arcTheta.hi, rat(1n, 2n)));
  }
  return sourceBreaks.map((sourceTheta) => {
    let theta = qSub(sourceTheta, delta);
    if (qCmp(theta, Q_ZERO) < 0) {
      theta = qAdd(theta, Q_ONE);
    }
    if (qCmp(theta, Q_ONE) > 0) {
      theta = qSub(theta, Q_ONE);
    }
    return theta;
  });
}

function uniqueSortedPoints(points) {
  const sorted = [...points].sort(qCmp);
  const unique = [];
  for (const point of sorted) {
    if (!unique.length || qCmp(unique[unique.length - 1], point) !== 0) {
      unique.push(point);
    }
  }
  return unique;
}

function subdivideInterval(interval, subdivisions, extraPoints = []) {
  const width = qSub(interval.hi, interval.lo);
  const points = [interval.lo, interval.hi];
  for (let i = 0; i < subdivisions; i += 1) {
    points.push(qAdd(interval.lo, qMul(width, rat(BigInt(i), BigInt(subdivisions)))));
    points.push(qAdd(interval.lo, qMul(width, rat(BigInt(i + 1), BigInt(subdivisions)))));
  }
  for (const point of extraPoints) {
    if (qCmp(point, interval.lo) > 0 && qCmp(point, interval.hi) < 0) {
      points.push(point);
    }
  }
  const sorted = uniqueSortedPoints(points);
  const pieces = [];
  for (let i = 0; i < sorted.length - 1; i += 1) {
    pieces.push({ lo: sorted[i], hi: sorted[i + 1] });
  }
  return pieces;
}

function firstHalfParts(sourceInterval) {
  const firstHalf = intervalIntersect(sourceInterval, { lo: Q_ZERO, hi: rat(1n, 2n) });
  const secondHalf = intervalIntersect(sourceInterval, { lo: rat(1n, 2n), hi: Q_ONE });
  const parts = [];
  if (firstHalf) {
    parts.push({ sign: rat(1n), local: firstHalf });
  }
  if (secondHalf) {
    parts.push({
      sign: rat(-1n),
      local: { lo: qSub(secondHalf.lo, rat(1n, 2n)), hi: qSub(secondHalf.hi, rat(1n, 2n)) },
    });
  }
  return parts;
}

function arcRange(arc, label) {
  return {
    lo: ratFromJsonNumber(arc.theta_range[0], `${label}.theta_range.0`),
    hi: ratFromJsonNumber(arc.theta_range[1], `${label}.theta_range.1`),
  };
}

function bumpRangeForArc(sourceInterval, arc, piIntervalRaw) {
  const arcTheta = arcRange(arc, `arc.${arc.id}`);
  let range = null;
  for (const part of firstHalfParts(sourceInterval)) {
    const overlap = intervalIntersect(part.local, arcTheta);
    if (!overlap) {
      range = intervalWithPoint(range, Q_ZERO);
      continue;
    }
    if (!sameInterval(overlap, part.local)) {
      range = intervalWithPoint(range, Q_ZERO);
    }
    const arcWidth = qSub(arcTheta.hi, arcTheta.lo);
    const sRange = {
      lo: qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth),
      hi: qDiv(qSub(overlap.hi, arcTheta.lo), arcWidth),
    };
    range = intervalHull(range, intervalScale(part.sign, sinSquaredRange01(sRange, piIntervalRaw)));
  }
  return range ?? { lo: Q_ZERO, hi: Q_ZERO };
}

function xRangeForSourceSegment(sourceInterval, contract, phiCyc, piIntervalRaw) {
  const coeffs = phiCyc.basis.coefficients;
  const amplitude = ratFromJsonNumber(coeffs.A, "phi_cyc.basis.coefficients.A");
  const epsilon = ratFromJsonNumber(coeffs.epsilon, "phi_cyc.basis.coefficients.epsilon");
  let xRange = intervalScale(amplitude, cosRangeUnitInterval(sourceInterval, piIntervalRaw));
  let shearRange = { lo: Q_ZERO, hi: Q_ZERO };

  for (const arc of contract.seed_history.first_half_arcs) {
    const coeff = ratFromJsonNumber(coeffs[arc.basis], `phi_cyc.basis.coefficients.${arc.basis}`);
    shearRange = intervalAdd(shearRange, intervalScale(coeff, bumpRangeForArc(sourceInterval, arc, piIntervalRaw)));
  }

  xRange = intervalAdd(xRange, intervalScale(epsilon, shearRange));
  return xRange;
}

function xRangeForThetaInterval(thetaInterval, contract, phiCyc, piIntervalRaw) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  let range = null;
  for (const sourceSegment of sourceThetaSegments(thetaInterval, delta)) {
    range = intervalHull(range, xRangeForSourceSegment(sourceSegment, contract, phiCyc, piIntervalRaw));
  }
  return range;
}

function nullRangeForThetaInterval(thetaInterval, liftPeriods, ledger, period, fieldSpeed, contract, phiCyc, piIntervalRaw, subdivisions) {
  let range = null;
  for (const sub of subdivideInterval(thetaInterval, subdivisions, sourceCriticalThetaPoints(contract))) {
    const timeRange = liftedTimeRange(sub, liftPeriods, period, fieldSpeed);
    const xRange = xRangeForThetaInterval(sub, contract, phiCyc, piIntervalRaw);
    const nullRange =
      ledger === "u"
        ? { lo: qSub(timeRange.lo, xRange.hi), hi: qSub(timeRange.hi, xRange.lo) }
        : { lo: qAdd(timeRange.lo, xRange.lo), hi: qAdd(timeRange.hi, xRange.hi) };
    range = intervalHull(range, nullRange);
  }
  return range;
}

function xRangeForThetaIntervalSubdivided(thetaInterval, contract, phiCyc, piIntervalRaw, subdivisions) {
  let range = null;
  for (const sub of subdivideInterval(thetaInterval, subdivisions, sourceCriticalThetaPoints(contract))) {
    range = intervalHull(range, xRangeForThetaInterval(sub, contract, phiCyc, piIntervalRaw));
  }
  return range;
}

function expandByXBound(timeInterval, xBound) {
  return {
    lo: qSub(timeInterval.lo, xBound),
    hi: qAdd(timeInterval.hi, xBound),
  };
}

function touchesActiveFoldLedger(row, receiver, source) {
  return (
    (receiver.type === "fold_layer_candidate" && receiver.fold_ledger === row.ledger) ||
    (source.type === "fold_layer_candidate" && source.fold_ledger === row.ledger)
  );
}

function splitFailureCode(row, receiver, source) {
  if (touchesActiveFoldLedger(row, receiver, source)) {
    return "trig_range_overlap_touches_active_fold_layer";
  }
  if (receiver.interval_id === source.interval_id) {
    return "trig_range_overlap_same_interval_diagonal_or_endpoint";
  }
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return "trig_range_overlap_touches_inactive_fold_neighborhood";
  }
  return "trig_range_overlap_requires_simple_root_or_structural_certificate";
}

function splitFailureReasons(code) {
  if (code === "trig_range_overlap_touches_active_fold_layer") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "active_same_packet_fold_layer_certificate_absent",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_same_interval_diagonal_or_endpoint") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "diagonal_or_endpoint_exclusion_not_certified_by_this_pass",
    ];
  }
  if (code === "trig_range_overlap_touches_inactive_fold_neighborhood") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "inactive_fold_neighborhood_requires_row_specific_certificate",
    ];
  }
  return [
    "row_specific_trig_ranges_overlap_or_touch",
    "simple_root_or_monotonicity_certificate_absent",
  ];
}

function classifyRows(inputScreen, mesh, contract, phiCyc, period, fieldSpeed, xBoundCertificate, piIntervalRaw, subdivisions) {
  const intervalById = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const rows = [];

  for (const inputRow of inputScreen.rows) {
    const receiver = intervalById.get(inputRow.receiver_interval);
    const source = intervalById.get(inputRow.source_interval);
    if (!receiver || !source) {
      throw new Error(`Missing interval for row ${inputRow.row_id}`);
    }

    const lift = intFromJsonNumber(inputRow.source_lift_periods, `${inputRow.row_id}.source_lift_periods`);
    const receiverTheta = thetaRange(receiver, `${inputRow.row_id}.receiver`);
    const sourceTheta = thetaRange(source, `${inputRow.row_id}.source`);
    const receiverTime = liftedTimeRange(receiverTheta, 0, period, fieldSpeed);
    const sourceTime = liftedTimeRange(sourceTheta, lift, period, fieldSpeed);
    const receiverXRange = xRangeForThetaIntervalSubdivided(receiverTheta, contract, phiCyc, piIntervalRaw, subdivisions);
    const sourceXRange = xRangeForThetaIntervalSubdivided(sourceTheta, contract, phiCyc, piIntervalRaw, subdivisions);
    const receiverRange = nullRangeForThetaInterval(
      receiverTheta,
      0,
      inputRow.ledger,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const sourceRange = nullRangeForThetaInterval(
      sourceTheta,
      lift,
      inputRow.ledger,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const gap = gapBetween(receiverRange, sourceRange);
    const accepted = qCmp(gap, Q_ZERO) > 0;
    const failureCode = accepted ? "" : splitFailureCode(inputRow, receiver, source);

    rows.push({
      row_id: inputRow.row_id,
      packet_id: PACKET_ID,
      screen_id: inputRow.screen_id,
      refinement_id: REFINEMENT_ID,
      receiver_interval: receiver.interval_id,
      source_interval: source.interval_id,
      ledger: inputRow.ledger,
      source_lift_periods: lift,
      receiver_theta_range: unwrapSmallObject(inputRow.receiver_theta_range),
      source_theta_range: unwrapSmallObject(inputRow.source_theta_range),
      receiver_range: [qToDecimal(receiverRange.lo), qToDecimal(receiverRange.hi)],
      source_range: [qToDecimal(sourceRange.lo), qToDecimal(sourceRange.hi)],
      receiver_theta_range_q: intervalJson(receiverTheta),
      source_theta_range_q: intervalJson(sourceTheta),
      receiver_time_range_q: intervalJson(receiverTime),
      source_time_range_q: intervalJson(sourceTime),
      receiver_x_delta_range_q: intervalJson(receiverXRange),
      source_x_delta_range_q: intervalJson(sourceXRange),
      receiver_range_q: intervalJson(receiverRange),
      source_range_q: intervalJson(sourceRange),
      status: accepted ? "empty" : "split_required",
      certificate_status: accepted ? "proof_interval_certified_range_empty" : "proof_interval_split_required",
      empty_method: accepted ? "proof_interval_trig_range_empty" : null,
      range_gap: qToDecimal(gap),
      range_gap_q: qJson(gap),
      range_gap_display: qToDecimal(gap),
      receiver_monotone_floor: null,
      monotone_floor: null,
      jacobian_floor: null,
      root_count_bound: accepted ? [0, 0] : null,
      root_sign: null,
      memory_depth_range: null,
      separator_event: inputRow.separator_event,
      diagonal_exclusion_ref: null,
      fold_layer_input_ref: inputRow.fold_layer_input_ref,
      itinerary_required: true,
      input_screen_sampled_range_lexemes: {
        receiver_range: unwrapSmallObject(inputRow.receiver_range),
        source_range: unwrapSmallObject(inputRow.source_range),
        sampled_range_gap: unwrapSmallObject(inputRow.sampled_range_gap),
      },
      interval_method: {
        type: "exact_rational_subdivided_trig_x_delta_range",
        null_coordinate_policy: "Each subinterval encloses Y_sigma(theta)=c_f*T*(theta+lift)+sigma*X_delta(theta) with certified trigonometric X_delta ranges, then hulls the subranges.",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        subdivisions,
        sin_taylor_terms: SIN_TAYLOR_TERMS,
        cos_taylor_terms: COS_TAYLOR_TERMS,
      },
      failure_code: failureCode,
      failure_reasons: accepted ? [] : splitFailureReasons(failureCode),
    });
  }

  return rows;
}

function countRows(rows, predicate) {
  return rows.filter(predicate).length;
}

function countBy(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || "none";
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

function buildBackendCertificate(
  contractSource,
  phiCycSource,
  meshSource,
  inputSource,
  period,
  fieldSpeed,
  xBoundCertificate,
  subdivisions
) {
  return {
    schema: "breather-proof-interval-backend-certificate-v2",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_backend_trig_range_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      contract: {
        path: path.basename(contractSource.path),
        sha256: contractSource.sha256,
        numeric_token_count: contractSource.numericTokenCount,
        numeric_token_samples: contractSource.numericTokenSamples,
      },
      phi_cyc: {
        path: path.basename(phiCycSource.path),
        sha256: phiCycSource.sha256,
        numeric_token_count: phiCycSource.numericTokenCount,
        numeric_token_samples: phiCycSource.numericTokenSamples,
      },
      mesh: {
        path: path.basename(meshSource.path),
        sha256: meshSource.sha256,
        numeric_token_count: meshSource.numericTokenCount,
        numeric_token_samples: meshSource.numericTokenSamples,
      },
      input_screen: {
        path: path.basename(inputSource.path),
        sha256: inputSource.sha256,
        numeric_token_count: inputSource.numericTokenCount,
        numeric_token_samples: inputSource.numericTokenSamples,
      },
    },
    exact_decimal_intake: {
      method: "All JSON number tokens are wrapped before JSON.parse and converted from decimal lexemes to reduced BigInt rationals before row classification.",
      binary64_number_use: "none_for_certified_row_endpoints",
    },
    arithmetic_backend: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_form: "reduced signed numerator / positive denominator",
      endpoint_policy: "exact rational lower and upper endpoints; row accepted only by strict rational interval disjointness",
    },
    period_policy: {
      period_T_cyc_lexeme: qToDecimal(period, 20),
      period_T_cyc_q: qJson(period),
      field_speed_c_f_q: qJson(fieldSpeed),
      note: "This v2 sidecar treats the packet decimal T_cyc as the exact period token for time ranges. The rational pi interval is used only for trigonometric enclosure of X_delta, not as a replacement for the packet period token.",
    },
    pi_certificate: machinPiInterval(),
    trig_enclosure_method: {
      argument_reduction:
        "Normalize q modulo 1, reduce 2*pi*q to the nearest quarter-turn, and evaluate sine/cosine on a residual interval with |residual angle| <= pi/4.",
      taylor_terms: {
        sin: SIN_TAYLOR_TERMS,
        cos: COS_TAYLOR_TERMS,
      },
      remainder_bound:
        "Absolute Taylor tail bounded by first omitted term divided by 1-r, where r <= M^2/((d+1)(d+2)) and M is the rational maximum absolute reduced angle.",
      subdivision_rule:
        "Each mesh interval is split by uniform rational subdivisions plus phase-wrap, half-period, bump-support endpoint, and bump-maximum breakpoints before null-coordinate hulls are formed.",
      subdivisions_per_mesh_interval: subdivisions,
    },
    x_delta_definition: {
      formula: "X_delta(theta)=A*cos(2*pi*(theta+delta))+epsilon*H(theta+delta)",
      bump_formula: "psi_A(theta)=sin^2(pi*(theta-L_A)/(R_A-L_A)) on the support interval and zero outside",
      half_period_antisymmetry: "H(theta+1/2)=-H(theta)",
      coefficients: xBoundCertificate.artifact,
    },
    x_bound_certificate: xBoundCertificate.artifact,
    trig_enclosure_status:
      "used_for_row_specific_range_empty_rows_only; derivative, simple-root, and fold-layer certificates remain absent",
  };
}

function buildLedger(contractSource, phiCycSource, meshSource, inputSource, subdivisions) {
  const contract = contractSource.data;
  const phiCyc = phiCycSource.data;
  const mesh = meshSource.data;
  const inputScreen = inputSource.data;

  if (
    contract.packet_id !== PACKET_ID ||
    phiCyc.packet_id !== PACKET_ID ||
    mesh.packet_id !== PACKET_ID ||
    inputScreen.packet_id !== PACKET_ID
  ) {
    throw new Error("Fresh packet id mismatch in contract, phi_cyc, mesh, or input screen.");
  }

  const period = ratFromJsonNumber(inputScreen.evaluation_policy.period_T_cyc, "evaluation_policy.period_T_cyc");
  const fieldSpeed = ratFromJsonNumber(inputScreen.evaluation_policy.field_speed_c_f, "evaluation_policy.field_speed_c_f");
  const piIntervalRaw = machinPiRaw();
  const xBoundCertificate = buildXBoundCertificate(contract, phiCyc);
  const rows = classifyRows(inputScreen, mesh, contract, phiCyc, period, fieldSpeed, xBoundCertificate, piIntervalRaw, subdivisions);
  const emptyRows = rows.filter((row) => row.status === "empty");
  const splitRows = rows.filter((row) => row.status === "split_required");
  const gammaEmpty = minPositive(emptyRows.map((row) => qFromJson(row.range_gap_q)));
  const backendCertificate = buildBackendCertificate(
    contractSource,
    phiCycSource,
    meshSource,
    inputSource,
    period,
    fieldSpeed,
    xBoundCertificate,
    subdivisions
  );

  return {
    backendCertificate,
    ledger: {
      schema: "breather-causal-ledger-fresh-proof-interval-v2",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
      source_numeric_artifacts: {
        contract: path.basename(contractSource.path),
        phi_cyc: path.basename(phiCycSource.path),
        mesh: path.basename(meshSource.path),
        input_screen: path.basename(inputSource.path),
      },
      status: "proof_interval_v2_trig_range_sidecar_branch_chart_blocked",
      acceptance_level: "exact_rational_json_lexeme_subdivided_trig_range_empty_only",
      claim_level:
        "exact-rational JSON numeric-token intake sidecar accepting only strictly disjoint row-specific trigonometric null-coordinate ranges; no monotone diagonal certificate, simple-root certificate, fold-layer certificate, live ledger update, or branch-chart authorization",
      theorem_target: "Null-Coordinate Causal Pre-Ledger",
      branch_chart_authorized: false,
      preledger_pass: false,
      updates_live_ledger: false,
      authorization_lock: {
        branch_chart_authorized: false,
        preledger_pass: false,
        updates_live_ledger: false,
        must_not_emit: ["branch_chart.json", "seed_chart_interval_report.md", "causal_ledger.json"],
      },
      packet_identity_refs: {
        candidate_history: `phi_cyc.${PACKET_ID}.json:packet_identity`,
        mesh: `mesh.${PACKET_ID}.json`,
        input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
        seed_contract: "fresh_same_packet_fold_shear_seed.v0.json",
      },
      numeric_intake: {
        json_number_policy:
          "All source JSON numeric tokens are wrapped outside strings, preserved as decimal lexemes, and converted to reduced BigInt rationals before any certified row classification.",
        certified_endpoint_binary64_use: false,
      },
      identity_checks: {
        packet_id: PACKET_ID,
        contract_packet_id_matches: true,
        phi_cyc_packet_id_matches: true,
        mesh_packet_id_matches: true,
        input_screen_packet_id_matches: true,
        contract_epsilon_matches_phi_cyc: true,
        contract_witness_matches_phi_cyc: true,
      },
      x_bound: xBoundCertificate.artifact,
      common_identity: unwrapSmallObject(inputScreen.common_identity),
      evaluation_policy: {
        null_coordinates: inputScreen.evaluation_policy.null_coordinates,
        field_speed_c_f_q: qJson(fieldSpeed),
        period_T_cyc_q: qJson(period),
        source_time_rule: inputScreen.evaluation_policy.source_time_rule,
        interval_method:
          "Exact rational row time ranges are combined with certified row-specific X_delta ranges from rational pi and Taylor trigonometric enclosures. A row is accepted as empty only when the receiver and source null-coordinate intervals are strictly disjoint.",
        pass_rule:
          "This artifact passes only if every row is accepted as empty, simple_root, or fold_layer with no split_required rows. This v2 sidecar accepts no simple_root, diagonal-exclusion, or fold-layer rows.",
      },
      interval_method: {
        type: "exact_rational_subdivided_trig_x_delta_range",
        certificate_grade: "partial_proof_interval_trig_range_empty_subset",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        pi_interval_q: intervalJson(piIntervalRaw),
        subdivisions_per_mesh_interval: subdivisions,
        sin_taylor_terms: SIN_TAYLOR_TERMS,
        cos_taylor_terms: COS_TAYLOR_TERMS,
        limitation:
          "This certificate certifies only range-empty rows. It does not certify monotone diagonal exclusions, simple-root subrows, fold-layer rows, dynamic residuals, or parent-complement consumption.",
      },
      summary: {
        base_rows: rows.length,
        certified_empty_base_rows: emptyRows.length,
        certified_range_empty_base_rows: emptyRows.length,
        certified_diagonal_exclusion_empty_rows: 0,
        certified_simple_root_subrows: 0,
        accepted_fold_layer_rows: 0,
        split_required_base_rows: splitRows.length,
        branch_chart_authorized: false,
      },
      global_margins: {
        gamma_empty_range_q: gammaEmpty ? qJson(gammaEmpty) : null,
        gamma_empty_range_display: gammaEmpty ? qToDecimal(gammaEmpty) : null,
        gamma_inact_range_q: gammaEmpty ? qJson(gammaEmpty) : null,
        gamma_inact_range_display: gammaEmpty ? qToDecimal(gammaEmpty) : null,
        diagonal_exclusion_empty_rows: 0,
        nu_simple: null,
        gamma_cov: null,
        gamma_tau: null,
        gamma_h: null,
        gamma_sign: null,
        alpha_fold_min: null,
        nu_exit_fold_min: null,
        I_fold_all_finite: false,
        pass: false,
      },
      blocking_summary: countBy(splitRows, "failure_code"),
      intervals: mesh.preledger_intervals.map(unwrapSmallObject),
      rows,
      simple_root_subrows: [],
      fold_layer_rows: [],
      limitations: [
        "Certified trigonometric enclosures are used only for row-specific range-empty rows.",
        "No same-interval diagonal exclusion is accepted by this sidecar.",
        "No simple-root or fold-layer row is accepted by this sidecar.",
        "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
      ],
    },
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.status}\` | \`${row.empty_method ?? row.failure_code}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.ledger}\` | ${row.range_gap_display} |`
    )
    .join("\n");
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v2",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_trig_range_partial_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_type: "reduced exact rationals",
      range_method: "exact row time intervals plus certified subdivided trigonometric X_delta ranges",
      binary64_endpoint_use: "none",
      subdivisions_per_mesh_interval: ledger.interval_method.subdivisions_per_mesh_interval,
      sin_taylor_terms: ledger.interval_method.sin_taylor_terms,
      cos_taylor_terms: ledger.interval_method.cos_taylor_terms,
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: 0,
      simple_root_rows: 0,
      fold_layer_rows: 0,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      failure_code_counts: ledger.blocking_summary,
    },
    limitations: [
      "This is a partial trigonometric range-empty certificate, not the full null-coordinate preledger.",
      "The certificate consumes only strict range-empty rows and does not certify diagonal, simple-root, or fold-layer obligations.",
      "Rows left as split_required block branch-chart authorization.",
      "A later pass must add monotonicity/Jacobian floors, simple-root coverage, fold-layer impulse certificates, and parent-complement consumption.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  const splitRows = ledger.rows.filter((row) => row.status === "split_required");
  const emptyRows = ledger.rows.filter((row) => row.status === "empty");
  const blockers = Object.entries(ledger.blocking_summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`)
    .join("\n");

  return `# Fresh Proof-Interval Preledger v2 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v2 proof-interval sidecar certifies only the rows whose
row-specific rational trigonometric null-coordinate ranges are strictly
disjoint. It uses the conservative global envelope
$$
|X_\\delta(\\theta)| \\le ${ledger.interval_method.x_abs_bound_display}.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\\max}$ range.

It is a proof-grade subset for range-empty rows, but it is deliberately not a
full pre-ledger. It accepts no diagonal exclusions, no simple-root subrows, and
no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | ${ledger.summary.base_rows} |
| Empty rows accepted by this proof-interval-v2 sidecar | ${ledger.summary.certified_empty_base_rows} |
| Split-required rows | ${ledger.summary.split_required_base_rows} |
| Certified diagonal exclusions | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Certified simple-root subrows | ${ledger.summary.certified_simple_root_subrows} |
| Accepted fold-layer rows | ${ledger.summary.accepted_fold_layer_rows} |
| Minimum accepted range gap | ${ledger.global_margins.gamma_empty_range_display ?? "none"} |

Because \`${path.basename(ledgerPath)}\` records
\`branch_chart_authorized=false\`, no \`branch_chart.json\` may be constructed
from this packet.

The exact backend certificate is
\`${path.basename(backendPath)}\`; the engine audit is
\`${path.basename(auditPath)}\`.

## Backend Meaning

The generator wraps every JSON number token before parsing and converts each
decimal lexeme into a reduced \`BigInt\` rational. For a row subinterval
$[\\theta_0,\\theta_1]$, it forms the exact time range
$$
c_fT_{\\mathrm{cyc}}[\\theta_0+\\ell,\\theta_1+\\ell]
$$
and encloses $X_\\delta$ using a rational interval for $\\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A row is accepted as \`empty\` only when the
receiver and source null-coordinate hulls are strictly disjoint as rational
intervals.

The emitted $\\pi$ interval is used only for trigonometric enclosure of
$X_\\delta$. The packet period remains the exact decimal token
\`${ledger.evaluation_policy.period_T_cyc_q.num}/${ledger.evaluation_policy.period_T_cyc_q.den}\`.

## Split-Required Families

| Failure code | Rows |
| --- | ---: |
${blockers}

## First Split-Required Rows

| Row | Status | Blocker | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(splitRows.slice(0, 24))}

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(emptyRows.slice(0, 24))}

## Next Certificate Action

The next proof advance is no longer range-empty enclosure for the rows accepted
here. It is monotonicity and Jacobian floors for same-interval and
root-candidate rows, followed by same-packet fold-layer impulse fields for
active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and row-specific
range-empty certificate for the fresh packet, not a passed pre-ledger and not
reader-facing AAA prose. Keep it in the proof-program priority packet until a
full same-packet pre-ledger exists or the packet is rejected by a proof-grade
interval backend.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const contractSource = readJsonLossless(path.resolve(args.contract));
  const phiCycSource = readJsonLossless(path.resolve(args.phiCyc));
  const meshSource = readJsonLossless(path.resolve(args.mesh));
  const inputSource = readJsonLossless(path.resolve(args.inputScreen));
  const { backendCertificate, ledger } = buildLedger(contractSource, phiCycSource, meshSource, inputSource, args.subdivisions);
  const outDir = path.resolve(args.outDir);
  const backendPath = path.join(outDir, `preledger_interval_backend_certificate.${OUTPUT_TAG}.json`);
  const ledgerPath = path.join(outDir, `causal_ledger.${OUTPUT_TAG}.json`);
  const reportPath = path.join(outDir, `causal_preledger_interval_report.${OUTPUT_TAG}.md`);
  const auditPath = path.join(outDir, `preledger_interval_engine_audit.${OUTPUT_TAG}.json`);

  writeJson(backendPath, backendCertificate, args.pretty);
  writeJson(ledgerPath, ledger, args.pretty);
  writeJson(auditPath, buildEngineAudit(ledger, backendPath), args.pretty);
  writeText(reportPath, buildReport(ledger, ledgerPath, backendPath, auditPath));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-trig-monotone-diagonal-simple-root-v4`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v4`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const DEFAULT_SUBDIVISIONS = 64;
const SIMPLE_ROOT_RECEIVER_GRID = 32;
const SIN_TAYLOR_TERMS = 5;
const COS_TAYLOR_TERMS = 5;
const ENDPOINT_COS_CACHE = new Map();
const ENDPOINT_SIN_CACHE = new Map();

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
  console.log(`Usage: node scripts/proof-programs/fresh-proof-interval-preledger-v4.mjs [options]

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

function endpointSin(theta, piIntervalRaw) {
  const key = qToFraction(theta);
  const cached = ENDPOINT_SIN_CACHE.get(key);
  if (cached) {
    return cached;
  }
  const value = trigNormalized(theta, piIntervalRaw).sin;
  ENDPOINT_SIN_CACHE.set(key, value);
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

function sinRangeUnitInterval(interval, piIntervalRaw) {
  let range = intervalHull(endpointSin(interval.lo, piIntervalRaw), endpointSin(interval.hi, piIntervalRaw));
  if (containsPoint(interval, rat(1n, 4n))) {
    range = intervalWithPoint(range, Q_ONE);
  }
  if (containsPoint(interval, rat(3n, 4n))) {
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

function sourceDerivativeCriticalThetaPoints(contract) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  const sourceBreaks = [Q_ZERO, rat(1n, 4n), rat(1n, 2n), rat(3n, 4n), Q_ONE];
  for (const arc of contract.seed_history.first_half_arcs) {
    const arcTheta = arcRange(arc, `arc.${arc.id}`);
    const width = qSub(arcTheta.hi, arcTheta.lo);
    const quarter = qAdd(arcTheta.lo, qDiv(width, rat(4n)));
    const mid = qAdd(arcTheta.lo, qDiv(width, rat(2n)));
    const threeQuarter = qAdd(arcTheta.lo, qMul(width, rat(3n, 4n)));
    for (const point of [arcTheta.lo, quarter, mid, threeQuarter, arcTheta.hi]) {
      sourceBreaks.push(point, qAdd(point, rat(1n, 2n)));
    }
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

function bumpDerivativeRangeForArc(sourceInterval, arc, piIntervalRaw) {
  const arcTheta = arcRange(arc, `arc.${arc.id}`);
  const arcWidth = qSub(arcTheta.hi, arcTheta.lo);
  const piOverWidth = intervalScale(qDiv(Q_ONE, arcWidth), piIntervalRaw);
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
    const sRange = {
      lo: qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth),
      hi: qDiv(qSub(overlap.hi, arcTheta.lo), arcWidth),
    };
    const derivativeRange = intervalMul(piOverWidth, sinRangeUnitInterval(sRange, piIntervalRaw));
    range = intervalHull(range, intervalScale(part.sign, derivativeRange));
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

function xDerivativeRangeForSourceSegment(sourceInterval, contract, phiCyc, piIntervalRaw) {
  const coeffs = phiCyc.basis.coefficients;
  const amplitude = ratFromJsonNumber(coeffs.A, "phi_cyc.basis.coefficients.A");
  const epsilon = ratFromJsonNumber(coeffs.epsilon, "phi_cyc.basis.coefficients.epsilon");
  const baseScale = qMul(qNeg(rat(2n)), amplitude);
  let xPrimeRange = intervalScale(baseScale, intervalMul(piIntervalRaw, sinRangeUnitInterval(sourceInterval, piIntervalRaw)));
  let shearPrimeRange = { lo: Q_ZERO, hi: Q_ZERO };

  for (const arc of contract.seed_history.first_half_arcs) {
    const coeff = ratFromJsonNumber(coeffs[arc.basis], `phi_cyc.basis.coefficients.${arc.basis}`);
    shearPrimeRange = intervalAdd(
      shearPrimeRange,
      intervalScale(coeff, bumpDerivativeRangeForArc(sourceInterval, arc, piIntervalRaw))
    );
  }

  xPrimeRange = intervalAdd(xPrimeRange, intervalScale(epsilon, shearPrimeRange));
  return xPrimeRange;
}

function xRangeForThetaInterval(thetaInterval, contract, phiCyc, piIntervalRaw) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  let range = null;
  for (const sourceSegment of sourceThetaSegments(thetaInterval, delta)) {
    range = intervalHull(range, xRangeForSourceSegment(sourceSegment, contract, phiCyc, piIntervalRaw));
  }
  return range;
}

function xDerivativeRangeForThetaInterval(thetaInterval, contract, phiCyc, piIntervalRaw) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  let range = null;
  for (const sourceSegment of sourceThetaSegments(thetaInterval, delta)) {
    range = intervalHull(range, xDerivativeRangeForSourceSegment(sourceSegment, contract, phiCyc, piIntervalRaw));
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

function nullPointRangeForTheta(theta, liftPeriods, ledger, period, fieldSpeed, contract, phiCyc, piIntervalRaw) {
  const point = { lo: theta, hi: theta };
  const timeRange = liftedTimeRange(point, liftPeriods, period, fieldSpeed);
  const xRange = xRangeForThetaInterval(point, contract, phiCyc, piIntervalRaw);
  if (ledger === "u") {
    return { lo: qSub(timeRange.lo, xRange.hi), hi: qSub(timeRange.hi, xRange.lo) };
  }
  return { lo: qAdd(timeRange.lo, xRange.lo), hi: qAdd(timeRange.hi, xRange.hi) };
}

function nullDerivativeRangeForThetaInterval(thetaInterval, ledger, period, fieldSpeed, contract, phiCyc, piIntervalRaw, subdivisions) {
  let range = null;
  const timeDerivative = qMul(fieldSpeed, period);
  const timeDerivativeInterval = { lo: timeDerivative, hi: timeDerivative };
  for (const sub of subdivideInterval(thetaInterval, subdivisions, sourceDerivativeCriticalThetaPoints(contract))) {
    const xPrimeRange = xDerivativeRangeForThetaInterval(sub, contract, phiCyc, piIntervalRaw);
    const nullPrimeRange = ledger === "u" ? intervalSub(timeDerivativeInterval, xPrimeRange) : intervalAdd(timeDerivativeInterval, xPrimeRange);
    range = intervalHull(range, nullPrimeRange);
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

function derivativeFloorCertificate(derivativeRange) {
  if (qCmp(derivativeRange.lo, Q_ZERO) > 0) {
    return { sign: "positive", floor: derivativeRange.lo };
  }
  if (qCmp(derivativeRange.hi, Q_ZERO) < 0) {
    return { sign: "negative", floor: qNeg(derivativeRange.hi) };
  }
  return null;
}

function derivativeFloorArtifact(floor) {
  if (!floor) {
    return null;
  }
  return {
    sign: floor.sign,
    floor_q: qJson(floor.floor),
    floor_display: qToDecimal(floor.floor),
  };
}

function normalizeJacobianFloor(floor, period, fieldSpeed) {
  if (!floor) {
    return null;
  }
  return { sign: floor.sign, floor: qDiv(floor.floor, qMul(fieldSpeed, period)) };
}

function sameIntervalDiagonalCertificate(row, receiver, source, lift, receiverDerivativeRange, period, fieldSpeed) {
  if (
    receiver.interval_id !== source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    touchesActiveFoldLedger(row, receiver, source)
  ) {
    return null;
  }
  const floor = derivativeFloorCertificate(receiverDerivativeRange);
  if (!floor) {
    return null;
  }
  const jacobianFloor = qDiv(floor.floor, qMul(fieldSpeed, period));
  return {
    method: "proof_interval_monotone_diagonal_exclusion",
    ref: `${PACKET_ID}:proof-interval-v4:diagonal:${row.row_id}`,
    sign: floor.sign,
    phase_derivative_floor: floor,
    jacobian_floor: { sign: floor.sign, floor: jacobianFloor },
  };
}

function strictRangeCoverageGap(sourceRange, receiverRange) {
  const loMargin = qSub(receiverRange.lo, sourceRange.lo);
  const hiMargin = qSub(sourceRange.hi, receiverRange.hi);
  if (qCmp(loMargin, Q_ZERO) <= 0 || qCmp(hiMargin, Q_ZERO) <= 0) {
    return null;
  }
  return qMin(loMargin, hiMargin);
}

function orientedSourceInnerRange(sourceTheta, lift, ledger, sourceDerivativeFloor, period, fieldSpeed, contract, phiCyc, piIntervalRaw) {
  if (!sourceDerivativeFloor) {
    return null;
  }
  const leftEndpoint = nullPointRangeForTheta(sourceTheta.lo, lift, ledger, period, fieldSpeed, contract, phiCyc, piIntervalRaw);
  const rightEndpoint = nullPointRangeForTheta(sourceTheta.hi, lift, ledger, period, fieldSpeed, contract, phiCyc, piIntervalRaw);
  const inner =
    sourceDerivativeFloor.sign === "positive"
      ? { lo: leftEndpoint.hi, hi: rightEndpoint.lo }
      : { lo: rightEndpoint.hi, hi: leftEndpoint.lo };
  if (qCmp(inner.lo, inner.hi) >= 0) {
    return {
      inner: null,
      left_endpoint_range: leftEndpoint,
      right_endpoint_range: rightEndpoint,
      source_derivative_sign: sourceDerivativeFloor.sign,
    };
  }
  return {
    inner,
    left_endpoint_range: leftEndpoint,
    right_endpoint_range: rightEndpoint,
    source_derivative_sign: sourceDerivativeFloor.sign,
  };
}

function memoryDepthRange(receiverTheta, sourceTheta, liftPeriods, period, fieldSpeed) {
  const scale = qMul(fieldSpeed, period);
  const lift = rat(BigInt(liftPeriods));
  return {
    lo: qMul(scale, qSub(receiverTheta.lo, qAdd(sourceTheta.hi, lift))),
    hi: qMul(scale, qSub(receiverTheta.hi, qAdd(sourceTheta.lo, lift))),
  };
}

function simpleRootSign(ledger) {
  return ledger === "u" ? "x(t)-x(s)>0" : "x(t)-x(s)<0";
}

function simpleRootCertificate(
  row,
  receiver,
  source,
  lift,
  receiverTheta,
  sourceTheta,
  receiverRange,
  sourceInnerRange,
  receiverDerivativeFloor,
  sourceDerivativeFloor,
  period,
  fieldSpeed,
  memoryHorizon
) {
  if (
    receiver.interval_id === source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    touchesActiveFoldLedger(row, receiver, source) ||
    !sourceDerivativeFloor ||
    !receiverDerivativeFloor ||
    !sourceInnerRange?.inner
  ) {
    return null;
  }

  const sourceCoverageGap = strictRangeCoverageGap(sourceInnerRange.inner, receiverRange);
  if (!sourceCoverageGap) {
    return null;
  }

  const depthRange = memoryDepthRange(receiverTheta, sourceTheta, lift, period, fieldSpeed);
  if (qCmp(depthRange.lo, Q_ZERO) <= 0) {
    return null;
  }
  const gammaH = qSub(memoryHorizon, depthRange.hi);
  if (qCmp(gammaH, Q_ZERO) <= 0) {
    return null;
  }

  const sourceJacobianFloor = qDiv(sourceDerivativeFloor.floor, qMul(fieldSpeed, period));
  const receiverJacobianFloor = receiverDerivativeFloor
    ? qDiv(receiverDerivativeFloor.floor, qMul(fieldSpeed, period))
    : null;

  return {
    method: "proof_interval_simple_root_source_monotonicity_range_cover",
    ref: `${PACKET_ID}:proof-interval-v4:simple-root:${row.row_id}`,
    source_coverage_gap: sourceCoverageGap,
    source_inner_range: sourceInnerRange.inner,
    source_endpoint_ranges: {
      left: sourceInnerRange.left_endpoint_range,
      right: sourceInnerRange.right_endpoint_range,
    },
    source_phase_derivative_floor: sourceDerivativeFloor,
    source_jacobian_floor: { sign: sourceDerivativeFloor.sign, floor: sourceJacobianFloor },
    receiver_phase_derivative_floor: receiverDerivativeFloor,
    receiver_jacobian_floor: receiverDerivativeFloor
      ? { sign: receiverDerivativeFloor.sign, floor: receiverJacobianFloor }
      : null,
    memory_depth_range: depthRange,
    gamma_tau: depthRange.lo,
    gamma_h: gammaH,
    root_sign: simpleRootSign(row.ledger),
    gamma_sign: depthRange.lo,
    root_count_bound: [1, 1],
    certificate_rule:
      "The source null coordinate is strictly monotone on the source interval, its source range strictly covers the receiver range, and the causal memory window stays inside 0 < tau < h; therefore each receiver value has exactly one source root with the recorded sign.",
  };
}

function simpleRootBlockingFailureCode(
  row,
  receiver,
  source,
  lift,
  sourceDerivativeFloor,
  receiverDerivativeFloor,
  sourceInnerRange,
  sourceCoverageGap,
  depthRange,
  memoryHorizon
) {
  if (touchesActiveFoldLedger(row, receiver, source)) {
    return null;
  }
  if (receiver.interval_id === source.interval_id) {
    return null;
  }
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return null;
  }
  if (lift !== 0) {
    return "trig_range_overlap_periodic_seam_endpoint_ownership_required";
  }
  if (!sourceDerivativeFloor) {
    return "trig_range_overlap_simple_root_source_not_strict_monotone";
  }
  if (!receiverDerivativeFloor) {
    return "trig_range_overlap_simple_root_receiver_not_strict_monotone";
  }
  if (!sourceInnerRange?.inner) {
    return "trig_range_overlap_simple_root_source_inner_range_degenerate";
  }
  if (!sourceCoverageGap) {
    return "trig_range_overlap_simple_root_receiver_not_strictly_covered";
  }
  if (qCmp(depthRange.lo, Q_ZERO) <= 0) {
    return "trig_range_overlap_simple_root_memory_depth_not_positive";
  }
  if (qCmp(qSub(memoryHorizon, depthRange.hi), Q_ZERO) <= 0) {
    return "trig_range_overlap_simple_root_horizon_margin_missing";
  }
  return null;
}

function splitFailureCode(row, receiver, source) {
  if (touchesActiveFoldLedger(row, receiver, source)) {
    return "trig_range_overlap_touches_active_fold_layer";
  }
  if (receiver.interval_id === source.interval_id) {
    if (receiver.type !== "regular" || source.type !== "regular") {
      return "trig_range_overlap_fold_interval_diagonal_locked";
    }
    return "trig_range_overlap_same_interval_nonmonotone_diagonal_or_endpoint";
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
  if (code === "trig_range_overlap_same_interval_nonmonotone_diagonal_or_endpoint") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "strict_monotone_diagonal_exclusion_not_certified_by_this_pass",
    ];
  }
  if (code === "trig_range_overlap_fold_interval_diagonal_locked") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "fold_interval_same_diagonal_requires_fold_aware_endpoint_certificate",
    ];
  }
  if (code === "trig_range_overlap_touches_inactive_fold_neighborhood") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "inactive_fold_neighborhood_requires_row_specific_certificate",
    ];
  }
  if (code === "trig_range_overlap_periodic_seam_endpoint_ownership_required") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "periodic_seam_endpoint_requires_endpoint_ownership_certificate",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_source_not_strict_monotone") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "source_null_coordinate_derivative_has_no_strict_sign_on_parent_interval",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_receiver_not_strict_monotone") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "receiver_null_coordinate_derivative_has_no_strict_sign_on_parent_interval",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_source_inner_range_degenerate") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "oriented_source_inner_range_from_endpoint_enclosures_is_empty_or_degenerate",
      "row_requires_subdivision_or_sharper_endpoint_certificate",
    ];
  }
  if (code === "trig_range_overlap_simple_root_receiver_not_strictly_covered") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "oriented_source_inner_range_does_not_strictly_cover_full_receiver_range",
      "row_requires_subdivision_or_structural_certificate",
    ];
  }
  if (code === "trig_range_overlap_simple_root_memory_depth_not_positive") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "candidate_simple_root_memory_depth_not_strictly_positive",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_horizon_margin_missing") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "candidate_simple_root_memory_depth_not_strictly_inside_memory_horizon",
      "row_not_promoted_to_simple_root",
    ];
  }
  return [
    "row_specific_trig_ranges_overlap_or_touch",
    "simple_root_or_monotonicity_certificate_absent",
  ];
}

function classifyRows(inputScreen, mesh, contract, phiCyc, period, fieldSpeed, memoryHorizon, xBoundCertificate, piIntervalRaw, subdivisions) {
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
    const receiverDerivativeRange = nullDerivativeRangeForThetaInterval(
      receiverTheta,
      inputRow.ledger,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const sourceDerivativeRange = nullDerivativeRangeForThetaInterval(
      sourceTheta,
      inputRow.ledger,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const receiverDerivativeFloor = derivativeFloorCertificate(receiverDerivativeRange);
    const sourceDerivativeFloor = derivativeFloorCertificate(sourceDerivativeRange);
    const receiverJacobianFloor = normalizeJacobianFloor(receiverDerivativeFloor, period, fieldSpeed);
    const sourceJacobianFloor = normalizeJacobianFloor(sourceDerivativeFloor, period, fieldSpeed);
    const gap = gapBetween(receiverRange, sourceRange);
    const rangeAccepted = qCmp(gap, Q_ZERO) > 0;
    const diagonalCertificate = rangeAccepted
      ? null
      : sameIntervalDiagonalCertificate(inputRow, receiver, source, lift, receiverDerivativeRange, period, fieldSpeed);
    const diagonalAccepted = Boolean(diagonalCertificate);
    const sourceInnerRange = orientedSourceInnerRange(
      sourceTheta,
      lift,
      inputRow.ledger,
      sourceDerivativeFloor,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw
    );
    const rootCertificate =
      rangeAccepted || diagonalAccepted
        ? null
        : simpleRootCertificate(
            inputRow,
            receiver,
            source,
            lift,
            receiverTheta,
            sourceTheta,
            receiverRange,
            sourceInnerRange,
            receiverDerivativeFloor,
            sourceDerivativeFloor,
            period,
            fieldSpeed,
            memoryHorizon
          );
    const simpleRootAccepted = Boolean(rootCertificate);
    const accepted = rangeAccepted || diagonalAccepted || simpleRootAccepted;
    const sourceCoverageGap = sourceInnerRange?.inner ? strictRangeCoverageGap(sourceInnerRange.inner, receiverRange) : null;
    const depthRange = memoryDepthRange(receiverTheta, sourceTheta, lift, period, fieldSpeed);
    const refinedFailureCode = simpleRootBlockingFailureCode(
      inputRow,
      receiver,
      source,
      lift,
      sourceDerivativeFloor,
      receiverDerivativeFloor,
      sourceInnerRange,
      sourceCoverageGap,
      depthRange,
      memoryHorizon
    );
    const failureCode = accepted ? "" : (refinedFailureCode ?? splitFailureCode(inputRow, receiver, source));
    const phaseDerivativeFloor =
      diagonalCertificate?.phase_derivative_floor.floor ?? rootCertificate?.source_phase_derivative_floor.floor ?? null;
    const jacobianFloor = diagonalCertificate?.jacobian_floor.floor ?? rootCertificate?.source_jacobian_floor.floor ?? null;
    const rowStatus = rangeAccepted || diagonalAccepted ? "empty" : simpleRootAccepted ? "simple_root" : "split_required";
    const certificateStatus = rangeAccepted
      ? "proof_interval_certified_range_empty"
      : diagonalAccepted
        ? "proof_interval_certified_monotone_diagonal_empty"
        : simpleRootAccepted
          ? "proof_interval_certified_simple_root"
          : "proof_interval_split_required";
    const emptyMethod = rangeAccepted
      ? "proof_interval_trig_range_empty"
      : diagonalAccepted
        ? "proof_interval_monotone_diagonal_exclusion"
        : null;
    const simpleRootMethod = rootCertificate?.method ?? null;

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
      source_inner_range_q: sourceInnerRange?.inner ? intervalJson(sourceInnerRange.inner) : null,
      source_endpoint_range_q: sourceInnerRange
        ? {
            left: intervalJson(sourceInnerRange.left_endpoint_range),
            right: intervalJson(sourceInnerRange.right_endpoint_range),
            source_derivative_sign: sourceInnerRange.source_derivative_sign,
          }
        : null,
      status: rowStatus,
      certificate_status: certificateStatus,
      empty_method: emptyMethod,
      simple_root_method: simpleRootMethod,
      range_gap: qToDecimal(gap),
      range_gap_q: qJson(gap),
      range_gap_display: qToDecimal(gap),
      source_coverage_gap: sourceCoverageGap ? qToDecimal(sourceCoverageGap) : null,
      source_coverage_gap_q: sourceCoverageGap ? qJson(sourceCoverageGap) : null,
      receiver_derivative_range_q: intervalJson(receiverDerivativeRange),
      source_derivative_range_q: intervalJson(sourceDerivativeRange),
      receiver_phase_derivative_floor: receiverDerivativeFloor ? qToDecimal(receiverDerivativeFloor.floor) : null,
      source_phase_derivative_floor: sourceDerivativeFloor ? qToDecimal(sourceDerivativeFloor.floor) : null,
      receiver_phase_derivative_floor_q: receiverDerivativeFloor ? qJson(receiverDerivativeFloor.floor) : null,
      source_phase_derivative_floor_q: sourceDerivativeFloor ? qJson(sourceDerivativeFloor.floor) : null,
      receiver_jacobian_floor: receiverJacobianFloor ? qToDecimal(receiverJacobianFloor.floor) : null,
      source_jacobian_floor: sourceJacobianFloor ? qToDecimal(sourceJacobianFloor.floor) : null,
      receiver_jacobian_floor_q: receiverJacobianFloor ? qJson(receiverJacobianFloor.floor) : null,
      source_jacobian_floor_q: sourceJacobianFloor ? qJson(sourceJacobianFloor.floor) : null,
      receiver_jacobian_sign: receiverJacobianFloor?.sign ?? null,
      source_jacobian_sign: sourceJacobianFloor?.sign ?? null,
      phase_derivative_floor: phaseDerivativeFloor ? qToDecimal(phaseDerivativeFloor) : null,
      phase_derivative_floor_q: phaseDerivativeFloor ? qJson(phaseDerivativeFloor) : null,
      receiver_monotone_floor:
        diagonalCertificate?.phase_derivative_floor.floor || rootCertificate?.receiver_phase_derivative_floor?.floor
          ? qToDecimal(diagonalCertificate?.phase_derivative_floor.floor ?? rootCertificate.receiver_phase_derivative_floor.floor)
          : null,
      monotone_floor: phaseDerivativeFloor ? qToDecimal(phaseDerivativeFloor) : null,
      monotone_floor_q: phaseDerivativeFloor ? qJson(phaseDerivativeFloor) : null,
      jacobian_floor: jacobianFloor ? qToDecimal(jacobianFloor) : null,
      jacobian_floor_q: jacobianFloor ? qJson(jacobianFloor) : null,
      root_count_bound: rangeAccepted || diagonalAccepted ? [0, 0] : rootCertificate?.root_count_bound ?? null,
      root_sign: rootCertificate?.root_sign ?? null,
      memory_depth_range: rootCertificate
        ? [qToDecimal(rootCertificate.memory_depth_range.lo), qToDecimal(rootCertificate.memory_depth_range.hi)]
        : null,
      memory_depth_range_q: rootCertificate ? intervalJson(rootCertificate.memory_depth_range) : null,
      gamma_tau: rootCertificate ? qToDecimal(rootCertificate.gamma_tau) : null,
      gamma_tau_q: rootCertificate ? qJson(rootCertificate.gamma_tau) : null,
      gamma_h: rootCertificate ? qToDecimal(rootCertificate.gamma_h) : null,
      gamma_h_q: rootCertificate ? qJson(rootCertificate.gamma_h) : null,
      gamma_sign: rootCertificate ? qToDecimal(rootCertificate.gamma_sign) : null,
      gamma_sign_q: rootCertificate ? qJson(rootCertificate.gamma_sign) : null,
      separator_event: inputRow.separator_event,
      diagonal_exclusion_ref: diagonalCertificate?.ref ?? null,
      diagonal_exclusion_certificate: diagonalCertificate
        ? {
            method: diagonalCertificate.method,
            excluded_diagonal_rule: "same-parameter diagonal is excluded by the seed-chart endpoint policy",
            derivative_range_q: intervalJson(receiverDerivativeRange),
            phase_derivative_floor: derivativeFloorArtifact(diagonalCertificate.phase_derivative_floor),
            jacobian_floor: derivativeFloorArtifact(diagonalCertificate.jacobian_floor),
          }
        : null,
      simple_root_ref: rootCertificate?.ref ?? null,
      simple_root_certificate: rootCertificate
        ? {
            method: rootCertificate.method,
            rule: rootCertificate.certificate_rule,
            source_outer_range_q: intervalJson(sourceRange),
            source_inner_range_q: intervalJson(rootCertificate.source_inner_range),
            source_endpoint_range_q: {
              left: intervalJson(rootCertificate.source_endpoint_ranges.left),
              right: intervalJson(rootCertificate.source_endpoint_ranges.right),
            },
            receiver_range_q: intervalJson(receiverRange),
            source_coverage_gap_q: qJson(rootCertificate.source_coverage_gap),
            source_phase_derivative_floor: derivativeFloorArtifact(rootCertificate.source_phase_derivative_floor),
            source_jacobian_floor: derivativeFloorArtifact(rootCertificate.source_jacobian_floor),
            receiver_phase_derivative_floor: derivativeFloorArtifact(rootCertificate.receiver_phase_derivative_floor),
            receiver_jacobian_floor: derivativeFloorArtifact(rootCertificate.receiver_jacobian_floor),
            memory_depth_range_q: intervalJson(rootCertificate.memory_depth_range),
            gamma_tau_q: qJson(rootCertificate.gamma_tau),
            gamma_h_q: qJson(rootCertificate.gamma_h),
            root_sign: rootCertificate.root_sign,
            gamma_sign_q: qJson(rootCertificate.gamma_sign),
            root_count_bound: rootCertificate.root_count_bound,
          }
        : null,
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
        derivative_policy:
          "v4 additionally encloses dY_sigma/dtheta=c_f*T_cyc+sigma*dX_delta/dtheta with exact-rational pi/Taylor ranges and accepts same-interval rows only by a strict derivative floor. For simple-root rows or subrows, v4 requires strict source and receiver derivative signs, strict oriented source-inner coverage of the receiver range, and strict memory-depth/horizon margins.",
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

function simpleRootSubrowArtifact(row, index) {
  return {
    row_id: `S_${row.ledger}_${row.receiver_interval}_${row.source_interval}_full_${index + 1}`,
    parent_base_row_id: row.row_id,
    packet_id: row.packet_id,
    refinement_id: row.refinement_id,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    ledger: row.ledger,
    source_lift_periods: row.source_lift_periods,
    receiver_theta_range: row.receiver_theta_range,
    source_theta_range: row.source_theta_range,
    receiver_range: row.receiver_range,
    source_range: row.source_range,
    status: "simple_root",
    source_coverage_gap: row.source_coverage_gap,
    source_coverage_gap_q: row.source_coverage_gap_q,
    monotone_floor: row.monotone_floor,
    monotone_floor_q: row.monotone_floor_q,
    receiver_monotone_floor: row.receiver_monotone_floor,
    jacobian_floor: row.jacobian_floor,
    jacobian_floor_q: row.jacobian_floor_q,
    memory_depth_range: row.memory_depth_range,
    memory_depth_range_q: row.memory_depth_range_q,
    gamma_tau: row.gamma_tau,
    gamma_tau_q: row.gamma_tau_q,
    gamma_h: row.gamma_h,
    gamma_h_q: row.gamma_h_q,
    root_sign: row.root_sign,
    gamma_sign: row.gamma_sign,
    gamma_sign_q: row.gamma_sign_q,
    root_count_bound: row.root_count_bound,
    simple_root_ref: row.simple_root_ref,
    notes:
      "Full parent row accepted as a simple-root row by strict source monotonicity, strict full-range coverage, and strict causal memory margins. This is not a parent-complement subdivision certificate.",
  };
}

function thetaGridSubinterval(parentTheta, gridSize, leftIndex, rightIndex) {
  const width = qSub(parentTheta.hi, parentTheta.lo);
  const den = BigInt(gridSize);
  return {
    lo: qAdd(parentTheta.lo, qMul(width, rat(BigInt(leftIndex), den))),
    hi: qAdd(parentTheta.lo, qMul(width, rat(BigInt(rightIndex), den))),
  };
}

function intervalWidth(interval) {
  return qSub(interval.hi, interval.lo);
}

function compareSubrowCandidates(left, right) {
  if (!right) {
    return 1;
  }
  const widthCompare = qCmp(left.receiver_theta_width, right.receiver_theta_width);
  if (widthCompare !== 0) {
    return widthCompare;
  }
  const coverageCompare = qCmp(left.certificate.source_coverage_gap, right.certificate.source_coverage_gap);
  if (coverageCompare !== 0) {
    return coverageCompare;
  }
  return qCmp(left.certificate.gamma_tau, right.certificate.gamma_tau);
}

function buildSimpleRootSubrowArtifact(candidate, index) {
  const row = candidate.parent_row;
  const cert = candidate.certificate;
  const receiverDerivativeFloor = cert.receiver_phase_derivative_floor;
  const sourceDerivativeFloor = cert.source_phase_derivative_floor;
  const sourceJacobianFloor = cert.source_jacobian_floor.floor;

  return {
    row_id: `S_${row.ledger}_${row.receiver_interval}_${row.source_interval}_v4_${index + 1}`,
    parent_base_row_id: row.row_id,
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    ledger: row.ledger,
    source_lift_periods: candidate.lift,
    receiver_theta_range: [qToDecimal(candidate.receiver_theta.lo), qToDecimal(candidate.receiver_theta.hi)],
    source_theta_range: [qToDecimal(candidate.source_theta.lo), qToDecimal(candidate.source_theta.hi)],
    receiver_theta_range_q: intervalJson(candidate.receiver_theta),
    source_theta_range_q: intervalJson(candidate.source_theta),
    receiver_range: [qToDecimal(candidate.receiver_range.lo), qToDecimal(candidate.receiver_range.hi)],
    source_range: [qToDecimal(candidate.source_outer_range.lo), qToDecimal(candidate.source_outer_range.hi)],
    receiver_range_q: intervalJson(candidate.receiver_range),
    source_outer_range_q: intervalJson(candidate.source_outer_range),
    source_inner_range_q: intervalJson(cert.source_inner_range),
    source_endpoint_range_q: {
      left: intervalJson(cert.source_endpoint_ranges.left),
      right: intervalJson(cert.source_endpoint_ranges.right),
    },
    status: "simple_root",
    simple_root_method: cert.method,
    source_coverage_gap: qToDecimal(cert.source_coverage_gap),
    source_coverage_gap_q: qJson(cert.source_coverage_gap),
    monotone_floor: qToDecimal(sourceDerivativeFloor.floor),
    monotone_floor_q: qJson(sourceDerivativeFloor.floor),
    receiver_monotone_floor: qToDecimal(receiverDerivativeFloor.floor),
    receiver_monotone_floor_q: qJson(receiverDerivativeFloor.floor),
    jacobian_floor: qToDecimal(sourceJacobianFloor),
    jacobian_floor_q: qJson(sourceJacobianFloor),
    memory_depth_range: [qToDecimal(cert.memory_depth_range.lo), qToDecimal(cert.memory_depth_range.hi)],
    memory_depth_range_q: intervalJson(cert.memory_depth_range),
    gamma_tau: qToDecimal(cert.gamma_tau),
    gamma_tau_q: qJson(cert.gamma_tau),
    gamma_h: qToDecimal(cert.gamma_h),
    gamma_h_q: qJson(cert.gamma_h),
    root_sign: cert.root_sign,
    gamma_sign: qToDecimal(cert.gamma_sign),
    gamma_sign_q: qJson(cert.gamma_sign),
    root_count_bound: cert.root_count_bound,
    simple_root_ref: cert.ref.replace(row.row_id, `${row.row_id}:subrow:${index + 1}`),
    subdivision_policy: {
      receiver_grid: SIMPLE_ROOT_RECEIVER_GRID,
      source_policy: "full_parent_source_interval",
      parent_consumed: false,
    },
    notes:
      "Receiver subwindow extracted against the full monotone source interval by strict oriented source-inner coverage. The parent row remains split_required until inactive receiver complements and boundary pieces are certified.",
  };
}

function findSimpleRootReceiverSubrow(
  inputRow,
  receiver,
  source,
  lift,
  receiverTheta,
  sourceTheta,
  sourceOuterRange,
  sourceDerivativeFloor,
  sourceInnerRange,
  period,
  fieldSpeed,
  memoryHorizon,
  contract,
  phiCyc,
  piIntervalRaw,
  subdivisions
) {
  if (
    receiver.interval_id === source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    touchesActiveFoldLedger(inputRow, receiver, source) ||
    !sourceDerivativeFloor ||
    !sourceInnerRange?.inner
  ) {
    return null;
  }

  let best = null;
  for (let left = 0; left < SIMPLE_ROOT_RECEIVER_GRID; left += 1) {
    for (let right = left + 1; right <= SIMPLE_ROOT_RECEIVER_GRID; right += 1) {
      const receiverSub = thetaGridSubinterval(receiverTheta, SIMPLE_ROOT_RECEIVER_GRID, left, right);
      const receiverDerivativeRange = nullDerivativeRangeForThetaInterval(
        receiverSub,
        inputRow.ledger,
        period,
        fieldSpeed,
        contract,
        phiCyc,
        piIntervalRaw,
        subdivisions
      );
      const receiverDerivativeFloor = derivativeFloorCertificate(receiverDerivativeRange);
      if (!receiverDerivativeFloor) {
        continue;
      }
      const receiverRange = nullRangeForThetaInterval(
        receiverSub,
        0,
        inputRow.ledger,
        period,
        fieldSpeed,
        contract,
        phiCyc,
        piIntervalRaw,
        subdivisions
      );
      const certificate = simpleRootCertificate(
        inputRow,
        receiver,
        source,
        lift,
        receiverSub,
        sourceTheta,
        receiverRange,
        sourceInnerRange,
        receiverDerivativeFloor,
        sourceDerivativeFloor,
        period,
        fieldSpeed,
        memoryHorizon
      );
      if (!certificate) {
        continue;
      }
      const candidate = {
        parent_row: inputRow,
        lift,
        receiver_theta: receiverSub,
        source_theta: sourceTheta,
        receiver_theta_width: intervalWidth(receiverSub),
        receiver_range: receiverRange,
        source_outer_range: sourceOuterRange,
        certificate,
      };
      if (compareSubrowCandidates(candidate, best) > 0) {
        best = candidate;
      }
    }
  }
  return best;
}

function extractSimpleRootSubrows(inputScreen, mesh, contract, phiCyc, period, fieldSpeed, memoryHorizon, piIntervalRaw, subdivisions, eligibleRowIds) {
  const intervalById = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const candidates = [];

  for (const inputRow of inputScreen.rows) {
    if (!eligibleRowIds.has(inputRow.row_id)) {
      continue;
    }
    const receiver = intervalById.get(inputRow.receiver_interval);
    const source = intervalById.get(inputRow.source_interval);
    if (!receiver || !source) {
      throw new Error(`Missing interval for row ${inputRow.row_id}`);
    }
    const lift = intFromJsonNumber(inputRow.source_lift_periods, `${inputRow.row_id}.source_lift_periods`);
    const receiverTheta = thetaRange(receiver, `${inputRow.row_id}.receiver`);
    const sourceTheta = thetaRange(source, `${inputRow.row_id}.source`);
    const sourceDerivativeRange = nullDerivativeRangeForThetaInterval(
      sourceTheta,
      inputRow.ledger,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const sourceDerivativeFloor = derivativeFloorCertificate(sourceDerivativeRange);
    const sourceInnerRange = orientedSourceInnerRange(
      sourceTheta,
      lift,
      inputRow.ledger,
      sourceDerivativeFloor,
      period,
      fieldSpeed,
      contract,
      phiCyc,
      piIntervalRaw
    );
    const sourceOuterRange = nullRangeForThetaInterval(
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
    const candidate = findSimpleRootReceiverSubrow(
      inputRow,
      receiver,
      source,
      lift,
      receiverTheta,
      sourceTheta,
      sourceOuterRange,
      sourceDerivativeFloor,
      sourceInnerRange,
      period,
      fieldSpeed,
      memoryHorizon,
      contract,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    if (candidate) {
      candidates.push(candidate);
    }
  }

  return candidates.map(buildSimpleRootSubrowArtifact);
}

function buildBackendCertificate(
  contractSource,
  phiCycSource,
  meshSource,
  inputSource,
  period,
  fieldSpeed,
  memoryHorizon,
  xBoundCertificate,
  subdivisions
) {
  return {
    schema: "breather-proof-interval-backend-certificate-v4",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_backend_trig_range_monotone_diagonal_simple_root_certificate_fail_closed",
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
      memory_horizon_h_q: qJson(memoryHorizon),
      note: "This v4 sidecar treats the packet decimal T_cyc and memory_horizon_h tokens as exact rational tokens for time ranges, derivative time terms, and simple-root memory margins. The rational pi interval is used only for trigonometric enclosure of X_delta and dX_delta/dtheta, not as a replacement for the packet period token.",
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
      derivative_rule:
        "Derivative enclosures split additionally at quarter-support bump derivative extrema and base sine extrema before hull formation.",
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
      "used_for_row_specific_range_empty rows, same-interval monotone diagonal exclusions, and fail-closed simple-root oriented source-inner coverage. Fold-layer certificates, parent-complement consumption, and seam endpoint ownership remain absent",
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
  const memoryHorizon = ratFromJsonNumber(inputScreen.common_identity.parameters.memory_horizon_h, "common_identity.parameters.memory_horizon_h");
  const piIntervalRaw = machinPiRaw();
  const xBoundCertificate = buildXBoundCertificate(contract, phiCyc);
  const rows = classifyRows(inputScreen, mesh, contract, phiCyc, period, fieldSpeed, memoryHorizon, xBoundCertificate, piIntervalRaw, subdivisions);
  const emptyRows = rows.filter((row) => row.status === "empty");
  const rangeEmptyRows = emptyRows.filter((row) => row.empty_method === "proof_interval_trig_range_empty");
  const diagonalRows = emptyRows.filter((row) => row.empty_method === "proof_interval_monotone_diagonal_exclusion");
  const simpleRootRows = rows.filter((row) => row.status === "simple_root");
  const splitRows = rows.filter((row) => row.status === "split_required");
  const eligibleSimpleRootParentIds = new Set(
    splitRows
      .filter((row) => row.failure_code.startsWith("trig_range_overlap_simple_root"))
      .map((row) => row.row_id)
  );
  const extractedSimpleRootSubrows = extractSimpleRootSubrows(
    inputScreen,
    mesh,
    contract,
    phiCyc,
    period,
    fieldSpeed,
    memoryHorizon,
    piIntervalRaw,
    subdivisions,
    eligibleSimpleRootParentIds
  );
  const simpleRootSubrows = [...simpleRootRows.map(simpleRootSubrowArtifact), ...extractedSimpleRootSubrows];
  const gammaEmpty = minPositive(rangeEmptyRows.map((row) => qFromJson(row.range_gap_q)));
  const gammaDiagonal = minPositive(diagonalRows.map((row) => qFromJson(row.jacobian_floor_q)));
  const nuSimple = minPositive(simpleRootSubrows.map((row) => qFromJson(row.jacobian_floor_q)));
  const gammaCov = minPositive(simpleRootSubrows.map((row) => qFromJson(row.source_coverage_gap_q)));
  const gammaTau = minPositive(simpleRootSubrows.map((row) => qFromJson(row.gamma_tau_q)));
  const gammaH = minPositive(simpleRootSubrows.map((row) => qFromJson(row.gamma_h_q)));
  const gammaSign = minPositive(simpleRootSubrows.map((row) => qFromJson(row.gamma_sign_q)));
  const backendCertificate = buildBackendCertificate(
    contractSource,
    phiCycSource,
    meshSource,
    inputSource,
    period,
    fieldSpeed,
    memoryHorizon,
    xBoundCertificate,
    subdivisions
  );

  return {
    backendCertificate,
    ledger: {
      schema: "breather-causal-ledger-fresh-proof-interval-v4",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
      source_numeric_artifacts: {
        contract: path.basename(contractSource.path),
        phi_cyc: path.basename(phiCycSource.path),
        mesh: path.basename(meshSource.path),
        input_screen: path.basename(inputSource.path),
      },
      status: "proof_interval_v4_trig_range_monotone_diagonal_simple_root_sidecar_branch_chart_blocked",
      acceptance_level: "exact_rational_json_lexeme_subdivided_trig_range_plus_monotone_diagonal_plus_simple_root_subwindow",
      claim_level:
        "exact-rational JSON numeric-token intake sidecar accepting strictly disjoint row-specific trigonometric null-coordinate ranges and strict same-interval monotone diagonal exclusions, and recording fail-closed simple-root subwindows whose oriented source-inner ranges strictly cover receiver ranges; no parent-complement consumption, fold-layer certificate, live ledger update, or branch-chart authorization",
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
        memory_horizon_h_q: qJson(memoryHorizon),
        source_time_rule: inputScreen.evaluation_policy.source_time_rule,
        interval_method:
          "Exact rational row time ranges are combined with certified row-specific X_delta ranges from rational pi and Taylor trigonometric enclosures. A row is accepted as empty when the receiver and source null-coordinate intervals are strictly disjoint, or when a same-interval row has a strict exact-rational derivative floor proving monotone diagonal exclusion. A regular non-seam row is accepted as simple_root only when the source null coordinate is strictly monotone, the source range strictly covers the full receiver range, and the causal memory depth has strict lower and horizon margins.",
        pass_rule:
          "This artifact passes only if every row is accepted as empty, simple_root, or fold_layer with no split_required rows. This v4 sidecar accepts range-empty and monotone diagonal-exclusion rows and records simple-root subwindow certificates, but no parent-complement consumption, seam endpoint ownership, or fold-layer rows.",
      },
      interval_method: {
        type: "exact_rational_subdivided_trig_x_delta_range",
        certificate_grade: "partial_proof_interval_trig_range_empty_monotone_diagonal_and_simple_root_subwindow_subset",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        pi_interval_q: intervalJson(piIntervalRaw),
        subdivisions_per_mesh_interval: subdivisions,
        sin_taylor_terms: SIN_TAYLOR_TERMS,
        cos_taylor_terms: COS_TAYLOR_TERMS,
        limitation:
          "This certificate certifies range-empty rows, same-interval monotone diagonal exclusions, and simple-root subwindows. It does not certify periodic seam endpoint ownership, fold-layer rows, dynamic residuals, or parent-complement consumption.",
      },
      summary: {
        base_rows: rows.length,
        certified_empty_base_rows: emptyRows.length,
        certified_range_empty_base_rows: rangeEmptyRows.length,
        certified_diagonal_exclusion_empty_rows: diagonalRows.length,
        certified_simple_root_rows: simpleRootRows.length,
        certified_simple_root_subrows: simpleRootSubrows.length,
        accepted_fold_layer_rows: 0,
        split_required_base_rows: splitRows.length,
        branch_chart_authorized: false,
      },
      global_margins: {
        gamma_empty_range_q: gammaEmpty ? qJson(gammaEmpty) : null,
        gamma_empty_range_display: gammaEmpty ? qToDecimal(gammaEmpty) : null,
        gamma_inact_range_q: gammaEmpty ? qJson(gammaEmpty) : null,
        gamma_inact_range_display: gammaEmpty ? qToDecimal(gammaEmpty) : null,
        gamma_diagonal_floor_q: gammaDiagonal ? qJson(gammaDiagonal) : null,
        gamma_diagonal_floor_display: gammaDiagonal ? qToDecimal(gammaDiagonal) : null,
        diagonal_exclusion_empty_rows: diagonalRows.length,
        nu_simple: nuSimple ? qToDecimal(nuSimple) : null,
        nu_simple_q: nuSimple ? qJson(nuSimple) : null,
        gamma_cov: gammaCov ? qToDecimal(gammaCov) : null,
        gamma_cov_q: gammaCov ? qJson(gammaCov) : null,
        gamma_tau: gammaTau ? qToDecimal(gammaTau) : null,
        gamma_tau_q: gammaTau ? qJson(gammaTau) : null,
        gamma_h: gammaH ? qToDecimal(gammaH) : null,
        gamma_h_q: gammaH ? qJson(gammaH) : null,
        gamma_sign: gammaSign ? qToDecimal(gammaSign) : null,
        gamma_sign_q: gammaSign ? qJson(gammaSign) : null,
        alpha_fold_min: null,
        nu_exit_fold_min: null,
        I_fold_all_finite: false,
        pass: false,
      },
      blocking_summary: countBy(splitRows, "failure_code"),
      intervals: mesh.preledger_intervals.map(unwrapSmallObject),
      rows,
      simple_root_subrows: simpleRootSubrows,
      fold_layer_rows: [],
      limitations: [
        "Certified trigonometric enclosures are used for row-specific range-empty rows, same-interval monotone diagonal exclusions, and simple-root source-inner coverage checks.",
        "Simple-root subwindows are recorded as proof-grade subrow certificates, but their parent rows remain split_required until inactive complements are consumed.",
        "No periodic seam endpoint-ownership or fold-layer row is accepted by this sidecar.",
        "No live causal_ledger.json rewrite or branch-chart construction is authorized.",
      ],
    },
  };
}

function rowTable(rows) {
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.status}\` | \`${row.empty_method ?? row.simple_root_method ?? row.failure_code}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.ledger}\` | ${row.range_gap_display} |`
    )
    .join("\n");
}

function simpleRootTable(rows) {
  if (!rows.length) {
    return "| none | none | none | none | none | none | none | none |";
  }
  return rows
    .map(
      (row) =>
        `| \`${row.row_id}\` | \`${row.parent_base_row_id}\` | \`${row.receiver_interval}\` | \`${row.source_interval}\` | \`${row.ledger}\` | ${row.source_coverage_gap} | ${row.jacobian_floor} | \`${row.memory_depth_range.join("..")}\` |`
    )
    .join("\n");
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-preledger-proof-interval-engine-audit-v4",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_trig_range_monotone_diagonal_simple_root_partial_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_type: "reduced exact rationals",
      range_method: "exact row time intervals plus certified subdivided trigonometric X_delta ranges, exact derivative ranges for monotone diagonal exclusions, and simple-root oriented source-inner coverage checks",
      binary64_endpoint_use: "none",
      subdivisions_per_mesh_interval: ledger.interval_method.subdivisions_per_mesh_interval,
      sin_taylor_terms: ledger.interval_method.sin_taylor_terms,
      cos_taylor_terms: ledger.interval_method.cos_taylor_terms,
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_rows: ledger.summary.certified_simple_root_rows,
      simple_root_subrows: ledger.summary.certified_simple_root_subrows,
      fold_layer_rows: 0,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      failure_code_counts: ledger.blocking_summary,
    },
    limitations: [
      "This is a partial trigonometric range-empty certificate, not the full null-coordinate preledger.",
      "The certificate consumes strict range-empty rows and strict monotone diagonal exclusions. It records simple-root subwindow certificates but does not consume their parent complements, seam endpoint ownership, or fold-layer obligations.",
      "Rows left as split_required block branch-chart authorization.",
      "A later pass must add periodic seam endpoint ownership, parent-complement consumption for recorded simple-root subwindows, and fold-layer impulse certificates.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  const splitRows = ledger.rows.filter((row) => row.status === "split_required");
  const emptyRows = ledger.rows.filter((row) => row.status === "empty");
  const simpleRootRows = ledger.simple_root_subrows;
  const blockers = Object.entries(ledger.blocking_summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`)
    .join("\n");

  return `# Fresh Proof-Interval Preledger v4 Report

## Verdict

The fresh packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v4 proof-interval sidecar certifies rows whose row-specific
rational trigonometric null-coordinate ranges are strictly disjoint,
same-interval regular rows whose rational derivative ranges prove strict
monotone diagonal exclusion, and simple-root subwindows whose oriented
source-inner range strictly covers the receiver range with strict source and
receiver monotonicity floors and strict causal memory margins. It uses the
conservative global envelope
$$
|X_\\delta(\\theta)| \\le ${ledger.interval_method.x_abs_bound_display}.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\\max}$ range.

It is a proof-grade subset for range-empty, monotone diagonal, and extracted
simple-root subwindows, but it is deliberately not a full pre-ledger. It does
not accept periodic seam endpoint rows, parent rows with unconsumed
simple-root complements, or fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | ${ledger.summary.base_rows} |
| Empty rows accepted by this proof-interval-v4 sidecar | ${ledger.summary.certified_empty_base_rows} |
| Range-empty rows accepted | ${ledger.summary.certified_range_empty_base_rows} |
| Split-required rows | ${ledger.summary.split_required_base_rows} |
| Certified diagonal exclusions | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Certified full-parent simple-root rows | ${ledger.summary.certified_simple_root_rows} |
| Certified simple-root subrows | ${ledger.summary.certified_simple_root_subrows} |
| Accepted fold-layer rows | ${ledger.summary.accepted_fold_layer_rows} |
| Minimum accepted range gap | ${ledger.global_margins.gamma_empty_range_display ?? "none"} |
| Minimum accepted diagonal Jacobian floor | ${ledger.global_margins.gamma_diagonal_floor_display ?? "none"} |
| Minimum simple-root Jacobian floor | ${ledger.global_margins.nu_simple ?? "none"} |
| Minimum simple-root coverage gap | ${ledger.global_margins.gamma_cov ?? "none"} |
| Minimum simple-root memory lower margin | ${ledger.global_margins.gamma_tau ?? "none"} |
| Minimum simple-root horizon margin | ${ledger.global_margins.gamma_h ?? "none"} |

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
and support-aware bump ranges. A range row is accepted as \`empty\` only when
the receiver and source null-coordinate hulls are strictly disjoint as rational
intervals. A same-interval regular row is accepted only when
$dY_\\sigma/d\\theta$ has one strict sign on the interval, with the row
Jacobian floor recorded as $|dY_\\sigma/d\\theta|/(c_fT_{\\mathrm{cyc}})$.
A simple-root row or subrow is certified only when the source
$Y_\\sigma$ derivative has one strict sign, an oriented source-inner range
strictly covers the receiver outward range, the receiver derivative has one
strict sign on the receiver block, and the inferred causal memory range lies
strictly inside $0<\\tau<h$. The root sign is then inherited from the
null-coordinate identity: $x(t)-x(s)>0$ for $u$ rows and $x(t)-x(s)<0$ for
$w$ rows.

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

## Accepted Simple-Root Rows

| Subrow | Parent | Receiver | Source | Ledger | Coverage gap | Jacobian floor | Memory depth |
| --- | --- | --- | --- | --- | ---: | ---: | --- |
${simpleRootTable(simpleRootRows)}

## Accepted Empty Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(emptyRows.slice(0, 24))}

## Next Certificate Action

The next proof advance is no longer range-empty enclosure or regular
same-interval monotone diagonal exclusion for the rows accepted here. It is
parent-complement consumption for any recorded simple-root subwindows, endpoint
ownership for the periodic seam, and same-packet fold-layer impulse fields for
active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and partial
range-empty/monotone-diagonal/simple-root certificate for the fresh packet, not
a passed pre-ledger and not reader-facing AAA prose. Keep it in the
proof-program priority packet until a full same-packet pre-ledger exists or the
packet is rejected by a proof-grade interval backend.
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

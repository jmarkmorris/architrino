#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const SOURCE_SEED_PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-trig-range-diagonal-simple-root-receiver-cover-v6`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v6`;
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_ROOT_COUNT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_PREVIOUS_LEDGER = `${CERT_DIR}/causal_ledger.${PACKET_ID}.proof-interval-v5.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const DEFAULT_SUBDIVISIONS = 32;
const SIMPLE_ROOT_RECEIVER_GRID = 32;
const DEFAULT_RECEIVER_MAX_DEPTH = 2;
const BASE_AMPLITUDE = rat(5n, 4n);
const SIN_TAYLOR_TERMS = 5;
const COS_TAYLOR_TERMS = 5;
const ENDPOINT_COS_CACHE = new Map();

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
    rootCountCertificate: DEFAULT_ROOT_COUNT_CERT,
    previousLedger: DEFAULT_PREVIOUS_LEDGER,
    outDir: DEFAULT_OUT_DIR,
    subdivisions: DEFAULT_SUBDIVISIONS,
    receiverMaxDepth: DEFAULT_RECEIVER_MAX_DEPTH,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++i];
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--result") {
      args.result = argv[++i];
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++i];
    } else if (arg === "--mesh") {
      args.mesh = argv[++i];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++i];
    } else if (arg === "--root-count-certificate") {
      args.rootCountCertificate = argv[++i];
    } else if (arg === "--previous-ledger") {
      args.previousLedger = argv[++i];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++i];
    } else if (arg === "--subdivisions") {
      args.subdivisions = Number.parseInt(argv[++i], 10);
      if (!Number.isSafeInteger(args.subdivisions) || args.subdivisions < 1) {
        throw new Error("--subdivisions must be a positive integer.");
      }
    } else if (arg === "--receiver-max-depth") {
      args.receiverMaxDepth = Number.parseInt(argv[++i], 10);
      if (!Number.isSafeInteger(args.receiverMaxDepth) || args.receiverMaxDepth < 0) {
        throw new Error("--receiver-max-depth must be a nonnegative integer.");
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-proof-interval-preledger-v6.mjs [options]

Options:
  --contract PATH                Source fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH                   Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH                  Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --phi-cyc PATH                 Higher-fold phi_cyc candidate JSON. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH                    Higher-fold mesh JSON. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH            Higher-fold preledger input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --root-count-certificate PATH  Higher-fold interval root-count certificate JSON. Defaults to ${DEFAULT_ROOT_COUNT_CERT}.
  --previous-ledger PATH         Higher-fold proof-interval v5 ledger JSON. Defaults to ${DEFAULT_PREVIOUS_LEDGER}.
  --out-dir PATH                 Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --subdivisions N               Uniform subintervals per mesh interval for row-specific X range enclosures. Defaults to ${DEFAULT_SUBDIVISIONS}.
  --receiver-max-depth N         Dyadic refinement depth inside each 32-cell receiver grid miss. Defaults to ${DEFAULT_RECEIVER_MAX_DEPTH}.
  --pretty                       Pretty-print JSON artifact.
  --help                         Show this help.`);
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

function qFromCertificateJson(value, label) {
  if (value?.num !== undefined && value?.den !== undefined) {
    return rat(BigInt(value.num), BigInt(value.den));
  }
  if (value?.numerator !== undefined && value?.denominator !== undefined) {
    return rat(BigInt(value.numerator), BigInt(value.denominator));
  }
  throw new Error(`Missing rational endpoint at ${label}`);
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

function sumWitnessAbs(witness, arcs, label) {
  let sum = Q_ZERO;
  const terms = [];
  for (const arc of arcs) {
    const basis = arc.basis;
    if (!witness[basis]) {
      throw new Error(`Missing ${label} witness coefficient ${basis}`);
    }
    const coeff = ratFromJsonNumber(witness[basis], `${label}.witness.${basis}`);
    const absCoeff = qAbs(coeff);
    sum = qAdd(sum, absCoeff);
    terms.push({
      basis,
      coefficient_lexeme: numberLexeme(witness[basis], `${label}.witness.${basis}`),
      coefficient_q: qJson(coeff),
      abs_coefficient_q: qJson(absCoeff),
    });
  }
  return { sum, terms };
}

function buildXBoundCertificate(contract, input, result, phiCyc) {
  const seedHistory = contract.seed_history;
  const seedEpsilon = ratFromJsonNumber(seedHistory.epsilon, "seed_history.epsilon");
  const seedWitness = sumWitnessAbs(seedHistory.witness, seedHistory.first_half_arcs, "seed_history");
  const seedShearBound = qMul(seedEpsilon, seedWitness.sum);
  const freshBound = qAdd(BASE_AMPLITUDE, seedShearBound);

  const lambda = ratFromJsonNumber(phiCyc.direct_path_seed.lambda, "phi_cyc.direct_path_seed.lambda");
  const repairWitness = sumWitnessAbs(result.witness, input.basis_definition.first_half_arcs, "shifted_separator_result");
  const repairBound = qMul(lambda, repairWitness.sum);
  const xAbsBound = qAdd(freshBound, repairBound);

  return {
    lambda,
    seedEpsilon,
    seedWitnessAbsSum: seedWitness.sum,
    repairWitnessAbsSum: repairWitness.sum,
    freshBound,
    repairBound,
    xAbsBound,
    artifact: {
      formula:
        "|X_seed(theta)| <= 5/4 + epsilon_fresh*sum_i |h_i| + lambda*sum_j |h_shifted_j|",
      proof_scope:
        "Uses |cos| <= 1 and 0 <= psi_i <= 1 on the source seed and shifted-separator repair bases. This is an audit ceiling; v6 row acceptance uses row-specific trigonometric enclosures, root-complement diagonal floors, simple-root coverage margins, and adaptive receiver-cover leaves.",
      base_amplitude_q: qJson(BASE_AMPLITUDE),
      seed_epsilon_lexeme: numberLexeme(seedHistory.epsilon, "seed_history.epsilon"),
      seed_epsilon_q: qJson(seedEpsilon),
      seed_witness_terms: seedWitness.terms,
      seed_witness_abs_sum_q: qJson(seedWitness.sum),
      seed_shear_bound_q: qJson(seedShearBound),
      fresh_bound_q: qJson(freshBound),
      direct_path_lambda_lexeme: numberLexeme(phiCyc.direct_path_seed.lambda, "phi_cyc.direct_path_seed.lambda"),
      direct_path_lambda_q: qJson(lambda),
      repair_witness_terms: repairWitness.terms,
      repair_witness_abs_sum_q: qJson(repairWitness.sum),
      repair_bound_q: qJson(repairBound),
      x_abs_bound_q: qJson(xAbsBound),
      x_abs_bound_display: qToDecimal(xAbsBound),
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

function intervalContainsInterval(container, child) {
  return qCmp(container.lo, child.lo) <= 0 && qCmp(child.hi, container.hi) <= 0;
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

function basisCriticalThetaPoints(arcs, delta) {
  const sourceBreaks = [Q_ZERO, rat(1n, 2n), Q_ONE];
  for (const arc of arcs) {
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

function sourceCriticalThetaPoints(contract, input) {
  const seedDelta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  return [
    ...basisCriticalThetaPoints(contract.seed_history.first_half_arcs, seedDelta),
    ...basisCriticalThetaPoints(input.basis_definition.first_half_arcs, Q_ZERO),
  ];
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

function freshXRangeForSourceSegment(sourceInterval, contract, piIntervalRaw) {
  const epsilon = ratFromJsonNumber(contract.seed_history.epsilon, "seed_history.epsilon");
  let xRange = intervalScale(BASE_AMPLITUDE, cosRangeUnitInterval(sourceInterval, piIntervalRaw));
  let shearRange = { lo: Q_ZERO, hi: Q_ZERO };

  for (const arc of contract.seed_history.first_half_arcs) {
    const coeff = ratFromJsonNumber(contract.seed_history.witness[arc.basis], `seed_history.witness.${arc.basis}`);
    shearRange = intervalAdd(shearRange, intervalScale(coeff, bumpRangeForArc(sourceInterval, arc, piIntervalRaw)));
  }

  xRange = intervalAdd(xRange, intervalScale(epsilon, shearRange));
  return xRange;
}

function freshXRangeForThetaInterval(thetaInterval, contract, piIntervalRaw) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  let range = null;
  for (const sourceSegment of sourceThetaSegments(thetaInterval, delta)) {
    range = intervalHull(range, freshXRangeForSourceSegment(sourceSegment, contract, piIntervalRaw));
  }
  return range;
}

function repairXRangeForThetaInterval(thetaInterval, input, result, piIntervalRaw) {
  let range = { lo: Q_ZERO, hi: Q_ZERO };
  for (const arc of input.basis_definition.first_half_arcs) {
    const coeff = ratFromJsonNumber(result.witness[arc.basis], `shifted_separator_result.witness.${arc.basis}`);
    range = intervalAdd(range, intervalScale(coeff, bumpRangeForArc(thetaInterval, arc, piIntervalRaw)));
  }
  return range;
}

function xRangeForThetaInterval(thetaInterval, contract, input, result, phiCyc, piIntervalRaw) {
  const lambda = ratFromJsonNumber(phiCyc.direct_path_seed.lambda, "phi_cyc.direct_path_seed.lambda");
  return intervalAdd(
    freshXRangeForThetaInterval(thetaInterval, contract, piIntervalRaw),
    intervalScale(lambda, repairXRangeForThetaInterval(thetaInterval, input, result, piIntervalRaw)),
  );
}

function nullRangeForThetaInterval(thetaInterval, liftPeriods, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw, subdivisions) {
  let range = null;
  for (const sub of subdivideInterval(thetaInterval, subdivisions, sourceCriticalThetaPoints(contract, input))) {
    const timeRange = liftedTimeRange(sub, liftPeriods, period, fieldSpeed);
    const xRange = xRangeForThetaInterval(sub, contract, input, result, phiCyc, piIntervalRaw);
    const nullRange =
      ledger === "u"
        ? { lo: qSub(timeRange.lo, xRange.hi), hi: qSub(timeRange.hi, xRange.lo) }
        : { lo: qAdd(timeRange.lo, xRange.lo), hi: qAdd(timeRange.hi, xRange.hi) };
    range = intervalHull(range, nullRange);
  }
  return range;
}

function xRangeForThetaIntervalSubdivided(thetaInterval, contract, input, result, phiCyc, piIntervalRaw, subdivisions) {
  let range = null;
  for (const sub of subdivideInterval(thetaInterval, subdivisions, sourceCriticalThetaPoints(contract, input))) {
    range = intervalHull(range, xRangeForThetaInterval(sub, contract, input, result, phiCyc, piIntervalRaw));
  }
  return range;
}

function expandByXBound(timeInterval, xBound) {
  return {
    lo: qSub(timeInterval.lo, xBound),
    hi: qAdd(timeInterval.hi, xBound),
  };
}

function certificateThetaInterval(interval, label) {
  return {
    lo: qFromCertificateJson(interval.theta_interval_q.lo, `${label}.theta_interval_q.lo`),
    hi: qFromCertificateJson(interval.theta_interval_q.hi, `${label}.theta_interval_q.hi`),
  };
}

function findContainingComplement(thetaInterval, rootCountCertificate) {
  for (const complement of rootCountCertificate.complement_intervals ?? []) {
    const complementTheta = certificateThetaInterval(complement, complement.interval_id);
    if (intervalContainsInterval(complementTheta, thetaInterval)) {
      return { complement, complementTheta };
    }
  }
  return null;
}

function fieldSpeedEquationForLedger(ledger) {
  if (ledger === "u") {
    return "xdot(theta)-1";
  }
  if (ledger === "w") {
    return "xdot(theta)+1";
  }
  throw new Error(`Unsupported ledger for diagonal certificate: ${ledger}`);
}

function isZeroRootCountBound(bound, label) {
  return (
    Array.isArray(bound) &&
    bound.length === 2 &&
    intFromJsonNumber(bound[0], `${label}.0`) === 0 &&
    intFromJsonNumber(bound[1], `${label}.1`) === 0
  );
}

function phaseSignFromFieldSpeedScan(ledger, scanSign) {
  if (ledger === "u") {
    return scanSign === "positive" ? "negative" : "positive";
  }
  return scanSign;
}

function derivativeFloorArtifact(sign, floor) {
  return {
    sign,
    floor_q: qJson(floor),
    floor_display: qToDecimal(floor),
  };
}

function rootComplementMonotoneCertificate(row, interval, thetaInterval, rootCountCertificate, period, fieldSpeed, refKind) {
  if (interval.type !== "regular" || qCmp(fieldSpeed, Q_ONE) !== 0) {
    return null;
  }

  const complementMatch = findContainingComplement(thetaInterval, rootCountCertificate);
  if (!complementMatch) {
    return null;
  }

  const equation = fieldSpeedEquationForLedger(row.ledger);
  const scan = complementMatch.complement.equation_scans.find((candidate) => candidate.equation === equation);
  if (
    !scan ||
    !scan.interval_certified_no_root ||
    !isZeroRootCountBound(scan.root_count_bound_q, `${complementMatch.complement.interval_id}.${equation}.root_count_bound_q`) ||
    scan.failing_pieces?.length
  ) {
    return null;
  }

  const jacobianFloor = qFromCertificateJson(scan.min_abs_residual_q, `${complementMatch.complement.interval_id}.${equation}.min_abs_residual_q`);
  if (qCmp(jacobianFloor, Q_ZERO) <= 0) {
    return null;
  }
  const phaseDerivativeFloor = qMul(qMul(fieldSpeed, period), jacobianFloor);
  const phaseSign = phaseSignFromFieldSpeedScan(row.ledger, scan.sign);

  return {
    method: "proof_interval_root_complement_monotone_null_coordinate",
    ref: `${PACKET_ID}:proof-interval-v6:${refKind}:${row.row_id}:${interval.interval_id}`,
    complement_interval_id: complementMatch.complement.interval_id,
    complement_theta_range_q: intervalJson(complementMatch.complementTheta),
    field_speed_equation: equation,
    field_speed_residual_sign: scan.sign,
    phase_derivative_sign: phaseSign,
    phase_derivative_floor: phaseDerivativeFloor,
    jacobian_floor: jacobianFloor,
    root_count_bound: [0, 0],
    complement_piece_count: unwrapSmallObject(scan.piece_count),
    min_abs_residual_display: scan.min_abs_residual_display,
  };
}

function sameIntervalDiagonalCertificate(row, receiver, source, lift, receiverTheta, rootCountCertificate, period, fieldSpeed) {
  if (
    receiver.interval_id !== source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular"
  ) {
    return null;
  }

  const monotone = rootComplementMonotoneCertificate(row, receiver, receiverTheta, rootCountCertificate, period, fieldSpeed, "diagonal");
  if (!monotone) {
    return null;
  }

  return {
    method: "proof_interval_root_complement_monotone_diagonal_exclusion",
    ref: `${PACKET_ID}:proof-interval-v6:diagonal:${row.row_id}`,
    complement_interval_id: monotone.complement_interval_id,
    complement_theta_range_q: monotone.complement_theta_range_q,
    field_speed_equation: monotone.field_speed_equation,
    field_speed_residual_sign: monotone.field_speed_residual_sign,
    phase_derivative_sign: monotone.phase_derivative_sign,
    phase_derivative_floor: monotone.phase_derivative_floor,
    jacobian_floor: monotone.jacobian_floor,
    root_count_bound: [0, 0],
    complement_piece_count: monotone.complement_piece_count,
    min_abs_residual_display: monotone.min_abs_residual_display,
  };
}

function nullPointRangeForTheta(theta, liftPeriods, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw) {
  const point = { lo: theta, hi: theta };
  const timeRange = liftedTimeRange(point, liftPeriods, period, fieldSpeed);
  const xRange = xRangeForThetaInterval(point, contract, input, result, phiCyc, piIntervalRaw);
  if (ledger === "u") {
    return { lo: qSub(timeRange.lo, xRange.hi), hi: qSub(timeRange.hi, xRange.lo) };
  }
  return { lo: qAdd(timeRange.lo, xRange.lo), hi: qAdd(timeRange.hi, xRange.hi) };
}

function strictRangeCoverageGap(sourceRange, receiverRange) {
  const loMargin = qSub(receiverRange.lo, sourceRange.lo);
  const hiMargin = qSub(sourceRange.hi, receiverRange.hi);
  if (qCmp(loMargin, Q_ZERO) <= 0 || qCmp(hiMargin, Q_ZERO) <= 0) {
    return null;
  }
  return qMin(loMargin, hiMargin);
}

function sourceCoverageMargins(sourceRange, receiverRange) {
  const loMargin = qSub(receiverRange.lo, sourceRange.lo);
  const hiMargin = qSub(sourceRange.hi, receiverRange.hi);
  const minMargin = qMin(loMargin, hiMargin);
  const coverageDefect = qCmp(minMargin, Q_ZERO) < 0 ? qNeg(minMargin) : Q_ZERO;
  let failedSide = "none";
  if (qCmp(loMargin, Q_ZERO) <= 0 && qCmp(hiMargin, Q_ZERO) <= 0) {
    failedSide = "both";
  } else if (qCmp(loMargin, Q_ZERO) <= 0) {
    failedSide = "lo";
  } else if (qCmp(hiMargin, Q_ZERO) <= 0) {
    failedSide = "hi";
  }
  return {
    lo_margin: loMargin,
    hi_margin: hiMargin,
    min_margin: minMargin,
    coverage_defect: coverageDefect,
    failed_side: failedSide,
  };
}

function sourceCoverageMarginArtifact(margins) {
  if (!margins) {
    return null;
  }
  return {
    source_cover_lo_margin_q: qJson(margins.lo_margin),
    source_cover_hi_margin_q: qJson(margins.hi_margin),
    source_cover_min_margin_q: qJson(margins.min_margin),
    coverage_defect_q: qJson(margins.coverage_defect),
    failed_side: margins.failed_side,
  };
}

function classifyReceiverMiss(reason, sourceCoverage, depth, maxDepth) {
  if (depth < maxDepth) {
    return "refinement_candidate";
  }
  if (reason === "trig_range_overlap_simple_root_receiver_not_strictly_covered" && sourceCoverage) {
    if (qCmp(sourceCoverage.min_margin, Q_ZERO) < 0) {
      return "structural_miss_candidate";
    }
    return "endpoint_or_refinement_limit_indeterminate";
  }
  if (reason === "receiver_root_complement_monotonicity_certificate_absent") {
    return "monotonicity_certificate_absent";
  }
  return "endpoint_or_refinement_limit_indeterminate";
}

function orientedSourceInnerRange(sourceTheta, lift, ledger, sourceMonotone, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw) {
  if (!sourceMonotone) {
    return null;
  }
  const leftEndpoint = nullPointRangeForTheta(sourceTheta.lo, lift, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw);
  const rightEndpoint = nullPointRangeForTheta(sourceTheta.hi, lift, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw);
  const inner =
    sourceMonotone.phase_derivative_sign === "positive"
      ? { lo: leftEndpoint.hi, hi: rightEndpoint.lo }
      : { lo: rightEndpoint.hi, hi: leftEndpoint.lo };
  if (qCmp(inner.lo, inner.hi) >= 0) {
    return {
      inner: null,
      left_endpoint_range: leftEndpoint,
      right_endpoint_range: rightEndpoint,
      source_derivative_sign: sourceMonotone.phase_derivative_sign,
    };
  }
  return {
    inner,
    left_endpoint_range: leftEndpoint,
    right_endpoint_range: rightEndpoint,
    source_derivative_sign: sourceMonotone.phase_derivative_sign,
  };
}

function orientedMonotoneOuterRange(thetaInterval, lift, ledger, monotone, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw) {
  if (!monotone) {
    return null;
  }
  const leftEndpoint = nullPointRangeForTheta(thetaInterval.lo, lift, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw);
  const rightEndpoint = nullPointRangeForTheta(thetaInterval.hi, lift, ledger, period, fieldSpeed, contract, input, result, phiCyc, piIntervalRaw);
  if (monotone.phase_derivative_sign === "positive") {
    return { lo: leftEndpoint.lo, hi: rightEndpoint.hi };
  }
  return { lo: rightEndpoint.lo, hi: leftEndpoint.hi };
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
  receiverMonotone,
  sourceMonotone,
  period,
  fieldSpeed,
  memoryHorizon
) {
  if (
    receiver.interval_id === source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    !sourceMonotone ||
    !receiverMonotone ||
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

  return {
    method: "proof_interval_simple_root_source_monotonicity_range_cover",
    ref: `${PACKET_ID}:proof-interval-v6:simple-root:${row.row_id}`,
    source_coverage_gap: sourceCoverageGap,
    source_inner_range: sourceInnerRange.inner,
    source_endpoint_ranges: {
      left: sourceInnerRange.left_endpoint_range,
      right: sourceInnerRange.right_endpoint_range,
    },
    source_monotone_certificate: sourceMonotone,
    receiver_monotone_certificate: receiverMonotone,
    source_phase_derivative_floor: sourceMonotone.phase_derivative_floor,
    source_jacobian_floor: {
      sign: sourceMonotone.phase_derivative_sign,
      floor: sourceMonotone.jacobian_floor,
    },
    receiver_phase_derivative_floor: receiverMonotone.phase_derivative_floor,
    receiver_jacobian_floor: {
      sign: receiverMonotone.phase_derivative_sign,
      floor: receiverMonotone.jacobian_floor,
    },
    memory_depth_range: depthRange,
    gamma_tau: depthRange.lo,
    gamma_h: gammaH,
    root_sign: simpleRootSign(row.ledger),
    gamma_sign: depthRange.lo,
    root_count_bound: [1, 1],
    certificate_rule:
      "The source null coordinate is strictly monotone on the certified root-count complement, its source range strictly covers the receiver range, and the causal memory window stays inside 0 < tau < h; therefore each receiver value has exactly one source root with the recorded sign.",
  };
}

function simpleRootBlockingFailureCode(
  row,
  receiver,
  source,
  lift,
  sourceMonotone,
  receiverMonotone,
  sourceInnerRange,
  sourceCoverageGap,
  depthRange,
  memoryHorizon
) {
  if (receiver.interval_id === source.interval_id) {
    return null;
  }
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return null;
  }
  if (lift !== 0) {
    return "trig_range_overlap_periodic_seam_endpoint_ownership_required";
  }
  if (!sourceMonotone) {
    return "trig_range_overlap_simple_root_source_not_strict_monotone";
  }
  if (!receiverMonotone) {
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
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return "trig_range_overlap_touches_fold_layer_candidate";
  }
  if (receiver.interval_id === source.interval_id) {
    return "trig_range_overlap_same_interval_diagonal_or_endpoint";
  }
  return "trig_range_overlap_requires_simple_root_or_complement_certificate";
}

function splitFailureReasons(code) {
  if (code === "trig_range_overlap_touches_fold_layer_candidate") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "higher_fold_separator_layer_certificate_absent",
      "row_not_promoted_to_fold_layer",
    ];
  }
  if (code === "trig_range_overlap_same_interval_diagonal_or_endpoint") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "root_complement_monotone_diagonal_or_endpoint_exclusion_not_certified_by_this_pass",
    ];
  }
  if (code === "trig_range_overlap_periodic_seam_endpoint_ownership_required") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "periodic_source_lift_requires_endpoint_or_complement_ownership",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_source_not_strict_monotone") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "source_root_complement_monotonicity_certificate_absent",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_receiver_not_strict_monotone") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "receiver_root_complement_monotonicity_certificate_absent",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_source_inner_range_degenerate") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "source_endpoint_outward_ranges_do_not_leave_a_strict_inner_range",
      "row_not_promoted_to_simple_root",
    ];
  }
  if (code === "trig_range_overlap_simple_root_receiver_not_strictly_covered") {
    return [
      "row_specific_trig_ranges_overlap_or_touch",
      "source_inner_range_does_not_strictly_cover_receiver_range",
      "row_not_promoted_to_simple_root",
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
    "simple_root_or_complement_certificate_absent",
  ];
}

function classifyRows(
  inputScreen,
  mesh,
  contract,
  input,
  result,
  phiCyc,
  rootCountCertificate,
  period,
  fieldSpeed,
  memoryHorizon,
  xBoundCertificate,
  piIntervalRaw,
  subdivisions
) {
  const intervalById = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const thetaCache = new Map();
  const timeCache = new Map();
  const xRangeCache = new Map();
  const nullRangeCache = new Map();
  const monotoneCache = new Map();
  const rows = [];

  const getTheta = (interval) => {
    if (!thetaCache.has(interval.interval_id)) {
      thetaCache.set(interval.interval_id, thetaRange(interval, interval.interval_id));
    }
    return thetaCache.get(interval.interval_id);
  };

  const getTimeRange = (interval, lift) => {
    const key = `${interval.interval_id}|${lift}`;
    if (!timeCache.has(key)) {
      timeCache.set(key, liftedTimeRange(getTheta(interval), lift, period, fieldSpeed));
    }
    return timeCache.get(key);
  };

  const getXRange = (interval) => {
    if (!xRangeCache.has(interval.interval_id)) {
      xRangeCache.set(
        interval.interval_id,
        xRangeForThetaIntervalSubdivided(getTheta(interval), contract, input, result, phiCyc, piIntervalRaw, subdivisions),
      );
    }
    return xRangeCache.get(interval.interval_id);
  };

  const getNullRange = (interval, lift, ledger) => {
    const key = `${interval.interval_id}|${lift}|${ledger}`;
    if (!nullRangeCache.has(key)) {
      nullRangeCache.set(
        key,
        nullRangeForThetaInterval(
          getTheta(interval),
          lift,
          ledger,
          period,
          fieldSpeed,
          contract,
          input,
          result,
          phiCyc,
          piIntervalRaw,
          subdivisions,
        ),
      );
    }
    return nullRangeCache.get(key);
  };

  const getMonotone = (interval, ledger) => {
    const key = `${interval.interval_id}|${ledger}`;
    if (!monotoneCache.has(key)) {
      monotoneCache.set(
        key,
        rootComplementMonotoneCertificate({ row_id: `interval:${interval.interval_id}`, ledger }, interval, getTheta(interval), rootCountCertificate, period, fieldSpeed, "monotone"),
      );
    }
    return monotoneCache.get(key);
  };

  for (const inputRow of inputScreen.rows) {
    const receiver = intervalById.get(inputRow.receiver_interval);
    const source = intervalById.get(inputRow.source_interval);
    if (!receiver || !source) {
      throw new Error(`Missing interval for row ${inputRow.row_id}`);
    }

    const lift = intFromJsonNumber(inputRow.source_lift_periods, `${inputRow.row_id}.source_lift_periods`);
    const receiverTheta = getTheta(receiver);
    const sourceTheta = getTheta(source);
    const receiverTime = getTimeRange(receiver, 0);
    const sourceTime = getTimeRange(source, lift);
    const receiverXRange = getXRange(receiver);
    const sourceXRange = getXRange(source);
    const receiverRange = getNullRange(receiver, 0, inputRow.ledger);
    const sourceRange = getNullRange(source, lift, inputRow.ledger);
    const gap = gapBetween(receiverRange, sourceRange);
    const rangeAccepted = qCmp(gap, Q_ZERO) > 0;
    const receiverMonotone = getMonotone(receiver, inputRow.ledger);
    const sourceMonotone = getMonotone(source, inputRow.ledger);
    const diagonalCertificate = rangeAccepted
      ? null
      : sameIntervalDiagonalCertificate(inputRow, receiver, source, lift, receiverTheta, rootCountCertificate, period, fieldSpeed);
    const diagonalAccepted = Boolean(diagonalCertificate);
    const sourceInnerRange = orientedSourceInnerRange(
      sourceTheta,
      lift,
      inputRow.ledger,
      sourceMonotone,
      period,
      fieldSpeed,
      contract,
      input,
      result,
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
            receiverMonotone,
            sourceMonotone,
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
      sourceMonotone,
      receiverMonotone,
      sourceInnerRange,
      sourceCoverageGap,
      depthRange,
      memoryHorizon
    );
    const failureCode = accepted ? "" : (refinedFailureCode ?? splitFailureCode(inputRow, receiver, source));
    const phaseDerivativeFloor =
      diagonalCertificate?.phase_derivative_floor ?? rootCertificate?.source_phase_derivative_floor ?? null;
    const jacobianFloor = diagonalCertificate?.jacobian_floor ?? rootCertificate?.source_jacobian_floor.floor ?? null;
    const rowStatus = rangeAccepted || diagonalAccepted ? "empty" : simpleRootAccepted ? "simple_root" : "split_required";
    const certificateStatus = rangeAccepted
      ? "proof_interval_certified_range_empty"
      : diagonalAccepted
        ? "proof_interval_certified_root_complement_monotone_diagonal_empty"
        : simpleRootAccepted
          ? "proof_interval_certified_simple_root"
          : "proof_interval_split_required";
    const emptyMethod = rangeAccepted
      ? "proof_interval_trig_range_empty"
      : diagonalAccepted
        ? "proof_interval_root_complement_monotone_diagonal_exclusion"
        : null;

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
      status: rowStatus,
      certificate_status: certificateStatus,
      empty_method: emptyMethod,
      simple_root_method: rootCertificate?.method ?? null,
      range_gap: qToDecimal(gap),
      range_gap_q: qJson(gap),
      range_gap_display: qToDecimal(gap),
      receiver_monotone_floor: receiverMonotone ? qToDecimal(receiverMonotone.phase_derivative_floor) : null,
      monotone_floor: phaseDerivativeFloor ? qToDecimal(phaseDerivativeFloor) : null,
      monotone_floor_q: phaseDerivativeFloor ? qJson(phaseDerivativeFloor) : null,
      jacobian_floor: jacobianFloor ? qToDecimal(jacobianFloor) : null,
      jacobian_floor_q: jacobianFloor ? qJson(jacobianFloor) : null,
      root_count_bound: rangeAccepted || diagonalAccepted ? [0, 0] : rootCertificate?.root_count_bound ?? null,
      root_sign: rootCertificate?.root_sign ?? null,
      memory_depth_range: rootCertificate ? intervalJson(rootCertificate.memory_depth_range) : null,
      source_coverage_gap_q: rootCertificate ? qJson(rootCertificate.source_coverage_gap) : null,
      gamma_tau_q: rootCertificate ? qJson(rootCertificate.gamma_tau) : null,
      gamma_h_q: rootCertificate ? qJson(rootCertificate.gamma_h) : null,
      gamma_sign_q: rootCertificate ? qJson(rootCertificate.gamma_sign) : null,
      separator_event: inputRow.separator_event,
      diagonal_exclusion_ref: diagonalCertificate?.ref ?? null,
      diagonal_exclusion_certificate: diagonalCertificate
        ? {
            method: diagonalCertificate.method,
            excluded_diagonal_rule: "same-parameter diagonal is excluded by the seed-chart endpoint policy",
            complement_interval_id: diagonalCertificate.complement_interval_id,
            complement_theta_range_q: diagonalCertificate.complement_theta_range_q,
            field_speed_equation: diagonalCertificate.field_speed_equation,
            field_speed_residual_sign: diagonalCertificate.field_speed_residual_sign,
            phase_derivative_floor: derivativeFloorArtifact(
              diagonalCertificate.phase_derivative_sign,
              diagonalCertificate.phase_derivative_floor
            ),
            jacobian_floor: derivativeFloorArtifact(diagonalCertificate.phase_derivative_sign, diagonalCertificate.jacobian_floor),
            root_count_bound: diagonalCertificate.root_count_bound,
            complement_piece_count: diagonalCertificate.complement_piece_count,
            min_abs_residual_display: diagonalCertificate.min_abs_residual_display,
        }
        : null,
      simple_root_ref: rootCertificate?.ref ?? null,
      simple_root_certificate: rootCertificate
        ? {
            method: rootCertificate.method,
            ref: rootCertificate.ref,
            source_coverage_gap_q: qJson(rootCertificate.source_coverage_gap),
            source_coverage_gap_display: qToDecimal(rootCertificate.source_coverage_gap),
            source_inner_range_q: intervalJson(rootCertificate.source_inner_range),
            source_endpoint_ranges_q: {
              left: intervalJson(rootCertificate.source_endpoint_ranges.left),
              right: intervalJson(rootCertificate.source_endpoint_ranges.right),
            },
            source_monotone_certificate: {
              complement_interval_id: rootCertificate.source_monotone_certificate.complement_interval_id,
              field_speed_equation: rootCertificate.source_monotone_certificate.field_speed_equation,
              field_speed_residual_sign: rootCertificate.source_monotone_certificate.field_speed_residual_sign,
              phase_derivative_floor: derivativeFloorArtifact(
                rootCertificate.source_monotone_certificate.phase_derivative_sign,
                rootCertificate.source_monotone_certificate.phase_derivative_floor
              ),
              jacobian_floor: derivativeFloorArtifact(
                rootCertificate.source_monotone_certificate.phase_derivative_sign,
                rootCertificate.source_monotone_certificate.jacobian_floor
              ),
              root_count_bound: rootCertificate.source_monotone_certificate.root_count_bound,
            },
            receiver_monotone_certificate: {
              complement_interval_id: rootCertificate.receiver_monotone_certificate.complement_interval_id,
              field_speed_equation: rootCertificate.receiver_monotone_certificate.field_speed_equation,
              field_speed_residual_sign: rootCertificate.receiver_monotone_certificate.field_speed_residual_sign,
              phase_derivative_floor: derivativeFloorArtifact(
                rootCertificate.receiver_monotone_certificate.phase_derivative_sign,
                rootCertificate.receiver_monotone_certificate.phase_derivative_floor
              ),
              jacobian_floor: derivativeFloorArtifact(
                rootCertificate.receiver_monotone_certificate.phase_derivative_sign,
                rootCertificate.receiver_monotone_certificate.jacobian_floor
              ),
              root_count_bound: rootCertificate.receiver_monotone_certificate.root_count_bound,
            },
            memory_depth_range_q: intervalJson(rootCertificate.memory_depth_range),
            gamma_tau_q: qJson(rootCertificate.gamma_tau),
            gamma_h_q: qJson(rootCertificate.gamma_h),
            gamma_sign_q: qJson(rootCertificate.gamma_sign),
            root_count_bound: rootCertificate.root_count_bound,
            root_sign: rootCertificate.root_sign,
            certificate_rule: rootCertificate.certificate_rule,
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
        null_coordinate_policy: "Each subinterval encloses Y_sigma(theta)=c_f*T*(theta+lift)+sigma*X_seed(theta) with certified trigonometric X_seed ranges, then hulls the subranges.",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        subdivisions,
        sin_taylor_terms: SIN_TAYLOR_TERMS,
        cos_taylor_terms: COS_TAYLOR_TERMS,
        derivative_policy:
          "v6 accepts same-regular-interval diagonal rows only when the higher-fold root-count complement certificate proves the appropriate xdot(theta)+/-1 residual has strict nonzero sign over a containing complement interval. Regular simple-root rows additionally require strict source coverage and memory margins; adaptive receiver-cover leaves remain audit-only until endpoint ownership/no-double-counting is certified.",
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
    simple_root_method: row.simple_root_method,
    source_coverage_gap_q: row.source_coverage_gap_q,
    monotone_floor: row.monotone_floor,
    monotone_floor_q: row.monotone_floor_q,
    receiver_monotone_floor: row.receiver_monotone_floor,
    jacobian_floor: row.jacobian_floor,
    jacobian_floor_q: row.jacobian_floor_q,
    memory_depth_range: row.memory_depth_range,
    gamma_tau_q: row.gamma_tau_q,
    gamma_h_q: row.gamma_h_q,
    root_sign: row.root_sign,
    gamma_sign_q: row.gamma_sign_q,
    root_count_bound: row.root_count_bound,
    simple_root_ref: row.simple_root_ref,
    notes:
      "Full parent row accepted as a simple-root row by strict root-complement monotonicity, strict full-range coverage, and strict causal memory margins. This is not a parent-complement subdivision certificate.",
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

function pow2Number(exp) {
  return 2 ** exp;
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
  const sourcePhaseFloor = cert.source_phase_derivative_floor;
  const receiverPhaseFloor = cert.receiver_phase_derivative_floor;
  const sourceJacobianFloor = cert.source_jacobian_floor.floor;

  return {
    row_id: `S_${row.ledger}_${row.receiver_interval}_${row.source_interval}_v6_${index + 1}`,
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
    monotone_floor: qToDecimal(sourcePhaseFloor),
    monotone_floor_q: qJson(sourcePhaseFloor),
    receiver_monotone_floor: qToDecimal(receiverPhaseFloor),
    receiver_monotone_floor_q: qJson(receiverPhaseFloor),
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
      "Receiver subwindow extracted against the full monotone source interval by strict oriented source-inner coverage. The parent row remains split_required until receiver complements and boundary pieces are certified.",
  };
}

function buildSimpleRootCoverCellArtifact(candidate, coverIndex, cellIndex) {
  const row = candidate.parent_row;
  const cert = candidate.certificate;
  const sourcePhaseFloor = cert.source_phase_derivative_floor;
  const receiverPhaseFloor = cert.receiver_phase_derivative_floor;
  const sourceJacobianFloor = cert.source_jacobian_floor.floor;
  const receiverGridSize = candidate.receiver_grid_size ?? SIMPLE_ROOT_RECEIVER_GRID;
  const receiverMaxDepth = candidate.receiver_max_depth ?? 0;

  return {
    row_id: `C_${row.ledger}_${row.receiver_interval}_${row.source_interval}_v6_${coverIndex + 1}_${cellIndex + 1}`,
    parent_base_row_id: row.row_id,
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    ledger: row.ledger,
    source_lift_periods: candidate.lift,
    receiver_grid_cell: candidate.grid_cell,
    receiver_grid_size: receiverGridSize,
    receiver_cell_path: candidate.receiver_cell_path ?? `${candidate.grid_cell}`,
    receiver_refinement_depth: candidate.receiver_refinement_depth ?? 0,
    receiver_max_refinement_depth: receiverMaxDepth,
    receiver_terminal_grid_span: candidate.receiver_terminal_grid_span ?? null,
    classification: candidate.classification ?? "certified_simple_root_leaf",
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
    status: "simple_root_receiver_cover_cell",
    simple_root_method: cert.method,
    source_coverage_gap: qToDecimal(cert.source_coverage_gap),
    source_coverage_gap_q: qJson(cert.source_coverage_gap),
    monotone_floor: qToDecimal(sourcePhaseFloor),
    monotone_floor_q: qJson(sourcePhaseFloor),
    receiver_monotone_floor: qToDecimal(receiverPhaseFloor),
    receiver_monotone_floor_q: qJson(receiverPhaseFloor),
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
    simple_root_ref: cert.ref.replace(row.row_id, `${row.row_id}:cover-cell:${cellIndex + 1}`),
    subdivision_policy: {
      receiver_base_grid: SIMPLE_ROOT_RECEIVER_GRID,
      receiver_terminal_grid: receiverGridSize,
      receiver_max_refinement_depth: receiverMaxDepth,
      source_policy: "full_parent_source_interval",
      parent_consumed: false,
      endpoint_ownership_required_for_parent_consumption: true,
    },
    notes:
      "Receiver adaptive-cover leaf certified against the full monotone source interval by strict oriented source-inner coverage. The parent row remains split_required until the cover is complete and endpoint ownership/no-double-counting is certified.",
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
  sourceMonotone,
  sourceInnerRange,
  rootCountCertificate,
  period,
  fieldSpeed,
  memoryHorizon,
  contract,
  input,
  result,
  phiCyc,
  piIntervalRaw,
  subdivisions
) {
  if (
    receiver.interval_id === source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    !sourceMonotone ||
    !sourceInnerRange?.inner
  ) {
    return null;
  }

  let best = null;
  for (let left = 0; left < SIMPLE_ROOT_RECEIVER_GRID; left += 1) {
    const right = left + 1;
      const receiverSub = thetaGridSubinterval(receiverTheta, SIMPLE_ROOT_RECEIVER_GRID, left, right);
      const receiverMonotone = rootComplementMonotoneCertificate(
        inputRow,
        receiver,
        receiverSub,
        rootCountCertificate,
        period,
        fieldSpeed,
        "simple-root-subrow-receiver"
      );
      if (!receiverMonotone) {
        continue;
      }
      const receiverRange = orientedMonotoneOuterRange(
        receiverSub,
        0,
        inputRow.ledger,
        receiverMonotone,
        period,
        fieldSpeed,
        contract,
        input,
        result,
        phiCyc,
        piIntervalRaw
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
        receiverMonotone,
        sourceMonotone,
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
  return best;
}

function findSimpleRootReceiverGridCover(
  inputRow,
  receiver,
  source,
  lift,
  receiverTheta,
  sourceTheta,
  sourceOuterRange,
  sourceMonotone,
  sourceInnerRange,
  rootCountCertificate,
  period,
  fieldSpeed,
  memoryHorizon,
  contract,
  input,
  result,
  phiCyc,
  piIntervalRaw,
  subdivisions,
  receiverMaxDepth
) {
  if (
    receiver.interval_id === source.interval_id ||
    lift !== 0 ||
    receiver.type !== "regular" ||
    source.type !== "regular" ||
    !sourceMonotone ||
    !sourceInnerRange?.inner
  ) {
    return null;
  }

  const acceptedCells = [];
  const missingCells = [];
  const baseCellOutcomes = [];
  const terminalMultiplier = pow2Number(receiverMaxDepth);
  const terminalGridSize = SIMPLE_ROOT_RECEIVER_GRID * terminalMultiplier;

  const evaluateCell = (receiverSub, baseCell, pathId, depth, terminalLeft, terminalRight) => {
    const receiverMonotone = rootComplementMonotoneCertificate(
      inputRow,
      receiver,
      receiverSub,
      rootCountCertificate,
      period,
      fieldSpeed,
      "simple-root-cover-cell-receiver"
    );
    if (!receiverMonotone) {
      const reason = "receiver_root_complement_monotonicity_certificate_absent";
      return {
        accepted: false,
        missing: {
          base_cell: baseCell,
          receiver_cell_path: pathId,
          receiver_refinement_depth: depth,
          receiver_theta_width_q: qJson(intervalWidth(receiverSub)),
          receiver_terminal_grid_span: {
            lo: terminalLeft,
            hi: terminalRight,
            den: terminalGridSize,
          },
          receiver_theta_range_q: intervalJson(receiverSub),
          classification: classifyReceiverMiss(reason, null, depth, receiverMaxDepth),
          reason,
          monotone_lookup_status: "receiver_monotone_certificate_absent",
        },
      };
    }

    const receiverRange = orientedMonotoneOuterRange(
      receiverSub,
      0,
      inputRow.ledger,
      receiverMonotone,
      period,
      fieldSpeed,
      contract,
      input,
      result,
      phiCyc,
      piIntervalRaw
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
      receiverMonotone,
      sourceMonotone,
      period,
      fieldSpeed,
      memoryHorizon
    );
    if (certificate) {
      return {
        accepted: true,
        candidate: {
          parent_row: inputRow,
          lift,
          grid_cell: baseCell,
          receiver_cell_path: pathId,
          receiver_refinement_depth: depth,
          receiver_max_depth: receiverMaxDepth,
          receiver_grid_size: terminalGridSize,
          classification: "certified_simple_root_leaf",
          receiver_terminal_grid_span: {
            lo: terminalLeft,
            hi: terminalRight,
            den: terminalGridSize,
          },
          receiver_theta: receiverSub,
          source_theta: sourceTheta,
          receiver_theta_width: intervalWidth(receiverSub),
          receiver_range: receiverRange,
          source_outer_range: sourceOuterRange,
          certificate,
        },
      };
    }

    const sourceCoverage = sourceCoverageMargins(sourceInnerRange.inner, receiverRange);
    const sourceCoverageGap = strictRangeCoverageGap(sourceInnerRange.inner, receiverRange);
    const depthRange = memoryDepthRange(receiverSub, sourceTheta, lift, period, fieldSpeed);
    const reason = simpleRootBlockingFailureCode(
      inputRow,
      receiver,
      source,
      lift,
      sourceMonotone,
      receiverMonotone,
      sourceInnerRange,
      sourceCoverageGap,
      depthRange,
      memoryHorizon
    );
    return {
      accepted: false,
      missing: {
        base_cell: baseCell,
        receiver_cell_path: pathId,
        receiver_refinement_depth: depth,
        receiver_theta_width_q: qJson(intervalWidth(receiverSub)),
        receiver_terminal_grid_span: {
          lo: terminalLeft,
          hi: terminalRight,
          den: terminalGridSize,
        },
        receiver_theta_range_q: intervalJson(receiverSub),
        receiver_range_q: intervalJson(receiverRange),
        source_inner_range_q: intervalJson(sourceInnerRange.inner),
        ...sourceCoverageMarginArtifact(sourceCoverage),
        source_coverage_gap_q: sourceCoverageGap ? qJson(sourceCoverageGap) : null,
        memory_depth_range_q: intervalJson(depthRange),
        gamma_tau_q: qJson(depthRange.lo),
        gamma_h_q: qJson(qSub(memoryHorizon, depthRange.hi)),
        classification: classifyReceiverMiss(reason, sourceCoverage, depth, receiverMaxDepth),
        reason,
        monotone_lookup_status: "receiver_monotone_certificate_present",
      },
    };
  };

  const visitRefinedCell = (receiverSub, baseCell, pathId, depth, terminalLeft, terminalRight) => {
    const evaluated = evaluateCell(receiverSub, baseCell, pathId, depth, terminalLeft, terminalRight);
    if (evaluated.accepted) {
      acceptedCells.push(evaluated.candidate);
      return { accepted_leaf_count: 1, missing_leaf_count: 0 };
    }
    if (depth >= receiverMaxDepth) {
      missingCells.push(evaluated.missing);
      return { accepted_leaf_count: 0, missing_leaf_count: 1 };
    }

    const midpoint = qAdd(receiverSub.lo, qDiv(intervalWidth(receiverSub), rat(2n)));
    const terminalMid = Math.floor((terminalLeft + terminalRight) / 2);
    const leftResult = visitRefinedCell(
      { lo: receiverSub.lo, hi: midpoint },
      baseCell,
      `${pathId}.0`,
      depth + 1,
      terminalLeft,
      terminalMid
    );
    const rightResult = visitRefinedCell(
      { lo: midpoint, hi: receiverSub.hi },
      baseCell,
      `${pathId}.1`,
      depth + 1,
      terminalMid,
      terminalRight
    );
    return {
      accepted_leaf_count: leftResult.accepted_leaf_count + rightResult.accepted_leaf_count,
      missing_leaf_count: leftResult.missing_leaf_count + rightResult.missing_leaf_count,
    };
  };

  for (let left = 0; left < SIMPLE_ROOT_RECEIVER_GRID; left += 1) {
    const right = left + 1;
    const receiverSub = thetaGridSubinterval(receiverTheta, SIMPLE_ROOT_RECEIVER_GRID, left, right);
    const terminalLeft = left * terminalMultiplier;
    const terminalRight = right * terminalMultiplier;
    const baseEval = evaluateCell(receiverSub, left, `${left}`, 0, terminalLeft, terminalRight);
    if (baseEval.accepted) {
      acceptedCells.push(baseEval.candidate);
      baseCellOutcomes.push({
        base_cell: left,
        initial_reason: null,
        status: "accepted_at_base_grid",
        accepted_leaf_count: 1,
        missing_leaf_count: 0,
        resolved_by_refinement: false,
      });
      continue;
    }

    if (receiverMaxDepth === 0) {
      missingCells.push(baseEval.missing);
      baseCellOutcomes.push({
        base_cell: left,
        initial_reason: baseEval.missing.reason,
        status: "missing_at_base_grid",
        accepted_leaf_count: 0,
        missing_leaf_count: 1,
        resolved_by_refinement: false,
      });
      continue;
    }

    const midpoint = qAdd(receiverSub.lo, qDiv(intervalWidth(receiverSub), rat(2n)));
    const terminalMid = Math.floor((terminalLeft + terminalRight) / 2);
    const leftResult = visitRefinedCell(
      { lo: receiverSub.lo, hi: midpoint },
      left,
      `${left}.0`,
      1,
      terminalLeft,
      terminalMid
    );
    const rightResult = visitRefinedCell(
      { lo: midpoint, hi: receiverSub.hi },
      left,
      `${left}.1`,
      1,
      terminalMid,
      terminalRight
    );
    const acceptedLeafCount = leftResult.accepted_leaf_count + rightResult.accepted_leaf_count;
    const missingLeafCount = leftResult.missing_leaf_count + rightResult.missing_leaf_count;
    baseCellOutcomes.push({
      base_cell: left,
      initial_reason: baseEval.missing.reason,
      status: missingLeafCount === 0 ? "resolved_by_adaptive_refinement" : "terminal_miss_after_adaptive_refinement",
      accepted_leaf_count: acceptedLeafCount,
      missing_leaf_count: missingLeafCount,
      resolved_by_refinement: missingLeafCount === 0,
    });
  }

  return {
    parent_row: inputRow,
    receiver_theta: receiverTheta,
    source_theta: sourceTheta,
    source_outer_range: sourceOuterRange,
    accepted_cells: acceptedCells,
    missing_cells: missingCells,
    receiver_grid_size: SIMPLE_ROOT_RECEIVER_GRID,
    receiver_terminal_grid_size: terminalGridSize,
    receiver_max_refinement_depth: receiverMaxDepth,
    receiver_grid_cover_complete: missingCells.length === 0,
    base_cell_outcomes: baseCellOutcomes,
  };
}

function buildSimpleRootReceiverCoverAudit(audit, index) {
  const row = audit.parent_row;
  const cells = audit.accepted_cells.map((cell, cellIndex) => buildSimpleRootCoverCellArtifact(cell, index, cellIndex));
  const acceptedCoverageWidth = audit.accepted_cells
    .map((cell) => intervalWidth(cell.receiver_theta))
    .reduce((sum, width) => qAdd(sum, width), Q_ZERO);
  const missingCoverageWidth = audit.missing_cells
    .map((cell) => intervalWidth({ lo: qFromJson(cell.receiver_theta_range_q.lo), hi: qFromJson(cell.receiver_theta_range_q.hi) }))
    .reduce((sum, width) => qAdd(sum, width), Q_ZERO);
  const structuralMissingWidth = audit.missing_cells
    .filter((cell) => cell.classification === "structural_miss_candidate")
    .map((cell) => intervalWidth({ lo: qFromJson(cell.receiver_theta_range_q.lo), hi: qFromJson(cell.receiver_theta_range_q.hi) }))
    .reduce((sum, width) => qAdd(sum, width), Q_ZERO);
  const receiverWidth = intervalWidth(audit.receiver_theta);
  const resolvedByRefinement = audit.base_cell_outcomes.filter((cell) => cell.resolved_by_refinement).length;
  const terminalMissingBaseCells = audit.base_cell_outcomes.filter((cell) => cell.missing_leaf_count > 0).length;
  const classificationCounts = countBy(audit.missing_cells, "classification");
  const failureReasonCounts = countBy(audit.missing_cells, "reason");
  const structuralMissCount = classificationCounts.structural_miss_candidate ?? 0;
  const indeterminateMissCount = classificationCounts.endpoint_or_refinement_limit_indeterminate ?? 0;
  return {
    row_id: `G_${row.ledger}_${row.receiver_interval}_${row.source_interval}_v6_${index + 1}`,
    parent_base_row_id: row.row_id,
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    receiver_interval: row.receiver_interval,
    source_interval: row.source_interval,
    ledger: row.ledger,
    source_lift_periods: intFromJsonNumber(row.source_lift_periods, `${row.row_id}.source_lift_periods`),
    receiver_grid_size: audit.receiver_grid_size,
    receiver_terminal_grid_size: audit.receiver_terminal_grid_size,
    receiver_max_refinement_depth: audit.receiver_max_refinement_depth,
    accepted_cell_count: audit.accepted_cells.length,
    accepted_leaf_count: audit.accepted_cells.length,
    missing_cell_count: audit.missing_cells.length,
    missing_terminal_leaf_count: audit.missing_cells.length,
    structural_miss_count: structuralMissCount,
    indeterminate_miss_count: indeterminateMissCount,
    failure_reason_counts: failureReasonCounts,
    missing_classification_counts: classificationCounts,
    coarse_cells_resolved_by_refinement: resolvedByRefinement,
    coarse_cells_still_missing_after_refinement: terminalMissingBaseCells,
    receiver_grid_cover_complete: audit.receiver_grid_cover_complete,
    parent_consumed: false,
    parent_consumption_blocker: audit.receiver_grid_cover_complete
      ? "endpoint_ownership_no_double_counting_certificate_absent"
      : "adaptive_receiver_cover_incomplete",
    receiver_theta_range_q: intervalJson(audit.receiver_theta),
    source_theta_range_q: intervalJson(audit.source_theta),
    accepted_receiver_width_q: qJson(acceptedCoverageWidth),
    missing_receiver_width_q: qJson(missingCoverageWidth),
    structural_missing_width_q: qJson(structuralMissingWidth),
    coverage_ratio_q: qJson(qDiv(acceptedCoverageWidth, receiverWidth)),
    parent_receiver_width_q: qJson(receiverWidth),
    missing_receiver_grid_cells: audit.missing_cells,
    adaptive_refinement: {
      receiver_base_grid_size: audit.receiver_grid_size,
      receiver_terminal_grid_size: audit.receiver_terminal_grid_size,
      receiver_max_refinement_depth: audit.receiver_max_refinement_depth,
      base_cell_outcomes: audit.base_cell_outcomes,
    },
    cells,
    notes:
      "Fail-closed v6 adaptive receiver-cover audit. Certified leaves are proof-grade simple-root subwindows, but the parent row is not consumed without complete adaptive coverage and a separate endpoint ownership/no-double-counting certificate.",
  };
}

function extractSimpleRootSubrows(
  inputScreen,
  mesh,
  contract,
  input,
  result,
  phiCyc,
  rootCountCertificate,
  period,
  fieldSpeed,
  memoryHorizon,
  piIntervalRaw,
  subdivisions,
  eligibleRowIds
) {
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
    const sourceMonotone = rootComplementMonotoneCertificate(
      inputRow,
      source,
      sourceTheta,
      rootCountCertificate,
      period,
      fieldSpeed,
      "simple-root-source"
    );
    const sourceInnerRange = orientedSourceInnerRange(
      sourceTheta,
      lift,
      inputRow.ledger,
      sourceMonotone,
      period,
      fieldSpeed,
      contract,
      input,
      result,
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
      input,
      result,
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
      sourceMonotone,
      sourceInnerRange,
      rootCountCertificate,
      period,
      fieldSpeed,
      memoryHorizon,
      contract,
      input,
      result,
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

function extractSimpleRootReceiverCoverAudits(
  inputScreen,
  mesh,
  contract,
  input,
  result,
  phiCyc,
  rootCountCertificate,
  period,
  fieldSpeed,
  memoryHorizon,
  piIntervalRaw,
  subdivisions,
  eligibleRowIds,
  receiverMaxDepth
) {
  const intervalById = new Map(mesh.preledger_intervals.map((interval) => [interval.interval_id, interval]));
  const audits = [];

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
    const sourceMonotone = rootComplementMonotoneCertificate(
      inputRow,
      source,
      sourceTheta,
      rootCountCertificate,
      period,
      fieldSpeed,
      "simple-root-cover-source"
    );
    const sourceInnerRange = orientedSourceInnerRange(
      sourceTheta,
      lift,
      inputRow.ledger,
      sourceMonotone,
      period,
      fieldSpeed,
      contract,
      input,
      result,
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
      input,
      result,
      phiCyc,
      piIntervalRaw,
      subdivisions
    );
    const audit = findSimpleRootReceiverGridCover(
      inputRow,
      receiver,
      source,
      lift,
      receiverTheta,
      sourceTheta,
      sourceOuterRange,
      sourceMonotone,
      sourceInnerRange,
      rootCountCertificate,
      period,
      fieldSpeed,
      memoryHorizon,
      contract,
      input,
      result,
      phiCyc,
      piIntervalRaw,
      subdivisions,
      receiverMaxDepth
    );
    if (audit) {
      audits.push(audit);
    }
  }

  return audits.map(buildSimpleRootReceiverCoverAudit);
}

function buildBackendCertificate(
  sources,
  period,
  fieldSpeed,
  memoryHorizon,
  xBoundCertificate,
  subdivisions,
  receiverMaxDepth
) {
  return {
    schema: "breather-proof-interval-backend-certificate-v6",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "proof_interval_backend_trig_range_root_complement_diagonal_simple_root_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      contract: {
        path: path.basename(sources.contract.path),
        sha256: sources.contract.sha256,
        numeric_token_count: sources.contract.numericTokenCount,
        numeric_token_samples: sources.contract.numericTokenSamples,
      },
      input: {
        path: path.basename(sources.input.path),
        sha256: sources.input.sha256,
        numeric_token_count: sources.input.numericTokenCount,
        numeric_token_samples: sources.input.numericTokenSamples,
      },
      result: {
        path: path.basename(sources.result.path),
        sha256: sources.result.sha256,
        numeric_token_count: sources.result.numericTokenCount,
        numeric_token_samples: sources.result.numericTokenSamples,
      },
      phi_cyc: {
        path: path.basename(sources.phiCyc.path),
        sha256: sources.phiCyc.sha256,
        numeric_token_count: sources.phiCyc.numericTokenCount,
        numeric_token_samples: sources.phiCyc.numericTokenSamples,
      },
      mesh: {
        path: path.basename(sources.mesh.path),
        sha256: sources.mesh.sha256,
        numeric_token_count: sources.mesh.numericTokenCount,
        numeric_token_samples: sources.mesh.numericTokenSamples,
      },
      input_screen: {
        path: path.basename(sources.inputScreen.path),
        sha256: sources.inputScreen.sha256,
        numeric_token_count: sources.inputScreen.numericTokenCount,
        numeric_token_samples: sources.inputScreen.numericTokenSamples,
      },
      root_count_certificate: {
        path: path.basename(sources.rootCountCertificate.path),
        sha256: sources.rootCountCertificate.sha256,
        numeric_token_count: sources.rootCountCertificate.numericTokenCount,
        numeric_token_samples: sources.rootCountCertificate.numericTokenSamples,
      },
      previous_ledger: {
        path: path.basename(sources.previousLedger.path),
        sha256: sources.previousLedger.sha256,
        numeric_token_count: sources.previousLedger.numericTokenCount,
        numeric_token_samples: sources.previousLedger.numericTokenSamples,
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
      note: "This v6 sidecar treats the packet decimal T_cyc as the exact period token for time ranges, root-complement derivative floors, and the inherited simple-root memory horizon. The rational pi interval is used only for trigonometric enclosure of X_seed, not as a replacement for the packet period token.",
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
      formula:
        "X_seed(theta)=5/4*cos(2*pi*(theta+delta_fresh))+epsilon_fresh*H_fresh(theta+delta_fresh)+lambda*H_shifted(theta)",
      bump_formula: "psi_A(theta)=sin^2(pi*(theta-L_A)/(R_A-L_A)) on the support interval and zero outside",
      half_period_antisymmetry: "H(theta+1/2)=-H(theta)",
      coefficients: xBoundCertificate.artifact,
    },
    x_bound_certificate: xBoundCertificate.artifact,
    trig_enclosure_status:
      "used for row-specific range-empty rows; same-regular-interval diagonal exclusions and simple-root monotonicity reuse the certified higher-fold root-count complement intervals; fold-layer certificates remain absent",
    receiver_cover_refinement_policy: {
      receiver_base_grid_size: SIMPLE_ROOT_RECEIVER_GRID,
      receiver_terminal_grid_size: SIMPLE_ROOT_RECEIVER_GRID * pow2Number(receiverMaxDepth),
      receiver_max_refinement_depth: receiverMaxDepth,
      parent_consumption_policy:
        "Adaptive receiver-cover leaves are audit certificates only. Even a complete cover does not consume the parent without endpoint ownership/no-double-counting.",
    },
  };
}

function buildLedger(sources, subdivisions, receiverMaxDepth) {
  const contract = sources.contract.data;
  const input = sources.input.data;
  const result = sources.result.data;
  const phiCyc = sources.phiCyc.data;
  const mesh = sources.mesh.data;
  const inputScreen = sources.inputScreen.data;
  const rootCountCertificate = sources.rootCountCertificate.data;
  const previousLedger = sources.previousLedger.data;

  if (
    phiCyc.packet_id !== PACKET_ID ||
    mesh.packet_id !== PACKET_ID ||
    inputScreen.packet_id !== PACKET_ID ||
    rootCountCertificate.packet_id !== PACKET_ID ||
    previousLedger.packet_id !== PACKET_ID
  ) {
    throw new Error("Higher-fold packet id mismatch in phi_cyc, mesh, input screen, root-count certificate, or previous ledger.");
  }
  if (contract.packet_id !== SOURCE_SEED_PACKET_ID) {
    throw new Error("Source seed contract packet id mismatch.");
  }
  if (!rootCountCertificate.root_count_interval_certified) {
    throw new Error("Root-count interval certificate is not certified.");
  }
  if (result.status !== "feasible") {
    throw new Error("Shifted-separator result is not feasible.");
  }
  if (previousLedger.refinement_id !== `${PACKET_ID}-proof-interval-trig-range-diagonal-simple-root-receiver-cover-v5`) {
    throw new Error("Previous ledger must be the higher-fold proof-interval v5 sidecar.");
  }

  const period = ratFromJsonNumber(phiCyc.period.T_cyc, "phi_cyc.period.T_cyc");
  const fieldSpeed = ratFromJsonNumber(phiCyc.packet_identity.P.c_f, "phi_cyc.packet_identity.P.c_f");
  const memoryHorizon =
    inputScreen.common_identity?.P?.memory_horizon_h === undefined
      ? period
      : ratFromJsonNumber(inputScreen.common_identity.P.memory_horizon_h, "input_screen.common_identity.P.memory_horizon_h");
  const piIntervalRaw = machinPiRaw();
  const xBoundCertificate = buildXBoundCertificate(contract, input, result, phiCyc);
  const rows = classifyRows(
    inputScreen,
    mesh,
    contract,
    input,
    result,
    phiCyc,
    rootCountCertificate,
    period,
    fieldSpeed,
    memoryHorizon,
    xBoundCertificate,
    piIntervalRaw,
    subdivisions
  );
  const emptyRows = rows.filter((row) => row.status === "empty");
  const rangeEmptyRows = emptyRows.filter((row) => row.empty_method === "proof_interval_trig_range_empty");
  const diagonalRows = emptyRows.filter((row) => row.empty_method === "proof_interval_root_complement_monotone_diagonal_exclusion");
  const simpleRootRows = rows.filter((row) => row.status === "simple_root");
  const splitRows = rows.filter((row) => row.status === "split_required");
  const simpleRootEligibleRowIds = new Set(
    splitRows
      .filter((row) => row.failure_code.startsWith("trig_range_overlap_simple_root"))
      .map((row) => row.row_id)
  );
  const extractedSimpleRootSubrows = extractSimpleRootSubrows(
    inputScreen,
    mesh,
    contract,
    input,
    result,
    phiCyc,
    rootCountCertificate,
    period,
    fieldSpeed,
    memoryHorizon,
    piIntervalRaw,
    subdivisions,
    simpleRootEligibleRowIds
  );
  const simpleRootSubrows = [...simpleRootRows.map(simpleRootSubrowArtifact), ...extractedSimpleRootSubrows];
  const simpleRootReceiverCovers = extractSimpleRootReceiverCoverAudits(
    inputScreen,
    mesh,
    contract,
    input,
    result,
    phiCyc,
    rootCountCertificate,
    period,
    fieldSpeed,
    memoryHorizon,
    piIntervalRaw,
    subdivisions,
    simpleRootEligibleRowIds,
    receiverMaxDepth
  );
  const simpleRootReceiverCoverCells = simpleRootReceiverCovers.flatMap((cover) => cover.cells);
  const completeReceiverCovers = simpleRootReceiverCovers.filter((cover) => cover.receiver_grid_cover_complete);
  const simpleRootProofCells = [...simpleRootSubrows, ...simpleRootReceiverCoverCells];
  const receiverCoverMissingCells = simpleRootReceiverCovers.reduce((sum, cover) => sum + cover.missing_cell_count, 0);
  const receiverCoverTerminalMisses = simpleRootReceiverCovers.flatMap((cover) => cover.missing_receiver_grid_cells);
  const receiverCoverResolvedCoarseCells = simpleRootReceiverCovers.reduce((sum, cover) => sum + cover.coarse_cells_resolved_by_refinement, 0);
  const receiverCoverTerminalMissingCoarseCells = simpleRootReceiverCovers.reduce(
    (sum, cover) => sum + cover.coarse_cells_still_missing_after_refinement,
    0
  );
  const receiverCoverTerminalClassificationCounts = countBy(receiverCoverTerminalMisses, "classification");
  const receiverCoverTerminalFailureReasonCounts = countBy(receiverCoverTerminalMisses, "reason");
  const gammaEmpty = minPositive(rangeEmptyRows.map((row) => qFromJson(row.range_gap_q)));
  const gammaDiagonal = minPositive(diagonalRows.map((row) => qFromJson(row.jacobian_floor_q)));
  const nuSimple = minPositive(simpleRootProofCells.map((row) => qFromJson(row.jacobian_floor_q)));
  const gammaCov = minPositive(simpleRootProofCells.map((row) => qFromJson(row.source_coverage_gap_q)));
  const gammaTau = minPositive(simpleRootProofCells.map((row) => qFromJson(row.gamma_tau_q)));
  const gammaH = minPositive(simpleRootProofCells.map((row) => qFromJson(row.gamma_h_q)));
  const gammaSign = minPositive(simpleRootProofCells.map((row) => qFromJson(row.gamma_sign_q)));
  const backendCertificate = buildBackendCertificate(
    sources,
    period,
    fieldSpeed,
    memoryHorizon,
    xBoundCertificate,
    subdivisions,
    receiverMaxDepth
  );

  return {
    backendCertificate,
    ledger: {
      schema: "breather-causal-ledger-higher-fold-proof-interval-v6",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
      source_numeric_artifacts: {
        contract: path.basename(sources.contract.path),
        input: path.basename(sources.input.path),
        result: path.basename(sources.result.path),
        phi_cyc: path.basename(sources.phiCyc.path),
        mesh: path.basename(sources.mesh.path),
        input_screen: path.basename(sources.inputScreen.path),
        root_count_certificate: path.basename(sources.rootCountCertificate.path),
        previous_ledger: path.basename(sources.previousLedger.path),
      },
      status: "higher_fold_proof_interval_v6_trig_range_diagonal_simple_root_receiver_cover_sidecar_branch_chart_blocked",
      acceptance_level: "exact_rational_json_lexeme_subdivided_trig_range_plus_root_complement_monotone_diagonal_plus_simple_root_receiver_cover_audit",
      claim_level:
        "exact-rational JSON numeric-token intake sidecar accepting strictly disjoint row-specific trigonometric null-coordinate ranges, same-regular-interval monotone diagonal exclusions, and regular simple-root rows with strict root-complement monotonicity, source coverage, and memory margins; adds a fail-closed adaptive receiver-cover audit for regular residual parent-complement rows; no endpoint ownership certificate, fold-layer certificate, live ledger update, or branch-chart authorization",
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
        source_seed_contract_packet_id_matches: true,
        phi_cyc_packet_id_matches: true,
        mesh_packet_id_matches: true,
        input_screen_packet_id_matches: true,
        root_count_certificate_packet_id_matches: true,
        previous_ledger_packet_id_matches: true,
        previous_ledger_refinement_id: previousLedger.refinement_id,
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
          "Exact rational row time ranges are combined with certified row-specific X_seed ranges from rational pi and Taylor trigonometric enclosures. A row is accepted as empty when the receiver and source null-coordinate intervals are strictly disjoint or when a same-regular-interval diagonal row has a strict root-complement derivative floor. A regular non-seam row is accepted as simple_root only when the source and receiver root-count complements give strict monotonicity, the source inner null-coordinate range strictly covers the receiver range, and the causal memory depth has strict lower and horizon margins. Residual regular parent-complement rows additionally receive a v6 adaptive receiver-cover audit, but parent rows are not consumed without endpoint ownership/no-double-counting.",
        pass_rule:
          "This artifact passes only if every row is accepted as empty, simple_root, or fold_layer with no split_required rows. This v6 sidecar accepts range-empty, root-complement monotone diagonal-exclusion, and regular simple-root rows, and audits adaptive receiver-cover leaves for regular residual rows, but it does not consume audited parents or accept fold-layer rows.",
      },
      interval_method: {
        type: "exact_rational_subdivided_trig_x_delta_range",
        certificate_grade: "partial_proof_interval_trig_range_empty_root_complement_monotone_diagonal_simple_root_subset_and_receiver_cover_audit",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        pi_interval_q: intervalJson(piIntervalRaw),
        subdivisions_per_mesh_interval: subdivisions,
        sin_taylor_terms: SIN_TAYLOR_TERMS,
        cos_taylor_terms: COS_TAYLOR_TERMS,
        limitation:
          "This certificate certifies range-empty rows, same-regular-interval monotone diagonal exclusions, and regular simple-root rows. It audits adaptive receiver-cover leaves for residual regular rows but does not certify endpoint ownership/no-double-counting, periodic seam endpoint ownership, fold-layer rows, dynamic residuals, or parent-complement consumption beyond accepted full simple-root rows.",
      },
      summary: {
        base_rows: rows.length,
        certified_empty_base_rows: emptyRows.length,
        certified_range_empty_base_rows: rangeEmptyRows.length,
        certified_diagonal_exclusion_empty_rows: diagonalRows.length,
        certified_simple_root_rows: simpleRootRows.length,
        certified_simple_root_subrows: simpleRootSubrows.length,
        receiver_cover_audit_parent_rows: simpleRootReceiverCovers.length,
        receiver_cover_complete_parent_rows: completeReceiverCovers.length,
        receiver_cover_certified_cells: simpleRootReceiverCoverCells.length,
        receiver_cover_missing_cells: receiverCoverMissingCells,
        receiver_cover_resolved_coarse_cells_by_refinement: receiverCoverResolvedCoarseCells,
        receiver_cover_terminal_missing_coarse_cells: receiverCoverTerminalMissingCoarseCells,
        receiver_cover_structural_miss_count: receiverCoverTerminalClassificationCounts.structural_miss_candidate ?? 0,
        receiver_cover_indeterminate_miss_count: receiverCoverTerminalClassificationCounts.endpoint_or_refinement_limit_indeterminate ?? 0,
        receiver_cover_terminal_classification_counts: receiverCoverTerminalClassificationCounts,
        receiver_cover_terminal_failure_reason_counts: receiverCoverTerminalFailureReasonCounts,
        receiver_cover_base_grid_size: SIMPLE_ROOT_RECEIVER_GRID,
        receiver_cover_terminal_grid_size: SIMPLE_ROOT_RECEIVER_GRID * pow2Number(receiverMaxDepth),
        receiver_cover_max_refinement_depth: receiverMaxDepth,
        accepted_fold_layer_rows: 0,
        split_required_base_rows: splitRows.length,
        branch_chart_authorized: false,
        previous_v5_certified_empty_base_rows: unwrapSmallObject(previousLedger.summary.certified_empty_base_rows),
        previous_v5_certified_simple_root_subrows: unwrapSmallObject(previousLedger.summary.certified_simple_root_subrows),
        previous_v5_receiver_cover_certified_cells: unwrapSmallObject(previousLedger.summary.receiver_cover_certified_cells),
        previous_v5_receiver_cover_missing_cells: unwrapSmallObject(previousLedger.summary.receiver_cover_missing_cells),
        previous_v5_split_required_base_rows: unwrapSmallObject(previousLedger.summary.split_required_base_rows),
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
        gamma_cov: gammaCov ? qToDecimal(gammaCov) : null,
        gamma_tau: gammaTau ? qToDecimal(gammaTau) : null,
        gamma_h: gammaH ? qToDecimal(gammaH) : null,
        gamma_sign: gammaSign ? qToDecimal(gammaSign) : null,
        alpha_fold_min: null,
        nu_exit_fold_min: null,
        I_fold_all_finite: false,
        pass: false,
      },
      blocking_summary: countBy(splitRows, "failure_code"),
      intervals: mesh.preledger_intervals.map(unwrapSmallObject),
      rows,
      simple_root_subrows: simpleRootSubrows,
      simple_root_receiver_covers: simpleRootReceiverCovers,
      fold_layer_rows: [],
      limitations: [
        "Certified trigonometric enclosures are used for row-specific range-empty rows.",
        "Same-regular-interval diagonal exclusions are accepted only when the certified root-count complement interval proves a strict xdot(theta)+/-1 residual sign.",
        "Simple-root rows are accepted only when root-count complement monotonicity, strict source coverage, and strict memory margins all hold.",
        "Adaptive receiver-cover leaves are audit certificates only; no parent-complement row is consumed without complete cover plus endpoint ownership/no-double-counting.",
        "No fold-layer row is accepted by this sidecar.",
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

function receiverCoverTable(covers) {
  return covers
    .map(
      (cover) =>
        `| \`${cover.parent_base_row_id}\` | \`${cover.receiver_interval}\` | \`${cover.source_interval}\` | \`${cover.ledger}\` | ${cover.accepted_leaf_count}/${cover.receiver_terminal_grid_size} | ${cover.missing_terminal_leaf_count} | ${cover.coarse_cells_resolved_by_refinement} | ${cover.structural_miss_count} | ${cover.indeterminate_miss_count} | \`${cover.parent_consumption_blocker}\` |`
    )
    .join("\n");
}

function buildEngineAudit(ledger, backendPath) {
  return {
    schema: "breather-higher-fold-preledger-proof-interval-engine-audit-v6",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "proof_interval_trig_range_root_complement_diagonal_simple_root_receiver_cover_partial_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_type: "reduced exact rationals",
      range_method:
        "exact row time intervals plus certified subdivided trigonometric X_seed ranges, root-count complement derivative floors for same-regular-interval diagonal exclusions, simple-root source coverage/memory margins, and audit-only adaptive receiver-cover leaves",
      binary64_endpoint_use: "none",
      subdivisions_per_mesh_interval: ledger.interval_method.subdivisions_per_mesh_interval,
      sin_taylor_terms: ledger.interval_method.sin_taylor_terms,
      cos_taylor_terms: ledger.interval_method.cos_taylor_terms,
    },
    accepted_scope: {
      range_empty_rows: ledger.summary.certified_range_empty_base_rows,
      monotone_diagonal_empty_rows: ledger.summary.certified_diagonal_exclusion_empty_rows,
      simple_root_rows: ledger.summary.certified_simple_root_rows,
      receiver_cover_audit_parent_rows: ledger.summary.receiver_cover_audit_parent_rows,
      receiver_cover_complete_parent_rows: ledger.summary.receiver_cover_complete_parent_rows,
      receiver_cover_certified_cells: ledger.summary.receiver_cover_certified_cells,
      receiver_cover_missing_cells: ledger.summary.receiver_cover_missing_cells,
      receiver_cover_resolved_coarse_cells_by_refinement: ledger.summary.receiver_cover_resolved_coarse_cells_by_refinement,
      receiver_cover_terminal_missing_coarse_cells: ledger.summary.receiver_cover_terminal_missing_coarse_cells,
      receiver_cover_structural_miss_count: ledger.summary.receiver_cover_structural_miss_count,
      receiver_cover_indeterminate_miss_count: ledger.summary.receiver_cover_indeterminate_miss_count,
      receiver_cover_terminal_classification_counts: ledger.summary.receiver_cover_terminal_classification_counts,
      receiver_cover_terminal_failure_reason_counts: ledger.summary.receiver_cover_terminal_failure_reason_counts,
      receiver_cover_base_grid_size: ledger.summary.receiver_cover_base_grid_size,
      receiver_cover_terminal_grid_size: ledger.summary.receiver_cover_terminal_grid_size,
      receiver_cover_max_refinement_depth: ledger.summary.receiver_cover_max_refinement_depth,
      fold_layer_rows: 0,
    },
    unresolved_scope: {
      split_required_rows: ledger.summary.split_required_base_rows,
      failure_code_counts: ledger.blocking_summary,
    },
    limitations: [
      "This is a partial trigonometric range-empty, root-complement monotone diagonal, simple-root, and receiver-cover audit certificate, not the full null-coordinate preledger.",
      "The certificate consumes strict range-empty rows, same-regular-interval diagonal exclusions, and regular simple-root rows, but receiver-cover leaves are audit-only and it does not certify fold-layer obligations.",
      "Rows left as split_required block branch-chart authorization.",
      "A later pass must add periodic endpoint/complement closure if needed, fold-layer impulse certificates, and any remaining parent-complement consumption.",
    ],
  };
}

function buildReport(ledger, ledgerPath, backendPath, auditPath) {
  const splitRows = ledger.rows.filter((row) => row.status === "split_required");
  const emptyRows = ledger.rows.filter((row) => row.status === "empty");
  const simpleRootRows = ledger.rows.filter((row) => row.status === "simple_root");
  const diagonalRows = emptyRows.filter((row) => row.empty_method === "proof_interval_root_complement_monotone_diagonal_exclusion");
  const receiverCovers = ledger.simple_root_receiver_covers;
  const blockers = Object.entries(ledger.blocking_summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `| \`${key}\` | ${value} |`)
    .join("\n");

  return `# Higher-Fold Proof-Interval Preledger v6 Report

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. This v6 proof-interval sidecar inherits the v5 accepted row
surface, then recursively refines only failed receiver-cover cells to separate
coarse 32-cell hull artifacts from terminal source-cover defects. It certifies
rows whose
row-specific rational trigonometric null-coordinate ranges are strictly
disjoint, and it additionally certifies same-regular-interval diagonal rows
using the higher-fold root-count complement certificate. It also certifies
regular simple-root rows whose source null-coordinate range strictly covers
the receiver range with strict memory margins. New in v6, it adaptively audits
the receiver-cover leaves for regular residual parent-complement rows, records
signed source-cover margins on every terminal miss, and keeps those parents
unconsumed without endpoint ownership/no-double-counting.
It uses the
conservative global envelope
$$
|X_{\\mathrm{seed}}(\\theta)| \\le ${ledger.interval_method.x_abs_bound_display}.
$$
as an audit ceiling, but row acceptance uses the subdivided trigonometric
enclosures recorded in the ledger rather than the v1 global $X_{\\max}$ range.

It is a proof-grade subset for range-empty, root-complement monotone diagonal,
regular simple-root rows, and adaptive receiver-cover leaves, but it is deliberately
not a full preledger. It consumes no receiver-cover parent rows and accepts no
fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | ${ledger.summary.base_rows} |
| Empty rows accepted by this proof-interval-v6 sidecar | ${ledger.summary.certified_empty_base_rows} |
| Range-empty rows accepted by this sidecar | ${ledger.summary.certified_range_empty_base_rows} |
| Empty rows accepted by proof-interval-v5 | ${ledger.summary.previous_v5_certified_empty_base_rows} |
| Simple-root rows accepted by this sidecar | ${ledger.summary.certified_simple_root_rows} |
| Split-required rows | ${ledger.summary.split_required_base_rows} |
| Certified diagonal exclusions | ${ledger.summary.certified_diagonal_exclusion_empty_rows} |
| Certified simple-root subrows | ${ledger.summary.certified_simple_root_subrows} |
| Receiver-cover audit parent rows | ${ledger.summary.receiver_cover_audit_parent_rows} |
| Complete receiver-cover parent rows | ${ledger.summary.receiver_cover_complete_parent_rows} |
| Receiver-cover base grid size | ${ledger.summary.receiver_cover_base_grid_size} |
| Receiver-cover terminal grid size | ${ledger.summary.receiver_cover_terminal_grid_size} |
| Receiver-cover max refinement depth | ${ledger.summary.receiver_cover_max_refinement_depth} |
| Receiver-cover certified leaves | ${ledger.summary.receiver_cover_certified_cells} |
| Receiver-cover terminal missing leaves | ${ledger.summary.receiver_cover_missing_cells} |
| Receiver-cover coarse cells resolved by refinement | ${ledger.summary.receiver_cover_resolved_coarse_cells_by_refinement} |
| Receiver-cover coarse cells still missing after refinement | ${ledger.summary.receiver_cover_terminal_missing_coarse_cells} |
| Receiver-cover structural terminal misses | ${ledger.summary.receiver_cover_structural_miss_count} |
| Receiver-cover indeterminate terminal misses | ${ledger.summary.receiver_cover_indeterminate_miss_count} |
| Receiver-cover certified cells in proof-interval-v5 | ${ledger.summary.previous_v5_receiver_cover_certified_cells} |
| Receiver-cover missing cells in proof-interval-v5 | ${ledger.summary.previous_v5_receiver_cover_missing_cells} |
| Accepted fold-layer rows | ${ledger.summary.accepted_fold_layer_rows} |
| Minimum accepted range gap | ${ledger.global_margins.gamma_empty_range_display ?? "none"} |
| Minimum accepted diagonal Jacobian floor | ${ledger.global_margins.gamma_diagonal_floor_display ?? "none"} |
| Minimum simple-root Jacobian floor | ${ledger.global_margins.nu_simple ?? "none"} |
| Minimum simple-root source-coverage gap | ${ledger.global_margins.gamma_cov ?? "none"} |
| Minimum simple-root memory-depth margin | ${ledger.global_margins.gamma_tau ?? "none"} |
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
and encloses $X_{\\mathrm{seed}}$ using a rational interval for $\\pi$, exact
quarter-turn argument reduction, Taylor tails with rational remainder bounds,
and support-aware bump ranges. A range-empty row is accepted only when the
receiver and source null-coordinate hulls are strictly disjoint as rational
intervals.

The emitted $\\pi$ interval is used only for trigonometric enclosure of
$X_{\\mathrm{seed}}$. The packet period remains the exact decimal token
\`${ledger.evaluation_policy.period_T_cyc_q.num}/${ledger.evaluation_policy.period_T_cyc_q.den}\`.

For a same-regular-interval row $R_{\\sigma,A_i,A_i}$ with zero lift, the row
is accepted only when the matching root-count complement interval certifies a
strict sign for the appropriate field-speed residual: $\\dot X(\\theta)-1$ for
\`u\` rows and $\\dot X(\\theta)+1$ for \`w\` rows. Since
$c_f=1$, the residual margin gives the normalized Jacobian floor, and
$T_{\\mathrm{cyc}}$ times that floor gives the phase-derivative floor.

For a regular simple-root row with zero lift, both source and receiver
intervals must lie inside certified root-count complements with strict
field-speed residual signs. The source endpoint ranges are then oriented by
the certified source monotonicity. The row is accepted as \`simple_root\` only
when that oriented source-inner range strictly covers the receiver range and
the memory-depth interval lies strictly inside $0<\\tau<h$.

For a v6 receiver-cover audit, the generator first splits each eligible
residual receiver interval into ${ledger.summary.receiver_cover_base_grid_size}
exact rational cells. Every failed base cell is then recursively bisected to
depth ${ledger.summary.receiver_cover_max_refinement_depth}, producing a
terminal grid of ${ledger.summary.receiver_cover_terminal_grid_size} leaves.
Each leaf is certified by the same simple-root rule against the full monotone
source interval. Terminal misses record signed source-cover margins and are
classified as structural candidates, endpoint/refinement-limit indeterminate
misses, or monotonicity-certificate absences. A parent row is still not consumed
unless the adaptive leaves form a complete cover and a separate endpoint
ownership/no-double-counting certificate is present.

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

## Certified Diagonal Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(diagonalRows.slice(0, 24))}

## Certified Simple-Root Row Sample

| Row | Status | Method | Receiver | Source | Ledger | Rational gap display |
| --- | --- | --- | --- | --- | --- | ---: |
${rowTable(simpleRootRows.slice(0, 24))}

## Receiver-Cover Audit Sample

| Parent row | Receiver | Source | Ledger | Certified leaves | Missing leaves | Resolved coarse cells | Structural misses | Indeterminate misses | Parent blocker |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${receiverCoverTable(receiverCovers.slice(0, 24))}

## Next Certificate Action

The next proof advance for regular rows is endpoint ownership/no-double-counting
for any complete receiver covers and periodic endpoint/complement closure for
the 8 lift rows. Fold-layer row promotion is a separate higher-fold
separator-layer certificate requiring finite fold impulse data.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend, row-specific
range-empty certificate, and root-complement monotone diagonal certificate for
the higher-fold packet, plus a simple-root receiver-cover audit for residual
regular rows. It is not a passed preledger and not reader-facing
$\\mathbb{A}\\mathbb{A}\\mathbb{A}$ prose. Keep it in the proof-program priority packet until a
full higher-fold preledger exists or the packet is rejected by a proof-grade
interval backend.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const sources = {
    contract: readJsonLossless(path.resolve(args.contract)),
    input: readJsonLossless(path.resolve(args.input)),
    result: readJsonLossless(path.resolve(args.result)),
    phiCyc: readJsonLossless(path.resolve(args.phiCyc)),
    mesh: readJsonLossless(path.resolve(args.mesh)),
    inputScreen: readJsonLossless(path.resolve(args.inputScreen)),
    rootCountCertificate: readJsonLossless(path.resolve(args.rootCountCertificate)),
    previousLedger: readJsonLossless(path.resolve(args.previousLedger)),
  };
  const { backendCertificate, ledger } = buildLedger(sources, args.subdivisions, args.receiverMaxDepth);
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

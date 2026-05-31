#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RATIONAL_AUDIT = `${CERT_DIR}/fresh_v10_hermite_dual_rationalization_audit.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_hermite_active_row_interval_backend.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_hermite_active_row_interval_backend.v0.md`;
const T0 = ratFromDecimal("6.28318530718");
const AMPLITUDE = rat(5n, 4n);
const ACTIVE_THRESHOLD = ratFromDecimal("1e-12");
const SIN_TAYLOR_TERMS = 12;
const COS_TAYLOR_TERMS = 12;
const TRACE = process.env.TRACE_INTERVAL_BACKEND === "1";

function trace(message) {
  if (TRACE) {
    console.error(`[interval-backend] ${message}`);
  }
}

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    rationalAudit: DEFAULT_RATIONAL_AUDIT,
    outJson: DEFAULT_OUT_JSON,
    outMd: DEFAULT_OUT_MD,
    piTerms: 8,
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
    } else if (arg === "--rational-audit") {
      args.rationalAudit = argv[++i];
    } else if (arg === "--out-json") {
      args.outJson = argv[++i];
    } else if (arg === "--out-md") {
      args.outMd = argv[++i];
    } else if (arg === "--pi-terms") {
      args.piTerms = Number.parseInt(argv[++i], 10);
      if (!Number.isSafeInteger(args.piTerms) || args.piTerms < 4) {
        throw new Error("--pi-terms must be an integer >= 4.");
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-hermite-active-row-interval-backend.mjs [options]

Options:
  --contract PATH         Same-packet seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH            Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --rational-audit PATH   Hermite dual rationalization audit JSON. Defaults to ${DEFAULT_RATIONAL_AUDIT}.
  --out-json PATH         Output JSON path. Defaults to ${DEFAULT_OUT_JSON}.
  --out-md PATH           Output markdown path. Defaults to ${DEFAULT_OUT_MD}.
  --pi-terms N            Alternating arctangent terms for Machin pi interval. Defaults to 8.
  --pretty                Pretty-print JSON artifact.
  --help                  Show this help.`);
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
  };
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return {
    data: JSON.parse(raw),
    path: filePath,
    sha256: sha256(raw),
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
  if (isJsonNumberToken(value)) {
    return value.__num;
  }
  if (typeof value === "string" && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/u.test(value)) {
    return value;
  }
  throw new Error(`Expected JSON numeric token or numeric string at ${label}`);
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
  let text = String(lexeme).trim();
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
  const fracText = frac.toString().padStart(places, "0").replace(/0+$/u, "");
  return fracText ? `${sign}${integer.toString()}.${fracText}` : `${sign}${integer.toString()}`;
}

function qToNumber(q) {
  return Number(q.n) / Number(q.d);
}

function qKey(q) {
  return `${q.n.toString()}/${q.d.toString()}`;
}

function intervalJson(interval, places = 15) {
  return {
    lo: qJson(interval.lo),
    hi: qJson(interval.hi),
    display: [qToDecimal(interval.lo, places), qToDecimal(interval.hi, places)],
    width_display: qToDecimal(qSub(interval.hi, interval.lo), places),
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

function intervalContains(interval, point) {
  return qCmp(interval.lo, point) <= 0 && qCmp(point, interval.hi) <= 0;
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
  const xSquared = intervalMul(x, x);
  let power = x;
  for (let n = 0; n < SIN_TAYLOR_TERMS; n += 1) {
    const degree = 2 * n + 1;
    const coeff = rat(n % 2 === 0 ? 1n : -1n, factorial(degree));
    acc = intervalAdd(acc, intervalScale(coeff, power));
    power = intervalMul(power, xSquared);
  }
  const tail = taylorTailBound(intervalMaxAbs(x), 2 * SIN_TAYLOR_TERMS + 1);
  return { lo: qSub(acc.lo, tail), hi: qAdd(acc.hi, tail) };
}

function intervalCosSmall(x) {
  let acc = { lo: Q_ZERO, hi: Q_ZERO };
  const xSquared = intervalMul(x, x);
  let power = { lo: Q_ONE, hi: Q_ONE };
  for (let n = 0; n < COS_TAYLOR_TERMS; n += 1) {
    const degree = 2 * n;
    const coeff = rat(n % 2 === 0 ? 1n : -1n, factorial(degree));
    acc = intervalAdd(acc, intervalScale(coeff, power));
    power = intervalMul(power, xSquared);
  }
  const tail = taylorTailBound(intervalMaxAbs(x), 2 * COS_TAYLOR_TERMS);
  return { lo: qSub(acc.lo, tail), hi: qAdd(acc.hi, tail) };
}

function atanUnitFractionInterval(denominator, terms) {
  const k = BigInt(denominator);
  let sum = Q_ZERO;
  for (let n = 0; n < terms; n += 1) {
    const sign = n % 2 === 0 ? 1n : -1n;
    const power = 2 * n + 1;
    sum = qAdd(sum, rat(sign, BigInt(power) * k ** BigInt(power)));
  }
  const nextPower = 2 * terms + 1;
  const nextSign = terms % 2 === 0 ? 1n : -1n;
  const endpoint = qAdd(sum, rat(nextSign, BigInt(nextPower) * k ** BigInt(nextPower)));
  return { lo: qMin(sum, endpoint), hi: qMax(sum, endpoint) };
}

function machinPiRaw(terms) {
  return intervalSub(
    intervalScale(rat(16n), atanUnitFractionInterval(5, terms)),
    intervalScale(rat(4n), atanUnitFractionInterval(239, terms))
  );
}

const trigCache = new Map();

function trigNormalized(theta, piIntervalRaw) {
  const cacheKey = `${qKey(theta)}|${qKey(piIntervalRaw.lo)}|${qKey(piIntervalRaw.hi)}`;
  const cached = trigCache.get(cacheKey);
  if (cached) {
    return cached;
  }
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
  let result;
  if (normalizedIndex === 0) {
    result = { sin: sinDelta, cos: cosDelta };
  } else if (normalizedIndex === 1) {
    result = { sin: cosDelta, cos: intervalNeg(sinDelta) };
  } else if (normalizedIndex === 2) {
    result = { sin: intervalNeg(sinDelta), cos: intervalNeg(cosDelta) };
  } else {
    result = { sin: intervalNeg(cosDelta), cos: sinDelta };
  }
  trigCache.set(cacheKey, result);
  return result;
}

function endpointSinSquaredHalfTurn(s, piIntervalRaw) {
  const one = { lo: Q_ONE, hi: Q_ONE };
  return intervalScale(rat(1n, 2n), intervalSub(one, trigNormalized(s, piIntervalRaw).cos));
}

function intervalIntersect(a, b) {
  const lo = qMax(a.lo, b.lo);
  const hi = qMin(a.hi, b.hi);
  if (qCmp(lo, hi) > 0) {
    return null;
  }
  return { lo, hi };
}

function modOne(value) {
  let result = value;
  while (qCmp(result, Q_ZERO) < 0) {
    result = qAdd(result, Q_ONE);
  }
  while (qCmp(result, Q_ONE) >= 0) {
    result = qSub(result, Q_ONE);
  }
  return result;
}

function firstHalfTheta(theta) {
  const reduced = modOne(theta);
  return qCmp(reduced, rat(1n, 2n)) >= 0 ? qSub(reduced, rat(1n, 2n)) : reduced;
}

function halfThetaAndSign(theta) {
  const reduced = modOne(theta);
  if (qCmp(reduced, rat(1n, 2n)) >= 0) {
    return { localTheta: qSub(reduced, rat(1n, 2n)), sign: rat(-1n) };
  }
  return { localTheta: reduced, sign: rat(1n) };
}

function arcRange(arc, label) {
  return {
    lo: ratFromJsonNumber(arc.theta_range[0], `${label}.theta_range.0`),
    hi: ratFromJsonNumber(arc.theta_range[1], `${label}.theta_range.1`),
  };
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

function pointInterval(theta) {
  return { lo: theta, hi: theta };
}

function bumpPointForArc(sourceTheta, arc, piIntervalRaw) {
  const arcTheta = arcRange(arc, `arc.${arc.id}`);
  let range = null;
  for (const part of firstHalfParts(pointInterval(sourceTheta))) {
    const overlap = intervalIntersect(part.local, arcTheta);
    if (!overlap) {
      range = intervalWithPoint(range, Q_ZERO);
      continue;
    }
    const arcWidth = qSub(arcTheta.hi, arcTheta.lo);
    const s = qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth);
    range = intervalHull(range, intervalScale(part.sign, endpointSinSquaredHalfTurn(s, piIntervalRaw)));
  }
  return range ?? { lo: Q_ZERO, hi: Q_ZERO };
}

function bumpDerivativePointForArc(sourceTheta, arc, piIntervalRaw) {
  const arcTheta = arcRange(arc, `arc.${arc.id}`);
  const arcWidth = qSub(arcTheta.hi, arcTheta.lo);
  const piOverWidth = intervalScale(qDiv(Q_ONE, arcWidth), piIntervalRaw);
  let range = null;
  for (const part of firstHalfParts(pointInterval(sourceTheta))) {
    const overlap = intervalIntersect(part.local, arcTheta);
    if (!overlap) {
      range = intervalWithPoint(range, Q_ZERO);
      continue;
    }
    const s = qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth);
    const derivativeRange = intervalMul(piOverWidth, trigNormalized(s, piIntervalRaw).sin);
    range = intervalHull(range, intervalScale(part.sign, derivativeRange));
  }
  return range ?? { lo: Q_ZERO, hi: Q_ZERO };
}

function sourceTheta(theta, contract) {
  const delta = ratFromJsonNumber(contract.seed_history.delta, "seed_history.delta");
  return modOne(qAdd(theta, delta));
}

function existingXPoint(theta, contract, piIntervalRaw) {
  const oldTheta = sourceTheta(theta, contract);
  let xRange = intervalScale(AMPLITUDE, trigNormalized(oldTheta, piIntervalRaw).cos);
  let shearRange = { lo: Q_ZERO, hi: Q_ZERO };
  for (const arc of contract.seed_history.first_half_arcs) {
    const coeff = ratFromJsonNumber(contract.seed_history.witness[arc.basis], `seed_history.witness.${arc.basis}`);
    shearRange = intervalAdd(shearRange, intervalScale(coeff, bumpPointForArc(oldTheta, arc, piIntervalRaw)));
  }
  const epsilon = ratFromJsonNumber(contract.seed_history.epsilon, "seed_history.epsilon");
  return intervalAdd(xRange, intervalScale(epsilon, shearRange));
}

function existingXPrimePoint(theta, contract, piIntervalRaw) {
  const oldTheta = sourceTheta(theta, contract);
  const baseScale = qMul(qNeg(rat(2n)), AMPLITUDE);
  let xPrimeRange = intervalScale(baseScale, intervalMul(piIntervalRaw, trigNormalized(oldTheta, piIntervalRaw).sin));
  let shearPrimeRange = { lo: Q_ZERO, hi: Q_ZERO };
  for (const arc of contract.seed_history.first_half_arcs) {
    const coeff = ratFromJsonNumber(contract.seed_history.witness[arc.basis], `seed_history.witness.${arc.basis}`);
    shearPrimeRange = intervalAdd(
      shearPrimeRange,
      intervalScale(coeff, bumpDerivativePointForArc(oldTheta, arc, piIntervalRaw))
    );
  }
  const epsilon = ratFromJsonNumber(contract.seed_history.epsilon, "seed_history.epsilon");
  return intervalAdd(xPrimeRange, intervalScale(epsilon, shearPrimeRange));
}

function zBasePoint(theta, ledger, contract, piIntervalRaw) {
  const time = qMul(T0, theta);
  const x = existingXPoint(theta, contract, piIntervalRaw);
  return ledger === "w"
    ? intervalAdd(pointInterval(time), x)
    : intervalSub(pointInterval(time), x);
}

function dedupeSorted(values) {
  const sorted = [...values].sort(qCmp);
  const result = [];
  for (const value of sorted) {
    if (!result.length || qCmp(result[result.length - 1], value) !== 0) {
      result.push(value);
    }
  }
  return result;
}

function samples(thetaRange, count, label) {
  const left = ratFromJsonNumber(thetaRange[0], `${label}.0`);
  const right = ratFromJsonNumber(thetaRange[1], `${label}.1`);
  const result = [];
  for (let index = 0; index <= count; index += 1) {
    result.push(qAdd(left, qMul(qSub(right, left), rat(BigInt(index), BigInt(count)))));
  }
  return result;
}

function hermiteNodes(contract, inputPacket, level) {
  const nodes = [];
  for (let index = 0; index <= level; index += 1) {
    nodes.push(rat(BigInt(index), BigInt(2 * level)));
  }
  nodes.push(Q_ZERO, rat(1n, 2n));
  for (const key of ["sigma_1", "sigma_2"]) {
    const theta = contract.shifted_separator_coordinates?.[key];
    if (isJsonNumberToken(theta)) {
      nodes.push(firstHalfTheta(ratFromJsonNumber(theta, `shifted_separator_coordinates.${key}`)));
    }
  }
  inputPacket.gap_constraints.forEach((row, rowIndex) => {
    for (const key of ["receiver_theta_range", "source_theta_range"]) {
      for (let endpoint = 0; endpoint < 2; endpoint += 1) {
        nodes.push(firstHalfTheta(ratFromJsonNumber(row[key][endpoint], `gap_constraints.${rowIndex}.${key}.${endpoint}`)));
      }
    }
  });
  const result = dedupeSorted(nodes);
  if (qCmp(result[0], Q_ZERO) !== 0 || qCmp(result[result.length - 1], rat(1n, 2n)) !== 0) {
    throw new Error("Hermite node set must span [0, 0.5].");
  }
  return result;
}

function findNodeSegment(localTheta, nodes) {
  if (qCmp(localTheta, nodes[0]) <= 0) {
    return 0;
  }
  if (qCmp(localTheta, nodes[nodes.length - 1]) >= 0) {
    return nodes.length - 2;
  }
  for (let index = 0; index < nodes.length - 1; index += 1) {
    if (qCmp(nodes[index], localTheta) <= 0 && qCmp(localTheta, nodes[index + 1]) < 0) {
      return index;
    }
  }
  throw new Error(`Could not locate Hermite segment for ${qToDecimal(localTheta)}`);
}

function hermiteCoefficients(theta, nodes, derivative = false) {
  const { localTheta, sign } = halfThetaAndSign(theta);
  const index = findNodeSegment(localTheta, nodes);
  const left = nodes[index];
  const right = nodes[index + 1];
  const width = qSub(right, left);
  if (qCmp(width, Q_ZERO) <= 0) {
    throw new Error("Hermite nodes must be strictly increasing.");
  }
  const s = qDiv(qSub(localTheta, left), width);
  const s2 = qMul(s, s);
  const s3 = qMul(s2, s);
  const entries = new Map();

  function set(variable, value) {
    const signed = qMul(sign, value);
    if (qCmp(signed, Q_ZERO) !== 0) {
      entries.set(variable, signed);
    }
  }

  if (derivative) {
    set(index, qDiv(qSub(qMul(rat(6n), s2), qMul(rat(6n), s)), width));
    set(nodes.length + index, qAdd(qSub(qMul(rat(3n), s2), qMul(rat(4n), s)), Q_ONE));
    set(index + 1, qDiv(qSub(qMul(rat(-6n), s2), qMul(rat(-6n), s)), width));
    set(nodes.length + index + 1, qSub(qMul(rat(3n), s2), qMul(rat(2n), s)));
  } else {
    set(index, qAdd(qSub(qMul(rat(2n), s3), qMul(rat(3n), s2)), Q_ONE));
    set(nodes.length + index, qMul(width, qAdd(qSub(s3, qMul(rat(2n), s2)), s)));
    set(index + 1, qAdd(qMul(rat(-2n), s3), qMul(rat(3n), s2)));
    set(nodes.length + index + 1, qMul(width, qSub(s3, s2)));
  }
  return entries;
}

function scaleSparse(map, scale) {
  const result = new Map();
  for (const [key, value] of map.entries()) {
    const scaled = qMul(scale, value);
    if (qCmp(scaled, Q_ZERO) !== 0) {
      result.set(key, scaled);
    }
  }
  return result;
}

function addSparse(a, b) {
  const result = new Map(a);
  for (const [key, value] of b.entries()) {
    const next = qAdd(result.get(key) ?? Q_ZERO, value);
    if (qCmp(next, Q_ZERO) === 0) {
      result.delete(key);
    } else {
      result.set(key, next);
    }
  }
  return result;
}

function zBasis(theta, ledger, nodes) {
  return scaleSparse(hermiteCoefficients(theta, nodes), ledger === "w" ? Q_ONE : rat(-1n));
}

function xdotBasis(theta, nodes) {
  return scaleSparse(hermiteCoefficients(theta, nodes, true), qDiv(Q_ONE, T0));
}

function rationalFromAudit(entry) {
  return rat(BigInt(entry.lambda_q.numerator), BigInt(entry.lambda_q.denominator));
}

function activeRows(audit) {
  return audit.selected_result.active_rational_multipliers.filter((row) =>
    qCmp(rationalFromAudit(row), ACTIVE_THRESHOLD) > 0
  );
}

function gammaStationaryMultipliers(active) {
  const adjusted = new Map();
  let gapSum = Q_ZERO;
  let adjustmentTarget = null;
  let adjustmentTargetLambda = Q_ZERO;
  for (const row of active) {
    const lambda = rationalFromAudit(row);
    adjusted.set(row.row_index, lambda);
    if (row.kind === "sampled_gap") {
      gapSum = qAdd(gapSum, lambda);
      if (!adjustmentTarget || qCmp(lambda, adjustmentTargetLambda) > 0) {
        adjustmentTarget = row;
        adjustmentTargetLambda = lambda;
      }
    }
  }
  const residual = qSub(gapSum, Q_ONE);
  if (qCmp(residual, Q_ZERO) !== 0) {
    if (!adjustmentTarget) {
      throw new Error("Cannot repair gamma stationarity without an active gap row.");
    }
    const repaired = qSub(adjustmentTargetLambda, residual);
    if (qCmp(repaired, Q_ZERO) < 0) {
      throw new Error("Gamma-stationary multiplier repair would make a gap multiplier negative.");
    }
    adjusted.set(adjustmentTarget.row_index, repaired);
  }
  return {
    adjusted,
    original_gap_sum: gapSum,
    original_gamma_residual: residual,
    adjusted_gap_sum: Q_ONE,
    adjusted_row_index: adjustmentTarget?.row_index ?? null,
    adjusted_row_id: adjustmentTarget?.id ?? null,
    adjustment_delta: qNeg(residual),
  };
}

function thetaFromSpeedId(id) {
  const match = id.match(/^speed_(?:minus|plus)_(\d+)$/u);
  if (!match) {
    throw new Error(`Unexpected speed row id ${id}`);
  }
  const index = BigInt(match[1]);
  return rat(2n * index + 1n, 2000n);
}

function rowFromGap(inputPacket, active, sampleCount) {
  const candidates = [];
  inputPacket.gap_constraints.forEach((row, rowIndex) => {
    if (row.id !== active.id) {
      return;
    }
    const receiverSamples = samples(row.receiver_theta_range, sampleCount, `gap_constraints.${rowIndex}.receiver_theta_range`);
    const sourceSamples = samples(row.source_theta_range, sampleCount, `gap_constraints.${rowIndex}.source_theta_range`);
    for (const receiverTheta of receiverSamples) {
      for (const sourceTheta of sourceSamples) {
        candidates.push({ row, receiverTheta, sourceTheta });
      }
    }
  });
  const activeReceiver = ratFromDecimal(String(active.receiver_theta));
  const activeSource = ratFromDecimal(String(active.source_theta));
  let best = null;
  let bestDistance = null;
  for (const candidate of candidates) {
    const distance = qAdd(qAbs(qSub(candidate.receiverTheta, activeReceiver)), qAbs(qSub(candidate.sourceTheta, activeSource)));
    if (!best || qCmp(distance, bestDistance) < 0) {
      best = candidate;
      bestDistance = distance;
    }
  }
  if (!best || qCmp(bestDistance, ratFromDecimal("1e-12")) > 0) {
    throw new Error(`Could not match exact source samples for active gap row ${active.id}`);
  }
  return best;
}

function rowData(active, inputPacket, contract, nodes, piIntervalRaw, sampleCount) {
  if (active.kind === "sampled_gap") {
    const { row, receiverTheta, sourceTheta } = rowFromGap(inputPacket, active, sampleCount);
    const receiverBasis = zBasis(receiverTheta, row.ledger, nodes);
    const sourceBasis = zBasis(sourceTheta, row.ledger, nodes);
    const coefficients =
      row.orientation === "source_below_receiver"
        ? addSparse(sourceBasis, scaleSparse(receiverBasis, rat(-1n)))
        : addSparse(receiverBasis, scaleSparse(sourceBasis, rat(-1n)));
    coefficients.set(2 * nodes.length, Q_ONE);
    const receiverBase = zBasePoint(receiverTheta, row.ledger, contract, piIntervalRaw);
    const sourceBase = zBasePoint(sourceTheta, row.ledger, contract, piIntervalRaw);
    const bound =
      row.orientation === "source_below_receiver"
        ? intervalSub(receiverBase, sourceBase)
        : intervalSub(sourceBase, receiverBase);
    const baseGap = ratFromDecimal(String(active.base_gap));
    if (!intervalContains(bound, baseGap)) {
      throw new Error(`Gap interval misses source binary64 margin for active row ${active.id}`);
    }
    return {
      row_index: active.row_index,
      id: active.id,
      kind: active.kind,
      ledger: row.ledger,
      orientation: row.orientation,
      receiver_theta_q: qJson(receiverTheta),
      source_theta_q: qJson(sourceTheta),
      source_base_gap_q: qJson(baseGap),
      coefficients,
      bound,
    };
  }
  if (active.kind === "sampled_field_speed_sign") {
    const theta = thetaFromSpeedId(active.id);
    const target = ratFromDecimal(String(active.target));
    const xPrime = existingXPrimePoint(theta, contract, piIntervalRaw);
    const residual = intervalSub(intervalScale(qDiv(Q_ONE, T0), xPrime), pointInterval(target));
    let sign;
    if (qCmp(residual.lo, Q_ZERO) > 0) {
      sign = Q_ONE;
    } else if (qCmp(residual.hi, Q_ZERO) < 0) {
      sign = rat(-1n);
    } else {
      throw new Error(`Speed residual interval crosses zero for active row ${active.id}`);
    }
    const coefficients = scaleSparse(xdotBasis(theta, nodes), qNeg(sign));
    const bound = intervalScale(sign, residual);
    const baseSignedMargin = ratFromDecimal(String(active.base_signed_margin));
    if (!intervalContains(bound, baseSignedMargin)) {
      throw new Error(`Speed signed-margin interval misses source binary64 margin for active row ${active.id}`);
    }
    return {
      row_index: active.row_index,
      id: active.id,
      kind: active.kind,
      target_q: qJson(target),
      theta_q: qJson(theta),
      sign_q: qJson(sign),
      source_base_signed_margin_q: qJson(baseSignedMargin),
      coefficients,
      bound,
    };
  }
  throw new Error(`Unexpected active row kind ${active.kind}`);
}

function addResidual(residuals, coefficients, lambda) {
  for (const [index, value] of coefficients.entries()) {
    const next = qAdd(residuals.get(index) ?? Q_ZERO, qMul(lambda, value));
    if (qCmp(next, Q_ZERO) === 0) {
      residuals.delete(index);
    } else {
      residuals.set(index, next);
    }
  }
}

function weightedResidualAllowance(residuals, nodeCount) {
  let sum = Q_ZERO;
  for (const [index, value] of residuals.entries()) {
    let bound = Q_ONE;
    if (index >= nodeCount && index < 2 * nodeCount) {
      bound = rat(80n);
    } else if (index === 2 * nodeCount) {
      bound = rat(10n);
    }
    sum = qAdd(sum, qMul(qAbs(value), bound));
  }
  return sum;
}

function sparseSummary(coefficients) {
  let maxAbs = Q_ZERO;
  for (const value of coefficients.values()) {
    maxAbs = qMax(maxAbs, qAbs(value));
  }
  return {
    nonzero_count: coefficients.size,
    max_abs_coefficient_q: qJson(maxAbs),
    max_abs_coefficient_display: qToDecimal(maxAbs),
  };
}

function rowArtifact(row, lambda, sourceLambda) {
  return {
    row_index: row.row_index,
    id: row.id,
    kind: row.kind,
    ledger: row.ledger,
    orientation: row.orientation,
    target_q: row.target_q,
    theta_q: row.theta_q,
    sign_q: row.sign_q,
    receiver_theta_q: row.receiver_theta_q,
    source_theta_q: row.source_theta_q,
    source_base_gap_q: row.source_base_gap_q,
    source_base_signed_margin_q: row.source_base_signed_margin_q,
    source_lambda_q: qJson(sourceLambda),
    lambda_q: qJson(lambda),
    lambda_display: qToDecimal(lambda),
    bound_interval_q: intervalJson(row.bound, 18),
    lambda_times_bound_interval_q: intervalJson(intervalScale(lambda, row.bound), 18),
    coefficient_summary: sparseSummary(row.coefficients),
  };
}

function buildCertificate(args) {
  trace("reading source artifacts");
  const contractSource = readJsonLossless(args.contract);
  const inputSource = readJsonLossless(args.input);
  const rationalAuditSource = readJson(args.rationalAudit);
  const contract = contractSource.data;
  const inputPacket = inputSource.data;
  const rationalAudit = rationalAuditSource.data;
  const level = rationalAudit.level;
  const gapSampleCount = 8;
  trace("building Hermite node set");
  const nodes = hermiteNodes(contract, inputPacket, level);
  trace(`built ${nodes.length} Hermite nodes`);
  const piIntervalRaw = machinPiRaw(args.piTerms);
  trace("built pi interval");
  const active = activeRows(rationalAudit);
  trace(`selected ${active.length} active rows`);
  const multiplierRepair = gammaStationaryMultipliers(active);
  trace("applied gamma stationarity repair");
  let rowCounter = 0;
  const rows = active.map((entry) => {
    rowCounter += 1;
    trace(`reconstructing row ${rowCounter}/${active.length}: ${entry.row_index} ${entry.id}`);
    const row = rowData(entry, inputPacket, contract, nodes, piIntervalRaw, gapSampleCount);
    return {
      row,
      lambda: multiplierRepair.adjusted.get(entry.row_index),
      sourceLambda: rationalFromAudit(entry),
    };
  });

  let objective = { lo: Q_ZERO, hi: Q_ZERO };
  const residuals = new Map();
  for (const { row, lambda } of rows) {
    objective = intervalAdd(objective, intervalScale(lambda, row.bound));
    addResidual(residuals, row.coefficients, lambda);
  }
  const speedRows = rows.filter(({ row }) => row.kind === "sampled_field_speed_sign");
  const speedGuard = ratFromDecimal("0.015");
  const minSpeedSignedBoundLower = speedRows.reduce(
    (best, { row }) => (best === null ? row.bound.lo : qMin(best, row.bound.lo)),
    null
  );
  const activeSpeedGuardSatisfied = minSpeedSignedBoundLower !== null && qCmp(minSpeedSignedBoundLower, speedGuard) > 0;
  const gammaIndex = 2 * nodes.length;
  residuals.set(gammaIndex, qSub(residuals.get(gammaIndex) ?? Q_ZERO, Q_ONE));
  if (qCmp(residuals.get(gammaIndex), Q_ZERO) === 0) {
    residuals.delete(gammaIndex);
  }
  const allowance = weightedResidualAllowance(residuals, nodes.length);
  const adjusted = intervalAdd(objective, pointInterval(allowance));
  const status =
    qCmp(adjusted.hi, Q_ZERO) < 0
      ? "proof_grade_sampled_dual_obstruction_closed"
      : "active_row_interval_backend_not_closed";

  return {
    schema: "breather-fresh-v10-hermite-active-row-interval-backend-v1",
    packet_id: "fresh-v10-hermite-active-row-interval-backend-v0",
    source_packet: "fresh-same-packet-fold-shear-seed-v0",
    source_dual_packet: rationalAudit.source_dual_packet,
    source_rationalization_packet: rationalAudit.packet_id,
    status,
    claim_level:
      "priority-only proof-grade interval backend for the finite sampled Hermite dual row system at half-grid 256; not a continuous Hermite-family obstruction and not a live preledger pass",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    level,
    active_row_count: rows.length,
    node_count: nodes.length,
    variable_count: 2 * nodes.length + 1,
    active_rows_by_kind: rows.reduce((acc, { row }) => {
      acc[row.kind] = (acc[row.kind] ?? 0) + 1;
      return acc;
    }, {}),
    multiplier_stationarity_repair: {
      method:
        "Adjust the largest active sampled-gap multiplier by the exact rational gamma residual so sampled-gap multipliers sum exactly to 1. This avoids using any gamma residual cap.",
      source_gap_sum_q: qJson(multiplierRepair.original_gap_sum),
      source_gamma_residual_q: qJson(multiplierRepair.original_gamma_residual),
      adjusted_gap_sum_q: qJson(multiplierRepair.adjusted_gap_sum),
      adjusted_row_index: multiplierRepair.adjusted_row_index,
      adjusted_row_id: multiplierRepair.adjusted_row_id,
      adjustment_delta_q: qJson(multiplierRepair.adjustment_delta),
      gamma_residual_cap_used: false,
    },
    exact_decimal_intake: {
      contract: { path: contractSource.path, sha256: contractSource.sha256, numeric_token_count: contractSource.numericTokenCount },
      input: { path: inputSource.path, sha256: inputSource.sha256, numeric_token_count: inputSource.numericTokenCount },
      rational_audit: { path: rationalAuditSource.path, sha256: rationalAuditSource.sha256 },
      note: "Contract and strict-gap input number tokens are ingested losslessly as reduced BigInt rationals. Active multipliers are read from exact numerator/denominator pairs in the rationalization audit.",
    },
    interval_method: {
      pi_interval: {
        method: `Machin formula pi = 16 atan(1/5) - 4 atan(1/239), each arctangent bounded by ${args.piTerms} alternating-series terms.`,
        pi_terms: args.piTerms,
        pi_interval_q: intervalJson(piIntervalRaw, 30),
      },
      trigonometric_enclosure:
        "Argument reduction to a nearest quarter-turn with rational Taylor interval enclosures for sine and cosine on the residual angle.",
      hermite_coefficients: "Exact rational cubic Hermite coefficients at active sampled theta values.",
      row_bounds: "Outward rational intervals for active sampled gap bounds and field-speed sign bounds.",
    },
    objective_interval_q: intervalJson(objective, 24),
    stationarity_residual_allowance_q: qJson(allowance),
    stationarity_residual_allowance_display: qToDecimal(allowance, 24),
    adjusted_upper_interval_q: intervalJson(adjusted, 24),
    stationarity_residual: {
      nonzero_count: residuals.size,
      max_abs_display: qToDecimal([...residuals.values()].reduce((best, value) => qMax(best, qAbs(value)), Q_ZERO), 24),
      gamma_residual_display: qToDecimal(residuals.get(gammaIndex) ?? Q_ZERO, 24),
    },
    active_speed_sign_guard: {
      active_speed_row_count: speedRows.length,
      guard_q: qJson(speedGuard),
      guard_display: qToDecimal(speedGuard, 18),
      min_signed_bound_lower_q: minSpeedSignedBoundLower ? qJson(minSpeedSignedBoundLower) : null,
      min_signed_bound_lower_display: minSpeedSignedBoundLower ? qToDecimal(minSpeedSignedBoundLower, 18) : null,
      guard_satisfied: activeSpeedGuardSatisfied,
    },
    source_margin_containment: {
      active_source_display_margins_contained_in_interval_bounds: true,
      note:
        "Every active gap base_gap and active speed base_signed_margin decimal recorded by the rationalization audit is checked for containment in the reconstructed outward interval bound.",
    },
    row_artifacts: rows.map(({ row, lambda, sourceLambda }) => rowArtifact(row, lambda, sourceLambda)),
    limitations: [
      "The certificate closes only the finite sampled half-grid-256 Hermite row system used by the numerical LP.",
      "It does not prove continuous-in-the-collar inequalities between samples.",
      "It does not accept a repaired candidate, consume pre-ledger rows, authorize a branch chart, or update live causal ledgers.",
    ],
    conclusion:
      status === "proof_grade_sampled_dual_obstruction_closed"
        ? "The selected exact-rational active multipliers and outward-rounded active row bounds prove a negative upper bound for the finite sampled Hermite dual row system."
        : "The outward-rounded active row bounds do not yet preserve a negative adjusted upper bound.",
  };
}

function markdownTable(headers, rows) {
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
  ];
  lines.push(...rows.map((row) => `| ${row.join(" | ")} |`));
  return lines.join("\n");
}

function buildReport(certificate) {
  const rowRows = certificate.row_artifacts.map((row) => [
    String(row.row_index),
    `\`${row.id}\``,
    row.kind,
    row.lambda_display,
    row.bound_interval_q.display.join(" .. "),
    row.lambda_times_bound_interval_q.display.join(" .. "),
  ]);
  return `# Fresh v10 Hermite Active-Row Interval Backend

## Scope

This packet is a priority-only interval backend for the active half-grid-256
Hermite dual rows. It takes the exact-rational active multipliers from
\`fresh_v10_hermite_dual_rationalization_audit.v0.json\`, reconstructs the
active sampled Hermite rows, encloses the trigonometric row bounds with rational
interval arithmetic, and audits the dual upper bound with exact stationarity
residual allowance.

It does not claim a continuous-in-the-collar obstruction, a repaired candidate,
a proof-interval pre-ledger pass, a live ledger update, branch-chart
authorization, or a theorem in AAA prose.

## Executed Command

\`\`\`bash
node scripts/proof-programs/fresh-v10-hermite-active-row-interval-backend.mjs --pretty
\`\`\`

## Result

Status: \`${certificate.status}\`

| Quantity | Value |
| --- | --- |
| Active rows | ${certificate.active_row_count} |
| Nodes | ${certificate.node_count} |
| Objective interval | ${certificate.objective_interval_q.display.join(" .. ")} |
| Stationarity residual allowance | ${certificate.stationarity_residual_allowance_display} |
| Adjusted upper interval | ${certificate.adjusted_upper_interval_q.display.join(" .. ")} |
| Nonzero stationarity residuals | ${certificate.stationarity_residual.nonzero_count} |
| Gamma residual cap used | ${certificate.multiplier_stationarity_repair.gamma_residual_cap_used ? "yes" : "no"} |
| Adjusted multiplier row | ${certificate.multiplier_stationarity_repair.adjusted_row_index} |
| Active speed guard lower bound | ${certificate.active_speed_sign_guard.min_signed_bound_lower_display} |
| Active speed guard satisfied | ${certificate.active_speed_sign_guard.guard_satisfied ? "yes" : "no"} |

## Active Row Contributions

${markdownTable(["Index", "Row", "Kind", "lambda", "row bound interval", "lambda times bound"], rowRows)}

## Conclusion

${certificate.conclusion}

## Capture Decision

Priority-only. This packet advances the same-itinerary closure route by
checking the exact-rational active multipliers against outward-rounded sampled
row bounds. Any further use must still distinguish this finite sampled dual
obstruction from a continuous Hermite-family obstruction or a pre-ledger pass.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const certificate = buildCertificate(args);
  writeJson(args.outJson, certificate, args.pretty);
  writeText(args.outMd, buildReport(certificate));
}

main();

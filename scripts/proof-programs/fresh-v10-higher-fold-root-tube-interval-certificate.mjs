#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json`;
const DEFAULT_BINARY64 = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_certificate.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.md`;

const AMPLITUDE = rat(5n, 4n);
const SIN_TAYLOR_TERMS = 6;
const COS_TAYLOR_TERMS = 6;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    phi: DEFAULT_PHI,
    binary64: DEFAULT_BINARY64,
    outJson: DEFAULT_OUT_JSON,
    outMd: DEFAULT_OUT_MD,
    complementSubdivisionsPerUnit: 256,
    tubeSubdivisions: 16,
    piTerms: 10,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--result") {
      args.result = argv[++index];
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--binary64") {
      args.binary64 = argv[++index];
    } else if (arg === "--out-json") {
      args.outJson = argv[++index];
    } else if (arg === "--out-md") {
      args.outMd = argv[++index];
    } else if (arg === "--complement-subdivisions-per-unit") {
      args.complementSubdivisionsPerUnit = Number.parseInt(argv[++index], 10);
    } else if (arg === "--tube-subdivisions") {
      args.tubeSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--pi-terms") {
      args.piTerms = Number.parseInt(argv[++index], 10);
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!Number.isSafeInteger(args.complementSubdivisionsPerUnit) || args.complementSubdivisionsPerUnit < 16) {
    throw new Error("--complement-subdivisions-per-unit must be an integer >= 16");
  }
  if (!Number.isSafeInteger(args.tubeSubdivisions) || args.tubeSubdivisions < 8) {
    throw new Error("--tube-subdivisions must be an integer >= 8");
  }
  if (!Number.isSafeInteger(args.piTerms) || args.piTerms < 6) {
    throw new Error("--pi-terms must be an integer >= 6");
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-root-tube-interval-certificate.mjs [options]

Options:
  --contract PATH                         Fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH                            Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH                           Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --phi PATH                              Higher-fold phi_cyc JSON. Defaults to ${DEFAULT_PHI}.
  --binary64 PATH                         Binary64 root-tube attempt JSON. Defaults to ${DEFAULT_BINARY64}.
  --out-json PATH                         Output interval certificate JSON. Defaults to ${DEFAULT_OUT_JSON}.
  --out-md PATH                           Output interval certificate report. Defaults to ${DEFAULT_OUT_MD}.
  --complement-subdivisions-per-unit INT  Complement interval subdivisions per unit theta. Defaults to 256.
  --tube-subdivisions INT                 Root-tube derivative subdivisions per tube. Defaults to 16.
  --pi-terms INT                          Machin arctangent terms for pi enclosure. Defaults to 10.
  --pretty                                Pretty-print JSON artifact.
  --help                                  Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function wrapJsonNumbers(source) {
  let wrapped = "";
  const tokens = [];
  let inString = false;
  let escaped = false;
  for (let index = 0; index < source.length; index += 1) {
    const ch = source[index];
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
      const match = source.slice(index).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/u);
      if (!match) {
        throw new Error(`Invalid JSON number near offset ${index}`);
      }
      const token = match[0];
      tokens.push(token);
      wrapped += `{"__num":"${token}"}`;
      index += token.length - 1;
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
    path: filePath,
    sha256: sha256(raw),
    numericTokenCount: tokens.length,
    data: JSON.parse(wrapped),
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
const Q_HALF = rat(1n, 2n);

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
  const pointIndex = mantissa.indexOf(".");
  const fractionalDigits = pointIndex === -1 ? 0 : mantissa.length - pointIndex - 1;
  const digits = mantissa.replace(".", "");
  let num = sign * BigInt(digits || "0");
  let den = pow10(fractionalDigits);
  if (exponent > 0) {
    num *= pow10(exponent);
  } else if (exponent < 0) {
    den *= pow10(-exponent);
  }
  return rat(num, den);
}

function qFrom(value, label) {
  return ratFromDecimal(numberLexeme(value, label));
}

function qAdd(a, b) {
  return rat(a.n * b.d + b.n * a.d, a.d * b.d);
}

function qSub(a, b) {
  return rat(a.n * b.d - b.n * a.d, a.d * b.d);
}

function qNeg(a) {
  return rat(-a.n, a.d);
}

function qMul(a, b) {
  return rat(a.n * b.n, a.d * b.d);
}

function qDiv(a, b) {
  return rat(a.n * b.d, a.d * b.n);
}

function qCmp(a, b) {
  const lhs = a.n * b.d;
  const rhs = b.n * a.d;
  return lhs < rhs ? -1 : lhs > rhs ? 1 : 0;
}

function qAbs(a) {
  return a.n < 0n ? qNeg(a) : a;
}

function qMin(a, b) {
  return qCmp(a, b) <= 0 ? a : b;
}

function qMax(a, b) {
  return qCmp(a, b) >= 0 ? a : b;
}

function qPow(a, exponent) {
  let result = Q_ONE;
  for (let index = 0; index < exponent; index += 1) {
    result = qMul(result, a);
  }
  return result;
}

function qToNumber(q) {
  return Number(q.n) / Number(q.d);
}

function qToDecimal(q, places = 18) {
  const sign = q.n < 0n ? "-" : "";
  const numerator = q.n < 0n ? -q.n : q.n;
  const scale = 10n ** BigInt(places);
  const scaled = numerator * scale / q.d;
  const whole = scaled / scale;
  let frac = (scaled % scale).toString().padStart(places, "0");
  frac = frac.replace(/0+$/u, "");
  return frac ? `${sign}${whole}.${frac}` : `${sign}${whole}`;
}

function qJson(q) {
  return { numerator: q.n.toString(), denominator: q.d.toString() };
}

function intervalJson(interval, places = 18) {
  return {
    lo: qJson(interval.lo),
    hi: qJson(interval.hi),
    display: [qToDecimal(interval.lo, places), qToDecimal(interval.hi, places)],
    width_display: qToDecimal(qSub(interval.hi, interval.lo), places),
  };
}

function pointInterval(q) {
  return { lo: q, hi: q };
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

function intervalScale(q, interval) {
  if (qCmp(q, Q_ZERO) >= 0) {
    return { lo: qMul(q, interval.lo), hi: qMul(q, interval.hi) };
  }
  return { lo: qMul(q, interval.hi), hi: qMul(q, interval.lo) };
}

function intervalMul(a, b) {
  const values = [
    qMul(a.lo, b.lo),
    qMul(a.lo, b.hi),
    qMul(a.hi, b.lo),
    qMul(a.hi, b.hi),
  ];
  return { lo: values.reduce(qMin), hi: values.reduce(qMax) };
}

function intervalDivPositive(interval, q) {
  if (qCmp(q, Q_ZERO) <= 0) {
    throw new Error("Expected positive divisor");
  }
  return { lo: qDiv(interval.lo, q), hi: qDiv(interval.hi, q) };
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
  return intervalHull(a, pointInterval(point));
}

function intervalIntersect(a, b) {
  const lo = qMax(a.lo, b.lo);
  const hi = qMin(a.hi, b.hi);
  return qCmp(lo, hi) <= 0 ? { lo, hi } : null;
}

function intervalContains(interval, point) {
  return qCmp(interval.lo, point) <= 0 && qCmp(point, interval.hi) <= 0;
}

function intervalSign(interval) {
  if (qCmp(interval.lo, Q_ZERO) > 0) {
    return "positive";
  }
  if (qCmp(interval.hi, Q_ZERO) < 0) {
    return "negative";
  }
  return "contains_zero";
}

function factorial(n) {
  let result = 1n;
  for (let value = 2n; value <= BigInt(n); value += 1n) {
    result *= value;
  }
  return result;
}

function intervalMaxAbs(interval) {
  return qMax(qAbs(interval.lo), qAbs(interval.hi));
}

function taylorTailBound(maxAbs, firstDegree) {
  const first = qDiv(qPow(maxAbs, firstDegree), rat(factorial(firstDegree)));
  const ratioDen = rat(BigInt((firstDegree + 1) * (firstDegree + 2)));
  const ratio = qDiv(qMul(maxAbs, maxAbs), ratioDen);
  if (qCmp(ratio, Q_ONE) >= 0) {
    throw new Error("Taylor tail ratio is not contractive");
  }
  return qDiv(first, qSub(Q_ONE, ratio));
}

function intervalSinSmall(x) {
  let acc = pointInterval(Q_ZERO);
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
  let acc = pointInterval(Q_ZERO);
  const xSquared = intervalMul(x, x);
  let power = pointInterval(Q_ONE);
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
    intervalScale(rat(4n), atanUnitFractionInterval(239, terms)),
  );
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

const trigCache = new Map();

function qKey(q) {
  return `${q.n}/${q.d}`;
}

function trigNormalized(theta, piIntervalRaw) {
  const reduced = modOne(theta);
  const cacheKey = `${qKey(reduced)}|${qKey(piIntervalRaw.lo)}|${qKey(piIntervalRaw.hi)}`;
  const cached = trigCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const eighth = rat(1n, 8n);
  const threeEighths = rat(3n, 8n);
  const fiveEighths = rat(5n, 8n);
  const sevenEighths = rat(7n, 8n);
  let quarterIndex = 4;
  if (qCmp(reduced, eighth) < 0) {
    quarterIndex = 0;
  } else if (qCmp(reduced, threeEighths) < 0) {
    quarterIndex = 1;
  } else if (qCmp(reduced, fiveEighths) < 0) {
    quarterIndex = 2;
  } else if (qCmp(reduced, sevenEighths) < 0) {
    quarterIndex = 3;
  }
  const residual = qSub(reduced, rat(BigInt(quarterIndex), 4n));
  const angle = intervalScale(qMul(rat(2n), residual), piIntervalRaw);
  const sinDelta = intervalSinSmall(angle);
  const cosDelta = intervalCosSmall(angle);
  const normalized = quarterIndex % 4;
  let result;
  if (normalized === 0) {
    result = { sin: sinDelta, cos: cosDelta };
  } else if (normalized === 1) {
    result = { sin: cosDelta, cos: intervalNeg(sinDelta) };
  } else if (normalized === 2) {
    result = { sin: intervalNeg(sinDelta), cos: intervalNeg(cosDelta) };
  } else {
    result = { sin: intervalNeg(cosDelta), cos: sinDelta };
  }
  trigCache.set(cacheKey, result);
  return result;
}

function cosRangeUnitInterval(interval, piIntervalRaw) {
  let range = intervalHull(trigNormalized(interval.lo, piIntervalRaw).cos, trigNormalized(interval.hi, piIntervalRaw).cos);
  if (intervalContains(interval, Q_ZERO) || intervalContains(interval, Q_ONE)) {
    range = intervalWithPoint(range, Q_ONE);
  }
  if (intervalContains(interval, Q_HALF)) {
    range = intervalWithPoint(range, rat(-1n));
  }
  return range;
}

function sinRangeUnitInterval(interval, piIntervalRaw) {
  let range = intervalHull(trigNormalized(interval.lo, piIntervalRaw).sin, trigNormalized(interval.hi, piIntervalRaw).sin);
  if (intervalContains(interval, rat(1n, 4n))) {
    range = intervalWithPoint(range, Q_ONE);
  }
  if (intervalContains(interval, rat(3n, 4n))) {
    range = intervalWithPoint(range, rat(-1n));
  }
  return range;
}

function sourceIntervalParts(thetaInterval, delta) {
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

function firstHalfParts(sourceInterval) {
  const first = intervalIntersect(sourceInterval, { lo: Q_ZERO, hi: Q_HALF });
  const second = intervalIntersect(sourceInterval, { lo: Q_HALF, hi: Q_ONE });
  const parts = [];
  if (first) {
    parts.push({ sign: rat(1n), local: first });
  }
  if (second) {
    parts.push({ sign: rat(-1n), local: { lo: qSub(second.lo, Q_HALF), hi: qSub(second.hi, Q_HALF) } });
  }
  return parts;
}

function arcRange(arc, label) {
  return {
    lo: qFrom(arc.theta_range[0], `${label}.theta_range.0`),
    hi: qFrom(arc.theta_range[1], `${label}.theta_range.1`),
  };
}

function bumpDerivativeRange(sourceInterval, arc, piIntervalRaw) {
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
    if (qCmp(part.local.lo, overlap.lo) < 0 || qCmp(overlap.hi, part.local.hi) < 0) {
      range = intervalWithPoint(range, Q_ZERO);
    }
    const sRange = {
      lo: qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth),
      hi: qDiv(qSub(overlap.hi, arcTheta.lo), arcWidth),
    };
    const derivative = intervalMul(piOverWidth, sinRangeUnitInterval(sRange, piIntervalRaw));
    range = intervalHull(range, intervalScale(part.sign, derivative));
  }
  return range ?? pointInterval(Q_ZERO);
}

function bumpSecondRange(sourceInterval, arc, piIntervalRaw) {
  const arcTheta = arcRange(arc, `arc.${arc.id}`);
  const arcWidth = qSub(arcTheta.hi, arcTheta.lo);
  const twoPiSquared = intervalScale(rat(2n), intervalMul(piIntervalRaw, piIntervalRaw));
  const scale = intervalScale(qDiv(Q_ONE, qMul(arcWidth, arcWidth)), twoPiSquared);
  let range = null;
  for (const part of firstHalfParts(sourceInterval)) {
    const overlap = intervalIntersect(part.local, arcTheta);
    if (!overlap) {
      range = intervalWithPoint(range, Q_ZERO);
      continue;
    }
    if (qCmp(part.local.lo, overlap.lo) < 0 || qCmp(overlap.hi, part.local.hi) < 0) {
      range = intervalWithPoint(range, Q_ZERO);
    }
    const sRange = {
      lo: qDiv(qSub(overlap.lo, arcTheta.lo), arcWidth),
      hi: qDiv(qSub(overlap.hi, arcTheta.lo), arcWidth),
    };
    const second = intervalMul(scale, cosRangeUnitInterval(sRange, piIntervalRaw));
    range = intervalHull(range, intervalScale(part.sign, second));
  }
  return range ?? pointInterval(Q_ZERO);
}

function shearDerivativeRange(sourceInterval, arcs, witness, piIntervalRaw, label) {
  let range = pointInterval(Q_ZERO);
  for (const arc of arcs) {
    const coeff = qFrom(witness[arc.basis], `${label}.${arc.basis}`);
    range = intervalAdd(range, intervalScale(coeff, bumpDerivativeRange(sourceInterval, arc, piIntervalRaw)));
  }
  return range;
}

function shearSecondRange(sourceInterval, arcs, witness, piIntervalRaw, label) {
  let range = pointInterval(Q_ZERO);
  for (const arc of arcs) {
    const coeff = qFrom(witness[arc.basis], `${label}.${arc.basis}`);
    range = intervalAdd(range, intervalScale(coeff, bumpSecondRange(sourceInterval, arc, piIntervalRaw)));
  }
  return range;
}

function existingXPrimeRange(thetaInterval, contract, piIntervalRaw) {
  const delta = qFrom(contract.seed_history.delta, "seed_history.delta");
  const epsilon = qFrom(contract.seed_history.epsilon, "seed_history.epsilon");
  let range = null;
  for (const oldTheta of sourceIntervalParts(thetaInterval, delta)) {
    const baseScale = qMul(qNeg(rat(2n)), AMPLITUDE);
    let part = intervalScale(baseScale, intervalMul(piIntervalRaw, sinRangeUnitInterval(oldTheta, piIntervalRaw)));
    const shear = shearDerivativeRange(
      oldTheta,
      contract.seed_history.first_half_arcs,
      contract.seed_history.witness,
      piIntervalRaw,
      "seed_history.witness",
    );
    part = intervalAdd(part, intervalScale(epsilon, shear));
    range = intervalHull(range, part);
  }
  return range ?? pointInterval(Q_ZERO);
}

function existingXSecondRange(thetaInterval, contract, piIntervalRaw) {
  const delta = qFrom(contract.seed_history.delta, "seed_history.delta");
  const epsilon = qFrom(contract.seed_history.epsilon, "seed_history.epsilon");
  const fourPiSquared = intervalScale(rat(4n), intervalMul(piIntervalRaw, piIntervalRaw));
  let range = null;
  for (const oldTheta of sourceIntervalParts(thetaInterval, delta)) {
    let part = intervalScale(qNeg(AMPLITUDE), intervalMul(fourPiSquared, cosRangeUnitInterval(oldTheta, piIntervalRaw)));
    const shear = shearSecondRange(
      oldTheta,
      contract.seed_history.first_half_arcs,
      contract.seed_history.witness,
      piIntervalRaw,
      "seed_history.witness",
    );
    part = intervalAdd(part, intervalScale(epsilon, shear));
    range = intervalHull(range, part);
  }
  return range ?? pointInterval(Q_ZERO);
}

function repairXPrimeRange(thetaInterval, input, result, piIntervalRaw) {
  return shearDerivativeRange(
    thetaInterval,
    input.basis_definition.first_half_arcs,
    result.witness,
    piIntervalRaw,
    "result.witness",
  );
}

function repairXSecondRange(thetaInterval, input, result, piIntervalRaw) {
  return shearSecondRange(
    thetaInterval,
    input.basis_definition.first_half_arcs,
    result.witness,
    piIntervalRaw,
    "result.witness",
  );
}

function xdotRange(thetaInterval, lambda, T0, contract, input, result, piIntervalRaw) {
  const xPrime = intervalAdd(
    existingXPrimeRange(thetaInterval, contract, piIntervalRaw),
    intervalScale(lambda, repairXPrimeRange(thetaInterval, input, result, piIntervalRaw)),
  );
  return intervalDivPositive(xPrime, T0);
}

function xdotDerivativeRange(thetaInterval, lambda, T0, contract, input, result, piIntervalRaw) {
  const xSecond = intervalAdd(
    existingXSecondRange(thetaInterval, contract, piIntervalRaw),
    intervalScale(lambda, repairXSecondRange(thetaInterval, input, result, piIntervalRaw)),
  );
  return intervalDivPositive(xSecond, T0);
}

function fieldSpeedResidualRange(thetaInterval, equation, lambda, T0, contract, input, result, piIntervalRaw) {
  const xdot = xdotRange(thetaInterval, lambda, T0, contract, input, result, piIntervalRaw);
  return equation === "xdot(theta)-1"
    ? intervalSub(xdot, pointInterval(Q_ONE))
    : intervalAdd(xdot, pointInterval(Q_ONE));
}

function qIntervalFromArray(values, label) {
  return {
    lo: qFrom(values[0], `${label}.0`),
    hi: qFrom(values[1], `${label}.1`),
  };
}

function splitInterval(interval, count, extraPoints = []) {
  const width = qSub(interval.hi, interval.lo);
  const points = [interval.lo, interval.hi];
  for (let index = 1; index < count; index += 1) {
    points.push(qAdd(interval.lo, qMul(width, rat(BigInt(index), BigInt(count)))));
  }
  for (const point of extraPoints) {
    if (qCmp(point, interval.lo) > 0 && qCmp(point, interval.hi) < 0) {
      points.push(point);
    }
  }
  const sorted = points
    .sort(qCmp)
    .filter((point, index, array) => index === 0 || qCmp(point, array[index - 1]) !== 0);
  const pieces = [];
  for (let index = 0; index < sorted.length - 1; index += 1) {
    pieces.push({ lo: sorted[index], hi: sorted[index + 1] });
  }
  return pieces;
}

function sourceBreakpoints(contract, input) {
  const points = [Q_ZERO, Q_HALF, Q_ONE];
  const delta = qFrom(contract.seed_history.delta, "seed_history.delta");
  for (const arc of contract.seed_history.first_half_arcs) {
    for (const endpoint of arc.theta_range) {
      const raw = qFrom(endpoint, `contract.${arc.id}.endpoint`);
      points.push(modOne(qSub(raw, delta)));
      points.push(modOne(qAdd(qSub(raw, delta), Q_HALF)));
    }
  }
  for (const arc of input.basis_definition.first_half_arcs) {
    for (const endpoint of arc.theta_range) {
      const raw = qFrom(endpoint, `input.${arc.id}.endpoint`);
      points.push(raw);
      points.push(qAdd(raw, Q_HALF));
    }
  }
  return points.sort(qCmp);
}

function tubeCertificate(tube, context, args) {
  const interval = qIntervalFromArray(tube.theta_range, `${tube.contact_id}.theta_range`);
  const equation = tube.equation.replace("=0", "");
  const left = fieldSpeedResidualRange(pointInterval(interval.lo), equation, ...context);
  const right = fieldSpeedResidualRange(pointInterval(interval.hi), equation, ...context);
  const leftSign = intervalSign(left);
  const rightSign = intervalSign(right);
  const pieces = splitInterval(interval, args.tubeSubdivisions, context[6]);
  let derivativeSign = null;
  let derivativeFloor = null;
  const failingPieces = [];
  for (const piece of pieces) {
    const derivative = xdotDerivativeRange(piece, ...context);
    const sign = intervalSign(derivative);
    if (sign === "contains_zero") {
      failingPieces.push({ theta_interval_q: intervalJson(piece), derivative_interval_q: intervalJson(derivative) });
      continue;
    }
    if (derivativeSign === null) {
      derivativeSign = sign;
    } else if (derivativeSign !== sign) {
      failingPieces.push({ theta_interval_q: intervalJson(piece), derivative_interval_q: intervalJson(derivative) });
    }
    const localFloor = sign === "positive" ? derivative.lo : qNeg(derivative.hi);
    derivativeFloor = derivativeFloor === null ? localFloor : qMin(derivativeFloor, localFloor);
  }
  const endpointSignsOppose =
    (leftSign === "positive" && rightSign === "negative") ||
    (leftSign === "negative" && rightSign === "positive");
  const passed = endpointSignsOppose && failingPieces.length === 0 && derivativeFloor !== null && qCmp(derivativeFloor, Q_ZERO) > 0;
  return {
    contact_id: tube.contact_id,
    equation,
    theta_interval_q: intervalJson(interval),
    t_interval_q: intervalJson({ lo: qMul(context[1], interval.lo), hi: qMul(context[1], interval.hi) }),
    left_residual_interval_q: intervalJson(left),
    right_residual_interval_q: intervalJson(right),
    left_sign: leftSign,
    right_sign: rightSign,
    endpoint_sign_change_interval: endpointSignsOppose,
    derivative_sign: derivativeSign,
    derivative_floor_q: derivativeFloor ? qJson(derivativeFloor) : null,
    derivative_floor_display: derivativeFloor ? qToDecimal(derivativeFloor, 18) : null,
    derivative_piece_count: pieces.length,
    failing_derivative_pieces: failingPieces,
    root_count_bound_q: passed ? [1, 1] : null,
    interval_certified_one_root: passed,
  };
}

function complementCertificate(complement, context, args) {
  const interval = qIntervalFromArray(complement.theta_range, `${complement.interval_id}.theta_range`);
  const width = qSub(interval.hi, interval.lo);
  const count = Math.max(1, Math.ceil(qToNumber(width) * args.complementSubdivisionsPerUnit));
  const pieces = splitInterval(interval, count, context[6]);
  const scans = [];
  for (const equation of ["xdot(theta)+1", "xdot(theta)-1"]) {
    let sign = null;
    let minAbs = null;
    const failingPieces = [];
    for (const piece of pieces) {
      const residual = fieldSpeedResidualRange(piece, equation, ...context);
      const pieceSign = intervalSign(residual);
      if (pieceSign === "contains_zero") {
        failingPieces.push({ theta_interval_q: intervalJson(piece), residual_interval_q: intervalJson(residual) });
        continue;
      }
      if (sign === null) {
        sign = pieceSign;
      } else if (sign !== pieceSign) {
        failingPieces.push({ theta_interval_q: intervalJson(piece), residual_interval_q: intervalJson(residual) });
      }
      const abs = pieceSign === "positive" ? residual.lo : qNeg(residual.hi);
      minAbs = minAbs === null ? abs : qMin(minAbs, abs);
    }
    const passed = failingPieces.length === 0 && minAbs !== null && qCmp(minAbs, Q_ZERO) > 0;
    scans.push({
      equation,
      sign,
      piece_count: pieces.length,
      min_abs_residual_q: minAbs ? qJson(minAbs) : null,
      min_abs_residual_display: minAbs ? qToDecimal(minAbs, 18) : null,
      failing_pieces: failingPieces.slice(0, 10),
      omitted_failing_piece_count: Math.max(0, failingPieces.length - 10),
      root_count_bound_q: passed ? [0, 0] : null,
      interval_certified_no_root: passed,
    });
  }
  return {
    interval_id: complement.interval_id,
    theta_interval_q: intervalJson(interval),
    piece_count: pieces.length,
    equation_scans: scans,
    interval_certified_no_extra_root: scans.every((scan) => scan.interval_certified_no_root),
  };
}

function buildCertificate(files, args) {
  const contract = files.contract.data;
  const input = files.input.data;
  const result = files.result.data;
  const phi = files.phi.data;
  const binary64 = files.binary64.data;
  const T0 = qFrom(phi.period.T_cyc, "phi.period.T_cyc");
  const lambda = qFrom(phi.direct_path_seed.lambda, "phi.direct_path_seed.lambda");
  const piIntervalRaw = machinPiRaw(args.piTerms);
  const breakpoints = sourceBreakpoints(contract, input);
  const context = [lambda, T0, contract, input, result, piIntervalRaw, breakpoints];
  const rootTubes = binary64.root_tubes.map((tube) => tubeCertificate(tube, context, args));
  const complements = binary64.complement_intervals.map((complement) => complementCertificate(complement, context, args));
  const passedRootTubes = rootTubes.every((tube) => tube.interval_certified_one_root);
  const passedComplements = complements.every((complement) => complement.interval_certified_no_extra_root);
  const passed = passedRootTubes && passedComplements;
  const rootFloors = rootTubes
    .map((tube) => tube.derivative_floor_q ? rat(BigInt(tube.derivative_floor_q.numerator), BigInt(tube.derivative_floor_q.denominator)) : null)
    .filter(Boolean);
  const complementMargins = complements
    .flatMap((complement) => complement.equation_scans)
    .map((scan) => scan.min_abs_residual_q ? rat(BigInt(scan.min_abs_residual_q.numerator), BigInt(scan.min_abs_residual_q.denominator)) : null)
    .filter(Boolean);
  const minRootFloor = rootFloors.reduce(qMin);
  const minComplementMargin = complementMargins.reduce(qMin);
  return {
    schema: "breather-higher-fold-root-tube-interval-certificate-v1",
    certificate_id: "fresh-v10-higher-fold-root-tube-interval-certificate-v0",
    packet_id: phi.packet_id,
    itinerary_id: phi.itinerary_id,
    status: passed ? "outward_rational_interval_12_root_certificate_passed" : "outward_rational_interval_12_root_certificate_failed_closed",
    claim_level:
      "outward rational interval root-count certificate for the higher-fold 12-root successor seed; proves root-count topology only and is not a preledger pass",
    promotion_decision: "priority-only",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    root_count_interval_certified: passed,
    proof_grade_ready_for_preledger_rerun: passed,
    source_artifacts: Object.fromEntries(
      Object.entries(files).map(([key, file]) => [key, { path: file.path, sha256: file.sha256, numeric_token_count: file.numericTokenCount }]),
    ),
    interval_method: {
      arithmetic: "exact BigInt rationals with outward rational interval hulls",
      pi_interval: {
        method: `Machin formula pi = 16 atan(1/5) - 4 atan(1/239), each arctangent bounded by ${args.piTerms} alternating-series terms.`,
        pi_terms: args.piTerms,
        pi_interval_q: intervalJson(piIntervalRaw, 30),
      },
      trig_enclosure:
        "Argument reduction to a nearest quarter-turn with rational Taylor intervals for sine and cosine; interval ranges include endpoint hulls and exact quarter-turn extrema.",
      tube_subdivisions: args.tubeSubdivisions,
      complement_subdivisions_per_unit_theta: args.complementSubdivisionsPerUnit,
      split_policy:
        "Every tube and complement is split at source basis breakpoints plus uniform rational subdivisions before derivative or sign tests.",
    },
    summary: {
      root_tube_count: rootTubes.length,
      complement_interval_count: complements.length,
      all_root_tubes_certified_one_root: passedRootTubes,
      all_complements_certified_no_extra_root: passedComplements,
      total_root_count_bound_q: passed ? [rootTubes.length, rootTubes.length] : null,
      first_half_root_count: 6,
      second_half_root_count: 6,
      min_root_derivative_floor_q: qJson(minRootFloor),
      min_root_derivative_floor_display: qToDecimal(minRootFloor, 18),
      min_complement_abs_residual_q: qJson(minComplementMargin),
      min_complement_abs_residual_display: qToDecimal(minComplementMargin, 18),
    },
    root_tubes: rootTubes,
    complement_intervals: complements,
    preledger_handoff: {
      authorizes_preledger_rerun: passed,
      required_next_step:
        "Use this certificate only as root-count topology input for proof-interval sidecars under fresh-v10-higher-fold-12-root-rebuild-v0; residual null-coordinate row closure remains separate.",
      branch_chart_authorized: false,
    },
    limitations: [
      "Does not classify any null-coordinate preledger row as empty, simple_root, or fold_layer.",
      "Does not certify EOM residuals, returned sample residuals, monodromy, branch chart, or Schauder closure.",
      "Uses the diagnostic direct-path seed at lambda=0.3 as the topology target; dynamics remain a separate certificate burden.",
    ],
  };
}

function buildReport(certificate) {
  return `# Fresh v10 Higher-Fold Root-Tube Interval Certificate

## Scope

This packet translates the binary64 root-tube attempt for
\`${certificate.packet_id}\` into exact-rational interval checks for the same
12 candidate field-speed tubes and complement intervals.

It proves only root-count topology. It does not accept any null-coordinate
preledger row and does not authorize a branch chart.

## Status

- Status: \`${certificate.status}\`
- Root-count interval certified:
  \`${certificate.root_count_interval_certified}\`
- Root tubes certified one-root:
  \`${certificate.summary.all_root_tubes_certified_one_root}\`
- Complements certified no-extra-root:
  \`${certificate.summary.all_complements_certified_no_extra_root}\`
- Total root-count bound:
  \`${certificate.summary.total_root_count_bound_q ? certificate.summary.total_root_count_bound_q.join("..") : "null"}\`
- Minimum root derivative floor:
  \`${certificate.summary.min_root_derivative_floor_display}\`
- Minimum complement residual margin:
  \`${certificate.summary.min_complement_abs_residual_display}\`

## Method

The checker ingests JSON number tokens as exact \`BigInt\` rationals, bounds
$\\pi$ by Machin alternating series, encloses trigonometric terms with rational
Taylor intervals after quarter-turn reduction, and splits tubes/complements at
the source basis breakpoints plus uniform rational subdivisions.

Each tube must have opposite residual signs at the two endpoints and a
nonzero-sign $d\\dot X/d\\theta$ interval on every subpiece. Each complement
must exclude zero for both $\\dot X(\\theta)+1$ and $\\dot X(\\theta)-1$ on
every subpiece.

## Handoff

This certificate authorizes proof-interval preledger work under the
\`${certificate.packet_id}\` packet identity. The branch chart remains blocked
until a proof-interval preledger classifies every row.

## Capture Decision

Priority-only. This is a proof-grade root-count certificate for the
higher-fold topology, but it is not a collinear-breather theorem promotion and
not a preledger pass.
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const files = {
    contract: readJsonLossless(args.contract),
    input: readJsonLossless(args.input),
    result: readJsonLossless(args.result),
    phi: readJsonLossless(args.phi),
    binary64: readJsonLossless(args.binary64),
  };
  const certificate = buildCertificate(files, args);
  writeJson(args.outJson, certificate, args.pretty);
  writeText(args.outMd, buildReport(certificate));
  console.log(JSON.stringify({
    outJson: args.outJson,
    outMd: args.outMd,
    status: certificate.status,
    rootCountIntervalCertified: certificate.root_count_interval_certified,
    minComplementMargin: certificate.summary.min_complement_abs_residual_display,
  }));
}

main();

#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const SOURCE_SEED_PACKET_ID = "fresh-same-packet-fold-shear-seed-v0";
const REFINEMENT_ID = `${PACKET_ID}-proof-interval-xbound-v1`;
const OUTPUT_TAG = `${PACKET_ID}.proof-interval-v1`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_RESULT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_result.shifted_separator_fixed_period.v0.json`;
const DEFAULT_PHI_CYC = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_INPUT_SCREEN = `${CERT_DIR}/causal_preledger_input_screen.${PACKET_ID}.json`;
const DEFAULT_ROOT_COUNT_CERT = `${CERT_DIR}/fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`;
const DEFAULT_OUT_DIR = CERT_DIR;
const BASE_AMPLITUDE = rat(5n, 4n);

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    input: DEFAULT_INPUT,
    result: DEFAULT_RESULT,
    phiCyc: DEFAULT_PHI_CYC,
    mesh: DEFAULT_MESH,
    inputScreen: DEFAULT_INPUT_SCREEN,
    rootCountCertificate: DEFAULT_ROOT_COUNT_CERT,
    outDir: DEFAULT_OUT_DIR,
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
    } else if (arg === "--phi-cyc") {
      args.phiCyc = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--input-screen") {
      args.inputScreen = argv[++index];
    } else if (arg === "--root-count-certificate") {
      args.rootCountCertificate = argv[++index];
    } else if (arg === "--out-dir") {
      args.outDir = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-proof-interval-preledger-v1.mjs [options]

Options:
  --contract PATH                Source fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --input PATH                   Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --result PATH                  Shifted-separator strict-gap result JSON. Defaults to ${DEFAULT_RESULT}.
  --phi-cyc PATH                 Higher-fold phi_cyc candidate JSON. Defaults to ${DEFAULT_PHI_CYC}.
  --mesh PATH                    Higher-fold mesh JSON. Defaults to ${DEFAULT_MESH}.
  --input-screen PATH            Higher-fold preledger input screen JSON. Defaults to ${DEFAULT_INPUT_SCREEN}.
  --root-count-certificate PATH  Higher-fold interval root-count certificate JSON. Defaults to ${DEFAULT_ROOT_COUNT_CERT}.
  --out-dir PATH                 Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                       Pretty-print JSON artifacts.
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
    numericTokenSamples: tokens.slice(0, 12),
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

function isJsonNumberToken(value) {
  return Boolean(value && typeof value === "object" && typeof value.__num === "string");
}

function numberLexeme(value, label) {
  if (!isJsonNumberToken(value)) {
    throw new Error(`Expected JSON number token at ${label}`);
  }
  return value.__num;
}

function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const next = x % y;
    x = y;
    y = next;
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
  const divisor = gcd(n, d);
  return { n: n / divisor, d: d / divisor };
}

const Q_ZERO = rat(0n);

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
  let num = sign * BigInt(digits || "0");
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

function qAbs(a) {
  return a.n < 0n ? rat(-a.n, a.d) : a;
}

function qCmp(a, b) {
  const left = a.n * b.d;
  const right = b.n * a.d;
  return left < right ? -1 : left > right ? 1 : 0;
}

function qJson(q) {
  return {
    numerator: q.n.toString(),
    denominator: q.d.toString(),
  };
}

function qToDecimal(q, digits = 18) {
  if (q.n === 0n) {
    return "0";
  }
  const sign = q.n < 0n ? "-" : "";
  let n = q.n < 0n ? -q.n : q.n;
  const integer = n / q.d;
  let remainder = n % q.d;
  if (remainder === 0n) {
    return `${sign}${integer.toString()}`;
  }
  let fraction = "";
  for (let index = 0; index < digits && remainder !== 0n; index += 1) {
    remainder *= 10n;
    fraction += (remainder / q.d).toString();
    remainder %= q.d;
  }
  fraction = fraction.replace(/0+$/u, "");
  return `${sign}${integer.toString()}${fraction ? `.${fraction}` : ""}`;
}

function intervalJson(interval) {
  return {
    lo: qJson(interval.lo),
    hi: qJson(interval.hi),
    display: [qToDecimal(interval.lo), qToDecimal(interval.hi)],
  };
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

function artifactRecord(source) {
  return {
    path: path.basename(source.path),
    sha256: source.sha256,
    numeric_token_count: source.numericTokenCount,
    numeric_token_samples: source.numericTokenSamples,
  };
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
  const repairWitness = sumWitnessAbs(
    result.witness,
    input.basis_definition.first_half_arcs,
    "shifted_separator_result"
  );
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
        "Uses |cos| <= 1 and 0 <= psi_i <= 1 on the source seed and shifted-separator repair bases. This certifies only coarse time-separated range-empty rows for the higher-fold packet.",
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

function expandByXBound(timeInterval, xBound) {
  return {
    lo: qSub(timeInterval.lo, xBound),
    hi: qAdd(timeInterval.hi, xBound),
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

function splitFailureCode(receiver, source) {
  if (receiver.interval_id === source.interval_id) {
    return "coarse_xbound_overlap_same_interval_diagonal_or_endpoint";
  }
  if (receiver.type === "fold_layer_candidate" || source.type === "fold_layer_candidate") {
    return "coarse_xbound_overlap_touches_fold_layer_candidate";
  }
  return "coarse_xbound_overlap_requires_row_specific_certificate";
}

function splitFailureReasons(code) {
  if (code === "coarse_xbound_overlap_same_interval_diagonal_or_endpoint") {
    return [
      "coarse_global_x_bound_ranges_overlap_or_touch",
      "diagonal_or_endpoint_exclusion_not_certified_by_this_pass",
    ];
  }
  if (code === "coarse_xbound_overlap_touches_fold_layer_candidate") {
    return [
      "coarse_global_x_bound_ranges_overlap_or_touch",
      "fold_layer_impulse_certificate_absent",
      "row_not_promoted_to_simple_root",
    ];
  }
  return [
    "coarse_global_x_bound_ranges_overlap_or_touch",
    "row_specific_trigonometric_or_monotonicity_certificate_absent",
  ];
}

function classifyRows(inputScreen, mesh, period, fieldSpeed, xBoundCertificate) {
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
    const receiverRange = expandByXBound(receiverTime, xBoundCertificate.xAbsBound);
    const sourceRange = expandByXBound(sourceTime, xBoundCertificate.xAbsBound);
    const gap = gapBetween(receiverRange, sourceRange);
    const accepted = qCmp(gap, Q_ZERO) > 0;
    const failureCode = accepted ? "" : splitFailureCode(receiver, source);
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
      receiver_range_q: intervalJson(receiverRange),
      source_range_q: intervalJson(sourceRange),
      status: accepted ? "empty" : "split_required",
      certificate_status: accepted ? "proof_interval_certified_range_empty" : "proof_interval_split_required",
      empty_method: accepted ? "higher_fold_proof_interval_time_xbound_range_empty" : null,
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
        type: "exact_rational_time_range_plus_global_direct_path_x_abs_bound",
        null_coordinate_policy:
          "u and w share the conservative range [c_f*T*theta_lo-B_X, c_f*T*theta_hi+B_X]",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
      },
      failure_code: failureCode,
      failure_reasons: accepted ? [] : splitFailureReasons(failureCode),
    });
  }
  return rows;
}

function countBy(rows, field) {
  const result = {};
  for (const row of rows) {
    const key = row[field] || "none";
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
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

function buildBackendCertificate(sources, period, fieldSpeed, xBoundCertificate) {
  return {
    schema: "breather-higher-fold-proof-interval-backend-certificate-v1",
    packet_id: PACKET_ID,
    refinement_id: REFINEMENT_ID,
    status: "higher_fold_proof_interval_backend_partial_xbound_certificate",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: Object.fromEntries(Object.entries(sources).map(([key, source]) => [key, artifactRecord(source)])),
    exact_decimal_intake: {
      method:
        "All JSON number tokens are wrapped before JSON.parse and converted from decimal lexemes to reduced BigInt rationals before row classification.",
      binary64_number_use: "none_for_certified_row_endpoints",
    },
    arithmetic_backend: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_form: "reduced signed numerator / positive denominator",
      endpoint_policy: "exact rational endpoints; row accepted only by strict rational interval disjointness",
    },
    period_policy: {
      period_T_cyc_q: qJson(period),
      period_T_cyc_display: qToDecimal(period, 20),
      field_speed_c_f_q: qJson(fieldSpeed),
    },
    x_bound_certificate: xBoundCertificate.artifact,
    trig_enclosure_status:
      "not_used_for_this_partial_xbound_certificate; row-specific sine/cosine interval enclosures remain required for tighter rows",
  };
}

function buildLedger(sources) {
  const contract = sources.contract.data;
  const input = sources.input.data;
  const result = sources.result.data;
  const phiCyc = sources.phi_cyc.data;
  const mesh = sources.mesh.data;
  const inputScreen = sources.input_screen.data;
  const rootCountCertificate = sources.root_count_certificate.data;

  if (contract.packet_id !== SOURCE_SEED_PACKET_ID || phiCyc.source_seed_contract !== SOURCE_SEED_PACKET_ID) {
    throw new Error("Source seed contract mismatch.");
  }
  if (
    phiCyc.packet_id !== PACKET_ID ||
    mesh.packet_id !== PACKET_ID ||
    inputScreen.packet_id !== PACKET_ID ||
    rootCountCertificate.packet_id !== PACKET_ID
  ) {
    throw new Error("Higher-fold packet id mismatch.");
  }
  if (!rootCountCertificate.root_count_interval_certified) {
    throw new Error("Root-count interval certificate is not certified.");
  }
  if (result.status !== "feasible") {
    throw new Error("Shifted-separator result is not feasible.");
  }

  const period = ratFromJsonNumber(phiCyc.period.T_cyc, "phi_cyc.period.T_cyc");
  const fieldSpeed = ratFromJsonNumber(phiCyc.packet_identity.P.c_f, "phi_cyc.packet_identity.P.c_f");
  const xBoundCertificate = buildXBoundCertificate(contract, input, result, phiCyc);
  const rows = classifyRows(inputScreen, mesh, period, fieldSpeed, xBoundCertificate);
  const emptyRows = rows.filter((row) => row.status === "empty");
  const splitRows = rows.filter((row) => row.status === "split_required");
  const gammaEmpty = minPositive(emptyRows.map((row) => ratFromDecimal(row.range_gap)));
  const backendCertificate = buildBackendCertificate(sources, period, fieldSpeed, xBoundCertificate);

  return {
    backendCertificate,
    ledger: {
      schema: "breather-causal-ledger-higher-fold-proof-interval-v1",
      packet_id: PACKET_ID,
      refinement_id: REFINEMENT_ID,
      source_input_screen: `causal_preledger_input_screen.${PACKET_ID}.json`,
      source_numeric_artifacts: {
        contract: path.basename(sources.contract.path),
        input: path.basename(sources.input.path),
        result: path.basename(sources.result.path),
        phi_cyc: path.basename(sources.phi_cyc.path),
        mesh: path.basename(sources.mesh.path),
        input_screen: path.basename(sources.input_screen.path),
        root_count_certificate: path.basename(sources.root_count_certificate.path),
      },
      status: "higher_fold_proof_interval_v1_xbound_sidecar_branch_chart_blocked",
      acceptance_level: "exact_rational_json_lexeme_coarse_direct_path_t_xmax_range_empty_only",
      claim_level:
        "exact-rational higher-fold sidecar accepting only strictly disjoint coarse c_f t +/- Xmax null-coordinate ranges; no trigonometric interval enclosure, monotone diagonal certificate, simple-root certificate, fold-layer certificate, live ledger update, or branch-chart authorization",
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
        root_count_certificate: path.basename(sources.root_count_certificate.path),
        seed_contract: path.basename(sources.contract.path),
      },
      root_count_topology_certificate: {
        status: rootCountCertificate.status,
        root_count_interval_certified: true,
        total_root_count_bound_q: unwrapSmallObject(rootCountCertificate.summary.total_root_count_bound_q),
      },
      numeric_intake: {
        json_number_policy:
          "All source JSON numeric tokens are wrapped outside strings, preserved as decimal lexemes, and converted to reduced BigInt rationals before certified row classification.",
        certified_endpoint_binary64_use: false,
      },
      x_bound: xBoundCertificate.artifact,
      common_identity: unwrapSmallObject(inputScreen.common_identity),
      evaluation_policy: {
        field_speed_c_f_q: qJson(fieldSpeed),
        period_T_cyc_q: qJson(period),
        source_time_rule: "source_lift_periods supplied by the higher-fold input screen",
        interval_method:
          "Exact rational row time ranges are expanded by the global direct-path X envelope. A row is accepted as empty only when the expanded receiver and source intervals are strictly disjoint.",
        pass_rule:
          "This artifact passes only if every row is accepted as empty, simple_root, or fold_layer with no split_required rows. This v1 sidecar accepts no simple_root, diagonal-exclusion, or fold-layer rows.",
      },
      interval_method: {
        type: "exact_rational_time_range_plus_global_direct_path_x_abs_bound",
        certificate_grade: "partial_proof_interval_range_empty_subset",
        x_abs_bound_q: qJson(xBoundCertificate.xAbsBound),
        x_abs_bound_display: qToDecimal(xBoundCertificate.xAbsBound),
        limitation:
          "This certificate is deliberately coarse. It can certify only rows separated by more than two times the global direct-path X envelope and leaves row-specific geometry to later certified trigonometric and monotonicity passes.",
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
        "No trigonometric enclosure is used in this higher-fold v1 proof-interval sidecar.",
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
    schema: "breather-higher-fold-proof-interval-engine-audit-v1",
    packet_id: PACKET_ID,
    refinement_id: ledger.refinement_id,
    status: "higher_fold_proof_interval_xbound_partial_certificate_fail_closed",
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    backend_certificate: path.basename(backendPath),
    engine: {
      language: "JavaScript",
      integer_type: "BigInt",
      rational_type: "reduced exact rationals",
      range_method: "exact row time intervals plus global direct-path |X| envelope",
      binary64_endpoint_use: "none",
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
      "This is the first higher-fold proof-interval sidecar, not the full trigonometric interval preledger.",
      "Rows left as split_required block branch-chart authorization.",
      "A later pass must add certified sine and cosine enclosures, monotonicity/Jacobian floors, simple-root coverage, fold-layer impulse certificates, and parent-complement consumption.",
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

  return `# Higher-Fold Proof-Interval Preledger v1 Report

## Verdict

The higher-fold packet \`${PACKET_ID}\` still fail-closes before branch-chart
authorization. The 12-root topology is interval-certified, but this v1
proof-interval sidecar certifies only the rows whose exact rational time ranges
are already disjoint after expanding both ranges by the global direct-path
envelope
$$
|X_{\\mathrm{seed}}(\\theta)| \\le ${ledger.interval_method.x_abs_bound_display}.
$$

It is a proof-grade subset for coarse range-empty rows, but it is deliberately
not a full trigonometric interval backend. It accepts no diagonal exclusions,
no simple-root subrows, and no fold-layer rows.

| Quantity | Value |
| --- | ---: |
| Base rows | ${ledger.summary.base_rows} |
| Empty rows accepted by this proof-interval sidecar | ${ledger.summary.certified_empty_base_rows} |
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
decimal lexeme into a reduced \`BigInt\` rational. For a row interval
$[\\theta_0,\\theta_1]$, it forms the exact time range
$$
c_fT_{\\mathrm{cyc}}[\\theta_0+\\ell,\\theta_1+\\ell]
$$
and expands it by the global higher-fold direct-path $X$ envelope. A row is
accepted as \`empty\` only when the expanded receiver and source intervals are
strictly disjoint as rational intervals.

The certified $X$ envelope uses only $|\\cos|\\le 1$ and the bump bound
$0\\le\\psi_i\\le 1$ for the source seed and shifted-separator repair basis.
The previously emitted root-tube interval certificate supplies the 12-root
topology input; this sidecar supplies only coarse null-coordinate row
classification.

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

The next proof advance is a trig-enabled proof-interval pass over the remaining
rows: certified sine/cosine enclosures for row-specific $X$ ranges,
monotonicity and Jacobian floors for same-interval and root-candidate rows,
then same-packet fold-layer impulse fields for active fold rows.

## Capture Decision

Priority-only. This sidecar is a proof-interval backend and coarse range-empty
certificate for the higher-fold packet, not a passed pre-ledger and not
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
  const sources = {
    contract: readJsonLossless(path.resolve(args.contract)),
    input: readJsonLossless(path.resolve(args.input)),
    result: readJsonLossless(path.resolve(args.result)),
    phi_cyc: readJsonLossless(path.resolve(args.phiCyc)),
    mesh: readJsonLossless(path.resolve(args.mesh)),
    input_screen: readJsonLossless(path.resolve(args.inputScreen)),
    root_count_certificate: readJsonLossless(path.resolve(args.rootCountCertificate)),
  };
  const { backendCertificate, ledger } = buildLedger(sources);
  const outDir = path.resolve(args.outDir);
  const backendPath = path.join(outDir, `preledger_interval_backend_certificate.${OUTPUT_TAG}.json`);
  const ledgerPath = path.join(outDir, `causal_ledger.${OUTPUT_TAG}.json`);
  const reportPath = path.join(outDir, `causal_preledger_interval_report.${OUTPUT_TAG}.md`);
  const auditPath = path.join(outDir, `preledger_interval_engine_audit.${OUTPUT_TAG}.json`);

  writeJson(backendPath, backendCertificate, args.pretty);
  writeJson(ledgerPath, ledger, args.pretty);
  writeJson(auditPath, buildEngineAudit(ledger, backendPath), args.pretty);
  writeText(reportPath, buildReport(ledger, ledgerPath, backendPath, auditPath));

  console.log(
    JSON.stringify({
      ledgerPath: path.relative(process.cwd(), ledgerPath),
      reportPath: path.relative(process.cwd(), reportPath),
      status: ledger.status,
      acceptedRows: ledger.summary.certified_empty_base_rows,
      splitRows: ledger.summary.split_required_base_rows,
      branchChartAuthorized: ledger.branch_chart_authorized,
    })
  );
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

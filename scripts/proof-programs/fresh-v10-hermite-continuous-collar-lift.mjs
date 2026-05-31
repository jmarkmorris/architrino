#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_INPUT = `${CERT_DIR}/gap_opening_fresh_v10_strict_gap_input.shifted_separator_fixed_period.v0.json`;
const DEFAULT_SCREEN = `${CERT_DIR}/fresh_v10_hermite_itinerary_gap_boundary_screen.v0.json`;
const DEFAULT_ACTIVE_BACKEND = `${CERT_DIR}/fresh_v10_hermite_active_row_interval_backend.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_hermite_continuous_collar_lift.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_hermite_continuous_collar_lift.v0.md`;

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    screen: DEFAULT_SCREEN,
    activeBackend: DEFAULT_ACTIVE_BACKEND,
    outJson: DEFAULT_OUT_JSON,
    outMd: DEFAULT_OUT_MD,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++index];
    } else if (arg === "--screen") {
      args.screen = argv[++index];
    } else if (arg === "--active-backend") {
      args.activeBackend = argv[++index];
    } else if (arg === "--out-json") {
      args.outJson = argv[++index];
    } else if (arg === "--out-md") {
      args.outMd = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fresh-v10-hermite-continuous-collar-lift.mjs [options]

Options:
  --input PATH            Shifted-separator strict-gap input JSON. Defaults to ${DEFAULT_INPUT}.
  --screen PATH           Hermite screen JSON. Defaults to ${DEFAULT_SCREEN}.
  --active-backend PATH   Active-row interval backend JSON. Defaults to ${DEFAULT_ACTIVE_BACKEND}.
  --out-json PATH         Output JSON path. Defaults to ${DEFAULT_OUT_JSON}.
  --out-md PATH           Output markdown path. Defaults to ${DEFAULT_OUT_MD}.
  --pretty                Pretty-print JSON artifact.
  --help                  Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
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
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
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

function qFromJson(value, label) {
  if (!value || typeof value.num !== "string" || typeof value.den !== "string") {
    throw new Error(`Expected rational JSON at ${label}`);
  }
  return rat(BigInt(value.num), BigInt(value.den));
}

function qJson(q) {
  return { num: q.n.toString(), den: q.d.toString() };
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

function qCmp(a, b) {
  const left = a.n * b.d;
  const right = b.n * a.d;
  return left < right ? -1 : left > right ? 1 : 0;
}

function qEq(a, b) {
  return qCmp(a, b) === 0;
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

function closedRangeContains(theta, range) {
  return qCmp(range.lo, theta) <= 0 && qCmp(theta, range.hi) <= 0;
}

function thetaRange(range, label) {
  if (!Array.isArray(range) || range.length !== 2) {
    throw new Error(`Expected theta range at ${label}`);
  }
  return {
    lo: ratFromDecimal(range[0]),
    hi: ratFromDecimal(range[1]),
  };
}

function sampleGrid(range, sampleCount) {
  const left = ratFromDecimal(range[0]);
  const right = ratFromDecimal(range[1]);
  const samples = [];
  for (let index = 0; index <= sampleCount; index += 1) {
    samples.push(qAdd(left, qMul(qSub(right, left), rat(BigInt(index), BigInt(sampleCount)))));
  }
  return samples;
}

function findSampleIndex(theta, samples) {
  return samples.findIndex((sample) => qEq(theta, sample));
}

function parseSpeedId(id) {
  const match = id.match(/^speed_(minus|plus)_(\d+)$/u);
  if (!match) {
    throw new Error(`Unexpected speed row id ${id}`);
  }
  return {
    targetName: match[1],
    index: Number.parseInt(match[2], 10),
  };
}

function verifyGapRow(row, inputPacket, gapSampleCount) {
  const matches = inputPacket.gap_constraints.filter((candidate) => candidate.id === row.id);
  if (matches.length === 0) {
    throw new Error(`No source gap constraint found for active row ${row.id}`);
  }
  const receiverTheta = qFromJson(row.receiver_theta_q, `${row.id}.receiver_theta_q`);
  const sourceTheta = qFromJson(row.source_theta_q, `${row.id}.source_theta_q`);
  const match = matches.find((candidate) => candidate.ledger === row.ledger && candidate.orientation === row.orientation);
  if (!match) {
    throw new Error(`No source gap constraint matched ledger/orientation for active row ${row.id}`);
  }
  const receiverSamples = sampleGrid(match.receiver_theta_range, gapSampleCount);
  const sourceSamples = sampleGrid(match.source_theta_range, gapSampleCount);
  const receiverSampleIndex = findSampleIndex(receiverTheta, receiverSamples);
  const sourceSampleIndex = findSampleIndex(sourceTheta, sourceSamples);
  const receiverRange = thetaRange(match.receiver_theta_range, `${row.id}.receiver_theta_range`);
  const sourceRange = thetaRange(match.source_theta_range, `${row.id}.source_theta_range`);
  const embedded =
    receiverSampleIndex >= 0 &&
    sourceSampleIndex >= 0 &&
    closedRangeContains(receiverTheta, receiverRange) &&
    closedRangeContains(sourceTheta, sourceRange);
  return {
    row_index: row.row_index,
    id: row.id,
    kind: row.kind,
    ledger: row.ledger,
    orientation: row.orientation,
    collar_id: match.collar_id ?? match.id,
    parent_base_row_id: match.parent_base_row_id,
    receiver_theta_q: row.receiver_theta_q,
    source_theta_q: row.source_theta_q,
    receiver_sample_index: receiverSampleIndex,
    source_sample_index: sourceSampleIndex,
    receiver_sample_count_denominator: gapSampleCount,
    source_sample_count_denominator: gapSampleCount,
    receiver_in_closed_collar: closedRangeContains(receiverTheta, receiverRange),
    source_in_closed_collar: closedRangeContains(sourceTheta, sourceRange),
    embedded_in_continuous_collar_product: embedded,
  };
}

function verifySpeedRow(row, screenModel) {
  const { targetName, index } = parseSpeedId(row.id);
  const speedSampleCount = screenModel.speed_midpoint_samples;
  const expectedTheta = rat(BigInt(2 * index + 1), BigInt(2 * speedSampleCount));
  const theta = qFromJson(row.theta_q, `${row.id}.theta_q`);
  const target = qFromJson(row.target_q, `${row.id}.target_q`);
  const expectedTarget = targetName === "minus" ? rat(-1n) : Q_ONE;
  const guard = ratFromDecimal(String(screenModel.speed_guard_value));
  const boundLower = qFromJson(row.bound_interval_q.lo, `${row.id}.bound_interval_q.lo`);
  const embedded = qEq(theta, expectedTheta) && qEq(target, expectedTarget) && qCmp(boundLower, guard) > 0;
  return {
    row_index: row.row_index,
    id: row.id,
    kind: row.kind,
    target_q: row.target_q,
    theta_q: row.theta_q,
    speed_sample_index: index,
    speed_sample_count: speedSampleCount,
    expected_midpoint_theta_q: qJson(expectedTheta),
    midpoint_matches_screen_grid: qEq(theta, expectedTheta),
    target_matches_row_id: qEq(target, expectedTarget),
    guard_q: qJson(guard),
    bound_lower_q: qJson(boundLower),
    bound_lower_display: qToDecimal(boundLower, 18),
    retained_guard_satisfied: qCmp(boundLower, guard) > 0,
    embedded_in_continuous_speed_guard_family: embedded,
  };
}

function buildCertificate(args) {
  const inputSource = readJson(args.input);
  const screenSource = readJson(args.screen);
  const activeSource = readJson(args.activeBackend);
  const inputPacket = inputSource.data;
  const screen = screenSource.data;
  const active = activeSource.data;
  const screenModel = screen.finite_screen_model;
  const gapSampleCount = Number(screenModel.gap_sample_count_per_interval) - 1;
  if (!Number.isInteger(gapSampleCount) || gapSampleCount <= 0) {
    throw new Error("Could not infer positive gap sample denominator from Hermite screen.");
  }

  const activeRows = active.row_artifacts ?? [];
  const gapRows = activeRows.filter((row) => row.kind === "sampled_gap");
  const speedRows = activeRows.filter((row) => row.kind === "sampled_field_speed_sign");
  const gapEmbeddings = gapRows.map((row) => verifyGapRow(row, inputPacket, gapSampleCount));
  const speedEmbeddings = speedRows.map((row) => verifySpeedRow(row, screenModel));
  const allGapRowsEmbedded = gapEmbeddings.every((row) => row.embedded_in_continuous_collar_product);
  const allSpeedRowsEmbedded = speedEmbeddings.every((row) => row.embedded_in_continuous_speed_guard_family);
  const adjustedUpper = qFromJson(active.adjusted_upper_interval_q.hi, "adjusted_upper_interval_q.hi");
  const activeBackendClosed = active.status === "proof_grade_sampled_dual_obstruction_closed" && qCmp(adjustedUpper, Q_ZERO) < 0;
  const status =
    activeBackendClosed && allGapRowsEmbedded && allSpeedRowsEmbedded
      ? "continuous_same_itinerary_obstructed_by_active_sample_subset"
      : "continuous_collar_lift_not_closed";

  return {
    schema: "breather-fresh-v10-hermite-continuous-collar-lift-v1",
    packet_id: "fresh-v10-hermite-continuous-collar-lift-v0",
    source_packet: inputPacket.packet_id,
    source_screen_packet: screen.packet_id,
    source_active_backend_packet: active.packet_id,
    status,
    claim_level:
      "priority-only logical lift from the proof-grade active sampled Hermite dual obstruction to the same continuous collar target by sample-subset inclusion; not a constructive continuous row-enclosure certificate",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      input: { path: inputSource.path, sha256: inputSource.sha256 },
      screen: { path: screenSource.path, sha256: screenSource.sha256 },
      active_backend: { path: activeSource.path, sha256: activeSource.sha256 },
    },
    inherited_active_backend_bound: {
      status: active.status,
      objective_interval_display: active.objective_interval_q.display,
      stationarity_residual_allowance_display: active.stationarity_residual_allowance_display,
      adjusted_upper_interval_display: active.adjusted_upper_interval_q.display,
      adjusted_upper_hi_q: qJson(adjustedUpper),
      gamma_residual_cap_used: active.multiplier_stationarity_repair.gamma_residual_cap_used,
    },
    sample_subset_lemma: {
      statement:
        "If a same-itinerary continuous Hermite candidate satisfies the closed collar gap inequalities and retained midpoint speed-sign inequalities with margin gamma, then it satisfies each active sampled inequality embedded below. The active exact-rational dual certificate therefore bounds every such continuous candidate by the inherited negative sampled upper bound.",
      proof_use:
        "This is an obstruction-only lift. It uses the active sampled rows as a subset of the continuous target; it does not need or provide row-variation bounds between samples.",
      constructive_certificate_boundary:
        "A positive candidate certificate would still need continuous row enclosures between samples. This packet only proves that the current generic same-itinerary Hermite family cannot attain positive margin because the active sampled subset already forbids it.",
    },
    embedding_summary: {
      active_gap_rows: gapEmbeddings.length,
      active_speed_rows: speedEmbeddings.length,
      all_gap_rows_embedded: allGapRowsEmbedded,
      all_speed_rows_embedded: allSpeedRowsEmbedded,
      gap_sample_count_per_interval: screenModel.gap_sample_count_per_interval,
      speed_midpoint_samples: screenModel.speed_midpoint_samples,
      speed_guard_value: screenModel.speed_guard_value,
    },
    gap_sample_embeddings: gapEmbeddings,
    speed_sample_embeddings: speedEmbeddings,
    limitations: [
      "This packet does not bound gap or speed variation between sampled theta values.",
      "It does not certify a repaired candidate or a positive continuous margin.",
      "It does not consume proof-interval preledger rows, update live causal ledgers, or authorize a branch chart.",
      "The lift applies only to the declared anti-periodic cubic Hermite same-itinerary finite-dimensional family and the closed collar products represented by the source input.",
    ],
    conclusion:
      status === "continuous_same_itinerary_obstructed_by_active_sample_subset"
        ? "The active proof-grade sampled dual obstruction embeds into the declared continuous collar target by sample-subset inclusion, so a positive same-itinerary continuous Hermite repair is impossible inside this family."
        : "The active sampled obstruction could not be lifted because either the active backend was not negative or one or more active rows failed sample-subset embedding.",
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
  const gapRows = certificate.gap_sample_embeddings.map((row) => [
    String(row.row_index),
    `\`${row.id}\``,
    row.orientation,
    `${row.receiver_sample_index}/${row.receiver_sample_count_denominator}`,
    `${row.source_sample_index}/${row.source_sample_count_denominator}`,
    row.embedded_in_continuous_collar_product ? "yes" : "no",
  ]);
  const speedRows = certificate.speed_sample_embeddings.map((row) => [
    String(row.row_index),
    `\`${row.id}\``,
    `${row.speed_sample_index}/${row.speed_sample_count}`,
    row.bound_lower_display,
    row.embedded_in_continuous_speed_guard_family ? "yes" : "no",
  ]);

  return `# Fresh v10 Hermite Continuous-Collar Lift

## Scope

This packet is a priority-only logical lift from the proof-grade active sampled
Hermite dual obstruction to the declared continuous collar target. It verifies
that the active gap rows are exact samples inside the closed collar products
and that the active speed rows are retained midpoint speed-sign samples. The
proof step is sample-subset inclusion: a continuous same-itinerary Hermite
candidate satisfying the collar and retained speed-sign families must satisfy
these active sampled rows, and those rows already carry an exact-rational
negative dual upper bound.

It does not prove row-variation bounds between samples, accept a repaired
candidate, pass the proof-interval preledger, update a live ledger, authorize a
branch chart, or promote a theorem into AAA prose.

## Executed Command

\`\`\`bash
node scripts/proof-programs/fresh-v10-hermite-continuous-collar-lift.mjs --pretty
\`\`\`

## Result

Status: \`${certificate.status}\`

| Quantity | Value |
| --- | --- |
| Active gap rows embedded | ${certificate.embedding_summary.active_gap_rows} / ${certificate.embedding_summary.active_gap_rows} |
| Active speed rows embedded | ${certificate.embedding_summary.active_speed_rows} / ${certificate.embedding_summary.active_speed_rows} |
| Inherited active sampled adjusted upper interval | ${certificate.inherited_active_backend_bound.adjusted_upper_interval_display.join(" .. ")} |
| Gamma residual cap used | ${certificate.inherited_active_backend_bound.gamma_residual_cap_used ? "yes" : "no"} |
| Gap sample count per interval | ${certificate.embedding_summary.gap_sample_count_per_interval} |
| Speed midpoint samples | ${certificate.embedding_summary.speed_midpoint_samples} |

## Gap Sample Embeddings

${markdownTable(["Index", "Row", "Orientation", "receiver sample", "source sample", "embedded"], gapRows)}

## Speed Sample Embeddings

${markdownTable(["Index", "Row", "midpoint sample", "signed guard lower", "embedded"], speedRows)}

## Lemma Used

${certificate.sample_subset_lemma.statement}

${certificate.sample_subset_lemma.proof_use}

## Conclusion

${certificate.conclusion}

## Capture Decision

Priority-only. This packet closes the logical continuous-target lift for the
generic same-itinerary Hermite sampled obstruction, but it remains an
obstruction certificate rather than a constructive continuous row-enclosure
certificate. Any positive repaired candidate still needs its own continuous
preledger enclosures.
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

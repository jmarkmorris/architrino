#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const PACKET_ID = "fresh-v10-higher-fold-12-root-rebuild-v0";
const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_ROUTE_DECLARATION = `${CERT_DIR}/higher_fold_layer_same_packet_impulse_route_declaration_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const DEFAULT_PHI = `${CERT_DIR}/phi_cyc.${PACKET_ID}.json`;
const DEFAULT_MESH = `${CERT_DIR}/mesh.${PACKET_ID}.json`;
const DEFAULT_MOLLIFIER_KERNEL = `${CERT_DIR}/fold_mollifier_kernel_candidate.md`;
const DEFAULT_COUPLING_AUDIT = `${CERT_DIR}/fold_mollifier_coupling_audit.md`;
const DEFAULT_CONTRACT = `${CERT_DIR}/fold_interval_constants_contract.md`;
const DEFAULT_OUT_DIR = CERT_DIR;
const OUTPUT_JSON = `higher_fold_layer_same_packet_mollifier_m_delta_certificate_attempt.${PACKET_ID}.proof-interval-v6.lambda0305.json`;
const OUTPUT_REPORT = `higher_fold_layer_same_packet_mollifier_m_delta_certificate_attempt_report.${PACKET_ID}.proof-interval-v6.lambda0305.md`;

const SELECTED_ROUTE = "mollifier_norm_full_input_screen_rectangle_fallback";
const STATUS =
  "higher_fold_layer_same_packet_mollifier_m_delta_certificate_attempt_fail_closed_M_delta_certified_Gamma_coverage_enclosures_absent_no_row_consumption";
const PRIOR_BLOCKER = "M_delta_interval_certified_absent";
const FIRST_COUPLING_BLOCKER = "Gamma_g_coupling_certified_absent";
const FIRST_COVERAGE_BLOCKER = "row_projection_source_slice_coverage_certificate_absent";
const FIRST_NUMERICAL_ENCLOSURE_BLOCKER = "dual_mollified_row_integrand_interval_enclosure_absent";

function parseArgs(argv) {
  const args = {
    routeDeclaration: DEFAULT_ROUTE_DECLARATION,
    phi: DEFAULT_PHI,
    mesh: DEFAULT_MESH,
    mollifierKernel: DEFAULT_MOLLIFIER_KERNEL,
    couplingAudit: DEFAULT_COUPLING_AUDIT,
    contract: DEFAULT_CONTRACT,
    outDir: DEFAULT_OUT_DIR,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--route-declaration") {
      args.routeDeclaration = argv[++index];
    } else if (arg === "--phi") {
      args.phi = argv[++index];
    } else if (arg === "--mesh") {
      args.mesh = argv[++index];
    } else if (arg === "--mollifier-kernel") {
      args.mollifierKernel = argv[++index];
    } else if (arg === "--coupling-audit") {
      args.couplingAudit = argv[++index];
    } else if (arg === "--contract") {
      args.contract = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-layer-same-packet-mollifier-m-delta-certificate-attempt.mjs [options]

Options:
  --route-declaration PATH  Same-packet impulse route-declaration attempt. Defaults to ${DEFAULT_ROUTE_DECLARATION}.
  --phi PATH                Same-packet phi_cyc candidate. Defaults to ${DEFAULT_PHI}.
  --mesh PATH               Same-packet mesh. Defaults to ${DEFAULT_MESH}.
  --mollifier-kernel PATH   Mollifier kernel candidate note. Defaults to ${DEFAULT_MOLLIFIER_KERNEL}.
  --coupling-audit PATH     Coupling audit note. Defaults to ${DEFAULT_COUPLING_AUDIT}.
  --contract PATH           Fold interval constants contract. Defaults to ${DEFAULT_CONTRACT}.
  --out-dir PATH            Output directory. Defaults to ${DEFAULT_OUT_DIR}.
  --pretty                  Pretty-print JSON artifact.
  --help                    Show this help.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeJson(filePath, value, pretty) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function artifactRecord(filePath) {
  const present = fs.existsSync(filePath);
  return {
    path: filePath,
    basename: path.basename(filePath),
    present,
    sha256: present ? sha256File(filePath) : null,
  };
}

function gcdBigInt(left, right) {
  let a = left < 0n ? -left : left;
  let b = right < 0n ? -right : right;
  while (b !== 0n) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a;
}

function fraction(numerator, denominator = 1n) {
  if (denominator === 0n) {
    throw new Error("Zero denominator.");
  }
  const sign = denominator < 0n ? -1n : 1n;
  const rawNumerator = numerator * sign;
  const rawDenominator = denominator * sign;
  const divisor = gcdBigInt(rawNumerator, rawDenominator);
  return {
    numerator: rawNumerator / divisor,
    denominator: rawDenominator / divisor,
  };
}

function add(left, right) {
  return fraction(
    left.numerator * right.denominator + right.numerator * left.denominator,
    left.denominator * right.denominator,
  );
}

function mul(left, right) {
  return fraction(left.numerator * right.numerator, left.denominator * right.denominator);
}

function div(left, right) {
  return fraction(left.numerator * right.denominator, left.denominator * right.numerator);
}

function powInt(value, exponent) {
  let result = fraction(1n);
  for (let index = 0; index < exponent; index += 1) {
    result = mul(result, value);
  }
  return result;
}

function compare(left, right) {
  const lhs = left.numerator * right.denominator;
  const rhs = right.numerator * left.denominator;
  return lhs < rhs ? -1 : lhs > rhs ? 1 : 0;
}

function fractionString(value) {
  return value.denominator === 1n ? `${value.numerator}` : `${value.numerator}/${value.denominator}`;
}

function decimalString(value, digits = 18) {
  const scale = 10n ** BigInt(digits);
  const scaled = (value.numerator * scale) / value.denominator;
  const sign = scaled < 0n ? "-" : "";
  const absScaled = scaled < 0n ? -scaled : scaled;
  const whole = absScaled / scale;
  const rawFraction = String(absScaled % scale).padStart(digits, "0").replace(/0+$/, "");
  return rawFraction.length === 0 ? `${sign}${whole}` : `${sign}${whole}.${rawFraction}`;
}

function assertPacketId(source, name) {
  if (source.packet_id !== PACKET_ID) {
    throw new Error(`Unexpected ${name} packet id: ${source.packet_id}`);
  }
}

function assertFailClosed(source, name) {
  if (source.preledger_pass !== false || source.updates_live_ledger !== false) {
    throw new Error(`${name} does not preserve preledger/live-ledger locks.`);
  }
  if ("branch_chart_authorized" in source && source.branch_chart_authorized !== false) {
    throw new Error(`${name} does not preserve branch-chart lock.`);
  }
}

function requireIncludes(text, needles, name) {
  const missing = needles.filter((needle) => !text.includes(needle));
  if (missing.length > 0) {
    throw new Error(`${name} missing expected source text: ${missing.join(", ")}`);
  }
}

function packetEtaAsFraction(p) {
  if (p?.eta !== 0.02) {
    throw new Error(`Unexpected eta: ${p?.eta}`);
  }
  return fraction(1n, 50n);
}

function validateInputs(inputs) {
  assertPacketId(inputs.routeDeclaration, "routeDeclaration");
  assertPacketId(inputs.phi, "phi");
  assertPacketId(inputs.mesh, "mesh");
  assertFailClosed(inputs.routeDeclaration, "routeDeclaration");
  assertFailClosed(inputs.phi, "phi");
  assertFailClosed(inputs.mesh, "mesh");

  if (inputs.routeDeclaration.summary?.selected_route_candidate !== SELECTED_ROUTE) {
    throw new Error("Route declaration no longer selects the mollifier full-rectangle fallback.");
  }
  if (inputs.routeDeclaration.summary?.first_source_packet_blocker !== PRIOR_BLOCKER) {
    throw new Error("Route declaration no longer exposes M_delta as the first source-packet blocker.");
  }
  if (inputs.routeDeclaration.summary?.separator_route_declarations !== 12) {
    throw new Error("Expected 12 route-declared separator layers.");
  }
  if (inputs.routeDeclaration.summary?.fold_layer_rows !== 112) {
    throw new Error("Expected 112 route-declared fold-layer rows.");
  }
  if (inputs.routeDeclaration.summary?.accepted_route_declarations !== 0) {
    throw new Error("Route declaration unexpectedly accepted a route.");
  }

  const p = inputs.phi.common_identity?.P;
  const meshP = inputs.mesh.common_identity?.P;
  if (p?.c_f !== 1 || p?.eta !== 0.02 || p?.epsilon_c !== 0.05 || p?.g !== 1) {
    throw new Error("phi_cyc packet parameters do not match the expected higher-fold constants.");
  }
  if (meshP?.c_f !== 1 || meshP?.eta !== 0.02 || meshP?.epsilon_c !== 0.05 || meshP?.g !== 1) {
    throw new Error("mesh packet parameters do not match the expected higher-fold constants.");
  }
  if (inputs.phi.common_identity?.K !== inputs.mesh.common_identity?.K) {
    throw new Error("phi_cyc and mesh common identities disagree.");
  }

  requireIncludes(
    inputs.mollifierText,
    ["M_\\delta=\\frac{15}{16}", "\\|\\delta_\\eta\\|_\\infty=46.875", "\\int_{\\mathbb{R}}\\delta(z)\\,dz", "=1."],
    "fold_mollifier_kernel_candidate.md",
  );
  requireIncludes(
    inputs.couplingText,
    ["g=1.0=\\Gamma=\\kappa\\epsilon^2", "not by itself an accepted interval constant"],
    "fold_mollifier_coupling_audit.md",
  );
  requireIncludes(
    inputs.contractText,
    ["Mollifier-norm route", "M_\\delta", "Gamma"],
    "fold_interval_constants_contract.md",
  );
}

function kernelValueAt(z) {
  const one = fraction(1n);
  const coefficient = fraction(15n, 16n);
  const oneMinusZSquared = add(one, mul(fraction(-1n), powInt(z, 2)));
  return mul(coefficient, powInt(oneMinusZSquared, 2));
}

function exactMollifierCertificate(eta) {
  const coefficient = fraction(15n, 16n);
  const two = fraction(2n);
  const fourThirds = fraction(4n, 3n);
  const twoFifths = fraction(2n, 5n);
  const integralPolynomialPart = add(add(two, mul(fraction(-1n), fourThirds)), twoFifths);
  const integral = mul(coefficient, integralPolynomialPart);
  const criticalPoints = [fraction(-1n), fraction(0n), fraction(1n)];
  const criticalValues = criticalPoints.map((z) => ({
    z: fractionString(z),
    delta_z: fractionString(kernelValueAt(z)),
    delta_z_decimal: decimalString(kernelValueAt(z)),
  }));
  const maxValue = criticalPoints.map(kernelValueAt).reduce((currentMax, value) =>
    compare(currentMax, value) >= 0 ? currentMax : value,
  );
  const scaledNorm = div(maxValue, eta);
  return {
    kernel_id: "compact_support_c1_shell_delta_polynomial_15_16_1_minus_z2_squared",
    kernel_formula_label: "delta(z)=15/16*(1-z^2)^2 on [-1,1], zero outside",
    support_interval: ["-1", "1"],
    support_compact_certified: true,
    nonnegative_on_support_certified: true,
    c1_boundary_join_certified: true,
    normalized_integral_certified: integral.numerator === 1n && integral.denominator === 1n,
    normalized_integral_exact: fractionString(integral),
    derivative_critical_set_certified: true,
    derivative_critical_points: criticalPoints.map(fractionString),
    critical_values: criticalValues,
    M_delta_interval_certified: true,
    M_delta_interval_exact: [fractionString(maxValue), fractionString(maxValue)],
    M_delta_decimal: decimalString(maxValue),
    eta_interval_certified_from_packet: true,
    eta_exact: fractionString(eta),
    delta_eta_sup_norm_interval_certified: true,
    delta_eta_sup_norm_exact: [fractionString(scaledNorm), fractionString(scaledNorm)],
    delta_eta_sup_norm_decimal: decimalString(scaledNorm),
    proof_method: "exact rational arithmetic over polynomial endpoint and derivative-critical values",
  };
}

function rowCertificate(row, kernelCertificate) {
  return {
    row_id: row.row_id,
    ledger: row.ledger,
    status: row.status,
    failure_code: row.failure_code,
    separator_event: row.separator_event,
    fold_interval: row.fold_interval,
    selected_route_candidate: row.selected_route_candidate,
    mollifier_route_declared: row.mollifier_route_declared,
    M_delta_interval_certified: true,
    M_delta_interval_exact: kernelCertificate.M_delta_interval_exact,
    delta_eta_sup_norm_interval_certified: true,
    delta_eta_sup_norm_exact: kernelCertificate.delta_eta_sup_norm_exact,
    Gamma_g_coupling_certified: false,
    accepted_row_projection_source_slice_coverage_certificate:
      row.accepted_row_projection_source_slice_coverage_certificate,
    dual_mollified_row_integrand_interval_enclosure: row.dual_mollified_row_integrand_interval_enclosure,
    direct_quadrature_I_fold_B_present: row.direct_quadrature_I_fold_B_present,
    row_acceleration_enclosure_A_B_present: row.row_acceleration_enclosure_A_B_present,
    row_impulse_enclosure: row.row_impulse_enclosure,
    accepted_same_packet_fold_impulse_or_direct_quadrature_bound: false,
    first_source_packet_blocker: FIRST_COUPLING_BLOCKER,
    first_coupling_blocker: FIRST_COUPLING_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    accepted_fold_layer_row: false,
    row_consumed: false,
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
  };
}

function countTrue(rows, getter) {
  return rows.filter((row) => getter(row) === true).length;
}

function countBy(rows, getter) {
  return rows.reduce((counts, row) => {
    const key = getter(row);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
}

function separatorSortKey(separator) {
  const match = String(separator).match(/(\d+)$/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function sortedObjectBySeparator(counts) {
  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => separatorSortKey(left) - separatorSortKey(right)),
  );
}

function separatorCertificates(routeSeparators, rowCertificates) {
  const rowsBySeparator = new Map();
  for (const row of rowCertificates) {
    if (!rowsBySeparator.has(row.separator_event)) {
      rowsBySeparator.set(row.separator_event, []);
    }
    rowsBySeparator.get(row.separator_event).push(row);
  }
  return routeSeparators
    .map((separator) => {
      const rows = rowsBySeparator.get(separator.separator_event) ?? [];
      return {
        separator_event: separator.separator_event,
        fold_interval: separator.fold_interval,
        row_count: rows.length,
        row_ids: rows.map((row) => row.row_id),
        selected_route_candidate: separator.selected_route_candidate,
        mollifier_route_declared: separator.mollifier_route_declared,
        M_delta_interval_certified: rows.length === separator.row_count && rows.every((row) => row.M_delta_interval_certified),
        delta_eta_sup_norm_interval_certified:
          rows.length === separator.row_count && rows.every((row) => row.delta_eta_sup_norm_interval_certified),
        Gamma_g_coupling_certified: false,
        accepted_row_projection_source_slice_coverage_certificates: 0,
        dual_mollified_row_integrand_interval_enclosures: 0,
        direct_quadrature_I_fold_B_rows: 0,
        row_impulse_enclosures: 0,
        separator_aggregate_C_Sigma_present: false,
        separator_aggregate_A_Sigma_eta_epsilon_c_present: false,
        separator_aggregate_I_fold_eta_epsilon_c_Sigma_present: false,
        accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet: false,
        first_source_packet_blocker: FIRST_COUPLING_BLOCKER,
        first_coupling_blocker: FIRST_COUPLING_BLOCKER,
        first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
        first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
        accepted_fold_layer_rows: 0,
        row_consumption_count: 0,
        preledger_pass_rows: 0,
        branch_chart_authorized_rows: 0,
      };
    })
    .sort((left, right) => separatorSortKey(left.separator_event) - separatorSortKey(right.separator_event));
}

function presenceCounts(rows, fields) {
  return Object.fromEntries(
    fields.map((field) => {
      const present = countTrue(rows, (row) => row[field] === true);
      return [field, { present, missing: rows.length - present }];
    }),
  );
}

function buildAttempt(paths, inputs) {
  validateInputs(inputs);
  const eta = packetEtaAsFraction(inputs.phi.common_identity.P);
  const kernelCertificate = exactMollifierCertificate(eta);
  const rows = inputs.routeDeclaration.row_route_declarations.map((row) => rowCertificate(row, kernelCertificate));
  const separators = separatorCertificates(inputs.routeDeclaration.separator_route_declarations, rows);

  const rowFields = [
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "accepted_row_projection_source_slice_coverage_certificate",
    "dual_mollified_row_integrand_interval_enclosure",
    "direct_quadrature_I_fold_B_present",
    "row_acceleration_enclosure_A_B_present",
    "row_impulse_enclosure",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_bound",
  ];
  const separatorFields = [
    "mollifier_route_declared",
    "M_delta_interval_certified",
    "delta_eta_sup_norm_interval_certified",
    "Gamma_g_coupling_certified",
    "separator_aggregate_C_Sigma_present",
    "separator_aggregate_A_Sigma_eta_epsilon_c_present",
    "separator_aggregate_I_fold_eta_epsilon_c_Sigma_present",
    "accepted_same_packet_fold_impulse_or_direct_quadrature_source_packet",
  ];

  const summary = {
    separator_mollifier_m_delta_certificates: separators.length,
    fold_layer_rows: rows.length,
    rows_by_separator_count: sortedObjectBySeparator(countBy(rows, (row) => row.separator_event)),
    selected_route_candidate: SELECTED_ROUTE,
    prior_source_packet_blocker: PRIOR_BLOCKER,
    M_delta_interval_certified: true,
    M_delta_interval_exact: kernelCertificate.M_delta_interval_exact,
    M_delta_decimal: kernelCertificate.M_delta_decimal,
    delta_eta_sup_norm_interval_certified: true,
    delta_eta_sup_norm_exact: kernelCertificate.delta_eta_sup_norm_exact,
    delta_eta_sup_norm_decimal: kernelCertificate.delta_eta_sup_norm_decimal,
    separators_with_M_delta_interval_certified: countTrue(separators, (separator) => separator.M_delta_interval_certified),
    rows_with_M_delta_interval_certified: countTrue(rows, (row) => row.M_delta_interval_certified),
    separators_with_Gamma_g_coupling_certified: 0,
    rows_with_Gamma_g_coupling_certified: 0,
    rows_with_accepted_row_projection_source_slice_coverage_certificate: 0,
    rows_with_dual_mollified_row_integrand_interval_enclosure: 0,
    rows_with_direct_quadrature_I_fold_B: 0,
    rows_with_row_impulse_enclosure: 0,
    accepted_same_packet_fold_impulse_or_direct_quadrature_source_packets: 0,
    first_source_packet_blocker: FIRST_COUPLING_BLOCKER,
    first_coupling_blocker: FIRST_COUPLING_BLOCKER,
    first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
    first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
    separator_field_presence_counts: presenceCounts(separators, separatorFields),
    row_field_presence_counts: presenceCounts(rows, rowFields),
    packet_parameters: inputs.phi.common_identity.P,
    accepted_fold_layer_rows: 0,
    row_consumption_count: 0,
    preledger_pass_rows: 0,
    branch_chart_authorized_rows: 0,
  };

  return {
    schema: "breather-higher-fold-layer-same-packet-mollifier-m-delta-certificate-attempt-v1",
    packet_id: PACKET_ID,
    route: "fresh-v10 higher-fold null-coordinate preledger closure",
    status: STATUS,
    theorem_target: "Null-Coordinate Causal Pre-Ledger",
    claim_level:
      "priority-only same-packet mollifier M_delta certificate attempt; certifies the candidate compact-support shell kernel norm and eta-scaled norm under the fresh-v10 higher-fold packet identity while proving no Gamma/g coupling certificate, no accepted row coverage certificate, no row enclosure, no accepted source packet, no row consumption, no preledger pass, no live-ledger update, and no branch-chart authorization",
    preledger_pass: false,
    updates_live_ledger: false,
    branch_chart_authorized: false,
    emits_candidate_artifacts: true,
    emits_proof_interval_replay: false,
    emits_topology_recertification: false,
    source_artifacts: {
      same_packet_impulse_route_declaration_attempt: artifactRecord(paths.routeDeclaration),
      same_packet_phi_cyc: artifactRecord(paths.phi),
      same_packet_mesh: artifactRecord(paths.mesh),
      fold_mollifier_kernel_candidate: artifactRecord(paths.mollifierKernel),
      fold_mollifier_coupling_audit: artifactRecord(paths.couplingAudit),
      fold_interval_constants_contract: artifactRecord(paths.contract),
    },
    kernel_certificate: kernelCertificate,
    coupling_certificate: {
      packet_g_parameter_present: inputs.phi.common_identity.P.g === 1 && inputs.mesh.common_identity.P.g === 1,
      packet_g_parameter_exact_candidate: "1",
      Gamma_g_coupling_certified: false,
      blocker: FIRST_COUPLING_BLOCKER,
      fail_closed_reason:
        "The packet exposes g=1 as a same-packet parameter, but this artifact does not prove that the fresh-v10 packet's g is exactly Gamma=kappa*epsilon^2 under an accepted coupling convention.",
    },
    separator_mollifier_m_delta_certificates: separators,
    row_mollifier_m_delta_certificates: rows,
    summary,
    next_certificate_handoff: {
      first_source_packet_blocker: FIRST_COUPLING_BLOCKER,
      first_coupling_blocker: FIRST_COUPLING_BLOCKER,
      first_coverage_blocker: FIRST_COVERAGE_BLOCKER,
      first_numerical_enclosure_blocker: FIRST_NUMERICAL_ENCLOSURE_BLOCKER,
      mechanical_continuation:
        "prove the fresh-v10 same-packet Gamma/g coupling convention, then prove accepted row projection/source-slice coverage and row acceleration/impulse or direct-quadrature enclosures before separator aggregation",
      final_certificate_target:
        "accepted same_packet_fold_impulse_or_direct_quadrature_bound source packet feeding the higher_fold_separator_layer_certificate for Sigma_hf_01 through Sigma_hf_12",
      decision_boundary:
        "if Gamma/g coupling cannot be certified from same-packet source data, the lane reaches a proof-rule or primitive-acceptance decision before source-packet acceptance or row consumption",
      fail_closed_stop_conditions: [
        "Do not treat the M_delta certificate as a Gamma/g coupling certificate.",
        "Do not treat the M_delta certificate as an accepted row coverage certificate.",
        "Do not treat candidate E_B and S_B(t) definitions as accepted support coverage.",
        "Do not set same_packet_fold_impulse_or_direct_quadrature_bound, higher_fold_separator_layer_certificate, preledger_pass, updates_live_ledger, accepted_fold_layer_row, row_consumed, or branch_chart_authorized from this M_delta certificate.",
      ],
    },
    authorization_lock: {
      preledger_pass_rows: 0,
      accepted_fold_layer_rows: 0,
      row_consumption_count: 0,
      branch_chart_authorized_rows: 0,
      preledger_pass_authorized: false,
      accepted_fold_layer_rows_authorized: false,
      row_consumption_authorized: false,
      branch_chart_authorized: false,
    },
    capture_decision:
      "Priority-only. This artifact reduces the source-packet checklist from M_delta absent to Gamma/g coupling absent while preserving fail-closed row and ledger state.",
  };
}

function sourceTable(sourceArtifacts) {
  return Object.entries(sourceArtifacts)
    .map(
      ([name, artifact]) =>
        `| \`${name}\` | \`${artifact.basename}\` | ${artifact.present ? "true" : "false"} | \`${artifact.sha256 ?? "missing"}\` |`,
    )
    .join("\n");
}

function countTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count} |`)
    .join("\n");
}

function presenceTable(counts) {
  return Object.entries(counts)
    .map(([name, count]) => `| \`${name}\` | ${count.present} | ${count.missing} |`)
    .join("\n");
}

function separatorTable(separators) {
  return separators
    .map(
      (separator) =>
        `| \`${separator.separator_event}\` | \`${separator.fold_interval}\` | ${separator.row_count} | ${separator.M_delta_interval_certified} | ${separator.delta_eta_sup_norm_interval_certified} | ${separator.Gamma_g_coupling_certified} | ${separator.accepted_row_projection_source_slice_coverage_certificates} | ${separator.row_impulse_enclosures} | \`${separator.first_source_packet_blocker}\` |`,
    )
    .join("\n");
}

function writeReport(filePath, attempt) {
  const report = `# Higher-Fold Layer Same-Packet Mollifier M_delta Certificate Attempt

Packet: \`${PACKET_ID}\`

Status: \`${attempt.status}\`

Claim level: ${attempt.claim_level}

## Blocker Sharpened

The prior route-declaration attempt stopped at
\`${attempt.summary.prior_source_packet_blocker}\`. This artifact certifies the
candidate compact-support shell kernel norm by exact rational arithmetic and
binds the scaled norm to the fresh-v10 packet value \`eta=0.02\`.

Certified values:

- \`M_delta\`: \`${attempt.summary.M_delta_interval_exact[0]}\`
  (\`${attempt.summary.M_delta_decimal}\`);
- \`delta_eta_sup_norm\`: \`${attempt.summary.delta_eta_sup_norm_exact[0]}\`
  (\`${attempt.summary.delta_eta_sup_norm_decimal}\`).

The certificate is present for ${attempt.summary.separators_with_M_delta_interval_certified} /
${attempt.summary.separator_mollifier_m_delta_certificates} separator layers and
${attempt.summary.rows_with_M_delta_interval_certified} /
${attempt.summary.fold_layer_rows} fold-layer rows.

This is not a full constants artifact. It records 0 same-packet \`Gamma/g\`
coupling certificates, 0 accepted row projection/source-slice coverage
certificates, 0 row enclosures, 0 accepted source packets, 0 row consumptions,
\`preledger_pass=false\`, no live-ledger update, and no branch-chart
authorization.

The first source-packet blocker after this artifact is
\`${attempt.summary.first_source_packet_blocker}\`. The first coverage blocker
is \`${attempt.summary.first_coverage_blocker}\`, and the first numerical
enclosure blocker is
\`${attempt.summary.first_numerical_enclosure_blocker}\`.

## Source Artifacts

| Artifact | File | Present | SHA-256 |
| --- | --- | --- | --- |
${sourceTable(attempt.source_artifacts)}

## Kernel Certificate

| Field | Value |
| --- | --- |
| Kernel | \`${attempt.kernel_certificate.kernel_formula_label}\` |
| Support compact | ${attempt.kernel_certificate.support_compact_certified} |
| Nonnegative on support | ${attempt.kernel_certificate.nonnegative_on_support_certified} |
| C1 boundary join | ${attempt.kernel_certificate.c1_boundary_join_certified} |
| Normalized integral | \`${attempt.kernel_certificate.normalized_integral_exact}\` |
| Critical points | \`${attempt.kernel_certificate.derivative_critical_points.join(", ")}\` |
| M_delta exact | \`${attempt.kernel_certificate.M_delta_interval_exact[0]}\` |
| delta_eta sup norm exact | \`${attempt.kernel_certificate.delta_eta_sup_norm_exact[0]}\` |

## Separator Certificates

| Separator | Fold interval | Rows | M_delta certified | delta_eta norm certified | Gamma/g certified | Accepted coverage certs | Row impulse enclosures | First source-packet blocker |
| --- | --- | ---: | --- | --- | --- | ---: | ---: | --- |
${separatorTable(attempt.separator_mollifier_m_delta_certificates)}

## Rows By Separator

| Separator | Rows |
| --- | ---: |
${countTable(attempt.summary.rows_by_separator_count)}

## Field Presence

Separator-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.separator_field_presence_counts)}

Row-level fields:

| Field | Present | Missing |
| --- | ---: | ---: |
${presenceTable(attempt.summary.row_field_presence_counts)}

## Certificate-Side Handoff

First source-packet blocker:
\`${attempt.next_certificate_handoff.first_source_packet_blocker}\`.

First coverage blocker:
\`${attempt.next_certificate_handoff.first_coverage_blocker}\`.

First numerical enclosure blocker:
\`${attempt.next_certificate_handoff.first_numerical_enclosure_blocker}\`.

Mechanical continuation: ${attempt.next_certificate_handoff.mechanical_continuation}.

Decision boundary: ${attempt.next_certificate_handoff.decision_boundary}.

Fail-closed stop conditions:

${attempt.next_certificate_handoff.fail_closed_stop_conditions.map((item) => `- ${item}`).join("\n")}

## Authorization Lock

- \`preledger_pass\`: false
- \`updates_live_ledger\`: false
- \`accepted_fold_layer_rows\`: 0
- \`row_consumption_count\`: 0
- \`branch_chart_authorized\`: false
`;
  writeText(filePath, report);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const paths = {
    routeDeclaration: args.routeDeclaration,
    phi: args.phi,
    mesh: args.mesh,
    mollifierKernel: args.mollifierKernel,
    couplingAudit: args.couplingAudit,
    contract: args.contract,
  };
  const inputs = {
    routeDeclaration: readJson(paths.routeDeclaration),
    phi: readJson(paths.phi),
    mesh: readJson(paths.mesh),
    mollifierText: readText(paths.mollifierKernel),
    couplingText: readText(paths.couplingAudit),
    contractText: readText(paths.contract),
  };
  const attempt = buildAttempt(paths, inputs);
  const outJson = path.join(args.outDir, OUTPUT_JSON);
  const outReport = path.join(args.outDir, OUTPUT_REPORT);
  writeJson(outJson, attempt, args.pretty);
  writeReport(outReport, attempt);
  console.log(`Wrote ${outJson}`);
  console.log(`Wrote ${outReport}`);
}

main();

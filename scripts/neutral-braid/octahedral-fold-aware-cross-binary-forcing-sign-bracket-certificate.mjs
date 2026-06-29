#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-topology-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_forcing_sign_bracket_certificate";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const CHECK_TOLERANCE = 1e-10;

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function signLabel(value) {
  if (value > CHECK_TOLERANCE) {
    return "+";
  }
  if (value < -CHECK_TOLERANCE) {
    return "-";
  }
  return "0";
}

function parseInterval(interval) {
  const match = /^\[([^,]+),([^\]]+)\]$/.exec(String(interval));
  if (!match) {
    throw new Error(`invalid interval string ${interval}`);
  }
  return [Number(match[1]), Number(match[2])];
}

function rowByCell(topologyAtlas, cellId) {
  const row = topologyAtlas.regular_cell_topology_rows.find(
    (entry) => entry.cell_id === cellId
  );
  if (!row) {
    throw new Error(`missing topology row ${cellId}`);
  }
  return row;
}

function evaluateSignedRow({ row_id, theta, speedRatio, rootSubdivisions }) {
  const row = evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
  return {
    row_id,
    theta: formatNumber(theta),
    forcing: formatSmallNumber(row.value),
    derivative: formatSmallNumber(row.derivative),
    forcing_sign: signLabel(row.value),
    derivative_sign: signLabel(row.derivative),
    source_root_count: row.source_root_count,
  };
}

function buildSignedRows({ topologyAtlas, speedRatio, rootSubdivisions }) {
  const i1 = rowByCell(topologyAtlas, "I1");
  const i2 = rowByCell(topologyAtlas, "I2");
  const i3 = rowByCell(topologyAtlas, "I3");
  const [i1LeftScan, i1RightScan] = parseInterval(i1.scan_interval);
  const [i2LeftScan, i2RightScan] = parseInterval(i2.scan_interval);
  const [i3LeftScan, i3RightScan] = parseInterval(i3.scan_interval);
  const i1Zero = i1.forcing_zero_rows[0];
  const i2Zero = i2.forcing_zero_rows[0];
  const i2DerivativeZero = i2.derivative_zero_rows[0];
  const thetaRows = [
    ["I1.left-scan", i1LeftScan],
    ["I1.f1.left", Number(i1Zero.bracket_left)],
    ["I1.f1", Number(i1Zero.theta)],
    ["I1.f1.right", Number(i1Zero.bracket_right)],
    ["I1.right-scan", i1RightScan],
    ["I2.left-scan", i2LeftScan],
    ["I2.d1.left", Number(i2DerivativeZero.bracket_left)],
    ["I2.d1", Number(i2DerivativeZero.theta)],
    ["I2.d1.right", Number(i2DerivativeZero.bracket_right)],
    ["I2.f1.left", Number(i2Zero.bracket_left)],
    ["I2.f1", Number(i2Zero.theta)],
    ["I2.f1.right", Number(i2Zero.bracket_right)],
    ["I2.right-scan", i2RightScan],
    ["I3.left-scan", i3LeftScan],
    ["I3.right-scan", i3RightScan],
  ];
  return thetaRows.map(([row_id, theta]) =>
    evaluateSignedRow({ row_id, theta, speedRatio, rootSubdivisions })
  );
}

function rowById(rows, rowId) {
  const row = rows.find((entry) => entry.row_id === rowId);
  if (!row) {
    throw new Error(`missing signed row ${rowId}`);
  }
  return row;
}

function buildSignBracketSummary(rows) {
  const i1Left = rowById(rows, "I1.f1.left");
  const i1Root = rowById(rows, "I1.f1");
  const i1Right = rowById(rows, "I1.f1.right");
  const i2DLeft = rowById(rows, "I2.d1.left");
  const i2DRoot = rowById(rows, "I2.d1");
  const i2DRight = rowById(rows, "I2.d1.right");
  const i2Left = rowById(rows, "I2.f1.left");
  const i2Root = rowById(rows, "I2.f1");
  const i2Right = rowById(rows, "I2.f1.right");
  const i3Left = rowById(rows, "I3.left-scan");
  const i3Right = rowById(rows, "I3.right-scan");

  return {
    I1_forcing_bracket_signs:
      `${i1Left.forcing_sign}/${i1Right.forcing_sign}`,
    I1_regular_zero_derivative_sign: i1Root.derivative_sign,
    I2_derivative_bracket_signs:
      `${i2DLeft.derivative_sign}/${i2DRight.derivative_sign}`,
    I2_derivative_turn_forcing_sign: i2DRoot.forcing_sign,
    I2_forcing_bracket_signs:
      `${i2Left.forcing_sign}/${i2Right.forcing_sign}`,
    I2_regular_zero_derivative_sign: i2Root.derivative_sign,
    I2_derivative_turn_before_forcing_zero:
      Number(i2DRoot.theta) < Number(i2Root.theta),
    I3_endpoint_forcing_signs:
      `${i3Left.forcing_sign}/${i3Right.forcing_sign}`,
    I3_endpoint_derivative_signs:
      `${i3Left.derivative_sign}/${i3Right.derivative_sign}`,
    status:
      i1Left.forcing_sign === "+" &&
      i1Right.forcing_sign === "-" &&
      i1Root.derivative_sign === "-" &&
      i2DLeft.derivative_sign === "+" &&
      i2DRight.derivative_sign === "-" &&
      i2DRoot.forcing_sign === "+" &&
      Number(i2DRoot.theta) < Number(i2Root.theta) &&
      i2Left.forcing_sign === "+" &&
      i2Right.forcing_sign === "-" &&
      i2Root.derivative_sign === "-" &&
      i3Left.forcing_sign === "-" &&
      i3Right.forcing_sign === "-" &&
      i3Left.derivative_sign === "+" &&
      i3Right.derivative_sign === "+"
        ? "sampled-forcing-sign-brackets-certified"
        : "sampled-forcing-sign-brackets-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const scanSamplesPerCell = Number.parseInt(
    options.scanSamplesPerCell ?? DEFAULT_SCAN_SAMPLES_PER_CELL,
    10
  );
  const topologySamplesPerCell = Number.parseInt(
    options.topologySamplesPerCell ?? DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    10
  );
  const derivativeSamplesPerCell = Number.parseInt(
    options.derivativeSamplesPerCell ?? DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (!Number.isInteger(scanSamplesPerCell) || scanSamplesPerCell < 16) {
    throw new Error("scanSamplesPerCell must be an integer >= 16");
  }
  if (!Number.isInteger(topologySamplesPerCell) || topologySamplesPerCell < 16) {
    throw new Error("topologySamplesPerCell must be an integer >= 16");
  }
  if (
    !Number.isInteger(derivativeSamplesPerCell) ||
    derivativeSamplesPerCell < 4
  ) {
    throw new Error("derivativeSamplesPerCell must be an integer >= 4");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }

  const topologyAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingTopologyAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      sourceQuadraturePanelsPerSegment,
      derivativeSamplesPerCell,
      topologySamplesPerCell,
    });
  const topologyErrors =
    validateOctahedralFoldAwareCrossBinaryForcingTopologyAtlas(topologyAtlas);
  const speedRatio = Number(topologyAtlas.topology_parameters.speed_ratio_estimate);
  const signedRows = buildSignedRows({
    topologyAtlas,
    speedRatio,
    rootSubdivisions,
  });
  const signBracketSummary = buildSignBracketSummary(signedRows);
  const certificatePassed =
    topologyErrors.length === 0 &&
    signBracketSummary.status === "sampled-forcing-sign-brackets-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-topology-atlas.md",
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.md",
    source_forcing_topology_atlas_check: {
      schema: topologyAtlas.schema,
      valid: topologyErrors.length === 0,
      errors: topologyErrors,
      theory_status: topologyAtlas.result.theory_status,
      retained_branch: topologyAtlas.result.retained_branch,
      sampled_forcing_topology_certified:
        topologyAtlas.artifact_claim.certifies_sampled_regular_cell_forcing_topology ===
        true,
      certifies_interval_critical_exhaustion:
        topologyAtlas.artifact_claim.certifies_interval_critical_exhaustion ===
        true,
    },
    certificate_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      speed_constraint:
        "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
      speed_ratio_estimate:
        topologyAtlas.topology_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        topologyAtlas.topology_parameters.speed_ratio_enclosure,
    },
    sign_bracket_rule: {
      regular_cell_forcing: "A'(u)=f_cross(u)",
      regular_cell_curvature: "A''(u)=f'_cross(u)",
      certificate_statement:
        "explicit signed brackets for two forcing zeros and one derivative turning row, plus sampled transversality at the forcing zeros",
      fold_boundary_rule:
        "do not apply the regular derivative formula at fold endpoints; fold.3- and fold.2+ remain square-coordinate endpoint rows",
      status: "sampled-forcing-sign-bracket-rule-stated",
    },
    signed_witness_rows: signedRows,
    sign_bracket_summary: signBracketSummary,
    topology_candidate_set: topologyAtlas.topology_candidate_set,
    interval_profile_boundary: {
      certifies_sampled_sign_brackets: certificatePassed,
      certifies_sampled_transversality_rows: certificatePassed,
      certifies_sampled_derivative_turn_order: certificatePassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "hidden-zero exclusion between signed witness rows",
        "outward-rounded derivative sign enclosures on topology subcells",
        "interval Newton or equivalent exclusion outside the signed brackets",
      ],
      next_interval_task:
        "upgrade these signed witness rows to interval sign enclosures and use them in the finite-candidate reduction",
      status: "forcing-sign-bracket-interval-exhaustion-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_sampled_forcing_topology_atlas:
        topologyAtlas.artifact_claim.certifies_sampled_regular_cell_forcing_topology ===
        true,
      certifies_sampled_forcing_sign_brackets: certificatePassed,
      certifies_sampled_transversality_rows: certificatePassed,
      certifies_sampled_derivative_turn_order: certificatePassed,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_fold_limit_enclosure: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "sampled source-atlas-aware sign brackets and transversality witnesses for the representative cross-binary quarter profile; hidden-zero exclusion, interval derivative enclosure, interval quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certificatePassed
        ? "sampled-source-atlas-aware-forcing-sign-bracket-certificate-certified"
        : "source-atlas-aware-forcing-sign-bracket-certificate-open",
      first_successor_row:
        "source-atlas-aware-finite-candidate-reduction-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The forcing-topology rows now have explicit signed witness brackets for the two regular forcing zeros and the single derivative turning row. This proves bracketed existence and sampled transversality, but it does not prove uniqueness or hidden-zero exclusion.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA,
    "schema must match forcing sign bracket certificate schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match forcing sign bracket certificate packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_forcing_topology_atlas_check?.valid === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.sampled_forcing_topology_certified === true &&
      artifact?.source_forcing_topology_atlas_check
        ?.certifies_interval_critical_exhaustion === false,
    "source forcing topology atlas must validate without interval critical exhaustion",
    errors
  );
  assertField(
    artifact?.certificate_parameters?.speed_constraint ===
      "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only",
    "forcing sign bracket certificate must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.sign_bracket_rule?.regular_cell_forcing ===
      "A'(u)=f_cross(u)" &&
      artifact?.sign_bracket_rule?.regular_cell_curvature ===
        "A''(u)=f'_cross(u)" &&
      artifact?.sign_bracket_rule?.status ===
        "sampled-forcing-sign-bracket-rule-stated",
    "forcing sign bracket certificate must state the forcing/curvature rule",
    errors
  );
  assertField(
    Array.isArray(artifact?.signed_witness_rows) &&
      artifact.signed_witness_rows.length === 15,
    "forcing sign bracket certificate must emit fifteen signed witness rows",
    errors
  );
  assertField(
    artifact?.sign_bracket_summary?.I1_forcing_bracket_signs === "+/-" &&
      artifact?.sign_bracket_summary?.I1_regular_zero_derivative_sign === "-" &&
      artifact?.sign_bracket_summary?.I2_derivative_bracket_signs === "+/-" &&
      artifact?.sign_bracket_summary?.I2_derivative_turn_forcing_sign === "+" &&
      artifact?.sign_bracket_summary?.I2_forcing_bracket_signs === "+/-" &&
      artifact?.sign_bracket_summary?.I2_regular_zero_derivative_sign === "-" &&
      artifact?.sign_bracket_summary?.I2_derivative_turn_before_forcing_zero ===
        true &&
      artifact?.sign_bracket_summary?.I3_endpoint_forcing_signs === "-/-" &&
      artifact?.sign_bracket_summary?.I3_endpoint_derivative_signs === "+/+" &&
      artifact?.sign_bracket_summary?.status ===
        "sampled-forcing-sign-brackets-certified",
    "forcing sign bracket certificate must certify the sampled sign brackets and derivative-turn order",
    errors
  );
  assertField(
    artifact?.topology_candidate_set?.candidate_count === 6 &&
      artifact?.topology_candidate_set?.status ===
        "sampled-primitive-candidate-set-recovered-from-topology",
    "forcing sign bracket certificate must preserve the six topology candidates",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_sampled_forcing_sign_brackets === true &&
      artifact?.artifact_claim?.certifies_sampled_transversality_rows === true &&
      artifact?.artifact_claim?.certifies_sampled_derivative_turn_order === true &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.certifies_C_m_Q_M_Q_interval_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_cross_binary_coarea_interval_profile ===
        false &&
      artifact?.artifact_claim?.certifies_representative_interval_profile === false &&
      artifact?.artifact_claim?.certifies_receiver_orbit_interval_clock_length_return ===
        false &&
      artifact?.artifact_claim?.certifies_bounded_speed_live_ledger === false,
    "artifact must certify only sampled sign brackets and leave interval/live-ledger rows open",
    errors
  );
  assertField(
    artifact?.artifact_claim?.retained_branch === false &&
      artifact?.result?.retained_branch === false &&
      artifact?.result?.retention === "not_retained",
    "artifact must not claim retained branch status",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --subdivisions <n>                 Root search subdivisions (default: 5000)",
    "  --out <path>                       Write artifact JSON to path instead of stdout",
    "  --validate <path>                  Validate an existing artifact JSON file",
    "  --schema                           Print the artifact schema identifier",
    "  --pretty                           Pretty-print JSON output",
    "  --help                             Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    topologySamplesPerCell: DEFAULT_TOPOLOGY_SAMPLES_PER_CELL,
    derivativeSamplesPerCell: DEFAULT_DERIVATIVE_SAMPLES_PER_CELL,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[(index += 1)];
    } else if (arg === "--validate") {
      args.validate = argv[(index += 1)];
    } else if (arg === "--topology-samples-per-cell") {
      args.topologySamplesPerCell = argv[(index += 1)];
    } else if (arg === "--derivative-samples-per-cell") {
      args.derivativeSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--subdivisions") {
      args.rootSubdivisions = argv[(index += 1)];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  if (args.schema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
        artifact
      );
    if (errors.length > 0) {
      for (const error of errors) {
        console.error(error);
      }
      process.exitCode = 1;
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(args);
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

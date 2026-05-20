#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const OUTPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1";
const DEFAULT_OUT =
  "reference/priorities/proof-programs/breather-proof/certificate/gap_opening_live_fold_shear_input.seed_cosine_residuals.v0.json";

const sigma1 = 0.14758361765;
const sigma2 = 0.35241638235;

const arcs = [
  { id: "A0", theta_range: [0, sigma1], basis: "h_A0" },
  { id: "A1", theta_range: [sigma1, sigma2], basis: "h_A1" },
  { id: "A2", theta_range: [sigma2, 0.5], basis: "h_A2" },
];

const residualCollars = [
  {
    id: "R_w_A1_A0_receiver_left",
    collar_id: "R_w_A1_A0/receiver_left",
    ledger: "w",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.16053667564933, 0.170709367399],
    source_theta: [0.125869003963, 0.13508361765],
    overlap_y: [1.66990249769, 1.674902497689],
  },
  {
    id: "R_w_A1_A0_source_left",
    collar_id: "R_w_A1_A0/source_left",
    ledger: "w",
    residual_type: "endpoint_scale_overlap",
    receiver_theta: [0.339916382346199, 0.33991638235],
    source_theta: [0.041038833439689, 0.04103883344],
    overlap_width: 1.3318235403403378e-12,
  },
  {
    id: "R_w_A2_A0_receiver_right",
    collar_id: "R_w_A2_A0/receiver_right",
    ledger: "w",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.457747116028, 0.458923441955692],
    source_theta: [0.125869003963, 0.13508361765],
    overlap_y: [1.66990249769, 1.674902497689],
  },
  {
    id: "R_w_A2_A1_receiver_left",
    collar_id: "R_w_A2_A1/receiver_left",
    ledger: "w",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.36491638235, 0.373898811563],
    source_theta: [0.329553995645, 0.33946332435067],
    overlap_y: [1.4666901559, 1.471528714676],
  },
  {
    id: "R_w_A2_A1_receiver_right",
    collar_id: "R_w_A2_A1/receiver_right",
    ledger: "w",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.457785341387, 0.458961166560311],
    source_theta: [0.16008361765, 0.170446004355],
    overlap_y: [1.670063938913, 1.675063938914],
  },
  {
    id: "R_u_A3_A2_receiver_left",
    collar_id: "R_u_A3_A2/receiver_left",
    ledger: "u",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.660536675649329, 0.670709367399],
    source_theta: [0.625869003962779, 0.63508361765],
    overlap_width: 0.005,
  },
  {
    id: "R_u_A3_A2_source_left",
    collar_id: "R_u_A3_A2/source_left",
    ledger: "u",
    residual_type: "endpoint_scale_overlap",
    receiver_theta: [0.839916382346198, 0.83991638235],
    source_theta: [0.541038833439689, 0.54103883344],
    overlap_width: 1.3318235403403378e-12,
  },
  {
    id: "R_u_A4_A2_receiver_right",
    collar_id: "R_u_A4_A2/receiver_right",
    ledger: "u",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.957747116028, 0.958923441955692],
    source_theta: [0.625869003963346, 0.63508361765],
    overlap_width: 0.005,
  },
  {
    id: "R_u_A4_A2_source_right",
    collar_id: "R_u_A4_A2/source_right",
    ledger: "u",
    residual_type: "endpoint_scale_overlap",
    receiver_theta: [0.957747116027943, 0.957747116028],
    source_theta: [0.625869003963, 0.625869003963346],
    overlap_width: 2.42e-13,
  },
  {
    id: "R_u_A4_A3_receiver_left",
    collar_id: "R_u_A4_A3/receiver_left",
    ledger: "u",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.86491638235, 0.873898811563],
    source_theta: [0.829553995645058, 0.839463324350671],
    overlap_width: 0.004838558776,
  },
  {
    id: "R_u_A4_A3_receiver_right",
    collar_id: "R_u_A4_A3/receiver_right",
    ledger: "u",
    residual_type: "positive_width_overlap",
    receiver_theta: [0.957785341387, 0.958961166560311],
    source_theta: [0.66008361765, 0.670446004354903],
    overlap_width: 0.005,
  },
];

function parseArgs(argv) {
  const args = {
    out: DEFAULT_OUT,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/fold-shear-gap-matrix-builder.mjs [options]

Options:
  --out PATH   Write the generated scanner input JSON. Defaults to ${DEFAULT_OUT}.
  --pretty     Pretty-print JSON.
  --help       Show this help.`);
}

function firstHalfTheta(theta) {
  return theta >= 0.5 ? theta - 0.5 : theta;
}

function mirrorSign(theta) {
  return theta >= 0.5 ? -1 : 1;
}

function smoothArcBump(theta, arc) {
  const localTheta = firstHalfTheta(theta);
  const [left, right] = arc.theta_range;
  if (localTheta < left || localTheta > right) {
    return 0;
  }
  const s = (localTheta - left) / (right - left);
  return Math.sin(Math.PI * s) ** 2;
}

function hBasisValue(theta, basisId) {
  const arc = arcs.find((entry) => entry.basis === basisId);
  if (!arc) {
    throw new Error(`Unknown basis id: ${basisId}`);
  }
  return mirrorSign(theta) * smoothArcBump(theta, arc);
}

function deltaYBasisValue(ledger, theta, basisId) {
  const sign = ledger === "w" ? 1 : -1;
  return sign * hBasisValue(theta, basisId);
}

function minEndpointDifference(collar, valueAt) {
  let minimum = Infinity;
  for (const sourceTheta of collar.source_theta) {
    for (const receiverTheta of collar.receiver_theta) {
      const value = valueAt(sourceTheta) - valueAt(receiverTheta);
      if (value < minimum) {
        minimum = value;
      }
    }
  }
  return minimum;
}

function cleanNumber(value) {
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(15));
}

function coefficientsForCollar(collar) {
  const coefficients = {
    b_T: cleanNumber(minEndpointDifference(collar, (theta) => theta)),
  };
  for (const arc of arcs) {
    coefficients[arc.basis] = cleanNumber(
      minEndpointDifference(collar, (theta) => deltaYBasisValue(collar.ledger, theta, arc.basis))
    );
  }
  return coefficients;
}

function requiredMarginForCollar(collar) {
  if (Number.isFinite(collar.overlap_width)) {
    return cleanNumber(collar.overlap_width);
  }
  if (Array.isArray(collar.overlap_y) && collar.overlap_y.length === 2) {
    return cleanNumber(collar.overlap_y[1] - collar.overlap_y[0]);
  }
  return 0;
}

function buildInput() {
  return {
    schema: OUTPUT_SCHEMA,
    packet_id: "seed-cosine-live-fold-shear-matrix-v0",
    packet_identity: {
      source_packet: "seed-doubled-four-arc-cosine-template-v0",
      matrix_status: "live_local_tangent_matrix_not_full_candidate",
      basis_model: "half_period_antisymmetric_c1_arc_bumps",
    },
    source:
      "Residual parent-complement collars from the rejected cosine packet, evaluated against actual half-period-antisymmetric C1 shear basis functions on A0, A1, and A2.",
    claim_limits: {
      claims_breather: false,
      claims_preledger_pass: false,
      claims_branch_chart_authorization: false,
      claims_interval_certification: false,
      claims_live_candidate: false,
      claims_full_structural_jacobian: false,
    },
    basis_definition: {
      first_half_arcs: arcs,
      formula:
        "psi_Aj(theta)=sin(pi*(theta-L_j)/(R_j-L_j))^2 on arc A_j and 0 outside; H(theta+1/2)=-H(theta).",
      built_in_tangencies: [
        "half-period antisymmetry",
        "periodic seam displacement continuity",
        "zero displacement at theta=0 and theta=1/2",
        "C1 zero displacement and slope at separator-support endpoints",
      ],
      gap_orientation: "source_minus_receiver",
      endpoint_extrema_note:
        "Rows use endpoint minima for the listed monotone collar intervals; this is a finite tangent matrix, not outward-rounded interval certification.",
    },
    variables: [
      {
        id: "b_T",
        meaning: "period tangent column, fixed to zero in this local shear matrix",
      },
      ...arcs.map((arc) => ({
        id: arc.basis,
        meaning: `C1 ${arc.id} arc bump shear, extended by H(theta+1/2)=-H(theta)`,
      })),
    ],
    structural_constraints: [
      {
        id: "fixed_period_tangent",
        coefficients: {
          b_T: 1,
        },
        target: 0,
        meaning: "This first live local matrix tests shape shears with fixed period.",
      },
    ],
    gap_constraints: residualCollars.map((collar) => ({
      ...collar,
      orientation: "source_minus_receiver",
      coefficients: coefficientsForCollar(collar),
      required_margin: requiredMarginForCollar(collar),
    })),
    non_overlap_uncertified_rows: [
      {
        id: "R_w_A2_A0_source_left",
        ledger: "w",
        diagnostic_gap: 1.3171685964152857e-12,
        reason_excluded:
          "Non-overlap appears only at endpoint scale and was not accepted after outward rounding.",
      },
      {
        id: "R_u_A4_A2_source_left",
        ledger: "u",
        diagnostic_gap: 1e-12,
        reason_excluded:
          "Endpoint-scale diagnostic separation was not accepted after outward rounding.",
      },
    ],
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const outputPath = path.resolve(args.out);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(buildInput(), null, args.pretty ? 2 : 0)}\n`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

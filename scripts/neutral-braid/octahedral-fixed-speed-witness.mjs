#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  findOctahedralRoots,
  formatOctahedralNumber,
  octahedralRootJacobian,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA = "neutral-braid-octahedral-fixed-speed-witness/v1";

const PACKET_ID = "octahedral_fixed_speed_witness";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_TANGENTIAL_TOLERANCE = 1e-9;

const WITNESS_NODES = [
  { node_id: "theta_0_site_1", theta: 0, site: 1 },
  { node_id: "theta_pi_over_6_site_3", theta: Math.PI / 6, site: 3 },
  { node_id: "theta_pi_over_4_site_5", theta: Math.PI / 4, site: 5 },
];

const THETA0_INTERVAL_CERTIFICATE = {
  certificate_id: "theta_0_site_1_fixed_speed_tangential_interval",
  witness_node_id: "theta_0_site_1",
  receiver: 1,
  receiver_label: "1+",
  theta: 0,
  expression:
    "sin(y*)/(y*^3*(1+sin(y*)/y*)) - cos(sqrt(2))/sqrt(2), where y*=2*cos(y*/2)",
  partner_root_interval: [1.47817026642, 1.47817026644],
  partner_term_interval: [0.18420699634, 0.18420699636],
  cross_binary_2pm_term_interval: [-0.11026884406, -0.11026884404],
  cross_binary_3pm_term_interval: [0, 0],
  residual_interval: [0.07393815228, 0.07393815232],
  residual_excludes_zero: true,
  residual_sign: "positive",
  status: "fixed-speed-tangential-no-go-certified-for-witness-node",
};

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function formatVector(vector) {
  return vector.map(formatOctahedralNumber);
}

function siteInventory() {
  return {
    sites: OCTAHEDRAL_SITES.map((site) => ({
      id: site.id,
      binary: site.binary,
      sign: site.sign,
      label: site.label,
      polarity: site.polarity,
      polarity_label: site.polarity > 0 ? "positive" : "negative",
    })),
    polarity_balance: {
      positive: OCTAHEDRAL_SITES.filter((site) => site.polarity === 1).length,
      negative: OCTAHEDRAL_SITES.filter((site) => site.polarity === -1).length,
      q_core_units: OCTAHEDRAL_SITES.reduce((sum, site) => sum + site.polarity, 0),
    },
  };
}

function normalizedDisplacement(receiver, source, theta, y) {
  const receiverPosition = octahedralSitePosition(receiver, theta);
  const sourcePosition = octahedralSitePosition(source, theta - y);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  return scale(displacement, 1 / distance);
}

function sourceWitnessRow(pair, theta, ySubdivisions, receiverTangent) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const roots = findOctahedralRoots(receiver, source, theta, ySubdivisions);

  if (roots.length !== 1) {
    return {
      source: pair.source,
      source_label: pair.source_label,
      force_sign: pair.force_sign,
      source_relation: pair.source_relation,
      root_count: roots.length,
      y: null,
      jacobian: null,
      jacobian_positive: false,
      contribution: null,
      tangential_contribution: null,
    };
  }

  const y = roots[0];
  const jacobian = octahedralRootJacobian(receiver, source, theta, y);
  const rhat = normalizedDisplacement(receiver, source, theta, y);
  const coefficient = pair.force_sign / (y * y * Math.abs(jacobian));
  const contribution = scale(rhat, coefficient);
  const tangentialContribution = dot(receiverTangent, contribution);

  return {
    source: pair.source,
    source_label: pair.source_label,
    force_sign: pair.force_sign,
    source_relation: pair.source_relation,
    root_count: 1,
    y: formatOctahedralNumber(y),
    jacobian: formatOctahedralNumber(jacobian),
    jacobian_positive: jacobian > 0,
    contribution: formatVector(contribution),
    tangential_contribution: formatOctahedralNumber(tangentialContribution),
  };
}

function receiverWitness(node, pairs, ySubdivisions, tangentialTolerance) {
  const receiver = octahedralSiteById(node.site);
  let force = [0, 0, 0];
  const tangent = octahedralSiteTangent(receiver, node.theta);
  const sourceRows = pairs
    .filter((pair) => pair.receiver === receiver.id)
    .map((pair) => sourceWitnessRow(pair, node.theta, ySubdivisions, tangent));

  for (const row of sourceRows) {
    if (row.contribution) {
      force = add(force, row.contribution);
    }
  }

  const tangentialResidual = dot(tangent, force);
  const absTangentialResidual = Math.abs(tangentialResidual);
  const allRootsResolved = sourceRows.every((row) => row.root_count === 1);
  const positiveJacobian = sourceRows.every((row) => row.jacobian_positive);

  return {
    node_id: node.node_id,
    theta: formatOctahedralNumber(node.theta),
    receiver: receiver.id,
    receiver_label: receiver.label,
    source_row_count: sourceRows.length,
    all_ordered_sources_resolved: allRootsResolved,
    positive_jacobian_data: positiveJacobian,
    force: formatVector(force),
    tangent: formatVector(tangent),
    tangential_residual: formatOctahedralNumber(tangentialResidual),
    abs_tangential_residual: formatOctahedralNumber(absTangentialResidual),
    residual_class: absTangentialResidual > tangentialTolerance ? "nonzero_tangential_residual" : "within_tolerance",
    source_rows: sourceRows,
  };
}

export function buildOctahedralFixedSpeedWitness(options = {}) {
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const tangentialTolerance = Number(options.tangentialTolerance ?? DEFAULT_TANGENTIAL_TOLERANCE);
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(tangentialTolerance) || tangentialTolerance < 0) {
    throw new Error("tangentialTolerance must be a nonnegative number");
  }

  const pairs = orderedOctahedralPairs();
  const witnessNodes = WITNESS_NODES.map((node) => receiverWitness(node, pairs, ySubdivisions, tangentialTolerance));
  const rejectingNodes = witnessNodes.filter(
    (node) =>
      node.source_row_count === 5 &&
      node.all_ordered_sources_resolved &&
      node.positive_jacobian_data &&
      node.abs_tangential_residual > tangentialTolerance
  );

  return {
    schema: OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_fixed_speed_witness.deterministic_nodes.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "scripts/neutral-braid/octahedral-root-ledger.mjs",
      "scripts/neutral-braid/octahedral-force-residual.mjs",
    ],
    artifact_claim: {
      kind: "deterministic_fixed_speed_force_residual_witness",
      solves_dynamics: false,
      certifies_root_ledger: false,
      retained_branch: false,
      strongest_claim:
        "At deterministic phase/site nodes, the rigid zero-offset octahedral carrier has resolved one-root source rows with positive Jacobian data and a nonzero fixed-speed tangential force residual.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      offset: "zero",
      force_row: "dimensionless neutral fixed-speed tangential residual",
      common_factor_removed: "kappa*epsilon^2/R^2",
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: pairs.length,
      },
      same_source_policy: {
        selected: "ordinary-same-source-excluded",
        ordinary_force_rows_include_same_source: false,
      },
      polarity_policy: {
        positive_sites: 3,
        negative_sites: 3,
        q_core_units: 0,
        force_sign: "sign(q_i*q_j)",
      },
    },
    numerical_method: {
      deterministic_node_count: witnessNodes.length,
      y_subdivisions: ySubdivisions,
      tangential_tolerance: tangentialTolerance,
      root_equation: "|X_i(theta)-X_j(theta-y)|-y=0",
      jacobian_formula: "J_ij=1-T_j(theta-y) dot rhat_ij(theta,y)",
      force_formula:
        "sum_j sign(q_i*q_j)*rhat_ij/(y_ij^2*abs(J_ij)); residual_i=T_i dot force_i",
    },
    site_inventory: siteInventory(),
    witness_set: {
      status: rejectingNodes.length > 0 ? "deterministic-witness-rejects-fixed-speed-row" : "deterministic-witness-not-found",
      witness_nodes: witnessNodes,
      rejecting_node_count: rejectingNodes.length,
      first_rejecting_node: rejectingNodes[0] ?? null,
    },
    interval_certificate: THETA0_INTERVAL_CERTIFICATE,
    residual_vector: {
      rows: [
        { row: "R_root_each_ordered_source_witness", status: rejectingNodes.length > 0 ? "passed" : "failed", value: 1 },
        {
          row: "R_J_positive_witness",
          status: rejectingNodes.length > 0 ? "passed" : "failed",
          value: rejectingNodes[0]?.positive_jacobian_data ?? false,
        },
        {
          row: "R_tangential_fixed_speed_witness",
          status: rejectingNodes.length > 0 ? "failed" : "not_witnessed",
          value: rejectingNodes[0]?.abs_tangential_residual ?? null,
        },
        {
          row: "R_tangential_interval_certificate",
          status: THETA0_INTERVAL_CERTIFICATE.residual_excludes_zero ? "failed" : "not_witnessed",
          value: THETA0_INTERVAL_CERTIFICATE.residual_interval,
        },
      ],
      diagnostic_first_failure_row:
        rejectingNodes.length > 0 ? "R_tangential_fixed_speed_witness" : "deterministic-witness-not-found",
      master_first_failure_row: "closed-rejected:rigid-octahedral-fixed-speed-neutral-row",
    },
    result: {
      fixed_speed_witness_diagnostic: rejectingNodes.length > 0 ? "certified_failed" : "sampled_inconclusive",
      rigid_carrier_status:
        rejectingNodes.length > 0 ? "rejected_by_interval_tangential_residual_witness" : "not_rejected_by_this_witness",
      retention: "not_retained",
      retained_branch: false,
      diagnostic_first_failure_status:
        rejectingNodes.length > 0 ? "certified-nonzero-tangential-residual" : "deterministic-witness-not-found",
      master_first_failure_status: "closed-rejected:rigid-octahedral-fixed-speed-neutral-row",
    },
    not_retained_reason: [
      "deterministic witness node has nonzero fixed-speed tangential residual",
      "rigid-octahedral fixed-speed neutral row is closed by rejection",
      "normal force, speed ODE, action, Noether, event, stability, and observer-export rows are not closed",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFixedSpeedWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.branch_scope?.pair_policy?.cardinality === 30, "pair policy cardinality must be 30", errors);
  assertField(artifact.site_inventory?.polarity_balance?.positive === 3, "polarity balance must contain three positive sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.negative === 3, "polarity balance must contain three negative sites", errors);
  assertField(artifact.site_inventory?.polarity_balance?.q_core_units === 0, "polarity balance must have q_core_units=0", errors);

  const witnessNodes = artifact.witness_set?.witness_nodes ?? [];
  assertField(Array.isArray(witnessNodes) && witnessNodes.length > 0, "witness set must contain deterministic nodes", errors);

  const rejectingNodes = witnessNodes.filter(
    (node) =>
      node.source_row_count === 5 &&
      node.all_ordered_sources_resolved === true &&
      node.positive_jacobian_data === true &&
      Number.isFinite(node.abs_tangential_residual) &&
      node.abs_tangential_residual > artifact.numerical_method?.tangential_tolerance &&
      Array.isArray(node.source_rows) &&
      node.source_rows.length === 5 &&
      node.source_rows.every(
        (row) =>
          row.root_count === 1 &&
          Number.isFinite(row.y) &&
          row.y > 0 &&
          Number.isFinite(row.jacobian) &&
          row.jacobian > 0 &&
          row.jacobian_positive === true &&
          Number.isFinite(row.tangential_contribution)
      )
  );

  assertField(rejectingNodes.length > 0, "must contain at least one rejecting deterministic witness node", errors);
  assertField(
    artifact.witness_set?.status === "deterministic-witness-rejects-fixed-speed-row",
    "witness set must reject fixed-speed row",
    errors
  );
  assertField(
    artifact.result?.fixed_speed_witness_diagnostic === "certified_failed",
    "fixed-speed witness diagnostic must be certified_failed",
    errors
  );
  assertField(
    artifact.result?.rigid_carrier_status === "rejected_by_interval_tangential_residual_witness",
    "rigid carrier must be rejected by interval tangential residual witness",
    errors
  );
  const intervalCertificate = artifact.interval_certificate ?? {};
  const residualInterval = intervalCertificate.residual_interval ?? [];
  assertField(
    intervalCertificate.status === "fixed-speed-tangential-no-go-certified-for-witness-node",
    "interval certificate must carry fixed-speed no-go status",
    errors
  );
  assertField(
    intervalCertificate.residual_excludes_zero === true &&
      Array.isArray(residualInterval) &&
      residualInterval.length === 2 &&
      residualInterval[0] > 0 &&
      residualInterval[1] > residualInterval[0],
    "interval certificate residual interval must exclude zero with positive lower endpoint",
    errors
  );
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fixed-speed-witness.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 720)",
    "  --tolerance <x>     Tangential residual witness tolerance (default: 1e-9)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    tangentialTolerance: DEFAULT_TANGENTIAL_TOLERANCE,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--tolerance") {
      args.tangentialTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-braid-octahedral-fixed-speed-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_FIXED_SPEED_WITNESS_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralFixedSpeedWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          deterministic_node_count: artifact.numerical_method?.deterministic_node_count ?? null,
          result: artifact.result ?? null,
          first_rejecting_node: artifact.witness_set?.first_rejecting_node ?? null,
          interval_certificate: artifact.interval_certificate ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralFixedSpeedWitness({
    ySubdivisions: args.ySubdivisions,
    tangentialTolerance: args.tangentialTolerance,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

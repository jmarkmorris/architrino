#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildOctahedralFixedSpeedWitness } from "./octahedral-fixed-speed-witness.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA =
  "neutral-swarm-octahedral-root-force-closure-witness/v1";

const PACKET_ID = "octahedral_root_force_closure_witness";
const PROMOTION_STATUS = "priority-only";
const CLOSURE_STATUS = "closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure";

function firstRejectingNode(fixedSpeedWitness) {
  return fixedSpeedWitness.witness_set?.first_rejecting_node ?? null;
}

function firstRejectingInterval(fixedSpeedWitness, node) {
  const certificate = fixedSpeedWitness.interval_certificate ?? {};
  return {
    consumed_from: "scripts/neutral-swarm/octahedral-fixed-speed-witness.mjs",
    certificate_id: certificate.certificate_id ?? null,
    witness_node_id: certificate.witness_node_id ?? node?.node_id ?? null,
    receiver: certificate.receiver ?? node?.receiver ?? null,
    receiver_label: certificate.receiver_label ?? node?.receiver_label ?? null,
    theta: certificate.theta ?? node?.theta ?? null,
    residual_interval: certificate.residual_interval ?? null,
    residual_excludes_zero: certificate.residual_excludes_zero ?? false,
    residual_sign: certificate.residual_sign ?? null,
    interval_certificate_status: certificate.status ?? null,
    expression: certificate.expression ?? null,
  };
}

export function buildOctahedralRootForceClosureWitness(options = {}) {
  const fixedSpeedWitness = buildOctahedralFixedSpeedWitness(options);
  const node = firstRejectingNode(fixedSpeedWitness);
  const sourceRows = node?.source_rows ?? [];
  const allResolvedPositiveRows =
    sourceRows.length === 5 &&
    sourceRows.every(
      (row) =>
        row.root_count === 1 &&
        Number.isFinite(row.y) &&
        row.y > 0 &&
        Number.isFinite(row.jacobian) &&
        row.jacobian > 0 &&
        row.jacobian_positive === true
    );
  const interval = firstRejectingInterval(fixedSpeedWitness, node);
  const residualRejectsClosure =
    allResolvedPositiveRows === true &&
    interval.residual_excludes_zero === true &&
    Array.isArray(interval.residual_interval) &&
    interval.residual_interval.length === 2 &&
    (interval.residual_interval[1] < 0 || interval.residual_interval[0] > 0);

  return {
    schema: OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_swarm_octahedral_root_force_closure_witness.narrow_no_go.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "scripts/neutral-swarm/octahedral-root-ledger.mjs",
      "scripts/neutral-swarm/octahedral-fixed-speed-witness.mjs",
    ],
    artifact_claim: {
      kind: "narrow_resolved_root_force_closure_no_go_witness",
      hypothesis:
        "Resolved positive-delay source roots with positive Jacobian data imply fixed-speed force closure.",
      solves_dynamics: false,
      retained_branch: false,
      strongest_claim:
        "At receiver 1+ and theta=0, all five ordered source rows have one positive-delay root and positive Jacobian data, while the fixed-speed tangential residual interval excludes zero; therefore resolved positive-delay source roots with positive Jacobian data do not imply fixed-speed force closure.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      offset: "zero",
      force_row: "dimensionless neutral fixed-speed tangential residual",
      common_factor_removed: "kappa*epsilon^2/R^2",
      pair_policy: fixedSpeedWitness.branch_scope?.pair_policy ?? null,
      same_source_policy: fixedSpeedWitness.branch_scope?.same_source_policy ?? null,
      polarity_policy: fixedSpeedWitness.branch_scope?.polarity_policy ?? null,
    },
    numerical_method: {
      fixed_speed_residual_source_schema: fixedSpeedWitness.schema,
      y_subdivisions: fixedSpeedWitness.numerical_method?.y_subdivisions ?? null,
      tangential_tolerance: fixedSpeedWitness.numerical_method?.tangential_tolerance ?? null,
      root_equation: fixedSpeedWitness.numerical_method?.root_equation ?? null,
      jacobian_formula: fixedSpeedWitness.numerical_method?.jacobian_formula ?? null,
      force_formula: fixedSpeedWitness.numerical_method?.force_formula ?? null,
    },
    first_rejecting_node: node,
    resolved_root_rows: {
      receiver: node?.receiver ?? null,
      receiver_label: node?.receiver_label ?? null,
      theta: node?.theta ?? null,
      source_row_count: sourceRows.length,
      all_source_rows_root_count_one: sourceRows.every((row) => row.root_count === 1),
      all_source_roots_positive_delay: sourceRows.every((row) => Number.isFinite(row.y) && row.y > 0),
      positive_jacobian_data: sourceRows.every(
        (row) => Number.isFinite(row.jacobian) && row.jacobian > 0 && row.jacobian_positive === true
      ),
      source_rows: sourceRows,
    },
    residual_witness: {
      receiver: node?.receiver ?? null,
      receiver_label: node?.receiver_label ?? null,
      theta: node?.theta ?? null,
      tangential_residual: node?.tangential_residual ?? null,
      abs_tangential_residual: node?.abs_tangential_residual ?? null,
      residual_class: node?.residual_class ?? null,
      interval,
    },
    result: {
      closure_status: residualRejectsClosure ? CLOSURE_STATUS : "not_closed_by_this_witness",
      retention: "not_retained",
      retained_branch: false,
      resolved_root_positive_jacobian_rows_retained_as_sufficient_condition: false,
    },
    not_retained_reason: [
      "receiver 1+ at theta=0 has five resolved positive-delay source roots",
      "all five source rows have positive Jacobian data",
      "the certified fixed-speed tangential residual interval excludes zero",
      "resolved source roots with positive Jacobian data are not a force-closure proof",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralRootForceClosureWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);

  const node = artifact.first_rejecting_node ?? {};
  assertField(node.receiver === 1, "first rejecting node must use receiver 1", errors);
  assertField(node.receiver_label === "1+", "first rejecting node must use receiver label 1+", errors);
  assertField(node.theta === 0, "first rejecting node must use theta=0", errors);
  assertField(node.node_id === "theta_0_site_1", "first rejecting node must be theta_0_site_1", errors);

  const rootRows = artifact.resolved_root_rows ?? {};
  const sourceRows = rootRows.source_rows ?? [];
  assertField(rootRows.receiver === 1, "resolved root rows must use receiver 1", errors);
  assertField(rootRows.receiver_label === "1+", "resolved root rows must use receiver label 1+", errors);
  assertField(rootRows.theta === 0, "resolved root rows must use theta=0", errors);
  assertField(rootRows.source_row_count === 5, "resolved root rows must declare five source rows", errors);
  assertField(Array.isArray(sourceRows) && sourceRows.length === 5, "resolved root rows must contain five source rows", errors);
  for (const row of sourceRows) {
    assertField(row.root_count === 1, `source ${row.source_label ?? row.source} must have root_count=1`, errors);
    assertField(Number.isFinite(row.y) && row.y > 0, `source ${row.source_label ?? row.source} must have positive delay root`, errors);
    assertField(
      Number.isFinite(row.jacobian) && row.jacobian > 0 && row.jacobian_positive === true,
      `source ${row.source_label ?? row.source} must have positive Jacobian data`,
      errors
    );
  }
  assertField(
    rootRows.all_source_rows_root_count_one === true,
    "resolved root rows must declare all source rows root_count=1",
    errors
  );
  assertField(
    rootRows.all_source_roots_positive_delay === true,
    "resolved root rows must declare all source roots positive delay",
    errors
  );
  assertField(rootRows.positive_jacobian_data === true, "resolved root rows must declare positive Jacobian data", errors);

  const residual = artifact.residual_witness ?? {};
  const interval = residual.interval ?? {};
  const residualInterval = interval.residual_interval ?? [];
  assertField(residual.receiver === 1, "residual witness must use receiver 1", errors);
  assertField(residual.receiver_label === "1+", "residual witness must use receiver label 1+", errors);
  assertField(residual.theta === 0, "residual witness must use theta=0", errors);
  assertField(
    interval.residual_excludes_zero === true &&
      Array.isArray(residualInterval) &&
      residualInterval.length === 2 &&
      (residualInterval[1] < 0 || residualInterval[0] > 0),
    "residual interval must exclude zero",
    errors
  );
  assertField(
    artifact.result?.closure_status === CLOSURE_STATUS,
    "closure_status must reject resolved-root-rows-imply-fixed-speed-force-closure",
    errors
  );
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-root-force-closure-witness.mjs [options]",
    "",
    "Options:",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
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
          schema: "neutral-swarm-octahedral-root-force-closure-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_ROOT_FORCE_CLOSURE_WITNESS_SCHEMA,
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
    const errors = validateOctahedralRootForceClosureWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          closure_status: artifact.result?.closure_status ?? null,
          retention: artifact.result?.retention ?? null,
          first_rejecting_node: artifact.first_rejecting_node ?? null,
          source_row_count: artifact.resolved_root_rows?.source_row_count ?? null,
          residual_interval: artifact.residual_witness?.interval?.residual_interval ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralRootForceClosureWitness();
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

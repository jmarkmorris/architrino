#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";
import { buildOctahedralFixedSpeedWitness } from "./octahedral-fixed-speed-witness.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA =
  "neutral-braid-octahedral-inventory-closure-witness/v1";

const PACKET_ID = "octahedral_inventory_closure_witness";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_TANGENTIAL_TOLERANCE = 1e-9;

function inventoryClass(pair) {
  return pair.force_sign < 0 ? "attractive" : "repulsive";
}

function receiverInventoryRows(pairs) {
  return OCTAHEDRAL_SITES.map((receiver) => {
    const sourceRows = pairs
      .filter((pair) => pair.receiver === receiver.id)
      .map((pair) => ({
        source: pair.source,
        source_label: pair.source_label,
        source_binary: pair.source_binary,
        source_relation: pair.source_relation,
        force_sign: pair.force_sign,
        inventory_class: inventoryClass(pair),
      }));
    const attractiveSources = sourceRows.filter((row) => row.inventory_class === "attractive");
    const repulsiveSources = sourceRows.filter((row) => row.inventory_class === "repulsive");

    return {
      receiver: receiver.id,
      receiver_label: receiver.label,
      receiver_binary: receiver.binary,
      receiver_polarity: receiver.polarity,
      source_site_count: sourceRows.length,
      N_attr: attractiveSources.length,
      N_rep: repulsiveSources.length,
      inventory_bias: attractiveSources.length - repulsiveSources.length,
      inventory_pattern: `${attractiveSources.length}-attractive/${repulsiveSources.length}-repulsive`,
      attractive_sources: attractiveSources.map((row) => row.source_label),
      repulsive_sources: repulsiveSources.map((row) => row.source_label),
      source_rows: sourceRows,
    };
  });
}

function firstRejectingResidual(fixedSpeedWitness) {
  const certificate = fixedSpeedWitness.interval_certificate ?? null;
  const node = fixedSpeedWitness.witness_set?.first_rejecting_node ?? null;

  return {
    consumed_from: "scripts/neutral-braid/octahedral-fixed-speed-witness.mjs",
    receiver: certificate?.receiver ?? node?.receiver ?? null,
    receiver_label: certificate?.receiver_label ?? node?.receiver_label ?? null,
    theta: certificate?.theta ?? node?.theta ?? null,
    witness_node_id: certificate?.witness_node_id ?? node?.node_id ?? null,
    tangential_residual: node?.tangential_residual ?? null,
    abs_tangential_residual: node?.abs_tangential_residual ?? null,
    residual_interval: certificate?.residual_interval ?? null,
    residual_excludes_zero: certificate?.residual_excludes_zero ?? false,
    residual_sign: certificate?.residual_sign ?? null,
    interval_certificate_status: certificate?.status ?? null,
    expression: certificate?.expression ?? null,
  };
}

export function buildOctahedralInventoryClosureWitness(options = {}) {
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const tangentialTolerance = Number(options.tangentialTolerance ?? DEFAULT_TANGENTIAL_TOLERANCE);
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(tangentialTolerance) || tangentialTolerance < 0) {
    throw new Error("tangentialTolerance must be a nonnegative number");
  }

  const pairs = orderedOctahedralPairs();
  const inventoryRows = receiverInventoryRows(pairs);
  const fixedSpeedWitness = buildOctahedralFixedSpeedWitness({ ySubdivisions, tangentialTolerance });
  const rejectingResidual = firstRejectingResidual(fixedSpeedWitness);
  const uniformInventoryBias = inventoryRows.every((row) => row.N_attr === 3 && row.N_rep === 2);
  const residualRejectsClosure = rejectingResidual.residual_excludes_zero === true;

  return {
    schema: OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_inventory_closure_witness.narrow_no_go.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [
      "scripts/neutral-braid/octahedral-root-ledger.mjs",
      "scripts/neutral-braid/octahedral-fixed-speed-witness.mjs",
    ],
    artifact_claim: {
      kind: "narrow_inventory_bias_no_go_witness",
      hypothesis:
        "Neutral 3-attractive / 2-repulsive source-site inventory by itself implies fixed-speed force closure.",
      solves_dynamics: false,
      retained_branch: false,
      strongest_claim:
        "The rigid zero-offset octahedral inventory has N_attr=3 and N_rep=2 at every receiver, while the receiver 1+ theta=0 fixed-speed tangential residual interval excludes zero; therefore inventory bias alone does not imply fixed-speed force closure.",
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      offset: "zero",
      force_row: "dimensionless neutral fixed-speed tangential residual",
      pair_policy: {
        name: "Pi_all",
        kind: "ordered-distinct-source-pairs",
        cardinality: pairs.length,
      },
      same_source_policy: {
        selected: "ordinary-same-source-excluded",
        ordinary_force_rows_include_same_source: false,
      },
    },
    numerical_method: {
      y_subdivisions: ySubdivisions,
      tangential_tolerance: tangentialTolerance,
      fixed_speed_residual_source_schema: fixedSpeedWitness.schema,
    },
    site_inventory: {
      rows: inventoryRows,
      row_count: inventoryRows.length,
      all_rows_neutral_3_attr_2_rep: uniformInventoryBias,
    },
    fixed_speed_residual_witness: rejectingResidual,
    result: {
      closure_status: residualRejectsClosure
        ? "closed-rejected:inventory-bias-implies-force-closure"
        : "not_closed_by_this_witness",
      retention: "not_retained",
      retained_branch: false,
      inventory_bias_retained_as_sufficient_condition: false,
    },
    not_retained_reason: [
      "all six receivers have neutral 3-attractive / 2-repulsive source-site inventory",
      "receiver 1+ at theta=0 has a certified fixed-speed tangential residual interval excluding zero",
      "inventory bias alone is not a force-closure proof",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralInventoryClosureWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(artifact.artifact_claim?.solves_dynamics === false, "artifact must declare solves_dynamics=false", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);
  assertField(artifact.branch_scope?.pair_policy?.cardinality === 30, "pair policy cardinality must be 30", errors);

  const rows = artifact.site_inventory?.rows ?? [];
  assertField(Array.isArray(rows) && rows.length === 6, "site inventory must contain six receiver rows", errors);
  for (const site of OCTAHEDRAL_SITES) {
    const row = rows.find((candidate) => candidate.receiver === site.id);
    assertField(Boolean(row), `site inventory must contain receiver ${site.label}`, errors);
    if (row) {
      assertField(row.receiver_label === site.label, `receiver ${site.label} row must preserve label`, errors);
      assertField(row.source_site_count === 5, `receiver ${site.label} must have five source sites`, errors);
      assertField(row.N_attr === 3, `receiver ${site.label} must have N_attr=3`, errors);
      assertField(row.N_rep === 2, `receiver ${site.label} must have N_rep=2`, errors);
      assertField(row.inventory_bias === 1, `receiver ${site.label} must have inventory_bias=1`, errors);
      assertField(Array.isArray(row.source_rows) && row.source_rows.length === 5, `receiver ${site.label} source rows must have length 5`, errors);
    }
  }
  assertField(
    artifact.site_inventory?.all_rows_neutral_3_attr_2_rep === true,
    "site inventory must declare all rows neutral 3-attractive / 2-repulsive",
    errors
  );

  const residual = artifact.fixed_speed_residual_witness ?? {};
  const interval = residual.residual_interval ?? [];
  assertField(residual.receiver === 1, "first rejecting residual must use receiver 1", errors);
  assertField(residual.receiver_label === octahedralSiteById(1).label, "first rejecting residual must use receiver label 1+", errors);
  assertField(residual.theta === 0, "first rejecting residual must use theta=0", errors);
  assertField(
    residual.residual_excludes_zero === true &&
      Array.isArray(interval) &&
      interval.length === 2 &&
      interval[0] > 0 &&
      interval[1] > interval[0],
    "first rejecting residual interval must exclude zero with positive lower endpoint",
    errors
  );
  assertField(
    artifact.result?.closure_status === "closed-rejected:inventory-bias-implies-force-closure",
    "closure_status must reject inventory-bias-implies-force-closure",
    errors
  );
  assertField(artifact.result?.retention === "not_retained", "retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-inventory-closure-witness.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>  Root-search subdivisions for consumed fixed-speed witness (default: 720)",
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
          schema: "neutral-braid-octahedral-inventory-closure-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_INVENTORY_CLOSURE_WITNESS_SCHEMA,
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
    const errors = validateOctahedralInventoryClosureWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          inventory_row_count: artifact.site_inventory?.row_count ?? null,
          closure_status: artifact.result?.closure_status ?? null,
          retention: artifact.result?.retention ?? null,
          first_rejecting_residual: artifact.fixed_speed_residual_witness ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralInventoryClosureWitness({
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

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA =
  "neutral-braid-octahedral-polarity-phase-retention-witness/v1";

const PACKET_ID = "octahedral_polarity_phase_retention_witness";
const PROMOTION_STATUS = "priority-only";
const CLOSURE_STATUS = "closed-rejected:polarity-phase-improvement-implies-retention";
const SOURCE_PACKET = "reference/priorities/braid-archive/braid-retained-branch-closure/shell-braid/polarity-phase-rigid-screen-results.md";

const CONSUMED_BEST_ROW = Object.freeze({
  source_rank: 1,
  polarity_row: "+---++",
  polarity_tex: "$+---++$",
  phi2: 0.006683,
  phi3: 3.148086,
  tangential_rms: 0.829635,
  tangential_max: 1.787420,
  J_min: 0.727176,
  d_min_over_R: 0.996664,
  root_count: "5-5",
  root_count_tex: "$5$-$5$",
  retention: "not_retained",
  source_literals: {
    polarity_row: "$+---++$",
    phi2: "$0.006683$",
    phi3: "$3.148086$",
    tangential_rms: "$0.829635$",
    tangential_max: "$1.787420$",
    J_min: "$0.727176$",
    d_min_over_R: "$0.996664$",
    root_count: "$5$-$5$",
  },
});

const REQUIRED_ROWS = Object.freeze([
  {
    row: "tangential force balance",
    status: "failed",
    diagnostic: "nonzero max tangential residual",
    value: CONSUMED_BEST_ROW.tangential_max,
  },
  { row: "support-complete root ledger", status: "open" },
  { row: "normal force balance", status: "open" },
  { row: "speed ODE", status: "open" },
  { row: "action closure", status: "open" },
  { row: "Noether closure", status: "open" },
  { row: "event ledger closure", status: "open" },
  { row: "stability closure", status: "open" },
  { row: "observer-export row", status: "open" },
]);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function buildOctahedralPolarityPhaseRetentionWitness() {
  const requiredRows = clone(REQUIRED_ROWS);
  const openRequiredRows = requiredRows.filter((row) => row.status === "open");

  return {
    schema: OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA,
    packet_id: PACKET_ID,
    artifact_id: "neutral_braid_octahedral_polarity_phase_retention_witness.best_row_consumption.v1",
    promotion_status: PROMOTION_STATUS,
    sources: [SOURCE_PACKET],
    artifact_claim: {
      kind: "polarity_phase_retention_overread_rejection",
      hypothesis: "The best neutral polarity-phase rigid-screen improvement implies a retained branch.",
      overread_retained: false,
      retained_branch: false,
      strongest_claim:
        "The best neutral polarity-phase row improves the rigid screen but still has nonzero tangential residual and leaves required retention rows open.",
    },
    consumed_priority_packet: {
      path: SOURCE_PACKET,
      section: "Best Rows",
      table: "ten best screened rows",
      row_rank: CONSUMED_BEST_ROW.source_rank,
    },
    branch_scope: {
      seed: "rigid-octahedral-carrier",
      phase_policy: "binary phase offsets with phi1=0 and screened phi2,phi3",
      polarity_policy: {
        neutral_three_plus_three_minus: true,
        global_sign_reversal_identified: true,
        fixed_enumeration_count: 20,
      },
      force_row: "dimensionless neutral fixed-speed tangential residual",
      active_root_policy: "first positive causal-delay root for each retained ordered source",
      same_source_policy: {
        ordinary_same_source_roots_retained: false,
      },
    },
    consumed_best_row: clone(CONSUMED_BEST_ROW),
    retention_requirements: {
      status: "not_satisfied",
      failed_row: "tangential force balance",
      open_required_row_count: openRequiredRows.length,
      required_rows: requiredRows,
    },
    result: {
      closure_status: CLOSURE_STATUS,
      retention: "not_retained",
      retained_branch: false,
      best_row_retention: CONSUMED_BEST_ROW.retention,
      rejected_overread: "polarity-phase improvement implies retention",
      reason: "nonzero max tangential residual and required rows open",
      nonzero_max_tangential_residual: true,
      required_rows_open: true,
    },
    not_retained_reason: [
      "best neutral polarity-phase row has nonzero max tangential residual 1.787420",
      "required retention rows remain open",
      "polarity-phase improvement is a screening signal, not a retained rigid branch",
    ],
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function closeTo(actual, expected, tolerance = 1e-12) {
  return Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
}

export function validateOctahedralPolarityPhaseRetentionWitness(artifact) {
  const errors = [];
  assertField(artifact && typeof artifact === "object" && !Array.isArray(artifact), "artifact must be an object", errors);
  if (errors.length > 0) {
    return errors;
  }

  assertField(
    artifact.schema === OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA,
    `schema must be ${OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA}`,
    errors
  );
  assertField(artifact.packet_id === PACKET_ID, `packet_id must be ${PACKET_ID}`, errors);
  assertField(artifact.promotion_status === PROMOTION_STATUS, `promotion_status must be ${PROMOTION_STATUS}`, errors);
  assertField(Array.isArray(artifact.sources) && artifact.sources.includes(SOURCE_PACKET), "source packet must be recorded", errors);
  assertField(artifact.artifact_claim?.overread_retained === false, "artifact must reject the overread", errors);
  assertField(artifact.artifact_claim?.retained_branch === false, "artifact must declare retained_branch=false", errors);

  const row = artifact.consumed_best_row ?? {};
  assertField(row.source_rank === 1, "best row source rank must be 1", errors);
  assertField(row.polarity_row === CONSUMED_BEST_ROW.polarity_row, "best row polarity must be +---++", errors);
  assertField(row.polarity_tex === CONSUMED_BEST_ROW.polarity_tex, "best row polarity TeX must be $+---++$", errors);
  assertField(
    row.source_literals?.polarity_row === CONSUMED_BEST_ROW.source_literals.polarity_row,
    "best row source literal polarity must be $+---++$",
    errors
  );
  assertField(closeTo(row.phi2, CONSUMED_BEST_ROW.phi2), "best row phi2 must be 0.006683", errors);
  assertField(closeTo(row.phi3, CONSUMED_BEST_ROW.phi3), "best row phi3 must be 3.148086", errors);
  assertField(closeTo(row.tangential_rms, CONSUMED_BEST_ROW.tangential_rms), "best row tangential RMS must be 0.829635", errors);
  assertField(
    closeTo(row.tangential_max, CONSUMED_BEST_ROW.tangential_max) && row.tangential_max > 0,
    "best row tangential max must be nonzero 1.787420",
    errors
  );
  assertField(
    row.source_literals?.tangential_max === CONSUMED_BEST_ROW.source_literals.tangential_max,
    "best row source literal tangential max must be $1.787420$",
    errors
  );
  assertField(closeTo(row.J_min, CONSUMED_BEST_ROW.J_min), "best row J_min must be 0.727176", errors);
  assertField(closeTo(row.d_min_over_R, CONSUMED_BEST_ROW.d_min_over_R), "best row d_min/R must be 0.996664", errors);
  assertField(row.root_count === CONSUMED_BEST_ROW.root_count, "best row root count must be 5-5", errors);
  assertField(row.root_count_tex === CONSUMED_BEST_ROW.root_count_tex, "best row root count TeX must be $5$-$5$", errors);
  assertField(
    row.source_literals?.root_count === CONSUMED_BEST_ROW.source_literals.root_count,
    "best row source literal root count must be $5$-$5$",
    errors
  );
  assertField(row.retention === "not_retained", "best row retention must be not_retained", errors);

  const requiredRows = Array.isArray(artifact.retention_requirements?.required_rows)
    ? artifact.retention_requirements.required_rows
    : [];
  const openRows = requiredRows.filter((requiredRow) => requiredRow.status === "open");
  assertField(
    artifact.retention_requirements?.status === "not_satisfied",
    "retention requirements status must be not_satisfied",
    errors
  );
  assertField(Array.isArray(requiredRows) && requiredRows.length > 0, "required rows must be recorded", errors);
  assertField(openRows.length > 0, "required rows must include open rows", errors);
  assertField(
    artifact.retention_requirements?.open_required_row_count === openRows.length,
    "open required row count must match required rows",
    errors
  );
  assertField(
    requiredRows.some(
      (requiredRow) =>
        requiredRow.row === "tangential force balance" &&
        requiredRow.status === "failed" &&
        requiredRow.diagnostic === "nonzero max tangential residual" &&
        closeTo(requiredRow.value, CONSUMED_BEST_ROW.tangential_max)
    ),
    "tangential force balance must fail by nonzero max tangential residual",
    errors
  );

  assertField(artifact.result?.closure_status === CLOSURE_STATUS, `closure_status must be ${CLOSURE_STATUS}`, errors);
  assertField(artifact.result?.retention === "not_retained", "result.retention must be not_retained", errors);
  assertField(artifact.result?.retained_branch === false, "result.retained_branch must be false", errors);
  assertField(artifact.result?.best_row_retention === "not_retained", "result.best_row_retention must be not_retained", errors);
  assertField(
    artifact.result?.reason === "nonzero max tangential residual and required rows open",
    "result.reason must name the nonzero residual and open required rows",
    errors
  );
  assertField(artifact.result?.nonzero_max_tangential_residual === true, "result must flag nonzero max tangential residual", errors);
  assertField(artifact.result?.required_rows_open === true, "result must flag open required rows", errors);

  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-polarity-phase-retention-witness.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write artifact JSON to path instead of stdout",
    "  --validate <path>  Validate an existing artifact JSON file",
    "  --schema           Print the artifact schema identifier",
    "  --pretty           Pretty-print JSON output",
    "  --help             Print this help text",
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
          schema: "neutral-braid-octahedral-polarity-phase-retention-witness-schema/v1",
          artifact_schema: OCTAHEDRAL_POLARITY_PHASE_RETENTION_WITNESS_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
          closure_status: CLOSURE_STATUS,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralPolarityPhaseRetentionWitness(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          closure_status: artifact.result?.closure_status ?? null,
          retention: artifact.result?.retention ?? null,
          reason: artifact.result?.reason ?? null,
          best_row: artifact.consumed_best_row ?? null,
          open_required_row_count: artifact.retention_requirements?.open_required_row_count ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralPolarityPhaseRetentionWitness();
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

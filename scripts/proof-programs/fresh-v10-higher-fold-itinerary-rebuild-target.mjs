#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const CERT_DIR = "reference/priorities/proof-programs/breather-proof/certificate";
const DEFAULT_CONTRACT = `${CERT_DIR}/fresh_same_packet_fold_shear_seed.v0.json`;
const DEFAULT_SHIFTED = `${CERT_DIR}/fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`;
const DEFAULT_FREE = `${CERT_DIR}/fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json`;
const DEFAULT_OUT_JSON = `${CERT_DIR}/fresh_v10_higher_fold_itinerary_rebuild_target.v0.json`;
const DEFAULT_OUT_MD = `${CERT_DIR}/fresh_v10_higher_fold_itinerary_rebuild_target.v0.md`;

function parseArgs(argv) {
  const args = {
    contract: DEFAULT_CONTRACT,
    shifted: DEFAULT_SHIFTED,
    free: DEFAULT_FREE,
    outJson: DEFAULT_OUT_JSON,
    outMd: DEFAULT_OUT_MD,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--contract") {
      args.contract = argv[++index];
    } else if (arg === "--shifted-obstruction") {
      args.shifted = argv[++index];
    } else if (arg === "--free-obstruction") {
      args.free = argv[++index];
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
  console.log(`Usage: node scripts/proof-programs/fresh-v10-higher-fold-itinerary-rebuild-target.mjs [options]

Options:
  --contract PATH              Fresh seed contract JSON. Defaults to ${DEFAULT_CONTRACT}.
  --shifted-obstruction PATH   Shifted-separator finite-integration obstruction JSON. Defaults to ${DEFAULT_SHIFTED}.
  --free-obstruction PATH      Free-period finite-integration obstruction JSON. Defaults to ${DEFAULT_FREE}.
  --out-json PATH              Output JSON path. Defaults to ${DEFAULT_OUT_JSON}.
  --out-md PATH                Output Markdown path. Defaults to ${DEFAULT_OUT_MD}.
  --pretty                     Pretty-print JSON artifact.
  --help                       Show this help.`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return {
    path: filePath,
    sha256: sha256(raw),
    data: JSON.parse(raw),
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

function cleanNumber(value, digits = 15) {
  if (value === null || value === undefined) {
    return null;
  }
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Expected finite number, got ${value}`);
  }
  if (Math.abs(number) < 1e-14) {
    return 0;
  }
  return Number(number.toPrecision(digits));
}

function closeEnough(a, b, tolerance = 1e-10) {
  return Math.abs(Number(a) - Number(b)) <= tolerance;
}

function thresholdLambda(obstruction) {
  const threshold = obstruction.strict_gap_threshold || {};
  const value =
    threshold.lambda_min_nonnegative_all_listed_collars ??
    threshold.lambda_min_open_all_listed_collars;
  if (!Number.isFinite(Number(value))) {
    throw new Error(`Missing threshold lambda for ${obstruction.packet_id}`);
  }
  return Number(value);
}

function stateRootCount(state) {
  return state.root_count ?? state.crossing_count ?? null;
}

function findStateAtLambda(obstruction, lambda) {
  const states = obstruction.field_speed_itinerary_audit?.states;
  if (!Array.isArray(states)) {
    throw new Error(`Missing field-speed states for ${obstruction.packet_id}`);
  }
  const match = states.find((state) => closeEnough(state.lambda, lambda, 1e-12));
  if (!match) {
    throw new Error(`Missing field-speed state at lambda=${lambda} for ${obstruction.packet_id}`);
  }
  return match;
}

function rootClass(root, separatorCoordinates, state) {
  const separatorEntry = Object.entries(separatorCoordinates).find(([, value]) =>
    closeEnough(root, value, 1e-10),
  );
  const positive = (state.positive_velocity_roots || []).some((value) => closeEnough(root, value, 1e-10));
  const negative = (state.negative_velocity_roots || []).some((value) => closeEnough(root, value, 1e-10));
  return {
    theta: cleanNumber(root),
    half_period: root < 0.5 ? "first" : "second",
    velocity_contact: positive ? "positive_field_speed" : negative ? "negative_field_speed" : "unclassified",
    source: separatorEntry ? "current_shifted_separator" : "new_higher_fold_separator",
    current_separator_label: separatorEntry ? separatorEntry[0] : null,
  };
}

function summarizeStates(obstruction) {
  return obstruction.field_speed_itinerary_audit.states.map((state) => ({
    lambda: cleanNumber(state.lambda),
    root_count: stateRootCount(state),
    max_abs_xdot_sampled: cleanNumber(state.max_abs_xdot_sampled),
  }));
}

function sourceArtifact(file) {
  return {
    path: file.path,
    sha256: file.sha256,
  };
}

function buildPacket(contractFile, shiftedFile, freeFile) {
  const contract = contractFile.data;
  const shifted = shiftedFile.data;
  const free = freeFile.data;
  const shiftedLambda = thresholdLambda(shifted);
  const freeLambda = thresholdLambda(free);
  const shiftedThresholdState = findStateAtLambda(shifted, shiftedLambda);
  const freeThresholdState = findStateAtLambda(free, freeLambda);
  const separatorCoordinates = contract.shifted_separator_coordinates || {};
  const thresholdRoots = (shiftedThresholdState.root_thetas || []).map((root) =>
    rootClass(root, separatorCoordinates, shiftedThresholdState),
  );
  if (thresholdRoots.length !== stateRootCount(shiftedThresholdState)) {
    throw new Error("Shifted threshold root inventory does not match root count.");
  }
  const firstHalfRoots = thresholdRoots.filter((entry) => entry.half_period === "first");
  const secondHalfRoots = thresholdRoots.filter((entry) => entry.half_period === "second");
  const newFirstHalfRoots = firstHalfRoots.filter((entry) => entry.source === "new_higher_fold_separator");
  const currentFirstHalfRoots = firstHalfRoots.filter((entry) => entry.source === "current_shifted_separator");

  return {
    schema: "breather-fresh-v10-higher-fold-itinerary-rebuild-target-v1",
    packet_id: "fresh-v10-higher-fold-itinerary-rebuild-target-v0",
    source_packet: contract.packet_id,
    status: "higher_fold_itinerary_rebuild_target_frozen_from_shifted_separator_obstruction",
    claim_level:
      "priority-only target packet for a new higher-fold itinerary rebuild; not a candidate, not a proof-interval preledger pass, and not branch-chart authorization",
    branch_chart_authorized: false,
    preledger_pass: false,
    updates_live_ledger: false,
    source_artifacts: {
      fresh_seed_contract: sourceArtifact(contractFile),
      shifted_separator_obstruction: sourceArtifact(shiftedFile),
      free_period_obstruction: sourceArtifact(freeFile),
    },
    current_packet_identity: contract.packet_identity,
    source_facts: {
      current_itinerary: {
        id: contract.packet_identity?.K ?? null,
        expected_root_count: shifted.field_speed_itinerary_audit.expected_root_count_for_current_itinerary,
        shifted_separator_coordinates: separatorCoordinates,
      },
      shifted_separator_fixed_period: {
        threshold_lambda: cleanNumber(shiftedLambda),
        controlling_rows: shifted.strict_gap_threshold.controlling_rows || [],
        root_count_at_threshold: stateRootCount(shiftedThresholdState),
        root_count_at_lambda_one: shifted.field_speed_itinerary_audit.lambda_one_root_count,
        max_abs_xdot_sampled_at_threshold: cleanNumber(shiftedThresholdState.max_abs_xdot_sampled),
        progression: summarizeStates(shifted),
      },
      free_period_local_shear: {
        threshold_lambda: cleanNumber(freeLambda),
        controlling_rows: free.strict_gap_threshold.controlling_rows || [],
        crossing_count_at_threshold: stateRootCount(freeThresholdState),
        crossing_count_at_lambda_one: free.field_speed_itinerary_audit.lambda_one_crossing_count,
        max_abs_xdot_sampled_at_threshold: cleanNumber(freeThresholdState.max_abs_xdot_sampled),
      },
    },
    selected_rebuild_target: {
      proposed_successor_packet_id: "fresh-v10-higher-fold-12-root-rebuild-v0",
      proposed_itinerary_id: "fresh_v10_shifted_threshold_12_root_itinerary",
      selection_reason:
        "The shifted-separator fixed-period tangent opens all listed v10 collars at the lower direct-path threshold and has the smallest observed higher-fold count at that threshold: 12 field-speed roots instead of the current itinerary's 4 roots and the free-period witness's 20 crossings.",
      target_root_count: stateRootCount(shiftedThresholdState),
      first_half_root_count: firstHalfRoots.length,
      second_half_root_count: secondHalfRoots.length,
      new_first_half_separator_count: newFirstHalfRoots.length,
      retained_current_first_half_separator_count: currentFirstHalfRoots.length,
      strict_gap_target_status:
        "The old 10 v10 collars are admissible source diagnostics for the rebuild, but they are not consumable preledger rows for a new itinerary until regenerated under the successor packet identity.",
      finite_amplitude_window_signal:
        "At lambda_min and at lambda=0.3 the shifted direct path has 12 roots; by lambda=0.4 it has 16 roots. This is a sampled routing signal only, not an interval-stable root-count proof.",
    },
    successor_seed_packet: {
      status: "diagnostic_successor_seed_materialized",
      seed_lambda: 0.3,
      artifacts: [
        "phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json",
        "mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json",
        "causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json",
        "candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md",
      ],
      claim_level:
        "diagnostic higher-fold direct-path seed packet; not an interval root-count certificate, not a preledger pass, and not branch-chart authorization",
    },
    root_tube_certificate_attempt: {
      status: "root_count_interval_certificate_materialized",
      artifacts: [
        "fresh_v10_higher_fold_root_tube_certificate.v0.json",
        "fresh_v10_higher_fold_root_tube_certificate.v0.md",
        "fresh_v10_higher_fold_root_tube_interval_certificate.v0.json",
        "fresh_v10_higher_fold_root_tube_interval_certificate.v0.md",
      ],
      claim_level:
        "binary64/Lipschitz 12-root evidence has been translated into an outward rational interval root-count certificate; this closes the root-count topology gate but not the preledger or branch chart",
    },
    proof_interval_v1_sidecar: {
      status: "proof_interval_v1_fail_closed_materialized",
      artifacts: [
        "preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json",
        "causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json",
        "causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md",
        "preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json",
      ],
      claim_level:
        "exact-rational coarse range sidecar certifies 270 range-empty rows and leaves 980 split-required rows; not a preledger pass or branch chart authorization",
    },
    proof_interval_v2_sidecar: {
      status: "proof_interval_v2_fail_closed_materialized",
      artifacts: [
        "preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json",
        "causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json",
        "causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md",
        "preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json",
      ],
      claim_level:
        "exact-rational row-specific trigonometric sidecar certifies 1,062 range-empty rows and leaves 188 split-required rows; not a preledger pass or branch chart authorization",
    },
    proof_interval_v3_sidecar: {
      status: "proof_interval_v3_fail_closed_materialized",
      artifacts: [
        "preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json",
        "causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json",
        "causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md",
        "preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json",
      ],
      claim_level:
        "exact-rational root-complement monotone diagonal sidecar certifies the same 1,062 range-empty rows plus 26 diagonal exclusions and leaves 162 split-required rows; not a preledger pass or branch chart authorization",
    },
    proof_interval_v4_sidecar: {
      status: "proof_interval_v4_fail_closed_materialized",
      artifacts: [
        "preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json",
        "causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json",
        "causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md",
        "preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json",
      ],
      claim_level:
        "exact-rational simple-root subwindow sidecar records 42 root-complement monotone receiver subrow certificates, consumes 0 parent simple-root rows, and leaves 162 split-required base rows: 42 parent complement-coverage rows, 8 periodic endpoint/complement rows, and 112 fold-layer rows; not a preledger pass or branch chart authorization",
    },
    proof_interval_v5_sidecar: {
      status: "proof_interval_v5_fail_closed_materialized",
      artifacts: [
        "preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json",
        "causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json",
        "causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md",
        "preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json",
      ],
      claim_level:
        "exact-rational receiver-grid cover audit over the 42 regular residual parent-complement rows certifies 571 simple-root cells, misses 773 cells, consumes 0 parent rows, and leaves 162 split-required base rows; not a preledger pass or branch chart authorization",
    },
    root_inventory_at_shifted_threshold: {
      lambda: cleanNumber(shiftedLambda),
      T_cyc: cleanNumber(shiftedThresholdState.T_cyc),
      x_range_sampled: (shiftedThresholdState.x_range_sampled || []).map((value) => cleanNumber(value)),
      roots: thresholdRoots,
    },
    rebuild_obligations_before_branch_chart: [
      "Freeze the successor packet identity before any row consumption, using a new itinerary id and mesh name rather than mutating fresh-same-packet-fold-shear-seed-v0.",
      "Use the outward rational 12-root field-speed interval certificate as the topology input for the successor packet; regenerate the seed surface if that certificate changes the root tubes or itinerary partition.",
      "Regenerate null-coordinate gap collars and fold-layer rows for the successor packet; old same-itinerary v10 rows are historical unless recomputed or proven persistent under the new packet identity.",
      "Extend the higher-fold proof-interval backend beyond the v5 receiver-grid cover audit so the remaining 162 parent complement, endpoint/complement, and fold-layer rows are classified before branch-chart, corridor, monodromy, returned-sample, topology, or Schauder rows can resume.",
      "Record any strict-gap tangent or sampled LP evidence as diagnostic until it is backed by outward-rounded interval certificates.",
    ],
    non_authorizations: [
      "Does not accept the shifted direct finite path as a repaired candidate.",
      "Does not update causal_ledger.json or any live proof-interval ledger.",
      "Does not authorize branch_chart.json.",
      "Does not promote the collinear-breather theorem into $\\mathbb{A}\\mathbb{A}\\mathbb{A}$ prose.",
    ],
    closure_condition:
      "The 12-root field-speed topology is interval-certified for fresh-v10-higher-fold-12-root-rebuild-v0, proof-interval v3 certifies 1,062 row-specific range-empty rows plus 26 root-complement monotone diagonal exclusions, proof-interval v4 records 42 simple-root receiver subwindow certificates, and proof-interval v5 audits the 42 residual regular parents with 571 certified receiver cells and 773 missing cells. The remaining closure artifact is sharper parent-complement coverage, periodic endpoint/complement ownership, and fold-layer classification of the 162 split-required base rows before branch-chart work.",
    capture_decision:
      "Priority-only. This packet converts obstruction evidence into a rebuild target; promotion should wait for a passed proof-interval preledger for the interval-certified successor packet.",
  };
}

function markdownTable(rows, columns) {
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const sep = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map(
    (row) => `| ${columns.map((column) => String(column.value(row) ?? "")).join(" | ")} |`,
  );
  return [header, sep, ...body].join("\n");
}

function mdNumber(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return `\`${value}\``;
}

function buildMarkdown(packet) {
  const shifted = packet.source_facts.shifted_separator_fixed_period;
  const free = packet.source_facts.free_period_local_shear;
  const target = packet.selected_rebuild_target;
  const roots = packet.root_inventory_at_shifted_threshold.roots;
  const progressionRows = shifted.progression;

  return `# Fresh v10 Higher-Fold Itinerary Rebuild Target

## Scope

This packet freezes the first priority-only higher-fold itinerary rebuild
target after the same-itinerary structural screens failed to open a positive
sampled margin for \`fresh-same-packet-fold-shear-seed-v0\`.

It does not claim a repaired candidate, a proof-interval preledger pass, a live
ledger update, or branch-chart authorization.

Artifacts:

- \`fresh_v10_higher_fold_itinerary_rebuild_target.v0.json\`
- \`fresh_v10_higher_fold_itinerary_rebuild_target.v0.md\`
- \`../../../../../scripts/proof-programs/fresh-v10-higher-fold-itinerary-rebuild-target.mjs\`
- \`${packet.source_artifacts.fresh_seed_contract.path}\`
- \`${packet.source_artifacts.shifted_separator_obstruction.path}\`
- \`${packet.source_artifacts.free_period_obstruction.path}\`

## Source Facts

The current packet identity still uses
\`${packet.current_packet_identity.K}\`, whose expected field-speed root count
is \`${packet.source_facts.current_itinerary.expected_root_count}\`.

The shifted-separator fixed-period tangent is the selected rebuild seed because
it opens all listed v10 collars at the smaller direct-path threshold and has the
smallest observed higher-fold count at that threshold.

| Source | Threshold | Count at threshold | Count at lambda=1 | Controlling row |
| --- | --- | --- | --- | --- |
| shifted-separator fixed period | ${mdNumber(shifted.threshold_lambda)} | ${mdNumber(shifted.root_count_at_threshold)} roots | ${mdNumber(shifted.root_count_at_lambda_one)} roots | \`${shifted.controlling_rows.join(", ")}\` |
| free-period local shear | ${mdNumber(free.threshold_lambda)} | ${mdNumber(free.crossing_count_at_threshold)} crossings | ${mdNumber(free.crossing_count_at_lambda_one)} crossings | \`${free.controlling_rows.join(", ")}\` |

## Root-Count Signal

${markdownTable(progressionRows, [
    { label: "lambda", value: (row) => mdNumber(row.lambda) },
    { label: "field-speed roots", value: (row) => mdNumber(row.root_count) },
    { label: "sampled max abs xdot", value: (row) => mdNumber(row.max_abs_xdot_sampled) },
  ])}

At the strict-gap threshold the shifted direct path has \`${target.target_root_count}\`
field-speed roots. At \`lambda=0.3\` it still has 12 roots, while by
\`lambda=0.4\` it has 16 roots. This is a routing signal, not a proof of
interval-stable root count.

## Selected Target

Proposed successor packet:

\`\`\`json
{
  "packet_id": "${target.proposed_successor_packet_id}",
  "itinerary_id": "${target.proposed_itinerary_id}",
  "target_root_count": ${target.target_root_count}
}
\`\`\`

The first-half seed contains six field-speed contacts: two current shifted
separators and four new higher-fold separators. By half-period symmetry the
second half contains the corresponding six contacts.

${markdownTable(roots, [
    { label: "theta", value: (row) => mdNumber(row.theta) },
    { label: "half period", value: (row) => row.half_period },
    { label: "velocity contact", value: (row) => row.velocity_contact },
    { label: "source", value: (row) => row.source },
    { label: "current label", value: (row) => row.current_separator_label || "" },
  ])}

## Successor Seed Packet

The diagnostic successor seed packet now exists at seed amplitude
\`lambda=${packet.successor_seed_packet.seed_lambda}\`.

${packet.successor_seed_packet.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.successor_seed_packet.claim_level}.

## Root-Count Certificate Status

The root-count stability artifacts now also exist:

${packet.root_tube_certificate_attempt.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.root_tube_certificate_attempt.claim_level}.

## Proof-Interval v1 Sidecar

The first higher-fold proof-interval sidecar now exists:

${packet.proof_interval_v1_sidecar.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.proof_interval_v1_sidecar.claim_level}.

## Proof-Interval v2 Sidecar

The second higher-fold proof-interval sidecar now exists:

${packet.proof_interval_v2_sidecar.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.proof_interval_v2_sidecar.claim_level}.

## Proof-Interval v3 Sidecar

The third higher-fold proof-interval sidecar now exists:

${packet.proof_interval_v3_sidecar.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.proof_interval_v3_sidecar.claim_level}.

## Proof-Interval v4 Sidecar

The fourth higher-fold proof-interval sidecar now exists:

${packet.proof_interval_v4_sidecar.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.proof_interval_v4_sidecar.claim_level}.

## Proof-Interval v5 Sidecar

The fifth higher-fold proof-interval sidecar now exists:

${packet.proof_interval_v5_sidecar.artifacts.map((item) => `- \`${item}\``).join("\n")}

It remains priority-only: ${packet.proof_interval_v5_sidecar.claim_level}.

## Row-Reuse Boundary

The old 10 v10 collars remain useful source diagnostics for the rebuild, but
they are not consumable preledger rows for the new itinerary until regenerated
under the successor packet identity. Existing accepted or partial rows from
\`fresh-same-packet-fold-shear-seed-v0\` are historical unless recomputed or
proven persistent for \`${target.proposed_successor_packet_id}\`.

## Required Closure Artifacts

${packet.rebuild_obligations_before_branch_chart.map((item) => `- ${item}`).join("\n")}

## Non-Authorizations

${packet.non_authorizations.map((item) => `- ${item}`).join("\n")}

## Closure Condition

${packet.closure_condition}

## Capture Decision

${packet.capture_decision}
`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const contract = readJson(args.contract);
  const shifted = readJson(args.shifted);
  const free = readJson(args.free);
  const packet = buildPacket(contract, shifted, free);
  writeJson(args.outJson, packet, args.pretty);
  writeText(args.outMd, buildMarkdown(packet));
}

main();

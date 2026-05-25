#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate,
  validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate,
} from "./octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
  validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas,
} from "./octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_interval_bridge_predicate_reduction";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_SCAN_SAMPLES_PER_CELL = 96;
const DEFAULT_TOPOLOGY_SAMPLES_PER_CELL = 48;
const DEFAULT_DERIVATIVE_SAMPLES_PER_CELL = 8;
const DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT = 64;
const DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT = 96;
const DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT = 384;
const DEFAULT_TARGET_MARGIN_FACTOR = 0.5;
const DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT = 4;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function rowById(rows, field, id) {
  const row = rows.find((entry) => entry[field] === id);
  if (!row) {
    throw new Error(`missing row ${id}`);
  }
  return row;
}

function scaledBudget(value, targetMarginFactor) {
  return formatSmallNumber(Number(value) * targetMarginFactor);
}

function buildBridgeEndpointEnclosureTargetRows({
  bridgeCertificate,
  targetMarginFactor,
}) {
  return bridgeCertificate.bridge_endpoint_sample_rows.map((row) => ({
    target_id: `${row.sample_id}.forcing`,
    bridge_predicate_id: row.bridge_predicate_id,
    sample_id: row.sample_id,
    witness_row_id: row.witness_row_id,
    theta: row.theta,
    quantity: "forcing",
    expected_sign: row.expected_sign,
    sampled_value: row.forcing,
    sampled_sign_margin: row.signed_forcing_margin,
    target_enclosure_radius: scaledBudget(
      row.signed_forcing_margin,
      targetMarginFactor
    ),
    enclosure_rule:
      "an outward-rounded endpoint forcing enclosure below this radius preserves the sampled bridge endpoint sign",
    status: "bridge-endpoint-sign-enclosure-target-staged",
  }));
}

function buildDerivativeBridgeTargetRows(targetAtlas) {
  const sourceRows = targetAtlas.regular_subcell_sign_target_rows;
  const beforeTurn = rowById(
    sourceRows,
    "target_id",
    "I2.derivative-positive.before-turn"
  );
  const afterTurn = rowById(
    sourceRows,
    "target_id",
    "I2.derivative-negative.after-turn"
  );
  return [
    {
      target_id: "I2.entry-to-turn.derivative-positive",
      source_target_id: beforeTurn.target_id,
      interval: "[theta_3+ regular entry, derivative turn]",
      quantity: "derivative",
      expected_sign: "+",
      sampled_margin: beforeTurn.sampled_margin,
      target_enclosure_radius: beforeTurn.target_enclosure_radius,
      proof_role:
        "positive derivative transports the theta_3+ entry sign forward to the turn side",
      status: "bridge-derivative-sign-target-imported",
    },
    {
      target_id: "I2.turn-to-exit.derivative-negative",
      source_target_id: afterTurn.target_id,
      interval: "[derivative turn, theta_2+ regular exit]",
      quantity: "derivative",
      expected_sign: "-",
      sampled_margin: afterTurn.sampled_margin,
      target_enclosure_radius: afterTurn.target_enclosure_radius,
      proof_role:
        "negative derivative transports positivity backward to the turn side and negativity forward to the theta_2+ regular exit",
      status: "bridge-derivative-sign-target-imported",
    },
  ];
}

function buildEndpointMap(rows) {
  return Object.fromEntries(rows.map((row) => [row.sample_id, row]));
}

function buildDerivativeMap(rows) {
  return Object.fromEntries(rows.map((row) => [row.target_id, row]));
}

function minimumRadius(rows) {
  return formatSmallNumber(
    Math.min(...rows.map((row) => Number(row.target_enclosure_radius)))
  );
}

function minimumSampledMargin(rows) {
  return formatSmallNumber(
    Math.min(...rows.map((row) => Number(row.sampled_sign_margin ?? row.sampled_margin)))
  );
}

function buildIntervalBridgePredicateRows({
  endpointRows,
  derivativeRows,
}) {
  const endpoints = buildEndpointMap(endpointRows);
  const derivatives = buildDerivativeMap(derivativeRows);
  const beforeTurn = derivatives["I2.entry-to-turn.derivative-positive"];
  const afterTurn = derivatives["I2.turn-to-exit.derivative-negative"];
  const entryEndpoint = endpoints["theta_3plus.entry"];
  const turnCrest = endpoints["I2.turn-crest"];
  const leftBracket = endpoints["I2.left-forcing-bracket"];
  const rightBracket = endpoints["I2.right-forcing-bracket"];
  const exitEndpoint = endpoints["theta_2minus.exit"];

  const rows = [
    {
      interval_bridge_predicate_id: "theta_3plus.regular-entry-positive",
      required_endpoint_target_ids: [entryEndpoint.target_id],
      required_derivative_target_ids: [beforeTurn.target_id],
      theorem_use:
        "positive endpoint forcing at the regular entry plus positive derivative before the turn proves entry-side positivity and excludes an early hidden zero",
      proof_rule:
        "monotone-increasing transport from the theta_3+ regular entry",
      status: "interval-bridge-predicate-reduction-stated",
    },
    {
      interval_bridge_predicate_id: "I2.turn-bridge-forcing-positive",
      required_endpoint_target_ids: [
        entryEndpoint.target_id,
        turnCrest.target_id,
        leftBracket.target_id,
      ],
      required_derivative_target_ids: [beforeTurn.target_id, afterTurn.target_id],
      theorem_use:
        "positive entry and turn forcing, positive derivative before the turn, negative derivative after the turn, and positive left forcing bracket prove positivity across the full turn bridge",
      proof_rule:
        "increasing transport to the turn side, direct positive turn enclosure, and decreasing transport backward from the left forcing bracket",
      status: "interval-bridge-predicate-reduction-stated",
    },
    {
      interval_bridge_predicate_id: "theta_2minus.regular-exit-negative",
      required_endpoint_target_ids: [
        rightBracket.target_id,
        exitEndpoint.target_id,
      ],
      required_derivative_target_ids: [afterTurn.target_id],
      theorem_use:
        "negative forcing at the right bracket plus negative derivative after the turn transports negativity to the regular exit before theta_2+",
      proof_rule:
        "monotone-decreasing transport from the post-zero forcing bracket to the theta_2+ regular exit",
      status: "interval-bridge-predicate-reduction-stated",
    },
  ];

  return rows.map((row) => {
    const requiredRows = [
      ...row.required_endpoint_target_ids.map((targetId) =>
        rowById(endpointRows, "target_id", targetId)
      ),
      ...row.required_derivative_target_ids.map((targetId) =>
        rowById(derivativeRows, "target_id", targetId)
      ),
    ];
    return {
      ...row,
      inherited_sampled_margin_budget: minimumSampledMargin(requiredRows),
      inherited_target_radius_budget: minimumRadius(requiredRows),
    };
  });
}

function buildIntervalBridgeReductionTheorem() {
  return {
    theorem_id: "interval-bridge-predicate-reduction",
    theorem_scope: "regular I2 source-atlas bridge intervals",
    statement:
      "On the shared source atlas, the five bridge endpoint sign enclosures plus the two imported I2 derivative-sign enclosures imply the three interval bridge predicates required by the source-atlas interval implication theorem.",
    proof_steps: [
      "Apply positive-derivative monotonicity from the theta_3+ regular entry to the derivative-turn side.",
      "Use the positive turn forcing enclosure to cover the derivative-turn bridge where a derivative sign switch is localized.",
      "Apply negative-derivative monotonicity backward from the positive left forcing bracket to cover the post-turn positive bridge.",
      "Apply negative-derivative monotonicity forward from the negative right forcing bracket to the theta_2+ regular exit.",
      "Substitute the resulting three bridge predicates into the already-stated source-atlas interval implication theorem.",
    ],
    proof_status: "conditional-interval-bridge-predicate-reduction-stated",
  };
}

function buildReductionSummary(rows) {
  const weakest = rows.reduce((current, row) => {
    if (!current) {
      return row;
    }
    return Number(row.inherited_target_radius_budget) <
      Number(current.inherited_target_radius_budget)
      ? row
      : current;
  }, null);
  return {
    interval_bridge_predicate_count: rows.length,
    interval_bridge_predicate_reduction_stated_count: rows.filter(
      (row) => row.status === "interval-bridge-predicate-reduction-stated"
    ).length,
    weakest_bridge_predicate_id: weakest?.interval_bridge_predicate_id ?? null,
    weakest_inherited_sampled_margin_budget:
      weakest?.inherited_sampled_margin_budget ?? null,
    weakest_inherited_target_radius_budget:
      weakest?.inherited_target_radius_budget ?? null,
    status: rows.every(
      (row) => row.status === "interval-bridge-predicate-reduction-stated"
    )
      ? "interval-bridge-predicate-reduction-stated"
      : "interval-bridge-predicate-reduction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(
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
  const sourceAtlasSampleCount = Number.parseInt(
    options.sourceAtlasSampleCount ?? DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    10
  );
  const sourceQuadraturePanelsPerSegment = Number.parseInt(
    options.sourceQuadraturePanelsPerSegment ??
      DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const valueQuadraturePanelsPerSegment = Number.parseInt(
    options.valueQuadraturePanelsPerSegment ??
      DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    10
  );
  const targetMarginFactor = Number(
    options.targetMarginFactor ?? DEFAULT_TARGET_MARGIN_FACTOR
  );
  const derivativeTailSampleCount = Number.parseInt(
    options.derivativeTailSampleCount ?? DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
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
  if (!Number.isInteger(sourceAtlasSampleCount) || sourceAtlasSampleCount < 16) {
    throw new Error("sourceAtlasSampleCount must be an integer >= 16");
  }
  if (
    !Number.isInteger(sourceQuadraturePanelsPerSegment) ||
    sourceQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("sourceQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isInteger(valueQuadraturePanelsPerSegment) ||
    valueQuadraturePanelsPerSegment < 32
  ) {
    throw new Error("valueQuadraturePanelsPerSegment must be an integer >= 32");
  }
  if (
    !Number.isFinite(targetMarginFactor) ||
    targetMarginFactor <= 0 ||
    targetMarginFactor > 1
  ) {
    throw new Error("targetMarginFactor must satisfy 0 < targetMarginFactor <= 1");
  }
  if (
    !Number.isInteger(derivativeTailSampleCount) ||
    derivativeTailSampleCount < 1
  ) {
    throw new Error("derivativeTailSampleCount must be an integer >= 1");
  }

  const bridgeCertificate =
    buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
      derivativeTailSampleCount,
    });
  const bridgeErrors =
    validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(
      bridgeCertificate
    );
  const targetAtlas =
    buildOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas({
      rootSubdivisions,
      scanSamplesPerCell,
      topologySamplesPerCell,
      derivativeSamplesPerCell,
      sourceAtlasSampleCount,
      sourceQuadraturePanelsPerSegment,
      valueQuadraturePanelsPerSegment,
      targetMarginFactor,
    });
  const targetAtlasErrors =
    validateOctahedralFoldAwareCrossBinaryForcingIntervalSignEnclosureTargetAtlas(
      targetAtlas
    );
  const endpointRows = buildBridgeEndpointEnclosureTargetRows({
    bridgeCertificate,
    targetMarginFactor,
  });
  const derivativeRows = buildDerivativeBridgeTargetRows(targetAtlas);
  const intervalRows = buildIntervalBridgePredicateRows({
    endpointRows,
    derivativeRows,
  });
  const reductionSummary = buildReductionSummary(intervalRows);
  const stated =
    bridgeErrors.length === 0 &&
    targetAtlasErrors.length === 0 &&
    endpointRows.length === 5 &&
    derivativeRows.length === 2 &&
    reductionSummary.status === "interval-bridge-predicate-reduction-stated";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.md",
    source_bridge_predicate_certificate_check: {
      schema: bridgeCertificate.schema,
      valid: bridgeErrors.length === 0,
      errors: bridgeErrors,
      theory_status: bridgeCertificate.result.theory_status,
      retained_branch: bridgeCertificate.result.retained_branch,
      sampled_bridge_predicates_certified:
        bridgeCertificate.artifact_claim.certifies_sampled_bridge_predicates ===
        true,
      certifies_interval_bridge_predicates:
        bridgeCertificate.artifact_claim.certifies_interval_bridge_predicates ===
        true,
    },
    source_interval_target_atlas_check: {
      schema: targetAtlas.schema,
      valid: targetAtlasErrors.length === 0,
      errors: targetAtlasErrors,
      theory_status: targetAtlas.result.theory_status,
      retained_branch: targetAtlas.result.retained_branch,
      emits_interval_sign_enclosure_targets:
        targetAtlas.artifact_claim.emits_interval_sign_enclosure_targets === true,
      certifies_interval_sign_topology:
        targetAtlas.artifact_claim.certifies_interval_sign_topology === true,
    },
    interval_bridge_parameters: {
      receiver_label: "1+",
      theta_domain: "[0,H/4]",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_estimate: bridgeCertificate.bridge_parameters.speed_ratio_estimate,
      speed_ratio_enclosure:
        bridgeCertificate.bridge_parameters.speed_ratio_enclosure,
      root_subdivisions: rootSubdivisions,
      scan_samples_per_cell: scanSamplesPerCell,
      topology_samples_per_cell: topologySamplesPerCell,
      derivative_samples_per_cell: derivativeSamplesPerCell,
      source_atlas_sample_count: sourceAtlasSampleCount,
      source_quadrature_panels_per_segment: sourceQuadraturePanelsPerSegment,
      value_quadrature_panels_per_segment: valueQuadraturePanelsPerSegment,
      target_margin_factor: formatSmallNumber(targetMarginFactor),
      derivative_tail_sample_count: derivativeTailSampleCount,
    },
    interval_bridge_reduction_theorem: buildIntervalBridgeReductionTheorem(),
    bridge_endpoint_enclosure_target_rows: endpointRows,
    bridge_derivative_target_rows: derivativeRows,
    interval_bridge_predicate_reduction_rows: intervalRows,
    interval_bridge_reduction_summary: reductionSummary,
    interval_profile_boundary: {
      certifies_interval_bridge_predicate_reduction_theorem: stated,
      emits_bridge_endpoint_enclosure_targets: stated,
      imports_bridge_derivative_enclosure_targets: stated,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      open_quantities: [
        "outward-rounded endpoint sign enclosures for the five bridge endpoint rows",
        "outward-rounded derivative-sign enclosures for the two I2 bridge derivative rows",
        "regular-subcell and fold-collar interval sign topology on one shared source atlas",
        "candidate-value interval quadrature",
      ],
      status: "interval-bridge-predicate-reduction-stated-interval-bridge-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_interval_bridge_predicate_reduction_theorem: stated,
      emits_bridge_endpoint_enclosure_targets: stated,
      imports_bridge_derivative_enclosure_targets: stated,
      emits_interval_bridge_predicate_radius_budgets: stated,
      certifies_interval_bridge_predicates: false,
      certifies_interval_sign_topology: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "interval bridge-predicate reduction theorem with inherited endpoint and derivative radius budgets; actual interval enclosures and retained branch status remain open",
    },
    result: {
      theory_status: stated
        ? "source-atlas-aware-interval-bridge-predicate-reduction-stated"
        : "source-atlas-aware-interval-bridge-predicate-reduction-open",
      first_successor_row:
        "source-atlas-aware-outward-rounded-bridge-predicate-enclosures-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The bridge gap is now reduced to seven finite interval rows: five endpoint forcing enclosures and two imported I2 derivative-sign enclosures. The weakest inherited bridge target is the I2 turn-bridge positive left-bracket row.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA,
    "schema must match interval bridge predicate reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match interval bridge predicate reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.source_bridge_predicate_certificate_check?.valid === true &&
      artifact?.source_bridge_predicate_certificate_check
        ?.sampled_bridge_predicates_certified === true &&
      artifact?.source_bridge_predicate_certificate_check
        ?.certifies_interval_bridge_predicates === false,
    "source bridge predicate certificate must validate without interval bridge claims",
    errors
  );
  assertField(
    artifact?.source_interval_target_atlas_check?.valid === true &&
      artifact?.source_interval_target_atlas_check
        ?.emits_interval_sign_enclosure_targets === true &&
      artifact?.source_interval_target_atlas_check
        ?.certifies_interval_sign_topology === false,
    "source interval target atlas must validate without interval topology claims",
    errors
  );
  assertField(
    artifact?.interval_bridge_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "interval bridge reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.interval_bridge_parameters?.speed_band === undefined &&
      artifact?.interval_bridge_parameters?.speed_window === undefined &&
      artifact?.interval_bridge_parameters?.speed_min === undefined &&
      artifact?.interval_bridge_parameters?.speed_max === undefined,
    "interval bridge parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.interval_bridge_reduction_theorem?.proof_status ===
      "conditional-interval-bridge-predicate-reduction-stated" &&
      artifact?.interval_bridge_reduction_theorem?.proof_steps?.length === 5,
    "interval bridge reduction theorem must state the five proof steps",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_endpoint_enclosure_target_rows) &&
      artifact.bridge_endpoint_enclosure_target_rows.length === 5 &&
      artifact.bridge_endpoint_enclosure_target_rows.every(
        (row) => row.status === "bridge-endpoint-sign-enclosure-target-staged"
      ),
    "artifact must emit five bridge endpoint sign enclosure targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.bridge_derivative_target_rows) &&
      artifact.bridge_derivative_target_rows.map((row) => row.source_target_id).join("|") ===
        "I2.derivative-positive.before-turn|I2.derivative-negative.after-turn",
    "artifact must import the two I2 derivative bridge targets",
    errors
  );
  assertField(
    Array.isArray(artifact?.interval_bridge_predicate_reduction_rows) &&
      artifact.interval_bridge_predicate_reduction_rows
        .map((row) => row.interval_bridge_predicate_id)
        .join("|") ===
        "theta_3plus.regular-entry-positive|I2.turn-bridge-forcing-positive|theta_2minus.regular-exit-negative" &&
      artifact.interval_bridge_predicate_reduction_rows.every(
        (row) =>
          row.status === "interval-bridge-predicate-reduction-stated" &&
          Number(row.inherited_target_radius_budget) > 0
      ),
    "artifact must state the three interval bridge predicate reductions with positive budgets",
    errors
  );
  assertField(
    artifact?.interval_bridge_reduction_summary
      ?.interval_bridge_predicate_count === 3 &&
      artifact?.interval_bridge_reduction_summary
        ?.interval_bridge_predicate_reduction_stated_count === 3 &&
      artifact?.interval_bridge_reduction_summary?.weakest_bridge_predicate_id ===
        "I2.turn-bridge-forcing-positive" &&
      artifact?.interval_bridge_reduction_summary?.status ===
        "interval-bridge-predicate-reduction-stated",
    "summary must identify the I2 turn bridge as the weakest inherited bridge budget",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_interval_bridge_predicate_reduction_theorem === true &&
      artifact?.artifact_claim?.emits_bridge_endpoint_enclosure_targets === true &&
      artifact?.artifact_claim?.imports_bridge_derivative_enclosure_targets ===
        true &&
      artifact?.artifact_claim?.certifies_interval_bridge_predicates === false &&
      artifact?.artifact_claim?.certifies_interval_sign_topology === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must state only the reduction theorem and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-interval-bridge-predicate-reduction-stated" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be interval bridge reduction stated and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-interval-bridge-predicate-reduction.mjs [options]",
    "",
    "Options:",
    "  --topology-samples-per-cell <n>    Regular-cell forcing topology samples per cell (default: 48)",
    "  --derivative-samples-per-cell <n>  Source derivative atlas samples per cell (default: 8)",
    "  --derivative-tail-samples <n>      Fold-collar derivative tail samples (default: 4)",
    "  --scan-subdivisions <n>            Primitive critical scan samples per cell (default: 96)",
    "  --source-atlas-samples <n>         Source fold atlas samples (default: 64)",
    "  --source-quadrature-panels <n>     Source critical-value quadrature panels per segment (default: 96)",
    "  --value-quadrature-panels <n>      Candidate-value quadrature panels per segment (default: 384)",
    "  --target-margin-factor <x>         Target radius factor applied to sampled budgets (default: 0.5)",
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
    derivativeTailSampleCount: DEFAULT_DERIVATIVE_TAIL_SAMPLE_COUNT,
    scanSamplesPerCell: DEFAULT_SCAN_SAMPLES_PER_CELL,
    sourceAtlasSampleCount: DEFAULT_SOURCE_ATLAS_SAMPLE_COUNT,
    sourceQuadraturePanelsPerSegment: DEFAULT_SOURCE_QUADRATURE_PANELS_PER_SEGMENT,
    valueQuadraturePanelsPerSegment: DEFAULT_VALUE_QUADRATURE_PANELS_PER_SEGMENT,
    targetMarginFactor: DEFAULT_TARGET_MARGIN_FACTOR,
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
    } else if (arg === "--derivative-tail-samples") {
      args.derivativeTailSampleCount = argv[(index += 1)];
    } else if (arg === "--scan-subdivisions") {
      args.scanSamplesPerCell = argv[(index += 1)];
    } else if (arg === "--source-atlas-samples") {
      args.sourceAtlasSampleCount = argv[(index += 1)];
    } else if (arg === "--source-quadrature-panels") {
      args.sourceQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--value-quadrature-panels") {
      args.valueQuadraturePanelsPerSegment = argv[(index += 1)];
    } else if (arg === "--target-margin-factor") {
      args.targetMarginFactor = argv[(index += 1)];
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_INTERVAL_BRIDGE_PREDICATE_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(
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
    buildOctahedralFoldAwareCrossBinaryIntervalBridgePredicateReduction(args);
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

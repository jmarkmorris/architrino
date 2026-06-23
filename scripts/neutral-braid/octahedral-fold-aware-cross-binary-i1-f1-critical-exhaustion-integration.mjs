#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition,
  validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition,
} from "./octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
  validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
} from "./octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_f1_critical_exhaustion_integration";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS = 5;
const DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS = 3;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const DEFAULT_MAX_BISECTION_STEPS = 80;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_CELL_LEFT_ENDPOINT = 0;
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const THETA_3_MINUS = 0.997370655243;
const RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-f1-critical-exhaustion-integration-certified";
const SUCCESSOR_ROW = "I1.complement-sign-exclusion-interval-enclosures-required";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function intervalContains(outer, inner) {
  return (
    Number(inner?.[0]) >= Number(outer?.[0]) &&
    Number(inner?.[1]) <= Number(outer?.[1])
  );
}

function buildComplementRows() {
  return [
    {
      row_id: "I1.left-complement.forcing-positive",
      interval: [
        formatSmallNumber(I1_CELL_LEFT_ENDPOINT),
        formatSmallNumber(I1_LEFT_ENDPOINT),
      ],
      expected_sign: "+",
      proof_role:
        "exclude a hidden primitive-critical point before the certified I1.f1 bracket zero",
      required_interval_predicate: "f_cross(theta)>0 on [0,a1]",
      status: "open-complement-sign-enclosure-required",
    },
    {
      row_id: "I1.right-complement.forcing-negative",
      interval: [
        formatSmallNumber(I1_RIGHT_ENDPOINT),
        formatSmallNumber(THETA_3_MINUS),
      ],
      expected_sign: "-",
      proof_role:
        "exclude a hidden primitive-critical point after the certified I1.f1 bracket zero and before the theta_3- fold endpoint",
      required_interval_predicate: "f_cross(theta)<0 on [b1,theta_3-]",
      status: "open-complement-sign-enclosure-required",
    },
  ];
}

function buildIntegrationTheorem() {
  return {
    theorem_id: "i1-f1-critical-exhaustion-integration",
    theorem_scope:
      "representative receiver 1+ I1 primitive-critical contribution",
    statement:
      "Since A_cross'(theta)=f_cross(theta), the certified unique I1.f1 bracket zero is the unique I1 regular primitive-critical point once the two I1 complement sign exclusions are certified: f_cross>0 on [0,a1] and f_cross<0 on [b1,theta_3-].",
    proof_steps: [
      "Import the I1.f1 full bracket zero-isolation composition: exactly one zero u1 lies in [a1,b1].",
      "Use A_cross'=f_cross on the compact regular I1 cell away from the theta_3- fold endpoint.",
      "If f_cross>0 on [0,a1], no primitive-critical point can occur on the left complement.",
      "If f_cross<0 on [b1,theta_3-], no primitive-critical point can occur on the right complement.",
      "Therefore the I1 regular-cell contribution to the primitive critical list is exactly {u1}.",
      "The present packet closes the integration reduction only; the two complement sign enclosures, I2/I3 rows, fold-collar rows, interval quadrature, and retained branch status remain open.",
    ],
    proof_status: "i1-f1-critical-exhaustion-integration-reduction-certified",
  };
}

function buildIntegrationSummary({ zeroIsolationPacket, speedEnvelopePacket }) {
  const zeroSummary =
    zeroIsolationPacket.full_interval_zero_isolation_composition_summary;
  const rootSummary = speedEnvelopePacket.root_branch_summary;
  const bracketInterval = zeroSummary.bracket_interval ?? [
    formatSmallNumber(I1_LEFT_ENDPOINT),
    formatSmallNumber(I1_RIGHT_ENDPOINT),
  ];
  const sampledRootEnvelope = rootSummary.root_theta_envelope;
  const complementRows = buildComplementRows();
  const zeroIsolationCertified =
    zeroSummary.status ===
      "i1-f1-full-interval-zero-isolation-composition-certified" &&
    zeroIsolationPacket.artifact_claim
      .certifies_I1_f1_full_interval_zero_isolation === true &&
    zeroIsolationPacket.artifact_claim.certifies_I1_zero_isolation === false;
  const speedEnvelopeCertified =
    rootSummary.status === "i1-f1-zero-isolation-speed-envelope-scan-certified" &&
    speedEnvelopePacket.artifact_claim
      .certifies_I1_f1_root_branch_speed_envelope_scan === true &&
    speedEnvelopePacket.artifact_claim
      .certifies_I1_f1_full_interval_zero_isolation === false;
  const sampledEnvelopeInsideCertifiedBracket = intervalContains(
    bracketInterval,
    sampledRootEnvelope
  );
  const certified =
    zeroIsolationCertified &&
    speedEnvelopeCertified &&
    sampledEnvelopeInsideCertifiedBracket;

  return {
    integration_row_id: "I1.f1.critical-exhaustion-integration",
    zero_row_id: "I1.f1",
    primitive_derivative_identity: "A_cross'(theta)=f_cross(theta)",
    i1_regular_cell_interval: [
      formatSmallNumber(I1_CELL_LEFT_ENDPOINT),
      formatSmallNumber(THETA_3_MINUS),
    ],
    certified_unique_zero_bracket: bracketInterval,
    theorem_grade_candidate_location_interval: bracketInterval,
    sampled_speed_envelope_location_interval: sampledRootEnvelope,
    sampled_speed_envelope_root_span: rootSummary.root_theta_span,
    sampled_root_derivative_envelope: rootSummary.root_derivative_envelope,
    sampled_root_branch_monotone_decreasing_in_speed:
      rootSummary.sampled_root_branch_monotone_decreasing_in_speed,
    sampled_envelope_inside_certified_bracket:
      sampledEnvelopeInsideCertifiedBracket,
    complement_sign_exclusion_rows: complementRows,
    remaining_i1_complement_row_count: complementRows.length,
    i1_zero_isolation_target_removed_from_open_bottleneck:
      zeroIsolationCertified,
    i1_regular_critical_exhaustion_implication:
      "unique zero in [a1,b1] plus f_cross>0 on [0,a1] plus f_cross<0 on [b1,theta_3-] implies Crit(A_cross;I1)={u1}",
    claim_boundary:
      "This integrates the certified I1.f1 bracket zero into the critical-exhaustion map. It does not certify the two complement sign enclosures, global I1 sign topology, interval critical exhaustion, interval quadrature, or retained branch status.",
    status: certified
      ? "i1-f1-critical-exhaustion-integration-reduction-certified"
      : "i1-f1-critical-exhaustion-integration-reduction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
    10
  );
  const endpointSpeedSampleCount = Number.parseInt(
    options.endpointSpeedSampleCount ?? DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    10
  );
  const zeroBranchSpeedSampleCount = Number.parseInt(
    options.zeroBranchSpeedSampleCount ?? DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    10
  );
  const derivativeThetaSampleCount = Number.parseInt(
    options.derivativeThetaSampleCount ?? DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    10
  );
  const thetaCellCount = Number.parseInt(
    options.thetaCellCount ?? DEFAULT_THETA_CELL_COUNT,
    10
  );
  const speedCellCount = Number.parseInt(
    options.speedCellCount ?? DEFAULT_SPEED_CELL_COUNT,
    10
  );
  const parentStencilSamplesPerAxis = Number.parseInt(
    options.parentStencilSamplesPerAxis ??
      DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    10
  );
  const refinementSamplesPerSubcellAxis = Number.parseInt(
    options.refinementSamplesPerSubcellAxis ??
      DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    10
  );
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const bisectionTolerance = Number(
    options.bisectionTolerance ?? DEFAULT_BISECTION_TOLERANCE
  );
  const maxBisectionSteps = Number.parseInt(
    options.maxBisectionSteps ?? DEFAULT_MAX_BISECTION_STEPS,
    10
  );
  const progressCallback =
    typeof options.progressCallback === "function"
      ? options.progressCallback
      : null;

  if (!Number.isInteger(rootSubdivisions) || rootSubdivisions < 100) {
    throw new Error("rootSubdivisions must be an integer >= 100");
  }
  if (
    !Number.isInteger(endpointSpeedSampleCount) ||
    endpointSpeedSampleCount < 3
  ) {
    throw new Error("endpointSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(zeroBranchSpeedSampleCount) ||
    zeroBranchSpeedSampleCount < 3
  ) {
    throw new Error("zeroBranchSpeedSampleCount must be an integer >= 3");
  }
  if (
    !Number.isInteger(derivativeThetaSampleCount) ||
    derivativeThetaSampleCount < 8
  ) {
    throw new Error("derivativeThetaSampleCount must be an integer >= 8");
  }
  if (!Number.isInteger(thetaCellCount) || thetaCellCount < 1) {
    throw new Error("thetaCellCount must be a positive integer");
  }
  if (!Number.isInteger(speedCellCount) || speedCellCount < 1) {
    throw new Error("speedCellCount must be a positive integer");
  }
  if (
    !Number.isInteger(parentStencilSamplesPerAxis) ||
    parentStencilSamplesPerAxis < 3 ||
    parentStencilSamplesPerAxis % 2 !== 1
  ) {
    throw new Error("parentStencilSamplesPerAxis must be an odd integer >= 3");
  }
  if (
    !Number.isInteger(refinementSamplesPerSubcellAxis) ||
    refinementSamplesPerSubcellAxis < 2
  ) {
    throw new Error("refinementSamplesPerSubcellAxis must be an integer >= 2");
  }
  if (!Number.isFinite(endpointPadding) || endpointPadding <= 0) {
    throw new Error("endpointPadding must be positive");
  }
  if (!Number.isFinite(machinePadding) || machinePadding <= 0) {
    throw new Error("machinePadding must be positive");
  }
  if (!Number.isFinite(bisectionTolerance) || bisectionTolerance <= 0) {
    throw new Error("bisectionTolerance must be positive");
  }
  if (!Number.isInteger(maxBisectionSteps) || maxBisectionSteps < 20) {
    throw new Error("maxBisectionSteps must be an integer >= 20");
  }

  const zeroIsolationPacket =
    options.zeroIsolationPacket ??
    buildOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      {
        rootSubdivisions,
        endpointSpeedSampleCount,
        zeroBranchSpeedSampleCount,
        derivativeThetaSampleCount,
        thetaCellCount,
        speedCellCount,
        parentStencilSamplesPerAxis,
        refinementSamplesPerSubcellAxis,
        endpointPadding,
        machinePadding,
        bisectionTolerance,
        progressCallback,
      }
    );
  const zeroIsolationErrors =
    validateOctahedralFoldAwareCrossBinaryI1F1FullIntervalZeroIsolationComposition(
      zeroIsolationPacket
    );

  const speedEnvelopePacket =
    options.speedEnvelopePacket ??
    buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
      rootSubdivisions,
      speedSampleCount: zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
      maxBisectionSteps,
    });
  const speedEnvelopeErrors =
    validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
      speedEnvelopePacket
    );

  const integrationSummary = buildIntegrationSummary({
    zeroIsolationPacket,
    speedEnvelopePacket,
  });
  const certified =
    zeroIsolationErrors.length === 0 &&
    speedEnvelopeErrors.length === 0 &&
    integrationSummary.status ===
      "i1-f1-critical-exhaustion-integration-reduction-certified";
  const openQuantityNames = [
    "I1_left_complement_forcing_positive_enclosure",
    "I1_right_complement_forcing_negative_enclosure",
    "global_I1_interval_sign_topology",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ];

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.md",
    zero_isolation_composition_check: {
      schema: zeroIsolationPacket.schema,
      valid: zeroIsolationErrors.length === 0,
      errors: zeroIsolationErrors,
      theory_status: zeroIsolationPacket.result.theory_status,
      first_successor_row: zeroIsolationPacket.result.first_successor_row,
      certifies_I1_f1_full_interval_zero_isolation:
        zeroIsolationPacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      certifies_I1_zero_isolation:
        zeroIsolationPacket.artifact_claim.certifies_I1_zero_isolation === true,
      retained_branch: zeroIsolationPacket.result.retained_branch,
      summary:
        zeroIsolationPacket.full_interval_zero_isolation_composition_summary,
    },
    speed_envelope_location_check: {
      schema: speedEnvelopePacket.schema,
      valid: speedEnvelopeErrors.length === 0,
      errors: speedEnvelopeErrors,
      theory_status: speedEnvelopePacket.result.theory_status,
      certifies_I1_f1_root_branch_speed_envelope_scan:
        speedEnvelopePacket.artifact_claim
          .certifies_I1_f1_root_branch_speed_envelope_scan === true,
      certifies_I1_f1_full_interval_zero_isolation:
        speedEnvelopePacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      retained_branch: speedEnvelopePacket.result.retained_branch,
      summary: speedEnvelopePacket.root_branch_summary,
    },
    integration_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      primitive_derivative_identity: "A_cross'(theta)=f_cross(theta)",
      theta_domain: "[0,H/4]",
      i1_regular_cell_interval: [
        formatSmallNumber(I1_CELL_LEFT_ENDPOINT),
        formatSmallNumber(THETA_3_MINUS),
      ],
      bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      endpoint_speed_sample_count: endpointSpeedSampleCount,
      zero_branch_speed_sample_count: zeroBranchSpeedSampleCount,
      derivative_theta_sample_count: derivativeThetaSampleCount,
      theta_cell_count: thetaCellCount,
      speed_cell_count: speedCellCount,
      parent_stencil_samples_per_axis: parentStencilSamplesPerAxis,
      refinement_samples_per_subcell_axis: refinementSamplesPerSubcellAxis,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
      max_bisection_steps: maxBisectionSteps,
    },
    i1_f1_critical_exhaustion_integration_theorem:
      buildIntegrationTheorem(),
    critical_exhaustion_integration_summary: integrationSummary,
    interval_profile_boundary: {
      certifies_I1_f1_critical_exhaustion_integration: certified,
      certifies_I1_f1_full_interval_zero_isolation: certified,
      certifies_I1_f1_theorem_grade_candidate_location_interval: certified,
      certifies_I1_f1_sampled_speed_envelope_location_interval: certified,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_I1_zero_isolation: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      status: certified
        ? "i1-f1-zero-integrated-i1-complements-quadrature-retention-open"
        : "i1-f1-critical-exhaustion-integration-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_f1_zero_isolation_into_critical_exhaustion_map: certified,
      certifies_I1_f1_critical_exhaustion_integration: certified,
      certifies_I1_f1_full_interval_zero_isolation: certified,
      certifies_I1_f1_theorem_grade_candidate_location_interval: certified,
      certifies_I1_f1_sampled_speed_envelope_location_interval: certified,
      certifies_I1_regular_critical_exhaustion: false,
      certifies_I1_zero_isolation: false,
      certifies_global_I1_interval_sign_topology: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      open_quantity_names: openQuantityNames,
      retained_branch: false,
      claim_level:
        "I1.f1 bracket zero isolation is integrated into the primitive critical-exhaustion map. I1 regular critical exhaustion still requires left and right complement sign enclosures; interval quadrature and retained branch status remain open.",
    },
    result: {
      theory_status: certified
        ? RESULT_THEORY_STATUS
        : "source-atlas-aware-i1-f1-critical-exhaustion-integration-open",
      first_successor_row: SUCCESSOR_ROW,
      residual_subobligation:
        "certify f_cross>0 on [0,a1] and f_cross<0 on [b1,theta_3-], then compose with the remaining I2/I3, fold-collar, quadrature, and retention rows",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1.f1 bracket zero is no longer a live zero-isolation bottleneck. The live I1 critical-exhaustion burden is the two complement sign exclusions outside the certified bracket, followed by global critical exhaustion, interval quadrature, and branch-retention decisions.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA,
    "schema must match I1.f1 critical-exhaustion integration schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1.f1 critical-exhaustion integration packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.zero_isolation_composition_check?.valid === true &&
      artifact?.zero_isolation_composition_check
        ?.certifies_I1_f1_full_interval_zero_isolation === true &&
      artifact?.zero_isolation_composition_check?.certifies_I1_zero_isolation ===
        false,
    "zero-isolation predecessor must validate I1.f1 full bracket zero isolation without claiming global I1 zero isolation",
    errors
  );
  assertField(
    artifact?.speed_envelope_location_check?.valid === true &&
      artifact?.speed_envelope_location_check
        ?.certifies_I1_f1_root_branch_speed_envelope_scan === true &&
      artifact?.speed_envelope_location_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false,
    "speed-envelope predecessor must validate only the sampled root-location scan",
    errors
  );
  assertField(
    artifact?.integration_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1.f1 critical-exhaustion integration must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.integration_parameters?.speed_band === undefined &&
      artifact?.integration_parameters?.speed_window === undefined &&
      artifact?.integration_parameters?.speed_min === undefined &&
      artifact?.integration_parameters?.speed_max === undefined,
    "integration parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.critical_exhaustion_integration_summary?.status ===
      "i1-f1-critical-exhaustion-integration-reduction-certified" &&
      artifact?.critical_exhaustion_integration_summary
        ?.i1_zero_isolation_target_removed_from_open_bottleneck === true &&
      artifact?.critical_exhaustion_integration_summary
        ?.sampled_envelope_inside_certified_bracket === true &&
      artifact?.critical_exhaustion_integration_summary
        ?.remaining_i1_complement_row_count === 2,
    "integration summary must reduce I1.f1 critical exhaustion to the two complement sign exclusions",
    errors
  );
  assertField(
    Array.isArray(
      artifact?.critical_exhaustion_integration_summary
        ?.complement_sign_exclusion_rows
    ) &&
      artifact.critical_exhaustion_integration_summary
        .complement_sign_exclusion_rows.length === 2 &&
      artifact.critical_exhaustion_integration_summary
        .complement_sign_exclusion_rows[0]?.row_id ===
        "I1.left-complement.forcing-positive" &&
      artifact.critical_exhaustion_integration_summary
        .complement_sign_exclusion_rows[1]?.row_id ===
        "I1.right-complement.forcing-negative" &&
      artifact.critical_exhaustion_integration_summary
        .complement_sign_exclusion_rows.every(
          (row) => row.status === "open-complement-sign-enclosure-required"
        ),
    "complement rows must name the remaining left/right I1 sign exclusions",
    errors
  );
  assertField(
    artifact?.i1_f1_critical_exhaustion_integration_theorem?.proof_status ===
      "i1-f1-critical-exhaustion-integration-reduction-certified",
    "integration theorem must be certified as a reduction, not full critical exhaustion",
    errors
  );
  assertField(
    artifact?.interval_profile_boundary
      ?.certifies_I1_f1_critical_exhaustion_integration === true &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_f1_full_interval_zero_isolation === true &&
      artifact?.interval_profile_boundary
        ?.certifies_I1_regular_critical_exhaustion === false &&
      artifact?.interval_profile_boundary?.certifies_I1_zero_isolation ===
        false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_critical_exhaustion === false &&
      artifact?.interval_profile_boundary
        ?.certifies_interval_quadrature_enclosure === false,
    "interval boundary must integrate I1.f1 while leaving I1/global critical exhaustion and quadrature open",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.composes_I1_f1_zero_isolation_into_critical_exhaustion_map === true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_critical_exhaustion_integration === true &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        true &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_global_I1_interval_sign_topology ===
        false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.certifies_interval_quadrature_enclosure ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must integrate only the I1.f1 zero and keep complement, interval, quadrature, and retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status === RESULT_THEORY_STATUS &&
      artifact?.result?.first_successor_row === SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must advance the successor to I1 complement sign exclusions without retaining the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.mjs [options]",
    "",
    "Options:",
    "  --out <path>                         Write artifact JSON to path",
    "  --validate <path>                    Validate an existing artifact JSON file",
    "  --print-schema                       Print the artifact schema",
    "  --pretty                             Pretty-print JSON",
    "  --root-subdivisions <n>              Source root subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>         Endpoint sign speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>      Zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>       Derivative theta samples (default: 48)",
    "  --theta-cells <n>                    Bracket theta cells (default: 16)",
    "  --speed-cells <n>                    Speed-ratio cells (default: 8)",
    "  --parent-stencil-samples <n>         Odd parent stencil samples per axis (default: 5)",
    "  --refinement-samples <n>             Refinement samples per subcell axis (default: 3)",
    "  --endpoint-padding <x>               Endpoint padding (default: 1e-5)",
    "  --machine-padding <x>                Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>            Root bisection tolerance (default: 1e-12)",
    "  --max-bisection-steps <n>            Maximum bisection steps (default: 80)",
    "  --help                               Show this help",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    outPath: null,
    validatePath: null,
    pretty: false,
    printSchema: false,
    help: false,
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    endpointSpeedSampleCount: DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    zeroBranchSpeedSampleCount: DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    thetaCellCount: DEFAULT_THETA_CELL_COUNT,
    speedCellCount: DEFAULT_SPEED_CELL_COUNT,
    parentStencilSamplesPerAxis: DEFAULT_PARENT_STENCIL_SAMPLES_PER_AXIS,
    refinementSamplesPerSubcellAxis: DEFAULT_REFINEMENT_SAMPLES_PER_SUBCELL_AXIS,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
    maxBisectionSteps: DEFAULT_MAX_BISECTION_STEPS,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--print-schema" || arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--root-subdivisions") {
      args.rootSubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-speed-samples") {
      args.endpointSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--zero-branch-speed-samples") {
      args.zeroBranchSpeedSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--derivative-theta-samples") {
      args.derivativeThetaSampleCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--theta-cells") {
      args.thetaCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--speed-cells") {
      args.speedCellCount = Number.parseInt(argv[++index], 10);
    } else if (arg === "--parent-stencil-samples") {
      args.parentStencilSamplesPerAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--refinement-samples") {
      args.refinementSamplesPerSubcellAxis = Number.parseInt(argv[++index], 10);
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--max-bisection-steps") {
      args.maxBisectionSteps = Number.parseInt(argv[++index], 10);
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument ${arg}`);
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
  if (args.printSchema) {
    console.log(
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_F1_CRITICAL_EXHAUSTION_INTEGRATION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
        artifact
      );
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log("ok");
    }
    return;
  }

  const artifact =
    buildOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration({
      rootSubdivisions: args.rootSubdivisions,
      endpointSpeedSampleCount: args.endpointSpeedSampleCount,
      zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount: args.derivativeThetaSampleCount,
      thetaCellCount: args.thetaCellCount,
      speedCellCount: args.speedCellCount,
      parentStencilSamplesPerAxis: args.parentStencilSamplesPerAxis,
      refinementSamplesPerSubcellAxis: args.refinementSamplesPerSubcellAxis,
      endpointPadding: args.endpointPadding,
      machinePadding: args.machinePadding,
      bisectionTolerance: args.bisectionTolerance,
      maxBisectionSteps: args.maxBisectionSteps,
    });
  const errors =
    validateOctahedralFoldAwareCrossBinaryI1F1CriticalExhaustionIntegration(
      artifact
    );
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  const json = JSON.stringify(artifact, null, args.pretty ? 2 : 0);
  if (args.outPath) {
    fs.mkdirSync(path.dirname(args.outPath), { recursive: true });
    fs.writeFileSync(args.outPath, `${json}\n`);
  } else {
    console.log(json);
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

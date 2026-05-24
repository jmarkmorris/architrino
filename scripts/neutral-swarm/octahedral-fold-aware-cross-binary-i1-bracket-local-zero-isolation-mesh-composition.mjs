#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
  validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
  validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure,
} from "./octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_bracket_local_zero_isolation_mesh_composition";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function findEndpointRow(forcingPacket, endpointId) {
  return forcingPacket.endpoint_enclosure_rows.find(
    (row) => row.endpoint_id === endpointId
  );
}

function buildBracketLocalZeroIsolationMeshTheorem() {
  return {
    theorem_id: "i1-f1-bracket-local-zero-isolation-mesh-composition",
    theorem_scope:
      "sampled-stencil monotone zero composition on the representative I1.f1 bracket",
    statement:
      "The I1 endpoint point-sign certificate and the I1.f1 bracket derivative mesh barrier compose into a sampled-stencil monotone-zero certificate: endpoint signs give existence on the bracket, the negative local derivative upper barrier gives at-most-one-zero under the mesh-barrier contract, and the sampled root branch locates the root across the certified speed-ratio enclosure. This is not a directed-rounding interval zero-isolation theorem.",
    proof_steps: [
      "Import the I1 forcing-bracket endpoint sign certificate f_cross(a1)>0>f_cross(b1).",
      "Import the I1.f1 bracket-local derivative mesh barrier and require its local derivative upper barrier to stay negative on every bracket mesh cell.",
      "Use the endpoint signs for sampled-stencil existence of a bracket zero.",
      "Use the negative derivative mesh barrier as the local monotonicity contract, hence at most one bracket zero under that contract.",
      "Import the sampled I1.f1 root branch to locate the zero branch and retain the six-root source-atlas signature.",
      "Conclude only a sampled-stencil monotone-zero composition; leave full directed-rounding interval derivative enclosure, full I1.f1 interval zero isolation, critical exhaustion, quadrature, and retention open.",
    ],
    proof_status:
      "sampled-stencil-bracket-local-zero-isolation-mesh-composition-certified",
  };
}

function buildCompositionSummary({ forcingPacket, derivativeMeshPacket }) {
  const leftEndpoint = findEndpointRow(forcingPacket, "I1.f1.left");
  const rightEndpoint = findEndpointRow(forcingPacket, "I1.f1.right");
  const forcingSummary = forcingPacket.envelope_summary;
  const meshSummary = derivativeMeshPacket.barrier_summary;
  const rootSummary =
    derivativeMeshPacket.zero_isolation_scan_check.root_branch_summary;
  const rootThetaEnvelope = rootSummary.root_theta_envelope;
  const endpointSignsForceExistence =
    forcingSummary.status === "i1-forcing-bracket-speed-envelope-certified" &&
    Number(leftEndpoint?.forcing_enclosure?.[0]) > 0 &&
    Number(rightEndpoint?.forcing_enclosure?.[1]) < 0;
  const derivativeBarrierForcesAtMostOneZero =
    meshSummary.status === "i1-f1-bracket-derivative-mesh-barrier-certified" &&
    Number(meshSummary.max_local_derivative_upper_barrier_stencil) < 0;
  const sampledRootBranchLocatesZero =
    derivativeMeshPacket.zero_isolation_scan_check.valid === true &&
    rootSummary.status === "i1-f1-zero-isolation-speed-envelope-scan-certified";
  const certified =
    endpointSignsForceExistence &&
    derivativeBarrierForcesAtMostOneZero &&
    sampledRootBranchLocatesZero;

  return {
    composition_row_id: "I1.f1.bracket-local-zero-isolation-mesh-composition",
    zero_row_id: "I1.f1",
    forcing_bracket_row_id: "I1.forcing-bracket",
    derivative_barrier_row_id: "I1.f1.bracket-local-derivative-mesh-barrier",
    bracket_interval: [
      formatSmallNumber(I1_LEFT_ENDPOINT),
      formatSmallNumber(I1_RIGHT_ENDPOINT),
    ],
    bracket_length: formatSmallNumber(I1_RIGHT_ENDPOINT - I1_LEFT_ENDPOINT),
    speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
    endpoint_sign_pattern: "+,-",
    left_endpoint_forcing_enclosure:
      forcingSummary.left_endpoint_forcing_enclosure,
    right_endpoint_forcing_enclosure:
      forcingSummary.right_endpoint_forcing_enclosure,
    minimum_endpoint_signed_clearance:
      forcingSummary.min_signed_clearance,
    mesh_row_count: meshSummary.mesh_row_count,
    certified_mesh_row_count: meshSummary.certified_mesh_row_count,
    maximum_local_derivative_upper_barrier_stencil:
      meshSummary.max_local_derivative_upper_barrier_stencil,
    minimum_derivative_signed_clearance:
      meshSummary.min_signed_barrier_clearance,
    sampled_root_theta_envelope: rootSummary.root_theta_envelope,
    minimum_root_clearance_from_left_endpoint: formatSmallNumber(
      Number(rootThetaEnvelope[0]) - I1_LEFT_ENDPOINT
    ),
    minimum_root_clearance_from_right_endpoint: formatSmallNumber(
      I1_RIGHT_ENDPOINT - Number(rootThetaEnvelope[1])
    ),
    sampled_root_derivative_envelope: rootSummary.root_derivative_envelope,
    source_root_counts: meshSummary.source_root_counts,
    term_root_count_signatures: meshSummary.term_root_count_signatures,
    endpoint_signs_force_existence: endpointSignsForceExistence,
    derivative_barrier_forces_at_most_one_zero_under_stencil_contract:
      derivativeBarrierForcesAtMostOneZero,
    sampled_root_branch_locates_zero: sampledRootBranchLocatesZero,
    composition_contract:
      "sampled-stencil monotonicity on the I1.f1 bracket; not an outward-rounded interval derivative or zero-isolation proof",
    status: certified
      ? "i1-f1-bracket-local-zero-isolation-mesh-composition-certified"
      : "i1-f1-bracket-local-zero-isolation-mesh-composition-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
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
  const endpointPadding = Number(
    options.endpointPadding ?? DEFAULT_ENDPOINT_PADDING
  );
  const machinePadding = Number(
    options.machinePadding ?? DEFAULT_MACHINE_PADDING
  );
  const bisectionTolerance = Number(
    options.bisectionTolerance ?? DEFAULT_BISECTION_TOLERANCE
  );

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
  if (!Number.isInteger(thetaCellCount) || thetaCellCount < 4) {
    throw new Error("thetaCellCount must be an integer >= 4");
  }
  if (!Number.isInteger(speedCellCount) || speedCellCount < 2) {
    throw new Error("speedCellCount must be an integer >= 2");
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

  const forcingPacket =
    buildOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure({
      rootSubdivisions,
      speedSampleCount: endpointSpeedSampleCount,
      machinePadding,
    });
  const derivativeMeshPacket =
    buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
      rootSubdivisions,
      zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      thetaCellCount,
      speedCellCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
    });
  const forcingErrors =
    validateOctahedralFoldAwareCrossBinaryI1ForcingBracketIntervalEnclosure(
      forcingPacket
    );
  const derivativeMeshErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
      derivativeMeshPacket
    );
  const compositionSummary = buildCompositionSummary({
    forcingPacket,
    derivativeMeshPacket,
  });
  const certified =
    forcingErrors.length === 0 &&
    derivativeMeshErrors.length === 0 &&
    forcingPacket.artifact_claim.certifies_I1_forcing_bracket_point_signs ===
      true &&
    derivativeMeshPacket.artifact_claim
      .certifies_I1_f1_bracket_derivative_mesh_barrier === true &&
    derivativeMeshPacket.artifact_claim
      .certifies_I1_f1_full_interval_zero_isolation === false &&
    compositionSummary.status ===
      "i1-f1-bracket-local-zero-isolation-mesh-composition-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.md",
    forcing_bracket_certificate_check: {
      schema: forcingPacket.schema,
      valid: forcingErrors.length === 0,
      errors: forcingErrors,
      theory_status: forcingPacket.result.theory_status,
      retained_branch: forcingPacket.result.retained_branch,
      certifies_I1_forcing_bracket_point_signs:
        forcingPacket.artifact_claim
          .certifies_I1_forcing_bracket_point_signs === true,
      certifies_I1_zero_isolation:
        forcingPacket.artifact_claim.certifies_I1_zero_isolation === true,
      envelope_summary: forcingPacket.envelope_summary,
    },
    derivative_mesh_barrier_check: {
      schema: derivativeMeshPacket.schema,
      valid: derivativeMeshErrors.length === 0,
      errors: derivativeMeshErrors,
      theory_status: derivativeMeshPacket.result.theory_status,
      retained_branch: derivativeMeshPacket.result.retained_branch,
      certifies_I1_f1_bracket_derivative_mesh_barrier:
        derivativeMeshPacket.artifact_claim
          .certifies_I1_f1_bracket_derivative_mesh_barrier === true,
      certifies_I1_f1_full_interval_zero_isolation:
        derivativeMeshPacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      certifies_interval_derivative_enclosure:
        derivativeMeshPacket.artifact_claim
          .certifies_interval_derivative_enclosure === true,
      barrier_summary: derivativeMeshPacket.barrier_summary,
      root_branch_summary:
        derivativeMeshPacket.zero_isolation_scan_check.root_branch_summary,
    },
    composition_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      theta_domain: "[0,H/4]",
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
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_bracket_local_zero_isolation_mesh_theorem: buildBracketLocalZeroIsolationMeshTheorem(),
    bracket_local_zero_isolation_mesh_composition_summary: compositionSummary,
    interval_profile_boundary: {
      certifies_I1_f1_bracket_local_zero_isolation_mesh_composition: certified,
      certifies_I1_f1_bracket_monotone_zero_composition: certified,
      certifies_I1_f1_sampled_stencil_unique_zero: certified,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding validation that the derivative mesh allowance dominates true variation",
        "directed-rounding derivative bounds on the full continuous compact I1 interval",
        "full I1.f1 interval zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-f1-bracket-local-zero-isolation-mesh-composition-certified-full-interval-zero-isolation-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      composes_I1_endpoint_signs_and_bracket_derivative_mesh_barrier: certified,
      certifies_I1_f1_bracket_local_zero_isolation_mesh_composition: certified,
      certifies_I1_f1_bracket_monotone_zero_composition: certified,
      certifies_I1_f1_sampled_stencil_unique_zero: certified,
      advances_I1_f1_zero_isolation: certified,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      certifies_C_m_Q_M_Q_interval_enclosure: false,
      certifies_cross_binary_coarea_interval_profile: false,
      certifies_representative_interval_profile: false,
      certifies_receiver_orbit_interval_clock_length_return: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        "I1.f1 bracket-local sampled-stencil monotone-zero composition; full continuous interval zero isolation, directed-rounding derivative enclosure, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-bracket-local-zero-isolation-mesh-composition-certified"
        : "source-atlas-aware-i1-f1-bracket-local-zero-isolation-mesh-composition-open",
      first_successor_row:
        "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "Endpoint signs and the bracket-local derivative mesh barrier now compose into a sampled-stencil monotone-zero certificate for I1.f1, but full interval zero isolation still requires directed-rounding derivative and composition enclosures.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA,
    "schema must match I1 bracket monotone zero composition schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 bracket monotone zero composition packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.forcing_bracket_certificate_check?.valid === true &&
      artifact?.forcing_bracket_certificate_check
        ?.certifies_I1_forcing_bracket_point_signs === true &&
      artifact?.forcing_bracket_certificate_check?.certifies_I1_zero_isolation ===
        false,
    "forcing bracket predecessor must certify endpoint signs without zero isolation",
    errors
  );
  assertField(
    artifact?.derivative_mesh_barrier_check?.valid === true &&
      artifact?.derivative_mesh_barrier_check
        ?.certifies_I1_f1_bracket_derivative_mesh_barrier === true &&
      artifact?.derivative_mesh_barrier_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false &&
      artifact?.derivative_mesh_barrier_check
        ?.certifies_interval_derivative_enclosure === false,
    "derivative mesh predecessor must certify only the bracket-local mesh barrier",
    errors
  );
  assertField(
    artifact?.composition_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 bracket monotone zero composition must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.composition_parameters?.speed_band === undefined &&
      artifact?.composition_parameters?.speed_window === undefined &&
      artifact?.composition_parameters?.speed_min === undefined &&
      artifact?.composition_parameters?.speed_max === undefined,
    "composition parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.bracket_local_zero_isolation_mesh_composition_summary?.status ===
      "i1-f1-bracket-local-zero-isolation-mesh-composition-certified" &&
      artifact?.bracket_local_zero_isolation_mesh_composition_summary
        ?.endpoint_signs_force_existence === true &&
      artifact?.bracket_local_zero_isolation_mesh_composition_summary
        ?.derivative_barrier_forces_at_most_one_zero_under_stencil_contract ===
        true &&
      artifact?.bracket_local_zero_isolation_mesh_composition_summary
        ?.sampled_root_branch_locates_zero === true &&
      Number(
        artifact?.bracket_local_zero_isolation_mesh_composition_summary
          ?.minimum_endpoint_signed_clearance
      ) > 0 &&
      Number(
        artifact?.bracket_local_zero_isolation_mesh_composition_summary
          ?.maximum_local_derivative_upper_barrier_stencil
      ) < 0 &&
      Number(
        artifact?.bracket_local_zero_isolation_mesh_composition_summary
          ?.minimum_derivative_signed_clearance
      ) > 0,
    "composition summary must certify endpoint existence plus bracket-local monotonicity under the stencil contract",
    errors
  );
  assertField(
    artifact?.bracket_local_zero_isolation_mesh_composition_summary?.term_root_count_signatures
      ?.length === 1 &&
      artifact?.bracket_local_zero_isolation_mesh_composition_summary
        ?.term_root_count_signatures?.[0] === "1,3,1,1",
    "composition summary must preserve the I1 source-root signature",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.composes_I1_endpoint_signs_and_bracket_derivative_mesh_barrier ===
      true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_local_zero_isolation_mesh_composition ===
        true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_monotone_zero_composition === true &&
      artifact?.artifact_claim?.certifies_I1_f1_sampled_stencil_unique_zero ===
        true &&
      artifact?.artifact_claim?.advances_I1_f1_zero_isolation === true &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only sampled-stencil monotone-zero composition and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-bracket-local-zero-isolation-mesh-composition-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be I1.f1 bracket-local zero-isolation mesh composition certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                    Source-root search subdivisions (default: 5000)",
    "  --endpoint-speed-samples <n>          Endpoint sign speed samples (default: 9)",
    "  --zero-branch-speed-samples <n>       Predecessor zero-branch speed samples (default: 9)",
    "  --derivative-theta-samples <n>        Predecessor derivative theta samples (default: 48)",
    "  --theta-cells <n>                     Bracket theta mesh cell count (default: 16)",
    "  --speed-cells <n>                     Speed-envelope mesh cell count (default: 8)",
    "  --endpoint-padding <x>                Predecessor derivative endpoint padding (default: 1e-5)",
    "  --machine-padding <x>                 Machine envelope padding (default: 1e-9)",
    "  --bisection-tolerance <x>             Predecessor root bisection tolerance (default: 1e-12)",
    "  --out <path>                          Write artifact JSON to path instead of stdout",
    "  --validate <path>                     Validate an existing artifact JSON file",
    "  --schema                              Print the artifact schema identifier",
    "  --pretty                              Pretty-print JSON output",
    "  --help                                Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    rootSubdivisions: DEFAULT_ROOT_SUBDIVISIONS,
    endpointSpeedSampleCount: DEFAULT_ENDPOINT_SPEED_SAMPLE_COUNT,
    zeroBranchSpeedSampleCount: DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT,
    derivativeThetaSampleCount: DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT,
    thetaCellCount: DEFAULT_THETA_CELL_COUNT,
    speedCellCount: DEFAULT_SPEED_CELL_COUNT,
    endpointPadding: DEFAULT_ENDPOINT_PADDING,
    machinePadding: DEFAULT_MACHINE_PADDING,
    bisectionTolerance: DEFAULT_BISECTION_TOLERANCE,
    outPath: null,
    validatePath: null,
    printSchema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--subdivisions") {
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
    } else if (arg === "--endpoint-padding") {
      args.endpointPadding = Number(argv[++index]);
    } else if (arg === "--machine-padding") {
      args.machinePadding = Number(argv[++index]);
    } else if (arg === "--bisection-tolerance") {
      args.bisectionTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.outPath = argv[++index];
    } else if (arg === "--validate") {
      args.validatePath = argv[++index];
    } else if (arg === "--schema") {
      args.printSchema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_ZERO_ISOLATION_MESH_COMPOSITION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
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
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
      rootSubdivisions: args.rootSubdivisions,
      endpointSpeedSampleCount: args.endpointSpeedSampleCount,
      zeroBranchSpeedSampleCount: args.zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount: args.derivativeThetaSampleCount,
      thetaCellCount: args.thetaCellCount,
      speedCellCount: args.speedCellCount,
      endpointPadding: args.endpointPadding,
      machinePadding: args.machinePadding,
      bisectionTolerance: args.bisectionTolerance,
    });
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

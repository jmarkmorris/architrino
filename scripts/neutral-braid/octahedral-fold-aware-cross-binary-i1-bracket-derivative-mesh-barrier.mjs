#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateCrossBinaryForcingAndDerivativeAtTheta,
} from "./octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs";
import {
  buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
  validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan,
} from "./octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_bracket_derivative_mesh_barrier";
const PROMOTION_STATUS = "priority-only";
const DEFAULT_ROOT_SUBDIVISIONS = 5000;
const DEFAULT_ZERO_BRANCH_SPEED_SAMPLE_COUNT = 9;
const DEFAULT_DERIVATIVE_THETA_SAMPLE_COUNT = 48;
const DEFAULT_THETA_CELL_COUNT = 16;
const DEFAULT_SPEED_CELL_COUNT = 8;
const DEFAULT_ENDPOINT_PADDING = 1e-5;
const DEFAULT_MACHINE_PADDING = 1e-9;
const DEFAULT_BISECTION_TOLERANCE = 1e-12;
const EXPECTED_SOURCE_ROOT_COUNT = 6;
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

function evaluateAt({ speedRatio, theta, rootSubdivisions }) {
  return evaluateCrossBinaryForcingAndDerivativeAtTheta({
    speedRatio,
    theta,
    rootSubdivisions,
  });
}

function termRootCountSignature(evaluation) {
  return evaluation.terms.map((term) => term.root_count);
}

function minAbsFDelta(evaluation) {
  const values = evaluation.terms.flatMap((term) =>
    (term.root_rows ?? []).map((row) => Math.abs(Number(row.F_delta)))
  );
  return Math.min(...values);
}

function buildMeshBarrierRows({
  rootSubdivisions,
  thetaCellCount,
  speedCellCount,
  machinePadding,
}) {
  const thetaCellWidth =
    (I1_RIGHT_ENDPOINT - I1_LEFT_ENDPOINT) / thetaCellCount;
  const speedCellWidth =
    (SPEED_RATIO_ENCLOSURE[1] - SPEED_RATIO_ENCLOSURE[0]) / speedCellCount;
  const thetaRadius = 0.5 * thetaCellWidth;
  const speedRadius = 0.5 * speedCellWidth;
  const rows = [];

  for (let thetaIndex = 0; thetaIndex < thetaCellCount; thetaIndex += 1) {
    const thetaLeft = I1_LEFT_ENDPOINT + thetaIndex * thetaCellWidth;
    const thetaRight = thetaLeft + thetaCellWidth;
    const thetaCenter = 0.5 * (thetaLeft + thetaRight);

    for (let speedIndex = 0; speedIndex < speedCellCount; speedIndex += 1) {
      const speedLeft = SPEED_RATIO_ENCLOSURE[0] + speedIndex * speedCellWidth;
      const speedRight = speedLeft + speedCellWidth;
      const speedCenter = 0.5 * (speedLeft + speedRight);

      const center = evaluateAt({
        speedRatio: speedCenter,
        theta: thetaCenter,
        rootSubdivisions,
      });
      const thetaLeftEvaluation = evaluateAt({
        speedRatio: speedCenter,
        theta: thetaLeft,
        rootSubdivisions,
      });
      const thetaRightEvaluation = evaluateAt({
        speedRatio: speedCenter,
        theta: thetaRight,
        rootSubdivisions,
      });
      const speedLeftEvaluation = evaluateAt({
        speedRatio: speedLeft,
        theta: thetaCenter,
        rootSubdivisions,
      });
      const speedRightEvaluation = evaluateAt({
        speedRatio: speedRight,
        theta: thetaCenter,
        rootSubdivisions,
      });
      const thetaSlope =
        Math.abs(thetaRightEvaluation.derivative - thetaLeftEvaluation.derivative) /
        thetaCellWidth;
      const speedSlope =
        Math.abs(speedRightEvaluation.derivative - speedLeftEvaluation.derivative) /
        speedCellWidth;
      const localVariationAllowance =
        thetaSlope * thetaRadius + speedSlope * speedRadius + machinePadding;
      const localUpperBarrier = center.derivative + localVariationAllowance;
      const sourceRootCounts = [
        center.source_root_count,
        thetaLeftEvaluation.source_root_count,
        thetaRightEvaluation.source_root_count,
        speedLeftEvaluation.source_root_count,
        speedRightEvaluation.source_root_count,
      ];
      const signature = termRootCountSignature(center);

      rows.push({
        mesh_row_id: `I1.f1.bracket-derivative-mesh.${thetaIndex}.${speedIndex}`,
        theta_cell_index: thetaIndex,
        speed_cell_index: speedIndex,
        theta_interval: [
          formatSmallNumber(thetaLeft),
          formatSmallNumber(thetaRight),
        ],
        speed_ratio_interval: [
          formatSmallNumber(speedLeft),
          formatSmallNumber(speedRight),
        ],
        theta_center: formatSmallNumber(thetaCenter),
        speed_ratio_center: formatSmallNumber(speedCenter),
        derivative_center: formatSmallNumber(center.derivative),
        theta_left_derivative: formatSmallNumber(thetaLeftEvaluation.derivative),
        theta_right_derivative: formatSmallNumber(thetaRightEvaluation.derivative),
        speed_left_derivative: formatSmallNumber(speedLeftEvaluation.derivative),
        speed_right_derivative: formatSmallNumber(speedRightEvaluation.derivative),
        theta_variation_stencil_slope: formatSmallNumber(thetaSlope),
        speed_variation_stencil_slope: formatSmallNumber(speedSlope),
        local_variation_allowance: formatSmallNumber(localVariationAllowance),
        local_derivative_upper_barrier_stencil:
          formatSmallNumber(localUpperBarrier),
        signed_barrier_clearance: formatSmallNumber(-localUpperBarrier),
        source_root_count_center: center.source_root_count,
        source_root_counts: sourceRootCounts,
        source_root_count_preserved: sourceRootCounts.every(
          (count) => count === EXPECTED_SOURCE_ROOT_COUNT
        ),
        term_root_count_signature: signature,
        min_abs_F_delta: formatSmallNumber(minAbsFDelta(center)),
        status:
          center.derivative < 0 &&
          localUpperBarrier < 0 &&
          sourceRootCounts.every((count) => count === EXPECTED_SOURCE_ROOT_COUNT) &&
          signature.join(",") === "1,3,1,1"
            ? "i1-f1-bracket-derivative-mesh-barrier-certified"
            : "i1-f1-bracket-derivative-mesh-barrier-open",
      });
    }
  }

  return rows;
}

function buildBarrierSummary(rows) {
  const derivatives = rows.map((row) => Number(row.derivative_center));
  const upperBarriers = rows.map((row) =>
    Number(row.local_derivative_upper_barrier_stencil)
  );
  const clearances = rows.map((row) => Number(row.signed_barrier_clearance));
  const thetaSlopes = rows.map((row) =>
    Number(row.theta_variation_stencil_slope)
  );
  const speedSlopes = rows.map((row) =>
    Number(row.speed_variation_stencil_slope)
  );
  const sourceRootCounts = [
    ...new Set(rows.flatMap((row) => row.source_root_counts)),
  ].sort((left, right) => left - right);
  const signatures = [
    ...new Set(rows.map((row) => row.term_root_count_signature.join(","))),
  ].sort();
  const worst = rows.reduce((best, row) =>
    Number(row.local_derivative_upper_barrier_stencil) >
    Number(best.local_derivative_upper_barrier_stencil)
      ? row
      : best
  );

  return {
    barrier_row_id: "I1.f1.bracket-local-derivative-mesh-barrier",
    target_row_id: "I1.derivative-negative.full-cell",
    local_scope: "I1.f1 forcing bracket only",
    mesh_row_count: rows.length,
    certified_mesh_row_count: rows.filter(
      (row) => row.status === "i1-f1-bracket-derivative-mesh-barrier-certified"
    ).length,
    source_root_counts: sourceRootCounts,
    source_root_count_preserved:
      sourceRootCounts.length === 1 &&
      sourceRootCounts[0] === EXPECTED_SOURCE_ROOT_COUNT,
    term_root_count_signatures: signatures,
    raw_derivative_minimum: formatSmallNumber(Math.min(...derivatives)),
    raw_derivative_maximum: formatSmallNumber(Math.max(...derivatives)),
    max_theta_variation_stencil_slope: formatSmallNumber(
      Math.max(...thetaSlopes)
    ),
    max_speed_variation_stencil_slope: formatSmallNumber(
      Math.max(...speedSlopes)
    ),
    max_local_derivative_upper_barrier_stencil: formatSmallNumber(
      Math.max(...upperBarriers)
    ),
    min_signed_barrier_clearance: formatSmallNumber(Math.min(...clearances)),
    worst_mesh_row_id: worst.mesh_row_id,
    worst_theta_center: worst.theta_center,
    worst_speed_ratio_center: worst.speed_ratio_center,
    status:
      rows.every(
        (row) => row.status === "i1-f1-bracket-derivative-mesh-barrier-certified"
      ) && Math.max(...upperBarriers) < 0
        ? "i1-f1-bracket-derivative-mesh-barrier-certified"
        : "i1-f1-bracket-derivative-mesh-barrier-open",
  };
}

function buildMeshBarrierTheorem() {
  return {
    theorem_id: "i1-f1-bracket-derivative-mesh-barrier",
    theorem_scope: "sampled local-stencil derivative barrier on the I1.f1 bracket",
    statement:
      "On the I1.f1 bracket and across the certified speed-ratio enclosure, midpoint derivative samples plus local theta and speed variation stencils give a negative upper barrier for every bracket mesh cell. This certifies a sampled mesh barrier for the bracket-local derivative sign, but not a directed-rounding interval derivative enclosure.",
    proof_steps: [
      "Import the sampled I1.f1 zero-isolation speed-envelope branch and its predecessor endpoint and derivative scans.",
      "Partition the I1.f1 bracket and certified speed-ratio enclosure into finite mesh cells.",
      "Evaluate f'_cross at each cell center, both theta faces, and both speed faces using the source-atlas implicit derivative formula.",
      "Build a local variation allowance from the theta-face and speed-face derivative changes plus explicit machine padding.",
      "Require center derivative plus local variation allowance to remain negative in every mesh cell.",
      "Conclude a sampled local-stencil derivative barrier on the bracket; leave full-cell directed-rounding interval derivative enclosure and full I1.f1 interval zero isolation open.",
    ],
    proof_status: "sampled-local-stencil-bracket-derivative-barrier-certified",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
  options = {}
) {
  const rootSubdivisions = Number.parseInt(
    options.rootSubdivisions ?? DEFAULT_ROOT_SUBDIVISIONS,
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

  const zeroIsolationScan =
    buildOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan({
      rootSubdivisions,
      speedSampleCount: zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
    });
  const zeroIsolationScanErrors =
    validateOctahedralFoldAwareCrossBinaryI1ZeroIsolationSpeedEnvelopeScan(
      zeroIsolationScan
    );
  const meshBarrierRows = buildMeshBarrierRows({
    rootSubdivisions,
    thetaCellCount,
    speedCellCount,
    machinePadding,
  });
  const barrierSummary = buildBarrierSummary(meshBarrierRows);
  const certified =
    zeroIsolationScanErrors.length === 0 &&
    zeroIsolationScan.artifact_claim
      .certifies_I1_f1_zero_isolation_speed_envelope_scan === true &&
    barrierSummary.status ===
      "i1-f1-bracket-derivative-mesh-barrier-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md",
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.md",
    ],
    priority_packet:
      "reference/priorities/geometry-bridge/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md",
    zero_isolation_scan_check: {
      schema: zeroIsolationScan.schema,
      valid: zeroIsolationScanErrors.length === 0,
      errors: zeroIsolationScanErrors,
      theory_status: zeroIsolationScan.result.theory_status,
      retained_branch: zeroIsolationScan.result.retained_branch,
      certifies_I1_f1_zero_isolation_speed_envelope_scan:
        zeroIsolationScan.artifact_claim
          .certifies_I1_f1_zero_isolation_speed_envelope_scan === true,
      certifies_I1_f1_full_interval_zero_isolation:
        zeroIsolationScan.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      root_branch_summary: zeroIsolationScan.root_branch_summary,
    },
    mesh_parameters: {
      receiver_label: "1+",
      target_row_id: "I1.derivative-negative.full-cell",
      local_barrier_row_id: "I1.f1.bracket-local-derivative-mesh-barrier",
      theta_domain: "[0,H/4]",
      bracket_interval: [
        formatSmallNumber(I1_LEFT_ENDPOINT),
        formatSmallNumber(I1_RIGHT_ENDPOINT),
      ],
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
      root_subdivisions: rootSubdivisions,
      zero_branch_speed_sample_count: zeroBranchSpeedSampleCount,
      derivative_theta_sample_count: derivativeThetaSampleCount,
      theta_cell_count: thetaCellCount,
      speed_cell_count: speedCellCount,
      endpoint_padding: formatSmallNumber(endpointPadding),
      machine_padding: formatSmallNumber(machinePadding),
      bisection_tolerance: formatSmallNumber(bisectionTolerance),
    },
    i1_bracket_derivative_mesh_barrier_theorem: buildMeshBarrierTheorem(),
    mesh_barrier_rows: meshBarrierRows,
    barrier_summary: barrierSummary,
    interval_profile_boundary: {
      certifies_I1_f1_bracket_derivative_mesh_barrier: certified,
      certifies_I1_f1_bracket_local_derivative_negative_stencil_barrier:
        certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding derivative bounds on the full continuous compact I1 interval",
        "directed-rounding validation that local-stencil variation bounds dominate true variation on the I1.f1 bracket",
        "full I1.f1 interval zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-f1-bracket-derivative-mesh-barrier-certified-full-interval-derivative-row-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_f1_bracket_derivative_mesh_barrier: certified,
      certifies_I1_f1_bracket_local_derivative_negative_stencil_barrier:
        certified,
      advances_I1_derivative_negative_full_cell: certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_I1_zero_isolation: false,
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
        "I1.f1 bracket-local sampled derivative mesh barrier; full-cell continuous interval derivative enclosure, full interval zero isolation, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-bracket-derivative-mesh-barrier-certified"
        : "source-atlas-aware-i1-f1-bracket-derivative-mesh-barrier-open",
      first_successor_row:
        "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The I1.f1 bracket now has a sampled local-stencil derivative barrier with negative upper envelope, but full interval derivative enclosure and full zero isolation still require directed-rounding bounds.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA,
    "schema must match I1 bracket derivative mesh barrier schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 bracket derivative mesh barrier packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.zero_isolation_scan_check?.valid === true &&
      artifact?.zero_isolation_scan_check
        ?.certifies_I1_f1_zero_isolation_speed_envelope_scan === true &&
      artifact?.zero_isolation_scan_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false,
    "zero-isolation predecessor must validate as sampled only",
    errors
  );
  assertField(
    artifact?.mesh_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 bracket derivative mesh barrier must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.mesh_parameters?.speed_band === undefined &&
      artifact?.mesh_parameters?.speed_window === undefined &&
      artifact?.mesh_parameters?.speed_min === undefined &&
      artifact?.mesh_parameters?.speed_max === undefined,
    "mesh parameters must not contain speed-band fields",
    errors
  );
  assertField(
    Array.isArray(artifact?.mesh_barrier_rows) &&
      artifact.mesh_barrier_rows.length ===
        artifact?.mesh_parameters?.theta_cell_count *
          artifact?.mesh_parameters?.speed_cell_count &&
      artifact.mesh_barrier_rows.every(
        (row) =>
          row.status === "i1-f1-bracket-derivative-mesh-barrier-certified" &&
          row.source_root_count_center === EXPECTED_SOURCE_ROOT_COUNT &&
          row.source_root_count_preserved === true &&
          row.term_root_count_signature?.join(",") === "1,3,1,1" &&
          Number(row.derivative_center) < 0 &&
          Number(row.local_derivative_upper_barrier_stencil) < 0 &&
          Number(row.signed_barrier_clearance) > 0 &&
          Number(row.min_abs_F_delta) > 0
      ),
    "all mesh barrier rows must certify negative local derivative barriers with six source roots",
    errors
  );
  assertField(
    artifact?.barrier_summary?.barrier_row_id ===
      "I1.f1.bracket-local-derivative-mesh-barrier" &&
      artifact?.barrier_summary?.status ===
        "i1-f1-bracket-derivative-mesh-barrier-certified" &&
      artifact?.barrier_summary?.source_root_count_preserved === true &&
      artifact?.barrier_summary?.term_root_count_signatures?.length === 1 &&
      artifact?.barrier_summary?.term_root_count_signatures?.[0] ===
        "1,3,1,1" &&
      Number(
        artifact?.barrier_summary?.max_local_derivative_upper_barrier_stencil
      ) < 0 &&
      Number(artifact?.barrier_summary?.min_signed_barrier_clearance) > 0,
    "barrier summary must certify the bracket-local derivative mesh barrier",
    errors
  );
  assertField(
    artifact?.artifact_claim?.certifies_I1_f1_bracket_derivative_mesh_barrier ===
      true &&
      artifact?.artifact_claim
        ?.certifies_I1_f1_bracket_local_derivative_negative_stencil_barrier ===
        true &&
      artifact?.artifact_claim?.advances_I1_derivative_negative_full_cell ===
        true &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the bracket-local mesh barrier and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-bracket-derivative-mesh-barrier-certified" &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must be I1.f1 bracket derivative mesh barrier certified and not retained",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs [options]",
    "",
    "Options:",
    "  --subdivisions <n>                    Source-root search subdivisions (default: 5000)",
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_DERIVATIVE_MESH_BARRIER_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier(
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
    buildOctahedralFoldAwareCrossBinaryI1BracketDerivativeMeshBarrier({
      rootSubdivisions: args.rootSubdivisions,
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

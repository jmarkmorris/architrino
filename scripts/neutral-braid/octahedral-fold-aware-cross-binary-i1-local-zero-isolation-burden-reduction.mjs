#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition,
} from "./octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA =
  "neutral-braid-octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_i1_local_zero_isolation_burden_reduction";
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
  "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only";
const SPEED_RATIO_ENCLOSURE = [3.02156, 3.02157];
const I1_LEFT_ENDPOINT = 0.124678831905;
const I1_RIGHT_ENDPOINT = 0.145456970556;
const COMPACT_I1_SCAN_INTERVAL = [0.00001, 0.997360655243];
const ORIGINAL_SUCCESSOR_ROW =
  "I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required";
const REDUCED_LOCAL_SUCCESSOR_ROW =
  "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required";

function formatSmallNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
}

function buildBurdenReductionTheorem() {
  return {
    theorem_id: "i1-f1-local-zero-isolation-burden-reduction",
    theorem_scope:
      "direct I1.f1 zero-isolation proof obligation after bracket-local mesh composition",
    statement:
      "For the I1.f1 zero row, full-cell derivative negativity on the compact I1 regular cell is sufficient but not necessary. Endpoint signs on the I1.f1 bracket plus a bracket-local negative derivative enclosure imply existence and uniqueness of the bracket zero. Therefore the direct theorem-grade successor for local I1.f1 zero isolation is a bracket-local directed-rounding derivative-variation enclosure on the I1.f1 bracket; the full-cell derivative row remains a separate global sign-topology obligation.",
    proof_steps: [
      "Import the bracket-local zero-isolation mesh composition, which composes endpoint signs, sampled root location, and bracket-local derivative negativity under the mesh contract.",
      "Use the one-dimensional monotonicity lemma: if f(a)>0>f(b) and f'<0 throughout [a,b], then there is exactly one zero in (a,b).",
      "Observe that this lemma only uses derivative negativity on the bracket [a,b], not on the enclosing compact I1 cell.",
      "Compare the I1.f1 bracket length with the compact I1 scan length; the bracket is one forty-eighth of the compact scan interval.",
      "Replace the direct local zero-isolation successor by a bracket-local directed-rounding derivative-variation enclosure, while preserving the full-cell derivative row as open for any broader interval sign-topology use.",
    ],
    proof_status: "i1-f1-local-zero-isolation-burden-reduction-certified",
  };
}

function buildBurdenReductionSummary(localCompositionPacket) {
  const localSummary =
    localCompositionPacket.bracket_local_zero_isolation_mesh_composition_summary;
  const bracketLength = I1_RIGHT_ENDPOINT - I1_LEFT_ENDPOINT;
  const compactLength = COMPACT_I1_SCAN_INTERVAL[1] - COMPACT_I1_SCAN_INTERVAL[0];
  const bracketFraction = bracketLength / compactLength;
  const shrinkFactor = compactLength / bracketLength;
  const localCompositionCertified =
    localCompositionPacket.artifact_claim
      .certifies_I1_f1_bracket_local_zero_isolation_mesh_composition === true &&
    localSummary.status ===
      "i1-f1-bracket-local-zero-isolation-mesh-composition-certified";

  return {
    reduction_row_id: "I1.f1.local-zero-isolation-burden-reduction",
    zero_row_id: "I1.f1",
    original_successor_row: ORIGINAL_SUCCESSOR_ROW,
    reduced_local_successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
    full_cell_derivative_row_preserved_for_global_sign_topology: true,
    bracket_interval: [
      formatSmallNumber(I1_LEFT_ENDPOINT),
      formatSmallNumber(I1_RIGHT_ENDPOINT),
    ],
    compact_i1_scan_interval: COMPACT_I1_SCAN_INTERVAL,
    bracket_length: formatSmallNumber(bracketLength),
    compact_i1_scan_length: formatSmallNumber(compactLength),
    bracket_fraction_of_compact_i1_scan: formatSmallNumber(bracketFraction),
    compact_to_bracket_length_ratio: formatSmallNumber(shrinkFactor),
    speed_ratio_enclosure: SPEED_RATIO_ENCLOSURE,
    endpoint_sign_pattern: localSummary.endpoint_sign_pattern,
    minimum_endpoint_signed_clearance:
      localSummary.minimum_endpoint_signed_clearance,
    maximum_local_derivative_upper_barrier_stencil:
      localSummary.maximum_local_derivative_upper_barrier_stencil,
    minimum_derivative_signed_clearance:
      localSummary.minimum_derivative_signed_clearance,
    sampled_root_theta_envelope: localSummary.sampled_root_theta_envelope,
    minimum_root_clearance_from_left_endpoint:
      localSummary.minimum_root_clearance_from_left_endpoint,
    minimum_root_clearance_from_right_endpoint:
      localSummary.minimum_root_clearance_from_right_endpoint,
    source_root_counts: localSummary.source_root_counts,
    term_root_count_signatures: localSummary.term_root_count_signatures,
    local_composition_certified: localCompositionCertified,
    local_zero_isolation_uses_only_bracket_derivative_negativity: true,
    full_cell_derivative_negativity_is_sufficient_not_necessary_for_I1_f1_local_zero:
      true,
    status: localCompositionCertified
      ? "i1-f1-local-zero-isolation-burden-reduction-certified"
      : "i1-f1-local-zero-isolation-burden-reduction-open",
  };
}

export function buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
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

  const localCompositionPacket =
    buildOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition({
      rootSubdivisions,
      endpointSpeedSampleCount,
      zeroBranchSpeedSampleCount,
      derivativeThetaSampleCount,
      thetaCellCount,
      speedCellCount,
      endpointPadding,
      machinePadding,
      bisectionTolerance,
    });
  const localCompositionErrors =
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalZeroIsolationMeshComposition(
      localCompositionPacket
    );
  const burdenReductionSummary =
    buildBurdenReductionSummary(localCompositionPacket);
  const certified =
    localCompositionErrors.length === 0 &&
    burdenReductionSummary.status ===
      "i1-f1-local-zero-isolation-burden-reduction-certified";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    predecessor_packets: [
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.md",
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-forcing-interval-sign-enclosure-target-atlas.md",
    ],
    priority_packet:
      "reference/priorities/braid-geometry-export-bridge/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md",
    local_zero_isolation_composition_check: {
      schema: localCompositionPacket.schema,
      valid: localCompositionErrors.length === 0,
      errors: localCompositionErrors,
      theory_status: localCompositionPacket.result.theory_status,
      retained_branch: localCompositionPacket.result.retained_branch,
      certifies_I1_f1_bracket_local_zero_isolation_mesh_composition:
        localCompositionPacket.artifact_claim
          .certifies_I1_f1_bracket_local_zero_isolation_mesh_composition === true,
      certifies_I1_f1_full_interval_zero_isolation:
        localCompositionPacket.artifact_claim
          .certifies_I1_f1_full_interval_zero_isolation === true,
      certifies_interval_derivative_enclosure:
        localCompositionPacket.artifact_claim
          .certifies_interval_derivative_enclosure === true,
      summary:
        localCompositionPacket
          .bracket_local_zero_isolation_mesh_composition_summary,
    },
    reduction_parameters: {
      receiver_label: "1+",
      zero_row_id: "I1.f1",
      theta_domain: "[0,H/4]",
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
    i1_local_zero_isolation_burden_reduction_theorem:
      buildBurdenReductionTheorem(),
    burden_reduction_summary: burdenReductionSummary,
    interval_profile_boundary: {
      certifies_I1_f1_local_zero_isolation_burden_reduction: certified,
      replaces_full_cell_derivative_requirement_for_I1_f1_local_zero_isolation:
        certified,
      shrinks_direct_I1_f1_zero_isolation_derivative_domain_to_bracket:
        certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
      certifies_I1_f1_full_interval_zero_isolation: false,
      certifies_I1_zero_isolation: false,
      certifies_outward_rounded_interval_enclosure: false,
      certifies_interval_derivative_enclosure: false,
      certifies_interval_sign_topology: false,
      certifies_interval_critical_exhaustion: false,
      certifies_interval_quadrature_enclosure: false,
      open_quantities: [
        "directed-rounding validation that the bracket-local derivative mesh allowance dominates true variation",
        "full-cell derivative enclosure if required by broader interval sign topology outside I1.f1 local zero isolation",
        "full I1.f1 interval zero isolation",
        "remaining finite row-family enclosures",
      ],
      status:
        "i1-f1-local-zero-isolation-burden-reduction-certified-full-interval-zero-isolation-open",
    },
    artifact_claim: {
      assumes_fixed_speed_window: false,
      certifies_I1_f1_local_zero_isolation_burden_reduction: certified,
      replaces_full_cell_derivative_requirement_for_I1_f1_local_zero_isolation:
        certified,
      shrinks_direct_I1_f1_zero_isolation_derivative_domain_to_bracket:
        certified,
      identifies_bracket_fraction_of_compact_i1_scan: certified,
      preserves_full_cell_derivative_row_for_global_sign_topology: certified,
      certifies_I1_derivative_negative_full_cell_interval_enclosure: false,
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
        "I1.f1 local zero-isolation burden reduction: the direct derivative enclosure can be bracket-local, one forty-eighth of the compact I1 scan interval; full continuous interval zero isolation, critical exhaustion, quadrature, and retained branch status remain open",
    },
    result: {
      theory_status: certified
        ? "source-atlas-aware-i1-f1-local-zero-isolation-burden-reduction-certified"
        : "source-atlas-aware-i1-f1-local-zero-isolation-burden-reduction-open",
      first_successor_row: REDUCED_LOCAL_SUCCESSOR_ROW,
      broader_open_row: ORIGINAL_SUCCESSOR_ROW,
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The direct I1.f1 zero-isolation proof burden has been shrunk from a full compact I1 derivative enclosure to a bracket-local directed-rounding derivative-variation enclosure. The full-cell derivative row remains open only for broader interval sign-topology use.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
  artifact
) {
  const errors = [];
  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA,
    "schema must match I1 local zero-isolation burden reduction schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match I1 local zero-isolation burden reduction packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.local_zero_isolation_composition_check?.valid === true &&
      artifact?.local_zero_isolation_composition_check
        ?.certifies_I1_f1_bracket_local_zero_isolation_mesh_composition ===
        true &&
      artifact?.local_zero_isolation_composition_check
        ?.certifies_I1_f1_full_interval_zero_isolation === false &&
      artifact?.local_zero_isolation_composition_check
        ?.certifies_interval_derivative_enclosure === false,
    "local zero-isolation predecessor must certify only the bracket-local mesh composition",
    errors
  );
  assertField(
    artifact?.reduction_parameters?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "I1 burden reduction must not impose a fixed speed window",
    errors
  );
  assertField(
    artifact?.reduction_parameters?.speed_band === undefined &&
      artifact?.reduction_parameters?.speed_window === undefined &&
      artifact?.reduction_parameters?.speed_min === undefined &&
      artifact?.reduction_parameters?.speed_max === undefined,
    "reduction parameters must not contain speed-band fields",
    errors
  );
  assertField(
    artifact?.burden_reduction_summary?.status ===
      "i1-f1-local-zero-isolation-burden-reduction-certified" &&
      artifact?.burden_reduction_summary?.original_successor_row ===
        ORIGINAL_SUCCESSOR_ROW &&
      artifact?.burden_reduction_summary?.reduced_local_successor_row ===
        REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.burden_reduction_summary
        ?.local_zero_isolation_uses_only_bracket_derivative_negativity === true &&
      artifact?.burden_reduction_summary
        ?.full_cell_derivative_negativity_is_sufficient_not_necessary_for_I1_f1_local_zero ===
        true &&
      Number(
        artifact?.burden_reduction_summary?.bracket_fraction_of_compact_i1_scan
      ) < 0.021 &&
      Number(artifact?.burden_reduction_summary?.compact_to_bracket_length_ratio) >
        47.9,
    "burden summary must replace the local successor and record the 1/48 bracket reduction",
    errors
  );
  assertField(
    artifact?.burden_reduction_summary?.term_root_count_signatures?.length ===
      1 &&
      artifact?.burden_reduction_summary?.term_root_count_signatures?.[0] ===
        "1,3,1,1" &&
      artifact?.burden_reduction_summary?.source_root_counts?.length === 1 &&
      artifact?.burden_reduction_summary?.source_root_counts?.[0] === 6,
    "burden summary must preserve the I1 source-root signature",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.certifies_I1_f1_local_zero_isolation_burden_reduction === true &&
      artifact?.artifact_claim
        ?.replaces_full_cell_derivative_requirement_for_I1_f1_local_zero_isolation ===
        true &&
      artifact?.artifact_claim
        ?.shrinks_direct_I1_f1_zero_isolation_derivative_domain_to_bracket ===
        true &&
      artifact?.artifact_claim
        ?.preserves_full_cell_derivative_row_for_global_sign_topology === true &&
      artifact?.artifact_claim
        ?.certifies_I1_derivative_negative_full_cell_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_I1_f1_full_interval_zero_isolation ===
        false &&
      artifact?.artifact_claim?.certifies_I1_zero_isolation === false &&
      artifact?.artifact_claim?.certifies_outward_rounded_interval_enclosure ===
        false &&
      artifact?.artifact_claim?.certifies_interval_derivative_enclosure === false &&
      artifact?.artifact_claim?.certifies_interval_critical_exhaustion === false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact must certify only the local burden reduction and leave interval/retention claims open",
    errors
  );
  assertField(
    artifact?.result?.theory_status ===
      "source-atlas-aware-i1-f1-local-zero-isolation-burden-reduction-certified" &&
      artifact?.result?.first_successor_row === REDUCED_LOCAL_SUCCESSOR_ROW &&
      artifact?.result?.broader_open_row === ORIGINAL_SUCCESSOR_ROW &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "result must certify the I1.f1 local burden reduction and not retain the branch",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs [options]",
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
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_LOCAL_ZERO_ISOLATION_BURDEN_REDUCTION_SCHEMA
    );
    return;
  }
  if (args.validatePath) {
    const artifact = JSON.parse(fs.readFileSync(args.validatePath, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction(
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
    buildOctahedralFoldAwareCrossBinaryI1LocalZeroIsolationBurdenReduction({
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

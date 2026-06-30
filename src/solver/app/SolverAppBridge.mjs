import { SOLVER_APP_ADAPTERS_VERSION } from "./SolverAppAdapters.mjs";
import {
  createMovingCircularSameSourceRootRequest,
  createMovingCircularSourceRootRequest,
  solveMovingCircularSameSourceCausalRoots,
  solveMovingCircularSourceCausalRoots,
} from "./AbsoluteHistoryRootRuntime.mjs";
import { classifySolverBaselineResponse } from "./SolverBaselineComparison.mjs";

export const SOLVER_APP_BRIDGE_API_VERSION = "solver-app-bridge.v1";

const KNOWN_APP_IDS = ["animator", "photon", "ideal-braid", "causal-delay-feedback", "t3"];
const DEFAULT_PRECISION_PATHS = [
  "auto",
  "scaled_f64_fast",
  "scaled_f64_strict",
  "adaptive_multirate",
  "event_root_focused",
  "extended_precision",
  "validation_replay",
];
const ADMISSION_DECISION_BY_ID = ["admit", "batch", "escalate_precision", "reject", "simplify"];
const ADMISSION_STRESS_DIMENSION_BY_ID = [
  "entity_count",
  "interaction_graph",
  "memory",
  "storage",
  "time_steps",
  "output_detail",
  "precision",
];
const INTERACTION_POLICY_BY_ID = ["sparse", "neighbor-pruned", "all-to-all", "same-source-enabled"];
const BRANCH_COMPLEXITY_BY_ID = ["low", "moderate", "high", "unknown"];
const OUTPUT_DETAIL_BY_ID = ["preview", "playback", "export", "validation"];
const LATENCY_TARGET_BY_ID = ["interactive", "background", "batch", "validation"];
const SIMPLIFICATION_POLICY_BY_ID = ["none", "explicit-reduced-model"];
const TIME_WINDOW_UNITS_BY_ID = ["solver-time", "seconds", "cycles", ""];
const ADMISSION_STAGE_BY_ID = [undefined, "model", "error-budget", "simulation-envelope", "admission"];
const ADMISSION_STATUS_MESSAGE_BY_ID = [
  undefined,
  "model id is required",
  "equation version is required",
  "constants hash is required",
  "causal speed policy is required",
  "branch policy is required",
  "unit convention is required",
  "at least one compatible precision path is required",
  "global tolerance must be positive and finite",
  "root isolation tolerance must be positive and finite",
  "delayed hit tolerance must be positive and finite",
  "integration tolerance must be positive and finite",
  "stream encoding tolerance must be positive and finite",
  "readback tolerance must be positive and finite",
  "projection tolerance must be nonnegative and finite",
  "display tolerance must be nonnegative and finite",
  "root isolation tolerance is looser than the global tolerance",
  "entity count must be greater than zero",
  "time window must have finite start and end with end greater than start",
  "time window units must be solver-time, seconds, or cycles",
  "time window step hint must be positive when specified",
  "time resolution hint must be positive when specified",
  "memory budget must be greater than zero",
  "requested tolerance requires a stricter precision path",
  "memory budget is below the minimum solver active-window budget",
  "dense interaction graph exceeds the supported batch envelope",
  "selected extended precision for strict global tolerance",
  "storage budget must be greater than zero",
  "storage budget is below the minimum solver streaming budget",
];

const DEFAULT_OUTPUT_LAYOUTS = [
  "frame_buffer.v1",
  "path_segment.v1",
  "assembly_state.v1",
  "assembly_membership.v1",
  "assembly_hierarchy.v1",
  "assembly_events.v1",
  "path_chunk.v1",
  "root_ledger.v1",
  "root_ledger_detail.v1",
  "delayed_hit_events.v1",
  "field_shell_events.v1",
  "phase_at_hit.v1",
  "spacetime_index.v1",
  "emission_shell_candidate.v1",
  "emission_shell_narrow_phase.v1",
  "stream_index.v1",
  "assembly_graph_index.v1",
];

const BINARY_LAYOUT_ROW_SIZE_BYTES = new Map([
  ["frame_buffer.v1", 88],
  ["path_segment.v1", 96],
  ["assembly_state.v1", 112],
  ["assembly_membership.v1", 80],
  ["assembly_hierarchy.v1", 56],
  ["assembly_events.v1", 88],
  ["path_chunk.v1", 104],
  ["root_ledger.v1", 176],
  ["root_ledger_detail.v1", 248],
  ["delayed_hit_events.v1", 192],
  ["field_shell_events.v1", 160],
  ["phase_at_hit.v1", 104],
  ["spacetime_index.v1", 128],
  ["emission_shell_candidate.v1", 112],
  ["emission_shell_narrow_phase.v1", 40],
  ["stream_index.v1", 64],
  ["assembly_graph_index.v1", 72],
]);
const BINARY_LAYOUT_ROLE_BY_ID = {
  "frame_buffer.v1": "motion-frame",
  "path_segment.v1": "path-history",
  "assembly_state.v1": "assembly-graph",
  "assembly_membership.v1": "assembly-graph",
  "assembly_hierarchy.v1": "assembly-graph",
  "assembly_events.v1": "assembly-graph",
  "path_chunk.v1": "path-history-index",
  "root_ledger.v1": "root-ledger",
  "root_ledger_detail.v1": "root-ledger",
  "delayed_hit_events.v1": "delayed-hit",
  "field_shell_events.v1": "field-shell-event",
  "phase_at_hit.v1": "phase-diagnostic",
  "spacetime_index.v1": "spacetime-index",
  "emission_shell_candidate.v1": "emission-shell",
  "emission_shell_narrow_phase.v1": "emission-shell",
  "stream_index.v1": "path-history-index",
  "assembly_graph_index.v1": "assembly-graph-index",
};
const STREAMABLE_BINARY_LAYOUTS = new Set([
  "path_segment.v1",
  "path_chunk.v1",
  "field_shell_events.v1",
  "stream_index.v1",
  "assembly_graph_index.v1",
]);

const ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES = 72;
const ASSEMBLY_GRAPH_INDEX_LAYOUT_CODES = new Map([
  ["assembly_state.v1", 1],
  ["assembly_membership.v1", 2],
  ["assembly_hierarchy.v1", 3],
  ["assembly_events.v1", 4],
]);
const ASSEMBLY_GRAPH_INDEX_KEY_KIND_CODES = new Map([
  ["path", 1],
  ["assembly", 2],
  ["parent-assembly", 3],
  ["child-assembly", 4],
]);
const INT32_MAX = 0x7fffffff;

const DEFAULT_ERROR_BUDGET_STAGES = [
  { stage: "root_isolation", budgetField: "rootIsolationTolerance", cumulative: true },
  { stage: "delayed_hit", budgetField: "delayedHitTolerance", cumulative: true },
  { stage: "motion_integration", budgetField: "integrationTolerance", cumulative: true },
  { stage: "stream_encoding", budgetField: "streamEncodingTolerance", cumulative: true },
  { stage: "stream_readback", budgetField: "readbackTolerance", cumulative: true },
  { stage: "projection", budgetField: "projectionTolerance", cumulative: true },
  { stage: "app_buffer", budgetField: "displayTolerance", cumulative: true },
];

const DEFAULT_INVARIANT_CHECK_OPTIONS = {
  rootResidualTolerance: 1e-10,
  timeTolerance: 1e-10,
  distanceTolerance: 1e-10,
  directionTolerance: 1e-10,
  branchWeightTolerance: 1e-10,
  smallJacobianTolerance: 1e-12,
};

const ROOT_LEDGER_ENTRY_KIND = {
  ACTIVE_ROOT: 1,
  INACTIVE_GAP: 2,
  TAIL_BOUNDARY: 3,
  TRANSITION: 4,
  FAILURE: 5,
};
const ROOT_LEDGER_JACOBIAN_SIGN_STRATUM = {
  NEGATIVE: 1,
  NEAR_ZERO: 2,
  POSITIVE: 3,
};
const ROOT_LEDGER_TRANSITION_KINDS = [
  "retained",
  "appeared",
  "disappeared",
  "folded",
  "assimilated_from_tail",
  "ledger_rerun_required",
];
const DEFAULT_FIELD_SPEED_TOLERANCE = 0.015;
const DEFAULT_CIRCULAR_SELF_HIT_SCAN_SUBDIVISIONS = 72;
const DEFAULT_CIRCULAR_SELF_HIT_ITERATIONS = 48;
const DEFAULT_CIRCULAR_SELF_HIT_MAX_ANGLE = Math.PI * 1.96;
const DEFAULT_CIRCULAR_SELF_HIT_TOLERANCE = 1e-12;
const FIELD_SPEED_REGIME_BY_ID = ["sub_field", "field_speed", "super_field"];
const CIRCULAR_SELF_HIT_RESULT_KIND_BY_ID = ["below_threshold", "root_solved", "fallback_pi"];
const STORAGE_LIFECYCLE_TIER_BY_ID = ["active", "warm", "cold", "deleted"];
const STORAGE_LIFECYCLE_ACTION_BY_ID = [
  "keep_active",
  "spill_warm",
  "archive_cold",
  "build_deep_index",
  "delete",
  "blocked_unsafe",
];
const STORAGE_LIFECYCLE_REASON_BY_ID = [
  "unknown",
  "delete_requested",
  "failed_run_cleanup",
  "overlaps_active_window",
  "chunk_is_pinned_active",
  "aged_chunk_requires_deep_index",
  "storage_pressure_without_export_request",
  "export_retention_requested",
  "deep_index_already_built",
  "aged_out_of_active_window",
];
const DEFAULT_NATIVE_FILE_STREAM_BASE_PATH = ".tmp/solver-app-streams";
const DEFAULT_NATIVE_FILE_ASSEMBLY_GRAPH_BASE_PATH = ".tmp/solver-app-assembly-graphs";
const STREAM_INDEX_ROW_V1_BYTES = 64;

const PRECISION_PATH_BY_ID = DEFAULT_PRECISION_PATHS;
const CLAIM_LEVEL_BY_ID = [
  "interactive-preview",
  "migration-parity",
  "exported-dataset",
  "validation-evidence",
];
const PRECISION_PATH_RANK = new Map(DEFAULT_PRECISION_PATHS.map((path, index) => [path, index]));
const CLAIM_LEVEL_MINIMUM_PRECISION_PATH = {
  "interactive-preview": "scaled_f64_fast",
  "migration-parity": "scaled_f64_strict",
  "exported-dataset": "scaled_f64_strict",
  "validation-evidence": "validation_replay",
};
const CIRCULAR_SOURCE_PRECISION_CONTROLS = {
  auto: {
    rootTolerance: 1e-12,
    maxIterations: 96,
    scanSubdivisions: 128,
    controlNumericType: "f64",
  },
  scaled_f64_fast: {
    rootTolerance: 1e-12,
    maxIterations: 96,
    scanSubdivisions: 128,
    controlNumericType: "f64",
  },
  scaled_f64_strict: {
    rootTolerance: 1e-12,
    maxIterations: 128,
    scanSubdivisions: 128,
    controlNumericType: "f64",
  },
  adaptive_multirate: {
    rootTolerance: 5e-13,
    maxIterations: 160,
    scanSubdivisions: 192,
    controlNumericType: "f64",
  },
  event_root_focused: {
    rootTolerance: 1e-13,
    maxIterations: 192,
    scanSubdivisions: 256,
    controlNumericType: "f64",
  },
  extended_precision: {
    rootTolerance: 1e-15,
    maxIterations: 256,
    scanSubdivisions: 512,
    controlNumericType: "decimal128",
  },
  validation_replay: {
    rootTolerance: 1e-15,
    maxIterations: 320,
    scanSubdivisions: 768,
    controlNumericType: "decimal128",
  },
};
const NUMERIC_TYPE_BY_ID = ["f64", "scaled_i64", "interval_f64_pair", "decimal128", "mp_limb_block"];
const ERROR_BUDGET_STAGE_BY_ID = DEFAULT_ERROR_BUDGET_STAGES.map((stage) => stage.stage);
const ERROR_BUDGET_STAGE_TO_ID = new Map(
  ERROR_BUDGET_STAGE_BY_ID.map((stage, index) => [stage, index])
);
const VALUE_AUTHORITY_BY_ID = ["authoritative", "approximate", "display-only", "rejected"];
const NUMERIC_CHART_BY_ID = [
  "absolute_f64",
  "local_frame",
  "nondimensional_ratio",
  "log_magnitude",
  "signed_log_magnitude",
  "direction_log_magnitude",
  "interval_bounds",
];
const NUMERIC_SERIALIZATION_CONTRACT = {
  schema: "solver-numeric-serialization.v1",
  descriptors: [
    {
      numericType: "f64",
      byteOrder: "little-endian",
      scalarSizeBytes: 8,
      signedness: "signed",
      scaleFactor: "identity",
      exponentLayout: "ieee-754-binary64",
      limbOrder: "none",
      intervalEndpointConvention: "not-interval",
      roundingMode: "nearest-ties-to-even",
      comparisonSemantics: "ordered finite values; NaN is invalid in solver storage",
      textExport: "round-trip decimal with 17 significant digits",
      appBufferSafe: true,
      authoritativeStorageSafe: true,
    },
    {
      numericType: "scaled_i64",
      byteOrder: "little-endian",
      scalarSizeBytes: 8,
      signedness: "signed",
      scaleFactor: "manifest-declared power-of-ten or power-of-two scale",
      exponentLayout: "twos-complement-i64",
      limbOrder: "none",
      intervalEndpointConvention: "not-interval",
      roundingMode: "exact integer storage; scaled conversion rounds toward nearest with explicit tie policy",
      comparisonSemantics: "compare after applying the declared scale factor",
      textExport: "integer literal plus manifest scale",
      appBufferSafe: false,
      authoritativeStorageSafe: true,
    },
    {
      numericType: "interval_f64_pair",
      byteOrder: "little-endian",
      scalarSizeBytes: 16,
      signedness: "signed",
      scaleFactor: "identity per endpoint",
      exponentLayout: "two ieee-754-binary64 endpoints",
      limbOrder: "none",
      intervalEndpointConvention: "closed interval [lower, upper] with lower stored before upper",
      roundingMode: "directed outward rounding required when values are produced",
      comparisonSemantics: "interval overlap/containment; point comparison requires an explicit projection",
      textExport: "[lower, upper] with 17 significant digits per endpoint",
      appBufferSafe: false,
      authoritativeStorageSafe: true,
    },
    {
      numericType: "decimal128",
      byteOrder: "little-endian",
      scalarSizeBytes: 16,
      signedness: "signed",
      scaleFactor: "decimal exponent carried by encoded value",
      exponentLayout: "decimal128 finite coefficient/exponent encoding",
      limbOrder: "least-significant decimal limb first when limb materialization is used",
      intervalEndpointConvention: "not-interval",
      roundingMode: "nearest-ties-to-even unless a stage declares directed rounding",
      comparisonSemantics: "decimal numeric order after canonicalization",
      textExport: "canonical decimal scientific notation",
      appBufferSafe: false,
      authoritativeStorageSafe: true,
    },
    {
      numericType: "mp_limb_block",
      byteOrder: "little-endian",
      scalarSizeBytes: 0,
      signedness: "signed",
      scaleFactor: "explicit exponent and limb count in the owning row or manifest",
      exponentLayout: "sign, exponent, limb-count, little-endian fixed-width limbs",
      limbOrder: "least-significant limb first",
      intervalEndpointConvention: "not-interval unless wrapped by an interval layout",
      roundingMode: "producer-declared; validation replay must record the rounding mode",
      comparisonSemantics: "arbitrary-precision numeric order after canonicalization",
      textExport: "significand and exponent with exact limb checksum",
      appBufferSafe: false,
      authoritativeStorageSafe: true,
    },
  ],
  chartDescriptors: [
    {
      numericChart: "absolute_f64",
      role: "raw-coordinate-chart",
      preservesLocalDetailAcrossLargeOffsets: false,
    },
    {
      numericChart: "local_frame",
      role: "translated-local-geometry-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
    {
      numericChart: "nondimensional_ratio",
      role: "scale-ratio-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
    {
      numericChart: "log_magnitude",
      role: "positive-scale-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
    {
      numericChart: "signed_log_magnitude",
      role: "signed-scale-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
    {
      numericChart: "direction_log_magnitude",
      role: "vector-direction-plus-scale-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
    {
      numericChart: "interval_bounds",
      role: "bounded-validation-chart",
      preservesLocalDetailAcrossLargeOffsets: true,
    },
  ],
};
const ERROR_BUDGET_PROPAGATION_CONTRACT = {
  schema: "solver-error-budget-propagation.v1",
  stages: DEFAULT_ERROR_BUDGET_STAGES,
  authorityLevels: VALUE_AUTHORITY_BY_ID,
};
const STATUS_CODE_BY_ID = [
  "ok",
  "cancelled",
  "baseline_within_tolerance",
  "baseline_refined_result",
  "baseline_model_boundary_difference",
  "baseline_investigation_required_mismatch",
  "precision_escalated",
  "precision_failed",
  "simulation_envelope_exceeded",
  "insufficient_history_depth",
  "insufficient_scale_resolution",
  "time_resolution_insufficient",
  "root_not_bracketed",
  "root_unresolved",
  "small_jacobian",
  "transversality_floor_failed",
  "ledger_rerun_required",
  "stream_memory_pressure",
  "stream_write_failed",
  "stream_read_failed",
  "unsupported_browser_storage",
  "unsupported_wasm_threads",
  "validation_replay_mismatch",
  "app_contract_error",
  "internal_solver_error",
  "receiver_normal_degenerate",
];
const STATUS_SEVERITY_BY_ID = ["ok", "info", "warning", "halt", "error"];
const STATUS_TAXONOMY_METADATA = {
  ok: {
    category: "success",
    defaultSeverity: "ok",
    recoverableByDefault: true,
    stageHints: ["all"],
    description: "Operation completed without solver warnings or errors.",
  },
  cancelled: {
    category: "control",
    defaultSeverity: "info",
    recoverableByDefault: true,
    stageHints: ["run_control"],
    description: "Run was cancelled by caller request or lifecycle cleanup.",
  },
  baseline_within_tolerance: {
    category: "baseline-comparison",
    defaultSeverity: "ok",
    recoverableByDefault: true,
    stageHints: ["baseline_comparison"],
    description: "New solver output matches the isolated baseline within the declared tolerance.",
  },
  baseline_refined_result: {
    category: "baseline-comparison",
    defaultSeverity: "info",
    recoverableByDefault: true,
    stageHints: ["baseline_comparison"],
    description: "New solver output differs from the baseline in an expected refinement direction.",
  },
  baseline_model_boundary_difference: {
    category: "baseline-comparison",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["baseline_comparison"],
    description: "Baseline divergence is tied to a model-boundary or legacy-solver difference.",
  },
  baseline_investigation_required_mismatch: {
    category: "baseline-comparison",
    defaultSeverity: "error",
    recoverableByDefault: false,
    stageHints: ["baseline_comparison"],
    description: "Baseline divergence needs investigation before migration.",
  },
  precision_escalated: {
    category: "precision",
    defaultSeverity: "info",
    recoverableByDefault: true,
    stageHints: ["precision_selection", "admission"],
    description: "Solver selected a stricter precision path than the caller requested.",
  },
  precision_failed: {
    category: "precision",
    defaultSeverity: "error",
    recoverableByDefault: false,
    stageHints: ["precision_selection", "root_solving", "validation_replay"],
    description: "Requested precision could not be satisfied for the declared claim level.",
  },
  simulation_envelope_exceeded: {
    category: "admission",
    defaultSeverity: "error",
    recoverableByDefault: true,
    stageHints: ["admission", "simulation_envelope"],
    description: "Declared simulation envelope exceeds the current solver capability envelope.",
  },
  insufficient_history_depth: {
    category: "history",
    defaultSeverity: "halt",
    recoverableByDefault: true,
    stageHints: ["path_history", "root_solving"],
    description: "Available path history does not reach the needed causal window.",
  },
  insufficient_scale_resolution: {
    category: "precision",
    defaultSeverity: "error",
    recoverableByDefault: true,
    stageHints: ["precision_selection", "scale_normalization"],
    description: "Current numeric representation cannot preserve the required scale separation.",
  },
  time_resolution_insufficient: {
    category: "admission",
    defaultSeverity: "error",
    recoverableByDefault: true,
    stageHints: ["simulation_envelope", "time_resolution"],
    description: "Declared time resolution is too coarse for the requested claim level.",
  },
  root_not_bracketed: {
    category: "root-solving",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["root_solving"],
    description: "A candidate root interval did not bracket a sign change.",
  },
  root_unresolved: {
    category: "root-solving",
    defaultSeverity: "halt",
    recoverableByDefault: true,
    stageHints: ["root_solving", "root_ledger"],
    description: "Solver could not resolve a required causal root within the active controls.",
  },
  small_jacobian: {
    category: "root-solving",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["root_solving", "delayed_hits"],
    description: "Causal-root Jacobian is small enough to require special handling or diagnostics.",
  },
  transversality_floor_failed: {
    category: "root-solving",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["root_solving", "delayed_hits"],
    description: "Root or hit failed the configured transversality floor.",
  },
  ledger_rerun_required: {
    category: "root-solving",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["root_ledger"],
    description: "Root-ledger completeness requires a deeper or different replay window.",
  },
  stream_memory_pressure: {
    category: "stream-storage",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["path_stream", "storage_lifecycle"],
    description: "Path-history streaming reached a memory pressure threshold.",
  },
  stream_write_failed: {
    category: "stream-storage",
    defaultSeverity: "halt",
    recoverableByDefault: true,
    stageHints: ["path_stream", "storage_lifecycle"],
    description: "Solver could not write a requested stream chunk or sidecar.",
  },
  stream_read_failed: {
    category: "stream-storage",
    defaultSeverity: "halt",
    recoverableByDefault: true,
    stageHints: ["path_stream", "stream_readback"],
    description: "Solver could not read a requested stream chunk, manifest, or sidecar.",
  },
  unsupported_browser_storage: {
    category: "runtime-support",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["storage_lifecycle", "app_bridge"],
    description: "Requested browser storage backend is unavailable in the current runtime.",
  },
  unsupported_wasm_threads: {
    category: "runtime-support",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["threading_plan", "app_bridge"],
    description: "Requested WebAssembly internal threading is unavailable in the current runtime.",
  },
  validation_replay_mismatch: {
    category: "validation",
    defaultSeverity: "error",
    recoverableByDefault: false,
    stageHints: ["validation_replay"],
    description: "Validation replay did not reproduce the accepted result within tolerance.",
  },
  app_contract_error: {
    category: "app-contract",
    defaultSeverity: "error",
    recoverableByDefault: true,
    stageHints: ["app_bridge", "request_validation"],
    description: "App request or bridge message violates the solver contract.",
  },
  internal_solver_error: {
    category: "internal",
    defaultSeverity: "error",
    recoverableByDefault: false,
    stageHints: ["solver_core"],
    description: "Solver encountered an internal error outside caller-correctable contract input.",
  },
  receiver_normal_degenerate: {
    category: "root-solving",
    defaultSeverity: "warning",
    recoverableByDefault: true,
    stageHints: ["root_solving", "delayed_hits", "receiver_normal"],
    description: "Receiver-normal crossing geometry is degenerate for this causal root.",
  },
};
const STATUS_TAXONOMY = createStatusTaxonomy();
const DEFAULT_CAPABILITY_ENVELOPE = {
  maxInteractiveEntities: 2048,
  maxBatchEntities: 200000,
  minMemoryBudgetBytes: 16 * 1024 * 1024,
  minStorageBudgetBytesForStreaming: 64 * 1024 * 1024,
  minimumPositiveTolerance: 1e-15,
  maxInteractiveStepCount: 100000,
};
const ADMISSION_INTERACTIVE_STEP_COUNT = 100000;
const MODEL_CONTRACT_BYTES = 32;
const SIMULATION_ENVELOPE_F64_BYTES = 88;
const CAPABILITY_ENVELOPE_F64_BYTES = 48;
const ADMISSION_STRESS_SUMMARY_F64_BYTES = 96;
const STATUS_ROW_BYTES = 24;
const ADMISSION_REPORT_F64_BYTES = 112;
const CAUSAL_ROOT_REQUEST_F64_BYTES = 176;
const CAUSAL_ROOT_ROW_F64_BYTES = 176;
const ROOT_LEDGER_DETAIL_ROW_F64_BYTES = 248;
const DELAYED_HIT_ROW_F64_BYTES = 192;
const CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES = 24;
const PRECISION_DIAGNOSTIC_ROW_F64_BYTES = 96;
const PRECISION_SOLVE_OPTIONS_BYTES = 16;
const PRECISION_SOLVE_SUMMARY_F64_BYTES = 80;
const ERROR_BUDGET_F64_BYTES = 64;
const ERROR_BUDGET_STAGE_INPUT_F64_BYTES = 16;
const ERROR_BUDGET_STAGE_ROW_F64_BYTES = 40;
const ERROR_BUDGET_SUMMARY_F64_BYTES = 32;
const MOTION_SAMPLE_REQUEST_F64_BYTES = 112;
const MOTION_INTEGRATION_REQUEST_F64_BYTES = 120;
const PAIR_INTERACTION_REQUEST_F64_BYTES = 88;
const PAIR_INTERACTION_STATE_F64_BYTES = 80;
const PAIR_INTERACTION_PATH_CONSTRAINT_F64_BYTES = 48;
const PAIR_INTERACTION_SUMMARY_F64_BYTES = 352;
const T3_STEP_REQUEST_F64_BYTES = 120;
const T3_PARTICLE_STATE_F64_BYTES = 80;
const T3_PARTICLE_STEP_ROW_F64_BYTES = 104;
const T3_STEP_SUMMARY_F64_BYTES = 88;
const T3_UNRESOLVED_ROOT_SEGMENT_ROW_F64_BYTES = 208;
const T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_F64_BYTES = 112;
const T3_UNRESOLVED_ROOT_PAIR_POLICY_CODE_BY_ID = Object.freeze({
  disabled: 0,
  neighbor_pruned_v1: 1,
});
const T3_UNRESOLVED_ROOT_PAIR_POLICY_ID_BY_CODE = Object.freeze({
  0: "disabled",
  1: "neighbor_pruned_v1",
});
const T3_UNRESOLVED_ROOT_SEGMENT_ROW_STATUS_BY_CODE = Object.freeze({
  0: "disabled",
  1: "candidate_shape_evidence",
});
const T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_STATUS_BY_CODE = Object.freeze({
  0: "disabled",
  1: "missing_retained_replay_source",
  2: "candidate_same_record_binding",
});
const T3_RETAINED_CAUSAL_ROOT_REPLAY_FIELD_STATUS_BY_CODE = Object.freeze({
  0: "missing",
  1: "candidate_sidecar_shape_evidence",
  2: "candidate_same_record_binding",
});
const PAIR_INTERACTION_PATH_CONSTRAINT_GUIDANCE_MODE = "retained_knot_boundary";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_MODE = "retained_knot_boundary";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_MODE_LAW_AWARE = "law_aware_retained_knot_boundary";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_SEED_MODE =
  "law_aware_retained_knot_boundary_seed";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MODE =
  "finite_difference_frame_relaxation_v1";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_DEFAULT_ITERATION_COUNT = 8;
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MAX_ITERATION_COUNT = 256;
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_LINE_SEARCH_FACTORS = Object.freeze([
  1.25,
  1,
  0.5,
  0.25,
  0.125,
  0.0625,
  0.03125,
  0.015625,
  0.0078125,
  0.00390625,
]);
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON = 1e-12;
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET = 100;
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_KIND_BY_CODE = Object.freeze({
  0: "none",
  1: "predictor",
  2: "first_corrector",
  3: "second_corrector",
  4: "defect_correction",
  5: "predicted_defect_correction",
  6: "predicted_blend",
  7: "corrected_defect_correction",
  8: "corrected_blend",
  9: "linearized_defect_correction",
  10: "local_newton_defect_correction",
  11: "coupled_local_newton_defect_correction",
  12: "block_coupled_newton_defect_correction",
  13: "predicted_block_coupled_newton_defect_correction",
  14: "corrected_block_coupled_newton_defect_correction",
  15: "second_corrected_defect_correction",
  16: "second_corrected_block_coupled_newton_defect_correction",
  17: "second_corrected_blend",
  18: "third_corrector",
  19: "third_corrected_defect_correction",
  20: "third_corrected_block_coupled_newton_defect_correction",
  21: "third_corrected_blend",
  22: "causal_delay_numerical_newton_defect_correction",
  101: "predictor_center_of_mass_projected",
  102: "first_corrector_center_of_mass_projected",
  103: "second_corrector_center_of_mass_projected",
  104: "defect_correction_center_of_mass_projected",
  105: "predicted_defect_correction_center_of_mass_projected",
  106: "predicted_blend_center_of_mass_projected",
  107: "corrected_defect_correction_center_of_mass_projected",
  108: "corrected_blend_center_of_mass_projected",
  109: "linearized_defect_correction_center_of_mass_projected",
  110: "local_newton_defect_correction_center_of_mass_projected",
  111: "coupled_local_newton_defect_correction_center_of_mass_projected",
  112: "block_coupled_newton_defect_correction_center_of_mass_projected",
  113: "predicted_block_coupled_newton_defect_correction_center_of_mass_projected",
  114: "corrected_block_coupled_newton_defect_correction_center_of_mass_projected",
  115: "second_corrected_defect_correction_center_of_mass_projected",
  116: "second_corrected_block_coupled_newton_defect_correction_center_of_mass_projected",
  117: "second_corrected_blend_center_of_mass_projected",
  118: "third_corrector_center_of_mass_projected",
  119: "third_corrected_defect_correction_center_of_mass_projected",
  120: "third_corrected_block_coupled_newton_defect_correction_center_of_mass_projected",
  121: "third_corrected_blend_center_of_mass_projected",
  122: "causal_delay_numerical_newton_defect_correction_center_of_mass_projected",
});
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CODE_BY_KIND = Object.freeze(
  Object.fromEntries(
    Object.entries(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_KIND_BY_CODE).map(
      ([code, kind]) => [kind, Number(code)],
    ),
  ),
);
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_ACCEPTED = "accepted";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_REVERTED =
  "reverted_no_improvement";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES =
  "no_relaxable_samples";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED = "converged";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NOT_REQUESTED = "not_requested";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_STEP_CONVERGED =
  "step_converged";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NO_SAMPLES =
  "no_samples";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_INCOMPLETE =
  "incomplete_evidence";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NON_WORSENING =
  "aggregate_non_worsening";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_WORSENED =
  "aggregate_worsened";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_BY_CODE = Object.freeze({
  1: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_ACCEPTED,
  2: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_REVERTED,
  3: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES,
  4: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED,
  5: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NOT_REQUESTED,
  6: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_STEP_CONVERGED,
});
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NOT_REQUESTED = "not_requested";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES = "no_relaxable_samples";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_UPDATES = "no_update_candidates";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_LINE_SEARCH_STALLED = "line_search_stalled";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_TOLERANCE_REACHED = "tolerance_reached";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_ITERATION_BUDGET_EXHAUSTED =
  "iteration_budget_exhausted";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_STEP_TOLERANCE_REACHED =
  "step_tolerance_reached";
const PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_BY_CODE = Object.freeze({
  1: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NOT_REQUESTED,
  2: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES,
  3: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_UPDATES,
  4: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_LINE_SEARCH_STALLED,
  5: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_TOLERANCE_REACHED,
  6: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_ITERATION_BUDGET_EXHAUSTED,
  7: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_STEP_TOLERANCE_REACHED,
});
const PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_GUIDED = "guided_constraint_path";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_BOUNDARY_SEEDED =
  "boundary_seeded_constraint_path";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_DISCRETE_BOUNDARY_CONVERGED =
  "discrete_boundary_value_converged";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_SNAP = "constraint_snap_only";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_UNCONSTRAINED = "unconstrained";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_CLAIM_CONSTRAINED =
  "diagnostic_constraint_replay_not_boundary_value_solve";
const PAIR_INTERACTION_CONSTRAINT_SOLVER_CLAIM_DISCRETE_BOUNDARY_CONVERGED =
  "finite_difference_pair_boundary_value_solve_converged";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_STATUS_PENDING =
  "physical_boundary_solver_pending";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_CLAIM_PENDING =
  "retained_knot_guidance_not_physical_boundary_value_solve";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_GUIDANCE_ACCELERATION =
  "retained_knot_guidance_acceleration_required";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_RELAXATION_UNCONVERGED =
  "finite_difference_boundary_relaxation_not_converged";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_INITIAL_VELOCITY =
  "initial_velocity_boundary_not_preserved";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_BOUNDARY_RESIDUAL =
  "retained_knot_boundary_residual_not_preserved";
const PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_NOT_IMPLEMENTED =
  "physical_boundary_solver_not_implemented";
const PAIR_INTERACTION_EOM_EVIDENCE_STATUS_NONCANONICAL_PREVIEW =
  "noncanonical_preview_not_master_eom_evidence";
const PAIR_INTERACTION_EOM_EVIDENCE_REASON_RECEIVER_NORMAL_BRANCH_ROWS_MISSING =
  "receiver_normal_branch_rows_missing";
const PAIR_INTERACTION_EOM_EVIDENCE_METADATA = Object.freeze({
  canonicalEomEvidence: false,
  eomEvidenceStatus: PAIR_INTERACTION_EOM_EVIDENCE_STATUS_NONCANONICAL_PREVIEW,
  eomEvidenceReason:
    PAIR_INTERACTION_EOM_EVIDENCE_REASON_RECEIVER_NORMAL_BRANCH_ROWS_MISSING,
});
const PAIR_INTERACTION_DERIVED_BOUNDARY_POSITION_RESIDUAL_TOLERANCE = 1e-9;
const PAIR_INTERACTION_DERIVED_INITIAL_VELOCITY_RESIDUAL_TOLERANCE = 1e-9;
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_UNCHECKED = "unchecked";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_NO_SAMPLES = "no_boundary_samples";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_UNRESOLVED = "unresolved";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_WITHIN_TOLERANCE = "within_tolerance";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE = "exceeded_tolerance";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_SAME_TIME_PAIR_LAW =
  "same_time_pair_law";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_CAUSAL_DELAY_PAIR_LAW =
  "causal_delay_pair_law";
const PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_BY_CODE = Object.freeze({
  1: PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_SAME_TIME_PAIR_LAW,
  2: PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_CAUSAL_DELAY_PAIR_LAW,
});
const PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_UNCHECKED = "unchecked";
const PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_NO_SAMPLES = "no_position_samples";
const PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_UNRESOLVED = "unresolved";
const PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_WITHIN_TOLERANCE = "within_tolerance";
const PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_EXCEEDED_TOLERANCE = "exceeded_tolerance";
const PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_UNCHECKED = "unchecked";
const PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_NO_SAMPLES =
  "no_initial_velocity_samples";
const PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_UNRESOLVED = "unresolved";
const PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_WITHIN_TOLERANCE =
  "within_tolerance";
const PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE =
  "exceeded_tolerance";
const PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_UNCHECKED = "unchecked";
const PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_NO_SAMPLES = "no_guidance_samples";
const PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_UNRESOLVED = "unresolved";
const PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_WITHIN_TOLERANCE = "within_tolerance";
const PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_EXCEEDED_TOLERANCE = "exceeded_tolerance";
const PHASE_CLOCK_F64_BYTES = 24;
const PHASE_AT_HIT_ROW_F64_BYTES = 104;
const PHASE_AT_HIT_METADATA_F64_BYTES = 32;
const FRAME_BUFFER_ROW_F64_BYTES = 88;
const GEOMETRY_BOUNDS_ROW_F64_BYTES = 64;
const SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES = 64;
const SPHERE_POINT_INTERSECTION_ROW_F64_BYTES = 24;
const DELAYED_POTENTIAL_REQUEST_F64_BYTES = 144;
const DELAYED_POTENTIAL_ROW_F64_BYTES = 112;
const CIRCULAR_SELF_HIT_REQUEST_F64_BYTES = 48;
const CIRCULAR_SELF_HIT_ROW_F64_BYTES = 72;
const CIRCULAR_PATH_SEGMENT_F64_BYTES = 120;
const CIRCULAR_SOURCE_ROOT_REQUEST_F64_BYTES = 224;
const ASSEMBLY_STATE_ROW_F64_BYTES = 112;
const ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES = 80;
const ASSEMBLY_HIERARCHY_ROW_F64_BYTES = 56;
const ASSEMBLY_EVENT_ROW_F64_BYTES = 88;
const PATH_HISTORY_ROW_F64_BYTES = 96;
const PATH_HISTORY_CHUNK_ROW_BYTES = 104;
const STORAGE_LIFECYCLE_POLICY_BYTES = 56;
const PATH_HISTORY_LIFECYCLE_DECISION_ROW_BYTES = 32;
const SPACETIME_INDEX_OPTIONS_F64_BYTES = 24;
const SPACETIME_INDEX_ROW_F64_BYTES = 128;
const SPACETIME_QUERY_F64_BYTES = 96;
const EMISSION_SHELL_BROAD_PHASE_OPTIONS_F64_BYTES = 48;
const EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES = 112;
const EMISSION_SHELL_BROAD_PHASE_SUMMARY_BYTES = 32;
const EMISSION_SHELL_INDEXED_BROAD_PHASE_OPTIONS_F64_BYTES = 56;
const EMISSION_SHELL_INDEXED_BROAD_PHASE_SUMMARY_BYTES = 96;
const EMISSION_SHELL_NARROW_PHASE_REQUEST_F64_BYTES = 208;
const EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES = 40;
const EMISSION_SHELL_INDEXED_BROAD_PHASE_V0_STRATEGY = "emission_shell_broad_phase_v0";
const DEFAULT_MAX_CAUSAL_ROOTS = 64;
const DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS = 4096;
const DEFAULT_MAX_MOTION_FRAMES = 65536;
const DEFAULT_MAX_MOTION_PATH_ROWS = DEFAULT_MAX_MOTION_FRAMES;
const DEFAULT_MAX_SPACETIME_INDEX_ROWS = 65536;
const ABI_INFO_BYTES = 216;

export class SolverBridgeError extends Error {
  constructor(status) {
    super(status.message);
    this.name = "SolverBridgeError";
    this.status = status;
  }
}

export function createSolverAppBridgeClient(options = {}) {
  const state = {
    appId: null,
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    createWasmModule: options.createWasmModule || null,
    locateFile: options.locateFile || null,
    modulePromise: null,
    module: null,
    abiInfo: null,
    streams: new Map(),
    assemblyGraphStores: new Map(),
    runs: new Map(),
    nextRunSequence: 1,
    disposed: false,
    capabilities: createCapabilities(Boolean(options.createWasmModule)),
  };

  return {
    async init(request) {
      assertNotDisposed(state);
      const validation = validateInitRequest(request);
      if (validation.code !== "ok") {
        throw new SolverBridgeError(validation);
      }
      state.appId = request.appId;
      state.apiVersion = request.apiVersion;

      if (state.createWasmModule) {
        state.module = await loadWasmModule(state);
        runExportedSmoke(state.module, "architrino_solver_smoke");
        runExportedSmoke(state.module, "architrino_solver_contract_smoke");
        runExportedSmoke(state.module, "architrino_solver_root_smoke");
        state.abiInfo = readAbiInfo(state.module);
        assertAbiInfo(state.abiInfo);
        state.capabilities = {
          ...state.capabilities,
          abiInfo: state.abiInfo,
        };
      }

      return {
        apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
        solverVersion: "0.1.0",
        capabilities: state.capabilities,
        status: createStatus("ok", "ok", "solver bridge initialized"),
      };
    },

    async capabilities() {
      assertNotDisposed(state);
      return state.capabilities;
    },

    async planThreadingPolicy(request) {
      assertNotDisposed(state);
      return planThreadingPolicy(request, state.capabilities);
    },

    async prepareWorkPacketHeader(request) {
      assertNotDisposed(state);
      return prepareWorkPacketHeader(request);
    },

    async orderWorkPacketResults(request) {
      assertNotDisposed(state);
      return orderWorkPacketResults(request);
    },

    async mergeEmissionShellCandidatePacketResponsesF64(request) {
      assertNotDisposed(state);
      return mergeEmissionShellCandidatePacketResponsesF64(request);
    },

    async planPathHistoryWorkPackets(request) {
      assertNotDisposed(state);
      return planPathHistoryWorkPackets(state, request);
    },

    async runSimulation(request) {
      assertNotDisposed(state);
      const module = state.createWasmModule ? await requireWasmModule(state) : null;
      if (!module && request?.runKind !== "pairInteraction") {
        throw new SolverBridgeError(
          createStatus("app_contract_error", "halt", "WebAssembly module factory is required", {
            recoverable: false,
          })
        );
      }
      return runSimulationWithModule(state, module, request, state.abiInfo || defaultAbiInfo());
    },

    async describeRun(request) {
      assertNotDisposed(state);
      return describeRun(state, request);
    },

    async describeStream(request) {
      assertNotDisposed(state);
      return describeStream(state, request);
    },

    async validatePathHistoryDynamicReplayF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return validatePathHistoryDynamicReplayF64(
        state,
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async createPathHistoryStreamF64(request) {
      assertNotDisposed(state);
      return createPathHistoryStreamF64(state, request, state.abiInfo || defaultAbiInfo());
    },

    async planPathHistoryStorageLifecycleF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return planPathHistoryStorageLifecycleF64WithModule(
        state,
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async applyPathHistoryStorageLifecycleF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return applyPathHistoryStorageLifecycleF64WithModule(
        state,
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async queryEmissionShellCandidatesF64(request) {
      assertNotDisposed(state);
      return queryEmissionShellCandidatesF64(state, request, state.module, state.abiInfo || defaultAbiInfo());
    },

    async queryEmissionShellCandidatePacketF64(request) {
      assertNotDisposed(state);
      return queryEmissionShellCandidatePacketF64(
        state,
        request,
        state.module,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async queryEmissionShellCandidatePacketsF64(request) {
      assertNotDisposed(state);
      return queryEmissionShellCandidatePacketsF64(
        state,
        request,
        state.module,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async refineEmissionShellCandidateRootsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return refineEmissionShellCandidateRootsF64(
        state,
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async admitSimulationEnvelope(request) {
      assertNotDisposed(state);
      if (state.module && typeof state.module._architrino_solver_admit_simulation_envelope_f64 === "function") {
        return admitSimulationEnvelopeWithModule(state.module, request, state.abiInfo || defaultAbiInfo());
      }
      return admitSimulationEnvelope(request);
    },

    async diagnosePrecisionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return diagnosePrecisionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveCausalRootsPrecisionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootsPrecisionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveRootsAndHitsPrecisionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      const response = solveRootsAndHitsPrecisionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
      registerResponseStreams(state, response);
      return response;
    },

    async propagateErrorBudgetF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return propagateErrorBudgetF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async checkRootHitInvariantsF64(request) {
      assertNotDisposed(state);
      return checkRootHitInvariantsF64(request);
    },

    async classifyRootLedgerTransitionsF64(request) {
      assertNotDisposed(state);
      return classifyRootLedgerTransitionsF64(request);
    },

    async solveCausalRootsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootsF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveCircularSourceCausalRootsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCircularSourceCausalRootsF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async solveCircularSourceRootsHitsLedgerF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      const response = solveCircularSourceRootsHitsLedgerF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
      registerResponseStreams(state, response);
      return response;
    },

    async solveCircularSourceRootsHitsLedgerNormalizedF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      const response = solveCircularSourceRootsHitsLedgerNormalizedF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
      registerResponseStreams(state, response);
      return response;
    },

    async solveMovingCircularSourceCausalRootsF64(request) {
      assertNotDisposed(state);
      return solveMovingCircularSourceCausalRootsF64(request);
    },

    async solveMovingCircularSameSourceCausalRootsF64(request) {
      assertNotDisposed(state);
      return solveMovingCircularSameSourceCausalRootsF64(request);
    },

    async computeMovingCircularObserverFieldF64(request) {
      assertNotDisposed(state);
      return computeMovingCircularObserverFieldF64(request);
    },

    async solveCausalRootsNormalizedF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootsNormalizedF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveCausalRootBatchF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootBatchF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveRootsAndHitsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      const response = solveRootsAndHitsF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
      registerResponseStreams(state, response);
      return response;
    },

    async buildRootLedgerDetailF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildRootLedgerDetailF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async computePhaseAtHitF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return computePhaseAtHitF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async summarizePhaseAtHitsF64(request) {
      assertNotDisposed(state);
      return summarizePhaseAtHitsF64(request);
    },

    async computeSharedGeometryF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return computeSharedGeometryF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async detectAssemblyMembershipEventsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return detectAssemblyMembershipEventsF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async buildAssemblyGraphDatasetF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildAssemblyGraphDatasetF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async createAssemblyGraphStoreF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return createAssemblyGraphStoreF64(state, module, request, state.abiInfo || defaultAbiInfo());
    },

    async describeAssemblyGraphStoreF64(request = {}) {
      assertNotDisposed(state);
      return describeAssemblyGraphStoreF64(state, request);
    },

    async readAssemblyGraphStoreRangeF64(request = {}) {
      assertNotDisposed(state);
      return readAssemblyGraphStoreRangeF64(state, request);
    },

    async buildSpaceTimeIndexF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildSpaceTimeIndexF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async buildPathHistoryStreamSpaceTimeIndexF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildPathHistoryStreamSpaceTimeIndexF64WithModule(
        state,
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async querySpaceTimeIndexF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return querySpaceTimeIndexF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async sampleLinearMotionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return sampleLinearMotionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async integrateConstantAccelerationMotionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return integrateConstantAccelerationMotionF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async stepT3UniverseF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return stepT3UniverseF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async cancelRun(request = {}) {
      assertNotDisposed(state);
      return cancelRun(state, request);
    },

    async openStream(request = {}) {
      assertNotDisposed(state);
      return openRegisteredStream(state, request);
    },

    async readStreamRange(request = {}) {
      assertNotDisposed(state);
      return readRegisteredStreamRange(state, request);
    },

    async closeRun(request = {}) {
      assertNotDisposed(state);
      let releaseSummary = { releasedStreamCount: 0, deletedNativeFileStreamCount: 0 };
      if (request.releaseStreams) {
        releaseSummary = releaseRunStreams(state, request.runId);
        if (request.runId != null) {
          state.runs.delete(request.runId);
        }
      }
      return createStatus("ok", "ok", "run resources released", {
        runId: request.runId,
        details: releaseSummary,
      });
    },

    async dispose() {
      releaseAllStreams(state);
      state.assemblyGraphStores.clear();
      state.disposed = true;
      state.module = null;
      state.modulePromise = null;
      state.runs.clear();
    },
  };
}

function createCapabilities(hasWasmModuleFactory) {
  const supportsOpfs = typeof navigator !== "undefined" && Boolean(navigator.storage?.getDirectory);
  const browserWorkerAvailable = typeof Worker !== "undefined";
  const supportsNativeFile = hasNodeFileStorage();
  return {
    precisionPaths: DEFAULT_PRECISION_PATHS,
    outputLayouts: DEFAULT_OUTPUT_LAYOUTS,
    binaryLayouts: createBinaryLayoutCatalog(),
    storage: {
      supportsOpfs,
      supportsNativeFile,
      supportsCallerBuffer: true,
      maxRecommendedBytes: 64 * 1024 * 1024,
    },
    threading: {
      nativeThreads: false,
      wasmThreads: false,
      browserWorker: browserWorkerAvailable,
      crossOriginIsolationRequired: true,
    },
    appBridge: {
      schema: "solver-app-bridge-capabilities.v1",
      apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
      adapterVersion: SOLVER_APP_ADAPTERS_VERSION,
      appAdapters: [
        {
          appId: "animator",
          runKinds: ["motionSimulation", "pathHistory", "appPlayback", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "photon",
          runKinds: ["causalRoots", "phaseDiagnostics", "pathHistory", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "ideal-braid",
          runKinds: ["delayedHits", "pathHistory", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "causal-delay-feedback",
          runKinds: [
            "motionSimulation",
            "pathHistory",
            "causalRoots",
            "delayedHits",
            "appPlayback",
            "pairInteraction",
            "validationReplay",
          ],
        },
        {
          appId: "t3",
          runKinds: ["motionSimulation", "pathHistory", "validationReplay"],
        },
      ],
      denseDataTransport: ["array-buffer", "stream-handle"],
      workerModel: {
        bridgeOwnsWasmLifecycle: true,
        appsRequireCppHandling: false,
        longRunningRunsOffUiThreadRequired: true,
        browserWorkerAvailable,
        wasmInternalThreadsAvailable: false,
        fallback: "single-solver-worker-or-batch",
      },
      storageFallbacks: {
        preferredDurableBrowserTarget: "opfs",
        durableBrowserTargetAvailable: supportsOpfs,
        preferredNativeFileTarget: "native-file",
        nativeFileTargetAvailable: supportsNativeFile,
        transientTarget: "caller-buffer",
        unsupportedStorageStatusCode: "unsupported_browser_storage",
      },
      precisionRouting: {
        schema: "solver-precision-routing-capabilities.v1",
        routes: [
          {
            routeFamily: "linear-root",
            runConfigKeys: ["rootRequest", "normalizedRootRequest"],
            precisionEngine: "native-precision-path",
            precisionSummary: "native-precision-solve-summary-f64",
            fullPrecisionPathSelector: true,
            normalizedCoordinatesSupported: true,
            selectedNumericTypes: ["f64", "decimal128"],
          },
          {
            routeFamily: "circular-source",
            runConfigKeys: ["circularSourceRootRequest", "normalizedCircularSourceRootRequest"],
            precisionEngine: "analytic-circular-source-f64",
            precisionSummary: "analytic-circular-source-run-summary-f64",
            fullPrecisionPathSelector: true,
            normalizedCoordinatesSupported: true,
            selectedNumericTypes: ["f64"],
          },
        ],
      },
      statusTaxonomy: deepCloneJson(STATUS_TAXONOMY),
      streamQueries: {
        schema: "solver-stream-query-capabilities.v1",
        helpers: [
          "createPathHistoryStreamF64",
          "describeStream",
          "readStreamRange",
          "validatePathHistoryDynamicReplayF64",
          "buildPathHistoryStreamSpaceTimeIndexF64",
          "queryEmissionShellCandidatesF64",
          "queryEmissionShellCandidatePacketF64",
          "queryEmissionShellCandidatePacketsF64",
          "refineEmissionShellCandidateRootsF64",
          "planPathHistoryStorageLifecycleF64",
          "applyPathHistoryStorageLifecycleF64",
        ],
        pathHistoryLayouts: ["path_segment.v1"],
        indexedFilters: ["pathKeys", "chunkIndices", "timeRange", "frameRange", "byteRange"],
        rangeMetadata: ["timeRange", "frameRange", "byteRange", "bounds"],
        broadPhaseQueries: [
          {
            method: "queryEmissionShellCandidatesF64",
            responseSchema: "solver-emission-shell-candidates.v1",
            candidateKind: "broad_phase_possible",
            estimateMethod: "sampled_linear_segment_bisection.v1",
            narrowPhaseAuthorities: [
              "solveCausalRootsF64",
              "solveCausalRootsPrecisionF64",
              "solveCausalRootsNormalizedF64",
              "solveCircularSourceRootsHitsLedgerF64",
              "solveCircularSourceRootsHitsLedgerNormalizedF64",
              "solveMovingCircularSourceCausalRootsF64",
              "solveMovingCircularSameSourceCausalRootsF64",
              "solveRootsAndHitsPrecisionF64",
              "solveRootsAndHitsF64",
              "refineEmissionShellCandidateRootsF64",
            ],
          },
          {
            method: "queryEmissionShellCandidatePacketF64",
            responseSchema: "solver-emission-shell-candidates.v1",
            candidateKind: "broad_phase_possible",
            estimateMethod: "sampled_linear_segment_bisection.v1",
            narrowPhaseAuthorities: [
              "solveCausalRootsF64",
              "solveCausalRootsPrecisionF64",
              "solveCausalRootsNormalizedF64",
              "solveCircularSourceRootsHitsLedgerF64",
              "solveCircularSourceRootsHitsLedgerNormalizedF64",
              "solveMovingCircularSourceCausalRootsF64",
              "solveMovingCircularSameSourceCausalRootsF64",
              "solveRootsAndHitsPrecisionF64",
              "solveRootsAndHitsF64",
              "refineEmissionShellCandidateRootsF64",
            ],
          },
          {
            method: "queryEmissionShellCandidatePacketsF64",
            responseSchema: "solver-emission-shell-candidates.v1",
            candidateKind: "broad_phase_possible",
            estimateMethod: "sampled_linear_segment_bisection.v1",
            narrowPhaseAuthorities: [
              "solveCausalRootsF64",
              "solveCausalRootsPrecisionF64",
              "solveCausalRootsNormalizedF64",
              "solveCircularSourceRootsHitsLedgerF64",
              "solveCircularSourceRootsHitsLedgerNormalizedF64",
              "solveMovingCircularSourceCausalRootsF64",
              "solveMovingCircularSameSourceCausalRootsF64",
              "solveRootsAndHitsPrecisionF64",
              "solveRootsAndHitsF64",
              "refineEmissionShellCandidateRootsF64",
            ],
          },
        ],
      },
      workPackets: {
        schema: "solver-work-packet-capabilities.v1",
        headerSchema: "solver-work-packet.v1",
        helpers: [
          "prepareWorkPacketHeader",
          "orderWorkPacketResults",
          "planPathHistoryWorkPackets",
          "mergeEmissionShellCandidatePacketResponsesF64",
        ],
        pathHistoryPlanFilters: [
          "sourcePathKeys",
          "receiverPathKeys",
          "sourceChunkIndices",
          "receiverChunkIndices",
          "timeRange",
        ],
        deterministicMergeOrder: ["mergeKey", "mergeOrder", "packetId"],
        rowSizeValidation: true,
      },
    },
    numericSerialization: cloneNumericSerializationContract(),
    errorBudgetPropagation: cloneErrorBudgetPropagationContract(),
    validation: {
      invariantChecks: ["root_hit_f64"],
      transitionClassifiers: ["root_ledger_f64"],
      baselineClassifications: [
        "baseline_within_tolerance",
        "baseline_refined_result",
        "baseline_model_boundary_difference",
        "baseline_investigation_required_mismatch",
      ],
    },
    maxTransferBytes: 64 * 1024 * 1024,
    wasmModuleFactory: hasWasmModuleFactory,
  };
}

function cloneNumericSerializationContract() {
  return {
    schema: NUMERIC_SERIALIZATION_CONTRACT.schema,
    descriptors: NUMERIC_SERIALIZATION_CONTRACT.descriptors.map((descriptor) => ({ ...descriptor })),
    chartDescriptors: NUMERIC_SERIALIZATION_CONTRACT.chartDescriptors.map((descriptor) => ({
      ...descriptor,
    })),
  };
}

function cloneErrorBudgetPropagationContract() {
  return {
    schema: ERROR_BUDGET_PROPAGATION_CONTRACT.schema,
    stages: ERROR_BUDGET_PROPAGATION_CONTRACT.stages.map((stage) => ({ ...stage })),
    authorityLevels: [...ERROR_BUDGET_PROPAGATION_CONTRACT.authorityLevels],
  };
}

function createStatusTaxonomy() {
  return {
    schema: "solver-status-taxonomy.v1",
    severities: STATUS_SEVERITY_BY_ID,
    codes: STATUS_CODE_BY_ID.map((code, id) => {
      const metadata = STATUS_TAXONOMY_METADATA[code];
      if (!metadata) {
        throw new Error(`missing solver status taxonomy metadata for ${code}`);
      }
      return {
        id,
        code,
        ...metadata,
      };
    }),
  };
}

function createBinaryLayoutCatalog() {
  return {
    schema: "solver-binary-layout-catalog.v1",
    byteOrder: "little-endian",
    layouts: DEFAULT_OUTPUT_LAYOUTS.map((layout) => {
      const rowSizeBytes = BINARY_LAYOUT_ROW_SIZE_BYTES.get(layout);
      const role = BINARY_LAYOUT_ROLE_BY_ID[layout];
      if (!rowSizeBytes || !role) {
        throw new Error(`missing solver binary layout catalog metadata for ${layout}`);
      }
      return {
        layout,
        role,
        numericType: "f64",
        rowSizeBytes,
        fixedRowSize: true,
        denseBufferSafe: true,
        authoritativeStorageSafe: true,
        streamable: STREAMABLE_BINARY_LAYOUTS.has(layout),
      };
    }),
  };
}

function validateInitRequest(request) {
  if (!request || typeof request !== "object") {
    return createStatus("app_contract_error", "error", "init request object is required", {
      recoverable: false,
    });
  }
  if (!KNOWN_APP_IDS.includes(request.appId)) {
    return createStatus("app_contract_error", "error", "known app id is required", {
      recoverable: false,
    });
  }
  if (!request.apiVersion) {
    return createStatus("app_contract_error", "error", "api version is required", {
      recoverable: false,
    });
  }
  if (!request.storagePolicy || !request.threadingPolicy) {
    return createStatus(
      "app_contract_error",
      "error",
      "storage policy and threading policy are required",
      { recoverable: false }
    );
  }
  return createStatus("ok", "ok", "init request accepted");
}

function planThreadingPolicy(request, capabilities) {
  validateThreadingPlanRequest(request);
  const policy = request.policy;
  const workload = request.workload;
  const observations = workload.observations ?? null;
  const minItemsPerWorker = Math.max(1, workload.minItemsPerWorker ?? 1);
  const maxWorkersByItems =
    workload.itemCount === 0 ? 0 : Math.max(1, Math.ceil(workload.itemCount / minItemsPerWorker));
  const requestedWorkerCount = resolveRequestedWorkerCount(policy, workload, maxWorkersByItems);
  const deterministicReduction = Boolean(policy.deterministic || workload.deterministicRequired);
  const statuses = [];

  let activeWorkerCount = workload.itemCount === 0 ? 0 : 1;
  let schedulingMode = workload.itemCount === 0 ? "idle" : "sequential";
  let backend = "single-thread";
  let fallbackReason = null;

  if (workload.itemCount > 0 && requestedWorkerCount > 1) {
    if (capabilities.threading.nativeThreads) {
      activeWorkerCount = requestedWorkerCount;
      schedulingMode = "native-thread-pool";
      backend = "native-threads";
    } else if (capabilities.threading.wasmThreads) {
      activeWorkerCount = requestedWorkerCount;
      schedulingMode = "wasm-thread-pool";
      backend = "wasm-threads";
    } else {
      fallbackReason = "wasm_threads_unavailable";
      statuses.push(
        createStatus("unsupported_wasm_threads", "warning", "threaded execution fell back to sequential bridge execution", {
          recoverable: true,
          stage: "threading_plan",
          details: {
            requestedWorkerCount,
            browserWorkerAvailable: capabilities.threading.browserWorker,
          },
        })
      );
    }
  }

  if (workload.deterministicRequired && !policy.deterministic) {
    statuses.push(
      createStatus(
        "app_contract_error",
        "error",
        "deterministic threading is required for this workload",
        {
          recoverable: true,
          stage: "threading_plan",
        }
      )
    );
  }

  const chunkPlan = createThreadingChunkPlan(workload.itemCount, minItemsPerWorker, activeWorkerCount);
  const determinismStatus = resolveThreadingDeterminismStatus(policy, workload, deterministicReduction);
  const contention = summarizeThreadingContention({
    observations,
    requestedWorkerCount,
    activeWorkerCount,
    queueDepth: chunkPlan.queueDepth,
    fallbackReason,
  });
  const chunkTimings = summarizeThreadingChunkTimings(observations?.chunkDurationsMs ?? []);
  const stageSpeedup = summarizeThreadingStageSpeedup(observations, activeWorkerCount);
  const status = summarizeThreadingPlanStatus(statuses);
  return {
    schema: "solver-threading-plan.v1",
    stage: workload.stage,
    itemCount: workload.itemCount,
    minItemsPerWorker,
    requestedWorkerCount,
    activeWorkerCount,
    schedulingMode,
    backend,
    deterministicReduction,
    browserWorkerAvailable: capabilities.threading.browserWorker,
    wasmThreadsAvailable: capabilities.threading.wasmThreads,
    nativeThreadsAvailable: capabilities.threading.nativeThreads,
    fallbackReason,
    plannedChunkCount: chunkPlan.plannedChunkCount,
    plannedChunkItemCount: chunkPlan.plannedChunkItemCount,
    tailChunkItemCount: chunkPlan.tailChunkItemCount,
    queueDepth: chunkPlan.queueDepth,
    determinismStatus,
    contention,
    chunkTimings,
    stageSpeedup,
    speedupBaselineWorkerCount: activeWorkerCount <= 1 ? 1 : activeWorkerCount,
    statuses,
    status,
  };
}

function validateThreadingPlanRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "threading plan request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.policy || typeof request.policy !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "threading policy is required", {
        recoverable: false,
      })
    );
  }
  if (!["single-thread", "auto", "fixed"].includes(request.policy.mode)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "known threading policy mode is required", {
        recoverable: false,
      })
    );
  }
  if (request.policy.maxThreads != null) {
    requirePositiveInteger(request.policy.maxThreads, "policy.maxThreads");
  }
  if (!request.workload || typeof request.workload !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "threading workload is required", {
        recoverable: false,
      })
    );
  }
  requireUint32(request.workload.itemCount, "workload.itemCount");
  if (request.workload.minItemsPerWorker != null) {
    requirePositiveInteger(request.workload.minItemsPerWorker, "workload.minItemsPerWorker");
  }
  if (request.workload.observations != null) {
    validateThreadingWorkloadObservations(request.workload.observations);
  }
  requireNonemptyString(request.workload.stage, "workload.stage");
}

function validateThreadingWorkloadObservations(observations) {
  if (!observations || typeof observations !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "workload.observations must be an object", {
        recoverable: false,
      })
    );
  }
  if (observations.chunkDurationsMs != null) {
    if (!Array.isArray(observations.chunkDurationsMs)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "workload.observations.chunkDurationsMs must be an array", {
          recoverable: false,
        })
      );
    }
    observations.chunkDurationsMs.forEach((duration, index) => {
      requireNonnegativeFiniteNumber(duration, `workload.observations.chunkDurationsMs[${index}]`);
    });
  }
  if (observations.singleThreadElapsedMs != null) {
    requirePositiveFiniteNumber(observations.singleThreadElapsedMs, "workload.observations.singleThreadElapsedMs");
  }
  if (observations.activeElapsedMs != null) {
    requirePositiveFiniteNumber(observations.activeElapsedMs, "workload.observations.activeElapsedMs");
  }
  if (observations.contentionWaitMs != null) {
    requireNonnegativeFiniteNumber(observations.contentionWaitMs, "workload.observations.contentionWaitMs");
  }
}

function resolveRequestedWorkerCount(policy, workload, maxWorkersByItems) {
  if (workload.itemCount === 0 || policy.mode === "single-thread") {
    return workload.itemCount === 0 ? 0 : 1;
  }
  const maxThreads = policy.maxThreads ?? maxWorkersByItems;
  return Math.max(1, Math.min(maxThreads, maxWorkersByItems));
}

function createThreadingChunkPlan(itemCount, minItemsPerWorker, activeWorkerCount) {
  if (itemCount === 0) {
    return {
      plannedChunkCount: 0,
      plannedChunkItemCount: 0,
      tailChunkItemCount: 0,
      queueDepth: 0,
    };
  }
  const plannedChunkCount = Math.ceil(itemCount / minItemsPerWorker);
  const tailRemainder = itemCount % minItemsPerWorker;
  return {
    plannedChunkCount,
    plannedChunkItemCount: minItemsPerWorker,
    tailChunkItemCount: tailRemainder === 0 ? minItemsPerWorker : tailRemainder,
    queueDepth: Math.max(0, plannedChunkCount - activeWorkerCount),
  };
}

function resolveThreadingDeterminismStatus(policy, workload, deterministicReduction) {
  if (workload.deterministicRequired && !policy.deterministic) {
    return "required-but-not-requested";
  }
  return deterministicReduction ? "deterministic" : "relaxed";
}

function summarizeThreadingContention({
  observations,
  requestedWorkerCount,
  activeWorkerCount,
  queueDepth,
  fallbackReason,
}) {
  const observedWaitMs = observations?.contentionWaitMs ?? null;
  return {
    source: observedWaitMs == null ? "policy-estimate" : "caller-observed",
    risk: classifyThreadingContentionRisk(activeWorkerCount, queueDepth, fallbackReason, observedWaitMs),
    queueDepth,
    oversubscribedWorkerCount: Math.max(0, requestedWorkerCount - activeWorkerCount),
    observedWaitMs,
  };
}

function classifyThreadingContentionRisk(activeWorkerCount, queueDepth, fallbackReason, observedWaitMs) {
  if (observedWaitMs != null) {
    if (observedWaitMs === 0) {
      return "none";
    }
    if (observedWaitMs < 1) {
      return "low";
    }
    if (observedWaitMs < 10) {
      return "medium";
    }
    return "high";
  }
  if (fallbackReason || activeWorkerCount <= 1) {
    return "none";
  }
  if (queueDepth === 0) {
    return "low";
  }
  if (queueDepth <= activeWorkerCount * 2) {
    return "medium";
  }
  return "high";
}

function summarizeThreadingChunkTimings(chunkDurationsMs) {
  if (chunkDurationsMs.length === 0) {
    return {
      source: "not-measured",
      observedChunkCount: 0,
      minMs: null,
      maxMs: null,
      meanMs: null,
      totalMs: null,
    };
  }
  const totalMs = chunkDurationsMs.reduce((sum, value) => sum + value, 0);
  return {
    source: "caller-observed",
    observedChunkCount: chunkDurationsMs.length,
    minMs: Math.min(...chunkDurationsMs),
    maxMs: Math.max(...chunkDurationsMs),
    meanMs: totalMs / chunkDurationsMs.length,
    totalMs,
  };
}

function summarizeThreadingStageSpeedup(observations, activeWorkerCount) {
  const baselineMs = observations?.singleThreadElapsedMs ?? null;
  const activeMs = observations?.activeElapsedMs ?? null;
  const hasObservedSpeedup = baselineMs != null && activeMs != null;
  const speedupRatio = hasObservedSpeedup ? baselineMs / activeMs : null;
  return {
    source: hasObservedSpeedup ? "caller-observed" : "not-measured",
    baselineWorkerCount: 1,
    comparedWorkerCount: activeWorkerCount,
    speedupRatio,
    parallelEfficiency:
      speedupRatio == null || activeWorkerCount <= 0 ? null : speedupRatio / activeWorkerCount,
  };
}

function summarizeThreadingPlanStatus(statuses) {
  if (statuses.some((status) => status.severity === "error" || status.severity === "halt")) {
    return createStatus("app_contract_error", "error", "threading plan requires caller attention", {
      recoverable: true,
      stage: "threading_plan",
    });
  }
  if (statuses.some((status) => status.code === "unsupported_wasm_threads")) {
    return createStatus("unsupported_wasm_threads", "warning", "threading plan selected sequential fallback", {
      recoverable: true,
      stage: "threading_plan",
    });
  }
  return createStatus("ok", "ok", "threading plan accepted", {
    stage: "threading_plan",
  });
}

function prepareWorkPacketHeader(request) {
  const packet = normalizeWorkPacketHeader(request);
  const serializedHeader = serializeWorkPacketHeader(packet);
  const headerChecksum = fnv1a64StringHex(serializedHeader);
  const diagnostics = validatePreparedWorkPacketHeader(packet, headerChecksum).map(toDiagnosticRecord);
  const status =
    diagnostics.length === 0
      ? createStatus("ok", "ok", "work packet header prepared", {
          stage: "work_packet",
          details: { packetId: packet.packetId, headerChecksum },
        })
      : createStatus(diagnostics[0].code, diagnostics[0].severity, "work packet header rejected", {
          recoverable: false,
          stage: "work_packet",
          details: { packetId: packet.packetId, diagnosticCount: diagnostics.length },
        });
  return {
    schema: "solver-work-packet-header.v1",
    packet: {
      ...packet,
      headerChecksum,
    },
    serializedHeader,
    headerChecksum,
    diagnostics,
    status,
  };
}

function orderWorkPacketResults(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "work-packet result order request object is required", {
        recoverable: false,
      })
    );
  }
  requireArray(request.results, "results");
  const results = request.results
    .map((result, index) => normalizeWorkPacketResultRef(result, `results[${index}]`))
    .sort((left, right) => {
      if (left.mergeKey !== right.mergeKey) {
        return left.mergeKey < right.mergeKey ? -1 : 1;
      }
      if (left.mergeOrder !== right.mergeOrder) {
        return left.mergeOrder - right.mergeOrder;
      }
      if (left.packetId === right.packetId) {
        return 0;
      }
      return left.packetId < right.packetId ? -1 : 1;
    });
  return {
    schema: "solver-work-packet-result-order.v1",
    results,
    status: createStatus("ok", "ok", "work packet results ordered", {
      stage: "work_packet",
      details: { resultCount: results.length },
    }),
  };
}

function mergeEmissionShellCandidatePacketResponsesF64(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "emission-shell packet response merge request object is required",
        {
          recoverable: false,
        }
      )
    );
  }
  requireArray(request.responses, "responses");
  if (request.responses.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "responses must not be empty", {
        recoverable: false,
      })
    );
  }

  const responses = request.responses
    .map((response, index) => normalizeEmissionShellPacketResponse(response, `responses[${index}]`))
    .sort(compareEmissionShellPacketResponses);
  const first = responses[0];
  const streamId = first.streamId;
  const signalSpeed = first.signalSpeed;
  const tolerance = first.tolerance;
  for (const response of responses) {
    if (response.streamId !== streamId) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "packet responses must share one streamId", {
          recoverable: false,
          details: { expected: streamId, actual: response.streamId },
        })
      );
    }
    if (response.signalSpeed !== signalSpeed || response.tolerance !== tolerance) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "packet responses must share signalSpeed and tolerance", {
          recoverable: false,
          details: {
            expectedSignalSpeed: signalSpeed,
            actualSignalSpeed: response.signalSpeed,
            expectedTolerance: tolerance,
            actualTolerance: response.tolerance,
          },
        })
      );
    }
  }

  const candidates = responses.flatMap((response) => response.candidates);
  const buffers = [
    mergeEmissionShellResponseBuffers(
      responses,
      "emission-shell-candidates",
      "emission_shell_candidate.v1",
      EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES
    ),
    mergeEmissionShellResponseBuffers(
      responses,
      "emission-shell-narrow-phase",
      "emission_shell_narrow_phase.v1",
      EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES
    ),
  ];
  const pairCount = sumBy(responses, (response) => response.pairCount);
  const rejectedPairCount = sumBy(responses, (response) => response.rejectedPairCount);
  const falsePositiveEstimate = mergeEmissionShellFalsePositiveEstimates(
    responses.map((response) => response.falsePositiveEstimate)
  );
  const truncated = responses.some((response) => response.truncated);
  const packetResults = createMergedEmissionShellPacketResults(responses, buffers);
  const scanSummary = mergeEmissionShellScanSummaries(
    responses.map((response) => response.scanSummary),
    buffers,
    candidates.length,
    truncated
  );
  return {
    schema: "solver-emission-shell-candidates.v1",
    streamId,
    signalSpeed,
    tolerance,
    pairCount,
    rejectedPairCount,
    candidateCount: candidates.length,
    rejectionRate: pairCount === 0 ? 0 : rejectedPairCount / pairCount,
    candidateRate: pairCount === 0 ? 0 : candidates.length / pairCount,
    falsePositiveEstimate,
    scanSummary,
    truncated,
    candidates,
    buffers,
    packetResults,
    status: createStatus(
      truncated ? "stream_memory_pressure" : "ok",
      truncated ? "warning" : "ok",
      truncated
        ? "emission-shell packet responses merged with truncation"
        : "emission-shell packet responses merged",
      {
        stage: "work_packet",
        details: {
          streamId,
          packetCount: responses.length,
          packetIds: responses.map((response) => response.packetId),
          pairCount,
          rejectedPairCount,
          candidateCount: candidates.length,
        },
      }
    ),
  };
}

function normalizeEmissionShellPacketResponse(response, label) {
  if (!response || typeof response !== "object" || Array.isArray(response)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an emission-shell response object`, {
        recoverable: false,
      })
    );
  }
  if (response.schema !== "solver-emission-shell-candidates.v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.schema is not an emission-shell response`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(response.packetId, `${label}.packetId`);
  requireSafeUint64(response.packetMergeOrder, `${label}.packetMergeOrder`);
  requireNonemptyString(response.packetMergeKey, `${label}.packetMergeKey`);
  const packetResult = normalizeWorkPacketResultRef(response.packetResult, `${label}.packetResult`);
  if (
    packetResult.packetId !== response.packetId ||
    packetResult.mergeOrder !== response.packetMergeOrder ||
    packetResult.mergeKey !== response.packetMergeKey
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.packetResult does not match packet merge metadata`, {
        recoverable: false,
        details: {
          packetId: response.packetId,
          resultPacketId: packetResult.packetId,
          packetMergeOrder: response.packetMergeOrder,
          resultMergeOrder: packetResult.mergeOrder,
          packetMergeKey: response.packetMergeKey,
          resultMergeKey: packetResult.mergeKey,
        },
      })
    );
  }
  requireNonemptyString(response.streamId, `${label}.streamId`);
  requirePositiveFiniteNumber(response.signalSpeed, `${label}.signalSpeed`);
  requireNonnegativeFiniteNumber(response.tolerance, `${label}.tolerance`);
  requireSafeUint64(response.pairCount, `${label}.pairCount`);
  requireSafeUint64(response.rejectedPairCount, `${label}.rejectedPairCount`);
  requireSafeUint64(response.candidateCount, `${label}.candidateCount`);
  requireArray(response.candidates, `${label}.candidates`);
  requireArray(response.buffers, `${label}.buffers`);
  if (!response.falsePositiveEstimate || typeof response.falsePositiveEstimate !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.falsePositiveEstimate is required`, {
        recoverable: false,
      })
    );
  }
  if (!response.scanSummary || typeof response.scanSummary !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.scanSummary is required`, {
        recoverable: false,
      })
    );
  }
  if (typeof response.truncated !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.truncated must be boolean`, {
        recoverable: false,
      })
    );
  }
  return {
    ...response,
    packetResult,
  };
}

function compareEmissionShellPacketResponses(left, right) {
  if (left.packetMergeKey !== right.packetMergeKey) {
    return left.packetMergeKey < right.packetMergeKey ? -1 : 1;
  }
  if (left.packetMergeOrder !== right.packetMergeOrder) {
    return left.packetMergeOrder - right.packetMergeOrder;
  }
  if (left.packetId === right.packetId) {
    return 0;
  }
  return left.packetId < right.packetId ? -1 : 1;
}

function mergeEmissionShellResponseBuffers(responses, bufferId, layout, rowSizeBytes) {
  const parts = responses.map((response, index) => {
    const buffer = response.buffers.find((candidate) => candidate.layout === layout);
    if (!buffer) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `responses[${index}] missing ${layout} buffer`, {
          recoverable: false,
        })
      );
    }
    if (!(buffer.buffer instanceof ArrayBuffer)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `responses[${index}] ${layout} buffer payload is required`, {
          recoverable: false,
        })
      );
    }
    if (buffer.byteLength !== buffer.rowCount * rowSizeBytes || buffer.buffer.byteLength !== buffer.byteLength) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `responses[${index}] ${layout} buffer size mismatch`, {
          recoverable: false,
          details: {
            byteLength: buffer.byteLength,
            rowCount: buffer.rowCount,
            rowSizeBytes,
            payloadByteLength: buffer.buffer.byteLength,
          },
        })
      );
    }
    return buffer;
  });
  const rowCount = sumBy(parts, (part) => part.rowCount);
  const byteLength = rowCount * rowSizeBytes;
  const merged = new Uint8Array(byteLength);
  let byteOffset = 0;
  for (const part of parts) {
    merged.set(new Uint8Array(part.buffer), byteOffset);
    byteOffset += part.byteLength;
  }
  return createBufferDescriptor(bufferId, layout, rowCount, rowSizeBytes, merged.buffer);
}

function createMergedEmissionShellPacketResults(responses, buffers) {
  const rowOffsetsByLayout = new Map();
  return responses.map((response) => {
    const outputs = response.packetResult.outputs.map((output) => {
      const mergedBuffer = buffers.find((buffer) => buffer.layout === output.layout);
      if (!mergedBuffer) {
        throw new SolverBridgeError(
          createStatus("app_contract_error", "error", `merged buffer missing ${output.layout}`, {
            recoverable: false,
          })
        );
      }
      const rowSizeBytes = BINARY_LAYOUT_ROW_SIZE_BYTES.get(output.layout) ?? 0;
      if (rowSizeBytes === 0) {
        throw new SolverBridgeError(
          createStatus("app_contract_error", "error", `merged output layout is not implemented: ${output.layout}`, {
            recoverable: false,
          })
        );
      }
      const rowOffset = rowOffsetsByLayout.get(output.layout) ?? 0;
      rowOffsetsByLayout.set(output.layout, rowOffset + output.rowCount);
      return {
        bufferId: mergedBuffer.bufferId,
        layout: output.layout,
        numericType: output.numericType,
        byteOffset: rowOffset * rowSizeBytes,
        byteLength: output.rowCount * rowSizeBytes,
        rowOffset,
        rowCount: output.rowCount,
        checksum: output.checksum,
      };
    });
    return normalizeWorkPacketResultRef(
      {
        packetId: response.packetId,
        mergeOrder: response.packetMergeOrder,
        mergeKey: response.packetMergeKey,
        outputs,
      },
      `packetResults[${response.packetId}]`
    );
  });
}

function mergeEmissionShellFalsePositiveEstimates(estimates) {
  const estimatedTruePositiveCount = sumBy(
    estimates,
    (estimate) => estimate.estimatedTruePositiveCount ?? 0
  );
  const estimatedFalsePositiveCount = sumBy(
    estimates,
    (estimate) => estimate.estimatedFalsePositiveCount ?? 0
  );
  const testedCandidateCount = estimatedTruePositiveCount + estimatedFalsePositiveCount;
  return {
    method: "sampled_linear_segment_bisection.v1",
    testedCandidateCount,
    estimatedTruePositiveCount,
    estimatedFalsePositiveCount,
    estimatedFalsePositiveRate:
      testedCandidateCount === 0 ? 0 : estimatedFalsePositiveCount / testedCandidateCount,
  };
}

function mergeEmissionShellScanSummaries(summaries, buffers, candidateCount, truncated) {
  const outputByteLength = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  return {
    schema: "solver-emission-shell-scan-summary.v1",
    executionPath: "packet_merge",
    streamChunkCount: sumBy(summaries, (summary) => summary.streamChunkCount),
    skippedChunkCount: sumBy(summaries, (summary) => summary.skippedChunkCount ?? 0),
    prunedByTimeChunkCount: sumBy(summaries, (summary) => summary.prunedByTimeChunkCount ?? 0),
    prunedByPathChunkCount: sumBy(summaries, (summary) => summary.prunedByPathChunkCount ?? 0),
    pathIndexRowCount: maxBy(summaries, (summary) => summary.pathIndexRowCount ?? 0),
    pathIndexedChunkCount: maxBy(summaries, (summary) => summary.pathIndexedChunkCount ?? 0),
    indexSkippedRowCount: sumBy(summaries, (summary) => summary.indexSkippedRowCount ?? 0),
    scannedRowCount: sumBy(summaries, (summary) => summary.scannedRowCount),
    skippedRowCount: sumBy(summaries, (summary) => summary.skippedRowCount),
    uniqueMaterializedRowCount: sumBy(summaries, (summary) => summary.uniqueMaterializedRowCount),
    materializedRoleRowCount: sumBy(summaries, (summary) => summary.materializedRoleRowCount),
    sourceRowCount: sumBy(summaries, (summary) => summary.sourceRowCount),
    receiverRowCount: sumBy(summaries, (summary) => summary.receiverRowCount),
    possiblePairUpperBound: sumBy(summaries, (summary) => summary.possiblePairUpperBound),
    testedPairCount: sumBy(summaries, (summary) => summary.testedPairCount),
    skippedPairCount: sumBy(summaries, (summary) => summary.skippedPairCount),
    rejectedPairCount: sumBy(summaries, (summary) => summary.rejectedPairCount),
    candidateCount,
    outputBufferCount: buffers.length,
    outputByteLength,
    requestedWorkerCount: maxBy(summaries, (summary) => summary.requestedWorkerCount ?? 0),
    plannedWorkerCount: maxBy(summaries, (summary) => summary.plannedWorkerCount ?? 1),
    truncated,
  };
}

function sumBy(values, selector) {
  return values.reduce((sum, value) => sum + selector(value), 0);
}

function maxBy(values, selector) {
  return values.reduce((max, value) => Math.max(max, selector(value)), 0);
}

function planPathHistoryWorkPackets(state, request) {
  const normalizedRequest = normalizePathHistoryWorkPacketPlanRequest(request);
  const streamEntry = resolveStreamEntryByIdOrManifest(state, normalizedRequest);
  const packetIdPrefix = normalizedRequest.packetIdPrefix ?? `${streamEntry.stream.streamId}:work-packet`;
  const pathIndexRowsByChunk = getPathHistoryIndexRowsByChunk(streamEntry);
  const pathIndexSummary = getPathHistoryIndexSummary(streamEntry);
  const chunks = collectPathHistoryPacketChunks(streamEntry, normalizedRequest);
  const sourceSelection = selectPathHistoryPacketChunks(
    chunks,
    normalizedRequest.sourceChunkIndices,
    normalizedRequest.sourcePathKeys,
    pathIndexRowsByChunk,
    normalizedRequest.timeRange
  );
  const receiverSelection = selectPathHistoryPacketChunks(
    chunks,
    normalizedRequest.receiverChunkIndices,
    normalizedRequest.receiverPathKeys,
    pathIndexRowsByChunk,
    normalizedRequest.timeRange
  );
  const sourceChunks = sourceSelection.chunks;
  const receiverChunks = receiverSelection.chunks;
  const sourceSelections = sourceChunks.map(createPathHistoryWorkPacketChunkSelection);
  const receiverSelections = receiverChunks.map(createPathHistoryWorkPacketChunkSelection);
  const packets = [];
  let chunkPairCount = 0;
  let truncated = false;

  for (const source of sourceChunks) {
    for (const receiver of receiverChunks) {
      if (!normalizedRequest.includeSameChunk && source.chunkIndex === receiver.chunkIndex) {
        continue;
      }
      const timeRange = packetPairTimeRange(source.range.timeRange, receiver.range.timeRange, normalizedRequest.timeRange);
      if (!timeRange) {
        continue;
      }
      chunkPairCount += 1;
      if (packets.length >= normalizedRequest.maxPacketCount) {
        truncated = true;
        continue;
      }
      const packetId = `${packetIdPrefix}-${String(packets.length).padStart(6, "0")}`;
      const mergeKey = `${normalizedRequest.runId}:time-${String(packets.length).padStart(
        6,
        "0"
      )}:source-${String(source.chunkIndex).padStart(6, "0")}:receiver-${String(
        receiver.chunkIndex
      ).padStart(6, "0")}`;
      const inputBuffers = [pathHistoryChunkBufferRef(source)];
      if (receiver.chunkIndex !== source.chunkIndex) {
        inputBuffers.push(pathHistoryChunkBufferRef(receiver));
      }
      const prepared = prepareWorkPacketHeader({
        schema: "solver-work-packet.v1",
        packetId,
        runId: normalizedRequest.runId,
        modelId: normalizedRequest.modelId,
        precisionPath: normalizedRequest.precisionPath,
        sourceBlock: { enabled: true, start: source.chunkIndex, end: source.chunkIndex + 1 },
        receiverBlock: { enabled: true, start: receiver.chunkIndex, end: receiver.chunkIndex + 1 },
        pathBlock: { enabled: false, start: 0, end: 0 },
        timeRange,
        expectedOutputs: normalizedRequest.expectedOutputs,
        inputBuffers,
        mergeOrder: packets.length,
        mergeKey,
      });
      packets.push(prepared.packet);
    }
  }
  const planChecksum = stableHashHex({
    schema: "solver-path-history-work-packet-plan.v1",
    streamId: streamEntry.stream.streamId,
    runId: normalizedRequest.runId,
    modelId: normalizedRequest.modelId,
    precisionPath: normalizedRequest.precisionPath,
    sourceSelections,
    receiverSelections,
    chunkPairCount,
    packetCount: packets.length,
    truncated,
    packetHeaderChecksums: packets.map((packet) => packet.headerChecksum),
  });

  return {
    schema: "solver-path-history-work-packet-plan.v1",
    streamId: streamEntry.stream.streamId,
    runId: normalizedRequest.runId,
    modelId: normalizedRequest.modelId,
    precisionPath: normalizedRequest.precisionPath,
    sourceChunkCount: sourceChunks.length,
    receiverChunkCount: receiverChunks.length,
    pathIndexRowCount: pathIndexSummary.pathIndexRowCount,
    pathIndexedChunkCount: pathIndexSummary.pathIndexedChunkCount,
    sourcePathPrunedChunkCount: sourceSelection.pathPrunedChunkCount,
    receiverPathPrunedChunkCount: receiverSelection.pathPrunedChunkCount,
    chunkPairCount,
    packetCount: packets.length,
    truncated,
    sourceSelections,
    receiverSelections,
    planChecksum,
    packets,
    status: createStatus(
      truncated ? "stream_memory_pressure" : "ok",
      truncated ? "warning" : "ok",
      truncated ? "path-history work-packet plan truncated" : "path-history work-packet plan prepared",
      {
        stage: "work_packet",
        details: {
          streamId: streamEntry.stream.streamId,
          pathIndexRowCount: pathIndexSummary.pathIndexRowCount,
          pathIndexedChunkCount: pathIndexSummary.pathIndexedChunkCount,
          sourcePathPrunedChunkCount: sourceSelection.pathPrunedChunkCount,
          receiverPathPrunedChunkCount: receiverSelection.pathPrunedChunkCount,
          chunkPairCount,
          packetCount: packets.length,
          maxPacketCount: normalizedRequest.maxPacketCount,
          planChecksum,
        },
      }
    ),
  };
}

function normalizePathHistoryWorkPacketPlanRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history work-packet plan request object is required", {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(request.runId, "runId");
  requireNonemptyString(request.modelId, "modelId");
  requireNonemptyString(request.precisionPath, "precisionPath");
  validateStreamIdOrManifestPathRequest(request, "path-history work-packet plan");
  if (!DEFAULT_PRECISION_PATHS.includes(request.precisionPath) || request.precisionPath === "auto") {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "path-history work packets require a concrete precision path", {
        recoverable: false,
        stage: "work_packet",
      })
    );
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  const expectedOutputs = request.expectedOutputs ?? ["root_ledger.v1", "delayed_hit_events.v1"];
  requireArray(expectedOutputs, "expectedOutputs");
  expectedOutputs.forEach((layout, index) => {
    requireNonemptyString(layout, `expectedOutputs[${index}]`);
  });
  const sourceChunkIndices =
    request.sourceChunkIndices == null ? null : normalizeChunkIndexSelection(request.sourceChunkIndices, "sourceChunkIndices");
  const receiverChunkIndices =
    request.receiverChunkIndices == null
      ? null
      : normalizeChunkIndexSelection(request.receiverChunkIndices, "receiverChunkIndices");
  const sourcePathKeys =
    request.sourcePathKeys == null ? null : normalizePathKeySelection(request.sourcePathKeys, "sourcePathKeys");
  const receiverPathKeys =
    request.receiverPathKeys == null ? null : normalizePathKeySelection(request.receiverPathKeys, "receiverPathKeys");
  if (request.maxPacketCount != null) {
    requirePositiveInt32(request.maxPacketCount, "maxPacketCount");
  }
  return {
    streamId: request.streamId,
    manifestPath: request.manifestPath,
    runId: request.runId,
    modelId: request.modelId,
    precisionPath: request.precisionPath,
    packetIdPrefix: request.packetIdPrefix ?? null,
    timeRange: request.timeRange == null ? null : { ...request.timeRange },
    expectedOutputs,
    sourceChunkIndices,
    receiverChunkIndices,
    sourcePathKeys,
    receiverPathKeys,
    includeSameChunk: request.includeSameChunk ?? true,
    maxPacketCount: request.maxPacketCount ?? 4096,
  };
}

function normalizeChunkIndexSelection(values, label) {
  requireArray(values, label);
  return new Set(
    values.map((value, index) => {
      requireSafeUint64(value, `${label}[${index}]`);
      return value;
    })
  );
}

function normalizePathKeySelection(values, label) {
  requireArray(values, label);
  return new Set(
    values.map((value, index) => {
      requireSafeUint64(value, `${label}[${index}]`);
      return value;
    })
  );
}

function collectPathHistoryPacketChunks(streamEntry, request) {
  const chunks = [];
  streamEntry.buffers.forEach((descriptor, chunkIndex) => {
    if (descriptor.layout !== "path_segment.v1" || descriptor.rowCount === 0) {
      return;
    }
    const range = streamEntry.stream.availableRanges[chunkIndex];
    if (!range || !rangeOverlapsOptional(range.timeRange, request.timeRange)) {
      return;
    }
    chunks.push({
      chunkIndex,
      descriptor,
      range,
      rowOffset: pathHistoryChunkGlobalRowOffset(streamEntry, chunkIndex),
    });
  });
  return chunks;
}

function selectPathHistoryPacketChunks(chunks, selectedIndices, selectedPathKeys, pathIndexRowsByChunk, timeRange) {
  const selected = [];
  let pathPrunedChunkCount = 0;
  for (const chunk of chunks) {
    if (selectedIndices && !selectedIndices.has(chunk.chunkIndex)) {
      continue;
    }
    if (
      selectedPathKeys &&
      !pathHistoryPacketChunkMayContainPath(chunk, selectedPathKeys, pathIndexRowsByChunk, timeRange)
    ) {
      pathPrunedChunkCount += 1;
      continue;
    }
    selected.push(chunk);
  }
  return { chunks: selected, pathPrunedChunkCount };
}

function pathHistoryPacketChunkMayContainPath(chunk, selectedPathKeys, pathIndexRowsByChunk, timeRange) {
  const indexRows = pathIndexRowsByChunk.get(chunk.chunkIndex) ?? [];
  if (indexRows.length === 0) {
    return true;
  }
  return indexRows.some(
    (row) =>
      selectedPathKeys.has(row.pathKey) &&
      (!timeRange || rangeOverlapsOptional(row.timeRange, timeRange))
  );
}

function pathHistoryChunkGlobalRowOffset(streamEntry, chunkIndex) {
  let rowOffset = 0;
  for (let index = 0; index < chunkIndex; index += 1) {
    rowOffset += streamEntry.buffers[index]?.rowCount ?? 0;
  }
  return rowOffset;
}

function packetPairTimeRange(sourceRange, receiverRange, requestedRange) {
  const union = {
    start: Math.min(sourceRange.start, receiverRange.start),
    end: Math.max(sourceRange.end, receiverRange.end),
  };
  if (!requestedRange) {
    return union;
  }
  const clipped = {
    start: Math.max(union.start, requestedRange.start),
    end: Math.min(union.end, requestedRange.end),
  };
  return clipped.end >= clipped.start ? clipped : null;
}

function pathHistoryChunkBufferRef(chunk) {
  return {
    bufferId: chunk.descriptor.bufferId,
    layout: "path_segment.v1",
    numericType: "f64",
    byteOffset: chunk.range.byteRange?.start ?? chunk.descriptor.byteOffset ?? 0,
    byteLength: chunk.descriptor.byteLength,
    rowOffset: chunk.rowOffset,
    rowCount: chunk.descriptor.rowCount,
    checksum: chunk.descriptor.checksum ?? "",
  };
}

function createPathHistoryWorkPacketChunkSelection(chunk) {
  return {
    chunkIndex: chunk.chunkIndex,
    bufferId: chunk.descriptor.bufferId,
    rowOffset: chunk.rowOffset,
    rowCount: chunk.descriptor.rowCount,
    byteLength: chunk.descriptor.byteLength,
    checksum: chunk.descriptor.checksum ?? "",
    timeRange: chunk.range.timeRange ? { ...chunk.range.timeRange } : undefined,
    frameRange: chunk.range.frameRange ? { ...chunk.range.frameRange } : undefined,
    byteRange: chunk.range.byteRange ? { ...chunk.range.byteRange } : undefined,
  };
}

function normalizeWorkPacketHeader(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "work packet header object is required", {
        recoverable: false,
      })
    );
  }
  const packet = {
    schema: request.schema ?? "solver-work-packet.v1",
    packetId: request.packetId,
    runId: request.runId,
    modelId: request.modelId,
    precisionPath: request.precisionPath,
    sourceBlock: normalizeWorkPacketIndexRange(request.sourceBlock, "sourceBlock"),
    receiverBlock: normalizeWorkPacketIndexRange(request.receiverBlock, "receiverBlock"),
    pathBlock: normalizeWorkPacketIndexRange(request.pathBlock, "pathBlock"),
    timeRange: normalizeWorkPacketTimeRange(request.timeRange, "timeRange"),
    expectedOutputs: normalizeWorkPacketOutputLayouts(request.expectedOutputs),
    inputBuffers: (request.inputBuffers ?? []).map((buffer, index) =>
      normalizeWorkPacketBufferRef(buffer, `inputBuffers[${index}]`)
    ),
    mergeOrder: request.mergeOrder ?? 0,
    mergeKey: request.mergeKey,
  };
  requireNonemptyString(packet.schema, "schema");
  requireNonemptyString(packet.packetId, "packetId");
  requireNonemptyString(packet.runId, "runId");
  requireNonemptyString(packet.modelId, "modelId");
  requireNonemptyString(packet.precisionPath, "precisionPath");
  requireSafeUint64(packet.mergeOrder, "mergeOrder");
  requireNonemptyString(packet.mergeKey, "mergeKey");
  if (request.headerChecksum != null) {
    requireNonemptyString(request.headerChecksum, "headerChecksum");
    packet.headerChecksum = request.headerChecksum;
  }
  return packet;
}

function normalizeWorkPacketIndexRange(range, label) {
  if (!range || typeof range !== "object" || Array.isArray(range)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  if (typeof range.enabled !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.enabled must be boolean`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(range.start, `${label}.start`);
  requireSafeUint64(range.end, `${label}.end`);
  return {
    enabled: range.enabled,
    start: range.start,
    end: range.end,
  };
}

function normalizeWorkPacketTimeRange(range, label) {
  validateRange(range, label);
  return {
    start: range.start,
    end: range.end,
  };
}

function normalizeWorkPacketOutputLayouts(layouts) {
  requireArray(layouts, "expectedOutputs");
  return layouts.map((layout, index) => {
    requireNonemptyString(layout, `expectedOutputs[${index}]`);
    return layout;
  });
}

function normalizeWorkPacketBufferRef(buffer, label) {
  if (!buffer || typeof buffer !== "object" || Array.isArray(buffer)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(buffer.bufferId, `${label}.bufferId`);
  requireNonemptyString(buffer.layout, `${label}.layout`);
  requireNonemptyString(buffer.numericType, `${label}.numericType`);
  requireSafeUint64(buffer.byteOffset, `${label}.byteOffset`);
  requireSafeUint64(buffer.byteLength, `${label}.byteLength`);
  requireSafeUint64(buffer.rowOffset, `${label}.rowOffset`);
  requireSafeUint64(buffer.rowCount, `${label}.rowCount`);
  if (buffer.checksum != null) {
    requireNonemptyString(buffer.checksum, `${label}.checksum`);
  }
  return {
    bufferId: buffer.bufferId,
    layout: buffer.layout,
    numericType: buffer.numericType,
    byteOffset: buffer.byteOffset,
    byteLength: buffer.byteLength,
    rowOffset: buffer.rowOffset,
    rowCount: buffer.rowCount,
    checksum: buffer.checksum ?? "",
  };
}

function normalizeWorkPacketResultRef(result, label) {
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(result.packetId, `${label}.packetId`);
  requireSafeUint64(result.mergeOrder, `${label}.mergeOrder`);
  requireNonemptyString(result.mergeKey, `${label}.mergeKey`);
  requireArray(result.outputs, `${label}.outputs`);
  return {
    packetId: result.packetId,
    mergeOrder: result.mergeOrder,
    mergeKey: result.mergeKey,
    outputs: result.outputs.map((buffer, index) =>
      normalizeWorkPacketBufferRef(buffer, `${label}.outputs[${index}]`)
    ),
  };
}

function createPacketScopedOutputBuffers(packetId, buffers) {
  requireNonemptyString(packetId, "packetId");
  requireArray(buffers, "buffers");
  return buffers.map((buffer, index) => {
    if (!buffer || typeof buffer !== "object" || Array.isArray(buffer)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `buffers[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    const scopedBuffer = {
      ...buffer,
      bufferId: `${packetId}:${buffer.bufferId}`,
    };
    if (scopedBuffer.checksum == null && scopedBuffer.buffer instanceof ArrayBuffer) {
      scopedBuffer.checksum = fnv1a64ArrayBufferHex(scopedBuffer.buffer);
    }
    return scopedBuffer;
  });
}

function createWorkPacketResultRef(packet, buffers) {
  return normalizeWorkPacketResultRef(
    {
      packetId: packet.packetId,
      mergeOrder: packet.mergeOrder,
      mergeKey: packet.mergeKey,
      outputs: buffers.map(createWorkPacketOutputBufferRef),
    },
    "packetResult"
  );
}

function createWorkPacketOutputBufferRef(buffer) {
  const checksum =
    buffer.checksum ??
    (buffer.buffer instanceof ArrayBuffer ? fnv1a64ArrayBufferHex(buffer.buffer) : "");
  return {
    bufferId: buffer.bufferId,
    layout: buffer.layout,
    numericType: buffer.numericType,
    byteOffset: buffer.byteOffset ?? 0,
    byteLength: buffer.byteLength,
    rowOffset: buffer.rowOffset ?? 0,
    rowCount: buffer.rowCount,
    checksum,
  };
}

function validatePreparedWorkPacketHeader(packet, headerChecksum) {
  const statuses = [];
  const add = (code, severity, message, details) => {
    statuses.push(
      createStatus(code, severity, message, {
        recoverable: false,
        stage: "work_packet",
        details,
      })
    );
  };

  if (packet.schema !== "solver-work-packet.v1") {
    add("app_contract_error", "error", "work packet schema must be solver-work-packet.v1");
  }
  if (!DEFAULT_PRECISION_PATHS.includes(packet.precisionPath) || packet.precisionPath === "auto") {
    add("precision_failed", "error", "work packet precision path must be selected before dispatch");
  }
  [packet.sourceBlock, packet.receiverBlock, packet.pathBlock].forEach((range, index) => {
    if (range.enabled && range.end <= range.start) {
      add("app_contract_error", "error", "enabled work packet ranges must be nonempty", {
        rangeIndex: index,
      });
    }
  });
  if (!packet.sourceBlock.enabled && !packet.receiverBlock.enabled && !packet.pathBlock.enabled) {
    add("app_contract_error", "error", "work packet must own at least one source, receiver, or path range");
  }
  if (!Number.isFinite(packet.timeRange.start) || !Number.isFinite(packet.timeRange.end)) {
    add("time_resolution_insufficient", "error", "work packet time range must be finite and ordered");
  }
  if (packet.timeRange.end < packet.timeRange.start) {
    add("time_resolution_insufficient", "error", "work packet time range must be finite and ordered");
  }
  if (packet.expectedOutputs.length === 0) {
    add("app_contract_error", "error", "work packet expected outputs are required");
  }
  packet.expectedOutputs.forEach((layout) => {
    if (!BINARY_LAYOUT_ROW_SIZE_BYTES.has(layout)) {
      add("app_contract_error", "error", "work packet expected output layout is not implemented", {
        layout,
      });
    }
  });
  packet.inputBuffers.forEach((buffer) => {
    const rowSizeBytes = BINARY_LAYOUT_ROW_SIZE_BYTES.get(buffer.layout) ?? 0;
    if (rowSizeBytes === 0) {
      add("app_contract_error", "error", "work packet input layout is not implemented", {
        layout: buffer.layout,
      });
    }
    if (buffer.numericType !== "f64") {
      add("app_contract_error", "error", "work packet input numeric type is not implemented", {
        numericType: buffer.numericType,
      });
    }
    if (buffer.rowCount > 0 && rowSizeBytes > 0 && buffer.byteLength !== buffer.rowCount * rowSizeBytes) {
      add("app_contract_error", "error", "work packet input byte length must match row count and layout size", {
        bufferId: buffer.bufferId,
        byteLength: buffer.byteLength,
        rowCount: buffer.rowCount,
        rowSizeBytes,
      });
    }
    if (buffer.rowCount > 0 && buffer.checksum.length === 0) {
      add("app_contract_error", "error", "work packet input checksum is required for nonempty buffers", {
        bufferId: buffer.bufferId,
      });
    }
  });
  if (packet.headerChecksum != null && packet.headerChecksum !== headerChecksum) {
    add("validation_replay_mismatch", "error", "work packet header checksum does not match canonical header", {
      expected: headerChecksum,
      actual: packet.headerChecksum,
    });
  }
  return statuses;
}

function serializeWorkPacketHeader(packet) {
  const packetWithoutChecksum = {
    ...packet,
    headerChecksum: undefined,
  };
  return (
    `{"schema":${JSON.stringify(packetWithoutChecksum.schema)}` +
    `,"packetId":${JSON.stringify(packetWithoutChecksum.packetId)}` +
    `,"runId":${JSON.stringify(packetWithoutChecksum.runId)}` +
    `,"modelId":${JSON.stringify(packetWithoutChecksum.modelId)}` +
    `,"precisionPath":${JSON.stringify(packetWithoutChecksum.precisionPath)}` +
    `,"sourceBlock":${serializeWorkPacketIndexRange(packetWithoutChecksum.sourceBlock)}` +
    `,"receiverBlock":${serializeWorkPacketIndexRange(packetWithoutChecksum.receiverBlock)}` +
    `,"pathBlock":${serializeWorkPacketIndexRange(packetWithoutChecksum.pathBlock)}` +
    `,"timeRange":${serializeWorkPacketTimeRange(packetWithoutChecksum.timeRange)}` +
    `,"expectedOutputs":${serializeJsonStringArray(packetWithoutChecksum.expectedOutputs)}` +
    `,"inputBuffers":${serializeWorkPacketBufferArray(packetWithoutChecksum.inputBuffers)}` +
    `,"mergeOrder":${formatJsonNumber(packetWithoutChecksum.mergeOrder)}` +
    `,"mergeKey":${JSON.stringify(packetWithoutChecksum.mergeKey)}}`
  );
}

function serializeWorkPacketIndexRange(range) {
  return `{"enabled":${range.enabled ? "true" : "false"},"start":${formatJsonNumber(
    range.start
  )},"end":${formatJsonNumber(range.end)}}`;
}

function serializeWorkPacketTimeRange(range) {
  return `{"start":${formatJsonNumber(range.start)},"end":${formatJsonNumber(range.end)}}`;
}

function serializeJsonStringArray(values) {
  return `[${values.map((value) => JSON.stringify(value)).join(",")}]`;
}

function serializeWorkPacketBufferArray(values) {
  return `[${values.map(serializeWorkPacketBufferRef).join(",")}]`;
}

function serializeWorkPacketBufferRef(buffer) {
  return (
    `{"bufferId":${JSON.stringify(buffer.bufferId)}` +
    `,"layout":${JSON.stringify(buffer.layout)}` +
    `,"numericType":${JSON.stringify(buffer.numericType)}` +
    `,"byteOffset":${formatJsonNumber(buffer.byteOffset)}` +
    `,"byteLength":${formatJsonNumber(buffer.byteLength)}` +
    `,"rowOffset":${formatJsonNumber(buffer.rowOffset)}` +
    `,"rowCount":${formatJsonNumber(buffer.rowCount)}` +
    `,"checksum":${JSON.stringify(buffer.checksum)}}`
  );
}

function formatJsonNumber(value) {
  if (!Number.isFinite(value)) {
    return "null";
  }
  return JSON.stringify(value);
}

function fnv1a64StringHex(text) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= BigInt(text.charCodeAt(index) & 0xff);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function admitSimulationEnvelope(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "admission request object is required", {
        recoverable: false,
      })
    );
  }

  const capability = resolveCapabilityEnvelope(request.capability);
  const statuses = [
    ...validateModelContract(request.model),
    ...validateErrorBudget(request.errorBudget),
    ...validateSimulationEnvelope(request.envelope),
  ];
  const stressSummary = summarizeAdmissionStress(request, capability);

  let decision = "admit";
  let selectedPrecisionPath = "auto";
  if (hasHaltOrError(statuses)) {
    decision = "reject";
  } else if (
    request.errorBudget.globalTolerance < capability.minimumPositiveTolerance &&
    !hasCompatiblePrecisionPath(request.model, "extended_precision") &&
    !hasCompatiblePrecisionPath(request.model, "validation_replay")
  ) {
    statuses.push(
      createStatus("precision_failed", "halt", "requested tolerance requires a stricter precision path", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else if (request.envelope.memoryBudgetBytes < capability.minMemoryBudgetBytes) {
    statuses.push(
      createStatus("stream_memory_pressure", "halt", "memory budget is below the minimum solver active-window budget", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else if (request.envelope.storageBudgetBytes < capability.minStorageBudgetBytesForStreaming) {
    statuses.push(
      createStatus("stream_memory_pressure", "halt", "storage budget is below the minimum solver streaming budget", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else if (
    isDenseInteraction(request.envelope.interactionPolicy) &&
    request.envelope.entityCount > capability.maxBatchEntities
  ) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "halt", "dense interaction graph exceeds the supported batch envelope", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else {
    const requiresBatchExecution =
      request.envelope.outputDetail === "validation" ||
      request.envelope.latencyTarget === "batch" ||
      request.envelope.latencyTarget === "validation";
    const exceedsInteractiveEntities = request.envelope.entityCount > capability.maxInteractiveEntities;
    if (requiresBatchExecution) {
      decision = "batch";
    } else if (
      exceedsInteractiveEntities &&
      request.envelope.simplificationPolicy === "explicit-reduced-model"
    ) {
      decision = "simplify";
    } else if (exceedsInteractiveEntities) {
      decision = "batch";
    }

    if (
      request.errorBudget.globalTolerance < 1e-12 &&
      hasCompatiblePrecisionPath(request.model, "extended_precision")
    ) {
      selectedPrecisionPath = "extended_precision";
      statuses.push(
        createStatus("precision_escalated", "info", "selected extended precision for strict global tolerance", {
          stage: "admission",
        })
      );
      if (decision === "admit") {
        decision = "escalate_precision";
      }
    } else if (hasCompatiblePrecisionPath(request.model, "event_root_focused")) {
      selectedPrecisionPath = "event_root_focused";
    } else if (hasCompatiblePrecisionPath(request.model, "scaled_f64_strict")) {
      selectedPrecisionPath = "scaled_f64_strict";
    } else {
      selectedPrecisionPath = request.model.compatiblePrecisionPaths[0] || "auto";
    }
  }

  const ok = !hasHaltOrError(statuses);
  return {
    decision,
    selectedPrecisionPath,
    admitted: ok && decision !== "reject",
    stressSummary,
    statuses,
    status: ok
      ? createStatus("ok", "ok", "simulation envelope admission complete")
      : createStatus("simulation_envelope_exceeded", "halt", "simulation envelope rejected", {
          recoverable: false,
    }),
  };
}

function admitSimulationEnvelopeWithModule(module, request, abiInfo) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "admission request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.model || !request.errorBudget || !request.envelope) {
    return admitSimulationEnvelope(request);
  }
  if (
    Array.isArray(request.model.compatiblePrecisionPaths) &&
    request.model.compatiblePrecisionPaths.some((path) => !DEFAULT_PRECISION_PATHS.includes(path))
  ) {
    return admitSimulationEnvelope(request);
  }
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    return admitSimulationEnvelope(request);
  }

  const capability = resolveCapabilityEnvelope(request.capability);
  const maxStatusRows = 32;
  const modelPtr = module._malloc(abiInfo.modelContractBytes);
  const budgetPtr = module._malloc(abiInfo.errorBudgetF64Bytes);
  const envelopePtr = module._malloc(abiInfo.simulationEnvelopeF64Bytes);
  const capabilityPtr = module._malloc(abiInfo.capabilityEnvelopeF64Bytes);
  const reportPtr = module._malloc(abiInfo.admissionReportF64Bytes);
  const statusesPtr = module._malloc(abiInfo.statusRowBytes * maxStatusRows);
  const outStatusCountPtr = module._malloc(4);
  try {
    writeAdmissionModelContract(module, modelPtr, request.model);
    writeErrorBudgetF64(module, budgetPtr, request.errorBudget);
    writeSimulationEnvelopeF64(module, envelopePtr, request.envelope);
    writeCapabilityEnvelopeF64(module, capabilityPtr, capability);
    module.setValue(outStatusCountPtr, 0, "i32");

    const admit = module.cwrap("architrino_solver_admit_simulation_envelope_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = admit(
      modelPtr,
      budgetPtr,
      envelopePtr,
      capabilityPtr,
      reportPtr,
      statusesPtr,
      maxStatusRows,
      outStatusCountPtr
    );
    const statusCount = module.getValue(outStatusCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "error", `admission C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, statusCount },
        })
      );
    }
    const report = readAdmissionReportF64(module, reportPtr);
    const statuses = readAdmissionStatusRows(module, statusesPtr, statusCount, abiInfo);
    const ok = report.validationOk && !hasHaltOrError(statuses);
    return {
      decision: report.decision,
      selectedPrecisionPath: report.selectedPrecisionPath,
      admitted: report.admitted,
      stressSummary: report.stressSummary,
      statuses,
      status: ok
        ? createStatus("ok", "ok", "simulation envelope admission complete")
        : createStatus("simulation_envelope_exceeded", "halt", "simulation envelope rejected", {
            recoverable: false,
          }),
    };
  } finally {
    module._free(modelPtr);
    module._free(budgetPtr);
    module._free(envelopePtr);
    module._free(capabilityPtr);
    module._free(reportPtr);
    module._free(statusesPtr);
    module._free(outStatusCountPtr);
  }
}

function summarizeAdmissionStress(request, capability) {
  const envelope = request.envelope || {};
  const errorBudget = request.errorBudget || {};
  const entityCount = Number.isInteger(envelope.entityCount) && envelope.entityCount > 0 ? envelope.entityCount : 0;
  const estimatedPairCount = estimateAdmissionPairCount(entityCount, envelope.interactionPolicy);
  const timeStepCountEstimate = estimateAdmissionTimeStepCount(envelope);
  const entityPressure = positiveRatio(entityCount, capability.maxInteractiveEntities);
  const interactionPressure = isDenseInteraction(envelope.interactionPolicy)
    ? positiveRatio(entityCount, capability.maxBatchEntities)
    : entityPressure;
  const memoryPressure = positiveRatio(capability.minMemoryBudgetBytes, envelope.memoryBudgetBytes);
  const storagePressure = positiveRatio(
    capability.minStorageBudgetBytesForStreaming,
    envelope.storageBudgetBytes
  );
  const timeStepPressure =
    timeStepCountEstimate == null
      ? 0
      : positiveRatio(
          timeStepCountEstimate,
          capability.maxInteractiveStepCount ?? ADMISSION_INTERACTIVE_STEP_COUNT
        );
  const outputPressure = estimateAdmissionOutputPressure(envelope.outputDetail);
  const precisionPressure = estimateAdmissionPrecisionPressure(
    errorBudget.globalTolerance,
    capability.minimumPositiveTolerance
  );
  const pressureRows = [
    ["entity_count", entityPressure],
    ["interaction_graph", interactionPressure],
    ["memory", memoryPressure],
    ["storage", storagePressure],
    ["time_steps", timeStepPressure],
    ["output_detail", outputPressure],
    ["precision", precisionPressure],
  ];
  const [dominantStress, pressureScore] = pressureRows.reduce(
    (best, current) => (current[1] > best[1] ? current : best),
    ["entity_count", 0]
  );
  return {
    schema: "solver-admission-stress-summary.v1",
    entityCount,
    estimatedPairCount,
    entityPressure,
    interactionPressure,
    memoryPressure,
    storagePressure,
    timeStepCountEstimate,
    timeStepPressure,
    outputPressure,
    precisionPressure,
    dominantStress,
    pressureScore,
  };
}

function resolveCapabilityEnvelope(capability) {
  const resolved = {
    ...DEFAULT_CAPABILITY_ENVELOPE,
    ...(capability || {}),
  };
  requirePositiveInteger(resolved.maxInteractiveEntities, "capability.maxInteractiveEntities");
  requirePositiveInteger(resolved.maxBatchEntities, "capability.maxBatchEntities");
  requireSafeUint64(resolved.minMemoryBudgetBytes, "capability.minMemoryBudgetBytes");
  requireSafeUint64(
    resolved.minStorageBudgetBytesForStreaming,
    "capability.minStorageBudgetBytesForStreaming"
  );
  requirePositiveFiniteNumber(resolved.minimumPositiveTolerance, "capability.minimumPositiveTolerance");
  requirePositiveInteger(resolved.maxInteractiveStepCount, "capability.maxInteractiveStepCount");
  return resolved;
}

function estimateAdmissionPairCount(entityCount, interactionPolicy) {
  if (!Number.isFinite(entityCount) || entityCount <= 0) {
    return 0;
  }
  const pairCount =
    interactionPolicy === "same-source-enabled" ? entityCount * entityCount : entityCount * (entityCount - 1);
  if (!isDenseInteraction(interactionPolicy)) {
    return entityCount;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, pairCount));
}

function estimateAdmissionTimeStepCount(envelope) {
  const window = envelope.timeWindow;
  if (!window || !Number.isFinite(window.start) || !Number.isFinite(window.end) || window.end <= window.start) {
    return null;
  }
  const step = envelope.timeResolutionHint || window.stepHint;
  if (!isPositiveFinite(step)) {
    return null;
  }
  return Math.ceil((window.end - window.start) / step);
}

function estimateAdmissionOutputPressure(outputDetail) {
  switch (outputDetail) {
    case "preview":
      return 0.25;
    case "playback":
      return 0.5;
    case "export":
      return 0.75;
    case "validation":
      return 1;
    default:
      return 0;
  }
}

function estimateAdmissionPrecisionPressure(globalTolerance, minimumPositiveTolerance) {
  if (!isPositiveFinite(globalTolerance) || !isPositiveFinite(minimumPositiveTolerance)) {
    return 0;
  }
  const requestedDigits = Math.max(0, -Math.log10(globalTolerance));
  const minimumDigits = Math.max(1, -Math.log10(minimumPositiveTolerance));
  return requestedDigits / minimumDigits;
}

function positiveRatio(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0 || numerator < 0) {
    return 0;
  }
  return numerator / denominator;
}

function validateModelContract(model) {
  const statuses = [];
  if (!model || typeof model !== "object") {
    return [
      createStatus("app_contract_error", "error", "model contract is required", {
        stage: "model",
        recoverable: false,
      }),
    ];
  }
  requireNonemptyStringStatus(statuses, model.modelId, "model id is required", "model");
  requireNonemptyStringStatus(statuses, model.equationVersion, "equation version is required", "model");
  requireNonemptyStringStatus(statuses, model.constantsHash, "constants hash is required", "model");
  requireNonemptyStringStatus(statuses, model.causalSpeedPolicy, "causal speed policy is required", "model");
  requireNonemptyStringStatus(statuses, model.branchPolicy, "branch policy is required", "model");
  requireNonemptyStringStatus(statuses, model.unitConvention, "unit convention is required", "model");
  if (!Array.isArray(model.compatiblePrecisionPaths) || model.compatiblePrecisionPaths.length === 0) {
    statuses.push(
      createStatus("precision_failed", "error", "at least one compatible precision path is required", {
        stage: "model",
        recoverable: false,
      })
    );
  } else {
    model.compatiblePrecisionPaths.forEach((path) => {
      if (!DEFAULT_PRECISION_PATHS.includes(path)) {
        statuses.push(
          createStatus("precision_failed", "error", `unknown compatible precision path: ${path}`, {
            stage: "model",
            recoverable: false,
          })
        );
      }
    });
  }
  return statuses;
}

function validateErrorBudget(budget) {
  if (!budget || typeof budget !== "object") {
    return [
      createStatus("precision_failed", "error", "error budget is required", {
        stage: "error-budget",
        recoverable: false,
      }),
    ];
  }
  const statuses = [];
  [
    ["globalTolerance", "global tolerance"],
    ["rootIsolationTolerance", "root isolation tolerance"],
    ["delayedHitTolerance", "delayed hit tolerance"],
    ["integrationTolerance", "integration tolerance"],
    ["streamEncodingTolerance", "stream encoding tolerance"],
    ["readbackTolerance", "readback tolerance"],
  ].forEach(([key, label]) => {
    if (!isPositiveFinite(budget[key])) {
      statuses.push(
        createStatus("precision_failed", "error", `${label} must be positive and finite`, {
          stage: "error-budget",
          recoverable: false,
        })
      );
    }
  });
  if (budget.projectionTolerance != null && !isNonnegativeFinite(budget.projectionTolerance)) {
    statuses.push(
      createStatus("precision_failed", "error", "projection tolerance must be nonnegative and finite", {
        stage: "error-budget",
        recoverable: false,
      })
    );
  }
  if (budget.displayTolerance != null && !isNonnegativeFinite(budget.displayTolerance)) {
    statuses.push(
      createStatus("precision_failed", "error", "display tolerance must be nonnegative and finite", {
        stage: "error-budget",
        recoverable: false,
      })
    );
  }
  if (
    Number.isFinite(budget.rootIsolationTolerance) &&
    Number.isFinite(budget.globalTolerance) &&
    budget.rootIsolationTolerance > budget.globalTolerance
  ) {
    statuses.push(
      createStatus("precision_escalated", "warning", "root isolation tolerance is looser than the global tolerance", {
        stage: "error-budget",
      })
    );
  }
  return statuses;
}

function validateErrorBudgetPropagationRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "error-budget propagation request object is required", {
        recoverable: false,
      })
    );
  }
  const budgetStatuses = validateErrorBudget(request.errorBudget);
  const blockingStatus = budgetStatuses.find((status) => status.severity === "halt" || status.severity === "error");
  if (blockingStatus) {
    throw new SolverBridgeError(blockingStatus);
  }
  if (!Array.isArray(request.stages) || request.stages.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "error-budget propagation stages are required", {
        recoverable: false,
      })
    );
  }
  request.stages.forEach((stage, index) => validateErrorBudgetStageInput(stage, index));
  if (request.maxRows != null) {
    requirePositiveInt32(request.maxRows, "maxRows");
    if (request.maxRows < request.stages.length) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "maxRows must cover all error-budget stages", {
          recoverable: false,
        })
      );
    }
  }
}

function validateErrorBudgetStageInput(stage, index) {
  if (!stage || typeof stage !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `error-budget stage ${index} must be an object`, {
        recoverable: false,
      })
    );
  }
  if (!ERROR_BUDGET_STAGE_TO_ID.has(stage.stage)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `unknown error-budget stage: ${stage.stage}`, {
        recoverable: false,
      })
    );
  }
  requireNonnegativeFiniteNumber(stage.estimatedAbsoluteError, `stages[${index}].estimatedAbsoluteError`);
}

function validateSimulationEnvelope(envelope) {
  if (!envelope || typeof envelope !== "object") {
    return [
      createStatus("simulation_envelope_exceeded", "error", "simulation envelope is required", {
        stage: "simulation-envelope",
        recoverable: false,
      }),
    ];
  }
  const statuses = [];
  if (!Number.isInteger(envelope.entityCount) || envelope.entityCount <= 0) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "error", "entity count must be greater than zero", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  if (
    !envelope.timeWindow ||
    !Number.isFinite(envelope.timeWindow.start) ||
    !Number.isFinite(envelope.timeWindow.end) ||
    envelope.timeWindow.end <= envelope.timeWindow.start
  ) {
    statuses.push(
      createStatus(
        "simulation_envelope_exceeded",
        "error",
        "time window must have finite start and end with end greater than start",
        { stage: "simulation-envelope", recoverable: false }
      )
    );
  } else if (
    envelope.timeWindow.units &&
    !["solver-time", "seconds", "cycles"].includes(envelope.timeWindow.units)
  ) {
    statuses.push(
      createStatus("app_contract_error", "error", "time window units must be solver-time, seconds, or cycles", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  if (envelope.timeWindow?.stepHint != null && envelope.timeWindow.stepHint !== 0) {
    if (!isPositiveFinite(envelope.timeWindow.stepHint)) {
      statuses.push(
        createStatus("time_resolution_insufficient", "error", "time window step hint must be positive when specified", {
          stage: "simulation-envelope",
          recoverable: false,
        })
      );
    }
  }
  if (envelope.timeResolutionHint != null && envelope.timeResolutionHint !== 0) {
    if (!isPositiveFinite(envelope.timeResolutionHint)) {
      statuses.push(
        createStatus("time_resolution_insufficient", "error", "time resolution hint must be positive when specified", {
          stage: "simulation-envelope",
          recoverable: false,
        })
      );
    }
  }
  if (!Number.isInteger(envelope.memoryBudgetBytes) || envelope.memoryBudgetBytes <= 0) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "error", "memory budget must be greater than zero", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  if (!Number.isInteger(envelope.storageBudgetBytes) || envelope.storageBudgetBytes <= 0) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "error", "storage budget must be greater than zero", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  return statuses;
}

function requireNonemptyStringStatus(statuses, value, message, stage) {
  if (typeof value !== "string" || value.length === 0) {
    statuses.push(
      createStatus("app_contract_error", "error", message, {
        stage,
        recoverable: false,
      })
    );
  }
}

function hasCompatiblePrecisionPath(model, path) {
  return Array.isArray(model?.compatiblePrecisionPaths) && model.compatiblePrecisionPaths.includes(path);
}

function requireModelCompatiblePrecisionPath(model, path, label, details = {}) {
  if (path === "auto") {
    return;
  }
  if (hasCompatiblePrecisionPath(model, path)) {
    return;
  }
  throw new SolverBridgeError(
    createStatus("precision_failed", "halt", `${label} is not compatible with the declared model contract`, {
      stage: "model",
      recoverable: false,
      details: {
        ...details,
        precisionPath: path,
        compatiblePrecisionPaths: Array.isArray(model?.compatiblePrecisionPaths)
          ? [...model.compatiblePrecisionPaths]
          : [],
      },
    })
  );
}

function resolveRunPrecisionSelection(request, admission) {
  const requestedPrecisionPath = normalizePrecisionPath(request.precisionPath, "auto");
  const admissionPrecisionPath = normalizePrecisionPath(admission.selectedPrecisionPath, "auto");
  const claimLevel = normalizeClaimLevel(request.claimLevel);
  const claimMinimumPrecisionPath =
    CLAIM_LEVEL_MINIMUM_PRECISION_PATH[claimLevel] ??
    CLAIM_LEVEL_MINIMUM_PRECISION_PATH["interactive-preview"];
  requireModelCompatiblePrecisionPath(
    request.model,
    requestedPrecisionPath,
    "requested precision path",
    { requestedPrecisionPath }
  );
  const selectedPrecisionPath = maxPrecisionPath(
    maxPrecisionPath(admissionPrecisionPath, requestedPrecisionPath),
    claimMinimumPrecisionPath
  );
  requireModelCompatiblePrecisionPath(
    request.model,
    selectedPrecisionPath,
    "selected precision path",
    {
      requestedPrecisionPath,
      admissionPrecisionPath,
      claimMinimumPrecisionPath,
      selectedPrecisionPath,
    }
  );
  const statuses = admission.statuses.map(copyStatusRecord);
  if (selectedPrecisionPath !== admissionPrecisionPath) {
    statuses.push(
      createStatus("precision_escalated", "info", "selected precision path raised by run contract", {
        stage: "admission",
        details: {
          requestedPrecisionPath,
          admissionPrecisionPath,
          claimMinimumPrecisionPath,
          selectedPrecisionPath,
        },
      })
    );
  }
  return {
    requestedPrecisionPath,
    selectedPrecisionPath,
    admission: {
      ...admission,
      selectedPrecisionPath,
      statuses,
    },
  };
}

function hasHaltOrError(statuses) {
  return statuses.some((status) => status.severity === "halt" || status.severity === "error");
}

function isDenseInteraction(interactionPolicy) {
  return interactionPolicy === "all-to-all" || interactionPolicy === "same-source-enabled";
}

function isPositiveFinite(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isNonnegativeFinite(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function runSimulationWithModule(state, module, request, abiInfo) {
  validateRunSimulationRequest(request);
  const capability = resolveCapabilityEnvelope(request.capability);
  const admission =
    module && typeof module._architrino_solver_admit_simulation_envelope_f64 === "function"
      ? admitSimulationEnvelopeWithModule(
          module,
          {
            model: request.model,
            errorBudget: request.errorBudget,
            envelope: request.envelope,
            capability,
          },
          abiInfo
        )
      : admitSimulationEnvelope({
          model: request.model,
          errorBudget: request.errorBudget,
          envelope: request.envelope,
          capability,
        });
  if (!admission.admitted) {
    throw new SolverBridgeError(
      createStatus("simulation_envelope_exceeded", "halt", "simulation run was not admitted", {
        recoverable: false,
        details: admission,
      })
    );
  }
  const precisionSelection = resolveRunPrecisionSelection(request, admission);
  const runAdmission = precisionSelection.admission;

  const requestId = request.requestId || `${request.appId}-${request.runKind}-${state.nextRunSequence}`;
  const runId = request.runId || `solver-run-${state.nextRunSequence}`;
  const datasetId = request.datasetId || `${runId}-dataset`;
  state.nextRunSequence += 1;
  const threading = createRunThreadingPlan(request, state.capabilities);
  const manifestBase = createRunManifestBase(
    request,
    runAdmission,
    {
      requestId,
      runId,
      datasetId,
    },
    threading
  );

  let completedResponse;
  if (request.runKind === "causalRoots") {
    const rootsAndHits = solveRunRootsAndHitsF64WithModule(module, request.config, abiInfo, {
      runId,
      requestId,
      requestedPrecisionPath: precisionSelection.requestedPrecisionPath,
      precisionPath: precisionSelection.selectedPrecisionPath,
      claimLevel: request.claimLevel,
    });
    const streams = rootsAndHits.streams.map((stream) => ({
      ...stream,
      streamId: `${runId}:${stream.streamId}`,
    }));
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "causal-root simulation completed", { runId, requestId }),
        rootCount: rootsAndHits.roots.length,
        eventCount: rootsAndHits.hits.length,
      },
      buffers: rootsAndHits.buffers,
      streams,
      diagnostics: [...admission.statuses, ...rootsAndHits.statuses].map(toDiagnosticRecord),
      roots: rootsAndHits.roots,
      hits: rootsAndHits.hits,
      rootLedgerDetails: rootsAndHits.rootLedgerDetails,
      coordinateFrame: rootsAndHits.coordinateFrame,
      coordinateOrigin: rootsAndHits.coordinateOrigin,
      localRequest: rootsAndHits.localRequest,
      absoluteRoots: rootsAndHits.absoluteRoots,
      precision: deepCloneJson(rootsAndHits.precision),
      status: createStatus("ok", "ok", "causal-root simulation completed", { runId, requestId }),
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "delayedHits") {
    const rootsAndHits = solveRunRootsAndHitsF64WithModule(module, request.config, abiInfo, {
      runId,
      requestId,
      requestedPrecisionPath: request.precisionPath,
      precisionPath: admission.selectedPrecisionPath,
      claimLevel: request.claimLevel,
    });
    const streams = rootsAndHits.streams.map((stream) => ({
      ...stream,
      streamId: `${runId}:${stream.streamId}`,
    }));
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "delayed-hit simulation completed", { runId, requestId }),
        rootCount: rootsAndHits.roots.length,
        eventCount: rootsAndHits.hits.length,
      },
      buffers: rootsAndHits.buffers,
      streams,
      diagnostics: [...admission.statuses, ...rootsAndHits.statuses].map(toDiagnosticRecord),
      roots: rootsAndHits.roots,
      hits: rootsAndHits.hits,
      rootLedgerDetails: rootsAndHits.rootLedgerDetails,
      coordinateFrame: rootsAndHits.coordinateFrame,
      coordinateOrigin: rootsAndHits.coordinateOrigin,
      localRequest: rootsAndHits.localRequest,
      absoluteRoots: rootsAndHits.absoluteRoots,
      precision: deepCloneJson(rootsAndHits.precision),
      status: createStatus("ok", "ok", "delayed-hit simulation completed", { runId, requestId }),
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "phaseDiagnostics") {
    const phase = computePhaseAtHitF64WithModule(module, request.config.phaseRequest, abiInfo);
    const phaseSummary = summarizePhaseAtHitsF64({ rows: phase.rows });
    const phaseStatus = createStatus("ok", "ok", "phase diagnostics run completed", {
      runId,
      requestId,
    });
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: phaseStatus,
        rootCount: request.config.phaseRequest.roots.length,
        eventCount: phase.rows.length,
        phaseRowCount: phase.rows.length,
      },
      buffers: phase.buffers,
      streams: [],
      diagnostics: [
        ...admission.statuses.map(toDiagnosticRecord),
        toDiagnosticRecord(phase.status),
        toDiagnosticRecord(phaseSummary.status),
      ],
      phaseRows: phase.rows,
      phaseSummary: phaseSummary.summary,
      status: phaseStatus,
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "pathHistory") {
    const streamId = request.config.streamId || `${runId}:path-history`;
    const pathHistory = createPathHistoryStreamF64(
      state,
      {
        runId,
        datasetId,
        streamId,
        pathRows: request.config.pathRows,
        rowsPerChunk: request.config.rowsPerChunk,
        storagePolicy: request.config.storagePolicy ?? {
          target: request.output.streamTarget ?? "caller-buffer",
          durable: false,
          maxBytes: request.output.memoryBudgetBytes,
        },
        metadata: {
          ...request.config.metadata,
          precisionPath: request.config.metadata?.precisionPath ?? admission.selectedPrecisionPath,
          claimLevel: request.config.metadata?.claimLevel ?? request.claimLevel,
        },
      },
      abiInfo
    );
    const pathHistoryStatus = createStatus("ok", "ok", "path-history run completed", {
      runId,
      requestId,
      details: {
        streamId: pathHistory.stream.streamId,
        rowCount: pathHistory.summary.rowCount,
        chunkCount: pathHistory.summary.chunkCount,
      },
    });
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: pathHistoryStatus,
        pathCount: pathHistory.summary.pathCount,
        pathRowCount: pathHistory.summary.rowCount,
        chunkCount: pathHistory.summary.chunkCount,
        streamCount: 1,
      },
      buffers: pathHistory.buffers,
      streams: [pathHistory.stream],
      diagnostics: [...admission.statuses.map(toDiagnosticRecord), toDiagnosticRecord(pathHistory.status)],
      pathHistory: pathHistory.summary,
      status: pathHistoryStatus,
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "sharedGeometry") {
    const geometry = computeSharedGeometryF64WithModule(module, request.config.geometryRequest, abiInfo);
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "shared-geometry run completed", { runId, requestId }),
        eventCount: countSharedGeometryEvents(geometry),
      },
      buffers: [],
      streams: [],
      diagnostics: admission.statuses.map(toDiagnosticRecord),
      geometry,
      status: createStatus("ok", "ok", "shared-geometry run completed", { runId, requestId }),
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "validationReplay") {
    const comparison = classifySolverBaselineResponse({
      baseline: request.config.baselineResponse,
      candidate: request.config.candidateResponse,
      tolerance: request.config.tolerance,
      refinementTolerance: request.config.refinementTolerance,
    });
    const replayStatus = createStatus(
      comparison.status.code,
      comparison.status.severity,
      comparison.status.message,
      {
        runId,
        requestId,
        recoverable: comparison.status.recoverable,
        details: {
          maxAbsoluteDifference: comparison.maxAbsoluteDifference,
          differenceCount: comparison.differences.length,
        },
      }
    );
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: replayStatus,
        rootCount: Array.isArray(request.config.candidateResponse?.roots)
          ? request.config.candidateResponse.roots.length
          : 0,
        eventCount: Array.isArray(request.config.candidateResponse?.hits)
          ? request.config.candidateResponse.hits.length
          : 0,
      },
      buffers: [],
      streams: [],
      diagnostics: [toDiagnosticRecord(replayStatus)],
      validationReplay: comparison,
      status: replayStatus,
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "appPlayback") {
    const frames = request.config.frames || [];
    const roots = request.config.roots || [];
    const hits = request.config.hits || [];
    const geometry = request.config.geometry;
    const playbackStatus = createStatus("ok", "ok", "app playback dataset prepared", {
      runId,
      requestId,
      details: {
        sourceRunId: request.config.sourceRunId,
        sourceDatasetId: request.config.sourceDatasetId,
      },
    });
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: playbackStatus,
        frameCount: frames.length,
        rootCount: roots.length,
        eventCount: hits.length + countSharedGeometryEvents(geometry),
        pathCount: countPlaybackPaths(frames),
      },
      buffers: [],
      streams: [],
      diagnostics: request.config.diagnostics || [
        ...admission.statuses.map(toDiagnosticRecord),
        toDiagnosticRecord(playbackStatus),
      ],
      frames,
      roots,
      hits,
      geometry,
      status: playbackStatus,
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "pairInteraction") {
    const pair = solvePairInteractionPathF64(request.config.pairInteractionRequest, {
      module,
      abiInfo,
      runId,
      requestId,
      requestedPrecisionPath: request.precisionPath,
      precisionPath: admission.selectedPrecisionPath,
      claimLevel: request.claimLevel,
    });
    const pathHistory =
      request.output.outputs.includes("pathStream") && pair.pathRows.length > 0
        ? createPathHistoryStreamF64(
            state,
            {
              runId,
              datasetId,
              streamId: request.config.streamId || `${runId}:pair-interaction-path-history`,
              pathRows: pair.pathRows,
              rowsPerChunk: request.config.rowsPerChunk,
              storagePolicy: request.config.storagePolicy ?? {
                target: request.output.streamTarget ?? "caller-buffer",
                durable: false,
                maxBytes: request.output.memoryBudgetBytes,
              },
              metadata: {
                ...request.config.metadata,
                precisionPath:
                  request.config.metadata?.precisionPath ?? admission.selectedPrecisionPath,
                interpolationRule:
                  request.config.metadata?.interpolationRule ?? "piecewise-pair-interaction-integration",
                provenance: {
                  ...request.config.metadata?.provenance,
                  runKind: "pairInteraction",
                  source: "central-bridge-mutual-pair-interaction",
                },
                dynamicReplay: createPairInteractionDynamicReplayMetadata(request.config),
              },
            },
            abiInfo
          )
        : null;
    const pairStatus = createStatus("ok", "ok", "pair interaction path simulation completed", {
      runId,
      requestId,
      details: {
        frameCount: pair.frames.length,
        pathCount: pair.pathCount,
        interactionLaw: pair.interactionLaw,
        canonicalEomEvidence: pair.summary?.canonicalEomEvidence === true,
        eomEvidenceStatus: pair.summary?.eomEvidenceStatus,
        eomEvidenceReason: pair.summary?.eomEvidenceReason,
        pathConstraintFrameRefinementSampleCount:
          pair.summary?.pathConstraintFrameRefinementSampleCount,
        pathConstraintPositionResidualSampleCount:
          pair.summary?.pathConstraintPositionResidualSampleCount,
        pathConstraintPositionResidualStatus:
          pair.summary?.pathConstraintPositionResidualStatus,
        pathConstraintPositionResidualTolerance:
          pair.summary?.pathConstraintPositionResidualTolerance,
        maxPathConstraintPositionResidual:
          pair.summary?.maxPathConstraintPositionResidual,
        meanPathConstraintPositionResidual:
          pair.summary?.meanPathConstraintPositionResidual,
        rmsPathConstraintPositionResidual:
          pair.summary?.rmsPathConstraintPositionResidual,
        pathConstraintInitialVelocityResidualSampleCount:
          pair.summary?.pathConstraintInitialVelocityResidualSampleCount,
        pathConstraintInitialVelocityResidualStatus:
          pair.summary?.pathConstraintInitialVelocityResidualStatus,
        pathConstraintInitialVelocityResidualTolerance:
          pair.summary?.pathConstraintInitialVelocityResidualTolerance,
        maxPathConstraintInitialVelocityResidual:
          pair.summary?.maxPathConstraintInitialVelocityResidual,
        meanPathConstraintInitialVelocityResidual:
          pair.summary?.meanPathConstraintInitialVelocityResidual,
        rmsPathConstraintInitialVelocityResidual:
          pair.summary?.rmsPathConstraintInitialVelocityResidual,
        pathConstraintBoundarySeedMode: pair.summary?.pathConstraintBoundarySeedMode,
        pathConstraintBoundarySeedSampleCount: pair.summary?.pathConstraintBoundarySeedSampleCount,
        pathConstraintBoundaryRelaxationMode: pair.summary?.pathConstraintBoundaryRelaxationMode,
        pathConstraintBoundaryRelaxationStatus: pair.summary?.pathConstraintBoundaryRelaxationStatus,
        pathConstraintBoundaryRelaxationIterationCount:
          pair.summary?.pathConstraintBoundaryRelaxationIterationCount,
        pathConstraintBoundaryRelaxationAppliedIterationCount:
          pair.summary?.pathConstraintBoundaryRelaxationAppliedIterationCount,
        pathConstraintBoundaryRelaxationStopReason:
          pair.summary?.pathConstraintBoundaryRelaxationStopReason,
        pathConstraintBoundaryRelaxationTolerance:
          pair.summary?.pathConstraintBoundaryRelaxationTolerance,
        pathConstraintBoundaryRelaxationStepTolerance:
          pair.summary?.pathConstraintBoundaryRelaxationStepTolerance,
        pathConstraintBoundaryRelaxationResidualEvidenceStatus:
          pair.summary?.pathConstraintBoundaryRelaxationResidualEvidenceStatus,
        pathConstraintBoundaryRelaxationResidualSampleCount:
          pair.summary?.pathConstraintBoundaryRelaxationResidualSampleCount,
        pathConstraintBoundaryRelaxationResidualMode:
          pair.summary?.pathConstraintBoundaryRelaxationResidualMode,
        maxPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.maxPathConstraintBoundaryRelaxationResidualBefore,
        maxPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.maxPathConstraintBoundaryRelaxationResidualAfter,
        meanPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualBefore,
        meanPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualAfter,
        rmsPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualBefore,
        rmsPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualAfter,
        pathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.pathConstraintBoundaryRelaxationResidualRatio,
        meanPathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualRatio,
        rmsPathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualRatio,
        pathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.pathConstraintBoundaryRelaxationResidualSettlingRate,
        meanPathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualSettlingRate,
        rmsPathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualSettlingRate,
        pathConstraintBoundaryRelaxationMaxStep:
          pair.summary?.pathConstraintBoundaryRelaxationMaxStep,
        pathConstraintBoundaryRelaxationFinalStepFactor:
          pair.summary?.pathConstraintBoundaryRelaxationFinalStepFactor,
        pathConstraintBoundaryRelaxationSelectedCandidateKind:
          pair.summary?.pathConstraintBoundaryRelaxationSelectedCandidateKind,
        pathConstraintBoundaryRelaxationCenterOfMassSelectedCount:
          pair.summary?.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount,
        pathConstraintBoundaryRelaxationCandidateVariantCount:
          pair.summary?.pathConstraintBoundaryRelaxationCandidateVariantCount,
        pathConstraintBoundaryRelaxationLineSearchTrialCount:
          pair.summary?.pathConstraintBoundaryRelaxationLineSearchTrialCount,
        pathConstraintBoundaryRelaxationCandidateKindMask:
          pair.summary?.pathConstraintBoundaryRelaxationCandidateKindMask,
        pathConstraintSolverStatus: pair.summary?.pathConstraintSolverStatus,
        pathConstraintSolverClaim: pair.summary?.pathConstraintSolverClaim,
        pathConstraintPhysicalBoundarySolverStatus:
          pair.summary?.pathConstraintPhysicalBoundarySolverStatus,
        pathConstraintPhysicalBoundarySolverClaim:
          pair.summary?.pathConstraintPhysicalBoundarySolverClaim,
        pathConstraintPhysicalBoundarySolverBlockingReason:
          pair.summary?.pathConstraintPhysicalBoundarySolverBlockingReason,
        pathConstraintGuidanceAccelerationStatus:
          pair.summary?.pathConstraintGuidanceAccelerationStatus,
        pathConstraintGuidanceAccelerationTolerance:
          pair.summary?.pathConstraintGuidanceAccelerationTolerance,
      },
    });
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: pairStatus,
        frameCount: pair.frames.length,
        pathCount: pair.pathCount,
        pathRowCount: pair.pathRows.length,
        chunkCount: pathHistory?.summary.chunkCount ?? 0,
        stepCount: pair.stepCount,
        interactionLaw: pair.interactionLaw,
        canonicalEomEvidence: pair.summary?.canonicalEomEvidence === true,
        eomEvidenceStatus: pair.summary?.eomEvidenceStatus,
        eomEvidenceReason: pair.summary?.eomEvidenceReason,
        ...(Number.isFinite(Number(pair.summary?.signalSpeed))
          ? { signalSpeed: Number(pair.summary.signalSpeed) }
          : {}),
        executionPath: pair.executionPath,
        pathConstraintCount: pair.summary?.pathConstraintCount ?? 0,
        pathConstraintFrameRefinementSampleCount:
          pair.summary?.pathConstraintFrameRefinementSampleCount ?? 0,
        pathConstraintPositionResidualSampleCount:
          pair.summary?.pathConstraintPositionResidualSampleCount ?? 0,
        pathConstraintPositionResidualStatus:
          pair.summary?.pathConstraintPositionResidualStatus,
        pathConstraintPositionResidualTolerance:
          pair.summary?.pathConstraintPositionResidualTolerance,
        maxPathConstraintPositionResidual:
          pair.summary?.maxPathConstraintPositionResidual ?? 0,
        meanPathConstraintPositionResidual:
          pair.summary?.meanPathConstraintPositionResidual ?? 0,
        rmsPathConstraintPositionResidual:
          pair.summary?.rmsPathConstraintPositionResidual ?? 0,
        pathConstraintInitialVelocityResidualSampleCount:
          pair.summary?.pathConstraintInitialVelocityResidualSampleCount ?? 0,
        pathConstraintInitialVelocityResidualStatus:
          pair.summary?.pathConstraintInitialVelocityResidualStatus,
        pathConstraintInitialVelocityResidualTolerance:
          pair.summary?.pathConstraintInitialVelocityResidualTolerance,
        maxPathConstraintInitialVelocityResidual:
          pair.summary?.maxPathConstraintInitialVelocityResidual ?? 0,
        meanPathConstraintInitialVelocityResidual:
          pair.summary?.meanPathConstraintInitialVelocityResidual ?? 0,
        rmsPathConstraintInitialVelocityResidual:
          pair.summary?.rmsPathConstraintInitialVelocityResidual ?? 0,
        pathConstraintResidualSampleCount: pair.summary?.pathConstraintResidualSampleCount ?? 0,
        maxPathConstraintResidual: pair.summary?.maxPathConstraintResidual ?? 0,
        meanPathConstraintResidual: pair.summary?.meanPathConstraintResidual ?? 0,
        rmsPathConstraintResidual: pair.summary?.rmsPathConstraintResidual ?? 0,
        pathConstraintGuidanceSampleCount: pair.summary?.pathConstraintGuidanceSampleCount ?? 0,
        pathConstraintGuidanceMode: pair.summary?.pathConstraintGuidanceMode,
        pathConstraintBoundaryMode: pair.summary?.pathConstraintBoundaryMode,
        pathConstraintBoundarySeedMode: pair.summary?.pathConstraintBoundarySeedMode,
        pathConstraintBoundarySeedSampleCount: pair.summary?.pathConstraintBoundarySeedSampleCount ?? 0,
        pathConstraintBoundaryRelaxationMode: pair.summary?.pathConstraintBoundaryRelaxationMode,
        pathConstraintBoundaryRelaxationStatus: pair.summary?.pathConstraintBoundaryRelaxationStatus,
        pathConstraintBoundaryRelaxationIterationCount:
          pair.summary?.pathConstraintBoundaryRelaxationIterationCount,
        pathConstraintBoundaryRelaxationAppliedIterationCount:
          pair.summary?.pathConstraintBoundaryRelaxationAppliedIterationCount,
        pathConstraintBoundaryRelaxationStopReason:
          pair.summary?.pathConstraintBoundaryRelaxationStopReason,
        pathConstraintBoundaryRelaxationTolerance:
          pair.summary?.pathConstraintBoundaryRelaxationTolerance,
        pathConstraintBoundaryRelaxationStepTolerance:
          pair.summary?.pathConstraintBoundaryRelaxationStepTolerance,
        pathConstraintBoundaryRelaxationResidualEvidenceStatus:
          pair.summary?.pathConstraintBoundaryRelaxationResidualEvidenceStatus,
        pathConstraintBoundaryRelaxationResidualSampleCount:
          pair.summary?.pathConstraintBoundaryRelaxationResidualSampleCount,
        pathConstraintBoundaryRelaxationResidualMode:
          pair.summary?.pathConstraintBoundaryRelaxationResidualMode,
        maxPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.maxPathConstraintBoundaryRelaxationResidualBefore,
        maxPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.maxPathConstraintBoundaryRelaxationResidualAfter,
        meanPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualBefore,
        meanPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualAfter,
        rmsPathConstraintBoundaryRelaxationResidualBefore:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualBefore,
        rmsPathConstraintBoundaryRelaxationResidualAfter:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualAfter,
        pathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.pathConstraintBoundaryRelaxationResidualRatio,
        meanPathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualRatio,
        rmsPathConstraintBoundaryRelaxationResidualRatio:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualRatio,
        pathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.pathConstraintBoundaryRelaxationResidualSettlingRate,
        meanPathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.meanPathConstraintBoundaryRelaxationResidualSettlingRate,
        rmsPathConstraintBoundaryRelaxationResidualSettlingRate:
          pair.summary?.rmsPathConstraintBoundaryRelaxationResidualSettlingRate,
        pathConstraintBoundaryRelaxationMaxStep:
          pair.summary?.pathConstraintBoundaryRelaxationMaxStep,
        pathConstraintBoundaryRelaxationFinalStepFactor:
          pair.summary?.pathConstraintBoundaryRelaxationFinalStepFactor,
        pathConstraintBoundaryRelaxationSelectedCandidateKind:
          pair.summary?.pathConstraintBoundaryRelaxationSelectedCandidateKind,
        pathConstraintBoundaryRelaxationCenterOfMassSelectedCount:
          pair.summary?.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount,
        pathConstraintBoundaryRelaxationCandidateVariantCount:
          pair.summary?.pathConstraintBoundaryRelaxationCandidateVariantCount,
        pathConstraintBoundaryRelaxationLineSearchTrialCount:
          pair.summary?.pathConstraintBoundaryRelaxationLineSearchTrialCount,
        pathConstraintBoundaryRelaxationCandidateKindMask:
          pair.summary?.pathConstraintBoundaryRelaxationCandidateKindMask,
        pathConstraintSolverStatus: pair.summary?.pathConstraintSolverStatus,
        pathConstraintSolverClaim: pair.summary?.pathConstraintSolverClaim,
        pathConstraintPhysicalBoundarySolverStatus:
          pair.summary?.pathConstraintPhysicalBoundarySolverStatus,
        pathConstraintPhysicalBoundarySolverClaim:
          pair.summary?.pathConstraintPhysicalBoundarySolverClaim,
        pathConstraintPhysicalBoundarySolverBlockingReason:
          pair.summary?.pathConstraintPhysicalBoundarySolverBlockingReason,
        maxPathConstraintGuidanceAcceleration: pair.summary?.maxPathConstraintGuidanceAcceleration ?? 0,
        meanPathConstraintGuidanceAcceleration: pair.summary?.meanPathConstraintGuidanceAcceleration ?? 0,
        rmsPathConstraintGuidanceAcceleration: pair.summary?.rmsPathConstraintGuidanceAcceleration ?? 0,
        pathConstraintGuidanceAccelerationStatus:
          pair.summary?.pathConstraintGuidanceAccelerationStatus,
        pathConstraintGuidanceAccelerationTolerance:
          pair.summary?.pathConstraintGuidanceAccelerationTolerance,
        pathConstraintBoundaryResidualSampleCount: pair.summary?.pathConstraintBoundaryResidualSampleCount ?? 0,
        pathConstraintBoundaryResidualMode:
          pair.summary?.pathConstraintBoundaryResidualMode,
        pathConstraintBoundaryResidualStatus: pair.summary?.pathConstraintBoundaryResidualStatus,
        pathConstraintBoundaryResidualTolerance: pair.summary?.pathConstraintBoundaryResidualTolerance,
        maxPathConstraintBoundaryResidual: pair.summary?.maxPathConstraintBoundaryResidual ?? 0,
        meanPathConstraintBoundaryResidual: pair.summary?.meanPathConstraintBoundaryResidual ?? 0,
        rmsPathConstraintBoundaryResidual: pair.summary?.rmsPathConstraintBoundaryResidual ?? 0,
      },
      buffers: [...pair.buffers, ...(pathHistory?.buffers ?? [])],
      streams: pathHistory ? [pathHistory.stream] : [],
      diagnostics: [
        ...admission.statuses.map(toDiagnosticRecord),
        toDiagnosticRecord(pair.status),
        ...(pathHistory ? [toDiagnosticRecord(pathHistory.status)] : []),
      ],
      frames: pair.frames,
      pathHistory: pathHistory?.summary,
      pairInteraction: pair.summary,
      status: pairStatus,
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else if (request.runKind === "motionSimulation") {
    const motion = request.config.motionIntegrationRequest
      ? integrateConstantAccelerationMotionF64WithModule(module, request.config.motionIntegrationRequest, abiInfo)
      : sampleLinearMotionF64WithModule(module, request.config.motionRequest, abiInfo);
    const motionPathHistory = request.output.outputs.includes("pathStream")
      ? createMotionSimulationPathHistoryRowsWithModule(module, request.config, abiInfo)
      : null;
    const pathHistory =
      motionPathHistory && motionPathHistory.pathRows.length > 0
        ? createPathHistoryStreamF64(
            state,
            {
              runId,
              datasetId,
              streamId: request.config.streamId || `${runId}:motion-path-history`,
              pathRows: motionPathHistory.pathRows,
              rowsPerChunk: request.config.rowsPerChunk,
              storagePolicy: request.config.storagePolicy ?? {
                target: request.output.streamTarget ?? "caller-buffer",
                durable: false,
                maxBytes: request.output.memoryBudgetBytes,
              },
              metadata: {
                ...request.config.metadata,
                precisionPath:
                  request.config.metadata?.precisionPath ?? admission.selectedPrecisionPath,
                interpolationRule:
                  request.config.metadata?.interpolationRule ?? "linear-segment-chord",
                provenance: {
                  ...request.config.metadata?.provenance,
                  runKind: "motionSimulation",
                  source: motionPathHistory.source,
                },
                dynamicReplay: createMotionSimulationDynamicReplayMetadata(request.config),
              },
            },
            abiInfo
          )
        : null;
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "motion simulation completed", { runId, requestId }),
        frameCount: motion.frames.length,
        pathCount: motion.frames.length > 0 || motionPathHistory?.pathRows.length > 0 ? 1 : 0,
        pathRowCount: motionPathHistory?.pathRows.length ?? 0,
        chunkCount: pathHistory?.summary.chunkCount ?? 0,
      },
      buffers: [...motion.buffers, ...(pathHistory?.buffers ?? [])],
      streams: pathHistory ? [pathHistory.stream] : [],
      diagnostics: [
        ...admission.statuses.map(toDiagnosticRecord),
        toDiagnosticRecord(motion.status),
        ...(motionPathHistory ? [toDiagnosticRecord(motionPathHistory.status)] : []),
        ...(pathHistory ? [toDiagnosticRecord(pathHistory.status)] : []),
      ],
      frames: motion.frames,
      pathHistory: pathHistory?.summary,
      status: createStatus("ok", "ok", "motion simulation completed", { runId, requestId }),
    };
    completedResponse.manifest = finalizeRunManifest(manifestBase, completedResponse);
  } else {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "halt", `run kind is not implemented: ${request.runKind}`, {
        recoverable: false,
      })
    );
  }

  state.runs.set(runId, completedResponse);
  registerResponseStreams(state, completedResponse);

  return {
    requestId,
    runId,
    datasetId,
    cancellationToken: `cancel-${runId}`,
    acceptedPrecisionPath: precisionSelection.selectedPrecisionPath,
    expectedOutputs: request.output.outputs,
    response: completedResponse,
    status: createStatus("ok", "ok", "simulation run completed", { runId, requestId }),
  };
}

function createMotionSimulationPathHistoryRowsWithModule(module, config, abiInfo) {
  if (config.motionIntegrationRequest) {
    const result = integrateConstantAccelerationPathHistoryF64WithModule(
      module,
      config.motionIntegrationRequest,
      abiInfo
    );
    return {
      ...result,
      source: "constant-acceleration-motion-integration",
    };
  }

  const result = sampleLinearPathHistoryF64WithModule(module, config.motionRequest, abiInfo);
  return {
    ...result,
    source: "linear-motion-sample-request",
  };
}

function createMotionSimulationDynamicReplayMetadata(config) {
  if (config.motionIntegrationRequest) {
    const request = normalizeMotionIntegrationReplayRequest(config.motionIntegrationRequest);
    return {
      schema: "solver-path-history-dynamic-replay.v1",
      replayKind: "constant-acceleration-motion-integration",
      pathKey: request.pathKey,
      startTime: request.startTime,
      endTime: request.endTime,
      step: request.step,
      stateFlags: request.stateFlags,
      integrationMethod: request.integrationMethod,
      integrationTolerance: request.integrationTolerance,
      motionIntegrationRequest: request,
    };
  }

  const request = normalizeLinearMotionReplayRequest(config.motionRequest);
  return {
    schema: "solver-path-history-dynamic-replay.v1",
    replayKind: "linear-motion-sample",
    pathKey: request.pathKey,
    startTime: request.startTime,
    endTime: request.endTime,
    step: request.step,
    stateFlags: request.stateFlags,
    motionRequest: request,
  };
}

function createPairInteractionDynamicReplayMetadata(config) {
  const request = normalizePairInteractionReplayRequest(config.pairInteractionRequest);
  return {
    schema: "solver-path-history-dynamic-replay.v1",
    replayKind: "pair-interaction-path-integration",
    startTime: request.startTime,
    endTime: request.endTime,
    step: request.step,
    pathKeys: request.initialStates.map((state) => state.pathKey),
    interactionLaw: request.interactionLaw,
    pairAccelerationScale: request.pairAccelerationScale,
    ...(Number.isFinite(request.signalSpeed)
      ? { signalSpeed: request.signalSpeed }
      : {}),
    softening: request.softening,
    integrationTolerance: request.integrationTolerance,
    pairInteractionRequest: request,
    pathConstraints: request.pathConstraints,
  };
}

function solvePairInteractionPathF64(request, options = {}) {
  const normalized = normalizePairInteractionReplayRequest(request);
  if (
    typeof options.module?._architrino_solver_integrate_pair_interaction_motion_f64 === "function"
  ) {
    return integratePairInteractionMotionF64WithModule(options.module, normalized, {
      ...options,
      abiInfo: options.abiInfo ?? getStaticAbiInfo(),
    });
  }
  const sampleSchedule = createPairInteractionSampleSchedule(normalized);
  const times = sampleSchedule.times;
  const maxFrames = normalized.maxFrames ?? Math.min(times.length, DEFAULT_MAX_MOTION_FRAMES);
  if (times.length > maxFrames) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "pair interaction request exceeds frame buffer cap", {
        recoverable: true,
        details: { estimatedFrames: times.length, maxFrames },
      })
    );
  }

  let states = normalized.initialStates.map((state) => ({
    pathKey: state.pathKey,
    position: copyVector(state.initialPosition),
    velocity: copyVector(state.initialVelocity),
    charge: state.charge,
    mass: state.mass,
    stateFlags: state.stateFlags,
  }));
  const frames = [];
  const boundaryRelaxationIterationCount = normalizePairInteractionBoundaryRelaxationIterationCount(
    normalized.pathConstraintBoundaryRelaxationIterationCount,
  );
  const guidanceEnabled =
    normalized.pathConstraints.length === 0 || boundaryRelaxationIterationCount === 0;
  const guidanceSummary = createPairConstraintGuidanceSummary();
  for (let frameIndex = 0; frameIndex < times.length; frameIndex += 1) {
    const time = times[frameIndex];
    states = snapPairInteractionStatesToConstraints(states, time, normalized);
    states.forEach((state) => {
      frames.push({
        pathKey: state.pathKey,
        frameIndex,
        time,
        position: copyVector(state.position),
        velocity: copyVector(state.velocity),
        errorBound: normalized.integrationTolerance * frameIndex,
        stateFlags: state.stateFlags,
      });
    });
    const nextTime = times[frameIndex + 1];
    if (nextTime != null) {
      states = advancePairInteractionStates(
        states,
        time,
        nextTime,
        normalized,
        guidanceEnabled ? guidanceSummary : null,
      );
    }
  }

  let pathConstraintBoundarySeedSampleCount = 0;
  if (
    normalized.pathConstraints.length > 0 &&
    boundaryRelaxationIterationCount > 0
  ) {
    pathConstraintBoundarySeedSampleCount =
      seedPairInteractionFramesFromBoundaryConstraints(frames, normalized);
  }

  const boundaryRelaxationResidualBefore = summarizePairInteractionBoundaryRelaxationResiduals(
    frames,
    normalized,
  );
  const framesBeforeBoundaryRelaxation = copyPairInteractionFrameStates(frames);
  const boundaryRelaxationRun = relaxPairInteractionConstrainedFrames(frames, normalized);
  let boundaryRelaxationResidualAfter = summarizePairInteractionBoundaryRelaxationResiduals(
    frames,
    normalized,
  );
  const boundaryRelaxationStatus = getPairInteractionBoundaryRelaxationStatus(
    boundaryRelaxationResidualBefore,
    boundaryRelaxationResidualAfter,
    normalized,
    boundaryRelaxationRun,
  );
  if (
    boundaryRelaxationStatus ===
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_REVERTED
  ) {
    restorePairInteractionFrameStates(frames, framesBeforeBoundaryRelaxation);
    boundaryRelaxationResidualAfter = boundaryRelaxationResidualBefore;
  }
  const pathRows = createPairInteractionPathRows(frames);
  const positionResidualSummary =
    summarizePairInteractionConstraintPositionResiduals(frames, normalized);
  const initialVelocityResidualSummary =
    summarizePairInteractionInitialVelocityResiduals(frames, normalized);
  const residualSummary = summarizePairInteractionConstraintResiduals(frames, normalized);
  const boundarySummary = summarizePairInteractionBoundaryResiduals(normalized);
  const pathConstraintGuidanceMode = guidanceSummary.pathConstraintGuidanceSampleCount > 0
    ? PAIR_INTERACTION_PATH_CONSTRAINT_GUIDANCE_MODE
    : undefined;
  const pathConstraintBoundaryMode = createPairInteractionPathConstraintBoundaryMode(normalized);
  const boundaryRelaxationMetadata = createPairInteractionBoundaryRelaxationMetadata(
    normalized,
    boundaryRelaxationResidualBefore,
    boundaryRelaxationResidualAfter,
    boundaryRelaxationStatus,
    boundaryRelaxationRun,
  );
  const constraintSolverMetadata = createPairInteractionConstraintSolverMetadata(
    residualSummary.pathConstraintCount,
    guidanceSummary.pathConstraintGuidanceSampleCount,
    pathConstraintBoundarySeedSampleCount,
    boundaryRelaxationStatus,
    positionResidualSummary,
    normalized,
    initialVelocityResidualSummary,
    boundarySummary,
  );
  const physicalBoundarySolverMetadata = createPairInteractionPhysicalBoundarySolverMetadata(
    residualSummary.pathConstraintCount,
    guidanceSummary,
    boundaryRelaxationStatus,
    positionResidualSummary,
    normalized,
    initialVelocityResidualSummary,
    boundarySummary,
  );
  const boundaryResidualAcceptanceMetadata = createPairInteractionBoundaryResidualAcceptanceMetadata(
    boundarySummary,
    normalized,
  );
  const positionResidualAcceptanceMetadata = createPairInteractionPositionResidualAcceptanceMetadata(
    positionResidualSummary,
    normalized,
  );
  const initialVelocityResidualAcceptanceMetadata =
    createPairInteractionInitialVelocityResidualAcceptanceMetadata(
      initialVelocityResidualSummary,
      normalized,
    );
  const guidanceAccelerationAcceptanceMetadata =
    createPairInteractionGuidanceAccelerationAcceptanceMetadata(guidanceSummary, normalized);
  enforcePairInteractionPositionResidualTolerance(positionResidualSummary, normalized, {
    ...options,
    executionPath: "javascript_fallback",
    pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
    pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
  });
  enforcePairInteractionBoundaryResidualTolerance(boundarySummary, normalized, {
    ...options,
    executionPath: "javascript_fallback",
    pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
    pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
  });
  enforcePairInteractionInitialVelocityResidualTolerance(initialVelocityResidualSummary, normalized, {
    ...options,
    executionPath: "javascript_fallback",
    pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
    pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
  });
  enforcePairInteractionGuidanceAccelerationTolerance(guidanceSummary, normalized, {
    ...options,
    executionPath: "javascript_fallback",
    pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
    pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
  });
  const status = createStatus("ok", "ok", "pair interaction paths integrated", {
    details: {
      requestedPrecisionPath: options.requestedPrecisionPath,
      precisionPath: options.precisionPath,
      interactionLaw: normalized.interactionLaw,
      ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
      ...(Number.isFinite(normalized.signalSpeed)
        ? { signalSpeed: normalized.signalSpeed }
        : {}),
      stepCount: Math.max(0, times.length - 1),
      pathConstraintFrameRefinementSampleCount:
        sampleSchedule.pathConstraintFrameRefinementSampleCount,
      pathConstraintCount: residualSummary.pathConstraintCount,
      ...positionResidualSummary,
      ...initialVelocityResidualSummary,
      ...positionResidualAcceptanceMetadata,
      ...initialVelocityResidualAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintPositionResidualTolerance)
        ? { pathConstraintPositionResidualTolerance: normalized.pathConstraintPositionResidualTolerance }
        : {}),
      ...(Number.isFinite(normalized.pathConstraintInitialVelocityResidualTolerance)
        ? {
            pathConstraintInitialVelocityResidualTolerance:
              normalized.pathConstraintInitialVelocityResidualTolerance,
          }
        : {}),
      pathConstraintResidualSampleCount: residualSummary.pathConstraintResidualSampleCount,
      maxPathConstraintResidual: residualSummary.maxPathConstraintResidual,
      meanPathConstraintResidual: residualSummary.meanPathConstraintResidual,
      rmsPathConstraintResidual: residualSummary.rmsPathConstraintResidual,
      pathConstraintGuidanceSampleCount: guidanceSummary.pathConstraintGuidanceSampleCount,
      pathConstraintGuidanceMode,
      pathConstraintBoundaryMode,
      ...(pathConstraintBoundarySeedSampleCount > 0
        ? {
            pathConstraintBoundarySeedMode: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_SEED_MODE,
            pathConstraintBoundarySeedSampleCount,
          }
        : {}),
      ...boundaryRelaxationMetadata,
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
      ...physicalBoundarySolverMetadata,
      maxPathConstraintGuidanceAcceleration: guidanceSummary.maxPathConstraintGuidanceAcceleration,
      meanPathConstraintGuidanceAcceleration: guidanceSummary.meanPathConstraintGuidanceAcceleration,
      rmsPathConstraintGuidanceAcceleration: guidanceSummary.rmsPathConstraintGuidanceAcceleration,
      ...guidanceAccelerationAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintGuidanceAccelerationTolerance)
        ? {
            pathConstraintGuidanceAccelerationTolerance:
              normalized.pathConstraintGuidanceAccelerationTolerance,
          }
        : {}),
      pathConstraintBoundaryResidualSampleCount: boundarySummary.pathConstraintBoundaryResidualSampleCount,
      pathConstraintBoundaryResidualMode: boundarySummary.pathConstraintBoundaryResidualMode,
      maxPathConstraintBoundaryResidual: boundarySummary.maxPathConstraintBoundaryResidual,
      meanPathConstraintBoundaryResidual: boundarySummary.meanPathConstraintBoundaryResidual,
      rmsPathConstraintBoundaryResidual: boundarySummary.rmsPathConstraintBoundaryResidual,
      ...boundaryResidualAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintBoundaryResidualTolerance)
        ? { pathConstraintBoundaryResidualTolerance: normalized.pathConstraintBoundaryResidualTolerance }
        : {}),
    },
  });
  return {
    frames,
    pathRows,
    buffers: [
      createBufferDescriptor(
        "pair-interaction-frame-buffer",
        "frame_buffer.v1",
        frames.length,
        FRAME_BUFFER_ROW_F64_BYTES,
        encodeMotionFrameRowsF64(frames)
      ),
    ],
    summary: {
      runId: options.runId,
      claimLevel: options.claimLevel,
      precisionPath: options.precisionPath,
      frameCount: frames.length,
      pathCount: normalized.initialStates.length,
      pathRowCount: pathRows.length,
      stepCount: Math.max(0, times.length - 1),
      pathConstraintFrameRefinementSampleCount:
        sampleSchedule.pathConstraintFrameRefinementSampleCount,
      interactionLaw: normalized.interactionLaw,
      ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
      ...(Number.isFinite(normalized.signalSpeed)
        ? { signalSpeed: normalized.signalSpeed }
        : {}),
      executionPath: "javascript_fallback",
      pathConstraintCount: residualSummary.pathConstraintCount,
      ...positionResidualSummary,
      ...initialVelocityResidualSummary,
      ...positionResidualAcceptanceMetadata,
      ...initialVelocityResidualAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintPositionResidualTolerance)
        ? { pathConstraintPositionResidualTolerance: normalized.pathConstraintPositionResidualTolerance }
        : {}),
      ...(Number.isFinite(normalized.pathConstraintInitialVelocityResidualTolerance)
        ? {
            pathConstraintInitialVelocityResidualTolerance:
              normalized.pathConstraintInitialVelocityResidualTolerance,
          }
        : {}),
      pathConstraintResidualSampleCount: residualSummary.pathConstraintResidualSampleCount,
      maxPathConstraintResidual: residualSummary.maxPathConstraintResidual,
      meanPathConstraintResidual: residualSummary.meanPathConstraintResidual,
      rmsPathConstraintResidual: residualSummary.rmsPathConstraintResidual,
      pathConstraintGuidanceSampleCount: guidanceSummary.pathConstraintGuidanceSampleCount,
      pathConstraintGuidanceMode,
      pathConstraintBoundaryMode,
      ...(pathConstraintBoundarySeedSampleCount > 0
        ? {
            pathConstraintBoundarySeedMode: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_SEED_MODE,
            pathConstraintBoundarySeedSampleCount,
          }
        : {}),
      ...boundaryRelaxationMetadata,
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
      ...physicalBoundarySolverMetadata,
      maxPathConstraintGuidanceAcceleration: guidanceSummary.maxPathConstraintGuidanceAcceleration,
      meanPathConstraintGuidanceAcceleration: guidanceSummary.meanPathConstraintGuidanceAcceleration,
      rmsPathConstraintGuidanceAcceleration: guidanceSummary.rmsPathConstraintGuidanceAcceleration,
      ...guidanceAccelerationAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintGuidanceAccelerationTolerance)
        ? {
            pathConstraintGuidanceAccelerationTolerance:
              normalized.pathConstraintGuidanceAccelerationTolerance,
          }
        : {}),
      pathConstraintBoundaryResidualSampleCount: boundarySummary.pathConstraintBoundaryResidualSampleCount,
      pathConstraintBoundaryResidualMode: boundarySummary.pathConstraintBoundaryResidualMode,
      maxPathConstraintBoundaryResidual: boundarySummary.maxPathConstraintBoundaryResidual,
      meanPathConstraintBoundaryResidual: boundarySummary.meanPathConstraintBoundaryResidual,
      rmsPathConstraintBoundaryResidual: boundarySummary.rmsPathConstraintBoundaryResidual,
      ...boundaryResidualAcceptanceMetadata,
      ...(Number.isFinite(normalized.pathConstraintBoundaryResidualTolerance)
        ? { pathConstraintBoundaryResidualTolerance: normalized.pathConstraintBoundaryResidualTolerance }
        : {}),
    },
    status,
    pathCount: normalized.initialStates.length,
    stepCount: Math.max(0, times.length - 1),
    interactionLaw: normalized.interactionLaw,
    ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
    ...(Number.isFinite(normalized.signalSpeed)
      ? { signalSpeed: normalized.signalSpeed }
      : {}),
    executionPath: "javascript_fallback",
  };
}

function normalizePairInteractionReplayRequest(request) {
  validatePairInteractionRunConfig({ pairInteractionRequest: request });
  const duration = Math.max(request.endTime - request.startTime, request.step);
  return {
    startTime: request.startTime,
    endTime: request.endTime,
    step: request.step,
    maxFrames: request.maxFrames,
    pairAccelerationScale: request.pairAccelerationScale ?? 0.18,
    signalSpeed:
      request.signalSpeed == null
        ? undefined
        : Number(request.signalSpeed),
    softening: request.softening ?? 0,
    integrationTolerance: request.integrationTolerance ?? 0,
    interactionLaw: request.interactionLaw ?? "display_pair_attraction_v1",
    pathConstraintBoundaryRelaxationIterationCount:
      normalizePairInteractionBoundaryRelaxationIterationCount(
        request.pathConstraintBoundaryRelaxationIterationCount,
      ),
    pathConstraintBoundaryRelaxationTolerance:
      request.pathConstraintBoundaryRelaxationTolerance == null
        ? undefined
        : Number(request.pathConstraintBoundaryRelaxationTolerance),
    pathConstraintBoundaryRelaxationStepTolerance:
      request.pathConstraintBoundaryRelaxationStepTolerance == null
        ? undefined
        : Number(request.pathConstraintBoundaryRelaxationStepTolerance),
    pathConstraintBoundaryResidualTolerance:
      request.pathConstraintBoundaryResidualTolerance == null
        ? undefined
        : Number(request.pathConstraintBoundaryResidualTolerance),
    pathConstraintPositionResidualTolerance:
      request.pathConstraintPositionResidualTolerance == null
        ? undefined
        : Number(request.pathConstraintPositionResidualTolerance),
    pathConstraintGuidanceAccelerationTolerance:
      request.pathConstraintGuidanceAccelerationTolerance == null
        ? undefined
        : Number(request.pathConstraintGuidanceAccelerationTolerance),
    pathConstraintInitialVelocityResidualTolerance:
      request.pathConstraintInitialVelocityResidualTolerance == null
        ? undefined
        : Number(request.pathConstraintInitialVelocityResidualTolerance),
    duration,
    initialStates: request.initialStates.map((state) => ({
      pathKey: state.pathKey,
      initialPosition: copyVector(state.initialPosition),
      initialVelocity: copyVector(state.initialVelocity),
      charge: state.charge ?? (state.pathKey === 1 ? 1 : -1),
      mass: state.mass ?? 1,
      stateFlags: state.stateFlags ?? state.pathKey,
    })),
    pathConstraints: normalizePairInteractionPathConstraints(request.pathConstraints),
  };
}

function normalizePairInteractionBoundaryRelaxationIterationCount(value) {
  if (value == null) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_DEFAULT_ITERATION_COUNT;
  }
  const iterationCount = Number(value);
  if (
    !Number.isInteger(iterationCount) ||
    iterationCount < 0 ||
    iterationCount > PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MAX_ITERATION_COUNT
  ) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "pairInteractionRequest.pathConstraintBoundaryRelaxationIterationCount must be a nonnegative integer within the supported relaxation budget",
        {
          recoverable: false,
          details: {
            pathConstraintBoundaryRelaxationIterationCount: value,
            maxPathConstraintBoundaryRelaxationIterationCount:
              PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MAX_ITERATION_COUNT,
          },
        },
      ),
    );
  }
  return iterationCount;
}

function hasPairInteractionBoundaryRelaxationTolerance(request) {
  const tolerance = Number(request?.pathConstraintBoundaryRelaxationTolerance);
  return Number.isFinite(tolerance) && tolerance > 0;
}

function pairInteractionBoundaryRelaxationTolerance(request) {
  return hasPairInteractionBoundaryRelaxationTolerance(request)
    ? Number(request.pathConstraintBoundaryRelaxationTolerance)
    : undefined;
}

function hasPairInteractionBoundaryRelaxationStepTolerance(request) {
  const tolerance = Number(request?.pathConstraintBoundaryRelaxationStepTolerance);
  return Number.isFinite(tolerance) && tolerance > 0;
}

function pairInteractionBoundaryRelaxationStepTolerance(request) {
  return hasPairInteractionBoundaryRelaxationStepTolerance(request)
    ? Number(request.pathConstraintBoundaryRelaxationStepTolerance)
    : undefined;
}

function enforcePairInteractionBoundaryResidualTolerance(boundarySummary, request, options = {}) {
  const tolerance = Number(request.pathConstraintBoundaryResidualTolerance);
  if (!Number.isFinite(tolerance)) {
    return;
  }
  const hasPathConstraints = Array.isArray(request.pathConstraints) && request.pathConstraints.length > 0;
  const sampleCount = Number(boundarySummary?.pathConstraintBoundaryResidualSampleCount);
  const maxResidual = Number(boundarySummary?.maxPathConstraintBoundaryResidual);
  if (!hasPathConstraints && (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual))) {
    return;
  }
  if (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual)) {
    const residualStatus =
      !Number.isFinite(sampleCount) || sampleCount <= 0
        ? PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_NO_SAMPLES
        : PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_UNRESOLVED;
    throw new SolverBridgeError(
      createStatus(
        "path_constraint_boundary_residual_unresolved",
        "halt",
        "path constraint boundary residual could not be measured for requested tolerance",
        {
          recoverable: true,
          details: {
            pathConstraintBoundaryResidualTolerance: tolerance,
            pathConstraintBoundaryResidualStatus: residualStatus,
            maxPathConstraintBoundaryResidual: Number.isFinite(maxResidual) ? maxResidual : null,
            pathConstraintBoundaryResidualSampleCount: Number.isFinite(sampleCount) ? sampleCount : 0,
            interactionLaw: request.interactionLaw,
            executionPath: options.executionPath,
            requestId: options.requestId,
            runId: options.runId,
            pathConstraintSolverStatus: options.pathConstraintSolverStatus,
            pathConstraintSolverClaim: options.pathConstraintSolverClaim,
          },
        }
      )
    );
  }
  if (maxResidual <= tolerance) {
    return;
  }
  throw new SolverBridgeError(
    createStatus(
      "path_constraint_boundary_residual_exceeded",
      "halt",
      "path constraint boundary residual exceeded tolerance",
      {
        recoverable: true,
        details: {
          pathConstraintBoundaryResidualTolerance: tolerance,
          pathConstraintBoundaryResidualStatus: PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
          maxPathConstraintBoundaryResidual: maxResidual,
          pathConstraintBoundaryResidualSampleCount: sampleCount,
          interactionLaw: request.interactionLaw,
          executionPath: options.executionPath,
          requestId: options.requestId,
          runId: options.runId,
          pathConstraintSolverStatus: options.pathConstraintSolverStatus,
          pathConstraintSolverClaim: options.pathConstraintSolverClaim,
        },
      }
    )
  );
}

function enforcePairInteractionPositionResidualTolerance(positionSummary, request, options = {}) {
  const tolerance = Number(request.pathConstraintPositionResidualTolerance);
  if (!Number.isFinite(tolerance)) {
    return;
  }
  const hasPathConstraints = Array.isArray(request.pathConstraints) && request.pathConstraints.length > 0;
  const sampleCount = Number(positionSummary?.pathConstraintPositionResidualSampleCount);
  const maxResidual = Number(positionSummary?.maxPathConstraintPositionResidual);
  if (!hasPathConstraints && (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual))) {
    return;
  }
  if (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual)) {
    const residualStatus =
      !Number.isFinite(sampleCount) || sampleCount <= 0
        ? PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_NO_SAMPLES
        : PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_UNRESOLVED;
    throw new SolverBridgeError(
      createStatus(
        "path_constraint_position_residual_unresolved",
        "halt",
        "path constraint position residual could not be measured for requested tolerance",
        {
          recoverable: true,
          details: {
            pathConstraintPositionResidualTolerance: tolerance,
            pathConstraintPositionResidualStatus: residualStatus,
            maxPathConstraintPositionResidual: Number.isFinite(maxResidual) ? maxResidual : null,
            pathConstraintPositionResidualSampleCount: Number.isFinite(sampleCount) ? sampleCount : 0,
            interactionLaw: request.interactionLaw,
            executionPath: options.executionPath,
            requestId: options.requestId,
            runId: options.runId,
            pathConstraintSolverStatus: options.pathConstraintSolverStatus,
            pathConstraintSolverClaim: options.pathConstraintSolverClaim,
          },
        },
      ),
    );
  }
  if (maxResidual <= tolerance) {
    return;
  }
  throw new SolverBridgeError(
    createStatus(
      "path_constraint_position_residual_exceeded",
      "halt",
      "path constraint position residual exceeded tolerance",
      {
        recoverable: true,
        details: {
          pathConstraintPositionResidualTolerance: tolerance,
          pathConstraintPositionResidualStatus:
            PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
          maxPathConstraintPositionResidual: maxResidual,
          pathConstraintPositionResidualSampleCount: sampleCount,
          interactionLaw: request.interactionLaw,
          executionPath: options.executionPath,
          requestId: options.requestId,
          runId: options.runId,
          pathConstraintSolverStatus: options.pathConstraintSolverStatus,
          pathConstraintSolverClaim: options.pathConstraintSolverClaim,
        },
      },
    ),
  );
}

function enforcePairInteractionInitialVelocityResidualTolerance(
  initialVelocitySummary,
  request,
  options = {},
) {
  const tolerance = Number(request.pathConstraintInitialVelocityResidualTolerance);
  if (!Number.isFinite(tolerance)) {
    return;
  }
  const sampleCount = Number(
    initialVelocitySummary?.pathConstraintInitialVelocityResidualSampleCount,
  );
  const maxResidual = Number(initialVelocitySummary?.maxPathConstraintInitialVelocityResidual);
  if (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual)) {
    const residualStatus =
      !Number.isFinite(sampleCount) || sampleCount <= 0
        ? PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_NO_SAMPLES
        : PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_UNRESOLVED;
    throw new SolverBridgeError(
      createStatus(
        "path_constraint_initial_velocity_residual_unresolved",
        "halt",
        "path constraint initial velocity residual could not be measured for requested tolerance",
        {
          recoverable: true,
          details: {
            pathConstraintInitialVelocityResidualTolerance: tolerance,
            pathConstraintInitialVelocityResidualStatus: residualStatus,
            maxPathConstraintInitialVelocityResidual: Number.isFinite(maxResidual) ? maxResidual : null,
            pathConstraintInitialVelocityResidualSampleCount: Number.isFinite(sampleCount)
              ? sampleCount
              : 0,
            interactionLaw: request.interactionLaw,
            executionPath: options.executionPath,
            requestId: options.requestId,
            runId: options.runId,
            pathConstraintSolverStatus: options.pathConstraintSolverStatus,
            pathConstraintSolverClaim: options.pathConstraintSolverClaim,
          },
        },
      ),
    );
  }
  if (maxResidual <= tolerance) {
    return;
  }
  throw new SolverBridgeError(
    createStatus(
      "path_constraint_initial_velocity_residual_exceeded",
      "halt",
      "path constraint initial velocity residual exceeded tolerance",
      {
        recoverable: true,
        details: {
          pathConstraintInitialVelocityResidualTolerance: tolerance,
          pathConstraintInitialVelocityResidualStatus:
            PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
          maxPathConstraintInitialVelocityResidual: maxResidual,
          pathConstraintInitialVelocityResidualSampleCount: sampleCount,
          interactionLaw: request.interactionLaw,
          executionPath: options.executionPath,
          requestId: options.requestId,
          runId: options.runId,
          pathConstraintSolverStatus: options.pathConstraintSolverStatus,
          pathConstraintSolverClaim: options.pathConstraintSolverClaim,
        },
      },
    ),
  );
}

function enforcePairInteractionGuidanceAccelerationTolerance(guidanceSummary, request, options = {}) {
  const tolerance = Number(request.pathConstraintGuidanceAccelerationTolerance);
  if (!Number.isFinite(tolerance)) {
    return;
  }
  const hasPathConstraints = Array.isArray(request.pathConstraints) && request.pathConstraints.length > 0;
  const sampleCount = Number(guidanceSummary?.pathConstraintGuidanceSampleCount);
  const maxAcceleration = Number(guidanceSummary?.maxPathConstraintGuidanceAcceleration);
  if (!hasPathConstraints && (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxAcceleration))) {
    return;
  }
  if (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxAcceleration)) {
    const accelerationStatus =
      !Number.isFinite(sampleCount) || sampleCount <= 0
        ? PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_NO_SAMPLES
        : PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_UNRESOLVED;
    throw new SolverBridgeError(
      createStatus(
        "path_constraint_guidance_acceleration_unresolved",
        "halt",
        "path constraint guidance acceleration could not be measured for requested tolerance",
        {
          recoverable: true,
          details: {
            pathConstraintGuidanceAccelerationTolerance: tolerance,
            pathConstraintGuidanceAccelerationStatus: accelerationStatus,
            maxPathConstraintGuidanceAcceleration: Number.isFinite(maxAcceleration) ? maxAcceleration : null,
            pathConstraintGuidanceSampleCount: Number.isFinite(sampleCount) ? sampleCount : 0,
            interactionLaw: request.interactionLaw,
            executionPath: options.executionPath,
            requestId: options.requestId,
            runId: options.runId,
            pathConstraintSolverStatus: options.pathConstraintSolverStatus,
            pathConstraintSolverClaim: options.pathConstraintSolverClaim,
          },
        }
      )
    );
  }
  if (maxAcceleration <= tolerance) {
    return;
  }
  throw new SolverBridgeError(
    createStatus(
      "path_constraint_guidance_acceleration_exceeded",
      "halt",
      "path constraint guidance acceleration exceeded tolerance",
      {
        recoverable: true,
        details: {
          pathConstraintGuidanceAccelerationTolerance: tolerance,
          pathConstraintGuidanceAccelerationStatus:
            PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_EXCEEDED_TOLERANCE,
          maxPathConstraintGuidanceAcceleration: maxAcceleration,
          pathConstraintGuidanceSampleCount: sampleCount,
          interactionLaw: request.interactionLaw,
          executionPath: options.executionPath,
          requestId: options.requestId,
          runId: options.runId,
          pathConstraintSolverStatus: options.pathConstraintSolverStatus,
          pathConstraintSolverClaim: options.pathConstraintSolverClaim,
        },
      },
    ),
  );
}

function normalizePairInteractionPathConstraints(constraints) {
  if (constraints == null) {
    return [];
  }
  return constraints.map((constraint, index) => ({
    pathKey: constraint.pathKey,
    depth: constraint.depth ?? index + 1,
    time: constraint.time,
    position: copyVector(constraint.position),
  }));
}

function createPairInteractionSampleTimes(request) {
  return createPairInteractionSampleSchedule(request).times;
}

function createPairInteractionSampleSchedule(request) {
  const times = [];
  const epsilon = Math.max(request.step * 1e-9, 1e-12);
  for (let time = request.startTime; time < request.endTime - epsilon; time += request.step) {
    times.push(time);
  }
  if (times.length === 0 || Math.abs(times[times.length - 1] - request.endTime) > epsilon) {
    times.push(request.endTime);
  }
  (request.pathConstraints ?? []).forEach((constraint) => {
    if (constraint.time >= request.startTime - epsilon && constraint.time <= request.endTime + epsilon) {
      times.push(Math.max(request.startTime, Math.min(request.endTime, constraint.time)));
    }
  });
  const baseTimes = uniqueSortedPairInteractionTimes(times, epsilon);
  const refinementTimes = [];
  appendPairInteractionConstraintRefinementTimes(refinementTimes, request, epsilon);
  const uniqueRefinementTimes = uniqueSortedPairInteractionTimes(refinementTimes, epsilon);
  const pathConstraintFrameRefinementSampleCount = uniqueRefinementTimes.filter(
    (time) => !baseTimes.some((baseTime) => Math.abs(baseTime - time) <= epsilon),
  ).length;
  return {
    times: uniqueSortedPairInteractionTimes([...baseTimes, ...uniqueRefinementTimes], epsilon),
    pathConstraintFrameRefinementSampleCount,
  };
}

function uniqueSortedPairInteractionTimes(times, epsilon) {
  return times
    .sort((left, right) => left - right)
    .filter((time, index, rows) => index === 0 || Math.abs(time - rows[index - 1]) > epsilon);
}

function appendPairInteractionConstraintRefinementTimes(times, request, epsilon) {
  const constraintsByPath = new Map();
  (request.pathConstraints ?? []).forEach((constraint) => {
    if (constraint.time < request.startTime - epsilon || constraint.time > request.endTime + epsilon) {
      return;
    }
    const pathTimes = constraintsByPath.get(constraint.pathKey) ?? [];
    pathTimes.push(Math.max(request.startTime, Math.min(request.endTime, constraint.time)));
    constraintsByPath.set(constraint.pathKey, pathTimes);
  });
  constraintsByPath.forEach((pathTimes) => {
    const sortedTimes = pathTimes
      .sort((left, right) => left - right)
      .filter((time, index, rows) => index === 0 || Math.abs(time - rows[index - 1]) > epsilon);
    for (let index = 0; index + 1 < sortedTimes.length; index += 1) {
      const left = sortedTimes[index];
      const right = sortedTimes[index + 1];
      if (right - left <= epsilon * 2) {
        continue;
      }
      [0.25, 0.5, 0.75].forEach((fraction) => {
        const refinementTime = left + (right - left) * fraction;
        if (refinementTime > request.startTime + epsilon && refinementTime < request.endTime - epsilon) {
          times.push(refinementTime);
        }
      });
    }
  });
}

function advancePairInteractionStates(states, currentTime, nextTime, request, guidanceSummary = null) {
  const dt = nextTime - currentTime;
  if (dt <= 0) {
    return states;
  }
  const accelerations = computePairInteractionAccelerations(states, request);
  return states.map((state, index) => {
    const guidedAcceleration = computePairConstraintGuidedAcceleration(
      state,
      accelerations[index],
      currentTime,
      nextTime,
      request,
    );
    if (guidedAcceleration.guided && guidanceSummary) {
      recordPairConstraintGuidanceSample(
        guidanceSummary,
        guidedAcceleration.guidanceCorrectionMagnitude,
      );
    }
    const acceleration = guidedAcceleration.acceleration;
    const velocity = {
      x: state.velocity.x + acceleration.x * dt,
      y: state.velocity.y + acceleration.y * dt,
      z: state.velocity.z + acceleration.z * dt,
    };
    return {
      ...state,
      velocity,
      position: {
        x: state.position.x + velocity.x * dt,
        y: state.position.y + velocity.y * dt,
        z: state.position.z + velocity.z * dt,
      },
    };
  }).map((state) => snapPairInteractionStateToConstraints(state, nextTime, request));
}

function createPairConstraintGuidanceSummary() {
  return {
    pathConstraintGuidanceSampleCount: 0,
    maxPathConstraintGuidanceAcceleration: 0,
    meanPathConstraintGuidanceAcceleration: 0,
    rmsPathConstraintGuidanceAcceleration: 0,
  };
}

function createPairInteractionConstraintSolverMetadata(
  pathConstraintCount,
  guidanceSampleCount,
  boundarySeedSampleCount,
  boundaryRelaxationStatus,
  positionResidualSummary = {},
  request = {},
  initialVelocityResidualSummary = {},
  boundaryResidualSummary = {},
) {
  if (!Number.isFinite(pathConstraintCount) || pathConstraintCount <= 0) {
    return {
      pathConstraintSolverStatus: PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_UNCONSTRAINED,
      pathConstraintSolverClaim: undefined,
    };
  }
  if (
    boundaryRelaxationStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED &&
    pairInteractionConstraintPositionsPreserved(pathConstraintCount, positionResidualSummary, request) &&
    pairInteractionInitialVelocityBoundaryPreserved(initialVelocityResidualSummary, request) &&
    pairInteractionBoundaryResidualAccepted(boundaryResidualSummary, request)
  ) {
    return {
      pathConstraintSolverStatus:
        PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_DISCRETE_BOUNDARY_CONVERGED,
      pathConstraintSolverClaim:
        PAIR_INTERACTION_CONSTRAINT_SOLVER_CLAIM_DISCRETE_BOUNDARY_CONVERGED,
    };
  }
  return {
    pathConstraintSolverStatus: Number.isFinite(boundarySeedSampleCount) && boundarySeedSampleCount > 0
      ? PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_BOUNDARY_SEEDED
      : Number.isFinite(guidanceSampleCount) && guidanceSampleCount > 0
        ? PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_GUIDED
        : PAIR_INTERACTION_CONSTRAINT_SOLVER_STATUS_SNAP,
    pathConstraintSolverClaim: PAIR_INTERACTION_CONSTRAINT_SOLVER_CLAIM_CONSTRAINED,
  };
}

function createPairInteractionPhysicalBoundarySolverMetadata(
  pathConstraintCount,
  guidanceSummary = {},
  boundaryRelaxationStatus = undefined,
  positionResidualSummary = {},
  request = {},
  initialVelocityResidualSummary = {},
  boundaryResidualSummary = {},
) {
  if (!Number.isFinite(pathConstraintCount) || pathConstraintCount <= 0) {
    return {};
  }
  const guidanceSampleCount = Number(guidanceSummary?.pathConstraintGuidanceSampleCount);
  const maxGuidanceAcceleration = Number(guidanceSummary?.maxPathConstraintGuidanceAcceleration);
  const retainedPositionsPreserved = pairInteractionConstraintPositionsPreserved(
    pathConstraintCount,
    positionResidualSummary,
    request,
  );
  const initialVelocityPreserved = pairInteractionInitialVelocityBoundaryPreserved(
    initialVelocityResidualSummary,
    request,
  );
  const boundaryResidualAccepted = pairInteractionBoundaryResidualAccepted(
    boundaryResidualSummary,
    request,
  );
  const hasConvergedBoundaryEvidence =
    boundaryRelaxationStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED &&
    retainedPositionsPreserved &&
    initialVelocityPreserved &&
    boundaryResidualAccepted;
  let blockingReason = PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_NOT_IMPLEMENTED;
  if (hasConvergedBoundaryEvidence) {
    blockingReason = PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_NOT_IMPLEMENTED;
  } else if (
    boundaryRelaxationStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED &&
    retainedPositionsPreserved &&
    !initialVelocityPreserved
  ) {
    blockingReason =
      PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_INITIAL_VELOCITY;
  } else if (
    boundaryRelaxationStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED &&
    retainedPositionsPreserved &&
    initialVelocityPreserved &&
    !boundaryResidualAccepted
  ) {
    blockingReason =
      PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_BOUNDARY_RESIDUAL;
  } else if (
    Number.isFinite(guidanceSampleCount) &&
    guidanceSampleCount > 0 &&
    Number.isFinite(maxGuidanceAcceleration) &&
    maxGuidanceAcceleration > 0
  ) {
    blockingReason = PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_GUIDANCE_ACCELERATION;
  } else if (
    boundaryRelaxationStatus !==
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED
  ) {
    blockingReason = PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_BLOCKING_REASON_RELAXATION_UNCONVERGED;
  }
  return {
    pathConstraintPhysicalBoundarySolverStatus:
      PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_STATUS_PENDING,
    pathConstraintPhysicalBoundarySolverClaim:
      PAIR_INTERACTION_PHYSICAL_BOUNDARY_SOLVER_CLAIM_PENDING,
    pathConstraintPhysicalBoundarySolverBlockingReason: blockingReason,
  };
}

function pairInteractionBoundaryResidualAccepted(boundaryResidualSummary, request) {
  const requestedTolerance = Number(request?.pathConstraintBoundaryResidualTolerance);
  if (!Number.isFinite(requestedTolerance)) {
    return true;
  }
  const sampleCount = Number(
    boundaryResidualSummary?.pathConstraintBoundaryResidualSampleCount,
  );
  const maxResidual = Number(boundaryResidualSummary?.maxPathConstraintBoundaryResidual);
  return Number.isFinite(sampleCount) && sampleCount > 0 && Number.isFinite(maxResidual)
    ? maxResidual <= requestedTolerance
    : false;
}

function pairInteractionInitialVelocityBoundaryPreserved(initialVelocityResidualSummary, request) {
  const requestedTolerance = Number(request.pathConstraintInitialVelocityResidualTolerance);
  const tolerance = Number.isFinite(requestedTolerance)
    ? requestedTolerance
    : PAIR_INTERACTION_DERIVED_INITIAL_VELOCITY_RESIDUAL_TOLERANCE;
  const sampleCount = Number(
    initialVelocityResidualSummary?.pathConstraintInitialVelocityResidualSampleCount,
  );
  const maxResidual = Number(initialVelocityResidualSummary?.maxPathConstraintInitialVelocityResidual);
  return Number.isFinite(sampleCount) && sampleCount > 0 && Number.isFinite(maxResidual)
    ? maxResidual <= tolerance
    : false;
}

function pairInteractionConstraintPositionsPreserved(pathConstraintCount, positionResidualSummary, request) {
  const constraintCount = Number(pathConstraintCount);
  if (!Number.isFinite(constraintCount) || constraintCount <= 0) {
    return false;
  }
  const sampleCount = Number(positionResidualSummary?.pathConstraintPositionResidualSampleCount);
  const maxResidual = Number(positionResidualSummary?.maxPathConstraintPositionResidual);
  if (!Number.isFinite(sampleCount) || sampleCount < constraintCount || !Number.isFinite(maxResidual)) {
    return false;
  }
  const requestedTolerance = Number(request?.pathConstraintPositionResidualTolerance);
  const tolerance = Number.isFinite(requestedTolerance)
    ? requestedTolerance
    : PAIR_INTERACTION_DERIVED_BOUNDARY_POSITION_RESIDUAL_TOLERANCE;
  return maxResidual <= Math.max(tolerance, PAIR_INTERACTION_DERIVED_BOUNDARY_POSITION_RESIDUAL_TOLERANCE);
}

function createPairInteractionPathConstraintBoundaryMode(request) {
  if (!request || !Array.isArray(request.pathConstraints) || request.pathConstraints.length === 0) {
    return undefined;
  }
  const epsilon = pairConstraintTimeEpsilon(request);
  let hasBoundarySegment = false;
  const pathKeys = Array.from(new Set(request.pathConstraints.map((constraint) => constraint.pathKey)));
  for (const pathKey of pathKeys) {
    const constraints = sortedPairConstraintsForPath(request, pathKey);
    for (let index = 0; index + 1 < constraints.length; index += 1) {
      const left = constraints[index];
      const right = constraints[index + 1];
      if (right.time - left.time <= epsilon) {
        continue;
      }
      hasBoundarySegment = true;
      if (
        !pairConstraintLawAccelerationAtTime(request, left.pathKey, left.time) ||
        !pairConstraintLawAccelerationAtTime(request, right.pathKey, right.time)
      ) {
        return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_MODE;
      }
    }
  }
  return hasBoundarySegment
    ? PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_MODE_LAW_AWARE
    : PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_MODE;
}

function copyPairInteractionFrameStates(frames) {
  return frames.map((frame) => ({
    position: copyVector(frame.position),
    velocity: copyVector(frame.velocity),
  }));
}

function restorePairInteractionFrameStates(frames, states) {
  frames.forEach((frame, index) => {
    const state = states[index];
    if (!state) {
      return;
    }
    frame.position = copyVector(state.position);
    frame.velocity = copyVector(state.velocity);
  });
}

function pairInteractionBoundaryRelaxationResidualEvidenceStatus(residualBefore, residualAfter) {
  const beforeSampleCount = Number(residualBefore?.pathConstraintBoundaryRelaxationResidualSampleCount);
  const afterSampleCount = Number(residualAfter?.pathConstraintBoundaryRelaxationResidualSampleCount);
  if (
    !Number.isFinite(beforeSampleCount) ||
    beforeSampleCount <= 0 ||
    !Number.isFinite(afterSampleCount) ||
    afterSampleCount <= 0
  ) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NO_SAMPLES;
  }
  const residualPairs = [
    [
      residualBefore?.maxPathConstraintBoundaryRelaxationResidual,
      residualAfter?.maxPathConstraintBoundaryRelaxationResidual,
    ],
    [
      residualBefore?.meanPathConstraintBoundaryRelaxationResidual,
      residualAfter?.meanPathConstraintBoundaryRelaxationResidual,
    ],
    [
      residualBefore?.rmsPathConstraintBoundaryRelaxationResidual,
      residualAfter?.rmsPathConstraintBoundaryRelaxationResidual,
    ],
  ].map(([before, after]) => [Number(before), Number(after)]);
  if (!residualPairs.every(([before, after]) => Number.isFinite(before) && Number.isFinite(after))) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_INCOMPLETE;
  }
  return residualPairs.every(([before, after]) => after <= before)
    ? PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NON_WORSENING
    : PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_WORSENED;
}

function getPairInteractionBoundaryRelaxationStatus(residualBefore, residualAfter, request, run = {}) {
  if (
    Array.isArray(request?.pathConstraints) &&
    request.pathConstraints.length > 0 &&
    normalizePairInteractionBoundaryRelaxationIterationCount(
      request.pathConstraintBoundaryRelaxationIterationCount,
    ) === 0
  ) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NOT_REQUESTED;
  }
  const beforeSampleCount = Number(residualBefore?.pathConstraintBoundaryRelaxationResidualSampleCount);
  const afterSampleCount = Number(residualAfter?.pathConstraintBoundaryRelaxationResidualSampleCount);
  if (!Number.isFinite(beforeSampleCount) || beforeSampleCount <= 0 || !Number.isFinite(afterSampleCount) || afterSampleCount <= 0) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES;
  }
  const beforeMax = Number(residualBefore?.maxPathConstraintBoundaryRelaxationResidual);
  const afterMax = Number(residualAfter?.maxPathConstraintBoundaryRelaxationResidual);
  if (!Number.isFinite(beforeMax) || !Number.isFinite(afterMax)) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES;
  }
  const residualEvidenceStatus = pairInteractionBoundaryRelaxationResidualEvidenceStatus(
    residualBefore,
    residualAfter,
  );
  if (
    residualEvidenceStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NO_SAMPLES ||
    residualEvidenceStatus ===
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_INCOMPLETE
  ) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES;
  }
  const isNonWorsening =
    residualEvidenceStatus ===
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EVIDENCE_NON_WORSENING;
  const tolerance = pairInteractionBoundaryRelaxationTolerance(request);
  if (Number.isFinite(tolerance) && afterMax <= tolerance && isNonWorsening) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED;
  }
  if (
    isNonWorsening &&
    run?.pathConstraintBoundaryRelaxationStopReason ===
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_STEP_TOLERANCE_REACHED
  ) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_STEP_CONVERGED;
  }
  return isNonWorsening
    ? PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_ACCEPTED
    : PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_REVERTED;
}

function derivePairInteractionBoundaryRelaxationStopReason(request, status, appliedIterationCount) {
  if (!request || !Array.isArray(request.pathConstraints) || request.pathConstraints.length === 0) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES;
  }
  const iterationCount = normalizePairInteractionBoundaryRelaxationIterationCount(
    request.pathConstraintBoundaryRelaxationIterationCount,
  );
  if (iterationCount === 0 || status === PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NOT_REQUESTED) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NOT_REQUESTED;
  }
  if (status === PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_NO_SAMPLES) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES;
  }
  if (status === PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_CONVERGED) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_TOLERANCE_REACHED;
  }
  if (status === PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_STEP_CONVERGED) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_STEP_TOLERANCE_REACHED;
  }
  if (status === PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_REVERTED) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_LINE_SEARCH_STALLED;
  }
  const appliedCount = Number(appliedIterationCount);
  if (Number.isFinite(appliedCount) && appliedCount >= iterationCount) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_ITERATION_BUDGET_EXHAUSTED;
  }
  if (Number.isFinite(appliedCount) && appliedCount > 0) {
    return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_UPDATES;
  }
  return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES;
}

function createPairInteractionBoundaryRelaxationMetadata(
  request,
  residualBefore,
  residualAfter,
  status,
  run = {},
) {
  if (!request || !Array.isArray(request.pathConstraints) || request.pathConstraints.length === 0) {
    return {};
  }
  const beforeMax = Number(residualBefore?.maxPathConstraintBoundaryRelaxationResidual);
  const afterMax = Number(residualAfter?.maxPathConstraintBoundaryRelaxationResidual);
  const beforeMean = Number(residualBefore?.meanPathConstraintBoundaryRelaxationResidual);
  const afterMean = Number(residualAfter?.meanPathConstraintBoundaryRelaxationResidual);
  const beforeRms = Number(residualBefore?.rmsPathConstraintBoundaryRelaxationResidual);
  const afterRms = Number(residualAfter?.rmsPathConstraintBoundaryRelaxationResidual);
  const residualRatio = (after, before) =>
    Number.isFinite(before) && before > 0 && Number.isFinite(after) ? after / before : 0;
  const settlingRate = (ratio, appliedCount) => {
    if (!Number.isFinite(ratio) || ratio < 0 || !Number.isFinite(appliedCount) || appliedCount <= 0) {
      return 0;
    }
    return ratio === 0 ? 0 : Math.pow(ratio, 1 / appliedCount);
  };
  const iterationCount = normalizePairInteractionBoundaryRelaxationIterationCount(
    request.pathConstraintBoundaryRelaxationIterationCount,
  );
  const appliedIterationCount = Number.isInteger(run.pathConstraintBoundaryRelaxationAppliedIterationCount)
    ? run.pathConstraintBoundaryRelaxationAppliedIterationCount
    : iterationCount;
  const boundaryRelaxationStatus =
    status ?? getPairInteractionBoundaryRelaxationStatus(residualBefore, residualAfter, request, run);
  const residualEvidenceStatus = pairInteractionBoundaryRelaxationResidualEvidenceStatus(
    residualBefore,
    residualAfter,
  );
  const stopReason =
    run.pathConstraintBoundaryRelaxationStopReason ??
    derivePairInteractionBoundaryRelaxationStopReason(request, boundaryRelaxationStatus, appliedIterationCount);
  const tolerance = pairInteractionBoundaryRelaxationTolerance(request);
  const stepTolerance = pairInteractionBoundaryRelaxationStepTolerance(request);
  const maxResidualRatio = residualRatio(afterMax, beforeMax);
  const meanResidualRatio = residualRatio(afterMean, beforeMean);
  const rmsResidualRatio = residualRatio(afterRms, beforeRms);
  const selectedCandidateKind =
    typeof run.pathConstraintBoundaryRelaxationSelectedCandidateKind === "string"
      ? run.pathConstraintBoundaryRelaxationSelectedCandidateKind
      : "none";
  const centerOfMassSelectedCount = Number(
    run.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount,
  );
  const candidateVariantCount = Number(
    run.pathConstraintBoundaryRelaxationCandidateVariantCount,
  );
  const lineSearchTrialCount = Number(
    run.pathConstraintBoundaryRelaxationLineSearchTrialCount,
  );
  const candidateKindMask = Number(
    run.pathConstraintBoundaryRelaxationCandidateKindMask,
  );
  return {
    pathConstraintBoundaryRelaxationMode: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MODE,
    pathConstraintBoundaryRelaxationIterationCount: iterationCount,
    pathConstraintBoundaryRelaxationAppliedIterationCount: appliedIterationCount,
    ...(stopReason ? { pathConstraintBoundaryRelaxationStopReason: stopReason } : {}),
    ...(Number.isFinite(tolerance) ? { pathConstraintBoundaryRelaxationTolerance: tolerance } : {}),
    ...(Number.isFinite(stepTolerance)
      ? { pathConstraintBoundaryRelaxationStepTolerance: stepTolerance }
      : {}),
    pathConstraintBoundaryRelaxationStatus: boundaryRelaxationStatus,
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: residualEvidenceStatus,
    pathConstraintBoundaryRelaxationResidualSampleCount:
      residualAfter?.pathConstraintBoundaryRelaxationResidualSampleCount ?? 0,
    pathConstraintBoundaryRelaxationResidualMode:
      residualAfter?.pathConstraintBoundaryRelaxationResidualMode ??
      residualBefore?.pathConstraintBoundaryRelaxationResidualMode ??
      pairInteractionPairLawResidualMode(request),
    maxPathConstraintBoundaryRelaxationResidualBefore: Number.isFinite(beforeMax) ? beforeMax : 0,
    maxPathConstraintBoundaryRelaxationResidualAfter: Number.isFinite(afterMax) ? afterMax : 0,
    meanPathConstraintBoundaryRelaxationResidualBefore: Number.isFinite(
      residualBefore?.meanPathConstraintBoundaryRelaxationResidual,
    )
      ? residualBefore.meanPathConstraintBoundaryRelaxationResidual
      : 0,
    meanPathConstraintBoundaryRelaxationResidualAfter: Number.isFinite(
      residualAfter?.meanPathConstraintBoundaryRelaxationResidual,
    )
      ? residualAfter.meanPathConstraintBoundaryRelaxationResidual
      : 0,
    rmsPathConstraintBoundaryRelaxationResidualBefore: Number.isFinite(
      residualBefore?.rmsPathConstraintBoundaryRelaxationResidual,
    )
      ? residualBefore.rmsPathConstraintBoundaryRelaxationResidual
      : 0,
    rmsPathConstraintBoundaryRelaxationResidualAfter: Number.isFinite(
      residualAfter?.rmsPathConstraintBoundaryRelaxationResidual,
    )
      ? residualAfter.rmsPathConstraintBoundaryRelaxationResidual
      : 0,
    pathConstraintBoundaryRelaxationResidualRatio: maxResidualRatio,
    meanPathConstraintBoundaryRelaxationResidualRatio: meanResidualRatio,
    rmsPathConstraintBoundaryRelaxationResidualRatio: rmsResidualRatio,
    pathConstraintBoundaryRelaxationResidualSettlingRate:
      settlingRate(maxResidualRatio, appliedIterationCount),
    meanPathConstraintBoundaryRelaxationResidualSettlingRate:
      settlingRate(meanResidualRatio, appliedIterationCount),
    rmsPathConstraintBoundaryRelaxationResidualSettlingRate:
      settlingRate(rmsResidualRatio, appliedIterationCount),
    pathConstraintBoundaryRelaxationMaxStep: Number.isFinite(
      run.pathConstraintBoundaryRelaxationMaxStep,
    )
      ? run.pathConstraintBoundaryRelaxationMaxStep
      : 0,
    pathConstraintBoundaryRelaxationFinalStepFactor: Number.isFinite(
      run.pathConstraintBoundaryRelaxationFinalStepFactor,
    )
      ? run.pathConstraintBoundaryRelaxationFinalStepFactor
      : 0,
    pathConstraintBoundaryRelaxationSelectedCandidateKind: selectedCandidateKind,
    pathConstraintBoundaryRelaxationCenterOfMassSelectedCount: Number.isFinite(centerOfMassSelectedCount)
      ? centerOfMassSelectedCount
      : 0,
    pathConstraintBoundaryRelaxationCandidateVariantCount: Number.isFinite(candidateVariantCount)
      ? candidateVariantCount
      : 0,
    pathConstraintBoundaryRelaxationLineSearchTrialCount: Number.isFinite(lineSearchTrialCount)
      ? lineSearchTrialCount
      : 0,
    pathConstraintBoundaryRelaxationCandidateKindMask: Number.isFinite(candidateKindMask)
      ? candidateKindMask
      : 0,
  };
}

function createPairInteractionBoundaryResidualAcceptanceMetadata(boundarySummary, request) {
  const tolerance = Number(request.pathConstraintBoundaryResidualTolerance);
  if (!Number.isFinite(tolerance)) {
    return {
      pathConstraintBoundaryResidualStatus: PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_UNCHECKED,
    };
  }
  const sampleCount = Number(boundarySummary?.pathConstraintBoundaryResidualSampleCount);
  if (!Number.isFinite(sampleCount) || sampleCount <= 0) {
    return {
      pathConstraintBoundaryResidualStatus: PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_NO_SAMPLES,
    };
  }
  const maxResidual = Number(boundarySummary?.maxPathConstraintBoundaryResidual);
  if (!Number.isFinite(maxResidual)) {
    return {
      pathConstraintBoundaryResidualStatus: PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_UNRESOLVED,
    };
  }
  return {
    pathConstraintBoundaryResidualStatus:
      maxResidual <= tolerance
        ? PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_WITHIN_TOLERANCE
        : PAIR_INTERACTION_BOUNDARY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
  };
}

function createPairInteractionPositionResidualAcceptanceMetadata(positionSummary, request) {
  const explicitTolerance = Number(request.pathConstraintPositionResidualTolerance);
  const hasPathConstraints = Array.isArray(request.pathConstraints) && request.pathConstraints.length > 0;
  const tolerance = Number.isFinite(explicitTolerance)
    ? explicitTolerance
    : hasPathConstraints
      ? PAIR_INTERACTION_DERIVED_BOUNDARY_POSITION_RESIDUAL_TOLERANCE
      : Number.NaN;
  if (!Number.isFinite(tolerance)) {
    return {
      pathConstraintPositionResidualStatus: PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_UNCHECKED,
    };
  }
  const sampleCount = Number(positionSummary?.pathConstraintPositionResidualSampleCount);
  if (!Number.isFinite(sampleCount) || sampleCount <= 0) {
    return {
      pathConstraintPositionResidualStatus: PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_NO_SAMPLES,
    };
  }
  const maxResidual = Number(positionSummary?.maxPathConstraintPositionResidual);
  if (!Number.isFinite(maxResidual)) {
    return {
      pathConstraintPositionResidualStatus: PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_UNRESOLVED,
    };
  }
  return {
    pathConstraintPositionResidualStatus:
      maxResidual <= tolerance
        ? PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_WITHIN_TOLERANCE
        : PAIR_INTERACTION_POSITION_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
  };
}

function createPairInteractionInitialVelocityResidualAcceptanceMetadata(initialVelocitySummary, request) {
  const tolerance = Number(request.pathConstraintInitialVelocityResidualTolerance);
  if (!Number.isFinite(tolerance)) {
    return {
      pathConstraintInitialVelocityResidualStatus:
        PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_UNCHECKED,
    };
  }
  const sampleCount = Number(
    initialVelocitySummary?.pathConstraintInitialVelocityResidualSampleCount,
  );
  if (!Number.isFinite(sampleCount) || sampleCount <= 0) {
    return {
      pathConstraintInitialVelocityResidualStatus:
        PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_NO_SAMPLES,
    };
  }
  const maxResidual = Number(initialVelocitySummary?.maxPathConstraintInitialVelocityResidual);
  if (!Number.isFinite(maxResidual)) {
    return {
      pathConstraintInitialVelocityResidualStatus:
        PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_UNRESOLVED,
    };
  }
  return {
    pathConstraintInitialVelocityResidualStatus:
      maxResidual <= tolerance
        ? PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_WITHIN_TOLERANCE
        : PAIR_INTERACTION_INITIAL_VELOCITY_RESIDUAL_STATUS_EXCEEDED_TOLERANCE,
  };
}

function createPairInteractionGuidanceAccelerationAcceptanceMetadata(guidanceSummary, request) {
  const tolerance = Number(request.pathConstraintGuidanceAccelerationTolerance);
  if (!Number.isFinite(tolerance)) {
    return {
      pathConstraintGuidanceAccelerationStatus:
        PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_UNCHECKED,
    };
  }
  const sampleCount = Number(guidanceSummary?.pathConstraintGuidanceSampleCount);
  if (!Number.isFinite(sampleCount) || sampleCount <= 0) {
    return {
      pathConstraintGuidanceAccelerationStatus:
        PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_NO_SAMPLES,
    };
  }
  const maxAcceleration = Number(guidanceSummary?.maxPathConstraintGuidanceAcceleration);
  if (!Number.isFinite(maxAcceleration)) {
    return {
      pathConstraintGuidanceAccelerationStatus:
        PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_UNRESOLVED,
    };
  }
  return {
    pathConstraintGuidanceAccelerationStatus:
      maxAcceleration <= tolerance
        ? PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_WITHIN_TOLERANCE
        : PAIR_INTERACTION_GUIDANCE_ACCELERATION_STATUS_EXCEEDED_TOLERANCE,
  };
}

function recordPairConstraintGuidanceSample(summary, correctionMagnitude) {
  if (!Number.isFinite(correctionMagnitude) || correctionMagnitude < 0) {
    return;
  }
  const sampleCount = summary.pathConstraintGuidanceSampleCount;
  summary.maxPathConstraintGuidanceAcceleration = Math.max(
    summary.maxPathConstraintGuidanceAcceleration,
    correctionMagnitude,
  );
  summary.meanPathConstraintGuidanceAcceleration =
    (summary.meanPathConstraintGuidanceAcceleration * sampleCount + correctionMagnitude) /
    (sampleCount + 1);
  summary.rmsPathConstraintGuidanceAcceleration = Math.sqrt(
    (summary.rmsPathConstraintGuidanceAcceleration *
      summary.rmsPathConstraintGuidanceAcceleration *
      sampleCount +
      correctionMagnitude * correctionMagnitude) /
      (sampleCount + 1),
  );
  summary.pathConstraintGuidanceSampleCount += 1;
}

function pairConstraintTimeEpsilon(request) {
  return Math.max(request.step * 1e-9, 1e-12);
}

function snapPairInteractionStatesToConstraints(states, time, request) {
  return states.map((state) => snapPairInteractionStateToConstraints(state, time, request));
}

function snapPairInteractionStateToConstraints(state, time, request) {
  const epsilon = pairConstraintTimeEpsilon(request);
  const constraints = sortedPairConstraintsForPath(request, state.pathKey);
  const constraint = constraints.find((candidate) => Math.abs(candidate.time - time) <= epsilon);
  if (!constraint) {
    return state;
  }
  const initialState = request.initialStates.find((candidate) => candidate.pathKey === state.pathKey);
  const firstTangent = initialState?.initialVelocity ?? state.velocity;
  const tangentVelocity = pairConstraintTangentAtTime(constraints, time, epsilon, request, firstTangent);
  return {
    ...state,
    position: copyVector(constraint.position),
    ...(tangentVelocity ? { velocity: tangentVelocity } : {}),
  };
}

function pairConstraintTangentAtTime(constraints, time, epsilon, request, firstTangent) {
  const index = constraints.findIndex((constraint) => Math.abs(constraint.time - time) <= epsilon);
  if (index < 0) {
    return null;
  }
  return pairConstraintTangentForIndex(constraints, index, firstTangent, epsilon, request);
}

function pairConstraintTangentForIndex(constraints, index, firstTangent, epsilon, request) {
  if (index < 0 || index >= constraints.length) {
    return null;
  }
  if (index === 0) {
    return copyVector(firstTangent);
  }
  const lawAware = pairConstraintLawAwareTangentForIndex(constraints, index, epsilon, request);
  if (lawAware) {
    return lawAware;
  }
  return pairConstraintGeometricTangentForIndex(constraints, index, epsilon);
}

function pairConstraintGeometricTangentForIndex(constraints, index, epsilon) {
  if (index + 1 < constraints.length) {
    const previous = constraints[index - 1];
    const next = constraints[index + 1];
    const span = next.time - previous.time;
    if (span > epsilon) {
      return {
        x: (next.position.x - previous.position.x) / span,
        y: (next.position.y - previous.position.y) / span,
        z: (next.position.z - previous.position.z) / span,
      };
    }
  }
  const previous = constraints[index - 1];
  const current = constraints[index];
  const span = current.time - previous.time;
  if (span <= epsilon) {
    return null;
  }
  return {
    x: (current.position.x - previous.position.x) / span,
    y: (current.position.y - previous.position.y) / span,
    z: (current.position.z - previous.position.z) / span,
  };
}

function pairConstraintLawAwareTangentForIndex(constraints, index, epsilon, request) {
  if (!request || index <= 0 || index >= constraints.length) {
    return null;
  }
  const current = constraints[index];
  const acceleration = pairConstraintLawAccelerationAtTime(request, current.pathKey, current.time);
  if (!acceleration) {
    return null;
  }
  const previous = constraints[index - 1];
  if (index + 1 < constraints.length) {
    const next = constraints[index + 1];
    const leftDt = current.time - previous.time;
    const rightDt = next.time - current.time;
    const span = leftDt + rightDt;
    if (leftDt > epsilon && rightDt > epsilon && span > epsilon) {
      const accelerationTimeBias = 0.5 * (rightDt * rightDt - leftDt * leftDt);
      return {
        x: (next.position.x - previous.position.x - acceleration.x * accelerationTimeBias) / span,
        y: (next.position.y - previous.position.y - acceleration.y * accelerationTimeBias) / span,
        z: (next.position.z - previous.position.z - acceleration.z * accelerationTimeBias) / span,
      };
    }
  }
  const span = current.time - previous.time;
  if (span <= epsilon) {
    return null;
  }
  return {
    x: (current.position.x - previous.position.x) / span + 0.5 * acceleration.x * span,
    y: (current.position.y - previous.position.y) / span + 0.5 * acceleration.y * span,
    z: (current.position.z - previous.position.z) / span + 0.5 * acceleration.z * span,
  };
}

function pairConstraintLawAccelerationAtTime(request, pathKey, time) {
  const states = statesFromPairConstraintsAtTime(request, time);
  if (states.length !== request.initialStates.length) {
    return null;
  }
  const lawAccelerations = computePairInteractionAccelerations(states, request);
  const stateIndex = states.findIndex((state) => state.pathKey === pathKey);
  return stateIndex >= 0 ? lawAccelerations[stateIndex] ?? null : null;
}

function pairConstraintHermitePositionAtTime(constraints, firstTangent, time, epsilon, request) {
  if (constraints.length === 0) {
    return null;
  }
  const exact = constraints.find((constraint) => Math.abs(constraint.time - time) <= epsilon);
  if (exact) {
    return copyVector(exact.position);
  }
  if (time < constraints[0].time - epsilon || time > constraints[constraints.length - 1].time + epsilon) {
    return null;
  }
  const rightIndex = constraints.findIndex((constraint) => constraint.time >= time);
  if (rightIndex <= 0) {
    return null;
  }
  const leftIndex = rightIndex - 1;
  const left = constraints[leftIndex];
  const right = constraints[rightIndex];
  const span = right.time - left.time;
  if (span <= epsilon) {
    return null;
  }
  const leftTangent = pairConstraintTangentForIndex(constraints, leftIndex, firstTangent, epsilon, request);
  const rightTangent = pairConstraintTangentForIndex(constraints, rightIndex, firstTangent, epsilon, request);
  if (!leftTangent || !rightTangent) {
    return null;
  }
  const u = Math.max(0, Math.min(1, (time - left.time) / span));
  const leftAcceleration = request
    ? pairConstraintLawAccelerationAtTime(request, left.pathKey, left.time)
    : null;
  const rightAcceleration = request
    ? pairConstraintLawAccelerationAtTime(request, right.pathKey, right.time)
    : null;
  if (leftAcceleration && rightAcceleration) {
    const lawAwarePosition = pairConstraintQuinticBoundaryPosition(
      left,
      right,
      leftTangent,
      rightTangent,
      leftAcceleration,
      rightAcceleration,
      u,
      span,
    );
    if (lawAwarePosition) {
      return lawAwarePosition;
    }
  }
  const u2 = u * u;
  const u3 = u2 * u;
  const h00 = 2 * u3 - 3 * u2 + 1;
  const h10 = u3 - 2 * u2 + u;
  const h01 = -2 * u3 + 3 * u2;
  const h11 = u3 - u2;
  return {
    x: h00 * left.position.x + h10 * span * leftTangent.x + h01 * right.position.x + h11 * span * rightTangent.x,
    y: h00 * left.position.y + h10 * span * leftTangent.y + h01 * right.position.y + h11 * span * rightTangent.y,
    z: h00 * left.position.z + h10 * span * leftTangent.z + h01 * right.position.z + h11 * span * rightTangent.z,
  };
}

function pairConstraintQuinticBoundaryPosition(
  left,
  right,
  leftTangent,
  rightTangent,
  leftAcceleration,
  rightAcceleration,
  u,
  span,
) {
  const u2 = u * u;
  const u3 = u2 * u;
  const u4 = u3 * u;
  const u5 = u4 * u;
  const h00 = 1 - 10 * u3 + 15 * u4 - 6 * u5;
  const h10 = u - 6 * u3 + 8 * u4 - 3 * u5;
  const h20 = 0.5 * u2 - 1.5 * u3 + 1.5 * u4 - 0.5 * u5;
  const h01 = 10 * u3 - 15 * u4 + 6 * u5;
  const h11 = -4 * u3 + 7 * u4 - 3 * u5;
  const h21 = 0.5 * u3 - u4 + 0.5 * u5;
  const spanSquared = span * span;
  const position = {
    x:
      h00 * left.position.x +
      h10 * span * leftTangent.x +
      h20 * spanSquared * leftAcceleration.x +
      h01 * right.position.x +
      h11 * span * rightTangent.x +
      h21 * spanSquared * rightAcceleration.x,
    y:
      h00 * left.position.y +
      h10 * span * leftTangent.y +
      h20 * spanSquared * leftAcceleration.y +
      h01 * right.position.y +
      h11 * span * rightTangent.y +
      h21 * spanSquared * rightAcceleration.y,
    z:
      h00 * left.position.z +
      h10 * span * leftTangent.z +
      h20 * spanSquared * leftAcceleration.z +
      h01 * right.position.z +
      h11 * span * rightTangent.z +
      h21 * spanSquared * rightAcceleration.z,
  };
  return Number.isFinite(position.x) && Number.isFinite(position.y) && Number.isFinite(position.z)
    ? position
    : null;
}

function computePairConstraintGuidedAcceleration(state, physicalAcceleration, currentTime, nextTime, request) {
  const epsilon = pairConstraintTimeEpsilon(request);
  const constraints = sortedPairConstraintsForPath(request, state.pathKey);
  const dt = nextTime - currentTime;
  if (constraints.length === 0 || dt <= epsilon) {
    return { acceleration: physicalAcceleration, guidanceCorrectionMagnitude: 0, guided: false };
  }
  const initialState = request.initialStates.find((candidate) => candidate.pathKey === state.pathKey);
  const firstTangent = initialState?.initialVelocity ?? state.velocity;
  const targetPosition = pairConstraintHermitePositionAtTime(constraints, firstTangent, nextTime, epsilon, request);
  if (!targetPosition) {
    return { acceleration: physicalAcceleration, guidanceCorrectionMagnitude: 0, guided: false };
  }
  const dtSquared = dt * dt;
  const requiredTotalAcceleration = {
    x: (targetPosition.x - state.position.x - state.velocity.x * dt) / dtSquared,
    y: (targetPosition.y - state.position.y - state.velocity.y * dt) / dtSquared,
    z: (targetPosition.z - state.position.z - state.velocity.z * dt) / dtSquared,
  };
  const correction = {
    x: requiredTotalAcceleration.x - physicalAcceleration.x,
    y: requiredTotalAcceleration.y - physicalAcceleration.y,
    z: requiredTotalAcceleration.z - physicalAcceleration.z,
  };
  return {
    acceleration: requiredTotalAcceleration,
    guidanceCorrectionMagnitude: vectorNorm(correction),
    guided: true,
  };
}

function computePairInteractionAccelerations(states, request) {
  return states.map((state, index) =>
    computePairInteractionAccelerationFromSources(
      state,
      states.filter((_, otherIndex) => otherIndex !== index),
      request,
    )
  );
}

function computePairInteractionAccelerationFromSources(state, sourceStates, request) {
  const factor = request.pairAccelerationScale / Math.max(request.duration * request.duration, 1e-12);
  const softeningSquared = request.softening * request.softening;
  const acceleration = { x: 0, y: 0, z: 0 };
  sourceStates.forEach((other) => {
    const dx = other.position.x - state.position.x;
    const dy = other.position.y - state.position.y;
    const dz = other.position.z - state.position.z;
    const distanceSquared = dx * dx + dy * dy + dz * dz + softeningSquared;
    const attractionSign = state.charge * other.charge <= 0 ? 1 : -1;
    const strength = (factor * attractionSign * Math.abs(other.charge)) / state.mass;
    const attenuation = request.interactionLaw === "inverse_distance_pair_attraction_v1"
      ? 1 / Math.max(Math.sqrt(distanceSquared), 1e-12)
      : 1;
    acceleration.x += dx * strength * attenuation;
    acceleration.y += dy * strength * attenuation;
    acceleration.z += dz * strength * attenuation;
  });
  return acceleration;
}

function pairInteractionUsesFixedSignalSpeed(request) {
  const signalSpeed = Number(request?.signalSpeed);
  return Number.isFinite(signalSpeed) && signalSpeed > 0;
}

function pairInteractionPairLawResidualMode(request) {
  return pairInteractionUsesFixedSignalSpeed(request)
    ? PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_CAUSAL_DELAY_PAIR_LAW
    : PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_SAME_TIME_PAIR_LAW;
}

function pairInteractionLawAccelerationForFrame(frames, request, currentFrame) {
  if (!currentFrame) {
    return null;
  }
  if (!pairInteractionUsesFixedSignalSpeed(request)) {
    const states = statesAtPairInteractionFrameIndex(
      frames,
      currentFrame.frameIndex,
      request.initialStates,
    );
    if (states.length !== request.initialStates.length) {
      return null;
    }
    const lawAccelerations = computePairInteractionAccelerations(states, request);
    const stateIndex = states.findIndex((state) => state.pathKey === currentFrame.pathKey);
    return stateIndex >= 0 ? lawAccelerations[stateIndex] ?? null : null;
  }

  const signalSpeed = Number(request.signalSpeed);
  const epsilon = pairConstraintTimeEpsilon(request);
  const receiverInitialState = request.initialStates.find(
    (candidate) => candidate.pathKey === currentFrame.pathKey,
  );
  if (!receiverInitialState) {
    return null;
  }
  const sourceStates = request.initialStates
    .filter((candidate) => candidate.pathKey !== currentFrame.pathKey)
    .map((sourceInitialState) =>
      pairInteractionDelayedSourceStateAtHitTime(
        frames,
        sourceInitialState,
        currentFrame.position,
        currentFrame.time,
        signalSpeed,
        epsilon,
      )
    )
    .filter(Boolean);
  if (sourceStates.length !== request.initialStates.length - 1) {
    return null;
  }
  const receiverState = {
    pathKey: currentFrame.pathKey,
    position: copyVector(currentFrame.position),
    velocity: copyVector(currentFrame.velocity ?? receiverInitialState.initialVelocity),
    charge: receiverInitialState.charge,
    mass: receiverInitialState.mass,
    stateFlags: currentFrame.stateFlags ?? receiverInitialState.stateFlags,
  };
  return computePairInteractionAccelerationFromSources(receiverState, sourceStates, request);
}

function pairInteractionDelayedSourceStateAtHitTime(
  frames,
  sourceInitialState,
  receiverPosition,
  hitTime,
  signalSpeed,
  epsilon,
) {
  const sourceFrames = frames
    .filter((frame) => frame.pathKey === sourceInitialState.pathKey)
    .slice()
    .sort((left, right) => left.time - right.time || left.frameIndex - right.frameIndex);
  if (sourceFrames.length < 2) {
    return null;
  }
  const lowerTime = sourceFrames[0].time;
  const upperTime = Math.min(hitTime - epsilon, sourceFrames[sourceFrames.length - 1].time);
  if (upperTime < lowerTime - epsilon) {
    return null;
  }
  const residualAt = (time) => {
    const sourceState = pairInteractionFrameStateAtTime(
      sourceFrames,
      sourceInitialState,
      time,
      epsilon,
    );
    if (!sourceState) {
      return null;
    }
    const distance = vectorNorm(vectorSubtract(receiverPosition, sourceState.position));
    const residual = distance - signalSpeed * (hitTime - time);
    return Number.isFinite(residual) ? { time, residual, sourceState } : null;
  };
  const rootTolerance = Math.max(epsilon * signalSpeed, 1e-9);
  let bestRoot = null;
  let bestAbsResidual = Number.POSITIVE_INFINITY;
  const considerRoot = (candidate) => {
    if (!candidate) {
      return;
    }
    const absResidual = Math.abs(candidate.residual);
    if (
      absResidual < bestAbsResidual ||
      (Math.abs(absResidual - bestAbsResidual) <= rootTolerance &&
        (!bestRoot || candidate.time > bestRoot.time))
    ) {
      bestRoot = candidate;
      bestAbsResidual = absResidual;
    }
  };

  for (let index = 0; index + 1 < sourceFrames.length; index += 1) {
    const segmentStart = Math.max(lowerTime, sourceFrames[index].time);
    const segmentEnd = Math.min(upperTime, sourceFrames[index + 1].time);
    if (segmentEnd < segmentStart - epsilon) {
      continue;
    }
    const subdivisionCount = 8;
    let previous = residualAt(segmentStart);
    considerRoot(previous);
    for (let subdivision = 1; subdivision <= subdivisionCount; subdivision += 1) {
      const time = segmentStart + (segmentEnd - segmentStart) * (subdivision / subdivisionCount);
      const current = residualAt(time);
      considerRoot(current);
      if (previous && current && previous.residual * current.residual <= 0) {
        considerRoot(
          bisectPairConstraintDelayedSourceRoot(residualAt, previous.time, current.time, epsilon),
        );
      }
      previous = current;
    }
  }

  if (!bestRoot || bestAbsResidual > rootTolerance) {
    return null;
  }
  return bestRoot.sourceState;
}

function pairInteractionFrameStateAtTime(sourceFrames, sourceInitialState, time, epsilon) {
  const exact = sourceFrames.find((frame) => Math.abs(frame.time - time) <= epsilon);
  if (exact) {
    return {
      pathKey: sourceInitialState.pathKey,
      position: copyVector(exact.position),
      velocity: copyVector(exact.velocity ?? sourceInitialState.initialVelocity),
      charge: sourceInitialState.charge,
      mass: sourceInitialState.mass,
      stateFlags: exact.stateFlags ?? sourceInitialState.stateFlags,
    };
  }
  if (
    time < sourceFrames[0].time - epsilon ||
    time > sourceFrames[sourceFrames.length - 1].time + epsilon
  ) {
    return null;
  }
  const rightIndex = sourceFrames.findIndex((frame) => frame.time >= time);
  if (rightIndex <= 0) {
    return null;
  }
  const left = sourceFrames[rightIndex - 1];
  const right = sourceFrames[rightIndex];
  const span = right.time - left.time;
  if (span <= epsilon) {
    return null;
  }
  const amount = Math.max(0, Math.min(1, (time - left.time) / span));
  const lerp = (leftValue, rightValue) => leftValue + (rightValue - leftValue) * amount;
  return {
    pathKey: sourceInitialState.pathKey,
    position: {
      x: lerp(left.position.x, right.position.x),
      y: lerp(left.position.y, right.position.y),
      z: lerp(left.position.z, right.position.z),
    },
    velocity: {
      x: lerp(left.velocity?.x ?? sourceInitialState.initialVelocity.x, right.velocity?.x ?? sourceInitialState.initialVelocity.x),
      y: lerp(left.velocity?.y ?? sourceInitialState.initialVelocity.y, right.velocity?.y ?? sourceInitialState.initialVelocity.y),
      z: lerp(left.velocity?.z ?? sourceInitialState.initialVelocity.z, right.velocity?.z ?? sourceInitialState.initialVelocity.z),
    },
    charge: sourceInitialState.charge,
    mass: sourceInitialState.mass,
    stateFlags: left.stateFlags ?? sourceInitialState.stateFlags,
  };
}

function pairInteractionLawSelfDerivativeComponent(states, request, stateIndex, component) {
  return pairInteractionLawPositionDerivativeComponent(
    states,
    request,
    stateIndex,
    stateIndex,
    component,
    component,
  );
}

function pairInteractionLawPositionDerivativeComponent(
  states,
  request,
  accelerationStateIndex,
  positionStateIndex,
  accelerationComponent,
  positionComponent,
) {
  const state = states[accelerationStateIndex];
  if (!state || positionStateIndex < 0 || positionStateIndex >= states.length) {
    return null;
  }
  const factor = request.pairAccelerationScale / Math.max(request.duration * request.duration, 1e-12);
  const softeningSquared = request.softening * request.softening;
  let derivative = 0;
  for (let otherIndex = 0; otherIndex < states.length; otherIndex += 1) {
    if (otherIndex === accelerationStateIndex) {
      continue;
    }
    const other = states[otherIndex];
    const deltaSign = positionStateIndex === otherIndex ? 1 : positionStateIndex === accelerationStateIndex ? -1 : 0;
    if (deltaSign === 0) {
      continue;
    }
    const delta = {
      x: other.position.x - state.position.x,
      y: other.position.y - state.position.y,
      z: other.position.z - state.position.z,
    };
    const distanceSquared = delta.x * delta.x + delta.y * delta.y + delta.z * delta.z + softeningSquared;
    const attractionSign = state.charge * other.charge <= 0 ? 1 : -1;
    const strength = (factor * attractionSign * Math.abs(other.charge)) / state.mass;
    const sameComponent = accelerationComponent === positionComponent ? 1 : 0;
    if (request.interactionLaw === "inverse_distance_pair_attraction_v1") {
      const radius = Math.max(Math.sqrt(distanceSquared), 1e-12);
      derivative += strength * deltaSign * (
        sameComponent / radius -
        (delta[accelerationComponent] * delta[positionComponent]) / (radius * radius * radius)
      );
    } else {
      derivative += strength * deltaSign * sameComponent;
    }
  }
  return Number.isFinite(derivative) ? derivative : null;
}

function summarizePairInteractionConstraintResiduals(frames, request) {
  const constraints = request.pathConstraints ?? [];
  const summary = {
    pathConstraintCount: constraints.length,
    pathConstraintResidualSampleCount: 0,
    maxPathConstraintResidual: 0,
    meanPathConstraintResidual: 0,
    rmsPathConstraintResidual: 0,
  };
  if (constraints.length === 0) {
    return summary;
  }

  const pathKeys = Array.from(new Set(constraints.map((constraint) => constraint.pathKey)));
  let residualSum = 0;
  let residualSquaredSum = 0;
  let sampleCount = 0;

  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .filter((frame) => frame.pathKey === pathKey)
      .slice()
      .sort((left, right) => left.time - right.time || left.frameIndex - right.frameIndex);
    if (pathFrames.length < 3) {
      return;
    }

    for (let index = 1; index + 1 < pathFrames.length; index += 1) {
      const previous = pathFrames[index - 1];
      const current = pathFrames[index];
      const next = pathFrames[index + 1];
      const leftDt = current.time - previous.time;
      const rightDt = next.time - current.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= 0 || rightDt <= 0 || averageDt <= 0) {
        continue;
      }

      const leftVelocity = scalePairResidualVector(vectorSubtract(current.position, previous.position), 1 / leftDt);
      const rightVelocity = scalePairResidualVector(vectorSubtract(next.position, current.position), 1 / rightDt);
      const finiteDifferenceAcceleration = scalePairResidualVector(
        vectorSubtract(rightVelocity, leftVelocity),
        1 / averageDt
      );
      const states = statesAtPairInteractionFrameIndex(frames, current.frameIndex, request.initialStates);
      const lawAccelerations = computePairInteractionAccelerations(states, request);
      const stateIndex = states.findIndex((state) => state.pathKey === pathKey);
      if (stateIndex < 0 || !lawAccelerations[stateIndex]) {
        continue;
      }
      const residual = vectorNorm(vectorSubtract(finiteDifferenceAcceleration, lawAccelerations[stateIndex]));
      if (!Number.isFinite(residual)) {
        continue;
      }
      summary.maxPathConstraintResidual = Math.max(summary.maxPathConstraintResidual, residual);
      residualSum += residual;
      residualSquaredSum += residual * residual;
      sampleCount += 1;
    }
  });

  summary.pathConstraintResidualSampleCount = sampleCount;
  if (sampleCount > 0) {
    summary.meanPathConstraintResidual = residualSum / sampleCount;
    summary.rmsPathConstraintResidual = Math.sqrt(residualSquaredSum / sampleCount);
  }
  return summary;
}

function summarizePairInteractionConstraintPositionResiduals(frames, request) {
  const constraints = request.pathConstraints ?? [];
  const summary = {
    pathConstraintPositionResidualSampleCount: 0,
    maxPathConstraintPositionResidual: 0,
    meanPathConstraintPositionResidual: 0,
    rmsPathConstraintPositionResidual: 0,
  };
  if (constraints.length === 0) {
    return summary;
  }

  const epsilon = pairConstraintTimeEpsilon(request);
  let residualSum = 0;
  let residualSquaredSum = 0;
  let sampleCount = 0;
  constraints.forEach((constraint) => {
    const frame = frames.find((candidate) =>
      candidate.pathKey === constraint.pathKey &&
      Math.abs(candidate.time - constraint.time) <= epsilon
    );
    if (!frame) {
      return;
    }
    const residual = vectorNorm(vectorSubtract(frame.position, constraint.position));
    if (!Number.isFinite(residual)) {
      return;
    }
    summary.maxPathConstraintPositionResidual = Math.max(
      summary.maxPathConstraintPositionResidual,
      residual,
    );
    residualSum += residual;
    residualSquaredSum += residual * residual;
    sampleCount += 1;
  });

  summary.pathConstraintPositionResidualSampleCount = sampleCount;
  if (sampleCount > 0) {
    summary.meanPathConstraintPositionResidual = residualSum / sampleCount;
    summary.rmsPathConstraintPositionResidual = Math.sqrt(residualSquaredSum / sampleCount);
  }
  return summary;
}

function summarizePairInteractionInitialVelocityResiduals(frames, request) {
  const summary = {
    pathConstraintInitialVelocityResidualSampleCount: 0,
    maxPathConstraintInitialVelocityResidual: 0,
    meanPathConstraintInitialVelocityResidual: 0,
    rmsPathConstraintInitialVelocityResidual: 0,
  };
  if (!Array.isArray(frames) || frames.length === 0) {
    return summary;
  }

  let residualSum = 0;
  let residualSquaredSum = 0;
  let sampleCount = 0;
  request.initialStates.forEach((initialState) => {
    const pathFrames = frames
      .filter((frame) => frame.pathKey === initialState.pathKey)
      .slice()
      .sort((left, right) => left.time - right.time || left.frameIndex - right.frameIndex);
    if (pathFrames.length < 2) {
      return;
    }
    const first = pathFrames[0];
    if (!first.velocity) {
      return;
    }
    const residual = vectorNorm(
      vectorSubtract(first.velocity, initialState.initialVelocity),
    );
    if (!Number.isFinite(residual)) {
      return;
    }
    summary.maxPathConstraintInitialVelocityResidual = Math.max(
      summary.maxPathConstraintInitialVelocityResidual,
      residual,
    );
    residualSum += residual;
    residualSquaredSum += residual * residual;
    sampleCount += 1;
  });

  summary.pathConstraintInitialVelocityResidualSampleCount = sampleCount;
  if (sampleCount > 0) {
    summary.meanPathConstraintInitialVelocityResidual = residualSum / sampleCount;
    summary.rmsPathConstraintInitialVelocityResidual = Math.sqrt(
      residualSquaredSum / sampleCount,
    );
  }
  return summary;
}

function summarizePairInteractionBoundaryResiduals(request) {
  const constraints = request.pathConstraints ?? [];
  const signalSpeed = Number(request.signalSpeed);
  const useCausalDelayResidual = Number.isFinite(signalSpeed) && signalSpeed > 0;
  const summary = {
    pathConstraintBoundaryResidualSampleCount: 0,
    pathConstraintBoundaryResidualMode: useCausalDelayResidual
      ? PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_CAUSAL_DELAY_PAIR_LAW
      : PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_SAME_TIME_PAIR_LAW,
    maxPathConstraintBoundaryResidual: 0,
    meanPathConstraintBoundaryResidual: 0,
    rmsPathConstraintBoundaryResidual: 0,
  };
  if (constraints.length === 0) {
    return summary;
  }

  let residualSum = 0;
  let residualSquaredSum = 0;
  let sampleCount = 0;
  const epsilon = pairConstraintTimeEpsilon(request);
  request.initialStates.forEach((initialState) => {
    const pathConstraints = sortedPairConstraintsForPath(request, initialState.pathKey);
    if (pathConstraints.length < 3) {
      return;
    }
    for (let index = 1; index + 1 < pathConstraints.length; index += 1) {
      const previous = pathConstraints[index - 1];
      const current = pathConstraints[index];
      const next = pathConstraints[index + 1];
      const leftDt = current.time - previous.time;
      const rightDt = next.time - current.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const leftVelocity = scalePairResidualVector(vectorSubtract(current.position, previous.position), 1 / leftDt);
      const rightVelocity = scalePairResidualVector(vectorSubtract(next.position, current.position), 1 / rightDt);
      const finiteDifferenceAcceleration = scalePairResidualVector(
        vectorSubtract(rightVelocity, leftVelocity),
        1 / averageDt,
      );
      const lawAcceleration = useCausalDelayResidual
        ? pairConstraintCausalDelayLawAccelerationAtConstraint(request, current, signalSpeed, epsilon)
        : pairConstraintSameTimeLawAccelerationAtTime(request, current.pathKey, current.time);
      if (!lawAcceleration) {
        continue;
      }
      const residual = vectorNorm(vectorSubtract(finiteDifferenceAcceleration, lawAcceleration));
      if (!Number.isFinite(residual)) {
        continue;
      }
      summary.maxPathConstraintBoundaryResidual = Math.max(
        summary.maxPathConstraintBoundaryResidual,
        residual,
      );
      residualSum += residual;
      residualSquaredSum += residual * residual;
      sampleCount += 1;
    }
  });

  summary.pathConstraintBoundaryResidualSampleCount = sampleCount;
  if (sampleCount > 0) {
    summary.meanPathConstraintBoundaryResidual = residualSum / sampleCount;
    summary.rmsPathConstraintBoundaryResidual = Math.sqrt(residualSquaredSum / sampleCount);
  }
  return summary;
}

function pairConstraintSameTimeLawAccelerationAtTime(request, pathKey, time) {
  const states = statesFromPairConstraintBoundaryAtTime(request, time);
  if (states.length !== request.initialStates.length) {
    return null;
  }
  const lawAccelerations = computePairInteractionAccelerations(states, request);
  const stateIndex = states.findIndex((state) => state.pathKey === pathKey);
  return stateIndex >= 0 ? lawAccelerations[stateIndex] ?? null : null;
}

function pairConstraintCausalDelayLawAccelerationAtConstraint(request, receiverConstraint, signalSpeed, epsilon) {
  const receiverInitialState = request.initialStates.find(
    (candidate) => candidate.pathKey === receiverConstraint.pathKey,
  );
  if (!receiverInitialState || !Number.isFinite(signalSpeed) || signalSpeed <= 0) {
    return null;
  }
  const sourceStates = request.initialStates
    .filter((candidate) => candidate.pathKey !== receiverConstraint.pathKey)
    .map((sourceInitialState) =>
      pairConstraintDelayedSourceStateAtHitTime(
        request,
        sourceInitialState,
        receiverConstraint.position,
        receiverConstraint.time,
        signalSpeed,
        epsilon,
      )
    )
    .filter(Boolean);
  if (sourceStates.length !== request.initialStates.length - 1) {
    return null;
  }
  const receiverState = {
    pathKey: receiverInitialState.pathKey,
    position: copyVector(receiverConstraint.position),
    velocity: { x: 0, y: 0, z: 0 },
    charge: receiverInitialState.charge,
    mass: receiverInitialState.mass,
    stateFlags: receiverInitialState.stateFlags,
  };
  return computePairInteractionAccelerationFromSources(receiverState, sourceStates, request);
}

function pairConstraintDelayedSourceStateAtHitTime(
  request,
  sourceInitialState,
  receiverPosition,
  hitTime,
  signalSpeed,
  epsilon,
) {
  const constraints = sortedPairConstraintsForPath(request, sourceInitialState.pathKey);
  if (constraints.length < 2) {
    return null;
  }
  const lowerTime = constraints[0].time;
  const upperTime = Math.min(hitTime - epsilon, constraints[constraints.length - 1].time);
  if (upperTime < lowerTime - epsilon) {
    return null;
  }
  const residualAt = (time) => {
    const sourcePosition = pairConstraintHermitePositionAtTime(
      constraints,
      sourceInitialState.initialVelocity,
      time,
      epsilon,
      request,
    );
    if (!sourcePosition) {
      return null;
    }
    const distance = vectorNorm(vectorSubtract(receiverPosition, sourcePosition));
    const residual = distance - signalSpeed * (hitTime - time);
    return Number.isFinite(residual) ? { time, residual, sourcePosition } : null;
  };
  const rootTolerance = Math.max(epsilon * signalSpeed, 1e-9);
  let bestRoot = null;
  let bestAbsResidual = Number.POSITIVE_INFINITY;
  const considerRoot = (candidate) => {
    if (!candidate) {
      return;
    }
    const absResidual = Math.abs(candidate.residual);
    if (
      absResidual < bestAbsResidual ||
      (Math.abs(absResidual - bestAbsResidual) <= rootTolerance &&
        (!bestRoot || candidate.time > bestRoot.time))
    ) {
      bestRoot = candidate;
      bestAbsResidual = absResidual;
    }
  };

  for (let constraintIndex = 0; constraintIndex + 1 < constraints.length; constraintIndex += 1) {
    const segmentStart = Math.max(lowerTime, constraints[constraintIndex].time);
    const segmentEnd = Math.min(upperTime, constraints[constraintIndex + 1].time);
    if (segmentEnd < segmentStart - epsilon) {
      continue;
    }
    const subdivisionCount = 8;
    let previous = residualAt(segmentStart);
    considerRoot(previous);
    for (let subdivision = 1; subdivision <= subdivisionCount; subdivision += 1) {
      const time = segmentStart + (segmentEnd - segmentStart) * (subdivision / subdivisionCount);
      const current = residualAt(time);
      considerRoot(current);
      if (previous && current && previous.residual * current.residual <= 0) {
        considerRoot(
          bisectPairConstraintDelayedSourceRoot(residualAt, previous.time, current.time, epsilon),
        );
      }
      previous = current;
    }
  }

  if (!bestRoot || bestAbsResidual > rootTolerance) {
    return null;
  }
  return {
    pathKey: sourceInitialState.pathKey,
    position: copyVector(bestRoot.sourcePosition),
    velocity: { x: 0, y: 0, z: 0 },
    charge: sourceInitialState.charge,
    mass: sourceInitialState.mass,
    stateFlags: sourceInitialState.stateFlags,
  };
}

function bisectPairConstraintDelayedSourceRoot(residualAt, leftTime, rightTime, epsilon) {
  let left = residualAt(leftTime);
  let right = residualAt(rightTime);
  if (!left || !right) {
    return null;
  }
  if (Math.abs(left.residual) <= Math.abs(right.residual) && Math.abs(left.residual) <= epsilon) {
    return left;
  }
  if (Math.abs(right.residual) <= epsilon) {
    return right;
  }
  for (let iteration = 0; iteration < 48 && rightTime - leftTime > epsilon; iteration += 1) {
    const midTime = 0.5 * (leftTime + rightTime);
    const mid = residualAt(midTime);
    if (!mid) {
      break;
    }
    if (Math.abs(mid.residual) <= epsilon) {
      return mid;
    }
    if (left.residual * mid.residual <= 0) {
      right = mid;
      rightTime = midTime;
    } else {
      left = mid;
      leftTime = midTime;
    }
  }
  return Math.abs(left.residual) <= Math.abs(right.residual) ? left : right;
}

function summarizePairInteractionBoundaryRelaxationResiduals(frames, request) {
  const summary = {
    pathConstraintBoundaryRelaxationResidualSampleCount: 0,
    pathConstraintBoundaryRelaxationResidualMode: pairInteractionPairLawResidualMode(request),
    maxPathConstraintBoundaryRelaxationResidual: 0,
    meanPathConstraintBoundaryRelaxationResidual: 0,
    rmsPathConstraintBoundaryRelaxationResidual: 0,
  };
  if (!Array.isArray(frames) || frames.length === 0 || (request.pathConstraints ?? []).length === 0) {
    return summary;
  }

  const epsilon = pairConstraintTimeEpsilon(request);
  let residualSum = 0;
  let residualSquaredSum = 0;
  const pathKeys = Array.from(new Set(frames.map((frame) => frame.pathKey))).sort((left, right) => left - right);
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .filter((frame) => frame.pathKey === pathKey)
      .sort((left, right) => left.time - right.time || left.frameIndex - right.frameIndex);
    for (let index = 1; index + 1 < pathFrames.length; index += 1) {
      const previous = pathFrames[index - 1];
      const current = pathFrames[index];
      const next = pathFrames[index + 1];
      if (hasPairConstraintAtTime(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const leftDt = current.time - previous.time;
      const rightDt = next.time - current.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const leftVelocity = scalePairResidualVector(vectorSubtract(current.position, previous.position), 1 / leftDt);
      const rightVelocity = scalePairResidualVector(vectorSubtract(next.position, current.position), 1 / rightDt);
      const finiteDifferenceAcceleration = scalePairResidualVector(
        vectorSubtract(rightVelocity, leftVelocity),
        1 / averageDt,
      );
      const lawAcceleration = pairInteractionLawAccelerationForFrame(frames, request, current);
      if (!lawAcceleration) {
        continue;
      }
      const residual = vectorNorm(vectorSubtract(finiteDifferenceAcceleration, lawAcceleration));
      if (!Number.isFinite(residual)) {
        continue;
      }
      summary.maxPathConstraintBoundaryRelaxationResidual = Math.max(
        summary.maxPathConstraintBoundaryRelaxationResidual,
        residual,
      );
      residualSum += residual;
      residualSquaredSum += residual * residual;
      summary.pathConstraintBoundaryRelaxationResidualSampleCount += 1;
    }
  });
  const sampleCount = summary.pathConstraintBoundaryRelaxationResidualSampleCount;
  if (sampleCount > 0) {
    summary.meanPathConstraintBoundaryRelaxationResidual = residualSum / sampleCount;
    summary.rmsPathConstraintBoundaryRelaxationResidual = Math.sqrt(residualSquaredSum / sampleCount);
  }
  return summary;
}

function pairInteractionBoundaryRelaxationResidualVectorEntries(frames, request) {
  const residuals = new Map();
  if (!Array.isArray(frames) || frames.length === 0 || (request.pathConstraints ?? []).length === 0) {
    return residuals;
  }

  const epsilon = pairConstraintTimeEpsilon(request);
  const pathKeys = Array.from(new Set(frames.map((frame) => frame.pathKey))).sort((left, right) => left - right);
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    for (let pathIndex = 1; pathIndex + 1 < pathFrames.length; pathIndex += 1) {
      const previous = pathFrames[pathIndex - 1].frame;
      const current = pathFrames[pathIndex].frame;
      const next = pathFrames[pathIndex + 1].frame;
      if (hasPairConstraintAtTime(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const residual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
        frames,
        request,
        previous,
        current,
        next,
        epsilon,
      );
      if (residual) {
        residuals.set(pathFrames[pathIndex].index, residual);
      }
    }
  });
  return residuals;
}

function pairInteractionBoundaryRelaxationResidualVectorForFrames(
  frames,
  request,
  previous,
  current,
  next,
  epsilon,
) {
  const leftDt = current.time - previous.time;
  const rightDt = next.time - current.time;
  const averageDt = 0.5 * (leftDt + rightDt);
  if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
    return null;
  }
  const leftVelocity = scalePairResidualVector(vectorSubtract(current.position, previous.position), 1 / leftDt);
  const rightVelocity = scalePairResidualVector(vectorSubtract(next.position, current.position), 1 / rightDt);
  const finiteDifferenceAcceleration = scalePairResidualVector(
    vectorSubtract(rightVelocity, leftVelocity),
    1 / averageDt,
  );
  const lawAcceleration = pairInteractionLawAccelerationForFrame(frames, request, current);
  if (!lawAcceleration) {
    return null;
  }
  const residual = vectorSubtract(finiteDifferenceAcceleration, lawAcceleration);
  return (
    Number.isFinite(residual.x) &&
    Number.isFinite(residual.y) &&
    Number.isFinite(residual.z)
  )
    ? residual
    : null;
}

function sortedPairConstraintsForPath(request, pathKey) {
  return (request.pathConstraints ?? [])
    .filter((constraint) => constraint.pathKey === pathKey)
    .slice()
    .sort((left, right) => left.time - right.time || left.depth - right.depth);
}

function statesFromPairConstraintsAtTime(request, time) {
  return request.initialStates
    .map((initialState) => {
      const position = pairConstraintPositionAtTime(
        sortedPairConstraintsForPath(request, initialState.pathKey),
        time,
        pairConstraintTimeEpsilon(request),
      );
      if (!position) {
        return null;
      }
      return {
        pathKey: initialState.pathKey,
        position,
        velocity: { x: 0, y: 0, z: 0 },
        charge: initialState.charge,
        mass: initialState.mass,
        stateFlags: initialState.stateFlags,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.pathKey - right.pathKey);
}

function statesFromPairConstraintBoundaryAtTime(request, time) {
  const epsilon = pairConstraintTimeEpsilon(request);
  return request.initialStates
    .map((initialState) => {
      const constraints = sortedPairConstraintsForPath(request, initialState.pathKey);
      const position = pairConstraintHermitePositionAtTime(
        constraints,
        initialState.initialVelocity,
        time,
        epsilon,
        request,
      );
      if (!position) {
        return null;
      }
      return {
        pathKey: initialState.pathKey,
        position,
        velocity: { x: 0, y: 0, z: 0 },
        charge: initialState.charge,
        mass: initialState.mass,
        stateFlags: initialState.stateFlags,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.pathKey - right.pathKey);
}

function solveTridiagonalSystem(lower, diagonal, upper, rhs) {
  const count = diagonal.length;
  if (count === 0) {
    return [];
  }
  const cPrime = new Array(count).fill(0);
  const dPrime = new Array(count).fill(0);
  const solution = new Array(count).fill(0);
  let pivot = diagonal[0];
  if (!Number.isFinite(pivot) || Math.abs(pivot) <= Number.EPSILON) {
    return null;
  }
  cPrime[0] = count > 1 ? upper[0] / pivot : 0;
  dPrime[0] = rhs[0] / pivot;
  for (let index = 1; index < count; index += 1) {
    pivot = diagonal[index] - lower[index] * cPrime[index - 1];
    if (!Number.isFinite(pivot) || Math.abs(pivot) <= Number.EPSILON) {
      return null;
    }
    cPrime[index] = index + 1 < count ? upper[index] / pivot : 0;
    dPrime[index] = (rhs[index] - lower[index] * dPrime[index - 1]) / pivot;
  }
  solution[count - 1] = dPrime[count - 1];
  for (let index = count - 2; index >= 0; index -= 1) {
    solution[index] = dPrime[index] - cPrime[index] * solution[index + 1];
  }
  return solution.every(Number.isFinite) ? solution : null;
}

function pairInteractionLawAccelerationAtFrame(frames, frameIndex, request, pathKey) {
  const currentFrame = frames.find(
    (frame) => frame.frameIndex === frameIndex && frame.pathKey === pathKey,
  );
  return pairInteractionLawAccelerationForFrame(frames, request, currentFrame);
}

function blendPairInteractionLawAcceleration(primary, secondary, secondaryWeight) {
  if (!primary) {
    return null;
  }
  if (!secondary) {
    return primary;
  }
  const weight = Number.isFinite(secondaryWeight)
    ? Math.min(1, Math.max(0, secondaryWeight))
    : 0;
  if (weight <= 0) {
    return primary;
  }
  const primaryWeight = 1 - weight;
  return {
    x: primary.x * primaryWeight + secondary.x * weight,
    y: primary.y * primaryWeight + secondary.y * weight,
    z: primary.z * primaryWeight + secondary.z * weight,
  };
}

function solvePairInteractionRelaxationBlock(
  pathFrames,
  blockStart,
  blockEnd,
  frames,
  request,
  accelerationFrames = frames,
  secondaryAccelerationFrames = null,
  secondaryAccelerationWeight = 0,
) {
  const count = blockEnd - blockStart;
  if (count <= 0) {
    return [];
  }
  const lower = new Array(count).fill(0);
  const diagonal = new Array(count).fill(0);
  const upper = new Array(count).fill(0);
  const rhsX = new Array(count).fill(0);
  const rhsY = new Array(count).fill(0);
  const rhsZ = new Array(count).fill(0);
  for (let blockIndex = 0; blockIndex < count; blockIndex += 1) {
    const pathIndex = blockStart + blockIndex;
    const previous = pathFrames[pathIndex - 1].frame;
    const current = pathFrames[pathIndex].frame;
    const next = pathFrames[pathIndex + 1].frame;
    const leftDt = current.time - previous.time;
    const rightDt = next.time - current.time;
    if (leftDt <= pairConstraintTimeEpsilon(request) || rightDt <= pairConstraintTimeEpsilon(request)) {
      return [];
    }
    const primaryAcceleration = pairInteractionLawAccelerationAtFrame(
      accelerationFrames,
      current.frameIndex,
      request,
      current.pathKey,
    );
    const secondaryAcceleration = secondaryAccelerationFrames
      ? pairInteractionLawAccelerationAtFrame(
          secondaryAccelerationFrames,
          current.frameIndex,
          request,
          current.pathKey,
        )
      : null;
    const acceleration = blendPairInteractionLawAcceleration(
      primaryAcceleration,
      secondaryAcceleration,
      secondaryAccelerationWeight,
    );
    if (!acceleration) {
      return [];
    }
    const leftCoefficient = 1 / leftDt;
    const rightCoefficient = 1 / rightDt;
    diagonal[blockIndex] = leftCoefficient + rightCoefficient;
    const accelerationScale = (leftDt + rightDt) * 0.5;
    rhsX[blockIndex] = -acceleration.x * accelerationScale;
    rhsY[blockIndex] = -acceleration.y * accelerationScale;
    rhsZ[blockIndex] = -acceleration.z * accelerationScale;
    if (blockIndex > 0) {
      lower[blockIndex] = -leftCoefficient;
    } else {
      rhsX[blockIndex] += previous.position.x * leftCoefficient;
      rhsY[blockIndex] += previous.position.y * leftCoefficient;
      rhsZ[blockIndex] += previous.position.z * leftCoefficient;
    }
    if (blockIndex + 1 < count) {
      upper[blockIndex] = -rightCoefficient;
    } else {
      rhsX[blockIndex] += next.position.x * rightCoefficient;
      rhsY[blockIndex] += next.position.y * rightCoefficient;
      rhsZ[blockIndex] += next.position.z * rightCoefficient;
    }
  }
  const solvedX = solveTridiagonalSystem(lower, diagonal, upper, rhsX);
  const solvedY = solveTridiagonalSystem(lower, diagonal, upper, rhsY);
  const solvedZ = solveTridiagonalSystem(lower, diagonal, upper, rhsZ);
  if (!solvedX || !solvedY || !solvedZ) {
    return [];
  }
  return solvedX.map((x, index) => ({ x, y: solvedY[index], z: solvedZ[index] }));
}

function solvePairInteractionDefectCorrectionBlock(
  pathFrames,
  blockStart,
  blockEnd,
  frames,
  request,
  accelerationFrames = frames,
) {
  const count = blockEnd - blockStart;
  if (count <= 0) {
    return [];
  }
  const lower = new Array(count).fill(0);
  const diagonal = new Array(count).fill(0);
  const upper = new Array(count).fill(0);
  const rhsX = new Array(count).fill(0);
  const rhsY = new Array(count).fill(0);
  const rhsZ = new Array(count).fill(0);
  for (let blockIndex = 0; blockIndex < count; blockIndex += 1) {
    const pathIndex = blockStart + blockIndex;
    const previous = pathFrames[pathIndex - 1].frame;
    const current = pathFrames[pathIndex].frame;
    const next = pathFrames[pathIndex + 1].frame;
    const leftDt = current.time - previous.time;
    const rightDt = next.time - current.time;
    const averageDt = 0.5 * (leftDt + rightDt);
    if (
      leftDt <= pairConstraintTimeEpsilon(request) ||
      rightDt <= pairConstraintTimeEpsilon(request) ||
      averageDt <= pairConstraintTimeEpsilon(request)
    ) {
      return [];
    }
    const leftVelocity = scalePairResidualVector(vectorSubtract(current.position, previous.position), 1 / leftDt);
    const rightVelocity = scalePairResidualVector(vectorSubtract(next.position, current.position), 1 / rightDt);
    const finiteDifferenceAcceleration = scalePairResidualVector(
      vectorSubtract(rightVelocity, leftVelocity),
      1 / averageDt,
    );
    const acceleration = pairInteractionLawAccelerationAtFrame(
      accelerationFrames,
      current.frameIndex,
      request,
      current.pathKey,
    );
    if (!acceleration) {
      return [];
    }
    const residual = vectorSubtract(finiteDifferenceAcceleration, acceleration);
    const leftCoefficient = 1 / leftDt;
    const rightCoefficient = 1 / rightDt;
    diagonal[blockIndex] = leftCoefficient + rightCoefficient;
    if (blockIndex > 0) {
      lower[blockIndex] = -leftCoefficient;
    }
    if (blockIndex + 1 < count) {
      upper[blockIndex] = -rightCoefficient;
    }
    rhsX[blockIndex] = residual.x * averageDt;
    rhsY[blockIndex] = residual.y * averageDt;
    rhsZ[blockIndex] = residual.z * averageDt;
  }
  const solvedX = solveTridiagonalSystem(lower, diagonal, upper, rhsX);
  const solvedY = solveTridiagonalSystem(lower, diagonal, upper, rhsY);
  const solvedZ = solveTridiagonalSystem(lower, diagonal, upper, rhsZ);
  if (!solvedX || !solvedY || !solvedZ) {
    return [];
  }
  return solvedX
    .map((x, index) => {
      const current = pathFrames[blockStart + index].frame;
      return {
        x: current.position.x + x,
        y: current.position.y + solvedY[index],
        z: current.position.z + solvedZ[index],
      };
    })
    .filter((position) => (
      Number.isFinite(position.x) &&
      Number.isFinite(position.y) &&
      Number.isFinite(position.z)
    ));
}

function buildPairInteractionRelaxationCandidate(
  frames,
  request,
  pathKeys,
  epsilon,
  accelerationFrames = frames,
  secondaryAccelerationFrames = null,
  secondaryAccelerationWeight = 0,
) {
  const nextPositions = new Map();
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    let pathIndex = 1;
    while (pathIndex + 1 < pathFrames.length) {
      if (hasPairConstraintAtTime(request, pathFrames[pathIndex].frame.pathKey, pathFrames[pathIndex].frame.time, epsilon)) {
        pathIndex += 1;
        continue;
      }
      const blockStart = pathIndex;
      while (
        pathIndex + 1 < pathFrames.length &&
        !hasPairConstraintAtTime(request, pathFrames[pathIndex].frame.pathKey, pathFrames[pathIndex].frame.time, epsilon)
      ) {
        pathIndex += 1;
      }
      const blockEnd = pathIndex;
      const solvedPositions = solvePairInteractionRelaxationBlock(
        pathFrames,
        blockStart,
        blockEnd,
        frames,
        request,
        accelerationFrames,
        secondaryAccelerationFrames,
        secondaryAccelerationWeight,
      );
      if (solvedPositions.length !== blockEnd - blockStart) {
        continue;
      }
      for (let solvedIndex = 0; solvedIndex < solvedPositions.length; solvedIndex += 1) {
        const position = solvedPositions[solvedIndex];
        if (!Number.isFinite(position.x) || !Number.isFinite(position.y) || !Number.isFinite(position.z)) {
          continue;
        }
        nextPositions.set(pathFrames[blockStart + solvedIndex].index, position);
      }
    }
  });
  return nextPositions;
}

function buildPairInteractionDefectCorrectionCandidate(frames, request, pathKeys, epsilon, accelerationFrames = frames) {
  const nextPositions = new Map();
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    let pathIndex = 1;
    while (pathIndex + 1 < pathFrames.length) {
      if (hasPairConstraintAtTime(request, pathFrames[pathIndex].frame.pathKey, pathFrames[pathIndex].frame.time, epsilon)) {
        pathIndex += 1;
        continue;
      }
      const blockStart = pathIndex;
      while (
        pathIndex + 1 < pathFrames.length &&
        !hasPairConstraintAtTime(request, pathFrames[pathIndex].frame.pathKey, pathFrames[pathIndex].frame.time, epsilon)
      ) {
        pathIndex += 1;
      }
      const blockEnd = pathIndex;
      const solvedPositions = solvePairInteractionDefectCorrectionBlock(
        pathFrames,
        blockStart,
        blockEnd,
        frames,
        request,
        accelerationFrames,
      );
      if (solvedPositions.length !== blockEnd - blockStart) {
        continue;
      }
      for (let solvedIndex = 0; solvedIndex < solvedPositions.length; solvedIndex += 1) {
        const position = solvedPositions[solvedIndex];
        nextPositions.set(pathFrames[blockStart + solvedIndex].index, position);
      }
    }
  });
  return nextPositions;
}

function buildPairInteractionLinearizedDefectCorrectionCandidate(frames, request, defectCorrectionPositions) {
  if (!(defectCorrectionPositions instanceof Map) || defectCorrectionPositions.size === 0) {
    return new Map();
  }
  const baselineResiduals = pairInteractionBoundaryRelaxationResidualVectorEntries(frames, request);
  if (baselineResiduals.size === 0) {
    return new Map();
  }
  const probeFactor = 0.25;
  const probeFrames = clonePairInteractionFramesForRelaxation(frames);
  if (!applyPairInteractionRelaxationPositions(probeFrames, defectCorrectionPositions, probeFactor)) {
    return new Map();
  }
  const probeResiduals = pairInteractionBoundaryRelaxationResidualVectorEntries(probeFrames, request);
  let numerator = 0;
  let denominator = 0;
  baselineResiduals.forEach((baselineResidual, frameIndex) => {
    const probeResidual = probeResiduals.get(frameIndex);
    if (!probeResidual) {
      return;
    }
    const derivative = scalePairResidualVector(
      vectorSubtract(probeResidual, baselineResidual),
      1 / probeFactor,
    );
    if (
      !Number.isFinite(derivative.x) ||
      !Number.isFinite(derivative.y) ||
      !Number.isFinite(derivative.z)
    ) {
      return;
    }
    numerator += vectorDot(baselineResidual, derivative);
    denominator += vectorDot(derivative, derivative);
  });
  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    denominator <= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return new Map();
  }
  const targetScale = Math.min(2, Math.max(0, -numerator / denominator));
  if (
    !Number.isFinite(targetScale) ||
    targetScale <= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return new Map();
  }
  const epsilon = pairConstraintTimeEpsilon(request);
  const nextPositions = new Map();
  defectCorrectionPositions.forEach((position, frameIndex) => {
    const frame = frames[frameIndex];
    if (!frame?.position) {
      return;
    }
    const step = vectorSubtract(position, frame.position);
    const nextPosition = {
      x: frame.position.x + step.x * targetScale,
      y: frame.position.y + step.y * targetScale,
      z: frame.position.z + step.z * targetScale,
    };
    if (
      Number.isFinite(nextPosition.x) &&
      Number.isFinite(nextPosition.y) &&
      Number.isFinite(nextPosition.z) &&
      vectorNorm(vectorSubtract(nextPosition, frame.position)) > epsilon
    ) {
      nextPositions.set(frameIndex, nextPosition);
    }
  });
  return nextPositions;
}

function solveDenseLinearSystem(matrix, rhs, epsilon = 1e-12) {
  const size = rhs.length;
  if (
    size === 0 ||
    matrix.length !== size ||
    matrix.some((row) => !Array.isArray(row) || row.length !== size)
  ) {
    return null;
  }
  const rows = matrix.map((row) => row.slice());
  const values = rhs.slice();
  for (let pivotIndex = 0; pivotIndex < size; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    let pivotAbs = Math.abs(rows[pivotRow][pivotIndex]);
    for (let rowIndex = pivotIndex + 1; rowIndex < size; rowIndex += 1) {
      const candidateAbs = Math.abs(rows[rowIndex][pivotIndex]);
      if (candidateAbs > pivotAbs) {
        pivotAbs = candidateAbs;
        pivotRow = rowIndex;
      }
    }
    if (!Number.isFinite(pivotAbs) || pivotAbs <= epsilon) {
      return null;
    }
    if (pivotRow !== pivotIndex) {
      [rows[pivotIndex], rows[pivotRow]] = [rows[pivotRow], rows[pivotIndex]];
      [values[pivotIndex], values[pivotRow]] = [values[pivotRow], values[pivotIndex]];
    }
    const pivot = rows[pivotIndex][pivotIndex];
    for (let rowIndex = pivotIndex + 1; rowIndex < size; rowIndex += 1) {
      const factor = rows[rowIndex][pivotIndex] / pivot;
      if (!Number.isFinite(factor)) {
        return null;
      }
      rows[rowIndex][pivotIndex] = 0;
      for (let columnIndex = pivotIndex + 1; columnIndex < size; columnIndex += 1) {
        rows[rowIndex][columnIndex] -= factor * rows[pivotIndex][columnIndex];
      }
      values[rowIndex] -= factor * values[pivotIndex];
    }
  }

  const solution = Array(size).fill(0);
  for (let rowIndex = size - 1; rowIndex >= 0; rowIndex -= 1) {
    let value = values[rowIndex];
    for (let columnIndex = rowIndex + 1; columnIndex < size; columnIndex += 1) {
      value -= rows[rowIndex][columnIndex] * solution[columnIndex];
    }
    const diagonal = rows[rowIndex][rowIndex];
    if (!Number.isFinite(diagonal) || Math.abs(diagonal) <= epsilon) {
      return null;
    }
    solution[rowIndex] = value / diagonal;
    if (!Number.isFinite(solution[rowIndex])) {
      return null;
    }
  }
  return solution;
}

function pairInteractionConstraintBoundaryTimes(request, epsilon) {
  const times = (request.pathConstraints ?? [])
    .map((constraint) => Number(constraint.time))
    .filter(Number.isFinite)
    .sort((left, right) => left - right);
  const uniqueTimes = [];
  times.forEach((time) => {
    if (uniqueTimes.every((candidate) => Math.abs(candidate - time) > epsilon)) {
      uniqueTimes.push(time);
    }
  });
  return uniqueTimes;
}

function pairInteractionRelaxationBlockKeyForTime(boundaryTimes, time, epsilon) {
  if (!Number.isFinite(time)) {
    return null;
  }
  if (boundaryTimes.length < 2) {
    return "all";
  }
  for (let index = 0; index + 1 < boundaryTimes.length; index += 1) {
    if (time > boundaryTimes[index] + epsilon && time < boundaryTimes[index + 1] - epsilon) {
      return String(index);
    }
  }
  return null;
}

function buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
  frames,
  request,
  pathKeys,
  epsilon,
  defectCorrectionPositions,
) {
  if (pairInteractionUsesFixedSignalSpeed(request)) {
    return new Map();
  }
  const initialStates = request.initialStates ?? [];
  if (initialStates.length < 2) {
    return new Map();
  }
  const components = ["x", "y", "z"];
  const boundaryTimes = pairInteractionConstraintBoundaryTimes(request, epsilon);
  const pathFramesByKey = new Map();
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    pathFramesByKey.set(pathKey, pathFrames);
  });

  const blocks = new Map();
  pathFramesByKey.forEach((pathFrames) => {
    for (let pathIndex = 1; pathIndex + 1 < pathFrames.length; pathIndex += 1) {
      const previous = pathFrames[pathIndex - 1];
      const current = pathFrames[pathIndex];
      const next = pathFrames[pathIndex + 1];
      if (hasPairConstraintAtTime(request, current.frame.pathKey, current.frame.time, epsilon)) {
        continue;
      }
      const leftDt = current.frame.time - previous.frame.time;
      const rightDt = next.frame.time - current.frame.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const blockKey = pairInteractionRelaxationBlockKeyForTime(boundaryTimes, current.frame.time, epsilon);
      if (blockKey === null) {
        continue;
      }
      const block = blocks.get(blockKey) ?? [];
      block.push({
        ...current,
        previous,
        next,
        leftDt,
        rightDt,
        averageDt,
      });
      blocks.set(blockKey, block);
    }
  });

  const nextPositions = new Map();
  blocks.forEach((blockEntries) => {
    const blockPositions = buildPairInteractionBlockCoupledNewtonPositions(
      frames,
      request,
      blockEntries,
      components,
      epsilon,
      defectCorrectionPositions,
    );
    blockPositions.forEach((position, index) => {
      nextPositions.set(index, position);
    });
  });
  return nextPositions;
}

function buildPairInteractionBlockCoupledNewtonPositions(
  frames,
  request,
  blockEntries,
  components,
  epsilon,
  defectCorrectionPositions,
) {
  if (!Array.isArray(blockEntries) || blockEntries.length === 0) {
    return new Map();
  }
  const variableOffsetByFrameIndex = new Map();
  const entryByFrameAndPathKey = new Map();
  blockEntries.forEach((entry, variableIndex) => {
    variableOffsetByFrameIndex.set(entry.index, variableIndex * components.length);
    entryByFrameAndPathKey.set(`${entry.frame.frameIndex}:${entry.frame.pathKey}`, entry);
  });
  const dimension = blockEntries.length * components.length;
  const matrix = Array.from({ length: dimension }, () => Array(dimension).fill(0));
  const rhs = Array(dimension).fill(0);
  const stepMetadata = [];

  for (const entry of blockEntries) {
    const residual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
      frames,
      request,
      entry.previous.frame,
      entry.frame,
      entry.next.frame,
      epsilon,
    );
    if (!residual) {
      return new Map();
    }
    const states = statesAtPairInteractionFrameIndex(frames, entry.frame.frameIndex, request.initialStates);
    if (states.length !== request.initialStates.length) {
      return new Map();
    }
    const accelerationStateIndex = states.findIndex((state) => state.pathKey === entry.frame.pathKey);
    if (accelerationStateIndex < 0) {
      return new Map();
    }
    const rowOffset = variableOffsetByFrameIndex.get(entry.index);
    if (!Number.isInteger(rowOffset)) {
      return new Map();
    }
    const finiteDifferenceDerivative = -(1 / entry.leftDt + 1 / entry.rightDt) / entry.averageDt;
    const previousOffset = variableOffsetByFrameIndex.get(entry.previous.index);
    const nextOffset = variableOffsetByFrameIndex.get(entry.next.index);

    for (let accelerationComponentIndex = 0; accelerationComponentIndex < components.length; accelerationComponentIndex += 1) {
      const row = rowOffset + accelerationComponentIndex;
      const accelerationComponent = components[accelerationComponentIndex];
      rhs[row] = -residual[accelerationComponent];
      matrix[row][row] += finiteDifferenceDerivative;
      if (Number.isInteger(previousOffset)) {
        matrix[row][previousOffset + accelerationComponentIndex] += 1 / (entry.leftDt * entry.averageDt);
      }
      if (Number.isInteger(nextOffset)) {
        matrix[row][nextOffset + accelerationComponentIndex] += 1 / (entry.rightDt * entry.averageDt);
      }

      for (let positionStateIndex = 0; positionStateIndex < states.length; positionStateIndex += 1) {
        const positionEntry = entryByFrameAndPathKey.get(`${entry.frame.frameIndex}:${states[positionStateIndex].pathKey}`);
        if (!positionEntry) {
          continue;
        }
        const columnOffset = variableOffsetByFrameIndex.get(positionEntry.index);
        if (!Number.isInteger(columnOffset)) {
          continue;
        }
        for (let positionComponentIndex = 0; positionComponentIndex < components.length; positionComponentIndex += 1) {
          const positionComponent = components[positionComponentIndex];
          const accelerationDerivative = pairInteractionLawPositionDerivativeComponent(
            states,
            request,
            accelerationStateIndex,
            positionStateIndex,
            accelerationComponent,
            positionComponent,
          );
          if (accelerationDerivative === null) {
            return new Map();
          }
          matrix[row][columnOffset + positionComponentIndex] -= accelerationDerivative;
        }
      }
    }

    const defectPosition = defectCorrectionPositions instanceof Map
      ? defectCorrectionPositions.get(entry.index)
      : null;
    const defectStep = defectPosition ? vectorNorm(vectorSubtract(defectPosition, entry.frame.position)) : 0;
    const leftSpacing = vectorNorm(vectorSubtract(entry.frame.position, entry.previous.frame.position));
    const rightSpacing = vectorNorm(vectorSubtract(entry.next.frame.position, entry.frame.position));
    if (!Number.isFinite(leftSpacing) || !Number.isFinite(rightSpacing)) {
      return new Map();
    }
    const spacingLimit = Math.max(epsilon, Math.min(leftSpacing, rightSpacing) * 0.5);
    const defectLimit = Number.isFinite(defectStep) && defectStep > epsilon ? defectStep * 2 : spacingLimit;
    stepMetadata.push({
      index: entry.index,
      current: entry.frame,
      maxStep: Math.max(epsilon, Math.min(spacingLimit, defectLimit)),
    });
  }

  const solution = solveDenseLinearSystem(
    matrix,
    rhs,
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON,
  );
  if (!solution) {
    return new Map();
  }

  let stepScale = 1;
  let hasNonzeroStep = false;
  for (let variableIndex = 0; variableIndex < stepMetadata.length; variableIndex += 1) {
    const offset = variableIndex * components.length;
    const step = {
      x: solution[offset],
      y: solution[offset + 1],
      z: solution[offset + 2],
    };
    const stepNorm = vectorNorm(step);
    if (!Number.isFinite(stepNorm)) {
      return new Map();
    }
    if (stepNorm > epsilon) {
      hasNonzeroStep = true;
      stepScale = Math.min(stepScale, stepMetadata[variableIndex].maxStep / stepNorm);
    }
  }
  if (!hasNonzeroStep || !Number.isFinite(stepScale) || stepScale <= 0) {
    return new Map();
  }

  const nextPositions = new Map();
  for (let variableIndex = 0; variableIndex < stepMetadata.length; variableIndex += 1) {
    const offset = variableIndex * components.length;
    const metadata = stepMetadata[variableIndex];
    const target = {
      x: metadata.current.position.x + solution[offset] * stepScale,
      y: metadata.current.position.y + solution[offset + 1] * stepScale,
      z: metadata.current.position.z + solution[offset + 2] * stepScale,
    };
    if (
      Number.isFinite(target.x) &&
      Number.isFinite(target.y) &&
      Number.isFinite(target.z) &&
      vectorNorm(vectorSubtract(target, metadata.current.position)) > epsilon
    ) {
      nextPositions.set(metadata.index, target);
    }
  }
  return nextPositions;
}

function buildPairInteractionCoupledLocalNewtonDefectCorrectionCandidate(
  frames,
  request,
  epsilon,
  defectCorrectionPositions,
) {
  if (pairInteractionUsesFixedSignalSpeed(request)) {
    return new Map();
  }
  const initialStates = request.initialStates ?? [];
  if (initialStates.length < 2) {
    return new Map();
  }
  const components = ["x", "y", "z"];
  const nextPositions = new Map();
  const pathFramesByKey = new Map();
  const pathIndexByFrameIndex = new Map();
  frames.forEach((frame, index) => {
    const entries = pathFramesByKey.get(frame.pathKey) ?? [];
    entries.push({ frame, index });
    pathFramesByKey.set(frame.pathKey, entries);
  });
  pathFramesByKey.forEach((entries) => {
    entries.sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    entries.forEach((entry, pathIndex) => {
      pathIndexByFrameIndex.set(entry.index, pathIndex);
    });
  });

  const groupsByFrameIndex = new Map();
  frames.forEach((frame, index) => {
    const group = groupsByFrameIndex.get(frame.frameIndex) ?? [];
    group.push({ frame, index });
    groupsByFrameIndex.set(frame.frameIndex, group);
  });

  groupsByFrameIndex.forEach((group) => {
    if (group.length !== initialStates.length) {
      return;
    }
    if (group.some(({ frame }) => hasPairConstraintAtTime(request, frame.pathKey, frame.time, epsilon))) {
      return;
    }
    const states = statesAtPairInteractionFrameIndex(frames, group[0].frame.frameIndex, initialStates);
    if (states.length !== initialStates.length) {
      return;
    }
    const rows = states.map((state) => group.find(({ frame }) => frame.pathKey === state.pathKey));
    if (rows.some((row) => !row)) {
      return;
    }
    const dimension = rows.length * components.length;
    const matrix = Array.from({ length: dimension }, () => Array(dimension).fill(0));
    const rhs = Array(dimension).fill(0);
    const stepMetadata = [];

    for (let stateIndex = 0; stateIndex < rows.length; stateIndex += 1) {
      const entry = rows[stateIndex];
      const pathFrames = pathFramesByKey.get(entry.frame.pathKey) ?? [];
      const pathIndex = pathIndexByFrameIndex.get(entry.index);
      if (!Number.isInteger(pathIndex) || pathIndex <= 0 || pathIndex + 1 >= pathFrames.length) {
        return;
      }
      const previous = pathFrames[pathIndex - 1].frame;
      const current = entry.frame;
      const next = pathFrames[pathIndex + 1].frame;
      const residual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
        frames,
        request,
        previous,
        current,
        next,
        epsilon,
      );
      if (!residual) {
        return;
      }
      const leftDt = current.time - previous.time;
      const rightDt = next.time - current.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        return;
      }
      const finiteDifferenceDerivative = -(1 / leftDt + 1 / rightDt) / averageDt;
      for (let accelerationComponentIndex = 0; accelerationComponentIndex < components.length; accelerationComponentIndex += 1) {
        const row = stateIndex * components.length + accelerationComponentIndex;
        const accelerationComponent = components[accelerationComponentIndex];
        rhs[row] = -residual[accelerationComponent];
        for (let positionStateIndex = 0; positionStateIndex < rows.length; positionStateIndex += 1) {
          for (let positionComponentIndex = 0; positionComponentIndex < components.length; positionComponentIndex += 1) {
            const column = positionStateIndex * components.length + positionComponentIndex;
            const positionComponent = components[positionComponentIndex];
            const accelerationDerivative = pairInteractionLawPositionDerivativeComponent(
              states,
              request,
              stateIndex,
              positionStateIndex,
              accelerationComponent,
              positionComponent,
            );
            if (accelerationDerivative === null) {
              return;
            }
            matrix[row][column] =
              (stateIndex === positionStateIndex && accelerationComponentIndex === positionComponentIndex
                ? finiteDifferenceDerivative
                : 0) - accelerationDerivative;
          }
        }
      }

      const defectPosition = defectCorrectionPositions instanceof Map
        ? defectCorrectionPositions.get(entry.index)
        : null;
      const defectStep = defectPosition ? vectorNorm(vectorSubtract(defectPosition, current.position)) : 0;
      const leftSpacing = vectorNorm(vectorSubtract(current.position, previous.position));
      const rightSpacing = vectorNorm(vectorSubtract(next.position, current.position));
      if (!Number.isFinite(leftSpacing) || !Number.isFinite(rightSpacing)) {
        return;
      }
      const spacingLimit = Math.max(epsilon, Math.min(leftSpacing, rightSpacing) * 0.5);
      const defectLimit = Number.isFinite(defectStep) && defectStep > epsilon ? defectStep * 2 : spacingLimit;
      stepMetadata.push({
        index: entry.index,
        current,
        maxStep: Math.max(epsilon, Math.min(spacingLimit, defectLimit)),
      });
    }

    const solution = solveDenseLinearSystem(
      matrix,
      rhs,
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON,
    );
    if (!solution) {
      return;
    }
    let stepScale = 1;
    let hasNonzeroStep = false;
    for (let stateIndex = 0; stateIndex < stepMetadata.length; stateIndex += 1) {
      const offset = stateIndex * components.length;
      const step = {
        x: solution[offset],
        y: solution[offset + 1],
        z: solution[offset + 2],
      };
      const stepNorm = vectorNorm(step);
      if (!Number.isFinite(stepNorm)) {
        return;
      }
      if (stepNorm > epsilon) {
        hasNonzeroStep = true;
        stepScale = Math.min(stepScale, stepMetadata[stateIndex].maxStep / stepNorm);
      }
    }
    if (!hasNonzeroStep || !Number.isFinite(stepScale) || stepScale <= 0) {
      return;
    }
    for (let stateIndex = 0; stateIndex < stepMetadata.length; stateIndex += 1) {
      const offset = stateIndex * components.length;
      const metadata = stepMetadata[stateIndex];
      const target = {
        x: metadata.current.position.x + solution[offset] * stepScale,
        y: metadata.current.position.y + solution[offset + 1] * stepScale,
        z: metadata.current.position.z + solution[offset + 2] * stepScale,
      };
      if (
        Number.isFinite(target.x) &&
        Number.isFinite(target.y) &&
        Number.isFinite(target.z) &&
        vectorNorm(vectorSubtract(target, metadata.current.position)) > epsilon
      ) {
        nextPositions.set(metadata.index, target);
      }
    }
  });

  return nextPositions;
}

function buildPairInteractionLocalNewtonDefectCorrectionCandidate(
  frames,
  request,
  pathKeys,
  epsilon,
  defectCorrectionPositions,
) {
  if (pairInteractionUsesFixedSignalSpeed(request)) {
    return new Map();
  }
  const nextPositions = new Map();
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    for (let pathIndex = 1; pathIndex + 1 < pathFrames.length; pathIndex += 1) {
      const previous = pathFrames[pathIndex - 1].frame;
      const current = pathFrames[pathIndex].frame;
      const next = pathFrames[pathIndex + 1].frame;
      if (hasPairConstraintAtTime(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const residual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
        frames,
        request,
        previous,
        current,
        next,
        epsilon,
      );
      if (!residual) {
        continue;
      }
      const leftDt = current.time - previous.time;
      const rightDt = next.time - current.time;
      const averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const states = statesAtPairInteractionFrameIndex(frames, current.frameIndex, request.initialStates);
      if (states.length !== request.initialStates.length) {
        continue;
      }
      const stateIndex = states.findIndex((state) => state.pathKey === current.pathKey);
      if (stateIndex < 0) {
        continue;
      }
      const finiteDifferenceDerivative = -(1 / leftDt + 1 / rightDt) / averageDt;
      const step = { x: 0, y: 0, z: 0 };
      for (const component of ["x", "y", "z"]) {
        const accelerationDerivative = pairInteractionLawSelfDerivativeComponent(
          states,
          request,
          stateIndex,
          component,
        );
        if (accelerationDerivative === null) {
          continue;
        }
        const residualDerivative = finiteDifferenceDerivative - accelerationDerivative;
        if (
          !Number.isFinite(residualDerivative) ||
          Math.abs(residualDerivative) <= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
        ) {
          continue;
        }
        const componentStep = -residual[component] / residualDerivative;
        if (Number.isFinite(componentStep)) {
          step[component] = componentStep;
        }
      }
      let stepNorm = vectorNorm(step);
      if (!Number.isFinite(stepNorm) || stepNorm <= epsilon) {
        continue;
      }
      const defectPosition = defectCorrectionPositions instanceof Map
        ? defectCorrectionPositions.get(pathFrames[pathIndex].index)
        : null;
      const defectStep = defectPosition ? vectorNorm(vectorSubtract(defectPosition, current.position)) : 0;
      const leftSpacing = vectorNorm(vectorSubtract(current.position, previous.position));
      const rightSpacing = vectorNorm(vectorSubtract(next.position, current.position));
      if (!Number.isFinite(leftSpacing) || !Number.isFinite(rightSpacing)) {
        continue;
      }
      const spacingLimit = Math.max(epsilon, Math.min(leftSpacing, rightSpacing) * 0.5);
      const defectLimit = Number.isFinite(defectStep) && defectStep > epsilon ? defectStep * 2 : spacingLimit;
      const maxStep = Math.max(epsilon, Math.min(spacingLimit, defectLimit));
      if (stepNorm > maxStep) {
        const scale = maxStep / stepNorm;
        step.x *= scale;
        step.y *= scale;
        step.z *= scale;
        stepNorm = maxStep;
      }
      const nextPosition = {
        x: current.position.x + step.x,
        y: current.position.y + step.y,
        z: current.position.z + step.z,
      };
      if (
        stepNorm > epsilon &&
        Number.isFinite(nextPosition.x) &&
        Number.isFinite(nextPosition.y) &&
        Number.isFinite(nextPosition.z)
      ) {
        nextPositions.set(pathFrames[pathIndex].index, nextPosition);
      }
    }
  });
  return nextPositions;
}

function buildPairInteractionCausalDelayNumericalNewtonDefectCorrectionCandidate(
  frames,
  request,
  pathKeys,
  epsilon,
  defectCorrectionPositions,
) {
  if (!pairInteractionUsesFixedSignalSpeed(request)) {
    return new Map();
  }
  const nextPositions = new Map();
  const components = ["x", "y", "z"];
  pathKeys.forEach((pathKey) => {
    const pathFrames = frames
      .map((frame, index) => ({ frame, index }))
      .filter((entry) => entry.frame.pathKey === pathKey)
      .sort((left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex);
    for (let pathIndex = 1; pathIndex + 1 < pathFrames.length; pathIndex += 1) {
      const previousEntry = pathFrames[pathIndex - 1];
      const currentEntry = pathFrames[pathIndex];
      const nextEntry = pathFrames[pathIndex + 1];
      const current = currentEntry.frame;
      if (hasPairConstraintAtTime(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const residual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
        frames,
        request,
        previousEntry.frame,
        current,
        nextEntry.frame,
        epsilon,
      );
      if (!residual) {
        continue;
      }
      const leftSpacing = vectorNorm(vectorSubtract(current.position, previousEntry.frame.position));
      const rightSpacing = vectorNorm(vectorSubtract(nextEntry.frame.position, current.position));
      if (!Number.isFinite(leftSpacing) || !Number.isFinite(rightSpacing)) {
        continue;
      }
      const spacingLimit = Math.max(epsilon, Math.min(leftSpacing, rightSpacing) * 0.5);
      const defectPosition = defectCorrectionPositions instanceof Map
        ? defectCorrectionPositions.get(currentEntry.index)
        : null;
      const defectStep = defectPosition ? vectorNorm(vectorSubtract(defectPosition, current.position)) : 0;
      const defectLimit = Number.isFinite(defectStep) && defectStep > epsilon ? defectStep * 2 : spacingLimit;
      const maxStep = Math.max(epsilon, Math.min(spacingLimit, defectLimit));
      const probeStep = Math.max(
        epsilon * 1000,
        1e-6,
        Math.min(leftSpacing, rightSpacing) * 1e-4,
        vectorNorm(current.position) * 1e-9,
      );
      if (!Number.isFinite(probeStep) || probeStep <= 0) {
        continue;
      }

      const matrix = Array.from({ length: components.length }, () => Array(components.length).fill(0));
      let matrixComplete = true;
      for (let column = 0; column < components.length; column += 1) {
        const component = components[column];
        const probeFrames = clonePairInteractionFramesForRelaxation(frames);
        probeFrames[currentEntry.index].position = {
          ...probeFrames[currentEntry.index].position,
          [component]: probeFrames[currentEntry.index].position[component] + probeStep,
        };
        const probeResidual = pairInteractionBoundaryRelaxationResidualVectorForFrames(
          probeFrames,
          request,
          probeFrames[previousEntry.index],
          probeFrames[currentEntry.index],
          probeFrames[nextEntry.index],
          epsilon,
        );
        if (!probeResidual) {
          matrixComplete = false;
          break;
        }
        for (let row = 0; row < components.length; row += 1) {
          const residualComponent = components[row];
          matrix[row][column] = (probeResidual[residualComponent] - residual[residualComponent]) / probeStep;
        }
      }
      if (!matrixComplete) {
        continue;
      }
      const solution = solveDenseLinearSystem(
        matrix,
        components.map((component) => -residual[component]),
        PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON,
      );
      if (!solution) {
        continue;
      }
      const step = {
        x: solution[0],
        y: solution[1],
        z: solution[2],
      };
      let stepNorm = vectorNorm(step);
      if (!Number.isFinite(stepNorm) || stepNorm <= epsilon) {
        continue;
      }
      if (stepNorm > maxStep) {
        const scale = maxStep / stepNorm;
        step.x *= scale;
        step.y *= scale;
        step.z *= scale;
        stepNorm = maxStep;
      }
      const nextPosition = {
        x: current.position.x + step.x,
        y: current.position.y + step.y,
        z: current.position.z + step.z,
      };
      if (
        stepNorm > epsilon &&
        Number.isFinite(nextPosition.x) &&
        Number.isFinite(nextPosition.y) &&
        Number.isFinite(nextPosition.z)
      ) {
        nextPositions.set(currentEntry.index, nextPosition);
      }
    }
  });
  return nextPositions;
}

function pairInteractionConstraintCenterOfMassAtTime(request, time, epsilon) {
  let weighted = { x: 0, y: 0, z: 0 };
  let totalMass = 0;
  for (const state of request.initialStates ?? []) {
    const position = pairConstraintHermitePositionAtTime(
      sortedPairConstraintsForPath(request, state.pathKey),
      state.initialVelocity,
      time,
      epsilon,
      request,
    );
    const mass = Number(state.mass);
    if (!position || !Number.isFinite(mass) || mass <= 0) {
      return null;
    }
    weighted = {
      x: weighted.x + position.x * mass,
      y: weighted.y + position.y * mass,
      z: weighted.z + position.z * mass,
    };
    totalMass += mass;
  }
  return totalMass > 0
    ? {
        x: weighted.x / totalMass,
        y: weighted.y / totalMass,
        z: weighted.z / totalMass,
      }
    : null;
}

function pairInteractionConstraintCenterOfMassKnots(request, epsilon) {
  const times = Array.from(
    new Set(
      (request.pathConstraints ?? [])
        .map((constraint) => Number(constraint.time))
        .filter(Number.isFinite)
        .map((time) => String(Math.round(time / epsilon))),
    ),
  )
    .map((bucket) => Number(bucket) * epsilon)
    .sort((left, right) => left - right);
  return times
    .map((time) => ({
      time,
      centerOfMass: pairInteractionConstraintCenterOfMassAtTime(request, time, epsilon),
    }))
    .filter((knot) => knot.centerOfMass);
}

function pairInteractionConstraintCenterOfMassTargetAtTime(request, time, epsilon) {
  const knots = pairInteractionConstraintCenterOfMassKnots(request, epsilon);
  if (knots.length < 2) {
    return null;
  }
  const exact = knots.find((knot) => Math.abs(knot.time - time) <= epsilon);
  if (exact) {
    return exact.centerOfMass;
  }
  const rightIndex = knots.findIndex((knot) => knot.time >= time);
  if (rightIndex <= 0) {
    return null;
  }
  const left = knots[rightIndex - 1];
  const right = knots[rightIndex];
  const span = right.time - left.time;
  if (span <= epsilon) {
    return null;
  }
  const amount = Math.min(1, Math.max(0, (time - left.time) / span));
  return {
    x: left.centerOfMass.x + (right.centerOfMass.x - left.centerOfMass.x) * amount,
    y: left.centerOfMass.y + (right.centerOfMass.y - left.centerOfMass.y) * amount,
    z: left.centerOfMass.z + (right.centerOfMass.z - left.centerOfMass.z) * amount,
  };
}

function projectPairInteractionCandidateToConstraintCenterOfMass(frames, request, nextPositions, epsilon) {
  if (!(nextPositions instanceof Map) || nextPositions.size === 0) {
    return new Map();
  }
  const projected = new Map();
  const groupsByFrameIndex = new Map();
  frames.forEach((frame, index) => {
    const group = groupsByFrameIndex.get(frame.frameIndex) ?? [];
    group.push({ frame, index });
    groupsByFrameIndex.set(frame.frameIndex, group);
  });

  groupsByFrameIndex.forEach((group) => {
    if (group.length !== request.initialStates.length) {
      return;
    }
    const time = group[0]?.frame?.time;
    if (!Number.isFinite(time)) {
      return;
    }
    if (group.some(({ frame }) => hasPairConstraintAtTime(request, frame.pathKey, frame.time, epsilon))) {
      return;
    }
    if (!group.some(({ index }) => nextPositions.has(index))) {
      return;
    }
    const targetCenterOfMass = pairInteractionConstraintCenterOfMassTargetAtTime(request, time, epsilon);
    if (!targetCenterOfMass) {
      return;
    }
    let weighted = { x: 0, y: 0, z: 0 };
    let totalMass = 0;
    const candidateRows = [];
    for (const { frame, index } of group) {
      const state = request.initialStates.find((candidate) => candidate.pathKey === frame.pathKey);
      const mass = Number(state?.mass);
      if (!Number.isFinite(mass) || mass <= 0) {
        return;
      }
      const position = nextPositions.get(index) ?? frame.position;
      candidateRows.push({ index, position });
      weighted = {
        x: weighted.x + position.x * mass,
        y: weighted.y + position.y * mass,
        z: weighted.z + position.z * mass,
      };
      totalMass += mass;
    }
    if (totalMass <= 0) {
      return;
    }
    const candidateCenterOfMass = {
      x: weighted.x / totalMass,
      y: weighted.y / totalMass,
      z: weighted.z / totalMass,
    };
    const shift = vectorSubtract(targetCenterOfMass, candidateCenterOfMass);
    candidateRows.forEach(({ index, position }) => {
      projected.set(index, {
        x: position.x + shift.x,
        y: position.y + shift.y,
        z: position.z + shift.z,
      });
    });
  });

  return projected;
}

function pairInteractionBoundaryRelaxationCandidateKindCode(kind) {
  return PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CODE_BY_KIND[kind] ?? 0;
}

function pairInteractionBoundaryRelaxationProjectedCandidateKind(kind) {
  const code = pairInteractionBoundaryRelaxationCandidateKindCode(kind);
  if (code <= 0 || code >= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET) {
    return "none";
  }
  return (
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_KIND_BY_CODE[
      code + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET
    ] ?? "none"
  );
}

function pairInteractionBoundaryRelaxationCandidateIsCenterOfMassProjected(kind) {
  return (
    pairInteractionBoundaryRelaxationCandidateKindCode(kind) >=
    PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET
  );
}

function pairInteractionBoundaryRelaxationCandidateFamilyMask(kind) {
  let code = pairInteractionBoundaryRelaxationCandidateKindCode(kind);
  if (code >= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET) {
    code -= PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_CENTER_OF_MASS_OFFSET;
  }
  if (code <= 0 || code >= 64) {
    return 0;
  }
  return 2 ** code;
}

function createPairInteractionRelaxationCandidateEntry(kind, positions) {
  return { kind, positions };
}

function selectPairInteractionRelaxationStepVariants(frames, request, baselineFrameStates, candidateEntries) {
  let selectedStep = null;
  let candidateVariantCount = 0;
  let lineSearchTrialCount = 0;
  let candidateKindMask = 0;
  candidateEntries.forEach((candidateEntry) => {
    const nextPositions = candidateEntry?.positions;
    if (!(nextPositions instanceof Map) || nextPositions.size === 0) {
      return;
    }
    candidateVariantCount += 1;
    candidateKindMask |= pairInteractionBoundaryRelaxationCandidateFamilyMask(candidateEntry.kind);
    restorePairInteractionFrameStates(frames, baselineFrameStates);
    const step = selectPairInteractionRelaxationStep(frames, request, nextPositions);
    lineSearchTrialCount += Number.isFinite(step?.lineSearchTrialCount)
      ? step.lineSearchTrialCount
      : 0;
    restorePairInteractionFrameStates(frames, baselineFrameStates);
    if (step) {
      step.candidateKind = candidateEntry.kind ?? "none";
    }
    if (pairInteractionRelaxationStepBetter(step, selectedStep)) {
      selectedStep = step;
    }
  });
  const selection = selectedStep ?? {};
  selection.candidateVariantCount = candidateVariantCount;
  selection.lineSearchTrialCount = lineSearchTrialCount;
  selection.candidateKindMask = candidateKindMask;
  return selection;
}

function clonePairInteractionFramesForRelaxation(frames) {
  return frames.map((frame) => ({
    ...frame,
    position: copyVector(frame.position),
    velocity: copyVector(frame.velocity),
  }));
}

function pairInteractionBoundaryRelaxationResidualMax(residual) {
  const sampleCount = Number(residual?.pathConstraintBoundaryRelaxationResidualSampleCount);
  const maxResidual = Number(residual?.maxPathConstraintBoundaryRelaxationResidual);
  if (!Number.isFinite(sampleCount) || sampleCount <= 0 || !Number.isFinite(maxResidual)) {
    return null;
  }
  return maxResidual;
}

function pairInteractionBoundaryRelaxationResidualNoWorse(candidate, baseline) {
  const baselineMax = pairInteractionBoundaryRelaxationResidualMax(baseline);
  if (baselineMax === null) {
    return true;
  }
  const candidateMax = pairInteractionBoundaryRelaxationResidualMax(candidate);
  if (candidateMax === null) {
    return false;
  }
  const baselineMean = Number(baseline?.meanPathConstraintBoundaryRelaxationResidual);
  const candidateMean = Number(candidate?.meanPathConstraintBoundaryRelaxationResidual);
  const baselineRms = Number(baseline?.rmsPathConstraintBoundaryRelaxationResidual);
  const candidateRms = Number(candidate?.rmsPathConstraintBoundaryRelaxationResidual);
  return (
    candidateMax <= baselineMax + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON &&
    Number.isFinite(baselineMean) &&
    Number.isFinite(candidateMean) &&
    candidateMean <= baselineMean + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON &&
    Number.isFinite(baselineRms) &&
    Number.isFinite(candidateRms) &&
    candidateRms <= baselineRms + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  );
}

function pairInteractionBoundaryRelaxationResidualBetter(candidate, incumbent) {
  if (!incumbent) {
    return true;
  }
  const candidateMax =
    pairInteractionBoundaryRelaxationResidualMax(candidate) ?? Number.POSITIVE_INFINITY;
  const incumbentMax =
    pairInteractionBoundaryRelaxationResidualMax(incumbent) ?? Number.POSITIVE_INFINITY;
  if (
    candidateMax <
    incumbentMax - PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return true;
  }
  if (
    candidateMax >
    incumbentMax + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return false;
  }
  const candidateRms = Number(candidate?.rmsPathConstraintBoundaryRelaxationResidual);
  const incumbentRms = Number(incumbent?.rmsPathConstraintBoundaryRelaxationResidual);
  if (
    candidateRms <
    incumbentRms - PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return true;
  }
  if (
    candidateRms >
    incumbentRms + PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  ) {
    return false;
  }
  const candidateMean = Number(candidate?.meanPathConstraintBoundaryRelaxationResidual);
  const incumbentMean = Number(incumbent?.meanPathConstraintBoundaryRelaxationResidual);
  return (
    Number.isFinite(candidateMean) &&
    Number.isFinite(incumbentMean) &&
    candidateMean <
      incumbentMean - PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_RESIDUAL_EPSILON
  );
}

function applyPairInteractionRelaxationPositions(frames, nextPositions, factor) {
  let anyUpdated = false;
  nextPositions.forEach((position, frameIndex) => {
    const frame = frames[frameIndex];
    if (!frame?.position) {
      return;
    }
    frame.position = {
      x: frame.position.x + (position.x - frame.position.x) * factor,
      y: frame.position.y + (position.y - frame.position.y) * factor,
      z: frame.position.z + (position.z - frame.position.z) * factor,
    };
    anyUpdated = true;
  });
  return anyUpdated;
}

function measurePairInteractionRelaxationStep(frames, nextPositions, factor) {
  let maxStep = 0;
  nextPositions.forEach((position, frameIndex) => {
    const frame = frames[frameIndex];
    if (!frame?.position) {
      return;
    }
    const step = vectorNorm({
      x: (position.x - frame.position.x) * factor,
      y: (position.y - frame.position.y) * factor,
      z: (position.z - frame.position.z) * factor,
    });
    if (Number.isFinite(step)) {
      maxStep = Math.max(maxStep, step);
    }
  });
  return maxStep;
}

function selectPairInteractionRelaxationStep(frames, request, nextPositions) {
  const baselineResidual = summarizePairInteractionBoundaryRelaxationResiduals(frames, request);
  const baselineFrameStates = copyPairInteractionFrameStates(frames);
  let bestStep = null;
  let lineSearchTrialCount = 0;

  PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_LINE_SEARCH_FACTORS.forEach((factor) => {
    restorePairInteractionFrameStates(frames, baselineFrameStates);
    const maxStep = measurePairInteractionRelaxationStep(frames, nextPositions, factor);
    const anyUpdated = applyPairInteractionRelaxationPositions(frames, nextPositions, factor);
    if (!anyUpdated) {
      return;
    }
    lineSearchTrialCount += 1;
    const residual = summarizePairInteractionBoundaryRelaxationResiduals(frames, request);
    if (!pairInteractionBoundaryRelaxationResidualNoWorse(residual, baselineResidual)) {
      return;
    }
    const residualMax =
      pairInteractionBoundaryRelaxationResidualMax(residual) ?? Number.POSITIVE_INFINITY;
    if (!bestStep || pairInteractionBoundaryRelaxationResidualBetter(residual, bestStep.residual)) {
      bestStep = {
        frameStates: copyPairInteractionFrameStates(frames),
        residual,
        residualMax,
        maxStep,
        stepFactor: factor,
      };
    }
  });

  restorePairInteractionFrameStates(frames, bestStep?.frameStates ?? baselineFrameStates);
  const selection = bestStep ?? {};
  selection.lineSearchTrialCount = lineSearchTrialCount;
  return selection;
}

function pairInteractionRelaxationStepBetter(candidate, incumbent) {
  if (!candidate?.frameStates || !candidate?.residual) {
    return false;
  }
  if (!incumbent?.frameStates || !incumbent?.residual) {
    return true;
  }
  return pairInteractionBoundaryRelaxationResidualBetter(candidate.residual, incumbent.residual);
}

function relaxPairInteractionConstrainedFrames(frames, request) {
  if (!Array.isArray(frames) || frames.length === 0 || (request.pathConstraints ?? []).length === 0) {
    return {
      pathConstraintBoundaryRelaxationAppliedIterationCount: 0,
      pathConstraintBoundaryRelaxationStopReason:
        PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES,
    };
  }
  const epsilon = pairConstraintTimeEpsilon(request);
  const pathKeys = Array.from(new Set(frames.map((frame) => frame.pathKey))).sort((left, right) => left - right);
  const iterations = normalizePairInteractionBoundaryRelaxationIterationCount(
    request.pathConstraintBoundaryRelaxationIterationCount,
  );
  const tolerance = pairInteractionBoundaryRelaxationTolerance(request);
  const stepTolerance = pairInteractionBoundaryRelaxationStepTolerance(request);
  let appliedIterationCount = 0;
  let maxAcceptedStep = 0;
  let finalStepFactor = 0;
  let selectedCandidateKind = "none";
  let centerOfMassSelectedCount = 0;
  let candidateVariantCount = 0;
  let lineSearchTrialCount = 0;
  let candidateKindMask = 0;
  let bestResidual = summarizePairInteractionBoundaryRelaxationResiduals(frames, request);
  let hasBestResidual = pairInteractionBoundaryRelaxationResidualMax(bestResidual) !== null;
  let bestFrameStates = copyPairInteractionFrameStates(frames);
  const finish = (stopReason) => {
    restorePairInteractionFrameStates(frames, bestFrameStates);
    snapPairInteractionFrameConstraints(frames, request, epsilon);
    recomputePairInteractionFrameVelocities(frames, request);
    return {
      pathConstraintBoundaryRelaxationAppliedIterationCount: appliedIterationCount,
      pathConstraintBoundaryRelaxationStopReason: stopReason,
      pathConstraintBoundaryRelaxationMaxStep: maxAcceptedStep,
      pathConstraintBoundaryRelaxationFinalStepFactor: finalStepFactor,
      pathConstraintBoundaryRelaxationSelectedCandidateKind: selectedCandidateKind,
      pathConstraintBoundaryRelaxationCenterOfMassSelectedCount: centerOfMassSelectedCount,
      pathConstraintBoundaryRelaxationCandidateVariantCount: candidateVariantCount,
      pathConstraintBoundaryRelaxationLineSearchTrialCount: lineSearchTrialCount,
      pathConstraintBoundaryRelaxationCandidateKindMask: candidateKindMask,
    };
  };
  if (iterations === 0) {
    return finish(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NOT_REQUESTED);
  }
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const predictorPositions = buildPairInteractionRelaxationCandidate(frames, request, pathKeys, epsilon);
    if (predictorPositions.size === 0) {
      return finish(
        appliedIterationCount === 0
          ? PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_SAMPLES
          : PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_NO_UPDATES,
      );
    }
    const baselineFrameStates = copyPairInteractionFrameStates(frames);
    const defectCorrectionPositions = buildPairInteractionDefectCorrectionCandidate(
      frames,
      request,
      pathKeys,
      epsilon,
    );
    const linearizedDefectCorrectionPositions = buildPairInteractionLinearizedDefectCorrectionCandidate(
      frames,
      request,
      defectCorrectionPositions,
    );
    const localNewtonDefectCorrectionPositions = buildPairInteractionLocalNewtonDefectCorrectionCandidate(
      frames,
      request,
      pathKeys,
      epsilon,
      defectCorrectionPositions,
    );
    const coupledLocalNewtonDefectCorrectionPositions =
      buildPairInteractionCoupledLocalNewtonDefectCorrectionCandidate(
        frames,
        request,
        epsilon,
        defectCorrectionPositions,
      );
    const causalDelayNumericalNewtonDefectCorrectionPositions =
      buildPairInteractionCausalDelayNumericalNewtonDefectCorrectionCandidate(
        frames,
        request,
        pathKeys,
        epsilon,
        defectCorrectionPositions,
      );
    const blockCoupledNewtonDefectCorrectionPositions =
      buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
        frames,
        request,
        pathKeys,
        epsilon,
        defectCorrectionPositions,
      );
    applyPairInteractionRelaxationPositions(frames, predictorPositions, 1);
    const predictedFrames = clonePairInteractionFramesForRelaxation(frames);
    restorePairInteractionFrameStates(frames, baselineFrameStates);
    const predictedDefectCorrectionPositions = buildPairInteractionDefectCorrectionCandidate(
      predictedFrames,
      request,
      pathKeys,
      epsilon,
      predictedFrames,
    );
    const predictedBlockCoupledNewtonDefectCorrectionPositions =
      buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
        predictedFrames,
        request,
        pathKeys,
        epsilon,
        predictedDefectCorrectionPositions,
      );
    const predictedBlendPositions = buildPairInteractionRelaxationCandidate(
      frames,
      request,
      pathKeys,
      epsilon,
      frames,
      predictedFrames,
      0.5,
    );

    const correctedPositions = buildPairInteractionRelaxationCandidate(
      frames,
      request,
      pathKeys,
      epsilon,
      predictedFrames,
    );
    let secondCorrectedPositions = new Map();
    let correctedDefectCorrectionPositions = new Map();
    let correctedBlockCoupledNewtonDefectCorrectionPositions = new Map();
    let correctedBlendPositions = new Map();
    let secondCorrectedDefectCorrectionPositions = new Map();
    let secondCorrectedBlockCoupledNewtonDefectCorrectionPositions = new Map();
    let secondCorrectedBlendPositions = new Map();
    let thirdCorrectedPositions = new Map();
    let thirdCorrectedDefectCorrectionPositions = new Map();
    let thirdCorrectedBlockCoupledNewtonDefectCorrectionPositions = new Map();
    let thirdCorrectedBlendPositions = new Map();
    if (correctedPositions.size > 0) {
      restorePairInteractionFrameStates(frames, baselineFrameStates);
      applyPairInteractionRelaxationPositions(frames, correctedPositions, 1);
      const correctedPredictedFrames = clonePairInteractionFramesForRelaxation(frames);
      restorePairInteractionFrameStates(frames, baselineFrameStates);
      correctedDefectCorrectionPositions = buildPairInteractionDefectCorrectionCandidate(
        correctedPredictedFrames,
        request,
        pathKeys,
        epsilon,
        correctedPredictedFrames,
      );
      correctedBlockCoupledNewtonDefectCorrectionPositions =
        buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
          correctedPredictedFrames,
          request,
          pathKeys,
          epsilon,
          correctedDefectCorrectionPositions,
        );
      correctedBlendPositions = buildPairInteractionRelaxationCandidate(
        frames,
        request,
        pathKeys,
        epsilon,
        frames,
        correctedPredictedFrames,
        0.5,
      );
      secondCorrectedPositions = buildPairInteractionRelaxationCandidate(
        frames,
        request,
        pathKeys,
        epsilon,
        correctedPredictedFrames,
      );
      if (secondCorrectedPositions.size > 0) {
        restorePairInteractionFrameStates(frames, baselineFrameStates);
        applyPairInteractionRelaxationPositions(frames, secondCorrectedPositions, 1);
        const secondCorrectedPredictedFrames = clonePairInteractionFramesForRelaxation(frames);
        restorePairInteractionFrameStates(frames, baselineFrameStates);
        secondCorrectedDefectCorrectionPositions = buildPairInteractionDefectCorrectionCandidate(
          secondCorrectedPredictedFrames,
          request,
          pathKeys,
          epsilon,
          secondCorrectedPredictedFrames,
        );
        secondCorrectedBlockCoupledNewtonDefectCorrectionPositions =
          buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
            secondCorrectedPredictedFrames,
            request,
            pathKeys,
            epsilon,
            secondCorrectedDefectCorrectionPositions,
          );
        secondCorrectedBlendPositions = buildPairInteractionRelaxationCandidate(
          frames,
          request,
          pathKeys,
          epsilon,
          frames,
          secondCorrectedPredictedFrames,
          0.5,
        );
        thirdCorrectedPositions = buildPairInteractionRelaxationCandidate(
          frames,
          request,
          pathKeys,
          epsilon,
          secondCorrectedPredictedFrames,
        );
        if (thirdCorrectedPositions.size > 0) {
          restorePairInteractionFrameStates(frames, baselineFrameStates);
          applyPairInteractionRelaxationPositions(frames, thirdCorrectedPositions, 1);
          const thirdCorrectedPredictedFrames = clonePairInteractionFramesForRelaxation(frames);
          restorePairInteractionFrameStates(frames, baselineFrameStates);
          thirdCorrectedDefectCorrectionPositions = buildPairInteractionDefectCorrectionCandidate(
            thirdCorrectedPredictedFrames,
            request,
            pathKeys,
            epsilon,
            thirdCorrectedPredictedFrames,
          );
          thirdCorrectedBlockCoupledNewtonDefectCorrectionPositions =
            buildPairInteractionBlockCoupledNewtonDefectCorrectionCandidate(
              thirdCorrectedPredictedFrames,
              request,
              pathKeys,
              epsilon,
              thirdCorrectedDefectCorrectionPositions,
            );
          thirdCorrectedBlendPositions = buildPairInteractionRelaxationCandidate(
            frames,
            request,
            pathKeys,
            epsilon,
            frames,
            thirdCorrectedPredictedFrames,
            0.5,
          );
        }
      }
    }
    const candidateEntries = [
      createPairInteractionRelaxationCandidateEntry("predictor", predictorPositions),
      createPairInteractionRelaxationCandidateEntry("first_corrector", correctedPositions),
      createPairInteractionRelaxationCandidateEntry("second_corrector", secondCorrectedPositions),
      createPairInteractionRelaxationCandidateEntry("defect_correction", defectCorrectionPositions),
      createPairInteractionRelaxationCandidateEntry("linearized_defect_correction", linearizedDefectCorrectionPositions),
      createPairInteractionRelaxationCandidateEntry("local_newton_defect_correction", localNewtonDefectCorrectionPositions),
      createPairInteractionRelaxationCandidateEntry(
        "coupled_local_newton_defect_correction",
        coupledLocalNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry(
        "causal_delay_numerical_newton_defect_correction",
        causalDelayNumericalNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry(
        "block_coupled_newton_defect_correction",
        blockCoupledNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry("predicted_defect_correction", predictedDefectCorrectionPositions),
      createPairInteractionRelaxationCandidateEntry(
        "predicted_block_coupled_newton_defect_correction",
        predictedBlockCoupledNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry("predicted_blend", predictedBlendPositions),
      createPairInteractionRelaxationCandidateEntry("corrected_defect_correction", correctedDefectCorrectionPositions),
      createPairInteractionRelaxationCandidateEntry(
        "corrected_block_coupled_newton_defect_correction",
        correctedBlockCoupledNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry("corrected_blend", correctedBlendPositions),
      createPairInteractionRelaxationCandidateEntry(
        "second_corrected_defect_correction",
        secondCorrectedDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry(
        "second_corrected_block_coupled_newton_defect_correction",
        secondCorrectedBlockCoupledNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry("second_corrected_blend", secondCorrectedBlendPositions),
      createPairInteractionRelaxationCandidateEntry("third_corrector", thirdCorrectedPositions),
      createPairInteractionRelaxationCandidateEntry(
        "third_corrected_defect_correction",
        thirdCorrectedDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry(
        "third_corrected_block_coupled_newton_defect_correction",
        thirdCorrectedBlockCoupledNewtonDefectCorrectionPositions,
      ),
      createPairInteractionRelaxationCandidateEntry("third_corrected_blend", thirdCorrectedBlendPositions),
    ].filter((candidate) => candidate.positions instanceof Map && candidate.positions.size > 0);
    const centerOfMassProjectedCandidateEntries = candidateEntries
      .map((candidate) =>
        createPairInteractionRelaxationCandidateEntry(
          pairInteractionBoundaryRelaxationProjectedCandidateKind(candidate.kind),
          projectPairInteractionCandidateToConstraintCenterOfMass(
            frames,
            request,
            candidate.positions,
            epsilon,
          ),
        ),
      )
      .filter((candidate) => candidate.positions.size > 0);
    const selectedStep = selectPairInteractionRelaxationStepVariants(
      frames,
      request,
      baselineFrameStates,
      [...candidateEntries, ...centerOfMassProjectedCandidateEntries],
    );
    candidateVariantCount += Number.isFinite(selectedStep?.candidateVariantCount)
      ? selectedStep.candidateVariantCount
      : 0;
    lineSearchTrialCount += Number.isFinite(selectedStep?.lineSearchTrialCount)
      ? selectedStep.lineSearchTrialCount
      : 0;
    candidateKindMask |= Number.isFinite(selectedStep?.candidateKindMask)
      ? selectedStep.candidateKindMask
      : 0;
    if (!selectedStep?.frameStates || !selectedStep?.residual) {
      return finish(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_LINE_SEARCH_STALLED);
    }
    restorePairInteractionFrameStates(frames, selectedStep.frameStates);
    if (
      !hasBestResidual ||
      pairInteractionBoundaryRelaxationResidualBetter(selectedStep.residual, bestResidual)
    ) {
      bestResidual = selectedStep.residual;
      hasBestResidual = pairInteractionBoundaryRelaxationResidualMax(bestResidual) !== null;
      bestFrameStates = selectedStep.frameStates;
    }
    appliedIterationCount += 1;
    maxAcceptedStep = Math.max(maxAcceptedStep, selectedStep.maxStep ?? 0);
    finalStepFactor = selectedStep.stepFactor ?? 0;
    selectedCandidateKind = selectedStep.candidateKind ?? "none";
    if (pairInteractionBoundaryRelaxationCandidateIsCenterOfMassProjected(selectedCandidateKind)) {
      centerOfMassSelectedCount += 1;
    }
    if (Number.isFinite(tolerance)) {
      if (
        selectedStep.residual.pathConstraintBoundaryRelaxationResidualSampleCount > 0 &&
        selectedStep.residual.maxPathConstraintBoundaryRelaxationResidual <= tolerance
      ) {
        return finish(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_TOLERANCE_REACHED);
      }
    }
    if (Number.isFinite(stepTolerance) && selectedStep.maxStep <= stepTolerance) {
      return finish(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_STEP_TOLERANCE_REACHED);
    }
  }
  return finish(PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_ITERATION_BUDGET_EXHAUSTED);
}

function hasPairConstraintAtTime(request, pathKey, time, epsilon) {
  return sortedPairConstraintsForPath(request, pathKey).some(
    (constraint) => Math.abs(constraint.time - time) <= epsilon,
  );
}

function snapPairInteractionFrameConstraints(frames, request, epsilon) {
  frames.forEach((frame) => {
    const constraint = sortedPairConstraintsForPath(request, frame.pathKey).find(
      (candidate) => Math.abs(candidate.time - frame.time) <= epsilon,
    );
    if (constraint) {
      frame.position = copyVector(constraint.position);
    }
  });
}

function seedPairInteractionFramesFromBoundaryConstraints(frames, request) {
  if (!Array.isArray(frames) || frames.length === 0 || (request.pathConstraints ?? []).length === 0) {
    return 0;
  }
  const epsilon = pairConstraintTimeEpsilon(request);
  let seededCount = 0;
  request.initialStates.forEach((initialState) => {
    const constraints = sortedPairConstraintsForPath(request, initialState.pathKey);
    if (constraints.length === 0) {
      return;
    }
    const firstTangent = initialState.initialVelocity;
    frames.forEach((frame) => {
      if (frame.pathKey !== initialState.pathKey) {
        return;
      }
      const position = pairConstraintHermitePositionAtTime(
        constraints,
        firstTangent,
        frame.time,
        epsilon,
        request,
      );
      if (!position) {
        return;
      }
      frame.position = copyVector(position);
      seededCount += 1;
    });
  });
  if (seededCount > 0) {
    snapPairInteractionFrameConstraints(frames, request, epsilon);
    recomputePairInteractionFrameVelocities(frames, request);
  }
  return seededCount;
}

function recomputePairInteractionFrameVelocities(frames, request = null) {
  const byPath = new Map();
  frames.forEach((frame, index) => {
    const entries = byPath.get(frame.pathKey) ?? [];
    entries.push({ frame, index });
    byPath.set(frame.pathKey, entries);
  });
  byPath.forEach((pathFrames) => {
    const sorted = pathFrames.slice().sort(
      (left, right) => left.frame.time - right.frame.time || left.frame.frameIndex - right.frame.frameIndex,
    );
    sorted.forEach((entry, index) => {
      const current = entry.frame;
      if (request) {
        const constraints = sortedPairConstraintsForPath(request, current.pathKey);
        const initialState = request.initialStates.find((state) => state.pathKey === current.pathKey);
        const firstTangent = initialState?.initialVelocity ?? current.velocity;
        const retainedTangent = pairConstraintTangentAtTime(
          constraints,
          current.time,
          pairConstraintTimeEpsilon(request),
          request,
          firstTangent,
        );
        if (retainedTangent) {
          frames[entry.index].velocity = retainedTangent;
          return;
        }
      }
      if (index > 0 && index + 1 < sorted.length) {
        const previous = sorted[index - 1].frame;
        const next = sorted[index + 1].frame;
        const leftDt = current.time - previous.time;
        const rightDt = next.time - current.time;
        if (leftDt > 0 && rightDt > 0) {
          const span = leftDt + rightDt;
          const leftWeight = -rightDt / (leftDt * span);
          const centerWeight = (rightDt - leftDt) / (leftDt * rightDt);
          const rightWeight = leftDt / (rightDt * span);
          frames[entry.index].velocity = {
            x: leftWeight * previous.position.x + centerWeight * current.position.x + rightWeight * next.position.x,
            y: leftWeight * previous.position.y + centerWeight * current.position.y + rightWeight * next.position.y,
            z: leftWeight * previous.position.z + centerWeight * current.position.z + rightWeight * next.position.z,
          };
          return;
        }
      }

      const previous = sorted[Math.max(0, index - 1)]?.frame;
      const next = sorted[Math.min(sorted.length - 1, index + 1)]?.frame;
      const span = next && previous ? next.time - previous.time : 0;
      if (span > 0) {
        frames[entry.index].velocity = {
          x: (next.position.x - previous.position.x) / span,
          y: (next.position.y - previous.position.y) / span,
          z: (next.position.z - previous.position.z) / span,
        };
      }
    });
  });
}

function pairConstraintPositionAtTime(constraints, time, epsilon) {
  if (constraints.length === 0) {
    return null;
  }
  const exact = constraints.find((constraint) => Math.abs(constraint.time - time) <= epsilon);
  if (exact) {
    return copyVector(exact.position);
  }
  if (time < constraints[0].time - epsilon || time > constraints[constraints.length - 1].time + epsilon) {
    return null;
  }
  const rightIndex = constraints.findIndex((constraint) => constraint.time >= time);
  if (rightIndex <= 0) {
    return null;
  }
  const left = constraints[rightIndex - 1];
  const right = constraints[rightIndex];
  const span = right.time - left.time;
  if (span <= epsilon) {
    return null;
  }
  const amount = Math.max(0, Math.min(1, (time - left.time) / span));
  return {
    x: left.position.x + (right.position.x - left.position.x) * amount,
    y: left.position.y + (right.position.y - left.position.y) * amount,
    z: left.position.z + (right.position.z - left.position.z) * amount,
  };
}

function statesAtPairInteractionFrameIndex(frames, frameIndex, initialStates) {
  return frames
    .filter((frame) => frame.frameIndex === frameIndex)
    .map((frame) => {
      const initialState = initialStates.find((state) => state.pathKey === frame.pathKey) ?? {};
      return {
        pathKey: frame.pathKey,
        position: copyVector(frame.position),
        velocity: copyVector(frame.velocity),
        charge: initialState.charge ?? (frame.pathKey === 1 ? 1 : -1),
        mass: initialState.mass ?? 1,
        stateFlags: frame.stateFlags ?? initialState.stateFlags ?? frame.pathKey,
      };
    })
    .sort((left, right) => left.pathKey - right.pathKey);
}

function scalePairResidualVector(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function createPairInteractionPathRows(frames) {
  const rows = [];
  const byPath = new Map();
  frames.forEach((frame) => {
    const entries = byPath.get(frame.pathKey) ?? [];
    entries.push(frame);
    byPath.set(frame.pathKey, entries);
  });
  byPath.forEach((pathFrames) => {
    const sorted = pathFrames.slice().sort((left, right) => left.frameIndex - right.frameIndex);
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const left = sorted[index];
      const right = sorted[index + 1];
      const span = right.time - left.time;
      if (span <= 0) {
        continue;
      }
      rows.push({
        pathKey: left.pathKey,
        segmentIndex: index,
        startTime: left.time,
        endTime: right.time,
        start: copyVector(left.position),
        velocity: {
          x: (right.position.x - left.position.x) / span,
          y: (right.position.y - left.position.y) / span,
          z: (right.position.z - left.position.z) / span,
        },
        errorBound: Math.max(left.errorBound ?? 0, right.errorBound ?? 0),
        stateFlags: left.stateFlags,
      });
    }
  });
  return rows;
}

function encodeMotionFrameRowsF64(frames) {
  const buffer = new ArrayBuffer(frames.length * FRAME_BUFFER_ROW_F64_BYTES);
  const view = new DataView(buffer);
  frames.forEach((frame, index) => {
    const offset = index * FRAME_BUFFER_ROW_F64_BYTES;
    view.setBigUint64(offset, BigInt(frame.pathKey), true);
    view.setBigUint64(offset + 8, BigInt(frame.frameIndex), true);
    view.setFloat64(offset + 16, frame.time, true);
    setVectorF64(view, offset + 24, frame.position);
    setVectorF64(view, offset + 48, frame.velocity);
    view.setFloat64(offset + 72, frame.errorBound ?? 0, true);
    view.setUint32(offset + 80, frame.stateFlags ?? 0, true);
    view.setUint32(offset + 84, 0, true);
  });
  return buffer;
}

function setVectorF64(view, offset, vector) {
  view.setFloat64(offset, vector.x, true);
  view.setFloat64(offset + 8, vector.y, true);
  view.setFloat64(offset + 16, vector.z, true);
}

function normalizeLinearMotionReplayRequest(request) {
  return dropUndefinedProperties({
    pathKey: request.pathKey,
    segment: {
      startTime: request.segment.startTime,
      endTime: request.segment.endTime,
      positionAtStart: copyVector(request.segment.positionAtStart),
      velocity: copyVector(request.segment.velocity),
      errorBound: request.segment.errorBound ?? 0,
    },
    startTime: request.startTime,
    endTime: request.endTime,
    step: request.step,
    stateFlags: request.stateFlags,
  });
}

function normalizeMotionIntegrationReplayRequest(request) {
  return dropUndefinedProperties({
    pathKey: request.pathKey,
    startTime: request.startTime,
    endTime: request.endTime,
    step: request.step,
    initialPosition: copyVector(request.initialPosition),
    initialVelocity: copyVector(request.initialVelocity),
    acceleration: copyVector(request.acceleration),
    integrationTolerance: request.integrationTolerance ?? 0,
    integrationMethod: request.integrationMethod ?? 1,
    stateFlags: request.stateFlags,
  });
}

function solveRunRootsAndHitsF64WithModule(module, config, abiInfo, ids = {}) {
  if (config.normalizedCircularSourceRootRequest != null) {
    const precisionRequest = createRunCircularSourcePrecisionRequest(
      config.normalizedCircularSourceRootRequest.localRequest,
      ids
    );
    const normalizedCircularSourceRequest = {
      ...config.normalizedCircularSourceRootRequest,
      localRequest: precisionRequest.rootRequest,
    };
    const response = solveCircularSourceRootsHitsLedgerNormalizedF64WithModule(
      module,
      normalizedCircularSourceRequest,
      abiInfo,
      ids
    );
    return withCircularSourceRunPrecisionMetadata(response, precisionRequest, ids);
  }
  if (config.circularSourceRootRequest != null) {
    const precisionRequest = createRunCircularSourcePrecisionRequest(config.circularSourceRootRequest, ids);
    const response = solveCircularSourceRootsHitsLedgerF64WithModule(
      module,
      precisionRequest.rootRequest,
      abiInfo,
      ids
    );
    return withCircularSourceRunPrecisionMetadata(response, precisionRequest, ids);
  }
  if (config.normalizedRootRequest != null) {
    const normalizedRequest = config.normalizedRootRequest;
    const rootsAndHits = solveRootsAndHitsPrecisionF64WithModule(
      module,
      createRunPrecisionRootsAndHitsRequest(normalizedRequest.localRequest, ids),
      abiInfo
    );
    const normalizedStatus = createStatus(
      "ok",
      "info",
      "origin-normalized root rows are authoritative local coordinates",
      {
        runId: ids.runId,
        requestId: ids.requestId,
        details: {
          coordinateFrame: "origin-normalized",
          coordinateOrigin: copyVector(normalizedRequest.coordinateOrigin),
          localRootAuthority: "authoritative",
          localHitAuthority: "authoritative",
          absolutePointAuthority: "display-only",
          restoreAbsolutePoints: Boolean(normalizedRequest.restoreAbsolutePoints),
        },
      }
    );
    return {
      ...rootsAndHits,
      statuses: [normalizedStatus, createPrecisionSolveRunStatus(rootsAndHits, ids)],
    };
  }
  const rootsAndHits = solveRootsAndHitsPrecisionF64WithModule(
    module,
    createRunPrecisionRootsAndHitsRequest(config.rootRequest, ids),
    abiInfo
  );
  return {
    ...rootsAndHits,
    statuses: [createPrecisionSolveRunStatus(rootsAndHits, ids)],
  };
}

function createRunCircularSourcePrecisionRequest(rootRequest, ids = {}) {
  const requestedPrecisionPath = normalizePrecisionPath(ids.requestedPrecisionPath, "auto");
  const admissionPrecisionPath = normalizePrecisionPath(ids.precisionPath, "scaled_f64_strict");
  const claimLevel = normalizeClaimLevel(ids.claimLevel);
  const claimMinimumPath =
    CLAIM_LEVEL_MINIMUM_PRECISION_PATH[claimLevel] ?? CLAIM_LEVEL_MINIMUM_PRECISION_PATH["interactive-preview"];
  const selectedPrecisionPath = maxPrecisionPath(
    maxPrecisionPath(requestedPrecisionPath, admissionPrecisionPath),
    claimMinimumPath
  );
  const controls = CIRCULAR_SOURCE_PRECISION_CONTROLS[selectedPrecisionPath] ??
    CIRCULAR_SOURCE_PRECISION_CONTROLS.scaled_f64_strict;
  return {
    rootRequest: {
      ...deepCloneJson(rootRequest),
      rootTolerance: Math.min(rootRequest?.rootTolerance ?? controls.rootTolerance, controls.rootTolerance),
      maxIterations: Math.max(rootRequest?.maxIterations ?? 0, controls.maxIterations),
      scanSubdivisions: Math.max(rootRequest?.scanSubdivisions ?? 0, controls.scanSubdivisions),
    },
    requestedPrecisionPath,
    diagnosticPrecisionPath: admissionPrecisionPath,
    selectedPrecisionPath,
    claimLevel,
    controlNumericType: controls.controlNumericType,
    outputNumericType: "f64",
  };
}

function normalizePrecisionPath(path, fallback) {
  return DEFAULT_PRECISION_PATHS.includes(path) ? path : fallback;
}

function normalizeClaimLevel(claimLevel) {
  return CLAIM_LEVEL_BY_ID.includes(claimLevel) ? claimLevel : "interactive-preview";
}

function maxPrecisionPath(left, right) {
  return (PRECISION_PATH_RANK.get(left) ?? 0) >= (PRECISION_PATH_RANK.get(right) ?? 0)
    ? left
    : right;
}

function withCircularSourceRunPrecisionMetadata(response, precisionRequest, ids = {}) {
  const precision = createCircularSourceRunPrecisionSummary(response, precisionRequest);
  const precisionStatus = createStatus(
    "ok",
    "info",
    "circular-source precision controls applied to analytic f64 solver",
    {
      runId: ids.runId,
      requestId: ids.requestId,
      details: {
        precisionEngine: "analytic-circular-source-f64",
        precisionPathSelector: "applied-to-circular-source-controls",
        requestedPrecisionPath: precision.requestedPrecisionPath,
        diagnosticPrecisionPath: precision.diagnosticPrecisionPath,
        selectedPrecisionPath: precision.selectedPrecisionPath,
        selectedNumericType: precision.selectedNumericType,
        controlNumericType: precisionRequest.controlNumericType,
        outputNumericTypeAuthority: "f64-cabi-output",
        validationReplayAuthority: "not-run-for-circular-source",
        rootTolerance: precision.rootTolerance,
        maxIterations: precision.maxIterations,
        scanSubdivisions: precision.scanSubdivisions,
        maxResidual: precision.maxResidual,
        minAbsJacobian: precision.minAbsJacobian,
      },
    }
  );
  return {
    ...response,
    precision,
    statuses: [...(response.statuses ?? []), precisionStatus],
  };
}

function createCircularSourceRunPrecisionSummary(response, precisionRequest) {
  const request = precisionRequest.rootRequest;
  const roots = response.roots ?? [];
  const residuals = roots.map((root) => Math.abs(root.residual)).filter(Number.isFinite);
  const jacobians = roots.map((root) => Math.abs(root.jacobian)).filter(Number.isFinite);
  const summary = {
    requestedPrecisionPath: precisionRequest.requestedPrecisionPath,
    diagnosticPrecisionPath: precisionRequest.diagnosticPrecisionPath,
    selectedPrecisionPath: precisionRequest.selectedPrecisionPath,
    selectedNumericType: "f64",
    selectedNumericChart: "absolute_f64",
    claimLevel: precisionRequest.claimLevel,
    statusCode: "ok",
    statusSeverity: "info",
    rootCount: roots.length,
    rootTolerance: request.rootTolerance ?? 1e-12,
    maxResidual: residuals.length > 0 ? Math.max(...residuals) : 0,
    minAbsJacobian: jacobians.length > 0 ? Math.min(...jacobians) : 0,
    maxIterations: request.maxIterations ?? 0,
    scanSubdivisions: request.scanSubdivisions ?? 0,
    escalated:
      precisionRequest.selectedPrecisionPath !== precisionRequest.requestedPrecisionPath &&
      precisionRequest.selectedPrecisionPath !== "auto",
    validationReplayRun: false,
    validationReplayMatched: false,
  };
  return {
    ...summary,
    escalations: createPrecisionEscalationRecords(summary),
  };
}

function solveMovingCircularSourceCausalRootsF64(request = {}) {
  const normalizedRequest = createMovingCircularSourceRootRequest(request);
  const response = solveMovingCircularSourceCausalRoots(normalizedRequest);
  const status = response.status ?? createStatus(
    "ok",
    "ok",
    "moving-circular source causal roots solved"
  );
  return {
    schema: "solver-moving-circular-source-causal-roots-f64.v1",
    sourceHistoryKind: "moving-circular-source",
    request: normalizedRequest,
    roots: response.roots ?? [],
    scan: response.scan ?? null,
    rejectedReason: response.rejectedReason ?? "",
    status,
    statuses: [status],
  };
}

function solveMovingCircularSameSourceCausalRootsF64(request = {}) {
  const normalizedRequest = createMovingCircularSameSourceRootRequest(request);
  const response = solveMovingCircularSameSourceCausalRoots(normalizedRequest);
  const status = response.status ?? createStatus(
    "ok",
    "ok",
    "moving-circular same-source causal roots solved"
  );
  return {
    schema: "solver-moving-circular-same-source-causal-roots-f64.v1",
    sourceHistoryKind: "moving-circular-same-source",
    request: normalizedRequest,
    roots: response.roots ?? [],
    scan: response.scan ?? null,
    rejectedReason: response.rejectedReason ?? "",
    status,
    statuses: [status],
  };
}

function bridgeFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function bridgeVector(value = {}) {
  return {
    x: bridgeFiniteNumber(value.x),
    y: bridgeFiniteNumber(value.y),
    z: bridgeFiniteNumber(value.z),
  };
}

function bridgeDot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function bridgeScaleVector(vector, scalar) {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar,
  };
}

function bridgeAddVector(left, right) {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function bridgeCrossVector(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function bridgeMagnitude(vector) {
  return Math.sqrt(bridgeDot(vector, vector));
}

function bridgeOptionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function resolveBridgeReceiverNormalRows(branch = {}) {
  const branchWeight = bridgeOptionalFiniteNumber(branch.branchWeight);
  const sourceNormalDenominator = bridgeOptionalFiniteNumber(branch.sourceNormalDenominator);
  const receiverNormalNumerator = bridgeOptionalFiniteNumber(branch.receiverNormalNumerator);
  const receiverNormalFactor = bridgeOptionalFiniteNumber(branch.receiverNormalFactor);
  const unsignedReceiverNormalFactor = bridgeOptionalFiniteNumber(branch.unsignedReceiverNormalFactor);
  if (
    branchWeight === null ||
    sourceNormalDenominator === null ||
    receiverNormalNumerator === null ||
    receiverNormalFactor === null ||
    unsignedReceiverNormalFactor === null
  ) {
    return {
      branchWeight: 0,
      sourceNormalDenominator: sourceNormalDenominator ?? 0,
      receiverNormalNumerator: receiverNormalNumerator ?? 0,
      receiverNormalFactor: receiverNormalFactor ?? 0,
      unsignedReceiverNormalFactor: unsignedReceiverNormalFactor ?? 0,
      evidenceStatus: "receiver_normal_branch_rows_missing",
    };
  }
  const expectedReceiverNormalFactor =
    receiverNormalNumerator / sourceNormalDenominator;
  if (
    branchWeight < 0 ||
    unsignedReceiverNormalFactor < 0 ||
    Math.abs(sourceNormalDenominator) <= 1e-12 ||
    !Number.isFinite(expectedReceiverNormalFactor) ||
    !closeScaled(receiverNormalFactor, expectedReceiverNormalFactor, 1e-9) ||
    !closeScaled(unsignedReceiverNormalFactor, Math.abs(receiverNormalFactor), 1e-9) ||
    !closeScaled(branchWeight, unsignedReceiverNormalFactor, 1e-9)
  ) {
    return {
      branchWeight: 0,
      sourceNormalDenominator,
      receiverNormalNumerator,
      receiverNormalFactor,
      unsignedReceiverNormalFactor,
      evidenceStatus: "receiver_normal_branch_rows_invalid",
    };
  }
  return {
    branchWeight,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    evidenceStatus: "ok",
  };
}

function computeMovingCircularObserverFieldContribution(branch = {}, index = 0, request = {}) {
  const signalSpeed = Math.max(1e-12, bridgeFiniteNumber(request.signalSpeed, 1));
  const direction = bridgeVector(branch.direction);
  const sourceVelocity = bridgeVector(branch.sourceVelocity);
  const chargeSign = bridgeFiniteNumber(branch.chargeSign, 0);
  const distance = Math.max(1e-12, bridgeFiniteNumber(branch.distance, 0));
  const sourceNormalSpeed = bridgeFiniteNumber(
    branch.sourceNormalSpeed,
    bridgeDot(sourceVelocity, direction)
  );
  const receiverNormalSpeed = bridgeFiniteNumber(branch.receiverNormalSpeed, 0);
  const receiverNormalCrossingFactor = bridgeFiniteNumber(branch.receiverNormalCrossingFactor, 0);
  const {
    branchWeight,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    evidenceStatus,
  } = resolveBridgeReceiverNormalRows(branch);
  const jacobian = sourceNormalDenominator;
  const jacobianAbs = Math.abs(jacobian);
  const electric = bridgeScaleVector(
    direction,
    chargeSign * branchWeight / (distance * distance)
  );
  const comparisonB = bridgeScaleVector(
    bridgeCrossVector({ x: 1, y: 0, z: 0 }, electric),
    1 / signalSpeed
  );
  return {
    branchIndex: index,
    delay: Math.max(0, bridgeFiniteNumber(branch.delay, 0)),
    distance,
    delaySolveGap: Math.abs(bridgeFiniteNumber(branch.residual, 0)),
    jacobian,
    jacobianAbs,
    branchWeight,
    sourceNormalSpeed,
    receiverNormalSpeed,
    sourceNormalDenominator,
    receiverNormalNumerator,
    receiverNormalCrossingFactor,
    receiverNormalFactor,
    unsignedReceiverNormalFactor,
    receiverNormalStatusCode: Number.isFinite(Number(branch.receiverNormalStatusCode))
      ? Number(branch.receiverNormalStatusCode)
      : evidenceStatus === "ok" ? 0 : -1,
    receiverNormalEvidenceStatus: evidenceStatus,
    sourceSpeedRatio: bridgeMagnitude(sourceVelocity) / signalSpeed,
    receiverAcceleration: electric,
    electric,
    comparisonB,
  };
}

function computeMovingCircularObserverFieldF64(request = {}) {
  const branches = Array.isArray(request.branches) ? request.branches : [];
  const contributions = branches.map((branch, index) =>
    computeMovingCircularObserverFieldContribution(branch, index, request)
  );
  const electric = contributions.reduce(
    (sum, contribution) => bridgeAddVector(sum, contribution.electric),
    { x: 0, y: 0, z: 0 }
  );
  const comparisonB = contributions.reduce(
    (sum, contribution) => bridgeAddVector(sum, contribution.comparisonB),
    { x: 0, y: 0, z: 0 }
  );
  const delaySum = contributions.reduce((sum, contribution) => sum + contribution.delay, 0);
  const distanceMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.distance),
    Number.POSITIVE_INFINITY
  );
  const delaySolveGapMax = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.delaySolveGap),
    0
  );
  const maxSourceSpeedRatio = contributions.reduce(
    (maximum, contribution) => Math.max(maximum, contribution.sourceSpeedRatio),
    0
  );
  const jacobianAbsMin = contributions.reduce(
    (minimum, contribution) => Math.min(minimum, contribution.jacobianAbs),
    Number.POSITIVE_INFINITY
  );
  const unstableContributionCount = contributions.filter(
    (contribution) =>
      contribution.receiverNormalEvidenceStatus !== "ok" ||
      contribution.delaySolveGap > bridgeFiniteNumber(request.unstableGapThreshold, 0.05) ||
      contribution.jacobianAbs <= Math.max(1e-12, bridgeFiniteNumber(request.jacobianFloor, 1e-4))
  ).length;
  const missingReceiverNormalCount = contributions.filter(
    (contribution) => contribution.receiverNormalEvidenceStatus !== "ok"
  ).length;
  const receiverNormalFailureCode = contributions.find(
    (contribution) => contribution.receiverNormalEvidenceStatus !== "ok"
  )?.receiverNormalEvidenceStatus;
  const status = createStatus(
    receiverNormalFailureCode ?? "ok",
    missingReceiverNormalCount > 0 ? "warn" : "ok",
    missingReceiverNormalCount > 0
      ? "moving-circular observer field has branches without complete receiver-normal branch rows"
      : "moving-circular observer field computed",
    missingReceiverNormalCount > 0 ? { details: { missingReceiverNormalCount } } : {}
  );
  return {
    schema: "solver-moving-circular-observer-field-f64.v1",
    sourceHistoryKind: "moving-circular-source",
    branchCount: branches.length,
    contributionCount: contributions.length,
    contributions,
    averageDelay: contributions.length > 0 ? delaySum / contributions.length : 0,
    delaySolveGapMax,
    maxSourceSpeedRatio,
    jacobianAbsMin: Number.isFinite(jacobianAbsMin) ? jacobianAbsMin : 0,
    unstableContributionCount,
    nearestSourceDistance: Number.isFinite(distanceMin) ? distanceMin : 0,
    receiverAcceleration: electric,
    electric,
    comparisonB,
    status,
    statuses: [status],
  };
}

function solveCircularSourceRootsHitsLedgerF64WithModule(module, request, abiInfo, ids = {}) {
  validateCircularSourceCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const maxHits = maxRoots;
  const maxLedgerRows = Math.max(DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS, maxRoots * 3 + 3);
  const requestPtr = module._malloc(abiInfo.circularSourceRootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const hitsPtr = module._malloc(abiInfo.delayedHitRowF64Bytes * maxHits);
  const ledgerRowsPtr = module._malloc(abiInfo.rootLedgerDetailRowF64Bytes * maxLedgerRows);
  const outRootCountPtr = module._malloc(4);
  const outHitCountPtr = module._malloc(4);
  const outLedgerRowCountPtr = module._malloc(4);

  try {
    writeCircularSourceCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outRootCountPtr, 0, "i32");
    module.setValue(outHitCountPtr, 0, "i32");
    module.setValue(outLedgerRowCountPtr, 0, "i32");
    const solve = module.cwrap(
      "architrino_solver_solve_circular_source_roots_hits_ledger_f64",
      "number",
      [
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
      ]
    );
    const status = solve(
      requestPtr,
      rootsPtr,
      maxRoots,
      outRootCountPtr,
      hitsPtr,
      maxHits,
      outHitCountPtr,
      ledgerRowsPtr,
      maxLedgerRows,
      outLedgerRowCountPtr
    );
    const rootCount = module.getValue(outRootCountPtr, "i32");
    const hitCount = module.getValue(outHitCountPtr, "i32");
    const ledgerRowCount = module.getValue(outLedgerRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus(
          "internal_solver_error",
          "halt",
          `circular-source roots-hits-ledger C ABI returned ${status}`,
          {
            recoverable: status === -3,
            details: {
              status,
              rootCount,
              hitCount,
              ledgerRowCount,
              maxRoots,
              maxHits,
              maxLedgerRows,
            },
          }
        )
      );
    }

    const roots = [];
    const hits = [];
    const rootLedgerDetails = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    for (let index = 0; index < hitCount; index += 1) {
      hits.push(readDelayedHitRowF64(module, hitsPtr + index * abiInfo.delayedHitRowF64Bytes));
    }
    for (let index = 0; index < ledgerRowCount; index += 1) {
      rootLedgerDetails.push(
        readRootLedgerDetailRowF64(
          module,
          ledgerRowsPtr + index * abiInfo.rootLedgerDetailRowF64Bytes,
          request.rootTolerance ?? 1e-12
        )
      );
    }
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes);
    const hitBuffer = copyWasmBytes(module, hitsPtr, hitCount * abiInfo.delayedHitRowF64Bytes);
    const rootLedgerBuffer = copyWasmBytes(
      module,
      ledgerRowsPtr,
      ledgerRowCount * abiInfo.rootLedgerDetailRowF64Bytes
    );
    const rootBufferDescriptor = createBufferDescriptor(
      "circular-source-root-ledger",
      "root_ledger.v1",
      roots.length,
      abiInfo.rootRowF64Bytes,
      rootBuffer
    );
    const hitBufferDescriptor = createBufferDescriptor(
      "circular-source-delayed-hit-events",
      "delayed_hit_events.v1",
      hits.length,
      abiInfo.delayedHitRowF64Bytes,
      hitBuffer
    );
    const rootLedgerDetailBuffer = createBufferDescriptor(
      "circular-source-root-ledger-detail",
      "root_ledger_detail.v1",
      rootLedgerDetails.length,
      abiInfo.rootLedgerDetailRowF64Bytes,
      rootLedgerBuffer
    );
    const circularStatus = createStatus(
      "ok",
      "info",
      "circular-source roots, delayed hits, and ledger rows solved natively",
      {
        runId: ids.runId,
        requestId: ids.requestId,
        details: {
          sourceModel: "circular-source",
          delayedHitProjection: "native-root-derived",
          rootLedgerDetailProjection: "native-circular-source-ledger",
          rootBracketAuthority: "native-root-bracket",
        },
      }
    );
    return {
      schema: "solver-circular-source-roots-hits-ledger-f64.v1",
      roots,
      hits,
      rootLedgerDetails,
      buffers: [rootBufferDescriptor, hitBufferDescriptor, rootLedgerDetailBuffer],
      streams: [
        createTransientStreamDescriptor(request.streamId ?? "causal-root-transient", request.hitTime, [
          rootBufferDescriptor,
          hitBufferDescriptor,
          rootLedgerDetailBuffer,
        ]),
      ],
      statuses: [circularStatus],
      status: createStatus("ok", "ok", "circular-source roots, delayed hits, and ledger rows solved", {
        runId: ids.runId,
        requestId: ids.requestId,
      }),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(hitsPtr);
    module._free(ledgerRowsPtr);
    module._free(outRootCountPtr);
    module._free(outHitCountPtr);
    module._free(outLedgerRowCountPtr);
  }
}

function solveCircularSourceRootsHitsLedgerNormalizedF64WithModule(module, request, abiInfo, ids = {}) {
  validateNormalizedCircularSourceRootsHitsLedgerF64Request(request);
  const localRequest = deepCloneJson(request.localRequest);
  const localResponse = solveCircularSourceRootsHitsLedgerF64WithModule(module, localRequest, abiInfo, ids);
  const coordinateOrigin = copyVector(request.coordinateOrigin);
  const roots = localResponse.roots.map((root) => ({
    ...root,
    coordinateFrame: "origin-normalized",
  }));
  const absoluteRoots = request.restoreAbsolutePoints === false
    ? undefined
    : roots.map((root) => restoreCausalRootAbsolutePoints(root, coordinateOrigin));
  const normalizedStatus = createStatus(
    "ok",
    "ok",
    "origin-normalized circular-source roots, hits, and ledger rows solved",
    {
      runId: ids.runId,
      requestId: ids.requestId,
      details: {
        coordinateFrame: "origin-normalized",
        coordinateOrigin,
        localRootCount: roots.length,
        localHitCount: localResponse.hits.length,
        localRootLedgerDetailCount: localResponse.rootLedgerDetails.length,
        absolutePointAuthority: request.restoreAbsolutePoints === false ? "omitted" : "display-only",
        localRootAuthority: "authoritative",
        localHitAuthority: "authoritative",
        localRootLedgerDetailAuthority: "authoritative",
      },
    }
  );
  return {
    schema: "solver-circular-source-roots-hits-ledger-normalized-f64.v1",
    coordinateFrame: "origin-normalized",
    coordinateOrigin,
    localRequest,
    roots,
    hits: localResponse.hits,
    rootLedgerDetails: localResponse.rootLedgerDetails,
    absoluteRoots,
    buffers: localResponse.buffers,
    streams: localResponse.streams,
    statuses: [...(localResponse.statuses ?? []), normalizedStatus],
    status: normalizedStatus,
  };
}

function createRunPrecisionRootsAndHitsRequest(rootRequest, ids = {}) {
  const requestedPrecisionPath =
    ids.precisionPath && DEFAULT_PRECISION_PATHS.includes(ids.precisionPath)
      ? ids.precisionPath
      : "auto";
  const claimLevel =
    ids.claimLevel && CLAIM_LEVEL_BY_ID.includes(ids.claimLevel)
      ? ids.claimLevel
      : "interactive-preview";
  return {
    rootRequest: deepCloneJson(rootRequest),
    requestedPrecisionPath,
    claimLevel,
    allowEscalation: true,
    runValidationReplay:
      requestedPrecisionPath === "validation_replay" || claimLevel === "validation-evidence",
    maxRoots: rootRequest?.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS,
    maxHits: rootRequest?.maxHits ?? rootRequest?.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS,
  };
}

function createPrecisionSolveRunStatus(rootsAndHits, ids = {}) {
  return createStatus(rootsAndHits.status.code, rootsAndHits.status.severity, rootsAndHits.status.message, {
    runId: ids.runId,
    requestId: ids.requestId,
    details: {
      ...rootsAndHits.precision,
      rootCount: rootsAndHits.roots.length,
      hitCount: rootsAndHits.hits.length,
    },
  });
}

function countSharedGeometryEvents(geometry) {
  if (!geometry || typeof geometry !== "object") {
    return 0;
  }
  return (
    (Array.isArray(geometry.pathBounds) ? geometry.pathBounds.length : 0) +
    (Array.isArray(geometry.spherePointIntersections) ? geometry.spherePointIntersections.length : 0) +
    (Array.isArray(geometry.delayedPotentials) ? geometry.delayedPotentials.length : 0) +
    (Array.isArray(geometry.circularSelfHitSpans) ? geometry.circularSelfHitSpans.length : 0)
  );
}

function countPlaybackPaths(frames) {
  return new Set(frames.map((frame) => frame.pathKey)).size;
}

function createRunManifestBase(request, admission, ids, threading) {
  const configHash = request.configHash || stableHashHex({
    configVersion: request.configVersion,
    config: request.config,
  });
  return {
    schema: "solver-run-manifest.v1",
    requestId: ids.requestId,
    runId: ids.runId,
    datasetId: ids.datasetId,
    appId: request.appId,
    runKind: request.runKind,
    claimLevel: request.claimLevel,
    configVersion: request.configVersion,
    configHash,
    model: deepCloneJson(request.model),
    envelope: deepCloneJson(request.envelope),
    capability: resolveCapabilityEnvelope(request.capability),
    errorBudget: deepCloneJson(request.errorBudget),
    requestedPrecisionPath: request.precisionPath,
    selectedPrecisionPath: admission.selectedPrecisionPath,
    output: deepCloneJson(request.output),
    threading: deepCloneJson(threading),
    admission: {
      decision: admission.decision,
      admitted: admission.admitted,
      stressSummary: deepCloneJson(admission.stressSummary),
      statuses: admission.statuses.map(copyStatusRecord),
    },
    provenance: {
      apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
      solverVersion: "0.1.0",
      bridge: "SolverAppBridge.mjs",
      wasmAbiVersion: "0.1.0",
      generatedAt: "deterministic-run-completion",
    },
    deterministic: Boolean(request.output?.deterministic),
    buffers: [],
    streams: [],
    diagnostics: [],
    status: createStatus("ok", "ok", "run manifest created", {
      runId: ids.runId,
      requestId: ids.requestId,
    }),
  };
}

function createRunThreadingPlan(request, capabilities) {
  return planThreadingPolicy(
    {
      policy: request.threadingPolicy ?? {
        mode: "single-thread",
        deterministic: request.output?.deterministic !== false,
      },
      workload: {
        stage: request.runKind,
        itemCount: estimateRunThreadingItemCount(request),
        minItemsPerWorker: 16,
        deterministicRequired: request.output?.deterministic !== false,
      },
    },
    capabilities
  );
}

function estimateRunThreadingItemCount(request) {
  if (request.runKind === "pathHistory" && Array.isArray(request.config?.pathRows)) {
    return request.config.pathRows.length;
  }
  if (request.runKind === "motionSimulation") {
    const motionRequest = request.config?.motionRequest ?? request.config?.motionIntegrationRequest;
    const start = motionRequest?.startTime;
    const end = motionRequest?.endTime;
    const step = motionRequest?.step;
    if (Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(step) && step > 0 && end >= start) {
      return Math.max(1, Math.floor((end - start) / step) + 1);
    }
  }
  return Math.max(1, request.envelope?.entityCount ?? 1);
}

function finalizeRunManifest(manifest, response) {
  const precisionMetadata = createRunPrecisionMetadata(manifest, response);
  const finalized = {
    ...manifest,
    precisionMetadata,
    buffers: response.buffers.map((buffer) => ({
      bufferId: buffer.bufferId,
      layout: buffer.layout,
      byteLength: buffer.byteLength,
      rowCount: buffer.rowCount,
      numericType: buffer.numericType,
      checksum: stableHashHex({
        bufferId: buffer.bufferId,
        layout: buffer.layout,
        byteLength: buffer.byteLength,
        rowCount: buffer.rowCount,
        numericType: buffer.numericType,
      }),
    })),
    streams: response.streams.map((stream) => ({
      streamId: stream.streamId,
      manifestVersion: stream.manifestVersion,
      indexLayout: stream.indexLayout,
      rangeCount: stream.availableRanges.length,
      storagePolicy: { ...stream.storagePolicy },
      metadata: createRunManifestStreamMetadata(stream, manifest, response, precisionMetadata),
    })),
    precision: response.precision == null ? undefined : deepCloneJson(response.precision),
    diagnostics: response.diagnostics.map((diagnostic) => ({ ...diagnostic })),
    status: copyStatusRecord(response.status),
  };
  const withValidationArtifacts = {
    ...finalized,
    validationArtifacts: createRunValidationArtifacts(finalized, response),
  };
  return {
    ...withValidationArtifacts,
    manifestHash: stableHashHex({
      ...withValidationArtifacts,
      manifestHash: undefined,
    }),
  };
}

function createRunPrecisionMetadata(manifest, response) {
  const explicitStreamMetadata = response.streams.find((stream) => stream?.metadata)?.metadata ?? {};
  const precision = response.precision && typeof response.precision === "object" ? response.precision : {};
  const numericType = normalizeMetadataEnum(
    precision.selectedNumericType,
    NUMERIC_TYPE_BY_ID,
    inferResponseNumericType(response),
    "response.precision.selectedNumericType"
  );
  const numericChart = normalizeMetadataEnum(
    precision.selectedNumericChart ?? explicitStreamMetadata.numericChart,
    NUMERIC_CHART_BY_ID,
    "absolute_f64",
    "response.precision.selectedNumericChart"
  );
  const errorBudget = manifest.errorBudget ?? {};
  return {
    schema: "solver-run-precision-metadata.v1",
    requestedPrecisionPath: manifest.requestedPrecisionPath,
    selectedPrecisionPath: manifest.selectedPrecisionPath,
    numericType,
    numericChart,
    unitConvention: normalizeMetadataString(
      manifest.model?.unitConvention ?? explicitStreamMetadata.units,
      "solver-units",
      "manifest.model.unitConvention"
    ),
    scaleNormalization: normalizeMetadataString(
      explicitStreamMetadata.scaleNormalization,
      "none",
      "precisionMetadata.scaleNormalization"
    ),
    globalErrorBudget: Number(errorBudget.globalTolerance) || 0,
    stageErrorBudgets: {
      rootIsolationTolerance: Number(errorBudget.rootIsolationTolerance) || 0,
      delayedHitTolerance: Number(errorBudget.delayedHitTolerance) || 0,
      integrationTolerance: Number(errorBudget.integrationTolerance) || 0,
      streamEncodingTolerance: Number(errorBudget.streamEncodingTolerance) || 0,
      readbackTolerance: Number(errorBudget.readbackTolerance) || 0,
      projectionTolerance: Number(errorBudget.projectionTolerance) || 0,
      displayTolerance: Number(errorBudget.displayTolerance) || 0,
    },
    claimLevel: manifest.claimLevel,
    valueAuthority: "authoritative",
  };
}

function createRunManifestStreamMetadata(stream, manifest, response, precisionMetadata) {
  const metadata = stream.metadata && typeof stream.metadata === "object" && !Array.isArray(stream.metadata)
    ? stream.metadata
    : {};
  const isPlaceholderMetadata = metadata.provenance?.source === "transient-stream";
  const numericType = normalizeMetadataEnum(
    isPlaceholderMetadata ? undefined : metadata.numericType,
    NUMERIC_TYPE_BY_ID,
    inferStreamNumericType(stream, response),
    "stream.metadata.numericType"
  );
  const appBufferAuthority =
    (isPlaceholderMetadata ? undefined : metadata.appBufferAuthority) ??
    (numericType === precisionMetadata.numericType ? "authoritative" : "approximate");
  return normalizePathHistoryStreamMetadata({
    ...metadata,
    precisionPath:
      isPlaceholderMetadata || metadata.precisionPath === "auto"
        ? precisionMetadata.selectedPrecisionPath
        : metadata.precisionPath ?? precisionMetadata.selectedPrecisionPath,
    numericType,
    numericChart:
      isPlaceholderMetadata ? precisionMetadata.numericChart : metadata.numericChart ?? precisionMetadata.numericChart,
    valueAuthority: (isPlaceholderMetadata ? undefined : metadata.valueAuthority) ?? "authoritative",
    appBufferAuthority,
    claimLevel: (isPlaceholderMetadata ? undefined : metadata.claimLevel) ?? precisionMetadata.claimLevel,
    units: (isPlaceholderMetadata ? undefined : metadata.units) ?? precisionMetadata.unitConvention,
    coordinateFrame: (isPlaceholderMetadata ? undefined : metadata.coordinateFrame) ?? "solver-frame",
    scaleNormalization:
      (isPlaceholderMetadata ? undefined : metadata.scaleNormalization) ?? precisionMetadata.scaleNormalization,
    interpolationRule: (isPlaceholderMetadata ? undefined : metadata.interpolationRule) ?? "stream-layout",
    provenance: isPlaceholderMetadata ? { source: "run-manifest-derived" } : metadata.provenance ?? { source: "run-manifest-derived" },
    diagnostics:
      metadata.diagnostics ??
      [
        createStatus("ok", "info", "stream precision metadata derived from run contract", {
          details: {
            selectedPrecisionPath: precisionMetadata.selectedPrecisionPath,
            numericType,
            numericChart: metadata.numericChart ?? precisionMetadata.numericChart,
          },
        }),
      ],
  });
}

function normalizeMetadataEnum(value, allowedValues, fallback, label) {
  if (value == null) {
    return fallback;
  }
  if (!allowedValues.includes(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is invalid`, {
        recoverable: false,
        details: { value, allowedValues },
      })
    );
  }
  return value;
}

function inferResponseNumericType(response) {
  const buffer = response.buffers.find((candidate) => candidate?.numericType);
  return buffer?.numericType ?? "f64";
}

function inferStreamNumericType(stream, response) {
  const streamByteLength = stream.availableRanges.reduce(
    (sum, range) => sum + Math.max(0, Number(range.byteRange?.end) - Number(range.byteRange?.start)),
    0
  );
  const buffer = response.buffers.find((candidate) => candidate?.byteLength === streamByteLength) ??
    response.buffers.find((candidate) => candidate?.numericType);
  return buffer?.numericType ?? "f64";
}

function createRunValidationArtifacts(manifest, response) {
  return {
    schema: "solver-run-validation-artifacts.v1",
    claimLevel: manifest.claimLevel,
    selectedPrecisionPath: manifest.selectedPrecisionPath,
    precisionReplayStatus: precisionReplayStatusFor(response.precision),
    migrationParityStatus: response.validationReplay?.classification ?? "not-run",
    toleranceVector: deepCloneJson(manifest.errorBudget),
    artifactHashes: {
      configHash: manifest.configHash,
      schemaVersionHash: stableHashHex(createRunSchemaVersionSummary(manifest)),
      statusTaxonomyHash: stableHashHex(STATUS_TAXONOMY),
      binaryLayoutHash: stableHashHex(createBinaryLayoutCatalog()),
      modelContractHash: stableHashHex(manifest.model),
      simulationEnvelopeHash: stableHashHex(manifest.envelope),
      capabilityEnvelopeHash: stableHashHex(manifest.capability),
      errorBudgetHash: stableHashHex(manifest.errorBudget),
      outputContractHash: stableHashHex(manifest.output),
      threadingHash: stableHashHex(manifest.threading),
      admissionHash: stableHashHex(manifest.admission),
      provenanceHash: stableHashHex(manifest.provenance),
      bufferHashes: manifest.buffers.map((buffer) => buffer.checksum),
      streamHashes: manifest.streams.map((stream) => stableHashHex(stream)),
      diagnosticHash: stableHashHex(manifest.diagnostics),
      summaryHash: stableHashHex(response.summary),
      responseStatusHash: stableHashHex(response.status),
    },
  };
}

function createRunSchemaVersionSummary(manifest) {
  return {
    runManifest: manifest.schema,
    validationArtifacts: "solver-run-validation-artifacts.v1",
    appBridgeApi: manifest.provenance.apiVersion,
    solverVersion: manifest.provenance.solverVersion,
    bufferLayouts: manifest.buffers.map((buffer) => buffer.layout),
    streamManifestVersions: manifest.streams.map((stream) => stream.manifestVersion),
    statusTaxonomy: STATUS_TAXONOMY.schema,
  };
}

function precisionReplayStatusFor(precision) {
  if (precision?.validationReplayRun !== true) {
    return "not-run";
  }
  return precision.validationReplayMatched ? "matched" : "mismatch";
}

function deepCloneJson(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function dropUndefinedProperties(value) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function copyStatusRecord(status) {
  return {
    code: status.code,
    severity: status.severity,
    message: status.message,
    runId: status.runId,
    requestId: status.requestId,
    stage: status.stage,
    recoverable: status.recoverable,
    details: status.details == null ? undefined : deepCloneJson(status.details),
  };
}

function stableHashHex(value) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const text = stableStringify(value);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= BigInt(text.charCodeAt(index) & 0xff);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function stableStringify(value) {
  if (value === undefined) {
    return "null";
  }
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const keys = Object.keys(value)
    .filter((key) => value[key] !== undefined)
    .sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
}

function toDiagnosticRecord(status) {
  return {
    code: status.code,
    severity: status.severity,
    message: status.message,
    stage: status.stage,
    details: status.details,
  };
}

function checkRootHitInvariantsF64(request) {
  validateRootHitInvariantRequest(request);
  const options = {
    ...DEFAULT_INVARIANT_CHECK_OPTIONS,
    ...(request.options || {}),
  };
  const roots = request.roots || [];
  const hits = request.hits || [];
  const statuses = [];

  roots.forEach((root, index) => {
    checkRootInvariant(root, index, options, statuses);
  });
  hits.forEach((hit, index) => {
    checkHitInvariant(hit, index, options, statuses);
  });

  const status = hasHaltOrError(statuses)
    ? createStatus(
        "validation_replay_mismatch",
        "error",
        "root and delayed-hit invariant check failed",
        {
          recoverable: false,
          details: {
            failureCount: statuses.filter((item) => item.severity === "error" || item.severity === "halt").length,
          },
        }
      )
    : createStatus("ok", "ok", "root and delayed-hit invariants passed");

  return {
    rootCount: roots.length,
    hitCount: hits.length,
    statuses: statuses.length > 0 ? statuses : [status],
    status,
  };
}

function checkRootInvariant(root, index, options, statuses) {
  const stage = `root-invariant[${index}]`;
  const expectedDelay = root.hitTime - root.emissionTime;
  if (!closeScaled(root.delay, expectedDelay, options.timeTolerance)) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "root delay does not match hit minus emission time", {
        stage,
        recoverable: false,
        details: { expectedDelay, actualDelay: root.delay },
      })
    );
  }
  if (root.delay < -options.timeTolerance) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "root delay is negative", {
        stage,
        recoverable: false,
      })
    );
  }

  const expectedDistance = vectorNorm(vectorSubtract(root.receiverPoint, root.sourcePoint));
  if (!closeScaled(root.distance, expectedDistance, options.distanceTolerance)) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "root distance does not match endpoints", {
        stage,
        recoverable: false,
        details: { expectedDistance, actualDistance: root.distance },
      })
    );
  }
  if (root.distance < -options.distanceTolerance) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "root distance is negative", {
        stage,
        recoverable: false,
      })
    );
  }
  if (Math.abs(root.residual) > options.rootResidualTolerance) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "root residual exceeds tolerance", {
        stage,
        recoverable: false,
        details: { residual: root.residual, tolerance: options.rootResidualTolerance },
      })
    );
  }
  if (!closeScaled(root.sourceNormalDenominator, root.jacobian, options.branchWeightTolerance)) {
    statuses.push(
      createStatus(
        "validation_replay_mismatch",
        "error",
        "root source normal denominator does not match Jacobian",
        {
          stage,
          recoverable: false,
          details: {
            sourceNormalDenominator: root.sourceNormalDenominator,
            jacobian: root.jacobian,
          },
        }
      )
    );
  }

  if (Math.abs(root.jacobian) <= options.smallJacobianTolerance) {
    if (root.statusCode !== STATUS_CODE_BY_ID.indexOf("small_jacobian")) {
      statuses.push(
        createStatus("validation_replay_mismatch", "error", "small-Jacobian root is not marked small_jacobian", {
          stage,
          recoverable: false,
        })
      );
    }
    return;
  }

  const expectedReceiverNormalFactor =
    root.receiverNormalNumerator / root.sourceNormalDenominator;
  if (
    !Number.isFinite(root.receiverNormalFactor) ||
    !closeScaled(root.receiverNormalFactor, expectedReceiverNormalFactor, options.branchWeightTolerance)
  ) {
    statuses.push(
      createStatus(
        "validation_replay_mismatch",
        "error",
        "root receiver normal factor does not match numerator over denominator",
        {
          stage,
          recoverable: false,
          details: {
            expectedReceiverNormalFactor,
            actualReceiverNormalFactor: root.receiverNormalFactor,
          },
        }
      )
    );
  }
  const expectedBranchWeight = Math.abs(expectedReceiverNormalFactor);
  if (!Number.isFinite(root.branchWeight) || !closeScaled(root.branchWeight, expectedBranchWeight, options.branchWeightTolerance)) {
    statuses.push(
      createStatus(
        "validation_replay_mismatch",
        "error",
        "root branch weight does not match unsigned receiver normal factor",
        {
          stage,
          recoverable: false,
          details: { expectedBranchWeight, actualBranchWeight: root.branchWeight },
        }
      )
    );
  }
  if (
    !Number.isFinite(root.unsignedReceiverNormalFactor) ||
    !closeScaled(root.unsignedReceiverNormalFactor, Math.abs(root.receiverNormalFactor), options.branchWeightTolerance)
  ) {
    statuses.push(
      createStatus(
        "validation_replay_mismatch",
        "error",
        "root unsigned receiver normal factor does not match magnitude",
        {
          stage,
          recoverable: false,
          details: {
            expectedUnsignedReceiverNormalFactor: Math.abs(root.receiverNormalFactor),
            actualUnsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
          },
        }
      )
    );
  }
}

function checkHitInvariant(hit, index, options, statuses) {
  const stage = `delayed-hit-invariant[${index}]`;
  if (hit.hitTime + options.timeTolerance < hit.emissionTime) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "delayed-hit time ordering is invalid", {
        stage,
        recoverable: false,
      })
    );
  }

  const displacement = vectorSubtract(hit.receiverPoint, hit.emissionPoint);
  const expectedDistance = vectorNorm(displacement);
  if (!closeScaled(hit.distance, expectedDistance, options.distanceTolerance)) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "delayed-hit distance does not match endpoints", {
        stage,
        recoverable: false,
        details: { expectedDistance, actualDistance: hit.distance },
      })
    );
  }
  if (hit.distance < -options.distanceTolerance) {
    statuses.push(
      createStatus("validation_replay_mismatch", "error", "delayed-hit distance is negative", {
        stage,
        recoverable: false,
      })
    );
  }
  if (!closeScaled(hit.sourceNormalDenominator, hit.jacobian, options.branchWeightTolerance)) {
    statuses.push(
      createStatus(
        "validation_replay_mismatch",
        "error",
        "delayed-hit source normal denominator does not match Jacobian",
        {
          stage,
          recoverable: false,
          details: {
            sourceNormalDenominator: hit.sourceNormalDenominator,
            jacobian: hit.jacobian,
          },
        }
      )
    );
  }

  if (hit.distance > options.distanceTolerance) {
    const directionNorm = vectorNorm(hit.unitDirection);
    if (!closeScaled(directionNorm, 1, options.directionTolerance)) {
      statuses.push(
        createStatus("validation_replay_mismatch", "error", "delayed-hit unit direction is not normalized", {
          stage,
          recoverable: false,
          details: { directionNorm },
        })
      );
    }
    const expectedDirection = {
      x: displacement.x / expectedDistance,
      y: displacement.y / expectedDistance,
      z: displacement.z / expectedDistance,
    };
    if (
      !closeScaled(hit.unitDirection.x, expectedDirection.x, options.directionTolerance) ||
      !closeScaled(hit.unitDirection.y, expectedDirection.y, options.directionTolerance) ||
      !closeScaled(hit.unitDirection.z, expectedDirection.z, options.directionTolerance)
    ) {
      statuses.push(
        createStatus(
          "validation_replay_mismatch",
          "error",
          "delayed-hit unit direction does not match endpoints",
          {
            stage,
            recoverable: false,
            details: { expectedDirection, actualDirection: hit.unitDirection },
          }
        )
      );
    }
  }

  if (Math.abs(hit.jacobian) > options.smallJacobianTolerance) {
    const expectedReceiverNormalFactor =
      hit.receiverNormalNumerator / hit.sourceNormalDenominator;
    if (
      !Number.isFinite(hit.receiverNormalFactor) ||
      !closeScaled(hit.receiverNormalFactor, expectedReceiverNormalFactor, options.branchWeightTolerance)
    ) {
      statuses.push(
        createStatus(
          "validation_replay_mismatch",
          "error",
          "delayed-hit receiver normal factor does not match numerator over denominator",
          {
            stage,
            recoverable: false,
            details: {
              expectedReceiverNormalFactor,
              actualReceiverNormalFactor: hit.receiverNormalFactor,
            },
          }
        )
      );
    }
    if (
      !Number.isFinite(hit.unsignedReceiverNormalFactor) ||
      !closeScaled(hit.unsignedReceiverNormalFactor, Math.abs(hit.receiverNormalFactor), options.branchWeightTolerance)
    ) {
      statuses.push(
        createStatus(
          "validation_replay_mismatch",
          "error",
          "delayed-hit unsigned receiver normal factor does not match magnitude",
          {
            stage,
            recoverable: false,
            details: {
              expectedUnsignedReceiverNormalFactor: Math.abs(hit.receiverNormalFactor),
              actualUnsignedReceiverNormalFactor: hit.unsignedReceiverNormalFactor,
            },
          }
        )
      );
    }
    const expectedStrength = Math.abs(expectedReceiverNormalFactor);
    if (!closeScaled(hit.strength, expectedStrength, options.branchWeightTolerance)) {
      statuses.push(
        createStatus(
          "validation_replay_mismatch",
          "error",
          "delayed-hit strength does not match unsigned receiver normal factor",
          {
            stage,
            recoverable: false,
            details: { expectedStrength, actualStrength: hit.strength },
          }
        )
      );
    }
  }
}

function vectorSubtract(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function vectorDot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function vectorNorm(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
}

function closeScaled(actual, expected, tolerance) {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  return Math.abs(actual - expected) <= tolerance * scale;
}

function classifyRootLedgerTransitionsF64(request) {
  validateRootLedgerTransitionRequest(request);
  const priorRows = request.priorRows || [];
  const nextRows = request.nextRows || [];

  if (priorRows.some(isRootLedgerFailureRow) || nextRows.some(isRootLedgerFailureRow)) {
    const rerunStatus = createStatus(
      "ledger_rerun_required",
      "halt",
      "root ledger transition classification requires a rerun",
      {
        stage: "root-ledger-transition",
        recoverable: false,
      }
    );
    return {
      transitions: [
        createRootLedgerTransition({
          kind: "ledger_rerun_required",
          prior: priorRows[0],
          next: nextRows[0],
          status: rerunStatus,
        }),
      ],
      statuses: [rerunStatus],
      status: rerunStatus,
    };
  }

  const priorActive = mapActiveRootLedgerRows(priorRows);
  const nextActive = mapActiveRootLedgerRows(nextRows);
  const transitions = [];

  for (const [rootKey, prior] of priorActive) {
    const next = nextActive.get(rootKey);
    if (!next) {
      transitions.push(
        createRootLedgerTransition({
          kind: "disappeared",
          prior,
          status: createStatus("root_not_bracketed", "info", "root disappeared from next ledger", {
            stage: "root-ledger-transition",
          }),
        })
      );
      continue;
    }
    transitions.push(
      createRootLedgerTransition({
        kind: isFoldTransition(prior, next) ? "folded" : "retained",
        prior,
        next,
        status: createStatus("ok", "ok", "root transition classified", {
          stage: "root-ledger-transition",
        }),
      })
    );
  }

  for (const [rootKey, next] of nextActive) {
    if (priorActive.has(rootKey)) {
      continue;
    }
    transitions.push(
      createRootLedgerTransition({
        kind: hasTailOverlap(priorRows, next) ? "assimilated_from_tail" : "appeared",
        next,
        status: createStatus("ok", "ok", "root transition classified", {
          stage: "root-ledger-transition",
        }),
      })
    );
  }

  transitions.sort((left, right) => left.transitionKey.localeCompare(right.transitionKey));
  const summaryStatus = createStatus("ok", "ok", "root ledger transitions classified", {
    stage: "root-ledger-transition",
    details: { transitionCount: transitions.length },
  });
  return {
    transitions,
    statuses: [summaryStatus],
    status: summaryStatus,
  };
}

function mapActiveRootLedgerRows(rows) {
  const active = new Map();
  rows.forEach((row) => {
    if (row.entryKind === ROOT_LEDGER_ENTRY_KIND.ACTIVE_ROOT && row.rootKey > 0) {
      active.set(row.rootKey, row);
    }
  });
  return active;
}

function isRootLedgerFailureRow(row) {
  return (
    row.entryKind === ROOT_LEDGER_ENTRY_KIND.FAILURE ||
    row.statusCode === STATUS_CODE_BY_ID.indexOf("insufficient_history_depth") ||
    row.statusCode === STATUS_CODE_BY_ID.indexOf("root_unresolved")
  );
}

function isFoldTransition(prior, next) {
  if (
    prior.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.NEAR_ZERO ||
    next.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.NEAR_ZERO
  ) {
    return true;
  }
  if (
    (prior.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.NEGATIVE &&
      next.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.POSITIVE) ||
    (prior.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.POSITIVE &&
      next.jacobianSignStratum === ROOT_LEDGER_JACOBIAN_SIGN_STRATUM.NEGATIVE)
  ) {
    return true;
  }
  const smallJacobian = STATUS_CODE_BY_ID.indexOf("small_jacobian");
  const transversalityFloor = STATUS_CODE_BY_ID.indexOf("transversality_floor_failed");
  return (
    prior.statusCode === smallJacobian ||
    next.statusCode === smallJacobian ||
    prior.statusCode === transversalityFloor ||
    next.statusCode === transversalityFloor
  );
}

function hasTailOverlap(rows, nextRoot) {
  return rows.some((row) => {
    return (
      row.entryKind === ROOT_LEDGER_ENTRY_KIND.TAIL_BOUNDARY &&
      row.sourceKey === nextRoot.sourceKey &&
      row.receiverKey === nextRoot.receiverKey &&
      rangesOverlap(row.intervalStart, row.intervalEnd, nextRoot.intervalStart, nextRoot.intervalEnd)
    );
  });
}

function rangesOverlap(leftStart, leftEnd, rightStart, rightEnd) {
  return (
    Number.isFinite(leftStart) &&
    Number.isFinite(leftEnd) &&
    Number.isFinite(rightStart) &&
    Number.isFinite(rightEnd) &&
    Math.max(leftStart, rightStart) <= Math.min(leftEnd, rightEnd)
  );
}

function createRootLedgerTransition({ kind, prior, next, status }) {
  const priorRootKey = prior?.rootKey || 0;
  const nextRootKey = next?.rootKey || 0;
  const sourceKey = next?.sourceKey ?? prior?.sourceKey ?? 0;
  const receiverKey = next?.receiverKey ?? prior?.receiverKey ?? 0;
  return {
    transitionKey: stableHashHex({
      kind,
      priorRootKey,
      nextRootKey,
      sourceKey,
      receiverKey,
    }),
    kind,
    priorRootKey,
    nextRootKey,
    sourceKey,
    receiverKey,
    intervalStart: prior?.intervalStart ?? next?.intervalStart ?? 0,
    intervalEnd: next?.intervalEnd ?? prior?.intervalEnd ?? 0,
    priorEntryKind: prior?.entryKind ?? 0,
    nextEntryKind: next?.entryKind ?? 0,
    priorStatusCode: prior?.statusCode ?? 0,
    nextStatusCode: next?.statusCode ?? 0,
    priorJacobianSignStratum: prior?.jacobianSignStratum ?? 0,
    nextJacobianSignStratum: next?.jacobianSignStratum ?? 0,
    status,
  };
}

function computePhaseAtHitF64WithModule(module, request, abiInfo) {
  validatePhaseAtHitRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const rootCount = request.roots.length;
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * rootCount);
  const sourceClockPtr = module._malloc(abiInfo.phaseClockF64Bytes);
  const receiverClockPtr = module._malloc(abiInfo.phaseClockF64Bytes);
  const metadataPtr = rootCount > 0 ? module._malloc(PHASE_AT_HIT_METADATA_F64_BYTES * rootCount) : 0;
  const rowsPtr = module._malloc(abiInfo.phaseAtHitRowF64Bytes * rootCount);
  const outRowCountPtr = module._malloc(4);
  try {
    request.roots.forEach((root, index) => {
      writeCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes, root);
    });
    for (let index = 0; index < rootCount; index += 1) {
      writePhaseAtHitMetadataF64(
        module,
        metadataPtr + index * PHASE_AT_HIT_METADATA_F64_BYTES,
        request.metadata?.[index]
      );
    }
    writePhaseClockF64(module, sourceClockPtr, request.sourceClock);
    writePhaseClockF64(module, receiverClockPtr, request.receiverClock);
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_compute_phase_at_hit_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(
      rootsPtr,
      rootCount,
      sourceClockPtr,
      receiverClockPtr,
      metadataPtr,
      rowsPtr,
      rootCount,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `phase-at-hit C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, rootCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readPhaseAtHitRowF64(module, rowsPtr + index * abiInfo.phaseAtHitRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.phaseAtHitRowF64Bytes);
    return {
      rows,
      buffers: [
        createBufferDescriptor(
          "phase-at-hit",
          "phase_at_hit.v1",
          rowCount,
          abiInfo.phaseAtHitRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "phase-at-hit diagnostics computed"),
    };
  } finally {
    module._free(rootsPtr);
    module._free(sourceClockPtr);
    module._free(receiverClockPtr);
    if (metadataPtr) {
      module._free(metadataPtr);
    }
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function validatePhaseAtHitRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.roots)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit roots array is required", {
        recoverable: false,
      })
    );
  }
  validatePhaseClock(request.sourceClock, "sourceClock");
  validatePhaseClock(request.receiverClock, "receiverClock");
  if (request.metadata != null) {
    if (!Array.isArray(request.metadata)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "phase-at-hit metadata must be an array", {
          recoverable: false,
        })
      );
    }
    if (request.metadata.length !== request.roots.length) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "phase-at-hit metadata must align with roots", {
          recoverable: false,
          details: { rootCount: request.roots.length, metadataCount: request.metadata.length },
        })
      );
    }
    request.metadata.forEach((metadata, index) => validatePhaseAtHitMetadata(metadata, `metadata[${index}]`));
  }
  request.roots.forEach((root, index) => {
    requireFiniteNumber(root.rootId, `roots[${index}].rootId`);
    requireFiniteNumber(root.statusCode, `roots[${index}].statusCode`);
    requireFiniteNumber(root.emissionTime, `roots[${index}].emissionTime`);
    requireFiniteNumber(root.hitTime, `roots[${index}].hitTime`);
  });
}

function validatePhaseClock(clock, label) {
  if (!clock || typeof clock !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requirePositiveFiniteNumber(clock.period, `${label}.period`);
  if (clock.epoch != null) {
    requireFiniteNumber(clock.epoch, `${label}.epoch`);
  }
  if (clock.phaseOffset != null) {
    requireFiniteNumber(clock.phaseOffset, `${label}.phaseOffset`);
  }
}

function validatePhaseAtHitMetadata(metadata, label) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireUint32(metadata.rootKind ?? 0, `${label}.rootKind`);
  requireUint32(metadata.sourceLayerCode ?? 0, `${label}.sourceLayerCode`);
  requireUint32(metadata.receiverLayerCode ?? 0, `${label}.receiverLayerCode`);
  requireUint32(metadata.sourceRoleCode ?? 0, `${label}.sourceRoleCode`);
  requireUint32(metadata.receiverRoleCode ?? 0, `${label}.receiverRoleCode`);
  requireChargeSign(metadata.sourceChargeSign ?? 0, `${label}.sourceChargeSign`);
  requireChargeSign(metadata.receiverChargeSign ?? 0, `${label}.receiverChargeSign`);
  requireUint32(metadata.stateFlags ?? 0, `${label}.stateFlags`);
}

function requireChargeSign(value, label) {
  if (!Number.isInteger(value) || value < -1 || value > 1) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be -1, 0, or 1`, {
        recoverable: false,
      })
    );
  }
}

function summarizePhaseAtHitsF64(request) {
  validatePhaseAtHitSummaryRequest(request);
  const rootIdStats = createNumericStats();
  const sourceCycleStats = createNumericStats();
  const receiverCycleStats = createNumericStats();
  const emissionTimeStats = createNumericStats();
  const hitTimeStats = createNumericStats();
  const sourcePhaseStats = createNumericStats();
  const receiverPhaseStats = createNumericStats();
  const phaseDeltaStats = createNumericStats();
  const phaseSpreadStats = createNumericStats();
  const statusCounts = new Map();

  request.rows.forEach((row) => {
    appendNumericStats(rootIdStats, row.rootId);
    appendNumericStats(sourceCycleStats, row.sourceCycleIndex);
    appendNumericStats(receiverCycleStats, row.receiverCycleIndex);
    appendNumericStats(emissionTimeStats, row.emissionTime);
    appendNumericStats(hitTimeStats, row.hitTime);
    appendNumericStats(sourcePhaseStats, row.sourcePhase);
    appendNumericStats(receiverPhaseStats, row.receiverPhase);
    appendNumericStats(phaseDeltaStats, row.phaseDelta);
    appendNumericStats(phaseSpreadStats, row.phaseSpread);
    statusCounts.set(row.statusCode, (statusCounts.get(row.statusCode) ?? 0) + 1);
  });

  return {
    summary: {
      schema: "solver-phase-at-hit-summary.v1",
      rowCount: request.rows.length,
      rootIdRange: finalizeNumericRange(rootIdStats),
      statusCounts: [...statusCounts.entries()]
        .sort(([left], [right]) => left - right)
        .map(([statusCode, rowCount]) => ({ statusCode, rowCount })),
      sourceCycleIndexRange: finalizeNumericRange(sourceCycleStats),
      receiverCycleIndexRange: finalizeNumericRange(receiverCycleStats),
      emissionTimeRange: finalizeNumericRange(emissionTimeStats),
      hitTimeRange: finalizeNumericRange(hitTimeStats),
      sourcePhaseRange: finalizeNumericRange(sourcePhaseStats),
      receiverPhaseRange: finalizeNumericRange(receiverPhaseStats),
      phaseDeltaRange: finalizeNumericRange(phaseDeltaStats),
      phaseSpreadRange: finalizeNumericRange(phaseSpreadStats),
      meanPhaseDelta: finalizeNumericMean(phaseDeltaStats),
      meanPhaseSpread: finalizeNumericMean(phaseSpreadStats),
      maxPhaseSpread: phaseSpreadStats.count > 0 ? phaseSpreadStats.max : 0,
    },
    status: createStatus("ok", "ok", "phase-at-hit summary computed"),
  };
}

function validatePhaseAtHitSummaryRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit summary request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.rows)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit summary rows array is required", {
        recoverable: false,
      })
    );
  }
  request.rows.forEach((row, index) => validatePhaseAtHitRow(row, `rows[${index}]`));
}

function validatePhaseAtHitRow(row, label) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(row.rootId, `${label}.rootId`);
  requireFiniteNumber(row.statusCode, `${label}.statusCode`);
  requireFiniteNumber(row.sourceCycleIndex, `${label}.sourceCycleIndex`);
  requireFiniteNumber(row.receiverCycleIndex, `${label}.receiverCycleIndex`);
  requireFiniteNumber(row.emissionTime, `${label}.emissionTime`);
  requireFiniteNumber(row.hitTime, `${label}.hitTime`);
  requireFiniteNumber(row.sourcePhase, `${label}.sourcePhase`);
  requireFiniteNumber(row.receiverPhase, `${label}.receiverPhase`);
  requireFiniteNumber(row.phaseDelta, `${label}.phaseDelta`);
  requireFiniteNumber(row.phaseSpread, `${label}.phaseSpread`);
  requireUint32(row.rootKind, `${label}.rootKind`);
  requireUint32(row.sourceLayerCode, `${label}.sourceLayerCode`);
  requireUint32(row.receiverLayerCode, `${label}.receiverLayerCode`);
  requireUint32(row.sourceRoleCode, `${label}.sourceRoleCode`);
  requireUint32(row.receiverRoleCode, `${label}.receiverRoleCode`);
  requireChargeSign(row.sourceChargeSign, `${label}.sourceChargeSign`);
  requireChargeSign(row.receiverChargeSign, `${label}.receiverChargeSign`);
  requireUint32(row.stateFlags, `${label}.stateFlags`);
  if (row.phaseSpread < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.phaseSpread must be nonnegative`, {
        recoverable: false,
      })
    );
  }
}

function createNumericStats() {
  return {
    count: 0,
    min: 0,
    max: 0,
    sum: 0,
  };
}

function appendNumericStats(stats, value) {
  if (stats.count === 0) {
    stats.min = value;
    stats.max = value;
  } else {
    stats.min = Math.min(stats.min, value);
    stats.max = Math.max(stats.max, value);
  }
  stats.sum += value;
  stats.count += 1;
}

function finalizeNumericRange(stats) {
  return stats.count > 0 ? { start: stats.min, end: stats.max } : { start: 0, end: 0 };
}

function finalizeNumericMean(stats) {
  return stats.count > 0 ? stats.sum / stats.count : 0;
}

function sampleLinearMotionF64WithModule(module, request, abiInfo) {
  validateLinearMotionSampleRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const estimatedFrames = estimateLinearMotionFrameCount(request);
  const maxFrames = request.maxFrames ?? Math.min(estimatedFrames, DEFAULT_MAX_MOTION_FRAMES);
  if (estimatedFrames > maxFrames) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "motion frame request exceeds frame buffer cap", {
        recoverable: true,
        details: { estimatedFrames, maxFrames },
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.motionSampleRequestF64Bytes);
  const framesPtr = module._malloc(abiInfo.motionFrameRowF64Bytes * maxFrames);
  const outFrameCountPtr = module._malloc(4);
  try {
    writeMotionSampleRequestF64(module, requestPtr, request);
    module.setValue(outFrameCountPtr, 0, "i32");
    const sample = module.cwrap("architrino_solver_sample_linear_motion_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = sample(requestPtr, framesPtr, maxFrames, outFrameCountPtr);
    const frameCount = module.getValue(outFrameCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `motion sampler C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, frameCount, maxFrames },
        })
      );
    }
    const frames = [];
    for (let index = 0; index < frameCount; index += 1) {
      frames.push(readMotionFrameRowF64(module, framesPtr + index * abiInfo.motionFrameRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, framesPtr, frameCount * abiInfo.motionFrameRowF64Bytes);
    return {
      frames,
      buffers: [
        createBufferDescriptor(
          "frame-buffer",
          "frame_buffer.v1",
          frameCount,
          abiInfo.motionFrameRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "linear motion sampled"),
    };
  } finally {
    module._free(requestPtr);
    module._free(framesPtr);
    module._free(outFrameCountPtr);
  }
}

function sampleLinearPathHistoryF64WithModule(module, request, abiInfo) {
  validateLinearMotionSampleRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const maxRows = request.endTime > request.startTime ? 1 : 0;
  const requestPtr = module._malloc(abiInfo.motionSampleRequestF64Bytes);
  const rowsPtr =
    maxRows > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * maxRows) : 0;
  const outRowCountPtr = module._malloc(4);
  try {
    writeMotionSampleRequestF64(module, requestPtr, request);
    module.setValue(outRowCountPtr, 0, "i32");
    const samplePathHistory = module.cwrap("architrino_solver_sample_linear_path_history_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = samplePathHistory(requestPtr, rowsPtr, maxRows, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `linear path-history C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, maxRows },
        })
      );
    }
    const buffer = rowCount > 0
      ? copyWasmBytes(module, rowsPtr, rowCount * abiInfo.pathHistoryRowF64Bytes)
      : new ArrayBuffer(0);
    const view = new DataView(buffer);
    const pathRows = [];
    for (let index = 0; index < rowCount; index += 1) {
      pathRows.push(
        readPathHistoryRowFromView(view, index * abiInfo.pathHistoryRowF64Bytes, 0, index)
      );
    }
    return {
      pathRows,
      buffers: [
        createBufferDescriptor(
          "linear-motion-path-history",
          "path_segment.v1",
          rowCount,
          abiInfo.pathHistoryRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "linear motion path history sampled"),
    };
  } finally {
    module._free(requestPtr);
    if (rowsPtr !== 0) {
      module._free(rowsPtr);
    }
    module._free(outRowCountPtr);
  }
}

function integrateConstantAccelerationMotionF64WithModule(module, request, abiInfo) {
  validateMotionIntegrationRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const estimatedFrames = estimateMotionFrameCount(request);
  const maxFrames = request.maxFrames ?? Math.min(estimatedFrames, DEFAULT_MAX_MOTION_FRAMES);
  if (estimatedFrames > maxFrames) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "motion integration request exceeds frame buffer cap", {
        recoverable: true,
        details: { estimatedFrames, maxFrames },
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.motionIntegrationRequestF64Bytes);
  const framesPtr = module._malloc(abiInfo.motionFrameRowF64Bytes * maxFrames);
  const outFrameCountPtr = module._malloc(4);
  try {
    writeMotionIntegrationRequestF64(module, requestPtr, request);
    module.setValue(outFrameCountPtr, 0, "i32");
    const integrate = module.cwrap("architrino_solver_integrate_constant_acceleration_motion_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = integrate(requestPtr, framesPtr, maxFrames, outFrameCountPtr);
    const frameCount = module.getValue(outFrameCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `motion integrator C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, frameCount, maxFrames },
        })
      );
    }
    const frames = [];
    for (let index = 0; index < frameCount; index += 1) {
      frames.push(readMotionFrameRowF64(module, framesPtr + index * abiInfo.motionFrameRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, framesPtr, frameCount * abiInfo.motionFrameRowF64Bytes);
    return {
      frames,
      buffers: [
        createBufferDescriptor(
          "frame-buffer",
          "frame_buffer.v1",
          frameCount,
          abiInfo.motionFrameRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "constant-acceleration motion integrated"),
    };
  } finally {
    module._free(requestPtr);
    module._free(framesPtr);
    module._free(outFrameCountPtr);
  }
}

function integrateConstantAccelerationPathHistoryF64WithModule(module, request, abiInfo, options = {}) {
  validateMotionIntegrationRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const estimatedRows = estimateMotionPathSegmentCount(request);
  const rowCap = options.maxRows ?? DEFAULT_MAX_MOTION_PATH_ROWS;
  const maxRows = Math.min(estimatedRows, rowCap);
  if (estimatedRows > maxRows) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "motion path-history request exceeds row buffer cap", {
        recoverable: true,
        details: { estimatedRows, maxRows, rowCap },
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.motionIntegrationRequestF64Bytes);
  const rowsPtr =
    maxRows > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * maxRows) : 0;
  const outRowCountPtr = module._malloc(4);
  try {
    writeMotionIntegrationRequestF64(module, requestPtr, request);
    module.setValue(outRowCountPtr, 0, "i32");
    const integratePathHistory = module.cwrap(
      "architrino_solver_integrate_constant_acceleration_path_history_f64",
      "number",
      ["number", "number", "number", "number"]
    );
    const status = integratePathHistory(requestPtr, rowsPtr, maxRows, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `motion path-history C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, maxRows },
        })
      );
    }
    const buffer = rowCount > 0
      ? copyWasmBytes(module, rowsPtr, rowCount * abiInfo.pathHistoryRowF64Bytes)
      : new ArrayBuffer(0);
    const view = new DataView(buffer);
    const pathRows = [];
    for (let index = 0; index < rowCount; index += 1) {
      pathRows.push(
        readPathHistoryRowFromView(view, index * abiInfo.pathHistoryRowF64Bytes, 0, index)
      );
    }
    return {
      pathRows,
      buffers: [
        createBufferDescriptor(
          "motion-path-history",
          "path_segment.v1",
          rowCount,
          abiInfo.pathHistoryRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "constant-acceleration path history integrated"),
    };
  } finally {
    module._free(requestPtr);
    if (rowsPtr !== 0) {
      module._free(rowsPtr);
    }
    module._free(outRowCountPtr);
  }
}

function integratePairInteractionMotionF64WithModule(module, request, options = {}) {
  const normalized = normalizePairInteractionReplayRequest(request);
  const abiInfo = options.abiInfo ?? getStaticAbiInfo();
  if (typeof module?._malloc !== "function" || typeof module?._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const times = createPairInteractionSampleTimes(normalized);
  const maxSampleFrames = normalized.maxFrames ?? Math.min(times.length, DEFAULT_MAX_MOTION_FRAMES);
  if (times.length > maxSampleFrames) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "pair interaction request exceeds frame buffer cap", {
        recoverable: true,
        details: { estimatedFrames: times.length, maxFrames: maxSampleFrames },
      })
    );
  }

  const stateCount = normalized.initialStates.length;
  const pathConstraintCount = normalized.pathConstraints.length;
  const maxFrameRows = maxSampleFrames * stateCount;
  const estimatedPathRows = Math.max(0, times.length - 1) * stateCount;
  const requestPtr = module._malloc(abiInfo.pairInteractionRequestF64Bytes);
  const statesPtr = module._malloc(PAIR_INTERACTION_STATE_F64_BYTES * stateCount);
  const pathConstraintsPtr = pathConstraintCount > 0
    ? module._malloc(PAIR_INTERACTION_PATH_CONSTRAINT_F64_BYTES * pathConstraintCount)
    : 0;
  const framesPtr = maxFrameRows > 0 ? module._malloc(abiInfo.motionFrameRowF64Bytes * maxFrameRows) : 0;
  const pathRowsPtr =
    estimatedPathRows > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * estimatedPathRows) : 0;
  const outFrameCountPtr = module._malloc(4);
  const outPathRowCountPtr = module._malloc(4);
  const summaryPtr = module._malloc(PAIR_INTERACTION_SUMMARY_F64_BYTES);
  try {
    writePairInteractionRequestF64(module, requestPtr, normalized);
    normalized.initialStates.forEach((state, index) => {
      writePairInteractionStateF64(
        module,
        statesPtr + index * PAIR_INTERACTION_STATE_F64_BYTES,
        state
      );
    });
    normalized.pathConstraints.forEach((constraint, index) => {
      writePairInteractionPathConstraintF64(
        module,
        pathConstraintsPtr + index * PAIR_INTERACTION_PATH_CONSTRAINT_F64_BYTES,
        constraint
      );
    });
    module.setValue(outFrameCountPtr, 0, "i32");
    module.setValue(outPathRowCountPtr, 0, "i32");
    writeZeroBytes(module, summaryPtr, PAIR_INTERACTION_SUMMARY_F64_BYTES);
    const integratePairInteraction = module.cwrap(
      "architrino_solver_integrate_pair_interaction_motion_f64",
      "number",
      [
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
        "number",
      ]
    );
    const status = integratePairInteraction(
      requestPtr,
      statesPtr,
      stateCount,
      pathConstraintsPtr,
      pathConstraintCount,
      framesPtr,
      maxFrameRows,
      outFrameCountPtr,
      pathRowsPtr,
      estimatedPathRows,
      outPathRowCountPtr,
      summaryPtr
    );
    const frameCount = module.getValue(outFrameCountPtr, "i32");
    const pathRowCount = module.getValue(outPathRowCountPtr, "i32");
    const nativeSummary = readPairInteractionSummaryF64(module, summaryPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `pair interaction C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, frameCount, pathRowCount, maxFrameRows, estimatedPathRows },
        })
      );
    }

    const frames = [];
    for (let index = 0; index < frameCount; index += 1) {
      frames.push(readMotionFrameRowF64(module, framesPtr + index * abiInfo.motionFrameRowF64Bytes));
    }
    const frameBuffer = copyWasmBytes(module, framesPtr, frameCount * abiInfo.motionFrameRowF64Bytes);
    const pathRowsBuffer = pathRowCount > 0
      ? copyWasmBytes(module, pathRowsPtr, pathRowCount * abiInfo.pathHistoryRowF64Bytes)
      : new ArrayBuffer(0);
    const pathRowsView = new DataView(pathRowsBuffer);
    const pathRows = [];
    for (let index = 0; index < pathRowCount; index += 1) {
      pathRows.push(
        readPathHistoryRowFromView(pathRowsView, index * abiInfo.pathHistoryRowF64Bytes, 0, index)
      );
    }
    const pathConstraintGuidanceMode = nativeSummary.guidanceSampleCount > 0
      ? PAIR_INTERACTION_PATH_CONSTRAINT_GUIDANCE_MODE
      : undefined;
    const pathConstraintBoundaryMode = createPairInteractionPathConstraintBoundaryMode(normalized);
    const nativeBoundaryRelaxationResidualBefore = {
      pathConstraintBoundaryRelaxationResidualSampleCount:
        nativeSummary.boundaryRelaxationResidualSampleCount,
      pathConstraintBoundaryRelaxationResidualMode:
        nativeSummary.boundaryResidualMode,
      maxPathConstraintBoundaryRelaxationResidual:
        nativeSummary.maxBoundaryRelaxationResidualBefore,
      meanPathConstraintBoundaryRelaxationResidual:
        nativeSummary.meanBoundaryRelaxationResidualBefore,
      rmsPathConstraintBoundaryRelaxationResidual:
        nativeSummary.rmsBoundaryRelaxationResidualBefore,
    };
    const nativeBoundaryRelaxationResidualAfter = {
      pathConstraintBoundaryRelaxationResidualSampleCount:
        nativeSummary.boundaryRelaxationResidualSampleCount,
      pathConstraintBoundaryRelaxationResidualMode:
        nativeSummary.boundaryResidualMode,
      maxPathConstraintBoundaryRelaxationResidual:
        nativeSummary.maxBoundaryRelaxationResidualAfter,
      meanPathConstraintBoundaryRelaxationResidual:
        nativeSummary.meanBoundaryRelaxationResidualAfter,
      rmsPathConstraintBoundaryRelaxationResidual:
        nativeSummary.rmsBoundaryRelaxationResidualAfter,
    };
    const nativeBoundaryRelaxationRun = {
      pathConstraintBoundaryRelaxationAppliedIterationCount:
        nativeSummary.boundaryRelaxationAppliedIterationCount,
      pathConstraintBoundaryRelaxationStopReason:
        nativeSummary.boundaryRelaxationStopReason,
      pathConstraintBoundaryRelaxationMaxStep:
        nativeSummary.boundaryRelaxationMaxStep,
      pathConstraintBoundaryRelaxationFinalStepFactor:
        nativeSummary.boundaryRelaxationFinalStepFactor,
      pathConstraintBoundaryRelaxationSelectedCandidateKind:
        nativeSummary.boundaryRelaxationSelectedCandidateKind,
      pathConstraintBoundaryRelaxationCenterOfMassSelectedCount:
        nativeSummary.boundaryRelaxationCenterOfMassSelectedCount,
      pathConstraintBoundaryRelaxationCandidateVariantCount:
        nativeSummary.boundaryRelaxationCandidateVariantCount,
      pathConstraintBoundaryRelaxationLineSearchTrialCount:
        nativeSummary.boundaryRelaxationLineSearchTrialCount,
      pathConstraintBoundaryRelaxationCandidateKindMask:
        nativeSummary.boundaryRelaxationCandidateKindMask,
    };
    const nativeBoundaryRelaxationStatus = getPairInteractionBoundaryRelaxationStatus(
      nativeBoundaryRelaxationResidualBefore,
      nativeBoundaryRelaxationResidualAfter,
      normalized,
      nativeBoundaryRelaxationRun,
    );
    const boundaryRelaxationMetadata = createPairInteractionBoundaryRelaxationMetadata(
      normalized,
      nativeBoundaryRelaxationResidualBefore,
      nativeBoundaryRelaxationResidualAfter,
      nativeBoundaryRelaxationStatus,
      nativeBoundaryRelaxationRun,
    );
    const nativeBoundarySummary = {
      pathConstraintBoundaryResidualSampleCount: nativeSummary.boundaryResidualSampleCount,
      pathConstraintBoundaryResidualMode:
        nativeSummary.boundaryResidualMode,
      maxPathConstraintBoundaryResidual: nativeSummary.maxBoundaryResidual,
    };
    const nativePositionSummary = {
      pathConstraintPositionResidualSampleCount: nativeSummary.positionResidualSampleCount,
      maxPathConstraintPositionResidual: nativeSummary.maxPositionResidual,
    };
    const nativeInitialVelocitySummary = {
      pathConstraintInitialVelocityResidualSampleCount:
        nativeSummary.initialVelocityResidualSampleCount,
      maxPathConstraintInitialVelocityResidual: nativeSummary.maxInitialVelocityResidual,
      meanPathConstraintInitialVelocityResidual: nativeSummary.meanInitialVelocityResidual,
      rmsPathConstraintInitialVelocityResidual: nativeSummary.rmsInitialVelocityResidual,
    };
    const constraintSolverMetadata = createPairInteractionConstraintSolverMetadata(
      nativeSummary.pathConstraintCount,
      nativeSummary.guidanceSampleCount,
      nativeSummary.boundarySeedSampleCount,
      nativeBoundaryRelaxationStatus,
      nativePositionSummary,
      normalized,
      nativeInitialVelocitySummary,
      nativeBoundarySummary,
    );
    const nativeGuidanceSummary = {
      pathConstraintGuidanceSampleCount: nativeSummary.guidanceSampleCount,
      maxPathConstraintGuidanceAcceleration: nativeSummary.maxGuidanceAcceleration,
    };
    const physicalBoundarySolverMetadata = createPairInteractionPhysicalBoundarySolverMetadata(
      nativeSummary.pathConstraintCount,
      nativeGuidanceSummary,
      nativeBoundaryRelaxationStatus,
      nativePositionSummary,
      normalized,
      nativeInitialVelocitySummary,
      nativeBoundarySummary,
    );
    const boundaryResidualAcceptanceMetadata = createPairInteractionBoundaryResidualAcceptanceMetadata(
      nativeBoundarySummary,
      normalized,
    );
    const positionResidualAcceptanceMetadata = createPairInteractionPositionResidualAcceptanceMetadata(
      nativePositionSummary,
      normalized,
    );
    const initialVelocityResidualAcceptanceMetadata =
      createPairInteractionInitialVelocityResidualAcceptanceMetadata(
        nativeInitialVelocitySummary,
        normalized,
      );
    const guidanceAccelerationAcceptanceMetadata =
      createPairInteractionGuidanceAccelerationAcceptanceMetadata(nativeGuidanceSummary, normalized);
    enforcePairInteractionPositionResidualTolerance(nativePositionSummary, normalized, {
      ...options,
      executionPath: "native_c_abi",
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
    });
    enforcePairInteractionBoundaryResidualTolerance(nativeBoundarySummary, normalized, {
      ...options,
      executionPath: "native_c_abi",
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
    });
    enforcePairInteractionInitialVelocityResidualTolerance(nativeInitialVelocitySummary, normalized, {
      ...options,
      executionPath: "native_c_abi",
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
    });
    enforcePairInteractionGuidanceAccelerationTolerance(nativeGuidanceSummary, normalized, {
      ...options,
      executionPath: "native_c_abi",
      pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
      pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
    });
    const pairStatus = createStatus("ok", "ok", "native pair interaction paths integrated", {
      details: {
        requestedPrecisionPath: options.requestedPrecisionPath,
        precisionPath: options.precisionPath,
        interactionLaw: normalized.interactionLaw,
        ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
        ...(Number.isFinite(normalized.signalSpeed)
          ? { signalSpeed: normalized.signalSpeed }
          : {}),
        stepCount: Math.max(0, times.length - 1),
        pathConstraintFrameRefinementSampleCount:
          nativeSummary.frameRefinementSampleCount,
        executionPath: "native_c_abi",
        pathConstraintCount: nativeSummary.pathConstraintCount,
        pathConstraintPositionResidualSampleCount: nativeSummary.positionResidualSampleCount,
        maxPathConstraintPositionResidual: nativeSummary.maxPositionResidual,
        meanPathConstraintPositionResidual: nativeSummary.meanPositionResidual,
        rmsPathConstraintPositionResidual: nativeSummary.rmsPositionResidual,
        pathConstraintInitialVelocityResidualSampleCount:
          nativeSummary.initialVelocityResidualSampleCount,
        maxPathConstraintInitialVelocityResidual: nativeSummary.maxInitialVelocityResidual,
        meanPathConstraintInitialVelocityResidual: nativeSummary.meanInitialVelocityResidual,
        rmsPathConstraintInitialVelocityResidual: nativeSummary.rmsInitialVelocityResidual,
        ...positionResidualAcceptanceMetadata,
        ...initialVelocityResidualAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintPositionResidualTolerance)
          ? { pathConstraintPositionResidualTolerance: normalized.pathConstraintPositionResidualTolerance }
          : {}),
        ...(Number.isFinite(normalized.pathConstraintInitialVelocityResidualTolerance)
          ? {
              pathConstraintInitialVelocityResidualTolerance:
                normalized.pathConstraintInitialVelocityResidualTolerance,
            }
          : {}),
        pathConstraintResidualSampleCount: nativeSummary.residualSampleCount,
        maxPathConstraintResidual: nativeSummary.maxConstraintResidual,
        meanPathConstraintResidual: nativeSummary.meanConstraintResidual,
        rmsPathConstraintResidual: nativeSummary.rmsConstraintResidual,
        pathConstraintGuidanceSampleCount: nativeSummary.guidanceSampleCount,
        pathConstraintGuidanceMode,
        pathConstraintBoundaryMode,
        ...(nativeSummary.boundarySeedSampleCount > 0
          ? {
              pathConstraintBoundarySeedMode: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_SEED_MODE,
              pathConstraintBoundarySeedSampleCount: nativeSummary.boundarySeedSampleCount,
            }
          : {}),
        ...boundaryRelaxationMetadata,
        pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
        pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
        ...physicalBoundarySolverMetadata,
        maxPathConstraintGuidanceAcceleration: nativeSummary.maxGuidanceAcceleration,
        meanPathConstraintGuidanceAcceleration: nativeSummary.meanGuidanceAcceleration,
        rmsPathConstraintGuidanceAcceleration: nativeSummary.rmsGuidanceAcceleration,
        ...guidanceAccelerationAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintGuidanceAccelerationTolerance)
          ? {
              pathConstraintGuidanceAccelerationTolerance:
                normalized.pathConstraintGuidanceAccelerationTolerance,
            }
          : {}),
        pathConstraintBoundaryResidualSampleCount: nativeSummary.boundaryResidualSampleCount,
        pathConstraintBoundaryResidualMode:
          nativeSummary.boundaryResidualMode,
        maxPathConstraintBoundaryResidual: nativeSummary.maxBoundaryResidual,
        meanPathConstraintBoundaryResidual: nativeSummary.meanBoundaryResidual,
        rmsPathConstraintBoundaryResidual: nativeSummary.rmsBoundaryResidual,
        ...boundaryResidualAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintBoundaryResidualTolerance)
          ? { pathConstraintBoundaryResidualTolerance: normalized.pathConstraintBoundaryResidualTolerance }
          : {}),
      },
    });
    return {
      frames,
      pathRows,
      buffers: [
        createBufferDescriptor(
          "pair-interaction-frame-buffer",
          "frame_buffer.v1",
          frameCount,
          abiInfo.motionFrameRowF64Bytes,
          frameBuffer
        ),
      ],
      summary: {
        runId: options.runId,
        claimLevel: options.claimLevel,
        precisionPath: options.precisionPath,
        frameCount,
        pathCount: stateCount,
        pathRowCount,
        stepCount: Math.max(0, times.length - 1),
        pathConstraintFrameRefinementSampleCount:
          nativeSummary.frameRefinementSampleCount,
        interactionLaw: normalized.interactionLaw,
        ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
        ...(Number.isFinite(normalized.signalSpeed)
          ? { signalSpeed: normalized.signalSpeed }
          : {}),
        executionPath: "native_c_abi",
        pathConstraintCount: nativeSummary.pathConstraintCount,
        pathConstraintPositionResidualSampleCount: nativeSummary.positionResidualSampleCount,
        maxPathConstraintPositionResidual: nativeSummary.maxPositionResidual,
        meanPathConstraintPositionResidual: nativeSummary.meanPositionResidual,
        rmsPathConstraintPositionResidual: nativeSummary.rmsPositionResidual,
        pathConstraintInitialVelocityResidualSampleCount:
          nativeSummary.initialVelocityResidualSampleCount,
        maxPathConstraintInitialVelocityResidual: nativeSummary.maxInitialVelocityResidual,
        meanPathConstraintInitialVelocityResidual: nativeSummary.meanInitialVelocityResidual,
        rmsPathConstraintInitialVelocityResidual: nativeSummary.rmsInitialVelocityResidual,
        ...positionResidualAcceptanceMetadata,
        ...initialVelocityResidualAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintPositionResidualTolerance)
          ? { pathConstraintPositionResidualTolerance: normalized.pathConstraintPositionResidualTolerance }
          : {}),
        ...(Number.isFinite(normalized.pathConstraintInitialVelocityResidualTolerance)
          ? {
              pathConstraintInitialVelocityResidualTolerance:
                normalized.pathConstraintInitialVelocityResidualTolerance,
            }
          : {}),
        pathConstraintResidualSampleCount: nativeSummary.residualSampleCount,
        maxPathConstraintResidual: nativeSummary.maxConstraintResidual,
        meanPathConstraintResidual: nativeSummary.meanConstraintResidual,
        rmsPathConstraintResidual: nativeSummary.rmsConstraintResidual,
        pathConstraintGuidanceSampleCount: nativeSummary.guidanceSampleCount,
        pathConstraintGuidanceMode,
        pathConstraintBoundaryMode,
        ...(nativeSummary.boundarySeedSampleCount > 0
          ? {
              pathConstraintBoundarySeedMode: PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_SEED_MODE,
              pathConstraintBoundarySeedSampleCount: nativeSummary.boundarySeedSampleCount,
            }
          : {}),
        ...boundaryRelaxationMetadata,
        pathConstraintSolverStatus: constraintSolverMetadata.pathConstraintSolverStatus,
        pathConstraintSolverClaim: constraintSolverMetadata.pathConstraintSolverClaim,
        ...physicalBoundarySolverMetadata,
        maxPathConstraintGuidanceAcceleration: nativeSummary.maxGuidanceAcceleration,
        meanPathConstraintGuidanceAcceleration: nativeSummary.meanGuidanceAcceleration,
        rmsPathConstraintGuidanceAcceleration: nativeSummary.rmsGuidanceAcceleration,
        ...guidanceAccelerationAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintGuidanceAccelerationTolerance)
          ? {
              pathConstraintGuidanceAccelerationTolerance:
                normalized.pathConstraintGuidanceAccelerationTolerance,
            }
          : {}),
        pathConstraintBoundaryResidualSampleCount: nativeSummary.boundaryResidualSampleCount,
        pathConstraintBoundaryResidualMode:
          nativeSummary.boundaryResidualMode,
        maxPathConstraintBoundaryResidual: nativeSummary.maxBoundaryResidual,
        meanPathConstraintBoundaryResidual: nativeSummary.meanBoundaryResidual,
        rmsPathConstraintBoundaryResidual: nativeSummary.rmsBoundaryResidual,
        ...boundaryResidualAcceptanceMetadata,
        ...(Number.isFinite(normalized.pathConstraintBoundaryResidualTolerance)
          ? { pathConstraintBoundaryResidualTolerance: normalized.pathConstraintBoundaryResidualTolerance }
          : {}),
      },
      status: pairStatus,
      pathCount: stateCount,
      stepCount: Math.max(0, times.length - 1),
      interactionLaw: normalized.interactionLaw,
      ...PAIR_INTERACTION_EOM_EVIDENCE_METADATA,
      ...(Number.isFinite(normalized.signalSpeed)
        ? { signalSpeed: normalized.signalSpeed }
        : {}),
      executionPath: "native_c_abi",
    };
  } finally {
    module._free(requestPtr);
    module._free(statesPtr);
    if (pathConstraintsPtr !== 0) {
      module._free(pathConstraintsPtr);
    }
    if (framesPtr !== 0) {
      module._free(framesPtr);
    }
    if (pathRowsPtr !== 0) {
      module._free(pathRowsPtr);
    }
    module._free(outFrameCountPtr);
    module._free(outPathRowCountPtr);
    module._free(summaryPtr);
  }
}

function stepT3UniverseF64WithModule(module, request, abiInfo) {
  const normalized = normalizeT3StepRequest(request);
  if (typeof module?._malloc !== "function" || typeof module?._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const stateCount = normalized.particles.length;
  const maxRows = normalized.maxRows ?? stateCount;
  const unresolvedRootSegmentSidecar = normalized.unresolvedRootSegmentSidecar;
  const maxUnresolvedRootSegmentRows = unresolvedRootSegmentSidecar.enabled
    ? unresolvedRootSegmentSidecar.maxRows
    : 0;
  const maxRetainedCausalRootReplayRows = maxUnresolvedRootSegmentRows;
  if (maxRows < stateCount) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "T3 bulk step row buffer is too small", {
        recoverable: true,
        details: { stateCount, maxRows },
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.t3StepRequestF64Bytes);
  const statesPtr = module._malloc(Math.max(1, stateCount) * abiInfo.t3ParticleStateF64Bytes);
  const rowsPtr = maxRows > 0 ? module._malloc(abiInfo.t3ParticleStepRowF64Bytes * maxRows) : 0;
  const unresolvedRootSegmentRowsPtr = maxUnresolvedRootSegmentRows > 0
    ? module._malloc(
        abiInfo.t3UnresolvedRootSegmentRowF64Bytes * maxUnresolvedRootSegmentRows
      )
    : 0;
  const retainedCausalRootReplayRowsPtr = maxRetainedCausalRootReplayRows > 0
    ? module._malloc(
        abiInfo.t3RetainedCausalRootReplayRowF64Bytes * maxRetainedCausalRootReplayRows
      )
    : 0;
  const outRowCountPtr = module._malloc(4);
  const outUnresolvedRootSegmentRowCountPtr = module._malloc(4);
  const outRetainedCausalRootReplayRowCountPtr = module._malloc(4);
  const summaryPtr = module._malloc(abiInfo.t3StepSummaryF64Bytes);
  try {
    writeT3StepRequestF64(module, requestPtr, normalized);
    normalized.particles.forEach((particle, index) => {
      writeT3ParticleStateF64(
        module,
        statesPtr + index * abiInfo.t3ParticleStateF64Bytes,
        particle
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    module.setValue(outUnresolvedRootSegmentRowCountPtr, 0, "i32");
    module.setValue(outRetainedCausalRootReplayRowCountPtr, 0, "i32");
    writeZeroBytes(module, summaryPtr, abiInfo.t3StepSummaryF64Bytes);
    const stepT3 = module.cwrap("architrino_solver_step_t3_universe_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = stepT3(
      requestPtr,
      statesPtr,
      stateCount,
      rowsPtr,
      maxRows,
      outRowCountPtr,
      summaryPtr,
      unresolvedRootSegmentRowsPtr,
      maxUnresolvedRootSegmentRows,
      outUnresolvedRootSegmentRowCountPtr,
      retainedCausalRootReplayRowsPtr,
      maxRetainedCausalRootReplayRows,
      outRetainedCausalRootReplayRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    const unresolvedRootSegmentRowCount = module.getValue(
      outUnresolvedRootSegmentRowCountPtr,
      "i32"
    );
    const retainedCausalRootReplayRowCount = module.getValue(
      outRetainedCausalRootReplayRowCountPtr,
      "i32"
    );
    const summary = readT3StepSummaryF64(module, summaryPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `T3 bulk step C ABI returned ${status}`, {
          recoverable: status === -3,
          details: {
            status,
            rowCount,
            maxRows,
            unresolvedRootSegmentRowCount,
            maxUnresolvedRootSegmentRows,
            retainedCausalRootReplayRowCount,
            maxRetainedCausalRootReplayRows,
            stateCount,
          },
        })
      );
    }

    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readT3ParticleStepRowF64(
        module,
        rowsPtr + index * abiInfo.t3ParticleStepRowF64Bytes
      ));
    }
    const unresolvedRootSegmentRows = [];
    for (let index = 0; index < unresolvedRootSegmentRowCount; index += 1) {
      unresolvedRootSegmentRows.push(readT3UnresolvedRootSegmentRowF64(
        module,
        unresolvedRootSegmentRowsPtr +
          index * abiInfo.t3UnresolvedRootSegmentRowF64Bytes
      ));
    }
    const retainedCausalRootReplayRows = [];
    for (let index = 0; index < retainedCausalRootReplayRowCount; index += 1) {
      retainedCausalRootReplayRows.push(readT3RetainedCausalRootReplayRowF64(
        module,
        retainedCausalRootReplayRowsPtr +
          index * abiInfo.t3RetainedCausalRootReplayRowF64Bytes
      ));
    }
    return {
      schema: "solver-t3-step-response.v1",
      rows,
      unresolvedRootSegmentRows,
      retainedCausalRootReplayRows,
      unresolvedRootSegmentSidecar: {
        schema: "t3-unresolved-root-segment-sidecar.v1",
        enabled: unresolvedRootSegmentSidecar.enabled,
        pairPolicy: unresolvedRootSegmentSidecar.pairPolicy,
        rowCount: unresolvedRootSegmentRows.length,
        rowStatus: unresolvedRootSegmentSidecar.enabled
          ? "candidate_shape_evidence_only"
          : "disabled",
        replayAuthorization: false,
        retainedBranch: false,
        provesBranchAdmissibility: false,
      },
      summary,
      particleCount: stateCount,
      interactionLaw: normalized.interaction.law,
      executionPath: "native_c_abi",
      status: createStatus("ok", "ok", "native T3 bulk step completed", {
        details: {
          executionPath: "native_c_abi",
          interactionLaw: normalized.interaction.law,
          neighborPairCount: summary.neighborPairCount,
          unresolvedRootSegmentRowCount: unresolvedRootSegmentRows.length,
          retainedCausalRootReplayRowCount: retainedCausalRootReplayRows.length,
          occupiedCellCount: summary.occupiedCellCount,
        },
      }),
    };
  } finally {
    module._free(requestPtr);
    module._free(statesPtr);
    if (rowsPtr !== 0) {
      module._free(rowsPtr);
    }
    if (unresolvedRootSegmentRowsPtr !== 0) {
      module._free(unresolvedRootSegmentRowsPtr);
    }
    if (retainedCausalRootReplayRowsPtr !== 0) {
      module._free(retainedCausalRootReplayRowsPtr);
    }
    module._free(outRowCountPtr);
    module._free(outUnresolvedRootSegmentRowCountPtr);
    module._free(outRetainedCausalRootReplayRowCountPtr);
    module._free(summaryPtr);
  }
}

function normalizeT3StepRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "T3 bulk step request object is required", {
        recoverable: false,
      })
    );
  }
  const timestep = t3PositiveFinite(
    request.timestep ?? request.dt ?? request.step,
    "T3 timestep"
  );
  const startTime = t3Finite(request.startTime ?? request.time ?? 0, "T3 startTime");
  const endTime = t3Finite(request.endTime ?? startTime + timestep, "T3 endTime");
  const topology = request.topology ?? {};
  const spatialIndex = request.spatialIndex ?? {};
  const interaction = normalizeT3Interaction(request.interaction ?? request.interactions ?? {});
  const interactionRadius = t3PositiveFinite(
    spatialIndex.interactionRadius ??
      request.interactionRadius ??
      interaction.interactionRadius ??
      interaction.radius,
    "T3 interactionRadius"
  );
  const spatialCellSize = t3PositiveFinite(
    spatialIndex.cellSize ?? spatialIndex.spatialCellSize ?? request.spatialIndexCellSize ?? interactionRadius,
    "T3 spatialCellSize"
  );
  const particles = normalizeT3ParticleStates(request.particles ?? request.stateRows ?? []);
  const unresolvedRootSegmentSidecar = normalizeT3UnresolvedRootSegmentSidecar(
    request.unresolvedRootSegmentSidecar ??
      request.unresolvedRootSegmentSidecarPolicy ??
      {},
    particles.length
  );
  return {
    schema: "solver-t3-step-request.v1",
    startTime,
    endTime,
    timestep,
    topology: {
      sideLength: t3PositiveFinite(topology.sideLength ?? request.sideLength, "T3 sideLength"),
    },
    spatialIndex: {
      interactionRadius,
      cellSize: spatialCellSize,
    },
    interaction,
    particles,
    stepIndex: t3NonnegativeInteger(request.stepIndex ?? 0, "T3 stepIndex"),
    integrationTolerance: t3NonnegativeFinite(
      request.integrationTolerance ?? request.tolerance ?? 0,
      "T3 integrationTolerance"
    ),
    signalSpeed: unresolvedRootSegmentSidecar.enabled
      ? t3PositiveFinite(
          request.signalSpeed ?? request.causalSpeed ?? unresolvedRootSegmentSidecar.signalSpeed,
          "T3 signalSpeed"
        )
      : t3Finite(request.signalSpeed ?? request.causalSpeed ?? 0, "T3 signalSpeed"),
    rootTolerance: unresolvedRootSegmentSidecar.enabled
      ? t3PositiveFinite(
          request.rootTolerance ?? unresolvedRootSegmentSidecar.rootTolerance,
          "T3 rootTolerance"
        )
      : t3NonnegativeFinite(
          request.rootTolerance ?? unresolvedRootSegmentSidecar.rootTolerance ?? 0,
          "T3 rootTolerance"
        ),
    unresolvedRootSegmentSidecar,
    integrationMethod: t3PositiveInteger(request.integrationMethod ?? 1, "T3 integrationMethod"),
    maxRows: request.maxRows == null ? particles.length : t3NonnegativeInteger(request.maxRows, "T3 maxRows"),
  };
}

function normalizeT3UnresolvedRootSegmentSidecar(input, particleCount) {
  const value = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const enabled = value.enabled === true || value.mode === "enabled";
  const pairPolicy = value.pairPolicy ?? value.policy ?? "disabled";
  const expectedPairCount = Math.max(0, (particleCount * (particleCount - 1)) / 2);
  if (!enabled) {
    return {
      schema: "t3-unresolved-root-segment-sidecar-request.v1",
      enabled: false,
      pairPolicy: "disabled",
      pairPolicyCode: T3_UNRESOLVED_ROOT_PAIR_POLICY_CODE_BY_ID.disabled,
      signalSpeed: 0,
      rootTolerance: 0,
      maxRows: 0,
    };
  }
  if (pairPolicy !== "neighbor_pruned_v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `unsupported T3 unresolved-root sidecar pair policy: ${pairPolicy}`, {
        recoverable: false,
      })
    );
  }
  return {
    schema: "t3-unresolved-root-segment-sidecar-request.v1",
    enabled: true,
    pairPolicy,
    pairPolicyCode: T3_UNRESOLVED_ROOT_PAIR_POLICY_CODE_BY_ID[pairPolicy],
    signalSpeed: value.signalSpeed,
    rootTolerance: value.rootTolerance,
    maxRows: value.maxRows == null
      ? expectedPairCount
      : t3NonnegativeInteger(value.maxRows, "T3 unresolvedRootSegmentSidecar.maxRows"),
  };
}

function normalizeT3Interaction(input) {
  if (Array.isArray(input)) {
    if (input.length === 0) {
      return normalizeT3Interaction({ law: "none" });
    }
    if (input.length === 1) {
      return normalizeT3Interaction(input[0]);
    }
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "T3 solver engine supports one native interaction preset per step", {
        recoverable: false,
      })
    );
  }
  const value = input && typeof input === "object" ? input : {};
  const law = value.law ?? value.interactionLaw ?? value.solverLaw ?? value.id ?? "none";
  if (law === "none" || law === "noop") {
    return {
      law: "none",
      lawCode: 0,
      radius: t3PositiveFinite(value.radius ?? value.interactionRadius ?? 1, "T3 interaction radius"),
      interactionRadius: t3PositiveFinite(value.interactionRadius ?? value.radius ?? 1, "T3 interactionRadius"),
      strength: 0,
      softening: 0,
    };
  }
  if (law !== "soft_sphere_repel_v1" && law !== "soft-sphere-repulsion") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `unsupported T3 native interaction law: ${law}`, {
        recoverable: false,
      })
    );
  }
  const radius = t3PositiveFinite(value.radius ?? value.softSphereRadius, "T3 softSphere radius");
  return {
    law: "soft_sphere_repel_v1",
    lawCode: 1,
    radius,
    interactionRadius: t3PositiveFinite(value.interactionRadius ?? radius, "T3 interactionRadius"),
    strength: t3Finite(value.strength ?? value.softSphereStrength ?? 1, "T3 softSphere strength"),
    softening: t3PositiveFinite(value.softening ?? radius * 1e-6, "T3 softSphere softening"),
  };
}

function normalizeT3ParticleStates(particles) {
  if (!Array.isArray(particles)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "T3 particles must be an array", {
        recoverable: false,
      })
    );
  }
  return particles.map((particle, index) => {
    if (!particle || typeof particle !== "object" || Array.isArray(particle)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `T3 particle ${index} must be an object`, {
          recoverable: false,
        })
      );
    }
    const pathKey = t3PositiveInteger(particle.pathKey ?? particle.id ?? index + 1, `T3 particle ${index} pathKey`);
    return {
      pathKey,
      position: t3Vector(particle.position ?? particle.initialPosition, `T3 particle ${index} position`),
      velocity: t3Vector(particle.velocity ?? particle.initialVelocity ?? [0, 0, 0], `T3 particle ${index} velocity`),
      integrationWeight: t3PositiveFinite(
        particle.integrationWeight ?? 1,
        `T3 particle ${index} integrationWeight`
      ),
      charge: t3Finite(particle.charge ?? particle.electrineFraction ?? 0, `T3 particle ${index} charge`),
      stateFlags: t3NonnegativeInteger(particle.stateFlags ?? pathKey, `T3 particle ${index} stateFlags`),
    };
  });
}

function t3Vector(value, label) {
  if (Array.isArray(value) || ArrayBuffer.isView(value)) {
    if (value.length < 3) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `${label} must contain three values`, {
          recoverable: false,
        })
      );
    }
    return {
      x: t3Finite(value[0], `${label}.x`),
      y: t3Finite(value[1], `${label}.y`),
      z: t3Finite(value[2], `${label}.z`),
    };
  }
  if (value && typeof value === "object") {
    return {
      x: t3Finite(value.x, `${label}.x`),
      y: t3Finite(value.y, `${label}.y`),
      z: t3Finite(value.z, `${label}.z`),
    };
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", `${label} must be a vector`, {
      recoverable: false,
    })
  );
}

function t3Finite(value, label) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be finite`, {
        recoverable: false,
      })
    );
  }
  return numericValue;
}

function t3PositiveFinite(value, label) {
  const numericValue = t3Finite(value, label);
  if (numericValue <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be positive`, {
        recoverable: false,
      })
    );
  }
  return numericValue;
}

function t3NonnegativeFinite(value, label) {
  const numericValue = t3Finite(value, label);
  if (numericValue < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be nonnegative`, {
        recoverable: false,
      })
    );
  }
  return numericValue;
}

function t3PositiveInteger(value, label) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a positive integer`, {
        recoverable: false,
      })
    );
  }
  return numericValue;
}

function t3NonnegativeInteger(value, label) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative integer`, {
        recoverable: false,
      })
    );
  }
  return numericValue;
}

function validateLinearMotionSampleRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "linear motion sample request object is required", {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(request.pathKey, "pathKey");
  validateSegment(request.segment, "segment");
  requireFiniteNumber(request.startTime, "startTime");
  requireFiniteNumber(request.endTime, "endTime");
  requirePositiveFiniteNumber(request.step, "step");
  if (request.endTime < request.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion sample time bounds are not ordered", {
        recoverable: false,
      })
    );
  }
  if (request.startTime < request.segment.startTime || request.endTime > request.segment.endTime) {
    throw new SolverBridgeError(
      createStatus("insufficient_history_depth", "halt", "motion sample window is outside the retained segment", {
        recoverable: false,
      })
    );
  }
  if (request.stateFlags != null) {
    requireUint32(request.stateFlags, "stateFlags");
  }
  if (request.maxFrames != null) {
    requirePositiveInt32(request.maxFrames, "maxFrames");
  }
}

function estimateLinearMotionFrameCount(request) {
  return estimateMotionFrameCount(request);
}

function estimateMotionFrameCount(request) {
  const duration = request.endTime - request.startTime;
  return Math.floor((duration + request.step * 1e-9) / request.step) + 1;
}

function estimateMotionPathSegmentCount(request) {
  const duration = request.endTime - request.startTime;
  if (duration <= 0) {
    return 0;
  }
  return Math.ceil(duration / request.step);
}

function validateMotionIntegrationRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion integration request object is required", {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(request.pathKey, "pathKey");
  requireFiniteNumber(request.startTime, "startTime");
  requireFiniteNumber(request.endTime, "endTime");
  requirePositiveFiniteNumber(request.step, "step");
  if (request.endTime < request.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion integration time bounds are not ordered", {
        recoverable: false,
      })
    );
  }
  validateVector(request.initialPosition, "initialPosition");
  validateVector(request.initialVelocity, "initialVelocity");
  validateVector(request.acceleration, "acceleration");
  if (request.integrationTolerance != null) {
    requireFiniteNumber(request.integrationTolerance, "integrationTolerance");
    if (request.integrationTolerance < 0) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "integrationTolerance must be nonnegative", {
          recoverable: false,
        })
      );
    }
  }
  if (request.integrationMethod != null) {
    requireUint32(request.integrationMethod, "integrationMethod");
    if (request.integrationMethod !== 1) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "motion integration method is not supported", {
          recoverable: false,
          details: { integrationMethod: request.integrationMethod },
        })
      );
    }
  }
  if (request.stateFlags != null) {
    requireUint32(request.stateFlags, "stateFlags");
  }
  if (request.maxFrames != null) {
    requirePositiveInt32(request.maxFrames, "maxFrames");
  }
}

function computeSharedGeometryF64WithModule(module, request, abiInfo) {
  validateSharedGeometryRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const pathBounds = computePathBoundsF64WithModule(module, request.pathBounds ?? [], abiInfo);
  const spherePointIntersections = computeSpherePointIntersectionsF64WithModule(
    module,
    request.spherePointIntersections ?? [],
    abiInfo
  );
  const delayedPotentials = computeDelayedPotentialsF64WithModule(
    module,
    request.delayedPotentials ?? [],
    abiInfo
  );
  const circularSelfHitSpans = computeCircularSelfHitSpansF64WithModule(
    module,
    request.circularSelfHitSpans ?? [],
    abiInfo
  );
  return {
    pathBounds,
    spherePointIntersections,
    delayedPotentials,
    circularSelfHitSpans,
    status: createStatus("ok", "ok", "shared geometry computed"),
  };
}

function computePathBoundsF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const segmentBytes = 72;
  const segmentsPtr = module._malloc(segmentBytes * requests.length);
  const pathKeysPtr = module._malloc(8 * requests.length);
  const rowsPtr = module._malloc(abiInfo.boundsRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeSegment(module, segmentsPtr + index * segmentBytes, item.segment);
      writeUint64(module, pathKeysPtr + index * 8, item.pathKey ?? index);
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_compute_path_bounds_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(
      segmentsPtr,
      pathKeysPtr,
      requests.length,
      rowsPtr,
      requests.length,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `path-bounds C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readBoundsRowF64(module, rowsPtr + index * abiInfo.boundsRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(segmentsPtr);
    module._free(pathKeysPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function computeSpherePointIntersectionsF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const requestsPtr = module._malloc(abiInfo.spherePointRequestF64Bytes * requests.length);
  const rowsPtr = module._malloc(abiInfo.spherePointRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeSpherePointIntersectionRequestF64(
        module,
        requestsPtr + index * abiInfo.spherePointRequestF64Bytes,
        item
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const intersect = module.cwrap("architrino_solver_intersect_sphere_points_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = intersect(requestsPtr, requests.length, rowsPtr, requests.length, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `sphere-point C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readSpherePointIntersectionRowF64(module, rowsPtr + index * abiInfo.spherePointRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(requestsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function computeDelayedPotentialsF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const requestsPtr = module._malloc(abiInfo.delayedPotentialRequestF64Bytes * requests.length);
  const rowsPtr = module._malloc(abiInfo.delayedPotentialRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeDelayedPotentialRequestF64(
        module,
        requestsPtr + index * abiInfo.delayedPotentialRequestF64Bytes,
        item
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_compute_delayed_potentials_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(requestsPtr, requests.length, rowsPtr, requests.length, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `delayed-potential C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readDelayedPotentialRowF64(module, rowsPtr + index * abiInfo.delayedPotentialRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(requestsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function computeCircularSelfHitSpansF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const requestsPtr = module._malloc(abiInfo.circularSelfHitRequestF64Bytes * requests.length);
  const rowsPtr = module._malloc(abiInfo.circularSelfHitRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeCircularSelfHitSpanRequestF64(
        module,
        requestsPtr + index * abiInfo.circularSelfHitRequestF64Bytes,
        item
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_solve_circular_self_hit_spans_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(requestsPtr, requests.length, rowsPtr, requests.length, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `circular self-hit C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readCircularSelfHitSpanRowF64(module, rowsPtr + index * abiInfo.circularSelfHitRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(requestsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function validateSharedGeometryRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "shared geometry request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.pathBounds != null && !Array.isArray(request.pathBounds)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pathBounds must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.spherePointIntersections != null && !Array.isArray(request.spherePointIntersections)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "spherePointIntersections must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.delayedPotentials != null && !Array.isArray(request.delayedPotentials)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "delayedPotentials must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.circularSelfHitSpans != null && !Array.isArray(request.circularSelfHitSpans)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "circularSelfHitSpans must be an array", {
        recoverable: false,
      })
    );
  }
  (request.pathBounds ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `pathBounds[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    validateSegment(item.segment, `pathBounds[${index}].segment`);
    if (item.pathKey != null) {
      requireSafeUint64(item.pathKey, `pathBounds[${index}].pathKey`);
    }
  });
  (request.spherePointIntersections ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `spherePointIntersections[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    validateVector(item.center, `spherePointIntersections[${index}].center`);
    requireNonnegativeFiniteNumber(item.radius, `spherePointIntersections[${index}].radius`);
    validateVector(item.point, `spherePointIntersections[${index}].point`);
    if (item.tolerance != null) {
      requireNonnegativeFiniteNumber(item.tolerance, `spherePointIntersections[${index}].tolerance`);
    }
  });
  (request.delayedPotentials ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `delayedPotentials[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    validateSegment(item.source, `delayedPotentials[${index}].source`);
    validateVector(item.samplePoint, `delayedPotentials[${index}].samplePoint`);
    requireFiniteNumber(item.observationTime, `delayedPotentials[${index}].observationTime`);
    if (item.fieldSpeed != null) {
      requirePositiveFiniteNumber(item.fieldSpeed, `delayedPotentials[${index}].fieldSpeed`);
    }
    if (item.normalization != null) {
      requireFiniteNumber(item.normalization, `delayedPotentials[${index}].normalization`);
    }
    if (item.softening != null) {
      requirePositiveFiniteNumber(item.softening, `delayedPotentials[${index}].softening`);
    }
    if (item.sourceCharge != null) {
      requireFiniteNumber(item.sourceCharge, `delayedPotentials[${index}].sourceCharge`);
    }
    if (item.iterations != null) {
      requirePositiveInteger(item.iterations, `delayedPotentials[${index}].iterations`);
    }
  });
  (request.circularSelfHitSpans ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `circularSelfHitSpans[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    requirePositiveFiniteNumber(
      item.fieldSpeedRatio,
      `circularSelfHitSpans[${index}].fieldSpeedRatio`
    );
    if (item.fieldSpeedTolerance != null) {
      requireNonnegativeFiniteNumber(
        item.fieldSpeedTolerance,
        `circularSelfHitSpans[${index}].fieldSpeedTolerance`
      );
    }
    if (item.tolerance != null) {
      requireNonnegativeFiniteNumber(item.tolerance, `circularSelfHitSpans[${index}].tolerance`);
    }
    if (item.maxIterations != null) {
      requirePositiveInteger(item.maxIterations, `circularSelfHitSpans[${index}].maxIterations`);
    }
    if (item.scanSubdivisions != null) {
      requirePositiveInteger(
        item.scanSubdivisions,
        `circularSelfHitSpans[${index}].scanSubdivisions`
      );
    }
    if (item.maxAngle != null) {
      requirePositiveFiniteNumber(item.maxAngle, `circularSelfHitSpans[${index}].maxAngle`);
    }
  });
}

function detectAssemblyMembershipEventsF64WithModule(module, request, abiInfo) {
  validateAssemblyMembershipEventsRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const memberships = request.memberships;
  const membershipCount = memberships.length;
  const maxEvents = request.maxEvents ?? Math.max(1, membershipCount);
  if (membershipCount === 0) {
    return {
      events: [],
      buffers: [
        createBufferDescriptor(
          "assembly-events",
          "assembly_events.v1",
          0,
          abiInfo.assemblyEventRowF64Bytes,
          new ArrayBuffer(0)
        ),
      ],
      status: createStatus("ok", "ok", "assembly membership events detected"),
    };
  }

  const membershipsPtr = module._malloc(abiInfo.assemblyMembershipRowF64Bytes * membershipCount);
  const eventsPtr = module._malloc(abiInfo.assemblyEventRowF64Bytes * maxEvents);
  const outEventCountPtr = module._malloc(4);
  try {
    memberships.forEach((membership, index) => {
      writeAssemblyMembershipRowF64(
        module,
        membershipsPtr + index * abiInfo.assemblyMembershipRowF64Bytes,
        membership
      );
    });
    module.setValue(outEventCountPtr, 0, "i32");
    const detect = module.cwrap("architrino_solver_detect_assembly_membership_events_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = detect(membershipsPtr, membershipCount, eventsPtr, maxEvents, outEventCountPtr);
    const eventCount = module.getValue(outEventCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `assembly membership C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, eventCount },
        })
      );
    }

    const events = [];
    for (let index = 0; index < eventCount; index += 1) {
      events.push(readAssemblyEventRowF64(module, eventsPtr + index * abiInfo.assemblyEventRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, eventsPtr, eventCount * abiInfo.assemblyEventRowF64Bytes);
    return {
      events,
      buffers: [
        createBufferDescriptor(
          "assembly-events",
          "assembly_events.v1",
          eventCount,
          abiInfo.assemblyEventRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "assembly membership events detected"),
    };
  } finally {
    module._free(membershipsPtr);
    module._free(eventsPtr);
    module._free(outEventCountPtr);
  }
}

function buildAssemblyGraphDatasetF64WithModule(module, request, abiInfo) {
  validateAssemblyGraphDatasetRequest(request);
  const assemblyStates = request.assemblyStates ?? [];
  const memberships = request.memberships ?? [];
  const hierarchy = request.hierarchy ?? [];
  const explicitEvents = request.events ?? null;
  const eventResponse = explicitEvents
    ? createAssemblyGraphExplicitEventsResponse(explicitEvents, abiInfo)
    : request.deriveMembershipEvents === false
      ? createAssemblyGraphEmptyEventsResponse(abiInfo, "not_requested")
      : detectAssemblyMembershipEventsF64WithModule(
          module,
          { memberships, maxEvents: request.maxEvents },
          abiInfo
        );
  const eventSource = explicitEvents ? "explicit" : request.deriveMembershipEvents === false ? "none" : "derived";
  const events = eventResponse.events;
  const buffers = [
    createAssemblyGraphBufferDescriptor(
      "assembly-states",
      "assembly_state.v1",
      assemblyStates,
      abiInfo.assemblyStateRowF64Bytes,
      writeAssemblyStateRowF64ToView
    ),
    createAssemblyGraphBufferDescriptor(
      "assembly-memberships",
      "assembly_membership.v1",
      memberships,
      abiInfo.assemblyMembershipRowF64Bytes,
      writeAssemblyMembershipRowF64ToView
    ),
    createAssemblyGraphBufferDescriptor(
      "assembly-hierarchy",
      "assembly_hierarchy.v1",
      hierarchy,
      abiInfo.assemblyHierarchyRowF64Bytes,
      writeAssemblyHierarchyRowF64ToView
    ),
    eventResponse.buffers[0],
  ];

  return {
    schema: "solver-assembly-graph-dataset.v1",
    summary: summarizeAssemblyGraphDatasetF64(
      assemblyStates,
      memberships,
      hierarchy,
      events,
      eventSource,
      buffers.length
    ),
    assemblyStates,
    memberships,
    hierarchy,
    events,
    buffers,
    status: createStatus("ok", "ok", "assembly graph dataset built", {
      details: { eventSource },
    }),
  };
}

function createAssemblyGraphStoreF64(state, module, request, abiInfo) {
  validateCreateAssemblyGraphStoreRequest(request);
  const storagePolicy = normalizeAssemblyGraphStoreStoragePolicy(request.storagePolicy);
  const dataset = buildAssemblyGraphDatasetF64WithModule(module, request, abiInfo);
  const expectedTotalBytes = dataset.buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  if (storagePolicy.maxBytes > 0 && expectedTotalBytes > storagePolicy.maxBytes) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "assembly graph store exceeds storage budget", {
        recoverable: true,
        details: {
          storeId: request.storeId,
          requestedBytes: expectedTotalBytes,
          maxBytes: storagePolicy.maxBytes,
          storageTarget: storagePolicy.target,
        },
      })
    );
  }
  const storage = prepareNativeFileAssemblyGraphStoreStorage(request.storeId, storagePolicy);
  const storedBuffers = dataset.buffers.map((descriptor) =>
    writeNativeFileAssemblyGraphDataset(storage, descriptor)
  );
  const store = createAssemblyGraphStoreManifest(
    request.storeId,
    storage,
    storagePolicy,
    dataset,
    dataset.summary,
    storedBuffers
  );
  writeNativeFileAssemblyGraphManifest(storage, store);
  state.assemblyGraphStores.set(request.storeId, {
    store,
    buffers: storedBuffers.map(copyBufferDescriptor),
  });
  return {
    schema: "solver-assembly-graph-store.v1",
    store: copyAssemblyGraphStoreManifest(store),
    summary: deepCloneJson(dataset.summary),
    buffers: storedBuffers.map(copyBufferDescriptor),
    status: createStatus("ok", "ok", "assembly graph store written"),
  };
}

function describeAssemblyGraphStoreF64(state, request) {
  const entry = resolveAssemblyGraphStoreEntry(state, request);
  return {
    schema: "solver-assembly-graph-store-description.v1",
    store: copyAssemblyGraphStoreManifest(entry.store),
    buffers: entry.buffers.map(copyBufferDescriptor),
    status: createStatus("ok", "ok", "assembly graph store described"),
  };
}

function readAssemblyGraphStoreRangeF64(state, request) {
  validateAssemblyGraphStoreReadRequest(request);
  const entry = resolveAssemblyGraphStoreEntry(state, request);
  const layouts = normalizeAssemblyGraphStoreReadLayouts(request.layouts);
  const output = {
    assemblyStates: [],
    memberships: [],
    hierarchy: [],
    events: [],
    buffers: [],
  };
  for (const layout of layouts) {
    const dataset = getAssemblyGraphStoreDatasetForLayout(entry.store, layout);
    const readResult = readAssemblyGraphStoreRows(dataset, entry.store.index, request);
    const filteredRows = filterAssemblyGraphRows(layout, readResult.rows, request);
    const descriptor = createAssemblyGraphBufferDescriptor(
      `assembly-graph-read:${layout}`,
      layout,
      filteredRows,
      dataset.rowSizeBytes,
      getAssemblyGraphRowWriterForLayout(layout)
    );
    descriptor.checksum = fnv1a64ArrayBufferHex(descriptor.buffer);
    output.buffers.push(descriptor);
    output.indexedLayoutCount = (output.indexedLayoutCount ?? 0) + (readResult.indexed ? 1 : 0);
    output.indexRowCount = (output.indexRowCount ?? 0) + readResult.indexRowCount;
    output.indexSkippedRowCount = (output.indexSkippedRowCount ?? 0) + readResult.indexSkippedRowCount;
    if (layout === "assembly_state.v1") {
      output.assemblyStates = filteredRows;
    } else if (layout === "assembly_membership.v1") {
      output.memberships = filteredRows;
    } else if (layout === "assembly_hierarchy.v1") {
      output.hierarchy = filteredRows;
    } else if (layout === "assembly_events.v1") {
      output.events = filteredRows;
    }
  }
  const totalBytes = output.buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  if (request.maxBytes != null && totalBytes > request.maxBytes) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "assembly graph read exceeds maxBytes", {
        recoverable: true,
        details: { requestedBytes: totalBytes, maxBytes: request.maxBytes },
      })
    );
  }
  return {
    schema: "solver-assembly-graph-read.v1",
    storeId: entry.store.storeId,
    manifestVersion: entry.store.manifestVersion,
    readSummary: {
      schema: "solver-assembly-graph-read-summary.v1",
      assemblyStateCount: output.assemblyStates.length,
      membershipCount: output.memberships.length,
      hierarchyCount: output.hierarchy.length,
      eventCount: output.events.length,
      bufferCount: output.buffers.length,
      byteLength: totalBytes,
      indexed: (output.indexedLayoutCount ?? 0) > 0,
      indexedLayoutCount: output.indexedLayoutCount ?? 0,
      indexRowCount: output.indexRowCount ?? 0,
      indexSkippedRowCount: output.indexSkippedRowCount ?? 0,
    },
    assemblyStates: output.assemblyStates,
    memberships: output.memberships,
    hierarchy: output.hierarchy,
    events: output.events,
    buffers: output.buffers,
    status: createStatus("ok", "ok", "assembly graph store range read"),
  };
}

function createAssemblyGraphExplicitEventsResponse(events, abiInfo) {
  return {
    events,
    buffers: [
      createAssemblyGraphBufferDescriptor(
        "assembly-events",
        "assembly_events.v1",
        events,
        abiInfo.assemblyEventRowF64Bytes,
        writeAssemblyEventRowF64ToView
      ),
    ],
    status: createStatus("ok", "ok", "explicit assembly events accepted"),
  };
}

function createAssemblyGraphEmptyEventsResponse(abiInfo, eventSource) {
  return {
    events: [],
    buffers: [
      createBufferDescriptor(
        "assembly-events",
        "assembly_events.v1",
        0,
        abiInfo.assemblyEventRowF64Bytes,
        new ArrayBuffer(0)
      ),
    ],
    status: createStatus("ok", "ok", "assembly event derivation skipped", {
      details: { eventSource },
    }),
  };
}

function summarizeAssemblyGraphDatasetF64(
  assemblyStates,
  memberships,
  hierarchy,
  events,
  eventSource,
  bufferCount
) {
  const assemblyKeys = new Set();
  const pathKeys = new Set();
  let timeStart = Number.POSITIVE_INFINITY;
  let timeEnd = Number.NEGATIVE_INFINITY;
  const addAssemblyKey = (key) => {
    if (key > 0) {
      assemblyKeys.add(key);
    }
  };
  const addPathKey = (key) => {
    if (key > 0) {
      pathKeys.add(key);
    }
  };
  const addTimeRange = (start, end) => {
    timeStart = Math.min(timeStart, start);
    timeEnd = Math.max(timeEnd, end);
  };

  assemblyStates.forEach((row) => {
    addAssemblyKey(row.assemblyKey);
    addTimeRange(row.timeStart, row.timeEnd);
  });
  memberships.forEach((row) => {
    addPathKey(row.pathKey);
    addAssemblyKey(row.assemblyKey);
    addTimeRange(row.timeStart, row.timeEnd);
  });
  hierarchy.forEach((row) => {
    addAssemblyKey(row.parentAssemblyKey);
    addAssemblyKey(row.childAssemblyKey);
    addTimeRange(row.timeStart, row.timeEnd);
  });
  events.forEach((row) => {
    addPathKey(row.relatedPathKey);
    addAssemblyKey(row.relatedAssemblyKey);
    addTimeRange(row.eventTime, row.eventTime);
  });

  return {
    schema: "solver-assembly-graph-summary.v1",
    assemblyStateCount: assemblyStates.length,
    membershipCount: memberships.length,
    hierarchyCount: hierarchy.length,
    eventCount: events.length,
    derivedEventCount: eventSource === "derived" ? events.length : 0,
    explicitEventCount: eventSource === "explicit" ? events.length : 0,
    assemblyCount: assemblyKeys.size,
    pathCount: pathKeys.size,
    bufferCount,
    eventSource,
    timeRange: { start: timeStart, end: timeEnd },
  };
}

function validateAssemblyMembershipEventsRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly membership event request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.memberships)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "memberships must be an array", {
        recoverable: false,
      })
    );
  }
  request.memberships.forEach(validateAssemblyMembershipRowF64);
  if (request.maxEvents != null) {
    requirePositiveInt32(request.maxEvents, "maxEvents");
  }
}

function validateAssemblyGraphDatasetRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph dataset request object is required", {
        recoverable: false,
      })
    );
  }
  validateOptionalArray(request.assemblyStates, "assemblyStates");
  validateOptionalArray(request.memberships, "memberships");
  validateOptionalArray(request.hierarchy, "hierarchy");
  validateOptionalArray(request.events, "events");
  if (
    (request.assemblyStates ?? []).length === 0 &&
    (request.memberships ?? []).length === 0 &&
    (request.hierarchy ?? []).length === 0 &&
    (request.events ?? []).length === 0
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph dataset requires at least one row", {
        recoverable: false,
      })
    );
  }
  (request.assemblyStates ?? []).forEach(validateAssemblyStateRowF64);
  (request.memberships ?? []).forEach(validateAssemblyMembershipRowF64);
  (request.hierarchy ?? []).forEach(validateAssemblyHierarchyRowF64);
  (request.events ?? []).forEach(validateAssemblyEventRowF64);
  if (request.deriveMembershipEvents != null && typeof request.deriveMembershipEvents !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "deriveMembershipEvents must be boolean", {
        recoverable: false,
      })
    );
  }
  if (request.maxEvents != null) {
    requirePositiveInt32(request.maxEvents, "maxEvents");
  }
}

function validateCreateAssemblyGraphStoreRequest(request) {
  validateAssemblyGraphDatasetRequest(request);
  requireNonemptyString(request.storeId, "storeId");
}

function validateAssemblyGraphStoreReadRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph store read request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.storeId == null && request.manifestPath == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph store read requires storeId or manifestPath", {
        recoverable: false,
      })
    );
  }
  if (request.layouts != null && !Array.isArray(request.layouts)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "layouts must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.rowOffset != null) {
    requireSafeUint64(request.rowOffset, "rowOffset");
  }
  if (request.rowCount != null) {
    requireSafeUint64(request.rowCount, "rowCount");
  }
  if (request.pathKey != null) {
    requireSafeUint64(request.pathKey, "pathKey");
  }
  if (request.assemblyKey != null) {
    requireSafeUint64(request.assemblyKey, "assemblyKey");
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  if (request.byteRange != null) {
    validateRange(request.byteRange, "byteRange");
    requireSafeUint64(request.byteRange.start, "byteRange.start");
    requireSafeUint64(request.byteRange.end, "byteRange.end");
  }
  if (request.maxBytes != null) {
    requireNonnegativeInteger(request.maxBytes, "maxBytes");
  }
}

function validateOptionalArray(value, label) {
  if (value != null && !Array.isArray(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an array`, {
        recoverable: false,
      })
    );
  }
}

function validateAssemblyMembershipRowF64(membership, index) {
  if (!membership || typeof membership !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `memberships[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(membership.membershipKey, `memberships[${index}].membershipKey`);
  requireSafeUint64(membership.pathKey, `memberships[${index}].pathKey`);
  requireSafeUint64(membership.assemblyKey, `memberships[${index}].assemblyKey`);
  requireSafeUint64(membership.assemblyStateKey, `memberships[${index}].assemblyStateKey`);
  requireFiniteNumber(membership.timeStart, `memberships[${index}].timeStart`);
  requireFiniteNumber(membership.timeEnd, `memberships[${index}].timeEnd`);
  if (membership.timeEnd < membership.timeStart) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `memberships[${index}] time bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(membership.confidence, `memberships[${index}].confidence`);
  if (membership.confidence < 0 || membership.confidence > 1) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `memberships[${index}].confidence must be in [0, 1]`, {
        recoverable: false,
      })
    );
  }
  requireUint32(membership.localRole ?? 0, `memberships[${index}].localRole`);
  requireUint32(membership.bindingState ?? 0, `memberships[${index}].bindingState`);
  requireUint32(membership.membershipVersion ?? 1, `memberships[${index}].membershipVersion`);
  requireUint32(membership.eventKind ?? 0, `memberships[${index}].eventKind`);
  requireUint32(membership.statusFlags ?? 0, `memberships[${index}].statusFlags`);
}

function validateAssemblyHierarchyRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `hierarchy[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.hierarchyKey, `hierarchy[${index}].hierarchyKey`);
  requireSafeUint64(row.parentAssemblyKey, `hierarchy[${index}].parentAssemblyKey`);
  requireSafeUint64(row.childAssemblyKey, `hierarchy[${index}].childAssemblyKey`);
  requireFiniteNumber(row.timeStart, `hierarchy[${index}].timeStart`);
  requireFiniteNumber(row.timeEnd, `hierarchy[${index}].timeEnd`);
  if (row.timeEnd < row.timeStart) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `hierarchy[${index}] time bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
  requireUint32(row.relationType ?? 0, `hierarchy[${index}].relationType`);
  requireUint32(row.hierarchyVersion ?? 1, `hierarchy[${index}].hierarchyVersion`);
  requireUint32(row.statusFlags ?? 0, `hierarchy[${index}].statusFlags`);
}

function validateAssemblyEventRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `events[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.eventKey, `events[${index}].eventKey`);
  requireSafeUint64(row.primaryId, `events[${index}].primaryId`);
  requireSafeUint64(row.secondaryId, `events[${index}].secondaryId`);
  requireSafeUint64(row.priorStateKey, `events[${index}].priorStateKey`);
  requireSafeUint64(row.nextStateKey, `events[${index}].nextStateKey`);
  requireSafeUint64(row.relatedPathKey, `events[${index}].relatedPathKey`);
  requireSafeUint64(row.relatedAssemblyKey, `events[${index}].relatedAssemblyKey`);
  requireSafeUint64(row.branchTransitionKey, `events[${index}].branchTransitionKey`);
  requireFiniteNumber(row.eventTime, `events[${index}].eventTime`);
  requireUint32(row.eventKind, `events[${index}].eventKind`);
  requireUint32(row.speedRegime, `events[${index}].speedRegime`);
  requireUint32(row.statusFlags, `events[${index}].statusFlags`);
}

function buildSpaceTimeIndexF64WithModule(module, request, abiInfo) {
  validateBuildSpaceTimeIndexRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const pathRows = request.pathRows ?? [];
  const assemblyStates = request.assemblyStates ?? [];
  const maxRows = request.maxRows ?? DEFAULT_MAX_SPACETIME_INDEX_ROWS;
  if (pathRows.length === 0 && assemblyStates.length === 0) {
    return createSpaceTimeIndexResponse([], 0, abiInfo, "space-time index built");
  }

  const pathRowsPtr =
    pathRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * pathRows.length) : 0;
  const assemblyRowsPtr =
    assemblyStates.length > 0
      ? module._malloc(abiInfo.assemblyStateRowF64Bytes * assemblyStates.length)
      : 0;
  const optionsPtr = module._malloc(SPACETIME_INDEX_OPTIONS_F64_BYTES);
  const rowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * maxRows);
  const outRowCountPtr = module._malloc(4);
  const outOverflowCountPtr = module._malloc(4);
  try {
    pathRows.forEach((row, index) => {
      writePathHistoryRowF64(module, pathRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    assemblyStates.forEach((row, index) => {
      writeAssemblyStateRowF64(module, assemblyRowsPtr + index * abiInfo.assemblyStateRowF64Bytes, row);
    });
    writeSpaceTimeIndexOptionsF64(module, optionsPtr, request.options);
    module.setValue(outRowCountPtr, 0, "i32");
    module.setValue(outOverflowCountPtr, 0, "i32");
    const build = module.cwrap("architrino_solver_build_spacetime_index_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = build(
      pathRowsPtr,
      pathRows.length,
      assemblyRowsPtr,
      assemblyStates.length,
      optionsPtr,
      rowsPtr,
      maxRows,
      outRowCountPtr,
      outOverflowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    const overflowEntryCount = module.getValue(outOverflowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `space-time index C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, overflowEntryCount },
        })
      );
    }
    const rows = readSpaceTimeIndexRows(module, rowsPtr, rowCount, abiInfo);
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.spaceTimeIndexRowF64Bytes);
    return createSpaceTimeIndexResponse(rows, overflowEntryCount, abiInfo, "space-time index built", buffer);
  } finally {
    if (pathRowsPtr) {
      module._free(pathRowsPtr);
    }
    if (assemblyRowsPtr) {
      module._free(assemblyRowsPtr);
    }
    module._free(optionsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
    module._free(outOverflowCountPtr);
  }
}

function buildPathHistoryStreamSpaceTimeIndexF64WithModule(state, module, request, abiInfo) {
  validateBuildPathHistoryStreamSpaceTimeIndexRequest(request);
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const streamId = streamEntry.stream.streamId;
  const selectionRequest = {
    streamId,
    chunkIndices: request.chunkIndices,
    pathKeys: request.pathKeys,
    timeRange: request.timeRange,
    frameRange: request.frameRange,
    byteRange: request.byteRange,
  };
  const selection = selectStreamRanges(streamEntry, selectionRequest);
  const selectedByteLength = selection.items.reduce((sum, item) => sum + item.buffer.byteLength, 0);
  if (request.maxBytes != null && selectedByteLength > request.maxBytes) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "stream-backed space-time index exceeds maxBytes", {
        recoverable: true,
        details: {
          streamId,
          requestedBytes: selectedByteLength,
          maxBytes: request.maxBytes,
        },
      })
    );
  }
  const pathRows = decodePathHistoryRowsFromStreamSelection(selection.items);
  const response = buildSpaceTimeIndexF64WithModule(
    module,
    {
      pathRows,
      assemblyStates: request.assemblyStates ?? [],
      options: request.options,
      maxRows: request.maxRows,
    },
    abiInfo
  );
  return {
    ...response,
    status: createStatus("ok", "ok", "stream-backed space-time index built", {
      details: {
        streamId,
        selectedRangeCount: selection.items.length,
        selectedPathRowCount: pathRows.length,
        selectedByteLength,
        overflowEntryCount: response.overflowEntryCount,
        diagnosticCount: selection.diagnostics.length,
      },
    }),
  };
}

function decodePathHistoryRowsFromStreamSelection(items) {
  const rows = [];
  items.forEach((item, itemIndex) => {
    if (item.descriptor.layout !== "path_segment.v1" || item.rowCount === 0) {
      return;
    }
    const rowSize = item.buffer.byteLength / item.rowCount;
    if (!Number.isInteger(rowSize) || rowSize <= 0) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "path-history stream selection has invalid row size", {
          recoverable: false,
          details: {
            bufferId: item.descriptor.bufferId,
            byteLength: item.buffer.byteLength,
            rowCount: item.rowCount,
          },
        })
      );
    }
    const view = new DataView(item.buffer);
    for (let rowIndex = 0; rowIndex < item.rowCount; rowIndex += 1) {
      rows.push(readPathHistoryRowFromView(view, rowIndex * rowSize, itemIndex, rowIndex));
    }
  });
  return rows;
}

function querySpaceTimeIndexF64WithModule(module, request, abiInfo) {
  validateQuerySpaceTimeIndexRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const rows = request.rows;
  const maxRows = request.maxRows ?? Math.max(1, rows.length);
  if (rows.length === 0) {
    return createSpaceTimeIndexResponse([], 0, abiInfo, "space-time index queried");
  }

  const inputRowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * rows.length);
  const queryPtr = module._malloc(SPACETIME_QUERY_F64_BYTES);
  const optionsPtr = module._malloc(SPACETIME_INDEX_OPTIONS_F64_BYTES);
  const outputRowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * maxRows);
  const outRowCountPtr = module._malloc(4);
  try {
    rows.forEach((row, index) => {
      writeSpaceTimeIndexRowF64(module, inputRowsPtr + index * abiInfo.spaceTimeIndexRowF64Bytes, row);
    });
    writeSpaceTimeQueryF64(module, queryPtr, request.query);
    writeSpaceTimeIndexOptionsF64(module, optionsPtr, request.options);
    module.setValue(outRowCountPtr, 0, "i32");
    const query = module.cwrap("architrino_solver_query_spacetime_index_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = query(
      inputRowsPtr,
      rows.length,
      queryPtr,
      optionsPtr,
      outputRowsPtr,
      maxRows,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `space-time query C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const matches = readSpaceTimeIndexRows(module, outputRowsPtr, rowCount, abiInfo);
    const buffer = copyWasmBytes(module, outputRowsPtr, rowCount * abiInfo.spaceTimeIndexRowF64Bytes);
    return createSpaceTimeIndexResponse(matches, 0, abiInfo, "space-time index queried", buffer);
  } finally {
    module._free(inputRowsPtr);
    module._free(queryPtr);
    module._free(optionsPtr);
    module._free(outputRowsPtr);
    module._free(outRowCountPtr);
  }
}

function createSpaceTimeIndexResponse(rows, overflowEntryCount, abiInfo, message, buffer = new ArrayBuffer(0)) {
  return {
    rows,
    buffers: [
      createBufferDescriptor(
        "spacetime-index",
        "spacetime_index.v1",
        rows.length,
        abiInfo.spaceTimeIndexRowF64Bytes,
        buffer
      ),
    ],
    overflowEntryCount,
    status: createStatus("ok", "ok", message),
  };
}

function validateBuildSpaceTimeIndexRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time index request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.pathRows != null && !Array.isArray(request.pathRows)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pathRows must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.assemblyStates != null && !Array.isArray(request.assemblyStates)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assemblyStates must be an array", {
        recoverable: false,
      })
    );
  }
  (request.pathRows ?? []).forEach(validatePathHistoryRowF64);
  (request.assemblyStates ?? []).forEach(validateAssemblyStateRowF64);
  validateSpaceTimeIndexOptions(request.options);
  if (request.maxRows != null) {
    requirePositiveInt32(request.maxRows, "maxRows");
  }
}

function validateBuildPathHistoryStreamSpaceTimeIndexRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream-backed space-time index request object is required", {
        recoverable: false,
      })
    );
  }
  validateStreamIdOrManifestPathRequest(request, "stream-backed space-time index request");
  if (request.pathKeys != null) {
    validateOptionalPathKeyArray(request.pathKeys, "pathKeys");
  }
  if (request.chunkIndices != null) {
    normalizeChunkIndexSelection(request.chunkIndices, "chunkIndices");
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  if (request.frameRange != null) {
    validateRange(request.frameRange, "frameRange");
  }
  if (request.byteRange != null) {
    validateRange(request.byteRange, "byteRange");
  }
  validateOptionalArray(request.assemblyStates, "assemblyStates");
  (request.assemblyStates ?? []).forEach(validateAssemblyStateRowF64);
  validateSpaceTimeIndexOptions(request.options);
  if (request.maxRows != null) {
    requirePositiveInt32(request.maxRows, "maxRows");
  }
  if (request.maxBytes != null) {
    requireNonnegativeInteger(request.maxBytes, "maxBytes");
  }
}

function validateQuerySpaceTimeIndexRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time query request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.rows)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "rows must be an array", {
        recoverable: false,
      })
    );
  }
  request.rows.forEach(validateSpaceTimeIndexRowF64);
  validateSpaceTimeQuery(request.query);
  validateSpaceTimeIndexOptions(request.options);
  if (request.maxRows != null) {
    requirePositiveInt32(request.maxRows, "maxRows");
  }
}

function validatePathHistoryRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `pathRows[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.pathKey, `pathRows[${index}].pathKey`);
  requireSafeUint64(row.segmentIndex, `pathRows[${index}].segmentIndex`);
  requireFiniteNumber(row.startTime, `pathRows[${index}].startTime`);
  requireFiniteNumber(row.endTime, `pathRows[${index}].endTime`);
  if (row.endTime < row.startTime) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        `pathRows[${index}].endTime must be greater than or equal to startTime`,
        {
          recoverable: false,
        }
      )
    );
  }
  validateVector(row.start, `pathRows[${index}].start`);
  validateVector(row.velocity, `pathRows[${index}].velocity`);
  requireNonnegativeFiniteNumber(row.errorBound ?? 0, `pathRows[${index}].errorBound`);
  requireUint32(row.stateFlags ?? 0, `pathRows[${index}].stateFlags`);
}

function validateAssemblyStateRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `assemblyStates[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.assemblyKey, `assemblyStates[${index}].assemblyKey`);
  requireSafeUint64(row.assemblyStateKey, `assemblyStates[${index}].assemblyStateKey`);
  requireFiniteNumber(row.timeStart, `assemblyStates[${index}].timeStart`);
  requireFiniteNumber(row.timeEnd, `assemblyStates[${index}].timeEnd`);
  validateVector(row.center, `assemblyStates[${index}].center`);
  validateVector(row.velocity, `assemblyStates[${index}].velocity`);
  requireFiniteNumber(row.phase ?? 0, `assemblyStates[${index}].phase`);
  requireSafeInt64(row.cycleIndex ?? 0, `assemblyStates[${index}].cycleIndex`);
  requireUint32(row.modelVersion ?? 1, `assemblyStates[${index}].modelVersion`);
  requireUint32(row.statusFlags ?? 0, `assemblyStates[${index}].statusFlags`);
  requireUint32(row.fidelityFlags ?? 0, `assemblyStates[${index}].fidelityFlags`);
}

function validateSpaceTimeIndexOptions(options) {
  if (!options || typeof options !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time index options are required", {
        recoverable: false,
      })
    );
  }
  requirePositiveFiniteNumber(options.spatialCellSize, "options.spatialCellSize");
  requirePositiveFiniteNumber(options.timeBinSize, "options.timeBinSize");
  requirePositiveInteger(options.maxCellsPerItem, "options.maxCellsPerItem");
  requireUint32(options.maxCellsPerItem, "options.maxCellsPerItem");
}

function validateSpaceTimeQuery(query) {
  if (!query || typeof query !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time query is required", {
        recoverable: false,
      })
    );
  }
  validateSpaceTimeBounds(query.bounds, "query.bounds");
  if (query.subjectKind != null) {
    requireUint32(query.subjectKind, "query.subjectKind");
  }
  if (query.subjectKey != null) {
    requireSafeUint64(query.subjectKey, "query.subjectKey");
  }
}

function validateSpaceTimeIndexRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `rows[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeInt64(row.cellX, `rows[${index}].cellX`);
  requireSafeInt64(row.cellY, `rows[${index}].cellY`);
  requireSafeInt64(row.cellZ, `rows[${index}].cellZ`);
  requireSafeInt64(row.cellT, `rows[${index}].cellT`);
  requireSafeUint64(row.subjectKey, `rows[${index}].subjectKey`);
  requireSafeUint64(row.rowOffset, `rows[${index}].rowOffset`);
  validateSpaceTimeBounds(row, `rows[${index}]`);
  requireUint32(row.subjectKind, `rows[${index}].subjectKind`);
  requireUint32(row.sourceLayout, `rows[${index}].sourceLayout`);
  requireUint32(row.stateFlags ?? 0, `rows[${index}].stateFlags`);
}

function validateSpaceTimeBounds(bounds, label) {
  if (!bounds || typeof bounds !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are required`, {
        recoverable: false,
      })
    );
  }
  validateVector(bounds.min, `${label}.min`);
  validateVector(bounds.max, `${label}.max`);
  requireFiniteNumber(bounds.timeStart, `${label}.timeStart`);
  requireFiniteNumber(bounds.timeEnd, `${label}.timeEnd`);
  if (
    bounds.max.x < bounds.min.x ||
    bounds.max.y < bounds.min.y ||
    bounds.max.z < bounds.min.z ||
    bounds.timeEnd < bounds.timeStart
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
}

function validateRootHitInvariantRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "root/hit invariant request object is required", {
        recoverable: false,
      })
    );
  }
  const hasRoots = Array.isArray(request.roots) && request.roots.length > 0;
  const hasHits = Array.isArray(request.hits) && request.hits.length > 0;
  if (!hasRoots && !hasHits) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "root/hit invariant request requires roots or hits", {
        recoverable: false,
      })
    );
  }
  if (request.roots != null) {
    requireArray(request.roots, "roots");
    request.roots.forEach(validatePlaybackRoot);
  }
  if (request.hits != null) {
    requireArray(request.hits, "hits");
    request.hits.forEach(validatePlaybackHit);
  }
  if (request.options != null) {
    validateInvariantOptions(request.options);
  }
}

function validateInvariantOptions(options) {
  if (!options || typeof options !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "invariant options object is required", {
        recoverable: false,
      })
    );
  }
  [
    "rootResidualTolerance",
    "timeTolerance",
    "distanceTolerance",
    "directionTolerance",
    "branchWeightTolerance",
    "smallJacobianTolerance",
  ].forEach((key) => {
    if (options[key] != null) {
      requirePositiveFiniteNumber(options[key], `options.${key}`);
    }
  });
}

function validateRootLedgerTransitionRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "root-ledger transition request object is required", {
        recoverable: false,
      })
    );
  }
  requireArray(request.priorRows, "priorRows");
  requireArray(request.nextRows, "nextRows");
  request.priorRows.forEach((row, index) => validateRootLedgerDetailRow(row, `priorRows[${index}]`));
  request.nextRows.forEach((row, index) => validateRootLedgerDetailRow(row, `nextRows[${index}]`));
}

function validateRootLedgerDetailRow(row, label) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requireUint64Number(row.ledgerKey, `${label}.ledgerKey`);
  requireUint64Number(row.sourceKey, `${label}.sourceKey`);
  requireUint64Number(row.receiverKey, `${label}.receiverKey`);
  requireUint64Number(row.rootKey, `${label}.rootKey`);
  requireFiniteNumber(row.intervalStart, `${label}.intervalStart`);
  requireFiniteNumber(row.intervalEnd, `${label}.intervalEnd`);
  requireFiniteNumber(row.emissionTime, `${label}.emissionTime`);
  requireFiniteNumber(row.hitTime, `${label}.hitTime`);
  requireFiniteNumber(row.delay, `${label}.delay`);
  requireFiniteNumber(row.residual, `${label}.residual`);
  requirePositiveFiniteNumber(row.residualScale, `${label}.residualScale`);
  requireNonnegativeFiniteNumber(row.absoluteResidual, `${label}.absoluteResidual`);
  requireNonnegativeFiniteNumber(row.normalizedResidual, `${label}.normalizedResidual`);
  requireNonnegativeFiniteNumber(row.rootTolerance, `${label}.rootTolerance`);
  requireFiniteNumber(row.jacobian, `${label}.jacobian`);
  requireFiniteNumber(row.branchWeight, `${label}.branchWeight`);
  requireFiniteNumber(row.bracketStart, `${label}.bracketStart`);
  requireFiniteNumber(row.bracketEnd, `${label}.bracketEnd`);
  validateVector(row.sourcePoint, `${label}.sourcePoint`);
  validateVector(row.receiverPoint, `${label}.receiverPoint`);
  requireFiniteNumber(row.sourceNormalSpeed, `${label}.sourceNormalSpeed`);
  requireFiniteNumber(row.receiverNormalSpeed, `${label}.receiverNormalSpeed`);
  requireFiniteNumber(row.sourceNormalDenominator, `${label}.sourceNormalDenominator`);
  requireFiniteNumber(row.receiverNormalNumerator, `${label}.receiverNormalNumerator`);
  requireFiniteNumber(row.receiverNormalCrossingFactor, `${label}.receiverNormalCrossingFactor`);
  requireFiniteNumber(row.receiverNormalFactor, `${label}.receiverNormalFactor`);
  requireFiniteNumber(row.unsignedReceiverNormalFactor, `${label}.unsignedReceiverNormalFactor`);
  requireUint32(row.entryKind, `${label}.entryKind`);
  requireUint32(row.rootKind, `${label}.rootKind`);
  requireUint32(row.statusCode, `${label}.statusCode`);
  requireUint32(row.jacobianSignStratum, `${label}.jacobianSignStratum`);
  requireUint32(row.sequenceIndex, `${label}.sequenceIndex`);
  requireUint32(row.iterationCount, `${label}.iterationCount`);
  requireUint32(row.stateFlags, `${label}.stateFlags`);
  requireUint32(row.receiverNormalStatusCode, `${label}.receiverNormalStatusCode`);
  requireUint32(row.firstFailureCode, `${label}.firstFailureCode`);
}

function validateRunSimulationRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver request object is required", {
        recoverable: false,
      })
    );
  }
  if (!KNOWN_APP_IDS.includes(request.appId)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "known app id is required", {
        recoverable: false,
      })
    );
  }
  if (!DEFAULT_PRECISION_PATHS.includes(request.precisionPath)) {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "known precision path is required", {
        recoverable: false,
      })
    );
  }
  if (!request.output || !Array.isArray(request.output.outputs)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "run output contract is required", {
        recoverable: false,
      })
    );
  }
  if (request.runKind === "causalRoots") {
    validateCausalRootsRunConfig(request.config);
  } else if (request.runKind === "phaseDiagnostics") {
    validatePhaseDiagnosticsRunConfig(request.config);
  } else if (request.runKind === "pathHistory") {
    validatePathHistoryRunConfig(request.config);
  } else if (request.runKind === "delayedHits") {
    validateDelayedHitsRunConfig(request.config);
  } else if (request.runKind === "sharedGeometry") {
    validateSharedGeometryRunConfig(request.config);
  } else if (request.runKind === "validationReplay") {
    validateValidationReplayRunConfig(request.config);
  } else if (request.runKind === "appPlayback") {
    validateAppPlaybackRunConfig(request.config);
  } else if (request.runKind === "pairInteraction") {
    validatePairInteractionRunConfig(request.config);
  } else if (request.runKind === "motionSimulation") {
    validateMotionSimulationRunConfig(request.config);
  } else {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "known run kind is required", {
        recoverable: false,
      })
    );
  }
}

function validateCausalRootsRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root run config is required", {
        recoverable: false,
      })
    );
  }
  validateRunRootRequestConfig(config, "causal-root", { allowCircularSource: true });
}

function validatePhaseDiagnosticsRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase diagnostics run config is required", {
        recoverable: false,
      })
    );
  }
  if (config.appId !== "photon") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase diagnostics currently require the Photon app adapter", {
        recoverable: false,
      })
    );
  }
  validatePhaseAtHitRequest(config.phaseRequest);
}

function validatePathHistoryRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history run config is required", {
        recoverable: false,
      })
    );
  }
  if (!KNOWN_APP_IDS.includes(config.appId)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history app id is required", {
        recoverable: false,
      })
    );
  }
  if (config.streamId != null) {
    requireNonemptyString(config.streamId, "pathHistory.streamId");
  }
  if (!Array.isArray(config.pathRows) || config.pathRows.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history pathRows must be a non-empty array", {
        recoverable: false,
      })
    );
  }
  config.pathRows.forEach(validatePathHistoryRowF64);
  if (config.rowsPerChunk != null) {
    requirePositiveInteger(config.rowsPerChunk, "pathHistory.rowsPerChunk");
  }
  if (config.storagePolicy != null) {
    normalizePathHistoryStreamStoragePolicy(config.storagePolicy);
  }
  if (config.metadata != null) {
    normalizePathHistoryStreamMetadata(config.metadata);
  }
}

function validateDelayedHitsRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "delayed-hit run config is required", {
        recoverable: false,
      })
    );
  }
  validateRunRootRequestConfig(config, "delayed-hit", { allowCircularSource: true });
}

function validateRunRootRequestConfig(config, label, options = {}) {
  const hasRootRequest = config.rootRequest != null;
  const hasNormalizedRootRequest = config.normalizedRootRequest != null;
  const hasCircularSourceRootRequest = config.circularSourceRootRequest != null;
  const hasNormalizedCircularSourceRootRequest = config.normalizedCircularSourceRootRequest != null;
  const requestCount = Number(hasRootRequest) +
    Number(hasNormalizedRootRequest) +
    Number(hasCircularSourceRootRequest) +
    Number(hasNormalizedCircularSourceRootRequest);
  const hasUnsupportedCircularSource =
    (hasCircularSourceRootRequest || hasNormalizedCircularSourceRootRequest) &&
    !options.allowCircularSource;
  if (requestCount !== 1 || hasUnsupportedCircularSource) {
    const allowed = options.allowCircularSource
      ? "rootRequest, normalizedRootRequest, circularSourceRootRequest, or normalizedCircularSourceRootRequest"
      : "rootRequest or normalizedRootRequest";
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        `${label} run config must include exactly one of ${allowed}`,
        { recoverable: false }
      )
    );
  }
  if (hasNormalizedCircularSourceRootRequest) {
    validateNormalizedCircularSourceRootsHitsLedgerF64Request(config.normalizedCircularSourceRootRequest);
  } else if (hasCircularSourceRootRequest) {
    validateCircularSourceCausalRootF64Request(config.circularSourceRootRequest);
  } else if (hasNormalizedRootRequest) {
    validateNormalizedCausalRootF64Request(config.normalizedRootRequest);
  } else {
    validateCausalRootF64Request(config.rootRequest);
  }
}

function validateSharedGeometryRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "shared-geometry run config is required", {
        recoverable: false,
      })
    );
  }
  validateSharedGeometryRequest(config.geometryRequest);
}

function validateValidationReplayRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "validation replay run config is required", {
        recoverable: false,
      })
    );
  }
  if (!KNOWN_APP_IDS.includes(config.appId)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "validation replay app id is required", {
        recoverable: false,
      })
    );
  }
  if (!DEFAULT_PRECISION_PATHS.includes(config.replayPrecisionPath) || config.replayPrecisionPath === "auto") {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "validation replay requires a concrete precision path", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(config.compareLayouts) || config.compareLayouts.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "validation replay compareLayouts are required", {
        recoverable: false,
      })
    );
  }
  if (!config.baselineResponse || typeof config.baselineResponse !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "validation replay baseline response is required", {
        recoverable: false,
      })
    );
  }
  if (!config.candidateResponse || typeof config.candidateResponse !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "validation replay candidate response is required", {
        recoverable: false,
      })
    );
  }
  if (config.tolerance != null) {
    requirePositiveFiniteNumber(config.tolerance, "tolerance");
  }
  if (config.refinementTolerance != null) {
    requirePositiveFiniteNumber(config.refinementTolerance, "refinementTolerance");
  }
}

function validateAppPlaybackRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "app playback run config is required", {
        recoverable: false,
      })
    );
  }
  if (!KNOWN_APP_IDS.includes(config.appId)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "app playback app id is required", {
        recoverable: false,
      })
    );
  }
  const hasFrames = Array.isArray(config.frames) && config.frames.length > 0;
  const hasRoots = Array.isArray(config.roots) && config.roots.length > 0;
  const hasHits = Array.isArray(config.hits) && config.hits.length > 0;
  const hasGeometry = config.geometry && typeof config.geometry === "object";
  if (!hasFrames && !hasRoots && !hasHits && !hasGeometry) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "app playback requires frames, roots, hits, or geometry",
        { recoverable: false }
      )
    );
  }
  if (config.frames != null) {
    requireArray(config.frames, "frames");
    config.frames.forEach(validatePlaybackFrame);
  }
  if (config.roots != null) {
    requireArray(config.roots, "roots");
    config.roots.forEach(validatePlaybackRoot);
  }
  if (config.hits != null) {
    requireArray(config.hits, "hits");
    config.hits.forEach(validatePlaybackHit);
  }
  if (config.geometry != null) {
    validatePlaybackGeometry(config.geometry);
  }
  if (config.diagnostics != null) {
    requireArray(config.diagnostics, "diagnostics");
    config.diagnostics.forEach(validateDiagnosticRecord);
  }
}

function validatePairInteractionRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pair interaction run config is required", {
        recoverable: false,
      })
    );
  }
  const request = config.pairInteractionRequest;
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pairInteractionRequest is required", {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(request.startTime, "pairInteractionRequest.startTime");
  requireFiniteNumber(request.endTime, "pairInteractionRequest.endTime");
  requirePositiveFiniteNumber(request.step, "pairInteractionRequest.step");
  if (request.endTime < request.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pair interaction time bounds are not ordered", {
        recoverable: false,
      })
    );
  }
  requireArray(request.initialStates, "pairInteractionRequest.initialStates");
  if (request.initialStates.length !== 2) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pairInteractionRequest.initialStates must contain exactly two states", {
        recoverable: false,
      })
    );
  }
  request.initialStates.forEach((state, index) => validatePairInteractionInitialState(state, index));
  if (request.pathConstraints != null) {
    requireArray(request.pathConstraints, "pairInteractionRequest.pathConstraints");
    request.pathConstraints.forEach((constraint, index) => validatePairInteractionPathConstraint(constraint, index));
  }
  if (request.maxFrames != null) {
    requirePositiveInteger(request.maxFrames, "pairInteractionRequest.maxFrames");
  }
  if (request.pairAccelerationScale != null) {
    requirePositiveFiniteNumber(request.pairAccelerationScale, "pairInteractionRequest.pairAccelerationScale");
  }
  if (request.signalSpeed != null) {
    requirePositiveFiniteNumber(request.signalSpeed, "pairInteractionRequest.signalSpeed");
  }
  if (request.softening != null) {
    requireNonnegativeFiniteNumber(request.softening, "pairInteractionRequest.softening");
  }
  if (request.integrationTolerance != null) {
    requireNonnegativeFiniteNumber(request.integrationTolerance, "pairInteractionRequest.integrationTolerance");
  }
  if (request.pathConstraintBoundaryRelaxationIterationCount != null) {
    requireNonnegativeInteger(
      request.pathConstraintBoundaryRelaxationIterationCount,
      "pairInteractionRequest.pathConstraintBoundaryRelaxationIterationCount",
    );
    if (
      request.pathConstraintBoundaryRelaxationIterationCount >
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MAX_ITERATION_COUNT
    ) {
      throw new SolverBridgeError(
        createStatus(
          "app_contract_error",
          "error",
          "pairInteractionRequest.pathConstraintBoundaryRelaxationIterationCount exceeds supported relaxation budget",
          {
            recoverable: false,
            details: {
              pathConstraintBoundaryRelaxationIterationCount:
                request.pathConstraintBoundaryRelaxationIterationCount,
              maxPathConstraintBoundaryRelaxationIterationCount:
                PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_MAX_ITERATION_COUNT,
            },
          },
        ),
      );
    }
  }
  if (request.pathConstraintBoundaryRelaxationTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintBoundaryRelaxationTolerance,
      "pairInteractionRequest.pathConstraintBoundaryRelaxationTolerance",
    );
  }
  if (request.pathConstraintBoundaryRelaxationStepTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintBoundaryRelaxationStepTolerance,
      "pairInteractionRequest.pathConstraintBoundaryRelaxationStepTolerance",
    );
  }
  if (request.pathConstraintBoundaryResidualTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintBoundaryResidualTolerance,
      "pairInteractionRequest.pathConstraintBoundaryResidualTolerance",
    );
  }
  if (request.pathConstraintPositionResidualTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintPositionResidualTolerance,
      "pairInteractionRequest.pathConstraintPositionResidualTolerance",
    );
  }
  if (request.pathConstraintGuidanceAccelerationTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintGuidanceAccelerationTolerance,
      "pairInteractionRequest.pathConstraintGuidanceAccelerationTolerance",
    );
  }
  if (request.pathConstraintInitialVelocityResidualTolerance != null) {
    requireNonnegativeFiniteNumber(
      request.pathConstraintInitialVelocityResidualTolerance,
      "pairInteractionRequest.pathConstraintInitialVelocityResidualTolerance",
    );
  }
  if (config.streamId != null) {
    requireNonemptyString(config.streamId, "pairInteraction.streamId");
  }
  if (config.rowsPerChunk != null) {
    requirePositiveInteger(config.rowsPerChunk, "pairInteraction.rowsPerChunk");
  }
  if (config.storagePolicy != null) {
    normalizePathHistoryStreamStoragePolicy(config.storagePolicy);
  }
  if (config.metadata != null) {
    normalizePathHistoryStreamMetadata(config.metadata);
  }
}

function validatePairInteractionInitialState(state, index) {
  if (!state || typeof state !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `pairInteractionRequest.initialStates[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(state.pathKey, `pairInteractionRequest.initialStates[${index}].pathKey`);
  validateVector(state.initialPosition, `pairInteractionRequest.initialStates[${index}].initialPosition`);
  validateVector(state.initialVelocity, `pairInteractionRequest.initialStates[${index}].initialVelocity`);
  if (state.charge != null) {
    requireFiniteNumber(state.charge, `pairInteractionRequest.initialStates[${index}].charge`);
  }
  if (state.mass != null) {
    requirePositiveFiniteNumber(state.mass, `pairInteractionRequest.initialStates[${index}].mass`);
  }
  if (state.stateFlags != null) {
    requireUint32(state.stateFlags, `pairInteractionRequest.initialStates[${index}].stateFlags`);
  }
}

function validatePairInteractionPathConstraint(constraint, index) {
  if (!constraint || typeof constraint !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `pairInteractionRequest.pathConstraints[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(constraint.pathKey, `pairInteractionRequest.pathConstraints[${index}].pathKey`);
  requireFiniteNumber(constraint.time, `pairInteractionRequest.pathConstraints[${index}].time`);
  validateVector(constraint.position, `pairInteractionRequest.pathConstraints[${index}].position`);
  if (constraint.depth != null) {
    requirePositiveInteger(constraint.depth, `pairInteractionRequest.pathConstraints[${index}].depth`);
  }
}

function validateMotionSimulationRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion simulation run config is required", {
        recoverable: false,
      })
    );
  }
  const hasSampleRequest = config.motionRequest != null;
  const hasIntegrationRequest = config.motionIntegrationRequest != null;
  if (hasSampleRequest === hasIntegrationRequest) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "motion simulation requires exactly one of motionRequest or motionIntegrationRequest",
        { recoverable: false }
      )
    );
  }
  if (hasIntegrationRequest) {
    validateMotionIntegrationRequest(config.motionIntegrationRequest);
  } else {
    validateLinearMotionSampleRequest(config.motionRequest);
  }
  if (config.streamId != null) {
    requireNonemptyString(config.streamId, "motionSimulation.streamId");
  }
  if (config.rowsPerChunk != null) {
    requirePositiveInteger(config.rowsPerChunk, "motionSimulation.rowsPerChunk");
  }
  if (config.storagePolicy != null) {
    normalizePathHistoryStreamStoragePolicy(config.storagePolicy);
  }
  if (config.metadata != null) {
    normalizePathHistoryStreamMetadata(config.metadata);
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an array`, {
        recoverable: false,
      })
    );
  }
}

function validatePlaybackFrame(frame, index) {
  if (!frame || typeof frame !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `frames[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(frame.pathKey, `frames[${index}].pathKey`);
  requireSafeUint64(frame.frameIndex, `frames[${index}].frameIndex`);
  requireFiniteNumber(frame.time, `frames[${index}].time`);
  validateVector(frame.position, `frames[${index}].position`);
  validateVector(frame.velocity, `frames[${index}].velocity`);
  requireNonnegativeFiniteNumber(frame.errorBound ?? 0, `frames[${index}].errorBound`);
  requireUint32(frame.stateFlags ?? 0, `frames[${index}].stateFlags`);
}

function validatePlaybackRoot(root, index) {
  if (!root || typeof root !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `roots[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireNonnegativeInteger(root.rootId, `roots[${index}].rootId`);
  requireUint32(root.statusCode, `roots[${index}].statusCode`);
  requireFiniteNumber(root.emissionTime, `roots[${index}].emissionTime`);
  requireFiniteNumber(root.hitTime, `roots[${index}].hitTime`);
  requireNonnegativeFiniteNumber(root.delay, `roots[${index}].delay`);
  requireNonnegativeFiniteNumber(root.distance, `roots[${index}].distance`);
  requireFiniteNumber(root.residual, `roots[${index}].residual`);
  requireFiniteNumber(root.jacobian, `roots[${index}].jacobian`);
  requireFiniteNumber(root.branchWeight, `roots[${index}].branchWeight`);
  requireFiniteNumber(root.sourceNormalSpeed, `roots[${index}].sourceNormalSpeed`);
  requireFiniteNumber(root.receiverNormalSpeed, `roots[${index}].receiverNormalSpeed`);
  requireFiniteNumber(root.sourceNormalDenominator, `roots[${index}].sourceNormalDenominator`);
  requireFiniteNumber(root.receiverNormalNumerator, `roots[${index}].receiverNormalNumerator`);
  requireFiniteNumber(root.receiverNormalCrossingFactor, `roots[${index}].receiverNormalCrossingFactor`);
  requireFiniteNumber(root.receiverNormalFactor, `roots[${index}].receiverNormalFactor`);
  requireFiniteNumber(root.unsignedReceiverNormalFactor, `roots[${index}].unsignedReceiverNormalFactor`);
  requireUint32(root.receiverNormalStatusCode, `roots[${index}].receiverNormalStatusCode`);
  validateVector(root.sourcePoint, `roots[${index}].sourcePoint`);
  validateVector(root.receiverPoint, `roots[${index}].receiverPoint`);
}

function validatePlaybackHit(hit, index) {
  if (!hit || typeof hit !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `hits[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireNonnegativeInteger(hit.eventId, `hits[${index}].eventId`);
  requireNonnegativeInteger(hit.rootId, `hits[${index}].rootId`);
  requireUint32(hit.statusCode, `hits[${index}].statusCode`);
  requireFiniteNumber(hit.emissionTime, `hits[${index}].emissionTime`);
  requireFiniteNumber(hit.hitTime, `hits[${index}].hitTime`);
  requireNonnegativeFiniteNumber(hit.distance, `hits[${index}].distance`);
  requireFiniteNumber(hit.jacobian, `hits[${index}].jacobian`);
  requireFiniteNumber(hit.strength, `hits[${index}].strength`);
  requireFiniteNumber(hit.sourceNormalSpeed, `hits[${index}].sourceNormalSpeed`);
  requireFiniteNumber(hit.receiverNormalSpeed, `hits[${index}].receiverNormalSpeed`);
  requireFiniteNumber(hit.sourceNormalDenominator, `hits[${index}].sourceNormalDenominator`);
  requireFiniteNumber(hit.receiverNormalNumerator, `hits[${index}].receiverNormalNumerator`);
  requireFiniteNumber(hit.receiverNormalCrossingFactor, `hits[${index}].receiverNormalCrossingFactor`);
  requireFiniteNumber(hit.receiverNormalFactor, `hits[${index}].receiverNormalFactor`);
  requireFiniteNumber(hit.unsignedReceiverNormalFactor, `hits[${index}].unsignedReceiverNormalFactor`);
  requireUint32(hit.receiverNormalStatusCode, `hits[${index}].receiverNormalStatusCode`);
  validateVector(hit.emissionPoint, `hits[${index}].emissionPoint`);
  validateVector(hit.receiverPoint, `hits[${index}].receiverPoint`);
  validateVector(hit.unitDirection, `hits[${index}].unitDirection`);
}

function validatePlaybackGeometry(geometry) {
  if (!geometry || typeof geometry !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "geometry object is required", {
        recoverable: false,
      })
    );
  }
  requireArray(geometry.pathBounds, "geometry.pathBounds");
  requireArray(geometry.spherePointIntersections, "geometry.spherePointIntersections");
  if (geometry.delayedPotentials != null) {
    requireArray(geometry.delayedPotentials, "geometry.delayedPotentials");
  }
  if (geometry.circularSelfHitSpans != null) {
    requireArray(geometry.circularSelfHitSpans, "geometry.circularSelfHitSpans");
  }
  if (geometry.status != null) {
    validateStatusRecord(geometry.status, "geometry.status");
  }
}

function validateDiagnosticRecord(diagnostic, index) {
  if (!diagnostic || typeof diagnostic !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `diagnostics[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(diagnostic.code, `diagnostics[${index}].code`);
  if (!STATUS_SEVERITY_BY_ID.includes(diagnostic.severity)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `diagnostics[${index}].severity is invalid`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(diagnostic.message, `diagnostics[${index}].message`);
}

function validateStatusRecord(status, label) {
  if (!status || typeof status !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(status.code, `${label}.code`);
  if (!STATUS_SEVERITY_BY_ID.includes(status.severity)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.severity is invalid`, {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(status.message, `${label}.message`);
}

function requireNonemptyString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
}

async function loadWasmModule(state) {
  if (!state.modulePromise) {
    state.modulePromise = state.createWasmModule({
      locateFile: state.locateFile,
    });
  }
  return state.modulePromise;
}

async function requireWasmModule(state) {
  if (!state.createWasmModule) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "halt", "WebAssembly module factory is required", {
        recoverable: false,
      })
    );
  }
  if (!state.module) {
    state.module = await loadWasmModule(state);
  }
  return state.module;
}

function runExportedSmoke(module, exportName) {
  if (!module || typeof module.cwrap !== "function") {
    throw new SolverBridgeError(
      createStatus("unsupported_browser_storage", "error", "WebAssembly module did not expose cwrap", {
        recoverable: false,
      })
    );
  }
  const smoke = module.cwrap(exportName, "number", []);
  const status = smoke();
  if (status !== 0) {
    throw new SolverBridgeError(
      createStatus("internal_solver_error", "error", `${exportName} failed`, {
        recoverable: false,
      })
    );
  }
}

export function hasSolverCAbi(module) {
  return (
    typeof module?._architrino_solver_admit_simulation_envelope_f64 === "function" &&
    typeof module?._architrino_solver_solve_causal_roots_f64 === "function" &&
    typeof module?._architrino_solver_solve_circular_source_causal_roots_f64 === "function" &&
    typeof module?._architrino_solver_solve_circular_source_roots_hits_ledger_f64 === "function" &&
    typeof module?._architrino_solver_solve_roots_and_hits_f64 === "function" &&
    typeof module?._architrino_solver_build_root_ledger_detail_f64 === "function" &&
    typeof module?._architrino_solver_solve_causal_root_batch_f64 === "function" &&
    typeof module?._architrino_solver_diagnose_precision_f64 === "function" &&
    typeof module?._architrino_solver_solve_causal_roots_precision_f64 === "function" &&
    typeof module?._architrino_solver_solve_roots_and_hits_precision_f64 === "function" &&
    typeof module?._architrino_solver_solve_roots_hits_ledger_precision_f64 === "function" &&
    typeof module?._architrino_solver_propagate_error_budget_f64 === "function" &&
    typeof module?._architrino_solver_sample_linear_motion_f64 === "function" &&
    typeof module?._architrino_solver_sample_linear_path_history_f64 === "function" &&
    typeof module?._architrino_solver_integrate_constant_acceleration_motion_f64 === "function" &&
    typeof module?._architrino_solver_integrate_constant_acceleration_path_history_f64 === "function" &&
    typeof module?._architrino_solver_step_t3_universe_f64 === "function" &&
    typeof module?._architrino_solver_compute_phase_at_hit_f64 === "function" &&
    typeof module?._architrino_solver_compute_path_bounds_f64 === "function" &&
    typeof module?._architrino_solver_intersect_sphere_points_f64 === "function" &&
    typeof module?._architrino_solver_compute_delayed_potentials_f64 === "function" &&
    typeof module?._architrino_solver_solve_circular_self_hit_spans_f64 === "function" &&
    typeof module?._architrino_solver_detect_assembly_membership_events_f64 === "function" &&
    typeof module?._architrino_solver_build_spacetime_index_f64 === "function" &&
    typeof module?._architrino_solver_query_spacetime_index_f64 === "function" &&
    typeof module?._architrino_solver_query_emission_shell_broad_phase_f64 === "function" &&
    typeof module?._architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64 === "function" &&
    typeof module?._architrino_solver_estimate_emission_shell_narrow_phase_f64 === "function" &&
    typeof module?._architrino_solver_plan_path_history_storage_lifecycle === "function" &&
    typeof module?._architrino_solver_get_abi_info === "function"
  );
}

function readAbiInfo(module) {
  const ptr = module._malloc(ABI_INFO_BYTES);
  try {
    const getAbiInfo = module.cwrap("architrino_solver_get_abi_info", "number", ["number"]);
    const status = getAbiInfo(ptr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "error", "ABI info query failed", {
          recoverable: false,
        })
      );
    }
    return {
      abiMajor: module.getValue(ptr, "i32"),
      abiMinor: module.getValue(ptr + 4, "i32"),
      abiPatch: module.getValue(ptr + 8, "i32"),
      rootRequestF64Bytes: module.getValue(ptr + 12, "i32"),
      rootRowF64Bytes: module.getValue(ptr + 16, "i32"),
      delayedHitRowF64Bytes: module.getValue(ptr + 20, "i32"),
      motionSampleRequestF64Bytes: module.getValue(ptr + 24, "i32"),
      motionFrameRowF64Bytes: module.getValue(ptr + 28, "i32"),
      phaseClockF64Bytes: module.getValue(ptr + 32, "i32"),
      phaseAtHitRowF64Bytes: module.getValue(ptr + 36, "i32"),
      boundsRowF64Bytes: module.getValue(ptr + 40, "i32"),
      spherePointRequestF64Bytes: module.getValue(ptr + 44, "i32"),
      spherePointRowF64Bytes: module.getValue(ptr + 48, "i32"),
      delayedPotentialRequestF64Bytes: module.getValue(ptr + 52, "i32"),
      delayedPotentialRowF64Bytes: module.getValue(ptr + 56, "i32"),
      circularSelfHitRequestF64Bytes: module.getValue(ptr + 60, "i32"),
      circularSelfHitRowF64Bytes: module.getValue(ptr + 64, "i32"),
      assemblyStateRowF64Bytes: module.getValue(ptr + 68, "i32"),
      assemblyMembershipRowF64Bytes: module.getValue(ptr + 72, "i32"),
      assemblyHierarchyRowF64Bytes: module.getValue(ptr + 76, "i32"),
      assemblyEventRowF64Bytes: module.getValue(ptr + 80, "i32"),
      pathHistoryRowF64Bytes: module.getValue(ptr + 84, "i32"),
      pathHistoryChunkRowBytes: module.getValue(ptr + 88, "i32"),
      storageLifecyclePolicyBytes: module.getValue(ptr + 92, "i32"),
      pathHistoryLifecycleDecisionRowBytes: module.getValue(ptr + 96, "i32"),
      spaceTimeIndexRowF64Bytes: module.getValue(ptr + 100, "i32"),
      emissionShellBroadPhaseOptionsF64Bytes: module.getValue(ptr + 104, "i32"),
      emissionShellCandidateRowF64Bytes: module.getValue(ptr + 108, "i32"),
      emissionShellBroadPhaseSummaryBytes: module.getValue(ptr + 112, "i32"),
      emissionShellNarrowPhaseRequestF64Bytes: module.getValue(ptr + 116, "i32"),
      emissionShellNarrowPhaseRowF64Bytes: module.getValue(ptr + 120, "i32"),
      rootLedgerDetailRowF64Bytes: module.getValue(ptr + 124, "i32"),
      errorBudgetF64Bytes: module.getValue(ptr + 128, "i32"),
      errorBudgetStageInputF64Bytes: module.getValue(ptr + 132, "i32"),
      errorBudgetStageRowF64Bytes: module.getValue(ptr + 136, "i32"),
      errorBudgetSummaryF64Bytes: module.getValue(ptr + 140, "i32"),
      precisionSolveOptionsBytes: module.getValue(ptr + 144, "i32"),
      precisionSolveSummaryF64Bytes: module.getValue(ptr + 148, "i32"),
      motionIntegrationRequestF64Bytes: module.getValue(ptr + 152, "i32"),
      circularPathSegmentF64Bytes: module.getValue(ptr + 156, "i32"),
      circularSourceRootRequestF64Bytes: module.getValue(ptr + 160, "i32"),
      modelContractBytes: module.getValue(ptr + 164, "i32"),
      simulationEnvelopeF64Bytes: module.getValue(ptr + 168, "i32"),
      capabilityEnvelopeF64Bytes: module.getValue(ptr + 172, "i32"),
      admissionStressSummaryF64Bytes: module.getValue(ptr + 176, "i32"),
      statusRowBytes: module.getValue(ptr + 180, "i32"),
      admissionReportF64Bytes: module.getValue(ptr + 184, "i32"),
      pairInteractionRequestF64Bytes: module.getValue(ptr + 188, "i32"),
      t3StepRequestF64Bytes: module.getValue(ptr + 192, "i32"),
      t3ParticleStateF64Bytes: module.getValue(ptr + 196, "i32"),
      t3ParticleStepRowF64Bytes: module.getValue(ptr + 200, "i32"),
      t3StepSummaryF64Bytes: module.getValue(ptr + 204, "i32"),
      t3UnresolvedRootSegmentRowF64Bytes: module.getValue(ptr + 208, "i32"),
      t3RetainedCausalRootReplayRowF64Bytes: module.getValue(ptr + 212, "i32"),
    };
  } finally {
    module._free(ptr);
  }
}

function defaultAbiInfo() {
  return {
    abiMajor: 0,
    abiMinor: 19,
    abiPatch: 0,
    rootRequestF64Bytes: CAUSAL_ROOT_REQUEST_F64_BYTES,
    rootRowF64Bytes: CAUSAL_ROOT_ROW_F64_BYTES,
    delayedHitRowF64Bytes: DELAYED_HIT_ROW_F64_BYTES,
    motionSampleRequestF64Bytes: MOTION_SAMPLE_REQUEST_F64_BYTES,
    motionFrameRowF64Bytes: FRAME_BUFFER_ROW_F64_BYTES,
    phaseClockF64Bytes: PHASE_CLOCK_F64_BYTES,
    phaseAtHitRowF64Bytes: PHASE_AT_HIT_ROW_F64_BYTES,
    boundsRowF64Bytes: GEOMETRY_BOUNDS_ROW_F64_BYTES,
    spherePointRequestF64Bytes: SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES,
    spherePointRowF64Bytes: SPHERE_POINT_INTERSECTION_ROW_F64_BYTES,
    delayedPotentialRequestF64Bytes: DELAYED_POTENTIAL_REQUEST_F64_BYTES,
    delayedPotentialRowF64Bytes: DELAYED_POTENTIAL_ROW_F64_BYTES,
    circularSelfHitRequestF64Bytes: CIRCULAR_SELF_HIT_REQUEST_F64_BYTES,
    circularSelfHitRowF64Bytes: CIRCULAR_SELF_HIT_ROW_F64_BYTES,
    assemblyStateRowF64Bytes: ASSEMBLY_STATE_ROW_F64_BYTES,
    assemblyMembershipRowF64Bytes: ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES,
    assemblyHierarchyRowF64Bytes: ASSEMBLY_HIERARCHY_ROW_F64_BYTES,
    assemblyEventRowF64Bytes: ASSEMBLY_EVENT_ROW_F64_BYTES,
    pathHistoryRowF64Bytes: PATH_HISTORY_ROW_F64_BYTES,
    pathHistoryChunkRowBytes: PATH_HISTORY_CHUNK_ROW_BYTES,
    storageLifecyclePolicyBytes: STORAGE_LIFECYCLE_POLICY_BYTES,
    pathHistoryLifecycleDecisionRowBytes: PATH_HISTORY_LIFECYCLE_DECISION_ROW_BYTES,
    spaceTimeIndexRowF64Bytes: SPACETIME_INDEX_ROW_F64_BYTES,
    emissionShellBroadPhaseOptionsF64Bytes: EMISSION_SHELL_BROAD_PHASE_OPTIONS_F64_BYTES,
    emissionShellCandidateRowF64Bytes: EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES,
    emissionShellBroadPhaseSummaryBytes: EMISSION_SHELL_BROAD_PHASE_SUMMARY_BYTES,
    emissionShellNarrowPhaseRequestF64Bytes: EMISSION_SHELL_NARROW_PHASE_REQUEST_F64_BYTES,
    emissionShellNarrowPhaseRowF64Bytes: EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES,
    rootLedgerDetailRowF64Bytes: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
    errorBudgetF64Bytes: ERROR_BUDGET_F64_BYTES,
    errorBudgetStageInputF64Bytes: ERROR_BUDGET_STAGE_INPUT_F64_BYTES,
    errorBudgetStageRowF64Bytes: ERROR_BUDGET_STAGE_ROW_F64_BYTES,
    errorBudgetSummaryF64Bytes: ERROR_BUDGET_SUMMARY_F64_BYTES,
    precisionSolveOptionsBytes: PRECISION_SOLVE_OPTIONS_BYTES,
    precisionSolveSummaryF64Bytes: PRECISION_SOLVE_SUMMARY_F64_BYTES,
    motionIntegrationRequestF64Bytes: MOTION_INTEGRATION_REQUEST_F64_BYTES,
    circularPathSegmentF64Bytes: CIRCULAR_PATH_SEGMENT_F64_BYTES,
    circularSourceRootRequestF64Bytes: CIRCULAR_SOURCE_ROOT_REQUEST_F64_BYTES,
    modelContractBytes: MODEL_CONTRACT_BYTES,
    simulationEnvelopeF64Bytes: SIMULATION_ENVELOPE_F64_BYTES,
    capabilityEnvelopeF64Bytes: CAPABILITY_ENVELOPE_F64_BYTES,
    admissionStressSummaryF64Bytes: ADMISSION_STRESS_SUMMARY_F64_BYTES,
    statusRowBytes: STATUS_ROW_BYTES,
    admissionReportF64Bytes: ADMISSION_REPORT_F64_BYTES,
    pairInteractionRequestF64Bytes: PAIR_INTERACTION_REQUEST_F64_BYTES,
    t3StepRequestF64Bytes: T3_STEP_REQUEST_F64_BYTES,
    t3ParticleStateF64Bytes: T3_PARTICLE_STATE_F64_BYTES,
    t3ParticleStepRowF64Bytes: T3_PARTICLE_STEP_ROW_F64_BYTES,
    t3StepSummaryF64Bytes: T3_STEP_SUMMARY_F64_BYTES,
    t3UnresolvedRootSegmentRowF64Bytes: T3_UNRESOLVED_ROOT_SEGMENT_ROW_F64_BYTES,
    t3RetainedCausalRootReplayRowF64Bytes: T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_F64_BYTES,
  };
}

function assertAbiInfo(abiInfo) {
  if (
    abiInfo.abiMajor !== 0 ||
    abiInfo.abiMinor !== 19 ||
    abiInfo.abiPatch !== 0 ||
    abiInfo.rootRequestF64Bytes !== CAUSAL_ROOT_REQUEST_F64_BYTES ||
    abiInfo.rootRowF64Bytes !== CAUSAL_ROOT_ROW_F64_BYTES ||
    abiInfo.delayedHitRowF64Bytes !== DELAYED_HIT_ROW_F64_BYTES ||
    abiInfo.motionSampleRequestF64Bytes !== MOTION_SAMPLE_REQUEST_F64_BYTES ||
    abiInfo.motionFrameRowF64Bytes !== FRAME_BUFFER_ROW_F64_BYTES ||
    abiInfo.phaseClockF64Bytes !== PHASE_CLOCK_F64_BYTES ||
    abiInfo.phaseAtHitRowF64Bytes !== PHASE_AT_HIT_ROW_F64_BYTES ||
    abiInfo.boundsRowF64Bytes !== GEOMETRY_BOUNDS_ROW_F64_BYTES ||
    abiInfo.spherePointRequestF64Bytes !== SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES ||
    abiInfo.spherePointRowF64Bytes !== SPHERE_POINT_INTERSECTION_ROW_F64_BYTES ||
    abiInfo.delayedPotentialRequestF64Bytes !== DELAYED_POTENTIAL_REQUEST_F64_BYTES ||
    abiInfo.delayedPotentialRowF64Bytes !== DELAYED_POTENTIAL_ROW_F64_BYTES ||
    abiInfo.circularSelfHitRequestF64Bytes !== CIRCULAR_SELF_HIT_REQUEST_F64_BYTES ||
    abiInfo.circularSelfHitRowF64Bytes !== CIRCULAR_SELF_HIT_ROW_F64_BYTES ||
    abiInfo.assemblyStateRowF64Bytes !== ASSEMBLY_STATE_ROW_F64_BYTES ||
    abiInfo.assemblyMembershipRowF64Bytes !== ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES ||
    abiInfo.assemblyHierarchyRowF64Bytes !== ASSEMBLY_HIERARCHY_ROW_F64_BYTES ||
    abiInfo.assemblyEventRowF64Bytes !== ASSEMBLY_EVENT_ROW_F64_BYTES ||
    abiInfo.pathHistoryRowF64Bytes !== PATH_HISTORY_ROW_F64_BYTES ||
    abiInfo.pathHistoryChunkRowBytes !== PATH_HISTORY_CHUNK_ROW_BYTES ||
    abiInfo.storageLifecyclePolicyBytes !== STORAGE_LIFECYCLE_POLICY_BYTES ||
    abiInfo.pathHistoryLifecycleDecisionRowBytes !== PATH_HISTORY_LIFECYCLE_DECISION_ROW_BYTES ||
    abiInfo.spaceTimeIndexRowF64Bytes !== SPACETIME_INDEX_ROW_F64_BYTES ||
    abiInfo.emissionShellBroadPhaseOptionsF64Bytes !== EMISSION_SHELL_BROAD_PHASE_OPTIONS_F64_BYTES ||
    abiInfo.emissionShellCandidateRowF64Bytes !== EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES ||
    abiInfo.emissionShellBroadPhaseSummaryBytes !== EMISSION_SHELL_BROAD_PHASE_SUMMARY_BYTES ||
    abiInfo.emissionShellNarrowPhaseRequestF64Bytes !== EMISSION_SHELL_NARROW_PHASE_REQUEST_F64_BYTES ||
    abiInfo.emissionShellNarrowPhaseRowF64Bytes !== EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES ||
    abiInfo.rootLedgerDetailRowF64Bytes !== ROOT_LEDGER_DETAIL_ROW_F64_BYTES ||
    abiInfo.errorBudgetF64Bytes !== ERROR_BUDGET_F64_BYTES ||
    abiInfo.errorBudgetStageInputF64Bytes !== ERROR_BUDGET_STAGE_INPUT_F64_BYTES ||
    abiInfo.errorBudgetStageRowF64Bytes !== ERROR_BUDGET_STAGE_ROW_F64_BYTES ||
    abiInfo.errorBudgetSummaryF64Bytes !== ERROR_BUDGET_SUMMARY_F64_BYTES ||
    abiInfo.precisionSolveOptionsBytes !== PRECISION_SOLVE_OPTIONS_BYTES ||
    abiInfo.precisionSolveSummaryF64Bytes !== PRECISION_SOLVE_SUMMARY_F64_BYTES ||
    abiInfo.motionIntegrationRequestF64Bytes !== MOTION_INTEGRATION_REQUEST_F64_BYTES ||
    abiInfo.circularPathSegmentF64Bytes !== CIRCULAR_PATH_SEGMENT_F64_BYTES ||
    abiInfo.circularSourceRootRequestF64Bytes !== CIRCULAR_SOURCE_ROOT_REQUEST_F64_BYTES ||
    abiInfo.modelContractBytes !== MODEL_CONTRACT_BYTES ||
    abiInfo.simulationEnvelopeF64Bytes !== SIMULATION_ENVELOPE_F64_BYTES ||
    abiInfo.capabilityEnvelopeF64Bytes !== CAPABILITY_ENVELOPE_F64_BYTES ||
    abiInfo.admissionStressSummaryF64Bytes !== ADMISSION_STRESS_SUMMARY_F64_BYTES ||
    abiInfo.statusRowBytes !== STATUS_ROW_BYTES ||
    abiInfo.admissionReportF64Bytes !== ADMISSION_REPORT_F64_BYTES ||
    abiInfo.pairInteractionRequestF64Bytes !== PAIR_INTERACTION_REQUEST_F64_BYTES ||
    abiInfo.t3StepRequestF64Bytes !== T3_STEP_REQUEST_F64_BYTES ||
    abiInfo.t3ParticleStateF64Bytes !== T3_PARTICLE_STATE_F64_BYTES ||
    abiInfo.t3ParticleStepRowF64Bytes !== T3_PARTICLE_STEP_ROW_F64_BYTES ||
    abiInfo.t3StepSummaryF64Bytes !== T3_STEP_SUMMARY_F64_BYTES ||
    abiInfo.t3UnresolvedRootSegmentRowF64Bytes !== T3_UNRESOLVED_ROOT_SEGMENT_ROW_F64_BYTES ||
    abiInfo.t3RetainedCausalRootReplayRowF64Bytes !==
      T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_F64_BYTES
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver ABI row sizes do not match bridge layout", {
        recoverable: false,
        details: abiInfo,
      })
    );
  }
}

function solveCircularSourceCausalRootsF64WithModule(module, request, abiInfo) {
  validateCircularSourceCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const requestPtr = module._malloc(abiInfo.circularSourceRootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outCountPtr = module._malloc(4);

  try {
    writeCircularSourceCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_circular_source_causal_roots_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(requestPtr, rootsPtr, maxRoots, outCountPtr);
    const rootCount = module.getValue(outCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus(
          "internal_solver_error",
          "halt",
          `circular-source causal root C ABI returned ${status}`,
          {
            recoverable: false,
            details: { status, rootCount },
          }
        )
      );
    }
    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    return {
      roots,
      status: createStatus("ok", "ok", "circular-source causal roots solved"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(outCountPtr);
  }
}

function solveCausalRootsF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_causal_roots_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(requestPtr, rootsPtr, maxRoots, outCountPtr);
    const rootCount = module.getValue(outCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `causal root C ABI returned ${status}`, {
          recoverable: false,
          details: { status, rootCount },
        })
      );
    }
    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    return {
      roots,
      status: createStatus("ok", "ok", "causal roots solved"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(outCountPtr);
  }
}

function solveCausalRootsNormalizedF64WithModule(module, request, abiInfo) {
  validateNormalizedCausalRootF64Request(request);
  const localRequest = deepCloneJson(request.localRequest);
  const localResponse = solveCausalRootsF64WithModule(module, localRequest, abiInfo);
  const coordinateOrigin = copyVector(request.coordinateOrigin);
  const roots = localResponse.roots.map((root) => ({
    ...root,
    coordinateFrame: "origin-normalized",
  }));
  const absoluteRoots = request.restoreAbsolutePoints === false
    ? undefined
    : roots.map((root) => restoreCausalRootAbsolutePoints(root, coordinateOrigin));
  const status = createStatus("ok", "ok", "origin-normalized causal roots solved", {
    details: {
      coordinateFrame: "origin-normalized",
      localRootCount: roots.length,
      absolutePointAuthority: request.restoreAbsolutePoints === false ? "omitted" : "display-only",
    },
  });
  return {
    schema: "solver-causal-roots-normalized-f64.v1",
    coordinateFrame: "origin-normalized",
    coordinateOrigin,
    localRequest,
    roots,
    absoluteRoots,
    status,
  };
}

function buildRootLedgerDetailF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (request.maxRows != null) {
    requirePositiveInt32(request.maxRows, "maxRows");
  }
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRows = request.maxRows ?? DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rowsPtr = module._malloc(abiInfo.rootLedgerDetailRowF64Bytes * maxRows);
  const outCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const buildLedger = module.cwrap("architrino_solver_build_root_ledger_detail_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = buildLedger(requestPtr, rowsPtr, maxRows, outCountPtr);
    const rowCount = module.getValue(outCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `root-ledger detail C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, maxRows },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(
        readRootLedgerDetailRowF64(
          module,
          rowsPtr + index * abiInfo.rootLedgerDetailRowF64Bytes,
          request.rootTolerance ?? 1e-12
        )
      );
    }
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.rootLedgerDetailRowF64Bytes);
    return {
      rows,
      buffers: [
        createBufferDescriptor(
          "root-ledger-detail",
          "root_ledger_detail.v1",
          rowCount,
          abiInfo.rootLedgerDetailRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "root-ledger detail built"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rowsPtr);
    module._free(outCountPtr);
  }
}

function createEmptyRootLedgerDetailF64Response(abiInfo) {
  return {
    rows: [],
    buffers: [
      createBufferDescriptor(
        "precision-root-ledger-detail",
        "root_ledger_detail.v1",
        0,
        abiInfo.rootLedgerDetailRowF64Bytes,
        new ArrayBuffer(0)
      ),
    ],
    status: createStatus("ok", "ok", "root-ledger detail empty"),
  };
}

function diagnosePrecisionF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const diagnosticPtr = module._malloc(PRECISION_DIAGNOSTIC_ROW_F64_BYTES);
  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    const diagnose = module.cwrap("architrino_solver_diagnose_precision_f64", "number", [
      "number",
      "number",
    ]);
    const status = diagnose(requestPtr, diagnosticPtr);
    const diagnostic = readPrecisionDiagnosticRowF64(module, diagnosticPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `precision diagnostic C ABI returned ${status}`, {
          recoverable: false,
          details: { status, diagnostic },
        })
      );
    }
    return {
      ...diagnostic,
      status: createPrecisionDiagnosticStatus(diagnostic),
    };
  } finally {
    module._free(requestPtr);
    module._free(diagnosticPtr);
  }
}

function solveCausalRootsPrecisionF64WithModule(module, request, abiInfo) {
  validateCausalRootsPrecisionF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const maxRoots = request.maxRoots ?? request.rootRequest.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const optionsPtr = module._malloc(abiInfo.precisionSolveOptionsBytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outCountPtr = module._malloc(4);
  const summaryPtr = module._malloc(abiInfo.precisionSolveSummaryF64Bytes);

  try {
    writeCausalRootRequestF64(module, requestPtr, request.rootRequest);
    writePrecisionSolveOptions(module, optionsPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_causal_roots_precision_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(requestPtr, optionsPtr, rootsPtr, maxRoots, outCountPtr, summaryPtr);
    const rootCount = module.getValue(outCountPtr, "i32");
    const precision = readPrecisionSolveSummaryF64(module, summaryPtr);
    if (status !== 0 && status !== -2) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `precision causal-root C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rootCount, maxRoots, precision },
        })
      );
    }

    const roots = [];
    if (status === 0) {
      for (let index = 0; index < rootCount; index += 1) {
        roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
      }
    }
    const buffer = status === 0
      ? copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes)
      : new ArrayBuffer(0);
    const responseStatus = createPrecisionSolveStatus(status, precision);
    return {
      schema: "solver-causal-roots-precision-f64.v1",
      roots,
      precision,
      buffers: [
        createBufferDescriptor(
          "precision-root-ledger",
          "root_ledger.v1",
          roots.length,
          abiInfo.rootRowF64Bytes,
          buffer
        ),
      ],
      status: responseStatus,
    };
  } finally {
    module._free(requestPtr);
    module._free(optionsPtr);
    module._free(rootsPtr);
    module._free(outCountPtr);
    module._free(summaryPtr);
  }
}

function solveRootsAndHitsPrecisionF64WithModule(module, request, abiInfo) {
  validateCausalRootsPrecisionF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const maxRoots = request.maxRoots ?? request.rootRequest.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const maxHits = request.maxHits ?? request.rootRequest.maxHits ?? maxRoots;
  const maxLedgerRows = Math.max(DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS, maxRoots * 3 + 3);
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const optionsPtr = module._malloc(abiInfo.precisionSolveOptionsBytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const hitsPtr = module._malloc(abiInfo.delayedHitRowF64Bytes * maxHits);
  const ledgerRowsPtr = module._malloc(abiInfo.rootLedgerDetailRowF64Bytes * maxLedgerRows);
  const outRootCountPtr = module._malloc(4);
  const outHitCountPtr = module._malloc(4);
  const outLedgerRowCountPtr = module._malloc(4);
  const summaryPtr = module._malloc(abiInfo.precisionSolveSummaryF64Bytes);

  try {
    writeCausalRootRequestF64(module, requestPtr, request.rootRequest);
    writePrecisionSolveOptions(module, optionsPtr, request);
    module.setValue(outRootCountPtr, 0, "i32");
    module.setValue(outHitCountPtr, 0, "i32");
    module.setValue(outLedgerRowCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_roots_hits_ledger_precision_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(
      requestPtr,
      optionsPtr,
      rootsPtr,
      maxRoots,
      outRootCountPtr,
      hitsPtr,
      maxHits,
      outHitCountPtr,
      ledgerRowsPtr,
      maxLedgerRows,
      outLedgerRowCountPtr,
      summaryPtr
    );
    const rootCount = module.getValue(outRootCountPtr, "i32");
    const hitCount = module.getValue(outHitCountPtr, "i32");
    const ledgerRowCount = module.getValue(outLedgerRowCountPtr, "i32");
    const precision = readPrecisionSolveSummaryF64(module, summaryPtr);
    if (status !== 0 && status !== -2) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `precision roots-and-hits C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rootCount, hitCount, ledgerRowCount, maxRoots, maxHits, maxLedgerRows, precision },
        })
      );
    }

    const roots = [];
    const hits = [];
    const rootLedgerDetails = [];
    if (status === 0) {
      for (let index = 0; index < rootCount; index += 1) {
        roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
      }
      for (let index = 0; index < hitCount; index += 1) {
        hits.push(readDelayedHitRowF64(module, hitsPtr + index * abiInfo.delayedHitRowF64Bytes));
      }
      for (let index = 0; index < ledgerRowCount; index += 1) {
        rootLedgerDetails.push(
          readRootLedgerDetailRowF64(
            module,
            ledgerRowsPtr + index * abiInfo.rootLedgerDetailRowF64Bytes,
            precision.rootTolerance
          )
        );
      }
    }
    const rootBuffer = status === 0
      ? copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes)
      : new ArrayBuffer(0);
    const hitBuffer = status === 0
      ? copyWasmBytes(module, hitsPtr, hitCount * abiInfo.delayedHitRowF64Bytes)
      : new ArrayBuffer(0);
    const ledgerBuffer = status === 0
      ? copyWasmBytes(module, ledgerRowsPtr, ledgerRowCount * abiInfo.rootLedgerDetailRowF64Bytes)
      : new ArrayBuffer(0);
    const rootBufferDescriptor = createBufferDescriptor(
      "precision-root-ledger",
      "root_ledger.v1",
      roots.length,
      abiInfo.rootRowF64Bytes,
      rootBuffer
    );
    const hitBufferDescriptor = createBufferDescriptor(
      "precision-delayed-hit-events",
      "delayed_hit_events.v1",
      hits.length,
      abiInfo.delayedHitRowF64Bytes,
      hitBuffer
    );
    const responseStatus = createPrecisionSolveStatus(
      status,
      precision,
      "causal roots and delayed hits"
    );
    const rootLedgerDetailBuffer = status === 0
      ? createBufferDescriptor(
          "precision-root-ledger-detail",
          "root_ledger_detail.v1",
          rootLedgerDetails.length,
          abiInfo.rootLedgerDetailRowF64Bytes,
          ledgerBuffer
        )
      : createEmptyRootLedgerDetailF64Response(abiInfo).buffers[0];
    return {
      schema: "solver-roots-and-hits-precision-f64.v1",
      roots,
      hits,
      rootLedgerDetails,
      precision,
      buffers: [rootBufferDescriptor, hitBufferDescriptor, rootLedgerDetailBuffer],
      streams: [
        createTransientStreamDescriptor("causal-root-transient", request.rootRequest.hitTime, [
          rootBufferDescriptor,
          hitBufferDescriptor,
          rootLedgerDetailBuffer,
        ]),
      ],
      status: responseStatus,
    };
  } finally {
    module._free(requestPtr);
    module._free(optionsPtr);
    module._free(rootsPtr);
    module._free(hitsPtr);
    module._free(ledgerRowsPtr);
    module._free(outRootCountPtr);
    module._free(outHitCountPtr);
    module._free(outLedgerRowCountPtr);
    module._free(summaryPtr);
  }
}

function propagateErrorBudgetF64WithModule(module, request, abiInfo) {
  validateErrorBudgetPropagationRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const stageCount = request.stages.length;
  const maxRows = request.maxRows ?? stageCount;
  const budgetPtr = module._malloc(abiInfo.errorBudgetF64Bytes);
  const inputPtr = module._malloc(abiInfo.errorBudgetStageInputF64Bytes * Math.max(stageCount, 1));
  const rowsPtr = module._malloc(abiInfo.errorBudgetStageRowF64Bytes * Math.max(maxRows, 1));
  const summaryPtr = module._malloc(abiInfo.errorBudgetSummaryF64Bytes);

  try {
    writeErrorBudgetF64(module, budgetPtr, request.errorBudget);
    request.stages.forEach((stage, index) => {
      writeErrorBudgetStageInputF64(
        module,
        inputPtr + index * abiInfo.errorBudgetStageInputF64Bytes,
        stage
      );
    });
    const propagate = module.cwrap("architrino_solver_propagate_error_budget_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = propagate(budgetPtr, inputPtr, stageCount, rowsPtr, maxRows, summaryPtr);
    const summary = readErrorBudgetSummaryF64(module, summaryPtr);
    if (status !== 0 && status !== -2) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `error-budget propagation C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, stageCount: summary.stageCount, maxRows },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < Math.min(summary.stageCount, maxRows); index += 1) {
      rows.push(
        readErrorBudgetStageRowF64(module, rowsPtr + index * abiInfo.errorBudgetStageRowF64Bytes)
      );
    }
    const summaryStatus = createStatus(
      summary.statusCode,
      summary.statusSeverity,
      summary.authority === "rejected"
        ? "error budget propagation rejected"
        : "error budget propagation complete",
      {
        recoverable: summary.authority !== "rejected",
      }
    );
    return {
      cumulativeError: summary.cumulativeError,
      cumulativeBudgetRatio: summary.cumulativeBudgetRatio,
      authority: summary.authority,
      stages: rows,
      statuses: [...rows.map((row) => row.status), summaryStatus],
      status: summaryStatus,
    };
  } finally {
    module._free(budgetPtr);
    module._free(inputPtr);
    module._free(rowsPtr);
    module._free(summaryPtr);
  }
}

function createPrecisionDiagnosticStatus(diagnostic) {
  const code = STATUS_CODE_BY_ID[diagnostic.statusCode] || "precision_failed";
  if (code === "ok") {
    return createStatus("ok", "ok", "precision diagnostic complete");
  }
  return createStatus(code, "warning", "precision diagnostic completed with warnings", {
    details: {
      statusCode: diagnostic.statusCode,
      scaleResolutionLimited: diagnostic.scaleResolutionLimited,
      timeResolutionLimited: diagnostic.timeResolutionLimited,
      scaleNormalizationRecommended: diagnostic.scaleNormalizationRecommended,
      extendedPrecisionRecommended: diagnostic.extendedPrecisionRecommended,
    },
  });
}

function createPrecisionSolveStatus(cAbiStatus, precision, subject = "causal roots") {
  if (cAbiStatus === -2) {
    return createStatus(
      precision.statusCode,
      precision.statusSeverity === "ok" ? "error" : precision.statusSeverity,
      `precision ${subject} solve rejected`,
      {
        recoverable: false,
        details: precision,
      }
    );
  }
  if (precision.statusCode === "ok") {
    return createStatus("ok", "ok", `precision ${subject} solved`, {
      details: precision,
    });
  }
  return createStatus(
    precision.statusCode,
    precision.statusSeverity,
    `precision ${subject} solved with diagnostics`,
    {
      details: precision,
    }
  );
}

function solveCausalRootBatchF64WithModule(module, request, abiInfo) {
  validateCausalRootBatchF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const requestCount = request.requests.length;
  const maxItems = request.maxItems ?? requestCount;
  const maxRoots = request.maxRoots ?? requestCount * DEFAULT_MAX_CAUSAL_ROOTS;
  const workerCount = request.workerCount ?? 0;
  requirePositiveInt32(maxItems, "maxItems");
  requirePositiveInt32(maxRoots, "maxRoots");
  requireNonnegativeInt32(workerCount, "workerCount");
  const requestsPtr = module._malloc(abiInfo.rootRequestF64Bytes * requestCount);
  const itemRowsPtr = module._malloc(CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES * maxItems);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outItemCountPtr = module._malloc(4);
  const outRootCountPtr = module._malloc(4);

  try {
    request.requests.forEach((itemRequest, index) => {
      writeCausalRootRequestF64(module, requestsPtr + index * abiInfo.rootRequestF64Bytes, itemRequest);
    });
    module.setValue(outItemCountPtr, 0, "i32");
    module.setValue(outRootCountPtr, 0, "i32");
    const solveBatch = module.cwrap("architrino_solver_solve_causal_root_batch_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solveBatch(
      requestsPtr,
      requestCount,
      workerCount,
      itemRowsPtr,
      maxItems,
      rootsPtr,
      maxRoots,
      outItemCountPtr,
      outRootCountPtr
    );
    const itemCount = module.getValue(outItemCountPtr, "i32");
    const rootCount = module.getValue(outRootCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `causal root batch C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, itemCount, rootCount },
        })
      );
    }

    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    const items = [];
    for (let index = 0; index < itemCount; index += 1) {
      const item = readCausalRootBatchItemRowF64(
        module,
        itemRowsPtr + index * CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES
      );
      items.push({
        ...item,
        roots: roots.slice(item.rootOffset, item.rootOffset + item.rootCount),
      });
    }
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes);
    return {
      items,
      roots,
      buffers: [
        createBufferDescriptor(
          "batch-root-ledger",
          "root_ledger.v1",
          rootCount,
          abiInfo.rootRowF64Bytes,
          rootBuffer
        ),
      ],
      status: createStatus("ok", "ok", "causal root batch solved"),
    };
  } finally {
    module._free(requestsPtr);
    module._free(itemRowsPtr);
    module._free(rootsPtr);
    module._free(outItemCountPtr);
    module._free(outRootCountPtr);
  }
}

function solveRootsAndHitsBatchF64WithModule(module, request, abiInfo) {
  validateCausalRootBatchF64Request(request);
  if (request.maxHits != null) {
    requirePositiveInt32(request.maxHits, "maxHits");
  }
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const requestCount = request.requests.length;
  const maxItems = request.maxItems ?? requestCount;
  const maxRoots = request.maxRoots ?? requestCount * DEFAULT_MAX_CAUSAL_ROOTS;
  const maxHits = request.maxHits ?? maxRoots;
  const workerCount = request.workerCount ?? 0;
  requirePositiveInt32(maxItems, "maxItems");
  requirePositiveInt32(maxRoots, "maxRoots");
  requirePositiveInt32(maxHits, "maxHits");
  requireNonnegativeInt32(workerCount, "workerCount");
  const requestsPtr = module._malloc(abiInfo.rootRequestF64Bytes * requestCount);
  const itemRowsPtr = module._malloc(CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES * maxItems);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const hitsPtr = module._malloc(abiInfo.delayedHitRowF64Bytes * maxHits);
  const outItemCountPtr = module._malloc(4);
  const outRootCountPtr = module._malloc(4);
  const outHitCountPtr = module._malloc(4);

  try {
    request.requests.forEach((itemRequest, index) => {
      writeCausalRootRequestF64(module, requestsPtr + index * abiInfo.rootRequestF64Bytes, itemRequest);
    });
    module.setValue(outItemCountPtr, 0, "i32");
    module.setValue(outRootCountPtr, 0, "i32");
    module.setValue(outHitCountPtr, 0, "i32");
    const solveBatch = module.cwrap("architrino_solver_solve_roots_and_hits_batch_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solveBatch(
      requestsPtr,
      requestCount,
      workerCount,
      itemRowsPtr,
      maxItems,
      rootsPtr,
      maxRoots,
      hitsPtr,
      maxHits,
      outItemCountPtr,
      outRootCountPtr,
      outHitCountPtr
    );
    const itemCount = module.getValue(outItemCountPtr, "i32");
    const rootCount = module.getValue(outRootCountPtr, "i32");
    const hitCount = module.getValue(outHitCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `roots-and-hits batch C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, itemCount, rootCount, hitCount },
        })
      );
    }

    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    const hits = [];
    for (let index = 0; index < hitCount; index += 1) {
      hits.push(readDelayedHitRowF64(module, hitsPtr + index * abiInfo.delayedHitRowF64Bytes));
    }
    const items = [];
    for (let index = 0; index < itemCount; index += 1) {
      const item = readCausalRootBatchItemRowF64(
        module,
        itemRowsPtr + index * CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES
      );
      items.push({
        ...item,
        hitOffset: item.rootOffset,
        hitCount: item.rootCount,
        roots: roots.slice(item.rootOffset, item.rootOffset + item.rootCount),
        hits: hits.slice(item.rootOffset, item.rootOffset + item.rootCount),
      });
    }
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes);
    const hitBuffer = copyWasmBytes(module, hitsPtr, hitCount * abiInfo.delayedHitRowF64Bytes);
    return {
      items,
      roots,
      hits,
      buffers: [
        createBufferDescriptor(
          "batch-root-ledger",
          "root_ledger.v1",
          rootCount,
          abiInfo.rootRowF64Bytes,
          rootBuffer
        ),
        createBufferDescriptor(
          "batch-delayed-hit-events",
          "delayed_hit_events.v1",
          hitCount,
          abiInfo.delayedHitRowF64Bytes,
          hitBuffer
        ),
      ],
      status: createStatus("ok", "ok", "causal roots and delayed hits batch solved"),
    };
  } finally {
    module._free(requestsPtr);
    module._free(itemRowsPtr);
    module._free(rootsPtr);
    module._free(hitsPtr);
    module._free(outItemCountPtr);
    module._free(outRootCountPtr);
    module._free(outHitCountPtr);
  }
}

function solveRootsAndHitsF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const maxHits = request.maxHits ?? maxRoots;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const hitsPtr = module._malloc(abiInfo.delayedHitRowF64Bytes * maxHits);
  const outRootCountPtr = module._malloc(4);
  const outHitCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outRootCountPtr, 0, "i32");
    module.setValue(outHitCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_roots_and_hits_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(
      requestPtr,
      rootsPtr,
      maxRoots,
      outRootCountPtr,
      hitsPtr,
      maxHits,
      outHitCountPtr
    );
    const rootCount = module.getValue(outRootCountPtr, "i32");
    const hitCount = module.getValue(outHitCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `roots-and-hits C ABI returned ${status}`, {
          recoverable: false,
          details: { status, rootCount, hitCount },
        })
      );
    }
    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    const hits = [];
    for (let index = 0; index < hitCount; index += 1) {
      hits.push(readDelayedHitRowF64(module, hitsPtr + index * abiInfo.delayedHitRowF64Bytes));
    }
    const rootBufferByteLength = rootCount * abiInfo.rootRowF64Bytes;
    const hitBufferByteLength = hitCount * abiInfo.delayedHitRowF64Bytes;
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootBufferByteLength);
    const hitBuffer = copyWasmBytes(module, hitsPtr, hitBufferByteLength);
    const rootBufferDescriptor = createBufferDescriptor(
      "root-ledger",
      "root_ledger.v1",
      rootCount,
      abiInfo.rootRowF64Bytes,
      rootBuffer
    );
    const hitBufferDescriptor = createBufferDescriptor(
      "delayed-hit-events",
      "delayed_hit_events.v1",
      hitCount,
      abiInfo.delayedHitRowF64Bytes,
      hitBuffer
    );
    return {
      roots,
      hits,
      buffers: [rootBufferDescriptor, hitBufferDescriptor],
      streams: [
        createTransientStreamDescriptor("causal-root-transient", request.hitTime, [
          rootBufferDescriptor,
          hitBufferDescriptor,
        ]),
      ],
      status: createStatus("ok", "ok", "causal roots and delayed hits solved"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(hitsPtr);
    module._free(outRootCountPtr);
    module._free(outHitCountPtr);
  }
}

function validateCausalRootF64Request(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.source || !request.receiver) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "source and receiver segments are required", {
        recoverable: false,
      })
    );
  }
  validateSegment(request.source, "source");
  validateSegment(request.receiver, "receiver");
  requireFiniteNumber(request.hitTime, "hitTime");
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.rootTolerance != null) {
    requirePositiveFiniteNumber(request.rootTolerance, "rootTolerance");
  }
  if (request.maxIterations != null) {
    requirePositiveInt32(request.maxIterations, "maxIterations");
  }
  if (request.scanSubdivisions != null) {
    requirePositiveInt32(request.scanSubdivisions, "scanSubdivisions");
  }
  if (request.maxRoots != null) {
    requirePositiveInt32(request.maxRoots, "maxRoots");
  }
  if (request.maxHits != null) {
    requirePositiveInt32(request.maxHits, "maxHits");
  }
}

function validateCircularSourceCausalRootF64Request(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "circular-source causal-root request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.source || !request.receiver) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "circular source and receiver segment are required", {
        recoverable: false,
      })
    );
  }
  validateCircularSegment(request.source, "source");
  validateSegment(request.receiver, "receiver");
  requireFiniteNumber(request.hitTime, "hitTime");
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.rootTolerance != null) {
    requirePositiveFiniteNumber(request.rootTolerance, "rootTolerance");
  }
  if (request.maxIterations != null) {
    requirePositiveInt32(request.maxIterations, "maxIterations");
  }
  if (request.scanSubdivisions != null) {
    requirePositiveInt32(request.scanSubdivisions, "scanSubdivisions");
  }
  if (request.maxRoots != null) {
    requirePositiveInt32(request.maxRoots, "maxRoots");
  }
}

function validateCausalRootBatchF64Request(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root batch request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.requests) || request.requests.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root batch requests array is required", {
        recoverable: false,
      })
    );
  }
  if (request.requests.length > INT32_MAX) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root batch request count must fit int32", {
        recoverable: false,
      })
    );
  }
  request.requests.forEach(validateCausalRootF64Request);
  if (request.maxItems != null) {
    requirePositiveInt32(request.maxItems, "maxItems");
    if (request.maxItems < request.requests.length) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "maxItems must cover all batch requests", {
          recoverable: false,
        })
      );
    }
  }
  if (request.maxRoots != null) {
    requirePositiveInt32(request.maxRoots, "maxRoots");
  }
  if (request.workerCount != null) {
    requireNonnegativeInt32(request.workerCount, "workerCount");
  }
}

function validateNormalizedCausalRootF64Request(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "normalized causal-root request object is required", {
        recoverable: false,
      })
    );
  }
  validateVector(request.coordinateOrigin, "coordinateOrigin");
  if (!request.localRequest || typeof request.localRequest !== "object" || Array.isArray(request.localRequest)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "localRequest is required", {
        recoverable: false,
      })
    );
  }
  validateCausalRootF64Request(request.localRequest);
  if (request.restoreAbsolutePoints != null && typeof request.restoreAbsolutePoints !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "restoreAbsolutePoints must be boolean", {
        recoverable: false,
      })
    );
  }
}

function validateNormalizedCircularSourceRootsHitsLedgerF64Request(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "normalized circular-source roots/hits/ledger request object is required", {
        recoverable: false,
      })
    );
  }
  validateVector(request.coordinateOrigin, "coordinateOrigin");
  if (!request.localRequest || typeof request.localRequest !== "object" || Array.isArray(request.localRequest)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "localRequest is required", {
        recoverable: false,
      })
    );
  }
  validateCircularSourceCausalRootF64Request(request.localRequest);
  if (request.restoreAbsolutePoints != null && typeof request.restoreAbsolutePoints !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "restoreAbsolutePoints must be boolean", {
        recoverable: false,
      })
    );
  }
}

function validateCausalRootsPrecisionF64Request(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "precision causal-root request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.rootRequest || typeof request.rootRequest !== "object" || Array.isArray(request.rootRequest)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "rootRequest is required", {
        recoverable: false,
      })
    );
  }
  validateCausalRootF64Request(request.rootRequest);
  if (request.requestedPrecisionPath != null && !DEFAULT_PRECISION_PATHS.includes(request.requestedPrecisionPath)) {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "requestedPrecisionPath must be a known precision path", {
        recoverable: false,
      })
    );
  }
  if (request.claimLevel != null && !CLAIM_LEVEL_BY_ID.includes(request.claimLevel)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "claimLevel must be a known claim level", {
        recoverable: false,
      })
    );
  }
  if (request.allowEscalation != null && typeof request.allowEscalation !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "allowEscalation must be boolean", {
        recoverable: false,
      })
    );
  }
  if (request.runValidationReplay != null && typeof request.runValidationReplay !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "runValidationReplay must be boolean", {
        recoverable: false,
      })
    );
  }
  if (request.maxRoots != null) {
    requirePositiveInt32(request.maxRoots, "maxRoots");
  }
  if (request.maxHits != null) {
    requirePositiveInt32(request.maxHits, "maxHits");
  }
}

function validateSegment(segment, label) {
  requireFiniteNumber(segment.startTime, `${label}.startTime`);
  requireFiniteNumber(segment.endTime, `${label}.endTime`);
  if (segment.endTime < segment.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} time bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
  validateVector(segment.positionAtStart, `${label}.positionAtStart`);
  validateVector(segment.velocity, `${label}.velocity`);
  if (segment.errorBound != null) {
    requireNonnegativeFiniteNumber(segment.errorBound, `${label}.errorBound`);
  }
}

function validateCircularSegment(segment, label) {
  requireFiniteNumber(segment.startTime, `${label}.startTime`);
  requireFiniteNumber(segment.endTime, `${label}.endTime`);
  if (segment.endTime < segment.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} time bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
  validateVector(segment.center, `${label}.center`);
  validateVector(segment.radiusU, `${label}.radiusU`);
  validateVector(segment.radiusV, `${label}.radiusV`);
  requireFiniteNumber(segment.angularVelocity, `${label}.angularVelocity`);
  requireFiniteNumber(segment.phaseAtEpoch ?? 0, `${label}.phaseAtEpoch`);
  requireFiniteNumber(segment.epochTime ?? 0, `${label}.epochTime`);
  if (segment.errorBound != null) {
    requireNonnegativeFiniteNumber(segment.errorBound, `${label}.errorBound`);
  }
}

function validateVector(vector, label) {
  if (!vector || typeof vector !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} vector is required`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(vector.x, `${label}.x`);
  requireFiniteNumber(vector.y, `${label}.y`);
  requireFiniteNumber(vector.z, `${label}.z`);
}

function copyVector(vector) {
  return {
    x: vector.x,
    y: vector.y,
    z: vector.z,
  };
}

function restoreCausalRootAbsolutePoints(root, origin) {
  return {
    ...root,
    coordinateFrame: "absolute-display",
    sourcePoint: addVector(root.sourcePoint, origin),
    receiverPoint: addVector(root.receiverPoint, origin),
    localSourcePoint: copyVector(root.sourcePoint),
    localReceiverPoint: copyVector(root.receiverPoint),
    absolutePointAuthority: "display-only",
  };
}

function addVector(left, right) {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function requireFiniteNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be finite`, {
        recoverable: false,
      })
    );
  }
}

function requireNonnegativeFiniteNumber(value, label) {
  requireFiniteNumber(value, label);
  if (value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be nonnegative`, {
        recoverable: false,
      })
    );
  }
}

function requirePositiveFiniteNumber(value, label) {
  requireFiniteNumber(value, label);
  if (value <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be positive`, {
        recoverable: false,
      })
    );
  }
}

function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a positive integer`, {
        recoverable: false,
      })
    );
  }
}

function requirePositiveInt32(value, label) {
  requirePositiveInteger(value, label);
  if (value > INT32_MAX) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must fit int32`, {
        recoverable: false,
      })
    );
  }
}

function requireNonnegativeInteger(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative integer`, {
        recoverable: false,
      })
    );
  }
}

function requireNonnegativeInt32(value, label) {
  requireNonnegativeInteger(value, label);
  if (value > INT32_MAX) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must fit int32`, {
        recoverable: false,
      })
    );
  }
}

function requireSafeUint64(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative safe integer`, {
        recoverable: false,
      })
    );
  }
}

function requireUint64Number(value, label) {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative integer`, {
        recoverable: false,
      })
    );
  }
}

function requireSafeInt64(value, label) {
  if (!Number.isSafeInteger(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a safe integer`, {
        recoverable: false,
      })
    );
  }
}

function requireUint32(value, label) {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must fit uint32`, {
        recoverable: false,
      })
    );
  }
}

function writeCausalRootRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.source);
  writeSegment(module, ptr + 72, request.receiver);
  module.setValue(ptr + 144, request.hitTime, "double");
  module.setValue(ptr + 152, request.signalSpeed, "double");
  module.setValue(ptr + 160, request.rootTolerance ?? 1e-12, "double");
  module.setValue(ptr + 168, request.maxIterations ?? 96, "i32");
  module.setValue(ptr + 172, request.scanSubdivisions ?? 64, "i32");
}

function writePrecisionSolveOptions(module, ptr, request) {
  const requestedPrecisionPath = request.requestedPrecisionPath ?? "auto";
  const claimLevel = request.claimLevel ?? "interactive-preview";
  module.setValue(ptr, PRECISION_PATH_BY_ID.indexOf(requestedPrecisionPath), "i32");
  module.setValue(ptr + 4, CLAIM_LEVEL_BY_ID.indexOf(claimLevel), "i32");
  module.setValue(ptr + 8, request.allowEscalation === false ? 0 : 1, "i32");
  module.setValue(ptr + 12, request.runValidationReplay === true ? 1 : 0, "i32");
}

function writeCausalRootRowF64(module, ptr, root) {
  module.setValue(ptr, root.rootId, "i32");
  module.setValue(ptr + 4, root.statusCode, "i32");
  module.setValue(ptr + 8, root.emissionTime, "double");
  module.setValue(ptr + 16, root.hitTime, "double");
  module.setValue(ptr + 24, root.delay ?? 0, "double");
  module.setValue(ptr + 32, root.distance ?? 0, "double");
  module.setValue(ptr + 40, root.residual ?? 0, "double");
  module.setValue(ptr + 48, root.jacobian ?? 0, "double");
  module.setValue(ptr + 56, root.branchWeight ?? 0, "double");
  writeVector(module, ptr + 64, root.sourcePoint ?? { x: 0, y: 0, z: 0 });
  writeVector(module, ptr + 88, root.receiverPoint ?? { x: 0, y: 0, z: 0 });
  module.setValue(ptr + 112, root.sourceNormalSpeed ?? 0, "double");
  module.setValue(ptr + 120, root.receiverNormalSpeed ?? 0, "double");
  module.setValue(ptr + 128, root.sourceNormalDenominator ?? 0, "double");
  module.setValue(ptr + 136, root.receiverNormalNumerator ?? 0, "double");
  module.setValue(ptr + 144, root.receiverNormalCrossingFactor ?? 0, "double");
  module.setValue(ptr + 152, root.receiverNormalFactor ?? 0, "double");
  module.setValue(ptr + 160, root.unsignedReceiverNormalFactor ?? Math.abs(root.receiverNormalFactor ?? 0), "double");
  module.setValue(ptr + 168, root.receiverNormalStatusCode ?? root.statusCode ?? 0, "i32");
  module.setValue(ptr + 172, 0, "i32");
}

function writePhaseClockF64(module, ptr, clock) {
  module.setValue(ptr, clock.period, "double");
  module.setValue(ptr + 8, clock.epoch ?? 0, "double");
  module.setValue(ptr + 16, clock.phaseOffset ?? 0, "double");
}

function writePhaseAtHitMetadataF64(module, ptr, metadata = {}) {
  module.setValue(ptr, metadata.rootKind ?? 0, "i32");
  module.setValue(ptr + 4, metadata.sourceLayerCode ?? 0, "i32");
  module.setValue(ptr + 8, metadata.receiverLayerCode ?? 0, "i32");
  module.setValue(ptr + 12, metadata.sourceRoleCode ?? 0, "i32");
  module.setValue(ptr + 16, metadata.receiverRoleCode ?? 0, "i32");
  module.setValue(ptr + 20, metadata.sourceChargeSign ?? 0, "i32");
  module.setValue(ptr + 24, metadata.receiverChargeSign ?? 0, "i32");
  module.setValue(ptr + 28, metadata.stateFlags ?? 0, "i32");
}

function writeErrorBudgetF64(module, ptr, budget) {
  module.setValue(ptr, budget.globalTolerance, "double");
  module.setValue(ptr + 8, budget.rootIsolationTolerance, "double");
  module.setValue(ptr + 16, budget.delayedHitTolerance, "double");
  module.setValue(ptr + 24, budget.integrationTolerance, "double");
  module.setValue(ptr + 32, budget.streamEncodingTolerance, "double");
  module.setValue(ptr + 40, budget.readbackTolerance, "double");
  module.setValue(ptr + 48, budget.projectionTolerance ?? 0, "double");
  module.setValue(ptr + 56, budget.displayTolerance ?? 0, "double");
}

function writeAdmissionModelContract(module, ptr, model) {
  module.setValue(ptr, model?.modelId ? 1 : 0, "i32");
  module.setValue(ptr + 4, model?.equationVersion ? 1 : 0, "i32");
  module.setValue(ptr + 8, model?.forceLawVersion ? 1 : 0, "i32");
  module.setValue(ptr + 12, model?.constantsHash ? 1 : 0, "i32");
  module.setValue(ptr + 16, model?.causalSpeedPolicy ? 1 : 0, "i32");
  module.setValue(ptr + 20, model?.branchPolicy ? 1 : 0, "i32");
  module.setValue(ptr + 24, model?.unitConvention ? 1 : 0, "i32");
  module.setValue(ptr + 28, precisionPathMask(model?.compatiblePrecisionPaths), "i32");
}

function precisionPathMask(paths) {
  if (!Array.isArray(paths)) {
    return 0;
  }
  return paths.reduce((mask, path) => {
    const id = DEFAULT_PRECISION_PATHS.indexOf(path);
    return id < 0 ? mask : mask | (1 << id);
  }, 0);
}

function enumId(values, value, fallback = 0) {
  const id = values.indexOf(value);
  return id < 0 ? fallback : id;
}

function timeWindowUnitsId(units) {
  if (units == null || units === "") {
    return 3;
  }
  return enumId(TIME_WINDOW_UNITS_BY_ID, units, -1);
}

function writeSimulationEnvelopeF64(module, ptr, envelope) {
  writeUint64(module, ptr, envelope?.entityCount ?? 0);
  writeUint64(module, ptr + 8, envelope?.assemblyCount ?? 0);
  writeUint64(module, ptr + 16, envelope?.memoryBudgetBytes ?? 0);
  writeUint64(module, ptr + 24, envelope?.storageBudgetBytes ?? 0);
  module.setValue(ptr + 32, envelope?.timeWindow?.start ?? 0, "double");
  module.setValue(ptr + 40, envelope?.timeWindow?.end ?? 0, "double");
  module.setValue(ptr + 48, envelope?.timeWindow?.stepHint ?? 0, "double");
  module.setValue(ptr + 56, envelope?.timeResolutionHint ?? 0, "double");
  module.setValue(ptr + 64, enumId(INTERACTION_POLICY_BY_ID, envelope?.interactionPolicy), "i32");
  module.setValue(ptr + 68, enumId(BRANCH_COMPLEXITY_BY_ID, envelope?.expectedBranchComplexity, 3), "i32");
  module.setValue(ptr + 72, enumId(OUTPUT_DETAIL_BY_ID, envelope?.outputDetail), "i32");
  module.setValue(ptr + 76, enumId(LATENCY_TARGET_BY_ID, envelope?.latencyTarget), "i32");
  module.setValue(ptr + 80, enumId(SIMPLIFICATION_POLICY_BY_ID, envelope?.simplificationPolicy), "i32");
  module.setValue(ptr + 84, timeWindowUnitsId(envelope?.timeWindow?.units), "i32");
}

function writeCapabilityEnvelopeF64(module, ptr, capability) {
  writeUint64(module, ptr, capability.maxInteractiveEntities);
  writeUint64(module, ptr + 8, capability.maxBatchEntities);
  writeUint64(module, ptr + 16, capability.minMemoryBudgetBytes);
  writeUint64(module, ptr + 24, capability.minStorageBudgetBytesForStreaming);
  module.setValue(ptr + 32, capability.minimumPositiveTolerance, "double");
  module.setValue(ptr + 40, capability.maxInteractiveStepCount, "double");
}

function writeErrorBudgetStageInputF64(module, ptr, stage) {
  module.setValue(ptr, ERROR_BUDGET_STAGE_TO_ID.get(stage.stage), "i32");
  module.setValue(ptr + 4, 0, "i32");
  module.setValue(ptr + 8, stage.estimatedAbsoluteError, "double");
}

function writeSpherePointIntersectionRequestF64(module, ptr, request) {
  writeVector(module, ptr, request.center);
  module.setValue(ptr + 24, request.radius, "double");
  writeVector(module, ptr + 32, request.point);
  module.setValue(ptr + 56, request.tolerance ?? 0, "double");
}

function writeDelayedPotentialRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.source);
  writeVector(module, ptr + 72, request.samplePoint);
  module.setValue(ptr + 96, request.observationTime, "double");
  module.setValue(ptr + 104, request.fieldSpeed ?? 6, "double");
  module.setValue(ptr + 112, request.normalization ?? 1, "double");
  module.setValue(ptr + 120, request.softening ?? 0.08, "double");
  module.setValue(ptr + 128, request.sourceCharge ?? 1, "double");
  module.setValue(ptr + 136, request.iterations ?? 4, "i32");
  module.setValue(ptr + 140, request.useCausalDenominator ? 1 : 0, "i32");
}

function writeCircularSelfHitSpanRequestF64(module, ptr, request) {
  module.setValue(ptr, request.fieldSpeedRatio, "double");
  module.setValue(ptr + 8, request.fieldSpeedTolerance ?? DEFAULT_FIELD_SPEED_TOLERANCE, "double");
  module.setValue(ptr + 16, request.tolerance ?? DEFAULT_CIRCULAR_SELF_HIT_TOLERANCE, "double");
  module.setValue(ptr + 24, request.maxAngle ?? DEFAULT_CIRCULAR_SELF_HIT_MAX_ANGLE, "double");
  module.setValue(ptr + 32, request.maxIterations ?? DEFAULT_CIRCULAR_SELF_HIT_ITERATIONS, "i32");
  module.setValue(
    ptr + 36,
    request.scanSubdivisions ?? DEFAULT_CIRCULAR_SELF_HIT_SCAN_SUBDIVISIONS,
    "i32"
  );
  module.setValue(ptr + 40, 0, "i32");
  module.setValue(ptr + 44, 0, "i32");
}

function writeCircularPathSegmentF64(module, ptr, segment) {
  module.setValue(ptr, segment.startTime, "double");
  module.setValue(ptr + 8, segment.endTime, "double");
  writeVector(module, ptr + 16, segment.center);
  writeVector(module, ptr + 40, segment.radiusU);
  writeVector(module, ptr + 64, segment.radiusV);
  module.setValue(ptr + 88, segment.angularVelocity, "double");
  module.setValue(ptr + 96, segment.phaseAtEpoch ?? 0, "double");
  module.setValue(ptr + 104, segment.epochTime ?? 0, "double");
  module.setValue(ptr + 112, segment.errorBound ?? 0, "double");
}

function writeCircularSourceCausalRootRequestF64(module, ptr, request) {
  writeCircularPathSegmentF64(module, ptr, request.source);
  writeSegment(module, ptr + CIRCULAR_PATH_SEGMENT_F64_BYTES, request.receiver);
  module.setValue(ptr + 192, request.hitTime, "double");
  module.setValue(ptr + 200, request.signalSpeed, "double");
  module.setValue(ptr + 208, request.rootTolerance ?? 1e-12, "double");
  module.setValue(ptr + 216, request.maxIterations ?? 96, "i32");
  module.setValue(ptr + 220, request.scanSubdivisions ?? 128, "i32");
}

function writeMotionSampleRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.segment);
  writeUint64(module, ptr + 72, request.pathKey);
  module.setValue(ptr + 80, request.startTime, "double");
  module.setValue(ptr + 88, request.endTime, "double");
  module.setValue(ptr + 96, request.step, "double");
  module.setValue(ptr + 104, request.stateFlags ?? 0, "i32");
  module.setValue(ptr + 108, 0, "i32");
}

function writeMotionIntegrationRequestF64(module, ptr, request) {
  writeUint64(module, ptr, request.pathKey);
  module.setValue(ptr + 8, request.startTime, "double");
  module.setValue(ptr + 16, request.endTime, "double");
  module.setValue(ptr + 24, request.step, "double");
  writeVector(module, ptr + 32, request.initialPosition);
  writeVector(module, ptr + 56, request.initialVelocity);
  writeVector(module, ptr + 80, request.acceleration);
  module.setValue(ptr + 104, request.integrationTolerance ?? 0, "double");
  module.setValue(ptr + 112, request.integrationMethod ?? 1, "i32");
  module.setValue(ptr + 116, request.stateFlags ?? 0, "i32");
}

function pairInteractionLawId(law) {
  return law === "inverse_distance_pair_attraction_v1" ? 2 : 1;
}

function writePairInteractionRequestF64(module, ptr, request) {
  module.setValue(ptr, request.startTime, "double");
  module.setValue(ptr + 8, request.endTime, "double");
  module.setValue(ptr + 16, request.step, "double");
  module.setValue(ptr + 24, request.pairAccelerationScale, "double");
  module.setValue(ptr + 32, request.softening ?? 0, "double");
  module.setValue(ptr + 40, request.integrationTolerance ?? 0, "double");
  module.setValue(ptr + 48, request.signalSpeed ?? 0, "double");
  module.setValue(ptr + 56, pairInteractionLawId(request.interactionLaw), "i32");
  module.setValue(ptr + 60, request.integrationMethod ?? 1, "i32");
  writeUint64(module, ptr + 64, request.pathConstraintBoundaryRelaxationIterationCount);
  module.setValue(ptr + 72, request.pathConstraintBoundaryRelaxationTolerance ?? 0, "double");
  module.setValue(ptr + 80, request.pathConstraintBoundaryRelaxationStepTolerance ?? 0, "double");
}

function writePairInteractionStateF64(module, ptr, state) {
  writeUint64(module, ptr, state.pathKey);
  writeVector(module, ptr + 8, state.initialPosition);
  writeVector(module, ptr + 32, state.initialVelocity);
  module.setValue(ptr + 56, state.charge, "double");
  module.setValue(ptr + 64, state.mass, "double");
  module.setValue(ptr + 72, state.stateFlags ?? state.pathKey, "i32");
  module.setValue(ptr + 76, 0, "i32");
}

function writeT3StepRequestF64(module, ptr, request) {
  module.setValue(ptr, request.startTime, "double");
  module.setValue(ptr + 8, request.endTime, "double");
  module.setValue(ptr + 16, request.timestep, "double");
  module.setValue(ptr + 24, request.topology.sideLength, "double");
  module.setValue(ptr + 32, request.spatialIndex.interactionRadius, "double");
  module.setValue(ptr + 40, request.spatialIndex.cellSize, "double");
  module.setValue(ptr + 48, request.interaction.radius, "double");
  module.setValue(ptr + 56, request.interaction.strength, "double");
  module.setValue(ptr + 64, request.interaction.softening, "double");
  module.setValue(ptr + 72, request.integrationTolerance ?? 0, "double");
  module.setValue(ptr + 80, request.signalSpeed ?? 0, "double");
  module.setValue(ptr + 88, request.rootTolerance ?? 0, "double");
  writeUint64(module, ptr + 96, request.stepIndex ?? 0);
  module.setValue(ptr + 104, request.interaction.lawCode, "i32");
  module.setValue(ptr + 108, request.integrationMethod ?? 1, "i32");
  module.setValue(
    ptr + 112,
    request.unresolvedRootSegmentSidecar?.enabled === true ? 1 : 0,
    "i32"
  );
  module.setValue(
    ptr + 116,
    request.unresolvedRootSegmentSidecar?.pairPolicyCode ??
      T3_UNRESOLVED_ROOT_PAIR_POLICY_CODE_BY_ID.disabled,
    "i32"
  );
}

function writeT3ParticleStateF64(module, ptr, state) {
  writeUint64(module, ptr, state.pathKey);
  writeVector(module, ptr + 8, state.position);
  writeVector(module, ptr + 32, state.velocity);
  module.setValue(ptr + 56, state.integrationWeight, "double");
  module.setValue(ptr + 64, state.charge ?? 0, "double");
  module.setValue(ptr + 72, state.stateFlags ?? state.pathKey, "i32");
  module.setValue(ptr + 76, 0, "i32");
}

function writePairInteractionPathConstraintF64(module, ptr, constraint) {
  writeUint64(module, ptr, constraint.pathKey);
  module.setValue(ptr + 8, constraint.depth ?? 0, "i32");
  module.setValue(ptr + 12, 0, "i32");
  module.setValue(ptr + 16, constraint.time, "double");
  writeVector(module, ptr + 24, constraint.position);
}

function writeAssemblyMembershipRowF64(module, ptr, membership) {
  writeUint64(module, ptr, membership.membershipKey);
  writeUint64(module, ptr + 8, membership.pathKey);
  writeUint64(module, ptr + 16, membership.assemblyKey);
  writeUint64(module, ptr + 24, membership.assemblyStateKey);
  module.setValue(ptr + 32, membership.timeStart, "double");
  module.setValue(ptr + 40, membership.timeEnd, "double");
  module.setValue(ptr + 48, membership.confidence, "double");
  module.setValue(ptr + 56, membership.localRole ?? 0, "i32");
  module.setValue(ptr + 60, membership.bindingState ?? 0, "i32");
  module.setValue(ptr + 64, membership.membershipVersion ?? 1, "i32");
  module.setValue(ptr + 68, membership.eventKind ?? 0, "i32");
  module.setValue(ptr + 72, membership.statusFlags ?? 0, "i32");
  module.setValue(ptr + 76, 0, "i32");
}

function writePathHistoryRowF64(module, ptr, row) {
  writeUint64(module, ptr, row.pathKey);
  writeUint64(module, ptr + 8, row.segmentIndex);
  module.setValue(ptr + 16, row.startTime, "double");
  module.setValue(ptr + 24, row.endTime, "double");
  writeVector(module, ptr + 32, row.start);
  writeVector(module, ptr + 56, row.velocity);
  module.setValue(ptr + 80, row.errorBound ?? 0, "double");
  module.setValue(ptr + 88, row.stateFlags ?? 0, "i32");
  module.setValue(ptr + 92, 0, "i32");
}

function writeStorageLifecyclePolicy(module, ptr, policy) {
  module.setValue(ptr, policy.activeWindow?.start ?? 0, "double");
  module.setValue(ptr + 8, policy.activeWindow?.end ?? 0, "double");
  module.setValue(ptr + 16, policy.activeWindow ? 1 : 0, "i32");
  module.setValue(ptr + 20, policy.deepIndexEnabled ? 1 : 0, "i32");
  module.setValue(ptr + 24, policy.exportRequested ? 1 : 0, "i32");
  module.setValue(ptr + 28, policy.failedRun ? 1 : 0, "i32");
  module.setValue(ptr + 32, policy.deleteRequested ? 1 : 0, "i32");
  module.setValue(ptr + 36, 0, "i32");
  writeUint64(module, ptr + 40, policy.activeMemoryBudgetBytes ?? 0);
  writeUint64(module, ptr + 48, policy.storageBudgetBytes ?? 0);
}

function writePathHistoryChunkRow(module, ptr, chunk) {
  writeUint64(module, ptr, chunk.chunkIndex);
  writeUint64(module, ptr + 8, chunk.pathKeyStart);
  writeUint64(module, ptr + 16, chunk.pathKeyEnd);
  writeUint64(module, ptr + 24, chunk.rowOffset);
  writeUint64(module, ptr + 32, chunk.rowCount);
  writeUint64(module, ptr + 40, chunk.frameStart);
  writeUint64(module, ptr + 48, chunk.frameEnd);
  module.setValue(ptr + 56, chunk.timeStart, "double");
  module.setValue(ptr + 64, chunk.timeEnd, "double");
  writeUint64(module, ptr + 72, chunk.byteOffset);
  writeUint64(module, ptr + 80, chunk.byteLength);
  writeUint64(module, ptr + 88, chunk.checksum64);
  module.setValue(ptr + 96, chunk.stateFlags ?? 0, "i32");
  module.setValue(ptr + 100, 0, "i32");
}

function writeAssemblyStateRowF64(module, ptr, row) {
  writeUint64(module, ptr, row.assemblyKey);
  writeUint64(module, ptr + 8, row.assemblyStateKey);
  module.setValue(ptr + 16, row.timeStart, "double");
  module.setValue(ptr + 24, row.timeEnd, "double");
  writeVector(module, ptr + 32, row.center);
  writeVector(module, ptr + 56, row.velocity);
  module.setValue(ptr + 80, row.phase ?? 0, "double");
  writeInt64(module, ptr + 88, row.cycleIndex ?? 0);
  module.setValue(ptr + 96, row.modelVersion ?? 1, "i32");
  module.setValue(ptr + 100, row.statusFlags ?? 0, "i32");
  module.setValue(ptr + 104, row.fidelityFlags ?? 0, "i32");
  module.setValue(ptr + 108, 0, "i32");
}

function writeSpaceTimeIndexOptionsF64(module, ptr, options) {
  module.setValue(ptr, options.spatialCellSize, "double");
  module.setValue(ptr + 8, options.timeBinSize, "double");
  module.setValue(ptr + 16, options.maxCellsPerItem, "i32");
  module.setValue(ptr + 20, 0, "i32");
}

function writeSpaceTimeQueryF64(module, ptr, query) {
  writeSpaceTimeBoundsF64(module, ptr, query.bounds);
  module.setValue(ptr + 64, query.filterSpace === false ? 0 : 1, "i32");
  module.setValue(ptr + 68, query.filterTime === false ? 0 : 1, "i32");
  module.setValue(ptr + 72, query.subjectKind == null ? 0 : 1, "i32");
  module.setValue(ptr + 76, query.subjectKind ?? 1, "i32");
  module.setValue(ptr + 80, query.subjectKey == null ? 0 : 1, "i32");
  module.setValue(ptr + 84, 0, "i32");
  writeUint64(module, ptr + 88, query.subjectKey ?? 0);
}

function writeEmissionShellBroadPhaseOptionsF64(module, ptr, request, tolerance, maxCandidates) {
  module.setValue(ptr, request.signalSpeed, "double");
  module.setValue(ptr + 8, tolerance, "double");
  module.setValue(ptr + 16, request.timeRange?.start ?? 0, "double");
  module.setValue(ptr + 24, request.timeRange?.end ?? 0, "double");
  module.setValue(ptr + 32, maxCandidates, "i32");
  module.setValue(ptr + 36, request.allowSamePath ? 1 : 0, "i32");
  module.setValue(ptr + 40, request.timeRange ? 1 : 0, "i32");
  module.setValue(ptr + 44, request.workerCount ?? 0, "i32");
}

function writeEmissionShellIndexedBroadPhaseOptionsF64(module, ptr, request, indexOptions) {
  const timeRange = request.timeRange ?? null;
  module.setValue(ptr, indexOptions.spatialCellSize, "double");
  module.setValue(ptr + 8, timeRange?.start ?? 0, "double");
  module.setValue(ptr + 16, timeRange?.end ?? 0, "double");
  writeUint64(module, ptr + 24, indexOptions.sourceRowOffset ?? 0);
  writeUint64(module, ptr + 32, indexOptions.receiverRowOffset ?? 0);
  module.setValue(ptr + 40, indexOptions.timeSlabCount, "i32");
  module.setValue(ptr + 44, timeRange ? 1 : 0, "i32");
  module.setValue(ptr + 48, 0, "i32");
  module.setValue(ptr + 52, 0, "i32");
}

function writeEmissionShellNarrowPhaseRequestF64(
  module,
  ptr,
  source,
  receiver,
  signalSpeed,
  tolerance,
  abiInfo
) {
  writePathHistoryRowF64(module, ptr, source);
  writePathHistoryRowF64(module, ptr + abiInfo.pathHistoryRowF64Bytes, receiver);
  module.setValue(ptr + abiInfo.pathHistoryRowF64Bytes * 2, signalSpeed, "double");
  module.setValue(ptr + abiInfo.pathHistoryRowF64Bytes * 2 + 8, tolerance, "double");
}

function writeSpaceTimeBoundsF64(module, ptr, bounds) {
  writeVector(module, ptr, bounds.min);
  writeVector(module, ptr + 24, bounds.max);
  module.setValue(ptr + 48, bounds.timeStart, "double");
  module.setValue(ptr + 56, bounds.timeEnd, "double");
}

function writeSpaceTimeIndexRowF64(module, ptr, row) {
  writeInt64(module, ptr, row.cellX);
  writeInt64(module, ptr + 8, row.cellY);
  writeInt64(module, ptr + 16, row.cellZ);
  writeInt64(module, ptr + 24, row.cellT);
  writeUint64(module, ptr + 32, row.subjectKey);
  writeUint64(module, ptr + 40, row.rowOffset);
  writeVector(module, ptr + 48, row.min);
  writeVector(module, ptr + 72, row.max);
  module.setValue(ptr + 96, row.timeStart, "double");
  module.setValue(ptr + 104, row.timeEnd, "double");
  module.setValue(ptr + 112, row.subjectKind, "i32");
  module.setValue(ptr + 116, row.sourceLayout, "i32");
  module.setValue(ptr + 120, row.stateFlags ?? 0, "i32");
  module.setValue(ptr + 124, 0, "i32");
}

function writeSegment(module, ptr, segment) {
  module.setValue(ptr, segment.startTime, "double");
  module.setValue(ptr + 8, segment.endTime, "double");
  writeVector(module, ptr + 16, segment.positionAtStart);
  writeVector(module, ptr + 40, segment.velocity);
  module.setValue(ptr + 64, segment.errorBound ?? 0, "double");
}

function writeVector(module, ptr, vector) {
  module.setValue(ptr, vector?.x ?? 0, "double");
  module.setValue(ptr + 8, vector?.y ?? 0, "double");
  module.setValue(ptr + 16, vector?.z ?? 0, "double");
}

function readCausalRootRowF64(module, ptr) {
  return {
    rootId: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    emissionTime: module.getValue(ptr + 8, "double"),
    hitTime: module.getValue(ptr + 16, "double"),
    delay: module.getValue(ptr + 24, "double"),
    distance: module.getValue(ptr + 32, "double"),
    residual: module.getValue(ptr + 40, "double"),
    jacobian: module.getValue(ptr + 48, "double"),
    branchWeight: module.getValue(ptr + 56, "double"),
    sourcePoint: readVector(module, ptr + 64),
    receiverPoint: readVector(module, ptr + 88),
    sourceNormalSpeed: module.getValue(ptr + 112, "double"),
    receiverNormalSpeed: module.getValue(ptr + 120, "double"),
    sourceNormalDenominator: module.getValue(ptr + 128, "double"),
    receiverNormalNumerator: module.getValue(ptr + 136, "double"),
    receiverNormalCrossingFactor: module.getValue(ptr + 144, "double"),
    receiverNormalFactor: module.getValue(ptr + 152, "double"),
    unsignedReceiverNormalFactor: module.getValue(ptr + 160, "double"),
    receiverNormalStatusCode: module.getValue(ptr + 168, "i32"),
  };
}

function readRootLedgerDetailRowF64(module, ptr, rootTolerance = 0) {
  const row = {
    ledgerKey: readUint64(module, ptr),
    sourceKey: readUint64(module, ptr + 8),
    receiverKey: readUint64(module, ptr + 16),
    rootKey: readUint64(module, ptr + 24),
    intervalStart: module.getValue(ptr + 32, "double"),
    intervalEnd: module.getValue(ptr + 40, "double"),
    emissionTime: module.getValue(ptr + 48, "double"),
    hitTime: module.getValue(ptr + 56, "double"),
    delay: module.getValue(ptr + 64, "double"),
    residual: module.getValue(ptr + 72, "double"),
    jacobian: module.getValue(ptr + 80, "double"),
    branchWeight: module.getValue(ptr + 88, "double"),
    bracketStart: module.getValue(ptr + 96, "double"),
    bracketEnd: module.getValue(ptr + 104, "double"),
    sourcePoint: readVector(module, ptr + 112),
    receiverPoint: readVector(module, ptr + 136),
    sourceNormalSpeed: module.getValue(ptr + 160, "double"),
    receiverNormalSpeed: module.getValue(ptr + 168, "double"),
    sourceNormalDenominator: module.getValue(ptr + 176, "double"),
    receiverNormalNumerator: module.getValue(ptr + 184, "double"),
    receiverNormalCrossingFactor: module.getValue(ptr + 192, "double"),
    receiverNormalFactor: module.getValue(ptr + 200, "double"),
    unsignedReceiverNormalFactor: module.getValue(ptr + 208, "double"),
    entryKind: module.getValue(ptr + 216, "i32") >>> 0,
    rootKind: module.getValue(ptr + 220, "i32") >>> 0,
    statusCode: module.getValue(ptr + 224, "i32") >>> 0,
    jacobianSignStratum: module.getValue(ptr + 228, "i32") >>> 0,
    sequenceIndex: module.getValue(ptr + 232, "i32") >>> 0,
    iterationCount: module.getValue(ptr + 236, "i32") >>> 0,
    stateFlags: module.getValue(ptr + 240, "i32") >>> 0,
    receiverNormalStatusCode: module.getValue(ptr + 244, "i32") >>> 0,
  };
  return addRootLedgerDetailPrecisionForensics(row, rootTolerance);
}

function addRootLedgerDetailPrecisionForensics(row, rootTolerance = 0) {
  const residualScale = Math.max(
    Math.abs(row.delay),
    Math.abs(row.hitTime - row.emissionTime),
    Math.abs(row.intervalEnd - row.intervalStart),
    1
  );
  const absoluteResidual = Math.abs(row.residual);
  return {
    ...row,
    residualScale,
    absoluteResidual,
    normalizedResidual: absoluteResidual / residualScale,
    rootTolerance: Number.isFinite(rootTolerance) && rootTolerance >= 0 ? rootTolerance : 0,
    firstFailureCode: (row.stateFlags & 1) !== 0 ? row.statusCode : 0,
  };
}

function readDelayedHitRowF64(module, ptr) {
  return {
    eventId: module.getValue(ptr, "i32"),
    rootId: module.getValue(ptr + 4, "i32"),
    statusCode: module.getValue(ptr + 8, "i32"),
    emissionTime: module.getValue(ptr + 16, "double"),
    hitTime: module.getValue(ptr + 24, "double"),
    distance: module.getValue(ptr + 32, "double"),
    jacobian: module.getValue(ptr + 40, "double"),
    strength: module.getValue(ptr + 48, "double"),
    emissionPoint: readVector(module, ptr + 56),
    receiverPoint: readVector(module, ptr + 80),
    unitDirection: readVector(module, ptr + 104),
    sourceNormalSpeed: module.getValue(ptr + 128, "double"),
    receiverNormalSpeed: module.getValue(ptr + 136, "double"),
    sourceNormalDenominator: module.getValue(ptr + 144, "double"),
    receiverNormalNumerator: module.getValue(ptr + 152, "double"),
    receiverNormalCrossingFactor: module.getValue(ptr + 160, "double"),
    receiverNormalFactor: module.getValue(ptr + 168, "double"),
    unsignedReceiverNormalFactor: module.getValue(ptr + 176, "double"),
    receiverNormalStatusCode: module.getValue(ptr + 184, "i32"),
  };
}

function readCausalRootBatchItemRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    rootOffset: module.getValue(ptr + 8, "i32"),
    rootCount: module.getValue(ptr + 12, "i32"),
  };
}

function readPairInteractionSummaryF64(module, ptr) {
  return {
    pathConstraintCount: module.getValue(ptr, "i32") >>> 0,
    boundaryRelaxationSelectedCandidateKind:
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_CANDIDATE_KIND_BY_CODE[
        module.getValue(ptr + 4, "i32") >>> 0
      ] ?? "none",
    residualSampleCount: readUint64(module, ptr + 8),
    maxConstraintResidual: module.getValue(ptr + 16, "double"),
    meanConstraintResidual: module.getValue(ptr + 24, "double"),
    rmsConstraintResidual: module.getValue(ptr + 32, "double"),
    guidanceSampleCount: readUint64(module, ptr + 40),
    maxGuidanceAcceleration: module.getValue(ptr + 48, "double"),
    meanGuidanceAcceleration: module.getValue(ptr + 56, "double"),
    rmsGuidanceAcceleration: module.getValue(ptr + 64, "double"),
    boundaryResidualSampleCount: readUint64(module, ptr + 72),
    maxBoundaryResidual: module.getValue(ptr + 80, "double"),
    meanBoundaryResidual: module.getValue(ptr + 88, "double"),
    rmsBoundaryResidual: module.getValue(ptr + 96, "double"),
    boundaryRelaxationResidualSampleCount: readUint64(module, ptr + 104),
    maxBoundaryRelaxationResidualBefore: module.getValue(ptr + 112, "double"),
    maxBoundaryRelaxationResidualAfter: module.getValue(ptr + 120, "double"),
    boundaryRelaxationResidualRatio: module.getValue(ptr + 128, "double"),
    boundaryRelaxationStatus:
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STATUS_BY_CODE[
        module.getValue(ptr + 136, "i32") >>> 0
      ],
    boundaryRelaxationAppliedIterationCount: module.getValue(ptr + 140, "i32") >>> 0,
    boundaryRelaxationStopReason:
      PAIR_INTERACTION_PATH_CONSTRAINT_BOUNDARY_RELAXATION_STOP_REASON_BY_CODE[
        module.getValue(ptr + 144, "i32") >>> 0
      ],
    boundaryRelaxationCenterOfMassSelectedCount: module.getValue(ptr + 148, "i32") >>> 0,
    boundarySeedSampleCount: readUint64(module, ptr + 152),
    boundaryRelaxationMaxStep: module.getValue(ptr + 160, "double"),
    boundaryRelaxationFinalStepFactor: module.getValue(ptr + 168, "double"),
    meanBoundaryRelaxationResidualBefore: module.getValue(ptr + 176, "double"),
    meanBoundaryRelaxationResidualAfter: module.getValue(ptr + 184, "double"),
    rmsBoundaryRelaxationResidualBefore: module.getValue(ptr + 192, "double"),
    rmsBoundaryRelaxationResidualAfter: module.getValue(ptr + 200, "double"),
    meanBoundaryRelaxationResidualRatio: module.getValue(ptr + 208, "double"),
    rmsBoundaryRelaxationResidualRatio: module.getValue(ptr + 216, "double"),
    boundaryRelaxationResidualSettlingRate: module.getValue(ptr + 224, "double"),
    meanBoundaryRelaxationResidualSettlingRate: module.getValue(ptr + 232, "double"),
    rmsBoundaryRelaxationResidualSettlingRate: module.getValue(ptr + 240, "double"),
    frameRefinementSampleCount: readUint64(module, ptr + 248),
    boundaryRelaxationCandidateVariantCount: readUint64(module, ptr + 256),
    boundaryRelaxationLineSearchTrialCount: readUint64(module, ptr + 264),
    boundaryRelaxationCandidateKindMask: readUint64(module, ptr + 272),
    positionResidualSampleCount: readUint64(module, ptr + 280),
    maxPositionResidual: module.getValue(ptr + 288, "double"),
    meanPositionResidual: module.getValue(ptr + 296, "double"),
    rmsPositionResidual: module.getValue(ptr + 304, "double"),
    initialVelocityResidualSampleCount: readUint64(module, ptr + 312),
    maxInitialVelocityResidual: module.getValue(ptr + 320, "double"),
    meanInitialVelocityResidual: module.getValue(ptr + 328, "double"),
    rmsInitialVelocityResidual: module.getValue(ptr + 336, "double"),
    boundaryResidualMode:
      PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_BY_CODE[module.getValue(ptr + 344, "i32") >>> 0] ??
      PAIR_INTERACTION_BOUNDARY_RESIDUAL_MODE_SAME_TIME_PAIR_LAW,
  };
}

function readPrecisionDiagnosticRowF64(module, ptr) {
  const flags = module.getValue(ptr + 12, "i32");
  return {
    statusCode: module.getValue(ptr, "i32"),
    recommendedPath: PRECISION_PATH_BY_ID[module.getValue(ptr + 4, "i32")] || "auto",
    recommendedNumericType: NUMERIC_TYPE_BY_ID[module.getValue(ptr + 8, "i32")] || "f64",
    recommendedChart: NUMERIC_CHART_BY_ID[(flags >> 8) & 0xff] || "absolute_f64",
    speedChart: NUMERIC_CHART_BY_ID[(flags >> 16) & 0xff] || "nondimensional_ratio",
    scaleNormalizationRecommended: Boolean(flags & 1),
    extendedPrecisionRecommended: Boolean(flags & 2),
    scaleResolutionLimited: Boolean(flags & 4),
    timeResolutionLimited: Boolean(flags & 8),
    timeScale: {
      ordersOfMagnitude: module.getValue(ptr + 16, "double"),
      maxMagnitude: module.getValue(ptr + 48, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 80, "double"),
    },
    geometryScale: {
      ordersOfMagnitude: module.getValue(ptr + 24, "double"),
      maxMagnitude: module.getValue(ptr + 56, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 88, "double"),
    },
    speedScale: {
      ordersOfMagnitude: module.getValue(ptr + 32, "double"),
      maxMagnitude: module.getValue(ptr + 64, "double"),
    },
    toleranceScale: {
      ordersOfMagnitude: module.getValue(ptr + 40, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 72, "double"),
    },
  };
}

function readPrecisionSolveSummaryF64(module, ptr) {
  const summary = {
    requestedPrecisionPath: PRECISION_PATH_BY_ID[module.getValue(ptr, "i32")] || "auto",
    diagnosticPrecisionPath: PRECISION_PATH_BY_ID[module.getValue(ptr + 4, "i32")] || "auto",
    selectedPrecisionPath: PRECISION_PATH_BY_ID[module.getValue(ptr + 8, "i32")] || "auto",
    selectedNumericType: NUMERIC_TYPE_BY_ID[module.getValue(ptr + 12, "i32")] || "f64",
    claimLevel: CLAIM_LEVEL_BY_ID[module.getValue(ptr + 16, "i32")] || "interactive-preview",
    statusCode: STATUS_CODE_BY_ID[module.getValue(ptr + 20, "i32")] || "precision_failed",
    statusSeverity: STATUS_SEVERITY_BY_ID[module.getValue(ptr + 24, "i32")] || "error",
    rootCount: module.getValue(ptr + 28, "i32"),
    rootTolerance: module.getValue(ptr + 32, "double"),
    maxResidual: module.getValue(ptr + 40, "double"),
    minAbsJacobian: module.getValue(ptr + 48, "double"),
    maxIterations: module.getValue(ptr + 56, "i32"),
    scanSubdivisions: module.getValue(ptr + 60, "i32"),
    escalated: module.getValue(ptr + 64, "i32") !== 0,
    validationReplayRun: module.getValue(ptr + 68, "i32") !== 0,
    validationReplayMatched: module.getValue(ptr + 72, "i32") !== 0,
    selectedNumericChart: NUMERIC_CHART_BY_ID[module.getValue(ptr + 76, "i32")] || "absolute_f64",
  };
  return {
    ...summary,
    escalations: createPrecisionEscalationRecords(summary),
  };
}

function createPrecisionEscalationRecords(summary) {
  if (!summary.escalated) {
    return [];
  }
  const priorPrecisionPath =
    summary.requestedPrecisionPath === "auto"
      ? summary.diagnosticPrecisionPath
      : summary.requestedPrecisionPath;
  const triggeringDiagnostic =
    summary.selectedPrecisionPath === summary.diagnosticPrecisionPath
      ? "precision-diagnostic"
      : "claim-level-or-run-contract-minimum";
  return [
    {
      priorPrecisionPath,
      newPrecisionPath: summary.selectedPrecisionPath,
      triggeringDiagnostic,
      affectedStage: "precision-path",
      claimLevelSatisfied: summary.statusSeverity !== "halt" && summary.statusSeverity !== "error",
    },
  ];
}

function readErrorBudgetStageRowF64(module, ptr) {
  const statusCode = STATUS_CODE_BY_ID[module.getValue(ptr + 8, "i32")] || "precision_failed";
  const statusSeverity = STATUS_SEVERITY_BY_ID[module.getValue(ptr + 12, "i32")] || "halt";
  const stage = ERROR_BUDGET_STAGE_BY_ID[module.getValue(ptr, "i32")] || "root_isolation";
  const authority = VALUE_AUTHORITY_BY_ID[module.getValue(ptr + 4, "i32")] || "rejected";
  return {
    stage,
    estimatedAbsoluteError: module.getValue(ptr + 16, "double"),
    tolerance: module.getValue(ptr + 24, "double"),
    toleranceRatio: module.getValue(ptr + 32, "double"),
    authority,
    status: createStatus(
      statusCode,
      statusSeverity,
      authority === "rejected" ? "error budget stage rejected" : "error budget stage accepted",
      {
        stage,
        recoverable: authority !== "rejected",
      }
    ),
  };
}

function readErrorBudgetSummaryF64(module, ptr) {
  return {
    authority: VALUE_AUTHORITY_BY_ID[module.getValue(ptr, "i32")] || "rejected",
    statusCode: STATUS_CODE_BY_ID[module.getValue(ptr + 4, "i32")] || "precision_failed",
    statusSeverity: STATUS_SEVERITY_BY_ID[module.getValue(ptr + 8, "i32")] || "halt",
    stageCount: module.getValue(ptr + 12, "i32"),
    cumulativeError: module.getValue(ptr + 16, "double"),
    cumulativeBudgetRatio: module.getValue(ptr + 24, "double"),
  };
}

function readAdmissionReportF64(module, ptr) {
  return {
    decision: ADMISSION_DECISION_BY_ID[module.getValue(ptr, "i32")] ?? "reject",
    selectedPrecisionPath: DEFAULT_PRECISION_PATHS[module.getValue(ptr + 4, "i32")] ?? "auto",
    admitted: module.getValue(ptr + 8, "i32") !== 0,
    validationOk: module.getValue(ptr + 12, "i32") !== 0,
    stressSummary: readAdmissionStressSummaryF64(module, ptr + 16),
  };
}

function readAdmissionStressSummaryF64(module, ptr) {
  const hasTimeStepCountEstimate = module.getValue(ptr + 88, "i32") !== 0;
  const dominantStressId = module.getValue(ptr + 92, "i32");
  return {
    schema: "solver-admission-stress-summary.v1",
    entityCount: readUint64(module, ptr),
    estimatedPairCount: readUint64(module, ptr + 8),
    entityPressure: module.getValue(ptr + 16, "double"),
    interactionPressure: module.getValue(ptr + 24, "double"),
    memoryPressure: module.getValue(ptr + 32, "double"),
    storagePressure: module.getValue(ptr + 40, "double"),
    timeStepCountEstimate: hasTimeStepCountEstimate ? module.getValue(ptr + 48, "double") : null,
    timeStepPressure: module.getValue(ptr + 56, "double"),
    outputPressure: module.getValue(ptr + 64, "double"),
    precisionPressure: module.getValue(ptr + 72, "double"),
    dominantStress: ADMISSION_STRESS_DIMENSION_BY_ID[dominantStressId] ?? "entity_count",
    pressureScore: module.getValue(ptr + 80, "double"),
  };
}

function readAdmissionStatusRows(module, ptr, rowCount, abiInfo) {
  const rows = [];
  for (let index = 0; index < rowCount; ++index) {
    rows.push(readAdmissionStatusRow(module, ptr + index * abiInfo.statusRowBytes));
  }
  return rows;
}

function readAdmissionStatusRow(module, ptr) {
  const code = STATUS_CODE_BY_ID[module.getValue(ptr, "i32")] ?? "internal_solver_error";
  const severity = STATUS_SEVERITY_BY_ID[module.getValue(ptr + 4, "i32")] ?? "error";
  const recoverable = module.getValue(ptr + 8, "i32") !== 0;
  const stage = ADMISSION_STAGE_BY_ID[module.getValue(ptr + 12, "i32")];
  const message =
    ADMISSION_STATUS_MESSAGE_BY_ID[module.getValue(ptr + 16, "i32")] ??
    `${code} during solver admission`;
  return createStatus(code, severity, message, {
    stage,
    recoverable,
  });
}

function readPhaseAtHitRowF64(module, ptr) {
  return {
    rootId: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    sourceCycleIndex: readInt64(module, ptr + 8),
    receiverCycleIndex: readInt64(module, ptr + 16),
    emissionTime: module.getValue(ptr + 24, "double"),
    hitTime: module.getValue(ptr + 32, "double"),
    sourcePhase: module.getValue(ptr + 40, "double"),
    receiverPhase: module.getValue(ptr + 48, "double"),
    phaseDelta: module.getValue(ptr + 56, "double"),
    phaseSpread: module.getValue(ptr + 64, "double"),
    rootKind: module.getValue(ptr + 72, "i32") >>> 0,
    sourceLayerCode: module.getValue(ptr + 76, "i32") >>> 0,
    receiverLayerCode: module.getValue(ptr + 80, "i32") >>> 0,
    sourceRoleCode: module.getValue(ptr + 84, "i32") >>> 0,
    receiverRoleCode: module.getValue(ptr + 88, "i32") >>> 0,
    sourceChargeSign: module.getValue(ptr + 92, "i32"),
    receiverChargeSign: module.getValue(ptr + 96, "i32"),
    stateFlags: module.getValue(ptr + 100, "i32") >>> 0,
  };
}

function readBoundsRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    pathKey: readUint64(module, ptr + 8),
    min: readVector(module, ptr + 16),
    max: readVector(module, ptr + 40),
  };
}

function readSpherePointIntersectionRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    intersects: module.getValue(ptr + 4, "i32") !== 0,
    centerDistance: module.getValue(ptr + 8, "double"),
    signedDistance: module.getValue(ptr + 16, "double"),
  };
}

function readDelayedPotentialRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    tau: module.getValue(ptr + 8, "double"),
    emissionTime: module.getValue(ptr + 16, "double"),
    emissionPoint: readVector(module, ptr + 24),
    displacement: readVector(module, ptr + 48),
    distance: module.getValue(ptr + 72, "double"),
    denominator: module.getValue(ptr + 80, "double"),
    potential: module.getValue(ptr + 88, "double"),
    kappa: module.getValue(ptr + 96, "double"),
    iterations: module.getValue(ptr + 104, "i32"),
    usedCausalDenominator: module.getValue(ptr + 108, "i32") !== 0,
  };
}

function readCircularSelfHitSpanRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    fieldSpeedRatio: module.getValue(ptr + 8, "double"),
    fieldSpeedTolerance: module.getValue(ptr + 16, "double"),
    regime: FIELD_SPEED_REGIME_BY_ID[module.getValue(ptr + 64, "i32")] ?? "field_speed",
    resultKind: CIRCULAR_SELF_HIT_RESULT_KIND_BY_ID[module.getValue(ptr + 68, "i32")] ?? "fallback_pi",
    span: module.getValue(ptr + 24, "double"),
    rootFound: module.getValue(ptr + 56, "i32") !== 0,
    bracketLow: module.getValue(ptr + 32, "double"),
    bracketHigh: module.getValue(ptr + 40, "double"),
    residual: module.getValue(ptr + 48, "double"),
    iterations: module.getValue(ptr + 60, "i32"),
  };
}

function readMotionFrameRowF64(module, ptr) {
  return {
    pathKey: readUint64(module, ptr),
    frameIndex: readUint64(module, ptr + 8),
    time: module.getValue(ptr + 16, "double"),
    position: readVector(module, ptr + 24),
    velocity: readVector(module, ptr + 48),
    errorBound: module.getValue(ptr + 72, "double"),
    stateFlags: module.getValue(ptr + 80, "i32") >>> 0,
  };
}

function readT3ParticleStepRowF64(module, ptr) {
  return {
    pathKey: readUint64(module, ptr),
    position: readVector(module, ptr + 8),
    velocity: readVector(module, ptr + 32),
    acceleration: readVector(module, ptr + 56),
    integrationWeight: module.getValue(ptr + 80, "double"),
    imageDelta: {
      x: module.getValue(ptr + 88, "i32"),
      y: module.getValue(ptr + 92, "i32"),
      z: module.getValue(ptr + 96, "i32"),
    },
    stateFlags: module.getValue(ptr + 100, "i32") >>> 0,
  };
}

function readT3StepSummaryF64(module, ptr) {
  const interactionLawCode = module.getValue(ptr + 72, "i32") >>> 0;
  return {
    particleCount: readUint64(module, ptr),
    neighborPairCount: readUint64(module, ptr + 8),
    cellCount: readUint64(module, ptr + 16),
    occupiedCellCount: readUint64(module, ptr + 24),
    startTime: module.getValue(ptr + 32, "double"),
    endTime: module.getValue(ptr + 40, "double"),
    timestep: module.getValue(ptr + 48, "double"),
    maxAcceleration: module.getValue(ptr + 56, "double"),
    interactionEnergy: module.getValue(ptr + 64, "double"),
    interactionLawCode,
    interactionLaw: interactionLawCode === 1 ? "soft_sphere_repel_v1" : "none",
    integrationMethod: module.getValue(ptr + 76, "i32") >>> 0,
    statusFlags: module.getValue(ptr + 80, "i32") >>> 0,
  };
}

function readT3UnresolvedRootSegmentRowF64(module, ptr) {
  const stepIndex = readUint64(module, ptr);
  const sourcePathKey = readUint64(module, ptr + 8);
  const receiverPathKey = readUint64(module, ptr + 16);
  const sourceSegmentIndex = readUint64(module, ptr + 24);
  const receiverSegmentIndex = readUint64(module, ptr + 32);
  const sourcePosition = readVector(module, ptr + 40);
  const sourceVelocity = readVector(module, ptr + 64);
  const receiverPosition = readVector(module, ptr + 88);
  const receiverVelocity = readVector(module, ptr + 112);
  const startTime = module.getValue(ptr + 136, "double");
  const endTime = module.getValue(ptr + 144, "double");
  const hitTime = module.getValue(ptr + 152, "double");
  const signalSpeed = module.getValue(ptr + 160, "double");
  const rootTolerance = module.getValue(ptr + 168, "double");
  const sourceErrorBound = module.getValue(ptr + 176, "double");
  const receiverErrorBound = module.getValue(ptr + 184, "double");
  const sourceStateFlags = module.getValue(ptr + 192, "i32") >>> 0;
  const receiverStateFlags = module.getValue(ptr + 196, "i32") >>> 0;
  const pairPolicyCode = module.getValue(ptr + 200, "i32") >>> 0;
  const rowStatusCode = module.getValue(ptr + 204, "i32") >>> 0;
  return {
    schema: "t3-unresolved-root-segment-row.v1",
    chronologyRowId: `step_${stepIndex}_unresolved_root_rows`,
    stepIndex,
    sourcePathKey,
    receiverPathKey,
    sourceSegmentIndex,
    receiverSegmentIndex,
    sourceSegment: {
      pathKey: sourcePathKey,
      segmentIndex: sourceSegmentIndex,
      startTime,
      endTime,
      position: sourcePosition,
      velocity: sourceVelocity,
      errorBound: sourceErrorBound,
    },
    receiverSegment: {
      pathKey: receiverPathKey,
      segmentIndex: receiverSegmentIndex,
      startTime,
      endTime,
      position: receiverPosition,
      velocity: receiverVelocity,
      errorBound: receiverErrorBound,
    },
    sameRecordSegmentBinding: {
      sourcePathKey,
      receiverPathKey,
      sourceSegmentIndex,
      receiverSegmentIndex,
      bindingStatus: "same_step_segment_shape_evidence",
    },
    sourceIdentityBinding: {
      pathKey: sourcePathKey,
      stateFlags: sourceStateFlags,
      bindingStatus: "path_key_state_flags_same_step",
    },
    receiverIdentityBinding: {
      pathKey: receiverPathKey,
      stateFlags: receiverStateFlags,
      bindingStatus: "path_key_state_flags_same_step",
    },
    hitTime,
    signalSpeed,
    rootTolerance,
    rootLedgerRecordId: null,
    causticRoute: null,
    sourcePathSegmentId: null,
    pairPolicyCode,
    pairPolicy: T3_UNRESOLVED_ROOT_PAIR_POLICY_ID_BY_CODE[pairPolicyCode] ?? "unknown",
    rowStatusCode,
    rowStatus:
      T3_UNRESOLVED_ROOT_SEGMENT_ROW_STATUS_BY_CODE[rowStatusCode] ?? "unknown",
    replayAuthorization: false,
    acceptedReplayEvidence: false,
    retainedBranch: false,
    provesBranchAdmissibility: false,
  };
}

function readT3RetainedCausalRootReplayRowF64(module, ptr) {
  const stepIndex = readUint64(module, ptr);
  const sourcePathKey = readUint64(module, ptr + 8);
  const receiverPathKey = readUint64(module, ptr + 16);
  const sourceSegmentIndex = readUint64(module, ptr + 24);
  const receiverSegmentIndex = readUint64(module, ptr + 32);
  const sameRecordReplayIdValue = readUint64(module, ptr + 40);
  const retainedSourceRecordIdValue = readUint64(module, ptr + 48);
  const retainedCausalRootRowIdValue = readUint64(module, ptr + 56);
  const rootLedgerRecordIdValue = readUint64(module, ptr + 64);
  const sourcePathSegmentIdValue = readUint64(module, ptr + 72);
  const receiverPathSegmentIdValue = readUint64(module, ptr + 80);
  const retainedSourceBindingStatusCode = module.getValue(ptr + 88, "i32") >>> 0;
  const sameRecordReplayStatusCode = module.getValue(ptr + 92, "i32") >>> 0;
  const causticRouteStatusCode = module.getValue(ptr + 96, "i32") >>> 0;
  const proofObjectProvenanceStatusCode = module.getValue(ptr + 100, "i32") >>> 0;
  const rowStatusCode = module.getValue(ptr + 104, "i32") >>> 0;
  const rowStatus =
    T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_STATUS_BY_CODE[rowStatusCode] ?? "unknown";
  const retainedSourceBindingStatus =
    T3_RETAINED_CAUSAL_ROOT_REPLAY_FIELD_STATUS_BY_CODE[
      retainedSourceBindingStatusCode
    ] ?? "unknown";
  const sameRecordReplayStatus =
    T3_RETAINED_CAUSAL_ROOT_REPLAY_ROW_STATUS_BY_CODE[
      sameRecordReplayStatusCode
    ] ?? "unknown";
  const causticRouteStatus =
    T3_RETAINED_CAUSAL_ROOT_REPLAY_FIELD_STATUS_BY_CODE[
      causticRouteStatusCode
    ] ?? "unknown";
  const proofObjectProvenanceStatus =
    T3_RETAINED_CAUSAL_ROOT_REPLAY_FIELD_STATUS_BY_CODE[
      proofObjectProvenanceStatusCode
    ] ?? "unknown";
  return {
    schema: "t3-retained-causal-root-replay-native-row.v1",
    chronologyRowId: `step_${stepIndex}_unresolved_root_rows`,
    sourceObjectRowSchema: "t3-unresolved-root-segment-row.v1",
    sourceObjectRowStatus: "candidate_shape_evidence",
    stepIndex,
    sourcePathKey,
    receiverPathKey,
    sourceSegmentIndex,
    receiverSegmentIndex,
    sameRecordReplayId: sameRecordReplayIdValue === 0 ? null : sameRecordReplayIdValue,
    retainedSourceRecordId: retainedSourceRecordIdValue === 0 ? null : retainedSourceRecordIdValue,
    retainedCausalRootRowId:
      retainedCausalRootRowIdValue === 0 ? null : retainedCausalRootRowIdValue,
    rootLedgerRecordId: rootLedgerRecordIdValue === 0 ? null : rootLedgerRecordIdValue,
    causticRoute: null,
    sourcePathSegmentId: sourcePathSegmentIdValue === 0 ? null : sourcePathSegmentIdValue,
    receiverPathSegmentId:
      receiverPathSegmentIdValue === 0 ? null : receiverPathSegmentIdValue,
    sameRecordRetainedBinding: {
      sameRecordReplayId: sameRecordReplayIdValue === 0 ? null : sameRecordReplayIdValue,
      retainedSourceRecordId:
        retainedSourceRecordIdValue === 0 ? null : retainedSourceRecordIdValue,
      retainedCausalRootRowId:
        retainedCausalRootRowIdValue === 0 ? null : retainedCausalRootRowIdValue,
      rootLedgerRecordId: rootLedgerRecordIdValue === 0 ? null : rootLedgerRecordIdValue,
      sourcePathSegmentId: sourcePathSegmentIdValue === 0 ? null : sourcePathSegmentIdValue,
      receiverPathSegmentId:
        receiverPathSegmentIdValue === 0 ? null : receiverPathSegmentIdValue,
      bindingStatus: sameRecordReplayStatus,
      valueAuthority: "candidate-native-same-record-binding",
    },
    retainedSourceBindingStatusCode,
    retainedSourceBindingStatus,
    sameRecordReplayStatusCode,
    sameRecordReplayStatus,
    causticRouteStatusCode,
    causticRouteStatus,
    proofObjectProvenanceStatusCode,
    proofObjectProvenanceStatus,
    proofObjectProvenance: {
      nativeProducer: "src/solver/src/T3BulkStep.cpp::step_t3_universe",
      nativeRow: "T3RetainedCausalRootReplayRowF64",
      sourceNativeRow: "T3UnresolvedRootSegmentRowF64",
      bridgeReader:
        "src/solver/app/SolverAppBridge.mjs::readT3RetainedCausalRootReplayRowF64",
      provenanceStatus: proofObjectProvenanceStatus,
    },
    rowStatusCode,
    rowStatus,
    replayAuthorization: false,
    acceptedReplayEvidence: false,
    retainedBranch: false,
    provesBranchAdmissibility: false,
  };
}

function readAssemblyEventRowF64(module, ptr) {
  return {
    eventKey: readUint64(module, ptr),
    primaryId: readUint64(module, ptr + 8),
    secondaryId: readUint64(module, ptr + 16),
    priorStateKey: readUint64(module, ptr + 24),
    nextStateKey: readUint64(module, ptr + 32),
    relatedPathKey: readUint64(module, ptr + 40),
    relatedAssemblyKey: readUint64(module, ptr + 48),
    branchTransitionKey: readUint64(module, ptr + 56),
    eventTime: module.getValue(ptr + 64, "double"),
    eventKind: module.getValue(ptr + 72, "i32") >>> 0,
    speedRegime: module.getValue(ptr + 76, "i32") >>> 0,
    statusFlags: module.getValue(ptr + 80, "i32") >>> 0,
  };
}

function readSpaceTimeIndexRows(module, ptr, rowCount, abiInfo) {
  const rows = [];
  for (let index = 0; index < rowCount; index += 1) {
    rows.push(readSpaceTimeIndexRowF64(module, ptr + index * abiInfo.spaceTimeIndexRowF64Bytes));
  }
  return rows;
}

function readSpaceTimeIndexRowF64(module, ptr) {
  return {
    cellX: readInt64(module, ptr),
    cellY: readInt64(module, ptr + 8),
    cellZ: readInt64(module, ptr + 16),
    cellT: readInt64(module, ptr + 24),
    subjectKey: readUint64(module, ptr + 32),
    rowOffset: readUint64(module, ptr + 40),
    min: readVector(module, ptr + 48),
    max: readVector(module, ptr + 72),
    timeStart: module.getValue(ptr + 96, "double"),
    timeEnd: module.getValue(ptr + 104, "double"),
    subjectKind: module.getValue(ptr + 112, "i32") >>> 0,
    sourceLayout: module.getValue(ptr + 116, "i32") >>> 0,
    stateFlags: module.getValue(ptr + 120, "i32") >>> 0,
  };
}

function readEmissionShellCandidateRowF64(module, ptr) {
  return {
    sourcePathKey: readUint64(module, ptr),
    receiverPathKey: readUint64(module, ptr + 8),
    sourceSegmentIndex: readUint64(module, ptr + 16),
    receiverSegmentIndex: readUint64(module, ptr + 24),
    sourceRowIndex: readUint64(module, ptr + 32),
    receiverRowIndex: readUint64(module, ptr + 40),
    sourceTimeStart: module.getValue(ptr + 48, "double"),
    sourceTimeEnd: module.getValue(ptr + 56, "double"),
    receiverTimeStart: module.getValue(ptr + 64, "double"),
    receiverTimeEnd: module.getValue(ptr + 72, "double"),
    distanceLowerBound: module.getValue(ptr + 80, "double"),
    distanceUpperBound: module.getValue(ptr + 88, "double"),
    radiusLowerBound: module.getValue(ptr + 96, "double"),
    radiusUpperBound: module.getValue(ptr + 104, "double"),
  };
}

function readEmissionShellBroadPhaseSummary(module, ptr) {
  return {
    pairCount: readUint64(module, ptr),
    rejectedPairCount: readUint64(module, ptr + 8),
    candidateCount: readUint64(module, ptr + 16),
    truncated: module.getValue(ptr + 24, "i32") !== 0,
    plannedWorkerCount: module.getValue(ptr + 28, "i32") >>> 0,
  };
}

function readEmissionShellIndexedBroadPhaseSummary(module, ptr) {
  const coverageStatusId = module.getValue(ptr + 84, "i32") >>> 0;
  const coverageStatus =
    coverageStatusId === 0 ? "complete" : coverageStatusId === 1 ? "truncated" : "invalid_input";
  return {
    sourceRowOffset: readUint64(module, ptr),
    receiverRowOffset: readUint64(module, ptr + 8),
    receiverCellRows: readUint64(module, ptr + 16),
    shellAnnulusRows: readUint64(module, ptr + 24),
    cellLookups: readUint64(module, ptr + 32),
    indexedPairTests: readUint64(module, ptr + 40),
    duplicatePairTests: readUint64(module, ptr + 48),
    spatialCellSize: module.getValue(ptr + 56, "double"),
    timeRangeStart: module.getValue(ptr + 64, "double"),
    timeRangeEnd: module.getValue(ptr + 72, "double"),
    timeSlabCount: module.getValue(ptr + 80, "i32") >>> 0,
    coverageStatus,
  };
}

function readEmissionShellNarrowPhaseRowF64(module, ptr) {
  const classificationCode = module.getValue(ptr + 8, "i32") >>> 0;
  const residual = module.getValue(ptr + 32, "double");
  const estimate = {
    method: "sampled_linear_segment_bisection.v1",
    classification: classificationCode === 1 ? "sampled_hit" : "sampled_miss",
    sampleCount: module.getValue(ptr + 12, "i32") >>> 0,
    residual: Number.isFinite(residual) ? residual : null,
  };
  if (classificationCode === 1) {
    estimate.hitTime = module.getValue(ptr + 16, "double");
    estimate.emissionTime = module.getValue(ptr + 24, "double");
  }
  return estimate;
}

function readPathHistoryLifecycleDecisionRow(module, ptr) {
  const tierCode = module.getValue(ptr + 8, "i32") >>> 0;
  const actionCode = module.getValue(ptr + 12, "i32") >>> 0;
  const reasonCode = module.getValue(ptr + 24, "i32") >>> 0;
  return {
    chunkIndex: readUint64(module, ptr),
    tierCode,
    tier: STORAGE_LIFECYCLE_TIER_BY_ID[tierCode] ?? "unknown",
    actionCode,
    action: STORAGE_LIFECYCLE_ACTION_BY_ID[actionCode] ?? "unknown",
    safeToAgeOut: (module.getValue(ptr + 16, "i32") >>> 0) !== 0,
    requiresDeepIndex: (module.getValue(ptr + 20, "i32") >>> 0) !== 0,
    reasonCode,
    reason: STORAGE_LIFECYCLE_REASON_BY_ID[reasonCode] ?? "unknown",
  };
}

function readVector(module, ptr) {
  return {
    x: module.getValue(ptr, "double"),
    y: module.getValue(ptr + 8, "double"),
    z: module.getValue(ptr + 16, "double"),
  };
}

function writeZeroBytes(module, ptr, byteLength) {
  if (module.HEAPU8) {
    module.HEAPU8.fill(0, ptr, ptr + byteLength);
    return;
  }
  for (let offset = 0; offset < byteLength; offset += 1) {
    module.setValue(ptr + offset, 0, "i8");
  }
}

function writeUint64(module, ptr, value) {
  const encoded = BigInt(value);
  const low = Number(encoded & 0xffffffffn);
  const high = Number((encoded >> 32n) & 0xffffffffn);
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    module.HEAPU32[index] = low;
    module.HEAPU32[index + 1] = high;
    return;
  }
  module.setValue(ptr, low, "i32");
  module.setValue(ptr + 4, high, "i32");
}

function writeInt64(module, ptr, value) {
  let encoded = BigInt(value);
  if (encoded < 0) {
    encoded = (1n << 64n) + encoded;
  }
  const low = Number(encoded & 0xffffffffn);
  const high = Number((encoded >> 32n) & 0xffffffffn);
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    module.HEAPU32[index] = low;
    module.HEAPU32[index + 1] = high;
    return;
  }
  module.setValue(ptr, low, "i32");
  module.setValue(ptr + 4, high, "i32");
}

function readUint64(module, ptr) {
  let low;
  let high;
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    low = module.HEAPU32[index];
    high = module.HEAPU32[index + 1];
  } else {
    low = module.getValue(ptr, "i32") >>> 0;
    high = module.getValue(ptr + 4, "i32") >>> 0;
  }
  return Number((BigInt(high) << 32n) + BigInt(low));
}

function readInt64(module, ptr) {
  let low;
  let high;
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    low = module.HEAPU32[index];
    high = module.HEAPU32[index + 1];
  } else {
    low = module.getValue(ptr, "i32") >>> 0;
    high = module.getValue(ptr + 4, "i32") >>> 0;
  }
  const unsigned = (BigInt(high) << 32n) + BigInt(low);
  const signed = high & 0x80000000 ? unsigned - (1n << 64n) : unsigned;
  return Number(signed);
}

function copyWasmBytes(module, ptr, byteLength) {
  if (byteLength === 0) {
    return new ArrayBuffer(0);
  }
  if (module.HEAPU8 && typeof module.HEAPU8.subarray === "function") {
    const copy = new Uint8Array(byteLength);
    copy.set(module.HEAPU8.subarray(ptr, ptr + byteLength));
    return copy.buffer;
  }
  const copy = new Uint8Array(byteLength);
  for (let index = 0; index < byteLength; index += 1) {
    copy[index] = module.getValue(ptr + index, "i8") & 0xff;
  }
  return copy.buffer;
}

function createEmissionShellCandidateBuffers(candidateRows, narrowPhaseRows) {
  const candidateBuffer = new ArrayBuffer(EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES * candidateRows.length);
  const candidateView = new DataView(candidateBuffer);
  candidateRows.forEach((row, index) => {
    writeEmissionShellCandidateRowToView(
      candidateView,
      index * EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES,
      row
    );
  });

  const narrowPhaseBuffer = new ArrayBuffer(EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES * narrowPhaseRows.length);
  const narrowPhaseView = new DataView(narrowPhaseBuffer);
  narrowPhaseRows.forEach((row, index) => {
    writeEmissionShellNarrowPhaseRowToView(
      narrowPhaseView,
      index * EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES,
      index,
      row
    );
  });

  return [
    createBufferDescriptor(
      "emission-shell-candidates",
      "emission_shell_candidate.v1",
      candidateRows.length,
      EMISSION_SHELL_CANDIDATE_ROW_F64_BYTES,
      candidateBuffer
    ),
    createBufferDescriptor(
      "emission-shell-narrow-phase",
      "emission_shell_narrow_phase.v1",
      narrowPhaseRows.length,
      EMISSION_SHELL_NARROW_PHASE_ROW_F64_BYTES,
      narrowPhaseBuffer
    ),
  ];
}

function writeEmissionShellCandidateRowToView(view, offset, row) {
  view.setBigUint64(offset, BigInt(row.sourcePathKey), true);
  view.setBigUint64(offset + 8, BigInt(row.receiverPathKey), true);
  view.setBigUint64(offset + 16, BigInt(row.sourceSegmentIndex), true);
  view.setBigUint64(offset + 24, BigInt(row.receiverSegmentIndex), true);
  view.setBigUint64(offset + 32, BigInt(row.sourceRowIndex), true);
  view.setBigUint64(offset + 40, BigInt(row.receiverRowIndex), true);
  view.setFloat64(offset + 48, row.sourceTimeRange.start, true);
  view.setFloat64(offset + 56, row.sourceTimeRange.end, true);
  view.setFloat64(offset + 64, row.receiverTimeRange.start, true);
  view.setFloat64(offset + 72, row.receiverTimeRange.end, true);
  view.setFloat64(offset + 80, row.distanceLowerBound, true);
  view.setFloat64(offset + 88, row.distanceUpperBound, true);
  view.setFloat64(offset + 96, row.radiusLowerBound, true);
  view.setFloat64(offset + 104, row.radiusUpperBound, true);
}

function writeEmissionShellNarrowPhaseRowToView(view, offset, itemIndex, row) {
  view.setInt32(offset, itemIndex, true);
  view.setInt32(offset + 4, 0, true);
  view.setUint32(offset + 8, row.classification === "sampled_hit" ? 1 : 0, true);
  view.setUint32(offset + 12, row.sampleCount, true);
  view.setFloat64(offset + 16, row.hitTime ?? 0, true);
  view.setFloat64(offset + 24, row.emissionTime ?? 0, true);
  view.setFloat64(offset + 32, row.residual ?? Number.NaN, true);
}

function createBufferDescriptor(bufferId, layout, rowCount, rowSizeBytes, buffer) {
  const descriptor = {
    bufferId,
    layout,
    byteOffset: 0,
    byteLength: rowCount * rowSizeBytes,
    rowCount,
    numericType: "f64",
  };
  if (buffer) {
    descriptor.buffer = buffer;
  }
  return descriptor;
}

function createTransientStreamDescriptor(streamId, hitTime, buffers, metadata = {}) {
  let byteOffset = 0;
  const availableRanges = buffers.map((buffer) => {
    const byteRange = {
      start: byteOffset,
      end: byteOffset + buffer.byteLength,
    };
    byteOffset += buffer.byteLength;
    return {
      timeRange: { start: hitTime, end: hitTime },
      frameRange: { start: 0, end: Math.max(0, buffer.rowCount - 1) },
      byteRange,
    };
  });
  return {
    streamId,
    manifestVersion: "solver-stream-manifest.v1",
    indexLayout: "stream_index.v1",
    availableRanges,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: byteOffset,
    },
    metadata: normalizePathHistoryStreamMetadata({
      precisionPath: metadata.precisionPath ?? "auto",
      numericType: metadata.numericType ?? "f64",
      numericChart: metadata.numericChart ?? "absolute_f64",
      valueAuthority: metadata.valueAuthority ?? "authoritative",
      appBufferAuthority: metadata.appBufferAuthority ?? "authoritative",
      claimLevel: metadata.claimLevel ?? "interactive-preview",
      units: metadata.units ?? "solver-units",
      coordinateFrame: metadata.coordinateFrame ?? "solver-frame",
      scaleNormalization: metadata.scaleNormalization ?? "none",
      interpolationRule: metadata.interpolationRule ?? "transient-buffer",
      provenance: metadata.provenance ?? { source: "transient-stream" },
      diagnostics: metadata.diagnostics ?? [],
    }),
  };
}

function createStreamEntry(stream, buffers, options = {}) {
  const entry = {
    stream,
    buffers,
    runId: options.runId ?? null,
    datasetId: options.datasetId ?? null,
    pathIndexRows: Array.isArray(options.pathIndexRows)
      ? options.pathIndexRows.map(copyPathHistoryIndexRow)
      : null,
    indexSidecar: options.indexSidecar ? copyStreamIndexSidecar(options.indexSidecar) : null,
    deepIndexes: Array.isArray(options.deepIndexes) ? options.deepIndexes.map(deepCloneJson) : [],
    pathIndexRowsByChunk: null,
    pathIndexSummary: null,
  };
  ensurePathHistoryIndexCache(entry);
  return entry;
}

function registerResponseStreams(state, response) {
  if (!response || !Array.isArray(response.streams)) {
    return;
  }
  response.streams.forEach((stream) => {
    if (state.streams.has(stream.streamId)) {
      return;
    }
    state.streams.set(
      stream.streamId,
      createStreamEntry(stream, selectResponseBuffersForStream(response, stream), {
        runId: response.runId ?? null,
        datasetId: response.datasetId ?? null,
      })
    );
  });
}

function selectResponseBuffersForStream(response, stream) {
  const buffers = response.buffers.map(copyBufferDescriptor);
  const streamPrefix = `${stream.streamId}:`;
  const prefixedBuffers = buffers.filter((buffer) => buffer.bufferId.startsWith(streamPrefix));
  return prefixedBuffers.length > 0 ? prefixedBuffers : buffers;
}

function createPathHistoryStreamF64(state, request, abiInfo) {
  validateCreatePathHistoryStreamRequest(request);
  const rowsPerChunk = request.rowsPerChunk ?? 1024;
  const storagePolicy = normalizePathHistoryStreamStoragePolicy(request.storagePolicy);
  const expectedTotalBytes = request.pathRows.length * abiInfo.pathHistoryRowF64Bytes;
  if (storagePolicy.maxBytes > 0 && expectedTotalBytes > storagePolicy.maxBytes) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "path-history stream exceeds storage budget", {
        recoverable: true,
        runId: request.runId,
        details: {
          streamId: request.streamId,
          requestedBytes: expectedTotalBytes,
          maxBytes: storagePolicy.maxBytes,
          storageTarget: storagePolicy.target,
        },
      })
    );
  }
  const nativeFileStorage =
    storagePolicy.target === "native-file"
      ? prepareNativeFileStreamStorage(request.streamId, storagePolicy)
      : null;
  const buffers = [];
  const ranges = [];
  let totalBytes = 0;
  for (let offset = 0; offset < request.pathRows.length; offset += rowsPerChunk) {
    const chunkRows = request.pathRows.slice(offset, offset + rowsPerChunk);
    const buffer = encodePathHistoryRowsF64(chunkRows, abiInfo.pathHistoryRowF64Bytes);
    const descriptor = createBufferDescriptor(
      `${request.streamId}:path-chunk-${buffers.length}`,
      "path_segment.v1",
      chunkRows.length,
      abiInfo.pathHistoryRowF64Bytes,
      buffer
    );
    descriptor.checksum = fnv1a64ArrayBufferHex(buffer);
    const storedDescriptor = nativeFileStorage
      ? writeNativeFileStreamChunk(nativeFileStorage, buffers.length, descriptor, buffer)
      : descriptor;
    const chunkStats = summarizePathHistoryRows(chunkRows);
    const byteRange = {
      start: totalBytes,
      end: totalBytes + descriptor.byteLength,
    };
    totalBytes += descriptor.byteLength;
    buffers.push(storedDescriptor);
    ranges.push({
      timeRange: chunkStats.timeRange,
      frameRange: chunkStats.frameRange,
      bounds: chunkStats.bounds,
      byteRange,
    });
  }
  const streamStoragePolicy = nativeFileStorage
    ? {
        ...storagePolicy,
        basePath: nativeFileStorage.basePath,
        streamPath: nativeFileStorage.streamPath,
        indexPath: nativeFileStorage.indexPath,
        manifestPath: nativeFileStorage.manifestPath,
      }
    : {
        ...storagePolicy,
        maxBytes: totalBytes,
      };

  const stream = {
    streamId: request.streamId,
    manifestVersion: "solver-stream-manifest.v1",
    indexLayout: "stream_index.v1",
    availableRanges: ranges,
    storagePolicy: streamStoragePolicy,
    metadata: normalizePathHistoryStreamMetadata(request.metadata),
  };
  const streamEntry = createStreamEntry(stream, buffers.map(copyBufferDescriptor), {
    runId: request.runId,
    datasetId: request.datasetId ?? null,
  });
  state.streams.set(stream.streamId, streamEntry);
  const pathIndex = buildStreamIndexDescription(streamEntry);
  if (nativeFileStorage) {
    streamEntry.indexSidecar = writeNativeFileStreamIndexSidecar(nativeFileStorage, pathIndex);
    writeNativeFileStreamManifest(nativeFileStorage, stream, buffers, buildStreamIndexDescription(streamEntry));
  }
  const pathIndexSummary = getPathHistoryIndexSummary(streamEntry);
  const summary = {
    schema: "solver-path-history-stream-summary.v1",
    runId: request.runId,
    datasetId: request.datasetId,
    streamId: request.streamId,
    rowCount: request.pathRows.length,
    chunkCount: buffers.length,
    pathCount: new Set(request.pathRows.map((row) => row.pathKey)).size,
    byteLength: totalBytes,
    rowSizeBytes: abiInfo.pathHistoryRowF64Bytes,
    pathIndexRowCount: pathIndexSummary.pathIndexRowCount,
    pathIndexedChunkCount: pathIndexSummary.pathIndexedChunkCount,
    timeRange: summarizePathHistoryRows(request.pathRows).timeRange,
    frameRange: summarizePathHistoryRows(request.pathRows).frameRange,
    storagePolicy: stream.storagePolicy,
    metadata: stream.metadata,
  };
  return {
    schema: "solver-path-history-stream.v1",
    stream,
    buffers: buffers.map(copyBufferDescriptorWithoutPayload),
    summary,
    status: createStatus("ok", "ok", "path-history stream created", {
      runId: request.runId,
      details: {
        streamId: request.streamId,
        rowCount: request.pathRows.length,
        chunkCount: buffers.length,
      },
    }),
  };
}

function planPathHistoryStorageLifecycleF64WithModule(state, module, request, abiInfo) {
  const normalizedRequest = normalizePathHistoryStorageLifecycleRequest(state, request);
  const chunkCount = normalizedRequest.chunks.length;
  const policyPtr = module._malloc(abiInfo.storageLifecyclePolicyBytes);
  const chunksPtr = chunkCount > 0 ? module._malloc(abiInfo.pathHistoryChunkRowBytes * chunkCount) : 0;
  const decisionsPtr =
    chunkCount > 0 ? module._malloc(abiInfo.pathHistoryLifecycleDecisionRowBytes * chunkCount) : 0;
  const outRowCountPtr = module._malloc(4);
  try {
    writeStorageLifecyclePolicy(module, policyPtr, normalizedRequest.policy);
    normalizedRequest.chunks.forEach((chunk, index) => {
      writePathHistoryChunkRow(
        module,
        chunksPtr + index * abiInfo.pathHistoryChunkRowBytes,
        chunk
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const planLifecycle = module.cwrap(
      "architrino_solver_plan_path_history_storage_lifecycle",
      "number",
      ["number", "number", "number", "number", "number", "number"]
    );
    const status = planLifecycle(
      policyPtr,
      chunksPtr,
      chunkCount,
      decisionsPtr,
      chunkCount,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `storage lifecycle C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, chunkCount },
        })
      );
    }
    const decisions = [];
    for (let index = 0; index < rowCount; index += 1) {
      decisions.push(
        readPathHistoryLifecycleDecisionRow(
          module,
          decisionsPtr + index * abiInfo.pathHistoryLifecycleDecisionRowBytes
        )
      );
    }
    return {
      schema: "solver-path-history-storage-lifecycle.v1",
      streamId: normalizedRequest.streamId,
      policy: normalizedRequest.policy,
      chunkCount,
      decisions,
      summary: summarizePathHistoryStorageLifecycle(normalizedRequest.chunks, decisions),
      status: createStatus("ok", "ok", "path-history storage lifecycle planned", {
        details: {
          streamId: normalizedRequest.streamId,
          chunkCount,
          decisionCount: decisions.length,
        },
      }),
    };
  } finally {
    module._free(policyPtr);
    if (chunksPtr) {
      module._free(chunksPtr);
    }
    if (decisionsPtr) {
      module._free(decisionsPtr);
    }
    module._free(outRowCountPtr);
  }
}

function applyPathHistoryStorageLifecycleF64WithModule(state, module, request, abiInfo) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle apply request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.streamId == null && request.manifestPath == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle apply requires streamId or manifestPath", {
        recoverable: false,
      })
    );
  }
  if (request.chunks != null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle apply cannot target loose chunks", {
        recoverable: false,
      })
    );
  }
  if (
    request.deleteStreamWhenAllChunksDeleted != null &&
    typeof request.deleteStreamWhenAllChunksDeleted !== "boolean"
  ) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "path-history lifecycle apply deleteStreamWhenAllChunksDeleted must be boolean",
        { recoverable: false }
      )
    );
  }

  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const plan = planPathHistoryStorageLifecycleF64WithModule(
    state,
    module,
    {
      streamId: streamEntry.stream.streamId,
      policy: request.policy,
    },
    abiInfo
  );
  const deepIndex = buildLifecycleDeepIndexIfNeeded(state, module, streamEntry, plan, abiInfo);
  const metadata = normalizePathHistoryStorageLifecycleMetadata({
    schema: "solver-path-history-storage-lifecycle-metadata.v1",
    policy: plan.policy,
    summary: plan.summary,
    decisions: plan.decisions,
    deepIndex,
  });
  streamEntry.stream.metadata = normalizePathHistoryStreamMetadata({
    ...streamEntry.stream.metadata,
    lifecycle: metadata,
  });
  const manifestPath = streamEntry.stream.storagePolicy?.manifestPath;
  const cleanup = applyLifecycleCleanupIfRequested(
    state,
    streamEntry,
    plan,
    Boolean(request.deleteStreamWhenAllChunksDeleted)
  );
  const nativeManifestUpdated = cleanup.deletedStream ? false : rewriteNativeFileStreamManifestIfNeeded(streamEntry);

  return dropUndefinedProperties({
    schema: "solver-path-history-storage-lifecycle-apply.v1",
    streamId: streamEntry.stream.streamId,
    plan,
    appliedChunkCount: plan.decisions.length,
    nativeManifestUpdated,
    manifestPath,
    metadata,
    cleanup,
    status: createStatus("ok", "ok", "path-history storage lifecycle applied", {
      details: {
        streamId: streamEntry.stream.streamId,
        appliedChunkCount: plan.decisions.length,
        nativeManifestUpdated,
        cleanup,
      },
    }),
  });
}

function buildLifecycleDeepIndexIfNeeded(state, module, streamEntry, plan, abiInfo) {
  const chunkIndices = plan.summary.deepIndexQueueChunkIndices;
  if (!plan.policy.deepIndexEnabled || chunkIndices.length === 0) {
    return undefined;
  }
  const options = createDefaultLifecycleDeepIndexOptions(streamEntry);
  const indexResponse = buildPathHistoryStreamSpaceTimeIndexF64WithModule(
    state,
    module,
    {
      streamId: streamEntry.stream.streamId,
      chunkIndices,
      options,
    },
    abiInfo
  );
  const indexBuffer = indexResponse.buffers.find((buffer) => buffer.layout === "spacetime_index.v1");
  const checksum = indexBuffer?.buffer instanceof ArrayBuffer
    ? fnv1a64ArrayBufferHex(indexBuffer.buffer)
    : stableHashHex(indexResponse.rows);
  const artifact = {
    schema: "solver-path-history-deep-index.v1",
    indexKind: "spacetime",
    indexLayout: "spacetime_index.v1",
    sourceStreamId: streamEntry.stream.streamId,
    builtChunkIndices: [...chunkIndices],
    rowCount: indexResponse.rows.length,
    overflowEntryCount: indexResponse.overflowEntryCount,
    byteLength: indexBuffer?.byteLength ?? 0,
    checksum,
    options,
  };
  streamEntry.deepIndexes.push(deepCloneJson(artifact));
  return artifact;
}

function createDefaultLifecycleDeepIndexOptions(streamEntry) {
  const ranges = streamEntry.stream.availableRanges ?? [];
  const timeSpan = ranges.reduce((span, range) => {
    const start = range.timeRange?.start;
    const end = range.timeRange?.end;
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      return span;
    }
    return Math.max(span, Math.abs(end - start));
  }, 0);
  return {
    spatialCellSize: 1,
    timeBinSize: Math.max(1, timeSpan || 1),
    maxCellsPerItem: 16,
  };
}

function applyLifecycleCleanupIfRequested(state, streamEntry, plan, requested) {
  const plannedDeleteChunkCount = plan.decisions.filter((decision) => decision.action === "delete").length;
  const base = {
    schema: "solver-path-history-storage-lifecycle-cleanup.v1",
    requested,
    deletedStream: false,
    releasedStream: false,
    deletedNativeFileStream: false,
    plannedDeleteChunkCount,
    skippedReason: requested ? "not_all_chunks_planned_delete" : "not_requested",
  };
  if (!requested) {
    return base;
  }
  if (plan.decisions.length === 0) {
    return {
      ...base,
      skippedReason: "no_chunks",
    };
  }
  const allChunksPlanDelete = plannedDeleteChunkCount === plan.decisions.length;
  if (!allChunksPlanDelete) {
    return base;
  }
  const deletedNativeFileStream = cleanupNativeFileStreamEntry(streamEntry);
  state.streams.delete(streamEntry.stream.streamId);
  return {
    ...base,
    deletedStream: true,
    releasedStream: true,
    deletedNativeFileStream,
    skippedReason: "none",
  };
}

function rewriteNativeFileStreamManifestIfNeeded(streamEntry) {
  const storagePolicy = streamEntry.stream.storagePolicy;
  if (storagePolicy?.target !== "native-file") {
    return false;
  }
  requireNonemptyString(storagePolicy.manifestPath, "stream.storagePolicy.manifestPath");
  const { fs, path } = requireNativeFileStorageModules();
  writeNativeFileStreamManifest(
    {
      fs,
      path,
      basePath: storagePolicy.basePath,
      streamPath: storagePolicy.streamPath,
      indexPath: storagePolicy.indexPath,
      manifestPath: storagePolicy.manifestPath,
    },
    streamEntry.stream,
    streamEntry.buffers,
    buildStreamIndexDescription(streamEntry)
  );
  return true;
}

function summarizePathHistoryStorageLifecycle(chunks, decisions) {
  const chunksByIndex = new Map(chunks.map((chunk) => [chunk.chunkIndex, chunk]));
  const tierCounts = createLifecycleCountRecord(["active", "warm", "cold", "deleted", "unknown"]);
  const actionCounts = createLifecycleCountRecord([
    "keep_active",
    "spill_warm",
    "archive_cold",
    "build_deep_index",
    "delete",
    "blocked_unsafe",
    "unknown",
  ]);
  const bytesByTier = createLifecycleCountRecord(["active", "warm", "cold", "deleted", "unknown"]);
  let totalBytes = 0;
  let safeToAgeOutCount = 0;
  let unsafeToAgeOutCount = 0;
  let deepIndexRequiredCount = 0;
  const deepIndexQueueChunkIndices = [];
  const unsafeToAgeOutChunkIndices = [];

  decisions.forEach((decision) => {
    const chunk = chunksByIndex.get(decision.chunkIndex);
    const byteLength = chunk?.byteLength ?? 0;
    const tier = Object.hasOwn(tierCounts, decision.tier) ? decision.tier : "unknown";
    const action = Object.hasOwn(actionCounts, decision.action) ? decision.action : "unknown";
    totalBytes += byteLength;
    tierCounts[tier] += 1;
    actionCounts[action] += 1;
    bytesByTier[tier] += byteLength;
    if (decision.safeToAgeOut) {
      safeToAgeOutCount += 1;
    } else {
      unsafeToAgeOutCount += 1;
      unsafeToAgeOutChunkIndices.push(decision.chunkIndex);
    }
    if (decision.requiresDeepIndex) {
      deepIndexRequiredCount += 1;
      deepIndexQueueChunkIndices.push(decision.chunkIndex);
    }
  });

  return {
    schema: "solver-path-history-storage-lifecycle-summary.v1",
    totalChunkCount: decisions.length,
    totalBytes,
    tierCounts,
    actionCounts,
    bytesByTier,
    safeToAgeOutCount,
    unsafeToAgeOutCount,
    deepIndexRequiredCount,
    deepIndexQueueChunkIndices,
    unsafeToAgeOutChunkIndices,
  };
}

function createLifecycleCountRecord(keys) {
  return Object.fromEntries(keys.map((key) => [key, 0]));
}

function normalizePathHistoryStorageLifecycleRequest(state, request) {
  validatePathHistoryStorageLifecycleRequest(request);
  let streamId = request.streamId;
  let chunks;
  if (request.chunks) {
    chunks = request.chunks.map((chunk, index) => normalizePathHistoryChunkRow(chunk, `chunks[${index}]`));
  } else {
    const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
    streamId = streamEntry.stream.streamId;
    chunks = derivePathHistoryLifecycleChunksFromStream(streamEntry);
  }
  return {
    streamId,
    policy: normalizeStorageLifecyclePolicy(request.policy),
    chunks,
  };
}

function validatePathHistoryStorageLifecycleRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.streamId != null) {
    requireNonemptyString(request.streamId, "streamId");
  }
  if (request.manifestPath != null) {
    requireNonemptyString(request.manifestPath, "manifestPath");
  }
  if (request.chunks == null && request.streamId == null && request.manifestPath == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle requires chunks, streamId, or manifestPath", {
        recoverable: false,
      })
    );
  }
  if (request.chunks != null) {
    requireArray(request.chunks, "chunks");
  }
  if (!request.policy || typeof request.policy !== "object" || Array.isArray(request.policy)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle policy is required", {
        recoverable: false,
      })
    );
  }
}

function normalizeStorageLifecyclePolicy(policy) {
  const activeWindow = policy.activeWindow;
  if (activeWindow != null) {
    validateRange(activeWindow, "policy.activeWindow");
  }
  [
    "deepIndexEnabled",
    "exportRequested",
    "failedRun",
    "deleteRequested",
  ].forEach((key) => {
    if (policy[key] != null && typeof policy[key] !== "boolean") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `policy.${key} must be boolean`, {
          recoverable: false,
        })
      );
    }
  });
  if (policy.activeMemoryBudgetBytes != null) {
    requireSafeUint64(policy.activeMemoryBudgetBytes, "policy.activeMemoryBudgetBytes");
  }
  if (policy.storageBudgetBytes != null) {
    requireSafeUint64(policy.storageBudgetBytes, "policy.storageBudgetBytes");
  }
  return {
    activeWindow: activeWindow ? { ...activeWindow } : undefined,
    deepIndexEnabled: policy.deepIndexEnabled ?? false,
    exportRequested: policy.exportRequested ?? false,
    failedRun: policy.failedRun ?? false,
    deleteRequested: policy.deleteRequested ?? false,
    activeMemoryBudgetBytes: policy.activeMemoryBudgetBytes ?? 0,
    storageBudgetBytes: policy.storageBudgetBytes ?? 0,
  };
}

function normalizePathHistoryChunkRow(chunk, label) {
  if (!chunk || typeof chunk !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  const timeRange = chunk.timeRange ?? { start: chunk.timeStart, end: chunk.timeEnd };
  const frameRange = chunk.frameRange ?? { start: chunk.frameStart, end: chunk.frameEnd };
  const byteRange = chunk.byteRange ?? {
    start: chunk.byteOffset,
    end: chunk.byteOffset + chunk.byteLength,
  };
  const bounds = chunk.bounds == null ? undefined : normalizeSpaceTimeBounds(chunk.bounds, `${label}.bounds`);
  validateRange(timeRange, `${label}.timeRange`);
  validateRange(frameRange, `${label}.frameRange`);
  validateRange(byteRange, `${label}.byteRange`);
  [
    "chunkIndex",
    "pathKeyStart",
    "pathKeyEnd",
    "rowOffset",
    "rowCount",
  ].forEach((key) => requireSafeUint64(chunk[key], `${label}.${key}`));
  if (chunk.pathKeyEnd < chunk.pathKeyStart) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.pathKeyEnd must be >= pathKeyStart`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(byteRange.start, `${label}.byteRange.start`);
  requireSafeUint64(byteRange.end, `${label}.byteRange.end`);
  if (chunk.stateFlags != null) {
    requireUint32(chunk.stateFlags, `${label}.stateFlags`);
  }
  return {
    chunkIndex: chunk.chunkIndex,
    pathKeyStart: chunk.pathKeyStart,
    pathKeyEnd: chunk.pathKeyEnd,
    rowOffset: chunk.rowOffset,
    rowCount: chunk.rowCount,
    frameStart: frameRange.start,
    frameEnd: frameRange.end,
    timeStart: timeRange.start,
    timeEnd: timeRange.end,
    bounds,
    byteOffset: byteRange.start,
    byteLength: byteRange.end - byteRange.start,
    checksum64: normalizeChecksum64(chunk.checksum64 ?? 0),
    stateFlags: chunk.stateFlags ?? 0,
  };
}

function derivePathHistoryLifecycleChunksFromStream(streamEntry) {
  return streamEntry.buffers.map((descriptor, chunkIndex) => {
    const buffer = getBufferDescriptorArrayBuffer(descriptor);
    if (descriptor.layout !== "path_segment.v1" || !buffer || descriptor.rowCount === 0) {
      const range = streamEntry.stream.availableRanges[chunkIndex];
      return normalizePathHistoryChunkRow(
        {
          chunkIndex,
          pathKeyStart: 0,
          pathKeyEnd: 0,
          rowOffset: 0,
          rowCount: descriptor.rowCount ?? 0,
          timeRange: range?.timeRange ?? { start: 0, end: 0 },
          frameRange: range?.frameRange ?? { start: 0, end: 0 },
          bounds: range?.bounds,
          byteRange: range?.byteRange ?? { start: descriptor.byteOffset ?? 0, end: descriptor.byteLength ?? 0 },
          checksum64: descriptor.checksum ?? 0,
          stateFlags: 0,
        },
        `streamChunks[${chunkIndex}]`
      );
    }
    const rows = [];
    const rowSize = descriptor.byteLength / descriptor.rowCount;
    const view = new DataView(buffer);
    for (let rowOffset = 0; rowOffset < descriptor.rowCount; rowOffset += 1) {
      rows.push(readPathHistoryRowFromView(view, rowOffset * rowSize, chunkIndex, rowOffset));
    }
    const pathKeys = rows.map((row) => row.pathKey);
    const range = streamEntry.stream.availableRanges[chunkIndex];
    const rowSummary = summarizePathHistoryRows(rows);
    return normalizePathHistoryChunkRow(
      {
        chunkIndex,
        pathKeyStart: Math.min(...pathKeys),
        pathKeyEnd: Math.max(...pathKeys),
        rowOffset: rows[0]?.rowOffset ?? 0,
        rowCount: rows.length,
        timeRange: range?.timeRange ?? rowSummary.timeRange,
        frameRange: range?.frameRange ?? rowSummary.frameRange,
        bounds: range?.bounds ?? rowSummary.bounds,
        byteRange: range?.byteRange ?? {
          start: descriptor.byteOffset ?? 0,
          end: (descriptor.byteOffset ?? 0) + descriptor.byteLength,
        },
        checksum64: descriptor.checksum ?? 0,
        stateFlags: rows.reduce((flags, row) => flags | (row.stateFlags ?? 0), 0),
      },
      `streamChunks[${chunkIndex}]`
    );
  });
}

function normalizeChecksum64(value) {
  if (typeof value === "bigint") {
    if (value < 0n) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "checksum64 must be nonnegative", {
          recoverable: false,
        })
      );
    }
    return value;
  }
  if (typeof value === "string") {
    const text = value.startsWith("0x") ? value : `0x${value}`;
    return BigInt(text);
  }
  requireUint64Number(value, "checksum64");
  return BigInt(value);
}

function describeRun(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "run description request object is required", {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(request.runId, "runId");
  const response = state.runs.get(request.runId);
  if (!response) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "run not found", {
        recoverable: false,
        details: { runId: request.runId },
      })
    );
  }
  return {
    schema: "solver-run-description.v1",
    runId: response.runId,
    datasetId: response.datasetId,
    manifest: deepCloneJson(response.manifest),
    summary: deepCloneJson(response.summary),
    buffers: response.buffers.map(copyBufferDescriptorWithoutPayload),
    streams: response.streams.map(copyStreamDescriptor),
    precision: response.precision == null ? undefined : deepCloneJson(response.precision),
    diagnostics: response.diagnostics.map(deepCloneJson),
    status: createStatus("ok", "ok", "run description read", {
      runId: response.runId,
    }),
  };
}

function cancelRun(state, request = {}) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "run cancellation request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.runId != null) {
    requireNonemptyString(request.runId, "runId");
  }
  if (request.requestId != null) {
    requireNonemptyString(request.requestId, "requestId");
  }
  const response = findRunResponseForCancellation(state, request);
  const releaseStreams = request.releaseStreams === true;
  const releaseSummary = response && releaseStreams
    ? releaseRunStreams(state, response.runId)
    : { releasedStreamCount: 0, deletedNativeFileStreamCount: 0 };
  const status = createStatus(
    "cancelled",
    "info",
    request.reason || "run cancellation acknowledged",
    {
      runId: response?.runId ?? request.runId,
      requestId: response?.manifest?.requestId ?? request.requestId,
      details: {
        matchedRun: Boolean(response),
        releaseStreams,
        releaseSummary,
      },
    }
  );

  if (response) {
    applyRunCancellationStatus(response, status);
  }
  return status;
}

function findRunResponseForCancellation(state, request) {
  if (request.runId != null) {
    return state.runs.get(request.runId) ?? null;
  }
  if (request.requestId != null) {
    for (const response of state.runs.values()) {
      if (response.manifest?.requestId === request.requestId) {
        return response;
      }
    }
  }
  return null;
}

function applyRunCancellationStatus(response, status) {
  const runStatus = copyStatusRecord(status);
  response.status = runStatus;
  if (response.summary) {
    response.summary = {
      ...response.summary,
      status: copyStatusRecord(status),
    };
  }
  response.diagnostics = [
    ...response.diagnostics,
    toDiagnosticRecord(status),
  ];
  response.manifest = finalizeRunManifest(response.manifest, response);
}

function describeStream(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream description request object is required", {
        recoverable: false,
      })
    );
  }
  validateStreamIdOrManifestPathRequest(request, "stream description request");
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  return {
    schema: "solver-stream-description.v1",
    stream: copyStreamDescriptor(streamEntry.stream),
    buffers: streamEntry.buffers.map(copyBufferDescriptorWithoutPayload),
    index: buildStreamIndexDescription(streamEntry),
    status: createStatus("ok", "ok", "stream description read", {
      details: {
        streamId: streamEntry.stream.streamId,
      },
    }),
  };
}

function validatePathHistoryDynamicReplayF64(state, module, request, abiInfo) {
  validatePathHistoryDynamicReplayValidationRequest(request);
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const streamId = streamEntry.stream.streamId;
  const dynamicReplay = streamEntry.stream.metadata?.dynamicReplay;
  if (!dynamicReplay) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history stream has no dynamic replay metadata", {
        recoverable: false,
        details: { streamId },
      })
    );
  }

  const replay = normalizePathHistoryDynamicReplayMetadata(dynamicReplay);
  const selection = selectStreamRanges(streamEntry, { streamId });
  const actualRowCount = selection.items.reduce((sum, item) => sum + item.rowCount, 0);
  const maxRows = request.maxRows ?? DEFAULT_MAX_MOTION_PATH_ROWS;
  if (actualRowCount > maxRows) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "path-history replay validation exceeds maxRows", {
        recoverable: true,
        details: { streamId, actualRowCount, maxRows },
      })
    );
  }

  const actualRows = decodePathHistoryRowsFromStreamSelection(selection.items);
  const expectedRows = regeneratePathHistoryRowsFromDynamicReplay(module, replay, abiInfo, maxRows);
  if (expectedRows.length > maxRows) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "path-history replay regeneration exceeds maxRows", {
        recoverable: true,
        details: { streamId, expectedRowCount: expectedRows.length, maxRows },
      })
    );
  }

  const tolerance = request.tolerance ?? 0;
  const comparison = comparePathHistoryRowsForDynamicReplay(actualRows, expectedRows, tolerance);
  const status = comparison.matched
    ? createStatus("ok", "ok", "path-history dynamic replay matched", {
        details: {
          streamId,
          replayKind: replay.replayKind,
          actualRowCount: actualRows.length,
          expectedRowCount: expectedRows.length,
        },
      })
    : createStatus("validation_replay_mismatch", "error", "path-history dynamic replay mismatch", {
        recoverable: false,
        details: {
          streamId,
          replayKind: replay.replayKind,
          mismatchCount: comparison.mismatchCount,
          firstMismatch: comparison.firstMismatch,
        },
      });

  return {
    schema: "solver-path-history-dynamic-replay-validation.v1",
    streamId,
    replayKind: replay.replayKind,
    tolerance,
    actualRowCount: actualRows.length,
    expectedRowCount: expectedRows.length,
    selectedRangeCount: selection.items.length,
    selectedByteLength: selection.items.reduce((sum, item) => sum + item.buffer.byteLength, 0),
    matched: comparison.matched,
    mismatchCount: comparison.mismatchCount,
    maxTimeDifference: comparison.maxTimeDifference,
    maxPositionDifference: comparison.maxPositionDifference,
    maxVelocityDifference: comparison.maxVelocityDifference,
    maxErrorBoundDifference: comparison.maxErrorBoundDifference,
    firstMismatch: comparison.firstMismatch,
    diagnostics: selection.diagnostics,
    status,
  };
}

function validatePathHistoryDynamicReplayValidationRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history dynamic replay request object is required", {
        recoverable: false,
      })
    );
  }
  validateStreamIdOrManifestPathRequest(request, "path-history dynamic replay validation");
  if (request.tolerance != null) {
    requireNonnegativeFiniteNumber(request.tolerance, "tolerance");
  }
  if (request.maxRows != null) {
    requirePositiveInteger(request.maxRows, "maxRows");
  }
}

function regeneratePathHistoryRowsFromDynamicReplay(module, replay, abiInfo, maxRows) {
  if (replay.replayKind === "linear-motion-sample") {
    return sampleLinearPathHistoryF64WithModule(module, replay.motionRequest, abiInfo).pathRows;
  }
  if (replay.replayKind === "constant-acceleration-motion-integration") {
    return integrateConstantAccelerationPathHistoryF64WithModule(
      module,
      replay.motionIntegrationRequest,
      abiInfo,
      { maxRows }
    ).pathRows;
  }
  if (replay.replayKind === "pair-interaction-path-integration") {
    return solvePairInteractionPathF64(replay.pairInteractionRequest, {
      module,
      abiInfo,
    }).pathRows;
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "path-history dynamic replay kind is invalid", {
      recoverable: false,
    })
  );
}

function comparePathHistoryRowsForDynamicReplay(actualRows, expectedRows, tolerance) {
  let mismatchCount = actualRows.length === expectedRows.length ? 0 : 1;
  let firstMismatch =
    actualRows.length === expectedRows.length
      ? null
      : {
          rowIndex: Math.min(actualRows.length, expectedRows.length),
          field: "rowCount",
          actual: actualRows.length,
          expected: expectedRows.length,
          difference: Math.abs(actualRows.length - expectedRows.length),
        };
  let maxTimeDifference = 0;
  let maxPositionDifference = 0;
  let maxVelocityDifference = 0;
  let maxErrorBoundDifference = 0;
  const sharedRowCount = Math.min(actualRows.length, expectedRows.length);

  const noteMismatch = (rowIndex, field, actual, expected, difference) => {
    mismatchCount += 1;
    if (!firstMismatch) {
      firstMismatch = { rowIndex, field, actual, expected, difference };
    }
  };

  for (let index = 0; index < sharedRowCount; index += 1) {
    const actual = actualRows[index];
    const expected = expectedRows[index];
    if (actual.pathKey !== expected.pathKey) {
      noteMismatch(
        index,
        "pathKey",
        actual.pathKey,
        expected.pathKey,
        Math.abs(actual.pathKey - expected.pathKey)
      );
    }
    if (actual.segmentIndex !== expected.segmentIndex) {
      noteMismatch(
        index,
        "segmentIndex",
        actual.segmentIndex,
        expected.segmentIndex,
        Math.abs(actual.segmentIndex - expected.segmentIndex)
      );
    }
    if ((actual.stateFlags ?? 0) !== (expected.stateFlags ?? 0)) {
      noteMismatch(
        index,
        "stateFlags",
        actual.stateFlags ?? 0,
        expected.stateFlags ?? 0,
        Math.abs((actual.stateFlags ?? 0) - (expected.stateFlags ?? 0))
      );
    }

    const startDiff = Math.abs(actual.startTime - expected.startTime);
    const endDiff = Math.abs(actual.endTime - expected.endTime);
    maxTimeDifference = Math.max(maxTimeDifference, startDiff, endDiff);
    if (startDiff > tolerance) {
      noteMismatch(index, "startTime", actual.startTime, expected.startTime, startDiff);
    }
    if (endDiff > tolerance) {
      noteMismatch(index, "endTime", actual.endTime, expected.endTime, endDiff);
    }

    for (const axis of ["x", "y", "z"]) {
      const positionDiff = Math.abs(actual.start[axis] - expected.start[axis]);
      maxPositionDifference = Math.max(maxPositionDifference, positionDiff);
      if (positionDiff > tolerance) {
        noteMismatch(
          index,
          `start.${axis}`,
          actual.start[axis],
          expected.start[axis],
          positionDiff
        );
      }
      const velocityDiff = Math.abs(actual.velocity[axis] - expected.velocity[axis]);
      maxVelocityDifference = Math.max(maxVelocityDifference, velocityDiff);
      if (velocityDiff > tolerance) {
        noteMismatch(
          index,
          `velocity.${axis}`,
          actual.velocity[axis],
          expected.velocity[axis],
          velocityDiff
        );
      }
    }

    const errorBoundDiff = Math.abs((actual.errorBound ?? 0) - (expected.errorBound ?? 0));
    maxErrorBoundDifference = Math.max(maxErrorBoundDifference, errorBoundDiff);
    if (errorBoundDiff > tolerance) {
      noteMismatch(
        index,
        "errorBound",
        actual.errorBound ?? 0,
        expected.errorBound ?? 0,
        errorBoundDiff
      );
    }
  }

  return {
    matched: mismatchCount === 0,
    mismatchCount,
    firstMismatch,
    maxTimeDifference,
    maxPositionDifference,
    maxVelocityDifference,
    maxErrorBoundDifference,
  };
}

function queryEmissionShellCandidatesF64(state, request, module = null, abiInfo = defaultAbiInfo()) {
  validateEmissionShellCandidateRequest(request);
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const sourceKeySet = request.sourcePathKeys == null ? null : new Set(request.sourcePathKeys);
  const receiverKeySet = request.receiverPathKeys == null ? null : new Set(request.receiverPathKeys);
  const sourceChunkSet =
    request.sourceChunkIndices == null
      ? null
      : normalizeChunkIndexSelection(request.sourceChunkIndices, "sourceChunkIndices");
  const receiverChunkSet =
    request.receiverChunkIndices == null
      ? null
      : normalizeChunkIndexSelection(request.receiverChunkIndices, "receiverChunkIndices");
  const { sourceRows, receiverRows, scanMetrics } = readEmissionShellPathHistoryRowsFromStream(
    streamEntry,
    sourceKeySet,
    receiverKeySet,
    sourceChunkSet,
    receiverChunkSet,
    request.timeRange
  );
  const tolerance = request.tolerance ?? 0;
  const maxCandidates = request.maxCandidates ?? 4096;
  const indexOptions = validateOptionalEmissionShellIndexOptions(request.indexOptions, "indexOptions");
  if (
    indexOptions &&
    module &&
    typeof module?._architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64 !== "function"
  ) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "indexed emission-shell broad-phase C ABI export is unavailable",
        {
          recoverable: false,
          stage: "emission_shell_candidates",
          details: { strategy: indexOptions.strategy },
        }
      )
    );
  }
  if (
    indexOptions &&
    typeof module?._architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64 === "function"
  ) {
    return queryEmissionShellCandidatesF64WithIndexedModule(
      module,
      streamEntry.stream.streamId,
      request,
      sourceRows,
      receiverRows,
      tolerance,
      maxCandidates,
      scanMetrics,
      indexOptions,
      abiInfo
    );
  }
  if (typeof module?._architrino_solver_query_emission_shell_broad_phase_f64 === "function") {
    return queryEmissionShellCandidatesF64WithModule(
      module,
      streamEntry.stream.streamId,
      request,
      sourceRows,
      receiverRows,
      tolerance,
      maxCandidates,
      scanMetrics,
      abiInfo
    );
  }
  const candidates = [];
  const candidateBufferRows = [];
  const narrowPhaseRows = [];
  let pairCount = 0;
  let rejectedPairCount = 0;
  let truncated = false;

  for (let sourceIndex = 0; sourceIndex < sourceRows.length; sourceIndex += 1) {
    const source = sourceRows[sourceIndex];
    for (let receiverIndex = 0; receiverIndex < receiverRows.length; receiverIndex += 1) {
      const receiver = receiverRows[receiverIndex];
      if (!request.allowSamePath && source.pathKey === receiver.pathKey) {
        continue;
      }
      if (request.timeRange && !pathHistoryPairOverlapsTimeRange(source, receiver, request.timeRange)) {
        continue;
      }
      pairCount += 1;
      const candidate = classifyEmissionShellCandidate(source, receiver, request.signalSpeed, tolerance);
      if (!candidate) {
        rejectedPairCount += 1;
        continue;
      }
      candidate.narrowPhaseEstimate = estimateEmissionShellNarrowPhase(
        source,
        receiver,
        request.signalSpeed,
        tolerance
      );
      candidateBufferRows.push({
        ...candidate,
        sourceRowIndex: sourceIndex,
        receiverRowIndex: receiverIndex,
      });
      narrowPhaseRows.push(candidate.narrowPhaseEstimate);
      candidates.push(candidate);
      if (candidates.length >= maxCandidates) {
        truncated = true;
        break;
      }
    }
    if (truncated) {
      break;
    }
  }
  const falsePositiveEstimate = summarizeEmissionShellFalsePositiveEstimate(candidates);
  const buffers = createEmissionShellCandidateBuffers(candidateBufferRows, narrowPhaseRows);
  const scanSummary = createEmissionShellScanSummary({
    executionPath: "javascript_fallback",
    scanMetrics,
    pairCount,
    rejectedPairCount,
    candidateCount: candidates.length,
    buffers,
    truncated,
    requestedWorkerCount: request.workerCount ?? 0,
    plannedWorkerCount: 1,
  });

  return {
    schema: "solver-emission-shell-candidates.v1",
    streamId: streamEntry.stream.streamId,
    signalSpeed: request.signalSpeed,
    tolerance,
    pairCount,
    rejectedPairCount,
    candidateCount: candidates.length,
    rejectionRate: pairCount === 0 ? 0 : rejectedPairCount / pairCount,
    candidateRate: pairCount === 0 ? 0 : candidates.length / pairCount,
    falsePositiveEstimate,
    scanSummary,
    truncated,
    candidates,
    buffers,
    status: createStatus(
      truncated ? "stream_memory_pressure" : "ok",
      truncated ? "warning" : "ok",
      truncated
        ? "emission-shell broad-phase candidates truncated"
        : "emission-shell broad-phase candidates computed",
      {
        details: {
          streamId: streamEntry.stream.streamId,
          pairCount,
          rejectedPairCount,
          candidateCount: candidates.length,
          estimatedFalsePositiveCount: falsePositiveEstimate.estimatedFalsePositiveCount,
          maxCandidates,
          scanSummary,
        },
      }
    ),
  };
}

function queryEmissionShellCandidatePacketF64(state, request, module = null, abiInfo = defaultAbiInfo()) {
  validateEmissionShellCandidatePacketRequest(request);
  const preparedPacket = prepareWorkPacketHeader(request.packet);
  if (preparedPacket.status.code !== "ok") {
    throw new SolverBridgeError(
      createStatus(
        preparedPacket.status.code,
        preparedPacket.status.severity,
        "emission-shell packet query rejected invalid work packet",
        {
          recoverable: false,
          stage: "work_packet",
          details: {
            packetId: preparedPacket.packet.packetId,
            diagnosticCount: preparedPacket.diagnostics.length,
          },
        }
      )
    );
  }
  const packet = preparedPacket.packet;
  const timeRange = intersectOptionalPacketQueryTimeRange(packet.timeRange, request.timeRange);
  const response = queryEmissionShellCandidatesF64(
    state,
    {
      streamId: request.streamId,
      manifestPath: request.manifestPath,
      signalSpeed: request.signalSpeed,
      tolerance: request.tolerance,
      maxCandidates: request.maxCandidates,
      sourcePathKeys: request.sourcePathKeys,
      receiverPathKeys: request.receiverPathKeys,
      sourceChunkIndices: expandWorkPacketChunkRange(packet.sourceBlock, "packet.sourceBlock"),
      receiverChunkIndices: expandWorkPacketChunkRange(packet.receiverBlock, "packet.receiverBlock"),
      allowSamePath: request.allowSamePath,
      workerCount: request.workerCount,
      indexOptions: request.indexOptions,
      timeRange,
    },
    module,
    abiInfo
  );
  const buffers = createPacketScopedOutputBuffers(packet.packetId, response.buffers);
  const packetResult = createWorkPacketResultRef(packet, buffers);
  return {
    ...response,
    packetId: packet.packetId,
    packetMergeOrder: packet.mergeOrder,
    packetMergeKey: packet.mergeKey,
    buffers,
    packetResult,
  };
}

function queryEmissionShellCandidatePacketsF64(state, request, module = null, abiInfo = defaultAbiInfo()) {
  validateEmissionShellCandidatePacketsRequest(request);
  const responses = request.packets.map((packet) =>
    queryEmissionShellCandidatePacketF64(
      state,
      {
        streamId: request.streamId,
        manifestPath: request.manifestPath,
        packet,
        signalSpeed: request.signalSpeed,
        tolerance: request.tolerance,
        maxCandidates: request.maxCandidatesPerPacket,
        sourcePathKeys: request.sourcePathKeys,
        receiverPathKeys: request.receiverPathKeys,
        allowSamePath: request.allowSamePath,
        workerCount: request.workerCount,
        indexOptions: request.indexOptions,
        timeRange: request.timeRange,
      },
      module,
      abiInfo
    )
  );
  const merged = mergeEmissionShellCandidatePacketResponsesF64({ responses });
  return {
    ...merged,
    status: createStatus(
      merged.truncated ? "stream_memory_pressure" : "ok",
      merged.truncated ? "warning" : "ok",
      merged.truncated
        ? "emission-shell packet batch query merged with truncation"
        : "emission-shell packet batch query merged",
      {
        stage: "work_packet",
        details: {
          streamId: merged.streamId ?? request.streamId,
          packetCount: request.packets.length,
          pairCount: merged.pairCount,
          rejectedPairCount: merged.rejectedPairCount,
          candidateCount: merged.candidateCount,
        },
      }
    ),
  };
}

function refineEmissionShellCandidateRootsF64(state, module, request, abiInfo) {
  validateEmissionShellRootRefinementRequest(request);
  const preparedPacket = request.packet == null ? null : prepareWorkPacketHeader(request.packet);
  if (preparedPacket && preparedPacket.status.code !== "ok") {
    throw new SolverBridgeError(
      createStatus(
        preparedPacket.status.code,
        preparedPacket.status.severity,
        "emission-shell root-refinement rejected invalid work packet",
        {
          recoverable: false,
          stage: "work_packet",
          details: {
            packetId: preparedPacket.packet.packetId,
            diagnosticCount: preparedPacket.diagnostics.length,
          },
        }
      )
    );
  }
  const packet = preparedPacket?.packet ?? null;
  if (packet) {
    validateEmissionShellRootRefinementPacket(packet, request.candidates);
  }
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const maxCandidates = request.maxCandidates ?? request.candidates.length;
  const maxRootsPerCandidate = request.maxRootsPerCandidate ?? Math.max(DEFAULT_MAX_CAUSAL_ROOTS, 128);
  const maxHitsPerCandidate = request.maxHitsPerCandidate ?? maxRootsPerCandidate;
  const items = [];
  const attempted = [];
  let attemptedCandidateCount = 0;
  let skippedCandidateCount = 0;
  let truncated = false;

  for (let candidateIndex = 0; candidateIndex < request.candidates.length; candidateIndex += 1) {
    if (items.length >= maxCandidates) {
      truncated = true;
      break;
    }
    const candidate = request.candidates[candidateIndex];
    const estimate = candidate.narrowPhaseEstimate;
    if (
      estimate.classification !== "sampled_hit" ||
      !Number.isFinite(estimate.hitTime) ||
      !Number.isFinite(estimate.emissionTime)
    ) {
      skippedCandidateCount += 1;
      items.push(
        createEmissionShellRootRefinementSkippedItem(candidateIndex, candidate, 0, 0)
      );
      continue;
    }

    const source = readCandidatePathHistoryRow(streamEntry, candidate, "source", candidateIndex);
    const receiver = readCandidatePathHistoryRow(streamEntry, candidate, "receiver", candidateIndex);
    assertCandidatePathHistoryRowMatches(source, candidate, "source", candidateIndex);
    assertCandidatePathHistoryRowMatches(receiver, candidate, "receiver", candidateIndex);

    const rootRequest = {
      source: pathHistoryRowToCausalSegment(source),
      receiver: pathHistoryRowToCausalSegment(receiver),
      hitTime: estimate.hitTime,
      signalSpeed: request.signalSpeed,
      rootTolerance: request.rootTolerance ?? request.tolerance ?? undefined,
      maxIterations: request.maxIterations,
      scanSubdivisions: request.scanSubdivisions,
    };
    attemptedCandidateCount += 1;
    items.push(null);
    attempted.push({
      itemSlot: items.length - 1,
      candidateIndex,
      candidate,
      estimate,
      rootRequest,
    });
  }

  const batchResponse = attempted.length === 0
    ? {
        items: [],
        roots: [],
        hits: [],
        buffers: [
          createBufferDescriptor(
            "emission-shell-refined-root-ledger",
            "root_ledger.v1",
            0,
            abiInfo.rootRowF64Bytes,
            new ArrayBuffer(0)
          ),
          createBufferDescriptor(
            "emission-shell-refined-delayed-hits",
            "delayed_hit_events.v1",
            0,
            abiInfo.delayedHitRowF64Bytes,
            new ArrayBuffer(0)
          ),
        ],
      }
    : solveRootsAndHitsBatchF64WithModule(
        module,
        {
          requests: attempted.map((entry) => entry.rootRequest),
          maxItems: attempted.length,
          maxRoots: attempted.length * Math.min(maxRootsPerCandidate, maxHitsPerCandidate),
          maxHits: attempted.length * Math.min(maxRootsPerCandidate, maxHitsPerCandidate),
          workerCount: request.workerCount ?? 0,
        },
        abiInfo
      );
  const roots = batchResponse.roots;
  const hits = batchResponse.hits;
  const rootBuffer = {
    ...findResponseBufferDescriptor(batchResponse, "root_ledger.v1"),
    bufferId: "emission-shell-refined-root-ledger",
  };
  const hitBuffer = {
    ...findResponseBufferDescriptor(batchResponse, "delayed_hit_events.v1"),
    bufferId: "emission-shell-refined-delayed-hits",
  };
  const buffers = packet
    ? createPacketScopedOutputBuffers(packet.packetId, [rootBuffer, hitBuffer])
    : [rootBuffer, hitBuffer];
  const packetResult = packet ? createWorkPacketResultRef(packet, buffers) : null;
  for (let attemptedIndex = 0; attemptedIndex < attempted.length; attemptedIndex += 1) {
    const entry = attempted[attemptedIndex];
    const candidate = entry.candidate;
    const estimate = entry.estimate;
    const batchItem = batchResponse.items[attemptedIndex] ?? {
      rootOffset: roots.length,
      rootCount: 0,
    };
    items[entry.itemSlot] = {
      candidateIndex: entry.candidateIndex,
      sourcePathKey: candidate.sourcePathKey,
      receiverPathKey: candidate.receiverPathKey,
      sourceChunkIndex: candidate.sourceChunkIndex,
      receiverChunkIndex: candidate.receiverChunkIndex,
      sourceRowOffset: candidate.sourceRowOffset,
      receiverRowOffset: candidate.receiverRowOffset,
      hitTime: estimate.hitTime,
      sampledEmissionTime: estimate.emissionTime,
      rootOffset: batchItem.rootOffset,
      rootCount: batchItem.rootCount,
      hitOffset: batchItem.rootOffset,
      hitCount: batchItem.rootCount,
      status: createStatus(
        batchItem.rootCount > 0 ? "ok" : "causal_root_not_found",
        batchItem.rootCount > 0 ? "ok" : "warning",
        batchItem.rootCount > 0
          ? "emission-shell candidate root refined"
          : "emission-shell candidate produced no exact fixed-hit root",
        {
          details: {
            candidateIndex: entry.candidateIndex,
            sourcePathKey: candidate.sourcePathKey,
            receiverPathKey: candidate.receiverPathKey,
            hitTime: estimate.hitTime,
            sampledEmissionTime: estimate.emissionTime,
          },
        }
      ),
    };
  }
  return {
    schema: "solver-emission-shell-root-refinement.v1",
    ...(packet
      ? {
          packetId: packet.packetId,
          packetMergeOrder: packet.mergeOrder,
          packetMergeKey: packet.mergeKey,
          packetResult,
        }
      : {}),
    streamId: streamEntry.stream.streamId,
    signalSpeed: request.signalSpeed,
    tolerance: request.tolerance ?? 0,
    candidateCount: request.candidates.length,
    processedCandidateCount: items.length,
    attemptedCandidateCount,
    skippedCandidateCount,
    rootCount: roots.length,
    hitCount: hits.length,
    truncated,
    items,
    roots,
    hits,
    buffers,
    status: createStatus(
      truncated ? "stream_memory_pressure" : skippedCandidateCount > 0 ? "candidate_refinement_partial" : "ok",
      truncated || skippedCandidateCount > 0 ? "warning" : "ok",
      truncated
        ? "emission-shell root refinement truncated"
        : skippedCandidateCount > 0
          ? "emission-shell root refinement completed with skipped candidates"
          : "emission-shell root refinement completed",
      {
        details: {
          streamId: streamEntry.stream.streamId,
          candidateCount: request.candidates.length,
          processedCandidateCount: items.length,
          attemptedCandidateCount,
          skippedCandidateCount,
          rootCount: roots.length,
          hitCount: hits.length,
          maxCandidates,
          maxRootsPerCandidate,
          maxHitsPerCandidate,
          workerCount: request.workerCount ?? 0,
        },
      }
    ),
  };
}

function createEmissionShellRootRefinementSkippedItem(candidateIndex, candidate, rootOffset, hitOffset) {
  return {
    candidateIndex,
    sourcePathKey: candidate.sourcePathKey,
    receiverPathKey: candidate.receiverPathKey,
    sourceChunkIndex: candidate.sourceChunkIndex,
    receiverChunkIndex: candidate.receiverChunkIndex,
    sourceRowOffset: candidate.sourceRowOffset,
    receiverRowOffset: candidate.receiverRowOffset,
    hitTime: null,
    sampledEmissionTime: null,
    rootOffset,
    rootCount: 0,
    hitOffset,
    hitCount: 0,
    status: createStatus(
      "candidate_refinement_skipped",
      "warning",
      "emission-shell candidate has no sampled hit to refine",
      {
        recoverable: true,
        details: {
          candidateIndex,
          sourcePathKey: candidate.sourcePathKey,
          receiverPathKey: candidate.receiverPathKey,
        },
      }
    ),
  };
}

function readCandidatePathHistoryRow(streamEntry, candidate, role, candidateIndex) {
  const chunkIndex = role === "source" ? candidate.sourceChunkIndex : candidate.receiverChunkIndex;
  const rowOffset = role === "source" ? candidate.sourceRowOffset : candidate.receiverRowOffset;
  return readPathHistoryRowByChunkOffset(streamEntry, chunkIndex, rowOffset, `${role} candidate[${candidateIndex}]`);
}

function readPathHistoryRowByChunkOffset(streamEntry, chunkIndex, rowOffset, label) {
  requireSafeUint64(chunkIndex, `${label}.chunkIndex`);
  requireSafeUint64(rowOffset, `${label}.rowOffset`);
  const descriptor = streamEntry.buffers[chunkIndex];
  if (!descriptor || descriptor.layout !== "path_segment.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `${label} does not reference a path-history chunk`, {
        recoverable: false,
        details: { streamId: streamEntry.stream.streamId, chunkIndex, rowOffset },
      })
    );
  }
  const buffer = getBufferDescriptorArrayBuffer(descriptor);
  if (!buffer) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `${label} path-history chunk is not readable`, {
        recoverable: false,
        details: { streamId: streamEntry.stream.streamId, chunkIndex, rowOffset },
      })
    );
  }
  const rowSize = descriptor.byteLength / descriptor.rowCount;
  if (!Number.isInteger(rowSize) || rowSize <= 0 || rowOffset >= descriptor.rowCount) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `${label} row offset is outside the path-history chunk`, {
        recoverable: false,
        details: {
          streamId: streamEntry.stream.streamId,
          chunkIndex,
          rowOffset,
          rowCount: descriptor.rowCount,
        },
      })
    );
  }
  return readPathHistoryRowFromView(new DataView(buffer), rowOffset * rowSize, chunkIndex, rowOffset);
}

function assertCandidatePathHistoryRowMatches(row, candidate, role, candidateIndex) {
  const expectedPathKey = role === "source" ? candidate.sourcePathKey : candidate.receiverPathKey;
  const expectedSegmentIndex = role === "source" ? candidate.sourceSegmentIndex : candidate.receiverSegmentIndex;
  const expectedTimeRange = role === "source" ? candidate.sourceTimeRange : candidate.receiverTimeRange;
  if (
    row.pathKey !== expectedPathKey ||
    row.segmentIndex !== expectedSegmentIndex ||
    row.startTime !== expectedTimeRange.start ||
    row.endTime !== expectedTimeRange.end
  ) {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        `emission-shell ${role} candidate[${candidateIndex}] does not match stream row`,
        {
          recoverable: false,
          details: {
            candidateIndex,
            role,
            expectedPathKey,
            actualPathKey: row.pathKey,
            expectedSegmentIndex,
            actualSegmentIndex: row.segmentIndex,
            expectedTimeRange,
            actualTimeRange: { start: row.startTime, end: row.endTime },
          },
        }
      )
    );
  }
}

function pathHistoryRowToCausalSegment(row) {
  return {
    startTime: row.startTime,
    endTime: row.endTime,
    positionAtStart: copyVector(row.start),
    velocity: copyVector(row.velocity),
    errorBound: row.errorBound,
  };
}

function findResponseBufferDescriptor(response, layout) {
  const descriptor = response.buffers.find((buffer) => buffer.layout === layout);
  if (!descriptor) {
    throw new SolverBridgeError(
      createStatus("internal_solver_error", "halt", `solver response missing ${layout} buffer`, {
        recoverable: false,
      })
    );
  }
  return descriptor;
}

function mergeBufferDescriptors(parts, bufferId, layout, rowSizeBytes) {
  const rowCount = sumBy(parts, (part) => part.rowCount);
  const byteLength = rowCount * rowSizeBytes;
  const merged = new Uint8Array(byteLength);
  let byteOffset = 0;
  for (const part of parts) {
    if (!(part.buffer instanceof ArrayBuffer)) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `${layout} merge requires dense buffer payloads`, {
          recoverable: false,
        })
      );
    }
    if (part.byteLength !== part.rowCount * rowSizeBytes || part.buffer.byteLength !== part.byteLength) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `${layout} merge buffer size mismatch`, {
          recoverable: false,
          details: {
            bufferId: part.bufferId,
            byteLength: part.byteLength,
            rowCount: part.rowCount,
            rowSizeBytes,
            payloadByteLength: part.buffer.byteLength,
          },
        })
      );
    }
    merged.set(new Uint8Array(part.buffer), byteOffset);
    byteOffset += part.byteLength;
  }
  return createBufferDescriptor(bufferId, layout, rowCount, rowSizeBytes, merged.buffer);
}

function resolveEmissionShellNativeCandidateInput(nativeCandidate, sourceRows, receiverRows, indexSummary = null) {
  const sourceRowOffset = indexSummary?.sourceRowOffset ?? 0;
  const receiverRowOffset = indexSummary?.receiverRowOffset ?? 0;
  const sourceIndex = nativeCandidate.sourceRowIndex - sourceRowOffset;
  const receiverIndex = nativeCandidate.receiverRowIndex - receiverRowOffset;
  if (
    !Number.isInteger(sourceIndex) ||
    !Number.isInteger(receiverIndex) ||
    sourceIndex < 0 ||
    receiverIndex < 0 ||
    sourceIndex >= sourceRows.length ||
    receiverIndex >= receiverRows.length
  ) {
    throw new SolverBridgeError(
      createStatus("internal_solver_error", "halt", "emission-shell candidate row index is outside materialized rows", {
        recoverable: false,
        details: {
          sourceRowIndex: nativeCandidate.sourceRowIndex,
          receiverRowIndex: nativeCandidate.receiverRowIndex,
          sourceRowOffset,
          receiverRowOffset,
          sourceRowCount: sourceRows.length,
          receiverRowCount: receiverRows.length,
        },
      })
    );
  }
  return {
    nativeCandidate,
    source: sourceRows[sourceIndex],
    receiver: receiverRows[receiverIndex],
  };
}

function queryEmissionShellCandidatesF64WithIndexedModule(
  module,
  streamId,
  request,
  sourceRows,
  receiverRows,
  tolerance,
  maxCandidates,
  scanMetrics,
  indexOptions,
  abiInfo
) {
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const sourceRowsPtr =
    sourceRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * sourceRows.length) : 0;
  const receiverRowsPtr =
    receiverRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * receiverRows.length) : 0;
  const optionsPtr = module._malloc(abiInfo.emissionShellBroadPhaseOptionsF64Bytes);
  const indexOptionsPtr = module._malloc(EMISSION_SHELL_INDEXED_BROAD_PHASE_OPTIONS_F64_BYTES);
  const candidatesPtr =
    maxCandidates > 0 ? module._malloc(abiInfo.emissionShellCandidateRowF64Bytes * maxCandidates) : 0;
  const summaryPtr = module._malloc(abiInfo.emissionShellBroadPhaseSummaryBytes);
  const indexSummaryPtr = module._malloc(EMISSION_SHELL_INDEXED_BROAD_PHASE_SUMMARY_BYTES);
  try {
    sourceRows.forEach((row, index) => {
      writePathHistoryRowF64(module, sourceRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    receiverRows.forEach((row, index) => {
      writePathHistoryRowF64(module, receiverRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    writeEmissionShellBroadPhaseOptionsF64(module, optionsPtr, request, tolerance, maxCandidates);
    writeEmissionShellIndexedBroadPhaseOptionsF64(module, indexOptionsPtr, request, indexOptions);
    const query = module.cwrap("architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = query(
      sourceRowsPtr,
      sourceRows.length,
      receiverRowsPtr,
      receiverRows.length,
      optionsPtr,
      indexOptionsPtr,
      candidatesPtr,
      maxCandidates,
      summaryPtr,
      indexSummaryPtr
    );
    const summary = readEmissionShellBroadPhaseSummary(module, summaryPtr);
    const indexSummary = readEmissionShellIndexedBroadPhaseSummary(module, indexSummaryPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `emission-shell indexed broad-phase C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, ...summary, indexSummary },
        })
      );
    }

    const candidateInputs = [];
    for (let index = 0; index < summary.candidateCount; index += 1) {
      const nativeCandidate = readEmissionShellCandidateRowF64(
        module,
        candidatesPtr + index * abiInfo.emissionShellCandidateRowF64Bytes
      );
      candidateInputs.push(
        resolveEmissionShellNativeCandidateInput(nativeCandidate, sourceRows, receiverRows, indexSummary)
      );
    }
    const nativeNarrowPhaseEstimates =
      typeof module?._architrino_solver_estimate_emission_shell_narrow_phase_f64 === "function"
        ? estimateEmissionShellNarrowPhaseF64WithModule(
            module,
            candidateInputs,
            request.signalSpeed,
            tolerance,
            abiInfo
          )
        : { rows: [], buffer: new ArrayBuffer(0) };
    const candidates = candidateInputs.map((candidateInput, index) =>
      enrichEmissionShellCandidate(
        candidateInput.nativeCandidate,
        candidateInput.source,
        candidateInput.receiver,
        request.signalSpeed,
        tolerance,
        nativeNarrowPhaseEstimates.rows[index]
      )
    );
    const falsePositiveEstimate = summarizeEmissionShellFalsePositiveEstimate(candidates);
    const candidateBuffer = copyWasmBytes(
      module,
      candidatesPtr,
      candidates.length * abiInfo.emissionShellCandidateRowF64Bytes
    );
    const buffers = [
      createBufferDescriptor(
        "emission-shell-candidates",
        "emission_shell_candidate.v1",
        candidates.length,
        abiInfo.emissionShellCandidateRowF64Bytes,
        candidateBuffer
      ),
      createBufferDescriptor(
        "emission-shell-narrow-phase",
        "emission_shell_narrow_phase.v1",
        nativeNarrowPhaseEstimates.rows.length,
        abiInfo.emissionShellNarrowPhaseRowF64Bytes,
        nativeNarrowPhaseEstimates.buffer
      ),
    ];
    const scanSummary = createEmissionShellScanSummary({
      executionPath: "native_c_abi_indexed_v0",
      scanMetrics,
      pairCount: summary.pairCount,
      rejectedPairCount: summary.rejectedPairCount,
      candidateCount: candidates.length,
      buffers,
      truncated: summary.truncated,
      requestedWorkerCount: request.workerCount ?? 0,
      plannedWorkerCount: summary.plannedWorkerCount,
    });
    return {
      schema: "solver-emission-shell-candidates.v1",
      streamId,
      signalSpeed: request.signalSpeed,
      tolerance,
      pairCount: summary.pairCount,
      rejectedPairCount: summary.rejectedPairCount,
      candidateCount: candidates.length,
      rejectionRate: summary.pairCount === 0 ? 0 : summary.rejectedPairCount / summary.pairCount,
      candidateRate: summary.pairCount === 0 ? 0 : candidates.length / summary.pairCount,
      falsePositiveEstimate,
      scanSummary,
      indexSummary,
      truncated: summary.truncated,
      candidates,
      buffers,
      status: createStatus(
        summary.truncated ? "stream_memory_pressure" : "ok",
        summary.truncated ? "warning" : "ok",
        summary.truncated
          ? "emission-shell indexed broad-phase candidates truncated"
          : "emission-shell indexed broad-phase candidates computed",
        {
          details: {
            streamId,
            pairCount: summary.pairCount,
            rejectedPairCount: summary.rejectedPairCount,
            candidateCount: candidates.length,
            estimatedFalsePositiveCount: falsePositiveEstimate.estimatedFalsePositiveCount,
            maxCandidates,
            scanSummary,
            indexSummary,
          },
        }
      ),
    };
  } finally {
    if (sourceRowsPtr) {
      module._free(sourceRowsPtr);
    }
    if (receiverRowsPtr) {
      module._free(receiverRowsPtr);
    }
    module._free(optionsPtr);
    module._free(indexOptionsPtr);
    if (candidatesPtr) {
      module._free(candidatesPtr);
    }
    module._free(summaryPtr);
    module._free(indexSummaryPtr);
  }
}

function queryEmissionShellCandidatesF64WithModule(
  module,
  streamId,
  request,
  sourceRows,
  receiverRows,
  tolerance,
  maxCandidates,
  scanMetrics,
  abiInfo
) {
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const sourceRowsPtr =
    sourceRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * sourceRows.length) : 0;
  const receiverRowsPtr =
    receiverRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * receiverRows.length) : 0;
  const optionsPtr = module._malloc(abiInfo.emissionShellBroadPhaseOptionsF64Bytes);
  const candidatesPtr =
    maxCandidates > 0 ? module._malloc(abiInfo.emissionShellCandidateRowF64Bytes * maxCandidates) : 0;
  const summaryPtr = module._malloc(abiInfo.emissionShellBroadPhaseSummaryBytes);
  try {
    sourceRows.forEach((row, index) => {
      writePathHistoryRowF64(module, sourceRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    receiverRows.forEach((row, index) => {
      writePathHistoryRowF64(module, receiverRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    writeEmissionShellBroadPhaseOptionsF64(module, optionsPtr, request, tolerance, maxCandidates);
    const query = module.cwrap("architrino_solver_query_emission_shell_broad_phase_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = query(
      sourceRowsPtr,
      sourceRows.length,
      receiverRowsPtr,
      receiverRows.length,
      optionsPtr,
      candidatesPtr,
      maxCandidates,
      summaryPtr
    );
    const summary = readEmissionShellBroadPhaseSummary(module, summaryPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `emission-shell broad-phase C ABI returned ${status}`, {
          recoverable: false,
          details: { status, ...summary },
        })
      );
    }

    const candidateInputs = [];
    for (let index = 0; index < summary.candidateCount; index += 1) {
      const nativeCandidate = readEmissionShellCandidateRowF64(
        module,
        candidatesPtr + index * abiInfo.emissionShellCandidateRowF64Bytes
      );
      candidateInputs.push(resolveEmissionShellNativeCandidateInput(nativeCandidate, sourceRows, receiverRows));
    }
    const nativeNarrowPhaseEstimates =
      typeof module?._architrino_solver_estimate_emission_shell_narrow_phase_f64 === "function"
        ? estimateEmissionShellNarrowPhaseF64WithModule(
            module,
            candidateInputs,
            request.signalSpeed,
            tolerance,
            abiInfo
          )
        : { rows: [], buffer: new ArrayBuffer(0) };
    const candidates = candidateInputs.map((candidateInput, index) =>
      enrichEmissionShellCandidate(
        candidateInput.nativeCandidate,
        candidateInput.source,
        candidateInput.receiver,
        request.signalSpeed,
        tolerance,
        nativeNarrowPhaseEstimates.rows[index]
      )
    );
    const falsePositiveEstimate = summarizeEmissionShellFalsePositiveEstimate(candidates);
    const candidateBuffer = copyWasmBytes(
      module,
      candidatesPtr,
      candidates.length * abiInfo.emissionShellCandidateRowF64Bytes
    );
    const buffers = [
      createBufferDescriptor(
        "emission-shell-candidates",
        "emission_shell_candidate.v1",
        candidates.length,
        abiInfo.emissionShellCandidateRowF64Bytes,
        candidateBuffer
      ),
      createBufferDescriptor(
        "emission-shell-narrow-phase",
        "emission_shell_narrow_phase.v1",
        nativeNarrowPhaseEstimates.rows.length,
        abiInfo.emissionShellNarrowPhaseRowF64Bytes,
        nativeNarrowPhaseEstimates.buffer
      ),
    ];
    const scanSummary = createEmissionShellScanSummary({
      executionPath: "native_c_abi",
      scanMetrics,
      pairCount: summary.pairCount,
      rejectedPairCount: summary.rejectedPairCount,
      candidateCount: candidates.length,
      buffers,
      truncated: summary.truncated,
      requestedWorkerCount: request.workerCount ?? 0,
      plannedWorkerCount: summary.plannedWorkerCount,
    });
    return {
      schema: "solver-emission-shell-candidates.v1",
      streamId,
      signalSpeed: request.signalSpeed,
      tolerance,
      pairCount: summary.pairCount,
      rejectedPairCount: summary.rejectedPairCount,
      candidateCount: candidates.length,
      rejectionRate: summary.pairCount === 0 ? 0 : summary.rejectedPairCount / summary.pairCount,
      candidateRate: summary.pairCount === 0 ? 0 : candidates.length / summary.pairCount,
      falsePositiveEstimate,
      scanSummary,
      truncated: summary.truncated,
      candidates,
      buffers,
      status: createStatus(
        summary.truncated ? "stream_memory_pressure" : "ok",
        summary.truncated ? "warning" : "ok",
        summary.truncated
          ? "emission-shell broad-phase candidates truncated"
          : "emission-shell broad-phase candidates computed",
        {
          details: {
            streamId,
            pairCount: summary.pairCount,
            rejectedPairCount: summary.rejectedPairCount,
            candidateCount: candidates.length,
            estimatedFalsePositiveCount: falsePositiveEstimate.estimatedFalsePositiveCount,
            maxCandidates,
            scanSummary,
          },
        }
      ),
    };
  } finally {
    if (sourceRowsPtr) {
      module._free(sourceRowsPtr);
    }
    if (receiverRowsPtr) {
      module._free(receiverRowsPtr);
    }
    module._free(optionsPtr);
    if (candidatesPtr) {
      module._free(candidatesPtr);
    }
    module._free(summaryPtr);
  }
}

function estimateEmissionShellNarrowPhaseF64WithModule(module, candidateInputs, signalSpeed, tolerance, abiInfo) {
  if (candidateInputs.length === 0) {
    return { rows: [], buffer: new ArrayBuffer(0) };
  }
  const requestsPtr = module._malloc(
    abiInfo.emissionShellNarrowPhaseRequestF64Bytes * candidateInputs.length
  );
  const rowsPtr = module._malloc(abiInfo.emissionShellNarrowPhaseRowF64Bytes * candidateInputs.length);
  const outRowCountPtr = module._malloc(4);
  try {
    candidateInputs.forEach((candidateInput, index) => {
      writeEmissionShellNarrowPhaseRequestF64(
        module,
        requestsPtr + index * abiInfo.emissionShellNarrowPhaseRequestF64Bytes,
        candidateInput.source,
        candidateInput.receiver,
        signalSpeed,
        tolerance,
        abiInfo
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const estimate = module.cwrap("architrino_solver_estimate_emission_shell_narrow_phase_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = estimate(requestsPtr, candidateInputs.length, rowsPtr, candidateInputs.length, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `emission-shell narrow-phase C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(
        readEmissionShellNarrowPhaseRowF64(
          module,
          rowsPtr + index * abiInfo.emissionShellNarrowPhaseRowF64Bytes
        )
      );
    }
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.emissionShellNarrowPhaseRowF64Bytes);
    return { rows, buffer };
  } finally {
    module._free(requestsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function enrichEmissionShellCandidate(
  nativeCandidate,
  source,
  receiver,
  signalSpeed,
  tolerance,
  narrowPhaseEstimate = null
) {
  return {
    sourcePathKey: nativeCandidate.sourcePathKey,
    receiverPathKey: nativeCandidate.receiverPathKey,
    sourceSegmentIndex: nativeCandidate.sourceSegmentIndex,
    receiverSegmentIndex: nativeCandidate.receiverSegmentIndex,
    sourceChunkIndex: source?.chunkIndex ?? 0,
    receiverChunkIndex: receiver?.chunkIndex ?? 0,
    sourceRowOffset: source?.rowOffset ?? nativeCandidate.sourceRowIndex,
    receiverRowOffset: receiver?.rowOffset ?? nativeCandidate.receiverRowIndex,
    sourceTimeRange: { start: nativeCandidate.sourceTimeStart, end: nativeCandidate.sourceTimeEnd },
    receiverTimeRange: { start: nativeCandidate.receiverTimeStart, end: nativeCandidate.receiverTimeEnd },
    distanceLowerBound: nativeCandidate.distanceLowerBound,
    distanceUpperBound: nativeCandidate.distanceUpperBound,
    radiusLowerBound: nativeCandidate.radiusLowerBound,
    radiusUpperBound: nativeCandidate.radiusUpperBound,
    candidateKind: "broad_phase_possible",
    narrowPhaseEstimate:
      narrowPhaseEstimate ??
      (source && receiver
        ? estimateEmissionShellNarrowPhase(source, receiver, signalSpeed, tolerance)
        : {
            method: "sampled_linear_segment_bisection.v1",
            classification: "sampled_miss",
            sampleCount: 0,
            residual: null,
          }),
  };
}

function validateEmissionShellCandidateRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "emission-shell candidate request object is required", {
        recoverable: false,
      })
    );
  }
  validateStreamIdOrManifestPathRequest(request, "emission-shell candidate request");
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.tolerance != null) {
    requireNonnegativeFiniteNumber(request.tolerance, "tolerance");
  }
  if (request.maxCandidates != null) {
    requirePositiveInt32(request.maxCandidates, "maxCandidates");
  }
  validateOptionalPathKeyArray(request.sourcePathKeys, "sourcePathKeys");
  validateOptionalPathKeyArray(request.receiverPathKeys, "receiverPathKeys");
  if (request.workerCount != null) {
    requireNonnegativeInt32(request.workerCount, "workerCount");
  }
  if (request.sourceChunkIndices != null) {
    normalizeChunkIndexSelection(request.sourceChunkIndices, "sourceChunkIndices");
  }
  if (request.receiverChunkIndices != null) {
    normalizeChunkIndexSelection(request.receiverChunkIndices, "receiverChunkIndices");
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  validateOptionalEmissionShellIndexOptions(request.indexOptions, "indexOptions");
}

function validateOptionalEmissionShellIndexOptions(indexOptions, label) {
  if (indexOptions == null) {
    return null;
  }
  if (!indexOptions || typeof indexOptions !== "object" || Array.isArray(indexOptions)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  if (indexOptions.strategy !== EMISSION_SHELL_INDEXED_BROAD_PHASE_V0_STRATEGY) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.strategy is not supported`, {
        recoverable: false,
      })
    );
  }
  requirePositiveInt32(indexOptions.timeSlabCount, `${label}.timeSlabCount`);
  requirePositiveFiniteNumber(indexOptions.spatialCellSize, `${label}.spatialCellSize`);
  if (indexOptions.sourceRowOffset != null) {
    requireNonnegativeInteger(indexOptions.sourceRowOffset, `${label}.sourceRowOffset`);
  }
  if (indexOptions.receiverRowOffset != null) {
    requireNonnegativeInteger(indexOptions.receiverRowOffset, `${label}.receiverRowOffset`);
  }
  return {
    strategy: indexOptions.strategy,
    timeSlabCount: indexOptions.timeSlabCount,
    spatialCellSize: indexOptions.spatialCellSize,
    sourceRowOffset: indexOptions.sourceRowOffset ?? 0,
    receiverRowOffset: indexOptions.receiverRowOffset ?? 0,
  };
}

function validateEmissionShellRootRefinementRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "emission-shell root-refinement request object is required", {
        recoverable: false,
      })
    );
  }
  validateStreamIdOrManifestPathRequest(request, "emission-shell root-refinement request");
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (!Array.isArray(request.candidates)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "candidates must be an array", {
        recoverable: false,
      })
    );
  }
  request.candidates.forEach(validateEmissionShellCandidateForRefinement);
  if (request.tolerance != null) {
    requireNonnegativeFiniteNumber(request.tolerance, "tolerance");
  }
  if (request.rootTolerance != null) {
    requirePositiveFiniteNumber(request.rootTolerance, "rootTolerance");
  }
  if (request.maxCandidates != null) {
    requirePositiveInt32(request.maxCandidates, "maxCandidates");
  }
  if (request.maxIterations != null) {
    requirePositiveInt32(request.maxIterations, "maxIterations");
  }
  if (request.scanSubdivisions != null) {
    requirePositiveInt32(request.scanSubdivisions, "scanSubdivisions");
  }
  if (request.maxRootsPerCandidate != null) {
    requirePositiveInt32(request.maxRootsPerCandidate, "maxRootsPerCandidate");
  }
  if (request.maxHitsPerCandidate != null) {
    requirePositiveInt32(request.maxHitsPerCandidate, "maxHitsPerCandidate");
  }
  if (request.workerCount != null) {
    requireNonnegativeInt32(request.workerCount, "workerCount");
  }
  if (
    request.packet != null &&
    (!request.packet || typeof request.packet !== "object" || Array.isArray(request.packet))
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "packet must be a work packet object", {
        recoverable: false,
      })
    );
  }
}

function validateEmissionShellRootRefinementPacket(packet, candidates) {
  for (const layout of ["root_ledger.v1", "delayed_hit_events.v1"]) {
    if (!packet.expectedOutputs.includes(layout)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "root-refinement packet expected outputs are incomplete", {
          recoverable: false,
          stage: "work_packet",
          details: {
            packetId: packet.packetId,
            missingLayout: layout,
          },
        })
      );
    }
  }

  candidates.forEach((candidate, index) => {
    validatePacketRangeOwnsIndex(
      packet.sourceBlock,
      candidate.sourceChunkIndex,
      `candidates[${index}].sourceChunkIndex`,
      packet.packetId
    );
    validatePacketRangeOwnsIndex(
      packet.receiverBlock,
      candidate.receiverChunkIndex,
      `candidates[${index}].receiverChunkIndex`,
      packet.packetId
    );
  });
}

function validatePacketRangeOwnsIndex(range, value, label, packetId) {
  if (!range.enabled) {
    return;
  }
  if (value < range.start || value >= range.end) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is outside packet range ownership`, {
        recoverable: false,
        stage: "work_packet",
        details: {
          packetId,
          label,
          value,
          rangeStart: range.start,
          rangeEnd: range.end,
        },
      })
    );
  }
}

function validateEmissionShellCandidateForRefinement(candidate, index) {
  const label = `candidates[${index}]`;
  if (!candidate || typeof candidate !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(candidate.sourcePathKey, `${label}.sourcePathKey`);
  requireSafeUint64(candidate.receiverPathKey, `${label}.receiverPathKey`);
  requireSafeUint64(candidate.sourceSegmentIndex, `${label}.sourceSegmentIndex`);
  requireSafeUint64(candidate.receiverSegmentIndex, `${label}.receiverSegmentIndex`);
  requireSafeUint64(candidate.sourceChunkIndex, `${label}.sourceChunkIndex`);
  requireSafeUint64(candidate.receiverChunkIndex, `${label}.receiverChunkIndex`);
  requireSafeUint64(candidate.sourceRowOffset, `${label}.sourceRowOffset`);
  requireSafeUint64(candidate.receiverRowOffset, `${label}.receiverRowOffset`);
  validateRange(candidate.sourceTimeRange, `${label}.sourceTimeRange`);
  validateRange(candidate.receiverTimeRange, `${label}.receiverTimeRange`);
  requireNonnegativeFiniteNumber(candidate.distanceLowerBound, `${label}.distanceLowerBound`);
  requireNonnegativeFiniteNumber(candidate.distanceUpperBound, `${label}.distanceUpperBound`);
  requireNonnegativeFiniteNumber(candidate.radiusLowerBound, `${label}.radiusLowerBound`);
  requireNonnegativeFiniteNumber(candidate.radiusUpperBound, `${label}.radiusUpperBound`);
  if (candidate.candidateKind !== "broad_phase_possible") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.candidateKind is not supported`, {
        recoverable: false,
      })
    );
  }
  validateEmissionShellNarrowPhaseEstimateForRefinement(candidate.narrowPhaseEstimate, `${label}.narrowPhaseEstimate`);
}

function validateEmissionShellNarrowPhaseEstimateForRefinement(estimate, label) {
  if (!estimate || typeof estimate !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  if (estimate.method !== "sampled_linear_segment_bisection.v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.method is not supported`, {
        recoverable: false,
      })
    );
  }
  if (!["sampled_hit", "sampled_miss"].includes(estimate.classification)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.classification is not supported`, {
        recoverable: false,
      })
    );
  }
  requireNonnegativeInteger(estimate.sampleCount, `${label}.sampleCount`);
  if (estimate.classification === "sampled_hit") {
    requireFiniteNumber(estimate.hitTime, `${label}.hitTime`);
    requireFiniteNumber(estimate.emissionTime, `${label}.emissionTime`);
  }
  if (estimate.residual != null) {
    requireNonnegativeFiniteNumber(estimate.residual, `${label}.residual`);
  }
}

function validateEmissionShellCandidatePacketRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "emission-shell candidate packet request object is required",
        {
          recoverable: false,
        }
      )
    );
  }
  validateStreamIdOrManifestPathRequest(request, "emission-shell candidate packet request");
  if (!request.packet || typeof request.packet !== "object" || Array.isArray(request.packet)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "packet is required", {
        recoverable: false,
      })
    );
  }
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.tolerance != null) {
    requireNonnegativeFiniteNumber(request.tolerance, "tolerance");
  }
  if (request.maxCandidates != null) {
    requirePositiveInt32(request.maxCandidates, "maxCandidates");
  }
  validateOptionalPathKeyArray(request.sourcePathKeys, "sourcePathKeys");
  validateOptionalPathKeyArray(request.receiverPathKeys, "receiverPathKeys");
  if (request.workerCount != null) {
    requireNonnegativeInt32(request.workerCount, "workerCount");
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  validateOptionalEmissionShellIndexOptions(request.indexOptions, "indexOptions");
}

function validateEmissionShellCandidatePacketsRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus(
        "app_contract_error",
        "error",
        "emission-shell candidate packets request object is required",
        {
          recoverable: false,
        }
      )
    );
  }
  validateStreamIdOrManifestPathRequest(request, "emission-shell candidate packet batch request");
  requireArray(request.packets, "packets");
  if (request.packets.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "packets must not be empty", {
        recoverable: false,
      })
    );
  }
  request.packets.forEach((packet, index) => {
    if (!packet || typeof packet !== "object" || Array.isArray(packet)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `packets[${index}] must be a work packet`, {
          recoverable: false,
        })
      );
    }
  });
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.tolerance != null) {
    requireNonnegativeFiniteNumber(request.tolerance, "tolerance");
  }
  if (request.maxCandidatesPerPacket != null) {
    requirePositiveInt32(request.maxCandidatesPerPacket, "maxCandidatesPerPacket");
  }
  validateOptionalPathKeyArray(request.sourcePathKeys, "sourcePathKeys");
  validateOptionalPathKeyArray(request.receiverPathKeys, "receiverPathKeys");
  if (request.workerCount != null) {
    requireNonnegativeInt32(request.workerCount, "workerCount");
  }
  if (request.timeRange != null) {
    validateRange(request.timeRange, "timeRange");
  }
  validateOptionalEmissionShellIndexOptions(request.indexOptions, "indexOptions");
}

function expandWorkPacketChunkRange(range, label) {
  if (!range.enabled) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be enabled for packet query`, {
        recoverable: false,
      })
    );
  }
  const count = range.end - range.start;
  if (count <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be nonempty for packet query`, {
        recoverable: false,
      })
    );
  }
  if (count > 65536) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", `${label} is too large for direct chunk expansion`, {
        recoverable: true,
        stage: "work_packet",
        details: {
          start: range.start,
          end: range.end,
          count,
        },
      })
    );
  }
  const indices = [];
  for (let index = range.start; index < range.end; index += 1) {
    indices.push(index);
  }
  return indices;
}

function intersectOptionalPacketQueryTimeRange(packetRange, requestRange) {
  if (requestRange == null) {
    return { ...packetRange };
  }
  const start = Math.max(packetRange.start, requestRange.start);
  const end = Math.min(packetRange.end, requestRange.end);
  if (end < start) {
    throw new SolverBridgeError(
      createStatus(
        "time_resolution_insufficient",
        "error",
        "packet time range does not overlap emission-shell request timeRange",
        {
          recoverable: false,
          stage: "work_packet",
          details: {
            packetRange,
            requestRange,
          },
        }
      )
    );
  }
  return { start, end };
}

function validateOptionalPathKeyArray(pathKeys, label) {
  if (pathKeys == null) {
    return;
  }
  if (!Array.isArray(pathKeys)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an array`, {
        recoverable: false,
      })
    );
  }
  pathKeys.forEach((pathKey, index) => requireSafeUint64(pathKey, `${label}[${index}]`));
}

function readEmissionShellPathHistoryRowsFromStream(
  streamEntry,
  sourceKeySet,
  receiverKeySet,
  sourceChunkSet,
  receiverChunkSet,
  timeRange
) {
  const sourceRows = [];
  const receiverRows = [];
  const scanMetrics = {
    streamChunkCount: 0,
    skippedChunkCount: 0,
    prunedByTimeChunkCount: 0,
    prunedByPathChunkCount: 0,
    indexSkippedRowCount: 0,
    scannedRowCount: 0,
    skippedRowCount: 0,
    uniqueMaterializedRowCount: 0,
  };
  const pathIndexRowsByChunk = getPathHistoryIndexRowsByChunk(streamEntry);
  const pathIndexSummary = getPathHistoryIndexSummary(streamEntry);
  scanMetrics.pathIndexRowCount = pathIndexSummary.pathIndexRowCount;
  scanMetrics.pathIndexedChunkCount = pathIndexSummary.pathIndexedChunkCount;
  streamEntry.buffers.forEach((descriptor, chunkIndex) => {
    if (descriptor.layout !== "path_segment.v1" || descriptor.rowCount === 0) {
      return;
    }
    const chunkRange = streamEntry.stream.availableRanges[chunkIndex];
    const sourceChunkRole = chunkMatchesEmissionShellRole(
      chunkIndex,
      chunkRange,
      pathIndexRowsByChunk,
      sourceChunkSet,
      sourceKeySet,
      timeRange
    );
    const receiverChunkRole = chunkMatchesEmissionShellRole(
      chunkIndex,
      chunkRange,
      pathIndexRowsByChunk,
      receiverChunkSet,
      receiverKeySet,
      timeRange
    );
    if (!sourceChunkRole.matches && !receiverChunkRole.matches) {
      scanMetrics.skippedChunkCount += 1;
      if (sourceChunkRole.reason === "time" && receiverChunkRole.reason === "time") {
        scanMetrics.prunedByTimeChunkCount += 1;
      } else if (sourceChunkRole.reason === "path" && receiverChunkRole.reason === "path") {
        scanMetrics.prunedByPathChunkCount += 1;
      }
      return;
    }
    const buffer = getBufferDescriptorArrayBuffer(descriptor);
    if (!buffer) {
      return;
    }
    scanMetrics.streamChunkCount += 1;
    const rowSize = descriptor.byteLength / descriptor.rowCount;
    if (!Number.isInteger(rowSize) || rowSize <= 0) {
      return;
    }
    const view = new DataView(buffer);
    const rowPlans = collectEmissionShellPathHistoryRowPlans(
      pathIndexRowsByChunk.get(chunkIndex) ?? [],
      sourceChunkRole,
      receiverChunkRole,
      sourceKeySet,
      receiverKeySet,
      timeRange
    );
    if (rowPlans) {
      scanMetrics.indexSkippedRowCount += Math.max(0, descriptor.rowCount - rowPlans.size);
      readPlannedEmissionShellPathHistoryRows(
        view,
        rowSize,
        chunkIndex,
        rowPlans,
        sourceChunkRole,
        receiverChunkRole,
        sourceKeySet,
        receiverKeySet,
        timeRange,
        scanMetrics,
        sourceRows,
        receiverRows
      );
      return;
    }
    readSequentialEmissionShellPathHistoryRows(
      view,
      rowSize,
      descriptor.rowCount,
      chunkIndex,
      sourceChunkRole,
      receiverChunkRole,
      sourceKeySet,
      receiverKeySet,
      timeRange,
      scanMetrics,
      sourceRows,
      receiverRows
    );
  });
  scanMetrics.sourceRowCount = sourceRows.length;
  scanMetrics.receiverRowCount = receiverRows.length;
  scanMetrics.materializedRoleRowCount = sourceRows.length + receiverRows.length;
  return { sourceRows, receiverRows, scanMetrics };
}

function collectEmissionShellPathHistoryRowPlans(
  chunkIndexRows,
  sourceChunkRole,
  receiverChunkRole,
  sourceKeySet,
  receiverKeySet,
  timeRange
) {
  if (chunkIndexRows.length === 0) {
    return null;
  }
  const rowPlans = new Map();
  addEmissionShellPathHistoryRolePlans(
    rowPlans,
    chunkIndexRows,
    "source",
    sourceChunkRole,
    sourceKeySet,
    timeRange
  );
  addEmissionShellPathHistoryRolePlans(
    rowPlans,
    chunkIndexRows,
    "receiver",
    receiverChunkRole,
    receiverKeySet,
    timeRange
  );
  return rowPlans;
}

function addEmissionShellPathHistoryRolePlans(
  rowPlans,
  chunkIndexRows,
  role,
  chunkRole,
  pathKeySet,
  timeRange
) {
  if (!chunkRole.matches) {
    return;
  }
  for (const indexRow of chunkIndexRows) {
    if (pathKeySet != null && !pathKeySet.has(indexRow.pathKey)) {
      continue;
    }
    if (timeRange && !rangeOverlapsOptional(indexRow.timeRange, timeRange)) {
      continue;
    }
    const rowEnd = indexRow.rowOffset + indexRow.rowCount;
    for (let rowOffset = indexRow.rowOffset; rowOffset < rowEnd; rowOffset += 1) {
      const plan = rowPlans.get(rowOffset) ?? { source: false, receiver: false };
      plan[role] = true;
      rowPlans.set(rowOffset, plan);
    }
  }
}

function readPlannedEmissionShellPathHistoryRows(
  view,
  rowSize,
  chunkIndex,
  rowPlans,
  sourceChunkRole,
  receiverChunkRole,
  sourceKeySet,
  receiverKeySet,
  timeRange,
  scanMetrics,
  sourceRows,
  receiverRows
) {
  const sortedRowOffsets = [...rowPlans.keys()].sort((left, right) => left - right);
  for (const rowOffset of sortedRowOffsets) {
    readEmissionShellPathHistoryRow(
      view,
      rowSize,
      chunkIndex,
      rowOffset,
      rowPlans.get(rowOffset),
      sourceChunkRole,
      receiverChunkRole,
      sourceKeySet,
      receiverKeySet,
      timeRange,
      scanMetrics,
      sourceRows,
      receiverRows
    );
  }
}

function readSequentialEmissionShellPathHistoryRows(
  view,
  rowSize,
  rowCount,
  chunkIndex,
  sourceChunkRole,
  receiverChunkRole,
  sourceKeySet,
  receiverKeySet,
  timeRange,
  scanMetrics,
  sourceRows,
  receiverRows
) {
  const allRoles = { source: true, receiver: true };
  for (let rowOffset = 0; rowOffset < rowCount; rowOffset += 1) {
    readEmissionShellPathHistoryRow(
      view,
      rowSize,
      chunkIndex,
      rowOffset,
      allRoles,
      sourceChunkRole,
      receiverChunkRole,
      sourceKeySet,
      receiverKeySet,
      timeRange,
      scanMetrics,
      sourceRows,
      receiverRows
    );
  }
}

function readEmissionShellPathHistoryRow(
  view,
  rowSize,
  chunkIndex,
  rowOffset,
  plannedRoles,
  sourceChunkRole,
  receiverChunkRole,
  sourceKeySet,
  receiverKeySet,
  timeRange,
  scanMetrics,
  sourceRows,
  receiverRows
) {
  const offset = rowOffset * rowSize;
  const pathKey = Number(view.getBigUint64(offset, true));
  const startTime = view.getFloat64(offset + 16, true);
  const endTime = view.getFloat64(offset + 24, true);
  scanMetrics.scannedRowCount += 1;
  if (timeRange && (startTime > timeRange.end || endTime < timeRange.start)) {
    scanMetrics.skippedRowCount += 1;
    return;
  }
  const matchesSource =
    plannedRoles.source &&
    sourceChunkRole.matches &&
    (sourceKeySet == null || sourceKeySet.has(pathKey));
  const matchesReceiver =
    plannedRoles.receiver &&
    receiverChunkRole.matches &&
    (receiverKeySet == null || receiverKeySet.has(pathKey));
  if (!matchesSource && !matchesReceiver) {
    scanMetrics.skippedRowCount += 1;
    return;
  }
  scanMetrics.uniqueMaterializedRowCount += 1;
  const row = readPathHistoryRowFromView(view, offset, chunkIndex, rowOffset);
  if (matchesSource) {
    sourceRows.push(row);
  }
  if (matchesReceiver) {
    receiverRows.push(row);
  }
}

function groupPathHistoryIndexRowsByChunk(pathIndexRows) {
  const rowsByChunk = new Map();
  for (const row of pathIndexRows) {
    const rows = rowsByChunk.get(row.chunkIndex) ?? [];
    rows.push(row);
    rowsByChunk.set(row.chunkIndex, rows);
  }
  return rowsByChunk;
}

function chunkMatchesEmissionShellRole(
  chunkIndex,
  chunkRange,
  pathIndexRowsByChunk,
  roleChunkSet,
  rolePathKeySet,
  timeRange
) {
  if (roleChunkSet != null && !roleChunkSet.has(chunkIndex)) {
    return { matches: false, reason: "chunk" };
  }
  if (timeRange && (!chunkRange?.timeRange || !rangeOverlapsOptional(chunkRange.timeRange, timeRange))) {
    return { matches: false, reason: "time" };
  }
  if (rolePathKeySet == null) {
    return { matches: true, reason: "match" };
  }
  const indexRows = pathIndexRowsByChunk.get(chunkIndex) ?? [];
  if (indexRows.length === 0) {
    return { matches: true, reason: "unknown" };
  }
  const pathMatches = indexRows.some(
    (row) =>
      rolePathKeySet.has(row.pathKey) &&
      (!timeRange || rangeOverlapsOptional(row.timeRange, timeRange))
  );
  return pathMatches ? { matches: true, reason: "match" } : { matches: false, reason: "path" };
}

function createEmissionShellScanSummary({
  executionPath,
  scanMetrics,
  pairCount,
  rejectedPairCount,
  candidateCount,
  buffers,
  truncated,
  requestedWorkerCount = 0,
  plannedWorkerCount = 1,
}) {
  const possiblePairUpperBound = scanMetrics.sourceRowCount * scanMetrics.receiverRowCount;
  const outputByteLength = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  return {
    schema: "solver-emission-shell-scan-summary.v1",
    executionPath,
    streamChunkCount: scanMetrics.streamChunkCount,
    skippedChunkCount: scanMetrics.skippedChunkCount,
    prunedByTimeChunkCount: scanMetrics.prunedByTimeChunkCount,
    prunedByPathChunkCount: scanMetrics.prunedByPathChunkCount,
    pathIndexRowCount: scanMetrics.pathIndexRowCount,
    pathIndexedChunkCount: scanMetrics.pathIndexedChunkCount,
    indexSkippedRowCount: scanMetrics.indexSkippedRowCount,
    scannedRowCount: scanMetrics.scannedRowCount,
    skippedRowCount: scanMetrics.skippedRowCount,
    uniqueMaterializedRowCount: scanMetrics.uniqueMaterializedRowCount,
    materializedRoleRowCount: scanMetrics.materializedRoleRowCount,
    sourceRowCount: scanMetrics.sourceRowCount,
    receiverRowCount: scanMetrics.receiverRowCount,
    possiblePairUpperBound,
    testedPairCount: pairCount,
    skippedPairCount: Math.max(0, possiblePairUpperBound - pairCount),
    rejectedPairCount,
    candidateCount,
    outputBufferCount: buffers.length,
    outputByteLength,
    requestedWorkerCount,
    plannedWorkerCount,
    truncated,
  };
}

function readPathHistoryRowFromView(view, offset, chunkIndex, rowOffset) {
  return {
    pathKey: Number(view.getBigUint64(offset, true)),
    segmentIndex: Number(view.getBigUint64(offset + 8, true)),
    startTime: view.getFloat64(offset + 16, true),
    endTime: view.getFloat64(offset + 24, true),
    start: readVectorFromView(view, offset + 32),
    velocity: readVectorFromView(view, offset + 56),
    errorBound: view.getFloat64(offset + 80, true),
    stateFlags: view.getUint32(offset + 88, true),
    chunkIndex,
    rowOffset,
  };
}

function readVectorFromView(view, offset) {
  return {
    x: view.getFloat64(offset, true),
    y: view.getFloat64(offset + 8, true),
    z: view.getFloat64(offset + 16, true),
  };
}

function pathHistoryPairOverlapsTimeRange(source, receiver, timeRange) {
  return (
    source.startTime <= timeRange.end &&
    source.endTime >= timeRange.start &&
    receiver.startTime <= timeRange.end &&
    receiver.endTime >= timeRange.start
  );
}

function classifyEmissionShellCandidate(source, receiver, signalSpeed, tolerance) {
  const maxDelay = receiver.endTime - source.startTime;
  if (maxDelay < 0) {
    return null;
  }
  const minDelay = Math.max(0, receiver.startTime - source.endTime);
  const radiusLowerBound = signalSpeed * minDelay;
  const radiusUpperBound = signalSpeed * maxDelay;
  const sourceBounds = pathHistoryRowBounds(source);
  const receiverBounds = pathHistoryRowBounds(receiver);
  const distanceLowerBound = aabbDistanceLowerBound(sourceBounds, receiverBounds);
  const distanceUpperBound = aabbDistanceUpperBound(sourceBounds, receiverBounds);
  if (distanceUpperBound + tolerance < radiusLowerBound || distanceLowerBound - tolerance > radiusUpperBound) {
    return null;
  }
  return {
    sourcePathKey: source.pathKey,
    receiverPathKey: receiver.pathKey,
    sourceSegmentIndex: source.segmentIndex,
    receiverSegmentIndex: receiver.segmentIndex,
    sourceChunkIndex: source.chunkIndex,
    receiverChunkIndex: receiver.chunkIndex,
    sourceRowOffset: source.rowOffset,
    receiverRowOffset: receiver.rowOffset,
    sourceTimeRange: { start: source.startTime, end: source.endTime },
    receiverTimeRange: { start: receiver.startTime, end: receiver.endTime },
    distanceLowerBound,
    distanceUpperBound,
    radiusLowerBound,
    radiusUpperBound,
    candidateKind: "broad_phase_possible",
  };
}

function summarizeEmissionShellFalsePositiveEstimate(candidates) {
  let estimatedTruePositiveCount = 0;
  let estimatedFalsePositiveCount = 0;
  for (const candidate of candidates) {
    if (candidate.narrowPhaseEstimate?.classification === "sampled_hit") {
      estimatedTruePositiveCount += 1;
    } else if (candidate.narrowPhaseEstimate?.classification === "sampled_miss") {
      estimatedFalsePositiveCount += 1;
    }
  }
  const testedCandidateCount = estimatedTruePositiveCount + estimatedFalsePositiveCount;
  return {
    method: "sampled_linear_segment_bisection.v1",
    testedCandidateCount,
    estimatedTruePositiveCount,
    estimatedFalsePositiveCount,
    estimatedFalsePositiveRate:
      testedCandidateCount === 0 ? 0 : estimatedFalsePositiveCount / testedCandidateCount,
  };
}

function estimateEmissionShellNarrowPhase(source, receiver, signalSpeed, tolerance) {
  const receiverSamples = uniqueSortedNumbers([
    receiver.startTime,
    (receiver.startTime + receiver.endTime) / 2,
    receiver.endTime,
  ]);
  const estimatorTolerance = Math.max(tolerance, 1e-10);
  let bestResidual = Number.POSITIVE_INFINITY;
  let sampleCount = 0;
  for (const hitTime of receiverSamples) {
    if (hitTime < source.startTime) {
      continue;
    }
    sampleCount += 1;
    const receiverPoint = pathHistoryPointAt(receiver, hitTime);
    const emissionStart = source.startTime;
    const emissionEnd = Math.min(source.endTime, hitTime);
    if (emissionEnd < emissionStart) {
      continue;
    }
    const solved = solveSampledEmissionTime(
      source,
      receiverPoint,
      hitTime,
      signalSpeed,
      estimatorTolerance,
      emissionStart,
      emissionEnd
    );
    bestResidual = Math.min(bestResidual, solved.bestResidual);
    if (solved.hit) {
      return {
        method: "sampled_linear_segment_bisection.v1",
        classification: "sampled_hit",
        sampleCount,
        hitTime,
        emissionTime: solved.emissionTime,
        residual: solved.bestResidual,
      };
    }
  }
  return {
    method: "sampled_linear_segment_bisection.v1",
    classification: "sampled_miss",
    sampleCount,
    residual: Number.isFinite(bestResidual) ? bestResidual : null,
  };
}

function uniqueSortedNumbers(values) {
  return [...new Set(values.filter(Number.isFinite))].sort((left, right) => left - right);
}

function solveSampledEmissionTime(
  source,
  receiverPoint,
  hitTime,
  signalSpeed,
  tolerance,
  emissionStart,
  emissionEnd
) {
  const startResidual = emissionShellResidual(
    source,
    receiverPoint,
    hitTime,
    signalSpeed,
    emissionStart
  );
  const endResidual = emissionShellResidual(source, receiverPoint, hitTime, signalSpeed, emissionEnd);
  let bestResidual = Math.min(Math.abs(startResidual), Math.abs(endResidual));
  let bestEmissionTime = Math.abs(startResidual) <= Math.abs(endResidual) ? emissionStart : emissionEnd;
  if (bestResidual <= tolerance) {
    return { hit: true, emissionTime: bestEmissionTime, bestResidual };
  }
  if (Math.sign(startResidual) === Math.sign(endResidual)) {
    return { hit: false, emissionTime: bestEmissionTime, bestResidual };
  }

  let lowTime = emissionStart;
  let highTime = emissionEnd;
  let lowResidual = startResidual;
  for (let iteration = 0; iteration < 64; iteration += 1) {
    const midTime = (lowTime + highTime) / 2;
    const midResidual = emissionShellResidual(source, receiverPoint, hitTime, signalSpeed, midTime);
    const midAbs = Math.abs(midResidual);
    if (midAbs < bestResidual) {
      bestResidual = midAbs;
      bestEmissionTime = midTime;
    }
    if (midAbs <= tolerance) {
      return { hit: true, emissionTime: midTime, bestResidual: midAbs };
    }
    if (Math.sign(lowResidual) === Math.sign(midResidual)) {
      lowTime = midTime;
      lowResidual = midResidual;
    } else {
      highTime = midTime;
    }
  }
  return { hit: bestResidual <= tolerance, emissionTime: bestEmissionTime, bestResidual };
}

function emissionShellResidual(source, receiverPoint, hitTime, signalSpeed, emissionTime) {
  const sourcePoint = pathHistoryPointAt(source, emissionTime);
  const distance = Math.hypot(
    receiverPoint.x - sourcePoint.x,
    receiverPoint.y - sourcePoint.y,
    receiverPoint.z - sourcePoint.z
  );
  return distance - signalSpeed * (hitTime - emissionTime);
}

function pathHistoryPointAt(row, time) {
  const dt = time - row.startTime;
  return {
    x: row.start.x + row.velocity.x * dt,
    y: row.start.y + row.velocity.y * dt,
    z: row.start.z + row.velocity.z * dt,
  };
}

function pathHistoryRowBounds(row) {
  const dt = row.endTime - row.startTime;
  const end = {
    x: row.start.x + row.velocity.x * dt,
    y: row.start.y + row.velocity.y * dt,
    z: row.start.z + row.velocity.z * dt,
  };
  const pad = Math.max(0, Number.isFinite(row.errorBound) ? row.errorBound : 0);
  return {
    min: {
      x: Math.min(row.start.x, end.x) - pad,
      y: Math.min(row.start.y, end.y) - pad,
      z: Math.min(row.start.z, end.z) - pad,
    },
    max: {
      x: Math.max(row.start.x, end.x) + pad,
      y: Math.max(row.start.y, end.y) + pad,
      z: Math.max(row.start.z, end.z) + pad,
    },
  };
}

function aabbDistanceLowerBound(left, right) {
  const dx = axisGap(left.min.x, left.max.x, right.min.x, right.max.x);
  const dy = axisGap(left.min.y, left.max.y, right.min.y, right.max.y);
  const dz = axisGap(left.min.z, left.max.z, right.min.z, right.max.z);
  return Math.hypot(dx, dy, dz);
}

function axisGap(leftMin, leftMax, rightMin, rightMax) {
  if (leftMax < rightMin) {
    return rightMin - leftMax;
  }
  if (rightMax < leftMin) {
    return leftMin - rightMax;
  }
  return 0;
}

function aabbDistanceUpperBound(left, right) {
  const dx = Math.max(Math.abs(left.min.x - right.max.x), Math.abs(left.max.x - right.min.x));
  const dy = Math.max(Math.abs(left.min.y - right.max.y), Math.abs(left.max.y - right.min.y));
  const dz = Math.max(Math.abs(left.min.z - right.max.z), Math.abs(left.max.z - right.min.z));
  return Math.hypot(dx, dy, dz);
}

function buildStreamIndexDescription(streamEntry) {
  const pathIndexRows = getPathHistoryIndexRows(streamEntry);
  const description = {
    schema: "solver-stream-index.v1",
    streamId: streamEntry.stream.streamId,
    indexLayout: streamEntry.stream.indexLayout,
    chunkCount: streamEntry.stream.availableRanges.length,
    pathIndexRows,
  };
  if (streamEntry.indexSidecar) {
    description.sidecar = copyStreamIndexSidecar(streamEntry.indexSidecar);
  }
  return description;
}

function getPathHistoryIndexRows(streamEntry) {
  ensurePathHistoryIndexCache(streamEntry);
  return streamEntry.pathIndexRows;
}

function getPathHistoryIndexRowsByChunk(streamEntry) {
  ensurePathHistoryIndexCache(streamEntry);
  return streamEntry.pathIndexRowsByChunk;
}

function getPathHistoryIndexSummary(streamEntry) {
  ensurePathHistoryIndexCache(streamEntry);
  return streamEntry.pathIndexSummary;
}

function ensurePathHistoryIndexCache(streamEntry) {
  if (
    Array.isArray(streamEntry.pathIndexRows) &&
    streamEntry.pathIndexRowsByChunk instanceof Map &&
    streamEntry.pathIndexSummary
  ) {
    return;
  }
  const pathIndexRows = Array.isArray(streamEntry.pathIndexRows)
    ? streamEntry.pathIndexRows
    : buildPathHistoryIndexRows(streamEntry);
  const pathIndexRowsByChunk = groupPathHistoryIndexRowsByChunk(pathIndexRows);
  streamEntry.pathIndexRows = pathIndexRows;
  streamEntry.pathIndexRowsByChunk = pathIndexRowsByChunk;
  streamEntry.pathIndexSummary = {
    pathIndexRowCount: pathIndexRows.length,
    pathIndexedChunkCount: pathIndexRowsByChunk.size,
  };
}

function buildPathHistoryIndexRows(streamEntry) {
  const rows = [];
  streamEntry.buffers.forEach((descriptor, chunkIndex) => {
    const buffer = getBufferDescriptorArrayBuffer(descriptor);
    if (descriptor.layout !== "path_segment.v1" || !buffer || descriptor.rowCount === 0) {
      return;
    }
    const range = streamEntry.stream.availableRanges[chunkIndex];
    const rowSize = descriptor.byteLength / descriptor.rowCount;
    if (!Number.isInteger(rowSize) || rowSize <= 0) {
      return;
    }
    const view = new DataView(buffer);
    let run = null;
    for (let rowOffset = 0; rowOffset < descriptor.rowCount; rowOffset += 1) {
      const summary = readPathHistoryRowSummary(view, rowOffset * rowSize);
      if (!run || run.pathKey !== summary.pathKey) {
        if (run) {
          rows.push(finalizePathHistoryIndexRun(run, rowSize, range));
        }
        run = {
          pathKey: summary.pathKey,
          chunkIndex,
          rowOffset,
          rowCount: 1,
          timeStart: summary.startTime,
          timeEnd: summary.endTime,
          frameStart: summary.segmentIndex,
          frameEnd: summary.segmentIndex,
        };
      } else {
        run.rowCount += 1;
        run.timeStart = Math.min(run.timeStart, summary.startTime);
        run.timeEnd = Math.max(run.timeEnd, summary.endTime);
        run.frameStart = Math.min(run.frameStart, summary.segmentIndex);
        run.frameEnd = Math.max(run.frameEnd, summary.segmentIndex);
      }
    }
    if (run) {
      rows.push(finalizePathHistoryIndexRun(run, rowSize, range));
    }
  });
  return rows;
}

function finalizePathHistoryIndexRun(run, rowSize, range) {
  const localByteStart = run.rowOffset * rowSize;
  const localByteEnd = localByteStart + run.rowCount * rowSize;
  const rangeStart = range?.byteRange?.start ?? 0;
  return {
    pathKey: run.pathKey,
    chunkIndex: run.chunkIndex,
    rowOffset: run.rowOffset,
    rowCount: run.rowCount,
    timeRange: { start: run.timeStart, end: run.timeEnd },
    frameRange: { start: run.frameStart, end: run.frameEnd },
    byteRange: {
      start: rangeStart + localByteStart,
      end: rangeStart + localByteEnd,
    },
  };
}

function copyPathHistoryIndexRow(row) {
  return {
    pathKey: row.pathKey,
    chunkIndex: row.chunkIndex,
    rowOffset: row.rowOffset,
    rowCount: row.rowCount,
    timeRange: { ...row.timeRange },
    frameRange: { ...row.frameRange },
    byteRange: { ...row.byteRange },
  };
}

function copyStreamIndexSidecar(sidecar) {
  return {
    schema: sidecar.schema,
    indexLayout: sidecar.indexLayout,
    numericType: sidecar.numericType,
    byteOrder: sidecar.byteOrder,
    rowSizeBytes: sidecar.rowSizeBytes,
    rowCount: sidecar.rowCount,
    byteLength: sidecar.byteLength,
    filePath: sidecar.filePath,
    checksum: sidecar.checksum,
  };
}

function openRegisteredStream(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream open request object is required", {
        recoverable: false,
      })
    );
  }
  if (!["playback", "diagnostics", "export", "validation"].includes(request.purpose)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream open purpose is required", {
        recoverable: false,
      })
    );
  }
  if (request.streamId == null && request.manifestPath == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream open requires streamId or manifestPath", {
        recoverable: false,
      })
    );
  }
  const streamEntry = resolveOpenStreamEntry(state, request);
  const readableLayouts = [...new Set(streamEntry.buffers.map((buffer) => buffer.layout))];
  return {
    streamId: streamEntry.stream.streamId,
    manifestVersion: streamEntry.stream.manifestVersion,
    readableLayouts,
    availableRanges: streamEntry.stream.availableRanges.map(copyStreamRange),
    storagePolicy: { ...streamEntry.stream.storagePolicy },
    metadata: deepCloneJson(streamEntry.stream.metadata),
  };
}

function resolveOpenStreamEntry(state, request) {
  if (request.streamId != null && state.streams.has(request.streamId)) {
    return findStreamEntry(state, request.streamId);
  }
  if (request.manifestPath != null) {
    return registerNativeFileStreamManifest(state, request);
  }
  return findStreamEntry(state, request.streamId);
}

function resolveStreamEntryByIdOrManifest(state, request) {
  if (request.manifestPath != null) {
    return registerNativeFileStreamManifest(state, request);
  }
  return findStreamEntry(state, request.streamId);
}

function validateStreamIdOrManifestPathRequest(request, label) {
  if (request.streamId == null && request.manifestPath == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} requires streamId or manifestPath`, {
        recoverable: false,
      })
    );
  }
  if (request.streamId != null) {
    requireNonemptyString(request.streamId, "streamId");
  }
  if (request.manifestPath != null) {
    requireNonemptyString(request.manifestPath, "manifestPath");
  }
}

function readRegisteredStreamRange(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream range request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.eventKinds?.length) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "event kind filtering is not available for this stream", {
        recoverable: false,
      })
    );
  }
  if (request.pathKeys != null) {
    if (!Array.isArray(request.pathKeys)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "pathKeys must be an array", {
          recoverable: false,
        })
      );
    }
    request.pathKeys.forEach((pathKey, index) => requireSafeUint64(pathKey, `pathKeys[${index}]`));
  }
  if (request.chunkIndices != null) {
    normalizeChunkIndexSelection(request.chunkIndices, "chunkIndices");
  }
  validateStreamIdOrManifestPathRequest(request, "stream range request");
  const streamEntry = resolveStreamEntryByIdOrManifest(state, request);
  const selectionRequest = {
    ...request,
    streamId: streamEntry.stream.streamId,
  };
  const selection = selectStreamRanges(streamEntry, selectionRequest);
  const selected = selection.items;
  const totalBytes = selected.reduce((sum, item) => sum + item.buffer.byteLength, 0);
  if (request.maxBytes != null) {
    requireNonnegativeInteger(request.maxBytes, "maxBytes");
    if (totalBytes > request.maxBytes) {
      throw new SolverBridgeError(
        createStatus("stream_memory_pressure", "halt", "requested stream range exceeds maxBytes", {
          recoverable: true,
          details: { requestedBytes: totalBytes, maxBytes: request.maxBytes },
        })
      );
    }
  }
  return {
    streamId: streamEntry.stream.streamId,
    ranges: selected.map((item) => copyStreamRange(item.range)),
    buffers: selected.map(createReadbackBufferDescriptor),
    diagnostics: selection.diagnostics,
    status: createStatus("ok", "ok", "stream range read"),
  };
}

function createReadbackBufferDescriptor(item) {
  return {
    ...copyBufferDescriptor(item.descriptor),
    byteOffset: 0,
    byteLength: item.buffer.byteLength,
    rowCount: item.rowCount,
    checksum: fnv1a64ArrayBufferHex(item.buffer),
    buffer: item.buffer,
  };
}

function copyStreamDescriptor(stream) {
  return {
    streamId: stream.streamId,
    manifestVersion: stream.manifestVersion,
    indexLayout: stream.indexLayout,
    availableRanges: stream.availableRanges.map(copyStreamRange),
    storagePolicy: { ...stream.storagePolicy },
    metadata: deepCloneJson(stream.metadata),
  };
}

function validateCreatePathHistoryStreamRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history stream request object is required", {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(request.runId, "runId");
  if (request.datasetId != null) {
    requireNonemptyString(request.datasetId, "datasetId");
  }
  requireNonemptyString(request.streamId, "streamId");
  if (!Array.isArray(request.pathRows) || request.pathRows.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pathRows must be a non-empty array", {
        recoverable: false,
      })
    );
  }
  request.pathRows.forEach(validatePathHistoryRowF64);
  if (request.rowsPerChunk != null) {
    requirePositiveInteger(request.rowsPerChunk, "rowsPerChunk");
  }
}

function normalizePathHistoryStreamStoragePolicy(storagePolicy) {
  if (storagePolicy == null) {
    return {
      target: "caller-buffer",
      durable: false,
      maxBytes: 0,
    };
  }
  if (storagePolicy.target === "caller-buffer" && !storagePolicy.durable) {
    requireNonnegativeInteger(storagePolicy.maxBytes, "storagePolicy.maxBytes");
    return {
      target: "caller-buffer",
      durable: false,
      maxBytes: storagePolicy.maxBytes,
    };
  }
  if (storagePolicy.target === "native-file" && storagePolicy.durable) {
    requireNonnegativeInteger(storagePolicy.maxBytes, "storagePolicy.maxBytes");
    if (storagePolicy.basePath != null) {
      requireNonemptyString(storagePolicy.basePath, "storagePolicy.basePath");
    }
    return {
      target: "native-file",
      durable: true,
      maxBytes: storagePolicy.maxBytes,
      basePath: storagePolicy.basePath,
    };
  }
  if (storagePolicy.target === "native-file") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "native-file storage must be durable", {
        recoverable: false,
      })
    );
  }
  if (storagePolicy.target === "opfs" || storagePolicy.target === "worker-memory") {
    throw new SolverBridgeError(
      createStatus(
        "unsupported_browser_storage",
        "halt",
        "path-history bridge stream storage target is not available in this bridge",
        {
          recoverable: true,
          details: {
            requestedTarget: storagePolicy.target,
            requestedDurable: storagePolicy.durable,
          },
        }
      )
    );
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "path-history storage target is invalid", {
      recoverable: false,
      details: { requestedTarget: storagePolicy.target },
    })
  );
}

function hasNodeFileStorage() {
  return Boolean(
    globalThis.process?.getBuiltinModule?.("fs") &&
      globalThis.process?.getBuiltinModule?.("path")
  );
}

function requireNativeFileStorageModules() {
  const fs = globalThis.process?.getBuiltinModule?.("fs");
  const path = globalThis.process?.getBuiltinModule?.("path");
  if (!fs || !path) {
    throw new SolverBridgeError(
      createStatus("unsupported_browser_storage", "halt", "native-file stream storage is not available", {
        recoverable: true,
      })
    );
  }
  return { fs, path };
}

function prepareNativeFileStreamStorage(streamId, storagePolicy) {
  const { fs, path } = requireNativeFileStorageModules();
  const basePath = path.resolve(
    storagePolicy.basePath ?? path.join(getNativeProcessCwd(), DEFAULT_NATIVE_FILE_STREAM_BASE_PATH)
  );
  const streamPath = path.join(basePath, sanitizeStoragePathSegment(streamId));
  fs.rmSync(streamPath, { recursive: true, force: true });
  fs.mkdirSync(streamPath, { recursive: true });
  return {
    fs,
    path,
    basePath,
    streamPath,
    indexPath: path.join(streamPath, "stream-index.stream_index.v1.bin"),
    manifestPath: path.join(streamPath, "stream-manifest.json"),
  };
}

function normalizeAssemblyGraphStoreStoragePolicy(storagePolicy) {
  const policy = storagePolicy ?? {
    target: "native-file",
    durable: true,
    maxBytes: 0,
  };
  if (policy.target === "native-file" && policy.durable) {
    requireNonnegativeInteger(policy.maxBytes, "storagePolicy.maxBytes");
    if (policy.basePath != null) {
      requireNonemptyString(policy.basePath, "storagePolicy.basePath");
    }
    return {
      target: "native-file",
      durable: true,
      maxBytes: policy.maxBytes,
      basePath: policy.basePath,
    };
  }
  if (policy.target === "native-file") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph native-file storage must be durable", {
        recoverable: false,
      })
    );
  }
  if (policy.target === "caller-buffer") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph store requires durable storage", {
        recoverable: false,
      })
    );
  }
  if (policy.target === "opfs" || policy.target === "worker-memory") {
    throw new SolverBridgeError(
      createStatus(
        "unsupported_browser_storage",
        "halt",
        "assembly graph store storage target is not available in this bridge",
        {
          recoverable: true,
          details: {
            requestedTarget: policy.target,
            requestedDurable: policy.durable,
          },
        }
      )
    );
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "assembly graph store storage target is invalid", {
      recoverable: false,
      details: { requestedTarget: policy.target },
    })
  );
}

function prepareNativeFileAssemblyGraphStoreStorage(storeId, storagePolicy) {
  const { fs, path } = requireNativeFileStorageModules();
  const basePath = path.resolve(
    storagePolicy.basePath ?? path.join(getNativeProcessCwd(), DEFAULT_NATIVE_FILE_ASSEMBLY_GRAPH_BASE_PATH)
  );
  const storePath = path.join(basePath, sanitizeStoragePathSegment(storeId));
  fs.rmSync(storePath, { recursive: true, force: true });
  fs.mkdirSync(storePath, { recursive: true });
  return {
    fs,
    path,
    basePath,
    storePath,
    indexPath: path.join(storePath, "assembly-graph-index.assembly_graph_index.v1.bin"),
    manifestPath: path.join(storePath, "assembly-graph.meta.json"),
  };
}

function writeNativeFileAssemblyGraphDataset(storage, descriptor) {
  const filePath = storage.path.join(
    storage.storePath,
    `${descriptor.bufferId}.${descriptor.layout}.bin`
  );
  const buffer = getBufferDescriptorArrayBuffer(descriptor);
  storage.fs.writeFileSync(filePath, new Uint8Array(buffer));
  return {
    ...copyBufferDescriptorWithoutPayload(descriptor),
    storageTarget: "native-file",
    filePath,
    checksum: fnv1a64ArrayBufferHex(buffer),
  };
}

function createAssemblyGraphStoreManifest(storeId, storage, storagePolicy, dataset, summary, buffers) {
  const datasetByLayout = new Map(buffers.map((buffer) => [buffer.layout, buffer]));
  const datasetForLayout = (layout) => {
    const descriptor = datasetByLayout.get(layout);
    return {
      layout,
      rowSizeBytes: descriptor?.rowSizeBytes ?? BINARY_LAYOUT_ROW_SIZE_BYTES.get(layout),
      rowCount: descriptor?.rowCount ?? 0,
      byteLength: descriptor?.byteLength ?? 0,
      path: descriptor?.filePath,
      checksum: descriptor?.checksum,
    };
  };
  const index = buildAssemblyGraphStoreIndex(dataset, datasetByLayout);
  index.sidecar = writeNativeFileAssemblyGraphIndexSidecar(storage, index);
  return {
    storeId,
    manifestVersion: "solver-assembly-graph-manifest.v1",
    numericType: "f64",
    byteOrder: "little-endian",
    timeRange: deepCloneJson(summary.timeRange),
    durable: true,
    metadataPath: storage.manifestPath,
    storagePolicy: {
      ...storagePolicy,
      basePath: storage.basePath,
      storePath: storage.storePath,
      manifestPath: storage.manifestPath,
    },
    summary: deepCloneJson(summary),
    datasets: {
      states: datasetForLayout("assembly_state.v1"),
      memberships: datasetForLayout("assembly_membership.v1"),
      hierarchy: datasetForLayout("assembly_hierarchy.v1"),
      events: datasetForLayout("assembly_events.v1"),
    },
    index,
  };
}

function buildAssemblyGraphStoreIndex(dataset, datasetByLayout) {
  const rows = [];
  const addIndexRow = (layout, keyKind, key, rowOffset, timeStart, timeEnd) => {
    if (key == null || key <= 0) {
      return;
    }
    const rowSizeBytes = datasetByLayout.get(layout)?.rowSizeBytes ?? BINARY_LAYOUT_ROW_SIZE_BYTES.get(layout);
    const byteStart = rowOffset * rowSizeBytes;
    rows.push({
      layout,
      keyKind,
      key,
      rowOffset,
      rowCount: 1,
      timeRange: { start: timeStart, end: timeEnd },
      byteRange: { start: byteStart, end: byteStart + rowSizeBytes },
    });
  };
  dataset.assemblyStates.forEach((row, rowOffset) => {
    addIndexRow("assembly_state.v1", "assembly", row.assemblyKey, rowOffset, row.timeStart, row.timeEnd);
  });
  dataset.memberships.forEach((row, rowOffset) => {
    addIndexRow("assembly_membership.v1", "path", row.pathKey, rowOffset, row.timeStart, row.timeEnd);
    addIndexRow("assembly_membership.v1", "assembly", row.assemblyKey, rowOffset, row.timeStart, row.timeEnd);
  });
  dataset.hierarchy.forEach((row, rowOffset) => {
    addIndexRow(
      "assembly_hierarchy.v1",
      "parent-assembly",
      row.parentAssemblyKey,
      rowOffset,
      row.timeStart,
      row.timeEnd
    );
    addIndexRow(
      "assembly_hierarchy.v1",
      "child-assembly",
      row.childAssemblyKey,
      rowOffset,
      row.timeStart,
      row.timeEnd
    );
  });
  dataset.events.forEach((row, rowOffset) => {
    addIndexRow("assembly_events.v1", "path", row.relatedPathKey, rowOffset, row.eventTime, row.eventTime);
    addIndexRow(
      "assembly_events.v1",
      "assembly",
      row.relatedAssemblyKey,
      rowOffset,
      row.eventTime,
      row.eventTime
    );
  });
  return {
    schema: "solver-assembly-graph-index.v1",
    indexedFilters: ["pathKey", "assemblyKey", "timeRange", "rowRange", "byteRange"],
    rowCount: rows.length,
    rows,
    summary: summarizeAssemblyGraphStoreIndex(rows),
  };
}

function summarizeAssemblyGraphStoreIndex(rows) {
  const countsByLayout = {};
  const countsByKeyKind = {};
  rows.forEach((row) => {
    countsByLayout[row.layout] = (countsByLayout[row.layout] ?? 0) + 1;
    countsByKeyKind[row.keyKind] = (countsByKeyKind[row.keyKind] ?? 0) + 1;
  });
  return {
    schema: "solver-assembly-graph-index-summary.v1",
    rowCount: rows.length,
    countsByLayout,
    countsByKeyKind,
  };
}

function writeNativeFileAssemblyGraphIndexSidecar(storage, index) {
  const buffer = encodeAssemblyGraphIndexRowsV1(index.rows);
  storage.fs.writeFileSync(storage.indexPath, new Uint8Array(buffer));
  return {
    schema: "solver-assembly-graph-index-sidecar.v1",
    indexLayout: "assembly_graph_index.v1",
    numericType: "f64",
    byteOrder: "little-endian",
    rowSizeBytes: ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES,
    rowCount: index.rows.length,
    byteLength: buffer.byteLength,
    filePath: storage.indexPath,
    checksum: fnv1a64ArrayBufferHex(buffer),
  };
}

function encodeAssemblyGraphIndexRowsV1(rows) {
  const buffer = new ArrayBuffer(rows.length * ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    const offset = index * ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES;
    view.setUint32(offset, requireAssemblyGraphIndexLayoutCode(row.layout), true);
    view.setUint32(offset + 4, requireAssemblyGraphIndexKeyKindCode(row.keyKind), true);
    view.setBigUint64(offset + 8, BigInt(row.key), true);
    view.setBigUint64(offset + 16, BigInt(row.rowOffset), true);
    view.setBigUint64(offset + 24, BigInt(row.rowCount), true);
    view.setFloat64(offset + 32, row.timeRange.start, true);
    view.setFloat64(offset + 40, row.timeRange.end, true);
    view.setBigUint64(offset + 48, BigInt(row.byteRange.start), true);
    view.setBigUint64(offset + 56, BigInt(row.byteRange.end - row.byteRange.start), true);
    view.setUint32(offset + 64, row.stateFlags ?? 0, true);
    view.setUint32(offset + 68, 0, true);
  });
  return buffer;
}

function requireAssemblyGraphIndexLayoutCode(layout) {
  const code = ASSEMBLY_GRAPH_INDEX_LAYOUT_CODES.get(layout);
  if (code == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph index layout is invalid", {
        recoverable: false,
        details: { layout },
      })
    );
  }
  return code;
}

function requireAssemblyGraphIndexKeyKindCode(keyKind) {
  const code = ASSEMBLY_GRAPH_INDEX_KEY_KIND_CODES.get(keyKind);
  if (code == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly graph index key kind is invalid", {
        recoverable: false,
        details: { keyKind },
      })
    );
  }
  return code;
}

function writeNativeFileAssemblyGraphManifest(storage, store) {
  storage.fs.writeFileSync(storage.manifestPath, `${JSON.stringify(store, null, 2)}\n`);
}

function getNativeProcessCwd() {
  return typeof globalThis.process?.cwd === "function" ? globalThis.process.cwd() : ".";
}

function sanitizeStoragePathSegment(value) {
  const sanitized = String(value).replace(/[^A-Za-z0-9._-]+/gu, "_").replace(/^_+|_+$/gu, "");
  return sanitized || "stream";
}

function writeNativeFileStreamChunk(storage, chunkIndex, descriptor, buffer) {
  const chunkName = `chunk-${String(chunkIndex).padStart(6, "0")}.path_segment.v1.bin`;
  const filePath = storage.path.join(storage.streamPath, chunkName);
  storage.fs.writeFileSync(filePath, new Uint8Array(buffer));
  return {
    ...copyBufferDescriptorWithoutPayload(descriptor),
    storageTarget: "native-file",
    filePath,
  };
}

function writeNativeFileStreamIndexSidecar(storage, index) {
  const buffer = encodeStreamIndexRowsV1(index.pathIndexRows);
  storage.fs.writeFileSync(storage.indexPath, new Uint8Array(buffer));
  return {
    schema: "solver-stream-index-sidecar.v1",
    indexLayout: "stream_index.v1",
    numericType: "f64",
    byteOrder: "little-endian",
    rowSizeBytes: STREAM_INDEX_ROW_V1_BYTES,
    rowCount: index.pathIndexRows.length,
    byteLength: buffer.byteLength,
    filePath: storage.indexPath,
    checksum: fnv1a64ArrayBufferHex(buffer),
  };
}

function encodeStreamIndexRowsV1(rows) {
  const buffer = new ArrayBuffer(rows.length * STREAM_INDEX_ROW_V1_BYTES);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    const offset = index * STREAM_INDEX_ROW_V1_BYTES;
    view.setBigUint64(offset, BigInt(row.pathKey), true);
    view.setBigUint64(offset + 8, BigInt(row.chunkIndex), true);
    view.setBigUint64(offset + 16, BigInt(row.rowOffset), true);
    view.setBigUint64(offset + 24, BigInt(row.rowCount), true);
    view.setFloat64(offset + 32, row.timeRange.start, true);
    view.setFloat64(offset + 40, row.timeRange.end, true);
    view.setBigUint64(offset + 48, BigInt(row.byteRange.start), true);
    view.setBigUint64(offset + 56, BigInt(row.byteRange.end - row.byteRange.start), true);
  });
  return buffer;
}

function writeNativeFileStreamManifest(storage, stream, buffers, index = null) {
  const manifest = {
    schema: "solver-native-file-stream-manifest.v1",
    stream: copyStreamDescriptor(stream),
    chunks: buffers.map(copyBufferDescriptorWithoutPayload),
  };
  if (index) {
    manifest.index = {
      ...index,
      pathIndexRows: index.pathIndexRows.map(copyPathHistoryIndexRow),
    };
  }
  storage.fs.writeFileSync(storage.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function resolveAssemblyGraphStoreEntry(state, request) {
  if (request.storeId != null && state.assemblyGraphStores.has(request.storeId)) {
    return state.assemblyGraphStores.get(request.storeId);
  }
  if (request.manifestPath != null) {
    return registerNativeFileAssemblyGraphStoreManifest(state, request);
  }
  if (request.storeId != null) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph store not found", {
        recoverable: false,
        details: { storeId: request.storeId },
      })
    );
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "assembly graph store request requires storeId or manifestPath", {
      recoverable: false,
    })
  );
}

function registerNativeFileAssemblyGraphStoreManifest(state, request) {
  requireNonemptyString(request.manifestPath, "manifestPath");
  const { fs, path } = requireNativeFileStorageModules();
  const manifestPath = path.resolve(request.manifestPath);
  const manifestText = fs.readFileSync(manifestPath, "utf8");
  let manifest;
  try {
    manifest = JSON.parse(manifestText);
  } catch (error) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph manifest is not valid JSON", {
        recoverable: false,
        details: { manifestPath, error: error instanceof Error ? error.message : String(error) },
      })
    );
  }
  const store = normalizeAssemblyGraphStoreManifest(manifest, manifestPath);
  if (request.storeId != null && request.storeId !== store.storeId) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "storeId does not match assembly graph manifest", {
        recoverable: false,
        details: { requestedStoreId: request.storeId, manifestStoreId: store.storeId },
      })
    );
  }
  const buffers = [
    createAssemblyGraphStoreBufferDescriptor("assembly-states", store.datasets.states),
    createAssemblyGraphStoreBufferDescriptor("assembly-memberships", store.datasets.memberships),
    createAssemblyGraphStoreBufferDescriptor("assembly-hierarchy", store.datasets.hierarchy),
    createAssemblyGraphStoreBufferDescriptor("assembly-events", store.datasets.events),
  ];
  const entry = { store, buffers };
  state.assemblyGraphStores.set(store.storeId, entry);
  return entry;
}

function normalizeAssemblyGraphStoreManifest(manifest, manifestPath) {
  if (manifest?.manifestVersion !== "solver-assembly-graph-manifest.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph manifest version is not supported", {
        recoverable: false,
        details: { manifestPath, manifestVersion: manifest?.manifestVersion },
      })
    );
  }
  requireNonemptyString(manifest.storeId, "manifest.storeId");
  if (manifest.numericType !== "f64" || manifest.byteOrder !== "little-endian") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph manifest numeric format is not supported", {
        recoverable: false,
        details: {
          storeId: manifest.storeId,
          numericType: manifest.numericType,
          byteOrder: manifest.byteOrder,
        },
      })
    );
  }
  const { fs, path } = requireNativeFileStorageModules();
  const manifestDir = path.dirname(manifestPath);
  const storagePolicy = manifest.storagePolicy || {};
  if (storagePolicy.target !== "native-file") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph manifest does not describe native-file storage", {
        recoverable: false,
        details: { storeId: manifest.storeId, storageTarget: storagePolicy.target },
      })
    );
  }
  const storePath = path.resolve(storagePolicy.storePath ?? manifestDir);
  const datasets = {
    states: normalizeAssemblyGraphStoreDataset(
      manifest.datasets?.states,
      "states",
      "assembly_state.v1",
      manifestDir,
      fs,
      path
    ),
    memberships: normalizeAssemblyGraphStoreDataset(
      manifest.datasets?.memberships,
      "memberships",
      "assembly_membership.v1",
      manifestDir,
      fs,
      path
    ),
    hierarchy: normalizeAssemblyGraphStoreDataset(
      manifest.datasets?.hierarchy,
      "hierarchy",
      "assembly_hierarchy.v1",
      manifestDir,
      fs,
      path
    ),
    events: normalizeAssemblyGraphStoreDataset(
      manifest.datasets?.events,
      "events",
      "assembly_events.v1",
      manifestDir,
      fs,
      path
    ),
  };
  return {
    storeId: manifest.storeId,
    manifestVersion: manifest.manifestVersion,
    numericType: manifest.numericType,
    byteOrder: manifest.byteOrder,
    timeRange: manifest.timeRange ? { ...manifest.timeRange } : null,
    durable: manifest.durable !== false,
    metadataPath: manifestPath,
    storagePolicy: {
      ...storagePolicy,
      target: "native-file",
      durable: true,
      maxBytes: storagePolicy.maxBytes ?? 0,
      basePath: storagePolicy.basePath ? path.resolve(storagePolicy.basePath) : path.dirname(storePath),
      storePath,
      manifestPath,
    },
    summary: deepCloneJson(manifest.summary),
    datasets,
    index: normalizeAssemblyGraphStoreIndex(manifest.index, datasets, manifestDir, fs, path),
  };
}

function normalizeAssemblyGraphStoreIndex(index, datasets, manifestDir, fs, path) {
  if (index == null) {
    return null;
  }
  if (index?.schema !== "solver-assembly-graph-index.v1" || !Array.isArray(index.rows)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index schema is not supported", {
        recoverable: false,
        details: { schema: index?.schema },
      })
    );
  }
  if (index.rowCount !== index.rows.length) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index row count mismatch", {
        recoverable: false,
        details: { declaredRowCount: index.rowCount, actualRowCount: index.rows.length },
      })
    );
  }
  const rows = index.rows.map((row, rowIndex) => normalizeAssemblyGraphIndexRow(row, rowIndex, datasets));
  const sidecar = index.sidecar
    ? normalizeAssemblyGraphStoreIndexSidecar(index.sidecar, manifestDir, fs, path, rows)
    : null;
  return {
    schema: "solver-assembly-graph-index.v1",
    indexedFilters: Array.isArray(index.indexedFilters) ? [...index.indexedFilters] : [],
    rowCount: rows.length,
    rows,
    summary: summarizeAssemblyGraphStoreIndex(rows),
    ...(sidecar ? { sidecar } : {}),
  };
}

function normalizeAssemblyGraphIndexRow(row, rowIndex, datasets) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index row is invalid", {
        recoverable: false,
        details: { rowIndex },
      })
    );
  }
  const dataset = getAssemblyGraphStoreDatasetForLayout({ datasets }, row.layout);
  if (!["path", "assembly", "parent-assembly", "child-assembly"].includes(row.keyKind)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index key kind is invalid", {
        recoverable: false,
        details: { rowIndex, keyKind: row.keyKind },
      })
    );
  }
  requireSafeUint64(row.key, `index.rows[${rowIndex}].key`);
  requireSafeUint64(row.rowOffset, `index.rows[${rowIndex}].rowOffset`);
  requireSafeUint64(row.rowCount, `index.rows[${rowIndex}].rowCount`);
  validateRange(row.timeRange, `index.rows[${rowIndex}].timeRange`);
  validateRange(row.byteRange, `index.rows[${rowIndex}].byteRange`);
  if (row.rowOffset + row.rowCount > dataset.rowCount) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index row points outside dataset", {
        recoverable: false,
        details: { rowIndex, layout: row.layout, rowOffset: row.rowOffset, rowCount: row.rowCount },
      })
    );
  }
  return {
    layout: row.layout,
    keyKind: row.keyKind,
    key: row.key,
    rowOffset: row.rowOffset,
    rowCount: row.rowCount,
    timeRange: { ...row.timeRange },
    byteRange: { ...row.byteRange },
  };
}

function normalizeAssemblyGraphStoreIndexSidecar(sidecar, manifestDir, fs, path, rows) {
  if (!sidecar || typeof sidecar !== "object" || Array.isArray(sidecar)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar is invalid", {
        recoverable: false,
      })
    );
  }
  if (
    sidecar.schema !== "solver-assembly-graph-index-sidecar.v1" ||
    sidecar.indexLayout !== "assembly_graph_index.v1" ||
    sidecar.numericType !== "f64" ||
    sidecar.byteOrder !== "little-endian" ||
    sidecar.rowSizeBytes !== ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES
  ) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar schema is not supported", {
        recoverable: false,
        details: {
          schema: sidecar.schema,
          indexLayout: sidecar.indexLayout,
          numericType: sidecar.numericType,
          byteOrder: sidecar.byteOrder,
          rowSizeBytes: sidecar.rowSizeBytes,
        },
      })
    );
  }
  requireSafeUint64(sidecar.rowCount, "index.sidecar.rowCount");
  requireSafeUint64(sidecar.byteLength, "index.sidecar.byteLength");
  requireNonemptyString(sidecar.filePath, "index.sidecar.filePath");
  requireNonemptyString(sidecar.checksum, "index.sidecar.checksum");
  if (sidecar.rowCount !== rows.length) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar row count mismatch", {
        recoverable: false,
        details: { sidecarRowCount: sidecar.rowCount, indexRowCount: rows.length },
      })
    );
  }
  if (sidecar.byteLength !== sidecar.rowCount * ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar byte length mismatch", {
        recoverable: false,
        details: { rowCount: sidecar.rowCount, byteLength: sidecar.byteLength },
      })
    );
  }
  const filePath = path.isAbsolute(sidecar.filePath)
    ? sidecar.filePath
    : path.resolve(manifestDir, sidecar.filePath);
  let bytes;
  try {
    bytes = fs.readFileSync(filePath);
  } catch (error) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar file is missing", {
        recoverable: false,
        details: { filePath, error: error instanceof Error ? error.message : String(error) },
      })
    );
  }
  if (bytes.byteLength !== sidecar.byteLength) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar file size mismatch", {
        recoverable: false,
        details: {
          filePath,
          expectedBytes: sidecar.byteLength,
          actualBytes: bytes.byteLength,
        },
      })
    );
  }
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const checksum = fnv1a64ArrayBufferHex(buffer);
  if (checksum !== sidecar.checksum) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph index sidecar checksum mismatch", {
        recoverable: false,
        details: { filePath, expectedChecksum: sidecar.checksum, actualChecksum: checksum },
      })
    );
  }
  validateAssemblyGraphIndexSidecarRows(buffer, rows);
  return {
    schema: sidecar.schema,
    indexLayout: sidecar.indexLayout,
    numericType: sidecar.numericType,
    byteOrder: sidecar.byteOrder,
    rowSizeBytes: sidecar.rowSizeBytes,
    rowCount: sidecar.rowCount,
    byteLength: sidecar.byteLength,
    filePath,
    checksum: sidecar.checksum,
  };
}

function validateAssemblyGraphIndexSidecarRows(buffer, rows) {
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    const offset = index * ASSEMBLY_GRAPH_INDEX_ROW_V1_BYTES;
    const sidecarRow = {
      layoutCode: view.getUint32(offset, true),
      keyKind: view.getUint32(offset + 4, true),
      key: Number(view.getBigUint64(offset + 8, true)),
      rowOffset: Number(view.getBigUint64(offset + 16, true)),
      rowCount: Number(view.getBigUint64(offset + 24, true)),
      timeStart: view.getFloat64(offset + 32, true),
      timeEnd: view.getFloat64(offset + 40, true),
      byteOffset: Number(view.getBigUint64(offset + 48, true)),
      byteLength: Number(view.getBigUint64(offset + 56, true)),
      stateFlags: view.getUint32(offset + 64, true),
    };
    const expectedByteLength = row.byteRange.end - row.byteRange.start;
    if (
      sidecarRow.layoutCode !== requireAssemblyGraphIndexLayoutCode(row.layout) ||
      sidecarRow.keyKind !== requireAssemblyGraphIndexKeyKindCode(row.keyKind) ||
      sidecarRow.key !== row.key ||
      sidecarRow.rowOffset !== row.rowOffset ||
      sidecarRow.rowCount !== row.rowCount ||
      sidecarRow.timeStart !== row.timeRange.start ||
      sidecarRow.timeEnd !== row.timeRange.end ||
      sidecarRow.byteOffset !== row.byteRange.start ||
      sidecarRow.byteLength !== expectedByteLength
    ) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "assembly graph index sidecar row mismatch", {
          recoverable: false,
          details: { rowIndex: index, sidecarRow, manifestRow: row },
        })
      );
    }
  });
}

function normalizeAssemblyGraphStoreDataset(dataset, name, layout, manifestDir, fs, path) {
  if (!dataset || typeof dataset !== "object" || Array.isArray(dataset)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph manifest is missing ${name} dataset`, {
        recoverable: false,
      })
    );
  }
  if (dataset.layout !== layout) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph ${name} layout is invalid`, {
        recoverable: false,
        details: { expectedLayout: layout, actualLayout: dataset.layout },
      })
    );
  }
  const expectedRowSize = BINARY_LAYOUT_ROW_SIZE_BYTES.get(layout);
  if (dataset.rowSizeBytes !== expectedRowSize) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph ${name} row size is invalid`, {
        recoverable: false,
        details: { expectedRowSize, actualRowSize: dataset.rowSizeBytes },
      })
    );
  }
  requireSafeUint64(dataset.rowCount, `datasets.${name}.rowCount`);
  requireSafeUint64(dataset.byteLength, `datasets.${name}.byteLength`);
  requireNonemptyString(dataset.path, `datasets.${name}.path`);
  const filePath = path.isAbsolute(dataset.path)
    ? dataset.path
    : path.resolve(manifestDir, dataset.path);
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (error) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph ${name} file is missing`, {
        recoverable: false,
        details: { filePath, error: error instanceof Error ? error.message : String(error) },
      })
    );
  }
  if (!stats.isFile() || stats.size !== dataset.byteLength) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph ${name} file size does not match manifest`, {
        recoverable: false,
        details: {
          filePath,
          expectedBytes: dataset.byteLength,
          actualBytes: stats.size,
        },
      })
    );
  }
  if (dataset.byteLength !== dataset.rowCount * dataset.rowSizeBytes) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", `assembly graph ${name} byte length is not a whole-row range`, {
        recoverable: false,
      })
    );
  }
  if (dataset.checksum != null) {
    const fileBuffer = fs.readFileSync(filePath);
    const checksum = fnv1a64ArrayBufferHex(
      fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength)
    );
    if (checksum !== dataset.checksum) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", `assembly graph ${name} checksum mismatch`, {
          recoverable: false,
          details: { filePath, expectedChecksum: dataset.checksum, actualChecksum: checksum },
        })
      );
    }
  }
  return {
    layout,
    rowSizeBytes: dataset.rowSizeBytes,
    rowCount: dataset.rowCount,
    byteLength: dataset.byteLength,
    path: filePath,
    checksum: dataset.checksum,
  };
}

function createAssemblyGraphStoreBufferDescriptor(bufferId, dataset) {
  return {
    bufferId,
    layout: dataset.layout,
    byteOffset: 0,
    byteLength: dataset.byteLength,
    rowCount: dataset.rowCount,
    numericType: "f64",
    storageTarget: "native-file",
    filePath: dataset.path,
    checksum: dataset.checksum,
  };
}

function normalizeAssemblyGraphStoreReadLayouts(layouts) {
  if (layouts == null || layouts.length === 0) {
    return ["assembly_state.v1", "assembly_membership.v1", "assembly_hierarchy.v1", "assembly_events.v1"];
  }
  const allowed = new Set([
    "assembly_state.v1",
    "assembly_membership.v1",
    "assembly_hierarchy.v1",
    "assembly_events.v1",
  ]);
  return [...new Set(layouts)].map((layout, index) => {
    if (!allowed.has(layout)) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `layouts[${index}] is not an assembly graph layout`, {
          recoverable: false,
          details: { layout },
        })
      );
    }
    return layout;
  });
}

function getAssemblyGraphStoreDatasetForLayout(store, layout) {
  if (layout === "assembly_state.v1") {
    return store.datasets.states;
  }
  if (layout === "assembly_membership.v1") {
    return store.datasets.memberships;
  }
  if (layout === "assembly_hierarchy.v1") {
    return store.datasets.hierarchy;
  }
  if (layout === "assembly_events.v1") {
    return store.datasets.events;
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "assembly graph layout is not supported", {
      recoverable: false,
      details: { layout },
    })
  );
}

function readAssemblyGraphStoreRows(dataset, index, request) {
  const rowOffset = request.rowOffset ?? 0;
  if (rowOffset > dataset.rowCount) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph read rowOffset is outside dataset", {
        recoverable: false,
        details: { layout: dataset.layout, rowOffset, rowCount: dataset.rowCount },
      })
    );
  }
  const rowWindow = computeAssemblyGraphStoreReadRowWindow(dataset, request);
  const indexedOffsets = planAssemblyGraphStoreReadOffsets(dataset, index, request);
  if (indexedOffsets) {
    return {
      rows: readAssemblyGraphStoreRowsByOffsets(dataset, indexedOffsets),
      indexed: true,
      indexRowCount: indexedOffsets.length,
      indexSkippedRowCount: Math.max(0, dataset.rowCount - indexedOffsets.length),
    };
  }
  return {
    rows: readAssemblyGraphStoreRowsByRange(dataset, rowWindow.rowOffset, rowWindow.rowCount),
    indexed: false,
    indexRowCount: 0,
    indexSkippedRowCount: 0,
  };
}

function planAssemblyGraphStoreReadOffsets(dataset, index, request) {
  if (!index?.rows || !assemblyGraphStoreReadCanUseIndex(request)) {
    return null;
  }
  const rowWindow = computeAssemblyGraphStoreReadRowWindow(dataset, request);
  const intersect = (left, right) => new Set([...left].filter((value) => right.has(value)));
  const collect = (predicate) => collectAssemblyGraphStoreIndexOffsets(index, dataset.layout, predicate, rowWindow);
  let candidates = null;
  const applyFilter = (offsets) => {
    candidates = candidates == null ? offsets : intersect(candidates, offsets);
  };
  if (request.pathKey != null) {
    applyFilter(collect((row) => row.keyKind === "path" && row.key === request.pathKey));
  }
  if (request.assemblyKey != null) {
    applyFilter(
      collect(
        (row) =>
          ["assembly", "parent-assembly", "child-assembly"].includes(row.keyKind) && row.key === request.assemblyKey
      )
    );
  }
  if (request.timeRange != null) {
    applyFilter(collect((row) => rangeOverlapsOptional(row.timeRange, request.timeRange)));
  }
  if (request.byteRange != null) {
    applyFilter(collect((row) => byteRangeOverlapsOptional(row.byteRange, request.byteRange)));
  }
  return [...(candidates ?? new Set())].sort((left, right) => left - right);
}

function assemblyGraphStoreReadCanUseIndex(request) {
  return (
    request.pathKey != null ||
    request.assemblyKey != null ||
    request.timeRange != null ||
    request.byteRange != null
  );
}

function collectAssemblyGraphStoreIndexOffsets(index, layout, predicate, rowWindow) {
  const offsets = new Set();
  for (const row of index.rows) {
    if (row.layout !== layout || !predicate(row)) {
      continue;
    }
    for (let offset = row.rowOffset; offset < row.rowOffset + row.rowCount; offset += 1) {
      if (offset >= rowWindow.rowOffset && offset < rowWindow.rowEnd) {
        offsets.add(offset);
      }
    }
  }
  return offsets;
}

function computeAssemblyGraphStoreReadRowWindow(dataset, request) {
  const requestedStart = request.rowOffset ?? 0;
  const requestedEnd =
    request.rowCount == null ? dataset.rowCount : Math.min(dataset.rowCount, requestedStart + request.rowCount);
  let rowStart = Math.min(dataset.rowCount, requestedStart);
  let rowEnd = Math.max(rowStart, requestedEnd);
  if (request.byteRange != null) {
    const byteStart = Math.max(0, Math.min(dataset.byteLength, request.byteRange.start));
    const byteEnd = Math.max(byteStart, Math.min(dataset.byteLength, request.byteRange.end));
    const byteRowStart = Math.min(dataset.rowCount, Math.floor(byteStart / dataset.rowSizeBytes));
    const byteRowEnd = Math.min(dataset.rowCount, Math.ceil(byteEnd / dataset.rowSizeBytes));
    rowStart = Math.max(rowStart, byteRowStart);
    rowEnd = Math.min(rowEnd, byteRowEnd);
  }
  rowEnd = Math.max(rowStart, rowEnd);
  return {
    rowOffset: rowStart,
    rowEnd,
    rowCount: Math.max(0, rowEnd - rowStart),
  };
}

function readAssemblyGraphStoreRowsByRange(dataset, rowOffset, rowCount) {
  const { fs } = requireNativeFileStorageModules();
  const byteOffset = rowOffset * dataset.rowSizeBytes;
  const byteLength = rowCount * dataset.rowSizeBytes;
  const fileBuffer = fs.readFileSync(dataset.path);
  const source = fileBuffer.buffer.slice(
    fileBuffer.byteOffset + byteOffset,
    fileBuffer.byteOffset + byteOffset + byteLength
  );
  const view = new DataView(source);
  const rows = [];
  const reader = getAssemblyGraphRowReaderForLayout(dataset.layout);
  for (let index = 0; index < rowCount; index += 1) {
    rows.push(reader(view, index * dataset.rowSizeBytes));
  }
  return rows;
}

function readAssemblyGraphStoreRowsByOffsets(dataset, offsets) {
  if (offsets.length === 0) {
    return [];
  }
  if (offsets.some((offset) => offset < 0 || offset >= dataset.rowCount)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "assembly graph indexed read points outside dataset", {
        recoverable: false,
        details: { layout: dataset.layout, rowCount: dataset.rowCount },
      })
    );
  }
  const { fs } = requireNativeFileStorageModules();
  const reader = getAssemblyGraphRowReaderForLayout(dataset.layout);
  const rows = [];
  const fd = fs.openSync(dataset.path, "r");
  try {
    for (const run of groupContiguousOffsets(offsets)) {
      const byteOffset = run.start * dataset.rowSizeBytes;
      const byteLength = run.count * dataset.rowSizeBytes;
      const bytes = globalThis.Buffer?.allocUnsafe
        ? globalThis.Buffer.allocUnsafe(byteLength)
        : new Uint8Array(byteLength);
      const bytesRead = fs.readSync(fd, bytes, 0, byteLength, byteOffset);
      if (bytesRead !== byteLength) {
        throw new SolverBridgeError(
          createStatus("stream_read_failed", "halt", "assembly graph indexed read returned a short row range", {
            recoverable: false,
            details: { layout: dataset.layout, byteOffset, byteLength, bytesRead },
          })
        );
      }
      const source = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const view = new DataView(source);
      for (let index = 0; index < run.count; index += 1) {
        rows.push(reader(view, index * dataset.rowSizeBytes));
      }
    }
  } finally {
    fs.closeSync(fd);
  }
  return rows;
}

function groupContiguousOffsets(offsets) {
  const runs = [];
  for (const offset of offsets) {
    const last = runs[runs.length - 1];
    if (last && last.start + last.count === offset) {
      last.count += 1;
    } else {
      runs.push({ start: offset, count: 1 });
    }
  }
  return runs;
}

function filterAssemblyGraphRows(layout, rows, request) {
  return rows.filter((row) => assemblyGraphRowMatches(layout, row, request));
}

function assemblyGraphRowMatches(layout, row, request) {
  if (request.pathKey != null) {
    if (layout === "assembly_membership.v1" && row.pathKey !== request.pathKey) {
      return false;
    }
    if (layout === "assembly_events.v1" && row.relatedPathKey !== request.pathKey) {
      return false;
    }
    if (layout === "assembly_state.v1" || layout === "assembly_hierarchy.v1") {
      return false;
    }
  }
  if (request.assemblyKey != null) {
    if (layout === "assembly_state.v1" && row.assemblyKey !== request.assemblyKey) {
      return false;
    }
    if (layout === "assembly_membership.v1" && row.assemblyKey !== request.assemblyKey) {
      return false;
    }
    if (
      layout === "assembly_hierarchy.v1" &&
      row.parentAssemblyKey !== request.assemblyKey &&
      row.childAssemblyKey !== request.assemblyKey
    ) {
      return false;
    }
    if (layout === "assembly_events.v1" && row.relatedAssemblyKey !== request.assemblyKey) {
      return false;
    }
  }
  if (request.timeRange != null) {
    if (layout === "assembly_events.v1") {
      return rangeContainsPoint(request.timeRange, row.eventTime);
    }
    return rangeOverlapsOptional({ start: row.timeStart, end: row.timeEnd }, request.timeRange);
  }
  return true;
}

function rangeContainsPoint(range, point) {
  return range.start <= point && point <= range.end;
}

function getAssemblyGraphRowReaderForLayout(layout) {
  if (layout === "assembly_state.v1") {
    return readAssemblyStateRowF64FromView;
  }
  if (layout === "assembly_membership.v1") {
    return readAssemblyMembershipRowF64FromView;
  }
  if (layout === "assembly_hierarchy.v1") {
    return readAssemblyHierarchyRowF64FromView;
  }
  if (layout === "assembly_events.v1") {
    return readAssemblyEventRowF64FromView;
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "assembly graph layout is not readable", {
      recoverable: false,
      details: { layout },
    })
  );
}

function getAssemblyGraphRowWriterForLayout(layout) {
  if (layout === "assembly_state.v1") {
    return writeAssemblyStateRowF64ToView;
  }
  if (layout === "assembly_membership.v1") {
    return writeAssemblyMembershipRowF64ToView;
  }
  if (layout === "assembly_hierarchy.v1") {
    return writeAssemblyHierarchyRowF64ToView;
  }
  if (layout === "assembly_events.v1") {
    return writeAssemblyEventRowF64ToView;
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "assembly graph layout is not writable", {
      recoverable: false,
      details: { layout },
    })
  );
}

function copyAssemblyGraphStoreManifest(store) {
  return deepCloneJson(store);
}

function registerNativeFileStreamManifest(state, request) {
  requireNonemptyString(request.manifestPath, "manifestPath");
  const { fs, path } = requireNativeFileStorageModules();
  const manifestPath = path.resolve(request.manifestPath);
  const manifestText = fs.readFileSync(manifestPath, "utf8");
  let manifest;
  try {
    manifest = JSON.parse(manifestText);
  } catch (error) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest is not valid JSON", {
        recoverable: false,
        details: { manifestPath, error: error instanceof Error ? error.message : String(error) },
      })
    );
  }
  if (manifest?.schema !== "solver-native-file-stream-manifest.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest schema is not supported", {
        recoverable: false,
        details: { manifestPath, schema: manifest?.schema },
      })
    );
  }
  if (!manifest.stream || typeof manifest.stream !== "object" || Array.isArray(manifest.stream)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest is missing stream metadata", {
        recoverable: false,
        details: { manifestPath },
      })
    );
  }
  const manifestDir = path.dirname(manifestPath);
  const stream = normalizeNativeFileManifestStream(manifest.stream, manifestPath, manifestDir);
  if (request.streamId != null && request.streamId !== stream.streamId) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "streamId does not match native-file manifest", {
        recoverable: false,
        details: { requestedStreamId: request.streamId, manifestStreamId: stream.streamId },
      })
    );
  }
  const existingEntry = state.streams.get(stream.streamId);
  if (existingEntry) {
    const existingManifestPath = existingEntry.stream.storagePolicy?.manifestPath;
    if (existingManifestPath === manifestPath) {
      return existingEntry;
    }
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "native-file stream manifest conflicts with an existing stream", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          existingManifestPath,
          manifestPath,
        },
      })
    );
  }
  const chunks = normalizeNativeFileManifestChunks(manifest.chunks, manifestDir, fs);
  const nativeFileIndex = normalizeNativeFileManifestIndex(manifest.index, stream, manifestDir, fs);
  const entry = createStreamEntry(stream, chunks, {
    runId: request.runId ?? null,
    datasetId: request.datasetId ?? null,
    pathIndexRows: nativeFileIndex.pathIndexRows,
    indexSidecar: nativeFileIndex.sidecar,
  });
  state.streams.set(stream.streamId, entry);
  return entry;
}

function normalizeNativeFileManifestStream(stream, manifestPath, manifestDir) {
  requireNonemptyString(stream.streamId, "manifest.stream.streamId");
  if (stream.manifestVersion !== "solver-stream-manifest.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest has invalid stream version", {
        recoverable: false,
        details: { streamId: stream.streamId, manifestVersion: stream.manifestVersion },
      })
    );
  }
  if (stream.indexLayout !== "stream_index.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest has invalid index layout", {
        recoverable: false,
        details: { streamId: stream.streamId, indexLayout: stream.indexLayout },
      })
    );
  }
  if (!Array.isArray(stream.availableRanges)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest is missing ranges", {
        recoverable: false,
        details: { streamId: stream.streamId },
      })
    );
  }
  const storagePolicy = stream.storagePolicy || {};
  if (storagePolicy.target !== "native-file") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest does not describe native-file storage", {
        recoverable: false,
        details: { streamId: stream.streamId, storageTarget: storagePolicy.target },
      })
    );
  }
  const { path } = requireNativeFileStorageModules();
  const streamPath = path.resolve(storagePolicy.streamPath ?? manifestDir);
  return {
    streamId: stream.streamId,
    manifestVersion: stream.manifestVersion,
    indexLayout: stream.indexLayout,
    availableRanges: stream.availableRanges.map(copyStreamRange),
    storagePolicy: {
      ...storagePolicy,
      target: "native-file",
      durable: true,
      maxBytes: storagePolicy.maxBytes ?? 0,
      basePath: storagePolicy.basePath ? path.resolve(storagePolicy.basePath) : path.dirname(streamPath),
      streamPath,
      indexPath: storagePolicy.indexPath
        ? path.resolve(storagePolicy.indexPath)
        : path.join(streamPath, "stream-index.stream_index.v1.bin"),
      manifestPath,
    },
    metadata: deepCloneJson(stream.metadata),
  };
}

function normalizeNativeFileManifestChunks(chunks, manifestDir, fs) {
  if (!Array.isArray(chunks)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest is missing chunks", {
        recoverable: false,
      })
    );
  }
  const { path } = requireNativeFileStorageModules();
  return chunks.map((chunk, index) => {
    if (!chunk || typeof chunk !== "object" || Array.isArray(chunk)) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "native-file stream manifest chunk is invalid", {
          recoverable: false,
          details: { chunkIndex: index },
        })
      );
    }
    requireNonemptyString(chunk.bufferId, `chunks[${index}].bufferId`);
    requireNonemptyString(chunk.layout, `chunks[${index}].layout`);
    requireSafeUint64(chunk.byteLength, `chunks[${index}].byteLength`);
    requireSafeUint64(chunk.rowCount, `chunks[${index}].rowCount`);
    requireNonemptyString(chunk.filePath, `chunks[${index}].filePath`);
    const filePath = path.isAbsolute(chunk.filePath)
      ? chunk.filePath
      : path.resolve(manifestDir, chunk.filePath);
    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch (error) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "native-file stream chunk file is missing", {
          recoverable: false,
          details: {
            chunkIndex: index,
            filePath,
            error: error instanceof Error ? error.message : String(error),
          },
        })
      );
    }
    if (!stats.isFile() || stats.size !== chunk.byteLength) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "native-file stream chunk size does not match manifest", {
          recoverable: false,
          details: {
            chunkIndex: index,
            filePath,
            expectedBytes: chunk.byteLength,
            actualBytes: stats.size,
          },
        })
      );
    }
    return {
      ...copyBufferDescriptorWithoutPayload(chunk),
      storageTarget: "native-file",
      filePath,
    };
  });
}

function normalizeNativeFileManifestIndex(index, stream, manifestDir, fs) {
  if (index == null) {
    return { pathIndexRows: null, sidecar: null };
  }
  if (!index || typeof index !== "object" || Array.isArray(index)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index is invalid", {
        recoverable: false,
        details: { streamId: stream.streamId },
      })
    );
  }
  if (index.schema !== "solver-stream-index.v1" || index.indexLayout !== "stream_index.v1") {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index schema is not supported", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          schema: index.schema,
          indexLayout: index.indexLayout,
        },
      })
    );
  }
  if (index.streamId !== stream.streamId) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index streamId mismatch", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          indexStreamId: index.streamId,
        },
      })
    );
  }
  if (!Array.isArray(index.pathIndexRows)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index rows are missing", {
        recoverable: false,
        details: { streamId: stream.streamId },
      })
    );
  }
  const chunkCount = stream.availableRanges.length;
  const pathIndexRows = index.pathIndexRows.map((row, rowIndex) =>
    normalizeNativeFileManifestIndexRow(row, rowIndex, chunkCount)
  );
  const sidecar = index.sidecar
    ? normalizeNativeFileManifestIndexSidecar(index.sidecar, manifestDir, fs, stream, pathIndexRows)
    : null;
  return { pathIndexRows, sidecar };
}

function normalizeNativeFileManifestIndexSidecar(sidecar, manifestDir, fs, stream, pathIndexRows) {
  if (!sidecar || typeof sidecar !== "object" || Array.isArray(sidecar)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar is invalid", {
        recoverable: false,
        details: { streamId: stream.streamId },
      })
    );
  }
  if (
    sidecar.schema !== "solver-stream-index-sidecar.v1" ||
    sidecar.indexLayout !== "stream_index.v1" ||
    sidecar.rowSizeBytes !== STREAM_INDEX_ROW_V1_BYTES
  ) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar schema is not supported", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          schema: sidecar.schema,
          indexLayout: sidecar.indexLayout,
          rowSizeBytes: sidecar.rowSizeBytes,
        },
      })
    );
  }
  requireSafeUint64(sidecar.rowCount, "index.sidecar.rowCount");
  requireSafeUint64(sidecar.byteLength, "index.sidecar.byteLength");
  requireNonemptyString(sidecar.filePath, "index.sidecar.filePath");
  requireNonemptyString(sidecar.checksum, "index.sidecar.checksum");
  if (sidecar.rowCount !== pathIndexRows.length) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar row count mismatch", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          sidecarRowCount: sidecar.rowCount,
          manifestRowCount: pathIndexRows.length,
        },
      })
    );
  }
  if (sidecar.byteLength !== sidecar.rowCount * STREAM_INDEX_ROW_V1_BYTES) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar byte length mismatch", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          rowCount: sidecar.rowCount,
          byteLength: sidecar.byteLength,
        },
      })
    );
  }
  const { path } = requireNativeFileStorageModules();
  const filePath = path.isAbsolute(sidecar.filePath)
    ? sidecar.filePath
    : path.resolve(manifestDir, sidecar.filePath);
  let bytes;
  try {
    bytes = fs.readFileSync(filePath);
  } catch (error) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar file is missing", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          filePath,
          error: error instanceof Error ? error.message : String(error),
        },
      })
    );
  }
  if (bytes.byteLength !== sidecar.byteLength) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar file size mismatch", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          filePath,
          expectedBytes: sidecar.byteLength,
          actualBytes: bytes.byteLength,
        },
      })
    );
  }
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const checksum = fnv1a64ArrayBufferHex(buffer);
  if (checksum !== sidecar.checksum) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream index sidecar checksum mismatch", {
        recoverable: false,
        details: {
          streamId: stream.streamId,
          filePath,
          expectedChecksum: sidecar.checksum,
          actualChecksum: checksum,
        },
      })
    );
  }
  validateStreamIndexSidecarRows(buffer, pathIndexRows, stream.streamId);
  return copyStreamIndexSidecar({ ...sidecar, filePath });
}

function normalizeNativeFileManifestIndexRow(row, rowIndex, chunkCount) {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index row is invalid", {
        recoverable: false,
        details: { rowIndex },
      })
    );
  }
  requireSafeUint64(row.pathKey, `index.pathIndexRows[${rowIndex}].pathKey`);
  requireSafeUint64(row.chunkIndex, `index.pathIndexRows[${rowIndex}].chunkIndex`);
  requireSafeUint64(row.rowOffset, `index.pathIndexRows[${rowIndex}].rowOffset`);
  requireSafeUint64(row.rowCount, `index.pathIndexRows[${rowIndex}].rowCount`);
  validateRange(row.timeRange, `index.pathIndexRows[${rowIndex}].timeRange`);
  validateRange(row.frameRange, `index.pathIndexRows[${rowIndex}].frameRange`);
  validateRange(row.byteRange, `index.pathIndexRows[${rowIndex}].byteRange`);
  if (row.chunkIndex >= chunkCount) {
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "native-file stream manifest index row points outside chunks", {
        recoverable: false,
        details: { rowIndex, chunkIndex: row.chunkIndex, chunkCount },
      })
    );
  }
  return copyPathHistoryIndexRow(row);
}

function validateStreamIndexSidecarRows(buffer, pathIndexRows, streamId) {
  const view = new DataView(buffer);
  pathIndexRows.forEach((row, index) => {
    const offset = index * STREAM_INDEX_ROW_V1_BYTES;
    const sidecarRow = {
      pathKey: Number(view.getBigUint64(offset, true)),
      chunkIndex: Number(view.getBigUint64(offset + 8, true)),
      rowOffset: Number(view.getBigUint64(offset + 16, true)),
      rowCount: Number(view.getBigUint64(offset + 24, true)),
      timeStart: view.getFloat64(offset + 32, true),
      timeEnd: view.getFloat64(offset + 40, true),
      byteOffset: Number(view.getBigUint64(offset + 48, true)),
      byteLength: Number(view.getBigUint64(offset + 56, true)),
    };
    const expectedByteLength = row.byteRange.end - row.byteRange.start;
    if (
      sidecarRow.pathKey !== row.pathKey ||
      sidecarRow.chunkIndex !== row.chunkIndex ||
      sidecarRow.rowOffset !== row.rowOffset ||
      sidecarRow.rowCount !== row.rowCount ||
      sidecarRow.timeStart !== row.timeRange.start ||
      sidecarRow.timeEnd !== row.timeRange.end ||
      sidecarRow.byteOffset !== row.byteRange.start ||
      sidecarRow.byteLength !== expectedByteLength
    ) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "native-file stream index sidecar row mismatch", {
          recoverable: false,
          details: { streamId, rowIndex: index, sidecarRow, manifestRow: row },
        })
      );
    }
  });
}

function getBufferDescriptorArrayBuffer(descriptor) {
  if (descriptor?.buffer instanceof ArrayBuffer) {
    return descriptor.buffer;
  }
  if (descriptor?.filePath) {
    const { fs } = requireNativeFileStorageModules();
    const bytes = fs.readFileSync(descriptor.filePath);
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    if (descriptor.checksum && fnv1a64ArrayBufferHex(buffer) !== descriptor.checksum) {
      throw new SolverBridgeError(
        createStatus("stream_read_failed", "halt", "native-file stream chunk checksum mismatch", {
          recoverable: false,
          details: {
            bufferId: descriptor.bufferId,
            filePath: descriptor.filePath,
          },
        })
      );
    }
    return buffer;
  }
  return null;
}

function releaseRunStreams(state, runId) {
  if (runId == null) {
    return releaseAllStreams(state);
  }
  const ownedStreamIds = [];
  const ownerlessStreamIds = [];
  for (const [streamId, streamEntry] of state.streams.entries()) {
    if (streamEntry.runId === runId) {
      ownedStreamIds.push(streamId);
    } else if (streamEntry.runId == null) {
      ownerlessStreamIds.push(streamId);
    }
  }
  return releaseStreamsById(state, ownedStreamIds.length > 0 ? ownedStreamIds : ownerlessStreamIds);
}

function releaseAllStreams(state) {
  return releaseStreamsById(state, [...state.streams.keys()]);
}

function releaseStreamsById(state, streamIds) {
  const summary = {
    releasedStreamCount: 0,
    deletedNativeFileStreamCount: 0,
  };
  for (const streamId of streamIds) {
    const streamEntry = state.streams.get(streamId);
    if (!streamEntry) {
      continue;
    }
    if (cleanupNativeFileStreamEntry(streamEntry)) {
      summary.deletedNativeFileStreamCount += 1;
    }
    state.streams.delete(streamId);
    summary.releasedStreamCount += 1;
  }
  return summary;
}

function cleanupNativeFileStreamEntry(streamEntry) {
  const streamPath = streamEntry?.stream?.storagePolicy?.streamPath;
  if (streamEntry?.stream?.storagePolicy?.target !== "native-file" || !streamPath) {
    return false;
  }
  const { fs } = requireNativeFileStorageModules();
  fs.rmSync(streamPath, { recursive: true, force: true });
  return true;
}

function normalizePathHistoryStreamMetadata(metadata = {}) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history stream metadata must be an object", {
        recoverable: false,
      })
    );
  }
  const precisionPath = metadata.precisionPath ?? "auto";
  if (!DEFAULT_PRECISION_PATHS.includes(precisionPath)) {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "path-history stream metadata precision path is invalid", {
        recoverable: false,
      })
    );
  }
  if (metadata.diagnostics != null) {
    requireArray(metadata.diagnostics, "metadata.diagnostics");
    metadata.diagnostics.forEach(validateDiagnosticRecord);
  }
  const normalized = {
    schema: "solver-path-history-stream-metadata.v1",
    precisionPath,
    numericType: normalizeMetadataEnum(
      metadata.numericType,
      NUMERIC_TYPE_BY_ID,
      "f64",
      "metadata.numericType"
    ),
    numericChart: normalizeMetadataEnum(
      metadata.numericChart,
      NUMERIC_CHART_BY_ID,
      "absolute_f64",
      "metadata.numericChart"
    ),
    valueAuthority: normalizeMetadataEnum(
      metadata.valueAuthority,
      VALUE_AUTHORITY_BY_ID,
      "authoritative",
      "metadata.valueAuthority"
    ),
    appBufferAuthority: normalizeMetadataEnum(
      metadata.appBufferAuthority,
      VALUE_AUTHORITY_BY_ID,
      "authoritative",
      "metadata.appBufferAuthority"
    ),
    claimLevel: normalizeMetadataEnum(
      metadata.claimLevel,
      CLAIM_LEVEL_BY_ID,
      "interactive-preview",
      "metadata.claimLevel"
    ),
    units: normalizeMetadataString(metadata.units, "solver-units", "metadata.units"),
    coordinateFrame: normalizeMetadataString(metadata.coordinateFrame, "solver-frame", "metadata.coordinateFrame"),
    scaleNormalization: normalizeMetadataString(
      metadata.scaleNormalization,
      "none",
      "metadata.scaleNormalization"
    ),
    interpolationRule: normalizeMetadataString(
      metadata.interpolationRule,
      "linear-segment",
      "metadata.interpolationRule"
    ),
    provenance: metadata.provenance == null ? {} : deepCloneJson(metadata.provenance),
    diagnostics: metadata.diagnostics == null ? [] : metadata.diagnostics.map(deepCloneJson),
  };
  if (metadata.dynamicReplay != null) {
    normalized.dynamicReplay = normalizePathHistoryDynamicReplayMetadata(metadata.dynamicReplay);
  }
  if (metadata.lifecycle != null) {
    normalized.lifecycle = normalizePathHistoryStorageLifecycleMetadata(metadata.lifecycle);
  }
  return normalized;
}

function normalizePathHistoryStorageLifecycleMetadata(metadata) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle metadata must be an object", {
        recoverable: false,
      })
    );
  }
  if (metadata.schema !== "solver-path-history-storage-lifecycle-metadata.v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle metadata schema is invalid", {
        recoverable: false,
      })
    );
  }
  if (metadata.policy == null) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle metadata policy is required", {
        recoverable: false,
      })
    );
  }
  requireArray(metadata.decisions, "lifecycle.decisions");
  return {
    schema: "solver-path-history-storage-lifecycle-metadata.v1",
    policy: normalizeStorageLifecyclePolicy(metadata.policy),
    summary: normalizePathHistoryStorageLifecycleSummaryMetadata(metadata.summary),
    decisions: metadata.decisions.map((decision, index) =>
      normalizePathHistoryLifecycleDecisionMetadata(decision, `lifecycle.decisions[${index}]`)
    ),
    ...(metadata.deepIndex == null ? {} : {
      deepIndex: normalizePathHistoryDeepIndexMetadata(metadata.deepIndex),
    }),
  };
}

function normalizePathHistoryDeepIndexMetadata(deepIndex) {
  if (!deepIndex || typeof deepIndex !== "object" || Array.isArray(deepIndex)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history deep-index metadata must be an object", {
        recoverable: false,
      })
    );
  }
  if (
    deepIndex.schema !== "solver-path-history-deep-index.v1" ||
    deepIndex.indexKind !== "spacetime" ||
    deepIndex.indexLayout !== "spacetime_index.v1"
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history deep-index metadata schema is invalid", {
        recoverable: false,
      })
    );
  }
  requireNonemptyString(deepIndex.sourceStreamId, "lifecycle.deepIndex.sourceStreamId");
  requireArray(deepIndex.builtChunkIndices, "lifecycle.deepIndex.builtChunkIndices");
  deepIndex.builtChunkIndices.forEach((chunkIndex, index) =>
    requireNonnegativeInteger(chunkIndex, `lifecycle.deepIndex.builtChunkIndices[${index}]`)
  );
  requireNonnegativeInteger(deepIndex.rowCount, "lifecycle.deepIndex.rowCount");
  requireNonnegativeInteger(deepIndex.overflowEntryCount, "lifecycle.deepIndex.overflowEntryCount");
  requireNonnegativeInteger(deepIndex.byteLength, "lifecycle.deepIndex.byteLength");
  requireNonemptyString(deepIndex.checksum, "lifecycle.deepIndex.checksum");
  validateSpaceTimeIndexOptions(deepIndex.options);
  return {
    schema: "solver-path-history-deep-index.v1",
    indexKind: "spacetime",
    indexLayout: "spacetime_index.v1",
    sourceStreamId: deepIndex.sourceStreamId,
    builtChunkIndices: [...deepIndex.builtChunkIndices],
    rowCount: deepIndex.rowCount,
    overflowEntryCount: deepIndex.overflowEntryCount,
    byteLength: deepIndex.byteLength,
    checksum: deepIndex.checksum,
    options: { ...deepIndex.options },
  };
}

function normalizePathHistoryStorageLifecycleSummaryMetadata(summary) {
  if (!summary || typeof summary !== "object" || Array.isArray(summary)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle summary metadata is required", {
        recoverable: false,
      })
    );
  }
  if (summary.schema !== "solver-path-history-storage-lifecycle-summary.v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history lifecycle summary metadata schema is invalid", {
        recoverable: false,
      })
    );
  }
  [
    "totalChunkCount",
    "totalBytes",
    "safeToAgeOutCount",
    "unsafeToAgeOutCount",
    "deepIndexRequiredCount",
  ].forEach((key) => requireNonnegativeInteger(summary[key], `lifecycle.summary.${key}`));
  requireArray(summary.deepIndexQueueChunkIndices, "lifecycle.summary.deepIndexQueueChunkIndices");
  requireArray(summary.unsafeToAgeOutChunkIndices, "lifecycle.summary.unsafeToAgeOutChunkIndices");
  summary.deepIndexQueueChunkIndices.forEach((chunkIndex, index) =>
    requireNonnegativeInteger(chunkIndex, `lifecycle.summary.deepIndexQueueChunkIndices[${index}]`)
  );
  summary.unsafeToAgeOutChunkIndices.forEach((chunkIndex, index) =>
    requireNonnegativeInteger(chunkIndex, `lifecycle.summary.unsafeToAgeOutChunkIndices[${index}]`)
  );
  return {
    schema: "solver-path-history-storage-lifecycle-summary.v1",
    totalChunkCount: summary.totalChunkCount,
    totalBytes: summary.totalBytes,
    tierCounts: normalizeLifecycleCountMetadata(
      summary.tierCounts,
      ["active", "warm", "cold", "deleted", "unknown"],
      "lifecycle.summary.tierCounts"
    ),
    actionCounts: normalizeLifecycleCountMetadata(
      summary.actionCounts,
      [
        "keep_active",
        "spill_warm",
        "archive_cold",
        "build_deep_index",
        "delete",
        "blocked_unsafe",
        "unknown",
      ],
      "lifecycle.summary.actionCounts"
    ),
    bytesByTier: normalizeLifecycleCountMetadata(
      summary.bytesByTier,
      ["active", "warm", "cold", "deleted", "unknown"],
      "lifecycle.summary.bytesByTier"
    ),
    safeToAgeOutCount: summary.safeToAgeOutCount,
    unsafeToAgeOutCount: summary.unsafeToAgeOutCount,
    deepIndexRequiredCount: summary.deepIndexRequiredCount,
    deepIndexQueueChunkIndices: [...summary.deepIndexQueueChunkIndices],
    unsafeToAgeOutChunkIndices: [...summary.unsafeToAgeOutChunkIndices],
  };
}

function normalizeLifecycleCountMetadata(record, keys, label) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  return Object.fromEntries(
    keys.map((key) => {
      requireNonnegativeInteger(record[key], `${label}.${key}`);
      return [key, record[key]];
    })
  );
}

function normalizePathHistoryLifecycleDecisionMetadata(decision, label) {
  if (!decision || typeof decision !== "object" || Array.isArray(decision)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireNonnegativeInteger(decision.chunkIndex, `${label}.chunkIndex`);
  requireUint32(decision.tierCode, `${label}.tierCode`);
  requireUint32(decision.actionCode, `${label}.actionCode`);
  requireUint32(decision.reasonCode, `${label}.reasonCode`);
  if (![...STORAGE_LIFECYCLE_TIER_BY_ID, "unknown"].includes(decision.tier)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.tier is invalid`, {
        recoverable: false,
      })
    );
  }
  if (![...STORAGE_LIFECYCLE_ACTION_BY_ID, "unknown"].includes(decision.action)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.action is invalid`, {
        recoverable: false,
      })
    );
  }
  if (![...STORAGE_LIFECYCLE_REASON_BY_ID, "unknown"].includes(decision.reason)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label}.reason is invalid`, {
        recoverable: false,
      })
    );
  }
  if (typeof decision.safeToAgeOut !== "boolean" || typeof decision.requiresDeepIndex !== "boolean") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} boolean flags are required`, {
        recoverable: false,
      })
    );
  }
  return {
    chunkIndex: decision.chunkIndex,
    tierCode: decision.tierCode,
    tier: decision.tier,
    actionCode: decision.actionCode,
    action: decision.action,
    safeToAgeOut: decision.safeToAgeOut,
    requiresDeepIndex: decision.requiresDeepIndex,
    reasonCode: decision.reasonCode,
    reason: decision.reason,
  };
}

function normalizePathHistoryDynamicReplayMetadata(replay) {
  if (!replay || typeof replay !== "object" || Array.isArray(replay)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history dynamic replay metadata must be an object", {
        recoverable: false,
      })
    );
  }
  if (replay.schema !== "solver-path-history-dynamic-replay.v1") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "path-history dynamic replay schema is invalid", {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(replay.startTime, "dynamicReplay.startTime");
  requireFiniteNumber(replay.endTime, "dynamicReplay.endTime");
  requirePositiveFiniteNumber(replay.step, "dynamicReplay.step");
  if (replay.endTime < replay.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "dynamicReplay time bounds are not ordered", {
        recoverable: false,
      })
    );
  }
  if (replay.stateFlags != null) {
    requireUint32(replay.stateFlags, "dynamicReplay.stateFlags");
  }

  if (replay.replayKind === "linear-motion-sample") {
    requireSafeUint64(replay.pathKey, "dynamicReplay.pathKey");
    if (replay.motionRequest == null || replay.motionIntegrationRequest != null) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "linear dynamic replay requires only motionRequest", {
          recoverable: false,
        })
      );
    }
    validateLinearMotionSampleRequest(replay.motionRequest);
    const motionRequest = normalizeLinearMotionReplayRequest(replay.motionRequest);
    validateDynamicReplayCommonFields(replay, motionRequest, "motionRequest");
    return dropUndefinedProperties({
      schema: "solver-path-history-dynamic-replay.v1",
      replayKind: "linear-motion-sample",
      pathKey: replay.pathKey,
      startTime: replay.startTime,
      endTime: replay.endTime,
      step: replay.step,
      stateFlags: replay.stateFlags,
      motionRequest,
    });
  }

  if (replay.replayKind === "constant-acceleration-motion-integration") {
    requireSafeUint64(replay.pathKey, "dynamicReplay.pathKey");
    if (replay.motionIntegrationRequest == null || replay.motionRequest != null) {
      throw new SolverBridgeError(
        createStatus(
          "app_contract_error",
          "error",
          "constant-acceleration dynamic replay requires only motionIntegrationRequest",
          { recoverable: false }
        )
      );
    }
    if (replay.integrationMethod !== 1) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "dynamicReplay integration method is not supported", {
          recoverable: false,
        })
      );
    }
    requireNonnegativeFiniteNumber(replay.integrationTolerance, "dynamicReplay.integrationTolerance");
    validateMotionIntegrationRequest(replay.motionIntegrationRequest);
    const motionIntegrationRequest = normalizeMotionIntegrationReplayRequest(
      replay.motionIntegrationRequest
    );
    validateDynamicReplayCommonFields(replay, motionIntegrationRequest, "motionIntegrationRequest");
    if (replay.integrationMethod !== motionIntegrationRequest.integrationMethod ||
        replay.integrationTolerance !== motionIntegrationRequest.integrationTolerance) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "dynamicReplay integration fields do not match request", {
          recoverable: false,
        })
      );
    }
    return dropUndefinedProperties({
      schema: "solver-path-history-dynamic-replay.v1",
      replayKind: "constant-acceleration-motion-integration",
      pathKey: replay.pathKey,
      startTime: replay.startTime,
      endTime: replay.endTime,
      step: replay.step,
      stateFlags: replay.stateFlags,
      integrationMethod: replay.integrationMethod,
      integrationTolerance: replay.integrationTolerance,
      motionIntegrationRequest,
    });
  }

  if (replay.replayKind === "pair-interaction-path-integration") {
    requireArray(replay.pathKeys, "dynamicReplay.pathKeys");
    replay.pathKeys.forEach((pathKey, index) => {
      requireSafeUint64(pathKey, `dynamicReplay.pathKeys[${index}]`);
    });
    requireNonnegativeFiniteNumber(replay.integrationTolerance, "dynamicReplay.integrationTolerance");
    if (replay.pairInteractionRequest == null) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "pair dynamic replay requires pairInteractionRequest", {
          recoverable: false,
        })
      );
    }
    const pairInteractionRequest = normalizePairInteractionReplayRequest(replay.pairInteractionRequest);
    const requestPathKeys = pairInteractionRequest.initialStates.map((state) => state.pathKey);
    if (
      replay.startTime !== pairInteractionRequest.startTime ||
      replay.endTime !== pairInteractionRequest.endTime ||
      replay.step !== pairInteractionRequest.step ||
      replay.pathKeys.length !== requestPathKeys.length ||
      replay.pathKeys.some((pathKey, index) => pathKey !== requestPathKeys[index])
    ) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "dynamicReplay fields do not match pairInteractionRequest", {
          recoverable: false,
        })
      );
    }
    return dropUndefinedProperties({
      schema: "solver-path-history-dynamic-replay.v1",
      replayKind: "pair-interaction-path-integration",
      pathKeys: replay.pathKeys.slice(),
      startTime: replay.startTime,
      endTime: replay.endTime,
      step: replay.step,
      interactionLaw: replay.interactionLaw,
      pairAccelerationScale: replay.pairAccelerationScale,
      softening: replay.softening,
      integrationTolerance: replay.integrationTolerance,
      pairInteractionRequest,
      pathConstraints: pairInteractionRequest.pathConstraints,
    });
  }

  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "path-history dynamic replay kind is invalid", {
      recoverable: false,
    })
  );
}

function validateDynamicReplayCommonFields(replay, request, requestLabel) {
  if (
    replay.pathKey !== request.pathKey ||
    replay.startTime !== request.startTime ||
    replay.endTime !== request.endTime ||
    replay.step !== request.step ||
    (replay.stateFlags ?? undefined) !== (request.stateFlags ?? undefined)
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `dynamicReplay fields do not match ${requestLabel}`, {
        recoverable: false,
      })
    );
  }
}

function normalizeMetadataString(value, fallback, label) {
  const nextValue = value ?? fallback;
  requireNonemptyString(nextValue, label);
  return nextValue;
}

function encodePathHistoryRowsF64(rows, rowSizeBytes) {
  const buffer = new ArrayBuffer(rows.length * rowSizeBytes);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    writePathHistoryRowF64ToView(view, index * rowSizeBytes, row);
  });
  return buffer;
}

function createAssemblyGraphBufferDescriptor(bufferId, layout, rows, rowSizeBytes, writeRow) {
  return createBufferDescriptor(
    bufferId,
    layout,
    rows.length,
    rowSizeBytes,
    encodeAssemblyGraphRowsF64(rows, rowSizeBytes, writeRow)
  );
}

function encodeAssemblyGraphRowsF64(rows, rowSizeBytes, writeRow) {
  const buffer = new ArrayBuffer(rows.length * rowSizeBytes);
  const view = new DataView(buffer);
  rows.forEach((row, index) => {
    writeRow(view, index * rowSizeBytes, row);
  });
  return buffer;
}

function fnv1a64ArrayBufferHex(buffer) {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    hash ^= BigInt(byte);
    hash = (hash * prime) & 0xffffffffffffffffn;
  }
  return hash.toString(16).padStart(16, "0");
}

function writePathHistoryRowF64ToView(view, offset, row) {
  view.setBigUint64(offset, BigInt(row.pathKey), true);
  view.setBigUint64(offset + 8, BigInt(row.segmentIndex), true);
  view.setFloat64(offset + 16, row.startTime, true);
  view.setFloat64(offset + 24, row.endTime, true);
  writeVectorToView(view, offset + 32, row.start);
  writeVectorToView(view, offset + 56, row.velocity);
  view.setFloat64(offset + 80, row.errorBound ?? 0, true);
  view.setUint32(offset + 88, row.stateFlags ?? 0, true);
  view.setUint32(offset + 92, 0, true);
}

function writeAssemblyStateRowF64ToView(view, offset, row) {
  writeUint64ToView(view, offset, row.assemblyKey);
  writeUint64ToView(view, offset + 8, row.assemblyStateKey);
  view.setFloat64(offset + 16, row.timeStart, true);
  view.setFloat64(offset + 24, row.timeEnd, true);
  writeVectorToView(view, offset + 32, row.center);
  writeVectorToView(view, offset + 56, row.velocity);
  view.setFloat64(offset + 80, row.phase ?? 0, true);
  writeInt64ToView(view, offset + 88, row.cycleIndex ?? 0);
  view.setUint32(offset + 96, row.modelVersion ?? 1, true);
  view.setUint32(offset + 100, row.statusFlags ?? 0, true);
  view.setUint32(offset + 104, row.fidelityFlags ?? 0, true);
  view.setUint32(offset + 108, 0, true);
}

function writeAssemblyMembershipRowF64ToView(view, offset, row) {
  writeUint64ToView(view, offset, row.membershipKey);
  writeUint64ToView(view, offset + 8, row.pathKey);
  writeUint64ToView(view, offset + 16, row.assemblyKey);
  writeUint64ToView(view, offset + 24, row.assemblyStateKey);
  view.setFloat64(offset + 32, row.timeStart, true);
  view.setFloat64(offset + 40, row.timeEnd, true);
  view.setFloat64(offset + 48, row.confidence, true);
  view.setUint32(offset + 56, row.localRole ?? 0, true);
  view.setUint32(offset + 60, row.bindingState ?? 0, true);
  view.setUint32(offset + 64, row.membershipVersion ?? 1, true);
  view.setUint32(offset + 68, row.eventKind ?? 0, true);
  view.setUint32(offset + 72, row.statusFlags ?? 0, true);
  view.setUint32(offset + 76, 0, true);
}

function writeAssemblyHierarchyRowF64ToView(view, offset, row) {
  writeUint64ToView(view, offset, row.hierarchyKey);
  writeUint64ToView(view, offset + 8, row.parentAssemblyKey);
  writeUint64ToView(view, offset + 16, row.childAssemblyKey);
  view.setFloat64(offset + 24, row.timeStart, true);
  view.setFloat64(offset + 32, row.timeEnd, true);
  view.setUint32(offset + 40, row.relationType ?? 0, true);
  view.setUint32(offset + 44, row.hierarchyVersion ?? 1, true);
  view.setUint32(offset + 48, row.statusFlags ?? 0, true);
  view.setUint32(offset + 52, 0, true);
}

function writeAssemblyEventRowF64ToView(view, offset, row) {
  writeUint64ToView(view, offset, row.eventKey);
  writeUint64ToView(view, offset + 8, row.primaryId);
  writeUint64ToView(view, offset + 16, row.secondaryId);
  writeUint64ToView(view, offset + 24, row.priorStateKey);
  writeUint64ToView(view, offset + 32, row.nextStateKey);
  writeUint64ToView(view, offset + 40, row.relatedPathKey);
  writeUint64ToView(view, offset + 48, row.relatedAssemblyKey);
  writeUint64ToView(view, offset + 56, row.branchTransitionKey);
  view.setFloat64(offset + 64, row.eventTime, true);
  view.setUint32(offset + 72, row.eventKind, true);
  view.setUint32(offset + 76, row.speedRegime, true);
  view.setUint32(offset + 80, row.statusFlags, true);
  view.setUint32(offset + 84, 0, true);
}

function readAssemblyStateRowF64FromView(view, offset) {
  return {
    assemblyKey: readUint64FromView(view, offset),
    assemblyStateKey: readUint64FromView(view, offset + 8),
    timeStart: view.getFloat64(offset + 16, true),
    timeEnd: view.getFloat64(offset + 24, true),
    center: readVectorFromView(view, offset + 32),
    velocity: readVectorFromView(view, offset + 56),
    phase: view.getFloat64(offset + 80, true),
    cycleIndex: readInt64FromView(view, offset + 88),
    modelVersion: view.getUint32(offset + 96, true),
    statusFlags: view.getUint32(offset + 100, true),
    fidelityFlags: view.getUint32(offset + 104, true),
  };
}

function readAssemblyMembershipRowF64FromView(view, offset) {
  return {
    membershipKey: readUint64FromView(view, offset),
    pathKey: readUint64FromView(view, offset + 8),
    assemblyKey: readUint64FromView(view, offset + 16),
    assemblyStateKey: readUint64FromView(view, offset + 24),
    timeStart: view.getFloat64(offset + 32, true),
    timeEnd: view.getFloat64(offset + 40, true),
    confidence: view.getFloat64(offset + 48, true),
    localRole: view.getUint32(offset + 56, true),
    bindingState: view.getUint32(offset + 60, true),
    membershipVersion: view.getUint32(offset + 64, true),
    eventKind: view.getUint32(offset + 68, true),
    statusFlags: view.getUint32(offset + 72, true),
  };
}

function readAssemblyHierarchyRowF64FromView(view, offset) {
  return {
    hierarchyKey: readUint64FromView(view, offset),
    parentAssemblyKey: readUint64FromView(view, offset + 8),
    childAssemblyKey: readUint64FromView(view, offset + 16),
    timeStart: view.getFloat64(offset + 24, true),
    timeEnd: view.getFloat64(offset + 32, true),
    relationType: view.getUint32(offset + 40, true),
    hierarchyVersion: view.getUint32(offset + 44, true),
    statusFlags: view.getUint32(offset + 48, true),
  };
}

function readAssemblyEventRowF64FromView(view, offset) {
  return {
    eventKey: readUint64FromView(view, offset),
    primaryId: readUint64FromView(view, offset + 8),
    secondaryId: readUint64FromView(view, offset + 16),
    priorStateKey: readUint64FromView(view, offset + 24),
    nextStateKey: readUint64FromView(view, offset + 32),
    relatedPathKey: readUint64FromView(view, offset + 40),
    relatedAssemblyKey: readUint64FromView(view, offset + 48),
    branchTransitionKey: readUint64FromView(view, offset + 56),
    eventTime: view.getFloat64(offset + 64, true),
    eventKind: view.getUint32(offset + 72, true),
    speedRegime: view.getUint32(offset + 76, true),
    statusFlags: view.getUint32(offset + 80, true),
  };
}

function writeVectorToView(view, offset, vector) {
  view.setFloat64(offset, vector.x, true);
  view.setFloat64(offset + 8, vector.y, true);
  view.setFloat64(offset + 16, vector.z, true);
}

function writeUint64ToView(view, offset, value) {
  view.setBigUint64(offset, BigInt(value), true);
}

function writeInt64ToView(view, offset, value) {
  view.setBigInt64(offset, BigInt(value), true);
}

function readUint64FromView(view, offset) {
  return Number(view.getBigUint64(offset, true));
}

function readInt64FromView(view, offset) {
  return Number(view.getBigInt64(offset, true));
}

function summarizePathHistoryRows(rows) {
  let timeStart = Number.POSITIVE_INFINITY;
  let timeEnd = Number.NEGATIVE_INFINITY;
  let frameStart = Number.POSITIVE_INFINITY;
  let frameEnd = Number.NEGATIVE_INFINITY;
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;
  rows.forEach((row) => {
    timeStart = Math.min(timeStart, row.startTime);
    timeEnd = Math.max(timeEnd, row.endTime);
    frameStart = Math.min(frameStart, row.segmentIndex);
    frameEnd = Math.max(frameEnd, row.segmentIndex);
    const duration = row.endTime - row.startTime;
    const end = {
      x: row.start.x + row.velocity.x * duration,
      y: row.start.y + row.velocity.y * duration,
      z: row.start.z + row.velocity.z * duration,
    };
    const errorBound = row.errorBound ?? 0;
    minX = Math.min(minX, Math.min(row.start.x, end.x) - errorBound);
    minY = Math.min(minY, Math.min(row.start.y, end.y) - errorBound);
    minZ = Math.min(minZ, Math.min(row.start.z, end.z) - errorBound);
    maxX = Math.max(maxX, Math.max(row.start.x, end.x) + errorBound);
    maxY = Math.max(maxY, Math.max(row.start.y, end.y) + errorBound);
    maxZ = Math.max(maxZ, Math.max(row.start.z, end.z) + errorBound);
  });
  return {
    timeRange: { start: timeStart, end: timeEnd },
    frameRange: { start: frameStart, end: frameEnd },
    bounds: {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ },
      timeStart,
      timeEnd,
    },
  };
}

function findStreamEntry(state, streamId) {
  if (streamId != null && (typeof streamId !== "string" || streamId.length === 0)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "streamId must be a nonempty string", {
        recoverable: false,
      })
    );
  }
  if (streamId) {
    const entry = state.streams.get(streamId);
    if (entry) {
      return entry;
    }
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "stream not found", {
        recoverable: false,
        details: { streamId },
      })
    );
  }
  if (state.streams.size === 1) {
    return [...state.streams.values()][0];
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "streamId is required when multiple streams exist", {
      recoverable: false,
    })
  );
}

function selectStreamRanges(streamEntry, request) {
  const results = [];
  const diagnostics = [];
  const chunkIndexSet = request.chunkIndices == null ? null : new Set(request.chunkIndices);
  streamEntry.stream.availableRanges.forEach((range, index) => {
    if (chunkIndexSet && !chunkIndexSet.has(index)) {
      return;
    }
    const descriptor = streamEntry.buffers[index];
    if (!descriptor) {
      return;
    }
    if (!rangeMatchesRequest(range, request)) {
      return;
    }
    const sliceRange = request.byteRange
      ? intersectRange(range.byteRange, request.byteRange)
      : { ...range.byteRange };
    if (!sliceRange) {
      return;
    }
    const buffer = getBufferDescriptorArrayBuffer(descriptor);
    if (!buffer) {
      return;
    }
    const localStart = Math.max(0, sliceRange.start - range.byteRange.start);
    const localEnd = Math.max(localStart, sliceRange.end - range.byteRange.start);
    if (shouldFilterPathHistoryRows(descriptor, request)) {
      const filtered = filterPathHistoryRows(
        streamEntry,
        index,
        buffer,
        descriptor,
        localStart,
        localEnd,
        request
      );
      diagnostics.push(...filtered.diagnostics);
      if (filtered.rowCount === 0) {
        return;
      }
      results.push({
        range: {
          timeRange: filtered.timeRange,
          frameRange: filtered.frameRange,
          bounds: filtered.bounds,
          byteRange: { start: 0, end: filtered.buffer.byteLength },
        },
        descriptor,
        rowCount: filtered.rowCount,
        buffer: filtered.buffer,
      });
      return;
    }
    results.push({
      range: {
        ...copyStreamRange(range),
        byteRange: { start: sliceRange.start, end: sliceRange.end },
      },
      descriptor,
      rowCount: rowCountForSlice(descriptor, localStart, localEnd),
      buffer: sliceArrayBuffer(buffer, localStart, localEnd),
    });
  });
  return { items: results, diagnostics };
}

function shouldFilterPathHistoryRows(descriptor, request) {
  return (
    descriptor.layout === "path_segment.v1" &&
    (Array.isArray(request.pathKeys) ||
      request.timeRange != null ||
      request.frameRange != null)
  );
}

function filterPathHistoryRows(streamEntry, chunkIndex, buffer, descriptor, localStart, localEnd, request) {
  const rowSize = descriptor.byteLength / descriptor.rowCount;
  if (!Number.isInteger(rowSize) || rowSize <= 0) {
    return emptyPathHistoryFilterResult();
  }
  if (localStart % rowSize !== 0 || localEnd % rowSize !== 0) {
    return emptyPathHistoryFilterResult();
  }
  const indexed = filterPathHistoryRowsWithIndex(
    streamEntry,
    chunkIndex,
    buffer,
    descriptor,
    localStart,
    localEnd,
    rowSize,
    request
  );
  if (indexed) {
    return indexed;
  }
  const pathKeySet = Array.isArray(request.pathKeys) ? new Set(request.pathKeys) : null;
  const inputBytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const selectedOffsets = [];
  const selectedRows = [];
  for (let rowOffset = localStart; rowOffset < localEnd; rowOffset += rowSize) {
    const summary = readPathHistoryRowSummary(view, rowOffset);
    if (!pathHistoryRowMatches(summary, pathKeySet, request)) {
      continue;
    }
    selectedOffsets.push(rowOffset);
    selectedRows.push(readPathHistoryRowFromView(view, rowOffset, chunkIndex, rowOffset / rowSize));
  }
  if (selectedOffsets.length === 0) {
    return emptyPathHistoryFilterResult();
  }
  const output = copySelectedPathHistoryRows(inputBytes, selectedOffsets, rowSize);
  return {
    rowCount: selectedOffsets.length,
    buffer: output,
    diagnostics: [
      createPathHistoryReadbackDiagnostic("path_history_scan_readback", {
        streamId: streamEntry.stream.streamId,
        chunkIndex,
        mode: "scan",
        scannedRowCount: (localEnd - localStart) / rowSize,
        selectedRowCount: selectedOffsets.length,
      }),
    ],
    ...summarizePathHistoryRows(selectedRows),
  };
}

function filterPathHistoryRowsWithIndex(
  streamEntry,
  chunkIndex,
  buffer,
  descriptor,
  localStart,
  localEnd,
  rowSize,
  request
) {
  const indexRows = getPathHistoryIndexRowsByChunk(streamEntry).get(chunkIndex) ?? [];
  if (indexRows.length === 0) {
    return null;
  }
  const pathKeySet = Array.isArray(request.pathKeys) ? new Set(request.pathKeys) : null;
  const localRowStart = localStart / rowSize;
  const localRowEnd = localEnd / rowSize;
  const plannedOffsets = [];
  for (const indexRow of indexRows) {
    if (pathKeySet && !pathKeySet.has(indexRow.pathKey)) {
      continue;
    }
    if (request.timeRange && !rangeOverlapsOptional(indexRow.timeRange, request.timeRange)) {
      continue;
    }
    if (request.frameRange && !rangeOverlapsOptional(indexRow.frameRange, request.frameRange)) {
      continue;
    }
    const rowStart = Math.max(localRowStart, indexRow.rowOffset);
    const rowEnd = Math.min(localRowEnd, indexRow.rowOffset + indexRow.rowCount);
    for (let rowOffset = rowStart; rowOffset < rowEnd; rowOffset += 1) {
      plannedOffsets.push(rowOffset * rowSize);
    }
  }
  const inputRowCount = localRowEnd - localRowStart;
  const indexSkippedRowCount = Math.max(0, inputRowCount - plannedOffsets.length);
  if (plannedOffsets.length === 0) {
    return emptyPathHistoryFilterResult([
      createPathHistoryReadbackDiagnostic("path_history_indexed_readback", {
        streamId: streamEntry.stream.streamId,
        chunkIndex,
        mode: "index",
        indexed: true,
        scannedRowCount: 0,
        selectedRowCount: 0,
        indexSkippedRowCount,
      }),
    ]);
  }
  const view = new DataView(buffer);
  const selectedOffsets = [];
  const selectedRows = [];
  for (const rowOffset of plannedOffsets) {
    const summary = readPathHistoryRowSummary(view, rowOffset);
    if (!pathHistoryRowMatches(summary, pathKeySet, request)) {
      continue;
    }
    selectedOffsets.push(rowOffset);
    selectedRows.push(readPathHistoryRowFromView(view, rowOffset, chunkIndex, rowOffset / rowSize));
  }
  if (selectedOffsets.length === 0) {
    return emptyPathHistoryFilterResult([
      createPathHistoryReadbackDiagnostic("path_history_indexed_readback", {
        streamId: streamEntry.stream.streamId,
        chunkIndex,
        mode: "index",
        indexed: true,
        scannedRowCount: plannedOffsets.length,
        selectedRowCount: 0,
        indexSkippedRowCount,
      }),
    ]);
  }
  const output = copySelectedPathHistoryRows(new Uint8Array(buffer), selectedOffsets, rowSize);
  return {
    rowCount: selectedOffsets.length,
    buffer: output,
    diagnostics: [
      createPathHistoryReadbackDiagnostic("path_history_indexed_readback", {
        streamId: streamEntry.stream.streamId,
        chunkIndex,
        mode: "index",
        indexed: true,
        scannedRowCount: plannedOffsets.length,
        selectedRowCount: selectedOffsets.length,
        indexSkippedRowCount,
      }),
    ],
    ...summarizePathHistoryRows(selectedRows),
  };
}

function copySelectedPathHistoryRows(inputBytes, selectedOffsets, rowSize) {
  const output = new ArrayBuffer(selectedOffsets.length * rowSize);
  const outputBytes = new Uint8Array(output);
  selectedOffsets.forEach((rowOffset, index) => {
    outputBytes.set(inputBytes.slice(rowOffset, rowOffset + rowSize), index * rowSize);
  });
  return output;
}

function createPathHistoryReadbackDiagnostic(code, details) {
  return toDiagnosticRecord(
    createStatus(code, "ok", "path-history stream readback filter summary", {
      stage: "stream_readback",
      details,
    })
  );
}

function emptyPathHistoryFilterResult(diagnostics = []) {
  return {
    rowCount: 0,
    buffer: new ArrayBuffer(0),
    timeRange: { start: 0, end: 0 },
    frameRange: { start: 0, end: 0 },
    diagnostics,
  };
}

function readPathHistoryRowSummary(view, offset) {
  return {
    pathKey: Number(view.getBigUint64(offset, true)),
    segmentIndex: Number(view.getBigUint64(offset + 8, true)),
    startTime: view.getFloat64(offset + 16, true),
    endTime: view.getFloat64(offset + 24, true),
  };
}

function pathHistoryRowMatches(summary, pathKeySet, request) {
  if (pathKeySet && !pathKeySet.has(summary.pathKey)) {
    return false;
  }
  if (request.timeRange && !(summary.startTime <= request.timeRange.end && summary.endTime >= request.timeRange.start)) {
    return false;
  }
  if (
    request.frameRange &&
    !(summary.segmentIndex >= request.frameRange.start && summary.segmentIndex <= request.frameRange.end)
  ) {
    return false;
  }
  return true;
}

function rowCountForSlice(descriptor, localStart, localEnd) {
  if (!descriptor.rowCount || !descriptor.byteLength) {
    return 0;
  }
  const rowSize = descriptor.byteLength / descriptor.rowCount;
  const byteLength = localEnd - localStart;
  if (!Number.isInteger(rowSize) || rowSize <= 0) {
    return 0;
  }
  if (localStart % rowSize !== 0 || byteLength % rowSize !== 0) {
    return 0;
  }
  return byteLength / rowSize;
}

function rangeMatchesRequest(range, request) {
  return (
    rangeOverlapsOptional(range.timeRange, request.timeRange) &&
    rangeOverlapsOptional(range.frameRange, request.frameRange) &&
    byteRangeOverlapsOptional(range.byteRange, request.byteRange)
  );
}

function rangeOverlapsOptional(available, requested) {
  if (!requested) {
    return true;
  }
  validateRange(requested, "range filter");
  if (!available) {
    return false;
  }
  return available.start <= requested.end && available.end >= requested.start;
}

function byteRangeOverlapsOptional(available, requested) {
  if (!requested) {
    return true;
  }
  validateRange(requested, "byteRange");
  if (!available) {
    return false;
  }
  return available.start < requested.end && available.end > requested.start;
}

function intersectRange(available, requested) {
  validateRange(requested, "byteRange");
  const start = Math.max(available.start, requested.start);
  const end = Math.min(available.end, requested.end);
  return start < end ? { start, end } : null;
}

function validateRange(range, label) {
  if (!range || typeof range !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(range.start, `${label}.start`);
  requireFiniteNumber(range.end, `${label}.end`);
  if (range.end < range.start) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
}

function copyBufferDescriptor(descriptor) {
  return {
    ...descriptor,
    buffer: descriptor.buffer ? descriptor.buffer.slice(0) : undefined,
  };
}

function copyBufferDescriptorWithoutPayload(descriptor) {
  const { buffer, ...metadata } = descriptor;
  return { ...metadata };
}

function copyStreamRange(range) {
  return {
    timeRange: range.timeRange ? { ...range.timeRange } : undefined,
    frameRange: range.frameRange ? { ...range.frameRange } : undefined,
    bounds: range.bounds ? normalizeSpaceTimeBounds(range.bounds, "streamRange.bounds") : undefined,
    byteRange: { ...range.byteRange },
  };
}

function copySpaceTimeBounds(bounds) {
  return {
    min: copyVector(bounds.min),
    max: copyVector(bounds.max),
    timeStart: bounds.timeStart,
    timeEnd: bounds.timeEnd,
  };
}

function normalizeSpaceTimeBounds(bounds, label) {
  validateSpaceTimeBounds(bounds, label);
  return copySpaceTimeBounds(bounds);
}

function sliceArrayBuffer(buffer, start, end) {
  return buffer.slice(start, end);
}

function assertNotDisposed(state) {
  if (state.disposed) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver bridge has been disposed", {
        recoverable: false,
      })
    );
  }
}

function createStatus(code, severity, message, options = {}) {
  return {
    code,
    severity,
    message,
    runId: options.runId,
    requestId: options.requestId,
    stage: options.stage,
    recoverable: options.recoverable ?? true,
    details: options.details,
  };
}

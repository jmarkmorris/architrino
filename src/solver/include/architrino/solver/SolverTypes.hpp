#pragma once

#include <cstddef>
#include <cstdint>
#include <string>
#include <string_view>
#include <utility>
#include <vector>

namespace architrino::solver {

enum class StatusSeverity {
  Ok,
  Info,
  Warning,
  Halt,
  Error,
};

enum class StatusCode {
  Ok,
  Cancelled,
  BaselineWithinTolerance,
  BaselineRefinedResult,
  BaselineModelBoundaryDifference,
  BaselineInvestigationRequiredMismatch,
  PrecisionEscalated,
  PrecisionFailed,
  SimulationEnvelopeExceeded,
  InsufficientHistoryDepth,
  InsufficientScaleResolution,
  TimeResolutionInsufficient,
  RootNotBracketed,
  RootUnresolved,
  SmallJacobian,
  TransversalityFloorFailed,
  LedgerRerunRequired,
  StreamMemoryPressure,
  StreamWriteFailed,
  StreamReadFailed,
  UnsupportedBrowserStorage,
  UnsupportedWasmThreads,
  ValidationReplayMismatch,
  AppContractError,
  InternalSolverError,
};

enum class PrecisionPath {
  Auto,
  ScaledF64Fast,
  ScaledF64Strict,
  AdaptiveMultirate,
  EventRootFocused,
  ExtendedPrecision,
  ValidationReplay,
};

enum class ClaimLevel {
  InteractivePreview,
  MigrationParity,
  ExportedDataset,
  ValidationEvidence,
};

enum class NumericType {
  F64,
  ScaledI64,
  IntervalF64Pair,
  Decimal128,
  MpLimbBlock,
};

enum class InteractionPolicy {
  Sparse,
  NeighborPruned,
  AllToAll,
  SameSourceEnabled,
};

enum class BranchComplexity {
  Low,
  Moderate,
  High,
  Unknown,
};

enum class OutputDetail {
  Preview,
  Playback,
  Export,
  Validation,
};

enum class LatencyTarget {
  Interactive,
  Background,
  Batch,
  Validation,
};

enum class SimplificationPolicy {
  None,
  ExplicitReducedModel,
};

enum class AdmissionDecision {
  Admit,
  Batch,
  EscalatePrecision,
  Reject,
};

enum class AdmissionStressDimension {
  EntityCount,
  InteractionGraph,
  Memory,
  TimeSteps,
  OutputDetail,
  Precision,
};

struct StatusRecord {
  StatusCode code = StatusCode::Ok;
  StatusSeverity severity = StatusSeverity::Ok;
  std::string message;
  std::string stage;
  bool recoverable = true;
};

struct ValidationReport {
  bool ok = true;
  std::vector<StatusRecord> statuses;

  void add(StatusCode code,
           StatusSeverity severity,
           std::string message,
           std::string stage = {},
           bool recoverable = true);
};

struct ModelContract {
  std::string modelId;
  std::string equationVersion;
  std::string forceLawVersion;
  std::string constantsHash;
  std::string causalSpeedPolicy;
  std::string branchPolicy;
  std::string unitConvention;
  std::vector<PrecisionPath> compatiblePrecisionPaths;
};

struct ErrorBudget {
  double globalTolerance = 0.0;
  double rootIsolationTolerance = 0.0;
  double delayedHitTolerance = 0.0;
  double integrationTolerance = 0.0;
  double streamEncodingTolerance = 0.0;
  double readbackTolerance = 0.0;
  double projectionTolerance = 0.0;
  double displayTolerance = 0.0;
};

struct TimeWindow {
  double start = 0.0;
  double end = 0.0;
  double stepHint = 0.0;
  std::string units = "solver-time";
};

struct SimulationEnvelope {
  std::uint64_t entityCount = 0;
  std::uint64_t assemblyCount = 0;
  TimeWindow timeWindow;
  double timeResolutionHint = 0.0;
  InteractionPolicy interactionPolicy = InteractionPolicy::Sparse;
  BranchComplexity expectedBranchComplexity = BranchComplexity::Unknown;
  OutputDetail outputDetail = OutputDetail::Preview;
  std::uint64_t memoryBudgetBytes = 0;
  std::uint64_t storageBudgetBytes = 0;
  LatencyTarget latencyTarget = LatencyTarget::Interactive;
  SimplificationPolicy simplificationPolicy = SimplificationPolicy::None;
};

struct SolverCapabilityEnvelope {
  std::uint64_t maxInteractiveEntities = 2048;
  std::uint64_t maxBatchEntities = 200000;
  std::uint64_t minMemoryBudgetBytes = 16ULL * 1024ULL * 1024ULL;
  std::uint64_t minStorageBudgetBytesForStreaming = 64ULL * 1024ULL * 1024ULL;
  double minimumPositiveTolerance = 1e-15;
  double maxInteractiveStepCount = 100000.0;
};

struct AdmissionStressSummary {
  std::uint64_t entityCount = 0;
  std::uint64_t estimatedPairCount = 0;
  double entityPressure = 0.0;
  double interactionPressure = 0.0;
  double memoryPressure = 0.0;
  double timeStepCountEstimate = 0.0;
  bool hasTimeStepCountEstimate = false;
  double timeStepPressure = 0.0;
  double outputPressure = 0.0;
  double precisionPressure = 0.0;
  AdmissionStressDimension dominantStress = AdmissionStressDimension::EntityCount;
  double pressureScore = 0.0;
};

struct AdmissionReport {
  AdmissionDecision decision = AdmissionDecision::Reject;
  ValidationReport validation;
  PrecisionPath selectedPrecisionPath = PrecisionPath::Auto;
  AdmissionStressSummary stressSummary;
};

std::string_view to_string(StatusSeverity value);
std::string_view to_string(StatusCode value);
std::string_view to_string(PrecisionPath value);
std::string_view to_string(ClaimLevel value);
std::string_view to_string(NumericType value);
std::string_view to_string(InteractionPolicy value);
std::string_view to_string(BranchComplexity value);
std::string_view to_string(OutputDetail value);
std::string_view to_string(LatencyTarget value);
std::string_view to_string(SimplificationPolicy value);
std::string_view to_string(AdmissionDecision value);
std::string_view to_string(AdmissionStressDimension value);

bool is_halt_or_error(StatusSeverity value);
bool is_strict_precision_path(PrecisionPath value);

}  // namespace architrino::solver

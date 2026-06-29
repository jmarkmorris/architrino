#include "architrino/solver/SolverTypes.hpp"

namespace architrino::solver {

void ValidationReport::add(StatusCode code,
                           StatusSeverity severity,
                           std::string message,
                           std::string stage,
                           bool recoverable) {
  if (is_halt_or_error(severity)) {
    ok = false;
  }
  statuses.push_back(StatusRecord{
      code,
      severity,
      std::move(message),
      std::move(stage),
      recoverable,
  });
}

std::string_view to_string(StatusSeverity value) {
  switch (value) {
    case StatusSeverity::Ok:
      return "ok";
    case StatusSeverity::Info:
      return "info";
    case StatusSeverity::Warning:
      return "warning";
    case StatusSeverity::Halt:
      return "halt";
    case StatusSeverity::Error:
      return "error";
  }
  return "unknown";
}

std::string_view to_string(StatusCode value) {
  switch (value) {
    case StatusCode::Ok:
      return "ok";
    case StatusCode::Cancelled:
      return "cancelled";
    case StatusCode::BaselineWithinTolerance:
      return "baseline_within_tolerance";
    case StatusCode::BaselineRefinedResult:
      return "baseline_refined_result";
    case StatusCode::BaselineModelBoundaryDifference:
      return "baseline_model_boundary_difference";
    case StatusCode::BaselineInvestigationRequiredMismatch:
      return "baseline_investigation_required_mismatch";
    case StatusCode::PrecisionEscalated:
      return "precision_escalated";
    case StatusCode::PrecisionFailed:
      return "precision_failed";
    case StatusCode::SimulationEnvelopeExceeded:
      return "simulation_envelope_exceeded";
    case StatusCode::InsufficientHistoryDepth:
      return "insufficient_history_depth";
    case StatusCode::InsufficientScaleResolution:
      return "insufficient_scale_resolution";
    case StatusCode::TimeResolutionInsufficient:
      return "time_resolution_insufficient";
    case StatusCode::RootNotBracketed:
      return "root_not_bracketed";
    case StatusCode::RootUnresolved:
      return "root_unresolved";
    case StatusCode::SmallJacobian:
      return "small_jacobian";
    case StatusCode::TransversalityFloorFailed:
      return "transversality_floor_failed";
    case StatusCode::LedgerRerunRequired:
      return "ledger_rerun_required";
    case StatusCode::StreamMemoryPressure:
      return "stream_memory_pressure";
    case StatusCode::StreamWriteFailed:
      return "stream_write_failed";
    case StatusCode::StreamReadFailed:
      return "stream_read_failed";
    case StatusCode::UnsupportedBrowserStorage:
      return "unsupported_browser_storage";
    case StatusCode::UnsupportedWasmThreads:
      return "unsupported_wasm_threads";
    case StatusCode::ValidationReplayMismatch:
      return "validation_replay_mismatch";
    case StatusCode::AppContractError:
      return "app_contract_error";
    case StatusCode::InternalSolverError:
      return "internal_solver_error";
    case StatusCode::ReceiverNormalDegenerate:
      return "receiver_normal_degenerate";
  }
  return "unknown";
}

std::string_view to_string(PrecisionPath value) {
  switch (value) {
    case PrecisionPath::Auto:
      return "auto";
    case PrecisionPath::ScaledF64Fast:
      return "scaled_f64_fast";
    case PrecisionPath::ScaledF64Strict:
      return "scaled_f64_strict";
    case PrecisionPath::AdaptiveMultirate:
      return "adaptive_multirate";
    case PrecisionPath::EventRootFocused:
      return "event_root_focused";
    case PrecisionPath::ExtendedPrecision:
      return "extended_precision";
    case PrecisionPath::ValidationReplay:
      return "validation_replay";
  }
  return "unknown";
}

std::string_view to_string(ClaimLevel value) {
  switch (value) {
    case ClaimLevel::InteractivePreview:
      return "interactive-preview";
    case ClaimLevel::MigrationParity:
      return "migration-parity";
    case ClaimLevel::ExportedDataset:
      return "exported-dataset";
    case ClaimLevel::ValidationEvidence:
      return "validation-evidence";
  }
  return "unknown";
}

std::string_view to_string(NumericType value) {
  switch (value) {
    case NumericType::F64:
      return "f64";
    case NumericType::ScaledI64:
      return "scaled_i64";
    case NumericType::IntervalF64Pair:
      return "interval_f64_pair";
    case NumericType::Decimal128:
      return "decimal128";
    case NumericType::MpLimbBlock:
      return "mp_limb_block";
  }
  return "unknown";
}

std::string_view to_string(NumericChart value) {
  switch (value) {
    case NumericChart::AbsoluteF64:
      return "absolute_f64";
    case NumericChart::LocalFrame:
      return "local_frame";
    case NumericChart::NondimensionalRatio:
      return "nondimensional_ratio";
    case NumericChart::LogMagnitude:
      return "log_magnitude";
    case NumericChart::SignedLogMagnitude:
      return "signed_log_magnitude";
    case NumericChart::DirectionLogMagnitude:
      return "direction_log_magnitude";
    case NumericChart::IntervalBounds:
      return "interval_bounds";
  }
  return "unknown";
}

std::string_view to_string(InteractionPolicy value) {
  switch (value) {
    case InteractionPolicy::Sparse:
      return "sparse";
    case InteractionPolicy::NeighborPruned:
      return "neighbor-pruned";
    case InteractionPolicy::AllToAll:
      return "all-to-all";
    case InteractionPolicy::SameSourceEnabled:
      return "same-source-enabled";
  }
  return "unknown";
}

std::string_view to_string(BranchComplexity value) {
  switch (value) {
    case BranchComplexity::Low:
      return "low";
    case BranchComplexity::Moderate:
      return "moderate";
    case BranchComplexity::High:
      return "high";
    case BranchComplexity::Unknown:
      return "unknown";
  }
  return "unknown";
}

std::string_view to_string(OutputDetail value) {
  switch (value) {
    case OutputDetail::Preview:
      return "preview";
    case OutputDetail::Playback:
      return "playback";
    case OutputDetail::Export:
      return "export";
    case OutputDetail::Validation:
      return "validation";
  }
  return "unknown";
}

std::string_view to_string(LatencyTarget value) {
  switch (value) {
    case LatencyTarget::Interactive:
      return "interactive";
    case LatencyTarget::Background:
      return "background";
    case LatencyTarget::Batch:
      return "batch";
    case LatencyTarget::Validation:
      return "validation";
  }
  return "unknown";
}

std::string_view to_string(SimplificationPolicy value) {
  switch (value) {
    case SimplificationPolicy::None:
      return "none";
    case SimplificationPolicy::ExplicitReducedModel:
      return "explicit-reduced-model";
  }
  return "unknown";
}

std::string_view to_string(AdmissionDecision value) {
  switch (value) {
    case AdmissionDecision::Admit:
      return "admit";
    case AdmissionDecision::Batch:
      return "batch";
    case AdmissionDecision::EscalatePrecision:
      return "escalate_precision";
    case AdmissionDecision::Reject:
      return "reject";
    case AdmissionDecision::Simplify:
      return "simplify";
  }
  return "unknown";
}

std::string_view to_string(AdmissionStressDimension value) {
  switch (value) {
    case AdmissionStressDimension::EntityCount:
      return "entity_count";
    case AdmissionStressDimension::InteractionGraph:
      return "interaction_graph";
    case AdmissionStressDimension::Memory:
      return "memory";
    case AdmissionStressDimension::Storage:
      return "storage";
    case AdmissionStressDimension::TimeSteps:
      return "time_steps";
    case AdmissionStressDimension::OutputDetail:
      return "output_detail";
    case AdmissionStressDimension::Precision:
      return "precision";
  }
  return "unknown";
}

bool is_halt_or_error(StatusSeverity value) {
  return value == StatusSeverity::Halt || value == StatusSeverity::Error;
}

bool is_strict_precision_path(PrecisionPath value) {
  return value == PrecisionPath::ScaledF64Strict || value == PrecisionPath::AdaptiveMultirate ||
         value == PrecisionPath::EventRootFocused || value == PrecisionPath::ExtendedPrecision ||
         value == PrecisionPath::ValidationReplay;
}

}  // namespace architrino::solver

#include "architrino/solver/SolverContract.hpp"

#include <algorithm>
#include <cmath>
#include <limits>

namespace architrino::solver {

namespace {

bool is_positive_finite(double value) {
  return std::isfinite(value) && value > 0.0;
}

bool is_nonnegative_finite(double value) {
  return std::isfinite(value) && value >= 0.0;
}

bool has_precision_path(const ModelContract& model, PrecisionPath path) {
  return std::find(model.compatiblePrecisionPaths.begin(), model.compatiblePrecisionPaths.end(), path) !=
         model.compatiblePrecisionPaths.end();
}

void merge_report(ValidationReport& target, const ValidationReport& source) {
  if (!source.ok) {
    target.ok = false;
  }
  target.statuses.insert(target.statuses.end(), source.statuses.begin(), source.statuses.end());
}

std::uint64_t all_to_all_pair_count(std::uint64_t entityCount) {
  constexpr std::uint64_t safeLimit = std::numeric_limits<std::uint64_t>::max() / 2ULL;
  if (entityCount > safeLimit / std::max<std::uint64_t>(entityCount, 1ULL)) {
    return std::numeric_limits<std::uint64_t>::max();
  }
  return entityCount * entityCount;
}

}  // namespace

ValidationReport validate_model_contract(const ModelContract& model) {
  ValidationReport report;
  if (model.modelId.empty()) {
    report.add(StatusCode::AppContractError, StatusSeverity::Error, "model id is required", "model");
  }
  if (model.equationVersion.empty()) {
    report.add(
        StatusCode::AppContractError, StatusSeverity::Error, "equation version is required", "model");
  }
  if (model.constantsHash.empty()) {
    report.add(
        StatusCode::AppContractError, StatusSeverity::Error, "constants hash is required", "model");
  }
  if (model.causalSpeedPolicy.empty()) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "causal speed policy is required",
               "model");
  }
  if (model.branchPolicy.empty()) {
    report.add(
        StatusCode::AppContractError, StatusSeverity::Error, "branch policy is required", "model");
  }
  if (model.unitConvention.empty()) {
    report.add(
        StatusCode::AppContractError, StatusSeverity::Error, "unit convention is required", "model");
  }
  if (model.compatiblePrecisionPaths.empty()) {
    report.add(StatusCode::PrecisionFailed,
               StatusSeverity::Error,
               "at least one compatible precision path is required",
               "model");
  }
  return report;
}

ValidationReport validate_error_budget(const ErrorBudget& budget) {
  ValidationReport report;
  const std::pair<const char*, double> required[] = {
      {"global tolerance", budget.globalTolerance},
      {"root isolation tolerance", budget.rootIsolationTolerance},
      {"delayed hit tolerance", budget.delayedHitTolerance},
      {"integration tolerance", budget.integrationTolerance},
      {"stream encoding tolerance", budget.streamEncodingTolerance},
      {"readback tolerance", budget.readbackTolerance},
  };

  for (const auto& [label, value] : required) {
    if (!is_positive_finite(value)) {
      report.add(StatusCode::PrecisionFailed,
                 StatusSeverity::Error,
                 std::string(label) + " must be positive and finite",
                 "error-budget");
    }
  }

  if (!is_nonnegative_finite(budget.projectionTolerance)) {
    report.add(StatusCode::PrecisionFailed,
               StatusSeverity::Error,
               "projection tolerance must be nonnegative and finite",
               "error-budget");
  }
  if (!is_nonnegative_finite(budget.displayTolerance)) {
    report.add(StatusCode::PrecisionFailed,
               StatusSeverity::Error,
               "display tolerance must be nonnegative and finite",
               "error-budget");
  }
  if (budget.rootIsolationTolerance > budget.globalTolerance) {
    report.add(StatusCode::PrecisionEscalated,
               StatusSeverity::Warning,
               "root isolation tolerance is looser than the global tolerance",
               "error-budget");
  }
  return report;
}

ValidationReport validate_simulation_envelope(const SimulationEnvelope& envelope) {
  ValidationReport report;
  if (envelope.entityCount == 0) {
    report.add(StatusCode::SimulationEnvelopeExceeded,
               StatusSeverity::Error,
               "entity count must be greater than zero",
               "simulation-envelope");
  }
  if (!std::isfinite(envelope.timeWindow.start) || !std::isfinite(envelope.timeWindow.end) ||
      envelope.timeWindow.end <= envelope.timeWindow.start) {
    report.add(StatusCode::SimulationEnvelopeExceeded,
               StatusSeverity::Error,
               "time window must have finite start and end with end greater than start",
               "simulation-envelope");
  }
  if (!envelope.timeWindow.units.empty() &&
      envelope.timeWindow.units != "solver-time" &&
      envelope.timeWindow.units != "seconds" &&
      envelope.timeWindow.units != "cycles") {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               "time window units must be solver-time, seconds, or cycles",
               "simulation-envelope");
  }
  if (envelope.timeWindow.stepHint != 0.0 && !is_positive_finite(envelope.timeWindow.stepHint)) {
    report.add(StatusCode::TimeResolutionInsufficient,
               StatusSeverity::Error,
               "time window step hint must be positive when specified",
               "simulation-envelope");
  }
  if (envelope.timeResolutionHint != 0.0 && !is_positive_finite(envelope.timeResolutionHint)) {
    report.add(StatusCode::TimeResolutionInsufficient,
               StatusSeverity::Error,
               "time resolution hint must be positive when specified",
               "simulation-envelope");
  }
  if (envelope.memoryBudgetBytes == 0) {
    report.add(StatusCode::SimulationEnvelopeExceeded,
               StatusSeverity::Error,
               "memory budget must be greater than zero",
               "simulation-envelope");
  }
  return report;
}

AdmissionReport admit_simulation_envelope(const ModelContract& model,
                                          const ErrorBudget& budget,
                                          const SimulationEnvelope& envelope,
                                          const SolverCapabilityEnvelope& capability) {
  AdmissionReport admission;
  merge_report(admission.validation, validate_model_contract(model));
  merge_report(admission.validation, validate_error_budget(budget));
  merge_report(admission.validation, validate_simulation_envelope(envelope));

  if (!admission.validation.ok) {
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  if (budget.globalTolerance < capability.minimumPositiveTolerance &&
      !has_precision_path(model, PrecisionPath::ExtendedPrecision) &&
      !has_precision_path(model, PrecisionPath::ValidationReplay)) {
    admission.validation.add(StatusCode::PrecisionFailed,
                             StatusSeverity::Halt,
                             "requested tolerance requires a stricter precision path",
                             "admission",
                             false);
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  if (envelope.memoryBudgetBytes < capability.minMemoryBudgetBytes) {
    admission.validation.add(StatusCode::StreamMemoryPressure,
                             StatusSeverity::Halt,
                             "memory budget is below the minimum solver active-window budget",
                             "admission",
                             false);
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  const bool densePairs = envelope.interactionPolicy == InteractionPolicy::AllToAll ||
                          envelope.interactionPolicy == InteractionPolicy::SameSourceEnabled;
  if (densePairs && all_to_all_pair_count(envelope.entityCount) >
                        all_to_all_pair_count(capability.maxBatchEntities)) {
    admission.validation.add(StatusCode::SimulationEnvelopeExceeded,
                             StatusSeverity::Halt,
                             "dense interaction graph exceeds the supported batch envelope",
                             "admission",
                             false);
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  if (envelope.entityCount > capability.maxInteractiveEntities ||
      envelope.outputDetail == OutputDetail::Validation ||
      envelope.latencyTarget == LatencyTarget::Batch ||
      envelope.latencyTarget == LatencyTarget::Validation) {
    admission.decision = AdmissionDecision::Batch;
  } else {
    admission.decision = AdmissionDecision::Admit;
  }

  if (budget.globalTolerance < 1e-12 && has_precision_path(model, PrecisionPath::ExtendedPrecision)) {
    admission.selectedPrecisionPath = PrecisionPath::ExtendedPrecision;
    admission.validation.add(StatusCode::PrecisionEscalated,
                             StatusSeverity::Info,
                             "selected extended precision for strict global tolerance",
                             "admission");
  } else if (has_precision_path(model, PrecisionPath::EventRootFocused)) {
    admission.selectedPrecisionPath = PrecisionPath::EventRootFocused;
  } else if (has_precision_path(model, PrecisionPath::ScaledF64Strict)) {
    admission.selectedPrecisionPath = PrecisionPath::ScaledF64Strict;
  } else {
    admission.selectedPrecisionPath = model.compatiblePrecisionPaths.front();
  }

  return admission;
}

}  // namespace architrino::solver

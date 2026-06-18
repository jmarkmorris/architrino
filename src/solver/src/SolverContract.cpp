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

std::uint64_t saturating_product(std::uint64_t left, std::uint64_t right) {
  if (left != 0 && right > std::numeric_limits<std::uint64_t>::max() / left) {
    return std::numeric_limits<std::uint64_t>::max();
  }
  return left * right;
}

std::uint64_t estimate_pair_count(std::uint64_t entityCount, InteractionPolicy interactionPolicy) {
  if (entityCount == 0) {
    return 0;
  }
  if (interactionPolicy == InteractionPolicy::SameSourceEnabled) {
    return saturating_product(entityCount, entityCount);
  }
  if (interactionPolicy == InteractionPolicy::AllToAll) {
    return saturating_product(entityCount, entityCount - 1);
  }
  return entityCount;
}

bool is_dense_interaction(InteractionPolicy interactionPolicy) {
  return interactionPolicy == InteractionPolicy::AllToAll ||
         interactionPolicy == InteractionPolicy::SameSourceEnabled;
}

double positive_ratio(double numerator, double denominator) {
  if (!std::isfinite(numerator) || !std::isfinite(denominator) || numerator < 0.0 || denominator <= 0.0) {
    return 0.0;
  }
  return numerator / denominator;
}

double output_pressure(OutputDetail outputDetail) {
  switch (outputDetail) {
    case OutputDetail::Preview:
      return 0.25;
    case OutputDetail::Playback:
      return 0.5;
    case OutputDetail::Export:
      return 0.75;
    case OutputDetail::Validation:
      return 1.0;
  }
  return 0.0;
}

double precision_pressure(double globalTolerance, double minimumPositiveTolerance) {
  if (!is_positive_finite(globalTolerance) || !is_positive_finite(minimumPositiveTolerance)) {
    return 0.0;
  }
  const double requestedDigits = std::max(0.0, -std::log10(globalTolerance));
  const double minimumDigits = std::max(1.0, -std::log10(minimumPositiveTolerance));
  return requestedDigits / minimumDigits;
}

AdmissionStressSummary summarize_admission_stress(const ErrorBudget& budget,
                                                  const SimulationEnvelope& envelope,
                                                  const SolverCapabilityEnvelope& capability) {
  AdmissionStressSummary summary;
  summary.entityCount = envelope.entityCount;
  summary.estimatedPairCount = estimate_pair_count(envelope.entityCount, envelope.interactionPolicy);
  summary.entityPressure = positive_ratio(static_cast<double>(envelope.entityCount),
                                          static_cast<double>(capability.maxInteractiveEntities));
  summary.interactionPressure =
      is_dense_interaction(envelope.interactionPolicy)
          ? positive_ratio(static_cast<double>(envelope.entityCount),
                           static_cast<double>(capability.maxBatchEntities))
          : summary.entityPressure;
  summary.memoryPressure = positive_ratio(static_cast<double>(capability.minMemoryBudgetBytes),
                                          static_cast<double>(envelope.memoryBudgetBytes));
  summary.storagePressure =
      positive_ratio(static_cast<double>(capability.minStorageBudgetBytesForStreaming),
                     static_cast<double>(envelope.storageBudgetBytes));
  const double step = envelope.timeResolutionHint != 0.0 ? envelope.timeResolutionHint : envelope.timeWindow.stepHint;
  if (std::isfinite(envelope.timeWindow.start) && std::isfinite(envelope.timeWindow.end) &&
      envelope.timeWindow.end > envelope.timeWindow.start && is_positive_finite(step)) {
    summary.timeStepCountEstimate = std::ceil((envelope.timeWindow.end - envelope.timeWindow.start) / step);
    summary.hasTimeStepCountEstimate = true;
    summary.timeStepPressure = positive_ratio(summary.timeStepCountEstimate, capability.maxInteractiveStepCount);
  }
  summary.outputPressure = output_pressure(envelope.outputDetail);
  summary.precisionPressure = precision_pressure(budget.globalTolerance, capability.minimumPositiveTolerance);

  const std::pair<AdmissionStressDimension, double> pressures[] = {
      {AdmissionStressDimension::EntityCount, summary.entityPressure},
      {AdmissionStressDimension::InteractionGraph, summary.interactionPressure},
      {AdmissionStressDimension::Memory, summary.memoryPressure},
      {AdmissionStressDimension::Storage, summary.storagePressure},
      {AdmissionStressDimension::TimeSteps, summary.timeStepPressure},
      {AdmissionStressDimension::OutputDetail, summary.outputPressure},
      {AdmissionStressDimension::Precision, summary.precisionPressure},
  };
  for (const auto& [dimension, pressure] : pressures) {
    if (pressure > summary.pressureScore) {
      summary.dominantStress = dimension;
      summary.pressureScore = pressure;
    }
  }
  return summary;
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
  if (envelope.storageBudgetBytes == 0) {
    report.add(StatusCode::SimulationEnvelopeExceeded,
               StatusSeverity::Error,
               "storage budget must be greater than zero",
               "simulation-envelope");
  }
  return report;
}

AdmissionReport admit_simulation_envelope(const ModelContract& model,
                                          const ErrorBudget& budget,
                                          const SimulationEnvelope& envelope,
                                          const SolverCapabilityEnvelope& capability) {
  AdmissionReport admission;
  admission.stressSummary = summarize_admission_stress(budget, envelope, capability);
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

  if (envelope.storageBudgetBytes < capability.minStorageBudgetBytesForStreaming) {
    admission.validation.add(StatusCode::StreamMemoryPressure,
                             StatusSeverity::Halt,
                             "storage budget is below the minimum solver streaming budget",
                             "admission",
                             false);
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  if (is_dense_interaction(envelope.interactionPolicy) && envelope.entityCount > capability.maxBatchEntities) {
    admission.validation.add(StatusCode::SimulationEnvelopeExceeded,
                             StatusSeverity::Halt,
                             "dense interaction graph exceeds the supported batch envelope",
                             "admission",
                             false);
    admission.decision = AdmissionDecision::Reject;
    return admission;
  }

  const bool requires_batch_execution = envelope.outputDetail == OutputDetail::Validation ||
                                        envelope.latencyTarget == LatencyTarget::Batch ||
                                        envelope.latencyTarget == LatencyTarget::Validation;
  const bool exceeds_interactive_entities = envelope.entityCount > capability.maxInteractiveEntities;
  if (requires_batch_execution) {
    admission.decision = AdmissionDecision::Batch;
  } else if (exceeds_interactive_entities &&
             envelope.simplificationPolicy == SimplificationPolicy::ExplicitReducedModel) {
    admission.decision = AdmissionDecision::Simplify;
  } else if (exceeds_interactive_entities) {
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
    if (admission.decision == AdmissionDecision::Admit) {
      admission.decision = AdmissionDecision::EscalatePrecision;
    }
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

#include "architrino/solver/PrecisionPathSolver.hpp"

#include "architrino/solver/Geometry.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <string>

namespace architrino::solver {
namespace {

struct RootControls {
  double rootTolerance = 1e-12;
  int maxIterations = 96;
  int scanSubdivisions = 64;
  NumericType numericType = NumericType::F64;
};

int precision_rank(PrecisionPath path) {
  switch (path) {
    case PrecisionPath::Auto:
      return 0;
    case PrecisionPath::ScaledF64Fast:
      return 1;
    case PrecisionPath::ScaledF64Strict:
      return 2;
    case PrecisionPath::AdaptiveMultirate:
      return 3;
    case PrecisionPath::EventRootFocused:
      return 4;
    case PrecisionPath::ExtendedPrecision:
      return 5;
    case PrecisionPath::ValidationReplay:
      return 6;
  }
  return 0;
}

PrecisionPath max_precision_path(PrecisionPath lhs, PrecisionPath rhs) {
  return precision_rank(lhs) >= precision_rank(rhs) ? lhs : rhs;
}

PrecisionPath minimum_path_for_claim(ClaimLevel claimLevel) {
  switch (claimLevel) {
    case ClaimLevel::InteractivePreview:
      return PrecisionPath::ScaledF64Fast;
    case ClaimLevel::MigrationParity:
    case ClaimLevel::ExportedDataset:
      return PrecisionPath::ScaledF64Strict;
    case ClaimLevel::ValidationEvidence:
      return PrecisionPath::ValidationReplay;
  }
  return PrecisionPath::ScaledF64Fast;
}

double positive_tolerance(double value) {
  return std::isfinite(value) && value > 0.0 ? value : 1e-12;
}

RootControls controls_for_path(const CausalRootRequest& request, PrecisionPath path) {
  RootControls controls{
      positive_tolerance(request.rootTolerance),
      std::max(request.maxIterations, 1),
      std::max(request.scanSubdivisions, 1),
      NumericType::F64,
  };

  switch (path) {
    case PrecisionPath::Auto:
    case PrecisionPath::ScaledF64Fast:
      break;
    case PrecisionPath::ScaledF64Strict:
      controls.rootTolerance = std::min(controls.rootTolerance, 1e-12);
      controls.maxIterations = std::max(controls.maxIterations, 128);
      controls.scanSubdivisions = std::max(controls.scanSubdivisions, 128);
      break;
    case PrecisionPath::AdaptiveMultirate:
      controls.rootTolerance = std::min(controls.rootTolerance, 5e-13);
      controls.maxIterations = std::max(controls.maxIterations, 160);
      controls.scanSubdivisions = std::max(controls.scanSubdivisions, 192);
      break;
    case PrecisionPath::EventRootFocused:
      controls.rootTolerance = std::min(controls.rootTolerance, 1e-13);
      controls.maxIterations = std::max(controls.maxIterations, 192);
      controls.scanSubdivisions = std::max(controls.scanSubdivisions, 256);
      break;
    case PrecisionPath::ExtendedPrecision:
      controls.rootTolerance = std::min(controls.rootTolerance, 1e-15);
      controls.maxIterations = std::max(controls.maxIterations, 256);
      controls.scanSubdivisions = std::max(controls.scanSubdivisions, 512);
      controls.numericType = NumericType::Decimal128;
      break;
    case PrecisionPath::ValidationReplay:
      controls.rootTolerance = std::min(controls.rootTolerance, 1e-15);
      controls.maxIterations = std::max(controls.maxIterations, 320);
      controls.scanSubdivisions = std::max(controls.scanSubdivisions, 768);
      controls.numericType = NumericType::Decimal128;
      break;
  }

  return controls;
}

CausalRootRequest apply_controls(CausalRootRequest request, RootControls controls) {
  request.rootTolerance = controls.rootTolerance;
  request.maxIterations = controls.maxIterations;
  request.scanSubdivisions = controls.scanSubdivisions;
  request.source.numericType = controls.numericType;
  request.receiver.numericType = controls.numericType;
  return request;
}

void add_statuses(ValidationReport& target, const ValidationReport& source) {
  for (const StatusRecord& status : source.statuses) {
    target.add(status.code, status.severity, status.message, status.stage, status.recoverable);
  }
}

void summarize_roots(PrecisionSolveReport& report, const CausalRootResult& roots) {
  report.rootCount = static_cast<int>(roots.roots.size());
  report.maxResidual = 0.0;
  report.minAbsJacobian = std::numeric_limits<double>::infinity();
  for (const CausalRoot& root : roots.roots) {
    if (std::isfinite(root.residual)) {
      report.maxResidual = std::max(report.maxResidual, std::abs(root.residual));
    }
    if (std::isfinite(root.jacobian)) {
      report.minAbsJacobian = std::min(report.minAbsJacobian, std::abs(root.jacobian));
    }
  }
  if (!std::isfinite(report.minAbsJacobian)) {
    report.minAbsJacobian = 0.0;
  }
}

double replay_comparison_tolerance(const CausalRootRequest& request, const RootControls& controls) {
  const double timeScale = std::max({
      std::abs(request.source.startTime),
      std::abs(request.source.endTime),
      std::abs(request.receiver.startTime),
      std::abs(request.receiver.endTime),
      std::abs(request.hitTime),
      1.0,
  });
  const double roundoffFloor = timeScale * std::numeric_limits<double>::epsilon() * 64.0;
  return std::max(controls.rootTolerance * 128.0, roundoffFloor);
}

bool roots_match_for_replay(const CausalRootResult& primary,
                            const CausalRootResult& replay,
                            const CausalRootRequest& request,
                            const RootControls& controls) {
  if (!primary.validation.ok || !replay.validation.ok ||
      primary.roots.size() != replay.roots.size()) {
    return false;
  }
  const double tolerance = replay_comparison_tolerance(request, controls);
  for (std::size_t index = 0; index < primary.roots.size(); ++index) {
    const CausalRoot& left = primary.roots[index];
    const CausalRoot& right = replay.roots[index];
    if (std::abs(left.emissionTime - right.emissionTime) > tolerance ||
        std::abs(left.distance - right.distance) > tolerance ||
        std::abs(left.residual - right.residual) > tolerance) {
      return false;
    }
  }
  return true;
}

RootControls replay_controls_for(const RootControls& primary) {
  RootControls controls = primary;
  controls.rootTolerance = std::max(primary.rootTolerance * 0.1,
                                    std::numeric_limits<double>::denorm_min());
  controls.maxIterations = std::max(primary.maxIterations * 2, primary.maxIterations);
  controls.scanSubdivisions = std::max(primary.scanSubdivisions * 2, primary.scanSubdivisions);
  controls.numericType = NumericType::Decimal128;
  return controls;
}

DelayedHitResult build_delayed_hits_from_roots(const CausalRootRequest& request,
                                               const CausalRootResult& roots) {
  DelayedHitResult result;
  result.validation = roots.validation;
  if (!roots.validation.ok) {
    return result;
  }

  result.events.reserve(roots.roots.size());
  for (const CausalRoot& root : roots.roots) {
    const Vector3 displacement = subtract(root.receiverPoint, root.sourcePoint);
    const double strength = std::isfinite(root.branchWeight) ? root.branchWeight : 0.0;
    result.events.push_back(DelayedHitEvent{
        request.sourceId + "->" + request.receiverId + "#" + std::to_string(root.rootId),
        root.rootKind,
        request.sourceId,
        request.receiverId,
        root.rootId,
        root.emissionTime,
        root.hitTime,
        root.distance,
        root.jacobian,
        strength,
        root.sourcePoint,
        root.receiverPoint,
        unit_or_zero(displacement),
        root.statusCode,
    });
  }

  return result;
}

}  // namespace

PrecisionCausalRootResult solve_causal_roots_with_precision(
    const CausalRootRequest& request,
    const PrecisionSolveOptions& options) {
  PrecisionCausalRootResult result;
  result.diagnostic = diagnose_precision(request);

  PrecisionSolveReport& report = result.precision;
  report.requestedPath = options.requestedPath;
  report.diagnosticPath = result.diagnostic.recommendedPath;
  report.claimLevel = options.claimLevel;

  add_statuses(report.validation, result.diagnostic.validation);

  const PrecisionPath minimumPath = minimum_path_for_claim(options.claimLevel);
  const PrecisionPath requestedPath = options.requestedPath == PrecisionPath::Auto
                                          ? result.diagnostic.recommendedPath
                                          : options.requestedPath;
  const PrecisionPath selectedPath =
      max_precision_path(max_precision_path(requestedPath, result.diagnostic.recommendedPath),
                         minimumPath);
  report.selectedPath = selectedPath;
  report.escalated = precision_rank(selectedPath) > precision_rank(requestedPath);

  if (report.escalated && !options.allowEscalation) {
    report.validation.add(StatusCode::PrecisionFailed,
                          StatusSeverity::Halt,
                          "requested precision path is weaker than the required path",
                          "precision-path",
                          false);
    return result;
  }

  if (report.escalated) {
    report.validation.add(StatusCode::PrecisionEscalated,
                          StatusSeverity::Info,
                          "precision path escalated before causal-root solve",
                          "precision-path");
  }

  const RootControls controls = controls_for_path(request, selectedPath);
  report.selectedNumericType = controls.numericType;
  report.rootTolerance = controls.rootTolerance;
  report.maxIterations = controls.maxIterations;
  report.scanSubdivisions = controls.scanSubdivisions;

  result.roots = solve_causal_roots(apply_controls(request, controls));
  add_statuses(report.validation, result.roots.validation);
  summarize_roots(report, result.roots);

  const bool shouldReplay = options.runValidationReplay ||
                            selectedPath == PrecisionPath::ValidationReplay ||
                            options.claimLevel == ClaimLevel::ValidationEvidence;
  if (shouldReplay && result.roots.validation.ok) {
    report.validationReplayRun = true;
    const RootControls replayControls = replay_controls_for(controls);
    const CausalRootResult replayRoots =
        solve_causal_roots(apply_controls(request, replayControls));
    report.validationReplayMatched =
        roots_match_for_replay(result.roots, replayRoots, request, controls);
    if (report.validationReplayMatched) {
      report.validation.add(StatusCode::Ok,
                            StatusSeverity::Ok,
                            "validation replay matched primary causal-root solve",
                            "precision-replay");
    } else {
      report.validation.add(StatusCode::ValidationReplayMismatch,
                            StatusSeverity::Error,
                            "validation replay did not match primary causal-root solve",
                            "precision-replay",
                            false);
    }
  }

  return result;
}

PrecisionRootsAndHitsResult solve_roots_and_hits_with_precision(
    const CausalRootRequest& request,
    const PrecisionSolveOptions& options) {
  const PrecisionCausalRootResult rootResult =
      solve_causal_roots_with_precision(request, options);
  PrecisionRootsAndHitsResult result{
      rootResult.roots,
      build_delayed_hits_from_roots(request, rootResult.roots),
      rootResult.diagnostic,
      rootResult.precision,
  };
  return result;
}

}  // namespace architrino::solver

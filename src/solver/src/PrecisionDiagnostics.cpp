#include "architrino/solver/PrecisionDiagnostics.hpp"

#include "architrino/solver/Geometry.hpp"

#include <algorithm>
#include <cmath>
#include <limits>

namespace architrino::solver {
namespace {

void collect_vector_magnitudes(std::vector<double>& values, Vector3 vector) {
  values.push_back(vector.x);
  values.push_back(vector.y);
  values.push_back(vector.z);
  values.push_back(norm(vector));
}

void collect_segment_geometry(std::vector<double>& values, const LinearPathSegment& segment) {
  const Vector3 endpoint =
      add(segment.positionAtStart, scale(segment.velocity, segment.endTime - segment.startTime));
  collect_vector_magnitudes(values, segment.positionAtStart);
  collect_vector_magnitudes(values, endpoint);
  values.push_back(distance_between(segment.positionAtStart, endpoint));
}

void collect_segment_speed(std::vector<double>& values, const LinearPathSegment& segment) {
  collect_vector_magnitudes(values, segment.velocity);
}

bool has_nonfinite(const std::vector<double>& values) {
  return std::any_of(values.begin(), values.end(), [](double value) {
    return !std::isfinite(value);
  });
}

double f64_resolution_floor(const MagnitudeSummary& summary) {
  if (!summary.hasNonzeroMagnitude || !std::isfinite(summary.maxMagnitude)) {
    return 0.0;
  }
  return summary.maxMagnitude * std::numeric_limits<double>::epsilon();
}

PrecisionPath choose_path(const PrecisionDiagnostic& diagnostic) {
  const double maxOrders = std::max({
      diagnostic.timeScale.ordersOfMagnitude,
      diagnostic.geometryScale.ordersOfMagnitude,
      diagnostic.speedScale.ordersOfMagnitude,
      diagnostic.toleranceScale.ordersOfMagnitude,
  });

  if (diagnostic.extendedPrecisionRecommended || maxOrders >= 12.0) {
    return PrecisionPath::ExtendedPrecision;
  }
  if (diagnostic.scaleNormalizationRecommended || maxOrders >= 8.0) {
    return PrecisionPath::ScaledF64Strict;
  }
  if (diagnostic.toleranceScale.minNonzeroMagnitude > 0.0 &&
      diagnostic.toleranceScale.minNonzeroMagnitude <= 1e-12) {
    return PrecisionPath::EventRootFocused;
  }
  return PrecisionPath::ScaledF64Fast;
}

}  // namespace

MagnitudeSummary summarize_magnitudes(const std::vector<double>& values) {
  MagnitudeSummary summary;
  for (double value : values) {
    const double magnitude = std::abs(value);
    if (!std::isfinite(magnitude) || magnitude == 0.0) {
      continue;
    }
    if (!summary.hasNonzeroMagnitude) {
      summary.minNonzeroMagnitude = magnitude;
      summary.maxMagnitude = magnitude;
      summary.hasNonzeroMagnitude = true;
    } else {
      summary.minNonzeroMagnitude = std::min(summary.minNonzeroMagnitude, magnitude);
      summary.maxMagnitude = std::max(summary.maxMagnitude, magnitude);
    }
  }
  if (summary.hasNonzeroMagnitude && summary.minNonzeroMagnitude > 0.0) {
    summary.ordersOfMagnitude = std::log10(summary.maxMagnitude / summary.minNonzeroMagnitude);
  }
  return summary;
}

PrecisionDiagnostic diagnose_precision(const CausalRootRequest& request) {
  std::vector<double> timeValues = {
      request.source.startTime,
      request.source.endTime,
      request.receiver.startTime,
      request.receiver.endTime,
      request.hitTime,
      request.hitTime - request.source.startTime,
      request.hitTime - request.receiver.startTime,
  };
  std::vector<double> geometryValues;
  std::vector<double> speedValues = {
      request.signalSpeed,
  };
  std::vector<double> toleranceValues = {
      request.rootTolerance,
      request.source.errorBound,
      request.receiver.errorBound,
  };

  collect_segment_geometry(geometryValues, request.source);
  collect_segment_geometry(geometryValues, request.receiver);
  geometryValues.push_back(
      distance_between(position_at(request.source, request.source.startTime),
                       position_at(request.receiver, request.hitTime)));
  collect_segment_speed(speedValues, request.source);
  collect_segment_speed(speedValues, request.receiver);

  PrecisionDiagnostic diagnostic;
  diagnostic.timeScale = summarize_magnitudes(timeValues);
  diagnostic.geometryScale = summarize_magnitudes(geometryValues);
  diagnostic.speedScale = summarize_magnitudes(speedValues);
  diagnostic.toleranceScale = summarize_magnitudes(toleranceValues);

  if (has_nonfinite(timeValues) || has_nonfinite(geometryValues) || has_nonfinite(speedValues) ||
      has_nonfinite(toleranceValues)) {
    diagnostic.validation.add(StatusCode::AppContractError,
                              StatusSeverity::Error,
                              "precision diagnostic inputs must be finite",
                              "precision-diagnostics",
                              false);
  }

  diagnostic.scaleNormalizationRecommended =
      diagnostic.geometryScale.ordersOfMagnitude >= 8.0 ||
      diagnostic.timeScale.ordersOfMagnitude >= 8.0 ||
      diagnostic.geometryScale.maxMagnitude >= 1e9 ||
      diagnostic.timeScale.maxMagnitude >= 1e9;
  diagnostic.extendedPrecisionRecommended =
      diagnostic.geometryScale.ordersOfMagnitude >= 12.0 ||
      diagnostic.timeScale.ordersOfMagnitude >= 12.0 ||
      diagnostic.speedScale.ordersOfMagnitude >= 12.0 ||
      (diagnostic.toleranceScale.minNonzeroMagnitude > 0.0 &&
       diagnostic.toleranceScale.minNonzeroMagnitude <= 1e-15);
  diagnostic.recommendedPath = choose_path(diagnostic);
  diagnostic.recommendedNumericType = diagnostic.extendedPrecisionRecommended
                                          ? NumericType::Decimal128
                                          : NumericType::F64;

  const double toleranceTarget = diagnostic.toleranceScale.minNonzeroMagnitude;
  const double geometryResolutionFloor = f64_resolution_floor(diagnostic.geometryScale);
  const double speedForTimeResolution =
      std::max(std::abs(request.signalSpeed), diagnostic.speedScale.maxMagnitude);
  const double timeResolutionFloor =
      f64_resolution_floor(diagnostic.timeScale) * speedForTimeResolution;
  diagnostic.scaleResolutionLimited =
      toleranceTarget > 0.0 && geometryResolutionFloor > toleranceTarget;
  diagnostic.timeResolutionLimited =
      toleranceTarget > 0.0 && timeResolutionFloor > toleranceTarget;

  if (diagnostic.scaleResolutionLimited) {
    diagnostic.validation.add(
        StatusCode::InsufficientScaleResolution,
        StatusSeverity::Warning,
        "absolute geometry scale is too coarse for the requested tolerance; use local coordinate normalization or a higher-precision input representation",
        "precision-diagnostics");
  }
  if (diagnostic.timeResolutionLimited) {
    diagnostic.validation.add(
        StatusCode::TimeResolutionInsufficient,
        StatusSeverity::Warning,
        "absolute time scale is too coarse for the requested tolerance at the modeled speed",
        "precision-diagnostics");
  }

  if (diagnostic.validation.ok) {
    diagnostic.validation.add(StatusCode::Ok,
                              StatusSeverity::Ok,
                              "precision diagnostic complete",
                              "precision-diagnostics");
  }
  return diagnostic;
}

}  // namespace architrino::solver

#include "architrino/solver/Geometry.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <optional>

namespace architrino::solver {
namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;

double circular_self_hit_residual(double angle, double fieldSpeedRatio) {
  return 2.0 * std::sin(angle / 2.0) - angle / fieldSpeedRatio;
}

double finite_or_zero(double value) {
  return std::isfinite(value) ? value : 0.0;
}

bool pair_overlaps_time_range(const PathHistoryRowF64& source,
                              const PathHistoryRowF64& receiver,
                              const EmissionShellBroadPhaseOptions& options) {
  if (!options.filterTimeRange) {
    return true;
  }
  return source.startTime <= options.timeRangeEnd && source.endTime >= options.timeRangeStart &&
         receiver.startTime <= options.timeRangeEnd && receiver.endTime >= options.timeRangeStart;
}

double axis_distance_lower_bound(double leftMin,
                                 double leftMax,
                                 double rightMin,
                                 double rightMax) {
  if (leftMax < rightMin) {
    return rightMin - leftMax;
  }
  if (rightMax < leftMin) {
    return leftMin - rightMax;
  }
  return 0.0;
}

double axis_distance_upper_bound(double leftMin,
                                 double leftMax,
                                 double rightMin,
                                 double rightMax) {
  return std::max(std::abs(leftMin - rightMax), std::abs(leftMax - rightMin));
}

double aabb_distance_lower_bound(AxisAlignedBounds lhs, AxisAlignedBounds rhs) {
  const double dx = axis_distance_lower_bound(lhs.min.x, lhs.max.x, rhs.min.x, rhs.max.x);
  const double dy = axis_distance_lower_bound(lhs.min.y, lhs.max.y, rhs.min.y, rhs.max.y);
  const double dz = axis_distance_lower_bound(lhs.min.z, lhs.max.z, rhs.min.z, rhs.max.z);
  return std::sqrt(dx * dx + dy * dy + dz * dz);
}

double aabb_distance_upper_bound(AxisAlignedBounds lhs, AxisAlignedBounds rhs) {
  const double dx = axis_distance_upper_bound(lhs.min.x, lhs.max.x, rhs.min.x, rhs.max.x);
  const double dy = axis_distance_upper_bound(lhs.min.y, lhs.max.y, rhs.min.y, rhs.max.y);
  const double dz = axis_distance_upper_bound(lhs.min.z, lhs.max.z, rhs.min.z, rhs.max.z);
  return std::sqrt(dx * dx + dy * dy + dz * dz);
}

bool value_is_finite(double value) {
  return std::isfinite(value);
}

bool path_history_row_is_finite(const PathHistoryRowF64& row) {
  return value_is_finite(row.startTime) && value_is_finite(row.endTime) &&
         value_is_finite(row.startX) && value_is_finite(row.startY) &&
         value_is_finite(row.startZ) && value_is_finite(row.velocityX) &&
         value_is_finite(row.velocityY) && value_is_finite(row.velocityZ) &&
         value_is_finite(row.errorBound);
}

double emission_shell_residual(const PathHistoryRowF64& source,
                               Vector3 receiverPoint,
                               double hitTime,
                               double signalSpeed,
                               double emissionTime) {
  const Vector3 sourcePoint = path_history_position_at_time(source, emissionTime);
  return distance_between(receiverPoint, sourcePoint) - signalSpeed * (hitTime - emissionTime);
}

struct SampledEmissionTimeSolve {
  bool hit = false;
  double emissionTime = 0.0;
  double bestResidual = std::numeric_limits<double>::infinity();
};

bool same_strict_sign(double lhs, double rhs) {
  return (lhs < 0.0 && rhs < 0.0) || (lhs > 0.0 && rhs > 0.0);
}

SampledEmissionTimeSolve solve_sampled_emission_time(const PathHistoryRowF64& source,
                                                     Vector3 receiverPoint,
                                                     double hitTime,
                                                     double signalSpeed,
                                                     double tolerance,
                                                     double emissionStart,
                                                     double emissionEnd) {
  const double startResidual =
      emission_shell_residual(source, receiverPoint, hitTime, signalSpeed, emissionStart);
  const double endResidual =
      emission_shell_residual(source, receiverPoint, hitTime, signalSpeed, emissionEnd);
  const double startAbs = std::abs(startResidual);
  const double endAbs = std::abs(endResidual);
  SampledEmissionTimeSolve result;
  result.bestResidual = std::min(startAbs, endAbs);
  result.emissionTime = startAbs <= endAbs ? emissionStart : emissionEnd;
  if (!std::isfinite(result.bestResidual)) {
    return result;
  }
  if (result.bestResidual <= tolerance) {
    result.hit = true;
    return result;
  }
  if (same_strict_sign(startResidual, endResidual)) {
    return result;
  }

  double lowTime = emissionStart;
  double highTime = emissionEnd;
  double lowResidual = startResidual;
  for (int iteration = 0; iteration < 64; ++iteration) {
    const double midTime = (lowTime + highTime) / 2.0;
    const double midResidual =
        emission_shell_residual(source, receiverPoint, hitTime, signalSpeed, midTime);
    const double midAbs = std::abs(midResidual);
    if (midAbs < result.bestResidual) {
      result.bestResidual = midAbs;
      result.emissionTime = midTime;
    }
    if (midAbs <= tolerance) {
      result.hit = true;
      result.emissionTime = midTime;
      result.bestResidual = midAbs;
      return result;
    }
    if (same_strict_sign(lowResidual, midResidual)) {
      lowTime = midTime;
      lowResidual = midResidual;
    } else {
      highTime = midTime;
    }
  }
  result.hit = result.bestResidual <= tolerance;
  return result;
}

std::optional<EmissionShellBroadPhaseCandidate> classify_emission_shell_counted_pair(
    const PathHistoryRowF64& source,
    const PathHistoryRowF64& receiver,
    std::size_t sourceIndex,
    std::size_t receiverIndex,
    double signalSpeed,
    double tolerance) {
  const double maxDelay = receiver.endTime - source.startTime;
  if (!path_history_row_is_finite(source) || !path_history_row_is_finite(receiver) ||
      !std::isfinite(maxDelay) || maxDelay < 0.0) {
    return std::nullopt;
  }

  const double minDelay = std::max(0.0, receiver.startTime - source.endTime);
  const double radiusLowerBound = signalSpeed * minDelay;
  const double radiusUpperBound = signalSpeed * maxDelay;
  const AxisAlignedBounds sourceBounds = path_history_row_bounds(source);
  const AxisAlignedBounds receiverBounds = path_history_row_bounds(receiver);
  const double distanceLowerBound = aabb_distance_lower_bound(sourceBounds, receiverBounds);
  const double distanceUpperBound = aabb_distance_upper_bound(sourceBounds, receiverBounds);

  if (distanceUpperBound + tolerance < radiusLowerBound ||
      distanceLowerBound - tolerance > radiusUpperBound) {
    return std::nullopt;
  }

  return EmissionShellBroadPhaseCandidate{
      source.pathKey,
      receiver.pathKey,
      source.segmentIndex,
      receiver.segmentIndex,
      static_cast<std::uint64_t>(sourceIndex),
      static_cast<std::uint64_t>(receiverIndex),
      source.startTime,
      source.endTime,
      receiver.startTime,
      receiver.endTime,
      distanceLowerBound,
      distanceUpperBound,
      radiusLowerBound,
      radiusUpperBound,
  };
}

}  // namespace

Vector3 add(Vector3 lhs, Vector3 rhs) {
  return Vector3{lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z};
}

Vector3 subtract(Vector3 lhs, Vector3 rhs) {
  return Vector3{lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z};
}

Vector3 scale(Vector3 value, double factor) {
  return Vector3{value.x * factor, value.y * factor, value.z * factor};
}

double dot(Vector3 lhs, Vector3 rhs) {
  return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
}

double squared_norm(Vector3 value) {
  return dot(value, value);
}

double norm(Vector3 value) {
  return std::sqrt(squared_norm(value));
}

double distance_between(Vector3 lhs, Vector3 rhs) {
  return norm(subtract(lhs, rhs));
}

Vector3 unit_or_zero(Vector3 value) {
  const double length = norm(value);
  if (length == 0.0 || !std::isfinite(length)) {
    return Vector3{};
  }
  return scale(value, 1.0 / length);
}

Vector3 position_at_time(const LinearPathSegment& segment, double time) {
  return add(segment.positionAtStart, scale(segment.velocity, time - segment.startTime));
}

Vector3 path_history_position_at_time(const PathHistoryRowF64& row, double time) {
  const double duration = time - row.startTime;
  return Vector3{
      row.startX + row.velocityX * duration,
      row.startY + row.velocityY * duration,
      row.startZ + row.velocityZ * duration,
  };
}

AxisAlignedBounds path_segment_bounds(const LinearPathSegment& segment) {
  const double duration = segment.endTime - segment.startTime;
  const Vector3 endPoint = add(segment.positionAtStart, scale(segment.velocity, duration));
  return AxisAlignedBounds{
      Vector3{
          std::min(segment.positionAtStart.x, endPoint.x),
          std::min(segment.positionAtStart.y, endPoint.y),
          std::min(segment.positionAtStart.z, endPoint.z),
      },
      Vector3{
          std::max(segment.positionAtStart.x, endPoint.x),
          std::max(segment.positionAtStart.y, endPoint.y),
          std::max(segment.positionAtStart.z, endPoint.z),
      },
  };
}

AxisAlignedBounds path_history_row_bounds(const PathHistoryRowF64& row) {
  const double duration = row.endTime - row.startTime;
  const Vector3 start{row.startX, row.startY, row.startZ};
  const Vector3 end{
      row.startX + row.velocityX * duration,
      row.startY + row.velocityY * duration,
      row.startZ + row.velocityZ * duration,
  };
  const double pad = std::max(0.0, finite_or_zero(row.errorBound));
  return AxisAlignedBounds{
      Vector3{
          std::min(start.x, end.x) - pad,
          std::min(start.y, end.y) - pad,
          std::min(start.z, end.z) - pad,
      },
      Vector3{
          std::max(start.x, end.x) + pad,
          std::max(start.y, end.y) + pad,
          std::max(start.z, end.z) + pad,
      },
  };
}

AxisAlignedBounds merge_bounds(AxisAlignedBounds lhs, AxisAlignedBounds rhs) {
  return AxisAlignedBounds{
      Vector3{
          std::min(lhs.min.x, rhs.min.x),
          std::min(lhs.min.y, rhs.min.y),
          std::min(lhs.min.z, rhs.min.z),
      },
      Vector3{
          std::max(lhs.max.x, rhs.max.x),
          std::max(lhs.max.y, rhs.max.y),
          std::max(lhs.max.z, rhs.max.z),
      },
  };
}

bool bounds_overlap(AxisAlignedBounds lhs, AxisAlignedBounds rhs, double tolerance) {
  return lhs.min.x <= rhs.max.x + tolerance && lhs.max.x + tolerance >= rhs.min.x &&
         lhs.min.y <= rhs.max.y + tolerance && lhs.max.y + tolerance >= rhs.min.y &&
         lhs.min.z <= rhs.max.z + tolerance && lhs.max.z + tolerance >= rhs.min.z;
}

SpherePointIntersection sphere_point_intersection(Vector3 center,
                                                  double radius,
                                                  Vector3 point,
                                                  double tolerance) {
  const double centerDistance = distance_between(center, point);
  const double signedDistance = centerDistance - radius;
  return SpherePointIntersection{
      std::isfinite(centerDistance) && std::isfinite(radius) &&
          std::abs(signedDistance) <= std::max(0.0, tolerance),
      centerDistance,
      signedDistance,
  };
}

EmissionShellBroadPhaseResult query_emission_shell_broad_phase(
    const std::vector<PathHistoryRowF64>& sourceRows,
    const std::vector<PathHistoryRowF64>& receiverRows,
    const EmissionShellBroadPhaseOptions& options) {
  EmissionShellBroadPhaseResult result;
  result.summary.plannedWorkerCount = 1;
  result.candidates.reserve(std::min(options.maxCandidates, sourceRows.size() * receiverRows.size()));

  const double signalSpeed =
      std::isfinite(options.signalSpeed) && options.signalSpeed > 0.0 ? options.signalSpeed : 1.0;
  const double tolerance =
      std::isfinite(options.tolerance) && options.tolerance > 0.0 ? options.tolerance : 0.0;

  for (std::size_t sourceIndex = 0; sourceIndex < sourceRows.size(); ++sourceIndex) {
    const PathHistoryRowF64& source = sourceRows[sourceIndex];
    for (std::size_t receiverIndex = 0; receiverIndex < receiverRows.size(); ++receiverIndex) {
      const PathHistoryRowF64& receiver = receiverRows[receiverIndex];
      if (!options.allowSamePath && source.pathKey == receiver.pathKey) {
        continue;
      }
      if (!pair_overlaps_time_range(source, receiver, options)) {
        continue;
      }
      result.summary.pairCount += 1;

      const std::optional<EmissionShellBroadPhaseCandidate> candidate =
          classify_emission_shell_counted_pair(
              source,
              receiver,
              sourceIndex,
              receiverIndex,
              signalSpeed,
              tolerance);
      if (!candidate.has_value()) {
        result.summary.rejectedPairCount += 1;
        continue;
      }
      if (result.candidates.size() >= options.maxCandidates) {
        result.summary.truncated = true;
        result.summary.candidateCount = static_cast<std::uint64_t>(result.candidates.size());
        return result;
      }

      result.candidates.push_back(*candidate);
    }
  }

  result.summary.candidateCount = static_cast<std::uint64_t>(result.candidates.size());
  return result;
}

EmissionShellBroadPhaseResult query_emission_shell_broad_phase_parallel(
    const std::vector<PathHistoryRowF64>& sourceRows,
    const std::vector<PathHistoryRowF64>& receiverRows,
    const EmissionShellBroadPhaseOptions& options,
    ParallelExecutionOptions parallelOptions) {
  const ParallelExecutionPlan parallelPlan =
      plan_parallel_execution(sourceRows.size(), parallelOptions);
  const double signalSpeed =
      std::isfinite(options.signalSpeed) && options.signalSpeed > 0.0 ? options.signalSpeed : 1.0;
  const double tolerance =
      std::isfinite(options.tolerance) && options.tolerance > 0.0 ? options.tolerance : 0.0;
  std::vector<EmissionShellBroadPhaseResult> partialResults(sourceRows.size());

  parallel_for_index_range(
      sourceRows.size(),
      parallelOptions,
      [&sourceRows, &receiverRows, &options, signalSpeed, tolerance, &partialResults](
          std::size_t sourceIndex) {
        const PathHistoryRowF64& source = sourceRows[sourceIndex];
        EmissionShellBroadPhaseResult local;
        local.candidates.reserve(std::min(options.maxCandidates, receiverRows.size()));
        for (std::size_t receiverIndex = 0; receiverIndex < receiverRows.size(); ++receiverIndex) {
          const PathHistoryRowF64& receiver = receiverRows[receiverIndex];
          if (!options.allowSamePath && source.pathKey == receiver.pathKey) {
            continue;
          }
          if (!pair_overlaps_time_range(source, receiver, options)) {
            continue;
          }
          local.summary.pairCount += 1;
          const std::optional<EmissionShellBroadPhaseCandidate> candidate =
              classify_emission_shell_counted_pair(
                  source,
                  receiver,
                  sourceIndex,
                  receiverIndex,
                  signalSpeed,
                  tolerance);
          if (!candidate.has_value()) {
            local.summary.rejectedPairCount += 1;
            continue;
          }
          local.candidates.push_back(*candidate);
        }
        local.summary.candidateCount = static_cast<std::uint64_t>(local.candidates.size());
        partialResults[sourceIndex] = std::move(local);
      });

  EmissionShellBroadPhaseResult result;
  result.summary.plannedWorkerCount = static_cast<std::uint32_t>(parallelPlan.workerCount);
  result.candidates.reserve(std::min(options.maxCandidates, sourceRows.size() * receiverRows.size()));
  for (const EmissionShellBroadPhaseResult& local : partialResults) {
    result.summary.pairCount += local.summary.pairCount;
    result.summary.rejectedPairCount += local.summary.rejectedPairCount;
    for (const EmissionShellBroadPhaseCandidate& candidate : local.candidates) {
      if (result.candidates.size() >= options.maxCandidates) {
        result.summary.truncated = true;
        continue;
      }
      result.candidates.push_back(candidate);
    }
  }
  result.summary.candidateCount = static_cast<std::uint64_t>(result.candidates.size());
  return result;
}

EmissionShellNarrowPhaseEstimate estimate_emission_shell_narrow_phase(
    const PathHistoryRowF64& source,
    const PathHistoryRowF64& receiver,
    double signalSpeed,
    double tolerance) {
  EmissionShellNarrowPhaseEstimate result;
  if (!path_history_row_is_finite(source) || !path_history_row_is_finite(receiver)) {
    result.statusCode = StatusCode::InternalSolverError;
    result.residual = std::numeric_limits<double>::quiet_NaN();
    return result;
  }

  const double safeSignalSpeed =
      std::isfinite(signalSpeed) && signalSpeed > 0.0 ? signalSpeed : 1.0;
  const double estimatorTolerance =
      std::max(std::isfinite(tolerance) && tolerance >= 0.0 ? tolerance : 0.0, 1e-10);
  std::vector<double> receiverSamples{
      receiver.startTime,
      (receiver.startTime + receiver.endTime) / 2.0,
      receiver.endTime,
  };
  std::sort(receiverSamples.begin(), receiverSamples.end());
  receiverSamples.erase(std::unique(receiverSamples.begin(), receiverSamples.end()),
                        receiverSamples.end());

  double bestResidual = std::numeric_limits<double>::infinity();
  for (double hitTime : receiverSamples) {
    if (!std::isfinite(hitTime) || hitTime < source.startTime) {
      continue;
    }
    result.sampleCount += 1;
    const Vector3 receiverPoint = path_history_position_at_time(receiver, hitTime);
    const double emissionStart = source.startTime;
    const double emissionEnd = std::min(source.endTime, hitTime);
    if (emissionEnd < emissionStart) {
      continue;
    }
    const SampledEmissionTimeSolve solved =
        solve_sampled_emission_time(source,
                                    receiverPoint,
                                    hitTime,
                                    safeSignalSpeed,
                                    estimatorTolerance,
                                    emissionStart,
                                    emissionEnd);
    bestResidual = std::min(bestResidual, solved.bestResidual);
    if (solved.hit) {
      result.classification = EmissionShellNarrowPhaseClassification::SampledHit;
      result.hitTime = hitTime;
      result.emissionTime = solved.emissionTime;
      result.residual = solved.bestResidual;
      return result;
    }
  }

  result.classification = EmissionShellNarrowPhaseClassification::SampledMiss;
  result.residual =
      std::isfinite(bestResidual) ? bestResidual : std::numeric_limits<double>::quiet_NaN();
  return result;
}

DelayedPotentialResult compute_delayed_potential(const DelayedPotentialRequest& request) {
  DelayedPotentialResult result;
  result.usedCausalDenominator = request.useCausalDenominator;
  const double fieldSpeed = std::max(0.001, request.fieldSpeed);
  const double softening = std::max(0.0001, request.softening);
  const int iterations = std::max(1, request.iterations);
  result.iterations = iterations;

  double tau =
      distance_between(request.samplePoint, position_at_time(request.source, request.observationTime)) /
      fieldSpeed;
  for (int index = 0; index < iterations; ++index) {
    const double emissionTime = request.observationTime - tau;
    const Vector3 emittedPosition = position_at_time(request.source, emissionTime);
    tau = distance_between(request.samplePoint, emittedPosition) / fieldSpeed;
  }

  result.tau = tau;
  result.emissionTime = request.observationTime - tau;
  result.emissionPoint = position_at_time(request.source, result.emissionTime);
  result.displacement = subtract(request.samplePoint, result.emissionPoint);
  result.distance = std::max(0.0001, norm(result.displacement));
  result.denominator = std::sqrt(result.distance * result.distance + softening * softening);
  result.kappa = 1.0;

  if (request.useCausalDenominator) {
    const Vector3 direction = scale(result.displacement, 1.0 / result.distance);
    result.kappa = 1.0 - dot(direction, request.source.velocity) / fieldSpeed;
    result.denominator *= std::max(0.08, std::abs(result.kappa));
  }

  result.potential = (request.normalization * request.sourceCharge) / result.denominator;
  if (result.emissionTime < request.source.startTime || result.emissionTime > request.source.endTime) {
    result.statusCode = StatusCode::InsufficientHistoryDepth;
  }
  if (!std::isfinite(result.tau) || !std::isfinite(result.emissionTime) ||
      !std::isfinite(result.distance) || !std::isfinite(result.denominator) ||
      !std::isfinite(result.potential) || !std::isfinite(result.kappa)) {
    result.statusCode = StatusCode::InternalSolverError;
  }
  return result;
}

FieldSpeedRegime classify_field_speed_regime(double fieldSpeedRatio, double tolerance) {
  if (fieldSpeedRatio < 1.0 - tolerance) {
    return FieldSpeedRegime::SubField;
  }
  if (fieldSpeedRatio > 1.0 + tolerance) {
    return FieldSpeedRegime::SuperField;
  }
  return FieldSpeedRegime::FieldSpeed;
}

CircularSelfHitSpanResult solve_circular_self_hit_span(
    const CircularSelfHitSpanRequest& request) {
  CircularSelfHitSpanResult result;
  const double fieldSpeedRatio = std::isfinite(request.fieldSpeedRatio) && request.fieldSpeedRatio > 0.0
                                     ? request.fieldSpeedRatio
                                     : 1.0;
  const double fieldSpeedTolerance =
      std::isfinite(request.fieldSpeedTolerance) && request.fieldSpeedTolerance >= 0.0
          ? request.fieldSpeedTolerance
          : 0.015;
  const double tolerance =
      std::isfinite(request.tolerance) && request.tolerance >= 0.0 ? request.tolerance : 1e-12;
  const double maxAngle =
      std::isfinite(request.maxAngle) && request.maxAngle > 0.0 ? request.maxAngle : kPi * 1.96;
  const int maxIterations = std::max(1, request.maxIterations);
  const int scanSubdivisions = std::max(1, request.scanSubdivisions);

  result.fieldSpeedRatio = fieldSpeedRatio;
  result.fieldSpeedTolerance = fieldSpeedTolerance;
  result.regime = classify_field_speed_regime(fieldSpeedRatio, fieldSpeedTolerance);

  if (fieldSpeedRatio <= 1.0 + fieldSpeedTolerance) {
    result.resultKind = CircularSelfHitResultKind::BelowThreshold;
    return result;
  }

  const double step = kPi / static_cast<double>(scanSubdivisions);
  double low = step;
  double high = maxAngle;
  bool foundHigh = false;
  double previousAngle = low;
  double previousValue = circular_self_hit_residual(previousAngle, fieldSpeedRatio);

  for (double angle = low + step; angle <= maxAngle + step * 1e-12; angle += step) {
    const double value = circular_self_hit_residual(angle, fieldSpeedRatio);
    if (previousValue > 0.0 && value <= 0.0) {
      low = previousAngle;
      high = angle;
      foundHigh = true;
      break;
    }
    previousAngle = angle;
    previousValue = value;
  }

  if (!foundHigh) {
    result.statusCode = StatusCode::RootNotBracketed;
    result.resultKind = CircularSelfHitResultKind::FallbackPi;
    result.span = kPi;
    result.bracketLow = low;
    result.bracketHigh = high;
    result.residual = circular_self_hit_residual(kPi, fieldSpeedRatio);
    return result;
  }

  int iterations = 0;
  for (; iterations < maxIterations; ++iterations) {
    const double middle = (low + high) / 2.0;
    const double value = circular_self_hit_residual(middle, fieldSpeedRatio);
    if (std::abs(value) <= tolerance || std::abs(high - low) <= tolerance) {
      low = middle;
      high = middle;
      break;
    }
    if (value > 0.0) {
      low = middle;
    } else {
      high = middle;
    }
  }

  result.resultKind = CircularSelfHitResultKind::RootSolved;
  result.rootFound = true;
  result.span = (low + high) / 2.0;
  result.bracketLow = low;
  result.bracketHigh = high;
  result.residual = circular_self_hit_residual(result.span, fieldSpeedRatio);
  result.iterations = iterations;
  return result;
}

}  // namespace architrino::solver

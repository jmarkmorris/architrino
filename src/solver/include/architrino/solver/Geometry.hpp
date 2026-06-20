#pragma once

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/ParallelExecution.hpp"
#include "architrino/solver/PathHistoryStream.hpp"

#include <cstddef>
#include <cstdint>
#include <vector>

namespace architrino::solver {

struct AxisAlignedBounds {
  Vector3 min;
  Vector3 max;
};

struct SpherePointIntersection {
  bool intersects = false;
  double centerDistance = 0.0;
  double signedDistance = 0.0;
};

struct EmissionShellBroadPhaseOptions {
  double signalSpeed = 1.0;
  double tolerance = 0.0;
  std::size_t maxCandidates = 4096;
  bool allowSamePath = false;
  bool filterTimeRange = false;
  double timeRangeStart = 0.0;
  double timeRangeEnd = 0.0;
  std::size_t requestedWorkerCount = 0;
};

struct EmissionShellBroadPhaseCandidate {
  std::uint64_t sourcePathKey = 0;
  std::uint64_t receiverPathKey = 0;
  std::uint64_t sourceSegmentIndex = 0;
  std::uint64_t receiverSegmentIndex = 0;
  std::uint64_t sourceRowIndex = 0;
  std::uint64_t receiverRowIndex = 0;
  double sourceTimeStart = 0.0;
  double sourceTimeEnd = 0.0;
  double receiverTimeStart = 0.0;
  double receiverTimeEnd = 0.0;
  double distanceLowerBound = 0.0;
  double distanceUpperBound = 0.0;
  double radiusLowerBound = 0.0;
  double radiusUpperBound = 0.0;
};

struct EmissionShellBroadPhaseSummary {
  std::uint64_t pairCount = 0;
  std::uint64_t rejectedPairCount = 0;
  std::uint64_t candidateCount = 0;
  bool truncated = false;
  std::uint32_t plannedWorkerCount = 1;
};

struct EmissionShellBroadPhaseResult {
  EmissionShellBroadPhaseSummary summary;
  std::vector<EmissionShellBroadPhaseCandidate> candidates;
};

enum class EmissionShellIndexCoverageStatus {
  Complete = 0,
  Truncated = 1,
  InvalidInput = 2,
};

struct EmissionShellIndexedBroadPhaseOptions {
  std::size_t timeSlabCount = 64;
  double spatialCellSize = 1.0;
  std::uint64_t sourceRowOffset = 0;
  std::uint64_t receiverRowOffset = 0;
  bool useFixedTimeRange = false;
  double timeRangeStart = 0.0;
  double timeRangeEnd = 0.0;
};

struct EmissionShellIndexedBroadPhaseSummary {
  std::size_t timeSlabCount = 0;
  double spatialCellSize = 0.0;
  double timeRangeStart = 0.0;
  double timeRangeEnd = 0.0;
  std::uint64_t sourceRowOffset = 0;
  std::uint64_t receiverRowOffset = 0;
  std::uint64_t receiverCellRows = 0;
  std::uint64_t shellAnnulusRows = 0;
  std::uint64_t cellLookups = 0;
  std::uint64_t indexedPairTests = 0;
  std::uint64_t duplicatePairTests = 0;
  EmissionShellIndexCoverageStatus coverageStatus =
      EmissionShellIndexCoverageStatus::Complete;
};

struct EmissionShellIndexedBroadPhaseResult {
  EmissionShellBroadPhaseResult broadPhase;
  EmissionShellIndexedBroadPhaseSummary index;
};

enum class EmissionShellNarrowPhaseClassification {
  SampledMiss = 0,
  SampledHit = 1,
};

struct EmissionShellNarrowPhaseEstimate {
  StatusCode statusCode = StatusCode::Ok;
  EmissionShellNarrowPhaseClassification classification =
      EmissionShellNarrowPhaseClassification::SampledMiss;
  std::uint32_t sampleCount = 0;
  double hitTime = 0.0;
  double emissionTime = 0.0;
  double residual = 0.0;
};

struct DelayedPotentialRequest {
  LinearPathSegment source;
  Vector3 samplePoint;
  double observationTime = 0.0;
  double fieldSpeed = 6.0;
  double normalization = 1.0;
  double softening = 0.08;
  double sourceCharge = 1.0;
  int iterations = 4;
  bool useCausalDenominator = false;
};

struct DelayedPotentialResult {
  StatusCode statusCode = StatusCode::Ok;
  double tau = 0.0;
  double emissionTime = 0.0;
  Vector3 emissionPoint;
  Vector3 displacement;
  double distance = 0.0;
  double denominator = 0.0;
  double potential = 0.0;
  double kappa = 1.0;
  int iterations = 0;
  bool usedCausalDenominator = false;
};

enum class FieldSpeedRegime {
  SubField = 0,
  FieldSpeed = 1,
  SuperField = 2,
};

enum class CircularSelfHitResultKind {
  BelowThreshold = 0,
  RootSolved = 1,
  FallbackPi = 2,
};

struct CircularSelfHitSpanRequest {
  double fieldSpeedRatio = 1.0;
  double fieldSpeedTolerance = 0.015;
  double tolerance = 1e-12;
  double maxAngle = 3.141592653589793238462643383279502884 * 1.96;
  int maxIterations = 48;
  int scanSubdivisions = 72;
};

struct CircularSelfHitSpanResult {
  StatusCode statusCode = StatusCode::Ok;
  FieldSpeedRegime regime = FieldSpeedRegime::FieldSpeed;
  CircularSelfHitResultKind resultKind = CircularSelfHitResultKind::BelowThreshold;
  double fieldSpeedRatio = 1.0;
  double fieldSpeedTolerance = 0.015;
  double span = 0.0;
  double bracketLow = 0.0;
  double bracketHigh = 0.0;
  double residual = 0.0;
  bool rootFound = false;
  int iterations = 0;
};

Vector3 add(Vector3 lhs, Vector3 rhs);
Vector3 subtract(Vector3 lhs, Vector3 rhs);
Vector3 scale(Vector3 value, double factor);
double dot(Vector3 lhs, Vector3 rhs);
double squared_norm(Vector3 value);
double norm(Vector3 value);
double distance_between(Vector3 lhs, Vector3 rhs);
Vector3 unit_or_zero(Vector3 value);
Vector3 position_at_time(const LinearPathSegment& segment, double time);
Vector3 path_history_position_at_time(const PathHistoryRowF64& row, double time);
AxisAlignedBounds path_segment_bounds(const LinearPathSegment& segment);
AxisAlignedBounds path_history_row_bounds(const PathHistoryRowF64& row);
AxisAlignedBounds merge_bounds(AxisAlignedBounds lhs, AxisAlignedBounds rhs);
bool bounds_overlap(AxisAlignedBounds lhs, AxisAlignedBounds rhs, double tolerance = 0.0);
SpherePointIntersection sphere_point_intersection(Vector3 center,
                                                  double radius,
                                                  Vector3 point,
                                                  double tolerance = 0.0);
EmissionShellBroadPhaseResult query_emission_shell_broad_phase(
    const std::vector<PathHistoryRowF64>& sourceRows,
    const std::vector<PathHistoryRowF64>& receiverRows,
    const EmissionShellBroadPhaseOptions& options);
EmissionShellBroadPhaseResult query_emission_shell_broad_phase_parallel(
    const std::vector<PathHistoryRowF64>& sourceRows,
    const std::vector<PathHistoryRowF64>& receiverRows,
    const EmissionShellBroadPhaseOptions& options,
    ParallelExecutionOptions parallelOptions = {});
EmissionShellIndexedBroadPhaseResult query_emission_shell_broad_phase_indexed_v0(
    const std::vector<PathHistoryRowF64>& sourceRows,
    const std::vector<PathHistoryRowF64>& receiverRows,
    const EmissionShellBroadPhaseOptions& broadPhaseOptions,
    const EmissionShellIndexedBroadPhaseOptions& indexOptions);
EmissionShellNarrowPhaseEstimate estimate_emission_shell_narrow_phase(
    const PathHistoryRowF64& source,
    const PathHistoryRowF64& receiver,
    double signalSpeed,
    double tolerance);
DelayedPotentialResult compute_delayed_potential(const DelayedPotentialRequest& request);
FieldSpeedRegime classify_field_speed_regime(double fieldSpeedRatio, double tolerance);
CircularSelfHitSpanResult solve_circular_self_hit_span(
    const CircularSelfHitSpanRequest& request);

}  // namespace architrino::solver

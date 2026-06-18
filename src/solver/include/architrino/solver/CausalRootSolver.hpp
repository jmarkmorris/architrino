#pragma once

#include "architrino/solver/SolverTypes.hpp"

#include <string>
#include <vector>

namespace architrino::solver {

struct Vector3 {
  double x = 0.0;
  double y = 0.0;
  double z = 0.0;
};

struct LinearPathSegment {
  std::string pathId;
  double startTime = 0.0;
  double endTime = 0.0;
  Vector3 positionAtStart;
  Vector3 velocity;
  NumericType numericType = NumericType::F64;
  double errorBound = 0.0;
};

struct CircularPathSegment {
  std::string pathId;
  double startTime = 0.0;
  double endTime = 0.0;
  Vector3 center;
  Vector3 radiusU;
  Vector3 radiusV;
  double angularVelocity = 0.0;
  double phaseAtEpoch = 0.0;
  double epochTime = 0.0;
  NumericType numericType = NumericType::F64;
  double errorBound = 0.0;
};

struct CausalRootRequest {
  std::string receiverId;
  std::string sourceId;
  LinearPathSegment source;
  LinearPathSegment receiver;
  double hitTime = 0.0;
  double signalSpeed = 1.0;
  double rootTolerance = 1e-12;
  int maxIterations = 96;
  int scanSubdivisions = 64;
};

struct CircularSourceCausalRootRequest {
  std::string receiverId;
  std::string sourceId;
  CircularPathSegment source;
  LinearPathSegment receiver;
  double hitTime = 0.0;
  double signalSpeed = 1.0;
  double rootTolerance = 1e-12;
  int maxIterations = 96;
  int scanSubdivisions = 64;
};

struct CausalRoot {
  std::string receiverId;
  std::string sourceId;
  int rootId = 0;
  std::string rootKind = "partner";
  double emissionTime = 0.0;
  double hitTime = 0.0;
  double delay = 0.0;
  double distance = 0.0;
  double residual = 0.0;
  double jacobian = 0.0;
  double branchWeight = 0.0;
  double bracketStart = 0.0;
  double bracketEnd = 0.0;
  int iterations = 0;
  Vector3 sourcePoint;
  Vector3 receiverPoint;
  StatusCode statusCode = StatusCode::Ok;
};

struct CausalRootResult {
  std::vector<CausalRoot> roots;
  ValidationReport validation;
};

struct DelayedHitEvent {
  std::string eventId;
  std::string rootKind;
  std::string emitterId;
  std::string receiverId;
  int rootId = 0;
  double emissionTime = 0.0;
  double hitTime = 0.0;
  double distance = 0.0;
  double jacobian = 0.0;
  double strength = 0.0;
  Vector3 emissionPoint;
  Vector3 receiverPoint;
  Vector3 unitDirection;
  StatusCode statusCode = StatusCode::Ok;
};

struct DelayedHitResult {
  std::vector<DelayedHitEvent> events;
  ValidationReport validation;
};

Vector3 position_at(const LinearPathSegment& segment, double time);
Vector3 position_at(const CircularPathSegment& segment, double time);
Vector3 velocity_at(const CircularPathSegment& segment, double time);
CausalRootResult solve_causal_roots(const CausalRootRequest& request);
CausalRootResult solve_circular_source_causal_roots(
    const CircularSourceCausalRootRequest& request);
DelayedHitResult solve_delayed_hits(const CausalRootRequest& request);

}  // namespace architrino::solver

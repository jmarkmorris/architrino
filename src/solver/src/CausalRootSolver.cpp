#include "architrino/solver/CausalRootSolver.hpp"

#include "architrino/solver/Geometry.hpp"

#include <boost/multiprecision/cpp_dec_float.hpp>

#include <algorithm>
#include <cmath>
#include <limits>

namespace architrino::solver {

namespace {

using Real = boost::multiprecision::cpp_dec_float_50;

struct EvalState {
  Real residual = 0;
  Real distance = 0;
  Real dx = 0;
  Real dy = 0;
  Real dz = 0;
};

struct ReceiverModulatorFields {
  double sourceRadialSpeed = 0.0;
  double receiverRadialSpeed = 0.0;
  double sourceWakeDenominator = 0.0;
  double receiverWakeNumerator = 0.0;
  double receiverCrossingFactor = 0.0;
  double receiverModulator = 0.0;
  double unsignedReceiverModulator = 0.0;
  StatusCode statusCode = StatusCode::Ok;
};

Real to_real(double value) {
  return Real(value);
}

bool finite_positive(double value) {
  return std::isfinite(value) && value > 0.0;
}

bool finite_nonnegative(double value) {
  return std::isfinite(value) && value >= 0.0;
}

bool finite_vector(Vector3 value) {
  return std::isfinite(value.x) && std::isfinite(value.y) && std::isfinite(value.z);
}

bool finite_segment(const LinearPathSegment& segment) {
  return std::isfinite(segment.startTime) && std::isfinite(segment.endTime) &&
         finite_vector(segment.positionAtStart) && finite_vector(segment.velocity) &&
         finite_nonnegative(segment.errorBound);
}

bool finite_segment(const CircularPathSegment& segment) {
  return std::isfinite(segment.startTime) && std::isfinite(segment.endTime) &&
         finite_vector(segment.center) && finite_vector(segment.radiusU) &&
         finite_vector(segment.radiusV) && std::isfinite(segment.angularVelocity) &&
         std::isfinite(segment.phaseAtEpoch) && std::isfinite(segment.epochTime) &&
         finite_nonnegative(segment.errorBound);
}

EvalState evaluate_root_function(const CausalRootRequest& request, Real emissionTime) {
  const Real hitTime = to_real(request.hitTime);
  const Real signalSpeed = to_real(request.signalSpeed);

  const Real receiverDt = hitTime - to_real(request.receiver.startTime);
  const Real sourceDt = emissionTime - to_real(request.source.startTime);

  const Real rx = to_real(request.receiver.positionAtStart.x) +
                  to_real(request.receiver.velocity.x) * receiverDt;
  const Real ry = to_real(request.receiver.positionAtStart.y) +
                  to_real(request.receiver.velocity.y) * receiverDt;
  const Real rz = to_real(request.receiver.positionAtStart.z) +
                  to_real(request.receiver.velocity.z) * receiverDt;

  const Real sx = to_real(request.source.positionAtStart.x) +
                  to_real(request.source.velocity.x) * sourceDt;
  const Real sy = to_real(request.source.positionAtStart.y) +
                  to_real(request.source.velocity.y) * sourceDt;
  const Real sz = to_real(request.source.positionAtStart.z) +
                  to_real(request.source.velocity.z) * sourceDt;

  const Real dx = rx - sx;
  const Real dy = ry - sy;
  const Real dz = rz - sz;
  const Real distance = sqrt(dx * dx + dy * dy + dz * dz);
  const Real residual = distance - signalSpeed * (hitTime - emissionTime);
  return EvalState{residual, distance, dx, dy, dz};
}

EvalState evaluate_circular_source_root_function(
    const CircularSourceCausalRootRequest& request,
    Real emissionTime) {
  const Real hitTime = to_real(request.hitTime);
  const Real signalSpeed = to_real(request.signalSpeed);

  const Real receiverDt = hitTime - to_real(request.receiver.startTime);
  const Real phase = to_real(request.source.phaseAtEpoch) +
                     to_real(request.source.angularVelocity) *
                         (emissionTime - to_real(request.source.epochTime));
  const Real cosPhase = cos(phase);
  const Real sinPhase = sin(phase);

  const Real rx = to_real(request.receiver.positionAtStart.x) +
                  to_real(request.receiver.velocity.x) * receiverDt;
  const Real ry = to_real(request.receiver.positionAtStart.y) +
                  to_real(request.receiver.velocity.y) * receiverDt;
  const Real rz = to_real(request.receiver.positionAtStart.z) +
                  to_real(request.receiver.velocity.z) * receiverDt;

  const Real sx = to_real(request.source.center.x) +
                  to_real(request.source.radiusU.x) * cosPhase +
                  to_real(request.source.radiusV.x) * sinPhase;
  const Real sy = to_real(request.source.center.y) +
                  to_real(request.source.radiusU.y) * cosPhase +
                  to_real(request.source.radiusV.y) * sinPhase;
  const Real sz = to_real(request.source.center.z) +
                  to_real(request.source.radiusU.z) * cosPhase +
                  to_real(request.source.radiusV.z) * sinPhase;

  const Real dx = rx - sx;
  const Real dy = ry - sy;
  const Real dz = rz - sz;
  const Real distance = sqrt(dx * dx + dy * dy + dz * dz);
  const Real residual = distance - signalSpeed * (hitTime - emissionTime);
  return EvalState{residual, distance, dx, dy, dz};
}

bool near_zero(const Real& value, double tolerance) {
  return abs(value) <= Real(tolerance);
}

bool has_opposite_sign(const Real& lhs, const Real& rhs) {
  return (lhs < 0 && rhs > 0) || (lhs > 0 && rhs < 0);
}

ReceiverModulatorFields compute_receiver_modulator(const EvalState& eval,
                                                    double signalSpeed,
                                                    Vector3 sourceVelocity,
                                                    Vector3 receiverVelocity,
                                                    double tolerance) {
  ReceiverModulatorFields fields;
  Real sourceRadialSpeed = std::numeric_limits<double>::infinity();
  Real receiverRadialSpeed = std::numeric_limits<double>::infinity();
  if (eval.distance > 0) {
    sourceRadialSpeed = (eval.dx * to_real(sourceVelocity.x) +
                         eval.dy * to_real(sourceVelocity.y) +
                         eval.dz * to_real(sourceVelocity.z)) /
                        eval.distance;
    receiverRadialSpeed = (eval.dx * to_real(receiverVelocity.x) +
                           eval.dy * to_real(receiverVelocity.y) +
                           eval.dz * to_real(receiverVelocity.z)) /
                          eval.distance;
  }

  const Real sourceWakeDenominator = to_real(signalSpeed) - sourceRadialSpeed;
  const Real receiverWakeNumerator = to_real(signalSpeed) - receiverRadialSpeed;
  const Real receiverCrossingFactor = receiverWakeNumerator / to_real(signalSpeed);
  const Real receiverModulator = receiverWakeNumerator / sourceWakeDenominator;

  fields.sourceRadialSpeed = sourceRadialSpeed.convert_to<double>();
  fields.receiverRadialSpeed = receiverRadialSpeed.convert_to<double>();
  fields.sourceWakeDenominator = sourceWakeDenominator.convert_to<double>();
  fields.receiverWakeNumerator = receiverWakeNumerator.convert_to<double>();
  fields.receiverCrossingFactor = receiverCrossingFactor.convert_to<double>();
  fields.receiverModulator = receiverModulator.convert_to<double>();
  fields.unsignedReceiverModulator = abs(receiverModulator).convert_to<double>();

  if (!std::isfinite(fields.sourceWakeDenominator) ||
      !std::isfinite(fields.receiverWakeNumerator) ||
      !std::isfinite(fields.receiverCrossingFactor) ||
      !std::isfinite(fields.receiverModulator) ||
      !std::isfinite(fields.unsignedReceiverModulator)) {
    fields.statusCode = StatusCode::ReceiverModulatorDegenerate;
  } else if (std::abs(fields.sourceWakeDenominator) <= tolerance) {
    fields.statusCode = StatusCode::SmallJacobian;
  } else if (std::abs(fields.receiverWakeNumerator) <= tolerance) {
    fields.statusCode = StatusCode::ReceiverModulatorDegenerate;
  }

  return fields;
}

CausalRoot make_root(const CausalRootRequest& request,
                     double emissionTime,
                     double bracketStart,
                     double bracketEnd,
                     int iterations,
                     int rootId) {
  const Vector3 sourcePoint = position_at(request.source, emissionTime);
  const Vector3 receiverPoint = position_at(request.receiver, request.hitTime);
  const EvalState eval = evaluate_root_function(request, to_real(emissionTime));
  const double distance = eval.distance.convert_to<double>();
  const double delay = request.hitTime - emissionTime;
  const double residual = eval.residual.convert_to<double>();
  const ReceiverModulatorFields modulator = compute_receiver_modulator(
      eval, request.signalSpeed, request.source.velocity, request.receiver.velocity, request.rootTolerance);
  const Real jacobianReal = to_real(modulator.sourceWakeDenominator);
  const double jacobian = jacobianReal.convert_to<double>();
  const double branchWeight = std::isfinite(jacobian) && std::abs(jacobian) > 0.0
                                  ? (Real(1) / abs(jacobianReal)).convert_to<double>()
                                  : std::numeric_limits<double>::infinity();
  const StatusCode rootStatus =
      std::abs(jacobian) <= request.rootTolerance ? StatusCode::SmallJacobian : StatusCode::Ok;

  return CausalRoot{
      request.receiverId,
      request.sourceId,
      rootId,
      "partner",
      emissionTime,
      request.hitTime,
      delay,
      distance,
      residual,
      jacobian,
      branchWeight,
      modulator.sourceRadialSpeed,
      modulator.receiverRadialSpeed,
      modulator.sourceWakeDenominator,
      modulator.receiverWakeNumerator,
      modulator.receiverCrossingFactor,
      modulator.receiverModulator,
      modulator.unsignedReceiverModulator,
      bracketStart,
      bracketEnd,
      iterations,
      sourcePoint,
      receiverPoint,
      rootStatus,
      rootStatus == StatusCode::SmallJacobian ? StatusCode::SmallJacobian : modulator.statusCode,
  };
}

CircularPathSegment make_source_segment(const CircularSourceCausalRootRequest& request) {
  return request.source;
}

CausalRoot make_root(const CircularSourceCausalRootRequest& request,
                     double emissionTime,
                     double bracketStart,
                     double bracketEnd,
                     int iterations,
                     int rootId) {
  const Vector3 sourcePoint = position_at(make_source_segment(request), emissionTime);
  const Vector3 sourceVelocity = velocity_at(make_source_segment(request), emissionTime);
  const Vector3 receiverPoint = position_at(request.receiver, request.hitTime);
  const EvalState eval = evaluate_circular_source_root_function(request, to_real(emissionTime));
  const double distance = eval.distance.convert_to<double>();
  const double delay = request.hitTime - emissionTime;
  const double residual = eval.residual.convert_to<double>();
  const ReceiverModulatorFields modulator = compute_receiver_modulator(
      eval, request.signalSpeed, sourceVelocity, request.receiver.velocity, request.rootTolerance);
  const Real jacobianReal = to_real(modulator.sourceWakeDenominator);
  const double jacobian = jacobianReal.convert_to<double>();
  const double branchWeight = std::isfinite(jacobian) && std::abs(jacobian) > 0.0
                                  ? (Real(1) / abs(jacobianReal)).convert_to<double>()
                                  : std::numeric_limits<double>::infinity();
  const StatusCode rootStatus =
      std::abs(jacobian) <= request.rootTolerance ? StatusCode::SmallJacobian : StatusCode::Ok;

  return CausalRoot{
      request.receiverId,
      request.sourceId,
      rootId,
      "partner",
      emissionTime,
      request.hitTime,
      delay,
      distance,
      residual,
      jacobian,
      branchWeight,
      modulator.sourceRadialSpeed,
      modulator.receiverRadialSpeed,
      modulator.sourceWakeDenominator,
      modulator.receiverWakeNumerator,
      modulator.receiverCrossingFactor,
      modulator.receiverModulator,
      modulator.unsignedReceiverModulator,
      bracketStart,
      bracketEnd,
      iterations,
      sourcePoint,
      receiverPoint,
      rootStatus,
      rootStatus == StatusCode::SmallJacobian ? StatusCode::SmallJacobian : modulator.statusCode,
  };
}

bool is_duplicate_root(const std::vector<CausalRoot>& roots, double emissionTime, double tolerance) {
  return std::any_of(roots.begin(), roots.end(), [emissionTime, tolerance](const CausalRoot& root) {
    return std::abs(root.emissionTime - emissionTime) <= tolerance * 8.0;
  });
}

}  // namespace

Vector3 position_at(const LinearPathSegment& segment, double time) {
  const double dt = time - segment.startTime;
  return Vector3{
      segment.positionAtStart.x + segment.velocity.x * dt,
      segment.positionAtStart.y + segment.velocity.y * dt,
      segment.positionAtStart.z + segment.velocity.z * dt,
  };
}

Vector3 position_at(const CircularPathSegment& segment, double time) {
  const double phase = segment.phaseAtEpoch + segment.angularVelocity * (time - segment.epochTime);
  const double cosPhase = std::cos(phase);
  const double sinPhase = std::sin(phase);
  return Vector3{
      segment.center.x + segment.radiusU.x * cosPhase + segment.radiusV.x * sinPhase,
      segment.center.y + segment.radiusU.y * cosPhase + segment.radiusV.y * sinPhase,
      segment.center.z + segment.radiusU.z * cosPhase + segment.radiusV.z * sinPhase,
  };
}

Vector3 velocity_at(const CircularPathSegment& segment, double time) {
  const double phase = segment.phaseAtEpoch + segment.angularVelocity * (time - segment.epochTime);
  const double cosPhase = std::cos(phase);
  const double sinPhase = std::sin(phase);
  return Vector3{
      segment.angularVelocity * (-segment.radiusU.x * sinPhase + segment.radiusV.x * cosPhase),
      segment.angularVelocity * (-segment.radiusU.y * sinPhase + segment.radiusV.y * cosPhase),
      segment.angularVelocity * (-segment.radiusU.z * sinPhase + segment.radiusV.z * cosPhase),
  };
}

CausalRootResult solve_causal_roots(const CausalRootRequest& request) {
  CausalRootResult result;
  if (request.receiverId.empty() || request.sourceId.empty()) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "source id and receiver id are required",
                          "causal-root");
    return result;
  }
  if (!finite_positive(request.signalSpeed)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "signal speed must be positive and finite",
                          "causal-root");
    return result;
  }
  if (!finite_positive(request.rootTolerance)) {
    result.validation.add(StatusCode::PrecisionFailed,
                          StatusSeverity::Error,
                          "root tolerance must be positive and finite",
                          "causal-root");
    return result;
  }
  if (request.maxIterations <= 0 || request.scanSubdivisions <= 0) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "max iterations and scan subdivisions must be positive",
                          "causal-root");
    return result;
  }
  if (!std::isfinite(request.hitTime) || !finite_segment(request.source) ||
      !finite_segment(request.receiver)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "hit time and path segment numeric fields must be finite",
                          "causal-root");
    return result;
  }
  if (request.source.endTime < request.source.startTime ||
      request.receiver.endTime < request.receiver.startTime) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "source and receiver path segments must have ordered time bounds",
                          "causal-root");
    return result;
  }
  if (request.hitTime < request.receiver.startTime || request.hitTime > request.receiver.endTime) {
    result.validation.add(StatusCode::InsufficientHistoryDepth,
                          StatusSeverity::Halt,
                          "hit time is outside the receiver segment",
                          "causal-root",
                          false);
    return result;
  }

  const double lower = request.source.startTime;
  const double upper = std::min(request.source.endTime, request.hitTime);
  if (upper < lower) {
    result.validation.add(StatusCode::InsufficientHistoryDepth,
                          StatusSeverity::Warning,
                          "source history ends before the causal search window starts",
                          "causal-root");
    return result;
  }

  const int subdivisions = std::max(1, request.scanSubdivisions);
  const double tolerance = request.rootTolerance;
  const double step = (upper - lower) / static_cast<double>(subdivisions);

  int rootId = 0;
  Real previousTime = to_real(lower);
  EvalState previous = evaluate_root_function(request, previousTime);

  if (near_zero(previous.residual, tolerance)) {
    result.roots.push_back(make_root(request, lower, lower, lower, 0, rootId++));
  }

  for (int index = 1; index <= subdivisions; ++index) {
    const double currentTimeDouble = index == subdivisions ? upper : lower + step * index;
    const Real currentTime = to_real(currentTimeDouble);
    const EvalState current = evaluate_root_function(request, currentTime);

    if (near_zero(current.residual, tolerance) &&
        !is_duplicate_root(result.roots, currentTimeDouble, tolerance)) {
      result.roots.push_back(
          make_root(request, currentTimeDouble, currentTimeDouble, currentTimeDouble, 0, rootId++));
    } else if (has_opposite_sign(previous.residual, current.residual)) {
      Real lo = previousTime;
      Real hi = currentTime;
      Real fLo = previous.residual;
      Real fHi = current.residual;
      int iterations = 0;
      for (; iterations < request.maxIterations; ++iterations) {
        const Real mid = (lo + hi) / 2;
        const EvalState midEval = evaluate_root_function(request, mid);
        if (near_zero(midEval.residual, tolerance) || abs(hi - lo) <= Real(tolerance)) {
          lo = mid;
          hi = mid;
          fLo = midEval.residual;
          fHi = midEval.residual;
          break;
        }
        if (has_opposite_sign(fLo, midEval.residual)) {
          hi = mid;
          fHi = midEval.residual;
        } else {
          lo = mid;
          fLo = midEval.residual;
        }
      }
      const double emissionTime = ((lo + hi) / 2).convert_to<double>();
      if (!is_duplicate_root(result.roots, emissionTime, tolerance)) {
        CausalRoot root =
            make_root(request, emissionTime, previousTime.convert_to<double>(), currentTimeDouble, iterations, rootId);
        root.statusCode = abs(fLo) <= Real(tolerance) || abs(fHi) <= Real(tolerance)
                              ? root.statusCode
                              : StatusCode::RootUnresolved;
        result.roots.push_back(root);
        ++rootId;
      }
    }

    previousTime = currentTime;
    previous = current;
  }

  if (result.roots.empty()) {
    result.validation.add(StatusCode::RootNotBracketed,
                          StatusSeverity::Info,
                          "no causal roots were found in the retained source segment",
                          "causal-root");
  } else {
    result.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "causal roots solved",
                          "causal-root");
  }

  return result;
}

CausalRootResult solve_circular_source_causal_roots(
    const CircularSourceCausalRootRequest& request) {
  CausalRootResult result;
  if (request.receiverId.empty() || request.sourceId.empty()) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "source id and receiver id are required",
                          "circular-source-causal-root");
    return result;
  }
  if (!finite_positive(request.signalSpeed)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "signal speed must be positive and finite",
                          "circular-source-causal-root");
    return result;
  }
  if (!finite_positive(request.rootTolerance)) {
    result.validation.add(StatusCode::PrecisionFailed,
                          StatusSeverity::Error,
                          "root tolerance must be positive and finite",
                          "circular-source-causal-root");
    return result;
  }
  if (request.maxIterations <= 0 || request.scanSubdivisions <= 0) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "max iterations and scan subdivisions must be positive",
                          "circular-source-causal-root");
    return result;
  }
  if (!std::isfinite(request.hitTime) || !finite_segment(request.source) ||
      !finite_segment(request.receiver)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "hit time and path segment numeric fields must be finite",
                          "circular-source-causal-root");
    return result;
  }
  if (request.source.endTime < request.source.startTime ||
      request.receiver.endTime < request.receiver.startTime) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "source and receiver path segments must have ordered time bounds",
                          "circular-source-causal-root");
    return result;
  }
  if (request.hitTime < request.receiver.startTime || request.hitTime > request.receiver.endTime) {
    result.validation.add(StatusCode::InsufficientHistoryDepth,
                          StatusSeverity::Halt,
                          "hit time is outside the receiver segment",
                          "circular-source-causal-root",
                          false);
    return result;
  }

  const double lower = request.source.startTime;
  const double upper = std::min(request.source.endTime, request.hitTime);
  if (upper < lower) {
    result.validation.add(StatusCode::InsufficientHistoryDepth,
                          StatusSeverity::Warning,
                          "source history ends before the causal search window starts",
                          "circular-source-causal-root");
    return result;
  }

  const int subdivisions = std::max(1, request.scanSubdivisions);
  const double tolerance = request.rootTolerance;
  const double step = (upper - lower) / static_cast<double>(subdivisions);

  int rootId = 0;
  Real previousTime = to_real(lower);
  EvalState previous = evaluate_circular_source_root_function(request, previousTime);

  if (near_zero(previous.residual, tolerance)) {
    result.roots.push_back(make_root(request, lower, lower, lower, 0, rootId++));
  }

  for (int index = 1; index <= subdivisions; ++index) {
    const double currentTimeDouble = index == subdivisions ? upper : lower + step * index;
    const Real currentTime = to_real(currentTimeDouble);
    const EvalState current = evaluate_circular_source_root_function(request, currentTime);

    if (near_zero(current.residual, tolerance) &&
        !is_duplicate_root(result.roots, currentTimeDouble, tolerance)) {
      result.roots.push_back(
          make_root(request, currentTimeDouble, currentTimeDouble, currentTimeDouble, 0, rootId++));
    } else if (has_opposite_sign(previous.residual, current.residual)) {
      Real lo = previousTime;
      Real hi = currentTime;
      Real fLo = previous.residual;
      Real fHi = current.residual;
      int iterations = 0;
      for (; iterations < request.maxIterations; ++iterations) {
        const Real mid = (lo + hi) / 2;
        const EvalState midEval = evaluate_circular_source_root_function(request, mid);
        if (near_zero(midEval.residual, tolerance) || abs(hi - lo) <= Real(tolerance)) {
          lo = mid;
          hi = mid;
          fLo = midEval.residual;
          fHi = midEval.residual;
          break;
        }
        if (has_opposite_sign(fLo, midEval.residual)) {
          hi = mid;
          fHi = midEval.residual;
        } else {
          lo = mid;
          fLo = midEval.residual;
        }
      }
      const double emissionTime = ((lo + hi) / 2).convert_to<double>();
      if (!is_duplicate_root(result.roots, emissionTime, tolerance)) {
        CausalRoot root =
            make_root(request, emissionTime, previousTime.convert_to<double>(), currentTimeDouble, iterations, rootId);
        root.statusCode = abs(fLo) <= Real(tolerance) || abs(fHi) <= Real(tolerance)
                              ? root.statusCode
                              : StatusCode::RootUnresolved;
        result.roots.push_back(root);
        ++rootId;
      }
    }

    previousTime = currentTime;
    previous = current;
  }

  if (result.roots.empty()) {
    result.validation.add(StatusCode::RootNotBracketed,
                          StatusSeverity::Info,
                          "no circular-source causal roots were found in the retained source segment",
                          "circular-source-causal-root");
  } else {
    result.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "circular-source causal roots solved",
                          "circular-source-causal-root");
  }

  return result;
}

DelayedHitResult solve_delayed_hits(const CausalRootRequest& request) {
  DelayedHitResult result;
  const CausalRootResult roots = solve_causal_roots(request);
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
        root.sourceRadialSpeed,
        root.receiverRadialSpeed,
        root.sourceWakeDenominator,
        root.receiverWakeNumerator,
        root.receiverCrossingFactor,
        root.receiverModulator,
        root.unsignedReceiverModulator,
        root.sourcePoint,
        root.receiverPoint,
        unit_or_zero(displacement),
        root.statusCode,
        root.receiverModulatorStatusCode,
    });
  }

  return result;
}

}  // namespace architrino::solver

#include "architrino/solver/MotionSampler.hpp"

#include <algorithm>
#include <cmath>
#include <iterator>

namespace architrino::solver {
namespace {

bool finite_vector(Vector3 value) {
  return std::isfinite(value.x) && std::isfinite(value.y) && std::isfinite(value.z);
}

bool finite_segment(const LinearPathSegment& segment) {
  return std::isfinite(segment.startTime) && std::isfinite(segment.endTime) &&
         finite_vector(segment.positionAtStart) && finite_vector(segment.velocity) &&
         std::isfinite(segment.errorBound) && segment.errorBound >= 0.0;
}

bool validate_linear_motion_sample_request(const MotionSampleRequest& request,
                                           ValidationReport& validation) {
  if (!finite_segment(request.segment)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion segment numeric fields must be finite",
                   "motion-sampler",
                   false);
    return false;
  }
  if (request.segment.endTime < request.segment.startTime) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion segment time bounds are not ordered",
                   "motion-sampler",
                   false);
    return false;
  }
  if (!std::isfinite(request.startTime) || !std::isfinite(request.endTime) ||
      request.endTime < request.startTime) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion sample time bounds must be finite and ordered",
                   "motion-sampler",
                   false);
    return false;
  }
  if (!std::isfinite(request.step) || request.step <= 0.0) {
    validation.add(StatusCode::TimeResolutionInsufficient,
                   StatusSeverity::Error,
                   "motion sample step must be positive and finite",
                   "motion-sampler",
                   false);
    return false;
  }
  if (request.startTime < request.segment.startTime || request.endTime > request.segment.endTime) {
    validation.add(StatusCode::InsufficientHistoryDepth,
                   StatusSeverity::Halt,
                   "motion sample window is outside the retained segment",
                   "motion-sampler",
                   false);
    return false;
  }
  return true;
}

double norm(Vector3 value) {
  return std::sqrt(value.x * value.x + value.y * value.y + value.z * value.z);
}

struct PairInteractionGuidedAcceleration {
  Vector3 acceleration{};
  double guidanceCorrectionNorm = 0.0;
  bool guided = false;
};

Vector3 integrated_position_at(const MotionIntegrationRequest& request, double time) {
  const double dt = time - request.startTime;
  return Vector3{
      request.initialPosition.x + request.initialVelocity.x * dt +
          0.5 * request.acceleration.x * dt * dt,
      request.initialPosition.y + request.initialVelocity.y * dt +
          0.5 * request.acceleration.y * dt * dt,
      request.initialPosition.z + request.initialVelocity.z * dt +
          0.5 * request.acceleration.z * dt * dt,
  };
}

Vector3 integrated_velocity_at(const MotionIntegrationRequest& request, double time) {
  const double dt = time - request.startTime;
  return Vector3{
      request.initialVelocity.x + request.acceleration.x * dt,
      request.initialVelocity.y + request.acceleration.y * dt,
      request.initialVelocity.z + request.acceleration.z * dt,
  };
}

bool validate_motion_integration_request(const MotionIntegrationRequest& request,
                                         ValidationReport& validation) {
  if (!std::isfinite(request.startTime) || !std::isfinite(request.endTime) ||
      request.endTime < request.startTime) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion integration time bounds must be finite and ordered",
                   "motion-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.step) || request.step <= 0.0) {
    validation.add(StatusCode::TimeResolutionInsufficient,
                   StatusSeverity::Error,
                   "motion integration step must be positive and finite",
                   "motion-integrator",
                   false);
    return false;
  }
  if (!finite_vector(request.initialPosition) || !finite_vector(request.initialVelocity) ||
      !finite_vector(request.acceleration)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion integration vectors must be finite",
                   "motion-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.integrationTolerance) || request.integrationTolerance < 0.0) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion integration tolerance must be finite and nonnegative",
                   "motion-integrator",
                   false);
    return false;
  }
  if (request.integrationMethod != 1) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "motion integration method is not supported",
                   "motion-integrator",
                   false);
    return false;
  }
  return true;
}

bool validate_pair_interaction_request(const PairInteractionRequest& request,
                                       const std::vector<PairInteractionState>& initialStates,
                                       ValidationReport& validation) {
  if (!std::isfinite(request.startTime) || !std::isfinite(request.endTime) ||
      request.endTime < request.startTime) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction time bounds must be finite and ordered",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.step) || request.step <= 0.0) {
    validation.add(StatusCode::TimeResolutionInsufficient,
                   StatusSeverity::Error,
                   "pair interaction step must be positive and finite",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.pairAccelerationScale) || request.pairAccelerationScale <= 0.0 ||
      !std::isfinite(request.softening) || request.softening < 0.0 ||
      !std::isfinite(request.integrationTolerance) || request.integrationTolerance < 0.0) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction scale, softening, and tolerance must be finite",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (request.interactionLaw != 1 && request.interactionLaw != 2) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction law is not supported",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (request.integrationMethod != 1) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction integration method is not supported",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (initialStates.size() != 2) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction requires exactly two initial states",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  for (const PairInteractionState& state : initialStates) {
    if (state.pathKey == 0 || !finite_vector(state.initialPosition) ||
        !finite_vector(state.initialVelocity) || !std::isfinite(state.charge) ||
        !std::isfinite(state.mass) || state.mass <= 0.0) {
      validation.add(StatusCode::AppContractError,
                     StatusSeverity::Error,
                     "pair interaction initial states must be finite",
                     "pair-interaction-integrator",
                     false);
      return false;
    }
  }
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (constraint.pathKey == 0 || !std::isfinite(constraint.time) ||
        constraint.time < request.startTime || constraint.time > request.endTime ||
        !finite_vector(constraint.position)) {
      validation.add(StatusCode::AppContractError,
                     StatusSeverity::Error,
                     "pair interaction path constraints must be finite and inside the request time range",
                     "pair-interaction-integrator",
                     false);
      return false;
    }
  }
  return true;
}

MotionFrameRowF64 make_frame(const MotionSampleRequest& request,
                             std::uint64_t frameIndex,
                             double time) {
  const Vector3 position = position_at(request.segment, time);
  return MotionFrameRowF64{
      request.pathKey,
      frameIndex,
      time,
      position.x,
      position.y,
      position.z,
      request.segment.velocity.x,
      request.segment.velocity.y,
      request.segment.velocity.z,
      request.segment.errorBound,
      request.stateFlags,
      0,
  };
}

PathHistoryRowF64 make_linear_path_history_row(const MotionSampleRequest& request) {
  const Vector3 start = position_at(request.segment, request.startTime);
  return PathHistoryRowF64{
      request.pathKey,
      0,
      request.startTime,
      request.endTime,
      start.x,
      start.y,
      start.z,
      request.segment.velocity.x,
      request.segment.velocity.y,
      request.segment.velocity.z,
      request.segment.errorBound,
      request.stateFlags,
      0,
  };
}

MotionFrameRowF64 make_integrated_frame(const MotionIntegrationRequest& request,
                                        std::uint64_t frameIndex,
                                        double time) {
  const Vector3 position = integrated_position_at(request, time);
  const Vector3 velocity = integrated_velocity_at(request, time);
  return MotionFrameRowF64{
      request.pathKey,
      frameIndex,
      time,
      position.x,
      position.y,
      position.z,
      velocity.x,
      velocity.y,
      velocity.z,
      request.integrationTolerance,
      request.stateFlags,
      request.integrationMethod,
  };
}

PathHistoryRowF64 make_integrated_path_history_row(const MotionIntegrationRequest& request,
                                                   std::uint64_t segmentIndex,
                                                   double startTime,
                                                   double endTime) {
  const Vector3 start = integrated_position_at(request, startTime);
  const Vector3 end = integrated_position_at(request, endTime);
  const double duration = endTime - startTime;
  const Vector3 chordVelocity{
      (end.x - start.x) / duration,
      (end.y - start.y) / duration,
      (end.z - start.z) / duration,
  };
  const double interpolationErrorBound =
      0.125 * norm(request.acceleration) * duration * duration;
  return PathHistoryRowF64{
      request.pathKey,
      segmentIndex,
      startTime,
      endTime,
      start.x,
      start.y,
      start.z,
      chordVelocity.x,
      chordVelocity.y,
      chordVelocity.z,
      request.integrationTolerance + interpolationErrorBound,
      request.stateFlags,
      request.integrationMethod,
  };
}

MotionFrameRowF64 make_pair_interaction_frame(const PairInteractionState& state,
                                              std::uint64_t frameIndex,
                                              double time,
                                              double errorBound) {
  return MotionFrameRowF64{
      state.pathKey,
      frameIndex,
      time,
      state.initialPosition.x,
      state.initialPosition.y,
      state.initialPosition.z,
      state.initialVelocity.x,
      state.initialVelocity.y,
      state.initialVelocity.z,
      errorBound,
      state.stateFlags,
      0,
  };
}

PathHistoryRowF64 make_pair_interaction_path_history_row(const MotionFrameRowF64& start,
                                                         const MotionFrameRowF64& end,
                                                         std::uint64_t segmentIndex) {
  const double duration = end.time - start.time;
  const Vector3 chordVelocity{
      (end.positionX - start.positionX) / duration,
      (end.positionY - start.positionY) / duration,
      (end.positionZ - start.positionZ) / duration,
  };
  return PathHistoryRowF64{
      start.pathKey,
      segmentIndex,
      start.time,
      end.time,
      start.positionX,
      start.positionY,
      start.positionZ,
      chordVelocity.x,
      chordVelocity.y,
      chordVelocity.z,
      std::max(start.errorBound, end.errorBound),
      start.stateFlags,
      0,
  };
}

std::vector<double> pair_interaction_sample_times(const PairInteractionRequest& request) {
  std::vector<double> times;
  const double epsilon = std::max(request.step * 1e-9, 1e-12);
  for (double time = request.startTime; time < request.endTime - epsilon;
       time += request.step) {
    times.push_back(time);
  }
  if (times.empty() || std::abs(times.back() - request.endTime) > epsilon) {
    times.push_back(request.endTime);
  }
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (constraint.time >= request.startTime - epsilon &&
        constraint.time <= request.endTime + epsilon) {
      times.push_back(std::clamp(constraint.time, request.startTime, request.endTime));
    }
  }
  std::sort(times.begin(), times.end());
  times.erase(std::unique(times.begin(),
                          times.end(),
                          [epsilon](double left, double right) {
                            return std::abs(left - right) <= epsilon;
                          }),
              times.end());
  return times;
}

std::vector<Vector3> pair_interaction_accelerations(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& states) {
  const double duration = std::max(request.endTime - request.startTime, request.step);
  const double factor = request.pairAccelerationScale / std::max(duration * duration, 1e-12);
  const double softeningSquared = request.softening * request.softening;
  std::vector<Vector3> accelerations(states.size(), Vector3{});
  for (std::size_t index = 0; index < states.size(); ++index) {
    const PairInteractionState& state = states[index];
    for (std::size_t otherIndex = 0; otherIndex < states.size(); ++otherIndex) {
      if (otherIndex == index) {
        continue;
      }
      const PairInteractionState& other = states[otherIndex];
      const Vector3 delta{
          other.initialPosition.x - state.initialPosition.x,
          other.initialPosition.y - state.initialPosition.y,
          other.initialPosition.z - state.initialPosition.z,
      };
      const double distanceSquared =
          delta.x * delta.x + delta.y * delta.y + delta.z * delta.z + softeningSquared;
      const double attractionSign = state.charge * other.charge <= 0.0 ? 1.0 : -1.0;
      const double strength = (factor * attractionSign * std::abs(other.charge)) / state.mass;
      const double attenuation =
          request.interactionLaw == 2 ? 1.0 / std::max(std::sqrt(distanceSquared), 1e-12) : 1.0;
      accelerations[index].x += delta.x * strength * attenuation;
      accelerations[index].y += delta.y * strength * attenuation;
      accelerations[index].z += delta.z * strength * attenuation;
    }
  }
  return accelerations;
}

double pair_constraint_time_epsilon(const PairInteractionRequest& request) {
  return std::max(request.step * 1e-9, 1e-12);
}

std::vector<PairInteractionPathConstraint> pair_constraints_for_path(
    const PairInteractionRequest& request,
    std::uint64_t pathKey);

bool pair_constraint_tangent_at_time(const std::vector<PairInteractionPathConstraint>& constraints,
                                     double time,
                                     double epsilon,
                                     Vector3& outVelocity) {
  for (std::size_t index = 0; index < constraints.size(); ++index) {
    const PairInteractionPathConstraint& current = constraints[index];
    if (std::abs(current.time - time) > epsilon) {
      continue;
    }
    if (index == 0) {
      return false;
    }
    if (index + 1 < constraints.size()) {
      const PairInteractionPathConstraint& previous = constraints[index - 1];
      const PairInteractionPathConstraint& next = constraints[index + 1];
      const double span = next.time - previous.time;
      if (span > epsilon) {
        outVelocity = Vector3{
            (next.position.x - previous.position.x) / span,
            (next.position.y - previous.position.y) / span,
            (next.position.z - previous.position.z) / span,
        };
        return true;
      }
    }
    const PairInteractionPathConstraint& previous = constraints[index - 1];
    const double span = current.time - previous.time;
    if (span <= epsilon) {
      return false;
    }
    outVelocity = Vector3{
        (current.position.x - previous.position.x) / span,
        (current.position.y - previous.position.y) / span,
        (current.position.z - previous.position.z) / span,
    };
    return true;
  }
  return false;
}

bool pair_constraint_tangent_for_index(const std::vector<PairInteractionPathConstraint>& constraints,
                                       std::size_t index,
                                       Vector3 firstTangent,
                                       double epsilon,
                                       Vector3& outVelocity) {
  if (index >= constraints.size()) {
    return false;
  }
  if (index == 0) {
    outVelocity = firstTangent;
    return finite_vector(outVelocity);
  }
  if (index + 1 < constraints.size()) {
    const PairInteractionPathConstraint& previous = constraints[index - 1];
    const PairInteractionPathConstraint& next = constraints[index + 1];
    const double span = next.time - previous.time;
    if (span > epsilon) {
      outVelocity = Vector3{
          (next.position.x - previous.position.x) / span,
          (next.position.y - previous.position.y) / span,
          (next.position.z - previous.position.z) / span,
      };
      return true;
    }
  }
  const PairInteractionPathConstraint& previous = constraints[index - 1];
  const PairInteractionPathConstraint& current = constraints[index];
  const double span = current.time - previous.time;
  if (span <= epsilon) {
    return false;
  }
  outVelocity = Vector3{
      (current.position.x - previous.position.x) / span,
      (current.position.y - previous.position.y) / span,
      (current.position.z - previous.position.z) / span,
  };
  return true;
}

bool pair_constraint_hermite_position_at_time(
    const std::vector<PairInteractionPathConstraint>& constraints,
    Vector3 firstTangent,
    double time,
    double epsilon,
    Vector3& outPosition) {
  if (constraints.empty()) {
    return false;
  }
  for (const PairInteractionPathConstraint& constraint : constraints) {
    if (std::abs(constraint.time - time) <= epsilon) {
      outPosition = constraint.position;
      return true;
    }
  }
  if (time < constraints.front().time - epsilon ||
      time > constraints.back().time + epsilon) {
    return false;
  }
  const auto right = std::find_if(
      constraints.begin(),
      constraints.end(),
      [time](const PairInteractionPathConstraint& constraint) {
        return constraint.time >= time;
      });
  if (right == constraints.begin() || right == constraints.end()) {
    return false;
  }
  const std::size_t rightIndex = static_cast<std::size_t>(
      std::distance(constraints.begin(), right));
  const std::size_t leftIndex = rightIndex - 1;
  const PairInteractionPathConstraint& left = constraints[leftIndex];
  const PairInteractionPathConstraint& rightConstraint = constraints[rightIndex];
  const double span = rightConstraint.time - left.time;
  if (span <= epsilon) {
    return false;
  }
  Vector3 leftTangent{};
  Vector3 rightTangent{};
  if (!pair_constraint_tangent_for_index(constraints, leftIndex, firstTangent, epsilon, leftTangent) ||
      !pair_constraint_tangent_for_index(constraints, rightIndex, firstTangent, epsilon, rightTangent)) {
    return false;
  }
  const double u = std::clamp((time - left.time) / span, 0.0, 1.0);
  const double u2 = u * u;
  const double u3 = u2 * u;
  const double h00 = 2.0 * u3 - 3.0 * u2 + 1.0;
  const double h10 = u3 - 2.0 * u2 + u;
  const double h01 = -2.0 * u3 + 3.0 * u2;
  const double h11 = u3 - u2;
  outPosition = Vector3{
      h00 * left.position.x + h10 * span * leftTangent.x +
          h01 * rightConstraint.position.x + h11 * span * rightTangent.x,
      h00 * left.position.y + h10 * span * leftTangent.y +
          h01 * rightConstraint.position.y + h11 * span * rightTangent.y,
      h00 * left.position.z + h10 * span * leftTangent.z +
          h01 * rightConstraint.position.z + h11 * span * rightTangent.z,
  };
  return finite_vector(outPosition);
}

void snap_pair_interaction_states_to_constraints(const PairInteractionRequest& request,
                                                 std::vector<PairInteractionState>& states,
                                                 double time) {
  const double epsilon = pair_constraint_time_epsilon(request);
  for (PairInteractionState& state : states) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, state.pathKey);
    for (const PairInteractionPathConstraint& constraint : constraints) {
      if (std::abs(constraint.time - time) > epsilon) {
        continue;
      }
      state.initialPosition = constraint.position;
      Vector3 tangentVelocity{};
      if (pair_constraint_tangent_at_time(constraints, time, epsilon, tangentVelocity)) {
        state.initialVelocity = tangentVelocity;
      }
      break;
    }
  }
}

void record_pair_constraint_guidance_sample(PairInteractionSampleResult& result,
                                            double correctionNorm) {
  if (!std::isfinite(correctionNorm) || correctionNorm < 0.0) {
    return;
  }
  const double sampleCount = static_cast<double>(result.pathConstraintGuidanceSampleCount);
  result.maxPathConstraintGuidanceAcceleration =
      std::max(result.maxPathConstraintGuidanceAcceleration, correctionNorm);
  result.meanPathConstraintGuidanceAcceleration =
      (result.meanPathConstraintGuidanceAcceleration * sampleCount + correctionNorm) /
      (sampleCount + 1.0);
  result.rmsPathConstraintGuidanceAcceleration =
      std::sqrt((result.rmsPathConstraintGuidanceAcceleration *
                     result.rmsPathConstraintGuidanceAcceleration * sampleCount +
                 correctionNorm * correctionNorm) /
                (sampleCount + 1.0));
  ++result.pathConstraintGuidanceSampleCount;
}

void record_residual_sample(double residual,
                            double& maxResidual,
                            double& sumResidual,
                            double& sumResidualSquared,
                            std::uint64_t& sampleCount) {
  if (!std::isfinite(residual)) {
    return;
  }
  maxResidual = std::max(maxResidual, residual);
  sumResidual += residual;
  sumResidualSquared += residual * residual;
  ++sampleCount;
}

PairInteractionGuidedAcceleration pair_constraint_guided_acceleration(
    const PairInteractionRequest& request,
    const PairInteractionState& state,
    Vector3 physicalAcceleration,
    const std::vector<PairInteractionState>& initialStates,
    double currentTime,
    double nextTime) {
  const double epsilon = pair_constraint_time_epsilon(request);
  const std::vector<PairInteractionPathConstraint> constraints =
      pair_constraints_for_path(request, state.pathKey);
  const double dt = nextTime - currentTime;
  if (constraints.empty() || dt <= epsilon) {
    return PairInteractionGuidedAcceleration{physicalAcceleration, 0.0, false};
  }
  const auto initialState = std::find_if(initialStates.begin(),
                                         initialStates.end(),
                                         [&state](const PairInteractionState& candidate) {
                                           return candidate.pathKey == state.pathKey;
                                         });
  const Vector3 firstTangent =
      initialState == initialStates.end() ? state.initialVelocity : initialState->initialVelocity;
  Vector3 targetPosition{};
  if (!pair_constraint_hermite_position_at_time(
          constraints,
          firstTangent,
          nextTime,
          epsilon,
          targetPosition)) {
    return PairInteractionGuidedAcceleration{physicalAcceleration, 0.0, false};
  }

  // The pair force is still evaluated first. This boundary correction is the
  // additional acceleration needed, under the solver's semi-implicit step rule,
  // to land on the retained-knot Hermite path at the next emitted sample.
  const Vector3 requiredTotalAcceleration{
      (targetPosition.x - state.initialPosition.x -
       state.initialVelocity.x * dt) /
          (dt * dt),
      (targetPosition.y - state.initialPosition.y -
       state.initialVelocity.y * dt) /
          (dt * dt),
      (targetPosition.z - state.initialPosition.z -
       state.initialVelocity.z * dt) /
          (dt * dt),
  };
  const Vector3 correction{
      requiredTotalAcceleration.x - physicalAcceleration.x,
      requiredTotalAcceleration.y - physicalAcceleration.y,
      requiredTotalAcceleration.z - physicalAcceleration.z,
  };
  return PairInteractionGuidedAcceleration{
      requiredTotalAcceleration,
      norm(correction),
      true,
  };
}

void advance_pair_interaction_states(const PairInteractionRequest& request,
                                     std::vector<PairInteractionState>& states,
                                     PairInteractionSampleResult& result,
                                     const std::vector<PairInteractionState>& initialStates,
                                     double currentTime,
                                     double nextTime) {
  const double dt = nextTime - currentTime;
  if (dt <= 0.0) {
    return;
  }
  const std::vector<Vector3> accelerations = pair_interaction_accelerations(request, states);
  for (std::size_t index = 0; index < states.size(); ++index) {
    PairInteractionState& state = states[index];
    const PairInteractionGuidedAcceleration guidedAcceleration = pair_constraint_guided_acceleration(
        request,
        state,
        accelerations[index],
        initialStates,
        currentTime,
        nextTime);
    if (guidedAcceleration.guided) {
      record_pair_constraint_guidance_sample(
          result,
          guidedAcceleration.guidanceCorrectionNorm);
    }
    const Vector3 acceleration = guidedAcceleration.acceleration;
    state.initialVelocity.x += acceleration.x * dt;
    state.initialVelocity.y += acceleration.y * dt;
    state.initialVelocity.z += acceleration.z * dt;
    state.initialPosition.x += state.initialVelocity.x * dt;
    state.initialPosition.y += state.initialVelocity.y * dt;
    state.initialPosition.z += state.initialVelocity.z * dt;
  }
  snap_pair_interaction_states_to_constraints(request, states, nextTime);
}

std::vector<PairInteractionPathConstraint> pair_constraints_for_path(
    const PairInteractionRequest& request,
    std::uint64_t pathKey) {
  std::vector<PairInteractionPathConstraint> constraints;
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (constraint.pathKey == pathKey) {
      constraints.push_back(constraint);
    }
  }
  std::sort(constraints.begin(),
            constraints.end(),
            [](const PairInteractionPathConstraint& left,
               const PairInteractionPathConstraint& right) {
              if (left.time == right.time) {
                return left.depth < right.depth;
              }
              return left.time < right.time;
            });
  return constraints;
}

bool pair_constraint_position_at_time(const std::vector<PairInteractionPathConstraint>& constraints,
                                      double time,
                                      double epsilon,
                                      Vector3& outPosition) {
  if (constraints.empty()) {
    return false;
  }
  for (const PairInteractionPathConstraint& constraint : constraints) {
    if (std::abs(constraint.time - time) <= epsilon) {
      outPosition = constraint.position;
      return true;
    }
  }
  if (time < constraints.front().time - epsilon ||
      time > constraints.back().time + epsilon) {
    return false;
  }
  const auto right = std::find_if(
      constraints.begin(),
      constraints.end(),
      [time](const PairInteractionPathConstraint& constraint) {
        return constraint.time >= time;
      });
  if (right == constraints.begin() || right == constraints.end()) {
    return false;
  }
  const PairInteractionPathConstraint& left = *(right - 1);
  const double span = right->time - left.time;
  if (span <= epsilon) {
    return false;
  }
  const double amount = std::clamp((time - left.time) / span, 0.0, 1.0);
  outPosition = Vector3{
      left.position.x + (right->position.x - left.position.x) * amount,
      left.position.y + (right->position.y - left.position.y) * amount,
      left.position.z + (right->position.z - left.position.z) * amount,
  };
  return true;
}

std::vector<PairInteractionState> states_from_constraints_at_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double time) {
  const double epsilon = pair_constraint_time_epsilon(request);
  std::vector<PairInteractionState> states;
  states.reserve(initialStates.size());
  for (const PairInteractionState& initialState : initialStates) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, initialState.pathKey);
    Vector3 position{};
    if (!pair_constraint_position_at_time(constraints, time, epsilon, position)) {
      states.clear();
      return states;
    }
    states.push_back(PairInteractionState{
        initialState.pathKey,
        position,
        Vector3{},
        initialState.charge,
        initialState.mass == 0.0 ? 1.0 : initialState.mass,
        initialState.stateFlags,
    });
  }
  std::sort(states.begin(),
            states.end(),
            [](const PairInteractionState& left, const PairInteractionState& right) {
              return left.pathKey < right.pathKey;
            });
  return states;
}

Vector3 frame_position(const MotionFrameRowF64& frame) {
  return Vector3{frame.positionX, frame.positionY, frame.positionZ};
}

Vector3 vector_subtract(Vector3 left, Vector3 right) {
  return Vector3{left.x - right.x, left.y - right.y, left.z - right.z};
}

Vector3 vector_scale(Vector3 value, double scale) {
  return Vector3{value.x * scale, value.y * scale, value.z * scale};
}

double vector_norm(Vector3 value) {
  return std::sqrt(value.x * value.x + value.y * value.y + value.z * value.z);
}

PairInteractionState state_from_frame(const MotionFrameRowF64& frame,
                                      const std::vector<PairInteractionState>& initialStates) {
  const auto match = std::find_if(initialStates.begin(),
                                  initialStates.end(),
                                  [&frame](const PairInteractionState& state) {
                                    return state.pathKey == frame.pathKey;
                                  });
  const PairInteractionState source = match == initialStates.end()
                                          ? PairInteractionState{}
                                          : *match;
  return PairInteractionState{
      frame.pathKey,
      Vector3{frame.positionX, frame.positionY, frame.positionZ},
      Vector3{frame.velocityX, frame.velocityY, frame.velocityZ},
      source.charge,
      source.mass == 0.0 ? 1.0 : source.mass,
      frame.stateFlags,
  };
}

std::vector<const MotionFrameRowF64*> sorted_const_frames_for_path(
    const std::vector<MotionFrameRowF64>& frames,
    std::uint64_t pathKey) {
  std::vector<const MotionFrameRowF64*> pathFrames;
  for (const MotionFrameRowF64& frame : frames) {
    if (frame.pathKey == pathKey) {
      pathFrames.push_back(&frame);
    }
  }
  std::sort(pathFrames.begin(), pathFrames.end(), [](const auto* left, const auto* right) {
    if (left->time == right->time) {
      return left->frameIndex < right->frameIndex;
    }
    return left->time < right->time;
  });
  return pathFrames;
}

std::vector<PairInteractionState> states_at_frame_index(
    const std::vector<MotionFrameRowF64>& frames,
    std::uint64_t frameIndex,
    const std::vector<PairInteractionState>& initialStates) {
  std::vector<PairInteractionState> states;
  for (const MotionFrameRowF64& frame : frames) {
    if (frame.frameIndex == frameIndex) {
      states.push_back(state_from_frame(frame, initialStates));
    }
  }
  std::sort(states.begin(),
            states.end(),
            [](const PairInteractionState& left, const PairInteractionState& right) {
              return left.pathKey < right.pathKey;
            });
  return states;
}

void summarize_pair_interaction_constraint_residuals(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  result.pathConstraintCount = static_cast<std::uint64_t>(request.pathConstraints.size());
  if (request.pathConstraints.empty()) {
    return;
  }

  std::vector<std::uint64_t> pathKeys;
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (std::find(pathKeys.begin(), pathKeys.end(), constraint.pathKey) == pathKeys.end()) {
      pathKeys.push_back(constraint.pathKey);
    }
  }

  double sumResidual = 0.0;
  double sumResidualSquared = 0.0;
  double maxResidual = 0.0;
  std::uint64_t sampleCount = 0;

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<const MotionFrameRowF64*> pathFrames =
        sorted_const_frames_for_path(result.frames, pathKey);
    if (pathFrames.size() < 3) {
      continue;
    }
    for (std::size_t index = 1; index + 1 < pathFrames.size(); ++index) {
      const MotionFrameRowF64& previous = *pathFrames[index - 1];
      const MotionFrameRowF64& current = *pathFrames[index];
      const MotionFrameRowF64& next = *pathFrames[index + 1];
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= 0.0 || rightDt <= 0.0 || averageDt <= 0.0) {
        continue;
      }
      const Vector3 leftVelocity = vector_scale(
          vector_subtract(frame_position(current), frame_position(previous)),
          1.0 / leftDt);
      const Vector3 rightVelocity = vector_scale(
          vector_subtract(frame_position(next), frame_position(current)),
          1.0 / rightDt);
      const Vector3 finiteDifferenceAcceleration =
          vector_scale(vector_subtract(rightVelocity, leftVelocity), 1.0 / averageDt);
      const std::vector<PairInteractionState> states =
          states_at_frame_index(result.frames, current.frameIndex, initialStates);
      const std::vector<Vector3> lawAccelerations =
          pair_interaction_accelerations(request, states);
      const auto stateMatch = std::find_if(states.begin(),
                                           states.end(),
                                           [pathKey](const PairInteractionState& state) {
                                             return state.pathKey == pathKey;
                                           });
      if (stateMatch == states.end()) {
        continue;
      }
      const std::size_t stateIndex = static_cast<std::size_t>(
          std::distance(states.begin(), stateMatch));
      if (stateIndex >= lawAccelerations.size()) {
        continue;
      }
      const double residual = vector_norm(
          vector_subtract(finiteDifferenceAcceleration, lawAccelerations[stateIndex]));
      if (!std::isfinite(residual)) {
        continue;
      }
      record_residual_sample(residual, maxResidual, sumResidual, sumResidualSquared, sampleCount);
    }
  }

  result.pathConstraintResidualSampleCount = sampleCount;
  result.maxPathConstraintResidual = maxResidual;
  if (sampleCount > 0) {
    result.meanPathConstraintResidual = sumResidual / static_cast<double>(sampleCount);
    result.rmsPathConstraintResidual =
        std::sqrt(sumResidualSquared / static_cast<double>(sampleCount));
  }
}

void summarize_pair_interaction_boundary_residuals(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  if (request.pathConstraints.empty()) {
    return;
  }

  double sumResidual = 0.0;
  double sumResidualSquared = 0.0;
  double maxResidual = 0.0;
  std::uint64_t sampleCount = 0;
  const double epsilon = pair_constraint_time_epsilon(request);

  for (const PairInteractionState& initialState : initialStates) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, initialState.pathKey);
    if (constraints.size() < 3) {
      continue;
    }
    for (std::size_t index = 1; index + 1 < constraints.size(); ++index) {
      const PairInteractionPathConstraint& previous = constraints[index - 1];
      const PairInteractionPathConstraint& current = constraints[index];
      const PairInteractionPathConstraint& next = constraints[index + 1];
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const Vector3 leftVelocity = vector_scale(
          vector_subtract(current.position, previous.position),
          1.0 / leftDt);
      const Vector3 rightVelocity = vector_scale(
          vector_subtract(next.position, current.position),
          1.0 / rightDt);
      const Vector3 finiteDifferenceAcceleration =
          vector_scale(vector_subtract(rightVelocity, leftVelocity), 1.0 / averageDt);
      const std::vector<PairInteractionState> states =
          states_from_constraints_at_time(request, initialStates, current.time);
      if (states.empty()) {
        continue;
      }
      const std::vector<Vector3> lawAccelerations =
          pair_interaction_accelerations(request, states);
      const auto stateMatch = std::find_if(states.begin(),
                                           states.end(),
                                           [&current](const PairInteractionState& state) {
                                             return state.pathKey == current.pathKey;
                                           });
      if (stateMatch == states.end()) {
        continue;
      }
      const std::size_t stateIndex = static_cast<std::size_t>(
          std::distance(states.begin(), stateMatch));
      if (stateIndex >= lawAccelerations.size()) {
        continue;
      }
      const double residual = vector_norm(
          vector_subtract(finiteDifferenceAcceleration, lawAccelerations[stateIndex]));
      record_residual_sample(residual, maxResidual, sumResidual, sumResidualSquared, sampleCount);
    }
  }

  result.pathConstraintBoundaryResidualSampleCount = sampleCount;
  result.maxPathConstraintBoundaryResidual = maxResidual;
  if (sampleCount > 0) {
    result.meanPathConstraintBoundaryResidual = sumResidual / static_cast<double>(sampleCount);
    result.rmsPathConstraintBoundaryResidual =
        std::sqrt(sumResidualSquared / static_cast<double>(sampleCount));
  }
}

}  // namespace

MotionSampleResult sample_linear_motion(const MotionSampleRequest& request) {
  MotionSampleResult result;
  if (!validate_linear_motion_sample_request(request, result.validation)) {
    return result;
  }

  std::uint64_t frameIndex = 0;
  for (double time = request.startTime; time <= request.endTime + request.step * 1e-9;
       time += request.step) {
    const double clampedTime = time > request.endTime ? request.endTime : time;
    result.frames.push_back(make_frame(request, frameIndex, clampedTime));
    ++frameIndex;
    if (clampedTime == request.endTime) {
      break;
    }
  }

  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "linear motion sampled",
                        "motion-sampler");
  return result;
}

MotionPathHistoryResult sample_linear_path_history(const MotionSampleRequest& request) {
  MotionPathHistoryResult result;
  if (!validate_linear_motion_sample_request(request, result.validation)) {
    return result;
  }
  if (request.endTime > request.startTime) {
    result.rows.push_back(make_linear_path_history_row(request));
  }

  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "linear motion path history sampled",
                        "motion-sampler");
  return result;
}

MotionSampleResult integrate_constant_acceleration_motion(const MotionIntegrationRequest& request) {
  MotionSampleResult result;
  if (!validate_motion_integration_request(request, result.validation)) {
    return result;
  }

  std::uint64_t frameIndex = 0;
  for (double time = request.startTime; time <= request.endTime + request.step * 1e-9;
       time += request.step) {
    const double clampedTime = time > request.endTime ? request.endTime : time;
    result.frames.push_back(make_integrated_frame(request, frameIndex, clampedTime));
    ++frameIndex;
    if (clampedTime == request.endTime) {
      break;
    }
  }

  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "constant-acceleration motion integrated",
                        "motion-integrator");
  return result;
}

MotionPathHistoryResult integrate_constant_acceleration_path_history(
    const MotionIntegrationRequest& request) {
  MotionPathHistoryResult result;
  if (!validate_motion_integration_request(request, result.validation)) {
    return result;
  }

  std::uint64_t segmentIndex = 0;
  for (double time = request.startTime; time < request.endTime; time += request.step) {
    const double nextTime = time + request.step;
    if (nextTime <= time) {
      result.rows.clear();
      result.validation.add(StatusCode::TimeResolutionInsufficient,
                            StatusSeverity::Error,
                            "motion integration step is below the time resolution at this scale",
                            "motion-integrator",
                            false);
      return result;
    }
    const double clampedEndTime = nextTime > request.endTime ? request.endTime : nextTime;
    if (clampedEndTime <= time) {
      break;
    }
    result.rows.push_back(
        make_integrated_path_history_row(request, segmentIndex, time, clampedEndTime));
    ++segmentIndex;
    if (clampedEndTime == request.endTime) {
      break;
    }
  }

  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "constant-acceleration path history integrated",
                        "motion-integrator");
  return result;
}

PairInteractionSampleResult integrate_pair_interaction_motion(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  PairInteractionSampleResult result;
  if (!validate_pair_interaction_request(request, initialStates, result.validation)) {
    return result;
  }

  std::vector<PairInteractionState> states = initialStates;
  const std::vector<double> times = pair_interaction_sample_times(request);
  std::vector<MotionFrameRowF64> previousFrames;

  for (std::size_t frameIndex = 0; frameIndex < times.size(); ++frameIndex) {
    const double time = times[frameIndex];
    snap_pair_interaction_states_to_constraints(request, states, time);
    std::vector<MotionFrameRowF64> currentFrames;
    currentFrames.reserve(states.size());
    for (const PairInteractionState& state : states) {
      currentFrames.push_back(make_pair_interaction_frame(
          state,
          static_cast<std::uint64_t>(frameIndex),
          time,
          request.integrationTolerance * static_cast<double>(frameIndex)));
    }
    if (!previousFrames.empty()) {
      for (std::size_t stateIndex = 0; stateIndex < currentFrames.size(); ++stateIndex) {
        if (currentFrames[stateIndex].time > previousFrames[stateIndex].time) {
          result.pathRows.push_back(make_pair_interaction_path_history_row(
              previousFrames[stateIndex],
              currentFrames[stateIndex],
              static_cast<std::uint64_t>(frameIndex - 1)));
        }
      }
    }
    result.frames.insert(result.frames.end(), currentFrames.begin(), currentFrames.end());
    previousFrames = std::move(currentFrames);

    if (frameIndex + 1 < times.size()) {
      advance_pair_interaction_states(
          request,
          states,
          result,
          initialStates,
          time,
          times[frameIndex + 1]);
    }
  }

  summarize_pair_interaction_constraint_residuals(result, request, initialStates);
  summarize_pair_interaction_boundary_residuals(result, request, initialStates);
  result.stepCount = times.empty() ? 0 : static_cast<std::uint64_t>(times.size() - 1);
  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "pair interaction paths integrated",
                        "pair-interaction-integrator");
  return result;
}

}  // namespace architrino::solver

#include "architrino/solver/MotionSampler.hpp"

#include <algorithm>
#include <cmath>
#include <iterator>
#include <limits>
#include <map>
#include <utility>

namespace architrino::solver {
namespace {

constexpr std::uint64_t kPairBoundaryRelaxationMaxIterationCount = 256;
constexpr double kPairBoundaryRelaxationResidualEpsilon = 1e-12;
constexpr std::uint32_t kPairBoundaryResidualModeSameTimePairLaw = 1;
constexpr std::uint32_t kPairBoundaryResidualModeCausalDelayPairLaw = 2;
constexpr double kPairBoundaryRelaxationLineSearchFactors[] = {
    1.25,
    1.0,
    0.5,
    0.25,
    0.125,
    0.0625,
    0.03125,
    0.015625,
    0.0078125,
    0.00390625,
};

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
  if (request.signalSpeed != 0.0 &&
      (!std::isfinite(request.signalSpeed) || request.signalSpeed <= 0.0)) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction signal speed must be zero or positive finite",
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
  if (request.boundaryRelaxationIterationCount > kPairBoundaryRelaxationMaxIterationCount) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction boundary relaxation iteration count exceeds supported budget",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.boundaryRelaxationTolerance) ||
      request.boundaryRelaxationTolerance < 0.0) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction boundary relaxation tolerance must be finite and nonnegative",
                   "pair-interaction-integrator",
                   false);
    return false;
  }
  if (!std::isfinite(request.boundaryRelaxationStepTolerance) ||
      request.boundaryRelaxationStepTolerance < 0.0) {
    validation.add(StatusCode::AppContractError,
                   StatusSeverity::Error,
                   "pair interaction boundary relaxation step tolerance must be finite and nonnegative",
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

struct PairInteractionSampleSchedule {
  std::vector<double> times{};
  std::uint64_t pathConstraintFrameRefinementSampleCount = 0;
};

std::vector<double> unique_pair_interaction_times(std::vector<double> times, double epsilon) {
  std::sort(times.begin(), times.end());
  times.erase(std::unique(times.begin(),
                          times.end(),
                          [epsilon](double left, double right) {
                            return std::abs(left - right) <= epsilon;
                          }),
              times.end());
  return times;
}

PairInteractionSampleSchedule pair_interaction_sample_schedule(
    const PairInteractionRequest& request) {
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
  const std::vector<double> baseTimes = unique_pair_interaction_times(times, epsilon);
  std::vector<double> refinementTimes;
  std::map<std::uint64_t, std::vector<double>> constraintTimesByPath;
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (constraint.time < request.startTime - epsilon ||
        constraint.time > request.endTime + epsilon) {
      continue;
    }
    constraintTimesByPath[constraint.pathKey].push_back(
        std::clamp(constraint.time, request.startTime, request.endTime));
  }
  for (auto& entry : constraintTimesByPath) {
    std::vector<double>& pathTimes = entry.second;
    std::sort(pathTimes.begin(), pathTimes.end());
    pathTimes.erase(std::unique(pathTimes.begin(),
                                pathTimes.end(),
                                [epsilon](double left, double right) {
                                  return std::abs(left - right) <= epsilon;
                                }),
                    pathTimes.end());
    for (std::size_t index = 0; index + 1 < pathTimes.size(); ++index) {
      const double left = pathTimes[index];
      const double right = pathTimes[index + 1];
      if (right - left <= epsilon * 2.0) {
        continue;
      }
      for (double fraction : {0.25, 0.5, 0.75}) {
        const double refinementTime = left + (right - left) * fraction;
        if (refinementTime > request.startTime + epsilon &&
            refinementTime < request.endTime - epsilon) {
          refinementTimes.push_back(refinementTime);
        }
      }
    }
  }
  const std::vector<double> uniqueRefinementTimes =
      unique_pair_interaction_times(refinementTimes, epsilon);
  std::uint64_t refinementSampleCount = 0;
  for (double refinementTime : uniqueRefinementTimes) {
    const bool alreadySampled =
        std::any_of(baseTimes.begin(),
                    baseTimes.end(),
                    [epsilon, refinementTime](double time) {
                      return std::abs(time - refinementTime) <= epsilon;
                    });
    if (!alreadySampled) {
      ++refinementSampleCount;
    }
  }
  std::vector<double> combinedTimes = baseTimes;
  combinedTimes.insert(combinedTimes.end(),
                       uniqueRefinementTimes.begin(),
                       uniqueRefinementTimes.end());
  return PairInteractionSampleSchedule{
      unique_pair_interaction_times(combinedTimes, epsilon),
      refinementSampleCount,
  };
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

double vector_component(Vector3 value, std::size_t componentIndex) {
  if (componentIndex == 0) {
    return value.x;
  }
  if (componentIndex == 1) {
    return value.y;
  }
  return value.z;
}

void set_vector_component(Vector3& value, std::size_t componentIndex, double componentValue) {
  if (componentIndex == 0) {
    value.x = componentValue;
    return;
  }
  if (componentIndex == 1) {
    value.y = componentValue;
    return;
  }
  value.z = componentValue;
}

double pair_interaction_law_position_derivative_component(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& states,
    std::size_t accelerationStateIndex,
    std::size_t positionStateIndex,
    std::size_t accelerationComponentIndex,
    std::size_t positionComponentIndex) {
  if (accelerationStateIndex >= states.size() || positionStateIndex >= states.size()) {
    return std::numeric_limits<double>::quiet_NaN();
  }
  const double duration = std::max(request.endTime - request.startTime, request.step);
  const double factor = request.pairAccelerationScale / std::max(duration * duration, 1e-12);
  const double softeningSquared = request.softening * request.softening;
  const PairInteractionState& state = states[accelerationStateIndex];
  double derivative = 0.0;
  for (std::size_t otherIndex = 0; otherIndex < states.size(); ++otherIndex) {
    if (otherIndex == accelerationStateIndex) {
      continue;
    }
    const PairInteractionState& other = states[otherIndex];
    const double deltaSign = positionStateIndex == otherIndex
        ? 1.0
        : positionStateIndex == accelerationStateIndex ? -1.0 : 0.0;
    if (deltaSign == 0.0) {
      continue;
    }
    const Vector3 delta{
        other.initialPosition.x - state.initialPosition.x,
        other.initialPosition.y - state.initialPosition.y,
        other.initialPosition.z - state.initialPosition.z,
    };
    const double distanceSquared =
        delta.x * delta.x + delta.y * delta.y + delta.z * delta.z + softeningSquared;
    const double attractionSign = state.charge * other.charge <= 0.0 ? 1.0 : -1.0;
    const double strength = (factor * attractionSign * std::abs(other.charge)) / state.mass;
    const double sameComponent = accelerationComponentIndex == positionComponentIndex ? 1.0 : 0.0;
    if (request.interactionLaw == 2) {
      const double radius = std::max(std::sqrt(distanceSquared), 1e-12);
      derivative += strength * deltaSign *
          (sameComponent / radius -
           (vector_component(delta, accelerationComponentIndex) *
            vector_component(delta, positionComponentIndex)) /
               (radius * radius * radius));
    } else {
      derivative += strength * deltaSign * sameComponent;
    }
  }
  return derivative;
}

double pair_interaction_law_self_derivative_component(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& states,
    std::size_t stateIndex,
    std::size_t componentIndex) {
  return pair_interaction_law_position_derivative_component(
      request,
      states,
      stateIndex,
      stateIndex,
      componentIndex,
      componentIndex);
}

double pair_constraint_time_epsilon(const PairInteractionRequest& request) {
  return std::max(request.step * 1e-9, 1e-12);
}

std::vector<PairInteractionPathConstraint> pair_constraints_for_path(
    const PairInteractionRequest& request,
    std::uint64_t pathKey);
std::vector<PairInteractionState> states_from_constraints_at_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double time);

bool pair_constraint_law_acceleration_at_time(const PairInteractionRequest& request,
                                              const std::vector<PairInteractionState>& initialStates,
                                              std::uint64_t pathKey,
                                              double time,
                                              Vector3& outAcceleration) {
  const std::vector<PairInteractionState> states =
      states_from_constraints_at_time(request, initialStates, time);
  if (states.size() != initialStates.size()) {
    return false;
  }
  const std::vector<Vector3> accelerations = pair_interaction_accelerations(request, states);
  const auto stateMatch = std::find_if(states.begin(),
                                       states.end(),
                                       [pathKey](const PairInteractionState& state) {
                                         return state.pathKey == pathKey;
                                       });
  if (stateMatch == states.end()) {
    return false;
  }
  const std::size_t stateIndex = static_cast<std::size_t>(
      std::distance(states.begin(), stateMatch));
  if (stateIndex >= accelerations.size()) {
    return false;
  }
  outAcceleration = accelerations[stateIndex];
  return finite_vector(outAcceleration);
}

bool pair_interaction_uses_fixed_signal_speed(const PairInteractionRequest& request) {
  return std::isfinite(request.signalSpeed) && request.signalSpeed > 0.0;
}

std::uint32_t pair_boundary_residual_mode_for_request(const PairInteractionRequest& request) {
  return pair_interaction_uses_fixed_signal_speed(request)
      ? kPairBoundaryResidualModeCausalDelayPairLaw
      : kPairBoundaryResidualModeSameTimePairLaw;
}

bool pair_constraint_geometric_tangent_for_index(
    const std::vector<PairInteractionPathConstraint>& constraints,
    std::size_t index,
    double epsilon,
    Vector3& outVelocity);

bool pair_constraint_law_aware_tangent_for_index(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<PairInteractionPathConstraint>& constraints,
    std::size_t index,
    double epsilon,
    Vector3& outVelocity) {
  if (index == 0 || index >= constraints.size()) {
    return false;
  }
  const PairInteractionPathConstraint& current = constraints[index];
  Vector3 acceleration{};
  if (!pair_constraint_law_acceleration_at_time(
          request,
          initialStates,
          current.pathKey,
          current.time,
          acceleration)) {
    return false;
  }
  const PairInteractionPathConstraint& previous = constraints[index - 1];
  if (index + 1 < constraints.size()) {
    const PairInteractionPathConstraint& next = constraints[index + 1];
    const double leftDt = current.time - previous.time;
    const double rightDt = next.time - current.time;
    const double span = leftDt + rightDt;
    if (leftDt > epsilon && rightDt > epsilon && span > epsilon) {
      const double accelerationTimeBias = 0.5 * (rightDt * rightDt - leftDt * leftDt);
      outVelocity = Vector3{
          (next.position.x - previous.position.x -
           acceleration.x * accelerationTimeBias) /
              span,
          (next.position.y - previous.position.y -
           acceleration.y * accelerationTimeBias) /
              span,
          (next.position.z - previous.position.z -
           acceleration.z * accelerationTimeBias) /
              span,
      };
      return finite_vector(outVelocity);
    }
  }
  const double span = current.time - previous.time;
  if (span <= epsilon) {
    return false;
  }
  outVelocity = Vector3{
      (current.position.x - previous.position.x) / span + 0.5 * acceleration.x * span,
      (current.position.y - previous.position.y) / span + 0.5 * acceleration.y * span,
      (current.position.z - previous.position.z) / span + 0.5 * acceleration.z * span,
  };
  return finite_vector(outVelocity);
}

bool pair_constraint_tangent_at_time(const std::vector<PairInteractionPathConstraint>& constraints,
                                     double time,
                                     double epsilon,
                                     const PairInteractionRequest& request,
                                     const std::vector<PairInteractionState>& initialStates,
                                     Vector3& outVelocity) {
  for (std::size_t index = 0; index < constraints.size(); ++index) {
    const PairInteractionPathConstraint& current = constraints[index];
    if (std::abs(current.time - time) > epsilon) {
      continue;
    }
    if (index == 0) {
      const auto initialState = std::find_if(
          initialStates.begin(),
          initialStates.end(),
          [&current](const PairInteractionState& state) {
            return state.pathKey == current.pathKey;
          });
      if (initialState == initialStates.end()) {
        return false;
      }
      outVelocity = initialState->initialVelocity;
      return finite_vector(outVelocity);
    }
    if (pair_constraint_law_aware_tangent_for_index(
            request,
            initialStates,
            constraints,
            index,
            epsilon,
            outVelocity)) {
      return true;
    }
    return pair_constraint_geometric_tangent_for_index(
        constraints,
        index,
        epsilon,
        outVelocity);
  }
  return false;
}

bool pair_constraint_geometric_tangent_for_index(
    const std::vector<PairInteractionPathConstraint>& constraints,
    std::size_t index,
    double epsilon,
    Vector3& outVelocity) {
  if (index >= constraints.size()) {
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

bool pair_constraint_tangent_for_index(const PairInteractionRequest& request,
                                       const std::vector<PairInteractionState>& initialStates,
                                       const std::vector<PairInteractionPathConstraint>& constraints,
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
  if (pair_constraint_law_aware_tangent_for_index(
          request,
          initialStates,
          constraints,
          index,
          epsilon,
          outVelocity)) {
    return true;
  }
  return pair_constraint_geometric_tangent_for_index(
      constraints,
      index,
      epsilon,
      outVelocity);
}

bool pair_constraint_quintic_boundary_position(
    const PairInteractionPathConstraint& left,
    const PairInteractionPathConstraint& right,
    Vector3 leftTangent,
    Vector3 rightTangent,
    Vector3 leftAcceleration,
    Vector3 rightAcceleration,
    double u,
    double span,
    Vector3& outPosition) {
  const double u2 = u * u;
  const double u3 = u2 * u;
  const double u4 = u3 * u;
  const double u5 = u4 * u;
  const double h00 = 1.0 - 10.0 * u3 + 15.0 * u4 - 6.0 * u5;
  const double h10 = u - 6.0 * u3 + 8.0 * u4 - 3.0 * u5;
  const double h20 = 0.5 * u2 - 1.5 * u3 + 1.5 * u4 - 0.5 * u5;
  const double h01 = 10.0 * u3 - 15.0 * u4 + 6.0 * u5;
  const double h11 = -4.0 * u3 + 7.0 * u4 - 3.0 * u5;
  const double h21 = 0.5 * u3 - u4 + 0.5 * u5;
  const double spanSquared = span * span;
  outPosition = Vector3{
      h00 * left.position.x + h10 * span * leftTangent.x +
          h20 * spanSquared * leftAcceleration.x + h01 * right.position.x +
          h11 * span * rightTangent.x + h21 * spanSquared * rightAcceleration.x,
      h00 * left.position.y + h10 * span * leftTangent.y +
          h20 * spanSquared * leftAcceleration.y + h01 * right.position.y +
          h11 * span * rightTangent.y + h21 * spanSquared * rightAcceleration.y,
      h00 * left.position.z + h10 * span * leftTangent.z +
          h20 * spanSquared * leftAcceleration.z + h01 * right.position.z +
          h11 * span * rightTangent.z + h21 * spanSquared * rightAcceleration.z,
  };
  return finite_vector(outPosition);
}

bool pair_constraint_hermite_position_at_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
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
  if (!pair_constraint_tangent_for_index(
          request, initialStates, constraints, leftIndex, firstTangent, epsilon, leftTangent) ||
      !pair_constraint_tangent_for_index(
          request, initialStates, constraints, rightIndex, firstTangent, epsilon, rightTangent)) {
    return false;
  }
  const double u = std::clamp((time - left.time) / span, 0.0, 1.0);
  Vector3 leftAcceleration{};
  Vector3 rightAcceleration{};
  if (pair_constraint_law_acceleration_at_time(
          request, initialStates, left.pathKey, left.time, leftAcceleration) &&
      pair_constraint_law_acceleration_at_time(request,
                                               initialStates,
                                               rightConstraint.pathKey,
                                               rightConstraint.time,
                                               rightAcceleration) &&
      pair_constraint_quintic_boundary_position(left,
                                                rightConstraint,
                                                leftTangent,
                                                rightTangent,
                                                leftAcceleration,
                                                rightAcceleration,
                                                u,
                                                span,
                                                outPosition)) {
    return true;
  }
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
      if (pair_constraint_tangent_at_time(
              constraints,
              time,
              epsilon,
              request,
              states,
              tangentVelocity)) {
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
          request,
          initialStates,
          constraints,
          firstTangent,
          nextTime,
          epsilon,
          targetPosition)) {
    return PairInteractionGuidedAcceleration{physicalAcceleration, 0.0, false};
  }

  // The pair force is still evaluated first. This boundary correction is the
  // additional acceleration needed, under the solver's semi-implicit step rule,
  // to land on the retained-knot boundary path at the next emitted sample.
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
                                     double nextTime,
                                     bool useConstraintGuidance) {
  const double dt = nextTime - currentTime;
  if (dt <= 0.0) {
    return;
  }
  const std::vector<Vector3> accelerations = pair_interaction_accelerations(request, states);
  for (std::size_t index = 0; index < states.size(); ++index) {
    PairInteractionState& state = states[index];
    Vector3 acceleration = accelerations[index];
    if (useConstraintGuidance) {
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
      acceleration = guidedAcceleration.acceleration;
    }
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

std::vector<PairInteractionState> states_from_constraint_boundary_at_time(
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
    if (!pair_constraint_hermite_position_at_time(request,
                                                  initialStates,
                                                  constraints,
                                                  initialState.initialVelocity,
                                                  time,
                                                  epsilon,
                                                  position)) {
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

Vector3 vector_subtract(Vector3 left, Vector3 right);
double vector_norm(Vector3 value);

struct PairDelayedSourceRootCandidate {
  double time = 0.0;
  double residual = 0.0;
  Vector3 position{};
  bool valid = false;
};

PairDelayedSourceRootCandidate pair_constraint_delayed_source_root_candidate(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<PairInteractionPathConstraint>& sourceConstraints,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    double emissionTime) {
  Vector3 sourcePosition{};
  if (!pair_constraint_hermite_position_at_time(request,
                                                initialStates,
                                                sourceConstraints,
                                                sourceInitialState.initialVelocity,
                                                emissionTime,
                                                epsilon,
                                                sourcePosition)) {
    return PairDelayedSourceRootCandidate{};
  }
  const double distance = vector_norm(vector_subtract(receiverPosition, sourcePosition));
  const double residual = distance - signalSpeed * (hitTime - emissionTime);
  if (!std::isfinite(residual)) {
    return PairDelayedSourceRootCandidate{};
  }
  return PairDelayedSourceRootCandidate{emissionTime, residual, sourcePosition, true};
}

PairDelayedSourceRootCandidate bisect_pair_constraint_delayed_source_root(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<PairInteractionPathConstraint>& sourceConstraints,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    PairDelayedSourceRootCandidate left,
    PairDelayedSourceRootCandidate right) {
  if (!left.valid || !right.valid || right.time < left.time) {
    return PairDelayedSourceRootCandidate{};
  }
  for (std::uint32_t iteration = 0; iteration < 64; ++iteration) {
    const double midpoint = 0.5 * (left.time + right.time);
    if (std::abs(right.time - left.time) <= epsilon) {
      break;
    }
    PairDelayedSourceRootCandidate middle = pair_constraint_delayed_source_root_candidate(
        request,
        initialStates,
        sourceConstraints,
        sourceInitialState,
        receiverPosition,
        hitTime,
        signalSpeed,
        epsilon,
        midpoint);
    if (!middle.valid) {
      return PairDelayedSourceRootCandidate{};
    }
    if (left.residual * middle.residual <= 0.0) {
      right = middle;
    } else {
      left = middle;
    }
  }
  return std::abs(left.residual) <= std::abs(right.residual) ? left : right;
}

bool pair_constraint_delayed_source_state_at_hit_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    PairInteractionState& outState) {
  const std::vector<PairInteractionPathConstraint> sourceConstraints =
      pair_constraints_for_path(request, sourceInitialState.pathKey);
  if (sourceConstraints.size() < 2 || !std::isfinite(signalSpeed) || signalSpeed <= 0.0) {
    return false;
  }
  const double lowerTime = sourceConstraints.front().time;
  const double upperTime = std::min(hitTime - epsilon, sourceConstraints.back().time);
  if (upperTime < lowerTime - epsilon) {
    return false;
  }

  const double rootTolerance = std::max(epsilon * signalSpeed, 1e-9);
  PairDelayedSourceRootCandidate best;
  double bestAbsResidual = std::numeric_limits<double>::infinity();
  const auto considerCandidate = [&](const PairDelayedSourceRootCandidate& candidate) {
    if (!candidate.valid) {
      return;
    }
    const double absResidual = std::abs(candidate.residual);
    if (absResidual < bestAbsResidual ||
        (std::abs(absResidual - bestAbsResidual) <= rootTolerance &&
         (!best.valid || candidate.time > best.time))) {
      best = candidate;
      bestAbsResidual = absResidual;
    }
  };

  for (std::size_t constraintIndex = 0;
       constraintIndex + 1 < sourceConstraints.size();
       ++constraintIndex) {
    const double segmentStart = std::max(lowerTime, sourceConstraints[constraintIndex].time);
    const double segmentEnd = std::min(upperTime, sourceConstraints[constraintIndex + 1].time);
    if (segmentEnd < segmentStart - epsilon) {
      continue;
    }
    PairDelayedSourceRootCandidate previous = pair_constraint_delayed_source_root_candidate(
        request,
        initialStates,
        sourceConstraints,
        sourceInitialState,
        receiverPosition,
        hitTime,
        signalSpeed,
        epsilon,
        segmentStart);
    considerCandidate(previous);
    constexpr std::uint32_t subdivisionCount = 8;
    for (std::uint32_t subdivision = 1; subdivision <= subdivisionCount; ++subdivision) {
      const double emissionTime =
          segmentStart + (segmentEnd - segmentStart) *
              (static_cast<double>(subdivision) / static_cast<double>(subdivisionCount));
      const PairDelayedSourceRootCandidate current = pair_constraint_delayed_source_root_candidate(
          request,
          initialStates,
          sourceConstraints,
          sourceInitialState,
          receiverPosition,
          hitTime,
          signalSpeed,
          epsilon,
          emissionTime);
      considerCandidate(current);
      if (previous.valid && current.valid && previous.residual * current.residual <= 0.0) {
        considerCandidate(bisect_pair_constraint_delayed_source_root(request,
                                                                     initialStates,
                                                                     sourceConstraints,
                                                                     sourceInitialState,
                                                                     receiverPosition,
                                                                     hitTime,
                                                                     signalSpeed,
                                                                     epsilon,
                                                                     previous,
                                                                     current));
      }
      previous = current;
    }
  }

  if (!best.valid || bestAbsResidual > rootTolerance) {
    return false;
  }
  outState = PairInteractionState{
      sourceInitialState.pathKey,
      best.position,
      Vector3{},
      sourceInitialState.charge,
      sourceInitialState.mass == 0.0 ? 1.0 : sourceInitialState.mass,
      sourceInitialState.stateFlags,
  };
  return true;
}

bool pair_constraint_causal_delay_law_acceleration_at_constraint(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const PairInteractionPathConstraint& receiverConstraint,
    double epsilon,
    Vector3& outAcceleration) {
  if (!pair_interaction_uses_fixed_signal_speed(request)) {
    return false;
  }
  const auto receiverInitialState = std::find_if(
      initialStates.begin(),
      initialStates.end(),
      [&receiverConstraint](const PairInteractionState& state) {
        return state.pathKey == receiverConstraint.pathKey;
      });
  if (receiverInitialState == initialStates.end()) {
    return false;
  }
  std::vector<PairInteractionState> states;
  states.reserve(initialStates.size());
  states.push_back(PairInteractionState{
      receiverInitialState->pathKey,
      receiverConstraint.position,
      Vector3{},
      receiverInitialState->charge,
      receiverInitialState->mass == 0.0 ? 1.0 : receiverInitialState->mass,
      receiverInitialState->stateFlags,
  });
  for (const PairInteractionState& sourceInitialState : initialStates) {
    if (sourceInitialState.pathKey == receiverConstraint.pathKey) {
      continue;
    }
    PairInteractionState delayedSource{};
    if (!pair_constraint_delayed_source_state_at_hit_time(request,
                                                          initialStates,
                                                          sourceInitialState,
                                                          receiverConstraint.position,
                                                          receiverConstraint.time,
                                                          request.signalSpeed,
                                                          epsilon,
                                                          delayedSource)) {
      return false;
    }
    states.push_back(delayedSource);
  }
  if (states.size() != initialStates.size()) {
    return false;
  }
  std::sort(states.begin(),
            states.end(),
            [](const PairInteractionState& left, const PairInteractionState& right) {
              return left.pathKey < right.pathKey;
            });
  const std::vector<Vector3> lawAccelerations = pair_interaction_accelerations(request, states);
  const auto stateMatch = std::find_if(states.begin(),
                                       states.end(),
                                       [&receiverConstraint](const PairInteractionState& state) {
                                         return state.pathKey == receiverConstraint.pathKey;
                                       });
  if (stateMatch == states.end()) {
    return false;
  }
  const std::size_t stateIndex = static_cast<std::size_t>(
      std::distance(states.begin(), stateMatch));
  if (stateIndex >= lawAccelerations.size()) {
    return false;
  }
  outAcceleration = lawAccelerations[stateIndex];
  return finite_vector(outAcceleration);
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

double vector_dot(Vector3 left, Vector3 right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

double vector_norm(Vector3 value) {
  return std::sqrt(value.x * value.x + value.y * value.y + value.z * value.z);
}

double finite_nonnegative_ratio(double after, double before) {
  return before > 0.0 && std::isfinite(before) && std::isfinite(after) ? after / before : 0.0;
}

double finite_nonnegative_settling_rate(double ratio, std::uint64_t appliedIterationCount) {
  if (appliedIterationCount == 0 || !std::isfinite(ratio) || ratio < 0.0) {
    return 0.0;
  }
  if (ratio == 0.0) {
    return 0.0;
  }
  return std::pow(ratio, 1.0 / static_cast<double>(appliedIterationCount));
}

std::vector<double> solve_tridiagonal_system(const std::vector<double>& lower,
                                             const std::vector<double>& diagonal,
                                             const std::vector<double>& upper,
                                             const std::vector<double>& rhs) {
  const std::size_t count = diagonal.size();
  if (count == 0 || lower.size() != count || upper.size() != count || rhs.size() != count) {
    return {};
  }
  std::vector<double> cPrime(count, 0.0);
  std::vector<double> dPrime(count, 0.0);
  std::vector<double> solution(count, 0.0);
  double pivot = diagonal[0];
  if (!std::isfinite(pivot) || std::abs(pivot) <= std::numeric_limits<double>::epsilon()) {
    return {};
  }
  cPrime[0] = count > 1 ? upper[0] / pivot : 0.0;
  dPrime[0] = rhs[0] / pivot;
  for (std::size_t index = 1; index < count; ++index) {
    pivot = diagonal[index] - lower[index] * cPrime[index - 1];
    if (!std::isfinite(pivot) || std::abs(pivot) <= std::numeric_limits<double>::epsilon()) {
      return {};
    }
    cPrime[index] = index + 1 < count ? upper[index] / pivot : 0.0;
    dPrime[index] = (rhs[index] - lower[index] * dPrime[index - 1]) / pivot;
  }
  solution[count - 1] = dPrime[count - 1];
  for (std::size_t reverse = count - 1; reverse > 0; --reverse) {
    const std::size_t index = reverse - 1;
    solution[index] = dPrime[index] - cPrime[index] * solution[index + 1];
  }
  if (std::any_of(solution.begin(), solution.end(), [](double value) {
        return !std::isfinite(value);
      })) {
    return {};
  }
  return solution;
}

std::vector<double> solve_dense_linear_system(std::vector<std::vector<double>> matrix,
                                              std::vector<double> rhs,
                                              double epsilon) {
  const std::size_t size = rhs.size();
  if (size == 0 || matrix.size() != size) {
    return {};
  }
  for (const std::vector<double>& row : matrix) {
    if (row.size() != size) {
      return {};
    }
  }

  for (std::size_t pivotIndex = 0; pivotIndex < size; ++pivotIndex) {
    std::size_t pivotRow = pivotIndex;
    double pivotAbs = std::abs(matrix[pivotRow][pivotIndex]);
    for (std::size_t rowIndex = pivotIndex + 1; rowIndex < size; ++rowIndex) {
      const double candidateAbs = std::abs(matrix[rowIndex][pivotIndex]);
      if (candidateAbs > pivotAbs) {
        pivotAbs = candidateAbs;
        pivotRow = rowIndex;
      }
    }
    if (!std::isfinite(pivotAbs) || pivotAbs <= epsilon) {
      return {};
    }
    if (pivotRow != pivotIndex) {
      std::swap(matrix[pivotIndex], matrix[pivotRow]);
      std::swap(rhs[pivotIndex], rhs[pivotRow]);
    }
    const double pivot = matrix[pivotIndex][pivotIndex];
    for (std::size_t rowIndex = pivotIndex + 1; rowIndex < size; ++rowIndex) {
      const double factor = matrix[rowIndex][pivotIndex] / pivot;
      if (!std::isfinite(factor)) {
        return {};
      }
      matrix[rowIndex][pivotIndex] = 0.0;
      for (std::size_t columnIndex = pivotIndex + 1; columnIndex < size; ++columnIndex) {
        matrix[rowIndex][columnIndex] -= factor * matrix[pivotIndex][columnIndex];
      }
      rhs[rowIndex] -= factor * rhs[pivotIndex];
    }
  }

  std::vector<double> solution(size, 0.0);
  for (std::size_t reverse = size; reverse > 0; --reverse) {
    const std::size_t rowIndex = reverse - 1;
    double value = rhs[rowIndex];
    for (std::size_t columnIndex = rowIndex + 1; columnIndex < size; ++columnIndex) {
      value -= matrix[rowIndex][columnIndex] * solution[columnIndex];
    }
    const double diagonal = matrix[rowIndex][rowIndex];
    if (!std::isfinite(diagonal) || std::abs(diagonal) <= epsilon) {
      return {};
    }
    solution[rowIndex] = value / diagonal;
    if (!std::isfinite(solution[rowIndex])) {
      return {};
    }
  }
  return solution;
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

bool pair_interaction_frame_state_at_time(
    const std::vector<const MotionFrameRowF64*>& sourceFrames,
    const PairInteractionState& sourceInitialState,
    double time,
    double epsilon,
    PairInteractionState& outState) {
  if (sourceFrames.empty()) {
    return false;
  }
  const auto exact = std::find_if(sourceFrames.begin(),
                                  sourceFrames.end(),
                                  [time, epsilon](const MotionFrameRowF64* frame) {
                                    return frame != nullptr &&
                                        std::abs(frame->time - time) <= epsilon;
                                  });
  if (exact != sourceFrames.end()) {
    const MotionFrameRowF64& frame = **exact;
    outState = PairInteractionState{
        sourceInitialState.pathKey,
        frame_position(frame),
        Vector3{frame.velocityX, frame.velocityY, frame.velocityZ},
        sourceInitialState.charge,
        sourceInitialState.mass == 0.0 ? 1.0 : sourceInitialState.mass,
        frame.stateFlags,
    };
    return true;
  }
  if (time < sourceFrames.front()->time - epsilon ||
      time > sourceFrames.back()->time + epsilon) {
    return false;
  }
  const auto right = std::find_if(sourceFrames.begin(),
                                  sourceFrames.end(),
                                  [time](const MotionFrameRowF64* frame) {
                                    return frame != nullptr && frame->time >= time;
                                  });
  if (right == sourceFrames.begin() || right == sourceFrames.end()) {
    return false;
  }
  const MotionFrameRowF64& leftFrame = **std::prev(right);
  const MotionFrameRowF64& rightFrame = **right;
  const double span = rightFrame.time - leftFrame.time;
  if (span <= epsilon) {
    return false;
  }
  const double amount = std::clamp((time - leftFrame.time) / span, 0.0, 1.0);
  const auto lerp = [amount](double left, double rightValue) {
    return left + (rightValue - left) * amount;
  };
  outState = PairInteractionState{
      sourceInitialState.pathKey,
      Vector3{
          lerp(leftFrame.positionX, rightFrame.positionX),
          lerp(leftFrame.positionY, rightFrame.positionY),
          lerp(leftFrame.positionZ, rightFrame.positionZ),
      },
      Vector3{
          lerp(leftFrame.velocityX, rightFrame.velocityX),
          lerp(leftFrame.velocityY, rightFrame.velocityY),
          lerp(leftFrame.velocityZ, rightFrame.velocityZ),
      },
      sourceInitialState.charge,
      sourceInitialState.mass == 0.0 ? 1.0 : sourceInitialState.mass,
      leftFrame.stateFlags,
  };
  return finite_vector(outState.initialPosition) && finite_vector(outState.initialVelocity);
}

PairDelayedSourceRootCandidate pair_interaction_delayed_source_root_candidate(
    const std::vector<const MotionFrameRowF64*>& sourceFrames,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    double emissionTime) {
  PairInteractionState sourceState{};
  if (!pair_interaction_frame_state_at_time(
          sourceFrames,
          sourceInitialState,
          emissionTime,
          epsilon,
          sourceState)) {
    return PairDelayedSourceRootCandidate{};
  }
  const double distance = vector_norm(vector_subtract(receiverPosition, sourceState.initialPosition));
  const double residual = distance - signalSpeed * (hitTime - emissionTime);
  if (!std::isfinite(residual)) {
    return PairDelayedSourceRootCandidate{};
  }
  return PairDelayedSourceRootCandidate{emissionTime, residual, sourceState.initialPosition, true};
}

PairDelayedSourceRootCandidate bisect_pair_interaction_delayed_source_root(
    const std::vector<const MotionFrameRowF64*>& sourceFrames,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    PairDelayedSourceRootCandidate left,
    PairDelayedSourceRootCandidate right) {
  if (!left.valid || !right.valid || right.time < left.time) {
    return PairDelayedSourceRootCandidate{};
  }
  for (std::uint32_t iteration = 0; iteration < 64; ++iteration) {
    const double midpoint = 0.5 * (left.time + right.time);
    if (std::abs(right.time - left.time) <= epsilon) {
      break;
    }
    PairDelayedSourceRootCandidate middle = pair_interaction_delayed_source_root_candidate(
        sourceFrames,
        sourceInitialState,
        receiverPosition,
        hitTime,
        signalSpeed,
        epsilon,
        midpoint);
    if (!middle.valid) {
      return PairDelayedSourceRootCandidate{};
    }
    if (left.residual * middle.residual <= 0.0) {
      right = middle;
    } else {
      left = middle;
    }
  }
  return std::abs(left.residual) <= std::abs(right.residual) ? left : right;
}

bool pair_interaction_delayed_source_state_at_hit_time(
    const std::vector<MotionFrameRowF64>& frames,
    const PairInteractionState& sourceInitialState,
    Vector3 receiverPosition,
    double hitTime,
    double signalSpeed,
    double epsilon,
    PairInteractionState& outState) {
  const std::vector<const MotionFrameRowF64*> sourceFrames =
      sorted_const_frames_for_path(frames, sourceInitialState.pathKey);
  if (sourceFrames.size() < 2 || !std::isfinite(signalSpeed) || signalSpeed <= 0.0) {
    return false;
  }
  const double lowerTime = sourceFrames.front()->time;
  const double upperTime = std::min(hitTime - epsilon, sourceFrames.back()->time);
  if (upperTime < lowerTime - epsilon) {
    return false;
  }

  const double rootTolerance = std::max(epsilon * signalSpeed, 1e-9);
  PairDelayedSourceRootCandidate best;
  double bestAbsResidual = std::numeric_limits<double>::infinity();
  const auto considerCandidate = [&](const PairDelayedSourceRootCandidate& candidate) {
    if (!candidate.valid) {
      return;
    }
    const double absResidual = std::abs(candidate.residual);
    if (absResidual < bestAbsResidual ||
        (std::abs(absResidual - bestAbsResidual) <= rootTolerance &&
         (!best.valid || candidate.time > best.time))) {
      best = candidate;
      bestAbsResidual = absResidual;
    }
  };

  for (std::size_t frameIndex = 0; frameIndex + 1 < sourceFrames.size(); ++frameIndex) {
    const double segmentStart = std::max(lowerTime, sourceFrames[frameIndex]->time);
    const double segmentEnd = std::min(upperTime, sourceFrames[frameIndex + 1]->time);
    if (segmentEnd < segmentStart - epsilon) {
      continue;
    }
    PairDelayedSourceRootCandidate previous = pair_interaction_delayed_source_root_candidate(
        sourceFrames,
        sourceInitialState,
        receiverPosition,
        hitTime,
        signalSpeed,
        epsilon,
        segmentStart);
    considerCandidate(previous);
    constexpr std::uint32_t subdivisionCount = 8;
    for (std::uint32_t subdivision = 1; subdivision <= subdivisionCount; ++subdivision) {
      const double emissionTime =
          segmentStart + (segmentEnd - segmentStart) *
              (static_cast<double>(subdivision) / static_cast<double>(subdivisionCount));
      const PairDelayedSourceRootCandidate current = pair_interaction_delayed_source_root_candidate(
          sourceFrames,
          sourceInitialState,
          receiverPosition,
          hitTime,
          signalSpeed,
          epsilon,
          emissionTime);
      considerCandidate(current);
      if (previous.valid && current.valid && previous.residual * current.residual <= 0.0) {
        considerCandidate(bisect_pair_interaction_delayed_source_root(sourceFrames,
                                                                      sourceInitialState,
                                                                      receiverPosition,
                                                                      hitTime,
                                                                      signalSpeed,
                                                                      epsilon,
                                                                      previous,
                                                                      current));
      }
      previous = current;
    }
  }

  if (!best.valid || bestAbsResidual > rootTolerance) {
    return false;
  }
  return pair_interaction_frame_state_at_time(
      sourceFrames,
      sourceInitialState,
      best.time,
      epsilon,
      outState);
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

bool pair_interaction_acceleration_at_frame(
    const std::vector<MotionFrameRowF64>& frames,
    std::uint64_t frameIndex,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    std::uint64_t pathKey,
    Vector3& acceleration) {
  if (pair_interaction_uses_fixed_signal_speed(request)) {
    const auto receiverFrame = std::find_if(frames.begin(),
                                            frames.end(),
                                            [frameIndex, pathKey](const MotionFrameRowF64& frame) {
                                              return frame.frameIndex == frameIndex &&
                                                  frame.pathKey == pathKey;
                                            });
    if (receiverFrame == frames.end()) {
      return false;
    }
    const auto receiverInitialState = std::find_if(
        initialStates.begin(),
        initialStates.end(),
        [pathKey](const PairInteractionState& state) {
          return state.pathKey == pathKey;
        });
    if (receiverInitialState == initialStates.end()) {
      return false;
    }
    std::vector<PairInteractionState> states;
    states.reserve(initialStates.size());
    states.push_back(PairInteractionState{
        receiverInitialState->pathKey,
        frame_position(*receiverFrame),
        Vector3{receiverFrame->velocityX, receiverFrame->velocityY, receiverFrame->velocityZ},
        receiverInitialState->charge,
        receiverInitialState->mass == 0.0 ? 1.0 : receiverInitialState->mass,
        receiverFrame->stateFlags,
    });
    const double epsilon = pair_constraint_time_epsilon(request);
    for (const PairInteractionState& sourceInitialState : initialStates) {
      if (sourceInitialState.pathKey == pathKey) {
        continue;
      }
      PairInteractionState delayedSource{};
      if (!pair_interaction_delayed_source_state_at_hit_time(frames,
                                                             sourceInitialState,
                                                             frame_position(*receiverFrame),
                                                             receiverFrame->time,
                                                             request.signalSpeed,
                                                             epsilon,
                                                             delayedSource)) {
        return false;
      }
      states.push_back(delayedSource);
    }
    if (states.size() != initialStates.size()) {
      return false;
    }
    std::sort(states.begin(),
              states.end(),
              [](const PairInteractionState& left, const PairInteractionState& right) {
                return left.pathKey < right.pathKey;
              });
    const std::vector<Vector3> lawAccelerations =
        pair_interaction_accelerations(request, states);
    const auto stateMatch = std::find_if(states.begin(),
                                         states.end(),
                                         [pathKey](const PairInteractionState& state) {
                                           return state.pathKey == pathKey;
                                         });
    if (stateMatch == states.end()) {
      return false;
    }
    const std::size_t stateIndex = static_cast<std::size_t>(
        std::distance(states.begin(), stateMatch));
    if (stateIndex >= lawAccelerations.size() || !finite_vector(lawAccelerations[stateIndex])) {
      return false;
    }
    acceleration = lawAccelerations[stateIndex];
    return true;
  }

  const std::vector<PairInteractionState> states =
      states_at_frame_index(frames, frameIndex, initialStates);
  if (states.size() != initialStates.size()) {
    return false;
  }
  const std::vector<Vector3> lawAccelerations =
      pair_interaction_accelerations(request, states);
  const auto stateMatch = std::find_if(states.begin(),
                                       states.end(),
                                       [pathKey](const PairInteractionState& state) {
                                         return state.pathKey == pathKey;
                                       });
  if (stateMatch == states.end()) {
    return false;
  }
  const std::size_t stateIndex = static_cast<std::size_t>(
      std::distance(states.begin(), stateMatch));
  if (stateIndex >= lawAccelerations.size() || !finite_vector(lawAccelerations[stateIndex])) {
    return false;
  }
  acceleration = lawAccelerations[stateIndex];
  return true;
}

Vector3 blend_pair_interaction_acceleration(Vector3 primary,
                                            Vector3 secondary,
                                            double secondaryWeight) {
  const double weight = std::isfinite(secondaryWeight)
      ? std::clamp(secondaryWeight, 0.0, 1.0)
      : 0.0;
  const double primaryWeight = 1.0 - weight;
  return Vector3{
      primary.x * primaryWeight + secondary.x * weight,
      primary.y * primaryWeight + secondary.y * weight,
      primary.z * primaryWeight + secondary.z * weight,
  };
}

bool has_pair_constraint_at_time(const PairInteractionRequest& request,
                                 std::uint64_t pathKey,
                                 double time,
                                 double epsilon) {
  const std::vector<PairInteractionPathConstraint> constraints =
      pair_constraints_for_path(request, pathKey);
  return std::any_of(constraints.begin(),
                     constraints.end(),
                     [time, epsilon](const PairInteractionPathConstraint& constraint) {
                       return std::abs(constraint.time - time) <= epsilon;
                     });
}

std::vector<std::size_t> mutable_frame_indices_for_path(
    const std::vector<MotionFrameRowF64>& frames,
    std::uint64_t pathKey) {
  std::vector<std::size_t> indices;
  for (std::size_t index = 0; index < frames.size(); ++index) {
    if (frames[index].pathKey == pathKey) {
      indices.push_back(index);
    }
  }
  std::sort(indices.begin(), indices.end(), [&frames](std::size_t left, std::size_t right) {
    if (frames[left].time == frames[right].time) {
      return frames[left].frameIndex < frames[right].frameIndex;
    }
    return frames[left].time < frames[right].time;
  });
  return indices;
}

void set_frame_position(MotionFrameRowF64& frame, Vector3 position) {
  frame.positionX = position.x;
  frame.positionY = position.y;
  frame.positionZ = position.z;
}

void snap_pair_interaction_frame_constraints(PairInteractionSampleResult& result,
                                             const PairInteractionRequest& request,
                                             double epsilon) {
  for (MotionFrameRowF64& frame : result.frames) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, frame.pathKey);
    const auto match = std::find_if(
        constraints.begin(),
        constraints.end(),
        [&frame, epsilon](const PairInteractionPathConstraint& constraint) {
          return std::abs(constraint.time - frame.time) <= epsilon;
        });
    if (match != constraints.end()) {
      set_frame_position(frame, match->position);
    }
  }
}

void recompute_pair_interaction_frame_velocities(
    PairInteractionSampleResult& result,
    const PairInteractionRequest* request = nullptr,
    const std::vector<PairInteractionState>* initialStates = nullptr);

std::uint64_t seed_pair_interaction_frames_from_boundary_constraints(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double epsilon) {
  if (request.pathConstraints.empty() || result.frames.empty()) {
    return 0;
  }

  std::uint64_t seededCount = 0;
  for (const PairInteractionState& initialState : initialStates) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, initialState.pathKey);
    if (constraints.empty()) {
      continue;
    }
    const Vector3 firstTangent = initialState.initialVelocity;
    for (MotionFrameRowF64& frame : result.frames) {
      if (frame.pathKey != initialState.pathKey) {
        continue;
      }
      Vector3 boundaryPosition{};
      if (!pair_constraint_hermite_position_at_time(request,
                                                    initialStates,
                                                    constraints,
                                                    firstTangent,
                                                    frame.time,
                                                    epsilon,
                                                    boundaryPosition)) {
        continue;
      }
      set_frame_position(frame, boundaryPosition);
      ++seededCount;
    }
  }

  if (seededCount > 0) {
    snap_pair_interaction_frame_constraints(result, request, epsilon);
    recompute_pair_interaction_frame_velocities(result, &request, &initialStates);
  }
  return seededCount;
}

void recompute_pair_interaction_frame_velocities(
    PairInteractionSampleResult& result,
    const PairInteractionRequest* request,
    const std::vector<PairInteractionState>* initialStates) {
  std::vector<std::uint64_t> pathKeys;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(pathKeys.begin(), pathKeys.end(), frame.pathKey) == pathKeys.end()) {
      pathKeys.push_back(frame.pathKey);
    }
  }
  std::sort(pathKeys.begin(), pathKeys.end());

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 2) {
      continue;
    }
    for (std::size_t index = 0; index < indices.size(); ++index) {
      MotionFrameRowF64& current = result.frames[indices[index]];
      if (request != nullptr && initialStates != nullptr) {
        const std::vector<PairInteractionPathConstraint> constraints =
            pair_constraints_for_path(*request, pathKey);
        Vector3 retainedTangent{};
        if (pair_constraint_tangent_at_time(constraints,
                                            current.time,
                                            pair_constraint_time_epsilon(*request),
                                            *request,
                                            *initialStates,
                                            retainedTangent)) {
          current.velocityX = retainedTangent.x;
          current.velocityY = retainedTangent.y;
          current.velocityZ = retainedTangent.z;
          continue;
        }
      }
      if (index > 0 && index + 1 < indices.size()) {
        const MotionFrameRowF64& previous = result.frames[indices[index - 1]];
        const MotionFrameRowF64& next = result.frames[indices[index + 1]];
        const double leftDt = current.time - previous.time;
        const double rightDt = next.time - current.time;
        if (leftDt > 0.0 && rightDt > 0.0) {
          const double span = leftDt + rightDt;
          const double leftWeight = -rightDt / (leftDt * span);
          const double centerWeight = (rightDt - leftDt) / (leftDt * rightDt);
          const double rightWeight = leftDt / (rightDt * span);
          current.velocityX = leftWeight * previous.positionX +
              centerWeight * current.positionX +
              rightWeight * next.positionX;
          current.velocityY = leftWeight * previous.positionY +
              centerWeight * current.positionY +
              rightWeight * next.positionY;
          current.velocityZ = leftWeight * previous.positionZ +
              centerWeight * current.positionZ +
              rightWeight * next.positionZ;
          continue;
        }
      }

      const std::size_t previousIndex = indices[index == 0 ? 0 : index - 1];
      const std::size_t nextIndex = indices[index + 1 < indices.size() ? index + 1 : index];
      const MotionFrameRowF64& previous = result.frames[previousIndex];
      const MotionFrameRowF64& next = result.frames[nextIndex];
      const double span = next.time - previous.time;
      if (span > 0.0) {
        current.velocityX = (next.positionX - previous.positionX) / span;
        current.velocityY = (next.positionY - previous.positionY) / span;
        current.velocityZ = (next.positionZ - previous.positionZ) / span;
      }
    }
  }
}

void rebuild_pair_interaction_path_rows(PairInteractionSampleResult& result) {
  result.pathRows.clear();
  std::vector<std::uint64_t> pathKeys;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(pathKeys.begin(), pathKeys.end(), frame.pathKey) == pathKeys.end()) {
      pathKeys.push_back(frame.pathKey);
    }
  }
  std::sort(pathKeys.begin(), pathKeys.end());

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    for (std::size_t index = 0; index + 1 < indices.size(); ++index) {
      const MotionFrameRowF64& start = result.frames[indices[index]];
      const MotionFrameRowF64& end = result.frames[indices[index + 1]];
      if (end.time > start.time) {
        result.pathRows.push_back(
            make_pair_interaction_path_history_row(start, end, static_cast<std::uint64_t>(index)));
      }
    }
  }
}

struct PairInteractionBoundaryRelaxationResidualSummary {
  std::uint64_t sampleCount = 0;
  double maxResidual = 0.0;
  double meanResidual = 0.0;
  double rmsResidual = 0.0;
};

struct PairInteractionBoundaryRelaxationResidualVectorRows {
  std::vector<Vector3> residuals;
  std::vector<bool> hasResidual;
};

constexpr std::uint32_t kPairBoundaryRelaxationStatusAccepted = 1;
constexpr std::uint32_t kPairBoundaryRelaxationStatusRevertedNoImprovement = 2;
constexpr std::uint32_t kPairBoundaryRelaxationStatusNoRelaxableSamples = 3;
constexpr std::uint32_t kPairBoundaryRelaxationStatusConverged = 4;
constexpr std::uint32_t kPairBoundaryRelaxationStatusNotRequested = 5;
constexpr std::uint32_t kPairBoundaryRelaxationStatusStepConverged = 6;

constexpr std::uint32_t kPairBoundaryRelaxationStopReasonNotRequested = 1;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonNoRelaxableSamples = 2;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonNoUpdateCandidates = 3;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonLineSearchStalled = 4;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonToleranceReached = 5;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonIterationBudgetExhausted = 6;
constexpr std::uint32_t kPairBoundaryRelaxationStopReasonStepToleranceReached = 7;

constexpr std::uint32_t kPairBoundaryRelaxationCandidateNone = 0;
constexpr std::uint32_t kPairBoundaryRelaxationCandidatePredictor = 1;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateFirstCorrector = 2;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateSecondCorrector = 3;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateDefectCorrection = 4;
constexpr std::uint32_t kPairBoundaryRelaxationCandidatePredictedDefectCorrection = 5;
constexpr std::uint32_t kPairBoundaryRelaxationCandidatePredictedBlend = 6;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCorrectedDefectCorrection = 7;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCorrectedBlend = 8;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateLinearizedDefectCorrection = 9;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateLocalNewtonDefectCorrection = 10;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCoupledLocalNewtonDefectCorrection = 11;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateBlockCoupledNewtonDefectCorrection = 12;
constexpr std::uint32_t kPairBoundaryRelaxationCandidatePredictedBlockCoupledNewtonDefectCorrection = 13;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCorrectedBlockCoupledNewtonDefectCorrection = 14;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateSecondCorrectedDefectCorrection = 15;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateSecondCorrectedBlockCoupledNewtonDefectCorrection = 16;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateSecondCorrectedBlend = 17;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateThirdCorrector = 18;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateThirdCorrectedDefectCorrection = 19;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateThirdCorrectedBlockCoupledNewtonDefectCorrection = 20;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateThirdCorrectedBlend = 21;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCausalDelayNumericalNewtonDefectCorrection = 22;
constexpr std::uint32_t kPairBoundaryRelaxationCandidateCenterOfMassOffset = 100;

struct PairInteractionBoundaryRelaxationRun {
  std::uint64_t appliedIterationCount = 0;
  std::uint32_t stopReason = 0;
  double maxAcceptedStep = 0.0;
  double finalStepFactor = 0.0;
  std::uint32_t selectedCandidateKind = 0;
  std::uint32_t centerOfMassSelectedCount = 0;
  std::uint64_t candidateVariantCount = 0;
  std::uint64_t lineSearchTrialCount = 0;
  std::uint64_t candidateKindMask = 0;
};

struct PairInteractionRelaxationCandidate {
  std::vector<Vector3> positions;
  std::vector<bool> hasPosition;
  std::uint32_t kind = kPairBoundaryRelaxationCandidateNone;
};

struct PairInteractionRelaxationStepSelection {
  bool accepted = false;
  double maxStep = 0.0;
  double stepFactor = 0.0;
  std::uint32_t candidateKind = kPairBoundaryRelaxationCandidateNone;
  std::uint64_t candidateVariantCount = 0;
  std::uint64_t lineSearchTrialCount = 0;
  std::uint64_t candidateKindMask = 0;
  PairInteractionBoundaryRelaxationResidualSummary residual;
  std::vector<MotionFrameRowF64> frames;
};

std::uint64_t pair_boundary_relaxation_candidate_family_mask(std::uint32_t candidateKind) {
  if (candidateKind >= kPairBoundaryRelaxationCandidateCenterOfMassOffset) {
    candidateKind -= kPairBoundaryRelaxationCandidateCenterOfMassOffset;
  }
  if (candidateKind == kPairBoundaryRelaxationCandidateNone || candidateKind >= 64) {
    return 0;
  }
  return std::uint64_t{1} << candidateKind;
}

std::uint32_t pair_boundary_relaxation_status(
    const PairInteractionBoundaryRelaxationResidualSummary& before,
    const PairInteractionBoundaryRelaxationResidualSummary& after,
    const PairInteractionRequest& request,
    const PairInteractionBoundaryRelaxationRun& run) {
  if (!request.pathConstraints.empty() && request.boundaryRelaxationIterationCount == 0) {
    return kPairBoundaryRelaxationStatusNotRequested;
  }
  if (before.sampleCount == 0 || after.sampleCount == 0 ||
      !std::isfinite(before.maxResidual) || !std::isfinite(after.maxResidual) ||
      !std::isfinite(before.meanResidual) || !std::isfinite(after.meanResidual) ||
      !std::isfinite(before.rmsResidual) || !std::isfinite(after.rmsResidual)) {
    return kPairBoundaryRelaxationStatusNoRelaxableSamples;
  }
  const bool aggregateNonWorsening =
      after.maxResidual <= before.maxResidual + kPairBoundaryRelaxationResidualEpsilon &&
      after.meanResidual <= before.meanResidual + kPairBoundaryRelaxationResidualEpsilon &&
      after.rmsResidual <= before.rmsResidual + kPairBoundaryRelaxationResidualEpsilon;
  if (request.boundaryRelaxationTolerance > 0.0 &&
      aggregateNonWorsening &&
      after.maxResidual <= request.boundaryRelaxationTolerance) {
    return kPairBoundaryRelaxationStatusConverged;
  }
  if (aggregateNonWorsening && run.stopReason == kPairBoundaryRelaxationStopReasonStepToleranceReached) {
    return kPairBoundaryRelaxationStatusStepConverged;
  }
  return aggregateNonWorsening
      ? kPairBoundaryRelaxationStatusAccepted
      : kPairBoundaryRelaxationStatusRevertedNoImprovement;
}

PairInteractionBoundaryRelaxationResidualSummary measure_pair_interaction_boundary_relaxation_residuals(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  PairInteractionBoundaryRelaxationResidualSummary summary;
  if (request.pathConstraints.empty() || result.frames.empty()) {
    return summary;
  }

  std::vector<std::uint64_t> pathKeys;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(pathKeys.begin(), pathKeys.end(), frame.pathKey) == pathKeys.end()) {
      pathKeys.push_back(frame.pathKey);
    }
  }
  std::sort(pathKeys.begin(), pathKeys.end());

  const double epsilon = pair_constraint_time_epsilon(request);
  double residualSum = 0.0;
  double residualSquareSum = 0.0;
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
      if (has_pair_constraint_at_time(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
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
      Vector3 lawAcceleration{};
      if (!pair_interaction_acceleration_at_frame(result.frames,
                                                  current.frameIndex,
                                                  request,
                                                  initialStates,
                                                  current.pathKey,
                                                  lawAcceleration)) {
        continue;
      }
      const double residual = vector_norm(
          vector_subtract(finiteDifferenceAcceleration, lawAcceleration));
      if (!std::isfinite(residual)) {
        continue;
      }
      summary.maxResidual = std::max(summary.maxResidual, residual);
      residualSum += residual;
      residualSquareSum += residual * residual;
      ++summary.sampleCount;
    }
  }
  if (summary.sampleCount > 0) {
    summary.meanResidual = residualSum / static_cast<double>(summary.sampleCount);
    summary.rmsResidual = std::sqrt(residualSquareSum / static_cast<double>(summary.sampleCount));
  }

  return summary;
}

PairInteractionBoundaryRelaxationResidualVectorRows
measure_pair_interaction_boundary_relaxation_residual_vectors(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys) {
  PairInteractionBoundaryRelaxationResidualVectorRows rows{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
  };
  if (request.pathConstraints.empty() || result.frames.empty()) {
    return rows;
  }

  const double epsilon = pair_constraint_time_epsilon(request);
  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    for (std::size_t pathIndex = 1; pathIndex + 1 < indices.size(); ++pathIndex) {
      const std::size_t frameIndex = indices[pathIndex];
      const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
      const MotionFrameRowF64& current = result.frames[frameIndex];
      const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
      if (has_pair_constraint_at_time(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
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
      Vector3 lawAcceleration{};
      if (!pair_interaction_acceleration_at_frame(result.frames,
                                                  current.frameIndex,
                                                  request,
                                                  initialStates,
                                                  current.pathKey,
                                                  lawAcceleration)) {
        continue;
      }
      const Vector3 residual =
          vector_subtract(finiteDifferenceAcceleration, lawAcceleration);
      if (finite_vector(residual)) {
        rows.residuals[frameIndex] = residual;
        rows.hasResidual[frameIndex] = true;
      }
    }
  }
  return rows;
}

bool pair_interaction_boundary_relaxation_residual_vector_for_frames(
    const std::vector<MotionFrameRowF64>& frames,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const MotionFrameRowF64& previous,
    const MotionFrameRowF64& current,
    const MotionFrameRowF64& next,
    double epsilon,
    Vector3& outResidual) {
  const double leftDt = current.time - previous.time;
  const double rightDt = next.time - current.time;
  const double averageDt = 0.5 * (leftDt + rightDt);
  if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
    return false;
  }
  const Vector3 leftVelocity = vector_scale(
      vector_subtract(frame_position(current), frame_position(previous)),
      1.0 / leftDt);
  const Vector3 rightVelocity = vector_scale(
      vector_subtract(frame_position(next), frame_position(current)),
      1.0 / rightDt);
  const Vector3 finiteDifferenceAcceleration =
      vector_scale(vector_subtract(rightVelocity, leftVelocity), 1.0 / averageDt);
  Vector3 lawAcceleration{};
  if (!pair_interaction_acceleration_at_frame(frames,
                                              current.frameIndex,
                                              request,
                                              initialStates,
                                              current.pathKey,
                                              lawAcceleration)) {
    return false;
  }
  outResidual = vector_subtract(finiteDifferenceAcceleration, lawAcceleration);
  return finite_vector(outResidual);
}

std::vector<Vector3> solve_pair_interaction_relaxation_block(
    const std::vector<std::size_t>& indices,
    std::size_t blockStart,
    std::size_t blockEnd,
    const PairInteractionSampleResult& result,
    const std::vector<MotionFrameRowF64>& accelerationFrames,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<MotionFrameRowF64>* secondaryAccelerationFrames = nullptr,
    double secondaryAccelerationWeight = 0.0) {
  const std::size_t count = blockEnd - blockStart;
  if (count == 0) {
    return {};
  }
  std::vector<double> lower(count, 0.0);
  std::vector<double> diagonal(count, 0.0);
  std::vector<double> upper(count, 0.0);
  std::vector<double> rhsX(count, 0.0);
  std::vector<double> rhsY(count, 0.0);
  std::vector<double> rhsZ(count, 0.0);
  const double epsilon = pair_constraint_time_epsilon(request);
  for (std::size_t blockIndex = 0; blockIndex < count; ++blockIndex) {
    const std::size_t pathIndex = blockStart + blockIndex;
    const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
    const MotionFrameRowF64& current = result.frames[indices[pathIndex]];
    const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
    const double leftDt = current.time - previous.time;
    const double rightDt = next.time - current.time;
    if (leftDt <= epsilon || rightDt <= epsilon) {
      return {};
    }
    Vector3 acceleration{};
    if (!pair_interaction_acceleration_at_frame(accelerationFrames,
                                                current.frameIndex,
                                                request,
                                                initialStates,
                                                current.pathKey,
                                                acceleration)) {
      return {};
    }
    if (secondaryAccelerationFrames != nullptr) {
      Vector3 secondaryAcceleration{};
      if (!pair_interaction_acceleration_at_frame(*secondaryAccelerationFrames,
                                                  current.frameIndex,
                                                  request,
                                                  initialStates,
                                                  current.pathKey,
                                                  secondaryAcceleration)) {
        return {};
      }
      acceleration = blend_pair_interaction_acceleration(acceleration,
                                                         secondaryAcceleration,
                                                         secondaryAccelerationWeight);
    }
    const double leftCoefficient = 1.0 / leftDt;
    const double rightCoefficient = 1.0 / rightDt;
    diagonal[blockIndex] = leftCoefficient + rightCoefficient;
    const double accelerationScale = 0.5 * (leftDt + rightDt);
    rhsX[blockIndex] = -acceleration.x * accelerationScale;
    rhsY[blockIndex] = -acceleration.y * accelerationScale;
    rhsZ[blockIndex] = -acceleration.z * accelerationScale;
    if (blockIndex > 0) {
      lower[blockIndex] = -leftCoefficient;
    } else {
      rhsX[blockIndex] += previous.positionX * leftCoefficient;
      rhsY[blockIndex] += previous.positionY * leftCoefficient;
      rhsZ[blockIndex] += previous.positionZ * leftCoefficient;
    }
    if (blockIndex + 1 < count) {
      upper[blockIndex] = -rightCoefficient;
    } else {
      rhsX[blockIndex] += next.positionX * rightCoefficient;
      rhsY[blockIndex] += next.positionY * rightCoefficient;
      rhsZ[blockIndex] += next.positionZ * rightCoefficient;
    }
  }
  const std::vector<double> solvedX = solve_tridiagonal_system(lower, diagonal, upper, rhsX);
  const std::vector<double> solvedY = solve_tridiagonal_system(lower, diagonal, upper, rhsY);
  const std::vector<double> solvedZ = solve_tridiagonal_system(lower, diagonal, upper, rhsZ);
  if (solvedX.size() != count || solvedY.size() != count || solvedZ.size() != count) {
    return {};
  }
  std::vector<Vector3> solved;
  solved.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    const Vector3 position{solvedX[index], solvedY[index], solvedZ[index]};
    if (!finite_vector(position)) {
      return {};
    }
    solved.push_back(position);
  }
  return solved;
}

std::vector<Vector3> solve_pair_interaction_defect_correction_block(
    const std::vector<std::size_t>& indices,
    std::size_t blockStart,
    std::size_t blockEnd,
    const PairInteractionSampleResult& result,
    const std::vector<MotionFrameRowF64>& accelerationFrames,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  const std::size_t count = blockEnd - blockStart;
  if (count == 0) {
    return {};
  }
  std::vector<double> lower(count, 0.0);
  std::vector<double> diagonal(count, 0.0);
  std::vector<double> upper(count, 0.0);
  std::vector<double> rhsX(count, 0.0);
  std::vector<double> rhsY(count, 0.0);
  std::vector<double> rhsZ(count, 0.0);
  const double epsilon = pair_constraint_time_epsilon(request);
  for (std::size_t blockIndex = 0; blockIndex < count; ++blockIndex) {
    const std::size_t pathIndex = blockStart + blockIndex;
    const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
    const MotionFrameRowF64& current = result.frames[indices[pathIndex]];
    const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
    const double leftDt = current.time - previous.time;
    const double rightDt = next.time - current.time;
    const double averageDt = 0.5 * (leftDt + rightDt);
    if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
      return {};
    }
    Vector3 residual{};
    if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
            accelerationFrames,
            request,
            initialStates,
            previous,
            current,
            next,
            epsilon,
            residual)) {
      return {};
    }
    const double leftCoefficient = 1.0 / leftDt;
    const double rightCoefficient = 1.0 / rightDt;
    diagonal[blockIndex] = leftCoefficient + rightCoefficient;
    if (blockIndex > 0) {
      lower[blockIndex] = -leftCoefficient;
    }
    if (blockIndex + 1 < count) {
      upper[blockIndex] = -rightCoefficient;
    }
    rhsX[blockIndex] = residual.x * averageDt;
    rhsY[blockIndex] = residual.y * averageDt;
    rhsZ[blockIndex] = residual.z * averageDt;
  }
  const std::vector<double> solvedX = solve_tridiagonal_system(lower, diagonal, upper, rhsX);
  const std::vector<double> solvedY = solve_tridiagonal_system(lower, diagonal, upper, rhsY);
  const std::vector<double> solvedZ = solve_tridiagonal_system(lower, diagonal, upper, rhsZ);
  if (solvedX.size() != count || solvedY.size() != count || solvedZ.size() != count) {
    return {};
  }
  std::vector<Vector3> solved;
  solved.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    const MotionFrameRowF64& current = result.frames[indices[blockStart + index]];
    const Vector3 correctedPosition{
        current.positionX + solvedX[index],
        current.positionY + solvedY[index],
        current.positionZ + solvedZ[index],
    };
    if (!finite_vector(correctedPosition)) {
      return {};
    }
    solved.push_back(correctedPosition);
  }
  return solved;
}

bool has_pair_interaction_relaxation_candidate(
    const PairInteractionRelaxationCandidate& candidate) {
  return std::any_of(candidate.hasPosition.begin(),
                     candidate.hasPosition.end(),
                     [](bool hasPosition) {
                       return hasPosition;
                     });
}

std::uint32_t pair_interaction_center_of_mass_candidate_kind(std::uint32_t kind) {
  if (kind == kPairBoundaryRelaxationCandidateNone ||
      kind >= kPairBoundaryRelaxationCandidateCenterOfMassOffset) {
    return kPairBoundaryRelaxationCandidateNone;
  }
  return kind + kPairBoundaryRelaxationCandidateCenterOfMassOffset;
}

bool pair_interaction_candidate_is_center_of_mass_projected(std::uint32_t kind) {
  return kind >= kPairBoundaryRelaxationCandidateCenterOfMassOffset;
}

PairInteractionRelaxationCandidate solve_pair_interaction_relaxation_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const std::vector<MotionFrameRowF64>& accelerationFrames,
    const std::vector<MotionFrameRowF64>* secondaryAccelerationFrames = nullptr,
    double secondaryAccelerationWeight = 0.0) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
  };

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    std::size_t index = 1;
    while (index + 1 < indices.size()) {
      const MotionFrameRowF64& currentFrame = result.frames[indices[index]];
      if (has_pair_constraint_at_time(request, currentFrame.pathKey, currentFrame.time, epsilon)) {
        ++index;
        continue;
      }
      const std::size_t blockStart = index;
      while (index + 1 < indices.size()) {
        const MotionFrameRowF64& blockFrame = result.frames[indices[index]];
        if (has_pair_constraint_at_time(request, blockFrame.pathKey, blockFrame.time, epsilon)) {
          break;
        }
        ++index;
      }
      const std::size_t blockEnd = index;
      const std::vector<Vector3> solvedPositions =
          solve_pair_interaction_relaxation_block(
              indices,
              blockStart,
              blockEnd,
              result,
              accelerationFrames,
              request,
              initialStates,
              secondaryAccelerationFrames,
              secondaryAccelerationWeight);
      if (solvedPositions.size() != blockEnd - blockStart) {
        continue;
      }
      for (std::size_t solvedIndex = 0; solvedIndex < solvedPositions.size(); ++solvedIndex) {
        const std::size_t frameIndex = indices[blockStart + solvedIndex];
        candidate.positions[frameIndex] = solvedPositions[solvedIndex];
        candidate.hasPosition[frameIndex] = true;
      }
    }
  }

  return candidate;
}

PairInteractionRelaxationCandidate solve_pair_interaction_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const std::vector<MotionFrameRowF64>& accelerationFrames) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
  };

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    std::size_t index = 1;
    while (index + 1 < indices.size()) {
      const MotionFrameRowF64& currentFrame = result.frames[indices[index]];
      if (has_pair_constraint_at_time(request, currentFrame.pathKey, currentFrame.time, epsilon)) {
        ++index;
        continue;
      }
      const std::size_t blockStart = index;
      while (index + 1 < indices.size()) {
        const MotionFrameRowF64& blockFrame = result.frames[indices[index]];
        if (has_pair_constraint_at_time(request, blockFrame.pathKey, blockFrame.time, epsilon)) {
          break;
        }
        ++index;
      }
      const std::size_t blockEnd = index;
      const std::vector<Vector3> solvedPositions =
          solve_pair_interaction_defect_correction_block(
              indices,
              blockStart,
              blockEnd,
              result,
              accelerationFrames,
              request,
              initialStates);
      if (solvedPositions.size() != blockEnd - blockStart) {
        continue;
      }
      for (std::size_t solvedIndex = 0; solvedIndex < solvedPositions.size(); ++solvedIndex) {
        const std::size_t frameIndex = indices[blockStart + solvedIndex];
        candidate.positions[frameIndex] = solvedPositions[solvedIndex];
        candidate.hasPosition[frameIndex] = true;
      }
    }
  }

  return candidate;
}

bool apply_pair_interaction_relaxation_positions(
    PairInteractionSampleResult& result,
    const std::vector<Vector3>& nextPositions,
    const std::vector<bool>& hasNextPosition,
    double factor);

PairInteractionRelaxationCandidate solve_pair_interaction_linearized_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const PairInteractionRelaxationCandidate& defectCorrectionCandidate) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      kPairBoundaryRelaxationCandidateLinearizedDefectCorrection,
  };
  if (!has_pair_interaction_relaxation_candidate(defectCorrectionCandidate)) {
    return candidate;
  }

  const PairInteractionBoundaryRelaxationResidualVectorRows baselineResiduals =
      measure_pair_interaction_boundary_relaxation_residual_vectors(
          result,
          request,
          initialStates,
          pathKeys);
  if (!std::any_of(baselineResiduals.hasResidual.begin(),
                   baselineResiduals.hasResidual.end(),
                   [](bool hasResidual) {
                     return hasResidual;
                   })) {
    return candidate;
  }

  constexpr double probeFactor = 0.25;
  PairInteractionSampleResult probeResult = result;
  if (!apply_pair_interaction_relaxation_positions(probeResult,
                                                   defectCorrectionCandidate.positions,
                                                   defectCorrectionCandidate.hasPosition,
                                                   probeFactor)) {
    return candidate;
  }
  const PairInteractionBoundaryRelaxationResidualVectorRows probeResiduals =
      measure_pair_interaction_boundary_relaxation_residual_vectors(
          probeResult,
          request,
          initialStates,
          pathKeys);

  double numerator = 0.0;
  double denominator = 0.0;
  const std::size_t count = std::min(baselineResiduals.residuals.size(), probeResiduals.residuals.size());
  for (std::size_t index = 0; index < count; ++index) {
    if (index >= baselineResiduals.hasResidual.size() ||
        index >= probeResiduals.hasResidual.size() ||
        !baselineResiduals.hasResidual[index] ||
        !probeResiduals.hasResidual[index]) {
      continue;
    }
    const Vector3 derivative = vector_scale(
        vector_subtract(probeResiduals.residuals[index], baselineResiduals.residuals[index]),
        1.0 / probeFactor);
    if (!finite_vector(derivative)) {
      continue;
    }
    numerator += vector_dot(baselineResiduals.residuals[index], derivative);
    denominator += vector_dot(derivative, derivative);
  }
  if (!std::isfinite(numerator) ||
      !std::isfinite(denominator) ||
      denominator <= kPairBoundaryRelaxationResidualEpsilon) {
    return candidate;
  }

  const double targetScale = std::clamp(-numerator / denominator, 0.0, 2.0);
  if (!std::isfinite(targetScale) || targetScale <= kPairBoundaryRelaxationResidualEpsilon) {
    return candidate;
  }

  for (std::size_t index = 0; index < result.frames.size(); ++index) {
    if (index >= defectCorrectionCandidate.hasPosition.size() ||
        !defectCorrectionCandidate.hasPosition[index]) {
      continue;
    }
    const Vector3 current = frame_position(result.frames[index]);
    const Vector3 step = vector_subtract(defectCorrectionCandidate.positions[index], current);
    const Vector3 target{
        current.x + step.x * targetScale,
        current.y + step.y * targetScale,
        current.z + step.z * targetScale,
    };
    if (finite_vector(target) && vector_norm(vector_subtract(target, current)) > epsilon) {
      candidate.positions[index] = target;
      candidate.hasPosition[index] = true;
    }
  }

  return candidate;
}

PairInteractionRelaxationCandidate solve_pair_interaction_local_newton_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const PairInteractionRelaxationCandidate& defectCorrectionCandidate) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      kPairBoundaryRelaxationCandidateLocalNewtonDefectCorrection,
  };
  if (pair_interaction_uses_fixed_signal_speed(request)) {
    return candidate;
  }

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    for (std::size_t pathIndex = 1; pathIndex + 1 < indices.size(); ++pathIndex) {
      const std::size_t frameIndex = indices[pathIndex];
      const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
      const MotionFrameRowF64& current = result.frames[frameIndex];
      const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
      if (has_pair_constraint_at_time(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      Vector3 residual{};
      if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
              result.frames,
              request,
              initialStates,
              previous,
              current,
              next,
              epsilon,
              residual)) {
        continue;
      }
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const std::vector<PairInteractionState> states =
          states_at_frame_index(result.frames, current.frameIndex, initialStates);
      if (states.size() != initialStates.size()) {
        continue;
      }
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
      const double finiteDifferenceDerivative =
          -(1.0 / leftDt + 1.0 / rightDt) / averageDt;
      Vector3 step{};
      for (std::size_t component = 0; component < 3; ++component) {
        const double accelerationDerivative =
            pair_interaction_law_self_derivative_component(
                request,
                states,
                stateIndex,
                component);
        const double residualDerivative = finiteDifferenceDerivative - accelerationDerivative;
        if (!std::isfinite(residualDerivative) ||
            std::abs(residualDerivative) <= kPairBoundaryRelaxationResidualEpsilon) {
          continue;
        }
        const double componentStep = -vector_component(residual, component) / residualDerivative;
        if (std::isfinite(componentStep)) {
          set_vector_component(step, component, componentStep);
        }
      }
      double stepNorm = vector_norm(step);
      if (!std::isfinite(stepNorm) || stepNorm <= epsilon) {
        continue;
      }
      double defectStep = 0.0;
      if (frameIndex < defectCorrectionCandidate.hasPosition.size() &&
          defectCorrectionCandidate.hasPosition[frameIndex]) {
        defectStep = vector_norm(
            vector_subtract(defectCorrectionCandidate.positions[frameIndex], frame_position(current)));
      }
      const double leftSpacing =
          vector_norm(vector_subtract(frame_position(current), frame_position(previous)));
      const double rightSpacing =
          vector_norm(vector_subtract(frame_position(next), frame_position(current)));
      if (!std::isfinite(leftSpacing) || !std::isfinite(rightSpacing)) {
        continue;
      }
      const double spacingLimit = std::max(epsilon, std::min(leftSpacing, rightSpacing) * 0.5);
      const double defectLimit =
          std::isfinite(defectStep) && defectStep > epsilon ? defectStep * 2.0 : spacingLimit;
      const double maxStep = std::max(epsilon, std::min(spacingLimit, defectLimit));
      if (stepNorm > maxStep) {
        const double scale = maxStep / stepNorm;
        step = vector_scale(step, scale);
        stepNorm = maxStep;
      }
      const Vector3 currentPosition = frame_position(current);
      const Vector3 target{
          currentPosition.x + step.x,
          currentPosition.y + step.y,
          currentPosition.z + step.z,
      };
      if (stepNorm > epsilon && finite_vector(target)) {
        candidate.positions[frameIndex] = target;
        candidate.hasPosition[frameIndex] = true;
      }
    }
  }

  return candidate;
}

PairInteractionRelaxationCandidate solve_pair_interaction_coupled_local_newton_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double epsilon,
    const PairInteractionRelaxationCandidate& defectCorrectionCandidate) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      kPairBoundaryRelaxationCandidateCoupledLocalNewtonDefectCorrection,
  };
  if (pair_interaction_uses_fixed_signal_speed(request)) {
    return candidate;
  }
  if (initialStates.size() < 2) {
    return candidate;
  }

  struct StepMetadata {
    std::size_t frameIndex = 0;
    MotionFrameRowF64 current{};
    double maxStep = 0.0;
  };

  std::vector<std::uint64_t> frameIndices;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(frameIndices.begin(), frameIndices.end(), frame.frameIndex) ==
        frameIndices.end()) {
      frameIndices.push_back(frame.frameIndex);
    }
  }
  std::sort(frameIndices.begin(), frameIndices.end());

  for (std::uint64_t sharedFrameIndex : frameIndices) {
    std::vector<std::size_t> groupIndices;
    for (std::size_t index = 0; index < result.frames.size(); ++index) {
      if (result.frames[index].frameIndex == sharedFrameIndex) {
        groupIndices.push_back(index);
      }
    }
    if (groupIndices.size() != initialStates.size()) {
      continue;
    }
    bool hasConstrainedFrame = false;
    for (std::size_t index : groupIndices) {
      const MotionFrameRowF64& frame = result.frames[index];
      hasConstrainedFrame = hasConstrainedFrame ||
          has_pair_constraint_at_time(request, frame.pathKey, frame.time, epsilon);
    }
    if (hasConstrainedFrame) {
      continue;
    }

    const std::vector<PairInteractionState> states =
        states_at_frame_index(result.frames, sharedFrameIndex, initialStates);
    if (states.size() != initialStates.size()) {
      continue;
    }
    std::vector<std::size_t> orderedIndices;
    bool validGroup = true;
    for (const PairInteractionState& state : states) {
      const auto match = std::find_if(
          groupIndices.begin(),
          groupIndices.end(),
          [&result, &state](std::size_t index) {
            return result.frames[index].pathKey == state.pathKey;
          });
      if (match == groupIndices.end()) {
        validGroup = false;
        break;
      }
      orderedIndices.push_back(*match);
    }
    if (!validGroup) {
      continue;
    }

    const std::size_t componentCount = 3;
    const std::size_t dimension = orderedIndices.size() * componentCount;
    std::vector<std::vector<double>> matrix(dimension, std::vector<double>(dimension, 0.0));
    std::vector<double> rhs(dimension, 0.0);
    std::vector<StepMetadata> stepMetadata;
    stepMetadata.reserve(orderedIndices.size());

    for (std::size_t stateIndex = 0; stateIndex < orderedIndices.size(); ++stateIndex) {
      const std::size_t globalFrameIndex = orderedIndices[stateIndex];
      const MotionFrameRowF64& current = result.frames[globalFrameIndex];
      const std::vector<std::size_t> pathIndices =
          mutable_frame_indices_for_path(result.frames, current.pathKey);
      const auto pathIndexMatch =
          std::find(pathIndices.begin(), pathIndices.end(), globalFrameIndex);
      if (pathIndexMatch == pathIndices.end() ||
          pathIndexMatch == pathIndices.begin() ||
          std::next(pathIndexMatch) == pathIndices.end()) {
        validGroup = false;
        break;
      }
      const std::size_t pathIndex = static_cast<std::size_t>(
          std::distance(pathIndices.begin(), pathIndexMatch));
      const MotionFrameRowF64& previous = result.frames[pathIndices[pathIndex - 1]];
      const MotionFrameRowF64& next = result.frames[pathIndices[pathIndex + 1]];
      Vector3 residual{};
      if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
              result.frames,
              request,
              initialStates,
              previous,
              current,
              next,
              epsilon,
              residual)) {
        validGroup = false;
        break;
      }
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        validGroup = false;
        break;
      }
      const double finiteDifferenceDerivative =
          -(1.0 / leftDt + 1.0 / rightDt) / averageDt;

      for (std::size_t accelerationComponent = 0; accelerationComponent < componentCount;
           ++accelerationComponent) {
        const std::size_t row = stateIndex * componentCount + accelerationComponent;
        rhs[row] = -vector_component(residual, accelerationComponent);
        for (std::size_t positionStateIndex = 0; positionStateIndex < orderedIndices.size();
             ++positionStateIndex) {
          for (std::size_t positionComponent = 0; positionComponent < componentCount;
               ++positionComponent) {
            const std::size_t column = positionStateIndex * componentCount + positionComponent;
            const double accelerationDerivative =
                pair_interaction_law_position_derivative_component(
                    request,
                    states,
                    stateIndex,
                    positionStateIndex,
                    accelerationComponent,
                    positionComponent);
            if (!std::isfinite(accelerationDerivative)) {
              validGroup = false;
              break;
            }
            matrix[row][column] =
                (stateIndex == positionStateIndex && accelerationComponent == positionComponent
                     ? finiteDifferenceDerivative
                     : 0.0) -
                accelerationDerivative;
          }
          if (!validGroup) {
            break;
          }
        }
        if (!validGroup) {
          break;
        }
      }
      if (!validGroup) {
        break;
      }

      double defectStep = 0.0;
      if (globalFrameIndex < defectCorrectionCandidate.hasPosition.size() &&
          defectCorrectionCandidate.hasPosition[globalFrameIndex]) {
        defectStep = vector_norm(
            vector_subtract(defectCorrectionCandidate.positions[globalFrameIndex],
                            frame_position(current)));
      }
      const double leftSpacing =
          vector_norm(vector_subtract(frame_position(current), frame_position(previous)));
      const double rightSpacing =
          vector_norm(vector_subtract(frame_position(next), frame_position(current)));
      if (!std::isfinite(leftSpacing) || !std::isfinite(rightSpacing)) {
        validGroup = false;
        break;
      }
      const double spacingLimit = std::max(epsilon, std::min(leftSpacing, rightSpacing) * 0.5);
      const double defectLimit =
          std::isfinite(defectStep) && defectStep > epsilon ? defectStep * 2.0 : spacingLimit;
      stepMetadata.push_back(
          StepMetadata{
              globalFrameIndex,
              current,
              std::max(epsilon, std::min(spacingLimit, defectLimit)),
          });
    }
    if (!validGroup || stepMetadata.size() != orderedIndices.size()) {
      continue;
    }

    const std::vector<double> solution =
        solve_dense_linear_system(matrix, rhs, kPairBoundaryRelaxationResidualEpsilon);
    if (solution.size() != dimension) {
      continue;
    }

    double stepScale = 1.0;
    bool hasNonzeroStep = false;
    for (std::size_t stateIndex = 0; stateIndex < stepMetadata.size(); ++stateIndex) {
      const std::size_t offset = stateIndex * componentCount;
      const Vector3 step{solution[offset], solution[offset + 1], solution[offset + 2]};
      const double stepNorm = vector_norm(step);
      if (!std::isfinite(stepNorm)) {
        validGroup = false;
        break;
      }
      if (stepNorm > epsilon) {
        hasNonzeroStep = true;
        stepScale = std::min(stepScale, stepMetadata[stateIndex].maxStep / stepNorm);
      }
    }
    if (!validGroup || !hasNonzeroStep || !std::isfinite(stepScale) || stepScale <= 0.0) {
      continue;
    }

    for (std::size_t stateIndex = 0; stateIndex < stepMetadata.size(); ++stateIndex) {
      const std::size_t offset = stateIndex * componentCount;
      const StepMetadata& metadata = stepMetadata[stateIndex];
      const Vector3 current = frame_position(metadata.current);
      const Vector3 target{
          current.x + solution[offset] * stepScale,
          current.y + solution[offset + 1] * stepScale,
          current.z + solution[offset + 2] * stepScale,
      };
      if (finite_vector(target) && vector_norm(vector_subtract(target, current)) > epsilon) {
        candidate.positions[metadata.frameIndex] = target;
        candidate.hasPosition[metadata.frameIndex] = true;
      }
    }
  }

  return candidate;
}

PairInteractionRelaxationCandidate solve_pair_interaction_causal_delay_numerical_newton_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const PairInteractionRelaxationCandidate& defectCorrectionCandidate) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      kPairBoundaryRelaxationCandidateCausalDelayNumericalNewtonDefectCorrection,
  };
  if (!pair_interaction_uses_fixed_signal_speed(request)) {
    return candidate;
  }

  constexpr std::size_t componentCount = 3;
  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    for (std::size_t pathIndex = 1; pathIndex + 1 < indices.size(); ++pathIndex) {
      const std::size_t frameIndex = indices[pathIndex];
      const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
      const MotionFrameRowF64& current = result.frames[frameIndex];
      const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
      if (has_pair_constraint_at_time(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      Vector3 residual{};
      if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
              result.frames,
              request,
              initialStates,
              previous,
              current,
              next,
              epsilon,
              residual)) {
        continue;
      }

      const double leftSpacing =
          vector_norm(vector_subtract(frame_position(current), frame_position(previous)));
      const double rightSpacing =
          vector_norm(vector_subtract(frame_position(next), frame_position(current)));
      if (!std::isfinite(leftSpacing) || !std::isfinite(rightSpacing)) {
        continue;
      }
      const double spacingLimit = std::max(epsilon, std::min(leftSpacing, rightSpacing) * 0.5);
      double defectStep = 0.0;
      if (frameIndex < defectCorrectionCandidate.hasPosition.size() &&
          defectCorrectionCandidate.hasPosition[frameIndex]) {
        defectStep = vector_norm(
            vector_subtract(defectCorrectionCandidate.positions[frameIndex],
                            frame_position(current)));
      }
      const double defectLimit =
          std::isfinite(defectStep) && defectStep > epsilon ? defectStep * 2.0 : spacingLimit;
      const double maxStep = std::max(epsilon, std::min(spacingLimit, defectLimit));
      const Vector3 currentPosition = frame_position(current);
      const double probeStep = std::max(
          std::max(epsilon * 1000.0, 1e-6),
          std::max(std::min(leftSpacing, rightSpacing) * 1e-4,
                   vector_norm(currentPosition) * 1e-9));
      if (!std::isfinite(probeStep) || probeStep <= 0.0) {
        continue;
      }

      std::vector<std::vector<double>> matrix(
          componentCount,
          std::vector<double>(componentCount, 0.0));
      bool matrixComplete = true;
      for (std::size_t column = 0; column < componentCount; ++column) {
        std::vector<MotionFrameRowF64> probeFrames = result.frames;
        Vector3 probePosition = frame_position(probeFrames[frameIndex]);
        set_vector_component(probePosition,
                             column,
                             vector_component(probePosition, column) + probeStep);
        set_frame_position(probeFrames[frameIndex], probePosition);
        Vector3 probeResidual{};
        if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
                probeFrames,
                request,
                initialStates,
                probeFrames[indices[pathIndex - 1]],
                probeFrames[frameIndex],
                probeFrames[indices[pathIndex + 1]],
                epsilon,
                probeResidual)) {
          matrixComplete = false;
          break;
        }
        for (std::size_t row = 0; row < componentCount; ++row) {
          matrix[row][column] =
              (vector_component(probeResidual, row) - vector_component(residual, row)) /
              probeStep;
        }
      }
      if (!matrixComplete) {
        continue;
      }

      const std::vector<double> solution = solve_dense_linear_system(
          matrix,
          std::vector<double>{-residual.x, -residual.y, -residual.z},
          kPairBoundaryRelaxationResidualEpsilon);
      if (solution.size() != componentCount) {
        continue;
      }
      Vector3 step{solution[0], solution[1], solution[2]};
      double stepNorm = vector_norm(step);
      if (!std::isfinite(stepNorm) || stepNorm <= epsilon) {
        continue;
      }
      if (stepNorm > maxStep) {
        const double scale = maxStep / stepNorm;
        step = vector_scale(step, scale);
        stepNorm = maxStep;
      }
      const Vector3 target{
          currentPosition.x + step.x,
          currentPosition.y + step.y,
          currentPosition.z + step.z,
      };
      if (stepNorm > epsilon && finite_vector(target)) {
        candidate.positions[frameIndex] = target;
        candidate.hasPosition[frameIndex] = true;
      }
    }
  }

  return candidate;
}

std::vector<double> pair_interaction_constraint_boundary_times(
    const PairInteractionRequest& request,
    double epsilon) {
  std::vector<double> times;
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (std::isfinite(constraint.time)) {
      times.push_back(constraint.time);
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

int pair_interaction_relaxation_block_index_for_time(
    const std::vector<double>& boundaryTimes,
    double time,
    double epsilon) {
  if (!std::isfinite(time)) {
    return -1;
  }
  if (boundaryTimes.size() < 2) {
    return 0;
  }
  for (std::size_t index = 0; index + 1 < boundaryTimes.size(); ++index) {
    if (time > boundaryTimes[index] + epsilon && time < boundaryTimes[index + 1] - epsilon) {
      return static_cast<int>(index);
    }
  }
  return -1;
}

PairInteractionRelaxationCandidate solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const std::vector<std::uint64_t>& pathKeys,
    double epsilon,
    const PairInteractionRelaxationCandidate& defectCorrectionCandidate) {
  PairInteractionRelaxationCandidate candidate{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      kPairBoundaryRelaxationCandidateBlockCoupledNewtonDefectCorrection,
  };
  if (pair_interaction_uses_fixed_signal_speed(request)) {
    return candidate;
  }
  if (initialStates.size() < 2) {
    return candidate;
  }

  struct BlockEntry {
    std::size_t frameIndex = 0;
    std::size_t previousFrameIndex = 0;
    std::size_t nextFrameIndex = 0;
    MotionFrameRowF64 current{};
    MotionFrameRowF64 previous{};
    MotionFrameRowF64 next{};
    double leftDt = 0.0;
    double rightDt = 0.0;
    double averageDt = 0.0;
  };

  struct StepMetadata {
    std::size_t frameIndex = 0;
    MotionFrameRowF64 current{};
    double maxStep = 0.0;
  };

  const std::vector<double> boundaryTimes =
      pair_interaction_constraint_boundary_times(request, epsilon);
  const std::size_t blockCount = boundaryTimes.size() >= 2 ? boundaryTimes.size() - 1 : 1;
  std::vector<std::vector<BlockEntry>> blocks(blockCount);

  for (std::uint64_t pathKey : pathKeys) {
    const std::vector<std::size_t> indices = mutable_frame_indices_for_path(result.frames, pathKey);
    if (indices.size() < 3) {
      continue;
    }
    for (std::size_t pathIndex = 1; pathIndex + 1 < indices.size(); ++pathIndex) {
      const MotionFrameRowF64& previous = result.frames[indices[pathIndex - 1]];
      const MotionFrameRowF64& current = result.frames[indices[pathIndex]];
      const MotionFrameRowF64& next = result.frames[indices[pathIndex + 1]];
      if (has_pair_constraint_at_time(request, current.pathKey, current.time, epsilon)) {
        continue;
      }
      const double leftDt = current.time - previous.time;
      const double rightDt = next.time - current.time;
      const double averageDt = 0.5 * (leftDt + rightDt);
      if (leftDt <= epsilon || rightDt <= epsilon || averageDt <= epsilon) {
        continue;
      }
      const int blockIndex =
          pair_interaction_relaxation_block_index_for_time(boundaryTimes, current.time, epsilon);
      if (blockIndex < 0 || static_cast<std::size_t>(blockIndex) >= blocks.size()) {
        continue;
      }
      blocks[static_cast<std::size_t>(blockIndex)].push_back(
          BlockEntry{
              indices[pathIndex],
              indices[pathIndex - 1],
              indices[pathIndex + 1],
              current,
              previous,
              next,
              leftDt,
              rightDt,
              averageDt,
          });
    }
  }

  const std::size_t missing = std::numeric_limits<std::size_t>::max();
  for (const std::vector<BlockEntry>& block : blocks) {
    if (block.empty()) {
      continue;
    }
    auto variableIndexForFrame = [&block](std::size_t frameIndex) -> std::size_t {
      for (std::size_t index = 0; index < block.size(); ++index) {
        if (block[index].frameIndex == frameIndex) {
          return index;
        }
      }
      return missing;
    };
    auto variableIndexForFrameAndPath =
        [&block](std::uint64_t frameIndex, std::uint64_t pathKey) -> std::size_t {
      for (std::size_t index = 0; index < block.size(); ++index) {
        if (block[index].current.frameIndex == frameIndex &&
            block[index].current.pathKey == pathKey) {
          return index;
        }
      }
      return missing;
    };

    constexpr std::size_t componentCount = 3;
    const std::size_t dimension = block.size() * componentCount;
    std::vector<std::vector<double>> matrix(dimension, std::vector<double>(dimension, 0.0));
    std::vector<double> rhs(dimension, 0.0);
    std::vector<StepMetadata> stepMetadata;
    stepMetadata.reserve(block.size());
    bool validBlock = true;

    for (std::size_t variableIndex = 0; variableIndex < block.size(); ++variableIndex) {
      const BlockEntry& entry = block[variableIndex];
      Vector3 residual{};
      if (!pair_interaction_boundary_relaxation_residual_vector_for_frames(
              result.frames,
              request,
              initialStates,
              entry.previous,
              entry.current,
              entry.next,
              epsilon,
              residual)) {
        validBlock = false;
        break;
      }
      const std::vector<PairInteractionState> states =
          states_at_frame_index(result.frames, entry.current.frameIndex, initialStates);
      if (states.size() != initialStates.size()) {
        validBlock = false;
        break;
      }
      const auto stateMatch = std::find_if(
          states.begin(),
          states.end(),
          [&entry](const PairInteractionState& state) {
            return state.pathKey == entry.current.pathKey;
          });
      if (stateMatch == states.end()) {
        validBlock = false;
        break;
      }
      const std::size_t accelerationStateIndex = static_cast<std::size_t>(
          std::distance(states.begin(), stateMatch));
      const double finiteDifferenceDerivative =
          -(1.0 / entry.leftDt + 1.0 / entry.rightDt) / entry.averageDt;
      const std::size_t rowOffset = variableIndex * componentCount;
      const std::size_t previousVariableIndex = variableIndexForFrame(entry.previousFrameIndex);
      const std::size_t nextVariableIndex = variableIndexForFrame(entry.nextFrameIndex);

      for (std::size_t accelerationComponent = 0; accelerationComponent < componentCount;
           ++accelerationComponent) {
        const std::size_t row = rowOffset + accelerationComponent;
        rhs[row] = -vector_component(residual, accelerationComponent);
        matrix[row][row] += finiteDifferenceDerivative;
        if (previousVariableIndex != missing) {
          matrix[row][previousVariableIndex * componentCount + accelerationComponent] +=
              1.0 / (entry.leftDt * entry.averageDt);
        }
        if (nextVariableIndex != missing) {
          matrix[row][nextVariableIndex * componentCount + accelerationComponent] +=
              1.0 / (entry.rightDt * entry.averageDt);
        }

        for (std::size_t positionStateIndex = 0; positionStateIndex < states.size();
             ++positionStateIndex) {
          const std::size_t positionVariableIndex =
              variableIndexForFrameAndPath(entry.current.frameIndex,
                                           states[positionStateIndex].pathKey);
          if (positionVariableIndex == missing) {
            continue;
          }
          for (std::size_t positionComponent = 0; positionComponent < componentCount;
               ++positionComponent) {
            const double accelerationDerivative =
                pair_interaction_law_position_derivative_component(
                    request,
                    states,
                    accelerationStateIndex,
                    positionStateIndex,
                    accelerationComponent,
                    positionComponent);
            if (!std::isfinite(accelerationDerivative)) {
              validBlock = false;
              break;
            }
            matrix[row][positionVariableIndex * componentCount + positionComponent] -=
                accelerationDerivative;
          }
          if (!validBlock) {
            break;
          }
        }
        if (!validBlock) {
          break;
        }
      }
      if (!validBlock) {
        break;
      }

      double defectStep = 0.0;
      if (entry.frameIndex < defectCorrectionCandidate.hasPosition.size() &&
          defectCorrectionCandidate.hasPosition[entry.frameIndex]) {
        defectStep = vector_norm(
            vector_subtract(defectCorrectionCandidate.positions[entry.frameIndex],
                            frame_position(entry.current)));
      }
      const double leftSpacing =
          vector_norm(vector_subtract(frame_position(entry.current), frame_position(entry.previous)));
      const double rightSpacing =
          vector_norm(vector_subtract(frame_position(entry.next), frame_position(entry.current)));
      if (!std::isfinite(leftSpacing) || !std::isfinite(rightSpacing)) {
        validBlock = false;
        break;
      }
      const double spacingLimit = std::max(epsilon, std::min(leftSpacing, rightSpacing) * 0.5);
      const double defectLimit =
          std::isfinite(defectStep) && defectStep > epsilon ? defectStep * 2.0 : spacingLimit;
      stepMetadata.push_back(
          StepMetadata{
              entry.frameIndex,
              entry.current,
              std::max(epsilon, std::min(spacingLimit, defectLimit)),
          });
    }
    if (!validBlock || stepMetadata.size() != block.size()) {
      continue;
    }

    const std::vector<double> solution =
        solve_dense_linear_system(matrix, rhs, kPairBoundaryRelaxationResidualEpsilon);
    if (solution.size() != dimension) {
      continue;
    }

    double stepScale = 1.0;
    bool hasNonzeroStep = false;
    for (std::size_t variableIndex = 0; variableIndex < stepMetadata.size(); ++variableIndex) {
      const std::size_t offset = variableIndex * componentCount;
      const Vector3 step{solution[offset], solution[offset + 1], solution[offset + 2]};
      const double stepNorm = vector_norm(step);
      if (!std::isfinite(stepNorm)) {
        validBlock = false;
        break;
      }
      if (stepNorm > epsilon) {
        hasNonzeroStep = true;
        stepScale = std::min(stepScale, stepMetadata[variableIndex].maxStep / stepNorm);
      }
    }
    if (!validBlock || !hasNonzeroStep || !std::isfinite(stepScale) || stepScale <= 0.0) {
      continue;
    }

    for (std::size_t variableIndex = 0; variableIndex < stepMetadata.size(); ++variableIndex) {
      const std::size_t offset = variableIndex * componentCount;
      const StepMetadata& metadata = stepMetadata[variableIndex];
      const Vector3 current = frame_position(metadata.current);
      const Vector3 target{
          current.x + solution[offset] * stepScale,
          current.y + solution[offset + 1] * stepScale,
          current.z + solution[offset + 2] * stepScale,
      };
      if (finite_vector(target) && vector_norm(vector_subtract(target, current)) > epsilon) {
        candidate.positions[metadata.frameIndex] = target;
        candidate.hasPosition[metadata.frameIndex] = true;
      }
    }
  }

  return candidate;
}

bool pair_constraint_center_of_mass_at_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double time,
    double epsilon,
    Vector3& outCenterOfMass) {
  Vector3 weighted{};
  double totalMass = 0.0;
  for (const PairInteractionState& state : initialStates) {
    const std::vector<PairInteractionPathConstraint> constraints =
        pair_constraints_for_path(request, state.pathKey);
    Vector3 position{};
    if (!pair_constraint_hermite_position_at_time(request,
                                                  initialStates,
                                                  constraints,
                                                  state.initialVelocity,
                                                  time,
                                                  epsilon,
                                                  position) ||
        !std::isfinite(state.mass) || state.mass <= 0.0) {
      return false;
    }
    weighted.x += position.x * state.mass;
    weighted.y += position.y * state.mass;
    weighted.z += position.z * state.mass;
    totalMass += state.mass;
  }
  if (totalMass <= 0.0) {
    return false;
  }
  outCenterOfMass = vector_scale(weighted, 1.0 / totalMass);
  return finite_vector(outCenterOfMass);
}

std::vector<std::pair<double, Vector3>> pair_constraint_center_of_mass_knots(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double epsilon) {
  std::vector<double> times;
  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    if (std::isfinite(constraint.time)) {
      times.push_back(constraint.time);
    }
  }
  std::sort(times.begin(), times.end());
  times.erase(std::unique(times.begin(),
                          times.end(),
                          [epsilon](double left, double right) {
                            return std::abs(left - right) <= epsilon;
                          }),
              times.end());
  std::vector<std::pair<double, Vector3>> knots;
  for (double time : times) {
    Vector3 centerOfMass{};
    if (pair_constraint_center_of_mass_at_time(
            request,
            initialStates,
            time,
            epsilon,
            centerOfMass)) {
      knots.push_back({time, centerOfMass});
    }
  }
  return knots;
}

bool pair_constraint_center_of_mass_target_at_time(
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    double time,
    double epsilon,
    Vector3& outCenterOfMass) {
  const std::vector<std::pair<double, Vector3>> knots =
      pair_constraint_center_of_mass_knots(request, initialStates, epsilon);
  if (knots.size() < 2) {
    return false;
  }
  const auto exact = std::find_if(knots.begin(), knots.end(), [time, epsilon](const auto& knot) {
    return std::abs(knot.first - time) <= epsilon;
  });
  if (exact != knots.end()) {
    outCenterOfMass = exact->second;
    return true;
  }
  const auto right = std::find_if(knots.begin(), knots.end(), [time](const auto& knot) {
    return knot.first >= time;
  });
  if (right == knots.begin() || right == knots.end()) {
    return false;
  }
  const auto left = std::prev(right);
  const double span = right->first - left->first;
  if (span <= epsilon) {
    return false;
  }
  const double amount = std::clamp((time - left->first) / span, 0.0, 1.0);
  outCenterOfMass = Vector3{
      left->second.x + (right->second.x - left->second.x) * amount,
      left->second.y + (right->second.y - left->second.y) * amount,
      left->second.z + (right->second.z - left->second.z) * amount,
  };
  return finite_vector(outCenterOfMass);
}

PairInteractionRelaxationCandidate project_pair_interaction_candidate_to_constraint_center_of_mass(
    const PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const PairInteractionRelaxationCandidate& candidate,
    double epsilon) {
  PairInteractionRelaxationCandidate projected{
      std::vector<Vector3>(result.frames.size()),
      std::vector<bool>(result.frames.size(), false),
      pair_interaction_center_of_mass_candidate_kind(candidate.kind),
  };
  if (!has_pair_interaction_relaxation_candidate(candidate)) {
    return projected;
  }

  std::vector<std::uint64_t> frameIndices;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(frameIndices.begin(), frameIndices.end(), frame.frameIndex) ==
        frameIndices.end()) {
      frameIndices.push_back(frame.frameIndex);
    }
  }
  std::sort(frameIndices.begin(), frameIndices.end());

  for (std::uint64_t frameIndex : frameIndices) {
    std::vector<std::size_t> indices;
    for (std::size_t index = 0; index < result.frames.size(); ++index) {
      if (result.frames[index].frameIndex == frameIndex) {
        indices.push_back(index);
      }
    }
    if (indices.size() != initialStates.size()) {
      continue;
    }
    const double time = result.frames[indices.front()].time;
    if (!std::isfinite(time)) {
      continue;
    }
    bool anyCandidateUpdate = false;
    bool anyConstrained = false;
    for (std::size_t index : indices) {
      const MotionFrameRowF64& frame = result.frames[index];
      anyCandidateUpdate = anyCandidateUpdate ||
          (index < candidate.hasPosition.size() && candidate.hasPosition[index]);
      anyConstrained = anyConstrained ||
          has_pair_constraint_at_time(request, frame.pathKey, frame.time, epsilon);
    }
    if (!anyCandidateUpdate || anyConstrained) {
      continue;
    }
    Vector3 targetCenterOfMass{};
    if (!pair_constraint_center_of_mass_target_at_time(
            request,
            initialStates,
            time,
            epsilon,
            targetCenterOfMass)) {
      continue;
    }
    Vector3 weighted{};
    double totalMass = 0.0;
    std::vector<Vector3> candidatePositions(indices.size());
    bool validGroup = true;
    for (std::size_t localIndex = 0; localIndex < indices.size(); ++localIndex) {
      const std::size_t index = indices[localIndex];
      const MotionFrameRowF64& frame = result.frames[index];
      const auto stateMatch = std::find_if(initialStates.begin(),
                                           initialStates.end(),
                                           [&frame](const PairInteractionState& state) {
                                             return state.pathKey == frame.pathKey;
                                           });
      if (stateMatch == initialStates.end() ||
          !std::isfinite(stateMatch->mass) ||
          stateMatch->mass <= 0.0) {
        validGroup = false;
        break;
      }
      const Vector3 position =
          index < candidate.hasPosition.size() && candidate.hasPosition[index]
              ? candidate.positions[index]
              : frame_position(frame);
      if (!finite_vector(position)) {
        validGroup = false;
        break;
      }
      candidatePositions[localIndex] = position;
      weighted.x += position.x * stateMatch->mass;
      weighted.y += position.y * stateMatch->mass;
      weighted.z += position.z * stateMatch->mass;
      totalMass += stateMatch->mass;
    }
    if (!validGroup || totalMass <= 0.0) {
      continue;
    }
    const Vector3 candidateCenterOfMass = vector_scale(weighted, 1.0 / totalMass);
    const Vector3 shift = vector_subtract(targetCenterOfMass, candidateCenterOfMass);
    for (std::size_t localIndex = 0; localIndex < indices.size(); ++localIndex) {
      const std::size_t index = indices[localIndex];
      projected.positions[index] = Vector3{
          candidatePositions[localIndex].x + shift.x,
          candidatePositions[localIndex].y + shift.y,
          candidatePositions[localIndex].z + shift.z,
      };
      if (finite_vector(projected.positions[index])) {
        projected.hasPosition[index] = true;
      }
    }
  }

  return projected;
}

bool pair_boundary_relaxation_residual_no_worse(
    const PairInteractionBoundaryRelaxationResidualSummary& candidate,
    const PairInteractionBoundaryRelaxationResidualSummary& baseline) {
  if (baseline.sampleCount == 0 || !std::isfinite(baseline.maxResidual)) {
    return true;
  }
  if (candidate.sampleCount == 0 || !std::isfinite(candidate.maxResidual) ||
      !std::isfinite(candidate.meanResidual) || !std::isfinite(candidate.rmsResidual)) {
    return false;
  }
  return candidate.maxResidual <= baseline.maxResidual + kPairBoundaryRelaxationResidualEpsilon &&
      candidate.meanResidual <= baseline.meanResidual + kPairBoundaryRelaxationResidualEpsilon &&
      candidate.rmsResidual <= baseline.rmsResidual + kPairBoundaryRelaxationResidualEpsilon;
}

bool pair_boundary_relaxation_residual_better(
    const PairInteractionBoundaryRelaxationResidualSummary& candidate,
    const PairInteractionBoundaryRelaxationResidualSummary& incumbent) {
  if (candidate.maxResidual < incumbent.maxResidual - kPairBoundaryRelaxationResidualEpsilon) {
    return true;
  }
  if (candidate.maxResidual > incumbent.maxResidual + kPairBoundaryRelaxationResidualEpsilon) {
    return false;
  }
  if (candidate.rmsResidual < incumbent.rmsResidual - kPairBoundaryRelaxationResidualEpsilon) {
    return true;
  }
  if (candidate.rmsResidual > incumbent.rmsResidual + kPairBoundaryRelaxationResidualEpsilon) {
    return false;
  }
  return candidate.meanResidual < incumbent.meanResidual - kPairBoundaryRelaxationResidualEpsilon;
}

bool apply_pair_interaction_relaxation_positions(
    PairInteractionSampleResult& result,
    const std::vector<Vector3>& nextPositions,
    const std::vector<bool>& hasNextPosition,
    double factor) {
  bool anyUpdated = false;
  for (std::size_t index = 0; index < result.frames.size(); ++index) {
    if (index >= hasNextPosition.size() || !hasNextPosition[index]) {
      continue;
    }
    const MotionFrameRowF64& frame = result.frames[index];
    const Vector3 current{frame.positionX, frame.positionY, frame.positionZ};
    const Vector3 target = nextPositions[index];
    set_frame_position(result.frames[index],
                       Vector3{
                           current.x + (target.x - current.x) * factor,
                           current.y + (target.y - current.y) * factor,
                           current.z + (target.z - current.z) * factor,
                       });
    anyUpdated = true;
  }
  return anyUpdated;
}

double measure_pair_interaction_relaxation_step(
    const PairInteractionSampleResult& result,
    const std::vector<Vector3>& nextPositions,
    const std::vector<bool>& hasNextPosition,
    double factor) {
  double maxStep = 0.0;
  for (std::size_t index = 0; index < result.frames.size(); ++index) {
    if (index >= hasNextPosition.size() || !hasNextPosition[index]) {
      continue;
    }
    const MotionFrameRowF64& frame = result.frames[index];
    const Vector3 current{frame.positionX, frame.positionY, frame.positionZ};
    const Vector3 target = nextPositions[index];
    const Vector3 step = vector_scale(vector_subtract(target, current), factor);
    const double stepNorm = vector_norm(step);
    if (std::isfinite(stepNorm)) {
      maxStep = std::max(maxStep, stepNorm);
    }
  }
  return maxStep;
}

PairInteractionRelaxationStepSelection select_pair_interaction_relaxation_step(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const PairInteractionBoundaryRelaxationResidualSummary& residualBeforeIteration,
    const std::vector<MotionFrameRowF64>& framesBeforeIteration,
    const PairInteractionRelaxationCandidate& candidate) {
  PairInteractionRelaxationStepSelection selection;

  for (double factor : kPairBoundaryRelaxationLineSearchFactors) {
    result.frames = framesBeforeIteration;
    const double candidateStep =
        measure_pair_interaction_relaxation_step(
            result,
            candidate.positions,
            candidate.hasPosition,
            factor);
    if (!apply_pair_interaction_relaxation_positions(
            result,
            candidate.positions,
            candidate.hasPosition,
            factor)) {
      continue;
    }
    ++selection.lineSearchTrialCount;
    const PairInteractionBoundaryRelaxationResidualSummary residual =
        measure_pair_interaction_boundary_relaxation_residuals(result, request, initialStates);
    if (!pair_boundary_relaxation_residual_no_worse(residual, residualBeforeIteration)) {
      continue;
    }
    if (!selection.accepted ||
        pair_boundary_relaxation_residual_better(residual, selection.residual)) {
      selection.accepted = true;
      selection.maxStep = candidateStep;
      selection.stepFactor = factor;
      selection.candidateKind = candidate.kind;
      selection.residual = residual;
      selection.frames = result.frames;
    }
  }

  result.frames = framesBeforeIteration;
  return selection;
}

bool pair_interaction_relaxation_selection_better(
    const PairInteractionRelaxationStepSelection& candidate,
    const PairInteractionRelaxationStepSelection& incumbent) {
  if (!candidate.accepted) {
    return false;
  }
  if (!incumbent.accepted) {
    return true;
  }
  return pair_boundary_relaxation_residual_better(candidate.residual, incumbent.residual);
}

PairInteractionRelaxationStepSelection select_pair_interaction_relaxation_step_variants(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates,
    const PairInteractionBoundaryRelaxationResidualSummary& residualBeforeIteration,
    const std::vector<MotionFrameRowF64>& framesBeforeIteration,
    const std::vector<PairInteractionRelaxationCandidate>& candidates) {
  PairInteractionRelaxationStepSelection selectedStep;
  std::uint64_t candidateVariantCount = 0;
  std::uint64_t lineSearchTrialCount = 0;
  std::uint64_t candidateKindMask = 0;
  for (const PairInteractionRelaxationCandidate& candidate : candidates) {
    if (!has_pair_interaction_relaxation_candidate(candidate)) {
      continue;
    }
    ++candidateVariantCount;
    candidateKindMask |= pair_boundary_relaxation_candidate_family_mask(candidate.kind);
    result.frames = framesBeforeIteration;
    const PairInteractionRelaxationStepSelection step =
        select_pair_interaction_relaxation_step(result,
                                                request,
                                                initialStates,
                                                residualBeforeIteration,
                                                framesBeforeIteration,
                                                candidate);
    lineSearchTrialCount += step.lineSearchTrialCount;
    result.frames = framesBeforeIteration;
    if (pair_interaction_relaxation_selection_better(step, selectedStep)) {
      selectedStep = step;
    }
  }
  selectedStep.candidateVariantCount = candidateVariantCount;
  selectedStep.lineSearchTrialCount = lineSearchTrialCount;
  selectedStep.candidateKindMask = candidateKindMask;
  return selectedStep;
}

PairInteractionBoundaryRelaxationRun relax_pair_interaction_constrained_frames(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request,
    const std::vector<PairInteractionState>& initialStates) {
  if (request.pathConstraints.empty() || result.frames.empty()) {
    return PairInteractionBoundaryRelaxationRun{
        0,
        kPairBoundaryRelaxationStopReasonNoRelaxableSamples,
    };
  }

  std::vector<std::uint64_t> pathKeys;
  for (const MotionFrameRowF64& frame : result.frames) {
    if (std::find(pathKeys.begin(), pathKeys.end(), frame.pathKey) == pathKeys.end()) {
      pathKeys.push_back(frame.pathKey);
    }
  }
  std::sort(pathKeys.begin(), pathKeys.end());

  const std::uint64_t relaxationIterations = request.boundaryRelaxationIterationCount;
  const double epsilon = pair_constraint_time_epsilon(request);
  std::uint64_t appliedIterationCount = 0;
  double maxAcceptedStep = 0.0;
  double finalStepFactor = 0.0;
  std::uint32_t selectedCandidateKind = kPairBoundaryRelaxationCandidateNone;
  std::uint32_t centerOfMassSelectedCount = 0;
  std::uint64_t candidateVariantCount = 0;
  std::uint64_t lineSearchTrialCount = 0;
  std::uint64_t candidateKindMask = 0;
  PairInteractionBoundaryRelaxationResidualSummary bestAcceptedResidual =
      measure_pair_interaction_boundary_relaxation_residuals(result, request, initialStates);
  bool hasBestAcceptedResidual = bestAcceptedResidual.sampleCount > 0;
  std::vector<MotionFrameRowF64> bestAcceptedFrames = result.frames;
  auto finish = [&](std::uint32_t stopReason) -> PairInteractionBoundaryRelaxationRun {
    if (!bestAcceptedFrames.empty()) {
      result.frames = bestAcceptedFrames;
    }
    snap_pair_interaction_frame_constraints(result, request, epsilon);
    recompute_pair_interaction_frame_velocities(result, &request, &initialStates);
    return PairInteractionBoundaryRelaxationRun{
        appliedIterationCount,
        stopReason,
        maxAcceptedStep,
        finalStepFactor,
        selectedCandidateKind,
        centerOfMassSelectedCount,
        candidateVariantCount,
        lineSearchTrialCount,
        candidateKindMask,
    };
  };
  if (relaxationIterations == 0) {
    return finish(kPairBoundaryRelaxationStopReasonNotRequested);
  }
  for (std::uint64_t iteration = 0; iteration < relaxationIterations; ++iteration) {
    PairInteractionRelaxationCandidate predictorCandidate =
        solve_pair_interaction_relaxation_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            result.frames);
    predictorCandidate.kind = kPairBoundaryRelaxationCandidatePredictor;

    if (!has_pair_interaction_relaxation_candidate(predictorCandidate)) {
      return finish(appliedIterationCount == 0
                        ? kPairBoundaryRelaxationStopReasonNoRelaxableSamples
                        : kPairBoundaryRelaxationStopReasonNoUpdateCandidates);
    }
    const PairInteractionBoundaryRelaxationResidualSummary residualBeforeIteration =
        measure_pair_interaction_boundary_relaxation_residuals(result, request, initialStates);
    const std::vector<MotionFrameRowF64> framesBeforeIteration = result.frames;
    PairInteractionRelaxationCandidate defectCorrectionCandidate =
        solve_pair_interaction_defect_correction_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            result.frames);
    defectCorrectionCandidate.kind = kPairBoundaryRelaxationCandidateDefectCorrection;
    PairInteractionRelaxationCandidate linearizedDefectCorrectionCandidate =
        solve_pair_interaction_linearized_defect_correction_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            defectCorrectionCandidate);
    PairInteractionRelaxationCandidate localNewtonDefectCorrectionCandidate =
        solve_pair_interaction_local_newton_defect_correction_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            defectCorrectionCandidate);
    PairInteractionRelaxationCandidate coupledLocalNewtonDefectCorrectionCandidate =
        solve_pair_interaction_coupled_local_newton_defect_correction_candidate(
            result,
            request,
            initialStates,
            epsilon,
            defectCorrectionCandidate);
    PairInteractionRelaxationCandidate causalDelayNumericalNewtonDefectCorrectionCandidate =
        solve_pair_interaction_causal_delay_numerical_newton_defect_correction_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            defectCorrectionCandidate);
    PairInteractionRelaxationCandidate blockCoupledNewtonDefectCorrectionCandidate =
        solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            defectCorrectionCandidate);

    PairInteractionSampleResult predictedResult = result;
    apply_pair_interaction_relaxation_positions(
        predictedResult,
        predictorCandidate.positions,
        predictorCandidate.hasPosition,
        1.0);
    PairInteractionRelaxationCandidate predictedDefectCorrectionCandidate =
        solve_pair_interaction_defect_correction_candidate(
            predictedResult,
            request,
            initialStates,
            pathKeys,
            epsilon,
            predictedResult.frames);
    predictedDefectCorrectionCandidate.kind =
        kPairBoundaryRelaxationCandidatePredictedDefectCorrection;
    PairInteractionRelaxationCandidate predictedBlockCoupledNewtonDefectCorrectionCandidate =
        solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
            predictedResult,
            request,
            initialStates,
            pathKeys,
            epsilon,
            predictedDefectCorrectionCandidate);
    predictedBlockCoupledNewtonDefectCorrectionCandidate.kind =
        kPairBoundaryRelaxationCandidatePredictedBlockCoupledNewtonDefectCorrection;
    PairInteractionRelaxationCandidate predictedBlendCandidate =
        solve_pair_interaction_relaxation_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            result.frames,
            &predictedResult.frames,
            0.5);
    predictedBlendCandidate.kind = kPairBoundaryRelaxationCandidatePredictedBlend;
    PairInteractionRelaxationCandidate correctedCandidate =
        solve_pair_interaction_relaxation_candidate(
            result,
            request,
            initialStates,
            pathKeys,
            epsilon,
            predictedResult.frames);
    correctedCandidate.kind = kPairBoundaryRelaxationCandidateFirstCorrector;
    PairInteractionRelaxationCandidate secondCorrectedCandidate;
    PairInteractionRelaxationCandidate correctedDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate correctedBlockCoupledNewtonDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate correctedBlendCandidate;
    PairInteractionRelaxationCandidate secondCorrectedDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate secondCorrectedBlockCoupledNewtonDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate secondCorrectedBlendCandidate;
    PairInteractionRelaxationCandidate thirdCorrectedCandidate;
    PairInteractionRelaxationCandidate thirdCorrectedDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate thirdCorrectedBlockCoupledNewtonDefectCorrectionCandidate;
    PairInteractionRelaxationCandidate thirdCorrectedBlendCandidate;
    if (has_pair_interaction_relaxation_candidate(correctedCandidate)) {
      PairInteractionSampleResult correctedPredictedResult = result;
      apply_pair_interaction_relaxation_positions(
          correctedPredictedResult,
          correctedCandidate.positions,
          correctedCandidate.hasPosition,
          1.0);
      correctedDefectCorrectionCandidate =
          solve_pair_interaction_defect_correction_candidate(
              correctedPredictedResult,
              request,
              initialStates,
              pathKeys,
              epsilon,
              correctedPredictedResult.frames);
      correctedDefectCorrectionCandidate.kind =
          kPairBoundaryRelaxationCandidateCorrectedDefectCorrection;
      correctedBlockCoupledNewtonDefectCorrectionCandidate =
          solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
              correctedPredictedResult,
              request,
              initialStates,
              pathKeys,
              epsilon,
              correctedDefectCorrectionCandidate);
      correctedBlockCoupledNewtonDefectCorrectionCandidate.kind =
          kPairBoundaryRelaxationCandidateCorrectedBlockCoupledNewtonDefectCorrection;
      correctedBlendCandidate =
          solve_pair_interaction_relaxation_candidate(
              result,
              request,
              initialStates,
              pathKeys,
              epsilon,
              result.frames,
              &correctedPredictedResult.frames,
              0.5);
      correctedBlendCandidate.kind = kPairBoundaryRelaxationCandidateCorrectedBlend;
      secondCorrectedCandidate =
          solve_pair_interaction_relaxation_candidate(
              result,
              request,
              initialStates,
              pathKeys,
              epsilon,
              correctedPredictedResult.frames);
      secondCorrectedCandidate.kind = kPairBoundaryRelaxationCandidateSecondCorrector;
      if (has_pair_interaction_relaxation_candidate(secondCorrectedCandidate)) {
        PairInteractionSampleResult secondCorrectedPredictedResult = result;
        apply_pair_interaction_relaxation_positions(
            secondCorrectedPredictedResult,
            secondCorrectedCandidate.positions,
            secondCorrectedCandidate.hasPosition,
            1.0);
        secondCorrectedDefectCorrectionCandidate =
            solve_pair_interaction_defect_correction_candidate(
                secondCorrectedPredictedResult,
                request,
                initialStates,
                pathKeys,
                epsilon,
                secondCorrectedPredictedResult.frames);
        secondCorrectedDefectCorrectionCandidate.kind =
            kPairBoundaryRelaxationCandidateSecondCorrectedDefectCorrection;
        secondCorrectedBlockCoupledNewtonDefectCorrectionCandidate =
            solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
                secondCorrectedPredictedResult,
                request,
                initialStates,
                pathKeys,
                epsilon,
                secondCorrectedDefectCorrectionCandidate);
        secondCorrectedBlockCoupledNewtonDefectCorrectionCandidate.kind =
            kPairBoundaryRelaxationCandidateSecondCorrectedBlockCoupledNewtonDefectCorrection;
        secondCorrectedBlendCandidate =
            solve_pair_interaction_relaxation_candidate(
                result,
                request,
                initialStates,
                pathKeys,
                epsilon,
                result.frames,
                &secondCorrectedPredictedResult.frames,
                0.5);
        secondCorrectedBlendCandidate.kind = kPairBoundaryRelaxationCandidateSecondCorrectedBlend;
        thirdCorrectedCandidate =
            solve_pair_interaction_relaxation_candidate(
                result,
                request,
                initialStates,
                pathKeys,
                epsilon,
                secondCorrectedPredictedResult.frames);
        thirdCorrectedCandidate.kind = kPairBoundaryRelaxationCandidateThirdCorrector;
        if (has_pair_interaction_relaxation_candidate(thirdCorrectedCandidate)) {
          PairInteractionSampleResult thirdCorrectedPredictedResult = result;
          apply_pair_interaction_relaxation_positions(
              thirdCorrectedPredictedResult,
              thirdCorrectedCandidate.positions,
              thirdCorrectedCandidate.hasPosition,
              1.0);
          thirdCorrectedDefectCorrectionCandidate =
              solve_pair_interaction_defect_correction_candidate(
                  thirdCorrectedPredictedResult,
                  request,
                  initialStates,
                  pathKeys,
                  epsilon,
                  thirdCorrectedPredictedResult.frames);
          thirdCorrectedDefectCorrectionCandidate.kind =
              kPairBoundaryRelaxationCandidateThirdCorrectedDefectCorrection;
          thirdCorrectedBlockCoupledNewtonDefectCorrectionCandidate =
              solve_pair_interaction_block_coupled_newton_defect_correction_candidate(
                  thirdCorrectedPredictedResult,
                  request,
                  initialStates,
                  pathKeys,
                  epsilon,
                  thirdCorrectedDefectCorrectionCandidate);
          thirdCorrectedBlockCoupledNewtonDefectCorrectionCandidate.kind =
              kPairBoundaryRelaxationCandidateThirdCorrectedBlockCoupledNewtonDefectCorrection;
          thirdCorrectedBlendCandidate =
              solve_pair_interaction_relaxation_candidate(
                  result,
                  request,
                  initialStates,
                  pathKeys,
                  epsilon,
                  result.frames,
                  &thirdCorrectedPredictedResult.frames,
                  0.5);
          thirdCorrectedBlendCandidate.kind = kPairBoundaryRelaxationCandidateThirdCorrectedBlend;
        }
      }
    }

    std::vector<PairInteractionRelaxationCandidate> candidateVariants{
        predictorCandidate,
        correctedCandidate,
        secondCorrectedCandidate,
        defectCorrectionCandidate,
        linearizedDefectCorrectionCandidate,
        localNewtonDefectCorrectionCandidate,
        coupledLocalNewtonDefectCorrectionCandidate,
        causalDelayNumericalNewtonDefectCorrectionCandidate,
        blockCoupledNewtonDefectCorrectionCandidate,
        predictedDefectCorrectionCandidate,
        predictedBlockCoupledNewtonDefectCorrectionCandidate,
        predictedBlendCandidate,
        correctedDefectCorrectionCandidate,
        correctedBlockCoupledNewtonDefectCorrectionCandidate,
        correctedBlendCandidate,
        secondCorrectedDefectCorrectionCandidate,
        secondCorrectedBlockCoupledNewtonDefectCorrectionCandidate,
        secondCorrectedBlendCandidate,
        thirdCorrectedCandidate,
        thirdCorrectedDefectCorrectionCandidate,
        thirdCorrectedBlockCoupledNewtonDefectCorrectionCandidate,
        thirdCorrectedBlendCandidate,
    };
    const std::size_t baseCandidateVariantCount = candidateVariants.size();
    for (std::size_t index = 0; index < baseCandidateVariantCount; ++index) {
      const PairInteractionRelaxationCandidate projectedCandidate =
          project_pair_interaction_candidate_to_constraint_center_of_mass(
              result,
              request,
              initialStates,
              candidateVariants[index],
              epsilon);
      if (has_pair_interaction_relaxation_candidate(projectedCandidate)) {
        candidateVariants.push_back(projectedCandidate);
      }
    }

    const PairInteractionRelaxationStepSelection selectedStep =
        select_pair_interaction_relaxation_step_variants(
            result,
            request,
            initialStates,
            residualBeforeIteration,
            framesBeforeIteration,
            candidateVariants);
    candidateVariantCount += selectedStep.candidateVariantCount;
    lineSearchTrialCount += selectedStep.lineSearchTrialCount;
    candidateKindMask |= selectedStep.candidateKindMask;
    if (!selectedStep.accepted) {
      result.frames = framesBeforeIteration;
      return finish(kPairBoundaryRelaxationStopReasonLineSearchStalled);
    }
    result.frames = selectedStep.frames;
    if (!hasBestAcceptedResidual ||
        pair_boundary_relaxation_residual_better(selectedStep.residual, bestAcceptedResidual)) {
      bestAcceptedResidual = selectedStep.residual;
      hasBestAcceptedResidual = bestAcceptedResidual.sampleCount > 0;
      bestAcceptedFrames = result.frames;
    }
    ++appliedIterationCount;
    maxAcceptedStep = std::max(maxAcceptedStep, selectedStep.maxStep);
    finalStepFactor = selectedStep.stepFactor;
    selectedCandidateKind = selectedStep.candidateKind;
    if (pair_interaction_candidate_is_center_of_mass_projected(selectedStep.candidateKind)) {
      ++centerOfMassSelectedCount;
    }
    if (request.boundaryRelaxationTolerance > 0.0) {
      if (selectedStep.residual.sampleCount > 0 &&
          selectedStep.residual.maxResidual <= request.boundaryRelaxationTolerance) {
        return finish(kPairBoundaryRelaxationStopReasonToleranceReached);
      }
    }
    if (request.boundaryRelaxationStepTolerance > 0.0 &&
        selectedStep.maxStep <= request.boundaryRelaxationStepTolerance) {
      return finish(kPairBoundaryRelaxationStopReasonStepToleranceReached);
    }
  }

  return finish(kPairBoundaryRelaxationStopReasonIterationBudgetExhausted);
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

void summarize_pair_interaction_constraint_position_residuals(
    PairInteractionSampleResult& result,
    const PairInteractionRequest& request) {
  if (request.pathConstraints.empty()) {
    return;
  }

  const double epsilon = pair_constraint_time_epsilon(request);
  double sumResidual = 0.0;
  double sumResidualSquared = 0.0;
  double maxResidual = 0.0;
  std::uint64_t sampleCount = 0;

  for (const PairInteractionPathConstraint& constraint : request.pathConstraints) {
    const auto match = std::find_if(
        result.frames.begin(),
        result.frames.end(),
        [&constraint, epsilon](const MotionFrameRowF64& frame) {
          return frame.pathKey == constraint.pathKey &&
              std::abs(frame.time - constraint.time) <= epsilon;
        });
    if (match == result.frames.end()) {
      continue;
    }
    const double residual = vector_norm(
        vector_subtract(frame_position(*match), constraint.position));
    if (!std::isfinite(residual)) {
      continue;
    }
    record_residual_sample(residual, maxResidual, sumResidual, sumResidualSquared, sampleCount);
  }

  result.pathConstraintPositionResidualSampleCount = sampleCount;
  result.maxPathConstraintPositionResidual = maxResidual;
  if (sampleCount > 0) {
    result.meanPathConstraintPositionResidual =
        sumResidual / static_cast<double>(sampleCount);
    result.rmsPathConstraintPositionResidual =
        std::sqrt(sumResidualSquared / static_cast<double>(sampleCount));
  }
}

void summarize_pair_interaction_initial_velocity_residuals(
    PairInteractionSampleResult& result,
    const std::vector<PairInteractionState>& initialStates) {
  if (initialStates.empty() || result.frames.empty()) {
    return;
  }

  double sumResidual = 0.0;
  double sumResidualSquared = 0.0;
  double maxResidual = 0.0;
  std::uint64_t sampleCount = 0;

  for (const PairInteractionState& initialState : initialStates) {
    const std::vector<const MotionFrameRowF64*> pathFrames =
        sorted_const_frames_for_path(result.frames, initialState.pathKey);
    if (pathFrames.size() < 2) {
      continue;
    }
    const MotionFrameRowF64& first = *pathFrames[0];
    const Vector3 firstStepVelocity{
        first.velocityX,
        first.velocityY,
        first.velocityZ,
    };
    const double residual = vector_norm(
        vector_subtract(firstStepVelocity, initialState.initialVelocity));
    if (!std::isfinite(residual)) {
      continue;
    }
    record_residual_sample(residual, maxResidual, sumResidual, sumResidualSquared, sampleCount);
  }

  result.pathConstraintInitialVelocityResidualSampleCount = sampleCount;
  result.maxPathConstraintInitialVelocityResidual = maxResidual;
  if (sampleCount > 0) {
    result.meanPathConstraintInitialVelocityResidual =
        sumResidual / static_cast<double>(sampleCount);
    result.rmsPathConstraintInitialVelocityResidual =
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

  const bool useCausalDelayResidual = pair_interaction_uses_fixed_signal_speed(request);
  result.pathConstraintBoundaryResidualMode = useCausalDelayResidual
      ? kPairBoundaryResidualModeCausalDelayPairLaw
      : kPairBoundaryResidualModeSameTimePairLaw;
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
      Vector3 lawAcceleration{};
      if (useCausalDelayResidual) {
        if (!pair_constraint_causal_delay_law_acceleration_at_constraint(
                request,
                initialStates,
                current,
                epsilon,
                lawAcceleration)) {
          continue;
        }
      } else {
        const std::vector<PairInteractionState> states =
            states_from_constraint_boundary_at_time(request, initialStates, current.time);
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
        lawAcceleration = lawAccelerations[stateIndex];
      }
      const double residual = vector_norm(
          vector_subtract(finiteDifferenceAcceleration, lawAcceleration));
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

  result.pathConstraintBoundaryResidualMode = pair_boundary_residual_mode_for_request(request);
  std::vector<PairInteractionState> states = initialStates;
  const PairInteractionSampleSchedule sampleSchedule = pair_interaction_sample_schedule(request);
  const std::vector<double>& times = sampleSchedule.times;
  result.pathConstraintFrameRefinementSampleCount =
      sampleSchedule.pathConstraintFrameRefinementSampleCount;
  std::vector<MotionFrameRowF64> previousFrames;
  const bool useConstraintGuidance =
      request.pathConstraints.empty() || request.boundaryRelaxationIterationCount == 0;

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
          times[frameIndex + 1],
          useConstraintGuidance);
    }
  }

  const double constraintEpsilon = pair_constraint_time_epsilon(request);
  if (!request.pathConstraints.empty() && request.boundaryRelaxationIterationCount > 0) {
    result.pathConstraintBoundarySeedSampleCount =
        seed_pair_interaction_frames_from_boundary_constraints(
        result,
        request,
        initialStates,
        constraintEpsilon);
  }

  const PairInteractionBoundaryRelaxationResidualSummary relaxationResidualBefore =
      measure_pair_interaction_boundary_relaxation_residuals(result, request, initialStates);
  const std::vector<MotionFrameRowF64> framesBeforeBoundaryRelaxation = result.frames;
  const PairInteractionBoundaryRelaxationRun boundaryRelaxationRun =
      relax_pair_interaction_constrained_frames(result, request, initialStates);
  result.pathConstraintBoundaryRelaxationAppliedIterationCount =
      static_cast<std::uint32_t>(
          std::min<std::uint64_t>(
              boundaryRelaxationRun.appliedIterationCount,
              std::numeric_limits<std::uint32_t>::max()));
  result.pathConstraintBoundaryRelaxationStopReason =
      boundaryRelaxationRun.stopReason;
  result.pathConstraintBoundaryRelaxationSelectedCandidateKind =
      boundaryRelaxationRun.selectedCandidateKind;
  result.pathConstraintBoundaryRelaxationCenterOfMassSelectedCount =
      boundaryRelaxationRun.centerOfMassSelectedCount;
  result.pathConstraintBoundaryRelaxationCandidateVariantCount =
      boundaryRelaxationRun.candidateVariantCount;
  result.pathConstraintBoundaryRelaxationLineSearchTrialCount =
      boundaryRelaxationRun.lineSearchTrialCount;
  result.pathConstraintBoundaryRelaxationCandidateKindMask =
      boundaryRelaxationRun.candidateKindMask;
  result.pathConstraintBoundaryRelaxationMaxStep =
      boundaryRelaxationRun.maxAcceptedStep;
  result.pathConstraintBoundaryRelaxationFinalStepFactor =
      boundaryRelaxationRun.finalStepFactor;
  PairInteractionBoundaryRelaxationResidualSummary relaxationResidualAfter =
      measure_pair_interaction_boundary_relaxation_residuals(result, request, initialStates);
  result.pathConstraintBoundaryRelaxationStatus =
      pair_boundary_relaxation_status(
          relaxationResidualBefore,
          relaxationResidualAfter,
          request,
          boundaryRelaxationRun);
  if (result.pathConstraintBoundaryRelaxationStatus ==
      kPairBoundaryRelaxationStatusRevertedNoImprovement) {
    result.frames = framesBeforeBoundaryRelaxation;
    relaxationResidualAfter = relaxationResidualBefore;
  }
  result.pathConstraintBoundaryRelaxationResidualSampleCount =
      relaxationResidualAfter.sampleCount;
  result.maxPathConstraintBoundaryRelaxationResidualBefore =
      relaxationResidualBefore.maxResidual;
  result.maxPathConstraintBoundaryRelaxationResidualAfter =
      relaxationResidualAfter.maxResidual;
  result.meanPathConstraintBoundaryRelaxationResidualBefore =
      relaxationResidualBefore.meanResidual;
  result.meanPathConstraintBoundaryRelaxationResidualAfter =
      relaxationResidualAfter.meanResidual;
  result.rmsPathConstraintBoundaryRelaxationResidualBefore =
      relaxationResidualBefore.rmsResidual;
  result.rmsPathConstraintBoundaryRelaxationResidualAfter =
      relaxationResidualAfter.rmsResidual;
  result.pathConstraintBoundaryRelaxationResidualRatio =
      finite_nonnegative_ratio(relaxationResidualAfter.maxResidual,
                               relaxationResidualBefore.maxResidual);
  result.meanPathConstraintBoundaryRelaxationResidualRatio =
      finite_nonnegative_ratio(relaxationResidualAfter.meanResidual,
                               relaxationResidualBefore.meanResidual);
  result.rmsPathConstraintBoundaryRelaxationResidualRatio =
      finite_nonnegative_ratio(relaxationResidualAfter.rmsResidual,
                               relaxationResidualBefore.rmsResidual);
  result.pathConstraintBoundaryRelaxationResidualSettlingRate =
      finite_nonnegative_settling_rate(
          result.pathConstraintBoundaryRelaxationResidualRatio,
          boundaryRelaxationRun.appliedIterationCount);
  result.meanPathConstraintBoundaryRelaxationResidualSettlingRate =
      finite_nonnegative_settling_rate(
          result.meanPathConstraintBoundaryRelaxationResidualRatio,
          boundaryRelaxationRun.appliedIterationCount);
  result.rmsPathConstraintBoundaryRelaxationResidualSettlingRate =
      finite_nonnegative_settling_rate(
          result.rmsPathConstraintBoundaryRelaxationResidualRatio,
          boundaryRelaxationRun.appliedIterationCount);
  rebuild_pair_interaction_path_rows(result);
  summarize_pair_interaction_constraint_position_residuals(result, request);
  summarize_pair_interaction_initial_velocity_residuals(result, initialStates);
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

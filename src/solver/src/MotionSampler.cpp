#include "architrino/solver/MotionSampler.hpp"

#include <cmath>

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

}  // namespace architrino::solver

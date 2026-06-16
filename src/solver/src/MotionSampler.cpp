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

}  // namespace

MotionSampleResult sample_linear_motion(const MotionSampleRequest& request) {
  MotionSampleResult result;
  if (!finite_segment(request.segment)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "motion segment numeric fields must be finite",
                          "motion-sampler",
                          false);
    return result;
  }
  if (request.segment.endTime < request.segment.startTime) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "motion segment time bounds are not ordered",
                          "motion-sampler",
                          false);
    return result;
  }
  if (!std::isfinite(request.startTime) || !std::isfinite(request.endTime) ||
      request.endTime < request.startTime) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "motion sample time bounds must be finite and ordered",
                          "motion-sampler",
                          false);
    return result;
  }
  if (!std::isfinite(request.step) || request.step <= 0.0) {
    result.validation.add(StatusCode::TimeResolutionInsufficient,
                          StatusSeverity::Error,
                          "motion sample step must be positive and finite",
                          "motion-sampler",
                          false);
    return result;
  }
  if (request.startTime < request.segment.startTime || request.endTime > request.segment.endTime) {
    result.validation.add(StatusCode::InsufficientHistoryDepth,
                          StatusSeverity::Halt,
                          "motion sample window is outside the retained segment",
                          "motion-sampler",
                          false);
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

}  // namespace architrino::solver

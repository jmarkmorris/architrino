#include "architrino/eom/JointRootBracket.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <stdexcept>

namespace architrino::eom {

JointRootBracketCertificate certify_joint_root_bracket(
    const JointRootBracketRequest& request) {
  if (!std::isfinite(request.emission_center) ||
      request.joint_state.root_time_tolerance <= 0.0) {
    throw std::invalid_argument(
        "joint root bracket requires a finite center and positive tolerance");
  }

  JointRootBracketCertificate result;
  result.transmitter_segment_index = request.transmitter_segment_index;
  result.receiver_factor = request.receiver_factor;
  result.consumption = certify_joint_root_time_consumption(request.joint_state);
  if (!result.consumption.certified) {
    result.failure_code = result.consumption.failure_code;
    return result;
  }
  result.transmitter_factor = request.joint_state.transmitter_factor;
  const int factor_sign = result.transmitter_factor.strict_sign();
  if (factor_sign == 0) {
    result.failure_code = "joint_root_transmitter_factor_contains_zero";
    return result;
  }

  result.center_residual_magnitude_upper = std::max(
      std::abs(request.nominal_residual.lower()),
      std::abs(request.nominal_residual.upper()));
  result.residual_uncertainty_radius_upper =
      0.5 * result.consumption.joint_budget.residual_width_upper;
  const double residual_magnitude =
      (Interval::point(result.center_residual_magnitude_upper) +
       Interval::point(result.residual_uncertainty_radius_upper)).upper();
  const double factor_floor =
      result.consumption.joint_budget.transmitter_factor_magnitude_lower;
  double half_width =
      (Interval::point(residual_magnitude) /
       Interval::point(factor_floor)).upper();
  // The quotient is the non-strict mean-value bound.  Inflate it by a small
  // outward binary64 envelope so the independently evaluated endpoint signs
  // can be strict rather than landing on the same rounded zero boundary.
  const double strict_scale =
      1.0 + 64.0 * std::numeric_limits<double>::epsilon();
  half_width =
      (Interval::point(half_width) * Interval::point(strict_scale)).upper();
  half_width = std::nextafter(
      half_width, std::numeric_limits<double>::infinity());
  result.bracket_half_width_upper = half_width;
  result.root_bracket =
      Interval::point(request.emission_center) + Interval(-half_width, half_width);
  if (!result.root_bracket.subset_of(request.containing_cell)) {
    result.failure_code = "joint_root_bracket_leaves_containing_cell";
    return result;
  }
  if (result.root_bracket.width() >
      request.joint_state.root_time_tolerance) {
    result.failure_code = "joint_root_bracket_exceeds_tolerance";
    return result;
  }

  const double signed_center_lower = factor_sign > 0
      ? request.nominal_residual.lower()
      : -request.nominal_residual.upper();
  const double signed_center_upper = factor_sign > 0
      ? request.nominal_residual.upper()
      : -request.nominal_residual.lower();
  const Interval signed_left =
      Interval::point(signed_center_upper) +
      Interval::point(result.residual_uncertainty_radius_upper) -
      interval_absolute(result.transmitter_factor) *
          Interval::point(half_width);
  const Interval signed_right =
      Interval::point(signed_center_lower) -
      Interval::point(result.residual_uncertainty_radius_upper) +
      interval_absolute(result.transmitter_factor) *
          Interval::point(half_width);
  result.left_residual_upper = signed_left.upper();
  result.right_residual_lower = signed_right.lower();
  if (!(result.left_residual_upper < 0.0 &&
        result.right_residual_lower > 0.0)) {
    result.failure_code = "joint_root_endpoint_signs_not_strict";
    return result;
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

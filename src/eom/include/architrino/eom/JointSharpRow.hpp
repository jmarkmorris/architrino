#pragma once

#include "architrino/eom/SharpAccelerationSensitivity.hpp"

#include <array>
#include <string>
#include <vector>

namespace architrino::eom {

struct JointSharpRowRequest {
  IntervalVector point_displacement;
  IntervalVector displacement_box;
  IntervalVector point_transmitter_velocity;
  IntervalVector transmitter_velocity_box;
  IntervalVector transmitter_acceleration_box;
  Interval field_speed = Interval::point(1.0);
  Interval certified_transmitter_factor = Interval::point(1.0);
  Interval signed_coupling = Interval::point(1.0);
  std::vector<std::array<double, 3>> receiver_position_coefficients;
  std::vector<std::array<double, 3>> transmitter_position_coefficients;
  std::vector<std::array<double, 3>> transmitter_velocity_coefficients;
  std::array<double, 3> receiver_position_remainder_radii{};
  std::array<double, 3> transmitter_position_remainder_radii{};
  std::array<double, 3> transmitter_velocity_remainder_radii{};
  IntervalVector accepted_acceleration_enclosure;
};

struct JointSharpRowCertificate {
  const char* schema = "eom_joint_sharp_row/v1";
  bool certified = false;
  std::string failure_code;
  std::vector<std::array<double, 3>> acceleration_coefficients;
  std::vector<IntervalVector> acceleration_coefficient_enclosures;
  std::array<double, 3> acceleration_center{};
  std::array<double, 3> acceleration_remainder_radii_upper{};
  std::array<double, 3> acceleration_projection_radii_upper{};
  bool input_boxes_dominate = false;
  bool accepted_acceleration_dominates = false;
  bool used_accepted_acceleration_fallback = false;
};

// Centered mean-value propagation for one current sharp acceleration row.
// It retains the point derivative as shared coefficients and charges interval
// Jacobian variation, input remainders, and arithmetic rounding separately.
[[nodiscard]] JointSharpRowCertificate certify_joint_sharp_row(
    const JointSharpRowRequest& request);

}  // namespace architrino::eom

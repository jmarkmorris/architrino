#pragma once

#include "architrino/eom/JointState.hpp"

#include <cstddef>
#include <string>

namespace architrino::eom {

struct JointRootBracketRequest {
  JointRootTimeConsumptionRequest joint_state;
  Interval nominal_residual = Interval::point(0.0);
  double emission_center = 0.0;
  Interval containing_cell = Interval::point(0.0);
  Interval receiver_factor = Interval::point(1.0);
  std::size_t transmitter_segment_index = 0U;
};

struct JointRootBracketCertificate {
  const char* schema = "eom_joint_root_bracket/v1";
  bool certified = false;
  std::string failure_code;
  JointRootTimeConsumptionCertificate consumption;
  Interval root_bracket = Interval::point(0.0);
  Interval transmitter_factor = Interval::point(0.0);
  Interval receiver_factor = Interval::point(0.0);
  double center_residual_magnitude_upper = 0.0;
  double residual_uncertainty_radius_upper = 0.0;
  double bracket_half_width_upper = 0.0;
  double left_residual_upper = 0.0;
  double right_residual_lower = 0.0;
  std::size_t transmitter_segment_index = 0U;
};

// Converts an admitted joint state at a difficult point into one common root
// bracket.  A strict one-sign transmitter-side factor over containing_cell
// proves uniqueness and makes the endpoint sign bounds apply to every shared
// symbol assignment and independent remainder in the admitted state.
[[nodiscard]] JointRootBracketCertificate certify_joint_root_bracket(
    const JointRootBracketRequest& request);

}  // namespace architrino::eom

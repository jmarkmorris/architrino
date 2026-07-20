#pragma once

#include "architrino/eom/DelayedRootSensitivity.hpp"

#include <string>
#include <vector>

namespace architrino::eom {

// Interval Jacobian rows for one current sharp-root acceleration row.  The
// coefficient registries are aligned and describe fixed-time path responses.
struct SharpAccelerationSensitivityRequest {
  IntervalVector displacement;
  IntervalVector transmitter_velocity;
  IntervalVector transmitter_acceleration;
  Interval field_speed = Interval::point(1.0);
  Interval certified_transmitter_factor = Interval::point(1.0);
  Interval signed_coupling = Interval::point(1.0);
  std::vector<IntervalVector> receiver_position_coefficients;
  std::vector<IntervalVector> transmitter_position_coefficients;
  std::vector<IntervalVector> transmitter_velocity_coefficients;
};

struct SharpAccelerationSensitivityCertificate {
  const char* schema = "eom_sharp_acceleration_sensitivity/v1";
  bool certified = false;
  std::string failure_code;
  DelayedRootSensitivityCertificate delayed_root;
  Interval acceleration_weight = Interval::point(0.0);
  IntervalVector acceleration{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  std::vector<IntervalVector>
      effective_transmitter_velocity_coefficients;
  std::vector<Interval> transmitter_factor_coefficients;
  std::vector<IntervalVector> acceleration_coefficients;
};

// Differentiates the current sharp-root acceleration kernel, including the
// delayed emission-time response.  It certifies only the supplied interval
// row; upstream state inclusion and multi-row summation remain separate gates.
[[nodiscard]] SharpAccelerationSensitivityCertificate
certify_sharp_acceleration_sensitivity(
    const SharpAccelerationSensitivityRequest& request);

}  // namespace architrino::eom

#pragma once

#include "architrino/eom/Interval.hpp"

#include <span>
#include <string>
#include <vector>

namespace architrino::eom {

// First-order coefficient propagation through one certified delayed root.
// Receiver and transmitter coefficient rows use one aligned symbol registry.
// Each coefficient is the position response at fixed reception/emission time;
// the certificate adds the transmitter's motion through the emission-time
// response before returning the delayed displacement coefficient.
struct DelayedRootSensitivityRequest {
  IntervalVector displacement;
  IntervalVector transmitter_velocity;
  Interval field_speed = Interval::point(1.0);
  Interval certified_transmitter_factor = Interval::point(1.0);
  std::span<const IntervalVector> receiver_position_coefficients;
  std::span<const IntervalVector> transmitter_position_coefficients;
};

struct DelayedRootSensitivityCertificate {
  const char* schema = "eom_delayed_root_sensitivity/v1";
  bool certified = false;
  std::string failure_code;
  Interval separation = Interval::point(0.0);
  IntervalVector direction{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  Interval evaluated_transmitter_factor = Interval::point(0.0);
  Interval certified_transmitter_factor = Interval::point(0.0);
  Interval transmitter_factor = Interval::point(0.0);
  std::vector<Interval> emission_time_coefficients;
  std::vector<IntervalVector> effective_transmitter_position_coefficients;
  std::vector<IntervalVector> delayed_displacement_coefficients;
  std::vector<Interval> linearized_root_residual_coefficients;
};

// Certifies the implicit delayed-root derivative for the supplied interval
// state.  This is a local Jacobian component; it does not establish that the
// supplied state or coefficient rows enclose the true coupled solution.
[[nodiscard]] DelayedRootSensitivityCertificate
certify_delayed_root_sensitivity(
    const DelayedRootSensitivityRequest& request);

}  // namespace architrino::eom

#pragma once

#include "architrino/eom/RootTimeBudget.hpp"

#include <array>
#include <cstddef>
#include <string>
#include <vector>

namespace architrino::eom {

// One path's position-error state at one retained-history evaluation point.
// Symbol rows are ordered by a shared registry owned by the caller.  The
// ordinary radii are the existing fallback box and must dominate the affine
// projection component by component.
struct JointAffinePathPosition {
  std::string path_id;
  std::vector<std::array<double, 3>> shared_symbol_coefficients;
  std::array<double, 3> independent_remainder_radii{};
  std::array<double, 3> ordinary_position_radii{};
};

struct JointRootTimeConsumptionRequest {
  JointAffinePathPosition receiver;
  JointAffinePathPosition transmitter;
  std::array<double, 3> nominal_displacement{};
  Interval transmitter_factor = Interval::point(1.0);
  double root_time_tolerance = 0.0;
};

struct JointRootTimeConsumptionCertificate {
  const char* schema = "eom_joint_root_time_consumption/v1";
  bool certified = false;
  std::string failure_code;
  std::size_t shared_symbol_count = 0U;
  bool receiver_fallback_dominates = false;
  bool transmitter_fallback_dominates = false;
  std::array<double, 3> receiver_projection_radii_upper{};
  std::array<double, 3> transmitter_projection_radii_upper{};
  std::array<double, 3> displacement_remainder_radii_upper{};
  RootTimeBudgetCertificate joint_budget;
  RootTimeBudgetCertificate ordinary_box_budget;
};

// Certifies downstream consumption of an already-admitted joint coefficient
// state.  It proves outward-rounded pair subtraction, root-time budget mapping,
// and ordinary-radius fallback dominance.  It does not prove that an upstream
// integrator enclosed the true state in the supplied coefficients.
[[nodiscard]] JointRootTimeConsumptionCertificate
certify_joint_root_time_consumption(
    const JointRootTimeConsumptionRequest& request);

}  // namespace architrino::eom

#pragma once

#include "architrino/eom/Interval.hpp"

#include <array>
#include <vector>

namespace architrino::eom {

// One joint displacement model at a fixed reception/emission point:
//
//   d = d0 + sum_j a_j epsilon_j + r,  epsilon_j in [-1, 1],
//   |r_k| <= independent_remainder_radii[k].
//
// The signed coefficients retain cross-path dependency.  The independent
// remainder is deliberately boxed and cannot provide cancellation.
struct RootTimeBudgetRequest {
  std::array<double, 3> nominal_displacement{};
  std::vector<std::array<double, 3>> shared_symbol_coefficients;
  std::array<double, 3> independent_remainder_radii{};
  Interval transmitter_factor = Interval::point(1.0);
  double root_time_tolerance = 0.0;
};

struct RootTimeBudgetCertificate {
  const char* schema = "eom_root_time_budget/v1";
  bool certified = false;
  const char* failure_code = "";
  double nominal_separation_lower = 0.0;
  double displacement_radius_upper = 0.0;
  double projected_affine_radius_upper = 0.0;
  double projected_remainder_radius_upper = 0.0;
  double nonlinear_remainder_radius_upper = 0.0;
  double residual_width_upper = 0.0;
  double transmitter_factor_magnitude_lower = 0.0;
  double root_time_width_upper = 0.0;
  double root_time_tolerance = 0.0;
};

// Applies the Euclidean-norm Taylor remainder and the simple-root mean-value
// bound using outward-rounded binary64 intervals.  This certifies the budget
// mapping for the supplied joint displacement set; it does not certify how a
// caller produced that set.
[[nodiscard]] RootTimeBudgetCertificate certify_root_time_budget(
    const RootTimeBudgetRequest& request);

}  // namespace architrino::eom

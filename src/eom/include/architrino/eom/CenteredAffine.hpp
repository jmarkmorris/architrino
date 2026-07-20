#pragma once

#include "architrino/eom/Interval.hpp"

#include <vector>

namespace architrino::eom {

using IntervalMapJacobian = std::vector<std::vector<Interval>>;
using PointMapJacobian = std::vector<std::vector<double>>;
using PointCoefficientMatrix = std::vector<std::vector<double>>;

// Centered mean-value propagation for an explicit differentiable map.
// Input coefficient rows are input components; output coefficient rows are
// output components.  Every row uses one aligned shared-symbol registry.
struct CenteredAffineMapRequest {
  std::vector<double> output_center;
  std::vector<Interval> output_center_enclosure;
  IntervalMapJacobian jacobian_on_input_box;
  PointMapJacobian point_jacobian;
  PointCoefficientMatrix input_coefficients;
  std::vector<double> input_remainder_radii;
};

struct CenteredAffineMapCertificate {
  const char* schema = "eom_centered_affine_map/v1";
  bool certified = false;
  std::size_t input_dimension = 0U;
  std::size_t output_dimension = 0U;
  std::size_t shared_symbol_count = 0U;
  PointCoefficientMatrix output_coefficients;
  std::vector<double> center_remainder_radii_upper;
  std::vector<double> jacobian_variation_remainder_radii_upper;
  std::vector<double> input_remainder_image_radii_upper;
  std::vector<double> output_remainder_radii_upper;
};

// Applies the centered-form consequence of the multivariable mean-value
// theorem.  Soundness requires the supplied interval Jacobian to enclose every
// derivative on the complete input box; this consumer does not prove that
// upstream obligation.
[[nodiscard]] CenteredAffineMapCertificate certify_centered_affine_map(
    const CenteredAffineMapRequest& request);

}  // namespace architrino::eom

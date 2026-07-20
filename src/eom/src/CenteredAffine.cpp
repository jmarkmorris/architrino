#include "architrino/eom/CenteredAffine.hpp"

#include <algorithm>
#include <cmath>
#include <stdexcept>
#include <string>

namespace architrino::eom {
namespace {

double radius_about(const Interval& value, double center) {
  return std::max(center - value.lower(), value.upper() - center);
}

double outward_sum(double left, double right) {
  return (Interval::point(left) + Interval::point(right)).upper();
}

void require_finite_nonnegative(double value, const char* label) {
  if (!std::isfinite(value) || value < 0.0) {
    throw std::invalid_argument(
        std::string(label) + " must be finite and nonnegative");
  }
}

}  // namespace

CenteredAffineMapCertificate certify_centered_affine_map(
    const CenteredAffineMapRequest& request) {
  const std::size_t output_dimension = request.output_center.size();
  const std::size_t input_dimension = request.input_coefficients.size();
  if (output_dimension == 0U || input_dimension == 0U ||
      request.output_center_enclosure.size() != output_dimension ||
      request.jacobian_on_input_box.size() != output_dimension ||
      request.point_jacobian.size() != output_dimension ||
      request.input_remainder_radii.size() != input_dimension) {
    throw std::invalid_argument("centered affine map dimensions disagree");
  }
  const std::size_t symbol_count = request.input_coefficients.front().size();
  for (std::size_t input = 0U; input < input_dimension; ++input) {
    if (request.input_coefficients[input].size() != symbol_count) {
      throw std::invalid_argument(
          "centered affine input symbol registries are not aligned");
    }
    require_finite_nonnegative(
        request.input_remainder_radii[input], "input remainder radius");
  }

  CenteredAffineMapCertificate result;
  result.input_dimension = input_dimension;
  result.output_dimension = output_dimension;
  result.shared_symbol_count = symbol_count;
  result.output_coefficients.assign(
      output_dimension, std::vector<double>(symbol_count, 0.0));
  result.center_remainder_radii_upper.assign(output_dimension, 0.0);
  result.jacobian_variation_remainder_radii_upper.assign(
      output_dimension, 0.0);
  result.input_remainder_image_radii_upper.assign(output_dimension, 0.0);
  result.output_remainder_radii_upper.assign(output_dimension, 0.0);

  for (std::size_t output = 0U; output < output_dimension; ++output) {
    if (request.jacobian_on_input_box[output].size() != input_dimension ||
        request.point_jacobian[output].size() != input_dimension) {
      throw std::invalid_argument("centered affine Jacobian is not rectangular");
    }
    if (!std::isfinite(request.output_center[output]) ||
        !Interval::point(request.output_center[output]).subset_of(
            request.output_center_enclosure[output])) {
      throw std::invalid_argument(
          "centered affine output center is outside its enclosure");
    }
    result.center_remainder_radii_upper[output] = radius_about(
        request.output_center_enclosure[output],
        request.output_center[output]);

    for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
      Interval point_coefficient = Interval::point(0.0);
      Interval variation = Interval::point(0.0);
      for (std::size_t input = 0U; input < input_dimension; ++input) {
        const double point_derivative = request.point_jacobian[output][input];
        if (!std::isfinite(point_derivative) ||
            !std::isfinite(request.input_coefficients[input][symbol])) {
          throw std::invalid_argument(
              "centered affine coefficient data must be finite");
        }
        const Interval input_coefficient =
            Interval::point(request.input_coefficients[input][symbol]);
        point_coefficient = point_coefficient +
            Interval::point(point_derivative) * input_coefficient;
        variation = variation +
            (request.jacobian_on_input_box[output][input] -
             Interval::point(point_derivative)) * input_coefficient;
      }
      const double coefficient = point_coefficient.midpoint();
      result.output_coefficients[output][symbol] = coefficient;
      result.center_remainder_radii_upper[output] = outward_sum(
          result.center_remainder_radii_upper[output],
          radius_about(point_coefficient, coefficient));
      result.jacobian_variation_remainder_radii_upper[output] = outward_sum(
          result.jacobian_variation_remainder_radii_upper[output],
          std::max(std::abs(variation.lower()),
                   std::abs(variation.upper())));
    }

    Interval input_remainder_image = Interval::point(0.0);
    for (std::size_t input = 0U; input < input_dimension; ++input) {
      const double radius = request.input_remainder_radii[input];
      input_remainder_image = input_remainder_image +
          request.jacobian_on_input_box[output][input] *
              Interval(-radius, radius);
    }
    result.input_remainder_image_radii_upper[output] = std::max(
        std::abs(input_remainder_image.lower()),
        std::abs(input_remainder_image.upper()));
    result.output_remainder_radii_upper[output] = outward_sum(
        outward_sum(result.center_remainder_radii_upper[output],
                    result.jacobian_variation_remainder_radii_upper[output]),
        result.input_remainder_image_radii_upper[output]);
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

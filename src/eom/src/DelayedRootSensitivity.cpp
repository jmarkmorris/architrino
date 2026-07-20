#include "architrino/eom/DelayedRootSensitivity.hpp"

#include <stdexcept>

namespace architrino::eom {

DelayedRootSensitivityCertificate certify_delayed_root_sensitivity(
    const DelayedRootSensitivityRequest& request) {
  if (request.receiver_position_coefficients.size() !=
      request.transmitter_position_coefficients.size()) {
    throw std::invalid_argument(
        "delayed-root paths must use one aligned symbol registry");
  }
  if (request.field_speed.lower() <= 0.0) {
    throw std::invalid_argument(
        "delayed-root field speed must be strictly positive");
  }

  DelayedRootSensitivityCertificate result;
  result.separation = norm(request.displacement);
  if (result.separation.contains_zero()) {
    result.failure_code = "delayed_root_separation_contains_zero";
    return result;
  }
  result.direction = divide(request.displacement, result.separation);
  result.evaluated_transmitter_factor =
      request.field_speed -
      dot(result.direction, request.transmitter_velocity);
  result.certified_transmitter_factor = request.certified_transmitter_factor;
  const auto factor_intersection = result.evaluated_transmitter_factor.intersection(
      request.certified_transmitter_factor);
  if (!factor_intersection.has_value()) {
    result.failure_code =
        "delayed_root_transmitter_factor_enclosures_disagree";
    return result;
  }
  result.transmitter_factor = *factor_intersection;
  if (result.transmitter_factor.contains_zero()) {
    result.failure_code = "delayed_root_transmitter_factor_contains_zero";
    return result;
  }

  const std::size_t symbol_count =
      request.receiver_position_coefficients.size();
  result.emission_time_coefficients.reserve(symbol_count);
  result.effective_transmitter_position_coefficients.reserve(symbol_count);
  result.delayed_displacement_coefficients.reserve(symbol_count);
  result.linearized_root_residual_coefficients.reserve(symbol_count);
  for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
    const IntervalVector fixed_time_displacement_coefficient = subtract(
        request.receiver_position_coefficients[symbol],
        request.transmitter_position_coefficients[symbol]);
    const Interval fixed_time_residual_coefficient =
        dot(result.direction, fixed_time_displacement_coefficient);
    const Interval emission_time_coefficient =
        Interval::point(0.0) -
        fixed_time_residual_coefficient / result.transmitter_factor;
    const IntervalVector effective_transmitter_coefficient = add(
        request.transmitter_position_coefficients[symbol],
        scale(emission_time_coefficient, request.transmitter_velocity));
    const IntervalVector delayed_displacement_coefficient = subtract(
        request.receiver_position_coefficients[symbol],
        effective_transmitter_coefficient);
    const Interval linearized_root_residual =
        fixed_time_residual_coefficient +
        result.transmitter_factor * emission_time_coefficient;
    if (!linearized_root_residual.contains_zero()) {
      result.failure_code =
          "delayed_root_linearized_residual_does_not_contain_zero";
      return result;
    }
    result.emission_time_coefficients.push_back(emission_time_coefficient);
    result.effective_transmitter_position_coefficients.push_back(
        effective_transmitter_coefficient);
    result.delayed_displacement_coefficients.push_back(
        delayed_displacement_coefficient);
    result.linearized_root_residual_coefficients.push_back(
        linearized_root_residual);
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

#include "architrino/eom/SharpAccelerationSensitivity.hpp"

#include <stdexcept>

namespace architrino::eom {

SharpAccelerationSensitivityCertificate
certify_sharp_acceleration_sensitivity(
    const SharpAccelerationSensitivityRequest& request) {
  const std::size_t symbol_count =
      request.receiver_position_coefficients.size();
  if (request.transmitter_position_coefficients.size() != symbol_count ||
      request.transmitter_velocity_coefficients.size() != symbol_count) {
    throw std::invalid_argument(
        "sharp acceleration paths must use one aligned symbol registry");
  }

  SharpAccelerationSensitivityCertificate result;
  result.delayed_root = certify_delayed_root_sensitivity({
      .displacement = request.displacement,
      .transmitter_velocity = request.transmitter_velocity,
      .field_speed = request.field_speed,
      .certified_transmitter_factor =
          request.certified_transmitter_factor,
      .receiver_position_coefficients =
          request.receiver_position_coefficients,
      .transmitter_position_coefficients =
          request.transmitter_position_coefficients,
  });
  if (!result.delayed_root.certified) {
    result.failure_code = result.delayed_root.failure_code;
    return result;
  }

  const Interval separation = result.delayed_root.separation;
  const Interval transmitter_factor =
      result.delayed_root.transmitter_factor;
  result.acceleration_weight =
      request.field_speed / interval_absolute(transmitter_factor);
  const Interval inverse_r3 = Interval::point(1.0) /
      (interval_square(separation) * separation);
  const Interval inverse_r5 = inverse_r3 / interval_square(separation);
  const IntervalVector inverse_square_direction =
      scale(inverse_r3, request.displacement);
  result.acceleration = scale(
      request.signed_coupling * result.acceleration_weight,
      inverse_square_direction);

  result.effective_transmitter_velocity_coefficients.reserve(symbol_count);
  result.transmitter_factor_coefficients.reserve(symbol_count);
  result.acceleration_coefficients.reserve(symbol_count);
  for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
    const Interval emission_coefficient =
        result.delayed_root.emission_time_coefficients[symbol];
    const IntervalVector effective_transmitter_velocity_coefficient = add(
        request.transmitter_velocity_coefficients[symbol],
        scale(emission_coefficient, request.transmitter_acceleration));
    const IntervalVector displacement_coefficient =
        result.delayed_root.delayed_displacement_coefficients[symbol];
    const Interval radial_coefficient =
        dot(result.delayed_root.direction, displacement_coefficient);
    const IntervalVector direction_coefficient = divide(
        subtract(
            displacement_coefficient,
            scale(radial_coefficient, result.delayed_root.direction)),
        separation);
    const Interval transmitter_factor_coefficient =
        Interval::point(0.0) -
        (dot(direction_coefficient, request.transmitter_velocity) +
         dot(result.delayed_root.direction,
             effective_transmitter_velocity_coefficient));
    const Interval acceleration_weight_coefficient =
        Interval::point(0.0) -
        result.acceleration_weight * transmitter_factor_coefficient /
            transmitter_factor;
    const IntervalVector inverse_square_direction_coefficient = subtract(
        scale(inverse_r3, displacement_coefficient),
        scale(
            Interval::point(3.0) *
                dot(request.displacement, displacement_coefficient) *
                inverse_r5,
            request.displacement));
    const IntervalVector acceleration_coefficient = scale(
        request.signed_coupling,
        add(
            scale(acceleration_weight_coefficient,
                  inverse_square_direction),
            scale(result.acceleration_weight,
                  inverse_square_direction_coefficient)));

    result.effective_transmitter_velocity_coefficients.push_back(
        effective_transmitter_velocity_coefficient);
    result.transmitter_factor_coefficients.push_back(
        transmitter_factor_coefficient);
    result.acceleration_coefficients.push_back(acceleration_coefficient);
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

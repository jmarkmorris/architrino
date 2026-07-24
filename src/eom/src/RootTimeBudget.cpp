#include "architrino/eom/RootTimeBudget.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <stdexcept>
#include <string>

namespace architrino::eom {
namespace {

void require_nonnegative_finite(double value, const char* label) {
  if (!std::isfinite(value) || value < 0.0) {
    throw std::invalid_argument(std::string(label) +
                                " must be finite and nonnegative");
  }
}

double magnitude_upper(const Interval& value) {
  return std::max(std::abs(value.lower()), std::abs(value.upper()));
}

Interval nonnegative_point(double value) {
  require_nonnegative_finite(value, "nonnegative interval point");
  return Interval::point(value);
}

}  // namespace

RootTimeBudgetCertificate certify_root_time_budget(
    const RootTimeBudgetRequest& request) {
  RootTimeBudgetCertificate result;
  result.root_time_tolerance = request.root_time_tolerance;
  require_nonnegative_finite(
      request.root_time_tolerance, "root-time tolerance");
  for (const double radius : request.independent_remainder_radii) {
    require_nonnegative_finite(radius, "independent remainder radius");
  }
  for (const auto& coefficient : request.shared_symbol_coefficients) {
    for (const double value : coefficient) {
      if (!std::isfinite(value)) {
        throw std::invalid_argument("shared-symbol coefficient must be finite");
      }
    }
  }
  for (const double value : request.nominal_displacement) {
    if (!std::isfinite(value)) {
      throw std::invalid_argument("nominal displacement must be finite");
    }
  }

  if (!request.transmitter_factor.excludes_zero()) {
    result.failure_code = "transmitter_factor_contains_zero";
    return result;
  }
  result.transmitter_factor_magnitude_lower = std::min(
      std::abs(request.transmitter_factor.lower()),
      std::abs(request.transmitter_factor.upper()));

  const IntervalVector nominal{
      Interval::point(request.nominal_displacement[0]),
      Interval::point(request.nominal_displacement[1]),
      Interval::point(request.nominal_displacement[2])};
  const Interval separation = norm(nominal);
  result.nominal_separation_lower = separation.lower();
  if (!(separation.lower() > 0.0)) {
    result.failure_code = "nominal_separation_contains_zero";
    return result;
  }
  const IntervalVector direction = divide(nominal, separation);

  Interval projected_affine_radius = Interval::point(0.0);
  std::array<Interval, 3> axis_radii{
      Interval::point(request.independent_remainder_radii[0]),
      Interval::point(request.independent_remainder_radii[1]),
      Interval::point(request.independent_remainder_radii[2])};
  for (const auto& coefficient : request.shared_symbol_coefficients) {
    const IntervalVector coefficient_vector{
        Interval::point(coefficient[0]),
        Interval::point(coefficient[1]),
        Interval::point(coefficient[2])};
    projected_affine_radius = projected_affine_radius +
        nonnegative_point(magnitude_upper(dot(direction, coefficient_vector)));
    for (std::size_t axis = 0U; axis < axis_radii.size(); ++axis) {
      axis_radii[axis] = axis_radii[axis] +
          nonnegative_point(std::abs(coefficient[axis]));
    }
  }
  result.projected_affine_radius_upper = projected_affine_radius.upper();

  Interval projected_remainder_radius = Interval::point(0.0);
  for (std::size_t axis = 0U; axis < axis_radii.size(); ++axis) {
    projected_remainder_radius = projected_remainder_radius +
        nonnegative_point(magnitude_upper(direction[axis])) *
        nonnegative_point(request.independent_remainder_radii[axis]);
  }
  result.projected_remainder_radius_upper =
      projected_remainder_radius.upper();

  const Interval squared_displacement_radius =
      interval_square(axis_radii[0]) +
      interval_square(axis_radii[1]) +
      interval_square(axis_radii[2]);
  const Interval displacement_radius = interval_sqrt(Interval(
      std::max(0.0, squared_displacement_radius.lower()),
      squared_displacement_radius.upper()));
  result.displacement_radius_upper = displacement_radius.upper();
  if (!(displacement_radius.upper() < separation.lower())) {
    result.failure_code = "displacement_ball_reaches_zero_separation";
    return result;
  }

  // Along d0+s*delta, ||H ||d|| || <= 1/(||d0||-||delta||).  Taylor's
  // theorem gives a one-sided remainder no larger than
  // ||delta||^2/(2*(||d0||-||delta||)).
  const Interval denominator =
      nonnegative_point(2.0) *
      (separation - nonnegative_point(displacement_radius.upper()));
  const Interval nonlinear_remainder_radius =
      interval_square(displacement_radius) / denominator;
  result.nonlinear_remainder_radius_upper =
      nonlinear_remainder_radius.upper();

  const Interval residual_width = nonnegative_point(2.0) *
      (projected_affine_radius + projected_remainder_radius +
       nonlinear_remainder_radius);
  result.residual_width_upper = residual_width.upper();
  const Interval root_time_width = residual_width /
      nonnegative_point(result.transmitter_factor_magnitude_lower);
  result.root_time_width_upper = root_time_width.upper();
  result.certified =
      result.root_time_width_upper <= request.root_time_tolerance;
  if (!result.certified) {
    result.failure_code = "root_time_budget_exceeded";
  }
  return result;
}

}  // namespace architrino::eom

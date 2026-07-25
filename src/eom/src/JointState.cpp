#include "architrino/eom/JointState.hpp"

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

double outward_sum(double left, double right) {
  if (left == 0.0) return right;
  if (right == 0.0) return left;
  return (Interval::point(left) + Interval::point(right)).upper();
}

std::array<double, 3> projection_radii(
    const JointAffinePathPosition& path) {
  std::array<double, 3> result = path.independent_remainder_radii;
  for (const auto& coefficient : path.shared_symbol_coefficients) {
    for (std::size_t axis = 0U; axis < result.size(); ++axis) {
      result[axis] = outward_sum(result[axis], std::abs(coefficient[axis]));
    }
  }
  return result;
}

bool fallback_dominates(
    const std::array<double, 3>& projection,
    const std::array<double, 3>& ordinary) {
  for (std::size_t axis = 0U; axis < projection.size(); ++axis) {
    if (projection[axis] > ordinary[axis]) return false;
  }
  return true;
}

void validate_path(const JointAffinePathPosition& path) {
  if (path.path_id.empty()) {
    throw std::invalid_argument("joint path identity must be nonempty");
  }
  for (const auto& coefficient : path.shared_symbol_coefficients) {
    for (const double value : coefficient) {
      if (!std::isfinite(value)) {
        throw std::invalid_argument("joint coefficient must be finite");
      }
    }
  }
  for (const double radius : path.independent_remainder_radii) {
    require_nonnegative_finite(radius, "joint remainder radius");
  }
  for (const double radius : path.ordinary_position_radii) {
    require_nonnegative_finite(radius, "ordinary position radius");
  }
}

}  // namespace

JointRootTimeConsumptionCertificate certify_joint_root_time_consumption(
    const JointRootTimeConsumptionRequest& request) {
  validate_path(request.receiver);
  validate_path(request.transmitter);
  if (request.receiver.path_id == request.transmitter.path_id) {
    throw std::invalid_argument(
        "cross-path joint consumption requires distinct path identities");
  }
  if (request.receiver.shared_symbol_coefficients.size() !=
      request.transmitter.shared_symbol_coefficients.size()) {
    throw std::invalid_argument(
        "joint paths must use one aligned shared-symbol registry");
  }

  JointRootTimeConsumptionCertificate result;
  result.shared_symbol_count =
      request.receiver.shared_symbol_coefficients.size();
  result.receiver_projection_radii_upper = projection_radii(request.receiver);
  result.transmitter_projection_radii_upper =
      projection_radii(request.transmitter);
  result.receiver_fallback_dominates = fallback_dominates(
      result.receiver_projection_radii_upper,
      request.receiver.ordinary_position_radii);
  result.transmitter_fallback_dominates = fallback_dominates(
      result.transmitter_projection_radii_upper,
      request.transmitter.ordinary_position_radii);
  if (!result.receiver_fallback_dominates ||
      !result.transmitter_fallback_dominates) {
    result.failure_code = "ordinary_fallback_does_not_dominate_joint_state";
    return result;
  }

  std::vector<std::array<double, 3>> difference_coefficients;
  difference_coefficients.reserve(result.shared_symbol_count);
  result.displacement_remainder_radii_upper = {
      outward_sum(request.receiver.independent_remainder_radii[0],
                  request.transmitter.independent_remainder_radii[0]),
      outward_sum(request.receiver.independent_remainder_radii[1],
                  request.transmitter.independent_remainder_radii[1]),
      outward_sum(request.receiver.independent_remainder_radii[2],
                  request.transmitter.independent_remainder_radii[2])};
  for (std::size_t symbol = 0U; symbol < result.shared_symbol_count; ++symbol) {
    std::array<double, 3> difference{};
    for (std::size_t axis = 0U; axis < difference.size(); ++axis) {
      const Interval exact_difference =
          Interval::point(
              request.receiver.shared_symbol_coefficients[symbol][axis]) -
          Interval::point(
              request.transmitter.shared_symbol_coefficients[symbol][axis]);
      difference[axis] = exact_difference.midpoint();
      const Interval centered_difference =
          exact_difference - Interval::point(difference[axis]);
      const double rounding_radius = std::max(
          std::abs(centered_difference.lower()),
          std::abs(centered_difference.upper()));
      result.displacement_remainder_radii_upper[axis] = outward_sum(
          result.displacement_remainder_radii_upper[axis], rounding_radius);
    }
    difference_coefficients.push_back(difference);
  }

  result.joint_budget = certify_root_time_budget({
      .nominal_displacement = request.nominal_displacement,
      .shared_symbol_coefficients = std::move(difference_coefficients),
      .independent_remainder_radii =
          result.displacement_remainder_radii_upper,
      .transmitter_factor = request.transmitter_factor,
      .root_time_tolerance = request.root_time_tolerance,
  });
  const std::array<double, 3> ordinary_displacement_radii{
      outward_sum(request.receiver.ordinary_position_radii[0],
                  request.transmitter.ordinary_position_radii[0]),
      outward_sum(request.receiver.ordinary_position_radii[1],
                  request.transmitter.ordinary_position_radii[1]),
      outward_sum(request.receiver.ordinary_position_radii[2],
                  request.transmitter.ordinary_position_radii[2])};
  result.ordinary_box_budget = certify_root_time_budget({
      .nominal_displacement = request.nominal_displacement,
      .shared_symbol_coefficients = {},
      .independent_remainder_radii = ordinary_displacement_radii,
      .transmitter_factor = request.transmitter_factor,
      .root_time_tolerance = request.root_time_tolerance,
  });
  result.certified = result.joint_budget.certified;
  if (!result.certified) {
    result.failure_code = result.joint_budget.failure_code;
  }
  return result;
}

}  // namespace architrino::eom

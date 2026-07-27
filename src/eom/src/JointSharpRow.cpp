#include "architrino/eom/JointSharpRow.hpp"

#include <algorithm>
#include <cmath>
#include <iomanip>
#include <sstream>
#include <stdexcept>

namespace architrino::eom {
namespace {

IntervalVector point_vector(const std::array<double, 3>& value) {
  return {Interval::point(value[0]), Interval::point(value[1]),
          Interval::point(value[2])};
}

double magnitude_upper(const Interval& value) {
  return std::max(std::abs(value.lower()), std::abs(value.upper()));
}

double outward_sum(double left, double right) {
  if (left == 0.0) return right;
  if (right == 0.0) return left;
  return (Interval::point(left) + Interval::point(right)).upper();
}

bool affine_vector_inside(
    const IntervalVector& center,
    std::span<const std::array<double, 3>> coefficients,
    const std::array<double, 3>& remainder,
    const IntervalVector& box) {
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    double radius = remainder[axis];
    for (const auto& coefficient : coefficients) {
      if (coefficient[axis] == 0.0) continue;
      radius = outward_sum(radius, std::abs(coefficient[axis]));
    }
    const Interval image = center[axis] + Interval(-radius, radius);
    if (!image.subset_of(box[axis])) return false;
  }
  return true;
}

std::string affine_containment_diagnostic(
    const char* state,
    const IntervalVector& center,
    std::span<const std::array<double, 3>> coefficients,
    const std::array<double, 3>& remainder,
    const IntervalVector& box) {
  double worst_ratio = 0.0;
  double worst_projection = 0.0;
  double worst_available = 0.0;
  std::size_t worst_axis = 0U;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    double projection = remainder[axis];
    for (const auto& coefficient : coefficients) {
      if (coefficient[axis] == 0.0) continue;
      projection = outward_sum(
          projection, std::abs(coefficient[axis]));
    }
    const double available = std::min(
        center[axis].lower() - box[axis].lower(),
        box[axis].upper() - center[axis].upper());
    const double ratio = available > 0.0
        ? projection / available
        : (projection == 0.0 && available == 0.0
               ? 0.0
               : std::numeric_limits<double>::infinity());
    if (ratio > worst_ratio) {
      worst_ratio = ratio;
      worst_projection = projection;
      worst_available = available;
      worst_axis = axis;
    }
  }
  std::ostringstream stream;
  stream << "/state=" << state << "/axis=" << worst_axis
         << "/ratio=" << std::setprecision(17) << worst_ratio
         << "/projection=" << worst_projection
         << "/available=" << worst_available;
  return stream.str();
}

std::vector<IntervalVector> interval_rows(
    std::span<const std::array<double, 3>> rows) {
  std::vector<IntervalVector> result;
  result.reserve(rows.size());
  for (const auto& row : rows) result.push_back(point_vector(row));
  return result;
}

std::string interval_diagnostic(const Interval& value) {
  std::ostringstream stream;
  stream << std::setprecision(17) << value.lower() << "," << value.upper();
  return stream.str();
}

}  // namespace

JointSharpRowCertificate certify_joint_sharp_row(
    const JointSharpRowRequest& request) {
  const std::size_t symbol_count =
      request.receiver_position_coefficients.size();
  if (request.transmitter_position_coefficients.size() != symbol_count ||
      request.transmitter_velocity_coefficients.size() != symbol_count) {
    throw std::invalid_argument(
        "joint sharp row symbol registries are not aligned");
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (!std::isfinite(request.receiver_position_remainder_radii[axis]) ||
        !std::isfinite(request.transmitter_position_remainder_radii[axis]) ||
        !std::isfinite(request.transmitter_velocity_remainder_radii[axis]) ||
        request.receiver_position_remainder_radii[axis] < 0.0 ||
        request.transmitter_position_remainder_radii[axis] < 0.0 ||
        request.transmitter_velocity_remainder_radii[axis] < 0.0) {
      throw std::invalid_argument(
          "joint sharp row remainder radii must be nonnegative");
    }
  }

  JointSharpRowCertificate result;
  std::vector<std::array<double, 3>> displacement_coefficients(symbol_count);
  std::array<double, 3> displacement_remainder{
      outward_sum(request.receiver_position_remainder_radii[0],
                  request.transmitter_position_remainder_radii[0]),
      outward_sum(request.receiver_position_remainder_radii[1],
                  request.transmitter_position_remainder_radii[1]),
      outward_sum(request.receiver_position_remainder_radii[2],
                  request.transmitter_position_remainder_radii[2])};
  for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const double receiver_coefficient =
          request.receiver_position_coefficients[symbol][axis];
      const double transmitter_coefficient =
          request.transmitter_position_coefficients[symbol][axis];
      const Interval difference = receiver_coefficient == transmitter_coefficient
          ? Interval::point(0.0)
          : Interval::point(receiver_coefficient) -
                Interval::point(transmitter_coefficient);
      displacement_coefficients[symbol][axis] = difference.midpoint();
      displacement_remainder[axis] = outward_sum(
          displacement_remainder[axis],
          magnitude_upper(
              difference - Interval::point(
                  displacement_coefficients[symbol][axis])));
    }
  }
  result.input_boxes_dominate = affine_vector_inside(
      request.point_displacement, displacement_coefficients,
      displacement_remainder, request.displacement_box) &&
      affine_vector_inside(
          request.point_transmitter_velocity,
          request.transmitter_velocity_coefficients,
          request.transmitter_velocity_remainder_radii,
          request.transmitter_velocity_box);
  if (!result.input_boxes_dominate) {
    const bool displacement_inside = affine_vector_inside(
        request.point_displacement, displacement_coefficients,
        displacement_remainder, request.displacement_box);
    result.failure_code = "joint_sharp_input_box_does_not_dominate" +
        (displacement_inside
             ? affine_containment_diagnostic(
                   "transmitter_velocity",
                   request.point_transmitter_velocity,
                   request.transmitter_velocity_coefficients,
                   request.transmitter_velocity_remainder_radii,
                   request.transmitter_velocity_box)
             : affine_containment_diagnostic(
                   "delayed_displacement", request.point_displacement,
                   displacement_coefficients, displacement_remainder,
                   request.displacement_box));
    return result;
  }

  auto box_receiver = interval_rows(request.receiver_position_coefficients);
  auto box_transmitter = interval_rows(
      request.transmitter_position_coefficients);
  auto box_transmitter_velocity = interval_rows(
      request.transmitter_velocity_coefficients);
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    IntervalVector receiver_basis{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    receiver_basis[axis] =
        Interval::point(request.receiver_position_remainder_radii[axis]);
    box_receiver.push_back(receiver_basis);
    box_transmitter.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});
    box_transmitter_velocity.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});

    IntervalVector transmitter_basis{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    transmitter_basis[axis] =
        Interval::point(request.transmitter_position_remainder_radii[axis]);
    box_receiver.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});
    box_transmitter.push_back(transmitter_basis);
    box_transmitter_velocity.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});

    IntervalVector velocity_basis{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    velocity_basis[axis] =
        Interval::point(request.transmitter_velocity_remainder_radii[axis]);
    box_receiver.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});
    box_transmitter.push_back({
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)});
    box_transmitter_velocity.push_back(velocity_basis);
  }

  const auto box = certify_sharp_acceleration_sensitivity({
      .displacement = request.displacement_box,
      .transmitter_velocity = request.transmitter_velocity_box,
      .transmitter_acceleration = request.transmitter_acceleration_box,
      .field_speed = request.field_speed,
      .certified_transmitter_factor =
          request.certified_transmitter_factor,
      .signed_coupling = request.signed_coupling,
      .receiver_position_coefficients = box_receiver,
      .transmitter_position_coefficients = box_transmitter,
      .transmitter_velocity_coefficients = box_transmitter_velocity,
  });
  const auto point_receiver =
      interval_rows(request.receiver_position_coefficients);
  const auto point_transmitter =
      interval_rows(request.transmitter_position_coefficients);
  const auto point_transmitter_velocity =
      interval_rows(request.transmitter_velocity_coefficients);
  const auto point = certify_sharp_acceleration_sensitivity({
      .displacement = request.point_displacement,
      .transmitter_velocity = request.point_transmitter_velocity,
      .transmitter_acceleration = request.transmitter_acceleration_box,
      .field_speed = request.field_speed,
      .certified_transmitter_factor =
          request.certified_transmitter_factor,
      .signed_coupling = request.signed_coupling,
      .receiver_position_coefficients = point_receiver,
      .transmitter_position_coefficients = point_transmitter,
      .transmitter_velocity_coefficients = point_transmitter_velocity,
  });
  if (!box.certified || !point.certified) {
    const auto& failed = !box.certified ? box : point;
    result.failure_code = failed.failure_code;
    if (failed.failure_code ==
        "delayed_root_transmitter_factor_enclosures_disagree") {
      result.failure_code +=
          "/evaluated=" + interval_diagnostic(
              failed.delayed_root.evaluated_transmitter_factor) +
          "/certified=" + interval_diagnostic(
              failed.delayed_root.certified_transmitter_factor) +
          "/variant=" + (!box.certified ? "box" : "point");
    }
    return result;
  }

  result.acceleration_coefficients.resize(symbol_count);
  const IntervalVector zero_vector{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  result.acceleration_coefficient_enclosures.assign(
      symbol_count, zero_vector);
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    result.acceleration_center[axis] = point.acceleration[axis].midpoint();
    result.acceleration_remainder_radii_upper[axis] = magnitude_upper(
        point.acceleration[axis] -
        Interval::point(result.acceleration_center[axis]));
  }
  for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const Interval point_coefficient =
          point.acceleration_coefficients[symbol][axis];
      const double coefficient = point_coefficient.midpoint();
      result.acceleration_coefficients[symbol][axis] = coefficient;
      result.acceleration_coefficient_enclosures[symbol][axis] =
          box.acceleration_coefficients[symbol][axis];
      result.acceleration_remainder_radii_upper[axis] = outward_sum(
          result.acceleration_remainder_radii_upper[axis],
          magnitude_upper(point_coefficient - Interval::point(coefficient)));
    }
  }
  for (std::size_t symbol = symbol_count;
       symbol < box.acceleration_coefficients.size(); ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      result.acceleration_remainder_radii_upper[axis] = outward_sum(
          result.acceleration_remainder_radii_upper[axis],
          magnitude_upper(box.acceleration_coefficients[symbol][axis]));
    }
  }
  result.accepted_acceleration_dominates = true;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    double projection = result.acceleration_remainder_radii_upper[axis];
    for (const auto& coefficient :
         result.acceleration_coefficient_enclosures) {
      projection = outward_sum(
          projection, magnitude_upper(coefficient[axis]));
    }
    result.acceleration_projection_radii_upper[axis] = projection;
    const Interval image = Interval::point(result.acceleration_center[axis]) +
        Interval(-projection, projection);
    result.accepted_acceleration_dominates =
        result.accepted_acceleration_dominates &&
        image.subset_of(request.accepted_acceleration_enclosure[axis]);
  }
  if (!result.accepted_acceleration_dominates) {
    result.failure_code =
        "accepted_acceleration_does_not_dominate_joint_sharp_row";
    return result;
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

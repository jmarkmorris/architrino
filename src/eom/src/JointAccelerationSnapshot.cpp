#include "architrino/eom/JointAccelerationSnapshot.hpp"

#include <algorithm>
#include <cmath>
#include <cstdlib>
#include <iomanip>
#include <limits>
#include <sstream>
#include <stdexcept>

namespace architrino::eom {
namespace {

const NativePublishedPath& ordinary_history(
    const std::vector<NativePublishedPath>& histories,
    const std::string& path_id) {
  const auto found = std::find_if(
      histories.begin(), histories.end(), [&](const auto& path) {
        return path.path_id == path_id;
      });
  if (found == histories.end()) {
    throw std::invalid_argument(
        "joint snapshot lacks an ordinary path history");
  }
  return *found;
}

std::array<double, 3> radii(const IntervalVector& value) {
  return {0.5 * value[0].width(), 0.5 * value[1].width(),
          0.5 * value[2].width()};
}

IntervalVector point_vector(const std::array<double, 3>& value) {
  return {Interval::point(value[0]), Interval::point(value[1]),
          Interval::point(value[2])};
}

double magnitude_upper(const Interval& value) {
  return std::max(std::abs(value.lower()), std::abs(value.upper()));
}

Interval centered_representation_hull(
    const Interval& value,
    std::size_t accumulated_row_count) {
  const double center = value.midpoint();
  const double radius = magnitude_upper(value - Interval::point(center));
  const double rounding_envelope =
      joint_acceleration_representation_rounding_envelope(
          value, accumulated_row_count);
  return Interval::point(center) + Interval(-radius, radius) +
      Interval(-rounding_envelope, rounding_envelope);
}

double outward_sum(double left, double right) {
  return (Interval::point(left) + Interval::point(right)).upper();
}

bool permits_accepted_acceleration_fallback(const std::string& failure_code) {
  return failure_code.starts_with(
             "joint_sharp_input_box_does_not_dominate") ||
      failure_code ==
          "accepted_acceleration_does_not_dominate_joint_sharp_row";
}

bool is_certified_nonsharp_row(const NativeAccelerationRow& row) {
  return
      (row.chart == "finite_width_pair" &&
       row.acceptance_status == "consumed_certified_finite_width_pair") ||
      (row.chart == "far_field_enclosure" &&
       row.acceptance_status == "consumed_certified_far_field_enclosure");
}

JointSharpRowCertificate accepted_acceleration_fallback(
    const IntervalVector& accepted_acceleration,
    std::size_t symbol_count) {
  JointSharpRowCertificate result;
  result.certified = true;
  result.used_accepted_acceleration_fallback = true;
  result.acceleration_coefficients.assign(
      symbol_count, std::array<double, 3>{0.0, 0.0, 0.0});
  result.acceleration_coefficient_enclosures.assign(
      symbol_count,
      IntervalVector{
          Interval::point(0.0), Interval::point(0.0),
          Interval::point(0.0)});
  result.accepted_acceleration_dominates = true;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const double center = accepted_acceleration[axis].midpoint();
    const double radius = magnitude_upper(
        accepted_acceleration[axis] - Interval::point(center));
    result.acceleration_center[axis] = center;
    result.acceleration_remainder_radii_upper[axis] = radius;
    result.acceleration_projection_radii_upper[axis] = radius;
    const Interval image =
        Interval::point(center) + Interval(-radius, radius);
    result.accepted_acceleration_dominates =
        result.accepted_acceleration_dominates &&
        image.subset_of(accepted_acceleration[axis]);
  }
  return result;
}

IntervalVector acceleration_hull(
    const RetainedHistory& history,
    const NativeAccelerationRow& row,
    const Interval& emission) {
  bool initialized = false;
  IntervalVector result{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (const std::size_t index : row.transmitter_segment_indices) {
    if (index >= history.segments().size()) continue;
    const auto& segment = history.segments()[index];
    const Interval segment_time(
        segment.t_start_interval().lower(),
        segment.t_end_interval().upper());
    const auto overlap = emission.intersection(segment_time);
    if (!overlap.has_value()) continue;
    const Interval local = *overlap - segment.t_start_interval();
    IntervalVector candidate{
        Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const auto& tokens = segment.coefficient_tokens()[axis];
      candidate[axis] =
          Interval::point(2.0) * Interval::decimal_token(tokens[2]) +
          Interval::point(6.0) * Interval::decimal_token(tokens[3]) * local;
    }
    result = initialized ? hull(result, candidate) : candidate;
    initialized = true;
  }
  if (!initialized) {
    throw std::invalid_argument(
        "joint snapshot row has no acceleration-covered source segment");
  }
  return result;
}

const NativeReceiverAcceleration& accepted_total(
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& path_id) {
  const auto found = std::find_if(
      snapshot.acceleration.receiver_totals.begin(),
      snapshot.acceleration.receiver_totals.end(), [&](const auto& row) {
        return row.receiver_path_id == path_id;
      });
  if (found == snapshot.acceleration.receiver_totals.end()) {
    throw std::invalid_argument(
        "joint snapshot lacks accepted receiver acceleration");
  }
  return *found;
}

std::size_t source_segment_at_center(
    const NativeAccelerationRow& row,
    const RetainedHistory& ordinary_history,
    const JointAffineRetainedHistory& joint_history,
    double emission_center,
    const std::array<double, 3>& receiver_position,
    const Interval& field_speed) {
  if (ordinary_history.segments().size() != joint_history.segments().size()) {
    throw std::invalid_argument(
        "joint snapshot ordinary and joint segment registries disagree");
  }
  std::optional<std::size_t> first_covering;
  for (const std::size_t index : row.transmitter_segment_indices) {
    if (index >= ordinary_history.segments().size()) continue;
    const auto& segment = ordinary_history.segments()[index];
    const double scale = std::max(
        {1.0, std::abs(emission_center), std::abs(segment.t_start()),
         std::abs(segment.t_end())});
    const double envelope =
        32.0 * std::numeric_limits<double>::epsilon() * scale;
    if (emission_center >= segment.t_start() - envelope &&
        emission_center <= segment.t_end() + envelope) {
      if (!first_covering.has_value()) first_covering = index;
      const auto transmitter_position =
          segment.nominal_position(emission_center);
      const auto displacement = subtract(
          point_vector(receiver_position), point_vector(transmitter_position));
      const Interval separation = norm(displacement);
      if (separation.contains_zero() || !row.transmitter_factor.has_value()) {
        continue;
      }
      const auto direction = divide(displacement, separation);
      const Interval point_factor = field_speed - dot(
          direction, point_vector(segment.nominal_velocity(emission_center)));
      if (point_factor.intersection(*row.transmitter_factor).has_value()) {
        return index;
      }
    }
  }
  if (first_covering.has_value()) return *first_covering;
  throw std::invalid_argument(
      "joint snapshot root source segments do not cover the emission center");
}

}  // namespace

double joint_acceleration_representation_rounding_envelope(
    const Interval& value,
    std::size_t accumulated_row_count) {
  const double center = value.midpoint();
  const double radius = magnitude_upper(value - Interval::point(center));
  const double scale = std::max({
      std::abs(value.lower()), std::abs(value.upper()), std::abs(center),
      radius, std::numeric_limits<double>::min()});
  return (8.0 + 2.0 * static_cast<double>(accumulated_row_count)) *
      std::numeric_limits<double>::epsilon() * scale;
}

JointAccelerationSnapshotCertificate certify_joint_acceleration_snapshot(
    const Interval& field_speed,
    const NativeAccelerationSnapshotCertificate& snapshot,
    const std::vector<NativePublishedPath>& ordinary_histories,
    const std::map<std::string, JointAffineRetainedHistory>& joint_histories) {
  JointAccelerationSnapshotCertificate result;
  if (snapshot.status != "certified_complete") {
    result.failure_code = "joint_snapshot_requires_certified_snapshot";
    return result;
  }
  if (joint_histories.empty()) {
    result.failure_code = "joint_snapshot_lacks_joint_histories";
    return result;
  }
  const auto& registry = joint_histories.begin()->second.symbol_registry();
  result.shared_symbol_count = registry.size();
  for (const auto& [path_id, history] : joint_histories) {
    static_cast<void>(path_id);
    if (history.symbol_registry() != registry) {
      result.failure_code = "joint_snapshot_symbol_registries_disagree";
      return result;
    }
  }

  const double reception = std::strtod(snapshot.reception_time.c_str(), nullptr);
  const Interval reception_interval =
      Interval::decimal_token(snapshot.reception_time);
  for (const auto& receiver_id : snapshot.acceleration.path_ids) {
    const auto receiver_joint_found = joint_histories.find(receiver_id);
    if (receiver_joint_found == joint_histories.end()) {
      result.failure_code = "joint_snapshot_lacks_receiver_history";
      return result;
    }
    const auto& receiver_ordinary =
        ordinary_history(ordinary_histories, receiver_id).history;
    const auto receiver_position_box =
        receiver_ordinary.correlated_position_hull(reception_interval);
    const auto receiver_velocity_box =
        receiver_ordinary.velocity_hull(reception_interval);
    const auto receiver_joint = receiver_joint_found->second.evaluate(
        reception, radii(receiver_position_box), radii(receiver_velocity_box));
    if (!receiver_joint.position_fallback_dominates ||
        !receiver_joint.velocity_fallback_dominates) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        double position_projection =
            receiver_joint.position.independent_remainder_radii[axis];
        double velocity_projection =
            receiver_joint.velocity_remainder_radii[axis];
        for (const auto& coefficient :
             receiver_joint.position.shared_symbol_coefficients) {
          if (coefficient[axis] == 0.0) continue;
          position_projection = outward_sum(
              position_projection, std::abs(coefficient[axis]));
        }
        for (const auto& coefficient :
             receiver_joint.velocity_shared_coefficients) {
          if (coefficient[axis] == 0.0) continue;
          velocity_projection = outward_sum(
              velocity_projection, std::abs(coefficient[axis]));
        }
        const double position_ordinary =
            receiver_joint.position.ordinary_position_radii[axis];
        const double velocity_ordinary =
            receiver_joint.ordinary_velocity_radii[axis];
        result.failure_max_projection_to_ordinary_ratio = std::max({
            result.failure_max_projection_to_ordinary_ratio,
            position_ordinary == 0.0
                ? (position_projection == 0.0 ? 0.0
                                              : std::numeric_limits<double>::infinity())
                : position_projection / position_ordinary,
            velocity_ordinary == 0.0
                ? (velocity_projection == 0.0 ? 0.0
                                              : std::numeric_limits<double>::infinity())
                : velocity_projection / velocity_ordinary,
        });
      }
      result.failure_code =
          "joint_snapshot_receiver_fallback_not_dominant/ratio=" +
          std::to_string(result.failure_max_projection_to_ordinary_ratio) +
          "/projection=" + std::to_string(result.failure_projection_upper) +
          "/ordinary=" + std::to_string(result.failure_ordinary_radius) +
          "/state=" + result.failure_state;
      return result;
    }

    std::vector<JointSharpRowCertificate> rows;
    std::size_t receiver_fallback_rows = 0U;
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      if (pair.receiver_path_id != receiver_id) continue;
      const auto transmitter_joint_found =
          joint_histories.find(pair.transmitter_path_id);
      if (transmitter_joint_found == joint_histories.end()) {
        result.failure_code = "joint_snapshot_lacks_transmitter_history";
        return result;
      }
      const auto& transmitter_ordinary = ordinary_history(
          ordinary_histories, pair.transmitter_path_id).history;
      if (pair.rows.empty()) {
        const bool exact_zero = pair.total_acceleration.has_value() &&
            std::all_of(
                pair.total_acceleration->begin(),
                pair.total_acceleration->end(),
                [](const Interval& value) { return value.is_exact_zero(); });
        if (exact_zero) continue;
        result.failure_code = "joint_snapshot_pair_has_no_consumable_rows";
        return result;
      }
      for (const auto& row : pair.rows) {
        if (row.chart != "sharp_root") {
          if (!is_certified_nonsharp_row(row)) {
            result.failure_code =
                "joint_snapshot_nonsharp_row_not_supported/chart=" +
                row.chart + "/acceptance=" + row.acceptance_status;
            return result;
          }
          rows.push_back(accepted_acceleration_fallback(
              row.acceleration, result.shared_symbol_count));
          ++result.accepted_acceleration_fallback_rows;
          ++receiver_fallback_rows;
          if (row.chart == "finite_width_pair") {
            ++result.consumed_finite_width_rows;
          } else {
            ++result.consumed_far_field_rows;
          }
          continue;
        }
        if (!row.transmitter_factor.has_value()) {
          result.failure_code =
              "joint_snapshot_sharp_row_lacks_transmitter_factor";
          return result;
        }
        const Interval emission = row.evaluation_emission.value_or(Interval(
            Interval::decimal_token(row.emission_lower).lower(),
            Interval::decimal_token(row.emission_upper).upper()));
        const double emission_center = emission.midpoint();
        const auto transmitter_position_box =
            transmitter_ordinary.correlated_position_hull(emission);
        const auto transmitter_velocity_box =
            transmitter_ordinary.velocity_hull(emission);
        const auto receiver_nominal =
            receiver_ordinary.nominal_position(reception);
        const std::size_t source_segment_index = source_segment_at_center(
            row, transmitter_ordinary, transmitter_joint_found->second,
            emission_center, receiver_nominal, field_speed);
        const auto& source_segment =
            transmitter_ordinary.segments()[source_segment_index];
        const auto source_position_box = source_segment.position_interval(
            Interval::point(emission_center));
        const auto source_velocity_box = source_segment.velocity_interval(
            Interval::point(emission_center));
        const JointAffineRetainedHistory source_joint_history(
            pair.transmitter_path_id,
            transmitter_joint_found->second.symbol_registry(),
            {transmitter_joint_found->second.segments()[source_segment_index]});
        const auto transmitter_joint = source_joint_history.evaluate(
            emission_center, radii(source_position_box),
            radii(source_velocity_box));
        if (!transmitter_joint.position_fallback_dominates ||
            !transmitter_joint.velocity_fallback_dominates) {
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            double position_projection =
                transmitter_joint.position.independent_remainder_radii[axis];
            double velocity_projection =
                transmitter_joint.velocity_remainder_radii[axis];
            for (const auto& coefficient :
                 transmitter_joint.position.shared_symbol_coefficients) {
              if (coefficient[axis] == 0.0) continue;
              position_projection = outward_sum(
                  position_projection, std::abs(coefficient[axis]));
            }
            for (const auto& coefficient :
                 transmitter_joint.velocity_shared_coefficients) {
              if (coefficient[axis] == 0.0) continue;
              velocity_projection = outward_sum(
                  velocity_projection, std::abs(coefficient[axis]));
            }
            const double position_ordinary =
                transmitter_joint.position.ordinary_position_radii[axis];
            const double velocity_ordinary =
                transmitter_joint.ordinary_velocity_radii[axis];
            const auto record = [&](double projection, double ordinary,
                                    const char* state) {
              const double ratio = ordinary == 0.0
                  ? (projection == 0.0
                         ? 0.0
                         : std::numeric_limits<double>::infinity())
                  : projection / ordinary;
              if (ratio > result.failure_max_projection_to_ordinary_ratio) {
                result.failure_max_projection_to_ordinary_ratio = ratio;
                result.failure_projection_upper = projection;
                result.failure_ordinary_radius = ordinary;
                result.failure_state = state;
              }
            };
            record(position_projection, position_ordinary,
                   "transmitter_position");
            record(velocity_projection, velocity_ordinary,
                   "transmitter_velocity");
          }
          std::ostringstream fallback_detail;
          fallback_detail << std::setprecision(17)
                          << "joint_snapshot_transmitter_fallback_not_dominant"
                          << "/ratio="
                          << result.failure_max_projection_to_ordinary_ratio
                          << "/projection="
                          << result.failure_projection_upper
                          << "/ordinary="
                          << result.failure_ordinary_radius
                          << "/state=" << result.failure_state
                          << "/symbols=" << result.shared_symbol_count
                          << "/receiver=" << receiver_id
                          << "/transmitter=" << pair.transmitter_path_id
                          << "/segment=" << source_segment_index
                          << "/emission=" << emission_center
                          << "/position_dominates="
                          << transmitter_joint.position_fallback_dominates
                          << "/velocity_dominates="
                          << transmitter_joint.velocity_fallback_dominates;
          std::size_t raw_nonzero_coefficients = 0U;
          double raw_maximum_coefficient = 0.0;
          for (std::size_t axis = 0U; axis < 3U; ++axis) {
            for (std::size_t degree = 0U; degree < 4U; ++degree) {
              for (const double coefficient :
                   source_joint_history.segments()[0]
                       .position_coefficients[axis][degree]) {
                if (coefficient == 0.0) continue;
                ++raw_nonzero_coefficients;
                raw_maximum_coefficient = std::max(
                    raw_maximum_coefficient, std::abs(coefficient));
              }
            }
          }
          fallback_detail << "/raw_nonzero=" << raw_nonzero_coefficients
                          << "/raw_max=" << raw_maximum_coefficient;
          result.failure_code = fallback_detail.str();
          return result;
        }
        const auto transmitter_nominal =
            source_segment.nominal_position(emission_center);
        std::array<double, 3> displacement{};
        for (std::size_t axis = 0U; axis < 3U; ++axis) {
          displacement[axis] =
              receiver_nominal[axis] - transmitter_nominal[axis];
        }
        auto row_certificate = certify_joint_sharp_row({
            .point_displacement = point_vector(displacement),
            .displacement_box = subtract(
                receiver_position_box, transmitter_position_box),
            .point_transmitter_velocity = point_vector(
                source_segment.nominal_velocity(emission_center)),
            .transmitter_velocity_box = transmitter_velocity_box,
            .transmitter_acceleration_box = acceleration_hull(
                transmitter_ordinary, row, emission),
            .field_speed = field_speed,
            .certified_transmitter_factor = *row.transmitter_factor,
            .signed_coupling = Interval::point(
                static_cast<double>(row.polarity)) *
                row.charge_product_magnitude * row.coupling,
            .receiver_position_coefficients =
                receiver_joint.position.shared_symbol_coefficients,
            .transmitter_position_coefficients =
                transmitter_joint.position.shared_symbol_coefficients,
            .transmitter_velocity_coefficients =
                transmitter_joint.velocity_shared_coefficients,
            .receiver_position_remainder_radii =
                receiver_joint.position.independent_remainder_radii,
            .transmitter_position_remainder_radii =
                transmitter_joint.position.independent_remainder_radii,
            .transmitter_velocity_remainder_radii =
                transmitter_joint.velocity_remainder_radii,
            .accepted_acceleration_enclosure = row.acceleration,
        });
        if (!row_certificate.certified &&
            permits_accepted_acceleration_fallback(
                row_certificate.failure_code)) {
          row_certificate = accepted_acceleration_fallback(
              row.acceleration, result.shared_symbol_count);
          ++result.accepted_acceleration_fallback_rows;
          ++receiver_fallback_rows;
        }
        if (!row_certificate.certified) {
          std::ostringstream detail;
          detail << row_certificate.failure_code
                 << "/receiver=" << receiver_id
                 << "/transmitter=" << pair.transmitter_path_id
                 << "/emission=" << std::setprecision(17)
                 << emission.lower() << "," << emission.upper()
                 << "/center=" << emission_center << "/segments=";
          for (const std::size_t index : row.transmitter_segment_indices) {
            if (index >= transmitter_ordinary.segments().size()) continue;
            const auto& diagnostic_segment =
                transmitter_ordinary.segments()[index];
            if (emission_center < diagnostic_segment.t_start() ||
                emission_center > diagnostic_segment.t_end()) {
              detail << index << ":outside;";
              continue;
            }
            const auto diagnostic_displacement = subtract(
                point_vector(receiver_nominal),
                point_vector(diagnostic_segment.nominal_position(
                    emission_center)));
            const auto diagnostic_direction = divide(
                diagnostic_displacement, norm(diagnostic_displacement));
            const auto diagnostic_factor = field_speed - dot(
                diagnostic_direction,
                point_vector(diagnostic_segment.nominal_velocity(
                    emission_center)));
            detail << index << ":" << diagnostic_segment.t_start() << ","
                   << diagnostic_segment.t_end() << ":"
                   << diagnostic_factor.lower() << ","
                   << diagnostic_factor.upper() << ";";
          }
          result.failure_code = detail.str();
          return result;
        }
        rows.push_back(row_certificate);
        ++result.consumed_sharp_rows;
      }
    }

    JointReceiverAccelerationState receiver_state;
    receiver_state.path_id = receiver_id;
    receiver_state.shared_symbol_coefficients.resize(result.shared_symbol_count);
    receiver_state.shared_symbol_coefficient_enclosures.assign(
        result.shared_symbol_count,
        IntervalVector{
            Interval::point(0.0), Interval::point(0.0),
            Interval::point(0.0)});
    std::vector<IntervalVector> center_terms;
    center_terms.reserve(rows.size());
    for (const auto& row : rows) {
      center_terms.push_back(point_vector(row.acceleration_center));
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        receiver_state.independent_remainder_radii[axis] = outward_sum(
            receiver_state.independent_remainder_radii[axis],
            row.acceleration_remainder_radii_upper[axis]);
      }
    }
    const IntervalVector center_sum = fixed_pairwise_sum(center_terms);
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      receiver_state.center[axis] = center_sum[axis].midpoint();
      receiver_state.independent_remainder_radii[axis] = outward_sum(
          receiver_state.independent_remainder_radii[axis],
          magnitude_upper(center_sum[axis] -
              Interval::point(receiver_state.center[axis])));
    }
    for (std::size_t symbol = 0U;
         symbol < result.shared_symbol_count; ++symbol) {
      std::vector<IntervalVector> coefficient_terms;
      coefficient_terms.reserve(rows.size());
      for (const auto& row : rows) {
        coefficient_terms.push_back(
            point_vector(row.acceleration_coefficients[symbol]));
      }
      const IntervalVector coefficient_sum =
          fixed_pairwise_sum(coefficient_terms);
      std::vector<IntervalVector> coefficient_enclosure_terms;
      coefficient_enclosure_terms.reserve(rows.size());
      for (const auto& row : rows) {
        coefficient_enclosure_terms.push_back(
            row.acceleration_coefficient_enclosures[symbol]);
      }
      receiver_state.shared_symbol_coefficient_enclosures[symbol] =
          fixed_pairwise_sum(coefficient_enclosure_terms);
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        const double coefficient = coefficient_sum[axis].midpoint();
        receiver_state.shared_symbol_coefficients[symbol][axis] = coefficient;
        receiver_state.independent_remainder_radii[axis] = outward_sum(
            receiver_state.independent_remainder_radii[axis],
            magnitude_upper(
                coefficient_sum[axis] - Interval::point(coefficient)));
      }
    }
    receiver_state.accepted_total_representation_hull_dominates = true;
    const auto& total = accepted_total(snapshot, receiver_id).acceleration;
    std::string total_failure_detail;
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      double projection = receiver_state.independent_remainder_radii[axis];
      for (const auto& coefficient :
           receiver_state.shared_symbol_coefficient_enclosures) {
        projection = outward_sum(
            projection, magnitude_upper(coefficient[axis]));
      }
      receiver_state.projection_radii_upper[axis] = projection;
      const Interval image = Interval::point(receiver_state.center[axis]) +
          Interval(-projection, projection);
      const Interval accepted_representation_hull =
          centered_representation_hull(total[axis], rows.size());
      const bool axis_dominated =
          image.subset_of(accepted_representation_hull);
      receiver_state.accepted_total_representation_hull_dominates =
          receiver_state.accepted_total_representation_hull_dominates &&
          axis_dominated;
      if (!axis_dominated && total_failure_detail.empty()) {
        const double available = std::min(
            receiver_state.center[axis] - total[axis].lower(),
            total[axis].upper() - receiver_state.center[axis]);
        const double ratio = available > 0.0
            ? projection / available
            : std::numeric_limits<double>::infinity();
        std::ostringstream detail;
        detail << std::setprecision(17)
               << "/receiver=" << receiver_id
               << "/axis=" << axis
               << "/center=" << receiver_state.center[axis]
               << "/projection=" << projection
               << "/available=" << available
               << "/ratio=" << ratio
               << "/image=" << image.lower() << "," << image.upper()
               << "/accepted=" << total[axis].lower() << ","
               << total[axis].upper()
               << "/accepted_representation="
               << accepted_representation_hull.lower() << ","
               << accepted_representation_hull.upper()
               << "/receiver_fallback_rows=" << receiver_fallback_rows
               << "/snapshot_fallback_rows="
               << result.accepted_acceleration_fallback_rows;
        total_failure_detail = detail.str();
      }
    }
    if (!receiver_state.accepted_total_representation_hull_dominates) {
      result.failure_code =
          "accepted_total_representation_hull_does_not_dominate_joint_acceleration" +
          total_failure_detail;
      return result;
    }
    result.receivers.push_back(std::move(receiver_state));
  }
  result.certified = true;
  return result;
}

}  // namespace architrino::eom

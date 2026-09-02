#include "architrino/eom/JointAffineHistory.hpp"
#include "architrino/eom/History.hpp"

#include <algorithm>
#include <bit>
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <limits>
#include <locale>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>

namespace architrino::eom {
namespace {

void require_radius(double value, const char* label) {
  if (!std::isfinite(value) || value < 0.0) {
    throw std::invalid_argument(
        std::string(label) + " must be finite and nonnegative");
  }
}

double outward_sum(double left, double right) {
  return (Interval::point(left) + Interval::point(right)).upper();
}

double radius_about(const Interval& value, double center) {
  return std::max(center - value.lower(), value.upper() - center);
}

void fingerprint_token(std::uint64_t& state, const std::string& token) {
  const auto mix = [&](unsigned char value) {
    state ^= value;
    state *= UINT64_C(1099511628211);
  };
  for (const char value : std::to_string(token.size())) {
    mix(static_cast<unsigned char>(value));
  }
  mix(static_cast<unsigned char>(':'));
  for (const char value : token) {
    mix(static_cast<unsigned char>(value));
  }
}

void fingerprint_double(std::uint64_t& state, double value) {
  fingerprint_token(
      state, std::to_string(std::bit_cast<std::uint64_t>(value)));
}

std::string joint_history_fingerprint(
    const std::string& path_id,
    const std::vector<std::string>& symbol_registry,
    const std::vector<JointAffineCubicSegment>& segments,
    const std::optional<JointAffineEndpointOverride>& endpoint_override) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  fingerprint_token(state, "eom_joint_affine_history/v1");
  fingerprint_token(state, path_id);
  fingerprint_token(state, std::to_string(symbol_registry.size()));
  for (const auto& symbol : symbol_registry) {
    fingerprint_token(state, symbol);
  }
  fingerprint_token(state, std::to_string(segments.size()));
  for (const auto& segment : segments) {
    fingerprint_double(state, segment.start_time);
    fingerprint_double(state, segment.end_time);
    for (const auto& axis : segment.position_coefficients) {
      for (const auto& degree : axis) {
        fingerprint_token(state, std::to_string(degree.size()));
        for (const double coefficient : degree) {
          fingerprint_double(state, coefficient);
        }
      }
    }
    for (const double radius : segment.position_remainder_radii) {
      fingerprint_double(state, radius);
    }
    for (const double radius : segment.velocity_remainder_radii) {
      fingerprint_double(state, radius);
    }
  }
  fingerprint_token(state, endpoint_override.has_value() ? "1" : "0");
  if (endpoint_override.has_value()) {
    fingerprint_double(state, endpoint_override->time);
    for (const auto& coefficient :
         endpoint_override->position_shared_symbol_coefficients) {
      for (const double value : coefficient) fingerprint_double(state, value);
    }
    for (const auto& coefficient :
         endpoint_override->velocity_shared_symbol_coefficients) {
      for (const double value : coefficient) fingerprint_double(state, value);
    }
    for (const double radius : endpoint_override->position_remainder_radii) {
      fingerprint_double(state, radius);
    }
    for (const double radius : endpoint_override->velocity_remainder_radii) {
      fingerprint_double(state, radius);
    }
  }
  std::ostringstream stream;
  stream.imbue(std::locale::classic());
  stream << "fnv1a64-joint-v1:" << std::hex << std::setw(16)
         << std::setfill('0') << state;
  return stream.str();
}

void validate_segment(
    const JointAffineCubicSegment& segment,
    std::size_t symbol_count) {
  if (!std::isfinite(segment.start_time) ||
      !std::isfinite(segment.end_time) ||
      !(segment.end_time > segment.start_time)) {
    throw std::invalid_argument(
        "joint affine segment requires a positive finite interval");
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    require_radius(
        segment.position_remainder_radii[axis], "position remainder radius");
    require_radius(
        segment.velocity_remainder_radii[axis], "velocity remainder radius");
    for (std::size_t degree = 0U; degree < 4U; ++degree) {
      const auto& row = segment.position_coefficients[axis][degree];
      if (row.size() != symbol_count) {
        throw std::invalid_argument(
            "joint affine segment symbol registry is not aligned");
      }
      for (const double coefficient : row) {
        if (!std::isfinite(coefficient)) {
          throw std::invalid_argument(
              "joint affine cubic coefficient must be finite");
        }
      }
    }
  }
}

bool dominates(
    const std::vector<std::array<double, 3>>& coefficients,
    const std::array<double, 3>& remainder,
    const std::array<double, 3>& ordinary) {
  std::array<double, 3> projection = remainder;
  for (const auto& coefficient : coefficients) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      if (coefficient[axis] == 0.0) continue;
      projection[axis] = outward_sum(
          projection[axis], std::abs(coefficient[axis]));
    }
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (projection[axis] > ordinary[axis]) return false;
  }
  return true;
}

JointAffinePointEvaluation evaluate_joint_segment(
    const std::string& path_id,
    const JointAffineCubicSegment& segment,
    std::size_t symbol_count,
    double original_time,
    double evaluation_time,
    const std::array<double, 3>& ordinary_position_radii,
    const std::array<double, 3>& ordinary_velocity_radii) {
  double local = evaluation_time - segment.start_time;
  const double boundary_envelope =
      32.0 * std::numeric_limits<double>::epsilon() *
      std::max({1.0, std::abs(original_time), std::abs(segment.start_time)});
  if (std::abs(local) <= boundary_envelope) local = 0.0;
  JointAffinePointEvaluation result;
  result.position.path_id = path_id;
  result.position.shared_symbol_coefficients.resize(symbol_count);
  result.velocity_shared_coefficients.resize(symbol_count);
  result.position.independent_remainder_radii =
      segment.position_remainder_radii;
  result.velocity_remainder_radii = segment.velocity_remainder_radii;
  result.position.ordinary_position_radii = ordinary_position_radii;
  result.ordinary_velocity_radii = ordinary_velocity_radii;

  for (std::size_t symbol = 0U; symbol < symbol_count; ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const bool structurally_zero = std::all_of(
          segment.position_coefficients[axis].begin(),
          segment.position_coefficients[axis].end(),
          [&](const auto& row) { return row[symbol] == 0.0; });
      if (structurally_zero) {
        result.position.shared_symbol_coefficients[symbol][axis] = 0.0;
        result.velocity_shared_coefficients[symbol][axis] = 0.0;
        continue;
      }
      if (local == 0.0) {
        result.position.shared_symbol_coefficients[symbol][axis] =
            segment.position_coefficients[axis][0][symbol];
        result.velocity_shared_coefficients[symbol][axis] =
            segment.position_coefficients[axis][1][symbol];
        continue;
      }
      Interval position = Interval::point(
          segment.position_coefficients[axis][3][symbol]);
      for (int degree = 2; degree >= 0; --degree) {
        position = position * Interval::point(local) + Interval::point(
            segment.position_coefficients[axis]
                [static_cast<std::size_t>(degree)][symbol]);
      }
      const double position_coefficient = position.midpoint();
      result.position.shared_symbol_coefficients[symbol][axis] =
          position_coefficient;
      result.position.independent_remainder_radii[axis] = outward_sum(
          result.position.independent_remainder_radii[axis],
          radius_about(position, position_coefficient));

      Interval velocity = Interval::point(3.0) * Interval::point(
          segment.position_coefficients[axis][3][symbol]);
      velocity = velocity * Interval::point(local) +
          Interval::point(2.0) * Interval::point(
              segment.position_coefficients[axis][2][symbol]);
      velocity = velocity * Interval::point(local) + Interval::point(
          segment.position_coefficients[axis][1][symbol]);
      const double velocity_coefficient = velocity.midpoint();
      result.velocity_shared_coefficients[symbol][axis] =
          velocity_coefficient;
      result.velocity_remainder_radii[axis] = outward_sum(
          result.velocity_remainder_radii[axis],
          radius_about(velocity, velocity_coefficient));
    }
  }
  result.position_fallback_dominates = dominates(
      result.position.shared_symbol_coefficients,
      result.position.independent_remainder_radii,
      ordinary_position_radii);
  result.velocity_fallback_dominates = dominates(
      result.velocity_shared_coefficients,
      result.velocity_remainder_radii,
      ordinary_velocity_radii);
  return result;
}

struct JointSegmentIntervalEvaluation {
  IntervalVector nominal_position;
  std::vector<IntervalVector> position_coefficients;
  std::array<double, 3> remainder_radii{};
};

Interval polynomial_interval(
    const std::array<JointCoefficientRow, 4>& rows,
    std::size_t symbol,
    const Interval& local_time) {
  Interval value = Interval::point(rows[3][symbol]);
  for (int degree = 2; degree >= 0; --degree) {
    value = value * local_time +
        Interval::point(rows[static_cast<std::size_t>(degree)][symbol]);
  }
  return value;
}

JointSegmentIntervalEvaluation interval_evaluation(
    const RetainedHistory& ordinary,
    const JointAffineRetainedHistory& joint,
    const Interval& time) {
  if (!ordinary.covers(time) ||
      !joint.covers(time.lower()) || !joint.covers(time.upper())) {
    throw std::invalid_argument(
        "joint displacement evaluation lacks retained-history coverage");
  }
  const std::size_t ordinary_index =
      ordinary.segment_index_at(time.midpoint());
  const auto ordinary_segment_pin = ordinary.segments().pin(ordinary_index);
  const auto& ordinary_segment = *ordinary_segment_pin;
  if (time.lower() < ordinary_segment.t_start() ||
      time.upper() > ordinary_segment.t_end()) {
    throw std::invalid_argument(
        "joint displacement interval crosses a retained segment boundary");
  }
  const auto joint_segment = std::lower_bound(
      joint.segments().begin(), joint.segments().end(),
      ordinary_segment.t_start(),
      [](const auto& candidate, double start) {
        return candidate.start_time < start;
      });
  if (joint_segment == joint.segments().end() ||
      joint_segment->start_time != ordinary_segment.t_start() ||
      joint_segment->end_time != ordinary_segment.t_end()) {
    throw std::invalid_argument(
        "joint and ordinary retained segment registries disagree");
  }
  JointSegmentIntervalEvaluation result{
      .nominal_position = ordinary_segment.nominal_position_interval(time),
      .position_coefficients = std::vector<IntervalVector>(
          joint.symbol_registry().size(),
          IntervalVector{
              Interval::point(0.0), Interval::point(0.0),
              Interval::point(0.0)}),
      .remainder_radii = joint_segment->position_remainder_radii,
  };
  const Interval local_time = time -
      Interval::point(joint_segment->start_time);
  for (std::size_t symbol = 0U;
       symbol < joint.symbol_registry().size(); ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      result.position_coefficients[symbol][axis] = polynomial_interval(
          joint_segment->position_coefficients[axis], symbol, local_time);
    }
  }
  return result;
}

}  // namespace

JointAffineRetainedHistory::JointAffineRetainedHistory(
    std::string path_id,
    std::vector<std::string> symbol_registry,
    std::vector<JointAffineCubicSegment> segments,
    std::optional<JointAffineEndpointOverride> endpoint_override)
    : path_id_(std::move(path_id)),
      symbol_registry_(std::move(symbol_registry)),
      segments_(std::move(segments)),
      endpoint_override_(std::move(endpoint_override)) {
  if (path_id_.empty() || segments_.empty()) {
    throw std::invalid_argument(
        "joint affine history requires a path and at least one segment");
  }
  for (std::size_t index = 0U; index < symbol_registry_.size(); ++index) {
    if (symbol_registry_[index].empty() ||
        std::find(symbol_registry_.begin(),
                  symbol_registry_.begin() + static_cast<std::ptrdiff_t>(index),
                  symbol_registry_[index]) !=
            symbol_registry_.begin() + static_cast<std::ptrdiff_t>(index)) {
      throw std::invalid_argument(
          "joint affine symbol registry must be nonempty and unique");
    }
  }
  for (std::size_t index = 0U; index < segments_.size(); ++index) {
    validate_segment(segments_[index], symbol_registry_.size());
    if (index > 0U &&
        segments_[index - 1U].end_time != segments_[index].start_time) {
      throw std::invalid_argument(
          "joint affine retained segments must be contiguous");
    }
  }
  if (endpoint_override_.has_value()) {
    auto& endpoint = *endpoint_override_;
    if (!std::isfinite(endpoint.time) ||
        endpoint.time != segments_.back().end_time ||
        endpoint.position_shared_symbol_coefficients.size() !=
            symbol_registry_.size() ||
        endpoint.velocity_shared_symbol_coefficients.size() !=
            symbol_registry_.size()) {
      throw std::invalid_argument(
          "joint affine endpoint override is not aligned");
    }
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      require_radius(
          endpoint.position_remainder_radii[axis],
          "endpoint position remainder radius");
      require_radius(
          endpoint.velocity_remainder_radii[axis],
          "endpoint velocity remainder radius");
    }
  }
  provenance_fingerprint_ = joint_history_fingerprint(
      path_id_, symbol_registry_, segments_, endpoint_override_);
}

bool JointAffineRetainedHistory::covers(double time) const noexcept {
  return std::isfinite(time) && time >= segments_.front().start_time &&
      time <= segments_.back().end_time;
}

JointAffinePointEvaluation JointAffineRetainedHistory::evaluate(
    double time,
    const std::array<double, 3>& ordinary_position_radii,
    const std::array<double, 3>& ordinary_velocity_radii) const {
  if (!covers(time)) {
    throw std::out_of_range(
        "joint affine evaluation lies outside retained coverage");
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    require_radius(ordinary_position_radii[axis], "ordinary position radius");
    require_radius(ordinary_velocity_radii[axis], "ordinary velocity radius");
  }
  if (endpoint_override_.has_value()) {
    const auto& endpoint = *endpoint_override_;
    const double scale = std::max({1.0, std::abs(time)});
    if (std::abs(time - endpoint.time) <=
        32.0 * std::numeric_limits<double>::epsilon() * scale) {
      JointAffinePointEvaluation result;
      result.position.path_id = path_id_;
      result.position.shared_symbol_coefficients =
          endpoint.position_shared_symbol_coefficients;
      result.velocity_shared_coefficients =
          endpoint.velocity_shared_symbol_coefficients;
      result.position.independent_remainder_radii =
          endpoint.position_remainder_radii;
      result.velocity_remainder_radii =
          endpoint.velocity_remainder_radii;
      result.position.ordinary_position_radii = ordinary_position_radii;
      result.ordinary_velocity_radii = ordinary_velocity_radii;
      result.position_fallback_dominates = dominates(
          result.position.shared_symbol_coefficients,
          result.position.independent_remainder_radii,
          ordinary_position_radii);
      result.velocity_fallback_dominates = dominates(
          result.velocity_shared_coefficients,
          result.velocity_remainder_radii,
          ordinary_velocity_radii);
      return result;
    }
  }
  double evaluation_time = time;
  for (const auto& candidate : segments_) {
    const double scale = std::max(
        {1.0, std::abs(time), std::abs(candidate.start_time),
         std::abs(candidate.end_time)});
    const double envelope =
        32.0 * std::numeric_limits<double>::epsilon() * scale;
    if (std::abs(time - candidate.start_time) <= envelope) {
      evaluation_time = candidate.start_time;
      break;
    }
    if (std::abs(time - candidate.end_time) <= envelope) {
      evaluation_time = candidate.end_time;
      break;
    }
  }
  const auto found = std::find_if(
      segments_.begin(), segments_.end(), [&](const auto& segment) {
        return evaluation_time >= segment.start_time &&
            evaluation_time <= segment.end_time;
      });
  const auto& segment = found == segments_.end() ? segments_.back() : *found;
  return evaluate_joint_segment(
      path_id_, segment, symbol_registry_.size(), time, evaluation_time,
      ordinary_position_radii, ordinary_velocity_radii);
}

JointAffinePointEvaluation JointAffineRetainedHistory::evaluate_segment(
    std::size_t segment_index,
    double time,
    const std::array<double, 3>& ordinary_position_radii,
    const std::array<double, 3>& ordinary_velocity_radii) const {
  if (segment_index >= segments_.size()) {
    throw std::out_of_range(
        "joint affine segment evaluation index lies outside retained history");
  }
  const auto& segment = segments_[segment_index];
  if (!std::isfinite(time) ||
      time < segment.start_time || time > segment.end_time) {
    throw std::out_of_range(
        "joint affine segment evaluation lies outside selected segment");
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    require_radius(ordinary_position_radii[axis], "ordinary position radius");
    require_radius(ordinary_velocity_radii[axis], "ordinary velocity radius");
  }
  double evaluation_time = time;
  const double scale = std::max(
      {1.0, std::abs(time), std::abs(segment.start_time),
       std::abs(segment.end_time)});
  const double envelope =
      32.0 * std::numeric_limits<double>::epsilon() * scale;
  if (std::abs(time - segment.start_time) <= envelope) {
    evaluation_time = segment.start_time;
  } else if (std::abs(time - segment.end_time) <= envelope) {
    evaluation_time = segment.end_time;
  }
  return evaluate_joint_segment(
      path_id_, segment, symbol_registry_.size(), time, evaluation_time,
      ordinary_position_radii, ordinary_velocity_radii);
}

JointAffineRetainedHistory JointAffineRetainedHistory::appended(
    JointAffineCubicSegment segment) const {
  validate_segment(segment, symbol_registry_.size());
  if (segment.start_time != segments_.back().end_time) {
    throw std::invalid_argument(
        "joint affine appended segment is not contiguous");
  }
  auto next = segments_;
  next.push_back(std::move(segment));
  return JointAffineRetainedHistory(path_id_, symbol_registry_, std::move(next));
}

JointAffineRetainedHistory JointAffineRetainedHistory::with_appended_symbols(
    const std::vector<std::string>& symbol_ids) const {
  if (symbol_ids.empty()) return *this;
  auto registry = symbol_registry_;
  registry.insert(registry.end(), symbol_ids.begin(), symbol_ids.end());
  auto segments = segments_;
  for (auto& segment : segments) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      for (std::size_t degree = 0U; degree < 4U; ++degree) {
        segment.position_coefficients[axis][degree].resize(
            registry.size(), 0.0);
      }
    }
  }
  auto endpoint_override = endpoint_override_;
  if (endpoint_override.has_value()) {
    endpoint_override->position_shared_symbol_coefficients.resize(
        registry.size(), std::array<double, 3>{0.0, 0.0, 0.0});
    endpoint_override->velocity_shared_symbol_coefficients.resize(
        registry.size(), std::array<double, 3>{0.0, 0.0, 0.0});
  }
  return JointAffineRetainedHistory(
      path_id_, std::move(registry), std::move(segments),
      std::move(endpoint_override));
}

IntervalVector joint_affine_displacement_hull(
    const RetainedHistory& receiver_ordinary,
    const JointAffineRetainedHistory& receiver_joint,
    const Interval& reception,
    const RetainedHistory& transmitter_ordinary,
    const JointAffineRetainedHistory& transmitter_joint,
    const Interval& emission) {
  if (receiver_joint.path_id() == transmitter_joint.path_id() ||
      receiver_joint.symbol_registry() !=
          transmitter_joint.symbol_registry()) {
    throw std::invalid_argument(
        "joint displacement requires distinct paths with aligned symbols");
  }
  const auto receiver = interval_evaluation(
      receiver_ordinary, receiver_joint, reception);
  const auto transmitter = interval_evaluation(
      transmitter_ordinary, transmitter_joint, emission);
  const IntervalVector ordinary_displacement = subtract(
      receiver_ordinary.position_hull(reception),
      transmitter_ordinary.position_hull(emission));
  IntervalVector result = subtract(
      receiver.nominal_position, transmitter.nominal_position);
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const double remainder = outward_sum(
        receiver.remainder_radii[axis],
        transmitter.remainder_radii[axis]);
    result[axis] = result[axis] + Interval(-remainder, remainder);
  }
  for (std::size_t symbol = 0U;
       symbol < receiver.position_coefficients.size(); ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      result[axis] = result[axis] +
          (receiver.position_coefficients[symbol][axis] -
           transmitter.position_coefficients[symbol][axis]) *
              Interval(-1.0, 1.0);
    }
  }
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto intersection =
        result[axis].intersection(ordinary_displacement[axis]);
    if (!intersection.has_value()) {
      throw std::runtime_error(
          "joint and ordinary displacement enclosures disagree");
    }
    result[axis] = *intersection;
  }
  return result;
}

IntervalVector joint_affine_segment_pair_error_hull(
    const JointAffineCubicSegment& receiver,
    const JointAffineCubicSegment& transmitter,
    std::size_t shared_symbol_count) {
  IntervalVector result{
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const double remainder = outward_sum(
        receiver.position_remainder_radii[axis],
        transmitter.position_remainder_radii[axis]);
    result[axis] = Interval(-remainder, remainder);
  }
  const Interval receiver_local(
      0.0, receiver.end_time - receiver.start_time);
  const Interval transmitter_local(
      0.0, transmitter.end_time - transmitter.start_time);
  for (std::size_t symbol = 0U; symbol < shared_symbol_count; ++symbol) {
    for (std::size_t axis = 0U; axis < 3U; ++axis) {
      const Interval coefficient = polynomial_interval(
          receiver.position_coefficients[axis], symbol, receiver_local) -
          polynomial_interval(
              transmitter.position_coefficients[axis], symbol,
              transmitter_local);
      result[axis] = result[axis] + coefficient * Interval(-1.0, 1.0);
    }
  }
  return result;
}

}  // namespace architrino::eom

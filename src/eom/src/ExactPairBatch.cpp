#include "architrino/eom/ExactPairBatch.hpp"

#include "architrino/eom/Interval.hpp"

#include <mpfr.h>

#include <algorithm>
#include <array>
#include <atomic>
#include <chrono>
#include <cmath>
#include <condition_variable>
#include <cstddef>
#include <cstdlib>
#include <exception>
#include <functional>
#include <iomanip>
#include <limits>
#include <memory>
#include <mutex>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_map>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

double parse_double(const std::string& token, const char* label) {
  char* end = nullptr;
  const double value = std::strtod(token.c_str(), &end);
  if (end == token.c_str() || *end != '\0' || !std::isfinite(value)) {
    throw std::invalid_argument(std::string("invalid ") + label + ": " + token);
  }
  return value;
}

std::string double_token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

struct DoubleGeometry {
  Interval residual;
  std::optional<Interval> source_normal;
  std::optional<Interval> receiver_normal;
};

struct DoubleReceiverState {
  IntervalVector position;
  IntervalVector velocity;
  bool correlated_self_chord = false;
  const RetainedHistory* correlated_history = nullptr;
};

DoubleGeometry double_geometry(
    const DoubleReceiverState& receiver,
    const CubicHistorySegment& source_segment,
    const Interval& reception,
    const Interval& emission,
    const Interval& field_speed) {
  const auto source_velocity = source_segment.velocity_interval(emission);
  const auto correlated_displacement =
      receiver.correlated_self_chord && receiver.correlated_history != nullptr
      ? receiver.correlated_history->correlated_self_displacement(
            reception, emission)
      : std::nullopt;
  const auto displacement = correlated_displacement.has_value()
      ? *correlated_displacement
      : subtract(
            receiver.position, source_segment.position_interval(emission));
  const Interval separation = norm(displacement);
  const Interval delay = reception - emission;
  const Interval residual = separation - field_speed * delay;
  if (separation.contains_zero()) {
    return {residual, std::nullopt, std::nullopt};
  }
  const auto direction = divide(displacement, separation);
  return {
      residual,
      field_speed - dot(direction, source_velocity),
      field_speed - dot(direction, receiver.velocity),
  };
}

struct DoubleRoot {
  double lower;
  double upper;
  Interval source_normal;
  Interval receiver_normal;
  std::vector<std::size_t> source_segment_indices;
};

struct DoubleRootFreeCell {
  std::size_t source_segment_index;
  double lower;
  double upper;
  Interval residual;
  Interval receiver_normal;
};

struct DoubleAttempt {
  bool complete = true;
  bool memory_boundary_contact = false;
  bool coincident_endpoint_excluded = false;
  bool caustic_candidate = false;
  bool token_dominated_failure = false;
  std::size_t visited_cells = 0;
  std::size_t excluded_cells = 0;
  std::size_t difficult_cells = 0;
  std::size_t warm_excluded_cells = 0;
  double warm_residual_drift_upper = 0.0;
  std::vector<DoubleRoot> roots;
  std::vector<DoubleRootFreeCell> root_free_cells;
};

bool same_segment_tokens(
    const CubicHistorySegment& left,
    const CubicHistorySegment& right) {
  return left.t_start_token() == right.t_start_token() &&
      left.t_end_token() == right.t_end_token() &&
      left.coefficient_tokens() == right.coefficient_tokens() &&
      left.position_error_token() == right.position_error_token() &&
      left.velocity_error_token() == right.velocity_error_token();
}

bool same_history_endpoint(
    const ExactPairRequest& request,
    double cell_upper,
    double reception) {
  return request.receiver->history_id() == request.source->history_id() &&
         cell_upper == reception;
}

bool endpoint_coordinate_coincidence(
    const RetainedHistory& receiver,
    const CubicHistorySegment& source_segment,
    double reception,
    double emission) {
  const auto receiver_position =
      receiver.position_hull(Interval::point(reception));
  const auto source_position =
      source_segment.position_interval(Interval::point(emission));
  const auto displacement = subtract(receiver_position, source_position);
  return displacement[0].contains_zero() && displacement[1].contains_zero() &&
         displacement[2].contains_zero();
}

bool uniform_circular_self_search_is_root_free(
    const ExactPairRequest& request,
    const Interval& field_speed) {
  if (request.receiver->history_id() != request.source->history_id()) {
    return false;
  }
  const auto& certificate =
      request.source->uniform_circular_endpoint_certificate();
  if (!certificate.has_value()) {
    return false;
  }
  const Interval valid_reception =
      Interval::decimal_token(certificate->valid_reception_time);
  const Interval requested_reception =
      Interval::decimal_token(request.reception_time);
  if (valid_reception.lower() != requested_reception.lower() ||
      valid_reception.upper() != requested_reception.upper()) {
    return false;
  }
  const Interval tangential_speed =
      Interval::decimal_token(certificate->tangential_speed);
  // For every nonzero delay Delta on a uniform circle,
  //   |X(T)-X(T-Delta)| = 2 rho |sin(omega Delta / 2)|
  //                      < rho |omega| Delta = v Delta.
  // Thus v <= c_f makes the causal residual strictly negative throughout
  // the open search interval. The factory-bound certificate is deliberately
  // unavailable to an arbitrary cubic history; in particular, a straight
  // v=c_f rail retains its unresolved coincidence continuum.
  const bool at_or_below_field_speed =
      (tangential_speed.lower() == field_speed.lower() &&
       tangential_speed.upper() == field_speed.upper()) ||
      tangential_speed.upper() <= field_speed.lower();
  return tangential_speed.lower() > 0.0 && at_or_below_field_speed;
}

bool merge_double_roots(std::vector<DoubleRoot>& roots) {
  std::sort(roots.begin(), roots.end(), [](const auto& left, const auto& right) {
    return left.lower < right.lower;
  });
  std::vector<DoubleRoot> merged;
  for (const auto& root : roots) {
    if (merged.empty() || root.lower > merged.back().upper) {
      merged.push_back(root);
      continue;
    }
    if (root.source_normal.strict_sign() !=
        merged.back().source_normal.strict_sign()) {
      return false;
    }
    merged.back().lower = std::min(merged.back().lower, root.lower);
    merged.back().upper = std::max(merged.back().upper, root.upper);
    merged.back().source_normal =
        merged.back().source_normal.hull(root.source_normal);
    merged.back().receiver_normal =
        merged.back().receiver_normal.hull(root.receiver_normal);
    merged.back().source_segment_indices.insert(
        merged.back().source_segment_indices.end(),
        root.source_segment_indices.begin(), root.source_segment_indices.end());
    std::sort(merged.back().source_segment_indices.begin(),
              merged.back().source_segment_indices.end());
    merged.back().source_segment_indices.erase(
        std::unique(merged.back().source_segment_indices.begin(),
                    merged.back().source_segment_indices.end()),
        merged.back().source_segment_indices.end());
  }
  roots = std::move(merged);
  return true;
}

double correlated_self_token_radius(
    const RetainedHistory& history,
    double reception,
    double emission) {
  const auto emission_index = history.segment_index_at(emission);
  const auto reception_index = history.segment_index_at(reception);
  if (emission_index == reception_index) {
    const auto& segment = history.segments()[emission_index];
    return std::sqrt(3.0) * std::min(
        2.0 * segment.position_error(),
        segment.velocity_error() * std::max(0.0, reception - emission));
  }

  double component_radius = 0.0;
  for (std::size_t index = emission_index; index <= reception_index; ++index) {
    const auto& segment = history.segments()[index];
    const double lower = std::max(emission, segment.t_start());
    const double upper = std::min(reception, segment.t_end());
    if (lower < upper) {
      component_radius += segment.velocity_error() * (upper - lower);
    }
  }
  return std::sqrt(3.0) * component_radius;
}

bool double_point_residual_is_token_dominated(
    const ExactPairRequest& request,
    const CubicHistorySegment& receiver_segment,
    const CubicHistorySegment& source_segment,
    const DoubleGeometry& geometry,
    double reception,
    double emission,
    double field_speed,
    bool correlated_self_chord) {
  const double token_radius = correlated_self_chord
      ? correlated_self_token_radius(*request.source, reception, emission)
      : std::sqrt(3.0) *
            (receiver_segment.position_error() +
             source_segment.position_error());
  const double arithmetic_scale = std::max({
      1.0,
      std::abs(reception),
      std::abs(emission),
      std::abs(field_speed * (reception - emission)),
      std::abs(geometry.residual.lower()),
      std::abs(geometry.residual.upper()),
  });
  const double arithmetic_width =
      256.0 * std::numeric_limits<double>::epsilon() * arithmetic_scale;
  const double enclosure_width = geometry.residual.width();
  // A retained-history token is epistemic: MPFR cannot shrink it.  Require
  // the token radius to exceed the binary64 rounding envelope and to explain
  // the whole residual enclosure before selecting the binary64 IVT route.
  return token_radius > arithmetic_width &&
      enclosure_width > arithmetic_width &&
      enclosure_width <= 2.0 * token_radius + arithmetic_width;
}

bool double_source_normal_is_token_dominated(
    const CubicHistorySegment& source_segment,
    const Interval& source_normal,
    double cell_width) {
  if (!source_normal.contains_zero() ||
      (source_segment.position_error() <= 0.0 &&
       source_segment.velocity_error() <= 0.0)) {
    return false;
  }
  const double coordinate_radius = std::sqrt(3.0);
  const double direction_scale = std::max(
      cell_width, 256.0 * std::numeric_limits<double>::epsilon());
  const double token_radius =
      coordinate_radius * source_segment.velocity_error() +
      4.0 * coordinate_radius * source_segment.position_error() /
          direction_scale;
  const double arithmetic_width =
      256.0 * std::numeric_limits<double>::epsilon() *
      std::max({1.0, std::abs(source_normal.lower()),
                std::abs(source_normal.upper())});
  const double zero_overlap = std::min(
      std::abs(source_normal.lower()), std::abs(source_normal.upper()));
  return source_normal.width() > arithmetic_width &&
      token_radius > arithmetic_width &&
      source_normal.width() <= 2.0 * token_radius + arithmetic_width &&
      zero_overlap <= 2.0 * token_radius + arithmetic_width;
}

std::optional<std::pair<double, double>> surround_double_root(
    const DoubleReceiverState& receiver,
    const CubicHistorySegment& source_segment,
    const Interval& reception,
    const Interval& field_speed,
    double point,
    double bracket_lower,
    double bracket_upper,
    double tolerance) {
  double radius = tolerance / 64.0;
  for (unsigned stage = 0; stage <= 5; ++stage) {
    const double lower = std::max(
        bracket_lower,
        std::nextafter(point - radius,
                       -std::numeric_limits<double>::infinity()));
    const double upper = std::min(
        bracket_upper,
        std::nextafter(point + radius,
                       std::numeric_limits<double>::infinity()));
    if (lower < point && point < upper && upper - lower <= tolerance) {
      const int lower_sign =
          double_geometry(receiver, source_segment, reception,
                          Interval::point(lower), field_speed)
              .residual.strict_sign();
      const int upper_sign =
          double_geometry(receiver, source_segment, reception,
                          Interval::point(upper), field_speed)
              .residual.strict_sign();
      if (lower_sign != 0 && upper_sign != 0 && lower_sign != upper_sign) {
        return std::make_pair(lower, upper);
      }
    }
    radius *= 2.0;
  }
  return std::nullopt;
}

std::optional<DoubleRoot> surround_double_segment_join_root(
    const DoubleReceiverState& receiver,
    const CubicHistorySegment& left_segment,
    const CubicHistorySegment& right_segment,
    std::size_t left_segment_index,
    std::size_t right_segment_index,
    const Interval& reception,
    const Interval& field_speed,
    double search_lower,
    double search_upper,
    double tolerance) {
  const double boundary = left_segment.t_end();
  if (boundary <= search_lower || boundary >= search_upper) {
    return std::nullopt;
  }
  double radius = tolerance / 64.0;
  for (unsigned stage = 0; stage <= 5; ++stage) {
    const double lower = std::max(
        search_lower,
        std::nextafter(boundary - radius,
                       -std::numeric_limits<double>::infinity()));
    const double upper = std::min(
        search_upper,
        std::nextafter(boundary + radius,
                       std::numeric_limits<double>::infinity()));
    if (!(lower < boundary && boundary < upper) ||
        upper - lower > tolerance) {
      radius *= 2.0;
      continue;
    }
    const int lower_sign =
        double_geometry(receiver, left_segment, reception,
                        Interval::point(lower), field_speed)
            .residual.strict_sign();
    const int upper_sign =
        double_geometry(receiver, right_segment, reception,
                        Interval::point(upper), field_speed)
            .residual.strict_sign();
    if (lower_sign == 0 || upper_sign == 0 || lower_sign == upper_sign) {
      radius *= 2.0;
      continue;
    }

    const auto left_geometry = double_geometry(
        receiver, left_segment, reception, Interval(lower, boundary),
        field_speed);
    const auto right_geometry = double_geometry(
        receiver, right_segment, reception, Interval(boundary, upper),
        field_speed);
    if (!left_geometry.source_normal.has_value() ||
        !right_geometry.source_normal.has_value() ||
        !left_geometry.receiver_normal.has_value() ||
        !right_geometry.receiver_normal.has_value()) {
      return std::nullopt;
    }
    const Interval source_normal = left_geometry.source_normal->hull(
        *right_geometry.source_normal);
    if (source_normal.strict_sign() == 0 ||
        source_normal.strict_sign() !=
            left_geometry.source_normal->strict_sign() ||
        source_normal.strict_sign() !=
            right_geometry.source_normal->strict_sign()) {
      return std::nullopt;
    }
    return DoubleRoot{
        lower,
        upper,
        source_normal,
        left_geometry.receiver_normal->hull(*right_geometry.receiver_normal),
        {left_segment_index, right_segment_index},
    };
  }
  return std::nullopt;
}

DoubleAttempt run_double_attempt(const ExactPairRequest& request) {
  DoubleAttempt attempt;
  const double reception_value =
      parse_double(request.reception_time, "reception time");
  const double search_lower =
      parse_double(request.search_lower, "search lower bound");
  const double search_upper =
      parse_double(request.search_upper, "search upper bound");
  const double field_speed_value =
      parse_double(request.field_speed, "field speed");
  const double tolerance =
      parse_double(request.root_tolerance, "root tolerance");
  if (search_lower >= search_upper || search_upper > reception_value) {
    throw std::invalid_argument("invalid retained root-search interval");
  }
  if (field_speed_value <= 0.0 || tolerance <= 0.0) {
    throw std::invalid_argument("field speed and root tolerance must be positive");
  }
  const Interval reception = Interval::decimal_token(request.reception_time);
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  if (!request.receiver->covers(reception) ||
      !request.source->covers(Interval(search_lower, search_upper))) {
    throw std::out_of_range("pair request lies outside retained-history coverage");
  }

  const double scale =
      std::max({1.0, std::abs(search_lower), std::abs(search_upper)});
  if (request.force_precision_escalation ||
      tolerance < 128.0 * std::numeric_limits<double>::epsilon() * scale) {
    attempt.complete = false;
    attempt.difficult_cells = 1;
    return attempt;
  }
  const bool same_retained_history =
      request.receiver->history_id() == request.source->history_id() &&
      request.receiver->provenance_fingerprint() ==
          request.source->provenance_fingerprint();
  const DoubleReceiverState receiver_state{
      request.receiver->position_hull(reception),
      request.receiver->velocity_hull(reception),
      same_retained_history,
      same_retained_history ? request.source : nullptr};
  const double receiver_normal_abs_bound =
      (field_speed + norm(receiver_state.velocity)).upper();
  const Interval fallback_receiver_normal =
      Interval::point(0.0).inflate(receiver_normal_abs_bound);
  const auto& receiver_segment = request.receiver->segments()[
      request.receiver->segment_index_at(reception_value)];

  bool warm_start_eligible = false;
  if (request.warm_start != nullptr &&
      request.warm_start->certificate != nullptr &&
      request.warm_start->receiver != nullptr &&
      request.warm_start->source != nullptr) {
    const auto& prior = *request.warm_start->certificate;
    const auto& prior_receiver = *request.warm_start->receiver;
    const auto& prior_source = *request.warm_start->source;
    const double prior_reception =
        parse_double(prior.reception_time, "warm-start reception time");
    const Interval prior_reception_interval =
        Interval::decimal_token(prior.reception_time);
    warm_start_eligible =
        prior.status == "certified_complete" &&
        prior.root_free_complement &&
        prior.field_speed == request.field_speed &&
        prior.receiver_history_id == prior_receiver.history_id() &&
        prior.source_history_id == prior_source.history_id() &&
        prior_receiver.history_id() == request.receiver->history_id() &&
        prior_source.history_id() == request.source->history_id() &&
        prior_receiver.covers(prior_reception_interval);
    if (warm_start_eligible) {
      const Interval receiver_displacement = norm(subtract(
          receiver_state.position,
          prior_receiver.position_hull(prior_reception_interval)));
      const Interval reception_drift = field_speed * Interval::point(
          std::abs(reception_value - prior_reception));
      double residual_drift_upper =
          (receiver_displacement + reception_drift).upper();
      const Interval reception_span(
          std::min(reception_value, prior_reception),
          std::max(reception_value, prior_reception));
      if (request.receiver->covers(reception_span)) {
        const Interval candidate_correction = norm(subtract(
            request.receiver->position_hull(prior_reception_interval),
            prior_receiver.position_hull(prior_reception_interval)));
        const Interval receiver_normal_abs =
            field_speed + norm(request.receiver->velocity_hull(reception_span));
        const Interval identity_drift = candidate_correction +
            receiver_normal_abs * Interval::point(
                std::abs(reception_value - prior_reception));
        residual_drift_upper =
            std::min(residual_drift_upper, identity_drift.upper());
      }
      attempt.warm_residual_drift_upper = residual_drift_upper;
    }
  }

  struct WarmCellView {
    double lower;
    double upper;
    Interval residual;
  };
  struct Cell {
    std::size_t segment_index;
    double lower;
    double upper;
    std::size_t depth;
    const WarmCellView* warm_cell = nullptr;
  };

  std::vector<Cell> cells;
  std::size_t first_segment = request.source->segment_index_at(search_lower);
  if (first_segment > 0U) {
    --first_segment;
  }
  for (std::size_t index = first_segment;
       index < request.source->segments().size(); ++index) {
    const auto& segment = request.source->segments()[index];
    if (segment.t_start() >= search_upper) {
      break;
    }
    const double lower = std::max(search_lower, segment.t_start());
    const double upper = std::min(search_upper, segment.t_end());
    if (lower < upper) {
      cells.push_back({index, lower, upper, 0, nullptr});
    }
  }
  if (cells.empty()) {
    throw std::out_of_range("root search has no covered source segment");
  }
  std::vector<std::vector<WarmCellView>> warm_cells_by_segment;
  if (warm_start_eligible &&
      !request.warm_start->certificate->root_free_cells.empty()) {
    warm_cells_by_segment.resize(request.source->segments().size());
    for (const auto& prior_cell :
         request.warm_start->certificate->root_free_cells) {
      const std::size_t index = prior_cell.source_segment_index;
      if (index >= request.source->segments().size() ||
          index >= request.warm_start->source->segments().size() ||
          !same_segment_tokens(
              request.source->segments()[index],
              request.warm_start->source->segments()[index])) {
        continue;
      }
      warm_cells_by_segment[index].push_back({
          .lower = parse_double(
              prior_cell.lower, "warm-start cell lower"),
          .upper = parse_double(
              prior_cell.upper, "warm-start cell upper"),
          .residual = Interval(
              parse_double(prior_cell.residual_lower,
                           "warm-start residual lower"),
              parse_double(prior_cell.residual_upper,
                           "warm-start residual upper")),
      });
    }
    for (auto& segment_cells : warm_cells_by_segment) {
      std::sort(
          segment_cells.begin(), segment_cells.end(),
          [](const auto& left, const auto& right) {
            return left.lower < right.lower;
          });
    }
    std::vector<Cell> partitioned;
    for (const auto& base : cells) {
      double cursor = base.lower;
      for (const auto& prior_cell :
           warm_cells_by_segment[base.segment_index]) {
        const double lower = std::max(
            cursor, std::max(base.lower, prior_cell.lower));
        const double upper = std::min(base.upper, prior_cell.upper);
        if (!(lower < upper)) {
          continue;
        }
        if (cursor < lower) {
          partitioned.push_back(
              {base.segment_index, cursor, lower, 0, nullptr});
        }
        partitioned.push_back(
            {base.segment_index, lower, upper, 0, &prior_cell});
        cursor = upper;
      }
      if (cursor < base.upper) {
        partitioned.push_back(
            {base.segment_index, cursor, base.upper, 0, nullptr});
      }
    }
    cells = std::move(partitioned);
  }
  std::vector<bool> subfield_suffix(
      request.source->segments().size() + 1U, true);
  if (same_retained_history) {
    for (std::size_t index = request.source->segments().size(); index-- > 0U;) {
      const auto& segment = request.source->segments()[index];
      const double lower = segment.t_start();
      const double upper = std::min(segment.t_end(), reception_value);
      bool segment_subfield = true;
      if (lower < upper) {
        segment_subfield =
            norm(segment.velocity_interval(Interval(lower, upper))).upper() <
            field_speed.lower();
      }
      subfield_suffix[index] =
          segment_subfield && subfield_suffix[index + 1U];
    }
  }
  const auto self_path_from_cell_is_subfield = [&](const Cell& cell) {
    if (!same_retained_history ||
        !subfield_suffix[cell.segment_index + 1U]) {
      return false;
    }
    const auto& segment = request.source->segments()[cell.segment_index];
    const double upper = std::min(segment.t_end(), reception_value);
    return cell.lower < upper &&
        norm(segment.velocity_interval(Interval(cell.lower, upper))).upper() <
            field_speed.lower();
  };

  auto add_token_dominated_endpoint_root = [&] (
      const CubicHistorySegment& source_segment,
      std::size_t segment_index,
      double point,
      double cell_lower,
      double cell_upper,
      const DoubleGeometry& point_geometry) {
    if (!double_point_residual_is_token_dominated(
            request, receiver_segment, source_segment, point_geometry,
            reception_value, point, field_speed_value,
            same_retained_history)) {
      return false;
    }

    if (const auto surrounded = surround_double_root(
            receiver_state, source_segment, reception, field_speed, point,
            cell_lower, cell_upper, tolerance);
        surrounded.has_value()) {
      const auto root_geometry = double_geometry(
          receiver_state, source_segment, reception,
          Interval(surrounded->first, surrounded->second), field_speed);
      if (!root_geometry.source_normal.has_value() ||
          !root_geometry.receiver_normal.has_value() ||
          root_geometry.source_normal->contains_zero()) {
        return false;
      }
      if (point == search_lower) {
        attempt.memory_boundary_contact = true;
      }
      attempt.roots.push_back({
          surrounded->first,
          surrounded->second,
          *root_geometry.source_normal,
          *root_geometry.receiver_normal,
          {segment_index},
      });
      return true;
    }

    std::optional<DoubleRoot> join_root;
    if (point == source_segment.t_end() &&
        segment_index + 1U < request.source->segments().size()) {
      join_root = surround_double_segment_join_root(
          receiver_state, source_segment,
          request.source->segments()[segment_index + 1U], segment_index,
          segment_index + 1U, reception, field_speed, search_lower,
          search_upper, tolerance);
    } else if (point == source_segment.t_start() && segment_index > 0U) {
      join_root = surround_double_segment_join_root(
          receiver_state, request.source->segments()[segment_index - 1U],
          source_segment, segment_index - 1U, segment_index, reception,
          field_speed, search_lower, search_upper, tolerance);
    }
    if (!join_root.has_value()) {
      return false;
    }
    attempt.roots.push_back(*join_root);
    ++attempt.excluded_cells;
    return true;
  };

  std::function<void(const Cell&)> classify;
  classify = [&](const Cell& cell) {
    if (!attempt.complete) {
      return;
    }
    if (cell.warm_cell != nullptr) {
      const Interval carried_residual =
          cell.warm_cell->residual.inflate(
              attempt.warm_residual_drift_upper);
      if (carried_residual.excludes_zero()) {
        ++attempt.excluded_cells;
        ++attempt.warm_excluded_cells;
        attempt.root_free_cells.push_back({
            cell.segment_index,
            cell.lower,
            cell.upper,
            carried_residual,
            fallback_receiver_normal,
        });
        return;
      }
    }
    ++attempt.visited_cells;
    if (attempt.visited_cells > request.max_cells ||
        cell.depth > request.max_depth) {
      attempt.complete = false;
      ++attempt.difficult_cells;
      return;
    }
    const auto& source_segment = request.source->segments()[cell.segment_index];
    const Interval emission(cell.lower, cell.upper);
    if (self_path_from_cell_is_subfield(cell)) {
      if (search_upper == reception_value) {
        attempt.coincident_endpoint_excluded = true;
      }
      ++attempt.excluded_cells;
      return;
    }
    if (uniform_circular_self_search_is_root_free(
            request, field_speed)) {
      attempt.coincident_endpoint_excluded = true;
      ++attempt.excluded_cells;
      return;
    }
    if (same_history_endpoint(request, cell.upper, reception_value)) {
      const auto source_velocity = source_segment.velocity_interval(emission);
      const Interval speed = norm(source_velocity);
      const bool subfield = speed.upper() < field_speed.lower();
      const bool superfield_component = std::any_of(
          source_velocity.begin(), source_velocity.end(),
          [&](const Interval& component) {
            return component.lower() > field_speed.upper() ||
                component.upper() < -field_speed.upper();
          });
      if (subfield || superfield_component) {
        attempt.coincident_endpoint_excluded = true;
        ++attempt.excluded_cells;
        return;
      }
    }
    const auto geometry = double_geometry(
        receiver_state, source_segment, reception, emission, field_speed);
    if (geometry.residual.excludes_zero()) {
      ++attempt.excluded_cells;
      attempt.root_free_cells.push_back({
          cell.segment_index,
          cell.lower,
          cell.upper,
          geometry.residual,
          geometry.receiver_normal.value_or(fallback_receiver_normal),
      });
      return;
    }
    if (!geometry.source_normal.has_value() ||
        geometry.source_normal->contains_zero()) {
      if (cell.upper - cell.lower <= tolerance ||
          cell.depth == request.max_depth) {
        attempt.complete = false;
        attempt.caustic_candidate = true;
        attempt.token_dominated_failure =
            geometry.source_normal.has_value() &&
            double_source_normal_is_token_dominated(
                source_segment, *geometry.source_normal,
                cell.upper - cell.lower);
        ++attempt.difficult_cells;
        return;
      }
      const double middle = cell.lower + (cell.upper - cell.lower) * 0.5;
      if (middle == cell.lower || middle == cell.upper) {
        attempt.complete = false;
        ++attempt.difficult_cells;
        return;
      }
      classify({cell.segment_index, cell.lower, middle, cell.depth + 1});
      classify({cell.segment_index, middle, cell.upper, cell.depth + 1});
      return;
    }

    const auto lower_geometry = double_geometry(
        receiver_state, source_segment, reception, Interval::point(cell.lower),
        field_speed);
    const auto upper_geometry = double_geometry(
        receiver_state, source_segment, reception, Interval::point(cell.upper),
        field_speed);
    const int lower_sign = lower_geometry.residual.strict_sign();
    const int upper_sign = upper_geometry.residual.strict_sign();

    if (same_history_endpoint(request, cell.upper, reception_value) &&
        upper_sign == 0 &&
        endpoint_coordinate_coincidence(
            *request.receiver, source_segment, reception_value, cell.upper) &&
        lower_sign != 0) {
      attempt.coincident_endpoint_excluded = true;
      ++attempt.excluded_cells;
      return;
    }
    if (lower_sign != 0 && lower_sign == upper_sign) {
      ++attempt.excluded_cells;
      const Interval endpoint_residual =
          lower_geometry.residual.hull(upper_geometry.residual);
      const Interval endpoint_receiver_normal =
          lower_geometry.receiver_normal.has_value() &&
                  upper_geometry.receiver_normal.has_value()
              ? lower_geometry.receiver_normal->hull(
                    *upper_geometry.receiver_normal)
              : fallback_receiver_normal;
      attempt.root_free_cells.push_back({
          cell.segment_index,
          cell.lower,
          cell.upper,
          endpoint_residual,
          endpoint_receiver_normal,
      });
      return;
    }
    if (lower_sign == 0) {
      if (add_token_dominated_endpoint_root(
              source_segment, cell.segment_index, cell.lower, cell.lower,
              cell.upper, lower_geometry)) {
        return;
      }
      attempt.complete = false;
      ++attempt.difficult_cells;
      return;
    }
    if (upper_sign == 0) {
      if (add_token_dominated_endpoint_root(
              source_segment, cell.segment_index, cell.upper, cell.lower,
              cell.upper, upper_geometry)) {
        return;
      }
      attempt.complete = false;
      ++attempt.difficult_cells;
      return;
    }

    double lower = cell.lower;
    double upper = cell.upper;
    int refined_lower_sign = lower_sign;
    int refined_upper_sign = upper_sign;
    std::size_t iterations = 0;
    while (upper - lower > tolerance && iterations < request.max_depth) {
      const double middle = lower + (upper - lower) * 0.4375;
      if (middle == lower || middle == upper) {
        attempt.complete = false;
        ++attempt.difficult_cells;
        return;
      }
      const auto middle_geometry = double_geometry(
          receiver_state, source_segment, reception, Interval::point(middle),
          field_speed);
      int middle_sign = middle_geometry.residual.strict_sign();
      if (middle_sign == 0) {
        if (!double_point_residual_is_token_dominated(
                request, receiver_segment, source_segment, middle_geometry,
                reception_value, middle, field_speed_value,
                same_retained_history)) {
          attempt.complete = false;
          ++attempt.difficult_cells;
          return;
        }
        const auto surrounded = surround_double_root(
            receiver_state, source_segment, reception, field_speed, middle,
            lower, upper, tolerance);
        if (!surrounded.has_value()) {
          attempt.complete = false;
          ++attempt.difficult_cells;
          return;
        }
        lower = surrounded->first;
        upper = surrounded->second;
        refined_lower_sign =
            double_geometry(receiver_state, source_segment, reception,
                            Interval::point(lower), field_speed)
                .residual.strict_sign();
        refined_upper_sign =
            double_geometry(receiver_state, source_segment, reception,
                            Interval::point(upper), field_speed)
                .residual.strict_sign();
        break;
      }
      if (middle_sign == refined_lower_sign) {
        lower = middle;
      } else {
        upper = middle;
        refined_upper_sign = middle_sign;
      }
      ++iterations;
    }
    if (refined_lower_sign == refined_upper_sign || upper - lower > tolerance) {
      attempt.complete = false;
      ++attempt.difficult_cells;
      return;
    }
    const auto root_geometry = double_geometry(
        receiver_state, source_segment, reception, Interval(lower, upper),
        field_speed);
    if (!root_geometry.source_normal.has_value() ||
        !root_geometry.receiver_normal.has_value() ||
        root_geometry.source_normal->contains_zero()) {
      attempt.complete = false;
      attempt.caustic_candidate = true;
      ++attempt.difficult_cells;
      return;
    }
    attempt.roots.push_back(
        {lower, upper, *root_geometry.source_normal,
         *root_geometry.receiver_normal, {cell.segment_index}});
  };

  for (const auto& cell : cells) {
    classify(cell);
  }
  if (attempt.complete && !merge_double_roots(attempt.roots)) {
    attempt.complete = false;
    attempt.caustic_candidate = true;
    ++attempt.difficult_cells;
  }
  return attempt;
}

class MpFloatPool;

struct MpFloatStorage {
  MpFloatStorage(MpFloatPool* owner_value, mpfr_prec_t bits_value)
      : owner(owner_value), bits(bits_value) {
    mpfr_init2(value, bits);
  }

  ~MpFloatStorage() { mpfr_clear(value); }

  MpFloatPool* owner;
  mpfr_t value;
  mpfr_prec_t bits;
  MpFloatStorage* next_free = nullptr;
};

class MpFloatPool {
 public:
  MpFloatStorage* acquire(mpfr_prec_t bits) {
    FreeList* free_list = nullptr;
    for (auto& candidate : free_lists_) {
      if (candidate.bits == bits) {
        free_list = &candidate;
        break;
      }
    }
    if (free_list == nullptr) {
      free_lists_.push_back({bits, nullptr});
      free_list = &free_lists_.back();
    }
    if (free_list->head != nullptr) {
      MpFloatStorage* storage = free_list->head;
      free_list->head = storage->next_free;
      storage->next_free = nullptr;
      return storage;
    }
    auto storage = std::make_unique<MpFloatStorage>(this, bits);
    MpFloatStorage* result = storage.get();
    storage_.push_back(std::move(storage));
    return result;
  }

  void release(MpFloatStorage* storage) noexcept {
    for (auto& free_list : free_lists_) {
      if (free_list.bits == storage->bits) {
        storage->next_free = free_list.head;
        free_list.head = storage;
        return;
      }
    }
    std::terminate();
  }

 private:
  struct FreeList {
    mpfr_prec_t bits;
    MpFloatStorage* head;
  };

  std::vector<FreeList> free_lists_;
  std::vector<std::unique_ptr<MpFloatStorage>> storage_;
};

MpFloatPool& mp_float_pool() {
  thread_local MpFloatPool pool;
  return pool;
}

class MpFloat {
 public:
  explicit MpFloat(mpfr_prec_t bits)
      : storage_(mp_float_pool().acquire(bits)) {}

  MpFloat(const MpFloat& other) : MpFloat(other.bits()) {
    mpfr_set(raw(), other.raw(), MPFR_RNDN);
  }

  MpFloat(MpFloat&& other) noexcept
      : storage_(std::exchange(other.storage_, nullptr)) {}

  MpFloat& operator=(const MpFloat& other) {
    if (this != &other) {
      if (storage_ == nullptr || bits() != other.bits()) {
        MpFloat replacement(other);
        std::swap(storage_, replacement.storage_);
      } else {
        mpfr_set(raw(), other.raw(), MPFR_RNDN);
      }
    }
    return *this;
  }

  MpFloat& operator=(MpFloat&& other) noexcept {
    if (this != &other) {
      std::swap(storage_, other.storage_);
    }
    return *this;
  }

  ~MpFloat() {
    if (storage_ != nullptr) {
      storage_->owner->release(storage_);
    }
  }

  static MpFloat decimal(
      const std::string& token,
      mpfr_prec_t bits,
      mpfr_rnd_t rounding) {
    MpFloat result(bits);
    if (mpfr_set_str(result.raw(), token.c_str(), 10, rounding) != 0) {
      throw std::invalid_argument("invalid MPFR decimal token: " + token);
    }
    return result;
  }

  static MpFloat unsigned_value(
      unsigned long value,
      mpfr_prec_t bits) {
    MpFloat result(bits);
    mpfr_set_ui(result.raw(), value, MPFR_RNDN);
    return result;
  }

  [[nodiscard]] mpfr_prec_t bits() const noexcept { return storage_->bits; }
  [[nodiscard]] mpfr_srcptr raw() const noexcept { return storage_->value; }
  [[nodiscard]] mpfr_ptr raw() noexcept { return storage_->value; }
  [[nodiscard]] int compare(const MpFloat& other) const {
    return mpfr_cmp(raw(), other.raw());
  }
  [[nodiscard]] int compare_zero() const { return mpfr_sgn(raw()); }
  [[nodiscard]] std::string token(mpfr_rnd_t rounding) const {
    const int digits =
        static_cast<int>(std::ceil(static_cast<double>(bits()) * 0.30103)) + 3;
    const char* format = rounding == MPFR_RNDD ? "%.*RDg" : "%.*RUg";
    const int size = mpfr_snprintf(nullptr, 0, format, digits, raw());
    if (size < 0) {
      throw std::runtime_error("MPFR string formatting failed");
    }
    std::string result(static_cast<std::size_t>(size) + 1U, '\0');
    mpfr_snprintf(result.data(), result.size(), format, digits, raw());
    result.resize(static_cast<std::size_t>(size));
    return result;
  }

 private:
  MpFloatStorage* storage_;
};

struct MpDecimalCache {
  mpfr_prec_t bits = 0;
  std::unordered_map<std::string, MpFloat> downward;
  std::unordered_map<std::string, MpFloat> upward;
  std::unordered_map<std::string, MpFloat> nearest;
};

MpDecimalCache& mp_decimal_cache() {
  // Construct the pool before the cache so thread-local destruction releases
  // cached values while their owning pool is still alive.
  (void)mp_float_pool();
  thread_local MpDecimalCache cache;
  return cache;
}

void reset_mp_decimal_cache(mpfr_prec_t bits) {
  auto& cache = mp_decimal_cache();
  cache.bits = bits;
  cache.downward.clear();
  cache.upward.clear();
  cache.nearest.clear();
}

// Segment coefficients, error radii, and time bounds are immutable decimal
// tokens during one precision attempt. Parsing each token once per directed
// rounding mode preserves the exact MPFR enclosure: subsequent mpfr_set copies
// at the same precision are exact, independent of the requested rounding mode.
MpFloat mp_cached_decimal(
    const std::string& token,
    mpfr_prec_t bits,
    mpfr_rnd_t rounding) {
  auto& cache = mp_decimal_cache();
  if (cache.bits != bits) {
    reset_mp_decimal_cache(bits);
  }
  auto* values = &cache.nearest;
  if (rounding == MPFR_RNDD) {
    values = &cache.downward;
  } else if (rounding == MPFR_RNDU) {
    values = &cache.upward;
  }
  const auto found = values->find(token);
  if (found != values->end()) {
    return found->second;
  }
  auto [inserted, was_inserted] = values->emplace(
      token, MpFloat::decimal(token, bits, rounding));
  (void)was_inserted;
  return inserted->second;
}

MpFloat mp_add(
    const MpFloat& left,
    const MpFloat& right,
    mpfr_rnd_t rounding) {
  MpFloat result(left.bits());
  mpfr_add(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpFloat mp_subtract(
    const MpFloat& left,
    const MpFloat& right,
    mpfr_rnd_t rounding) {
  MpFloat result(left.bits());
  mpfr_sub(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpFloat mp_multiply(
    const MpFloat& left,
    const MpFloat& right,
    mpfr_rnd_t rounding) {
  MpFloat result(left.bits());
  mpfr_mul(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpFloat mp_divide(
    const MpFloat& left,
    const MpFloat& right,
    mpfr_rnd_t rounding) {
  MpFloat result(left.bits());
  mpfr_div(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpFloat mp_midpoint(const MpFloat& lower, const MpFloat& upper) {
  MpFloat result(lower.bits());
  mpfr_add(result.raw(), lower.raw(), upper.raw(), MPFR_RNDN);
  mpfr_div_2ui(result.raw(), result.raw(), 1, MPFR_RNDN);
  return result;
}

MpFloat mp_split(const MpFloat& lower, const MpFloat& upper) {
  MpFloat delta = mp_subtract(upper, lower, MPFR_RNDN);
  mpfr_mul_ui(delta.raw(), delta.raw(), 7, MPFR_RNDN);
  mpfr_div_ui(delta.raw(), delta.raw(), 16, MPFR_RNDN);
  return mp_add(lower, delta, MPFR_RNDN);
}

class MpInterval {
 public:
  MpInterval(MpFloat lower, MpFloat upper)
      : lower_(std::move(lower)), upper_(std::move(upper)) {
    if (lower_.compare(upper_) > 0) {
      throw std::invalid_argument("MPFR interval lower exceeds upper");
    }
  }

  static MpInterval decimal(const std::string& token, mpfr_prec_t bits) {
    return MpInterval(
        mp_cached_decimal(token, bits, MPFR_RNDD),
        mp_cached_decimal(token, bits, MPFR_RNDU));
  }

  static MpInterval point(const MpFloat& value) {
    return MpInterval(value, value);
  }

  static MpInterval bounds(const MpFloat& lower, const MpFloat& upper) {
    return MpInterval(lower, upper);
  }

  [[nodiscard]] const MpFloat& lower() const noexcept { return lower_; }
  [[nodiscard]] const MpFloat& upper() const noexcept { return upper_; }
  [[nodiscard]] mpfr_prec_t bits() const noexcept { return lower_.bits(); }
  [[nodiscard]] bool contains_zero() const {
    return lower_.compare_zero() <= 0 && upper_.compare_zero() >= 0;
  }
  [[nodiscard]] bool excludes_zero() const { return !contains_zero(); }
  [[nodiscard]] int strict_sign() const {
    if (lower_.compare_zero() > 0) {
      return 1;
    }
    if (upper_.compare_zero() < 0) {
      return -1;
    }
    return 0;
  }
  [[nodiscard]] bool is_exact_zero() const {
    return lower_.compare_zero() == 0 && upper_.compare_zero() == 0;
  }
  [[nodiscard]] MpInterval inflate(const std::string& radius_token) const {
    const MpInterval radius = decimal(radius_token, bits());
    return inflate(radius);
  }
  [[nodiscard]] MpInterval inflate(const MpInterval& radius) const {
    if (radius.lower().compare_zero() < 0) {
      throw std::invalid_argument("MPFR inflation radius must be nonnegative");
    }
    return MpInterval(
        mp_subtract(lower_, radius.upper(), MPFR_RNDD),
        mp_add(upper_, radius.upper(), MPFR_RNDU));
  }

 private:
  MpFloat lower_;
  MpFloat upper_;
};

MpInterval operator+(const MpInterval& left, const MpInterval& right) {
  return MpInterval(
      mp_add(left.lower(), right.lower(), MPFR_RNDD),
      mp_add(left.upper(), right.upper(), MPFR_RNDU));
}

MpInterval operator-(const MpInterval& left, const MpInterval& right) {
  return MpInterval(
      mp_subtract(left.lower(), right.upper(), MPFR_RNDD),
      mp_subtract(left.upper(), right.lower(), MPFR_RNDU));
}

MpInterval operator*(const MpInterval& left, const MpInterval& right) {
  const bool left_nonnegative = left.lower().compare_zero() >= 0;
  const bool left_nonpositive = left.upper().compare_zero() <= 0;
  const bool right_nonnegative = right.lower().compare_zero() >= 0;
  const bool right_nonpositive = right.upper().compare_zero() <= 0;

  // The extrema of an interval product occur at corners. Once operand signs
  // are known, monotonicity selects the same directed corner products as the
  // exhaustive eight-product enclosure without evaluating dominated corners.
  if (left_nonnegative) {
    if (right_nonnegative) {
      return MpInterval(
          mp_multiply(left.lower(), right.lower(), MPFR_RNDD),
          mp_multiply(left.upper(), right.upper(), MPFR_RNDU));
    }
    if (right_nonpositive) {
      return MpInterval(
          mp_multiply(left.upper(), right.lower(), MPFR_RNDD),
          mp_multiply(left.lower(), right.upper(), MPFR_RNDU));
    }
    return MpInterval(
        mp_multiply(left.upper(), right.lower(), MPFR_RNDD),
        mp_multiply(left.upper(), right.upper(), MPFR_RNDU));
  }
  if (left_nonpositive) {
    if (right_nonnegative) {
      return MpInterval(
          mp_multiply(left.lower(), right.upper(), MPFR_RNDD),
          mp_multiply(left.upper(), right.lower(), MPFR_RNDU));
    }
    if (right_nonpositive) {
      return MpInterval(
          mp_multiply(left.upper(), right.upper(), MPFR_RNDD),
          mp_multiply(left.lower(), right.lower(), MPFR_RNDU));
    }
    return MpInterval(
        mp_multiply(left.lower(), right.upper(), MPFR_RNDD),
        mp_multiply(left.lower(), right.lower(), MPFR_RNDU));
  }
  if (right_nonnegative) {
    return MpInterval(
        mp_multiply(left.lower(), right.upper(), MPFR_RNDD),
        mp_multiply(left.upper(), right.upper(), MPFR_RNDU));
  }
  if (right_nonpositive) {
    return MpInterval(
        mp_multiply(left.upper(), right.lower(), MPFR_RNDD),
        mp_multiply(left.lower(), right.lower(), MPFR_RNDU));
  }

  MpFloat lower_left =
      mp_multiply(left.lower(), right.upper(), MPFR_RNDD);
  MpFloat lower_right =
      mp_multiply(left.upper(), right.lower(), MPFR_RNDD);
  MpFloat upper_left =
      mp_multiply(left.lower(), right.lower(), MPFR_RNDU);
  MpFloat upper_right =
      mp_multiply(left.upper(), right.upper(), MPFR_RNDU);
  MpFloat lower = lower_left.compare(lower_right) <= 0
      ? std::move(lower_left) : std::move(lower_right);
  MpFloat upper = upper_left.compare(upper_right) >= 0
      ? std::move(upper_left) : std::move(upper_right);
  return MpInterval(std::move(lower), std::move(upper));
}

MpInterval operator/(const MpInterval& left, const MpInterval& right) {
  if (right.contains_zero()) {
    throw std::domain_error("MPFR interval denominator contains zero");
  }
  const MpFloat one = MpFloat::unsigned_value(1, left.bits());
  const MpInterval reciprocal(
      mp_divide(one, right.upper(), MPFR_RNDD),
      mp_divide(one, right.lower(), MPFR_RNDU));
  return left * reciprocal;
}

MpInterval mp_square(const MpInterval& value) {
  if (value.contains_zero()) {
    const MpFloat zero = MpFloat::unsigned_value(0, value.bits());
    MpFloat lower_square =
        mp_multiply(value.lower(), value.lower(), MPFR_RNDU);
    MpFloat upper_square =
        mp_multiply(value.upper(), value.upper(), MPFR_RNDU);
    MpFloat upper = lower_square.compare(upper_square) > 0
                        ? std::move(lower_square)
                        : std::move(upper_square);
    return MpInterval(zero, std::move(upper));
  }
  if (value.lower().compare_zero() > 0) {
    return MpInterval(
        mp_multiply(value.lower(), value.lower(), MPFR_RNDD),
        mp_multiply(value.upper(), value.upper(), MPFR_RNDU));
  }
  return MpInterval(
      mp_multiply(value.upper(), value.upper(), MPFR_RNDD),
      mp_multiply(value.lower(), value.lower(), MPFR_RNDU));
}

MpInterval mp_sqrt(const MpInterval& value) {
  if (value.lower().compare_zero() < 0) {
    throw std::domain_error("MPFR square root requires nonnegative interval");
  }
  MpFloat lower(value.bits());
  MpFloat upper(value.bits());
  mpfr_sqrt(lower.raw(), value.lower().raw(), MPFR_RNDD);
  mpfr_sqrt(upper.raw(), value.upper().raw(), MPFR_RNDU);
  return MpInterval(std::move(lower), std::move(upper));
}

MpInterval mp_hull(const MpInterval& left, const MpInterval& right) {
  return MpInterval::bounds(
      left.lower().compare(right.lower()) <= 0 ? left.lower() : right.lower(),
      left.upper().compare(right.upper()) >= 0 ? left.upper() : right.upper());
}

using MpVector = std::array<MpInterval, 3>;

MpVector mp_subtract_vector(const MpVector& left, const MpVector& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

MpInterval mp_dot(const MpVector& left, const MpVector& right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

MpInterval mp_norm(const MpVector& value) {
  return mp_sqrt(mp_square(value[0]) + mp_square(value[1]) +
                 mp_square(value[2]));
}

MpVector mp_divide_vector(const MpVector& value, const MpInterval& divisor) {
  return {value[0] / divisor, value[1] / divisor, value[2] / divisor};
}

// One immutable segment image for one MPFR precision attempt. Position and
// derivative coefficients use the same directed interval operations as the
// former per-evaluation path; compiling them only changes when that work runs.
struct MpCompiledSegment {
  const CubicHistorySegment* source;
  MpInterval start_time;
  MpInterval end_time;
  std::array<std::array<MpInterval, 4>, 3> position_coefficients;
  std::array<std::array<MpInterval, 3>, 3> velocity_coefficients;
  MpInterval position_error;
  MpInterval velocity_error;
};

std::array<MpInterval, 4> mp_compile_position_axis(
    const auto& tokens,
    mpfr_prec_t bits) {
  return {
      MpInterval::decimal(tokens[0], bits),
      MpInterval::decimal(tokens[1], bits),
      MpInterval::decimal(tokens[2], bits),
      MpInterval::decimal(tokens[3], bits),
  };
}

std::array<MpInterval, 3> mp_compile_velocity_axis(
    const std::array<MpInterval, 4>& position_coefficients,
    const MpInterval& two,
    const MpInterval& three) {
  return {
      position_coefficients[1],
      two * position_coefficients[2],
      three * position_coefficients[3],
  };
}

MpCompiledSegment mp_compile_segment(
    const CubicHistorySegment& segment,
    const MpInterval& two,
    const MpInterval& three,
    mpfr_prec_t bits) {
  const auto& tokens = segment.coefficient_tokens();
  std::array<std::array<MpInterval, 4>, 3> position_coefficients = {
      mp_compile_position_axis(tokens[0], bits),
      mp_compile_position_axis(tokens[1], bits),
      mp_compile_position_axis(tokens[2], bits),
  };
  std::array<std::array<MpInterval, 3>, 3> velocity_coefficients = {
      mp_compile_velocity_axis(position_coefficients[0], two, three),
      mp_compile_velocity_axis(position_coefficients[1], two, three),
      mp_compile_velocity_axis(position_coefficients[2], two, three),
  };
  return {
      .source = &segment,
      .start_time = MpInterval::decimal(segment.t_start_token(), bits),
      .end_time = MpInterval::decimal(segment.t_end_token(), bits),
      .position_coefficients = std::move(position_coefficients),
      .velocity_coefficients = std::move(velocity_coefficients),
      .position_error =
          MpInterval::decimal(segment.position_error_token(), bits),
      .velocity_error =
          MpInterval::decimal(segment.velocity_error_token(), bits),
  };
}

std::vector<MpCompiledSegment> mp_compile_history(
    const RetainedHistory& history,
    mpfr_prec_t bits) {
  const MpInterval two = MpInterval::decimal("2", bits);
  const MpInterval three = MpInterval::decimal("3", bits);
  std::vector<MpCompiledSegment> compiled;
  compiled.reserve(history.segments().size());
  for (const auto& segment : history.segments()) {
    compiled.push_back(mp_compile_segment(segment, two, three, bits));
  }
  return compiled;
}

MpInterval mp_polynomial(
    const MpCompiledSegment& segment,
    std::size_t axis,
    const MpInterval& time) {
  const auto& coefficients = segment.position_coefficients[axis];
  const MpInterval local_time = time - segment.start_time;
  MpInterval result = coefficients[3];
  for (int index = 2; index >= 0; --index) {
    result = result * local_time +
        coefficients[static_cast<std::size_t>(index)];
  }
  return result;
}

MpInterval mp_velocity_polynomial(
    const MpCompiledSegment& segment,
    std::size_t axis,
    const MpInterval& time) {
  const auto& coefficients = segment.velocity_coefficients[axis];
  const MpInterval local_time = time - segment.start_time;
  MpInterval result = coefficients[2];
  result = result * local_time + coefficients[1];
  result = result * local_time + coefficients[0];
  return result;
}

MpVector mp_position(
    const MpCompiledSegment& segment,
    const MpInterval& time) {
  return {
      mp_polynomial(segment, 0, time).inflate(segment.position_error),
      mp_polynomial(segment, 1, time).inflate(segment.position_error),
      mp_polynomial(segment, 2, time).inflate(segment.position_error),
  };
}

MpVector mp_velocity(
    const MpCompiledSegment& segment,
    const MpInterval& time) {
  return {
      mp_velocity_polynomial(segment, 0, time).inflate(segment.velocity_error),
      mp_velocity_polynomial(segment, 1, time).inflate(segment.velocity_error),
      mp_velocity_polynomial(segment, 2, time).inflate(segment.velocity_error),
  };
}

const MpCompiledSegment& mp_segment_at(
    const std::vector<MpCompiledSegment>& history,
    const MpFloat& time) {
  for (const auto& segment : history) {
    if (time.compare(segment.start_time.lower()) >= 0 &&
        time.compare(segment.end_time.upper()) <= 0) {
      return segment;
    }
  }
  throw std::out_of_range("MPFR time lies outside retained history");
}

struct MpGeometry {
  MpInterval residual;
  std::optional<MpInterval> source_normal;
  std::optional<MpInterval> receiver_normal;
};

struct MpReceiverState {
  MpVector position;
  MpVector velocity;
  bool correlated_self_chord = false;
  const std::vector<MpCompiledSegment>* correlated_history = nullptr;
};

std::optional<MpVector> mp_correlated_self_displacement(
    const MpReceiverState& receiver,
    const MpInterval& reception,
    const MpInterval& emission) {
  if (!receiver.correlated_self_chord ||
      receiver.correlated_history == nullptr ||
      emission.upper().compare(reception.lower()) > 0) {
    return std::nullopt;
  }
  const mpfr_prec_t bits = reception.bits();
  MpVector result{
      MpInterval::decimal("0", bits),
      MpInterval::decimal("0", bits),
      MpInterval::decimal("0", bits)};
  bool started = false;
  for (const auto& segment : *receiver.correlated_history) {
    const bool contains_emission =
        emission.lower().compare(segment.start_time.lower()) >= 0 &&
        emission.upper().compare(segment.end_time.upper()) <= 0;
    const bool contains_reception =
        reception.lower().compare(segment.start_time.lower()) >= 0 &&
        reception.upper().compare(segment.end_time.upper()) <= 0;
    if (!started && !contains_emission) {
      continue;
    }
    started = true;
    const MpInterval& local_lower =
        contains_emission ? emission : segment.start_time;
    const MpInterval& local_upper =
        contains_reception ? reception : segment.end_time;
    if (local_lower.upper().compare(local_upper.lower()) > 0) {
      return std::nullopt;
    }
    const MpInterval duration = local_upper - local_lower;
    const MpFloat radius =
        (segment.velocity_error * duration).upper();
    for (std::size_t axis = 0; axis < result.size(); ++axis) {
      MpInterval contribution =
          mp_polynomial(segment, axis, local_upper) -
          mp_polynomial(segment, axis, local_lower);
      contribution = MpInterval(
          mp_subtract(contribution.lower(), radius, MPFR_RNDD),
          mp_add(contribution.upper(), radius, MPFR_RNDU));
      result[axis] = result[axis] + contribution;
    }
    if (contains_reception) {
      return result;
    }
  }
  return std::nullopt;
}

MpGeometry mp_geometry(
    const MpReceiverState& receiver,
    const MpCompiledSegment& source_segment,
    const MpInterval& reception,
    const MpInterval& emission,
    const MpInterval& field_speed) {
  const auto source_velocity = mp_velocity(source_segment, emission);
  const auto correlated_displacement =
      mp_correlated_self_displacement(receiver, reception, emission);
  const auto displacement = correlated_displacement.has_value()
      ? *correlated_displacement
      : mp_subtract_vector(
            receiver.position, mp_position(source_segment, emission));
  const MpInterval separation = mp_norm(displacement);
  const MpInterval residual = separation - field_speed * (reception - emission);
  if (separation.contains_zero()) {
    return {residual, std::nullopt, std::nullopt};
  }
  const auto direction = mp_divide_vector(displacement, separation);
  return {
      residual,
      field_speed - mp_dot(direction, source_velocity),
      field_speed - mp_dot(direction, receiver.velocity),
  };
}

struct MpRoot {
  MpFloat lower;
  MpFloat upper;
  MpInterval source_normal;
  MpInterval receiver_normal;
  std::vector<std::size_t> source_segment_indices;
};

struct MpAttempt {
  bool complete = true;
  bool memory_boundary_contact = false;
  bool coincident_endpoint_excluded = false;
  bool caustic_candidate = false;
  bool finite_width_root_cluster = false;
  std::size_t visited_cells = 0;
  std::size_t excluded_cells = 0;
  std::size_t difficult_cells = 0;
  std::vector<MpRoot> roots;
};

bool merge_mp_roots(std::vector<MpRoot>& roots) {
  std::sort(roots.begin(), roots.end(), [](const auto& left, const auto& right) {
    const int lower_order = left.lower.compare(right.lower);
    return lower_order < 0 ||
           (lower_order == 0 && left.upper.compare(right.upper) < 0);
  });
  std::vector<MpRoot> merged;
  for (const auto& root : roots) {
    if (merged.empty() || root.lower.compare(merged.back().upper) > 0) {
      merged.push_back(root);
      continue;
    }
    if (root.source_normal.strict_sign() !=
        merged.back().source_normal.strict_sign()) {
      return false;
    }
    if (root.lower.compare(merged.back().lower) < 0) {
      merged.back().lower = root.lower;
    }
    if (root.upper.compare(merged.back().upper) > 0) {
      merged.back().upper = root.upper;
    }
    merged.back().source_normal = MpInterval(
        root.source_normal.lower().compare(
            merged.back().source_normal.lower()) < 0
            ? root.source_normal.lower()
            : merged.back().source_normal.lower(),
        root.source_normal.upper().compare(
            merged.back().source_normal.upper()) > 0
            ? root.source_normal.upper()
            : merged.back().source_normal.upper());
    merged.back().receiver_normal = MpInterval(
        root.receiver_normal.lower().compare(
            merged.back().receiver_normal.lower()) < 0
            ? root.receiver_normal.lower()
            : merged.back().receiver_normal.lower(),
        root.receiver_normal.upper().compare(
            merged.back().receiver_normal.upper()) > 0
            ? root.receiver_normal.upper()
            : merged.back().receiver_normal.upper());
    merged.back().source_segment_indices.insert(
        merged.back().source_segment_indices.end(),
        root.source_segment_indices.begin(), root.source_segment_indices.end());
    std::sort(merged.back().source_segment_indices.begin(),
              merged.back().source_segment_indices.end());
    merged.back().source_segment_indices.erase(
        std::unique(merged.back().source_segment_indices.begin(),
                    merged.back().source_segment_indices.end()),
        merged.back().source_segment_indices.end());
  }
  roots = std::move(merged);
  return true;
}

bool mp_width_within(
    const MpFloat& lower,
    const MpFloat& upper,
    const MpFloat& tolerance) {
  const MpFloat width = mp_subtract(upper, lower, MPFR_RNDU);
  return width.compare(tolerance) <= 0;
}

std::optional<std::pair<MpFloat, MpFloat>> surround_mp_root(
    const MpReceiverState& receiver,
    const MpCompiledSegment& source_segment,
    const MpInterval& reception,
    const MpInterval& field_speed,
    const MpFloat& point,
    const MpFloat& bracket_lower,
    const MpFloat& bracket_upper,
    const MpFloat& tolerance,
    mpfr_prec_t bits) {
  MpFloat adjacent_lower(point);
  MpFloat adjacent_upper(point);
  const MpFloat& segment_lower = source_segment.start_time.lower();
  const MpFloat& segment_upper = source_segment.end_time.upper();
  for (unsigned stage = 0; stage <= 20; ++stage) {
    const unsigned long advances =
        stage == 0 ? 1UL : (1UL << (stage - 1U));
    for (unsigned long step = 0; step < advances; ++step) {
      mpfr_nextbelow(adjacent_lower.raw());
      mpfr_nextabove(adjacent_upper.raw());
    }
    if (adjacent_lower.compare(segment_lower) < 0 ||
        adjacent_upper.compare(segment_upper) > 0) {
      break;
    }
    const int lower_sign =
        mp_geometry(
            receiver, source_segment, reception,
            MpInterval::point(adjacent_lower), field_speed)
            .residual.strict_sign();
    const int upper_sign =
        mp_geometry(
            receiver, source_segment, reception,
            MpInterval::point(adjacent_upper), field_speed)
            .residual.strict_sign();
    if (lower_sign != 0 && upper_sign != 0 && lower_sign != upper_sign) {
      return std::make_pair(adjacent_lower, adjacent_upper);
    }
  }

  const MpFloat sixty_four = MpFloat::unsigned_value(64, bits);
  MpFloat radius = mp_divide(tolerance, sixty_four, MPFR_RNDU);
  for (unsigned stage = 0; stage <= 5; ++stage) {
    MpFloat lower = mp_subtract(point, radius, MPFR_RNDD);
    MpFloat upper = mp_add(point, radius, MPFR_RNDU);
    if (lower.compare(bracket_lower) < 0) {
      lower = bracket_lower;
    }
    if (upper.compare(bracket_upper) > 0) {
      upper = bracket_upper;
    }
    if (lower.compare(point) >= 0 || upper.compare(point) <= 0 ||
        !mp_width_within(lower, upper, tolerance)) {
      mpfr_mul_2ui(radius.raw(), radius.raw(), 1, MPFR_RNDU);
      continue;
    }
    const int lower_sign =
        mp_geometry(receiver, source_segment, reception, MpInterval::point(lower),
                    field_speed)
            .residual.strict_sign();
    const int upper_sign =
        mp_geometry(receiver, source_segment, reception, MpInterval::point(upper),
                    field_speed)
            .residual.strict_sign();
    if (lower_sign != 0 && upper_sign != 0 && lower_sign != upper_sign) {
      return std::make_pair(lower, upper);
    }
    mpfr_mul_2ui(radius.raw(), radius.raw(), 1, MPFR_RNDU);
  }
  return std::nullopt;
}

std::optional<MpRoot> surround_mp_segment_join_root(
    const MpReceiverState& receiver,
    const MpCompiledSegment& left_segment,
    const MpCompiledSegment& right_segment,
    std::size_t left_segment_index,
    std::size_t right_segment_index,
    const MpInterval& reception,
    const MpInterval& field_speed,
    const MpFloat& search_lower,
    const MpFloat& search_upper,
    const MpFloat& tolerance,
    mpfr_prec_t bits) {
  const MpFloat& boundary_lower = left_segment.end_time.lower();
  const MpFloat& boundary_upper = left_segment.end_time.upper();
  if (boundary_upper.compare(search_lower) <= 0 ||
      boundary_lower.compare(search_upper) >= 0) {
    return std::nullopt;
  }
  if (boundary_lower.compare(boundary_upper) == 0) {
    const MpInterval boundary = MpInterval::point(boundary_lower);
    const auto left_residual = mp_geometry(
        receiver, left_segment, reception, boundary, field_speed).residual;
    const auto right_residual = mp_geometry(
        receiver, right_segment, reception, boundary, field_speed).residual;
    if (left_residual.is_exact_zero() && right_residual.is_exact_zero()) {
      return std::nullopt;
    }
  }

  const MpFloat sixty_four = MpFloat::unsigned_value(64, bits);
  MpFloat radius = mp_divide(tolerance, sixty_four, MPFR_RNDU);
  for (unsigned stage = 0; stage <= 5; ++stage) {
    MpFloat lower = mp_subtract(boundary_lower, radius, MPFR_RNDD);
    MpFloat upper = mp_add(boundary_upper, radius, MPFR_RNDU);
    if (lower.compare(search_lower) < 0) {
      lower = search_lower;
    }
    if (upper.compare(search_upper) > 0) {
      upper = search_upper;
    }
    if (lower.compare(boundary_lower) >= 0 ||
        upper.compare(boundary_upper) <= 0 ||
        !mp_width_within(lower, upper, tolerance)) {
      mpfr_mul_2ui(radius.raw(), radius.raw(), 1, MPFR_RNDU);
      continue;
    }

    const int lower_sign =
        mp_geometry(receiver, left_segment, reception, MpInterval::point(lower),
                    field_speed)
            .residual.strict_sign();
    const int upper_sign =
        mp_geometry(receiver, right_segment, reception,
                    MpInterval::point(upper), field_speed)
            .residual.strict_sign();
    if (lower_sign == 0 || upper_sign == 0 || lower_sign == upper_sign) {
      mpfr_mul_2ui(radius.raw(), radius.raw(), 1, MPFR_RNDU);
      continue;
    }

    const auto left_geometry = mp_geometry(
        receiver, left_segment, reception,
        MpInterval::bounds(lower, boundary_upper), field_speed);
    const auto right_geometry = mp_geometry(
        receiver, right_segment, reception,
        MpInterval::bounds(boundary_lower, upper), field_speed);
    if (!left_geometry.source_normal.has_value() ||
        !right_geometry.source_normal.has_value() ||
        !left_geometry.receiver_normal.has_value() ||
        !right_geometry.receiver_normal.has_value()) {
      return std::nullopt;
    }
    const MpInterval source_normal = mp_hull(
        *left_geometry.source_normal, *right_geometry.source_normal);
    if (source_normal.strict_sign() == 0 ||
        source_normal.strict_sign() != left_geometry.source_normal->strict_sign() ||
        source_normal.strict_sign() != right_geometry.source_normal->strict_sign()) {
      return std::nullopt;
    }
    return MpRoot{
        lower,
        upper,
        source_normal,
        mp_hull(*left_geometry.receiver_normal,
                *right_geometry.receiver_normal),
        {left_segment_index, right_segment_index}};
  }
  return std::nullopt;
}

bool mp_self_endpoint_open_cell_is_root_free(
    const ExactPairRequest& request,
    const MpCompiledSegment& source_segment,
    const MpInterval& emission,
    const MpInterval& reception,
    const MpInterval& field_speed,
    mpfr_prec_t bits) {
  if (request.receiver->history_id() != request.source->history_id()) {
    return false;
  }
  const auto& certificate =
      request.source->uniform_circular_endpoint_certificate();
  if (certificate.has_value()) {
    const MpInterval valid_reception =
        MpInterval::decimal(certificate->valid_reception_time, bits);
    const MpInterval tangential_speed =
        MpInterval::decimal(certificate->tangential_speed, bits);
    if (valid_reception.lower().compare(reception.lower()) == 0 &&
        valid_reception.upper().compare(reception.upper()) == 0 &&
        tangential_speed.lower().compare_zero() > 0 &&
        tangential_speed.upper().compare(field_speed.lower()) <= 0) {
      return true;
    }
  }
  if (emission.upper().compare(reception.upper()) != 0) {
    return false;
  }
  const MpVector velocity = mp_velocity(source_segment, emission);
  const MpInterval speed = mp_norm(velocity);
  if (speed.upper().compare(field_speed.lower()) < 0) {
    return true;
  }
  const MpInterval zero = MpInterval::decimal("0", bits);
  const MpInterval negative_field_speed = zero - field_speed;
  return std::any_of(
      velocity.begin(), velocity.end(), [&](const MpInterval& component) {
        return component.lower().compare(field_speed.upper()) > 0 ||
            component.upper().compare(negative_field_speed.lower()) < 0;
      });
}

MpAttempt run_mpfr_attempt(const ExactPairRequest& request, unsigned bits_value) {
  const mpfr_prec_t bits = static_cast<mpfr_prec_t>(bits_value);
  reset_mp_decimal_cache(bits);
  MpAttempt attempt;
  const MpInterval reception =
      MpInterval::decimal(request.reception_time, bits);
  const MpInterval field_speed = MpInterval::decimal(request.field_speed, bits);
  const MpFloat search_lower =
      mp_cached_decimal(request.search_lower, bits, MPFR_RNDD);
  const MpFloat search_upper =
      mp_cached_decimal(request.search_upper, bits, MPFR_RNDU);
  const MpFloat tolerance =
      mp_cached_decimal(request.root_tolerance, bits, MPFR_RNDU);
  const bool same_retained_history =
      request.receiver->history_id() == request.source->history_id() &&
      request.receiver->provenance_fingerprint() ==
          request.source->provenance_fingerprint();
  const auto source_history = mp_compile_history(*request.source, bits);
  std::optional<std::vector<MpCompiledSegment>> receiver_history_storage;
  const std::vector<MpCompiledSegment>* receiver_history = &source_history;
  if (request.receiver != request.source) {
    receiver_history_storage.emplace(
        mp_compile_history(*request.receiver, bits));
    receiver_history = &*receiver_history_storage;
  }
  const auto& receiver_segment = mp_segment_at(
      *receiver_history, mp_midpoint(reception.lower(), reception.upper()));
  const MpReceiverState receiver_state{
      mp_position(receiver_segment, reception),
      mp_velocity(receiver_segment, reception),
      same_retained_history,
      same_retained_history ? receiver_history : nullptr};

  struct Cell {
    std::size_t segment_index;
    MpFloat lower;
    MpFloat upper;
    std::size_t depth;
  };

  std::vector<Cell> cells;
  std::size_t first_segment = 0U;
  std::size_t suffix_upper = source_history.size();
  while (first_segment < suffix_upper) {
    const std::size_t middle =
        first_segment + (suffix_upper - first_segment) / 2U;
    if (source_history[middle].end_time.upper().compare(search_lower) <= 0) {
      first_segment = middle + 1U;
    } else {
      suffix_upper = middle;
    }
  }
  for (std::size_t index = first_segment;
       index < source_history.size(); ++index) {
    const auto& segment = source_history[index];
    const MpFloat& segment_lower = segment.start_time.lower();
    if (segment_lower.compare(search_upper) >= 0) {
      break;
    }
    const MpFloat& segment_upper = segment.end_time.upper();
    const MpFloat lower =
        search_lower.compare(segment_lower) >= 0 ? search_lower : segment_lower;
    const MpFloat upper =
        search_upper.compare(segment_upper) <= 0 ? search_upper : segment_upper;
    if (lower.compare(upper) < 0) {
      cells.push_back({index, lower, upper, 0});
    }
  }
  if (cells.empty()) {
    throw std::out_of_range("MPFR root search has no covered segment");
  }
  std::vector<bool> subfield_suffix(
      source_history.size() + 1U, true);
  if (same_retained_history) {
    for (std::size_t index = source_history.size(); index-- > 0U;) {
      const auto& segment = source_history[index];
      const MpFloat& lower = segment.start_time.lower();
      const MpFloat& segment_upper = segment.end_time.upper();
      const MpFloat upper =
          segment_upper.compare(reception.upper()) <= 0
          ? segment_upper : reception.upper();
      bool segment_subfield = true;
      if (lower.compare(upper) < 0) {
        segment_subfield =
            mp_norm(mp_velocity(
                segment, MpInterval::bounds(lower, upper)))
                .upper()
                .compare(field_speed.lower()) < 0;
      }
      subfield_suffix[index] =
          segment_subfield && subfield_suffix[index + 1U];
    }
  }
  const auto self_path_from_cell_is_subfield = [&](const Cell& cell) {
    if (!same_retained_history ||
        !subfield_suffix[cell.segment_index + 1U]) {
      return false;
    }
    const auto& segment = source_history[cell.segment_index];
    const MpFloat& segment_upper = segment.end_time.upper();
    const MpFloat upper = segment_upper.compare(reception.upper()) <= 0
        ? segment_upper : reception.upper();
    return cell.lower.compare(upper) < 0 &&
        mp_norm(mp_velocity(
            segment, MpInterval::bounds(cell.lower, upper)))
            .upper()
            .compare(field_speed.lower()) < 0;
  };

  auto add_endpoint_root = [&](const MpCompiledSegment& source_segment,
                               std::size_t segment_index,
                               const MpFloat& point,
                               const MpFloat& cell_lower,
                               const MpFloat& cell_upper,
                               const MpInterval& point_residual) {
    MpFloat lower(point);
    MpFloat upper(point);
    if (!point_residual.is_exact_zero()) {
      const auto surrounded = surround_mp_root(
          receiver_state, source_segment, reception, field_speed, point,
          cell_lower, cell_upper, tolerance, bits);
      if (!surrounded.has_value()) {
        std::optional<MpRoot> join_root;
        const MpFloat& segment_start = source_segment.start_time.lower();
        const MpFloat& segment_end = source_segment.end_time.upper();
        if (point.compare(segment_end) == 0 &&
            segment_index + 1U < source_history.size()) {
          join_root = surround_mp_segment_join_root(
              receiver_state, source_segment,
              source_history[segment_index + 1U], segment_index,
              segment_index + 1U, reception, field_speed, search_lower,
              search_upper, tolerance, bits);
        } else if (point.compare(segment_start) == 0 && segment_index > 0U) {
          join_root = surround_mp_segment_join_root(
              receiver_state, source_history[segment_index - 1U],
              source_segment, segment_index - 1U, segment_index, reception,
              field_speed, search_lower, search_upper, tolerance, bits);
        }
        if (join_root.has_value()) {
          attempt.roots.push_back(*join_root);
          ++attempt.excluded_cells;
          return;
        }
        attempt.complete = false;
        attempt.finite_width_root_cluster = same_retained_history;
        ++attempt.difficult_cells;
        return;
      }
      lower = surrounded->first;
      upper = surrounded->second;
    }
    const auto root_geometry = mp_geometry(
        receiver_state, source_segment, reception,
        MpInterval::bounds(lower, upper), field_speed);
    if (!root_geometry.source_normal.has_value() ||
        !root_geometry.receiver_normal.has_value() ||
        root_geometry.source_normal->contains_zero()) {
      attempt.complete = false;
      attempt.caustic_candidate = true;
      ++attempt.difficult_cells;
      return;
    }
    if (point.compare(search_lower) == 0) {
      attempt.memory_boundary_contact = true;
    }
    attempt.roots.push_back(
        {lower, upper, *root_geometry.source_normal,
         *root_geometry.receiver_normal, {segment_index}});
  };

  std::function<void(const Cell&)> classify;
  classify = [&](const Cell& cell) {
    if (!attempt.complete) {
      return;
    }
    ++attempt.visited_cells;
    if (attempt.visited_cells > request.max_cells ||
        cell.depth > request.max_depth) {
      attempt.complete = false;
      ++attempt.difficult_cells;
      return;
    }
    const auto& source_segment = source_history[cell.segment_index];
    const MpInterval emission = MpInterval::bounds(cell.lower, cell.upper);
    if (self_path_from_cell_is_subfield(cell)) {
      if (search_upper.compare(reception.upper()) == 0) {
        attempt.coincident_endpoint_excluded = true;
      }
      ++attempt.excluded_cells;
      return;
    }
    if (mp_self_endpoint_open_cell_is_root_free(
            request, source_segment, emission, reception,
            field_speed, bits)) {
      attempt.coincident_endpoint_excluded = true;
      ++attempt.excluded_cells;
      return;
    }
    const auto geometry = mp_geometry(
        receiver_state, source_segment, reception, emission, field_speed);
    if (geometry.residual.excludes_zero()) {
      ++attempt.excluded_cells;
      return;
    }
    if (!geometry.source_normal.has_value() ||
        geometry.source_normal->contains_zero()) {
      if (mp_width_within(cell.lower, cell.upper, tolerance) ||
          cell.depth == request.max_depth) {
        attempt.complete = false;
        attempt.caustic_candidate = true;
        ++attempt.difficult_cells;
        return;
      }
      const MpFloat middle = mp_midpoint(cell.lower, cell.upper);
      if (middle.compare(cell.lower) == 0 || middle.compare(cell.upper) == 0) {
        attempt.complete = false;
        ++attempt.difficult_cells;
        return;
      }
      classify({cell.segment_index, cell.lower, middle, cell.depth + 1});
      classify({cell.segment_index, middle, cell.upper, cell.depth + 1});
      return;
    }

    const auto lower_geometry = mp_geometry(
        receiver_state, source_segment, reception, MpInterval::point(cell.lower),
        field_speed);
    const auto upper_geometry = mp_geometry(
        receiver_state, source_segment, reception, MpInterval::point(cell.upper),
        field_speed);
    const int lower_sign = lower_geometry.residual.strict_sign();
    const int upper_sign = upper_geometry.residual.strict_sign();
    if (same_retained_history &&
        cell.upper.compare(reception.upper()) == 0 &&
        search_upper.compare(reception.upper()) == 0 &&
        lower_sign != 0 && upper_sign == 0) {
      // The self identity fixes g(T,T)=0 even when independent retained-error
      // enclosures make the point evaluation merely contain zero.  A strict
      // source-normal sign over this cell makes the residual monotone, so the
      // sole zero is the H(0)-excluded coincident endpoint.
      attempt.coincident_endpoint_excluded = true;
      ++attempt.excluded_cells;
      return;
    }
    if (lower_sign != 0 && lower_sign == upper_sign) {
      ++attempt.excluded_cells;
      return;
    }
    if (lower_sign == 0) {
      add_endpoint_root(
          source_segment, cell.segment_index, cell.lower, cell.lower,
          cell.upper, lower_geometry.residual);
      return;
    }
    if (upper_sign == 0) {
      add_endpoint_root(
          source_segment, cell.segment_index, cell.upper, cell.lower,
          cell.upper, upper_geometry.residual);
      return;
    }

    MpFloat lower(cell.lower);
    MpFloat upper(cell.upper);
    int refined_lower_sign = lower_sign;
    int refined_upper_sign = upper_sign;
    std::size_t iterations = 0;
    while (!mp_width_within(lower, upper, tolerance) &&
           iterations < request.max_depth) {
      const MpFloat middle = mp_split(lower, upper);
      int middle_sign =
          mp_geometry(receiver_state, source_segment, reception,
                      MpInterval::point(middle), field_speed)
              .residual.strict_sign();
      if (middle_sign == 0) {
        const auto surrounded = surround_mp_root(
            receiver_state, source_segment, reception, field_speed, middle,
            lower, upper, tolerance, bits);
        if (!surrounded.has_value()) {
          attempt.complete = false;
          attempt.finite_width_root_cluster = same_retained_history;
          ++attempt.difficult_cells;
          return;
        }
        lower = surrounded->first;
        upper = surrounded->second;
        refined_lower_sign = -1;
        refined_upper_sign = 1;
        if (lower_sign > upper_sign) {
          std::swap(refined_lower_sign, refined_upper_sign);
        }
        break;
      }
      if (middle_sign == refined_lower_sign) {
        lower = middle;
      } else {
        upper = middle;
        refined_upper_sign = middle_sign;
      }
      ++iterations;
    }
    if (refined_lower_sign == refined_upper_sign ||
        !mp_width_within(lower, upper, tolerance)) {
      attempt.complete = false;
      attempt.finite_width_root_cluster = same_retained_history;
      ++attempt.difficult_cells;
      return;
    }
    const auto root_geometry = mp_geometry(
        receiver_state, source_segment, reception,
        MpInterval::bounds(lower, upper), field_speed);
    if (!root_geometry.source_normal.has_value() ||
        !root_geometry.receiver_normal.has_value() ||
        root_geometry.source_normal->contains_zero()) {
      attempt.complete = false;
      attempt.caustic_candidate = true;
      ++attempt.difficult_cells;
      return;
    }
    attempt.roots.push_back(
        {lower, upper, *root_geometry.source_normal,
         *root_geometry.receiver_normal, {cell.segment_index}});
  };

  for (const auto& cell : cells) {
    classify(cell);
  }
  if (attempt.complete && !merge_mp_roots(attempt.roots)) {
    attempt.complete = false;
    attempt.caustic_candidate = true;
    ++attempt.difficult_cells;
  }
  return attempt;
}

ExactPairCertificate double_certificate(
    const ExactPairRequest& request,
    const DoubleAttempt& attempt) {
  ExactPairCertificate certificate{
      .schema = "eom_native_exact_pair_certificate/v0",
      .row_id = request.row_id,
      .receiver_history_id = request.receiver->history_id(),
      .source_history_id = request.source->history_id(),
      .receiver_history_fingerprint =
          request.receiver->provenance_fingerprint(),
      .source_history_fingerprint = request.source->provenance_fingerprint(),
      .reception_time = request.reception_time,
      .searched_lower = request.search_lower,
      .searched_upper = request.search_upper,
      .field_speed = request.field_speed,
      .root_tolerance = request.root_tolerance,
      .status = attempt.memory_boundary_contact
                    ? "memory_boundary_contact"
                    : "certified_complete",
      .failure_code = attempt.memory_boundary_contact
                          ? "insufficient_history_depth"
                          : "",
      .root_free_complement = true,
      .memory_boundary_contact = attempt.memory_boundary_contact,
      .coincident_endpoint_excluded = attempt.coincident_endpoint_excluded,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = attempt.visited_cells,
      .excluded_cells = attempt.excluded_cells,
      .difficult_cells = attempt.difficult_cells,
      .roots = {},
  };
  certificate.roots.reserve(attempt.roots.size());
  for (const auto& root : attempt.roots) {
    certificate.roots.push_back({
        .lower = double_token(root.lower),
        .upper = double_token(root.upper),
        .source_normal_lower = double_token(root.source_normal.lower()),
        .source_normal_upper = double_token(root.source_normal.upper()),
        .receiver_normal_lower = double_token(root.receiver_normal.lower()),
        .receiver_normal_upper = double_token(root.receiver_normal.upper()),
        .source_normal_sign = root.source_normal.strict_sign(),
        .source_segment_indices = root.source_segment_indices,
        .precision_route = "binary64_outward",
        .precision_bits = 53,
    });
  }
  certificate.warm_excluded_cells = attempt.warm_excluded_cells;
  certificate.reevaluated_cells = attempt.visited_cells;
  certificate.warm_residual_drift_upper =
      attempt.warm_residual_drift_upper;
  certificate.root_free_cells.reserve(attempt.root_free_cells.size());
  for (const auto& cell : attempt.root_free_cells) {
    certificate.root_free_cells.push_back({
        .source_segment_index = cell.source_segment_index,
        .lower = double_token(cell.lower),
        .upper = double_token(cell.upper),
        .residual_lower = double_token(cell.residual.lower()),
        .residual_upper = double_token(cell.residual.upper()),
        .receiver_normal_lower =
            double_token(cell.receiver_normal.lower()),
        .receiver_normal_upper =
            double_token(cell.receiver_normal.upper()),
    });
  }
  return certificate;
}

ExactPairCertificate double_token_dominated_failure_certificate(
    const ExactPairRequest& request,
    const DoubleAttempt& attempt) {
  auto certificate = double_certificate(request, attempt);
  certificate.status = attempt.caustic_candidate
      ? "caustic_route_required" : "uncertified";
  certificate.failure_code = attempt.caustic_candidate
      ? "numeric_source_normal_sign_uncertified"
      : "numeric_root_count_uncertified";
  certificate.root_free_complement = false;
  certificate.memory_boundary_contact = false;
  certificate.roots.clear();
  return certificate;
}

ExactPairCertificate mpfr_certificate(
    const ExactPairRequest& request,
    const MpAttempt& attempt,
    unsigned bits,
    bool exhausted) {
  const bool complete = attempt.complete;
  ExactPairCertificate certificate{
      .schema = "eom_native_exact_pair_certificate/v0",
      .row_id = request.row_id,
      .receiver_history_id = request.receiver->history_id(),
      .source_history_id = request.source->history_id(),
      .receiver_history_fingerprint =
          request.receiver->provenance_fingerprint(),
      .source_history_fingerprint = request.source->provenance_fingerprint(),
      .reception_time = request.reception_time,
      .searched_lower = request.search_lower,
      .searched_upper = request.search_upper,
      .field_speed = request.field_speed,
      .root_tolerance = request.root_tolerance,
      .status = complete
                    ? (attempt.memory_boundary_contact
                           ? "memory_boundary_contact"
                           : "certified_complete")
                    : (attempt.caustic_candidate ||
                               attempt.finite_width_root_cluster
                           ? "caustic_route_required"
                           : "uncertified"),
      .failure_code = complete
                          ? (attempt.memory_boundary_contact
                                 ? "insufficient_history_depth"
                                 : "")
                          : (attempt.memory_boundary_contact
                                 ? "insufficient_history_depth"
                                 : (attempt.caustic_candidate
                                        ? "numeric_source_normal_sign_uncertified"
                                        : (attempt.finite_width_root_cluster
                                               ? "numeric_self_root_cluster_uncertified"
                                        : (exhausted
                                               ? "numeric_precision_limit_exhausted"
                                               : "numeric_root_count_uncertified")))),
      .root_free_complement = complete,
      .memory_boundary_contact = attempt.memory_boundary_contact,
      .coincident_endpoint_excluded = attempt.coincident_endpoint_excluded,
      .precision_escalated = true,
      .achieved_precision_bits = bits,
      .visited_cells = attempt.visited_cells,
      .excluded_cells = attempt.excluded_cells,
      .difficult_cells = attempt.difficult_cells,
      .roots = {},
  };
  if (!complete) {
    certificate.reevaluated_cells = attempt.visited_cells;
    return certificate;
  }
  certificate.roots.reserve(attempt.roots.size());
  for (const auto& root : attempt.roots) {
    certificate.roots.push_back({
        .lower = root.lower.token(MPFR_RNDD),
        .upper = root.upper.token(MPFR_RNDU),
        .source_normal_lower = root.source_normal.lower().token(MPFR_RNDD),
        .source_normal_upper = root.source_normal.upper().token(MPFR_RNDU),
        .receiver_normal_lower = root.receiver_normal.lower().token(MPFR_RNDD),
        .receiver_normal_upper = root.receiver_normal.upper().token(MPFR_RNDU),
        .source_normal_sign = root.source_normal.strict_sign(),
        .source_segment_indices = root.source_segment_indices,
        .precision_route = "mpfr_directed_interval",
        .precision_bits = bits,
    });
  }
  certificate.reevaluated_cells = attempt.visited_cells;
  return certificate;
}

void validate_request(const ExactPairRequest& request) {
  if (request.row_id.empty() || request.receiver == nullptr ||
      request.source == nullptr) {
    throw std::invalid_argument("exact-pair request requires row and histories");
  }
  if (request.initial_mpfr_bits < 64 ||
      request.maximum_mpfr_bits < request.initial_mpfr_bits) {
    throw std::invalid_argument("invalid MPFR precision ladder");
  }
  if (request.max_depth == 0 || request.max_cells == 0) {
    throw std::invalid_argument("exact-pair resource limits must be positive");
  }
}

class ExactPairWorkerPool {
 public:
  ExactPairWorkerPool() = default;
  ExactPairWorkerPool(const ExactPairWorkerPool&) = delete;
  ExactPairWorkerPool& operator=(const ExactPairWorkerPool&) = delete;

  ~ExactPairWorkerPool() {
    {
      std::lock_guard<std::mutex> lock(state_mutex_);
      stopping_ = true;
      ++generation_;
    }
    work_ready_.notify_all();
    for (auto& worker : workers_) {
      worker.join();
    }
  }

  std::vector<ExactPairCertificate> run(
      const std::vector<ExactPairRequest>& requests,
      std::size_t worker_count) {
    std::lock_guard<std::mutex> batch_lock(batch_mutex_);
    ensure_workers(worker_count);
    std::vector<ExactPairCertificate> results(requests.size());
    {
      std::lock_guard<std::mutex> lock(state_mutex_);
      requests_ = &requests;
      results_ = &results;
      next_.store(0U, std::memory_order_relaxed);
      active_workers_ = worker_count;
      remaining_workers_ = worker_count;
      failure_ = nullptr;
      ++generation_;
    }
    work_ready_.notify_all();

    std::unique_lock<std::mutex> lock(state_mutex_);
    work_complete_.wait(lock, [&]() { return remaining_workers_ == 0U; });
    requests_ = nullptr;
    results_ = nullptr;
    const std::exception_ptr failure = failure_;
    lock.unlock();
    if (failure != nullptr) {
      std::rethrow_exception(failure);
    }
    return results;
  }

 private:
  void ensure_workers(std::size_t worker_count) {
    while (workers_.size() < worker_count) {
      const std::size_t worker_index = workers_.size();
      workers_.emplace_back([this, worker_index]() {
        worker_loop(worker_index);
      });
    }
  }

  void worker_loop(std::size_t worker_index) {
    std::size_t observed_generation = 0U;
    while (true) {
      std::unique_lock<std::mutex> lock(state_mutex_);
      work_ready_.wait(lock, [&]() {
        return stopping_ || generation_ != observed_generation;
      });
      if (stopping_) {
        return;
      }
      observed_generation = generation_;
      const bool active = worker_index < active_workers_;
      lock.unlock();
      if (!active) {
        continue;
      }

      std::exception_ptr local_failure;
      try {
        while (true) {
          const std::size_t index =
              next_.fetch_add(1U, std::memory_order_relaxed);
          if (index >= requests_->size()) {
            break;
          }
          (*results_)[index] = certify_exact_pair((*requests_)[index]);
        }
      } catch (...) {
        local_failure = std::current_exception();
      }

      lock.lock();
      if (failure_ == nullptr && local_failure != nullptr) {
        failure_ = local_failure;
      }
      --remaining_workers_;
      if (remaining_workers_ == 0U) {
        work_complete_.notify_one();
      }
    }
  }

  std::mutex batch_mutex_;
  std::mutex state_mutex_;
  std::condition_variable work_ready_;
  std::condition_variable work_complete_;
  std::vector<std::thread> workers_;
  const std::vector<ExactPairRequest>* requests_ = nullptr;
  std::vector<ExactPairCertificate>* results_ = nullptr;
  std::atomic<std::size_t> next_{0U};
  std::size_t active_workers_ = 0U;
  std::size_t remaining_workers_ = 0U;
  std::size_t generation_ = 0U;
  std::exception_ptr failure_;
  bool stopping_ = false;
};

ExactPairWorkerPool& exact_pair_worker_pool() {
  static ExactPairWorkerPool pool;
  return pool;
}

}  // namespace

ExactPairCertificate certify_exact_pair(const ExactPairRequest& request) {
  validate_request(request);
  using Clock = std::chrono::steady_clock;
  const auto binary64_start = Clock::now();
  const DoubleAttempt fast = run_double_attempt(request);
  const double binary64_seconds =
      std::chrono::duration<double>(Clock::now() - binary64_start).count();
  if (fast.complete) {
    auto certificate = double_certificate(request, fast);
    certificate.binary64_cpu_seconds = binary64_seconds;
    return certificate;
  }
  if (fast.token_dominated_failure) {
    auto certificate =
        double_token_dominated_failure_certificate(request, fast);
    certificate.binary64_cpu_seconds = binary64_seconds;
    return certificate;
  }
  if (request.defer_precision_escalation) {
    auto certificate =
        double_token_dominated_failure_certificate(request, fast);
    certificate.status = "uncertified";
    certificate.failure_code =
        "numeric_precision_escalation_deferred_for_cost_feedback";
    certificate.binary64_cpu_seconds = binary64_seconds;
    return certificate;
  }
  unsigned bits = request.initial_mpfr_bits;
  MpAttempt latest;
  double mpfr_seconds = 0.0;
  std::size_t mpfr_attempt_count = 0;
  double mpfr_escalation_seconds = 0.0;
  std::size_t mpfr_escalation_attempt_count = 0;
  while (true) {
    const auto mpfr_start = Clock::now();
    latest = run_mpfr_attempt(request, bits);
    const double attempt_seconds =
        std::chrono::duration<double>(Clock::now() - mpfr_start).count();
    mpfr_seconds += attempt_seconds;
    ++mpfr_attempt_count;
    if (mpfr_attempt_count > 1U) {
      mpfr_escalation_seconds += attempt_seconds;
      ++mpfr_escalation_attempt_count;
    }
    if (latest.complete) {
      auto certificate = mpfr_certificate(request, latest, bits, false);
      certificate.binary64_cpu_seconds = binary64_seconds;
      certificate.mpfr_cpu_seconds = mpfr_seconds;
      certificate.mpfr_attempt_count = mpfr_attempt_count;
      certificate.mpfr_escalation_cpu_seconds = mpfr_escalation_seconds;
      certificate.mpfr_escalation_attempt_count =
          mpfr_escalation_attempt_count;
      return certificate;
    }
    if (bits >= request.maximum_mpfr_bits) {
      auto certificate = mpfr_certificate(request, latest, bits, true);
      certificate.binary64_cpu_seconds = binary64_seconds;
      certificate.mpfr_cpu_seconds = mpfr_seconds;
      certificate.mpfr_attempt_count = mpfr_attempt_count;
      certificate.mpfr_escalation_cpu_seconds = mpfr_escalation_seconds;
      certificate.mpfr_escalation_attempt_count =
          mpfr_escalation_attempt_count;
      return certificate;
    }
    bits = std::min(request.maximum_mpfr_bits, bits * 2U);
  }
}

std::vector<ExactPairCertificate> certify_exact_pair_batch(
    const std::vector<ExactPairRequest>& requests,
    std::size_t thread_count) {
  if (thread_count == 0) {
    throw std::invalid_argument("exact-pair batch requires at least one thread");
  }
  if (requests.empty()) {
    return {};
  }
  const std::size_t workers = std::min(thread_count, requests.size());
  return exact_pair_worker_pool().run(requests, workers);
}

}  // namespace architrino::eom

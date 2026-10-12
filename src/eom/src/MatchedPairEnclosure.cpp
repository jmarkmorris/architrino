#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <algorithm>
#include <array>
#include <cmath>
#include <stdexcept>
#include <utility>

namespace architrino::eom {
namespace {

// Sign, significant digits without leading or trailing zeros, and the decimal
// exponent of the last retained digit. Zero is {0, "", 0}.
struct ExactDecimal {
  int sign = 0;
  std::string digits;
  long long exponent = 0;
};

ExactDecimal parse_exact_decimal(const std::string& token) {
  std::size_t index = 0U;
  int sign = 1;
  if (index < token.size() && (token[index] == '+' || token[index] == '-')) {
    sign = token[index] == '-' ? -1 : 1;
    ++index;
  }
  std::string digits;
  long long fraction_digits = 0;
  bool any_digit = false;
  bool seen_point = false;
  for (; index < token.size(); ++index) {
    const char character = token[index];
    if (character >= '0' && character <= '9') {
      digits.push_back(character);
      any_digit = true;
      if (seen_point) {
        ++fraction_digits;
      }
    } else if (character == '.' && !seen_point) {
      seen_point = true;
    } else {
      break;
    }
  }
  if (!any_digit) {
    throw std::invalid_argument("token is not an exact finite decimal");
  }
  long long exponent = 0;
  if (index < token.size() && (token[index] == 'e' || token[index] == 'E')) {
    ++index;
    int exponent_sign = 1;
    if (index < token.size() && (token[index] == '+' || token[index] == '-')) {
      exponent_sign = token[index] == '-' ? -1 : 1;
      ++index;
    }
    bool any_exponent_digit = false;
    for (; index < token.size(); ++index) {
      const char character = token[index];
      if (character < '0' || character > '9') {
        break;
      }
      any_exponent_digit = true;
      if (exponent > 1000000) {
        throw std::invalid_argument("decimal exponent is out of range");
      }
      exponent = exponent * 10 + (character - '0');
    }
    if (!any_exponent_digit) {
      throw std::invalid_argument("token is not an exact finite decimal");
    }
    exponent *= exponent_sign;
  }
  if (index != token.size()) {
    throw std::invalid_argument("token is not an exact finite decimal");
  }
  exponent -= fraction_digits;
  const std::size_t first = digits.find_first_not_of('0');
  if (first == std::string::npos) {
    return {};
  }
  digits.erase(0U, first);
  while (!digits.empty() && digits.back() == '0') {
    digits.pop_back();
    ++exponent;
  }
  return {sign, std::move(digits), exponent};
}

int compare_magnitudes(const ExactDecimal& left, const ExactDecimal& right) {
  if (left.digits.empty() || right.digits.empty()) {
    return left.digits.empty() ? (right.digits.empty() ? 0 : -1) : 1;
  }
  // Position of the leading digit: digits.size() + exponent.
  const long long left_top =
      static_cast<long long>(left.digits.size()) + left.exponent;
  const long long right_top =
      static_cast<long long>(right.digits.size()) + right.exponent;
  if (left_top != right_top) {
    return left_top < right_top ? -1 : 1;
  }
  const std::size_t common = std::max(left.digits.size(), right.digits.size());
  for (std::size_t index = 0U; index < common; ++index) {
    const char left_digit =
        index < left.digits.size() ? left.digits[index] : '0';
    const char right_digit =
        index < right.digits.size() ? right.digits[index] : '0';
    if (left_digit != right_digit) {
      return left_digit < right_digit ? -1 : 1;
    }
  }
  return 0;
}

int compare_exact(const ExactDecimal& left, const ExactDecimal& right) {
  if (left.sign != right.sign) {
    return left.sign < right.sign ? -1 : 1;
  }
  if (left.sign == 0) {
    return 0;
  }
  const int magnitude = compare_magnitudes(left, right);
  return left.sign > 0 ? magnitude : -magnitude;
}

using Row = std::array<Interval, 4>;

struct SlabControls {
  std::array<IntervalVector, 4> position;
  std::array<IntervalVector, 3> velocity;
  std::array<IntervalVector, 2> acceleration;
};

IntervalVector zero_vector() {
  return {Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
}

// Re-expand the segment cubic about the window start and form the Bernstein
// control boxes of position, velocity and acceleration on tau in [0, h].
// Every exact control vector lies in its computed box because the exact
// offset, duration and coefficients lie in their outward enclosures.
SlabControls slab_controls(
    const CubicHistorySegment& segment,
    const Interval& offset,
    const Interval& duration) {
  SlabControls controls{
      {zero_vector(), zero_vector(), zero_vector(), zero_vector()},
      {zero_vector(), zero_vector(), zero_vector()},
      {zero_vector(), zero_vector()}};
  const Interval two = Interval::point(2.0);
  const Interval three = Interval::point(3.0);
  const Interval six = Interval::point(6.0);
  const Interval offset2 = interval_square(offset);
  const Interval offset3 = offset2 * offset;
  const Interval duration2 = interval_square(duration);
  const Interval duration3 = duration2 * duration;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto& tokens = segment.coefficient_tokens()[axis];
    const Row c{Interval::decimal_token(tokens[0]),
                Interval::decimal_token(tokens[1]),
                Interval::decimal_token(tokens[2]),
                Interval::decimal_token(tokens[3])};
    const Interval a0 = c[0] + c[1] * offset + c[2] * offset2 + c[3] * offset3;
    const Interval a1 = c[1] + two * c[2] * offset + three * c[3] * offset2;
    const Interval a2 = c[2] + three * c[3] * offset;
    const Interval a3 = c[3];
    controls.position[0][axis] = a0;
    controls.position[1][axis] = a0 + a1 * duration / three;
    controls.position[2][axis] =
        a0 + two * a1 * duration / three + a2 * duration2 / three;
    controls.position[3][axis] =
        a0 + a1 * duration + a2 * duration2 + a3 * duration3;
    controls.velocity[0][axis] = a1;
    controls.velocity[1][axis] = a1 + a2 * duration;
    controls.velocity[2][axis] =
        a1 + two * a2 * duration + three * a3 * duration2;
    controls.acceleration[0][axis] = two * a2;
    controls.acceleration[1][axis] = two * a2 + six * a3 * duration;
  }
  return controls;
}

struct CoveringSegment {
  std::size_t index;
  HistorySegmentSequence::PinnedSegment segment;
  bool starts_at_window_lower;
};

// One cubic segment must contain the whole declared window [S0, T_r]. The
// containment is decided on exact decimal tokens.
std::optional<CoveringSegment> covering_segment(
    const RetainedHistory& history,
    const std::string& emission_lower,
    const std::string& reception_time) {
  const auto& segments = history.segments();
  const double reception = Interval::decimal_token(reception_time).midpoint();
  if (segments.empty() || reception < history.t_start() ||
      reception > history.t_end()) {
    return std::nullopt;
  }
  const std::size_t found = history.segment_index_at(reception);
  // A reception time on a join belongs to the earlier segment as well.
  for (const std::size_t candidate :
       {found, found == 0U ? found : found - 1U}) {
    auto pinned = segments.pin(candidate);
    const int start_order = compare_exact_decimal_tokens(
        pinned->t_start_token(), emission_lower);
    if (start_order <= 0 &&
        compare_exact_decimal_tokens(
            reception_time, pinned->t_end_token()) <= 0) {
      return CoveringSegment{candidate, std::move(pinned), start_order == 0};
    }
  }
  return std::nullopt;
}

bool exact_cubic_segment(const CubicHistorySegment& segment) {
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (!exact_decimal_token_is_zero(segment.position_error_tokens()[axis]) ||
        !exact_decimal_token_is_zero(segment.velocity_error_tokens()[axis])) {
      return false;
    }
  }
  return true;
}

double maximum_norm_upper(double current, const IntervalVector& value) {
  return std::max(current, norm(value).upper());
}

// Two-slice admission threshold: the downward-rounded sum of the lower
// endpoints of the two members' slices f * tau / N.
struct WidthBudget {
  Interval slice;
  double threshold;
};

WidthBudget width_budget(
    const std::string& fraction,
    const std::string& tolerance,
    std::size_t transmitter_count) {
  const Interval slice =
      Interval::decimal_token(fraction) * Interval::decimal_token(tolerance) /
      Interval::point(static_cast<double>(transmitter_count));
  if (!(slice.lower() > 0.0)) {
    return {slice, 0.0};
  }
  return {slice,
          (Interval::point(slice.lower()) + Interval::point(slice.lower()))
              .lower()};
}

struct RadiusEvaluation {
  double prefactor_upper;
  double radius_upper;
};

// Upper bound of C [ (2 nu + v) l / (r^3 nu^3) + (w + a l / nu) / (r^2 nu^2) ]
// with C = |kappa q_r| |q_member|, evaluated outward at the certified bounds.
RadiusEvaluation radius_from_bounds(
    const std::string& coupling,
    const std::string& receiver_charge,
    const std::string& member_charge,
    double distance_floor,
    double speed_upper,
    double factor_floor,
    double separation_upper,
    double relative_speed_upper,
    double acceleration_upper,
    const std::optional<double>& join_jump_upper = std::nullopt) {
  const Interval nu = Interval::point(factor_floor);
  const Interval v = Interval::point(speed_upper);
  const Interval r = Interval::point(distance_floor);
  const Interval ell = Interval::point(separation_upper);
  const Interval w = Interval::point(relative_speed_upper);
  const Interval a = Interval::point(acceleration_upper);
  const Interval prefactor =
      interval_absolute(
          Interval::decimal_token(coupling) *
          Interval::decimal_token(receiver_charge)) *
      interval_absolute(Interval::decimal_token(member_charge));
  const Interval r2 = interval_square(r);
  const Interval nu2 = interval_square(nu);
  const Interval position_term =
      (Interval::point(2.0) * nu + v) * ell / (r2 * r * nu2 * nu);
  // The join-jump term exists only for piecewise windows. It is added only
  // when present so the single-slab radius keeps its exact rounding.
  const Interval velocity_numerator = join_jump_upper.has_value()
      ? w + a * ell / nu + Interval::point(*join_jump_upper)
      : w + a * ell / nu;
  const Interval velocity_term = velocity_numerator / (r2 * nu2);
  return {prefactor.upper(),
          (Interval::point(prefactor.upper()) *
           (position_term + velocity_term))
              .upper()};
}

MatchedPairMemberEvidence member_evidence(
    const std::string& path_id,
    const RetainedHistory& history,
    const std::string& charge) {
  return {
      .path_id = path_id,
      .history_id = history.history_id(),
      .history_fingerprint = history.provenance_fingerprint(),
      .charge = charge,
      .segment_index = std::nullopt,
      .segment_start = {},
      .segment_end = {},
      .window_start_residual = std::nullopt,
      .disposition = "not_evaluated",
      .history_start = {},
      .prefix_residual = std::nullopt,
  };
}


// ---------------------------------------------------------------- Stage 2
// Window spanning several error-free cubic segments of each source. The
// history is exactly its piecewise cubic and is continuously differentiable
// across joins, so every bound below is a bound on the source itself.

// Inclusive range of segment indices of one history that meet [lower, T_r].
struct SegmentRange {
  std::size_t first;
  std::size_t last;
};

std::optional<SegmentRange> window_segments(
    const RetainedHistory& history,
    const std::string& lower,
    const std::string& reception) {
  const auto& segments = history.segments();
  const std::size_t count = segments.size();
  if (count == 0U) {
    return std::nullopt;
  }
  // The window must lie inside the retained coverage, by exact tokens.
  if (compare_exact_decimal_tokens(
          segments.pin(0U)->t_start_token(), lower) > 0 ||
      compare_exact_decimal_tokens(
          reception, segments.pin(count - 1U)->t_end_token()) > 0) {
    return std::nullopt;
  }
  // First: the last segment whose start is at or before the window start.
  std::size_t first = 0U;
  {
    std::size_t low = 0U;
    std::size_t high = count - 1U;
    while (low < high) {
      const std::size_t middle = low + (high - low + 1U) / 2U;
      if (compare_exact_decimal_tokens(
              segments.pin(middle)->t_start_token(), lower) <= 0) {
        low = middle;
      } else {
        high = middle - 1U;
      }
    }
    first = low;
  }
  // Last: the first segment whose end is at or after the reception time.
  std::size_t last = first;
  {
    std::size_t low = first;
    std::size_t high = count - 1U;
    while (low < high) {
      const std::size_t middle = low + (high - low) / 2U;
      if (compare_exact_decimal_tokens(
              reception, segments.pin(middle)->t_end_token()) <= 0) {
        high = middle;
      } else {
        low = middle + 1U;
      }
    }
    last = low;
  }
  return SegmentRange{first, last};
}

struct MemberCells {
  std::vector<SlabControls> controls;
  double join_jump_upper = 0.0;
  bool exact = true;
};

MemberCells member_cells(
    const RetainedHistory& history,
    const SegmentRange& range,
    const std::vector<std::string>& boundaries) {
  MemberCells cells;
  const auto& segments = history.segments();
  std::size_t index = range.first;
  for (std::size_t cell = 0U; cell + 1U < boundaries.size(); ++cell) {
    const std::string& lower = boundaries[cell];
    const std::string& upper = boundaries[cell + 1U];
    // Advance to the segment containing this cell.
    while (index < range.last &&
           compare_exact_decimal_tokens(
               segments.pin(index)->t_end_token(), lower) <= 0) {
      ++index;
    }
    const auto segment = segments.pin(index);
    if (compare_exact_decimal_tokens(segment->t_start_token(), lower) > 0 ||
        compare_exact_decimal_tokens(upper, segment->t_end_token()) > 0) {
      throw std::invalid_argument("window cell is not inside one segment");
    }
    const Interval cell_lower = Interval::decimal_token(lower);
    const Interval offset =
        compare_exact_decimal_tokens(segment->t_start_token(), lower) == 0
        ? Interval::point(0.0)
        : cell_lower - segment->t_start_interval();
    const Interval duration = Interval::decimal_token(upper) - cell_lower;
    SlabControls controls = slab_controls(*segment, offset, duration);
    cells.exact = cells.exact && exact_cubic_segment(*segment);
    if (!cells.controls.empty()) {
      // Upper bound of the velocity change across the boundary just crossed.
      // The velocity is exactly continuous there; this is the outward
      // rounding of that zero and keeps the radius rigorous.
      const double jump = norm(subtract(
          controls.velocity[0], cells.controls.back().velocity[2])).upper();
      cells.join_jump_upper =
          (Interval::point(cells.join_jump_upper) + Interval::point(jump))
              .upper();
    }
    cells.controls.push_back(std::move(controls));
  }
  return cells;
}

NativeMatchedPairEnclosureCertificate certify_piecewise_window(
    const MatchedPairEnclosureRequest& request,
    NativeMatchedPairEnclosureCertificate certificate) {
  const auto leader_range = window_segments(
      *request.leader_history, request.emission_lower, request.reception_time);
  const auto follower_range = window_segments(
      *request.follower_history, request.emission_lower,
      request.reception_time);
  if (!leader_range.has_value() || !follower_range.has_value()) {
    certificate.failure_code = "MPE-WINDOW-01";
    return certificate;
  }
  const auto record_range = [](MatchedPairMemberEvidence& evidence,
                               const RetainedHistory& history,
                               const SegmentRange& range) {
    evidence.segment_index = range.first;
    evidence.last_segment_index = range.last;
    evidence.segment_start =
        history.segments().pin(range.first)->t_start_token();
    evidence.segment_end = history.segments().pin(range.last)->t_end_token();
  };
  record_range(certificate.leader, *request.leader_history, *leader_range);
  record_range(
      certificate.follower, *request.follower_history, *follower_range);

  // Cells: split at every segment boundary of either source that lies
  // strictly inside the window. The history layer guarantees contiguous
  // segments, so the cells tile [S0, T_r] exactly.
  std::vector<std::string> boundaries{request.emission_lower};
  const auto add_interior = [&](const RetainedHistory& history,
                                const SegmentRange& range) {
    for (std::size_t index = range.first; index < range.last; ++index) {
      const std::string token = history.segments().pin(index)->t_end_token();
      if (compare_exact_decimal_tokens(request.emission_lower, token) < 0 &&
          compare_exact_decimal_tokens(token, request.reception_time) < 0) {
        boundaries.push_back(token);
      }
    }
  };
  add_interior(*request.leader_history, *leader_range);
  add_interior(*request.follower_history, *follower_range);
  boundaries.push_back(request.reception_time);
  std::sort(
      boundaries.begin(), boundaries.end(),
      [](const std::string& left, const std::string& right) {
        return compare_exact_decimal_tokens(left, right) < 0;
      });
  boundaries.erase(
      std::unique(
          boundaries.begin(), boundaries.end(),
          [](const std::string& left, const std::string& right) {
            return compare_exact_decimal_tokens(left, right) == 0;
          }),
      boundaries.end());
  certificate.cell_boundaries = boundaries;

  const MemberCells leader = member_cells(
      *request.leader_history, *leader_range, boundaries);
  const MemberCells follower = member_cells(
      *request.follower_history, *follower_range, boundaries);
  // Histories: every segment the window meets must be the source itself.
  const bool analytic =
      request.leader_history->uniform_circular_endpoint_certificate()
          .has_value() ||
      request.follower_history->uniform_circular_endpoint_certificate()
          .has_value();
  if (!leader.exact || !follower.exact || analytic) {
    certificate.failure_code = "MPE-HISTORY-01";
    return certificate;
  }
  certificate.history_grade = "exact_piecewise_cubic";

  // Coverage of retained history before the window: same re-proof as the
  // single-slab route, from each member's own position hull.
  const Interval reception = Interval::decimal_token(request.reception_time);
  const Interval window_lower =
      Interval::decimal_token(request.emission_lower);
  const Interval duration = reception - window_lower;
  const IntervalVector receiver_box =
      request.receiver_history->position_hull(reception);
  certificate.receiver_position_hull = receiver_box;
  bool any_prefix = false;
  const auto prove_prefix = [&](MatchedPairMemberEvidence& evidence,
                                const RetainedHistory& history) {
    const auto first = history.segments().pin(0U);
    evidence.history_start = first->t_start_token();
    const int order = compare_exact_decimal_tokens(
        evidence.history_start, request.emission_lower);
    if (order == 0) {
      return true;
    }
    if (order > 0) {
      return false;
    }
    any_prefix = true;
    const Interval prefix_time(
        first->t_start_interval().lower(), window_lower.upper());
    const Interval residual =
        norm(subtract(receiver_box, history.position_hull(prefix_time))) -
        duration;
    evidence.prefix_residual = residual;
    return residual.upper() < 0.0;
  };
  const bool leader_covered =
      prove_prefix(certificate.leader, *request.leader_history);
  const bool follower_covered =
      prove_prefix(certificate.follower, *request.follower_history);
  if (!leader_covered || !follower_covered) {
    certificate.failure_code = "MPE-WINDOW-02";
    return certificate;
  }
  certificate.window_coverage =
      any_prefix ? "member_prefix_reproved" : "whole_retained_history";

  // Whole-window bounds over all cells.
  IntervalVector domain = leader.controls.front().position[0];
  double speed_upper = 0.0;
  double acceleration_upper = 0.0;
  double separation_upper = 0.0;
  double relative_speed_upper = 0.0;
  const std::size_t cell_count = boundaries.size() - 1U;
  for (std::size_t cell = 0U; cell < cell_count; ++cell) {
    for (const auto* member : {&leader, &follower}) {
      for (const auto& box : member->controls[cell].position) {
        domain = hull(domain, box);
      }
      for (const auto& box : member->controls[cell].velocity) {
        speed_upper = maximum_norm_upper(speed_upper, box);
      }
      for (const auto& box : member->controls[cell].acceleration) {
        acceleration_upper = maximum_norm_upper(acceleration_upper, box);
      }
    }
    for (std::size_t index = 0U; index < 4U; ++index) {
      separation_upper = maximum_norm_upper(
          separation_upper,
          subtract(leader.controls[cell].position[index],
                   follower.controls[cell].position[index]));
    }
    for (std::size_t index = 0U; index < 3U; ++index) {
      relative_speed_upper = maximum_norm_upper(
          relative_speed_upper,
          subtract(leader.controls[cell].velocity[index],
                   follower.controls[cell].velocity[index]));
    }
  }
  certificate.source_domain_hull = domain;
  const double distance_floor = norm(subtract(receiver_box, domain)).lower();
  certificate.distance_floor = distance_floor;
  if (!(distance_floor > 0.0)) {
    certificate.failure_code = "MPE-GEO-01";
    return certificate;
  }
  certificate.speed_upper = speed_upper;
  certificate.acceleration_upper = acceleration_upper;
  certificate.separation_upper = separation_upper;
  certificate.relative_speed_upper = relative_speed_upper;
  const double join_jump_upper =
      std::max(leader.join_jump_upper, follower.join_jump_upper);
  certificate.join_velocity_jump_upper = join_jump_upper;
  const double factor_floor =
      (Interval::point(1.0) - Interval::point(speed_upper)).lower();
  certificate.transmitter_factor_floor = factor_floor;
  if (!(speed_upper < 1.0) || !(factor_floor > 0.0)) {
    certificate.failure_code = "MPE-SPEED-01";
    return certificate;
  }

  // Membership at the window start, uniformly over the receiver box. The
  // residual at reception is at least the distance floor, hence strictly
  // positive.
  const auto classify = [&](MatchedPairMemberEvidence& evidence,
                            const MemberCells& member) {
    const Interval residual =
        norm(subtract(receiver_box, member.controls.front().position[0])) -
        duration;
    evidence.window_start_residual = residual;
    evidence.disposition = residual.upper() < 0.0
        ? "present"
        : (residual.lower() > 0.0 ? "absent" : "ambiguous");
  };
  classify(certificate.leader, leader);
  classify(certificate.follower, follower);
  if (certificate.leader.disposition == "ambiguous" ||
      certificate.follower.disposition == "ambiguous") {
    certificate.failure_code = "MPE-MEMBER-02";
    return certificate;
  }
  if (certificate.leader.disposition != certificate.follower.disposition) {
    certificate.failure_code = "MPE-MEMBER-01";
    return certificate;
  }

  const WidthBudget budget = width_budget(
      request.far_field_enclosure_fraction, request.acceleration_tolerance,
      request.transmitter_count);
  certificate.member_width_slice = budget.slice;
  if (!(budget.slice.lower() > 0.0)) {
    certificate.failure_code = "MPE-BUDGET-01";
    return certificate;
  }
  const double threshold = budget.threshold;
  certificate.admission_width_threshold = threshold;

  if (certificate.leader.disposition == "absent") {
    certificate.acceleration = zero_vector();
    certificate.emitted_width = 0.0;
    certificate.radius_upper = 0.0;
    certificate.status = "certified_absent";
    certificate.failure_code.clear();
    return certificate;
  }

  const RadiusEvaluation evaluation = radius_from_bounds(
      request.coupling, request.receiver_charge, request.leader_charge,
      distance_floor, speed_upper, factor_floor, separation_upper,
      relative_speed_upper, acceleration_upper,
      certificate.join_velocity_jump_upper);
  certificate.prefactor_upper = evaluation.prefactor_upper;
  const double radius = evaluation.radius_upper;
  certificate.radius_upper = radius;
  if (!std::isfinite(radius) || !(radius >= 0.0)) {
    certificate.failure_code = "MPE-BOUND-01";
    return certificate;
  }
  const Interval component(-radius, radius);
  certificate.emitted_width = component.width();
  if (*certificate.emitted_width > threshold) {
    certificate.failure_code = "MPE-BUDGET-01";
    return certificate;
  }
  certificate.acceleration = IntervalVector{component, component, component};
  certificate.status = "certified_enclosed";
  certificate.failure_code.clear();
  return certificate;
}

}  // namespace

int compare_exact_decimal_tokens(
    const std::string& left,
    const std::string& right) {
  return compare_exact(parse_exact_decimal(left), parse_exact_decimal(right));
}

bool exact_decimal_token_is_zero(const std::string& token) {
  return parse_exact_decimal(token).sign == 0;
}

bool exact_decimal_tokens_are_opposite(
    const std::string& left,
    const std::string& right) {
  const ExactDecimal a = parse_exact_decimal(left);
  const ExactDecimal b = parse_exact_decimal(right);
  return a.sign != 0 && a.sign == -b.sign && a.digits == b.digits &&
      a.exponent == b.exponent;
}

NativeMatchedPairEnclosureCertificate certify_matched_pair_enclosure(
    const MatchedPairEnclosureRequest& request) {
  NativeMatchedPairEnclosureCertificate certificate{
      .schema = kMatchedPairCertificateSchema,
      .group_id = request.receiver_path_id + "/" + request.leader_path_id +
          "+" + request.follower_path_id + "/" + request.reception_time +
          "/matched-pair",
      .policy = request.policy,
      .receiver_path_id = request.receiver_path_id,
      .receiver_history_id = {},
      .receiver_history_fingerprint = {},
      .leader = {},
      .follower = {},
      .reception_time = request.reception_time,
      .emission_lower = request.emission_lower,
      .emission_upper = request.reception_time,
      .receiver_charge = request.receiver_charge,
      .coupling = request.coupling,
      .field_speed = request.field_speed,
      .far_field_enclosure_fraction = request.far_field_enclosure_fraction,
      .acceleration_tolerance = request.acceleration_tolerance,
      .window_coverage = "not_established",
      .transmitter_count = request.transmitter_count,
      .status = "declined",
      .failure_code = "MPE-POLICY-01",
  };
  if (request.receiver_history == nullptr ||
      request.leader_history == nullptr ||
      request.follower_history == nullptr) {
    certificate.failure_code = "MPE-ID-01";
    return certificate;
  }
  certificate.receiver_history_id = request.receiver_history->history_id();
  certificate.receiver_history_fingerprint =
      request.receiver_history->provenance_fingerprint();
  certificate.leader = member_evidence(
      request.leader_path_id, *request.leader_history, request.leader_charge);
  certificate.follower = member_evidence(
      request.follower_path_id, *request.follower_history,
      request.follower_charge);
  if (!matched_pair_policy_is_known(request.policy)) {
    return certificate;
  }
  try {
    // Model: the proof is for the canonical sharp kernel at c_f = 1.
    if (compare_exact_decimal_tokens(request.field_speed, "1") != 0) {
      certificate.failure_code = "MPE-MODEL-01";
      return certificate;
    }
    // Identities: two distinct sources, neither of them the receiver.
    if (request.leader_path_id == request.follower_path_id ||
        request.leader_path_id == request.receiver_path_id ||
        request.follower_path_id == request.receiver_path_id ||
        request.leader_history == request.follower_history ||
        request.leader_history == request.receiver_history ||
        request.follower_history == request.receiver_history ||
        request.transmitter_count < 2U) {
      certificate.failure_code = "MPE-ID-01";
      return certificate;
    }
    // Polarity: exactly opposite, exactly equal magnitude, decided on tokens.
    if (!exact_decimal_tokens_are_opposite(
            request.leader_charge, request.follower_charge) ||
        exact_decimal_token_is_zero(request.receiver_charge)) {
      certificate.failure_code = "MPE-CHARGE-01";
      return certificate;
    }
    // Window: [S0, T_r] nonempty and inside one cubic segment of each source.
    if (compare_exact_decimal_tokens(
            request.emission_lower, request.reception_time) >= 0) {
      certificate.failure_code = "MPE-WINDOW-01";
      return certificate;
    }
    if (request.policy != kMatchedPairPolicySnapshotSingleSlab) {
      return certify_piecewise_window(request, std::move(certificate));
    }
    auto leader_segment = covering_segment(
        *request.leader_history, request.emission_lower,
        request.reception_time);
    auto follower_segment = covering_segment(
        *request.follower_history, request.emission_lower,
        request.reception_time);
    if (!leader_segment.has_value() || !follower_segment.has_value()) {
      certificate.failure_code = "MPE-WINDOW-01";
      return certificate;
    }
    const auto record_segment = [](MatchedPairMemberEvidence& evidence,
                                   const CoveringSegment& covering) {
      evidence.segment_index = covering.index;
      evidence.segment_start = covering.segment->t_start_token();
      evidence.segment_end = covering.segment->t_end_token();
    };
    record_segment(certificate.leader, *leader_segment);
    record_segment(certificate.follower, *follower_segment);
    // Coverage: no retained emission time before the window start may be left
    // unexamined. A member whose retained history starts at the window start
    // has nothing earlier. Otherwise the root-free prefix is re-proved here
    // from that member's own position hull over [history start, window start]:
    // if sup |R - X(S)| < T_r - S0 on the prefix, then g(S) < 0 there, so the
    // prefix holds no causal root of this receiver event. Evidence computed
    // elsewhere is not imported.
    const Interval reception = Interval::decimal_token(request.reception_time);
    const Interval window_lower =
        Interval::decimal_token(request.emission_lower);
    const Interval duration = reception - window_lower;
    const IntervalVector receiver_box =
        request.receiver_history->position_hull(reception);
    certificate.receiver_position_hull = receiver_box;
    bool any_prefix = false;
    const auto prove_prefix = [&](MatchedPairMemberEvidence& evidence,
                                  const RetainedHistory& history) {
      const auto first = history.segments().pin(0U);
      evidence.history_start = first->t_start_token();
      const int order = compare_exact_decimal_tokens(
          evidence.history_start, request.emission_lower);
      if (order == 0) {
        return true;
      }
      if (order > 0) {
        return false;
      }
      any_prefix = true;
      const Interval prefix_time(
          first->t_start_interval().lower(), window_lower.upper());
      const Interval residual =
          norm(subtract(receiver_box, history.position_hull(prefix_time))) -
          duration;
      evidence.prefix_residual = residual;
      return residual.upper() < 0.0;
    };
    const bool leader_covered =
        prove_prefix(certificate.leader, *request.leader_history);
    const bool follower_covered =
        prove_prefix(certificate.follower, *request.follower_history);
    if (!leader_covered || !follower_covered) {
      certificate.failure_code = "MPE-WINDOW-02";
      return certificate;
    }
    certificate.window_coverage =
        any_prefix ? "member_prefix_reproved" : "whole_retained_history";
    // Histories: the supplied cubic must be the source history itself.
    if (!exact_cubic_segment(*leader_segment->segment) ||
        !exact_cubic_segment(*follower_segment->segment) ||
        request.leader_history->uniform_circular_endpoint_certificate()
            .has_value() ||
        request.follower_history->uniform_circular_endpoint_certificate()
            .has_value()) {
      certificate.failure_code = "MPE-HISTORY-01";
      return certificate;
    }

    const auto offset = [&](const CoveringSegment& covering) {
      return covering.starts_at_window_lower
          ? Interval::point(0.0)
          : window_lower - covering.segment->t_start_interval();
    };
    const SlabControls leader = slab_controls(
        *leader_segment->segment, offset(*leader_segment), duration);
    const SlabControls follower = slab_controls(
        *follower_segment->segment, offset(*follower_segment), duration);

    // Convex source-position domain: box hull of the eight control boxes.
    IntervalVector domain = leader.position[0];
    for (const auto* controls : {&leader, &follower}) {
      for (const auto& box : controls->position) {
        domain = hull(domain, box);
      }
    }
    certificate.source_domain_hull = domain;
    const double distance_floor =
        norm(subtract(receiver_box, domain)).lower();
    certificate.distance_floor = distance_floor;
    if (!(distance_floor > 0.0)) {
      certificate.failure_code = "MPE-GEO-01";
      return certificate;
    }

    double speed_upper = 0.0;
    double acceleration_upper = 0.0;
    double separation_upper = 0.0;
    double relative_speed_upper = 0.0;
    for (const auto* controls : {&leader, &follower}) {
      for (const auto& box : controls->velocity) {
        speed_upper = maximum_norm_upper(speed_upper, box);
      }
      for (const auto& box : controls->acceleration) {
        acceleration_upper = maximum_norm_upper(acceleration_upper, box);
      }
    }
    for (std::size_t index = 0U; index < 4U; ++index) {
      separation_upper = maximum_norm_upper(
          separation_upper,
          subtract(leader.position[index], follower.position[index]));
    }
    for (std::size_t index = 0U; index < 3U; ++index) {
      relative_speed_upper = maximum_norm_upper(
          relative_speed_upper,
          subtract(leader.velocity[index], follower.velocity[index]));
    }
    certificate.speed_upper = speed_upper;
    certificate.acceleration_upper = acceleration_upper;
    certificate.separation_upper = separation_upper;
    certificate.relative_speed_upper = relative_speed_upper;
    // Any positive nu <= 1 - v+ is admissible in the radius; round it down.
    const double factor_floor =
        (Interval::point(1.0) - Interval::point(speed_upper)).lower();
    certificate.transmitter_factor_floor = factor_floor;
    if (!(speed_upper < 1.0) || !(factor_floor > 0.0)) {
      certificate.failure_code = "MPE-SPEED-01";
      return certificate;
    }

    // Membership at the window start, uniformly over the receiver box. The
    // residual at the reception time is at least the distance floor, hence
    // strictly positive, so no upper-endpoint test is needed.
    const auto classify = [&](MatchedPairMemberEvidence& evidence,
                              const SlabControls& controls) {
      const Interval residual =
          norm(subtract(receiver_box, controls.position[0])) - duration;
      evidence.window_start_residual = residual;
      evidence.disposition = residual.upper() < 0.0
          ? "present"
          : (residual.lower() > 0.0 ? "absent" : "ambiguous");
    };
    classify(certificate.leader, leader);
    classify(certificate.follower, follower);
    if (certificate.leader.disposition == "ambiguous" ||
        certificate.follower.disposition == "ambiguous") {
      certificate.failure_code = "MPE-MEMBER-02";
      return certificate;
    }
    if (certificate.leader.disposition != certificate.follower.disposition) {
      certificate.failure_code = "MPE-MEMBER-01";
      return certificate;
    }

    const WidthBudget budget = width_budget(
        request.far_field_enclosure_fraction, request.acceleration_tolerance,
        request.transmitter_count);
    certificate.member_width_slice = budget.slice;
    if (!(budget.slice.lower() > 0.0)) {
      certificate.failure_code = "MPE-BUDGET-01";
      return certificate;
    }
    const double threshold = budget.threshold;
    certificate.admission_width_threshold = threshold;

    if (certificate.leader.disposition == "absent") {
      // No root of either member lies in the declared window: the pair's
      // contribution on that window is exactly zero and no width is spent.
      // The debit is assigned as exact zero. Interval::width() rounds upward
      // and would report a denormal for the point-zero interval.
      certificate.acceleration = zero_vector();
      certificate.emitted_width = 0.0;
      certificate.radius_upper = 0.0;
      certificate.status = "certified_absent";
      certificate.failure_code.clear();
      return certificate;
    }

    const RadiusEvaluation evaluation = radius_from_bounds(
        request.coupling, request.receiver_charge, request.leader_charge,
        distance_floor, speed_upper, factor_floor, separation_upper,
        relative_speed_upper, acceleration_upper);
    certificate.prefactor_upper = evaluation.prefactor_upper;
    const double radius = evaluation.radius_upper;
    certificate.radius_upper = radius;
    if (!std::isfinite(radius) || !(radius >= 0.0)) {
      certificate.failure_code = "MPE-BOUND-01";
      return certificate;
    }
    const Interval component(-radius, radius);
    certificate.emitted_width = component.width();
    if (*certificate.emitted_width > threshold) {
      certificate.failure_code = "MPE-BUDGET-01";
      return certificate;
    }
    certificate.acceleration = IntervalVector{component, component, component};
    certificate.status = "certified_enclosed";
    certificate.failure_code.clear();
    return certificate;
  } catch (const std::exception&) {
    certificate.status = "declined";
    certificate.failure_code = "MPE-BOUND-01";
    certificate.acceleration.reset();
    certificate.emitted_width.reset();
    return certificate;
  }
}

std::string matched_pair_certificate_refusal(
    const NativeMatchedPairEnclosureCertificate& certificate,
    const MatchedPairConsumerInputs& consumer) {
  if (consumer.receiver_history == nullptr ||
      consumer.member_history == nullptr) {
    return "matched-pair consumer inputs are incomplete";
  }
  if (certificate.schema != kMatchedPairCertificateSchema ||
      !matched_pair_policy_is_known(certificate.policy)) {
    return "matched-pair certificate schema or policy mismatch";
  }
  if (certificate.status != "certified_enclosed" &&
      certificate.status != "certified_absent") {
    return "matched-pair certificate is not certified";
  }
  if (certificate.receiver_path_id != consumer.receiver_path_id ||
      certificate.receiver_history_id !=
          consumer.receiver_history->history_id() ||
      certificate.receiver_history_fingerprint !=
          consumer.receiver_history->provenance_fingerprint()) {
    return "matched-pair receiver identity or provenance mismatch";
  }
  if (certificate.leader.path_id == certificate.follower.path_id ||
      certificate.leader.path_id == consumer.receiver_path_id ||
      certificate.follower.path_id == consumer.receiver_path_id) {
    return "matched-pair certificate repeats a member or the receiver";
  }
  if (certificate.window_coverage != "whole_retained_history" &&
      certificate.window_coverage != "member_prefix_reproved") {
    return "matched-pair certificate does not establish window coverage";
  }
  const MatchedPairMemberEvidence* member = nullptr;
  if (certificate.leader.path_id == consumer.member_path_id) {
    member = &certificate.leader;
  } else if (certificate.follower.path_id == consumer.member_path_id) {
    member = &certificate.follower;
  }
  if (member == nullptr ||
      member->history_id != consumer.member_history->history_id() ||
      member->history_fingerprint !=
          consumer.member_history->provenance_fingerprint()) {
    return "matched-pair member identity or provenance mismatch";
  }
  const std::string expected =
      certificate.status == "certified_enclosed" ? "present" : "absent";
  if (certificate.leader.disposition != expected ||
      certificate.follower.disposition != expected) {
    return "matched-pair membership disposition mismatch";
  }
  if (!certificate.acceleration.has_value() ||
      !certificate.emitted_width.has_value() ||
      !certificate.admission_width_threshold.has_value() ||
      certificate.transmitter_count < 2U) {
    return "matched-pair certificate is incomplete";
  }
  try {
    if (compare_exact_decimal_tokens(
            certificate.reception_time, consumer.reception_time) != 0 ||
        compare_exact_decimal_tokens(
            certificate.emission_upper, consumer.reception_time) != 0) {
      return "matched-pair certificate does not cover the reception time";
    }
    // Mathematical inputs: the requested scalars must be exactly the
    // certified ones. A different coupling, charge, wake speed or tolerance
    // describes a different quantity and needs a fresh certificate.
    if (compare_exact_decimal_tokens(
            certificate.coupling, consumer.coupling) != 0) {
      return "matched-pair coupling differs from the certified coupling";
    }
    if (compare_exact_decimal_tokens(
            certificate.receiver_charge, consumer.receiver_charge) != 0) {
      return "matched-pair receiver charge differs from the certified charge";
    }
    if (compare_exact_decimal_tokens(
            member->charge, consumer.member_charge) != 0) {
      return "matched-pair member charge differs from the certified charge";
    }
    if (!exact_decimal_tokens_are_opposite(
            certificate.leader.charge, certificate.follower.charge) ||
        exact_decimal_token_is_zero(certificate.receiver_charge)) {
      return "matched-pair certified charges are not an opposite nonzero pair";
    }
    if (compare_exact_decimal_tokens(certificate.field_speed, "1") != 0 ||
        compare_exact_decimal_tokens(
            certificate.field_speed, consumer.field_speed) != 0) {
      return "matched-pair wake speed differs from the certified unit speed";
    }
    if (compare_exact_decimal_tokens(
            certificate.acceleration_tolerance,
            consumer.acceleration_tolerance) != 0) {
      return "matched-pair tolerance differs from the certified tolerance";
    }
    // Budget: recompute the two-slice threshold from the certified tokens.
    const WidthBudget budget = width_budget(
        certificate.far_field_enclosure_fraction,
        certificate.acceleration_tolerance, certificate.transmitter_count);
    if (!(budget.slice.lower() > 0.0) ||
        budget.threshold != *certificate.admission_width_threshold ||
        !certificate.member_width_slice.has_value() ||
        certificate.member_width_slice->lower() != budget.slice.lower() ||
        certificate.member_width_slice->upper() != budget.slice.upper()) {
      return "matched-pair width threshold does not follow from its tokens";
    }
    if (certificate.status == "certified_absent") {
      for (const auto& component : *certificate.acceleration) {
        if (!component.is_exact_zero()) {
          return "matched-pair absent group carries a nonzero interval";
        }
      }
      if (*certificate.emitted_width != 0.0 ||
          !certificate.radius_upper.has_value() ||
          *certificate.radius_upper != 0.0) {
        return "matched-pair absent group carries a width debit";
      }
      return {};
    }
    // Enclosure: recompute the radius from the recorded whole-slab bounds and
    // the requested scalars; the stored interval must contain it and fit.
    if (!certificate.distance_floor.has_value() ||
        !certificate.speed_upper.has_value() ||
        !certificate.transmitter_factor_floor.has_value() ||
        !certificate.separation_upper.has_value() ||
        !certificate.relative_speed_upper.has_value() ||
        !certificate.acceleration_upper.has_value() ||
        !certificate.prefactor_upper.has_value() ||
        !certificate.radius_upper.has_value()) {
      return "matched-pair certificate is incomplete";
    }
    if (!(*certificate.distance_floor > 0.0) ||
        !(*certificate.speed_upper < 1.0) ||
        !(*certificate.transmitter_factor_floor > 0.0) ||
        !(*certificate.transmitter_factor_floor <=
          (Interval::point(1.0) - Interval::point(*certificate.speed_upper))
              .upper())) {
      return "matched-pair recorded bounds violate their hypotheses";
    }
    const RadiusEvaluation evaluation = radius_from_bounds(
        consumer.coupling, consumer.receiver_charge, consumer.member_charge,
        *certificate.distance_floor, *certificate.speed_upper,
        *certificate.transmitter_factor_floor, *certificate.separation_upper,
        *certificate.relative_speed_upper, *certificate.acceleration_upper,
        certificate.join_velocity_jump_upper);
    if (!std::isfinite(evaluation.radius_upper)) {
      return "matched-pair recomputed radius is not finite";
    }
    // Every recorded quantity that follows from the recorded bounds and the
    // requested scalars must equal its recomputation exactly, so no recorded
    // bound that enters the radius can be altered while the interval is kept.
    if (evaluation.prefactor_upper != *certificate.prefactor_upper ||
        evaluation.radius_upper != *certificate.radius_upper) {
      return "matched-pair recorded bounds do not reproduce the recorded "
             "radius";
    }
    const Interval expected(-evaluation.radius_upper, evaluation.radius_upper);
    for (const auto& component : *certificate.acceleration) {
      if (component.lower() != expected.lower() ||
          component.upper() != expected.upper()) {
        return "matched-pair interval does not equal the recomputed "
               "enclosure";
      }
    }
    if (*certificate.emitted_width != expected.width()) {
      return "matched-pair recorded width does not equal the interval width";
    }
    if (expected.width() > budget.threshold) {
      return "matched-pair enclosure exceeds its two budget slices";
    }
  } catch (const std::exception&) {
    return "matched-pair certificate or consumer tokens are not valid";
  }
  return {};
}

namespace {

bool same_optional_double(
    const std::optional<double>& left,
    const std::optional<double>& right) {
  return left.has_value() == right.has_value() &&
      (!left.has_value() || *left == *right);
}

bool same_bounds(const Interval& left, const Interval& right) {
  return left.lower() == right.lower() && left.upper() == right.upper();
}

bool same_optional_interval(
    const std::optional<Interval>& left,
    const std::optional<Interval>& right) {
  return left.has_value() == right.has_value() &&
      (!left.has_value() || same_bounds(*left, *right));
}

bool same_optional_vector(
    const std::optional<IntervalVector>& left,
    const std::optional<IntervalVector>& right) {
  if (left.has_value() != right.has_value()) {
    return false;
  }
  if (!left.has_value()) {
    return true;
  }
  return same_bounds((*left)[0], (*right)[0]) &&
      same_bounds((*left)[1], (*right)[1]) &&
      same_bounds((*left)[2], (*right)[2]);
}

std::string member_difference(
    const std::string& role,
    const MatchedPairMemberEvidence& supplied,
    const MatchedPairMemberEvidence& fresh) {
  if (supplied.path_id != fresh.path_id) return role + ".path_id";
  if (supplied.history_id != fresh.history_id) return role + ".history_id";
  if (supplied.history_fingerprint != fresh.history_fingerprint) {
    return role + ".history_fingerprint";
  }
  if (supplied.charge != fresh.charge) return role + ".charge";
  if (supplied.segment_index != fresh.segment_index) {
    return role + ".segment_index";
  }
  if (supplied.segment_start != fresh.segment_start) {
    return role + ".segment_start";
  }
  if (supplied.segment_end != fresh.segment_end) return role + ".segment_end";
  if (!same_optional_interval(
          supplied.window_start_residual, fresh.window_start_residual)) {
    return role + ".window_start_residual";
  }
  if (supplied.disposition != fresh.disposition) return role + ".disposition";
  if (supplied.history_start != fresh.history_start) {
    return role + ".history_start";
  }
  if (!same_optional_interval(supplied.prefix_residual, fresh.prefix_residual)) {
    return role + ".prefix_residual";
  }
  if (supplied.last_segment_index != fresh.last_segment_index) {
    return role + ".last_segment_index";
  }
  return {};
}

}  // namespace

std::string matched_pair_certificate_difference(
    const NativeMatchedPairEnclosureCertificate& supplied,
    const NativeMatchedPairEnclosureCertificate& fresh) {
  if (supplied.schema != fresh.schema) return "schema";
  if (supplied.group_id != fresh.group_id) return "group_id";
  if (supplied.policy != fresh.policy) return "policy";
  if (supplied.receiver_path_id != fresh.receiver_path_id) {
    return "receiver_path_id";
  }
  if (supplied.receiver_history_id != fresh.receiver_history_id) {
    return "receiver_history_id";
  }
  if (supplied.receiver_history_fingerprint !=
      fresh.receiver_history_fingerprint) {
    return "receiver_history_fingerprint";
  }
  if (auto difference =
          member_difference("leader", supplied.leader, fresh.leader);
      !difference.empty()) {
    return difference;
  }
  if (auto difference =
          member_difference("follower", supplied.follower, fresh.follower);
      !difference.empty()) {
    return difference;
  }
  if (supplied.reception_time != fresh.reception_time) return "reception_time";
  if (supplied.emission_lower != fresh.emission_lower) return "emission_lower";
  if (supplied.emission_upper != fresh.emission_upper) return "emission_upper";
  if (supplied.receiver_charge != fresh.receiver_charge) {
    return "receiver_charge";
  }
  if (supplied.coupling != fresh.coupling) return "coupling";
  if (supplied.field_speed != fresh.field_speed) return "field_speed";
  if (supplied.far_field_enclosure_fraction !=
      fresh.far_field_enclosure_fraction) {
    return "far_field_enclosure_fraction";
  }
  if (supplied.acceleration_tolerance != fresh.acceleration_tolerance) {
    return "acceleration_tolerance";
  }
  if (supplied.window_coverage != fresh.window_coverage) {
    return "window_coverage";
  }
  if (supplied.transmitter_count != fresh.transmitter_count) {
    return "transmitter_count";
  }
  if (supplied.status != fresh.status) return "status";
  if (supplied.failure_code != fresh.failure_code) return "failure_code";
  if (!same_optional_vector(
          supplied.receiver_position_hull, fresh.receiver_position_hull)) {
    return "receiver_position_hull";
  }
  if (!same_optional_vector(
          supplied.source_domain_hull, fresh.source_domain_hull)) {
    return "source_domain_hull";
  }
  if (!same_optional_double(supplied.distance_floor, fresh.distance_floor)) {
    return "distance_floor";
  }
  if (!same_optional_double(supplied.speed_upper, fresh.speed_upper)) {
    return "speed_upper";
  }
  if (!same_optional_double(
          supplied.transmitter_factor_floor, fresh.transmitter_factor_floor)) {
    return "transmitter_factor_floor";
  }
  if (!same_optional_double(
          supplied.separation_upper, fresh.separation_upper)) {
    return "separation_upper";
  }
  if (!same_optional_double(
          supplied.relative_speed_upper, fresh.relative_speed_upper)) {
    return "relative_speed_upper";
  }
  if (!same_optional_double(
          supplied.acceleration_upper, fresh.acceleration_upper)) {
    return "acceleration_upper";
  }
  if (!same_optional_double(supplied.prefactor_upper, fresh.prefactor_upper)) {
    return "prefactor_upper";
  }
  if (!same_optional_double(supplied.radius_upper, fresh.radius_upper)) {
    return "radius_upper";
  }
  if (!same_optional_interval(
          supplied.member_width_slice, fresh.member_width_slice)) {
    return "member_width_slice";
  }
  if (!same_optional_double(
          supplied.admission_width_threshold,
          fresh.admission_width_threshold)) {
    return "admission_width_threshold";
  }
  if (!same_optional_double(supplied.emitted_width, fresh.emitted_width)) {
    return "emitted_width";
  }
  if (!same_optional_vector(supplied.acceleration, fresh.acceleration)) {
    return "acceleration";
  }
  if (supplied.cell_boundaries != fresh.cell_boundaries) {
    return "cell_boundaries";
  }
  if (!same_optional_double(
          supplied.join_velocity_jump_upper, fresh.join_velocity_jump_upper)) {
    return "join_velocity_jump_upper";
  }
  if (supplied.history_grade != fresh.history_grade) return "history_grade";
  return {};
}

}  // namespace architrino::eom

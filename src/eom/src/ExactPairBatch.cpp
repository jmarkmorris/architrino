#include "architrino/eom/ExactPairBatch.hpp"

#include "architrino/eom/Interval.hpp"

#include <mpfr.h>

#include <algorithm>
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
#include <mutex>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <thread>
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
};

DoubleGeometry double_geometry(
    const DoubleReceiverState& receiver,
    const CubicHistorySegment& source_segment,
    const Interval& reception,
    const Interval& emission,
    const Interval& field_speed) {
  const auto source_position = source_segment.position_interval(emission);
  const auto source_velocity = source_segment.velocity_interval(emission);
  const auto displacement = subtract(receiver.position, source_position);
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

struct DoubleAttempt {
  bool complete = true;
  bool memory_boundary_contact = false;
  bool coincident_endpoint_excluded = false;
  bool caustic_candidate = false;
  std::size_t visited_cells = 0;
  std::size_t excluded_cells = 0;
  std::size_t difficult_cells = 0;
  std::vector<DoubleRoot> roots;
};

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
  if (!certificate.has_value() ||
      certificate->valid_reception_time != request.reception_time) {
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
  return tangential_speed.lower() > 0.0 &&
         tangential_speed.upper() <= field_speed.lower();
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
  const DoubleReceiverState receiver_state{
      request.receiver->position_hull(reception),
      request.receiver->velocity_hull(reception)};

  struct Cell {
    std::size_t segment_index;
    double lower;
    double upper;
    std::size_t depth;
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
      cells.push_back({index, lower, upper, 0});
    }
  }
  if (cells.empty()) {
    throw std::out_of_range("root search has no covered source segment");
  }

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
    const auto& source_segment = request.source->segments()[cell.segment_index];
    const Interval emission(cell.lower, cell.upper);
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
      bool superfield_component = false;
      for (const auto& component : source_velocity) {
        superfield_component = superfield_component ||
            component.lower() > field_speed.upper() ||
            component.upper() < -field_speed.upper();
      }
      IntervalVector endpoint_direction{
          Interval::point(receiver_state.velocity[0].midpoint()),
          Interval::point(receiver_state.velocity[1].midpoint()),
          Interval::point(receiver_state.velocity[2].midpoint())};
      const double endpoint_direction_norm =
          std::sqrt(
              endpoint_direction[0].midpoint() *
                  endpoint_direction[0].midpoint() +
              endpoint_direction[1].midpoint() *
                  endpoint_direction[1].midpoint() +
              endpoint_direction[2].midpoint() *
                  endpoint_direction[2].midpoint());
      bool superfield_projection = false;
      if (endpoint_direction_norm > 0.0) {
        for (auto& component : endpoint_direction) {
          component = component / Interval::point(endpoint_direction_norm);
        }
        const Interval projection =
            dot(endpoint_direction, source_velocity);
        superfield_projection =
            projection.lower() > field_speed.upper() ||
            projection.upper() < -field_speed.upper();
      }
      if (subfield || superfield_component || superfield_projection) {
        attempt.coincident_endpoint_excluded = true;
        ++attempt.excluded_cells;
        return;
      }
    }
    const auto geometry = double_geometry(
        receiver_state, source_segment, reception, emission, field_speed);
    if (geometry.residual.excludes_zero()) {
      ++attempt.excluded_cells;
      return;
    }
    if (!geometry.source_normal.has_value() ||
        geometry.source_normal->contains_zero()) {
      if (cell.upper - cell.lower <= tolerance ||
          cell.depth == request.max_depth) {
        attempt.complete = false;
        attempt.caustic_candidate = true;
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
      return;
    }
    if (lower_sign == 0 || upper_sign == 0) {
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
      const int middle_sign =
          double_geometry(receiver_state, source_segment, reception,
                          Interval::point(middle), field_speed)
              .residual.strict_sign();
      if (middle_sign == 0) {
        attempt.complete = false;
        ++attempt.difficult_cells;
        return;
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

class MpFloat {
 public:
  explicit MpFloat(mpfr_prec_t bits) : bits_(bits) { mpfr_init2(value_, bits_); }

  MpFloat(const MpFloat& other) : bits_(other.bits_) {
    mpfr_init2(value_, bits_);
    mpfr_set(value_, other.value_, MPFR_RNDN);
  }

  MpFloat(MpFloat&& other) noexcept : bits_(other.bits_) {
    mpfr_init2(value_, bits_);
    mpfr_swap(value_, other.value_);
  }

  MpFloat& operator=(const MpFloat& other) {
    if (this != &other) {
      if (bits_ != other.bits_) {
        mpfr_set_prec(value_, other.bits_);
        bits_ = other.bits_;
      }
      mpfr_set(value_, other.value_, MPFR_RNDN);
    }
    return *this;
  }

  MpFloat& operator=(MpFloat&& other) noexcept {
    if (this != &other) {
      mpfr_swap(value_, other.value_);
      std::swap(bits_, other.bits_);
    }
    return *this;
  }

  ~MpFloat() { mpfr_clear(value_); }

  static MpFloat decimal(
      const std::string& token,
      mpfr_prec_t bits,
      mpfr_rnd_t rounding) {
    MpFloat result(bits);
    if (mpfr_set_str(result.value_, token.c_str(), 10, rounding) != 0) {
      throw std::invalid_argument("invalid MPFR decimal token: " + token);
    }
    return result;
  }

  static MpFloat unsigned_value(
      unsigned long value,
      mpfr_prec_t bits) {
    MpFloat result(bits);
    mpfr_set_ui(result.value_, value, MPFR_RNDN);
    return result;
  }

  [[nodiscard]] mpfr_prec_t bits() const noexcept { return bits_; }
  [[nodiscard]] mpfr_srcptr raw() const noexcept { return value_; }
  [[nodiscard]] mpfr_ptr raw() noexcept { return value_; }
  [[nodiscard]] int compare(const MpFloat& other) const {
    return mpfr_cmp(value_, other.value_);
  }
  [[nodiscard]] int compare_zero() const { return mpfr_sgn(value_); }
  [[nodiscard]] std::string token(mpfr_rnd_t rounding) const {
    const int digits =
        static_cast<int>(std::ceil(static_cast<double>(bits_) * 0.30103)) + 3;
    const char* format = rounding == MPFR_RNDD ? "%.*RDg" : "%.*RUg";
    const int size = mpfr_snprintf(nullptr, 0, format, digits, value_);
    if (size < 0) {
      throw std::runtime_error("MPFR string formatting failed");
    }
    std::string result(static_cast<std::size_t>(size) + 1U, '\0');
    mpfr_snprintf(result.data(), result.size(), format, digits, value_);
    result.resize(static_cast<std::size_t>(size));
    return result;
  }

 private:
  mpfr_t value_;
  mpfr_prec_t bits_;
};

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
        MpFloat::decimal(token, bits, MPFR_RNDD),
        MpFloat::decimal(token, bits, MPFR_RNDU));
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

MpFloat minimum(std::vector<MpFloat>& values) {
  return *std::min_element(values.begin(), values.end(),
                           [](const auto& left, const auto& right) {
                             return left.compare(right) < 0;
                           });
}

MpFloat maximum(std::vector<MpFloat>& values) {
  return *std::max_element(values.begin(), values.end(),
                           [](const auto& left, const auto& right) {
                             return left.compare(right) < 0;
                           });
}

MpInterval operator*(const MpInterval& left, const MpInterval& right) {
  std::vector<MpFloat> lower_candidates;
  std::vector<MpFloat> upper_candidates;
  lower_candidates.reserve(4);
  upper_candidates.reserve(4);
  for (const auto* left_value : {&left.lower(), &left.upper()}) {
    for (const auto* right_value : {&right.lower(), &right.upper()}) {
      lower_candidates.push_back(
          mp_multiply(*left_value, *right_value, MPFR_RNDD));
      upper_candidates.push_back(
          mp_multiply(*left_value, *right_value, MPFR_RNDU));
    }
  }
  return MpInterval(minimum(lower_candidates), maximum(upper_candidates));
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
  std::vector<MpFloat> lower_candidates = {
      mp_multiply(value.lower(), value.lower(), MPFR_RNDD),
      mp_multiply(value.upper(), value.upper(), MPFR_RNDD),
  };
  std::vector<MpFloat> upper_candidates = {
      mp_multiply(value.lower(), value.lower(), MPFR_RNDU),
      mp_multiply(value.upper(), value.upper(), MPFR_RNDU),
  };
  return MpInterval(minimum(lower_candidates), maximum(upper_candidates));
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

MpInterval mp_polynomial(
    const CubicHistorySegment& segment,
    std::size_t axis,
    const MpInterval& time,
    mpfr_prec_t bits) {
  const auto& coefficients = segment.coefficient_tokens()[axis];
  const MpInterval local_time =
      time - MpInterval::decimal(segment.t_start_token(), bits);
  MpInterval result = MpInterval::decimal(coefficients[3], bits);
  for (int index = 2; index >= 0; --index) {
    result = result * local_time +
             MpInterval::decimal(coefficients[static_cast<std::size_t>(index)], bits);
  }
  return result;
}

MpVector mp_position(
    const CubicHistorySegment& segment,
    const MpInterval& time,
    mpfr_prec_t bits) {
  return {
      mp_polynomial(segment, 0, time, bits).inflate(segment.position_error_token()),
      mp_polynomial(segment, 1, time, bits).inflate(segment.position_error_token()),
      mp_polynomial(segment, 2, time, bits).inflate(segment.position_error_token()),
  };
}

MpVector mp_velocity(
    const CubicHistorySegment& segment,
    const MpInterval& time,
    mpfr_prec_t bits) {
  const MpInterval local_time =
      time - MpInterval::decimal(segment.t_start_token(), bits);
  const MpInterval two = MpInterval::decimal("2", bits);
  const MpInterval three = MpInterval::decimal("3", bits);
  MpVector result = {
      MpInterval::decimal("0", bits), MpInterval::decimal("0", bits),
      MpInterval::decimal("0", bits)};
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const auto& coefficients = segment.coefficient_tokens()[axis];
    MpInterval derivative =
        three * MpInterval::decimal(coefficients[3], bits);
    derivative = derivative * local_time +
                 two * MpInterval::decimal(coefficients[2], bits);
    derivative = derivative * local_time +
                 MpInterval::decimal(coefficients[1], bits);
    result[axis] = derivative.inflate(segment.velocity_error_token());
  }
  return result;
}

const CubicHistorySegment& mp_segment_at(
    const RetainedHistory& history,
    const MpFloat& time) {
  for (const auto& segment : history.segments()) {
    const MpFloat start =
        MpFloat::decimal(segment.t_start_token(), time.bits(), MPFR_RNDD);
    const MpFloat end =
        MpFloat::decimal(segment.t_end_token(), time.bits(), MPFR_RNDU);
    if (time.compare(start) >= 0 && time.compare(end) <= 0) {
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
};

MpGeometry mp_geometry(
    const MpReceiverState& receiver,
    const CubicHistorySegment& source_segment,
    const MpInterval& reception,
    const MpInterval& emission,
    const MpInterval& field_speed,
    mpfr_prec_t bits) {
  const auto source_position = mp_position(source_segment, emission, bits);
  const auto source_velocity = mp_velocity(source_segment, emission, bits);
  const auto displacement =
      mp_subtract_vector(receiver.position, source_position);
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
    const CubicHistorySegment& source_segment,
    const MpInterval& reception,
    const MpInterval& field_speed,
    const MpFloat& point,
    mpfr_prec_t bits) {
  MpFloat lower(point);
  MpFloat upper(point);
  for (unsigned stage = 0; stage <= 20; ++stage) {
    const unsigned long advances =
        stage == 0 ? 1UL : (1UL << (stage - 1U));
    for (unsigned long step = 0; step < advances; ++step) {
      mpfr_nextbelow(lower.raw());
      mpfr_nextabove(upper.raw());
    }
    const int lower_sign =
        mp_geometry(receiver, source_segment, reception, MpInterval::point(lower),
                    field_speed, bits)
            .residual.strict_sign();
    const int upper_sign =
        mp_geometry(receiver, source_segment, reception, MpInterval::point(upper),
                    field_speed, bits)
            .residual.strict_sign();
    if (lower_sign != 0 && upper_sign != 0 && lower_sign != upper_sign) {
      return std::make_pair(lower, upper);
    }
  }
  return std::nullopt;
}

bool mp_self_endpoint_open_cell_is_root_free(
    const ExactPairRequest& request,
    const CubicHistorySegment& source_segment,
    const MpInterval& emission,
    const MpInterval& reception,
    const MpVector& receiver_velocity,
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
  const MpVector velocity = mp_velocity(source_segment, emission, bits);
  const MpInterval speed = mp_norm(velocity);
  if (speed.upper().compare(field_speed.lower()) < 0) {
    return true;
  }
  const MpInterval receiver_speed = mp_norm(receiver_velocity);
  if (receiver_speed.lower().compare_zero() > 0) {
    const MpVector endpoint_direction =
        mp_divide_vector(receiver_velocity, receiver_speed);
    const MpInterval projection = mp_dot(endpoint_direction, velocity);
    const MpInterval zero = MpInterval::decimal("0", bits);
    const MpInterval negative_field_speed = zero - field_speed;
    if (projection.lower().compare(field_speed.upper()) > 0 ||
        projection.upper().compare(negative_field_speed.lower()) < 0) {
      return true;
    }
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
  MpAttempt attempt;
  const MpInterval reception =
      MpInterval::decimal(request.reception_time, bits);
  const MpInterval field_speed = MpInterval::decimal(request.field_speed, bits);
  const MpFloat search_lower =
      MpFloat::decimal(request.search_lower, bits, MPFR_RNDD);
  const MpFloat search_upper =
      MpFloat::decimal(request.search_upper, bits, MPFR_RNDU);
  const MpFloat tolerance =
      MpFloat::decimal(request.root_tolerance, bits, MPFR_RNDU);
  const auto& receiver_segment = mp_segment_at(
      *request.receiver, mp_midpoint(reception.lower(), reception.upper()));
  const MpReceiverState receiver_state{
      mp_position(receiver_segment, reception, bits),
      mp_velocity(receiver_segment, reception, bits)};

  struct Cell {
    std::size_t segment_index;
    MpFloat lower;
    MpFloat upper;
    std::size_t depth;
  };

  std::vector<Cell> cells;
  std::size_t first_segment = 0U;
  std::size_t suffix_upper = request.source->segments().size();
  while (first_segment < suffix_upper) {
    const std::size_t middle =
        first_segment + (suffix_upper - first_segment) / 2U;
    const MpFloat segment_end = MpFloat::decimal(
        request.source->segments()[middle].t_end_token(), bits, MPFR_RNDU);
    if (segment_end.compare(search_lower) <= 0) {
      first_segment = middle + 1U;
    } else {
      suffix_upper = middle;
    }
  }
  for (std::size_t index = first_segment;
       index < request.source->segments().size(); ++index) {
    const auto& segment = request.source->segments()[index];
    const MpFloat segment_lower =
        MpFloat::decimal(segment.t_start_token(), bits, MPFR_RNDD);
    if (segment_lower.compare(search_upper) >= 0) {
      break;
    }
    const MpFloat segment_upper =
        MpFloat::decimal(segment.t_end_token(), bits, MPFR_RNDU);
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

  auto add_endpoint_root = [&](const CubicHistorySegment& source_segment,
                               std::size_t segment_index,
                               const MpFloat& point,
                               const MpInterval& point_residual) {
    MpFloat lower(point);
    MpFloat upper(point);
    if (!point_residual.is_exact_zero()) {
      const auto surrounded = surround_mp_root(
          receiver_state, source_segment, reception, field_speed, point, bits);
      if (!surrounded.has_value()) {
        attempt.complete = false;
        ++attempt.difficult_cells;
        return;
      }
      lower = surrounded->first;
      upper = surrounded->second;
    }
    const auto root_geometry = mp_geometry(
        receiver_state, source_segment, reception,
        MpInterval::bounds(lower, upper),
        field_speed, bits);
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
    const auto& source_segment = request.source->segments()[cell.segment_index];
    const MpInterval emission = MpInterval::bounds(cell.lower, cell.upper);
    if (mp_self_endpoint_open_cell_is_root_free(
            request, source_segment, emission, reception,
            receiver_state.velocity, field_speed, bits)) {
      attempt.coincident_endpoint_excluded = true;
      ++attempt.excluded_cells;
      return;
    }
    const auto geometry = mp_geometry(
        receiver_state, source_segment, reception, emission, field_speed, bits);
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
        field_speed, bits);
    const auto upper_geometry = mp_geometry(
        receiver_state, source_segment, reception, MpInterval::point(cell.upper),
        field_speed, bits);
    const int lower_sign = lower_geometry.residual.strict_sign();
    const int upper_sign = upper_geometry.residual.strict_sign();
    if (lower_sign != 0 && lower_sign == upper_sign) {
      ++attempt.excluded_cells;
      return;
    }
    if (lower_sign == 0) {
      add_endpoint_root(source_segment, cell.segment_index, cell.lower,
                        lower_geometry.residual);
      return;
    }
    if (upper_sign == 0) {
      add_endpoint_root(source_segment, cell.segment_index, cell.upper,
                        upper_geometry.residual);
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
                      MpInterval::point(middle), field_speed, bits)
              .residual.strict_sign();
      if (middle_sign == 0) {
        const auto surrounded = surround_mp_root(
            receiver_state, source_segment, reception, field_speed, middle,
            bits);
        if (!surrounded.has_value()) {
          attempt.complete = false;
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
      ++attempt.difficult_cells;
      return;
    }
    const auto root_geometry = mp_geometry(
        receiver_state, source_segment, reception,
        MpInterval::bounds(lower, upper),
        field_speed, bits);
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
                    : (attempt.caustic_candidate ? "caustic_route_required"
                                                 : "uncertified"),
      .failure_code = complete
                          ? (attempt.memory_boundary_contact
                                 ? "insufficient_history_depth"
                                 : "")
                          : (attempt.memory_boundary_contact
                                 ? "insufficient_history_depth"
                                 : (attempt.caustic_candidate
                                        ? "numeric_source_normal_sign_uncertified"
                                        : (exhausted
                                               ? "numeric_precision_limit_exhausted"
                                               : "numeric_root_count_uncertified"))),
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

  unsigned bits = request.initial_mpfr_bits;
  MpAttempt latest;
  double mpfr_seconds = 0.0;
  std::size_t mpfr_attempt_count = 0;
  while (true) {
    const auto mpfr_start = Clock::now();
    latest = run_mpfr_attempt(request, bits);
    mpfr_seconds +=
        std::chrono::duration<double>(Clock::now() - mpfr_start).count();
    ++mpfr_attempt_count;
    if (latest.complete) {
      auto certificate = mpfr_certificate(request, latest, bits, false);
      certificate.binary64_cpu_seconds = binary64_seconds;
      certificate.mpfr_cpu_seconds = mpfr_seconds;
      certificate.mpfr_attempt_count = mpfr_attempt_count;
      return certificate;
    }
    if (bits >= request.maximum_mpfr_bits) {
      auto certificate = mpfr_certificate(request, latest, bits, true);
      certificate.binary64_cpu_seconds = binary64_seconds;
      certificate.mpfr_cpu_seconds = mpfr_seconds;
      certificate.mpfr_attempt_count = mpfr_attempt_count;
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

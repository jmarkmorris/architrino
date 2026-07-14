#include "architrino/eom/History.hpp"

#include <boost/multiprecision/cpp_int.hpp>

#include <algorithm>
#include <cerrno>
#include <cmath>
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <utility>

namespace architrino::eom {
namespace {

using ExactRational = boost::multiprecision::cpp_rational;

void fingerprint_token(std::uint64_t& state, const std::string& token) {
  const std::string length = std::to_string(token.size());
  for (const char value : length) {
    state ^= static_cast<unsigned char>(value);
    state *= UINT64_C(1099511628211);
  }
  state ^= static_cast<unsigned char>(':');
  state *= UINT64_C(1099511628211);
  for (const char value : token) {
    state ^= static_cast<unsigned char>(value);
    state *= UINT64_C(1099511628211);
  }
}

std::string history_fingerprint(
    const std::vector<CubicHistorySegment>& segments) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  fingerprint_token(state, std::to_string(segments.size()));
  for (const auto& segment : segments) {
    fingerprint_token(state, segment.t_start_token());
    fingerprint_token(state, segment.t_end_token());
    for (const auto& axis : segment.coefficient_tokens()) {
      for (const auto& coefficient : axis) {
        fingerprint_token(state, coefficient);
      }
    }
    fingerprint_token(state, segment.position_error_token());
    fingerprint_token(state, segment.velocity_error_token());
  }
  std::ostringstream stream;
  stream << "fnv1a64:" << std::hex << std::setw(16) << std::setfill('0')
         << state;
  return stream.str();
}

ExactRational power_of_ten(std::size_t exponent) {
  boost::multiprecision::cpp_int value = 1;
  for (std::size_t index = 0; index < exponent; ++index) {
    value *= 10;
  }
  return ExactRational(value);
}

ExactRational exact_decimal(const std::string& token) {
  std::string mantissa = token;
  long exponent = 0;
  const auto exponent_position = mantissa.find_first_of("eE");
  if (exponent_position != std::string::npos) {
    exponent = std::stol(mantissa.substr(exponent_position + 1));
    mantissa.resize(exponent_position);
  }
  bool negative = false;
  if (!mantissa.empty() && (mantissa.front() == '+' || mantissa.front() == '-')) {
    negative = mantissa.front() == '-';
    mantissa.erase(mantissa.begin());
  }
  const auto decimal_position = mantissa.find('.');
  std::size_t fractional_digits = 0;
  if (decimal_position != std::string::npos) {
    fractional_digits = mantissa.size() - decimal_position - 1;
    mantissa.erase(decimal_position, 1);
  }
  if (mantissa.empty()) {
    throw std::invalid_argument("invalid exact decimal token");
  }
  boost::multiprecision::cpp_int numerator = 0;
  for (const char digit : mantissa) {
    if (digit < '0' || digit > '9') {
      throw std::invalid_argument("invalid exact decimal mantissa");
    }
    numerator *= 10;
    numerator += digit - '0';
  }
  if (negative) {
    numerator = -numerator;
  }
  const long scale = exponent - static_cast<long>(fractional_digits);
  if (scale >= 0) {
    return ExactRational(numerator) *
           power_of_ten(static_cast<std::size_t>(scale));
  }
  return ExactRational(numerator) /
         power_of_ten(static_cast<std::size_t>(-scale));
}

ExactRational exact_polynomial(
    const std::array<std::string, 4>& coefficients,
    const ExactRational& local_time) {
  ExactRational result = exact_decimal(coefficients[3]);
  for (int index = 2; index >= 0; --index) {
    result = result * local_time +
             exact_decimal(coefficients[static_cast<std::size_t>(index)]);
  }
  return result;
}

ExactRational exact_velocity(
    const std::array<std::string, 4>& coefficients,
    const ExactRational& local_time) {
  return ExactRational(3) * exact_decimal(coefficients[3]) * local_time *
             local_time +
         ExactRational(2) * exact_decimal(coefficients[2]) * local_time +
         exact_decimal(coefficients[1]);
}

bool exact_enclosures_overlap(
    const ExactRational& left,
    const ExactRational& left_error,
    const ExactRational& right,
    const ExactRational& right_error) {
  return left - left_error <= right + right_error &&
         right - right_error <= left + left_error;
}

double parse_decimal(const std::string& token, const char* label) {
  errno = 0;
  char* end = nullptr;
  const double value = std::strtod(token.c_str(), &end);
  if (errno == ERANGE || end == token.c_str() || *end != '\0' ||
      !std::isfinite(value)) {
    throw std::invalid_argument(std::string("invalid ") + label + ": " + token);
  }
  return value;
}

IntervalVector segment_hull(
    const RetainedHistory& history,
    const Interval& time,
    bool velocity) {
  if (!history.covers(time)) {
    throw std::out_of_range("history interval lies outside retained coverage");
  }
  std::optional<IntervalVector> result;
  const Interval retained_start =
      Interval::decimal_token(history.segments().front().t_start_token());
  const Interval retained_end =
      Interval::decimal_token(history.segments().back().t_end_token());
  const double requested_lower = std::max(time.lower(), retained_start.lower());
  const double requested_upper = std::min(time.upper(), retained_end.upper());
  double cursor = requested_lower;
  for (const auto& segment : history.segments()) {
    const Interval segment_start =
        Interval::decimal_token(segment.t_start_token());
    const Interval segment_end = Interval::decimal_token(segment.t_end_token());
    const double lower = std::max(requested_lower, segment_start.lower());
    const double upper = std::min(requested_upper, segment_end.upper());
    if (lower > upper || upper < cursor) {
      continue;
    }
    if (lower > cursor) {
      throw std::out_of_range("retained history contains an interval gap");
    }
    const Interval local_time(lower, upper);
    const auto value = velocity ? segment.velocity_interval(local_time)
                                : segment.position_interval(local_time);
    result = result.has_value() ? hull(*result, value) : value;
    cursor = std::max(cursor, upper);
    if (cursor >= requested_upper) {
      break;
    }
  }
  if (!result.has_value() || cursor < requested_upper) {
    throw std::out_of_range("retained history does not cover complete interval");
  }
  return *result;
}

}  // namespace

CubicHistorySegment::CubicHistorySegment(
    std::string t_start,
    std::string t_end,
    CubicCoefficientTokens coefficients,
    std::string position_error,
    std::string velocity_error)
    : t_start_token_(std::move(t_start)),
      t_end_token_(std::move(t_end)),
      coefficient_tokens_(std::move(coefficients)),
      position_error_token_(std::move(position_error)),
      velocity_error_token_(std::move(velocity_error)),
      t_start_(parse_decimal(t_start_token_, "history start time")),
      t_end_(parse_decimal(t_end_token_, "history end time")),
      position_error_(parse_decimal(position_error_token_, "position error")),
      velocity_error_(parse_decimal(velocity_error_token_, "velocity error")) {
  if (t_start_ >= t_end_) {
    throw std::invalid_argument("history segment requires t_start < t_end");
  }
  if (position_error_ < 0.0 || velocity_error_ < 0.0) {
    throw std::invalid_argument("history errors must be nonnegative");
  }
  for (const auto& row : coefficient_tokens_) {
    for (const auto& token : row) {
      static_cast<void>(parse_decimal(token, "history coefficient"));
    }
  }
}

void CubicHistorySegment::require_time(const Interval& time) const {
  const Interval start = Interval::decimal_token(t_start_token_);
  const Interval end = Interval::decimal_token(t_end_token_);
  if (time.lower() < start.lower() || time.upper() > end.upper()) {
    throw std::out_of_range("history evaluation lies outside segment");
  }
}

Interval CubicHistorySegment::polynomial_interval(
    const std::array<std::string, 4>& coefficients,
    const Interval& time) const {
  require_time(time);
  const Interval local_time = time - Interval::decimal_token(t_start_token_);
  Interval result = Interval::decimal_token(coefficients[3]);
  for (int index = 2; index >= 0; --index) {
    result = result * local_time +
             Interval::decimal_token(coefficients[static_cast<std::size_t>(index)]);
  }
  return result;
}

IntervalVector CubicHistorySegment::position_interval(
    const Interval& time) const {
  return {
      polynomial_interval(coefficient_tokens_[0], time).inflate(position_error_),
      polynomial_interval(coefficient_tokens_[1], time).inflate(position_error_),
      polynomial_interval(coefficient_tokens_[2], time).inflate(position_error_),
  };
}

IntervalVector CubicHistorySegment::velocity_interval(
    const Interval& time) const {
  require_time(time);
  const Interval local_time = time - Interval::decimal_token(t_start_token_);
  IntervalVector result = {
      Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  for (std::size_t axis = 0; axis < 3; ++axis) {
    Interval derivative =
        Interval::point(3.0) *
        Interval::decimal_token(coefficient_tokens_[axis][3]);
    derivative = derivative * local_time +
                 Interval::point(2.0) *
                     Interval::decimal_token(coefficient_tokens_[axis][2]);
    derivative = derivative * local_time +
                 Interval::decimal_token(coefficient_tokens_[axis][1]);
    result[axis] = derivative.inflate(velocity_error_);
  }
  return result;
}

RetainedHistory::RetainedHistory(
    std::string history_id,
    std::vector<CubicHistorySegment> segments)
    : history_id_(std::move(history_id)), segments_(std::move(segments)) {
  if (history_id_.empty()) {
    throw std::invalid_argument("retained history requires an identity");
  }
  if (segments_.empty()) {
    throw std::invalid_argument("retained history requires at least one segment");
  }
  for (std::size_t index = 1; index < segments_.size(); ++index) {
    const auto& prior = segments_[index - 1];
    const auto& next = segments_[index];
    const ExactRational prior_end = exact_decimal(prior.t_end_token());
    const ExactRational next_start = exact_decimal(next.t_start_token());
    if (prior_end != next_start) {
      throw std::invalid_argument("retained-history segments must be contiguous");
    }
    const ExactRational prior_local_time =
        prior_end - exact_decimal(prior.t_start_token());
    const ExactRational prior_position_error =
        exact_decimal(prior.position_error_token());
    const ExactRational next_position_error =
        exact_decimal(next.position_error_token());
    const ExactRational prior_velocity_error =
        exact_decimal(prior.velocity_error_token());
    const ExactRational next_velocity_error =
        exact_decimal(next.velocity_error_token());
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const ExactRational prior_position =
          exact_polynomial(prior.coefficient_tokens()[axis], prior_local_time);
      const ExactRational next_position =
          exact_decimal(next.coefficient_tokens()[axis][0]);
      if (!exact_enclosures_overlap(prior_position, prior_position_error,
                                    next_position, next_position_error)) {
        throw std::invalid_argument("retained-history position is discontinuous");
      }
      const ExactRational prior_velocity =
          exact_velocity(prior.coefficient_tokens()[axis], prior_local_time);
      const ExactRational next_velocity =
          exact_decimal(next.coefficient_tokens()[axis][1]);
      if (!exact_enclosures_overlap(prior_velocity, prior_velocity_error,
                                    next_velocity, next_velocity_error)) {
        throw std::invalid_argument("retained-history velocity is discontinuous");
      }
    }
  }
  provenance_fingerprint_ = history_fingerprint(segments_);
}

double RetainedHistory::t_start() const noexcept {
  return segments_.front().t_start();
}

double RetainedHistory::t_end() const noexcept {
  return segments_.back().t_end();
}

bool RetainedHistory::covers(const Interval& time) const noexcept {
  try {
    const Interval start =
        Interval::decimal_token(segments_.front().t_start_token());
    const Interval end =
        Interval::decimal_token(segments_.back().t_end_token());
    return time.lower() >= start.lower() && time.upper() <= end.upper();
  } catch (...) {
    return false;
  }
}

std::size_t RetainedHistory::segment_index_at(double time) const {
  if (time < t_start() || time > t_end()) {
    throw std::out_of_range("history time lies outside retained coverage");
  }
  for (std::size_t index = 0; index < segments_.size(); ++index) {
    if (segments_[index].t_start() <= time &&
        (time < segments_[index].t_end() || index + 1 == segments_.size())) {
      return index;
    }
  }
  throw std::out_of_range("history contains an uncovered time");
}

IntervalVector RetainedHistory::position_hull(const Interval& time) const {
  return segment_hull(*this, time, false);
}

IntervalVector RetainedHistory::velocity_hull(const Interval& time) const {
  return segment_hull(*this, time, true);
}

}  // namespace architrino::eom

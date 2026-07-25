#include "architrino/eom/Interval.hpp"
#include "architrino/eom/Decimal.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <stdexcept>
#include <utility>

namespace architrino::eom {
namespace {

double downward(double value) {
  if (std::isinf(value) && value < 0.0) {
    return value;
  }
  return std::nextafter(value, -std::numeric_limits<double>::infinity());
}

double upward(double value) {
  if (std::isinf(value) && value > 0.0) {
    return value;
  }
  return std::nextafter(value, std::numeric_limits<double>::infinity());
}

double downward_transcendental(double value) {
  return downward(downward(value));
}

double upward_transcendental(double value) {
  return upward(upward(value));
}

void require_finite(double value, const char* label) {
  if (!std::isfinite(value)) {
    throw std::invalid_argument(std::string(label) + " must be finite");
  }
}

}  // namespace

Interval::Interval(double lower, double upper) : lower_(lower), upper_(upper) {
  require_finite(lower, "interval lower bound");
  require_finite(upper, "interval upper bound");
  if (lower > upper) {
    throw std::invalid_argument("interval lower bound exceeds upper bound");
  }
}

Interval Interval::point(double value) {
  require_finite(value, "interval point");
  return Interval(value, value);
}

Interval Interval::decimal_token(const std::string& token) {
  if (token.empty()) {
    throw std::invalid_argument("decimal token cannot be empty");
  }
  const double value = parse_finite_double(token, "finite decimal token");
  return Interval(downward(value), upward(value));
}

double Interval::width() const noexcept { return upward(upper_ - lower_); }

double Interval::midpoint() const noexcept {
  if (lower_ < 0.0 && upper_ > 0.0) {
    return lower_ * 0.5 + upper_ * 0.5;
  }
  return lower_ + (upper_ - lower_) * 0.5;
}

bool Interval::contains_zero() const noexcept {
  return lower_ <= 0.0 && upper_ >= 0.0;
}

bool Interval::excludes_zero() const noexcept { return !contains_zero(); }

int Interval::strict_sign() const noexcept {
  if (lower_ > 0.0) {
    return 1;
  }
  if (upper_ < 0.0) {
    return -1;
  }
  return 0;
}

bool Interval::is_exact_zero() const noexcept {
  return lower_ == 0.0 && upper_ == 0.0;
}

bool Interval::subset_of(const Interval& other) const noexcept {
  return lower_ >= other.lower_ && upper_ <= other.upper_;
}

bool Interval::interior_subset_of(const Interval& other) const noexcept {
  return lower_ > other.lower_ && upper_ < other.upper_;
}

Interval Interval::inflate(double radius) const {
  require_finite(radius, "interval inflation radius");
  if (radius < 0.0) {
    throw std::invalid_argument("interval inflation radius must be nonnegative");
  }
  return Interval(downward(lower_ - radius), upward(upper_ + radius));
}

Interval Interval::hull(const Interval& other) const {
  return Interval(std::min(lower_, other.lower_),
                  std::max(upper_, other.upper_));
}

std::optional<Interval> Interval::intersection(const Interval& other) const {
  const double lower = std::max(lower_, other.lower_);
  const double upper = std::min(upper_, other.upper_);
  if (lower > upper) {
    return std::nullopt;
  }
  return Interval(lower, upper);
}

Interval operator+(const Interval& left, const Interval& right) {
  return Interval(downward(left.lower() + right.lower()),
                  upward(left.upper() + right.upper()));
}

Interval operator-(const Interval& left, const Interval& right) {
  return Interval(downward(left.lower() - right.upper()),
                  upward(left.upper() - right.lower()));
}

Interval operator*(const Interval& left, const Interval& right) {
  const std::array<double, 4> lower_candidates = {
      downward(left.lower() * right.lower()),
      downward(left.lower() * right.upper()),
      downward(left.upper() * right.lower()),
      downward(left.upper() * right.upper()),
  };
  const std::array<double, 4> upper_candidates = {
      upward(left.lower() * right.lower()),
      upward(left.lower() * right.upper()),
      upward(left.upper() * right.lower()),
      upward(left.upper() * right.upper()),
  };
  return Interval(*std::min_element(lower_candidates.begin(),
                                    lower_candidates.end()),
                  *std::max_element(upper_candidates.begin(),
                                    upper_candidates.end()));
}

Interval operator/(const Interval& left, const Interval& right) {
  if (right.contains_zero()) {
    throw std::domain_error("interval division denominator contains zero");
  }
  const Interval reciprocal(
      downward(1.0 / right.upper()), upward(1.0 / right.lower()));
  return left * reciprocal;
}

Interval interval_square(const Interval& value) {
  if (value.contains_zero()) {
    const double maximum =
        std::max(std::abs(value.lower()), std::abs(value.upper()));
    return Interval(0.0, upward(maximum * maximum));
  }
  const double first = value.lower() * value.lower();
  const double second = value.upper() * value.upper();
  return Interval(downward(std::min(first, second)),
                  upward(std::max(first, second)));
}

Interval interval_sqrt(const Interval& value) {
  if (value.lower() < 0.0) {
    throw std::domain_error("interval square root requires nonnegative lower bound");
  }
  const double lower = value.lower() == 0.0
                           ? 0.0
                           : downward_transcendental(
                                 std::sqrt(value.lower()));
  return Interval(
      lower, upward_transcendental(std::sqrt(value.upper())));
}

Interval interval_exp(const Interval& value) {
  const double lower_value = std::exp(value.lower());
  const double upper_value = std::exp(value.upper());
  if (!std::isfinite(lower_value) || !std::isfinite(upper_value)) {
    throw std::overflow_error("interval exponential is nonfinite");
  }
  const double lower = lower_value == 0.0
      ? 0.0
      : downward_transcendental(lower_value);
  return Interval(lower, upward_transcendental(upper_value));
}

Interval interval_erf(const Interval& value) {
  const double lower_value = std::erf(value.lower());
  const double upper_value = std::erf(value.upper());
  if (!std::isfinite(lower_value) || !std::isfinite(upper_value)) {
    throw std::overflow_error("interval error function is nonfinite");
  }
  return Interval(
      lower_value == -1.0
          ? -1.0
          : downward_transcendental(lower_value),
      upper_value == 1.0
          ? 1.0
          : upward_transcendental(upper_value));
}

Interval interval_absolute(const Interval& value) {
  if (value.lower() >= 0.0) {
    return value;
  }
  if (value.upper() <= 0.0) {
    return Interval(-value.upper(), -value.lower());
  }
  return Interval(0.0, std::max(-value.lower(), value.upper()));
}

namespace {

std::pair<double, double> phase_bounds(
    unsigned numerator,
    unsigned denominator) {
  if (numerator == 0U) {
    return {0.0, 0.0};
  }
  constexpr double kPiLower = 3.1415926535897931;
  constexpr double kPiUpper = 3.1415926535897936;
  const double factor =
      static_cast<double>(numerator) / static_cast<double>(denominator);
  return {
      downward(factor * kPiLower),
      upward(factor * kPiUpper),
  };
}

bool contains_phase(
    const Interval& value,
    unsigned phase_numerator,
    unsigned phase_denominator) {
  const auto [phase_lower, phase_upper] =
      phase_bounds(phase_numerator, phase_denominator);
  const auto [period_lower, period_upper] = phase_bounds(2U, 1U);
  const double numerator_lower = downward(value.lower() - phase_upper);
  const double numerator_upper = upward(value.upper() - phase_lower);
  const std::array<double, 4> lower_candidates{
      downward(numerator_lower / period_lower),
      downward(numerator_lower / period_upper),
      downward(numerator_upper / period_lower),
      downward(numerator_upper / period_upper),
  };
  const std::array<double, 4> upper_candidates{
      upward(numerator_lower / period_lower),
      upward(numerator_lower / period_upper),
      upward(numerator_upper / period_lower),
      upward(numerator_upper / period_upper),
  };
  const double quotient_lower =
      *std::min_element(lower_candidates.begin(), lower_candidates.end());
  const double quotient_upper =
      *std::max_element(upper_candidates.begin(), upper_candidates.end());
  if (!std::isfinite(quotient_lower) || !std::isfinite(quotient_upper)) {
    return true;
  }
  return std::ceil(quotient_lower) <= std::floor(quotient_upper);
}

bool spans_complete_period(const Interval& value) {
  const auto [period_lower, period_upper] = phase_bounds(2U, 1U);
  static_cast<void>(period_upper);
  return upward(value.upper() - value.lower()) >= period_lower;
}

Interval periodic_range(
    const Interval& value,
    double (*function)(double),
    unsigned maximum_phase_numerator,
    unsigned maximum_phase_denominator,
    unsigned minimum_phase_numerator,
    unsigned minimum_phase_denominator) {
  if (spans_complete_period(value)) {
    return Interval(-1.0, 1.0);
  }
  double lower = std::min(function(value.lower()), function(value.upper()));
  double upper = std::max(function(value.lower()), function(value.upper()));
  if (contains_phase(
          value, maximum_phase_numerator, maximum_phase_denominator)) {
    upper = 1.0;
  }
  if (contains_phase(
          value, minimum_phase_numerator, minimum_phase_denominator)) {
    lower = -1.0;
  }
  return Interval(
      lower == -1.0 ? -1.0 : downward_transcendental(lower),
      upper == 1.0 ? 1.0 : upward_transcendental(upper));
}

}  // namespace

Interval interval_sin(const Interval& value) {
  return periodic_range(value, std::sin, 1U, 2U, 3U, 2U);
}

Interval interval_cos(const Interval& value) {
  return periodic_range(value, std::cos, 0U, 1U, 1U, 1U);
}

IntervalVector subtract(const IntervalVector& left,
                        const IntervalVector& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

IntervalVector add(const IntervalVector& left, const IntervalVector& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

IntervalVector scale(const Interval& factor, const IntervalVector& value) {
  return {factor * value[0], factor * value[1], factor * value[2]};
}

Interval dot(const IntervalVector& left, const IntervalVector& right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

Interval norm(const IntervalVector& value) {
  const Interval squared = interval_square(value[0]) + interval_square(value[1]) +
                           interval_square(value[2]);
  return interval_sqrt(Interval(std::max(0.0, squared.lower()),
                                squared.upper()));
}

IntervalVector divide(const IntervalVector& value,
                      const Interval& denominator) {
  return {value[0] / denominator, value[1] / denominator,
          value[2] / denominator};
}

IntervalVector hull(const IntervalVector& left,
                    const IntervalVector& right) {
  return {left[0].hull(right[0]), left[1].hull(right[1]),
          left[2].hull(right[2])};
}

IntervalVector fixed_pairwise_sum(const std::vector<IntervalVector>& values) {
  if (values.empty()) {
    return {Interval::point(0.0), Interval::point(0.0), Interval::point(0.0)};
  }
  std::vector<IntervalVector> level = values;
  while (level.size() > 1) {
    std::vector<IntervalVector> next;
    next.reserve((level.size() + 1U) / 2U);
    for (std::size_t index = 0; index < level.size(); index += 2U) {
      if (index + 1U < level.size()) {
        next.push_back(add(level[index], level[index + 1U]));
      } else {
        next.push_back(level[index]);
      }
    }
    level = std::move(next);
  }
  return level.front();
}

}  // namespace architrino::eom

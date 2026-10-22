#pragma once

#include <algorithm>
#include <array>
#include <bit>
#include <cmath>
#include <cstdint>
#include <limits>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

namespace architrino::eom {

namespace interval_detail {

// Outward one-ulp rounding steps. Each returns exactly what
// std::nextafter(value, -inf) or std::nextafter(value, +inf) returns,
// except that downward(-inf) and upward(+inf) return the infinity itself.
// Finite values step the binary64 bit pattern: away from zero adds one to the
// magnitude bits, toward zero subtracts one, and either signed zero steps to
// the signed smallest subnormal. Non-finite values keep the libm call, so
// infinities and NaN payloads behave as before.
[[nodiscard]] inline double downward(double value) noexcept {
  if (!std::isfinite(value)) [[unlikely]] {
    if (std::isinf(value) && value < 0.0) {
      return value;
    }
    return std::nextafter(value, -std::numeric_limits<double>::infinity());
  }
  if (value == 0.0) {
    return -std::numeric_limits<double>::denorm_min();
  }
  const auto bits = std::bit_cast<std::uint64_t>(value);
  return std::bit_cast<double>(value > 0.0 ? bits - 1U : bits + 1U);
}

[[nodiscard]] inline double upward(double value) noexcept {
  if (!std::isfinite(value)) [[unlikely]] {
    if (std::isinf(value) && value > 0.0) {
      return value;
    }
    return std::nextafter(value, std::numeric_limits<double>::infinity());
  }
  if (value == 0.0) {
    return std::numeric_limits<double>::denorm_min();
  }
  const auto bits = std::bit_cast<std::uint64_t>(value);
  return std::bit_cast<double>(value > 0.0 ? bits + 1U : bits - 1U);
}

// Out of line so the exception text is built only on the failing path.
[[noreturn]] void throw_nonfinite(const char* label);
[[noreturn]] void throw_inverted_bounds();

inline void require_finite(double value, const char* label) {
  if (!std::isfinite(value)) [[unlikely]] {
    throw_nonfinite(label);
  }
}

}  // namespace interval_detail

class Interval {
 public:
  Interval(double lower, double upper);

  static Interval point(double value);
  static Interval decimal_token(const std::string& token);

  [[nodiscard]] double lower() const noexcept { return lower_; }
  [[nodiscard]] double upper() const noexcept { return upper_; }
  [[nodiscard]] double width() const noexcept;
  [[nodiscard]] double midpoint() const noexcept;
  [[nodiscard]] bool contains_zero() const noexcept;
  [[nodiscard]] bool excludes_zero() const noexcept;
  [[nodiscard]] int strict_sign() const noexcept;
  [[nodiscard]] bool is_exact_zero() const noexcept;
  [[nodiscard]] bool subset_of(const Interval& other) const noexcept;
  [[nodiscard]] bool interior_subset_of(const Interval& other) const noexcept;

  [[nodiscard]] Interval inflate(double radius) const;
  [[nodiscard]] Interval hull(const Interval& other) const;
  [[nodiscard]] std::optional<Interval> intersection(
      const Interval& other) const;

 private:
  double lower_;
  double upper_;
};

// The constructor and the hot arithmetic operators are defined inline below.
// None contains a product feeding a sum within one expression, so
// floating-point contraction cannot change their results in any translation
// unit that includes this header.
inline Interval::Interval(double lower, double upper)
    : lower_(lower), upper_(upper) {
  interval_detail::require_finite(lower, "interval lower bound");
  interval_detail::require_finite(upper, "interval upper bound");
  if (lower > upper) [[unlikely]] {
    interval_detail::throw_inverted_bounds();
  }
}

inline Interval Interval::point(double value) {
  interval_detail::require_finite(value, "interval point");
  return Interval(value, value);
}

[[nodiscard]] inline Interval operator+(
    const Interval& left, const Interval& right) {
  return Interval(interval_detail::downward(left.lower() + right.lower()),
                  interval_detail::upward(left.upper() + right.upper()));
}

[[nodiscard]] inline Interval operator-(
    const Interval& left, const Interval& right) {
  return Interval(interval_detail::downward(left.lower() - right.upper()),
                  interval_detail::upward(left.upper() - right.lower()));
}

[[nodiscard]] inline Interval operator*(
    const Interval& left, const Interval& right) {
  using interval_detail::downward;
  using interval_detail::upward;
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

[[nodiscard]] inline Interval operator/(
    const Interval& left, const Interval& right) {
  if (right.contains_zero()) {
    throw std::domain_error("interval division denominator contains zero");
  }
  if (left.is_exact_zero()) return Interval::point(0.0);
  // Divide endpoints directly: a subnormal denominator can have an infinite
  // reciprocal even when every quotient is finite (for example, tiny/tiny).
  // With zero excluded from the denominator, extrema occur at the corners.
  const std::array<double, 4> quotients = {
      left.lower() / right.lower(), left.lower() / right.upper(),
      left.upper() / right.lower(), left.upper() / right.upper(),
  };
  return Interval(
      interval_detail::downward(
          *std::min_element(quotients.begin(), quotients.end())),
      interval_detail::upward(
          *std::max_element(quotients.begin(), quotients.end())));
}

[[nodiscard]] inline Interval interval_square(const Interval& value) {
  if (value.contains_zero()) {
    const double maximum =
        std::max(std::abs(value.lower()), std::abs(value.upper()));
    return Interval(0.0, interval_detail::upward(maximum * maximum));
  }
  const double first = value.lower() * value.lower();
  const double second = value.upper() * value.upper();
  return Interval(interval_detail::downward(std::min(first, second)),
                  interval_detail::upward(std::max(first, second)));
}


[[nodiscard]] Interval interval_sqrt(const Interval& value);
[[nodiscard]] Interval interval_exp(const Interval& value);
[[nodiscard]] Interval interval_erf(const Interval& value);
[[nodiscard]] Interval interval_absolute(const Interval& value);
[[nodiscard]] Interval interval_sin(const Interval& value);
[[nodiscard]] Interval interval_cos(const Interval& value);

using IntervalVector = std::array<Interval, 3>;

[[nodiscard]] IntervalVector subtract(
    const IntervalVector& left,
    const IntervalVector& right);
[[nodiscard]] IntervalVector add(
    const IntervalVector& left,
    const IntervalVector& right);
[[nodiscard]] IntervalVector scale(
    const Interval& factor,
    const IntervalVector& value);
[[nodiscard]] Interval dot(
    const IntervalVector& left,
    const IntervalVector& right);
[[nodiscard]] Interval norm(const IntervalVector& value);
[[nodiscard]] IntervalVector divide(
    const IntervalVector& value,
    const Interval& denominator);
[[nodiscard]] IntervalVector hull(
    const IntervalVector& left,
    const IntervalVector& right);
[[nodiscard]] IntervalVector fixed_pairwise_sum(
    const std::vector<IntervalVector>& values);

}  // namespace architrino::eom

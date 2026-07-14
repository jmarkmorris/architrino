#pragma once

#include <array>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

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

[[nodiscard]] Interval operator+(const Interval& left, const Interval& right);
[[nodiscard]] Interval operator-(const Interval& left, const Interval& right);
[[nodiscard]] Interval operator*(const Interval& left, const Interval& right);
[[nodiscard]] Interval operator/(const Interval& left, const Interval& right);
[[nodiscard]] Interval interval_square(const Interval& value);
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

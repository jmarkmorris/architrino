#include "architrino/eom/MultiprecisionAcceleration.hpp"

#include <mpfr.h>

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <cstddef>
#include <functional>
#include <limits>
#include <optional>
#include <stdexcept>
#include <string>
#include <vector>

namespace architrino::eom {
namespace {

std::string double_token(double value) {
  std::array<char, 64> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::general, std::numeric_limits<double>::max_digits10);
  if (result.ec != std::errc{}) {
    throw std::runtime_error("failed to serialize MPFR quadrature boundary");
  }
  return std::string(buffer.data(), result.ptr);
}

class MpNumber {
 public:
  explicit MpNumber(mpfr_prec_t bits) : bits_(bits) { mpfr_init2(value_, bits); }
  MpNumber(const MpNumber& other) : bits_(other.bits_) {
    mpfr_init2(value_, bits_);
    mpfr_set(value_, other.value_, MPFR_RNDN);
  }
  MpNumber(MpNumber&& other) noexcept : bits_(other.bits_) {
    mpfr_init2(value_, bits_);
    mpfr_swap(value_, other.value_);
  }
  MpNumber& operator=(const MpNumber& other) {
    if (this != &other) {
      if (bits_ != other.bits_) {
        mpfr_set_prec(value_, other.bits_);
        bits_ = other.bits_;
      }
      mpfr_set(value_, other.value_, MPFR_RNDN);
    }
    return *this;
  }
  MpNumber& operator=(MpNumber&& other) noexcept {
    if (this != &other) {
      mpfr_swap(value_, other.value_);
      std::swap(bits_, other.bits_);
    }
    return *this;
  }
  ~MpNumber() { mpfr_clear(value_); }

  static MpNumber decimal(
      const std::string& token, mpfr_prec_t bits, mpfr_rnd_t rounding) {
    MpNumber result(bits);
    if (mpfr_set_str(result.value_, token.c_str(), 10, rounding) != 0) {
      throw std::invalid_argument("invalid MPFR decimal token: " + token);
    }
    return result;
  }
  static MpNumber integer(unsigned long value, mpfr_prec_t bits) {
    MpNumber result(bits);
    mpfr_set_ui(result.value_, value, MPFR_RNDN);
    return result;
  }
  [[nodiscard]] mpfr_prec_t bits() const noexcept { return bits_; }
  [[nodiscard]] mpfr_ptr raw() noexcept { return value_; }
  [[nodiscard]] mpfr_srcptr raw() const noexcept { return value_; }
  [[nodiscard]] int compare(const MpNumber& other) const {
    return mpfr_cmp(value_, other.value_);
  }
  [[nodiscard]] double as_double(mpfr_rnd_t rounding) const {
    return mpfr_get_d(value_, rounding);
  }

 private:
  mpfr_t value_;
  mpfr_prec_t bits_;
};

MpNumber add_number(
    const MpNumber& left, const MpNumber& right, mpfr_rnd_t rounding) {
  MpNumber result(left.bits());
  mpfr_add(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpNumber subtract_number(
    const MpNumber& left, const MpNumber& right, mpfr_rnd_t rounding) {
  MpNumber result(left.bits());
  mpfr_sub(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpNumber multiply_number(
    const MpNumber& left, const MpNumber& right, mpfr_rnd_t rounding) {
  MpNumber result(left.bits());
  mpfr_mul(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

MpNumber divide_number(
    const MpNumber& left, const MpNumber& right, mpfr_rnd_t rounding) {
  MpNumber result(left.bits());
  mpfr_div(result.raw(), left.raw(), right.raw(), rounding);
  return result;
}

class MpInterval {
 public:
  MpInterval(MpNumber lower, MpNumber upper)
      : lower_(std::move(lower)), upper_(std::move(upper)) {
    if (lower_.compare(upper_) > 0) {
      throw std::invalid_argument("MPFR interval lower exceeds upper");
    }
  }

  static MpInterval decimal(const std::string& token, mpfr_prec_t bits) {
    return MpInterval(
        MpNumber::decimal(token, bits, MPFR_RNDD),
        MpNumber::decimal(token, bits, MPFR_RNDU));
  }
  static MpInterval integer(unsigned long value, mpfr_prec_t bits) {
    return MpInterval(
        MpNumber::integer(value, bits), MpNumber::integer(value, bits));
  }
  [[nodiscard]] const MpNumber& lower() const noexcept { return lower_; }
  [[nodiscard]] const MpNumber& upper() const noexcept { return upper_; }
  [[nodiscard]] mpfr_prec_t bits() const noexcept { return lower_.bits(); }
  [[nodiscard]] bool contains_zero() const {
    const MpNumber zero = MpNumber::integer(0, bits());
    return lower_.compare(zero) <= 0 && upper_.compare(zero) >= 0;
  }
  [[nodiscard]] MpNumber width() const {
    return subtract_number(upper_, lower_, MPFR_RNDU);
  }
  [[nodiscard]] Interval projection() const {
    const double lower = lower_.as_double(MPFR_RNDD);
    const double upper = upper_.as_double(MPFR_RNDU);
    if (!std::isfinite(lower) || !std::isfinite(upper)) {
      throw std::overflow_error("MPFR acceleration projection is nonfinite");
    }
    return Interval(lower, upper);
  }

 private:
  MpNumber lower_;
  MpNumber upper_;
};

MpInterval operator+(const MpInterval& left, const MpInterval& right) {
  return MpInterval(
      add_number(left.lower(), right.lower(), MPFR_RNDD),
      add_number(left.upper(), right.upper(), MPFR_RNDU));
}

MpInterval operator-(const MpInterval& left, const MpInterval& right) {
  return MpInterval(
      subtract_number(left.lower(), right.upper(), MPFR_RNDD),
      subtract_number(left.upper(), right.lower(), MPFR_RNDU));
}

MpInterval operator*(const MpInterval& left, const MpInterval& right) {
  std::array<MpNumber, 4> lowers{
      multiply_number(left.lower(), right.lower(), MPFR_RNDD),
      multiply_number(left.lower(), right.upper(), MPFR_RNDD),
      multiply_number(left.upper(), right.lower(), MPFR_RNDD),
      multiply_number(left.upper(), right.upper(), MPFR_RNDD)};
  std::array<MpNumber, 4> uppers{
      multiply_number(left.lower(), right.lower(), MPFR_RNDU),
      multiply_number(left.lower(), right.upper(), MPFR_RNDU),
      multiply_number(left.upper(), right.lower(), MPFR_RNDU),
      multiply_number(left.upper(), right.upper(), MPFR_RNDU)};
  const auto lower = std::min_element(
      lowers.begin(), lowers.end(),
      [](const auto& a, const auto& b) { return a.compare(b) < 0; });
  const auto upper = std::max_element(
      uppers.begin(), uppers.end(),
      [](const auto& a, const auto& b) { return a.compare(b) < 0; });
  return MpInterval(*lower, *upper);
}

MpInterval operator/(const MpInterval& left, const MpInterval& right) {
  if (right.contains_zero()) {
    throw std::domain_error("MPFR interval denominator contains zero");
  }
  const MpNumber one = MpNumber::integer(1, left.bits());
  const MpInterval reciprocal(
      divide_number(one, right.upper(), MPFR_RNDD),
      divide_number(one, right.lower(), MPFR_RNDU));
  return left * reciprocal;
}

MpInterval square(const MpInterval& value) {
  if (value.contains_zero()) {
    const MpNumber low = MpNumber::integer(0, value.bits());
    const MpNumber first =
        multiply_number(value.lower(), value.lower(), MPFR_RNDU);
    const MpNumber second =
        multiply_number(value.upper(), value.upper(), MPFR_RNDU);
    return MpInterval(low, first.compare(second) > 0 ? first : second);
  }
  const MpNumber lower_first =
      multiply_number(value.lower(), value.lower(), MPFR_RNDD);
  const MpNumber lower_second =
      multiply_number(value.upper(), value.upper(), MPFR_RNDD);
  const MpNumber upper_first =
      multiply_number(value.lower(), value.lower(), MPFR_RNDU);
  const MpNumber upper_second =
      multiply_number(value.upper(), value.upper(), MPFR_RNDU);
  return MpInterval(
      lower_first.compare(lower_second) < 0 ? lower_first : lower_second,
      upper_first.compare(upper_second) > 0 ? upper_first : upper_second);
}

MpInterval square_root(const MpInterval& value) {
  const MpNumber zero = MpNumber::integer(0, value.bits());
  if (value.lower().compare(zero) < 0) {
    throw std::domain_error("MPFR square root requires nonnegative interval");
  }
  MpNumber lower(value.bits());
  MpNumber upper(value.bits());
  mpfr_sqrt(lower.raw(), value.lower().raw(), MPFR_RNDD);
  mpfr_sqrt(upper.raw(), value.upper().raw(), MPFR_RNDU);
  return MpInterval(std::move(lower), std::move(upper));
}

MpInterval absolute(const MpInterval& value) {
  const MpNumber zero = MpNumber::integer(0, value.bits());
  if (value.lower().compare(zero) >= 0) {
    return value;
  }
  if (value.upper().compare(zero) <= 0) {
    MpNumber lower(value.bits());
    MpNumber upper(value.bits());
    mpfr_neg(lower.raw(), value.upper().raw(), MPFR_RNDD);
    mpfr_neg(upper.raw(), value.lower().raw(), MPFR_RNDU);
    return MpInterval(std::move(lower), std::move(upper));
  }
  MpNumber neg_lower(value.bits());
  mpfr_neg(neg_lower.raw(), value.lower().raw(), MPFR_RNDU);
  const MpNumber maximum =
      neg_lower.compare(value.upper()) > 0 ? neg_lower : value.upper();
  return MpInterval(zero, maximum);
}

MpInterval exponential(const MpInterval& value) {
  MpNumber lower(value.bits());
  MpNumber upper(value.bits());
  mpfr_exp(lower.raw(), value.lower().raw(), MPFR_RNDD);
  mpfr_exp(upper.raw(), value.upper().raw(), MPFR_RNDU);
  return MpInterval(std::move(lower), std::move(upper));
}

MpInterval hull_interval(const MpInterval& left, const MpInterval& right) {
  return MpInterval(
      left.lower().compare(right.lower()) < 0 ? left.lower() : right.lower(),
      left.upper().compare(right.upper()) > 0 ? left.upper() : right.upper());
}

using MpVector = std::array<MpInterval, 3>;

MpVector add_vector(const MpVector& left, const MpVector& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

MpVector subtract_vector(const MpVector& left, const MpVector& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

MpVector scale_vector(const MpInterval& factor, const MpVector& value) {
  return {factor * value[0], factor * value[1], factor * value[2]};
}

MpInterval dot_vector(const MpVector& left, const MpVector& right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

MpInterval norm_vector(const MpVector& value) {
  return square_root(square(value[0]) + square(value[1]) + square(value[2]));
}

MpVector divide_vector(const MpVector& value, const MpInterval& denominator) {
  return {value[0] / denominator, value[1] / denominator,
          value[2] / denominator};
}

MpInterval polynomial(
    const std::array<std::string, 4>& coefficients,
    const std::string& t_start,
    const MpInterval& time) {
  const mpfr_prec_t bits = time.bits();
  const MpInterval tau = time - MpInterval::decimal(t_start, bits);
  MpInterval value = MpInterval::decimal(coefficients[3], bits);
  value = value * tau + MpInterval::decimal(coefficients[2], bits);
  value = value * tau + MpInterval::decimal(coefficients[1], bits);
  value = value * tau + MpInterval::decimal(coefficients[0], bits);
  return value;
}

MpInterval derivative(
    const std::array<std::string, 4>& coefficients,
    const std::string& t_start,
    const MpInterval& time) {
  const mpfr_prec_t bits = time.bits();
  const MpInterval tau = time - MpInterval::decimal(t_start, bits);
  const MpInterval two = MpInterval::integer(2, bits);
  const MpInterval three = MpInterval::integer(3, bits);
  return MpInterval::decimal(coefficients[1], bits) +
      two * MpInterval::decimal(coefficients[2], bits) * tau +
      three * MpInterval::decimal(coefficients[3], bits) * square(tau);
}

MpInterval inflate_interval(
    const MpInterval& value, const std::string& radius_token) {
  const MpInterval radius = MpInterval::decimal(radius_token, value.bits());
  return value + MpInterval(
      subtract_number(
          MpNumber::integer(0, value.bits()), radius.upper(), MPFR_RNDD),
      radius.upper());
}

std::pair<MpVector, MpVector> history_state(
    const RetainedHistory& history,
    const MpInterval& time,
    double time_lower,
    double time_upper) {
  std::optional<MpVector> position;
  std::optional<MpVector> velocity;
  for (const auto& segment : history.segments()) {
    const double lower = std::max(time_lower, segment.t_start());
    const double upper = std::min(time_upper, segment.t_end());
    if (lower > upper ||
        (lower == upper && time_lower != time_upper)) {
      continue;
    }
    const MpInterval local = time_lower == time_upper
        ? time
        : MpInterval(
              MpNumber::decimal(
                  double_token(lower), time.bits(), MPFR_RNDD),
              MpNumber::decimal(
                  double_token(upper), time.bits(), MPFR_RNDU));
    MpVector local_position{
        inflate_interval(
            polynomial(segment.coefficient_tokens()[0],
                       segment.t_start_token(), local),
            segment.position_error_token()),
        inflate_interval(
            polynomial(segment.coefficient_tokens()[1],
                       segment.t_start_token(), local),
            segment.position_error_token()),
        inflate_interval(
            polynomial(segment.coefficient_tokens()[2],
                       segment.t_start_token(), local),
            segment.position_error_token())};
    MpVector local_velocity{
        inflate_interval(
            derivative(segment.coefficient_tokens()[0],
                       segment.t_start_token(), local),
            segment.velocity_error_token()),
        inflate_interval(
            derivative(segment.coefficient_tokens()[1],
                       segment.t_start_token(), local),
            segment.velocity_error_token()),
        inflate_interval(
            derivative(segment.coefficient_tokens()[2],
                       segment.t_start_token(), local),
            segment.velocity_error_token())};
    if (!position.has_value()) {
      position = std::move(local_position);
      velocity = std::move(local_velocity);
    } else {
      for (std::size_t axis = 0; axis < 3; ++axis) {
        (*position)[axis] = hull_interval((*position)[axis], local_position[axis]);
        (*velocity)[axis] = hull_interval((*velocity)[axis], local_velocity[axis]);
      }
    }
  }
  if (!position.has_value() || !velocity.has_value()) {
    throw std::out_of_range("MPFR acceleration lies outside retained history");
  }
  return {*position, *velocity};
}

MpVector integrand(
    const NativePairAccelerationRequest& request,
    const MpInterval& emission,
    double emission_lower,
    double emission_upper,
    mpfr_prec_t bits) {
  const auto& certificate = *request.root_certificate;
  const MpInterval reception =
      MpInterval::decimal(certificate.reception_time, bits);
  const double reception_value =
      Interval::decimal_token(certificate.reception_time).midpoint();
  const auto receiver_state = history_state(
      *request.receiver_history, reception, reception_value, reception_value);
  const auto source_state = history_state(
      *request.source_history, emission, emission_lower, emission_upper);
  const MpVector displacement =
      subtract_vector(receiver_state.first, source_state.first);
  const MpInterval separation = norm_vector(displacement);
  const MpInterval core = MpInterval::decimal(request.core_scale, bits);
  const MpInterval radial_square = square(separation) + square(core);
  const MpVector kernel =
      divide_vector(displacement, radial_square * square_root(radial_square));
  const MpInterval field_speed =
      MpInterval::decimal(certificate.field_speed, bits);
  MpInterval receiver_strength = MpInterval::integer(0, bits);
  if (separation.contains_zero()) {
    receiver_strength = MpInterval(
        MpNumber::integer(0, bits),
        add_number(
            field_speed.upper(), norm_vector(receiver_state.second).upper(),
            MPFR_RNDU));
  } else {
    receiver_strength = absolute(
        field_speed -
        dot_vector(divide_vector(displacement, separation),
                   receiver_state.second));
  }
  const MpInterval residual =
      separation - field_speed * (reception - emission);
  const MpInterval eta = MpInterval::decimal(request.causal_width, bits);
  const MpInterval exponent =
      MpInterval::integer(0, bits) -
      square(residual) /
          (MpInterval::integer(2, bits) * square(eta));
  const MpInterval pi = MpInterval(
      MpNumber::decimal(
          "3.14159265358979323846264338327950288419716939937510",
          bits, MPFR_RNDD),
      MpNumber::decimal(
          "3.14159265358979323846264338327950288419716939937511",
          bits, MPFR_RNDU));
  const MpInterval mollifier =
      exponential(exponent) /
      (square_root(MpInterval::integer(2, bits) * pi) * eta);
  const MpInterval scale =
      MpInterval::decimal(request.coupling, bits) *
      MpInterval::decimal(request.receiver_charge, bits) *
      MpInterval::decimal(request.source_charge, bits) * receiver_strength *
      mollifier;
  return scale_vector(scale, kernel);
}

bool width_within(const MpInterval& value, const MpNumber& budget) {
  return value.width().compare(budget) <= 0;
}

}  // namespace

MpfrAccelerationAttempt certify_mpfr_finite_width_acceleration(
    const NativePairAccelerationRequest& request,
    unsigned precision_bits) {
  const mpfr_prec_t bits = static_cast<mpfr_prec_t>(precision_bits);
  MpfrAccelerationAttempt result{
      .certified = false,
      .failure_code = "numeric_acceleration_uncertified",
      .acceleration = {Interval::point(0.0), Interval::point(0.0),
                       Interval::point(0.0)},
      .visited_cells = 0,
      .precision_bits = precision_bits,
  };
  try {
    const auto& certificate = *request.root_certificate;
    if (certificate.memory_boundary_contact) {
      result.failure_code = "insufficient_history_depth";
      return result;
    }
    const double search_lower =
        Interval::decimal_token(certificate.searched_lower).midpoint();
    const double reception =
        Interval::decimal_token(certificate.reception_time).midpoint();
    const double total_span = reception - search_lower;
    if (!(total_span > 0.0)) {
      result.failure_code = "finite_width_interval_not_positive";
      return result;
    }
    const MpInterval tolerance =
        MpInterval::decimal(request.quadrature_tolerance, bits);
    std::function<MpVector(double, double, std::size_t)> integrate;
    integrate = [&](double lower, double upper, std::size_t depth) {
      ++result.visited_cells;
      if (result.visited_cells > request.quadrature_max_cells) {
        throw std::runtime_error("finite-width quadrature cell limit exhausted");
      }
      const std::string lower_token = double_token(lower);
      const std::string upper_token = double_token(upper);
      const MpInterval cell(
          MpNumber::decimal(lower_token, bits, MPFR_RNDD),
          MpNumber::decimal(upper_token, bits, MPFR_RNDU));
      const MpInterval width =
          MpInterval::decimal(double_token(upper - lower), bits);
      const MpVector integral = scale_vector(
          width, integrand(request, cell, lower, upper, bits));
      MpNumber budget(bits);
      mpfr_mul_d(
          budget.raw(), tolerance.lower().raw(),
          (upper - lower) / total_span, MPFR_RNDD);
      if (std::all_of(
              integral.begin(), integral.end(),
              [&](const MpInterval& component) {
                return width_within(component, budget);
              })) {
        return integral;
      }
      if (depth >= request.quadrature_max_depth) {
        throw std::runtime_error("finite-width quadrature depth exhausted");
      }
      const double midpoint = lower + (upper - lower) * 0.5;
      if (!(midpoint > lower && midpoint < upper)) {
        throw std::runtime_error(
            "finite-width quadrature time resolution exhausted");
      }
      return add_vector(
          integrate(lower, midpoint, depth + 1U),
          integrate(midpoint, upper, depth + 1U));
    };

    std::vector<MpVector> totals;
    for (const auto& segment : request.source_history->segments()) {
      const double lower = std::max(search_lower, segment.t_start());
      const double upper = std::min(reception, segment.t_end());
      if (lower < upper) {
        totals.push_back(integrate(lower, upper, 0));
      }
    }
    if (totals.empty()) {
      result.failure_code = "finite_width_no_covered_cells";
      return result;
    }
    while (totals.size() > 1U) {
      std::vector<MpVector> next;
      next.reserve((totals.size() + 1U) / 2U);
      for (std::size_t index = 0; index < totals.size(); index += 2U) {
        next.push_back(index + 1U < totals.size()
            ? add_vector(totals[index], totals[index + 1U])
            : totals[index]);
      }
      totals = std::move(next);
    }
    const MpVector& total = totals.front();
    if (!std::all_of(
            total.begin(), total.end(), [&](const MpInterval& component) {
              return width_within(component, tolerance.upper());
            })) {
      result.failure_code =
          "finite-width quadrature acceleration enclosure exceeds the declared tolerance";
      return result;
    }
    result.acceleration = {
        total[0].projection(), total[1].projection(), total[2].projection()};
    result.certified = true;
    result.failure_code.clear();
    return result;
  } catch (const std::exception& error) {
    result.failure_code = error.what();
    return result;
  }
}

}  // namespace architrino::eom

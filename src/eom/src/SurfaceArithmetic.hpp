#pragma once

#include "architrino/eom/EquationPlan.hpp"
#include <gmp.h>
#include <string>

namespace architrino::eom::detail {

// Exact decimal admission, independent of binary64 evaluation enclosures.
class SurfaceRational {
 public:
  explicit SurfaceRational(const std::string& token = "0") {
    const auto normalized = equation_decimal_identity(token);
    const auto marker = normalized.find('e');
    if (normalized == "0") { mpq_init(value_); return; }
    const long long exponent = std::stoll(normalized.substr(marker + 1));
    if (exponent < -1000 || exponent > 1000) {
      throw EquationAdmissionError("invalid_geometry", "geometry exponent exceeds exact admission budget");
    }
    mpq_init(value_);
    const auto digits = normalized.substr(0, marker);
    mpz_set_str(mpq_numref(value_), digits.c_str(), 10);
    mpz_t power;
    mpz_init(power);
    mpz_ui_pow_ui(power, 10, static_cast<unsigned long>(exponent < 0 ? -exponent : exponent));
    if (exponent < 0) mpz_set(mpq_denref(value_), power);
    else mpz_mul(mpq_numref(value_), mpq_numref(value_), power);
    mpz_clear(power);
    mpq_canonicalize(value_);
  }
  SurfaceRational(const SurfaceRational& other) { mpq_init(value_); mpq_set(value_, other.value_); }
  SurfaceRational& operator=(const SurfaceRational& other) { mpq_set(value_, other.value_); return *this; }
  ~SurfaceRational() { mpq_clear(value_); }
  friend SurfaceRational operator+(const SurfaceRational& a, const SurfaceRational& b) {
    SurfaceRational r; mpq_add(r.value_, a.value_, b.value_); return r;
  }
  friend SurfaceRational operator-(const SurfaceRational& a, const SurfaceRational& b) {
    SurfaceRational r; mpq_sub(r.value_, a.value_, b.value_); return r;
  }
  friend SurfaceRational operator*(const SurfaceRational& a, const SurfaceRational& b) {
    SurfaceRational r; mpq_mul(r.value_, a.value_, b.value_); return r;
  }
  friend SurfaceRational operator/(const SurfaceRational& a, const SurfaceRational& b) {
    if (mpq_sgn(b.value_) == 0) throw EquationAdmissionError("invalid_geometry", "zero rational denominator");
    SurfaceRational r; mpq_div(r.value_, a.value_, b.value_); return r;
  }
  friend bool operator==(const SurfaceRational& a, const SurfaceRational& b) { return mpq_equal(a.value_, b.value_) != 0; }
  friend bool operator<(const SurfaceRational& a, const SurfaceRational& b) { return mpq_cmp(a.value_, b.value_) < 0; }
 private:
  mpq_t value_;
};

inline SurfaceRational square(const SurfaceRational& value) { return value * value; }

}  // namespace architrino::eom::detail

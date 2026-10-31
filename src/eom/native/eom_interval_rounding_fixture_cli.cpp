// Manual fixture: the inline outward-rounding steps in Interval.hpp must
// return bit-for-bit what the previous libm-based steps returned. The
// reference functions below are the previous Interval.cpp definitions,
// copied verbatim; they call std::nextafter. No recurring test enrollment.
#include "architrino/eom/Interval.hpp"

#include <bit>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <limits>
#include <string>

namespace {

namespace eom = architrino::eom;

double reference_downward(double value) {
  if (std::isinf(value) && value < 0.0) {
    return value;
  }
  return std::nextafter(value, -std::numeric_limits<double>::infinity());
}

double reference_upward(double value) {
  if (std::isinf(value) && value > 0.0) {
    return value;
  }
  return std::nextafter(value, std::numeric_limits<double>::infinity());
}

#ifdef EOM_ROUNDING_FIXTURE_SELF_TEST
// Known-defect candidate used once to show the fixture detects a wrong step:
// plain bit stepping with no signed-zero case (+0 steps to a NaN pattern and
// -0 steps the wrong way).
double candidate_downward(double value) {
  if (!std::isfinite(value)) return eom::interval_detail::downward(value);
  const auto bits = std::bit_cast<std::uint64_t>(value);
  return std::bit_cast<double>(std::signbit(value) ? bits + 1U : bits - 1U);
}
double candidate_upward(double value) {
  if (!std::isfinite(value)) return eom::interval_detail::upward(value);
  const auto bits = std::bit_cast<std::uint64_t>(value);
  return std::bit_cast<double>(std::signbit(value) ? bits - 1U : bits + 1U);
}
#else
double candidate_downward(double value) {
  return eom::interval_detail::downward(value);
}
double candidate_upward(double value) {
  return eom::interval_detail::upward(value);
}
#endif

struct Tally {
  std::uint64_t compared = 0;
  std::uint64_t mismatches = 0;
};

// NaN results are compared by bit pattern as well, so payload and sign
// propagation must also agree.
void compare_bits(std::uint64_t bits, Tally& tally) {
  const double value = std::bit_cast<double>(bits);
  const auto check = [&](double expected, double actual, const char* name) {
    ++tally.compared;
    const auto expected_bits = std::bit_cast<std::uint64_t>(expected);
    const auto actual_bits = std::bit_cast<std::uint64_t>(actual);
    if (expected_bits != actual_bits) {
      if (++tally.mismatches <= 20U) {
        std::printf(
            "MISMATCH %s input=0x%016llx expected=0x%016llx actual=0x%016llx\n",
            name, static_cast<unsigned long long>(bits),
            static_cast<unsigned long long>(expected_bits),
            static_cast<unsigned long long>(actual_bits));
      }
    }
  };
  check(reference_downward(value), candidate_downward(value), "downward");
  check(reference_upward(value), candidate_upward(value), "upward");
}

std::uint64_t splitmix64(std::uint64_t& state) {
  std::uint64_t z = (state += 0x9e3779b97f4a7c15ULL);
  z = (z ^ (z >> 30U)) * 0xbf58476d1ce4e5b9ULL;
  z = (z ^ (z >> 27U)) * 0x94d049bb133111ebULL;
  return z ^ (z >> 31U);
}

}  // namespace

int main(int argc, char** argv) {
  const std::uint64_t random_count =
      argc > 1 ? std::strtoull(argv[1], nullptr, 10) : 1000000000ULL;

  // 1. Named edge cases, both signs.
  Tally named;
  const double edge_values[] = {
      0.0,
      std::numeric_limits<double>::denorm_min(),
      2.0 * std::numeric_limits<double>::denorm_min(),
      std::bit_cast<double>(0x000fffffffffffffULL),  // largest subnormal
      std::bit_cast<double>(0x000ffffffffffffeULL),
      std::numeric_limits<double>::min(),            // smallest normal
      std::bit_cast<double>(0x0010000000000001ULL),
      0.5, 1.0, 2.0,
      std::bit_cast<double>(0x3fefffffffffffffULL),  // 1 - ulp/2
      std::bit_cast<double>(0x3ff0000000000001ULL),  // 1 + ulp
      0.1, 0.25, 1e-5, 1e-4, 1e-6, 3.141592653589793,
      std::numeric_limits<double>::max(),
      std::bit_cast<double>(0x7fefffffffffffffULL - 1U),
      std::numeric_limits<double>::infinity(),
  };
  for (const double value : edge_values) {
    compare_bits(std::bit_cast<std::uint64_t>(value), named);
    compare_bits(std::bit_cast<std::uint64_t>(-value), named);
  }
  const std::uint64_t nan_patterns[] = {
      0x7ff8000000000000ULL, 0xfff8000000000000ULL,  // quiet NaN, both signs
      0x7ff0000000000001ULL, 0xfff0000000000001ULL,  // signaling, payload 1
      0x7ff4000000000000ULL, 0x7fffffffffffffffULL,
      0xffffffffffffffffULL, 0x7ff8000000000001ULL,
  };
  for (const auto bits : nan_patterns) {
    compare_bits(bits, named);
  }

  // 2. Structured sweep: every sign, every exponent (subnormal, normal,
  //    infinity/NaN) and every top-8 mantissa pattern, each with low mantissa
  //    bits at both extremes, their neighbours and one random value.
  Tally structured;
  std::uint64_t state = 0x5eed2026102000ULL;
  for (std::uint64_t high = 0; high < (1ULL << 20U); ++high) {
    const std::uint64_t prefix = high << 44U;
    const std::uint64_t low_mask = (1ULL << 44U) - 1U;
    const std::uint64_t lows[] = {
        0U, 1U, 2U, low_mask - 1U, low_mask, splitmix64(state) & low_mask};
    for (const auto low : lows) {
      compare_bits(prefix | low, structured);
    }
  }

  // 3. Uniform random 64-bit patterns (all classes, weighted by bit count).
  Tally random_bits;
  for (std::uint64_t index = 0; index < random_count; ++index) {
    compare_bits(splitmix64(state), random_bits);
  }

  // 4. Random finite values in the ranges the solver uses: products and sums
  //    of numbers with magnitude 1e-12..1e3, including exact-zero sums.
  Tally random_values;
  for (std::uint64_t index = 0; index < random_count / 4U; ++index) {
    const double a = std::ldexp(
        static_cast<double>(splitmix64(state) >> 11U) * 0x1p-53,
        static_cast<int>(splitmix64(state) % 50U) - 40);
    const double b = std::ldexp(
        static_cast<double>(splitmix64(state) >> 11U) * 0x1p-53,
        static_cast<int>(splitmix64(state) % 50U) - 40);
    const double sign = (splitmix64(state) & 1U) ? -1.0 : 1.0;
    compare_bits(std::bit_cast<std::uint64_t>(sign * a * b), random_values);
    compare_bits(std::bit_cast<std::uint64_t>(a - b), random_values);
    compare_bits(std::bit_cast<std::uint64_t>(a - a), random_values);
  }

  const auto report = [](const char* name, const Tally& tally) {
    std::printf("%-18s compared=%llu mismatches=%llu\n", name,
                static_cast<unsigned long long>(tally.compared),
                static_cast<unsigned long long>(tally.mismatches));
  };
  report("named-edges", named);
  report("structured-sweep", structured);
  report("random-bits", random_bits);
  report("random-values", random_values);
  const bool pass = named.mismatches == 0U && structured.mismatches == 0U &&
                    random_bits.mismatches == 0U &&
                    random_values.mismatches == 0U;
  std::printf("%s\n", pass ? "PASS interval rounding equivalence"
                           : "FAIL interval rounding equivalence");
  return pass ? 0 : 1;
}

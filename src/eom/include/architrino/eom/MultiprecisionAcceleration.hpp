#pragma once

#include "architrino/eom/CertifiedAcceleration.hpp"

#include <cstddef>
#include <string>

namespace architrino::eom {

struct MpfrAccelerationAttempt {
  bool certified;
  std::string failure_code;
  IntervalVector acceleration;
  std::size_t visited_cells;
  unsigned precision_bits;
};

[[nodiscard]] MpfrAccelerationAttempt certify_mpfr_finite_width_acceleration(
    const NativePairAccelerationRequest& request,
    unsigned precision_bits);

}  // namespace architrino::eom

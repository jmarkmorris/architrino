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

struct MpfrEventImpulseRequest {
  const RetainedHistory* receiver_history;
  const RetainedHistory* source_history;
  std::string receiver_charge;
  std::string source_charge;
  std::string reception_lower;
  std::string reception_upper;
  std::string search_lower;
  std::string field_speed;
  std::string coupling;
  std::string causal_width;
  std::string core_scale;
  std::string impulse_tolerance;
  std::size_t max_depth;
  std::size_t max_cells;
};

struct MpfrEventImpulseAttempt {
  bool certified;
  std::string failure_code;
  IntervalVector impulse;
  std::size_t visited_cells;
  unsigned precision_bits;
};

[[nodiscard]] MpfrAccelerationAttempt certify_mpfr_finite_width_acceleration(
    const NativePairAccelerationRequest& request,
    unsigned precision_bits);

[[nodiscard]] MpfrEventImpulseAttempt certify_mpfr_event_impulse(
    const MpfrEventImpulseRequest& request,
    unsigned precision_bits);

}  // namespace architrino::eom

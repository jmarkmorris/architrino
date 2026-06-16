#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstdint>
#include <vector>

namespace architrino::solver {

struct PhaseClock {
  double period = 1.0;
  double epoch = 0.0;
  double phaseOffset = 0.0;
};

struct PhaseAtHit {
  int rootId = 0;
  StatusCode statusCode = StatusCode::Ok;
  std::int64_t sourceCycleIndex = 0;
  std::int64_t receiverCycleIndex = 0;
  double emissionTime = 0.0;
  double hitTime = 0.0;
  double sourcePhase = 0.0;
  double receiverPhase = 0.0;
  double phaseDelta = 0.0;
  double phaseSpread = 0.0;
};

struct PhaseAtHitResult {
  std::vector<PhaseAtHit> rows;
  ValidationReport validation;
};

PhaseAtHitResult compute_phase_at_hits(const std::vector<CausalRoot>& roots,
                                       PhaseClock sourceClock,
                                       PhaseClock receiverClock);

}  // namespace architrino::solver

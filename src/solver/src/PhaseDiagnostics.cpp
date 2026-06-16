#include "architrino/solver/PhaseDiagnostics.hpp"

#include <cmath>
#include <limits>

namespace architrino::solver {
namespace {

bool valid_clock(PhaseClock clock) {
  return std::isfinite(clock.period) && clock.period > 0.0 && std::isfinite(clock.epoch) &&
         std::isfinite(clock.phaseOffset);
}

double normalized_phase(double value) {
  const double phase = std::fmod(value, 1.0);
  return phase < 0.0 ? phase + 1.0 : phase;
}

std::int64_t cycle_index(double value) {
  const double floored = std::floor(value);
  if (floored < static_cast<double>(std::numeric_limits<std::int64_t>::min()) ||
      floored > static_cast<double>(std::numeric_limits<std::int64_t>::max())) {
    return 0;
  }
  return static_cast<std::int64_t>(floored);
}

double signed_phase_delta(double sourcePhase, double receiverPhase) {
  double delta = receiverPhase - sourcePhase;
  while (delta > 0.5) {
    delta -= 1.0;
  }
  while (delta < -0.5) {
    delta += 1.0;
  }
  return delta;
}

double raw_cycle_position(double time, PhaseClock clock) {
  return (time - clock.epoch) / clock.period + clock.phaseOffset;
}

}  // namespace

PhaseAtHitResult compute_phase_at_hits(const std::vector<CausalRoot>& roots,
                                       PhaseClock sourceClock,
                                       PhaseClock receiverClock) {
  PhaseAtHitResult result;
  if (!valid_clock(sourceClock) || !valid_clock(receiverClock)) {
    result.validation.add(StatusCode::AppContractError,
                          StatusSeverity::Error,
                          "phase clocks must have finite positive periods and finite offsets",
                          "phase-at-hit",
                          false);
    return result;
  }

  result.rows.reserve(roots.size());
  for (const CausalRoot& root : roots) {
    const double sourceCyclePosition = raw_cycle_position(root.emissionTime, sourceClock);
    const double receiverCyclePosition = raw_cycle_position(root.hitTime, receiverClock);
    const double sourcePhase = normalized_phase(sourceCyclePosition);
    const double receiverPhase = normalized_phase(receiverCyclePosition);
    const double delta = signed_phase_delta(sourcePhase, receiverPhase);
    result.rows.push_back(PhaseAtHit{
        root.rootId,
        root.statusCode,
        cycle_index(sourceCyclePosition),
        cycle_index(receiverCyclePosition),
        root.emissionTime,
        root.hitTime,
        sourcePhase,
        receiverPhase,
        delta,
        std::abs(delta),
    });
  }

  result.validation.add(StatusCode::Ok,
                        StatusSeverity::Ok,
                        "phase-at-hit diagnostics computed",
                        "phase-at-hit");
  return result;
}

}  // namespace architrino::solver

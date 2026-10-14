// Serial validated evolution: a controller that advances a population by
// validated far steps only. Every accepted step publishes, for all paths
// together, segments whose declared radii are proved to contain the true
// continuation, with the producer's evidence and a per-axis ledger. A step
// that cannot be certified publishes nothing. c_f = 1.
//
// Scope. This is its own entry point with its own controller. It calls no
// single-time snapshot, predictor, corrector, step-doubling comparison,
// root-pressure, cost-feedback or growth heuristic of the ordinary
// controller, and the ordinary evolution entry points do not call it; they
// continue to refuse every grouped policy. It uses no matched-pair grouping,
// one thread, and no persistence. The default behaviour of every existing
// entry point is unchanged.
//
// Time. Boundaries are plain decimal tokens. Advance, remaining time,
// comparison and termination are exact decimal operations; no boundary is
// formed in binary64.
//
// Refusals. The controller's response is fixed per producer code:
//   VFS-H0-01                      halt
//   VFS-H1-01, retained past       halt
//   VFS-H1-01, step velocity box   retry with half the step
//   VFS-H2-01, VFS-H4-01, VFS-H5-01, VFS-BUDGET-01   retry with half the step
//   VFS-H3-01                      retry, at most max_lower_sign_retries times
//   VFS-PUB-01                     halt
//   VFS-BUDGET-02                  halt if a declared radius the population
//                                  already carries exceeds the total budget,
//                                  otherwise retry with half the step
//   anything else                  halt
// A retry never goes below minimum_step and never exceeds
// max_attempts_per_step. After a first-attempt acceptance the next step is
// doubled, up to initial_step, unless a recent retry imposed a cooldown. Every refusal leaves the accepted population, its
// evidence and its ledger exactly as they were. The controller never
// substitutes an ordinary step.
//
// Cancellation is observed before the first attempt and after an accepted
// step only, so the returned state is always an accepted boundary.
#pragma once

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/ValidatedFarStep.hpp"

#include <array>
#include <cstddef>
#include <functional>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

inline constexpr const char* kValidatedFarStepEvolutionPolicy =
    "canonical_validated_far_step_evolution/v1";

struct ValidatedEvolutionRequest {
  std::string run_id;
  // Must equal kValidatedFarStepEvolutionPolicy.
  std::string policy;
  std::vector<ValidatedFarStepPath> paths;
  // Evidence issued for `paths`. Null for exact prescribed histories.
  ValidatedFarStepEvidence evidence;
  // Plain decimal tokens. The histories must end at exactly start_time.
  std::string start_time;
  std::string end_time;
  // The controller never attempts a step longer than initial_step or
  // shorter than minimum_step, except the final step to end_time, which may
  // be shorter than minimum_step.
  std::string initial_step;
  std::string minimum_step;
  // Must be exactly 1.
  std::string field_speed = "1";
  std::string coupling;
  // Largest admissible growth of a declared radius in one step.
  ValidatedFarStepBudgets increment_budget{0.0, 0.0};
  // Largest admissible declared radius, if declared. A separate constraint.
  std::optional<ValidatedFarStepBudgets> total_budget = std::nullopt;
  std::size_t max_attempts_per_step = 64;
  std::size_t max_lower_sign_retries = 4;
  std::size_t max_accepted_steps = 1000000;
  // After a step that needed a shorter retry, the controller keeps that
  // step length for this many accepted steps before trying a longer one.
  std::size_t growth_cooldown_steps = 4;
  std::function<bool()> cancellation_requested = {};
  // Invoked after an accepted step is published, with its index and the
  // accepted time token.
  std::function<void(std::size_t, const std::string&)>
      accepted_step_callback = {};
};

// Declared radii per axis: what the step inherited, the certified upper
// bound of what it added, and what the published segment declares.
struct ValidatedAxisLedger {
  std::array<double, 3> inherited{};
  std::array<double, 3> increment{};
  std::array<double, 3> total{};
};

struct ValidatedPathLedger {
  std::string path_id;
  ValidatedAxisLedger position;
  ValidatedAxisLedger velocity;
};

struct ValidatedEvolutionAttempt {
  std::size_t step_index = 0;
  std::size_t attempt_index = 0;
  // accepted | retry_shorter_step | halt
  std::string disposition;
  // The origin the controller acted on, where a code has more than one:
  // the producer's cause for VFS-H1-01, and "inherited_total" or
  // "new_growth" for VFS-BUDGET-02. Empty otherwise.
  std::string cause;
  // The producer's certificate exactly as returned.
  ValidatedFarStepCertificate producer;
  // The same attempt in the existing accepted-step certificate shape.
  NativeAtomicStepCertificate atomic;
  // Accepted attempts only.
  std::vector<ValidatedPathLedger> ledger;
};

struct ValidatedEvolutionCertificate {
  std::string schema;
  std::string policy;
  // The run in the existing certificate shape. Its histories are the
  // accepted boundary; its steps are every attempt, in order.
  NativeCoupledEvolutionCertificate run;
  // The accepted population with charges, and the evidence issued for it.
  std::vector<ValidatedFarStepPath> paths;
  ValidatedFarStepEvidence evidence;
  // Ledger of the last accepted step; empty if none was accepted.
  std::vector<ValidatedPathLedger> ledger;
  std::vector<ValidatedEvolutionAttempt> attempts;
  // When halted on a refusal: the producer's code and cause.
  std::string halt_refusal_code;
  std::string halt_refusal_cause;
};

[[nodiscard]] ValidatedEvolutionCertificate
evolve_validated_far_step_histories(const ValidatedEvolutionRequest& request);

// Exact half of a plain decimal token, as a plain decimal token.
[[nodiscard]] std::string validated_evolution_half(const std::string& token);
// Exact difference a - b of two plain decimal tokens.
[[nodiscard]] std::string validated_evolution_difference(
    const std::string& a, const std::string& b);

}  // namespace architrino::eom

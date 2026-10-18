// The ordinary typed entry point's route to the validated far-step method.
//
// An ordinary request selects the validated method by setting
// integration_method to kValidatedFarStepEvolutionPolicy. The ordinary
// evolution entry point then refuses every ordinary control that has no
// meaning under that method unless it is at its default, naming the control;
// applies the ordinary request admission; translates the request to a
// ValidatedEvolutionRequest; and runs the one maintained driver,
// evolve_validated_far_step_histories, which applies its own admission
// before any early return. Nothing else is substituted: no ordinary step is
// taken under the selection, and no validated step without it. c_f = 1.
//
// The ordinary view of a selected run keeps the ordinary meanings:
//   accepted_step_count, rejected_step_count  cumulative over every
//       invocation since the run's origin, carried by the sealed
//       NativeValidatedContinuation; the request's initial counters must
//       equal the continuation's, zero for a new run;
//   steps[i].step_index  the cumulative attempt ordinal, as the ordinary
//       controller numbers attempts; validated_run keeps the driver's
//       accepted-step ordinal unchanged;
//   accepted_step_callback  called with the cumulative accepted-step count
//       after the step, where the driver reports a zero-based index;
//   status  "completed" or "halted"; a cancellation is "halted" with
//       cancelled_at_accepted_boundary, and the driver's accepted-step limit
//       is diagnostic_accepted_step_limit_reached when it was set by
//       diagnostic_maximum_accepted_steps. With that field zero the driver's
//       own per-invocation ceiling of 1000000 accepted steps remains, and
//       reaching it halts with step_limit_exhausted.
// schema, evidence_status and the remaining halt codes are the driver's.
#pragma once

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/ValidatedEvolution.hpp"
#include "architrino/eom/ValidatedRunRecord.hpp"

#include <cstddef>
#include <cstdint>
#include <memory>
#include <string>

namespace architrino::eom {

// Runs a selected request that passed the ordinary admission through the
// driver, with `memory_estimate_bytes` the ordinary estimate of the
// supplied population. In order, before any early return:
//   1. a finite working-set bound, or EquationAdmissionError
//      validated_resource_bound_unavailable;
//   2. at the start of a run that is not resuming, a conservative origin
//      preflight: the validated producer must certify one discarded step of
//      length min(minimum_step, remaining span), or the request is refused
//      with EquationAdmissionError unsupported_validated_domain naming the
//      producer's code. Certification there is a sufficient positive
//      admission check, not a statement about other step lengths; every
//      step the driver takes is certified separately. A population the
//      driver's admission refuses is left to the driver;
//   3. the memory budget: over it, a zero-length driver run reports a
//      population the driver refuses as that refusal, and an admitted one
//      returns halted with memory_budget_exhausted, no step and no
//      continuation;
//   4. the driver, with its own admission before its early returns.
// validated_run holds the driver's full certificate; validated_continuation
// the boundary to resume from, when one was admitted.
[[nodiscard]] NativeCoupledEvolutionCertificate
evolve_native_validated_histories(
    const NativeCoupledEvolutionRequest& request,
    std::uint64_t memory_estimate_bytes);

// The continuation of a run restored by complete replay of its generating
// record. The result must carry the sealed replay boundary that
// restore_validated_run issues on a complete replay, and every public field
// it reports (status, continuation, replayed rejected-step total, record,
// record identity) must equal that boundary's; the continuation is built
// from the boundary alone. Throws std::invalid_argument otherwise, so no
// refused, partial, edited or recombined result yields a continuation.
[[nodiscard]] std::shared_ptr<const NativeValidatedContinuation>
native_validated_continuation_from_replay(
    const ValidatedRestoreResult& restored);

// The admitted accepted boundary of a selected run: the driver's sealed
// continuation, the run's cumulative rejected-step count, and the run's
// generating record with its status:
//   recorded            the record is complete through this boundary;
//   not_an_origin       the run started from supplied evidence or declared
//                       radii, so it has no record;
//   open_refused: ...   the record unit refused to open at the origin;
//   append_refused: ... the record unit refused a leg; there is no record
//                       from then on.
// Only a recorded run can be persisted. Sealed like the driver's: only the
// bridge constructs one, from a run it executed or a complete replay, so in
// this process it is always the state a run actually reached.
class NativeValidatedContinuation {
 public:
  [[nodiscard]] const std::shared_ptr<const ValidatedEvolutionContinuation>&
  driver() const noexcept {
    return driver_;
  }
  [[nodiscard]] std::size_t accepted_step_count() const noexcept {
    return driver_->state().accepted_step_count;
  }
  [[nodiscard]] std::size_t rejected_step_count() const noexcept {
    return rejected_step_count_;
  }
  // Null unless record_status() is "recorded".
  [[nodiscard]] const std::shared_ptr<const ValidatedRunRecord>& record()
      const noexcept {
    return record_;
  }
  [[nodiscard]] const std::string& record_status() const noexcept {
    return record_status_;
  }

 private:
  friend NativeCoupledEvolutionCertificate evolve_native_validated_histories(
      const NativeCoupledEvolutionRequest& request,
      std::uint64_t memory_estimate_bytes);
  friend std::shared_ptr<const NativeValidatedContinuation>
  native_validated_continuation_from_replay(
      const ValidatedRestoreResult& restored);
  NativeValidatedContinuation(
      std::shared_ptr<const ValidatedEvolutionContinuation> driver,
      std::size_t rejected_step_count,
      std::shared_ptr<const ValidatedRunRecord> record,
      std::string record_status)
      : driver_(std::move(driver)),
        rejected_step_count_(rejected_step_count),
        record_(std::move(record)),
        record_status_(std::move(record_status)) {}
  std::shared_ptr<const ValidatedEvolutionContinuation> driver_;
  std::size_t rejected_step_count_ = 0;
  std::shared_ptr<const ValidatedRunRecord> record_;
  std::string record_status_;
};

// Empty when every ordinary-only control of `request` is at its default,
// every control the validated method needs is present, and the restart
// counters equal the continuation's; otherwise the name of the first
// control that is not.
[[nodiscard]] std::string native_validated_control_refusal(
    const NativeCoupledEvolutionRequest& request);

// Throws EquationAdmissionError, code unsupported_execution_policy, naming
// the control, when native_validated_control_refusal is not empty.
void require_native_validated_controls(
    const NativeCoupledEvolutionRequest& request);

// The driver's request for a selected ordinary request: the controls,
// without the continuation and the two callables, which
// evolve_native_validated_histories binds. Applies
// require_native_validated_controls first. Budget tokens convert to the
// nearest binary64 value and must be finite and positive.
[[nodiscard]] ValidatedEvolutionRequest native_validated_request(
    const NativeCoupledEvolutionRequest& request);

// The bridge's bound on the working set this invocation can add to the
// ordinary estimate of the supplied population, from the shapes the driver
// and the bridge actually retain: per reachable attempt, the attempt record
// and three atomic-step copies; per reachable accepted step and path, one
// history version with its copied tail block and block index; and three
// copies of the generating record (the incoming one, the copy a leg is
// appended to, and the result), each growing by one step-log entry per
// reachable step. Reachable
// steps and attempts, and time-token lengths, use exact decimal arithmetic;
// coefficient and radius tokens are charged at the 1076-character maximum
// of an exact binary64 expansion. Throws EquationAdmissionError
// validated_resource_bound_unavailable when no finite bound can be
// established. An admission bound with stated allowances, not a measured
// resident-set cost.
[[nodiscard]] std::uint64_t estimate_native_validated_growth_bytes(
    const NativeCoupledEvolutionRequest& request);

}  // namespace architrino::eom

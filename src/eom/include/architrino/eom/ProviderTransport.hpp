#pragma once
#include "architrino/eom/CoupledEvolution.hpp"
#include <optional>
#include <string>
#include <vector>
namespace architrino::eom {
[[nodiscard]] std::string create_provider_checkpoint(
    const NativeCoupledEvolutionRequest&, const NativeCoupledEvolutionCertificate&);
[[nodiscard]] NativeCoupledEvolutionCertificate resume_provider_checkpoint(
    const NativeCoupledEvolutionRequest&, const std::string& checkpoint,
    const std::string& requested_end_time);
// One bounded JSON document per single-shot invocation, or one per line in
// server mode; progress and worker readiness use a separate stderr channel.
[[nodiscard]] std::string execute_eom_v2_request(const std::string&,
    const std::string& checkpoint_file = {},
    std::function<bool()> cancellation = {},
    std::function<void(std::size_t,const std::string&)> progress = {},
    std::function<void(const std::string&)> paths = {});
int run_eom_v2_cli(int argc, char** argv);

// eom_provider_checkpoint/v9: a run of the validated method, persisted as
// its generating record. Typed only; no wire operation advertises it.
// `original` is the run's first request, unchanged: its preparation, worker
// count included, and the binding over it are written and compared byte for
// byte. The certificate must come from that run, and its continuation must
// carry a complete generating record, which exists only for a run that
// started at an exact origin. Before any bytes are returned, the original
// request's controls, origin time and exact origin members must be the
// generating record's, and every persisted claim is the sealed accepted
// boundary's: its time, counts and controller step, and histories whose
// digests are the sealed continuation's members, in order.
[[nodiscard]] std::string create_validated_provider_checkpoint(
    const NativeCoupledEvolutionRequest& original,
    const NativeCoupledEvolutionCertificate& certificate);

struct ValidatedProviderResume {
  // The request the resumed invocation ran: the original, with the
  // replayed population, evidence, continuation, counters, accepted time,
  // requested end and worker count.
  NativeCoupledEvolutionRequest request;
  // The resumed invocation, as the ordinary entry returns it.
  NativeCoupledEvolutionCertificate run;
  // From the replay. The caller's controls and exact origin are always
  // compared. expected_controls: nothing more, so any genuine record of that
  // origin and those controls satisfies it; expected_record: in addition,
  // the complete record identity the caller named. Then the identity of the
  // record actually read and the fields compared.
  std::string identity_basis;
  std::string record_identity;
  std::vector<std::string> compared_fields;
  std::size_t replayed_legs = 0;
  std::size_t replayed_steps = 0;
  std::size_t replayed_rejected_steps = 0;
  // The worker count the replay and the new invocation used.
  std::size_t worker_count = 1;
  // The resource bound admitted before replay: the accepted steps the
  // record's legs can reach under their enforced limits, and the bytes.
  std::uint64_t replay_step_bound = 0;
  std::uint64_t replay_bound_bytes = 0;
};

// Restores by complete replay of the checkpoint's record and continues to
// `requested_end_time`. In order: stored digest (corruption only); the
// caller's original request against the execution, binding, resolved model,
// preparation and run identity; the worker count, `worker_override` or the
// original's, at least 1 and at most 32; a named record identity against
// the record's bytes; a resource bound from the record's enforced leg
// limits, refused before any replay when over the original's memory budget;
// replay under the caller's controls and exact origin; then
// every envelope claim (accepted time, counts, controller step, histories,
// record identity) against replay. Every failure throws
// EquationAdmissionError, so no partial state is returned.
[[nodiscard]] ValidatedProviderResume resume_validated_provider_checkpoint(
    const NativeCoupledEvolutionRequest& original,
    const std::string& checkpoint, const std::string& requested_end_time,
    std::optional<std::size_t> worker_override = std::nullopt,
    std::optional<std::string> expected_record_identity = std::nullopt);
}

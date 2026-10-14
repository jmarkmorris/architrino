// A validated run record: a file of claims about a run of the validated
// far-step evolution driver, and restoration of such a run by replay.
//
// A record never holds evidence or a continuation. Both are sealed objects
// that only the step producer and the evolution entry point can issue.
// Restoring a run means calling the same entry point again, leg by leg, from
// an origin population that needs no evidence, and comparing what it issues
// with what the record claims. The evidence and continuation a restore
// returns are the ones issued during that replay. c_f = 1.
//
// Scope. This unit is separate from the checkpoint unit and does not use,
// extend or alter it or its format. Nothing here is bound into the ordinary
// evolution request or the checkpoint identity.
//
// What a record is. In order: scalars; both policy tokens and the declared
// pairs; the bound controls; the origin time and an exact origin population;
// the legs, one per call of the driver, each with the operational inputs of
// that call (requested end, accepted-step limit, the count after which it
// was cancelled) and its outcome; a step log of every accepted step's tokens
// and each path's content chain after it; and the final controller state and
// ledger. A digest of that body is stored beside it. The digest detects
// accidental corruption. It is not a trust anchor: anyone who can change the
// body can recompute it, and validated_run_record_reseal does exactly that.
//
// Two kinds of field. When a leg is appended, the fields of the accepted
// boundary are compared with the sealed continuation and evidence the
// driver returned: controls, accepted time, controller state, ledger, and
// each path's identifier, charge and chain. The accepted steps must also
// lead from the record's last population to the certificate's, through the
// sealed evidence each accepted step carries. The rest of the leg's
// transcript (how it ended, its step tokens) is plain data and is carried
// as a claim, to be confirmed by replay.
//
// Identity. A restore reports an identity basis:
//   expected_record    the caller named the SHA-256 of the complete record
//                      bytes; exactly those bytes are selected;
//   expected_controls  the caller named the complete bound control set and
//                      optionally the origin members; only those fields are
//                      selected, so different records can satisfy it;
//   record_only        the caller named nothing; the result is valid for
//                      the record's own inputs and claims no original.
// Every result reports the actual record identity and the fields compared.
// A refusal returns no population, evidence or continuation.
#pragma once

#include "architrino/eom/ValidatedEvolution.hpp"

#include <cstddef>
#include <memory>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

inline constexpr const char* kValidatedRunRecordFormat =
    "architrino_validated_run_record/v1";

// The complete bound control set of a run.
struct ValidatedRunControls {
  std::string policy;
  std::string field_speed;
  std::string coupling;
  std::string initial_step;
  std::string minimum_step;
  ValidatedFarStepBudgets increment_budget{0.0, 0.0};
  std::optional<ValidatedFarStepBudgets> total_budget = std::nullopt;
  std::size_t max_attempts_per_step = 0;
  std::size_t max_lower_sign_retries = 0;
  std::size_t growth_cooldown_steps = 0;
  std::string pair_policy;
  std::vector<ValidatedFarStepGroup> groups;
};

// Empty when equal; otherwise the name of the first field that differs.
[[nodiscard]] std::string validated_run_controls_difference(
    const ValidatedRunControls& left, const ValidatedRunControls& right);

struct ValidatedRunOriginMember {
  std::string path_id;
  std::string charge;
  std::string chain;
};

// One call of the driver. Operational inputs, then the claimed outcome.
struct ValidatedRunLeg {
  std::string end_time;
  std::size_t max_accepted_steps = 0;
  // Set when the call was cancelled: the accepted count at which it stopped.
  std::optional<std::size_t> cancelled_after = std::nullopt;
  std::string status;
  std::string halt_code;
  std::size_t accepted_steps = 0;
};

struct ValidatedRunStep {
  std::size_t ordinal = 0;
  std::string start;
  std::string step;
  std::string end;
  // Each path's content chain after the step, in path order.
  std::vector<std::string> chains;
};

struct ValidatedRunFinalState {
  std::string accepted_time;
  std::string controller_step_size;
  std::size_t cooldown_remaining = 0;
  std::size_t accepted_step_count = 0;
  std::vector<ValidatedPathLedger> ledger;
};

class ValidatedRunRecord {
 public:
  // Opens a record at the start of a run. Throws std::invalid_argument
  // unless the request is an origin: no continuation, no evidence, histories
  // with zero radii and no analytic carrier, ending at its start time.
  [[nodiscard]] static ValidatedRunRecord open(
      const ValidatedEvolutionRequest& origin);

  // Appends the leg that `request` asked for and `certificate` returned.
  // Returns an empty string, or the reason for refusing; a refused leg
  // leaves the record unchanged. Only a record opened or restored in this
  // process can be extended, because only it holds the continuation of its
  // last boundary; a record merely read from bytes cannot.
  [[nodiscard]] std::string append(
      const ValidatedEvolutionRequest& request,
      const ValidatedEvolutionCertificate& certificate);

  [[nodiscard]] std::string serialize() const;

  [[nodiscard]] const ValidatedRunControls& controls() const noexcept {
    return controls_;
  }
  [[nodiscard]] const std::string& origin_time() const noexcept {
    return origin_time_;
  }
  [[nodiscard]] const std::vector<ValidatedFarStepPath>& origin() const
      noexcept {
    return origin_;
  }
  [[nodiscard]] std::vector<ValidatedRunOriginMember> origin_members() const;
  [[nodiscard]] const std::vector<ValidatedRunLeg>& legs() const noexcept {
    return legs_;
  }
  [[nodiscard]] const std::vector<ValidatedRunStep>& steps() const noexcept {
    return steps_;
  }
  [[nodiscard]] const ValidatedRunFinalState& final_state() const noexcept {
    return final_;
  }

 private:
  friend struct ValidatedRunRecordAccess;
  ValidatedRunRecord() = default;

  ValidatedRunControls controls_;
  std::string origin_time_;
  std::vector<ValidatedFarStepPath> origin_;
  std::vector<ValidatedRunLeg> legs_;
  std::vector<ValidatedRunStep> steps_;
  ValidatedRunFinalState final_;
  // The chains at the last accepted boundary, and, in the process that
  // issued it, the continuation of that boundary. Not serialized.
  std::vector<std::string> last_chains_;
  std::shared_ptr<const ValidatedEvolutionContinuation> last_continuation_;
  bool extendable_ = false;
};

// SHA-256 of the complete record bytes: the record's identity.
[[nodiscard]] std::string validated_run_record_identity(
    const std::string& bytes);

// Recomputes the stored digest of an edited record text. It exists to make
// plain that the digest is not a trust anchor. Throws std::invalid_argument
// if the text does not have a record's outer shape.
[[nodiscard]] std::string validated_run_record_reseal(const std::string& bytes);

struct ValidatedRestoreExpectation {
  // expected_record: set this alone.
  std::optional<std::string> record_identity = std::nullopt;
  // expected_controls: set this, and optionally `origin`.
  std::optional<ValidatedRunControls> controls = std::nullopt;
  std::optional<std::vector<ValidatedRunOriginMember>> origin = std::nullopt;
};

struct ValidatedRestoreResult {
  // restored | refused
  std::string status = "refused";
  // Where a refusal arose: read | expectation | admission | replay | final.
  std::string stage;
  std::string reason;
  // expected_record | expected_controls | record_only
  std::string identity_basis;
  // The identity of the bytes actually read.
  std::string record_identity;
  // The expected fields that were compared, in order.
  std::vector<std::string> compared_fields;
  // The controls the record contained; set once the record has been read.
  std::optional<ValidatedRunControls> controls = std::nullopt;
  std::size_t replayed_legs = 0;
  std::size_t replayed_steps = 0;
  // Set only when restored. All were issued during the replay.
  std::vector<ValidatedFarStepPath> paths;
  ValidatedFarStepEvidence evidence;
  std::shared_ptr<const ValidatedEvolutionContinuation> continuation;
  std::vector<ValidatedPathLedger> ledger;
  // The rebuilt record, to which further legs can be appended.
  std::optional<ValidatedRunRecord> record = std::nullopt;
};

// Restores against an expectation supplied from outside the record. The
// expectation is compared before any replay.
[[nodiscard]] ValidatedRestoreResult restore_validated_run(
    const std::string& bytes,
    const ValidatedRestoreExpectation& expectation,
    std::size_t worker_count = 1);

// Replays the record with no external expectation. The result is valid for
// the record's own inputs and has identity basis record_only.
[[nodiscard]] ValidatedRestoreResult replay_validated_run_record(
    const std::string& bytes, std::size_t worker_count = 1);

// Reads a record without replaying it. The result is plain data: it holds
// no evidence and no continuation, and its step log and final state are
// claims.
struct ValidatedRunRecordClaims {
  // read | refused
  std::string status = "refused";
  std::string reason;
  std::string record_identity;
  std::optional<ValidatedRunRecord> record = std::nullopt;
};

[[nodiscard]] ValidatedRunRecordClaims read_validated_run_record(
    const std::string& bytes);

// Writes the bytes to a temporary file beside `path` and renames it over
// `path`, so a reader sees either the previous complete record or the new
// one. Throws std::runtime_error on failure and leaves no temporary file.
// The write is not flushed to stable storage.
void write_validated_run_record_file(
    const std::string& path, const std::string& bytes);

[[nodiscard]] std::string read_validated_run_record_file(
    const std::string& path);

}  // namespace architrino::eom

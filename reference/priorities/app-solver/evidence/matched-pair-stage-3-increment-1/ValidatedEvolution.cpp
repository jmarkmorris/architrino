#include "architrino/eom/ValidatedEvolution.hpp"

#include "architrino/eom/EquationPlan.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <algorithm>
#include <cmath>
#include <stdexcept>
#include <utility>

namespace architrino::eom {

std::string validated_evolution_half(const std::string& token) {
  if (!validated_far_step_plain_decimal(token)) {
    throw std::invalid_argument("half requires a plain decimal token");
  }
  const bool negative = token[0] == '-';
  const std::string body = negative ? token.substr(1) : token;
  const auto point = body.find('.');
  std::string digits = point == std::string::npos
      ? body : body.substr(0, point) + body.substr(point + 1U);
  const std::size_t scale =
      (point == std::string::npos ? 0U : body.size() - point - 1U) + 1U;
  // x / 2 = (5 x) / 10: multiply the digit string by five, then the result
  // has one more fractional digit.
  std::string product;
  int carry = 0;
  for (auto it = digits.rbegin(); it != digits.rend(); ++it) {
    const int value = (*it - '0') * 5 + carry;
    product.push_back(static_cast<char>('0' + value % 10));
    carry = value / 10;
  }
  if (carry > 0) product.push_back(static_cast<char>('0' + carry));
  std::reverse(product.begin(), product.end());
  if (product.size() <= scale) {
    product.insert(0, scale + 1U - product.size(), '0');
  }
  product.insert(product.size() - scale, ".");
  while (product.back() == '0') product.pop_back();
  if (product.back() == '.') product.pop_back();
  const auto first = product.find_first_not_of('0');
  if (first == std::string::npos) return "0";
  if (product[first] == '.') {
    product.erase(0, first - 1U);
  } else {
    product.erase(0, first);
  }
  return (negative ? "-" : "") + product;
}

std::string validated_evolution_difference(
    const std::string& a, const std::string& b) {
  if (!validated_far_step_plain_decimal(b)) {
    throw std::invalid_argument("difference requires plain decimal tokens");
  }
  const std::string negated = b[0] == '-' ? b.substr(1) : "-" + b;
  return validated_far_step_decimal_sum(a, negated);
}

namespace {

constexpr const char* kStepSchema =
    "eom_validated_far_step_atomic_step_certificate/v1";
constexpr const char* kRunSchema =
    "eom_validated_far_step_evolution_certificate/v1";
constexpr const char* kIntegrationMethod = "validated_far_step/v1";
constexpr const char* kReductionPolicy = "serial_fixed_path_order/v1";
constexpr const char* kEvidenceStatus = "validated_far_step_enclosure";

std::vector<NativeHistoryFingerprint> fingerprints_of(
    const std::vector<ValidatedFarStepPath>& paths) {
  std::vector<NativeHistoryFingerprint> out;
  for (const auto& path : paths) {
    out.push_back({path.id, path.history.provenance_fingerprint()});
  }
  return out;
}

std::vector<NativePublishedPath> published_of(
    const std::vector<ValidatedFarStepPath>& paths) {
  std::vector<NativePublishedPath> out;
  for (const auto& path : paths) {
    out.push_back({path.id, path.history});
  }
  return out;
}

// True when a declared radius the population already carries exceeds the
// total budget, so no step of any length could satisfy it.
bool inherited_total_exhausted(
    const std::vector<ValidatedFarStepPath>& paths,
    const std::optional<ValidatedFarStepBudgets>& total) {
  if (!total.has_value()) return false;
  for (const auto& path : paths) {
    const auto segment = path.history.segments().back();
    for (std::size_t axis = 0; axis < 3; ++axis) {
      if (segment.position_errors()[axis] > total->position ||
          segment.velocity_errors()[axis] > total->velocity) {
        return true;
      }
    }
  }
  return false;
}

// The fixed response to a refusal: "retry_shorter_step" or "halt".
std::string disposition_of(
    const ValidatedFarStepCertificate& refusal,
    const std::vector<ValidatedFarStepPath>& paths,
    const std::optional<ValidatedFarStepBudgets>& total,
    std::string* cause) {
  const std::string& code = refusal.code;
  *cause = refusal.cause;
  if (code == "VFS-H1-01") {
    return refusal.cause == "step_velocity_box" ? "retry_shorter_step"
                                                 : "halt";
  }
  if (code == "VFS-H2-01" || code == "VFS-H4-01" || code == "VFS-H5-01" ||
      code == "VFS-BUDGET-01" || code == "VFS-H3-01") {
    return "retry_shorter_step";
  }
  if (code == "VFS-BUDGET-02") {
    if (inherited_total_exhausted(paths, total)) {
      *cause = "inherited_total";
      return "halt";
    }
    *cause = "new_growth";
    return "retry_shorter_step";
  }
  // VFS-H0-01, VFS-PUB-01 and anything unrecognised.
  return "halt";
}

NativeAtomicStepCertificate atomic_of(
    const ValidatedEvolutionRequest& request,
    std::size_t step_index,
    const ValidatedFarStepCertificate& producer,
    const std::vector<ValidatedFarStepPath>& input,
    const std::vector<ValidatedFarStepPath>& published,
    bool accepted) {
  return NativeAtomicStepCertificate{
      .schema = kStepSchema,
      .status = accepted ? "accepted" : "rejected",
      .run_id = request.run_id,
      .step_index = step_index,
      .attempted_start = producer.start,
      .attempted_end = producer.end,
      .accepted_time = accepted ? producer.end : producer.start,
      .input_history_fingerprints = fingerprints_of(input),
      .published_histories = published_of(published),
      .local_errors = accepted ? producer.local_errors
                               : std::vector<NativePathLocalError>{},
      .failure_code = accepted ? std::string{} : producer.code,
      .evidence_status = accepted ? kEvidenceStatus : "failed",
      .integration_method = kIntegrationMethod,
      .reduction_policy = kReductionPolicy,
      .publication_atomic = true,
  };
}

std::vector<ValidatedPathLedger> ledger_of(
    const ValidatedFarStepCertificate& producer,
    const std::vector<ValidatedFarStepPath>& input) {
  std::vector<ValidatedPathLedger> ledger;
  for (std::size_t a = 0; a < input.size(); ++a) {
    const auto prior = input[a].history.segments().back();
    const auto& result = producer.paths[a];
    ValidatedPathLedger entry;
    entry.path_id = input[a].id;
    entry.position.inherited = prior.position_errors();
    entry.position.increment = result.growth_position;
    entry.position.total = result.position_radius;
    entry.velocity.inherited = prior.velocity_errors();
    entry.velocity.increment = result.growth_velocity;
    entry.velocity.total = result.velocity_radius;
    ledger.push_back(std::move(entry));
  }
  return ledger;
}

}  // namespace

ValidatedEvolutionCertificate evolve_validated_far_step_histories(
    const ValidatedEvolutionRequest& request) {
  if (request.policy != kValidatedFarStepEvolutionPolicy) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        "validated evolution requires its own policy token");
  }
  for (const std::string* token :
       {&request.start_time, &request.end_time, &request.initial_step,
        &request.minimum_step, &request.field_speed}) {
    if (!validated_far_step_plain_decimal(*token)) {
      throw EquationAdmissionError(
          "unsupported_execution_policy",
          "validated evolution requires plain decimal time and speed tokens");
    }
  }
  if (compare_exact_decimal_tokens(request.field_speed, "1") != 0) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        "validated evolution is qualified for field speed 1 only");
  }
  if (request.paths.empty() ||
      compare_exact_decimal_tokens(request.start_time, request.end_time) > 0 ||
      compare_exact_decimal_tokens(request.minimum_step, "0") <= 0 ||
      compare_exact_decimal_tokens(
          request.initial_step, request.minimum_step) < 0 ||
      !(request.increment_budget.position > 0.0) ||
      !(request.increment_budget.velocity > 0.0) ||
      !std::isfinite(request.increment_budget.position) ||
      !std::isfinite(request.increment_budget.velocity) ||
      request.max_attempts_per_step == 0U) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        "validated evolution request has an empty population, reversed "
        "times, a nonpositive step or budget, or no attempt allowance");
  }

  ValidatedFarStepProducer producer;
  ValidatedEvolutionCertificate out;
  out.schema = kRunSchema;
  out.policy = request.policy;
  // The accepted state. These four are replaced together, on acceptance
  // only, and are what every return path reports.
  std::vector<ValidatedFarStepPath> paths = request.paths;
  ValidatedFarStepEvidence evidence = request.evidence;
  std::vector<ValidatedPathLedger> ledger;
  std::string current = request.start_time;

  std::string step_size = request.initial_step;
  std::size_t cooldown = 0;
  std::size_t accepted = 0;
  std::size_t rejected = 0;
  std::string status;
  std::string halt_code;
  std::vector<NativeAtomicStepCertificate> steps;

  if (request.cancellation_requested && request.cancellation_requested()) {
    status = "cancelled";
  }
  while (status.empty() &&
         compare_exact_decimal_tokens(current, request.end_time) < 0) {
    if (accepted >= request.max_accepted_steps) {
      status = "halted";
      halt_code = "step_limit_exhausted";
      break;
    }
    const std::string remaining =
        validated_evolution_difference(request.end_time, current);
    const bool clamped =
        compare_exact_decimal_tokens(remaining, step_size) < 0;
    std::string attempt_step = clamped ? remaining : step_size;
    bool retried = false;
    std::size_t lower_sign_retries = 0;
    for (std::size_t attempt = 0;; ++attempt) {
      ValidatedEvolutionAttempt record;
      record.step_index = accepted;
      record.attempt_index = attempt;
      record.producer = producer.step(
          paths, evidence, current, attempt_step, request.coupling,
          request.increment_budget, request.total_budget);
      if (record.producer.status == "certified") {
        std::vector<ValidatedFarStepPath> next;
        try {
          next = ValidatedFarStepProducer::extend(paths, record.producer);
        } catch (const std::exception&) {
          // A certified step that cannot be appended is a publication
          // defect, not an adaptive-step signal.
          record.producer.status = "declined";
          record.producer.code = "VFS-PUB-01";
          record.producer.reason = "certified step could not be appended";
          record.producer.evidence.reset();
          record.disposition = "halt";
          record.atomic = atomic_of(
              request, accepted, record.producer, paths, paths, false);
          steps.push_back(record.atomic);
          out.attempts.push_back(std::move(record));
          ++rejected;
          status = "halted";
          halt_code = "validated_step_refused";
          out.halt_refusal_code = "VFS-PUB-01";
          break;
        }
        record.disposition = "accepted";
        record.ledger = ledger_of(record.producer, paths);
        record.atomic = atomic_of(
            request, accepted, record.producer, paths, next, true);
        // Commit the accepted state together.
        ledger = record.ledger;
        evidence = record.producer.evidence;
        current = record.producer.end;
        paths = std::move(next);
        steps.push_back(record.atomic);
        out.attempts.push_back(std::move(record));
        const std::size_t index = accepted;
        ++accepted;
        if (retried) {
          step_size = attempt_step;
          cooldown = request.growth_cooldown_steps;
        } else if (cooldown > 0U) {
          --cooldown;
        } else if (!clamped) {
          const std::string doubled =
              validated_far_step_decimal_sum(step_size, step_size);
          step_size = compare_exact_decimal_tokens(
                          doubled, request.initial_step) > 0
              ? request.initial_step : doubled;
        }
        if (request.accepted_step_callback) {
          request.accepted_step_callback(index, current);
        }
        break;
      }
      // Refusal: the accepted state is untouched.
      ++rejected;
      std::string cause;
      record.disposition = disposition_of(
          record.producer, paths, request.total_budget, &cause);
      record.cause = cause;
      record.atomic =
          atomic_of(request, accepted, record.producer, paths, paths, false);
      steps.push_back(record.atomic);
      const std::string code = record.producer.code;
      const bool retry = record.disposition == "retry_shorter_step";
      std::string limit;
      std::string half;
      if (retry) {
        half = validated_evolution_half(attempt_step);
        if (attempt + 1U >= request.max_attempts_per_step) {
          limit = "attempt_limit_exhausted";
        } else if (code == "VFS-H3-01" &&
                   ++lower_sign_retries > request.max_lower_sign_retries) {
          limit = "lower_sign_unresolved";
        } else if (compare_exact_decimal_tokens(
                       half, request.minimum_step) < 0) {
          limit = "minimum_step_exhausted";
        }
      }
      if (!retry || !limit.empty()) {
        if (retry) record.disposition = "halt";
        out.attempts.push_back(std::move(record));
        status = "halted";
        halt_code = retry ? limit : "validated_step_refused";
        out.halt_refusal_code = code;
        out.halt_refusal_cause = cause;
        break;
      }
      out.attempts.push_back(std::move(record));
      attempt_step = half;
      retried = true;
    }
    if (status.empty() && request.cancellation_requested &&
        request.cancellation_requested() &&
        compare_exact_decimal_tokens(current, request.end_time) < 0) {
      status = "cancelled";
    }
  }
  if (status.empty()) status = "completed";

  out.paths = paths;
  out.evidence = evidence;
  out.ledger = ledger;
  out.run = NativeCoupledEvolutionCertificate{
      .schema = kRunSchema,
      .status = status,
      .run_id = request.run_id,
      .start_time = request.start_time,
      .requested_end_time = request.end_time,
      .accepted_end_time = current,
      .histories = published_of(paths),
      .steps = std::move(steps),
      .accepted_step_count = accepted,
      .rejected_step_count = rejected,
      .controller_step_size = step_size,
      .halt_code = halt_code,
      .evidence_status =
          accepted > 0U ? kEvidenceStatus : "no_validated_step_accepted",
      .all_steps_atomic = true,
  };
  return out;
}

}  // namespace architrino::eom

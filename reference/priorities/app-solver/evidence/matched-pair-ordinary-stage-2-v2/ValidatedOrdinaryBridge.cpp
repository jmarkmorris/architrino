#include "architrino/eom/ValidatedOrdinaryBridge.hpp"

#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <limits>
#include <memory>
#include <optional>
#include <string>
#include <tuple>
#include <utility>

namespace architrino::eom {

namespace {

const NativeCoupledEvolutionRequest& defaults() {
  static const NativeCoupledEvolutionRequest value{};
  return value;
}

bool validated_member_is_default(const NativeValidatedExecution& v) {
  const NativeValidatedExecution d{};
  return v.pair_policy == d.pair_policy && v.groups.empty() &&
      !v.total_position_budget.has_value() &&
      !v.total_velocity_budget.has_value() &&
      v.max_attempts_per_step == d.max_attempts_per_step &&
      v.max_lower_sign_retries == d.max_lower_sign_retries &&
      v.growth_cooldown_steps == d.growth_cooldown_steps &&
      v.continuation == nullptr;
}

double positive_budget(const std::string& token, const char* name) {
  double value = 0.0;
  try {
    value = parse_finite_double(token, name);
  } catch (const std::exception&) {
    value = 0.0;
  }
  if (!(value > 0.0) || !std::isfinite(value)) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        std::string("the validated method requires a finite positive ") +
            name);
  }
  return value;
}

}  // namespace

bool native_validated_method_selected(
    const NativeCoupledEvolutionRequest& request) {
  if (request.integration_method == kOrdinaryIntegrationSelection) {
    if (!validated_member_is_default(request.validated)) {
      throw EquationAdmissionError(
          "unsupported_execution_policy",
          "validated controls are set but the ordinary method is selected");
    }
    return false;
  }
  if (request.integration_method == kValidatedFarStepEvolutionPolicy) {
    return true;
  }
  throw EquationAdmissionError("unsupported_execution_policy",
                               "unknown integration method");
}

void require_native_ordinary_method(
    const NativeCoupledEvolutionRequest& request, const char* entry) {
  if (native_validated_method_selected(request)) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        std::string("the validated method is not available through ") +
            entry);
  }
}

std::string native_validated_control_refusal(
    const NativeCoupledEvolutionRequest& request) {
  const NativeCoupledEvolutionRequest& d = defaults();
#define ARCHITRINO_ORDINARY_ONLY(field) \
  if (!(request.field == d.field)) return #field;
  ARCHITRINO_ORDINARY_ONLY(joint_state_fallback_already_applied)
  ARCHITRINO_ORDINARY_ONLY(root_tolerance)
  ARCHITRINO_ORDINARY_ONLY(transmitter_factor_floor)
  ARCHITRINO_ORDINARY_ONLY(acceleration_tolerance)
  ARCHITRINO_ORDINARY_ONLY(far_field_enclosure_fraction)
  ARCHITRINO_ORDINARY_ONLY(use_far_field_enclosure_in_evolution)
  ARCHITRINO_ORDINARY_ONLY(matched_pair_enclosure_policy)
  ARCHITRINO_ORDINARY_ONLY(chart_policy)
  ARCHITRINO_ORDINARY_ONLY(causal_width)
  ARCHITRINO_ORDINARY_ONLY(core_scale)
  ARCHITRINO_ORDINARY_ONLY(quadrature_tolerance)
  ARCHITRINO_ORDINARY_ONLY(event_impulse_tolerance)
  ARCHITRINO_ORDINARY_ONLY(event_position_moment_tolerance)
  ARCHITRINO_ORDINARY_ONLY(regulator_refinement_ratio)
  ARCHITRINO_ORDINARY_ONLY(regulator_convergence_tolerance)
  ARCHITRINO_ORDINARY_ONLY(position_tolerance)
  ARCHITRINO_ORDINARY_ONLY(velocity_tolerance)
  ARCHITRINO_ORDINARY_ONLY(correction_tolerance)
  ARCHITRINO_ORDINARY_ONLY(certified_budget_schema)
  ARCHITRINO_ORDINARY_ONLY(certified_budget_preset_id)
  ARCHITRINO_ORDINARY_ONLY(certified_budget_allocation_hash)
  ARCHITRINO_ORDINARY_ONLY(certified_budget_allocation_json)
  ARCHITRINO_ORDINARY_ONLY(event_impulse_budget)
  ARCHITRINO_ORDINARY_ONLY(event_position_moment_budget)
  ARCHITRINO_ORDINARY_ONLY(independent_overlap_budget)
  ARCHITRINO_ORDINARY_ONLY(event_quadrature_fraction)
  ARCHITRINO_ORDINARY_ONLY(event_causal_regulator_fraction)
  ARCHITRINO_ORDINARY_ONLY(event_core_regulator_fraction)
  ARCHITRINO_ORDINARY_ONLY(event_state_numerical_fraction)
  ARCHITRINO_ORDINARY_ONLY(event_matching_fraction)
  ARCHITRINO_ORDINARY_ONLY(deterministic_reduction_policy)
  ARCHITRINO_ORDINARY_ONLY(rounding_mode)
  ARCHITRINO_ORDINARY_ONLY(receiver_event_allocation_rule)
  ARCHITRINO_ORDINARY_ONLY(resolved_receiver_event_pair_count)
  ARCHITRINO_ORDINARY_ONLY(resolved_receiver_event_pair_weight)
  ARCHITRINO_ORDINARY_ONLY(root_max_depth)
  ARCHITRINO_ORDINARY_ONLY(root_max_cells)
  ARCHITRINO_ORDINARY_ONLY(quadrature_max_depth)
  ARCHITRINO_ORDINARY_ONLY(quadrature_max_cells)
  ARCHITRINO_ORDINARY_ONLY(event_max_depth)
  ARCHITRINO_ORDINARY_ONLY(event_max_cells)
  ARCHITRINO_ORDINARY_ONLY(regulator_refinement_levels)
  ARCHITRINO_ORDINARY_ONLY(initial_mpfr_bits)
  ARCHITRINO_ORDINARY_ONLY(maximum_mpfr_bits)
  ARCHITRINO_ORDINARY_ONLY(force_event_precision_escalation)
  ARCHITRINO_ORDINARY_ONLY(max_correction_iterations)
  ARCHITRINO_ORDINARY_ONLY(max_step_attempts)
  ARCHITRINO_ORDINARY_ONLY(max_rejected_steps)
  ARCHITRINO_ORDINARY_ONLY(use_adaptive_step_growth)
  ARCHITRINO_ORDINARY_ONLY(initial_consecutive_growth_headroom_steps)
  ARCHITRINO_ORDINARY_ONLY(use_continuous_adaptive_step)
  ARCHITRINO_ORDINARY_ONLY(adaptive_step_safety_factor)
  ARCHITRINO_ORDINARY_ONLY(adaptive_step_minimum_scale)
  ARCHITRINO_ORDINARY_ONLY(adaptive_step_maximum_scale)
  ARCHITRINO_ORDINARY_ONLY(use_synchronized_multirate_publication)
  ARCHITRINO_ORDINARY_ONLY(multirate_synchronization_fraction)
  ARCHITRINO_ORDINARY_ONLY(use_quarter_step_publication)
  ARCHITRINO_ORDINARY_ONLY(use_certificate_cost_feedback)
  ARCHITRINO_ORDINARY_ONLY(certificate_cost_maximum_probe_adjustments)
  ARCHITRINO_ORDINARY_ONLY(certificate_cost_probe_scale)
  ARCHITRINO_ORDINARY_ONLY(certificate_cost_unavoidable_cooldown_steps)
  ARCHITRINO_ORDINARY_ONLY(certificate_cost_initial_cooldown_steps)
  ARCHITRINO_ORDINARY_ONLY(use_analytic_pinned_fold)
  ARCHITRINO_ORDINARY_ONLY(use_correlated_self_chord)
  ARCHITRINO_ORDINARY_ONLY(use_stable_circular_residual)
  ARCHITRINO_ORDINARY_ONLY(use_pinned_fold_aware_temporal_step)
  ARCHITRINO_ORDINARY_ONLY(use_certified_history_window)
  ARCHITRINO_ORDINARY_ONLY(use_warm_root_exclusion)
  ARCHITRINO_ORDINARY_ONLY(allow_pending_finite_width_exit)
  ARCHITRINO_ORDINARY_ONLY(use_certified_traversal)
  ARCHITRINO_ORDINARY_ONLY(traversal_exact_tile_pair_limit)
  ARCHITRINO_ORDINARY_ONLY(traversal_maximum_nodes)
  ARCHITRINO_ORDINARY_ONLY(traversal_maximum_exact_pairs)
  ARCHITRINO_ORDINARY_ONLY(retain_diagnostic_candidate_histories)
#undef ARCHITRINO_ORDINARY_ONLY
  if (!request.joint_root_point_states.empty()) return "joint_root_point_states";
  if (!request.joint_histories.empty()) return "joint_histories";
  if (!request.adjudicated_finite_width_pairs.empty()) {
    return "adjudicated_finite_width_pairs";
  }
  if (request.failed_substep_candidate_callback) {
    return "failed_substep_candidate_callback";
  }
  if (request.surface_geometry.has_value()) return "surface_geometry";
  if (!request.continuation_histories.empty()) return "continuation_histories";
  if (request.surface_numerics.position_tolerance !=
          d.surface_numerics.position_tolerance ||
      request.surface_numerics.tangent_velocity_tolerance !=
          d.surface_numerics.tangent_velocity_tolerance ||
      request.surface_numerics.maximum_depth !=
          d.surface_numerics.maximum_depth ||
      request.surface_numerics.maximum_cells !=
          d.surface_numerics.maximum_cells) {
    return "surface_numerics";
  }
  if (request.equation_selection.has_value()) {
    const EquationSelection& s = *request.equation_selection;
    const EquationSelection canonical{};
    if (s.composition_id != canonical.composition_id ||
        s.speed_domain != canonical.speed_domain ||
        s.boundary_policy != canonical.boundary_policy ||
        s.constraint != canonical.constraint ||
        s.method != canonical.method) {
      return "equation_selection";
    }
  }
  // Empty is the ordinary convention for a maximum equal to the initial
  // step. The validated controller never grows a step beyond its initial
  // step, so only that maximum has a meaning here.
  if (!request.maximum_step.empty()) {
    bool same = false;
    try {
      same = compare_exact_decimal_tokens(request.maximum_step,
                                          request.initial_step) == 0;
    } catch (const std::exception&) {
      same = false;
    }
    if (!same) return "maximum_step";
  }
  if (request.position_increment_budget.empty()) {
    return "position_increment_budget";
  }
  if (request.velocity_increment_budget.empty()) {
    return "velocity_increment_budget";
  }
  if (request.validated.total_position_budget.has_value() !=
      request.validated.total_velocity_budget.has_value()) {
    return "validated.total_budget";
  }
  // Restart counters are not trusted: they must be the continuation's.
  const auto& continuation = request.validated.continuation;
  if (request.initial_accepted_step_count !=
      (continuation ? continuation->accepted_step_count() : 0U)) {
    return "initial_accepted_step_count";
  }
  if (request.initial_rejected_step_count !=
      (continuation ? continuation->rejected_step_count() : 0U)) {
    return "initial_rejected_step_count";
  }
  return {};
}

void require_native_validated_controls(
    const NativeCoupledEvolutionRequest& request) {
  const std::string refusal = native_validated_control_refusal(request);
  if (!refusal.empty()) {
    throw EquationAdmissionError(
        "unsupported_execution_policy",
        "the validated method does not admit this control value: " +
            refusal);
  }
}

ValidatedEvolutionRequest native_validated_request(
    const NativeCoupledEvolutionRequest& request) {
  require_native_validated_controls(request);
  ValidatedEvolutionRequest out;
  out.run_id = request.run_id;
  out.policy = kValidatedFarStepEvolutionPolicy;
  for (const auto& path : request.paths) {
    out.paths.push_back({path.path_id, path.charge, path.history});
  }
  out.evidence = request.validated_population_evidence;
  out.start_time = request.start_time;
  out.end_time = request.end_time;
  out.initial_step = request.initial_step;
  out.minimum_step = request.minimum_step;
  out.field_speed = request.field_speed;
  out.coupling = request.coupling;
  out.increment_budget = ValidatedFarStepBudgets{
      positive_budget(request.position_increment_budget,
                      "position increment budget"),
      positive_budget(request.velocity_increment_budget,
                      "velocity increment budget")};
  if (request.validated.total_position_budget.has_value()) {
    out.total_budget = ValidatedFarStepBudgets{
        positive_budget(*request.validated.total_position_budget,
                        "total position budget"),
        positive_budget(*request.validated.total_velocity_budget,
                        "total velocity budget")};
  }
  out.max_attempts_per_step = request.validated.max_attempts_per_step;
  out.max_lower_sign_retries = request.validated.max_lower_sign_retries;
  // Per invocation, as the ordinary controller counts it. Zero keeps the
  // driver's own ceiling.
  if (request.diagnostic_maximum_accepted_steps != 0U) {
    out.max_accepted_steps = request.diagnostic_maximum_accepted_steps;
  }
  out.growth_cooldown_steps = request.validated.growth_cooldown_steps;
  out.pair_policy = request.validated.pair_policy;
  for (const auto& [leader, follower] : request.validated.groups) {
    out.groups.push_back({leader, follower});
  }
  out.worker_count = request.thread_count;
  return out;
}

namespace {

// A plain decimal token as an exact scaled integer, when it has at most 36
// significant digits after scaling; otherwise empty.
struct Scaled {
  unsigned __int128 digits = 0;
  std::size_t scale = 0;
};

std::optional<Scaled> scaled_decimal(const std::string& token) {
  if (token.empty() || token[0] == '-' || token[0] == '+') return std::nullopt;
  Scaled out;
  bool point = false;
  std::size_t significant = 0;
  for (char c : token) {
    if (c == '.') {
      if (point) return std::nullopt;
      point = true;
      continue;
    }
    if (c < '0' || c > '9') return std::nullopt;
    if (out.digits != 0 || c != '0') ++significant;
    if (significant > 36) return std::nullopt;
    out.digits = out.digits * 10U + static_cast<unsigned>(c - '0');
    if (point) ++out.scale;
  }
  return out;
}

std::optional<unsigned __int128> rescaled(const Scaled& value, std::size_t scale) {
  unsigned __int128 out = value.digits;
  for (std::size_t i = value.scale; i < scale; ++i) {
    if (out > (~static_cast<unsigned __int128>(0)) / 10U) return std::nullopt;
    out *= 10U;
  }
  return out;
}

std::size_t fraction_digits(const std::string& token) {
  const auto point = token.find('.');
  return point == std::string::npos ? 0U : token.size() - point - 1U;
}

std::size_t integer_digits(const std::string& token) {
  const auto point = token.find('.');
  return point == std::string::npos ? token.size() : point;
}

// Heap bytes a std::string of `length` characters can hold, with allocator
// overhead: an upper allowance, not a measurement.
std::uint64_t string_allowance(std::uint64_t length) {
  return length + 48U;
}

[[noreturn]] void no_bound(const std::string& why) {
  throw EquationAdmissionError(
      "validated_resource_bound_unavailable",
      "no finite working-set bound can be established: " + why);
}

}  // namespace

std::uint64_t estimate_native_validated_growth_bytes(
    const NativeCoupledEvolutionRequest& request) {
  const ValidatedEvolutionRequest translated =
      native_validated_request(request);
  using U = unsigned __int128;
  const U limit = std::numeric_limits<std::uint64_t>::max();
  const auto checked = [&](U value, const char* what) {
    if (value > limit) no_bound(what);
    return value;
  };
  // Reachable accepted steps: every step except the last is at least the
  // minimum step, so at most floor(span / minimum) + 1, within the
  // per-invocation accepted-step limit. Exact decimal arithmetic.
  const std::string span = validated_evolution_difference(
      translated.end_time, translated.start_time);
  const auto span_scaled = scaled_decimal(span);
  const auto minimum_scaled = scaled_decimal(translated.minimum_step);
  if (!span_scaled || !minimum_scaled || minimum_scaled->digits == 0U) {
    no_bound("the span or minimum step is not a short positive decimal");
  }
  const std::size_t scale = std::max(span_scaled->scale, minimum_scaled->scale);
  const auto span_int = rescaled(*span_scaled, scale);
  const auto minimum_int = rescaled(*minimum_scaled, scale);
  if (!span_int || !minimum_int) no_bound("span / minimum step overflows");
  const U steps = std::min<U>(*span_int / *minimum_int + 1U,
                              translated.max_accepted_steps);
  // Attempts per accepted step: each retry halves the step, starting no
  // longer than the initial step, and a half below the minimum halts, so at
  // most one more than the number of exact halvings of the initial step that
  // stay at or above the minimum, within the per-step attempt limit.
  std::size_t halvings = 0;
  for (std::string h = translated.initial_step;;) {
    h = validated_evolution_half(h);
    if (compare_exact_decimal_tokens(h, translated.minimum_step) < 0) break;
    if (++halvings > 4096U) no_bound("too many halvings to the minimum step");
  }
  const U per_step =
      std::min<U>(halvings + 1U, translated.max_attempts_per_step);
  // One more step's attempts for a run that halts without accepting it.
  const U attempts = checked((steps + 1U) * per_step, "attempt count");
  // Restart counters must not overflow.
  const auto& resumed = request.validated.continuation;
  if (resumed &&
      (U(resumed->accepted_step_count()) + steps >
           std::numeric_limits<std::size_t>::max() ||
       U(resumed->rejected_step_count()) + attempts >
           std::numeric_limits<std::size_t>::max())) {
    no_bound("cumulative step counters would overflow");
  }
  // Token lengths. Time tokens are exact decimal sums of the start and
  // steps that are halvings of the initial step: at most one more fraction
  // digit per halving. Coefficient and radius tokens are exact binary64
  // expansions, at most 1076 characters.
  std::size_t fraction = std::max({fraction_digits(translated.start_time),
                                   fraction_digits(translated.end_time),
                                   fraction_digits(translated.initial_step),
                                   fraction_digits(translated.minimum_step)});
  fraction += halvings + 1U;
  const std::size_t whole = std::max(integer_digits(translated.start_time),
                                     integer_digits(translated.end_time)) + 1U;
  const U time_token = string_allowance(whole + 2U + fraction);
  const U number_token = string_allowance(1076U);
  // A published segment: 2 time tokens and 20 number tokens.
  const U segment = checked(sizeof(CubicHistorySegment) + 2U * time_token +
                                20U * number_token, "segment");
  const U n = request.paths.size();
  const U groups = translated.groups.size();
  std::size_t longest_id = 0;
  for (const auto& path : request.paths) {
    longest_id = std::max({longest_id, path.path_id.size(),
                           path.history.history_id().size()});
  }
  const U id = string_allowance(longest_id);
  const U digest = string_allowance(64U);
  // Retained per attempt, as the driver and the bridge hold it: the attempt
  // record with its producer certificate (paths with one segment each, every
  // ordered pair, every group, local errors, evidence) and ledger; three
  // copies of the atomic step (the attempt's, the driver run's and the
  // ordinary view's), each with every path's published history object,
  // input fingerprint and local error. History contents are shared between
  // these copies and counted once, per accepted step, below.
  const U per_path_atomic = sizeof(NativePublishedPath) + 2U * id +
      digest + 256U + sizeof(NativeHistoryFingerprint) + id + digest +
      sizeof(NativePathLocalError) + id;
  const U per_attempt = checked(
      sizeof(ValidatedEvolutionAttempt) +
          2U * sizeof(NativeAtomicStepCertificate) + 3U * 4096U +
          n * (sizeof(ValidatedFarStepPathResult) + id + segment +
               sizeof(NativePathLocalError) + id +
               sizeof(ValidatedPathLedger) + id +
               sizeof(ValidatedPopulationEvidence::Member) + 2U * id +
               2U * digest) +
          n * (n - 1U) * (sizeof(ValidatedFarStepPairInfo) + 3U * id) +
          n * groups * (sizeof(ValidatedFarStepGroupInfo) + 4U * id + 64U) +
          3U * n * per_path_atomic + sizeof(ValidatedPopulationEvidence),
      "attempt");
  U bytes = checked(attempts * per_attempt, "attempts");
  // Retained per accepted step and path: a new history version, sharing all
  // full blocks, holding a copied tail block of up to 64 segments and an
  // index of one slot per block.
  for (const auto& path : request.paths) {
    const U s0 = path.history.segments().size();
    // Sum over j = 1..steps of ((s0 + j - 1) mod 64) + 1, exactly.
    const U cycles = steps / 64U;
    U tail = cycles * 2080U;
    for (U j = 0, c = s0 % 64U; j < steps % 64U; ++j) {
      tail += ((c + j) % 64U) + 1U;
    }
    // Sum over j of ceil((s0 + j) / 64) <= steps * (s0 + steps + 63) / 64.
    const U slots = (steps * (s0 + steps + 63U)) / 64U + steps;
    bytes = checked(bytes + tail * segment + slots * 72U + steps * 1024U,
                    "history versions");
  }
  // The generating record, in three copies: one step-log entry (three time
  // tokens and one chain per path) per accepted step, and one leg per
  // invocation.
  {
    U record_steps = steps;
    U record_legs = 1U;
    if (resumed && resumed->record()) {
      record_steps += resumed->record()->steps().size();
      record_legs += resumed->record()->legs().size();
    }
    const U step_entry = 3U * time_token + n * digest + 128U;
    bytes = checked(
        bytes + 3U * (record_steps * step_entry + record_legs * 512U +
                      n * (sizeof(ValidatedPathLedger) + id + 512U) + 4096U),
        "record");
  }
  // Evidence and ledger of the supplied population.
  bytes = checked(bytes + n * (sizeof(ValidatedPathLedger) +
                               sizeof(ValidatedPopulationEvidence::Member) +
                               2U * digest + id) +
                      sizeof(ValidatedPopulationEvidence),
                  "population");
  return static_cast<std::uint64_t>(bytes);
}

namespace {

// A conservative origin preflight, applied once at the start of a run that
// is not resuming: the validated producer, with its own hypotheses and the
// run's controls, must certify one discarded step of length
// min(minimum_step, remaining span) from the origin. Certification is a
// sufficient positive admission check. A refusal does not prove that no
// other length could be certified, and minimum_step need not be a length
// the controller would actually try; such an origin is refused rather than
// admitted. Every step the driver takes is still certified separately. A
// population the driver's own admission refuses is left to the driver,
// which reports it before any early return. A resumed boundary is not
// reexamined: it was accepted.
void require_native_validated_origin(const NativeCoupledEvolutionRequest& request,
                                     const ValidatedEvolutionRequest& translated) {
  if (request.validated.continuation != nullptr) return;
  if (!ValidatedFarStepProducer::admission_refusal(
           translated.paths, translated.evidence, translated.start_time,
           translated.coupling, translated.groups)
           .empty()) {
    return;
  }
  std::string step = translated.minimum_step;
  const std::string span = validated_evolution_difference(
      translated.end_time, translated.start_time);
  if (compare_exact_decimal_tokens(span, step) < 0) step = span;
  ValidatedFarStepProducer producer(translated.worker_count);
  const ValidatedFarStepCertificate probe = producer.step(
      translated.paths, translated.evidence, translated.start_time, step,
      translated.coupling, translated.increment_budget,
      translated.total_budget, kValidatedFarStepEnclosureIterations,
      translated.groups);
  if (probe.status != "certified") {
    throw EquationAdmissionError(
        "unsupported_validated_domain",
        "the validated origin preflight is not certified: at step " + step +
            " the producer refuses " + probe.code +
            (probe.cause.empty() ? "" : " (" + probe.cause + ")") + ": " +
            probe.reason);
  }
}

// Opens the generating record of a run that starts at an exact origin:
// no evidence, no analytic carrier and no declared radius. The record unit
// repeats the driver's zero-length admission and keeps no rule of its own.
std::tuple<std::shared_ptr<const ValidatedRunRecord>, std::string>
open_native_validated_record(const ValidatedEvolutionRequest& translated) {
  if (translated.evidence != nullptr) return {nullptr, "not_an_origin"};
  for (const auto& path : translated.paths) {
    if (path.history.uniform_circular_endpoint_certificate().has_value()) {
      return {nullptr, "not_an_origin"};
    }
    for (const auto& segment : path.history.segments()) {
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (!exact_decimal_token_is_zero(
                segment.position_error_tokens()[axis]) ||
            !exact_decimal_token_is_zero(
                segment.velocity_error_tokens()[axis])) {
          return {nullptr, "not_an_origin"};
        }
      }
    }
  }
  ValidatedEvolutionRequest origin = translated;
  origin.end_time = origin.start_time;
  origin.continuation = nullptr;
  origin.cancellation_requested = {};
  origin.accepted_step_callback = {};
  try {
    return {std::make_shared<const ValidatedRunRecord>(
                ValidatedRunRecord::open(origin)),
            "recorded"};
  } catch (const std::exception& error) {
    return {nullptr, std::string("open_refused: ") + error.what()};
  }
}

}  // namespace

std::shared_ptr<const NativeValidatedContinuation>
native_validated_continuation_from_replay(
    const ValidatedRestoreResult& restored) {
  if (restored.status != "restored" || restored.boundary == nullptr) {
    throw std::invalid_argument(
        "only a complete replay of a generating record issues a "
        "continuation");
  }
  const ValidatedReplayBoundary& boundary = *restored.boundary;
  if (boundary.continuation() == nullptr || boundary.record() == nullptr ||
      restored.continuation != boundary.continuation() ||
      restored.replayed_rejected_steps != boundary.replayed_rejected_steps() ||
      restored.record_identity != boundary.record_identity() ||
      !restored.record.has_value() ||
      restored.record->serialize() != boundary.record()->serialize()) {
    throw std::invalid_argument(
        "the restore result differs from the replay that issued it");
  }
  const ValidatedEvolutionState& sealed = boundary.continuation()->state();
  const ValidatedRunFinalState& final_state = boundary.record()->final_state();
  if (sealed.accepted_time != final_state.accepted_time ||
      sealed.accepted_step_count != final_state.accepted_step_count ||
      sealed.controller_step_size != final_state.controller_step_size) {
    throw std::invalid_argument(
        "the replayed continuation and record disagree");
  }
  return std::shared_ptr<const NativeValidatedContinuation>(
      new NativeValidatedContinuation(
          boundary.continuation(), boundary.replayed_rejected_steps(),
          boundary.record(), "recorded"));
}

NativeCoupledEvolutionCertificate evolve_native_validated_histories(
    const NativeCoupledEvolutionRequest& request,
    std::uint64_t memory_estimate_bytes) {
  const auto timing_start = std::chrono::steady_clock::now();
  ValidatedEvolutionRequest translated = native_validated_request(request);
  const auto& resumed = request.validated.continuation;
  const std::size_t base_accepted =
      resumed ? resumed->accepted_step_count() : 0U;
  const std::size_t base_rejected =
      resumed ? resumed->rejected_step_count() : 0U;
  translated.continuation = resumed ? resumed->driver() : nullptr;
  // Order: a finite bound, then the origin's domain, then the budget, then
  // the driver with its own admission and early returns.
  const std::uint64_t growth = estimate_native_validated_growth_bytes(request);
  if (growth > std::numeric_limits<std::uint64_t>::max() - memory_estimate_bytes) {
    no_bound("the population and growth estimates overflow together");
  }
  const std::uint64_t estimate = memory_estimate_bytes + growth;
  require_native_validated_origin(request, translated);
  const auto finish = [&](NativeCoupledEvolutionCertificate out) {
    out.memory_budget_bytes = request.memory_budget_bytes;
    out.memory_estimate_bytes = estimate;
    out.timing.total_wall_seconds = std::chrono::duration<double>(
        std::chrono::steady_clock::now() - timing_start).count();
    return out;
  };

  if (estimate > request.memory_budget_bytes) {
    // Admission without a step and without callables, so that a population
    // the driver refuses is reported as that refusal.
    translated.end_time = translated.start_time;
    auto admitted = std::make_shared<ValidatedEvolutionCertificate>(
        evolve_validated_far_step_histories(translated));
    if (admitted->continuation == nullptr) {
      NativeCoupledEvolutionCertificate out = admitted->run;
      out.requested_end_time = request.end_time;
      out.accepted_step_count = base_accepted;
      out.rejected_step_count = base_rejected;
      out.validated_run = std::move(admitted);
      return finish(std::move(out));
    }
    // Admitted, but over budget: no step, and nothing to resume from that
    // the caller does not already hold.
    NativeCoupledEvolutionCertificate out;
    out.schema = admitted->run.schema;
    out.status = "halted";
    out.run_id = request.run_id;
    out.start_time = request.start_time;
    out.requested_end_time = request.end_time;
    out.accepted_end_time = request.start_time;
    for (const auto& path : request.paths) {
      out.histories.push_back({path.path_id, path.history});
    }
    out.accepted_step_count = base_accepted;
    out.rejected_step_count = base_rejected;
    out.controller_step_size = admitted->run.controller_step_size;
    out.halt_code = "memory_budget_exhausted";
    out.evidence_status = "failed";
    out.all_steps_atomic = true;
    return finish(std::move(out));
  }

  // The generating record: carried from the continuation, or opened at an
  // exact origin.
  std::shared_ptr<const ValidatedRunRecord> record;
  std::string record_status;
  if (resumed) {
    record = resumed->record();
    record_status = resumed->record_status();
  } else {
    std::tie(record, record_status) = open_native_validated_record(translated);
  }

  translated.cancellation_requested = request.cancellation_requested;
  if (request.accepted_step_callback) {
    // The driver reports the zero-based ordinal of the accepted step; the
    // ordinary callback receives the accepted-step count after it.
    translated.accepted_step_callback =
        [callback = request.accepted_step_callback](
            std::size_t ordinal, const std::string& time) {
          callback(ordinal + 1U, time);
        };
  }
  // Moved, not copied, into the shared certificate.
  auto run = std::make_shared<ValidatedEvolutionCertificate>(
      evolve_validated_far_step_histories(translated));

  NativeCoupledEvolutionCertificate out = run->run;
  out.accepted_step_count = base_accepted + run->run.accepted_step_count;
  out.rejected_step_count = base_rejected + run->run.rejected_step_count;
  const std::size_t base_attempts = base_accepted + base_rejected;
  for (std::size_t i = 0; i < out.steps.size(); ++i) {
    out.steps[i].step_index = base_attempts + i;
  }
  if (run->run.status == "cancelled") {
    out.status = "halted";
    out.halt_code = "cancelled_at_accepted_boundary";
  } else if (run->run.halt_code == "step_limit_exhausted" &&
             request.diagnostic_maximum_accepted_steps != 0U) {
    out.halt_code = "diagnostic_accepted_step_limit_reached";
  }
  if (run->continuation != nullptr) {
    // This invocation's leg, appended to a copy of the record; a refusal is
    // reported in the status and drops the record from then on.
    if (record_status == "recorded") {
      ValidatedRunRecord next = *record;
      const std::string refusal = next.append(translated, *run);
      if (refusal.empty()) {
        record = std::make_shared<const ValidatedRunRecord>(std::move(next));
      } else {
        record.reset();
        record_status = "append_refused: " + refusal;
      }
    }
    out.validated_continuation =
        std::shared_ptr<const NativeValidatedContinuation>(
            new NativeValidatedContinuation(
                run->continuation, out.rejected_step_count,
                std::move(record), std::move(record_status)));
  }
  out.validated_run = std::move(run);
  return finish(std::move(out));
}

}  // namespace architrino::eom

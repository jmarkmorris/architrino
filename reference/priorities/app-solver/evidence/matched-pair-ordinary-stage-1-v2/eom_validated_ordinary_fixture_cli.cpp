// Focused fixture for gate O1 of the ordinary integration: the ordinary
// typed entry point evolve_native_coupled_histories with the validated
// far-step method selected. Emits JSON lines. Runs through the ordinary
// entry are written twice: in the accepted Stage 3 row format, from the
// driver certificate the entry returns, so the accepted checker and the
// reviewer's frozen brackets apply unchanged; and as one "ordinary" row with
// the ordinary view, counters and callbacks the ordinary caller observes.
// The row-format helpers below, from namespace vfs through emit_run, are
// copied unchanged from eom_validated_evolution_fixture_cli.cpp. c_f = 1.
//
// Usage: eom_validated_ordinary_fixture_cli [worker count]
#include "architrino/eom/ValidatedEvolution.hpp"

#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include "architrino/eom/ProviderTransport.hpp"
#include "architrino/eom/ValidatedOrdinaryBridge.hpp"

#include <cmath>
#include <functional>
#include <iostream>
#include <limits>
#include <memory>
#include <sstream>
#include <type_traits>

namespace eom = architrino::eom;
using Budgets = eom::ValidatedFarStepBudgets;
using Certificate = eom::ValidatedFarStepCertificate;
using Evidence = eom::ValidatedFarStepEvidence;
using Path = eom::ValidatedFarStepPath;
using Request = eom::ValidatedEvolutionRequest;
using Run = eom::ValidatedEvolutionCertificate;
using Ordinary = eom::NativeCoupledEvolutionRequest;
using OrdinaryRun = eom::NativeCoupledEvolutionCertificate;

// The bridge's continuation cannot be built by a caller either.
static_assert(!std::is_default_constructible_v<
                  eom::NativeValidatedContinuation>,
              "continuation must be issued by the bridge only");
static_assert(!std::is_constructible_v<
                  eom::NativeValidatedContinuation,
                  std::shared_ptr<const eom::ValidatedEvolutionContinuation>,
                  std::size_t>,
              "continuation must be issued by the bridge only");

namespace vfs {
inline std::string token(double value) {
  return eom::validated_far_step_number_token(value);
}
}  // namespace vfs

namespace {

const std::string kStep = "0.0078125";      // 1/128
const std::string kFine = "0.00390625";     // 1/256
const std::string kKappa = "0.001";
const Budgets kBudgets{1e-8, 1e-8};
// Worker count for every request and producer of this run: the optional
// second program argument. No output row depends on it.
std::size_t g_workers = 1;
// Directory for record files: the optional third program argument.
std::string g_record_directory;

std::string num(double value) { return vfs::token(value); }

std::string interval(const eom::Interval& value) {
  return "[" + num(value.lower()) + "," + num(value.upper()) + "]";
}

std::string vector3(const eom::IntervalVector& value) {
  return "[" + interval(value[0]) + "," + interval(value[1]) + "," +
      interval(value[2]) + "]";
}

std::string array3(const std::array<double, 3>& value) {
  return "[" + num(value[0]) + "," + num(value[1]) + "," + num(value[2]) + "]";
}

eom::CubicCoefficientTokens on_z(
    const std::string& c0, const std::string& c1 = "0",
    const std::string& c2 = "0", const std::string& c3 = "0") {
  return {{{"0", "0", "0", "0"}, {"0", "0", "0", "0"}, {c0, c1, c2, c3}}};
}

Path static_path(const std::string& id, const std::string& charge,
                 const std::string& z, const std::string& start = "-20",
                 const std::string& end = "0") {
  return {id, charge,
          eom::RetainedHistory(
              id + "-history",
              {eom::CubicHistorySegment(start, end, on_z(z))})};
}

void emit(const std::string& label, const std::string& step_label,
          const Certificate& c, const std::vector<Path>* next = nullptr,
          const std::string& extra = "") {
  std::cout << "{\"case\":\"" << label << "\",\"step\":\"" << step_label
            << "\"," << extra << "\"cause\":\"" << c.cause
            << "\",\"status\":\"" << c.status << "\",\"code\":\"" << c.code
            << "\",\"reason\":\"" << c.reason << "\",\"start\":\"" << c.start
            << "\",\"h\":\"" << c.step << "\",\"end\":\"" << c.end
            << "\",\"coupling\":\"" << c.coupling << "\",\"duration_cover\":"
            << num(c.duration_cover) << ",\"history_start\":"
            << num(c.history_start) << ",\"speed_upper\":"
            << num(c.speed_upper) << ",\"enclosure_iterations\":"
            << c.enclosure_iterations << ",\"published\":"
            << (c.status == "certified" ? "true" : "false")
            << ",\"evidence\":";
  if (c.evidence != nullptr) {
    std::cout << "{\"coupling\":\"" << c.evidence->coupling()
              << "\",\"step_start\":\"" << c.evidence->step_start()
              << "\",\"step_end\":\"" << c.evidence->step_end()
              << "\",\"members\":[";
    bool first = true;
    for (const auto& m : c.evidence->members()) {
      std::cout << (first ? "" : ",") << "{\"id\":\"" << m.path_id
                << "\",\"charge\":\"" << m.charge << "\",\"digest_before\":\""
                << m.digest_before << "\",\"digest_after\":\""
                << m.digest_after << "\"}";
      first = false;
    }
    std::cout << "]}";
  } else {
    std::cout << "null";
  }
  std::cout << ",\"local_errors\":[";
  bool first = true;
  for (const auto& e : c.local_errors) {
    std::cout << (first ? "" : ",") << "{\"path\":\"" << e.path_id
              << "\",\"position_error\":" << num(e.position_error)
              << ",\"velocity_error\":" << num(e.velocity_error)
              << ",\"position_errors\":" << array3(e.position_errors)
              << ",\"velocity_errors\":" << array3(e.velocity_errors) << "}";
    first = false;
  }
  std::cout << "],\"accounting\":{\"paths\":" << c.accounting.paths
            << ",\"self_excluded\":" << c.accounting.self_excluded
            << ",\"off_diagonal\":" << c.accounting.off_diagonal
            << ",\"individual_present\":" << c.accounting.individual_present
            << ",\"individual_absent\":" << c.accounting.individual_absent
            << ",\"grouped_members\":" << c.accounting.grouped_members
            << ",\"group_intervals\":" << c.accounting.group_intervals
            << "},\"groups\":[";
  first = true;
  for (const auto& g : c.groups) {
    std::cout << (first ? "" : ",") << "{\"receiver\":\"" << g.receiver
              << "\",\"leader\":\"" << g.leader << "\",\"follower\":\""
              << g.follower << "\",\"disposition\":\"" << g.disposition
              << "\",\"failure_code\":\"" << g.failure_code
              << "\",\"slab\":[\"" << g.slab_lower << "\",\""
              << g.slab_upper << "\"],\"cells\":" << g.cell_count
              << ",\"distance_floor\":" << num(g.distance_floor)
              << ",\"speed_upper\":" << num(g.speed_upper)
              << ",\"factor_floor\":" << num(g.factor_floor)
              << ",\"separation_upper\":" << num(g.separation_upper)
              << ",\"relative_speed_upper\":" << num(g.relative_speed_upper)
              << ",\"acceleration_upper\":" << num(g.acceleration_upper)
              << ",\"join_jump_upper\":" << num(g.join_jump_upper)
              << ",\"prefactor_upper\":" << num(g.prefactor_upper)
              << ",\"radius_upper\":" << num(g.radius_upper)
              << ",\"interval_width\":" << num(g.interval_width) << "}";
    first = false;
  }
  std::cout << "],\"pairs\":[";
  first = true;
  for (const auto& p : c.pairs) {
    std::cout << (first ? "" : ",") << "{\"receiver\":\"" << p.receiver
              << "\",\"source\":\"" << p.source << "\",\"state\":\""
              << p.state << "\",\"window\":[" << num(p.window_lower) << ","
              << num(p.window_upper) << "],\"distance\":["
              << num(p.distance_lower) << "," << num(p.distance_upper)
              << "],\"factor\":[" << num(p.factor_lower) << ","
              << num(p.factor_upper) << "]}";
    first = false;
  }
  std::cout << "],\"paths\":[";
  first = true;
  for (std::size_t a = 0; a < c.paths.size(); ++a) {
    const auto& p = c.paths[a];
    std::cout << (first ? "" : ",") << "{\"id\":\"" << p.id
              << "\",\"charge\":\"" << p.charge
              << "\",\"inherited_position\":" << vector3(p.inherited_position)
              << ",\"inherited_velocity\":" << vector3(p.inherited_velocity)
              << ",\"acceleration\":" << vector3(p.acceleration)
              << ",\"position_box\":" << vector3(p.position_box)
              << ",\"declared_position\":" << array3(p.declared_position)
              << ",\"declared_velocity\":" << array3(p.declared_velocity)
              << ",\"growth_position\":" << array3(p.growth_position)
              << ",\"growth_velocity\":" << array3(p.growth_velocity)
              << ",\"section_allowance_position\":"
              << array3(p.section_allowance_position)
              << ",\"section_allowance_velocity\":"
              << array3(p.section_allowance_velocity)
              << ",\"step_growth_position\":"
              << array3(p.step_growth_position)
              << ",\"step_growth_velocity\":"
              << array3(p.step_growth_velocity)
              << ",\"total_position\":" << array3(p.position_radius)
              << ",\"total_velocity\":" << array3(p.velocity_radius)
              << ",\"whole_step_slack\":" << num(p.whole_step_slack);
    if (p.segment.has_value() && c.status == "certified") {
      const auto& s = *p.segment;
      std::cout << ",\"coefficients\":[";
      for (std::size_t axis = 0; axis < 3; ++axis) {
        std::cout << (axis ? "," : "") << "[";
        for (std::size_t k = 0; k < 4; ++k) {
          std::cout << (k ? "," : "") << "\"" << s.coefficient_tokens()[axis][k]
                    << "\"";
        }
        std::cout << "]";
      }
      std::cout << "],\"position_error\":[\"" << s.position_error_tokens()[0]
                << "\",\"" << s.position_error_tokens()[1] << "\",\""
                << s.position_error_tokens()[2] << "\"],\"velocity_error\":[\""
                << s.velocity_error_tokens()[0] << "\",\""
                << s.velocity_error_tokens()[1] << "\",\""
                << s.velocity_error_tokens()[2] << "\"]";
      if (next != nullptr) {
        const auto state = (*next)[a].history.endpoint_state_hull();
        std::cout << ",\"end_position\":" << vector3(state.position)
                  << ",\"end_velocity\":" << vector3(state.velocity);
      }
    }
    std::cout << "}";
    first = false;
  }
  std::cout << "]}\n";
}

void note(const std::string& label, const std::string& outcome,
          const std::string& detail) {
  std::cout << "{\"case\":\"" << label << "\",\"outcome\":\"" << outcome
            << "\",\"detail\":\"" << detail << "\"}\n";
}


std::string axis_ledger(const eom::ValidatedAxisLedger& value) {
  return "{\"inherited\":" + array3(value.inherited) + ",\"increment\":" +
      array3(value.increment) + ",\"total\":" + array3(value.total) +
      ",\"section_allowance\":" + array3(value.section_allowance) +
      ",\"step_growth\":" + array3(value.step_growth) + "}";
}

std::string ledger_json(const std::vector<eom::ValidatedPathLedger>& ledger) {
  std::string out = "[";
  for (std::size_t i = 0; i < ledger.size(); ++i) {
    out += std::string(i ? "," : "") + "{\"path\":\"" + ledger[i].path_id +
        "\",\"position\":" + axis_ledger(ledger[i].position) +
        ",\"velocity\":" + axis_ledger(ledger[i].velocity) + "}";
  }
  return out + "]";
}

std::string digests_json(const std::vector<Path>& paths) {
  std::string out = "{";
  for (std::size_t i = 0; i < paths.size(); ++i) {
    out += std::string(i ? "," : "") + "\"" + paths[i].id + "\":\"" +
        eom::validated_history_digest(paths[i].history) + "\"";
  }
  return out + "}";
}

std::string evidence_json(const Evidence& evidence) {
  if (evidence == nullptr) return "null";
  std::string out = "{\"coupling\":\"" + evidence->coupling() +
      "\",\"step_start\":\"" + evidence->step_start() +
      "\",\"step_end\":\"" + evidence->step_end() + "\",\"members\":{";
  bool first = true;
  for (const auto& m : evidence->members()) {
    out += std::string(first ? "" : ",") + "\"" + m.path_id +
        "\":{\"charge\":\"" + m.charge + "\",\"digest_before\":\"" +
        m.digest_before + "\",\"digest_after\":\"" + m.digest_after + "\"}";
    first = false;
  }
  return out + "}}";
}

std::string groups_json(const std::string& policy,
                        const std::vector<eom::ValidatedFarStepGroup>& groups) {
  std::string out = "{\"policy\":\"" + policy + "\",\"groups\":[";
  for (std::size_t i = 0; i < groups.size(); ++i) {
    out += std::string(i ? "," : "") + "[\"" + groups[i].leader + "\",\"" +
        groups[i].follower + "\"]";
  }
  return out + "]}";
}

std::string continuation_json(
    const std::shared_ptr<const eom::ValidatedEvolutionContinuation>& value) {
  if (value == nullptr) return "null";
  const auto& s = value->state();
  std::string out = "{\"policy\":\"" + s.policy + "\",\"coupling\":\"" +
      s.coupling + "\",\"initial_step\":\"" + s.initial_step +
      "\",\"minimum_step\":\"" + s.minimum_step +
      "\",\"accepted_time\":\"" + s.accepted_time +
      "\",\"controller_step_size\":\"" + s.controller_step_size +
      "\",\"cooldown_remaining\":" + std::to_string(s.cooldown_remaining) +
      ",\"accepted_step_count\":" + std::to_string(s.accepted_step_count) +
      ",\"growth_cooldown_steps\":" +
      std::to_string(s.growth_cooldown_steps) + ",\"pairing\":" +
      groups_json(s.pair_policy, s.groups) + ",\"has_evidence\":" +
      (s.evidence != nullptr ? "true" : "false") + ",\"ledger\":" +
      ledger_json(s.ledger) + ",\"members\":{";
  for (std::size_t i = 0; i < s.members.size(); ++i) {
    out += std::string(i ? "," : "") + "\"" + s.members[i].path_id +
        "\":\"" + s.members[i].history_digest + "\"";
  }
  return out + "}}";
}

struct Observed {
  Run run;
  std::vector<std::pair<std::size_t, std::string>> callbacks;
};

// Emits attempts (all, or only the last accepted one) and one summary row.
void emit_run(const std::string& label, const Request& request,
              const Observed& observed, bool all_attempts) {
  const Run& run = observed.run;
  std::size_t last_accepted = run.attempts.size();
  for (std::size_t i = 0; i < run.attempts.size(); ++i) {
    if (run.attempts[i].disposition == "accepted") last_accepted = i;
  }
  for (std::size_t i = 0; i < run.attempts.size(); ++i) {
    if (!all_attempts && i != last_accepted) continue;
    const auto& attempt = run.attempts[i];
    const auto& atomic = attempt.atomic;
    std::ostringstream extra;
    extra << "\"attempt\":" << attempt.attempt_index << ",\"disposition\":\""
          << attempt.disposition << "\",\"controller_cause\":\""
          << attempt.cause << "\",\"atomic\":{\"schema\":\""
          << atomic.schema << "\",\"status\":\"" << atomic.status
          << "\",\"step_index\":" << atomic.step_index
          << ",\"attempted_start\":\"" << atomic.attempted_start
          << "\",\"attempted_end\":\"" << atomic.attempted_end
          << "\",\"accepted_time\":\"" << atomic.accepted_time
          << "\",\"failure_code\":\"" << atomic.failure_code
          << "\",\"evidence_status\":\"" << atomic.evidence_status
          << "\",\"integration_method\":\"" << atomic.integration_method
          << "\",\"reduction_policy\":\"" << atomic.reduction_policy
          << "\",\"publication_atomic\":"
          << (atomic.publication_atomic ? "true" : "false")
          << ",\"substeps\":" << atomic.substeps.size()
          << ",\"has_snapshot\":"
          << (atomic.accepted_snapshot.has_value() ||
                      atomic.recertification_snapshot.has_value()
                  ? "true" : "false")
          << ",\"local_errors\":" << atomic.local_errors.size()
          << ",\"published_equals_input\":";
    bool same = atomic.published_histories.size() ==
        atomic.input_history_fingerprints.size();
    for (std::size_t k = 0; same && k < atomic.published_histories.size();
         ++k) {
      same = atomic.published_histories[k]
                     .history.provenance_fingerprint() ==
          atomic.input_history_fingerprints[k].fingerprint;
    }
    extra << (same ? "true" : "false") << "},\"ledger\":"
          << ledger_json(attempt.ledger) << ",";
    emit(label, std::to_string(attempt.step_index + 1U), attempt.producer,
         nullptr, extra.str());
  }
  std::cout << "{\"case\":\"" << label << "\",\"summary\":true,\"schema\":\""
            << run.schema << "\",\"policy\":\"" << run.policy
            << "\",\"run_schema\":\"" << run.run.schema << "\",\"status\":\""
            << run.run.status << "\",\"halt_code\":\"" << run.run.halt_code
            << "\",\"halt_refusal_code\":\"" << run.halt_refusal_code
            << "\",\"halt_refusal_cause\":\"" << run.halt_refusal_cause
            << "\",\"halt_reason\":\"" << run.halt_reason
            << "\",\"continuation\":" << continuation_json(run.continuation)
            << ",\"input_continuation\":"
            << continuation_json(request.continuation)
            << ",\"start\":\"" << run.run.start_time
            << "\",\"requested_end\":\"" << run.run.requested_end_time
            << "\",\"accepted_end\":\"" << run.run.accepted_end_time
            << "\",\"initial_step\":\"" << request.initial_step
            << "\",\"minimum_step\":\"" << request.minimum_step
            << "\",\"coupling\":\"" << request.coupling
            << "\",\"pairing\":"
            << groups_json(request.pair_policy, request.groups)
            << ",\"increment_budget\":["
            << num(request.increment_budget.position) << ","
            << num(request.increment_budget.velocity) << "],\"total_budget\":"
            << (request.total_budget.has_value()
                    ? "[" + num(request.total_budget->position) + "," +
                          num(request.total_budget->velocity) + "]"
                    : std::string("null"))
            << ",\"accepted_steps\":" << run.run.accepted_step_count
            << ",\"rejected_steps\":" << run.run.rejected_step_count
            << ",\"run_step_records\":" << run.run.steps.size()
            << ",\"controller_step_size\":\"" << run.run.controller_step_size
            << "\",\"evidence_status\":\"" << run.run.evidence_status
            << "\",\"all_steps_atomic\":"
            << (run.run.all_steps_atomic ? "true" : "false")
            << ",\"evidence\":" << evidence_json(run.evidence)
            << ",\"input_evidence\":" << evidence_json(request.evidence)
            << ",\"ledger\":" << ledger_json(run.ledger)
            << ",\"digests\":" << digests_json(run.paths)
            << ",\"input_digests\":" << digests_json(request.paths)
            << ",\"end\":{";
  for (std::size_t i = 0; i < run.paths.size(); ++i) {
    const auto state = run.paths[i].history.endpoint_state_hull();
    std::cout << (i ? "," : "") << "\"" << run.paths[i].id
              << "\":{\"position\":" << vector3(state.position)
              << ",\"velocity\":" << vector3(state.velocity)
              << ",\"segments\":" << run.paths[i].history.segments().size()
              << ",\"end_token\":\""
              << run.paths[i].history.segments().back().t_end_token()
              << "\"}";
  }
  std::cout << "},\"callbacks\":[";
  for (std::size_t i = 0; i < observed.callbacks.size(); ++i) {
    std::cout << (i ? "," : "") << "[" << observed.callbacks[i].first << ",\""
              << observed.callbacks[i].second << "\"]";
  }
  std::cout << "],\"attempts\":[";
  for (std::size_t i = 0; i < run.attempts.size(); ++i) {
    const auto& attempt = run.attempts[i];
    std::cout << (i ? "," : "") << "[" << attempt.step_index << ","
              << attempt.attempt_index << ",\"" << attempt.producer.step
              << "\",\"" << attempt.producer.code << "\",\""
              << (attempt.cause.empty() ? attempt.producer.cause
                                        : attempt.cause)
              << "\",\"" << attempt.disposition
              << "\"]";
  }
  std::cout << "]}\n";
}

Request make(const std::string& id, std::vector<Path> paths,
             const std::string& start, const std::string& end,
             const std::string& initial, const std::string& minimum,
             const std::string& kappa = kKappa,
             const Budgets& budgets = kBudgets) {
  Request request;
  request.run_id = id;
  request.policy = eom::kValidatedFarStepEvolutionPolicy;
  request.paths = std::move(paths);
  request.start_time = start;
  request.end_time = end;
  request.initial_step = initial;
  request.minimum_step = minimum;
  request.coupling = kappa;
  request.increment_budget = budgets;
  request.worker_count = g_workers;
  return request;
}

Observed evolve(Request& request) {
  Observed observed;
  const auto user = request.accepted_step_callback;
  request.accepted_step_callback =
      [&observed, user](std::size_t index, const std::string& time) {
        observed.callbacks.emplace_back(index, time);
        if (user) user(index, time);
      };
  observed.run = eom::evolve_validated_far_step_histories(request);
  request.accepted_step_callback = user;
  return observed;
}

Observed run_case(const std::string& label, Request request,
                  bool all_attempts = true) {
  Observed observed = evolve(request);
  if (!label.empty()) emit_run(label, request, observed, all_attempts);
  return observed;
}

std::vector<Path> static_pair(const std::string& source_z = "10",
                              const std::string& start = "-20") {
  return {static_path("receiver", "1", "0", start),
          static_path("source", "1", source_z, start)};
}


// ---- Gate O1: the ordinary entry with the validated method selected ----

const std::string kBudgetToken = "1e-8";    // the accepted kBudgets
const std::string kRoomyToken = "1e-6";     // the accepted grouping budget

std::vector<Path> three_static() {
  return {static_path("receiver", "1", "0"), static_path("plus", "1", "10"),
          static_path("minus", "-1", "11")};
}

// A receiver at rest and a source receding at speed 0.5: the accepted
// controller population, with a positive coupling.
std::vector<Path> receding() {
  return {static_path("receiver", "1", "0"),
          Path{"source", "1",
               eom::RetainedHistory(
                   "source-history",
                   {eom::CubicHistorySegment("-20", "0",
                                             on_z("-9", "0.5"))})}};
}

// A source moving at speed 2, above the field speed.
std::vector<Path> above_wake_speed() {
  return {static_path("receiver", "1", "0"),
          Path{"source", "1",
               eom::RetainedHistory(
                   "source-history",
                   {eom::CubicHistorySegment("-20", "0", on_z("10", "2"))})}};
}

Ordinary selected(const std::string& id, std::vector<Path> paths,
                  const std::string& end, const std::string& step = kStep,
                  const std::string& budget = kBudgetToken) {
  Ordinary r;
  r.run_id = id;
  for (auto& p : paths) r.paths.push_back({p.id, p.charge, p.history});
  r.start_time = "0";
  r.end_time = end;
  r.initial_step = step;
  r.minimum_step = step;
  r.field_speed = "1";
  r.coupling = kKappa;
  r.position_increment_budget = budget;
  r.velocity_increment_budget = budget;
  r.thread_count = g_workers;
  r.integration_method = eom::kValidatedFarStepEvolutionPolicy;
  return r;
}

Ordinary grouped(Ordinary r) {
  r.validated.pair_policy = eom::kValidatedWholeStepPairPolicy;
  r.validated.groups = {{"plus", "minus"}};
  return r;
}

// The resumption of `from` as an ordinary caller does it: published
// histories, issued evidence, the returned continuation and the returned
// cumulative counters.
Ordinary resumed(const std::string& id, const OrdinaryRun& from, Ordinary like) {
  like.run_id = id;
  like.paths.clear();
  for (const auto& p : from.validated_run->paths) {
    like.paths.push_back({p.id, p.charge, p.history});
  }
  like.validated_population_evidence = from.validated_run->evidence;
  like.validated.continuation = from.validated_continuation;
  like.initial_accepted_step_count = from.accepted_step_count;
  like.initial_rejected_step_count = from.rejected_step_count;
  like.start_time = from.accepted_end_time;
  like.cancellation_requested = {};
  return like;
}

struct OrdinaryObserved {
  OrdinaryRun run;
  std::vector<std::pair<std::size_t, std::string>> callbacks;
};

std::string quoted(const std::string& value) { return "\"" + value + "\""; }

// Runs `request` through the ordinary entry and emits the two row families.
OrdinaryObserved ordinary_case(const std::string& label, Ordinary request) {
  OrdinaryObserved observed;
  const auto user = request.accepted_step_callback;
  request.accepted_step_callback =
      [&observed, user](std::size_t count, const std::string& time) {
        observed.callbacks.emplace_back(count, time);
        if (user) user(count, time);
      };
  observed.run = eom::evolve_native_coupled_histories(request);
  const OrdinaryRun& run = observed.run;
  if (run.validated_run != nullptr) {
    // The accepted row format, from the driver certificate and the driver
    // request the bridge made. Its callbacks are the driver's zero-based
    // ordinals, recovered from the ordinary counts as count - 1; the
    // ordinary row below carries the counts as observed.
    Request translated = eom::native_validated_request(request);
    translated.continuation = request.validated.continuation
        ? request.validated.continuation->driver() : nullptr;
    Observed driver_view;
    driver_view.run = *run.validated_run;
    for (const auto& [count, time] : observed.callbacks) {
      driver_view.callbacks.emplace_back(count - 1U, time);
    }
    emit_run(label, translated, driver_view, true);
  }
  std::cout << "{\"case\":\"" << label << "\",\"ordinary\":true"
            << ",\"schema\":" << quoted(run.schema)
            << ",\"status\":" << quoted(run.status)
            << ",\"halt_code\":" << quoted(run.halt_code)
            << ",\"evidence_status\":" << quoted(run.evidence_status)
            << ",\"start\":" << quoted(run.start_time)
            << ",\"requested_end\":" << quoted(run.requested_end_time)
            << ",\"accepted_end\":" << quoted(run.accepted_end_time)
            << ",\"accepted_steps\":" << run.accepted_step_count
            << ",\"rejected_steps\":" << run.rejected_step_count
            << ",\"initial_accepted\":" << request.initial_accepted_step_count
            << ",\"initial_rejected\":" << request.initial_rejected_step_count
            << ",\"controller_step_size\":" << quoted(run.controller_step_size)
            << ",\"cost_cooldown\":"
            << run.controller_certificate_cost_cooldown_remaining
            << ",\"growth_headroom\":"
            << run.controller_consecutive_growth_headroom_steps
            << ",\"all_steps_atomic\":"
            << (run.all_steps_atomic ? "true" : "false")
            << ",\"memory_budget\":" << run.memory_budget_bytes
            << ",\"memory_estimate\":" << run.memory_estimate_bytes
            << ",\"has_validated_run\":"
            << (run.validated_run != nullptr ? "true" : "false")
            << ",\"has_continuation\":"
            << (run.validated_continuation != nullptr ? "true" : "false")
            << ",\"continuation_accepted\":"
            << (run.validated_continuation
                    ? std::to_string(
                          run.validated_continuation->accepted_step_count())
                    : std::string("null"))
            << ",\"continuation_rejected\":"
            << (run.validated_continuation
                    ? std::to_string(
                          run.validated_continuation->rejected_step_count())
                    : std::string("null"))
            << ",\"step_indices\":[";
  for (std::size_t i = 0; i < run.steps.size(); ++i) {
    std::cout << (i ? "," : "") << run.steps[i].step_index;
  }
  std::cout << "],\"step_status\":[";
  for (std::size_t i = 0; i < run.steps.size(); ++i) {
    std::cout << (i ? "," : "") << quoted(run.steps[i].status);
  }
  std::cout << "],\"callbacks\":[";
  for (std::size_t i = 0; i < observed.callbacks.size(); ++i) {
    std::cout << (i ? "," : "") << "[" << observed.callbacks[i].first << ","
              << quoted(observed.callbacks[i].second) << "]";
  }
  std::cout << "],\"digests\":{";
  for (std::size_t i = 0; i < run.histories.size(); ++i) {
    std::cout << (i ? "," : "") << quoted(run.histories[i].path_id) << ":"
              << quoted(eom::validated_history_digest(run.histories[i].history));
  }
  std::cout << "},\"input_digests\":{";
  for (std::size_t i = 0; i < request.paths.size(); ++i) {
    std::cout << (i ? "," : "") << quoted(request.paths[i].path_id) << ":"
              << quoted(eom::validated_history_digest(request.paths[i].history));
  }
  std::cout << "}}\n";
  return observed;
}

// The direct driver run of the same selected request, in the accepted
// format, for parity.
Observed direct_case(const std::string& label, const Ordinary& request) {
  Request translated = eom::native_validated_request(request);
  translated.continuation = request.validated.continuation
      ? request.validated.continuation->driver() : nullptr;
  return run_case(label, translated);
}

void refused(const std::string& label, const std::function<void()>& action) {
  try {
    action();
    note(label, "NOT-REFUSED", "");
  } catch (const eom::EquationAdmissionError& error) {
    note(label, "refused:" + error.code(), error.what());
  } catch (const std::exception& error) {
    note(label, "refused:invalid_argument", error.what());
  }
}

void refused_evolve(const std::string& label, const Ordinary& request) {
  refused(label, [&] { (void)eom::evolve_native_coupled_histories(request); });
}

int known_ordinary_cases() {
  // The accepted known cases, direct, before any target.
  note("K0-half", eom::validated_evolution_half("0.0078125") + " " +
                      eom::validated_evolution_half("2") + " " +
                      eom::validated_evolution_half("0.0002987") + " " +
                      eom::validated_evolution_half("10"),
       "expected 0.00390625 1 0.00014935 5");
  note("K0-difference",
       eom::validated_evolution_difference("10000000000.0008961",
                                           "10000000000.0005974") +
           " " + eom::validated_evolution_difference("0.02", "0.015625"),
       "expected 0.0002987 0.004375");
  run_case("K1-static", make("K1", static_pair(), "0", "0.015625", kStep,
                             kStep));
  run_case("K2-three-path",
           make("K2", three_static(), "0", "0.03125", kStep, kStep));
  // The ordinary selection, known: the ordinary controller runs and no
  // validated state is returned.
  {
    Ordinary r = selected("o-default", static_pair(), "0.015625");
    r.integration_method = eom::kOrdinaryIntegrationSelection;
    r.position_increment_budget.clear();
    r.velocity_increment_budget.clear();
    ordinary_case("K-ordinary-selection", r);
  }
  return 0;
}

int target_cases() {
  // The accepted K1 and K2 through the ordinary entry.
  ordinary_case("O-K1-static", selected("O-K1", static_pair(), "0.015625"));
  ordinary_case("O-K2-three-path",
                selected("O-K2", three_static(), "0.03125"));
  // Ungrouped and grouped, with the accepted grouping budget, and their
  // direct driver runs.
  const Ordinary plain =
      selected("o-plain", three_static(), "0.03125", kStep, kRoomyToken);
  ordinary_case("O-three-path-ungrouped", plain);
  direct_case("D-three-path-ungrouped", plain);
  const Ordinary pair = grouped(plain);
  const auto whole = ordinary_case("O-three-path-grouped", pair);
  direct_case("D-three-path-grouped", pair);
  // Refinement, grouped.
  ordinary_case("O-three-path-grouped-fine",
                grouped(selected("o-fine", three_static(), "0.03125", kFine,
                                 kRoomyToken)));
  // Cancellation at the second callback, then resumption with another
  // worker count.
  {
    Ordinary cut = pair;
    cut.run_id = "o-cut";
    auto seen = std::make_shared<std::size_t>(0U);
    cut.accepted_step_callback = [seen](std::size_t count, const std::string&) {
      *seen = count;
    };
    cut.cancellation_requested = [seen] { return *seen >= 2U; };
    const auto first = ordinary_case("O-grouped-cancelled-after-two", cut);
    Ordinary rest = resumed("o-rest", first.run, pair);
    rest.thread_count = g_workers == 1U ? 3U : 1U;
    ordinary_case("O-grouped-resumed", rest);
  }
  // The diagnostic accepted-step limit applies per invocation.
  {
    Ordinary one = pair;
    one.run_id = "o-limit";
    one.diagnostic_maximum_accepted_steps = 1;
    const auto a = ordinary_case("O-limit-first", one);
    Ordinary next = resumed("o-limit-2", a.run, pair);
    next.diagnostic_maximum_accepted_steps = 1;
    const auto b = ordinary_case("O-limit-second", next);
    Ordinary last = resumed("o-limit-3", b.run, pair);
    last.diagnostic_maximum_accepted_steps = 2;
    ordinary_case("O-limit-reaches-end", last);
  }
  // Rejections are cumulative across a resumption: the receding source
  // with a long initial step retries shorter steps.
  {
    Ordinary adaptive = selected("o-adaptive", receding(), "3", "1.5",
                                 kRoomyToken);
    adaptive.minimum_step = "0.0001";
    auto seen = std::make_shared<std::size_t>(0U);
    Ordinary cut = adaptive;
    cut.accepted_step_callback = [seen](std::size_t count, const std::string&) {
      *seen = count;
    };
    cut.cancellation_requested = [seen] { return *seen >= 3U; };
    const auto first = ordinary_case("O-adaptive-cancelled-after-three", cut);
    const auto second = ordinary_case(
        "O-adaptive-resumed", resumed("o-adaptive-2", first.run, adaptive));
    ordinary_case("O-adaptive-uninterrupted", adaptive);
    // Restart counters that differ from the continuation's are refused.
    Ordinary wrong = resumed("o-adaptive-w", first.run, adaptive);
    wrong.initial_rejected_step_count += 1U;
    refused_evolve("N-restart-rejected-count-differs", wrong);
    wrong = resumed("o-adaptive-w2", first.run, adaptive);
    wrong.initial_accepted_step_count = 0U;
    refused_evolve("N-restart-accepted-count-differs", wrong);
    Ordinary fresh = adaptive;
    fresh.initial_accepted_step_count = 3U;
    refused_evolve("N-restart-count-without-continuation", fresh);
    (void)second;
  }
  // Unsupported origins are refused by the validated owner's own step
  // hypotheses before every early return (O1-R1): a source above wake
  // speed, a receiver above wake speed, coincident paths, and controls whose
  // increment budget admits no step at all.
  {
    struct Origin {
      std::string name;
      Ordinary request;
    };
    Ordinary moving_receiver = selected("o-r125", receding(), "0.0078125");
    moving_receiver.paths[0] = {
        "receiver", "1",
        eom::RetainedHistory("receiver-history",
                             {eom::CubicHistorySegment("-20", "0",
                                                       on_z("0", "1.25"))})};
    Ordinary coincident = selected("o-coincident", static_pair("0"),
                                   "0.0078125");
    coincident.minimum_step = "0.00000095367431640625";
    std::vector<Origin> origins{
        {"source-above-wake-speed",
         selected("o-fast", above_wake_speed(), "0.015625")},
        {"receiver-above-wake-speed", moving_receiver},
        {"coincident-paths", coincident},
        {"budget-admits-no-step",
         grouped(selected("o-tight", three_static(), "0.03125"))}};
    for (auto& [name, base] : origins) {
      refused_evolve("N-origin-" + name, base);
      Ordinary cancelled = base;
      cancelled.cancellation_requested = [] { return true; };
      refused_evolve("N-origin-" + name + "-cancelled", cancelled);
      Ordinary tiny = base;
      tiny.memory_budget_bytes = 1;
      refused_evolve("N-origin-" + name + "-tiny-memory", tiny);
      Ordinary limited = base;
      limited.diagnostic_maximum_accepted_steps = 1;
      refused_evolve("N-origin-" + name + "-limit", limited);
    }
  }
  // A working-set bound that cannot be established is refused.
  {
    Ordinary huge = selected("o-no-bound", three_static(), "1",
                             "0.000000000000000000000000000000000000000000001");
    refused_evolve("N-no-finite-resource-bound", huge);
  }
  // The driver's own admission through the ordinary entry: evidence issued
  // for another population, and a continuation whose declaration differs.
  {
    const auto other = ordinary_case(
        "O-K1-for-evidence", selected("o-k1-ev", static_pair(), "0.0078125"));
    Ordinary foreign = grouped(
        selected("o-foreign", three_static(), "0.03125", kStep, kRoomyToken));
    foreign.validated_population_evidence = other.run.validated_run->evidence;
    ordinary_case("N-evidence-for-another-population", foreign);
    foreign.run_id = "o-foreign-tiny";
    foreign.memory_budget_bytes = 1;
    ordinary_case("N-evidence-for-another-population-tiny-memory", foreign);
    foreign.memory_budget_bytes = std::numeric_limits<std::uint64_t>::max();
    foreign.cancellation_requested = [] { return true; };
    ordinary_case("N-evidence-for-another-population-cancelled", foreign);
    Ordinary cut = grouped(
        selected("o-g-cut", three_static(), "0.03125", kStep, kRoomyToken));
    cut.diagnostic_maximum_accepted_steps = 2;
    const auto half = ordinary_case("O-grouped-two-steps", cut);
    Ordinary undeclared = resumed(
        "o-undeclared", half.run,
        selected("o-u", three_static(), "0.03125", kStep, kRoomyToken));
    ordinary_case("N-continuation-declaration-removed", undeclared);
  }
  // Early returns of an admitted population.
  {
    Ordinary cancelled = pair;
    cancelled.run_id = "o-cancel-first";
    cancelled.cancellation_requested = [] { return true; };
    ordinary_case("K-cancelled-before-first-attempt", cancelled);
    Ordinary tiny = pair;
    tiny.run_id = "o-tiny";
    tiny.memory_budget_bytes = 1;
    const auto halted = ordinary_case("K-memory-budget-one-byte", tiny);
    const std::uint64_t estimate = halted.run.memory_estimate_bytes;
    Ordinary exact = pair;
    exact.run_id = "o-exact-budget";
    exact.memory_budget_bytes = estimate;
    ordinary_case("K-memory-budget-equal-to-estimate", exact);
    exact.run_id = "o-below-budget";
    exact.memory_budget_bytes = estimate - 1U;
    ordinary_case("K-memory-budget-one-below-estimate", exact);
    // A resumed run over budget keeps its counters and returns no new
    // continuation.
    Ordinary resumed_tiny = resumed("o-resumed-tiny", whole.run, pair);
    resumed_tiny.end_time = "0.0625";
    resumed_tiny.memory_budget_bytes = 1;
    ordinary_case("K-resumed-memory-budget-one-byte", resumed_tiny);
    Ordinary ceiling = pair;
    ceiling.run_id = "o-maximum-step";
    ceiling.maximum_step = kStep;
    ordinary_case("K-maximum-step-equal-to-initial", ceiling);
  }
  return 0;
}

int refusal_cases() {
  const Ordinary base =
      grouped(selected("o-n", three_static(), "0.03125", kStep, kRoomyToken));
  {
    Ordinary r = base;
    r.integration_method = "validated";
    refused_evolve("N-unknown-integration-method", r);
    r.integration_method = "";
    refused_evolve("N-empty-integration-method", r);
    r = base;
    r.integration_method = eom::kOrdinaryIntegrationSelection;
    refused_evolve("N-validated-controls-under-ordinary-groups", r);
    r.validated = {};
    r.validated.max_attempts_per_step = 5;
    refused_evolve("N-validated-controls-under-ordinary-attempts", r);
  }
  // Ordinary admission still applies under the selection.
  {
    Ordinary r = base;
    r.end_time = r.start_time;
    refused_evolve("N-ordinary-admission-zero-length", r);
    r = base;
    r.run_id.clear();
    refused_evolve("N-ordinary-admission-empty-run-id", r);
    r = base;
    r.start_time = "1";
    r.end_time = "1.03125";
    refused_evolve("N-ordinary-admission-history-end", r);
    r = base;
    r.memory_budget_bytes = 0;
    refused_evolve("N-ordinary-admission-zero-memory-budget", r);
    r = base;
    r.coupling = "0";
    refused_evolve("N-ordinary-admission-zero-coupling", r);
  }
  // Budget tokens.
  for (const auto& [name, token] :
       std::vector<std::pair<std::string, std::string>>{
           {"empty", ""}, {"zero", "0"}, {"negative", "-1e-6"},
           {"overflow", "1e400"}, {"nan", "nan"}, {"inf", "inf"},
           {"text", "x"}}) {
    Ordinary r = base;
    r.position_increment_budget = token;
    refused_evolve("N-position-budget-" + name, r);
    r = base;
    r.velocity_increment_budget = token;
    refused_evolve("N-velocity-budget-" + name, r);
  }
  {
    Ordinary r = base;
    r.validated.total_position_budget = "1";
    refused_evolve("N-total-budget-one-field", r);
    r.validated.total_velocity_budget = "0";
    refused_evolve("N-total-budget-zero", r);
  }
  // Every ordinary-only control off its default, by name.
  using Change = std::function<void(Ordinary&)>;
  const std::vector<std::pair<std::string, Change>> controls{
      {"joint_state_fallback_already_applied",
       [](Ordinary& r) { r.joint_state_fallback_already_applied = true; }},
      {"root_tolerance", [](Ordinary& r) { r.root_tolerance = "1e-9"; }},
      {"transmitter_factor_floor",
       [](Ordinary& r) { r.transmitter_factor_floor = "1e-20"; }},
      {"acceleration_tolerance",
       [](Ordinary& r) { r.acceleration_tolerance = "1e-6"; }},
      {"far_field_enclosure_fraction",
       [](Ordinary& r) { r.far_field_enclosure_fraction = "0.5"; }},
      {"use_far_field_enclosure_in_evolution",
       [](Ordinary& r) { r.use_far_field_enclosure_in_evolution = false; }},
      {"matched_pair_enclosure_policy",
       [](Ordinary& r) {
         r.matched_pair_enclosure_policy =
             eom::kMatchedPairPolicySnapshotPiecewiseTube;
       }},
      {"chart_policy", [](Ordinary& r) { r.chart_policy = "finite_width"; }},
      {"causal_width", [](Ordinary& r) { r.causal_width = "0.1"; }},
      {"position_tolerance",
       [](Ordinary& r) { r.position_tolerance = "1e-6"; }},
      {"certified_budget_schema",
       [](Ordinary& r) { r.certified_budget_schema = "borg_certified_budget/v1"; }},
      {"event_impulse_budget",
       [](Ordinary& r) { r.event_impulse_budget = "1e-6"; }},
      {"root_max_cells", [](Ordinary& r) { r.root_max_cells = 10; }},
      {"maximum_mpfr_bits", [](Ordinary& r) { r.maximum_mpfr_bits = 1024; }},
      {"max_correction_iterations",
       [](Ordinary& r) { r.max_correction_iterations = 3; }},
      {"max_step_attempts", [](Ordinary& r) { r.max_step_attempts = 5; }},
      {"max_rejected_steps", [](Ordinary& r) { r.max_rejected_steps = 0; }},
      {"use_adaptive_step_growth",
       [](Ordinary& r) { r.use_adaptive_step_growth = true; }},
      {"initial_consecutive_growth_headroom_steps",
       [](Ordinary& r) { r.initial_consecutive_growth_headroom_steps = 1; }},
      {"use_continuous_adaptive_step",
       [](Ordinary& r) { r.use_continuous_adaptive_step = true; }},
      {"use_synchronized_multirate_publication",
       [](Ordinary& r) { r.use_synchronized_multirate_publication = true; }},
      {"use_quarter_step_publication",
       [](Ordinary& r) { r.use_quarter_step_publication = true; }},
      {"use_certificate_cost_feedback",
       [](Ordinary& r) { r.use_certificate_cost_feedback = true; }},
      {"certificate_cost_initial_cooldown_steps",
       [](Ordinary& r) { r.certificate_cost_initial_cooldown_steps = 1; }},
      {"use_analytic_pinned_fold",
       [](Ordinary& r) { r.use_analytic_pinned_fold = false; }},
      {"use_certified_traversal",
       [](Ordinary& r) { r.use_certified_traversal = false; }},
      {"retain_diagnostic_candidate_histories",
       [](Ordinary& r) { r.retain_diagnostic_candidate_histories = true; }},
      {"allow_pending_finite_width_exit",
       [](Ordinary& r) { r.allow_pending_finite_width_exit = true; }},
      {"adjudicated_finite_width_pairs",
       [](Ordinary& r) {
         r.adjudicated_finite_width_pairs = {{"receiver", "plus"}};
       }},
      {"failed_substep_candidate_callback",
       [](Ordinary& r) {
         r.failed_substep_candidate_callback =
             [](const std::string&, const std::string&, const std::string&,
                std::size_t, const std::vector<eom::NativePublishedPath>&,
                const std::map<std::string, eom::JointAffineRetainedHistory>&) {
             };
       }},
      {"surface_geometry",
       [](Ordinary& r) { r.surface_geometry = eom::SurfaceGeometryDefinition{}; }},
      {"surface_numerics",
       [](Ordinary& r) { r.surface_numerics.maximum_depth += 1U; }},
      {"continuation_histories",
       [](Ordinary& r) {
         r.continuation_histories.push_back(
             {r.paths[0].path_id, r.paths[0].history});
       }},
      {"equation_selection",
       [](Ordinary& r) {
         eom::EquationSelection s;
         s.speed_domain = "strict";
         r.equation_selection = s;
       }},
      {"maximum_step", [](Ordinary& r) { r.maximum_step = "0.015625"; }},
  };
  for (const auto& [name, change] : controls) {
    Ordinary r = base;
    change(r);
    refused_evolve("N-control-" + name, r);
  }
  {
    Ordinary r = base;
    r.equation_selection = eom::EquationSelection{};
    ordinary_case("K-equation-selection-canonical-default", r);
  }
  // Entry points that do not run the method refuse it before computing.
  std::vector<eom::NativePublishedPath> histories;
  for (const auto& p : base.paths) histories.push_back({p.path_id, p.history});
  refused("N-entry-atomic-step", [&] {
    (void)eom::certify_native_atomic_coupled_step(base, histories, 0, "0",
                                                  kStep);
  });
  refused("N-entry-acceleration-snapshot", [&] {
    (void)eom::certify_native_acceleration_snapshot(base, histories, "0");
  });
  refused("N-entry-reusable-start-snapshot", [&] {
    const eom::NativeAccelerationSnapshotCertificate snapshot{};
    (void)eom::evolve_native_coupled_histories(base, &snapshot);
  });
  const OrdinaryRun done = eom::evolve_native_coupled_histories(base);
  refused("N-entry-v7-checkpoint-create", [&] {
    (void)eom::create_native_evolution_checkpoint(base, done);
  });
  refused("N-entry-v7-checkpoint-resume", [&] {
    (void)eom::resume_native_coupled_histories(
        base, eom::NativeEvolutionCheckpoint{}, "0.0625");
  });
  refused("N-entry-v8-provider-checkpoint-create", [&] {
    (void)eom::create_provider_checkpoint(base, done);
  });
  refused("N-entry-v8-provider-checkpoint-resume", [&] {
    (void)eom::resume_provider_checkpoint(base, "{}", "0.0625");
  });
  return 0;
}

}  // namespace

int main(int argc, char** argv) {
  if (argc > 1) g_workers = std::stoul(argv[1]);
  try {
    known_ordinary_cases();
    target_cases();
    refusal_cases();
  } catch (const std::exception& error) {
    std::cout << "{\"case\":\"FATAL\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 3;
  }
  return 0;
}

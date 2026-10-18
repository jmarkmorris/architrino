// Focused fixture for gate O2 of the ordinary integration: the typed v9
// validated provider checkpoint, eom_provider_checkpoint/v9, with its
// generating record carried in the sealed ordinary continuation. Emits JSON
// lines. Runs through the ordinary entry, including every resumed leg, are
// written in the accepted Stage 3 row format and as one "ordinary" row, as
// in the O1 fixture, whose helpers from namespace vfs through
// known_ordinary_cases are copied unchanged below. Checkpoint operations are
// written as "persist" rows; refusals as notes. c_f = 1.
//
// Usage: eom_validated_persistence_fixture_cli [worker count] [output dir]
#include "architrino/eom/ValidatedEvolution.hpp"

#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include "architrino/eom/ProviderTransport.hpp"
#include "architrino/eom/ValidatedOrdinaryBridge.hpp"
#include "architrino/eom/ValidatedRunRecord.hpp"

#include <boost/json.hpp>

#include <algorithm>
#include <cmath>
#include <fstream>
#include <functional>
#include <iostream>
#include <iterator>
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

static_assert(!std::is_default_constructible_v<
                  eom::NativeValidatedContinuation>,
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

// ---- Gate O2: typed v9 persistence of the validated method ----

namespace json = boost::json;

std::string g_output_directory = ".";
const std::string kEnd = "0.0625";  // eight steps of 1/128

json::value sorted_json(const json::value& v) {
  if (v.is_object()) {
    std::vector<std::string> names;
    for (const auto& e : v.as_object()) names.emplace_back(e.key());
    std::sort(names.begin(), names.end());
    json::object o;
    for (const auto& name : names) o[name] = sorted_json(v.as_object().at(name));
    return o;
  }
  if (v.is_array()) {
    json::array a;
    for (const auto& e : v.as_array()) a.push_back(sorted_json(e));
    return a;
  }
  return v;
}

std::string canonical_json(const json::value& v) {
  return json::serialize(sorted_json(v));
}

// Recomputes an envelope's stored digest, as anyone can.
std::string reseal(json::object o) {
  o.erase("digest");
  const std::string digest = eom::equation_identity_sha256(canonical_json(o));
  o["digest"] = digest;
  return canonical_json(o);
}

json::object envelope(const std::string& text) {
  return json::parse(text).as_object();
}

// Replaces the envelope's record by `record`, with its identity claim, and
// reseals the envelope.
std::string with_record(const std::string& text, const std::string& record) {
  json::object o = envelope(text);
  json::object state = o.at("providerState").as_object();
  state["record"] = record;
  state["recordIdentity"] = eom::validated_run_record_identity(record);
  o["providerState"] = state;
  return reseal(o);
}

std::string record_of(const std::string& text) {
  return std::string(
      envelope(text).at("providerState").as_object().at("record").as_string());
}

std::string replaced_once(const std::string& text, const std::string& from,
                          const std::string& to) {
  const auto at = text.find(from);
  if (at == std::string::npos) throw std::runtime_error("edit target absent: " + from);
  std::string out = text;
  out.replace(at, from.size(), to);
  return out;
}

std::string sha(const std::string& bytes) {
  return eom::equation_identity_sha256(bytes);
}

// The ordinary and accepted-format rows of a certificate the ordinary entry
// returned for `request`, as ordinary_case writes them.
void emit_ordinary(const std::string& label, const Ordinary& request,
                   const OrdinaryRun& run,
                   const std::vector<std::pair<std::size_t, std::string>>& callbacks) {
  if (run.validated_run != nullptr) {
    Request translated = eom::native_validated_request(request);
    translated.continuation = request.validated.continuation
        ? request.validated.continuation->driver() : nullptr;
    Observed driver_view;
    driver_view.run = *run.validated_run;
    for (const auto& [count, time] : callbacks) {
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
            << ",\"record_status\":"
            << quoted(run.validated_continuation
                          ? run.validated_continuation->record_status() : "")
            << ",\"step_indices\":[";
  for (std::size_t i = 0; i < run.steps.size(); ++i) {
    std::cout << (i ? "," : "") << run.steps[i].step_index;
  }
  std::cout << "],\"step_status\":[";
  for (std::size_t i = 0; i < run.steps.size(); ++i) {
    std::cout << (i ? "," : "") << quoted(run.steps[i].status);
  }
  std::cout << "],\"callbacks\":[";
  for (std::size_t i = 0; i < callbacks.size(); ++i) {
    std::cout << (i ? "," : "") << "[" << callbacks[i].first << ","
              << quoted(callbacks[i].second) << "]";
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
}

// Creates the v9 checkpoint of `run` and writes one persist row.
std::string checkpoint(const std::string& label, const Ordinary& original,
                       const OrdinaryRun& run) {
  const std::string text =
      eom::create_validated_provider_checkpoint(original, run);
  const json::object o = envelope(text);
  const std::string record = record_of(text);
  std::cout << "{\"case\":\"" << label << "\",\"persist\":\"create\""
            << ",\"bytes\":" << text.size() << ",\"sha256\":" << quoted(sha(text))
            << ",\"schema\":" << json::serialize(o.at("schema"))
            << ",\"accepted_time\":" << json::serialize(o.at("acceptedTime"))
            << ",\"accepted_count\":" << json::serialize(o.at("acceptedCount"))
            << ",\"rejected_count\":" << json::serialize(o.at("rejectedCount"))
            << ",\"record_identity\":" << quoted(eom::validated_run_record_identity(record))
            << ",\"record_bytes\":" << record.size()
            << ",\"resealed_equals_written\":"
            << (reseal(o) == text ? "true" : "false")
            << ",\"has_evidence_key\":"
            << (text.find("evidence") != std::string::npos ? "true" : "false")
            << ",\"has_continuation_key\":"
            << (text.find("continuation") != std::string::npos ? "true" : "false")
            << "}\n";
  return text;
}

struct Resumed {
  eom::ValidatedProviderResume result;
  std::vector<std::pair<std::size_t, std::string>> callbacks;
};

// Resumes `text` with the caller's original request and writes the resume
// row and the resumed leg's rows.
Resumed resume(const std::string& label, Ordinary original,
               const std::string& text, const std::string& end,
               std::optional<std::size_t> workers = std::nullopt,
               std::optional<std::string> expected = std::nullopt) {
  Resumed out;
  original.accepted_step_callback =
      [&out](std::size_t count, const std::string& time) {
        out.callbacks.emplace_back(count, time);
      };
  out.result = eom::resume_validated_provider_checkpoint(original, text, end,
                                                         workers, expected);
  const auto& r = out.result;
  std::cout << "{\"case\":\"" << label << "\",\"persist\":\"resume\""
            << ",\"identity_basis\":" << quoted(r.identity_basis)
            << ",\"record_identity\":" << quoted(r.record_identity)
            << ",\"compared_fields\":" << r.compared_fields.size()
            << ",\"replayed_legs\":" << r.replayed_legs
            << ",\"replayed_steps\":" << r.replayed_steps
            << ",\"replayed_rejected_steps\":" << r.replayed_rejected_steps
            << ",\"worker_count\":" << r.worker_count
            << ",\"resumed_from\":" << quoted(r.request.start_time)
            << ",\"initial_accepted\":" << r.request.initial_accepted_step_count
            << ",\"initial_rejected\":" << r.request.initial_rejected_step_count
            << ",\"replay_step_bound\":" << r.replay_step_bound
            << ",\"replay_bound_bytes\":" << r.replay_bound_bytes
            << ",\"legs\":[";
  const auto claims = eom::read_validated_run_record(record_of(text));
  for (std::size_t i = 0; claims.record && i < claims.record->legs().size(); ++i) {
    const auto& leg = claims.record->legs()[i];
    std::cout << (i ? "," : "") << "[" << quoted(leg.end_time) << ","
              << leg.max_accepted_steps << "]";
  }
  std::cout << "],\"origin_time\":"
            << quoted(claims.record ? claims.record->origin_time() : "")
            << ",\"minimum_step\":" << quoted(original.minimum_step)
            << ",\"requested_end\":" << quoted(end) << "}\n";
  emit_ordinary(label, r.request, r.run, out.callbacks);
  return out;
}

void resume_refused(const std::string& label, const Ordinary& original,
                    const std::string& text, const std::string& end,
                    std::optional<std::size_t> workers = std::nullopt,
                    std::optional<std::string> expected = std::nullopt) {
  refused(label, [&] {
    (void)eom::resume_validated_provider_checkpoint(original, text, end,
                                                    workers, expected);
  });
}

// An ordinary run with its callbacks, emitted.
OrdinaryObserved run_emit(const std::string& label, Ordinary request) {
  OrdinaryObserved observed;
  const auto user = request.accepted_step_callback;
  request.accepted_step_callback =
      [&observed, user](std::size_t count, const std::string& time) {
        observed.callbacks.emplace_back(count, time);
        if (user) user(count, time);
      };
  observed.run = eom::evolve_native_coupled_histories(request);
  emit_ordinary(label, request, observed.run, observed.callbacks);
  return observed;
}

Ordinary cancelled_after(Ordinary request, std::size_t count) {
  auto seen = std::make_shared<std::size_t>(0U);
  request.accepted_step_callback = [seen](std::size_t c, const std::string&) {
    *seen = c;
  };
  request.cancellation_requested = [seen, count] { return *seen >= count; };
  return request;
}

int persistence_cases() {
  // The original request of every grouped run: eight steps of 1/128.
  const Ordinary original =
      grouped(selected("p-run", three_static(), kEnd, kStep, kRoomyToken));
  // Known first: the uninterrupted run and its direct driver parity; a v9
  // of it reseals to its own bytes.
  const auto whole = run_emit("P-uninterrupted", original);
  direct_case("P-uninterrupted-direct", original);
  const std::string at_end = checkpoint("P-uninterrupted-v9", original, whole.run);
  note("K-reseal-is-exact", reseal(envelope(at_end)) == at_end ? "equal" : "DIFFERENT", "");
  resume_refused("N-resume-at-completed-end", original, at_end, kEnd);

  // Zero accepted steps: cancelled before the first attempt.
  const auto zero = run_emit("P-cancelled-before-first", cancelled_after(original, 0));
  const std::string at_zero = checkpoint("P-zero-v9", original, zero.run);
  resume("P-from-zero", original, at_zero, kEnd);

  // An accepted prefix: cancelled at the second callback.
  const auto cut = run_emit("P-cancelled-after-two", cancelled_after(original, 2));
  const std::string at_two = checkpoint("P-two-v9", original, cut.run);
  const auto from_two = resume("P-from-two", original, at_two, kEnd);
  // Changed runtime workers: the override is not part of the preparation.
  const auto from_two_workers = resume("P-from-two-workers", original, at_two,
                                       kEnd, g_workers == 1U ? 4U : 1U);
  // Creation after a worker-changed resume keeps working.
  checkpoint("P-after-worker-resume-v9", original, from_two_workers.result.run);
  // A stale but genuine checkpoint: resuming from two again is valid.
  resume("P-from-two-again", original, at_two, kEnd);
  // The next v9 written after a resumed leg keeps the original preparation.
  const std::string after_resume =
      checkpoint("P-after-resume-v9", original, from_two.result.run);
  note("K-preparation-unchanged-after-resume",
       canonical_json(envelope(after_resume).at("preparation")) ==
               canonical_json(envelope(at_two).at("preparation"))
           ? "equal" : "DIFFERENT", "");
  // A record of several legs: the cut continued in process to five, then
  // checkpointed and resumed.
  {
    const auto five = run_emit(
        "P-continued-to-five",
        cancelled_after(resumed("p-run", cut.run, original), 5));
    const std::string at_five = checkpoint("P-five-v9", original, five.run);
    resume("P-from-five", original, at_five, kEnd);
  }
  // In-process continuation after a v9 resume to an intermediate end, then
  // a checkpoint of three legs.
  {
    const auto partial = resume("P-from-two-to-four", original, at_two, "0.03125");
    const auto rest = run_emit("P-continued-after-resume",
                               resumed("p-run", partial.result.run, original));
    checkpoint("P-continued-after-resume-v9", original, rest.run);
  }

  // A finer grouped run, h = 1/256, cut after four steps and resumed.
  {
    const Ordinary fine = grouped(
        selected("p-fine", three_static(), "0.03125", kFine, kRoomyToken));
    const auto first = run_emit("P-fine-cut", cancelled_after(fine, 4));
    const std::string text = checkpoint("P-fine-cut-v9", fine, first.run);
    resume("P-fine-resumed", fine, text, "0.03125");
  }

  // The per-invocation diagnostic limit across checkpoints.
  {
    Ordinary limited = original;
    limited.diagnostic_maximum_accepted_steps = 3;
    const auto first = run_emit("P-limit-1", limited);
    std::string text = checkpoint("P-limit-1-v9", limited, first.run);
    for (int leg = 2; leg <= 3; ++leg) {
      const auto next = resume("P-limit-" + std::to_string(leg), limited, text, kEnd);
      if (next.result.run.status == "completed") break;
      text = checkpoint("P-limit-" + std::to_string(leg) + "-v9", limited,
                        next.result.run);
    }
  }

  // A rejection chain: the receding source, cancelled after three accepted
  // steps with seven rejections, then resumed from v9.
  {
    Ordinary adaptive = selected("p-adaptive", receding(), "3", "1.5", kRoomyToken);
    adaptive.minimum_step = "0.0001";
    const auto first = run_emit("P-adaptive-cut", cancelled_after(adaptive, 3));
    const std::string text = checkpoint("P-adaptive-cut-v9", adaptive, first.run);
    resume("P-adaptive-resumed", adaptive, text, "3");
    run_emit("P-adaptive-uninterrupted", adaptive);
  }

  // A run that does not start at an exact origin has no record.
  {
    Ordinary seeded = original;
    seeded.run_id = "p-seeded";
    seeded.paths.clear();
    for (const auto& p : cut.run.validated_run->paths) {
      seeded.paths.push_back({p.id, p.charge, p.history});
    }
    seeded.validated_population_evidence = cut.run.validated_run->evidence;
    seeded.start_time = cut.run.accepted_end_time;
    const auto run = run_emit("P-not-an-origin", seeded);
    refused("N-v9-not-an-origin", [&] {
      (void)eom::create_validated_provider_checkpoint(seeded, run.run);
    });
  }

  // Foreign and mismatched inputs.
  {
    Ordinary other = selected("p-run", three_static(), kEnd, kStep, kRoomyToken);
    resume_refused("N-foreign-execution-ungrouped", other, at_two, kEnd);
    Ordinary moved = original;
    moved.paths[1] = {"plus", "1", static_path("plus", "1", "12").history};
    resume_refused("N-foreign-population", moved, at_two, kEnd);
    Ordinary renamed = original;
    renamed.run_id = "p-other-run";
    resume_refused("N-foreign-run-identity", renamed, at_two, kEnd);
    Ordinary threads = original;
    threads.thread_count = original.thread_count + 1U;
    resume_refused("N-thread-count-inside-request", threads, at_two, kEnd);
    Ordinary coupled = original;
    coupled.coupling = "0.002";
    resume_refused("N-foreign-coupling", coupled, at_two, kEnd);
    Ordinary resumed_original = resumed("p-run", cut.run, original);
    resume_refused("N-original-carries-continuation", resumed_original, at_two, kEnd);
    resume_refused("N-v8-checkpoint-as-v9", original, "{\"schema\":\"eom_provider_checkpoint/v8\"}", kEnd);
    resume_refused("N-end-not-after-accepted", original, at_two, "0.015625");
    resume_refused("N-worker-override-zero", original, at_two, kEnd, 0U);
    resume_refused("N-worker-override-above-limit", original, at_two, kEnd, 33U);
  }

  // Corruption and resealed false claims.
  {
    std::string flipped = at_two;
    flipped[flipped.find("\"acceptedCount\":2") + 16] = '3';
    resume_refused("N-corrupted-without-reseal", original, flipped, kEnd);
    const auto claim = [&](const std::string& name, const json::value& value) {
      json::object o = envelope(at_two);
      o[name] = value;
      return reseal(o);
    };
    resume_refused("N-resealed-accepted-count", original, claim("acceptedCount", 3U), kEnd);
    resume_refused("N-resealed-rejected-count", original, claim("rejectedCount", 1U), kEnd);
    resume_refused("N-resealed-accepted-time", original, claim("acceptedTime", "0.0234375"), kEnd);
    resume_refused("N-resealed-controller-step", original, claim("controllerStep", "0.00390625"), kEnd);
    resume_refused("N-resealed-histories", original,
                   claim("histories", envelope(after_resume).at("histories")), kEnd);
    resume_refused("N-resealed-record-identity-claim", original,
                   claim("providerState",
                         [&] {
                           json::object s = envelope(at_two).at("providerState").as_object();
                           s["recordIdentity"] = std::string(64, '0');
                           return json::value(s);
                         }()),
                   kEnd);
    const std::string record = record_of(at_two);
    resume_refused(
        "N-resealed-record-leg-cancellation", original,
        with_record(at_two, eom::validated_run_record_reseal(replaced_once(
                                record, "\"cancelled_after\":2", "\"cancelled_after\":1"))),
        kEnd);
    resume_refused(
        "N-resealed-record-step-end", original,
        with_record(at_two, eom::validated_run_record_reseal(replaced_once(
                                record, "\"end\":\"0.0078125\",\"chains\"",
                                "\"end\":\"0.0078126\",\"chains\""))),
        kEnd);
    resume_refused("N-record-without-reseal", original,
                   with_record(at_two, replaced_once(record, "\"cancelled_after\":2",
                                                     "\"cancelled_after\":1")),
                   kEnd);
    // A refused restore returns no usable state at the record layer either.
    const auto refused_restore = eom::restore_validated_run(
        eom::validated_run_record_reseal(replaced_once(
            record, "\"cancelled_after\":2", "\"cancelled_after\":1")),
        eom::ValidatedRestoreExpectation{});
    std::cout << "{\"case\":\"N-record-layer-refusal-state\",\"status\":"
              << quoted(refused_restore.status) << ",\"stage\":"
              << quoted(refused_restore.stage) << ",\"paths\":"
              << refused_restore.paths.size() << ",\"has_evidence\":"
              << (refused_restore.evidence ? "true" : "false")
              << ",\"has_continuation\":"
              << (refused_restore.continuation ? "true" : "false")
              << ",\"has_record\":" << (refused_restore.record ? "true" : "false")
              << ",\"replayed_rejected_steps\":"
              << refused_restore.replayed_rejected_steps << "}\n";
    const auto false_claim = eom::replay_validated_run_record(
        eom::validated_run_record_reseal(replaced_once(
            record, "\"cancelled_after\":2", "\"cancelled_after\":1")));
    std::cout << "{\"case\":\"N-record-layer-false-claim-replay\",\"status\":"
              << quoted(false_claim.status) << ",\"stage\":"
              << quoted(false_claim.stage) << ",\"paths\":"
              << false_claim.paths.size() << ",\"has_continuation\":"
              << (false_claim.continuation ? "true" : "false")
              << ",\"replayed_rejected_steps\":"
              << false_claim.replayed_rejected_steps << "}\n";
  }

  // A genuine alternate record: the same origin and controls, cut as two
  // legs of one step each, reaching the same boundary as at_two.
  {
    const auto one = run_emit("P-alt-leg-1", cancelled_after(original, 1));
    const auto two = run_emit(
        "P-alt-leg-2", cancelled_after(resumed("p-run", one.run, original), 2));
    const std::string alt = checkpoint("P-alt-v9", original, two.run);
    resume("P-alt-under-expected-controls", original, alt, kEnd);
    const std::string original_identity =
        eom::validated_run_record_identity(record_of(at_two));
    resume("P-two-under-expected-record", original, at_two, kEnd, std::nullopt,
           original_identity);
    resume_refused("N-alt-under-expected-record-of-two", original, alt, kEnd,
                   std::nullopt, original_identity);
    // The alternate's record inside at_two's envelope: the claims are the
    // same boundary, so it restores, and is reported as the alternate.
    resume("P-alt-record-in-two-envelope", original,
           with_record(at_two, record_of(alt)), kEnd);
    // A genuine record of a different boundary inside at_two's envelope.
    const auto three = run_emit("P-alt-three", cancelled_after(original, 3));
    const std::string at_three = checkpoint("P-three-v9", original, three.run);
    resume_refused("N-three-record-in-two-envelope", original,
                   with_record(at_two, record_of(at_three)), kEnd);
  }

  // O2-R2: a genuine record of another origin or other controls, with its
  // own consistent claims, inside the caller's resealed envelope, is refused
  // whether or not the caller names its complete identity.
  {
    const auto foreign = [&](const std::string& name, Ordinary other) {
      const auto run = run_emit("P-foreign-" + name, cancelled_after(other, 2));
      const std::string theirs = checkpoint("P-foreign-" + name + "-v9", other, run.run);
      json::object mine = envelope(at_two);
      const json::object their = envelope(theirs);
      for (const char* key : {"providerState", "acceptedTime", "acceptedCount",
                              "rejectedCount", "controllerStep", "histories"}) {
        mine[key] = their.at(key);
      }
      // O2-R3: the foreign certificate cannot be checkpointed under the
      // caller's original request.
      refused("N-R3-" + name + "-certificate", [&] {
        (void)eom::create_validated_provider_checkpoint(original, run.run);
      });
      const std::string swapped = reseal(mine);
      const std::string identity = eom::validated_run_record_identity(record_of(theirs));
      resume_refused("N-R2-" + name + "-under-expected-record", original, swapped,
                     kEnd, std::nullopt, identity);
      resume_refused("N-R2-" + name + "-under-expected-controls", original, swapped,
                     kEnd);
    };
    Ordinary moved = original;
    moved.paths[1] = {"plus", "1", static_path("plus", "1", "12").history};
    foreign("changed-origin", moved);
    Ordinary charged = original;
    charged.paths[0] = {"receiver", "2", charged.paths[0].history};
    foreign("changed-charge", charged);
    Ordinary coupled = original;
    coupled.coupling = "0.002";
    foreign("changed-scalar", coupled);
    Ordinary policy = original;
    policy.validated = {};
    foreign("changed-policy", policy);
    // Every history keeps one common start, as the producer requires.
    Ordinary ancestry = original;
    ancestry.paths = {
        {"receiver", "1", static_path("receiver", "1", "0", "-30").history},
        {"plus", "1", static_path("plus", "1", "10", "-30").history},
        {"minus", "-1", static_path("minus", "-1", "11", "-30").history}};
    foreign("changed-ancestry", ancestry);
  }

  // O2-R3: a genuine certificate whose public histories were replaced by
  // another genuine boundary's cannot be checkpointed.
  {
    OrdinaryRun changed = cut.run;
    changed.histories = whole.run.histories;
    refused("N-R3-changed-public-histories", [&] {
      (void)eom::create_validated_provider_checkpoint(original, changed);
    });
    OrdinaryRun recounted = cut.run;
    recounted.accepted_step_count += 1U;
    refused("N-R3-changed-public-count", [&] {
      (void)eom::create_validated_provider_checkpoint(original, recounted);
    });
  }

  // Many short legs: ten invocations, each ending at a clipped final step
  // shorter than the minimum step, then one more from v9.
  {
    const Ordinary first =
        selected("p-short", static_pair(), "0.001", kStep, kRoomyToken);
    auto leg = run_emit("P-short-leg-1", first);
    for (int k = 2; k <= 10; ++k) {
      Ordinary next = resumed("p-short", leg.run, first);
      next.end_time = "0.0" + std::string(k < 10 ? "0" : "") + std::to_string(k);
      leg = run_emit("P-short-leg-" + std::to_string(k), next);
    }
    const std::string text = checkpoint("P-short-v9", first, leg.run);
    resume("P-short-resumed", first, text, "0.011");
  }

  // Resources and size.
  {
    // The memory budget is part of the bound preparation: a caller cannot
    // change it on resume.
    Ordinary changed = original;
    changed.memory_budget_bytes = 1;
    resume_refused("N-resume-changed-memory-budget-is-preparation", changed,
                   at_two, kEnd);
    // A run whose budget equals its own admitted estimate: it runs, but the
    // replay bound plus the envelope copies exceed that budget, so resume is
    // refused before any replay.
    Ordinary tight = original;
    tight.run_id = "p-tight";
    tight.memory_budget_bytes = cut.run.memory_estimate_bytes;
    const auto tight_cut = run_emit("P-tight-budget-cut", cancelled_after(tight, 2));
    const std::string at_tight = checkpoint("P-tight-v9", tight, tight_cut.run);
    resume_refused("N-resume-replay-bound-over-budget", tight, at_tight, kEnd);
    // Resource refusal precedes replay: a false record under the same budget
    // reports the resource refusal, not the replay refusal.
    resume_refused(
        "N-resume-resource-before-false-record", tight,
        with_record(at_tight, eom::validated_run_record_reseal(replaced_once(
                                record_of(at_tight), "\"cancelled_after\":2",
                                "\"cancelled_after\":1"))),
        kEnd);
    Ordinary large = selected(std::string(17U * 1024U * 1024U, 'r'),
                              three_static(), "0.0078125", kStep, kRoomyToken);
    const auto run = eom::evolve_native_coupled_histories(large);
    refused("N-v9-size-exhausted", [&] {
      (void)eom::create_validated_provider_checkpoint(large, run);
    });
    refused_evolve("N-preflight-refused-origin-has-no-v9",
                   selected("p-fast", above_wake_speed(), kEnd));
  }

  // Durable storage with the shared writer.
  {
    const std::string file = g_output_directory + "/p-two.v9.json";
    eom::write_evolution_checkpoint_bytes_atomic(
        file, std::vector<unsigned char>(at_two.begin(), at_two.end()));
    std::ifstream in(file, std::ios::binary);
    const std::string back((std::istreambuf_iterator<char>(in)),
                           std::istreambuf_iterator<char>());
    note("K-durable-write-read-back", back == at_two ? "equal" : "DIFFERENT",
         sha(back));
    bool durable = false;
    std::string failure;
    try {
      eom::write_evolution_checkpoint_bytes_atomic(
          g_output_directory + "/absent-directory/p-two.v9.json",
          std::vector<unsigned char>(at_two.begin(), at_two.end()));
      durable = true;
    } catch (const std::exception& error) {
      failure = error.what();
    }
    note("K-durable-failure-reported", durable ? "durable" : "not-durable",
         failure.substr(0, 120));
  }
  return 0;
}

}  // namespace

int main(int argc, char** argv) {
  if (argc > 1) g_workers = std::stoul(argv[1]);
  if (argc > 2) g_output_directory = argv[2];
  try {
    known_ordinary_cases();
    persistence_cases();
  } catch (const std::exception& error) {
    std::cout << "{\"case\":\"FATAL\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 3;
  }
  return 0;
}

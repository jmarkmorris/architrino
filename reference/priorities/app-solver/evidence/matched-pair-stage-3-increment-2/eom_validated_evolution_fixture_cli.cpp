// Manual fixture for the serial validated evolution driver. Emits JSON
// lines; a separate checker compares them with truth references. c_f = 1.
#include "architrino/eom/ValidatedEvolution.hpp"

#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <cmath>
#include <iostream>
#include <limits>
#include <sstream>
#include <type_traits>

namespace eom = architrino::eom;
using Budgets = eom::ValidatedFarStepBudgets;
using Certificate = eom::ValidatedFarStepCertificate;
using Evidence = eom::ValidatedFarStepEvidence;
using Path = eom::ValidatedFarStepPath;
using Request = eom::ValidatedEvolutionRequest;
using Run = eom::ValidatedEvolutionCertificate;

// A continuation cannot be built by a caller: its constructor is private.
static_assert(!std::is_constructible_v<eom::ValidatedEvolutionContinuation,
                                       eom::ValidatedEvolutionState>,
              "continuation must be issued by the driver only");
static_assert(!std::is_default_constructible_v<
                  eom::ValidatedEvolutionContinuation>,
              "continuation must be issued by the driver only");

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

std::string half_token(int twice) {
  const bool negative = twice < 0;
  const int magnitude = negative ? -twice : twice;
  std::string text = std::to_string(magnitude / 2);
  if (magnitude % 2 != 0) text += ".5";
  return (negative ? "-" : "") + text;
}

Path oscillating_source() {
  std::vector<eom::CubicHistorySegment> segments;
  for (int twice = -40; twice < 0; ++twice) {
    const bool rising = (twice % 2 + 2) % 2 == 0;
    segments.emplace_back(
        half_token(twice), half_token(twice + 1),
        rising ? on_z("10", "0", "2.4", "-3.2")
               : on_z("10.2", "0", "-2.4", "3.2"));
  }
  return {"source", "1", eom::RetainedHistory("source-history",
                                              std::move(segments))};
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

std::vector<Path> control() {
  return {static_path("receiver", "1", "0"), oscillating_source()};
}

void refuses_request(const std::string& label, Request request) {
  try {
    (void)eom::evolve_validated_far_step_histories(request);
    note(label, "NOT-REFUSED", "");
  } catch (const eom::EquationAdmissionError& error) {
    note(label, "refused:" + error.code(), error.what());
  } catch (const std::exception& error) {
    note(label, "refused", error.what());
  }
}

int known_cases() {
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
           make("K2",
                {static_path("receiver", "1", "0"),
                 static_path("plus", "1", "10"),
                 static_path("minus", "-1", "11")},
                "0", "0.03125", kStep, kStep));
  return 0;
}

int controller_cases() {
  // Remaining-time clamp: the last step ends exactly at the requested end.
  run_case("T-remaining-time-clamp",
           make("clamp", static_pair(), "0", "0.02", kStep, kStep));
  // Large epoch: three steps of 0.0002987 from exactly 10000000000.
  run_case("T-large-epoch",
           make("epoch",
                {static_path("receiver", "1", "0", "9999999980",
                             "10000000000"),
                 static_path("source", "1", "10", "9999999980",
                             "10000000000")},
                "10000000000", "10000000000.0008961", "0.0002987",
                "0.0002987", "0"));
  // Zero-length run.
  run_case("T-zero-length", make("zero", static_pair(), "0", "0", kStep,
                                 kStep));
  return 0;
}

int refusal_cases() {
  const Budgets wide{1.0, 1.0};
  run_case("N-H0-unequal-starts",
           make("h0a",
                {static_path("receiver", "1", "0", "-5"),
                 static_path("source", "1", "10")},
                "0", "0.015625", kStep, kStep));
  {
    Request first = make("h0b-first", static_pair(), "0", kStep, kStep, kStep);
    const Observed grown = evolve(first);
    Request missing = make("h0b", grown.run.paths, kStep, "0.015625", kStep,
                           kStep);
    run_case("N-H0-evidence-missing", missing);
    Request other_first =
        make("h0c-first", static_pair("10.5"), "0", kStep, kStep, kStep);
    const Observed other = evolve(other_first);
    Request foreign = make("h0c", grown.run.paths, kStep, "0.015625", kStep,
                           kStep);
    foreign.evidence = other.run.evidence;
    run_case("N-H0-evidence-of-other-population", foreign);
    Request changed = make("h0d", grown.run.paths, kStep, "0.015625", kStep,
                           kStep, "0.002");
    changed.evidence = grown.run.evidence;
    run_case("N-H0-changed-coupling", changed);
  }
  run_case("N-H1-retained-past",
           make("h1a",
                {static_path("receiver", "1", "0"),
                 Path{"source", "1",
                      eom::RetainedHistory(
                          "source-history",
                          {eom::CubicHistorySegment(
                              "-20", "0",
                              on_z("10", "0", "0.3", "-0.01"))})}},
                "0", "0.015625", kStep, "0.0009765625"));
  run_case("R-H1-step-velocity-box",
           make("h1b", static_pair(), "0", "0.5", "2", "0.0078125", "200",
                wide));
  run_case("R-H2-step-longer-than-separation",
           make("h2", static_pair(), "0", "24", "12", "0.75", kKappa, wide));
  run_case("N-H3-lower-sign-unresolved",
           make("h3", static_pair("10", "-10"), "0", "0.015625", kStep,
                "0.00000095367431640625"));
  run_case("N-H4-minimum-step",
           make("h4",
                {static_path("receiver", "1", "0"),
                 Path{"source", "1",
                      eom::RetainedHistory(
                          "source-history",
                          {eom::CubicHistorySegment(
                              "-20", "0", on_z("-19.701", "0.99"))})}},
                "0", "0.015625", kStep, "0.0009765625"));
  run_case("N-BUDGET-01-minimum-step",
           make("b1", control(), "0", "0.015625", kStep, "0.0009765625",
                kKappa, Budgets{1e-30, 1e-30}));
  {
    Request first = make("b2-first", control(), "0", "0.015625", kStep, kStep);
    const Observed grown = evolve(first);
    Request exhausted = make("b2a", grown.run.paths, "0.015625", "0.0234375",
                             kStep, "0.0009765625");
    exhausted.evidence = grown.run.evidence;
    exhausted.total_budget = Budgets{1e-8, 1e-9};
    run_case("N-BUDGET-02-inherited-total", exhausted);
    Request one = make("b2-one", control(), "0", kStep, kStep, kStep);
    const Observed single = evolve(one);
    Request growth = make("b2b", single.run.paths, kStep, "0.015625", kStep,
                          "0.0000152587890625");
    growth.evidence = single.run.evidence;
    growth.total_budget = Budgets{1e-8, 2e-9};
    run_case("R-BUDGET-02-new-growth", growth);
  }
  {
    Request limited = make("limit", control(), "0", "0.5", "2", kFine);
    limited.max_attempts_per_step = 3;
    run_case("N-attempt-limit", limited);
  }
  refuses_request("N-request-wrong-policy", [] {
    Request r = make("p", static_pair(), "0", kStep, kStep, kStep);
    r.policy = eom::kMatchedPairPolicySnapshotPiecewiseTube;
    return r;
  }());
  refuses_request("N-request-field-speed", [] {
    Request r = make("f", static_pair(), "0", kStep, kStep, kStep);
    r.field_speed = "2";
    return r;
  }());
  refuses_request("N-request-exponent-token",
                  make("e", static_pair(), "0", "1e-2", kStep, kStep));
  refuses_request("N-request-zero-budget",
                  make("z", static_pair(), "0", kStep, kStep, kStep, kKappa,
                       Budgets{0.0, 1e-8}));
  // The ordinary entry point must refuse the validated evolution token.
  try {
    std::vector<eom::NativeCoupledPathInput> inputs;
    for (const auto& path : static_pair()) {
      inputs.push_back({path.id, path.charge, path.history});
    }
    eom::NativeCoupledEvolutionRequest ordinary{
        .run_id = "ordinary-guard",
        .paths = std::move(inputs),
        .start_time = "0",
        .end_time = "0.0625",
        .initial_step = "0.03125",
        .minimum_step = "0.03125",
        .maximum_step = "0.03125",
        .field_speed = "1",
        .coupling = kKappa,
        .root_tolerance = "1e-9",
        .transmitter_factor_floor = "1e-24",
        .acceleration_tolerance = "1e-4",
        .matched_pair_enclosure_policy =
            eom::kValidatedFarStepEvolutionPolicy,
        .root_max_depth = 192,
        .root_max_cells = 300000,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = 512,
        .thread_count = 1,
    };
    ordinary.position_tolerance = "1e-6";
    ordinary.velocity_tolerance = "1e-6";
    ordinary.correction_tolerance = "1e-10";
    const auto result = eom::evolve_native_coupled_histories(ordinary);
    note("N-ordinary-entry-refuses-validated-token", "NOT-REFUSED",
         result.status);
  } catch (const std::exception& error) {
    note("N-ordinary-entry-refuses-validated-token", "refused", error.what());
  }
  return 0;
}

int cancellation_cases() {
  const std::string end = "0.03125";
  Request whole = make("c-whole", control(), "0", end, kStep, kStep);
  const Observed uninterrupted = run_case("C-uninterrupted", whole);
  Request first = make("c-first", control(), "0", end, kStep, kStep);
  std::size_t accepted = 0;
  first.accepted_step_callback = [&accepted](std::size_t, const std::string&) {
    ++accepted;
  };
  first.cancellation_requested = [&accepted] { return accepted >= 2U; };
  const Observed cancelled = run_case("C-cancelled-after-two", first);
  Request second = make("c-second", cancelled.run.paths,
                        cancelled.run.run.accepted_end_time, end, kStep, kStep);
  second.evidence = cancelled.run.evidence;
  run_case("C-resumed", second);
  Request before = make("c-before", control(), "0", end, kStep, kStep);
  before.cancellation_requested = [] { return true; };
  run_case("C-cancelled-before-first-attempt", before);
  (void)uninterrupted;
  return 0;
}

// The reviewer's adaptive case: coupling 0, receiver static at 0, source
// z = -9 + (S + 20) / 2, initial step 1.5, minimum 0.0001, end 3.
std::vector<Path> reviewer_adaptive() {
  return {static_path("receiver", "1", "0"),
          Path{"source", "1",
               eom::RetainedHistory(
                   "source-history",
                   {eom::CubicHistorySegment("-20", "0",
                                             on_z("-9", "0.5"))})}};
}

Request adaptive_request(const std::string& id, std::vector<Path> paths,
                         const std::string& start) {
  return make(id, std::move(paths), start, "3", "1.5", "0.0001", "0",
              Budgets{1e-6, 1e-6});
}

// Runs `request` cancelling after `count` accepted steps.
Observed cancelled_after(const std::string& label, Request request,
                         std::size_t count) {
  auto accepted = std::make_shared<std::size_t>(0U);
  request.accepted_step_callback =
      [accepted](std::size_t, const std::string&) { ++*accepted; };
  request.cancellation_requested = [accepted, count] {
    return *accepted >= count;
  };
  return run_case(label, std::move(request));
}

Request resumed_from(const std::string& id, const Observed& from,
                     Request like) {
  Request request = std::move(like);
  request.run_id = id;
  request.paths = from.run.paths;
  request.evidence = from.run.evidence;
  request.continuation = from.run.continuation;
  request.start_time = from.run.run.accepted_end_time;
  request.cancellation_requested = {};
  request.accepted_step_callback = {};
  return request;
}

int continuation_cases() {
  // I1-R1, reviewer's adaptive case.
  const Request adaptive = adaptive_request("r1", reviewer_adaptive(), "0");
  run_case("R1-uninterrupted", adaptive);
  const Observed two = cancelled_after("R1-cancelled-after-two", adaptive, 2);
  run_case("R1-resumed", resumed_from("r1-resumed", two, adaptive));
  {
    // The same returned population and evidence without the continuation is
    // a new run with a fresh controller state.
    Request fresh = resumed_from("r1-new", two, adaptive);
    fresh.continuation = {};
    run_case("R1-new-run-without-continuation", fresh);
  }
  {
    Request stopped = resumed_from("r1-stop", two, adaptive);
    stopped.cancellation_requested = [] { return true; };
    run_case("R1-resume-cancelled-immediately", stopped);
  }
  // Cancellation during a cooldown that followed retries.
  const Request cooled =
      make("r1b", control(), "0", "0.25", "2", kFine);
  run_case("R1b-uninterrupted", cooled);
  const Observed three = cancelled_after("R1b-cancelled-after-three", cooled, 3);
  run_case("R1b-resumed", resumed_from("r1b-resumed", three, cooled));
  // A run that halts on the total budget; resuming it must halt again at
  // once and keep the ledger it had.
  Request tight = make("r1c", control(), "0", "0.0234375", kStep,
                       "0.0009765625");
  tight.total_budget = Budgets{1e-8, 2e-9};
  const Observed halted = run_case("R1c-halted", tight);
  run_case("R1c-resumed-halts-again", resumed_from("r1c-resumed", halted, tight));

  // Continuations that do not bind.
  {
    Request r = resumed_from("n1", two, adaptive);
    r.initial_step = "0.75";
    run_case("N-continuation-changed-initial-step", r);
  }
  {
    Request r = resumed_from("n2", two, adaptive);
    r.increment_budget = Budgets{2e-6, 1e-6};
    run_case("N-continuation-changed-increment-budget", r);
  }
  {
    Request r = resumed_from("n3", two, adaptive);
    r.total_budget = Budgets{1.0, 1.0};
    run_case("N-continuation-total-budget-added", r);
  }
  {
    Request r = resumed_from("n4", two, adaptive);
    r.growth_cooldown_steps = 2;
    run_case("N-continuation-changed-cooldown-length", r);
  }
  {
    Request r = resumed_from("n5", two, adaptive);
    r.max_attempts_per_step = 8;
    run_case("N-continuation-changed-attempt-limit", r);
  }
  {
    // Stale: the state after one accepted step, offered with the
    // population after two.
    const Observed one = cancelled_after("", adaptive, 1);
    Request r = resumed_from("n6", two, adaptive);
    r.continuation = one.run.continuation;
    run_case("N-continuation-stale", r);
  }
  {
    // Foreign: the state of another population's run at the same time.
    const Request other_request = adaptive_request(
        "other",
        {static_path("receiver", "1", "0"),
         Path{"source", "1",
              eom::RetainedHistory(
                  "source-history",
                  {eom::CubicHistorySegment("-20", "0",
                                            on_z("-8.5", "0.5"))})}},
        "0");
    const Observed other = cancelled_after("", other_request, 2);
    Request r = resumed_from("n7", two, adaptive);
    r.continuation = other.run.continuation;
    run_case("N-continuation-foreign", r);
  }
  {
    Request r = resumed_from("n8", two, adaptive);
    r.coupling = "0.001";
    run_case("N-continuation-changed-coupling", r);
  }
  return 0;
}

int budget_cases() {
  // Known first: a finite positive total budget is admitted.
  {
    Request good = make("b-good", static_pair(), "0", kStep, kStep, kStep);
    good.total_budget = Budgets{1e-6, 1e-6};
    run_case("K-total-budget-finite-positive", good);
  }
  const double nan = std::numeric_limits<double>::quiet_NaN();
  const double inf = std::numeric_limits<double>::infinity();
  const std::vector<std::pair<std::string, double>> bad{
      {"nan", nan}, {"positive-infinity", inf}, {"negative-infinity", -inf},
      {"zero", 0.0}, {"negative", -1e-8}};
  for (const auto& [name, value] : bad) {
    Request position = make("b", static_pair(), "0", kStep, kStep, kStep);
    position.total_budget = Budgets{value, 1e-6};
    refuses_request("N-total-budget-position-" + name, position);
    Request velocity = make("b", static_pair(), "0", kStep, kStep, kStep);
    velocity.total_budget = Budgets{1e-6, value};
    refuses_request("N-total-budget-velocity-" + name, velocity);
  }
  {
    Request both = make("b", static_pair(), "0", kStep, kStep, kStep);
    both.total_budget = Budgets{nan, nan};
    refuses_request("N-total-budget-both-nan", both);
    both.total_budget = Budgets{inf, inf};
    refuses_request("N-total-budget-both-infinity", both);
  }
  // The public producer applies the same rule to both budgets.
  eom::ValidatedFarStepProducer producer;
  const auto pair = static_pair();
  emit("K-producer-finite-budgets", "1",
       producer.step(pair, nullptr, "0", kStep, kKappa, kBudgets,
                     Budgets{1e-6, 1e-6}));
  for (const auto& [name, value] : bad) {
    emit("N-producer-total-position-" + name, "1",
         producer.step(pair, nullptr, "0", kStep, kKappa, kBudgets,
                       Budgets{value, 1e-6}));
    emit("N-producer-total-velocity-" + name, "1",
         producer.step(pair, nullptr, "0", kStep, kKappa, kBudgets,
                       Budgets{1e-6, value}));
    emit("N-producer-increment-position-" + name, "1",
         producer.step(pair, nullptr, "0", kStep, kKappa,
                       Budgets{value, 1e-8}));
    emit("N-producer-increment-velocity-" + name, "1",
         producer.step(pair, nullptr, "0", kStep, kKappa,
                       Budgets{1e-8, value}));
  }
  return 0;
}

int admission_cases() {
  // Known first: genuine zero-length runs.
  run_case("K-zero-length-at-history-end",
           make("a0", static_pair(), "0", "0", kStep, kStep));
  Request first = make("a-first", static_pair(), "0", kStep, kStep, kStep);
  const Observed grown = evolve(first);
  {
    Request own = make("a1", grown.run.paths, kStep, kStep, kStep, kStep);
    own.evidence = grown.run.evidence;
    run_case("K-zero-length-grown-with-own-evidence", own);
  }
  // I1-R3, reviewer's case and variants.
  run_case("N-zero-length-mismatched-start",
           make("a2", static_pair(), "1", "1", kStep, kStep));
  {
    Request r = make("a3", static_pair(), "1", "1.5", kStep, kStep);
    r.cancellation_requested = [] { return true; };
    run_case("N-early-cancellation-mismatched-start", r);
  }
  {
    Request r = make("a4", static_pair(), "1", "1.5", kStep, kStep);
    r.max_accepted_steps = 0;
    run_case("N-step-limit-mismatched-start", r);
  }
  {
    Request other_first =
        make("a-other", static_pair("10.5"), "0", kStep, kStep, kStep);
    const Observed other = evolve(other_first);
    Request r = make("a5", grown.run.paths, kStep, kStep, kStep, kStep);
    r.evidence = other.run.evidence;
    run_case("N-zero-length-foreign-evidence", r);
    Request cancelled = make("a6", grown.run.paths, kStep, "0.015625", kStep,
                             kStep);
    cancelled.evidence = other.run.evidence;
    cancelled.cancellation_requested = [] { return true; };
    run_case("N-early-cancellation-foreign-evidence", cancelled);
  }
  run_case("N-zero-length-missing-evidence",
           make("a7", grown.run.paths, kStep, kStep, kStep, kStep));
  {
    Request r = make("a8", static_pair(), "0", "0.015625", kStep, kStep);
    r.max_accepted_steps = 0;
    run_case("K-step-limit-at-valid-start", r);
  }
  return 0;
}

// I1-R3b. Supplied evidence must bind the population it is supplied with
// even when that population declares no radius, and the coupling and charges
// must be exact finite decimal tokens, before any early return.
int admission_b_cases() {
  // Known first: an exact prefix without evidence, and a generated
  // population with its own evidence, at zero length.
  run_case("K-exact-prefix-zero-length-without-evidence",
           make("b0", static_pair(), "0", "0", kStep, kStep));
  Request first = make("b-first", static_pair(), "0", kStep, kStep, kStep);
  const Observed grown = evolve(first);
  {
    Request own = make("b1", grown.run.paths, kStep, kStep, kStep, kStep);
    own.evidence = grown.run.evidence;
    run_case("K-generated-zero-length-with-own-evidence", own);
  }
  // The reviewer's targets: the generated population's evidence supplied
  // with the original exact prefix.
  {
    Request r = make("b2", static_pair(), "0", "0", kStep, kStep);
    r.evidence = grown.run.evidence;
    run_case("N-stale-evidence-exact-prefix-zero-length", r);
  }
  {
    Request r = make("b3", static_pair(), "0", "0.015625", kStep, kStep);
    r.evidence = grown.run.evidence;
    r.cancellation_requested = [] { return true; };
    run_case("N-stale-evidence-exact-prefix-early-cancellation", r);
  }
  {
    Request r = make("b4", static_pair(), "0", "0.015625", kStep, kStep);
    r.evidence = grown.run.evidence;
    r.max_accepted_steps = 0;
    run_case("N-stale-evidence-exact-prefix-step-limit", r);
  }
  {
    Request r = make("b5", static_pair(), "0", "0.015625", kStep, kStep);
    r.evidence = grown.run.evidence;
    run_case("N-stale-evidence-exact-prefix-positive-run", r);
  }
  {
    // Evidence of another exact population's run, same identifiers.
    Request other_first =
        make("b-other", static_pair("10.5"), "0", kStep, kStep, kStep);
    const Observed other = evolve(other_first);
    Request r = make("b6", static_pair(), "0", "0", kStep, kStep);
    r.evidence = other.run.evidence;
    run_case("N-foreign-evidence-exact-prefix-zero-length", r);
  }
  // The public producer refuses the same object on the exact prefix.
  eom::ValidatedFarStepProducer producer;
  emit("N-producer-stale-evidence-exact-prefix", "1",
       producer.step(static_pair(), grown.run.evidence, "0", kStep, kKappa,
                     kBudgets));

  // Scalars. Known first: signed and exponent forms are admitted.
  const std::vector<std::pair<std::string, std::string>> good{
      {"zero", "0"}, {"negative", "-0.001"}, {"exponent", "1e-3"},
      {"explicit-plus", "+0.001"}};
  for (const auto& [name, token] : good) {
    run_case("K-coupling-" + name + "-zero-length",
             make("s", static_pair(), "0", "0", kStep, kStep, token));
  }
  run_case("K-coupling-exponent-one-step",
           make("s1", static_pair(), "0", kStep, kStep, kStep, "1e-3"));
  {
    std::vector<Path> signedCharges{static_path("receiver", "+1", "0"),
                                    static_path("source", "-1e0", "10")};
    run_case("K-charges-signed-and-exponent-one-step",
             make("s2", signedCharges, "0", kStep, kStep, kStep));
  }
  const std::vector<std::pair<std::string, std::string>> bad{
      {"not-a-number", "not-a-number"}, {"nan", "nan"}, {"infinity", "inf"},
      {"empty", ""}, {"dangling-exponent", "1e"}, {"hexadecimal", "0x10"},
      {"two-points", "1.0.0"}, {"leading-space", " 1"},
      {"binary64-overflow", "1e400"}};
  for (const auto& [name, token] : bad) {
    run_case("N-coupling-" + name + "-zero-length",
             make("s", static_pair(), "0", "0", kStep, kStep, token));
    std::vector<Path> charged{static_path("receiver", "1", "0"),
                              static_path("source", token, "10")};
    run_case("N-charge-" + name + "-zero-length",
             make("s", charged, "0", "0", kStep, kStep));
  }
  {
    Request r = make("s3", static_pair(), "0", "0.015625", kStep, kStep,
                     "not-a-number");
    r.cancellation_requested = [] { return true; };
    run_case("N-coupling-not-a-number-early-cancellation", r);
    Request l = make("s4", static_pair(), "0", "0.015625", kStep, kStep,
                     "not-a-number");
    l.max_accepted_steps = 0;
    run_case("N-coupling-not-a-number-step-limit", l);
    run_case("N-coupling-not-a-number-positive-run",
             make("s5", static_pair(), "0", "0.015625", kStep, kStep,
                  "not-a-number"));
  }
  emit("N-producer-coupling-not-a-number", "1",
       producer.step(static_pair(), nullptr, "0", kStep, "not-a-number",
                     kBudgets));
  emit("N-producer-charge-not-a-number", "1",
       producer.step({static_path("receiver", "1", "0"),
                      static_path("source", "not-a-number", "10")},
                     nullptr, "0", kStep, kKappa, kBudgets));
  return 0;
}

// I1-R4. The reviewer's case: coupling 0, static exact histories at z = 0
// and z = 10 on [-20, 0], one step of 0.125. The published source position
// radius on z is a few units in the last place of 10, all of it newly
// declared, so the increment budget must be compared with all of it.
Request ledger_request(const std::string& id, const Budgets& budgets) {
  return make(id, static_pair(), "0", "0.125", "0.125", "0.125", "0",
              budgets);
}

int ledger_cases() {
  // Known first: a large budget accepts the step.
  run_case("K-ledger-large-budget", ledger_request("l0", Budgets{1e-6, 1e-6}));
  // The reviewer's target: budgets far below the newly declared radius.
  run_case("N-ledger-tiny-budget", ledger_request("l1", Budgets{1e-25, 1e-25}));
  // A position budget just above the newly declared radius accepts and
  // charges all of it; one just below refuses.
  run_case("K-ledger-tight-budget-accepted",
           ledger_request("l2", Budgets{6e-15, 1e-25}));
  run_case("N-ledger-budget-below-declared-growth",
           ledger_request("l3", Budgets{5e-15, 1e-25}));
  // The public producer applies the same charge.
  eom::ValidatedFarStepProducer producer;
  const auto pair = static_pair();
  emit("K-producer-ledger-large-budget", "1",
       producer.step(pair, nullptr, "0", "0.125", "0", Budgets{1e-6, 1e-6}));
  emit("N-producer-ledger-tiny-budget", "1",
       producer.step(pair, nullptr, "0", "0.125", "0",
                     Budgets{1e-25, 1e-25}));
  emit("K-producer-ledger-tight-budget-accepted", "1",
       producer.step(pair, nullptr, "0", "0.125", "0", Budgets{6e-15, 1e-25}));
  emit("N-producer-ledger-budget-below-declared-growth", "1",
       producer.step(pair, nullptr, "0", "0.125", "0", Budgets{5e-15, 1e-25}));
  // A second step on a generated layer inherits its declared total.
  Request two = make("l4", static_pair(), "0", "0.25", "0.125", "0.125", "0",
                     Budgets{6e-15, 1e-25});
  run_case("K-ledger-second-step-inherits-declared-total", two);
  return 0;
}

// ------------------------------------------------------------ increment 2
using Group = eom::ValidatedFarStepGroup;

Request grouped(Request request, std::vector<Group> groups) {
  request.pair_policy = eom::kValidatedWholeStepPairPolicy;
  request.groups = std::move(groups);
  return request;
}

std::vector<Path> three_static(const std::string& plus_z = "10",
                               const std::string& minus_z = "11",
                               const std::string& minus_charge = "-1") {
  return {static_path("receiver", "1", "0"),
          static_path("plus", "1", plus_z),
          static_path("minus", minus_charge, minus_z)};
}

// The follower rests at z = 11 except for one smooth bump of height 0.0025
// on [-10.96875, -10.90625], two cubic pieces with zero velocity at every
// join: z = 11 + H s(u), s(u) = 3 u^2 - 2 u^3, peak speed 0.12. A hit
// received at 0 during the first step [0, 0.125] left the follower between
// about -11 and -10.875, so the bump is seen only at reception times
// strictly inside the step; at both step ends the follower is seen at rest.
std::vector<Path> bump_population(bool with_bump) {
  std::vector<eom::CubicHistorySegment> minus;
  if (with_bump) {
    minus.emplace_back("-20", "-10.96875", on_z("11"));
    minus.emplace_back("-10.96875", "-10.9375",
                       on_z("11", "0", "7.68", "-163.84"));
    minus.emplace_back("-10.9375", "-10.90625",
                       on_z("11.0025", "0", "-7.68", "163.84"));
    minus.emplace_back("-10.90625", "0", on_z("11"));
  } else {
    minus.emplace_back("-20", "0", on_z("11"));
  }
  return {static_path("receiver", "1", "0"), static_path("plus", "1", "10"),
          Path{"minus", "-1",
               eom::RetainedHistory("minus-history", std::move(minus))}};
}

int grouping_cases() {
  const std::vector<Group> pair{{"plus", "minus"}};
  const Budgets wide{1e-3, 1e-2};
  // A grouped interval is zero-centred with the size of the pair's whole
  // contribution, so grouped runs need a larger increment budget than the
  // individual route. The same budget is used for both in each comparison.
  const Budgets roomy{1e-6, 1e-6};
  // Known first: the three-path static population without groups, then with
  // the pair declared, four steps of 1/128 to 1/32.
  const Request plain = make("g0", three_static(), "0", "0.03125", kStep,
                             kStep, kKappa, roomy);
  run_case("G-three-path-ungrouped", plain);
  run_case("G-three-path-grouped", grouped(plain, pair));
  // Refinement: eight steps of 1/256 to the same end.
  const Request fine = make("g1", three_static(), "0", "0.03125", kFine,
                            kFine, kKappa, roomy);
  // The same declaration under the default, tighter budget: every step is
  // refused on the increment budget and nothing is published.
  run_case("N-three-path-grouped-tight-budget",
           grouped(make("g1b", three_static(), "0", "0.03125", kStep, kStep),
                   pair));
  run_case("G-three-path-ungrouped-fine", fine);
  run_case("G-three-path-grouped-fine", grouped(fine, pair));
  // Two paths: the only pair's receivers are its own members, so nothing is
  // grouped and the run must equal the undeclared one.
  const Request two = make("g2", static_pair(), "0", "0.015625", kStep, kStep);
  run_case("G-two-path-undeclared", two);
  run_case("G-two-path-declared",
           grouped(two, {{"receiver", "source"}}));

  // Between-node coverage: one long step of 0.125 with and without the
  // bump in the follower's past.
  const Request rest = make("g3", bump_population(false), "0", "0.125",
                            "0.125", "0.125", kKappa, wide);
  const Request bump = make("g4", bump_population(true), "0", "0.125",
                            "0.125", "0.125", kKappa, wide);
  run_case("G-bump-absent-grouped", grouped(rest, pair));
  run_case("G-bump-present-grouped", grouped(bump, pair));
  run_case("G-bump-present-ungrouped", bump);

  // Exact individual fallbacks: each must equal the undeclared run.
  {
    // Mixed dispositions: plus at 19.5 is present, minus at 20.5 is absent.
    const Request mixed = make("g5", three_static("19.5", "20.5"), "0",
                               "0.015625", kStep, kStep, kKappa, roomy);
    run_case("G-mixed-undeclared", mixed);
    run_case("G-mixed-declared", grouped(mixed, pair));
  }
  {
    // Polarity: equal charges.
    const Request same = make("g6", three_static("10", "11", "1"), "0",
                              "0.015625", kStep, kStep, kKappa, roomy);
    run_case("G-same-charge-undeclared", same);
    run_case("G-same-charge-declared", grouped(same, pair));
  }
  {
    // Geometry: the members straddle the receiver, so the source domain
    // contains the receiver box and there is no distance floor.
    const Request straddle = make("g7", three_static("5", "-5"), "0",
                                  "0.015625", kStep, kStep, kKappa, roomy);
    run_case("G-straddle-undeclared", straddle);
    run_case("G-straddle-declared", grouped(straddle, pair));
  }
  {
    // Both members absent for the receiver: beyond the retained past.
    std::vector<Path> far{static_path("receiver", "1", "0"),
                          static_path("plus", "1", "30"),
                          static_path("minus", "-1", "31")};
    const Request absent =
        make("g8", far, "0", "0.015625", kStep, kStep, kKappa, roomy);
    run_case("G-both-absent-undeclared", absent);
    run_case("G-both-absent-declared", grouped(absent, pair));
  }
  // Endpoint: minus exactly at the edge of the retained past. The step
  // declines on the lower sign with the group declared, atomically.
  run_case("N-endpoint-declared",
           grouped(make("g9", three_static("19", "20"), "0", "0.015625",
                        kStep, kStep, kKappa, roomy), pair));
  // Uncertainty: a generated population supplied without its evidence.
  Request first_grouped = grouped(
      make("g10", three_static(), "0", kStep, kStep, kStep, kKappa, roomy),
      pair);
  const Observed grown = evolve(first_grouped);
  {
    Request r = grouped(make("g11", grown.run.paths, kStep, "0.015625", kStep,
                             kStep, kKappa, roomy), pair);
    run_case("N-generated-without-evidence-declared", r);
    r.evidence = grown.run.evidence;
    run_case("K-generated-with-evidence-declared", r);
  }

  // Declarations that are refused before anything else.
  run_case("N-group-unknown-path",
           grouped(plain, {{"plus", "nobody"}}));
  run_case("N-group-one-path-twice", grouped(plain, {{"plus", "plus"}}));
  run_case("N-group-overlapping",
           grouped(plain, {{"plus", "minus"}, {"minus", "receiver"}}));
  refuses_request("N-policy-without-groups", [&] {
    Request r = plain;
    r.pair_policy = eom::kValidatedWholeStepPairPolicy;
    return r;
  }());
  refuses_request("N-groups-without-policy", [&] {
    Request r = plain;
    r.groups = pair;
    return r;
  }());
  refuses_request("N-unknown-pair-policy", [&] {
    Request r = grouped(plain, pair);
    r.pair_policy = "canonical_snapshot_piecewise_validated_tube/v1";
    return r;
  }());

  // Continuation: cancel the grouped run after two steps, then resume with
  // the same declaration, with none, with the members swapped, and with a
  // second pair-free run's continuation.
  const Request whole = grouped(plain, pair);
  const Observed cut = cancelled_after("G-grouped-cancelled-after-two", whole, 2);
  run_case("G-grouped-resumed", resumed_from("g-resumed", cut, whole));
  {
    Request r = resumed_from("g-n1", cut, whole);
    r.pair_policy = "disabled";
    r.groups.clear();
    run_case("N-continuation-groups-removed", r);
  }
  {
    Request r = resumed_from("g-n2", cut, whole);
    r.groups = {{"minus", "plus"}};
    run_case("N-continuation-members-swapped", r);
  }
  {
    const Observed plain_cut = cancelled_after("", plain, 2);
    Request r = resumed_from("g-n3", plain_cut, plain);
    r.pair_policy = eom::kValidatedWholeStepPairPolicy;
    r.groups = pair;
    run_case("N-continuation-groups-added", r);
  }
  // The public producer with and without the declaration.
  eom::ValidatedFarStepProducer producer;
  emit("G-producer-ungrouped", "1",
       producer.step(three_static(), nullptr, "0", kStep, kKappa, roomy));
  emit("G-producer-grouped", "1",
       producer.step(three_static(), nullptr, "0", kStep, kKappa, roomy,
                     std::nullopt, eom::kValidatedFarStepEnclosureIterations,
                     pair));
  return 0;
}

int aliasing_cases() {
  // Resolved from the start.
  run_case("A-control-fine",
           make("a-fine", control(), "0", "2", kFine, kFine), false);
  // Started at the adversarial step; the controller must shorten it.
  run_case("A-control-from-aliased-step",
           make("a-aliased", control(), "0", "2", "2", kFine), false);
  return 0;
}

}  // namespace

int main(int argc, char** argv) {
  const std::string command = argc > 1 ? argv[1] : "";
  try {
    if (command == "known") return known_cases();
    if (command == "controller") return controller_cases();
    if (command == "refusals") return refusal_cases();
    if (command == "cancellation") return cancellation_cases();
    if (command == "aliasing") return aliasing_cases();
    if (command == "continuation") return continuation_cases();
    if (command == "budgets") return budget_cases();
    if (command == "admission") return admission_cases();
    if (command == "ledger") return ledger_cases();
    if (command == "admission-b") return admission_b_cases();
    if (command == "grouping") return grouping_cases();
  } catch (const std::exception& error) {
    std::cout << "{\"case\":\"FATAL\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 3;
  }
  std::cerr << "usage: <known|controller|refusals|cancellation|aliasing|"
               "continuation|budgets|admission|ledger|admission-b|"
               "grouping>\n";
  return 2;
}

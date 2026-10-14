// Manual fixture for the serial validated evolution driver. Emits JSON
// lines; a separate checker compares them with truth references. c_f = 1.
#include "architrino/eom/ValidatedEvolution.hpp"

#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <iostream>
#include <sstream>

namespace eom = architrino::eom;
using Budgets = eom::ValidatedFarStepBudgets;
using Certificate = eom::ValidatedFarStepCertificate;
using Evidence = eom::ValidatedFarStepEvidence;
using Path = eom::ValidatedFarStepPath;
using Request = eom::ValidatedEvolutionRequest;
using Run = eom::ValidatedEvolutionCertificate;

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
              << ",\"growth_position\":" << array3(p.growth_position)
              << ",\"growth_velocity\":" << array3(p.growth_velocity)
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
      array3(value.increment) + ",\"total\":" + array3(value.total) + "}";
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
            << "\",\"start\":\"" << run.run.start_time
            << "\",\"requested_end\":\"" << run.run.requested_end_time
            << "\",\"accepted_end\":\"" << run.run.accepted_end_time
            << "\",\"initial_step\":\"" << request.initial_step
            << "\",\"minimum_step\":\"" << request.minimum_step
            << "\",\"coupling\":\"" << request.coupling
            << "\",\"accepted_steps\":" << run.run.accepted_step_count
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
  emit_run(label, request, observed, all_attempts);
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
  } catch (const std::exception& error) {
    std::cout << "{\"case\":\"FATAL\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 3;
  }
  std::cerr << "usage: <known|controller|refusals|cancellation|aliasing>\n";
  return 2;
}

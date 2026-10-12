// Scratch fixture for version 2 of the validated far-step producer candidate
// and for grouped consumption of its tubes with explicit evidence. Emits
// JSON lines; a separate checker compares them with truth references. Not
// production. c_f = 1.
#include "validated_far_step_candidate_v2.hpp"

#include <iostream>
#include <type_traits>

namespace eom = architrino::eom;
using vfs::Budgets;
using vfs::Certificate;
using vfs::Evidence;
using vfs::Path;
using vfs::Producer;

// The evidence type cannot be built by a caller: its constructor is private.
static_assert(!std::is_constructible_v<
                  eom::ValidatedPopulationEvidence, std::string, std::string,
                  std::string,
                  std::vector<eom::ValidatedPopulationEvidence::Member>>,
              "evidence must be producer-issued only");
static_assert(!std::is_default_constructible_v<
                  eom::ValidatedPopulationEvidence>,
              "evidence must be producer-issued only");

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
          const Certificate& c, const std::vector<Path>* next = nullptr) {
  std::cout << "{\"case\":\"" << label << "\",\"step\":\"" << step_label
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

struct Grown {
  std::vector<Path> paths;
  Evidence evidence;
  std::vector<Certificate> certificates;
};

// Runs `count` steps from exact prescribed data, emitting each certificate.
Grown run(Producer& producer, std::vector<Path> paths,
          const std::string& label, const std::string& h, int count,
          const std::string& kappa = kKappa,
          const std::optional<Budgets>& budgets = kBudgets,
          bool emit_all = true) {
  Grown grown{std::move(paths), nullptr, {}};
  std::string t = grown.paths.front().history.segments().back().t_end_token();
  for (int k = 0; k < count; ++k) {
    auto c = producer.step(grown.paths, grown.evidence, t, h, kappa, budgets);
    if (c.status != "certified") {
      if (!label.empty()) emit(label, std::to_string(k + 1), c);
      grown.certificates.push_back(std::move(c));
      return grown;
    }
    auto next = Producer::extend(grown.paths, c);
    if (!label.empty() && (emit_all || k + 1 == count)) {
      emit(label, std::to_string(k + 1), c, &next);
    }
    grown.paths = std::move(next);
    grown.evidence = c.evidence;
    t = c.end;
    grown.certificates.push_back(std::move(c));
  }
  return grown;
}

std::vector<Path> static_pair(const std::string& source_z = "10") {
  return {static_path("receiver", "1", "0"),
          static_path("source", "1", source_z)};
}

int producer_cases() {
  Producer producer;
  note("K0-sha256-abc", eom::sha256_hex("abc"),
       "expected ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  note("K0-exact-token-tenth", vfs::exact_token(0.1),
       "exact decimal expansion of the binary64 nearest one tenth");
  note("K0-decimal-sum", vfs::decimal_sum("10000000000", "0.0002987"),
       "expected 10000000000.0002987");
  run(producer, static_pair(), "K1-static", kStep, 2);
  const std::vector<Path> three{static_path("receiver", "1", "0"),
                                static_path("plus", "1", "10"),
                                static_path("minus", "-1", "11")};
  run(producer, three, "K2-three-path", kStep, 2);
  const std::vector<Path> control{static_path("receiver", "1", "0"),
                                  oscillating_source()};
  run(producer, control, "T1-control-small", kStep, 2);
  emit("T4-adversarial-unbudgeted", "1",
       producer.step(control, nullptr, "0", "2", kKappa, std::nullopt));
  emit("T4-adversarial-budgeted", "1",
       producer.step(control, nullptr, "0", "2", kKappa, kBudgets));

  // CPP-P2. Histories ending at exactly 10000000000; the binary64 sum of
  // start and step is not the exact end.
  {
    const std::vector<Path> late{
        static_path("receiver", "1", "0", "9999999980", "10000000000"),
        static_path("source", "1", "10", "9999999980", "10000000000")};
    auto c = producer.step(late, nullptr, "10000000000", "0.0002987", "0",
                           std::nullopt);
    if (c.status == "certified") {
      auto next = Producer::extend(late, c);
      emit("P2-exact-end-token", "1", c, &next);
    } else {
      emit("P2-exact-end-token", "1", c);
    }
    emit("N-P2-exponent-start-token", "1",
         producer.step(late, nullptr, "1e10", "0.0002987", "0",
                       std::nullopt));
    emit("N-P2-history-does-not-end-at-start", "1",
         producer.step(late, nullptr, "10000000000.0000001", "0.0002987", "0",
                       std::nullopt));
  }

  // Refusals. Every one must print published:false.
  emit("N-R1-unequal-starts", "1",
       producer.step({static_path("receiver", "1", "0", "-5"),
                      static_path("source", "1", "10")},
                     nullptr, "0", kStep, kKappa, kBudgets));
  const Path arch{"source", "1",
                  eom::RetainedHistory(
                      "source-history",
                      {eom::CubicHistorySegment(
                          "-20", "0", on_z("10", "0", "0.3", "-0.01"))})};
  const std::vector<Path> genuine = static_pair();
  const auto g1 = run(producer, genuine, "", kStep, 1);
  emit("N-R2-arch-after-genuine-step", "1",
       producer.step({static_path("receiver", "1", "0"), arch}, nullptr, "0",
                     kStep, kKappa, std::nullopt));
  emit("N-R2-arch-budgeted", "1",
       producer.step({static_path("receiver", "1", "0"), arch}, nullptr, "0",
                     kStep, kKappa, kBudgets));

  const auto two_piece = [&](const eom::CubicCoefficientTokens& head) {
    return Path{"source", "1",
                eom::RetainedHistory(
                    "source-history",
                    {eom::CubicHistorySegment("-20", "-10", head),
                     eom::CubicHistorySegment("-10", "0", on_z("10"))})};
  };
  const std::vector<Path> base{static_path("receiver", "1", "0"),
                               two_piece(on_z("10"))};
  const auto b1 = run(producer, base, "", kStep, 1);
  emit("P-genuine-second-step", "2",
       producer.step(b1.paths, b1.evidence, kStep, kStep, kKappa, kBudgets));
  {
    Path altered = two_piece(on_z("10.1", "-0.02", "0.001"));
    altered.history =
        altered.history.appended(*b1.certificates[0].paths[1].segment);
    emit("N-R3-altered-ancestor-joins-intact", "2",
         producer.step({b1.paths[0], altered}, b1.evidence, kStep, kStep,
                       kKappa, kBudgets));
  }
  try {
    Path moved = static_path("source", "1", "11");
    moved.history =
        moved.history.appended(*g1.certificates[0].paths[1].segment);
    emit("N-R3-reviewer-source-at-11", "2",
         producer.step({g1.paths[0], moved}, g1.evidence, kStep, kStep, kKappa,
                       kBudgets));
  } catch (const std::exception& error) {
    note("N-R3-reviewer-source-at-11", "refused-by-history-layer",
         error.what());
  }
  {
    const std::vector<Path> other = static_pair("10.5");
    const auto o1 = run(producer, other, "", kStep, 1);
    emit("N-transfer-between-populations", "2",
         producer.step({g1.paths[0], o1.paths[1]}, g1.evidence, kStep, kStep,
                       kKappa, kBudgets));
    emit("N-evidence-missing", "2",
         producer.step(g1.paths, nullptr, kStep, kStep, kKappa, kBudgets));
    emit("N-evidence-of-other-population", "2",
         producer.step(g1.paths, o1.evidence, kStep, kStep, kKappa, kBudgets));
    const auto g2 = run(producer, genuine, "", kStep, 2);
    emit("N-evidence-stale-previous-step", "3",
         producer.step(g2.paths, g1.evidence, g2.certificates[1].end, kStep,
                       kKappa, kBudgets));
    emit("P-evidence-current", "3",
         producer.step(g2.paths, g2.evidence, g2.certificates[1].end, kStep,
                       kKappa, kBudgets));
    emit("N-changed-coupling", "2",
         producer.step(g1.paths, g1.evidence, kStep, kStep, "0.002",
                       kBudgets));
    auto recharged = g1.paths;
    recharged[1].charge = "-1";
    emit("N-changed-charge", "2",
         producer.step(recharged, g1.evidence, kStep, kStep, kKappa,
                       kBudgets));
    auto renamed = g1.paths;
    renamed[0].id = "other";
    emit("N-renamed-path", "2",
         producer.step(renamed, g1.evidence, kStep, kStep, kKappa, kBudgets));
    emit("P-same-population-control", "2",
         producer.step(g1.paths, g1.evidence, kStep, kStep, kKappa, kBudgets));
    const auto refuses = [&](const std::string& label,
                             const std::vector<Path>& onto,
                             const Certificate& certificate) {
      try {
        (void)Producer::extend(onto, certificate);
        note(label, "APPENDED", "");
      } catch (const std::exception& error) {
        note(label, "refused", error.what());
      }
    };
    const auto& first = g1.certificates[0];
    refuses("N-append-on-different-base", other, first);
    auto declined =
        producer.step(genuine, nullptr, "0", "12", kKappa, std::nullopt);
    refuses("N-append-declined", genuine, declined);
    auto altered = first;
    altered.paths[0].segment = o1.certificates[0].paths[0].segment;
    refuses("N-append-altered-segment", genuine, altered);
    auto forged = declined;
    forged.status = "certified";
    forged.paths = first.paths;
    refuses("N-append-forged-status-no-evidence", genuine, forged);
    auto borrowed = declined;
    borrowed.status = "certified";
    borrowed.paths = o1.certificates[0].paths;
    borrowed.evidence = first.evidence;
    refuses("N-append-borrowed-evidence-other-segments", genuine, borrowed);
  }
  emit("N-H2-step-longer-than-separation", "1",
       producer.step(genuine, nullptr, "0", "12", kKappa, std::nullopt));
  emit("N-H3-root-on-boundary", "1",
       producer.step({static_path("receiver", "1", "0", "-10"),
                      static_path("source", "1", "10", "-10")},
                     nullptr, "0", kStep, kKappa, kBudgets));
  {
    const std::vector<Path> fast{
        static_path("receiver", "1", "0", "-200"),
        Path{"source", "1",
             eom::RetainedHistory(
                 "source-history",
                 {eom::CubicHistorySegment("-200", "0",
                                           on_z("-188", "0.99"))})}};
    emit("T-fast-affine-unbudgeted", "1",
         producer.step(fast, nullptr, "0", kStep, kKappa, std::nullopt));
    emit("N-fast-affine-budgeted", "1",
         producer.step(fast, nullptr, "0", kStep, kKappa, kBudgets));
  }
  emit("N-H4-crossing-near-root", "1",
       producer.step(
           {static_path("receiver", "1", "0"),
            Path{"source", "1",
                 eom::RetainedHistory(
                     "source-history",
                     {eom::CubicHistorySegment("-20", "0",
                                               on_z("-19.701", "0.99"))})}},
           nullptr, "0", kStep, kKappa, kBudgets));
  emit("N-H5-one-pass", "1",
       producer.step(genuine, nullptr, "0", kStep, kKappa, kBudgets,
                     std::nullopt, 1));
  emit("N-BUDGET-01-wide-step", "1",
       producer.step(control, nullptr, "0", "0.25", kKappa, kBudgets));
  {
    const auto c = producer.step(control, nullptr, "0", kStep, kKappa,
                                 kBudgets, Budgets{1e-8, 2e-9});
    emit("P-total-budget-first", "1", c);
    if (c.status == "certified") {
      emit("N-BUDGET-02-total", "2",
           producer.step(Producer::extend(control, c), c.evidence, kStep,
                         kStep, kKappa, kBudgets, Budgets{1e-8, 2e-9}));
    }
  }
  emit("P-absent-equal-shallow-starts", "1",
       producer.step({static_path("receiver", "1", "0", "-5"),
                      static_path("source", "1", "10", "-5")},
                     nullptr, "0", kStep, kKappa, kBudgets));
  return 0;
}

int long_case() {
  Producer producer;
  run(producer, {static_path("receiver", "1", "0"), oscillating_source()},
      "T3-control-long", kFine, 512, kKappa, kBudgets, false);
  return 0;
}

int generated_source_cases() {
  Producer producer;
  run(producer, static_pair(), "G1-static-large-steps", "4", 4, kKappa,
      std::nullopt);
  run(producer,
      {static_path("receiver", "1", "0"),
       Path{"source", "1",
            eom::RetainedHistory(
                "source-history",
                {eom::CubicHistorySegment("-20", "0", on_z("8", "0.1"))})}},
      "G2-zero-coupling-straight-line", "4", 4, "0", std::nullopt);
  return 0;
}

void emit_snapshot(const std::string& label, const std::vector<Path>& paths,
                   const Evidence& evidence, const std::string& reception,
                   const std::string& policy, const std::string& coupling,
                   bool traversal) {
  try {
    std::vector<eom::NativeCoupledPathInput> inputs;
    std::vector<eom::NativePublishedPath> histories;
    for (const auto& path : paths) {
      inputs.push_back({path.id, path.charge, path.history});
      histories.push_back({path.id, path.history});
    }
    eom::NativeCoupledEvolutionRequest request{
        .run_id = "validated-far-step-consumer",
        .paths = std::move(inputs),
        .start_time = reception,
        .end_time = reception,
        .initial_step = "0.1",
        .minimum_step = "0.1",
        .field_speed = "1",
        .coupling = coupling,
        .root_tolerance = "1e-9",
        .transmitter_factor_floor = "1e-24",
        .acceleration_tolerance = "1e-4",
        .far_field_enclosure_fraction = "0.5",
        .use_far_field_enclosure_in_evolution = true,
        .matched_pair_enclosure_policy = policy,
        .validated_population_evidence = evidence,
        .root_max_depth = 192,
        .root_max_cells = 300000,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = 512,
        .thread_count = 1,
    };
    request.use_certified_traversal = traversal;
    const auto snapshot =
        eom::certify_native_acceleration_snapshot(request, histories, reception);
    std::cout << "{\"case\":\"" << label << "\",\"policy\":\"" << policy
              << "\",\"traversal\":" << (traversal ? "true" : "false")
              << ",\"reception\":\"" << reception << "\",\"evidence_supplied\":"
              << (evidence != nullptr ? "true" : "false")
              << ",\"status\":\"" << snapshot.status << "\",\"failure_code\":\""
              << snapshot.failure_code << "\",\"route\":\""
              << snapshot.pair_selection_route << "\",\"logical_pairs\":"
              << snapshot.logical_ordered_pairs << ",\"excluded\":"
              << snapshot.traversal_excluded_pairs << ",\"exact\":"
              << snapshot.traversal_exact_pairs << ",\"enclosed\":"
              << snapshot.traversal_enclosed_pairs << ",\"unresolved\":"
              << snapshot.traversal_unresolved_pairs
              << ",\"enclosed_groups\":" << snapshot.matched_pair_enclosed_groups
              << ",\"absent_groups\":" << snapshot.matched_pair_absent_groups
              << ",\"enclosed_width_total\":"
              << num(snapshot.enclosed_error_width_total) << ",\"groups\":[";
    bool first = true;
    for (const auto& g : snapshot.matched_pair_enclosure_certificates) {
      std::cout << (first ? "" : ",") << "{\"receiver\":\""
                << g.receiver_path_id << "\",\"leader\":\"" << g.leader.path_id
                << "\",\"follower\":\"" << g.follower.path_id
                << "\",\"status\":\"" << g.status << "\",\"failure_code\":\""
                << g.failure_code << "\",\"grade\":\"" << g.history_grade
                << "\",\"evidence_bound\":"
                << (g.validated_evidence != nullptr ? "true" : "false")
                << ",\"radius\":"
                << (g.radius_upper ? num(*g.radius_upper) : "null")
                << ",\"emitted_width\":"
                << (g.emitted_width ? num(*g.emitted_width) : "null")
                << ",\"leader_position_radius\":"
                << (g.leader.position_radius_upper
                        ? num(*g.leader.position_radius_upper) : "null")
                << ",\"leader_velocity_radius\":"
                << (g.leader.velocity_radius_upper
                        ? num(*g.leader.velocity_radius_upper) : "null")
                << ",\"relative_speed\":"
                << (g.relative_speed_upper ? num(*g.relative_speed_upper)
                                           : "null")
                << ",\"join_jump\":"
                << (g.join_velocity_jump_upper
                        ? num(*g.join_velocity_jump_upper) : "null")
                << ",\"cells\":" << g.cell_boundaries.size() << "}";
      first = false;
    }
    std::cout << "],\"totals\":{";
    first = true;
    for (const auto& total : snapshot.acceleration.receiver_totals) {
      std::cout << (first ? "" : ",") << "\"" << total.receiver_path_id
                << "\":" << vector3(total.acceleration);
      first = false;
    }
    std::cout << "}}\n";
  } catch (const std::exception& error) {
    note(label, "exception", error.what());
  }
}

int consumer_cases() {
  Producer producer;
  const std::string validated = eom::kMatchedPairPolicySnapshotPiecewiseTube;
  const std::vector<Path> three{static_path("receiver", "1", "0"),
                                static_path("plus", "1", "10"),
                                static_path("minus", "-1", "11")};
  for (const bool traversal : {false, true}) {
    emit_snapshot("C0-exact-histories-disabled", three, nullptr, "0",
                  "disabled", kKappa, traversal);
    emit_snapshot("C0-exact-histories-validated-policy", three, nullptr, "0",
                  validated, kKappa, traversal);
  }
  const auto three3 = run(producer, three, "", kStep, 3);
  const auto grown = run(producer, three, "", kStep, 4);
  if (grown.certificates.size() != 4 || grown.evidence == nullptr) {
    note("C-producer", "FAILED", "four validated steps were not certified");
    return 1;
  }
  const std::string reception = grown.certificates.back().end;
  for (const bool traversal : {false, true}) {
    emit_snapshot("C1-validated-tubes-disabled", grown.paths, nullptr,
                  reception, "disabled", kKappa, traversal);
    emit_snapshot("C1-validated-tubes-grouped", grown.paths, grown.evidence,
                  reception, validated, kKappa, traversal);
    emit_snapshot("C1-validated-tubes-exact-only-policy", grown.paths,
                  grown.evidence, reception,
                  eom::kMatchedPairPolicySnapshotPiecewiseExact, kKappa,
                  traversal);
  }
  // Evidence refusals: each must fall back to the exact evaluation.
  emit_snapshot("N-consumer-no-evidence", grown.paths, nullptr, reception,
                validated, kKappa, false);
  emit_snapshot("N-consumer-stale-evidence", grown.paths, three3.evidence,
                reception, validated, kKappa, false);
  {
    const auto other = run(
        producer,
        {static_path("receiver", "1", "0"), static_path("plus", "1", "10.5"),
         static_path("minus", "-1", "11.5")},
        "", kStep, 4);
    emit_snapshot("N-consumer-evidence-of-other-population", grown.paths,
                  other.evidence, reception, validated, kKappa, false);
  }
  emit_snapshot("N-consumer-changed-coupling", grown.paths, grown.evidence,
                reception, validated, "0.002", false);
  {
    auto recharged = grown.paths;
    recharged[0].charge = "2";
    emit_snapshot("N-consumer-changed-receiver-charge", recharged,
                  grown.evidence, reception, validated, kKappa, false);
  }
  {
    auto altered = grown.paths;
    std::vector<eom::CubicHistorySegment> segments;
    const auto& original = grown.paths[1].history.segments();
    for (std::size_t i = 0; i < original.size(); ++i) {
      const auto s = original.at(i);
      eom::HistoryErrorTokens pv = s.velocity_error_tokens();
      if (i + 1 == original.size()) {
        for (auto& value : pv) {
          value = vfs::exact_token(
              eom::parse_finite_double(value, "radius") * 1.5);
        }
      }
      segments.emplace_back(s.t_start_token(), s.t_end_token(),
                            s.coefficient_tokens(), s.position_error_tokens(),
                            pv);
    }
    try {
      altered[1].history =
          eom::RetainedHistory("plus-history", std::move(segments));
      emit_snapshot("N-consumer-altered-member-radius", altered,
                    grown.evidence, reception, validated, kKappa, false);
    } catch (const std::exception& error) {
      note("N-consumer-altered-member-radius", "refused-by-history-layer",
           error.what());
    }
  }
  return 0;
}

}  // namespace

int main(int argc, char** argv) {
  const std::string command = argc > 1 ? argv[1] : "";
  try {
    if (command == "producer") return producer_cases();
    if (command == "long") return long_case();
    if (command == "generated-source") return generated_source_cases();
    if (command == "consumer") return consumer_cases();
  } catch (const std::exception& error) {
    std::cout << "{\"case\":\"FATAL\",\"exception\":\"" << error.what()
              << "\"}\n";
    return 3;
  }
  std::cerr << "usage: <producer|long|generated-source|consumer>\n";
  return 2;
}

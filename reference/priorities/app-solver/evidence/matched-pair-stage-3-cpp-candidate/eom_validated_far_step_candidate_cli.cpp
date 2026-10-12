// Scratch fixture for the validated far-step producer candidate and for
// grouped consumption of its tubes. Emits JSON lines; a separate checker
// compares them with truth references. Not production. c_f = 1.
#include "validated_far_step_candidate.hpp"

#include "architrino/eom/CoupledEvolution.hpp"

#include <iomanip>
#include <iostream>
#include <sstream>

namespace eom = architrino::eom;
using vfs::Budgets;
using vfs::Certificate;
using vfs::Path;
using vfs::Producer;

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

eom::CubicCoefficientTokens on_z(
    const std::string& c0, const std::string& c1 = "0",
    const std::string& c2 = "0", const std::string& c3 = "0") {
  return {{{"0", "0", "0", "0"}, {"0", "0", "0", "0"}, {c0, c1, c2, c3}}};
}

Path static_path(const std::string& id, const std::string& charge,
                 const std::string& z, const std::string& start = "-20") {
  return {id, charge,
          eom::RetainedHistory(
              id + "-history",
              {eom::CubicHistorySegment(start, "0", on_z(z))})};
}

std::string half_token(int twice) {
  const bool negative = twice < 0;
  const int magnitude = negative ? -twice : twice;
  std::string text = std::to_string(magnitude / 2);
  if (magnitude % 2 != 0) text += ".5";
  return (negative ? "-" : "") + text;
}

// z = 10 + 0.2 p(S), p of period 1; the control's source past.
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
            << "\",\"coupling\":\"" << c.coupling << "\",\"history_start\":"
            << num(c.history_start) << ",\"speed_upper\":"
            << num(c.speed_upper) << ",\"enclosure_iterations\":"
            << c.enclosure_iterations << ",\"record\":" << c.record_index
            << ",\"published\":" << (c.status == "certified" ? "true" : "false")
            << ",\"pairs\":[";
  bool first = true;
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
              << "\",\"fingerprint_before\":\"" << p.fingerprint_before
              << "\",\"fingerprint_after\":\"" << p.fingerprint_after
              << "\",\"acceleration\":" << vector3(p.acceleration)
              << ",\"position_box\":" << vector3(p.position_box)
              << ",\"growth\":[" << num(p.growth_position) << ","
              << num(p.growth_velocity) << "],\"total\":["
              << num(p.total_position) << "," << num(p.total_velocity)
              << "],\"sampled_slack\":" << num(p.sampled_slack);
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

// Runs `count` budgeted steps, emitting each certificate.
std::vector<Path> run(Producer& producer, std::vector<Path> paths,
                      const std::string& label, const std::string& h,
                      int count, const std::string& kappa = kKappa,
                      const std::optional<Budgets>& budgets = kBudgets,
                      bool emit_all = true) {
  double t = paths.front().history.t_end();
  const double hv = eom::parse_finite_double(h, "step");
  for (int k = 0; k < count; ++k) {
    const auto c = producer.step(paths, vfs::token(t), h, kappa, budgets);
    if (c.status != "certified") {
      emit(label, std::to_string(k + 1), c);
      return paths;
    }
    auto next = producer.extend(paths, c);
    if (emit_all || k + 1 == count) {
      emit(label, std::to_string(k + 1), c, &next);
    }
    paths = std::move(next);
    t += hv;
  }
  return paths;
}

int producer_cases() {
  Producer producer;
  // Known first.
  run(producer, {static_path("receiver", "1", "0"),
                 static_path("source", "1", "10")}, "K1-static", kStep, 2);
  // Three paths, opposite sources, static past.
  const std::vector<Path> three{static_path("receiver", "1", "0"),
                                static_path("plus", "1", "10"),
                                static_path("minus", "-1", "11")};
  run(producer, three, "K2-three-path", kStep, 2);
  // Control past, small steps.
  const std::vector<Path> control{static_path("receiver", "1", "0"),
                                  oscillating_source()};
  run(producer, control, "T1-control-small", kStep, 2);
  emit("T4-adversarial-unbudgeted", "1",
       producer.step(control, "0", "2", kKappa, std::nullopt));
  emit("T4-adversarial-budgeted", "1",
       producer.step(control, "0", "2", kKappa, kBudgets));

  // Negatives. Every one must print published:false.
  emit("N-R1-unequal-starts", "1",
       producer.step({static_path("receiver", "1", "0", "-5"),
                      static_path("source", "1", "10")},
                     "0", kStep, kKappa, kBudgets));
  // Decimal variant of the reviewer's speed arch: velocity zero at both
  // ends, peak speed 3 at the middle.
  const Path arch{"source", "1",
                  eom::RetainedHistory(
                      "source-history",
                      {eom::CubicHistorySegment(
                          "-20", "0", on_z("10", "0", "0.3", "-0.01"))})};
  const std::vector<Path> genuine{static_path("receiver", "1", "0"),
                                  static_path("source", "1", "10")};
  const auto first = producer.step(genuine, "0", kStep, kKappa, kBudgets);
  emit("N-R2-arch-after-genuine-step", "1",
       producer.step({static_path("receiver", "1", "0"), arch}, "0", kStep,
                     kKappa, std::nullopt));
  emit("N-R2-arch-budgeted", "1",
       producer.step({static_path("receiver", "1", "0"), arch}, "0", kStep,
                     kKappa, kBudgets));

  // R3. Source past in two prescribed segments, so an altered first segment
  // that keeps the join at -10 passes the history layer and only the
  // ancestry record can refuse it.
  const auto two_piece = [&](const eom::CubicCoefficientTokens& head) {
    return Path{"source", "1",
                eom::RetainedHistory(
                    "source-history",
                    {eom::CubicHistorySegment("-20", "-10", head),
                     eom::CubicHistorySegment("-10", "0", on_z("10"))})};
  };
  const std::vector<Path> base{static_path("receiver", "1", "0"),
                               two_piece(on_z("10"))};
  const auto c1 = producer.step(base, "0", kStep, kKappa, kBudgets);
  const auto grown = producer.extend(base, c1);
  emit("P-genuine-second-step", "2",
       producer.step(grown, kStep, kStep, kKappa, kBudgets));
  {
    // z = 10 + 0.001 (S + 10)^2 on [-20, -10]: 10.1 - 0.02 d + 0.001 d^2.
    Path altered = two_piece(on_z("10.1", "-0.02", "0.001"));
    altered.history = altered.history.appended(*c1.paths[1].segment);
    emit("N-R3-altered-ancestor-joins-intact", "2",
         producer.step({grown[0], altered}, kStep, kStep, kKappa, kBudgets));
  }
  try {
    Path moved = static_path("source", "1", "11");
    moved.history = moved.history.appended(*first.paths[1].segment);
    emit("N-R3-reviewer-source-at-11", "2",
         producer.step({producer.extend(genuine, first)[0], moved}, kStep,
                       kStep, kKappa, kBudgets));
  } catch (const std::exception& error) {
    note("N-R3-reviewer-source-at-11", "refused-by-history-layer",
         error.what());
  }
  {
    // Receiver from one genuine population, source from another.
    const std::vector<Path> other{static_path("receiver", "1", "0"),
                                  static_path("source", "1", "10.5")};
    const auto co = producer.step(other, "0", kStep, kKappa, kBudgets);
    const auto grown_other = producer.extend(other, co);
    const auto grown_genuine = producer.extend(genuine, first);
    emit("N-transfer-between-populations", "2",
         producer.step({grown_genuine[0], grown_other[1]}, kStep, kStep,
                       kKappa, kBudgets));
    emit("N-changed-coupling", "2",
         producer.step(grown_genuine, kStep, kStep, "0.002", kBudgets));
    auto recharged = grown_genuine;
    recharged[1].charge = "-1";
    emit("N-changed-charge", "2",
         producer.step(recharged, kStep, kStep, kKappa, kBudgets));
    auto renamed = grown_genuine;
    renamed[0].id = "other";
    emit("N-renamed-path", "2",
         producer.step(renamed, kStep, kStep, kKappa, kBudgets));
    emit("P-same-population-control", "2",
         producer.step(grown_genuine, kStep, kStep, kKappa, kBudgets));
    // Append refusals.
    const auto refuses = [&](const std::string& label,
                             const std::vector<Path>& onto,
                             const Certificate& certificate) {
      try {
        (void)producer.extend(onto, certificate);
        note(label, "APPENDED", "");
      } catch (const std::exception& error) {
        note(label, "refused", error.what());
      }
    };
    refuses("N-append-on-different-base", other, first);
    auto declined = producer.step(genuine, "0", "12", kKappa, std::nullopt);
    refuses("N-append-declined", genuine, declined);
    auto altered = first;
    altered.paths[0].segment = co.paths[0].segment;
    refuses("N-append-altered-segment", genuine, altered);
    auto forged = declined;
    forged.status = "certified";
    forged.paths = first.paths;
    refuses("N-append-forged-status", genuine, forged);
  }
  emit("N-H2-step-longer-than-separation", "1",
       producer.step(genuine, "0", "12", kKappa, std::nullopt));
  emit("N-H3-root-on-boundary", "1",
       producer.step({static_path("receiver", "1", "0", "-10"),
                      static_path("source", "1", "10", "-10")},
                     "0", kStep, kKappa, kBudgets));
  {
    // The reviewer's fast affine source, z = -188 + 0.99 (S + 200). Its real
    // root at reception zero is -1000/199 with acceleration -199/10000000.
    const std::vector<Path> fast{
        static_path("receiver", "1", "0", "-200"),
        Path{"source", "1",
             eom::RetainedHistory(
                 "source-history",
                 {eom::CubicHistorySegment("-200", "0",
                                           on_z("-188", "0.99"))})}};
    emit("T-fast-affine-unbudgeted", "1",
         producer.step(fast, "0", kStep, kKappa, std::nullopt));
    emit("N-fast-affine-budgeted", "1",
         producer.step(fast, "0", kStep, kKappa, kBudgets));
  }
  // A source that passes through the receiver's position 0.05 before its
  // root: z = 0.99 (S + 0.1). The real root is regular, but no window that
  // contains it excludes the crossing, so the distance floor stays zero.
  emit("N-H4-crossing-near-root", "1",
       producer.step(
           {static_path("receiver", "1", "0"),
            Path{"source", "1",
                 eom::RetainedHistory(
                     "source-history",
                     {eom::CubicHistorySegment("-20", "0",
                                               on_z("-19.701", "0.99"))})}},
           "0", kStep, kKappa, kBudgets));
  emit("N-H5-one-pass", "1",
       producer.step(genuine, "0", kStep, kKappa, kBudgets, std::nullopt, 1));
  emit("N-BUDGET-01-wide-step", "1",
       producer.step(control, "0", "0.25", kKappa, kBudgets));
  {
    const auto c = producer.step(control, "0", kStep, kKappa, kBudgets,
                                 Budgets{1e-8, 2e-9});
    emit("P-total-budget-first", "1", c);
    emit("N-BUDGET-02-total", "2",
         producer.step(producer.extend(control, c), kStep, kStep, kKappa,
                       kBudgets, Budgets{1e-8, 2e-9}));
  }
  emit("P-absent-equal-shallow-starts", "1",
       producer.step({static_path("receiver", "1", "0", "-5"),
                      static_path("source", "1", "10", "-5")},
                     "0", kStep, kKappa, kBudgets));
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
  // Static start, large steps: from the third step the receiver's roots on
  // the source fall on generated segments.
  run(producer, {static_path("receiver", "1", "0"),
                 static_path("source", "1", "10")},
      "G1-static-large-steps", "4", 4, kKappa, std::nullopt);
  // Zero coupling: exact straight lines. Source z = 10 + 0.1 S.
  run(producer,
      {static_path("receiver", "1", "0"),
       Path{"source", "1",
            eom::RetainedHistory(
                "source-history",
                {eom::CubicHistorySegment("-20", "0", on_z("8", "0.1"))})}},
      "G2-zero-coupling-straight-line", "4", 4, "0", std::nullopt);
  return 0;
}

eom::NativeCoupledEvolutionRequest snapshot_request(
    const std::vector<Path>& paths, const std::string& reception,
    const std::string& policy, const std::string& coupling, bool traversal,
    std::vector<eom::NativePublishedPath>& histories) {
  std::vector<eom::NativeCoupledPathInput> inputs;
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
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .thread_count = 1,
  };
  request.use_certified_traversal = traversal;
  return request;
}

void emit_snapshot(const std::string& label, const std::vector<Path>& paths,
                   const std::string& reception, const std::string& policy,
                   const std::string& coupling, bool traversal) {
  try {
    std::vector<eom::NativePublishedPath> histories;
    const auto request = snapshot_request(
        paths, reception, policy, coupling, traversal, histories);
    const auto snapshot =
        eom::certify_native_acceleration_snapshot(request, histories, reception);
    std::cout << "{\"case\":\"" << label << "\",\"policy\":\"" << policy
              << "\",\"traversal\":" << (traversal ? "true" : "false")
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
              << num(snapshot.enclosed_error_width_total)
              << ",\"enclosed_width_max_receiver\":"
              << num(snapshot.enclosed_error_width_max_receiver)
              << ",\"groups\":[";
    bool first = true;
    for (const auto& g : snapshot.matched_pair_enclosure_certificates) {
      std::cout << (first ? "" : ",") << "{\"receiver\":\""
                << g.receiver_path_id << "\",\"leader\":\"" << g.leader.path_id
                << "\",\"follower\":\"" << g.follower.path_id
                << "\",\"status\":\"" << g.status << "\",\"failure_code\":\""
                << g.failure_code << "\",\"grade\":\"" << g.history_grade
                << "\",\"radius\":"
                << (g.radius_upper ? num(*g.radius_upper) : "null")
                << ",\"emitted_width\":"
                << (g.emitted_width ? num(*g.emitted_width) : "null")
                << ",\"leader_position_radius\":"
                << (g.leader.position_radius_upper
                        ? num(*g.leader.position_radius_upper) : "null")
                << ",\"leader_velocity_radius\":"
                << (g.leader.velocity_radius_upper
                        ? num(*g.leader.velocity_radius_upper) : "null")
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
  // Known first: exact prescribed histories, no radii, at reception 0.
  for (const bool traversal : {false, true}) {
    emit_snapshot("C0-exact-histories-disabled", three, "0", "disabled",
                  kKappa, traversal);
    emit_snapshot("C0-exact-histories-validated-policy", three, "0",
                  validated, kKappa, traversal);
  }
  auto paths = three;
  double t = 0.0;
  for (int k = 0; k < 4; ++k) {
    const auto c = producer.step(paths, vfs::token(t), kStep, kKappa, kBudgets);
    if (c.status != "certified") {
      emit("C-producer", std::to_string(k + 1), c);
      return 1;
    }
    paths = producer.extend(paths, c);
    t += 0.0078125;
  }
  const std::string reception = vfs::token(t);
  for (const bool traversal : {false, true}) {
    emit_snapshot("C1-validated-tubes-disabled", paths, reception, "disabled",
                  kKappa, traversal);
    emit_snapshot("C1-validated-tubes-grouped", paths, reception, validated,
                  kKappa, traversal);
    emit_snapshot("C1-validated-tubes-exact-only-policy", paths, reception,
                  eom::kMatchedPairPolicySnapshotPiecewiseExact, kKappa,
                  traversal);
  }
  // Evidence negatives: each must fall back to the exact evaluation.
  emit_snapshot("N-consumer-changed-coupling", paths, reception, validated,
                "0.002", false);
  {
    auto recharged = paths;
    recharged[0].charge = "2";
    emit_snapshot("N-consumer-changed-receiver-charge", recharged, reception,
                  validated, kKappa, false);
  }
  {
    // A member history with the same nominal curve and a smaller declared
    // radius: a different fingerprint, not a registered population.
    auto shrunk = paths;
    std::vector<eom::CubicHistorySegment> segments;
    const auto& original = paths[1].history.segments();
    for (std::size_t i = 0; i < original.size(); ++i) {
      const auto s = original.at(i);
      eom::HistoryErrorTokens px = s.position_error_tokens();
      eom::HistoryErrorTokens pv = s.velocity_error_tokens();
      if (i + 1 == original.size()) {
        for (auto& value : pv) {
          value = vfs::token(eom::parse_finite_double(value, "radius") * 1.5);
        }
      }
      segments.emplace_back(s.t_start_token(), s.t_end_token(),
                            s.coefficient_tokens(), px, pv);
    }
    try {
      shrunk[1].history =
          eom::RetainedHistory("plus-history", std::move(segments));
      emit_snapshot("N-consumer-altered-member-radius", shrunk, reception,
                    validated, kKappa, false);
    } catch (const std::exception& error) {
      note("N-consumer-altered-member-radius", "refused-by-history-layer",
           error.what());
    }
  }
  eom::matched_pair_clear_validated_populations();
  emit_snapshot("N-consumer-registry-cleared", paths, reception, validated,
                kKappa, false);
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

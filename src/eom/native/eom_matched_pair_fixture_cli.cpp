// Focused manual fixture for the matched-pair enclosure module. It prints one
// JSON line per control and judges nothing: containment of independently
// evaluated exact accelerations is decided by a separately authored reference.
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

std::string number(double value) {
  std::ostringstream stream;
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

std::string json_interval(const eom::Interval& value) {
  return "[" + number(value.lower()) + "," + number(value.upper()) + "]";
}

std::string json_vector(const eom::IntervalVector& value) {
  return "[" + json_interval(value[0]) + "," + json_interval(value[1]) + "," +
      json_interval(value[2]) + "]";
}

template <typename T, typename Printer>
std::string optional_json(const std::optional<T>& value, Printer printer) {
  return value.has_value() ? printer(*value) : std::string("null");
}

std::string json_member(const eom::MatchedPairMemberEvidence& member) {
  std::ostringstream out;
  out << "{\"path_id\":\"" << member.path_id << "\",\"charge\":\""
      << member.charge << "\",\"history_fingerprint\":\""
      << member.history_fingerprint << "\",\"segment_index\":"
      << (member.segment_index.has_value()
              ? std::to_string(*member.segment_index)
              : std::string("null"))
      << ",\"segment_start\":\"" << member.segment_start
      << "\",\"segment_end\":\"" << member.segment_end
      << "\",\"window_start_residual\":"
      << optional_json(member.window_start_residual, json_interval)
      << ",\"disposition\":\"" << member.disposition
      << "\",\"history_start\":\"" << member.history_start
      << "\",\"prefix_residual\":"
      << optional_json(member.prefix_residual, json_interval) << "}";
  return out.str();
}

void print_certificate(
    const std::string& control,
    const eom::NativeMatchedPairEnclosureCertificate& certificate) {
  const auto scalar = [](const std::optional<double>& value) {
    return optional_json(value, number);
  };
  std::cout << "{\"control\":\"" << control << "\",\"schema\":\""
            << certificate.schema << "\",\"group_id\":\""
            << certificate.group_id << "\",\"policy\":\"" << certificate.policy
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"receiver_path_id\":\"" << certificate.receiver_path_id
            << "\",\"reception_time\":\"" << certificate.reception_time
            << "\",\"emission_lower\":\"" << certificate.emission_lower
            << "\",\"emission_upper\":\"" << certificate.emission_upper
            << "\",\"receiver_charge\":\"" << certificate.receiver_charge
            << "\",\"coupling\":\"" << certificate.coupling
            << "\",\"field_speed\":\"" << certificate.field_speed
            << "\",\"far_field_enclosure_fraction\":\""
            << certificate.far_field_enclosure_fraction
            << "\",\"acceleration_tolerance\":\""
            << certificate.acceleration_tolerance
            << "\",\"window_coverage\":\"" << certificate.window_coverage
            << "\""
            << ",\"transmitter_count\":" << certificate.transmitter_count
            << ",\"leader\":" << json_member(certificate.leader)
            << ",\"follower\":" << json_member(certificate.follower)
            << ",\"receiver_position_hull\":"
            << optional_json(certificate.receiver_position_hull, json_vector)
            << ",\"source_domain_hull\":"
            << optional_json(certificate.source_domain_hull, json_vector)
            << ",\"distance_floor\":" << scalar(certificate.distance_floor)
            << ",\"speed_upper\":" << scalar(certificate.speed_upper)
            << ",\"transmitter_factor_floor\":"
            << scalar(certificate.transmitter_factor_floor)
            << ",\"separation_upper\":" << scalar(certificate.separation_upper)
            << ",\"relative_speed_upper\":"
            << scalar(certificate.relative_speed_upper)
            << ",\"acceleration_upper\":"
            << scalar(certificate.acceleration_upper)
            << ",\"prefactor_upper\":" << scalar(certificate.prefactor_upper)
            << ",\"radius_upper\":" << scalar(certificate.radius_upper)
            << ",\"member_width_slice\":"
            << optional_json(certificate.member_width_slice, json_interval)
            << ",\"admission_width_threshold\":"
            << scalar(certificate.admission_width_threshold)
            << ",\"emitted_width\":" << scalar(certificate.emitted_width)
            << ",\"acceleration\":"
            << optional_json(certificate.acceleration, json_vector);
  // Piecewise fields are printed only for piecewise policies, so single-slab
  // lines keep their reviewed bytes.
  if (certificate.policy != eom::kMatchedPairPolicySnapshotSingleSlab &&
      eom::matched_pair_policy_is_known(certificate.policy)) {
    std::cout << ",\"history_grade\":\"" << certificate.history_grade
              << "\",\"cell_boundaries\":[";
    for (std::size_t index = 0U; index < certificate.cell_boundaries.size();
         ++index) {
      std::cout << (index == 0U ? "" : ",") << "\""
                << certificate.cell_boundaries[index] << "\"";
    }
    std::cout << "],\"join_velocity_jump_upper\":"
              << scalar(certificate.join_velocity_jump_upper)
              << ",\"leader_last_segment\":"
              << (certificate.leader.last_segment_index.has_value()
                      ? std::to_string(*certificate.leader.last_segment_index)
                      : std::string("null"))
              << ",\"follower_last_segment\":"
              << (certificate.follower.last_segment_index.has_value()
                      ? std::to_string(
                            *certificate.follower.last_segment_index)
                      : std::string("null"));
  }
  std::cout << "}\n";
}

using Coefficients = eom::CubicCoefficientTokens;

eom::RetainedHistory one_segment(
    const std::string& id,
    const std::string& start,
    const std::string& end,
    const Coefficients& coefficients,
    const std::string& position_error = "0",
    const std::string& velocity_error = "0") {
  return eom::RetainedHistory(
      id, {eom::CubicHistorySegment(
              start, end, coefficients, position_error, velocity_error)});
}

Coefficients constant(
    const std::string& x, const std::string& y, const std::string& z) {
  return {{{x, "0", "0", "0"}, {y, "0", "0", "0"}, {z, "0", "0", "0"}}};
}

struct Case {
  std::string name;
  eom::RetainedHistory receiver;
  eom::RetainedHistory leader;
  eom::RetainedHistory follower;
  std::string reception;
  std::string lower;
  std::string leader_charge = "1";
  std::string follower_charge = "-1";
  std::string tolerance = "0.001";
  std::string fraction = "0.5";
  std::string field_speed = "1";
  std::string policy = eom::kMatchedPairPolicySnapshotSingleSlab;
  std::string receiver_charge = "1";
  std::string coupling = "1";
  std::size_t transmitter_count = 3U;
};

eom::NativeMatchedPairEnclosureCertificate run(const Case& test) {
  return eom::certify_matched_pair_enclosure({
      .policy = test.policy,
      .receiver_path_id = "receiver",
      .receiver_history = &test.receiver,
      .receiver_charge = test.receiver_charge,
      .leader_path_id = "plus",
      .leader_history = &test.leader,
      .leader_charge = test.leader_charge,
      .follower_path_id = "minus",
      .follower_history = &test.follower,
      .follower_charge = test.follower_charge,
      .coupling = test.coupling,
      .field_speed = test.field_speed,
      .reception_time = test.reception,
      .emission_lower = test.lower,
      .far_field_enclosure_fraction = test.fraction,
      .acceleration_tolerance = test.tolerance,
      .transmitter_count = test.transmitter_count,
  });
}

Case static_pair(
    const std::string& name,
    const std::string& start,
    const std::string& receiver_error = "0") {
  return {
      .name = name,
      .receiver = one_segment(
          "receiver-history", start, "0", constant("0", "0", "0"),
          receiver_error, "0"),
      .leader = one_segment(
          "plus-history", start, "0", constant("0", "0", "10.005")),
      .follower = one_segment(
          "minus-history", start, "0", constant("0", "0", "9.995")),
      .reception = "0",
      .lower = start,
  };
}

}  // namespace

int run_piecewise();
#ifdef EOM_MATCHED_PAIR_SNAPSHOT_FIXTURE
int run_snapshot_file(const std::string& path);
int run_evolution_guard();
int run_matrix_negatives(bool piecewise);
#endif

int main(int argc, char** argv) {
#ifdef EOM_MATCHED_PAIR_SNAPSHOT_FIXTURE
  if (argc == 3 && std::string(argv[1]) == "snapshot-file") {
    return run_snapshot_file(argv[2]);
  }
  if (argc == 2 && std::string(argv[1]) == "evolution-guard") {
    return run_evolution_guard();
  }
  if (argc == 2 && std::string(argv[1]) == "matrix-negatives") {
    return run_matrix_negatives(false);
  }
  if (argc == 2 && std::string(argv[1]) == "matrix-negatives-piecewise") {
    return run_matrix_negatives(true);
  }
#endif
  if (argc == 2 && std::string(argv[1]) == "piecewise") {
    return run_piecewise();
  }
  if (argc != 2 || std::string(argv[1]) != "all") {
    std::cerr << "usage: eom_matched_pair_fixture_cli all | piecewise | "
                 "snapshot-file <cases.txt> | evolution-guard | "
                 "matrix-negatives | matrix-negatives-piecewise\n";
    return 2;
  }
  try {
    // Exact-token predicates first: these are the known cases of the
    // comparison helper and are printed before any certificate.
    std::cout << "{\"control\":\"token_predicates\",\"opposite_1_-1\":"
              << eom::exact_decimal_tokens_are_opposite("1", "-1")
              << ",\"opposite_1_-1.0\":"
              << eom::exact_decimal_tokens_are_opposite("1", "-1.0")
              << ",\"opposite_1e0_-10e-1\":"
              << eom::exact_decimal_tokens_are_opposite("1e0", "-10e-1")
              << ",\"opposite_1_1\":"
              << eom::exact_decimal_tokens_are_opposite("1", "1")
              << ",\"opposite_1_-1.0000000001\":"
              << eom::exact_decimal_tokens_are_opposite("1", "-1.0000000001")
              << ",\"opposite_0_-0\":"
              << eom::exact_decimal_tokens_are_opposite("0", "-0")
              << ",\"compare_-20_-10.005\":"
              << eom::compare_exact_decimal_tokens("-20", "-10.005")
              << ",\"compare_0.1_1e-1\":"
              << eom::compare_exact_decimal_tokens("0.1", "1e-1")
              << ",\"compare_2_10\":"
              << eom::compare_exact_decimal_tokens("2", "10")
              << ",\"zero_0.000\":" << eom::exact_decimal_token_is_zero("0.000")
              << ",\"zero_1e-300\":"
              << eom::exact_decimal_token_is_zero("1e-300") << "}\n";

    std::vector<Case> cases;
    cases.push_back(static_pair("static_pair_present", "-20"));
    cases.push_back(static_pair("static_pair_both_absent", "-5"));
    cases.push_back(static_pair("static_pair_one_missing", "-10"));
    cases.push_back(static_pair("static_pair_endpoint_root", "-10.005"));
    cases.push_back(
        static_pair("receiver_box_uniform_sign", "-10.006", "0.0001"));
    cases.push_back(
        static_pair("receiver_box_crosses_sign", "-10.006", "0.002"));

    // Affine moving pair, 7-24-25 geometry scaled by 1/25: both causal roots
    // are exactly at S = 0 for the receiver at (0, 0, 0.96) and T_r = 1.
    // Segment local time is S + 0.5, so z = -/+0.05 +/- 0.1 (S + 0.5).
    cases.push_back({
        .name = "affine_moving_pair",
        .receiver = one_segment(
            "receiver-history", "-0.5", "1", constant("0", "0", "0.96")),
        .leader = one_segment(
            "plus-history", "-0.5", "1",
            Coefficients{{{"0.28", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"-0.05", "0.1", "0", "0"}}}),
        .follower = one_segment(
            "minus-history", "-0.5", "1",
            Coefficients{{{"-0.28", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"0.05", "-0.1", "0", "0"}}}),
        .reception = "1",
        .lower = "-0.5",
        .tolerance = "100",
    });
    // Quadratic pair with nonzero acceleration: z = R + 0.016 S^2 with
    // R = 10 and 9.225; exact roots S = -12.5 and -11.25 for T_r = 0.
    // Segment local time is S + 15.
    cases.push_back({
        .name = "quadratic_pair",
        .receiver = one_segment(
            "receiver-history", "-15", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-15", "0",
            Coefficients{{{"0", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"13.6", "-0.48", "0.016", "0"}}}),
        .follower = one_segment(
            "minus-history", "-15", "0",
            Coefficients{{{"0", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"12.825", "-0.48", "0.016", "0"}}}),
        .reception = "0",
        .lower = "-15",
        .tolerance = "0.1",
    });
    // Same quadratic pair read through a window that starts inside the
    // segment, exercising the certified re-expansion about the window start.
    {
      // A window that starts inside the retained history is admitted only
      // when the route itself re-proves, from each member's own history, that
      // the earlier retained interval holds no causal root. With the window
      // start at -14 both roots (-12.5 and -11.25) lie in the window and the
      // prefix [-15, -14] is root free, so the re-proof succeeds.
      Case shifted = cases.back();
      shifted.name = "quadratic_pair_interior_window_prefix_reproved";
      shifted.lower = "-14";
      cases.push_back(shifted);
      // With the window start at -12 the leader's root at -12.5 lies in the
      // prefix. No caller-supplied evidence exists to claim otherwise; the
      // re-proof fails and the route must decline.
      shifted.name = "declined_member_root_in_prefix";
      shifted.lower = "-12";
      cases.push_back(shifted);
      // With the window start at -11 both roots lie in the prefix.
      shifted.name = "declined_both_roots_in_prefix";
      shifted.lower = "-11";
      cases.push_back(shifted);
    }

    // Eligibility declines.
    {
      Case same = static_pair("declined_same_polarity", "-20");
      same.follower_charge = "1";
      cases.push_back(same);
      Case unequal = static_pair("declined_unequal_magnitude", "-20");
      unequal.follower_charge = "-1.0000000001";
      cases.push_back(unequal);
      Case equivalent = static_pair("admitted_equivalent_token_forms", "-20");
      equivalent.leader_charge = "1.0";
      equivalent.follower_charge = "-10e-1";
      cases.push_back(equivalent);
      Case speed = static_pair("declined_field_speed_not_one", "-20");
      speed.field_speed = "2";
      cases.push_back(speed);
      Case zero = static_pair("declined_zero_magnitude", "-20");
      zero.leader_charge = "0";
      zero.follower_charge = "-0";
      cases.push_back(zero);
      Case negative_coupling = static_pair("admitted_negative_coupling", "-20");
      negative_coupling.coupling = "-1";
      cases.push_back(negative_coupling);
      Case exponent_forms = static_pair("admitted_exponent_sign_forms", "-20");
      exponent_forms.leader_charge = "+2.50e-1";
      exponent_forms.follower_charge = "-0.25";
      cases.push_back(exponent_forms);
      Case disabled = static_pair("declined_policy_disabled", "-20");
      disabled.policy = eom::kMatchedPairPolicyDisabled;
      cases.push_back(disabled);
    }
    cases.push_back({
        .name = "declined_nonzero_error_token",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-20", "0", constant("0", "0", "10.005")),
        .follower = one_segment(
            "minus-history", "-20", "0", constant("0", "0", "9.995"),
            "1e-12", "0"),
        .reception = "0",
        .lower = "-20",
    });
    cases.push_back({
        .name = "declined_two_segment_history",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-20", "0", constant("0", "0", "10.005")),
        .follower = eom::RetainedHistory(
            "minus-history",
            {eom::CubicHistorySegment(
                 "-20", "-10", constant("0", "0", "9.995")),
             eom::CubicHistorySegment(
                 "-10", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-20",
    });
    cases.push_back({
        .name = "declined_uniform_circular_factory_history",
        .receiver = one_segment(
            "receiver-history", "-1", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-1", "0", constant("0", "0", "10.005")),
        .follower = eom::RetainedHistory::uniform_circular(
            "minus-history",
            {.t_start = "-1",
             .t_end = "0",
             .maximum_segment_step = "2",
             .cylindrical_radius = "0.1",
             .height = "10",
             .angular_speed = "1",
             .tangential_speed = "0.1",
             .phase = "0"}),
        .reception = "0",
        .lower = "-1",
    });
    cases.push_back({
        .name = "declined_speed_bound_reaches_one",
        .receiver = one_segment(
            "receiver-history", "-1", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-1", "0",
            Coefficients{{{"0", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"10", "1", "0", "0"}}}),
        .follower = one_segment(
            "minus-history", "-1", "0",
            Coefficients{{{"0", "0", "0", "0"},
                          {"0", "0", "0", "0"},
                          {"9", "1", "0", "0"}}}),
        .reception = "0",
        .lower = "-1",
    });
    cases.push_back({
        .name = "declined_receiver_inside_source_domain",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "10")),
        .leader = one_segment(
            "plus-history", "-20", "0", constant("0", "0", "10.005")),
        .follower = one_segment(
            "minus-history", "-20", "0", constant("0", "0", "9.995")),
        .reception = "0",
        .lower = "-20",
    });

    // Coverage controls requested by the Stage 1 review.
    // Unequal retained starts: the follower has ten more time units of
    // retained history than the window covers; its root-free prefix is
    // re-proved from its own history.
    cases.push_back({
        .name = "unequal_starts_follower_prefix_reproved",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-20", "0", constant("0", "0", "10.005")),
        .follower = one_segment(
            "minus-history", "-30", "0", constant("0", "0", "9.995")),
        .reception = "0",
        .lower = "-20",
    });
    // Unequal retained starts where the window starts before the leader's
    // retained history exists: no segment covers the window.
    cases.push_back({
        .name = "declined_window_precedes_member_history",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-11", "0", constant("0", "0", "10.005")),
        .follower = one_segment(
            "minus-history", "-20", "0", constant("0", "0", "9.995")),
        .reception = "0",
        .lower = "-20",
    });
    // Arithmetic failure: the cube of the distance floor underflows, so the
    // radius cannot be evaluated; the route declines instead of emitting.
    cases.push_back({
        .name = "declined_radius_not_evaluable_underflow",
        .receiver = one_segment(
            "receiver-history", "-1", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-1", "0", constant("0", "0", "2e-160")),
        .follower = one_segment(
            "minus-history", "-1", "0", constant("0", "0", "1e-160")),
        .reception = "0",
        .lower = "-1",
    });
    // Arithmetic failure: a finite but very large position makes the squared
    // distance overflow binary64, so a bound is nonfinite. (A history whose
    // own position hull is nonfinite cannot be constructed at all; the
    // retained-history layer refuses it before any enclosure route.)
    cases.push_back({
        .name = "declined_nonfinite_norm_arithmetic",
        .receiver = one_segment(
            "receiver-history", "-20", "0", constant("0", "0", "0")),
        .leader = one_segment(
            "plus-history", "-20", "0", constant("0", "0", "1e200")),
        .follower = one_segment(
            "minus-history", "-20", "0", constant("0", "0", "9.995")),
        .reception = "0",
        .lower = "-20",
    });
    {
      Case token = static_pair("declined_non_decimal_charge_token", "-20");
      token.leader_charge = "one";
      cases.push_back(token);
    }

    std::optional<double> static_width;
    for (const auto& test : cases) {
      const auto certificate = run(test);
      if (test.name == "static_pair_present") {
        static_width = certificate.emitted_width;
      }
      print_certificate(test.name, certificate);
    }

    // Identity declines use the same history object in two roles.
    {
      const Case base = static_pair("identity", "-20");
      auto self = eom::certify_matched_pair_enclosure({
          .policy = eom::kMatchedPairPolicySnapshotSingleSlab,
          .receiver_path_id = "plus",
          .receiver_history = &base.leader,
          .receiver_charge = "1",
          .leader_path_id = "plus",
          .leader_history = &base.leader,
          .leader_charge = "1",
          .follower_path_id = "minus",
          .follower_history = &base.follower,
          .follower_charge = "-1",
          .coupling = "1",
          .field_speed = "1",
          .reception_time = "0",
          .emission_lower = "-20",
          .far_field_enclosure_fraction = "0.5",
          .acceleration_tolerance = "0.001",
          .transmitter_count = 3U,
      });
      print_certificate("declined_self_member", self);
      auto repeated = eom::certify_matched_pair_enclosure({
          .policy = eom::kMatchedPairPolicySnapshotSingleSlab,
          .receiver_path_id = "receiver",
          .receiver_history = &base.receiver,
          .receiver_charge = "1",
          .leader_path_id = "plus",
          .leader_history = &base.leader,
          .leader_charge = "1",
          .follower_path_id = "plus",
          .follower_history = &base.leader,
          .follower_charge = "-1",
          .coupling = "1",
          .field_speed = "1",
          .reception_time = "0",
          .emission_lower = "-20",
          .far_field_enclosure_fraction = "0.5",
          .acceleration_tolerance = "0.001",
          .transmitter_count = 3U,
      });
      print_certificate("declined_repeated_member", repeated);
    }

    // Budget edge: with fraction 0.5 and N = 3 the two-slice threshold is
    // tolerance / 3, so tolerance = 3 * width sits on the edge. The tokens are
    // printed so the reference can recompute the comparison exactly.
    if (static_width.has_value()) {
      for (const auto& [name, scale] :
           {std::pair<std::string, double>{"budget_just_inside", 1.000001},
            std::pair<std::string, double>{"budget_just_outside", 0.999999}}) {
        Case edge = static_pair(name, "-20");
        edge.tolerance = number(3.0 * *static_width * scale);
        print_certificate(name + "/tolerance=" + edge.tolerance, run(edge));
      }
    }

    // Consumer recheck. The genuine certificate is accepted for exactly the
    // request it was certified for, first. Each later line changes one thing
    // and must be refused: identities, event, any mathematical scalar, or the
    // stored interval, radius inputs or threshold.
    {
      const Case base = static_pair("recheck", "-20");
      const auto certificate = run(base);
      const eom::MatchedPairConsumerInputs genuine{
          .receiver_path_id = "receiver",
          .receiver_history = &base.receiver,
          .member_path_id = "plus",
          .member_history = &base.leader,
          .reception_time = "0",
          .receiver_charge = "1",
          .member_charge = "1",
          .coupling = "1",
          .field_speed = "1",
          .acceleration_tolerance = "0.001",
      };
      std::cout << "{\"control\":\"consumer_recheck_known_genuine\",\"leader\":\""
                << eom::matched_pair_certificate_refusal(certificate, genuine)
                << "\"";
      {
        auto follower = genuine;
        follower.member_path_id = "minus";
        follower.member_history = &base.follower;
        follower.member_charge = "-1";
        std::cout << ",\"follower\":\""
                  << eom::matched_pair_certificate_refusal(certificate, follower)
                  << "\",\"equivalent_token_forms\":\"";
        auto forms = genuine;
        forms.coupling = "1.0";
        forms.receiver_charge = "+1e0";
        forms.acceleration_tolerance = "1e-3";
        std::cout << eom::matched_pair_certificate_refusal(certificate, forms)
                  << "\"}\n";
      }
      std::cout << "{\"control\":\"consumer_recheck_mutations\"";
      const auto mutated_inputs = [&](const std::string& name,
                                      const auto& change) {
        auto inputs = genuine;
        change(inputs);
        std::cout << ",\"" << name << "\":\""
                  << eom::matched_pair_certificate_refusal(certificate, inputs)
                  << "\"";
      };
      mutated_inputs("wrong_member", [&](auto& x) { x.member_path_id = "other"; });
      mutated_inputs("wrong_member_history",
                     [&](auto& x) { x.member_history = &base.follower; });
      mutated_inputs("wrong_receiver_history",
                     [&](auto& x) { x.receiver_history = &base.leader; });
      mutated_inputs("wrong_reception", [&](auto& x) { x.reception_time = "0.5"; });
      mutated_inputs("changed_coupling", [&](auto& x) { x.coupling = "2"; });
      mutated_inputs("changed_coupling_sign", [&](auto& x) { x.coupling = "-1"; });
      mutated_inputs("changed_receiver_charge",
                     [&](auto& x) { x.receiver_charge = "2"; });
      mutated_inputs("changed_member_charge",
                     [&](auto& x) { x.member_charge = "2"; });
      mutated_inputs("changed_member_charge_sign",
                     [&](auto& x) { x.member_charge = "-1"; });
      mutated_inputs("changed_field_speed", [&](auto& x) { x.field_speed = "2"; });
      mutated_inputs("changed_tolerance_tighter",
                     [&](auto& x) { x.acceleration_tolerance = "1e-8"; });
      mutated_inputs("changed_tolerance_looser",
                     [&](auto& x) { x.acceleration_tolerance = "1"; });
      mutated_inputs("invalid_token", [&](auto& x) { x.coupling = "one"; });
      const auto mutated_certificate = [&](const std::string& name,
                                           const auto& change) {
        auto candidate = certificate;
        change(candidate);
        std::cout << ",\"" << name << "\":\""
                  << eom::matched_pair_certificate_refusal(candidate, genuine)
                  << "\"";
      };
      mutated_certificate("tampered_status",
                          [](auto& x) { x.status = "declined"; });
      mutated_certificate("widened_interval", [](auto& x) {
        const eom::Interval wide(-1.0, 1.0);
        x.acceleration = eom::IntervalVector{wide, wide, wide};
      });
      mutated_certificate("narrowed_interval", [](auto& x) {
        const eom::Interval narrow(-1e-9, 1e-9);
        x.acceleration = eom::IntervalVector{narrow, narrow, narrow};
      });
      mutated_certificate("tampered_certified_coupling",
                          [](auto& x) { x.coupling = "2"; });
      mutated_certificate("tampered_certified_receiver_charge",
                          [](auto& x) { x.receiver_charge = "2"; });
      mutated_certificate("tampered_member_charges_same_sign",
                          [](auto& x) { x.follower.charge = "1"; });
      mutated_certificate("tampered_distance_floor",
                          [](auto& x) { x.distance_floor = 1.0; });
      mutated_certificate("tampered_separation",
                          [](auto& x) { x.separation_upper = 1.0; });
      // R1-2: a false bound with the genuine interval left unchanged.
      mutated_certificate("false_separation_zero_unchanged_interval",
                          [](auto& x) { x.separation_upper = 0.0; });
      mutated_certificate("false_larger_distance_floor_unchanged_interval",
                          [](auto& x) { x.distance_floor = 100.0; });
      mutated_certificate("false_speed_upper_unchanged_interval",
                          [](auto& x) { x.speed_upper = 0.5; });
      mutated_certificate("false_relative_speed_unchanged_interval",
                          [](auto& x) { x.relative_speed_upper = 0.25; });
      mutated_certificate("false_acceleration_upper_unchanged_interval",
                          [](auto& x) { x.acceleration_upper = 0.25; });
      mutated_certificate("false_factor_floor_unchanged_interval",
                          [](auto& x) { x.transmitter_factor_floor = 0.5; });
      mutated_certificate("false_prefactor_unchanged_interval",
                          [](auto& x) { x.prefactor_upper = 2.0; });
      mutated_certificate("false_radius_unchanged_interval",
                          [](auto& x) { x.radius_upper = 1e-9; });
      mutated_certificate("false_emitted_width_unchanged_interval",
                          [](auto& x) { x.emitted_width = 0.0; });
      mutated_certificate("false_slice_unchanged_interval", [](auto& x) {
        x.member_width_slice = eom::Interval(0.0, 1.0);
      });
      mutated_certificate("tampered_threshold",
                          [](auto& x) { x.admission_width_threshold = 1.0; });
      mutated_certificate("tampered_fraction",
                          [](auto& x) { x.far_field_enclosure_fraction = "0.9"; });
      mutated_certificate("tampered_transmitter_count",
                          [](auto& x) { x.transmitter_count = 2U; });
      mutated_certificate("tampered_coverage",
                          [](auto& x) { x.window_coverage = "not_established"; });
      mutated_certificate("absent_relabelled_from_present", [](auto& x) {
        x.status = "certified_absent";
      });
      std::cout << "}\n";
    }
  } catch (const std::exception& error) {
    std::cerr << "fixture error: " << error.what() << "\n";
    return 1;
  }
  return 0;
}

// Stage 2 module-level controls: windows spanning several segments, and
// declared error radii. Prints one certificate per control; judges nothing.
namespace {

using Segment = eom::CubicHistorySegment;

Coefficients z_only(
    const std::string& z0, const std::string& z1, const std::string& z2) {
  return {{{"0", "0", "0", "0"}, {"0", "0", "0", "0"}, {z0, z1, z2, "0"}}};
}

eom::RetainedHistory pieces(
    const std::string& id, std::vector<Segment> segments) {
  return eom::RetainedHistory(id, std::move(segments));
}

// z(S) = R + 0.016 S^2 on [-15, 0], written as one segment or split at
// decimal times. Local time of a segment starting at t0 is S - t0, so
// z = (R + c t0^2) + (2 c t0) tau + c tau^2 with c = 0.016.
struct Quadratic {
  std::string whole;      // R + 3.6
  std::string at_m13;     // R + 2.704
  std::string at_m12_5;   // R + 2.5
  std::string at_m12;     // R + 2.304
  std::string at_m5;      // R + 0.4
};
const Quadratic kPlus{"13.6", "12.704", "12.5", "12.304", "10.4"};
const Quadratic kMinus{"12.825", "11.929", "11.725", "11.529", "9.625"};

Segment q_whole(const Quadratic& q) {
  return Segment("-15", "0", z_only(q.whole, "-0.48", "0.016"));
}

}  // namespace

int run_piecewise() {
  try {
    const std::string exact = eom::kMatchedPairPolicySnapshotPiecewiseExact;
    const auto origin = [](const std::string& start) {
      return one_segment(
          "receiver-history", start, "0", constant("0", "0", "0"));
    };
    std::vector<Case> cases;
    // Known case first: the single-slab static pair under the piecewise
    // exact policy must reproduce the single-slab bounds (one cell).
    {
      Case known = static_pair("known_single_cell_static_pair", "-20");
      known.policy = exact;
      cases.push_back(known);
    }
    // Static pair, each history split into two segments at -10.
    cases.push_back({
        .name = "static_pair_two_segments_each",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "-10", constant("0", "0", "10.005")),
             Segment("-10", "0", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "-10", constant("0", "0", "9.995")),
             Segment("-10", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-20",
        .policy = exact,
    });
    // Quadratic pair as one cell under the piecewise policy.
    cases.push_back({
        .name = "quadratic_pair_one_cell",
        .receiver = origin("-15"),
        .leader = pieces("plus-history", {q_whole(kPlus)}),
        .follower = pieces("minus-history", {q_whole(kMinus)}),
        .reception = "0",
        .lower = "-15",
        .tolerance = "0.1",
        .policy = exact,
    });
    // Quadratic pair split at -12, between the roots -12.5 and -11.25.
    const auto split_m12 = [](const std::string& id, const Quadratic& q) {
      return pieces(
          id, {Segment("-15", "-12", z_only(q.whole, "-0.48", "0.016")),
               Segment("-12", "0", z_only(q.at_m12, "-0.384", "0.016"))});
    };
    cases.push_back({
        .name = "quadratic_pair_join_between_roots",
        .receiver = origin("-15"),
        .leader = split_m12("plus-history", kPlus),
        .follower = split_m12("minus-history", kMinus),
        .reception = "0",
        .lower = "-15",
        .tolerance = "0.1",
        .policy = exact,
    });
    // Leader split exactly at its own root time -12.5.
    cases.push_back({
        .name = "quadratic_pair_root_exactly_at_join",
        .receiver = origin("-15"),
        .leader = pieces(
            "plus-history",
            {Segment("-15", "-12.5", z_only(kPlus.whole, "-0.48", "0.016")),
             Segment("-12.5", "0", z_only(kPlus.at_m12_5, "-0.4", "0.016"))}),
        .follower = pieces("minus-history", {q_whole(kMinus)}),
        .reception = "0",
        .lower = "-15",
        .tolerance = "0.1",
        .policy = exact,
    });
    // Unequal segmentation: leader split at -12; follower at -13 and -5.
    cases.push_back({
        .name = "quadratic_pair_unequal_segmentation",
        .receiver = origin("-15"),
        .leader = split_m12("plus-history", kPlus),
        .follower = pieces(
            "minus-history",
            {Segment("-15", "-13", z_only(kMinus.whole, "-0.48", "0.016")),
             Segment("-13", "-5", z_only(kMinus.at_m13, "-0.416", "0.016")),
             Segment("-5", "0", z_only(kMinus.at_m5, "-0.16", "0.016"))}),
        .reception = "0",
        .lower = "-15",
        .tolerance = "0.1",
        .policy = exact,
    });
    // Window starting at a join of both sources at -15, with the earlier
    // static segment [-20, -15] as prefix: the receiver-to-source distance is
    // about 10 and the elapsed time at least 15, so the prefix is re-proved.
    cases.push_back({
        .name = "window_starts_at_join_prefix_reproved",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "-15", constant("0", "0", "10.005")),
             Segment("-15", "-5", constant("0", "0", "10.005")),
             Segment("-5", "0", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "-15", constant("0", "0", "9.995")),
             Segment("-15", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-15",
        .policy = exact,
    });
    // Window starting at a join with a prefix the one-hull test cannot
    // re-prove: over [-15, -13] the largest distance, 13.6, exceeds the
    // elapsed time 13 at the window start, although the prefix is in fact
    // root free. The route declines conservatively and the exact route runs.
    cases.push_back({
        .name = "declined_prefix_not_reprovable_by_one_hull",
        .receiver = origin("-15"),
        .leader = pieces(
            "plus-history",
            {Segment("-15", "-13", z_only(kPlus.whole, "-0.48", "0.016")),
             Segment("-13", "0", z_only(kPlus.at_m13, "-0.416", "0.016"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-15", "-13", z_only(kMinus.whole, "-0.48", "0.016")),
             Segment("-13", "0", z_only(kMinus.at_m13, "-0.416", "0.016"))}),
        .reception = "0",
        .lower = "-13",
        .tolerance = "0.1",
        .policy = exact,
    });
    // Declared radii and analytic factory histories are outside the admitted
    // domain: the route declines and the existing routes run.
    const auto static_with_radii = [&](const std::string& name,
                                       const std::string& position_radius,
                                       const std::string& velocity_radius) {
      return Case{
          .name = name,
          .receiver = origin("-20"),
          .leader = pieces(
              "plus-history",
              {Segment("-20", "0", constant("0", "0", "10.005"))}),
          .follower = pieces(
              "minus-history",
              {Segment("-20", "0", constant("0", "0", "9.995"),
                       position_radius, velocity_radius)}),
          .reception = "0",
          .lower = "-20",
          .policy = exact,
      };
    };
    cases.push_back(
        static_with_radii("declined_position_radius", "0.001", "0"));
    cases.push_back(
        static_with_radii("declined_velocity_radius", "0", "0.000001"));
    cases.push_back(
        static_with_radii("declined_tiny_radii", "1e-300", "1e-300"));
    // One segment with a radius among several exact ones still declines.
    cases.push_back({
        .name = "declined_one_later_segment_has_radius",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "0", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "-10", constant("0", "0", "9.995")),
             Segment("-10", "0", constant("0", "0", "9.995"), "1e-12", "0")}),
        .reception = "0",
        .lower = "-20",
        .policy = exact,
    });
    // A radius on a segment wholly before the window does not matter to the
    // window's exactness; that segment is only a prefix, re-proved from its
    // own hull, which includes the radius.
    cases.push_back({
        .name = "prefix_segment_with_radius_window_exact",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "-15", constant("0", "0", "10.005")),
             Segment("-15", "0", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "-15", constant("0", "0", "9.995"), "1e-6", "0"),
             Segment("-15", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-15",
        .policy = exact,
    });
    cases.push_back({
        .name = "declined_uniform_circular_factory_follower",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "0", constant("0", "0", "10.5"))}),
        .follower = eom::RetainedHistory::uniform_circular(
            "minus-history",
            {.t_start = "-20",
             .t_end = "0",
             .maximum_segment_step = "0.5",
             .cylindrical_radius = "0.1",
             .height = "10",
             .angular_speed = "1",
             .tangential_speed = "0.1",
             .phase = "0"}),
        .reception = "0",
        .lower = "-20",
        .tolerance = "1",
        .policy = exact,
    });
    // Window not inside retained coverage.
    cases.push_back({
        .name = "declined_window_before_coverage",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-11", "0", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-20",
        .policy = exact,
    });
    cases.push_back({
        .name = "declined_history_ends_before_reception",
        .receiver = origin("-20"),
        .leader = pieces(
            "plus-history",
            {Segment("-20", "-1", constant("0", "0", "10.005"))}),
        .follower = pieces(
            "minus-history",
            {Segment("-20", "0", constant("0", "0", "9.995"))}),
        .reception = "0",
        .lower = "-20",
        .policy = exact,
    });
    for (const auto& test : cases) {
      print_certificate(test.name, run(test));
    }
  } catch (const std::exception& error) {
    std::cerr << "fixture error: " << error.what() << "\n";
    return 1;
  }
  return 0;
}

#ifdef EOM_MATCHED_PAIR_SNAPSHOT_FIXTURE
// Snapshot-level driver. The case file is line based so that any separately
// authored adapter can produce it:
//   case <id>
//   reception <token>            tolerance <token>     fraction <token>
//   coupling <token>             field_speed <token>   policy <string>
//   far_field <0|1>              traversal <0|1>       tile_limit <n>
//   threads <n>                  root_tolerance <token>
//   path <id> <charge> <t_start> <t_end> x0 x1 x2 x3 y0 y1 y2 y3 z0 z1 z2 z3
//        [position_error velocity_error]
//   end
// Coefficients are in the segment's local time S - t_start. Several path
// lines with the same id append segments to one history. The driver prints
// one JSON object per case and judges nothing.
#include "architrino/eom/CoupledEvolution.hpp"

#include <fstream>
#include <map>

namespace {

struct SnapshotCase {
  std::string id;
  std::string reception = "0";
  std::string tolerance = "1e-5";
  std::string fraction = "0";
  std::string coupling = "1";
  std::string field_speed = "1";
  std::string policy = eom::kMatchedPairPolicyDisabled;
  std::string root_tolerance = "1e-7";
  bool far_field = true;
  bool traversal = false;
  std::uint64_t tile_limit = 4096;
  std::size_t threads = 1;
  std::vector<std::string> order;
  std::map<std::string, std::string> charges;
  std::map<std::string, std::vector<eom::CubicHistorySegment>> segments;
};

void print_snapshot(
    const SnapshotCase& test,
    const eom::NativeAccelerationSnapshotCertificate& snapshot) {
  std::cout << "{\"case\":\"" << test.id << "\",\"policy\":\"" << test.policy
            << "\",\"traversal\":" << (test.traversal ? 1 : 0)
            << ",\"tile_limit\":" << test.tile_limit
            << ",\"threads\":" << test.threads
            << ",\"reception_time\":\"" << test.reception
            << "\",\"acceleration_tolerance\":\"" << test.tolerance
            << "\",\"far_field_enclosure_fraction\":\"" << test.fraction
            << "\",\"status\":\"" << snapshot.status
            << "\",\"failure_code\":\"" << snapshot.failure_code
            << "\",\"pair_selection_route\":\""
            << snapshot.pair_selection_route
            << "\",\"logical_ordered_pairs\":"
            << snapshot.logical_ordered_pairs
            << ",\"excluded_pairs\":" << snapshot.traversal_excluded_pairs
            << ",\"exact_pairs\":" << snapshot.traversal_exact_pairs
            << ",\"enclosed_pairs\":" << snapshot.traversal_enclosed_pairs
            << ",\"unresolved_pairs\":" << snapshot.traversal_unresolved_pairs
            << ",\"matched_pair_enclosed_groups\":"
            << snapshot.matched_pair_enclosed_groups
            << ",\"matched_pair_absent_groups\":"
            << snapshot.matched_pair_absent_groups
            << ",\"root_pair_count\":" << snapshot.timing.root_pair_count
            << ",\"enclosed_error_width_total\":"
            << number(snapshot.enclosed_error_width_total)
            << ",\"enclosed_error_width_max_receiver\":"
            << number(snapshot.enclosed_error_width_max_receiver)
            << ",\"prefix_exclusion\":{\"status\":\""
            << snapshot.causal_prefix_exclusion.status
            << "\",\"original_search_lower\":\""
            << snapshot.causal_prefix_exclusion.original_search_lower
            << "\",\"active_search_lower\":\""
            << snapshot.causal_prefix_exclusion.active_search_lower
            << "\"},\"acceleration_status\":\"" << snapshot.acceleration.status
            << "\",\"reduction_policy\":\""
            << snapshot.acceleration.reduction_policy
            << "\",\"receiver_totals\":[";
  bool first = true;
  for (const auto& total : snapshot.acceleration.receiver_totals) {
    std::cout << (first ? "" : ",") << "{\"receiver\":\""
              << total.receiver_path_id << "\",\"acceleration\":"
              << json_vector(total.acceleration) << "}";
    first = false;
  }
  std::cout << "],\"pairs\":[";
  first = true;
  for (std::size_t index = 0U;
       index < snapshot.acceleration.pair_certificates.size(); ++index) {
    const auto& pair = snapshot.acceleration.pair_certificates[index];
    const auto& root = snapshot.root_certificates[index].certificate;
    std::cout << (first ? "" : ",") << "{\"receiver\":\""
              << pair.receiver_path_id << "\",\"source\":\""
              << pair.transmitter_path_id << "\",\"chart\":\"" << pair.chart
              << "\",\"status\":\"" << pair.status
              << "\",\"failure_code\":\"" << pair.failure_code
              << "\",\"root_schema\":\"" << root.schema
              << "\",\"root_status\":\"" << root.status
              << "\",\"root_row_id\":\"" << root.row_id
              << "\",\"root_free_complement\":"
              << (root.root_free_complement ? 1 : 0)
              << ",\"memory_boundary_contact\":"
              << (root.memory_boundary_contact ? 1 : 0)
              << ",\"root_count\":" << root.roots.size()
              << ",\"searched_lower\":\"" << root.searched_lower
              << "\",\"rows\":[";
    bool first_row = true;
    for (const auto& row : pair.rows) {
      std::cout << (first_row ? "" : ",") << "{\"chart\":\"" << row.chart
                << "\",\"acceptance_status\":\"" << row.acceptance_status
                << "\",\"accumulation_group\":\"" << row.accumulation_group
                << "\",\"acceleration\":" << json_vector(row.acceleration)
                << "}";
      first_row = false;
    }
    std::cout << "],\"total_acceleration\":"
              << optional_json(pair.total_acceleration, json_vector) << "}";
    first = false;
  }
  std::cout << "],\"far_field_statuses\":[";
  first = true;
  for (const auto& enclosure : snapshot.far_field_enclosure_certificates) {
    std::cout << (first ? "" : ",") << "{\"receiver\":\""
              << enclosure.receiver_path_id << "\",\"source\":\""
              << enclosure.transmitter_path_id << "\",\"status\":\""
              << enclosure.status << "\",\"failure_code\":\""
              << enclosure.failure_code << "\"}";
    first = false;
  }
  std::cout << "],\"groups\":[";
  first = true;
  std::cout.flush();
  for (const auto& group : snapshot.matched_pair_enclosure_certificates) {
    std::cout << (first ? "" : ",");
    // print_certificate ends with a newline; strip it by printing inline.
    std::ostringstream captured;
    auto* previous = std::cout.rdbuf(captured.rdbuf());
    print_certificate("group", group);
    std::cout.rdbuf(previous);
    std::string text = captured.str();
    if (!text.empty() && text.back() == '\n') {
      text.pop_back();
    }
    std::cout << text;
    first = false;
  }
  std::cout << "]}\n";
}

eom::NativeCoupledEvolutionRequest snapshot_request(
    const SnapshotCase& test,
    std::vector<eom::NativePublishedPath>& histories) {
  std::vector<eom::NativeCoupledPathInput> paths;
  for (const auto& id : test.order) {
    eom::RetainedHistory history(id + "-history", test.segments.at(id));
    paths.push_back({id, test.charges.at(id), history});
    histories.push_back({id, history});
  }
  eom::NativeCoupledEvolutionRequest request{
      .run_id = "matched-pair-fixture/" + test.id,
      .paths = std::move(paths),
      .start_time = test.reception,
      .end_time = test.reception,
      .initial_step = "0.1",
      .minimum_step = "0.1",
      .field_speed = test.field_speed,
      .coupling = test.coupling,
      .root_tolerance = test.root_tolerance,
      .transmitter_factor_floor = "1e-24",
      .acceleration_tolerance = test.tolerance,
      .far_field_enclosure_fraction = test.fraction,
      .use_far_field_enclosure_in_evolution = test.far_field,
      .matched_pair_enclosure_policy = test.policy,
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .thread_count = test.threads,
  };
  request.use_certified_traversal = test.traversal;
  request.traversal_exact_tile_pair_limit = test.tile_limit;
  return request;
}

}  // namespace

int run_snapshot_file(const std::string& path) {
  std::ifstream input(path);
  if (!input) {
    std::cerr << "cannot read " << path << "\n";
    return 2;
  }
  std::string line;
  std::optional<SnapshotCase> current;
  int failures = 0;
  while (std::getline(input, line)) {
    std::istringstream fields(line);
    std::string key;
    if (!(fields >> key) || key[0] == '#') {
      continue;
    }
    if (key == "case") {
      current.emplace();
      fields >> current->id;
      continue;
    }
    if (!current.has_value()) {
      std::cerr << "line outside a case: " << line << "\n";
      return 2;
    }
    if (key == "end") {
      try {
        std::vector<eom::NativePublishedPath> histories;
        const auto request = snapshot_request(*current, histories);
        const auto snapshot = eom::certify_native_acceleration_snapshot(
            request, histories, current->reception);
        print_snapshot(*current, snapshot);
      } catch (const eom::EquationAdmissionError& error) {
        std::cout << "{\"case\":\"" << current->id
                  << "\",\"admission_error\":\"" << error.code()
                  << "\",\"message\":\"" << error.what() << "\"}\n";
      } catch (const std::exception& error) {
        std::cout << "{\"case\":\"" << current->id << "\",\"exception\":\""
                  << error.what() << "\"}\n";
        ++failures;
      }
      current.reset();
    } else if (key == "path") {
      std::string id;
      std::string charge;
      std::string start;
      std::string end;
      Coefficients coefficients;
      fields >> id >> charge >> start >> end;
      for (auto& axis : coefficients) {
        for (auto& token : axis) {
          fields >> token;
        }
      }
      std::string position_error = "0";
      std::string velocity_error = "0";
      fields >> position_error >> velocity_error;
      if (!current->charges.contains(id)) {
        current->order.push_back(id);
        current->charges[id] = charge;
      }
      current->segments[id].emplace_back(
          start, end, coefficients, position_error, velocity_error);
    } else if (key == "reception") {
      fields >> current->reception;
    } else if (key == "tolerance") {
      fields >> current->tolerance;
    } else if (key == "fraction") {
      fields >> current->fraction;
    } else if (key == "coupling") {
      fields >> current->coupling;
    } else if (key == "field_speed") {
      fields >> current->field_speed;
    } else if (key == "policy") {
      fields >> current->policy;
    } else if (key == "root_tolerance") {
      fields >> current->root_tolerance;
    } else if (key == "far_field") {
      int value = 1;
      fields >> value;
      current->far_field = value != 0;
    } else if (key == "traversal") {
      int value = 0;
      fields >> value;
      current->traversal = value != 0;
    } else if (key == "tile_limit") {
      fields >> current->tile_limit;
    } else if (key == "threads") {
      fields >> current->threads;
    } else {
      std::cerr << "unknown key: " << key << "\n";
      return 2;
    }
  }
  return failures == 0 ? 0 : 1;
}

// Stage 1 is snapshot-only: both evolution entry points must refuse a
// non-disabled policy before doing any work.
int run_evolution_guard() {
  SnapshotCase test;
  test.id = "evolution-guard";
  test.policy = eom::kMatchedPairPolicySnapshotSingleSlab;
  test.fraction = "0.5";
  test.order = {"a", "b"};
  test.charges = {{"a", "1"}, {"b", "-1"}};
  test.segments["a"].emplace_back("-20", "0", constant("0", "0", "0"));
  test.segments["b"].emplace_back("-20", "0", constant("0", "0", "10"));
  std::vector<eom::NativePublishedPath> histories;
  auto request = snapshot_request(test, histories);
  request.end_time = "0.1";
  const auto attempt = [](const std::string& name, const auto& call) {
    try {
      call();
      std::cout << "{\"entry\":\"" << name << "\",\"refused\":0}\n";
      return 1;
    } catch (const eom::EquationAdmissionError& error) {
      std::cout << "{\"entry\":\"" << name << "\",\"refused\":1,\"code\":\""
                << error.code() << "\",\"message\":\"" << error.what()
                << "\"}\n";
      return 0;
    }
  };
  int failures = 0;
  failures += attempt("evolve_native_coupled_histories", [&] {
    (void)eom::evolve_native_coupled_histories(request);
  });
  failures += attempt("certify_native_atomic_coupled_step", [&] {
    (void)eom::certify_native_atomic_coupled_step(
        request, histories, 0U, "0", "0.1");
  });
  auto unknown = request;
  unknown.matched_pair_enclosure_policy = "not-a-policy";
  failures += attempt("snapshot_unknown_policy", [&] {
    (void)eom::certify_native_acceleration_snapshot(unknown, histories, "0");
  });
  return failures == 0 ? 0 : 1;
}

// Complete-matrix consumer controls. A certified three-path snapshot supplies
// genuine root rows and one genuine group. The request matrix is rebuilt from
// them and passed to the acceleration reconstruction: first unchanged, which
// must reproduce the snapshot's receiver totals; then with one thing changed,
// each of which must be refused or left uncertified.
int run_matrix_negatives(bool piecewise) {
  SnapshotCase test;
  test.id = "matrix-negatives";
  test.policy = piecewise ? eom::kMatchedPairPolicySnapshotPiecewiseExact
                          : eom::kMatchedPairPolicySnapshotSingleSlab;
  test.fraction = "0.5";
  test.tolerance = "0.001";
  test.order = {"receiver", "plus", "minus"};
  test.charges = {{"receiver", "1"}, {"plus", "1"}, {"minus", "-1"}};
  test.segments["receiver"].emplace_back("-20", "0", constant("0", "0", "0"));
  if (piecewise) {
    // The same static pair, with the leader held as two segments and the
    // follower as three, so the genuine group has four cells.
    test.segments["plus"].emplace_back(
        "-20", "-10", constant("0", "0", "10.005"));
    test.segments["plus"].emplace_back(
        "-10", "0", constant("0", "0", "10.005"));
    test.segments["minus"].emplace_back(
        "-20", "-12", constant("0", "0", "9.995"));
    test.segments["minus"].emplace_back(
        "-12", "-4", constant("0", "0", "9.995"));
    test.segments["minus"].emplace_back("-4", "0", constant("0", "0", "9.995"));
  } else {
    test.segments["plus"].emplace_back(
        "-20", "0", constant("0", "0", "10.005"));
    test.segments["minus"].emplace_back(
        "-20", "0", constant("0", "0", "9.995"));
  }
  std::vector<eom::NativePublishedPath> histories;
  const auto request = snapshot_request(test, histories);
  const auto snapshot =
      eom::certify_native_acceleration_snapshot(request, histories, "0");
  if (snapshot.status != "certified_complete" ||
      snapshot.matched_pair_enclosed_groups != 1U) {
    std::cerr << "matrix control snapshot did not certify one group\n";
    return 1;
  }
  const eom::NativeMatchedPairEnclosureCertificate* genuine = nullptr;
  for (const auto& group : snapshot.matched_pair_enclosure_certificates) {
    if (group.status == "certified_enclosed") {
      genuine = &group;
    }
  }
  const std::vector<std::string> ids = test.order;
  const auto build = [&](const eom::NativeMatchedPairEnclosureCertificate*
                             group) {
    std::vector<eom::NativePairAccelerationRequest> requests;
    std::size_t index = 0U;
    for (const auto& receiver : histories) {
      for (const auto& source : histories) {
        const auto& root = snapshot.root_certificates[index].certificate;
        const bool member = root.schema == eom::kMatchedPairMemberMarkerSchema;
        requests.push_back({
            .row_id = root.row_id,
            .receiver_path_id = receiver.path_id,
            .transmitter_path_id = source.path_id,
            .receiver_history = &receiver.history,
            .transmitter_history = &source.history,
            .root_certificate = &root,
            .matched_pair_enclosure = member ? group : nullptr,
            .receiver_charge = test.charges.at(receiver.path_id),
            .transmitter_charge = test.charges.at(source.path_id),
            .coupling = test.coupling,
            .chart = member ? "matched_pair_enclosure" : "sharp",
            .transmitter_factor_floor = "1e-24",
            .acceleration_tolerance = test.tolerance,
        });
        ++index;
      }
    }
    return requests;
  };
  const auto outcome = [&](const std::vector<std::string>& path_ids,
                           const std::vector<eom::NativePairAccelerationRequest>&
                               requests) -> std::string {
    try {
      const auto result =
          eom::certify_acceleration_reconstruction(path_ids, requests, 1U);
      if (result.status != "certified_complete") {
        std::string reasons;
        for (const auto& pair : result.pair_certificates) {
          if (pair.status == "uncertified") {
            reasons += (reasons.empty() ? "" : " | ") + pair.failure_code;
          }
        }
        return "uncertified: " + reasons;
      }
      return "certified_complete";
    } catch (const std::exception& error) {
      return std::string("refused: ") + error.what();
    }
  };
  // Known case first: the unchanged matrix reproduces the snapshot totals.
  {
    const auto requests = build(genuine);
    const auto result =
        eom::certify_acceleration_reconstruction(ids, requests, 1U);
    bool same = result.status == "certified_complete" &&
        result.receiver_totals.size() ==
            snapshot.acceleration.receiver_totals.size();
    for (std::size_t r = 0U; same && r < result.receiver_totals.size(); ++r) {
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        const auto& a = result.receiver_totals[r].acceleration[axis];
        const auto& b =
            snapshot.acceleration.receiver_totals[r].acceleration[axis];
        same = same && a.lower() == b.lower() && a.upper() == b.upper();
      }
    }
    std::cout << "{\"control\":\"matrix_known_genuine\",\"status\":\""
              << result.status << "\",\"totals_equal_snapshot\":"
              << (same ? 1 : 0) << "}\n";
    if (!same) {
      return 1;
    }
  }
  std::cout << "{\"control\":\"matrix_mutations\"";
  const auto report = [&](const std::string& name, const std::string& text) {
    std::cout << ",\"" << name << "\":\"" << text << "\"";
  };
  {
    auto requests = build(genuine);
    for (auto& item : requests) {
      item.coupling = "2";
    }
    report("coupling_2_everywhere", outcome(ids, requests));
  }
  {
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.receiver_path_id == "receiver") {
        item.receiver_charge = "2";
      }
    }
    report("receiver_charge_2", outcome(ids, requests));
  }
  {
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.chart == "matched_pair_enclosure") {
        item.acceleration_tolerance = "1";
      }
    }
    report("member_tolerance_loosened", outcome(ids, requests));
  }
  {
    // A second certificate object with the same identity for the follower.
    auto copy = *genuine;
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.chart == "matched_pair_enclosure" &&
          item.transmitter_path_id == genuine->follower.path_id) {
        item.matched_pair_enclosure = &copy;
      }
    }
    report("follower_points_to_duplicate_certificate", outcome(ids, requests));
  }
  {
    // Bounds and interval falsified consistently: the per-request recheck
    // cannot see this, the matrix re-certification must.
    auto forged = *genuine;
    forged.distance_floor = 100.0;
    const eom::Interval narrow(-3e-8, 3e-8);
    forged.acceleration = eom::IntervalVector{narrow, narrow, narrow};
    forged.radius_upper = 3e-8;
    forged.emitted_width = narrow.width();
    report("forged_bounds_and_narrow_interval", outcome(ids, build(&forged)));
  }
  {
    auto relabelled = *genuine;
    relabelled.status = "certified_absent";
    relabelled.leader.disposition = "absent";
    relabelled.follower.disposition = "absent";
    const eom::Interval zero = eom::Interval::point(0.0);
    relabelled.acceleration = eom::IntervalVector{zero, zero, zero};
    relabelled.emitted_width = 0.0;
    report("present_group_relabelled_absent", outcome(ids, build(&relabelled)));
  }
  {
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.chart == "matched_pair_enclosure" &&
          item.transmitter_path_id == genuine->follower.path_id) {
        item.matched_pair_enclosure = nullptr;
      }
    }
    report("follower_reference_missing", outcome(ids, requests));
  }
  {
    // A group certificate attached to an exact (sharp) request.
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.receiver_path_id == "plus" &&
          item.transmitter_path_id == "minus") {
        item.matched_pair_enclosure = genuine;
      }
    }
    report("certificate_on_non_group_request", outcome(ids, requests));
  }
  {
    // The follower's history replaced by a different one of the same id.
    eom::RetainedHistory moved(
        "minus-history",
        {eom::CubicHistorySegment("-20", "0", constant("0", "0", "9.9"))});
    auto requests = build(genuine);
    for (auto& item : requests) {
      if (item.chart == "matched_pair_enclosure" &&
          item.transmitter_path_id == genuine->follower.path_id) {
        item.transmitter_history = &moved;
      }
    }
    report("follower_history_replaced", outcome(ids, requests));
  }
  std::cout << "}\n";

  // R1-2 sweep. Each line falsifies exactly one retained field of the genuine
  // certificate and leaves its interval unchanged, unless the field is the
  // interval itself. The matrix must refuse every one and name the field.
  std::cout << "{\"control\":\"matrix_retained_field_sweep\"";
  const auto falsify = [&](const std::string& name, const auto& change) {
    auto forged = *genuine;
    change(forged);
    report(name, outcome(ids, build(&forged)));
  };
  const eom::Interval unit(0.0, 1.0);
  const eom::IntervalVector unit_box{unit, unit, unit};
  falsify("separation_upper_zero", [](auto& x) { x.separation_upper = 0.0; });
  falsify("distance_floor", [](auto& x) { x.distance_floor = 100.0; });
  falsify("speed_upper", [](auto& x) { x.speed_upper = 0.5; });
  falsify("transmitter_factor_floor",
          [](auto& x) { x.transmitter_factor_floor = 0.5; });
  falsify("relative_speed_upper",
          [](auto& x) { x.relative_speed_upper = 0.25; });
  falsify("acceleration_upper", [](auto& x) { x.acceleration_upper = 0.25; });
  falsify("prefactor_upper", [](auto& x) { x.prefactor_upper = 2.0; });
  falsify("radius_upper", [](auto& x) { x.radius_upper = 1e-9; });
  falsify("member_width_slice", [&](auto& x) { x.member_width_slice = unit; });
  falsify("admission_width_threshold",
          [](auto& x) { x.admission_width_threshold = 1.0; });
  falsify("emitted_width", [](auto& x) { x.emitted_width = 0.0; });
  falsify("receiver_position_hull",
          [&](auto& x) { x.receiver_position_hull = unit_box; });
  falsify("source_domain_hull",
          [&](auto& x) { x.source_domain_hull = unit_box; });
  falsify("leader_window_start_residual",
          [&](auto& x) { x.leader.window_start_residual = unit; });
  falsify("follower_window_start_residual", [](auto& x) {
    x.follower.window_start_residual = eom::Interval(-2.0, -1.0);
  });
  falsify("leader_segment_index", [](auto& x) { x.leader.segment_index = 7U; });
  falsify("follower_segment_start",
          [](auto& x) { x.follower.segment_start = "-30"; });
  falsify("leader_segment_end", [](auto& x) { x.leader.segment_end = "5"; });
  falsify("leader_history_start",
          [](auto& x) { x.leader.history_start = "-30"; });
  falsify("follower_prefix_residual", [](auto& x) {
    x.follower.prefix_residual = eom::Interval(-2.0, -1.0);
  });
  falsify("leader_history_fingerprint",
          [](auto& x) { x.leader.history_fingerprint = "forged"; });
  falsify("receiver_history_fingerprint",
          [](auto& x) { x.receiver_history_fingerprint = "forged"; });
  falsify("window_coverage",
          [](auto& x) { x.window_coverage = "member_prefix_reproved"; });
  falsify("transmitter_count", [](auto& x) { x.transmitter_count = 5U; });
  falsify("far_field_enclosure_fraction",
          [](auto& x) { x.far_field_enclosure_fraction = "0.9"; });
  falsify("acceleration_tolerance_token",
          [](auto& x) { x.acceleration_tolerance = "1"; });
  falsify("coupling_token", [](auto& x) { x.coupling = "2"; });
  falsify("receiver_charge_token", [](auto& x) { x.receiver_charge = "2"; });
  falsify("field_speed_token", [](auto& x) { x.field_speed = "2"; });
  falsify("leader_charge_token", [](auto& x) { x.leader.charge = "2"; });
  falsify("emission_lower", [](auto& x) { x.emission_lower = "-19"; });
  falsify("emission_upper", [](auto& x) { x.emission_upper = "1"; });
  falsify("reception_time", [](auto& x) { x.reception_time = "1"; });
  falsify("group_id", [](auto& x) { x.group_id = "forged"; });
  falsify("failure_code", [](auto& x) { x.failure_code = "MPE-BOUND-01"; });
  falsify("leader_disposition",
          [](auto& x) { x.leader.disposition = "absent"; });
  falsify("acceleration_interval", [](auto& x) {
    const eom::Interval narrow(-3e-8, 3e-8);
    x.acceleration = eom::IntervalVector{narrow, narrow, narrow};
  });
  if (piecewise) {
    // Fields that exist only for piecewise windows.
    falsify("cell_boundaries_one_removed", [](auto& x) {
      x.cell_boundaries.erase(x.cell_boundaries.begin() + 1);
    });
    falsify("cell_boundaries_one_moved",
            [](auto& x) { x.cell_boundaries[1] = "-11"; });
    falsify("join_velocity_jump_upper",
            [](auto& x) { x.join_velocity_jump_upper = 0.0; });
    falsify("join_velocity_jump_absent",
            [](auto& x) { x.join_velocity_jump_upper.reset(); });
    falsify("history_grade", [](auto& x) { x.history_grade = "exact_cubic"; });
    falsify("leader_last_segment_index",
            [](auto& x) { x.leader.last_segment_index = 0U; });
    falsify("follower_last_segment_index",
            [](auto& x) { x.follower.last_segment_index.reset(); });
    falsify("policy_relabelled_single_slab", [](auto& x) {
      x.policy = eom::kMatchedPairPolicySnapshotSingleSlab;
    });
  }
  std::cout << "}\n";
  return 0;
}
#endif

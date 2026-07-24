#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <array>
#include <cmath>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace eom = architrino::eom;

namespace {

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

eom::CubicHistorySegment segment(
    const std::string& t_start,
    const std::string& t_end,
    const std::array<std::string, 4>& x) {
  return eom::CubicHistorySegment(
      t_start, t_end,
      eom::CubicCoefficientTokens{
          x, {"0", "0", "0", "0"}, {"0", "0", "0", "0"}});
}

eom::RetainedHistory history(
    const std::string& id,
    const std::array<std::string, 4>& x,
    const std::string& t_end = "5") {
  return eom::RetainedHistory(id, {segment("0", t_end, x)});
}

eom::ExactPairCertificate roots(
    const std::string& row_id,
    const eom::RetainedHistory& receiver,
    const eom::RetainedHistory& source,
    const std::string& reception,
    bool force_precision_escalation = false) {
  return eom::certify_exact_pair({
      .row_id = row_id,
      .receiver = &receiver,
      .source = &source,
      .reception_time = reception,
      .search_lower = "0",
      .search_upper = reception,
      .field_speed = "1",
      .root_tolerance = "1e-12",
      .max_depth = 256,
      .max_cells = 500000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .force_precision_escalation = force_precision_escalation,
  });
}

eom::NativePairAccelerationRequest acceleration_request(
    const std::string& row_id,
    const std::string& receiver_path_id,
    const std::string& transmitter_path_id,
    const eom::RetainedHistory& receiver,
    const eom::RetainedHistory& source,
    const eom::ExactPairCertificate& certificate,
    const std::string& receiver_charge,
    const std::string& transmitter_charge,
    const std::string& tolerance = "1e-9",
    const std::string& chart = "sharp",
    bool force_precision_escalation = false,
    const std::string& quadrature_tolerance = "2e-3",
    std::size_t quadrature_max_cells = 200000) {
  return {
      .row_id = row_id,
      .receiver_path_id = receiver_path_id,
      .transmitter_path_id = transmitter_path_id,
      .receiver_history = &receiver,
      .transmitter_history = &source,
      .root_certificate = &certificate,
      .receiver_charge = receiver_charge,
      .transmitter_charge = transmitter_charge,
      .coupling = "1",
      .chart = chart,
      .transmitter_factor_floor = "1e-30",
      .causal_width = "0.2",
      .core_scale = "0.2",
      .acceleration_tolerance = tolerance,
      .quadrature_tolerance = quadrature_tolerance,
      .quadrature_max_depth = 28,
      .quadrature_max_cells = quadrature_max_cells,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .force_precision_escalation = force_precision_escalation,
  };
}

void print_interval(const eom::Interval& interval) {
  std::cout << "{\"lower\":" << interval.lower()
            << ",\"upper\":" << interval.upper() << '}';
}

void print_vector(const eom::IntervalVector& vector) {
  std::cout << '[';
  for (std::size_t index = 0; index < vector.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    print_interval(vector[index]);
  }
  std::cout << ']';
}

void print_optional_interval(const std::optional<eom::Interval>& interval) {
  if (interval.has_value()) {
    print_interval(*interval);
  } else {
    std::cout << "null";
  }
}

void print_pair(const eom::NativePairAccelerationCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"row_id\":\"" << certificate.row_id
            << "\",\"receiver_path_id\":\""
            << certificate.receiver_path_id
            << "\",\"transmitter_path_id\":\"" << certificate.transmitter_path_id
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"chart\":\"" << certificate.chart
            << "\",\"reduction_policy\":\""
            << certificate.reduction_policy
            << "\",\"quadrature_visited_cells\":"
            << certificate.quadrature_visited_cells
            << ",\"analytic_fold_visited_cells\":"
            << certificate.analytic_fold_visited_cells
            << ",\"correlated_self_chord_visited_cells\":"
            << certificate.correlated_self_chord_visited_cells
            << ",\"stable_circular_residual_visited_cells\":"
            << certificate.stable_circular_residual_visited_cells
            << ",\"acceleration_precision_escalated\":"
            << (certificate.acceleration_precision_escalated ? "true" : "false")
            << ",\"achieved_acceleration_precision_bits\":"
            << certificate.achieved_acceleration_precision_bits
            << ",\"total_acceleration\":";
  if (certificate.total_acceleration.has_value()) {
    print_vector(*certificate.total_acceleration);
  } else {
    std::cout << "null";
  }
  std::cout << ",\"rows\":[";
  for (std::size_t index = 0; index < certificate.rows.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& row = certificate.rows[index];
    std::cout << "{\"row_id\":\"" << row.row_id
              << "\",\"row_index\":" << row.row_index
              << ",\"chart\":\"" << row.chart
              << "\",\"emission_lower\":\"" << row.emission_lower
              << "\",\"emission_upper\":\"" << row.emission_upper
              << "\",\"transmitter_factor\":";
    print_optional_interval(row.transmitter_factor);
    std::cout << ",\"receiver_factor\":";
    print_optional_interval(row.receiver_factor);
    std::cout << ",\"root_playback\":";
    print_optional_interval(row.root_playback);
    std::cout << ",\"acceleration_weight\":";
    print_optional_interval(row.acceleration_weight);
    std::cout << ",\"polarity\":" << row.polarity
              << ",\"acceptance_status\":\"" << row.acceptance_status
              << "\",\"root_precision_route\":\""
              << row.root_precision_route
              << "\",\"root_precision_bits\":" << row.root_precision_bits
              << ",\"acceleration_precision_route\":\""
              << row.acceleration_precision_route
              << "\",\"acceleration_precision_bits\":"
              << row.acceleration_precision_bits
              << ",\"acceleration\":";
    print_vector(row.acceleration);
    std::cout << '}';
  }
  std::cout << "]}";
}

void print_reconstruction(
    const eom::NativeAccelerationReconstructionCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"reduction_policy\":\""
            << certificate.reduction_policy
            << "\",\"logical_ordered_pairs\":"
            << certificate.logical_ordered_pairs
            << ",\"complete_ordered_pair_domain\":"
            << (certificate.complete_ordered_pair_domain ? "true" : "false")
            << ",\"pair_order\":[";
  for (std::size_t index = 0; index < certificate.pair_certificates.size();
       ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& pair = certificate.pair_certificates[index];
    std::cout << "[\"" << pair.receiver_path_id << "\",\""
              << pair.transmitter_path_id << "\"]";
  }
  std::cout << "],\"receiver_totals\":[";
  for (std::size_t index = 0; index < certificate.receiver_totals.size();
       ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& total = certificate.receiver_totals[index];
    std::cout << "{\"receiver_path_id\":\"" << total.receiver_path_id
              << "\",\"acceleration\":";
    print_vector(total.acceleration);
    std::cout << '}';
  }
  std::cout << "]}";
}

void print_all(bool include_pinned_fold_legacy) {
  const auto origin = history("origin", {"0", "0", "0", "0"});
  const auto static_two = history("static-two", {"2", "0", "0", "0"});
  const auto rail_receiver = history("rail-receiver", {"-3", "1", "0", "0"});
  const auto super_receiver =
      history("super-receiver", {"-8", "2", "0", "0"});
  const auto quadratic = history("quadratic", {"5", "-4", "1", "0"});
  const auto tangent = history("tangent", {"5.25", "-4", "1", "0"});
  const auto memory_source = history("memory-source", {"3", "-2", "1", "0"});

  const auto stationary_roots = roots("stationary-roots", static_two, origin, "5");
  const auto rail_roots = roots("rail-roots", rail_receiver, origin, "5");
  const auto super_roots = roots("super-roots", super_receiver, origin, "5");
  const auto quadratic_roots = roots("quadratic-roots", origin, quadratic, "3");
  const auto self_roots = roots("self-roots", origin, origin, "3");
  const auto tangent_roots = roots("tangent-roots", origin, tangent, "3", true);
  const auto memory_roots = roots("memory-roots", origin, memory_source, "3");

  const auto stationary = eom::certify_pair_acceleration(acceleration_request(
      "stationary", "stationary-receiver", "stationary-source",
      static_two, origin, stationary_roots, "1", "-1"));
  const auto rail = eom::certify_pair_acceleration(acceleration_request(
      "rail", "rail-receiver", "rail-source", rail_receiver, origin,
      rail_roots, "1", "-1"));
  const auto super = eom::certify_pair_acceleration(acceleration_request(
      "super", "super-receiver", "super-source", super_receiver, origin,
      super_roots, "1", "-1"));
  const auto two_root = eom::certify_pair_acceleration(acceleration_request(
      "two-root", "two-root-receiver", "two-root-source", origin,
      quadratic, quadratic_roots, "1", "1"));
  const auto self = eom::certify_pair_acceleration(acceleration_request(
      "self", "self", "self", origin, origin, self_roots, "1", "1"));
  const auto tangent_failure = eom::certify_pair_acceleration(
      acceleration_request("tangent", "tangent-receiver", "tangent-source",
                           origin, tangent, tangent_roots, "1", "1"));
  const auto memory_failure = eom::certify_pair_acceleration(
      acceleration_request("memory", "memory-receiver", "memory-source",
                           origin, memory_source, memory_roots, "1", "1"));
  auto tampered_roots = stationary_roots;
  if (tampered_roots.roots.empty()) {
    throw std::runtime_error("stationary fixture did not produce a root");
  }
  tampered_roots.roots.front().transmitter_factor_lower = "10";
  tampered_roots.roots.front().transmitter_factor_upper = "11";
  const auto tampered_failure = eom::certify_pair_acceleration(
      acceleration_request("tampered", "stationary-receiver",
                           "stationary-source", static_two, origin,
                           tampered_roots, "1", "-1"));
  const auto altered_static_two =
      history("static-two", {"2.01", "0", "0", "0"});
  const auto provenance_failure = eom::certify_pair_acceleration(
      acceleration_request("provenance", "stationary-receiver",
                           "stationary-source", altered_static_two, origin,
                           stationary_roots, "1", "-1"));
  const auto tolerance_failure = eom::certify_pair_acceleration(
      acceleration_request("tight-tolerance", "stationary-receiver",
                           "stationary-source", static_two, origin,
                           stationary_roots, "1", "-1", "1e-30"));
  const auto finite_width = eom::certify_pair_acceleration(
      acceleration_request(
          "finite-width", "stationary-receiver", "stationary-source",
          static_two, origin, stationary_roots, "1", "-1", "2e-3",
          "finite_width", false, "2e-3"));
  const auto finite_width_global_budget = eom::certify_pair_acceleration(
      acceleration_request(
          "finite-width-global-budget", "stationary-receiver",
          "stationary-source", static_two, origin, stationary_roots, "1",
          "-1", "2e-3", "finite_width", false, "2e-3", 1500));
  const auto finite_width_mpfr = eom::certify_pair_acceleration(
      acceleration_request(
          "finite-width-mpfr", "stationary-receiver", "stationary-source",
          static_two, origin, stationary_roots, "1", "-1", "2e-3",
          "finite_width", true, "2e-3"));
  const auto tangent_finite_width = eom::certify_pair_acceleration(
      acceleration_request(
          "tangent-finite-width", "tangent-receiver", "tangent-source",
          origin, tangent, tangent_roots, "1", "1", "5e-3",
          "finite_width", false, "5e-3"));
  const auto finite_width_resource_failure = eom::certify_pair_acceleration(
      acceleration_request(
          "finite-width-resource", "stationary-receiver", "stationary-source",
          static_two, origin, stationary_roots, "1", "-1", "1e-20",
          "finite_width", false, "1e-20", 1));

  constexpr double fold_reception = 0.0024;
  constexpr double fold_emission = -0.04;
  constexpr double fold_delay = fold_reception - fold_emission;
  const double transmitter_cosine = std::cos(fold_emission);
  const double transmitter_sine = std::sin(fold_emission);
  const std::array<double, 3> fold_position{
      transmitter_cosine + fold_delay * (-transmitter_sine),
      transmitter_sine + fold_delay * transmitter_cosine,
      0.0};
  const std::array<double, 3> endpoint_velocity{
      -transmitter_sine, transmitter_cosine, 0.0};
  eom::CubicCoefficientTokens fold_coefficients{};
  const std::array<double, 3> start_position{1.0, 0.0, 0.0};
  const std::array<double, 3> start_velocity{0.0, 1.0, 0.0};
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const double delta = fold_position[axis] - start_position[axis];
    fold_coefficients[axis] = {
        token(start_position[axis]),
        token(start_velocity[axis]),
        token(
            3.0 * delta / (fold_reception * fold_reception) -
            (2.0 * start_velocity[axis] + endpoint_velocity[axis]) /
                fold_reception),
        token(
            -2.0 * delta /
                (fold_reception * fold_reception * fold_reception) +
            (start_velocity[axis] + endpoint_velocity[axis]) /
                (fold_reception * fold_reception)),
    };
  }
  auto pinned_fold_history = eom::RetainedHistory::uniform_circular(
      "pinned-fold-history",
      {
          .t_start = "-1",
          .t_end = "0",
          .maximum_segment_step = "0.02",
          .cylindrical_radius = "1",
          .height = "0",
          .angular_speed = "1",
          .tangential_speed = "1",
          .phase = "0",
      });
  pinned_fold_history = pinned_fold_history.appended(
      eom::CubicHistorySegment(
          "0", token(fold_reception), std::move(fold_coefficients),
          "1e-15", "1e-15"));
  const eom::ExactPairCertificate pinned_fold_roots{
      .schema = "eom_native_exact_pair_certificate/v1",
      .row_id = "pinned-fold-roots",
      .receiver_history_id = pinned_fold_history.history_id(),
      .transmitter_history_id = pinned_fold_history.history_id(),
      .receiver_history_fingerprint =
          pinned_fold_history.provenance_fingerprint(),
      .transmitter_history_fingerprint =
          pinned_fold_history.provenance_fingerprint(),
      .reception_time = token(fold_reception),
      .searched_lower = "-1",
      .searched_upper = token(fold_reception),
      .field_speed = "1",
      .root_tolerance = "1e-12",
      .status = "caustic_route_required",
      .failure_code = "numeric_transmitter_factor_sign_uncertified",
      .root_free_complement = false,
      .memory_boundary_contact = false,
      .coincident_endpoint_excluded = true,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = 1,
      .excluded_cells = 0,
      .difficult_cells = 1,
      .roots = {},
  };
  auto pinned_fold_analytic_request = acceleration_request(
      "pinned-fold-analytic", "pinned-fold", "pinned-fold",
      pinned_fold_history, pinned_fold_history, pinned_fold_roots, "1", "1",
      "5e-3", "finite_width", false, "5e-3", 200000);
  const auto pinned_fold_analytic =
      eom::certify_pair_acceleration(pinned_fold_analytic_request);
  std::optional<eom::NativePairAccelerationCertificate> pinned_fold_legacy;
  if (include_pinned_fold_legacy) {
    auto pinned_fold_legacy_request = pinned_fold_analytic_request;
    pinned_fold_legacy_request.row_id = "pinned-fold-legacy";
    pinned_fold_legacy_request.use_analytic_pinned_fold = false;
    pinned_fold_legacy =
        eom::certify_pair_acceleration(pinned_fold_legacy_request);
  }

  auto cubic_pin_history = eom::RetainedHistory::uniform_circular(
      "cubic-pin-history",
      {
          .t_start = "-1",
          .t_end = "0",
          .maximum_segment_step = "0.02",
          .cylindrical_radius =
              "0.960098679139659830325203078805729831276478941731",
          .height = "0",
          .angular_speed = "1.0415596039524766",
          .tangential_speed = "1",
          .phase = "0",
      });
  const eom::ExactPairCertificate cubic_pin_roots{
      .schema = "eom_native_exact_pair_certificate/v1",
      .row_id = "cubic-pin-roots",
      .receiver_history_id = cubic_pin_history.history_id(),
      .transmitter_history_id = cubic_pin_history.history_id(),
      .receiver_history_fingerprint =
          cubic_pin_history.provenance_fingerprint(),
      .transmitter_history_fingerprint =
          cubic_pin_history.provenance_fingerprint(),
      .reception_time = "0",
      .searched_lower = "-1",
      .searched_upper = "0",
      .field_speed = "1",
      .root_tolerance = "1e-12",
      .status = "certified_complete",
      .failure_code = "",
      .root_free_complement = true,
      .memory_boundary_contact = false,
      .coincident_endpoint_excluded = true,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = 1,
      .excluded_cells = 1,
      .difficult_cells = 0,
      .roots = {},
  };
  const auto cubic_pin_request = [&](const std::string& row_id,
                                     bool correlated_self_chord,
                                     bool stable_circular_residual) {
    auto result = acceleration_request(
        row_id, "cubic-pin", "cubic-pin", cubic_pin_history,
        cubic_pin_history, cubic_pin_roots, "1", "1", "5e-3",
        "finite_width", false, "5e-3", 200000);
    result.causal_width = "0.05";
    result.core_scale = "0.05";
    result.use_correlated_self_chord = correlated_self_chord;
    result.use_stable_circular_residual = stable_circular_residual;
    return result;
  };
  const auto cubic_pin_independent = eom::certify_pair_acceleration(
      cubic_pin_request("cubic-pin-independent", false, false));
  const auto cubic_pin_correlated = eom::certify_pair_acceleration(
      cubic_pin_request("cubic-pin-correlated", true, false));
  const auto cubic_pin_stable = eom::certify_pair_acceleration(
      cubic_pin_request("cubic-pin-stable", false, true));
  const auto cubic_pin_combined = eom::certify_pair_acceleration(
      cubic_pin_request("cubic-pin-combined", true, true));

  const auto path_a = history("path-a-history", {"0", "0", "0", "0"}, "3");
  const auto path_b = history("path-b-history", {"2", "0", "0", "0"}, "3");
  const auto aa_roots = roots("aa-roots", path_a, path_a, "3");
  const auto ab_roots = roots("ab-roots", path_a, path_b, "3");
  const auto ba_roots = roots("ba-roots", path_b, path_a, "3");
  const auto bb_roots = roots("bb-roots", path_b, path_b, "3");
  std::vector<eom::NativePairAccelerationRequest> matrix_requests = {
      acceleration_request("ba", "b", "a", path_b, path_a, ba_roots, "-1", "1"),
      acceleration_request("aa", "a", "a", path_a, path_a, aa_roots, "1", "1"),
      acceleration_request("bb", "b", "b", path_b, path_b, bb_roots, "-1", "-1"),
      acceleration_request("ab", "a", "b", path_a, path_b, ab_roots, "1", "-1"),
  };
  const auto matrix = eom::certify_acceleration_reconstruction(
      {"a", "b"}, matrix_requests, 4);
  const auto matrix_single_thread = eom::certify_acceleration_reconstruction(
      {"a", "b"}, matrix_requests, 1);

  std::cout << std::setprecision(17)
            << "{\"schema\":\"eom_native_acceleration_fixture_packet/v1\","
            << "\"reduction_policy\":\""
            << eom::kDeterministicReductionPolicy << "\",\"cases\":[";
  std::vector<const eom::NativePairAccelerationCertificate*> cases = {
      &stationary, &rail, &super, &two_root, &self, &tangent_failure,
      &memory_failure, &tampered_failure, &provenance_failure,
      &tolerance_failure, &finite_width, &finite_width_mpfr,
      &finite_width_global_budget, &tangent_finite_width,
      &finite_width_resource_failure, &pinned_fold_analytic,
      &cubic_pin_independent, &cubic_pin_correlated, &cubic_pin_stable,
      &cubic_pin_combined};
  if (pinned_fold_legacy.has_value()) {
    cases.push_back(&*pinned_fold_legacy);
  }
  for (std::size_t index = 0; index < cases.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    print_pair(*cases[index]);
  }
  std::cout << "],\"matrix\":";
  print_reconstruction(matrix);
  std::cout << ",\"matrix_single_thread\":";
  print_reconstruction(matrix_single_thread);
  std::cout << "}\n";
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc != 2 ||
        (std::string(argv[1]) != "all" &&
         std::string(argv[1]) != "pinned-fold-benchmark")) {
      std::cerr << "usage: eom_native_acceleration_fixture_cli "
                   "all|pinned-fold-benchmark\n";
      return EXIT_FAILURE;
    }
    print_all(std::string(argv[1]) == "pinned-fold-benchmark");
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom native acceleration fixture failed: " << error.what()
              << '\n';
    return EXIT_FAILURE;
  }
}

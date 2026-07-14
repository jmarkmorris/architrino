#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <array>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace eom = architrino::eom;

namespace {

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
    const std::string& source_path_id,
    const eom::RetainedHistory& receiver,
    const eom::RetainedHistory& source,
    const eom::ExactPairCertificate& certificate,
    const std::string& receiver_charge,
    const std::string& source_charge,
    const std::string& tolerance = "1e-9") {
  return {
      .row_id = row_id,
      .receiver_path_id = receiver_path_id,
      .source_path_id = source_path_id,
      .receiver_history = &receiver,
      .source_history = &source,
      .root_certificate = &certificate,
      .receiver_charge = receiver_charge,
      .source_charge = source_charge,
      .coupling = "1",
      .source_normal_floor = "1e-30",
      .acceleration_tolerance = tolerance,
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

void print_pair(const eom::NativePairAccelerationCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"row_id\":\"" << certificate.row_id
            << "\",\"receiver_path_id\":\""
            << certificate.receiver_path_id
            << "\",\"source_path_id\":\"" << certificate.source_path_id
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"reduction_policy\":\""
            << certificate.reduction_policy
            << "\",\"reconstruction_matches\":"
            << (certificate.reconstruction_matches ? "true" : "false")
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
              << "\",\"source_normal\":";
    print_interval(row.source_normal);
    std::cout << ",\"receiver_normal\":";
    print_interval(row.receiver_normal);
    std::cout << ",\"branch_orientation\":";
    print_interval(row.branch_orientation);
    std::cout << ",\"receiver_strength\":";
    print_interval(row.receiver_strength);
    std::cout << ",\"polarity\":" << row.polarity
              << ",\"acceptance_status\":\"" << row.acceptance_status
              << "\",\"root_precision_route\":\""
              << row.root_precision_route
              << "\",\"root_precision_bits\":" << row.root_precision_bits
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
            << ",\"reconstruction_matches\":"
            << (certificate.reconstruction_matches ? "true" : "false")
            << ",\"pair_order\":[";
  for (std::size_t index = 0; index < certificate.pair_certificates.size();
       ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& pair = certificate.pair_certificates[index];
    std::cout << "[\"" << pair.receiver_path_id << "\",\""
              << pair.source_path_id << "\"]";
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

void print_all() {
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
  tampered_roots.roots.front().source_normal_lower = "10";
  tampered_roots.roots.front().source_normal_upper = "11";
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
            << "{\"schema\":\"eom_native_acceleration_fixture_packet/v0\","
            << "\"reduction_policy\":\""
            << eom::kDeterministicReductionPolicy << "\",\"cases\":[";
  const std::vector<const eom::NativePairAccelerationCertificate*> cases = {
      &stationary, &rail, &super, &two_root, &self, &tangent_failure,
      &memory_failure, &tampered_failure, &provenance_failure,
      &tolerance_failure};
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
  try {
    if (argc != 2 || std::string(argv[1]) != "all") {
      std::cerr << "usage: eom_native_acceleration_fixture_cli all\n";
      return EXIT_FAILURE;
    }
    print_all();
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom native acceleration fixture failed: " << error.what()
              << '\n';
    return EXIT_FAILURE;
  }
}

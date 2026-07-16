#include "architrino/eom/BlockExclusion.hpp"
#include "architrino/eom/CertifiedTraversal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <cstdlib>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

eom::CubicHistorySegment segment(
    const std::string& t_start,
    const std::string& t_end,
    const std::array<std::string, 4>& x,
    const std::array<std::string, 4>& y = {"0", "0", "0", "0"},
    const std::array<std::string, 4>& z = {"0", "0", "0", "0"},
    const std::string& position_error = "0",
    const std::string& velocity_error = "0") {
  return eom::CubicHistorySegment(
      t_start, t_end, eom::CubicCoefficientTokens{x, y, z},
      position_error, velocity_error);
}

eom::RetainedHistory history(
    const std::string& id,
    const std::array<std::string, 4>& x,
    const std::string& t_end = "5") {
  return eom::RetainedHistory(id, {segment("0", t_end, x)});
}

void print_string_array(const std::vector<std::string>& values) {
  std::cout << '[';
  for (std::size_t index = 0; index < values.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    std::cout << '"' << values[index] << '"';
  }
  std::cout << ']';
}

void print_index_array(const std::vector<std::size_t>& values) {
  std::cout << '[';
  for (std::size_t index = 0; index < values.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    std::cout << values[index];
  }
  std::cout << ']';
}

void print_block(const eom::MovingHistoryBlockCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"block_id\":\"" << certificate.block_id
            << "\",\"status\":\"" << certificate.status
            << "\",\"logical_ordered_pairs\":"
            << certificate.logical_ordered_pairs
            << ",\"excluded_pairs\":" << certificate.excluded_pairs
            << ",\"exact_fallback_pairs\":"
            << certificate.exact_fallback_pairs
            << ",\"residual_lower\":" << certificate.residual.lower()
            << ",\"residual_upper\":" << certificate.residual.upper()
            << ",\"receiver_history_ids\":";
  print_string_array(certificate.receiver_history_ids);
  std::cout << ",\"source_history_ids\":";
  print_string_array(certificate.source_history_ids);
  std::cout << '}';
}

void print_pair(const eom::ExactPairCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"row_id\":\"" << certificate.row_id
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"root_free_complement\":"
            << (certificate.root_free_complement ? "true" : "false")
            << ",\"memory_boundary_contact\":"
            << (certificate.memory_boundary_contact ? "true" : "false")
            << ",\"coincident_endpoint_excluded\":"
            << (certificate.coincident_endpoint_excluded ? "true" : "false")
            << ",\"precision_escalated\":"
            << (certificate.precision_escalated ? "true" : "false")
            << ",\"achieved_precision_bits\":"
            << certificate.achieved_precision_bits
            << ",\"visited_cells\":" << certificate.visited_cells
            << ",\"reevaluated_cells\":" << certificate.reevaluated_cells
            << ",\"warm_excluded_cells\":"
            << certificate.warm_excluded_cells
            << ",\"warm_residual_drift_upper\":"
            << certificate.warm_residual_drift_upper
            << ",\"root_free_cell_count\":"
            << certificate.root_free_cells.size()
            << ",\"excluded_cells\":" << certificate.excluded_cells
            << ",\"difficult_cells\":" << certificate.difficult_cells
            << ",\"roots\":[";
  for (std::size_t index = 0; index < certificate.roots.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& root = certificate.roots[index];
    std::cout << "{\"lower\":\"" << root.lower
              << "\",\"upper\":\"" << root.upper
              << "\",\"source_normal_lower\":\""
              << root.source_normal_lower
              << "\",\"source_normal_upper\":\""
              << root.source_normal_upper
              << "\",\"receiver_normal_lower\":\""
              << root.receiver_normal_lower
              << "\",\"receiver_normal_upper\":\""
              << root.receiver_normal_upper
              << "\",\"source_normal_sign\":" << root.source_normal_sign
              << ",\"source_segment_indices\":";
    print_index_array(root.source_segment_indices);
    std::cout << ",\"precision_route\":\"" << root.precision_route
              << "\",\"precision_bits\":" << root.precision_bits << '}';
  }
  std::cout << "]}";
}

void print_traversal(
    const eom::CertifiedTraversalCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"traversal_id\":\"" << certificate.traversal_id
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"logical_ordered_pairs\":"
            << certificate.logical_ordered_pairs
            << ",\"excluded_pairs\":" << certificate.excluded_pairs
            << ",\"exact_fallback_pairs\":"
            << certificate.exact_fallback_pairs
            << ",\"enclosed_pairs\":" << certificate.enclosed_pairs
            << ",\"unresolved_pairs\":" << certificate.unresolved_pairs
            << ",\"visited_nodes\":" << certificate.visited_nodes
            << ",\"coverage_disjoint_complete\":"
            << (certificate.coverage_disjoint_complete ? "true" : "false")
            << ",\"nodes\":[";
  for (std::size_t index = 0; index < certificate.nodes.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& node = certificate.nodes[index];
    std::cout << "{\"node_id\":\"" << node.node_id
              << "\",\"status\":\"" << node.status
              << "\",\"receiver_begin\":" << node.receiver_begin
              << ",\"receiver_end\":" << node.receiver_end
              << ",\"source_begin\":" << node.source_begin
              << ",\"source_end\":" << node.source_end
              << ",\"emission_lower\":" << node.emission_lower
              << ",\"emission_upper\":" << node.emission_upper
              << ",\"logical_ordered_pairs\":"
              << node.logical_ordered_pairs
              << ",\"residual_lower\":" << node.residual.lower()
              << ",\"residual_upper\":" << node.residual.upper()
              << '}';
  }
  std::cout << "],\"membership_tiles\":[";
  for (std::size_t index = 0;
       index < certificate.membership_tiles.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& tile = certificate.membership_tiles[index];
    std::cout << "{\"status\":\"" << tile.status
              << "\",\"receiver_begin\":" << tile.receiver_begin
              << ",\"receiver_end\":" << tile.receiver_end
              << ",\"source_begin\":" << tile.source_begin
              << ",\"source_end\":" << tile.source_end
              << ",\"logical_ordered_pairs\":"
              << tile.logical_ordered_pairs << '}';
  }
  std::cout << "]}";
}

void print_traversal_exact_batch(
    const eom::CertifiedTraversalExactBatchCertificate& certificate) {
  std::cout << "{\"schema\":\"" << certificate.schema
            << "\",\"status\":\"" << certificate.status
            << "\",\"failure_code\":\"" << certificate.failure_code
            << "\",\"logical_ordered_pairs\":"
            << certificate.logical_ordered_pairs
            << ",\"excluded_pairs\":" << certificate.excluded_pairs
            << ",\"exact_pairs_requested\":"
            << certificate.exact_pairs_requested
            << ",\"exact_pairs_completed\":"
            << certificate.exact_pairs_completed
            << ",\"enclosed_pairs\":" << certificate.enclosed_pairs
            << ",\"unresolved_pairs\":" << certificate.unresolved_pairs
            << ",\"coverage_disjoint_complete\":"
            << (certificate.coverage_disjoint_complete ? "true" : "false")
            << ",\"rows\":[";
  for (std::size_t index = 0;
       index < certificate.exact_pair_certificates.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    const auto& row = certificate.exact_pair_certificates[index];
    std::cout << "{\"row_id\":\"" << row.row_id
              << "\",\"status\":\"" << row.status
              << "\",\"root_count\":" << row.roots.size() << '}';
  }
  std::cout << "]}";
}

std::vector<eom::ExactPairCertificate> pair_fixture() {
  const auto receiver = history("receiver-origin", {"0", "0", "0", "0"});
  const auto moving_receiver =
      history("receiver-moving", {"0", "0.2", "0", "0"});
  const auto one_root = history("one-root", {"2", "0", "0", "0"});
  const auto two_roots = history("two-roots", {"5", "-4", "1", "0"});
  const auto root_free = history("root-free", {"10", "0", "0", "0"});
  const auto moving_source =
      history("moving-source", {"2", "0.25", "0", "0"});
  const auto close_roots =
      history("close-roots", {"4.0001", "-3.0001", "1", "0"});
  const auto tangent = history("tangent", {"5.25", "-4", "1", "0"});
  const auto self_static =
      history("self-static", {"0", "0", "0", "0"}, "3");
  const auto self_rail = history("self-rail", {"0", "1", "0", "0"}, "3");
  const auto self_curved_rail = eom::RetainedHistory::uniform_circular(
      "self-curved-rail",
      {
          .t_start = "0",
          .t_end = "3",
          .maximum_segment_step = "0.05",
          .cylindrical_radius = "1",
          .height = "0",
          .angular_speed = "1",
          .tangential_speed = "1",
          .phase = "0",
          .tilt_x = "0",
          .tilt_y = "0",
      });
  const eom::RetainedHistory nonendpoint_subfield_self(
      "nonendpoint-subfield-self",
      {segment("0", "1", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-14", "1e-14"),
       segment("1", "2", {"0", "0", "1.5", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-14", "1e-14")});
  const eom::RetainedHistory enclosed_self_root_cluster(
      "enclosed-self-root-cluster",
      {segment("0", "1", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-6", "1e-6"),
       segment("1", "2", {"0", "0", "1.5", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-6", "1e-6")});
  const auto memory_boundary =
      history("memory-boundary", {"3", "-2", "1", "0"});
  const eom::RetainedHistory piecewise_boundary(
      "piecewise-boundary",
      {segment("0", "3", {"2", "0", "0", "0"}),
       segment("3", "5", {"2", "0", "0", "0"})});
  const eom::RetainedHistory uncertain_receiver(
      "uncertain-receiver",
      {segment("-0.5", "0.5", {"0.5625", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-9", "0")});
  const eom::RetainedHistory uncertain_source(
      "uncertain-source",
      {segment("-0.5", "0.5", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-9", "0")});
  const eom::RetainedHistory uncertain_join_receiver(
      "uncertain-join-receiver",
      {segment("-1", "1", {"1", "0", "0", "0"})});
  const eom::RetainedHistory uncertain_join_source(
      "uncertain-join-source",
      {segment("-1", "0", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-9", "0"),
       segment("0", "1", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "1e-9", "0")});
  const eom::RetainedHistory inward_probe_receiver(
      "inward-probe-receiver",
      {segment("-0.000000020", "0.000000002",
               {"0.0000000075", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "0.0000000005", "0")});
  const eom::RetainedHistory inward_probe_source(
      "inward-probe-source",
      {segment("-0.000000020", "-0.000000010",
               {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "0.0000000005", "0"),
       segment("-0.000000010", "0.000000002", {"0", "0", "0", "0"},
               {"0", "0", "0", "0"}, {"0", "0", "0", "0"},
               "0.0000000005", "0")});

  std::vector<eom::ExactPairRequest> requests;
  auto add = [&](std::string row_id, const eom::RetainedHistory& target,
                 const eom::RetainedHistory& source, std::string reception,
                 std::string lower, std::string upper, std::string tolerance,
                 bool force = false, bool defer = false) {
    requests.push_back({
        .row_id = std::move(row_id),
        .receiver = &target,
        .source = &source,
        .reception_time = std::move(reception),
        .search_lower = std::move(lower),
        .search_upper = std::move(upper),
        .field_speed = "1",
        .root_tolerance = std::move(tolerance),
        .max_depth = 256,
        .max_cells = 500000,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = 512,
        .force_precision_escalation = force,
        .defer_precision_escalation = defer,
    });
  };
  add("one_root", receiver, one_root, "5", "0", "4.5", "1e-12");
  add("two_roots", receiver, two_roots, "3", "0", "2.5", "1e-12");
  add("root_free", receiver, root_free, "3", "0", "2.5", "1e-12");
  add("moving_receiver", moving_receiver, one_root, "5", "0", "4.5",
      "1e-12");
  add("moving_source", receiver, moving_source, "5", "0", "4.5",
      "1e-12");
  add("difficult_close_roots", receiver, close_roots, "3", "0.5", "1.5",
      "1e-16");
  add("automatic_mpfr_precision_gate", receiver, close_roots, "3", "0.5",
      "1.5", "1e-14");
  add("deferred_mpfr_precision_gate", receiver, close_roots, "3", "0.5",
      "1.5", "1e-14", false, true);
  add("tangent", receiver, tangent, "3", "0", "2.5", "1e-16", true);
  add("self_subfield", self_static, self_static, "3", "0", "3", "1e-12");
  add("self_rail", self_rail, self_rail, "3", "0", "3", "1e-12", true);
  add("self_curved_rail", self_curved_rail, self_curved_rail, "3", "0",
      "3", "1e-12", true);
  add("nonendpoint_subfield_self_root", nonendpoint_subfield_self,
      nonendpoint_subfield_self, "2", "0", "2", "1e-12", true);
  add("enclosed_self_root_cluster", enclosed_self_root_cluster,
      enclosed_self_root_cluster, "2", "0", "2", "1e-8", true);
  add("memory_boundary", receiver, memory_boundary, "3", "0", "2", "1e-12");
  add("piecewise_boundary", receiver, piecewise_boundary, "5", "0", "4.5",
      "1e-12");
  add("uncertain_midpoint_root", uncertain_receiver, uncertain_source, "0.5",
      "-0.5", "0.5", "1e-5");
  add("uncertain_segment_join_root", uncertain_join_receiver,
      uncertain_join_source, "1", "-1", "0.5", "1e-5");
  add("mpfr_inward_tolerance_probe", inward_probe_receiver,
      inward_probe_source, "0.000000002", "-0.000000020",
      "0.000000002", "1e-8", true);
  auto certificates = eom::certify_exact_pair_batch(requests, 4);
  const auto prior = eom::certify_exact_pair({
      .row_id = "warm_complement_prior",
      .receiver = &receiver,
      .source = &root_free,
      .reception_time = "3",
      .search_lower = "0",
      .search_upper = "2.5",
      .field_speed = "1",
      .root_tolerance = "1e-12",
      .max_depth = 256,
      .max_cells = 500000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
  });
  const eom::ExactPairWarmStart warm_start{
      .certificate = &prior,
      .receiver = &receiver,
      .source = &root_free,
  };
  certificates.push_back(eom::certify_exact_pair({
      .row_id = "warm_complement_current",
      .receiver = &receiver,
      .source = &root_free,
      .reception_time = "3.001",
      .search_lower = "0",
      .search_upper = "2.5",
      .field_speed = "1",
      .root_tolerance = "1e-12",
      .max_depth = 256,
      .max_cells = 500000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .warm_start = &warm_start,
  }));
  return certificates;
}

void print_all() {
  const auto receiver_a = history("block-receiver-a", {"0", "0.2", "0", "0"});
  const auto receiver_b = history("block-receiver-b", {"1", "0.1", "0", "0"});
  const auto far_source_a = history("block-far-a", {"20", "0.3", "0", "0"});
  const auto far_source_b = history("block-far-b", {"22", "-0.2", "0", "0"});
  const auto near_source_a = history("block-near-a", {"2", "0.1", "0", "0"});
  const auto near_source_b = history("block-near-b", {"3", "-0.1", "0", "0"});
  const eom::MovingHistoryBlockRequest far{
      .block_id = "moving_far",
      .receivers = {&receiver_a, &receiver_b},
      .sources = {&far_source_a, &far_source_b},
      .reception = {"4", "4.1"},
      .emission = {"0", "2"},
      .field_speed = "1",
  };
  const eom::MovingHistoryBlockRequest near{
      .block_id = "moving_near",
      .receivers = {&receiver_a, &receiver_b},
      .sources = {&near_source_a, &near_source_b},
      .reception = {"4", "4.1"},
      .emission = {"0", "2"},
      .field_speed = "1",
  };
  const eom::CertifiedTraversalRequest traversal_request{
      .traversal_id = "mixed-moving-history",
      .receivers = {
          {"receiver-a", &receiver_a, true},
          {"receiver-b", &receiver_b, true}},
      .sources = {
          {"far-a", &far_source_a, true},
          {"far-b", &far_source_b, true},
          {"near-a", &near_source_a, true},
          {"near-b", &near_source_b, true},
      },
      .reception = {"4", "4"},
      .emission = {"0", "2"},
      .field_speed = "1",
      .exact_tile_pair_limit = 4,
      .maximum_nodes = 32,
      .maximum_emission_depth = 2,
  };
  const auto traversal =
      eom::certify_moving_history_traversal(traversal_request);
  const eom::CertifiedTraversalExactBatchRequest exact_batch_request{
      .traversal_request = &traversal_request,
      .traversal_certificate = &traversal,
      .reception_time = "4",
      .search_lower = "0",
      .search_upper = "2",
      .root_tolerance = "1e-10",
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .maximum_exact_pairs = 16,
      .thread_count = 4,
  };
  const auto exact_batch =
      eom::certify_traversal_exact_pair_batch(exact_batch_request);
  auto exact_batch_single_request = exact_batch_request;
  exact_batch_single_request.thread_count = 1;
  const auto exact_batch_single =
      eom::certify_traversal_exact_pair_batch(exact_batch_single_request);
  auto resource_request = traversal_request;
  resource_request.traversal_id = "mixed-moving-history-resource-control";
  resource_request.maximum_nodes = 1;
  const auto traversal_resource_failure =
      eom::certify_moving_history_traversal(resource_request);
  auto exact_resource_request = exact_batch_request;
  exact_resource_request.maximum_exact_pairs = 2;
  const auto exact_resource_failure =
      eom::certify_traversal_exact_pair_batch(exact_resource_request);
  bool discontinuity_rejected = false;
  try {
    const eom::RetainedHistory discontinuous(
        "discontinuous-control",
        {segment("0", "1", {"0", "1", "0", "0"}),
         segment("1", "2", {"2", "1", "0", "0"})});
    static_cast<void>(discontinuous);
  } catch (const std::invalid_argument&) {
    discontinuity_rejected = true;
  }
  bool inconsistent_circular_speed_rejected = false;
  try {
    const auto invalid = eom::RetainedHistory::uniform_circular(
        "inconsistent-circular-speed-control",
        {
            .t_start = "0",
            .t_end = "1",
            .maximum_segment_step = "0.1",
            .cylindrical_radius = "1",
            .height = "0",
            .angular_speed = "1",
            .tangential_speed = "0.9",
            .phase = "0",
        });
    static_cast<void>(invalid);
  } catch (const std::invalid_argument&) {
    inconsistent_circular_speed_rejected = true;
  }
  bool unaccepted_history_rejected = false;
  try {
    auto unaccepted_request = traversal_request;
    unaccepted_request.traversal_id = "unaccepted-history-control";
    unaccepted_request.receivers[0].accepted_retained_history = false;
    static_cast<void>(
        eom::certify_moving_history_traversal(unaccepted_request));
  } catch (const std::invalid_argument&) {
    unaccepted_history_rejected = true;
  }
  std::cout << "{\"schema\":\"eom_native_fixture_packet/v0\","
            << "\"discontinuous_history_rejected\":"
            << (discontinuity_rejected ? "true" : "false")
            << ",\"inconsistent_circular_speed_rejected\":"
            << (inconsistent_circular_speed_rejected ? "true" : "false")
            << ",\"unaccepted_history_rejected\":"
            << (unaccepted_history_rejected ? "true" : "false")
            << ",\"blocks\":[";
  print_block(eom::certify_moving_history_block(far));
  std::cout << ',';
  print_block(eom::certify_moving_history_block(near));
  std::cout << "],\"traversal\":";
  print_traversal(traversal);
  std::cout << ",\"traversal_exact_batch\":";
  print_traversal_exact_batch(exact_batch);
  std::cout << ",\"traversal_exact_batch_single_thread\":";
  print_traversal_exact_batch(exact_batch_single);
  std::cout << ",\"traversal_resource_failure\":";
  print_traversal(traversal_resource_failure);
  std::cout << ",\"traversal_exact_resource_failure\":";
  print_traversal_exact_batch(exact_resource_failure);
  std::cout << ",\"pairs\":[";
  const auto pairs = pair_fixture();
  for (std::size_t index = 0; index < pairs.size(); ++index) {
    if (index > 0) {
      std::cout << ',';
    }
    print_pair(pairs[index]);
  }
  std::cout << "]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    if (argc != 2 || std::string(argv[1]) != "all") {
      std::cerr << "usage: eom_native_fixture_cli all\n";
      return EXIT_FAILURE;
    }
    print_all();
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "eom native fixture failed: " << error.what() << '\n';
    return EXIT_FAILURE;
  }
}

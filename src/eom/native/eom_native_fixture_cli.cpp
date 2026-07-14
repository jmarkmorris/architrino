#include "architrino/eom/BlockExclusion.hpp"
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
    const std::array<std::string, 4>& z = {"0", "0", "0", "0"}) {
  return eom::CubicHistorySegment(
      t_start, t_end, eom::CubicCoefficientTokens{x, y, z});
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
  const auto memory_boundary =
      history("memory-boundary", {"3", "-2", "1", "0"});
  const eom::RetainedHistory piecewise_boundary(
      "piecewise-boundary",
      {segment("0", "3", {"2", "0", "0", "0"}),
       segment("3", "5", {"2", "0", "0", "0"})});

  std::vector<eom::ExactPairRequest> requests;
  auto add = [&](std::string row_id, const eom::RetainedHistory& target,
                 const eom::RetainedHistory& source, std::string reception,
                 std::string lower, std::string upper, std::string tolerance,
                 bool force = false) {
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
  add("tangent", receiver, tangent, "3", "0", "2.5", "1e-16", true);
  add("self_subfield", self_static, self_static, "3", "0", "3", "1e-12");
  add("self_rail", self_rail, self_rail, "3", "0", "3", "1e-12", true);
  add("memory_boundary", receiver, memory_boundary, "3", "0", "2", "1e-12");
  add("piecewise_boundary", receiver, piecewise_boundary, "5", "0", "4.5",
      "1e-12");
  return eom::certify_exact_pair_batch(requests, 4);
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
  std::cout << "{\"schema\":\"eom_native_fixture_packet/v0\","
            << "\"discontinuous_history_rejected\":"
            << (discontinuity_rejected ? "true" : "false")
            << ",\"blocks\":[";
  print_block(eom::certify_moving_history_block(far));
  std::cout << ',';
  print_block(eom::certify_moving_history_block(near));
  std::cout << "],\"pairs\":[";
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

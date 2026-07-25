#include "architrino/eom/History.hpp"

#include <chrono>
#include <cstdlib>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <limits>
#include <string>
#include <type_traits>
#include <vector>

namespace eom = architrino::eom;

namespace {

eom::CubicHistorySegment stationary_segment(std::size_t index) {
  const std::string start = std::to_string(index);
  const std::string end = std::to_string(index + 1U);
  const std::array<std::string, 4> zero{"0", "0", "0", "0"};
  return eom::CubicHistorySegment(
      start, end, eom::CubicCoefficientTokens{zero, zero, zero});
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc != 2) {
      std::cerr
          << "usage: eom_history_profile_cli "
             "correlated-position-hull|pin-lifetime\n";
      return EXIT_FAILURE;
    }
    const std::string mode = argv[1];
    if (mode != "correlated-position-hull" && mode != "pin-lifetime") {
      std::cerr
          << "usage: eom_history_profile_cli "
             "correlated-position-hull|pin-lifetime\n";
      return EXIT_FAILURE;
    }
    constexpr std::size_t segment_count = 4096U;
    constexpr std::size_t iteration_count = 500U;
    const std::filesystem::path root =
        std::filesystem::temp_directory_path() /
        "architrino-eom-history-profile";
    eom::configure_history_disk_storage({
        .root_directory = root.string(),
        .maximum_disk_bytes = UINT64_C(1073741824),
        .cached_blocks_per_thread = 2U,
    });
    eom::begin_history_disk_storage_run("correlated-position-hull");
    if (mode == "pin-lifetime") {
      eom::HistorySegmentSequence::PinnedSegment disk_pin;
      {
        std::vector<eom::CubicHistorySegment> segments;
        segments.reserve(192U);
        for (std::size_t index = 0U; index < 192U; ++index) {
          segments.push_back(stationary_segment(index));
        }
        eom::HistorySegmentSequence sequence(std::move(segments));
        disk_pin = sequence.pin(0U);
        // Load two later pages into the two-entry cache so page zero is no
        // longer protected by the pager itself.
        static_cast<void>(sequence.at(64U));
        static_cast<void>(sequence.at(128U));
      }
      const bool disk_pin_outlived_sequence =
          disk_pin && disk_pin->t_start() == 0.0 &&
          disk_pin->t_end() == 1.0;

      eom::HistorySegmentSequence::PinnedSegment memory_pin;
      {
        std::vector<eom::CubicHistorySegment> segments;
        segments.reserve(65U);
        for (std::size_t index = 0U; index < 65U; ++index) {
          segments.push_back(stationary_segment(index));
        }
        eom::HistorySegmentSequence sequence(std::move(segments));
        // The full first page is disk-backed; the final partial page remains
        // in memory and must have the same self-owning pin contract.
        memory_pin = sequence.pin(64U);
      }
      const bool memory_pin_outlived_sequence =
          memory_pin && memory_pin->t_start() == 64.0 &&
          memory_pin->t_end() == 65.0;

      using IteratorCategory = typename std::iterator_traits<
          eom::HistorySegmentSequence::const_iterator>::iterator_category;
      const bool iterator_is_input =
          std::is_same_v<IteratorCategory, std::input_iterator_tag>;
      std::cout
          << "{\"schema\":\"eom_history_pin_lifetime/v1\""
          << ",\"disk_pin_outlived_sequence\":"
          << (disk_pin_outlived_sequence ? "true" : "false")
          << ",\"memory_pin_outlived_sequence\":"
          << (memory_pin_outlived_sequence ? "true" : "false")
          << ",\"iterator_is_input\":"
          << (iterator_is_input ? "true" : "false")
          << "}\n";
      eom::release_history_disk_storage_run();
      return disk_pin_outlived_sequence &&
              memory_pin_outlived_sequence && iterator_is_input
          ? EXIT_SUCCESS
          : EXIT_FAILURE;
    }
    std::vector<eom::CubicHistorySegment> segments;
    segments.reserve(segment_count);
    for (std::size_t index = 0U; index < segment_count; ++index) {
      segments.push_back(stationary_segment(index));
    }
    const eom::RetainedHistory history(
        "profile-stationary-history", std::move(segments));
    const eom::Interval query(2048.25, 2048.75);
    const std::uint64_t loads_before =
        eom::history_disk_storage_stats().block_load_count;
    const auto start = std::chrono::steady_clock::now();
    double checksum = 0.0;
    for (std::size_t iteration = 0U; iteration < iteration_count;
         ++iteration) {
      const auto hull = history.correlated_position_hull(query);
      checksum += hull[0].lower() + hull[0].upper();
    }
    const double wall_seconds =
        std::chrono::duration<double>(
            std::chrono::steady_clock::now() - start)
            .count();
    const auto stats = eom::history_disk_storage_stats();
    std::cout << std::setprecision(std::numeric_limits<double>::max_digits10)
              << "{\"schema\":\"eom_history_profile/v1\""
              << ",\"case\":\"correlated-position-hull\""
              << ",\"segment_count\":" << segment_count
              << ",\"iteration_count\":" << iteration_count
              << ",\"wall_seconds\":" << wall_seconds
              << ",\"block_load_count\":"
              << (stats.block_load_count - loads_before)
              << ",\"checksum\":" << checksum << "}\n";
    eom::release_history_disk_storage_run();
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "EOM history profile failed: " << error.what() << '\n';
    return EXIT_FAILURE;
  }
}

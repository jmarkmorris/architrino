#include "architrino/eom/History.hpp"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstdlib>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <limits>
#include <optional>
#include <stdexcept>
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

eom::CubicHistorySegment moving_segment(std::size_t index) {
  const std::string start = std::to_string(index);
  const std::string end = std::to_string(index + 1U);
  const auto signed_index = static_cast<long long>(index);
  const eom::CubicCoefficientTokens coefficients{{
      {std::to_string(signed_index), "1", "0", "0"},
      {std::to_string(2 * signed_index), "2", "0", "0"},
      {std::to_string(-signed_index), "-1", "0", "0"},
  }};
  return eom::CubicHistorySegment(
      start, end, coefficients,
      eom::HistoryErrorTokens{"1e-12", "2e-12", "3e-12"},
      eom::HistoryErrorTokens{"4e-12", "5e-12", "6e-12"});
}

bool same_interval_vector(
    const eom::IntervalVector& left,
    const eom::IntervalVector& right) {
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    if (left[axis].lower() != right[axis].lower() ||
        left[axis].upper() != right[axis].upper()) {
      return false;
    }
  }
  return true;
}

eom::IntervalVector intersect_vectors(
    const eom::IntervalVector& left,
    const eom::IntervalVector& right) {
  eom::IntervalVector result = left;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    const auto intersection = left[axis].intersection(right[axis]);
    if (!intersection.has_value()) {
      throw std::runtime_error(
          "legacy endpoint state intersection is empty");
    }
    result[axis] = *intersection;
  }
  return result;
}

eom::IntervalVector legacy_endpoint_position_hull(
    const eom::RetainedHistory& history,
    const eom::Interval& endpoint) {
  const std::size_t endpoint_index = history.segments().size() - 1U;
  const auto endpoint_segment = history.segments().pin(endpoint_index);
  const eom::IntervalVector ordinary =
      endpoint_segment->position_interval(endpoint);
  if (endpoint_index == 0U) {
    return ordinary;
  }
  const auto preceding_segment =
      history.segments().pin(endpoint_index - 1U);
  const double join_time = preceding_segment->t_end();
  const eom::Interval join = eom::Interval::point(join_time);
  const eom::IntervalVector shared = intersect_vectors(
      preceding_segment->position_interval(join),
      endpoint_segment->position_interval(join));
  const eom::IntervalVector nominal_delta = eom::subtract(
      endpoint_segment->nominal_position_interval(endpoint),
      endpoint_segment->nominal_position_interval(join));
  const double distance = std::max(
      std::abs(endpoint.lower() - join_time),
      std::abs(endpoint.upper() - join_time));
  eom::IntervalVector propagated = shared;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    propagated[axis] =
        (shared[axis] + nominal_delta[axis]).inflate(
            endpoint_segment->velocity_errors()[axis] * distance);
  }
  return intersect_vectors(ordinary, propagated);
}

// Reproduces the pre-indexed endpoint velocity algorithm for parity and
// diagnostic timing. It deliberately performs both retained-history scans.
eom::IntervalVector legacy_endpoint_velocity_hull(
    const eom::RetainedHistory& history,
    const eom::Interval& endpoint) {
  std::optional<eom::IntervalVector> result;
  for (const auto& segment : history.segments()) {
    if (endpoint.upper() < segment.t_start() ||
        endpoint.lower() > segment.t_end()) {
      continue;
    }
    const eom::Interval local_time(
        std::max(endpoint.lower(), segment.t_start()),
        std::min(endpoint.upper(), segment.t_end()));
    const auto local = segment.velocity_interval(local_time);
    result = result.has_value() ? eom::hull(*result, local) : local;
  }
  if (!result.has_value()) {
    throw std::out_of_range("legacy endpoint is not covered");
  }
  for (const auto& segment : history.segments()) {
    const double point = endpoint.lower();
    if (point < segment.t_start() || point > segment.t_end()) {
      continue;
    }
    *result = intersect_vectors(*result, segment.velocity_interval(endpoint));
  }
  return *result;
}

double state_checksum(const eom::HistoryEndpointState& state) {
  double result = 0.0;
  for (std::size_t axis = 0U; axis < 3U; ++axis) {
    result += state.position[axis].lower() + state.position[axis].upper();
    result += state.velocity[axis].lower() + state.velocity[axis].upper();
  }
  return result;
}

void print_usage() {
  std::cerr
      << "usage: eom_history_profile_cli "
         "correlated-position-hull|pin-lifetime|"
         "terminal-state-equivalence|terminal-state-performance|"
         "append-metadata-performance\n";
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc != 2) {
      print_usage();
      return EXIT_FAILURE;
    }
    const std::string mode = argv[1];
    if (mode != "correlated-position-hull" && mode != "pin-lifetime" &&
        mode != "terminal-state-equivalence" &&
        mode != "terminal-state-performance" &&
        mode != "append-metadata-performance") {
      print_usage();
      return EXIT_FAILURE;
    }
    if (mode == "terminal-state-performance") {
      constexpr std::size_t segment_count = 4096U;
      constexpr std::size_t iteration_count = 500U;
      std::vector<eom::CubicHistorySegment> segments;
      segments.reserve(segment_count);
      for (std::size_t index = 0U; index < segment_count; ++index) {
        segments.push_back(moving_segment(index));
      }
      const eom::RetainedHistory history(
          "terminal-state-performance", std::move(segments));
      const eom::Interval endpoint = eom::Interval::point(history.t_end());

      static_cast<void>(legacy_endpoint_velocity_hull(history, endpoint));
      static_cast<void>(history.endpoint_state_hull());
      double legacy_checksum = 0.0;
      const auto legacy_start = std::chrono::steady_clock::now();
      for (std::size_t iteration = 0U; iteration < iteration_count;
           ++iteration) {
        const eom::HistoryEndpointState state{
            .position = legacy_endpoint_position_hull(history, endpoint),
            .velocity = legacy_endpoint_velocity_hull(history, endpoint),
        };
        legacy_checksum += state_checksum(state);
      }
      const double legacy_wall_seconds =
          std::chrono::duration<double>(
              std::chrono::steady_clock::now() - legacy_start)
              .count();

      double indexed_checksum = 0.0;
      const auto indexed_start = std::chrono::steady_clock::now();
      for (std::size_t iteration = 0U; iteration < iteration_count;
           ++iteration) {
        indexed_checksum += state_checksum(history.endpoint_state_hull());
      }
      const double indexed_wall_seconds =
          std::chrono::duration<double>(
              std::chrono::steady_clock::now() - indexed_start)
              .count();
      const bool equivalent = legacy_checksum == indexed_checksum;
      std::cout
          << std::setprecision(std::numeric_limits<double>::max_digits10)
          << "{\"schema\":\"eom_history_terminal_state_performance/v1\""
          << ",\"segment_count\":" << segment_count
          << ",\"iteration_count\":" << iteration_count
          << ",\"legacy_wall_seconds\":" << legacy_wall_seconds
          << ",\"indexed_wall_seconds\":" << indexed_wall_seconds
          << ",\"legacy_mean_microseconds\":"
          << legacy_wall_seconds * 1.0e6 /
                 static_cast<double>(iteration_count)
          << ",\"indexed_mean_microseconds\":"
          << indexed_wall_seconds * 1.0e6 /
                 static_cast<double>(iteration_count)
          << ",\"speedup\":"
          << legacy_wall_seconds / indexed_wall_seconds
          << ",\"equivalent\":" << (equivalent ? "true" : "false")
          << ",\"checksum\":" << indexed_checksum << "}\n";
      return equivalent ? EXIT_SUCCESS : EXIT_FAILURE;
    }
    constexpr std::size_t segment_count = 4096U;
    constexpr std::size_t iteration_count = 500U;
    const auto run_nonce =
        std::chrono::steady_clock::now().time_since_epoch().count();
    const std::filesystem::path root =
        std::filesystem::temp_directory_path() /
        ("architrino-eom-history-profile-" + mode + "-" +
         std::to_string(run_nonce));
    eom::configure_history_disk_storage({
        .root_directory = root.string(),
        .maximum_disk_bytes = UINT64_C(1073741824),
        .cached_blocks_per_thread = 2U,
    });
    eom::begin_history_disk_storage_run(mode);
    if (mode == "append-metadata-performance") {
      constexpr std::size_t metadata_segment_count = 192U;
      constexpr std::size_t metadata_iteration_count = 2000U;
      std::vector<eom::CubicHistorySegment> segments;
      segments.reserve(metadata_segment_count);
      for (std::size_t index = 0U;
           index < metadata_segment_count; ++index) {
        segments.push_back(moving_segment(index));
      }
      const eom::RetainedHistory history(
          "append-metadata-performance", std::move(segments));
      eom::HistoryAppendDiagnostics totals;
      std::size_t checksum = 0U;
      for (std::size_t iteration = 0U;
           iteration < metadata_iteration_count; ++iteration) {
        eom::HistoryAppendDiagnostics current;
        const auto appended = history.appended(
            moving_segment(metadata_segment_count), &current);
        totals.fingerprint_metadata_update_wall_seconds +=
            current.fingerprint_metadata_update_wall_seconds;
        totals.terminal_join_validation_wall_seconds +=
            current.terminal_join_validation_wall_seconds;
        totals.fingerprint_update_wall_seconds +=
            current.fingerprint_update_wall_seconds;
        totals.segment_metadata_wall_seconds +=
            current.segment_metadata_wall_seconds;
        totals.history_wrapper_construction_wall_seconds +=
            current.history_wrapper_construction_wall_seconds;
        totals.fingerprint_metadata_update_disk_block_load_count +=
            current.fingerprint_metadata_update_disk_block_load_count;
        checksum += appended.provenance_fingerprint().size();
      }
      const double iterations =
          static_cast<double>(metadata_iteration_count);
      std::cout
          << std::setprecision(std::numeric_limits<double>::max_digits10)
          << "{\"schema\":\"eom_history_append_metadata_performance/v1\""
          << ",\"segment_count\":" << metadata_segment_count
          << ",\"iteration_count\":" << metadata_iteration_count
          << ",\"metadata_mean_microseconds\":"
          << totals.fingerprint_metadata_update_wall_seconds * 1.0e6 /
                 iterations
          << ",\"join_validation_mean_microseconds\":"
          << totals.terminal_join_validation_wall_seconds * 1.0e6 /
                 iterations
          << ",\"fingerprint_update_mean_microseconds\":"
          << totals.fingerprint_update_wall_seconds * 1.0e6 / iterations
          << ",\"segment_metadata_mean_microseconds\":"
          << totals.segment_metadata_wall_seconds * 1.0e6 / iterations
          << ",\"wrapper_construction_mean_microseconds\":"
          << totals.history_wrapper_construction_wall_seconds * 1.0e6 /
                 iterations
          << ",\"metadata_disk_block_loads\":"
          << totals.fingerprint_metadata_update_disk_block_load_count
          << ",\"checksum\":" << checksum << "}\n";
      eom::release_history_disk_storage_run();
      return EXIT_SUCCESS;
    }
    if (mode == "terminal-state-equivalence") {
      constexpr std::size_t equivalence_segment_count = 192U;
      std::vector<eom::CubicHistorySegment> segments;
      segments.reserve(equivalence_segment_count);
      for (std::size_t index = 0U;
           index < equivalence_segment_count; ++index) {
        segments.push_back(moving_segment(index));
      }
      const eom::RetainedHistory history(
          "terminal-state-equivalence", std::move(segments));
      const eom::Interval endpoint = eom::Interval::point(history.t_end());
      const std::uint64_t endpoint_loads_before =
          eom::history_disk_storage_stats().block_load_count;
      const eom::HistoryEndpointState indexed =
          history.endpoint_state_hull();
      const std::uint64_t endpoint_disk_block_loads =
          eom::history_disk_storage_stats().block_load_count -
          endpoint_loads_before;
      eom::HistoryAppendDiagnostics append_diagnostics;
      const auto appended = history.appended(
          moving_segment(equivalence_segment_count), &append_diagnostics);
      const bool appended_terminal_matches =
          appended.segments().back().t_end() ==
          static_cast<double>(equivalence_segment_count + 1U);
      const eom::HistoryEndpointState legacy{
          .position = legacy_endpoint_position_hull(history, endpoint),
          .velocity = legacy_endpoint_velocity_hull(history, endpoint),
      };
      const auto terminal_segment =
          history.segments().pin(history.segments().size() - 1U);
      const bool joint_equivalent =
          same_interval_vector(legacy.position, indexed.position) &&
          same_interval_vector(legacy.velocity, indexed.velocity);
      const bool generic_position_equivalent = same_interval_vector(
          history.position_hull(endpoint),
          terminal_segment->position_interval(endpoint));
      const bool generic_velocity_equivalent =
          same_interval_vector(
              history.velocity_hull(endpoint), legacy.velocity) &&
          same_interval_vector(
              history.correlated_velocity_hull(endpoint), legacy.velocity);
      const bool disk_backed =
          history.segments().disk_backed_block_count() >= 2U;
      const bool cache_avoided_disk_loads =
          endpoint_disk_block_loads == 0U &&
          append_diagnostics
                  .fingerprint_metadata_update_disk_block_load_count == 0U &&
          append_diagnostics.tail_block_copy_disk_block_load_count == 0U;
      std::cout
          << "{\"schema\":\"eom_history_terminal_state_equivalence/v1\""
          << ",\"segment_count\":" << equivalence_segment_count
          << ",\"joint_equivalent\":"
          << (joint_equivalent ? "true" : "false")
          << ",\"generic_position_equivalent\":"
          << (generic_position_equivalent ? "true" : "false")
          << ",\"generic_velocity_equivalent\":"
          << (generic_velocity_equivalent ? "true" : "false")
          << ",\"disk_backed\":" << (disk_backed ? "true" : "false")
          << ",\"endpoint_disk_block_loads\":"
          << endpoint_disk_block_loads
          << ",\"append_metadata_disk_block_loads\":"
          << append_diagnostics
                 .fingerprint_metadata_update_disk_block_load_count
          << ",\"cache_avoided_disk_loads\":"
          << (cache_avoided_disk_loads ? "true" : "false")
          << "}\n";
      eom::release_history_disk_storage_run();
      return joint_equivalent && generic_position_equivalent &&
              generic_velocity_equivalent && disk_backed &&
              appended_terminal_matches && cache_avoided_disk_loads
          ? EXIT_SUCCESS
          : EXIT_FAILURE;
    }
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

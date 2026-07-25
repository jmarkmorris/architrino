#include "architrino/eom/CertifiedTraversal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <algorithm>
#include <atomic>
#include <chrono>
#include <cmath>
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <sys/resource.h>
#include <thread>
#include <vector>

namespace eom = architrino::eom;

namespace {

using Clock = std::chrono::steady_clock;
using ScaledDecimal = std::int64_t;
constexpr ScaledDecimal decimal_scale = INT64_C(1000000000000);

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(17) << value;
  return stream.str();
}

ScaledDecimal scaled_decimal(double value) {
  const long double scaled =
      static_cast<long double>(value) * decimal_scale;
  if (scaled < static_cast<long double>(
                   std::numeric_limits<ScaledDecimal>::min()) ||
      scaled > static_cast<long double>(
                   std::numeric_limits<ScaledDecimal>::max())) {
    throw std::overflow_error("fixed decimal token exceeds int64 range");
  }
  return static_cast<ScaledDecimal>(std::llround(scaled));
}

std::string exact_token(ScaledDecimal value) {
  const bool negative = value < 0;
  const std::uint64_t magnitude = negative
      ? static_cast<std::uint64_t>(-(value + 1)) + 1U
      : static_cast<std::uint64_t>(value);
  const std::uint64_t whole = magnitude / decimal_scale;
  const std::uint64_t fractional = magnitude % decimal_scale;
  std::ostringstream stream;
  if (negative) {
    stream << '-';
  }
  stream << whole << '.' << std::setfill('0') << std::setw(12)
         << fractional;
  return stream.str();
}

eom::RetainedHistory linear_history(
    const std::string& id, double position, double velocity) {
  return eom::RetainedHistory(
      id,
      {eom::CubicHistorySegment(
          "0", "2",
          eom::CubicCoefficientTokens{
              std::array<std::string, 4>{
                  token(position), token(velocity), "0", "0"},
              std::array<std::string, 4>{"0", "0", "0", "0"},
              std::array<std::string, 4>{"0", "0", "0", "0"}},
          "0", "0")});
}

eom::RetainedHistory piecewise_cubic_history(
    const std::string& id, double position, double velocity,
    double quadratic, double cubic) {
  const ScaledDecimal exact_position = scaled_decimal(position);
  const ScaledDecimal exact_velocity = scaled_decimal(velocity);
  const ScaledDecimal exact_quadratic = scaled_decimal(quadratic);
  const ScaledDecimal exact_cubic = scaled_decimal(cubic);
  const std::string exact_position_token = exact_token(exact_position);
  const std::string velocity_token = exact_token(exact_velocity);
  const std::string quadratic_token = exact_token(exact_quadratic);
  const std::string cubic_token = exact_token(exact_cubic);
  const std::string join_position = exact_token(
      exact_position + exact_velocity + exact_quadratic + exact_cubic);
  const std::string join_velocity = exact_token(
      exact_velocity + 2 * exact_quadratic + 3 * exact_cubic);
  const std::string second_quadratic =
      exact_token(-3 * exact_quadratic / 4);
  const std::string second_cubic = exact_token(-exact_cubic / 2);
  return eom::RetainedHistory(
      id,
      {eom::CubicHistorySegment(
           "0", "1",
           eom::CubicCoefficientTokens{
               std::array<std::string, 4>{
                   exact_position_token, velocity_token, quadratic_token,
                   cubic_token},
               std::array<std::string, 4>{"0", "0", "0", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"}},
           "0", "0"),
       eom::CubicHistorySegment(
           "1", "2",
           eom::CubicCoefficientTokens{
               std::array<std::string, 4>{
                   join_position, join_velocity, second_quadratic,
                   second_cubic},
               std::array<std::string, 4>{"0", "0", "0", "0"},
               std::array<std::string, 4>{"0", "0", "0", "0"}},
           "0", "0")});
}

std::uint64_t checked_logical(std::size_t population) {
  if (population >
      std::numeric_limits<std::uint64_t>::max() / population) {
    throw std::overflow_error("logical pair count overflows uint64");
  }
  return static_cast<std::uint64_t>(population) * population;
}

long peak_resident_bytes() {
  rusage usage{};
  if (getrusage(RUSAGE_SELF, &usage) != 0) {
    return -1;
  }
#if defined(__APPLE__)
  return usage.ru_maxrss;
#else
  return usage.ru_maxrss * 1024L;
#endif
}

class Heartbeat {
 public:
  Heartbeat(std::string label, std::size_t population)
      : label_(std::move(label)), population_(population),
        started_(Clock::now()), worker_([this]() { run(); }) {}

  ~Heartbeat() {
    done_.store(true);
    worker_.join();
  }

 private:
  void run() {
    for (unsigned tick = 1; !done_.load(); ++tick) {
      for (unsigned tenth = 0; tenth < 100 && !done_.load(); ++tenth) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
      }
      if (!done_.load()) {
        const double elapsed = std::chrono::duration<double>(
            Clock::now() - started_).count();
        std::cerr << "heartbeat label=" << label_
                  << " population=" << population_
                  << " tick=" << tick
                  << " wall_seconds=" << std::fixed << std::setprecision(3)
                  << elapsed << '\n';
      }
    }
  }

  std::string label_;
  std::size_t population_;
  Clock::time_point started_;
  std::atomic<bool> done_{false};
  std::thread worker_;
};

std::uint64_t fnv_mix(std::uint64_t value, std::uint64_t item) {
  constexpr std::uint64_t prime = 1099511628211ULL;
  for (unsigned byte = 0; byte < 8; ++byte) {
    value ^= (item >> (byte * 8U)) & 0xffU;
    value *= prime;
  }
  return value;
}

std::string membership_fingerprint(
    const eom::CertifiedTraversalCertificate& certificate) {
  std::uint64_t value = 1469598103934665603ULL;
  for (const auto& tile : certificate.membership_tiles) {
    value = fnv_mix(value, tile.status == "excluded" ? 1U :
        (tile.status == "exact_tile" ? 2U : 4U));
    value = fnv_mix(value, tile.receiver_begin);
    value = fnv_mix(value, tile.receiver_end);
    value = fnv_mix(value, tile.transmitter_begin);
    value = fnv_mix(value, tile.transmitter_end);
    value = fnv_mix(value, tile.logical_ordered_pairs);
  }
  std::ostringstream stream;
  stream << std::hex << std::setfill('0') << std::setw(16) << value;
  return stream.str();
}

struct Population {
  std::vector<eom::RetainedHistory> receivers;
  std::vector<eom::RetainedHistory> sources;
  std::vector<eom::MovingHistoryMember> receiver_members;
  std::vector<eom::MovingHistoryMember> transmitter_members;
};

Population make_population(std::string_view kind, std::size_t count) {
  Population population;
  population.receivers.reserve(count);
  population.sources.reserve(count);
  const bool accelerating =
      kind == "accelerating_sparse" || kind == "accelerating_dense";
  const bool moving = accelerating ||
      kind == "moving_sparse" || kind == "moving_dense";
  const bool sparse = kind == "sparse" || kind == "moving_sparse" ||
      kind == "accelerating_sparse";
  const std::size_t sparse_near_count =
      std::max<std::size_t>(4U, count / 100U);
  for (std::size_t index = 0; index < count; ++index) {
    const double receiver_position =
        static_cast<double>(index) /
        (2.0 * static_cast<double>(count));
    const double receiver_velocity = moving
        ? 0.02 + 0.003 * static_cast<double>(index % 7U)
        : 0.0;
    double transmitter_position = receiver_position;
    double transmitter_velocity = moving
        ? -0.014 + 0.005 * static_cast<double>(index % 5U)
        : 0.0;
    if (sparse) {
      if (index + sparse_near_count < count) {
        transmitter_position = 1000.0 + static_cast<double>(index) * 0.001;
        if (moving) {
          transmitter_velocity =
              -0.01 + 0.004 * static_cast<double>(index % 5U);
        }
      } else {
        const std::size_t local = index - (count - sparse_near_count);
        transmitter_position = 0.75 + static_cast<double>(local) /
            (2.0 * static_cast<double>(sparse_near_count));
        if (moving) {
          transmitter_velocity = 0.005 +
              0.01 * static_cast<double>(local) /
                  static_cast<double>(
                      std::max<std::size_t>(1U, sparse_near_count - 1U));
        }
      }
    }
    const double receiver_quadratic =
        0.002 + 0.0002 * static_cast<double>(index % 5U);
    const double receiver_cubic =
        0.0001 + 0.00002 * static_cast<double>(index % 3U);
    double transmitter_quadratic =
        -0.0014 - 0.0001 * static_cast<double>(index % 5U);
    double transmitter_cubic =
        0.00008 + 0.00001 * static_cast<double>(index % 3U);
    if (sparse && index + sparse_near_count < count) {
      transmitter_quadratic =
          -0.001 + 0.00015 * static_cast<double>(index % 5U);
      transmitter_cubic =
          -0.00007 - 0.00001 * static_cast<double>(index % 3U);
    } else if (sparse) {
      transmitter_quadratic =
          0.001 + 0.00015 * static_cast<double>(index % 5U);
      transmitter_cubic =
          0.00005 + 0.00001 * static_cast<double>(index % 3U);
    }
    if (accelerating) {
      population.receivers.push_back(piecewise_cubic_history(
          "receiver-" + std::to_string(index), receiver_position,
          receiver_velocity, receiver_quadratic, receiver_cubic));
      population.sources.push_back(piecewise_cubic_history(
          "source-" + std::to_string(index), transmitter_position,
          transmitter_velocity, transmitter_quadratic, transmitter_cubic));
    } else {
      population.receivers.push_back(linear_history(
          "receiver-" + std::to_string(index), receiver_position,
          receiver_velocity));
      population.sources.push_back(linear_history(
          "source-" + std::to_string(index), transmitter_position,
          transmitter_velocity));
    }
  }
  population.receiver_members.reserve(count);
  population.transmitter_members.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    population.receiver_members.push_back({
        "receiver-" + std::to_string(index),
        &population.receivers[index], true});
    population.transmitter_members.push_back({
        "source-" + std::to_string(index),
        &population.sources[index], true});
  }
  return population;
}

void print_common(
    std::string_view route, std::string_view kind, std::size_t population,
    std::size_t threads, std::string_view status, std::string_view failure,
    double wall, std::uint64_t logical, std::size_t visited,
    std::uint64_t excluded, std::uint64_t exact, std::uint64_t unresolved,
    std::string_view fingerprint) {
  const double logical_double = static_cast<double>(logical);
  const bool complete = status == "certified_complete";
  std::cout << std::setprecision(17)
            << "{\"schema\":\"eom_recursive_block_benchmark/v1\""
            << ",\"route\":\"" << route << "\""
            << ",\"population_kind\":\"" << kind << "\""
            << ",\"population\":" << population
            << ",\"thread_count\":" << threads
            << ",\"status\":\"" << status << "\""
            << ",\"failure_code\":\"" << failure << "\""
            << ",\"wall_seconds\":" << wall
            << ",\"logical_pairs\":" << logical
            << ",\"visited_blocks\":" << visited
            << ",\"excluded_pairs\":" << excluded
            << ",\"exact_fallback_pairs\":" << exact
            << ",\"enclosed_pairs\":0"
            << ",\"unresolved_pairs\":" << unresolved
            << ",\"exclusion_ratio\":"
            << (logical == 0U ? 0.0 : static_cast<double>(excluded) /
                                          logical_double)
            << ",\"exact_search_reduction\":"
            << (!complete || logical == 0U
                    ? 0.0
                    : 1.0 - static_cast<double>(exact) / logical_double)
            << ",\"peak_resident_bytes\":" << peak_resident_bytes()
            << ",\"seconds_per_logical_pair\":"
            << (logical == 0U ? 0.0 : wall / logical_double)
            << ",\"membership_fingerprint\":\"" << fingerprint << "\"}\n";
}

void run_traversal(
    std::string_view kind, std::size_t count, std::size_t threads,
    std::uint64_t maximum_exact_pairs, bool complete_path) {
  const std::uint64_t logical = checked_logical(count);
  if ((kind == "dense" || kind == "moving_dense" ||
       kind == "accelerating_dense") &&
      logical > maximum_exact_pairs) {
    print_common(
        complete_path ? "recursive_complete" : "recursive_traversal",
        kind, count, threads, "uncertified",
        "resource_envelope_exceeded", 0.0, logical, 0, 0, 0, logical,
        "preflight");
    return;
  }
  Population population = make_population(kind, count);
  const eom::CertifiedTraversalRequest request{
      .traversal_id = std::string(kind) + "-" + std::to_string(count),
      .receivers = population.receiver_members,
      .sources = population.transmitter_members,
      .reception = {"2", "2"},
      .emission = {"0", "2"},
      .field_speed = "1",
      .exact_tile_pair_limit = 64,
      .maximum_nodes = 2000000,
      .maximum_emission_depth = 2,
      .maximum_pair_tracking_bytes = 256U * 1024U * 1024U,
      .maximum_exact_pairs = maximum_exact_pairs,
  };
  Heartbeat heartbeat(
      complete_path ? "recursive_complete" : "recursive_traversal", count);
  const auto started = Clock::now();
  const auto certificate = eom::certify_moving_history_traversal(request);
  std::string status = certificate.status;
  std::string failure = certificate.failure_code;
  std::uint64_t unresolved = certificate.unresolved_pairs;
  if (complete_path && certificate.status == "certified_complete") {
    const eom::CertifiedTraversalExactBatchRequest batch_request{
        .traversal_request = &request,
        .traversal_certificate = &certificate,
        .reception_time = "2",
        .search_lower = "0",
        .search_upper = "2",
        .root_tolerance = "1e-10",
        .root_max_depth = 128,
        .root_max_cells = 10000,
        .initial_mpfr_bits = 128,
        .maximum_mpfr_bits = 512,
        .maximum_exact_pairs = maximum_exact_pairs,
        .thread_count = threads,
    };
    const auto exact = eom::certify_traversal_exact_pair_batch(batch_request);
    status = exact.status;
    failure = exact.failure_code;
    unresolved = exact.unresolved_pairs;
  }
  const double wall = std::chrono::duration<double>(
      Clock::now() - started).count();
  print_common(
      complete_path ? "recursive_complete" : "recursive_traversal",
      kind, count, threads, status, failure, wall, logical,
      certificate.visited_nodes,
      certificate.excluded_pairs, certificate.exact_fallback_pairs,
      unresolved, membership_fingerprint(certificate));
}

void run_exhaustive(
    std::string_view kind, std::size_t count, std::size_t threads,
    std::uint64_t maximum_exact_pairs) {
  const std::uint64_t logical = checked_logical(count);
  if (logical > maximum_exact_pairs) {
    print_common(
        "exhaustive_exact_pair", kind, count, threads, "uncertified",
        "resource_envelope_exceeded", 0.0, logical, 0, 0, 0, logical,
        "not_applicable");
    return;
  }
  Population population = make_population(kind, count);
  std::vector<eom::ExactPairRequest> requests;
  requests.reserve(static_cast<std::size_t>(logical));
  for (std::size_t receiver = 0; receiver < count; ++receiver) {
    for (std::size_t source = 0; source < count; ++source) {
      requests.push_back({
          .row_id = "exact/" + std::to_string(receiver) + "/" +
              std::to_string(source),
          .receiver = &population.receivers[receiver],
          .source = &population.sources[source],
          .reception_time = "2",
          .search_lower = "0",
          .search_upper = "2",
          .field_speed = "1",
          .root_tolerance = "1e-10",
          .max_depth = 128,
          .max_cells = 10000,
          .initial_mpfr_bits = 128,
          .maximum_mpfr_bits = 512,
      });
    }
  }
  Heartbeat heartbeat("exhaustive_exact_pair", count);
  const auto started = Clock::now();
  const auto certificates = eom::certify_exact_pair_batch(requests, threads);
  const double wall = std::chrono::duration<double>(
      Clock::now() - started).count();
  std::uint64_t complete = 0;
  for (const auto& certificate : certificates) {
    if (certificate.status == "certified_complete" &&
        certificate.root_free_complement &&
        !certificate.memory_boundary_contact) {
      ++complete;
    }
  }
  const std::uint64_t unresolved = logical - complete;
  print_common(
      "exhaustive_exact_pair", kind, count, threads,
      unresolved == 0U ? "certified_complete" : "uncertified",
      unresolved == 0U ? "" : "root_completeness_not_certified",
      wall, logical, 0, 0, complete, unresolved, "not_applicable");
}

std::size_t positive_size(const char* token_value, const char* label) {
  const unsigned long long value = std::stoull(token_value);
  if (value == 0U || value > std::numeric_limits<std::size_t>::max()) {
    throw std::invalid_argument(std::string(label) + " must be positive");
  }
  return static_cast<std::size_t>(value);
}

}  // namespace

int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc != 6) {
      std::cerr << "usage: eom_recursive_block_benchmark_cli "
                   "traversal|recursive|exhaustive "
                   "sparse|dense|moving_sparse|moving_dense|"
                   "accelerating_sparse|accelerating_dense population threads "
                   "maximum_exact_pairs\n";
      return EXIT_FAILURE;
    }
    const std::string route = argv[1];
    const std::string kind = argv[2];
    if ((route != "traversal" && route != "recursive" &&
         route != "exhaustive") ||
        (kind != "sparse" && kind != "dense" &&
         kind != "moving_sparse" && kind != "moving_dense" &&
         kind != "accelerating_sparse" && kind != "accelerating_dense")) {
      throw std::invalid_argument("unsupported route or population kind");
    }
    const std::size_t population = positive_size(argv[3], "population");
    const std::size_t threads = positive_size(argv[4], "threads");
    const std::uint64_t maximum_exact_pairs = std::stoull(argv[5]);
    if (route == "traversal" || route == "recursive") {
      run_traversal(
          kind, population, threads, maximum_exact_pairs,
          route == "recursive");
    } else {
      run_exhaustive(kind, population, threads, maximum_exact_pairs);
    }
    return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << "recursive block benchmark failed: " << error.what() << '\n';
    return EXIT_FAILURE;
  }
}

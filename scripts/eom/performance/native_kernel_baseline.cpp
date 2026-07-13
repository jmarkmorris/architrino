// Reference-only EOM architecture microbenchmark. This is not a solver.

#include <algorithm>
#include <atomic>
#include <chrono>
#include <cmath>
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <limits>
#include <stdexcept>
#include <string>
#include <thread>
#include <vector>

namespace {

using Clock = std::chrono::steady_clock;

struct Config {
  std::uint64_t population = 10000;
  unsigned threads = 1;
  double spacing = 2.0;
  std::uint64_t leaf_size = 8;
  std::uint64_t pair_samples = 2000000;
  std::uint64_t interpolation_samples = 2000000;
  std::uint64_t reduction_size = 1000000;
};

struct Counts {
  std::uint64_t visited_nodes = 0;
  std::uint64_t excluded_pairs = 0;
  std::uint64_t exact_fallback_pairs = 0;
  std::uint64_t active_root_pairs = 0;

  Counts &operator+=(const Counts &other) {
    visited_nodes += other.visited_nodes;
    excluded_pairs += other.excluded_pairs;
    exact_fallback_pairs += other.exact_fallback_pairs;
    active_root_pairs += other.active_root_pairs;
    return *this;
  }
};

std::uint64_t parse_u64(const char *value, const char *name) {
  char *end = nullptr;
  const auto result = std::strtoull(value, &end, 10);
  if (end == value || *end != '\0') {
    throw std::runtime_error(std::string("invalid ") + name);
  }
  return result;
}

double parse_double(const char *value, const char *name) {
  char *end = nullptr;
  const auto result = std::strtod(value, &end);
  if (end == value || *end != '\0' || !std::isfinite(result)) {
    throw std::runtime_error(std::string("invalid ") + name);
  }
  return result;
}

Config parse_args(int argc, char **argv) {
  Config config;
  for (int index = 1; index < argc; index += 2) {
    if (index + 1 >= argc) {
      throw std::runtime_error("every option requires a value");
    }
    const std::string option = argv[index];
    if (option == "--population") {
      config.population = parse_u64(argv[index + 1], "population");
    } else if (option == "--threads") {
      config.threads = static_cast<unsigned>(parse_u64(argv[index + 1], "threads"));
    } else if (option == "--spacing") {
      config.spacing = parse_double(argv[index + 1], "spacing");
    } else if (option == "--leaf-size") {
      config.leaf_size = parse_u64(argv[index + 1], "leaf size");
    } else if (option == "--pair-samples") {
      config.pair_samples = parse_u64(argv[index + 1], "pair samples");
    } else if (option == "--interpolation-samples") {
      config.interpolation_samples = parse_u64(argv[index + 1], "interpolation samples");
    } else if (option == "--reduction-size") {
      config.reduction_size = parse_u64(argv[index + 1], "reduction size");
    } else {
      throw std::runtime_error("unknown option: " + option);
    }
  }
  if (config.population == 0 || config.threads == 0 || config.leaf_size == 0 ||
      config.spacing <= 0.0) {
    throw std::runtime_error("population, threads, leaf size, and spacing must be positive");
  }
  return config;
}

double elapsed_seconds(Clock::time_point start) {
  return std::chrono::duration<double>(Clock::now() - start).count();
}

Counts traverse_stationary_blocks(const std::vector<double> &positions,
                                  std::uint64_t receiver_begin,
                                  std::uint64_t receiver_end,
                                  std::uint64_t leaf_size) {
  struct Work {
    std::uint64_t receiver_begin;
    std::uint64_t receiver_end;
    std::uint64_t source_begin;
    std::uint64_t source_end;
  };

  std::vector<Work> stack;
  stack.reserve(256);
  stack.push_back({receiver_begin, receiver_end, 0, positions.size()});
  Counts counts;
  constexpr double field_speed = 1.0;
  constexpr double maximum_delay = 1.0;
  const double causal_reach_upper = std::nextafter(
      field_speed * maximum_delay, std::numeric_limits<double>::infinity());

  while (!stack.empty()) {
    const Work work = stack.back();
    stack.pop_back();
    ++counts.visited_nodes;

    const auto receiver_count = work.receiver_end - work.receiver_begin;
    const auto source_count = work.source_end - work.source_begin;
    const double receiver_min = positions[work.receiver_begin];
    const double receiver_max = positions[work.receiver_end - 1];
    const double source_min = positions[work.source_begin];
    const double source_max = positions[work.source_end - 1];

    double lower_distance = 0.0;
    if (receiver_max < source_min) {
      lower_distance = std::nextafter(
          source_min - receiver_max, -std::numeric_limits<double>::infinity());
    } else if (source_max < receiver_min) {
      lower_distance = std::nextafter(
          receiver_min - source_max, -std::numeric_limits<double>::infinity());
    }
    if (lower_distance > causal_reach_upper) {
      counts.excluded_pairs += receiver_count * source_count;
      continue;
    }

    if (receiver_count <= leaf_size && source_count <= leaf_size) {
      counts.exact_fallback_pairs += receiver_count * source_count;
      for (auto receiver = work.receiver_begin; receiver < work.receiver_end;
           ++receiver) {
        for (auto source = work.source_begin; source < work.source_end; ++source) {
          const double distance = std::abs(positions[receiver] - positions[source]);
          if (distance > 0.0 && distance <= 1.0) {
            ++counts.active_root_pairs;
          }
        }
      }
      continue;
    }

    if (receiver_count >= source_count && receiver_count > leaf_size) {
      const auto middle = work.receiver_begin + receiver_count / 2;
      stack.push_back({middle, work.receiver_end, work.source_begin, work.source_end});
      stack.push_back({work.receiver_begin, middle, work.source_begin, work.source_end});
    } else {
      const auto middle = work.source_begin + source_count / 2;
      stack.push_back({work.receiver_begin, work.receiver_end, middle, work.source_end});
      stack.push_back({work.receiver_begin, work.receiver_end, work.source_begin, middle});
    }
  }
  return counts;
}

std::pair<Counts, double> benchmark_blocks(const Config &config,
                                           const std::vector<double> &positions) {
  std::vector<Counts> partial(config.threads);
  std::vector<std::thread> workers;
  workers.reserve(config.threads);
  const auto start = Clock::now();
  for (unsigned worker = 0; worker < config.threads; ++worker) {
    const std::uint64_t begin = config.population * worker / config.threads;
    const std::uint64_t end = config.population * (worker + 1) / config.threads;
    workers.emplace_back([&, worker, begin, end]() {
      partial[worker] = traverse_stationary_blocks(positions, begin, end,
                                                   config.leaf_size);
    });
  }
  for (auto &worker : workers) {
    worker.join();
  }
  const double seconds = elapsed_seconds(start);
  Counts total;
  for (const auto &value : partial) {
    total += value;
  }
  return {total, seconds};
}

struct BulkResult {
  std::uint64_t rows;
  std::uint64_t excluded;
  double seconds;
  double rows_per_second;
};

BulkResult benchmark_pair_classification(std::uint64_t samples) {
  std::vector<double> receiver(samples);
  std::vector<double> source(samples);
  for (std::uint64_t index = 0; index < samples; ++index) {
    receiver[index] = static_cast<double>(index % 4096) * 0.125;
    source[index] = static_cast<double>((index * 104729 + 17) % 4096) * 0.125;
  }
  std::uint64_t excluded = 0;
  const auto start = Clock::now();
  for (std::uint64_t index = 0; index < samples; ++index) {
    excluded += static_cast<std::uint64_t>(
        std::abs(receiver[index] - source[index]) > 1.0);
  }
  const double seconds = elapsed_seconds(start);
  return {samples, excluded, seconds, samples / seconds};
}

BulkResult benchmark_interpolation(std::uint64_t samples) {
  std::vector<double> time(samples);
  std::vector<double> output(samples);
  for (std::uint64_t index = 0; index < samples; ++index) {
    time[index] = static_cast<double>(index % 1000) / 1000.0;
  }
  const auto start = Clock::now();
  for (std::uint64_t index = 0; index < samples; ++index) {
    const double t = time[index];
    output[index] = ((0.125 * t - 0.25) * t + 0.5) * t + 1.0;
  }
  const double seconds = elapsed_seconds(start);
  volatile double witness = output[samples / 2];
  (void)witness;
  return {samples, 0, seconds, samples / seconds};
}

struct ReductionResult {
  std::uint64_t values;
  double seconds;
  double values_per_second;
  double sum;
};

ReductionResult benchmark_fixed_pairwise_reduction(std::uint64_t size) {
  std::vector<double> values(size);
  for (std::uint64_t index = 0; index < size; ++index) {
    values[index] = (index % 2 == 0 ? 1.0 : -1.0) /
                    static_cast<double>((index % 1024) + 1);
  }
  const auto start = Clock::now();
  std::uint64_t active = size;
  while (active > 1) {
    const std::uint64_t pairs = active / 2;
    for (std::uint64_t index = 0; index < pairs; ++index) {
      values[index] = values[2 * index] + values[2 * index + 1];
    }
    if (active % 2 != 0) {
      values[pairs] = values[active - 1];
    }
    active = pairs + active % 2;
  }
  const double seconds = elapsed_seconds(start);
  return {size, seconds, size / seconds, values[0]};
}

} // namespace

int main(int argc, char **argv) {
  try {
    const Config config = parse_args(argc, argv);
    std::vector<double> positions(config.population);
    for (std::uint64_t index = 0; index < config.population; ++index) {
      positions[index] = static_cast<double>(index) * config.spacing;
    }

    const auto [counts, block_seconds] = benchmark_blocks(config, positions);
    const auto pair_result = benchmark_pair_classification(config.pair_samples);
    const auto interpolation_result =
        benchmark_interpolation(config.interpolation_samples);
    const auto reduction_result =
        benchmark_fixed_pairwise_reduction(config.reduction_size);
    const long double logical_pairs = static_cast<long double>(config.population) *
                                      static_cast<long double>(config.population);

    std::cout << std::setprecision(17);
    std::cout << "{";
    std::cout << "\"schema\":\"eom_native_kernel_baseline/v0\",";
    std::cout << "\"authority\":\"reference-benchmark-only\",";
    std::cout << "\"population\":" << config.population << ",";
    std::cout << "\"threads\":" << config.threads << ",";
    std::cout << "\"spacing\":" << config.spacing << ",";
    std::cout << "\"leaf_size\":" << config.leaf_size << ",";
    std::cout << "\"logical_ordered_pairs\":"
              << static_cast<std::uint64_t>(logical_pairs) << ",";
    std::cout << "\"block_traversal\":{";
    std::cout << "\"seconds\":" << block_seconds << ",";
    std::cout << "\"visited_nodes\":" << counts.visited_nodes << ",";
    std::cout << "\"excluded_pairs\":" << counts.excluded_pairs << ",";
    std::cout << "\"exact_fallback_pairs\":" << counts.exact_fallback_pairs << ",";
    std::cout << "\"active_root_pairs\":" << counts.active_root_pairs << ",";
    std::cout << "\"exclusion_ratio\":"
              << static_cast<double>(counts.excluded_pairs / logical_pairs) << "},";
    std::cout << "\"pair_classification\":{";
    std::cout << "\"rows\":" << pair_result.rows << ",";
    std::cout << "\"excluded\":" << pair_result.excluded << ",";
    std::cout << "\"seconds\":" << pair_result.seconds << ",";
    std::cout << "\"rows_per_second\":" << pair_result.rows_per_second << "},";
    std::cout << "\"history_interpolation\":{";
    std::cout << "\"rows\":" << interpolation_result.rows << ",";
    std::cout << "\"seconds\":" << interpolation_result.seconds << ",";
    std::cout << "\"rows_per_second\":" << interpolation_result.rows_per_second << "},";
    std::cout << "\"fixed_pairwise_reduction\":{";
    std::cout << "\"values\":" << reduction_result.values << ",";
    std::cout << "\"seconds\":" << reduction_result.seconds << ",";
    std::cout << "\"values_per_second\":" << reduction_result.values_per_second << ",";
    std::cout << "\"sum\":" << reduction_result.sum << "}";
    std::cout << "}\n";
    return 0;
  } catch (const std::exception &error) {
    std::cerr << error.what() << '\n';
    return 2;
  }
}

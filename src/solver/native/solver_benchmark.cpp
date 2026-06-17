#include "architrino/solver/AssemblyGraphStore.hpp"
#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/Geometry.hpp"
#include "architrino/solver/PathHistoryStream.hpp"
#include "architrino/solver/SpaceTimeIndex.hpp"

#include <chrono>
#include <cmath>
#include <cstdint>
#include <filesystem>
#include <iomanip>
#include <iostream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace {

using Clock = std::chrono::steady_clock;

struct BenchmarkOutcome {
  std::uint64_t operations = 0;
  std::uint64_t observations = 0;
  double checksum = 0.0;
};

struct BenchmarkResult {
  std::string name;
  std::uint64_t operations = 0;
  std::uint64_t observations = 0;
  double elapsedMs = 0.0;
  double operationsPerSecond = 0.0;
  double checksum = 0.0;
};

architrino::solver::LinearPathSegment make_segment(std::string pathId,
                                                   double x,
                                                   double y,
                                                   double speed,
                                                   double startTime = 0.0,
                                                   double endTime = 12.0) {
  return architrino::solver::LinearPathSegment{
      std::move(pathId),
      startTime,
      endTime,
      architrino::solver::Vector3{x, y, 0.0},
      architrino::solver::Vector3{speed, 0.0, 0.0},
      architrino::solver::NumericType::F64,
      1e-12,
  };
}

architrino::solver::PathHistoryRowF64 make_path_row(std::uint64_t pathKey,
                                                    std::uint64_t segmentIndex,
                                                    double x,
                                                    double y,
                                                    double speed,
                                                    double startTime,
                                                    double duration) {
  return architrino::solver::make_path_history_row(
      make_segment("bench-path", x, y, speed, startTime, startTime + duration),
      pathKey,
      segmentIndex,
      0);
}

std::vector<architrino::solver::PathHistoryRowF64> make_path_rows(std::size_t count,
                                                                  std::uint64_t pathKeyBase,
                                                                  double yBase) {
  std::vector<architrino::solver::PathHistoryRowF64> rows;
  rows.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    const std::uint64_t pathKey = pathKeyBase + static_cast<std::uint64_t>(index % 16);
    const double startTime = static_cast<double>(index % 128) * 0.05;
    const double x = static_cast<double>(index % 64) * 0.125;
    const double y = yBase + static_cast<double>((index / 64) % 8) * 0.25;
    const double speed = 0.02 + static_cast<double>(index % 7) * 0.001;
    rows.push_back(make_path_row(pathKey, static_cast<std::uint64_t>(index), x, y, speed, startTime, 0.2));
  }
  return rows;
}

std::vector<architrino::solver::CausalRootBatchItem> make_causal_root_batch(std::size_t count) {
  std::vector<architrino::solver::CausalRootBatchItem> items;
  items.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    const double offset = static_cast<double>(index % 32) * 0.01;
    architrino::solver::CausalRootRequest request;
    request.sourceId = "bench-source";
    request.receiverId = "bench-receiver";
    request.source = make_segment("bench-source", 0.0, offset, 0.05);
    request.receiver = make_segment("bench-receiver", 4.0 + offset, offset, 0.0);
    request.hitTime = 8.0 + static_cast<double>(index % 8) * 0.02;
    request.signalSpeed = 1.0;
    request.rootTolerance = 1e-12;
    request.maxIterations = 96;
    request.scanSubdivisions = 64;
    items.push_back(architrino::solver::CausalRootBatchItem{
        static_cast<std::uint64_t>(index),
        std::move(request),
    });
  }
  return items;
}

std::vector<architrino::solver::AssemblyStateRowF64> make_assembly_states(std::size_t count) {
  std::vector<architrino::solver::AssemblyStateRowF64> rows;
  rows.reserve(count);
  for (std::size_t index = 0; index < count; ++index) {
    const double timeStart = static_cast<double>(index % 256) * 0.1;
    rows.push_back(architrino::solver::AssemblyStateRowF64{
        9000 + static_cast<std::uint64_t>(index % 32),
        12000 + static_cast<std::uint64_t>(index),
        timeStart,
        timeStart + 0.1,
        static_cast<double>(index % 64) * 0.05,
        static_cast<double>((index / 64) % 16) * 0.05,
        0.0,
        0.01,
        0.0,
        0.0,
        0.0,
        static_cast<std::int64_t>(index),
        1,
        0,
        0,
        0,
    });
  }
  return rows;
}

BenchmarkResult measure(std::string name, BenchmarkOutcome (*workload)()) {
  const auto started = Clock::now();
  const BenchmarkOutcome outcome = workload();
  const auto finished = Clock::now();
  const double elapsedMs =
      std::chrono::duration<double, std::milli>(finished - started).count();
  return BenchmarkResult{
      std::move(name),
      outcome.operations,
      outcome.observations,
      elapsedMs,
      elapsedMs > 0.0 ? static_cast<double>(outcome.operations) * 1000.0 / elapsedMs : 0.0,
      outcome.checksum,
  };
}

BenchmarkOutcome benchmark_causal_root_batch() {
  const std::vector<architrino::solver::CausalRootBatchItem> items =
      make_causal_root_batch(512);
  const architrino::solver::CausalRootBatchResult result =
      architrino::solver::solve_causal_roots_batch(
          items,
          architrino::solver::CausalRootBatchOptions{2, true});
  if (!result.validation.ok || result.items.size() != items.size()) {
    throw std::runtime_error("causal-root batch benchmark failed validation");
  }
  std::uint64_t rootCount = 0;
  double checksum = 0.0;
  for (const architrino::solver::CausalRootBatchItemResult& item : result.items) {
    rootCount += item.result.roots.size();
    for (const architrino::solver::CausalRoot& root : item.result.roots) {
      checksum += root.emissionTime + root.distance + root.branchWeight;
    }
  }
  if (rootCount == 0 || !std::isfinite(checksum)) {
    throw std::runtime_error("causal-root batch benchmark produced no roots");
  }
  return BenchmarkOutcome{items.size(), rootCount, checksum};
}

BenchmarkOutcome benchmark_emission_shell_broad_phase() {
  const std::vector<architrino::solver::PathHistoryRowF64> sourceRows =
      make_path_rows(192, 1000, 0.0);
  const std::vector<architrino::solver::PathHistoryRowF64> receiverRows =
      make_path_rows(192, 2000, 0.15);
  const architrino::solver::EmissionShellBroadPhaseResult result =
      architrino::solver::query_emission_shell_broad_phase_parallel(
          sourceRows,
          receiverRows,
          architrino::solver::EmissionShellBroadPhaseOptions{
              1.0,
              1e-9,
              sourceRows.size() * receiverRows.size(),
              false,
              true,
              0.0,
              8.0,
              2,
          },
          architrino::solver::ParallelExecutionOptions{2, 256, true});
  if (result.summary.pairCount == 0 || result.summary.truncated) {
    throw std::runtime_error("emission-shell broad-phase benchmark failed");
  }
  double checksum = 0.0;
  for (const architrino::solver::EmissionShellBroadPhaseCandidate& candidate : result.candidates) {
    checksum += candidate.distanceLowerBound + candidate.distanceUpperBound;
  }
  return BenchmarkOutcome{
      result.summary.pairCount,
      static_cast<std::uint64_t>(result.candidates.size()),
      checksum,
  };
}

BenchmarkOutcome benchmark_spacetime_index() {
  const std::vector<architrino::solver::PathHistoryRowF64> pathRows =
      make_path_rows(2048, 3000, 0.0);
  const std::vector<architrino::solver::AssemblyStateRowF64> assemblyRows =
      make_assembly_states(512);
  const architrino::solver::SpaceTimeIndexOptions options{0.5, 0.5, 128};
  architrino::solver::SpaceTimeIndexBuildResult pathIndex =
      architrino::solver::build_path_history_spacetime_index(pathRows, options);
  architrino::solver::SpaceTimeIndexBuildResult assemblyIndex =
      architrino::solver::build_assembly_state_spacetime_index(assemblyRows, options, pathRows.size());
  const architrino::solver::SpaceTimeIndexBuildResult merged =
      architrino::solver::merge_spacetime_index_results({std::move(pathIndex), std::move(assemblyIndex)});
  if (!merged.validation.ok || merged.rows.empty()) {
    throw std::runtime_error("spacetime index benchmark failed to build rows");
  }
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> matches =
      architrino::solver::query_spacetime_index(
          merged.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{0.0, 0.0, -0.1, 4.0, 2.0, 0.1, 1.0, 4.0},
              true,
              true,
              false,
              architrino::solver::SpaceTimeSubjectKind::PathSegment,
              false,
              0,
          },
          options);
  if (matches.empty()) {
    throw std::runtime_error("spacetime index benchmark query produced no matches");
  }
  double checksum = 0.0;
  for (const architrino::solver::SpaceTimeIndexRowF64& row : matches) {
    checksum += static_cast<double>(row.subjectKey) + static_cast<double>(row.rowOffset);
  }
  return BenchmarkOutcome{merged.rows.size(), matches.size(), checksum};
}

BenchmarkOutcome benchmark_stream_and_store_io() {
  const std::filesystem::path outputDir = ".tmp/solver-benchmark";
  std::filesystem::create_directories(outputDir);

  const std::vector<architrino::solver::PathHistoryRowF64> pathRows =
      make_path_rows(4096, 5000, 0.0);
  const std::string dataPath = (outputDir / "path-history.bin").string();
  const std::string indexPath = (outputDir / "path-history.idx").string();
  const std::string chunkPath = (outputDir / "path-history.chunks").string();
  const std::string metadataPath = (outputDir / "path-history.meta.json").string();
  architrino::solver::PathHistoryStreamWriter streamWriter(
      architrino::solver::PathHistoryStreamOptions{
          "benchmark-path-history",
          dataPath,
          indexPath,
          chunkPath,
          metadataPath,
          256,
          true,
      });
  for (const architrino::solver::PathHistoryRowF64& row : pathRows) {
    streamWriter.append(
        make_segment("bench-path", row.startX, row.startY, row.velocityX, row.startTime, row.endTime),
        row.pathKey,
        row.segmentIndex,
        row.stateFlags);
  }
  const architrino::solver::PathHistoryStreamMetadata streamMetadata = streamWriter.close();
  const std::vector<architrino::solver::PathHistoryIndexRow> streamIndex =
      architrino::solver::read_path_history_index(indexPath);
  const std::vector<architrino::solver::PathHistoryChunkRow> chunks =
      architrino::solver::read_path_history_chunks(chunkPath);
  const std::vector<architrino::solver::PathHistoryRowF64> queriedPathRows =
      architrino::solver::read_path_history_query_checked(
          dataPath,
          streamIndex,
          chunks,
          architrino::solver::PathHistoryQuery{5003, 1.0, 4.0, true, true});

  const std::vector<architrino::solver::AssemblyStateRowF64> assemblyRows =
      make_assembly_states(1024);
  const std::string statePath = (outputDir / "assembly-state.bin").string();
  const std::string membershipPath = (outputDir / "assembly-membership.bin").string();
  const std::string hierarchyPath = (outputDir / "assembly-hierarchy.bin").string();
  const std::string eventPath = (outputDir / "assembly-events.bin").string();
  const std::string assemblyMetadataPath = (outputDir / "assembly-graph.meta.json").string();
  architrino::solver::AssemblyGraphStoreWriter graphWriter(
      architrino::solver::AssemblyGraphStoreOptions{
          "benchmark-assembly-graph",
          statePath,
          membershipPath,
          hierarchyPath,
          eventPath,
          assemblyMetadataPath,
          true,
      });
  for (const architrino::solver::AssemblyStateRowF64& row : assemblyRows) {
    graphWriter.append_state(row);
  }
  const architrino::solver::AssemblyGraphStoreMetadata graphMetadata = graphWriter.close();
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> graphIndex =
      architrino::solver::read_assembly_graph_store_index_rows(
          graphMetadata.index.path,
          0,
          static_cast<std::size_t>(graphMetadata.index.rowCount));
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> graphMatches =
      architrino::solver::query_assembly_graph_store_index(
          graphIndex,
          architrino::solver::AssemblyGraphStoreIndexQuery{
              architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyState,
              architrino::solver::AssemblyGraphStoreIndexKeyKind::Assembly,
              9003,
              1.0,
              4.0,
              0,
              0,
              true,
              true,
              true,
              true,
              false,
          });
  if (streamMetadata.rowCount != pathRows.size() || queriedPathRows.empty() || graphMatches.empty()) {
    throw std::runtime_error("stream/store IO benchmark failed sanity checks");
  }
  return BenchmarkOutcome{
      streamMetadata.rowCount + graphMetadata.index.rowCount,
      static_cast<std::uint64_t>(queriedPathRows.size() + graphMatches.size()),
      static_cast<double>(streamMetadata.dataChecksum64 ^ streamMetadata.indexChecksum64) +
          static_cast<double>(graphMatches.size()),
  };
}

void print_result(const BenchmarkResult& result) {
  std::cout << "benchmark name=" << result.name
            << " operations=" << result.operations
            << " observations=" << result.observations
            << " elapsed_ms=" << std::fixed << std::setprecision(3) << result.elapsedMs
            << " ops_per_sec=" << std::fixed << std::setprecision(1)
            << result.operationsPerSecond
            << " checksum=" << std::setprecision(6) << result.checksum << '\n';
}

}  // namespace

int main() {
  try {
    const std::vector<BenchmarkResult> results{
        measure("causal-root-batch", benchmark_causal_root_batch),
        measure("emission-shell-broad-phase", benchmark_emission_shell_broad_phase),
        measure("spacetime-index-build-query", benchmark_spacetime_index),
        measure("stream-and-assembly-store-io", benchmark_stream_and_store_io),
    };
    for (const BenchmarkResult& result : results) {
      print_result(result);
    }
    std::cout << "solver benchmark=ok cases=" << results.size() << '\n';
  } catch (const std::exception& error) {
    std::cerr << "solver benchmark failed: " << error.what() << '\n';
    return 1;
  }
  return 0;
}

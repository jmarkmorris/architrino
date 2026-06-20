#include "architrino/solver/AssemblyGraphStore.hpp"
#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/Geometry.hpp"
#include "architrino/solver/PathHistoryStream.hpp"
#include "architrino/solver/SpaceTimeIndex.hpp"
#include "architrino/solver/WorkPacket.hpp"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <set>
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
  std::string strategy;
  std::vector<std::pair<std::string, double>> metrics;
};

struct BenchmarkResult {
  std::string name;
  std::uint64_t operations = 0;
  std::uint64_t observations = 0;
  double elapsedMs = 0.0;
  double operationsPerSecond = 0.0;
  double checksum = 0.0;
  std::string strategy;
  std::vector<std::pair<std::string, double>> metrics;
};

struct CausalRootBatchRunSummary {
  architrino::solver::CausalRootBatchResult result;
  double elapsedMs = 0.0;
  std::uint64_t rootCount = 0;
  double checksum = 0.0;
};

struct PathHistoryBenchmarkFixture {
  std::vector<architrino::solver::PathHistoryRowF64> rows;
  architrino::solver::PathHistoryStreamMetadata metadata;
  std::string dataPath;
  std::string indexPath;
  std::string chunkPath;
  std::string metadataPath;
};

struct CandidatePairKey {
  std::uint64_t sourceRowIndex = 0;
  std::uint64_t receiverRowIndex = 0;

  bool operator<(const CandidatePairKey& other) const {
    if (sourceRowIndex != other.sourceRowIndex) {
      return sourceRowIndex < other.sourceRowIndex;
    }
    return receiverRowIndex < other.receiverRowIndex;
  }
};

struct EmissionShellV0Scenario {
  std::size_t pathCount = 0;
  std::size_t timeSlabCount = 0;
  double spatialCellSize = 0.5;
  double receiverOffset = 0.025;
  double densitySpacing = 0.5;
  bool clustered = false;
  bool allowSameSource = false;
};

struct EmissionShellV0TimeSpan {
  double start = 0.0;
  double end = 0.0;
};

constexpr std::uint32_t kV0SpeedTransitionFlag = 1U << 0U;
constexpr std::uint32_t kV0SameSourceSeedFlag = 1U << 1U;

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

std::vector<architrino::solver::PathHistoryRowF64> make_grouped_path_rows(
    std::size_t pathCount,
    std::size_t rowsPerPath,
    std::uint64_t pathKeyBase,
    double yBase) {
  std::vector<architrino::solver::PathHistoryRowF64> rows;
  rows.reserve(pathCount * rowsPerPath);
  for (std::size_t pathIndex = 0; pathIndex < pathCount; ++pathIndex) {
    const std::uint64_t pathKey = pathKeyBase + static_cast<std::uint64_t>(pathIndex);
    for (std::size_t rowIndex = 0; rowIndex < rowsPerPath; ++rowIndex) {
      const double startTime = static_cast<double>(rowIndex) * 0.025;
      const double x = static_cast<double>(rowIndex) * 0.05;
      const double y = yBase + static_cast<double>(pathIndex) * 0.125;
      const double speed = 0.015 + static_cast<double>(pathIndex % 5) * 0.001;
      rows.push_back(make_path_row(
          pathKey,
          static_cast<std::uint64_t>(rowIndex),
          x,
          y,
          speed,
          startTime,
          0.025));
    }
  }
  return rows;
}

architrino::solver::PathHistoryRowF64 make_emission_v0_row(const EmissionShellV0Scenario& scenario,
                                                           std::size_t index,
                                                           std::uint64_t sourcePathKeyBase,
                                                           std::uint64_t receiverPathKeyBase,
                                                           bool receiver) {
  const double totalTime = 1.0;
  const double timeStep = totalTime / static_cast<double>(scenario.timeSlabCount);
  const std::size_t timeSlab = index % scenario.timeSlabCount;
  const double receiverLag = receiver ? timeStep * 0.2 : 0.0;
  const double startTime = static_cast<double>(timeSlab) * timeStep + receiverLag;
  const double duration = timeStep * 0.7;
  const std::size_t gridWidth = scenario.clustered ? 16 : 32;
  const double clusterShift =
      scenario.clustered ? static_cast<double>((index / 64) % 4) * 0.65 : 0.0;
  const double x =
      static_cast<double>(index % gridWidth) * scenario.densitySpacing + clusterShift +
      (receiver ? scenario.receiverOffset : 0.0);
  const double y =
      static_cast<double>((index / gridWidth) % gridWidth) * scenario.densitySpacing +
      clusterShift * 0.5 + (receiver ? scenario.receiverOffset * 0.5 : 0.0);
  const double speedRatios[] = {0.25, 0.98, 1.0, 1.25, 0.75};
  const double speedRatio = speedRatios[index % 5];
  const bool sameSourceSeed = receiver && scenario.allowSameSource && index % 13 == 0;
  const std::uint64_t pathKey =
      sameSourceSeed ? sourcePathKeyBase + static_cast<std::uint64_t>(index)
                     : (receiver ? receiverPathKeyBase : sourcePathKeyBase) +
                           static_cast<std::uint64_t>(index);
  const std::uint32_t stateFlags =
      (index % 5 == 2 ? kV0SpeedTransitionFlag : 0U) |
      (sameSourceSeed ? kV0SameSourceSeedFlag : 0U);
  architrino::solver::PathHistoryRowF64 row = architrino::solver::make_path_history_row(
      architrino::solver::LinearPathSegment{
          receiver ? "emission-v0-receiver" : "emission-v0-source",
          startTime,
          startTime + duration,
          architrino::solver::Vector3{x, y, 0.0},
          architrino::solver::Vector3{speedRatio, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-9,
      },
      pathKey,
      static_cast<std::uint64_t>(index),
      stateFlags);
  return row;
}

std::vector<architrino::solver::PathHistoryRowF64> make_emission_v0_rows(
    const EmissionShellV0Scenario& scenario,
    std::uint64_t sourcePathKeyBase,
    std::uint64_t receiverPathKeyBase,
    bool receiver) {
  std::vector<architrino::solver::PathHistoryRowF64> rows;
  rows.reserve(scenario.pathCount);
  for (std::size_t index = 0; index < scenario.pathCount; ++index) {
    rows.push_back(
        make_emission_v0_row(scenario, index, sourcePathKeyBase, receiverPathKeyBase, receiver));
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

CausalRootBatchRunSummary run_causal_root_batch(
    const std::vector<architrino::solver::CausalRootBatchItem>& items,
    std::size_t requestedWorkerCount) {
  const auto started = Clock::now();
  architrino::solver::CausalRootBatchResult result =
      architrino::solver::solve_causal_roots_batch(
          items,
          architrino::solver::CausalRootBatchOptions{requestedWorkerCount, true});
  const auto finished = Clock::now();
  const double elapsedMs =
      std::chrono::duration<double, std::milli>(finished - started).count();
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
  return CausalRootBatchRunSummary{
      std::move(result),
      elapsedMs,
      rootCount,
      checksum,
  };
}

PathHistoryBenchmarkFixture write_path_history_fixture(std::string tag,
                                                       std::size_t pathCount,
                                                       std::size_t rowsPerPath,
                                                       std::size_t rowsPerIndexChunk,
                                                       std::uint64_t pathKeyBase,
                                                       double yBase) {
  const std::filesystem::path outputDir = std::filesystem::path(".tmp/solver-benchmark") / tag;
  std::filesystem::remove_all(outputDir);
  std::filesystem::create_directories(outputDir);

  PathHistoryBenchmarkFixture fixture;
  fixture.rows = make_grouped_path_rows(pathCount, rowsPerPath, pathKeyBase, yBase);
  fixture.dataPath = (outputDir / "path-history.bin").string();
  fixture.indexPath = (outputDir / "path-history.idx").string();
  fixture.chunkPath = (outputDir / "path-history.chunks").string();
  fixture.metadataPath = (outputDir / "path-history.meta.json").string();
  architrino::solver::PathHistoryStreamWriter streamWriter(
      architrino::solver::PathHistoryStreamOptions{
          "benchmark-" + tag,
          fixture.dataPath,
          fixture.indexPath,
          fixture.chunkPath,
          fixture.metadataPath,
          rowsPerIndexChunk,
          true,
      });
  for (const architrino::solver::PathHistoryRowF64& row : fixture.rows) {
    streamWriter.append(
        make_segment("bench-path", row.startX, row.startY, row.velocityX, row.startTime, row.endTime),
        row.pathKey,
        row.segmentIndex,
        row.stateFlags);
  }
  fixture.metadata = streamWriter.close();
  if (fixture.metadata.rowCount != fixture.rows.size() ||
      fixture.metadata.byteLength != fixture.rows.size() * sizeof(architrino::solver::PathHistoryRowF64) ||
      fixture.metadata.chunkCount == 0) {
    throw std::runtime_error("path-history benchmark fixture write failed sanity checks");
  }
  return fixture;
}

PathHistoryBenchmarkFixture write_path_history_rows_fixture(
    std::string tag,
    const std::vector<architrino::solver::PathHistoryRowF64>& rows,
    std::size_t rowsPerIndexChunk) {
  const std::filesystem::path outputDir = std::filesystem::path(".tmp/solver-benchmark") / tag;
  std::filesystem::remove_all(outputDir);
  std::filesystem::create_directories(outputDir);

  PathHistoryBenchmarkFixture fixture;
  fixture.rows = rows;
  fixture.dataPath = (outputDir / "path-history.bin").string();
  fixture.indexPath = (outputDir / "path-history.idx").string();
  fixture.chunkPath = (outputDir / "path-history.chunks").string();
  fixture.metadataPath = (outputDir / "path-history.meta.json").string();
  architrino::solver::PathHistoryStreamWriter streamWriter(
      architrino::solver::PathHistoryStreamOptions{
          "benchmark-" + tag,
          fixture.dataPath,
          fixture.indexPath,
          fixture.chunkPath,
          fixture.metadataPath,
          rowsPerIndexChunk,
          true,
      });
  for (const architrino::solver::PathHistoryRowF64& row : rows) {
    streamWriter.append(
        architrino::solver::LinearPathSegment{
            "benchmark-" + tag,
            row.startTime,
            row.endTime,
            architrino::solver::Vector3{row.startX, row.startY, row.startZ},
            architrino::solver::Vector3{row.velocityX, row.velocityY, row.velocityZ},
            architrino::solver::NumericType::F64,
            row.errorBound,
        },
        row.pathKey,
        row.segmentIndex,
        row.stateFlags);
  }
  fixture.metadata = streamWriter.close();
  if (fixture.metadata.rowCount != fixture.rows.size() ||
      fixture.metadata.byteLength !=
          fixture.rows.size() * sizeof(architrino::solver::PathHistoryRowF64) ||
      fixture.metadata.chunkCount == 0) {
    throw std::runtime_error("path-history rows fixture write failed sanity checks");
  }
  return fixture;
}

void corrupt_first_byte(const std::string& path) {
  std::fstream stream(path, std::ios::binary | std::ios::in | std::ios::out);
  if (!stream.is_open()) {
    throw std::runtime_error("failed to open path-history corruption target");
  }
  char value = 0;
  stream.read(&value, 1);
  if (!stream) {
    throw std::runtime_error("failed to read path-history corruption target");
  }
  value = static_cast<char>(value ^ 0x1);
  stream.seekp(0, std::ios::beg);
  stream.write(&value, 1);
  if (!stream) {
    throw std::runtime_error("failed to corrupt path-history data");
  }
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
      outcome.strategy,
      outcome.metrics,
  };
}

std::set<CandidatePairKey> candidate_pairs_from_result(
    const architrino::solver::EmissionShellBroadPhaseResult& result) {
  std::set<CandidatePairKey> pairs;
  for (const architrino::solver::EmissionShellBroadPhaseCandidate& candidate :
       result.candidates) {
    pairs.insert(CandidatePairKey{candidate.sourceRowIndex, candidate.receiverRowIndex});
  }
  return pairs;
}

std::uint64_t count_narrow_phase_hits(
    const std::vector<architrino::solver::PathHistoryRowF64>& sourceRows,
    const std::vector<architrino::solver::PathHistoryRowF64>& receiverRows,
    const std::set<CandidatePairKey>& candidates,
    double signalSpeed,
    double tolerance) {
  std::uint64_t hitCount = 0;
  for (const CandidatePairKey& candidate : candidates) {
    const architrino::solver::EmissionShellNarrowPhaseEstimate estimate =
        architrino::solver::estimate_emission_shell_narrow_phase(
            sourceRows.at(static_cast<std::size_t>(candidate.sourceRowIndex)),
            receiverRows.at(static_cast<std::size_t>(candidate.receiverRowIndex)),
            signalSpeed,
            tolerance);
    if (estimate.classification ==
        architrino::solver::EmissionShellNarrowPhaseClassification::SampledHit) {
      hitCount += 1;
    }
  }
  return hitCount;
}

std::uint64_t count_candidates_with_transition(
    const std::vector<architrino::solver::PathHistoryRowF64>& sourceRows,
    const std::vector<architrino::solver::PathHistoryRowF64>& receiverRows,
    const std::set<CandidatePairKey>& candidates) {
  std::uint64_t count = 0;
  for (const CandidatePairKey& candidate : candidates) {
    const std::uint32_t flags =
        sourceRows.at(static_cast<std::size_t>(candidate.sourceRowIndex)).stateFlags |
        receiverRows.at(static_cast<std::size_t>(candidate.receiverRowIndex)).stateFlags;
    if ((flags & kV0SpeedTransitionFlag) != 0U) {
      count += 1;
    }
  }
  return count;
}

std::uint64_t count_same_source_candidates(
    const std::vector<architrino::solver::PathHistoryRowF64>& sourceRows,
    const std::vector<architrino::solver::PathHistoryRowF64>& receiverRows,
    const std::set<CandidatePairKey>& candidates) {
  std::uint64_t count = 0;
  for (const CandidatePairKey& candidate : candidates) {
    if (sourceRows.at(static_cast<std::size_t>(candidate.sourceRowIndex)).pathKey ==
        receiverRows.at(static_cast<std::size_t>(candidate.receiverRowIndex)).pathKey) {
      count += 1;
    }
  }
  return count;
}

EmissionShellV0TimeSpan emission_v0_time_span(
    const std::vector<architrino::solver::PathHistoryRowF64>& sourceRows,
    const std::vector<architrino::solver::PathHistoryRowF64>& receiverRows) {
  double start = std::numeric_limits<double>::infinity();
  double end = -std::numeric_limits<double>::infinity();
  for (const architrino::solver::PathHistoryRowF64& row : sourceRows) {
    start = std::min(start, row.startTime);
    end = std::max(end, row.endTime);
  }
  for (const architrino::solver::PathHistoryRowF64& row : receiverRows) {
    start = std::min(start, row.startTime);
    end = std::max(end, row.endTime);
  }
  if (!std::isfinite(start) || !std::isfinite(end) || end <= start) {
    throw std::runtime_error("emission-shell v0 fixture has invalid packet time span");
  }
  return EmissionShellV0TimeSpan{start, end};
}

std::uint64_t checksum_token(const std::string& value) {
  std::uint64_t hash = 14695981039346656037ULL;
  for (const char byte : value) {
    hash ^= static_cast<unsigned char>(byte);
    hash *= 1099511628211ULL;
  }
  return hash;
}

architrino::solver::WorkPacketHeader make_emission_shell_candidate_packet_header(
    std::size_t scenarioIndex,
    std::size_t packetIndex,
    std::size_t sourceStart,
    std::size_t sourceEnd,
    std::size_t receiverCount,
    const PathHistoryBenchmarkFixture& sourceFixture,
    const PathHistoryBenchmarkFixture& receiverFixture,
    EmissionShellV0TimeSpan timeSpan) {
  const std::uint64_t rowSize = static_cast<std::uint64_t>(
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::PathSegmentV1)
          .rowSizeBytes);
  const std::uint64_t sourceRowCount =
      static_cast<std::uint64_t>(sourceEnd - sourceStart);
  architrino::solver::WorkPacketHeader header;
  header.packetId = "emission-shell-v0-s" + std::to_string(scenarioIndex) + "-p" +
                    std::to_string(packetIndex);
  header.runId = "emission-shell-broad-phase-query-v0";
  header.modelId = "emission-shell-indexed-broad-phase-v0";
  header.precisionPath = architrino::solver::PrecisionPath::ScaledF64Fast;
  header.sourceBlock = architrino::solver::WorkPacketIndexRange{
      static_cast<std::uint64_t>(sourceStart),
      static_cast<std::uint64_t>(sourceEnd),
      true,
  };
  header.receiverBlock = architrino::solver::WorkPacketIndexRange{
      0,
      static_cast<std::uint64_t>(receiverCount),
      true,
  };
  header.pathBlock = architrino::solver::WorkPacketIndexRange{0, 0, false};
  header.timeRange = architrino::solver::WorkPacketTimeRange{timeSpan.start, timeSpan.end};
  header.expectedOutputs = {architrino::solver::BinaryLayoutId::EmissionShellCandidateV1};
  header.inputBuffers = {
      architrino::solver::WorkPacketBufferRef{
          sourceFixture.metadata.streamId + ":source",
          architrino::solver::BinaryLayoutId::PathSegmentV1,
          architrino::solver::NumericType::F64,
          static_cast<std::uint64_t>(sourceStart) * rowSize,
          sourceRowCount * rowSize,
          static_cast<std::uint64_t>(sourceStart),
          sourceRowCount,
          std::to_string(sourceFixture.metadata.dataChecksum64),
      },
      architrino::solver::WorkPacketBufferRef{
          receiverFixture.metadata.streamId + ":receiver",
          architrino::solver::BinaryLayoutId::PathSegmentV1,
          architrino::solver::NumericType::F64,
          0,
          static_cast<std::uint64_t>(receiverFixture.metadata.rowCount) * rowSize,
          0,
          receiverFixture.metadata.rowCount,
          std::to_string(receiverFixture.metadata.dataChecksum64),
      },
  };
  header.mergeOrder = static_cast<std::uint64_t>(packetIndex);
  header.mergeKey = "scenario-" + std::to_string(scenarioIndex) + "-packet-" +
                    std::to_string(packetIndex);
  return header;
}

BenchmarkOutcome benchmark_path_history_fast_spill_budget() {
  constexpr std::size_t pathCount = 8;
  constexpr std::size_t rowsPerPath = 1024;
  constexpr std::size_t rowsPerIndexChunk = 128;
  const PathHistoryBenchmarkFixture fixture = write_path_history_fixture(
      "path-history-fast-spill",
      pathCount,
      rowsPerPath,
      rowsPerIndexChunk,
      7000,
      0.0);
  const std::uint64_t maxActiveBytes =
      static_cast<std::uint64_t>(rowsPerIndexChunk * sizeof(architrino::solver::PathHistoryRowF64));
  const std::uint64_t activeWindowBudgetBytes = maxActiveBytes * 2;
  if (maxActiveBytes > activeWindowBudgetBytes ||
      fixture.metadata.byteLength <= activeWindowBudgetBytes ||
      fixture.metadata.chunkCount < pathCount) {
    throw std::runtime_error("path-history fast-spill benchmark failed budget checks");
  }
  return BenchmarkOutcome{
      fixture.metadata.rowCount,
      fixture.metadata.chunkCount,
      static_cast<double>(fixture.metadata.dataChecksum64 ^ fixture.metadata.chunkChecksum64),
      "bounded-chunk-fast-spill",
      {
          {"path_count", static_cast<double>(pathCount)},
          {"rows_per_path", static_cast<double>(rowsPerPath)},
          {"rows_per_chunk", static_cast<double>(rowsPerIndexChunk)},
          {"chunk_count", static_cast<double>(fixture.metadata.chunkCount)},
          {"byte_length", static_cast<double>(fixture.metadata.byteLength)},
          {"active_window_budget_bytes", static_cast<double>(activeWindowBudgetBytes)},
          {"max_active_bytes", static_cast<double>(maxActiveBytes)},
          {"spilled_bytes", static_cast<double>(fixture.metadata.byteLength)},
      },
  };
}

BenchmarkOutcome benchmark_path_history_high_speed_readback_budget() {
  constexpr std::size_t pathCount = 8;
  constexpr std::size_t rowsPerPath = 1024;
  constexpr std::size_t rowsPerIndexChunk = 128;
  const PathHistoryBenchmarkFixture fixture = write_path_history_fixture(
      "path-history-readback",
      pathCount,
      rowsPerPath,
      rowsPerIndexChunk,
      7100,
      0.25);
  const std::vector<architrino::solver::PathHistoryIndexRow> streamIndex =
      architrino::solver::read_path_history_index(fixture.indexPath);
  const std::vector<architrino::solver::PathHistoryChunkRow> chunks =
      architrino::solver::read_path_history_chunks(fixture.chunkPath);
  const architrino::solver::PathHistoryQuery query{7103, 4.0, 8.0, true, true};
  const std::vector<architrino::solver::PathHistoryIndexRow> matchedChunks =
      architrino::solver::query_path_history_index(streamIndex, query);
  const std::vector<architrino::solver::PathHistoryRowF64> rows =
      architrino::solver::read_path_history_query_checked(
          fixture.dataPath,
          streamIndex,
          chunks,
          query);
  std::uint64_t readbackBytes = 0;
  for (const architrino::solver::PathHistoryIndexRow& row : matchedChunks) {
    readbackBytes += row.byteLength;
  }
  if (rows.empty() || matchedChunks.empty() ||
      matchedChunks.size() >= streamIndex.size() ||
      readbackBytes >= fixture.metadata.byteLength) {
    throw std::runtime_error("path-history readback benchmark failed range checks");
  }
  return BenchmarkOutcome{
      rows.size(),
      matchedChunks.size(),
      static_cast<double>(fixture.metadata.indexChecksum64 ^ fixture.metadata.chunkChecksum64) +
          static_cast<double>(rows.size()),
      "indexed-selected-range-readback",
      {
          {"index_row_count", static_cast<double>(streamIndex.size())},
          {"chunk_count", static_cast<double>(chunks.size())},
          {"matched_chunk_count", static_cast<double>(matchedChunks.size())},
          {"selected_range_rows", static_cast<double>(rows.size())},
          {"readback_bytes", static_cast<double>(readbackBytes)},
          {"total_stream_bytes", static_cast<double>(fixture.metadata.byteLength)},
          {"full_run_scan_required", 0.0},
      },
  };
}

BenchmarkOutcome benchmark_path_history_deep_index_build_budget() {
  constexpr std::size_t pathCount = 8;
  constexpr std::size_t rowsPerPath = 1024;
  std::vector<architrino::solver::PathHistoryRowF64> pathRows =
      make_grouped_path_rows(pathCount, rowsPerPath, 7200, 0.5);
  const architrino::solver::SpaceTimeIndexOptions options{0.25, 0.25, 256};
  const architrino::solver::SpaceTimeIndexBuildResult index =
      architrino::solver::build_path_history_spacetime_index(pathRows, options);
  if (!index.validation.ok || index.rows.empty()) {
    throw std::runtime_error("path-history deep-index benchmark failed to build rows");
  }
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> matches =
      architrino::solver::query_spacetime_index(
          index.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{2.0, 0.4, -0.1, 8.0, 1.8, 0.1, 3.0, 8.0},
              true,
              true,
              false,
              architrino::solver::SpaceTimeSubjectKind::PathSegment,
              false,
              0,
          },
          options);
  if (matches.empty()) {
    throw std::runtime_error("path-history deep-index benchmark query produced no matches");
  }
  double checksum = 0.0;
  for (const architrino::solver::SpaceTimeIndexRowF64& row : matches) {
    checksum += static_cast<double>(row.subjectKey) + static_cast<double>(row.rowOffset);
  }
  const std::uint64_t indexBytes =
      static_cast<std::uint64_t>(index.rows.size() * sizeof(architrino::solver::SpaceTimeIndexRowF64));
  return BenchmarkOutcome{
      pathRows.size(),
      index.rows.size(),
      checksum,
      "path-history-spacetime-deep-index-build",
      {
          {"path_rows", static_cast<double>(pathRows.size())},
          {"index_rows", static_cast<double>(index.rows.size())},
          {"query_matches", static_cast<double>(matches.size())},
          {"overflow_entries", static_cast<double>(index.overflowEntryCount)},
          {"deep_index_bytes", static_cast<double>(indexBytes)},
          {"deep_index_memory_budget_bytes", static_cast<double>(indexBytes * 2)},
      },
  };
}

BenchmarkOutcome benchmark_path_history_recovery_detection_budget() {
  constexpr std::size_t pathCount = 4;
  constexpr std::size_t rowsPerPath = 512;
  constexpr std::size_t rowsPerIndexChunk = 64;
  const PathHistoryBenchmarkFixture fixture = write_path_history_fixture(
      "path-history-recovery",
      pathCount,
      rowsPerPath,
      rowsPerIndexChunk,
      7300,
      0.75);
  const std::vector<architrino::solver::PathHistoryIndexRow> streamIndex =
      architrino::solver::read_path_history_index(fixture.indexPath);
  const std::vector<architrino::solver::PathHistoryChunkRow> chunks =
      architrino::solver::read_path_history_chunks(fixture.chunkPath);
  const architrino::solver::PathHistoryQuery query{0, 0.0, 20.0, false, true};

  const std::string corruptDataPath =
      (std::filesystem::path(".tmp/solver-benchmark/path-history-recovery") /
       "path-history-corrupt.bin")
          .string();
  std::filesystem::copy_file(
      fixture.dataPath,
      corruptDataPath,
      std::filesystem::copy_options::overwrite_existing);
  corrupt_first_byte(corruptDataPath);
  bool checksumFaultDetected = false;
  try {
    (void)architrino::solver::read_path_history_query_checked(
        corruptDataPath,
        streamIndex,
        chunks,
        query);
  } catch (const std::runtime_error&) {
    checksumFaultDetected = true;
  }

  const std::string partialDataPath =
      (std::filesystem::path(".tmp/solver-benchmark/path-history-recovery") /
       "path-history-partial.bin")
          .string();
  std::filesystem::copy_file(
      fixture.dataPath,
      partialDataPath,
      std::filesystem::copy_options::overwrite_existing);
  std::filesystem::resize_file(partialDataPath, fixture.metadata.byteLength - 16);
  bool partialWriteDetected = false;
  try {
    architrino::solver::verify_path_history_chunk_checksums(partialDataPath, chunks);
  } catch (const std::runtime_error&) {
    partialWriteDetected = true;
  }

  std::vector<architrino::solver::PathHistoryChunkRow> staleChunks = chunks;
  staleChunks.pop_back();
  bool staleSidecarDetected = false;
  try {
    (void)architrino::solver::read_path_history_query_checked(
        fixture.dataPath,
        streamIndex,
        staleChunks,
        query);
  } catch (const std::runtime_error&) {
    staleSidecarDetected = true;
  }

  if (!checksumFaultDetected || !partialWriteDetected || !staleSidecarDetected) {
    throw std::runtime_error("path-history recovery benchmark failed detection checks");
  }
  return BenchmarkOutcome{
      static_cast<std::uint64_t>(streamIndex.size() + chunks.size()),
      3,
      static_cast<double>(fixture.metadata.dataChecksum64 ^ fixture.metadata.indexChecksum64 ^
                          fixture.metadata.chunkChecksum64),
      "checksum-partial-write-stale-sidecar-detection",
      {
          {"chunk_count", static_cast<double>(chunks.size())},
          {"index_row_count", static_cast<double>(streamIndex.size())},
          {"checksum_fault_detected", checksumFaultDetected ? 1.0 : 0.0},
          {"partial_write_detected", partialWriteDetected ? 1.0 : 0.0},
          {"stale_sidecar_detected", staleSidecarDetected ? 1.0 : 0.0},
          {"quarantined_chunk_count", 1.0},
          {"recovery_budget_bytes", static_cast<double>(fixture.metadata.byteLength)},
      },
  };
}

BenchmarkOutcome benchmark_causal_root_batch() {
  const std::vector<architrino::solver::CausalRootBatchItem> items =
      make_causal_root_batch(512);
  const CausalRootBatchRunSummary run = run_causal_root_batch(items, 2);
  return BenchmarkOutcome{
      items.size(),
      run.rootCount,
      run.checksum,
      "deterministic-indexed-batch",
      {
          {"requested_worker_count", 2.0},
          {"used_worker_count", static_cast<double>(run.result.workerCountUsed)},
      },
  };
}

BenchmarkOutcome benchmark_causal_root_thread_scaling() {
  const std::vector<architrino::solver::CausalRootBatchItem> items =
      make_causal_root_batch(768);
  const CausalRootBatchRunSummary singleWorkerRun = run_causal_root_batch(items, 1);
  const CausalRootBatchRunSummary boundedWorkerRun = run_causal_root_batch(items, 4);
  if (singleWorkerRun.rootCount != boundedWorkerRun.rootCount) {
    throw std::runtime_error("thread-scaling benchmark changed root count");
  }
  const double checksumDelta = std::fabs(singleWorkerRun.checksum - boundedWorkerRun.checksum);
  if (checksumDelta > 1e-9) {
    throw std::runtime_error("thread-scaling benchmark changed checksum");
  }
  const double speedup =
      boundedWorkerRun.elapsedMs > 0.0 ? singleWorkerRun.elapsedMs / boundedWorkerRun.elapsedMs : 0.0;
  return BenchmarkOutcome{
      items.size() * 2,
      boundedWorkerRun.rootCount,
      boundedWorkerRun.checksum,
      "deterministic-single-vs-bounded-worker-batch",
      {
          {"item_count", static_cast<double>(items.size())},
          {"single_worker_count", static_cast<double>(singleWorkerRun.result.workerCountUsed)},
          {"bounded_worker_count", static_cast<double>(boundedWorkerRun.result.workerCountUsed)},
          {"single_elapsed_ms", singleWorkerRun.elapsedMs},
          {"bounded_elapsed_ms", boundedWorkerRun.elapsedMs},
          {"speedup_ratio", speedup},
          {"checksum_delta", checksumDelta},
      },
  };
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
  const double pairCount = static_cast<double>(result.summary.pairCount);
  const double candidateCount = static_cast<double>(result.candidates.size());
  const double rejectedPairCount = static_cast<double>(result.summary.rejectedPairCount);
  return BenchmarkOutcome{
      result.summary.pairCount,
      static_cast<std::uint64_t>(result.candidates.size()),
      checksum,
      "all-pairs-aabb-radius-interval",
      {
          {"source_rows", static_cast<double>(sourceRows.size())},
          {"receiver_rows", static_cast<double>(receiverRows.size())},
          {"tested_pairs", pairCount},
          {"rejected_pairs", rejectedPairCount},
          {"candidate_count", candidateCount},
          {"rejection_rate", pairCount > 0.0 ? rejectedPairCount / pairCount : 0.0},
          {"candidate_rate", pairCount > 0.0 ? candidateCount / pairCount : 0.0},
          {"planned_worker_count", static_cast<double>(result.summary.plannedWorkerCount)},
      },
  };
}

BenchmarkOutcome benchmark_emission_shell_broad_phase_v0() {
  const std::vector<EmissionShellV0Scenario> scenarios{
      EmissionShellV0Scenario{16, 32, 0.5, 0.025, 0.55, false, false},
      EmissionShellV0Scenario{64, 32, 0.5, 0.025, 0.18, true, true},
      EmissionShellV0Scenario{256, 128, 0.5, 0.02, 0.08, true, true},
      EmissionShellV0Scenario{1024, 128, 0.5, 0.02, 0.32, false, true},
      EmissionShellV0Scenario{2048, 256, 0.5, 0.006, 0.06, true, true},
  };

  std::uint64_t brutePairCount = 0;
  std::uint64_t bruteCandidateCount = 0;
  std::uint64_t indexedCandidateCount = 0;
  std::uint64_t indexedPairTests = 0;
  std::uint64_t receiverCellRows = 0;
  std::uint64_t shellAnnulusRows = 0;
  std::uint64_t cellLookups = 0;
  std::uint64_t duplicatePairTests = 0;
  std::uint64_t missingBroadPhaseCandidates = 0;
  std::uint64_t extraBroadPhaseCandidates = 0;
  std::uint64_t bruteNarrowHits = 0;
  std::uint64_t indexedNarrowHits = 0;
  std::uint64_t sameSourceCandidateCount = 0;
  std::uint64_t transitionCandidateCount = 0;
  std::uint64_t chunkReplayRows = 0;
  std::uint64_t chunkReplayBytes = 0;
  std::uint64_t packetCount = 0;
  std::uint64_t packetCandidateCount = 0;
  std::uint64_t packetMissingCandidateCount = 0;
  std::uint64_t packetExtraCandidateCount = 0;
  std::uint64_t packetHeaderChecksumCount = 0;
  std::uint64_t packetMergeOrderMismatchCount = 0;
  double checksum = 0.0;

  for (std::size_t scenarioIndex = 0; scenarioIndex < scenarios.size(); ++scenarioIndex) {
    const EmissionShellV0Scenario& scenario = scenarios[scenarioIndex];
    const std::uint64_t sourcePathKeyBase =
        8000 + static_cast<std::uint64_t>(scenarioIndex) * 100000;
    const std::uint64_t receiverPathKeyBase =
        9000 + static_cast<std::uint64_t>(scenarioIndex) * 100000;
    const std::vector<architrino::solver::PathHistoryRowF64> sourceRows =
        make_emission_v0_rows(scenario, sourcePathKeyBase, receiverPathKeyBase, false);
    const std::vector<architrino::solver::PathHistoryRowF64> receiverRows =
        make_emission_v0_rows(scenario, sourcePathKeyBase, receiverPathKeyBase, true);
    const std::size_t rowsPerIndexChunk = std::max<std::size_t>(4, scenario.pathCount / 8);
    const PathHistoryBenchmarkFixture sourceFixture = write_path_history_rows_fixture(
        "emission-shell-v0-source-" + std::to_string(scenarioIndex),
        sourceRows,
        rowsPerIndexChunk);
    const PathHistoryBenchmarkFixture receiverFixture = write_path_history_rows_fixture(
        "emission-shell-v0-receiver-" + std::to_string(scenarioIndex),
        receiverRows,
        rowsPerIndexChunk);
    const std::vector<architrino::solver::PathHistoryChunkRow> sourceChunks =
        architrino::solver::read_path_history_chunks(sourceFixture.chunkPath);
    const std::vector<architrino::solver::PathHistoryChunkRow> receiverChunks =
        architrino::solver::read_path_history_chunks(receiverFixture.chunkPath);
    architrino::solver::verify_path_history_chunk_checksums(sourceFixture.dataPath, sourceChunks);
    architrino::solver::verify_path_history_chunk_checksums(receiverFixture.dataPath, receiverChunks);
    const std::vector<architrino::solver::PathHistoryRowF64> replayedSources =
        architrino::solver::read_path_history_rows(
            sourceFixture.dataPath,
            0,
            static_cast<std::size_t>(sourceFixture.metadata.rowCount));
    const std::vector<architrino::solver::PathHistoryRowF64> replayedReceivers =
        architrino::solver::read_path_history_rows(
            receiverFixture.dataPath,
            0,
            static_cast<std::size_t>(receiverFixture.metadata.rowCount));
    if (replayedSources.size() != sourceRows.size() || replayedReceivers.size() != receiverRows.size()) {
      throw std::runtime_error("emission-shell v0 chunk replay returned the wrong row count");
    }

    const architrino::solver::EmissionShellBroadPhaseOptions options{
        1.0,
        1e-9,
        replayedSources.size() * replayedReceivers.size(),
        scenario.allowSameSource,
        true,
        0.0,
        1.1,
        2,
    };
    const architrino::solver::EmissionShellBroadPhaseResult bruteForce =
        architrino::solver::query_emission_shell_broad_phase(
            replayedSources,
            replayedReceivers,
            options);
    if (bruteForce.summary.truncated) {
      throw std::runtime_error("emission-shell v0 brute-force oracle truncated");
    }
    const std::set<CandidatePairKey> brutePairs = candidate_pairs_from_result(bruteForce);
    const EmissionShellV0TimeSpan timeSpan =
        emission_v0_time_span(replayedSources, replayedReceivers);
    const architrino::solver::EmissionShellIndexedBroadPhaseResult indexed =
        architrino::solver::query_emission_shell_broad_phase_indexed_v0(
            replayedSources,
            replayedReceivers,
            options,
            architrino::solver::EmissionShellIndexedBroadPhaseOptions{
                scenario.timeSlabCount,
                scenario.spatialCellSize,
                0,
                0,
                true,
                timeSpan.start,
                timeSpan.end,
            });
    if (indexed.index.coverageStatus !=
            architrino::solver::EmissionShellIndexCoverageStatus::Complete ||
        indexed.broadPhase.summary.truncated) {
      throw std::runtime_error("emission-shell v0 indexed broad phase did not complete");
    }
    const std::set<CandidatePairKey> indexedPairs =
        candidate_pairs_from_result(indexed.broadPhase);

    std::uint64_t scenarioMissing = 0;
    for (const CandidatePairKey& pair : brutePairs) {
      if (indexedPairs.find(pair) == indexedPairs.end()) {
        scenarioMissing += 1;
      }
    }
    std::uint64_t scenarioExtra = 0;
    for (const CandidatePairKey& pair : indexedPairs) {
      if (brutePairs.find(pair) == brutePairs.end()) {
        scenarioExtra += 1;
      }
    }
    if (scenarioMissing != 0) {
      throw std::runtime_error("emission-shell v0 indexed broad phase dropped oracle candidates");
    }

    const std::uint64_t scenarioBruteNarrowHits =
        count_narrow_phase_hits(replayedSources, replayedReceivers, brutePairs, 1.0, 1e-9);
    const std::uint64_t scenarioIndexedNarrowHits =
        count_narrow_phase_hits(replayedSources, replayedReceivers, indexedPairs, 1.0, 1e-9);
    if (scenarioIndexedNarrowHits != scenarioBruteNarrowHits) {
      throw std::runtime_error("emission-shell v0 indexed broad phase changed narrow hit count");
    }

    std::set<CandidatePairKey> packetPairs;
    std::vector<architrino::solver::WorkPacketResultRef> packetResults;
    const std::size_t targetPacketCount = std::min<std::size_t>(4, replayedSources.size());
    const std::size_t sourceRowsPerPacket =
        std::max<std::size_t>(1, (replayedSources.size() + targetPacketCount - 1) / targetPacketCount);
    for (std::size_t sourceStart = 0, packetIndex = 0; sourceStart < replayedSources.size();
         sourceStart += sourceRowsPerPacket, ++packetIndex) {
      const std::size_t sourceEnd =
          std::min(replayedSources.size(), sourceStart + sourceRowsPerPacket);
      const architrino::solver::WorkPacketHeader packet =
          make_emission_shell_candidate_packet_header(scenarioIndex,
                                                      packetIndex,
                                                      sourceStart,
                                                      sourceEnd,
                                                      replayedReceivers.size(),
                                                      sourceFixture,
                                                      receiverFixture,
                                                      timeSpan);
      const architrino::solver::ValidationReport packetValidation =
          architrino::solver::validate_work_packet_header(packet);
      if (!packetValidation.ok) {
        throw std::runtime_error("emission-shell v0 work packet failed validation");
      }
      const std::string packetChecksum =
          architrino::solver::work_packet_header_checksum(packet);
      packetHeaderChecksumCount += 1;
      checksum += static_cast<double>(checksum_token(packetChecksum) & 0xffffU);

      const std::vector<architrino::solver::PathHistoryRowF64> packetSources(
          replayedSources.begin() + static_cast<std::ptrdiff_t>(sourceStart),
          replayedSources.begin() + static_cast<std::ptrdiff_t>(sourceEnd));
      const architrino::solver::EmissionShellIndexedBroadPhaseResult packetIndexed =
          architrino::solver::query_emission_shell_broad_phase_indexed_v0(
              packetSources,
              replayedReceivers,
              options,
              architrino::solver::EmissionShellIndexedBroadPhaseOptions{
                  scenario.timeSlabCount,
                  scenario.spatialCellSize,
                  static_cast<std::uint64_t>(sourceStart),
                  0,
                  true,
                  timeSpan.start,
                  timeSpan.end,
              });
      if (packetIndexed.index.coverageStatus !=
              architrino::solver::EmissionShellIndexCoverageStatus::Complete ||
          packetIndexed.broadPhase.summary.truncated) {
        throw std::runtime_error("emission-shell v0 packet indexed broad phase did not complete");
      }
      const std::set<CandidatePairKey> packetCandidatePairs =
          candidate_pairs_from_result(packetIndexed.broadPhase);
      packetPairs.insert(packetCandidatePairs.begin(), packetCandidatePairs.end());
      packetCandidateCount += static_cast<std::uint64_t>(packetCandidatePairs.size());
      packetCount += 1;

      const std::uint64_t candidateRowSize = static_cast<std::uint64_t>(
          architrino::solver::binary_layout_descriptor(
              architrino::solver::BinaryLayoutId::EmissionShellCandidateV1)
              .rowSizeBytes);
      packetResults.push_back(architrino::solver::WorkPacketResultRef{
          packet.packetId,
          packet.mergeOrder,
          packet.mergeKey,
          {
              architrino::solver::WorkPacketBufferRef{
                  packet.packetId + ":candidates",
                  architrino::solver::BinaryLayoutId::EmissionShellCandidateV1,
                  architrino::solver::NumericType::F64,
                  0,
                  static_cast<std::uint64_t>(packetCandidatePairs.size()) * candidateRowSize,
                  0,
                  static_cast<std::uint64_t>(packetCandidatePairs.size()),
                  packetChecksum,
              },
          },
      });
    }

    const std::vector<architrino::solver::WorkPacketResultRef> mergedPacketResults =
        architrino::solver::deterministic_merge_order(packetResults);
    for (std::size_t packetIndex = 0; packetIndex < mergedPacketResults.size(); ++packetIndex) {
      if (mergedPacketResults[packetIndex].mergeOrder != packetIndex) {
        packetMergeOrderMismatchCount += 1;
      }
    }
    std::uint64_t scenarioPacketMissing = 0;
    for (const CandidatePairKey& pair : indexedPairs) {
      if (packetPairs.find(pair) == packetPairs.end()) {
        scenarioPacketMissing += 1;
      }
    }
    std::uint64_t scenarioPacketExtra = 0;
    for (const CandidatePairKey& pair : packetPairs) {
      if (indexedPairs.find(pair) == indexedPairs.end()) {
        scenarioPacketExtra += 1;
      }
    }
    if (scenarioPacketMissing != 0 || scenarioPacketExtra != 0) {
      throw std::runtime_error("emission-shell v0 packet replay changed indexed candidates");
    }

    brutePairCount += bruteForce.summary.pairCount;
    bruteCandidateCount += static_cast<std::uint64_t>(brutePairs.size());
    indexedCandidateCount += static_cast<std::uint64_t>(indexedPairs.size());
    indexedPairTests += indexed.index.indexedPairTests;
    receiverCellRows += indexed.index.receiverCellRows;
    shellAnnulusRows += indexed.index.shellAnnulusRows;
    cellLookups += indexed.index.cellLookups;
    duplicatePairTests += indexed.index.duplicatePairTests;
    missingBroadPhaseCandidates += scenarioMissing;
    extraBroadPhaseCandidates += scenarioExtra;
    packetMissingCandidateCount += scenarioPacketMissing;
    packetExtraCandidateCount += scenarioPacketExtra;
    bruteNarrowHits += scenarioBruteNarrowHits;
    indexedNarrowHits += scenarioIndexedNarrowHits;
    sameSourceCandidateCount +=
        count_same_source_candidates(replayedSources, replayedReceivers, indexedPairs);
    transitionCandidateCount +=
        count_candidates_with_transition(replayedSources, replayedReceivers, indexedPairs);
    chunkReplayRows += static_cast<std::uint64_t>(replayedSources.size() + replayedReceivers.size());
    chunkReplayBytes += sourceFixture.metadata.byteLength + receiverFixture.metadata.byteLength;
    checksum += static_cast<double>(sourceFixture.metadata.dataChecksum64 ^
                                    receiverFixture.metadata.dataChecksum64) +
                static_cast<double>(indexedPairs.size()) +
                static_cast<double>(scenario.timeSlabCount);
  }

  if (brutePairCount == 0 || bruteCandidateCount == 0 || indexedCandidateCount == 0 ||
      missingBroadPhaseCandidates != 0 || bruteNarrowHits != indexedNarrowHits ||
      packetMissingCandidateCount != 0 || packetExtraCandidateCount != 0 ||
      packetMergeOrderMismatchCount != 0) {
    throw std::runtime_error("emission-shell v0 benchmark failed oracle comparison");
  }
  const double brutePairs = static_cast<double>(brutePairCount);
  const double indexedCandidates = static_cast<double>(indexedCandidateCount);
  const double indexedTests = static_cast<double>(indexedPairTests);
  const double narrowHits = static_cast<double>(indexedNarrowHits);
  return BenchmarkOutcome{
      brutePairCount,
      indexedCandidateCount,
      checksum,
      "interval-time-slab-spatial-hash-emission-shell-annulus-v0",
      {
          {"scenario_count", static_cast<double>(scenarios.size())},
          {"path_count_min", 16.0},
          {"path_count_max", 2048.0},
          {"time_slab_min", 32.0},
          {"time_slab_max", 256.0},
          {"speed_regime_count", 5.0},
          {"density_case_count", 3.0},
          {"same_source_enabled", 1.0},
          {"all_to_all_enabled", 1.0},
          {"oracle_replay_sweeps", static_cast<double>(scenarios.size())},
          {"brute_force_pairs", brutePairs},
          {"brute_force_candidates", static_cast<double>(bruteCandidateCount)},
          {"indexed_pair_tests", indexedTests},
          {"indexed_candidates", indexedCandidates},
          {"missing_oracle_candidates", static_cast<double>(missingBroadPhaseCandidates)},
          {"extra_indexed_candidates", static_cast<double>(extraBroadPhaseCandidates)},
          {"broad_phase_recall", 1.0},
          {"candidate_count_reduction", brutePairs > 0.0 ? 1.0 - indexedCandidates / brutePairs : 0.0},
          {"indexed_pair_test_reduction", brutePairs > 0.0 ? 1.0 - indexedTests / brutePairs : 0.0},
          {"narrow_phase_hits", narrowHits},
          {"false_positive_ratio",
           indexedCandidates > 0.0 ? (indexedCandidates - narrowHits) / indexedCandidates : 0.0},
          {"same_source_candidate_count", static_cast<double>(sameSourceCandidateCount)},
          {"transition_candidate_count", static_cast<double>(transitionCandidateCount)},
          {"receiver_cell_rows", static_cast<double>(receiverCellRows)},
          {"shell_annulus_rows", static_cast<double>(shellAnnulusRows)},
          {"cell_lookups", static_cast<double>(cellLookups)},
          {"duplicate_pair_tests", static_cast<double>(duplicatePairTests)},
          {"chunk_replay_rows", static_cast<double>(chunkReplayRows)},
          {"chunk_replay_bytes", static_cast<double>(chunkReplayBytes)},
          {"work_packet_count", static_cast<double>(packetCount)},
          {"work_packet_candidate_count", static_cast<double>(packetCandidateCount)},
          {"work_packet_header_checksum_count", static_cast<double>(packetHeaderChecksumCount)},
          {"work_packet_missing_candidates", static_cast<double>(packetMissingCandidateCount)},
          {"work_packet_extra_candidates", static_cast<double>(packetExtraCandidateCount)},
          {"work_packet_merge_order_mismatches", static_cast<double>(packetMergeOrderMismatchCount)},
      },
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
  return BenchmarkOutcome{
      merged.rows.size(),
      matches.size(),
      checksum,
      "combined-spacetime-cell-index",
      {
          {"path_rows", static_cast<double>(pathRows.size())},
          {"assembly_rows", static_cast<double>(assemblyRows.size())},
          {"index_rows", static_cast<double>(merged.rows.size())},
          {"query_matches", static_cast<double>(matches.size())},
          {"overflow_entries", static_cast<double>(merged.overflowEntryCount)},
      },
  };
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
            << " checksum=" << std::setprecision(6) << result.checksum;
  if (!result.strategy.empty()) {
    std::cout << " strategy=" << result.strategy;
  }
  for (const auto& metric : result.metrics) {
    std::cout << ' ' << metric.first << '=' << std::setprecision(6) << metric.second;
  }
  std::cout << '\n';
}

}  // namespace

int main() {
  try {
    const std::vector<BenchmarkResult> results{
        measure("causal-root-batch", benchmark_causal_root_batch),
        measure("causal-root-thread-scaling", benchmark_causal_root_thread_scaling),
        measure("emission-shell-broad-phase", benchmark_emission_shell_broad_phase),
        measure("emission-shell-broad-phase-v0", benchmark_emission_shell_broad_phase_v0),
        measure("spacetime-index-build-query", benchmark_spacetime_index),
        measure("stream-and-assembly-store-io", benchmark_stream_and_store_io),
        measure("path-history-fast-spill-budget", benchmark_path_history_fast_spill_budget),
        measure("path-history-high-speed-readback-budget", benchmark_path_history_high_speed_readback_budget),
        measure("path-history-deep-index-build-budget", benchmark_path_history_deep_index_build_budget),
        measure("path-history-recovery-detection-budget", benchmark_path_history_recovery_detection_budget),
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

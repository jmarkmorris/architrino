#pragma once

#include "architrino/solver/AssemblyGraph.hpp"
#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/PathHistoryStream.hpp"

#include <cstddef>
#include <cstdint>
#include <limits>
#include <string>
#include <string_view>
#include <vector>

namespace architrino::solver {

enum class SpaceTimeSubjectKind : std::uint32_t {
  PathSegment = 1,
  AssemblyState = 2,
};

enum class SpaceTimeSourceLayout : std::uint32_t {
  PathSegmentV1 = 1,
  AssemblyStateV1 = 2,
};

constexpr std::uint32_t kSpaceTimeIndexOverflowFlag = 1U;
constexpr std::int64_t kSpaceTimeIndexOverflowCell =
    std::numeric_limits<std::int64_t>::min();

struct SpaceTimeBounds {
  double minX = 0.0;
  double minY = 0.0;
  double minZ = 0.0;
  double maxX = 0.0;
  double maxY = 0.0;
  double maxZ = 0.0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
};

struct SpaceTimeIndexOptions {
  double spatialCellSize = 1.0;
  double timeBinSize = 1.0;
  std::size_t maxCellsPerItem = 4096;
};

struct SpaceTimeIndexRowF64 {
  std::int64_t cellX = 0;
  std::int64_t cellY = 0;
  std::int64_t cellZ = 0;
  std::int64_t cellT = 0;
  std::uint64_t subjectKey = 0;
  std::uint64_t rowOffset = 0;
  double minX = 0.0;
  double minY = 0.0;
  double minZ = 0.0;
  double maxX = 0.0;
  double maxY = 0.0;
  double maxZ = 0.0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint32_t subjectKind = 0;
  std::uint32_t sourceLayout = 0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct SpaceTimeIndexBuildResult {
  std::vector<SpaceTimeIndexRowF64> rows;
  ValidationReport validation;
  std::size_t overflowEntryCount = 0;
};

struct SpaceTimeIndexQuery {
  SpaceTimeBounds bounds;
  bool filterSpace = true;
  bool filterTime = true;
  bool filterSubjectKind = false;
  SpaceTimeSubjectKind subjectKind = SpaceTimeSubjectKind::PathSegment;
  bool filterSubjectKey = false;
  std::uint64_t subjectKey = 0;
};

struct SpaceTimeIndexMetadata {
  std::string indexId;
  std::string manifestVersion = "solver-spacetime-index-manifest.v1";
  BinaryLayoutId layoutId = BinaryLayoutId::SpaceTimeIndexV1;
  NumericType numericType = NumericType::F64;
  std::size_t rowSizeBytes = sizeof(SpaceTimeIndexRowF64);
  std::uint64_t rowCount = 0;
  std::uint64_t byteLength = 0;
  SpaceTimeIndexOptions options;
  bool durable = true;
  std::string indexPath;
  std::string metadataPath;
};

struct SpaceTimeIndexStoreOptions {
  std::string indexId = "spacetime-index";
  std::string indexPath;
  std::string metadataPath;
  SpaceTimeIndexOptions options;
  bool durable = true;
};

SpaceTimeBounds path_history_bounds(const PathHistoryRowF64& row);
SpaceTimeBounds assembly_state_bounds(const AssemblyStateRowF64& row);

SpaceTimeIndexBuildResult build_path_history_spacetime_index(
    const std::vector<PathHistoryRowF64>& rows,
    SpaceTimeIndexOptions options,
    std::uint64_t rowOffsetBase = 0);
SpaceTimeIndexBuildResult build_assembly_state_spacetime_index(
    const std::vector<AssemblyStateRowF64>& rows,
    SpaceTimeIndexOptions options,
    std::uint64_t rowOffsetBase = 0);
SpaceTimeIndexBuildResult merge_spacetime_index_results(
    std::vector<SpaceTimeIndexBuildResult> results);

std::vector<SpaceTimeIndexRowF64> query_spacetime_index(
    const std::vector<SpaceTimeIndexRowF64>& indexRows,
    const SpaceTimeIndexQuery& query,
    SpaceTimeIndexOptions options);

SpaceTimeIndexMetadata write_spacetime_index_file(
    const SpaceTimeIndexStoreOptions& options,
    const std::vector<SpaceTimeIndexRowF64>& rows);
std::vector<SpaceTimeIndexRowF64> read_spacetime_index_rows(std::string_view indexPath,
                                                            std::uint64_t rowOffset,
                                                            std::size_t rowCount);

}  // namespace architrino::solver

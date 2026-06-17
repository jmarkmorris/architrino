#include "architrino/solver/SpaceTimeIndex.hpp"

#include <algorithm>
#include <cmath>
#include <fstream>
#include <limits>
#include <set>
#include <sstream>
#include <stdexcept>
#include <string>
#include <tuple>
#include <utility>

static_assert(sizeof(architrino::solver::SpaceTimeIndexRowF64) == 128);

namespace architrino::solver {
namespace {

std::string json_escape(std::string_view value) {
  std::string escaped;
  escaped.reserve(value.size());
  for (const char ch : value) {
    switch (ch) {
      case '\\':
        escaped += "\\\\";
        break;
      case '"':
        escaped += "\\\"";
        break;
      case '\n':
        escaped += "\\n";
        break;
      case '\r':
        escaped += "\\r";
        break;
      case '\t':
        escaped += "\\t";
        break;
      default:
        escaped += ch;
        break;
    }
  }
  return escaped;
}

bool finite_ordered_bounds(const SpaceTimeBounds& bounds) {
  return std::isfinite(bounds.minX) && std::isfinite(bounds.minY) &&
         std::isfinite(bounds.minZ) && std::isfinite(bounds.maxX) &&
         std::isfinite(bounds.maxY) && std::isfinite(bounds.maxZ) &&
         std::isfinite(bounds.timeStart) && std::isfinite(bounds.timeEnd) &&
         bounds.maxX >= bounds.minX && bounds.maxY >= bounds.minY &&
         bounds.maxZ >= bounds.minZ && bounds.timeEnd >= bounds.timeStart;
}

std::int64_t cell_for(double value, double cellSize) {
  const double raw = std::floor(value / cellSize);
  if (!std::isfinite(raw) ||
      raw < static_cast<double>(std::numeric_limits<std::int64_t>::min()) ||
      raw > static_cast<double>(std::numeric_limits<std::int64_t>::max())) {
    throw std::overflow_error("spacetime index cell coordinate is outside int64 range");
  }
  return static_cast<std::int64_t>(raw);
}

std::uint64_t positive_span(std::int64_t minCell, std::int64_t maxCell) {
  if (maxCell < minCell) {
    return 0;
  }
  const long double span =
      static_cast<long double>(maxCell) - static_cast<long double>(minCell) + 1.0L;
  if (span >= static_cast<long double>(std::numeric_limits<std::uint64_t>::max())) {
    return std::numeric_limits<std::uint64_t>::max();
  }
  return std::max<std::uint64_t>(1, static_cast<std::uint64_t>(span));
}

bool multiply_exceeds(std::uint64_t lhs, std::uint64_t rhs, std::uint64_t limit) {
  if (lhs == 0 || rhs == 0) {
    return false;
  }
  return lhs > limit / rhs;
}

bool span_exceeds_limit(std::uint64_t xSpan,
                        std::uint64_t ySpan,
                        std::uint64_t zSpan,
                        std::uint64_t tSpan,
                        std::uint64_t limit) {
  if (multiply_exceeds(xSpan, ySpan, limit)) {
    return true;
  }
  const std::uint64_t xy = xSpan * ySpan;
  if (multiply_exceeds(xy, zSpan, limit)) {
    return true;
  }
  const std::uint64_t xyz = xy * zSpan;
  return multiply_exceeds(xyz, tSpan, limit) || xyz * tSpan > limit;
}

void sort_rows(std::vector<SpaceTimeIndexRowF64>& rows) {
  std::stable_sort(rows.begin(),
                   rows.end(),
                   [](const SpaceTimeIndexRowF64& left, const SpaceTimeIndexRowF64& right) {
                     return std::tie(left.cellT,
                                     left.cellX,
                                     left.cellY,
                                     left.cellZ,
                                     left.subjectKind,
                                     left.subjectKey,
                                     left.rowOffset) <
                            std::tie(right.cellT,
                                     right.cellX,
                                     right.cellY,
                                     right.cellZ,
                                     right.subjectKind,
                                     right.subjectKey,
                                     right.rowOffset);
                   });
}

void append_status(ValidationReport& validation,
                   StatusSeverity severity,
                   std::string message) {
  validation.add(StatusCode::AppContractError,
                 severity,
                 std::move(message),
                 "spacetime-index",
                 severity != StatusSeverity::Error && severity != StatusSeverity::Halt);
}

SpaceTimeIndexRowF64 make_index_row(std::int64_t cellX,
                                    std::int64_t cellY,
                                    std::int64_t cellZ,
                                    std::int64_t cellT,
                                    std::uint64_t subjectKey,
                                    std::uint64_t rowOffset,
                                    SpaceTimeBounds bounds,
                                    SpaceTimeSubjectKind subjectKind,
                                    SpaceTimeSourceLayout sourceLayout,
                                    std::uint32_t stateFlags) {
  return SpaceTimeIndexRowF64{
      cellX,
      cellY,
      cellZ,
      cellT,
      subjectKey,
      rowOffset,
      bounds.minX,
      bounds.minY,
      bounds.minZ,
      bounds.maxX,
      bounds.maxY,
      bounds.maxZ,
      bounds.timeStart,
      bounds.timeEnd,
      static_cast<std::uint32_t>(subjectKind),
      static_cast<std::uint32_t>(sourceLayout),
      stateFlags,
      0,
  };
}

void append_bounds_entries(SpaceTimeIndexBuildResult& result,
                           SpaceTimeBounds bounds,
                           std::uint64_t subjectKey,
                           std::uint64_t rowOffset,
                           SpaceTimeSubjectKind subjectKind,
                           SpaceTimeSourceLayout sourceLayout,
                           SpaceTimeIndexOptions options) {
  if (!finite_ordered_bounds(bounds)) {
    append_status(result.validation,
                  StatusSeverity::Error,
                  "spacetime bounds must be finite and ordered");
    return;
  }
  if (!std::isfinite(options.spatialCellSize) || options.spatialCellSize <= 0.0 ||
      !std::isfinite(options.timeBinSize) || options.timeBinSize <= 0.0) {
    append_status(result.validation,
                  StatusSeverity::Error,
                  "spacetime cell sizes must be positive and finite");
    return;
  }

  const std::uint64_t maxCells =
      static_cast<std::uint64_t>(std::max<std::size_t>(1, options.maxCellsPerItem));
  const std::int64_t minX = cell_for(bounds.minX, options.spatialCellSize);
  const std::int64_t maxX = cell_for(bounds.maxX, options.spatialCellSize);
  const std::int64_t minY = cell_for(bounds.minY, options.spatialCellSize);
  const std::int64_t maxY = cell_for(bounds.maxY, options.spatialCellSize);
  const std::int64_t minZ = cell_for(bounds.minZ, options.spatialCellSize);
  const std::int64_t maxZ = cell_for(bounds.maxZ, options.spatialCellSize);
  const std::int64_t minT = cell_for(bounds.timeStart, options.timeBinSize);
  const std::int64_t maxT = cell_for(bounds.timeEnd, options.timeBinSize);

  const std::uint64_t xSpan = positive_span(minX, maxX);
  const std::uint64_t ySpan = positive_span(minY, maxY);
  const std::uint64_t zSpan = positive_span(minZ, maxZ);
  const std::uint64_t tSpan = positive_span(minT, maxT);
  if (span_exceeds_limit(xSpan, ySpan, zSpan, tSpan, maxCells)) {
    result.rows.push_back(make_index_row(kSpaceTimeIndexOverflowCell,
                                         kSpaceTimeIndexOverflowCell,
                                         kSpaceTimeIndexOverflowCell,
                                         kSpaceTimeIndexOverflowCell,
                                         subjectKey,
                                         rowOffset,
                                         bounds,
                                         subjectKind,
                                         sourceLayout,
                                         kSpaceTimeIndexOverflowFlag));
    result.overflowEntryCount += 1;
    append_status(result.validation,
                  StatusSeverity::Warning,
                  "spacetime row exceeded max cells and was indexed as overflow");
    return;
  }

  for (std::int64_t cellT = minT; cellT <= maxT; ++cellT) {
    for (std::int64_t cellX = minX; cellX <= maxX; ++cellX) {
      for (std::int64_t cellY = minY; cellY <= maxY; ++cellY) {
        for (std::int64_t cellZ = minZ; cellZ <= maxZ; ++cellZ) {
          result.rows.push_back(make_index_row(cellX,
                                               cellY,
                                               cellZ,
                                               cellT,
                                               subjectKey,
                                               rowOffset,
                                               bounds,
                                               subjectKind,
                                               sourceLayout,
                                               0));
        }
      }
    }
  }
}

bool bounds_overlap(const SpaceTimeIndexRowF64& row,
                    const SpaceTimeIndexQuery& query) {
  if (query.filterSpace &&
      (row.maxX < query.bounds.minX || row.minX > query.bounds.maxX ||
       row.maxY < query.bounds.minY || row.minY > query.bounds.maxY ||
       row.maxZ < query.bounds.minZ || row.minZ > query.bounds.maxZ)) {
    return false;
  }
  if (query.filterTime &&
      (row.timeEnd < query.bounds.timeStart || row.timeStart > query.bounds.timeEnd)) {
    return false;
  }
  return true;
}

bool cell_may_match(const SpaceTimeIndexRowF64& row,
                    const SpaceTimeIndexQuery& query,
                    SpaceTimeIndexOptions options) {
  if ((row.stateFlags & kSpaceTimeIndexOverflowFlag) != 0) {
    return true;
  }
  if (query.filterSpace) {
    const std::int64_t minX = cell_for(query.bounds.minX, options.spatialCellSize);
    const std::int64_t maxX = cell_for(query.bounds.maxX, options.spatialCellSize);
    const std::int64_t minY = cell_for(query.bounds.minY, options.spatialCellSize);
    const std::int64_t maxY = cell_for(query.bounds.maxY, options.spatialCellSize);
    const std::int64_t minZ = cell_for(query.bounds.minZ, options.spatialCellSize);
    const std::int64_t maxZ = cell_for(query.bounds.maxZ, options.spatialCellSize);
    if (row.cellX < minX || row.cellX > maxX || row.cellY < minY || row.cellY > maxY ||
        row.cellZ < minZ || row.cellZ > maxZ) {
      return false;
    }
  }
  if (query.filterTime) {
    const std::int64_t minT = cell_for(query.bounds.timeStart, options.timeBinSize);
    const std::int64_t maxT = cell_for(query.bounds.timeEnd, options.timeBinSize);
    if (row.cellT < minT || row.cellT > maxT) {
      return false;
    }
  }
  return true;
}

std::uint64_t checked_file_size(std::ifstream& stream, std::string_view path) {
  stream.seekg(0, std::ios::end);
  const std::streamoff size = stream.tellg();
  if (size < 0) {
    std::ostringstream message;
    message << "failed to determine file size for " << path;
    throw std::runtime_error(message.str());
  }
  stream.seekg(0, std::ios::beg);
  return static_cast<std::uint64_t>(size);
}

void write_manifest(const SpaceTimeIndexMetadata& metadata) {
  std::ofstream output(metadata.metadataPath, std::ios::binary | std::ios::trunc);
  if (!output.is_open()) {
    std::ostringstream message;
    message << "failed to open spacetime index metadata file at " << metadata.metadataPath;
    throw std::runtime_error(message.str());
  }
  output << "{\n";
  output << "  \"indexId\": \"" << json_escape(metadata.indexId) << "\",\n";
  output << "  \"manifestVersion\": \"" << json_escape(metadata.manifestVersion) << "\",\n";
  output << "  \"layout\": \"" << to_string(metadata.layoutId) << "\",\n";
  output << "  \"numericType\": \"" << to_string(metadata.numericType) << "\",\n";
  output << "  \"byteOrder\": \"little-endian\",\n";
  output << "  \"rowSizeBytes\": " << metadata.rowSizeBytes << ",\n";
  output << "  \"rowCount\": " << metadata.rowCount << ",\n";
  output << "  \"byteLength\": " << metadata.byteLength << ",\n";
  output << "  \"spatialCellSize\": " << metadata.options.spatialCellSize << ",\n";
  output << "  \"timeBinSize\": " << metadata.options.timeBinSize << ",\n";
  output << "  \"maxCellsPerItem\": " << metadata.options.maxCellsPerItem << ",\n";
  output << "  \"durable\": " << (metadata.durable ? "true" : "false") << ",\n";
  output << "  \"indexPath\": \"" << json_escape(metadata.indexPath) << "\",\n";
  output << "  \"metadataPath\": \"" << json_escape(metadata.metadataPath) << "\"\n";
  output << "}\n";
  if (!output) {
    throw std::runtime_error("failed to write spacetime index metadata manifest");
  }
}

}  // namespace

SpaceTimeBounds path_history_bounds(const PathHistoryRowF64& row) {
  const double dt = row.endTime - row.startTime;
  const double endX = row.startX + row.velocityX * dt;
  const double endY = row.startY + row.velocityY * dt;
  const double endZ = row.startZ + row.velocityZ * dt;
  const double pad = std::max(0.0, row.errorBound);
  return SpaceTimeBounds{
      std::min(row.startX, endX) - pad,
      std::min(row.startY, endY) - pad,
      std::min(row.startZ, endZ) - pad,
      std::max(row.startX, endX) + pad,
      std::max(row.startY, endY) + pad,
      std::max(row.startZ, endZ) + pad,
      std::min(row.startTime, row.endTime),
      std::max(row.startTime, row.endTime),
  };
}

SpaceTimeBounds assembly_state_bounds(const AssemblyStateRowF64& row) {
  const double dt = row.timeEnd - row.timeStart;
  const double endX = row.centerX + row.velocityX * dt;
  const double endY = row.centerY + row.velocityY * dt;
  const double endZ = row.centerZ + row.velocityZ * dt;
  return SpaceTimeBounds{
      std::min(row.centerX, endX),
      std::min(row.centerY, endY),
      std::min(row.centerZ, endZ),
      std::max(row.centerX, endX),
      std::max(row.centerY, endY),
      std::max(row.centerZ, endZ),
      std::min(row.timeStart, row.timeEnd),
      std::max(row.timeStart, row.timeEnd),
  };
}

SpaceTimeIndexBuildResult build_path_history_spacetime_index(
    const std::vector<PathHistoryRowF64>& rows,
    SpaceTimeIndexOptions options,
    std::uint64_t rowOffsetBase) {
  SpaceTimeIndexBuildResult result;
  for (std::size_t index = 0; index < rows.size(); ++index) {
    append_bounds_entries(result,
                          path_history_bounds(rows[index]),
                          rows[index].pathKey,
                          rowOffsetBase + static_cast<std::uint64_t>(index),
                          SpaceTimeSubjectKind::PathSegment,
                          SpaceTimeSourceLayout::PathSegmentV1,
                          options);
  }
  sort_rows(result.rows);
  if (result.validation.statuses.empty()) {
    result.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "path history spacetime index built",
                          "spacetime-index");
  }
  return result;
}

SpaceTimeIndexBuildResult build_assembly_state_spacetime_index(
    const std::vector<AssemblyStateRowF64>& rows,
    SpaceTimeIndexOptions options,
    std::uint64_t rowOffsetBase) {
  SpaceTimeIndexBuildResult result;
  for (std::size_t index = 0; index < rows.size(); ++index) {
    append_bounds_entries(result,
                          assembly_state_bounds(rows[index]),
                          rows[index].assemblyKey,
                          rowOffsetBase + static_cast<std::uint64_t>(index),
                          SpaceTimeSubjectKind::AssemblyState,
                          SpaceTimeSourceLayout::AssemblyStateV1,
                          options);
  }
  sort_rows(result.rows);
  if (result.validation.statuses.empty()) {
    result.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "assembly state spacetime index built",
                          "spacetime-index");
  }
  return result;
}

SpaceTimeIndexBuildResult merge_spacetime_index_results(
    std::vector<SpaceTimeIndexBuildResult> results) {
  SpaceTimeIndexBuildResult merged;
  for (SpaceTimeIndexBuildResult& result : results) {
    if (!result.validation.ok) {
      merged.validation.ok = false;
    }
    merged.validation.statuses.insert(merged.validation.statuses.end(),
                                      result.validation.statuses.begin(),
                                      result.validation.statuses.end());
    merged.overflowEntryCount += result.overflowEntryCount;
    merged.rows.insert(merged.rows.end(), result.rows.begin(), result.rows.end());
  }
  sort_rows(merged.rows);
  if (merged.validation.statuses.empty()) {
    merged.validation.add(StatusCode::Ok,
                          StatusSeverity::Ok,
                          "spacetime index results merged",
                          "spacetime-index");
  }
  return merged;
}

std::vector<SpaceTimeIndexRowF64> query_spacetime_index(
    const std::vector<SpaceTimeIndexRowF64>& indexRows,
    const SpaceTimeIndexQuery& query,
    SpaceTimeIndexOptions options) {
  if (!finite_ordered_bounds(query.bounds)) {
    throw std::invalid_argument("spacetime query bounds must be finite and ordered");
  }
  std::set<std::tuple<std::uint32_t, std::uint64_t, std::uint64_t>> seen;
  std::vector<SpaceTimeIndexRowF64> matches;
  for (const SpaceTimeIndexRowF64& row : indexRows) {
    if (query.filterSubjectKind &&
        row.subjectKind != static_cast<std::uint32_t>(query.subjectKind)) {
      continue;
    }
    if (query.filterSubjectKey && row.subjectKey != query.subjectKey) {
      continue;
    }
    if (!cell_may_match(row, query, options) || !bounds_overlap(row, query)) {
      continue;
    }
    const auto key = std::make_tuple(row.subjectKind, row.subjectKey, row.rowOffset);
    if (seen.insert(key).second) {
      matches.push_back(row);
    }
  }
  sort_rows(matches);
  return matches;
}

SpaceTimeIndexMetadata write_spacetime_index_file(
    const SpaceTimeIndexStoreOptions& options,
    const std::vector<SpaceTimeIndexRowF64>& rows) {
  if (options.indexPath.empty() || options.metadataPath.empty()) {
    throw std::invalid_argument("spacetime index and metadata paths are required");
  }
  std::ofstream output(options.indexPath, std::ios::binary | std::ios::trunc);
  if (!output.is_open()) {
    std::ostringstream message;
    message << "failed to open spacetime index file at " << options.indexPath;
    throw std::runtime_error(message.str());
  }
  const std::uint64_t byteLength =
      static_cast<std::uint64_t>(rows.size()) * sizeof(SpaceTimeIndexRowF64);
  if (byteLength > 0) {
    output.write(reinterpret_cast<const char*>(rows.data()),
                 static_cast<std::streamsize>(byteLength));
    if (!output) {
      throw std::runtime_error("failed to write spacetime index rows");
    }
  }
  output.close();

  SpaceTimeIndexMetadata metadata{
      options.indexId,
      "solver-spacetime-index-manifest.v1",
      BinaryLayoutId::SpaceTimeIndexV1,
      NumericType::F64,
      sizeof(SpaceTimeIndexRowF64),
      static_cast<std::uint64_t>(rows.size()),
      byteLength,
      options.options,
      options.durable,
      options.indexPath,
      options.metadataPath,
  };
  write_manifest(metadata);
  return metadata;
}

std::vector<SpaceTimeIndexRowF64> read_spacetime_index_rows(std::string_view indexPath,
                                                            std::uint64_t rowOffset,
                                                            std::size_t rowCount) {
  std::ifstream input(std::string(indexPath), std::ios::binary);
  if (!input.is_open()) {
    std::ostringstream message;
    message << "failed to open spacetime index file at " << indexPath;
    throw std::runtime_error(message.str());
  }
  const std::uint64_t fileBytes = checked_file_size(input, indexPath);
  if (fileBytes % sizeof(SpaceTimeIndexRowF64) != 0) {
    throw std::runtime_error("spacetime index file size is not a whole-row multiple");
  }
  const std::uint64_t byteOffset = rowOffset * sizeof(SpaceTimeIndexRowF64);
  const std::uint64_t byteLength =
      static_cast<std::uint64_t>(rowCount) * sizeof(SpaceTimeIndexRowF64);
  if (byteOffset > fileBytes || byteLength > fileBytes - byteOffset) {
    throw std::runtime_error("spacetime index read range is outside the file");
  }
  std::vector<SpaceTimeIndexRowF64> rows(rowCount);
  if (byteLength == 0) {
    return rows;
  }
  input.seekg(static_cast<std::streamoff>(byteOffset), std::ios::beg);
  input.read(reinterpret_cast<char*>(rows.data()), static_cast<std::streamsize>(byteLength));
  if (!input) {
    throw std::runtime_error("failed to read spacetime index rows");
  }
  return rows;
}

}  // namespace architrino::solver

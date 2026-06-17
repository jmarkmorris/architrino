#include "architrino/solver/PathHistoryStream.hpp"

#include <algorithm>
#include <fstream>
#include <iomanip>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>

static_assert(sizeof(architrino::solver::PathHistoryRowF64) == 96);
static_assert(sizeof(architrino::solver::PathHistoryIndexRow) == 64);
static_assert(sizeof(architrino::solver::PathHistoryChunkRow) == 104);

namespace architrino::solver {
namespace {

constexpr std::uint64_t kFnvOffsetBasis = 14695981039346656037ULL;
constexpr std::uint64_t kFnvPrime = 1099511628211ULL;

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

void ensure_open(const std::ofstream& stream, std::string_view path, std::string_view role) {
  if (!stream.is_open()) {
    std::ostringstream message;
    message << "failed to open " << role << " stream at " << path;
    throw std::runtime_error(message.str());
  }
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

std::uint64_t fnv1a64_update(std::uint64_t seed, const void* data, std::size_t byteLength) {
  std::uint64_t hash = seed;
  const auto* bytes = static_cast<const unsigned char*>(data);
  for (std::size_t index = 0; index < byteLength; ++index) {
    hash ^= bytes[index];
    hash *= kFnvPrime;
  }
  return hash;
}

std::uint64_t fnv1a64_bytes(const void* data, std::size_t byteLength) {
  return fnv1a64_update(kFnvOffsetBasis, data, byteLength);
}

std::string hex_u64(std::uint64_t value) {
  std::ostringstream output;
  output << "0x" << std::hex << std::setw(16) << std::setfill('0') << value;
  return output.str();
}

template <typename Row>
std::vector<Row> read_rows(std::string_view path,
                           std::uint64_t rowOffset,
                           std::size_t rowCount,
                           std::string_view role) {
  std::ifstream input(std::string(path), std::ios::binary);
  if (!input.is_open()) {
    std::ostringstream message;
    message << "failed to open " << role << " file at " << path;
    throw std::runtime_error(message.str());
  }

  const std::uint64_t fileBytes = checked_file_size(input, path);
  if (fileBytes % sizeof(Row) != 0) {
    std::ostringstream message;
    message << role << " file size is not a whole-row multiple";
    throw std::runtime_error(message.str());
  }

  if (rowOffset > std::numeric_limits<std::uint64_t>::max() / sizeof(Row) ||
      rowCount > std::numeric_limits<std::uint64_t>::max() / sizeof(Row)) {
    std::ostringstream message;
    message << role << " read range exceeds uint64 capacity";
    throw std::runtime_error(message.str());
  }

  const std::uint64_t byteOffset = rowOffset * sizeof(Row);
  const std::uint64_t byteLength = static_cast<std::uint64_t>(rowCount) * sizeof(Row);
  if (byteOffset > fileBytes || byteLength > fileBytes - byteOffset) {
    std::ostringstream message;
    message << role << " read range is outside the file";
    throw std::runtime_error(message.str());
  }
  if (byteLength > static_cast<std::uint64_t>(std::numeric_limits<std::streamsize>::max())) {
    std::ostringstream message;
    message << role << " read range exceeds streamsize capacity";
    throw std::runtime_error(message.str());
  }

  std::vector<Row> rows(rowCount);
  input.seekg(static_cast<std::streamoff>(byteOffset), std::ios::beg);
  input.read(reinterpret_cast<char*>(rows.data()), static_cast<std::streamsize>(byteLength));
  if (!input) {
    std::ostringstream message;
    message << "failed to read " << role << " rows";
    throw std::runtime_error(message.str());
  }
  return rows;
}

}  // namespace

std::uint64_t stable_path_key(std::string_view pathId) {
  std::uint64_t hash = kFnvOffsetBasis;
  for (const char ch : pathId) {
    hash ^= static_cast<unsigned char>(ch);
    hash *= kFnvPrime;
  }
  return hash;
}

PathHistoryRowF64 make_path_history_row(const LinearPathSegment& segment,
                                        std::uint64_t pathKey,
                                        std::uint64_t segmentIndex,
                                        std::uint32_t stateFlags) {
  return PathHistoryRowF64{
      pathKey,
      segmentIndex,
      segment.startTime,
      segment.endTime,
      segment.positionAtStart.x,
      segment.positionAtStart.y,
      segment.positionAtStart.z,
      segment.velocity.x,
      segment.velocity.y,
      segment.velocity.z,
      segment.errorBound,
      stateFlags,
      0,
  };
}

PathHistoryStreamWriter::PathHistoryStreamWriter(PathHistoryStreamOptions options)
    : options_(std::move(options)),
      metadata_{
          options_.streamId,
          "solver-stream-manifest.v1",
          BinaryLayoutId::PathSegmentV1,
          BinaryLayoutId::StreamIndexV1,
          BinaryLayoutId::PathChunkV1,
          NumericType::F64,
          sizeof(PathHistoryRowF64),
          0,
          0,
          0,
          0.0,
          0.0,
          false,
          options_.durable,
          options_.runId,
          options_.datasetId,
          options_.modelId,
          options_.configHash,
          options_.engineId,
          options_.engineVersion,
          options_.precisionPath,
          options_.unitConvention,
          options_.coordinateFrame,
          options_.scaleNormalization,
          options_.interpolationRule,
          options_.streamEncodingTolerance,
          options_.readbackTolerance,
          kFnvOffsetBasis,
          kFnvOffsetBasis,
          kFnvOffsetBasis,
          options_.dataPath,
          options_.indexPath,
          options_.chunkPath,
          options_.metadataPath,
      },
      dataStream_(options_.dataPath, std::ios::binary | std::ios::trunc),
      indexStream_(options_.indexPath, std::ios::binary | std::ios::trunc),
      chunkStream_(options_.chunkPath.empty()
                       ? std::ofstream()
                       : std::ofstream(options_.chunkPath, std::ios::binary | std::ios::trunc)) {
  if (options_.dataPath.empty() || options_.indexPath.empty() || options_.metadataPath.empty()) {
    throw std::invalid_argument("path-history stream data, index, and metadata paths are required");
  }
  if (options_.rowsPerIndexChunk == 0) {
    throw std::invalid_argument("rowsPerIndexChunk must be positive");
  }
  ensure_open(dataStream_, options_.dataPath, "path-history data");
  ensure_open(indexStream_, options_.indexPath, "path-history index");
  if (!options_.chunkPath.empty()) {
    ensure_open(chunkStream_, options_.chunkPath, "path-history chunk");
  }
  chunkRows_.reserve(options_.rowsPerIndexChunk);
}

PathHistoryStreamWriter::~PathHistoryStreamWriter() noexcept {
  try {
    if (!closed_) {
      close();
    }
  } catch (...) {
  }
}

void PathHistoryStreamWriter::append(const LinearPathSegment& segment,
                                     std::uint64_t pathKey,
                                     std::uint64_t segmentIndex,
                                     std::uint32_t stateFlags) {
  const PathHistoryRowF64 row =
      make_path_history_row(segment, pathKey, segmentIndex, stateFlags);
  if (!chunkRows_.empty() &&
      (chunkPathKey_ != pathKey || chunkRows_.size() >= options_.rowsPerIndexChunk)) {
    flush_chunk();
  }

  if (chunkRows_.empty()) {
    chunkPathKey_ = pathKey;
    chunkTimeStart_ = std::min(row.startTime, row.endTime);
    chunkTimeEnd_ = std::max(row.startTime, row.endTime);
    chunkHasRange_ = true;
  } else {
    chunkTimeStart_ = std::min(chunkTimeStart_, std::min(row.startTime, row.endTime));
    chunkTimeEnd_ = std::max(chunkTimeEnd_, std::max(row.startTime, row.endTime));
  }

  if (!metadata_.hasTimeRange) {
    metadata_.timeStart = std::min(row.startTime, row.endTime);
    metadata_.timeEnd = std::max(row.startTime, row.endTime);
    metadata_.hasTimeRange = true;
  } else {
    metadata_.timeStart = std::min(metadata_.timeStart, std::min(row.startTime, row.endTime));
    metadata_.timeEnd = std::max(metadata_.timeEnd, std::max(row.startTime, row.endTime));
  }

  chunkRows_.push_back(row);
}

void PathHistoryStreamWriter::append(std::string_view pathId,
                                     const LinearPathSegment& segment,
                                     std::uint64_t segmentIndex,
                                     std::uint32_t stateFlags) {
  append(segment, stable_path_key(pathId), segmentIndex, stateFlags);
}

void PathHistoryStreamWriter::flush() {
  flush_chunk();
  dataStream_.flush();
  indexStream_.flush();
  if (chunkStream_.is_open()) {
    chunkStream_.flush();
  }
  if (!dataStream_ || !indexStream_ || (chunkStream_.is_open() && !chunkStream_)) {
    throw std::runtime_error("failed to flush path-history stream");
  }
}

PathHistoryStreamMetadata PathHistoryStreamWriter::close() {
  if (closed_) {
    return metadata_;
  }
  flush();
  dataStream_.close();
  indexStream_.close();
  if (chunkStream_.is_open()) {
    chunkStream_.close();
  }
  write_manifest();
  closed_ = true;
  return metadata_;
}

const PathHistoryStreamMetadata& PathHistoryStreamWriter::metadata() const {
  return metadata_;
}

void PathHistoryStreamWriter::flush_chunk() {
  if (chunkRows_.empty()) {
    return;
  }

  const std::uint64_t rowOffset = metadata_.rowCount;
  const std::uint64_t rowCount = static_cast<std::uint64_t>(chunkRows_.size());
  const std::uint64_t byteOffset = metadata_.byteLength;
  const std::uint64_t byteLength = rowCount * sizeof(PathHistoryRowF64);
  const std::uint64_t checksum64 = fnv1a64_bytes(chunkRows_.data(), static_cast<std::size_t>(byteLength));
  const PathHistoryIndexRow indexRow{
      chunkPathKey_,
      metadata_.chunkCount,
      rowOffset,
      rowCount,
      chunkHasRange_ ? chunkTimeStart_ : 0.0,
      chunkHasRange_ ? chunkTimeEnd_ : 0.0,
      byteOffset,
      byteLength,
  };
  const PathHistoryChunkRow chunkRow{
      metadata_.chunkCount,
      chunkPathKey_,
      chunkPathKey_,
      rowOffset,
      rowCount,
      chunkRows_.front().segmentIndex,
      chunkRows_.back().segmentIndex,
      chunkHasRange_ ? chunkTimeStart_ : 0.0,
      chunkHasRange_ ? chunkTimeEnd_ : 0.0,
      byteOffset,
      byteLength,
      checksum64,
      0,
      0,
  };
  metadata_.dataChecksum64 =
      fnv1a64_update(metadata_.dataChecksum64, chunkRows_.data(), static_cast<std::size_t>(byteLength));
  metadata_.indexChecksum64 =
      fnv1a64_update(metadata_.indexChecksum64, &indexRow, sizeof(indexRow));
  metadata_.chunkChecksum64 =
      fnv1a64_update(metadata_.chunkChecksum64, &chunkRow, sizeof(chunkRow));

  dataStream_.write(reinterpret_cast<const char*>(chunkRows_.data()),
                    static_cast<std::streamsize>(byteLength));
  indexStream_.write(reinterpret_cast<const char*>(&indexRow),
                     static_cast<std::streamsize>(sizeof(indexRow)));
  if (chunkStream_.is_open()) {
    chunkStream_.write(reinterpret_cast<const char*>(&chunkRow),
                       static_cast<std::streamsize>(sizeof(chunkRow)));
  }
  if (!dataStream_ || !indexStream_ || (chunkStream_.is_open() && !chunkStream_)) {
    throw std::runtime_error("failed to write path-history stream chunk");
  }

  metadata_.rowCount += rowCount;
  metadata_.chunkCount += 1;
  metadata_.byteLength += byteLength;
  chunkRows_.clear();
  chunkHasRange_ = false;
}

void PathHistoryStreamWriter::write_manifest() const {
  std::ofstream output(options_.metadataPath, std::ios::binary | std::ios::trunc);
  if (!output.is_open()) {
    std::ostringstream message;
    message << "failed to open path-history metadata file at " << options_.metadataPath;
    throw std::runtime_error(message.str());
  }

  output << "{\n";
  output << "  \"streamId\": \"" << json_escape(metadata_.streamId) << "\",\n";
  output << "  \"manifestVersion\": \"" << json_escape(metadata_.manifestVersion) << "\",\n";
  output << "  \"layout\": \"" << to_string(metadata_.layoutId) << "\",\n";
  output << "  \"indexLayout\": \"" << to_string(metadata_.indexLayoutId) << "\",\n";
  if (!metadata_.chunkPath.empty()) {
    output << "  \"chunkLayout\": \"" << to_string(metadata_.chunkLayoutId) << "\",\n";
  }
  output << "  \"numericType\": \"" << to_string(metadata_.numericType) << "\",\n";
  output << "  \"byteOrder\": \"little-endian\",\n";
  output << "  \"rowSizeBytes\": " << metadata_.rowSizeBytes << ",\n";
  output << "  \"rowCount\": " << metadata_.rowCount << ",\n";
  output << "  \"chunkCount\": " << metadata_.chunkCount << ",\n";
  output << "  \"byteLength\": " << metadata_.byteLength << ",\n";
  output << "  \"timeRange\": ";
  if (metadata_.hasTimeRange) {
    output << "{\"start\": " << metadata_.timeStart << ", \"end\": " << metadata_.timeEnd << "},\n";
  } else {
    output << "null,\n";
  }
  output << "  \"run\": {\n";
  output << "    \"runId\": \"" << json_escape(metadata_.runId) << "\",\n";
  output << "    \"datasetId\": \"" << json_escape(metadata_.datasetId) << "\"\n";
  output << "  },\n";
  output << "  \"engine\": {\n";
  output << "    \"id\": \"" << json_escape(metadata_.engineId) << "\",\n";
  output << "    \"version\": \"" << json_escape(metadata_.engineVersion) << "\"\n";
  output << "  },\n";
  output << "  \"model\": {\n";
  output << "    \"modelId\": \"" << json_escape(metadata_.modelId) << "\",\n";
  output << "    \"configHash\": \"" << json_escape(metadata_.configHash) << "\"\n";
  output << "  },\n";
  output << "  \"precision\": {\n";
  output << "    \"path\": \"" << json_escape(metadata_.precisionPath) << "\",\n";
  output << "    \"numericType\": \"" << to_string(metadata_.numericType) << "\",\n";
  output << "    \"unitConvention\": \"" << json_escape(metadata_.unitConvention) << "\",\n";
  output << "    \"coordinateFrame\": \"" << json_escape(metadata_.coordinateFrame) << "\",\n";
  output << "    \"scaleNormalization\": \"" << json_escape(metadata_.scaleNormalization) << "\",\n";
  output << "    \"streamEncodingTolerance\": " << metadata_.streamEncodingTolerance << ",\n";
  output << "    \"readbackTolerance\": " << metadata_.readbackTolerance << "\n";
  output << "  },\n";
  output << "  \"interpolation\": {\n";
  output << "    \"rule\": \"" << json_escape(metadata_.interpolationRule) << "\",\n";
  output << "    \"errorBoundColumn\": \"error_bound\"\n";
  output << "  },\n";
  output << "  \"checksums\": {\n";
  output << "    \"algorithm\": \"fnv1a64\",\n";
  output << "    \"data\": \"" << hex_u64(metadata_.dataChecksum64) << "\",\n";
  output << "    \"index\": \"" << hex_u64(metadata_.indexChecksum64) << "\",\n";
  output << "    \"chunk\": \"" << hex_u64(metadata_.chunkChecksum64) << "\"\n";
  output << "  },\n";
  output << "  \"diagnosticSummary\": {\n";
  output << "    \"rowCount\": " << metadata_.rowCount << ",\n";
  output << "    \"chunkCount\": " << metadata_.chunkCount << ",\n";
  output << "    \"byteLength\": " << metadata_.byteLength << ",\n";
  output << "    \"hasTimeRange\": " << (metadata_.hasTimeRange ? "true" : "false") << "\n";
  output << "  },\n";
  output << "  \"durable\": " << (metadata_.durable ? "true" : "false") << ",\n";
  output << "  \"dataPath\": \"" << json_escape(metadata_.dataPath) << "\",\n";
  output << "  \"indexPath\": \"" << json_escape(metadata_.indexPath) << "\"";
  if (!metadata_.chunkPath.empty()) {
    output << ",\n";
    output << "  \"chunkPath\": \"" << json_escape(metadata_.chunkPath) << "\"\n";
  } else {
    output << "\n";
  }
  output << "}\n";

  if (!output) {
    throw std::runtime_error("failed to write path-history metadata manifest");
  }
}

std::vector<PathHistoryRowF64> read_path_history_rows(std::string_view dataPath,
                                                      std::uint64_t rowOffset,
                                                      std::size_t rowCount) {
  return read_rows<PathHistoryRowF64>(dataPath, rowOffset, rowCount, "path-history data");
}

std::vector<PathHistoryIndexRow> read_path_history_index(std::string_view indexPath) {
  std::ifstream input(std::string(indexPath), std::ios::binary);
  if (!input.is_open()) {
    std::ostringstream message;
    message << "failed to open path-history index file at " << indexPath;
    throw std::runtime_error(message.str());
  }
  const std::uint64_t fileBytes = checked_file_size(input, indexPath);
  if (fileBytes % sizeof(PathHistoryIndexRow) != 0) {
    throw std::runtime_error("path-history index file size is not a whole-row multiple");
  }
  const std::size_t rowCount = static_cast<std::size_t>(fileBytes / sizeof(PathHistoryIndexRow));
  input.close();
  return read_rows<PathHistoryIndexRow>(indexPath, 0, rowCount, "path-history index");
}

std::vector<PathHistoryChunkRow> read_path_history_chunks(std::string_view chunkPath) {
  std::ifstream input(std::string(chunkPath), std::ios::binary);
  if (!input.is_open()) {
    std::ostringstream message;
    message << "failed to open path-history chunk file at " << chunkPath;
    throw std::runtime_error(message.str());
  }
  const std::uint64_t fileBytes = checked_file_size(input, chunkPath);
  if (fileBytes % sizeof(PathHistoryChunkRow) != 0) {
    throw std::runtime_error("path-history chunk file size is not a whole-row multiple");
  }
  const std::size_t rowCount = static_cast<std::size_t>(fileBytes / sizeof(PathHistoryChunkRow));
  input.close();
  return read_rows<PathHistoryChunkRow>(chunkPath, 0, rowCount, "path-history chunk");
}

std::vector<PathHistoryIndexRow> query_path_history_index(
    const std::vector<PathHistoryIndexRow>& indexRows,
    const PathHistoryQuery& query) {
  if (query.filterTime && query.timeEnd < query.timeStart) {
    throw std::invalid_argument("path-history query time bounds are not ordered");
  }

  std::vector<PathHistoryIndexRow> matches;
  for (const PathHistoryIndexRow& row : indexRows) {
    if (query.filterPath && row.pathKey != query.pathKey) {
      continue;
    }
    if (query.filterTime && (row.timeEnd < query.timeStart || row.timeStart > query.timeEnd)) {
      continue;
    }
    matches.push_back(row);
  }
  return matches;
}

std::vector<PathHistoryRowF64> read_path_history_query(
    std::string_view dataPath,
    const std::vector<PathHistoryIndexRow>& indexRows,
    const PathHistoryQuery& query) {
  const std::vector<PathHistoryIndexRow> matches = query_path_history_index(indexRows, query);
  std::vector<PathHistoryRowF64> rows;
  for (const PathHistoryIndexRow& match : matches) {
    const std::vector<PathHistoryRowF64> chunkRows =
        read_path_history_rows(dataPath, match.rowOffset, static_cast<std::size_t>(match.rowCount));
    rows.insert(rows.end(), chunkRows.begin(), chunkRows.end());
  }
  return rows;
}

}  // namespace architrino::solver

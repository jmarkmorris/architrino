#pragma once

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/StreamMetadata.hpp"

#include <cstddef>
#include <cstdint>
#include <fstream>
#include <string>
#include <string_view>
#include <vector>

namespace architrino::solver {

struct PathHistoryRowF64 {
  std::uint64_t pathKey = 0;
  std::uint64_t segmentIndex = 0;
  double startTime = 0.0;
  double endTime = 0.0;
  double startX = 0.0;
  double startY = 0.0;
  double startZ = 0.0;
  double velocityX = 0.0;
  double velocityY = 0.0;
  double velocityZ = 0.0;
  double errorBound = 0.0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct PathHistoryIndexRow {
  std::uint64_t pathKey = 0;
  std::uint64_t chunkIndex = 0;
  std::uint64_t rowOffset = 0;
  std::uint64_t rowCount = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint64_t byteOffset = 0;
  std::uint64_t byteLength = 0;
};

struct PathHistoryChunkRow {
  std::uint64_t chunkIndex = 0;
  std::uint64_t pathKeyStart = 0;
  std::uint64_t pathKeyEnd = 0;
  std::uint64_t rowOffset = 0;
  std::uint64_t rowCount = 0;
  std::uint64_t frameStart = 0;
  std::uint64_t frameEnd = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint64_t byteOffset = 0;
  std::uint64_t byteLength = 0;
  std::uint64_t checksum64 = 0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct PathHistoryStreamOptions {
  std::string streamId = "path-history";
  std::string dataPath;
  std::string indexPath;
  std::string chunkPath;
  std::string metadataPath;
  std::size_t rowsPerIndexChunk = 4096;
  bool durable = true;
  std::string runId;
  std::string datasetId;
  std::string modelId;
  std::string configHash;
  std::string engineId = "architrino_solver";
  std::string engineVersion;
  std::string precisionPath = "scaled_f64_fast";
  std::string unitConvention = "solver-si";
  std::string coordinateFrame = "absolute";
  std::string scaleNormalization = "none";
  std::string interpolationRule = "linear_segment";
  double streamEncodingTolerance = 0.0;
  double readbackTolerance = 0.0;
};

struct PathHistoryStreamMetadata {
  std::string streamId;
  std::string manifestVersion = "solver-stream-manifest.v1";
  BinaryLayoutId layoutId = BinaryLayoutId::PathSegmentV1;
  BinaryLayoutId indexLayoutId = BinaryLayoutId::StreamIndexV1;
  BinaryLayoutId chunkLayoutId = BinaryLayoutId::PathChunkV1;
  NumericType numericType = NumericType::F64;
  std::size_t rowSizeBytes = sizeof(PathHistoryRowF64);
  std::uint64_t rowCount = 0;
  std::uint64_t chunkCount = 0;
  std::uint64_t byteLength = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool hasTimeRange = false;
  bool durable = true;
  std::string runId;
  std::string datasetId;
  std::string modelId;
  std::string configHash;
  std::string engineId;
  std::string engineVersion;
  std::string precisionPath;
  std::string unitConvention;
  std::string coordinateFrame;
  std::string scaleNormalization;
  std::string interpolationRule;
  double streamEncodingTolerance = 0.0;
  double readbackTolerance = 0.0;
  std::uint64_t dataChecksum64 = 0;
  std::uint64_t indexChecksum64 = 0;
  std::uint64_t chunkChecksum64 = 0;
  std::string dataPath;
  std::string indexPath;
  std::string chunkPath;
  std::string metadataPath;
};

struct PathHistoryQuery {
  std::uint64_t pathKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool filterPath = false;
  bool filterTime = false;
};

std::uint64_t stable_path_key(std::string_view pathId);
PathHistoryRowF64 make_path_history_row(const LinearPathSegment& segment,
                                        std::uint64_t pathKey,
                                        std::uint64_t segmentIndex,
                                        std::uint32_t stateFlags = 0);

class PathHistoryStreamWriter {
 public:
  explicit PathHistoryStreamWriter(PathHistoryStreamOptions options);
  ~PathHistoryStreamWriter() noexcept;

  PathHistoryStreamWriter(const PathHistoryStreamWriter&) = delete;
  PathHistoryStreamWriter& operator=(const PathHistoryStreamWriter&) = delete;

  void append(const LinearPathSegment& segment,
              std::uint64_t pathKey,
              std::uint64_t segmentIndex,
              std::uint32_t stateFlags = 0);
  void append(std::string_view pathId,
              const LinearPathSegment& segment,
              std::uint64_t segmentIndex,
              std::uint32_t stateFlags = 0);
  void flush();
  PathHistoryStreamMetadata close();
  const PathHistoryStreamMetadata& metadata() const;

 private:
  void flush_chunk();
  void write_manifest() const;

  PathHistoryStreamOptions options_;
  PathHistoryStreamMetadata metadata_;
  std::vector<PathHistoryRowF64> chunkRows_;
  std::uint64_t chunkPathKey_ = 0;
  double chunkTimeStart_ = 0.0;
  double chunkTimeEnd_ = 0.0;
  bool chunkHasRange_ = false;
  bool closed_ = false;
  std::ofstream dataStream_;
  std::ofstream indexStream_;
  std::ofstream chunkStream_;
};

std::vector<PathHistoryRowF64> read_path_history_rows(std::string_view dataPath,
                                                      std::uint64_t rowOffset,
                                                      std::size_t rowCount);
std::vector<PathHistoryIndexRow> read_path_history_index(std::string_view indexPath);
std::vector<PathHistoryChunkRow> read_path_history_chunks(std::string_view chunkPath);
std::vector<PathHistoryIndexRow> query_path_history_index(const std::vector<PathHistoryIndexRow>& indexRows,
                                                          const PathHistoryQuery& query);
std::vector<PathHistoryRowF64> read_path_history_query(std::string_view dataPath,
                                                       const std::vector<PathHistoryIndexRow>& indexRows,
                                                       const PathHistoryQuery& query);

}  // namespace architrino::solver

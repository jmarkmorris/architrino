#include "architrino/solver/PathHistoryStream.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <string_view>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

std::string read_text(const std::string& path) {
  std::ifstream input(path);
  std::ostringstream buffer;
  buffer << input.rdbuf();
  return buffer.str();
}

architrino::solver::LinearPathSegment make_segment(std::uint64_t index) {
  const double start = static_cast<double>(index);
  return architrino::solver::LinearPathSegment{
      "path-a",
      start,
      start + 0.5,
      architrino::solver::Vector3{start, start + 1.0, start + 2.0},
      architrino::solver::Vector3{0.25, 0.5, 0.75},
      architrino::solver::NumericType::F64,
      1e-12,
  };
}

architrino::solver::LinearPathSegment make_path_b_segment() {
  return architrino::solver::LinearPathSegment{
      "path-b",
      12.0,
      13.0,
      architrino::solver::Vector3{20.0, 0.0, 0.0},
      architrino::solver::Vector3{1.0, 0.0, 0.0},
      architrino::solver::NumericType::F64,
      1e-12,
  };
}

bool contains(std::string_view haystack, std::string_view needle) {
  return haystack.find(needle) != std::string_view::npos;
}

void corrupt_first_byte(const std::string& path) {
  std::fstream stream(path, std::ios::binary | std::ios::in | std::ios::out);
  char value = 0;
  stream.read(&value, 1);
  value = static_cast<char>(value ^ 0x1);
  stream.seekp(0, std::ios::beg);
  stream.write(&value, 1);
}

}  // namespace

int main() {
  const std::filesystem::path outputDir = ".tmp/solver-stream-smoke";
  std::filesystem::create_directories(outputDir);

  const std::string dataPath = (outputDir / "path-history.bin").string();
  const std::string indexPath = (outputDir / "path-history.idx").string();
  const std::string chunkPath = (outputDir / "path-history.chunks").string();
  const std::string metadataPath = (outputDir / "path-history.meta.json").string();
  const std::uint64_t pathKey = architrino::solver::stable_path_key("path-a");
  const std::uint64_t pathBKey = architrino::solver::stable_path_key("path-b");

  architrino::solver::PathHistoryStreamOptions options;
  options.streamId = "stream-smoke";
  options.dataPath = dataPath;
  options.indexPath = indexPath;
  options.chunkPath = chunkPath;
  options.metadataPath = metadataPath;
  options.rowsPerIndexChunk = 2;
  options.durable = true;
  options.runId = "run-stream-smoke";
  options.datasetId = "dataset-stream-smoke";
  options.modelId = "aaa.stream-smoke";
  options.configHash = "config:stream-smoke";
  options.engineVersion = "0.1.0";
  options.precisionPath = "scaled_f64_strict";
  options.unitConvention = "solver-si";
  options.coordinateFrame = "absolute";
  options.scaleNormalization = "local-path-origin";
  options.interpolationRule = "linear_segment";
  options.streamEncodingTolerance = 1e-12;
  options.readbackTolerance = 1e-12;

  bool invalidSegmentRejected = false;
  try {
    (void)architrino::solver::make_path_history_row(
        architrino::solver::LinearPathSegment{
            "invalid-path",
            2.0,
            1.0,
            architrino::solver::Vector3{0.0, 0.0, 0.0},
            architrino::solver::Vector3{1.0, 0.0, 0.0},
            architrino::solver::NumericType::F64,
            1e-12,
        },
        pathKey,
        99,
        0);
  } catch (const std::invalid_argument&) {
    invalidSegmentRejected = true;
  }

  architrino::solver::PathHistoryStreamWriter writer(options);
  writer.append("path-a", make_segment(0), 0, 7);
  writer.append("path-a", make_segment(1), 1, 7);
  writer.append("path-a", make_segment(2), 2, 7);
  writer.append("path-b", make_path_b_segment(), 0, 3);
  const architrino::solver::PathHistoryStreamMetadata metadata = writer.close();

  const auto rows = architrino::solver::read_path_history_rows(dataPath, 1, 2);
  const auto indexRows = architrino::solver::read_path_history_index(indexPath);
  const auto chunkRows = architrino::solver::read_path_history_chunks(chunkPath);
  const auto pathAChunks = architrino::solver::query_path_history_index(
      indexRows,
      architrino::solver::PathHistoryQuery{
          pathKey,
          1.25,
          2.25,
          true,
          true,
      });
  const auto pathARows = architrino::solver::read_path_history_query(
      dataPath,
      indexRows,
      architrino::solver::PathHistoryQuery{
          pathKey,
          1.25,
          2.25,
          true,
          true,
      });
  const auto checkedPathARows = architrino::solver::read_path_history_query_checked(
      dataPath,
      indexRows,
      chunkRows,
      architrino::solver::PathHistoryQuery{
          pathKey,
          1.25,
          2.25,
          true,
          true,
      });
  const auto pathBRows = architrino::solver::read_path_history_query(
      dataPath,
      indexRows,
      architrino::solver::PathHistoryQuery{
          pathBKey,
          0.0,
          20.0,
          true,
          true,
      });
  architrino::solver::verify_path_history_chunk_checksums(dataPath, chunkRows);
  const std::string corruptDataPath = (outputDir / "path-history-corrupt.bin").string();
  std::filesystem::copy_file(
      dataPath,
      corruptDataPath,
      std::filesystem::copy_options::overwrite_existing);
  corrupt_first_byte(corruptDataPath);
  bool checksumFaultDetected = false;
  try {
    (void)architrino::solver::read_path_history_query_checked(
        corruptDataPath,
        indexRows,
        chunkRows,
        architrino::solver::PathHistoryQuery{
            pathKey,
            0.0,
            0.25,
            true,
            true,
        });
  } catch (const std::runtime_error&) {
    checksumFaultDetected = true;
  }
  const std::string manifest = read_text(metadataPath);

  const std::string cDataPath = (outputDir / "path-history-cabi.bin").string();
  const std::string cIndexPath = (outputDir / "path-history-cabi.idx").string();
  const std::string cChunkPath = (outputDir / "path-history-cabi.chunks").string();
  const std::string cMetadataPath = (outputDir / "path-history-cabi.meta.json").string();
  const ArchitrinoSolverPathHistoryRowF64 cInputRows[4] = {
      ArchitrinoSolverPathHistoryRowF64{
          pathKey,
          0,
          0.0,
          0.5,
          0.0,
          1.0,
          2.0,
          0.25,
          0.5,
          0.75,
          1e-12,
          7,
          0,
      },
      ArchitrinoSolverPathHistoryRowF64{
          pathKey,
          1,
          1.0,
          1.5,
          1.0,
          2.0,
          3.0,
          0.25,
          0.5,
          0.75,
          1e-12,
          7,
          0,
      },
      ArchitrinoSolverPathHistoryRowF64{
          pathKey,
          2,
          2.0,
          2.5,
          2.0,
          3.0,
          4.0,
          0.25,
          0.5,
          0.75,
          1e-12,
          7,
          0,
      },
      ArchitrinoSolverPathHistoryRowF64{
          pathBKey,
          0,
          12.0,
          13.0,
          20.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1e-12,
          3,
          0,
      },
  };
  ArchitrinoSolverPathHistoryStreamSummary cSummary{};
  const int cWriteStatus = architrino_solver_write_path_history_stream_f64(
      "stream-smoke-cabi",
      cDataPath.c_str(),
      cIndexPath.c_str(),
      cChunkPath.c_str(),
      cMetadataPath.c_str(),
      cInputRows,
      4,
      2,
      1,
      &cSummary);

  ArchitrinoSolverPathHistoryIndexRow cIndexRows[3] = {};
  ArchitrinoSolverPathHistoryChunkRow cChunkRows[3] = {};
  ArchitrinoSolverPathHistoryRowF64 cReadRows[4] = {};
  ArchitrinoSolverPathHistoryIndexRow cQueryRows[3] = {};
  int cIndexCount = 0;
  int cChunkCount = 0;
  int cReadCount = 0;
  int cQueryCount = 0;
  int cProbeIndexCount = 0;
  const int cProbeIndexStatus = architrino_solver_read_path_history_stream_index(
      cIndexPath.c_str(),
      nullptr,
      0,
      &cProbeIndexCount);
  const int cIndexStatus = architrino_solver_read_path_history_stream_index(
      cIndexPath.c_str(),
      cIndexRows,
      3,
      &cIndexCount);
  const int cChunkStatus = architrino_solver_read_path_history_stream_chunks(
      cChunkPath.c_str(),
      cChunkRows,
      3,
      &cChunkCount);
  const ArchitrinoSolverPathHistoryQuery cQuery{
      pathKey,
      1.25,
      2.25,
      1,
      1,
      1,
      0,
  };
  const int cQueryStatus = architrino_solver_query_path_history_stream_index(
      cIndexRows,
      cIndexCount,
      &cQuery,
      cQueryRows,
      3,
      &cQueryCount);
  const int cReadStatus = architrino_solver_read_path_history_stream_query_f64(
      cDataPath.c_str(),
      cIndexRows,
      cIndexCount,
      cChunkRows,
      cChunkCount,
      &cQuery,
      cReadRows,
      4,
      &cReadCount);
  const std::string cCorruptDataPath = (outputDir / "path-history-cabi-corrupt.bin").string();
  std::filesystem::copy_file(
      cDataPath,
      cCorruptDataPath,
      std::filesystem::copy_options::overwrite_existing);
  corrupt_first_byte(cCorruptDataPath);
  int cCorruptReadCount = 0;
  const int cCorruptStatus = architrino_solver_read_path_history_stream_query_f64(
      cCorruptDataPath.c_str(),
      cIndexRows,
      cIndexCount,
      cChunkRows,
      cChunkCount,
      &cQuery,
      cReadRows,
      4,
      &cCorruptReadCount);

  const bool ok =
      invalidSegmentRejected &&
      metadata.streamId == "stream-smoke" &&
      metadata.rowSizeBytes == sizeof(architrino::solver::PathHistoryRowF64) &&
      metadata.rowCount == 4 &&
      metadata.chunkCount == 3 &&
      metadata.byteLength == 4 * sizeof(architrino::solver::PathHistoryRowF64) &&
      metadata.runId == "run-stream-smoke" &&
      metadata.datasetId == "dataset-stream-smoke" &&
      metadata.modelId == "aaa.stream-smoke" &&
      metadata.configHash == "config:stream-smoke" &&
      metadata.engineId == "architrino_solver" &&
      metadata.engineVersion == "0.1.0" &&
      metadata.precisionPath == "scaled_f64_strict" &&
      metadata.unitConvention == "solver-si" &&
      metadata.coordinateFrame == "absolute" &&
      metadata.scaleNormalization == "local-path-origin" &&
      metadata.interpolationRule == "linear_segment" &&
      metadata.dataChecksum64 != 0 &&
      metadata.indexChecksum64 != 0 &&
      metadata.chunkChecksum64 != 0 &&
      metadata.hasTimeRange &&
      nearly_equal(metadata.timeStart, 0.0) &&
      nearly_equal(metadata.timeEnd, 13.0) &&
      rows.size() == 2 &&
      rows[0].pathKey == pathKey &&
      rows[0].segmentIndex == 1 &&
      rows[0].stateFlags == 7 &&
      nearly_equal(rows[0].startX, 1.0) &&
      nearly_equal(rows[1].endTime, 2.5) &&
      indexRows.size() == 3 &&
      chunkRows.size() == 3 &&
      chunkRows[0].chunkIndex == 0 &&
      chunkRows[0].pathKeyStart == pathKey &&
      chunkRows[0].pathKeyEnd == pathKey &&
      chunkRows[0].rowOffset == 0 &&
      chunkRows[0].rowCount == 2 &&
      chunkRows[0].frameStart == 0 &&
      chunkRows[0].frameEnd == 1 &&
      chunkRows[0].byteOffset == 0 &&
      chunkRows[0].byteLength == 2 * sizeof(architrino::solver::PathHistoryRowF64) &&
      chunkRows[0].checksum64 != 0 &&
      chunkRows[2].pathKeyStart == pathBKey &&
      indexRows[0].pathKey == pathKey &&
      indexRows[0].rowOffset == 0 &&
      indexRows[0].rowCount == 2 &&
      indexRows[0].byteLength == 2 * sizeof(architrino::solver::PathHistoryRowF64) &&
      indexRows[1].rowOffset == 2 &&
      indexRows[1].rowCount == 1 &&
      indexRows[2].pathKey == pathBKey &&
      indexRows[2].rowOffset == 3 &&
      pathAChunks.size() == 2 &&
      pathARows.size() == 3 &&
      checkedPathARows.size() == pathARows.size() &&
      pathARows[0].pathKey == pathKey &&
      pathBRows.size() == 1 &&
      pathBRows[0].pathKey == pathBKey &&
      checksumFaultDetected &&
      contains(manifest, "\"layout\": \"path_segment.v1\"") &&
      contains(manifest, "\"indexLayout\": \"stream_index.v1\"") &&
      contains(manifest, "\"chunkLayout\": \"path_chunk.v1\"") &&
      contains(manifest, "\"runId\": \"run-stream-smoke\"") &&
      contains(manifest, "\"datasetId\": \"dataset-stream-smoke\"") &&
      contains(manifest, "\"modelId\": \"aaa.stream-smoke\"") &&
      contains(manifest, "\"configHash\": \"config:stream-smoke\"") &&
      contains(manifest, "\"path\": \"scaled_f64_strict\"") &&
      contains(manifest, "\"scaleNormalization\": \"local-path-origin\"") &&
      contains(manifest, "\"rule\": \"linear_segment\"") &&
      contains(manifest, "\"algorithm\": \"fnv1a64\"") &&
      contains(manifest, "\"diagnosticSummary\":") &&
      contains(manifest, "\"chunkPath\":") &&
      cWriteStatus == 0 &&
      cSummary.row_count == 4 &&
      cSummary.chunk_count == 3 &&
      cSummary.byte_length == 4 * sizeof(ArchitrinoSolverPathHistoryRowF64) &&
      cSummary.data_checksum64 != 0 &&
      cSummary.index_checksum64 != 0 &&
      cSummary.chunk_checksum64 != 0 &&
      cSummary.has_time_range == 1 &&
      cSummary.durable == 1 &&
      nearly_equal(cSummary.time_start, 0.0) &&
      nearly_equal(cSummary.time_end, 13.0) &&
      cProbeIndexStatus == -3 &&
      cProbeIndexCount == 3 &&
      cIndexStatus == 0 &&
      cIndexCount == 3 &&
      cIndexRows[0].path_key == pathKey &&
      cIndexRows[0].row_offset == 0 &&
      cIndexRows[0].row_count == 2 &&
      cChunkStatus == 0 &&
      cChunkCount == 3 &&
      cChunkRows[0].checksum64 != 0 &&
      cChunkRows[2].path_key_start == pathBKey &&
      cQueryStatus == 0 &&
      cQueryCount == 2 &&
      cQueryRows[0].chunk_index == 0 &&
      cReadStatus == 0 &&
      cReadCount == 3 &&
      cReadRows[0].path_key == pathKey &&
      cReadRows[0].segment_index == 0 &&
      cReadRows[2].segment_index == 2 &&
      cCorruptStatus == -2 &&
      cCorruptReadCount == 0;

  if (!ok) {
    std::cerr << "path-history stream smoke failed\n";
    return 1;
  }

  std::cout << "path-history stream=ok rows=" << metadata.rowCount
            << " chunks=" << metadata.chunkCount
            << " bytes=" << metadata.byteLength << '\n';
  return 0;
}

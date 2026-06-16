#include "architrino/solver/PathHistoryStream.hpp"

#include <cmath>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>
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

bool contains(std::string_view haystack, std::string_view needle) {
  return haystack.find(needle) != std::string_view::npos;
}

}  // namespace

int main() {
  const std::filesystem::path outputDir = ".tmp/solver-stream-smoke";
  std::filesystem::create_directories(outputDir);

  const std::string dataPath = (outputDir / "path-history.bin").string();
  const std::string indexPath = (outputDir / "path-history.idx").string();
  const std::string metadataPath = (outputDir / "path-history.meta.json").string();
  const std::uint64_t pathKey = architrino::solver::stable_path_key("path-a");

  architrino::solver::PathHistoryStreamWriter writer(
      architrino::solver::PathHistoryStreamOptions{
          "stream-smoke",
          dataPath,
          indexPath,
          metadataPath,
          2,
          true,
      });
  writer.append("path-a", make_segment(0), 0, 7);
  writer.append("path-a", make_segment(1), 1, 7);
  writer.append("path-a", make_segment(2), 2, 7);
  const architrino::solver::PathHistoryStreamMetadata metadata = writer.close();

  const auto rows = architrino::solver::read_path_history_rows(dataPath, 1, 2);
  const auto indexRows = architrino::solver::read_path_history_index(indexPath);
  const std::string manifest = read_text(metadataPath);

  const bool ok =
      metadata.streamId == "stream-smoke" &&
      metadata.rowSizeBytes == sizeof(architrino::solver::PathHistoryRowF64) &&
      metadata.rowCount == 3 &&
      metadata.chunkCount == 2 &&
      metadata.byteLength == 3 * sizeof(architrino::solver::PathHistoryRowF64) &&
      metadata.hasTimeRange &&
      nearly_equal(metadata.timeStart, 0.0) &&
      nearly_equal(metadata.timeEnd, 2.5) &&
      rows.size() == 2 &&
      rows[0].pathKey == pathKey &&
      rows[0].segmentIndex == 1 &&
      rows[0].stateFlags == 7 &&
      nearly_equal(rows[0].startX, 1.0) &&
      nearly_equal(rows[1].endTime, 2.5) &&
      indexRows.size() == 2 &&
      indexRows[0].pathKey == pathKey &&
      indexRows[0].rowOffset == 0 &&
      indexRows[0].rowCount == 2 &&
      indexRows[0].byteLength == 2 * sizeof(architrino::solver::PathHistoryRowF64) &&
      indexRows[1].rowOffset == 2 &&
      indexRows[1].rowCount == 1 &&
      contains(manifest, "\"layout\": \"path_segment.v1\"") &&
      contains(manifest, "\"indexLayout\": \"stream_index.v1\"");

  if (!ok) {
    std::cerr << "path-history stream smoke failed\n";
    return 1;
  }

  std::cout << "path-history stream=ok rows=" << metadata.rowCount
            << " chunks=" << metadata.chunkCount
            << " bytes=" << metadata.byteLength << '\n';
  return 0;
}

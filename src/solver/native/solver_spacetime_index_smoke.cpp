#include "architrino/solver/SpaceTimeIndex.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <string_view>
#include <vector>

namespace {

std::string read_text(const std::string& path) {
  std::ifstream input(path);
  std::ostringstream buffer;
  buffer << input.rdbuf();
  return buffer.str();
}

bool contains(std::string_view haystack, std::string_view needle) {
  return haystack.find(needle) != std::string_view::npos;
}

architrino::solver::PathHistoryRowF64 make_path_row(std::string_view pathId,
                                                    std::uint64_t segmentIndex,
                                                    double startX,
                                                    double velocityX,
                                                    double startTime,
                                                    double endTime) {
  return architrino::solver::make_path_history_row(
      architrino::solver::LinearPathSegment{
          std::string(pathId),
          startTime,
          endTime,
          architrino::solver::Vector3{startX, 0.0, 0.0},
          architrino::solver::Vector3{velocityX, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          0.0,
      },
      architrino::solver::stable_path_key(pathId),
      segmentIndex,
      0);
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::SpaceTimeIndexRowF64) == 128);

  const std::filesystem::path outputDir = ".tmp/solver-spacetime-index-smoke";
  std::filesystem::create_directories(outputDir);
  const std::string indexPath = (outputDir / "spacetime-index.bin").string();
  const std::string metadataPath = (outputDir / "spacetime-index.meta.json").string();

  const std::uint64_t pathAKey = architrino::solver::stable_path_key("path-a");
  const std::uint64_t pathBKey = architrino::solver::stable_path_key("path-b");
  const std::vector<architrino::solver::PathHistoryRowF64> pathRows{
      make_path_row("path-a", 0, 0.0, 1.0, 0.0, 2.0),
      make_path_row("path-b", 0, 20.0, 1.0, 0.0, 2.0),
  };

  const architrino::solver::AssemblyStateRowF64 assemblyState =
      architrino::solver::make_assembly_state_row(architrino::solver::AssemblyStateInput{
          "assembly-a",
          "assembly-a-state-0",
          0.0,
          2.0,
          architrino::solver::Vector3{1.0, 1.0, 0.0},
          architrino::solver::Vector3{0.0, 0.5, 0.0},
          0.25,
          3,
          1,
          0,
          0,
      });

  const architrino::solver::SpaceTimeIndexOptions options{1.0, 1.0, 128};
  architrino::solver::SpaceTimeIndexBuildResult pathIndex =
      architrino::solver::build_path_history_spacetime_index(pathRows, options);
  architrino::solver::SpaceTimeIndexBuildResult assemblyIndex =
      architrino::solver::build_assembly_state_spacetime_index({assemblyState}, options);
  architrino::solver::SpaceTimeIndexBuildResult merged =
      architrino::solver::merge_spacetime_index_results({pathIndex, assemblyIndex});

  const std::vector<architrino::solver::SpaceTimeIndexRowF64> pathMatches =
      architrino::solver::query_spacetime_index(
          merged.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{0.5, -0.5, -0.5, 1.5, 0.5, 0.5, 0.5, 1.5},
              true,
              true,
              true,
              architrino::solver::SpaceTimeSubjectKind::PathSegment,
              false,
              0,
          },
          options);
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> assemblyMatches =
      architrino::solver::query_spacetime_index(
          merged.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{0.5, 0.5, -0.5, 1.5, 2.5, 0.5, 0.5, 1.5},
              true,
              true,
              true,
              architrino::solver::SpaceTimeSubjectKind::AssemblyState,
              false,
              0,
          },
          options);
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> pathBMatches =
      architrino::solver::query_spacetime_index(
          merged.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{0.5, -0.5, -0.5, 1.5, 0.5, 0.5, 0.5, 1.5},
              true,
              true,
              true,
              architrino::solver::SpaceTimeSubjectKind::PathSegment,
              true,
              pathBKey,
          },
          options);

  const architrino::solver::SpaceTimeIndexMetadata metadata =
      architrino::solver::write_spacetime_index_file(
          architrino::solver::SpaceTimeIndexStoreOptions{
              "spacetime-smoke",
              indexPath,
              metadataPath,
              options,
              true,
          },
          merged.rows);
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> storedRows =
      architrino::solver::read_spacetime_index_rows(indexPath, 0, metadata.rowCount);
  const std::string manifest = read_text(metadataPath);

  const std::vector<architrino::solver::PathHistoryRowF64> largePathRows{
      make_path_row("path-large", 0, 0.0, 1.0, 0.0, 100.0),
  };
  const architrino::solver::SpaceTimeIndexBuildResult overflowIndex =
      architrino::solver::build_path_history_spacetime_index(
          largePathRows,
          architrino::solver::SpaceTimeIndexOptions{1.0, 1.0, 4});
  const std::vector<architrino::solver::SpaceTimeIndexRowF64> overflowMatches =
      architrino::solver::query_spacetime_index(
          overflowIndex.rows,
          architrino::solver::SpaceTimeIndexQuery{
              architrino::solver::SpaceTimeBounds{50.0, -0.5, -0.5, 51.0, 0.5, 0.5, 50.0, 51.0},
              true,
              true,
              true,
              architrino::solver::SpaceTimeSubjectKind::PathSegment,
              false,
              0,
          },
          architrino::solver::SpaceTimeIndexOptions{1.0, 1.0, 4});

  const architrino::solver::BinaryLayoutDescriptor layout =
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::SpaceTimeIndexV1);
  const ArchitrinoSolverPathHistoryRowF64 abiPathRows[2]{
      ArchitrinoSolverPathHistoryRowF64{
          pathRows[0].pathKey,
          pathRows[0].segmentIndex,
          pathRows[0].startTime,
          pathRows[0].endTime,
          pathRows[0].startX,
          pathRows[0].startY,
          pathRows[0].startZ,
          pathRows[0].velocityX,
          pathRows[0].velocityY,
          pathRows[0].velocityZ,
          pathRows[0].errorBound,
          pathRows[0].stateFlags,
          pathRows[0].reserved0,
      },
      ArchitrinoSolverPathHistoryRowF64{
          pathRows[1].pathKey,
          pathRows[1].segmentIndex,
          pathRows[1].startTime,
          pathRows[1].endTime,
          pathRows[1].startX,
          pathRows[1].startY,
          pathRows[1].startZ,
          pathRows[1].velocityX,
          pathRows[1].velocityY,
          pathRows[1].velocityZ,
          pathRows[1].errorBound,
          pathRows[1].stateFlags,
          pathRows[1].reserved0,
      },
  };
  const ArchitrinoSolverAssemblyStateRowF64 abiAssemblyRows[1]{
      ArchitrinoSolverAssemblyStateRowF64{
          assemblyState.assemblyKey,
          assemblyState.assemblyStateKey,
          assemblyState.timeStart,
          assemblyState.timeEnd,
          assemblyState.centerX,
          assemblyState.centerY,
          assemblyState.centerZ,
          assemblyState.velocityX,
          assemblyState.velocityY,
          assemblyState.velocityZ,
          assemblyState.phase,
          assemblyState.cycleIndex,
          assemblyState.modelVersion,
          assemblyState.statusFlags,
          assemblyState.fidelityFlags,
          assemblyState.reserved0,
      },
  };
  const ArchitrinoSolverSpaceTimeIndexOptionsF64 abiOptions{
      1.0,
      1.0,
      128,
      0,
  };
  ArchitrinoSolverSpaceTimeIndexRowF64 abiRows[64]{};
  int abiRowCount = 0;
  int abiOverflowCount = 0;
  const int abiBuildStatus =
      architrino_solver_build_spacetime_index_f64(
          abiPathRows,
          2,
          abiAssemblyRows,
          1,
          &abiOptions,
          abiRows,
          64,
          &abiRowCount,
          &abiOverflowCount);
  const ArchitrinoSolverSpaceTimeQueryF64 abiQuery{
      ArchitrinoSolverSpaceTimeBoundsF64{0.5, -0.5, -0.5, 1.5, 0.5, 0.5, 0.5, 1.5},
      1,
      1,
      1,
      static_cast<std::uint32_t>(architrino::solver::SpaceTimeSubjectKind::PathSegment),
      0,
      0,
      0,
  };
  ArchitrinoSolverSpaceTimeIndexRowF64 abiMatches[8]{};
  int abiMatchCount = 0;
  const int abiQueryStatus =
      architrino_solver_query_spacetime_index_f64(
          abiRows,
          abiRowCount,
          &abiQuery,
          &abiOptions,
          abiMatches,
          8,
          &abiMatchCount);
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();

  const bool ok =
      pathIndex.validation.ok &&
      assemblyIndex.validation.ok &&
      merged.validation.ok &&
      !pathMatches.empty() &&
      pathMatches[0].subjectKey == pathAKey &&
      pathMatches[0].subjectKind ==
          static_cast<std::uint32_t>(architrino::solver::SpaceTimeSubjectKind::PathSegment) &&
      !assemblyMatches.empty() &&
      assemblyMatches[0].subjectKey == assemblyState.assemblyKey &&
      assemblyMatches[0].subjectKind ==
          static_cast<std::uint32_t>(architrino::solver::SpaceTimeSubjectKind::AssemblyState) &&
      pathBMatches.empty() &&
      metadata.layoutId == architrino::solver::BinaryLayoutId::SpaceTimeIndexV1 &&
      metadata.rowSizeBytes == sizeof(architrino::solver::SpaceTimeIndexRowF64) &&
      metadata.rowCount == merged.rows.size() &&
      metadata.byteLength == merged.rows.size() * sizeof(architrino::solver::SpaceTimeIndexRowF64) &&
      storedRows.size() == merged.rows.size() &&
      contains(manifest, "\"layout\": \"spacetime_index.v1\"") &&
      contains(manifest, "\"spatialCellSize\": 1") &&
      overflowIndex.overflowEntryCount == 1 &&
      overflowIndex.rows.size() == 1 &&
      (overflowIndex.rows[0].stateFlags & architrino::solver::kSpaceTimeIndexOverflowFlag) != 0 &&
      overflowMatches.size() == 1 &&
      layout.rowSizeBytes == 128 &&
      abiBuildStatus == 0 &&
      abiRowCount == static_cast<int>(merged.rows.size()) &&
      abiOverflowCount == 0 &&
      abiQueryStatus == 0 &&
      abiMatchCount == 1 &&
      abiMatches[0].subject_key == pathAKey &&
      abiInfo.path_history_row_f64_bytes == 96 &&
      abiInfo.spacetime_index_row_f64_bytes == 128;

  if (!ok) {
    std::cerr << "solver spacetime index smoke failed\n";
    return 1;
  }

  std::cout << "solver spacetime-index=ok rows=" << metadata.rowCount
            << " overflow=" << overflowIndex.overflowEntryCount << '\n';
  return 0;
}

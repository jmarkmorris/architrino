#include "architrino/solver/AssemblyGraphStore.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <string_view>
#include <vector>

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

bool contains(std::string_view haystack, std::string_view needle) {
  return haystack.find(needle) != std::string_view::npos;
}

ArchitrinoSolverAssemblyStateRowF64 to_c_row(
    const architrino::solver::AssemblyStateRowF64& row) {
  return ArchitrinoSolverAssemblyStateRowF64{
      row.assemblyKey,
      row.assemblyStateKey,
      row.timeStart,
      row.timeEnd,
      row.centerX,
      row.centerY,
      row.centerZ,
      row.velocityX,
      row.velocityY,
      row.velocityZ,
      row.phase,
      row.cycleIndex,
      row.modelVersion,
      row.statusFlags,
      row.fidelityFlags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyMembershipRowF64 to_c_row(
    const architrino::solver::AssemblyMembershipRowF64& row) {
  return ArchitrinoSolverAssemblyMembershipRowF64{
      row.membershipKey,
      row.pathKey,
      row.assemblyKey,
      row.assemblyStateKey,
      row.timeStart,
      row.timeEnd,
      row.confidence,
      row.localRole,
      row.bindingState,
      row.membershipVersion,
      row.eventKind,
      row.statusFlags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyHierarchyRowF64 to_c_row(
    const architrino::solver::AssemblyHierarchyRowF64& row) {
  return ArchitrinoSolverAssemblyHierarchyRowF64{
      row.hierarchyKey,
      row.parentAssemblyKey,
      row.childAssemblyKey,
      row.timeStart,
      row.timeEnd,
      row.relationType,
      row.hierarchyVersion,
      row.statusFlags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyEventRowF64 to_c_row(
    const architrino::solver::AssemblyEventRowF64& row) {
  return ArchitrinoSolverAssemblyEventRowF64{
      row.eventKey,
      row.primaryId,
      row.secondaryId,
      row.priorStateKey,
      row.nextStateKey,
      row.relatedPathKey,
      row.relatedAssemblyKey,
      row.branchTransitionKey,
      row.eventTime,
      row.eventKind,
      row.speedRegime,
      row.statusFlags,
      row.reserved0,
  };
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::AssemblyGraphStoreIndexRowF64) == 72);

  const std::filesystem::path outputDir = ".tmp/solver-assembly-store-smoke";
  std::filesystem::create_directories(outputDir);

  const std::string statePath = (outputDir / "assembly-state.bin").string();
  const std::string membershipPath = (outputDir / "assembly-membership.bin").string();
  const std::string hierarchyPath = (outputDir / "assembly-hierarchy.bin").string();
  const std::string eventPath = (outputDir / "assembly-events.bin").string();
  const std::string metadataPath = (outputDir / "assembly-graph.meta.json").string();

  const std::uint64_t assemblyKey = architrino::solver::stable_identity_key("assembly-a");
  const std::uint64_t parentKey = architrino::solver::stable_identity_key("assembly-parent");
  const std::uint64_t pathKey = architrino::solver::stable_identity_key("path-a");
  const architrino::solver::AssemblyStateRowF64 state0 =
      architrino::solver::make_assembly_state_row(architrino::solver::AssemblyStateInput{
          "assembly-a",
          "assembly-a-state-0",
          0.0,
          5.0,
          architrino::solver::Vector3{1.0, 2.0, 3.0},
          architrino::solver::Vector3{0.25, 0.0, 0.0},
          0.25,
          3,
          1,
          0,
          7,
      });
  const architrino::solver::AssemblyStateRowF64 state1 =
      architrino::solver::make_assembly_state_row(architrino::solver::AssemblyStateInput{
          "assembly-a",
          "assembly-a-state-1",
          5.0,
          8.0,
          architrino::solver::Vector3{2.0, 2.0, 3.0},
          architrino::solver::Vector3{0.5, 0.0, 0.0},
          0.75,
          4,
          1,
          0,
          7,
      });
  const std::vector<architrino::solver::AssemblyMembershipRowF64> memberships{
      architrino::solver::make_assembly_membership_row(
          architrino::solver::AssemblyMembershipInput{
              "membership-a-0",
              pathKey,
              assemblyKey,
              state0.assemblyStateKey,
              0.0,
              5.0,
              1.0,
              1,
              1,
              1,
              0,
          }),
      architrino::solver::make_assembly_membership_row(
          architrino::solver::AssemblyMembershipInput{
              "membership-a-1",
              pathKey,
              assemblyKey,
              state1.assemblyStateKey,
              5.0,
              8.0,
              1.0,
              2,
              1,
              1,
              0,
          }),
      architrino::solver::make_assembly_membership_row(
          architrino::solver::AssemblyMembershipInput{
              "membership-a-2",
              pathKey,
              0,
              0,
              8.0,
              10.0,
              1.0,
              0,
              0,
              1,
              0,
          }),
  };
  const architrino::solver::AssemblyHierarchyRowF64 hierarchy =
      architrino::solver::make_assembly_hierarchy_row(
          "hierarchy-parent-child",
          parentKey,
          assemblyKey,
          0.0,
          10.0,
          1,
          1,
          0);
  const std::vector<architrino::solver::AssemblyEventRowF64> events =
      architrino::solver::detect_membership_change_events(memberships);

  architrino::solver::AssemblyGraphStoreWriter writer(
      architrino::solver::AssemblyGraphStoreOptions{
          "assembly-store-smoke",
          statePath,
          membershipPath,
          hierarchyPath,
          eventPath,
          metadataPath,
          true,
      });
  writer.append_state(state0);
  writer.append_state(state1);
  for (const architrino::solver::AssemblyMembershipRowF64& membership : memberships) {
    writer.append_membership(membership);
  }
  writer.append_hierarchy(hierarchy);
  for (const architrino::solver::AssemblyEventRowF64& event : events) {
    writer.append_event(event);
  }
  const architrino::solver::AssemblyGraphStoreMetadata metadata = writer.close();

  const std::vector<architrino::solver::AssemblyStateRowF64> storedStates =
      architrino::solver::read_assembly_state_rows(statePath, 0, metadata.states.rowCount);
  const std::vector<architrino::solver::AssemblyMembershipRowF64> storedMemberships =
      architrino::solver::read_assembly_membership_rows(
          membershipPath,
          0,
          metadata.memberships.rowCount);
  const std::vector<architrino::solver::AssemblyHierarchyRowF64> storedHierarchy =
      architrino::solver::read_assembly_hierarchy_rows(hierarchyPath, 0, metadata.hierarchy.rowCount);
  const std::vector<architrino::solver::AssemblyEventRowF64> storedEvents =
      architrino::solver::read_assembly_event_rows(eventPath, 0, metadata.events.rowCount);
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> storedIndex =
      architrino::solver::read_assembly_graph_store_index_rows(
          metadata.index.path,
          0,
          metadata.index.rowCount);

  const std::vector<architrino::solver::AssemblyMembershipRowF64> pathWindow =
      architrino::solver::query_assembly_memberships(
          storedMemberships,
          architrino::solver::AssemblyGraphQuery{
              pathKey,
              0,
              4.0,
              6.0,
              true,
              false,
              true,
          });
  const std::vector<architrino::solver::AssemblyStateRowF64> stateWindow =
      architrino::solver::query_assembly_states(
          storedStates,
          architrino::solver::AssemblyGraphQuery{
              0,
              assemblyKey,
              4.5,
              5.5,
              false,
              true,
              true,
          });
  const std::vector<architrino::solver::AssemblyHierarchyRowF64> hierarchyWindow =
      architrino::solver::query_assembly_hierarchy(
          storedHierarchy,
          architrino::solver::AssemblyGraphQuery{
              0,
              parentKey,
              0.0,
              10.0,
              false,
              true,
              true,
          });
  const std::vector<architrino::solver::AssemblyEventRowF64> eventWindow =
      architrino::solver::query_assembly_events(
          storedEvents,
          architrino::solver::AssemblyGraphQuery{
              pathKey,
              0,
              5.0,
              9.0,
              true,
              false,
              true,
          });
  const std::optional<architrino::solver::AssemblyMembershipRowF64> membershipAtSix =
      architrino::solver::membership_at_time(storedMemberships, pathKey, 6.0);
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> pathIndexRows =
      architrino::solver::query_assembly_graph_store_index(
          storedIndex,
          architrino::solver::AssemblyGraphStoreIndexQuery{
              architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyMembership,
              architrino::solver::AssemblyGraphStoreIndexKeyKind::Path,
              pathKey,
              4.0,
              6.0,
              0,
              0,
              true,
              true,
              true,
              true,
              false,
          });
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> assemblyIndexRows =
      architrino::solver::query_assembly_graph_store_index(
          storedIndex,
          architrino::solver::AssemblyGraphStoreIndexQuery{
              architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyState,
              architrino::solver::AssemblyGraphStoreIndexKeyKind::Assembly,
              assemblyKey,
              4.5,
              5.5,
              0,
              0,
              true,
              true,
              true,
              true,
              false,
          });
  const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> membershipByteRows =
      architrino::solver::query_assembly_graph_store_index(
          storedIndex,
          architrino::solver::AssemblyGraphStoreIndexQuery{
              architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyMembership,
              architrino::solver::AssemblyGraphStoreIndexKeyKind::Path,
              pathKey,
              0.0,
              0.0,
              sizeof(architrino::solver::AssemblyMembershipRowF64),
              2 * sizeof(architrino::solver::AssemblyMembershipRowF64),
              true,
              true,
              true,
              false,
              true,
          });
  const std::string manifest = read_text(metadataPath);

  const std::string cStatePath = (outputDir / "assembly-state-cabi.bin").string();
  const std::string cMembershipPath = (outputDir / "assembly-membership-cabi.bin").string();
  const std::string cHierarchyPath = (outputDir / "assembly-hierarchy-cabi.bin").string();
  const std::string cEventPath = (outputDir / "assembly-events-cabi.bin").string();
  const std::string cIndexPath = (outputDir / "assembly-index-cabi.bin").string();
  const std::string cMetadataPath = (outputDir / "assembly-graph-cabi.meta.json").string();
  const ArchitrinoSolverAssemblyStateRowF64 cStates[2] = {
      to_c_row(state0),
      to_c_row(state1),
  };
  const ArchitrinoSolverAssemblyMembershipRowF64 cMemberships[3] = {
      to_c_row(memberships[0]),
      to_c_row(memberships[1]),
      to_c_row(memberships[2]),
  };
  const ArchitrinoSolverAssemblyHierarchyRowF64 cHierarchy[1] = {
      to_c_row(hierarchy),
  };
  const ArchitrinoSolverAssemblyEventRowF64 cEvents[2] = {
      to_c_row(events[0]),
      to_c_row(events[1]),
  };
  ArchitrinoSolverAssemblyGraphStoreSummary cSummary{};
  const int cWriteStatus = architrino_solver_write_assembly_graph_store_f64(
      "assembly-store-smoke-cabi",
      cStatePath.c_str(),
      cMembershipPath.c_str(),
      cHierarchyPath.c_str(),
      cEventPath.c_str(),
      cIndexPath.c_str(),
      cMetadataPath.c_str(),
      cStates,
      2,
      cMemberships,
      3,
      cHierarchy,
      1,
      cEvents,
      2,
      1,
      &cSummary);
  ArchitrinoSolverAssemblyStateRowF64 cReadStates[2] = {};
  ArchitrinoSolverAssemblyMembershipRowF64 cReadMemberships[3] = {};
  ArchitrinoSolverAssemblyEventRowF64 cReadEvents[2] = {};
  ArchitrinoSolverAssemblyGraphStoreIndexRowF64 cReadIndex[12] = {};
  ArchitrinoSolverAssemblyGraphStoreIndexRowF64 cPathIndexRows[3] = {};
  int cStateCount = 0;
  int cMembershipCount = 0;
  int cEventCount = 0;
  int cIndexCount = 0;
  int cPathIndexCount = 0;
  int cProbeIndexCount = 0;
  const int cStateStatus = architrino_solver_read_assembly_graph_store_states_f64(
      cStatePath.c_str(),
      0,
      2,
      cReadStates,
      2,
      &cStateCount);
  const int cMembershipStatus = architrino_solver_read_assembly_graph_store_memberships_f64(
      cMembershipPath.c_str(),
      0,
      3,
      cReadMemberships,
      3,
      &cMembershipCount);
  const int cEventStatus = architrino_solver_read_assembly_graph_store_events_f64(
      cEventPath.c_str(),
      0,
      2,
      cReadEvents,
      2,
      &cEventCount);
  const int cProbeIndexStatus = architrino_solver_read_assembly_graph_store_index(
      cIndexPath.c_str(),
      0,
      12,
      nullptr,
      0,
      &cProbeIndexCount);
  const int cIndexStatus = architrino_solver_read_assembly_graph_store_index(
      cIndexPath.c_str(),
      0,
      12,
      cReadIndex,
      12,
      &cIndexCount);
  const ArchitrinoSolverAssemblyGraphStoreIndexQuery cPathQuery{
      static_cast<std::uint32_t>(architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyMembership),
      static_cast<std::uint32_t>(architrino::solver::AssemblyGraphStoreIndexKeyKind::Path),
      1,
      1,
      1,
      1,
      0,
      0,
      pathKey,
      4.0,
      6.0,
      0,
      0,
  };
  const int cPathIndexStatus = architrino_solver_query_assembly_graph_store_index(
      cReadIndex,
      cIndexCount,
      &cPathQuery,
      cPathIndexRows,
      3,
      &cPathIndexCount);

  const bool ok =
      metadata.storeId == "assembly-store-smoke" &&
      metadata.hasTimeRange &&
      nearly_equal(metadata.timeStart, 0.0) &&
      nearly_equal(metadata.timeEnd, 10.0) &&
      metadata.states.rowCount == 2 &&
      metadata.memberships.rowCount == 3 &&
      metadata.hierarchy.rowCount == 1 &&
      metadata.events.rowCount == 2 &&
      metadata.index.layoutId == architrino::solver::BinaryLayoutId::AssemblyGraphIndexV1 &&
      metadata.index.rowSizeBytes == sizeof(architrino::solver::AssemblyGraphStoreIndexRowF64) &&
      metadata.index.rowCount == 12 &&
      metadata.states.byteLength == 2 * sizeof(architrino::solver::AssemblyStateRowF64) &&
      metadata.memberships.byteLength == 3 * sizeof(architrino::solver::AssemblyMembershipRowF64) &&
      metadata.hierarchy.byteLength == sizeof(architrino::solver::AssemblyHierarchyRowF64) &&
      metadata.events.byteLength == 2 * sizeof(architrino::solver::AssemblyEventRowF64) &&
      metadata.index.byteLength == 12 * sizeof(architrino::solver::AssemblyGraphStoreIndexRowF64) &&
      std::filesystem::file_size(statePath) == metadata.states.byteLength &&
      std::filesystem::file_size(membershipPath) == metadata.memberships.byteLength &&
      std::filesystem::file_size(metadata.index.path) == metadata.index.byteLength &&
      storedStates.size() == 2 &&
      storedMemberships.size() == 3 &&
      storedHierarchy.size() == 1 &&
      storedEvents.size() == 2 &&
      storedIndex.size() == 12 &&
      storedStates[1].assemblyStateKey == state1.assemblyStateKey &&
      storedMemberships[2].assemblyKey == 0 &&
      storedHierarchy[0].parentAssemblyKey == parentKey &&
      storedIndex[0].layoutCode ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyState) &&
      storedIndex[0].keyKind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyGraphStoreIndexKeyKind::Assembly) &&
      storedIndex[0].byteLength == sizeof(architrino::solver::AssemblyStateRowF64) &&
      storedEvents[1].eventKind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipLeave) &&
      pathWindow.size() == 2 &&
      stateWindow.size() == 2 &&
      hierarchyWindow.size() == 1 &&
      eventWindow.size() == 2 &&
      membershipAtSix.has_value() &&
      membershipAtSix->assemblyStateKey == state1.assemblyStateKey &&
      pathIndexRows.size() == 2 &&
      pathIndexRows[1].rowOffset == 1 &&
      assemblyIndexRows.size() == 2 &&
      membershipByteRows.size() == 1 &&
      membershipByteRows[0].rowOffset == 1 &&
      contains(manifest, "\"layout\": \"assembly_state.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_membership.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_hierarchy.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_events.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_graph_index.v1\"") &&
      cWriteStatus == 0 &&
      cSummary.state_count == 2 &&
      cSummary.membership_count == 3 &&
      cSummary.hierarchy_count == 1 &&
      cSummary.event_count == 2 &&
      cSummary.index_count == 12 &&
      cSummary.state_byte_length == 2 * sizeof(ArchitrinoSolverAssemblyStateRowF64) &&
      cSummary.membership_byte_length == 3 * sizeof(ArchitrinoSolverAssemblyMembershipRowF64) &&
      cSummary.index_byte_length == 12 * sizeof(ArchitrinoSolverAssemblyGraphStoreIndexRowF64) &&
      cSummary.has_time_range == 1 &&
      cSummary.durable == 1 &&
      nearly_equal(cSummary.time_start, 0.0) &&
      nearly_equal(cSummary.time_end, 10.0) &&
      cStateStatus == 0 &&
      cStateCount == 2 &&
      cReadStates[1].assembly_state_key == state1.assemblyStateKey &&
      cMembershipStatus == 0 &&
      cMembershipCount == 3 &&
      cReadMemberships[1].assembly_state_key == state1.assemblyStateKey &&
      cEventStatus == 0 &&
      cEventCount == 2 &&
      cReadEvents[1].event_kind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipLeave) &&
      cProbeIndexStatus == -3 &&
      cProbeIndexCount == 12 &&
      cIndexStatus == 0 &&
      cIndexCount == 12 &&
      cReadIndex[0].layout_code ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyGraphStoreIndexLayout::AssemblyState) &&
      cPathIndexStatus == 0 &&
      cPathIndexCount == 2 &&
      cPathIndexRows[1].row_offset == 1;

  if (!ok) {
    std::cerr << "solver assembly graph store smoke failed\n";
    return 1;
  }

  std::cout << "solver assembly-store=ok states=" << metadata.states.rowCount
            << " memberships=" << metadata.memberships.rowCount
            << " events=" << metadata.events.rowCount << '\n';
  return 0;
}

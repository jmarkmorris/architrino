#include "architrino/solver/AssemblyGraphStore.hpp"

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

}  // namespace

int main() {
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
  const std::string manifest = read_text(metadataPath);

  const bool ok =
      metadata.storeId == "assembly-store-smoke" &&
      metadata.hasTimeRange &&
      nearly_equal(metadata.timeStart, 0.0) &&
      nearly_equal(metadata.timeEnd, 10.0) &&
      metadata.states.rowCount == 2 &&
      metadata.memberships.rowCount == 3 &&
      metadata.hierarchy.rowCount == 1 &&
      metadata.events.rowCount == 2 &&
      metadata.states.byteLength == 2 * sizeof(architrino::solver::AssemblyStateRowF64) &&
      metadata.memberships.byteLength == 3 * sizeof(architrino::solver::AssemblyMembershipRowF64) &&
      metadata.hierarchy.byteLength == sizeof(architrino::solver::AssemblyHierarchyRowF64) &&
      metadata.events.byteLength == 2 * sizeof(architrino::solver::AssemblyEventRowF64) &&
      std::filesystem::file_size(statePath) == metadata.states.byteLength &&
      std::filesystem::file_size(membershipPath) == metadata.memberships.byteLength &&
      storedStates.size() == 2 &&
      storedMemberships.size() == 3 &&
      storedHierarchy.size() == 1 &&
      storedEvents.size() == 2 &&
      storedStates[1].assemblyStateKey == state1.assemblyStateKey &&
      storedMemberships[2].assemblyKey == 0 &&
      storedHierarchy[0].parentAssemblyKey == parentKey &&
      storedEvents[1].eventKind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipLeave) &&
      pathWindow.size() == 2 &&
      stateWindow.size() == 2 &&
      hierarchyWindow.size() == 1 &&
      eventWindow.size() == 2 &&
      membershipAtSix.has_value() &&
      membershipAtSix->assemblyStateKey == state1.assemblyStateKey &&
      contains(manifest, "\"layout\": \"assembly_state.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_membership.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_hierarchy.v1\"") &&
      contains(manifest, "\"layout\": \"assembly_events.v1\"");

  if (!ok) {
    std::cerr << "solver assembly graph store smoke failed\n";
    return 1;
  }

  std::cout << "solver assembly-store=ok states=" << metadata.states.rowCount
            << " memberships=" << metadata.memberships.rowCount
            << " events=" << metadata.events.rowCount << '\n';
  return 0;
}

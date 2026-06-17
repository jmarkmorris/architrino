#include "architrino/solver/AssemblyGraph.hpp"
#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>
#include <vector>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::AssemblyStateRowF64) == 112);
  static_assert(sizeof(architrino::solver::AssemblyMembershipRowF64) == 80);
  static_assert(sizeof(architrino::solver::AssemblyHierarchyRowF64) == 56);
  static_assert(sizeof(architrino::solver::AssemblyEventRowF64) == 88);

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
  const std::optional<architrino::solver::AssemblyMembershipRowF64> membership =
      architrino::solver::membership_at_time(memberships, pathKey, 6.0);
  const architrino::solver::ValidationReport validation =
      architrino::solver::validate_temporal_assembly_rows({state0, state1}, memberships, {hierarchy});
  architrino::solver::AssemblyMembershipRowF64 invalidMembership = memberships.front();
  invalidMembership.timeEnd = -1.0;
  const architrino::solver::ValidationReport invalid =
      architrino::solver::validate_temporal_assembly_rows({}, {invalidMembership}, {});

  const architrino::solver::BinaryLayoutDescriptor stateLayout =
      architrino::solver::binary_layout_descriptor(architrino::solver::BinaryLayoutId::AssemblyStateV1);
  const architrino::solver::BinaryLayoutDescriptor membershipLayout =
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::AssemblyMembershipV1);
  const architrino::solver::BinaryLayoutDescriptor hierarchyLayout =
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::AssemblyHierarchyV1);
  const architrino::solver::BinaryLayoutDescriptor eventLayout =
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::AssemblyEventsV1);
  const ArchitrinoSolverAssemblyMembershipRowF64 abiMemberships[3]{
      ArchitrinoSolverAssemblyMembershipRowF64{
          memberships[0].membershipKey,
          memberships[0].pathKey,
          memberships[0].assemblyKey,
          memberships[0].assemblyStateKey,
          memberships[0].timeStart,
          memberships[0].timeEnd,
          memberships[0].confidence,
          memberships[0].localRole,
          memberships[0].bindingState,
          memberships[0].membershipVersion,
          memberships[0].eventKind,
          memberships[0].statusFlags,
          memberships[0].reserved0,
      },
      ArchitrinoSolverAssemblyMembershipRowF64{
          memberships[1].membershipKey,
          memberships[1].pathKey,
          memberships[1].assemblyKey,
          memberships[1].assemblyStateKey,
          memberships[1].timeStart,
          memberships[1].timeEnd,
          memberships[1].confidence,
          memberships[1].localRole,
          memberships[1].bindingState,
          memberships[1].membershipVersion,
          memberships[1].eventKind,
          memberships[1].statusFlags,
          memberships[1].reserved0,
      },
      ArchitrinoSolverAssemblyMembershipRowF64{
          memberships[2].membershipKey,
          memberships[2].pathKey,
          memberships[2].assemblyKey,
          memberships[2].assemblyStateKey,
          memberships[2].timeStart,
          memberships[2].timeEnd,
          memberships[2].confidence,
          memberships[2].localRole,
          memberships[2].bindingState,
          memberships[2].membershipVersion,
          memberships[2].eventKind,
          memberships[2].statusFlags,
          memberships[2].reserved0,
      },
  };
  ArchitrinoSolverAssemblyEventRowF64 abiEvents[3]{};
  int abiEventCount = 0;
  const int abiStatus =
      architrino_solver_detect_assembly_membership_events_f64(
          abiMemberships,
          3,
          abiEvents,
          3,
          &abiEventCount);
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();

  const bool ok =
      state0.assemblyKey == assemblyKey &&
      state0.assemblyStateKey != state1.assemblyStateKey &&
      nearly_equal(state0.centerX, 1.0) &&
      nearly_equal(state1.phase, 0.75) &&
      membership.has_value() &&
      membership->assemblyStateKey == state1.assemblyStateKey &&
      membership->localRole == 2 &&
      hierarchy.parentAssemblyKey == parentKey &&
      hierarchy.childAssemblyKey == assemblyKey &&
      events.size() == 2 &&
      events[0].eventKind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipChanged) &&
      events[0].primaryId == pathKey &&
      events[0].priorStateKey == state0.assemblyStateKey &&
      events[0].nextStateKey == state1.assemblyStateKey &&
      events[1].eventKind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipLeave) &&
      nearly_equal(events[1].eventTime, 8.0) &&
      validation.ok &&
      !invalid.ok &&
      stateLayout.rowSizeBytes == 112 &&
      membershipLayout.rowSizeBytes == 80 &&
      hierarchyLayout.rowSizeBytes == 56 &&
      eventLayout.rowSizeBytes == 88 &&
      abiStatus == 0 &&
      abiEventCount == 2 &&
      abiEvents[0].event_kind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipChanged) &&
      abiEvents[1].event_kind ==
          static_cast<std::uint32_t>(architrino::solver::AssemblyEventKind::MembershipLeave) &&
      abiInfo.assembly_state_row_f64_bytes == 112 &&
      abiInfo.assembly_membership_row_f64_bytes == 80 &&
      abiInfo.assembly_hierarchy_row_f64_bytes == 56 &&
      abiInfo.assembly_event_row_f64_bytes == 88;

  if (!ok) {
    std::cerr << "solver assembly graph smoke failed\n";
    return 1;
  }

  std::cout << "solver assembly-graph=ok events=" << events.size() << '\n';
  return 0;
}

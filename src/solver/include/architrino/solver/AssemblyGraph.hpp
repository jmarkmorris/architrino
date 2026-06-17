#pragma once

#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/SolverTypes.hpp"

#include <cstdint>
#include <optional>
#include <string_view>
#include <vector>

namespace architrino::solver {

enum class AssemblyEventKind : std::uint32_t {
  None = 0,
  MembershipEnter = 1,
  MembershipLeave = 2,
  MembershipChanged = 3,
  HierarchyChanged = 4,
  Split = 5,
  Merge = 6,
  Threshold = 7,
  SelfAction = 8,
  AmbiguousMembership = 9,
};

struct AssemblyStateRowF64 {
  std::uint64_t assemblyKey = 0;
  std::uint64_t assemblyStateKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  double centerX = 0.0;
  double centerY = 0.0;
  double centerZ = 0.0;
  double velocityX = 0.0;
  double velocityY = 0.0;
  double velocityZ = 0.0;
  double phase = 0.0;
  std::int64_t cycleIndex = 0;
  std::uint32_t modelVersion = 0;
  std::uint32_t statusFlags = 0;
  std::uint32_t fidelityFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct AssemblyMembershipRowF64 {
  std::uint64_t membershipKey = 0;
  std::uint64_t pathKey = 0;
  std::uint64_t assemblyKey = 0;
  std::uint64_t assemblyStateKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  double confidence = 1.0;
  std::uint32_t localRole = 0;
  std::uint32_t bindingState = 0;
  std::uint32_t membershipVersion = 0;
  std::uint32_t eventKind = static_cast<std::uint32_t>(AssemblyEventKind::None);
  std::uint32_t statusFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct AssemblyHierarchyRowF64 {
  std::uint64_t hierarchyKey = 0;
  std::uint64_t parentAssemblyKey = 0;
  std::uint64_t childAssemblyKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint32_t relationType = 0;
  std::uint32_t hierarchyVersion = 0;
  std::uint32_t statusFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct AssemblyEventRowF64 {
  std::uint64_t eventKey = 0;
  std::uint64_t primaryId = 0;
  std::uint64_t secondaryId = 0;
  std::uint64_t priorStateKey = 0;
  std::uint64_t nextStateKey = 0;
  std::uint64_t relatedPathKey = 0;
  std::uint64_t relatedAssemblyKey = 0;
  std::uint64_t branchTransitionKey = 0;
  double eventTime = 0.0;
  std::uint32_t eventKind = static_cast<std::uint32_t>(AssemblyEventKind::None);
  std::uint32_t speedRegime = 0;
  std::uint32_t statusFlags = 0;
  std::uint32_t reserved0 = 0;
};

struct AssemblyStateInput {
  std::string_view assemblyId;
  std::string_view stateId;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  Vector3 center;
  Vector3 velocity;
  double phase = 0.0;
  std::int64_t cycleIndex = 0;
  std::uint32_t modelVersion = 1;
  std::uint32_t statusFlags = 0;
  std::uint32_t fidelityFlags = 0;
};

struct AssemblyMembershipInput {
  std::string_view membershipId;
  std::uint64_t pathKey = 0;
  std::uint64_t assemblyKey = 0;
  std::uint64_t assemblyStateKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  double confidence = 1.0;
  std::uint32_t localRole = 0;
  std::uint32_t bindingState = 0;
  std::uint32_t membershipVersion = 1;
  std::uint32_t statusFlags = 0;
};

std::uint64_t stable_identity_key(std::string_view identity);
AssemblyStateRowF64 make_assembly_state_row(const AssemblyStateInput& input);
AssemblyMembershipRowF64 make_assembly_membership_row(const AssemblyMembershipInput& input);
AssemblyHierarchyRowF64 make_assembly_hierarchy_row(std::string_view hierarchyId,
                                                    std::uint64_t parentAssemblyKey,
                                                    std::uint64_t childAssemblyKey,
                                                    double timeStart,
                                                    double timeEnd,
                                                    std::uint32_t relationType,
                                                    std::uint32_t hierarchyVersion = 1,
                                                    std::uint32_t statusFlags = 0);
std::vector<AssemblyEventRowF64> detect_membership_change_events(
    std::vector<AssemblyMembershipRowF64> memberships);
std::optional<AssemblyMembershipRowF64> membership_at_time(
    const std::vector<AssemblyMembershipRowF64>& memberships,
    std::uint64_t pathKey,
    double time);
ValidationReport validate_temporal_assembly_rows(const std::vector<AssemblyStateRowF64>& states,
                                                 const std::vector<AssemblyMembershipRowF64>& memberships,
                                                 const std::vector<AssemblyHierarchyRowF64>& hierarchy);

}  // namespace architrino::solver

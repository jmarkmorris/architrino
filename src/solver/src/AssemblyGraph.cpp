#include "architrino/solver/AssemblyGraph.hpp"

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <limits>
#include <string>

static_assert(sizeof(architrino::solver::AssemblyStateRowF64) == 112);
static_assert(sizeof(architrino::solver::AssemblyMembershipRowF64) == 80);
static_assert(sizeof(architrino::solver::AssemblyHierarchyRowF64) == 56);
static_assert(sizeof(architrino::solver::AssemblyEventRowF64) == 88);

namespace architrino::solver {
namespace {

constexpr std::uint64_t kFnvOffsetBasis = 14695981039346656037ULL;
constexpr std::uint64_t kFnvPrime = 1099511628211ULL;

bool finite_ordered_interval(double start, double end) {
  return std::isfinite(start) && std::isfinite(end) && end >= start;
}

std::uint64_t derive_event_key(const AssemblyMembershipRowF64& prior,
                               const AssemblyMembershipRowF64& next,
                               AssemblyEventKind kind) {
  std::uint64_t hash = kFnvOffsetBasis;
  const std::uint64_t values[] = {
      prior.membershipKey,
      next.membershipKey,
      prior.pathKey,
      prior.assemblyKey,
      next.assemblyKey,
      static_cast<std::uint64_t>(kind),
  };
  for (const std::uint64_t value : values) {
    for (std::size_t byte = 0; byte < sizeof(value); ++byte) {
      hash ^= static_cast<unsigned char>((value >> (byte * 8U)) & 0xffU);
      hash *= kFnvPrime;
    }
  }
  return hash;
}

bool membership_identity_changed(const AssemblyMembershipRowF64& prior,
                                 const AssemblyMembershipRowF64& next) {
  return prior.assemblyKey != next.assemblyKey ||
         prior.assemblyStateKey != next.assemblyStateKey ||
         prior.localRole != next.localRole ||
         prior.bindingState != next.bindingState;
}

AssemblyEventKind membership_event_kind(const AssemblyMembershipRowF64& prior,
                                        const AssemblyMembershipRowF64& next) {
  if (prior.assemblyKey == 0 && next.assemblyKey != 0) {
    return AssemblyEventKind::MembershipEnter;
  }
  if (prior.assemblyKey != 0 && next.assemblyKey == 0) {
    return AssemblyEventKind::MembershipLeave;
  }
  return AssemblyEventKind::MembershipChanged;
}

AssemblyEventRowF64 make_membership_event(const AssemblyMembershipRowF64& prior,
                                          const AssemblyMembershipRowF64& next,
                                          AssemblyEventKind kind) {
  return AssemblyEventRowF64{
      derive_event_key(prior, next, kind),
      next.pathKey,
      next.assemblyKey,
      prior.assemblyStateKey,
      next.assemblyStateKey,
      next.pathKey,
      next.assemblyKey,
      0,
      next.timeStart,
      static_cast<std::uint32_t>(kind),
      0,
      next.statusFlags,
      0,
  };
}

void add_interval_status(ValidationReport& report,
                         bool valid,
                         std::string message,
                         std::string stage) {
  if (!valid) {
    report.add(StatusCode::AppContractError,
               StatusSeverity::Error,
               std::move(message),
               std::move(stage),
               false);
  }
}

}  // namespace

std::uint64_t stable_identity_key(std::string_view identity) {
  std::uint64_t hash = kFnvOffsetBasis;
  for (const char ch : identity) {
    hash ^= static_cast<unsigned char>(ch);
    hash *= kFnvPrime;
  }
  return hash;
}

AssemblyStateRowF64 make_assembly_state_row(const AssemblyStateInput& input) {
  return AssemblyStateRowF64{
      stable_identity_key(input.assemblyId),
      stable_identity_key(input.stateId),
      input.timeStart,
      input.timeEnd,
      input.center.x,
      input.center.y,
      input.center.z,
      input.velocity.x,
      input.velocity.y,
      input.velocity.z,
      input.phase,
      input.cycleIndex,
      input.modelVersion,
      input.statusFlags,
      input.fidelityFlags,
      0,
  };
}

AssemblyMembershipRowF64 make_assembly_membership_row(const AssemblyMembershipInput& input) {
  return AssemblyMembershipRowF64{
      stable_identity_key(input.membershipId),
      input.pathKey,
      input.assemblyKey,
      input.assemblyStateKey,
      input.timeStart,
      input.timeEnd,
      input.confidence,
      input.localRole,
      input.bindingState,
      input.membershipVersion,
      static_cast<std::uint32_t>(AssemblyEventKind::None),
      input.statusFlags,
      0,
  };
}

AssemblyHierarchyRowF64 make_assembly_hierarchy_row(std::string_view hierarchyId,
                                                    std::uint64_t parentAssemblyKey,
                                                    std::uint64_t childAssemblyKey,
                                                    double timeStart,
                                                    double timeEnd,
                                                    std::uint32_t relationType,
                                                    std::uint32_t hierarchyVersion,
                                                    std::uint32_t statusFlags) {
  return AssemblyHierarchyRowF64{
      stable_identity_key(hierarchyId),
      parentAssemblyKey,
      childAssemblyKey,
      timeStart,
      timeEnd,
      relationType,
      hierarchyVersion,
      statusFlags,
      0,
  };
}

std::vector<AssemblyEventRowF64> detect_membership_change_events(
    std::vector<AssemblyMembershipRowF64> memberships) {
  std::stable_sort(memberships.begin(),
                   memberships.end(),
                   [](const AssemblyMembershipRowF64& left, const AssemblyMembershipRowF64& right) {
                     if (left.pathKey != right.pathKey) {
                       return left.pathKey < right.pathKey;
                     }
                     if (left.timeStart != right.timeStart) {
                       return left.timeStart < right.timeStart;
                     }
                     return left.membershipKey < right.membershipKey;
                   });

  std::vector<AssemblyEventRowF64> events;
  for (std::size_t index = 1; index < memberships.size(); ++index) {
    const AssemblyMembershipRowF64& prior = memberships[index - 1];
    const AssemblyMembershipRowF64& next = memberships[index];
    if (prior.pathKey != next.pathKey) {
      continue;
    }
    if (next.timeStart < prior.timeStart) {
      continue;
    }
    if (membership_identity_changed(prior, next)) {
      const AssemblyEventKind kind = membership_event_kind(prior, next);
      events.push_back(make_membership_event(prior, next, kind));
    }
  }
  return events;
}

std::optional<AssemblyMembershipRowF64> membership_at_time(
    const std::vector<AssemblyMembershipRowF64>& memberships,
    std::uint64_t pathKey,
    double time) {
  if (!std::isfinite(time)) {
    return std::nullopt;
  }
  for (const AssemblyMembershipRowF64& row : memberships) {
    if (row.pathKey == pathKey && row.timeStart <= time && time < row.timeEnd) {
      return row;
    }
  }
  return std::nullopt;
}

ValidationReport validate_temporal_assembly_rows(
    const std::vector<AssemblyStateRowF64>& states,
    const std::vector<AssemblyMembershipRowF64>& memberships,
    const std::vector<AssemblyHierarchyRowF64>& hierarchy) {
  ValidationReport report;
  for (const AssemblyStateRowF64& row : states) {
    add_interval_status(report,
                        row.assemblyKey != 0 && row.assemblyStateKey != 0,
                        "assembly state rows require assembly and state keys",
                        "assembly-state");
    add_interval_status(report,
                        finite_ordered_interval(row.timeStart, row.timeEnd),
                        "assembly state interval must be finite and ordered",
                        "assembly-state");
  }
  for (const AssemblyMembershipRowF64& row : memberships) {
    add_interval_status(report,
                        row.membershipKey != 0 && row.pathKey != 0,
                        "assembly membership rows require membership and path keys",
                        "assembly-membership");
    add_interval_status(report,
                        finite_ordered_interval(row.timeStart, row.timeEnd),
                        "assembly membership interval must be finite and ordered",
                        "assembly-membership");
    add_interval_status(report,
                        std::isfinite(row.confidence) && row.confidence >= 0.0 && row.confidence <= 1.0,
                        "assembly membership confidence must be finite and in [0, 1]",
                        "assembly-membership");
  }
  for (const AssemblyHierarchyRowF64& row : hierarchy) {
    add_interval_status(report,
                        row.hierarchyKey != 0 && row.parentAssemblyKey != 0 &&
                            row.childAssemblyKey != 0,
                        "assembly hierarchy rows require hierarchy, parent, and child keys",
                        "assembly-hierarchy");
    add_interval_status(report,
                        finite_ordered_interval(row.timeStart, row.timeEnd),
                        "assembly hierarchy interval must be finite and ordered",
                        "assembly-hierarchy");
  }
  return report;
}

}  // namespace architrino::solver

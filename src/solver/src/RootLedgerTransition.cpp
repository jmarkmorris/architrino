#include "architrino/solver/RootLedgerTransition.hpp"

#include <algorithm>
#include <cmath>
#include <map>
#include <string>

namespace architrino::solver {
namespace {

constexpr std::uint64_t kFnvOffsetBasis = 14695981039346656037ULL;
constexpr std::uint64_t kFnvPrime = 1099511628211ULL;

std::uint64_t fnv_append_u64(std::uint64_t hash, std::uint64_t value) {
  for (int index = 0; index < 8; ++index) {
    hash ^= static_cast<unsigned char>((value >> (index * 8)) & 0xffU);
    hash *= kFnvPrime;
  }
  return hash;
}

bool is_entry_kind(const RootLedgerDetailRowF64& row, RootLedgerEntryKind kind) {
  return row.entryKind == static_cast<std::uint32_t>(kind);
}

bool is_failure_row(const RootLedgerDetailRowF64& row) {
  return is_entry_kind(row, RootLedgerEntryKind::Failure) ||
         row.statusCode == static_cast<std::uint32_t>(StatusCode::InsufficientHistoryDepth) ||
         row.statusCode == static_cast<std::uint32_t>(StatusCode::RootUnresolved);
}

bool is_active_root(const RootLedgerDetailRowF64& row) {
  return is_entry_kind(row, RootLedgerEntryKind::ActiveRoot) && row.rootKey != 0;
}

bool intervals_overlap(const RootLedgerDetailRowF64& left, const RootLedgerDetailRowF64& right) {
  return std::isfinite(left.intervalStart) && std::isfinite(left.intervalEnd) &&
         std::isfinite(right.intervalStart) && std::isfinite(right.intervalEnd) &&
         std::max(left.intervalStart, right.intervalStart) <=
             std::min(left.intervalEnd, right.intervalEnd);
}

bool is_fold_transition(const RootLedgerDetailRowF64& prior, const RootLedgerDetailRowF64& next) {
  const std::uint32_t negative =
      static_cast<std::uint32_t>(RootLedgerJacobianSignStratum::Negative);
  const std::uint32_t nearZero =
      static_cast<std::uint32_t>(RootLedgerJacobianSignStratum::NearZero);
  const std::uint32_t positive =
      static_cast<std::uint32_t>(RootLedgerJacobianSignStratum::Positive);
  if (prior.jacobianSignStratum == nearZero || next.jacobianSignStratum == nearZero) {
    return true;
  }
  if ((prior.jacobianSignStratum == negative && next.jacobianSignStratum == positive) ||
      (prior.jacobianSignStratum == positive && next.jacobianSignStratum == negative)) {
    return true;
  }
  return prior.statusCode == static_cast<std::uint32_t>(StatusCode::SmallJacobian) ||
         next.statusCode == static_cast<std::uint32_t>(StatusCode::SmallJacobian) ||
         prior.statusCode == static_cast<std::uint32_t>(StatusCode::TransversalityFloorFailed) ||
         next.statusCode == static_cast<std::uint32_t>(StatusCode::TransversalityFloorFailed);
}

std::uint64_t transition_key(RootLedgerTransitionKind kind,
                             std::uint64_t priorRootKey,
                             std::uint64_t nextRootKey,
                             std::uint64_t sourceKey,
                             std::uint64_t receiverKey) {
  std::uint64_t hash = kFnvOffsetBasis;
  hash = fnv_append_u64(hash, static_cast<std::uint64_t>(kind));
  hash = fnv_append_u64(hash, priorRootKey);
  hash = fnv_append_u64(hash, nextRootKey);
  hash = fnv_append_u64(hash, sourceKey);
  hash = fnv_append_u64(hash, receiverKey);
  return hash;
}

RootLedgerTransitionRow make_transition(RootLedgerTransitionKind kind,
                                        const RootLedgerDetailRowF64* prior,
                                        const RootLedgerDetailRowF64* next,
                                        StatusCode statusCode) {
  const std::uint64_t priorRootKey = prior != nullptr ? prior->rootKey : 0;
  const std::uint64_t nextRootKey = next != nullptr ? next->rootKey : 0;
  const std::uint64_t sourceKey =
      next != nullptr ? next->sourceKey : (prior != nullptr ? prior->sourceKey : 0);
  const std::uint64_t receiverKey =
      next != nullptr ? next->receiverKey : (prior != nullptr ? prior->receiverKey : 0);
  const double intervalStart =
      prior != nullptr ? prior->intervalStart : (next != nullptr ? next->intervalStart : 0.0);
  const double intervalEnd =
      next != nullptr ? next->intervalEnd : (prior != nullptr ? prior->intervalEnd : 0.0);
  return RootLedgerTransitionRow{
      transition_key(kind, priorRootKey, nextRootKey, sourceKey, receiverKey),
      priorRootKey,
      nextRootKey,
      sourceKey,
      receiverKey,
      intervalStart,
      intervalEnd,
      static_cast<std::uint32_t>(kind),
      prior != nullptr ? prior->entryKind : 0,
      next != nullptr ? next->entryKind : 0,
      prior != nullptr ? prior->statusCode : 0,
      next != nullptr ? next->statusCode : 0,
      prior != nullptr ? prior->jacobianSignStratum : 0,
      next != nullptr ? next->jacobianSignStratum : 0,
      static_cast<std::uint32_t>(statusCode),
      0,
  };
}

bool has_tail_overlap(const std::vector<RootLedgerDetailRowF64>& rows,
                      const RootLedgerDetailRowF64& nextRoot) {
  return std::any_of(rows.begin(), rows.end(), [&nextRoot](const RootLedgerDetailRowF64& row) {
    return is_entry_kind(row, RootLedgerEntryKind::TailBoundary) &&
           row.sourceKey == nextRoot.sourceKey && row.receiverKey == nextRoot.receiverKey &&
           intervals_overlap(row, nextRoot);
  });
}

void add_validation_status(RootLedgerTransitionReport& report,
                           StatusCode code,
                           StatusSeverity severity,
                           std::string message) {
  report.validation.add(code, severity, std::move(message), "root-ledger-transition");
}

}  // namespace

std::string_view to_string(RootLedgerTransitionKind value) {
  switch (value) {
    case RootLedgerTransitionKind::Retained:
      return "retained";
    case RootLedgerTransitionKind::Appeared:
      return "appeared";
    case RootLedgerTransitionKind::Disappeared:
      return "disappeared";
    case RootLedgerTransitionKind::Folded:
      return "folded";
    case RootLedgerTransitionKind::AssimilatedFromTail:
      return "assimilated_from_tail";
    case RootLedgerTransitionKind::LedgerRerunRequired:
      return "ledger_rerun_required";
  }
  return "unknown";
}

RootLedgerTransitionReport classify_root_ledger_transitions(
    const std::vector<RootLedgerDetailRowF64>& priorRows,
    const std::vector<RootLedgerDetailRowF64>& nextRows) {
  RootLedgerTransitionReport report;
  const bool priorFailed = std::any_of(priorRows.begin(), priorRows.end(), is_failure_row);
  const bool nextFailed = std::any_of(nextRows.begin(), nextRows.end(), is_failure_row);
  if (priorFailed || nextFailed) {
    report.transitions.push_back(make_transition(RootLedgerTransitionKind::LedgerRerunRequired,
                                                 priorRows.empty() ? nullptr : &priorRows.front(),
                                                 nextRows.empty() ? nullptr : &nextRows.front(),
                                                 StatusCode::LedgerRerunRequired));
    add_validation_status(report,
                          StatusCode::LedgerRerunRequired,
                          StatusSeverity::Halt,
                          "root ledger transition classification requires a rerun");
    return report;
  }

  std::map<std::uint64_t, const RootLedgerDetailRowF64*> priorActive;
  std::map<std::uint64_t, const RootLedgerDetailRowF64*> nextActive;
  for (const RootLedgerDetailRowF64& row : priorRows) {
    if (is_active_root(row)) {
      priorActive[row.rootKey] = &row;
    }
  }
  for (const RootLedgerDetailRowF64& row : nextRows) {
    if (is_active_root(row)) {
      nextActive[row.rootKey] = &row;
    }
  }

  for (const auto& [rootKey, prior] : priorActive) {
    const auto nextIter = nextActive.find(rootKey);
    if (nextIter == nextActive.end()) {
      report.transitions.push_back(make_transition(RootLedgerTransitionKind::Disappeared,
                                                   prior,
                                                   nullptr,
                                                   StatusCode::RootNotBracketed));
      continue;
    }
    const RootLedgerDetailRowF64* next = nextIter->second;
    const RootLedgerTransitionKind kind =
        is_fold_transition(*prior, *next) ? RootLedgerTransitionKind::Folded
                                         : RootLedgerTransitionKind::Retained;
    report.transitions.push_back(make_transition(kind, prior, next, StatusCode::Ok));
  }

  for (const auto& [rootKey, next] : nextActive) {
    if (priorActive.contains(rootKey)) {
      continue;
    }
    const RootLedgerTransitionKind kind =
        has_tail_overlap(priorRows, *next) ? RootLedgerTransitionKind::AssimilatedFromTail
                                          : RootLedgerTransitionKind::Appeared;
    report.transitions.push_back(make_transition(kind, nullptr, next, StatusCode::Ok));
  }

  std::stable_sort(report.transitions.begin(),
                   report.transitions.end(),
                   [](const RootLedgerTransitionRow& left, const RootLedgerTransitionRow& right) {
                     return left.transitionKey < right.transitionKey;
                   });

  add_validation_status(report,
                        StatusCode::Ok,
                        StatusSeverity::Ok,
                        "root ledger transitions classified");
  return report;
}

}  // namespace architrino::solver

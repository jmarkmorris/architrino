#pragma once

#include "architrino/solver/RootLedger.hpp"

#include <cstdint>
#include <string_view>
#include <vector>

namespace architrino::solver {

enum class RootLedgerTransitionKind : std::uint32_t {
  Retained = 1,
  Appeared = 2,
  Disappeared = 3,
  Folded = 4,
  AssimilatedFromTail = 5,
  LedgerRerunRequired = 6,
};

struct RootLedgerTransitionRow {
  std::uint64_t transitionKey = 0;
  std::uint64_t priorRootKey = 0;
  std::uint64_t nextRootKey = 0;
  std::uint64_t sourceKey = 0;
  std::uint64_t receiverKey = 0;
  double intervalStart = 0.0;
  double intervalEnd = 0.0;
  std::uint32_t transitionKind = 0;
  std::uint32_t priorEntryKind = 0;
  std::uint32_t nextEntryKind = 0;
  std::uint32_t priorStatusCode = 0;
  std::uint32_t nextStatusCode = 0;
  std::uint32_t priorJacobianSignStratum = 0;
  std::uint32_t nextJacobianSignStratum = 0;
  std::uint32_t statusCode = 0;
  std::uint32_t reserved0 = 0;
};

struct RootLedgerTransitionReport {
  std::vector<RootLedgerTransitionRow> transitions;
  ValidationReport validation;
};

std::string_view to_string(RootLedgerTransitionKind value);

RootLedgerTransitionReport classify_root_ledger_transitions(
    const std::vector<RootLedgerDetailRowF64>& priorRows,
    const std::vector<RootLedgerDetailRowF64>& nextRows);

}  // namespace architrino::solver

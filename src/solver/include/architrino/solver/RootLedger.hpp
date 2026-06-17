#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstdint>
#include <string_view>
#include <vector>

namespace architrino::solver {

enum class RootLedgerEntryKind : std::uint32_t {
  ActiveRoot = 1,
  InactiveGap = 2,
  TailBoundary = 3,
  Transition = 4,
  Failure = 5,
};

enum class RootLedgerRootKind : std::uint32_t {
  Unknown = 0,
  Partner = 1,
  Self = 2,
};

enum class RootLedgerJacobianSignStratum : std::uint32_t {
  Unknown = 0,
  Negative = 1,
  NearZero = 2,
  Positive = 3,
  NonFinite = 4,
};

constexpr std::uint32_t kRootLedgerFirstFailureFlag = 1U;
constexpr std::uint32_t kRootLedgerUnresolvedFlag = 1U << 1U;
constexpr std::uint32_t kRootLedgerSmallJacobianFlag = 1U << 2U;

struct RootLedgerDetailRowF64 {
  std::uint64_t ledgerKey = 0;
  std::uint64_t sourceKey = 0;
  std::uint64_t receiverKey = 0;
  std::uint64_t rootKey = 0;
  double intervalStart = 0.0;
  double intervalEnd = 0.0;
  double emissionTime = 0.0;
  double hitTime = 0.0;
  double delay = 0.0;
  double residual = 0.0;
  double jacobian = 0.0;
  double branchWeight = 0.0;
  double bracketStart = 0.0;
  double bracketEnd = 0.0;
  double sourceX = 0.0;
  double sourceY = 0.0;
  double sourceZ = 0.0;
  double receiverX = 0.0;
  double receiverY = 0.0;
  double receiverZ = 0.0;
  std::uint32_t entryKind = 0;
  std::uint32_t rootKind = 0;
  std::uint32_t statusCode = 0;
  std::uint32_t jacobianSignStratum = 0;
  std::uint32_t sequenceIndex = 0;
  std::uint32_t iterationCount = 0;
  std::uint32_t stateFlags = 0;
  std::uint32_t reserved0 = 0;
};

std::uint64_t stable_root_ledger_key(std::string_view value);
std::vector<RootLedgerDetailRowF64> build_root_ledger_detail(
    const CausalRootRequest& request,
    const CausalRootResult& result);

}  // namespace architrino::solver

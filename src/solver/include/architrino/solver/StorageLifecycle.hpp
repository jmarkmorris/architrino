#pragma once

#include "architrino/solver/PathHistoryStream.hpp"

#include <cstdint>
#include <string_view>
#include <vector>

namespace architrino::solver {

constexpr std::uint32_t kPathHistoryChunkPinnedActiveFlag = 1U;
constexpr std::uint32_t kPathHistoryChunkDeepIndexBuiltFlag = 1U << 1U;

enum class StorageLifecycleTier {
  Active,
  Warm,
  Cold,
  Deleted,
};

enum class StorageLifecycleAction {
  KeepActive,
  SpillWarm,
  ArchiveCold,
  BuildDeepIndex,
  Delete,
  BlockedUnsafe,
};

struct StorageLifecyclePolicy {
  double activeWindowStart = 0.0;
  double activeWindowEnd = 0.0;
  bool hasActiveWindow = false;
  bool deepIndexEnabled = false;
  bool exportRequested = false;
  bool failedRun = false;
  bool deleteRequested = false;
  std::uint64_t activeMemoryBudgetBytes = 0;
  std::uint64_t storageBudgetBytes = 0;
};

struct PathHistoryChunkLifecycleDecision {
  std::uint64_t chunkIndex = 0;
  StorageLifecycleTier tier = StorageLifecycleTier::Active;
  StorageLifecycleAction action = StorageLifecycleAction::KeepActive;
  bool safeToAgeOut = false;
  bool requiresDeepIndex = false;
  std::string_view reason;
};

std::string_view to_string(StorageLifecycleTier value);
std::string_view to_string(StorageLifecycleAction value);
std::vector<PathHistoryChunkLifecycleDecision> plan_path_history_storage_lifecycle(
    const StorageLifecyclePolicy& policy,
    const std::vector<PathHistoryChunkRow>& chunks);
bool storage_lifecycle_contract_smoke();

}  // namespace architrino::solver

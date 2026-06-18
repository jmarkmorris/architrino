#include "architrino/solver/StorageLifecycle.hpp"

#include <algorithm>

namespace architrino::solver {
namespace {

bool overlaps_active_window(const StorageLifecyclePolicy& policy,
                            const PathHistoryChunkRow& chunk) {
  return policy.hasActiveWindow &&
         chunk.timeEnd >= policy.activeWindowStart &&
         chunk.timeStart <= policy.activeWindowEnd;
}

bool is_pinned_active(const PathHistoryChunkRow& chunk) {
  return (chunk.stateFlags & kPathHistoryChunkPinnedActiveFlag) != 0;
}

bool has_deep_index(const PathHistoryChunkRow& chunk) {
  return (chunk.stateFlags & kPathHistoryChunkDeepIndexBuiltFlag) != 0;
}

std::uint64_t total_chunk_bytes(const std::vector<PathHistoryChunkRow>& chunks) {
  std::uint64_t total = 0;
  for (const PathHistoryChunkRow& chunk : chunks) {
    total += chunk.byteLength;
  }
  return total;
}

}  // namespace

std::string_view to_string(StorageLifecycleTier value) {
  switch (value) {
    case StorageLifecycleTier::Active:
      return "active";
    case StorageLifecycleTier::Warm:
      return "warm";
    case StorageLifecycleTier::Cold:
      return "cold";
    case StorageLifecycleTier::Deleted:
      return "deleted";
  }
  return "unknown";
}

std::string_view to_string(StorageLifecycleAction value) {
  switch (value) {
    case StorageLifecycleAction::KeepActive:
      return "keep_active";
    case StorageLifecycleAction::SpillWarm:
      return "spill_warm";
    case StorageLifecycleAction::ArchiveCold:
      return "archive_cold";
    case StorageLifecycleAction::BuildDeepIndex:
      return "build_deep_index";
    case StorageLifecycleAction::Delete:
      return "delete";
    case StorageLifecycleAction::BlockedUnsafe:
      return "blocked_unsafe";
  }
  return "unknown";
}

std::vector<PathHistoryChunkLifecycleDecision> plan_path_history_storage_lifecycle(
    const StorageLifecyclePolicy& policy,
    const std::vector<PathHistoryChunkRow>& chunks) {
  std::vector<PathHistoryChunkLifecycleDecision> decisions;
  decisions.reserve(chunks.size());
  const bool storagePressure =
      policy.storageBudgetBytes > 0 && total_chunk_bytes(chunks) > policy.storageBudgetBytes;

  for (const PathHistoryChunkRow& chunk : chunks) {
    if (policy.deleteRequested) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Deleted,
          StorageLifecycleAction::Delete,
          true,
          false,
          "delete requested",
      });
      continue;
    }

    if (policy.failedRun && !policy.exportRequested) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Deleted,
          StorageLifecycleAction::Delete,
          true,
          false,
          "failed run cleanup",
      });
      continue;
    }

    if (overlaps_active_window(policy, chunk)) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Active,
          StorageLifecycleAction::KeepActive,
          false,
          false,
          "overlaps active window",
      });
      continue;
    }

    if (is_pinned_active(chunk)) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Active,
          StorageLifecycleAction::BlockedUnsafe,
          false,
          false,
          "chunk is pinned active",
      });
      continue;
    }

    if (policy.deepIndexEnabled && !has_deep_index(chunk)) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Cold,
          StorageLifecycleAction::BuildDeepIndex,
          true,
          true,
          "aged chunk requires deep index",
      });
      continue;
    }

    if (storagePressure && !policy.exportRequested) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Deleted,
          StorageLifecycleAction::Delete,
          true,
          false,
          "storage pressure without export request",
      });
      continue;
    }

    if (policy.exportRequested || has_deep_index(chunk)) {
      decisions.push_back(PathHistoryChunkLifecycleDecision{
          chunk.chunkIndex,
          StorageLifecycleTier::Cold,
          StorageLifecycleAction::ArchiveCold,
          true,
          false,
          policy.exportRequested ? "export retention requested" : "deep index already built",
      });
      continue;
    }

    decisions.push_back(PathHistoryChunkLifecycleDecision{
        chunk.chunkIndex,
        StorageLifecycleTier::Warm,
        StorageLifecycleAction::SpillWarm,
        true,
        false,
        "aged out of active window",
    });
  }

  return decisions;
}

bool storage_lifecycle_contract_smoke() {
  const std::vector<PathHistoryChunkRow> chunks{
      PathHistoryChunkRow{0, 10, 10, 0, 2, 0, 1, 0.0, 1.0, 0, 192, 1, 0, 0},
      PathHistoryChunkRow{1, 10, 10, 2, 2, 2, 3, 1.0, 2.0, 192, 192, 2, 0, 0},
      PathHistoryChunkRow{
          2,
          10,
          10,
          4,
          2,
          4,
          5,
          2.0,
          3.0,
          384,
          192,
          3,
          kPathHistoryChunkPinnedActiveFlag,
          0,
      },
      PathHistoryChunkRow{
          3,
          10,
          10,
          6,
          2,
          6,
          7,
          3.0,
          4.0,
          576,
          192,
          4,
          kPathHistoryChunkDeepIndexBuiltFlag,
          0,
      },
  };

  StorageLifecyclePolicy policy;
  policy.hasActiveWindow = true;
  policy.activeWindowStart = 0.5;
  policy.activeWindowEnd = 1.5;
  policy.deepIndexEnabled = true;
  const std::vector<PathHistoryChunkLifecycleDecision> decisions =
      plan_path_history_storage_lifecycle(policy, chunks);

  StorageLifecyclePolicy exportPolicy = policy;
  exportPolicy.activeWindowStart = 10.0;
  exportPolicy.activeWindowEnd = 11.0;
  exportPolicy.deepIndexEnabled = false;
  exportPolicy.exportRequested = true;
  const std::vector<PathHistoryChunkLifecycleDecision> exportDecisions =
      plan_path_history_storage_lifecycle(exportPolicy, {chunks[0]});

  StorageLifecyclePolicy failedPolicy;
  failedPolicy.failedRun = true;
  const std::vector<PathHistoryChunkLifecycleDecision> failedDecisions =
      plan_path_history_storage_lifecycle(failedPolicy, {chunks[0]});

  return decisions.size() == 4 &&
         decisions[0].action == StorageLifecycleAction::KeepActive &&
         decisions[1].action == StorageLifecycleAction::KeepActive &&
         decisions[2].action == StorageLifecycleAction::BlockedUnsafe &&
         decisions[3].action == StorageLifecycleAction::ArchiveCold &&
         decisions[3].safeToAgeOut &&
         exportDecisions.size() == 1 &&
         exportDecisions[0].tier == StorageLifecycleTier::Cold &&
         exportDecisions[0].action == StorageLifecycleAction::ArchiveCold &&
         failedDecisions.size() == 1 &&
         failedDecisions[0].tier == StorageLifecycleTier::Deleted &&
         failedDecisions[0].action == StorageLifecycleAction::Delete &&
         to_string(StorageLifecycleTier::Warm) == "warm" &&
         to_string(StorageLifecycleAction::BuildDeepIndex) == "build_deep_index";
}

}  // namespace architrino::solver

#include "architrino/solver/CausalRootBatchSolver.hpp"

#include <algorithm>
#include <atomic>
#include <exception>
#include <sstream>
#include <string>
#include <utility>

#ifndef __EMSCRIPTEN__
#include <thread>
#endif

namespace architrino::solver {
namespace {

void merge_validation(ValidationReport& aggregate, const ValidationReport& child) {
  if (!child.ok) {
    aggregate.ok = false;
  }
  aggregate.statuses.insert(aggregate.statuses.end(), child.statuses.begin(), child.statuses.end());
}

void record_exception(CausalRootBatchItemResult& itemResult,
                      const std::exception& error,
                      std::uint64_t itemId) {
  itemResult.itemId = itemId;
  itemResult.result.validation.add(StatusCode::InternalSolverError,
                                   StatusSeverity::Error,
                                   std::string("batch causal-root worker failed: ") + error.what(),
                                   "causal-root-batch",
                                   false);
}

void record_unknown_exception(CausalRootBatchItemResult& itemResult, std::uint64_t itemId) {
  itemResult.itemId = itemId;
  itemResult.result.validation.add(StatusCode::InternalSolverError,
                                   StatusSeverity::Error,
                                   "batch causal-root worker failed with an unknown exception",
                                   "causal-root-batch",
                                   false);
}

}  // namespace

std::size_t recommended_batch_worker_count(std::size_t itemCount,
                                           std::size_t requestedWorkerCount) {
  if (itemCount == 0) {
    return 0;
  }

#ifdef __EMSCRIPTEN__
  (void)requestedWorkerCount;
  return 1;
#else
  std::size_t hardwareCount = std::thread::hardware_concurrency();
  if (hardwareCount == 0) {
    hardwareCount = 1;
  }
  const std::size_t requestedCount = requestedWorkerCount == 0 ? hardwareCount : requestedWorkerCount;
  return std::max<std::size_t>(1, std::min(itemCount, std::min(requestedCount, hardwareCount)));
#endif
}

CausalRootBatchResult solve_causal_roots_batch(const std::vector<CausalRootBatchItem>& items,
                                               CausalRootBatchOptions options) {
  CausalRootBatchResult batchResult;
  batchResult.items.resize(items.size());
  batchResult.workerCountUsed = recommended_batch_worker_count(items.size(), options.workerCount);

  if (items.empty()) {
    batchResult.validation.add(StatusCode::Ok,
                               StatusSeverity::Ok,
                               "empty causal-root batch solved",
                               "causal-root-batch");
    return batchResult;
  }

  auto solve_one = [&items, &batchResult](std::size_t index) {
    batchResult.items[index].itemId = items[index].itemId;
    try {
      batchResult.items[index].result = solve_causal_roots(items[index].request);
    } catch (const std::exception& error) {
      record_exception(batchResult.items[index], error, items[index].itemId);
    } catch (...) {
      record_unknown_exception(batchResult.items[index], items[index].itemId);
    }
  };

#ifdef __EMSCRIPTEN__
  for (std::size_t index = 0; index < items.size(); ++index) {
    solve_one(index);
  }
#else
  if (batchResult.workerCountUsed <= 1) {
    for (std::size_t index = 0; index < items.size(); ++index) {
      solve_one(index);
    }
  } else {
    std::atomic<std::size_t> nextIndex{0};
    std::vector<std::thread> workers;
    workers.reserve(batchResult.workerCountUsed);
    for (std::size_t workerIndex = 0; workerIndex < batchResult.workerCountUsed; ++workerIndex) {
      workers.emplace_back([&nextIndex, &items, &solve_one]() {
        while (true) {
          const std::size_t index = nextIndex.fetch_add(1, std::memory_order_relaxed);
          if (index >= items.size()) {
            break;
          }
          solve_one(index);
        }
      });
    }
    for (std::thread& worker : workers) {
      worker.join();
    }
  }
#endif

  for (const CausalRootBatchItemResult& itemResult : batchResult.items) {
    merge_validation(batchResult.validation, itemResult.result.validation);
  }
  batchResult.validation.add(StatusCode::Ok,
                             StatusSeverity::Ok,
                             "causal-root batch solved",
                             "causal-root-batch");
  (void)options.deterministicOrder;
  return batchResult;
}

}  // namespace architrino::solver

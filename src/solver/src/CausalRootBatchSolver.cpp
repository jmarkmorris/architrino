#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/ParallelExecution.hpp"

#include <algorithm>
#include <exception>
#include <sstream>
#include <string>
#include <utility>

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
  return plan_parallel_execution(
             itemCount,
             ParallelExecutionOptions{
                 requestedWorkerCount,
                 1,
                 true,
             })
      .workerCount;
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

  parallel_for_index_range(
      items.size(),
      ParallelExecutionOptions{
          options.workerCount,
          1,
          options.deterministicOrder,
      },
      solve_one);

  for (const CausalRootBatchItemResult& itemResult : batchResult.items) {
    merge_validation(batchResult.validation, itemResult.result.validation);
  }
  batchResult.validation.add(StatusCode::Ok,
                             StatusSeverity::Ok,
                             "causal-root batch solved",
                             "causal-root-batch");
  return batchResult;
}

}  // namespace architrino::solver

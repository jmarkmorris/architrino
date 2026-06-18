#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstddef>
#include <cstdint>
#include <vector>

namespace architrino::solver {

struct CausalRootBatchOptions {
  std::size_t workerCount = 1;
  bool deterministicOrder = true;
};

struct CausalRootBatchItem {
  std::uint64_t itemId = 0;
  CausalRootRequest request;
};

struct CausalRootBatchItemResult {
  std::uint64_t itemId = 0;
  CausalRootResult result;
};

struct CausalRootBatchResult {
  std::vector<CausalRootBatchItemResult> items;
  ValidationReport validation;
  std::size_t workerCountUsed = 0;
};

std::size_t recommended_batch_worker_count(std::size_t itemCount, std::size_t requestedWorkerCount);
CausalRootBatchResult solve_causal_roots_batch(const std::vector<CausalRootBatchItem>& items,
                                               CausalRootBatchOptions options = {});

}  // namespace architrino::solver

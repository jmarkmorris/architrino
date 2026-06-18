#pragma once

#include <cstddef>

#ifndef __EMSCRIPTEN__
#include <atomic>
#include <thread>
#include <vector>
#endif

namespace architrino::solver {

struct ParallelExecutionOptions {
  std::size_t requestedWorkerCount = 0;
  std::size_t minItemsPerWorker = 1;
  bool deterministicOrder = true;
};

struct ParallelExecutionPlan {
  std::size_t itemCount = 0;
  std::size_t workerCount = 0;
  bool nativeThreadsEnabled = false;
  bool deterministicOrder = true;
};

std::size_t solver_hardware_worker_count();
ParallelExecutionPlan plan_parallel_execution(std::size_t itemCount,
                                               ParallelExecutionOptions options = {});

template <typename Function>
void parallel_for_index_range(std::size_t itemCount,
                              ParallelExecutionOptions options,
                              Function&& function) {
  const ParallelExecutionPlan plan = plan_parallel_execution(itemCount, options);
  if (plan.workerCount <= 1) {
    for (std::size_t index = 0; index < itemCount; ++index) {
      function(index);
    }
    return;
  }

#ifdef __EMSCRIPTEN__
  for (std::size_t index = 0; index < itemCount; ++index) {
    function(index);
  }
#else
  std::atomic<std::size_t> nextIndex{0};
  std::vector<std::thread> workers;
  workers.reserve(plan.workerCount);
  for (std::size_t workerIndex = 0; workerIndex < plan.workerCount; ++workerIndex) {
    workers.emplace_back([&nextIndex, itemCount, &function]() {
      while (true) {
        const std::size_t index = nextIndex.fetch_add(1, std::memory_order_relaxed);
        if (index >= itemCount) {
          break;
        }
        function(index);
      }
    });
  }
  for (std::thread& worker : workers) {
    worker.join();
  }
#endif
}

}  // namespace architrino::solver

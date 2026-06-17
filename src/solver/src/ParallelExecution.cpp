#include "architrino/solver/ParallelExecution.hpp"

#include <algorithm>
#include <cstddef>

namespace architrino::solver {

std::size_t solver_hardware_worker_count() {
#ifdef __EMSCRIPTEN__
  return 1;
#else
  std::size_t hardwareCount = std::thread::hardware_concurrency();
  if (hardwareCount == 0) {
    hardwareCount = 1;
  }
  return hardwareCount;
#endif
}

ParallelExecutionPlan plan_parallel_execution(std::size_t itemCount,
                                               ParallelExecutionOptions options) {
  if (itemCount == 0) {
    return ParallelExecutionPlan{
        itemCount,
        0,
        false,
        options.deterministicOrder,
    };
  }

#ifdef __EMSCRIPTEN__
  return ParallelExecutionPlan{
      itemCount,
      1,
      false,
      options.deterministicOrder,
  };
#else
  const std::size_t hardwareCount = solver_hardware_worker_count();
  const std::size_t requestedCount =
      options.requestedWorkerCount == 0 ? hardwareCount : options.requestedWorkerCount;
  const std::size_t minItemsPerWorker = std::max<std::size_t>(1, options.minItemsPerWorker);
  const std::size_t maxWorkersByItems =
      std::max<std::size_t>(1, (itemCount + minItemsPerWorker - 1) / minItemsPerWorker);
  const std::size_t workerCount =
      std::max<std::size_t>(
          1,
          std::min(itemCount, std::min(requestedCount, std::min(hardwareCount, maxWorkersByItems))));
  return ParallelExecutionPlan{
      itemCount,
      workerCount,
      workerCount > 1,
      options.deterministicOrder,
  };
#endif
}

}  // namespace architrino::solver

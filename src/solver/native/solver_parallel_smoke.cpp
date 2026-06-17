#include "architrino/solver/ParallelExecution.hpp"

#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  const std::size_t hardware = architrino::solver::solver_hardware_worker_count();
  const architrino::solver::ParallelExecutionPlan emptyPlan =
      architrino::solver::plan_parallel_execution(
          0,
          architrino::solver::ParallelExecutionOptions{4, 1, true});
  const architrino::solver::ParallelExecutionPlan sequentialPlan =
      architrino::solver::plan_parallel_execution(
          5,
          architrino::solver::ParallelExecutionOptions{1, 1, true});
  const architrino::solver::ParallelExecutionPlan requestedPlan =
      architrino::solver::plan_parallel_execution(
          8,
          architrino::solver::ParallelExecutionOptions{2, 1, true});
  const architrino::solver::ParallelExecutionPlan coarsePlan =
      architrino::solver::plan_parallel_execution(
          7,
          architrino::solver::ParallelExecutionOptions{8, 4, true});

  std::vector<std::size_t> values(64, 0);
  architrino::solver::parallel_for_index_range(
      values.size(),
      architrino::solver::ParallelExecutionOptions{2, 4, true},
      [&values](std::size_t index) {
        values[index] = index * index;
      });

  bool valuesOk = true;
  for (std::size_t index = 0; index < values.size(); ++index) {
    valuesOk = valuesOk && values[index] == index * index;
  }

  const std::size_t expectedRequested = std::max<std::size_t>(
      1,
      std::min<std::size_t>(8, std::min<std::size_t>(2, hardware)));
  const std::size_t expectedCoarse = std::max<std::size_t>(
      1,
      std::min<std::size_t>(7, std::min<std::size_t>(8, std::min<std::size_t>(hardware, 2))));
  const bool ok =
      hardware >= 1 &&
      emptyPlan.workerCount == 0 &&
      sequentialPlan.workerCount == 1 &&
      requestedPlan.workerCount == expectedRequested &&
      coarsePlan.workerCount == expectedCoarse &&
      requestedPlan.deterministicOrder &&
      valuesOk;

  if (!ok) {
    std::cerr << "solver parallel smoke failed\n";
    return 1;
  }

  std::cout << "solver parallel=ok hardware=" << hardware
            << " requested-workers=" << requestedPlan.workerCount << '\n';
  return 0;
}

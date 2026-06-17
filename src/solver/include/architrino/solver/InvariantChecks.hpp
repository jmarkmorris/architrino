#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

#include <cstddef>
#include <vector>

namespace architrino::solver {

struct InvariantCheckOptions {
  double rootResidualTolerance = 1e-10;
  double timeTolerance = 1e-10;
  double distanceTolerance = 1e-10;
  double directionTolerance = 1e-10;
  double branchWeightTolerance = 1e-10;
  double smallJacobianTolerance = 1e-12;
};

struct InvariantCheckReport {
  std::size_t rootCount = 0;
  std::size_t hitCount = 0;
  ValidationReport validation;
};

InvariantCheckReport check_root_hit_invariants(
    const std::vector<CausalRoot>& roots,
    const std::vector<DelayedHitEvent>& hits,
    const InvariantCheckOptions& options = InvariantCheckOptions{});

}  // namespace architrino::solver

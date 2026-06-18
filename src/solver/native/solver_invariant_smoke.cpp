#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/InvariantChecks.hpp"

#include <iostream>
#include <vector>

namespace {

architrino::solver::CausalRootRequest make_request() {
  return architrino::solver::CausalRootRequest{
      "receiver",
      "source",
      architrino::solver::LinearPathSegment{
          "source",
          -6.0,
          10.0,
          architrino::solver::Vector3{-5.0, 0.0, 0.0},
          architrino::solver::Vector3{0.5, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      10.0,
      1.0,
      1e-13,
      128,
      50,
  };
}

}  // namespace

int main() {
  const architrino::solver::CausalRootRequest request = make_request();
  const architrino::solver::CausalRootResult roots =
      architrino::solver::solve_causal_roots(request);
  const architrino::solver::DelayedHitResult hits =
      architrino::solver::solve_delayed_hits(request);

  const architrino::solver::InvariantCheckReport passed =
      architrino::solver::check_root_hit_invariants(roots.roots, hits.events);

  std::vector<architrino::solver::DelayedHitEvent> badHits = hits.events;
  badHits[0].unitDirection.x = 0.5;
  const architrino::solver::InvariantCheckReport failed =
      architrino::solver::check_root_hit_invariants(roots.roots, badHits);

  const bool ok = roots.validation.ok && hits.validation.ok && passed.validation.ok &&
                  passed.rootCount == 1 && passed.hitCount == 1 &&
                  passed.validation.statuses.size() == 1 && !failed.validation.ok &&
                  !failed.validation.statuses.empty();

  if (!ok) {
    std::cerr << "solver invariant smoke failed\n";
    return 1;
  }

  std::cout << "solver invariants=ok roots=" << passed.rootCount
            << " hits=" << passed.hitCount << '\n';
  return 0;
}

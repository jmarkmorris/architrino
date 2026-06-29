#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>
#include <string>
#include <vector>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-10) {
  return std::abs(left - right) <= tolerance;
}

architrino::solver::CausalRootRequest make_request(std::uint64_t itemId, double distance) {
  return architrino::solver::CausalRootRequest{
      "receiver-" + std::to_string(itemId),
      "source-" + std::to_string(itemId),
      architrino::solver::LinearPathSegment{
          "source-" + std::to_string(itemId),
          0.0,
          20.0,
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          0.0,
      },
      architrino::solver::LinearPathSegment{
          "receiver-" + std::to_string(itemId),
          0.0,
          20.0,
          architrino::solver::Vector3{distance, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          0.0,
      },
      distance,
      1.0,
      1e-12,
      96,
      64,
  };
}

ArchitrinoSolverCausalRootRequestF64 make_c_request(double distance) {
  return ArchitrinoSolverCausalRootRequestF64{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          20.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          20.0,
          ArchitrinoSolverVector3F64{distance, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      distance,
      1.0,
      1e-12,
      96,
      64,
  };
}

}  // namespace

int main() {
  std::vector<architrino::solver::CausalRootBatchItem> items;
  items.push_back(architrino::solver::CausalRootBatchItem{300, make_request(300, 4.0)});
  items.push_back(architrino::solver::CausalRootBatchItem{100, make_request(100, 8.0)});
  items.push_back(architrino::solver::CausalRootBatchItem{200, make_request(200, 12.0)});
  items.push_back(architrino::solver::CausalRootBatchItem{400, make_request(400, 16.0)});

  const architrino::solver::CausalRootBatchResult result =
      architrino::solver::solve_causal_roots_batch(
          items,
          architrino::solver::CausalRootBatchOptions{2, true});

  const bool ok =
      result.validation.ok &&
      result.workerCountUsed == 2 &&
      result.items.size() == items.size() &&
      result.items[0].itemId == 300 &&
      result.items[1].itemId == 100 &&
      result.items[2].itemId == 200 &&
      result.items[3].itemId == 400 &&
      result.items[0].result.roots.size() == 1 &&
      result.items[1].result.roots.size() == 1 &&
      result.items[2].result.roots.size() == 1 &&
      result.items[3].result.roots.size() == 1 &&
      nearly_equal(result.items[0].result.roots[0].emissionTime, 0.0) &&
      nearly_equal(result.items[1].result.roots[0].distance, 8.0) &&
      nearly_equal(result.items[2].result.roots[0].hitTime, 12.0) &&
      nearly_equal(result.items[3].result.roots[0].branchWeight, 1.0);

  if (!ok) {
    std::cerr << "causal-root batch smoke failed\n";
    return 1;
  }

  ArchitrinoSolverCausalRootRequestF64 cRequests[2] = {
      make_c_request(3.0),
      make_c_request(6.0),
  };
  ArchitrinoSolverCausalRootBatchItemRowF64 itemRows[2] = {};
  ArchitrinoSolverCausalRootRowF64 rootRows[4] = {};
  int outItemCount = 0;
  int outRootCount = 0;
  const int cStatus = architrino_solver_solve_causal_root_batch_f64(
      cRequests,
      2,
      2,
      itemRows,
      2,
      rootRows,
      4,
      &outItemCount,
      &outRootCount);
  const bool cAbiOk =
      cStatus == 0 &&
      outItemCount == 2 &&
      outRootCount == 2 &&
      itemRows[0].item_index == 0 &&
      itemRows[0].root_offset == 0 &&
      itemRows[0].root_count == 1 &&
      itemRows[1].item_index == 1 &&
      itemRows[1].root_offset == 1 &&
      itemRows[1].root_count == 1 &&
      nearly_equal(rootRows[0].distance, 3.0) &&
      nearly_equal(rootRows[0].source_normal_denominator, 1.0) &&
      nearly_equal(rootRows[0].receiver_normal_factor, 1.0) &&
      nearly_equal(rootRows[1].hit_time, 6.0);
  if (!cAbiOk) {
    std::cerr << "causal-root batch C ABI smoke failed\n";
    return 1;
  }

  ArchitrinoSolverCausalRootBatchItemRowF64 hitItemRows[2] = {};
  ArchitrinoSolverCausalRootRowF64 hitRootRows[4] = {};
  ArchitrinoSolverDelayedHitRowF64 hitRows[4] = {};
  int outHitItemCount = 0;
  int outHitRootCount = 0;
  int outHitCount = 0;
  const int cHitStatus = architrino_solver_solve_roots_and_hits_batch_f64(
      cRequests,
      2,
      2,
      hitItemRows,
      2,
      hitRootRows,
      4,
      hitRows,
      4,
      &outHitItemCount,
      &outHitRootCount,
      &outHitCount);
  const bool cHitAbiOk =
      cHitStatus == 0 &&
      outHitItemCount == 2 &&
      outHitRootCount == 2 &&
      outHitCount == 2 &&
      hitItemRows[0].root_offset == 0 &&
      hitItemRows[1].root_offset == 1 &&
      nearly_equal(hitRootRows[0].distance, 3.0) &&
      nearly_equal(hitRows[0].distance, 3.0) &&
      nearly_equal(hitRows[0].strength, 1.0) &&
      nearly_equal(hitRows[0].source_normal_denominator, 1.0) &&
      nearly_equal(hitRows[0].receiver_normal_factor, 1.0) &&
      nearly_equal(hitRows[0].unit_x, 1.0) &&
      nearly_equal(hitRows[1].hit_time, 6.0);
  if (!cHitAbiOk) {
    std::cerr << "roots-and-hits batch C ABI smoke failed\n";
    return 1;
  }

  std::cout << "causal-root batch=ok items=" << result.items.size()
            << " workers=" << result.workerCountUsed << '\n';
  return 0;
}

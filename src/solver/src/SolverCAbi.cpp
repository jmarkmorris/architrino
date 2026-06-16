#include "architrino/solver/SolverCAbi.hpp"

#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/PrecisionDiagnostics.hpp"

#include <algorithm>
#include <cstddef>
#include <limits>
#include <string>

static_assert(sizeof(ArchitrinoSolverVector3F64) == 24);
static_assert(sizeof(ArchitrinoSolverLinearPathSegmentF64) == 72);
static_assert(sizeof(ArchitrinoSolverCausalRootRequestF64) == 176);
static_assert(sizeof(ArchitrinoSolverCausalRootRowF64) == 112);
static_assert(sizeof(ArchitrinoSolverDelayedHitRowF64) == 128);
static_assert(sizeof(ArchitrinoSolverCausalRootBatchItemRowF64) == 24);
static_assert(sizeof(ArchitrinoSolverPrecisionDiagnosticRowF64) == 96);
static_assert(sizeof(ArchitrinoSolverAbiInfo) == 24);
static_assert(offsetof(ArchitrinoSolverCausalRootRequestF64, hit_time) == 144);
static_assert(offsetof(ArchitrinoSolverCausalRootRequestF64, max_iterations) == 168);
static_assert(offsetof(ArchitrinoSolverCausalRootRowF64, emission_time) == 8);
static_assert(offsetof(ArchitrinoSolverCausalRootRowF64, receiver_z) == 104);
static_assert(offsetof(ArchitrinoSolverDelayedHitRowF64, emission_time) == 16);
static_assert(offsetof(ArchitrinoSolverDelayedHitRowF64, unit_z) == 120);
static_assert(offsetof(ArchitrinoSolverCausalRootBatchItemRowF64, root_offset) == 8);
static_assert(offsetof(ArchitrinoSolverCausalRootBatchItemRowF64, root_count) == 12);
static_assert(offsetof(ArchitrinoSolverPrecisionDiagnosticRowF64, time_orders) == 16);
static_assert(offsetof(ArchitrinoSolverPrecisionDiagnosticRowF64, geometry_min) == 88);

namespace {

architrino::solver::Vector3 to_vector(ArchitrinoSolverVector3F64 value) {
  return architrino::solver::Vector3{value.x, value.y, value.z};
}

architrino::solver::LinearPathSegment to_segment(ArchitrinoSolverLinearPathSegmentF64 value,
                                                 const char* pathId) {
  return architrino::solver::LinearPathSegment{
      pathId,
      value.start_time,
      value.end_time,
      to_vector(value.position_at_start),
      to_vector(value.velocity),
      architrino::solver::NumericType::F64,
      value.error_bound,
  };
}

architrino::solver::CausalRootRequest to_request(
    const ArchitrinoSolverCausalRootRequestF64* request,
    int itemIndex = -1) {
  const std::string suffix = itemIndex >= 0 ? "-" + std::to_string(itemIndex) : "";
  return architrino::solver::CausalRootRequest{
      "receiver" + suffix,
      "source" + suffix,
      to_segment(request->source, "source"),
      to_segment(request->receiver, "receiver"),
      request->hit_time,
      request->signal_speed,
      request->root_tolerance,
      request->max_iterations,
      request->scan_subdivisions,
  };
}

ArchitrinoSolverCausalRootRowF64 to_row(const architrino::solver::CausalRoot& root) {
  return ArchitrinoSolverCausalRootRowF64{
      root.rootId,
      static_cast<int>(root.statusCode),
      root.emissionTime,
      root.hitTime,
      root.delay,
      root.distance,
      root.residual,
      root.jacobian,
      root.branchWeight,
      root.sourcePoint.x,
      root.sourcePoint.y,
      root.sourcePoint.z,
      root.receiverPoint.x,
      root.receiverPoint.y,
      root.receiverPoint.z,
  };
}

ArchitrinoSolverDelayedHitRowF64 to_row(const architrino::solver::DelayedHitEvent& hit,
                                        int eventId) {
  return ArchitrinoSolverDelayedHitRowF64{
      eventId,
      hit.rootId,
      static_cast<int>(hit.statusCode),
      0,
      hit.emissionTime,
      hit.hitTime,
      hit.distance,
      hit.jacobian,
      hit.strength,
      hit.emissionPoint.x,
      hit.emissionPoint.y,
      hit.emissionPoint.z,
      hit.receiverPoint.x,
      hit.receiverPoint.y,
      hit.receiverPoint.z,
      hit.unitDirection.x,
      hit.unitDirection.y,
      hit.unitDirection.z,
  };
}

bool root_count_overflows(std::size_t count) {
  return count > static_cast<std::size_t>(std::numeric_limits<int>::max());
}

int first_status_code(const architrino::solver::ValidationReport& validation) {
  if (validation.statuses.empty()) {
    return static_cast<int>(architrino::solver::StatusCode::Ok);
  }
  return static_cast<int>(validation.statuses.front().code);
}

int precision_flags(const architrino::solver::PrecisionDiagnostic& diagnostic) {
  int flags = 0;
  if (diagnostic.scaleNormalizationRecommended) {
    flags |= 1;
  }
  if (diagnostic.extendedPrecisionRecommended) {
    flags |= 2;
  }
  return flags;
}

int copy_roots(const std::vector<architrino::solver::CausalRoot>& source,
               ArchitrinoSolverCausalRootRowF64* roots,
               int maxRoots,
               int* outRootCount) {
  if (root_count_overflows(source.size())) {
    *outRootCount = 0;
    return -4;
  }

  const int requiredRoots = static_cast<int>(source.size());
  *outRootCount = requiredRoots;
  if (roots == nullptr || maxRoots == 0) {
    return requiredRoots == 0 ? 0 : -3;
  }
  if (maxRoots < requiredRoots) {
    return -3;
  }
  for (int index = 0; index < requiredRoots; ++index) {
    roots[index] = to_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

extern "C" int architrino_solver_diagnose_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverPrecisionDiagnosticRowF64* out_diagnostic) {
  if (request == nullptr || out_diagnostic == nullptr) {
    return -1;
  }

  const architrino::solver::PrecisionDiagnostic diagnostic =
      architrino::solver::diagnose_precision(to_request(request));
  *out_diagnostic = ArchitrinoSolverPrecisionDiagnosticRowF64{
      first_status_code(diagnostic.validation),
      static_cast<int>(diagnostic.recommendedPath),
      static_cast<int>(diagnostic.recommendedNumericType),
      precision_flags(diagnostic),
      diagnostic.timeScale.ordersOfMagnitude,
      diagnostic.geometryScale.ordersOfMagnitude,
      diagnostic.speedScale.ordersOfMagnitude,
      diagnostic.toleranceScale.ordersOfMagnitude,
      diagnostic.timeScale.maxMagnitude,
      diagnostic.geometryScale.maxMagnitude,
      diagnostic.speedScale.maxMagnitude,
      diagnostic.toleranceScale.minNonzeroMagnitude,
      diagnostic.timeScale.minNonzeroMagnitude,
      diagnostic.geometryScale.minNonzeroMagnitude,
  };

  return diagnostic.validation.ok ? 0 : -2;
}

int copy_hits(const std::vector<architrino::solver::DelayedHitEvent>& source,
              ArchitrinoSolverDelayedHitRowF64* hits,
              int maxHits,
              int* outHitCount) {
  if (root_count_overflows(source.size())) {
    *outHitCount = 0;
    return -4;
  }

  const int requiredHits = static_cast<int>(source.size());
  *outHitCount = requiredHits;
  if (hits == nullptr || maxHits == 0) {
    return requiredHits == 0 ? 0 : -3;
  }
  if (maxHits < requiredHits) {
    return -3;
  }
  for (int index = 0; index < requiredHits; ++index) {
    hits[index] = to_row(source[static_cast<std::size_t>(index)], index);
  }
  return 0;
}

}  // namespace

extern "C" ArchitrinoSolverAbiInfo architrino_solver_abi_info() {
  return ArchitrinoSolverAbiInfo{
      0,
      1,
      0,
      static_cast<int>(sizeof(ArchitrinoSolverCausalRootRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCausalRootRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverDelayedHitRowF64)),
  };
}

extern "C" int architrino_solver_get_abi_info(ArchitrinoSolverAbiInfo* out_info) {
  if (out_info == nullptr) {
    return -1;
  }
  *out_info = architrino_solver_abi_info();
  return 0;
}

extern "C" int architrino_solver_solve_causal_roots_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count) {
  if (request == nullptr || out_root_count == nullptr || max_roots < 0) {
    return -1;
  }

  const architrino::solver::CausalRootRequest cppRequest = to_request(request);

  const architrino::solver::CausalRootResult result =
      architrino::solver::solve_causal_roots(cppRequest);
  if (!result.validation.ok) {
    *out_root_count = 0;
    return -2;
  }

  return copy_roots(result.roots, roots, max_roots, out_root_count);
}

extern "C" int architrino_solver_solve_roots_and_hits_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_hit_count) {
  if (request == nullptr || out_root_count == nullptr || out_hit_count == nullptr ||
      max_roots < 0 || max_hits < 0) {
    return -1;
  }

  const architrino::solver::CausalRootRequest cppRequest = to_request(request);

  const architrino::solver::CausalRootResult rootResult =
      architrino::solver::solve_causal_roots(cppRequest);
  if (!rootResult.validation.ok) {
    *out_root_count = 0;
    *out_hit_count = 0;
    return -2;
  }

  const architrino::solver::DelayedHitResult hitResult =
      architrino::solver::solve_delayed_hits(cppRequest);
  if (!hitResult.validation.ok) {
    *out_root_count = 0;
    *out_hit_count = 0;
    return -2;
  }

  const int rootStatus = copy_roots(rootResult.roots, roots, max_roots, out_root_count);
  const int hitStatus = copy_hits(hitResult.events, hits, max_hits, out_hit_count);
  if (rootStatus != 0) {
    return rootStatus;
  }
  return hitStatus;
}

extern "C" int architrino_solver_solve_causal_root_batch_f64(
    const ArchitrinoSolverCausalRootRequestF64* requests,
    int request_count,
    int worker_count,
    ArchitrinoSolverCausalRootBatchItemRowF64* items,
    int max_items,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_item_count,
    int* out_root_count) {
  if (requests == nullptr || out_item_count == nullptr || out_root_count == nullptr ||
      request_count < 0 || worker_count < 0 || max_items < 0 || max_roots < 0) {
    return -1;
  }

  *out_item_count = request_count;
  *out_root_count = 0;
  if (items == nullptr || roots == nullptr || max_items < request_count) {
    return request_count == 0 ? 0 : -3;
  }

  std::vector<architrino::solver::CausalRootBatchItem> batchItems;
  batchItems.reserve(static_cast<std::size_t>(request_count));
  for (int index = 0; index < request_count; ++index) {
    batchItems.push_back(architrino::solver::CausalRootBatchItem{
        static_cast<std::uint64_t>(index),
        to_request(&requests[index], index),
    });
  }

  const architrino::solver::CausalRootBatchResult batchResult =
      architrino::solver::solve_causal_roots_batch(
          batchItems,
          architrino::solver::CausalRootBatchOptions{
              static_cast<std::size_t>(worker_count),
              true,
          });

  std::size_t requiredRoots = 0;
  for (const architrino::solver::CausalRootBatchItemResult& itemResult : batchResult.items) {
    if (itemResult.result.roots.size() >
        static_cast<std::size_t>(std::numeric_limits<int>::max()) - requiredRoots) {
      *out_root_count = 0;
      return -4;
    }
    requiredRoots += itemResult.result.roots.size();
    if (root_count_overflows(requiredRoots)) {
      *out_root_count = 0;
      return -4;
    }
  }
  *out_root_count = static_cast<int>(requiredRoots);
  if (max_roots < *out_root_count) {
    return *out_root_count == 0 ? 0 : -3;
  }

  int rootOffset = 0;
  for (int itemIndex = 0; itemIndex < request_count; ++itemIndex) {
    const architrino::solver::CausalRootBatchItemResult& itemResult =
        batchResult.items[static_cast<std::size_t>(itemIndex)];
    const int rootCount = static_cast<int>(itemResult.result.roots.size());
    items[itemIndex] = ArchitrinoSolverCausalRootBatchItemRowF64{
        itemIndex,
        first_status_code(itemResult.result.validation),
        rootOffset,
        rootCount,
        0,
        0,
    };
    for (int rootIndex = 0; rootIndex < rootCount; ++rootIndex) {
      roots[rootOffset + rootIndex] =
          to_row(itemResult.result.roots[static_cast<std::size_t>(rootIndex)]);
    }
    rootOffset += rootCount;
  }

  return 0;
}

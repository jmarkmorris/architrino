#include "architrino/solver/Geometry.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>
#include <vector>

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  const architrino::solver::Vector3 a{3.0, 4.0, 0.0};
  const architrino::solver::Vector3 b{0.0, 0.0, 0.0};
  const architrino::solver::Vector3 unit = architrino::solver::unit_or_zero(a);
  const architrino::solver::LinearPathSegment segment{
      "path-a",
      2.0,
      6.0,
      architrino::solver::Vector3{10.0, -2.0, 1.0},
      architrino::solver::Vector3{-1.0, 3.0, 0.5},
      architrino::solver::NumericType::F64,
      0.0,
  };
  const architrino::solver::AxisAlignedBounds bounds =
      architrino::solver::path_segment_bounds(segment);
  const architrino::solver::AxisAlignedBounds nearby{
      architrino::solver::Vector3{5.5, 9.5, 2.5},
      architrino::solver::Vector3{7.0, 11.0, 4.0},
  };
  const architrino::solver::SpherePointIntersection sphereHit =
      architrino::solver::sphere_point_intersection(b, 5.0, a, 1e-12);
  const architrino::solver::SpherePointIntersection sphereMiss =
      architrino::solver::sphere_point_intersection(b, 4.0, a, 1e-12);
  const architrino::solver::DelayedPotentialResult delayedPotential =
      architrino::solver::compute_delayed_potential(
          architrino::solver::DelayedPotentialRequest{
              architrino::solver::LinearPathSegment{
                  "source-a",
                  0.0,
                  10.0,
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  architrino::solver::Vector3{0.0, 0.0, 0.0},
                  architrino::solver::NumericType::F64,
                  0.0,
              },
              architrino::solver::Vector3{6.0, 0.0, 0.0},
              6.0,
              6.0,
              2.0,
              0.08,
              3.0,
              4,
              true,
          });
  const architrino::solver::CircularSelfHitSpanResult selfHitSpan =
      architrino::solver::solve_circular_self_hit_span(
          architrino::solver::CircularSelfHitSpanRequest{
              1.2,
              0.015,
              1e-12,
              kPi * 1.96,
              48,
              72,
          });
  const std::vector<architrino::solver::PathHistoryRowF64> emissionSources{
      architrino::solver::PathHistoryRowF64{
          4000,
          0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
  };
  const std::vector<architrino::solver::PathHistoryRowF64> emissionReceivers{
      architrino::solver::PathHistoryRowF64{
          4001,
          1,
          1.0,
          2.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
      architrino::solver::PathHistoryRowF64{
          4002,
          2,
          1.0,
          2.0,
          100.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
  };
  const architrino::solver::EmissionShellBroadPhaseResult emissionBroadPhase =
      architrino::solver::query_emission_shell_broad_phase(
          emissionSources,
          emissionReceivers,
          architrino::solver::EmissionShellBroadPhaseOptions{
              1.0,
              1e-12,
              8,
              false,
              false,
              0.0,
              0.0,
          });
  const architrino::solver::EmissionShellBroadPhaseResult emissionBroadPhaseParallel =
      architrino::solver::query_emission_shell_broad_phase_parallel(
          emissionSources,
          emissionReceivers,
          architrino::solver::EmissionShellBroadPhaseOptions{
              1.0,
              1e-12,
              8,
              false,
              false,
              0.0,
              0.0,
          },
          architrino::solver::ParallelExecutionOptions{2, 1, true});
  const std::vector<architrino::solver::PathHistoryRowF64> emissionParallelSources{
      emissionSources[0],
      architrino::solver::PathHistoryRowF64{
          4003,
          3,
          0.0,
          1.0,
          200.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
  };
  const std::vector<architrino::solver::PathHistoryRowF64> emissionParallelReceivers{
      emissionReceivers[0],
  };
  const architrino::solver::EmissionShellBroadPhaseResult emissionTwoWorkerBroadPhase =
      architrino::solver::query_emission_shell_broad_phase_parallel(
          emissionParallelSources,
          emissionParallelReceivers,
          architrino::solver::EmissionShellBroadPhaseOptions{
              1.0,
              1e-12,
              8,
              false,
              false,
              0.0,
              0.0,
              2,
          },
          architrino::solver::ParallelExecutionOptions{2, 1, true});
  const architrino::solver::EmissionShellNarrowPhaseEstimate emissionNarrowHit =
      architrino::solver::estimate_emission_shell_narrow_phase(
          emissionSources[0],
          emissionReceivers[0],
          1.0,
          1e-12);
  const architrino::solver::EmissionShellNarrowPhaseEstimate emissionNarrowMiss =
      architrino::solver::estimate_emission_shell_narrow_phase(
          emissionSources[0],
          emissionReceivers[1],
          1.0,
          1e-12);
  const ArchitrinoSolverLinearPathSegmentF64 abiSegment{
      2.0,
      6.0,
      ArchitrinoSolverVector3F64{10.0, -2.0, 1.0},
      ArchitrinoSolverVector3F64{-1.0, 3.0, 0.5},
      0.0,
  };
  const std::uint64_t abiPathKey = 99;
  ArchitrinoSolverBoundsRowF64 abiBounds[1]{};
  int abiBoundsCount = 0;
  const int abiBoundsStatus =
      architrino_solver_compute_path_bounds_f64(
          &abiSegment,
          &abiPathKey,
          1,
          abiBounds,
          1,
          &abiBoundsCount);
  const ArchitrinoSolverSpherePointIntersectionRequestF64 abiSphereRequests[2]{
      ArchitrinoSolverSpherePointIntersectionRequestF64{
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          5.0,
          ArchitrinoSolverVector3F64{3.0, 4.0, 0.0},
          1e-12,
      },
      ArchitrinoSolverSpherePointIntersectionRequestF64{
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          4.0,
          ArchitrinoSolverVector3F64{3.0, 4.0, 0.0},
          1e-12,
      },
  };
  ArchitrinoSolverSpherePointIntersectionRowF64 abiSphereRows[2]{};
  int abiSphereCount = 0;
  const int abiSphereStatus =
      architrino_solver_intersect_sphere_points_f64(
          abiSphereRequests,
          2,
          abiSphereRows,
          2,
          &abiSphereCount);
  const ArchitrinoSolverDelayedPotentialRequestF64 abiPotentialRequest{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      ArchitrinoSolverVector3F64{6.0, 0.0, 0.0},
      6.0,
      6.0,
      2.0,
      0.08,
      3.0,
      4,
      1,
  };
  ArchitrinoSolverDelayedPotentialRowF64 abiPotentialRows[1]{};
  int abiPotentialCount = 0;
  const int abiPotentialStatus =
      architrino_solver_compute_delayed_potentials_f64(
          &abiPotentialRequest,
          1,
          abiPotentialRows,
          1,
          &abiPotentialCount);
  const ArchitrinoSolverCircularSelfHitSpanRequestF64 abiSelfHitRequests[2]{
      ArchitrinoSolverCircularSelfHitSpanRequestF64{
          1.2,
          0.015,
          1e-12,
          kPi * 1.96,
          48,
          72,
          0,
          0,
      },
      ArchitrinoSolverCircularSelfHitSpanRequestF64{
          1.01,
          0.015,
          1e-12,
          kPi * 1.96,
          48,
          72,
          0,
          0,
      },
  };
  ArchitrinoSolverCircularSelfHitSpanRowF64 abiSelfHitRows[2]{};
  int abiSelfHitCount = 0;
  const int abiSelfHitStatus =
      architrino_solver_solve_circular_self_hit_spans_f64(
          abiSelfHitRequests,
          2,
          abiSelfHitRows,
          2,
          &abiSelfHitCount);
  const ArchitrinoSolverPathHistoryRowF64 abiEmissionSources[1]{
      ArchitrinoSolverPathHistoryRowF64{
          4000,
          0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
  };
  const ArchitrinoSolverPathHistoryRowF64 abiEmissionReceivers[2]{
      ArchitrinoSolverPathHistoryRowF64{
          4001,
          1,
          1.0,
          2.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
      ArchitrinoSolverPathHistoryRowF64{
          4002,
          2,
          1.0,
          2.0,
          100.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0,
          0,
      },
  };
  const ArchitrinoSolverEmissionShellBroadPhaseOptionsF64 abiEmissionOptions{
      1.0,
      1e-12,
      0.0,
      0.0,
      8,
      0,
      0,
      2,
  };
  ArchitrinoSolverEmissionShellCandidateRowF64 abiEmissionRows[2]{};
  ArchitrinoSolverEmissionShellBroadPhaseSummary abiEmissionSummary{};
  const int abiEmissionStatus =
      architrino_solver_query_emission_shell_broad_phase_f64(
          abiEmissionSources,
          1,
          abiEmissionReceivers,
          2,
          &abiEmissionOptions,
          abiEmissionRows,
          2,
          &abiEmissionSummary);
  const ArchitrinoSolverEmissionShellNarrowPhaseRequestF64 abiNarrowRequests[2]{
      ArchitrinoSolverEmissionShellNarrowPhaseRequestF64{
          abiEmissionSources[0],
          abiEmissionReceivers[0],
          1.0,
          1e-12,
      },
      ArchitrinoSolverEmissionShellNarrowPhaseRequestF64{
          abiEmissionSources[0],
          abiEmissionReceivers[1],
          1.0,
          1e-12,
      },
  };
  ArchitrinoSolverEmissionShellNarrowPhaseRowF64 abiNarrowRows[2]{};
  int abiNarrowCount = 0;
  const int abiNarrowStatus =
      architrino_solver_estimate_emission_shell_narrow_phase_f64(
          abiNarrowRequests,
          2,
          abiNarrowRows,
          2,
          &abiNarrowCount);

  const bool ok =
      nearly_equal(architrino::solver::norm(a), 5.0) &&
      nearly_equal(architrino::solver::distance_between(a, b), 5.0) &&
      nearly_equal(unit.x, 0.6) &&
      nearly_equal(unit.y, 0.8) &&
      nearly_equal(bounds.min.x, 6.0) &&
      nearly_equal(bounds.min.y, -2.0) &&
      nearly_equal(bounds.max.y, 10.0) &&
      nearly_equal(bounds.max.z, 3.0) &&
      architrino::solver::bounds_overlap(bounds, nearby, 0.0) &&
      sphereHit.intersects &&
      !sphereMiss.intersects &&
      nearly_equal(sphereHit.centerDistance, 5.0) &&
      nearly_equal(sphereMiss.signedDistance, 1.0) &&
      delayedPotential.statusCode == architrino::solver::StatusCode::Ok &&
      nearly_equal(delayedPotential.tau, 1.0) &&
      nearly_equal(delayedPotential.emissionTime, 5.0) &&
      nearly_equal(delayedPotential.distance, 6.0) &&
      nearly_equal(delayedPotential.kappa, 1.0) &&
      selfHitSpan.rootFound &&
      selfHitSpan.regime == architrino::solver::FieldSpeedRegime::SuperField &&
      selfHitSpan.resultKind == architrino::solver::CircularSelfHitResultKind::RootSolved &&
      nearly_equal(selfHitSpan.span, 2.0534765827345125, 1e-10) &&
      emissionBroadPhase.summary.pairCount == 2 &&
      emissionBroadPhase.summary.rejectedPairCount == 1 &&
      emissionBroadPhase.summary.candidateCount == 1 &&
      !emissionBroadPhase.summary.truncated &&
      emissionBroadPhase.summary.plannedWorkerCount == 1 &&
      emissionBroadPhase.candidates.size() == 1 &&
      emissionBroadPhase.candidates[0].sourcePathKey == 4000 &&
      emissionBroadPhase.candidates[0].receiverPathKey == 4001 &&
      emissionBroadPhase.candidates[0].sourceRowIndex == 0 &&
      emissionBroadPhase.candidates[0].receiverRowIndex == 0 &&
      nearly_equal(emissionBroadPhase.candidates[0].distanceLowerBound, 0.0) &&
      nearly_equal(emissionBroadPhase.candidates[0].distanceUpperBound, 2.0) &&
      nearly_equal(emissionBroadPhase.candidates[0].radiusLowerBound, 0.0) &&
      nearly_equal(emissionBroadPhase.candidates[0].radiusUpperBound, 2.0) &&
      emissionBroadPhaseParallel.summary.pairCount == emissionBroadPhase.summary.pairCount &&
      emissionBroadPhaseParallel.summary.rejectedPairCount ==
          emissionBroadPhase.summary.rejectedPairCount &&
      emissionBroadPhaseParallel.summary.candidateCount == emissionBroadPhase.summary.candidateCount &&
      emissionBroadPhaseParallel.summary.truncated == emissionBroadPhase.summary.truncated &&
      emissionBroadPhaseParallel.summary.plannedWorkerCount == 1 &&
      emissionBroadPhaseParallel.candidates.size() == emissionBroadPhase.candidates.size() &&
      emissionBroadPhaseParallel.candidates[0].sourcePathKey ==
          emissionBroadPhase.candidates[0].sourcePathKey &&
      emissionBroadPhaseParallel.candidates[0].receiverPathKey ==
          emissionBroadPhase.candidates[0].receiverPathKey &&
      emissionTwoWorkerBroadPhase.summary.pairCount == 2 &&
      emissionTwoWorkerBroadPhase.summary.rejectedPairCount == 1 &&
      emissionTwoWorkerBroadPhase.summary.candidateCount == 1 &&
      emissionTwoWorkerBroadPhase.summary.plannedWorkerCount == 2 &&
      emissionTwoWorkerBroadPhase.candidates[0].sourcePathKey == 4000 &&
      emissionTwoWorkerBroadPhase.candidates[0].receiverPathKey == 4001 &&
      emissionNarrowHit.statusCode == architrino::solver::StatusCode::Ok &&
      emissionNarrowHit.classification ==
          architrino::solver::EmissionShellNarrowPhaseClassification::SampledHit &&
      emissionNarrowHit.sampleCount == 1 &&
      nearly_equal(emissionNarrowHit.hitTime, 1.0) &&
      nearly_equal(emissionNarrowHit.emissionTime, 0.0) &&
      nearly_equal(emissionNarrowHit.residual, 0.0) &&
      emissionNarrowMiss.statusCode == architrino::solver::StatusCode::Ok &&
      emissionNarrowMiss.classification ==
          architrino::solver::EmissionShellNarrowPhaseClassification::SampledMiss &&
      emissionNarrowMiss.sampleCount == 3 &&
      nearly_equal(emissionNarrowMiss.residual, 98.0) &&
      abiBoundsStatus == 0 &&
      abiBoundsCount == 1 &&
      abiBounds[0].path_key == 99 &&
      nearly_equal(abiBounds[0].min_x, 6.0) &&
      nearly_equal(abiBounds[0].max_y, 10.0) &&
      abiSphereStatus == 0 &&
      abiSphereCount == 2 &&
      abiSphereRows[0].intersects == 1 &&
      abiSphereRows[1].intersects == 0 &&
      nearly_equal(abiSphereRows[0].center_distance, 5.0) &&
      nearly_equal(abiSphereRows[1].signed_distance, 1.0) &&
      abiPotentialStatus == 0 &&
      abiPotentialCount == 1 &&
      abiPotentialRows[0].status_code == 0 &&
      abiPotentialRows[0].used_causal_denominator == 1 &&
      nearly_equal(abiPotentialRows[0].tau, 1.0) &&
      nearly_equal(abiPotentialRows[0].emission_time, 5.0) &&
      nearly_equal(abiPotentialRows[0].distance, 6.0) &&
      nearly_equal(abiPotentialRows[0].kappa, 1.0) &&
      abiSelfHitStatus == 0 &&
      abiSelfHitCount == 2 &&
      abiSelfHitRows[0].status_code == 0 &&
      abiSelfHitRows[0].root_found == 1 &&
      abiSelfHitRows[0].regime == 2 &&
      abiSelfHitRows[0].result_kind == 1 &&
      nearly_equal(abiSelfHitRows[0].span, 2.0534765827345125, 1e-10) &&
      abiSelfHitRows[1].status_code == 0 &&
      abiSelfHitRows[1].root_found == 0 &&
      abiSelfHitRows[1].result_kind == 0 &&
      nearly_equal(abiSelfHitRows[1].span, 0.0) &&
      abiEmissionStatus == 0 &&
      abiEmissionSummary.pair_count == 2 &&
      abiEmissionSummary.rejected_pair_count == 1 &&
      abiEmissionSummary.candidate_count == 1 &&
      abiEmissionSummary.truncated == 0 &&
      abiEmissionSummary.planned_worker_count == 1 &&
      abiEmissionRows[0].source_path_key == 4000 &&
      abiEmissionRows[0].receiver_path_key == 4001 &&
      abiEmissionRows[0].source_row_index == 0 &&
      abiEmissionRows[0].receiver_row_index == 0 &&
      nearly_equal(abiEmissionRows[0].distance_lower_bound, 0.0) &&
      nearly_equal(abiEmissionRows[0].distance_upper_bound, 2.0) &&
      nearly_equal(abiEmissionRows[0].radius_lower_bound, 0.0) &&
      nearly_equal(abiEmissionRows[0].radius_upper_bound, 2.0) &&
      abiNarrowStatus == 0 &&
      abiNarrowCount == 2 &&
      abiNarrowRows[0].status_code == 0 &&
      abiNarrowRows[0].classification == 1 &&
      abiNarrowRows[0].sample_count == 1 &&
      nearly_equal(abiNarrowRows[0].hit_time, 1.0) &&
      nearly_equal(abiNarrowRows[0].emission_time, 0.0) &&
      nearly_equal(abiNarrowRows[0].residual, 0.0) &&
      abiNarrowRows[1].status_code == 0 &&
      abiNarrowRows[1].classification == 0 &&
      abiNarrowRows[1].sample_count == 3 &&
      nearly_equal(abiNarrowRows[1].residual, 98.0);

  if (!ok) {
    std::cerr << "solver geometry smoke failed\n";
    return 1;
  }

  std::cout << "solver geometry=ok\n";
  return 0;
}

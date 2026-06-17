#include "architrino/solver/SolverCAbi.hpp"

#include "architrino/solver/AssemblyGraph.hpp"
#include "architrino/solver/AssemblyGraphStore.hpp"
#include "architrino/solver/CausalRootBatchSolver.hpp"
#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/ErrorBudget.hpp"
#include "architrino/solver/Geometry.hpp"
#include "architrino/solver/MotionSampler.hpp"
#include "architrino/solver/PathHistoryStream.hpp"
#include "architrino/solver/PhaseDiagnostics.hpp"
#include "architrino/solver/PrecisionDiagnostics.hpp"
#include "architrino/solver/PrecisionPathSolver.hpp"
#include "architrino/solver/RootLedger.hpp"
#include "architrino/solver/SpaceTimeIndex.hpp"
#include "architrino/solver/StorageLifecycle.hpp"

#include <algorithm>
#include <cmath>
#include <cstddef>
#include <limits>
#include <string>
#include <utility>
#include <vector>

static_assert(sizeof(ArchitrinoSolverVector3F64) == 24);
static_assert(sizeof(ArchitrinoSolverLinearPathSegmentF64) == 72);
static_assert(sizeof(ArchitrinoSolverCircularPathSegmentF64) == 120);
static_assert(sizeof(ArchitrinoSolverCausalRootRequestF64) == 176);
static_assert(sizeof(ArchitrinoSolverCircularSourceCausalRootRequestF64) == 224);
static_assert(sizeof(ArchitrinoSolverCausalRootRowF64) == 112);
static_assert(sizeof(ArchitrinoSolverRootLedgerDetailRowF64) == 192);
static_assert(sizeof(ArchitrinoSolverDelayedHitRowF64) == 128);
static_assert(sizeof(ArchitrinoSolverCausalRootBatchItemRowF64) == 24);
static_assert(sizeof(ArchitrinoSolverPrecisionDiagnosticRowF64) == 96);
static_assert(sizeof(ArchitrinoSolverPrecisionSolveOptions) == 16);
static_assert(sizeof(ArchitrinoSolverPrecisionSolveSummaryF64) == 80);
static_assert(sizeof(ArchitrinoSolverErrorBudgetF64) == 64);
static_assert(sizeof(ArchitrinoSolverErrorBudgetStageInputF64) == 16);
static_assert(sizeof(ArchitrinoSolverErrorBudgetStageRowF64) == 40);
static_assert(sizeof(ArchitrinoSolverErrorBudgetSummaryF64) == 32);
static_assert(sizeof(ArchitrinoSolverPhaseClockF64) == 24);
static_assert(sizeof(ArchitrinoSolverPhaseAtHitRowF64) == 72);
static_assert(sizeof(ArchitrinoSolverMotionSampleRequestF64) == 112);
static_assert(sizeof(ArchitrinoSolverMotionIntegrationRequestF64) == 120);
static_assert(sizeof(ArchitrinoSolverMotionFrameRowF64) == 88);
static_assert(sizeof(ArchitrinoSolverPathHistoryRowF64) == 96);
static_assert(sizeof(ArchitrinoSolverPathHistoryIndexRow) == 64);
static_assert(sizeof(ArchitrinoSolverPathHistoryChunkRow) == 104);
static_assert(sizeof(ArchitrinoSolverPathHistoryQuery) == 40);
static_assert(sizeof(ArchitrinoSolverPathHistoryStreamSummary) == 72);
static_assert(sizeof(ArchitrinoSolverStorageLifecyclePolicy) == 56);
static_assert(sizeof(ArchitrinoSolverPathHistoryLifecycleDecisionRow) == 32);
static_assert(sizeof(ArchitrinoSolverBoundsRowF64) == 64);
static_assert(sizeof(ArchitrinoSolverSpherePointIntersectionRequestF64) == 64);
static_assert(sizeof(ArchitrinoSolverSpherePointIntersectionRowF64) == 24);
static_assert(sizeof(ArchitrinoSolverDelayedPotentialRequestF64) == 144);
static_assert(sizeof(ArchitrinoSolverDelayedPotentialRowF64) == 112);
static_assert(sizeof(ArchitrinoSolverCircularSelfHitSpanRequestF64) == 48);
static_assert(sizeof(ArchitrinoSolverCircularSelfHitSpanRowF64) == 72);
static_assert(sizeof(ArchitrinoSolverAssemblyStateRowF64) == 112);
static_assert(sizeof(ArchitrinoSolverAssemblyMembershipRowF64) == 80);
static_assert(sizeof(ArchitrinoSolverAssemblyHierarchyRowF64) == 56);
static_assert(sizeof(ArchitrinoSolverAssemblyEventRowF64) == 88);
static_assert(sizeof(ArchitrinoSolverAssemblyGraphStoreIndexRowF64) == 72);
static_assert(sizeof(ArchitrinoSolverAssemblyGraphStoreIndexQuery) == 72);
static_assert(sizeof(ArchitrinoSolverAssemblyGraphStoreSummary) == 104);
static_assert(sizeof(ArchitrinoSolverSpaceTimeBoundsF64) == 64);
static_assert(sizeof(ArchitrinoSolverSpaceTimeIndexOptionsF64) == 24);
static_assert(sizeof(ArchitrinoSolverSpaceTimeIndexRowF64) == 128);
static_assert(sizeof(ArchitrinoSolverSpaceTimeQueryF64) == 96);
static_assert(sizeof(ArchitrinoSolverEmissionShellBroadPhaseOptionsF64) == 48);
static_assert(sizeof(ArchitrinoSolverEmissionShellCandidateRowF64) == 112);
static_assert(sizeof(ArchitrinoSolverEmissionShellBroadPhaseSummary) == 32);
static_assert(sizeof(ArchitrinoSolverEmissionShellNarrowPhaseRequestF64) == 208);
static_assert(sizeof(ArchitrinoSolverEmissionShellNarrowPhaseRowF64) == 40);
static_assert(sizeof(ArchitrinoSolverAbiInfo) == 156);
static_assert(offsetof(ArchitrinoSolverCausalRootRequestF64, hit_time) == 144);
static_assert(offsetof(ArchitrinoSolverCausalRootRequestF64, max_iterations) == 168);
static_assert(offsetof(ArchitrinoSolverCircularPathSegmentF64, radius_v) == 64);
static_assert(offsetof(ArchitrinoSolverCircularSourceCausalRootRequestF64, hit_time) == 192);
static_assert(offsetof(ArchitrinoSolverCausalRootRowF64, emission_time) == 8);
static_assert(offsetof(ArchitrinoSolverCausalRootRowF64, receiver_z) == 104);
static_assert(offsetof(ArchitrinoSolverRootLedgerDetailRowF64, interval_start) == 32);
static_assert(offsetof(ArchitrinoSolverRootLedgerDetailRowF64, source_x) == 112);
static_assert(offsetof(ArchitrinoSolverRootLedgerDetailRowF64, entry_kind) == 160);
static_assert(offsetof(ArchitrinoSolverRootLedgerDetailRowF64, state_flags) == 184);
static_assert(offsetof(ArchitrinoSolverDelayedHitRowF64, emission_time) == 16);
static_assert(offsetof(ArchitrinoSolverDelayedHitRowF64, unit_z) == 120);
static_assert(offsetof(ArchitrinoSolverCausalRootBatchItemRowF64, root_offset) == 8);
static_assert(offsetof(ArchitrinoSolverCausalRootBatchItemRowF64, root_count) == 12);
static_assert(offsetof(ArchitrinoSolverPrecisionDiagnosticRowF64, time_orders) == 16);
static_assert(offsetof(ArchitrinoSolverPrecisionDiagnosticRowF64, geometry_min) == 88);
static_assert(offsetof(ArchitrinoSolverPrecisionSolveSummaryF64, root_tolerance) == 32);
static_assert(offsetof(ArchitrinoSolverPrecisionSolveSummaryF64, max_iterations) == 56);
static_assert(offsetof(ArchitrinoSolverPrecisionSolveSummaryF64, validation_replay_matched) == 72);
static_assert(offsetof(ArchitrinoSolverErrorBudgetStageInputF64, estimated_absolute_error) == 8);
static_assert(offsetof(ArchitrinoSolverErrorBudgetStageRowF64, estimated_absolute_error) == 16);
static_assert(offsetof(ArchitrinoSolverErrorBudgetStageRowF64, tolerance_ratio) == 32);
static_assert(offsetof(ArchitrinoSolverErrorBudgetSummaryF64, cumulative_error) == 16);
static_assert(offsetof(ArchitrinoSolverPhaseAtHitRowF64, source_cycle_index) == 8);
static_assert(offsetof(ArchitrinoSolverPhaseAtHitRowF64, emission_time) == 24);
static_assert(offsetof(ArchitrinoSolverPhaseAtHitRowF64, phase_spread) == 64);
static_assert(offsetof(ArchitrinoSolverMotionSampleRequestF64, path_key) == 72);
static_assert(offsetof(ArchitrinoSolverMotionSampleRequestF64, state_flags) == 104);
static_assert(offsetof(ArchitrinoSolverMotionIntegrationRequestF64, initial_position) == 32);
static_assert(offsetof(ArchitrinoSolverMotionIntegrationRequestF64, integration_method) == 112);
static_assert(offsetof(ArchitrinoSolverMotionFrameRowF64, time) == 16);
static_assert(offsetof(ArchitrinoSolverMotionFrameRowF64, state_flags) == 80);
static_assert(offsetof(ArchitrinoSolverPathHistoryRowF64, start_time) == 16);
static_assert(offsetof(ArchitrinoSolverPathHistoryRowF64, velocity_z) == 72);
static_assert(offsetof(ArchitrinoSolverPathHistoryIndexRow, time_start) == 32);
static_assert(offsetof(ArchitrinoSolverPathHistoryIndexRow, byte_offset) == 48);
static_assert(offsetof(ArchitrinoSolverPathHistoryChunkRow, time_start) == 56);
static_assert(offsetof(ArchitrinoSolverPathHistoryChunkRow, byte_offset) == 72);
static_assert(offsetof(ArchitrinoSolverPathHistoryQuery, filter_path) == 24);
static_assert(offsetof(ArchitrinoSolverPathHistoryStreamSummary, time_start) == 48);
static_assert(offsetof(ArchitrinoSolverStorageLifecyclePolicy, active_memory_budget_bytes) == 40);
static_assert(offsetof(ArchitrinoSolverPathHistoryLifecycleDecisionRow, safe_to_age_out) == 16);
static_assert(offsetof(ArchitrinoSolverBoundsRowF64, min_x) == 16);
static_assert(offsetof(ArchitrinoSolverBoundsRowF64, max_z) == 56);
static_assert(offsetof(ArchitrinoSolverSpherePointIntersectionRequestF64, radius) == 24);
static_assert(offsetof(ArchitrinoSolverSpherePointIntersectionRequestF64, tolerance) == 56);
static_assert(offsetof(ArchitrinoSolverSpherePointIntersectionRowF64, center_distance) == 8);
static_assert(offsetof(ArchitrinoSolverDelayedPotentialRequestF64, sample_point) == 72);
static_assert(offsetof(ArchitrinoSolverDelayedPotentialRequestF64, observation_time) == 96);
static_assert(offsetof(ArchitrinoSolverDelayedPotentialRowF64, emission_x) == 24);
static_assert(offsetof(ArchitrinoSolverDelayedPotentialRowF64, distance) == 72);
static_assert(offsetof(ArchitrinoSolverCircularSelfHitSpanRequestF64, max_iterations) == 32);
static_assert(offsetof(ArchitrinoSolverCircularSelfHitSpanRowF64, span) == 24);
static_assert(offsetof(ArchitrinoSolverCircularSelfHitSpanRowF64, regime) == 64);
static_assert(offsetof(ArchitrinoSolverAssemblyStateRowF64, center_x) == 32);
static_assert(offsetof(ArchitrinoSolverAssemblyStateRowF64, cycle_index) == 88);
static_assert(offsetof(ArchitrinoSolverAssemblyMembershipRowF64, time_start) == 32);
static_assert(offsetof(ArchitrinoSolverAssemblyMembershipRowF64, local_role) == 56);
static_assert(offsetof(ArchitrinoSolverAssemblyHierarchyRowF64, relation_type) == 40);
static_assert(offsetof(ArchitrinoSolverAssemblyEventRowF64, event_time) == 64);
static_assert(offsetof(ArchitrinoSolverAssemblyEventRowF64, event_kind) == 72);
static_assert(offsetof(ArchitrinoSolverAssemblyGraphStoreIndexRowF64, key) == 8);
static_assert(offsetof(ArchitrinoSolverAssemblyGraphStoreIndexRowF64, byte_offset) == 48);
static_assert(offsetof(ArchitrinoSolverAssemblyGraphStoreIndexQuery, key) == 32);
static_assert(offsetof(ArchitrinoSolverAssemblyGraphStoreSummary, time_start) == 80);
static_assert(offsetof(ArchitrinoSolverSpaceTimeIndexOptionsF64, max_cells_per_item) == 16);
static_assert(offsetof(ArchitrinoSolverSpaceTimeIndexRowF64, subject_key) == 32);
static_assert(offsetof(ArchitrinoSolverSpaceTimeIndexRowF64, min_x) == 48);
static_assert(offsetof(ArchitrinoSolverSpaceTimeIndexRowF64, subject_kind) == 112);
static_assert(offsetof(ArchitrinoSolverSpaceTimeQueryF64, filter_space) == 64);
static_assert(offsetof(ArchitrinoSolverSpaceTimeQueryF64, subject_key) == 88);
static_assert(offsetof(ArchitrinoSolverEmissionShellBroadPhaseOptionsF64, max_candidates) == 32);
static_assert(offsetof(ArchitrinoSolverEmissionShellBroadPhaseOptionsF64, requested_worker_count) == 44);
static_assert(offsetof(ArchitrinoSolverEmissionShellCandidateRowF64, source_time_start) == 48);
static_assert(offsetof(ArchitrinoSolverEmissionShellCandidateRowF64, distance_lower_bound) == 80);
static_assert(offsetof(ArchitrinoSolverEmissionShellBroadPhaseSummary, truncated) == 24);
static_assert(offsetof(ArchitrinoSolverEmissionShellBroadPhaseSummary, planned_worker_count) == 28);
static_assert(offsetof(ArchitrinoSolverEmissionShellNarrowPhaseRequestF64, signal_speed) == 192);
static_assert(offsetof(ArchitrinoSolverEmissionShellNarrowPhaseRowF64, hit_time) == 16);
static_assert(offsetof(ArchitrinoSolverEmissionShellNarrowPhaseRowF64, residual) == 32);

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

architrino::solver::CircularPathSegment to_segment(
    ArchitrinoSolverCircularPathSegmentF64 value,
    const char* pathId) {
  return architrino::solver::CircularPathSegment{
      pathId,
      value.start_time,
      value.end_time,
      to_vector(value.center),
      to_vector(value.radius_u),
      to_vector(value.radius_v),
      value.angular_velocity,
      value.phase_at_epoch,
      value.epoch_time,
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

architrino::solver::CircularSourceCausalRootRequest to_request(
    const ArchitrinoSolverCircularSourceCausalRootRequestF64* request) {
  return architrino::solver::CircularSourceCausalRootRequest{
      "receiver",
      "circular-source",
      to_segment(request->source, "circular-source"),
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

ArchitrinoSolverRootLedgerDetailRowF64 to_root_ledger_detail_row(
    const architrino::solver::RootLedgerDetailRowF64& row) {
  return ArchitrinoSolverRootLedgerDetailRowF64{
      row.ledgerKey,
      row.sourceKey,
      row.receiverKey,
      row.rootKey,
      row.intervalStart,
      row.intervalEnd,
      row.emissionTime,
      row.hitTime,
      row.delay,
      row.residual,
      row.jacobian,
      row.branchWeight,
      row.bracketStart,
      row.bracketEnd,
      row.sourceX,
      row.sourceY,
      row.sourceZ,
      row.receiverX,
      row.receiverY,
      row.receiverZ,
      row.entryKind,
      row.rootKind,
      row.statusCode,
      row.jacobianSignStratum,
      row.sequenceIndex,
      row.iterationCount,
      row.stateFlags,
      row.reserved0,
  };
}

architrino::solver::CausalRoot to_root(const ArchitrinoSolverCausalRootRowF64& row) {
  return architrino::solver::CausalRoot{
      "receiver",
      "source",
      row.root_id,
      "partner",
      row.emission_time,
      row.hit_time,
      row.delay,
      row.distance,
      row.residual,
      row.jacobian,
      row.branch_weight,
      0.0,
      0.0,
      0,
      architrino::solver::Vector3{row.source_x, row.source_y, row.source_z},
      architrino::solver::Vector3{row.receiver_x, row.receiver_y, row.receiver_z},
      static_cast<architrino::solver::StatusCode>(row.status_code),
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

ArchitrinoSolverDelayedHitRowF64 to_delayed_hit_row_from_root(
    const architrino::solver::CausalRoot& root,
    int eventId) {
  const architrino::solver::Vector3 displacement =
      architrino::solver::subtract(root.receiverPoint, root.sourcePoint);
  const architrino::solver::Vector3 unitDirection =
      architrino::solver::unit_or_zero(displacement);
  const double strength = std::isfinite(root.branchWeight) ? root.branchWeight : 0.0;
  return ArchitrinoSolverDelayedHitRowF64{
      eventId,
      root.rootId,
      static_cast<int>(root.statusCode),
      0,
      root.emissionTime,
      root.hitTime,
      root.distance,
      root.jacobian,
      strength,
      root.sourcePoint.x,
      root.sourcePoint.y,
      root.sourcePoint.z,
      root.receiverPoint.x,
      root.receiverPoint.y,
      root.receiverPoint.z,
      unitDirection.x,
      unitDirection.y,
      unitDirection.z,
  };
}

architrino::solver::MotionSampleRequest to_motion_request(
    const ArchitrinoSolverMotionSampleRequestF64* request) {
  return architrino::solver::MotionSampleRequest{
      to_segment(request->segment, "motion-path"),
      request->path_key,
      request->start_time,
      request->end_time,
      request->step,
      request->state_flags,
  };
}

architrino::solver::MotionIntegrationRequest to_motion_integration_request(
    const ArchitrinoSolverMotionIntegrationRequestF64* request) {
  return architrino::solver::MotionIntegrationRequest{
      request->path_key,
      request->start_time,
      request->end_time,
      request->step,
      to_vector(request->initial_position),
      to_vector(request->initial_velocity),
      to_vector(request->acceleration),
      request->integration_tolerance,
      request->integration_method,
      request->state_flags,
  };
}

ArchitrinoSolverMotionFrameRowF64 to_motion_row(
    const architrino::solver::MotionFrameRowF64& frame) {
  return ArchitrinoSolverMotionFrameRowF64{
      frame.pathKey,
      frame.frameIndex,
      frame.time,
      frame.positionX,
      frame.positionY,
      frame.positionZ,
      frame.velocityX,
      frame.velocityY,
      frame.velocityZ,
      frame.errorBound,
      frame.stateFlags,
      frame.reserved0,
  };
}

architrino::solver::PhaseClock to_phase_clock(const ArchitrinoSolverPhaseClockF64& clock) {
  return architrino::solver::PhaseClock{
      clock.period,
      clock.epoch,
      clock.phase_offset,
  };
}

ArchitrinoSolverPhaseAtHitRowF64 to_phase_row(const architrino::solver::PhaseAtHit& row) {
  return ArchitrinoSolverPhaseAtHitRowF64{
      row.rootId,
      static_cast<int>(row.statusCode),
      row.sourceCycleIndex,
      row.receiverCycleIndex,
      row.emissionTime,
      row.hitTime,
      row.sourcePhase,
      row.receiverPhase,
      row.phaseDelta,
      row.phaseSpread,
  };
}

ArchitrinoSolverBoundsRowF64 to_bounds_row(architrino::solver::AxisAlignedBounds bounds,
                                           int itemIndex,
                                           std::uint64_t pathKey) {
  return ArchitrinoSolverBoundsRowF64{
      itemIndex,
      static_cast<int>(architrino::solver::StatusCode::Ok),
      pathKey,
      bounds.min.x,
      bounds.min.y,
      bounds.min.z,
      bounds.max.x,
      bounds.max.y,
      bounds.max.z,
  };
}

ArchitrinoSolverSpherePointIntersectionRowF64 to_sphere_point_row(
    architrino::solver::SpherePointIntersection intersection,
    int itemIndex) {
  return ArchitrinoSolverSpherePointIntersectionRowF64{
      itemIndex,
      intersection.intersects ? 1 : 0,
      intersection.centerDistance,
      intersection.signedDistance,
  };
}

architrino::solver::DelayedPotentialRequest to_delayed_potential_request(
    const ArchitrinoSolverDelayedPotentialRequestF64& row) {
  return architrino::solver::DelayedPotentialRequest{
      to_segment(row.source, "delayed-potential-source"),
      to_vector(row.sample_point),
      row.observation_time,
      row.field_speed,
      row.normalization,
      row.softening,
      row.source_charge,
      static_cast<int>(row.iterations),
      row.use_causal_denominator != 0,
  };
}

ArchitrinoSolverDelayedPotentialRowF64 to_delayed_potential_row(
    architrino::solver::DelayedPotentialResult result,
    int itemIndex) {
  return ArchitrinoSolverDelayedPotentialRowF64{
      itemIndex,
      static_cast<int>(result.statusCode),
      result.tau,
      result.emissionTime,
      result.emissionPoint.x,
      result.emissionPoint.y,
      result.emissionPoint.z,
      result.displacement.x,
      result.displacement.y,
      result.displacement.z,
      result.distance,
      result.denominator,
      result.potential,
      result.kappa,
      static_cast<std::uint32_t>(std::max(0, result.iterations)),
      result.usedCausalDenominator ? 1U : 0U,
  };
}

architrino::solver::CircularSelfHitSpanRequest to_circular_self_hit_request(
    const ArchitrinoSolverCircularSelfHitSpanRequestF64& row) {
  return architrino::solver::CircularSelfHitSpanRequest{
      row.field_speed_ratio,
      row.field_speed_tolerance,
      row.tolerance,
      row.max_angle,
      static_cast<int>(row.max_iterations),
      static_cast<int>(row.scan_subdivisions),
  };
}

ArchitrinoSolverCircularSelfHitSpanRowF64 to_circular_self_hit_row(
    architrino::solver::CircularSelfHitSpanResult result,
    int itemIndex) {
  return ArchitrinoSolverCircularSelfHitSpanRowF64{
      itemIndex,
      static_cast<int>(result.statusCode),
      result.fieldSpeedRatio,
      result.fieldSpeedTolerance,
      result.span,
      result.bracketLow,
      result.bracketHigh,
      result.residual,
      result.rootFound ? 1U : 0U,
      static_cast<std::uint32_t>(std::max(0, result.iterations)),
      static_cast<std::uint32_t>(result.regime),
      static_cast<std::uint32_t>(result.resultKind),
  };
}

architrino::solver::AssemblyMembershipRowF64 to_membership_row(
    const ArchitrinoSolverAssemblyMembershipRowF64& row) {
  return architrino::solver::AssemblyMembershipRowF64{
      row.membership_key,
      row.path_key,
      row.assembly_key,
      row.assembly_state_key,
      row.time_start,
      row.time_end,
      row.confidence,
      row.local_role,
      row.binding_state,
      row.membership_version,
      row.event_kind,
      row.status_flags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyMembershipRowF64 to_c_membership_row(
    const architrino::solver::AssemblyMembershipRowF64& row) {
  return ArchitrinoSolverAssemblyMembershipRowF64{
      row.membershipKey,
      row.pathKey,
      row.assemblyKey,
      row.assemblyStateKey,
      row.timeStart,
      row.timeEnd,
      row.confidence,
      row.localRole,
      row.bindingState,
      row.membershipVersion,
      row.eventKind,
      row.statusFlags,
      row.reserved0,
  };
}

architrino::solver::AssemblyHierarchyRowF64 to_hierarchy_row(
    const ArchitrinoSolverAssemblyHierarchyRowF64& row) {
  return architrino::solver::AssemblyHierarchyRowF64{
      row.hierarchy_key,
      row.parent_assembly_key,
      row.child_assembly_key,
      row.time_start,
      row.time_end,
      row.relation_type,
      row.hierarchy_version,
      row.status_flags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyHierarchyRowF64 to_c_hierarchy_row(
    const architrino::solver::AssemblyHierarchyRowF64& row) {
  return ArchitrinoSolverAssemblyHierarchyRowF64{
      row.hierarchyKey,
      row.parentAssemblyKey,
      row.childAssemblyKey,
      row.timeStart,
      row.timeEnd,
      row.relationType,
      row.hierarchyVersion,
      row.statusFlags,
      row.reserved0,
  };
}

architrino::solver::AssemblyEventRowF64 to_cpp_assembly_event_row(
    const ArchitrinoSolverAssemblyEventRowF64& row) {
  return architrino::solver::AssemblyEventRowF64{
      row.event_key,
      row.primary_id,
      row.secondary_id,
      row.prior_state_key,
      row.next_state_key,
      row.related_path_key,
      row.related_assembly_key,
      row.branch_transition_key,
      row.event_time,
      row.event_kind,
      row.speed_regime,
      row.status_flags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyEventRowF64 to_assembly_event_row(
    const architrino::solver::AssemblyEventRowF64& row) {
  return ArchitrinoSolverAssemblyEventRowF64{
      row.eventKey,
      row.primaryId,
      row.secondaryId,
      row.priorStateKey,
      row.nextStateKey,
      row.relatedPathKey,
      row.relatedAssemblyKey,
      row.branchTransitionKey,
      row.eventTime,
      row.eventKind,
      row.speedRegime,
      row.statusFlags,
      row.reserved0,
  };
}

architrino::solver::PathHistoryRowF64 to_path_history_row(
    const ArchitrinoSolverPathHistoryRowF64& row) {
  return architrino::solver::PathHistoryRowF64{
      row.path_key,
      row.segment_index,
      row.start_time,
      row.end_time,
      row.start_x,
      row.start_y,
      row.start_z,
      row.velocity_x,
      row.velocity_y,
      row.velocity_z,
      row.error_bound,
      row.state_flags,
      row.reserved0,
  };
}

ArchitrinoSolverPathHistoryRowF64 to_c_path_history_row(
    const architrino::solver::PathHistoryRowF64& row) {
  return ArchitrinoSolverPathHistoryRowF64{
      row.pathKey,
      row.segmentIndex,
      row.startTime,
      row.endTime,
      row.startX,
      row.startY,
      row.startZ,
      row.velocityX,
      row.velocityY,
      row.velocityZ,
      row.errorBound,
      row.stateFlags,
      row.reserved0,
  };
}

architrino::solver::LinearPathSegment to_segment(
    const architrino::solver::PathHistoryRowF64& row) {
  return architrino::solver::LinearPathSegment{
      "path-history-row",
      row.startTime,
      row.endTime,
      architrino::solver::Vector3{row.startX, row.startY, row.startZ},
      architrino::solver::Vector3{row.velocityX, row.velocityY, row.velocityZ},
      architrino::solver::NumericType::F64,
      row.errorBound,
  };
}

architrino::solver::PathHistoryIndexRow to_path_history_index_row(
    const ArchitrinoSolverPathHistoryIndexRow& row) {
  return architrino::solver::PathHistoryIndexRow{
      row.path_key,
      row.chunk_index,
      row.row_offset,
      row.row_count,
      row.time_start,
      row.time_end,
      row.byte_offset,
      row.byte_length,
  };
}

ArchitrinoSolverPathHistoryIndexRow to_c_path_history_index_row(
    const architrino::solver::PathHistoryIndexRow& row) {
  return ArchitrinoSolverPathHistoryIndexRow{
      row.pathKey,
      row.chunkIndex,
      row.rowOffset,
      row.rowCount,
      row.timeStart,
      row.timeEnd,
      row.byteOffset,
      row.byteLength,
  };
}

architrino::solver::PathHistoryChunkRow to_path_history_chunk_row(
    const ArchitrinoSolverPathHistoryChunkRow& row) {
  return architrino::solver::PathHistoryChunkRow{
      row.chunk_index,
      row.path_key_start,
      row.path_key_end,
      row.row_offset,
      row.row_count,
      row.frame_start,
      row.frame_end,
      row.time_start,
      row.time_end,
      row.byte_offset,
      row.byte_length,
      row.checksum64,
      row.state_flags,
      row.reserved0,
  };
}

ArchitrinoSolverPathHistoryChunkRow to_c_path_history_chunk_row(
    const architrino::solver::PathHistoryChunkRow& row) {
  return ArchitrinoSolverPathHistoryChunkRow{
      row.chunkIndex,
      row.pathKeyStart,
      row.pathKeyEnd,
      row.rowOffset,
      row.rowCount,
      row.frameStart,
      row.frameEnd,
      row.timeStart,
      row.timeEnd,
      row.byteOffset,
      row.byteLength,
      row.checksum64,
      row.stateFlags,
      row.reserved0,
  };
}

architrino::solver::PathHistoryQuery to_path_history_query(
    const ArchitrinoSolverPathHistoryQuery& query) {
  return architrino::solver::PathHistoryQuery{
      query.path_key,
      query.time_start,
      query.time_end,
      query.filter_path != 0,
      query.filter_time != 0,
  };
}

ArchitrinoSolverPathHistoryStreamSummary to_path_history_stream_summary(
    const architrino::solver::PathHistoryStreamMetadata& metadata) {
  return ArchitrinoSolverPathHistoryStreamSummary{
      metadata.rowCount,
      metadata.chunkCount,
      metadata.byteLength,
      metadata.dataChecksum64,
      metadata.indexChecksum64,
      metadata.chunkChecksum64,
      metadata.timeStart,
      metadata.timeEnd,
      metadata.hasTimeRange ? 1U : 0U,
      metadata.durable ? 1U : 0U,
  };
}

architrino::solver::StorageLifecyclePolicy to_storage_lifecycle_policy(
    const ArchitrinoSolverStorageLifecyclePolicy& policy) {
  return architrino::solver::StorageLifecyclePolicy{
      policy.active_window_start,
      policy.active_window_end,
      policy.has_active_window != 0,
      policy.deep_index_enabled != 0,
      policy.export_requested != 0,
      policy.failed_run != 0,
      policy.delete_requested != 0,
      policy.active_memory_budget_bytes,
      policy.storage_budget_bytes,
  };
}

std::uint32_t to_lifecycle_tier_code(architrino::solver::StorageLifecycleTier value) {
  switch (value) {
    case architrino::solver::StorageLifecycleTier::Active:
      return 0;
    case architrino::solver::StorageLifecycleTier::Warm:
      return 1;
    case architrino::solver::StorageLifecycleTier::Cold:
      return 2;
    case architrino::solver::StorageLifecycleTier::Deleted:
      return 3;
  }
  return 255;
}

std::uint32_t to_lifecycle_action_code(architrino::solver::StorageLifecycleAction value) {
  switch (value) {
    case architrino::solver::StorageLifecycleAction::KeepActive:
      return 0;
    case architrino::solver::StorageLifecycleAction::SpillWarm:
      return 1;
    case architrino::solver::StorageLifecycleAction::ArchiveCold:
      return 2;
    case architrino::solver::StorageLifecycleAction::BuildDeepIndex:
      return 3;
    case architrino::solver::StorageLifecycleAction::Delete:
      return 4;
    case architrino::solver::StorageLifecycleAction::BlockedUnsafe:
      return 5;
  }
  return 255;
}

std::uint32_t to_lifecycle_reason_code(std::string_view reason) {
  if (reason == "delete requested") {
    return 1;
  }
  if (reason == "failed run cleanup") {
    return 2;
  }
  if (reason == "overlaps active window") {
    return 3;
  }
  if (reason == "chunk is pinned active") {
    return 4;
  }
  if (reason == "aged chunk requires deep index") {
    return 5;
  }
  if (reason == "storage pressure without export request") {
    return 6;
  }
  if (reason == "export retention requested") {
    return 7;
  }
  if (reason == "deep index already built") {
    return 8;
  }
  if (reason == "aged out of active window") {
    return 9;
  }
  return 0;
}

ArchitrinoSolverPathHistoryLifecycleDecisionRow to_lifecycle_decision_row(
    const architrino::solver::PathHistoryChunkLifecycleDecision& decision) {
  return ArchitrinoSolverPathHistoryLifecycleDecisionRow{
      decision.chunkIndex,
      to_lifecycle_tier_code(decision.tier),
      to_lifecycle_action_code(decision.action),
      decision.safeToAgeOut ? 1U : 0U,
      decision.requiresDeepIndex ? 1U : 0U,
      to_lifecycle_reason_code(decision.reason),
      0,
  };
}

architrino::solver::AssemblyStateRowF64 to_assembly_state_row(
    const ArchitrinoSolverAssemblyStateRowF64& row) {
  return architrino::solver::AssemblyStateRowF64{
      row.assembly_key,
      row.assembly_state_key,
      row.time_start,
      row.time_end,
      row.center_x,
      row.center_y,
      row.center_z,
      row.velocity_x,
      row.velocity_y,
      row.velocity_z,
      row.phase,
      row.cycle_index,
      row.model_version,
      row.status_flags,
      row.fidelity_flags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyStateRowF64 to_c_assembly_state_row(
    const architrino::solver::AssemblyStateRowF64& row) {
  return ArchitrinoSolverAssemblyStateRowF64{
      row.assemblyKey,
      row.assemblyStateKey,
      row.timeStart,
      row.timeEnd,
      row.centerX,
      row.centerY,
      row.centerZ,
      row.velocityX,
      row.velocityY,
      row.velocityZ,
      row.phase,
      row.cycleIndex,
      row.modelVersion,
      row.statusFlags,
      row.fidelityFlags,
      row.reserved0,
  };
}

architrino::solver::AssemblyGraphStoreIndexRowF64 to_assembly_graph_store_index_row(
    const ArchitrinoSolverAssemblyGraphStoreIndexRowF64& row) {
  return architrino::solver::AssemblyGraphStoreIndexRowF64{
      row.layout_code,
      row.key_kind,
      row.key,
      row.row_offset,
      row.row_count,
      row.time_start,
      row.time_end,
      row.byte_offset,
      row.byte_length,
      row.state_flags,
      row.reserved0,
  };
}

ArchitrinoSolverAssemblyGraphStoreIndexRowF64 to_c_assembly_graph_store_index_row(
    const architrino::solver::AssemblyGraphStoreIndexRowF64& row) {
  return ArchitrinoSolverAssemblyGraphStoreIndexRowF64{
      row.layoutCode,
      row.keyKind,
      row.key,
      row.rowOffset,
      row.rowCount,
      row.timeStart,
      row.timeEnd,
      row.byteOffset,
      row.byteLength,
      row.stateFlags,
      row.reserved0,
  };
}

architrino::solver::AssemblyGraphStoreIndexQuery to_assembly_graph_store_index_query(
    const ArchitrinoSolverAssemblyGraphStoreIndexQuery& query) {
  return architrino::solver::AssemblyGraphStoreIndexQuery{
      static_cast<architrino::solver::AssemblyGraphStoreIndexLayout>(query.layout_code),
      static_cast<architrino::solver::AssemblyGraphStoreIndexKeyKind>(query.key_kind),
      query.key,
      query.time_start,
      query.time_end,
      query.byte_start,
      query.byte_end,
      query.filter_layout != 0,
      query.filter_key_kind != 0,
      query.filter_key != 0,
      query.filter_time != 0,
      query.filter_byte_range != 0,
  };
}

ArchitrinoSolverAssemblyGraphStoreSummary to_assembly_graph_store_summary(
    const architrino::solver::AssemblyGraphStoreMetadata& metadata) {
  return ArchitrinoSolverAssemblyGraphStoreSummary{
      metadata.states.rowCount,
      metadata.memberships.rowCount,
      metadata.hierarchy.rowCount,
      metadata.events.rowCount,
      metadata.index.rowCount,
      metadata.states.byteLength,
      metadata.memberships.byteLength,
      metadata.hierarchy.byteLength,
      metadata.events.byteLength,
      metadata.index.byteLength,
      metadata.timeStart,
      metadata.timeEnd,
      metadata.hasTimeRange ? 1U : 0U,
      metadata.durable ? 1U : 0U,
  };
}

architrino::solver::SpaceTimeIndexOptions to_spacetime_options(
    const ArchitrinoSolverSpaceTimeIndexOptionsF64& options) {
  return architrino::solver::SpaceTimeIndexOptions{
      options.spatial_cell_size,
      options.time_bin_size,
      static_cast<std::size_t>(options.max_cells_per_item),
  };
}

architrino::solver::SpaceTimeBounds to_spacetime_bounds(
    const ArchitrinoSolverSpaceTimeBoundsF64& bounds) {
  return architrino::solver::SpaceTimeBounds{
      bounds.min_x,
      bounds.min_y,
      bounds.min_z,
      bounds.max_x,
      bounds.max_y,
      bounds.max_z,
      bounds.time_start,
      bounds.time_end,
  };
}

architrino::solver::SpaceTimeIndexRowF64 to_spacetime_index_row(
    const ArchitrinoSolverSpaceTimeIndexRowF64& row) {
  return architrino::solver::SpaceTimeIndexRowF64{
      row.cell_x,
      row.cell_y,
      row.cell_z,
      row.cell_t,
      row.subject_key,
      row.row_offset,
      row.min_x,
      row.min_y,
      row.min_z,
      row.max_x,
      row.max_y,
      row.max_z,
      row.time_start,
      row.time_end,
      row.subject_kind,
      row.source_layout,
      row.state_flags,
      row.reserved0,
  };
}

architrino::solver::EmissionShellBroadPhaseOptions to_emission_shell_options(
    const ArchitrinoSolverEmissionShellBroadPhaseOptionsF64& options,
    int maxRows) {
  const std::size_t maxCandidateCap = static_cast<std::size_t>(std::max(0, maxRows));
  const std::size_t requestedMaxCandidates =
      options.max_candidates == 0 ? maxCandidateCap
                                  : static_cast<std::size_t>(options.max_candidates);
  return architrino::solver::EmissionShellBroadPhaseOptions{
      options.signal_speed,
      options.tolerance,
      std::min(requestedMaxCandidates, maxCandidateCap),
      options.allow_same_path != 0,
      options.has_time_range != 0,
      options.time_range_start,
      options.time_range_end,
      options.requested_worker_count,
  };
}

ArchitrinoSolverEmissionShellCandidateRowF64 to_emission_shell_candidate_row(
    const architrino::solver::EmissionShellBroadPhaseCandidate& candidate) {
  return ArchitrinoSolverEmissionShellCandidateRowF64{
      candidate.sourcePathKey,
      candidate.receiverPathKey,
      candidate.sourceSegmentIndex,
      candidate.receiverSegmentIndex,
      candidate.sourceRowIndex,
      candidate.receiverRowIndex,
      candidate.sourceTimeStart,
      candidate.sourceTimeEnd,
      candidate.receiverTimeStart,
      candidate.receiverTimeEnd,
      candidate.distanceLowerBound,
      candidate.distanceUpperBound,
      candidate.radiusLowerBound,
      candidate.radiusUpperBound,
  };
}

ArchitrinoSolverEmissionShellBroadPhaseSummary to_emission_shell_summary(
    const architrino::solver::EmissionShellBroadPhaseSummary& summary) {
  return ArchitrinoSolverEmissionShellBroadPhaseSummary{
      summary.pairCount,
      summary.rejectedPairCount,
      summary.candidateCount,
      summary.truncated ? 1U : 0U,
      summary.plannedWorkerCount,
  };
}

ArchitrinoSolverEmissionShellNarrowPhaseRowF64 to_emission_shell_narrow_phase_row(
    const architrino::solver::EmissionShellNarrowPhaseEstimate& estimate,
    int itemIndex) {
  return ArchitrinoSolverEmissionShellNarrowPhaseRowF64{
      itemIndex,
      static_cast<int>(estimate.statusCode),
      static_cast<std::uint32_t>(estimate.classification),
      estimate.sampleCount,
      estimate.hitTime,
      estimate.emissionTime,
      estimate.residual,
  };
}

ArchitrinoSolverSpaceTimeIndexRowF64 to_spacetime_index_row(
    const architrino::solver::SpaceTimeIndexRowF64& row) {
  return ArchitrinoSolverSpaceTimeIndexRowF64{
      row.cellX,
      row.cellY,
      row.cellZ,
      row.cellT,
      row.subjectKey,
      row.rowOffset,
      row.minX,
      row.minY,
      row.minZ,
      row.maxX,
      row.maxY,
      row.maxZ,
      row.timeStart,
      row.timeEnd,
      row.subjectKind,
      row.sourceLayout,
      row.stateFlags,
      row.reserved0,
  };
}

architrino::solver::SpaceTimeIndexQuery to_spacetime_query(
    const ArchitrinoSolverSpaceTimeQueryF64& query) {
  return architrino::solver::SpaceTimeIndexQuery{
      to_spacetime_bounds(query.bounds),
      query.filter_space != 0,
      query.filter_time != 0,
      query.filter_subject_kind != 0,
      static_cast<architrino::solver::SpaceTimeSubjectKind>(query.subject_kind),
      query.filter_subject_key != 0,
      query.subject_key,
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
  if (diagnostic.scaleResolutionLimited) {
    flags |= 4;
  }
  if (diagnostic.timeResolutionLimited) {
    flags |= 8;
  }
  return flags;
}

bool valid_precision_path_id(int value) {
  return value >= static_cast<int>(architrino::solver::PrecisionPath::Auto) &&
         value <= static_cast<int>(architrino::solver::PrecisionPath::ValidationReplay);
}

bool valid_claim_level_id(int value) {
  return value >= static_cast<int>(architrino::solver::ClaimLevel::InteractivePreview) &&
         value <= static_cast<int>(architrino::solver::ClaimLevel::ValidationEvidence);
}

architrino::solver::PrecisionSolveOptions to_precision_solve_options(
    const ArchitrinoSolverPrecisionSolveOptions* options) {
  if (options == nullptr) {
    return architrino::solver::PrecisionSolveOptions{};
  }
  return architrino::solver::PrecisionSolveOptions{
      static_cast<architrino::solver::PrecisionPath>(options->requested_precision_path),
      static_cast<architrino::solver::ClaimLevel>(options->claim_level),
      options->allow_escalation != 0,
      options->run_validation_replay != 0,
  };
}

int dominant_status_code(const architrino::solver::ValidationReport& validation) {
  for (const architrino::solver::StatusRecord& status : validation.statuses) {
    if (architrino::solver::is_halt_or_error(status.severity)) {
      return static_cast<int>(status.code);
    }
  }
  for (const architrino::solver::StatusRecord& status : validation.statuses) {
    if (status.severity == architrino::solver::StatusSeverity::Warning) {
      return static_cast<int>(status.code);
    }
  }
  return first_status_code(validation);
}

int dominant_status_severity(const architrino::solver::ValidationReport& validation) {
  for (const architrino::solver::StatusRecord& status : validation.statuses) {
    if (architrino::solver::is_halt_or_error(status.severity)) {
      return static_cast<int>(status.severity);
    }
  }
  for (const architrino::solver::StatusRecord& status : validation.statuses) {
    if (status.severity == architrino::solver::StatusSeverity::Warning) {
      return static_cast<int>(status.severity);
    }
  }
  if (validation.statuses.empty()) {
    return static_cast<int>(architrino::solver::StatusSeverity::Ok);
  }
  return static_cast<int>(validation.statuses.front().severity);
}

ArchitrinoSolverPrecisionSolveSummaryF64 to_precision_solve_summary(
    const architrino::solver::PrecisionSolveReport& report) {
  return ArchitrinoSolverPrecisionSolveSummaryF64{
      static_cast<int>(report.requestedPath),
      static_cast<int>(report.diagnosticPath),
      static_cast<int>(report.selectedPath),
      static_cast<int>(report.selectedNumericType),
      static_cast<int>(report.claimLevel),
      dominant_status_code(report.validation),
      dominant_status_severity(report.validation),
      report.rootCount,
      report.rootTolerance,
      report.maxResidual,
      report.minAbsJacobian,
      report.maxIterations,
      report.scanSubdivisions,
      report.escalated ? 1U : 0U,
      report.validationReplayRun ? 1U : 0U,
      report.validationReplayMatched ? 1U : 0U,
      0U,
  };
}

architrino::solver::CausalRootRequest apply_precision_solve_report_controls(
    architrino::solver::CausalRootRequest request,
    const architrino::solver::PrecisionSolveReport& report) {
  request.rootTolerance = report.rootTolerance;
  request.maxIterations = report.maxIterations;
  request.scanSubdivisions = report.scanSubdivisions;
  request.source.numericType = report.selectedNumericType;
  request.receiver.numericType = report.selectedNumericType;
  return request;
}

architrino::solver::ErrorBudget to_error_budget(const ArchitrinoSolverErrorBudgetF64& budget) {
  return architrino::solver::ErrorBudget{
      budget.global_tolerance,
      budget.root_isolation_tolerance,
      budget.delayed_hit_tolerance,
      budget.integration_tolerance,
      budget.stream_encoding_tolerance,
      budget.readback_tolerance,
      budget.projection_tolerance,
      budget.display_tolerance,
  };
}

architrino::solver::ErrorBudgetStageInput to_error_budget_stage_input(
    const ArchitrinoSolverErrorBudgetStageInputF64& row) {
  return architrino::solver::ErrorBudgetStageInput{
      static_cast<architrino::solver::ErrorBudgetStage>(row.stage),
      row.estimated_absolute_error,
  };
}

ArchitrinoSolverErrorBudgetStageRowF64 to_error_budget_stage_row(
    const architrino::solver::ErrorBudgetStageReport& row) {
  return ArchitrinoSolverErrorBudgetStageRowF64{
      static_cast<int>(row.stage),
      static_cast<int>(row.authority),
      static_cast<int>(row.status.code),
      static_cast<int>(row.status.severity),
      row.estimatedAbsoluteError,
      row.tolerance,
      row.toleranceRatio,
  };
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

int copy_hits(const std::vector<architrino::solver::DelayedHitEvent>& source,
              ArchitrinoSolverDelayedHitRowF64* hits,
              int maxHits,
              int* outHitCount);

int copy_root_ledger_detail_rows(
    const std::vector<architrino::solver::RootLedgerDetailRowF64>& source,
    ArchitrinoSolverRootLedgerDetailRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_root_ledger_detail_row(source[static_cast<std::size_t>(index)]);
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

extern "C" int architrino_solver_solve_causal_roots_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    const ArchitrinoSolverPrecisionSolveOptions* options,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverPrecisionSolveSummaryF64* out_summary) {
  if (request == nullptr || out_root_count == nullptr || out_summary == nullptr ||
      max_roots < 0) {
    return -1;
  }
  if (options != nullptr &&
      (!valid_precision_path_id(options->requested_precision_path) ||
       !valid_claim_level_id(options->claim_level))) {
    *out_root_count = 0;
    return -1;
  }

  const architrino::solver::PrecisionCausalRootResult result =
      architrino::solver::solve_causal_roots_with_precision(
          to_request(request),
          to_precision_solve_options(options));
  *out_summary = to_precision_solve_summary(result.precision);

  if (!result.precision.validation.ok || !result.roots.validation.ok) {
    *out_root_count = 0;
    return -2;
  }

  return copy_roots(result.roots.roots, roots, max_roots, out_root_count);
}

extern "C" int architrino_solver_solve_roots_and_hits_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    const ArchitrinoSolverPrecisionSolveOptions* options,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_hit_count,
    ArchitrinoSolverPrecisionSolveSummaryF64* out_summary) {
  if (request == nullptr || out_root_count == nullptr || out_hit_count == nullptr ||
      out_summary == nullptr || max_roots < 0 || max_hits < 0) {
    return -1;
  }
  if (options != nullptr &&
      (!valid_precision_path_id(options->requested_precision_path) ||
       !valid_claim_level_id(options->claim_level))) {
    *out_root_count = 0;
    *out_hit_count = 0;
    return -1;
  }

  const architrino::solver::PrecisionRootsAndHitsResult result =
      architrino::solver::solve_roots_and_hits_with_precision(
          to_request(request),
          to_precision_solve_options(options));
  *out_summary = to_precision_solve_summary(result.precision);

  if (!result.precision.validation.ok || !result.roots.validation.ok ||
      !result.hits.validation.ok) {
    *out_root_count = 0;
    *out_hit_count = 0;
    return -2;
  }

  const int rootStatus = copy_roots(result.roots.roots, roots, max_roots, out_root_count);
  const int hitStatus = copy_hits(result.hits.events, hits, max_hits, out_hit_count);
  if (rootStatus != 0) {
    return rootStatus;
  }
  return hitStatus;
}

extern "C" int architrino_solver_solve_roots_hits_ledger_precision_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    const ArchitrinoSolverPrecisionSolveOptions* options,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_hit_count,
    ArchitrinoSolverRootLedgerDetailRowF64* ledger_rows,
    int max_ledger_rows,
    int* out_ledger_row_count,
    ArchitrinoSolverPrecisionSolveSummaryF64* out_summary) {
  if (request == nullptr || out_root_count == nullptr || out_hit_count == nullptr ||
      out_ledger_row_count == nullptr || out_summary == nullptr || max_roots < 0 ||
      max_hits < 0 || max_ledger_rows < 0) {
    return -1;
  }
  *out_root_count = 0;
  *out_hit_count = 0;
  *out_ledger_row_count = 0;
  if (options != nullptr &&
      (!valid_precision_path_id(options->requested_precision_path) ||
       !valid_claim_level_id(options->claim_level))) {
    return -1;
  }

  const architrino::solver::CausalRootRequest baseRequest = to_request(request);
  const architrino::solver::PrecisionRootsAndHitsResult result =
      architrino::solver::solve_roots_and_hits_with_precision(
          baseRequest,
          to_precision_solve_options(options));
  *out_summary = to_precision_solve_summary(result.precision);

  if (!result.precision.validation.ok || !result.roots.validation.ok ||
      !result.hits.validation.ok) {
    return -2;
  }

  const architrino::solver::CausalRootRequest ledgerRequest =
      apply_precision_solve_report_controls(baseRequest, result.precision);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> detailRows =
      architrino::solver::build_root_ledger_detail(ledgerRequest, result.roots);

  const int rootStatus = copy_roots(result.roots.roots, roots, max_roots, out_root_count);
  const int hitStatus = copy_hits(result.hits.events, hits, max_hits, out_hit_count);
  const int ledgerStatus =
      copy_root_ledger_detail_rows(detailRows, ledger_rows, max_ledger_rows, out_ledger_row_count);
  if (rootStatus != 0) {
    return rootStatus;
  }
  if (hitStatus != 0) {
    return hitStatus;
  }
  return ledgerStatus;
}

extern "C" int architrino_solver_propagate_error_budget_f64(
    const ArchitrinoSolverErrorBudgetF64* budget,
    const ArchitrinoSolverErrorBudgetStageInputF64* observed_stages,
    int stage_count,
    ArchitrinoSolverErrorBudgetStageRowF64* rows,
    int max_rows,
    ArchitrinoSolverErrorBudgetSummaryF64* out_summary) {
  if (budget == nullptr || out_summary == nullptr || stage_count < 0 || max_rows < 0) {
    return -1;
  }
  if (stage_count > 0 && observed_stages == nullptr) {
    return -1;
  }

  std::vector<architrino::solver::ErrorBudgetStageInput> cppStages;
  cppStages.reserve(static_cast<std::size_t>(stage_count));
  for (int index = 0; index < stage_count; ++index) {
    cppStages.push_back(to_error_budget_stage_input(observed_stages[index]));
  }

  const architrino::solver::ErrorBudgetPropagationReport report =
      architrino::solver::propagate_error_budget(to_error_budget(*budget), cppStages);

  if (root_count_overflows(report.stages.size())) {
    *out_summary = ArchitrinoSolverErrorBudgetSummaryF64{};
    return -4;
  }

  *out_summary = ArchitrinoSolverErrorBudgetSummaryF64{
      static_cast<int>(report.authority),
      dominant_status_code(report.validation),
      dominant_status_severity(report.validation),
      static_cast<int>(report.stages.size()),
      report.cumulativeError,
      report.cumulativeBudgetRatio,
  };

  if (rows == nullptr || max_rows == 0) {
    return report.stages.empty() ? (report.validation.ok ? 0 : -2) : -3;
  }
  if (max_rows < static_cast<int>(report.stages.size())) {
    return -3;
  }

  for (std::size_t index = 0; index < report.stages.size(); ++index) {
    rows[index] = to_error_budget_stage_row(report.stages[index]);
  }

  return report.validation.ok ? 0 : -2;
}

extern "C" int architrino_solver_build_root_ledger_detail_f64(
    const ArchitrinoSolverCausalRootRequestF64* request,
    ArchitrinoSolverRootLedgerDetailRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (request == nullptr || out_row_count == nullptr || max_rows < 0) {
    return -1;
  }

  const architrino::solver::CausalRootRequest cppRequest = to_request(request);
  const architrino::solver::CausalRootResult roots =
      architrino::solver::solve_causal_roots(cppRequest);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> detailRows =
      architrino::solver::build_root_ledger_detail(cppRequest, roots);
  const int copyStatus =
      copy_root_ledger_detail_rows(detailRows, rows, max_rows, out_row_count);
  if (copyStatus != 0) {
    return copyStatus;
  }
  return 0;
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

int copy_motion_frames(const std::vector<architrino::solver::MotionFrameRowF64>& source,
                       ArchitrinoSolverMotionFrameRowF64* frames,
                       int maxFrames,
                       int* outFrameCount) {
  if (root_count_overflows(source.size())) {
    *outFrameCount = 0;
    return -4;
  }

  const int requiredFrames = static_cast<int>(source.size());
  *outFrameCount = requiredFrames;
  if (frames == nullptr || maxFrames == 0) {
    return requiredFrames == 0 ? 0 : -3;
  }
  if (maxFrames < requiredFrames) {
    return -3;
  }
  for (int index = 0; index < requiredFrames; ++index) {
    frames[index] = to_motion_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_phase_rows(const std::vector<architrino::solver::PhaseAtHit>& source,
                    ArchitrinoSolverPhaseAtHitRowF64* rows,
                    int maxRows,
                    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_phase_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_spacetime_index_rows(const std::vector<architrino::solver::SpaceTimeIndexRowF64>& source,
                              ArchitrinoSolverSpaceTimeIndexRowF64* rows,
                              int maxRows,
                              int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_spacetime_index_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_lifecycle_decision_rows(
    const std::vector<architrino::solver::PathHistoryChunkLifecycleDecision>& source,
    ArchitrinoSolverPathHistoryLifecycleDecisionRow* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_lifecycle_decision_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_path_history_rows(const std::vector<architrino::solver::PathHistoryRowF64>& source,
                           ArchitrinoSolverPathHistoryRowF64* rows,
                           int maxRows,
                           int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_path_history_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_path_history_index_rows(
    const std::vector<architrino::solver::PathHistoryIndexRow>& source,
    ArchitrinoSolverPathHistoryIndexRow* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_path_history_index_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_path_history_chunk_rows(
    const std::vector<architrino::solver::PathHistoryChunkRow>& source,
    ArchitrinoSolverPathHistoryChunkRow* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_path_history_chunk_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_assembly_state_rows(
    const std::vector<architrino::solver::AssemblyStateRowF64>& source,
    ArchitrinoSolverAssemblyStateRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_assembly_state_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_assembly_membership_rows(
    const std::vector<architrino::solver::AssemblyMembershipRowF64>& source,
    ArchitrinoSolverAssemblyMembershipRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_membership_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_assembly_hierarchy_rows(
    const std::vector<architrino::solver::AssemblyHierarchyRowF64>& source,
    ArchitrinoSolverAssemblyHierarchyRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_hierarchy_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_assembly_event_rows(
    const std::vector<architrino::solver::AssemblyEventRowF64>& source,
    ArchitrinoSolverAssemblyEventRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_assembly_event_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

int copy_assembly_graph_store_index_rows(
    const std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64>& source,
    ArchitrinoSolverAssemblyGraphStoreIndexRowF64* rows,
    int maxRows,
    int* outRowCount) {
  if (root_count_overflows(source.size())) {
    *outRowCount = 0;
    return -4;
  }

  const int requiredRows = static_cast<int>(source.size());
  *outRowCount = requiredRows;
  if (rows == nullptr || maxRows == 0) {
    return requiredRows == 0 ? 0 : -3;
  }
  if (maxRows < requiredRows) {
    return -3;
  }
  for (int index = 0; index < requiredRows; ++index) {
    rows[index] = to_c_assembly_graph_store_index_row(source[static_cast<std::size_t>(index)]);
  }
  return 0;
}

}  // namespace

extern "C" ArchitrinoSolverAbiInfo architrino_solver_abi_info() {
  return ArchitrinoSolverAbiInfo{
      0,
      7,
      0,
      static_cast<int>(sizeof(ArchitrinoSolverCausalRootRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCausalRootRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverDelayedHitRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverMotionSampleRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverMotionFrameRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverPhaseClockF64)),
      static_cast<int>(sizeof(ArchitrinoSolverPhaseAtHitRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverBoundsRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverSpherePointIntersectionRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverSpherePointIntersectionRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverDelayedPotentialRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverDelayedPotentialRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCircularSelfHitSpanRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCircularSelfHitSpanRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverAssemblyStateRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverAssemblyMembershipRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverAssemblyHierarchyRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverAssemblyEventRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverPathHistoryRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverPathHistoryChunkRow)),
      static_cast<int>(sizeof(ArchitrinoSolverStorageLifecyclePolicy)),
      static_cast<int>(sizeof(ArchitrinoSolverPathHistoryLifecycleDecisionRow)),
      static_cast<int>(sizeof(ArchitrinoSolverSpaceTimeIndexRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverEmissionShellBroadPhaseOptionsF64)),
      static_cast<int>(sizeof(ArchitrinoSolverEmissionShellCandidateRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverEmissionShellBroadPhaseSummary)),
      static_cast<int>(sizeof(ArchitrinoSolverEmissionShellNarrowPhaseRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverEmissionShellNarrowPhaseRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverRootLedgerDetailRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverErrorBudgetF64)),
      static_cast<int>(sizeof(ArchitrinoSolverErrorBudgetStageInputF64)),
      static_cast<int>(sizeof(ArchitrinoSolverErrorBudgetStageRowF64)),
      static_cast<int>(sizeof(ArchitrinoSolverErrorBudgetSummaryF64)),
      static_cast<int>(sizeof(ArchitrinoSolverPrecisionSolveOptions)),
      static_cast<int>(sizeof(ArchitrinoSolverPrecisionSolveSummaryF64)),
      static_cast<int>(sizeof(ArchitrinoSolverMotionIntegrationRequestF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCircularPathSegmentF64)),
      static_cast<int>(sizeof(ArchitrinoSolverCircularSourceCausalRootRequestF64)),
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

extern "C" int architrino_solver_solve_circular_source_causal_roots_f64(
    const ArchitrinoSolverCircularSourceCausalRootRequestF64* request,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    int* out_root_count) {
  if (request == nullptr || out_root_count == nullptr || max_roots < 0) {
    return -1;
  }

  const architrino::solver::CircularSourceCausalRootRequest cppRequest = to_request(request);

  const architrino::solver::CausalRootResult result =
      architrino::solver::solve_circular_source_causal_roots(cppRequest);
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

extern "C" int architrino_solver_solve_roots_and_hits_batch_f64(
    const ArchitrinoSolverCausalRootRequestF64* requests,
    int request_count,
    int worker_count,
    ArchitrinoSolverCausalRootBatchItemRowF64* items,
    int max_items,
    ArchitrinoSolverCausalRootRowF64* roots,
    int max_roots,
    ArchitrinoSolverDelayedHitRowF64* hits,
    int max_hits,
    int* out_item_count,
    int* out_root_count,
    int* out_hit_count) {
  if (requests == nullptr || out_item_count == nullptr || out_root_count == nullptr ||
      out_hit_count == nullptr || request_count < 0 || worker_count < 0 ||
      max_items < 0 || max_roots < 0 || max_hits < 0) {
    return -1;
  }

  *out_item_count = request_count;
  *out_root_count = 0;
  *out_hit_count = 0;
  if (items == nullptr || roots == nullptr || hits == nullptr || max_items < request_count) {
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
      *out_hit_count = 0;
      return -4;
    }
    requiredRoots += itemResult.result.roots.size();
    if (root_count_overflows(requiredRoots)) {
      *out_root_count = 0;
      *out_hit_count = 0;
      return -4;
    }
  }
  *out_root_count = static_cast<int>(requiredRoots);
  *out_hit_count = static_cast<int>(requiredRoots);
  if (max_roots < *out_root_count || max_hits < *out_hit_count) {
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
      const architrino::solver::CausalRoot& root =
          itemResult.result.roots[static_cast<std::size_t>(rootIndex)];
      roots[rootOffset + rootIndex] = to_row(root);
      hits[rootOffset + rootIndex] = to_delayed_hit_row_from_root(root, rootOffset + rootIndex);
    }
    rootOffset += rootCount;
  }

  return 0;
}

extern "C" int architrino_solver_sample_linear_motion_f64(
    const ArchitrinoSolverMotionSampleRequestF64* request,
    ArchitrinoSolverMotionFrameRowF64* frames,
    int max_frames,
    int* out_frame_count) {
  if (request == nullptr || out_frame_count == nullptr || max_frames < 0) {
    return -1;
  }

  const architrino::solver::MotionSampleResult result =
      architrino::solver::sample_linear_motion(to_motion_request(request));
  if (!result.validation.ok) {
    *out_frame_count = 0;
    return -2;
  }

  return copy_motion_frames(result.frames, frames, max_frames, out_frame_count);
}

extern "C" int architrino_solver_sample_linear_path_history_f64(
    const ArchitrinoSolverMotionSampleRequestF64* request,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (request == nullptr || out_row_count == nullptr || max_rows < 0) {
    return -1;
  }

  const architrino::solver::MotionPathHistoryResult result =
      architrino::solver::sample_linear_path_history(to_motion_request(request));
  if (!result.validation.ok) {
    *out_row_count = 0;
    return -2;
  }

  return copy_path_history_rows(result.rows, rows, max_rows, out_row_count);
}

extern "C" int architrino_solver_integrate_constant_acceleration_motion_f64(
    const ArchitrinoSolverMotionIntegrationRequestF64* request,
    ArchitrinoSolverMotionFrameRowF64* frames,
    int max_frames,
    int* out_frame_count) {
  if (request == nullptr || out_frame_count == nullptr || max_frames < 0) {
    return -1;
  }

  const architrino::solver::MotionSampleResult result =
      architrino::solver::integrate_constant_acceleration_motion(
          to_motion_integration_request(request));
  if (!result.validation.ok) {
    *out_frame_count = 0;
    return -2;
  }

  return copy_motion_frames(result.frames, frames, max_frames, out_frame_count);
}

extern "C" int architrino_solver_integrate_constant_acceleration_path_history_f64(
    const ArchitrinoSolverMotionIntegrationRequestF64* request,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (request == nullptr || out_row_count == nullptr || max_rows < 0) {
    return -1;
  }

  const architrino::solver::MotionPathHistoryResult result =
      architrino::solver::integrate_constant_acceleration_path_history(
          to_motion_integration_request(request));
  if (!result.validation.ok) {
    *out_row_count = 0;
    return -2;
  }

  return copy_path_history_rows(result.rows, rows, max_rows, out_row_count);
}

extern "C" int architrino_solver_compute_phase_at_hit_f64(
    const ArchitrinoSolverCausalRootRowF64* roots,
    int root_count,
    const ArchitrinoSolverPhaseClockF64* source_clock,
    const ArchitrinoSolverPhaseClockF64* receiver_clock,
    ArchitrinoSolverPhaseAtHitRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (roots == nullptr || source_clock == nullptr || receiver_clock == nullptr ||
      out_row_count == nullptr || root_count < 0 || max_rows < 0) {
    return -1;
  }

  std::vector<architrino::solver::CausalRoot> cppRoots;
  cppRoots.reserve(static_cast<std::size_t>(root_count));
  for (int index = 0; index < root_count; ++index) {
    cppRoots.push_back(to_root(roots[index]));
  }

  const architrino::solver::PhaseAtHitResult result =
      architrino::solver::compute_phase_at_hits(
          cppRoots,
          to_phase_clock(*source_clock),
          to_phase_clock(*receiver_clock));
  if (!result.validation.ok) {
    *out_row_count = 0;
    return -2;
  }

  return copy_phase_rows(result.rows, rows, max_rows, out_row_count);
}

extern "C" int architrino_solver_compute_path_bounds_f64(
    const ArchitrinoSolverLinearPathSegmentF64* segments,
    const std::uint64_t* path_keys,
    int segment_count,
    ArchitrinoSolverBoundsRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (segments == nullptr || out_row_count == nullptr || segment_count < 0 || max_rows < 0) {
    return -1;
  }

  *out_row_count = segment_count;
  if (rows == nullptr || max_rows < segment_count) {
    return segment_count == 0 ? 0 : -3;
  }

  for (int index = 0; index < segment_count; ++index) {
    const std::uint64_t pathKey =
        path_keys == nullptr ? static_cast<std::uint64_t>(index) : path_keys[index];
    rows[index] = to_bounds_row(
        architrino::solver::path_segment_bounds(to_segment(segments[index], "geometry-path")),
        index,
        pathKey);
  }
  return 0;
}

extern "C" int architrino_solver_intersect_sphere_points_f64(
    const ArchitrinoSolverSpherePointIntersectionRequestF64* requests,
    int request_count,
    ArchitrinoSolverSpherePointIntersectionRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (requests == nullptr || out_row_count == nullptr || request_count < 0 || max_rows < 0) {
    return -1;
  }

  *out_row_count = request_count;
  if (rows == nullptr || max_rows < request_count) {
    return request_count == 0 ? 0 : -3;
  }

  for (int index = 0; index < request_count; ++index) {
    const ArchitrinoSolverSpherePointIntersectionRequestF64& request = requests[index];
    rows[index] = to_sphere_point_row(
        architrino::solver::sphere_point_intersection(
            to_vector(request.center),
            request.radius,
            to_vector(request.point),
            request.tolerance),
        index);
  }
  return 0;
}

extern "C" int architrino_solver_compute_delayed_potentials_f64(
    const ArchitrinoSolverDelayedPotentialRequestF64* requests,
    int request_count,
    ArchitrinoSolverDelayedPotentialRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (requests == nullptr || out_row_count == nullptr || request_count < 0 || max_rows < 0) {
    return -1;
  }

  *out_row_count = request_count;
  if (rows == nullptr || max_rows < request_count) {
    return request_count == 0 ? 0 : -3;
  }

  for (int index = 0; index < request_count; ++index) {
    rows[index] = to_delayed_potential_row(
        architrino::solver::compute_delayed_potential(
            to_delayed_potential_request(requests[index])),
        index);
  }
  return 0;
}

extern "C" int architrino_solver_solve_circular_self_hit_spans_f64(
    const ArchitrinoSolverCircularSelfHitSpanRequestF64* requests,
    int request_count,
    ArchitrinoSolverCircularSelfHitSpanRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (requests == nullptr || out_row_count == nullptr || request_count < 0 || max_rows < 0) {
    return -1;
  }

  *out_row_count = request_count;
  if (rows == nullptr || max_rows < request_count) {
    return request_count == 0 ? 0 : -3;
  }

  for (int index = 0; index < request_count; ++index) {
    rows[index] = to_circular_self_hit_row(
        architrino::solver::solve_circular_self_hit_span(
            to_circular_self_hit_request(requests[index])),
        index);
  }
  return 0;
}

extern "C" int architrino_solver_detect_assembly_membership_events_f64(
    const ArchitrinoSolverAssemblyMembershipRowF64* memberships,
    int membership_count,
    ArchitrinoSolverAssemblyEventRowF64* events,
    int max_events,
    int* out_event_count) {
  if (memberships == nullptr || out_event_count == nullptr || membership_count < 0 ||
      max_events < 0) {
    return -1;
  }

  std::vector<architrino::solver::AssemblyMembershipRowF64> cppMemberships;
  cppMemberships.reserve(static_cast<std::size_t>(membership_count));
  for (int index = 0; index < membership_count; ++index) {
    cppMemberships.push_back(to_membership_row(memberships[index]));
  }

  const std::vector<architrino::solver::AssemblyEventRowF64> cppEvents =
      architrino::solver::detect_membership_change_events(std::move(cppMemberships));
  if (root_count_overflows(cppEvents.size())) {
    *out_event_count = 0;
    return -4;
  }

  const int requiredEvents = static_cast<int>(cppEvents.size());
  *out_event_count = requiredEvents;
  if (events == nullptr || max_events < requiredEvents) {
    return requiredEvents == 0 ? 0 : -3;
  }

  for (int index = 0; index < requiredEvents; ++index) {
    events[index] = to_assembly_event_row(cppEvents[static_cast<std::size_t>(index)]);
  }
  return 0;
}

extern "C" int architrino_solver_write_assembly_graph_store_f64(
    const char* store_id,
    const char* state_path,
    const char* membership_path,
    const char* hierarchy_path,
    const char* event_path,
    const char* index_path,
    const char* metadata_path,
    const ArchitrinoSolverAssemblyStateRowF64* states,
    int state_count,
    const ArchitrinoSolverAssemblyMembershipRowF64* memberships,
    int membership_count,
    const ArchitrinoSolverAssemblyHierarchyRowF64* hierarchy,
    int hierarchy_count,
    const ArchitrinoSolverAssemblyEventRowF64* events,
    int event_count,
    std::uint32_t durable,
    ArchitrinoSolverAssemblyGraphStoreSummary* out_summary) {
  if (state_path == nullptr || membership_path == nullptr || hierarchy_path == nullptr ||
      event_path == nullptr || metadata_path == nullptr || out_summary == nullptr ||
      state_count < 0 || membership_count < 0 || hierarchy_count < 0 || event_count < 0 ||
      (state_count > 0 && states == nullptr) ||
      (membership_count > 0 && memberships == nullptr) ||
      (hierarchy_count > 0 && hierarchy == nullptr) ||
      (event_count > 0 && events == nullptr)) {
    return -1;
  }

  try {
    architrino::solver::AssemblyGraphStoreOptions options;
    if (store_id != nullptr && store_id[0] != '\0') {
      options.storeId = store_id;
    }
    options.statePath = state_path;
    options.membershipPath = membership_path;
    options.hierarchyPath = hierarchy_path;
    options.eventPath = event_path;
    options.indexPath = index_path == nullptr ? "" : index_path;
    options.metadataPath = metadata_path;
    options.durable = durable != 0;

    architrino::solver::AssemblyGraphStoreWriter writer(std::move(options));
    for (int index = 0; index < state_count; ++index) {
      writer.append_state(to_assembly_state_row(states[index]));
    }
    for (int index = 0; index < membership_count; ++index) {
      writer.append_membership(to_membership_row(memberships[index]));
    }
    for (int index = 0; index < hierarchy_count; ++index) {
      writer.append_hierarchy(to_hierarchy_row(hierarchy[index]));
    }
    for (int index = 0; index < event_count; ++index) {
      writer.append_event(to_cpp_assembly_event_row(events[index]));
    }
    *out_summary = to_assembly_graph_store_summary(writer.close());
    return 0;
  } catch (...) {
    *out_summary = ArchitrinoSolverAssemblyGraphStoreSummary{};
    return -2;
  }
}

extern "C" int architrino_solver_read_assembly_graph_store_states_f64(
    const char* state_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyStateRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (state_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    return copy_assembly_state_rows(
        architrino::solver::read_assembly_state_rows(
            state_path,
            row_offset,
            static_cast<std::size_t>(row_count)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_assembly_graph_store_memberships_f64(
    const char* membership_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyMembershipRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (membership_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    return copy_assembly_membership_rows(
        architrino::solver::read_assembly_membership_rows(
            membership_path,
            row_offset,
            static_cast<std::size_t>(row_count)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_assembly_graph_store_hierarchy_f64(
    const char* hierarchy_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyHierarchyRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (hierarchy_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    return copy_assembly_hierarchy_rows(
        architrino::solver::read_assembly_hierarchy_rows(
            hierarchy_path,
            row_offset,
            static_cast<std::size_t>(row_count)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_assembly_graph_store_events_f64(
    const char* event_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyEventRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (event_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    return copy_assembly_event_rows(
        architrino::solver::read_assembly_event_rows(
            event_path,
            row_offset,
            static_cast<std::size_t>(row_count)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_assembly_graph_store_index(
    const char* index_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverAssemblyGraphStoreIndexRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (index_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    return copy_assembly_graph_store_index_rows(
        architrino::solver::read_assembly_graph_store_index_rows(
            index_path,
            row_offset,
            static_cast<std::size_t>(row_count)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_query_assembly_graph_store_index(
    const ArchitrinoSolverAssemblyGraphStoreIndexRowF64* index_rows,
    int index_row_count,
    const ArchitrinoSolverAssemblyGraphStoreIndexQuery* query,
    ArchitrinoSolverAssemblyGraphStoreIndexRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (query == nullptr || out_row_count == nullptr || index_row_count < 0 || max_rows < 0 ||
      (index_row_count > 0 && index_rows == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::AssemblyGraphStoreIndexRowF64> cppRows;
    cppRows.reserve(static_cast<std::size_t>(index_row_count));
    for (int index = 0; index < index_row_count; ++index) {
      cppRows.push_back(to_assembly_graph_store_index_row(index_rows[index]));
    }
    return copy_assembly_graph_store_index_rows(
        architrino::solver::query_assembly_graph_store_index(
            cppRows,
            to_assembly_graph_store_index_query(*query)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_build_spacetime_index_f64(
    const ArchitrinoSolverPathHistoryRowF64* path_rows,
    int path_row_count,
    const ArchitrinoSolverAssemblyStateRowF64* assembly_state_rows,
    int assembly_state_row_count,
    const ArchitrinoSolverSpaceTimeIndexOptionsF64* options,
    ArchitrinoSolverSpaceTimeIndexRowF64* rows,
    int max_rows,
    int* out_row_count,
    int* out_overflow_count) {
  if (options == nullptr || out_row_count == nullptr || out_overflow_count == nullptr ||
      path_row_count < 0 || assembly_state_row_count < 0 || max_rows < 0 ||
      (path_row_count > 0 && path_rows == nullptr) ||
      (assembly_state_row_count > 0 && assembly_state_rows == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::PathHistoryRowF64> cppPathRows;
    cppPathRows.reserve(static_cast<std::size_t>(path_row_count));
    for (int index = 0; index < path_row_count; ++index) {
      cppPathRows.push_back(to_path_history_row(path_rows[index]));
    }

    std::vector<architrino::solver::AssemblyStateRowF64> cppAssemblyRows;
    cppAssemblyRows.reserve(static_cast<std::size_t>(assembly_state_row_count));
    for (int index = 0; index < assembly_state_row_count; ++index) {
      cppAssemblyRows.push_back(to_assembly_state_row(assembly_state_rows[index]));
    }

    const architrino::solver::SpaceTimeIndexOptions cppOptions =
        to_spacetime_options(*options);
    architrino::solver::SpaceTimeIndexBuildResult pathResult =
        architrino::solver::build_path_history_spacetime_index(cppPathRows, cppOptions);
    architrino::solver::SpaceTimeIndexBuildResult assemblyResult =
        architrino::solver::build_assembly_state_spacetime_index(cppAssemblyRows, cppOptions);
    const architrino::solver::SpaceTimeIndexBuildResult merged =
        architrino::solver::merge_spacetime_index_results({pathResult, assemblyResult});
    *out_overflow_count = static_cast<int>(
        std::min<std::size_t>(merged.overflowEntryCount,
                              static_cast<std::size_t>(std::numeric_limits<int>::max())));
    if (!merged.validation.ok) {
      *out_row_count = 0;
      return -2;
    }
    return copy_spacetime_index_rows(merged.rows, rows, max_rows, out_row_count);
  } catch (...) {
    *out_row_count = 0;
    *out_overflow_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_query_spacetime_index_f64(
    const ArchitrinoSolverSpaceTimeIndexRowF64* index_rows,
    int index_row_count,
    const ArchitrinoSolverSpaceTimeQueryF64* query,
    const ArchitrinoSolverSpaceTimeIndexOptionsF64* options,
    ArchitrinoSolverSpaceTimeIndexRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (query == nullptr || options == nullptr || out_row_count == nullptr ||
      index_row_count < 0 || max_rows < 0 || (index_row_count > 0 && index_rows == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::SpaceTimeIndexRowF64> cppRows;
    cppRows.reserve(static_cast<std::size_t>(index_row_count));
    for (int index = 0; index < index_row_count; ++index) {
      cppRows.push_back(to_spacetime_index_row(index_rows[index]));
    }

    const std::vector<architrino::solver::SpaceTimeIndexRowF64> matches =
        architrino::solver::query_spacetime_index(
            cppRows,
            to_spacetime_query(*query),
            to_spacetime_options(*options));
    return copy_spacetime_index_rows(matches, rows, max_rows, out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_query_emission_shell_broad_phase_f64(
    const ArchitrinoSolverPathHistoryRowF64* source_rows,
    int source_row_count,
    const ArchitrinoSolverPathHistoryRowF64* receiver_rows,
    int receiver_row_count,
    const ArchitrinoSolverEmissionShellBroadPhaseOptionsF64* options,
    ArchitrinoSolverEmissionShellCandidateRowF64* rows,
    int max_rows,
    ArchitrinoSolverEmissionShellBroadPhaseSummary* out_summary) {
  if (options == nullptr || out_summary == nullptr || source_row_count < 0 ||
      receiver_row_count < 0 || max_rows < 0 ||
      (source_row_count > 0 && source_rows == nullptr) ||
      (receiver_row_count > 0 && receiver_rows == nullptr) ||
      (max_rows > 0 && rows == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::PathHistoryRowF64> cppSourceRows;
    cppSourceRows.reserve(static_cast<std::size_t>(source_row_count));
    for (int index = 0; index < source_row_count; ++index) {
      cppSourceRows.push_back(to_path_history_row(source_rows[index]));
    }

    std::vector<architrino::solver::PathHistoryRowF64> cppReceiverRows;
    cppReceiverRows.reserve(static_cast<std::size_t>(receiver_row_count));
    for (int index = 0; index < receiver_row_count; ++index) {
      cppReceiverRows.push_back(to_path_history_row(receiver_rows[index]));
    }

    const architrino::solver::EmissionShellBroadPhaseOptions cppOptions =
        to_emission_shell_options(*options, max_rows);
    const architrino::solver::EmissionShellBroadPhaseResult result =
        cppOptions.requestedWorkerCount > 1
            ? architrino::solver::query_emission_shell_broad_phase_parallel(
                  cppSourceRows,
                  cppReceiverRows,
                  cppOptions,
                  architrino::solver::ParallelExecutionOptions{
                      cppOptions.requestedWorkerCount,
                      1,
                      true,
                  })
            : architrino::solver::query_emission_shell_broad_phase(
                  cppSourceRows,
                  cppReceiverRows,
                  cppOptions);
    *out_summary = to_emission_shell_summary(result.summary);
    for (std::size_t index = 0; index < result.candidates.size(); ++index) {
      rows[index] = to_emission_shell_candidate_row(result.candidates[index]);
    }
    return 0;
  } catch (...) {
    *out_summary = ArchitrinoSolverEmissionShellBroadPhaseSummary{};
    return -2;
  }
}

extern "C" int architrino_solver_estimate_emission_shell_narrow_phase_f64(
    const ArchitrinoSolverEmissionShellNarrowPhaseRequestF64* requests,
    int request_count,
    ArchitrinoSolverEmissionShellNarrowPhaseRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (requests == nullptr || out_row_count == nullptr || request_count < 0 || max_rows < 0) {
    return -1;
  }

  *out_row_count = request_count;
  if (rows == nullptr || max_rows < request_count) {
    return request_count == 0 ? 0 : -3;
  }

  try {
    for (int index = 0; index < request_count; ++index) {
      const ArchitrinoSolverEmissionShellNarrowPhaseRequestF64& request = requests[index];
      rows[index] = to_emission_shell_narrow_phase_row(
          architrino::solver::estimate_emission_shell_narrow_phase(
              to_path_history_row(request.source),
              to_path_history_row(request.receiver),
              request.signal_speed,
              request.tolerance),
          index);
    }
    return 0;
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_write_path_history_stream_f64(
    const char* stream_id,
    const char* data_path,
    const char* index_path,
    const char* chunk_path,
    const char* metadata_path,
    const ArchitrinoSolverPathHistoryRowF64* path_rows,
    int path_row_count,
    std::uint64_t rows_per_index_chunk,
    std::uint32_t durable,
    ArchitrinoSolverPathHistoryStreamSummary* out_summary) {
  if (data_path == nullptr || index_path == nullptr || metadata_path == nullptr ||
      out_summary == nullptr || path_row_count < 0 || rows_per_index_chunk == 0 ||
      (path_row_count > 0 && path_rows == nullptr) ||
      rows_per_index_chunk > static_cast<std::uint64_t>(std::numeric_limits<std::size_t>::max())) {
    return -1;
  }

  try {
    architrino::solver::PathHistoryStreamOptions options;
    if (stream_id != nullptr && stream_id[0] != '\0') {
      options.streamId = stream_id;
    }
    options.dataPath = data_path;
    options.indexPath = index_path;
    options.chunkPath = chunk_path == nullptr ? "" : chunk_path;
    options.metadataPath = metadata_path;
    options.rowsPerIndexChunk = static_cast<std::size_t>(rows_per_index_chunk);
    options.durable = durable != 0;

    architrino::solver::PathHistoryStreamWriter writer(std::move(options));
    for (int index = 0; index < path_row_count; ++index) {
      const architrino::solver::PathHistoryRowF64 row =
          to_path_history_row(path_rows[index]);
      writer.append(to_segment(row), row.pathKey, row.segmentIndex, row.stateFlags);
    }
    *out_summary = to_path_history_stream_summary(writer.close());
    return 0;
  } catch (...) {
    *out_summary = ArchitrinoSolverPathHistoryStreamSummary{};
    return -2;
  }
}

extern "C" int architrino_solver_read_path_history_stream_rows_f64(
    const char* data_path,
    std::uint64_t row_offset,
    int row_count,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (data_path == nullptr || out_row_count == nullptr || row_count < 0 || max_rows < 0) {
    return -1;
  }

  try {
    const std::vector<architrino::solver::PathHistoryRowF64> cppRows =
        architrino::solver::read_path_history_rows(
            data_path,
            row_offset,
            static_cast<std::size_t>(row_count));
    return copy_path_history_rows(cppRows, rows, max_rows, out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_path_history_stream_index(
    const char* index_path,
    ArchitrinoSolverPathHistoryIndexRow* rows,
    int max_rows,
    int* out_row_count) {
  if (index_path == nullptr || out_row_count == nullptr || max_rows < 0) {
    return -1;
  }

  try {
    return copy_path_history_index_rows(
        architrino::solver::read_path_history_index(index_path),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_path_history_stream_chunks(
    const char* chunk_path,
    ArchitrinoSolverPathHistoryChunkRow* rows,
    int max_rows,
    int* out_row_count) {
  if (chunk_path == nullptr || out_row_count == nullptr || max_rows < 0) {
    return -1;
  }

  try {
    return copy_path_history_chunk_rows(
        architrino::solver::read_path_history_chunks(chunk_path),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_query_path_history_stream_index(
    const ArchitrinoSolverPathHistoryIndexRow* index_rows,
    int index_row_count,
    const ArchitrinoSolverPathHistoryQuery* query,
    ArchitrinoSolverPathHistoryIndexRow* rows,
    int max_rows,
    int* out_row_count) {
  if (query == nullptr || out_row_count == nullptr || index_row_count < 0 || max_rows < 0 ||
      (index_row_count > 0 && index_rows == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::PathHistoryIndexRow> cppRows;
    cppRows.reserve(static_cast<std::size_t>(index_row_count));
    for (int index = 0; index < index_row_count; ++index) {
      cppRows.push_back(to_path_history_index_row(index_rows[index]));
    }
    return copy_path_history_index_rows(
        architrino::solver::query_path_history_index(cppRows, to_path_history_query(*query)),
        rows,
        max_rows,
        out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_read_path_history_stream_query_f64(
    const char* data_path,
    const ArchitrinoSolverPathHistoryIndexRow* index_rows,
    int index_row_count,
    const ArchitrinoSolverPathHistoryChunkRow* chunk_rows,
    int chunk_row_count,
    const ArchitrinoSolverPathHistoryQuery* query,
    ArchitrinoSolverPathHistoryRowF64* rows,
    int max_rows,
    int* out_row_count) {
  if (data_path == nullptr || query == nullptr || out_row_count == nullptr ||
      index_row_count < 0 || chunk_row_count < 0 || max_rows < 0 ||
      (index_row_count > 0 && index_rows == nullptr) ||
      (chunk_row_count > 0 && chunk_rows == nullptr) ||
      (query->verify_checksums != 0 && chunk_row_count == 0)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::PathHistoryIndexRow> cppIndexRows;
    cppIndexRows.reserve(static_cast<std::size_t>(index_row_count));
    for (int index = 0; index < index_row_count; ++index) {
      cppIndexRows.push_back(to_path_history_index_row(index_rows[index]));
    }

    std::vector<architrino::solver::PathHistoryRowF64> cppRows;
    if (query->verify_checksums != 0) {
      std::vector<architrino::solver::PathHistoryChunkRow> cppChunkRows;
      cppChunkRows.reserve(static_cast<std::size_t>(chunk_row_count));
      for (int index = 0; index < chunk_row_count; ++index) {
        cppChunkRows.push_back(to_path_history_chunk_row(chunk_rows[index]));
      }
      cppRows = architrino::solver::read_path_history_query_checked(
          data_path,
          cppIndexRows,
          cppChunkRows,
          to_path_history_query(*query));
    } else {
      cppRows = architrino::solver::read_path_history_query(
          data_path,
          cppIndexRows,
          to_path_history_query(*query));
    }
    return copy_path_history_rows(cppRows, rows, max_rows, out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

extern "C" int architrino_solver_plan_path_history_storage_lifecycle(
    const ArchitrinoSolverStorageLifecyclePolicy* policy,
    const ArchitrinoSolverPathHistoryChunkRow* chunks,
    int chunk_count,
    ArchitrinoSolverPathHistoryLifecycleDecisionRow* rows,
    int max_rows,
    int* out_row_count) {
  if (policy == nullptr || out_row_count == nullptr || chunk_count < 0 || max_rows < 0 ||
      (chunk_count > 0 && chunks == nullptr)) {
    return -1;
  }

  try {
    std::vector<architrino::solver::PathHistoryChunkRow> cppChunks;
    cppChunks.reserve(static_cast<std::size_t>(chunk_count));
    for (int index = 0; index < chunk_count; ++index) {
      cppChunks.push_back(to_path_history_chunk_row(chunks[index]));
    }

    const std::vector<architrino::solver::PathHistoryChunkLifecycleDecision> decisions =
        architrino::solver::plan_path_history_storage_lifecycle(
            to_storage_lifecycle_policy(*policy),
            cppChunks);
    return copy_lifecycle_decision_rows(decisions, rows, max_rows, out_row_count);
  } catch (...) {
    *out_row_count = 0;
    return -2;
  }
}

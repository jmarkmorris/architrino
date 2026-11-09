#pragma once

#include "architrino/eom/History.hpp"
#include "architrino/eom/SurfaceGeometry.hpp"

#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

struct SurfaceNumerics {
  std::string position_tolerance = "1e-6";
  std::string tangent_velocity_tolerance = "1e-6";
  std::size_t maximum_depth = 24;
  std::size_t maximum_cells = 200000;
};

struct SurfaceReceiverDiagnostic {
  std::string path_id;
  std::string reception_lower;
  std::string reception_upper;
  IntervalVector net_interaction;
  IntervalVector tangent_interaction;
  IntervalVector discarded_normal;
  IntervalVector curvature;
  IntervalVector support;
  IntervalVector total_acceleration;
  Interval gradient_squared;
};

using SurfaceJacobian = std::array<std::array<Interval, 6>, 3>;
struct SurfaceConstraintEvaluation {
  SurfaceReceiverDiagnostic diagnostic;
  // Exact chain rule for [position, velocity], including supplied dA/dX.
  SurfaceJacobian jacobian;
};

[[nodiscard]] SurfaceConstraintEvaluation evaluate_surface_constraint(
    const SurfaceGeometry&, const IntervalVector& position,
    const IntervalVector& velocity, const IntervalVector& receiver_total,
    const SurfaceMatrix& interaction_position_jacobian);

struct SurfaceHistoryCertificate {
  std::string path_id;
  std::string start_time;
  std::string end_time;
  bool certified = false;
  std::string failure_code;
  std::size_t visited_cells = 0;
  double maximum_distance = 0;
  double maximum_tangent_velocity = 0;
  double minimum_gradient_squared = 0;
};

[[nodiscard]] SurfaceHistoryCertificate certify_surface_segment(
    const SurfaceGeometry&, const CubicHistorySegment&, const SurfaceNumerics&);

// Proves the actual circular factory's exact preparation lies on the shape.
// Unsupported analytical families and generic cubic claims reject.
void admit_surface_preparation(const SurfaceGeometry&, const RetainedHistory&);

}  // namespace architrino::eom

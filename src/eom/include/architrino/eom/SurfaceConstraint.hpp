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

struct SurfaceSolutionCertificate {
  std::string path_id;
  std::string start_time;
  std::string end_time;
  bool certified = false;
  std::string failure_code;
  IntervalVector position_error;
  IntervalVector velocity_error;
  IntervalVector acceleration_bound;
  double contraction_bound = 0;
  std::vector<SurfaceReceiverDiagnostic> diagnostics;
  std::vector<SurfaceHistoryCertificate> geometry;
  struct SlabRoot {
    std::string transmitter_path_id;
    std::string transmitter_history_fingerprint;
    Interval reception;
    Interval emission;
    Interval lower_residual;
    Interval upper_residual;
    Interval transmitter_factor;
    bool analytic_source_acceleration;
  };
  std::vector<SlabRoot> partner_roots = {};
  std::string self_accounting = "coherent-subwake-solution-exclusion/v1";
  double solution_speed_upper = 0;
};

struct NativeCoupledEvolutionRequest;
struct NativePublishedPath;
struct SurfacePublicationCertificate;
class SurfaceEvolutionEvidence {
 public:
  [[nodiscard]] const std::string& model_identity() const noexcept { return model_identity_; }
  [[nodiscard]] const std::string& history_fingerprint() const noexcept { return history_fingerprint_; }
  [[nodiscard]] const std::vector<SurfaceSolutionCertificate>& solutions() const noexcept { return solutions_; }
  [[nodiscard]] const std::shared_ptr<const SurfaceEvolutionEvidence>& previous() const noexcept { return previous_; }
 private:
  SurfaceEvolutionEvidence(std::string model, std::string history,
      std::vector<SurfaceSolutionCertificate> solutions,
      std::shared_ptr<const SurfaceEvolutionEvidence> previous)
      : model_identity_(std::move(model)), history_fingerprint_(std::move(history)), solutions_(std::move(solutions)), previous_(std::move(previous)) {}
  const std::string model_identity_;
  const std::string history_fingerprint_;
  const std::vector<SurfaceSolutionCertificate> solutions_;
  const std::shared_ptr<const SurfaceEvolutionEvidence> previous_;
  friend SurfacePublicationCertificate certify_surface_publication(
      const NativeCoupledEvolutionRequest&, const std::vector<NativePublishedPath>&,
      const std::vector<NativePublishedPath>&, const std::string&, const std::string&);
};

[[nodiscard]] std::string surface_request_identity(const NativeCoupledEvolutionRequest&);
struct SurfacePublicationCertificate {
  bool certified = false;
  std::string failure_code;
  std::vector<NativePublishedPath> histories;
  std::vector<SurfaceSolutionCertificate> solutions;
};

// Uses existing host candidates. This validates their integral-map error tube;
// it does not predict a trajectory or provide a second production integrator.
[[nodiscard]] SurfacePublicationCertificate certify_surface_publication(
    const NativeCoupledEvolutionRequest&,
    const std::vector<NativePublishedPath>& input,
    const std::vector<NativePublishedPath>& candidate,
    const std::string& start_time, const std::string& end_time);

}  // namespace architrino::eom

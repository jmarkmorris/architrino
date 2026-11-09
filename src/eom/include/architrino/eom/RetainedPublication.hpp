#pragma once

#include "architrino/eom/SurfaceConstraint.hpp"

namespace architrino::eom {

struct RetainedSolutionCertificate {
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
struct RetainedPublicationCertificate;
class RetainedEvolutionEvidence {
 public:
  [[nodiscard]] const std::string& model_identity() const noexcept { return model_identity_; }
  [[nodiscard]] const std::string& history_fingerprint() const noexcept { return history_fingerprint_; }
  [[nodiscard]] const std::vector<RetainedSolutionCertificate>& solutions() const noexcept { return solutions_; }
  [[nodiscard]] const std::shared_ptr<const RetainedEvolutionEvidence>& previous() const noexcept { return previous_; }
 private:
  RetainedEvolutionEvidence(std::string model, std::string history,
      std::vector<RetainedSolutionCertificate> solutions,
      std::shared_ptr<const RetainedEvolutionEvidence> previous)
      : model_identity_(std::move(model)), history_fingerprint_(std::move(history)), solutions_(std::move(solutions)), previous_(std::move(previous)) {}
  const std::string model_identity_;
  const std::string history_fingerprint_;
  const std::vector<RetainedSolutionCertificate> solutions_;
  const std::shared_ptr<const RetainedEvolutionEvidence> previous_;
  friend RetainedPublicationCertificate certify_retained_publication(
      const NativeCoupledEvolutionRequest&, const std::vector<NativePublishedPath>&,
      const std::vector<NativePublishedPath>&, const std::string&, const std::string&);
};

[[nodiscard]] std::string retained_request_identity(const NativeCoupledEvolutionRequest&);
[[nodiscard]] std::string surface_request_identity(const NativeCoupledEvolutionRequest&);
struct RetainedPublicationCertificate {
  bool certified = false;
  std::string failure_code;
  std::vector<NativePublishedPath> histories;
  std::vector<RetainedSolutionCertificate> solutions;
};

// Uses existing host candidates. This validates their integral-map error tube;
// it does not predict a trajectory or provide a second production integrator.
[[nodiscard]] RetainedPublicationCertificate certify_retained_publication(
    const NativeCoupledEvolutionRequest&,
    const std::vector<NativePublishedPath>& input,
    const std::vector<NativePublishedPath>& candidate,
    const std::string& start_time, const std::string& end_time);

}  // namespace architrino::eom

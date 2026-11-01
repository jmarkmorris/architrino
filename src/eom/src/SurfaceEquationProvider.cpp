#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/SurfaceConstraint.hpp"
#include "RetainedEquationEvaluation.hpp"
#include "EquationSourceIdentity.hpp"

#include <algorithm>
#include <set>
#include "architrino/eom/SpeedDomain.hpp"

namespace architrino::eom {
namespace {
class SurfaceEquationProvider final : public EquationProvider {
 public:
  const EquationProviderDescriptor& descriptor() const noexcept override { return descriptor_; }
  const EquationPlan& plan() const override {
    static const EquationPlan plan{"canonical-surface-acceleration-plan/v1", {
      {"roots", "canonical-euclidean-roots/v1", "retained-history", "complete-root-ledger", {}},
      {"interaction", "canonical-interaction/v1", "complete-root-ledger", "acceleration-contributions", {"roots"}},
      {"reduction", "fixed-pairwise-reduction/v1", "acceleration-contributions", "receiver-total", {"interaction"}},
      {"response", "identity-response/v1", "receiver-total", "receiver-total", {"reduction"}},
      {"speed", "unrestricted-speed/v1", "receiver-total", "receiver-total", {"response"}},
      {"constraint", "fixed-surface-normal-support/v1", "receiver-total", "acceleration-snapshot", {"speed"}}}};
    return plan;
  }
  void admit(const NativeCoupledEvolutionRequest& r) const override {
    const auto& s = r.equation_selection;
    if (!s || s->composition_id != "canonical-surface/v1" || s->constraint != "surface" ||
        s->method != "numerical")
      throw EquationAdmissionError("unsupported_model_combination", "Surface requires canonical-surface/v1, surface constraint and numerical method with a supported speed-domain policy");
    admit_speed_selection(*s);
    if (equation_decimal_identity(r.field_speed) != "1e0")
      throw EquationAdmissionError("invalid_normalized_field_speed", "Surface requires exact field_speed=1");
    if (!r.surface_geometry) throw EquationAdmissionError("invalid_geometry", "Surface requires a fixed geometry definition");
    const SurfaceGeometry shape(*r.surface_geometry);
    if (r.chart_policy != "sharp" || !r.joint_histories.empty() || !r.joint_root_point_states.empty() ||
        !r.adjudicated_finite_width_pairs.empty() || r.joint_state_fallback_already_applied ||
        r.allow_pending_finite_width_exit || r.use_synchronized_multirate_publication ||
        r.use_quarter_step_publication || r.use_certificate_cost_feedback)
      throw EquationAdmissionError("unsupported_model_combination", "Stage B Surface supports ordinary sharp synchronized two-half publication; joint, finite-width/event and optional publication routes are unavailable");
    if (!(Interval::decimal_token(r.surface_numerics.position_tolerance).lower() > 0) ||
        !(Interval::decimal_token(r.surface_numerics.tangent_velocity_tolerance).lower() > 0) ||
        r.surface_numerics.maximum_cells == 0 || r.surface_numerics.maximum_depth == 0)
      throw EquationAdmissionError("invalid_surface_numerics", "surface tolerances/depth/cell budgets must be positive");
    if(r.error_bound_checking=="none")return;
    for (const auto& path : r.paths) {
      admit_surface_preparation(shape, path.history);
      require_prepared_speed_domain(path.history, *s);
    }
  }
  NativeAccelerationSnapshotCertificate evaluate(const EquationEvaluationContext& c) const override {
    admit(c.request);
    const auto ids = [](const auto& paths) {
      std::set<std::string> result;
      for (const auto& path : paths) if (path.path_id.empty() || !result.insert(path.path_id).second)
        throw EquationAdmissionError("surface_history_identity_mismatch", "Surface snapshot identities must be nonempty and unique");
      return result;
    };
    if (c.request.paths.empty() || ids(c.request.paths) != ids(c.histories))
      throw EquationAdmissionError("surface_history_identity_mismatch", "Surface snapshot population differs from its bound request");
    auto snapshot = detail::certify_retained_acceleration_snapshot(c.request, c.histories,
        c.reception_time, c.warm_snapshot, c.warm_histories, c.defer_root_precision_escalation);
    snapshot.schema = "eom_surface_acceleration_snapshot/v1";
    snapshot.selected_model_identity = surface_request_identity(c.request);
    if (snapshot.status != "certified_complete") return snapshot;
    const SurfaceGeometry shape(*c.request.surface_geometry);
    const Interval time = Interval::decimal_token(c.reception_time);
    const SurfaceMatrix zero{{{Interval::point(0), Interval::point(0), Interval::point(0)},
                              {Interval::point(0), Interval::point(0), Interval::point(0)},
                              {Interval::point(0), Interval::point(0), Interval::point(0)}}};
    for (auto& total : snapshot.acceleration.receiver_totals) {
      const auto path = std::find_if(c.histories.begin(), c.histories.end(), [&](const auto& p) { return p.path_id == total.receiver_path_id; });
      if (path == c.histories.end()) throw EquationAdmissionError("surface_history_identity_mismatch", "missing snapshot receiver history");
      try {
        auto constrained = evaluate_surface_constraint(shape, path->history.position_hull(time), path->history.velocity_hull(time), total.acceleration, zero);
        constrained.diagnostic.path_id = total.receiver_path_id;
        constrained.diagnostic.reception_lower = c.reception_time; constrained.diagnostic.reception_upper = c.reception_time;
        total.acceleration = constrained.diagnostic.total_acceleration;
        for (const auto& axis : total.acceleration)
          if (axis.width() > Interval::decimal_token(c.request.acceleration_tolerance).lower())
            throw EquationAdmissionError("surface_acceleration_budget_exceeded", "geometry-transformed acceleration width exceeds the selected EOM budget");
        snapshot.surface_diagnostics.push_back(std::move(constrained.diagnostic));
      } catch (const EquationAdmissionError& error) {
        snapshot.status = "uncertified"; snapshot.failure_code = error.code(); snapshot.surface_diagnostics.clear(); return snapshot;
      }
    }
    return snapshot;
  }
 private:
  const EquationProviderDescriptor descriptor_{
      "canonical-surface/v1", "Canonical Master Equation with a surface constraint",
      "reference/priorities/master-equation-closure/equation-variants/surface-constraint/definition.md",
      detail::kSurfaceDefinitionDigest, "surface-ordinary-sharp-method-of-steps/v1",
      "Artificial normal support; full dense integral-map inclusion, coherent subwake solution and strictly past partner roots required. Unsupported charts halt. No physical confinement or stable assembly claim."};
};
}
const EquationProvider& require_surface_equation_provider(const NativeCoupledEvolutionRequest& r) {
  static const SurfaceEquationProvider provider; provider.admit(r); return provider;
}
}

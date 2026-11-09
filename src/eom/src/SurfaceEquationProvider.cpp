#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/SurfaceConstraint.hpp"
#include "RetainedEquationEvaluation.hpp"
#include "EquationSourceIdentity.hpp"

#include <algorithm>
#include <set>
#include <cmath>
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/SpeedDomain.hpp"

namespace architrino::eom {
namespace {
class SurfaceEquationProvider final : public EquationProvider {
 public:
  explicit SurfaceEquationProvider(bool logarithmic=false): logarithmic_(logarithmic), descriptor_{
    logarithmic?"logarithmic-surface/v1":"canonical-surface/v1",
    logarithmic?"Logarithmic-potential Master Equation with a surface constraint":"Canonical Master Equation with a surface constraint",
    logarithmic?"reference/priorities/master-equation-closure/equation-variants/surface-constraint/logarithmic-definition.md":"reference/priorities/master-equation-closure/equation-variants/surface-constraint/definition.md",
    logarithmic?equation_identity_sha256(std::string(detail::kLogarithmicSurfaceDefinitionDigest)+"|"+detail::kLogarithmicDefinitionDigest+"|"+detail::kSurfaceDefinitionDigest):detail::kSurfaceDefinitionDigest,
    logarithmic?"logarithmic-surface-ordinary-sharp-method-of-steps/v1":"surface-ordinary-sharp-method-of-steps/v1",
    "Artificial normal support; strict checking requires coherent subwake histories, strictly past roots and full-slab inclusion. None is exploratory point evolution without error bounds. No physical confinement or stability claim."} {}
  const EquationProviderDescriptor& descriptor() const noexcept override { return descriptor_; }
  const EquationPlan& plan() const override {
    const auto make=[](bool logarithmic){return EquationPlan{logarithmic?"logarithmic-surface-acceleration-plan/v1":"canonical-surface-acceleration-plan/v1", {
      {"roots", "canonical-euclidean-roots/v1", "retained-history", "complete-root-ledger", {}},
      {"interaction", logarithmic?"logarithmic-inverse-distance/v1":"canonical-interaction/v1", "complete-root-ledger", "acceleration-contributions", {"roots"}},
      {"reduction", "fixed-pairwise-reduction/v1", "acceleration-contributions", "receiver-total", {"interaction"}},
      {"response", "identity-response/v1", "receiver-total", "receiver-total", {"reduction"}},
      {"speed", logarithmic?"shared-speed-domain-halt/v1":"unrestricted-speed/v1", "receiver-total", "receiver-total", {"response"}},
      {"constraint", "fixed-surface-normal-support/v1", "receiver-total", "acceleration-snapshot", {"speed"}}}};
    };
    static const EquationPlan canonical=make(false), logarithmic=make(true);
    return logarithmic_?logarithmic:canonical;
  }
  void admit(const NativeCoupledEvolutionRequest& r) const override {
    const auto& s = r.equation_selection;
    if (!s || s->composition_id != descriptor_.id || s->constraint != "surface" ||
        s->method != "numerical")
      throw EquationAdmissionError("unsupported_model_combination", "Surface requires a registered surface interaction, surface constraint and numerical method with a supported speed-domain policy");
    admit_speed_selection(*s);
    if (equation_decimal_identity(r.field_speed) != "1e0")
      throw EquationAdmissionError("invalid_normalized_field_speed", "Surface requires exact field_speed=1");
    if (logarithmic_ && !(Interval::decimal_token(r.coupling).lower()>0))throw EquationAdmissionError("invalid_logarithmic_coupling","logarithmic Surface coupling must be positive");
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
    if(r.surface_geometry->kind=="parallel-rings"){
      if(r.error_bound_checking!="none")throw EquationAdmissionError("unsupported_model_combination","two vertical rings currently require None checking; no certified curve publication is claimed");
      const auto& d=*r.surface_geometry;const double radius=parse_finite_double(d.radius,"ring radius"),gap=parse_finite_double(d.separation,"ring separation"),t=parse_finite_double(r.start_time,"release time"),tol=1e-9*std::max({1.0,radius,gap});
      for(const auto& path:r.paths){const auto x=path.history.nominal_position(t),v=path.history.nominal_velocity(t);if(std::min(std::abs(x[0]-gap/2),std::abs(x[0]+gap/2))>tol||std::abs(std::hypot(x[1],x[2])-radius)>tol||std::abs(v[0])>tol||std::abs(x[1]*v[1]+x[2]*v[2])>tol)throw EquationAdmissionError("invalid_curve_preparation","release positions and velocities must lie on their assigned vertical rings");}
    }
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
  const bool logarithmic_;
  const EquationProviderDescriptor descriptor_;
};
}
const EquationProvider& require_surface_equation_provider(const NativeCoupledEvolutionRequest& r) {
  static const SurfaceEquationProvider canonical, logarithmic(true);
  const auto& provider=logarithmic_equation_selected(r)?logarithmic:canonical;provider.admit(r);return provider;
}
}

namespace architrino::eom {
std::string logarithmic_surface_capability_json(){const SurfaceEquationProvider provider(true);return "{\"id\":\"logarithmic-surface/v1\",\"name\":\"Logarithmic-potential Master Equation with a surface constraint\",\"implemented\":true,\"independentlyAccepted\":false,\"scientificAcceptance\":false,\"constraint\":\"surface\",\"method\":\"numerical\",\"speedDomains\":[\"unrestricted\",\"inclusive\",\"strict\"],\"defaultSpeedDomain\":\"unrestricted\",\"errorBoundChecking\":[\"none\",\"strict\"],\"geometries\":[\"sphere\",\"oblate\",\"ring-torus\",\"parallel-rings\"],\"speedModification\":false,\"definitionDigest\":"+equation_json_quote(provider.descriptor().definition_digest)+",\"wireEvolution\":\"v2\",\"preparation\":\"exactly-admitted-circular-factory-family\",\"solutionDomain\":\"Strict: coherent subwake, strictly-past ordinary roots and integral-map inclusion; None: exploratory points\"}";}
}

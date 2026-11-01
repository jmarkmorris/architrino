#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/SpeedDomain.hpp"
#include "RetainedEquationEvaluation.hpp"
#include "EquationSourceIdentity.hpp"

#include <algorithm>
#include <set>

namespace architrino::eom {

bool logarithmic_equation_selected(const NativeCoupledEvolutionRequest& r) {
  return r.equation_selection && r.equation_selection->composition_id == "logarithmic/v1";
}
bool retained_publication_required(const NativeCoupledEvolutionRequest& r) {
  return r.surface_geometry.has_value() || logarithmic_equation_selected(r);
}
void admit_logarithmic_preparation(const RetainedHistory& h) {
  // One exact affine segment is a coherent C1 history with independently
  // known acceleration zero. Arbitrary error tubes do not prove coherence.
  if (!h.uniform_circular_endpoint_certificate()) {
    if (h.segments().size() != 1)
      throw EquationAdmissionError("logarithmic_preparation_not_certified", "use one exact affine segment or a certified circular factory history");
    const auto& s = h.segments().front();
    for (std::size_t i = 0; i < 3; ++i) {
      for (const auto* token : {&s.coefficient_tokens()[i][2], &s.coefficient_tokens()[i][3], &s.position_error_tokens()[i], &s.velocity_error_tokens()[i]})
        if (equation_decimal_identity(*token) != "0")
          throw EquationAdmissionError("logarithmic_preparation_not_certified", "affine preparation requires exact zero higher coefficients and errors");
    }
  }
  for (const auto& s : h.segments())
    if (!(norm(s.velocity_interval(Interval(s.t_start_interval().lower(), s.t_end_interval().upper()))).upper() < 1))
      throw EquationAdmissionError("logarithmic_preparation_not_certified", "ordinary logarithmic history chart requires certified speed strictly below 1; no speed is modified");
}
namespace {
class LogarithmicEquationProvider final : public EquationProvider {
 public:
  const EquationProviderDescriptor& descriptor() const noexcept override { return descriptor_; }
  const EquationPlan& plan() const override {
    static const EquationPlan p{"logarithmic-ordinary-acceleration-plan/v1", {
      {"roots", "canonical-euclidean-roots/v1", "retained-history", "complete-root-ledger", {}},
      {"interaction", "logarithmic-inverse-distance/v1", "complete-root-ledger", "acceleration-contributions", {"roots"}},
      {"reduction", "fixed-pairwise-reduction/v1", "acceleration-contributions", "receiver-total", {"interaction"}},
      {"response", "identity-response/v1", "receiver-total", "receiver-total", {"reduction"}},
      {"speed", "shared-speed-domain-halt/v1", "receiver-total", "receiver-total", {"response"}},
      {"constraint", "no-constraint/v1", "receiver-total", "acceleration-snapshot", {"speed"}}}};
    return p;
  }
  void admit(const NativeCoupledEvolutionRequest& r) const override {
    if (!logarithmic_equation_selected(r)) throw EquationAdmissionError("unknown_provider", "logarithmic/v1 required");
    const auto& s = *r.equation_selection;
    admit_speed_selection(s);
    if (r.error_bound_checking != "strict")
      throw EquationAdmissionError("unsupported_model_combination", "logarithmic/v1 currently requires strict error-bound checking; exploratory point evolution is not qualified by this provider");
    if (s.constraint != "none" || s.method != "numerical" || r.surface_geometry ||
        r.integration_method != kOrdinaryIntegrationSelection || r.chart_policy != "sharp" ||
        !r.joint_histories.empty() || !r.joint_root_point_states.empty() ||
        !r.adjudicated_finite_width_pairs.empty() || r.joint_state_fallback_already_applied ||
        r.allow_pending_finite_width_exit || r.use_synchronized_multirate_publication ||
        r.use_quarter_step_publication || r.use_certificate_cost_feedback ||
        r.force_event_precision_escalation || r.matched_pair_enclosure_policy != "disabled" ||
        r.validated_population_evidence || equation_decimal_identity(r.far_field_enclosure_fraction) != "0")
      throw EquationAdmissionError("unsupported_model_combination", "logarithmic/v1 supports ordinary sharp unconstrained two-half publication only; joint, finite-width/events, canonical far-field/grouped bounds and optional publication methods are unavailable");
    if (equation_decimal_identity(r.field_speed) != "1e0")
      throw EquationAdmissionError("invalid_normalized_field_speed", "logarithmic/v1 requires exact field_speed=1");
    if (!(Interval::decimal_token(r.coupling).lower() > 0))
      throw EquationAdmissionError("invalid_logarithmic_coupling", "coupling is positive kappa_log in normalized units");
    for (const auto& path : r.paths) {
      admit_logarithmic_preparation(path.history);
      require_prepared_speed_domain(path.history, s);
    }
  }
  NativeAccelerationSnapshotCertificate evaluate(const EquationEvaluationContext& c) const override {
    admit(c.request);
    std::set<std::string> expected, actual;
    for (const auto& p : c.request.paths) expected.insert(p.path_id);
    for (const auto& p : c.histories) actual.insert(p.path_id);
    if (expected != actual || actual.size() != c.histories.size())
      throw EquationAdmissionError("logarithmic_history_identity_mismatch", "snapshot population differs from request");
    auto result = detail::certify_retained_acceleration_snapshot(c.request, c.histories,
        c.reception_time, c.warm_snapshot, c.warm_histories, c.defer_root_precision_escalation);
    result.schema = "eom_logarithmic_acceleration_snapshot/v1";
    result.selected_model_identity = equation_snapshot_identity(c.request);
    return result;
  }
 private:
  const EquationProviderDescriptor descriptor_{
    "logarithmic/v1", "Logarithmic-potential Master Equation",
    "reference/priorities/master-equation-closure/equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement",
    detail::kLogarithmicDefinitionDigest, "logarithmic-ordinary-sharp-method-of-steps/v1",
    "Inverse-distance response with unchanged transmitter weighting and all positive-delay roots. Bounded coherent subwake history chart, separated ordinary partner roots strictly before step start, full-slab inclusion/contraction. No speed response, surface support, singular continuation or physical acceptance."};
};
}
const EquationProvider& require_logarithmic_equation_provider(const NativeCoupledEvolutionRequest& r) {
  static const LogarithmicEquationProvider p; p.admit(r); return p;
}
}

namespace architrino::eom {
std::string logarithmic_capability_json() {
  LogarithmicEquationProvider p;
  const auto& d = p.descriptor();
  return "{\"id\":\"logarithmic/v1\",\"name\":" + equation_json_quote(d.name) +
    ",\"implemented\":true,\"independentlyAccepted\":false,\"scientificAcceptance\":false"
    ",\"definitionDigest\":" + equation_json_quote(d.definition_digest) +
    ",\"evaluationProfile\":" + equation_json_quote(d.evaluation_profile) +
    ",\"acceptanceBoundary\":" + equation_json_quote(d.acceptance_boundary) +
    ",\"constraint\":\"none\",\"method\":\"numerical\",\"defaultSpeedDomain\":\"unrestricted\""
    ",\"speedDomains\":[\"unrestricted\",\"inclusive\",\"strict\"],\"speedModification\":false"
    ",\"executionMethods\":[\"ordinary\"],\"errorBoundChecking\":[\"strict\"],\"chartPolicies\":[\"sharp\"]"
    ",\"parameters\":{\"fieldSpeed\":\"exactly-1\",\"coupling\":\"positive-kappa-log;units-length-squared-per-time-squared-per-charge-product\",\"referenceRadius\":\"absent-from-acceleration\"}"
    ",\"numericRoutes\":{\"ordinaryInterval\":\"full-slab-validated-method-of-steps\",\"jointAffine\":false,\"implicitResidual\":false,\"finiteWidthEvents\":false,\"canonicalFarFieldBounds\":false,\"accelerationMpfr\":false,\"rootMpfr\":true}"
    ",\"preparation\":\"one-exact-affine-segment-or-certified-circular-factory;coherent-speed-strictly-below-1\""
    ",\"solutionDomain\":\"bounded-separated-ordinary-roots;coherent-speed-strictly-below-1;partner-emissions-strictly-before-step-start\""
    ",\"checkpoint\":\"v8-revalidated-publication\",\"wireEvolution\":\"v2\"}";
}
}

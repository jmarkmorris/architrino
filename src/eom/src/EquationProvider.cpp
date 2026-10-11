#include "architrino/eom/EquationRegistry.hpp"
#include "CanonicalEquationEvaluation.hpp"
#include "EquationSourceIdentity.hpp"
#include <algorithm>

namespace architrino::eom {
const EquationProvider& require_surface_equation_provider(const NativeCoupledEvolutionRequest&);
namespace {

class CanonicalEquationProvider final : public EquationProvider {
 public:
  const EquationProviderDescriptor& descriptor() const noexcept override {
    return descriptor_;
  }

  const EquationPlan& plan() const override {
    static const EquationPlan plan{
        "canonical-acceleration-plan/v1",
        {
            {"roots", "canonical-euclidean-roots/v1", "retained-history",
             "complete-root-ledger", {}},
            {"interaction", "canonical-interaction/v1", "complete-root-ledger",
             "acceleration-contributions", {"roots"}},
            {"reduction", "fixed-pairwise-reduction/v1",
             "acceleration-contributions", "receiver-total", {"interaction"}},
            {"response", "identity-response/v1", "receiver-total",
             "receiver-total", {"reduction"}},
            {"speed", "unrestricted-speed/v1", "receiver-total",
             "receiver-total", {"response"}},
            {"constraint", "no-constraint/v1", "receiver-total",
             "acceleration-snapshot", {"speed"}},
        }};
    return plan;
  }

  void admit(const NativeCoupledEvolutionRequest& request) const override {
    if (request.surface_geometry.has_value())
      throw EquationAdmissionError("unsupported_model_combination", "a surface definition requires explicit Surface composition");
    if (!request.equation_selection.has_value()) return;
    const auto& selection = *request.equation_selection;
    if (selection.composition_id != "canonical/v1") {
      const bool known = selection.composition_id == "canonical-surface/v1";
      throw EquationAdmissionError(
          known ? "unsupported_model_combination" : "unknown_provider",
          "composition is not executable in Stage A: " +
              selection.composition_id);
    }
    if (selection.speed_domain != "unrestricted" ||
        selection.boundary_policy != "none" ||
        selection.constraint != "none" || selection.method != "numerical") {
      throw EquationAdmissionError(
          "unsupported_model_combination",
          "Stage A implements canonical/unrestricted/unconstrained numerical "
          "evaluation only");
    }
    if (equation_decimal_identity(request.field_speed) != "1e0") {
      throw EquationAdmissionError(
          "invalid_normalized_field_speed",
          "explicit equation selection requires exact field_speed=1");
    }
    if (request.chart_policy != "sharp" && request.chart_policy != "finite_width" &&
        request.chart_policy != "sharp_with_finite_width_fallback") {
      throw EquationAdmissionError("unsupported_model_combination",
                                   "unknown canonical chart policy");
    }
  }

  NativeAccelerationSnapshotCertificate evaluate(
      const EquationEvaluationContext& context) const override {
    admit(context.request);
    if (std::any_of(context.histories.begin(), context.histories.end(),
        [](const auto& path) { return path.surface_evidence != nullptr; }))
      throw EquationAdmissionError("unsupported_model_combination", "canonical provider cannot implicitly consume Surface continuation carriers");
    return detail::certify_canonical_acceleration_snapshot(
        context.request, context.histories, context.reception_time,
        context.warm_snapshot, context.warm_histories,
        context.defer_root_precision_escalation);
  }

 private:
  const EquationProviderDescriptor descriptor_{
      "canonical/v1", "Canonical Master Equation",
      "reference/priorities/app-solver/contracts/master-eom-binding-v1.md",
      detail::kCanonicalDefinitionDigest,
      "canonical-retained-history-snapshot/v1",
      "Existing canonical chart/precision/history gates remain unchanged; "
      "registration adds no independent mathematical acceptance."};
};

}  // namespace

const EquationProvider& require_equation_provider(
    const NativeCoupledEvolutionRequest& request) {
  if (request.equation_selection && request.equation_selection->composition_id == "canonical-surface/v1")
    return require_surface_equation_provider(request);
  static const CanonicalEquationProvider provider;
  provider.admit(request);
  return provider;
}

}  // namespace architrino::eom

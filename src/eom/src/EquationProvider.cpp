#include "architrino/eom/EquationRegistry.hpp"
#include "RetainedEquationEvaluation.hpp"
#include "EquationSourceIdentity.hpp"
#include <algorithm>
#include "architrino/eom/SpeedDomain.hpp"

namespace architrino::eom {
const EquationProvider& require_logarithmic_equation_provider(const NativeCoupledEvolutionRequest&);
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
    admit_speed_selection(selection);
    if (selection.constraint != "none" || selection.method != "numerical") {
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
    if(request.error_bound_checking=="none")return;
    for (const auto& path : request.paths) require_prepared_speed_domain(path.history, selection);
  }

  NativeAccelerationSnapshotCertificate evaluate(
      const EquationEvaluationContext& context) const override {
    admit(context.request);
    if (std::any_of(context.histories.begin(), context.histories.end(),
        [](const auto& path) { return path.validated_evidence != nullptr; }))
      throw EquationAdmissionError("unsupported_model_combination", "canonical provider cannot implicitly consume Surface continuation carriers");
    auto result = detail::certify_retained_acceleration_snapshot(
        context.request, context.histories, context.reception_time,
        context.warm_snapshot, context.warm_histories,
        context.defer_root_precision_escalation);
    result.selected_model_identity = equation_snapshot_identity(context.request);
    return result;
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
  if (logarithmic_equation_selected(request)) return require_logarithmic_equation_provider(request);
  if (request.equation_selection && request.equation_selection->composition_id == "canonical-surface/v1")
    return require_surface_equation_provider(request);
  static const CanonicalEquationProvider provider;
  provider.admit(request);
  return provider;
}

}  // namespace architrino::eom

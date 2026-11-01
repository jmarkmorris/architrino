#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include "EquationSourceIdentity.hpp"

namespace architrino::eom {
std::string logarithmic_capability_json();

void require_canonical_equation_operation(const NativeCoupledEvolutionRequest& r) {
  const auto& p = require_equation_provider(r);
  if (p.descriptor().id != "canonical/v1")
    throw EquationAdmissionError("unsupported_model_combination", "this event/checkpoint operation is canonical-only; selected providers require their supported provider-aware routes");
}
void require_legacy_checkpoint_equation(const NativeCoupledEvolutionRequest& r) {
  require_canonical_equation_operation(r);
  if (r.equation_selection && r.equation_selection->speed_domain != "unrestricted")
    throw EquationAdmissionError("unsupported_model_combination", "v7 binds legacy unrestricted canonical evolution only; selected domains require v8");
}
std::string equation_snapshot_identity(const NativeCoupledEvolutionRequest& r) {
  if (retained_publication_required(r)) return retained_request_identity(r);
  if (r.equation_selection && r.equation_selection->speed_domain != "unrestricted") return inspect_equation_model(r).digest;
  return {};
}

std::string equation_build_identity_json() {
  return "{\"buildDigest\":" +
      equation_json_quote(detail::kEquationBuildDigest) +
      ",\"configurationDigest\":" +
      equation_json_quote(detail::kEquationConfigurationDigest) +
      ",\"sourceDigest\":" + equation_json_quote(detail::kEquationSourceDigest) +
      "}";
}

ResolvedEquationModel inspect_equation_model(
    const NativeCoupledEvolutionRequest& request) {
  const auto& provider = require_equation_provider(request);
  const auto& descriptor = provider.descriptor();
  const auto& plan = provider.plan();
  const EquationSelection selected =
      request.equation_selection.value_or(EquationSelection{});
  const auto number = [](const std::string& token) {
    return equation_json_quote(equation_decimal_identity(token));
  };
  const bool surface = descriptor.id == "canonical-surface/v1";
  const bool logarithmic = descriptor.id == "logarithmic/v1";
  const bool legacy = descriptor.id == "canonical/v1" && selected.speed_domain == "unrestricted";
  const std::string json =
      "{\"build\":" + equation_build_identity_json() +
      ",\"compositionId\":" + equation_json_quote(descriptor.id) +
      ",\"contractId\":\"eom_evolution_contract/v2\"" +
      ",\"definition\":{\"digest\":" +
      equation_json_quote(descriptor.definition_digest) +
      ",\"path\":" + equation_json_quote(descriptor.scientific_definition) +
      "},\"executionProfile\":" +
      equation_json_quote(descriptor.evaluation_profile) +
      ",\"identityScope\":\"resolved-model-bound-by-v8-with-original-preparation-and-numerics;v7-unchanged\"" +
      ",\"legacyModelFingerprint\":" +
      (legacy ? equation_json_quote(native_evolution_model_fingerprint(request)) : "null") +
      (surface ? ",\"modelBindingId\":\"master_equation_surface/v1\"" : logarithmic ? ",\"modelBindingId\":\"logarithmic-potential/v1\"" : ",\"modelBindingId\":\"master_eom_binding/v1\"") +
      ",\"parameters\":{\"causalWidth\":" + number(request.causal_width) +
      ",\"chartPolicy\":" + equation_json_quote(request.chart_policy) +
      ",\"coreScale\":" + number(request.core_scale) +
      ",\"coupling\":" + number(request.coupling) +
      ",\"fieldSpeed\":" + number(request.field_speed) +
      (surface ? ",\"surfaceGeometry\":" + SurfaceGeometry(*request.surface_geometry).canonical_json() +
          ",\"surfaceNumerics\":{\"maximumCells\":" + std::to_string(request.surface_numerics.maximum_cells) +
          ",\"maximumDepth\":" + std::to_string(request.surface_numerics.maximum_depth) +
          ",\"positionTolerance\":" + number(request.surface_numerics.position_tolerance) +
          ",\"tangentVelocityTolerance\":" + number(request.surface_numerics.tangent_velocity_tolerance) + "}" : "") +
      "},\"plan\":" + plan.canonical_json() +
      ",\"planDigest\":" + equation_json_quote(plan.digest()) +
      ",\"schema\":\"eom_resolved_model/v1\""
      ",\"selection\":{\"boundaryPolicy\":" +
      equation_json_quote(selected.boundary_policy) +
      ",\"constraint\":" + equation_json_quote(selected.constraint) +
      ",\"method\":" + equation_json_quote(selected.method) +
      ",\"speedDomain\":" + equation_json_quote(selected.speed_domain) +
      "}}";
  return {json, equation_identity_sha256(json)};
}

std::string equation_capabilities_json() {
  NativeCoupledEvolutionRequest default_request;
  const auto& canonical = require_equation_provider(default_request);
  const auto& descriptor = canonical.descriptor();
  return "{\"build\":" + equation_build_identity_json() +
      ",\"compositions\":[{\"acceptanceBoundary\":" +
      equation_json_quote(descriptor.acceptance_boundary) +
      ",\"constraint\":\"none\",\"evaluationProfile\":" +
      equation_json_quote(descriptor.evaluation_profile) +
      ",\"id\":\"canonical/v1\",\"implemented\":true"
      ",\"independentlyAccepted\":false,\"method\":\"numerical\",\"name\":" +
      equation_json_quote(descriptor.name) +
      ",\"numericRoutes\":{\"availability\":\"existing-canonical-gates-only\""
      ",\"generalStageInterpreter\":false,\"implicitResidual\":false"
      ",\"jointAffine\":\"existing-domain-exclusions-unchanged\""
      ",\"mpfrReplay\":\"existing-domain-exclusions-unchanged\""
      ",\"ordinaryInterval\":\"existing-domain-exclusions-unchanged\"}"
      ",\"defaultSpeedDomain\":\"unrestricted\",\"speedDomains\":[\"unrestricted\",\"inclusive\",\"strict\"]},"
      "{\"definitionDigest\":" +
      equation_json_quote(detail::kSurfaceDefinitionDigest) +
      ",\"id\":\"canonical-surface/v1\",\"implemented\":true"
      ",\"independentlyAccepted\":false,"
      "\"name\":\"Canonical Master Equation with a surface constraint\""
      ",\"numericRoutes\":{\"ordinaryInterval\":\"validated-sharp-method-of-steps\",\"jointAffine\":false,\"finiteWidthEvents\":false}"
      ",\"geometries\":[\"sphere\",\"oblate\",\"ring-torus\"]"
      ",\"preparation\":\"exactly-admitted-circular-factory-family\""
      ",\"solutionDomain\":\"coherent-subwake-paths-and-strictly-past-partner-roots\""
      ",\"speedDomains\":[\"unrestricted\",\"inclusive\",\"strict\"],\"speedModification\":false"
      ",\"checkpoint\":\"v8-revalidated-publication\",\"wireEvolution\":\"v2\""
      ",\"reason\":\"Full-slab root, derivative, inclusion, contraction and dense geometry gates; coherent subwake chart remains required\"}," + logarithmic_capability_json() + "]"
      ",\"executionMethods\":[{\"method\":\"ordinary\",\"default\":true,\"requestSchema\":\"eom_evolution_request/v2\""
      ",\"responseSchema\":\"eom_evolution_response/v2\",\"checkpointSchema\":\"eom_provider_checkpoint/v8\"},"
      "{\"method\":\"canonical_validated_far_step_evolution/v1\",\"default\":false,\"optIn\":\"execution.method\""
      ",\"requestSchema\":\"eom_evolution_request/v3\",\"inspectionSchema\":\"eom_inspection/v3\""
      ",\"responseSchema\":\"eom_evolution_response/v3\",\"contractId\":\"eom_evolution_contract/v3\""
      ",\"checkpointSchema\":\"eom_provider_checkpoint/v9\",\"compositions\":[\"canonical/v1\"]"
      ",\"speedDomains\":[\"unrestricted\"],\"constraint\":\"none\""
      ",\"domain\":\"Bounded canonical far-step execution; evolve and resume run origin preflight and accepted-step producer admission for retained-past speed, separation, whole-step reception-time and receiver-box coverage, and past emission-root coverage. Unsupported origins decline without validated publication; a later refusal retains only the previously accepted prefix. Inspection does not run origin preflight.\""
      ",\"pairPolicies\":[\"disabled\",\"canonical_whole_step_piecewise_tube/v1\"],\"defaultPairPolicy\":\"disabled\",\"defaultThreadCount\":1"
      ",\"limits\":{\"maximumAcceptedSteps\":[1,1000000],\"maxAttemptsPerStep\":[1,1024],\"maxLowerSignRetries\":[0,1024],\"growthCooldownSteps\":[0,1024]}"
      ",\"requiredControls\":[\"numerics.initialStep\",\"numerics.minimumStep\",\"model.coupling\",\"execution.positionIncrementBudget\",\"execution.velocityIncrementBudget\",\"execution.maximumAcceptedSteps\"]"
      ",\"ordinaryControlRestrictions\":{\"numerics.maximumStep\":\"absent or equal to numerics.initialStep\",\"numerics.maxStepAttempts\":\"absent or 10000\",\"numerics.maxRejectedSteps\":\"absent or 1000\",\"otherwise\":\"refused by name\"}"
      ",\"runtimeOverride\":{\"operation\":\"resume\",\"fields\":[\"threadCount\"],\"evolve\":\"refused\"}"
      ",\"scopesOutsideExecutionDigest\":[\"execution.maximumAcceptedSteps (per invocation)\",\"runtime.threadCount (resume worker override)\"]"
      ",\"restart\":\"full replay from the original request and origin with the record identity; no partial restore; uploaded hashes are never evidence\""
      ",\"resourceBound\":\"admission estimate, not a measured resident-set cost\""
      ",\"capabilityMeaning\":\"interface capability only; not a per-request or physical certification\""
      ",\"independentlyAccepted\":false,\"scientificAcceptance\":false}]"
      ",\"inspectionScope\":\"selection-model-controls-and-supplied-preparation-admission\""
      ",\"providerAwareCheckpoint\":true"
      ",\"schema\":\"eom_equation_capabilities/v1\""
      ",\"speedDomains\":[{\"domain\":\"unrestricted\",\"implemented\":true},"
      "{\"domain\":\"inclusive\",\"implemented\":true,\"boundaryPolicy\":\"halt\"},"
      "{\"domain\":\"strict\",\"implemented\":true,\"boundaryPolicy\":\"halt\"}]"
      ",\"checkpointSchema\":\"eom_provider_checkpoint/v8\""
      ",\"wireLimits\":{\"requestBytes\":33554432,\"maximumDepth\":64,\"population\":1024,\"combinedHistorySegments\":100000,\"memoryBytes\":2147483648,\"concurrentWorkers\":4}"
      ",\"stage\":\"C\",\"v2Evolution\":true}";
}

}  // namespace architrino::eom

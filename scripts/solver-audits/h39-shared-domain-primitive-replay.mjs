#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  buildH39SharedDomainPrimitiveDiagnostic,
  validateH39SharedDomainPrimitiveDiagnostic,
} from "../neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs";

export const H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_SCHEMA =
  "solver-h39-shared-domain-primitive-replay/v1";
export const H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_CASE_SCHEMA =
  "solver-h39-shared-domain-primitive-replay-case/v1";
export const H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_MANIFEST_SCHEMA =
  "solver-h39-shared-domain-primitive-replay-manifest/v1";

const AUDIT_ID = "h39_shared_domain_primitive_replay";
const SOURCE_SCRIPT =
  "scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs";
const SOURCE_TEST =
  "tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.test.js";
const AUDIT_DOC = "reference/priorities/solver/h39-solver-impact-audit.md";
const UNIT_CONVENTION = "dimensionless-h39-shared-domain-primitives";
const SCALE_NORMALIZATION = "h39 graph-centered shared-domain primitive chart";
const GLOBAL_TOLERANCE = 1e-12;

export const H39_SOLVER_IMPACT_CLASSIFICATIONS = new Set([
  "h39_no_material_effect",
  "h39_same_result_faster",
  "h39_refined_result",
  "h39_changed_bottleneck",
  "h39_investigation_required_mismatch",
]);

const CENTRAL_SOLVER_CAPABILITY_STATUSES = new Set([
  "fixture_adapter_built",
  "needs_fixture_adapter",
  "needs_missing_solver_capability",
  "can_replay_now",
]);

export const CLOSING_PRIMITIVE_BOUNDS = Object.freeze({
  centerResidualBound: 0.1,
  centerJacobianLowerBound: 5,
  jacobianLipschitzBound: 0.1,
  rhoX: 3,
  rX: 2,
  mGBound: 1e12,
  rootTangentNumeratorBound: 9.4,
});

const DEFAULT_REPLAY_CASES = Object.freeze([
  {
    caseId: "missing_bounds",
    historicalArtifactId: "h39-shared-domain-primitive-diagnostic-minimal-missing-bound-report",
    description: "Minimal primitive diagnostic with no explicit primitive bounds.",
    diagnosticOptions: {},
  },
  {
    caseId: "closing_bounds_unverified",
    historicalArtifactId: "h39-shared-domain-primitive-diagnostic-supplied-bounds-unverified",
    description: "Supplied closing primitive bounds without directed-rounded provenance.",
    diagnosticOptions: { ...CLOSING_PRIMITIVE_BOUNDS },
  },
  {
    caseId: "closing_bounds_external_directed_rounded_label",
    historicalArtifactId: "h39-shared-domain-primitive-diagnostic-external-directed-rounded-label",
    description:
      "Supplied closing primitive bounds with external directed-rounded provenance wording that this artifact still does not verify.",
    diagnosticOptions: {
      ...CLOSING_PRIMITIVE_BOUNDS,
      primitiveBoundsSource: "external-shared-domain-backend-report",
      primitiveBoundsStatus: "directed-rounded-external-unverified-by-this-artifact",
    },
  },
]);

const PRIMITIVE_COMPONENTS = Object.freeze([
  ["E_R", "center_residual_bound_E_R", "upper-bound"],
  ["nu_J", "center_jacobian_lower_bound_nu_J", "lower-bound"],
  ["L_J", "jacobian_lipschitz_bound_L_J", "lipschitz-upper-bound"],
  ["rho_X", "rho_X", "declared-outer-radius"],
  ["r_X", "r_X", "declared-inner-radius"],
  ["M_G", "candidate_M_G_bound", "upper-bound"],
  ["M_R", "candidate_root_tangent_numerator_bound_M_R", "upper-bound"],
]);

export function buildH39SharedDomainPrimitiveReplayReport(options = {}) {
  const cases = (options.cases ?? DEFAULT_REPLAY_CASES).map(buildReplayCase);
  const overallImpactClassification = classifyOverallImpact(cases);

  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_SCHEMA,
    audit_id: AUDIT_ID,
    source_task: "h39_solver_impact_audit",
    source_document: AUDIT_DOC,
    replay_scope:
      "first executable H39 solver-impact fixture for the shared-domain primitive diagnostic surface",
    central_solver_backend_invoked: false,
    central_solver_backend_reason:
      "The current central solver exposes app-facing root, hit, stream, precision, and validation-replay surfaces; this H39 primitive proof object still requires a fixture adapter before native solver replay.",
    selected_first_fixture: "h39_shared_domain_primitive_replay",
    case_count: cases.length,
    cases,
    overall_impact_classification: overallImpactClassification,
    final_h39_source_covariance_classification: "h39_no_material_effect",
    final_h39_source_covariance_reason:
      "The primitive replay improves solver-style precision and provenance reporting, but it does not supply the missing same-domain branch-bearing provider object before aggregate P.",
    next_replay_candidate: "h39_terminal_graph_remainder_budget_replay",
    next_replay_gate:
      "Proceed only after this primitive replay manifest and diff format remain stable under focused tests.",
  };
}

export function validateH39SharedDomainPrimitiveReplayReport(report) {
  const errors = [];

  if (report?.schema !== H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_SCHEMA) {
    errors.push("schema must match h39 shared-domain primitive replay schema");
  }
  if (report?.audit_id !== AUDIT_ID) {
    errors.push("audit id must be h39_shared_domain_primitive_replay");
  }
  if (report?.central_solver_backend_invoked !== false) {
    errors.push("h39 primitive replay must not claim native central solver backend execution");
  }
  if (!Array.isArray(report?.cases) || report.cases.length === 0) {
    errors.push("report must contain at least one replay case");
  }

  for (const replayCase of report?.cases ?? []) {
    errors.push(...validateReplayCase(replayCase));
  }

  if (!H39_SOLVER_IMPACT_CLASSIFICATIONS.has(report?.overall_impact_classification)) {
    errors.push("overall impact classification must use the h39 impact vocabulary");
  }
  const expectedOverall = classifyOverallImpact(report?.cases ?? []);
  if (report?.overall_impact_classification !== expectedOverall) {
    errors.push("overall impact classification must match case classifications");
  }
  if (report?.final_h39_source_covariance_classification !== "h39_no_material_effect") {
    errors.push("final h39 source-covariance classification must remain h39_no_material_effect for this fixture");
  }
  return errors;
}

function buildReplayCase(caseDefinition) {
  const diagnostic = buildH39SharedDomainPrimitiveDiagnostic(
    caseDefinition.diagnosticOptions ?? {}
  );
  const historicalValidationErrors =
    validateH39SharedDomainPrimitiveDiagnostic(diagnostic);
  const diagnosticSummary = diagnostic.shared_domain_diagnostic_summary ?? {};
  const diagnosticDecision = diagnosticSummary.diagnostic_decision ?? null;
  const replayManifest = createReplayManifest(caseDefinition, diagnostic);
  const primitiveResiduals = createPrimitiveResidualRows(diagnostic);
  const impactClassification = classifyReplayCase({
    diagnosticDecision,
    historicalValidationErrors,
  });

  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_CASE_SCHEMA,
    case_id: caseDefinition.caseId,
    historical_artifact_id: caseDefinition.historicalArtifactId,
    source_script: SOURCE_SCRIPT,
    source_test: SOURCE_TEST,
    description: caseDefinition.description,
    central_solver_capability_status: "fixture_adapter_built",
    central_solver_native_backend_invoked: false,
    central_solver_replay_status: "fixture-adapter-report-emitted",
    central_solver_replay_manifest: replayManifest,
    historical_diagnostic: {
      schema: diagnostic.schema,
      packet_id: diagnostic.packet_id,
      promotion_status: diagnostic.promotion_status,
      artifact_sha256: stableSha256(diagnostic),
      validation_errors: historicalValidationErrors,
      diagnostic_decision: diagnosticDecision,
      theory_status: diagnostic.result?.theory_status ?? null,
      retention: diagnostic.result?.retention ?? null,
      retained_branch: diagnostic.result?.retained_branch ?? null,
      claim_boundary: diagnostic.claim_boundary,
    },
    comparable_output_set: {
      diagnostic_decision: diagnosticDecision,
      missing_explicit_primitive_bounds:
        diagnosticSummary.missing_explicit_primitive_bounds ?? [],
      root_graph_lift_status: diagnosticSummary.root_graph_lift_status ?? null,
      closure_ratio:
        diagnosticSummary
          .candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim ?? null,
      closure_ratio_below_one:
        diagnosticSummary.candidate_rouche_primitive_h39_closure_ratio_below_one ??
        null,
      admissible_root_tangent_numerator_ceiling:
        diagnosticSummary.rouche_form_admissible_M_R_ceiling ?? null,
      certifies_directed_rounded_shared_domain:
        diagnostic.claim_boundary?.certifies_directed_rounded_shared_domain ?? null,
      retained_branch: diagnostic.result?.retained_branch ?? null,
    },
    precision_replay: createPrecisionReplayMetadata({
      caseDefinition,
      diagnostic,
      primitiveResiduals,
    }),
    primitive_residual_rows: primitiveResiduals,
    replay_diff: createReplayDiff({
      diagnosticDecision,
      diagnostic,
      historicalValidationErrors,
      impactClassification,
    }),
    resource_notes: {
      timing_note:
        "not measured as solver runtime; deterministic in-process fixture adapter build only",
      memory_note:
        "no path-history stream or native solver buffers allocated; report JSON only",
      native_solver_backend_cost: "none",
    },
    impact_classification: impactClassification,
  };
}

function createReplayManifest(caseDefinition, diagnostic) {
  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_MANIFEST_SCHEMA,
    replay_id: `${caseDefinition.caseId}-central-solver-style-replay`,
    audit_id: AUDIT_ID,
    historical_artifact_id: caseDefinition.historicalArtifactId,
    source_artifacts: [
      SOURCE_SCRIPT,
      SOURCE_TEST,
      AUDIT_DOC,
    ],
    model_contract: {
      model_id: "theta3minus-fold-pair-first-y-gd-h39-shared-domain-primitive",
      equation_version: "h39-root-tangent-cauchy-majorant-tail-budget",
      constants_hash: stableSha256(diagnostic.primitive_bounds),
      causal_speed_policy: "not-app-facing-causal-root-run",
      branch_policy: "candidate-only; retained_branch=false",
      unit_convention: UNIT_CONVENTION,
      compatible_precision_paths: ["validation_replay", "extended_precision"],
    },
    replay_request: {
      request_id: `${caseDefinition.caseId}-h39-primitive-replay-request`,
      run_kind: "validationReplay",
      consumer_id: "solver-impact-audit",
      claim_level: "validation-evidence",
      precision_path: "validation_replay",
      compare_layouts: [
        "h39_shared_domain_primitive_diagnostic.v1",
        "solver-run-precision-metadata.v1",
        "h39_primitive_residual_rows.v1",
      ],
    },
    selected_precision_path: "validation_replay",
    numeric_chart: "interval_bounds",
    numeric_type: "interval_f64_pair",
    unit_convention: UNIT_CONVENTION,
    scale_normalization: SCALE_NORMALIZATION,
    global_error_budget: GLOBAL_TOLERANCE,
    stage_error_budgets: [
      {
        stage: "primitive_bound_projection",
        tolerance: 0,
        authority: "exact-json-projection",
      },
      {
        stage: "historical_diagnostic_replay",
        tolerance: GLOBAL_TOLERANCE,
        authority: "historical-artifact-validation",
      },
      {
        stage: "solver_precision_metadata_projection",
        tolerance: 0,
        authority: "metadata-only",
      },
    ],
    claim_level: "validation-evidence",
    manifest_sha256: stableSha256({
      caseId: caseDefinition.caseId,
      primitiveBounds: diagnostic.primitive_bounds,
      diagnosticDecision:
        diagnostic.shared_domain_diagnostic_summary?.diagnostic_decision ?? null,
    }),
  };
}

function createPrecisionReplayMetadata({ caseDefinition, diagnostic, primitiveResiduals }) {
  const summary = diagnostic.shared_domain_diagnostic_summary ?? {};
  const firstFailureCode = firstFailureCodeFor(summary.diagnostic_decision);
  const presentRows = primitiveResiduals.filter((row) => row.value_available);
  return {
    schema: "solver-run-precision-metadata.v1",
    replay_case_id: caseDefinition.caseId,
    requested_precision_path: "validation_replay",
    selected_precision_path: "validation_replay",
    selected_numeric_type: "interval_f64_pair",
    selected_numeric_chart: "interval_bounds",
    unit_convention: UNIT_CONVENTION,
    scale_normalization: SCALE_NORMALIZATION,
    global_error_budget: GLOBAL_TOLERANCE,
    stage_error_budgets: [
      { stage: "primitive_bound_projection", tolerance: 0 },
      { stage: "historical_diagnostic_replay", tolerance: GLOBAL_TOLERANCE },
      { stage: "claim_boundary_projection", tolerance: 0 },
    ],
    claim_level: "validation-evidence",
    root_solve_metadata: {
      root_tolerance: null,
      iteration_count: null,
      bracket_or_isolation_metadata:
        "not-applicable; this fixture replays primitive-bound diagnostics, not a native causal-root solve",
      first_failure_code: firstFailureCode,
    },
    primitive_component_count: primitiveResiduals.length,
    primitive_component_available_count: presentRows.length,
    maximum_normalized_residual: maxFinite(
      primitiveResiduals.map((row) => row.normalized_residual)
    ),
    minimum_jacobian_value:
      primitiveResiduals.find((row) => row.component === "nu_J")?.value ?? null,
    jacobian_sign_stratum:
      primitiveResiduals.find((row) => row.component === "nu_J")
        ?.jacobian_sign_stratum ?? null,
    precision_escalations: [],
    validation_replay_run: true,
    validation_replay_matched: true,
    native_backend_authority: "not-run-for-h39-primitive-proof-object",
  };
}

function createPrimitiveResidualRows(diagnostic) {
  const bounds = diagnostic.primitive_bounds ?? {};
  const summary = diagnostic.shared_domain_diagnostic_summary ?? {};
  return PRIMITIVE_COMPONENTS.map(([component, field, relation]) => {
    const value = finiteOrNull(bounds[field]);
    const valueAvailable = value !== null;
    const residualScale = valueAvailable ? Math.max(1, Math.abs(value)) : null;
    const normalizedResidual = valueAvailable ? 0 : null;
    return {
      schema: "h39-primitive-residual-row.v1",
      component,
      input_field: field,
      relation,
      value,
      value_available: valueAvailable,
      residual_scale: residualScale,
      absolute_residual: valueAvailable ? 0 : null,
      normalized_residual: normalizedResidual,
      tolerance: GLOBAL_TOLERANCE,
      root_tolerance: null,
      iteration_count: null,
      bracket_or_isolation_metadata: "not-applicable",
      jacobian_value: component === "nu_J" ? value : null,
      jacobian_sign_stratum: component === "nu_J" ? signStratum(value) : null,
      first_failure_code: valueAvailable
        ? null
        : `${component}_primitive_bound_missing`,
      replay_authority:
        summary.diagnostic_decision === "passes-provided-primitive-bounds"
          ? "external-directed-rounded-provenance-label-not-verified-by-this-fixture"
          : "historical-diagnostic-projection",
    };
  });
}

function createReplayDiff({
  diagnosticDecision,
  diagnostic,
  historicalValidationErrors,
  impactClassification,
}) {
  const claimBoundary = diagnostic.claim_boundary ?? {};
  return {
    historical_and_replay_decision_match: true,
    historical_validation_passed: historicalValidationErrors.length === 0,
    claim_boundary_preserved:
      claimBoundary.certifies_directed_rounded_shared_domain === false &&
      claimBoundary.retained_branch === false,
    native_solver_backend_invoked: false,
    added_solver_metadata: [
      "solver-run-precision-metadata.v1",
      "stage error budgets",
      "primitive residual rows",
      "impact classification",
      "artifact hashes",
    ],
    diagnostic_decision: diagnosticDecision,
    impact_classification: impactClassification,
  };
}

function classifyReplayCase({ diagnosticDecision, historicalValidationErrors }) {
  if (historicalValidationErrors.length > 0) {
    return "h39_investigation_required_mismatch";
  }
  if (
    diagnosticDecision === "open-shared-domain-not-certified" ||
    diagnosticDecision === "passes-provided-primitive-bounds"
  ) {
    return "h39_refined_result";
  }
  return "h39_no_material_effect";
}

function classifyOverallImpact(cases) {
  const classifications = new Set(
    cases.map((replayCase) => replayCase.impact_classification)
  );
  if (classifications.has("h39_investigation_required_mismatch")) {
    return "h39_investigation_required_mismatch";
  }
  if (classifications.has("h39_changed_bottleneck")) {
    return "h39_changed_bottleneck";
  }
  if (classifications.has("h39_refined_result")) {
    return "h39_refined_result";
  }
  if (classifications.has("h39_same_result_faster")) {
    return "h39_same_result_faster";
  }
  return "h39_no_material_effect";
}

function firstFailureCodeFor(diagnosticDecision) {
  if (diagnosticDecision === "open-missing-primitive-bounds") {
    return "h39_missing_explicit_primitive_bounds";
  }
  if (diagnosticDecision === "open-shared-domain-not-certified") {
    return "h39_primitive_provenance_unverified";
  }
  if (diagnosticDecision === "passes-provided-primitive-bounds") {
    return "h39_external_directed_rounded_provenance_unverified_by_this_fixture";
  }
  if (diagnosticDecision === "fails-provided-primitive-bounds") {
    return "h39_primitive_reducer_not_closed";
  }
  return "h39_unknown_primitive_replay_status";
}

function validateReplayCase(replayCase) {
  const errors = [];
  if (replayCase?.schema !== H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_CASE_SCHEMA) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} schema is invalid`);
  }
  if (!CENTRAL_SOLVER_CAPABILITY_STATUSES.has(replayCase?.central_solver_capability_status)) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} central solver capability status is invalid`);
  }
  if (replayCase?.central_solver_native_backend_invoked !== false) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must not claim native backend execution`);
  }
  if (!H39_SOLVER_IMPACT_CLASSIFICATIONS.has(replayCase?.impact_classification)) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} impact classification is invalid`);
  }
  if (replayCase?.central_solver_replay_manifest?.schema !== H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_MANIFEST_SCHEMA) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} replay manifest schema is invalid`);
  }
  if (replayCase?.central_solver_replay_manifest?.selected_precision_path !== "validation_replay") {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must use validation_replay precision path`);
  }
  if (replayCase?.central_solver_replay_manifest?.numeric_chart !== "interval_bounds") {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must use interval_bounds numeric chart`);
  }
  if (
    replayCase?.historical_diagnostic?.claim_boundary
      ?.certifies_directed_rounded_shared_domain !== false ||
    replayCase?.historical_diagnostic?.retained_branch !== false
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must preserve non-promoting h39 claim boundary`);
  }
  if (Array.isArray(replayCase?.historical_diagnostic?.validation_errors)) {
    if (replayCase.historical_diagnostic.validation_errors.length !== 0) {
      errors.push(`case ${replayCase?.case_id ?? "<unknown>"} historical diagnostic must validate`);
    }
  } else {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include historical validation errors array`);
  }
  if (!Array.isArray(replayCase?.primitive_residual_rows) || replayCase.primitive_residual_rows.length !== PRIMITIVE_COMPONENTS.length) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include one primitive residual row per component`);
  }
  if (
    replayCase?.replay_diff?.historical_and_replay_decision_match !== true ||
    replayCase?.replay_diff?.claim_boundary_preserved !== true
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} replay diff must preserve decision and claim boundary`);
  }
  if (
    typeof replayCase?.resource_notes?.timing_note !== "string" ||
    typeof replayCase?.resource_notes?.memory_note !== "string"
  ) {
    errors.push(`case ${replayCase?.case_id ?? "<unknown>"} must include timing and memory notes`);
  }
  return errors;
}

function stableSha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function finiteOrNull(value) {
  if (value === null || value === undefined) {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function maxFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function signStratum(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  if (Math.abs(value) <= GLOBAL_TOLERANCE) {
    return "near_zero";
  }
  return value > 0 ? "positive" : "negative";
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--pretty") {
      options.pretty = true;
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/solver-audits/h39-shared-domain-primitive-replay.mjs [options]",
    "",
    "Options:",
    "  --out <path>       Write replay report JSON",
    "  --validate <path>  Validate a replay report JSON",
    "  --pretty           Pretty-print JSON output",
    "  --schema           Print replay schema metadata",
  ].join("\n");
}

function writeJson(value, outPath, pretty = false) {
  const output = `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);
  } else {
    process.stdout.write(output);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (options.schema) {
    writeJson(
      {
        artifact_schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_SCHEMA,
        case_schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_CASE_SCHEMA,
        manifest_schema: H39_SHARED_DOMAIN_PRIMITIVE_REPLAY_MANIFEST_SCHEMA,
        audit_id: AUDIT_ID,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors = validateH39SharedDomainPrimitiveReplayReport(artifact);
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
      return;
    }
    writeJson(
      {
        ok: true,
        schema: artifact.schema,
        audit_id: artifact.audit_id,
        case_count: artifact.case_count,
        overall_impact_classification: artifact.overall_impact_classification,
      },
      null,
      options.pretty
    );
    return;
  }

  const report = buildH39SharedDomainPrimitiveReplayReport();
  const errors = validateH39SharedDomainPrimitiveReplayReport(report);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
    return;
  }
  writeJson(report, options.out, options.pretty);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}

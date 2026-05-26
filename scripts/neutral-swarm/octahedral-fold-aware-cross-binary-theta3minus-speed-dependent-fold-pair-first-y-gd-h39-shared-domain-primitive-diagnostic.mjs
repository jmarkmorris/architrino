#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA as H39_REDUCER_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as buildH39Reducer,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as validateH39Reducer,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_h39_shared_domain_primitive_diagnostic";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

const DEFAULT_PRIMITIVE_BOUNDS_STATUS = "provided-unverified";
const DIRECTED_ROUNDED_EXTERNAL_STATUS =
  "directed-rounded-external-unverified-by-this-artifact";
const ALLOWED_PRIMITIVE_BOUNDS_STATUSES = new Set([
  DEFAULT_PRIMITIVE_BOUNDS_STATUS,
  DIRECTED_ROUNDED_EXTERNAL_STATUS,
]);
const FORBIDDEN_SPEED_FIELDS = new Set([
  "speed_band",
  "speed_window",
  "speed_min",
  "speed_max",
]);

const SUMMARY_COPY_FIELDS = [
  "root_graph_lift_status",
  "certifies_unique_root_in_X_disc",
  "rouche_radius_window_nonempty",
  "derived_jacobian_lower_bound_J_min",
  "sigma_X",
  "candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim",
  "candidate_rouche_primitive_h39_closure_ratio_below_one",
  "candidate_rouche_primitive_h39_closure_ratio_margin_to_one",
  "rouche_form_admissible_M_R_ceiling",
  "candidate_rouche_form_M_R_margin",
  "rouche_radius_supremum_status",
  "rouche_radius_supremal_M_R_ceiling",
  "rouche_rho_X_optimum_status",
  "rouche_rho_X_optimal_M_R_ceiling",
  "rouche_y_radius_optimum_status",
  "rouche_y_radius_optimal_M_R_ceiling",
];

function isProvided(value) {
  return value !== undefined && value !== null;
}

function nullableNumber(value) {
  return isProvided(value) ? Number(value) : null;
}

function optionNumber(value) {
  return isProvided(value) ? Number(value) : undefined;
}

function assertAllowedPrimitiveStatus(status) {
  if (!ALLOWED_PRIMITIVE_BOUNDS_STATUSES.has(status)) {
    throw new Error(
      `primitiveBoundsStatus must be one of: ${Array.from(
        ALLOWED_PRIMITIVE_BOUNDS_STATUSES
      ).join(", ")}`
    );
  }
}

function reducerOptionsFromBounds(bounds) {
  return {
    radiusMultiple: optionNumber(bounds.radius_multiple),
    radiusMultipleUpperBound: optionNumber(
      bounds.radius_multiple_upper_bound
    ),
    centerResidualBound: optionNumber(bounds.center_residual_bound_E_R),
    centerJacobianLowerBound: optionNumber(
      bounds.center_jacobian_lower_bound_nu_J
    ),
    jacobianLipschitzBound: optionNumber(
      bounds.jacobian_lipschitz_bound_L_J
    ),
    rhoX: optionNumber(bounds.rho_X),
    rX: optionNumber(bounds.r_X),
    rhoXUpperBound: optionNumber(bounds.rho_X_upper_bound),
    mGBound: optionNumber(bounds.candidate_M_G_bound),
    rootTangentNumeratorBound: optionNumber(
      bounds.candidate_root_tangent_numerator_bound_M_R
    ),
  };
}

function primitiveBoundsFromOptions(options) {
  return {
    center_residual_bound_E_R: nullableNumber(options.centerResidualBound),
    center_jacobian_lower_bound_nu_J: nullableNumber(
      options.centerJacobianLowerBound
    ),
    jacobian_lipschitz_bound_L_J: nullableNumber(
      options.jacobianLipschitzBound
    ),
    rho_X: nullableNumber(options.rhoX),
    r_X: nullableNumber(options.rX),
    rho_X_upper_bound: nullableNumber(options.rhoXUpperBound),
    radius_multiple: nullableNumber(options.radiusMultiple),
    radius_multiple_upper_bound: nullableNumber(
      options.radiusMultipleUpperBound
    ),
    candidate_M_G_bound: nullableNumber(options.mGBound),
    candidate_root_tangent_numerator_bound_M_R: nullableNumber(
      options.rootTangentNumeratorBound
    ),
  };
}

function missingExplicitPrimitiveBounds(bounds) {
  const missing = [];
  if (!isProvided(bounds.center_residual_bound_E_R)) {
    missing.push("E_R");
  }
  if (!isProvided(bounds.center_jacobian_lower_bound_nu_J)) {
    missing.push("nu_J");
  }
  if (!isProvided(bounds.jacobian_lipschitz_bound_L_J)) {
    missing.push("L_J");
  }
  if (!isProvided(bounds.rho_X)) {
    missing.push("rho_X");
  }
  if (!isProvided(bounds.r_X)) {
    missing.push("r_X");
  }
  if (!isProvided(bounds.candidate_M_G_bound)) {
    missing.push("M_G");
  }
  if (!isProvided(bounds.candidate_root_tangent_numerator_bound_M_R)) {
    missing.push("M_R");
  }
  return missing;
}

function copiedReducerSummary(summary) {
  const copied = {};
  for (const field of SUMMARY_COPY_FIELDS) {
    copied[field] = summary?.[field] ?? null;
  }
  return copied;
}

function diagnosticDecision({
  missing,
  primitiveBoundsStatus,
  reducerSummary,
}) {
  if (missing.length > 0) {
    return "open-missing-primitive-bounds";
  }

  if (
    reducerSummary?.candidate_rouche_primitive_certificate_closes === true
  ) {
    return primitiveBoundsStatus === DIRECTED_ROUNDED_EXTERNAL_STATUS
      ? "passes-provided-primitive-bounds"
      : "open-shared-domain-not-certified";
  }

  return "fails-provided-primitive-bounds";
}

function buildReducerArtifact(bounds) {
  const reducerArtifact = buildH39Reducer(reducerOptionsFromBounds(bounds));
  const reducerErrors = validateH39Reducer(reducerArtifact);
  return {
    reducerArtifact,
    reducerErrors,
  };
}

export function buildH39SharedDomainPrimitiveDiagnostic(options = {}) {
  const primitiveBoundsStatus =
    options.primitiveBoundsStatus ?? DEFAULT_PRIMITIVE_BOUNDS_STATUS;
  assertAllowedPrimitiveStatus(primitiveBoundsStatus);

  const primitiveBounds = primitiveBoundsFromOptions(options);
  const { reducerArtifact, reducerErrors } =
    buildReducerArtifact(primitiveBounds);
  const reducerSummary =
    reducerArtifact.root_tangent_cauchy_majorant_tail_budget_summary;
  const missing = missingExplicitPrimitiveBounds(primitiveBounds);
  const decision = diagnosticDecision({
    missing,
    primitiveBoundsStatus,
    reducerSummary,
  });

  return {
    schema: H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    diagnostic_scope: {
      report_kind: "h39-shared-domain-primitive-diagnostic",
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      primitive_bounds_source: options.primitiveBoundsSource ?? null,
      primitive_bounds_status: primitiveBoundsStatus,
      shared_domain_requirement:
        "E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R must be certified on one shared graph-centered polydisc by an external directed-rounded backend",
      consumes_reducer_schema: H39_REDUCER_SCHEMA,
    },
    primitive_bounds: primitiveBounds,
    reducer_check: {
      schema: reducerArtifact.schema,
      valid: reducerErrors.length === 0,
      errors: reducerErrors,
      theory_status: reducerArtifact.result?.theory_status ?? null,
      retention: reducerArtifact.result?.retention ?? null,
      retained_branch: reducerArtifact.result?.retained_branch ?? null,
    },
    shared_domain_diagnostic_summary: {
      ...copiedReducerSummary(reducerSummary),
      missing_explicit_primitive_bounds: missing,
      primitive_bounds_status: primitiveBoundsStatus,
      diagnostic_decision: decision,
    },
    claim_boundary: {
      assumes_fixed_speed_window: false,
      consumes_primitive_bounds: true,
      verifies_primitive_bounds_provenance: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_polydisc_Xi_bound: false,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      strongest_claim:
        "Reports whether supplied primitive bounds would satisfy the h39 reducer on the declared shared-domain inputs; it does not certify those bounds or the shared domain.",
    },
    result: {
      theory_status: "h39-shared-domain-primitive-diagnostic-report-emitted",
      retention: "not_retained",
      retained_branch: false,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-h39-directed-rounded-shared-domain-M_G-M_R-certificate-required",
      status_note:
        "The h39 reducer is replayed against supplied primitive bounds. A pass is only a conditional replay unless the primitive-bound provenance is supplied by an external directed-rounded shared-domain backend; this artifact does not certify that backend.",
    },
  };
}

function optionsFromArtifact(artifact) {
  const bounds = artifact?.primitive_bounds ?? {};
  return {
    radiusMultiple: optionNumber(bounds.radius_multiple),
    radiusMultipleUpperBound: optionNumber(
      bounds.radius_multiple_upper_bound
    ),
    centerResidualBound: optionNumber(bounds.center_residual_bound_E_R),
    centerJacobianLowerBound: optionNumber(
      bounds.center_jacobian_lower_bound_nu_J
    ),
    jacobianLipschitzBound: optionNumber(
      bounds.jacobian_lipschitz_bound_L_J
    ),
    rhoX: optionNumber(bounds.rho_X),
    rX: optionNumber(bounds.r_X),
    rhoXUpperBound: optionNumber(bounds.rho_X_upper_bound),
    mGBound: optionNumber(bounds.candidate_M_G_bound),
    rootTangentNumeratorBound: optionNumber(
      bounds.candidate_root_tangent_numerator_bound_M_R
    ),
    primitiveBoundsSource:
      artifact?.diagnostic_scope?.primitive_bounds_source ?? null,
    primitiveBoundsStatus:
      artifact?.diagnostic_scope?.primitive_bounds_status ??
      DEFAULT_PRIMITIVE_BOUNDS_STATUS,
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function approximatelyEqual(left, right, relativeTolerance = 1e-12) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= relativeTolerance * scale;
}

function valuesMatch(left, right) {
  if (left === null || right === null) {
    return left === right;
  }
  if (typeof left === "number" || typeof right === "number") {
    return approximatelyEqual(Number(left), Number(right));
  }
  return JSON.stringify(left) === JSON.stringify(right);
}

function findForbiddenSpeedFields(value, trail = "$", found = []) {
  if (value === null || typeof value !== "object") {
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      findForbiddenSpeedFields(item, `${trail}[${index}]`, found);
    });
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    const childTrail = `${trail}.${key}`;
    if (FORBIDDEN_SPEED_FIELDS.has(key)) {
      found.push(childTrail);
    }
    findForbiddenSpeedFields(child, childTrail, found);
  }
  return found;
}

export function validateH39SharedDomainPrimitiveDiagnostic(artifact) {
  const errors = [];
  let expected = null;

  try {
    expected = buildH39SharedDomainPrimitiveDiagnostic(
      optionsFromArtifact(artifact)
    );
  } catch (error) {
    errors.push(
      `h39 shared-domain diagnostic could not be rebuilt from primitive bounds: ${error.message}`
    );
  }

  const forbiddenSpeedFields = findForbiddenSpeedFields(artifact);
  assertField(
    forbiddenSpeedFields.length === 0,
    `h39 shared-domain diagnostic must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertField(
    artifact?.schema === H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
    "schema must match h39 shared-domain primitive diagnostic schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match h39 shared-domain primitive diagnostic packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    artifact?.diagnostic_scope?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 shared-domain diagnostic must not impose a fixed speed window",
    errors
  );
  assertField(
    ALLOWED_PRIMITIVE_BOUNDS_STATUSES.has(
      artifact?.diagnostic_scope?.primitive_bounds_status
    ),
    "primitive bounds status must use an allowed diagnostic provenance label",
    errors
  );
  assertField(
    artifact?.diagnostic_scope?.consumes_reducer_schema ===
      H39_REDUCER_SCHEMA,
    "diagnostic scope must name the consumed h39 reducer schema",
    errors
  );

  const claim = artifact?.claim_boundary ?? {};
  assertField(
    claim.consumes_primitive_bounds === true &&
      claim.verifies_primitive_bounds_provenance === false &&
      claim.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      claim.certifies_directed_rounded_h39_polydisc_Xi_bound === false &&
      claim.certifies_directed_rounded_shared_domain === false &&
      claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      claim.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      claim.certifies_I1_regular_critical_exhaustion === false &&
      claim.retained_branch === false,
    "claim boundary must not certify directed-rounded shared-domain, h39 polydisc bounds, continuous tail, scaled remainder, I1, or retention closure",
    errors
  );
  assertField(
    artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "diagnostic result must remain not_retained",
    errors
  );

  if (expected !== null) {
    const expectedReducerCheck = expected.reducer_check;
    const reducerCheck = artifact?.reducer_check ?? {};
    assertField(
      reducerCheck.schema === expectedReducerCheck.schema &&
        reducerCheck.valid === expectedReducerCheck.valid &&
        JSON.stringify(reducerCheck.errors) ===
          JSON.stringify(expectedReducerCheck.errors) &&
        reducerCheck.theory_status === expectedReducerCheck.theory_status &&
        reducerCheck.retention === expectedReducerCheck.retention &&
        reducerCheck.retained_branch === expectedReducerCheck.retained_branch,
      "h39 shared-domain diagnostic reducer check must match a fresh reducer replay",
      errors
    );

    for (const field of SUMMARY_COPY_FIELDS) {
      assertField(
        valuesMatch(
          artifact?.shared_domain_diagnostic_summary?.[field],
          expected.shared_domain_diagnostic_summary[field]
        ),
        `h39 shared-domain diagnostic summary field ${field} must match the reducer replay`,
        errors
      );
    }
    assertField(
      JSON.stringify(
        artifact?.shared_domain_diagnostic_summary
          ?.missing_explicit_primitive_bounds
      ) ===
        JSON.stringify(
          expected.shared_domain_diagnostic_summary
            .missing_explicit_primitive_bounds
        ) &&
        artifact?.shared_domain_diagnostic_summary?.diagnostic_decision ===
          expected.shared_domain_diagnostic_summary.diagnostic_decision,
      "h39 shared-domain diagnostic decision must match the supplied primitive bounds and provenance",
      errors
    );
  }

  return errors;
}

function parseNumberArg(name, value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be numeric`);
  }
  return parsed;
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
    } else if (arg === "--radius-multiple") {
      options.radiusMultiple = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--radius-multiple-upper-bound") {
      options.radiusMultipleUpperBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-residual-bound") {
      options.centerResidualBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-jacobian-lower-bound") {
      options.centerJacobianLowerBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--jacobian-lipschitz-bound") {
      options.jacobianLipschitzBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x") {
      options.rhoX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--r-x") {
      options.rX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x-upper-bound") {
      options.rhoXUpperBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--m-g-bound") {
      options.mGBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--root-tangent-numerator-bound") {
      options.rootTangentNumeratorBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--primitive-bounds-source") {
      options.primitiveBoundsSource = argv[++index];
    } else if (arg === "--primitive-bounds-status") {
      options.primitiveBoundsStatus = argv[++index];
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs [options]",
    "",
    "Options:",
    "  --out <path>                       Write artifact JSON",
    "  --validate <path>                  Validate an artifact JSON",
    "  --pretty                           Pretty-print JSON output",
    "  --schema                           Print artifact schema metadata",
    "  --primitive-bounds-source <label>  Describe external primitive-bound source",
    "  --primitive-bounds-status <label>  provided-unverified | directed-rounded-external-unverified-by-this-artifact",
    "  --radius-multiple <n>              Set rho=nY for reducer replay",
    "  --radius-multiple-upper-bound <n>  Set a finite y-radius cap for reducer replay",
    "  --center-residual-bound <n>        Set E_R",
    "  --center-jacobian-lower-bound <n>  Set nu_J",
    "  --jacobian-lipschitz-bound <n>     Set L_J",
    "  --rho-x <n>                        Set rho_X; requires --r-x for final replay",
    "  --r-x <n>                          Set graph radius r_X",
    "  --rho-x-upper-bound <n>            Set rho_X upper bound for optimizer replay",
    "  --m-g-bound <n>                    Set M_G",
    "  --root-tangent-numerator-bound <n> Set M_R",
  ].join("\n");
}

function writeJson(value, outPath, pretty) {
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
        artifact_schema: H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
        packet_id: PACKET_ID,
        promotion_status: PROMOTION_STATUS,
        consumes_reducer_schema: H39_REDUCER_SCHEMA,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors = validateH39SharedDomainPrimitiveDiagnostic(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        diagnostic_decision:
          artifact?.shared_domain_diagnostic_summary?.diagnostic_decision ??
          null,
        retained_branch: artifact?.result?.retained_branch ?? null,
      },
      null,
      options.pretty
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  try {
    const artifact = buildH39SharedDomainPrimitiveDiagnostic(options);
    const errors = validateH39SharedDomainPrimitiveDiagnostic(artifact);
    if (errors.length > 0) {
      throw new Error(`artifact validation failed: ${errors.join("; ")}`);
    }
    writeJson(artifact, options.out, options.pretty);
  } catch (error) {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}

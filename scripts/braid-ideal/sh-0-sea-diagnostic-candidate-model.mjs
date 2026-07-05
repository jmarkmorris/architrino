import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import {
  buildHeldReleaseSeedPathRows,
  buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement,
} from "./held-release-seed-path-rows.mjs";

export const SCHEMA = "sh_0_sea_diagnostic_candidate_model.v0";
export const AUTHORITY_CLASS = "diagnostic_candidate_model_not_accepted_evidence";

export const TARGET_RETAINED_RECORD_ID =
  "retained-record:held-release-six-point:adapter-acceptance-certificate";
export const TARGET_SOURCE_ROW_ID = "two-speed-preferred-row:u0.8:v0.2";
export const TARGET_PROVIDER_OBJECT_REF =
  "candidate:central_solver_retained_history_provider_object:7d4a8fe0a9792327";
export const TARGET_PROVIDER_ARTIFACT_HASH =
  "7d4a8fe0a97923270179f2ca0b49b4bc0d6b6ba3251b26e82569bdb4bd1f91df";
export const TARGET_ARTIFACT_ID = "held_release_seed_path_rows:5833f18e53586201";
export const TARGET_ARTIFACT_HASH =
  "5833f18e53586201775fdcd490efcc1e649841e5268a15eea022cad9ff706063";
export const ACCEPTED_EVIDENCE_BLOCKER_OBJECT = "held_release_seed_path_rows_acceptance_certificate.v0";
export const ACCEPTED_EVIDENCE_BLOCKER_FIELD = "held_release_seed_path_rows.acceptance_certificate_ref";
export const REQUIRED_INWARD_RESPONSE_FLOOR = -0.0934863484737535;
export const RESPONSE_RUN_SCHEMA = "sh_0_sea_diagnostic_response_run.v0";
export const CANDIDATE_RESPONSE_ROW_SCHEMA = "sh_0_sea_candidate_response_row.diagnostic.v0";
export const PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA = "sh_0_sea_produced_response_source_row.diagnostic.v0";
export const ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_replacement_requirement.v0";
export const ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_package.v0";
export const ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_package_verification.v0";
export const REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX =
  "repo-authorization:accepted-held-release-seed-path-rows:";
export const DEFAULT_RESPONSE_DEADBAND = 1e-9;
export const DEFAULT_PRODUCED_SOURCE_MARGIN_STEP = 0.001;
export const FCC_SEA_DIAGNOSTIC_ATTEMPT_ID = "aa";
export const FCC_SEA_POPULATION_SIZE = 12;
export const FCC_NEAREST_NEIGHBOR_DIRECTIONS = Object.freeze([
  Object.freeze([1, 1, 0]),
  Object.freeze([1, -1, 0]),
  Object.freeze([-1, 1, 0]),
  Object.freeze([-1, -1, 0]),
  Object.freeze([1, 0, 1]),
  Object.freeze([1, 0, -1]),
  Object.freeze([-1, 0, 1]),
  Object.freeze([-1, 0, -1]),
  Object.freeze([0, 1, 1]),
  Object.freeze([0, 1, -1]),
  Object.freeze([0, -1, 1]),
  Object.freeze([0, -1, -1]),
]);

const PROVIDER_PATH = new URL("../spacetime/noether-sea-density-compression-provider.v1.json", import.meta.url);

const REQUIRED_ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_FIELDS = Object.freeze([
  "schema",
  "accepted_same_target_sh_0_sea_source",
  "response_kind",
  "diagnostic_source_row_id",
  "accepted_replacement_source_row_id",
  "held_release_seed_path_rows_acceptance_certificate_ref",
  "held_release_seed_path_rows_external_accepted_authority_package_ref",
  "repo_authorization_for_accepted_held_release_seed_path_rows_ref",
  "accepted_geometry_provenance_ref",
  "accepted_event_provenance_ref",
  "accepted_support_provenance_ref",
  "accepted_action_provenance_ref",
  "geometry_carrier_row_ref",
  "target_artifact_id",
  "target_artifact_hash",
  "target_source_row_id",
  "retained_record_id",
  "provider_object_ref",
  "provider_artifact_hash",
  "target_path_row_ids",
  "accepted_same_record_evidence",
  "negative_control_rejection_verified",
]);

const AUTHORIZATION_FLAGS = Object.freeze([
  "accepted_same_record_evidence",
  "accepted_retained_evidence",
  "retained_branch_claim",
  "accepted_force_action_closure",
  "accepted_noether_sea_response_closure",
  "accepted_stability_claim",
  "accepted_branch_chart",
  "moving_retained_branch_certificate",
  "observer_export",
  "receiver_normal_branch_strength",
]);

function stableHash(value) {
  return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function normalizeStringRef(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function stringRefWithPrefix(value, requiredPrefix) {
  const ref = normalizeStringRef(value);
  const prefix = normalizeStringRef(requiredPrefix);
  return ref != null && prefix != null && ref.startsWith(prefix) ? ref : null;
}

function matchingNonEmptyString(value, expected) {
  const ref = normalizeStringRef(value);
  const expectedRef = normalizeStringRef(expected);
  return expectedRef != null && ref === expectedRef;
}

function pushMissingUnlessMatchingString({ missingFields, value, expected, field }) {
  if (!matchingNonEmptyString(value, expected)) {
    missingFields.push(field);
  }
}

function arraysEqual(left, right) {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((entry, index) => entry === right[index])
  );
}

function normalizeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeVector(value, fallback = null) {
  if (!Array.isArray(value) || value.length !== 3) {
    return fallback == null ? undefined : [...fallback];
  }
  const vector = value.map((entry) => Number(entry));
  if (vector.some((entry) => !Number.isFinite(entry))) {
    return fallback == null ? undefined : [...fallback];
  }
  return vector;
}

function cleanNumber(value) {
  const number = normalizeNumber(value, null);
  return number == null || Object.is(number, -0) ? 0 : number;
}

function makeAuthorization({ acceptedSameRecordEvidence = false } = {}) {
  return Object.fromEntries([
    ...AUTHORIZATION_FLAGS.map((flag) => [
      flag,
      flag === "accepted_same_record_evidence" ? acceptedSameRecordEvidence === true : false,
    ]),
    ["scoreMovement", "no_score_increase"],
  ]);
}

function rowBySuffix(model, suffix) {
  return model.rows.find((row) => row.row_id === `sh_0_sea_model:${suffix}`) ?? null;
}

function ceilToStep(value, step) {
  const positiveStep = Math.max(Number.EPSILON, normalizeNumber(step, DEFAULT_PRODUCED_SOURCE_MARGIN_STEP));
  return cleanNumber(Math.ceil((value - Number.EPSILON) / positiveStep) * positiveStep);
}

function requiredPhiAtCurrentCoefficients({ probe, deadband }) {
  const weakestToyAcceleration = -REQUIRED_INWARD_RESPONSE_FLOOR;
  const denominator = probe.K_NS_diag;
  const numerator =
    weakestToyAcceleration +
    deadband -
    probe.Gamma_NS_diag * probe.dot_Phi_probe +
    probe.W_boundary_projection;
  return denominator > 0 ? cleanNumber(Math.max(0, numerator / denominator)) : null;
}

function buildTargetBinding(model) {
  const targetRow = rowBySuffix(model, "target_source_row");
  return {
    target_artifact_id: model.target_artifact_id,
    target_artifact_hash: model.target_artifact_hash,
    target_source_row_id: model.target_source_row_id,
    retained_record_id: targetRow?.retained_record_id ?? TARGET_RETAINED_RECORD_ID,
    provider_object_ref: targetRow?.provider_object_ref ?? TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: targetRow?.provider_artifact_hash ?? TARGET_PROVIDER_ARTIFACT_HASH,
    target_path_row_ids: targetRow?.path_rows?.map((row) => row.row_id) ?? [],
  };
}

function buildLocalRowRefs(model) {
  return {
    sea_population_row_ref: rowBySuffix(model, "like_braid_population_row")?.row_id ?? null,
    fcc_nearest_neighbor_shell_row_ref:
      rowBySuffix(model, "fcc_nearest_neighbor_shell_row")?.row_id ?? null,
    local_target_sea_frame_row_ref: rowBySuffix(model, "local_target_sea_frame_row")?.row_id ?? null,
    theta_sea_state_row_ref: rowBySuffix(model, "theta_sea_state_row")?.row_id ?? null,
    boundary_condition_row_ref: rowBySuffix(model, "boundary_condition_row")?.row_id ?? null,
    sea_response_equation_row_ref: rowBySuffix(model, "sea_response_equation_row")?.row_id ?? null,
    support_envelope_row_ref: rowBySuffix(model, "support_envelope_row")?.row_id ?? null,
    action_exchange_row_ref: rowBySuffix(model, "action_exchange_row")?.row_id ?? null,
  };
}

function buildGeometryCarrier(model) {
  const shellRow = rowBySuffix(model, "fcc_nearest_neighbor_shell_row");
  return {
    geometry_carrier_row_ref: shellRow?.row_id ?? null,
    diagnostic_attempt_id: shellRow?.diagnostic_attempt_id ?? null,
    shell_configuration: shellRow?.shell_configuration ?? null,
    population_size: shellRow?.population_size ?? null,
    center_formula: shellRow?.center_formula ?? null,
    nearest_neighbor_radius: shellRow?.nearest_neighbor_radius ?? null,
    neighbor_directions: shellRow?.neighbor_directions?.map((row) => ({
      index: row.index,
      direction: [...row.direction],
    })) ?? [],
    accepted_geometry_carrier: false,
  };
}

function buildSeedPathAcceptanceCertificateRequirement(model, options = {}) {
  return buildHeldReleaseSeedPathRowsAcceptanceCertificateRequirement({
    retainedRecordId: TARGET_RETAINED_RECORD_ID,
    sourceRowId: model.target_source_row_id ?? TARGET_SOURCE_ROW_ID,
    providerObjectRef: TARGET_PROVIDER_OBJECT_REF,
    providerArtifactHash: TARGET_PROVIDER_ARTIFACT_HASH,
    acceptanceCertificate: options.seedPathAcceptanceCertificate ?? {},
    externalAuthorityPackage: options.seedPathExternalAuthorityPackage ?? {},
    repoAuthorization: options.seedPathRepoAuthorization ?? {},
  });
}

function buildAcceptedProvenanceReplacementPackageExpectation({
  producedSourceRow,
  seedPathRequirement,
  expectedRefPrefixes,
  targetBinding,
  geometryCarrier,
}) {
  const suppliedCertificateRef =
    seedPathRequirement.acceptance_certificate_verification?.supplied_certificate_ref ?? null;
  const requiredCertificateRef = suppliedCertificateRef ??
    (seedPathRequirement.required_certificate_ref_prefix == null
      ? null
      : `${seedPathRequirement.required_certificate_ref_prefix}<certificate-ref>`);
  const suppliedRepoAuthorizationRef =
    seedPathRequirement.acceptance_certificate_verification?.supplied_repo_authorization_ref ?? null;
  return {
    schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
    accepted_same_target_sh_0_sea_source: true,
    response_kind: producedSourceRow?.response_kind ?? null,
    diagnostic_source_row_id: producedSourceRow?.row_id ?? null,
    accepted_replacement_source_row_id:
      `${expectedRefPrefixes.accepted_replacement_source_row_ref}<accepted-source-row-ref>`,
    held_release_seed_path_rows_acceptance_certificate_ref: requiredCertificateRef,
    held_release_seed_path_rows_external_accepted_authority_package_ref:
      seedPathRequirement.required_external_authority_package_ref ?? null,
    repo_authorization_for_accepted_held_release_seed_path_rows_ref:
      suppliedRepoAuthorizationRef ??
      `${REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX}<repo-authorization-ref>`,
    accepted_geometry_provenance_ref:
      `${expectedRefPrefixes.accepted_geometry_provenance_ref}<accepted-geometry-provenance-ref>`,
    accepted_event_provenance_ref:
      `${expectedRefPrefixes.accepted_event_provenance_ref}<accepted-event-provenance-ref>`,
    accepted_support_provenance_ref:
      `${expectedRefPrefixes.accepted_support_provenance_ref}<accepted-support-provenance-ref>`,
    accepted_action_provenance_ref:
      `${expectedRefPrefixes.accepted_action_provenance_ref}<accepted-action-provenance-ref>`,
    geometry_carrier_row_ref: geometryCarrier?.geometry_carrier_row_ref ?? null,
    target_artifact_id: targetBinding?.target_artifact_id ?? null,
    target_artifact_hash: targetBinding?.target_artifact_hash ?? null,
    target_source_row_id: targetBinding?.target_source_row_id ?? null,
    retained_record_id: targetBinding?.retained_record_id ?? null,
    provider_object_ref: targetBinding?.provider_object_ref ?? null,
    provider_artifact_hash: targetBinding?.provider_artifact_hash ?? null,
    target_path_row_ids: targetBinding?.target_path_row_ids ?? [],
    accepted_same_record_evidence: true,
    negative_control_rejection_verified: true,
  };
}

function evaluateAcceptedProvenanceReplacementPackage({
  acceptedProvenancePackage = {},
  producedSourceRow,
  seedPathRequirement,
  expectedRefPrefixes,
  targetBinding,
  geometryCarrier,
}) {
  const packageInput = acceptedProvenancePackage ?? {};
  const hasPackageInput =
    typeof packageInput === "object" &&
    packageInput !== null &&
    Object.keys(packageInput).length > 0;
  const expected = buildAcceptedProvenanceReplacementPackageExpectation({
    producedSourceRow,
    seedPathRequirement,
    expectedRefPrefixes,
    targetBinding,
    geometryCarrier,
  });
  const missingFields = [];
  if (!hasPackageInput) {
    missingFields.push("accepted_provenance_package");
  } else {
    if (packageInput.schema !== ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA) {
      missingFields.push("accepted_provenance_package.schema");
    }
    if (packageInput.accepted_same_target_sh_0_sea_source !== true) {
      missingFields.push("accepted_provenance_package.accepted_same_target_sh_0_sea_source");
    }
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.response_kind,
      expected: expected.response_kind,
      field: "accepted_provenance_package.response_kind",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.diagnostic_source_row_id,
      expected: expected.diagnostic_source_row_id,
      field: "accepted_provenance_package.diagnostic_source_row_id",
    });
    if (
      stringRefWithPrefix(
        packageInput.accepted_replacement_source_row_id,
        expectedRefPrefixes.accepted_replacement_source_row_ref
      ) == null
    ) {
      missingFields.push("accepted_provenance_package.accepted_replacement_source_row_id");
    }

    const suppliedCertificateRef =
      seedPathRequirement.acceptance_certificate_verification?.supplied_certificate_ref ?? null;
    if (suppliedCertificateRef == null) {
      if (
        stringRefWithPrefix(
          packageInput.held_release_seed_path_rows_acceptance_certificate_ref,
          seedPathRequirement.required_certificate_ref_prefix
        ) == null
      ) {
        missingFields.push(
          "accepted_provenance_package.held_release_seed_path_rows_acceptance_certificate_ref"
        );
      }
    } else {
      pushMissingUnlessMatchingString({
        missingFields,
        value: packageInput.held_release_seed_path_rows_acceptance_certificate_ref,
        expected: suppliedCertificateRef,
        field:
          "accepted_provenance_package.held_release_seed_path_rows_acceptance_certificate_ref",
      });
    }
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.held_release_seed_path_rows_external_accepted_authority_package_ref,
      expected: seedPathRequirement.required_external_authority_package_ref,
      field:
        "accepted_provenance_package.held_release_seed_path_rows_external_accepted_authority_package_ref",
    });
    const suppliedRepoAuthorizationRef =
      seedPathRequirement.acceptance_certificate_verification?.supplied_repo_authorization_ref ?? null;
    if (suppliedRepoAuthorizationRef == null) {
      if (
        stringRefWithPrefix(
          packageInput.repo_authorization_for_accepted_held_release_seed_path_rows_ref,
          REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX
        ) == null
      ) {
        missingFields.push(
          "accepted_provenance_package.repo_authorization_for_accepted_held_release_seed_path_rows_ref"
        );
      }
    } else {
      pushMissingUnlessMatchingString({
        missingFields,
        value: packageInput.repo_authorization_for_accepted_held_release_seed_path_rows_ref,
        expected: suppliedRepoAuthorizationRef,
        field:
          "accepted_provenance_package.repo_authorization_for_accepted_held_release_seed_path_rows_ref",
      });
    }
    if (
      stringRefWithPrefix(
        packageInput.accepted_geometry_provenance_ref,
        expectedRefPrefixes.accepted_geometry_provenance_ref
      ) == null
    ) {
      missingFields.push("accepted_provenance_package.accepted_geometry_provenance_ref");
    }
    if (
      stringRefWithPrefix(
        packageInput.accepted_event_provenance_ref,
        expectedRefPrefixes.accepted_event_provenance_ref
      ) == null
    ) {
      missingFields.push("accepted_provenance_package.accepted_event_provenance_ref");
    }
    if (
      stringRefWithPrefix(
        packageInput.accepted_support_provenance_ref,
        expectedRefPrefixes.accepted_support_provenance_ref
      ) == null
    ) {
      missingFields.push("accepted_provenance_package.accepted_support_provenance_ref");
    }
    if (
      stringRefWithPrefix(
        packageInput.accepted_action_provenance_ref,
        expectedRefPrefixes.accepted_action_provenance_ref
      ) == null
    ) {
      missingFields.push("accepted_provenance_package.accepted_action_provenance_ref");
    }
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.geometry_carrier_row_ref,
      expected: expected.geometry_carrier_row_ref,
      field: "accepted_provenance_package.geometry_carrier_row_ref",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.target_artifact_id,
      expected: expected.target_artifact_id,
      field: "accepted_provenance_package.target_artifact_id",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.target_artifact_hash,
      expected: expected.target_artifact_hash,
      field: "accepted_provenance_package.target_artifact_hash",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.target_source_row_id,
      expected: expected.target_source_row_id,
      field: "accepted_provenance_package.target_source_row_id",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.retained_record_id,
      expected: expected.retained_record_id,
      field: "accepted_provenance_package.retained_record_id",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.provider_object_ref,
      expected: expected.provider_object_ref,
      field: "accepted_provenance_package.provider_object_ref",
    });
    pushMissingUnlessMatchingString({
      missingFields,
      value: packageInput.provider_artifact_hash,
      expected: expected.provider_artifact_hash,
      field: "accepted_provenance_package.provider_artifact_hash",
    });
    if (!arraysEqual(packageInput.target_path_row_ids, expected.target_path_row_ids)) {
      missingFields.push("accepted_provenance_package.target_path_row_ids");
    }
    if (packageInput.accepted_same_record_evidence !== true) {
      missingFields.push("accepted_provenance_package.accepted_same_record_evidence");
    }
    if (packageInput.negative_control_rejection_verified !== true) {
      missingFields.push("accepted_provenance_package.negative_control_rejection_verified");
    }
  }
  const packageConditionallyVerified = hasPackageInput && missingFields.length === 0;
  return {
    schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA,
    accepted: false,
    package_supplied: hasPackageInput,
    package_conditionally_verified: packageConditionallyVerified,
    status: packageConditionallyVerified
      ? "same_target_accepted_provenance_package_conditionally_verified"
      : hasPackageInput
        ? "same_target_accepted_provenance_package_missing_or_unverified"
        : "same_target_accepted_provenance_package_missing",
    required_package_schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
    required_package_fields: [...REQUIRED_ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_FIELDS],
    expected_package_payload: expected,
    supplied_package_schema: normalizeStringRef(packageInput.schema),
    supplied_accepted_replacement_source_row_id:
      normalizeStringRef(packageInput.accepted_replacement_source_row_id),
    supplied_geometry_carrier_row_ref: normalizeStringRef(packageInput.geometry_carrier_row_ref),
    missing_fields: missingFields,
    first_missing_object: packageConditionallyVerified
      ? null
      : "sh_0_sea_same_target_accepted_provenance_package",
    first_missing_field: packageConditionallyVerified
      ? null
      : (missingFields[0] ?? "accepted_provenance_package"),
    authorization: makeAuthorization(),
  };
}

function buildDiagnosticResponseProbe({ model, options, producedSourceRow = null }) {
  const seaStateRow = rowBySuffix(model, "theta_sea_state_row");
  const thetaSea = seaStateRow?.theta_sea_rho_NS ?? {};
  const responseInputs = seaStateRow?.response_inputs ?? {};
  const rhoNs = normalizeNumber(thetaSea.rho_NS, 1);
  const normalizedDensity = normalizeNumber(thetaSea.n, 1);
  const eSea = normalizeNumber(thetaSea.e_sea, 0);
  const c1111 = normalizeNumber(responseInputs.C1111_X, 0);
  const providerStiffness = c1111 * rhoNs * normalizedDensity;
  const producedPhi = producedSourceRow?.produced_response_components?.Phi_probe;
  return {
    schema: "sh_0_sea_diagnostic_response_probe.v0",
    probe_id:
      normalizeStringRef(options.responseRunHandle) ??
      `${model.run_matrix_metadata?.run_handle ?? "sh0sea-default"}:theta-sea-provider-e-sea-probe`,
    coefficient_source: "theta_sea_rho_NS provider row",
    stiffness_source: "C1111_X * rho_NS * n",
    radial_displacement_source:
      producedSourceRow?.row_id ??
      (options.responseAmplitude == null ? "theta_sea_rho_NS.e_sea" : "cli:response-amplitude"),
    radial_rate_source: options.responseRate == null ? "default_zero_radial_rate_probe" : "cli:response-rate",
    boundary_wake_source:
      options.boundaryWakeProjection == null
        ? "aa_fcc_shell_default_zero_boundary_wake_projection"
        : "cli:boundary-wake-projection",
    geometry_carrier: buildGeometryCarrier(model),
    rho_NS: cleanNumber(rhoNs),
    n: cleanNumber(normalizedDensity),
    e_sea: cleanNumber(eSea),
    C1111_X: cleanNumber(c1111),
    K_NS_diag: cleanNumber(normalizeNumber(options.responseStiffness, providerStiffness)),
    Gamma_NS_diag: cleanNumber(normalizeNumber(options.responseDamping, 0)),
    Phi_probe: cleanNumber(producedPhi ?? normalizeNumber(options.responseAmplitude, eSea)),
    dot_Phi_probe: cleanNumber(normalizeNumber(options.responseRate, 0)),
    W_boundary_projection: cleanNumber(normalizeNumber(options.boundaryWakeProjection, 0)),
    produced_response_source_row_ref: producedSourceRow?.row_id ?? null,
  };
}

function buildProducedResponseSourceRow({ model, seedProbe, options }) {
  const responseKind = normalizeStringRef(options.responseRowKind) ?? "pressure_tension";
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const requiredPhi = requiredPhiAtCurrentCoefficients({ probe: seedProbe, deadband });
  const step = normalizeNumber(options.producedSourceMarginStep, DEFAULT_PRODUCED_SOURCE_MARGIN_STEP);
  const producedPhi =
    options.producedSourcePhi == null
      ? ceilToStep(requiredPhi ?? seedProbe.Phi_probe, step)
      : cleanNumber(normalizeNumber(options.producedSourcePhi, seedProbe.Phi_probe));
  const targetBinding = buildTargetBinding(model);
  const localRowRefs = buildLocalRowRefs(model);
  const geometryCarrier = buildGeometryCarrier(model);
  const rowKey = {
    schema: PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA,
    responseKind,
    targetBinding,
    localRowRefs,
    geometryCarrier,
    requiredPhi,
    producedPhi,
    step,
  };
  const rowHash = stableHash(rowKey);
  const rowId = `sh_0_sea_produced_response_source:${responseKind}:${rowHash.slice(0, 16)}`;
  return {
    schema: PRODUCED_RESPONSE_SOURCE_ROW_SCHEMA,
    row_id: rowId,
    authority_class: AUTHORITY_CLASS,
    response_kind: responseKind,
    claim_level: "diagnostic produced same-target response source only",
    target_binding: targetBinding,
    event_provenance: {
      boundary_event_row_ref: `${rowId}:boundary-event`,
      boundary_condition_row_ref: localRowRefs.boundary_condition_row_ref,
      geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
      event_source: `candidate_same_target_aa_fcc_shell_${responseKind}_event`,
      accepted_event_row: false,
    },
    geometry_carrier: {
      ...geometryCarrier,
      source_production_role: `${responseKind}_diagnostic_geometry_carrier`,
    },
    accepted_replacement_target: {
      required_package_schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
      required_seed_path_certificate_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      required_seed_path_certificate_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
      required_provenance_fields: [
        "accepted_geometry_provenance_ref",
        "accepted_event_provenance_ref",
        "accepted_support_provenance_ref",
        "accepted_action_provenance_ref",
      ],
      accepted_geometry_provenance: false,
      accepted_event_provenance: false,
      accepted_support_provenance: false,
      accepted_action_provenance: false,
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    support_provenance: {
      support_envelope_row_ref: localRowRefs.support_envelope_row_ref,
      geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
      weakest_outward_post_turn_ddot_R_toy: cleanNumber(-REQUIRED_INWARD_RESPONSE_FLOOR),
      inward_deadband: deadband,
      required_projected_response_floor: cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband),
      required_Phi_probe_at_current_coefficients: requiredPhi,
      producer_rule: `ceil(required_Phi_probe_at_current_coefficients, ${step})`,
    },
    action_provenance: {
      action_exchange_row_ref: localRowRefs.action_exchange_row_ref,
      geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
      response_work_rate_ref: rowBySuffix(model, "action_exchange_row")?.response_work_rate ?? null,
      diagnostic_action_residual_ref: rowBySuffix(model, "action_exchange_row")?.diagnostic_action_residual ?? null,
      accepted_same_record_action_closure: false,
    },
    produced_response_components: {
      K_NS_diag: seedProbe.K_NS_diag,
      Gamma_NS_diag: seedProbe.Gamma_NS_diag,
      Phi_probe: producedPhi,
      dot_Phi_probe: seedProbe.dot_Phi_probe,
      W_boundary_projection: seedProbe.W_boundary_projection,
      source_margin_over_required_Phi:
        requiredPhi == null ? null : cleanNumber(Math.max(0, producedPhi - requiredPhi)),
    },
    accepted: false,
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    retained_evidence_authorized: false,
  };
}

function buildAcceptedProvenanceReplacementRequirement({
  model,
  producedSourceRow,
  candidateResponseRow,
  options = {},
}) {
  if (producedSourceRow == null) {
    return null;
  }
  const seedPathRequirement = buildSeedPathAcceptanceCertificateRequirement(model, options);
  const responseKind = producedSourceRow.response_kind ?? candidateResponseRow?.response_kind ?? "pressure_tension";
  const targetBinding = producedSourceRow.target_binding ?? buildTargetBinding(model);
  const geometryCarrier = producedSourceRow.geometry_carrier ?? buildGeometryCarrier(model);
  const expectedRefPrefixes = {
    accepted_replacement_source_row_ref:
      `accepted:sh-0-sea:${responseKind}:same-target-aa-fcc-source:`,
    accepted_geometry_provenance_ref:
      "accepted:sh-0-sea:geometry:aa-fcc-nearest-neighbor-shell:",
    accepted_event_provenance_ref:
      `accepted:sh-0-sea:event:${responseKind}:aa-fcc-shell:`,
    accepted_support_provenance_ref:
      `accepted:sh-0-sea:support:${responseKind}:aa-fcc-shell:`,
    accepted_action_provenance_ref:
      `accepted:sh-0-sea:action:${responseKind}:aa-fcc-shell:`,
  };
  const acceptedProvenancePackageVerification = evaluateAcceptedProvenanceReplacementPackage({
    acceptedProvenancePackage: options.acceptedProvenancePackage ?? {},
    producedSourceRow,
    candidateResponseRow,
    seedPathRequirement,
    expectedRefPrefixes,
    targetBinding,
    geometryCarrier,
  });
  const seedPathReady = seedPathRequirement.requirement_passed === true;
  const packageReady =
    acceptedProvenancePackageVerification.package_conditionally_verified === true;
  const requirementPassed = seedPathReady && packageReady;
  return {
    schema: ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA,
    accepted: requirementPassed,
    requirement_passed: requirementPassed,
    status: seedPathReady
      ? acceptedProvenancePackageVerification.status
      : seedPathRequirement.status,
    response_kind: responseKind,
    diagnostic_source_row_id: producedSourceRow.row_id,
    candidate_response_row_id: candidateResponseRow?.row_id ?? null,
    target_binding: targetBinding,
    geometry_carrier: geometryCarrier,
    seed_path_acceptance: {
      requirement_schema: seedPathRequirement.schema,
      accepted: seedPathRequirement.accepted,
      requirement_passed: seedPathRequirement.requirement_passed,
      status: seedPathRequirement.status,
      first_missing_object: seedPathRequirement.first_missing_object,
      first_missing_field: seedPathRequirement.first_missing_field,
      required_certificate_schema: seedPathRequirement.required_certificate_schema,
      required_certificate_ref_prefix: seedPathRequirement.required_certificate_ref_prefix,
      required_external_authority_package_schema:
        seedPathRequirement.required_external_authority_package_schema,
      required_external_authority_package_ref:
        seedPathRequirement.required_external_authority_package_ref,
      required_repo_authorization_object:
        seedPathRequirement.required_repo_authorization_object,
      required_repo_authorization_field:
        seedPathRequirement.required_repo_authorization_field,
      repo_authorization_status: seedPathRequirement.repo_authorization_status,
      conditionally_verified:
        seedPathRequirement.acceptance_certificate_verification?.conditionally_verified ?? false,
    },
    required_package_schema: ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
    required_package_fields: [...REQUIRED_ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_FIELDS],
    expected_ref_prefixes: expectedRefPrefixes,
    accepted_provenance_package_verification: acceptedProvenancePackageVerification,
    current_diagnostic_refs: {
      geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
      boundary_condition_row_ref:
        producedSourceRow.event_provenance?.boundary_condition_row_ref ?? null,
      boundary_event_row_ref:
        producedSourceRow.event_provenance?.boundary_event_row_ref ?? null,
      support_envelope_row_ref:
        producedSourceRow.support_provenance?.support_envelope_row_ref ?? null,
      action_exchange_row_ref:
        producedSourceRow.action_provenance?.action_exchange_row_ref ?? null,
    },
    accepted_provenance_status: {
      accepted_geometry_provenance: requirementPassed,
      accepted_event_provenance: requirementPassed,
      accepted_support_provenance: requirementPassed,
      accepted_action_provenance: requirementPassed,
      accepted_replacement_source_row_id: requirementPassed
        ? acceptedProvenancePackageVerification.supplied_accepted_replacement_source_row_id
        : null,
    },
    first_missing_object: seedPathReady
      ? acceptedProvenancePackageVerification.first_missing_object
      : seedPathRequirement.first_missing_object,
    first_missing_field: seedPathReady
      ? acceptedProvenancePackageVerification.first_missing_field
      : seedPathRequirement.first_missing_field,
    next_after_seed_path_acceptance: [
      "held_release_seed_path_rows_external_accepted_authority_package.v0",
      "repo_authorization_for_accepted_held_release_seed_path_rows",
      ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA,
    ],
    authorization: makeAuthorization({ acceptedSameRecordEvidence: requirementPassed }),
  };
}

function buildCandidateResponseRow({ model, probe, options }) {
  const responseKind = normalizeStringRef(options.responseRowKind) ?? "pressure_tension";
  const targetBinding = buildTargetBinding(model);
  const rowKey = {
    schema: CANDIDATE_RESPONSE_ROW_SCHEMA,
    responseKind,
    targetBinding,
    probe,
  };
  const rowHash = stableHash(rowKey);
  return {
    schema: CANDIDATE_RESPONSE_ROW_SCHEMA,
    row_id: `sh_0_sea_candidate_response_row:${responseKind}:${rowHash.slice(0, 16)}`,
    authority_class: AUTHORITY_CLASS,
    response_kind: responseKind,
    claim_level: "candidate same-target response row only",
    target_binding: targetBinding,
    local_row_refs: buildLocalRowRefs(model),
    response_components: {
      K_NS_diag: probe.K_NS_diag,
      Gamma_NS_diag: probe.Gamma_NS_diag,
      Phi_probe: probe.Phi_probe,
      dot_Phi_probe: probe.dot_Phi_probe,
      W_boundary_projection: probe.W_boundary_projection,
      coefficient_source: probe.coefficient_source,
      radial_displacement_source: probe.radial_displacement_source,
      boundary_wake_source: probe.boundary_wake_source,
      geometry_carrier_row_ref: probe.geometry_carrier?.geometry_carrier_row_ref ?? null,
      geometry_carrier_attempt_id: probe.geometry_carrier?.diagnostic_attempt_id ?? null,
      produced_response_source_row_ref: probe.produced_response_source_row_ref,
    },
    response_equation:
      "Pi_R A_sea=-K_NS_diag*Phi_probe-Gamma_NS_diag*dot_Phi_probe+W_boundary_projection",
    accepted: false,
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    retained_evidence_authorized: false,
  };
}

function projectDiagnosticSeaResponse(candidateResponseRow) {
  const components = candidateResponseRow.response_components;
  return cleanNumber(
    -components.K_NS_diag * components.Phi_probe -
      components.Gamma_NS_diag * components.dot_Phi_probe +
      components.W_boundary_projection
  );
}

function buildResponseFloorEvaluation({ candidateResponseRow, piRASea, options }) {
  const components = candidateResponseRow.response_components;
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const weakestToyAcceleration = cleanNumber(-REQUIRED_INWARD_RESPONSE_FLOOR);
  const totalPostTurnAcceleration = cleanNumber(weakestToyAcceleration + piRASea);
  const crosses = piRASea < requiredProjection;
  const additionalInwardProjectionNeeded = cleanNumber(Math.max(0, piRASea - requiredProjection));
  const denominator = components.K_NS_diag;
  const numerator =
    weakestToyAcceleration +
    deadband -
    components.Gamma_NS_diag * components.dot_Phi_probe +
    components.W_boundary_projection;
  const requiredPhi =
    denominator > 0 ? cleanNumber(Math.max(0, numerator / denominator)) : null;
  const multiplier =
    requiredPhi != null && components.Phi_probe > 0 ? cleanNumber(requiredPhi / components.Phi_probe) : null;
  return {
    schema: "sh_0_sea_response_floor_evaluation.diagnostic.v0",
    candidate_response_row_id: candidateResponseRow.row_id,
    weakest_outward_post_turn_ddot_R_toy: weakestToyAcceleration,
    inward_deadband: deadband,
    required_projected_response_floor: requiredProjection,
    Pi_R_A_sea: piRASea,
    total_post_turn_radial_acceleration: totalPostTurnAcceleration,
    crosses_inward_response_floor: crosses,
    post_turn_return_condition_passed: totalPostTurnAcceleration < -deadband,
    additional_inward_projection_needed: additionalInwardProjectionNeeded,
    required_Phi_probe_at_current_coefficients: requiredPhi,
    required_Phi_multiplier_vs_current_probe: multiplier,
    evidence_status: "diagnostic_floor_test_not_retained_evidence",
  };
}

function readNoetherSeaProvider() {
  return JSON.parse(fs.readFileSync(PROVIDER_PATH, "utf8"));
}

function buildTargetSourceArtifact(options = {}) {
  const targetRunOptionsActive =
    normalizeStringRef(options.embeddedCentralRunHandle) != null ||
    normalizeStringRef(options.proofId) != null ||
    normalizeVector(options.targetCenterGroupVelocity) != null ||
    options.surfaceSpeedFraction != null ||
    normalizeStringRef(options.prehistoryMode) != null;
  return buildHeldReleaseSeedPathRows({
    ...(targetRunOptionsActive
      ? {
          proofId: "SH-0",
          runHandle: normalizeStringRef(options.embeddedCentralRunHandle),
          sourceRowId: normalizeStringRef(options.targetSourceRowId) ?? TARGET_SOURCE_ROW_ID,
          groupVelocity: normalizeVector(options.targetCenterGroupVelocity),
          surfaceSpeedFraction: normalizeNumber(options.surfaceSpeedFraction, 0),
          prehistoryMode: normalizeStringRef(options.prehistoryMode),
        }
      : {}),
    retainedRecordId: TARGET_RETAINED_RECORD_ID,
    providerObjectRef: TARGET_PROVIDER_OBJECT_REF,
    providerArtifactHash: TARGET_PROVIDER_ARTIFACT_HASH,
  });
}

function summarizeTargetRows(artifact) {
  return artifact.rows.map((row, index) => ({
    index,
    row_id: row.row_id,
    architrino_id: row.path_identity.architrino_id,
    polarity: row.path_identity.polarity,
    seed_sign: row.path_identity.seed_sign,
    path_key: row.path_identity.path_key,
    retained_record_id: row.path_identity.retained_record_id,
    provider_object_ref: row.provider_provenance.provider_object_ref,
    accepted: false,
    first_missing_object: row.first_missing_object,
    first_missing_field: row.first_missing_field,
  }));
}

function buildTargetSourceRow(artifact) {
  return {
    row_id: "sh_0_sea_model:target_source_row",
    schema: "sh_0_sea_target_source_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    proof_id: "SH-0-sea",
    target_proof_id: "SH-0",
    target_role: "central candidate target identity",
    candidate_artifact_id: artifact.artifact_id,
    candidate_artifact_hash: artifact.artifact_hash,
    run_matrix_metadata: artifact.run_matrix_metadata ?? null,
    seed_id: artifact.seed_id,
    route_id: artifact.route_id,
    retained_record_id: TARGET_RETAINED_RECORD_ID,
    source_row_id: artifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
    provider_object_ref: TARGET_PROVIDER_OBJECT_REF,
    provider_artifact_hash: TARGET_PROVIDER_ARTIFACT_HASH,
    source_run_identity: artifact.source_run_identity,
    dynamic_replay_requirements: artifact.dynamic_replay_requirements,
    evidence_status: artifact.evidence_status,
    path_rows: summarizeTargetRows(artifact),
    accepted: false,
    first_missing_object: "held_release_seed_path_rows_acceptance_certificate",
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function buildSeaStateRow(provider) {
  const rows = provider.thetaSeaRows;
  const responseRows = provider.responseRows;
  return {
    row_id: "sh_0_sea_model:theta_sea_state_row",
    schema: "sh_0_sea_theta_sea_state_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    provider_source_path: "scripts/spacetime/noether-sea-density-compression-provider.v1.json",
    provider_schema: provider.schema,
    provider_status_for_own_domain: provider.providerStatus,
    target_binding_status: "not_bound_to_sh_0_sea_target_record",
    theta_sea_rho_NS: {
      rho_NS: rows.rho_NS?.rho_NS ?? null,
      n: rows.n?.n ?? null,
      u_sea: rows.u_sea?.u_sea ?? null,
      e_sea: rows.e_sea?.e_sea ?? null,
      thetaSeaId: rows.theta_sea?.thetaSeaId ?? null,
      f_N: rows.f_N?.f_N ?? null,
      eventLedgerRef: rows.rho_NS?.eventLedgerRef ?? null,
    },
    response_inputs: {
      channelId: responseRows.channel_declaration_row?.channelId ?? null,
      channelType: responseRows.channel_declaration_row?.channelType ?? null,
      c_X_disp_squared: responseRows.speed_row?.c_X_disp_squared ?? null,
      C1111_X: responseRows.stress_strain_row?.C1111_X ?? null,
      causality_residual: responseRows.causality_row?.residual ?? null,
      sameWindow: responseRows.correlation_row?.sameWindow ?? null,
    },
    accepted_for_sh_0_sea: false,
  };
}

function buildSeaPopulationRow() {
  return {
    row_id: "sh_0_sea_model:like_braid_population_row",
    schema: "sh_0_sea_like_braid_population_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    population_role: "surrounding like Noether braid assemblies",
    population_variables: [
      "N_sea",
      "X_k(t)",
      "U_k(t)",
      "O_k(t)",
      "varphi_k(t)",
      "B_k(t)",
    ],
    paired_center_condition: "X_kprime(t)-C(t)=-(X_k(t)-C(t))",
    paired_velocity_condition: "U_kprime(t)-dot_C(t)=-(U_k(t)-dot_C(t))",
    orientation_phase_status: "recorded_not_assumed",
    diagnostic_specialization_row_ref: "sh_0_sea_model:fcc_nearest_neighbor_shell_row",
    selection_status: "diagnostic_symmetry_control_not_noether_sea_selection_rule",
    accepted: false,
  };
}

function buildFccNearestNeighborShellRow() {
  return {
    row_id: "sh_0_sea_model:fcc_nearest_neighbor_shell_row",
    schema: "sh_0_sea_fcc_nearest_neighbor_shell_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    diagnostic_attempt_id: FCC_SEA_DIAGNOSTIC_ATTEMPT_ID,
    population_size: FCC_SEA_POPULATION_SIZE,
    shell_configuration: "FCC nearest-neighbor shell",
    center_formula: "X_k(t)=C(t)+(a_FCC/2)d_k",
    direction_basis:
      "unscaled face-diagonal directions d_k in {(+/-1,+/-1,0),(+/-1,0,+/-1),(0,+/-1,+/-1)}",
    nearest_neighbor_radius: "a_FCC/sqrt(2)",
    neighbor_directions: FCC_NEAREST_NEIGHBOR_DIRECTIONS.map((direction, index) => ({
      index,
      direction: [...direction],
    })),
    paired_center_condition: "for each d_k, the shell includes -d_k",
    velocity_condition: "U_k(t)=dot_C(t) for first static diagnostic shell unless wake rows supply motion",
    orientation_phase_status: "recorded_not_assumed",
    accepted: false,
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function buildFrameRow(artifact) {
  const targetVelocity = artifact.dynamic_replay_requirements.group_velocity;
  return {
    row_id: "sh_0_sea_model:local_target_sea_frame_row",
    schema: "sh_0_sea_local_target_sea_frame_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    center_definition: "C(t)=mean_a x_a(t)",
    relative_position_definition: "y_a(t)=x_a(t)-C(t)",
    candidate_target_center_velocity: targetVelocity,
    rest_model_condition: "dot_C(t)-u_sea(C,t)=0 after target-center frame normalization",
    frame_note:
      "The candidate source rows carry center drift; this diagnostic model subtracts target-center motion before testing rest-shell support.",
    accepted: false,
  };
}

function buildBoundaryRow() {
  return {
    row_id: "sh_0_sea_model:boundary_condition_row",
    schema: "sh_0_sea_boundary_condition_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    local_region: "Omega_C(t)",
    boundary_history: "H_boundary(t)={W_boundary,E_boundary,J_boundary,A_boundary}",
    required_inputs: [
      "candidate wake data from surrounding like-braid assemblies",
      "event rows crossing the local boundary",
      "diagnostic exchange flux through the boundary",
      "boundary action/exchange accumulator",
    ],
    hard_wall_allowed: false,
    accepted: false,
  };
}

function buildSeaResponseRow() {
  return {
    row_id: "sh_0_sea_model:sea_response_equation_row",
    schema: "sh_0_sea_response_equation_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    equation_general:
      "a_sea_a(t)=A_sea_a(B_T(t),Theta_sea(t),Theta_asm(t),H_boundary(t))",
    equation_diagnostic_split:
      "A_sea_a=-K_NS[Theta,H] Phi_a yhat_a-Gamma_NS[Theta,H] dot_Phi_a yhat_a+W_boundary_a",
    radial_projection: "Pi_R A_sea=(1/6) sum_a yhat_a dot A_sea_a",
    coefficient_status:
      "K_NS and Gamma_NS are placeholders until derived from Noether sea state, like-braid population, boundary rows, and action/exchange provenance",
    accepted: false,
    first_missing_object: "retained_noether_sea_pressure_response_row",
    first_missing_field: "theta_sea_rho_NS",
  };
}

function buildSupportEnvelopeRow() {
  return {
    row_id: "sh_0_sea_model:support_envelope_row",
    schema: "sh_0_sea_support_envelope_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    radius_definition: "R(t)=(1/6) sum_a |y_a(t)|",
    radial_velocity_definition: "dot_R(t)=(1/6) sum_a <y_a(t),dot_y_a(t)>/|y_a(t)|",
    radial_acceleration_definition: "ddot_R(t) approximately Delta dot_R / Delta t",
    post_turn_return_condition:
      "ddot_R_toy(t_i)+Pi_R A_sea(t_i)<0 for some t_i>t_star",
    stable_radius_condition:
      "dot_R=0 and ddot_R_toy+Pi_R A_sea=0 and partial_R(ddot_R_toy+Pi_R A_sea)<0",
    diagnostic_inward_response_floor: REQUIRED_INWARD_RESPONSE_FLOOR,
    floor_source:
      "weakest outward post-turn row in the current high-field held-release toy diagnostic",
    accepted: false,
  };
}

function buildActionExchangeRow() {
  return {
    row_id: "sh_0_sea_model:action_exchange_row",
    schema: "sh_0_sea_action_exchange_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    response_work_rate: "dot_A_diag_sea_to_T=sum_a dot_y_a dot A_sea_a",
    diagnostic_action_residual: "R_A_diag=Delta_A_T+Delta_A_sea+Delta_A_boundary",
    physical_mass_claim: false,
    accepted_same_record_action_closure: false,
    accepted: false,
  };
}

function buildReceiverNormalRequirementRow() {
  return {
    row_id: "sh_0_sea_model:receiver_normal_requirement_row",
    schema: "sh_0_sea_receiver_normal_requirement_row.diagnostic.v0",
    authority_class: AUTHORITY_CLASS,
    required_fields: [
      "retained_record_id",
      "source_row_id",
      "receiver_path_identity",
      "source_path_identity",
      "causal_root_identity",
      "causal_root_residual",
      "jacobian",
      "sourceNormalDenominator",
      "receiverNormalFactor",
      "branchWeight",
      "provider_provenance",
      "action_wake_event_support_refs",
    ],
    current_equivalent_optional_fields: [
      "receiverNormalNumerator",
      "unsignedReceiverNormalFactor",
    ],
    required_target_coverage: {
      same_source_self_hit_rows: 6,
      directed_partner_causal_root_replay_rows: 30,
    },
    boundary_coverage:
      "boundary wake/event rows and any additional sea-response causal roots required by A_sea_a",
    rejected_weight_classes: [
      "source-normal-only",
      "jacobian-only",
      "eta^-2 |J|^-1",
    ],
    accepted: false,
  };
}

function buildAcceptedEvidenceBlocker(targetArtifact) {
  const sourceRowId = targetArtifact?.source_row_id ?? TARGET_SOURCE_ROW_ID;
  return {
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    candidate_artifact_id: targetArtifact?.artifact_id ?? TARGET_ARTIFACT_ID,
    candidate_artifact_hash: targetArtifact?.artifact_hash ?? TARGET_ARTIFACT_HASH,
    required_certificate_ref_prefix:
      `accepted:held-release-seed-path-rows:${TARGET_RETAINED_RECORD_ID}:${sourceRowId}:`,
    next_external_authority_package:
      "held_release_seed_path_rows_external_accepted_authority_package.v0",
    later_requirements: [
      "repo_authorization_for_accepted_held_release_seed_path_rows",
      "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v0",
      "same-record receiver-normal root-detail rows",
      "same-record action closure",
      "retained wake history",
      "provider provenance",
      "event/support rows",
      "SH-0-sea sea-response row",
    ],
  };
}

function buildRunMatrixMetadata({ options, targetArtifact }) {
  const runHandle = normalizeStringRef(options.runHandle);
  if (runHandle == null && targetArtifact?.run_matrix_metadata == null) {
    return null;
  }
  return {
    schema: "sh_0_sea_run_matrix_metadata.v0",
    proof_id: "SH-0-sea",
    run_handle: runHandle,
    embedded_central_run_handle: targetArtifact?.run_matrix_metadata?.run_handle ?? null,
    embedded_central_proof_id: "SH-0",
    source_artifact_id: targetArtifact?.artifact_id ?? null,
    source_artifact_hash: targetArtifact?.artifact_hash ?? null,
    source_row_id: targetArtifact?.source_row_id ?? TARGET_SOURCE_ROW_ID,
    target_center_group_velocity:
      targetArtifact?.run_matrix_metadata?.target_center_group_velocity ??
      targetArtifact?.dynamic_replay_requirements?.group_velocity ??
      null,
    surface_speed_fraction: targetArtifact?.run_matrix_metadata?.surface_speed_fraction ?? 0,
    prehistory_mode: targetArtifact?.run_matrix_metadata?.prehistory_mode ?? "stationary-held-release",
    evidence_status: targetArtifact?.evidence_status?.accepted_evidence_status ?? null,
  };
}

export function buildSh0SeaDiagnosticCandidateModel(options = {}) {
  const targetArtifact = buildTargetSourceArtifact(options);
  const provider = readNoetherSeaProvider();
  const rows = [
    buildTargetSourceRow(targetArtifact),
    buildSeaPopulationRow(),
    buildFccNearestNeighborShellRow(),
    buildFrameRow(targetArtifact),
    buildSeaStateRow(provider),
    buildBoundaryRow(),
    buildSeaResponseRow(),
    buildSupportEnvelopeRow(),
    buildActionExchangeRow(),
    buildReceiverNormalRequirementRow(),
  ];
  const core = {
    schema: SCHEMA,
    proof_id: "SH-0-sea",
    ...(buildRunMatrixMetadata({ options, targetArtifact }) == null
      ? {}
      : { run_matrix_metadata: buildRunMatrixMetadata({ options, targetArtifact }) }),
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic/candidate model construction only",
    target_artifact_id: targetArtifact.artifact_id,
    target_artifact_hash: targetArtifact.artifact_hash,
    target_source_row_id: targetArtifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
    row_count: rows.length,
    rows,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_candidate_model_not_accepted_evidence",
      source_artifact_id: targetArtifact.artifact_id,
      source_artifact_hash: targetArtifact.artifact_hash,
      source_row_id: targetArtifact.source_row_id ?? TARGET_SOURCE_ROW_ID,
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    accepted_evidence_blocker: buildAcceptedEvidenceBlocker(targetArtifact),
    authorization: makeAuthorization(),
  };
  return {
    ...core,
    artifact_hash: stableHash(core),
  };
}

export function evaluateSh0SeaDiagnosticCandidateModelEvidence(candidate) {
  if (candidate?.schema !== SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_diagnostic_candidate_model_v0",
      first_missing_field: "sh_0_sea_diagnostic_candidate_model.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_candidate_model_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

export function buildSh0SeaDiagnosticResponseRun(options = {}) {
  const model = buildSh0SeaDiagnosticCandidateModel(options);
  const seedProbe = buildDiagnosticResponseProbe({ model, options });
  const producedSourceRow =
    options.producedResponseSource === true
      ? buildProducedResponseSourceRow({ model, seedProbe, options })
      : null;
  const probe = buildDiagnosticResponseProbe({ model, options, producedSourceRow });
  const candidateResponseRow = buildCandidateResponseRow({ model, probe, options });
  const piRASea = projectDiagnosticSeaResponse(candidateResponseRow);
  const floorEvaluation = buildResponseFloorEvaluation({
    candidateResponseRow,
    piRASea,
    options,
  });
  const acceptedProvenanceReplacementRequirement = buildAcceptedProvenanceReplacementRequirement({
    model,
    producedSourceRow,
    candidateResponseRow,
    options,
  });
  const core = {
    schema: RESPONSE_RUN_SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic response-run floor test only",
    target_artifact_id: model.target_artifact_id,
    target_artifact_hash: model.target_artifact_hash,
    target_source_row_id: model.target_source_row_id,
    run_matrix_metadata: model.run_matrix_metadata ?? null,
    model_artifact_hash: model.artifact_hash,
    response_probe: probe,
    produced_response_source_row: producedSourceRow,
    candidate_response_row: candidateResponseRow,
    accepted_provenance_replacement_requirement: acceptedProvenanceReplacementRequirement,
    response_equation:
      "Pi_R A_sea=-K_NS_diag*Phi_probe-Gamma_NS_diag*dot_Phi_probe+W_boundary_projection",
    floor_evaluation: floorEvaluation,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_response_run_not_accepted_evidence",
      first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
      first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    },
    accepted_evidence_blocker: model.accepted_evidence_blocker,
    authorization: makeAuthorization(),
  };
  return {
    ...core,
    artifact_hash: stableHash(core),
  };
}

export function evaluateSh0SeaDiagnosticResponseRunEvidence(candidate) {
  if (candidate?.schema !== RESPONSE_RUN_SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_diagnostic_response_run_v0",
      first_missing_field: "sh_0_sea_diagnostic_response_run.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_response_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

function parseArgs(args) {
  const stringOption = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
  const numberOption = (name) => {
    const value = stringOption(name);
    return value == null ? undefined : Number(value);
  };
  const vectorOption = (name) => {
    const value = stringOption(name);
    if (value == null) {
      return undefined;
    }
    const vector = value.split(",").map((entry) => Number(entry.trim()));
    if (vector.length !== 3 || vector.some((entry) => !Number.isFinite(entry))) {
      throw new TypeError(`--${name} must be a comma-separated vector with three finite numbers`);
    }
    return vector;
  };
  const jsonOption = (name) => {
    const path = stringOption(name);
    if (path == null) {
      return undefined;
    }
    return JSON.parse(fs.readFileSync(path, "utf8"));
  };
  return {
    pretty: args.includes("--pretty"),
    responseRun: args.includes("--response-run"),
    producedResponseSource: args.includes("--produced-response-source"),
    runHandle: stringOption("run-handle"),
    responseRunHandle: stringOption("response-run-handle"),
    responseRowKind: stringOption("response-row-kind"),
    embeddedCentralRunHandle: stringOption("embedded-central-run-handle"),
    targetSourceRowId: stringOption("source-row-id"),
    targetCenterGroupVelocity: vectorOption("target-center-group-velocity") ?? vectorOption("group-velocity"),
    surfaceSpeedFraction: numberOption("surface-speed-fraction") ?? numberOption("surface-speed"),
    prehistoryMode: stringOption("prehistory-mode"),
    responseAmplitude: numberOption("response-amplitude"),
    responseRate: numberOption("response-rate"),
    responseStiffness: numberOption("response-stiffness"),
    responseDamping: numberOption("response-damping"),
    boundaryWakeProjection: numberOption("boundary-wake-projection"),
    inwardDeadband: numberOption("inward-deadband"),
    producedSourcePhi: numberOption("produced-source-phi"),
    producedSourceMarginStep: numberOption("produced-source-margin-step"),
    seedPathAcceptanceCertificate: jsonOption("acceptance-certificate-json"),
    seedPathExternalAuthorityPackage: jsonOption("external-authority-package-json"),
    seedPathRepoAuthorization: jsonOption("repo-authorization-json"),
    acceptedProvenancePackage: jsonOption("accepted-provenance-package-json"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--response-run] [--produced-response-source] [--run-handle=<handle>] [--embedded-central-run-handle=<handle>] [--target-center-group-velocity=x,y,z] [--surface-speed-fraction=<number>] [--prehistory-mode=stationary-held-release|kick-at-release|moving-prehistory] [--response-row-kind=pressure_tension|boundary_wake] [--response-amplitude=<number>] [--response-rate=<number>] [--response-stiffness=<number>] [--response-damping=<number>] [--boundary-wake-projection=<number>] [--inward-deadband=<number>] [--produced-source-phi=<number>] [--produced-source-margin-step=<number>] [--acceptance-certificate-json=<path>] [--external-authority-package-json=<path>] [--repo-authorization-json=<path>] [--accepted-provenance-package-json=<path>]`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = options.responseRun
    ? buildSh0SeaDiagnosticResponseRun(options)
    : buildSh0SeaDiagnosticCandidateModel(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}

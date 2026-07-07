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
export const DIPOLE_WAKE_SUM_RUN_SCHEMA = "sh_0_sea_dipole_wake_sum_run.v0";
export const DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA = "sh_0_sea_dipole_wake_sum_source_row.diagnostic.v0";
export const DIPOLE_WAKE_SUM_SPACING_ROW_SCHEMA = "sh_0_sea_dipole_wake_sum_spacing_row.diagnostic.v0";
export const DIPOLE_WAKE_SUM_RETENTION_WINDOW_SCHEMA =
  "sh_0_sea_dipole_wake_sum_retention_window.diagnostic.v0";
export const DIPOLE_WAKE_SUM_MOTION_RUN_SCHEMA = "sh_0_sea_dipole_wake_sum_motion_run.v0";
export const CANDIDATE_SAME_RECORD_REQUEST_SCHEMA = "sh_0_sea_candidate_same_record_request.v0";
export const WAKE_SUM_RESPONSE_KIND = "dipole_wake_sum";
export const NEIGHBOR_MOTION_KINDS = Object.freeze(["breathing", "orbiting"]);
export const DEFAULT_MOTION_DELTA = 0.2;
export const DEFAULT_BREATHING_OMEGA_GRID = Object.freeze([1, 2, 4]);
export const DEFAULT_ORBITING_OMEGA_GRID = Object.freeze([0.25, 0.5, 0.75]);
export const DEFAULT_PHASE_SAMPLE_COUNT = 16;
export const DEFAULT_MOTION_SPIN_AXIS = Object.freeze([0, 0, 1]);
export const MOTION_JACOBIAN_FLOOR = 0.05;
export const ACCEPTED_PROVENANCE_REPLACEMENT_REQUIREMENT_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_replacement_requirement.v0";
export const ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_package.v0";
export const ACCEPTED_PROVENANCE_REPLACEMENT_PACKAGE_VERIFICATION_SCHEMA =
  "sh_0_sea_same_target_accepted_provenance_package_verification.v0";
export const REPO_AUTHORIZATION_FOR_ACCEPTED_HELD_RELEASE_SEED_PATH_ROWS_REF_PREFIX =
  "repo-authorization:accepted-held-release-seed-path-rows:";
export const DEFAULT_RESPONSE_DEADBAND = 1e-9;
export const DEFAULT_A_FCC_MIN = 3;
export const DEFAULT_A_FCC_MAX = 12;
export const DEFAULT_A_FCC_STEP = 0.25;
export const DEFAULT_HELD_HISTORY_WINDOW = 24;
export const MIN_NON_OVERLAP_A_FCC = 2 * Math.SQRT2;
export const MASTER_EQUATION_KERNEL = Object.freeze({
  kernel_source:
    "held-release-causal-wake-toy master-equation kernel defaults; same normalization as the escape-floor row",
  kernel_form:
    "a_recv=coupling*q_recv*q_src*(x_recv-x_src(t-delay))/((|x_recv-x_src(t-delay)|^2+softening^2)^(3/2))*branchWeight",
  coupling: 1,
  softening: 0.05,
  fieldSpeed: 1,
  branch_weight_held_static_sources: 1,
  branch_weight_note:
    "held static sources give sourceJacobian=1; release-time static receivers give receiverNormalFactor=1",
});
export const FCC_BRAID_UNIT_SITES = Object.freeze([
  Object.freeze({
    site: "+x",
    polarity: "P",
    signed_polarity_unit: "\\epsilon_{+,\\bullet}",
    q: 1,
    position: Object.freeze([1, 0, 0]),
  }),
  Object.freeze({
    site: "+y",
    polarity: "P",
    signed_polarity_unit: "\\epsilon_{+,\\bullet}",
    q: 1,
    position: Object.freeze([0, 1, 0]),
  }),
  Object.freeze({
    site: "+z",
    polarity: "P",
    signed_polarity_unit: "\\epsilon_{+,\\bullet}",
    q: 1,
    position: Object.freeze([0, 0, 1]),
  }),
  Object.freeze({
    site: "-x",
    polarity: "E",
    signed_polarity_unit: "\\epsilon_{-,\\bullet}",
    q: -1,
    position: Object.freeze([-1, 0, 0]),
  }),
  Object.freeze({
    site: "-y",
    polarity: "E",
    signed_polarity_unit: "\\epsilon_{-,\\bullet}",
    q: -1,
    position: Object.freeze([0, -1, 0]),
  }),
  Object.freeze({
    site: "-z",
    polarity: "E",
    signed_polarity_unit: "\\epsilon_{-,\\bullet}",
    q: -1,
    position: Object.freeze([0, 0, -1]),
  }),
]);
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

function subtract3(left, right) {
  return [left[0] - right[0], left[1] - right[1], left[2] - right[2]];
}

function dot3(left, right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function norm3(vector) {
  return Math.sqrt(dot3(vector, vector));
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

function computeBraidSignedPolarityDipole() {
  const components = FCC_BRAID_UNIT_SITES.reduce(
    (sum, site) => [
      sum[0] + site.q * site.position[0],
      sum[1] + site.q * site.position[1],
      sum[2] + site.q * site.position[2],
    ],
    [0, 0, 0]
  );
  return {
    definition: "p=sum_b q_b u_b per held neighbor braid, in signed polarity units",
    components: components.map(cleanNumber),
    norm: cleanNumber(norm3(components)),
    orientation: "aligned_with_central_braid_declared",
  };
}

function buildNeighborBraidHeldSources(aFcc) {
  const sources = [];
  FCC_NEAREST_NEIGHBOR_DIRECTIONS.forEach((direction, neighborIndex) => {
    const center = [
      (direction[0] * aFcc) / 2,
      (direction[1] * aFcc) / 2,
      (direction[2] * aFcc) / 2,
    ];
    for (const site of FCC_BRAID_UNIT_SITES) {
      sources.push({
        neighborIndex,
        q: site.q,
        position: [
          center[0] + site.position[0],
          center[1] + site.position[1],
          center[2] + site.position[2],
        ],
      });
    }
  });
  return sources;
}

function computeDipoleWakeSumAtSpacing({ aFcc, heldHistoryWindow }) {
  const { coupling, softening, fieldSpeed } = MASTER_EQUATION_KERNEL;
  const sources = buildNeighborBraidHeldSources(aFcc);
  let radialProjectionSum = 0;
  let minDelay = Infinity;
  let maxDelay = 0;
  let minSourceDistance = Infinity;
  let coveredRootCount = 0;
  let missingRootCount = 0;
  for (const receiver of FCC_BRAID_UNIT_SITES) {
    const acceleration = [0, 0, 0];
    for (const source of sources) {
      const displacement = subtract3(receiver.position, source.position);
      const distance = norm3(displacement);
      const delay = distance / fieldSpeed;
      minDelay = Math.min(minDelay, delay);
      maxDelay = Math.max(maxDelay, delay);
      minSourceDistance = Math.min(minSourceDistance, distance);
      if (delay > heldHistoryWindow) {
        missingRootCount += 1;
        continue;
      }
      coveredRootCount += 1;
      const branchWeight = MASTER_EQUATION_KERNEL.branch_weight_held_static_sources;
      const coefficient =
        (coupling * receiver.q * source.q * branchWeight) /
        Math.pow(distance * distance + softening * softening, 1.5);
      acceleration[0] += coefficient * displacement[0];
      acceleration[1] += coefficient * displacement[1];
      acceleration[2] += coefficient * displacement[2];
    }
    radialProjectionSum += dot3(receiver.position, acceleration);
  }
  return {
    piRASea: cleanNumber(radialProjectionSum / FCC_BRAID_UNIT_SITES.length),
    minDelay: cleanNumber(minDelay),
    maxDelay: cleanNumber(maxDelay),
    minSourceDistance: cleanNumber(minSourceDistance),
    coveredRootCount,
    missingRootCount,
    expectedDirectedRootCount:
      FCC_BRAID_UNIT_SITES.length * FCC_SEA_POPULATION_SIZE * FCC_BRAID_UNIT_SITES.length,
  };
}

function buildDipoleWakeSumSpacingRow({ aFcc, heldHistoryWindow, deadband }) {
  const sum = computeDipoleWakeSumAtSpacing({ aFcc, heldHistoryWindow });
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const weakestToyAcceleration = cleanNumber(-REQUIRED_INWARD_RESPONSE_FLOOR);
  const totalPostTurnAcceleration = cleanNumber(weakestToyAcceleration + sum.piRASea);
  const rootCoveragePass = sum.missingRootCount === 0;
  const shellOverlap = aFcc < MIN_NON_OVERLAP_A_FCC;
  return {
    schema: DIPOLE_WAKE_SUM_SPACING_ROW_SCHEMA,
    a_fcc: cleanNumber(aFcc),
    nearest_neighbor_center_distance: cleanNumber(aFcc / Math.SQRT2),
    min_source_distance: sum.minSourceDistance,
    min_delay: sum.minDelay,
    max_delay: sum.maxDelay,
    root_coverage: {
      declared_held_history_window: cleanNumber(heldHistoryWindow),
      expected_directed_root_count: sum.expectedDirectedRootCount,
      covered_root_count: sum.coveredRootCount,
      missing_root_count: sum.missingRootCount,
      pass: rootCoveragePass,
    },
    field_speed: {
      field_speed: MASTER_EQUATION_KERNEL.fieldSpeed,
      max_held_source_speed: 0,
      max_release_receiver_speed: 0,
      pass: true,
    },
    geometry_validity: {
      min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
      shell_overlap: shellOverlap,
      pass: !shellOverlap,
    },
    Pi_R_A_sea: sum.piRASea,
    floor_evaluation: {
      weakest_outward_post_turn_ddot_R_toy: weakestToyAcceleration,
      inward_deadband: deadband,
      required_projected_response_floor: requiredProjection,
      total_post_turn_radial_acceleration: totalPostTurnAcceleration,
      crosses_inward_response_floor: sum.piRASea < requiredProjection,
      post_turn_return_condition_passed: totalPostTurnAcceleration < -deadband,
    },
    free_amplitude_parameter_count: 0,
    evidence_status: "diagnostic_wake_sum_row_not_retained_evidence",
  };
}

function refineFloorCrossingSpacing({ lowSpacing, highSpacing, requiredProjection, piRAtSpacing }) {
  let low = lowSpacing;
  let high = highSpacing;
  for (let iteration = 0; iteration < 40; iteration += 1) {
    const mid = 0.5 * (low + high);
    if (piRAtSpacing(mid) < requiredProjection) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return cleanNumber(0.5 * (low + high));
}

function buildRetentionWindow({
  spacingRows,
  deadband,
  spacingRange,
  piRAtSpacing,
  crossingFlag = (row) => row.floor_evaluation.crosses_inward_response_floor,
  namedCandidateEnabled = true,
}) {
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const eligible = (row) =>
    row.root_coverage.pass && row.field_speed.pass && row.geometry_validity.pass;
  const eligibleCrossingRows = spacingRows.filter((row) => eligible(row) && crossingFlag(row));
  const exists = eligibleCrossingRows.length > 0;
  let windowMin = null;
  let windowMinBoundary = null;
  let windowMax = null;
  let windowMaxBoundary = null;
  if (exists) {
    const firstCrossing = eligibleCrossingRows[0];
    windowMin = firstCrossing.a_fcc;
    windowMinBoundary =
      firstCrossing.a_fcc <= spacingRange.a_fcc_min
        ? firstCrossing.a_fcc <= cleanNumber(MIN_NON_OVERLAP_A_FCC)
          ? "bounded_by_shell_overlap_constraint"
          : "bounded_by_declared_range_min"
        : "first_eligible_crossing_row";
    const lastCrossing = eligibleCrossingRows[eligibleCrossingRows.length - 1];
    const lastCrossingIndex = spacingRows.findIndex((row) => row.a_fcc === lastCrossing.a_fcc);
    const nextRow = spacingRows[lastCrossingIndex + 1] ?? null;
    if (nextRow == null) {
      windowMax = lastCrossing.a_fcc;
      windowMaxBoundary = "truncated_by_declared_range_max";
    } else if (!nextRow.root_coverage.pass) {
      windowMax = lastCrossing.a_fcc;
      windowMaxBoundary = "truncated_by_root_coverage";
    } else if (!nextRow.geometry_validity.pass || !nextRow.field_speed.pass) {
      windowMax = lastCrossing.a_fcc;
      windowMaxBoundary = "truncated_by_row_eligibility";
    } else {
      windowMax = refineFloorCrossingSpacing({
        lowSpacing: lastCrossing.a_fcc,
        highSpacing: nextRow.a_fcc,
        requiredProjection,
        piRAtSpacing,
      });
      windowMaxBoundary = "computed_floor_crossing";
    }
  }
  let namedCandidate = null;
  if (exists && namedCandidateEnabled) {
    const midpoint = 0.5 * (windowMin + windowMax);
    const candidateRow = eligibleCrossingRows.reduce((best, row) =>
      Math.abs(row.a_fcc - midpoint) < Math.abs(best.a_fcc - midpoint) ? row : best
    );
    namedCandidate = {
      candidate_id: `sh0sea-aa-fcc-dipole-wake-sum:a-fcc-${candidateRow.a_fcc}`,
      a_fcc: candidateRow.a_fcc,
      Pi_R_A_sea: candidateRow.Pi_R_A_sea,
      inward_margin_below_required_floor: cleanNumber(
        requiredProjection - candidateRow.Pi_R_A_sea
      ),
      selection_rule: "eligible crossing row nearest the retention-window midpoint",
      claim_level: "named diagnostic sea-spacing candidate only, not retained evidence",
    };
  }
  return {
    schema: DIPOLE_WAKE_SUM_RETENTION_WINDOW_SCHEMA,
    retention_window_exists: exists,
    required_projected_response_floor: requiredProjection,
    inward_deadband: deadband,
    a_fcc_window_min: windowMin,
    a_fcc_window_min_boundary: windowMinBoundary,
    a_fcc_window_max: windowMax,
    a_fcc_window_max_boundary: windowMaxBoundary,
    eligible_crossing_row_count: eligibleCrossingRows.length,
    named_sea_spacing_candidate: namedCandidate,
    evidence_status: "diagnostic_retention_window_not_retained_evidence",
  };
}

function buildDipoleWakeSumSourceRow({ model, heldHistoryWindow, deadband, motionDeclaration = null }) {
  const responseKind = WAKE_SUM_RESPONSE_KIND;
  const targetBinding = buildTargetBinding(model);
  const localRowRefs = buildLocalRowRefs(model);
  const geometryCarrier = buildGeometryCarrier(model);
  const rowKey = {
    schema: DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA,
    responseKind,
    targetBinding,
    localRowRefs,
    geometryCarrier,
    heldHistoryWindow,
    kernel: MASTER_EQUATION_KERNEL,
    motionDeclaration,
  };
  const rowHash = stableHash(rowKey);
  const rowId = `sh_0_sea_dipole_wake_sum_source:${rowHash.slice(0, 16)}`;
  return {
    schema: DIPOLE_WAKE_SUM_SOURCE_ROW_SCHEMA,
    row_id: rowId,
    authority_class: AUTHORITY_CLASS,
    response_kind: responseKind,
    claim_level: "computed diagnostic same-target wake-sum source only",
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    held_history_declaration: {
      neighbor_population: FCC_SEA_POPULATION_SIZE,
      braid_sites_per_neighbor: FCC_BRAID_UNIT_SITES.length,
      orientation: "aligned_with_central_braid_declared",
      held_static_over:
        motionDeclaration == null ? `[-${cleanNumber(heldHistoryWindow)},0]` : null,
      held_motion_over:
        motionDeclaration == null ? null : `[-${cleanNumber(heldHistoryWindow)},0]`,
      undeclared_environment_degrees_of_freedom: 0,
    },
    neighbor_motion_declaration: motionDeclaration,
    braid_signed_polarity_dipole: computeBraidSignedPolarityDipole(),
    free_amplitude_parameter_count: 0,
    fitted_response_amplitude_present: false,
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
      producer_rule:
        "computed master-equation-kernel delayed sum over declared held histories; zero free amplitude",
    },
    action_provenance: {
      action_exchange_row_ref: localRowRefs.action_exchange_row_ref,
      geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
      response_work_rate_ref: rowBySuffix(model, "action_exchange_row")?.response_work_rate ?? null,
      diagnostic_action_residual_ref: rowBySuffix(model, "action_exchange_row")?.diagnostic_action_residual ?? null,
      accepted_same_record_action_closure: false,
    },
    accepted: false,
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    retained_evidence_authorized: false,
  };
}

function buildAcceptedProvenanceReplacementRequirement({
  model,
  sourceRow,
  options = {},
}) {
  if (sourceRow == null) {
    return null;
  }
  const producedSourceRow = sourceRow;
  const seedPathRequirement = buildSeedPathAcceptanceCertificateRequirement(model, options);
  const responseKind = producedSourceRow.response_kind ?? WAKE_SUM_RESPONSE_KIND;
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
    equation_computed_wake_sum:
      "A_sea_a=sum_{k=1..12} sum_b kernel(y_a, X_k+u_b; declared held history), master-equation kernel, zero free amplitude",
    radial_projection: "Pi_R A_sea=(1/6) sum_a yhat_a dot A_sea_a",
    coefficient_status:
      "the dipole wake-sum run computes A_sea from the master-equation kernel over the 12 held FCC neighbor braids with zero free amplitude; K_NS and Gamma_NS remain placeholder notation for the general split until derived from Noether sea state, like-braid population, boundary rows, and action/exchange provenance",
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

function rotateAboutAxisUnit(vector, axisUnit, angle) {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const axialComponent = dot3(axisUnit, vector);
  const crossTerm = [
    axisUnit[1] * vector[2] - axisUnit[2] * vector[1],
    axisUnit[2] * vector[0] - axisUnit[0] * vector[2],
    axisUnit[0] * vector[1] - axisUnit[1] * vector[0],
  ];
  return [
    vector[0] * cosAngle + crossTerm[0] * sinAngle + axisUnit[0] * axialComponent * (1 - cosAngle),
    vector[1] * cosAngle + crossTerm[1] * sinAngle + axisUnit[1] * axialComponent * (1 - cosAngle),
    vector[2] * cosAngle + crossTerm[2] * sinAngle + axisUnit[2] * axialComponent * (1 - cosAngle),
  ];
}

function neighborMotionSourceKinematics({ kind, center, sitePosition, time, delta, omega, phase, axisUnit }) {
  if (kind === "breathing") {
    const angle = omega * time + phase;
    const factor = 1 + delta * Math.cos(angle);
    const rate = -delta * omega * Math.sin(angle);
    return {
      position: [
        center[0] + factor * sitePosition[0],
        center[1] + factor * sitePosition[1],
        center[2] + factor * sitePosition[2],
      ],
      velocity: [rate * sitePosition[0], rate * sitePosition[1], rate * sitePosition[2]],
    };
  }
  const rotated = rotateAboutAxisUnit(sitePosition, axisUnit, omega * time + phase);
  return {
    position: [center[0] + rotated[0], center[1] + rotated[1], center[2] + rotated[2]],
    velocity: [
      omega * (axisUnit[1] * rotated[2] - axisUnit[2] * rotated[1]),
      omega * (axisUnit[2] * rotated[0] - axisUnit[0] * rotated[2]),
      omega * (axisUnit[0] * rotated[1] - axisUnit[1] * rotated[0]),
    ],
  };
}

function maxNeighborMotionSourceSpeedBound({ kind, delta, omega, axisUnit }) {
  if (kind === "breathing") {
    return cleanNumber(Math.abs(delta * omega));
  }
  const maxPerpendicularRadius = Math.max(
    ...FCC_BRAID_UNIT_SITES.map((site) =>
      norm3([
        axisUnit[1] * site.position[2] - axisUnit[2] * site.position[1],
        axisUnit[2] * site.position[0] - axisUnit[0] * site.position[2],
        axisUnit[0] * site.position[1] - axisUnit[1] * site.position[0],
      ])
    )
  );
  return cleanNumber(Math.abs(omega) * maxPerpendicularRadius);
}

function signPreservingMax(value, floor) {
  return Math.abs(value) < floor ? (value < 0 ? -floor : floor) : value;
}

function computeMovingWakeSumAtSpacing({ aFcc, heldHistoryWindow, motion }) {
  const { coupling, softening, fieldSpeed } = MASTER_EQUATION_KERNEL;
  let radialProjectionSum = 0;
  let minDelay = Infinity;
  let maxDelay = 0;
  let minSourceDistance = Infinity;
  let maxSourceSpeedAtRoots = 0;
  let maxBranchWeight = 0;
  let coveredRootCount = 0;
  let missingRootCount = 0;
  for (const receiver of FCC_BRAID_UNIT_SITES) {
    const acceleration = [0, 0, 0];
    for (const direction of FCC_NEAREST_NEIGHBOR_DIRECTIONS) {
      const center = [
        (direction[0] * aFcc) / 2,
        (direction[1] * aFcc) / 2,
        (direction[2] * aFcc) / 2,
      ];
      for (const site of FCC_BRAID_UNIT_SITES) {
        const residual = (time) =>
          norm3(
            subtract3(
              receiver.position,
              neighborMotionSourceKinematics({
                ...motion,
                center,
                sitePosition: site.position,
                time,
              }).position
            )
          ) +
          fieldSpeed * time;
        let low = -heldHistoryWindow;
        let high = 0;
        if (residual(low) > 0) {
          missingRootCount += 1;
          continue;
        }
        for (let iteration = 0; iteration < 60; iteration += 1) {
          const mid = 0.5 * (low + high);
          if (residual(mid) < 0) {
            low = mid;
          } else {
            high = mid;
          }
        }
        const emissionTime = 0.5 * (low + high);
        const kinematics = neighborMotionSourceKinematics({
          ...motion,
          center,
          sitePosition: site.position,
          time: emissionTime,
        });
        const displacement = subtract3(receiver.position, kinematics.position);
        const distance = norm3(displacement);
        const delay = -emissionTime;
        minDelay = Math.min(minDelay, delay);
        maxDelay = Math.max(maxDelay, delay);
        minSourceDistance = Math.min(minSourceDistance, distance);
        const directionUnit = [
          displacement[0] / distance,
          displacement[1] / distance,
          displacement[2] / distance,
        ];
        const sourceSpeed = norm3(kinematics.velocity);
        maxSourceSpeedAtRoots = Math.max(maxSourceSpeedAtRoots, sourceSpeed);
        const sourceJacobian = (fieldSpeed - dot3(kinematics.velocity, directionUnit)) / fieldSpeed;
        const receiverNormalFactor = 1;
        const branchWeight = Math.abs(
          receiverNormalFactor / signPreservingMax(sourceJacobian, MOTION_JACOBIAN_FLOOR)
        );
        maxBranchWeight = Math.max(maxBranchWeight, branchWeight);
        coveredRootCount += 1;
        const coefficient =
          (coupling * receiver.q * site.q * branchWeight) /
          Math.pow(distance * distance + softening * softening, 1.5);
        acceleration[0] += coefficient * displacement[0];
        acceleration[1] += coefficient * displacement[1];
        acceleration[2] += coefficient * displacement[2];
      }
    }
    radialProjectionSum += dot3(receiver.position, acceleration);
  }
  return {
    piRASea: cleanNumber(radialProjectionSum / FCC_BRAID_UNIT_SITES.length),
    minDelay: cleanNumber(minDelay),
    maxDelay: cleanNumber(maxDelay),
    minSourceDistance: cleanNumber(minSourceDistance),
    maxSourceSpeedAtRoots: cleanNumber(maxSourceSpeedAtRoots),
    maxBranchWeight: cleanNumber(maxBranchWeight),
    coveredRootCount,
    missingRootCount,
    expectedDirectedRootCount:
      FCC_BRAID_UNIT_SITES.length * FCC_SEA_POPULATION_SIZE * FCC_BRAID_UNIT_SITES.length,
  };
}

function computeMotionPhaseEnvelopeAtSpacing({ aFcc, heldHistoryWindow, motionBase, phaseSampleCount }) {
  let piRMin = Infinity;
  let piRMax = -Infinity;
  let piRSum = 0;
  let phaseOfMin = 0;
  let phaseOfMax = 0;
  let missingRootCount = 0;
  let maxDelay = 0;
  let minDelay = Infinity;
  let minSourceDistance = Infinity;
  let maxSourceSpeedAtRoots = 0;
  let maxBranchWeight = 0;
  let coveredRootCount = 0;
  let expectedDirectedRootCount = 0;
  for (let index = 0; index < phaseSampleCount; index += 1) {
    const phase = (2 * Math.PI * index) / phaseSampleCount;
    const sum = computeMovingWakeSumAtSpacing({
      aFcc,
      heldHistoryWindow,
      motion: { ...motionBase, phase },
    });
    if (sum.piRASea < piRMin) {
      piRMin = sum.piRASea;
      phaseOfMin = phase;
    }
    if (sum.piRASea > piRMax) {
      piRMax = sum.piRASea;
      phaseOfMax = phase;
    }
    piRSum += sum.piRASea;
    missingRootCount += sum.missingRootCount;
    coveredRootCount += sum.coveredRootCount;
    expectedDirectedRootCount += sum.expectedDirectedRootCount;
    maxDelay = Math.max(maxDelay, sum.maxDelay);
    minDelay = Math.min(minDelay, sum.minDelay);
    minSourceDistance = Math.min(minSourceDistance, sum.minSourceDistance);
    maxSourceSpeedAtRoots = Math.max(maxSourceSpeedAtRoots, sum.maxSourceSpeedAtRoots);
    maxBranchWeight = Math.max(maxBranchWeight, sum.maxBranchWeight);
  }
  return {
    piRMin: cleanNumber(piRMin),
    piRMax: cleanNumber(piRMax),
    piRMean: cleanNumber(piRSum / phaseSampleCount),
    spread: cleanNumber(piRMax - piRMin),
    phaseOfMin: cleanNumber(phaseOfMin),
    phaseOfMax: cleanNumber(phaseOfMax),
    missingRootCount,
    coveredRootCount,
    expectedDirectedRootCount,
    minDelay: cleanNumber(minDelay),
    maxDelay: cleanNumber(maxDelay),
    minSourceDistance: cleanNumber(minSourceDistance),
    maxSourceSpeedAtRoots: cleanNumber(maxSourceSpeedAtRoots),
    maxBranchWeight: cleanNumber(maxBranchWeight),
  };
}

function buildMotionSpacingRow({ aFcc, heldHistoryWindow, deadband, motionBase, phaseSampleCount, sourceSpeedBound }) {
  const envelope = computeMotionPhaseEnvelopeAtSpacing({
    aFcc,
    heldHistoryWindow,
    motionBase,
    phaseSampleCount,
  });
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const weakestToyAcceleration = cleanNumber(-REQUIRED_INWARD_RESPONSE_FLOOR);
  const rootCoveragePass = envelope.missingRootCount === 0;
  const shellOverlap = aFcc < MIN_NON_OVERLAP_A_FCC;
  const fieldSpeedPass = sourceSpeedBound < MASTER_EQUATION_KERNEL.fieldSpeed;
  return {
    schema: DIPOLE_WAKE_SUM_SPACING_ROW_SCHEMA,
    a_fcc: cleanNumber(aFcc),
    nearest_neighbor_center_distance: cleanNumber(aFcc / Math.SQRT2),
    min_source_distance: envelope.minSourceDistance,
    min_delay: envelope.minDelay,
    max_delay: envelope.maxDelay,
    root_coverage: {
      declared_held_history_window: cleanNumber(heldHistoryWindow),
      expected_directed_root_count: envelope.expectedDirectedRootCount,
      covered_root_count: envelope.coveredRootCount,
      missing_root_count: envelope.missingRootCount,
      pass: rootCoveragePass,
    },
    field_speed: {
      field_speed: MASTER_EQUATION_KERNEL.fieldSpeed,
      max_held_source_speed: sourceSpeedBound,
      max_source_speed_at_roots: envelope.maxSourceSpeedAtRoots,
      max_branch_weight_at_roots: envelope.maxBranchWeight,
      max_release_receiver_speed: 0,
      pass: fieldSpeedPass,
    },
    geometry_validity: {
      min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
      shell_overlap: shellOverlap,
      pass: !shellOverlap,
    },
    Pi_R_A_sea: envelope.piRMean,
    phase_envelope: {
      phase_sample_count: phaseSampleCount,
      Pi_R_min: envelope.piRMin,
      Pi_R_max: envelope.piRMax,
      Pi_R_mean: envelope.piRMean,
      spread: envelope.spread,
      phase_of_min: envelope.phaseOfMin,
      phase_of_max: envelope.phaseOfMax,
    },
    floor_evaluation: {
      weakest_outward_post_turn_ddot_R_toy: weakestToyAcceleration,
      inward_deadband: deadband,
      required_projected_response_floor: requiredProjection,
      crosses_inward_response_floor_all_phases: envelope.piRMax < requiredProjection,
      crosses_inward_response_floor_some_phase: envelope.piRMin < requiredProjection,
      crosses_inward_response_floor: envelope.piRMax < requiredProjection,
      post_turn_return_condition_passed_all_phases:
        cleanNumber(weakestToyAcceleration + envelope.piRMax) < -deadband,
    },
    free_amplitude_parameter_count: 0,
    evidence_status: "diagnostic_wake_sum_row_not_retained_evidence",
  };
}

function buildCandidateSameRecordRequest({ model, namedCandidate, historyDeclaration, motionDeclaration }) {
  if (namedCandidate == null) {
    return null;
  }
  const targetBinding = buildTargetBinding(model);
  const geometryCarrier = buildGeometryCarrier(model);
  return {
    schema: CANDIDATE_SAME_RECORD_REQUEST_SCHEMA,
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic same-record consumption request only, not accepted evidence",
    candidate: {
      candidate_id: namedCandidate.candidate_id,
      a_fcc: namedCandidate.a_fcc,
      nearest_neighbor_center_distance: cleanNumber(namedCandidate.a_fcc / Math.SQRT2),
      Pi_R_A_sea: namedCandidate.Pi_R_A_sea,
      inward_margin_below_required_floor: namedCandidate.inward_margin_below_required_floor,
    },
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    held_history_declaration: historyDeclaration,
    neighbor_motion_declaration: motionDeclaration,
    target_binding: targetBinding,
    geometry_carrier_row_ref: geometryCarrier.geometry_carrier_row_ref,
    required_same_record_objects: [
      "held_release_seed_path_rows_acceptance_certificate.v0",
      "held_release_seed_path_rows_external_accepted_authority_package.v0",
      "repo_authorization_for_accepted_held_release_seed_path_rows",
      "central_solver_retained_source_adapter_same_record_accepted_evidence_package.v0",
      "same-record receiver-normal root-detail rows (branchWeight, sourceNormalDenominator, receiverNormalFactor)",
      "same-record action closure",
      "accepted SH-0-sea sea-response row at the candidate spacing",
    ],
    downstream_consumers: [
      "self_hit_held_release_solver_row",
      "native_retained_history_promotion",
      "SH-0-sea same-record rows in the shell-braid run matrix",
    ],
    accepted: false,
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
    retained_evidence_authorized: false,
    authorization: makeAuthorization(),
  };
}

export function buildSh0SeaDipoleWakeSumRun(options = {}) {
  const model = buildSh0SeaDiagnosticCandidateModel(options);
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const heldHistoryWindow = Math.max(
    0,
    normalizeNumber(options.heldHistoryWindow, DEFAULT_HELD_HISTORY_WINDOW)
  );
  const aFccMin = normalizeNumber(options.aFccMin, DEFAULT_A_FCC_MIN);
  const aFccMax = Math.max(aFccMin, normalizeNumber(options.aFccMax, DEFAULT_A_FCC_MAX));
  const aFccStep = Math.max(
    Number.EPSILON,
    normalizeNumber(options.aFccStep, DEFAULT_A_FCC_STEP)
  );
  const spacingCount = Math.max(1, Math.round((aFccMax - aFccMin) / aFccStep) + 1);
  const spacingRange = {
    a_fcc_min: cleanNumber(aFccMin),
    a_fcc_max: cleanNumber(aFccMax),
    a_fcc_step: cleanNumber(aFccStep),
    spacing_row_count: spacingCount,
    min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
  };
  const spacingRows = [];
  for (let index = 0; index < spacingCount; index += 1) {
    const aFcc = cleanNumber(Math.min(aFccMax, aFccMin + index * aFccStep));
    spacingRows.push(buildDipoleWakeSumSpacingRow({ aFcc, heldHistoryWindow, deadband }));
  }
  const retentionWindow = buildRetentionWindow({
    spacingRows,
    deadband,
    spacingRange,
    piRAtSpacing: (aFcc) => computeDipoleWakeSumAtSpacing({ aFcc, heldHistoryWindow }).piRASea,
  });
  const wakeSumSourceRow = buildDipoleWakeSumSourceRow({ model, heldHistoryWindow, deadband });
  const candidateSameRecordRequest = buildCandidateSameRecordRequest({
    model,
    namedCandidate: retentionWindow.named_sea_spacing_candidate,
    historyDeclaration: wakeSumSourceRow.held_history_declaration,
    motionDeclaration: null,
  });
  const acceptedProvenanceReplacementRequirement = buildAcceptedProvenanceReplacementRequirement({
    model,
    sourceRow: wakeSumSourceRow,
    options,
  });
  const core = {
    schema: DIPOLE_WAKE_SUM_RUN_SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic computed wake-sum floor comparison only",
    target_artifact_id: model.target_artifact_id,
    target_artifact_hash: model.target_artifact_hash,
    target_source_row_id: model.target_source_row_id,
    run_matrix_metadata: model.run_matrix_metadata ?? null,
    model_artifact_hash: model.artifact_hash,
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    declared_spacing_range: spacingRange,
    declared_held_history_window: cleanNumber(heldHistoryWindow),
    response_equation:
      "Pi_R A_sea=(1/6) sum_a yhat_a dot sum_{k=1..12} sum_b kernel(y_a, X_k+u_b; declared held history)",
    free_amplitude_parameter_count: 0,
    fitted_response_amplitude_present: false,
    wake_sum_source_row: wakeSumSourceRow,
    spacing_rows: spacingRows,
    retention_window: retentionWindow,
    candidate_same_record_request: candidateSameRecordRequest,
    accepted_provenance_replacement_requirement: acceptedProvenanceReplacementRequirement,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_wake_sum_run_not_accepted_evidence",
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

export function evaluateSh0SeaDipoleWakeSumRunEvidence(candidate) {
  if (candidate?.schema !== DIPOLE_WAKE_SUM_RUN_SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_dipole_wake_sum_run_v0",
      first_missing_field: "sh_0_sea_dipole_wake_sum_run.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_wake_sum_run_not_accepted_retained_evidence",
    first_missing_object: ACCEPTED_EVIDENCE_BLOCKER_OBJECT,
    first_missing_field: ACCEPTED_EVIDENCE_BLOCKER_FIELD,
  };
}

export function buildSh0SeaDipoleWakeSumMotionRun(options = {}) {
  const model = buildSh0SeaDiagnosticCandidateModel(options);
  const deadband = Math.max(0, normalizeNumber(options.inwardDeadband, DEFAULT_RESPONSE_DEADBAND));
  const heldHistoryWindow = Math.max(
    0,
    normalizeNumber(options.heldHistoryWindow, DEFAULT_HELD_HISTORY_WINDOW)
  );
  const aFccMin = normalizeNumber(options.aFccMin, DEFAULT_A_FCC_MIN);
  const aFccMax = Math.max(aFccMin, normalizeNumber(options.aFccMax, DEFAULT_A_FCC_MAX));
  const aFccStep = Math.max(Number.EPSILON, normalizeNumber(options.aFccStep, DEFAULT_A_FCC_STEP));
  const spacingCount = Math.max(1, Math.round((aFccMax - aFccMin) / aFccStep) + 1);
  const spacingRange = {
    a_fcc_min: cleanNumber(aFccMin),
    a_fcc_max: cleanNumber(aFccMax),
    a_fcc_step: cleanNumber(aFccStep),
    spacing_row_count: spacingCount,
    min_non_overlap_a_fcc: cleanNumber(MIN_NON_OVERLAP_A_FCC),
  };
  const kind = NEIGHBOR_MOTION_KINDS.includes(options.neighborMotion)
    ? options.neighborMotion
    : "breathing";
  const delta =
    kind === "breathing" ? normalizeNumber(options.motionDelta, DEFAULT_MOTION_DELTA) : 0;
  const axisInput = normalizeVector(options.motionSpinAxis, [...DEFAULT_MOTION_SPIN_AXIS]);
  const axisNorm = norm3(axisInput);
  const axisUnit =
    axisNorm > 0 ? axisInput.map((entry) => entry / axisNorm) : [...DEFAULT_MOTION_SPIN_AXIS];
  const omegaGrid =
    Array.isArray(options.motionOmegaGrid) && options.motionOmegaGrid.length > 0
      ? options.motionOmegaGrid.map((entry) => Math.abs(normalizeNumber(entry, 1)))
      : [...(kind === "breathing" ? DEFAULT_BREATHING_OMEGA_GRID : DEFAULT_ORBITING_OMEGA_GRID)];
  const phaseSampleCount = Math.max(
    2,
    Math.round(normalizeNumber(options.motionPhaseSamples, DEFAULT_PHASE_SAMPLE_COUNT))
  );
  const candidateAFcc = 4.25;
  const requiredProjection = cleanNumber(REQUIRED_INWARD_RESPONSE_FLOOR - deadband);
  const spacings = [];
  for (let index = 0; index < spacingCount; index += 1) {
    spacings.push(cleanNumber(Math.min(aFccMax, aFccMin + index * aFccStep)));
  }
  const staticReferenceRows = spacings.map((aFcc) => ({
    a_fcc: aFcc,
    Pi_R_A_sea: computeDipoleWakeSumAtSpacing({ aFcc, heldHistoryWindow }).piRASea,
  }));
  const neighborMotionDeclaration = {
    kind,
    phase_mode: "common_phase_all_neighbors",
    phase_sample_count: phaseSampleCount,
    breathing_delta: kind === "breathing" ? cleanNumber(delta) : null,
    spin_axis_unit: kind === "orbiting" ? axisUnit.map(cleanNumber) : null,
    omega_grid: omegaGrid.map(cleanNumber),
    declared_held_history_window: cleanNumber(heldHistoryWindow),
    parameter_status:
      "declared held-history motion parameters, not response amplitudes; the response remains fully computed from the master-equation kernel",
    branch_weight_convention: {
      receiver_normal_factor: 1,
      jacobian_floor: MOTION_JACOBIAN_FLOOR,
      convention:
        "branchWeight=|receiverNormalFactor/signPreservingMax(sourceJacobian,jacobianFloor)| per the held-release toy kernel",
    },
    undeclared_environment_degrees_of_freedom: 0,
  };
  const omegaResults = omegaGrid.map((omega) => {
    const motionBase = { kind, delta, omega, axisUnit };
    const sourceSpeedBound = maxNeighborMotionSourceSpeedBound({ kind, delta, omega, axisUnit });
    const spacingRows = spacings.map((aFcc) =>
      buildMotionSpacingRow({
        aFcc,
        heldHistoryWindow,
        deadband,
        motionBase,
        phaseSampleCount,
        sourceSpeedBound,
      })
    );
    const envelopeAt = (aFcc) =>
      computeMotionPhaseEnvelopeAtSpacing({ aFcc, heldHistoryWindow, motionBase, phaseSampleCount });
    const guaranteedWindow = buildRetentionWindow({
      spacingRows,
      deadband,
      spacingRange,
      piRAtSpacing: (aFcc) => envelopeAt(aFcc).piRMax,
      crossingFlag: (row) => row.floor_evaluation.crosses_inward_response_floor_all_phases,
      namedCandidateEnabled: false,
    });
    const phaseConditionalWindow = buildRetentionWindow({
      spacingRows,
      deadband,
      spacingRange,
      piRAtSpacing: (aFcc) => envelopeAt(aFcc).piRMin,
      crossingFlag: (row) => row.floor_evaluation.crosses_inward_response_floor_some_phase,
      namedCandidateEnabled: false,
    });
    const candidateRow =
      spacingRows.find((row) => Math.abs(row.a_fcc - candidateAFcc) <= 1e-9) ?? null;
    const candidateEnvelope = candidateRow?.phase_envelope ?? (() => {
      const envelope = envelopeAt(candidateAFcc);
      return {
        phase_sample_count: phaseSampleCount,
        Pi_R_min: envelope.piRMin,
        Pi_R_max: envelope.piRMax,
        Pi_R_mean: envelope.piRMean,
        spread: envelope.spread,
        phase_of_min: envelope.phaseOfMin,
        phase_of_max: envelope.phaseOfMax,
      };
    })();
    const maxSpreadRow = spacingRows.reduce((best, row) =>
      row.phase_envelope.spread > best.phase_envelope.spread ? row : best
    );
    return {
      omega: cleanNumber(omega),
      max_source_speed_bound: sourceSpeedBound,
      field_speed_pass: sourceSpeedBound < MASTER_EQUATION_KERNEL.fieldSpeed,
      spacing_rows: spacingRows,
      retention_windows: {
        guaranteed_all_phases: guaranteedWindow,
        phase_conditional: phaseConditionalWindow,
      },
      candidate_spacing_status: {
        a_fcc: candidateAFcc,
        phase_envelope: candidateEnvelope,
        crosses_inward_response_floor_all_phases:
          candidateEnvelope.Pi_R_max < requiredProjection,
        crosses_inward_response_floor_some_phase:
          candidateEnvelope.Pi_R_min < requiredProjection,
      },
      phase_dependence: {
        max_spread: maxSpreadRow.phase_envelope.spread,
        max_spread_a_fcc: maxSpreadRow.a_fcc,
        spread_at_candidate_spacing: candidateEnvelope.spread,
        observed: maxSpreadRow.phase_envelope.spread > 1e-9,
      },
    };
  });
  const staticBoundaryReference = buildRetentionWindow({
    spacingRows: spacings.map((aFcc) =>
      buildDipoleWakeSumSpacingRow({ aFcc, heldHistoryWindow, deadband })
    ),
    deadband,
    spacingRange,
    piRAtSpacing: (aFcc) => computeDipoleWakeSumAtSpacing({ aFcc, heldHistoryWindow }).piRASea,
  });
  const boundarySplitObserved = omegaResults.some((result) => {
    const guaranteed = result.retention_windows.guaranteed_all_phases;
    const conditional = result.retention_windows.phase_conditional;
    return (
      guaranteed.a_fcc_window_max != null &&
      conditional.a_fcc_window_max != null &&
      Math.abs(conditional.a_fcc_window_max - guaranteed.a_fcc_window_max) > 1e-6
    );
  });
  const delayedEchoVerdict = {
    hypothesis: "H5_delayed_echo",
    phase_dependence_observed: omegaResults.some((result) => result.phase_dependence.observed),
    retention_window_boundary_split_observed: boundarySplitObserved,
    static_reference_boundary: staticBoundaryReference.a_fcc_window_max,
    per_omega_boundaries: omegaResults.map((result) => ({
      omega: result.omega,
      guaranteed_all_phases_boundary:
        result.retention_windows.guaranteed_all_phases.a_fcc_window_max,
      guaranteed_boundary_status:
        result.retention_windows.guaranteed_all_phases.a_fcc_window_max_boundary,
      phase_conditional_boundary: result.retention_windows.phase_conditional.a_fcc_window_max,
      phase_conditional_boundary_status:
        result.retention_windows.phase_conditional.a_fcc_window_max_boundary,
    })),
    reading:
      "diagnostic-only: a phase- and frequency-dependent retention window at the declared held-history level; not retained evidence and not an accepted Noether sea response closure",
  };
  const namedCandidate = staticBoundaryReference.named_sea_spacing_candidate;
  const wakeSumSourceRow = buildDipoleWakeSumSourceRow({
    model,
    heldHistoryWindow,
    deadband,
    motionDeclaration: neighborMotionDeclaration,
  });
  const candidateSameRecordRequest = buildCandidateSameRecordRequest({
    model,
    namedCandidate,
    historyDeclaration: wakeSumSourceRow.held_history_declaration,
    motionDeclaration: {
      ...neighborMotionDeclaration,
      candidate_spacing_status_per_omega: omegaResults.map((result) => ({
        omega: result.omega,
        ...result.candidate_spacing_status,
      })),
    },
  });
  const acceptedProvenanceReplacementRequirement = buildAcceptedProvenanceReplacementRequirement({
    model,
    sourceRow: wakeSumSourceRow,
    options,
  });
  const core = {
    schema: DIPOLE_WAKE_SUM_MOTION_RUN_SCHEMA,
    proof_id: "SH-0-sea",
    authority_class: AUTHORITY_CLASS,
    claim_level: "diagnostic delayed-echo wake-sum floor comparison only",
    target_artifact_id: model.target_artifact_id,
    target_artifact_hash: model.target_artifact_hash,
    target_source_row_id: model.target_source_row_id,
    run_matrix_metadata: model.run_matrix_metadata ?? null,
    model_artifact_hash: model.artifact_hash,
    master_equation_kernel: MASTER_EQUATION_KERNEL,
    neighbor_motion_declaration: neighborMotionDeclaration,
    declared_spacing_range: spacingRange,
    declared_held_history_window: cleanNumber(heldHistoryWindow),
    response_equation:
      "Pi_R A_sea=(1/6) sum_a yhat_a dot sum_{k=1..12} sum_b kernel(y_a, x_{k,b}(t_e); declared moving held history, causal root t_e)",
    free_amplitude_parameter_count: 0,
    fitted_response_amplitude_present: false,
    static_reference_rows: staticReferenceRows,
    omega_results: omegaResults,
    delayed_echo_verdict: delayedEchoVerdict,
    wake_sum_source_row: wakeSumSourceRow,
    candidate_same_record_request: candidateSameRecordRequest,
    accepted_provenance_replacement_requirement: acceptedProvenanceReplacementRequirement,
    evidence_status: {
      accepted: false,
      accepted_evidence_status: "diagnostic_wake_sum_motion_run_not_accepted_evidence",
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

export function evaluateSh0SeaDipoleWakeSumMotionRunEvidence(candidate) {
  if (candidate?.schema !== DIPOLE_WAKE_SUM_MOTION_RUN_SCHEMA) {
    return {
      accepted: false,
      reason: "schema_not_sh_0_sea_dipole_wake_sum_motion_run_v0",
      first_missing_field: "sh_0_sea_dipole_wake_sum_motion_run.schema",
    };
  }
  return {
    accepted: false,
    reason: "diagnostic_wake_sum_motion_run_not_accepted_retained_evidence",
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
  const numberListOption = (name) => {
    const value = stringOption(name);
    if (value == null) {
      return undefined;
    }
    const numbers = value.split(",").map((entry) => Number(entry.trim()));
    if (numbers.length === 0 || numbers.some((entry) => !Number.isFinite(entry))) {
      throw new TypeError(`--${name} must be a comma-separated list of finite numbers`);
    }
    return numbers;
  };
  const neighborMotion = stringOption("neighbor-motion");
  if (neighborMotion != null && !NEIGHBOR_MOTION_KINDS.includes(neighborMotion)) {
    throw new TypeError(`--neighbor-motion must be one of: ${NEIGHBOR_MOTION_KINDS.join("|")}`);
  }
  return {
    pretty: args.includes("--pretty"),
    wakeSumRun: args.includes("--wake-sum-run"),
    neighborMotion,
    motionDelta: numberOption("motion-delta"),
    motionOmegaGrid: numberListOption("motion-omega"),
    motionPhaseSamples: numberOption("motion-phases"),
    motionSpinAxis: vectorOption("motion-spin-axis"),
    runHandle: stringOption("run-handle"),
    embeddedCentralRunHandle: stringOption("embedded-central-run-handle"),
    targetSourceRowId: stringOption("source-row-id"),
    targetCenterGroupVelocity: vectorOption("target-center-group-velocity") ?? vectorOption("group-velocity"),
    surfaceSpeedFraction: numberOption("surface-speed-fraction") ?? numberOption("surface-speed"),
    prehistoryMode: stringOption("prehistory-mode"),
    inwardDeadband: numberOption("inward-deadband"),
    aFccMin: numberOption("a-fcc-min"),
    aFccMax: numberOption("a-fcc-max"),
    aFccStep: numberOption("a-fcc-step"),
    heldHistoryWindow: numberOption("held-history-window"),
    seedPathAcceptanceCertificate: jsonOption("acceptance-certificate-json"),
    seedPathExternalAuthorityPackage: jsonOption("external-authority-package-json"),
    seedPathRepoAuthorization: jsonOption("repo-authorization-json"),
    acceptedProvenancePackage: jsonOption("accepted-provenance-package-json"),
  };
}

function printUsage() {
  console.log(
    `Usage: node ${fileURLToPath(import.meta.url)} [--pretty] [--wake-sum-run] [--neighbor-motion=breathing|orbiting] [--motion-delta=<number>] [--motion-omega=<w1,w2,...>] [--motion-phases=<count>] [--motion-spin-axis=x,y,z] [--run-handle=<handle>] [--embedded-central-run-handle=<handle>] [--target-center-group-velocity=x,y,z] [--surface-speed-fraction=<number>] [--prehistory-mode=stationary-held-release|kick-at-release|moving-prehistory] [--inward-deadband=<number>] [--a-fcc-min=<number>] [--a-fcc-max=<number>] [--a-fcc-step=<number>] [--held-history-window=<number>] [--acceptance-certificate-json=<path>] [--external-authority-package-json=<path>] [--repo-authorization-json=<path>] [--accepted-provenance-package-json=<path>]`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  const options = parseArgs(process.argv.slice(2));
  const artifact = options.wakeSumRun
    ? options.neighborMotion != null
      ? buildSh0SeaDipoleWakeSumMotionRun(options)
      : buildSh0SeaDipoleWakeSumRun(options)
    : buildSh0SeaDiagnosticCandidateModel(options);
  console.log(JSON.stringify(artifact, null, options.pretty ? 2 : 0));
}

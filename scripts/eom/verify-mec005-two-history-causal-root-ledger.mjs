#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const MEC005_LEDGER_SCHEMA =
  "mec005_two_history_causal_root_ledger_certificate/v1";
export const MEC005_VERIFICATION_SCHEMA =
  "mec005_two_history_causal_root_ledger_independent_verification/v1";

const CLAIM_SCOPE = "pairwise_root_ledger_topology_and_provenance_only";
const EXPECTED_BUNDLES = new Set(["1<-1", "1<-2", "2<-1", "2<-2"]);
const COVERAGE_CLASSES = new Set([
  "root_free",
  "simple_root_tube",
  "boundary_stratum",
  "unresolved_search_cell",
]);
const ROOT_KINDS = new Set(["partner", "positive_delay_self"]);
const ENTITY_KINDS = new Set([
  "root_stratum",
  "boundary_stratum",
  "emission_provenance_cell",
]);
const BANNED_IDENTITY_COMPONENTS = new Set([
  "root_rank",
  "row_order",
  "traversal_order",
  "subdivision_index",
  "numerical_bracket_order",
]);
const REQUIRED_NONCLAIMS = new Set([
  "conservation",
  "action",
  "account_values",
  "continuation",
  "physical_boundary_values",
  "retained_branch",
  "mec002_update_law",
  "mec003_transition_semantics",
  "mec006_closure",
  "solver_acceptance",
]);
const QUARANTINE = Object.freeze({
  status: "quarantined_unresolved",
  value_status: "not_derived",
  disposition: "Not advanced",
  prescription_ref: "absent",
  consumer_allowed: false,
});
const BOUNDED_STRUCTURAL_REACH = Object.freeze([
  "schema_and_scope_tokens",
  "two_history_identity_digest_and_opposite_polarity",
  "exact_four_ordered_bundle_identity",
  "declared_cell_and_entity_reference_closure",
  "root_identity_multiplicity_orientation_and_refinement_shape",
  "boundary_quarantine_and_ordinary_fold_shape",
  "reciprocal_incidence_shape",
  "unique_root_boundary_and_emission_ownership",
  "exact_supported_leaf_schema_labels_and_digests",
  "declared_producer_verifier_separation",
  "nonadvancing_verdict_boundary",
]);
const OUTSIDE_BOUNDED_STRUCTURAL_REACH = Object.freeze([
  "full_scope_metadata_and_raw_history_binding",
  "exact_partition_tree_coverage_and_disjointness",
  "complete_root_margin_and_derivative_evidence_shape",
  "complete_boundary_classification_flux_and_evidence_shape",
  "all_fifteen_mandatory_negative_controls",
  "independent_mathematical_reconstruction_from_raw_histories",
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isDigest(value) {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function valuesEqual(left, right) {
  return Object.is(left, right);
}

function bundleKey(receiverLabel, transmitterLabel) {
  return `${receiverLabel}<-${transmitterLabel}`;
}

function hasExactly(values, expected) {
  return (
    values.length === expected.size &&
    new Set(values).size === expected.size &&
    values.every((value) => expected.has(value))
  );
}

function entityKey(kind, id) {
  return `${kind}:${id}`;
}

function createCollector() {
  const issues = [];
  const checks = new Map();

  function issue(code, path, message) {
    issues.push({ code, path, message });
  }

  function check(name, passed) {
    checks.set(name, (checks.get(name) ?? true) && passed);
  }

  return { issues, checks, issue, check };
}

function validateSchemaAndScope(certificate, collector) {
  const { issue, check } = collector;
  const schemaPassed = certificate.schema === MEC005_LEDGER_SCHEMA;
  check("schema", schemaPassed);
  if (!schemaPassed) {
    issue(
      "schema_mismatch",
      "schema",
      `expected ${MEC005_LEDGER_SCHEMA}`,
    );
  }

  const scope = certificate.scope;
  const scopeRecord = isRecord(scope);
  check("scope", scopeRecord);
  if (!scopeRecord) {
    issue("scope_missing", "scope", "scope must be an object");
    return;
  }

  const requiredValues = {
    claim_scope: CLAIM_SCOPE,
    field_speed: "1",
    self_root_admission: "all_positive_delay_roots",
    diagonal_boundary_semantics: "quarantined_unresolved",
  };
  for (const [field, expected] of Object.entries(requiredValues)) {
    const passed = valuesEqual(scope[field], expected);
    check("scope", passed);
    if (!passed) {
      issue(
        "scope_value_mismatch",
        `scope.${field}`,
        `expected ${JSON.stringify(expected)}`,
      );
    }
  }

  const nonclaims = Array.isArray(scope.nonclaims) ? scope.nonclaims : [];
  const nonclaimsPassed = [...REQUIRED_NONCLAIMS].every((item) =>
    nonclaims.includes(item));
  check("scope", nonclaimsPassed);
  if (!nonclaimsPassed) {
    issue(
      "nonclaims_incomplete",
      "scope.nonclaims",
      "all MEC-005 nonclaims must be explicit",
    );
  }
}

function validateHistories(certificate, collector) {
  const { issue, check } = collector;
  const histories = Array.isArray(certificate.histories)
    ? certificate.histories
    : [];
  let passed = histories.length === 2;
  if (!passed) {
    issue(
      "history_count_mismatch",
      "histories",
      "exactly two histories are required",
    );
  }

  const labels = histories.map((history) => history?.label);
  if (!hasExactly(labels, new Set(["1", "2"]))) {
    passed = false;
    issue(
      "history_labels_mismatch",
      "histories",
      "history labels must be exactly 1 and 2",
    );
  }

  const polarities = histories.map((history) => history?.polarity);
  if (!hasExactly(polarities, new Set(["-1", "+1"]))) {
    passed = false;
    issue(
      "opposite_polarity_missing",
      "histories",
      "history polarities must be the exact tokens -1 and +1",
    );
  }

  histories.forEach((history, index) => {
    if (!isRecord(history)) {
      passed = false;
      issue(
        "history_record_missing",
        `histories[${index}]`,
        "history must be an object",
      );
      return;
    }
    if (
      typeof history.history_id !== "string" ||
      history.history_id.length === 0
    ) {
      passed = false;
      issue(
        "history_identity_missing",
        `histories[${index}].history_id`,
        "history_id must be nonempty",
      );
    }
    if (!isDigest(history.history_digest)) {
      passed = false;
      issue(
        "history_digest_invalid",
        `histories[${index}].history_digest`,
        "history_digest must be a lowercase SHA-256 token",
      );
    }
  });

  check("histories", passed);
}

function validateBundlesAndCoverage(certificate, collector) {
  const { issue, check } = collector;
  const bundles = Array.isArray(certificate.ordered_bundles)
    ? certificate.ordered_bundles
    : [];
  const bundleIds = bundles.map((bundle) => bundle?.bundle_id);
  let bundlesPassed = hasExactly(bundleIds, EXPECTED_BUNDLES);
  if (!bundlesPassed) {
    issue(
      "ordered_bundle_domain_incomplete",
      "ordered_bundles",
      "the exact four ordered bundles are required once each",
    );
  }

  const bundleById = new Map();
  bundles.forEach((bundle, index) => {
    if (!isRecord(bundle)) {
      bundlesPassed = false;
      issue(
        "ordered_bundle_invalid",
        `ordered_bundles[${index}]`,
        "bundle must be an object",
      );
      return;
    }
    const expectedId = bundleKey(
      bundle.receiver_label,
      bundle.transmitter_label,
    );
    if (bundle.bundle_id !== expectedId) {
      bundlesPassed = false;
      issue(
        "ordered_bundle_owner_mismatch",
        `ordered_bundles[${index}].bundle_id`,
        "bundle id must preserve receiver and transmitter order",
      );
    }
    const expectedKind =
      bundle.receiver_label === bundle.transmitter_label ? "self" : "partner";
    if (bundle.kind !== expectedKind) {
      bundlesPassed = false;
      issue(
        "ordered_bundle_kind_mismatch",
        `ordered_bundles[${index}].kind`,
        `expected ${expectedKind}`,
      );
    }
    if (typeof bundle.bundle_id === "string") {
      bundleById.set(bundle.bundle_id, bundle);
    }
  });
  check("ordered_bundles", bundlesPassed);

  const cells = Array.isArray(certificate.coverage_cells)
    ? certificate.coverage_cells
    : [];
  const cellIds = new Set();
  let coveragePassed = cells.length > 0;
  if (!coveragePassed) {
    issue(
      "coverage_cells_missing",
      "coverage_cells",
      "full-domain coverage cells are required",
    );
  }

  const cellsByBundle = new Map(
    [...EXPECTED_BUNDLES].map((id) => [id, new Set()]),
  );
  cells.forEach((cell, index) => {
    const base = `coverage_cells[${index}]`;
    if (!isRecord(cell) || typeof cell.cell_id !== "string") {
      coveragePassed = false;
      issue("coverage_cell_invalid", base, "cell and cell_id are required");
      return;
    }
    if (cellIds.has(cell.cell_id)) {
      coveragePassed = false;
      issue(
        "duplicate_coverage_cell",
        `${base}.cell_id`,
        "coverage cell ids must be unique",
      );
    }
    cellIds.add(cell.cell_id);
    if (!EXPECTED_BUNDLES.has(cell.bundle_id)) {
      coveragePassed = false;
      issue(
        "coverage_bundle_unknown",
        `${base}.bundle_id`,
        "coverage cell must belong to one ordered bundle",
      );
    } else {
      cellsByBundle.get(cell.bundle_id).add(cell.cell_id);
    }
    if (!COVERAGE_CLASSES.has(cell.classification)) {
      coveragePassed = false;
      issue(
        "coverage_class_invalid",
        `${base}.classification`,
        "coverage cell class is not admitted",
      );
    }
    if (
      ["simple_root_tube", "root_free"].includes(cell.classification) &&
      cell.strict_delay !== true
    ) {
      coveragePassed = false;
      issue(
        "strict_delay_missing",
        `${base}.strict_delay`,
        "interior coverage requires strict_delay=true",
      );
    }
  });

  for (const bundleId of EXPECTED_BUNDLES) {
    const bundle = bundleById.get(bundleId);
    const referenced = Array.isArray(bundle?.coverage_cell_ids)
      ? bundle.coverage_cell_ids
      : [];
    const observed = cellsByBundle.get(bundleId);
    if (
      !bundle ||
      !hasExactly(referenced, observed) ||
      referenced.length === 0
    ) {
      coveragePassed = false;
      issue(
        "bundle_coverage_reference_incomplete",
        `ordered_bundles.${bundleId}.coverage_cell_ids`,
        "bundle coverage references must exactly match its nonempty cell set",
      );
    }
  }

  check("coverage", coveragePassed);
  return { bundleById, cells };
}

function validateRootStrata(certificate, collector) {
  const { issue, check } = collector;
  const roots = Array.isArray(certificate.root_strata)
    ? certificate.root_strata
    : [];
  const rootById = new Map();
  let passed = true;

  roots.forEach((root, index) => {
    const base = `root_strata[${index}]`;
    if (!isRecord(root) || typeof root.stratum_id !== "string") {
      passed = false;
      issue("root_stratum_invalid", base, "root stratum and id are required");
      return;
    }
    if (rootById.has(root.stratum_id)) {
      passed = false;
      issue(
        "duplicate_root_stratum",
        `${base}.stratum_id`,
        "canonical root stratum ids must be unique",
      );
    }
    rootById.set(root.stratum_id, root);
    if (!EXPECTED_BUNDLES.has(root.bundle_id)) {
      passed = false;
      issue(
        "root_owner_unknown",
        `${base}.bundle_id`,
        "root must belong to one ordered bundle",
      );
    }
    if (!ROOT_KINDS.has(root.kind)) {
      passed = false;
      issue("root_kind_invalid", `${base}.kind`, "root kind is not admitted");
    }
    const expectedKind =
      root.bundle_id?.[0] === root.bundle_id?.[3]
        ? "positive_delay_self"
        : "partner";
    if (root.kind !== expectedKind) {
      passed = false;
      issue(
        "root_kind_owner_mismatch",
        `${base}.kind`,
        `expected ${expectedKind}`,
      );
    }
    if (!Number.isInteger(root.multiplicity) || root.multiplicity < 1) {
      passed = false;
      issue(
        "root_multiplicity_invalid",
        `${base}.multiplicity`,
        "root multiplicity must be a positive integer",
      );
    }
    if (![1, -1].includes(root.orientation)) {
      passed = false;
      issue(
        "root_orientation_invalid",
        `${base}.orientation`,
        "root orientation must be +1 or -1",
      );
    }
    if (root.strict_delay !== true) {
      passed = false;
      issue(
        "root_strict_delay_missing",
        `${base}.strict_delay`,
        "every active root stratum must certify strict delay",
      );
    }
    const identityBasis = Array.isArray(root.identity_basis)
      ? root.identity_basis
      : [];
    if (
      identityBasis.length === 0 ||
      identityBasis.some((item) => BANNED_IDENTITY_COMPONENTS.has(item))
    ) {
      passed = false;
      issue(
        "rank_derived_identity",
        `${base}.identity_basis`,
        "canonical identity may not depend on rank, order, or subdivision",
      );
    }
    if (
      root.refinement_correspondence?.status !== "canonical_stable" ||
      root.refinement_correspondence?.canonical_stratum_id !== root.stratum_id
    ) {
      passed = false;
      issue(
        "refinement_correspondence_missing",
        `${base}.refinement_correspondence`,
        "root refinement must preserve the canonical stratum id",
      );
    }
    if ("boundary_event" in root || "boundary_payload" in root) {
      passed = false;
      issue(
        "event_payload_duplicated",
        base,
        "root rows may reference boundary ids but may not copy event payloads",
      );
    }
  });

  check("root_strata", passed);
  return { rootById };
}

function validateQuarantine(semantics, path, collector) {
  const { issue } = collector;
  if (!isRecord(semantics)) {
    issue(
      "boundary_semantics_missing",
      path,
      "every boundary requires one semantics object",
    );
    return false;
  }
  let passed = true;
  for (const [field, expected] of Object.entries(QUARANTINE)) {
    if (!valuesEqual(semantics[field], expected)) {
      passed = false;
      issue(
        "boundary_quarantine_invalid",
        `${path}.${field}`,
        `expected ${JSON.stringify(expected)}`,
      );
    }
  }
  if (
    "value" in semantics ||
    "acceleration" in semantics ||
    "gradient" in semantics ||
    "continuation" in semantics ||
    "signed_account" in semantics
  ) {
    passed = false;
    issue(
      "boundary_value_exposed",
      path,
      "quarantined semantics may not expose downstream values",
    );
  }
  return passed;
}

function validateBoundariesAndIncidence(certificate, rootById, collector) {
  const { issue, check } = collector;
  const boundaries = Array.isArray(certificate.boundary_strata)
    ? certificate.boundary_strata
    : [];
  const boundaryById = new Map();
  let boundariesPassed = true;

  boundaries.forEach((boundary, index) => {
    const base = `boundary_strata[${index}]`;
    if (!isRecord(boundary) || typeof boundary.boundary_id !== "string") {
      boundariesPassed = false;
      issue("boundary_invalid", base, "boundary row and id are required");
      return;
    }
    if (boundaryById.has(boundary.boundary_id)) {
      boundariesPassed = false;
      issue(
        "duplicate_boundary",
        `${base}.boundary_id`,
        "boundary event payloads must be stored once",
      );
    }
    boundaryById.set(boundary.boundary_id, boundary);
    if (!EXPECTED_BUNDLES.has(boundary.bundle_id)) {
      boundariesPassed = false;
      issue(
        "boundary_owner_unknown",
        `${base}.bundle_id`,
        "boundary must have one ordered-bundle owner",
      );
    }
    if (!validateQuarantine(boundary.semantics, `${base}.semantics`, collector)) {
      boundariesPassed = false;
    }
    const halfBranches = Array.isArray(boundary.incident_half_branches)
      ? boundary.incident_half_branches
      : [];
    const germs = new Set();
    halfBranches.forEach((halfBranch, halfIndex) => {
      const halfPath = `${base}.incident_half_branches[${halfIndex}]`;
      if (!rootById.has(halfBranch?.root_stratum_id)) {
        boundariesPassed = false;
        issue(
          "incident_root_unknown",
          `${halfPath}.root_stratum_id`,
          "incident half-branch must reference one root stratum",
        );
      }
      if (
        typeof halfBranch?.germ_id !== "string" ||
        germs.has(halfBranch.germ_id)
      ) {
        boundariesPassed = false;
        issue(
          "incident_germ_duplicate",
          `${halfPath}.germ_id`,
          "germ ids must be present and unique within an event",
        );
      }
      germs.add(halfBranch?.germ_id);
      if (![1, -1].includes(halfBranch?.orientation)) {
        boundariesPassed = false;
        issue(
          "incident_orientation_invalid",
          `${halfPath}.orientation`,
          "incident orientation must be +1 or -1",
        );
      }
      if (![1, -1].includes(halfBranch?.incidence_coefficient)) {
        boundariesPassed = false;
        issue(
          "incidence_coefficient_invalid",
          `${halfPath}.incidence_coefficient`,
          "incidence coefficient must be +1 or -1",
        );
      }
    });
    if (boundary.class === "ordinary_fold") {
      const orientations = halfBranches.map((row) => row.orientation);
      if (
        boundary.multiplicity !== 2 ||
        halfBranches.length !== 2 ||
        !orientations.includes(1) ||
        !orientations.includes(-1)
      ) {
        boundariesPassed = false;
        issue(
          "ordinary_fold_shape_invalid",
          base,
          "ordinary fold requires multiplicity two and two opposite orientations",
        );
      }
    }
    if (
      boundary.class === "structural_self_diagonal" &&
      boundary.multiplicity !== "not_applicable_structural_boundary"
    ) {
      boundariesPassed = false;
      issue(
        "structural_diagonal_multiplicity_invalid",
        `${base}.multiplicity`,
        "structural self diagonal multiplicity must be typed not applicable",
      );
    }
    if (
      boundary.refinement_correspondence?.status !== "canonical_stable" &&
      boundary.refinement_correspondence?.status !==
        "quarantined_children_proved"
    ) {
      boundariesPassed = false;
      issue(
        "boundary_refinement_correspondence_missing",
        `${base}.refinement_correspondence`,
        "boundary quarantine and identity must persist under refinement",
      );
    }
    if (
      boundary.refinement_correspondence?.status === "canonical_stable" &&
      boundary.refinement_correspondence?.canonical_boundary_id !==
        boundary.boundary_id
    ) {
      boundariesPassed = false;
      issue(
        "boundary_refinement_identity_mismatch",
        `${base}.refinement_correspondence.canonical_boundary_id`,
        "stable refinement must preserve the canonical boundary id",
      );
    }
  });

  for (const selfBundle of ["1<-1", "2<-2"]) {
    const diagonals = boundaries.filter(
      (boundary) =>
        boundary?.bundle_id === selfBundle &&
        boundary?.class === "structural_self_diagonal",
    );
    if (diagonals.length !== 1) {
      boundariesPassed = false;
      issue(
        "structural_self_diagonal_missing",
        "boundary_strata",
        `bundle ${selfBundle} requires exactly one structural diagonal carrier`,
      );
    }
  }
  check("boundary_strata", boundariesPassed);

  const incidence = Array.isArray(certificate.incidence)
    ? certificate.incidence
    : [];
  const incidenceKeys = new Set();
  let incidencePassed = true;
  incidence.forEach((row, index) => {
    const base = `incidence[${index}]`;
    const key = `${row?.boundary_id}:${row?.root_stratum_id}:${row?.germ_id}`;
    if (incidenceKeys.has(key)) {
      incidencePassed = false;
      issue(
        "duplicate_incidence",
        base,
        "each incident half-branch must appear exactly once",
      );
    }
    incidenceKeys.add(key);
    const boundary = boundaryById.get(row?.boundary_id);
    const root = rootById.get(row?.root_stratum_id);
    const halfBranch = boundary?.incident_half_branches?.find(
      (candidate) =>
        candidate.root_stratum_id === row?.root_stratum_id &&
        candidate.germ_id === row?.germ_id,
    );
    if (
      !boundary ||
      !root ||
      !halfBranch ||
      halfBranch.orientation !== row.orientation ||
      halfBranch.incidence_coefficient !== row.incidence_coefficient ||
      !root.incident_boundary_ids?.includes(row.boundary_id)
    ) {
      incidencePassed = false;
      issue(
        "incidence_not_reciprocal",
        base,
        "incidence must match the boundary half-branch and root closure",
      );
    }
  });

  for (const boundary of boundaries) {
    for (const halfBranch of boundary.incident_half_branches ?? []) {
      const key = `${boundary.boundary_id}:${halfBranch.root_stratum_id}:${halfBranch.germ_id}`;
      if (!incidenceKeys.has(key)) {
        incidencePassed = false;
        issue(
          "incidence_row_missing",
          `boundary_strata.${boundary.boundary_id}`,
          "every boundary half-branch requires one reciprocal incidence row",
        );
      }
    }
  }
  for (const [rootId, root] of rootById) {
    const declaredBoundaries = Array.isArray(root.incident_boundary_ids)
      ? root.incident_boundary_ids
      : [];
    for (const boundaryId of declaredBoundaries) {
      const matched = incidence.some(
        (row) =>
          row?.root_stratum_id === rootId &&
          row?.boundary_id === boundaryId,
      );
      if (!matched) {
        incidencePassed = false;
        issue(
          "root_incidence_row_missing",
          `root_strata.${rootId}.incident_boundary_ids`,
          "every root-side boundary reference requires reciprocal incidence",
        );
      }
    }
  }
  check("incidence", incidencePassed);
  return { boundaryById };
}

function validateOwnership(
  certificate,
  rootById,
  boundaryById,
  collector,
) {
  const { issue, check } = collector;
  const emissions = Array.isArray(certificate.emission_provenance_cells)
    ? certificate.emission_provenance_cells
    : [];
  const emissionById = new Map();
  let passed = true;
  emissions.forEach((emission, index) => {
    if (
      !isRecord(emission) ||
      typeof emission.emission_provenance_id !== "string"
    ) {
      passed = false;
      issue(
        "emission_provenance_invalid",
        `emission_provenance_cells[${index}]`,
        "emission provenance row and id are required",
      );
      return;
    }
    if (emissionById.has(emission.emission_provenance_id)) {
      passed = false;
      issue(
        "duplicate_emission_provenance",
        `emission_provenance_cells[${index}].emission_provenance_id`,
        "one emission-provenance payload may be stored only once",
      );
    }
    emissionById.set(emission.emission_provenance_id, emission);
    if (!EXPECTED_BUNDLES.has(emission.owner_bundle_id)) {
      passed = false;
      issue(
        "emission_owner_unknown",
        `emission_provenance_cells[${index}].owner_bundle_id`,
        "emission provenance must belong to one ordered bundle",
      );
    }
  });

  for (const [rootId, root] of rootById) {
    if (!emissionById.has(root.emission_provenance_id)) {
      passed = false;
      issue(
        "root_emission_provenance_missing",
        `root_strata.${rootId}.emission_provenance_id`,
        "root must reference one stored emission-provenance cell",
      );
    }
  }

  const expectedEntities = new Map();
  for (const [id, root] of rootById) {
    expectedEntities.set(
      entityKey("root_stratum", id),
      root.bundle_id,
    );
  }
  for (const [id, boundary] of boundaryById) {
    expectedEntities.set(
      entityKey("boundary_stratum", id),
      boundary.bundle_id,
    );
  }
  for (const [id, emission] of emissionById) {
    expectedEntities.set(
      entityKey("emission_provenance_cell", id),
      emission.owner_bundle_id,
    );
  }

  const index = Array.isArray(certificate.ownership_index)
    ? certificate.ownership_index
    : [];
  const observedEntities = new Set();
  index.forEach((row, rowIndex) => {
    const base = `ownership_index[${rowIndex}]`;
    if (!ENTITY_KINDS.has(row?.entity_kind)) {
      passed = false;
      issue(
        "ownership_entity_kind_invalid",
        `${base}.entity_kind`,
        "ownership entity kind is not admitted",
      );
      return;
    }
    const key = entityKey(row.entity_kind, row.entity_id);
    if (observedEntities.has(key)) {
      passed = false;
      issue(
        "duplicate_owner",
        base,
        "each canonical entity must have exactly one owner",
      );
    }
    observedEntities.add(key);
    const expectedOwner = expectedEntities.get(key);
    if (!expectedOwner || row.owner_bundle_id !== expectedOwner) {
      passed = false;
      issue(
        "owner_mismatch",
        base,
        "ownership row must match the canonical entity owner",
      );
    }
  });

  for (const key of expectedEntities.keys()) {
    if (!observedEntities.has(key)) {
      passed = false;
      issue(
        "owner_missing",
        "ownership_index",
        `missing owner for ${key}`,
      );
    }
  }
  check("ownership", passed);
}

function validateLeafSchemasAndIndependence(certificate, collector) {
  const { issue, check } = collector;
  let leavesPassed = true;
  for (const [index, bundle] of (certificate.ordered_bundles ?? []).entries()) {
    for (const [leafIndex, leaf] of (bundle.leaf_certificates ?? []).entries()) {
      const path =
        `ordered_bundles[${index}].leaf_certificates[${leafIndex}].schema`;
      if (
        leaf?.schema !== "eom_root_completeness_certificate/v1" &&
        leaf?.schema !== "eom_root_continuation_certificate/v1"
      ) {
        leavesPassed = false;
        issue(
          "leaf_schema_unreconciled",
          path,
          "leaf certificate schema must be an exact supported /v1 label",
        );
      }
      if (!isDigest(leaf?.digest)) {
        leavesPassed = false;
        issue(
          "leaf_digest_invalid",
          path.replace(/schema$/u, "digest"),
          "leaf certificate digest must be a lowercase SHA-256 token",
        );
      }
    }
  }
  check("leaf_schemas", leavesPassed);

  const independence = certificate.independent_verification;
  let independencePassed = isRecord(independence);
  if (!independencePassed) {
    issue(
      "independence_record_missing",
      "independent_verification",
      "independence declaration is required",
    );
  } else {
    if (
      independence.independently_authored !== true ||
      typeof independence.producer_id !== "string" ||
      typeof independence.verifier_id !== "string" ||
      independence.producer_id === independence.verifier_id
    ) {
      independencePassed = false;
      issue(
        "independence_identity_invalid",
        "independent_verification",
        "producer and verifier must be separately identified and authored",
      );
    }
    if (
      !Array.isArray(independence.shared_implementation_components) ||
      independence.shared_implementation_components.length !== 0
    ) {
      independencePassed = false;
      issue(
        "same_implementation_parity",
        "independent_verification.shared_implementation_components",
        "shared producer implementation cannot establish independence",
      );
    }
  }
  check("independence_declaration", independencePassed);
}

function validateVerdictBoundary(certificate, collector) {
  const { issue, check } = collector;
  const verdict = certificate.verdict;
  const passed =
    isRecord(verdict) &&
    verdict.topology_provenance?.verification_outcome ===
      "Verification incomplete" &&
    verdict.topology_provenance?.disposition === "Not advanced" &&
    verdict.overall_mec005_status === "Queued" &&
    verdict.consumer_ready === false;
  check("verdict_boundary", passed);
  if (!passed) {
    issue(
      "unearned_topology_verdict",
      "verdict",
      "the structural-only stage must remain Verification incomplete, Not advanced, consumer-disabled, and Queued",
    );
  }
}

export function verifyMec005TwoHistoryCausalRootLedger(certificate) {
  const collector = createCollector();
  if (!isRecord(certificate)) {
    collector.issue(
      "certificate_invalid",
      "$",
      "certificate must be a JSON object",
    );
  } else {
    validateSchemaAndScope(certificate, collector);
    validateHistories(certificate, collector);
    const { bundleById, cells } = validateBundlesAndCoverage(
      certificate,
      collector,
    );
    const { rootById } = validateRootStrata(certificate, collector);
    const { boundaryById } = validateBoundariesAndIncidence(
      certificate,
      rootById,
      collector,
    );
    validateOwnership(
      certificate,
      rootById,
      boundaryById,
      collector,
    );
    validateLeafSchemasAndIndependence(certificate, collector);
    validateVerdictBoundary(certificate, collector);

    for (const [bundleId, bundle] of bundleById) {
      const referencedRoots = Array.isArray(bundle.root_stratum_ids)
        ? bundle.root_stratum_ids
        : [];
      const referencedBoundaries = Array.isArray(bundle.boundary_stratum_ids)
        ? bundle.boundary_stratum_ids
        : [];
      const ownedRoots = new Set(
        [...rootById]
          .filter(([, root]) => root.bundle_id === bundleId)
          .map(([id]) => id),
      );
      const ownedBoundaries = new Set(
        [...boundaryById]
          .filter(([, boundary]) => boundary.bundle_id === bundleId)
          .map(([id]) => id),
      );
      if (
        !hasExactly(referencedRoots, ownedRoots) ||
        !hasExactly(referencedBoundaries, ownedBoundaries)
      ) {
        collector.issue(
          "bundle_entity_reference_mismatch",
          `ordered_bundles.${bundleId}`,
          "bundle entity references must exactly equal the owned root and boundary sets",
        );
        collector.check("ordered_bundles", false);
      }
    }

    for (const [index, cell] of cells.entries()) {
      const base = `coverage_cells[${index}]`;
      if (
        cell.classification === "simple_root_tube" &&
        rootById.get(cell.root_stratum_id)?.bundle_id !== cell.bundle_id
      ) {
        collector.issue(
          "coverage_root_reference_mismatch",
          `${base}.root_stratum_id`,
          "simple root tubes must reference a root in the same ordered bundle",
        );
        collector.check("coverage", false);
      }
      if (
        cell.classification === "boundary_stratum" &&
        boundaryById.get(cell.boundary_id)?.bundle_id !== cell.bundle_id
      ) {
        collector.issue(
          "coverage_boundary_reference_mismatch",
          `${base}.boundary_id`,
          "boundary cells must reference a boundary in the same ordered bundle",
        );
        collector.check("coverage", false);
      }
    }
  }

  const structuralPassed = collector.issues.length === 0;
  return {
    schema: MEC005_VERIFICATION_SCHEMA,
    claim_scope: CLAIM_SCOPE,
    structural_stage: {
      status: structuralPassed ? "passed" : "failed",
      reach: "bounded_contract_shape_and_reference_checks",
      covered_obligations: [...BOUNDED_STRUCTURAL_REACH],
      outside_reach: [...OUTSIDE_BOUNDED_STRUCTURAL_REACH],
      checks: Object.fromEntries(collector.checks),
      issues: collector.issues,
    },
    mathematical_stage: {
      status: "not_implemented",
      required_reach:
        "raw-history full-domain partition, roots, multiplicity, incidence, and refinement",
      verification_outcome: "Verification incomplete",
      disposition: "Not advanced",
    },
    boundary_semantics: {
      status: "quarantined_unresolved",
      value_status: "not_derived",
      consumer_allowed: false,
      disposition: "Not advanced",
    },
    overall: {
      verification_outcome: "Verification incomplete",
      disposition: "Not advanced",
      mec005_status: "Queued",
      consumer_ready: false,
      reason: structuralPassed
        ? "independent_full_domain_mathematics_not_implemented"
        : "structural_contract_failed",
    },
  };
}


// Exact bounded mathematical stage. This never consumes a producer root finder.
// Its independent reference is the signed-distance factorization proved in the
// MEC-005 owner, not agreement with a second call to this reconstruction.
function rational(n, d = 1n) {
  if (d === 0n) throw new Error("zero rational denominator");
  if (d < 0n) { n = -n; d = -d; }
  let a = n < 0n ? -n : n;
  let b = d;
  while (b) [a, b] = [b, a % b];
  return [n / a, d / a];
}
function parseRational(token) {
  if (typeof token !== "string" || !/^-?\d+(\/\d+)?$/u.test(token)) {
    throw new Error("exact integer or rational strings required");
  }
  const [n, d = "1"] = token.split("/");
  return rational(BigInt(n), BigInt(d));
}
const qadd = (a, b) => rational(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const qneg = (a) => [-a[0], a[1]];
const qsub = (a, b) => qadd(a, qneg(b));
const qmul = (a, b) => rational(a[0] * b[0], a[1] * b[1]);
const qdiv = (a, b) => rational(a[0] * b[1], a[1] * b[0]);
const qcmp = (a, b) => { const d = a[0] * b[1] - b[0] * a[1]; return d < 0n ? -1 : d > 0n ? 1 : 0; };
const qt = (a) => a[1] === 1n ? `${a[0]}` : `${a[0]}/${a[1]}`;
const Q0 = [0n, 1n];
const Q1 = [1n, 1n];
const affineAt = (v, b, t) => qadd(qmul(v, t), b);
const affineDigest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

function normalizeAffineHistory(history, lower, end) {
  if (!isRecord(history) || !Array.isArray(history.knots) || history.knots.length < 2) {
    throw new Error("finite piecewise-affine knots required; accumulation remains unresolved");
  }
  const knots = history.knots.map((k) => {
    if (!Array.isArray(k) || k.length !== 2) throw new Error("knots must be [time, x]");
    return k.map(parseRational);
  });
  if (qcmp(knots[0][0], lower) || qcmp(knots.at(-1)[0], end)) {
    throw new Error("raw histories must cover exactly [memory_lower, reception_end]");
  }
  const segments = [];
  for (let k = 1; k < knots.length; k += 1) {
    const [a, x] = knots[k - 1];
    const [z, y] = knots[k];
    if (qcmp(a, z) >= 0) throw new Error("history times must increase strictly");
    const v = qdiv(qsub(y, x), qsub(z, a));
    const b = qsub(x, qmul(v, a));
    const last = segments.at(-1);
    if (last && !qcmp(v, last.v) && !qcmp(b, last.b)) last.z = z;
    else segments.push({ a, z, v, b });
  }
  return { label: history.label, polarity: history.polarity, segments };
}

/** Reconstruct all four bundles for continuous rational collinear histories.
 * Reception must lie in a single affine piece of each history. Unit-slope
 * transmitter pieces and persistent roots on true knots are unresolved.
 * All intervals below are open regular cells; their endpoints are owned once.
 */
export function reconstructMec005AffineHistoryLedger(input) {
  const failure = (message) => ({ status: "unresolved", reason: message,
    unresolved_strata: ["root_intervals_or_accumulation_require_separate_chart"],
    consumer_ready: false });
  try {
    if (input?.representation !== "exact_collinear_piecewise_affine/v1" || input.field_speed !== "1") {
      throw new Error("unsupported history representation or field speed");
    }
    if (!Array.isArray(input.reception_interval) || input.reception_interval.length !== 2) {
      throw new Error("reception_interval must have exactly two endpoints");
    }
    const lower = parseRational(input.memory_lower);
    const [start, end] = input.reception_interval.map(parseRational);
    if (qcmp(lower, start) >= 0 || qcmp(start, end) >= 0) throw new Error("invalid causal domain");
    if (!Array.isArray(input.histories) || input.histories.length !== 2 ||
        !hasExactly(input.histories.map((h) => h.label), new Set(["1", "2"])) ||
        !hasExactly(input.histories.map((h) => h.polarity), new Set(["-1", "+1"]))) {
      throw new Error("exactly two labeled opposite-polarity histories required");
    }
    const histories = input.histories.map((h) => normalizeAffineHistory(h, lower, end))
      .sort((a, b) => a.label.localeCompare(b.label));
    const receivers = histories.map((h) => h.segments.find((s) =>
      qcmp(s.a, start) <= 0 && qcmp(s.z, end) >= 0));
    if (receivers.some((r) => !r)) throw new Error("receiver knot inside slab requires separate chart");
    if (histories.some((h) => h.segments.some((s) => qcmp(qmul(s.v, s.v), Q1) === 0))) {
      throw new Error("unit-slope transmitter: possible positive-delay root interval unresolved");
    }
    const historyKey = affineDigest(histories.map((h) => ({ label: h.label, polarity: h.polarity,
      segments: h.segments.map((s) => [s.a, s.z, s.v, s.b].map(qt)) })));
    const domainKey = affineDigest([historyKey, qt(lower), qt(start), qt(end)]);
    const roots = [];
    const events = new Map();
    const diagonals = [];
    const complements = [];
    const eventAt = (bundle, t, s) => {
      const key = `${bundle}@${qt(t)},${qt(s)}`;
      if (!events.has(key)) {
        const faces = [];
        if (!qcmp(t, start)) faces.push("receiver_start");
        if (!qcmp(t, end)) faces.push("receiver_end");
        if (!qcmp(s, lower)) faces.push("memory_edge");
        if (!qcmp(s, t)) faces.push("excluded_diagonal");
        const transmitter = histories.find((h) => h.label === bundle.at(-1));
        if (transmitter.segments.slice(1).some((p) => !qcmp(p.a, s))) faces.push("transmitter_knot");
        events.set(key, { boundary_id: `${domainKey}:${key}`, bundle_id: bundle,
          point: [qt(t), qt(s)], faces,
          diagonal_carrier_id: !qcmp(t, s) && bundle[0] === bundle.at(-1) ? `${domainKey}:${bundle}:diagonal` : null,
          multiplicity: "not_assigned_at_boundary",
          semantics: { ...QUARANTINE }, incident_half_branches: [] });
      }
      return events.get(key);
    };
    for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
      const bundle = `${i + 1}<-${j + 1}`;
      const receiver = receivers[i];
      if (i === j) diagonals.push({ boundary_id: `${domainKey}:${bundle}:diagonal`,
        bundle_id: bundle, class: "structural_self_diagonal", interval: [qt(start), qt(end)],
        semantics: { ...QUARANTINE } });
      else {
        const dv = qsub(receiver.v, receivers[j].v);
        const db = qsub(receiver.b, receivers[j].b);
        if (!qcmp(dv, Q0) && !qcmp(db, Q0)) throw new Error("persistent partner diagonal requires separate chart");
        if (qcmp(dv, Q0)) {
          const t = qdiv(qneg(db), dv);
          if (qcmp(t, start) >= 0 && qcmp(t, end) <= 0) eventAt(bundle, t, t);
        }
      }
      for (const source of histories[j].segments) for (const sign of [-1, 1]) {
        const e = [BigInt(sign), 1n];
        // e*(x_i(T)-x_j(s)) = T-s, with s<T fixing the sign.
        const dt = qsub(Q1, qmul(e, source.v));
        const dr = qsub(Q1, qmul(e, receiver.v));
        const m = qdiv(dr, dt);
        const b = qdiv(qmul(e, qsub(source.b, receiver.b)), dt);
        let lo = start;
        let hi = end;
        let empty = false;
        // Exact half-plane intersection: A*T+B >= 0.
        const clip = (a, c) => {
          const direction = qcmp(a, Q0);
          if (!direction) { if (qcmp(c, Q0) < 0) empty = true; return; }
          const cut = qdiv(qneg(c), a);
          if (direction > 0 && qcmp(cut, lo) > 0) lo = cut;
          if (direction < 0 && qcmp(cut, hi) < 0) hi = cut;
        };
        clip(m, qsub(b, source.a));
        clip(qneg(m), qsub(source.z, b));
        clip(qsub(Q1, m), qneg(b));
        complements.push({ bundle_id: bundle, source_interval: [qt(source.a), qt(source.z)],
          direction: sign, zero_line: [qt(m), qt(b)],
          proof: "signed_linear_factor_nonzero_off_clipped_zero_line" });
        if (empty || qcmp(lo, hi) > 0) continue;
        if (!qcmp(m, Q1) && !qcmp(b, Q0)) continue; // exact diagonal; carrier retained
        const sLo = affineAt(m, b, lo);
        const sHi = affineAt(m, b, hi);
        if (!qcmp(lo, hi)) { eventAt(bundle, lo, sLo); continue; }
        if (!qcmp(m, Q0) && (!qcmp(b, source.a) || !qcmp(b, source.z))) {
          throw new Error("persistent root on history knot or memory edge requires separate chart");
        }
        const descriptor = [bundle, qt(source.a), qt(source.z), sign, qt(m), qt(b), qt(lo), qt(hi)];
        const id = `${domainKey}:${JSON.stringify(descriptor)}`;
        const begin = eventAt(bundle, lo, sLo);
        const finish = eventAt(bundle, hi, sHi);
        const orientation = qcmp(dt, Q0);
        for (const [boundary, side, coefficient] of [[begin, "start", -1], [finish, "end", 1]]) {
          boundary.incident_half_branches.push({ root_stratum_id: id, germ_id: `${id}:${side}`,
            orientation, incidence_coefficient: coefficient });
        }
        roots.push({ stratum_id: id, bundle_id: bundle,
          kind: i === j ? "positive_delay_self" : "partner", emission_line: [qt(m), qt(b)],
          receiver_interval: [qt(lo), qt(hi)], source_interval: [qt(source.a), qt(source.z)],
          direction: sign, multiplicity: 1, orientation, transmitter_factor: qt(dt),
          signed_playback: qt(m), incident_boundary_ids: [begin.boundary_id, finish.boundary_id] });
      }
    }
    const boundaries = [...events.values()].sort((a, b) => a.boundary_id.localeCompare(b.boundary_id));
    roots.sort((a, b) => a.stratum_id.localeCompare(b.stratum_id));
    for (const boundary of boundaries) {
      boundary.unsigned_root_count_jump = -boundary.incident_half_branches.reduce((sum, h) => sum + h.incidence_coefficient, 0);
      boundary.oriented_root_count_jump = -boundary.incident_half_branches.reduce((sum, h) => sum + h.orientation * h.incidence_coefficient, 0);
    }
    const incidence = boundaries.flatMap((b) => b.incident_half_branches.map((h) =>
      ({ boundary_id: b.boundary_id, ...h })));
    return { status: "reconstructed", history_key: historyKey, domain_key: domainKey,
      ordered_bundles: [...EXPECTED_BUNDLES], root_strata: roots, boundary_strata: boundaries,
      diagonal_carriers: diagonals, incidence, complement_factors: complements,
      consumer_ready: false, account_values: "not_derived",
      scope: "exact_collinear_affine_reception_piecewise_affine_transmission_only" };
  } catch (error) { return failure(error.message); }
}

/** A claimed ledger is checked against raw-history reconstruction. Never call
 * reconstruction to manufacture a positive acceptance fixture: use exact
 * hand-derived rows, or a frozen independent producer, as the second side.
 */
export function verifyMec005AffineHistoryLedger(input, claimed) {
  const reconstructed = reconstructMec005AffineHistoryLedger(input);
  const issues = [];
  if (reconstructed.status !== "reconstructed") issues.push(reconstructed.reason);
  else {
    for (const field of ["history_key", "domain_key", "ordered_bundles", "root_strata",
      "boundary_strata", "diagonal_carriers", "incidence", "complement_factors"]) {
      // Order of records is not identity; duplicate records still change length.
      const unordered = new Set(["ordered_bundles", "root_strata", "boundary_strata", "diagonal_carriers", "incidence", "complement_factors", "incident_half_branches", "faces"]);
      const canonical = (value, key) => {
        if (Array.isArray(value)) {
          const rows = value.map((v) => canonical(v));
          return unordered.has(key) ? rows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : rows;
        }
        if (isRecord(value)) return Object.fromEntries(Object.keys(value).sort().map((k) => [k, canonical(value[k], k)]));
        return value;
      };
      if (JSON.stringify(canonical(claimed?.[field], field)) !== JSON.stringify(canonical(reconstructed[field], field))) {
        issues.push(`raw_history_mismatch:${field}`);
      }
    }
  }
  return { status: issues.length ? "failed_or_unresolved" : "bounded_geometry_matched",
    issues, reconstructed, verification_outcome: "Verification incomplete", disposition: "Not advanced",
    consumer_ready: false, overall_mec005_status: "Queued",
    independence: "requires_frozen_separate_producer_or_hand_derived_reference; self_replay_is_not_evidence" };
}

export async function runMec005VerifierCli(argv = process.argv.slice(2)) {
  if (argv[0] === "--affine" && argv.length === 2) {
    const packet = JSON.parse(await readFile(argv[1], "utf8"));
    const report = verifyMec005AffineHistoryLedger(packet.raw_history, packet.claimed_ledger);
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return report.status === "bounded_geometry_matched" ? 0 : 1;
  }
  if (argv.length !== 1 || argv[0] === "--help") {
    const usage =
      "Usage: node scripts/eom/verify-mec005-two-history-causal-root-ledger.mjs <certificate.json>\n       node scripts/eom/verify-mec005-two-history-causal-root-ledger.mjs --affine <raw-history-and-ledger.json>\n";
    if (argv[0] === "--help") {
      process.stdout.write(usage);
      return 0;
    }
    process.stderr.write(usage);
    return 2;
  }

  const certificate = JSON.parse(await readFile(argv[0], "utf8"));
  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.structural_stage.status === "passed" ? 0 : 1;
}

const entryPath = process.argv[1]
  ? pathToFileURL(process.argv[1]).href
  : null;
if (entryPath === import.meta.url) {
  process.exitCode = await runMec005VerifierCli();
}

import assert from "node:assert/strict";
import test from "node:test";

import {
  MEC005_LEDGER_SCHEMA,
  MEC005_VERIFICATION_SCHEMA,
  verifyMec005TwoHistoryCausalRootLedger,
} from "../scripts/eom/verify-mec005-two-history-causal-root-ledger.mjs";

const DIGEST_A = "a".repeat(64);
const DIGEST_B = "b".repeat(64);
const DIGEST_C = "c".repeat(64);

function quarantine() {
  return {
    status: "quarantined_unresolved",
    value_status: "not_derived",
    disposition: "Not advanced",
    prescription_ref: "absent",
    consumer_allowed: false,
  };
}

function root({
  stratumId,
  bundleId,
  emissionId,
  boundaryId,
}) {
  return {
    stratum_id: stratumId,
    bundle_id: bundleId,
    kind: "partner",
    multiplicity: 1,
    orientation: 1,
    strict_delay: true,
    identity_basis: [
      "history_digests",
      "ordered_bundle",
      "invariant_stratum_descriptor",
    ],
    proof_method: "independent_exact_stationary_control",
    incident_boundary_ids: [boundaryId],
    emission_provenance_id: emissionId,
    refinement_correspondence: {
      status: "canonical_stable",
      canonical_stratum_id: stratumId,
    },
  };
}

function boundary({
  boundaryId,
  bundleId,
  boundaryClass,
  rootStratumId = null,
  germId = null,
}) {
  const incidentHalfBranches =
    rootStratumId === null
      ? []
      : [
          {
            root_stratum_id: rootStratumId,
            germ_id: germId,
            orientation: 1,
            incidence_coefficient: 1,
          },
        ];
  return {
    boundary_id: boundaryId,
    bundle_id: bundleId,
    class: boundaryClass,
    scope: "bundle_local",
    multiplicity:
      boundaryClass === "structural_self_diagonal"
        ? "not_applicable_structural_boundary"
        : 1,
    incident_half_branches: incidentHalfBranches,
    refinement_correspondence: {
      status: "canonical_stable",
      canonical_boundary_id: boundaryId,
    },
    semantics: quarantine(),
  };
}

function bundle({
  bundleId,
  receiverLabel,
  transmitterLabel,
  coverageCellIds,
  rootStratumIds,
  boundaryStratumIds,
  leafSchema = "eom_root_completeness_certificate/v1",
}) {
  return {
    bundle_id: bundleId,
    receiver_label: receiverLabel,
    transmitter_label: transmitterLabel,
    kind: receiverLabel === transmitterLabel ? "self" : "partner",
    coverage_cell_ids: coverageCellIds,
    root_stratum_ids: rootStratumIds,
    boundary_stratum_ids: boundaryStratumIds,
    leaf_certificates: [
      {
        schema: leafSchema,
        digest: DIGEST_C,
      },
    ],
  };
}

function ownership(entityKind, entityId, ownerBundleId) {
  return {
    entity_kind: entityKind,
    entity_id: entityId,
    owner_bundle_id: ownerBundleId,
  };
}

function validCertificate() {
  return {
    schema: MEC005_LEDGER_SCHEMA,
    scope: {
      claim_scope: "pairwise_root_ledger_topology_and_provenance_only",
      field_speed: "1",
      self_root_admission: "all_positive_delay_roots",
      diagonal_boundary_semantics: "quarantined_unresolved",
      nonclaims: [
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
      ],
    },
    histories: [
      {
        label: "1",
        polarity: "-1",
        history_id: "history-one",
        history_digest: DIGEST_A,
      },
      {
        label: "2",
        polarity: "+1",
        history_id: "history-two",
        history_digest: DIGEST_B,
      },
    ],
    ordered_bundles: [
      bundle({
        bundleId: "1<-1",
        receiverLabel: "1",
        transmitterLabel: "1",
        coverageCellIds: ["cell-11-interior", "cell-11-diagonal"],
        rootStratumIds: [],
        boundaryStratumIds: ["boundary-11-diagonal"],
      }),
      bundle({
        bundleId: "1<-2",
        receiverLabel: "1",
        transmitterLabel: "2",
        coverageCellIds: ["cell-12-root"],
        rootStratumIds: ["root-12"],
        boundaryStratumIds: ["boundary-12-start"],
        leafSchema: "eom_root_continuation_certificate/v1",
      }),
      bundle({
        bundleId: "2<-1",
        receiverLabel: "2",
        transmitterLabel: "1",
        coverageCellIds: ["cell-21-root"],
        rootStratumIds: ["root-21"],
        boundaryStratumIds: ["boundary-21-start"],
        leafSchema: "eom_root_continuation_certificate/v1",
      }),
      bundle({
        bundleId: "2<-2",
        receiverLabel: "2",
        transmitterLabel: "2",
        coverageCellIds: ["cell-22-interior", "cell-22-diagonal"],
        rootStratumIds: [],
        boundaryStratumIds: ["boundary-22-diagonal"],
      }),
    ],
    coverage_cells: [
      {
        cell_id: "cell-11-interior",
        bundle_id: "1<-1",
        classification: "root_free",
        strict_delay: true,
      },
      {
        cell_id: "cell-11-diagonal",
        bundle_id: "1<-1",
        classification: "boundary_stratum",
        boundary_id: "boundary-11-diagonal",
      },
      {
        cell_id: "cell-12-root",
        bundle_id: "1<-2",
        classification: "simple_root_tube",
        strict_delay: true,
        root_stratum_id: "root-12",
      },
      {
        cell_id: "cell-21-root",
        bundle_id: "2<-1",
        classification: "simple_root_tube",
        strict_delay: true,
        root_stratum_id: "root-21",
      },
      {
        cell_id: "cell-22-interior",
        bundle_id: "2<-2",
        classification: "root_free",
        strict_delay: true,
      },
      {
        cell_id: "cell-22-diagonal",
        bundle_id: "2<-2",
        classification: "boundary_stratum",
        boundary_id: "boundary-22-diagonal",
      },
    ],
    root_strata: [
      root({
        stratumId: "root-12",
        bundleId: "1<-2",
        emissionId: "emission-12",
        boundaryId: "boundary-12-start",
      }),
      root({
        stratumId: "root-21",
        bundleId: "2<-1",
        emissionId: "emission-21",
        boundaryId: "boundary-21-start",
      }),
    ],
    boundary_strata: [
      boundary({
        boundaryId: "boundary-11-diagonal",
        bundleId: "1<-1",
        boundaryClass: "structural_self_diagonal",
      }),
      boundary({
        boundaryId: "boundary-12-start",
        bundleId: "1<-2",
        boundaryClass: "receiver_slab_edge",
        rootStratumId: "root-12",
        germId: "germ-12-start",
      }),
      boundary({
        boundaryId: "boundary-21-start",
        bundleId: "2<-1",
        boundaryClass: "receiver_slab_edge",
        rootStratumId: "root-21",
        germId: "germ-21-start",
      }),
      boundary({
        boundaryId: "boundary-22-diagonal",
        bundleId: "2<-2",
        boundaryClass: "structural_self_diagonal",
      }),
    ],
    incidence: [
      {
        boundary_id: "boundary-12-start",
        root_stratum_id: "root-12",
        germ_id: "germ-12-start",
        orientation: 1,
        incidence_coefficient: 1,
      },
      {
        boundary_id: "boundary-21-start",
        root_stratum_id: "root-21",
        germ_id: "germ-21-start",
        orientation: 1,
        incidence_coefficient: 1,
      },
    ],
    emission_provenance_cells: [
      {
        emission_provenance_id: "emission-12",
        owner_bundle_id: "1<-2",
      },
      {
        emission_provenance_id: "emission-21",
        owner_bundle_id: "2<-1",
      },
    ],
    ownership_index: [
      ownership("root_stratum", "root-12", "1<-2"),
      ownership("root_stratum", "root-21", "2<-1"),
      ownership(
        "boundary_stratum",
        "boundary-11-diagonal",
        "1<-1",
      ),
      ownership(
        "boundary_stratum",
        "boundary-12-start",
        "1<-2",
      ),
      ownership(
        "boundary_stratum",
        "boundary-21-start",
        "2<-1",
      ),
      ownership(
        "boundary_stratum",
        "boundary-22-diagonal",
        "2<-2",
      ),
      ownership(
        "emission_provenance_cell",
        "emission-12",
        "1<-2",
      ),
      ownership(
        "emission_provenance_cell",
        "emission-21",
        "2<-1",
      ),
    ],
    independent_verification: {
      producer_id: "future-mec005-envelope-producer",
      verifier_id: "mec005-independent-structural-node-v1",
      independently_authored: true,
      shared_implementation_components: [],
    },
    verdict: {
      topology_provenance: {
        verification_outcome: "Verification incomplete",
        disposition: "Not advanced",
      },
      overall_mec005_status: "Queued",
      consumer_ready: false,
    },
  };
}

function issueCodes(report) {
  return new Set(report.structural_stage.issues.map((issue) => issue.code));
}

test("structural stage passes while full-domain mathematics remains incomplete", () => {
  const report = verifyMec005TwoHistoryCausalRootLedger(
    validCertificate(),
  );

  assert.equal(report.schema, MEC005_VERIFICATION_SCHEMA);
  assert.equal(report.structural_stage.status, "passed");
  assert.equal(
    report.structural_stage.reach,
    "bounded_contract_shape_and_reference_checks",
  );
  assert.ok(
    report.structural_stage.outside_reach.includes(
      "exact_partition_tree_coverage_and_disjointness",
    ),
  );
  assert.deepEqual(report.structural_stage.issues, []);
  assert.equal(report.mathematical_stage.status, "not_implemented");
  assert.equal(
    report.overall.verification_outcome,
    "Verification incomplete",
  );
  assert.equal(report.overall.disposition, "Not advanced");
  assert.equal(report.overall.mec005_status, "Queued");
  assert.equal(report.overall.consumer_ready, false);
  assert.equal(report.boundary_semantics.value_status, "not_derived");
});

test("missing or reversed ordered bundles fail the structural stage", () => {
  const certificate = validCertificate();
  certificate.ordered_bundles = certificate.ordered_bundles.filter(
    (bundleRow) => bundleRow.bundle_id !== "2<-1",
  );

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  assert.equal(report.structural_stage.status, "failed");
  assert.ok(issueCodes(report).has("ordered_bundle_domain_incomplete"));
  assert.equal(report.overall.disposition, "Not advanced");
});

test("rank-derived identity and unreconciled v0 leaves are rejected", () => {
  const certificate = validCertificate();
  certificate.root_strata[0].identity_basis.push("root_rank");
  certificate.ordered_bundles[1].leaf_certificates[0].schema =
    "eom_root_completeness_certificate/v0";

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  const codes = issueCodes(report);
  assert.equal(report.structural_stage.status, "failed");
  assert.ok(codes.has("rank_derived_identity"));
  assert.ok(codes.has("leaf_schema_unreconciled"));
});

test("numeric diagonal semantics and missing diagonal carriers are rejected", () => {
  const certificate = validCertificate();
  certificate.boundary_strata[0].semantics.value = 0;
  certificate.boundary_strata = certificate.boundary_strata.filter(
    (row) => row.boundary_id !== "boundary-22-diagonal",
  );

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  const codes = issueCodes(report);
  assert.ok(codes.has("boundary_value_exposed"));
  assert.ok(codes.has("structural_self_diagonal_missing"));
  assert.equal(report.overall.consumer_ready, false);
});

test("nonreciprocal incidence and duplicate ownership are rejected", () => {
  const certificate = validCertificate();
  certificate.incidence[0].incidence_coefficient = -1;
  certificate.ownership_index.push(
    ownership("root_stratum", "root-12", "1<-2"),
  );

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  const codes = issueCodes(report);
  assert.ok(codes.has("incidence_not_reciprocal"));
  assert.ok(codes.has("duplicate_owner"));
});

test("bundle inventories and coverage references must close exactly", () => {
  const certificate = validCertificate();
  certificate.ordered_bundles[1].root_stratum_ids = [];
  certificate.coverage_cells[2].root_stratum_id = "root-21";

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  const codes = issueCodes(report);
  assert.ok(codes.has("bundle_entity_reference_mismatch"));
  assert.ok(codes.has("coverage_root_reference_mismatch"));
});

test("root-side incidence and stable boundary identity are reciprocal", () => {
  const certificate = validCertificate();
  certificate.root_strata[0].incident_boundary_ids.push(
    "boundary-11-diagonal",
  );
  certificate.boundary_strata[1].refinement_correspondence
    .canonical_boundary_id = "different-boundary";

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  const codes = issueCodes(report);
  assert.ok(codes.has("root_incidence_row_missing"));
  assert.ok(codes.has("boundary_refinement_identity_mismatch"));
});

test("same-implementation parity cannot establish independence", () => {
  const certificate = validCertificate();
  certificate.independent_verification.shared_implementation_components = [
    "producer_root_canonicalization",
  ];

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  assert.ok(issueCodes(report).has("same_implementation_parity"));
  assert.equal(
    report.mathematical_stage.verification_outcome,
    "Verification incomplete",
  );
});

test("a structural packet cannot claim a full-domain advance", () => {
  const certificate = validCertificate();
  certificate.scope.nonclaims = certificate.scope.nonclaims.filter(
    (item) => item !== "mec002_update_law",
  );
  certificate.verdict.topology_provenance = {
    verification_outcome: "Verification passed",
    disposition: "Advanced",
  };
  certificate.verdict.consumer_ready = true;

  const report = verifyMec005TwoHistoryCausalRootLedger(certificate);
  assert.ok(issueCodes(report).has("unearned_topology_verdict"));
  assert.ok(issueCodes(report).has("nonclaims_incomplete"));
  assert.equal(report.overall.mec005_status, "Queued");
  assert.equal(report.overall.consumer_ready, false);
});

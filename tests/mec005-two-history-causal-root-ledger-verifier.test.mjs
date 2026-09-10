import assert from "node:assert/strict";
import test from "node:test";

import {
  reconstructMec005AffineHistoryLedger,
  verifyMec005AffineHistoryLedger,
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

// Closed-form controls are independent mathematical expectations. The original
// structural fixtures and the existing Python acceptance reference stay fixed.
function stationaryRaw() {
  return { representation: "exact_collinear_piecewise_affine/v1", field_speed: "1",
    memory_lower: "-4", reception_interval: ["0", "1"], histories: [
      { label: "1", polarity: "-1", knots: [["-4", "0"], ["1", "0"]] },
      { label: "2", polarity: "+1", knots: [["-4", "2"], ["1", "2"]] },
    ] };
}

test("affine known case: stationary separation two has only s=T-2 partner roots", () => {
  const ledger = reconstructMec005AffineHistoryLedger(stationaryRaw());
  assert.equal(ledger.status, "reconstructed");
  assert.deepEqual(ledger.ordered_bundles, ["1<-1", "1<-2", "2<-1", "2<-2"]);
  assert.deepEqual(ledger.root_strata.map((r) => [r.bundle_id, r.emission_line,
    r.receiver_interval, r.multiplicity, r.transmitter_factor]), [
    ["1<-2", ["1", "-2"], ["0", "1"], 1, "1"],
    ["2<-1", ["1", "-2"], ["0", "1"], 1, "1"],
  ]);
  assert.equal(ledger.boundary_strata.length, 4);
  assert.equal(ledger.diagonal_carriers.length, 2);
  assert.equal(ledger.complement_factors.length, 8);
  assert.ok(ledger.diagonal_carriers.every((d) => d.semantics.consumer_allowed === false));
});

function foldedRaw() {
  // Hand reference: x1=-4,2s,0 and x2=9/2,1/2-2s,1/2
  // on [-8,-2],[-2,0],[0,1], respectively. These are prescribed
  // continuous corner histories, not C1 histories or an EOM trajectory.
  return { representation: "exact_collinear_piecewise_affine/v1", field_speed: "1",
    memory_lower: "-8", reception_interval: ["0", "1"], histories: [
      { label: "1", polarity: "-1", knots: [["-8", "-4"], ["-2", "-4"], ["0", "0"], ["1", "0"]] },
      { label: "2", polarity: "+1", knots: [["-8", "9/2"], ["-2", "9/2"], ["0", "1/2"], ["1", "1/2"]] },
    ] };
}

const geometryRows = (ledger) => ledger.root_strata.map((r) =>
  [r.bundle_id, r.emission_line, r.receiver_interval, r.orientation, r.signed_playback])
  .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

test("affine target: hand-derived ten branches include four self rows and corner incidence", () => {
  const ledger = reconstructMec005AffineHistoryLedger(foldedRaw());
  assert.equal(ledger.status, "reconstructed");
  const expected = [];
  for (const bundle of ["1<-1", "2<-2"]) {
    expected.push([bundle, ["1", "-4"], ["0", "1"], 1, "1"]);
    expected.push([bundle, ["-1", "0"], ["0", "1"], -1, "-1"]);
  }
  for (const bundle of ["1<-2", "2<-1"]) {
    expected.push([bundle, ["1", "-9/2"], ["0", "1"], 1, "1"]);
    expected.push([bundle, ["-1", "1/2"], ["1/2", "1"], -1, "-1"]);
    expected.push([bundle, ["1", "-1/2"], ["1/2", "1"], 1, "1"]);
  }
  expected.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  assert.deepEqual(geometryRows(ledger), expected);
  assert.equal(ledger.incidence.length, 20);
  assert.equal(ledger.boundary_strata.length, 18);
  assert.equal(ledger.complement_factors.length, 24);
  const corners = ledger.boundary_strata.filter((b) => b.point.join(",") === "1/2,0");
  assert.equal(corners.length, 2); // distinct ordered-bundle events
  for (const corner of corners) {
    assert.deepEqual(corner.faces, ["transmitter_knot"]);
    assert.equal(corner.incident_half_branches.length, 2);
    assert.equal(corner.incident_half_branches.reduce((sum, h) => sum + h.orientation, 0), 0);
    assert.ok(corner.incident_half_branches.every((h) => h.incidence_coefficient === -1));
  }
});

test("affine raw comparison rejects omissions, duplicates, false multiplicity and swapped line coordinates", () => {
  const raw = foldedRaw();
  const ledger = reconstructMec005AffineHistoryLedger(raw);
  // These replay-based mutations test rejection plumbing only, not correctness.
  for (const mutate of [
    (l) => l.root_strata.pop(),
    (l) => l.root_strata.push(structuredClone(l.root_strata[0])),
    (l) => l.boundary_strata.push(structuredClone(l.boundary_strata[0])),
    (l) => l.incidence.pop(),
    (l) => { l.root_strata[0].multiplicity = 2; },
    (l) => l.root_strata[0].emission_line.reverse(),
    (l) => l.complement_factors.pop(),
    (l) => { l.diagonal_carriers[0].semantics.consumer_allowed = true; },
  ]) {
    const wrong = structuredClone(ledger);
    mutate(wrong);
    assert.equal(verifyMec005AffineHistoryLedger(raw, wrong).status, "failed_or_unresolved");
  }
});

test("affine refinement correspondence is invariant under rational subdivision and traversal permutation", () => {
  const raw = foldedRaw();
  const before = reconstructMec005AffineHistoryLedger(raw);
  raw.histories[0].knots.splice(1, 0, ["-5", "-4"]);
  raw.histories[0].knots.splice(3, 0, ["-1", "-2"]);
  raw.histories[1].knots.splice(1, 0, ["-5", "9/2"]);
  raw.histories.reverse();
  const after = reconstructMec005AffineHistoryLedger(raw);
  assert.deepEqual(after, before);
  const reordered = structuredClone(before);
  reordered.root_strata.reverse();
  reordered.incidence.reverse();
  assert.equal(verifyMec005AffineHistoryLedger(raw, reordered).status, "bounded_geometry_matched");
  reordered.root_strata.forEach((r, k) => { r.stratum_id = `rank-${k}`; });
  assert.equal(verifyMec005AffineHistoryLedger(raw, reordered).status, "failed_or_unresolved");
  const changed = foldedRaw();
  changed.histories[0].knots[1][1] = "-3";
  assert.equal(verifyMec005AffineHistoryLedger(changed, before).status, "failed_or_unresolved");
});

test("affine degeneracies and unsupported accumulated histories remain unresolved", () => {
  const raw = stationaryRaw();
  raw.histories[0].knots = [["-4", "-4"], ["1", "1"]];
  const rail = reconstructMec005AffineHistoryLedger(raw);
  assert.equal(rail.status, "unresolved");
  assert.match(rail.reason, /root interval/u);
  raw.representation = "smooth_history_with_accumulating_roots";
  assert.equal(reconstructMec005AffineHistoryLedger(raw).status, "unresolved");
  raw.representation = "exact_collinear_piecewise_affine/v1";
  raw.histories[0].knots[0][0] = -4;
  assert.equal(reconstructMec005AffineHistoryLedger(raw).status, "unresolved");
});

test("affine asymmetric control keeps receiver playback distinct and owns the memory endpoint", () => {
  const raw = stationaryRaw();
  raw.histories[1].knots = [["-4", "-5"], ["1", "5"]]; // x2=3+2t
  const ledger = reconstructMec005AffineHistoryLedger(raw);
  assert.equal(ledger.status, "reconstructed");
  assert.deepEqual(geometryRows(ledger), [
    ["1<-2", ["-1", "-3"], ["0", "1"], -1, "-1"],
    ["1<-2", ["1/3", "-1"], ["0", "1"], 1, "1/3"],
    ["2<-1", ["-1", "-3"], ["0", "1"], 1, "-1"],
  ]);
  assert.equal(ledger.root_strata.find((r) => r.signed_playback === "1/3").transmitter_factor, "3");
  assert.equal(ledger.root_strata.find((r) => r.bundle_id === "2<-1").transmitter_factor, "1");
  const edge = ledger.boundary_strata.find((b) => b.point.join(",") === "1,-4");
  assert.deepEqual(edge.faces, ["receiver_end", "memory_edge"]);
  assert.equal(edge.incident_half_branches.length, 1);
  assert.equal(edge.unsigned_root_count_jump, -1);
  assert.equal(edge.semantics.value_status, "not_derived");
});

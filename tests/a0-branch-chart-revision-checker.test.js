import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(
  new URL("../scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs", import.meta.url)
);

function rootRows({ rawTransportIds = false, includeLockedRows = false } = {}) {
  const roots = [];
  const period = 16;
  const pushRoot = ({ source, theta, index, locked = false }) => {
    const rootKey = `I+|${source}|inter_layer|active`;
    roots.push({
      root_key: rootKey,
      receiver: "I+",
      source,
      relation: "inter_layer",
      status: "active",
      t: index,
      theta,
      D_tau: 1,
      D_J: 1,
      G_r: 1,
      transport_id: rawTransportIds
        ? `${rootKey}|phase_bucket:${index}`
        : `single_artifact_root_transport:${roots.length}`,
      transport_identity_components: {
        root_key: rootKey,
        cyclic_slot: index,
        same_key_root_count: period,
      },
      transport_identity_status: "single_artifact_not_refinement_stable",
      locked_fold_layer_key: locked,
    });
  };
  for (let index = 0; index < period; index += 1) {
    const phase = (2 * Math.PI * index) / period;
    for (const [source, theta] of [
      ["M+", phase],
      ["O+", 2 * phase],
    ]) {
      pushRoot({ source, theta, index });
    }
    if (includeLockedRows) {
      pushRoot({ source: "M-", theta: phase, index, locked: true });
    }
  }
  return roots;
}

function fixture({
  declaredQuotients = ["source_layer_shear"],
  rawTransportIds = false,
  includeLockedRows = false,
  validationStable = false,
  rootTransportCertified = false,
  identityStable = false,
  phaseOriginCertified = false,
} = {}) {
  const roots = rootRows({ rawTransportIds, includeLockedRows });
  const activeRoots = roots.map((root) => ({
    receiver: root.receiver,
    source: root.source,
    relation: root.relation,
    status: root.status,
    t: root.t,
    delay: 0.5 + root.t / 100 + (root.source === "O+" ? 0.05 : 0),
    J: 1.2 + root.t / 80 + (root.source === "O+" ? 0.07 : 0),
  }));
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    rows: [
      {
        schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
        row: 1,
        period: 16,
        status: "failed_direct_one_period_residuals",
        validation: {
          benchmark_inputs_excluded: true,
          root_ledger_stable_under_refinement: validationStable,
          direct_residuals_passed: false,
        },
        residual_ledgers: {
          refined_i_receiver_phase_bin_residual_balance: {
            schema: "a0-tier1-refined-residual-basis-ledger/v1",
            status: "refined_basis_no_go",
            relative_residual: 0.35,
            tolerance: 0.02,
            basis_group_count: 4,
            equation_count: 48,
            sample_count: 16,
            basis_resolution: {
              basis_mode: "i_receiver_root_key_phase_bin",
              equality_group_key:
                "for receiver_layer:I: relation + receiver_layer + source_layer + polarity_pair + root_key + phase_bin + projection",
            },
            equality_constraints: {
              root_key_resolved_mu_test: true,
              phase_bin_branch_coordinate_test: true,
              locked_fold_layer_keys_excluded: true,
              benchmark_inputs_excluded: true,
            },
            sampled_forcing: {
              period: 16,
              samples: Array.from({ length: 16 }, (_entry, index) => ({
                t: index,
                layers: {
                  I: {
                    residual_forcing: [0, 0, 0],
                  },
                },
              })),
            },
          },
        },
        active_causal_root_ledger: activeRoots,
        branch_chart_source_records: {
          root_transport_source_record: {
            schema: "a0-root-transport-source-record/v1",
            source: "active_causal_root_ledger",
            coordinate_family: "I_receiver_inter_layer_J_delay_shear",
            period: 16,
            root_count: roots.length,
            active_root_count: roots.length,
            bucket_spacing: 1,
            gap_normalizer: 1,
            gap_source: "nearest_same-key_active_root_time_gap",
            default_root_transport_quotient: "source_layer_shear",
            declared_root_transport_quotients: declaredQuotients,
            transport_identity_schema: "a0-root-transport-identity/v1",
            transport_identity_scope: "single_artifact_cyclic_root_slot",
            transport_identity_rule:
              "transport_id is scoped to this synthetic artifact and is not a refinement-stable transport identity.",
            transport_identity_refinement_stable: identityStable,
            phase_origin_covariance_schema: "a0-root-transport-phase-origin-covariance/v1",
            phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
            phase_origin_covariance_certified: phaseOriginCertified,
            phase_origin_tested_offsets: [0],
            phase_origin_covariance_rule:
              "A future certificate must compare quotient features after cyclic reindexing.",
            phase_origin_rule:
              "theta=2*pi*(t-delay)/T mod 2*pi; D_tau and D_J use cyclic central differences by root_key over observation phase.",
            equality_group_key:
              "receiver + source + relation + status + declared quotient + phase origin + single-artifact transport slot",
            locked_fold_layer_keys_excluded: true,
            benchmark_inputs_excluded: true,
            root_transport_certified: rootTransportCertified,
            transport_certification_status: "single-artifact-source-record-only",
            roots,
          },
        },
      },
    ],
  };
}

function activeRootLedgerFingerprint(row) {
  const roots = (row.active_causal_root_ledger ?? [])
    .map((root) => ({
      root_key: `${root.receiver}|${root.source}|${root.relation}|${root.status}`,
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      status: root.status,
      t: root.t,
      delay: root.delay,
      J: root.J,
    }))
    .sort((left, right) => {
      const keyComparison = String(left.root_key).localeCompare(String(right.root_key));
      return keyComparison !== 0 ? keyComparison : Number(left.t) - Number(right.t);
    });
  return crypto.createHash("sha256").update(JSON.stringify({ period: row.period, roots })).digest("hex");
}

function sourceRecordFingerprint(record) {
  const payload = {
    period: record?.period ?? null,
    coordinate_family: record?.coordinate_family ?? null,
    source: record?.source ?? null,
    gap_source: record?.gap_source ?? null,
    locked_fold_layer_keys_excluded: record?.locked_fold_layer_keys_excluded === true,
    benchmark_inputs_excluded: record?.benchmark_inputs_excluded === true,
    declared_root_transport_quotients: (record?.declared_root_transport_quotients ?? []).slice().sort(),
    roots: (record?.roots ?? [])
      .map((root) => ({
        root_key: root?.root_key ?? null,
        receiver: root?.receiver ?? null,
        source: root?.source ?? null,
        relation: root?.relation ?? null,
        status: root?.status ?? null,
        t: root?.t ?? null,
        theta: root?.theta ?? null,
        D_tau: root?.D_tau ?? null,
        D_J: root?.D_J ?? null,
        G_r: root?.G_r ?? null,
        locked_fold_layer_key: root?.locked_fold_layer_key === true,
      }))
      .sort((left, right) => {
        const keyComparison = String(left.root_key).localeCompare(String(right.root_key));
        return keyComparison !== 0 ? keyComparison : Number(left.t) - Number(right.t);
      }),
  };
  return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function passedRootLedgerCertificate({
  intakePath,
  artifact,
  row = 1,
  rootCount = 32,
  variantSchema = "a0-tier1-fold-layer-locked-one-period-attempt/v1",
  variantKind = "delta_t_refinement",
  tolerance = 1e-9,
  maxFieldRelativeDelta = 0,
  sourceContractOverrides = {},
  comparisonOverrides = {},
} = {}) {
  const sourceRow = artifact.rows.find((entry) => entry.row === row);
  return {
    artifact_schema: "a0-root-ledger-refinement-stability-certificate/v1",
    status: "root_ledger_refinement_stability_certificate_passed",
    failure_code: null,
    accepted_history_boundary: false,
    rerun_authority: "certificate_only_not_corrected_rerun_authority",
    inputs: {
      baseline: intakePath,
      variant: path.join(path.dirname(intakePath), "root-ledger-refinement-variant.json"),
      baseline_row: row,
      variant_row: row,
      baseline_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
      variant_schema: variantSchema,
      variant_kind: variantKind,
    },
    parameters: {
      tolerance,
      matching_rule:
        "receiver|source|relation|status + cyclic order at fixed period; no transport_id or phase-origin reindexing",
      phase_origin_reindexing_allowed: false,
      variant_kind_required_for_pass: true,
    },
    source_contract: {
      baseline_period: sourceRow.period,
      variant_period: sourceRow.period,
      baseline_root_count: rootCount,
      variant_root_count: rootCount,
      active_root_ledger_fingerprint_algorithm: "sha256-canonical-a0-active-root-ledger-v1",
      baseline_active_root_ledger_fingerprint: activeRootLedgerFingerprint(sourceRow),
      variant_active_root_ledger_fingerprint:
        variantSchema === "a0-tier1-continuation-source-prototype/v1"
          ? activeRootLedgerFingerprint(sourceRow)
          : "synthetic-root-ledger-variant-fingerprint",
      metadata_mismatches: [],
      phase_origin_variant_evidence: [],
      ...sourceContractOverrides,
    },
    certificate: {
      root_ledger_stable_under_refinement: true,
      matched_without_transport_id: true,
      phase_origin_shift_used_for_matching: false,
      phase_origin_variant_detected: false,
      comparison: {
        matched_root_count: rootCount,
        mismatch_count: 0,
        mismatches: [],
        field_drift_count: 0,
        first_field_drift: null,
        max_time_delta: 0,
        max_field_abs_delta: 0,
        max_field_relative_delta: maxFieldRelativeDelta,
        ...comparisonOverrides,
      },
    },
  };
}

function passedCertificate({ intakePath, artifact, row = 1, rootCount = 32, quotient = "source_layer_shear" }) {
  const record = artifact.rows.find((entry) => entry.row === row)?.branch_chart_source_records?.root_transport_source_record;
  return {
    artifact_schema: "a0-root-transport-refinement-certificate/v1",
    status: "root_transport_refinement_certificate_passed",
    failure_code: null,
    accepted_history_boundary: false,
    rerun_authority: "certificate_only_not_corrected_rerun_authority",
    inputs: {
      baseline: intakePath,
      variant: path.join(path.dirname(intakePath), "variant.json"),
      baseline_row: row,
      variant_row: row,
      baseline_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
      variant_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
      variant_kind: "declared_phase_origin_bucket_shift",
    },
    parameters: {
      quotient,
      phase_shift_buckets: 2,
      declared_phase_shift_required_for_pass: true,
      matching_rule: "root_key + cyclic order; transport_id is not used as identity",
      tolerance: 1e-9,
    },
    source_contract: {
      baseline_root_count: rootCount,
      variant_root_count: rootCount,
      baseline_transport_identity_scope: "single_artifact_cyclic_root_slot",
      variant_transport_identity_scope: "single_artifact_cyclic_root_slot",
      baseline_phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
      variant_phase_origin_covariance_status: "single-artifact-phase-origin-not-certified",
      transport_id_used_for_matching: false,
      source_record_fingerprint_algorithm: "sha256-canonical-root-transport-source-record-v1",
      baseline_source_record_fingerprint: sourceRecordFingerprint(record),
      variant_source_record_fingerprint: "synthetic-variant-fingerprint",
      metadata_mismatches: [],
    },
    certificate: {
      transport_identity_refinement_stable: true,
      phase_origin_covariance_certified: true,
      diagnostic_phase_shift_detected: false,
      matched_without_transport_id: true,
      comparison: {
        phase_shift_buckets: 2,
        matched_root_count: rootCount,
        feature_bucket_count: 16,
        feature_sample_count: 16,
        mismatch_count: 0,
        mismatches: [],
        root_field_drift_count: 0,
        first_root_field_drift: null,
        max_feature_abs_delta: 0,
        max_feature_relative_delta: 0,
      },
    },
  };
}

function runChecker(artifact, args = [], options = {}) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "a0-branch-checker-"));
  const intakePath = path.join(tempDir, "intake.json");
  const outPath = path.join(tempDir, "out.json");
  fs.writeFileSync(intakePath, JSON.stringify(artifact), "utf8");
  const cliArgs = [scriptPath, "--intake", intakePath, "--out", outPath, "--pretty", ...args];
  if (options.certificate) {
    const certificate =
      typeof options.certificate === "function"
        ? options.certificate({ intakePath, artifact })
        : options.certificate;
    const certificatePath = path.join(tempDir, "certificate.json");
    fs.writeFileSync(certificatePath, JSON.stringify(certificate), "utf8");
    cliArgs.push("--root-transport-certificate", certificatePath);
  }
  if (options.rootLedgerCertificate) {
    const certificate =
      typeof options.rootLedgerCertificate === "function"
        ? options.rootLedgerCertificate({ intakePath, artifact })
        : options.rootLedgerCertificate;
    const certificatePath = path.join(tempDir, "root-ledger-stability-certificate.json");
    fs.writeFileSync(certificatePath, JSON.stringify(certificate), "utf8");
    cliArgs.push("--root-ledger-stability-certificate", certificatePath);
  }
  execFileSync(process.execPath, cliArgs, {
    encoding: "utf8",
  });
  return JSON.parse(fs.readFileSync(outPath, "utf8"));
}

test("residual-surface harmonic audit fails closed as hidden fitting", () => {
  const output = runChecker(
    fixture({
      validationStable: true,
      rootTransportCertified: true,
      identityStable: true,
      phaseOriginCertified: true,
    })
  );
  const row = output.rows[0];

  assert.equal(row.status, "rejected_hidden_fit_split");
  assert.equal(row.anti_overfit_residual.R_src.status, "failed");
  assert.equal(row.anti_overfit_residual.R_src.failure_code, "rejected_hidden_fit_split");
  assert.equal(row.rerun_authority, "blocked_before_corrected_rerun");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.promotion_boundary.accepted_branch_promotion, false);
  assert.equal(row.promotion_boundary.accepted_physics_claim, false);
});

test("root-transport source-declared quotient fails closed on identity certification", () => {
  const output = runChecker(fixture(), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-identity-not-refinement-stable");
  assert.equal(row.anti_overfit_residual.R_src.status, "passed");
  assert.equal(row.anti_overfit_residual.R_df.status, "passed");
  assert.equal(row.anti_overfit_residual.R_xval.status, "passed");
  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.failure_code, "root-transport-identity-not-refinement-stable");
});

test("root-transport diagnostic quotient is rejected unless source-declared", () => {
  const output = runChecker(fixture(), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_signed_polarity_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-quotient-not-source-declared");
  assert.equal(row.anti_overfit_residual.R_src.status, "failed");
  assert.equal(row.anti_overfit_residual.R_src.failure_code, "root-transport-quotient-not-source-declared");
});

test("root-transport checker flags raw root-key phase-bucket transport ids", () => {
  const output = runChecker(fixture({ rawTransportIds: true }), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.status, "root-transport-identity-uses-raw-root-key-phase-bucket");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-transport-identity-uses-raw-root-key-phase-bucket"
  );
  assert.equal(row.anti_overfit_residual.R_transport.raw_root_key_phase_bucket_transport_id_count, 32);
});

test("root-transport checker reports locked roots as excluded from feature rows", () => {
  const output = runChecker(fixture({ includeLockedRows: true }), [
    "--coordinate-source",
    "root_transport_source_record",
    "--root-transport-quotient",
    "source_layer_shear",
  ]);
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_coord.selected_locked_root_count, 0);
  assert.equal(row.anti_overfit_residual.R_coord.excluded_locked_root_count, 16);
  assert.equal(row.harmonic_audit.root_transport_coordinate.source_record_root_count, 48);
  assert.equal(row.anti_overfit_residual.R_df.full_column_rank, true);
});

test("root-transport checker keeps certificate-like records pending without source certification flags", () => {
  const output = runChecker(
    fixture({
      identityStable: true,
      phaseOriginCertified: true,
    }),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"]
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.failure_code, "branch_transport_not_yet_certified");
  assert.equal(row.anti_overfit_residual.R_transport.root_transport_certified, false);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement, false);
  assert.equal(row.rerun_authority, "blocked_before_corrected_rerun");
  assert.equal(row.accepted_history_boundary, false);
});

test("root-transport checker consumes an explicit passed certificate for R_transport only", () => {
  const output = runChecker(
    fixture({ validationStable: true }),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      certificate: ({ intakePath, artifact }) => passedCertificate({ intakePath, artifact }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "passed");
  assert.equal(row.anti_overfit_residual.R_transport.root_transport_certified_by_certificate, true);
  assert.equal(row.anti_overfit_residual.R_transport.external_certificate.status, "passed");
  assert.equal(row.rerun_authority, "corrected_rerun_input_check_only_not_accepted_history");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.summary.accepted_history_row_count, 0);
});

test("root-ledger stability certificate is evidence but not corrected-rerun authority", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      rootLedgerCertificate: ({ intakePath, artifact }) => passedRootLedgerCertificate({ intakePath, artifact }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement_by_certificate, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement_effective, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_refinement_stability_certificate_only, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement_rerun_authorizing, false);
  assert.equal(row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.status, "passed");
  assert.equal(row.rerun_authority, "blocked_before_corrected_rerun");
});

test("root-ledger stability certificate accepts carrier-replay diagnostic schema as evidence only", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      certificate: ({ intakePath, artifact }) => passedCertificate({ intakePath, artifact }),
      rootLedgerCertificate: ({ intakePath, artifact }) =>
        passedRootLedgerCertificate({
          intakePath,
          artifact,
          variantSchema: "a0-tier1-continuation-source-prototype/v1",
          variantKind: "carrier_root_replay_refinement",
          tolerance: 0.00001,
          maxFieldRelativeDelta: 0.0000005,
          sourceContractOverrides: {
            refinement_evidence_source: "carrier_replay_root_refinement_diagnostic",
            refinement_diagnostic_status: "carrier-root-ledger-refinement-passed",
            refinement_diagnostic_scope: "carrier_root_replay_only",
            refinement_diagnostic_warning_code: "carrier-root-refinement-J-drift-reported",
          },
          comparisonOverrides: {
            carrier_root_replay: {
              shared_observation_time_count: 16,
              max_delay_drift: 0.000001,
              J_drift_count: 32,
            },
          },
        }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-ledger-refinement-stability-certificate-only-not-rerun-authority"
  );
  assert.equal(row.anti_overfit_residual.R_transport.root_transport_certified_by_certificate, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement_by_certificate, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_refinement_stability_certificate_only, true);
  assert.equal(row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.status, "passed");
  assert.equal(
    row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.variant_kind,
    "carrier_root_replay_refinement"
  );
  assert.equal(row.rerun_authority, "blocked_before_corrected_rerun");
});

test("root-ledger stability certificate rejects carrier-replay schema without diagnostic contract", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      rootLedgerCertificate: ({ intakePath, artifact }) =>
        passedRootLedgerCertificate({
          intakePath,
          artifact,
          variantSchema: "a0-tier1-continuation-source-prototype/v1",
          variantKind: "carrier_root_replay_refinement",
        }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-ledger-stability-certificate-carrier-replay-evidence-source-mismatch"
  );
  assert.equal(row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.status, "failed");
});

test("root-transport and root-ledger certificates remain pending when row stability is certificate-only", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      certificate: ({ intakePath, artifact }) => passedCertificate({ intakePath, artifact }),
      rootLedgerCertificate: ({ intakePath, artifact }) => passedRootLedgerCertificate({ intakePath, artifact }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-ledger-refinement-stability-certificate-only-not-rerun-authority"
  );
  assert.equal(row.anti_overfit_residual.R_transport.root_transport_certified_by_certificate, true);
  assert.equal(row.anti_overfit_residual.R_transport.root_ledger_stable_under_refinement_by_certificate, true);
  assert.equal(row.rerun_authority, "blocked_before_corrected_rerun");
  assert.equal(row.accepted_history_boundary, false);
});

test("root-ledger stability certificate rejects accepted-history boundary", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      rootLedgerCertificate: ({ intakePath, artifact }) => ({
        ...passedRootLedgerCertificate({ intakePath, artifact }),
        accepted_history_boundary: true,
      }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-ledger-stability-certificate-accepted-history-boundary-not-false"
  );
  assert.equal(row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.status, "failed");
});

test("root-ledger stability certificate rejects phase-origin variant kind", () => {
  const output = runChecker(
    fixture(),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      rootLedgerCertificate: ({ intakePath, artifact }) =>
        passedRootLedgerCertificate({
          intakePath,
          artifact,
          variantKind: "declared_phase_origin_bucket_shift",
        }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(
    row.anti_overfit_residual.R_transport.failure_code,
    "root-ledger-stability-certificate-phase-origin-variant-kind"
  );
  assert.equal(row.anti_overfit_residual.R_transport.external_root_ledger_stability_certificate.status, "failed");
});

test("root-transport checker rejects diagnostic-only certificate input", () => {
  const output = runChecker(
    fixture({ validationStable: true }),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      certificate: ({ intakePath, artifact }) => ({
        ...passedCertificate({ intakePath, artifact }),
        status: "root_transport_phase_shift_diagnostic_only",
        failure_code: "root-transport-phase-shift-not-declared",
        parameters: {
          ...passedCertificate({ intakePath, artifact }).parameters,
          phase_shift_buckets: "auto",
        },
        certificate: {
          ...passedCertificate({ intakePath, artifact }).certificate,
          diagnostic_phase_shift_detected: true,
        },
      }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.failure_code, "root-transport-certificate-not-passed");
  assert.equal(row.anti_overfit_residual.R_transport.external_certificate.status, "failed");
});

test("root-transport checker rejects certificate with wrong baseline row", () => {
  const output = runChecker(
    fixture({ validationStable: true }),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"],
    {
      certificate: ({ intakePath, artifact }) => passedCertificate({ intakePath, artifact, row: 2 }),
    }
  );
  const row = output.rows[0];

  assert.equal(row.anti_overfit_residual.R_transport.status, "pending");
  assert.equal(row.anti_overfit_residual.R_transport.failure_code, "root-transport-certificate-baseline-row-mismatch");
});

test("root-transport checker can emit rerun-candidate boundary without accepted history", () => {
  const output = runChecker(
    fixture({
      validationStable: true,
      rootTransportCertified: true,
      identityStable: true,
      phaseOriginCertified: true,
    }),
    ["--coordinate-source", "root_transport_source_record", "--root-transport-quotient", "source_layer_shear"]
  );
  const row = output.rows[0];

  assert.equal(row.status, "revision_candidate_only");
  assert.equal(row.rerun_authority, "corrected_rerun_input_check_only_not_accepted_history");
  assert.equal(row.accepted_history_boundary, false);
  assert.equal(row.promotion_boundary.corrected_rerun_candidate, true);
  assert.equal(row.promotion_boundary.accepted_history_boundary, false);
  assert.equal(row.promotion_boundary.accepted_branch_promotion, false);
  assert.equal(row.promotion_boundary.accepted_physics_claim, false);
  assert.equal(
    row.promotion_boundary.accepted_branch_promotion_authority,
    "blocked_until_master_equation_branch_chart_basis"
  );
  assert.equal(
    row.promotion_boundary.required_dependency,
    "master-equation-closure matching dynamics/branch-chart basis"
  );
  assert.equal(output.accepted_history_boundary, false);
  assert.equal(output.promotion_boundary.corrected_rerun_candidate, true);
  assert.equal(output.promotion_boundary.accepted_branch_promotion, false);
  assert.equal(output.promotion_boundary.accepted_physics_claim, false);
  assert.equal(output.summary.accepted_history_row_count, 0);
  assert.equal(output.summary.accepted_branch_promotion_row_count, 0);
});

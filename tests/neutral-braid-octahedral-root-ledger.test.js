import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_ROOT_LEDGER_SCHEMA,
  buildOctahedralRootLedger,
  orderedOctahedralPairs,
  validateOctahedralRootLedger,
} from "../scripts/neutral-braid/octahedral-root-ledger.mjs";

test("octahedral root ledger samples all ordered distinct neutral-braid pairs", () => {
  const artifact = buildOctahedralRootLedger({ phaseSamples: 37, ySubdivisions: 240 });
  const errors = validateOctahedralRootLedger(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-root-ledger/v1");
  assert.equal(artifact.packet_id, "octahedral_root_ledger_diagnostic");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.site_inventory.sites.length, 6);
  assert.deepEqual(artifact.site_inventory.polarity_balance, {
    positive: 3,
    negative: 3,
    q_core_units: 0,
  });
  assert.equal(artifact.all_pairs_root_ledger.pair_rows.length, 30);
  assert.equal(artifact.all_pairs_root_ledger.sampled_summary.partner_pair_count, 6);
  assert.equal(artifact.all_pairs_root_ledger.sampled_summary.cross_binary_pair_count, 24);
  assert.equal(artifact.all_pairs_root_ledger.sampled_summary.root_count_per_pair_sample_min, 1);
  assert.equal(artifact.all_pairs_root_ledger.sampled_summary.root_count_per_pair_sample_max, 1);
  assert.equal(artifact.all_pairs_root_ledger.sampled_summary.failed_node_count, 0);
  assert.equal(artifact.artifact_claim.certifies_root_ledger, true);
  assert.equal(artifact.all_pairs_root_ledger.status, "all-pairs-root-ledger-certified");
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.all_pairs.certified_pair_count, 30);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.all_pairs.certifies_full_root_ledger, true);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.all_pairs.global_delay_bounds[0] > 0, true);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.all_pairs.global_delay_bounds[1] < 2, true);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.all_pairs.global_jacobian_floor > 0.37, true);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.antipodal_partner.certified_pair_count, 6);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.antipodal_partner.uncertified_pair_count, 24);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.antipodal_partner.certifies_full_root_ledger, false);
  assert.equal(artifact.all_pairs_root_ledger.root_certificates.antipodal_partner.rows.length, 6);
  assert.ok(
    artifact.all_pairs_root_ledger.root_certificates.antipodal_partner.rows.every(
      (row) => row.source_relation === "antipodal-partner" && row.jacobian_certificate.floor > 1
    )
  );
  const crossCertificate = artifact.all_pairs_root_ledger.root_certificates.cross_binary;
  assert.equal(crossCertificate.status, "certified-cross-binary-root-certificate");
  assert.equal(crossCertificate.certified_pair_count, 24);
  assert.equal(crossCertificate.certifies_full_cross_binary_ledger, true);
  assert.equal(crossCertificate.rows.length, 24);
  assert.equal(new Set(crossCertificate.rows.map((row) => `${row.receiver}->${row.source}`)).size, 24);
  assert.ok(crossCertificate.rows.every((row) => row.source_relation === "cross-binary"));
  assert.ok(crossCertificate.rows.every((row) => row.status === "certified-cross-binary-root"));
  assert.ok(crossCertificate.rows.every((row) => row.theta_cover.cell_count === 1));
  assert.ok(crossCertificate.rows.every((row) => row.active_root.root_count === "exactly-one-positive-root"));
  assert.ok(crossCertificate.rows.every((row) => row.inactive_gaps.length === 3));
  assert.ok(crossCertificate.jacobian_floor > 0.37);
  assert.equal(artifact.all_pairs_root_ledger.certification_gap.status, "closed-by-analytic-root-certificate");
  assert.ok(artifact.all_pairs_root_ledger.sampled_summary.delay_min > 0.6);
  assert.ok(artifact.all_pairs_root_ledger.sampled_summary.delay_max <= 2);
  assert.ok(artifact.all_pairs_root_ledger.sampled_summary.jacobian_floor_min > 0.7);
  assert.equal(artifact.result.root_ledger_diagnostic, "certified_passed");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.result.first_failure_status, "force-action-event-not-computed");
});

test("octahedral ordered-pair helper preserves binary labels and pair count", () => {
  const pairs = orderedOctahedralPairs();

  assert.equal(pairs.length, 30);
  assert.equal(new Set(pairs.map((pair) => `${pair.receiver}->${pair.source}`)).size, 30);
  assert.deepEqual(pairs.slice(0, 5), [
    {
      receiver: 1,
      source: 2,
      receiver_label: "1+",
      source_label: "1-",
      receiver_binary: 1,
      source_binary: 1,
      force_sign: -1,
      source_relation: "antipodal-partner",
    },
    {
      receiver: 1,
      source: 3,
      receiver_label: "1+",
      source_label: "2+",
      receiver_binary: 1,
      source_binary: 2,
      force_sign: 1,
      source_relation: "cross-binary",
    },
    {
      receiver: 1,
      source: 4,
      receiver_label: "1+",
      source_label: "2-",
      receiver_binary: 1,
      source_binary: 2,
      force_sign: -1,
      source_relation: "cross-binary",
    },
    {
      receiver: 1,
      source: 5,
      receiver_label: "1+",
      source_label: "3+",
      receiver_binary: 1,
      source_binary: 3,
      force_sign: 1,
      source_relation: "cross-binary",
    },
    {
      receiver: 1,
      source: 6,
      receiver_label: "1+",
      source_label: "3-",
      receiver_binary: 1,
      source_binary: 3,
      force_sign: -1,
      source_relation: "cross-binary",
    },
  ]);
});

test("octahedral root-ledger CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-octahedral-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const scriptPath = fileURLToPath(new URL("../scripts/neutral-braid/octahedral-root-ledger.mjs", import.meta.url));

  execFileSync(
    process.execPath,
    [scriptPath, "--samples", "37", "--subdivisions", "240", "--out", artifactPath, "--pretty"],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralRootLedger(artifact), []);

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.pair_count, 30);
  assert.equal(validation.phase_sample_count, 37);
  assert.equal(validation.result.root_ledger_diagnostic, "certified_passed");
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.result.first_failure_status, "force-action-event-not-computed");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_ROOT_LEDGER_SCHEMA);
});

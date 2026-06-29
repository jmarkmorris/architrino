import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
  validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate({
        topologySamplesPerCell: 48,
        derivativeSamplesPerCell: 8,
        sourceQuadraturePanelsPerSegment: 96,
        scanSamplesPerCell: 96,
        rootSubdivisions: 5000,
      });
  }
  return cachedArtifact;
}

function rowById(certificate, rowId) {
  const row = certificate.signed_witness_rows.find(
    (entry) => entry.row_id === rowId
  );
  assert.ok(row, `missing row ${rowId}`);
  return row;
}

function near(actual, expected, tolerance = 5e-9) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("fold-aware forcing sign bracket certificate validates topology predecessor", () => {
  const certificate = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
      certificate
    ),
    []
  );
  assert.equal(
    certificate.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA
  );
  assert.equal(
    certificate.packet_id,
    "octahedral_fold_aware_cross_binary_forcing_sign_bracket_certificate"
  );
  assert.equal(certificate.promotion_status, "priority-only");
  assert.equal(certificate.source_forcing_topology_atlas_check.valid, true);
  assert.equal(
    certificate.source_forcing_topology_atlas_check.theory_status,
    "sampled-source-atlas-aware-forcing-topology-atlas-certified"
  );
  assert.equal(
    certificate.source_forcing_topology_atlas_check
      .certifies_interval_critical_exhaustion,
    false
  );
});

test("fold-aware forcing sign bracket certificate imposes no speed window", () => {
  const certificate = artifact();

  assert.equal(
    certificate.certificate_parameters.speed_constraint,
    "none; uses the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required only"
  );
  assert.deepEqual(certificate.certificate_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(certificate.certificate_parameters.speed_ratio_estimate, 3.021564740248);
  assert.equal(certificate.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-aware forcing sign bracket certificate records signed zero brackets", () => {
  const certificate = artifact();

  assert.equal(certificate.signed_witness_rows.length, 15);
  assert.equal(rowById(certificate, "I1.f1.left").forcing_sign, "+");
  assert.equal(rowById(certificate, "I1.f1.right").forcing_sign, "-");
  assert.equal(rowById(certificate, "I1.f1").derivative_sign, "-");
  near(rowById(certificate, "I1.f1").theta, 0.129625153862);

  assert.equal(rowById(certificate, "I2.f1.left").forcing_sign, "+");
  assert.equal(rowById(certificate, "I2.f1.right").forcing_sign, "-");
  assert.equal(rowById(certificate, "I2.f1").derivative_sign, "-");
  near(rowById(certificate, "I2.f1").theta, 1.133431464569);

  assert.equal(rowById(certificate, "I2.d1.left").derivative_sign, "+");
  assert.equal(rowById(certificate, "I2.d1.right").derivative_sign, "-");
  assert.equal(rowById(certificate, "I2.d1").forcing_sign, "+");
  near(rowById(certificate, "I2.d1").theta, 1.099563891683);
});

test("fold-aware forcing sign bracket certificate preserves turn order and I3 signs", () => {
  const certificate = artifact();
  const summary = certificate.sign_bracket_summary;

  assert.equal(summary.I1_forcing_bracket_signs, "+/-");
  assert.equal(summary.I1_regular_zero_derivative_sign, "-");
  assert.equal(summary.I2_derivative_bracket_signs, "+/-");
  assert.equal(summary.I2_derivative_turn_forcing_sign, "+");
  assert.equal(summary.I2_forcing_bracket_signs, "+/-");
  assert.equal(summary.I2_regular_zero_derivative_sign, "-");
  assert.equal(summary.I2_derivative_turn_before_forcing_zero, true);
  assert.equal(summary.I3_endpoint_forcing_signs, "-/-");
  assert.equal(summary.I3_endpoint_derivative_signs, "+/+");
  assert.equal(summary.status, "sampled-forcing-sign-brackets-certified");
});

test("fold-aware forcing sign bracket certificate preserves candidate set and boundaries", () => {
  const certificate = artifact();

  assert.deepEqual(
    certificate.topology_candidate_set.candidates.map(
      (candidate) => candidate.candidate_id
    ),
    ["endpoint.0", "I1.z1", "fold.3-", "I2.z1", "fold.2+", "endpoint.Q"]
  );
  assert.equal(
    certificate.artifact_claim.certifies_sampled_forcing_sign_brackets,
    true
  );
  assert.equal(
    certificate.artifact_claim.certifies_sampled_transversality_rows,
    true
  );
  assert.equal(certificate.artifact_claim.certifies_sampled_derivative_turn_order, true);
  assert.equal(certificate.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(certificate.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(certificate.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(certificate.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(certificate.artifact_claim.retained_branch, false);
  assert.equal(certificate.result.retention, "not_retained");
});

test("fold-aware forcing sign bracket certificate rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate({
        topologySamplesPerCell: 8,
      }),
    /topologySamplesPerCell/
  );
  const broken = structuredClone(artifact());
  broken.sign_bracket_summary.I2_forcing_bracket_signs = "+/+";
  assert.match(
    validateOctahedralFoldAwareCrossBinaryForcingSignBracketCertificate(
      broken
    ).join("\n"),
    /sampled sign brackets/
  );
});

test("fold-aware forcing sign bracket certificate CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-sign-bracket-certificate.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-forcing-sign-bracket-")
  );
  const outPath = path.join(tmpDir, "certificate.json");

  execFileSync(process.execPath, [script, "--out", outPath, "--pretty"], {
    stdio: "pipe",
  });
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FORCING_SIGN_BRACKET_CERTIFICATE_SCHEMA
  );
});

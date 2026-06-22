import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate,
  validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate({
        sourceAtlasSampleCount: 64,
        sourceQuadraturePanelsPerSegment: 96,
        scanSamplesPerCell: 96,
        rootSubdivisions: 5000,
        derivativeTailSampleCount: 4,
      });
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-9) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

function row(certificate, certificateId) {
  const found = certificate.singular_collar_rows.find(
    (entry) => entry.certificate_id === certificateId
  );
  assert.ok(found, `missing collar row ${certificateId}`);
  return found;
}

test("fold-collar sign transport certificate validates source packets", () => {
  const certificate = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
      certificate
    ),
    []
  );
  assert.equal(
    certificate.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA
  );
  assert.equal(
    certificate.packet_id,
    "octahedral_fold_aware_cross_binary_fold_collar_sign_transport_certificate"
  );
  assert.equal(certificate.promotion_status, "priority-only");
  assert.equal(certificate.source_interval_sign_target_atlas_check.valid, true);
  assert.equal(certificate.source_fold_square_limit_atlas_check.valid, true);
  assert.equal(
    certificate.source_interval_sign_target_atlas_check
      .certifies_interval_sign_topology,
    false
  );
  assert.equal(
    certificate.source_fold_square_limit_atlas_check
      .certifies_interval_fold_limit_enclosure,
    false
  );
});

test("fold-collar sign transport certificate imposes no speed window", () => {
  const certificate = artifact();

  assert.equal(
    certificate.collar_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(certificate.collar_parameters.speed_band, undefined);
  assert.equal(certificate.collar_parameters.speed_window, undefined);
  assert.deepEqual(certificate.collar_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(certificate.artifact_claim.assumes_fixed_speed_window, false);
});

test("fold-collar sign transport theorem states the square-coordinate laws", () => {
  const theorem = artifact().fold_collar_sign_transport_theorem;

  assert.equal(theorem.transformed_limit, "g(y)=2y f_cross(theta_f +/- y^2) -> L");
  assert.equal(theorem.forcing_conclusion, "f_cross(theta_f +/- y^2) ~ L/(2y)");
  assert.match(
    theorem.transport_derivative_numerator_definition,
    /D\(y\)=tau/
  );
  assert.equal(theorem.derivative_identity, "f'_theta(theta_f+tau*y^2)=D(y)/(4y^3)");
  assert.match(theorem.left_derivative_conclusion, /L\/\(4y\^3\)/);
  assert.match(theorem.right_derivative_conclusion, /-L\/\(4y\^3\)/);
  assert.match(theorem.sign_transport_rule, /f=G\/\(2y\)/);
  assert.equal(
    theorem.proof_status,
    "conditional-fold-collar-sign-transport-theorem-proved"
  );
});

test("fold-collar sign transport certificate emits the two singular collars", () => {
  const certificate = artifact();
  const left = row(certificate, "fold.3-.left-fold-collar-sign-transport");
  const right = row(certificate, "fold.2+.right-fold-collar-sign-transport");

  assert.equal(certificate.singular_collar_rows.length, 2);
  near(left.analytic_square_limit, -0.192715477558);
  assert.equal(left.square_limit_sign, "-");
  assert.equal(left.target_square_limit_radius, 0.096357738779);
  assert.equal(left.forcing_sign_for_small_y, "-");
  assert.equal(left.derivative_sign_for_small_y, "-");
  assert.equal(left.transport_derivative_numerator_sign_for_small_y, "-");
  assert.equal(left.derivative_asymptotic, "f'_theta(theta_f-y^2) ~ L/(4y^3)");
  assert.ok(left.minimum_sample_square_weighted_sign_margin > 0.18);
  assert.ok(Number(left.signed_limit_margin) > 0.19);
  near(right.analytic_square_limit, -0.325542989718);
  assert.equal(right.square_limit_sign, "-");
  assert.equal(right.target_square_limit_radius, 0.162771494859);
  assert.equal(right.forcing_sign_for_small_y, "-");
  assert.equal(right.derivative_sign_for_small_y, "+");
  assert.equal(right.transport_derivative_numerator_sign_for_small_y, "+");
  assert.equal(right.derivative_asymptotic, "f'_theta(theta_f+y^2) ~ -L/(4y^3)");
  assert.ok(right.minimum_sample_square_weighted_sign_margin > 0.32);
  assert.ok(Number(right.signed_limit_margin) > 0.32);
});

test("fold-collar sign transport certificate samples finite-collar signs", () => {
  const certificate = artifact();

  for (const collar of certificate.singular_collar_rows) {
    assert.equal(
      collar.theorem_status,
      "conditional-fold-collar-sign-transport-proved"
    );
    assert.equal(
      collar.sample_sign_status,
      "sampled-fold-collar-forcing-signs-certified"
    );
    assert.equal(
      collar.derivative_tail_sign_status,
      "sampled-fold-collar-derivative-tail-signs-certified"
    );
    assert.equal(collar.sample_rows.length, certificate.collar_parameters.y_samples.length);
    assert.equal(collar.derivative_tail_sample_rows.length, 4);
    assert.ok(collar.sample_rows.every((sample) => sample.forcing_sign === "-"));
    assert.ok(
      collar.sample_rows.every(
        (sample) => sample.square_weighted_forcing_sign === "-"
      )
    );
    assert.ok(
      collar.derivative_tail_sample_rows.every(
        (sample) => sample.forcing_sign === "-"
      )
    );
    assert.ok(
      collar.derivative_tail_sample_rows.every(
        (sample) => sample.derivative_sign === collar.derivative_sign_for_small_y
      )
    );
    assert.ok(
      collar.derivative_tail_sample_rows.every(
        (sample) =>
          sample.transport_derivative_numerator_sign ===
          collar.derivative_sign_for_small_y
      )
    );
  }
});

test("fold-collar sign transport certificate keeps interval closure open", () => {
  const certificate = artifact();

  assert.equal(
    certificate.artifact_claim
      .certifies_conditional_fold_collar_sign_transport_theorem,
    true
  );
  assert.equal(
    certificate.artifact_claim.certifies_sampled_singular_collar_forcing_signs,
    true
  );
  assert.equal(
    certificate.artifact_claim
      .certifies_sampled_singular_collar_derivative_tail_signs,
    true
  );
  assert.equal(
    certificate.artifact_claim.certifies_sampled_singular_collar_transport_D_signs,
    true
  );
  assert.equal(
    certificate.artifact_claim.certifies_interval_fold_collar_enclosure,
    false
  );
  assert.equal(certificate.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(
    certificate.artifact_claim.certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    certificate.artifact_claim.certifies_interval_critical_exhaustion,
    false
  );
  assert.equal(
    certificate.artifact_claim.certifies_interval_quadrature_enclosure,
    false
  );
  assert.equal(certificate.artifact_claim.retained_branch, false);
  assert.equal(certificate.result.retention, "not_retained");
  assert.equal(
    certificate.result.theory_status,
    "sampled-source-atlas-aware-fold-collar-sign-transport-certified"
  );
});

test("fold-collar sign transport certificate rejects invalid controls", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate({
        derivativeTailSampleCount: 99,
      }),
    /derivativeTailSampleCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate({
        ySamples: [0.1, 0.05, 0.07, 0.01],
      }),
    /ySamples/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_sign_topology = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryFoldCollarSignTransportCertificate(
      broken
    ).join("\n"),
    /certify only conditional\/sampled/
  );
});

test("fold-collar sign transport certificate CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-fold-collar-sign-transport-")
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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_FOLD_COLLAR_SIGN_TRANSPORT_CERTIFICATE_SCHEMA
  );
});

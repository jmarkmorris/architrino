import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate,
  validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs";

let cachedArtifact = null;

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact = buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate({
      rootSubdivisions: 5000,
      scanSamplesPerCell: 96,
      topologySamplesPerCell: 48,
      derivativeSamplesPerCell: 8,
      sourceAtlasSampleCount: 64,
      sourceQuadraturePanelsPerSegment: 96,
      valueQuadraturePanelsPerSegment: 384,
      derivativeTailSampleCount: 4,
      targetMarginFactor: 0.5,
    });
  }
  return cachedArtifact;
}

function row(rows, idField, id) {
  const found = rows.find((entry) => entry[idField] === id);
  assert.ok(found, `missing row ${id}`);
  return found;
}

test("bridge predicate certificate validates predecessors", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(packet),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_bridge_predicate_certificate"
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.source_interval_implication_check.valid, true);
  assert.equal(packet.source_interval_implication_check.retained_branch, false);
  assert.equal(packet.source_sign_bracket_certificate_check.valid, true);
  assert.equal(
    packet.source_sign_bracket_certificate_check
      .certifies_interval_derivative_enclosure,
    false
  );
});

test("bridge predicate certificate imposes no speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.bridge_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.equal(packet.bridge_parameters.speed_band, undefined);
  assert.equal(packet.bridge_parameters.speed_window, undefined);
  assert.equal(packet.bridge_parameters.speed_min, undefined);
  assert.equal(packet.bridge_parameters.speed_max, undefined);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("bridge predicate certificate proves the regular bridge propagation lemma", () => {
  const lemma = artifact().bridge_propagation_lemma;

  assert.equal(lemma.lemma_id, "regular-bridge-sign-propagation");
  assert.equal(lemma.statements.length, 3);
  assert.match(lemma.statements[0], /f'_cross>0/);
  assert.match(lemma.statements[1], /f'_cross<0/);
  assert.match(lemma.statements[2], /f'_cross<0/);
  assert.equal(
    lemma.proof_status,
    "conditional-bridge-propagation-lemma-proved"
  );
});

test("bridge predicate certificate emits sampled endpoint rows", () => {
  const rows = artifact().bridge_endpoint_sample_rows;

  assert.equal(rows.length, 5);
  assert.equal(row(rows, "sample_id", "theta_3plus.entry").forcing_sign, "+");
  assert.equal(row(rows, "sample_id", "I2.turn-crest").forcing_sign, "+");
  assert.equal(
    row(rows, "sample_id", "I2.left-forcing-bracket").forcing_sign,
    "+"
  );
  assert.equal(
    row(rows, "sample_id", "I2.right-forcing-bracket").forcing_sign,
    "-"
  );
  assert.equal(row(rows, "sample_id", "theta_2minus.exit").forcing_sign, "-");
  assert.ok(
    rows.every((entry) => entry.status === "sampled-bridge-endpoint-sign-certified")
  );
});

test("bridge predicate certificate closes the sampled bridge predicate gap", () => {
  const rows = artifact().bridge_predicate_certificate_rows;

  assert.deepEqual(
    rows.map((entry) => entry.bridge_predicate_id),
    [
      "theta_3plus.regular-entry-positive",
      "I2.turn-bridge-forcing-positive",
      "theta_2minus.regular-exit-negative",
    ]
  );
  assert.ok(
    rows.every((entry) => entry.status === "sampled-bridge-predicate-certified")
  );
  assert.equal(
    artifact().bridge_summary.status,
    "sampled-bridge-predicates-certified"
  );
  assert.equal(
    artifact().interval_profile_boundary.status,
    "sampled-bridge-predicates-certified-interval-bridge-open"
  );
});

test("bridge predicate certificate keeps interval and retention claims open", () => {
  const packet = artifact();

  assert.equal(packet.artifact_claim.certifies_bridge_propagation_lemma, true);
  assert.equal(packet.artifact_claim.certifies_sampled_bridge_predicates, true);
  assert.equal(packet.artifact_claim.certifies_interval_bridge_predicates, false);
  assert.equal(packet.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(packet.artifact_claim.certifies_interval_quadrature_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_C_m_Q_M_Q_interval_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(packet.result.retention, "not_retained");
  assert.equal(
    packet.result.theory_status,
    "sampled-source-atlas-aware-bridge-predicate-certificate-certified"
  );
});

test("bridge predicate certificate rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate({
        targetMarginFactor: 1.1,
      }),
    /targetMarginFactor/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryBridgePredicateCertificate({
        derivativeTailSampleCount: 0,
      }),
    /derivativeTailSampleCount/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_bridge_predicates = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryBridgePredicateCertificate(broken).join(
      "\n"
    ),
    /certify only bridge lemma/
  );
});

test("bridge predicate certificate CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-bridge-predicate-certificate.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-bridge-predicate-certificate-")
  );
  const outPath = path.join(tmpDir, "packet.json");

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
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_BRIDGE_PREDICATE_CERTIFICATE_SCHEMA
  );
});

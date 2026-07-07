import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const TOY_SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/held-release-causal-wake-toy.mjs", import.meta.url)
);
const CHECK_SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/delayed-escape-certificate-check.mjs", import.meta.url)
);

function runToy(args = []) {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "braid-ideal-escape-cert-"));
  execFileSync(
    process.execPath,
    [TOY_SCRIPT_PATH, "--duration", "1", "--dt", "0.004", "--sample-every", "25", "--out", outputDir, ...args],
    { encoding: "utf8" }
  );
  return path.join(outputDir, "result.json");
}

function runCheck(resultPath) {
  const stdout = execFileSync(
    process.execPath,
    [CHECK_SCRIPT_PATH, "--result", resultPath],
    { encoding: "utf8" }
  );
  return JSON.parse(stdout);
}

test("escape certificate check on the zero-angular-momentum control fails closed with the compression blocker", () => {
  const report = runCheck(runToy());

  assert.equal(report.schema, "braid-ideal-delayed-escape-certificate-check.v3");
  assert.equal(report.hypothesisLedger.rootCountCapM.cap, 1);
  assert.equal(
    report.hypothesisLedger.rootCountCapM.provenance,
    "theorem_M_confirmed_by_record"
  );
  assert.equal(report.hypothesisLedger.rootCountCapM.dischargedUnderS, true);
  assert.equal(report.priorityOnly, true);
  assert.equal(report.retainedBranchClaim, false);
  assert.equal(report.acceptedSameLevelBranchClaim, false);
  assert.equal(report.scoreMovement, "no_score_increase");
  assert.equal(report.eternalNoReturnCertificate, false);
  assert.equal(report.windowCertificateGranted, false);
  assert.match(report.proofPacketRef, /delayed-escape-certificate-lemma-proof-packet\.md/);
  assert.equal(report.sourceRow.prehistoryMode, "stationary-held-release");
  assert.equal(report.hypothesisLedger.wellPosednessWP.rootCoverageClean, true);
  assert.equal(report.hypothesisLedger.channelHypothesisC.applicable, true);
  assert.ok(report.hypothesisLedger.channelHypothesisC.fixedPointDriftResidualMax < 1e-9);
  // The default control compresses before crossing field speed, so no
  // admissible outward certificate time exists at frame resolution.
  assert.equal(report.admissibleCertificateTimes, 0);
  assert.equal(
    report.firstBlocker,
    "no_admissible_certificate_time_before_first_hypothesis_violation"
  );
  assert.equal(report.orderingWitness.consistent, true);
  assert.ok(report.missingAcceptedFields.includes("hypothesis_persistence_lemma"));
});

test("escape certificate check evaluates margin candidates on an outward-only rotating row", () => {
  const report = runCheck(
    runToy(["--prehistory-mode", "kick-at-release", "--surface-speed-fraction", "0.8"])
  );

  assert.equal(report.sourceRow.prehistoryMode, "kick-at-release");
  assert.equal(report.sourceRow.surfaceSpeedFraction, 0.8);
  assert.ok(report.admissibleCertificateTimes > 0);
  const best = report.bestMarginCandidate;
  assert.ok(best != null);
  assert.ok(best.beta < 1);
  assert.ok(best.gamma > 0);
  // Lemma A channel floor: opposite-polarity separation over radius stays >= 1.
  assert.ok(best.gammaOp >= 1 - 1e-6);
  assert.equal(best.channelFloorConsistent, true);
  assert.equal(report.hypothesisLedger.separationFloors.channelFloorConsistent, true);
  // Theorem M: m = 1 with theorem provenance on a clean sub-field record.
  assert.equal(report.sourceRow.rootCountCap, 1);
  assert.equal(report.sourceRow.rootCountCapProvenance, "theorem_M_confirmed_by_record");
  // Envelope composition: K_iso = 5 m kappa Wmax (1+beta)^2 / gamma^2,
  // K_sgn = m kappa Wmax (1+beta)^2 (1/4 + 2/gammaOp^2).
  const base =
    report.sourceRow.rootCountCap *
    Math.abs(report.sourceRow.coupling) *
    best.weightCap *
    (1 + best.beta) ** 2;
  const expectedKIso = (report.sourceRow.partnerSourceCount * base) / best.gamma ** 2;
  const expectedKSgn = base * (0.25 + 2 / best.gammaOp ** 2);
  assert.ok(Math.abs(best.envelopeKIsotropic - expectedKIso) < 1e-9 * expectedKIso);
  assert.ok(Math.abs(best.envelopeKSigned - expectedKSgn) < 1e-9 * expectedKSgn);
  // Signed envelope is a strict sharpening on this row.
  assert.ok(best.envelopeKSigned < best.envelopeKIsotropic);
  assert.equal(best.pastRadiusCapHolds, true);
  assert.equal(best.marginSatisfied, false);
  assert.ok(best.marginSigned < 0);
  assert.ok(best.marginSigned > best.marginIsotropic);
  assert.ok(report.envelopeSharpening.deficitClosedFraction > 0);
  assert.equal(report.certifiedWindows.length, 0);
  assert.equal(report.windowCertificateGranted, false);
  assert.equal(report.eternalNoReturnCertificate, false);
  assert.equal(
    report.firstBlocker,
    "escape_margin_inequality_unsatisfied_at_every_admissible_certificate_time"
  );
  assert.equal(report.orderingWitness.consistent, true);
  assert.equal(report.measuredWeightWithinCap, true);
});

test("escape certificate check rejects a missing result argument", () => {
  assert.throws(
    () => execFileSync(process.execPath, [CHECK_SCRIPT_PATH], { encoding: "utf8", stdio: "pipe" }),
    /--result/
  );
});

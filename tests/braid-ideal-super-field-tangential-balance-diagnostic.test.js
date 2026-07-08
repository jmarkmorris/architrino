import test from "node:test";
import assert from "node:assert/strict";

import {
  partnerPump,
  partnerPumpValidation,
  partnerPumpSuperField,
  SELF_HIT_BRAKE,
  balanceCharacter,
  diagnosticReport,
} from "../scripts/braid-ideal/super-field-tangential-balance-diagnostic.mjs";

test("the signed-normal force law reproduces the certified band for beta < 0.985", () => {
  const v = partnerPumpValidation({});
  assert.equal(v.allInBand, true);
  for (const r of v.rows) {
    assert.ok(r.ratio >= 2.86 && r.ratio <= 2.94, `Phi/beta ${r.ratio} out of certified band`);
  }
});

test("signed and unsigned normals agree sub-field (D_T > 0 there)", () => {
  for (const beta of [0.5, 0.9, 0.985]) {
    const s = partnerPump(beta, { signed: true }).phiTan;
    const u = partnerPump(beta, { signed: false }).phiTan;
    assert.ok(Math.abs(s - u) < 1e-6, `beta ${beta}: signed ${s} vs unsigned ${u}`);
  }
});

test("the partner pump persists and grows across beta = 1 (does not switch off super-field)", () => {
  const sf = partnerPumpSuperField({});
  assert.equal(sf.persistsAntiDamping, true);
  assert.equal(sf.monotoneGrowing, true);
  const at1p4 = sf.rows.find((r) => Math.abs(r.beta - 1.4) < 1e-9);
  assert.ok(at1p4.phiTan > 4, `Phi_tan at beta=1.4 is ${at1p4.phiTan}`);
});

test("self-hit brake is absorptive, onsets at beta = 1, and overwhelms the pump at declared d0", () => {
  assert.equal(SELF_HIT_BRAKE.sign, "absorptive_m_less_than_zero");
  assert.equal(SELF_HIT_BRAKE.onsetBeta, 1.0);
  const b = balanceCharacter();
  assert.equal(b.pumpPersistsSuperField, true);
  assert.equal(b.staticSuperFieldBalanceExists, false);
  assert.equal(b.selfHitOverwhelmsPumpAtDeclaredD0, true);
  assert.equal(b.netSignJustAboveUnity, "braking_pushes_back_to_field_speed");
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.acceptedSeedPathCertificate, false);
});

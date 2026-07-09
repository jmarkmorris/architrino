import test from "node:test";
import assert from "node:assert/strict";
import { neutralBinaryCausal, polaritySign, diagnosticReport } from "../scripts/braid-ideal/cross-hit-causal-absorption.mjs";

test("causal root-sum converges (unlike the instantaneous proxy)", () => {
  const n = neutralBinaryCausal();
  assert.equal(n.converged, true, `coarse ${n.netCoarse} vs fine ${n.netFine}`);
});

test("neutral inner binary does not absorb: net is ~1% of the pump and cancels heavily", () => {
  const n = neutralBinaryCausal();
  assert.ok(Math.abs(n.avgTanForce) < 0.3, `avgTanForce ${n.avgTanForce} should be << pump ~2.9`);
  assert.ok(n.cancellationFraction > 0.9, `cancellation ${n.cancellationFraction}`);
});

test("polarity sets the sign: like absorptive, opposite ejective; both a fraction of the pump", () => {
  const s = polaritySign();
  assert.equal(s.likePolarity.verdict, "absorptive");
  assert.equal(s.oppositePolarity.verdict, "ejective");
  assert.ok(Math.abs(s.likePolarity.avgTanForce) < 2.9, "single-source absorptive force below the pump");
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

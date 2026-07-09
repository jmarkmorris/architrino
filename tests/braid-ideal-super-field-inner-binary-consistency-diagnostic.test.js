import test from "node:test";
import assert from "node:assert/strict";

import {
  innerAbsorberAvailability,
  nestedRegress,
  terminalShellAbsorberLedger,
  selfHitRootBudget,
  diagnosticReport,
} from "../scripts/braid-ideal/super-field-inner-binary-consistency-diagnostic.mjs";

test("Result A: the inner binary has no available cross-hit absorber", () => {
  const a = innerAbsorberAvailability({ betaOut: 0.98, betaInSame: 1.2, q: 0.44 });
  // sub-field outer source can never project its velocity to c_f
  assert.ok(a.maxA_outerSourceToInnerReceiver < 1);
  assert.equal(a.subFieldOuterCanStraddle, false);
  // same-frequency inner partner gives a time-constant alignment (no clicks)
  assert.ok(a.sameFrequencyInnerVariation < 1e-9);
  assert.equal(a.sameFrequencyInnerCanClick, false);
});

test("Result B: the cross-hit-only regress is strictly increasing and never terminates", () => {
  const b = nestedRegress({ beta0: 1.05, steps: 6, stepGain: 1.4 });
  assert.equal(b.strictlyIncreasing, true);
  assert.equal(b.boundedBelowByOne, true);
  assert.equal(b.terminatesOnCrossHit, false);
});

test("Result C: the only terminal absorber that can reach the pump is the super-field self-hit", () => {
  const c = terminalShellAbsorberLedger();
  const fixed = c.candidates.filter((x) => x.sufficient === false);
  // every fixed-geometry / sea / cross-hit candidate is insufficient or unavailable
  assert.ok(fixed.every((x) => x.name !== "super_field_self_hit"));
  assert.equal(c.onlySufficientCandidate, "super_field_self_hit");
  assert.equal(c.terminalClosureReducesTo, "d0_coincidence_stratum_self_hit_balance");
});

test("Result D: self-hit roots onset exactly at beta = 1", () => {
  const d = selfHitRootBudget({});
  const below = d.rows.filter((r) => r.beta < 1);
  const above = d.rows.filter((r) => r.beta > 1);
  assert.ok(below.every((r) => r.nontrivialSelfHitRoots === 0));
  assert.ok(above.every((r) => r.nontrivialSelfHitRoots >= 1));
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.acceptedSeedPathCertificate, false);
});

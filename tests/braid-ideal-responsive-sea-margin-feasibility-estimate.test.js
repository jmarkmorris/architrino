import test from "node:test";
import assert from "node:assert/strict";
import { seaMarginPerAlpha, spacingSweep, FAIL_CLOSED } from "../scripts/braid-ideal/responsive-sea-margin-feasibility-estimate.mjs";

// Section 38: linear-response responsive-sea estimate. The confinement margin per
// unit polarizability OSCILLATES IN SIGN with the shell spacing (causal double-delay
// phase 2*omega*R) — sea confinement is spacing-selective, a retardation effect with
// no instantaneous analogue. At the named spacing 4.25 the margin is small and NOT
// at a confining peak; the best single-shell spacing near R=3.5 needs alpha ~ 11
// (6-shell) for the 6% global margin.

test("spacing-selectivity: the mean margin per alpha changes sign across the sweep", () => {
  const rows = spacingSweep({ Rseas: [2.5, 3.5, 4.5, 5.5], Nt: 8 });
  const signs = rows.map((r) => Math.sign(r.mean));
  assert.ok(signs.includes(1) && signs.includes(-1), `signs ${signs} should include both`);
  const best = rows.find((r) => r.Rsea === 3.5);
  assert.ok(best.mean > 3e-3, `R=3.5 confining peak ${best.mean}`);
});

test("the named spacing 4.25 is not at a confining peak for this braid", () => {
  const r = seaMarginPerAlpha({ Rsea: 4.25, Nt: 8 });
  assert.ok(Math.abs(r.meanPerAlpha) < 2e-3, `named-spacing margin ${r.meanPerAlpha} is small`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});

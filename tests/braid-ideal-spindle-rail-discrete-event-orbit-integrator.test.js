import test from "node:test";
import assert from "node:assert/strict";
import { integrateDiscreteOrbit, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-rail-discrete-event-orbit-integrator.mjs";

// Section 35 (discrete-event orbit integrator, item 24 step 2b): rectification is
// REAL (clicks cluster on the outward phase) and strengthens with the click quantum,
// but at reduced-model coefficients the radial harvest is percent-scale: the
// confinement boundary sits at s_min ~ 0.99 (q -> 0, the sliding limit) improving
// to ~0.97 at q = 0.15. The 24% native deficit is NOT closable by the clicker alone;
// the strong discreteness-as-enabler hypothesis is rejected at reduced level, the
// weak form (rectification exists, scales with quantum) survives.

test("rectification sign: clicks cluster on the outward phase", () => {
  const r = integrateDiscreteOrbit({ support: 0.9, q: 0.01, duration: 40 });
  assert.ok(r.clicks > 10, "clicking state");
  assert.ok(r.meanClickVr > 0, `mean click vr ${r.meanClickVr} should be outward`);
});

test("the radial channel is a knife edge at percent scale: under-support escapes, full support collapses", () => {
  const lo = integrateDiscreteOrbit({ support: 0.85, q: 0.01, duration: 120 });
  const hi = integrateDiscreteOrbit({ support: 1.0, q: 0.01, duration: 120 });
  assert.equal(lo.escaped, true, "s=0.85 escapes (deficit wins)");
  assert.equal(hi.collapsed, true, "s=1.0 collapses (click surplus wins)");
});

test("larger click quantum strengthens rectification (binds longer at the same support)", () => {
  const small = integrateDiscreteOrbit({ support: 0.98, q: 0.01, duration: 120 });
  const large = integrateDiscreteOrbit({ support: 0.98, q: 0.15, duration: 120 });
  assert.equal(small.escaped, true, "q=0.01 escapes at s=0.98");
  assert.equal(large.escaped, false, "q=0.15 stays bounded at s=0.98 over the same span");
  assert.equal(large.collapsed, false);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});

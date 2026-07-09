import test from "node:test";
import assert from "node:assert/strict";
import { scanRow, logLogSlope, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-drift-anisotropy-scaling-scan.mjs";

// Section 29: the Section-28 "u^1.5" was a linear-quadratic crossover, not a true
// exponent. Decomposition at matched pinned cadence: perpendicular-loss is a clean
// quadratic (2.01 u^2); helicity-AVERAGED parallel cost is a clean quadratic
// (0.422 u^2); the leader-SELECTED parallel gain carries the only first-order term
// (-0.102|u|, the helicity-polarity lock, odd in u -> spin-coupled, not
// orientation-coupled). Nt=4 is converged to well below the asserted tolerances.

test("perpendicular loss is quadratic in u (MM-analog second-order null structure)", () => {
  const a = scanRow({ u: 0.05, Nt: 4 });
  const b = scanRow({ u: 0.1, Nt: 4 });
  const ratio = b.perpendicularLoss / a.perpendicularLoss; // quadratic -> 4, u^1.5 -> 2.83
  assert.ok(ratio > 3.5 && ratio < 4.3, `perpLoss ratio ${ratio} not quadratic`);
  // helicity-averaged parallel cost also quadratic
  const meanA = (a.fParPlus + a.fParMinus) / 2 - a.fRest;
  const meanB = (b.fParPlus + b.fParMinus) / 2 - b.fRest;
  assert.ok(meanA > 0 && meanB > 0, "helicity-averaged parallel drift costs closure");
  assert.ok(Math.abs(meanB / meanA - 4) < 0.4, `mean parallel cost ratio ${meanB / meanA} not quadratic`);
});

test("leader-selected parallel gain carries the first-order (helicity-odd) term", () => {
  const a = scanRow({ u: 0.05, Nt: 4 });
  const b = scanRow({ u: 0.1, Nt: 4 });
  assert.ok(a.parallelGain < 0 && b.parallelGain < 0, "preferred leader improves on rest");
  // linear-dominated: doubling u should LESS than double... i.e. ratio well below quadratic
  const ratio = b.parallelGain / a.parallelGain;
  assert.ok(ratio > 1.0 && ratio < 2.2, `parGain ratio ${ratio} should be near-linear, far from 4`);
  assert.equal(a.leaderSign, -1, "electrino cap leads at small u");
});

test("composite gap sits between linear and quadratic (the crossover that faked u^1.5)", () => {
  const rows = [scanRow({ u: 0.05, Nt: 4 }), scanRow({ u: 0.1, Nt: 4 })];
  const s = logLogSlope(rows, "gap").slope;
  assert.ok(s > 1.2 && s < 1.8, `gap local exponent ${s} should be a crossover value`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});

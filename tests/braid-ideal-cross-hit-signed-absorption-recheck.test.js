import test from "node:test";
import assert from "node:assert/strict";
import { signStructure, neutralBinaryCancellation, diagnosticReport } from "../scripts/braid-ideal/cross-hit-signed-absorption-recheck.mjs";

test("sign is set by polarity: like-polarity absorbs, opposite-polarity ejects", () => {
  const s = signStructure({ soft: 0.02 });
  assert.equal(s.likePolarity.verdict, "absorptive");
  assert.equal(s.oppositePolarity.verdict, "ejective");
  assert.equal(s.likePolarity.noPerPairCancellation, true); // net = +/- |sum|
});

test("a neutral inner binary largely cancels; magnitude sum diverges with resolution", () => {
  const n = neutralBinaryCancellation({});
  assert.equal(n.magnitudeSumDivergesWithResolution, true);
  assert.equal(n.cancellationGrowsWithResolution, true);
  // exact fraction is resolution-sensitive; assert only that substantial cancellation
  // exists (net far below magnitude sum) and grows as the fold pole is resolved.
  const finest = n.rows[n.rows.length - 1];
  assert.ok(finest.cancellationPct > 30, `cancellation ${finest.cancellationPct}%`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});

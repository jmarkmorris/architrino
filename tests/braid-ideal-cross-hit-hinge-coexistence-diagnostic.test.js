import test from "node:test";
import assert from "node:assert/strict";

import {
  measure,
  ratioScan,
  radiusScan,
  coexistenceMap,
  diagnosticReport,
} from "../scripts/braid-ideal/cross-hit-hinge-coexistence-diagnostic.mjs";

test("amplitude straddling gates on beta_in >= 1: sub-field inner shell gives zero clicks", () => {
  const sub = measure({ r: 2, q: 0.44, betaOut: 0.98 }); // beta_in = 0.86 < 1
  assert.ok(sub.betaIn < 1);
  assert.equal(sub.amplitudeStraddles, false);
  assert.equal(sub.nClick, 0);
});

test("reference small-inner-binary point satisfies BOTH necessary conditions at once", () => {
  const m = measure({ r: 2.5, q: 0.44, betaOut: 0.98 });
  assert.ok(m.betaIn >= 1, `beta_in ${m.betaIn}`);
  assert.equal(m.amplitudeStraddles, true); // condition (B)
  assert.equal(m.clearsClickCount, true); // condition (A): N_click >= ~18 beta
  assert.equal(m.coexists, true);
});

test("saturation: once beta_in >= 1 the total is ~frequency-ratio-independent", () => {
  const scan = ratioScan({ q: 0.44, betaOut: 0.98, ratios: [3, 4, 6, 8] });
  const totals = scan.map((x) => x.totalDbeta);
  // click count grows with r, but per-click impulse falls to compensate:
  // the total stays flat within 20% across a 2.7x span of r.
  const spread = (Math.max(...totals) - Math.min(...totals)) / Math.max(...totals);
  assert.ok(spread < 0.2, `saturation spread ${spread}`);
  // and the click count itself does grow (more-but-weaker clicks)
  assert.ok(scan[scan.length - 1].nClick > scan[0].nClick);
});

test("coexistence region is non-empty across radius ratios; the cost is beta_in just above 1", () => {
  const rad = radiusScan({ betaOut: 0.98 });
  assert.ok(rad.every((x) => x.clearsClickCount && x.straddles));
  const map = coexistenceMap({ betaOut: 0.98 });
  assert.equal(map.coexistenceRegionNonEmpty, true);
  assert.ok(map.minAdmissibleBetaIn >= 1 && map.minAdmissibleBetaIn < 1.5);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.acceptedSeedPathCertificate, false);
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  differentialCrossHitAlignment,
  buildDifferentialCrossHitReport,
  pumpPerRotation,
} from "../scripts/braid-ideal/differential-cross-hit-alignment-diagnostic.mjs";

test("pump-per-rotation matches the certified value at the studied braid radius", () => {
  assert.ok(Math.abs(pumpPerRotation({ receiverRadius: Math.sqrt(2 / 3) }) - 22.17) < 0.05);
});

test("a well-separated differential cross-hit source is clean, finite-chord, and absorptive", () => {
  const r = differentialCrossHitAlignment({
    frequencyRatio: 8,
    sourceRadius: 0.7,
    sigma: 1,
    samples: 3000,
  });
  assert.equal(r.cleanFiniteChord, true, "well-separated bands are chart-clean");
  assert.ok(r.minChord > 0.1, `finite chord, got ${r.minChord}`);
  assert.ok(r.softeningSpread < 0.05, "softening-independent");
  // Absorptive (drains the pump) and a substantial fraction, but below the pump.
  assert.ok(r.absorbedFractionOfCertifiedPump > 0.4, `got ${r.absorbedFractionOfCertifiedPump}`);
  assert.ok(r.absorbedFractionOfCertifiedPump < 1, "single clean source stays below the pump");
});

test("the absorptive sign requires like polarity (sigma=+1); it flips with sigma", () => {
  const opts = { frequencyRatio: 8, sourceRadius: 0.7, samples: 2500 };
  const like = differentialCrossHitAlignment({ ...opts, sigma: 1 });
  const unlike = differentialCrossHitAlignment({ ...opts, sigma: -1 });
  assert.ok(like.absorbedFractionOfCertifiedPump > 0, "like polarity absorbs");
  assert.ok(unlike.absorbedFractionOfCertifiedPump < 0, "unlike polarity anti-absorbs");
  assert.ok(
    Math.abs(like.absorbedFractionOfCertifiedPump + unlike.absorbedFractionOfCertifiedPump) < 1e-6,
    "equal magnitude, opposite sign"
  );
});

test("crossing the pump in a single source requires approaching coincidence (flagged not-clean)", () => {
  const near = differentialCrossHitAlignment({
    frequencyRatio: 8,
    sourceRadius: 0.8, // bands close; aligned fold approaches coincidence
    sigma: 1,
    samples: 3000,
  });
  assert.ok(near.absorbedFractionOfCertifiedPump > 1, "nominally beats the pump");
  assert.equal(near.cleanFiniteChord, false, "but is coincidence-contaminated, not clean");
});

test("report: clean ceiling is below the pump; beating it is only near-coincidence; fail-closed", () => {
  const report = buildDifferentialCrossHitReport({ base: { samples: 2500 } });
  assert.ok(report.clean_finite_chord_absorbed_ceiling > 0.4);
  assert.ok(report.clean_finite_chord_absorbed_ceiling < 1, "clean single-source ceiling below pump");
  assert.equal(report.any_clean_finite_chord_row_beats_clock, false);
  assert.equal(report.beats_clock_only_near_coincidence, true);
  assert.equal(report.retainedBranchClaim, false);
  assert.equal(report.scoreMovement, "no_score_increase");
  assert.equal(report.accepted_seed_path_certificate, false);
  assert.equal(report.central_solver_retained_history_acceptance, false);
});

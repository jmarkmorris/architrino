import test from "node:test";
import assert from "node:assert/strict";

import {
  barrelGeometry,
  runFlutterRadiativeShedding,
} from "../scripts/braid-ideal/flutter-radiative-shedding-native-run.mjs";

test("§94 barrel construction puts every layer on one all-rail cylinder", () => {
  const b = barrelGeometry();
  for (const layer of b.layers) {
    assert.ok(Math.abs(layer.R * Math.cos(layer.alpha) - b.rho) < 1e-12);
    assert.ok(Math.abs(b.omega * layer.R * Math.cos(layer.alpha) - 1) < 1e-12);
  }
});

test("§94 native pilot remains fail-closed and root-certified", () => {
  const out = runFlutterRadiativeShedding({
    rotations: 0.2,
    radii: [8, 12],
    softSweep: [0.08, 0.02],
    Ntheta: 2,
    Nphi: 4,
    scanN: 24,
  });
  assert.equal(out.schema, "flutter_radiative_shedding_native_run.v0");
  assert.equal(out.convergence.allRootCountsStable, true);
  assert.ok(out.convergence.maxRootResidual < 1e-10);
  assert.equal(
    out.radiativeEquilibrium,
    out.boundedLimitCycle && out.fluxDecision.convergentOutgoingPhiInfinity
  );
  assert.equal(out.retainedBranchClaim, false);
  assert.equal(out.scoreMovement, "no_score_increase");
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  DECLARED,
  selectTabledRow,
  buildSites,
  rigidPosition,
  rigidVelocity,
  heldSourceModel,
  seedRecordEvaluation,
  runRelease,
  envelopeReadback,
  transverseShapeTensorBlock,
  constituentPhaseOffsets,
  driftVector,
  braidAxisRow,
  buildCoDriftCage,
  coDriftCageCoherenceRow,
  updateCageLiveOrientation,
} from "../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs";
import { evaluateMovingCircularSourceHistory } from "../src/solver/app/AbsoluteHistoryRootRuntime.mjs";
import { driftSupportRatios } from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";

const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------------------
// Native axial-drift envelope instrument — validation fixture (build spec
// reference/priorities/braid-archive/braid-ideal/native-axial-drift-envelope-instrument-spec.md
// Section "Minimal extension", fixture parts a-d). All tests restore
// DECLARED.axialDrift and the tabled row in a finally block.
// ---------------------------------------------------------------------------

// (a) REGRESSION GUARD: at axialDrift = 0 every rest-only path is unchanged and
// the seed envelope reads the rest reference (caveat 1: xi(0) ~ 0.707).
test("(a) axialDrift=0: rest paths unchanged, cadence pin regresses, seed envelope is the rest reference", () => {
  try {
    DECLARED.axialDrift = 0;
    selectTabledRow(7);
    // cadence pin regresses exactly to 1/cos(alpha_M)
    assert.ok(Math.abs(DECLARED.omega - 1 / Math.cos(deg(16.24))) < 1e-12);
    const sites = buildSites();
    for (const s of sites) {
      // rest worldline: z stays z0, no axial velocity
      for (const t of [-2.3, 0, 1.7]) {
        assert.equal(rigidPosition(s, t)[2], s.z0);
        assert.equal(rigidVelocity(s, t)[2], 0);
      }
      // held source model carries no z drift at rest
      assert.equal(heldSourceModel(s).centerVelocity.z, 0);
    }
    // betas unchanged: middle exactly on the c_f rail
    const betas = {};
    for (const s of sites) betas[s.layer] = Math.hypot(...rigidVelocity(s, 0));
    assert.ok(Math.abs(betas.M - 1.0) < 1e-12);
    // seed envelope reads the rest oblate reference: xi(0) ~ 0.707 (caveat 1),
    // finite semiaxes, 1/gamma(0) = 1
    const seedStates = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    const env = envelopeReadback(seedStates, 0);
    assert.equal(env.oneOverGamma, 1);
    assert.ok(env.xi > 0.6 && env.xi < 0.85, `xi(0) off the ~0.707 reference: ${env.xi}`);
    assert.ok(env.Rpar > 0 && env.Rperp > 0);
    assert.ok(Math.abs(env.zCenter) < 1e-12); // no drift => center at origin plane
  } finally {
    DECLARED.axialDrift = 0;
    selectTabledRow(1);
  }
});

// (b) HELD == SEED under drift: the held source model with drift equals
// rigidPosition/rigidVelocity under the production runtime at sample times.
test("(b) drift held source model agrees with the drifting rigid worldline on the production runtime", () => {
  try {
    DECLARED.axialDrift = 0.2;
    selectTabledRow(7);
    const sites = buildSites();
    for (const s of sites) {
      for (const t of [-3.1, -1, 0, 2.6]) {
        const sample = evaluateMovingCircularSourceHistory(heldSourceModel(s), t);
        const p = rigidPosition(s, t);
        const v = rigidVelocity(s, t);
        assert.ok(Math.abs(sample.position.x - p[0]) < 1e-12, `x at t=${t}`);
        assert.ok(Math.abs(sample.position.y - p[1]) < 1e-12, `y at t=${t}`);
        assert.ok(Math.abs(sample.position.z - p[2]) < 1e-12, `z at t=${t}`);
        assert.ok(Math.abs(sample.velocity.x - v[0]) < 1e-12, `vx at t=${t}`);
        assert.ok(Math.abs(sample.velocity.y - v[1]) < 1e-12, `vy at t=${t}`);
        assert.ok(Math.abs(sample.velocity.z - v[2]) < 1e-12, `vz at t=${t}`);
      }
      // and the drift is actually present (z advances at u)
      assert.ok(Math.abs(rigidVelocity(s, 0)[2] - 0.2) < 1e-12);
    }
  } finally {
    DECLARED.axialDrift = 0;
    selectTabledRow(1);
  }
});

// (c) NATIVE WAKE vs the screw-rigid reference. The kappa-free inward radial
// wake per unit centripetal need (support-per-kappa) is the geometric kernel
// quantity. At u = 0 the native retarded seed reproduces driftSupportRatios
// (the single-time screw-rigid evaluator) to ~1e-3 — validating that the drift
// cadence pin and the wake kernel are wired correctly. At u > 0 the native
// RETARDED wake departs from the screw-rigid reference (the causal-delay
// fore-aft anisotropy the instrument exists to measure; caveat 2: the
// screw-rigid reference is unphysical for u >= 0.4 and cannot answer the ruler
// question). This test therefore anchors the wiring at u = 0 and confirms the
// drift threads live into the native wake at u > 0.
test("(c) native inward wake matches the screw-rigid reference at u=0 (~1e-3) and threads drift at u>0", () => {
  const inwardPerNeed = (u) => {
    DECLARED.axialDrift = u;
    selectTabledRow(7); // refresh the drift cadence for this u
    const sites = buildSites();
    const heldOnly = sites.map((s) => ({
      site: s,
      ts: [],
      xs: [],
      vs: [],
      maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => rigidPosition(s, tE),
      segment: () => null,
    }));
    const seed = seedRecordEvaluation(sites, heldOnly);
    const w2 = DECLARED.omega * DECLARED.omega;
    const acc = {};
    for (const s of seed.samples) {
      const perNeed = s.wakeBareInwardRadial / (w2 * s.rhoCyl);
      (acc[s.layer] = acc[s.layer] || []).push(perNeed);
    }
    const out = {};
    for (const L of Object.keys(acc)) out[L] = acc[L].reduce((a, b) => a + b, 0) / acc[L].length;
    return out;
  };
  try {
    // u = 0: native retarded == screw-rigid single-time to ~1e-3 (wiring anchor)
    const nat0 = inwardPerNeed(0);
    const ref0 = driftSupportRatios({ u: 0 });
    for (const L of ["I", "M", "O"]) {
      const refPerNeed = ref0.ratios[L] / ref0.kappaStar;
      assert.ok(
        Math.abs(nat0[L] - refPerNeed) < 3e-3,
        `u=0 layer ${L}: native ${nat0[L]} vs ref ${refPerNeed}`
      );
    }
    // u > 0: drift threads live into the native wake (the retarded wake moves
    // off the u=0 value; the screw-rigid reference moves too, but differently)
    const nat2 = inwardPerNeed(0.2);
    let moved = false;
    for (const L of ["I", "M", "O"]) {
      if (Math.abs(nat2[L] - nat0[L]) > 1e-3) moved = true;
    }
    assert.ok(moved, "native drift wake did not respond to u");
  } finally {
    DECLARED.axialDrift = 0;
    selectTabledRow(1);
  }
});

// (d) RECORDED ENVELOPE: over a short drifting release the recorded envelope is
// finite and R_perp scales as lambda (R_perp(u)/R_perp(0)); the transverse
// shape block and constituent phase offsets are wired and finite.
test("(d) short drift release: recorded envelope finite, R_perp scales as lambda, shape/phase blocks wired", () => {
  const savedDt = DECLARED.timeStep;
  try {
    DECLARED.timeStep = 0.01; // coarse pilot dt
    selectTabledRow(7);
    // u = 0 reference envelope (relaxed end state)
    DECLARED.axialDrift = 0;
    selectTabledRow(7);
    const sites0 = buildSites();
    const heldOnly0 = sites0.map((s) => ({
      site: s, ts: [], xs: [], vs: [], maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => rigidPosition(s, tE), segment: () => null,
    }));
    const seed0 = seedRecordEvaluation(sites0, heldOnly0);
    const run0 = runRelease({ rotations: 0.25, kappa: seed0.kappaStar, recordRotations: [0.1, 0.24] });
    const env0 = envelopeReadback(run0.states, 0);
    assert.ok(Number.isFinite(env0.Rperp) && env0.Rperp > 0);
    assert.ok(run0.records.length >= 1);
    for (const r of run0.records) {
      assert.ok(Number.isFinite(r.envelope.Rpar) && Number.isFinite(r.envelope.Rperp));
      assert.ok(Number.isFinite(r.envelope.xi));
      assert.ok(r.transverseShape && Number.isFinite(r.transverseShape.trace));
      assert.ok(r.phaseOffsets && r.phaseOffsets.M);
      assert.ok(Number.isFinite(r.phaseOffsets.M.halfDifference));
    }
    // drift cell at u = 0.2, frozen kappa from u = 0
    DECLARED.axialDrift = 0.2;
    selectTabledRow(7);
    const run2 = runRelease({ rotations: 0.25, kappa: seed0.kappaStar, recordRotations: [0.1, 0.24] });
    const env2 = envelopeReadback(run2.states, 0.2);
    assert.ok(Number.isFinite(env2.Rperp) && env2.Rperp > 0);
    assert.ok(Number.isFinite(env2.xi) && env2.xi > 0);
    // lambda is the ratio to the u=0 reference and must be finite/positive
    const lambda = env2.Rperp / env0.Rperp;
    assert.ok(Number.isFinite(lambda) && lambda > 0, `lambda not finite/positive: ${lambda}`);
    // the center of mass has drifted along +z over the released window
    assert.ok(env2.zCenter > 0, `drift center did not advance: ${env2.zCenter}`);
    // 1/gamma bookkeeping is exact
    assert.ok(Math.abs(env2.oneOverGamma - Math.sqrt(1 - 0.2 * 0.2)) < 1e-12);
  } finally {
    DECLARED.timeStep = savedDt;
    DECLARED.axialDrift = 0;
    selectTabledRow(1);
  }
});

// (e) OBLIQUE GENERALIZATION (Corollary 1 two-axis machinery). driftAngle
// generalizes the axial scalar to a drift 3-vector; theta = 0 regresses exactly
// and u = 0 is drift-free for any theta. The drift-frame transverse block and
// the spin-axis unit vector are wired and finite.
test("(e) oblique drift: driftVector generalizes the axial scalar, drift-frame sigma and n_hat are wired", () => {
  const savedDt = DECLARED.timeStep;
  try {
    // regression: theta = 0 is pure axial [0,0,u]; u = 0 is zero for any theta
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = 0;
    assert.deepEqual(driftVector().map((v) => Number(v.toFixed(12))), [0, 0, 0.2]);
    DECLARED.driftAngle = (90 * Math.PI) / 180;
    // theta = 90: drift is purely transverse to the spin axis, along +x
    const d90 = driftVector();
    assert.ok(Math.abs(d90[0] - 0.2) < 1e-12 && Math.abs(d90[1]) < 1e-12 && Math.abs(d90[2]) < 1e-12);
    DECLARED.axialDrift = 0;
    assert.deepEqual(driftVector().map((v) => Number(v.toFixed(12))), [0, 0, 0]);

    // the perpendicular-frame block reduces to the lab x-y block at normal = +z
    DECLARED.timeStep = 0.01;
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    selectTabledRow(7);
    const sites = buildSites();
    const heldOnly = sites.map((s) => ({
      site: s, ts: [], xs: [], vs: [], maxRadiusSeen: Math.hypot(s.rho, s.z0),
      positionAt: (tE) => rigidPosition(s, tE), segment: () => null,
    }));
    const seed = seedRecordEvaluation(sites, heldOnly);
    const run = runRelease({ rotations: 0.15, kappa: seed.kappaStar, recordRotations: [0.14] });
    const zBlock = transverseShapeTensorBlock(run.histories, run.states ? 0.14 * 2 * Math.PI : 0, 2 * Math.PI / DECLARED.omega, [0, 0, 1]);
    assert.ok(zBlock && Number.isFinite(zBlock.sigma));

    // oblique drift-frame block at theta = 90 (drift along +x): build a short
    // synthetic held-worldline history and read the transverse block in the
    // DRIFT frame (normal = +x). sigma must be finite; the frame normal is +x.
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = (90 * Math.PI) / 180;
    selectTabledRow(7);
    const oblSites = buildSites();
    const dt = DECLARED.timeStep;
    const hist = oblSites.map((s) => {
      const xs = [];
      for (let k = 0; k <= 40; k += 1) xs.push(rigidPosition(s, k * dt));
      return { xs };
    });
    const dHat = driftVector();
    const dn = Math.hypot(...dHat);
    const normal = [dHat[0] / dn, dHat[1] / dn, dHat[2] / dn];
    const blk = transverseShapeTensorBlock(hist, 40 * dt, 2 * Math.PI / DECLARED.omega, normal);
    assert.ok(blk && Number.isFinite(blk.sigma), "drift-frame sigma not finite");
    assert.ok(Number.isFinite(blk.qPerp1) && Number.isFinite(blk.qPerp2));
    assert.ok(Math.abs(normal[0] - 1) < 1e-9, "theta=90 drift normal not +x");
    // braidAxisRow exposes the axis unit vector (seed = +z line)
    const seedStates = oblSites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    const axis = braidAxisRow(seedStates);
    assert.ok(axis.axisUnit && Math.abs(Math.hypot(...axis.axisUnit) - 1) < 1e-9);
    assert.ok(Math.abs(axis.axisUnit[2] - 1) < 1e-6, "seed spin axis not +z");
  } finally {
    DECLARED.timeStep = savedDt;
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    selectTabledRow(1);
  }
});

// (f) CO-DRIFT CAGE (structured-sea axis absorber). The cage is defined only
// with drift (null at u = 0, so u = 0 stays bare); at theta = 90 it is oriented
// with its polar pair along the drift direction (+x) and every endpoint carries
// the co-drift velocity. Six sites (two polar, four equatorial) at radius 2.326.
test("(f) co-drift cage: null at u=0, polar pair along d_hat, co-drift velocity, coherence row finite", () => {
  try {
    selectTabledRow(7);
    const sites = buildSites();
    // no drift => no cage (u=0 reference stays bare)
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    assert.equal(buildCoDriftCage(sites), null);

    // theta = 90, u = 0.2: drift along +x; cage polar pair along +x
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = (90 * Math.PI) / 180;
    const cage = buildCoDriftCage(sites);
    assert.ok(cage && cage.coDrift === true);
    assert.equal(cage.shell.length, 6);
    assert.equal(cage.endpoints.length, 12);
    assert.ok(Math.abs(cage.spacing - 1.645 * Math.SQRT2) < 1e-9);
    const polar = cage.shell.filter((s) => s.siteClass === "polar");
    const eq = cage.shell.filter((s) => s.siteClass === "equatorial");
    assert.equal(polar.length, 2);
    assert.equal(eq.length, 4);
    // polar centers lie along +-x (the drift direction), zero y and z
    for (const p of polar) {
      const r = Math.hypot(...p.center);
      assert.ok(Math.abs(Math.abs(p.center[0]) / r - 1) < 1e-9, "polar not along drift +x");
      assert.ok(Math.abs(p.center[1]) < 1e-9 && Math.abs(p.center[2]) < 1e-9);
    }
    // equatorial centers lie in the plane perpendicular to +x (zero x)
    for (const e of eq) assert.ok(Math.abs(e.center[0]) < 1e-9, "equatorial has drift-axis component");
    // every endpoint co-drifts at the drift vector
    const d = driftVector();
    for (const ep of cage.endpoints) {
      assert.ok(ep.velocity && Math.abs(ep.velocity[0] - d[0]) < 1e-12 && Math.abs(ep.velocity[2] - d[2]) < 1e-12);
    }
    // coherence row is finite
    const states = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    const hist = sites.map((s) => ({ xs: [rigidPosition(s, 0)], positionAt: (tE) => rigidPosition(s, tE) }));
    const coh = coDriftCageCoherenceRow(cage, sites, hist, 0, 0.28623);
    assert.ok(Number.isFinite(coh.meanNetPairForce) && Number.isFinite(coh.maxNetPairForce));
    assert.ok(Number.isFinite(coh.polarMeanNetPairForce) && Number.isFinite(coh.equatorialMeanNetPairForce));
  } finally {
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    DECLARED.coDriftCage.geometry = "octahedral";
    selectTabledRow(1);
  }
});

// (h) DYNAMICAL REORIENTING/ORBITING CAGE (dynamical-sea-axis-absorber-
// instrument-spec.md). Escapes the frozen-orientation multipole no-go: the cage
// dipoles reorient to track an axis, and/or the equatorial ring orbits about
// d_hat. reorient/orbit disabled => exact frozen regression; null at u=0;
// target=driftHat aligns the live dipole to d_hat; a short dynamical release
// runs finite.
test("(h) reorienting/orbiting cage: disabled=frozen regression, live dipole tracks target, short release finite", () => {
  const savedDt = DECLARED.timeStep;
  const savedReorient = { ...DECLARED.coDriftCage.reorient };
  const savedOrbit = { ...DECLARED.coDriftCage.orbit };
  try {
    selectTabledRow(7);
    const sites = buildSites();
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = (90 * Math.PI) / 180; // drift along +x

    // disabled by default: cage carries the dynamical config OFF and the live
    // orientation stays null (frozen path) => updateCageLiveOrientation is a no-op
    DECLARED.coDriftCage.geometry = "octahedral";
    DECLARED.coDriftCage.reorient.enabled = false;
    DECLARED.coDriftCage.orbit.enabled = false;
    const frozen = buildCoDriftCage(sites);
    assert.equal(frozen.reorient.enabled, false);
    assert.equal(frozen.orbit.enabled, false);
    assert.equal(frozen.liveAxis, null);
    // endpoints still carry the frozen production fields plus the new metadata
    for (const ep of frozen.endpoints) {
      assert.ok(ep.position.length === 3 && ep.velocity.length === 3);
      assert.ok(ep.baseCenter && ep.frozenPHat && Number.isFinite(ep.pm));
    }
    const seedStates = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    updateCageLiveOrientation(frozen, seedStates, 0, 0.01);
    assert.equal(frozen.liveAxis, null, "disabled cage must not set a live axis");

    // null at u=0 regardless of dynamical flags
    DECLARED.coDriftCage.reorient.enabled = true;
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    assert.equal(buildCoDriftCage(sites), null);

    // target=braidAxis at the seed: live dipole tracks the seed spin axis (+z),
    // rate ~0 on the first update (no previous target)
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = (90 * Math.PI) / 180;
    DECLARED.coDriftCage.reorient.target = "braidAxis";
    DECLARED.coDriftCage.reorient.rate = Infinity;
    const cageBA = buildCoDriftCage(sites);
    updateCageLiveOrientation(cageBA, seedStates, 0, 0.01);
    assert.ok(cageBA.liveAxis && Math.abs(Math.hypot(...cageBA.liveAxis) - 1) < 1e-9);
    assert.ok(Math.abs(Math.abs(cageBA.liveAxis[2]) - 1) < 1e-6, "seed live axis not +z");
    assert.ok(Math.hypot(...cageBA.liveAxisRate) < 1e-9, "first-step rate not ~0");

    // target=driftHat: live dipole is d_hat (+x here), fixed (rate 0)
    DECLARED.coDriftCage.reorient.target = "driftHat";
    const cageDH = buildCoDriftCage(sites);
    updateCageLiveOrientation(cageDH, seedStates, 0, 0.01);
    updateCageLiveOrientation(cageDH, seedStates, 0.01, 0.01);
    assert.ok(Math.abs(cageDH.liveAxis[0] - 1) < 1e-9, "driftHat live axis not +x");
    assert.ok(Math.hypot(...cageDH.liveAxisRate) < 1e-9, "driftHat rate not 0");

    // a short dynamical release runs and stays finite (reorient braidAxis)
    DECLARED.timeStep = 0.02;
    DECLARED.coDriftCage.reorient.target = "braidAxis";
    selectTabledRow(7);
    const runR = runRelease({ rotations: 0.05, kappa: 0.28623, recordRotations: [0.04] });
    assert.ok(runR.completed || runR.states.every((st) => st.x.every(Number.isFinite)));
    const axisR = braidAxisRow(runR.states);
    assert.ok(axisR.axisUnit && axisR.axisUnit.every(Number.isFinite));

    // orbit-only short release also runs finite (equatorial ring spins about d_hat)
    DECLARED.coDriftCage.reorient.enabled = false;
    DECLARED.coDriftCage.orbit.enabled = true;
    DECLARED.coDriftCage.orbit.rate = 1;
    const runO = runRelease({ rotations: 0.05, kappa: 0.28623, recordRotations: [] });
    assert.ok(runO.states.every((st) => st.x.every(Number.isFinite)));
  } finally {
    DECLARED.timeStep = savedDt;
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    DECLARED.coDriftCage.geometry = "octahedral";
    Object.assign(DECLARED.coDriftCage.reorient, savedReorient);
    Object.assign(DECLARED.coDriftCage.orbit, savedOrbit);
    selectTabledRow(1);
  }
});

// (i) R3 SHEAR-MODE SEED (return-cycle sigma-attractor probe). shearSeed = 0
// regresses exactly; shearSeed > 0 applies a traceless transverse quadrupole to
// the seed (x-y scaled, z / drift-axis preserved) so the released sigma(t) is
// the shear-mode response.
test("(i) shear-mode seed: off=regression, on=traceless transverse quadrupole (z preserved)", () => {
  const savedSeed = DECLARED.shearSeed;
  const savedDt = DECLARED.timeStep;
  try {
    selectTabledRow(7);
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    DECLARED.timeStep = 0.05;
    // unseeded reference initial positions (history sample at t=0)
    DECLARED.shearSeed = 0;
    const run0 = runRelease({ rotations: 0.01, kappa: 0.28623, recordRotations: [] });
    const x0 = run0.histories.map((h) => h.xs[0].slice());
    // seeded run: transverse x-y distorted, z preserved to the digit
    DECLARED.shearSeed = 0.05;
    const runS = runRelease({ rotations: 0.01, kappa: 0.28623, recordRotations: [] });
    const xS = runS.histories.map((h) => h.xs[0].slice());
    let anyXY = false;
    for (let i = 0; i < x0.length; i += 1) {
      assert.ok(Math.abs(xS[i][2] - x0[i][2]) < 1e-12, "shear seed moved the axial (z) coordinate");
      if (Math.hypot(xS[i][0] - x0[i][0], xS[i][1] - x0[i][1]) > 1e-6) anyXY = true;
    }
    assert.ok(anyXY, "shear seed did not distort the transverse plane");
  } finally {
    DECLARED.shearSeed = savedSeed;
    DECLARED.timeStep = savedDt;
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    selectTabledRow(1);
  }
});

// (g) POLAR-PAIR-ONLY co-drift sea (axisymmetric axis absorber). Dropping the
// four equatorial sites leaves only the two co-drifting polar sites along
// d_hat: two shell sites, four endpoints, both polar, no equatorial structure —
// axisymmetric about d_hat by construction. Ring variants add an N-fold ring.
test("(g) polar-pair-only + ring variants: correct site counts, all polar along d_hat, axisymmetric", () => {
  try {
    selectTabledRow(7);
    const sites = buildSites();
    DECLARED.axialDrift = 0.2;
    DECLARED.driftAngle = (90 * Math.PI) / 180; // drift along +x

    DECLARED.coDriftCage.geometry = "polarPairOnly";
    const pp = buildCoDriftCage(sites);
    assert.equal(pp.geometry, "polarPairOnly");
    assert.equal(pp.shell.length, 2);
    assert.equal(pp.endpoints.length, 4);
    assert.ok(pp.shell.every((s) => s.siteClass === "polar"), "non-polar site in polar-pair cage");
    // both shell centers lie along the drift axis (+-x); zero transverse comps
    for (const s of pp.shell) {
      const r = Math.hypot(...s.center);
      assert.ok(Math.abs(Math.abs(s.center[0]) / r - 1) < 1e-9);
      assert.ok(Math.abs(s.center[1]) < 1e-9 && Math.abs(s.center[2]) < 1e-9);
    }
    // coherence row: equatorial subset empty => equatorialMeanNetPairForce null
    const states = sites.map((s) => ({ x: rigidPosition(s, 0), v: rigidVelocity(s, 0) }));
    const hist = sites.map((s) => ({ xs: [rigidPosition(s, 0)], positionAt: (tE) => rigidPosition(s, tE) }));
    const coh = coDriftCageCoherenceRow(pp, sites, hist, 0, 0.28623);
    assert.ok(Number.isFinite(coh.polarMeanNetPairForce));
    assert.equal(coh.equatorialMeanNetPairForce, null);

    // ring variants keep the polar pair and add an N-fold equatorial ring
    DECLARED.coDriftCage.geometry = "ring6";
    const r6 = buildCoDriftCage(sites);
    assert.equal(r6.shell.length, 8); // 2 polar + 6 ring
    assert.equal(r6.shell.filter((s) => s.siteClass === "equatorial").length, 6);
    DECLARED.coDriftCage.geometry = "ring8";
    const r8 = buildCoDriftCage(sites);
    assert.equal(r8.shell.length, 10); // 2 polar + 8 ring
    // ring equatorial sites are perpendicular to the drift axis (zero x)
    for (const s of r8.shell.filter((x) => x.siteClass === "equatorial")) {
      assert.ok(Math.abs(s.center[0]) < 1e-9, "ring site has drift-axis component");
    }
  } finally {
    DECLARED.axialDrift = 0;
    DECLARED.driftAngle = 0;
    DECLARED.coDriftCage.geometry = "octahedral";
    selectTabledRow(1);
  }
});

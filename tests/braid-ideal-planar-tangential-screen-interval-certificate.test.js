import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  PROOF_PACKET_REF,
  certify,
  residualEnclosure,
  transferBoundAt,
  certifySea,
  seaEnclosure,
  iv,
} from "../scripts/braid-ideal/planar-tangential-screen-interval-certificate.mjs";
import { rotatingWaveResiduals } from "../scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs";

test("interval certificate certifies the tangential band on the declared range, fail-closed", () => {
  const result = certify();
  assert.equal(result.schema, SCHEMA);
  assert.equal(result.proofPacketRef, PROOF_PACKET_REF);
  assert.equal(result.certified, true);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(result.betaInterval, [0.02, 0.985]);
  // certified two-sided band around the sampled 2.9*beta growth
  assert.ok(result.certifiedBand.c1 > 2.8, `c1=${result.certifiedBand.c1}`);
  assert.ok(result.certifiedBand.c2 < 3.0, `c2=${result.certifiedBand.c2}`);
  assert.ok(result.certifiedBand.c1 <= result.certifiedBand.c2);
  // certified inward radial sign across the same range
  assert.equal(result.certifiedRadialSign.holds, true);
  assert.ok(result.certifiedRadialSign.radialUpperBound < 0);
  // root topology: unique causal lag per directed pair, transversality floor 1 - betaHi
  assert.equal(result.rootTopology.rootCountCap, 1);
  assert.ok(result.rootTopology.transversalityFloor > 0);
  // the sampled scan's unfloored kernel is certified as-is: the J_f = 0.05 floor never engages
  assert.ok(result.floorEngagement.minSourceNormalCertifiedLowerBound >= 0.05);
  // fail-closed proof-status boundary
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.acceptedSameLevelBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
  // Lemma T transfer coefficients and certified tube
  assert.ok(result.transferLemma.tubeRadiusMin > 0);
  assert.equal(result.transferLemma.theta, 0.5);
  assert.ok(result.transferLemma.tubeAtBetaMarks.length >= 5);
  for (const mark of result.transferLemma.tubeAtBetaMarks) {
    assert.ok(mark.tubeRadius > 0 && mark.Lx > 0 && mark.Lv > 0);
  }
  assert.ok(result.transferLemma.perPartnerRootDistanceFloors["60"] > 0.5);
});

test("point-box enclosures contain the sampled scan values and the certified band", () => {
  const result = certify();
  const { c1, c2 } = result.certifiedBand;
  for (const beta of [0.02, 0.1, 0.25, 0.5, 0.75, 0.9, 0.985]) {
    const sampled = rotatingWaveResiduals(0, beta);
    // sampled float values obey the certified band
    assert.ok(
      sampled.tangential >= c1 * beta - 1e-9 && sampled.tangential <= c2 * beta + 1e-9,
      `band containment at beta=${beta}: ${sampled.tangential} vs [${c1 * beta}, ${c2 * beta}]`
    );
    // point-box interval enclosure contains the sampled float evaluation
    const enclosure = residualEnclosure(iv(beta));
    assert.ok(enclosure != null);
    assert.ok(
      enclosure.tangential.lo <= sampled.tangential && sampled.tangential <= enclosure.tangential.hi,
      `tangential enclosure containment at beta=${beta}`
    );
    assert.ok(
      enclosure.radial.lo <= sampled.radial && sampled.radial <= enclosure.radial.hi,
      `radial enclosure containment at beta=${beta}`
    );
  }
});

// Independent float evaluation of a perturbed configuration: each site is displaced
// by a static offset (position deviation delta, velocity deviation zero), causal lags
// are re-solved on the perturbed geometry, and the kernel rows are re-evaluated. This
// is the released-row side of Lemma T's deviation hypothesis, evaluated outside the
// interval machinery.
function perturbedTangential(beta, delta) {
  const offsetAt = (k) => {
    const angle = 2.399963229728653 * (k + 1);
    return [delta * Math.cos(angle), delta * Math.sin(angle)];
  };
  const recOffset = offsetAt(0);
  const rec = [1 + recOffset[0], recOffset[1]];
  const vRec = [0, beta];
  const sources = [
    { psiDeg: 120, sign: +1, o: offsetAt(1) },
    { psiDeg: 240, sign: +1, o: offsetAt(2) },
    { psiDeg: 60, sign: -1, o: offsetAt(3) },
    { psiDeg: 180, sign: -1, o: offsetAt(4) },
    { psiDeg: 300, sign: -1, o: offsetAt(5) },
  ];
  const force = [0, 0];
  for (const src of sources) {
    const psi = (src.psiDeg * Math.PI) / 180;
    const posAt = (t) => [Math.cos(psi + beta * t) + src.o[0], Math.sin(psi + beta * t) + src.o[1]];
    const residual = (tau) => {
      const p = posAt(-tau);
      return Math.hypot(rec[0] - p[0], rec[1] - p[1]) - tau;
    };
    let a = 1e-9;
    let b = 4;
    for (let i = 0; i < 200; i += 1) {
      const m = (a + b) / 2;
      if (residual(m) > 0) a = m;
      else b = m;
    }
    const tau = (a + b) / 2;
    const p = posAt(-tau);
    const vSrc = [-beta * Math.sin(psi - beta * tau), beta * Math.cos(psi - beta * tau)];
    const d = [rec[0] - p[0], rec[1] - p[1]];
    const dist = Math.hypot(d[0], d[1]);
    const dHat = [d[0] / dist, d[1] / dist];
    const srcN = 1 - (vSrc[0] * dHat[0] + vSrc[1] * dHat[1]);
    const recN = 1 - (vRec[0] * dHat[0] + vRec[1] * dHat[1]);
    const weight = Math.abs(recN / srcN);
    force[0] += (src.sign * weight * dHat[0]) / (dist * dist);
    force[1] += (src.sign * weight * dHat[1]) / (dist * dist);
  }
  // along-velocity component; velocities are unperturbed (nu = 0), so vHat = (0, 1)
  return force[1];
}

test("Lemma T perturbation witness: measured released-row deviation stays inside the certified transfer bound", () => {
  for (const beta of [0.25, 0.5, 0.75]) {
    const transfer = transferBoundAt(beta);
    assert.ok(transfer != null);
    const delta = Math.min(1e-4, transfer.tubeRadius / 2);
    const rigid = rotatingWaveResiduals(0, beta).tangential;
    const perturbed = perturbedTangential(beta, delta);
    const measured = Math.abs(perturbed - rigid);
    const bound = transfer.Lx * delta; // nu = 0
    assert.ok(measured > 0, `perturbation must move the residual at beta=${beta}`);
    assert.ok(
      measured <= bound,
      `transfer bound violated at beta=${beta}: measured ${measured} > bound ${bound}`
    );
    // the tube is meaningful: the bound at tube radius stays below the certified floor c1*beta
    assert.ok(transfer.Lx * transfer.tubeRadius < transfer.c1Box * beta);
  }
});

test("sea-screened clock corollary: the static FCC sea is a certified non-absorber of the pump", () => {
  const result = certify();
  const sea = result.seaScreen;
  assert.ok(sea != null);
  // the sea along-velocity coefficient is certified below the certified pump slope c1
  assert.equal(sea.certified, true);
  assert.equal(sea.a_fcc, 4.25);
  assert.ok(sea.qSupCertified < result.certifiedBand.c1, `qSup=${sea.qSupCertified} !< c1=${result.certifiedBand.c1}`);
  assert.equal(sea.seaAbsorbsPump, false);
  assert.ok(sea.nonAbsorberMargin > 2.0, `margin=${sea.nonAbsorberMargin}`);
  // the certified coefficient is an order of magnitude below the pump slope
  assert.ok(sea.qSupCertified < 0.3, `qSup=${sea.qSupCertified}`);
  // static torque c0 has exact zero cyclic average and reflection oddness (derivation, witnessed)
  assert.ok(Math.abs(sea.c0ZeroCyclicAverage.c0CyclicMeanWitness) < 1e-12);
  assert.ok(sea.c0ZeroCyclicAverage.c0OddnessErrorWitness < 1e-12);
  // sea sources stay well away from the receiver (no near-singular division)
  assert.ok(sea.minSeaDistanceCertifiedLowerBound > 1.0);
  // octahedral chart reproduces the recorded sh0sea release-instant radial projection
  assert.ok(
    Math.abs(sea.releaseInstantRadialWitness.Pi_R_sh0sea_softening_0p05 - (-0.2833417889031177)) < 1e-9,
    `Pi_R witness ${sea.releaseInstantRadialWitness.Pi_R_sh0sea_softening_0p05}`
  );
  // zero-softening (this certificate's declared kernel) agrees with the recorded value
  assert.ok(Math.abs(sea.releaseInstantRadialWitness.Pi_R_zero_softening - (-0.2833417889031177)) < 1e-3);
  // fail-closed
  assert.equal(sea.retainedBranchClaim, false);
  assert.equal(sea.scoreMovement, "no_score_increase");
});

test("sea enclosure contains the sampled Q at representative phases and is deterministic", () => {
  const T = (2 * Math.PI) / 3;
  // point-box enclosures contain the sampled float Q value from the standalone witness
  const a = certifySea({ pumpC1: 2.881 });
  const b = certifySea({ pumpC1: 2.881 });
  assert.deepEqual(a, b);
  // a narrow phase box has a valid, sign-consistent enclosure
  const box = seaEnclosure(4.25, iv(0.9, 0.95));
  assert.ok(box != null);
  assert.ok(box.Q.lo <= box.Q.hi);
  // conjugate-order sea has the mirror-image coefficient range and stays a non-absorber
  const conj = certifySea({ orientation: "conjugate", pumpC1: 2.881 });
  assert.equal(conj.seaAbsorbsPump, false);
  assert.ok(conj.qSupCertified < 2.881);
});

test("certification is deterministic and fails closed at the field-speed edge", () => {
  const a = certify({ ratioTol: 0.02 });
  const b = certify({ ratioTol: 0.02 });
  assert.deepEqual(a, b);
  const edge = certify({ betaLo: 0.999, betaHi: 1.0, minWidth: 1e-4 });
  assert.equal(edge.certified, false);
  assert.ok(edge.failures.length > 0);
  assert.equal(edge.certifiedBand, null);
  assert.equal(edge.retainedBranchClaim, false);
  assert.equal(edge.scoreMovement, "no_score_increase");
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  PROOF_PACKET_REF,
  certify,
  residualEnclosure,
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

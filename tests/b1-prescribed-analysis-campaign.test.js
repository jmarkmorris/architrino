import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  B1_CAP_ANGLE_CAMPAIGN_SUMMARY_SCHEMA,
  DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH,
  assertCampaignPacketPasses,
  buildB1CapAngleCampaign,
  checkB1CapAngleCampaign,
  generateSeededB1CapAngleSamples,
  loadAndBuildB1CapAngleCampaign,
  validateB1CapAngleCampaignManifest,
} from "../scripts/eom/run-b1-prescribed-analysis-campaign.mjs";

function readManifest() {
  return JSON.parse(fs.readFileSync(DEFAULT_B1_CAP_ANGLE_CAMPAIGN_MANIFEST_PATH, "utf8"));
}

function assertNear(actual, expected, tolerance = 1e-14) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

test("B1 smoke manifest fixes the seed, common protocol, measure, and four anchors", () => {
  const manifest = readManifest();
  assert.equal(validateB1CapAngleCampaignManifest(manifest), manifest);
  assert.deepEqual(manifest.seed, { algorithm: "mulberry32/v1", value: 20260722 });
  assert.equal(manifest.sampleCount, 4);
  assert.equal(manifest.stratification.method, "latin-hypercube/v1");
  assert.equal(manifest.samplingMeasure.id, "independent-uniform-cap-angle/v1");
  assert.equal(manifest.anchors.length, 4);
  assert.match(manifest.commonProtocol.protocolHash, /^[0-9a-f]{64}$/);
});

test("seeded sampler is reproducible and independently satisfies every cap-angle stratum", () => {
  const manifest = readManifest();
  const first = generateSeededB1CapAngleSamples(manifest);
  const second = generateSeededB1CapAngleSamples(structuredClone(manifest));
  assert.deepEqual(first, second);

  for (let dimension = 0; dimension < 3; dimension += 1) {
    assert.deepEqual(first.map((sample) => sample.strata[dimension]).sort(), [0, 1, 2, 3]);
  }
  first.forEach((sample) => {
    sample.capAngles.forEach((angle, dimension) => {
      const stratum = sample.strata[dimension];
      assert.ok(angle >= stratum * Math.PI / 8);
      assert.ok(angle < (stratum + 1) * Math.PI / 8);
      assertNear(angle, sample.unitCoordinates[dimension] * Math.PI / 2);
      const radius = manifest.fixedCoordinates.radii[dimension];
      const h = sample.axialHalfSeparations[dimension];
      const rho = sample.transverseOrbitRadii[dimension];
      assertNear(h, radius * Math.sin(angle));
      assertNear(rho, radius * Math.cos(angle));
      assertNear(h ** 2 + rho ** 2, radius ** 2);
    });
  });
});

test("campaign evaluates four anchors and four samples with the canonical result-packet contract", () => {
  const campaign = loadAndBuildB1CapAngleCampaign();
  assert.equal(campaign.summary.schema, B1_CAP_ANGLE_CAMPAIGN_SUMMARY_SCHEMA);
  assert.deepEqual(campaign.summary.caseCounts, {
    total: 8,
    anchors: 4,
    seededSamples: 4,
    passed: 8,
    failed: 0,
  });
  assert.deepEqual(campaign.summary.validity, {
    allCasesPassed: true,
    allRootTopologiesComplete: true,
    allRootTransversalityGatesPassed: true,
    allMinimumSeparationGatesPassed: true,
    allNumericalConvergenceGatesPassed: true,
  });
  assert.equal(campaign.summary.evaluator.pathEvolutionInvoked, false);
  assert.equal(campaign.summary.evaluator.eomSolverInvoked, false);
  assert.match(campaign.summary.summaryHash, /^[0-9a-f]{64}$/);

  const packets = campaign.artifacts.slice(0, 8).map((artifact) => JSON.parse(artifact.content));
  packets.forEach((packet) => {
    assert.equal(packet.schema, "prescribed-path-analysis/result-packet.v1");
    assert.equal(packet.source.taxonomy.familyId, "B");
    assert.equal(packet.source.taxonomy.memberId, "B1");
    assert.equal(packet.protocolHash, campaign.protocolHash);
    assert.equal(packet.reducedMeasures.validity.passed, true);
    assert.match(packet.source.sourceHash, /^[0-9a-f]{64}$/);
    assert.match(packet.resultHash, /^[0-9a-f]{64}$/);
  });
});

test("campaign fails closed on a changed source binding", () => {
  const manifest = readManifest();
  manifest.anchors[0].sourceFileSha256 = "0".repeat(64);
  assert.throws(
    () => buildB1CapAngleCampaign(manifest),
    /source hash mismatch/,
  );
});

test("campaign packet gate rejects EOM provenance and every fail-closed validity condition", () => {
  const campaign = loadAndBuildB1CapAngleCampaign();
  const packet = JSON.parse(campaign.artifacts[0].content);

  const eomPacket = structuredClone(packet);
  eomPacket.evaluator.eomSolverInvoked = true;
  assert.throws(
    () => assertCampaignPacketPasses(eomPacket, campaign.protocolHash, "tampered-eom"),
    /invoked path evolution or the EOM solver/,
  );

  for (const gate of [
    "rootTopologyComplete",
    "rootTransversalityPassed",
    "minimumSeparationPassed",
    "numericalConvergencePassed",
    "passed",
  ]) {
    const invalidPacket = structuredClone(packet);
    invalidPacket.reducedMeasures.validity[gate] = false;
    assert.throws(
      () => assertCampaignPacketPasses(invalidPacket, campaign.protocolHash, `tampered-${gate}`),
      /failed one or more analytical validity gates/,
    );
  }

  const incompletePacket = structuredClone(packet);
  incompletePacket.rawLedgers.causalRoots[0].rootCompletenessCertification.complete = false;
  assert.throws(
    () => assertCampaignPacketPasses(incompletePacket, campaign.protocolHash, "tampered-roots"),
    /lacks complete retained-root certification/,
  );

  const speedPacket = structuredClone(packet);
  speedPacket.rawLedgers.causalRoots[0].roots[0].certifiedSpeedBound =
    speedPacket.protocol.fieldSpeed;
  assert.throws(
    () => assertCampaignPacketPasses(speedPacket, campaign.protocolHash, "tampered-speed"),
    /lacks a strict sub-field-speed root certificate/,
  );
});

test("checked campaign packets and summary reproduce byte for byte", () => {
  assert.doesNotThrow(() => checkB1CapAngleCampaign(loadAndBuildB1CapAngleCampaign()));
});

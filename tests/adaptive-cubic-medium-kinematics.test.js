import assert from "node:assert/strict";
import test from "node:test";

import {
  adjudicateDirectionalRecords,
  analyzeSiteLocalSnapshot,
  buildNeighborReclassificationLedger,
} from "../scripts/mapping-electromagnetism/adaptive-cubic-medium-kinematics.mjs";

function matrixVector(matrix, vector) {
  return matrix.map((row) => row.reduce((sum, entry, index) =>
    sum + entry * vector[index], 0));
}

function makeSnapshot({
  side = 5,
  time = 0,
  deformation = [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  mutate,
} = {}) {
  const members = [];
  for (let x = 0; x < side; x += 1) {
    for (let y = 0; y < side; y += 1) {
      for (let z = 0; z < side; z += 1) {
        const id = `g${x}_${y}_${z}`;
        const center = matrixVector(deformation, [x, y, z]);
        const orbitRadius = 0.05;
        const orbitPhase = (x + y + z) % 2 === 0 ? 0 : Math.PI;
        const member = {
          id,
          label: [x, y, z],
          polarity: (x + y + z) % 2 === 0 ? 1 : -1,
          position: [
            center[0] + orbitRadius * Math.cos(orbitPhase),
            center[1] + orbitRadius * Math.sin(orbitPhase),
            center[2],
          ],
          siteHistory: {
            historyFingerprint: `history-${time}-${id}`,
            centerEstimatorId: "fixture-exact-center/v1",
            historyWindow: [time - 1, time + 1],
            center,
            centerError: 1e-14,
            orbitRadius,
            orbitPhase,
            frameP: [1, 0, 0],
            frameQ: [0, 1, 0],
            reconstructionResidual: 1e-12,
          },
        };
        members.push(member);
      }
    }
  }
  if (mutate) mutate(members);
  return {
    schema: "adaptive_cubic_medium_snapshot/v1",
    time,
    spacing: 1,
    checkerboardPhase: 1,
    members,
  };
}

function member(snapshot, id) {
  return snapshot.members.find((entry) => entry.id === id);
}

function moveCenter(snapshot, id, center) {
  const target = member(snapshot, id);
  target.siteHistory.center = center;
  target.position = [
    center[0] + target.siteHistory.orbitRadius *
      Math.cos(target.siteHistory.orbitPhase),
    center[1] + target.siteHistory.orbitRadius *
      Math.sin(target.siteHistory.orbitPhase),
    center[2],
  ];
}

test("site-local analyzer recovers the cubic neighbor gap and identity map", () => {
  const snapshot = makeSnapshot();
  const result = analyzeSiteLocalSnapshot(snapshot, {
    probeMemberIds: ["g2_2_2"],
  });
  assert.equal(result.allNeighborRanksCertified, true);
  assert.deepEqual(result.neighborCertificates[0].neighborIds, [
    "g1_2_2", "g2_1_2", "g2_2_1", "g2_2_3", "g2_3_2", "g3_2_2",
  ]);
  assert.ok(result.neighborCertificates[0].rankGapLower > 0.4);
  assert.deepEqual(result.deformationRecords[0].deformationGradient, [
    [1, 0, 0], [0, 1, 0], [0, 0, 1],
  ]);
  assert.ok(result.deformationRecords[0].maximumGreenStrainMagnitude < 1e-14);
});

test("site-local analyzer reconstructs affine shear without naming a modulus", () => {
  const deformation = [[1, 0.1, 0], [0, 1, 0], [0, 0, 1]];
  const snapshot = makeSnapshot({ deformation });
  const result = analyzeSiteLocalSnapshot(snapshot, {
    probeMemberIds: ["g2_2_2"],
  });
  const record = result.deformationRecords[0];
  assert.ok(Math.max(...record.deformationGradient.flatMap((row, i) =>
    row.map((entry, j) => Math.abs(entry - deformation[i][j])))) < 1e-14);
  assert.ok(Math.abs(record.greenStrain[0][1] - 0.05) < 1e-14);
  assert.ok(Math.abs(record.greenStrain[1][1] - 0.005) < 1e-14);
  assert.ok(record.maximumRotationFacingSkewMagnitude > 0.049);
});

test("neighbor change remains kinematic until every transition account closes", () => {
  const before = makeSnapshot({ time: 0 });
  const after = makeSnapshot({
    time: 1,
    mutate(members) {
      const snapshot = { members };
      moveCenter(snapshot, "g4_4_4", [2, 2, 2.2]);
      moveCenter(snapshot, "g3_2_2", [4, 2, 2]);
    },
  });
  const result = buildNeighborReclassificationLedger({
    before,
    after,
    probeMemberIds: ["g2_2_2"],
  });
  assert.equal(result.events[0].changed, true);
  assert.deepEqual(result.events[0].addedNeighborIds, ["g4_4_4"]);
  assert.deepEqual(result.events[0].removedNeighborIds, ["g3_2_2"]);
  assert.equal(result.decision, "kinematic_reclassification_only_missing_accounts");
  assert.ok(result.missingEvidence.some((row) => row.field === "energy"));
});

test("closed structural evidence advances reorganization only to a retention test", () => {
  const before = makeSnapshot({ time: 0 });
  const after = makeSnapshot({
    time: 1,
    mutate(members) {
      const snapshot = { members };
      moveCenter(snapshot, "g4_4_4", [2, 2, 2.2]);
      moveCenter(snapshot, "g3_2_2", [4, 2, 2]);
    },
  });
  const transitionEvidence = {
    rankTransition: "bracketed_or_dwell_certified",
    roots: "certified_complete",
    identity: "preserved",
    pairClearance: "passed",
    speed: "passed",
    boundary: "closed",
    action: "closed",
    energy: "closed",
    momentum: "closed",
    angularMomentum: "closed",
    sourceRecoil: "closed",
    exteriorHistory: "closed",
  };
  const result = buildNeighborReclassificationLedger({
    before,
    after,
    probeMemberIds: ["g2_2_2"],
    transitionEvidence,
  });
  assert.equal(result.decision, "branch_reorganization_admissible_for_retention_test");
  assert.equal(result.missingEvidence.length, 0);
});

function directionalRecords(valuesByDirection) {
  return ["100", "110", "111"].flatMap((direction) =>
    ["primary", "refined"].map((resolution) => ({
      direction,
      resolution,
      campaignFingerprint: "campaign",
      backgroundFingerprint: "background",
      sourceFingerprint: "source",
      receiverFingerprint: "receiver",
      boundaryFingerprint: "boundary",
      sourceOrientationFingerprint: "source-orientation",
      receiverOrientationFingerprint: "receiver-orientation",
      transportRuleFingerprint: "transport-rule",
      distance: 10,
      backgroundHistoryReturn: "accepted_one_period",
      rootsStatus: "certified_complete",
      boundaryStatus: "closed",
      physicalReceiver: {
        status: "accepted_retained_assembly",
        readoutMapFingerprint: "readout",
      },
      normalizedReadouts: {
        arrival: valuesByDirection[direction] + (resolution === "primary" ? 1e-10 : 0),
        polarization: valuesByDirection[direction] / 2,
      },
    })));
}

test("directional adjudicator blocks absent physical records and rejects visible axes", () => {
  const blocked = adjudicateDirectionalRecords([], { tolerance: 1e-8 });
  assert.equal(blocked.decision, "directional_campaign_blocked");
  assert.ok(blocked.blockers.includes("missing_100_primary"));

  const visible = adjudicateDirectionalRecords(directionalRecords({
    100: 0,
    110: 2e-4,
    111: 4e-4,
  }), { tolerance: 1e-8 });
  assert.equal(
    visible.decision,
    "literal_cubic_architecture_rejected_for_claimed_isotropic_records",
  );
  assert.ok(visible.maximumDirectionalResidual > 1e-4);
});

test("directional null remains bounded to the declared matched records", () => {
  const result = adjudicateDirectionalRecords(directionalRecords({
    100: 1e-9,
    110: 2e-9,
    111: 3e-9,
  }), { tolerance: 1e-8 });
  assert.equal(
    result.decision,
    "adaptive_cubic_visibility_suppressed_within_declared_records",
  );
  assert.equal(
    result.claimBoundary,
    "bounded matched physical-receiver records; not global isotropy",
  );
});

test("neighbor ledger rejects population replacement and requires transition timing", () => {
  const before = makeSnapshot({ time: 0 });
  const after = makeSnapshot({ time: 1 });
  after.members.pop();
  assert.throws(() => buildNeighborReclassificationLedger({
    before,
    after,
    probeMemberIds: ["g2_2_2"],
  }), /same member population/);

  const changed = makeSnapshot({
    time: 1,
    mutate(members) {
      const snapshot = { members };
      moveCenter(snapshot, "g4_4_4", [2, 2, 2.2]);
      moveCenter(snapshot, "g3_2_2", [4, 2, 2]);
    },
  });
  const ledger = buildNeighborReclassificationLedger({
    before,
    after: changed,
    probeMemberIds: ["g2_2_2"],
  });
  assert.ok(ledger.missingEvidence.some((row) => row.field === "rankTransition"));
});

test("directional adjudicator blocks unmatched apparatus and unresolved refinement", () => {
  const unmatched = directionalRecords({ 100: 0, 110: 0, 111: 0 });
  unmatched[1].physicalReceiver.readoutMapFingerprint = "changed-readout";
  const unmatchedResult = adjudicateDirectionalRecords(unmatched, { tolerance: 1e-8 });
  assert.equal(unmatchedResult.decision, "directional_campaign_blocked");
  assert.ok(unmatchedResult.blockers.includes("mismatched_readoutMapFingerprint"));

  const unresolved = directionalRecords({ 100: 0, 110: 0, 111: 0 });
  unresolved.find((row) => row.direction === "100" && row.resolution === "primary")
    .normalizedReadouts.arrival = 1e-3;
  const unresolvedResult = adjudicateDirectionalRecords(unresolved, { tolerance: 1e-8 });
  assert.equal(unresolvedResult.decision, "directional_campaign_blocked");
  assert.ok(unresolvedResult.blockers.includes("refinement_residual_exceeds_tolerance"));
});

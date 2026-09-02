import test from "node:test";
import assert from "node:assert/strict";

import {
  computePrescribedObserverField,
  solvePrescribedAbsoluteHistoryRun,
} from "../src/prescribed-path-analysis/index.mjs";

const LINEAR_ANALYTIC_REQUEST = {
  historyKind: "linear-prescribed-transmitter",
  transmitterRef: { role: "source", layerId: "L" },
  branchChargeSign: 1,
  transmitter: {
    startTime: 0,
    endTime: 3,
    positionAtStart: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
  },
  receiver: {
    startTime: 0,
    endTime: 3,
    positionAtStart: { x: 2, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
  },
  hitTime: 3,
  signalSpeed: 1,
  rootTolerance: 1e-12,
  scanSubdivisions: 12,
  phaseClocks: {
    transmitterClock: { epoch: 0, period: 1, phaseOffset: 0 },
    receiverClock: { epoch: 0, period: 2, phaseOffset: 0 },
  },
  phaseMetadata: {
    transmitterRole: "source",
    transmitterLayerId: "L",
    transmitterChargeSign: 1,
    receiverRole: "receiver-binary",
    receiverLayerId: "R",
    receiverChargeSign: -1,
  },
};

test("absolute-history facade matches an independent stationary linear root and field fixture", () => {
  // Independent closed form at c_f=1: |2-0| = 3-t_e, so t_e=1,
  // delay=distance=2, D_t=D_r=1, and E_x=+1/2^2=+1/4.
  const response = solvePrescribedAbsoluteHistoryRun({
    rootRequests: [LINEAR_ANALYTIC_REQUEST],
    observerFieldRequest: {
      signalSpeed: 1,
      minimumDistance: 1e-6,
      jacobianFloor: 1e-4,
    },
  });

  assert.equal(response.schema, "prescribed-path-analysis/absolute-history-run.v1");
  assert.deepEqual(response.historyKinds, ["linear-prescribed-transmitter"]);
  assert.equal(response.status.code, "ok");
  assert.equal(response.roots.length, 1);
  assert.equal(response.roots[0].admission.status, "admitted");
  assert.ok(Math.abs(response.roots[0].emissionTime - 1) < 1e-12);
  assert.ok(Math.abs(response.roots[0].delay - 2) < 1e-12);
  assert.ok(Math.abs(response.roots[0].distance - 2) < 1e-12);
  assert.ok(Math.abs(response.observerField.electric.x - 0.25) < 1e-12);
  assert.equal(response.observerField.electric.y, 0);
  assert.equal(response.observerField.electric.z, 0);
  assert.equal(response.observerField.admittedContributionCount, 1);
  assert.equal(response.observerField.rejectedContributionCount, 0);

  const [phase] = response.roots.map((root) => root.phaseAtHit);
  assert.equal(phase.transmitter.status, "available");
  assert.equal(phase.transmitter.cycleIndex, 1);
  assert.ok(Math.abs(phase.transmitter.degrees) < 1e-12);
  assert.equal(phase.receiver.status, "available");
  assert.equal(phase.receiver.cycleIndex, 1);
  assert.ok(Math.abs(phase.receiver.degrees - 180) < 1e-12);
  assert.equal(response.receiverPhaseRecords[0].receiverRole, "receiver-binary");
  assert.equal(response.phaseSpreadDiagnostics.receiverPhaseAvailableCount, 1);
  assert.equal(response.phaseSpreadDiagnostics.families[0].key, "L|source|1|partner|1");
  assert.deepEqual(response.rejectedRootDiagnostics.rejectedRootReasonCounts, {});

  const missingReceiverClock = solvePrescribedAbsoluteHistoryRun({
    rootRequests: [{
      ...LINEAR_ANALYTIC_REQUEST,
      includeInObserverField: false,
      phaseClocks: { transmitterClock: LINEAR_ANALYTIC_REQUEST.phaseClocks.transmitterClock },
    }],
    observerFieldRequest: { signalSpeed: 1 },
  });
  assert.equal(missingReceiverClock.roots[0].phaseAtHit.transmitter.status, "available");
  assert.equal(missingReceiverClock.receiverPhaseRecords[0].status, "not_available");
  assert.equal(missingReceiverClock.roots[0].phaseAtHit.phaseDeltaCycles, null);
});

test("absolute-history facade reports an unresolved linear request by reason", () => {
  const response = solvePrescribedAbsoluteHistoryRun({
    rootRequests: [{
      ...LINEAR_ANALYTIC_REQUEST,
      receiver: {
        startTime: 0,
        endTime: 1,
        positionAtStart: { x: 1, y: 0, z: 0 },
        velocity: { x: 1, y: 0, z: 0 },
      },
      hitTime: 1,
      phaseClocks: null,
    }],
    observerFieldRequest: { signalSpeed: 1 },
  });

  assert.equal(response.status.code, "partial");
  assert.equal(response.rootCount, 0);
  assert.equal(response.unresolvedTransmitterCount, 1);
  assert.equal(response.rejectedRootDiagnostics.unresolvedRequestCount, 1);
  assert.equal(response.rejectedRootDiagnostics.rejectedRequestReasonCounts.root_not_bracketed, 1);
});

test("absolute-history facade exposes receiver phase for a same-transmitter history", () => {
  const radius = Math.sqrt(2 / 3);
  const response = solvePrescribedAbsoluteHistoryRun({
    rootRequests: [{
      historyKind: "moving-circular-same-transmitter",
      transmitterRef: { role: "trailing", layerId: "M" },
      branchChargeSign: 1,
      transmitter: {
        centerAtEpoch: { x: 0, y: 0, z: 0 },
        centerVelocity: { x: 0, y: 0, z: 0 },
        radiusU: { x: radius, y: 0, z: 0 },
        radiusV: { x: 0, y: radius, z: 0 },
        angularVelocity: 1.00196 / radius,
        angularAcceleration: 0,
        phaseAtEpoch: 0,
        epochTime: 0,
      },
      hitTime: 0.4304,
      signalSpeed: 1,
      transmitterStartTime: 0.4304 - 2,
      transmitterEndTime: 0.4304,
      minimumDelay: 0.002,
      scanSubdivisions: 1024,
      phaseMetadata: {
        transmitterRole: "trailing",
        transmitterLayerId: "M",
        receiverRole: "trailing",
        receiverLayerId: "M",
      },
    }],
    observerFieldRequest: { signalSpeed: 1 },
  });

  assert.ok(response.rootCount >= 1);
  assert.equal(response.observerField.contributionCount, 0);
  assert.ok(response.receiverPhaseRecords.every((record) => record.status === "available"));
  assert.equal(response.phaseSpreadDiagnostics.receiverPhaseAvailableCount, response.rootCount);
  assert.ok(response.phaseSpreadDiagnostics.families.every((family) =>
    family.rootKind === "same-transmitter" && family.receiverPhaseRecordCount > 0
  ));
});

test("observer-field reconstruction rejects an invalid direction and contributes zero", () => {
  const response = computePrescribedObserverField({
    signalSpeed: 1,
    branches: [{
      chargeSign: 1,
      direction: { x: 0, y: 0, z: 0 },
      transmitterVelocity: { x: 0, y: 0, z: 0 },
      distance: 2,
      delay: 2,
      accelerationWeight: 1,
      transmitterFactor: 1,
      receiverFactor: 1,
      rootPlayback: 1,
    }],
  });

  assert.equal(response.status.code, "direction_record_invalid");
  assert.equal(response.admittedContributionCount, 0);
  assert.equal(response.rejectedContributionCount, 1);
  assert.equal(response.rejectedContributionReasonCounts.direction_record_invalid, 1);
  assert.deepEqual(response.electric, { x: 0, y: 0, z: 0 });
});

test("absolute-history facade fails closed on an unsupported history kind", () => {
  assert.throws(
    () => solvePrescribedAbsoluteHistoryRun({ rootRequests: [{ historyKind: "arbitrary-spline" }] }),
    /Unsupported prescribed absolute-history kind/
  );
});

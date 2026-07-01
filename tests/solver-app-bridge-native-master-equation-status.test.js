import assert from "node:assert/strict";
import { test } from "node:test";

import { createSolverRunRequest } from "../src/solver/app/SolverAppAdapters.mjs";
import { createSolverAppBridgeClient } from "../src/solver/app/SolverAppBridge.mjs";

function makeMasterEquationRequest() {
  return createSolverRunRequest({
    requestId: "native-master-equation-missing-request",
    runId: "native-master-equation-missing-run",
    datasetId: "native-master-equation-missing-dataset",
    appId: "causal-delay-feedback",
    runKind: "masterEquation",
    claimLevel: "developer-test",
    precisionPath: "auto",
    configVersion: "borg-native-master-equation-fixture-probe.v1",
    configHash: "borg-native-master-equation-fixture-probe",
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "master-equation-fixed-parameter-v1",
      forceLawVersion: "architrino-master-equation-v1",
      constantsHash: "constants:borg-fixed-physical-parameters",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: 2,
      assemblyCount: 0,
      timeWindow: { start: 0, end: 1, stepHint: 0.5, units: "solver-time" },
      timeResolutionHint: 0.5,
      interactionPolicy: "all-to-all",
      expectedBranchComplexity: "moderate",
      outputDetail: "playback",
      memoryBudgetBytes: 64 * 1024 * 1024,
      storageBudgetBytes: 64 * 1024 * 1024,
      latencyTarget: "interactive",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-12,
      delayedHitTolerance: 1e-12,
      integrationTolerance: 1e-11,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    config: {
      appId: "causal-delay-feedback",
      fallbackPolicy: "fail-closed-or-default-motion-baseline",
      masterEquationRequest: {
        startTime: 0,
        endTime: 1,
        step: 0.5,
        maxFrames: 3,
        fixedPhysicalParameterSetId: "borg-fixed-physical-parameters.v1",
        masterEquationVersion: "master-equation-fixed-parameter-v1",
        forceLawVersion: "architrino-master-equation-v1",
        fieldSpeed: 3,
        historyDepth: 1,
        integrationTolerance: 1e-11,
        initialStates: [
          {
            pathKey: 1,
            initialPosition: { x: 25, y: 50, z: 50 },
            initialVelocity: { x: 0.01, y: 0, z: 0 },
            charge: 1,
            stateFlags: 1,
          },
          {
            pathKey: 2,
            initialPosition: { x: 75, y: 50, z: 50 },
            initialVelocity: { x: -0.01, y: 0, z: 0 },
            charge: -1,
            stateFlags: 2,
          },
        ],
      },
    },
    output: {
      outputs: ["summary", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

test("central bridge accepts the native master-equation request shape and fails closed without ABI", async () => {
  const client = createSolverAppBridgeClient({
    createWasmModule: async () => ({
      _malloc() {
        throw new Error("master-equation missing-capability path must not allocate");
      },
      _free() {},
    }),
  });

  const run = await client.runSimulation(makeMasterEquationRequest());
  const summary = run.response.summary;

  assert.equal(run.status.code, "ok");
  assert.equal(run.response.status.code, "native_capability_missing");
  assert.equal(run.response.status.severity, "halt");
  assert.equal(summary.executionPath, "native_c_abi_missing");
  assert.equal(summary.nativeMasterEquationStatus, "native-fixture-capability-missing");
  assert.equal(summary.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(summary.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(summary.canonicalEomEvidence, false);
  assert.equal(summary.eomEvidenceStatus, "native_master_equation_fixture_missing");
  assert.equal(summary.firstFailureCode, "native_master_equation_fixture_missing");
  assert.equal(run.response.masterEquation.requiredNativeExport, "architrino_solver_integrate_master_equation_motion_f64");
  assert.deepEqual(run.response.frames, []);
  assert.deepEqual(run.response.streams, []);
  assert.equal(
    run.response.diagnostics.some((diagnostic) => diagnostic.code === "native_capability_missing"),
    true,
  );
});

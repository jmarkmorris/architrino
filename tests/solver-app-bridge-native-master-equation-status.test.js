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
        fieldSpeed: 1,
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

function makeNativePendingMasterEquationModule() {
  const buffer = new ArrayBuffer(4096);
  const view = new DataView(buffer);
  let heapOffset = 8;
  const module = {
    HEAPU8: new Uint8Array(buffer),
    HEAPU32: new Uint32Array(buffer),
    _architrino_solver_integrate_master_equation_motion_f64() {},
    _malloc(byteLength) {
      const ptr = heapOffset;
      heapOffset += Math.ceil(byteLength / 8) * 8;
      return ptr;
    },
    _free() {},
    setValue(ptr, value, type) {
      if (type === "double") {
        view.setFloat64(ptr, value, true);
        return;
      }
      if (type === "i32") {
        view.setInt32(ptr, value, true);
        return;
      }
      if (type === "i8") {
        view.setInt8(ptr, value);
        return;
      }
      throw new Error(`unsupported setValue type ${type}`);
    },
    getValue(ptr, type) {
      if (type === "double") {
        return view.getFloat64(ptr, true);
      }
      if (type === "i32") {
        return view.getInt32(ptr, true);
      }
      throw new Error(`unsupported getValue type ${type}`);
    },
    cwrap(name) {
      assert.equal(name, "architrino_solver_integrate_master_equation_motion_f64");
      return (
        requestPtr,
        statesPtr,
        stateCount,
        framesPtr,
        maxFrames,
        frameCountPtr,
        pathRowsPtr,
        maxPathRows,
        pathRowCountPtr,
        summaryPtr,
      ) => {
        assert.notEqual(requestPtr, 0);
        assert.notEqual(statesPtr, 0);
        assert.equal(stateCount, 2);
        assert.notEqual(framesPtr, 0);
        assert.equal(maxFrames, 6);
        assert.notEqual(pathRowsPtr, 0);
        assert.equal(maxPathRows, 4);
        view.setInt32(frameCountPtr, 0, true);
        view.setInt32(pathRowCountPtr, 0, true);
        view.setUint32(summaryPtr, 1, true);
        view.setUint32(summaryPtr + 4, 1, true);
        view.setUint32(summaryPtr + 8, 1, true);
        view.setUint32(summaryPtr + 12, 0, true);
        view.setBigUint64(summaryPtr + 16, BigInt(stateCount), true);
        view.setBigUint64(summaryPtr + 24, 0n, true);
        view.setBigUint64(summaryPtr + 32, 0n, true);
        view.setBigUint64(summaryPtr + 40, 0n, true);
        view.setBigUint64(summaryPtr + 48, 0n, true);
        view.setFloat64(summaryPtr + 56, view.getFloat64(requestPtr, true), true);
        view.setFloat64(summaryPtr + 64, view.getFloat64(requestPtr + 8, true), true);
        view.setFloat64(summaryPtr + 72, view.getFloat64(requestPtr + 16, true), true);
        view.setFloat64(summaryPtr + 80, view.getFloat64(requestPtr + 24, true), true);
        view.setFloat64(summaryPtr + 88, view.getFloat64(requestPtr + 32, true), true);
        view.setFloat64(summaryPtr + 96, view.getFloat64(requestPtr + 40, true), true);
        view.setUint32(summaryPtr + 104, view.getUint32(requestPtr + 52, true), true);
        view.setUint32(summaryPtr + 108, view.getUint32(requestPtr + 56, true), true);
        view.setUint32(summaryPtr + 112, view.getUint32(requestPtr + 60, true), true);
        return -5;
      };
    },
  };
  return module;
}

function makeNativeSuccessfulMasterEquationModule() {
  const buffer = new ArrayBuffer(64 * 1024);
  const view = new DataView(buffer);
  let heapOffset = 8;
  const module = {
    HEAPU8: new Uint8Array(buffer),
    HEAPU32: new Uint32Array(buffer),
    _architrino_solver_integrate_master_equation_motion_f64() {},
    _malloc(byteLength) {
      const ptr = heapOffset;
      heapOffset += Math.ceil(byteLength / 8) * 8;
      return ptr;
    },
    _free() {},
    setValue(ptr, value, type) {
      if (type === "double") {
        view.setFloat64(ptr, value, true);
        return;
      }
      if (type === "i32") {
        view.setInt32(ptr, value, true);
        return;
      }
      if (type === "i8") {
        view.setInt8(ptr, value);
        return;
      }
      throw new Error(`unsupported setValue type ${type}`);
    },
    getValue(ptr, type) {
      if (type === "double") {
        return view.getFloat64(ptr, true);
      }
      if (type === "i32") {
        return view.getInt32(ptr, true);
      }
      throw new Error(`unsupported getValue type ${type}`);
    },
    cwrap(name) {
      assert.equal(name, "architrino_solver_integrate_master_equation_motion_f64");
      return (
        requestPtr,
        statesPtr,
        stateCount,
        framesPtr,
        maxFrames,
        frameCountPtr,
        pathRowsPtr,
        maxPathRows,
        pathRowCountPtr,
        summaryPtr,
      ) => {
        assert.notEqual(requestPtr, 0);
        assert.notEqual(statesPtr, 0);
        assert.equal(stateCount, 2);
        assert.notEqual(framesPtr, 0);
        assert.equal(maxFrames, 6);
        assert.notEqual(pathRowsPtr, 0);
        assert.equal(maxPathRows, 4);

        const frames = [
          { pathKey: 1, frameIndex: 0, time: 0, px: 25, vx: 0.01, flags: 1 },
          { pathKey: 2, frameIndex: 0, time: 0, px: 75, vx: -0.01, flags: 2 },
          { pathKey: 1, frameIndex: 1, time: 0.5, px: 25.006, vx: 0.014, flags: 1 },
          { pathKey: 2, frameIndex: 1, time: 0.5, px: 74.994, vx: -0.014, flags: 2 },
          { pathKey: 1, frameIndex: 2, time: 1, px: 25.014, vx: 0.018, flags: 1 },
          { pathKey: 2, frameIndex: 2, time: 1, px: 74.986, vx: -0.018, flags: 2 },
        ];
        frames.forEach((frame, index) => writeFrameRow(view, framesPtr + index * 88, frame));
        const pathRows = [
          { pathKey: 1, segmentIndex: 0, startTime: 0, endTime: 0.5, startX: 25, velocityX: 0.012, flags: 1 },
          { pathKey: 2, segmentIndex: 0, startTime: 0, endTime: 0.5, startX: 75, velocityX: -0.012, flags: 2 },
          { pathKey: 1, segmentIndex: 1, startTime: 0.5, endTime: 1, startX: 25.006, velocityX: 0.016, flags: 1 },
          { pathKey: 2, segmentIndex: 1, startTime: 0.5, endTime: 1, startX: 74.994, velocityX: -0.016, flags: 2 },
        ];
        pathRows.forEach((row, index) => writePathRow(view, pathRowsPtr + index * 96, row));

        view.setInt32(frameCountPtr, frames.length, true);
        view.setInt32(pathRowCountPtr, pathRows.length, true);
        view.setUint32(summaryPtr, 0, true);
        view.setUint32(summaryPtr + 4, 0, true);
        view.setUint32(summaryPtr + 8, 2, true);
        view.setUint32(summaryPtr + 12, 1, true);
        view.setBigUint64(summaryPtr + 16, BigInt(stateCount), true);
        view.setBigUint64(summaryPtr + 24, BigInt(frames.length), true);
        view.setBigUint64(summaryPtr + 32, BigInt(pathRows.length), true);
        view.setBigUint64(summaryPtr + 40, 0n, true);
        view.setBigUint64(summaryPtr + 48, BigInt(frames.length), true);
        view.setFloat64(summaryPtr + 56, view.getFloat64(requestPtr, true), true);
        view.setFloat64(summaryPtr + 64, view.getFloat64(requestPtr + 8, true), true);
        view.setFloat64(summaryPtr + 72, view.getFloat64(requestPtr + 16, true), true);
        view.setFloat64(summaryPtr + 80, view.getFloat64(requestPtr + 24, true), true);
        view.setFloat64(summaryPtr + 88, view.getFloat64(requestPtr + 32, true), true);
        view.setFloat64(summaryPtr + 96, view.getFloat64(requestPtr + 40, true), true);
        view.setUint32(summaryPtr + 104, view.getUint32(requestPtr + 52, true), true);
        view.setUint32(summaryPtr + 108, view.getUint32(requestPtr + 56, true), true);
        view.setUint32(summaryPtr + 112, view.getUint32(requestPtr + 60, true), true);
        return 0;
      };
    },
  };
  return module;
}

function writeFrameRow(view, ptr, frame) {
  view.setBigUint64(ptr, BigInt(frame.pathKey), true);
  view.setBigUint64(ptr + 8, BigInt(frame.frameIndex), true);
  view.setFloat64(ptr + 16, frame.time, true);
  view.setFloat64(ptr + 24, frame.px, true);
  view.setFloat64(ptr + 32, 50, true);
  view.setFloat64(ptr + 40, 50, true);
  view.setFloat64(ptr + 48, frame.vx, true);
  view.setFloat64(ptr + 56, 0, true);
  view.setFloat64(ptr + 64, 0, true);
  view.setFloat64(ptr + 72, 1e-11 * frame.frameIndex, true);
  view.setUint32(ptr + 80, frame.flags, true);
  view.setUint32(ptr + 84, 0, true);
}

function writePathRow(view, ptr, row) {
  view.setBigUint64(ptr, BigInt(row.pathKey), true);
  view.setBigUint64(ptr + 8, BigInt(row.segmentIndex), true);
  view.setFloat64(ptr + 16, row.startTime, true);
  view.setFloat64(ptr + 24, row.endTime, true);
  view.setFloat64(ptr + 32, row.startX, true);
  view.setFloat64(ptr + 40, 50, true);
  view.setFloat64(ptr + 48, 50, true);
  view.setFloat64(ptr + 56, row.velocityX, true);
  view.setFloat64(ptr + 64, 0, true);
  view.setFloat64(ptr + 72, 0, true);
  view.setFloat64(ptr + 80, 1e-11, true);
  view.setUint32(ptr + 88, row.flags, true);
  view.setUint32(ptr + 92, 0, true);
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

test("central bridge reports native master-equation pending when ABI export exists", async () => {
  const client = createSolverAppBridgeClient({
    createWasmModule: async () => makeNativePendingMasterEquationModule(),
  });

  const run = await client.runSimulation(makeMasterEquationRequest());
  const summary = run.response.summary;

  assert.equal(run.status.code, "ok");
  assert.equal(run.response.status.code, "native_solver_pending");
  assert.equal(run.response.status.severity, "halt");
  assert.equal(summary.executionPath, "native_c_abi_pending");
  assert.equal(summary.nativeStatus, -5);
  assert.equal(summary.nativeMasterEquationStatus, "native-fixture-solver-pending");
  assert.equal(summary.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(summary.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(summary.canonicalEomEvidence, false);
  assert.equal(summary.eomEvidenceStatus, "native_master_equation_solver_pending");
  assert.equal(summary.firstFailureCode, "native_master_equation_solver_pending");
  assert.equal(run.response.masterEquation.nativeSummary.initialStateCount, 2);
  assert.equal(run.response.masterEquation.nativeSummary.frameCount, 0);
  assert.equal(run.response.masterEquation.nativeSummary.pathRowCount, 0);
  assert.equal(run.response.masterEquation.requiredNativeExport, "architrino_solver_integrate_master_equation_motion_f64");
  assert.deepEqual(run.response.frames, []);
  assert.deepEqual(run.response.streams, []);
  assert.equal(
    run.response.diagnostics.some((diagnostic) => diagnostic.code === "native_solver_pending"),
    true,
  );
});

test("central bridge consumes native fixed-parameter master-equation frames and path rows", async () => {
  const client = createSolverAppBridgeClient({
    createWasmModule: async () => makeNativeSuccessfulMasterEquationModule(),
  });

  const run = await client.runSimulation(makeMasterEquationRequest());
  const summary = run.response.summary;

  assert.equal(run.status.code, "ok");
  assert.equal(run.response.status.code, "ok");
  assert.equal(summary.executionPath, "native_c_abi");
  assert.equal(summary.nativeStatus, 0);
  assert.equal(summary.nativeMasterEquationStatus, "native-fixed-parameter-master-equation");
  assert.equal(summary.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(summary.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(summary.canonicalEomEvidence, true);
  assert.equal(summary.eomEvidenceStatus, "native_master_equation_fixed_parameter_evidence");
  assert.equal(summary.firstFailureCode, "none");
  assert.equal(summary.frameCount, 6);
  assert.equal(summary.pathRowCount, 4);
  assert.equal(summary.accelerationRowCount, 6);
  assert.equal(run.response.frames.length, 6);
  assert.equal(run.response.frames[2].position.x > run.response.frames[0].position.x, true);
  assert.equal(run.response.pathHistory.rowCount, 4);
  assert.equal(run.response.pathHistory.pathCount, 2);
  assert.equal(run.response.streams.length, 1);
  assert.equal(run.response.masterEquation.nativeSummary.nativeMasterEquationStatusCode, 2);
  assert.equal(run.response.masterEquation.canonicalEomEvidence, true);
  assert.equal(
    run.response.diagnostics.some((diagnostic) => diagnostic.message.includes("native fixed-parameter")),
    true,
  );
});

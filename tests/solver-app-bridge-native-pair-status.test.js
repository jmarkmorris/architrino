import assert from "node:assert/strict";
import { test } from "node:test";

import { createSolverRunRequest } from "../src/solver/app/SolverAppAdapters.mjs";
import { createSolverAppBridgeClient } from "../src/solver/app/SolverAppBridge.mjs";

const FRAME_BUFFER_ROW_F64_BYTES = 88;

function makeAdmissionRequest() {
  return {
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "motion-root-v1",
      forceLawVersion: "causal-delay-v1",
      constantsHash: "constants:test",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    errorBudget: {
      globalTolerance: 1e-13,
      rootIsolationTolerance: 1e-14,
      delayedHitTolerance: 1e-13,
      integrationTolerance: 1e-12,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    envelope: {
      entityCount: 2,
      assemblyCount: 1,
      timeWindow: { start: 0, end: 1, stepHint: 0.5, units: "solver-time" },
      timeResolutionHint: 0.5,
      interactionPolicy: "neighbor-pruned",
      expectedBranchComplexity: "low",
      outputDetail: "playback",
      memoryBudgetBytes: 64 * 1024 * 1024,
      storageBudgetBytes: 64 * 1024 * 1024,
      latencyTarget: "interactive",
      simplificationPolicy: "none",
    },
  };
}

function makePairInteractionRequest() {
  const admission = makeAdmissionRequest();
  return createSolverRunRequest({
    requestId: "fake-native-pair-status-request",
    runId: "fake-native-pair-status",
    datasetId: "fake-native-pair-status-dataset",
    appId: "causal-delay-feedback",
    runKind: "pairInteraction",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "causal-delay-feedback-pair-native-status-test.v1",
    configHash: "causal-delay-feedback-pair-native-status-test",
    model: admission.model,
    envelope: admission.envelope,
    errorBudget: admission.errorBudget,
    config: {
      appId: "causal-delay-feedback",
      pairInteractionRequest: {
        startTime: 0,
        endTime: 1,
        step: 1,
        maxFrames: 2,
        pairAccelerationScale: 0.18,
        softening: 0,
        integrationTolerance: 1e-12,
        interactionLaw: "display_pair_attraction_v1",
        pathConstraintBoundaryRelaxationIterationCount: 8,
        pathConstraintBoundaryRelaxationTolerance: 10,
        initialStates: [
          {
            pathKey: 1,
            initialPosition: { x: 100, y: 200, z: 0 },
            initialVelocity: { x: 55, y: 20, z: 0 },
            charge: 1,
            mass: 1,
            stateFlags: 1,
          },
          {
            pathKey: 2,
            initialPosition: { x: 100, y: 700, z: 0 },
            initialVelocity: { x: 55, y: -20, z: 0 },
            charge: -1,
            mass: 1,
            stateFlags: 2,
          },
        ],
        pathConstraints: [
          { pathKey: 1, depth: 1, time: 0, position: { x: 100, y: 200, z: 0 } },
          { pathKey: 2, depth: 1, time: 0, position: { x: 100, y: 700, z: 0 } },
        ],
      },
      streamId: "fake-native-pair-status:path-history",
      rowsPerChunk: 1,
    },
    output: {
      outputs: ["frameBuffer", "pathStream", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 64 * 1024 * 1024,
      deterministic: true,
    },
  });
}

function createFakeNativePairModule() {
  const buffer = new ArrayBuffer(64 * 1024);
  const view = new DataView(buffer);
  let nextPtr = 1024;

  const module = {
    HEAPU8: new Uint8Array(buffer),
    HEAPU32: new Uint32Array(buffer),
    _architrino_solver_integrate_pair_interaction_motion_f64() {},
    _malloc(byteLength) {
      const ptr = (nextPtr + 7) & ~7;
      nextPtr = ptr + Math.max(1, byteLength);
      if (nextPtr >= buffer.byteLength) {
        throw new Error("fake native module memory exhausted");
      }
      return ptr;
    },
    _free() {},
    setValue(ptr, value, type) {
      if (type === "double") {
        view.setFloat64(ptr, Number(value), true);
      } else if (type === "i32") {
        view.setInt32(ptr, Number(value), true);
      } else if (type === "i8") {
        view.setInt8(ptr, Number(value));
      } else {
        throw new Error(`unsupported fake module setValue type ${type}`);
      }
    },
    getValue(ptr, type) {
      if (type === "double") {
        return view.getFloat64(ptr, true);
      }
      if (type === "i32") {
        return view.getInt32(ptr, true);
      }
      if (type === "i8") {
        return view.getInt8(ptr);
      }
      throw new Error(`unsupported fake module getValue type ${type}`);
    },
    cwrap(name) {
      if (name !== "architrino_solver_integrate_pair_interaction_motion_f64") {
        return () => 0;
      }
      return (
        _requestPtr,
        _statesPtr,
        _stateCount,
        _pathConstraintsPtr,
        _pathConstraintCount,
        framesPtr,
        _maxFrameRows,
        outFrameCountPtr,
        _pathRowsPtr,
        _estimatedPathRows,
        outPathRowCountPtr,
        summaryPtr,
      ) => {
        writeFrameRow(module, framesPtr, {
          pathKey: 1,
          frameIndex: 0,
          time: 0,
          x: 100,
          y: 200,
          stateFlags: 1,
        });
        writeFrameRow(module, framesPtr + FRAME_BUFFER_ROW_F64_BYTES, {
          pathKey: 2,
          frameIndex: 0,
          time: 0,
          x: 100,
          y: 700,
          stateFlags: 2,
        });
        module.setValue(outFrameCountPtr, 2, "i32");
        module.setValue(outPathRowCountPtr, 0, "i32");
        writeStaleConvergedSummary(module, summaryPtr);
        return 0;
      };
    },
  };
  return module;
}

function writeUint64(module, ptr, value) {
  const encoded = BigInt(value);
  module.HEAPU32[ptr >>> 2] = Number(encoded & 0xffffffffn);
  module.HEAPU32[(ptr >>> 2) + 1] = Number((encoded >> 32n) & 0xffffffffn);
}

function writeFrameRow(module, ptr, row) {
  writeUint64(module, ptr, row.pathKey);
  writeUint64(module, ptr + 8, row.frameIndex);
  module.setValue(ptr + 16, row.time, "double");
  module.setValue(ptr + 24, row.x, "double");
  module.setValue(ptr + 32, row.y, "double");
  module.setValue(ptr + 40, 0, "double");
  module.setValue(ptr + 48, 0, "double");
  module.setValue(ptr + 56, 0, "double");
  module.setValue(ptr + 64, 0, "double");
  module.setValue(ptr + 72, 0, "double");
  module.setValue(ptr + 80, row.stateFlags, "i32");
}

function writeStaleConvergedSummary(module, ptr) {
  module.setValue(ptr, 2, "i32");
  module.setValue(ptr + 4, 0, "i32");
  writeUint64(module, ptr + 40, 1);
  module.setValue(ptr + 48, 2.5, "double");
  module.setValue(ptr + 56, 2.5, "double");
  module.setValue(ptr + 64, 2.5, "double");
  writeUint64(module, ptr + 104, 0);
  module.setValue(ptr + 112, 0, "double");
  module.setValue(ptr + 120, 0, "double");
  module.setValue(ptr + 128, 0, "double");
  module.setValue(ptr + 136, 4, "i32");
  module.setValue(ptr + 140, 1, "i32");
  module.setValue(ptr + 144, 5, "i32");
  writeUint64(module, ptr + 280, 2);
  module.setValue(ptr + 288, 0, "double");
  module.setValue(ptr + 296, 0, "double");
  module.setValue(ptr + 304, 0, "double");
}

test("central bridge re-derives stale native boundary convergence from residual evidence", async () => {
  const client = createSolverAppBridgeClient({
    createWasmModule: async () => createFakeNativePairModule(),
  });

  const run = await client.runSimulation(makePairInteractionRequest());
  const summary = run.response.summary;

  assert.equal(run.status.code, "ok");
  assert.equal(summary.executionPath, "native_c_abi");
  assert.equal(summary.pathConstraintBoundaryRelaxationStatus, "no_relaxable_samples");
  assert.equal(summary.pathConstraintBoundaryRelaxationResidualEvidenceStatus, "no_samples");
  assert.equal(summary.pathConstraintSolverStatus, "guided_constraint_path");
  assert.equal(
    summary.pathConstraintSolverClaim,
    "diagnostic_constraint_replay_not_boundary_value_solve",
  );
  assert.equal(summary.pathConstraintPhysicalBoundarySolverStatus, "physical_boundary_solver_pending");
  assert.equal(
    summary.pathConstraintPhysicalBoundarySolverClaim,
    "retained_knot_guidance_not_physical_boundary_value_solve",
  );
  assert.equal(
    summary.pathConstraintPhysicalBoundarySolverBlockingReason,
    "retained_knot_guidance_acceleration_required",
  );
});

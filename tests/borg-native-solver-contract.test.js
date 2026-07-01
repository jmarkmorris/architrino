import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BORG_APP_SURFACE_DESIGN_V1,
  BORG_DATASET_MANIFEST_V1,
  validateBorgFixtureSnapshot,
} from "../src/apps/borg/BorgFixtureData.js";

const DEFAULT_SOLVER_MODE = "native-fixed-parameter-default-motion";
const NEXT_MASTER_EQUATION_BURDEN = "build-native-master-equation-fixed-parameter-fixture";

test("Borg fixture is a native fixed-parameter solver run, not tuned visual pair dynamics", () => {
  validateBorgFixtureSnapshot({
    manifest: BORG_DATASET_MANIFEST_V1,
    surfaceDesign: BORG_APP_SURFACE_DESIGN_V1,
  });

  const manifest = BORG_DATASET_MANIFEST_V1;
  const source = manifest.sourceBridgeRun;

  assert.equal(source.executionPath, "native_c_abi");
  assert.equal(source.runKind, "motionSimulation");
  assert.equal(source.solverMode, DEFAULT_SOLVER_MODE);
  assert.equal(source.motionLaw, "fixed_parameter_inertial_motion_v1");
  assert.equal(source.fixedPhysicalParameterSetId, "borg-fixed-physical-parameters.v1");
  assert.equal(source.fixedPhysicalParameterAuthority, "manifest-declared-fixed-parameter-contract");
  assert.equal(source.visualTuningStatus, "not-visual-tuned");
  assert.equal(source.visualBehaviorAuthority, "native-output-only");
  assert.equal(source.pairAccelerationScale, undefined);
  assert.equal(source.nativeMasterEquationStatus, "native-fixture-capability-missing");
  assert.equal(source.nativeMasterEquationProbeStatusCode, "native_capability_missing");
  assert.equal(source.nativeMasterEquationProbeFirstFailureCode, "native_master_equation_fixture_missing");
  assert.equal(source.masterEquationFallbackDecision, "default-motion-baseline-selected");
  assert.equal(source.canonicalEomEvidence, false);
  assert.equal(source.eomEvidenceStatus, "default_motion_no_master_equation_interaction");
  assert.equal(source.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);

  const probe = manifest.nativeMasterEquationProbe;
  assert.equal(probe.runKind, "masterEquation");
  assert.equal(probe.statusCode, "native_capability_missing");
  assert.equal(probe.executionPath, "native_c_abi_missing");
  assert.equal(probe.firstFailureCode, "native_master_equation_fixture_missing");
  assert.equal(probe.requiredNativeExport, "architrino_solver_integrate_master_equation_motion_f64");
  assert.equal(probe.fallbackDecision, "default-motion-baseline-selected");
  assert.equal(probe.fallbackRunKind, "motionSimulation");
  assert.equal(probe.valueAuthority, "fail-closed-value");
});

test("Borg fixed-parameter default motion remains straight in native frame data", () => {
  const maxDeviation = maxNativeFrameDeviationFromPathLine(BORG_DATASET_MANIFEST_V1.currentStateFrames);
  assert.ok(
    maxDeviation <= 1e-9,
    `native fixed-parameter default-motion paths must remain linear; max deviation ${maxDeviation}`,
  );
});

test("Borg surface advertises the native master-equation fixture as the next build burden", () => {
  const surfaceDesign = BORG_APP_SURFACE_DESIGN_V1;
  assert.equal(surfaceDesign.sourceManifest.solverMode, DEFAULT_SOLVER_MODE);
  assert.equal(surfaceDesign.sourceManifest.visualTuningStatus, "not-visual-tuned");
  assert.equal(surfaceDesign.sourceManifest.visualBehaviorAuthority, "native-output-only");
  assert.equal(surfaceDesign.sourceManifest.nativeMasterEquationStatus, "native-fixture-capability-missing");
  assert.equal(surfaceDesign.sourceManifest.nativeMasterEquationProbe.statusCode, "native_capability_missing");
  assert.equal(
    surfaceDesign.sourceManifest.nativeMasterEquationProbe.fallbackDecision,
    "default-motion-baseline-selected",
  );
  assert.equal(surfaceDesign.sourceManifest.nextSolverBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.nextBuildBurden, NEXT_MASTER_EQUATION_BURDEN);
  assert.equal(surfaceDesign.authorityMap.centralVolumeAcceleration, "fail-closed-value");
});

function maxNativeFrameDeviationFromPathLine(frames) {
  const byPathKey = new Map();
  frames.forEach((frame) => {
    const pathFrames = byPathKey.get(frame.pathKey) ?? [];
    pathFrames.push(frame);
    byPathKey.set(frame.pathKey, pathFrames);
  });

  let maxDeviation = 0;
  byPathKey.forEach((pathFrames) => {
    pathFrames.sort((left, right) => left.time - right.time);
    const first = pathFrames[0];
    const last = pathFrames.at(-1);
    const duration = last.time - first.time;
    if (duration <= 0) {
      return;
    }
    const displacement = subtractVectors(last.position, first.position);
    pathFrames.forEach((frame) => {
      const progress = (frame.time - first.time) / duration;
      const expected = {
        x: first.position.x + displacement.x * progress,
        y: first.position.y + displacement.y * progress,
        z: first.position.z + displacement.z * progress,
      };
      maxDeviation = Math.max(maxDeviation, vectorDistance(frame.position, expected));
    });
  });
  return maxDeviation;
}

function subtractVectors(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function vectorDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultAnimatorAssemblyDraft } from "../src/apps/animator/AnimatorDraftScaffoldRuntime.js";
import {
  ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA,
  createAnimatorPrescribedSceneHandoff,
  validateAnimatorPrescribedSceneHandoff,
} from "../src/apps/shared/AnimatorPrescribedSceneHandoff.mjs";
import { createAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";
import { createAnimatorUiRuntime } from "../src/runtime/AnimatorUiRuntime.js";
import { createBorgAssemblyViewSession } from "../src/apps/borg/BorgAssemblyViewSession.js";
import {
  openAnimatorPrescribedSceneInBorg,
  receiveAnimatorPrescribedSceneHandoff,
} from "../src/apps/shared/AnimatorBorgHandoffTransport.mjs";
import {
  BORG_RECORD_REPLAY_RUNTIME_MODE,
  bootBorgApp,
  resolveBorgRuntimeMode,
} from "../src/apps/borg/BorgBootstrap.js";

function createAuthoredScene(overrides = {}) {
  return createAnimatorSceneDocument({
    id: "authored_scene",
    name: "Authored scene",
    time: { start: 0, end: 2 },
    assembliesDraft: [createDefaultAnimatorAssemblyDraft()],
    ...overrides,
  });
}

test("Animator publishes a sealed display-only record that Borg accepts for replay", async () => {
  const handoff = await createAnimatorPrescribedSceneHandoff(createAuthoredScene(), {
    publishedAt: "2026-09-02T00:00:00.000Z",
  });
  const accepted = await validateAnimatorPrescribedSceneHandoff(handoff);
  const session = createBorgAssemblyViewSession([accepted.record]);

  assert.equal(accepted.schema, ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA);
  assert.match(accepted.recordSha256, /^[a-f0-9]{64}$/);
  assert.equal(accepted.identity.motionAuthority, "authored-prescribed");
  assert.equal(accepted.identity.claimGrade, "chart-hypothesis");
  assert.equal(accepted.identity.evidenceStatus, "display-only");
  assert.equal(accepted.record.provenance.engineId, "prescribed-geometry");
  assert.equal(accepted.record.provenance.prescribedGeometry.physicsInvoked, false);
  assert.equal(accepted.record.provenance.prescribedGeometry.recordOnlyReplay, true);
  assert.equal(session.selected.dataset.recordCarriers.frame.fieldSpeed, 1);
  assert.equal(accepted.record.worldlines.length, 6);
  assert.equal(session.selected.dataset.worldlines.length, 6);
  assert.equal(Object.isFrozen(accepted.record), true);
  assert.equal(Object.isFrozen(accepted.record.worldlines[0].segments[0]), true);
});

test("Animator handoff rejects record mutation and identity drift", async () => {
  const original = await createAnimatorPrescribedSceneHandoff(createAuthoredScene(), {
    publishedAt: "2026-09-02T00:00:00.000Z",
  });
  const alteredRecord = structuredClone(original);
  alteredRecord.record.worldlines[0].segments[0].coefficients[0][0] += 1;
  const alteredIdentity = structuredClone(original);
  alteredIdentity.identity.motionAuthority = "eom-evolved";

  await assert.rejects(validateAnimatorPrescribedSceneHandoff(alteredRecord), /stale or altered/);
  await assert.rejects(validateAnimatorPrescribedSceneHandoff(alteredIdentity), /identity does not match/);
});

test("Animator publication fails closed for solver-derived or mixed motion", async () => {
  const scene = createAuthoredScene();
  scene.metadata.simulationDataset = {
    id: "solver-output",
    provenance: { engine: { id: "eom-solver" } },
    frames: [],
  };

  await assert.rejects(
    createAnimatorPrescribedSceneHandoff(scene),
    /rejects solver-derived or mixed motion/,
  );
});

test("Animator publication requires explicit replay polarity", async () => {
  const scene = createAuthoredScene();
  scene.assemblies[0].members[0] = { id: "member_without_polarity" };

  await assert.rejects(
    createAnimatorPrescribedSceneHandoff(scene),
    /requires explicit electrino or positrino identity/,
  );
});

test("Borg recognizes the Animator handoff route as record replay", () => {
  assert.equal(
    resolveBorgRuntimeMode("?animatorHandoff=prescribed-scene-v1"),
    BORG_RECORD_REPLAY_RUNTIME_MODE,
  );
});

test("Borg bootstrap consumes the validated handoff without a catalog fetch", async () => {
  const handoff = await createAnimatorPrescribedSceneHandoff(createAuthoredScene(), {
    publishedAt: "2026-09-02T00:00:00.000Z",
  });
  const mounts = [];
  let receiveCount = 0;
  let fetchCount = 0;

  const result = await bootBorgApp({
    search: "?animatorHandoff=prescribed-scene-v1",
    startupSeedIndex: 41,
    receiveAnimatorHandoff: async () => {
      receiveCount += 1;
      return handoff;
    },
    fetchLike: async () => {
      fetchCount += 1;
      throw new Error("Animator handoff must not fetch a catalog record.");
    },
    mountApp(options) {
      mounts.push(options);
      return "animator-record-mounted";
    },
  });

  assert.equal(result, "animator-record-mounted");
  assert.equal(receiveCount, 1);
  assert.equal(fetchCount, 0);
  assert.equal(mounts[0].autoStartEom, true);
  assert.equal(mounts[0].eomRecordReplay.record, handoff.record);
  assert.equal(mounts[0].eomRecordReplay.librarySummary.facets.length, 0);
  assert.match(mounts[0].eomRecordReplay.librarySummary.description, /not EOM-evolved evidence/);
});

test("Animator and Borg exchange one validated structured clone without shared storage", async () => {
  const handoff = await createAnimatorPrescribedSceneHandoff(createAuthoredScene(), {
    publishedAt: "2026-09-02T00:00:00.000Z",
  });
  const animatorListeners = new Set();
  const borgListeners = new Set();
  let receiverPromise;
  let sharedStorageTouches = 0;
  const animatorWindow = {
    location: { href: "http://example.test/animator.html", origin: "http://example.test" },
    crypto: globalThis.crypto,
    localStorage: new Proxy({}, { get() { sharedStorageTouches += 1; } }),
    addEventListener(type, listener) { if (type === "message") animatorListeners.add(listener); },
    removeEventListener(type, listener) { if (type === "message") animatorListeners.delete(listener); },
    postMessage(data) {
      const cloned = structuredClone(data);
      queueMicrotask(() => animatorListeners.forEach((listener) => listener({
        data: cloned,
        origin: "http://example.test",
        source: borgWindow,
      })));
    },
    open() {
      queueMicrotask(() => {
        receiverPromise = receiveAnimatorPrescribedSceneHandoff({
          windowLike: borgWindow,
          timeoutMs: 1000,
        });
      });
      return borgWindow;
    },
  };
  const borgWindow = {
    location: { href: "http://example.test/borg.html", origin: "http://example.test" },
    crypto: globalThis.crypto,
    opener: animatorWindow,
    sessionStorage: new Proxy({}, { get() { sharedStorageTouches += 1; } }),
    addEventListener(type, listener) { if (type === "message") borgListeners.add(listener); },
    removeEventListener(type, listener) { if (type === "message") borgListeners.delete(listener); },
    postMessage(data) {
      const cloned = structuredClone(data);
      queueMicrotask(() => borgListeners.forEach((listener) => listener({
        data: cloned,
        origin: "http://example.test",
        source: animatorWindow,
      })));
    },
  };

  const opened = await openAnimatorPrescribedSceneInBorg(handoff, {
    windowLike: animatorWindow,
    timeoutMs: 1000,
  });
  const received = await receiverPromise;

  assert.equal(opened.recordSha256, handoff.recordSha256);
  assert.equal(received.recordSha256, handoff.recordSha256);
  assert.notEqual(received.record, handoff.record);
  assert.equal(sharedStorageTouches, 0);
  assert.equal(animatorListeners.size, 0);
  assert.equal(borgListeners.size, 0);
});

test("Open in Borg is not invoked when prescribed-scene validation fails", async () => {
  const statuses = [];
  let openCount = 0;
  const button = {
    disabled: false,
    setAttribute() {},
    removeAttribute() {},
  };
  const runtime = createAnimatorUiRuntime({
    animatorTabs: [],
    animatorPanels: [],
    readAnimatorDraftState: () => ({ id: "rejected" }),
    buildAnimatorSceneDocument: () => ({ schemaVersion: "0.1.0" }),
    createPrescribedSceneHandoff: async () => {
      throw new TypeError("validation failed closed");
    },
    openPrescribedSceneInBorg: async () => {
      openCount += 1;
    },
    animatorOpenBorgButton: button,
    setAnimatorStatus(message) { statuses.push(message); },
  });

  await runtime.openAnimatorSceneInBorg();

  assert.equal(openCount, 0);
  assert.equal(button.disabled, false);
  assert.match(statuses.at(-1), /Open in Borg rejected: validation failed closed/);
});

import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorRecordedPlaybackWorkerClient,
  hydrateAnimatorRecordedPlaybackCompleteMessage,
  mergeAnimatorRecordedPlaybackIntoDocument,
} from "../src/apps/animator/AnimatorRecordedPlaybackWorkerRuntime.js";
import { createAnimatorRecordedPlaybackRequest } from "../src/apps/animator/AnimatorRecordedPlaybackWorkerProtocolRuntime.js";
import { runAnimatorRecordedPlaybackRequestAsync } from "../src/apps/animator/AnimatorRecordedPlaybackWorkerCoreRuntime.js";
import { createEomRecordedPlaybackHandoff } from "../src/apps/shared/EomRecordedPlaybackHandoff.mjs";
import { createAcceptedEomRecord } from "./eom-recorded-playback-handoff.test.js";

test("Animator samples playback frames only from an accepted recorded EOM handoff", async () => {
  const handoff = await createEomRecordedPlaybackHandoff(createAcceptedEomRecord());
  const request = createAnimatorRecordedPlaybackRequest(handoff, {
    requestId: "recorded_playback_positive",
    playbackOptions: { frameCount: 3 },
    datasetOptions: { id: "accepted_recorded_output" },
  });
  const message = await runAnimatorRecordedPlaybackRequestAsync(request);
  const result = hydrateAnimatorRecordedPlaybackCompleteMessage(message);

  assert.equal(message.type, "animator.recorded-playback.complete");
  assert.equal(result.dataset.id, "accepted_recorded_output");
  assert.equal(result.dataset.frames.length, 3);
  assert.deepEqual(result.dataset.frames[0].particles[0].position, [1, 2, 3]);
  assert.deepEqual(result.dataset.frames[2].particles[0].position, [5, 3, 1]);
  assert.equal(result.dataset.provenance.engineId, "eom-solver");
  assert.equal(result.dataset.provenance.handoffSchema, "eom-recorded-playback-handoff.v1");
  assert.match(result.dataset.provenance.recordSha256, /^[a-f0-9]{64}$/);
});

test("Animator playback worker rejects stale handoffs before frame packaging", async () => {
  const handoff = await createEomRecordedPlaybackHandoff(createAcceptedEomRecord());
  handoff.record.status = "failed";
  const request = createAnimatorRecordedPlaybackRequest(handoff, {
    requestId: "recorded_playback_stale",
  });

  await assert.rejects(runAnimatorRecordedPlaybackRequestAsync(request), /stale or altered/);
});

test("Animator records accepted handoff identity in the document", async () => {
  const handoff = await createEomRecordedPlaybackHandoff(createAcceptedEomRecord());
  const result = hydrateAnimatorRecordedPlaybackCompleteMessage(
    await runAnimatorRecordedPlaybackRequestAsync(
      createAnimatorRecordedPlaybackRequest(handoff, { requestId: "document_merge" }),
    ),
  );
  const documentData = mergeAnimatorRecordedPlaybackIntoDocument(
    { scene: { id: "animator-test", time: { start: 0, end: 1 } }, metadata: {} },
    result.dataset,
  );

  assert.equal(documentData.metadata.recordedEomPlayback.engineId, "eom-solver");
  assert.equal(documentData.metadata.recordedEomPlayback.runId, "eom-recorded-playback-fixture");
  assert.equal(documentData.metadata.recordedEomPlayback.status, "completed");
  assert.equal(documentData.scene.time.end, 2);
});

test("recorded playback client exposes load, not a solver run method", () => {
  const client = createAnimatorRecordedPlaybackWorkerClient({ WorkerCtor: null });
  assert.equal(typeof client.load, "function");
  assert.equal("run" in client, false);
  client.terminate();
});

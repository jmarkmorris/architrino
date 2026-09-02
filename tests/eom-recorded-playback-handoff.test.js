import test from "node:test";
import assert from "node:assert/strict";

import {
  EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA,
  createEomRecordedPlaybackHandoff,
  validateEomRecordedPlaybackHandoff,
} from "../src/apps/shared/EomRecordedPlaybackHandoff.mjs";
import { createAcceptedEomRecord } from "./helpers/eom-recorded-playback-fixture.js";

test("recorded playback handoff accepts a pinned completed EOM solver record", async () => {
  const handoff = await createEomRecordedPlaybackHandoff(createAcceptedEomRecord());
  const accepted = await validateEomRecordedPlaybackHandoff(handoff);

  assert.equal(accepted.schema, EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA);
  assert.match(accepted.recordSha256, /^[a-f0-9]{64}$/);
  assert.equal(accepted.identity.engineId, "eom-solver");
  assert.equal(accepted.identity.runId, "eom-recorded-playback-fixture");
  assert.equal(accepted.identity.status, "completed");
});

test("recorded playback handoff rejects a stale or altered pinned record", async () => {
  const handoff = await createEomRecordedPlaybackHandoff(createAcceptedEomRecord());
  handoff.record.histories[0].segments[0].coefficients[0][0] = "99";

  await assert.rejects(
    validateEomRecordedPlaybackHandoff(handoff),
    /stale or altered/,
  );
});

test("recorded playback handoff rejects incompatible solver and model identities", async () => {
  const wrongEngine = createAcceptedEomRecord({
    provenance: {
      ...createAcceptedEomRecord().provenance,
      engineId: "javascript-comparison",
    },
  });
  const wrongModel = createAcceptedEomRecord({ modelBindingId: "master_eom_binding/v0" });

  await assert.rejects(createEomRecordedPlaybackHandoff(wrongEngine), /requires engineId eom-solver/);
  await assert.rejects(createEomRecordedPlaybackHandoff(wrongModel), /requires modelBindingId master_eom_binding\/v1/);
});

test("recorded playback handoff rejects unfinished and unaccepted evidence", async () => {
  const unfinished = createAcceptedEomRecord({ status: "running" });
  const unaccepted = createAcceptedEomRecord({
    provenance: {
      ...createAcceptedEomRecord().provenance,
      evidenceStatus: "unchecked",
    },
  });

  await assert.rejects(createEomRecordedPlaybackHandoff(unfinished), /requires a completed accepted record/);
  await assert.rejects(createEomRecordedPlaybackHandoff(unaccepted), /evidenceStatus must be one of/);
});

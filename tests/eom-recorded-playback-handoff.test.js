import test from "node:test";
import assert from "node:assert/strict";

import {
  EOM_RECORDED_PLAYBACK_HANDOFF_SCHEMA,
  EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID,
  createEomRecordedPlaybackHandoff,
  validateEomRecordedPlaybackHandoff,
} from "../src/apps/shared/EomRecordedPlaybackHandoff.mjs";
import { EOM_EVOLUTION_CONTRACT_ID } from "../src/apps/shared/EomHistoryDataset.mjs";

export function createAcceptedEomRecord(overrides = {}) {
  return {
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    modelBindingId: EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID,
    status: "completed",
    absoluteTimeInterval: { start: "0", end: "2" },
    provenance: {
      engineId: "eom-solver",
      engineVersion: "eom-fixture-build-v1",
      runId: "eom-recorded-playback-fixture",
      claimGrade: "evolved-record",
      evidenceStatus: "canonical",
    },
    histories: [
      {
        pathId: "1",
        pathKey: 1,
        charge: "1",
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "2",
        interpolation: "exact-inertial-polynomial/v1",
        segments: [
          {
            startTime: "0",
            endTime: "2",
            coefficients: [
              ["1", "2", "0", "0"],
              ["2", "0.5", "0", "0"],
              ["3", "-1", "0", "0"],
            ],
            positionError: "0",
            velocityError: "0",
          },
        ],
      },
    ],
    ...overrides,
  };
}

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

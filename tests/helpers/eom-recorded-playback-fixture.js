import {
  EOM_RECORDED_PLAYBACK_MODEL_BINDING_ID,
} from "../../src/apps/shared/EomRecordedPlaybackHandoff.mjs";
import { EOM_EVOLUTION_CONTRACT_ID } from "../../src/apps/shared/EomHistoryDataset.mjs";

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

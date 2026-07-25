import {
  EOM_EVOLUTION_CONTRACT_ID,
} from "../../src/apps/shared/EomHistoryDataset.mjs";

export function inertialSegment(startTime, endTime, position, velocity) {
  return {
    startTime: String(startTime),
    endTime: String(endTime),
    coefficients: [
      [String(position[0]), String(velocity[0]), "0", "0"],
      [String(position[1]), String(velocity[1]), "0", "0"],
      [String(position[2]), String(velocity[2]), "0", "0"],
    ],
    positionError: "0",
    velocityError: "0",
  };
}

export function createEomRecordFixture(overrides = {}) {
  return {
    contractId: EOM_EVOLUTION_CONTRACT_ID,
    runId: "cdf-runtime-eom-fixture",
    claimLevel: "evolved-record",
    evidenceStatus: "canonical",
    absoluteTimeInterval: { start: "0", end: "2" },
    provenance: { engineId: "eom-solver" },
    histories: [
      {
        pathId: "10",
        pathKey: 10,
        charge: "1",
        stateFlags: 1,
        coverageStart: "0",
        coverageEnd: "2",
        segments: [inertialSegment(0, 2, [5, 2, 0], [0, 0.5, 0])],
      },
      {
        pathId: "20",
        pathKey: 20,
        charge: "-1",
        stateFlags: 2,
        coverageStart: "0",
        coverageEnd: "2",
        segments: [inertialSegment(0, 2, [5, 0, 0], [0, 0.5, 0])],
      },
    ],
    ...overrides,
  };
}

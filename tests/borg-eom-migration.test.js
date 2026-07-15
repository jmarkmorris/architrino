import assert from "node:assert/strict";
import { test } from "node:test";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgFixtureData.js";
import {
  BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE,
  BORG_EOM_SHADOW_RUN_SOURCE,
  createBorgContinuousRetainedHistories,
  createBorgEomShadowRunner,
} from "../src/apps/borg/BorgEomShadowRunner.js";
import { encodeNativeRequest } from "../scripts/eom/BorgNativeEomProcessClient.mjs";
import { createBorgEomHttpClient } from "../src/apps/borg/BorgEomHttpClient.js";
import { loadBorgFixtureTrajectoryFrames } from "../src/apps/borg/BorgFixtureTrajectory.js";

// The manifest carries only the seed state; retained history comes from the
// recorded trajectory asset, which is exactly what these tests exercise.
const trajectoryFrames = await loadBorgFixtureTrajectoryFrames();

test("Borg EOM migration imports a complete continuous past, never a state-only start", () => {
  const histories = createBorgContinuousRetainedHistories(
    trajectoryFrames,
    BORG_DATASET_MANIFEST_V1,
    { historyEndTime: 10 },
  );

  assert.equal(histories.length, 16);
  for (const history of histories) {
    assert.equal(history.coverageStart, "0");
    assert.equal(history.coverageEnd, "10");
    assert.equal(history.segments.length, 50);
    assert.equal(history.interpolation, "piecewise-cubic-hermite/v0");
    assert.equal(history.sourceProvenance, BORG_EOM_COMPATIBILITY_HISTORY_PROVENANCE);
    assert.equal(history.sourceClaimLevel, "conditional-non-eom-history");
  }

  assert.throws(
    () =>
      createBorgContinuousRetainedHistories(
        trajectoryFrames.filter((row) => row.time === 0),
        BORG_DATASET_MANIFEST_V1,
        { historyEndTime: 0 },
      ),
    /lacks continuous retained history/,
  );
});

test("Borg EOM shadow runner sends retained histories and derives frames only from published histories", async () => {
  const requests = [];
  const eomClient = {
    async evolveRetainedHistories(request) {
      requests.push(request);
      return createFakeEomResponse(request, "executable_architecture_evidence");
    },
  };
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
    threadCount: 4,
  });

  const chunk = await runner.computeNextChunk();
  const request = requests[0];
  assert.equal(request.contractId, "eom_evolution_contract/v0");
  assert.equal(request.claimLevel, "migration-shadow");
  assert.deepEqual(request.absoluteTimeInterval, { start: "10", end: "10.2" });
  assert.equal(request.histories.length, 16);
  assert.equal(request.histories[0].coverageEnd, "10");
  assert.equal(request.numericalControls.threadCount, 4);
  assert.equal(request.modelControls.selfPairs, "included-except-coincident-endpoint");
  assert.equal(request.modelControls.futurePathPolicy, "prohibited");
  assert.equal("initialStates" in request, false);
  assert.equal("futurePaths" in request, false);

  assert.equal(chunk.source, BORG_EOM_SHADOW_RUN_SOURCE);
  assert.equal(chunk.statusCode, "ok");
  assert.equal(chunk.evidenceStatus, "executable_architecture_evidence");
  assert.equal(chunk.promotionEligible, false);
  assert.equal(chunk.frames.length, 32);
  assert.equal(chunk.frames.every((frame) => frame.runSource === BORG_EOM_SHADOW_RUN_SOURCE), true);
  assert.equal(chunk.frames.every((frame) => frame.valueAuthority === "eom-shadow-output"), true);
  assert.equal(chunk.histories.every((history) => history.coverageEnd === "10.2"), true);
});

test("Borg EOM shadow runner supports a deterministic retained-history population subset", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    pathCount: 4,
    initialFrameRows: trajectoryFrames.filter((row) => Number(row.pathKey) <= 1004),
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  const chunk = await runner.computeNextChunk();
  assert.equal(requests[0].histories.length, 4);
  assert.deepEqual(requests[0].histories.map((history) => history.pathId), ["1001", "1002", "1003", "1004"]);
  assert.equal(chunk.frames.length, 8);
});

test("Borg EOM UI duration and atomic chunk cannot be overridden by measured limits", () => {
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: { async evolveRetainedHistories() {} },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.1,
    chunkDuration: 0.01,
    sampleInterval: 0.01,
  });
  runner.setRunLimits({ targetDuration: 10.05, chunkDuration: 20 });
  assert.equal(runner.targetDuration, 10.1);
  assert.equal(runner.chunkDuration, 0.01);
});

test("Borg promotion remains fail-closed until both canonical evidence and the migration gate pass", async () => {
  const eomClient = {
    async evolveRetainedHistories(request) {
      return createFakeEomResponse(request, "canonical");
    },
  };
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
    sampleInterval: 0.2,
    acceptanceGate: {
      schema: "eom_acceptance_gate/v0",
      status: "passed",
      borgMigrationAuthorized: true,
    },
  });

  const chunk = await runner.computeNextChunk();
  assert.equal(chunk.promotionEligible, true);
  assert.equal(chunk.frames.every((frame) => frame.valueAuthority === "canonical-eom-output"), true);
});

test("Borg EOM shadow response rejects reordered or incomplete published histories", async () => {
  const eomClient = {
    async evolveRetainedHistories(request) {
      const response = createFakeEomResponse(request, "canonical");
      response.histories.reverse();
      return response;
    },
  };
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient,
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(
    runner.computeNextChunk(),
    /incomplete or reordered histories/,
  );
});

test("Borg EOM fail-closed responses preserve native diagnostics", async () => {
  const diagnostics = [{ code: "minimum_step_exhausted", rootFailureCount: 240 }];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories() {
        return {
          status: "failed",
          haltCode: "minimum_step_exhausted",
          diagnostics,
        };
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await assert.rejects(runner.computeNextChunk(), (error) => {
    assert.equal(error.code, "minimum_step_exhausted");
    assert.deepEqual(error.eomResponse.diagnostics, diagnostics);
    return true;
  });
});

test("Borg native process protocol carries the same continuous-history request", async () => {
  const requests = [];
  const runner = createBorgEomShadowRunner(BORG_DATASET_MANIFEST_V1, {
    eomClient: {
      async evolveRetainedHistories(request) {
        requests.push(request);
        return createFakeEomResponse(request, "executable_architecture_evidence");
      },
    },
    initialFrameRows: trajectoryFrames,
    startTime: 10,
    targetDuration: 10.2,
    chunkDuration: 0.2,
  });
  await runner.computeNextChunk();
  const protocol = encodeNativeRequest(requests[0]);
  assert.match(protocol, /^EOM_BORG_NATIVE_V0\nRUN\t/u);
  assert.equal(protocol.match(/^PATH\t/gmu)?.length, 16);
  assert.equal(protocol.match(/^SEG\t/gmu)?.length, 800);
  assert.match(protocol, /\nEND\n$/u);
  assert.equal(protocol.includes("initialStates"), false);
  assert.equal(protocol.includes("futurePaths"), false);
});

test("Borg browser EOM client posts the retained-history contract to the local native endpoint", async () => {
  const calls = [];
  const client = createBorgEomHttpClient({
    fetchImpl: async (endpoint, init) => {
      calls.push({ endpoint, init });
      return {
        ok: true,
        status: 200,
        async text() {
          return JSON.stringify({ status: "completed", histories: [] });
        },
      };
    },
  });
  const request = { contractId: "eom_evolution_contract/v0", histories: [{ pathId: "p" }] };
  const response = await client.evolveRetainedHistories(request);
  assert.equal(response.status, "completed");
  assert.equal(calls[0].endpoint, "/api/eom/borg-shadow/v0");
  assert.equal(calls[0].init.method, "POST");
  assert.deepEqual(JSON.parse(calls[0].init.body), request);
});

test("disposing the Borg browser EOM client aborts an active native request", async () => {
  let signal;
  const client = createBorgEomHttpClient({
    fetchImpl: async (_endpoint, init) => {
      signal = init.signal;
      return new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      });
    },
  });
  const pending = client.evolveRetainedHistories({ histories: [] });
  await client.dispose();
  assert.equal(signal.aborted, true);
  await assert.rejects(pending, /cancelled/u);
});

function createFakeEomResponse(request, evidenceStatus) {
  const endTime = request.absoluteTimeInterval.end;
  return {
    status: "completed",
    evidenceStatus,
    histories: request.histories.map((history) => {
      const startTime = history.coverageEnd;
      const state = evaluateHistory(history, Number(startTime));
      const duration = Number(endTime) - Number(startTime);
      return {
        ...history,
        coverageEnd: endTime,
        segments: [
          ...history.segments,
          {
            startTime,
            endTime,
            coefficients: ["x", "y", "z"].map((axis) => [
              String(state.position[axis]),
              String(state.velocity[axis]),
              "0",
              "0",
            ]),
            positionError: String(duration * 1e-14),
            velocityError: String(duration * 1e-14),
          },
        ],
      };
    }),
    diagnostics: [],
  };
}

function evaluateHistory(history, time) {
  const segment = history.segments.find(
    (candidate, index) =>
      Number(candidate.startTime) <= time &&
      (time < Number(candidate.endTime) || index + 1 === history.segments.length),
  );
  const localTime = time - Number(segment.startTime);
  const position = {};
  const velocity = {};
  ["x", "y", "z"].forEach((axis, axisIndex) => {
    const [c0, c1, c2, c3] = segment.coefficients[axisIndex].map(Number);
    position[axis] = c0 + localTime * (c1 + localTime * (c2 + localTime * c3));
    velocity[axis] = c1 + localTime * (2 * c2 + localTime * 3 * c3);
  });
  return { position, velocity };
}

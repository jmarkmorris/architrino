import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyPipelineFixtureMutation,
  checkPotentialLiveTimespacePipelineContract,
  simulatePotentialLivePipeline,
} from "../scripts/check-potential-live-timespace-pipeline-contract.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const CONTRACT_PATH = "reference/priorities/app-aaa-core/potential/potential-live-pipeline-contract.v1.json";
const contract = readJson(CONTRACT_PATH);
const positive = readJson(contract.fixtures.positive);

test("Potential live pipeline passes the synthetic stream and declared negative suite", () => {
  const result = checkPotentialLiveTimespacePipelineContract({ rootDir: ROOT });
  assert.equal(result.status, "passed");
  assert.equal(result.positive.finalState, "sealed");
  assert.equal(result.positive.chunks, 3);
  assert.equal(result.positive.tiles, 3);
  assert.equal(result.positive.duplicatesIgnored, 1);
  assert.equal(result.positive.backpressureEntries, 1);
  assert.equal(result.positive.backpressureReleases, 1);
  assert.equal(result.deterministicReplay, true);
  assert.deepEqual(result.negativeCases.map((entry) => entry.refusalCode), [
    "unaccepted_history_chunk",
    "missing_predecessor",
    "conflicting_duplicate",
    "broken_predecessor_chain",
    "backpressure_limit_exceeded",
    "map_completion_out_of_order",
    "incomplete_seal",
    "source_binding_mismatch",
    "source_halted",
    "sealed_state_immutable",
  ]);
});

test("Potential contract owns only the consumer state machine", () => {
  assert.equal(contract.ownershipBoundary.definesCorePotentialStateMachine, true);
  assert.equal(contract.ownershipBoundary.definesSharedStreamEnvelope, false);
  assert.equal(contract.ownershipBoundary.definesTransport, false);
  assert.equal(contract.ownershipBoundary.fixtureEnvelopeIsProductionInterchange, false);
  assert.equal(contract.upstreamContracts.acceptedHistoryStream.status, "accepted");
  assert.equal(contract.publicationRules.solverContinuationPermitted, false);
});

test("provisional snapshots expose lag, buffering, and missing tiles", () => {
  const result = simulatePotentialLivePipeline(positive);
  assert.deepEqual(result.snapshots, [
    {
      completeness: "provisional",
      sourceAcceptedThroughT: 1,
      coreConsumedThroughT: 1,
      mapCompletedThroughT: 1,
      lagT: 0,
      queueDepth: 0,
      bufferedBytes: 0,
      backpressure: false,
      missingTileIds: ["tile-t1-t2", "tile-t2-t3"],
    },
    {
      completeness: "provisional",
      sourceAcceptedThroughT: 3,
      coreConsumedThroughT: 3,
      mapCompletedThroughT: 1,
      lagT: 2,
      queueDepth: 2,
      bufferedBytes: 256,
      backpressure: true,
      missingTileIds: ["tile-t1-t2", "tile-t2-t3"],
    },
  ]);
});

test("an identical duplicate is idempotent but a changed duplicate is rejected", () => {
  const withoutDuplicate = structuredClone(positive);
  withoutDuplicate.events.splice(5, 1);
  const withDuplicateResult = simulatePotentialLivePipeline(positive);
  const withoutDuplicateResult = simulatePotentialLivePipeline(withoutDuplicate);
  assert.equal(withDuplicateResult.sealedProductSha256, withoutDuplicateResult.sealedProductSha256);

  const conflicting = applyPipelineFixtureMutation(positive, {
    path: "events.5.contentSha256",
    value: "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  });
  assert.throws(() => simulatePotentialLivePipeline(conflicting), /conflicting_duplicate/u);
});

test("missing history and producer halt cannot advance or seal the map", () => {
  const missing = applyPipelineFixtureMutation(positive, { path: "events.4.sequence", value: 2 });
  assert.throws(() => simulatePotentialLivePipeline(missing), /missing_predecessor/u);

  const halted = applyPipelineFixtureMutation(positive, {
    path: "events.4",
    value: {
      type: "source_halt",
      streamId: "synthetic-eom-stream-001",
      code: "eom_fixture_halt",
      detail: "synthetic producer halted before sequence 1",
    },
  });
  assert.throws(() => simulatePotentialLivePipeline(halted), /source_halted: eom_fixture_halt/u);
});

test("the contract documents both the state machine and cross-owner sequence", () => {
  const specification = fs.readFileSync(
    path.join(ROOT, "reference/priorities/app-aaa-core/potential/potential-live-pipeline-contract-v1.md"),
    "utf8",
  );
  assert.match(specification, /stateDiagram-v2/u);
  assert.match(specification, /sequenceDiagram/u);
  assert.match(specification, /AAA Core owns the shared stream envelope and transport/u);

  const integrityRunner = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrityRunner, /Validate Potential live timespace pipeline contract/u);
  assert.match(integrityRunner, /scripts\/check-potential-live-timespace-pipeline-contract\.mjs/u);
});

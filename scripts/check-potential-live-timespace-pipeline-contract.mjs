#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTRACT_PATH = "reference/priorities/app-aaa-core/potential/potential-live-pipeline-contract.v1.json";

export class PipelineContractError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.code = code;
  }
}

function fail(code, message) {
  throw new PipelineContractError(code, message);
}

function requireCondition(condition, code, message) {
  if (!condition) fail(code, message);
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]));
  }
  return value;
}

export function canonicalSha256(value) {
  return crypto.createHash("sha256").update(JSON.stringify(canonicalize(value))).digest("hex");
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validateContractDefinition(contract) {
  requireCondition(
    contract.schema === "architrino.potential-live-timespace-pipeline-contract.v1" &&
      contract.status === "accepted" && contract.version === 1,
    "invalid_fixture",
    "accepted pipeline contract v1 is unavailable",
  );
  requireCondition(
    contract.upstreamContracts.acceptedHistoryStream.schema === "aaa_core_accepted_history_stream/v0" &&
      contract.upstreamContracts.acceptedHistoryStream.status === "accepted",
    "invalid_fixture",
    "the accepted Core stream capability is not named",
  );
  requireCondition(
    contract.ownershipBoundary.definesPotentialConsumerStateMachine === true &&
      contract.ownershipBoundary.definesSharedStreamEnvelope === false &&
      contract.ownershipBoundary.definesTransport === false &&
      contract.ownershipBoundary.fixtureEnvelopeIsProductionInterchange === false,
    "invalid_fixture",
    "the Core Potential pipeline must not redefine the shared stream or transport boundary",
  );
  requireCondition(
    sameValue(contract.stateMachine.terminal, ["sealed", "halted", "failed"]) &&
      contract.stateMachine.states.includes("backpressured") &&
      contract.stateMachine.states.includes("source_sealed"),
    "invalid_fixture",
    "state-machine states or terminal set are incomplete",
  );
  requireCondition(
    contract.publicationRules.deterministicReplayRequiresSameSealedIdentity === true &&
      contract.publicationRules.solverContinuationPermitted === false,
    "invalid_fixture",
    "publication authority or replay obligation is incomplete",
  );
}

function createState(fixture) {
  const { source, consumerProfile } = fixture;
  requireCondition(fixture.schema === "architrino.potential-live-timespace-pipeline-fixture.v1", "invalid_fixture", "fixture schema");
  requireCondition(
    fixture.fixtureTransport.schema === "potential_live_pipeline_fixture_event/v1" &&
      fixture.fixtureTransport.productionInterchange === false,
    "invalid_fixture",
    "fixture event envelope must remain test-only",
  );
  requireCondition(source.wakeSpeed === 1, "source_binding_mismatch", "synthetic numerical fixture must use normalized wake speed");
  requireCondition(
    Number.isInteger(consumerProfile.maxBufferedChunks) && consumerProfile.maxBufferedChunks > 0 &&
      Number.isInteger(consumerProfile.maxBufferedBytes) && consumerProfile.maxBufferedBytes > 0,
    "invalid_fixture",
    "consumer buffer limits must be positive integers",
  );
  requireCondition(
    consumerProfile.targetStartT === source.startT && consumerProfile.targetEndT > consumerProfile.targetStartT &&
      Array.isArray(consumerProfile.tileIds) && consumerProfile.tileIds.length > 0,
    "invalid_fixture",
    "target coverage or tile set is invalid",
  );
  return {
    phase: "awaiting_stream",
    lastSequence: -1,
    lastChunkSha256: null,
    nextMapSequence: 0,
    sourceAcceptedThroughT: source.startT,
    appConsumedThroughT: source.startT,
    mapCompletedThroughT: source.startT,
    seen: new Map(),
    buffered: new Map(),
    bufferedBytes: 0,
    orderedChunks: [],
    orderedTiles: [],
    snapshots: [],
    duplicatesIgnored: 0,
    backpressureEntries: 0,
    backpressureReleases: 0,
    sourceSealed: false,
    sealedProduct: null,
    sealedProductSha256: null,
  };
}

function assertSourceBinding(fixture, event) {
  requireCondition(
    event.sourceManifestSha256 === fixture.source.sourceManifestSha256,
    "source_binding_mismatch",
    "event source manifest changed",
  );
}

function updateBackpressure(state, profile) {
  const atLimit = state.buffered.size >= profile.maxBufferedChunks || state.bufferedBytes >= profile.maxBufferedBytes;
  if (atLimit && state.phase === "consuming") {
    state.phase = "backpressured";
    state.backpressureEntries += 1;
  } else if (!atLimit && state.phase === "backpressured") {
    state.phase = "consuming";
    state.backpressureReleases += 1;
  }
}

function ingestChunk(fixture, state, event) {
  requireCondition(event.acceptance === "accepted", "unaccepted_history_chunk", "candidate or rejected EOM output cannot advance Potential");
  assertSourceBinding(fixture, event);
  requireCondition(Number.isInteger(event.sequence) && event.sequence >= 0, "invalid_fixture", "chunk sequence");
  requireCondition(Number.isInteger(event.byteLength) && event.byteLength > 0, "invalid_fixture", "chunk byte length");

  const existingHash = state.seen.get(event.sequence);
  if (existingHash !== undefined) {
    requireCondition(existingHash === event.contentSha256, "conflicting_duplicate", `sequence ${event.sequence} changed content hash`);
    state.duplicatesIgnored += 1;
    return;
  }

  requireCondition(state.phase !== "backpressured", "backpressure_limit_exceeded", "unique chunk arrived while the declared queue was full");
  const expectedSequence = state.lastSequence + 1;
  requireCondition(event.sequence === expectedSequence, "missing_predecessor", `expected sequence ${expectedSequence}, received ${event.sequence}`);
  requireCondition(
    event.predecessorChunkSha256 === state.lastChunkSha256,
    "broken_predecessor_chain",
    `sequence ${event.sequence} predecessor does not match the accepted prefix`,
  );
  requireCondition(
    event.acceptedStartT === state.sourceAcceptedThroughT && event.acceptedEndT > event.acceptedStartT &&
      event.acceptedThroughT === event.acceptedEndT,
    "noncontiguous_accepted_time",
    `sequence ${event.sequence} does not extend the contiguous accepted interval`,
  );
  requireCondition(
    state.buffered.size + 1 <= fixture.consumerProfile.maxBufferedChunks &&
      state.bufferedBytes + event.byteLength <= fixture.consumerProfile.maxBufferedBytes,
    "backpressure_limit_exceeded",
    "chunk would exceed the declared buffer envelope",
  );

  const accepted = structuredClone(event);
  state.seen.set(event.sequence, event.contentSha256);
  state.buffered.set(event.sequence, accepted);
  state.bufferedBytes += event.byteLength;
  state.orderedChunks.push({
    sequence: event.sequence,
    chunkId: event.chunkId,
    contentSha256: event.contentSha256,
    predecessorChunkSha256: event.predecessorChunkSha256,
    acceptedStartT: event.acceptedStartT,
    acceptedEndT: event.acceptedEndT,
  });
  state.lastSequence = event.sequence;
  state.lastChunkSha256 = event.contentSha256;
  state.sourceAcceptedThroughT = event.acceptedEndT;
  state.appConsumedThroughT = event.acceptedEndT;
  updateBackpressure(state, fixture.consumerProfile);
}

function completeMapChunk(fixture, state, event) {
  requireCondition(
    event.sequence === state.nextMapSequence,
    "map_completion_out_of_order",
    `expected map completion ${state.nextMapSequence}, received ${event.sequence}`,
  );
  const chunk = state.buffered.get(event.sequence);
  requireCondition(chunk !== undefined, "unknown_map_chunk", `sequence ${event.sequence} was not admitted`);
  const expectedTileId = fixture.consumerProfile.tileIds[event.sequence];
  requireCondition(
    event.tilePayload?.tileId === expectedTileId &&
      sameValue(event.tilePayload.timeRange, [chunk.acceptedStartT, chunk.acceptedEndT]) &&
      event.mapCompletedThroughT === chunk.acceptedEndT,
    "unknown_map_chunk",
    `map tile for sequence ${event.sequence} does not bind to its admitted chunk`,
  );
  const tileSha256 = canonicalSha256(event.tilePayload);
  state.orderedTiles.push({
    sequence: event.sequence,
    tileId: event.tilePayload.tileId,
    tileSha256,
    timeRange: event.tilePayload.timeRange,
  });
  state.buffered.delete(event.sequence);
  state.bufferedBytes -= chunk.byteLength;
  state.nextMapSequence += 1;
  state.mapCompletedThroughT = event.mapCompletedThroughT;
  updateBackpressure(state, fixture.consumerProfile);
}

function missingTileIds(fixture, state) {
  const complete = new Set(state.orderedTiles.map((tile) => tile.tileId));
  return fixture.consumerProfile.tileIds.filter((tileId) => !complete.has(tileId));
}

function validateSnapshot(fixture, state, event) {
  const actual = {
    completeness: "provisional",
    sourceAcceptedThroughT: state.sourceAcceptedThroughT,
    appConsumedThroughT: state.appConsumedThroughT,
    mapCompletedThroughT: state.mapCompletedThroughT,
    lagT: state.sourceAcceptedThroughT - state.mapCompletedThroughT,
    queueDepth: state.buffered.size,
    bufferedBytes: state.bufferedBytes,
    backpressure: state.phase === "backpressured",
    missingTileIds: missingTileIds(fixture, state),
  };
  requireCondition(sameValue(event, { type: "snapshot", ...actual }), "snapshot_mismatch", "provisional snapshot hides or misstates live coverage");
  state.snapshots.push(actual);
}

function sealSource(fixture, state, event) {
  assertSourceBinding(fixture, event);
  requireCondition(
    state.phase === "consuming" && event.streamId === fixture.source.streamId &&
      event.finalSequence === state.lastSequence && event.acceptedThroughT === state.sourceAcceptedThroughT &&
      event.acceptedThroughT === fixture.consumerProfile.targetEndT,
    "incomplete_seal",
    "source seal does not close the exact accepted target interval",
  );
  state.sourceSealed = true;
  state.phase = "source_sealed";
}

function publishSealed(fixture, state, event) {
  requireCondition(
    state.phase === "source_sealed" && state.sourceSealed === true &&
      event.productId === fixture.consumerProfile.productId && state.buffered.size === 0 &&
      state.mapCompletedThroughT === fixture.consumerProfile.targetEndT &&
      state.orderedTiles.length === fixture.consumerProfile.tileIds.length && missingTileIds(fixture, state).length === 0,
    "incomplete_seal",
    "sealed publication lacks complete contiguous source or map coverage",
  );
  const product = {
    schema: "architrino.potential-live-timespace-product.v1",
    productId: fixture.consumerProfile.productId,
    requestId: fixture.consumerProfile.requestId,
    sourceBinding: {
      streamId: fixture.source.streamId,
      pathSetId: fixture.source.pathSetId,
      sourceManifestSha256: fixture.source.sourceManifestSha256,
      authority: fixture.source.authority,
    },
    coverage: {
      startT: fixture.consumerProfile.targetStartT,
      sourceAcceptedThroughT: state.sourceAcceptedThroughT,
      appConsumedThroughT: state.appConsumedThroughT,
      mapCompletedThroughT: state.mapCompletedThroughT,
      missingTileIds: [],
      complete: true,
    },
    orderedChunks: state.orderedChunks,
    orderedTiles: state.orderedTiles,
    completeness: "sealed",
    authority: "synthetic_fixture_only",
    publicationIdentity: {
      immutable: true,
      solverContinuationPermitted: false,
      replacesSourceHistory: false,
    },
  };
  state.sealedProduct = product;
  state.sealedProductSha256 = canonicalSha256(product);
  state.phase = "sealed";
}

export function simulatePotentialLivePipeline(fixture) {
  const state = createState(fixture);
  for (const event of fixture.events) {
    if (["sealed", "halted", "failed"].includes(state.phase)) {
      fail("sealed_state_immutable", `event ${event.type} followed terminal state ${state.phase}`);
    }
    switch (event.type) {
      case "stream_open":
        requireCondition(
          state.phase === "awaiting_stream" && event.streamId === fixture.source.streamId && event.sequenceBase === 0,
          "invalid_fixture",
          "stream-open identity or sequence base",
        );
        state.phase = "consuming";
        break;
      case "accepted_chunk":
        requireCondition(["consuming", "backpressured"].includes(state.phase), "invalid_fixture", "chunk before stream open");
        ingestChunk(fixture, state, event);
        break;
      case "map_complete":
        requireCondition(["consuming", "backpressured"].includes(state.phase), "invalid_fixture", "map completion outside live consumption");
        completeMapChunk(fixture, state, event);
        break;
      case "snapshot":
        requireCondition(["consuming", "backpressured"].includes(state.phase), "invalid_fixture", "snapshot outside live consumption");
        validateSnapshot(fixture, state, event);
        break;
      case "source_seal":
        sealSource(fixture, state, event);
        break;
      case "publish_sealed":
        publishSealed(fixture, state, event);
        break;
      case "source_halt":
        state.phase = "halted";
        fail("source_halted", `${event.code}: ${event.detail}`);
        break;
      default:
        fail("invalid_fixture", `unknown event ${event.type}`);
    }
  }
  requireCondition(state.phase === "sealed", "incomplete_seal", `fixture ended in ${state.phase}`);
  return {
    finalState: state.phase,
    duplicatesIgnored: state.duplicatesIgnored,
    backpressureEntries: state.backpressureEntries,
    backpressureReleases: state.backpressureReleases,
    sourceAcceptedThroughT: state.sourceAcceptedThroughT,
    appConsumedThroughT: state.appConsumedThroughT,
    mapCompletedThroughT: state.mapCompletedThroughT,
    snapshots: state.snapshots,
    sealedProduct: state.sealedProduct,
    sealedProductSha256: state.sealedProductSha256,
  };
}

export function applyPipelineFixtureMutation(fixture, mutation) {
  const copy = structuredClone(fixture);
  const parts = mutation.path.split(".");
  const key = parts.pop();
  const parent = parts.reduce((value, part) => value[part], copy);
  if (mutation.action === "append") {
    requireCondition(Array.isArray(parent[key]), "invalid_fixture", `append target ${mutation.path}`);
    parent[key].push(structuredClone(mutation.value));
  } else if (mutation.delete === true) {
    delete parent[key];
  } else {
    parent[key] = structuredClone(mutation.value);
  }
  return copy;
}

export function checkPotentialLiveTimespacePipelineContract({ rootDir = ROOT } = {}) {
  const contract = readJson(rootDir, CONTRACT_PATH);
  validateContractDefinition(contract);
  const positive = readJson(rootDir, contract.fixtures.positive);
  const negative = readJson(rootDir, contract.fixtures.negative);
  const result = simulatePotentialLivePipeline(positive);
  requireCondition(
    sameValue({
      finalState: result.finalState,
      duplicatesIgnored: result.duplicatesIgnored,
      backpressureEntries: result.backpressureEntries,
      backpressureReleases: result.backpressureReleases,
      sourceAcceptedThroughT: result.sourceAcceptedThroughT,
      appConsumedThroughT: result.appConsumedThroughT,
      mapCompletedThroughT: result.mapCompletedThroughT,
      sealedProductSha256: result.sealedProductSha256,
    }, positive.expected),
    "identity_mismatch",
    `expected ${positive.expected.sealedProductSha256}, computed ${result.sealedProductSha256}`,
  );

  const withoutDuplicate = structuredClone(positive);
  withoutDuplicate.events = withoutDuplicate.events.filter((event, index) => !(index === 5 && event.type === "accepted_chunk"));
  const replay = simulatePotentialLivePipeline(withoutDuplicate);
  requireCondition(replay.sealedProductSha256 === result.sealedProductSha256, "identity_mismatch", "duplicate-free replay changed the sealed identity");

  const negativeCases = negative.cases.map((entry) => {
    const candidate = applyPipelineFixtureMutation(positive, entry.mutation);
    try {
      simulatePotentialLivePipeline(candidate);
      fail("invalid_fixture", `${entry.id} unexpectedly passed`);
    } catch (error) {
      if (!(error instanceof PipelineContractError) || error.code !== entry.expectedCode) throw error;
      return { id: entry.id, refusalCode: error.code };
    }
  });

  return {
    schema: contract.schema,
    status: "passed",
    positive: {
      finalState: result.finalState,
      chunks: result.sealedProduct.orderedChunks.length,
      tiles: result.sealedProduct.orderedTiles.length,
      snapshots: result.snapshots.length,
      duplicatesIgnored: result.duplicatesIgnored,
      backpressureEntries: result.backpressureEntries,
      backpressureReleases: result.backpressureReleases,
      sealedProductSha256: result.sealedProductSha256,
    },
    deterministicReplay: replay.sealedProductSha256 === result.sealedProductSha256,
    negativeCases,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkPotentialLiveTimespacePipelineContract(), null, 2));
}

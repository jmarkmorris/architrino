import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";

import {
  checkAcceptedHistoryStreamContract,
  runAcceptedHistoryStreamFixture,
} from "../src/aaa-core/accepted-history-stream-v0.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
const CONTRACT = readJson("reference/priorities/app-aaa-core/contracts/aaa-core-accepted-history-stream.v0.json");
const PATH_CONTRACT = readJson("reference/priorities/app-aaa-core/contracts/aaa-core-path-interchange.v0.json");
const POSITIVE = readJson(CONTRACT.conformance.positiveFixtures);
const NEGATIVE = readJson(CONTRACT.conformance.negativeFixtures);

function fixtureCase(caseId) {
  return POSITIVE.cases.find((candidate) => candidate.caseId === caseId);
}

test("AAA Core accepted-history stream passes dual-consumer positive and negative suites", () => {
  const result = checkAcceptedHistoryStreamContract({rootDir: ROOT});
  assert.equal(result.status, "passed");
  assert.equal(result.positive.length, 2);
  assert.equal(result.negative.length, 12);
  assert.deepEqual(result.positive.map((candidate) => candidate.producerState), ["sealed", "halted"]);
  assert.ok(result.positive.every((candidate) => candidate.consumers === 2 && candidate.deterministicReplay));
});

test("sealed fixture exercises duplicate tolerance, bounded backpressure, reconnect, and full acknowledgement", () => {
  const result = runAcceptedHistoryStreamFixture(CONTRACT, PATH_CONTRACT, POSITIVE, fixtureCase("sealed-dual-consumer-reconnect"));
  const potential = result.consumers["potential-consumer"];
  const audit = result.consumers["history-audit-consumer"];
  assert.equal(result.producerState, "sealed");
  assert.equal(result.duplicatesIgnored, 1);
  assert.equal(result.producerBackpressured, false);
  assert.equal(potential.acknowledgedSequence, 2);
  assert.equal(audit.acknowledgedSequence, 2);
  assert.equal(audit.reconnects, 1);
  assert.equal(audit.backpressureEntries, 2);
  assert.equal(audit.backpressureReleases, 2);
  assert.equal(potential.queueDepth, 0);
  assert.equal(audit.queueDepth, 0);
});

test("independently implemented consumers agree on the prefix without sharing receipt identity", () => {
  const result = runAcceptedHistoryStreamFixture(CONTRACT, PATH_CONTRACT, POSITIVE, fixtureCase("sealed-dual-consumer-reconnect"));
  const potential = result.consumers["potential-consumer"].receipt;
  const audit = result.consumers["history-audit-consumer"].receipt;
  assert.equal(potential.orderedChunks.length, audit.rowCount);
  assert.equal(potential.acknowledgedThroughT, audit.acknowledgedThroughT);
  assert.notEqual(potential.receiptSha256, audit.receiptSha256);
  assert.equal(potential.terminal.type, "stream_seal");
  assert.deepEqual(potential.terminal, audit.terminal);
});

test("disconnected consumer receives the exact producer halt after reconnect", () => {
  const candidate = fixtureCase("halt-propagates-across-disconnect");
  const result = runAcceptedHistoryStreamFixture(CONTRACT, PATH_CONTRACT, POSITIVE, candidate);
  const potentialTerminal = result.consumers["potential-consumer"].receipt.terminal;
  const auditTerminal = result.consumers["history-audit-consumer"].receipt.terminal;
  assert.equal(result.producerState, "halted");
  assert.deepEqual(potentialTerminal, auditTerminal);
  assert.deepEqual(
    {
      code: potentialTerminal.code,
      detail: potentialTerminal.detail,
      failedSequence: potentialTerminal.failedSequence,
      acceptedThroughT: potentialTerminal.acceptedThroughT,
    },
    candidate.expected.halt,
  );
});

test("replaying the same action log reproduces both consumer receipts", () => {
  const candidate = fixtureCase("sealed-dual-consumer-reconnect");
  const first = runAcceptedHistoryStreamFixture(CONTRACT, PATH_CONTRACT, POSITIVE, candidate);
  const second = runAcceptedHistoryStreamFixture(CONTRACT, PATH_CONTRACT, POSITIVE, candidate);
  for (const consumerId of ["potential-consumer", "history-audit-consumer"]) {
    assert.equal(first.consumers[consumerId].receipt.receiptSha256, second.consumers[consumerId].receipt.receiptSha256);
  }
});

test("negative suite covers every accepted-history stream refusal family", () => {
  assert.deepEqual(
    new Set(NEGATIVE.cases.map((candidate) => candidate.expectedCode)),
    new Set([
      "missing_predecessor",
      "broken_predecessor_chain",
      "conflicting_duplicate",
      "noncontiguous_accepted_time",
      "source_binding_mismatch",
      "backpressure_active",
      "buffer_limit_exceeded",
      "acknowledgement_out_of_order",
      "invalid_reconnect_cursor",
      "incomplete_seal",
      "halt_identity_mismatch",
      "terminal_stream_immutable",
    ]),
  );
});

test("machine schema requires producer, subscription, watermark, pressure, seal, halt, and consumer rules", () => {
  const schema = readJson("src/contracts/aaa-core-accepted-history-stream/v0/schema.json");
  const required = new Set(schema.required);
  for (const field of ["producerRules", "subscriptionRules", "watermarks", "backpressure", "sealing", "halting", "consumerConformance", "refusalCodes"]) {
    assert.ok(required.has(field), `schema must require ${field}`);
  }
});

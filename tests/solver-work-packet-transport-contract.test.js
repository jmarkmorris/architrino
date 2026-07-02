import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTRACT_DOC_PATH,
  REQUIRED_BUFFER_REF_FIELDS,
  REQUIRED_PACKET_HEADER_FIELDS,
  REQUIRED_PLAN_FIELDS,
  auditWorkPacketTransportContract,
} from "../scripts/solver-audits/work-packet-transport-contract-audit.mjs";

test("work-packet transport contract stays aligned with live packet surfaces", () => {
  const result = auditWorkPacketTransportContract();

  assert.deepEqual(result.errors, []);
  assert.equal(result.ok, true);
  assert.equal(
    result.docPath,
    "reference/priorities/app-solver/work-packet-transport-contract.md"
  );
});

test("work-packet transport audit covers header, buffer, and plan fields", () => {
  assert.equal(CONTRACT_DOC_PATH.endsWith("work-packet-transport-contract.md"), true);
  assert.deepEqual(REQUIRED_PACKET_HEADER_FIELDS, [
    "schema",
    "packetId",
    "runId",
    "modelId",
    "precisionPath",
    "sourceBlock",
    "receiverBlock",
    "pathBlock",
    "timeRange",
    "expectedOutputs",
    "inputBuffers",
    "mergeOrder",
    "mergeKey",
  ]);
  assert.ok(REQUIRED_BUFFER_REF_FIELDS.includes("checksum"));
  assert.ok(REQUIRED_PLAN_FIELDS.includes("planChecksum"));
});

import assert from "node:assert/strict";
import { isDeepStrictEqual } from "node:util";
import { readFileSync } from "node:fs";
import { executeMcpTool } from "../../../../../src/archie-service/mcp/tool-contract-v1.mjs";

function compare(actual, expected) {
  const projected = structuredClone(actual);
  if (projected.snapshot && expected.snapshot) projected.snapshot.snapshotSha256 = expected.snapshot.snapshotSha256;
  return { exact: isDeepStrictEqual(actual, expected), equalExceptSnapshotSha256: isDeepStrictEqual(projected, expected) };
}
assert.deepEqual(compare({ snapshot: { snapshotSha256: "a" }, result: 1 }, { snapshot: { snapshotSha256: "b" }, result: 1 }), { exact: false, equalExceptSnapshotSha256: true });
assert.equal(compare({ snapshot: { snapshotSha256: "a" }, result: 2 }, { snapshot: { snapshotSha256: "b" }, result: 1 }).equalExceptSnapshotSha256, false);
console.log("Known comparison controls passed before target responses.");
const read = (filename) => JSON.parse(readFileSync(filename));
const snapshot = read("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");
const contract = read("tests/archie-service/fixtures/mcp/mcp-tool-contract.v1.json");
for (const row of contract.cases) {
  const actual = executeMcpTool({ snapshot, request: row.request, accessScope: row.accessScope });
  const result = compare(actual, row.expectedResponse);
  console.log(JSON.stringify({ caseId: row.caseId, ...result }));
  if (!result.equalExceptSnapshotSha256) {
    const projected = structuredClone(actual);
    if (projected.snapshot && row.expectedResponse.snapshot) projected.snapshot.snapshotSha256 = row.expectedResponse.snapshot.snapshotSha256;
    try { assert.deepEqual(projected, row.expectedResponse); } catch (error) { console.log(error.message); }
    process.exitCode = 1;
  }
}

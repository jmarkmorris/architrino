import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { identifyDiagnosticSourceRecord } from "../scripts/mapping-electromagnetism/diagnostic-source-identity.mjs";

test("diagnostic identity binds the declared paths and retains diagnostic status", () => {
  const record = { schema: "fixture", engineId: "prescribed-geometry", recordId: "display-label", claimGrade: "guessed-prescribed-geometry", evidenceStatus: "diagnostic-only", history: { start: -1, end: 1 }, sources: [{ id: "one", charge: 1, trajectory: { radius: 0.3 } }] };
  const identified = identifyDiagnosticSourceRecord(record);
  const preimage = '{"engineId":"prescribed-geometry","history":{"end":1,"start":-1},"normalizedFieldSpeed":1,"schema":"fixture","sources":[{"charge":1,"id":"one","trajectory":{"radius":0.3}}]}';
  assert.equal(identified.scientificIdentityPreimage, preimage);
  const digest = createHash("sha256").update(preimage).digest("hex");
  assert.equal(identified.modelRevisionSha256, digest);
  assert.equal(identified.assemblyId, `asm-${digest.slice(0, 32)}`);
  assert.equal(identified.evidenceStatus, "diagnostic-only");
  assert.equal(identifyDiagnosticSourceRecord({ ...record, recordId: "another-label" }).assemblyId, identified.assemblyId);
  assert.notEqual(identifyDiagnosticSourceRecord({ ...record, history: { start: -2, end: 1 } }).assemblyId, identified.assemblyId);
  assert.notEqual(identifyDiagnosticSourceRecord({ ...record, sources: [{ ...record.sources[0], charge: -1 }] }).assemblyId, identified.assemblyId);
});

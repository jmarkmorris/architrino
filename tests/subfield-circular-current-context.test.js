import knownHashes from '../scripts/equation-mapping/fixtures/known-hash-answers.json' with { type: 'json' };
const ABC_SHA = knownHashes.sha256.abc;
import assert from "node:assert/strict";
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import test from "node:test";
import {prepareSubfieldCircularPhaseLedgerContext, subfieldCircularSha256} from "../src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";

test("SHA control precedes recorded current-context checks", () => {
  assert.equal(subfieldCircularSha256(Buffer.from("abc")), ABC_SHA);
});

test("recorded current build and original proof enter phase context; substituted inputs reject", {skip: !process.env.AAA_CIRCULAR_CURRENT_CONTEXT}, async () => {
  const root = process.cwd();
  const base = path.join(root, ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1");
  assert.ok(process.env.AAA_SUBFIELD_CIRCULAR_BUILD_RECEIPT, "current-context controls require an explicitly selected fresh build receipt");
  const buildReceipt = path.resolve(process.env.AAA_SUBFIELD_CIRCULAR_BUILD_RECEIPT);
  const options = {
    repoRoot: root,
    historyManifest: path.join(base, "current-data-path-20260908/history-manifest.json"),
    conformance: path.join(base, "current-data-path-20260908/conformance.json"),
    conformanceSha256: subfieldCircularSha256(readFileSync(path.join(base, "current-data-path-20260908/conformance.json"))),
    buildReceipt,
    buildReceiptSha256: subfieldCircularSha256(readFileSync(buildReceipt)),
  };
  const directory = mkdtempSync(path.join(tmpdir(), "circular-current-context-"));
  try {
    await assert.rejects(prepareSubfieldCircularPhaseLedgerContext({...options, buildReceiptSha256: "0".repeat(64)}), /build receipt original-byte hash mismatch/);
    const context = await prepareSubfieldCircularPhaseLedgerContext(options);
    assert.equal(context.manifest.members.length, 6);
    assert.equal(context.speedBounds.length, 6);
    context.recheck();
    for (const [name, mutate, expected] of [
      ["source", value => { value.sourcesBefore[0].sha256 = "0".repeat(64); value.sourcesAfter[0].sha256 = "0".repeat(64); }, /build file changed/],
      ["capability", value => { value.toolsBefore[0].sha256 = "0".repeat(64); value.toolsAfter[0].sha256 = "0".repeat(64); }, /capabilities differ/],
      ["stage", value => { value.stages[0].processGroupClosed = false; }, /build stage did not close successfully/],
    ]) {
      const value = JSON.parse(readFileSync(buildReceipt));
      mutate(value);
      const bytes = Buffer.from(JSON.stringify(value));
      const filename = path.join(directory, `${name}-build.json`);
      writeFileSync(filename, bytes);
      await assert.rejects(prepareSubfieldCircularPhaseLedgerContext({...options, buildReceipt: filename,
        buildReceiptSha256: subfieldCircularSha256(bytes)}), expected);
    }
    const proof = JSON.parse(readFileSync(options.conformance));
    proof.execution.sourceBindings.pop();
    const bytes = Buffer.from(JSON.stringify(proof));
    const substituted = path.join(directory, "proof.json");
    writeFileSync(substituted, bytes);
    await assert.rejects(prepareSubfieldCircularPhaseLedgerContext({...options, conformance: substituted, conformanceSha256: subfieldCircularSha256(bytes)}), /conformance instrument bindings differ/);
  } finally {
    rmSync(directory, {recursive:true, force:true});
  }
});

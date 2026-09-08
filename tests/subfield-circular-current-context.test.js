import assert from "node:assert/strict";
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import test from "node:test";
import {prepareSubfieldCircularPhaseLedgerContext, subfieldCircularSha256} from "../src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";

test("SHA control precedes recorded current-context checks", () => {
  assert.equal(subfieldCircularSha256(Buffer.from("abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
});

test("reviewed current build and original proof enter production context; substituted proof rejects", {skip: !process.env.AAA_CIRCULAR_CURRENT_CONTEXT}, async () => {
  const root = process.cwd();
  const base = path.join(root, ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1");
  const options = {
    repoRoot: root,
    historyManifest: path.join(base, "current-data-path-20260908/history-manifest.json"),
    conformance: path.join(base, "current-data-path-20260908/conformance.json"),
    conformanceSha256: subfieldCircularSha256(readFileSync(path.join(base, "current-data-path-20260908/conformance.json"))),
    buildReceipt: path.join(base, "current-v3-build-20260908-execution-review/preparation.json"),
    buildReceiptSha256: "c80526d097c81627186cbbfcea7e0005d9d73288e331f4535f07982cc2bef944",
  };
  const directory = mkdtempSync(path.join(tmpdir(), "circular-current-context-"));
  try {
    await assert.rejects(prepareSubfieldCircularPhaseLedgerContext({...options, buildReceiptSha256: "0".repeat(64)}), /build receipt original-byte hash mismatch/);
    const context = await prepareSubfieldCircularPhaseLedgerContext(options);
    assert.equal(context.manifest.members.length, 6);
    assert.equal(context.speedBounds.length, 6);
    context.recheck();
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

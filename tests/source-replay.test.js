import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { materializeSourceReplay, SOURCE_REPLAY_SCHEMA } from "../scripts/dev/materialize-source-replay.mjs";

const ABC_SHA = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";

test("source replay verifies the known abc bytes before materializing an exclusive tree", (t) => {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), "source-replay-known-")));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(path.join(root, "original.source"), "abc");
  const manifest = { schema: SOURCE_REPLAY_SCHEMA, files: [{
    path: "original/path.txt", source: "original.source", sha256: ABC_SHA,
  }] };
  const output = path.join(root, "replay");
  const run = () => materializeSourceReplay({ rootDir: root, manifest, outputDir: output });
  assert.equal(run().totalBytes, 3);
  assert.equal(readFileSync(path.join(output, "original/path.txt"), "utf8"), "abc");
  assert.throws(run, /EEXIST/u);
  assert.equal(readFileSync(path.join(root, "original.source"), "utf8"), "abc");
});

test("source replay rejects changed bytes, traversal, duplicate targets and symlink sources before output", (t) => {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), "source-replay-negative-")));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(path.join(root, "original.source"), "abc");
  symlinkSync(path.join(root, "original.source"), path.join(root, "link.source"));
  const row = { path: "original/path.txt", source: "original.source", sha256: ABC_SHA };
  for (const files of [[{ ...row, sha256: "0".repeat(64) }], [{ ...row, path: "../escape" }],
    [{ ...row, source: "../escape" }], [row, row], [{ ...row, source: "link.source" }]]) {
    const output = path.join(root, "rejected");
    assert.throws(() => materializeSourceReplay({ rootDir: root,
      manifest: { schema: SOURCE_REPLAY_SCHEMA, files }, outputDir: output }));
    assert.equal(existsSync(output), false);
  }
});

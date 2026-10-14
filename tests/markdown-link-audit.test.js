import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { extractMarkdownLinks as audit, hasReferenceDirectoryIndex } from "../scripts/lib/markdown-link-audit.mjs";

test("only repository reference directories with a regular README have landing pages", t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "markdown-directory-index-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, "reference/evidence"), { recursive: true });
  assert.equal(hasReferenceDirectoryIndex(root, "reference/evidence"), false);
  fs.writeFileSync(path.join(root, "reference/evidence/README.md"), "# Evidence\n");
  assert.equal(hasReferenceDirectoryIndex(root, "reference/evidence"), true);
  assert.equal(hasReferenceDirectoryIndex(root, "reference/missing"), false);
  assert.equal(hasReferenceDirectoryIndex(root, "reference/../reference/evidence"), false);
  fs.mkdirSync(path.join(root, "content/example"), { recursive: true });
  fs.writeFileSync(path.join(root, "content/example/README.md"), "# Example\n");
  assert.equal(hasReferenceDirectoryIndex(root, "content/example"), false);
  fs.mkdirSync(path.join(root, "reference/directory/README.md"), { recursive: true });
  assert.equal(hasReferenceDirectoryIndex(root, "reference/directory"), false);
  fs.mkdirSync(path.join(root, "reference/symlink"));
  fs.symlinkSync("../evidence/README.md", path.join(root, "reference/symlink/README.md"));
  assert.equal(hasReferenceDirectoryIndex(root, "reference/symlink"), false);
});

test("inline code examples are ignored while adjacent real links remain", () => {
  assert.deepEqual(audit("`[..](relative)` and [actual](missing.md)"),
    [{ line: 1, target: "missing.md" }]);
  assert.deepEqual(audit("``code `[..](relative)` code`` [actual](real.md)"),
    [{ line: 1, target: "real.md" }]);
  assert.deepEqual(audit("`unfinished [actual](missing.md)"),
    [{ line: 1, target: "missing.md" }]);
});

test("existing math, fenced code, image and title handling retains line numbers", () => {
  const text = '$A[y](t)$\n```md\n[example](fake.md)\n```\n![image](image.png "title")\n[actual](real.md#part)';
  assert.deepEqual(audit(text), [
    { line: 5, target: "image.png" },
    { line: 6, target: "real.md#part" },
  ]);
});

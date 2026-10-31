import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { extractMarkdownLinks as audit, hasReferenceDirectoryIndex } from "../scripts/lib/markdown-link-audit.mjs";
import { recordedResearchLinkTarget, resolveResearchDocumentLink, localResearchEvidence } from "../src/documentation/ResearchSourceLocations.mjs";

test("local evidence registrations apply only to their exact historical citations", () => {
  const doc = "reference/op/agent-chats/2026-10-20-ceiling-spectrum-outside-reading/chat.md";
  const logical = ".tmp/ceiling-spectrum-outside-reading/recount.py";
  const retained = localResearchEvidence(doc, logical);
  assert.equal(retained.path, ".local-data/master-equation-closure/ceiling-spectrum-outside-reading-2026-10-20/recount.py");
  assert.equal(retained.bytes, 8015);
  assert.equal(retained.sha256, "d3865c35720b7cfc07e7fdde97077ae44c5a8c22fcf436761664db0aab2bbab3");
  assert.equal(localResearchEvidence("reference/new.md", logical), null);
  assert.equal(localResearchEvidence("content/markdown/aaa/result.md", logical), null);
  for (const target of [".tmp/missing.py", ".local-data/missing.json", "../" + logical, logical + "/../recount.py"])
    assert.equal(localResearchEvidence(doc, target), null);
  assert.equal(resolveResearchDocumentLink(doc, "../../../../" + logical).path, logical);
});

test("a byte-identical tracked copy resolves a historical scratch citation", () => {
  const doc = "reference/op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md";
  const target = resolveResearchDocumentLink(doc, "../../../../.tmp/rotating-ladder/codex-review/packet-11-reproduction/reviewer.py");
  assert.equal(target.path, "reference/priorities/master-equation-closure/lattice-research/evidence/rotating-ladder-branch-connection-2026-10-29/inputs/reviewer_reference.py");
  assert.equal(localResearchEvidence(doc, target.path), null);
});

test("captured review links resolve only within their recorded checkout", () => {
  const doc = "reference/priorities/example/evidence/campaign/review/chunk1-reply-round2.md";
  const prefix = "/Users/markmorris/vibe/architrino/";
  const target = "reference/priorities/example/analysis/result.md";
  assert.equal(recordedResearchLinkTarget(doc, prefix + target + ":12"), target);
  const tracking = doc.replace("chunk1-reply", "tracking-reply");
  assert.equal(recordedResearchLinkTarget(tracking, prefix + target + ":12"), target);
  assert.equal(recordedResearchLinkTarget(tracking, prefix + ".local-data/campaign/run.out:7"), ".local-data/campaign/run.out");
  assert.deepEqual(resolveResearchDocumentLink(doc, prefix + target + ":12"), {path: target, fragment: ""});
  for (const href of ["/tmp/result.md", prefix + "../secret", prefix + "x/../../secret",
    prefix + "%2e%2e/secret", prefix + "/etc/passwd", prefix + "x\\secret"]) {
    assert.equal(recordedResearchLinkTarget(doc, href), null, href);
  }
  for (const source of ["content/markdown/aaa/result.md", "reference/priorities/example/manuscript.md",
    "reference/priorities/example/evidence/campaign/README.md"]) {
    assert.equal(recordedResearchLinkTarget(source, prefix + target), null, source);
  }
});

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

import test from "node:test";
import assert from "node:assert/strict";
import { extractMarkdownLinks as audit } from "../scripts/lib/markdown-link-audit.mjs";

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

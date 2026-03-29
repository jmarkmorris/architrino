import test from "node:test";
import assert from "node:assert/strict";

import {
  __TEST_ONLY__,
} from "../src/runtime/ComposerHeaderTimestampRuntime.js";

test("composer header timestamp runtime formats generatedAt as a compact local timestamp", () => {
  const formatted = __TEST_ONLY__.formatComposerHeaderTimestamp(
    { generatedAt: "2026-03-29T19:34:54.763Z" },
    null
  );
  assert.match(formatted ?? "", /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
});

test("composer header timestamp runtime falls back to lastChangedAt when signature timestamp is missing", () => {
  assert.equal(
    __TEST_ONLY__.formatComposerHeaderTimestamp(
      { shortSha: "abc123" },
      "2026-03-29T19:34:54.763Z"
    ),
    __TEST_ONLY__.formatComposerHeaderTimestampValue("2026-03-29T19:34:54.763Z")
  );
});

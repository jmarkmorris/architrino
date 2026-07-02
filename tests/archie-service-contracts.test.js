import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

test("Archie service schema-only contracts validate fixture expectations", () => {
  const result = spawnSync("node", ["scripts/archie-service/validate-contracts.mjs", "--check"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /Archie service contract validation passed/);
});

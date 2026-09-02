import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function readScene(name) {
  return JSON.parse(
    await readFile(new URL(`../content/scenes/archie/${name}.json`, import.meta.url), "utf8"),
  );
}

test("Borg and Animator declare distinct EOM application workflows", async () => {
  const [borg, animator] = await Promise.all([readScene("borg"), readScene("animator")]);

  assert.equal(borg.scene.application.eomWorkflow, "run-and-inspection");
  assert.equal(borg.scene.application.mayInitiateEomRuns, true);
  assert.equal(animator.scene.application.eomWorkflow, "accepted-recorded-output-playback");
  assert.equal(animator.scene.application.mayInitiateEomRuns, false);
  assert.equal(
    animator.scene.application.acceptedHandoffSchema,
    "eom-recorded-playback-handoff.v1",
  );
});

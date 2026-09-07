import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const INSTRUMENT = "scripts/eom/derive-f5-independent-interpolation-enclosure.mjs";

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

test("F5 independent instrument reproduces the accepted interpolation enclosure", () => {
  assert.equal(
    sha256(readFileSync(INSTRUMENT)),
    "f07ee01d7f253ae757b23fe1edb269b706f2da587f36d8fdb83dc653372d19a9",
  );
  const directory = mkdtempSync(path.join(tmpdir(), "f5-independent-enclosure-"));
  const output = path.join(directory, "report.v1.json");
  const run = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.equal(run.status, 0, run.stderr);
  const bytes = readFileSync(output);
  assert.equal(
    sha256(bytes),
    "2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9",
  );
  const report = JSON.parse(bytes);
  assert.equal(report.accepted, true);
  assert.equal(report.enclosure.positionWidth, 1.528724905003159e-10);
  assert.equal(report.enclosure.velocityWidth, 2.866983034112353e-7);
  assert.deepEqual(report.falsifiers, {
    sourceMismatch: false,
    primitiveControlFailure: false,
    nonpositiveSquareRootInterval: false,
    infiniteInterval: false,
    densePositionEscape: false,
    denseVelocityEscape: false,
  });
});

test("F5 independent enclosure output remains create-exclusive", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-independent-enclosure-"));
  const output = path.join(directory, "report.v1.json");
  const first = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.equal(first.status, 0, first.stderr);
  const second = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: process.cwd(), encoding: "utf8" },
  );
  assert.notEqual(second.status, 0);
  assert.match(second.stderr, /EEXIST/u);
});

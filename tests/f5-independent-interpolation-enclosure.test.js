import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { after } from "node:test";
import assert from "node:assert/strict";
import { prepareF5OriginalInputTree, verifyF5OriginalInputTree } from '../scripts/eom/prepare-f5-original-input-tree.mjs';

const INSTRUMENT = "scripts/eom/derive-f5-independent-interpolation-enclosure.mjs";
const executionRoot = prepareF5OriginalInputTree(`.local-data/f5-original-input-trees/interpolation-control-${randomUUID()}`).executionRoot;
after(() => rmSync(executionRoot, { recursive: true }));

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

test("F5 instrument reproduces the original enclosure with disclosed current source metadata", () => {
  assert.equal(
    sha256(readFileSync(INSTRUMENT)),
    "f07ee01d7f253ae757b23fe1edb269b706f2da587f36d8fdb83dc653372d19a9",
  );
  const directory = mkdtempSync(path.join(tmpdir(), "f5-independent-enclosure-"));
  const output = path.join(directory, "report.v1.json");
  const run = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: executionRoot, encoding: "utf8", timeout: 30000 },
  );
  assert.equal(run.status, 0, run.stderr);
  const bytes = readFileSync(output);
  const report = JSON.parse(bytes);
  verifyF5OriginalInputTree(executionRoot);
  assert.equal(report.instrument.sha256, 'f07ee01d7f253ae757b23fe1edb269b706f2da587f36d8fdb83dc653372d19a9');
  assert.equal(report.sourceChecks[0].path, 'reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json');
  // Only the instrument's recorded identity and config logical name changed.
  // This private comparison projection never rewrites the produced receipt.
  const historical = structuredClone(report);
  historical.instrument.sha256 = 'c59190e94c196e78b5f4e53ee0cca7f4e8395fedf66e92d0c5dd4efb544d95f1';
  historical.sourceChecks[0].path = 'reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json';
  assert.equal(sha256(`${JSON.stringify(historical, null, 2)}\n`), '2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9');
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
    { cwd: executionRoot, encoding: "utf8", timeout: 30000 },
  );
  assert.equal(first.status, 0, first.stderr);
  const second = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: executionRoot, encoding: "utf8", timeout: 30000 },
  );
  assert.notEqual(second.status, 0);
  assert.match(second.stderr, /EEXIST/u);
});

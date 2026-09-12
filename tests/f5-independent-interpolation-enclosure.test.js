import optionBIdentities from './fixtures/option-b-retained-test-identities.json' with { type: 'json' };
const RETAINED_HASHES = Object.freeze([...optionBIdentities.byConsumer["tests/f5-independent-interpolation-enclosure.test.js"].sha256]);
if (RETAINED_HASHES.length !== 3 || !RETAINED_HASHES.every(value => typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value))) throw new Error('Malformed retained test identities');
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { prepareF5OriginalInputTree, verifyF5OriginalInputTree } from '../scripts/eom/prepare-f5-original-input-tree.mjs';

const INSTRUMENT = "scripts/eom/derive-f5-independent-interpolation-enclosure.mjs";
const SOURCE_MAP_SHA = optionBIdentities.f5PreparationSelection.sha256;
if (!/^[a-f0-9]{64}$/u.test(SOURCE_MAP_SHA ?? '')) throw new Error('Malformed F5 preparation selection');
let executionRoot;
before(async () => {
  executionRoot = (await prepareF5OriginalInputTree(`.local-data/f5-original-input-trees/interpolation-control-${randomUUID()}`, process.cwd(), SOURCE_MAP_SHA)).executionRoot;
});
after(() => { if (executionRoot) rmSync(executionRoot, { recursive: true }); });

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

test("F5 instrument reproduces the original enclosure with disclosed current source metadata", async () => {
  assert.equal(
    sha256(readFileSync(INSTRUMENT)),
    RETAINED_HASHES[0],
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
  await verifyF5OriginalInputTree(executionRoot, process.cwd(), SOURCE_MAP_SHA);
  assert.equal(report.instrument.sha256, RETAINED_HASHES[0]);
  assert.equal(report.sourceChecks[0].path, 'reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json');
  // Only the instrument's recorded identity and config logical name changed.
  // This private comparison projection never rewrites the produced receipt.
  const historical = structuredClone(report);
  historical.instrument.sha256 = RETAINED_HASHES[1];
  historical.sourceChecks[0].path = 'reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json';
  assert.equal(sha256(`${JSON.stringify(historical, null, 2)}\n`), RETAINED_HASHES[2]);
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

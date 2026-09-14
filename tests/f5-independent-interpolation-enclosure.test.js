import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
const INSTRUMENT = "scripts/eom/derive-f5-independent-interpolation-enclosure.mjs";
test("F5 independent instrument retains the accepted numerical enclosure", () => {
 const directory=mkdtempSync(path.join(tmpdir(),"f5-independent-enclosure-")),output=path.join(directory,"report.json");
 const run=spawnSync(process.execPath,[INSTRUMENT,"--out",output],{cwd:process.cwd(),encoding:"utf8",timeout:30000});
 assert.equal(run.status,0,run.stderr); const report=JSON.parse(readFileSync(output));
 assert.equal(report.accepted,true);
 assert.equal(report.enclosure.positionWidth,1.528724905003159e-10);
 assert.equal(report.enclosure.velocityWidth,2.866983034112353e-7);
 assert.ok(Object.values(report.falsifiers).every(value=>value===false));
});
test("F5 independent enclosure output remains create-exclusive", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "f5-independent-enclosure-"));
  const output = path.join(directory, "report.v1.json");
  const first = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: process.cwd(), encoding: "utf8", timeout: 30000 },
  );
  assert.equal(first.status, 0, first.stderr);
  const second = spawnSync(
    process.execPath,
    [INSTRUMENT, "--out", output],
    { cwd: process.cwd(), encoding: "utf8", timeout: 30000 },
  );
  assert.notEqual(second.status, 0);
  assert.match(second.stderr, /EEXIST/u);
});

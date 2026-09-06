import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { startupAbortInspection } from "../scripts/eom/launch-f5-prehistory-handoff-build.mjs";
import { processTable, superviseRegisteredPilot } from "../scripts/eom/launch-subfield-circular-root-pilot.mjs";

// Independently authored startup controls. The only possible executable target
// is a synthetic Node marker writer; no build, F5 data, or EOM is invoked.
const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};
function fixture() {
  const root = realpathSync(mkdtempSync(path.join(os.tmpdir(), "f5-build-startup-control-")));
  const marker = path.join(root, "target-started");
  const target = `require('node:fs').writeFileSync(${JSON.stringify(marker)},'unexpected-target',{flag:'wx'});`;
  const source = Buffer.from(`import {spawn} from 'node:child_process';
const child=spawn(process.execPath,['-e',${JSON.stringify(target)}],{cwd:${JSON.stringify(root)},detached:true,stdio:['ignore','pipe','pipe']});
child.stdout.pipe(process.stdout);child.stderr.pipe(process.stderr);child.once('close',code=>process.exit(code??1));`);
  writeFileSync(path.join(root, "synthetic.mjs"), source, { flag: "wx" });
  return { marker, options: { root, entry: "synthetic.mjs", args: [],
    sources: [{ path: "synthetic.mjs", bytes: source, sha256: createHash("sha256").update(source).digest("hex") }],
    output: path.join(root, "attempt"), limitMs: 20000, heartbeatMs: 1000, graceMs: 100,
    admit: async () => { throw new Error("interrupted startup must never reach admission"); } } };
}
async function rejected(options) {
  try { await superviseRegisteredPilot(options); assert.fail("interrupted startup must reject"); }
  catch (error) {
    assert.ok(error.outerReceipt, error.stack);
    assert.equal(error.outerReceipt.accepted, false);
    return error.outerReceipt;
  }
}

test("aborted inspection rejects once, then leaves real inspection available for cleanup", async () => {
  const controller = new AbortController(), reason = new Error("synthetic pre-start interruption");
  const rows = [{ pid: 123, pgid: 123, started: "synthetic identity" }];
  let calls = 0;
  const inspect = startupAbortInspection(async () => { calls++; return rows; }, controller.signal);
  controller.abort(reason);
  await assert.rejects(inspect(), error => error === reason);
  assert.equal(calls, 0, "already aborted setup must not start an inspection");
  assert.equal(await inspect(), rows);
  assert.equal(await inspect(), rows);
  assert.equal(calls, 2, "abort state must not permanently disable cleanup inspection");
});

test("interruption during first inspection creates no bootstrap or target ACK", async () => {
  const { marker, options } = fixture(), entered = deferred(), release = deferred();
  const controller = new AbortController(), reason = new Error("synthetic interruption during first inspection");
  const before = { SIGINT: process.listeners("SIGINT"), SIGTERM: process.listeners("SIGTERM") };
  options.inspectProcesses = startupAbortInspection(async () => {
    entered.resolve(); await release.promise; return [];
  }, controller.signal);
  const running = rejected(options);
  await entered.promise; controller.abort(reason); release.resolve();
  const receipt = await running;
  assert.match(receipt.failure, /interruption during first inspection/);
  assert.equal(receipt.runner, undefined);
  assert.deepEqual(receipt.gates, []);
  assert.deepEqual(receipt.signals, []);
  assert.equal(existsSync(marker), false);
  assert.equal(readFileSync(receipt.stdoutLog.path).length, 0);
  assert.equal(readFileSync(receipt.stderrLog.path).length, 0);
  for (const signal of ["SIGINT", "SIGTERM"]) assert.deepEqual(process.listeners(signal), before[signal]);
});

for (const [inspection, label] of [[2, "bootstrap"], [3, "first target gate"]]) {
  test(`interruption at ${label} inspection prevents target ACK and permits validated owned cleanup`, async () => {
    const { marker, options } = fixture(), controller = new AbortController();
    let calls = 0;
    options.inspectProcesses = startupAbortInspection(async () => {
      const rows = await processTable();
      if (++calls === inspection) controller.abort(new Error(`synthetic ${label} interruption`));
      return rows;
    }, controller.signal);
    const receipt = await rejected(options);
    assert.equal(calls > inspection, true, "real process inspection must remain callable during cleanup");
    assert.match(receipt.failure, /synthetic .* interruption/);
    assert.equal(receipt.processesClosed, true);
    assert.equal(receipt.cleanupFailure, undefined);
    assert.deepEqual(receipt.gates, []);
    assert.equal(existsSync(marker), false);
    assert.ok(receipt.runner?.pid, "synthetic bootstrap identity must be retained");
    assert.throws(() => process.kill(receipt.runner.pid, 0), error => error.code === "ESRCH");
    assert.ok(receipt.signals.every(record => record.pgid !== process.pid));
  });
}

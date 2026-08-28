import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import { mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { runABCPhaseProcess } from "../src/prescribed-path-analysis/ABCPhaseProcess.mjs";

// Every child below is a synthetic protocol actor. No EOM executable, actual
// geometry, root certificate, scientific ledger, or H3 campaign is invoked.
const CHILD = String.raw`
const fs = require('node:fs'), readline = require('node:readline');
const config = JSON.parse(process.argv[1]), identity = config.identity;
let completed = 0, passing = 0, failures = 0, constructed = 0;
const began = performance.now();
function emit(event, detail) {
  process.stderr.write(JSON.stringify({schema:'braid-program/abc-enclosed-root-adapter-event.v1',event,stage:event,
    failureCode:failures?'synthetic_failure':'',constructedMemberSegments:constructed,completedRows:completed,
    passingRows:passing,failureCount:failures,elapsedWallSeconds:(performance.now()-began)/1000,
    historyManifestSha256:event==='environment-controls-passed'||event==='member-constructed'?'':identity.historyManifestSha256,
    h3EvidenceEligible:false,...(detail?{detail}:{})})+'\n');
}
if (config.mode==='descendant') {
  const code="process.on('SIGTERM',()=>{});setInterval(()=>{},1000);process.send('ready')";
  const child=require('node:child_process').spawn(process.execPath,['-e',code],{stdio:['ignore','ignore','ignore','ipc']});
  child.on('message',()=>{fs.writeFileSync(config.pidFile,String(child.pid));process.exit(0)});
} else {
  const fd=fs.openSync(config.raw,'wx');
  if(config.mode==='malformed-event') {process.stderr.write('{"bad":\n');setInterval(()=>{},1000);}
  else {
    process.stdout.write('synthetic diagnostic stdout\n');
    emit('environment-controls-passed');
    identity.members.forEach((member,index)=>{constructed+=1000;emit('member-constructed',{memberIndex:index,
      historyFingerprint:member.historyFingerprint,strictlySubField:true,actualInflatedSpeedUpper:0.5});});
    emit('prepared',{manifestId:identity.manifestId,conformanceSha256:identity.conformanceSha256,memberCount:identity.members.length});
    const rl=readline.createInterface({input:process.stdin});
    rl.on('line',(line)=>{
      fs.appendFileSync(config.commands,line+'\n');
      const [receiver,transmitter]=line.split(' ').map(Number);
      const request={rowId:identity.manifestId+'/'+receiver+'/'+transmitter,
        receiverHistoryId:identity.members[receiver].historyId,transmitterHistoryId:identity.members[transmitter].historyId,
        receiverHistoryFingerprint:identity.members[receiver].historyFingerprint,
        transmitterHistoryFingerprint:identity.members[transmitter].historyFingerprint};
      if(config.mode==='misidentified-event')request.rowId='wrong';
      emit('row-started',request);
      if(config.mode==='hung-call'){while(true){};}
      const row={schema:'braid-program/abc-enclosed-root-row.v1',candidateId:identity.candidateId,rung:identity.rung,phase:identity.phase,
        manifestId:identity.manifestId,historyManifestSha256:identity.historyManifestSha256,conformanceSha256:identity.conformanceSha256,
        receiverIndex:receiver,transmitterIndex:transmitter,request,h3EvidenceEligible:false,
        rowPassed:config.mode!=='failed-row',adapterFailureCode:config.mode==='failed-row'?'synthetic_failure':'',
        certificate:{syntheticOnly:true}};
      if(config.mode==='misidentified-row')row.transmitterIndex=1-transmitter;
      const bytes=JSON.stringify(row)+'\n';
      fs.writeSync(fd,config.mode==='partial-row'?bytes.slice(0,-8):config.mode==='extra-row'?bytes+bytes:bytes);
      fs.fsyncSync(fd);completed++;
      if(config.mode==='failed-row'){failures++;emit('failed');process.exitCode=1;rl.close();process.stdin.destroy();return;}
      if(config.mode==='unknown-event')emit('invented-event');
      passing++;emit('row-complete');
      if(config.mode==='late-unknown-event')setTimeout(()=>emit('invented-event'),20);
    });
    rl.on('close',()=>{
      if(failures)return;
      if(config.mode!=='missing-stopped')emit('stopped');
      process.stderr.write('        0.01 real         0.00 user         0.00 sys\n');
      process.stderr.write('             123 maximum resident set size\n');
      fs.closeSync(fd);
    });
  }
}
`;

function fixture(mode = "success") {
  const directory = realpathSync(mkdtempSync(path.join(os.tmpdir(), "abc-phase-process-")));
  const identity = { candidateId: "synthetic-only", rung: 2, phase: 0,
    manifestId: "synthetic-only:T=4", historyManifestSha256: "a".repeat(64), conformanceSha256: "b".repeat(64),
    members: [0, 1].map((index) => ({ historyId: `history-${index}`, historyFingerprint: `fingerprint-${index}` })) };
  const config = { mode, identity, raw: path.join(directory, "rows.ndjson"),
    commands: path.join(directory, "commands.txt"), pidFile: path.join(directory, "descendant.pid") };
  return { directory, config, options: { command: process.execPath, args: ["-e", CHILD, JSON.stringify(config)], cwd: directory,
    rawRowsPath: config.raw, stdoutLogPath: path.join(directory, "stdout.log"), stderrLogPath: path.join(directory, "stderr.log"),
    identity, pairs: [[0, 0], [0, 1]], checkRowBytes: async () => true, limitMs: 3000, heartbeatMs: 500, terminationGraceMs: 100 } };
}

function commands(config) {
  try { return readFileSync(config.commands, "utf8").trim().split("\n").filter(Boolean); }
  catch (error) { if (error.code === "ENOENT") return []; throw error; }
}

async function failed(options) {
  try { await runABCPhaseProcess(options); assert.fail("synthetic failure must reject"); }
  catch (error) {
    assert.ok(error.phaseReceipt, error.stack);
    assert.equal(error.phaseReceipt.status, "failed");
    assert.equal(error.phaseReceipt.processGroupClosed, true);
    assert.equal(error.phaseReceipt.h3EvidenceEligible, false);
    return error;
  }
}

test("successful synthetic sequence waits for each asynchronous check and retains profiler diagnostics", async () => {
  const { config, options } = fixture();
  let enter, release;
  const entered = new Promise((resolve) => { enter = resolve; });
  const permission = new Promise((resolve) => { release = resolve; });
  let calls = 0;
  options.checkRowBytes = async (bytes, context) => {
    assert.equal(JSON.parse(bytes).certificate.syntheticOnly, true);
    assert.equal(bytes.at(-1), 10);
    assert.equal(context.signal.aborted, false);
    if (!calls++) { enter(); await permission; }
    return true;
  };
  const running = runABCPhaseProcess(options);
  await entered;
  assert.deepEqual(commands(config), ["0 0"]);
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.deepEqual(commands(config), ["0 0"]);
  release();
  const receipt = await running;
  assert.equal(receipt.status, "process-completed-pending-final-ledger");
  assert.equal(receipt.checkedRows, 2); assert.equal(receipt.observedRows, 2);
  assert.equal(receipt.processGroupClosed, true); assert.equal(receipt.finalLedgerRequired, true);
  assert.equal(receipt.h3EvidenceEligible, false); assert.equal(receipt.diagnosticLines, 2);
  assert.deepEqual(commands(config), ["0 0", "0 1"]);
  assert.equal(receipt.rawRows.completeLines, 2); assert.equal(receipt.rawRows.checkedPrefixUnchanged, true);
  for (const binding of [receipt.rawRows, receipt.stdoutLog, receipt.stderrLog]) {
    const bytes = readFileSync(binding.path);
    assert.equal(binding.bytes, bytes.length);
    assert.equal(binding.sha256, createHash("sha256").update(bytes).digest("hex"));
  }
});

test("independent callback rejection prevents the next command and preserves first raw row", async () => {
  const { config, options } = fixture();
  options.checkRowBytes = async () => false;
  const error = await failed(options);
  assert.match(error.message, /callback rejected/u);
  assert.deepEqual(commands(config), ["0 0"]);
  assert.equal(error.phaseReceipt.rawRows.completeLines, 1);
  assert.equal(error.phaseReceipt.checkedRows, 0);
});

test("adapter first failure preserves its raw certificate and never calls the independent callback", async () => {
  const { config, options } = fixture("failed-row");
  let calls = 0; options.checkRowBytes = async () => { calls++; return true; };
  const error = await failed(options);
  assert.match(error.message, /adapter failed/u); assert.equal(calls, 0);
  assert.deepEqual(commands(config), ["0 0"]);
  assert.equal(error.phaseReceipt.rawRows.completeLines, 1);
});

for (const mode of ["misidentified-event", "misidentified-row", "partial-row", "extra-row", "unknown-event", "malformed-event", "missing-stopped"]) {
  test(`synthetic ${mode} fails closed with raw/log bytes retained`, async () => {
    const { config, options } = fixture(mode);
    const error = await failed(options);
    assert.ok(error.phaseReceipt.stderrLog.bytes > 0);
    if (mode !== "missing-stopped") assert.ok(commands(config).length <= 1);
    if (mode === "extra-row") assert.equal(error.phaseReceipt.rawRows.completeLines, 2);
    if (mode === "partial-row") assert.equal(error.phaseReceipt.rawRows.terminated, false);
  });
}

test("a late unknown event rejects and cleans up without assuming future stderr was already observed", async () => {
  const { config, options } = fixture("late-unknown-event");
  const error = await failed(options);
  assert.match(error.message, /unknown.*event|unexpected.*event/u);
  assert.ok(commands(config).length >= 1 && commands(config).length <= 2);
  assert.ok(error.phaseReceipt.stderrLog.bytes > 0);
});

test("external deadline terminates a child stuck inside a synchronous call", async () => {
  const { config, options } = fixture("hung-call");
  options.limitMs = 180; options.heartbeatMs = 40;
  const error = await failed(options);
  assert.equal(error.phaseReceipt.timedOut, true); assert.ok(error.phaseReceipt.heartbeatCount >= 1);
  assert.deepEqual(commands(config), ["0 0"]);
});

test("deadline aborts a never-resolving asynchronous callback and terminates the owned server", async () => {
  const { config, options } = fixture();
  options.limitMs = 200; options.heartbeatMs = 40;
  let signal;
  options.checkRowBytes = async (_bytes, context) => { signal = context.signal; await new Promise(() => {}); };
  const error = await failed(options);
  assert.equal(error.phaseReceipt.timedOut, true); assert.equal(signal.aborted, true);
  assert.deepEqual(commands(config), ["0 0"]);
  assert.equal(error.phaseReceipt.rawRows.completeLines, 1);
});

test("driver exit with ignored-output descendants escalates scoped group cleanup", async () => {
  const { config, options } = fixture("descendant");
  const error = await failed(options);
  const pid = Number(readFileSync(config.pidFile, "utf8"));
  assert.throws(() => process.kill(pid, 0), (cause) => cause.code === "ESRCH");
  assert.ok(error.phaseReceipt.sigkillRequestedAtSeconds >= error.phaseReceipt.terminationRequestedAtSeconds);
});

test("output reuse and duplicate pair schedules reject before any child starts", async () => {
  const { config, options } = fixture();
  writeFileSync(config.raw, "preserved", { flag: "wx" });
  await assert.rejects(runABCPhaseProcess(options), /already exists/u);
  assert.equal(readFileSync(config.raw, "utf8"), "preserved");
  const other = fixture(); other.options.pairs = [[0, 0], [0, 0]];
  await assert.rejects(runABCPhaseProcess(other.options), /unique/u);
  assert.deepEqual(commands(other.config), []);
});

test("synchronous final-log hashing cannot publish success after the wall deadline", async () => {
  const { options } = fixture();
  options.limitMs = 1000;
  const original = fs.readSync;
  let delayed = false;
  fs.readSync = function (...args) {
    const count = original(...args);
    if (!delayed && Buffer.isBuffer(args[1]) && args[1].subarray(0, count).toString().startsWith("synthetic diagnostic stdout")) {
      delayed = true;
      const until = performance.now() + 1100;
      while (performance.now() < until) { /* Deliberately prevent the timer from firing. */ }
    }
    return count;
  };
  syncBuiltinESMExports();
  let error;
  try { error = await failed(options); }
  finally { fs.readSync = original; syncBuiltinESMExports(); }
  assert.equal(delayed, true);
  assert.equal(error.phaseReceipt.timedOut, true);
  assert.match(error.message, /final evidence hashing/u);
  assert.ok(error.phaseReceipt.elapsedWallSeconds >= 1);
});

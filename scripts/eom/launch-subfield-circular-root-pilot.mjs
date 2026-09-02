// Operational launcher only. Every target waits for an authenticated, validated
// process-group registration before it can start. No mathematical authority is
// supplied by this launcher or its spawn gates.
import { spawn, execFile } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, mkdirSync, openSync, readSync,
  realpathSync, writeFileSync, writeSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const SELF = "scripts/eom/launch-subfield-circular-root-pilot.mjs";
const RUNNER = "scripts/eom/run-subfield-circular-root-pilot.mjs";
const RUNNER_SHA = "63c88911d2b117dfc908d93359c55ee5dcca973e15f4111fa598264a74718b31";
const BASE = ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const SUBFIELD_CIRCULAR_GATE_SOURCE = String.raw`
const cp=require('node:child_process'),net=require('node:net'),crypto=require('node:crypto');
const data=JSON.parse(Buffer.from(process.argv[1],'base64').toString());
let started=false,finished=false,target;
const connection=net.connect({host:'127.0.0.1',port:data.port});
const timeout=setTimeout(()=>{if(!started)process.exit(125)},data.registrationLimitMs);
function cancel(){
 if(finished)return;
 if(started)process.kill(-process.pid,'SIGKILL');else process.exit(125);
}
// This gate is its own registered group leader. It can cancel its CURRENT
// group without looking up any historical PID. Loss of either owned control
// channel fails closed; normal finish marks finished before closing channels.
process.on('disconnect',cancel);
connection.on('error',cancel);
connection.on('close',cancel);
// Do not let a gate leader exit ahead of a target that ignores graceful stop.
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{
 if(started)process.kill(-process.pid,'SIGKILL');else process.exit(125);
});
connection.on('connect',()=>connection.write(JSON.stringify({event:'register',secret:data.secret,pid:process.pid,
 parentPid:process.ppid,command:data.command,args:data.args,gateSha256:data.gateSha256})+'\n'));
let pending='';
connection.on('data',chunk=>{
 pending+=chunk.toString();if(pending.length>65536){cancel();return;}
 while(pending.includes('\n')){
 const end=pending.indexOf('\n');let message;
 try{message=JSON.parse(pending.slice(0,end))}catch{cancel();return;}
 pending=pending.slice(end+1);
 if(message.event==='cancel'&&message.pid===process.pid&&message.secret===data.secret){cancel();return;}
 if(started||message.event!=='start'||message.pid!==process.pid||message.secret!==data.secret){cancel();return;}
 if(!process.connected)process.exit(125);
 started=true;clearTimeout(timeout);
 target=cp.spawn(data.command,data.args,{cwd:data.cwd,env:process.env,detached:false,stdio:['inherit','inherit','inherit']});
 target.once('error',error=>finish(127,null,String(error.message)));
 target.once('exit',(code,signal)=>finish(code,signal));
 connection.write(JSON.stringify({event:'target-started',pid:process.pid,targetPid:target.pid??null})+'\n');
 }
});
function finish(code,signal,error){
 if(finished)return;finished=true;
 const record={event:'measurement',pid:process.pid,code,signal,error,resourceUsage:process.resourceUsage()};
 connection.end(JSON.stringify(record)+'\n',()=>{
   if(process.connected)process.disconnect();
   if(signal){process.kill(process.pid,signal);setTimeout(()=>process.exit(128),50)}else process.exit(code??127);
 });
 setTimeout(()=>process.exit(code??127),2000).unref();
}
`;

export const SUBFIELD_CIRCULAR_ROOT_GUARD_SOURCE = String.raw`
const net=require('node:net');
const data=JSON.parse(Buffer.from(process.argv[1],'base64').toString());
let finished=false,armed=false,pending='';
const connection=net.connect({host:'127.0.0.1',port:data.port});
const timeout=setTimeout(cancel,data.registrationLimitMs);
function cancel(){
 if(finished)return;finished=true;clearTimeout(timeout);
 // The live parent-child relationship proves the stored runner PID has not
 // been reused. Reparenting means that runner is already gone, so no signal is
 // authorized or needed.
 if(process.ppid===data.runnerPid)try{process.kill(-data.runnerPid,'SIGKILL')}catch(error){if(error.code!=='ESRCH')process.exit(126)}
 process.exit(125);
}
// This sidecar remains outside the runner group so it is schedulable when that
// group is stopped. It signals only its still-live parent group, never a
// historical or reparented PID.
process.on('disconnect',cancel);
connection.on('error',cancel);
connection.on('close',cancel);
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,cancel);
connection.on('connect',()=>connection.write(JSON.stringify({event:'register-root-guard',secret:data.secret,
 pid:process.pid,runnerPid:data.runnerPid,sourceSha256:data.sourceSha256})+'\n'));
connection.on('data',chunk=>{
 pending+=chunk.toString();if(pending.length>65536){cancel();return;}
 while(pending.includes('\n')){
  const end=pending.indexOf('\n');let message;
  try{message=JSON.parse(pending.slice(0,end))}catch{cancel();return;}
  pending=pending.slice(end+1);
  if(!armed&&message.event==='armed'&&message.pid===process.pid&&message.runnerPid===data.runnerPid&&message.secret===data.secret){
   armed=true;clearTimeout(timeout);if(process.connected)process.send({event:'root-guard-armed',pid:process.pid,runnerPid:data.runnerPid});continue;
  }
  if(armed&&message.event==='cancel'&&message.pid===process.pid&&message.runnerPid===data.runnerPid&&message.secret===data.secret){cancel();return;}
  cancel();return;
 }
});
`;

export const SUBFIELD_CIRCULAR_BOOTSTRAP_SOURCE = String.raw`
const cp=require('node:child_process'),{registerHooks,syncBuiltinESMExports}=require('node:module');
const{pathToFileURL}=require('node:url'),crypto=require('node:crypto'),path=require('node:path');
const data=JSON.parse(Buffer.from(process.argv[1],'base64').toString());
const originalSpawn=cp.spawn;
const entries=new Map(data.sources.map(record=>[pathToFileURL(path.resolve(data.root,record.path)).href,record]));
for(const record of entries.values())if(crypto.createHash('sha256').update(Buffer.from(record.bytes,'base64')).digest('hex')!==record.sha256)throw Error('bootstrap source differs');
if(crypto.createHash('sha256').update(data.rootGuardSource).digest('hex')!==data.rootGuardSourceSha256)throw Error('root guard source differs');
const rootGuardData={port:data.port,secret:data.secret,runnerPid:process.pid,sourceSha256:data.rootGuardSourceSha256,
 registrationLimitMs:Math.min(10000,data.limitMs)};
const rootGuard=originalSpawn(process.execPath,['-e',data.rootGuardSource,Buffer.from(JSON.stringify(rootGuardData)).toString('base64')],
 {cwd:data.root,detached:true,stdio:['ignore','ignore','ignore','ipc']});
registerHooks({load(url,context,next){const record=entries.get(url);return record?{format:'module',source:Buffer.from(record.bytes,'base64'),shortCircuit:true}:next(url,context)}});
cp.spawn=function(command,args,options){
 if(typeof command!=='string'||!Array.isArray(args)||args.some(value=>typeof value!=='string')||
  options?.detached!==true||!Array.isArray(options.stdio)||options.stdio.length!==3||
  options.stdio.some(value=>!['pipe','ignore','inherit'].includes(value))||options.shell||options.env)throw Error('unreviewed spawn shape');
 const gateData={port:data.port,secret:data.secret,command,args,cwd:options.cwd??data.root,
  gateSha256:data.gateSha256,registrationLimitMs:Math.min(10000,data.limitMs)};
 return originalSpawn(process.execPath,['-e',data.gateSource,Buffer.from(JSON.stringify(gateData)).toString('base64')],
  {...options,stdio:[...options.stdio,'ipc']});
};
syncBuiltinESMExports();
let armed=false;
rootGuard.once('error',()=>process.exit(125));
rootGuard.once('exit',()=>process.exit(125));
rootGuard.once('message',guardMessage=>{
 if(armed||guardMessage?.event!=='root-guard-armed'||guardMessage.runnerPid!==process.pid)process.exit(125);
 armed=true;
 process.once('message',async message=>{
  if(message?.event!=='bootstrap-start'||message.secret!==data.secret)process.exit(125);
  process.argv=[process.execPath,path.resolve(data.root,data.entry),...data.args];
  try{await import(pathToFileURL(process.argv[1]).href);if(process.connected)process.disconnect()}
  catch(error){console.error(error.stack);process.exitCode=1;if(process.connected)process.disconnect()}
 });
 process.send({event:'bootstrap-ready',pid:process.pid,rootGuardPid:rootGuard.pid});
});
setTimeout(()=>{if(process.connected)process.exit(125)},10000).unref();
`;

export function parseOwnedProcessTable(text) {
  return text.split("\n").filter(line => line.trim()).map(line => {
    const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(\S+)\s+(.+)$/u.exec(line);
    requireThat(match, "process identity snapshot could not be parsed");
    return { pid: Number(match[1]), ppid: Number(match[2]), pgid: Number(match[3]),
      started: match[4].replace(/\s+/gu, " "), state: match[5], command: match[6] };
  });
}

export async function processTable() {
  const text = await new Promise((resolve, reject) => execFile("/bin/ps", ["-axo", "pid=,ppid=,pgid=,lstart=,stat=,comm="],
    { encoding: "utf8", timeout: 2000, maxBuffer: 8 * 1024 * 1024, env: { ...process.env, LC_ALL: "C" } },
    (error, stdout) => error ? reject(error) : resolve(stdout)));
  return parseOwnedProcessTable(text);
}

export function descendantRecords(table, rootPid, enrolledGroups = []) {
  const pids = new Set([rootPid]), groups = new Set(enrolledGroups);
  let changed;
  do { changed = false;
    for (const row of table) if (!pids.has(row.pid) && (pids.has(row.ppid) || groups.has(row.pgid))) {
      pids.add(row.pid); changed = true;
    }
  } while (changed);
  return table.filter(row => pids.has(row.pid));
}

export function currentOwnedGroup(table, owner) {
  if (!owner?.identity) return [];
  // Retirement is permanent: a later PID/PGID reuse must never recreate signal
  // authority for a historical group.
  if (owner.retired) return [];
  const identity = owner.identity, rows = table.filter(row => row.pgid === identity.pgid);
  const leader = table.find(row => row.pid === identity.pid), known = owner.knownMembers ?? [identity];
  const retainedKnownRows = rows.filter(row => known.some(old => old.pid === row.pid &&
    old.started === row.started && old.pgid === identity.pgid));
  if (leader && leader.started !== identity.started && retainedKnownRows.length === 0) {
    owner.retired = true;
    return [];
  }
  const moved = leader && leader.started === identity.started && leader.pgid !== identity.pgid;
  const reason = moved ? "original leader moved process group" :
    leader && leader.started !== identity.started ? "original leader birth changed" :
    rows.length && !leader && retainedKnownRows.length === 0 ? "leaderless group has no retained member" : null;
  if (reason) {
    // Retain actual affected rows, with one bounded diagnostic and no owner mutation.
    let bytes = 0, truncated = false, count = 0;
    const copy = row => {
      const result = {};
      for (const key of Object.keys(row)) {
        const value = row[key];
        if (typeof value === "string") {
          result[key] = value.slice(0, 65536);
          if (result[key] !== value) truncated = true;
        } else if (value === null || ["number", "boolean"].includes(typeof value)) result[key] = value;
      }
      const size = Buffer.byteLength(JSON.stringify(result));
      if (count >= 4096 || bytes + size > 900 * 1024) { truncated = true; return null; }
      count++; bytes += size; return result;
    };
    const original = copy(identity), affected = [];
    for (const row of rows) { const saved = copy(row); if (saved) affected.push(saved); else break; }
    const movedLeader = moved ? copy(leader) : null;
    const retained = [];
    for (const row of known) { const saved = copy(row); if (saved) retained.push(saved); else break; }
    throw Object.assign(new Error("ambiguous live process group: " + reason), {
      ambiguousGroup: { reason, owner: { identity: original, retired: Boolean(owner.retired), knownMembers: retained },
        rows: affected, ...(moved ? { movedLeader } : {}), truncated, complete: !truncated }
    });
  }
  if (!rows.length) { owner.retired = true; return []; }
  owner.knownMembers = rows.map(row => ({ ...row })); return rows;
}

function readBound(filename, expected, collect = true) {
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd), digest = createHash("sha256"), chunks = [], buffer = Buffer.allocUnsafe(65536);
    requireThat(before.isFile() && before.size <= (collect ? 128 * 1024 ** 2 : 2 * 1024 ** 3), "bounded regular evidence file required");
    let length = 0;
    for (;;) {
      const count = readSync(fd, buffer, 0, buffer.length, length); if (!count) break;
      length += count; requireThat(length <= before.size, "evidence grew during read");
      digest.update(buffer.subarray(0, count)); if (collect) chunks.push(Buffer.from(buffer.subarray(0, count)));
    }
    const after = fstatSync(fd), hash = digest.digest("hex");
    requireThat(length === before.size && after.size === before.size && after.mtimeMs === before.mtimeMs &&
      after.ctimeMs === before.ctimeMs && (!expected || expected === hash), "evidence changed or hash differs");
    return { path: filename, sha256: hash, bytes: length, ...(collect ? { data: Buffer.concat(chunks) } : {}) };
  } finally { closeSync(fd); }
}

function writeJSON(filename, value) { writeFileSync(filename, JSON.stringify(value) + "\n", { flag: "wx" }); }

export function classifyPilotGateRoles(pilot, gates) {
  const phaseNames = ["history-manifest.json", "history-conformance.json", "rows.ndjson", "phase-ledger.json"];
  const roles = gates.map(gate => {
    const args = gate.requestedArgs;
    requireThat(Array.isArray(args) && args.filter(value => value === "--out").length === 1, "gate needs one exact output role");
    const output = args[args.indexOf("--out") + 1];
    requireThat(typeof output === "string" && path.isAbsolute(output), "gate output must be an absolute phase or summary path");
    if (output === pilot.summary.path) {
      requireThat(args.filter(value => value === "--scope").length === 1 && args[args.indexOf("--scope") + 1] === "pilot",
        "shared summary gate scope differs");
      return { gate, role: "shared-pilot-summary" };
    }
    const phase = pilot.phases.find(item => path.dirname(output) === item.directory);
    requireThat(phase && phaseNames.includes(path.basename(output)), "gate does not own a declared phase output");
    return { gate, candidateId: phase.candidateId, phase: phase.phase, role: path.basename(output) };
  });
  requireThat(roles.filter(item => item.role === "shared-pilot-summary").length === 1, "one shared summary gate required");
  for (const phase of pilot.phases) {
    const names = roles.filter(item => item.candidateId === phase.candidateId && item.phase === phase.phase).map(item => item.role).sort();
    requireThat(JSON.stringify(names) === JSON.stringify([...phaseNames].sort()), "phase gate role census differs");
  }
  return roles;
}

// Runs in a worker during final admission so parsing/hashing cannot block the
// outer process watchdog. The caller also checks the deadline after it returns.
export async function outerAdmissionOperation(job) {
  const output = job.pilotOutput;
  requireThat(!existsSync(path.join(output, "terminal-rejection.json")), "runner final output was rejected");
  const terminal = readBound(path.join(output, "terminal.json"));
  const operation = readBound(path.join(output, "pilot-process.json"));
  const t = JSON.parse(terminal.data), p = JSON.parse(operation.data);
  requireThat(t.schema === "braid-program/subfield-circular-serial-pilot-terminal.v1" && t.accepted === true &&
    t.h3EvidenceEligible === false && t.admission === "await-external-post-write-deadline-check" &&
    t.operationalReceiptPath === operation.path && t.elapsedWallSeconds < 1800, "runner terminal is not admissible");
  requireThat(p.schema === "braid-program/subfield-circular-serial-cost-pilot.v1" && p.accepted === true &&
    p.status === "serial-pilot-accepted-pending-resource-review" && p.h3EvidenceEligible === false &&
    p.rootExecutionAuthorized === false && p.laterLadderAuthorized === false && p.workerCount === 1 &&
    p.phases?.length === 32 && p.candidates?.length === 16 && p.elapsedWallSeconds < 1800,
    "runner operational census or authority differs");
  requireThat(p.sourceBindings.some(record => record.path === RUNNER && record.sha256 === job.runnerSha256), "runner generation differs");
  const runnerBytes = Buffer.from(job.runnerBytes);
  requireThat(sha(runnerBytes) === job.runnerSha256, "captured admission runner differs");
  const runner = await import("data:text/javascript;base64," + runnerBytes.toString("base64"));
  const summary = readBound(p.summary.path, p.summary.sha256);
  runner.validatePilotSummary(JSON.parse(summary.data), p.phaseReceipts);
  const records = [...p.sourceBindings.map(record => ({ ...record, path: path.resolve(job.root, record.path) })),
    ...p.runtimeBindings, p.buildReceipt, ...p.phaseReceipts,
    ...p.phases.flatMap(phase => [phase.historyManifest, phase.conformance, phase.phaseReceipt, phase.operationalReceipt,
      phase.process.rawRows, phase.process.stdoutLog, phase.process.stderrLog]),
    ...p.stages.map(stage => stage.log)];
  for (const record of records) readBound(path.resolve(job.root, record.path), record.sha256, false);
  requireThat(p.phases.every(phase => phase.status === "phase-ledger-accepted" && phase.process.processGroupClosed === true) &&
    p.candidates.every(candidate => candidate.resources.complete === true && candidate.laterLadderAuthorized === false), "pilot has incomplete phases/resources");
  const gateRoles = classifyPilotGateRoles(p, job.gates);
  const candidateGateCosts = p.candidates.map(candidate => {
    const gates = gateRoles.filter(item => item.candidateId === candidate.candidateId).map(item => item.gate);
    requireThat(gates.length === 8, "candidate does not own exactly eight measured preparation/root/ledger gates");
    return { candidateId: candidate.candidateId, gateCount: gates.length,
      gateUserSeconds: gates.reduce((sum, gate) => sum + gate.measurement.resourceUsage.userCPUTime / 1e6, 0),
      gateSystemSeconds: gates.reduce((sum, gate) => sum + gate.measurement.resourceUsage.systemCPUTime / 1e6, 0),
      maximumGateResidentBytes: Math.max(0, ...gates.map(gate => gate.measurement.resourceUsage.maxRSS * 1024)),
      runnerMeasuredCPUSeconds: candidate.resources.totalMeasuredCPUSeconds,
      notAggregateSimultaneousMemory: true };
  });
  for (const candidate of candidateGateCosts) candidate.totalMeasuredCPUIncludingGates = candidate.runnerMeasuredCPUSeconds + candidate.gateUserSeconds + candidate.gateSystemSeconds;
  const compact = value => { const { data, ...record } = value; return record; };
  return { accepted: true, h3EvidenceEligible: false, terminal: compact(terminal), operation: compact(operation), summary: compact(summary),
    checkedEvidenceBindings: records.length, candidateGateCosts, gatePhaseAssignment: "exact --out phase role; --scope pilot shared summary output excluded from candidate totals" };
}

export async function outerWorkerOperation(job) {
  if (job.kind === "failure-publication") {
    const filename = path.join(job.output, "outer-failure.json");
    writeJSON(filename, { ...job.receipt, accepted: false, h3EvidenceEligible: false,
      publicationScope: "failure-preservation-after-scientific-clock; never-acceptance" });
    return { accepted: false, h3EvidenceEligible: false, receipt: readBound(filename, undefined, false) };
  }
  if (job.kind !== "publication") return outerAdmissionOperation(job);
  const receipt = job.receipt;
  for (const record of [receipt.stdoutLog, receipt.stderrLog, ...job.sources]) readBound(record.path, record.sha256, false);
  requireThat(process.hrtime.bigint() < BigInt(job.deadlineNanoseconds), "outer publication deadline already reached");
  const filename = path.join(job.output, "outer-admission.json");
  writeJSON(filename, receipt);
  const result = readBound(filename, undefined, false);
  if (process.hrtime.bigint() >= BigInt(job.deadlineNanoseconds)) {
    writeJSON(path.join(job.output, "outer-rejection.json"), { accepted: false, h3EvidenceEligible: false,
      failure: "outer evidence hashing/publication exceeded deadline", invalidates: result.sha256 });
    return { accepted: false, h3EvidenceEligible: false, receipt: result };
  }
  return { accepted: receipt.accepted === true, h3EvidenceEligible: false, receipt: result };
}

async function runAdmissionWorker(job, sourceBytes, limitMs, signal) {
  const worker = new Worker(`const{parentPort,workerData}=require('node:worker_threads');
    (async()=>{const m=await import('data:text/javascript;base64,'+Buffer.from(workerData.bytes).toString('base64'));
      parentPort.postMessage({value:await m.outerWorkerOperation(workerData.job)});})().catch(error=>parentPort.postMessage({failure:String(error.message)}));`,
  { eval: true, execArgv: [], workerData: { bytes: sourceBytes, job } });
  let timer, listener;
  try { return await new Promise((resolve, reject) => {
    listener = () => reject(signal.reason ?? new Error("outer admission interrupted"));
    signal.addEventListener("abort", listener, { once: true }); if (signal.aborted) listener();
    timer = setTimeout(() => reject(new Error("outer admission deadline exceeded")), limitMs);
    worker.once("message", message => message.failure ? reject(new Error(message.failure)) : resolve(message.value));
    worker.once("error", reject); worker.once("exit", code => reject(new Error(`admission worker exited without result (${code})`)));
  }); } finally { await worker.terminate(); clearTimeout(timer); signal.removeEventListener("abort", listener); }
}

export async function superviseRegisteredPilot({ root, entry, args, sources, output, limitMs = 1800000,
  heartbeatMs = 15000, graceMs = 5000, admit = async () => ({ accepted: false }), startedAtMs = performance.now(),
  inspectProcesses = processTable }) {
  const entryAtMs = performance.now(), reserveMs = 15000;
  requireThat(path.isAbsolute(root) && path.isAbsolute(output) && Number.isSafeInteger(limitMs) &&
    limitMs > reserveMs && limitMs <= 1800000 && Number.isFinite(startedAtMs) && startedAtMs >= 0 &&
    startedAtMs <= entryAtMs && Number.isFinite(heartbeatMs) && heartbeatMs > 0 && heartbeatMs <= limitMs &&
    Number.isFinite(graceMs) && graceMs > 0, "absolute roots and valid original supervision limits required");
  requireThat(typeof inspectProcesses === "function" && inspectProcesses !== processTable,
    "explicit independently reviewed and accounted process inspection required");
  const began = startedAtMs, completionEnd = began + limitMs, workEnd = completionEnd - reserveMs;
  requireThat(Number.isFinite(completionEnd) && entryAtMs < workEnd, "original work allowance exhausted before startup");
  const elapsed = () => performance.now() - began;
  const abort = new AbortController(), secret = randomBytes(32).toString("hex");
  const connections = new Set(), enrolled = new Map(), gateChannels = new Map(), jobs = new Set(), waits = new Set();
  const known = new Map(), signalEvents = [], descriptorCloseAttempts = new Set();
  const receipt = { schema: "braid-program/subfield-circular-pilot-outer-process.v1", accepted: false, h3EvidenceEligible: false,
    authority: "registered-process-supervision-and-external-terminal-admission-only", startedAt: new Date().toISOString(),
    limitMs, scope: "direct-superviseRegisteredPilot-only; caller preparation/publication not guarded",
    budget: { startedAtMs: began, entryAtMs, workEndMs: workEnd, completionEndMs: completionEnd, reserveMs },
    inspectionAuthority: "explicit callback; its bounded probe lifetime and complete resource accounting require external review",
    spawnPlumbing: "captured-owned-bootstrap-intercepts-spawn; registered-gate-launches-original-command-in-owned-group",
    bootstrapSha256: sha(SUBFIELD_CIRCULAR_BOOTSTRAP_SOURCE), gateSha256: sha(SUBFIELD_CIRCULAR_GATE_SOURCE),
    rootGuardSha256: sha(SUBFIELD_CIRCULAR_ROOT_GUARD_SOURCE),
    gates: [], snapshots: [], signals: signalEvents, processesClosed: false,
    autonomousGateCancellation: "immutable self-owned target and runner-group behavior; no new reaction-time guarantee" };
  let child, rootIdentity, rootOwner, rootClosed, rootDidClose = false, runnerStartMs;
  let rootGuardRecord, rootGuardChannel, selfOwnedCancellationAttempted = false;
  let failure, stopPromise, heartbeat, guard, guardReady = false, guardExitObserved = false, guardTerminating = false;
  let guardExit, outFD, errFD, outCount = 0, errCount = 0, outDropped = 0, errDropped = 0;
  let snapshotBytes = 0, lastRows = [], serverClosed = false;
  const outHash = createHash("sha256"), errHash = createHash("sha256"), server = net.createServer();
  const owners = () => [rootOwner, ...enrolled.values()].filter(Boolean);
  const clock = (cleanup = false) => {
    requireThat(performance.now() < (cleanup ? completionEnd : workEnd),
      cleanup ? "original completion deadline exhausted" : "original work deadline exhausted");
    if (!cleanup) requireThat(!failure && !abort.signal.aborted, failure?.message ?? "outer interrupted");
  };
  const remaining = (cleanup = false, maximum = Infinity) => {
    clock(cleanup); const ms = Math.floor(Math.min(maximum, (cleanup ? completionEnd : workEnd) - performance.now()));
    requireThat(ms > 0, "insufficient original remainder"); return ms;
  };
  const fail = error => {
    if (error?.ambiguousGroup && !receipt.firstOwnershipFailure) {
      let evidence = JSON.stringify(error.ambiguousGroup);
      if (Buffer.byteLength(evidence) > 950 * 1024) evidence = JSON.stringify({ complete: false,
        truncated: true, rows: [], reason: "ownership diagnostic exceeded bound" });
      receipt.firstOwnershipFailure = { elapsedMilliseconds: elapsed(), afterAbort: abort.signal.aborted,
        evidence: JSON.parse(evidence) };
      receipt.processesClosed = false; // Ambiguity is unresolved for this entire attempt.
      if (!receipt.firstOwnershipFailure.evidence.complete) receipt.evidenceIncomplete = true;
    }
    if (!failure) {
      failure = error instanceof Error ? error : new Error(String(error));
      // The affected-group diagnostic is already bounded by currentOwnedGroup.
      const evidence = failure.ambiguousGroup ?? { rows: lastRows,
        complete: !receipt.evidenceIncomplete, truncated: Boolean(receipt.evidenceIncomplete) };
      let encoded = JSON.stringify(evidence);
      if (Buffer.byteLength(encoded) > 950 * 1024) encoded = JSON.stringify({ complete: false, truncated: true,
        rows: [], reason: "first-failure evidence exceeds one MiB" });
      receipt.firstFailure = { message: String(failure.message).slice(0, 4096), elapsedMilliseconds: elapsed(),
        afterAbort: abort.signal.aborted, evidence: JSON.parse(encoded) };
      if (!receipt.firstFailure.evidence.complete) receipt.evidenceIncomplete = true;
      abort.abort(failure);
    }
  };
  const bounded = async (start, label, cleanup = false, maximum = Infinity) => {
    const ms = remaining(cleanup, maximum);
    let timer, interrupted, settled = false;
    const pending = Promise.resolve().then(() => { clock(cleanup); return start(); });
    waits.add(pending);
    pending.then(() => { settled = true; waits.delete(pending); }, () => { settled = true; waits.delete(pending); });
    try {
      const result = await Promise.race([pending, new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(label + " exceeded original allowance")), ms);
        if (!cleanup) {
          interrupted = () => reject(failure ?? new Error(label + " interrupted"));
          abort.signal.addEventListener("abort", interrupted, { once: true });
          if (abort.signal.aborted) interrupted();
        }
      })]);
      clock(cleanup); return result;
    } finally {
      clearTimeout(timer); if (interrupted) abort.signal.removeEventListener("abort", interrupted);
      if (!settled) receipt.pendingCallbackObserved = true;
    }
  };
  const pause = (cleanup, maximum = 25) => bounded(() => delay(Math.min(maximum, remaining(cleanup))), "poll wait", cleanup, maximum + 1);
  const inspect = async cleanup => {
    const table = await bounded(() => inspectProcesses({ remainingMs: remaining(cleanup),
      originalDeadlineMs: completionEnd, workDeadlineMs: workEnd, cleanup }), "process inspection", cleanup);
    requireThat(Array.isArray(table) && table.length <= 65536, "bounded complete process table required");
    requireThat(Buffer.byteLength(JSON.stringify(table)) <= 8 * 1024 * 1024, "process table byte bound exceeded");
    clock(cleanup); return table;
  };
  const remember = (reason, rows) => {
    const boundedRows = [], cap = 900 * 1024; let bytes = 0, truncated = false;
    for (const row of rows) {
      if (boundedRows.length >= 4096) { truncated = true; break; }
      const value = {};
      for (const key of Object.keys(row)) if (typeof row[key] === "string") {
        value[key] = row[key].slice(0, 65536); if (value[key] !== row[key]) truncated = true;
      } else if (row[key] === null || ["number", "boolean"].includes(typeof row[key])) value[key] = row[key];
      const n = Buffer.byteLength(JSON.stringify(value));
      if (bytes + n > cap) { truncated = true; break; }
      bytes += n; boundedRows.push(value);
    }
    lastRows = boundedRows;
    const item = { reason, elapsedMilliseconds: elapsed(), processes: boundedRows, complete: !truncated, truncated };
    const n = Buffer.byteLength(JSON.stringify(item));
    if (receipt.snapshots.length < 4096 && snapshotBytes + n <= 8 * 1024 * 1024) {
      receipt.snapshots.push(item); snapshotBytes += n;
    } else truncated = true;
    if (truncated) { receipt.evidenceIncomplete = true; throw new Error("bounded ownership evidence is incomplete"); }
  };
  const ownedRows = table => {
    const active = owners().flatMap(owner => currentOwnedGroup(table, owner));
    const retained = [];
    // Do not lose an already witnessed orphan merely because it moved groups.
    for (const old of known.values()) {
      const now = table.find(row => row.pid === old.pid);
      if (now && (now.started !== old.started || now.pgid !== old.pgid)) {
        throw Object.assign(new Error("retained descendant birth/group changed"), {
          ambiguousGroup: { owner: { identity: old }, rows: [now], complete: true, truncated: false }
        });
      }
      if (now) retained.push(now);
    }
    const rooted = descendantRecords(table, rootOwner && !rootOwner.retired ? child.pid : -1,
      [...new Set(active.map(row => row.pgid))]);
    // Exact retained birth/group matches remain closure witnesses after reparenting.
    // Seed only their PIDs, never their entire unvalidated groups; signaling still
    // requires a separately authenticated owner and a fresh group inspection.
    const included = new Set([...rooted, ...retained].map(row => row.pid));
    let added;
    do {
      added = false;
      for (const row of table) if (!included.has(row.pid) && included.has(row.ppid)) {
        included.add(row.pid); added = true;
      }
    } while (added);
    const rows = table.filter(row => included.has(row.pid));
    for (const row of rows) {
      requireThat(known.size < 4096 || known.has(row.pid), "retained ownership census exceeds bound");
      known.set(row.pid, { pid: row.pid, ppid: row.ppid, pgid: row.pgid, started: row.started });
    }
    return rows;
  };
  const register = job => {
    jobs.add(job); job.catch(fail).finally(() => jobs.delete(job));
    if (jobs.size > 4096) fail(new Error("pending registration/stdio job bound exceeded"));
  };
  const writeChannel = (connection, message, cleanup, owner) => bounded(async () => {
    if (owner) {
      const table = await inspect(true), rows = currentOwnedGroup(table, owner);
      remember("fresh-before-gate-cancel", rows); if (!rows.length) return;
    }
    // No asynchronous boundary remains between ownership, deadline and write.
    return new Promise((resolve, reject) => {
      clock(cleanup); requireThat(!connection.destroyed && connection.writable, "owned gate channel unavailable");
      connection.write(JSON.stringify(message) + "\n", error => error ? reject(error) : resolve());
    });
  }, "gate channel callback", cleanup);
  const signalGroup = async (owner, signal) => {
    const table = await inspect(true);
    const rows = currentOwnedGroup(table, owner); remember("fresh-before-" + signal, rows);
    if (!rows.length) return;
    const pgid = owner.identity.pgid;
    requireThat(Number.isSafeInteger(pgid) && pgid > 1 && owners().includes(owner), "unowned process group signal refused");
    clock(true);
    try { process.kill(-pgid, signal); } catch (error) { if (error.code !== "ESRCH") throw error; }
    clock(true);
    requireThat(signalEvents.length < 4096, "signal evidence bound exceeded");
    signalEvents.push({ pgid, signal, original: { pid: owner.identity.pid, pgid: owner.identity.pgid,
      started: owner.identity.started }, elapsedMilliseconds: elapsed() });
  };
  const cancelSelfOwnedChannels = async () => {
    selfOwnedCancellationAttempted = true;
    if (rootGuardRecord?.acknowledged && rootGuardChannel && !rootGuardChannel.destroyed && rootGuardChannel.writable) {
      await writeChannel(rootGuardChannel, { event: "cancel", pid: rootGuardRecord.identity.pid,
        runnerPid: child.pid, secret }, true);
      rootGuardRecord.selfGroupCancellationRequested = true;
    }
    for (const [gate, connection] of gateChannels) {
      if (!gate.acknowledged || connection.destroyed || !connection.writable) continue;
      // The live authenticated channel commands a gate that is itself a member
      // of the group it cancels. No historical PID becomes signal authority.
      await writeChannel(connection, { event: "cancel", pid: gate.identity.pid, secret }, true);
      gate.selfGroupCancellationRequested = true;
    }
  };
  const observeCancellationPids = async () => {
    const pids = [...new Set([child?.pid, rootGuardRecord?.identity?.pid,
      ...receipt.gates.flatMap(gate => [gate.identity?.pid, gate.target?.pid])].filter(Number.isSafeInteger))];
    const present = () => pids.filter(pid => {
      try { process.kill(pid, 0); return true; }
      catch (error) { if (error.code === "ESRCH") return false; throw error; }
    });
    const until = Math.min(completionEnd, performance.now() + 2000);
    let remainingPids = present();
    while (remainingPids.length && performance.now() < until) {
      await pause(true, Math.min(25, Math.max(1, until - performance.now())));
      remainingPids = present();
    }
    receipt.cancellationObservedPidsAbsent = remainingPids.length === 0;
    receipt.cancellationPidObservationAuthority = "recorded-PID absence only; not a complete process-table census and never acceptance";
    if (remainingPids.length) receipt.cancellationUnverifiedPids = remainingPids;
  };
  const stop = () => stopPromise ??= (async () => {
    if (!child?.pid) { receipt.processesClosed = !receipt.firstOwnershipFailure && (!child || rootDidClose); return; }
    try {
      let table = await inspect(true);
      // No unobserved historical PID is promoted into signal authority during failure.
      requireThat(rootOwner || rootDidClose && !table.some(row => row.pid === child.pid), "runner birth was never authenticated");
      for (let pass = 0, previous = ""; pass < 8; pass++) {
        const rows = ownedRows(table); remember("cleanup-owned-tree", rows);
        for (const row of rows) if (row.pid !== rootGuardRecord?.identity?.pid &&
          !owners().some(owner => owner.identity.pgid === row.pgid)) {
          const leader = rows.find(item => item.pid === row.pgid && item.pgid === row.pgid);
          requireThat(leader, "unregistered descendant group leader cannot be authenticated");
          enrolled.set(leader.pgid, { identity: { ...leader }, knownMembers: rows.filter(item => item.pgid === leader.pgid), cleanupOnly: true });
        }
        for (const owner of owners()) await signalGroup(owner, "SIGSTOP");
        const signature = rows.map(row => row.pid + ":" + row.started + ":" + row.pgid).sort().join("|");
        if (signature === previous) break;
        requireThat(pass < 7, "owned descendant capture did not stabilize");
        previous = signature; table = await inspect(true);
      }
      for (const owner of owners()) {
        await signalGroup(owner, "SIGTERM");
        await signalGroup(owner, "SIGCONT");
      }
      const graceEnd = Math.min(completionEnd, performance.now() + graceMs);
      for (;;) {
        table = await inspect(true); const rows = ownedRows(table); remember("cleanup-census", rows);
        if (!rows.length && rootDidClose) { receipt.processesClosed = !receipt.firstOwnershipFailure; return; }
        if (performance.now() >= graceEnd) break;
        await pause(true, Math.min(25, remaining(true), Math.max(1, graceEnd - performance.now())));
      }
      for (const owner of owners()) await signalGroup(owner, "SIGKILL");
      const killEnd = Math.min(completionEnd, performance.now() + 2000);
      for (;;) {
        table = await inspect(true); const rows = ownedRows(table); remember("post-kill-census", rows);
        if (!rows.length && rootDidClose) { receipt.processesClosed = !receipt.firstOwnershipFailure; return; }
        requireThat(performance.now() < killEnd, "owned processes remained after bounded SIGKILL wait");
        await pause(true, Math.min(25, Math.max(1, killEnd - performance.now())));
      }
    } catch (error) {
      fail(error); receipt.cleanupFailure = String(error.message).slice(0, 4096); receipt.processesClosed = false;
      // Inspection failure never authorizes child.kill, a frozen group or a stale PID fallback.
      // Authenticated live sidecars may still cancel their own current groups.
      try { await cancelSelfOwnedChannels(); } catch (cause) { receipt.cancellationFailure = String(cause.message).slice(0, 4096); }
      throw error;
    }
  })();
  const onSignal = () => fail(new Error("outer operator interruption or original work deadline"));
  process.on("SIGINT", onSignal); process.on("SIGTERM", onSignal);
  const GUARD_SOURCE = String.raw`
const{parentPort,workerData}=require('node:worker_threads');
const self=process.pid,work=BigInt(workerData.work),end=BigInt(workerData.end);
let termSent=false;
function arm(){
 const now=process.hrtime.bigint();
 if(now>=end){process.kill(self,'SIGKILL');return;}
 if(now>=work&&!termSent){termSent=true;process.kill(self,'SIGTERM');}
 const next=termSent?end:work,remaining=next-process.hrtime.bigint();
 if(remaining<=0n){setImmediate(arm);return;}
 const milliseconds=Number(remaining/1000000n);
 if(milliseconds>0)setTimeout(arm,milliseconds);else setImmediate(arm);
}
if(work>=end||process.hrtime.bigint()>=work)throw Error('guard started after original work boundary');
arm();parentPort.postMessage({event:'ready',self,work:String(work),end:String(end)});
`;
  const closeGuard = async cleanup => {
    requireThat(!receipt.firstOwnershipFailure, "ownership ambiguity remains unresolved for this attempt");
    if (cleanup && !child && (!guard || guardExitObserved)) {
      clock(true); receipt.guard ??= { ready: false, neverCreated: true };
      receipt.guard.closed = true; return;
    }
    requireThat(guard && (guardReady || cleanup && !child) && !guardExitObserved, "guard readiness/lifetime incomplete");
    clock(cleanup);
    await bounded(() => { clock(cleanup); guardTerminating = true; return guard.terminate(); },
      "deadline guard termination", cleanup);
    await bounded(() => guardExit, "deadline guard exit", cleanup);
    requireThat(guardExitObserved, "deadline guard exit unobserved"); clock(cleanup);
    receipt.guard.closed = true;
  };
  server.on("error", fail);
  server.on("connection", connection => {
    connections.add(connection); let pending = "", gate, channelRole;
    if (connections.size > 4096) { fail(new Error("gate channel count exceeds bound")); connection.destroy(); return; }
    connection.on("close", () => connections.delete(connection));
    connection.on("error", fail);
    connection.on("data", chunk => {
      try {
        clock(); pending += chunk.toString();
        requireThat(pending.length <= 1024 * 1024, "gate message exceeds bound");
        while (pending.includes("\n")) {
          clock(); const end = pending.indexOf("\n"), message = JSON.parse(pending.slice(0, end));
          pending = pending.slice(end + 1);
          if (!gate && !channelRole) {
            if (message.event === "register-root-guard") {
              requireThat(message.secret === secret && message.sourceSha256 === receipt.rootGuardSha256 &&
                message.runnerPid === child?.pid && Number.isSafeInteger(message.pid) && !rootGuardRecord,
                "invalid root guard registration");
              channelRole = "root-guard";
              rootGuardRecord = { identity: null, acknowledged: false,
                actualCommand: process.execPath, actualSourceSha256: receipt.rootGuardSha256,
                registeredAtMilliseconds: elapsed() };
              rootGuardChannel = connection; receipt.rootGuard = rootGuardRecord;
              register((async () => {
                const table = await inspect(false), runner = table.find(item => item.pid === child.pid),
                  sidecar = table.find(item => item.pid === message.pid);
                requireThat(runner && runner.ppid === process.pid && runner.pgid === child.pid &&
                  sidecar && sidecar.ppid === child.pid && sidecar.pgid === sidecar.pid,
                  "root guard does not own a live side group for the runner");
                rootIdentity = { ...runner }; rootOwner = { identity: rootIdentity,
                  knownMembers: [{ ...runner }] };
                receipt.runner = rootIdentity; rootGuardRecord.identity = { ...sidecar };
                remember("registered-root-guard", [runner, sidecar]); clock();
                rootGuardRecord.acknowledged = true;
                await writeChannel(connection, { event: "armed", pid: sidecar.pid,
                  runnerPid: runner.pid, secret }, false);
              })());
              continue;
            }
            requireThat(message.event === "register" && message.secret === secret &&
              message.gateSha256 === receipt.gateSha256 && message.parentPid === child?.pid &&
              Number.isSafeInteger(message.pid) && !enrolled.has(message.pid), "invalid child gate registration");
            channelRole = "target-gate";
            requireThat(receipt.gates.length < 4096, "gate census exceeds bound");
            gate = { identity: null, requestedCommand: message.command, requestedArgs: message.args,
              actualGateCommand: process.execPath, actualGateSourceSha256: receipt.gateSha256,
              registeredAtMilliseconds: elapsed(), runnerElapsedAtRegistration: (performance.now() - runnerStartMs) / 1000,
              acknowledged: false };
            gateChannels.set(gate, connection);
            register((async () => {
              const table = await inspect(false), row = table.find(item => item.pid === message.pid);
              requireThat(row && row.ppid === child.pid && row.pgid === row.pid && rootOwner &&
                currentOwnedGroup(table, rootOwner).some(item => item.pid === rootIdentity.pid), "gate process identity is not an owned live child");
              for (const owner of enrolled.values()) currentOwnedGroup(table, owner);
              gate.identity = { ...row }; gate.knownMembers = [{ ...row }]; enrolled.set(row.pgid, gate);
              receipt.gates.push(gate); remember("registered-gate", [row]); clock();
              gate.acknowledged = true;
              await writeChannel(connection, { event: "start", pid: row.pid, secret }, false);
            })());
          } else if (channelRole === "target-gate") {
            requireThat(message.pid === gate.identity?.pid && gate.acknowledged, "unacknowledged gate event");
            if (message.event === "target-started" && !gate.target) gate.target = { pid: message.targetPid };
            else if (message.event === "measurement" && !gate.measurement) {
              const usage = message.resourceUsage;
              requireThat(usage && [usage.userCPUTime, usage.systemCPUTime, usage.maxRSS].every(value =>
                Number.isSafeInteger(value) && value >= 0), "gate resource measurement malformed");
              gate.measurement = message;
            } else throw new Error("unknown or repeated gate event");
          } else throw new Error("unknown or repeated root guard event");
        }
        clock();
      } catch (error) { fail(error); }
    });
  });
  try {
    clock();
    const bridgeNs = process.hrtime.bigint(), bridgeMs = performance.now();
    const workNs = bridgeNs + BigInt(Math.floor((workEnd - bridgeMs) * 1e6));
    const endNs = bridgeNs + BigInt(Math.floor((completionEnd - bridgeMs) * 1e6));
    clock();
    receipt.guard = { sourceSha256: sha(GUARD_SOURCE), bridgeNanoseconds: String(bridgeNs),
      bridgeMilliseconds: bridgeMs, workDeadlineNanoseconds: String(workNs),
      completionDeadlineNanoseconds: String(endNs), ready: false, closed: false,
      schedulingBoundary: "independently schedulable worker and OS; no suspension/uninterruptible-OS guarantee" };
    guard = new Worker(GUARD_SOURCE, { eval: true, execArgv: [], workerData: { work: String(workNs), end: String(endNs) } });
    guardExit = new Promise(resolve => guard.once("exit", code => {
      guardExitObserved = true; receipt.guard.exitCode = code; resolve(code);
      if (!guardTerminating) {
        fail(new Error("deadline guard exited prematurely"));
        // A failed guard cannot protect future parent cleanup. Exit this owner only;
        // immutable IPC loss may cancel gates later, but descendants remain unresolved.
        if (guardReady) process.exit(125);
      }
    }));
    await bounded(() => new Promise((resolve, reject) => {
      guard.once("error", error => { fail(error); reject(error); });
      guard.once("message", message => {
        try {
          clock(); requireThat(message?.event === "ready" && message.self === process.pid &&
            message.work === String(workNs) && message.end === String(endNs), "deadline guard readiness differs");
          guardReady = true; receipt.guard.ready = true; resolve();
        } catch (error) { reject(error); }
      });
      guardExit.then(() => { if (!guardReady) reject(new Error("deadline guard exited before readiness")); });
    }), "deadline guard readiness");
    requireThat(!existsSync(output), "outer output already exists"); clock();
    mkdirSync(path.dirname(output), { recursive: true }); clock(); mkdirSync(output); clock();
    receipt.outputReserved = true;
    outFD = openSync(path.join(output, "runner-stdout.log"), "wx"); clock();
    errFD = openSync(path.join(output, "runner-stderr.log"), "wx"); clock();
    await inspect(false);
    await bounded(() => new Promise((resolve, reject) => {
      server.once("error", reject); server.listen(0, "127.0.0.1", resolve);
    }), "registration server startup");
    const port = server.address().port;
    heartbeat = setInterval(() => {
      try {
        clock(Boolean(failure));
        const text = JSON.stringify({ schema: "braid-program/subfield-circular-pilot-outer-heartbeat.v1", pid: child?.pid,
          elapsedWallSeconds: elapsed() / 1000, registeredGates: receipt.gates.length,
          stdoutBytes: outCount, stderrBytes: errCount, stopping: Boolean(failure), h3EvidenceEligible: false }) + "\n";
        register(bounded(() => new Promise((resolve, reject) => process.stderr.write(text,
          error => error ? reject(error) : resolve())), "heartbeat stdio callback", Boolean(failure)));
      } catch (error) { fail(error); }
    }, heartbeatMs);
    const data = { root, entry, args, sources: sources.map(record => ({ ...record,
      bytes: Buffer.from(record.bytes).toString("base64") })), port, secret, gateSource: SUBFIELD_CIRCULAR_GATE_SOURCE,
      gateSha256: receipt.gateSha256, rootGuardSource: SUBFIELD_CIRCULAR_ROOT_GUARD_SOURCE,
      rootGuardSourceSha256: receipt.rootGuardSha256, limitMs };
    clock(); requireThat(guardReady && !guardExitObserved, "deadline guard unavailable before target launch");
    child = spawn(process.execPath, ["-e", SUBFIELD_CIRCULAR_BOOTSTRAP_SOURCE, Buffer.from(JSON.stringify(data)).toString("base64")],
      { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe", "ipc"] });
    const consume = (fd, digest, kind) => chunk => {
      let offset = 0;
      try {
        clock(Boolean(failure));
        requireThat((kind === "stdout" ? outCount : errCount) + chunk.length <= 128 * 1024 ** 2, "outer log exceeds resource bound");
        while (offset < chunk.length) {
          clock(Boolean(failure)); const count = writeSync(fd, chunk, offset);
          requireThat(count > 0, "outer log write made no progress");
          digest.update(chunk.subarray(offset, offset + count)); offset += count;
          if (kind === "stdout") outCount += count; else errCount += count;
          clock(Boolean(failure));
        }
      } catch (error) {
        if (kind === "stdout") outDropped += chunk.length - offset; else errDropped += chunk.length - offset;
        fail(error); (kind === "stdout" ? child.stdout : child.stderr).destroy();
      }
    };
    child.stdout.on("data", consume(outFD, outHash, "stdout")); child.stderr.on("data", consume(errFD, errHash, "stderr"));
    rootClosed = new Promise(resolve => {
      child.once("error", fail);
      child.once("close", (code, signal) => { rootDidClose = true; receipt.exit = { code, signal }; resolve(receipt.exit); });
    });
    child.once("message", message => register((async () => {
      clock(); requireThat(message?.event === "bootstrap-ready" && message.pid === child.pid &&
        message.rootGuardPid === rootGuardRecord?.identity?.pid && rootGuardRecord.acknowledged && rootOwner,
        "bootstrap/root guard identity differs");
      const table = await inspect(false), row = table.find(item => item.pid === child.pid);
      const sidecar = table.find(item => item.pid === rootGuardRecord.identity.pid);
      requireThat(row && row.ppid === process.pid && row.pgid === child.pid &&
        sidecar && sidecar.ppid === child.pid && sidecar.pgid === sidecar.pid &&
        currentOwnedGroup(table, rootOwner).some(item => item.pid === rootIdentity.pid),
        "owned runner/root guard group could not be reidentified");
      remember("runner-before-bootstrap", [row, sidecar]); clock(); runnerStartMs = performance.now();
      await bounded(() => new Promise((resolve, reject) => {
        clock(); child.send({ event: "bootstrap-start", secret }, error => error ? reject(error) : resolve());
      }), "bootstrap start callback");
    })()));
    receipt.exit = await bounded(() => rootClosed, "runner close");
    await bounded(() => Promise.all([...jobs]), "registration and stdio jobs");
    requireThat(receipt.exit.code === 0 && !receipt.exit.signal, "runner did not exit cleanly");
    const remainingRows = ownedRows(await inspect(false)); remember("runner-exit-census", remainingRows);
    requireThat(!remainingRows.length, "runner exited with owned descendants");
    receipt.processesClosed = !receipt.firstOwnershipFailure;
    requireThat(receipt.gates.every(gate => gate.acknowledged && gate.target && gate.measurement &&
      gate.measurement.code === 0 && !gate.measurement.signal), "gate target/resource census incomplete");
    receipt.admission = await bounded(() => admit({ receipt, remainingMs: remaining(false), signal: abort.signal }), "external terminal admission");
    requireThat(receipt.admission?.accepted === true && receipt.admission.h3EvidenceEligible === false, "external terminal admission rejected");
    clock();
  } catch (error) {
    fail(error);
    if (child) { try { await stop(); } catch (cause) { receipt.cleanupFailure = String(cause.message).slice(0, 4096); } }
    else receipt.processesClosed = !receipt.firstOwnershipFailure;
  } finally {
    clearInterval(heartbeat);
    const cleanup = Boolean(failure);
    try {
      clock(cleanup);
      if (jobs.size) await bounded(() => Promise.allSettled([...jobs]), "pending registration/stdio closure", cleanup);
      if (child && !rootDidClose) await bounded(() => rootClosed, "final child/stream close", cleanup);
      // Channel destruction can trigger the immutable gate's autonomous cancellation.
      // It is never evidence that a process has already exited.
      for (const connection of [...connections]) {
        clock(cleanup);
        await bounded(() => new Promise(resolve => {
          if (connection.destroyed) { resolve(); return; }
          connection.once("close", resolve); connection.destroy();
        }), "gate channel close", cleanup);
      }
      await bounded(() => new Promise((resolve, reject) => {
        if (!server.listening) { serverClosed = true; resolve(); return; }
        server.close(error => { if (error) reject(error); else { serverClosed = true; resolve(); } });
      }), "registration server close", cleanup);
      if (outFD !== undefined) { clock(cleanup); descriptorCloseAttempts.add(outFD); closeSync(outFD); outFD = undefined; clock(cleanup); }
      if (errFD !== undefined) { clock(cleanup); descriptorCloseAttempts.add(errFD); closeSync(errFD); errFD = undefined; clock(cleanup); }
      receipt.stdoutLog = { path: path.join(output, "runner-stdout.log"), bytes: outCount, sha256: outHash.digest("hex") };
      receipt.stderrLog = { path: path.join(output, "runner-stderr.log"), bytes: errCount, sha256: errHash.digest("hex") };
      receipt.stdoutDroppedBytes = outDropped; receipt.stderrDroppedBytes = errDropped;
      const finalRows = child ? ownedRows(await inspect(cleanup)) : [];
      remember("final-complete-group-census", finalRows);
      receipt.processesClosed = !receipt.firstOwnershipFailure && !finalRows.length && (!child || rootDidClose);
      requireThat(receipt.processesClosed && !receipt.firstOwnershipFailure && !connections.size && serverClosed && !jobs.size && !waits.size &&
        !outDropped && !errDropped && !receipt.evidenceIncomplete, "supervisor closure incomplete");
      await closeGuard(cleanup);
      // Guard teardown is followed only by these fixed local checks: no callback,
      // I/O, publication or process probe occurs after the observed guard exit.
      clock(cleanup); requireThat((guardExitObserved || !guard && cleanup && !child) &&
        rootDidClose === Boolean(child), "final owned handle closure differs");
      receipt.guardClosed = true; receipt.elapsedWallSeconds = elapsed() / 1000;
      receipt.accepted = !failure && !receipt.firstOwnershipFailure && !abort.signal.aborted && performance.now() < workEnd;
      process.off("SIGINT", onSignal); process.off("SIGTERM", onSignal);
    } catch (error) {
      fail(error); receipt.accepted = false;
      // Preserve an already completed final process census. A later callback,
      // channel, descriptor or guard failure rejects the supervisor without
      // retroactively changing what the process census established.
      if (receipt.processesClosed !== true) receipt.processesClosed = false;
      receipt.finalizationFailure = String(error.message).slice(0, 4096);
      receipt.unresolved = { runner: rootIdentity ?? (child?.pid ? { pid: child.pid, birthUnobserved: true } : null),
        stickyOwnershipFailure: Boolean(receipt.firstOwnershipFailure),
        groups: owners().filter(owner => !owner.retired).map(owner => ({ ...owner.identity })),
        lastObservation: lastRows, childCloseObserved: rootDidClose, pendingJobs: jobs.size,
        pendingCallbacks: waits.size, connections: connections.size, serverClosed,
        descriptors: [outFD, errFD].filter(fd => fd !== undefined),
        uncertainDescriptorCloses: [...descriptorCloseAttempts].filter(fd => fd === outFD || fd === errFD), guardExitObserved };
      if (selfOwnedCancellationAttempted && rootDidClose && !connections.size && serverClosed && !jobs.size && !waits.size &&
        !receipt.firstOwnershipFailure && !guardExitObserved) {
        try {
          await observeCancellationPids();
          await closeGuard(true);
          receipt.guardClosed = true; receipt.guardRetainedForOriginalCompletion = false;
          receipt.autonomousCancellationMayRemain = !receipt.cancellationObservedPidsAbsent;
          process.off("SIGINT", onSignal); process.off("SIGTERM", onSignal);
        } catch (fallbackError) {
          receipt.fallbackFinalizationFailure = String(fallbackError.message).slice(0, 4096);
        }
      }
      // Stop only this invocation's owned handles, without any historical-PID signal.
      // An armed guard stays referenced through the original completion boundary.
      if (!guardExitObserved) {
        for (const connection of connections) connection.destroy();
        server.unref(); child?.unref(); child?.stdout?.destroy(); child?.stderr?.destroy();
        if (child?.connected) child.disconnect();
        for (const fd of [outFD, errFD]) if (fd !== undefined && !descriptorCloseAttempts.has(fd)) {
          descriptorCloseAttempts.add(fd); try { closeSync(fd); } catch {}
        }
        outFD = undefined; errFD = undefined;
      }
      receipt.guardRetainedForOriginalCompletion = Boolean(guardReady && !guardExitObserved);
      receipt.autonomousCancellationMayRemain ??= true;
      if (!receipt.guardRetainedForOriginalCompletion) {
        process.off("SIGINT", onSignal); process.off("SIGTERM", onSignal);
        // No target exists on a pre-readiness startup rejection; otherwise the
        // unexpected-exit handler terminates this owner without claiming closure.
      }
    }
  }
  if (!receipt.accepted) {
    receipt.failure = String(failure?.message ?? "outer pilot rejected").slice(0, 4096);
    throw Object.assign(failure ?? new Error(receipt.failure), { outerReceipt: receipt });
  }
  return receipt;
}

export function parseLauncherArgs(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index], value = argv[index + 1];
    requireThat(["--out", "--launcher-sha256"].includes(key) && value && !values[key], "usage: --out NEW --launcher-sha256 REVIEWED-SHA256"); values[key] = value;
  }
  requireThat(/^[0-9a-f]{64}$/u.test(values["--launcher-sha256"] ?? "") && values["--out"]?.startsWith(BASE) &&
    values["--out"].length > BASE.length && !values["--out"].includes("\\") &&
    values["--out"].split("/").every(part => part && part !== "." && part !== ".."), "reviewed hash and scoped fresh output required");
  return { output: values["--out"], launcherSha256: values["--launcher-sha256"] };
}

export async function launchReviewedPilot({ began, deadlineNanoseconds, options, root, self, runner }) {
  requireThat(import.meta.url === "data:text/javascript;base64," + Buffer.from(self.data).toString("base64") &&
    sha(self.data) === options.launcherSha256 && sha(runner.data) === RUNNER_SHA, "launcher executing source differs from reviewed snapshot");
  const output = path.join(root, options.output), pilotOutput = path.join(output, "pilot");
  let ancestor = output; while (!existsSync(ancestor)) ancestor = path.dirname(ancestor);
  requireThat(realpathSync(ancestor) === ancestor, "symlinked output is not allowed");
  const runtimeBindings = [process.execPath, "/bin/ps"].map(filename => readBound(filename, undefined, false));
  let receipt, failure;
  try {
    receipt = await superviseRegisteredPilot({ root, entry: RUNNER, args: ["--out", path.relative(root, pilotOutput), "--runner-sha256", RUNNER_SHA],
      sources: [{ path: RUNNER, sha256: RUNNER_SHA, bytes: runner.data }], output, startedAtMs: began,
      admit: ({ receipt: processReceipt, remainingMs, signal }) => runAdmissionWorker({ root, pilotOutput,
        runnerBytes: runner.data, runnerSha256: RUNNER_SHA, gates: processReceipt.gates }, self.data, remainingMs, signal) });
  } catch (error) { failure = error; receipt = error.outerReceipt ?? { accepted: false, h3EvidenceEligible: false, failure: error.message }; }
  receipt.launcherBinding = { path: SELF, sha256: self.sha256 }; receipt.runnerBinding = { path: RUNNER, sha256: RUNNER_SHA };
  receipt.runtimeBindings = runtimeBindings;
  receipt.launcherResourceUsage = process.resourceUsage(); receipt.launcherCPUIsSharedOverheadNotCandidateCPU = true;
  receipt.elapsedThroughAdmissionSeconds = (performance.now() - began) / 1000;
  if (receipt.outputReserved) {
    const remainingMs = Math.floor(1800000 - (performance.now() - began));
    if (remainingMs > 0) {
      const heartbeat = setInterval(() => console.error(JSON.stringify({ stage: "outer-final-publication", h3EvidenceEligible: false,
        elapsedWallSeconds: (performance.now() - began) / 1000 })), 15000);
      const controller = new AbortController(), interrupted = () => controller.abort(new Error("outer final publication interrupted"));
      process.on("SIGINT", interrupted); process.on("SIGTERM", interrupted);
      try {
        const publication = await runAdmissionWorker({ kind: "publication", receipt, output, deadlineNanoseconds,
          sources: [{ path: path.join(root, SELF), sha256: self.sha256 }, { path: path.join(root, RUNNER), sha256: RUNNER_SHA }, ...runtimeBindings] }, self.data, remainingMs, controller.signal);
        if (!publication.accepted && receipt.accepted) failure ??= new Error("outer receipt publication was rejected");
        receipt.publication = publication;
      } catch (error) { failure ??= error; }
      finally { clearInterval(heartbeat); process.off("SIGINT", interrupted); process.off("SIGTERM", interrupted); }
    } else failure ??= new Error("outer receipt publication deadline exceeded");
  }
  if (failure && receipt.outputReserved) {
    receipt.accepted = false; receipt.failure = failure.message;
    await runAdmissionWorker({ kind: "failure-publication", receipt, output }, self.data, 10000, new AbortController().signal);
  }
  if (failure || receipt.accepted !== true) throw failure ?? new Error("outer pilot not accepted");
  requireThat(process.hrtime.bigint() < BigInt(deadlineNanoseconds), "outer final output exceeded deadline");
  return { accepted: true, h3EvidenceEligible: false, outerReceipt: receipt.publication.receipt,
    elapsedThroughFinalOutputSeconds: (performance.now() - began) / 1000 };
}

async function main() {
  const began = performance.now(), deadlineNanoseconds = String(process.hrtime.bigint() + 1800000000000n);
  const options = parseLauncherArgs(process.argv.slice(2));
  const root = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  const self = readBound(path.join(root, SELF), options.launcherSha256), runner = readBound(path.join(root, RUNNER), RUNNER_SHA);
  const captured = await import("data:text/javascript;base64," + self.data.toString("base64"));
  const result = await captured.launchReviewedPilot({ began, deadlineNanoseconds, options, root, self, runner });
  console.log(JSON.stringify(result));
}
if (import.meta.url.startsWith("file:") && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main().catch(error => { console.error(error.stack); process.exitCode = 1; });

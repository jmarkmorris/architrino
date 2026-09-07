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

const SELF = "scripts/eom/launch-abc-enclosed-root-pilot.mjs";
const RUNNER = "scripts/eom/run-abc-enclosed-root-pilot.mjs";
const RUNNER_SHA = "11dee965bfc2a859bd958dad2e349e17751a63d2d238ce1a4cc8027808f682e4";
const BASE = ".local-data/braid-analysis/abc-h3-root-pilot-20260827-v1/";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const requireThat = (condition, message) => { if (!condition) throw new Error(message); };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const ABC_GATE_SOURCE = String.raw`
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

export const ABC_BOOTSTRAP_SOURCE = String.raw`
const cp=require('node:child_process'),{registerHooks,syncBuiltinESMExports}=require('node:module');
const{pathToFileURL}=require('node:url'),crypto=require('node:crypto'),path=require('node:path');
const data=JSON.parse(Buffer.from(process.argv[1],'base64').toString());
const originalSpawn=cp.spawn;
const entries=new Map(data.sources.map(record=>[pathToFileURL(path.resolve(data.root,record.path)).href,record]));
for(const record of entries.values())if(crypto.createHash('sha256').update(Buffer.from(record.bytes,'base64')).digest('hex')!==record.sha256)throw Error('bootstrap source differs');
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
process.once('message',async message=>{
 if(message?.event!=='bootstrap-start'||message.secret!==data.secret)process.exit(125);
 process.argv=[process.execPath,path.resolve(data.root,data.entry),...data.args];
 try{await import(pathToFileURL(process.argv[1]).href);if(process.connected)process.disconnect()}
 catch(error){console.error(error.stack);process.exitCode=1;if(process.connected)process.disconnect()}
});
process.send({event:'bootstrap-ready',pid:process.pid});
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
  if (!owner?.identity || owner.retired) return [];
  const rows = table.filter(row => row.pgid === owner.identity.pgid);
  const leader = table.find(row => row.pid === owner.identity.pid);
  const known = owner.knownMembers ?? [owner.identity];
  if (!rows.length || (leader && leader.started !== owner.identity.started) ||
      (!leader && !rows.some(row => known.some(old => old.pid === row.pid && old.started === row.started)))) {
    owner.retired = true; return [];
  }
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
  requireThat(t.schema === "braid-program/abc-serial-pilot-terminal.v1" && t.accepted === true &&
    t.h3EvidenceEligible === false && t.admission === "await-external-post-write-deadline-check" &&
    t.operationalReceiptPath === operation.path && t.elapsedWallSeconds < 1800, "runner terminal is not admissible");
  requireThat(p.schema === "braid-program/abc-serial-cost-pilot.v1" && p.accepted === true &&
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
  requireThat(path.isAbsolute(root) && path.isAbsolute(output) && Number.isInteger(limitMs) && limitMs > 0 &&
    heartbeatMs > 0 && graceMs > 0, "absolute roots and positive supervision limits required");
  const began = startedAtMs, elapsed = () => performance.now() - began;
  const abort = new AbortController(), secret = randomBytes(32).toString("hex"), connections = new Set(), enrolled = new Map(), gateChannels = new Map();
  const receipt = { schema: "braid-program/abc-pilot-outer-process.v1", accepted: false, h3EvidenceEligible: false,
    authority: "registered-process-supervision-and-external-terminal-admission-only", startedAt: new Date().toISOString(),
    limitMs, spawnPlumbing: "captured-owned-bootstrap-intercepts-spawn; registered-gate-launches-original-command-in-owned-group",
    bootstrapSha256: sha(ABC_BOOTSTRAP_SOURCE), gateSha256: sha(ABC_GATE_SOURCE), gates: [], snapshots: [], signals: [] };
  let child, rootIdentity, rootOwner, failure, stopPromise, rootClosed, heartbeat, deadline, runnerStartMs;
  let outFD, errFD, outCount = 0, errCount = 0;
  const outHash = createHash("sha256"), errHash = createHash("sha256");
  const server = net.createServer();
  const live = () => requireThat(!failure && !abort.signal.aborted && elapsed() < limitMs, failure?.message ?? "outer deadline/interruption");
  const remember = (reason, rows) => receipt.snapshots.push({ reason, elapsedMilliseconds: elapsed(), processes: rows });
  const cancelGateChannels = () => {
    for (const [gate, connection] of gateChannels) if (gate.acknowledged && !connection.destroyed && connection.writable) {
      connection.write(JSON.stringify({ event: "cancel", pid: gate.identity.pid, secret }) + "\n");
      gate.selfGroupCancellationRequested = true;
    }
  };
  const signalGroup = (pgid, signal, table, frozenFallback = false) => {
    const owner = pgid === rootIdentity?.pgid ? rootOwner : enrolled.get(pgid);
    requireThat(Number.isSafeInteger(pgid) && pgid > 1 && owner, "unowned process group signal refused");
    if (frozenFallback) requireThat(signal === "SIGKILL" && owner.frozen && !owner.retired, "fallback may kill only already validated frozen groups");
    else if (!currentOwnedGroup(table, owner).length) return;
    try { process.kill(-pgid, signal); receipt.signals.push({ pgid, signal, elapsedMilliseconds: elapsed() }); }
    catch (error) { if (error.code !== "ESRCH") throw error; }
    if (signal === "SIGSTOP") owner.frozen = true;
    if (signal === "SIGCONT") owner.frozen = false;
  };
  const fail = error => { failure ??= error; abort.abort(failure); if (child && !receipt.processesClosed) void stop().catch(cause => { receipt.cleanupFailure = cause.message; }); };
  const stop = () => stopPromise ??= (async () => {
    if (!child?.pid || receipt.processesClosed) return;
    const owners = () => [rootOwner, ...enrolled.values()].filter(Boolean);
    const activeRows = table => owners().flatMap(owner => currentOwnedGroup(table, owner));
    try {
      // Validate live birth identities BEFORE stopping anything, prune completed
      // groups permanently, then freeze all validated groups without awaiting.
      let table = await inspectProcesses(), prior = "";
      if (!rootOwner) {
        const row = table.find(item => item.pid === child.pid && item.ppid === process.pid && item.pgid === child.pid);
        if (row) { rootIdentity = row; rootOwner = { identity: row, knownMembers: [row] }; receipt.runner ??= row; }
      }
      for (let pass = 0; pass < 8; pass++) {
        const rootRows = rootOwner ? currentOwnedGroup(table, rootOwner) : [];
        const active = activeRows(table), groups = [...new Set(active.map(row => row.pgid))];
        const rows = descendantRecords(table, rootRows.length ? child.pid : -1, groups);
        remember(pass ? "stopped-tree-capture" : "validated-pre-stop-tree", rows);
        for (const row of rows) if (row.pgid !== rootIdentity?.pgid && !enrolled.has(row.pgid)) {
          const leader = table.find(item => item.pid === row.pgid);
          requireThat(leader && rows.some(item => item.pid === leader.pid), "unregistered descendant group leader cannot be validated");
          enrolled.set(row.pgid, { identity: leader, knownMembers: rows.filter(item => item.pgid === row.pgid), cleanupOnly: true });
        }
        if (rootRows.length) signalGroup(rootIdentity.pgid, "SIGSTOP", table);
        for (const pgid of new Set(rows.map(row => row.pgid))) if (pgid !== rootIdentity?.pgid) signalGroup(pgid, "SIGSTOP", table);
        const signature = rows.map(row => `${row.pid}:${row.started}:${row.pgid}`).sort().join("|");
        if (signature === prior) break;
        prior = signature; requireThat(pass < 7, "owned descendant capture did not stabilize");
        table = await inspectProcesses();
      }
      for (const owner of owners()) {
        signalGroup(owner.identity.pgid, "SIGTERM", table); signalGroup(owner.identity.pgid, "SIGCONT", table);
      }
      const graceEnd = performance.now() + graceMs;
      for (;;) {
        table = await inspectProcesses(); const rows = activeRows(table);
        if (!rows.length) { receipt.processesClosed = true; break; }
        if (performance.now() >= graceEnd) {
          remember("pre-kill-owned-groups", rows);
          for (const pgid of new Set(rows.map(row => row.pgid))) signalGroup(pgid, "SIGKILL", table);
          const killEnd = performance.now() + 2000;
          while (performance.now() < killEnd) {
            if (!activeRows(await inspectProcesses()).length) { receipt.processesClosed = true; break; }
            await delay(25);
          }
          requireThat(receipt.processesClosed === true, "owned process groups remained after SIGKILL"); break;
        }
        await delay(25);
      }
    } catch (error) {
      receipt.cleanupFailure = error.message; receipt.processesClosed = false;
      cancelGateChannels();
      // Frozen processes cannot voluntarily exit/reuse their IDs. If inspection
      // fails after STOP, kill only that already validated frozen set now; never
      // signal historical or unvalidated groups. Closure remains unverified.
      for (const owner of owners()) if (owner.frozen && !owner.retired) signalGroup(owner.identity.pgid, "SIGKILL", undefined, true);
      if (!rootOwner?.frozen && child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
      throw error;
    }
  })();
  const onSignal = () => fail(new Error("outer operator interruption"));
  const registrationJobs = new Set();
  server.on("connection", connection => {
    connections.add(connection); let pending = "", gate;
    connection.on("error", error => fail(error)); connection.on("close", () => connections.delete(connection));
    connection.on("data", chunk => {
      pending += chunk.toString(); if (pending.length > 1024 * 1024) { fail(new Error("gate message exceeds bound")); return; }
      while (pending.includes("\n")) {
        const end = pending.indexOf("\n"), line = pending.slice(0, end); pending = pending.slice(end + 1);
        let message; try { message = JSON.parse(line); } catch { fail(new Error("malformed gate event")); return; }
        if (!gate) {
          if (message.event !== "register" || message.secret !== secret || message.gateSha256 !== receipt.gateSha256 ||
            message.parentPid !== child?.pid || !Number.isSafeInteger(message.pid) || enrolled.has(message.pid)) {
            fail(new Error("invalid child gate registration")); return;
          }
          gate = { identity: null, requestedCommand: message.command, requestedArgs: message.args,
            actualGateCommand: process.execPath, actualGateSourceSha256: receipt.gateSha256,
            registeredAtMilliseconds: elapsed(), runnerElapsedAtRegistration: (performance.now() - runnerStartMs) / 1000,
            acknowledged: false };
          gateChannels.set(gate, connection);
          const job = (async () => {
            live(); const table = await inspectProcesses();
            const row = table.find(record => record.pid === message.pid);
            requireThat(row && row.ppid === child.pid && row.pgid === row.pid && rootIdentity &&
              table.some(record => record.pid === rootIdentity.pid && record.started === rootIdentity.started), "gate process identity is not an owned live child");
            for (const owner of enrolled.values()) currentOwnedGroup(table, owner);
            gate.identity = row; gate.knownMembers = [row]; enrolled.set(row.pgid, gate); receipt.gates.push(gate); remember("registered-gate", [row]);
            live(); gate.acknowledged = true;
            connection.write(JSON.stringify({ event: "start", pid: row.pid, secret }) + "\n");
          })(); registrationJobs.add(job); job.catch(fail).finally(() => registrationJobs.delete(job));
        } else if (message.pid !== gate.identity?.pid || !gate.acknowledged) fail(new Error("unacknowledged gate event"));
        else if (message.event === "target-started" && !gate.target) gate.target = { pid: message.targetPid };
        else if (message.event === "measurement" && !gate.measurement) {
          const usage = message.resourceUsage;
          if (!usage || ![usage.userCPUTime, usage.systemCPUTime, usage.maxRSS].every(value => Number.isSafeInteger(value) && value >= 0)) fail(new Error("gate resource measurement malformed"));
          else gate.measurement = message;
        } else fail(new Error("unknown or repeated gate event"));
      }
    });
  });
  try {
    requireThat(!existsSync(output), "outer output already exists");
    mkdirSync(path.dirname(output), { recursive: true }); mkdirSync(output);
    receipt.outputReserved = true;
    outFD = openSync(path.join(output, "runner-stdout.log"), "wx"); errFD = openSync(path.join(output, "runner-stderr.log"), "wx");
    await inspectProcesses(); // Fail before spawning if process ownership cannot be inspected.
    await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
    const port = server.address().port;
    process.on("SIGINT", onSignal); process.on("SIGTERM", onSignal);
    heartbeat = setInterval(() => console.error(JSON.stringify({ schema: "braid-program/abc-pilot-outer-heartbeat.v1",
      pid: child?.pid, elapsedWallSeconds: elapsed() / 1000, registeredGates: receipt.gates.length,
      stdoutBytes: outCount, stderrBytes: errCount, stopping: Boolean(failure), h3EvidenceEligible: false })), heartbeatMs);
    deadline = setTimeout(() => fail(new Error("outer pilot wall deadline exceeded")), Math.max(1, limitMs - elapsed()));
    const data = { root, entry, args, sources: sources.map(record => ({ ...record, bytes: Buffer.from(record.bytes).toString("base64") })),
      port, secret, gateSource: ABC_GATE_SOURCE, gateSha256: receipt.gateSha256, limitMs };
    child = spawn(process.execPath, ["-e", ABC_BOOTSTRAP_SOURCE, Buffer.from(JSON.stringify(data)).toString("base64")],
      { cwd: root, detached: true, stdio: ["ignore", "pipe", "pipe", "ipc"] });
    const consume = (fd, digest, kind) => chunk => {
      try {
        if (kind === "stdout") outCount += chunk.length; else errCount += chunk.length;
        requireThat(outCount <= 128 * 1024 ** 2 && errCount <= 128 * 1024 ** 2, "outer log exceeds resource bound");
        let offset = 0; while (offset < chunk.length) { const count = writeSync(fd, chunk, offset); requireThat(count > 0, "outer log write made no progress"); offset += count; }
        digest.update(chunk);
      } catch (error) { fail(error); }
    };
    child.stdout.on("data", consume(outFD, outHash, "stdout")); child.stderr.on("data", consume(errFD, errHash, "stderr"));
    child.once("message", message => {
      const job = (async () => {
        requireThat(message.event === "bootstrap-ready" && message.pid === child.pid, "bootstrap identity differs");
        const table = await inspectProcesses(), row = table.find(record => record.pid === child.pid);
        requireThat(row && row.ppid === process.pid && row.pgid === child.pid, "owned runner group could not be identified");
        rootIdentity = row; rootOwner = { identity: row, knownMembers: [row] }; receipt.runner = row; remember("runner-before-bootstrap", [row]); live(); runnerStartMs = performance.now();
        child.send({ event: "bootstrap-start", secret });
      })(); registrationJobs.add(job); job.catch(fail).finally(() => registrationJobs.delete(job));
    });
    rootClosed = new Promise(resolve => {
      child.once("error", error => { fail(error); resolve({ code: null, signal: null, error: error.message }); });
      child.once("close", (code, signal) => resolve({ code, signal }));
    });
    let cleanupWaitTimer, boundedFailure;
    try {
      receipt.exit = await Promise.race([rootClosed, new Promise((_resolve, reject) => {
        boundedFailure = () => { cleanupWaitTimer = setTimeout(() => reject(new Error("runner close exceeded bounded failure cleanup")), graceMs + 10000); };
        abort.signal.addEventListener("abort", boundedFailure, { once: true }); if (abort.signal.aborted) boundedFailure();
      })]);
    } finally { clearTimeout(cleanupWaitTimer); abort.signal.removeEventListener("abort", boundedFailure); }
    await Promise.allSettled([...registrationJobs]);
    if (receipt.exit.code !== 0 || receipt.exit.signal) fail(new Error("runner did not exit cleanly"));
    const exitTable = await inspectProcesses();
    const remaining = [rootOwner, ...enrolled.values()].filter(Boolean).flatMap(owner => currentOwnedGroup(exitTable, owner)); remember("runner-exit-census", remaining);
    if (remaining.length) fail(new Error("runner exited with owned descendants"));
    if (failure) { await stop(); throw failure; }
    receipt.processesClosed = true;
    requireThat(receipt.gates.every(gate => gate.acknowledged && gate.target && gate.measurement && gate.measurement.code === 0 && !gate.measurement.signal), "gate target/resource census incomplete");
    live();
    receipt.admission = await Promise.race([admit({ receipt, remainingMs: Math.floor(limitMs - elapsed()), signal: abort.signal }),
      new Promise((_resolve, reject) => abort.signal.addEventListener("abort", () => reject(abort.signal.reason), { once: true }))]);
    requireThat(receipt.admission?.accepted === true && receipt.admission.h3EvidenceEligible === false, "external terminal admission rejected");
    live(); receipt.accepted = true;
  } catch (error) { failure ??= error; receipt.failure = failure.message; if (child) { try { await stop(); } catch (cause) { receipt.cleanupFailure = cause.message; } } }
  finally {
    if (outFD !== undefined) closeSync(outFD); if (errFD !== undefined) closeSync(errFD);
    receipt.stdoutLog = { path: path.join(output, "runner-stdout.log"), bytes: outCount, sha256: outHash.digest("hex") };
    receipt.stderrLog = { path: path.join(output, "runner-stderr.log"), bytes: errCount, sha256: errHash.digest("hex") };
    if (failure) {
      cancelGateChannels();
      // With process-table inspection unavailable, only observe these recorded
      // PIDs; never signal by them. Wait for cancellation to take effect before
      // returning. An unrelated PID reuse merely prevents a verified absence.
      const pids = [child?.pid, ...receipt.gates.flatMap(gate => [gate.identity?.pid, gate.target?.pid])].filter(Number.isSafeInteger);
      const stillPresent = () => pids.filter(pid => { try { process.kill(pid, 0); return true; } catch (error) { return error.code !== "ESRCH"; } });
      const until = performance.now() + 2000;
      let remaining = stillPresent();
      while (remaining.length && performance.now() < until) { await delay(25); remaining = stillPresent(); }
      receipt.cancellationObservedPidsAbsent = remaining.length === 0;
      if (remaining.length) receipt.cancellationUnverifiedPids = remaining;
    }
    for (const connection of connections) connection.destroy();
    if (server.listening) await new Promise(resolve => server.close(resolve));
    receipt.elapsedWallSeconds = elapsed() / 1000;
    if (elapsed() >= limitMs || failure || abort.signal.aborted) receipt.accepted = false;
    clearInterval(heartbeat); clearTimeout(deadline); process.off("SIGINT", onSignal); process.off("SIGTERM", onSignal);
  }
  if (!receipt.accepted) throw Object.assign(failure ?? new Error("outer pilot rejected"), { outerReceipt: receipt });
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

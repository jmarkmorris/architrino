// Operational gate only. No scientific output or diagnostics are written here;
// the target owns stdout/stderr. Protocol records use the inherited IPC channel.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';

import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as f5Fs from 'node:fs';
import * as f5Crypto from 'node:crypto';
// Bootstrap uses Node builtins only; no repository module runs before selection.
export async function bootstrapEvolution(root, sourceMapSha256, originalIdentities = {}) {
  if (!/^[a-f0-9]{64}$/u.test(sourceMapSha256 ?? "")) throw Error("externally selected F5 source-map digest required");
  const capture = (filename, expected) => {
    if (f5Fs.realpathSync(filename) !== filename) throw Error("canonical F5 bootstrap source required");
    const fd = f5Fs.openSync(filename, f5Fs.constants.O_RDONLY | f5Fs.constants.O_NOFOLLOW | f5Fs.constants.O_NONBLOCK);
    try {
      const before = f5Fs.fstatSync(fd, {bigint:true});
      const identity = s => [s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(":");
      if (!before.isFile() || before.size <= 0n || before.size > 1024n**2n) throw Error("bounded F5 bootstrap source");
      const data = f5Fs.readFileSync(fd), sha256 = f5Crypto.createHash("sha256").update(data).digest("hex");
      if (sha256 !== expected || identity(before) !== identity(f5Fs.fstatSync(fd,{bigint:true})) || identity(before) !== identity(f5Fs.lstatSync(filename,{bigint:true}))) throw Error("F5 bootstrap source digest/original identity changed");
      if (Object.hasOwn(originalIdentities,filename) && originalIdentities[filename] !== identity(before)) throw Error("F5 original bootstrap identity changed");
      return {data,identity:identity(before),path:filename};
    } finally {f5Fs.closeSync(fd);}
  };
  const mapPath = path.join(root,"reference/priorities/development-process-review/contracts/option-b-f5-evolution-sources.jsonld");
  const map = capture(mapPath,sourceMapSha256), admissionPath = "scripts/eom/f5-current-source-admission.mjs";
  const rows = JSON.parse(map.data)["@graph"]?.filter(r=>r.role==="admission"&&r.binding?.path===admissionPath);
  if (rows?.length !== 1 || !/^[a-f0-9]{64}$/u.test(rows[0].binding.sha256)) throw Error("exact F5 admission module selection required");
  const helper = capture(path.join(root,admissionPath),rows[0].binding.sha256);
  const module = await import("data:text/javascript;base64,"+helper.data.toString("base64"));
  return module.admitF5Sources(root,sourceMapSha256,{...originalIdentities,[map.path]:map.identity,[helper.path]:helper.identity},"evolution");
}

export async function main(argv=process.argv.slice(2),control=null,originalAdmission=null){
 if(argv.at(-2)!=='--source-map-sha256'||!/^[a-f0-9]{64}$/u.test(argv.at(-1)??''))throw Error('externally selected F5 gate map required');
 const selected=argv.at(-1);argv=argv.slice(0,-2);
 const operational=originalAdmission??await bootstrapEvolution(f5Fs.realpathSync(fileURLToPath(new URL('../../',import.meta.url))),selected);
 if(operational.sourceMap.sha256!==selected)throw Error('F5 gate selection differs');
 operational.recheck();

let target, cancelled = false, launched = false, permitted = false, inputReady = false, targetClosed = false;
let timer, killTimer, specification, chunks = [], inputBytes = 0;
const send = value => { try{operational.recheck();}catch{cancel();return;} if (process.connected) process.send(value, error => { if (error) cancel(); }); };
function cancel() {
  if (cancelled) return;
  cancelled = true;
  clearTimeout(timer);
  // This process is the registered detached group leader. Keep it alive until
  // group KILL if its controlling worker disappears, even if the target exits.
  if (!target) { process.exitCode = 125; if (process.connected) process.disconnect(); process.stdin.destroy(); return; }
  killTimer = setTimeout(() => { try { process.kill(-process.pid, 'SIGKILL'); } catch { process.exit(125); } }, 2000);
  try { process.kill(-process.pid, 'SIGTERM'); } catch { /* outer also owns cleanup */ }
}
function launch() {
  try{operational.recheck();}catch{cancel();return;}
  if (cancelled || launched || !permitted || !inputReady) return;
  if (!process.connected || process.ppid !== specification.workerPid) { cancel(); return; }
  if (Date.now() >= specification.deadlineEpochMs) { cancel(); return; }
  launched = true; clearTimeout(timer);
  timer = setTimeout(cancel, Math.max(1,specification.deadlineEpochMs-Date.now()));
  const began = performance.now();
  target = spawn(specification.command, specification.args, {
    cwd: specification.cwd, env: specification.environment, detached: false,
    stdio: ['pipe', 'inherit', 'inherit'],
  });
  target.once('error', error => { send({ event: 'target-spawn-error', error: error.message }); cancel(); });
  target.stdin.on('error', error => { if (error.code !== 'EPIPE') cancel(); });
  target.stdin.end(Buffer.concat(chunks)); chunks = [];
  send({ event: 'target-started', gatePid: process.pid, targetPid: target.pid, stageId: specification.stageId });
  target.once('close', (code, signal) => {
    if (cancelled) return;
    targetClosed = true;
    send({ event: 'target-closed', gatePid: process.pid, targetPid: target.pid,
      stageId: specification.stageId, code, signal, targetEnvelopeSeconds: (performance.now() - began) / 1000,
      gateResourceUsage: process.resourceUsage() });
    // The worker must retain this group in the outer census before releasing
    // the gate. Loss of either IPC channel still takes the cancellation path.
    clearTimeout(timer);
    timer = setTimeout(cancel, Math.max(1,Math.min(10000,specification.deadlineEpochMs-Date.now())));
  });
}
process.on('SIGINT', cancel); process.on('SIGTERM', cancel);
process.on('disconnect', cancel);
process.on('message', message => {
  if (cancelled) return;
  if (message?.event === 'cancel') { cancel(); return; }
  if (message?.event === 'go' && !permitted && !launched && message.stageId === specification?.stageId) {
    permitted = true; launch(); return;
  }
  if (message?.event === 'release' && launched && targetClosed && message.stageId === specification?.stageId) {
    clearTimeout(timer); clearTimeout(killTimer);
    const code = target.exitCode, signal = target.signalCode;
    process.removeListener('disconnect', cancel);
    if (process.connected) process.disconnect();
    if (signal) {
      operational.recheck();
      process.removeListener('SIGTERM', cancel); process.removeListener('SIGINT', cancel);
      process.kill(process.pid, signal);
    } else { operational.recheck(); process.exitCode = code ?? 125; }
    return;
  }
  cancel();
});
try {
  if (!process.connected || argv.length !== 1) throw Error('inherited stage channel required');
  specification = JSON.parse(argv[0]);
  if (specification.workerPid !== process.ppid || !Number.isInteger(specification.inputBytes) ||
      specification.inputBytes < 0 || specification.inputBytes > 2 * 1024 ** 2 ||
      !/^[a-f0-9]{64}$/u.test(specification.inputSha256) || !Array.isArray(specification.args) ||
      !Number.isFinite(specification.deadlineEpochMs) || specification.deadlineEpochMs<=Date.now()) throw Error('invalid bounded stage specification');
  timer = setTimeout(cancel, Math.max(1,Math.min(10000,specification.deadlineEpochMs-Date.now())));
  const digest = createHash('sha256');
  process.stdin.on('data', bytes => {
    inputBytes += bytes.length;
    if (inputBytes > specification.inputBytes) { cancel(); return; }
    chunks.push(bytes); digest.update(bytes);
  });
  process.stdin.on('error', cancel);
  process.stdin.on('end', () => {
    if (cancelled) return;
    if (inputBytes !== specification.inputBytes || digest.digest('hex') !== specification.inputSha256) { cancel(); return; }
    inputReady = true; launch();
  });
  send({ event: 'gate-ready', gatePid: process.pid, stageId: specification.stageId });
} catch { cancel(); }

}
if(!new URL(import.meta.url).search&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e.message);process.exitCode=1;if(process.connected)process.disconnect();});

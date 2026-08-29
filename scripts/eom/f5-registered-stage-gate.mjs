// Operational gate only. No scientific output or diagnostics are written here;
// the target owns stdout/stderr. Protocol records use the inherited IPC channel.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';

let target, cancelled = false, launched = false, permitted = false, inputReady = false, targetClosed = false;
let timer, killTimer, specification, chunks = [], inputBytes = 0;
const send = value => { if (process.connected) process.send(value, error => { if (error) cancel(); }); };
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
      process.removeListener('SIGTERM', cancel); process.removeListener('SIGINT', cancel);
      process.kill(process.pid, signal);
    } else process.exitCode = code ?? 125;
    return;
  }
  cancel();
});
try {
  if (!process.connected || process.argv.length !== 3) throw Error('inherited stage channel required');
  specification = JSON.parse(process.argv[2]);
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

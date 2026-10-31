import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync, openSync, closeSync, statSync, createReadStream, readdirSync, fsyncSync, writeFileSync, writeSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { assertEomExecutionBinding, assertEomResponseSchema, createEomResponseView } from './EomResponseRecord.mjs';
import { createHash, randomUUID } from 'node:crypto';

// Watched, non-detached workers use the existing EOM executable. They have no
// Borg grade/retention whitelist and never generate dynamics in JavaScript.
export function createEomV2ProcessClient({ binaryPath, checkpointRoot, recordRoot, timeoutMs = 120000 } = {}) {
  binaryPath = resolve(binaryPath);
  checkpointRoot = resolve(checkpointRoot);
  recordRoot = resolve(recordRoot ?? join(checkpointRoot, '../records'));
  mkdirSync(recordRoot, { recursive: true, mode: 0o700 });
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1) throw new TypeError('Positive worker deadline required.');
  mkdirSync(checkpointRoot, { recursive: true, mode: 0o700 });
  const active = new Map();
  let disposing = false;
  const idPattern = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/u;
  const checkpointPath = id => {
    if (!idPattern.test(id)) throw new TypeError('Invalid checkpoint identity.');
    return join(checkpointRoot, `${id}.json`);
  };
  function cancel(runId) {
    const state = active.get(runId);
    if (!state || state.worker.exitCode !== null || state.worker.signalCode !== null) return false;
    state.cancelled = true;
    return state.ready ? state.worker.kill('SIGUSR1') : true;
  }
  function execute(raw, { runId = randomUUID(), onProgress = () => {}, retainRecord = false, checkpointMode = "inline" } = {}) {
    if (!["inline", "reference"].includes(checkpointMode) || (checkpointMode === "reference" && !retainRecord)) throw new TypeError("Checkpoint references require a retained record operation.");
    if (active.has(runId)) throw new Error('This run is already active.');
    if (disposing || active.size >= 4) throw Object.assign(new Error('EOM worker admission unavailable.'), { code: 'worker_budget_exhausted' });
    if (typeof raw !== 'string' || Buffer.byteLength(raw) > 32 * 1024 * 1024) throw new TypeError('One bounded JSON document required.');
    if (retainRecord) {
      const retainedBytes = readdirSync(recordRoot).filter(name => name.endsWith('.json')).reduce((sum, name) => sum + statSync(join(recordRoot, name)).size, 0);
      const reservations = [...active.values()].filter(state => state.retaining).length + 1;
      if (retainedBytes + reservations * (256 * 1024 * 1024 + 8192) > 2 * 1024 * 1024 * 1024) throw Object.assign(new Error('EOM record storage allowance exhausted; existing evidence preserved.'), { code: 'record_storage_exhausted' });
    }
    const checkpointId = randomUUID();
    const path = checkpointPath(checkpointId);
    return new Promise((resolveResult, reject) => {
      const artifactPath = join(recordRoot, `${checkpointId}.json`);
      const artifactFd = retainRecord ? openSync(artifactPath, 'wx', 0o600) : undefined;
      const worker = spawn(binaryPath, ['eom-v2', '--checkpoint-file', path], { stdio: ['pipe', 'pipe', 'pipe'] });
      const state = { worker, ready: false, cancelled: false, progress: null, retaining: retainRecord };
      active.set(runId, state);
      let output = '', errors = '', progressBuffer = '', failure = null;
      let stopTimer, graceTimer;
      const stop = error => {
        failure ??= error;
        if (worker.exitCode === null && worker.signalCode === null) worker.kill('SIGTERM');
        stopTimer ??= setTimeout(() => { if (worker.exitCode === null && worker.signalCode === null) worker.kill('SIGKILL'); }, 2000);
      };
      const deadline = setTimeout(() => {
        // Give cooperative cancellation time to return its durable boundary.
        cancel(runId);
        graceTimer = setTimeout(() => stop(Object.assign(new Error('EOM deadline expired before durable cancellation.'), { code: 'checkpoint_cancellation_deadline' })), 5000);
      }, timeoutMs);
      if (!retainRecord) worker.stdout.setEncoding('utf8'); worker.stderr.setEncoding('utf8');
      let artifactBytes = 0;
      worker.stdout.on('data', text => {
        if (retainRecord) {
          if (failure) return;
          const remaining = 256 * 1024 * 1024 - artifactBytes;
          const chunk = text.subarray(0, Math.max(0, remaining));
          try { let offset = 0; while (offset < chunk.length) offset += writeSync(artifactFd, chunk, offset, chunk.length-offset); artifactBytes += chunk.length; } catch (error) { stop(error); return; }
          if (text.length > remaining) stop(Object.assign(new Error('EOM raw record exceeds 256 MiB; partial evidence retained.'), { code: 'record_size_exhausted' }));
        } else { output += text; if (Buffer.byteLength(output) > 64 * 1024 * 1024) stop(new Error('EOM response size budget exceeded.')); }
      });
      worker.stderr.on('data', text => {
        errors = (errors + text).slice(-8192); progressBuffer += text;
        if (progressBuffer.length > 65536) progressBuffer = progressBuffer.slice(-65536);
        let end;
        while ((end = progressBuffer.indexOf('\n')) >= 0) {
          const line = progressBuffer.slice(0, end); progressBuffer = progressBuffer.slice(end + 1);
          try {
            const event = JSON.parse(line);
            if (event.schema === 'eom_ready/v2') { state.ready = true; if (state.cancelled) worker.kill('SIGUSR1'); }
            if (event.schema === 'eom_progress/v2') { state.progress = event; onProgress(event); }
          } catch {}
        }
      });
      worker.on('error', error => { failure ??= error; });
      worker.stdin.on('error', error => { failure ??= error; });
      worker.on('close', code => {
        clearTimeout(deadline); clearTimeout(stopTimer); clearTimeout(graceTimer); active.delete(runId);
        if (artifactFd !== undefined) { try { fsyncSync(artifactFd); } catch (error) { failure ??= error; } finally { closeSync(artifactFd); } }
        if (!failure && code !== 0) failure = new Error(`EOM process exited ${code}: ${errors}`);
        if (failure) { if (retainRecord) { failure.recordId = checkpointId; failure.partialBytes = statSync(artifactPath).size; if (existsSync(path)) { try { const cp = JSON.parse(readFileSync(path)); failure.acceptedTime = cp.acceptedTime; failure.checkpointId = checkpointId; } catch {} } } reject(failure); return; }
        if (code !== 0) { reject(new Error(`EOM process exited ${code}: ${errors}`)); return; }
        try {
          let artifact;
          if (retainRecord) {
            const bytes = statSync(artifactPath).size;
            if (bytes > 256 * 1024 * 1024) throw new Error('EOM raw record exceeds 256 MiB; evidence retained.');
            const rawBytes = readFileSync(artifactPath);
            artifact = { id: checkpointId, bytes, sha256: createHash('sha256').update(rawBytes).digest('hex'), rawHref: `/api/eom/v2/records/${checkpointId}/raw` };
            output = rawBytes.toString('utf8');
          }
          const payload = JSON.parse(output);
          assertEomResponseSchema(raw, payload);
          assertEomExecutionBinding(raw, payload);
          if (payload.checkpoint?.durable) {
            const retained = JSON.parse(readFileSync(path, 'utf8'));
            if (retained.digest !== payload.checkpoint.digest || retained.acceptedTime !== payload.checkpoint.acceptedTime) throw new Error('Durable checkpoint receipt mismatch.');
            payload.checkpoint.id = checkpointId;
          }
          if (retainRecord) {
            const view = createEomResponseView(payload, { ...artifact, durable: true }, { checkpointMode });
            const marker = join(recordRoot, `${checkpointId}.complete.json`);
            writeFileSync(marker, JSON.stringify({ ...artifact, complete: true }), { mode: 0o600 });
            const markerFd = openSync(marker, 'r'); try { fsyncSync(markerFd); } finally { closeSync(markerFd); }
            const dirFd = openSync(recordRoot, 'r'); try { fsyncSync(dirFd); } finally { closeSync(dirFd); }
            resolveResult(view);
          } else resolveResult(payload);
        } catch (error) { if (retainRecord) { error.recordId=checkpointId; error.rawBytes=statSync(artifactPath).size; if (existsSync(path)) { try { error.acceptedTime=JSON.parse(readFileSync(path)).acceptedTime; error.checkpointId=checkpointId; } catch {} } } reject(error); }
      });
      worker.stdin.end(`${raw}\n`);
    });
  }
  return Object.freeze({
    execute, cancel,
    progress(runId) { return active.get(runId)?.progress ?? null; },
    rawRecord(id) { checkpointPath(id); const path = join(recordRoot, `${id}.json`); const marker = join(recordRoot, `${id}.complete.json`); if (!existsSync(path) || !existsSync(marker)) throw new Error('Complete EOM record unavailable.'); const retained = JSON.parse(readFileSync(marker)); if (retained.complete !== true || retained.bytes !== statSync(path).size) throw new Error('EOM raw record receipt mismatch.'); return { stream: createReadStream(path), bytes: statSync(path).size }; },
    validateCancel(raw) {
      if (typeof raw !== 'string' || Buffer.byteLength(raw)>65536) throw new Error('Cancellation request exceeds 64 KiB.');
      // A bounded parser-only invocation; it cannot launch or evolve paths.
      const result=spawnSync(binaryPath,['eom-v2'],{ input:`{"operation":"validate-cancel","request":${raw}}`,encoding:'utf8',timeout:2000,maxBuffer:65536 });
      if(result.status!==0)throw result.error ?? new Error('EOM cancellation validation failed.');
      const payload=JSON.parse(result.stdout);
      if(payload.schema!=='eom_cancel_request/v2')throw Object.assign(new Error(payload.error ?? 'Invalid cancellation request.'),{code:payload.code});
      return payload;
    },
    readCheckpoint(id) { const path = checkpointPath(id); if (!existsSync(path)) throw new Error('Checkpoint unavailable.'); return JSON.parse(readFileSync(path, 'utf8')); },
    async dispose() {
      disposing = true;
      const waits = [...active.values()].map(({ worker }) => new Promise(resolveClosed => worker.once('close', resolveClosed)));
      for (const runId of active.keys()) cancel(runId);
      await Promise.all(waits);
    },
  });
}

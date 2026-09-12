// Current circular launcher observation owner. No numerical acceptance authority.
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync, constants, fstatSync, mkdtempSync, openSync, readFileSync, readdirSync, realpathSync, rmSync} from 'node:fs';
import {cpus, tmpdir} from 'node:os';
import path from 'node:path';

const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const demand = (value, message) => { if (!value) throw Error(message); };

export function captureCircularFile(filename, expected) {
  const actualPath = realpathSync(filename);
  const fd = openSync(actualPath, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd);
    demand(before.isFile() && before.size <= 128 * 1024 ** 2, 'bounded regular observation input required');
    const bytes = readFileSync(fd), after = fstatSync(fd);
    demand(bytes.length === before.size && after.size === before.size && before.mtimeMs === after.mtimeMs && before.ctimeMs === after.ctimeMs,
      'observation input changed while reading');
    const digest = sha(bytes);
    demand(!expected || digest === expected, `observation input hash differs: ${filename}`);
    return {path: path.resolve(filename), realPath: actualPath, sha256: digest, bytes: bytes.length, data: bytes};
  } finally { closeSync(fd); }
}
const clean = ({data, ...record}) => record;

export function parseCircularObservation(text) {
  demand(typeof text === 'string' && Buffer.byteLength(text) <= 8 * 1024 ** 2, 'bounded process-table text required');
  const rows = text.split('\n').filter(line => line.trim()).map(line => {
    const match = /^\s*(\d+)\s+(\d+)\s+(\d+)\s+([A-Z][a-z]{2}\s+[A-Z][a-z]{2}\s+\d{1,2}\s+\d\d:\d\d:\d\d\s+\d{4})\s+(\S+)\s+(\d+)\s+(.+)$/u.exec(line);
    demand(match, 'process observation row is malformed');
    return {pid: +match[1], ppid: +match[2], pgid: +match[3], started: match[4].replace(/\s+/gu, ' '),
      state: match[5], residentBytes: +match[6] * 1024, command: match[7]};
  });
  demand(rows.length > 0 && rows.length <= 65536 && new Set(rows.map(row => row.pid)).size === rows.length, 'complete unique bounded process table required');
  demand(rows.every(row => [row.pid, row.ppid, row.pgid, row.residentBytes].every(Number.isSafeInteger)), 'process numeric fields invalid');
  return rows;
}

export function createCircularObservationOwner({python, helper, sources, root, began, completionEnd,
  signal, maximumProbeMs = 2000, maximumProbeBytes = 8 * 1024 ** 2, maximumTotalBytes = 64 * 1024 ** 2,
  maximumSampledResidentBytes = 4 * 1024 ** 3, maximumProbes = 4096}) {
  demand(Number.isFinite(began) && completionEnd > performance.now() && completionEnd - began <= 1800000, 'original observation lifetime required');
  demand(maximumProbeMs > 0 && maximumProbeMs <= 2000 && maximumProbeBytes > 0 && maximumProbeBytes <= 8 * 1024 ** 2, 'probe limits differ');
  const pythonPath = realpathSync(python);
  const bound = sources.map(row => captureCircularFile(row.path, row.sha256));
  const helperBinding = bound.find(row => row.path === path.resolve(helper));
  demand(helperBinding, 'captured helper source is required');
  demand(bound.reduce((sum, row) => sum + row.bytes, 0) <= 128 * 1024 ** 2, 'observation source union exceeds byte limit');
  const processorCount = cpus().length;
  demand(Number.isSafeInteger(processorCount) && processorCount > 0, 'host logical CPU count unavailable');
  let runtime = null, failure = null, finished = false, totalBytes = 0, maximumRSS = 0;
  const probes = [], pending = new Set();
  const retained = new Map();
  const recheck = () => {
    for (const row of bound) {
      const current = captureCircularFile(row.path, row.sha256);
      demand(current.bytes === row.bytes && current.realPath === row.realPath, `observation source identity changed: ${row.path}`);
    }
    demand(cpus().length === processorCount, 'logical CPU census changed');
  };
  const sticky = error => { failure ??= error; return error; };
  function execute(mode, context) {
    demand(!finished, 'observation owner already finished');
    const end = Math.min(completionEnd, context.originalDeadlineMs ?? completionEnd,
      context.cleanup ? completionEnd : context.workDeadlineMs ?? completionEnd,
      performance.now() + Math.max(0, context.remainingMs));
    const remaining = end - performance.now();
    demand(remaining > 100, 'insufficient observation and closure allowance');
    demand(probes.length < maximumProbes, 'observation count limit exceeded');
    if (!context.cleanup) demand(!failure && !signal?.aborted, failure?.message ?? 'observation interrupted');
    // Authored helper/source files remain pinned; host executables and loaded
    // runtime files are capabilities supplied by the current environment.
    for (const row of bound) {
      const current = captureCircularFile(row.path, row.sha256);
      demand(current.bytes === row.bytes && current.realPath === row.realPath, 'observation input changed before probe');
    }
    const durationMs = Math.floor(Math.min(maximumProbeMs, remaining - 100));
    const record = {mode, startedMilliseconds: performance.now(), applicableDeadlineMilliseconds: end,
      requestedProbeMilliseconds: durationMs, closed: false, stdoutBytes: 0, stderrBytes: 0,
      retainedBytes: 0, droppedBytes: 0, cleanup: Boolean(context.cleanup)};
    probes.push(record);
    const cachePrefix = realpathSync(mkdtempSync(path.join(tmpdir(), 'circular-observer-cache-')));
    const child = spawn(pythonPath, ['-I', '-B', '-X', `pycache_prefix=${cachePrefix}`, '-c', helperBinding.data.toString('utf8')],
      {cwd: root, env: {...process.env, LC_ALL: 'C'}, stdio: ['pipe', 'pipe', 'pipe']});
    record.pid = child.pid;
    let timer, escalation, cancelled = false, streamError;
    const output = {stdout: [], stderr: []};
    const cancel = reason => {
      if (record.closed || cancelled) return;
      cancelled = true; record.cancellation = reason;
      // An open direct ChildProcess handle is the only signaling authority.
      try { if (!record.exitObserved) child.kill('SIGTERM'); } catch (error) { streamError ??= error; }
      escalation = setTimeout(() => {
        if (!record.closed && !record.exitObserved) {
          record.escalated = true;
          try { child.kill('SIGKILL'); } catch (error) { streamError ??= error; }
        }
      }, Math.max(1, Math.min(100, end - performance.now() - 10)));
    };
    const interrupted = () => { if (!context.cleanup) cancel('owner-interrupted'); };
    const actual = new Promise((resolve, reject) => {
      const consume = which => bytes => {
        record[which + 'Bytes'] += bytes.length; totalBytes += bytes.length;
        if (record.stdoutBytes + record.stderrBytes > maximumProbeBytes * 2 || totalBytes > maximumTotalBytes) {
          record.droppedBytes += bytes.length; cancel('observer-output-limit'); return;
        }
        output[which].push(Buffer.from(bytes)); record.retainedBytes += bytes.length;
      };
      child.stdout.on('data', consume('stdout')); child.stderr.on('data', consume('stderr'));
      for (const stream of [child.stdin, child.stdout, child.stderr]) stream.on('error', error => { streamError ??= error; cancel('observer-stream-error'); });
      child.once('error', error => { streamError ??= error; record.spawnError = error.message; });
      child.once('exit', () => { record.exitObserved = true; });
      child.once('close', (code, exitSignal) => {
        clearTimeout(timer); clearTimeout(escalation); signal?.removeEventListener('abort', interrupted);
        record.closed = true; record.closedMilliseconds = performance.now(); record.exitCode = code; record.exitSignal = exitSignal;
        record.wallSeconds = (record.closedMilliseconds - record.startedMilliseconds) / 1000;
        record.cpuUpperBoundSeconds = record.wallSeconds * processorCount;
        const raw = Buffer.concat(output.stdout), errors = Buffer.concat(output.stderr);
        record.stdoutSha256 = sha(raw); record.stderrSha256 = sha(errors);
        try {
          demand(readdirSync(cachePrefix).length === 0, 'unexpected executable bytecode cache appeared');
          rmSync(cachePrefix, {recursive:true});
          demand(record.closedMilliseconds < end && !cancelled && !streamError && !record.droppedBytes && code === 0 && exitSignal === null,
            'observer failed, interrupted, incomplete, or closed after its allowance');
          demand(errors.length === 0, 'observer stderr is not empty');
          const result = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(raw));
          if (mode === 'inventory') {
            demand(result.schema === 'circular-observer-runtime.v1' && result.pid === child.pid && result.parentPid === process.pid, 'runtime initialization identity differs');
            demand(Array.isArray(result.runtime) && result.runtime.length > 0 && result.runtime.length <= 256, 'runtime census invalid');
            runtime = result.runtime.map(row => ({path: row.path, realPath: realpathSync(row.path)}));
            record.runtimeFiles = runtime.length;
            record.helperResourceUsageBeforeSerialization = result.helperResourceUsageBeforeSerialization;
            demand(result.helperResourceUsageBeforeSerialization && ['userSeconds','systemSeconds','maximumResidentBytes'].every(key => Number.isFinite(result.helperResourceUsageBeforeSerialization[key]) && result.helperResourceUsageBeforeSerialization[key] >= 0), 'initialization resource measurement missing');
            maximumRSS = Math.max(maximumRSS, result.helperResourceUsageBeforeSerialization.maximumResidentBytes);
            demand(maximumRSS <= maximumSampledResidentBytes, 'observer resident resource ceiling exceeded');
            resolve(result); return;
          }
          demand(result.schema === 'circular-process-observation.v1' && result.pid === child.pid && result.parentPid === process.pid &&
            result.psClosed === true && result.psExitCode === 0 && result.stopReason === null &&
            result.droppedBytes?.stdout === 0 && result.droppedBytes?.stderr === 0, 'probe identity or ps closure differs');
          demand(runtime && JSON.stringify(result.runtime.map(row => row.path)) === JSON.stringify(runtime.map(row => row.path)), 'loaded observer runtime census changed');
          const table = parseCircularObservation(result.stdout);
          const helperRow = table.find(row => row.pid === child.pid && row.ppid === process.pid);
          const psRow = table.find(row => row.pid === result.psPid && row.ppid === child.pid);
          demand(helperRow && psRow && helperRow.pgid === result.processGroup, 'actual helper and ps birth identities absent');
          for (const usage of [result.psResourceUsage, result.helperResourceUsageBeforeSerialization])
            demand(usage && ['userSeconds','systemSeconds','maximumResidentBytes'].every(key => Number.isFinite(usage[key]) && usage[key] >= 0), 'observer resource measurement missing');
          record.identity = helperRow; record.psIdentity = psRow; record.psClosed = true;
          record.psResourceUsage = result.psResourceUsage;
          record.helperResourceUsageBeforeSerialization = result.helperResourceUsageBeforeSerialization;
          record.sampledObserverResidentBytes = helperRow.residentBytes + psRow.residentBytes;
          const selected = new Set([process.pid]);
          for (const [pid, prior] of retained) {
            const current = table.find(row => row.pid === pid);
            if (!current) { retained.delete(pid); continue; }
            demand(current.started === prior.started && current.pgid === prior.pgid, 'retained sampled process identity changed');
            selected.add(pid);
          }
          let changed;
          do { changed = false; for (const row of table) if (!selected.has(row.pid) && selected.has(row.ppid)) { selected.add(row.pid); changed = true; } } while (changed);
          const owned = table.filter(row => selected.has(row.pid));
          demand(owned.some(row => row.pid === process.pid), 'launcher missing from process observation');
          for (const row of owned) if (![child.pid, result.psPid].includes(row.pid)) retained.set(row.pid, row);
          record.sampledAggregateResidentBytes = owned.reduce((sum, row) => sum + row.residentBytes, 0);
          record.sampledOwnedProcesses = owned;
          maximumRSS = Math.max(maximumRSS, record.sampledObserverResidentBytes,
            record.sampledAggregateResidentBytes,
            result.psResourceUsage.maximumResidentBytes + result.helperResourceUsageBeforeSerialization.maximumResidentBytes);
          demand(maximumRSS <= maximumSampledResidentBytes, 'observer resident resource ceiling exceeded');
          resolve(table);
        } catch (error) { record.failure = error.message; reject(sticky(error)); }
      });
      timer = setTimeout(() => cancel('probe-deadline'), Math.min(durationMs + 50, remaining - 25));
      signal?.addEventListener('abort', interrupted, {once: true}); if (signal?.aborted) interrupted();
      child.stdin.end(JSON.stringify({mode, durationMs, maximumBytes: maximumProbeBytes}) + '\n');
    });
    pending.add(actual); actual.then(() => pending.delete(actual), () => pending.delete(actual));
    return actual;
  }
  return {
    initialize: () => execute('inventory', {remainingMs: Math.min(5000, completionEnd - performance.now()), originalDeadlineMs: completionEnd}),
    inspect(context) { try { return execute('table', context); } catch (error) { throw sticky(error); } },
    recheck,
    async finish() {
      await Promise.allSettled([...pending]);
      demand(performance.now() < completionEnd, 'observation close exceeded original deadline');
      demand(pending.size === 0 && probes.every(row => row.closed), 'observer closure is incomplete');
      recheck(); finished = true;
      demand(!failure, failure?.message ?? 'observation failed');
      return this.snapshot();
    },
    snapshot: () => ({schema: 'circular-observation-owner.v1', accepted: false, scientificAcceptance: false,
      closed: finished && pending.size === 0, failure: failure?.message ?? null, sourceBindings: bound.map(clean), runtimeBindings: runtime,
      processorCount, processorCountInstrument: 'node:os.cpus().length, rechecked at finish', probes,
      totalCapturedAndDroppedBytes: totalBytes, maximumObservedResidentBytes: maximumRSS,
      totalProbeCPUUpperBoundSeconds: probes.every(row => Number.isFinite(row.cpuUpperBoundSeconds)) ? probes.reduce((sum, row) => sum + row.cpuUpperBoundSeconds, 0) : null,
      accountingBoundary: 'Complete child waits and probe wall upper bounds. ps wait4 CPU/maxRSS; helper self sampled before final serialization. Parent-observed wall times logical CPU count conservatively covers the full probe CPU tail. RSS observations are not a continuous hard peak guarantee. Dynamic loader/shared-cache and kernel scheduling remain platform boundaries.'}),
  };
}

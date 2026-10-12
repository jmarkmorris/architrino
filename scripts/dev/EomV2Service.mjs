import { readQualifiedSurfaceRecord, streamQualifiedSurfaceRecord } from './EomQualifiedSurfaceRecord.mjs';
import { createEomV2ProcessClient } from '../eom/EomV2ProcessClient.mjs';

export function createEomV2Service(options) {
  let client;
  const pending = new Map();
  const generations = new Map();
  const cancel = (runId, executionId) => {
    if ((!executionId || generations.get(runId) === executionId) && getClient().cancel(runId)) return true;
    if (!executionId) return false;
    const now = Date.now();
    for (const [id, expiry] of pending) if (expiry < now) pending.delete(id);
    if (pending.size >= 128) throw new Error('Cancellation budget exhausted.');
    pending.set(`${runId}\0${executionId}`, now + 5000);
    return true;
  };
  const getClient = () => client ??= createEomV2ProcessClient({ ...options, binaryPath: options.prepareBinary() });
  const send = (response, status, payload) => {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify(payload));
  };
  const body = async request => {
    const chunks = []; let bytes = 0;
    for await (const chunk of request) { bytes += chunk.length; if (bytes > 32 * 1024 * 1024) throw new Error('EOM request exceeds 32 MiB.'); chunks.push(chunk); }
    return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
  };
  async function serve(request, response) {
    const url = new URL(request.url, 'http://localhost');
    const path = url.pathname;
    if (!path.startsWith('/api/eom/v2/')) return false;
    try {
      if (request.method === 'GET' && path === '/api/eom/v2/qualified-sphere') { if (!options.repoRoot) throw new Error('Qualified record unavailable on this host.'); send(response, 200, readQualifiedSurfaceRecord(options.repoRoot)); return true; }
      if (request.method === 'GET' && path === '/api/eom/v2/qualified-sphere/raw') { if (!options.repoRoot) throw new Error('Qualified record unavailable on this host.'); const stream=streamQualifiedSurfaceRecord(options.repoRoot); response.writeHead(200, {'Content-Type':'application/json', 'Content-Disposition':'attachment; filename="stage-d-complete-record.json"','Cache-Control':'no-store'}); stream.on('error',()=>response.destroy()); response.once('close',()=>stream.destroy()); stream.pipe(response); return true; }
      if (request.method === 'GET' && path === '/api/eom/v2/progress') { send(response, 200, { progress: getClient().progress(url.searchParams.get('runId')) }); return true; }
      if (request.method === 'GET' && /^\/api\/eom\/v2\/records\/[^/]+\/raw$/.test(path)) {
        const raw = getClient().rawRecord(path.split('/')[5]);
        response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': raw.bytes, 'Content-Disposition': 'attachment; filename="eom-complete-record.json"', 'Cache-Control': 'no-store' });
        raw.stream.on('error', () => response.destroy()); response.once('close', () => raw.stream.destroy()); raw.stream.pipe(response); return true;
      }
      if (request.method === 'GET' && path === '/api/eom/v2/capabilities') { send(response, 200, await getClient().execute('{"operation":"capabilities"}')); return true; }
      if (request.method === 'GET' && path.startsWith('/api/eom/v2/checkpoints/')) { send(response, 200, getClient().readCheckpoint(path.split('/').at(-1))); return true; }
      if (request.method !== 'POST') { send(response, 405, { code: 'unsupported_method' }); return true; }
      const raw = await body(request);
      if (path === '/api/eom/v2/cancel') {
        const data = getClient().validateCancel(raw);
        send(response, 200, { cancellationRequested: cancel(data.runId,data.executionId), durable: false }); return true;
      }
      const operations = { '/api/eom/v2/inspect': 'inspect', '/api/eom/v2/evolve': 'evolve', '/api/eom/v2/resume': 'resume', '/api/eom/v2/evolve-record': 'evolve', '/api/eom/v2/resume-record': 'resume' };
      const operation = operations[path];
      if (!operation) { send(response, 404, { code: 'unsupported_operation' }); return true; }
      // Forward raw user JSON to C++: JSON.parse must not strip duplicate keys.
      const parsed = JSON.parse(raw);
      if (operation === 'resume' && parsed.operation !== 'resume') throw new Error('Resume envelope operation mismatch.');
      const wire = operation === 'resume' ? raw : `{"operation":"${operation}","request":${raw}}`;
      const runId = operation === 'resume' ? parsed.request?.runId : parsed.runId;
      const executionId = request.headers['x-eom-execution-id'];
      if (executionId !== undefined && (typeof executionId !== 'string' || !executionId.length || executionId.length>128)) throw new Error('Invalid execution identity.');
      const cancelled = () => { if (!response.writableEnded && typeof runId === 'string') cancel(runId,executionId); };
      response.once('close', cancelled);
      try {
        const result = getClient().execute(wire, { runId, retainRecord: path.endsWith('-record') });
        if(operation!=='inspect')generations.set(runId,executionId);
        const pendingKey = `${runId}\0${executionId}`;
        const expiry = pending.get(pendingKey); pending.delete(pendingKey);
        if (expiry >= Date.now()) getClient().cancel(runId);
        const payload = await result;
        if (!response.destroyed) send(response, payload.schema === 'eom_error/v2' ? 400 : 200, payload);
      } finally { if(generations.get(runId)===executionId)generations.delete(runId);response.off('close', cancelled); }
    } catch (error) { if (!response.destroyed) send(response, 400, { schema: 'eom_error/v2', code: error.code ?? 'invalid_request', error: error.message, ...(error.recordId ? { retainedFailure: { recordId:error.recordId, rawBytes:error.rawBytes ?? error.partialBytes, acceptedTime:error.acceptedTime ?? null, checkpointId:error.checkpointId ?? null, completeExport:false } } : {}) }); }
    return true;
  }
  return Object.freeze({ serve, dispose: () => client?.dispose() });
}

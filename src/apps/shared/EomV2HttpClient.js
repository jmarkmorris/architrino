import { postEomJson } from './EomJsonHttp.js';

export function createEomV2HttpClient({ endpoint = '/api/eom/v2', fetchImpl = globalThis.fetch } = {}) {
  if (typeof fetchImpl !== 'function') throw new TypeError('EOM client requires fetch.');
  const active = new Map();
  let disposing = false;
  const inspect = request => {
    if (disposing) throw new Error('EOM client is disposed.');
    return postEomJson(fetchImpl, `${endpoint}/inspect`, request);
  };
  const cancel = (runId, executionId) => postEomJson(fetchImpl, `${endpoint}/cancel`, { runId, ...(executionId ? { executionId } : {}) });
  async function run(request, body, route, { expectedModelDigest, signal, onProgress } = {}) {
    const model = await inspect(request);
    if (disposing) throw new Error('EOM client disposed during inspection.');
    if (expectedModelDigest && model.modelDigest !== expectedModelDigest) throw new Error('The EOM service model differs from the inspected or retained model. Inspect a new preparation to start a new run.');
    if (signal?.aborted) throw new DOMException('Calculation cancelled before launch.', 'AbortError');
    const executionId = globalThis.crypto.randomUUID();
    let cancellationTimer;
    const startProgress = () => onProgress ? setInterval(async () => { try { const reply = await fetchImpl(`${endpoint}/progress?runId=${encodeURIComponent(request.runId)}`); if (reply.ok) { const { progress } = await reply.json(); if (progress) onProgress(progress); } } catch {} }, 500) : undefined;
    const abort = () => {
      const requestCancellation = () => { cancel(request.runId,executionId).catch(() => {}); };
      requestCancellation();
      cancellationTimer ??= setInterval(requestCancellation,250);
    };
    if (active.has(request.runId)) throw new Error('Run identity already active.');
    let complete;
    active.set(request.runId, { executionId, requestCancellation: abort, completion: new Promise(resolve => { complete = resolve; }) }); signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) abort();
    const progressTimer = startProgress();
    try {
      // Keep receiving after cancellation so durable accepted coverage returns.
      const result = await postEomJson(fetchImpl, `${endpoint}/${route}`, body, undefined, 'EOM', { 'X-EOM-Execution-Id': executionId });
      if (result.schema !== 'eom_evolution_response/v2' || result.modelDigest !== model.modelDigest || result.runId !== request.runId || JSON.stringify(result.resolvedModel)!==JSON.stringify(model.resolvedModel)) throw Object.assign(new Error('EOM response model differs from inspection.'),result.record?.artifact ? {retainedFailure:{recordId:result.record.artifact.id,rawBytes:result.record.artifact.bytes,acceptedTime:result.acceptedCoverage?.end ?? null,checkpointId:result.checkpoint?.id ?? null,completeExport:false}} : {});
      complete({ result });
      return result;
    } catch (error) { complete({ error }); throw error; }
    finally { clearInterval(progressTimer); clearInterval(cancellationTimer); active.delete(request.runId); signal?.removeEventListener('abort', abort); }
  }
  return Object.freeze({
    inspect, cancel,
    async capabilities() { const response = await fetchImpl(`${endpoint}/capabilities`); if (!response.ok) throw new Error('EOM capabilities unavailable.'); return response.json(); },
    async readCheckpoint(id) { const response = await fetchImpl(`${endpoint}/checkpoints/${encodeURIComponent(id)}`); if (!response.ok) throw new Error('EOM checkpoint unavailable.'); return response.json(); },
    evolveRecord(request, options) { return run(request, request, 'evolve-record', options); },
    resumeRecord(request, checkpoint, endTime, options) { return run(request, { operation: 'resume', request, checkpoint, endTime }, 'resume-record', options); },
    evolve(request, options) { return run(request, request, 'evolve', options); },
    resume(request, checkpoint, endTime, options) { return run(request, { operation: 'resume', request, checkpoint, endTime }, 'resume', options); },
    async dispose() {
      disposing = true;
      const states = [...active]; for(const [,state] of states)state.requestCancellation();
      const finished = await Promise.all(states.map(([, state]) => state.completion));
      for (const terminal of finished) {
        if (terminal.error) throw terminal.error;
        if (!terminal.result.checkpoint?.durable) throw new Error('Disposal reached an accepted boundary without durable checkpoint storage.');
      }
    },
  });
}

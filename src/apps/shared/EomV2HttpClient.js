import { createEomPathBuffer } from './EomPathBuffer.js';
import { postEomStream } from './EomStreamHttp.js';
import {errorBoundChecking} from './ErrorBoundChecking.js';
import { eomModelOptions, selectEomModel } from './EomModelSelection.js';
import { postEomJson } from './EomJsonHttp.js';
import { canonicalJson, checkedEomRuntime, eomExecutionDigest, eomRequestVersion, expectedEomExecution, refuseEomRuntimeOnEvolve } from './EomExecutionIdentity.js';

export function createEomV2HttpClient({ endpoint = '/api/eom/v2', fetchImpl = globalThis.fetch } = {}) {
  if (typeof fetchImpl !== 'function') throw new TypeError('EOM client requires fetch.');
  const active = new Map();
  let disposing = false;
  const inspect = request => {
    if (disposing) throw new Error('EOM client is disposed.');
    return postEomJson(fetchImpl, `${endpoint}/inspect`, request);
  };
  const cancel = (runId, executionId) => postEomJson(fetchImpl, `${endpoint}/cancel`, { runId, ...(executionId ? { executionId } : {}) });
  async function run(request, body, route, { expectedModelDigest, signal, onProgress, onPaths, checkpointMode = "inline" } = {}) {
    if (!["inline", "reference"].includes(checkpointMode) || (checkpointMode === "reference" && !route.endsWith("-record"))) throw new TypeError("Checkpoint references require a retained record operation.");
    // A v3 request's normalized execution and its digest are fixed before
    // anything is sent; inspection and result must both be that execution.
    // Only v2 and v3 requests are admitted; anything else is refused before
    // any call.
    const v3 = eomRequestVersion(request) === 'v3';
    const expected = v3 ? expectedEomExecution(request) : null;
    const expectedDigest = v3 ? await eomExecutionDigest(expected.execution) : null;
    const boundTo = document => document.executionDigest === expectedDigest && canonicalJson(document.execution) === canonicalJson(expected.execution)
      && document.resources?.maximumAcceptedSteps === expected.maximumAcceptedSteps;
    const model = await inspect(request);
    if (v3 && (model.schema !== 'eom_inspection/v3' || !boundTo(model))) throw Object.assign(new Error('EOM inspection is not the v3 execution this request declares; nothing was launched.'), { code: 'execution_binding_mismatch' });
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
    const progressTimer = route.includes('stream') ? undefined : startProgress();
    const pathBuffer = route.includes('stream') ? createEomPathBuffer(request,model.modelDigest,{start:body.operation==='resume'?body.checkpoint.acceptedTime:request.interval.start,end:body.endTime??request.interval.end}) : null;
    try {
      // Keep receiving after cancellation so durable accepted coverage returns.
      const headers={ 'X-EOM-Execution-Id': executionId, ...(checkpointMode === 'reference' ? { 'X-EOM-Checkpoint-Mode': 'reference' } : {}) };
      const result = pathBuffer ? await postEomStream(fetchImpl,`${endpoint}/${route}`,body,headers,async event=>{pathBuffer.accept(event);await onPaths?.(event,pathBuffer);}) : await postEomJson(fetchImpl, `${endpoint}/${route}`, body, undefined, 'EOM', headers);
      // A v3 request needs a v3 inspection and a v3 response bound to the
      // same execution; a v2 request keeps its v2 response check.
      const executionMismatch = v3 && !boundTo(result);
      if (result.schema !== (v3 ? 'eom_evolution_response/v3' : 'eom_evolution_response/v2') || executionMismatch || (result.errorBoundChecking??'strict')!==errorBoundChecking(request) || result.modelDigest !== model.modelDigest || result.runId !== request.runId || JSON.stringify(result.resolvedModel)!==JSON.stringify(model.resolvedModel)) throw Object.assign(new Error('EOM response model differs from inspection.'),result.record?.artifact ? {retainedFailure:{recordId:result.record.artifact.id,rawBytes:result.record.artifact.bytes,acceptedTime:result.acceptedCoverage?.end ?? null,checkpointId:result.checkpoint?.id ?? null,completeExport:false}} : {});
      pathBuffer?.reconcile(result);
      complete({ result });
      return result;
    } catch (error) { complete({ error }); throw error; }
    finally { clearInterval(progressTimer); clearInterval(cancellationTimer); active.delete(request.runId); signal?.removeEventListener('abort', abort); }
  }
  // A control refused before any request is returned as a rejection, as
  // every other client failure is.
  const refusedBeforeLaunch = check => { try { check(); return null; } catch (error) { return Promise.reject(error); } };
  const capabilities = async () => { const response = await fetchImpl(`${endpoint}/capabilities`); if (!response.ok) throw new Error('EOM capabilities unavailable.'); return response.json(); };
  return Object.freeze({
    async modelOptions(filter) { return eomModelOptions(await capabilities(), filter); },
    async selectModel(selection) { return selectEomModel(await capabilities(), selection); },
    inspect, cancel,
    capabilities,
    async readCheckpoint(id) { const response = await fetchImpl(`${endpoint}/checkpoints/${encodeURIComponent(id)}`); if (!response.ok) throw new Error('EOM checkpoint unavailable.'); return response.json(); },
    evolveStreamRecord(request, options = {}) { return refusedBeforeLaunch(() => refuseEomRuntimeOnEvolve(options)) ?? run(request,request,'evolve-stream-record',options); },
    resumeStreamRecord(request, checkpoint, endTime, options = {}) { let runtime;const refused=refusedBeforeLaunch(()=>{runtime=checkedEomRuntime(request,options.runtime);});if(refused)return refused;return run(request,{operation:'resume',request,checkpoint,endTime,...(runtime?{runtime}:{})},'resume-stream-record',options); },
    evolveRecord(request, options = {}) { return refusedBeforeLaunch(() => refuseEomRuntimeOnEvolve(options)) ?? run(request, request, 'evolve-record', options); },
    // options.runtime = {threadCount} is the v3 resume worker override; it is
    // refused for any other request rather than dropped.
    resumeRecord(request, checkpoint, endTime, options = {}) { let runtime; const refused = refusedBeforeLaunch(() => { runtime = checkedEomRuntime(request, options.runtime); }); if (refused) return refused; return run(request, { operation: 'resume', request, checkpoint, endTime, ...(runtime ? { runtime } : {}) }, 'resume-record', options); },
    evolve(request, options = {}) { return refusedBeforeLaunch(() => refuseEomRuntimeOnEvolve(options)) ?? run(request, request, 'evolve', options); },
    resume(request, checkpoint, endTime, options = {}) { let runtime; const refused = refusedBeforeLaunch(() => { runtime = checkedEomRuntime(request, options.runtime); }); if (refused) return refused; return run(request, { operation: 'resume', request, checkpoint, endTime, ...(runtime ? { runtime } : {}) }, 'resume', options); },
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

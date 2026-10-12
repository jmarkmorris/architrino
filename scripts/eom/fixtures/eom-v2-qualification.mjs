// Manual change qualification; no recurring suite enrollment.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer, request as httpRequest } from 'node:http';
import { resolve } from 'node:path';
import { createEomV2ProcessClient } from '../EomV2ProcessClient.mjs';
import { createEomV2Service } from '../../dev/EomV2Service.mjs';
import { createEomV2HttpClient } from '../../../src/apps/shared/EomV2HttpClient.js';

const hash = value => createHash('sha256').update(value).digest('hex');
const ordered = value => Array.isArray(value) ? `[${value.map(ordered).join(',')}]` : value && typeof value === 'object' ? `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${ordered(value[key])}`).join(',')}}` : JSON.stringify(value);
assert.equal(hash('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.equal(ordered({ z: 2, a: [{ c: 'x', b: 1 }] }), '{"a":[{"b":1,"c":"x"}],"z":2}');
console.log('Known SHA-256 and canonical JSON controls passed before checkpoint targets.');
const clone = structuredClone;
const seal = checkpoint => { const copy = clone(checkpoint); delete copy.digest; return { ...copy, digest: hash(ordered(copy)) }; };
const binaryPath = resolve(process.argv[2] ?? '.tmp/eom-provider-stage-a/build/eom_borg_shadow_cli');
const checkpointRoot = resolve('.local-data/eom-v2/qualification-checkpoints');
const client = createEomV2ProcessClient({ binaryPath, checkpointRoot });
const numerics = { initialStep: '0.02', minimumStep: '0.00125', maximumStep: '0.02', rootTolerance: '1e-8', accelerationTolerance: '1e-4', positionTolerance: '1e-4', velocityTolerance: '1e-4', correctionTolerance: '1e-4', surfacePositionTolerance: '1e-4', surfaceTangentVelocityTolerance: '1e-4', maxStepAttempts: 100, maxRejectedSteps: 20 };
const surface = () => ({ schema: 'eom_evolution_request/v2', runId: 'surface-wire', model: { compositionId: 'canonical-surface/v1', constraint: 'surface', speedDomain: 'strict', boundaryPolicy: 'halt', fieldSpeed: '1', geometry: { kind: 'sphere', radius: '1' } }, interval: { start: '0', end: '0.04' }, numerics, paths: [{ pathId: 'a', charge: '1', history: { kind: 'uniform-circular', start: '-4', end: '0', maximumSegmentStep: '0.05', radius: '1', height: '0', angularSpeed: '0.5', speed: '0.5', phase: '0' } }] });
const canonical = (position = '0') => ({ schema: 'eom_evolution_request/v2', runId: 'canonical-wire', model: { fieldSpeed: '1' }, interval: { start: '0', end: '0.04' }, numerics, paths: [{ pathId: 'a', charge: '1', history: { kind: 'cubic', segments: [{ start: '-4', end: '0', coefficients: [[position, '0.1', '0', '0'], ['0','0','0','0'], ['0','0','0','0']], positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] }] } }] });
const execute = (operation, request, extra={}) => client.execute(JSON.stringify({ operation, ...(request ? { request } : {}), ...extra }), { runId: request?.runId });
const denied = (result, code) => { assert.equal(result.schema,'eom_error/v2',JSON.stringify(result)); if (code) assert.equal(result.code,code); };
try {
  const caps = await execute('capabilities'); assert.equal(caps.v2Evolution,true); assert.equal(caps.providerAwareCheckpoint,true);
  for (const raw of [
    '{"operation":"capabilities","oper\\u0061tion":"inspect"}',
    '{"operation":"inspect","request":{"schema":"eom_evolution_request/v2","model":{"":"x","":"y"}}}',
    '{"operation":"inspect","request":{"schema":"eom_evolution_request/v2","paths":[{"pathId":"a","pathId":"b"}]}}',
  ]) denied(await client.execute(raw),'duplicate_json_key');
  denied(await execute('inspect',{ schema: 'eom_evolution_request/v2', surprise: true }),'unknown_request_field');
  denied(await execute('inspect',{ schema: 'eom_evolution_request/v2', model: { fieldSpeed: 1 } }),'invalid_request_type');
  denied(await execute('inspect',{ schema: 'eom_evolution_request/v2', numerics: { rootMaxCells: 9007199254740992 } }),'invalid_request_type');
  const tooMany = surface(); tooMany.paths[0].history.maximumSegmentStep='1e-100'; denied(await execute('inspect',tooMany),'history_budget_exhausted');
  const unknown = surface(); unknown.model.compositionId='missing/v1'; denied(await execute('inspect',unknown),'unsupported_model_combination');
  const fullRequest=surface(); const inspection=await execute('inspect',fullRequest);
  assert.equal(hash(ordered(inspection.resolvedModel)),inspection.modelDigest);
  const full=await execute('evolve',fullRequest); assert.equal(full.status,'completed'); assert.equal(full.checkpoint.durable,true);
  assert.equal(full.modelDigest,inspection.modelDigest); assert.equal(seal(full.checkpoint.data).digest,full.checkpoint.digest);
  assert.deepEqual(client.readCheckpoint(full.checkpoint.id),full.checkpoint.data);
  assert.equal(full.publishedExtensions[0].segments[0].start,'0');
  assert.ok(full.ledgers.surfaceSolutions.length>0);assert.ok(full.ledgers.pointRoots.length>0);
  assert.equal(full.evidence.scientificAcceptance,false);
  const prefix=clone(fullRequest);prefix.interval.end='0.02';const first=await execute('evolve',prefix);
  const resumed=await execute('resume',prefix,{checkpoint:first.checkpoint.data,endTime:'0.04'});
  assert.equal(resumed.status,'completed',JSON.stringify(resumed));assert.equal(resumed.publishedExtensions[0].fingerprint,full.publishedExtensions[0].fingerprint);
  assert.equal(resumed.publishedExtensions[0].segments[0].start,'0.02');
  for (const change of [r=>{r.model.geometry.radius='2';},r=>{r.model.speedDomain='inclusive';},r=>{r.numerics={...r.numerics,positionTolerance:'2e-4'};},r=>{r.runId='other-run';},r=>{r.paths[0].history.phase='0.1';}]) {
    const changed=clone(prefix);change(changed);denied(await execute('resume',changed,{checkpoint:first.checkpoint.data,endTime:'0.04'}));
  }
  for (const change of [cp=>{cp.histories[0].segments[0].coefficients[0][0]='999';},cp=>{cp.histories[0].segments.push(clone(cp.histories[0].segments.at(-1)));},cp=>{cp.acceptedCount++;},cp=>{cp.preparation.runId='other';},cp=>{cp.resolvedModel.build.buildDigest='changed';},cp=>{cp.providerState.extra=true;}]) {
    const changed=clone(first.checkpoint.data);change(changed);denied(await execute('resume',prefix,{checkpoint:seal(changed),endTime:'0.04'}));
  }
  const broken=clone(first.checkpoint.data);broken.acceptedTime='0.03';denied(await execute('resume',prefix,{checkpoint:broken,endTime:'0.04'}),'checkpoint_digest_mismatch');
  denied(await execute('resume',prefix,{checkpoint:{schema:'native_evolution_checkpoint/v7'},endTime:'0.04'}),'checkpoint_schema_mismatch');
  const cr=canonical(); const cf=await execute('evolve',cr);assert.equal(cf.status,'completed',JSON.stringify(cf));
  const cprefix=clone(cr);cprefix.interval.end='0.02';const cfirst=await execute('evolve',cprefix);
  const cresume=await execute('resume',cprefix,{checkpoint:cfirst.checkpoint.data,endTime:'0.04'});assert.equal(cresume.status,'completed',JSON.stringify(cresume));assert.equal(cresume.publishedExtensions[0].fingerprint,cf.publishedExtensions[0].fingerprint);
  const other=canonical('1');other.interval.end='0.02';const oresult=await execute('evolve',other);
  const transplanted=clone(cfirst.checkpoint.data);transplanted.providerState=oresult.checkpoint.data.providerState;
  denied(await execute('resume',cprefix,{checkpoint:seal(transplanted),endTime:'0.04'}),'checkpoint_history_mismatch');
  const futureFailure=canonical();futureFailure.runId='canonical-rejected-prefix';futureFailure.interval.end='0.2';futureFailure.numerics={...numerics,initialStep:'0.1',minimumStep:'0.1',maximumStep:'0.1',maxCorrectionIterations:1,correctionTolerance:'1e-12'};
  futureFailure.paths[0].history.segments[0].coefficients[0][1]='0';const second=clone(futureFailure.paths[0]);second.pathId='b';second.charge='-1';second.history.segments[0].coefficients[0][0]='1';futureFailure.paths.push(second);
  const failedAttempt=await execute('evolve',futureFailure);assert.equal(failedAttempt.schema,'eom_evolution_response/v2',JSON.stringify(failedAttempt));assert.equal(failedAttempt.status,'halted');assert.equal(failedAttempt.checkpoint.durable,true);assert.ok(failedAttempt.ledgers.steps.some(step=>step.status==='rejected'));
  const equal=surface();equal.model.speedDomain='inclusive';equal.paths[0].history.angularSpeed='1';equal.paths[0].history.speed='1';
  const equality=await execute('evolve',equal);assert.equal(equality.acceptedStepCount,0);assert.equal(equality.status,'halted');assert.equal(equality.checkpoint.durable,true);
  const work=surface();work.runId='cancel-progress';work.interval.end='1';work.numerics={...numerics,initialStep:'0.01',maximumStep:'0.01',maxStepAttempts:200};
  let seen=0;const stopped=await client.execute(JSON.stringify({operation:'evolve',request:work}),{runId:work.runId,onProgress:event=>{seen=event.acceptedStepCount;client.cancel(work.runId);}});
  assert.ok(seen>0);assert.equal(stopped.status,'halted');assert.ok(stopped.acceptedStepCount<100);assert.equal(stopped.checkpoint.durable,true);assert.deepEqual(client.readCheckpoint(stopped.checkpoint.id),stopped.checkpoint.data);
  const immediate={...work,runId:'cancel-before-ready'};const pending=execute('evolve',immediate);assert.equal(client.cancel(immediate.runId),true);const zero=await pending;assert.equal(zero.status,'halted');assert.equal(zero.checkpoint.durable,true);
  const expanded=canonical();expanded.runId='expanded-checkpoint-budget';expanded.paths[0].history={...surface().paths[0].history,maximumSegmentStep:'0.00008'};
  const expansion=execute('evolve',expanded);assert.equal(client.cancel(expanded.runId),true);const exhausted=await expansion;
  assert.equal(exhausted.schema,'eom_evolution_response/v2');assert.equal(exhausted.acceptedStepCount,0);assert.equal(exhausted.acceptedCoverage.end,'0');assert.equal(exhausted.checkpoint.durable,false);assert.equal(exhausted.checkpoint.data,null);assert.match(exhausted.checkpoint.storageFailure,/checkpoint_size_exhausted/);
  console.log('Real process parsing, model receipts, suffix ledgers, v8/resealed negatives, canonical/Surface parity, inclusive chart halt and durable cancellation passed.');
} finally { await client.dispose(); }

const service=createEomV2Service({ prepareBinary:()=>binaryPath,checkpointRoot });
const server=createServer(async(req,res)=>{ if(!await service.serve(req,res)){res.writeHead(404);res.end();} });
await new Promise(resolveListening=>server.listen(0,'127.0.0.1',resolveListening));
const endpoint=`http://127.0.0.1:${server.address().port}/api/eom/v2`;
const browser=createEomV2HttpClient({ endpoint });
try {
  const r=surface();r.runId='browser';const model=await browser.inspect(r);const result=await browser.evolve(r,{expectedModelDigest:model.modelDigest});assert.equal(result.checkpoint.durable,true);assert.deepEqual(await browser.readCheckpoint(result.checkpoint.id),result.checkpoint.data);
  await assert.rejects(browser.evolve(r,{expectedModelDigest:'stale'}),/no longer matches/);
  const badCancel=await fetch(`${endpoint}/cancel`,{method:'POST',body:'{"runId":"x","run\\u0049d":"y"}'});
  assert.equal(badCancel.status,400);assert.equal((await badCancel.json()).code,'duplicate_json_key');
  const staleExecution=await fetch(`${endpoint}/cancel`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:r.runId,executionId:'old-generation'})});assert.equal(staleExecution.status,200);
  const unaffected=await browser.evolve(r);assert.equal(unaffected.status,'completed');
  // Split a multibyte path identity between HTTP body chunks.
  const utf8=surface();utf8.paths[0].pathId='é';const bytes=Buffer.from(JSON.stringify(utf8));const split=bytes.indexOf(Buffer.from('é'))+1;
  const inspected=await new Promise((resolveResponse,reject)=>{const req=httpRequest(`${endpoint}/inspect`,{method:'POST'},res=>{let text='';res.setEncoding('utf8');res.on('data',chunk=>text+=chunk);res.on('end',()=>resolveResponse(JSON.parse(text)));});req.on('error',reject);req.write(bytes.subarray(0,split));setTimeout(()=>req.end(bytes.subarray(split)),5);});assert.equal(inspected.schema,'eom_inspection/v2');
  const aborter=new AbortController();const raceClient=createEomV2HttpClient({endpoint,fetchImpl:(url,init)=>{if(url.endsWith('/evolve'))queueMicrotask(()=>aborter.abort());return fetch(url,init);}});
  const race=surface();race.runId='browser-launch-cancel';race.interval.end='1';race.numerics={...numerics,initialStep:'0.01',maximumStep:'0.01',maxStepAttempts:200};
  const cancelled=await raceClient.evolve(race,{signal:aborter.signal});assert.equal(cancelled.status,'halted');assert.equal(cancelled.checkpoint.durable,true);await raceClient.dispose();
  const delayedAborter=new AbortController();
  const delayedClient=createEomV2HttpClient({endpoint,fetchImpl:async(url,init)=>{if(url.endsWith('/evolve')){delayedAborter.abort();await new Promise(resolveDelay=>setTimeout(resolveDelay,6000));}return fetch(url,init);}});
  const delayed={...race,runId:'delayed-admission-cancel'};
  const delayedResult=await delayedClient.evolve(delayed,{signal:delayedAborter.signal});assert.equal(delayedResult.status,'halted');assert.equal(delayedResult.checkpoint.durable,true);await delayedClient.dispose();
  let evolutionStarted;const launchedEvolution=new Promise(resolveLaunch=>{evolutionStarted=resolveLaunch;});
  const drainClient=createEomV2HttpClient({endpoint,fetchImpl:(url,init)=>{if(url.endsWith('/evolve'))evolutionStarted();return fetch(url,init);}});
  const draining=drainClient.evolve({...race,runId:'dispose-durable'});await launchedEvolution;await drainClient.dispose();const drained=await draining;assert.equal(drained.status,'halted');assert.equal(drained.checkpoint.durable,true);
  let releaseInspection;
  const waiting=new Promise(resolveWaiting=>{releaseInspection=resolveWaiting;});let launched=false;
  const disposalClient=createEomV2HttpClient({endpoint,fetchImpl:async(url,init)=>{if(url.endsWith('/inspect'))await waiting;if(url.endsWith('/evolve'))launched=true;return fetch(url,init);}});
  const duringInspection=disposalClient.evolve(surface()).catch(error=>error);
  await disposalClient.dispose();releaseInspection();
  assert.match((await duringInspection).message,/disposed during inspection/);assert.equal(launched,false);
  await assert.rejects(disposalClient.evolve(surface()),/disposed/);
  console.log('Real HTTP/browser inspect, edit rejection, durable checkpoint retrieval, split UTF-8, duplicate cancellation, generation isolation, six-second delayed admission and durable disposal/inspection-disposal/launch cancellation passed.');
}finally { await browser.dispose();await service.dispose();await new Promise(resolveClosed=>server.close(resolveClosed)); }

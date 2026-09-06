// Shared operational protocol for the public F5 caller and its batch owner.
// Scientific settings and the twelve-role evaluation stay in the caller.
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { parseObservation, parseHostResource, acceptRSS } from './launch-prescribed-response-pilot.mjs';
import { descendantRecords, currentOwnedGroup } from './launch-subfield-circular-root-pilot.mjs';

export { parseHostResource, acceptRSS, descendantRecords, currentOwnedGroup };
export const BATCH_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const SHARED_LOCK = resolve(BATCH_ROOT, '.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock');
export const STAGE_GATE = resolve(BATCH_ROOT, 'scripts/eom/f5-registered-stage-gate.mjs');
export const requireBatch = (condition, message) => { if (!condition) throw Error(message); };
export const sameIdentity = (a, b) => Boolean(a && b && a.pid === b.pid && a.pgid === b.pgid && a.started === b.started);
export const probeBatch = (command, args) => new Promise((done, fail) => execFile(command, args,
  { timeout: 1000, maxBuffer: 8 * 1024 ** 2, env: { PATH:'/usr/bin:/bin', LC_ALL:'C', LANG:'C' } },
  (error, stdout) => error ? fail(error) : done(stdout)));
export async function observeBatch() {
  return parseObservation(await probeBatch('/bin/ps', ['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,comm=']));
}
function assertCampaignRenewal(original, current, readBoundJson) {
  const admission=current.operationalAdmission, descriptor=admission.campaignRenewal;
  requireBatch(typeof readBoundJson==='function', 'campaign renewal requires authenticated JSON reader');
  const binding=b=>{
    requireBatch(b && typeof b.path==='string' && Number.isSafeInteger(b.bytes) && b.bytes>=0 && /^[a-f0-9]{64}$/u.test(b.sha256), 'invalid renewal binding');
    return {path:resolve(BATCH_ROOT,b.path),bytes:b.bytes,sha256:b.sha256};
  };
  const same=(a,b)=>isDeepStrictEqual(binding(a),binding(b));
  const sources=new Map();
  for(const b of current.sourceBindings) {
    const p=binding(b).path;
    requireBatch(!sources.has(p), 'duplicate normalized renewal source path'); sources.set(p,b);
  }
  const read=(b, inventoried=false)=>{
    const expected=binding(b);
    if(inventoried) requireBatch(sources.has(expected.path) && same(sources.get(expected.path),b), 'renewal input missing from source inventory');
    const captured=readBoundJson(expected.path,1024*1024);
    requireBatch(same(captured,b), 'authenticated renewal input differs');
    requireBatch(captured.value && typeof captured.value==='object' && !Array.isArray(captured.value), 'renewal JSON object required');
    return captured.value;
  };
  const renewal=read(descriptor,true);
  requireBatch(renewal.schema==='braid-program/f5-benchmark-campaign-renewal.v1' && renewal.approved===true &&
    renewal.scope==='operational-time-renewal-only', 'explicit time-only renewal required');
  requireBatch(same(renewal.originalDeclaration,admission.originalDeclaration) &&
    isDeepStrictEqual(read(renewal.originalDeclaration),original), 'renewal original declaration differs');
  requireBatch(same(renewal.scientificCaseFreeze,admission.scientificCaseFreeze), 'renewal scientific case freeze differs');
  const cases=['serial-1','serial-2','parallel-1','parallel-2','isolation-1','isolation-2'];
  requireBatch(renewal.caseId==='f5-ordinary-evolution-20260827' && isDeepStrictEqual(renewal.caseIds,cases), 'renewal case census differs');
  requireBatch(renewal.scientificChangesAuthorized===false && renewal.limitsChangesAuthorized===false &&
    renewal.automaticExtensionAuthorized===false, 'renewal exceeds time-only scope');
  requireBatch(renewal.originalCampaignStart===original.campaignStart && renewal.originalCampaignDeadline===original.campaignDeadline,
    'renewal historical dates differ');
  requireBatch(current.campaignStart===renewal.authorizedStart && current.campaignDeadline===renewal.authorizedDeadline,
    'campaign dates differ from renewal');
  const start=Date.parse(renewal.authorizedStart),end=Date.parse(renewal.authorizedDeadline);
  requireBatch(Number.isFinite(start) && Number.isFinite(end) && end-start===12*60*60*1000 && start>=Date.parse(original.campaignDeadline),
    'renewal must be a distinct fixed twelve-hour window');
  const window=read(renewal.window,true), startTool=read(renewal.startTool,true);
  let authorizedMessage='y';
  let dateCommands=["date -u '+%Y-%m-%dT%H:%M:%SZ'"];
  if(renewal.authorizationMode!==undefined) {
    requireBatch(renewal.authorizationMode==='prompt-execution-v1', 'unknown renewal authority mode');
    const prompt=binding(renewal.prompt), requestReview=read(renewal.requestReview,true);
    requireBatch(sources.has(prompt.path) && same(sources.get(prompt.path),renewal.prompt), 'renewal prompt missing from source inventory');
    authorizedMessage='execute '+renewal.prompt.path;
    requireBatch(window.authorization?.mode===renewal.authorizationMode && startTool.authorization?.mode===renewal.authorizationMode &&
      same(window.authorization.prompt,renewal.prompt) && same(startTool.authorization.prompt,renewal.prompt) &&
      same(window.authorization.requestReview,renewal.requestReview) && same(startTool.authorization.requestReview,renewal.requestReview),
      'prompt execution authority bindings differ');
    requireBatch(requestReview.schema==='braid-program/independent-prompt-execution-authority.v1' && requestReview.accepted===true &&
      requestReview.directUserMessage===authorizedMessage && same(requestReview.prompt,renewal.prompt) &&
      requestReview.authorizedStart===current.campaignStart && requestReview.authorizedDeadline===current.campaignDeadline &&
      requestReview.scientificChangesAuthorized===false && requestReview.limitsChangesAuthorized===false &&
      requestReview.automaticExtensionAuthorized===false && isDeepStrictEqual(requestReview.actualStartTool,startTool.actualTool),
      'independently reviewed prompt execution differs');
    // Markdown bytes are authenticated by the surrounding source inventory, not
    // parsed by this JSON-only reader. This predicate checks the reviewed linkage.
    dateCommands.push('date -u +%Y-%m-%dT%H:%M:%SZ');
  } else requireBatch(window.authorization?.mode===undefined && startTool.authorization?.mode===undefined,
    'mixed renewal authority modes');
  requireBatch(window.schema==='braid-program/benchmark-campaign-window.v1' && window.recordedStart===current.campaignStart &&
    window.hardStop===current.campaignDeadline && isDeepStrictEqual(window.cases,cases) && window.authorization?.userMessage===authorizedMessage,
    'renewal window authority differs');
  requireBatch(startTool.schema==='braid-program/campaign-start-tool.v1' && startTool.hardStop===current.campaignDeadline &&
    startTool.authorization?.directUserMessage===authorizedMessage && dateCommands.includes(startTool.actualTool?.command) &&
    startTool.actualTool.exit_code===0 && startTool.actualTool.output===current.campaignStart+'\n' &&
    typeof startTool.actualTool.chunk_id==='string' && startTool.actualTool.chunk_id.length>0 &&
    Number.isFinite(startTool.actualTool.wall_time_seconds) && startTool.actualTool.wall_time_seconds>=0, 'renewal start tool differs');
  // These checks authenticate consistency, not operator consent. The separately
  // bound independent declaration review must pin the actual authorized record.
}
export function assertScientificGeneration(original, current, readBoundJson=null) {
  const changedOperationalFields = new Set(['sourceBindings', 'independentDeclarationReview', 'frozenAt']);
  if(Object.hasOwn(current.operationalAdmission??{},'campaignRenewal')) {
    assertCampaignRenewal(original,current,readBoundJson);
    changedOperationalFields.add('campaignStart'); changedOperationalFields.add('campaignDeadline');
  }
  for (const key of Object.keys(original)) if (!changedOperationalFields.has(key))
    requireBatch(isDeepStrictEqual(original[key], current[key]), `historical scientific/deadline field changed: ${key}`);
  for (const key of Object.keys(current))
    requireBatch(Object.hasOwn(original, key) || key === 'operationalAdmission', `undeclared successor field: ${key}`);
  const mutable = new Set(['scripts/eom/run-f5-ordinary-evolution.mjs', 'tests/f5-ordinary-evolution-runner.test.js'].map(p => resolve(BATCH_ROOT,p)));
  for (const old of original.sourceBindings) {
    const next = current.sourceBindings.find(b => resolve(BATCH_ROOT,b.path) === resolve(BATCH_ROOT,old.path));
    requireBatch(next && (mutable.has(resolve(BATCH_ROOT,old.path)) || isDeepStrictEqual(old,next)), `nonoperational source changed: ${old.path}`);
  }
}
export function validateCasePlan(plan, declarationBinding) {
  requireBatch(plan.schema === 'braid-program/f5-complete-evaluator-batch-plan.v1', 'wrong batch plan schema');
  requireBatch(plan.declaration.sha256 === declarationBinding.sha256 && resolve(plan.declaration.path) === declarationBinding.path, 'batch declaration differs');
  requireBatch(plan.operatorAuthorization?.approved === true && typeof plan.operatorAuthorization.statement === 'string' && plan.operatorAuthorization.statement.length > 0, 'named benchmark case approval required');
  requireBatch(plan.caseId === 'f5-ordinary-evolution-20260827' && plan.maximumWorkers === 2, 'only exact F5 case and two workers admitted');
  requireBatch(Array.isArray(plan.phases) && plan.phases.length === 3, 'serial, parallel and isolation phases required');
  const names = ['serial','parallel','isolation'];
  for (let i=0;i<3;i++) {
    const phase = plan.phases[i];
    requireBatch(phase.id === names[i] && phase.workers === (i===0?1:2), 'phase ordering or workers differs');
    requireBatch(Array.isArray(phase.cases) && phase.cases.length === 2 && Number.isFinite(phase.wallSeconds) && phase.wallSeconds > 0, 'bounded two-case phase required');
    for (const [j,c] of phase.cases.entries()) {
      requireBatch(c.id === `${phase.id}-${j+1}` && c.replicaId === `replica-${j+1}`, 'fixed phase/case census required');
      requireBatch(c.expected === (i===2&&j===0?'interrupted':'complete-bounded-unresolved'), 'unexpected case disposition');
      requireBatch(Array.isArray(c.stages) && c.stages.length === 12 && new Set(c.stages.map(s=>s.id)).size === 12, 'twelve distinct stage obligations required');
      for (const s of c.stages) requireBatch(typeof s.command === 'string' && Array.isArray(s.args) && s.args.every(x=>typeof x==='string') && /^[a-f0-9]{64}$/u.test(s.inputSha256) && Number.isSafeInteger(s.inputBytes) && s.inputBytes >= 0, 'malformed stage obligation');
    }
  }
  requireBatch(plan.finalizationReserveSeconds >= 120 && plan.cleanupSeconds === 15, 'bounded cleanup and closeout reserve required');
  requireBatch(plan.aggregateRssBytes === 2*1024**3 && plan.maximumSampleGapSeconds === 1 && plan.sampleIntervalSeconds === 0.25, 'fixed aggregate observer limits required');
  for(const key of ['outputBytes','aggregateOutputBytes','logBytes','workerLogBytes'])
    requireBatch(Number.isSafeInteger(plan[key]) && plan[key]>0, `bounded batch bytes required: ${key}`);
  requireBatch(plan.logBytes<=16*1024**2 && plan.workerLogBytes<=16*1024**2 && plan.aggregateOutputBytes<=2*1024**3 &&
    plan.outputBytes<=128*1024**2, 'batch output ceilings exceed reviewed envelope');
  requireBatch(plan.interruptionDelaySeconds===3, 'fixed bounded interruption delay required');
}
function requestOverIpc(message, expected, pending, cancelled) {
  requireBatch(process.connected && !cancelled(), 'batch control channel unavailable');
  return new Promise((done, fail) => {
    const timeout = setTimeout(() => { pending.delete(message.requestId); fail(Error('batch registration timeout')); }, 8000);
    pending.set(message.requestId, { expected, done:value=>{clearTimeout(timeout);done(value);}, fail:error=>{clearTimeout(timeout);fail(error);} });
    process.send(message, error => { if (error) { pending.delete(message.requestId); clearTimeout(timeout); fail(error); } });
  });
}
export async function connectBatchWorker({planPath, caseId, declaration, output, api, abortState, syntheticControl=null}) {
  requireBatch(process.connected && typeof process.send === 'function', 'delegated worker requires inherited IPC');
  const planBinding = api.readJson(planPath), plan = planBinding.value;
  api.authenticateBindings([plan.declaration, plan.acceptedHandoff, ...plan.sourceBindings]);
  validateCasePlan(plan,declaration);
  const planReview = api.readJson(plan.independentPlanReview);
  if(syntheticControl) {
    requireBatch(plan.syntheticControl?.controlId===syntheticControl.controlId && planReview.value.acceptedForInertOperationalControls===true &&
      planReview.value.syntheticControl===true && planReview.value.scientificLaunchAuthorized===false && planReview.value.controlId===syntheticControl.controlId &&
      planReview.value.planSha256===planBinding.sha256, 'scoped inert worker admission required');
  } else requireBatch(!plan.syntheticControl && planReview.value.syntheticControl!==true && planReview.value.accepted === true &&
    planReview.value.planSha256 === planBinding.sha256, 'independent nonsynthetic batch plan acceptance required');
  const d = declaration.value, admission = d.operationalAdmission;
  requireBatch(admission?.mode === 'registered-batch-v1', 'registered batch declaration required');
  api.authenticateBindings([admission.originalDeclaration, admission.archiveManifest, admission.archiveReview]);
  const original = api.readJson(admission.originalDeclaration.path);
  assertScientificGeneration(original.value,d,api.readJson);
  const archiveReview=api.readJson(admission.archiveReview.path).value;
  requireBatch(archiveReview.acceptedForHistoricalPreservationBeforeScopedCallerAndTestEdits === true &&
    isDeepStrictEqual(archiveReview.manifest,admission.archiveManifest), 'historical archive preservation scope/binding differs');
  const candidates = plan.phases.flatMap(p=>p.cases.map(c=>({...c,phaseId:p.id})));
  const ownedCase = candidates.find(c=>c.id===caseId);
  requireBatch(ownedCase && resolve(ownedCase.output)===output, 'case/output not in fixed batch census');
  const pending = new Map(); let cancelled = false, lease, nextRequest = 0, stageIndex = 0;
  const cancel = () => {
    cancelled = true; abortState.stopped = true;
    for (const p of pending.values()) p.fail(Error('batch control lost or cancelled')); pending.clear();
  };
  const listener = message => {
    if (message?.event === 'cancel') { cancel(); return; }
    const p = pending.get(message?.requestId);
    if (!p || p.expected !== message.event || message.caseId !== caseId || cancelled) { cancel(); return; }
    pending.delete(message.requestId); p.done(message);
  };
  process.on('message',listener); process.on('disconnect',cancel);
  const request = (event,fields,expected) => requestOverIpc({event,caseId,requestId:++nextRequest,...fields},expected,pending,()=>cancelled);
  try {
    lease = await request('worker-ready',{pid:process.pid,planSha256:planBinding.sha256,declarationSha256:declaration.sha256},'worker-admitted');
    requireBatch(lease.parent.pid===process.ppid && lease.lock.path===SHARED_LOCK, 'wrong delegated parent/lock');
    const table=await observeBatch();
    requireBatch(sameIdentity(table.find(r=>r.pid===process.ppid),lease.parent) && sameIdentity(table.find(r=>r.pid===process.pid),lease.worker), 'delegated process birth identity differs');
  } catch(error) { cancel(); process.off('message',listener); process.off('disconnect',cancel); throw error; }
  const verify = () => {
    requireBatch(!cancelled && process.connected && process.ppid===lease.parent.pid, 'batch ownership lost');
    const lock=api.capture(SHARED_LOCK,lease.lock.bytes);
    requireBatch(lock.dev===lease.lock.dev && lock.ino===lease.lock.ino && lock.sha256===lease.lock.sha256, 'batch lock identity differs');
    api.authenticateBindings([planBinding,planReview]);
  };
  verify();
  return {
    caseId, phaseId:ownedCase.phaseId, planSha256:planBinding.sha256, deadlineEpochMs:lease.deadlineEpochMs, verify,
    describeStage({command,args,input,environment,stageId,deadlineEpochMs}) {
      verify(); const expected=ownedCase.stages[stageIndex++];
      const spec={id:stageId,command,args,inputBytes:Buffer.byteLength(input),inputSha256:api.sha256(input)};
      requireBatch(expected && isDeepStrictEqual(expected,spec), 'stage not authorized or out of order');
      requireBatch(Number.isFinite(deadlineEpochMs) && deadlineEpochMs<=lease.deadlineEpochMs && deadlineEpochMs>Date.now(), 'stage deadline outside batch lease');
      return {...spec,stageId,workerPid:process.pid,cwd:BATCH_ROOT,environment,deadlineEpochMs};
    },
    async registerGate(child,spec) {
      verify();
      const reply=await request('register-stage',{gatePid:child.pid,spec},'stage-admitted');
      verify(); requireBatch(reply.gate.pid===child.pid, 'gate registration differs');
    },
    async targetEvent(message) {
      verify();
      const {event,...fields}=message;
      await request(event,fields,'target-recorded');
      verify();
    },
    finish() {
      verify(); requireBatch(stageIndex===12, 'missing declared stages');
      return {batchPlanSha256:planBinding.sha256,phaseId:ownedCase.phaseId,caseId,sharedLockReleased:false,batchOwnerPid:lease.parent.pid};
    },
    close() { process.off('message',listener); process.off('disconnect',cancel); if(process.connected)process.disconnect(); },
  };
}

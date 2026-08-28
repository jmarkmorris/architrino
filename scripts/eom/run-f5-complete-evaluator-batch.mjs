#!/usr/bin/env node
// Bounded whole-evaluator orchestration. The public F5 caller owns all science.
import { spawn } from 'node:child_process';
import { closeSync, existsSync, fsyncSync, lstatSync, mkdirSync, openSync, readdirSync, statfsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { acquireLock, authenticateBindings, canonicalFreshOutput, capture, checkOutputBudget, publish,
  readJson, releaseLock, sha256, validateLauncherEnvironment, validateSourceInventory, writeAll } from './run-f5-ordinary-evolution.mjs';
import { BATCH_ROOT, SHARED_LOCK, acceptRSS, assertScientificGeneration, currentOwnedGroup, descendantRecords,
  observeBatch, parseHostResource, probeBatch, requireBatch as check, sameIdentity, validateCasePlan } from './f5-batch-admission.mjs';

const delay = ms => new Promise(done=>setTimeout(done,ms));
const alive = pid => { try { process.kill(pid,0); return true; } catch(e) { if(e.code==='ESRCH')return false; throw e; } };
const signalGroup = (owner, signal) => { try { process.kill(-owner.identity.pgid,signal); } catch(e) { if(e.code!=='ESRCH')throw e; } };
const withoutValue = binding => ({path:binding.path,bytes:binding.bytes,sha256:binding.sha256});

export function admitTargetStart(table, gateIdentity, targetPid) {
  const gate=table.find(r=>r.pid===gateIdentity.pid), target=table.find(r=>r.pid===targetPid);
  check(sameIdentity(gate,gateIdentity),'gate identity changed before target registration');
  if(target) {
    check(target.ppid===gate.pid && target.pgid===gate.pgid,'target ownership differs or PID was reused before observation');
    return {...target,independentlyObservedLive:true};
  }
  // A short target may close before ps. The still-live registered gate retains
  // its terminal record until ACK. Do not invent a target birth observation or
  // signal this unobserved PID; cleanup remains attached to the known gate group.
  return {pid:targetPid,ppid:gate.pid,pgid:gate.pgid,started:null,independentlyObservedLive:false,
    identityEvidence:'source-bound gate spawn event; target already absent in outer observation'};
}

export function terminalCensus(planned, states) {
  check(states.size===planned.length && planned.every(c=>states.has(c.id)), 'planned case census differs');
  return planned.map(c=>{
    const s=states.get(c.id);
    check(['not-started','failed','interrupted','complete-pending-independent-review'].includes(s.status), 'nonterminal case in final census');
    return {id:c.id,replicaId:c.replicaId,expected:c.expected,status:s.status,
      failure:s.failure??null,exit:s.exit??null,worker:s.identity??null,startedAt:s.startedAt??null,
      elapsedSeconds:s.elapsedSeconds??null,output:c.output,stdout:s.stdoutBinding??null,
      terminalSeal:s.seal??null,stages:s.stageRecords??[],interruption:s.interruption??null};
  });
}

export async function main(argv=process.argv.slice(2), control=null) {
  check(argv.length===4 && argv[0]==='--plan' && argv[2]==='--phase','Usage: --plan FILE --phase serial|parallel|isolation');
  validateLauncherEnvironment();
  const start=performance.now(), startEpoch=Date.now(), cpuStart=process.resourceUsage();
  const cpuStartCapturedElapsedSeconds=(performance.now()-start)/1000;
  const planBinding=readJson(resolve(argv[1])), plan=planBinding.value, declaration=readJson(plan.declaration.path), d=declaration.value;
  const synthetic=control!==null;
  if(synthetic){
    check(typeof control.controlId==='string' && /^[a-z][a-z0-9-]{0,63}$/u.test(control.controlId) && plan.syntheticControl?.controlId===control.controlId,'distinct bound synthetic control identity required');
    check(isDeepStrictEqual(control.worker,plan.syntheticControl.worker) && Array.isArray(control.targets) && isDeepStrictEqual(control.targets,plan.syntheticControl.targets),'inert sources differ');
    authenticateBindings([control.worker,...control.targets]);
    check(control.worker.path.includes('/complete-evaluator-parallel-20260827/') && control.targets.every(b=>b.path.includes('/complete-evaluator-parallel-20260827/')),'inert control sources must stay in owned evidence lane');
  }else check(!plan.syntheticControl && d.operationalAdmission?.controlOnly!==true,'production CLI rejects synthetic control plans/declarations');
  validateCasePlan(plan,declaration); validateSourceInventory(d);
  const review=readJson(plan.independentPlanReview);
  check(review.value.planSha256===planBinding.sha256 && (synthetic ? review.value.acceptedForInertOperationalControls===true && review.value.syntheticControl===true &&
    review.value.scientificLaunchAuthorized===false && review.value.controlId===control.controlId : review.value.accepted===true && review.value.syntheticControl!==true),'independent scope-specific plan acceptance required');
  const declarationReview=readJson(d.independentDeclarationReview);
  check(declarationReview.value.declarationSha256===declaration.sha256 && (synthetic ? declarationReview.value.acceptedForInertOperationalControls===true &&
    declarationReview.value.scientificLaunchAuthorized===false && declarationReview.value.syntheticControl===true : declarationReview.value.accepted===true && declarationReview.value.syntheticControl!==true),'independent scope-specific operational declaration acceptance required');
  check(d.operationalAdmission?.mode==='registered-batch-v1','operational generation required');
  authenticateBindings([d.operationalAdmission.originalDeclaration,d.operationalAdmission.archiveManifest,d.operationalAdmission.archiveReview]);
  assertScientificGeneration(readJson(d.operationalAdmission.originalDeclaration.path).value,d);
  const phase=plan.phases.find(p=>p.id===argv[3]); check(phase,'unknown phase');
  const output=canonicalFreshOutput(phase.output);
  for(const c of phase.cases) check(resolve(c.output)===resolve(output,c.id),'case output must be a direct phase child');
  check(Date.parse(plan.campaignDeadline)===Date.parse(d.campaignDeadline),'campaign deadline cannot change');
  const hardDeadline=Date.parse(d.campaignDeadline);
  check(Date.now()+(phase.wallSeconds+plan.cleanupSeconds+plan.finalizationReserveSeconds)*1000<hardDeadline,'phase worst case and closeout do not fit remaining campaign');
  const deadline=Math.min(hardDeadline-plan.finalizationReserveSeconds*1000,startEpoch+phase.wallSeconds*1000);
  const immutable=[planBinding,declaration,review,declarationReview,plan.acceptedHandoff,...plan.sourceBindings];
  if(phase.id!=='serial' && !synthetic) {
    const predecessor=readJson(phase.predecessorReview);
    check(predecessor.value.accepted===true && predecessor.value.syntheticControl!==true && predecessor.value.planSha256===planBinding.sha256 && predecessor.value.nextPhase===phase.id,
      'measured predecessor admission required');
    authenticateBindings(predecessor.value.evidenceBindings);
    for(const b of predecessor.value.evidenceBindings)if(b.path.endsWith('batch-result.json'))check(readJson(b.path).value.syntheticControl!==true,'synthetic phase cannot admit real throughput');
    immutable.push(predecessor);
  }
  if(synthetic)check(review.value.allowedPhases?.includes(phase.id),'inert control phase not admitted');
  authenticateBindings(immutable);
  const states=new Map(phase.cases.map(c=>[c.id,{status:'not-started',stageRecords:[],nextStage:0,owners:[],fds:[],child:null,closed:false}]));
  const owners=new Map(), fds=[];
  const sampleState={beganMs:performance.now(),lastSampleMs:null,lastSampleStartedMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0};
  let lock, parent, resourcesFD, eventsFD, failed=null, stopping=false, resourceBytes=0,eventBytes=0,peakOutput=0;
  let lastHeartbeat=0, nextHost=0, stopAt=null, cleanupUnresolved=false, lastTable=[];
  let rawMaximumRssBytes=0, rawSamples=0, observationCoverageEndSeconds=null, finalObservationGapSeconds=null, cleanupDeadline=null;
  let cleanupSequence=0,cleanupPublishedDeadline=null,cleanupPublicationFailure=null,publishingCleanup=false;
  const observedIdentities=new Map();
  const logLimits={outputBytes:plan.outputBytes,aggregateOutputBytes:plan.aggregateOutputBytes};
  const setCleanupDeadline=(reason,proposed)=>{
    const next=Math.min(cleanupDeadline??Infinity,proposed);
    if(next===cleanupDeadline)return;
    cleanupDeadline=next;
    // A failed evidence write may call stop again. Preserve the failure without
    // recursively trying to log it or granting a replacement cleanup interval.
    if(publishingCleanup){cleanupPublicationFailure??='recursive failure during cleanup deadline publication';return;}
    publishingCleanup=true;
    try {
      check(eventsFD!==undefined,'cleanup began before event log opened');
      event({event:'global-cleanup-deadline',planSha256:planBinding.sha256,phaseId:phase.id,sequence:cleanupSequence+1,
        reason:String(reason),cleanupStartedElapsedSeconds:(next-plan.cleanupSeconds*1000-start)/1000,
        cleanupDeadlineElapsedSeconds:(next-start)/1000,cleanupDeadlineEpochMs:startEpoch+next-start});
      fsyncSync(eventsFD);cleanupSequence++;cleanupPublishedDeadline=next;
    }catch(e){cleanupPublicationFailure??=e.message;failed??=`cleanup deadline provenance unavailable: ${e.message}`;}
    finally{publishingCleanup=false;}
  };
  const stop=(reason,earlierDeadline=Infinity)=>{failed??=String(reason);stopping=true;stopAt??=performance.now();setCleanupDeadline(reason,Math.min(stopAt+plan.cleanupSeconds*1000,earlierDeadline));};
  const failCase=(state,reason)=>{state.failure??=String(reason);state.stopAt??=performance.now();};
  const onSignal=()=>stop('operator interruption');
  const outputFailure=error=>stop(`batch diagnostic output failure: ${error.message}`);
  process.on('SIGINT',onSignal); process.on('SIGTERM',onSignal); process.stderr.on('error',outputFailure);
  const writeRecord=(fd,value,kind)=>{
    try{
      control?.beforeRecord?.(kind,value);
      const bytes=Buffer.from(JSON.stringify(value)+'\n');
      if(kind==='resources')resourceBytes+=bytes.length;else eventBytes+=bytes.length;
      check(resourceBytes+eventBytes<=plan.logBytes,'batch observer log limit');
      writeAll(fd,bytes);
    }catch(e){stop(`batch evidence logging failed: ${e.message}`);throw e;}
  };
  const event=value=>writeRecord(eventsFD,{at:new Date().toISOString(),elapsedSeconds:(performance.now()-start)/1000,...value},'events');
  const send=(state,message)=>{if(state.child?.connected)state.child.send(message,error=>{if(error && !state.exit && !state.interruption)stop(error.message);});};
  const currentFor=state=>state.owners.flatMap(owner=>currentOwnedGroup(lastTable,owner));
  const remember=(row,state)=>{
    check(row && row.pid===row.pgid,'owned group leader required');
    const prior=owners.get(row.pgid);
    check(!prior || sameIdentity(prior.identity,row),'process group identity collision');
    const owner=prior??{identity:row,knownMembers:[row],retired:false,caseId:state.id};
    owners.set(row.pgid,owner);if(!state.owners.includes(owner))state.owners.push(owner);return owner;
  };
  const censusObservation=async(enforce=true)=>{
    if(enforce)await control?.beforeObservation?.();
    const began=performance.now(), table=await observeBatch(); lastTable=table;
    const descendants=descendantRecords(table,process.pid);
    const extra=[...owners.values()].flatMap(owner=>currentOwnedGroup(table,owner));
    const rows=[...new Map([...descendants,...extra].map(r=>[r.pid,r])).values()];
    check(sameIdentity(table.find(r=>r.pid===process.pid),parent),'batch owner identity lost');
    const stamp=performance.now(),rawRss=rows.reduce((n,r)=>n+r.rssBytes,0);
    let outputBytes=null,disk=null,outputError=null;
    try{outputBytes=checkOutputBudget(output,logLimits);disk=statfsSync(BATCH_ROOT,{bigint:true});}catch(e){outputError=e;}
    rawMaximumRssBytes=Math.max(rawMaximumRssBytes,rawRss);rawSamples++;
    for(const row of rows)observedIdentities.set(`${row.pid}/${row.started}`,row);
    let sample,sampleError;
    try{sample=acceptRSS(sampleState,rows,stamp,began);}catch(e){sampleError=e;}
    // The observation that trips a limit is evidence too. Retain its raw rows
    // even though acceptRSS deliberately refuses to update its accepted state.
    writeRecord(resourcesFD,{elapsedSeconds:(began-start)/1000,observationCompletedSeconds:(stamp-start)/1000,
      observationAccepted:!sampleError,rejection:sampleError?.message??null,aggregateResidentBytes:rawRss,
      sampleGapMs:sample?.sampleGapMs??(stamp-(sampleState.lastSampleStartedMs??sampleState.beganMs)),
      availableDiskBytes:disk?String(disk.bavail*disk.bsize):null,outputBytes,outputResourceRejection:outputError?.message??null,
      processes:rows.map(({pid,ppid,pgid,started,state,rssBytes,command})=>({pid,ppid,pgid,started,state,rssBytes,command}))},'resources');
    observationCoverageEndSeconds=(stamp-start)/1000;
    if(sampleError){stop(sampleError.message);if(enforce)throw sampleError;}
    if(outputError){stop(outputError.message);if(enforce)throw outputError;}
    for(const state of states.values())for(const row of descendantRecords(table,state.child?.pid??-1)) {
      // A gate awaiting registration has not been admitted to execute. Enroll
      // its observed birth identity for cleanup immediately, without granting GO.
      if(row.pid!==state.child?.pid && row.pgid===row.pid && row.ppid===state.child?.pid && !owners.has(row.pgid))remember(row,state);
      check(row.pid===state.child?.pid || row.pgid===state.child?.pid || state.owners.some(o=>o.identity.pgid===row.pgid), 'unregistered worker process group');
    }
    if(outputBytes!==null)peakOutput=Math.max(peakOutput,outputBytes);
    return table;
  };
  const host=async launch=>{
    authenticateBindings(immutable);validateSourceInventory(d);
    const before=performance.now(), disk=statfsSync(BATCH_ROOT,{bigint:true});
    const text=await probeBatch('/usr/bin/memory_pressure',[]);
    // Preserve raw host admission even when the threshold rejects.
    event({event:'host-probe',atLaunch:launch,stdout:text,availableDiskBytes:String(disk.bavail*disk.bsize),wallSeconds:(performance.now()-before)/1000});
    const result=parseHostResource(text,disk.bavail*disk.bsize,launch);
    await control?.afterHostAdmission?.({launch,phaseId:phase.id});
    return result;
  };
  const handle=async(state,message)=>{
    check(!stopping && !state.failure && !state.interruption && state.status==='running' && message?.caseId===state.id && Number.isSafeInteger(message.requestId),'unadmitted worker protocol');
    check(!state.seenRequests.has(message.requestId),'replayed worker request');state.seenRequests.add(message.requestId);
    const reply=(eventName,fields={})=>{
      check(!stopping && !state.failure && !state.interruption && Date.now()<deadline,'stop/deadline before positive ACK');
      try{authenticateBindings(immutable);validateSourceInventory(d);}catch(e){stop(`source admission failed: ${e.message}`);throw e;}
      check(!stopping && Date.now()<deadline,'stop/deadline after ACK admission');
      send(state,{event:eventName,caseId:state.id,requestId:message.requestId,...fields});
    };
    if(message.event==='worker-ready') {
      check(!state.admitted && message.pid===state.child.pid && message.planSha256===planBinding.sha256 && message.declarationSha256===declaration.sha256,'worker identity/manifest differs');
      const table=await observeBatch(), row=table.find(r=>r.pid===state.child.pid);
      check(row?.ppid===process.pid,'worker parent differs');state.identity=row;remember(row,state);state.admitted=true;
      reply('worker-admitted',{parent,worker:row,lock,deadlineEpochMs:deadline});return;
    }
    check(state.admitted,'worker not admitted');
    if(message.event==='register-stage') {
      check(!state.activeStage,'overlapping stages within evaluator');
      const expected=state.case.stages[state.nextStage];
      const {stageId,workerPid,cwd,environment,deadlineEpochMs,...spec}=message.spec??{};
      check(expected && isDeepStrictEqual(expected,spec) && stageId===spec.id && workerPid===state.child.pid && cwd===BATCH_ROOT &&
        isDeepStrictEqual(environment,d.runtime.childEnvironment),'stage command/environment/input is not admitted');
      const stageLimit=stageId.endsWith('geometry-process') || stageId.endsWith('sensitivity-process') ? d.operationalLimits.geometryWallSeconds :
        stageId==='independent-dynamics-process' ? d.operationalLimits.oracleWallSeconds : d.operationalLimits.wallSeconds;
      check(Number.isFinite(deadlineEpochMs) && deadlineEpochMs>Date.now() && deadlineEpochMs<=deadline && deadlineEpochMs<=Date.now()+stageLimit*1000,'stage deadline exceeds declared limit');
      const table=await observeBatch(), row=table.find(r=>r.pid===message.gatePid);
      check(row?.ppid===state.child.pid && sameIdentity(table.find(r=>r.pid===state.child.pid),state.identity),'gate parent or worker birth differs');
      const owner=remember(row,state);
      state.activeStage={id:stageId,gate:row,spec,owner,deadlineEpochMs,startedAt:new Date().toISOString()};state.nextStage++;
      event({event:'stage-registered',caseId:state.id,stageId,gate:row,spec,deadlineEpochMs});reply('stage-admitted',{gate:row});return;
    }
    const stage=state.activeStage;
    check(stage && message.gatePid===stage.gate.pid && message.stageId===stage.id,'target stage identity differs');
    if(message.event==='target-started') {
      check(!stage.target,'duplicate target start');
      const table=await observeBatch(), target=admitTargetStart(table,stage.gate,message.targetPid);
      stage.target=target;if(target.independentlyObservedLive)stage.owner.knownMembers.push(target);event({event:'target-started',caseId:state.id,stageId:stage.id,target});
      if(state.case.expected==='interrupted' && stage.id==='coarse-evolution') state.interruptAt=performance.now()+plan.interruptionDelaySeconds*1000;
      reply('target-recorded');return;
    }
    if(message.event==='target-closed') {
      check(stage.target?.pid===message.targetPid && Number.isFinite(message.targetEnvelopeSeconds),'target closure record differs');
      // Register all surviving group members before permitting gate exit.
      const table=await observeBatch();currentOwnedGroup(table,stage.owner);
      check(!table.some(r=>r.pid===message.targetPid && (!stage.target.independentlyObservedLive || r.started===stage.target.started)),'target remains live or unobserved PID reused at terminal record');
      check(!table.some(r=>r.pgid===stage.gate.pgid && r.pid!==stage.gate.pid),'target descendants remain at terminal record');
      state.stageRecords.push({id:stage.id,gate:stage.gate,target:stage.target,...message});
      state.activeStage=null;event({event:'target-closed',caseId:state.id,...message});reply('target-recorded');return;
    }
    throw Error('unknown worker protocol message');
  };
  const launch=async(c,state)=>{
    check(!stopping && Date.now()<deadline,'no remaining phase time');authenticateBindings(immutable);validateSourceInventory(d);
    await host(true);
    check(!stopping && Date.now()<deadline,'stop/deadline after host admission');
    authenticateBindings(immutable);validateSourceInventory(d);
    check(!stopping && Date.now()<deadline,'stop/deadline immediately before spawn');
    const out=openSync(resolve(output,`${c.id}.stdout.ndjson`),'wx',0o600);state.fds.push(out);
    const err=openSync(resolve(output,`${c.id}.stderr.ndjson`),'wx',0o600);state.fds.push(err);
    state.id=c.id;state.case=c;state.status='running';state.startedAt=new Date().toISOString();state.began=performance.now();state.stdoutBytes=0;state.stderrBytes=0;state.seenRequests=new Set();state.queue=Promise.resolve();
    const args=[synthetic?control.worker.path:resolve(BATCH_ROOT,'scripts/eom/run-f5-ordinary-evolution.mjs'),'--declaration',declaration.path,'--out',resolve(c.output),'--batch-plan',planBinding.path,'--batch-case',c.id];
    const child=spawn(d.runtime.node,args,{cwd:BATCH_ROOT,env:d.runtime.launcherEnvironment,detached:true,stdio:['ignore','pipe','pipe','ipc']});state.child=child;
    child.once('error',e=>failCase(state,e.message));
    child.on('message',m=>{state.queue=state.queue.then(()=>handle(state,m)).catch(e=>{if(!state.interruption)failCase(state,e.message);});});
    child.stdout.on('data',b=>{try{state.stdoutBytes+=b.length;check(state.stdoutBytes<=1024**2,'worker terminal stdout limit');writeAll(out,b);}catch(e){stop(e.message);}});
    child.stderr.on('data',b=>{try{state.stderrBytes+=b.length;check(state.stderrBytes<=plan.workerLogBytes,'worker log limit');writeAll(err,b);}catch(e){stop(e.message);}});
    child.once('exit',(code,signal)=>{state.exit={code,signal};state.elapsedSeconds=(performance.now()-state.began)/1000;if(code!==0 && !state.interruption)failCase(state,'unexpected worker exit');});
    child.once('close',()=>{state.closed=true;});
    event({event:'worker-spawn',caseId:c.id,pid:child.pid,command:d.runtime.node,args});
    // Identity is captured before any worker-admitted ACK can start a stage.
    const table=await observeBatch(),row=table.find(r=>r.pid===child.pid);if(row){state.identity=row;remember(row,state);}
  };
  const settle=async(state)=>{
    if(state.status!=='running' || !state.closed || currentFor(state).length) return;
    await state.queue;
    for(const fd of state.fds){fsyncSync(fd);closeSync(fd);}state.fds=[];
    state.stdoutBinding=withoutValue(capture(resolve(output,`${state.id}.stdout.ndjson`),1024**2));
    if(state.interruption){state.status='interrupted';return;}
    if(state.failure){state.status='failed';return;}
    if(state.exit?.code!==0){state.status='failed';state.failure??='nonzero worker exit';return;}
    try {
      const lines=capture(state.stdoutBinding.path,1024**2).data.toString('utf8').trim().split('\n');check(lines.length===1,'exactly one terminal worker seal required');
      const seal=JSON.parse(lines[0]);check(seal.operationallyComplete===true && seal.accepted===false && Boolean(seal.syntheticControl)===synthetic,'missing complete scoped operational seal');authenticateBindings([seal]);
      const invocation=readJson(seal.path);
      check(invocation.value.caseId===state.id && invocation.value.batchPlanSha256===planBinding.sha256 && invocation.value.sharedLockReleased===false,'worker seal batch identity or lock scope differs');
      check(state.stageRecords.length===12 && state.nextStage===12 && !state.activeStage,'missing stage result in complete worker');
      check(state.case.expected!=='interrupted','interruption control completed without injection');
      state.seal=seal;state.status='complete-pending-independent-review';
    }catch(e){state.status='failed';failCase(state,e.message);}
  };
  try {
    mkdirSync(output,{mode:0o700});resourcesFD=openSync(resolve(output,'resources.ndjson'),'wx',0o600);fds.push(resourcesFD);
    eventsFD=openSync(resolve(output,'events.ndjson'),'wx',0o600);fds.push(eventsFD);
    const table=await observeBatch();parent=table.find(r=>r.pid===process.pid);check(parent,'missing batch parent');
    check(!table.some(r=>r.pid!==process.pid && /(?:eom_native|eom_borg_shadow_cli|run-f5-ordinary-evolution|run-f6c|launch-f6c|prepare-f6c-continuous|reduce-prescribed|publish-prescribed)/u.test(r.command)),'competing numerical program');
    lock=acquireLock(SHARED_LOCK,{pid:parent.pid,started:parent.started,task:'f5-complete-evaluator-batch',planSha256:planBinding.sha256,phaseId:phase.id});
    sampleState.beganMs=performance.now();await censusObservation();await host(true);
    while(true) {
      if(Date.now()>=deadline)stop('phase deadline');
      await censusObservation();
      for(const s of states.values()) {
        if(s.activeStage && Date.now()>=s.activeStage.deadlineEpochMs && !s.interruption)failCase(s,`stage deadline: ${s.id}/${s.activeStage.id}`);
        if(s.interruptAt && !s.interruption && !stopping && performance.now()>=s.interruptAt) {
          check(s.identity && sameIdentity(lastTable.find(r=>r.pid===s.child.pid),s.identity),'interruption target birth differs');
          s.interruption={at:new Date().toISOString(),signal:'SIGKILL',target:s.identity,stage:'coarse-evolution',reason:'predeclared failed-worker isolation control'};
          process.kill(s.child.pid,'SIGKILL');event({event:'injected-worker-interruption',caseId:s.id,...s.interruption});
        }
        if(s.interruption || s.failure || stopping) {
          send(s,{event:'cancel'});
          for(const owner of s.owners)if(currentOwnedGroup(lastTable,owner).length)signalGroup(owner,performance.now()-(stopAt??s.stopAt??s.interruptAt)>=2000?'SIGKILL':'SIGTERM');
        }
        await settle(s);
        if(s.failure && s.status==='running' && performance.now()-s.stopAt>=plan.cleanupSeconds*1000){
          stop(`isolated worker cleanup unresolved: ${s.id}`,s.stopAt+plan.cleanupSeconds*1000);
        }
      }
      if(stopping)break;
      if(!stopping) {
        const running=[...states.values()].filter(s=>s.status==='running').length;
        if(running<phase.workers) {
          const c=phase.cases.find(c=>states.get(c.id).status==='not-started');if(c)await launch(c,states.get(c.id));
        }
      }
      if([...states.values()].every(s=>s.status!=='running') && (stopping || [...states.values()].every(s=>s.status!=='not-started')))break;
      if(performance.now()>=nextHost){nextHost=performance.now()+15000;await host(false);}
      if(performance.now()-lastHeartbeat>=15000){lastHeartbeat=performance.now();process.stderr.write(JSON.stringify({event:'f5-batch-heartbeat',phase:phase.id,elapsedSeconds:(performance.now()-start)/1000,aggregateRssBytes:sampleState.maximumSampledRSSBytes,census:[...states].map(([id,s])=>({id,status:s.status,stage:s.activeStage?.id??null})),failure:failed})+'\n');}
      await delay(250);
    }
  }catch(e){stop(e.message);}
  finally {
    // Cleanup is bounded and identity checked. Never release the shared lock
    // while any owned group or worker closure remains unresolved.
    const cleanupStart=performance.now();
    if(cleanupDeadline===null)setCleanupDeadline('normal-finalization',cleanupStart+plan.cleanupSeconds*1000);
    while([...states.values()].some(s=>s.child && (!s.closed || s.status==='running')) && performance.now()<cleanupDeadline) {
      try{await censusObservation(false);}catch(e){failed??=e.message;}
      try {
        // Logging or budget errors cannot bypass identity-safe teardown. This
        // fresh fallback observation uses the real process table, never a test
        // hook or a fabricated resource admission.
        lastTable=await observeBatch();
        for(const s of states.values()) {
          send(s,{event:'cancel'});
          for(const owner of s.owners)if(currentOwnedGroup(lastTable,owner).length)signalGroup(owner,performance.now()-(stopAt??cleanupStart)>=2000?'SIGKILL':'SIGTERM');
          await settle(s);
        }
      }catch(e){failed??=e.message;}
      await delay(25);
    }
    try{await censusObservation(false);}catch(e){cleanupUnresolved=true;failed??=e.message;}
    finalObservationGapSeconds=sampleState.lastSampleStartedMs===null?null:(performance.now()-sampleState.lastSampleStartedMs)/1000;
    if(finalObservationGapSeconds===null || finalObservationGapSeconds>1)failed??='final observation-to-closure gap exceeds one second';
    if(performance.now()>=cleanupDeadline)for(const owner of owners.values())if(currentOwnedGroup(lastTable,owner).length)signalGroup(owner,'SIGKILL');
    cleanupUnresolved ||= [...owners.values()].some(owner=>currentOwnedGroup(lastTable,owner).length || (!owner.retired && alive(-owner.identity.pgid))) || [...states.values()].some(s=>s.child&&!s.closed);
    for(const s of states.values()) {
      if(s.status==='running'){s.status='failed';s.failure??='worker closure or terminal result incomplete';}
      for(const fd of s.fds){try{fsyncSync(fd);closeSync(fd);}catch(e){failed??=e.message;}}s.fds=[];
    }
    for(const fd of fds){try{fsyncSync(fd);closeSync(fd);}catch(e){failed??=e.message;}}
    if(lock && !cleanupUnresolved){try{releaseLock(lock);lock=null;}catch(e){failed??=e.message;cleanupUnresolved=true;}}
    process.off('SIGINT',onSignal);process.off('SIGTERM',onSignal);process.stderr.off('error',outputFailure);
  }
  check(existsSync(output),'batch failed before evidence directory creation');
  try{authenticateBindings(immutable);validateSourceInventory(d);}catch(e){failed??=e.message;}
  const cpuEnd=process.resourceUsage(),cpuEndCapturedElapsedSeconds=(performance.now()-start)/1000,census=terminalCensus(phase.cases,states);
  let userCpuMicroseconds=null,systemCpuMicroseconds=null,cpuMeasurementFailure=null;
  try {
    for(const key of ['userCPUTime','systemCPUTime'])check(Number.isSafeInteger(cpuStart[key]) && cpuStart[key]>=0 &&
      Number.isSafeInteger(cpuEnd[key]) && cpuEnd[key]>=cpuStart[key],`invalid coordinator CPU counter: ${key}`);
    userCpuMicroseconds=cpuEnd.userCPUTime-cpuStart.userCPUTime;
    systemCpuMicroseconds=cpuEnd.systemCPUTime-cpuStart.systemCPUTime;
  }catch(e){cpuMeasurementFailure=e.message;failed??=e.message;}
  if(census.some(c=>c.status==='failed'))failed??='one or more isolated evaluator failures; all planned cases retained';
  const closureBinding=publish(resolve(output,'final-ownership.json'),{syntheticControl:synthetic,benchmarkEligible:false,at:new Date().toISOString(),elapsedSeconds:(performance.now()-start)/1000,
    observedIdentities:[...observedIdentities.values()],finalRelevantRows:lastTable.filter(r=>r.pid===process.pid || [...owners.values()].some(o=>o.identity.pgid===r.pgid)),
    groups:[...owners.values()].map(o=>({identity:o.identity,retired:o.retired,matchingLiveRows:currentOwnedGroup(lastTable,o),kernelGroupExists:alive(-o.identity.pgid)})),
    ownedProcessClosureEstablished:!cleanupUnresolved,sharedLockReleased:lock===null},{root:output,limits:logLimits});
  const result={schema:'braid-program/f5-complete-evaluator-batch-result.v1',accepted:false,syntheticControl:synthetic,benchmarkEligible:false,
    controlId:control?.controlId??null,independentOutcomeAndCensusReviewRequired:true,
    plan:withoutValue(planBinding),phaseId:phase.id,phaseWorkers:phase.workers,caseId:plan.caseId,census,failure:failed,
    allPlannedCasesAccountedFor:true,ownedProcessClosureEstablished:!cleanupUnresolved,sharedLockReleased:lock===null,
    elapsedSecondsThroughCleanup:(performance.now()-start)/1000,resourceSamples:sampleState,rawResourceSamples:rawSamples,rawMaximumRssBytes,
    observationCoverageEndSeconds,finalObservationGapSeconds,finalOwnership:closureBinding,peakObservedOutputBytes:peakOutput,
    observerLogBytes:resourceBytes+eventBytes,coordinatorUserCpuMicroseconds:userCpuMicroseconds,
    coordinatorSystemCpuMicroseconds:systemCpuMicroseconds,
    coordinatorCpuMeasurement:{status:cpuMeasurementFailure?'invalid':'measured',failure:cpuMeasurementFailure,pid:process.pid,
      startResourceUsage:cpuStart,endResourceUsage:cpuEnd,startCapturedElapsedSeconds:cpuStartCapturedElapsedSeconds,
      endCapturedElapsedSeconds:cpuEndCapturedElapsedSeconds,unit:'microseconds',instrument:'Node process.resourceUsage'},
    cleanupDeadlineProvenance:{lastSequence:cleanupSequence,deadlineEpochMs:cleanupDeadline===null?null:startEpoch+cleanupDeadline-start,
      deadlineElapsedSeconds:cleanupDeadline===null?null:(cleanupDeadline-start)/1000,provenanceEventCount:cleanupSequence,
      complete:cleanupPublishedDeadline===cleanupDeadline && cleanupPublicationFailure===null,publicationFailure:cleanupPublicationFailure},
    memoryScope:'simultaneously sampled coordinator, evaluator workers, stage gates, targets, observed probes and retained owned groups; short probes can fall between samples; not a continuous allocation ceiling',
    timingScope:'wall envelope includes startup authentication, observer, registration, caller checks/publication and cleanup; RSS coverage starts at first sample and ends at recorded owned-process closure; final source authentication/publication is outside RSS coverage; external review/publication excluded',
    cpuScope:'coordinator process only, main entry through post-cleanup source authentication; runtime/module startup and later ownership/result/inventory/seal publication excluded; gate and evaluator-launcher raw lifetime-to-capture resourceUsage separately recorded; target and transient external probe CPU unmeasured; no wall subtraction or speedup inference',
    originalCampaignDeadline:d.campaignDeadline,scientificAcceptance:false};
  const binding=publish(resolve(output,'batch-result.json'),result,{root:output,limits:logLimits});
  authenticateBindings([binding]);check(Date.now()<hardDeadline,'original campaign deadline reached during closeout');
  const inventory=[];
  const inventoryTree=directory=>{for(const name of readdirSync(directory)){const p=resolve(directory,name),st=lstatSync(p);check(!st.isSymbolicLink(),'symlink in final evidence');if(st.isDirectory())inventoryTree(p);else inventory.push(withoutValue(capture(p,plan.outputBytes)));}};
  inventoryTree(output);
  const inventoryBinding=publish(resolve(output,'final-output-inventory.json'),{syntheticControl:synthetic,benchmarkEligible:false,files:inventory,bytesBeforeInventory:inventory.reduce((n,b)=>n+b.bytes,0),
    scope:'all phase files including batch result before this inventory is written; inventory binding and final byte total are in terminal stdout seal'}, {root:output,limits:logLimits});
  const finalOutputBytes=checkOutputBudget(output,logLimits);
  authenticateBindings([binding,inventoryBinding]);check(Date.now()<hardDeadline,'original campaign deadline reached during final inventory');
  process.stdout.write(JSON.stringify({...binding,accepted:false,syntheticControl:synthetic,benchmarkEligible:false,operationallyClosed:!cleanupUnresolved,inventory:inventoryBinding,finalOutputBytes,
    elapsedSecondsThroughFinalInventory:(performance.now()-start)/1000})+'\n');
  if(failed||cleanupUnresolved)process.exitCode=1;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{process.stderr.write(JSON.stringify({accepted:false,failure:e.message})+'\n');process.exitCode=1;});

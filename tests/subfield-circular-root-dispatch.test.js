import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { subfieldCircularDispatchFileOperation, checkSubfieldCircularRungGateCensus, classifySubfieldCircularCandidateFailure, parseSubfieldCircularDispatchArgs,
  subfieldCircularWholeRungClock, parseSubfieldCircularResourceObservation, recordSubfieldCircularResourceObservation, runSubfieldCircularBoundedCandidatePool, sourceBytes,
  watchedSubfieldCircularDispatchOperation } from "../scripts/eom/dispatch-subfield-circular-root-ladder.mjs";
import { SUBFIELD_CIRCULAR_BUILD_PATH, SUBFIELD_CIRCULAR_BUILD_SHA, SUBFIELD_CIRCULAR_IDS, SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION, SUBFIELD_CIRCULAR_RUNG_PATH, authenticateSubfieldCircularPriorPhases, rungSha } from "../scripts/eom/run-subfield-circular-root-rung.mjs";

// Synthetic process/scheduling/file controls only. No EOM or history generation.
const SELF="scripts/eom/dispatch-subfield-circular-root-ladder.mjs", bytes=readFileSync(SELF), hash=rungSha(bytes);
const temp=()=>realpathSync(mkdtempSync(path.join(os.tmpdir(),"subfieldCircular-dispatch-control-")));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test("dispatcher CLI requires exact external plan and code hashes plus fresh scoped output",()=>{
  const argv=["--plan","plan.json","--plan-sha256",hash,"--out",".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/new","--dispatcher-sha256",hash];
  assert.equal(parseSubfieldCircularDispatchArgs(argv)["--plan-sha256"],hash);
  for(const x of [argv.slice(0,-2),[...argv,"--plan","other"],argv.map(v=>v.endsWith("/new")?v+"/../escape":v)])assert.throws(()=>parseSubfieldCircularDispatchArgs(x));
});

test("resource minima allow exact contact and reject strictly below or ambiguous observations",()=>{
  const p=SUBFIELD_CIRCULAR_RESOURCE_OBSERVATION;
  assert.equal(parseSubfieldCircularResourceObservation("diagnostic\nSystem-wide memory free percentage: 20%\n",String(p.minimumFreeDiskBytesAtLaunch),p,true).accepted,true);
  assert.equal(parseSubfieldCircularResourceObservation("System-wide memory free percentage: 20%",String(p.minimumFreeDiskBytesDuringRun),p).accepted,true);
  for(const text of ["", "System-wide memory free percentage: NaN%", "System-wide memory free percentage: 101%",
    "System-wide memory free percentage: 20.5%", "System-wide memory free percentage: 20.0%",
    "System-wide memory free percentage: 19.999%", "System-wide memory free percentage: 25%\nSystem-wide memory free percentage: 25%",
    "System-wide memory free percentage: 25% trailing"])
    assert.throws(()=>parseSubfieldCircularResourceObservation(text,String(p.minimumFreeDiskBytesAtLaunch),p,true));
  assert.throws(()=>parseSubfieldCircularResourceObservation("System-wide memory free percentage: 90%",String(p.minimumFreeDiskBytesAtLaunch-1),p,true));
  assert.throws(()=>parseSubfieldCircularResourceObservation("System-wide memory free percentage: 90%",String(p.minimumFreeDiskBytesDuringRun-1),p));
});

test("shared byte drift and observation failure stop dispatch; geometry row failure stays candidate-local",()=>{
  assert.equal(classifySubfieldCircularCandidateFailure("CANDIDATE_LOCAL_FAILURE",true),"candidate-stop");
  assert.equal(classifySubfieldCircularCandidateFailure("REPEATED_PHASE_MISMATCH",true),"candidate-stop");
  assert.equal(classifySubfieldCircularCandidateFailure("CANDIDATE_RESOURCE_LIMIT",true),"candidate-stop");
  assert.equal(classifySubfieldCircularCandidateFailure("CANDIDATE_LOCAL_FAILURE",false),"shared-dispatch-stop");
  assert.equal(classifySubfieldCircularCandidateFailure("SHARED_BINDING_DRIFT",true),"shared-dispatch-stop");
  assert.equal(classifySubfieldCircularCandidateFailure("RESOURCE_OBSERVATION_STOP",true),"resource-dispatch-stop");
});

test("four-slot pool runs each candidate ladder serially and never exceeds reviewed concurrency",async()=>{
  let active=0,max=0;const done=[],visits=[];
  await runSubfieldCircularBoundedCandidatePool({candidates:Array.from({length:9},(_,i)=>i),limit:4,shouldStop:()=>false,onFatal:()=>assert.fail("unexpected failure"),
    work:async candidate=>{active++;max=Math.max(max,active);for(const rung of[8,32,128]){visits.push([candidate,rung]);await delay(1);}active--;done.push(candidate);}});
  assert.equal(max,4);assert.equal(active,0);assert.equal(done.length,9);
  for(let i=0;i<9;i++)assert.deepEqual(visits.filter(x=>x[0]===i).map(x=>x[1]),[8,32,128]);
});

test("startup fatal cancellation waits another active worker's cleanup before pool rejection",async()=>{
  let stopped=false,closed=false;const started=[];
  await assert.rejects(runSubfieldCircularBoundedCandidatePool({candidates:[0,1,2],limit:2,shouldStop:()=>stopped,onFatal:()=>{stopped=true;},
    work:async id=>{started.push(id);if(id===0){await delay(5);throw Error("synthetic prior publication failure");}
      while(!stopped)await delay(1);await delay(20);closed=true;}}),/publication/u);
  assert.equal(closed,true);assert.deepEqual(started,[0,1]);
});

test("candidate-local rejected rung ends that ladder but allows independent candidates",async()=>{
  const visits=[];
  await runSubfieldCircularBoundedCandidatePool({candidates:[0,1,2],limit:2,shouldStop:()=>false,onFatal:()=>assert.fail("unexpected global failure"),
    work:async id=>{for(const rung of[8,32,128]){visits.push([id,rung]);if(id===0&&rung===8)break;await delay(1);}}});
  assert.deepEqual(visits.filter(x=>x[0]===0),[[0,8]]);assert.equal(visits.filter(x=>x[0]===2).length,3);
});

function gateFixture(){const phases=Array.from({length:8},(_,i)=>({directory:`/run/phase-${i}`})),summary={path:"/run/rung-ledger.json"};
  const outputs=[...phases.flatMap(p=>["history-manifest.json","history-conformance.json","rows.ndjson","phase-ledger.json"].map(n=>path.join(p.directory,n))),summary.path];
  return {record:{phases,summary},process:{gates:outputs.map(output=>({requestedArgs:["-l","node","--out",output],acknowledged:true,
    measurement:{code:0,signal:null,resourceUsage:{userCPUTime:100,systemCPUTime:50,maxRSS:1000}}}))}};}
test("gate census assigns exact output roles and counts shared rung summary once",()=>{
  const f=gateFixture(),cost=checkSubfieldCircularRungGateCensus(f.process,f.record);assert.equal(cost.gateCount,33);assert.equal(cost.notAggregateSimultaneousMemory,true);
  for(const mutate of [x=>x.process.gates.pop(),x=>x.process.gates.push(x.process.gates[0]),x=>x.process.gates[0].measurement.code=1,
    x=>x.process.gates[0].requestedArgs.push("--out","/extra")]){const x=gateFixture();mutate(x);assert.throws(()=>checkSubfieldCircularRungGateCensus(x.process,x.record));}
  f.record.ladderSummary={path:"/run/ladder-ledger.json"};assert.throws(()=>checkSubfieldCircularRungGateCensus(f.process,f.record));
});

test("captured file worker verifies exact bytes and rejects changed generations",async()=>{
  const root=temp(),filename=path.join(root,"input.json");writeFileSync(filename,'{"synthetic":true}\n');const inputHash=rungSha(readFileSync(filename));
  const result=await watchedSubfieldCircularDispatchOperation({kind:"read",root,files:[{path:filename,sha256:inputHash,json:true}]},{bytes,sha256:hash,limitMs:2000});
  assert.equal(result[0].value.synthetic,true);writeFileSync(filename,'{"synthetic":false}\n');
  await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root,files:[{path:filename,sha256:inputHash}]},{bytes,sha256:hash,limitMs:2000}),/changed/u);
  await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root,files:[]},{bytes,sha256:"f".repeat(64),limitMs:2000}),/captured/u);
});

test("regular-file worker rejects FIFO without waiting for a writer",async()=>{
  const root=temp(),fifo=path.join(root,"input.fifo");execFileSync("/usr/bin/mkfifo",[fifo]);
  await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root,files:[{path:fifo,json:true}]},{bytes,sha256:hash,limitMs:2000}),/regular/u);
});

test("cancelled and expired worker operations are terminated before returning",async()=>{
  const signal=AbortSignal.abort(new Error("synthetic stop"));
  await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root:temp(),files:[]},{bytes,sha256:hash,limitMs:2000,signal}),/synthetic stop/u);
  await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root:temp(),files:[]},{bytes,sha256:hash,limitMs:1}),/deadline/u);
});

test("admission rejects an unaccepted rung before any mathematical or build claim",async()=>{
  const root=temp();writeFileSync(path.join(root,"rung-process.json"),JSON.stringify({schema:"braid-program/subfield-circular-candidate-rung-process.v1",accepted:false}));
  const rungBytes=readFileSync(SUBFIELD_CIRCULAR_RUNG_PATH);
  await assert.rejects(subfieldCircularDispatchFileOperation({kind:"admit",root,runOutput:root,rungBytes,rungSha256:rungSha(rungBytes),candidateId:"coincident-midpoint-common-frequency",rung:8,wallLimitSeconds:1800}),/authority/u);
});

test("successful synthetic rung admission carries authenticated plan into the next rung's prior chain",async()=>{
  const root=temp(),rungBytes=readFileSync(SUBFIELD_CIRCULAR_RUNG_PATH);
  const put=(name,value)=>{const filename=path.join(root,name),data=JSON.stringify(value)+"\n";writeFileSync(filename,data);return{path:filename,sha256:rungSha(data),bytes:Buffer.byteLength(data)};};
  const plan=put("plan.json",{}),prior=put("prior.json",{}),pilot=put("pilot.json",{}),before=put("before.json",{}),after=put("after.json",{});
  const phases=Array.from({length:8},(_,phase)=>{const directory=path.join(root,`phase-${phase}`);mkdirSync(directory);
    const binding=name=>put(`phase-${phase}/${name}`,{});
    return{candidateId:"coincident-midpoint-common-frequency",rung:8,phase,accepted:true,directory,historyManifest:binding("history-manifest.json"),conformance:binding("history-conformance.json"),
      phaseReceipt:put(`phase-${phase}/phase-ledger.json`,{maximumPrecisionBits:53}),operationalReceipt:binding("phase-process.json"),process:{processGroupClosed:true,rawRows:binding("rows.ndjson"),stdoutLog:binding("stdout.log"),stderrLog:binding("stderr.log")}};});
  const phaseReceipts=phases.map(p=>p.phaseReceipt),summary=put("rung-ledger.json",{schema:"braid-program/subfield-circular-root-summary-reduction.v1",accepted:true,
    h3EvidenceEligible:false,rootExecutionAuthorized:false,authority:"authenticated-phase-summary-chain-only",scope:"candidate-rung",candidateIds:["coincident-midpoint-common-frequency"],phaseCount:8,
    rowCount:288,ordinaryRootCount:240,selfEndpointCount:48,phaseReceipts:phaseReceipts.map((p,phase)=>({...p,candidateId:"coincident-midpoint-common-frequency",rung:8,phase})),
    phaseReceiptChainSha256:rungSha(phaseReceipts.map(p=>p.sha256).join("\n")+"\n")});
  const record={schema:"braid-program/subfield-circular-candidate-rung-process.v1",accepted:true,h3EvidenceEligible:false,rootExecutionAuthorized:false,candidateId:"coincident-midpoint-common-frequency",rung:8,
    wallLimitSeconds:1800,elapsedWallSeconds:2,phases,phaseReceipts,summary,plan,priorReceipts:prior,pilotAdmission:pilot,sourceBindings:[],runtimeBindings:[],stages:[],
    buildReceipt:{path:path.join(root,SUBFIELD_CIRCULAR_BUILD_PATH),sha256:SUBFIELD_CIRCULAR_BUILD_SHA},buildBefore:before,buildAfter:after,resources:{complete:true,measuredCPUSeconds:1,maximumPrecisionBits:53}};
  put("rung-process.json",record);
  const outputs=[...phases.flatMap(p=>[p.historyManifest.path,p.conformance.path,p.process.rawRows.path,p.phaseReceipt.path]),summary.path];
  const processReceipt={gates:outputs.map(output=>({requestedArgs:["--out",output],acknowledged:true,measurement:{code:0,signal:null,resourceUsage:{userCPUTime:1,systemCPUTime:1,maxRSS:1000}}}))};
  const job={kind:"admit",root,runOutput:root,rungBytes,rungSha256:rungSha(rungBytes),candidateId:"coincident-midpoint-common-frequency",rung:8,wallLimitSeconds:1800,plan,processReceipt,bindings:[]};
  const admission=await subfieldCircularDispatchFileOperation(job);assert.deepEqual(admission.plan,plan);assert.equal(admission.h3EvidenceEligible,false);
  assert.equal(admission.resources.maximumPrecisionBits,53);assert.ok(admission.resources.outputBytes>0);
  assert.equal(new Set(admission.resources.namedOutputs.map(x=>x.path)).size,admission.resources.namedOutputs.length);
  const pilotPhases=SUBFIELD_CIRCULAR_IDS.flatMap(candidateId=>[0,1].map(phase=>({candidateId,rung:2,phase,path:`/${candidateId}/${phase}`,sha256:hash})));
  authenticateSubfieldCircularPriorPhases({candidateId:"coincident-midpoint-common-frequency",rung:32,prior:{rungAdmissions:[{}]},planBinding:plan,
    pilotSummary:{accepted:true,h3EvidenceEligible:false,scope:"pilot",phaseCount:32,rowCount:2448,phaseReceipts:pilotPhases},
    phaseBindings:[...pilotPhases.filter(p=>p.candidateId==="coincident-midpoint-common-frequency"),...phaseReceipts],
    admissions:[{value:{accepted:true,h3EvidenceEligible:false,processesClosed:true,admission}}]});
  await assert.rejects(subfieldCircularDispatchFileOperation({...job,plan:{...plan,sha256:"f".repeat(64)}}),/authenticated plan/u);
});

test("whole-rung deadline precedes prior preparation and terminates an overlong preparation worker",async()=>{
  const root=temp(),filename=path.join(root,"prior.json"),needle='if (job.kind === "prior") { writeJSON';
  const changed=Buffer.from(bytes.toString().replace(needle,'if (job.kind === "prior") { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,250); writeJSON'));
  assert.notEqual(rungSha(changed),hash);const clock=subfieldCircularWholeRungClock(30);
  try {await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"prior",root,filename,value:{}},
    {bytes:changed,sha256:rungSha(changed),limitMs:clock.remaining(),signal:clock.signal}),/deadline/u);
    assert.throws(()=>clock.remaining(),/deadline/u);}finally{clock.close();}
  assert.throws(()=>readFileSync(filename),/ENOENT/u);
});

test("whole-rung admission checks elapsed synchronous time and aborts observation/publication waits",async()=>{
  const first=subfieldCircularWholeRungClock(10);
  try {Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,20);assert.throws(()=>first.remaining(),/deadline/u);}finally{first.close();}
  const second=subfieldCircularWholeRungClock(15);
  try {await assert.rejects(second.wait(new Promise(()=>{})),/deadline/u);}finally{second.close();}
  const third=subfieldCircularWholeRungClock(1000);third.cancel(new Error("shared resource interruption"));
  try {await assert.rejects(watchedSubfieldCircularDispatchOperation({kind:"read",root:temp(),files:[]},
    {bytes,sha256:hash,limitMs:1000,signal:third.signal}),/shared resource/u);}finally{third.close();}
});

test("periodic resource log failure stops scheduling and waits an active sibling cleanup",async()=>{
  let stopped=false,closed=false,reported;const started=[];
  await runSubfieldCircularBoundedCandidatePool({candidates:[0,1,2],limit:2,shouldStop:()=>stopped,onFatal:()=>{stopped=true;},
    work:async id=>{started.push(id);if(id===0){await delay(5);
      await recordSubfieldCircularResourceObservation({query:async()=>({accepted:true}),append:()=>{throw Object.assign(Error("synthetic disk full"),{code:"ENOSPC"});},
        onFailure:error=>{reported=error;stopped=true;}}).catch(()=>{}); // same catch as the periodic observer
    }else{while(!stopped)await delay(1);await delay(15);closed=true;}}});
  assert.equal(reported.failureCode,"RESOURCE_OBSERVATION_STOP");assert.match(reported.message,/log failed/u);
  assert.deepEqual(started,[0,1]);assert.equal(closed,true);
});

test("dispatcher captured source rejects nonregular and oversized files without a second open",()=>{
  const root=temp(),fifo=path.join(root,"fifo");execFileSync("/usr/bin/mkfifo",[fifo]);assert.throws(()=>sourceBytes(fifo,hash),/regular/u);
  const filename=path.join(root,"big");writeFileSync(filename,Buffer.alloc(2*1024**2+1));assert.throws(()=>sourceBytes(filename,hash),/bounded/u);
});

test("initial resource-log reservation failure leaves no heartbeat, signal handlers or live process",()=>{
  const root=temp(),source=path.resolve(SELF);
  const child=`import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
    import{syncBuiltinESMExports}from'node:module';import{pathToFileURL}from'node:url';
    const root=process.argv[1],source=process.argv[2],base='.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/';
    fs.mkdirSync(path.join(root,base),{recursive:true});const m=await import(pathToFileURL(source).href);
    const original=fs.writeFileSync,before=[process.listenerCount('SIGTERM'),process.listenerCount('SIGINT')];
    fs.writeFileSync=function(filename,...args){if(String(filename).endsWith('resource-observations.ndjson'))throw Object.assign(Error('synthetic reservation ENOSPC'),{code:'ENOSPC'});return original(filename,...args)};
    syncBuiltinESMExports();
    await assert.rejects(m.runSubfieldCircularMeasuredDispatch({root,args:{'--out':base+'startup'},selfBytes:Buffer.alloc(0),rungBytes:Buffer.alloc(0),runtime:{}}),/reservation ENOSPC/);
    assert.deepEqual([process.listenerCount('SIGTERM'),process.listenerCount('SIGINT')],before);console.log('closed');`;
  const result=execFileSync(process.execPath,["--input-type=module","-e",child,root,source],{encoding:"utf8",timeout:2000});
  assert.equal(result.trim(),"closed");
});

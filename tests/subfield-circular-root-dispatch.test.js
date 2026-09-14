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
  const argv=["--plan","plan.json","--plan-sha256",hash,"--out",".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/new"];
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

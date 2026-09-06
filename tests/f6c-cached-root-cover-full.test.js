import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";
import { closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readFileSync, realpathSync,
  renameSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { PassThrough, Writable } from "node:stream";
import { execFileSync } from "node:child_process";
import * as R from "../scripts/eom/run-f6c-cached-root-cover-full.mjs";
import * as L from "../scripts/eom/launch-f6c-cached-root-cover-full.mjs";
import { currentOwnedGroup, descendantRecords } from "../scripts/eom/launch-subfield-circular-root-pilot.mjs";
const root=process.cwd(),digest=x=>createHash("sha256").update(x).digest("hex");
const temp=()=>mkdtempSync(path.join(tmpdir(),"f6c-pilot-control-"));
const binding=(p,h="1".repeat(64))=>({path:p,sha256:h,bytes:1});
function plan() {
  const python=path.resolve(process.env.AAA_VENV??"../.venv","bin/python"),node=realpathSync(process.execPath);
  const sources=[R.CONSUMER,"scripts/eom/oracle/continuous_reception_roots_cached.py","scripts/eom/oracle/certified_history.py","scripts/eom/oracle/decimal_interval.py"];
  return {schema:"braid-program/f6c-cached-root-cover-full-launch.v1",scope:"full",resourcePlan:binding(R.RESOURCE_PLAN,R.PINS[R.RESOURCE_PLAN]),
    python,pythonRealPath:realpathSync(python),git:realpathSync("/usr/bin/git"),node,
    comparisonContract:{declarationSha256:R.PINS["reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md"],verifierSha256:R.PINS[R.COMPARISON],scope:"full",
      subjectSourceBindings:sources.map(p=>binding(p,R.PINS[p])),runtimeBindings:[binding(realpathSync(python)),binding(realpathSync("/usr/bin/git")),binding(path.resolve(python,"../../pyvenv.cfg"))]},
    operationalBindings:[R.ENTRY,R.LAUNCHER,R.OUTER,"/bin/ps","/usr/bin/memory_pressure",node].map(p=>binding(p,R.PINS[p]??"1".repeat(64))),
    controlBindings:["tests/test_f6c_cached_continuous_reception_root_cover_preparation.py","tests/test_f6c_cached_continuous_reception_root_cover.py"].map(p=>binding(p,R.PINS[p]))};
}
test("machine plan is full-only and binds complete frozen sources/environment",()=>{
  const p=plan();assert.equal(R.validatePlan(p,root,"1".repeat(64),"1".repeat(64)),p);
  for(const mutate of [p=>p.scope="pilot-cell-0",p=>p.comparisonContract.scope="pilot-cell-0",p=>p.operationalBindings.pop(),
    p=>p.comparisonContract.subjectSourceBindings.pop(),p=>p.comparisonContract.runtimeBindings.pop(),
    p=>p.resourcePlan.sha256="0".repeat(64),p=>p.extra=true,p=>p.pythonRealPath=p.python,p=>p.controlBindings[0].sha256="0".repeat(64)]) {
    const bad=structuredClone(p);mutate(bad);assert.throws(()=>R.validatePlan(bad,root,"1".repeat(64),"1".repeat(64)));
  }
});
test("all frozen hashes and comparison schema match disk without reading scientific data",()=>{
  for(const [p,h] of Object.entries(R.PINS))if(!p.startsWith(".local-data/")&&!p.startsWith("/"))assert.equal(digest(readFileSync(p)),h,p);
  assert.match(readFileSync(R.COMPARISON,"utf8"),/REPORT_SCHEMA = "braid-program\/f6c-continuous-reception-root-cover-conformance.v1"/);
});
test("source capture rejects replacement, symlinks, byte bound and overwrite",()=>{
  const dir=temp(),f=path.join(dir,"source");writeFileSync(f,"abc");
  assert.equal(R.readBound(f,digest("abc"),true).data.toString(),"abc");
  assert.throws(()=>R.readBound(f,"0".repeat(64)));assert.throws(()=>R.readBound(f,undefined,true,2));
  symlinkSync(f,path.join(dir,"alias"));assert.throws(()=>R.readBound(path.join(dir,"alias")));
  assert.throws(()=>R.writeNew(f,{overwrite:true}));assert.equal(readFileSync(f,"utf8"),"abc");
});
test("stage controls retain exact hash/manifest and full-only arguments",()=>{
  const p=plan(),out=path.join(temp(),"run"),pb=binding("/fixture/plan");
  const a=R.stageSpec({stage:"consumer",plan:p,planBinding:pb,root,output:out,budget:"0.125"});
  assert.deepEqual(a.args.slice(0,4),["-I","-B","-c",R.PYTHON_BOOTSTRAP]);assert.equal(a.command,p.python);
  assert.equal(a.args[a.args.indexOf("--scope")+1],"full");
  const manifest=binding(path.join(out,"subject/cover-manifest.json"));
  const b=R.stageSpec({stage:"comparison",plan:p,planBinding:pb,root,output:out,manifest,budget:"1"});
  assert.equal(b.args[b.args.indexOf("--manifest-sha256")+1],manifest.sha256);
  assert.throws(()=>R.stageSpec({stage:"comparison",plan:p,planBinding:pb,root,output:out,budget:"1"}));
  for(const budget of ["0","1801","NaN","1e-1000"])assert.throws(()=>R.stageSpec({stage:"consumer",plan:p,planBinding:pb,root,output:out,budget}));
  assert.throws(()=>R.remainingSeconds("0"));
});
test("captured Python bootstrap executes a synthetic byte-bound program and measures CPU",()=>{
  const dir=temp(),p=path.join(dir,"fixture.py"),raw="print('{\"synthetic\":true,\"accepted\":false}')\n";writeFileSync(p,raw);
  const output=execFileSync(plan().python,["-I","-B","-c",R.PYTHON_BOOTSTRAP,p,digest(raw)],{encoding:"utf8",timeout:2000,stdio:["ignore","pipe","pipe"]});
  assert.deepEqual(JSON.parse(output),{synthetic:true,accepted:false});
  assert.throws(()=>execFileSync(plan().python,["-I","-B","-c",R.PYTHON_BOOTSTRAP,p,"0".repeat(64)],{timeout:2000,stdio:"pipe"}));
});
function admissionFixture() {
  const output=temp(),p=plan(),pb=binding(path.join(output,"plan")),stage="consumer";mkdirSync(path.join(output,"subject"));mkdirSync(path.join(output,stage+"-process"));
  const rows=R.writeNew(path.join(output,"subject/rows.ndjson"),{synthetic:true}),pieces=R.writeNew(path.join(output,"subject/pieces.ndjson"),{synthetic:true});
  const manifest=R.writeNew(path.join(output,"subject/cover-manifest.json"),{accepted:false,scope:"full",status:"conditional_complete",rowCount:10240,cellCount:160,ordinaryNonselfRows:8960,selfExclusionRows:1280,pieceRecordCount:17920,
    launchPlan:pb,rows,pieces,subjectSourceBindings:p.comparisonContract.subjectSourceBindings,runtimeBindings:p.comparisonContract.runtimeBindings});
  const completion={completed:true,accepted:false,h3EvidenceEligible:false,elapsedSeconds:1,scope:"full",conditionalLibraryRows:10240,pieceRecords:17920,recordedGeometryPieceVisits:168,
    comparisonRequired:true,externalInclusiveDeadlineAndProcessClosureRequired:true,eomExecuted:false,outputs:[rows,pieces,manifest]};
  const stdout=R.writeNew(path.join(output,stage+"-process/runner-stdout.log"),completion);
  const resourceFile=path.join(output,stage+"-process/runner-stderr.log"),events=[
    {kind:"f6c-python-process-resources",userSeconds:1,systemSeconds:0.1,waitedChildUserSeconds:0,waitedChildSystemSeconds:0,maximumIndividualResidentBytes:1000},
    {kind:"f6c-entry-process-resources",resourceUsage:{userCPUTime:10,systemCPUTime:10,maxRSS:100}}];
  writeFileSync(resourceFile,events.map(x=>JSON.stringify(x)).join("\n")+"\n");
  const spec=R.stageSpec({stage,root,output,plan:p,planBinding:pb,budget:"1"});
  const job={stage,root,output,plan:p,planBinding:pb,stdout,sources:[],processReceipt:{accepted:false,processesClosed:true,exit:{code:0,signal:null},
    gates:[{acknowledged:true,target:{pid:2},measurement:{code:0,signal:null},requestedCommand:spec.command,requestedArgs:spec.args}]}};
  return {job,resourceFile};
}
test("synthetic mechanical handoff checks exact output/gate/resource census",()=>{
  const {job,resourceFile}=admissionFixture(),admission=R.admitStage(job);
  assert.equal(admission.accepted,true);assert.equal(admission.mathematicalAuthority,"none; conditional subject pending comparison");
  for(const mutate of [j=>j.processReceipt.processesClosed=false,j=>j.processReceipt.gates[0].requestedArgs.push("--full"),
    j=>j.processReceipt.gates=[],j=>j.processReceipt.exit.code=1,j=>j.output+="wrong"]) {
    const bad=structuredClone(job);mutate(bad);assert.throws(()=>R.admitStage(bad));
  }
  writeFileSync(resourceFile,"{}\n");assert.throws(()=>R.admitStage(job),/resource event/);
});
test("synthetic comparison admission requires authenticated preceding output and exact claims",()=>{
  const {job}=admissionFixture(),consumer=R.admitStage(job),stage="comparison";mkdirSync(path.join(job.output,stage+"-process"));
  const claims={reconstructedFamilyApplicabilityAuthenticated:true,conditionalRootCoverValidated:true,historicalTrajectoryIdentityEstablished:false,rootExecutionAuthorized:false,metricsAvailable:false,h3EvidenceEligible:false,scoreAuthorized:false,eomExecuted:false};
  const report={schema:"braid-program/f6c-continuous-reception-root-cover-conformance.v1",accepted:true,scope:"full",manifest:consumer.outputs[2],launchPlan:job.planBinding,verifier:{sha256:R.PINS[R.COMPARISON]},
    rows:consumer.outputs[0],pieces:consumer.outputs[1],analysis:{accepted:false,conditionalEnclosuresConformant:true,cellCount:160,pairCellCertificates:10240,ordinaryNonselfRows:8960,selfExclusionRows:1280,distinctNonselfFaceChecks:17920,pieceRecordCount:17920,recordedGeometryPieceVisits:168},
    claims,libraryFlags:{premise_truth_authenticated:false,subject_membership_established:false,execution_authorized:false,metrics_available:false,h3_evidence_eligible:false}};
  const receipt=R.writeNew(path.join(job.output,"comparison.json"),report);
  const stdout=R.writeNew(path.join(job.output,stage+"-process/runner-stdout.log"),{completed:true,accepted:true,output:receipt,elapsedSeconds:1,h3EvidenceEligible:false});
  writeFileSync(path.join(job.output,stage+"-process/runner-stderr.log"),readFileSync(path.join(job.output,"consumer-process/runner-stderr.log")));
  const next={...job,stage,consumer,manifest:consumer.outputs[2],stdout};
  const spec=R.stageSpec({...next,budget:"1"});next.processReceipt=structuredClone(job.processReceipt);next.processReceipt.gates[0].requestedArgs=spec.args;
  assert.equal(R.admitStage(next).accepted,true);
  assert.throws(()=>R.admitStage({...next,manifest:{...next.manifest,sha256:"0".repeat(64)}}));
  writeFileSync(receipt.path,JSON.stringify({...report,claims:{...claims,metricsAvailable:true}})+"\n");
  assert.throws(()=>R.admitStage(next),/hash differs/);
});
test("single-stage piping rejects child failure and log overflow without a second dispatch",async()=>{
  for(const mode of ["pass","fail","overflow"]) {
    let calls=0,killed=false;
    const spawnImpl=()=>{
      calls++;const c=new EventEmitter();c.stdout=new PassThrough();c.stderr=new PassThrough();c.kill=()=>{killed=true;setImmediate(()=>c.emit("close",null,"SIGTERM"));};
      setImmediate(()=>{c.stdout.emit("data",Buffer.alloc(mode==="overflow"?R.LOG_LIMIT+1:1));if(mode!=="overflow")c.emit("close",mode==="fail"?1:0,null);});return c;
    };
    const operation=R.runSingleStage({command:"synthetic",args:[]},{spawnImpl,out:{write(){}},err:{write(){}}});
    if(mode==="pass")assert.equal((await operation).accepted,false);else await assert.rejects(operation);
    assert.equal(calls,1);if(mode==="overflow")assert.equal(killed,true);
  }
});
test("metadata-only inventory has bounded timeout and awaits its killed child closure",async()=>{
  let killed,closed=false;
  const spawnImpl=()=>{const c=new EventEmitter();c.stdout=new PassThrough();c.stderr=new PassThrough();
    c.kill=signal=>{killed=signal;setTimeout(()=>{closed=true;c.emit("close",null,signal);},5);};return c;};
  await assert.rejects(R.runSingleStage({command:"synthetic",args:[]},{spawnImpl,timeoutMs:20}),/inventory deadline/);
  assert.equal(killed,"SIGKILL");assert.equal(closed,true);
});
test("host minima equality is accepted and fractional/malformed/low values fail",()=>{
  assert.equal(L.parseHostResource("System-wide memory free percentage: 40%\n",64n*1024n**3n,true).freePercent,40);
  assert.equal(L.parseHostResource("System-wide memory free percentage: 20%",16n*1024n**3n,false).freePercent,20);
  for(const [value,disk,launch] of [["20.5",64n*1024n**3n,false],["19",64n*1024n**3n,false],["101",64n*1024n**3n,true],["40",64n*1024n**3n-1n,true]])
    assert.throws(()=>L.parseHostResource(`System-wide memory free percentage: ${value}%`,disk,launch));
  assert.throws(()=>L.parseHostResource("System-wide memory free percentage: 40%\nSystem-wide memory free percentage: 40%",64n*1024n**3n,true));
});
test("RSS samples enforce aggregate sum, exact2GiB stop and conservative <=1s timing",()=>{
  const fresh=()=>({lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0});
  const state=fresh();L.acceptRSS(state,[{rssBytes:100},{rssBytes:200}],100,80);
  assert.equal(L.acceptRSS(state,[{rssBytes:100}],1080,1070).sampleGapMs,1000);
  assert.equal(state.maximumSampledRSSBytes,300);
  assert.throws(()=>L.acceptRSS(state,[{rssBytes:100}],2071,2070),/one second/);
  assert.throws(()=>L.acceptRSS(fresh(),[{rssBytes:2*1024**3}],1));
  assert.throws(()=>L.acceptRSS(fresh(),[{rssBytes:0}],1));
  assert.throws(()=>L.acceptRSS(fresh(),[],1));
});
test("late synchronous teardown cannot hide an observation-to-closure gap",()=>{
  const state={samples:1,lastSampleStartedMs:100};assert.equal(L.admitFinalObservation(state,1100),1000);
  assert.throws(()=>L.admitFinalObservation(state,1100.1),/closure gap/);
  assert.throws(()=>L.admitFinalObservation({samples:0,lastSampleStartedMs:100},101));
});
test("final stdout is awaited and a stalled flush is destroyed within its remaining deadline",async()=>{
  const chunks=[],stream=new Writable({write(chunk,_encoding,callback){chunks.push(chunk);setTimeout(callback,15);}});
  const before=performance.now();await L.flushCompletion({synthetic:true},{stream,deadlineMs:before+500,observationStartedMs:before});
  assert.ok(performance.now()-before>=10);assert.equal(JSON.parse(Buffer.concat(chunks)).synthetic,true);
  const stalled=new Writable({write(){}}),start=performance.now();
  await assert.rejects(L.flushCompletion({accepted:false},{stream:stalled,deadlineMs:start+30,observationStartedMs:start}),/stdout/);
  assert.equal(stalled.destroyed,true);assert.ok(performance.now()-start<500);
});
test("stdout callback failure and a callback past the RSS-gap deadline cannot admit",async()=>{
  const broken=new Writable({write(_chunk,_encoding,callback){callback(new Error("synthetic EPIPE"));}}),start=performance.now();
  await assert.rejects(L.flushCompletion({accepted:false},{stream:broken,deadlineMs:start+500,observationStartedMs:start}),/EPIPE/);
  assert.equal(broken.destroyed,true);
  let clock=0;const late=new Writable({write(_chunk,_encoding,callback){clock=1001;callback();}});
  await assert.rejects(L.flushCompletion({accepted:false},{stream:late,deadlineMs:1800000,observationStartedMs:0,now:()=>clock}),/observation gap/);
  assert.equal(late.destroyed,true);
});
test("metadata runtime inventory includes the loaded future-feature source and cache",()=>{
  assert.match(R.PYTHON_RUNTIME_INVENTORY,/import __future__,/);
  const result=JSON.parse(execFileSync(plan().python,["-I","-B","-c",R.PYTHON_RUNTIME_INVENTORY],{encoding:"utf8",timeout:2000}));
  assert.equal(result.scientificDataLoaded,false);assert.equal(result.scientificModulesExecuted,false);
  assert.equal(result.files.some(p=>p.endsWith("/__future__.py")),true);
  assert.equal(result.files.some(p=>/\/__pycache__\/__future__\.[^/]+\.pyc$/u.test(p)),true);
});
test("process observations retain birth identity, RSS and complete command line",()=>{
  const text=" 100 1 100 Thu Aug 27 12:34:56 2026 S 10 /some/python -I -c fixture\n";
  const [row]=L.parseObservation(text);assert.equal(row.rssBytes,10240);assert.equal(row.started,"Thu Aug 27 12:34:56 2026");
  assert.equal(row.command,"/some/python -I -c fixture");assert.throws(()=>L.parseObservation("100 1 100 invalid"));
});
test("owned RSS tracks detached group after parent exit, excluding unrelated and PS probe",()=>{
  const row=(pid,ppid,pgid,started="old")=>({pid,ppid,pgid,started,rssBytes:10});
  const owners=new Map(),outer={currentOwnedGroup,descendantRecords};
  const first=[row(1,0,1),row(2,1,2),row(3,2,2),row(9,0,9),row(7,1,7)];
  assert.deepEqual(L.selectOwnedRows(first,1,owners,outer,new Set([7])).map(x=>x.pid).sort(),[1,2,3]);
  assert.deepEqual(L.selectOwnedRows([row(1,0,1),row(3,0,2),row(9,0,9)],1,owners,outer).map(x=>x.pid).sort(),[1,3]);
  assert.deepEqual(L.selectOwnedRows([row(1,0,1),row(2,0,2,"reused"),row(9,0,9)],1,owners,outer).map(x=>x.pid),[1]);
});
test("startup abort is consumed once and cleanup inspection remains available",async()=>{
  const abort=new AbortController();let calls=0;
  const inspect=L.startupAbortInspection(async()=>{calls++;if(calls===1)abort.abort(new Error("synthetic startup stop"));return [calls];},abort.signal);
  await assert.rejects(inspect(),/startup stop/);assert.deepEqual(await inspect(),[2]);
});
test("exclusive lock cannot steal stale/replaced lock or remove another inode",()=>{
  const dir=temp(),p=path.join(dir,"lock"),lock=L.reserveLock(p,{pid:1,started:"synthetic"});
  assert.throws(()=>L.reserveLock(p,{pid:2,started:"other"}));
  const other=path.join(dir,"other");writeFileSync(other,"foreign");renameSync(other,p);
  assert.throws(()=>L.releaseLock(lock));assert.equal(readFileSync(p,"utf8"),"foreign");
  const q=path.join(dir,"own"),owned=L.reserveLock(q,{pid:1,started:"synthetic"});L.releaseLock(owned);assert.equal(existsSync(q),false);
});
test("competing pilot is rejected but own captured stage descendants are allowed",()=>{
  const rows=[{pid:1,ppid:0,command:"launcher"},{pid:2,ppid:1,command:"prepare-f6c-continuous-reception-root-cover.py"}];
  L.assertNoCompetingPilot(rows,1);assert.throws(()=>L.assertNoCompetingPilot([...rows,{pid:3,ppid:0,command:"reduce-prescribed-acceleration-response.py"}],1));
});
test("bounded log and partial progress retain raw bytes and reject backwards counts",()=>{
  const dir=temp(),p=path.join(dir,"log"),fd=openSync(p,"wx"),totals={bytes:0};
  L.boundedLogAppend(fd,Buffer.from('{"completedRows":2'),totals);const state={offset:0,pending:"",completedRows:0};
  assert.equal(L.readProgress(p,state),0);L.boundedLogAppend(fd,Buffer.from('}\nraw diagnostic\n'),totals);assert.equal(L.readProgress(p,state),2);
  L.boundedLogAppend(fd,Buffer.from('{"completedRows":1}\n'),totals);assert.throws(()=>L.readProgress(p,state));
  assert.throws(()=>L.boundedLogAppend(fd,Buffer.alloc(1),{bytes:R.LOG_LIMIT}));closeSync(fd);
});
test("worker deadline and abort reject hung captured file operation and close worker",async()=>{
  const bytes=Buffer.from("export function fileOperation(){while(true){}}"),abort=new AbortController();
  const began=Date.now();await assert.rejects(L.runFileWorker({},bytes,30,abort.signal),/deadline/);assert.ok(Date.now()-began<1500);
  const cancelled=new AbortController(),pending=L.runFileWorker({},bytes,2000,cancelled.signal);setTimeout(()=>cancelled.abort(new Error("synthetic cancellation")),20);
  await assert.rejects(pending,/cancellation/);
});
test("file worker executes captured generation, not changed on-disk source",async()=>{
  const bytes=Buffer.from("export function fileOperation(job){return {captured:true,value:job.value}}"),abort=new AbortController();
  assert.deepEqual(await L.runFileWorker({value:7},bytes,2000,abort.signal),{captured:true,value:7});
});
test("final publication needs completed stages and live inclusive clock",()=>{
  const out=temp(),job={kind:"finalize",output:out,record:{accepted:true,processesClosed:true,stages:[{},{}]},sources:[],evidence:[],deadlineNanoseconds:"0"};
  assert.throws(()=>R.fileOperation(job),/deadline/);
  const active={...job,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)};
  assert.equal(R.fileOperation(active).path,path.join(out,"full-admission.json"));assert.throws(()=>R.fileOperation(active));
});
test("launcher CLI requires all exact hashes and rejects path traversal",()=>{
  const argv=["--out",".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/new","--plan","plan","--plan-sha256","1".repeat(64),"--launcher-sha256","2".repeat(64),"--entry-sha256","3".repeat(64)];
  assert.equal(L.parseArgs(argv).entrySha256,"3".repeat(64));assert.throws(()=>L.parseArgs(argv.slice(0,-2)));
  const bad=[...argv];bad[1]="a/../b";assert.throws(()=>L.parseArgs(bad));
});
test("source composition pins unchanged registered bootstrap and sequential stages",()=>{
  const src=readFileSync("scripts/eom/launch-f6c-cached-root-cover-full.mjs","utf8");
  assert.match(src,/for\(const stage of \["consumer","comparison"\]\)/);assert.match(src,/await outer\.superviseRegisteredPilot/);
  assert.match(src,/startedAtMs:began,limitMs:LIMIT_MS/);assert.match(src,/startupAbortInspection\(inspect,abort.signal\)/);
  assert.match(src,/await worker\(\{kind:"recheck",sources:\[\.\.\.sources,\.\.\.evidence,publication\]\}\)/);
  assert.match(src,/publicationRequires:/);assert.match(src,/post-completion deadline/);
});

// Full-scope binding/census controls; no actual-data evaluation.
function rewriteRecord(filename,record) {
  writeFileSync(filename,JSON.stringify(record)+"\n");return R.clean(R.readBound(filename));
}
function mutateConsumer(job,manifestPatch={},completionPatch={}) {
  const completion=JSON.parse(readFileSync(job.stdout.path));
  const manifest=JSON.parse(readFileSync(completion.outputs[2].path));
  completion.outputs[2]=rewriteRecord(completion.outputs[2].path,{...manifest,...manifestPatch});
  job.stdout=rewriteRecord(job.stdout.path,{...completion,...completionPatch});
}
function comparisonFixture() {
  const {job}=admissionFixture(),consumer=R.admitStage(job),stage="comparison";
  mkdirSync(path.join(job.output,stage+"-process"));
  const report={schema:"braid-program/f6c-continuous-reception-root-cover-conformance.v1",accepted:true,scope:"full",
    manifest:consumer.outputs[2],launchPlan:job.planBinding,verifier:{sha256:R.PINS[R.COMPARISON]},
    rows:consumer.outputs[0],pieces:consumer.outputs[1],analysis:{accepted:false,conditionalEnclosuresConformant:true,
      cellCount:160,pairCellCertificates:10240,ordinaryNonselfRows:8960,selfExclusionRows:1280,
      distinctNonselfFaceChecks:17920,pieceRecordCount:17920,recordedGeometryPieceVisits:168},
    claims:{reconstructedFamilyApplicabilityAuthenticated:true,conditionalRootCoverValidated:true,
      historicalTrajectoryIdentityEstablished:false,rootExecutionAuthorized:false,metricsAvailable:false,
      h3EvidenceEligible:false,scoreAuthorized:false,eomExecuted:false},
    libraryFlags:{premise_truth_authenticated:false,subject_membership_established:false,execution_authorized:false,
      metrics_available:false,h3_evidence_eligible:false}};
  const receipt=R.writeNew(path.join(job.output,"comparison.json"),report);
  const completion={completed:true,accepted:true,output:receipt,elapsedSeconds:1,h3EvidenceEligible:false};
  const stdout=R.writeNew(path.join(job.output,stage+"-process/runner-stdout.log"),completion);
  writeFileSync(path.join(job.output,stage+"-process/runner-stderr.log"),readFileSync(path.join(job.output,"consumer-process/runner-stderr.log")));
  const next={...job,stage,consumer,manifest:consumer.outputs[2],stdout};
  next.processReceipt=structuredClone(job.processReceipt);
  next.processReceipt.gates[0].requestedArgs=R.stageSpec({...next,budget:"1"}).args;
  return {job:next,receipt,report,completion};
}
test("full consumer admits only the exact complete 160-cell census, never a pilot or prefix",()=>{
  const {job}=admissionFixture();assert.equal(R.admitStage(job).accepted,true);
  for(const patch of [{scope:"pilot-cell-0"},{rowCount:64},{cellCount:1},{ordinaryNonselfRows:56},
    {selfExclusionRows:8},{pieceRecordCount:112},{rowCount:10239},{rowCount:10241},{cellCount:159}]) {
    const {job}=admissionFixture();mutateConsumer(job,patch);assert.throws(()=>R.admitStage(job));
  }
  for(const patch of [{scope:"pilot-cell-0"},{conditionalLibraryRows:64},{conditionalLibraryRows:10239},
    {conditionalLibraryRows:10241},{pieceRecords:112},{pieceRecords:17919}]) {
    const {job}=admissionFixture();mutateConsumer(job,{},patch);assert.throws(()=>R.admitStage(job));
  }
});
test("full comparison authenticates every full census and rejects fresh wrong-count receipts",()=>{
  const {job}=comparisonFixture();assert.equal(R.admitStage(job).accepted,true);
  for(const patch of [{cellCount:1},{pairCellCertificates:64},{ordinaryNonselfRows:56},{selfExclusionRows:8},
    {distinctNonselfFaceChecks:112},{pieceRecordCount:112},{pairCellCertificates:10241},
    {ordinaryNonselfRows:8959},{recordedGeometryPieceVisits:167}]) {
    const f=comparisonFixture(),fresh=rewriteRecord(f.receipt.path,{...f.report,analysis:{...f.report.analysis,...patch}});
    f.job.stdout=rewriteRecord(f.job.stdout.path,{...f.completion,output:fresh});assert.throws(()=>R.admitStage(f.job));
  }
  const f=comparisonFixture(),fresh=rewriteRecord(f.receipt.path,{...f.report,scope:"pilot-cell-0"});
  f.job.stdout=rewriteRecord(f.job.stdout.path,{...f.completion,output:fresh});assert.throws(()=>R.admitStage(f.job));
});
test("full progress accepts beyond the pilot through10240 and rejects overflow, reversal and noninteger counts",()=>{
  for(const invalid of [10241,10239,-1,1.5]) {
    const dir=temp(),p=path.join(dir,"full-progress"),fd=openSync(p,"wx"),totals={bytes:0},state={offset:0,pending:"",completedRows:0};
    try {
      for(const completedRows of [64,65,10240]) {
        L.boundedLogAppend(fd,Buffer.from(JSON.stringify({completedRows})+"\n"),totals);
        assert.equal(L.readProgress(p,state),completedRows);
      }
      L.boundedLogAppend(fd,Buffer.from(JSON.stringify({completedRows:invalid})+"\n"),totals);
      assert.throws(()=>L.readProgress(p,state));
    } finally{closeSync(fd);}
  }
});
test("all pilot and full addresses share the unchanged exclusion and lock lane",()=>{
  assert.equal(R.LANE,".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827");
  for(const cached of ["","-cached"])for(const phase of ["pilot","full"])for(const verb of ["run","launch"]) {
    const command=verb+"-f6c"+cached+"-root-cover-"+phase+".mjs",own={pid:1,ppid:0,command:"synthetic-parent"};
    assert.throws(()=>L.assertNoCompetingPilot([own,{pid:2,ppid:0,command}],1));
    L.assertNoCompetingPilot([own,{pid:2,ppid:1,command}],1);
  }
  assert.match(readFileSync(R.LAUNCHER,"utf8"),/reserveLock\(path\.join\(lane,"\.pilot\.lock"\)/u);
});
test("full machine plan refuses pilot scope and prior resource plan without relaxing operational limits",()=>{
  for(const patch of [
    p=>p.schema="braid-program/f6c-cached-root-cover-pilot-launch.v1",
    p=>p.scope="pilot-cell-0",p=>p.comparisonContract.scope="pilot-cell-0",
    p=>p.resourcePlan.path="reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md",
    p=>p.resourcePlan.sha256="36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4",
  ]){const p=plan();patch(p);assert.throws(()=>R.validatePlan(p,root,"1".repeat(64),"1".repeat(64)));}
  assert.equal(R.LIMIT_MS,1800000);assert.equal(R.LOG_LIMIT,16*1024**2);assert.equal(R.FILE_LIMIT,64*1024**2);
  assert.equal(R.PINS["reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md"],
    "36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4");
  assert.equal(R.PINS[R.CONSUMER],"af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386");
  assert.equal(R.PINS[R.COMPARISON],"19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132");
});

const FULL_COMMON_REPLACEMENTS=[
  [
    "scripts/eom/run-f6c-cached-root-cover-pilot.mjs",
    "scripts/eom/run-f6c-cached-root-cover-full.mjs"
  ],
  [
    "scripts/eom/launch-f6c-cached-root-cover-pilot.mjs",
    "scripts/eom/launch-f6c-cached-root-cover-full.mjs"
  ],
  [
    "braid-program/f6c-cached-root-cover-pilot-launch.v1",
    "braid-program/f6c-cached-root-cover-full-launch.v1"
  ],
  [
    "braid-program/f6c-cached-root-cover-pilot-admission.v1",
    "braid-program/f6c-cached-root-cover-full-admission.v1"
  ],
  [
    "pilot-cell-0",
    "full"
  ],
  [
    "pilot-admission.json",
    "full-admission.json"
  ],
  [
    "pilot-rejection.json",
    "full-rejection.json"
  ]
];
const FULL_ENTRY_REPLACEMENTS=[
  [
    "export const RESOURCE_PLAN = \"reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md\";",
    "export const RESOURCE_PLAN = \"reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md\";"
  ],
  [
    "\"one-cell scope required\"",
    "\"full 160-cell scope required\""
  ],
  [
    "completion.conditionalLibraryRows===64",
    "completion.conditionalLibraryRows===10240"
  ],
  [
    "completion.pieceRecords===112",
    "completion.pieceRecords===17920"
  ],
  [
    "manifest.rowCount===64",
    "manifest.rowCount===10240"
  ],
  [
    "manifest.cellCount===1",
    "manifest.cellCount===160"
  ],
  [
    "manifest.ordinaryNonselfRows===56",
    "manifest.ordinaryNonselfRows===8960"
  ],
  [
    "manifest.selfExclusionRows===8",
    "manifest.selfExclusionRows===1280"
  ],
  [
    "manifest.pieceRecordCount===112",
    "manifest.pieceRecordCount===17920"
  ],
  [
    "a.cellCount===1",
    "a.cellCount===160"
  ],
  [
    "a.pairCellCertificates===64",
    "a.pairCellCertificates===10240"
  ],
  [
    "a.ordinaryNonselfRows===56",
    "a.ordinaryNonselfRows===8960"
  ],
  [
    "a.selfExclusionRows===8",
    "a.selfExclusionRows===1280"
  ],
  [
    "a.distinctNonselfFaceChecks===112",
    "a.distinctNonselfFaceChecks===17920"
  ],
  [
    "a.pieceRecordCount===112",
    "a.pieceRecordCount===17920"
  ],
  [
    "\"completed pilot admission required\"",
    "\"completed full admission required\""
  ],
  [
    "[RESOURCE_PLAN]: \"36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4\"",
    "[RESOURCE_PLAN]: \"daeb71bee6260c38a6b7e5e6237110216d9315807fe23602fbd7cfcdddc5866b\""
  ]
];
const FULL_LAUNCHER_REPLACEMENTS=[
  [
    "(?:run|launch)-f6c(?:-cached)?-root-cover-pilot\\.mjs",
    "(?:run|launch)-f6c(?:-cached)?-root-cover-(?:pilot|full)\\.mjs"
  ],
  [
    "row.completedRows<=64",
    "row.completedRows<=10240"
  ],
  [
    "completedRows=64;else comparedRows=64",
    "completedRows=10240;else comparedRows=10240"
  ],
  [
    "source-bound one-cell conditional reconstructed-family coverage with separate frozen comparison",
    "source-bound full 160-cell conditional reconstructed-family coverage with separate frozen comparison"
  ],
  [
    "fresh direct child of canonical ignored pilot lane required",
    "fresh direct child of canonical ignored root-cover lane required"
  ],
  [
    "pilot interrupted",
    "full cover interrupted"
  ],
  [
    "inclusive pilot deadline",
    "inclusive full-cover deadline"
  ],
  [
    "operator interrupted pilot",
    "operator interrupted full cover"
  ],
  [
    "inclusive pilot wall deadline",
    "inclusive full-cover wall deadline"
  ],
  [
    "kind:\"f6c-pilot-heartbeat\"",
    "kind:\"f6c-full-heartbeat\""
  ],
  [
    "competing response/root-cover pilot observed",
    "competing response/root-cover attempt observed"
  ]
];
const FULL_TEST_REPLACEMENTS=[
  [
    "scripts/eom/run-f6c-cached-root-cover-pilot.mjs",
    "scripts/eom/run-f6c-cached-root-cover-full.mjs"
  ],
  [
    "scripts/eom/launch-f6c-cached-root-cover-pilot.mjs",
    "scripts/eom/launch-f6c-cached-root-cover-full.mjs"
  ],
  [
    "braid-program/f6c-cached-root-cover-pilot-launch.v1",
    "braid-program/f6c-cached-root-cover-full-launch.v1"
  ],
  [
    "braid-program/f6c-cached-root-cover-pilot-admission.v1",
    "braid-program/f6c-cached-root-cover-full-admission.v1"
  ],
  [
    "pilot-cell-0",
    "full"
  ],
  [
    "pilot-admission.json",
    "full-admission.json"
  ],
  [
    "pilot-rejection.json",
    "full-rejection.json"
  ],
  [
    "p=>p.scope=\"full\",p=>p.comparisonContract.scope=\"full\"",
    "p=>p.scope=\"pilot-cell-0\",p=>p.comparisonContract.scope=\"pilot-cell-0\""
  ],
  [
    "machine plan is pilot-only",
    "machine plan is full-only"
  ],
  [
    "one-cell-only arguments",
    "full-only arguments"
  ],
  [
    "rowCount:64",
    "rowCount:10240"
  ],
  [
    "cellCount:1",
    "cellCount:160"
  ],
  [
    "ordinaryNonselfRows:56",
    "ordinaryNonselfRows:8960"
  ],
  [
    "selfExclusionRows:8",
    "selfExclusionRows:1280"
  ],
  [
    "pieceRecordCount:112",
    "pieceRecordCount:17920"
  ],
  [
    "conditionalLibraryRows:64",
    "conditionalLibraryRows:10240"
  ],
  [
    "pieceRecords:112",
    "pieceRecords:17920"
  ],
  [
    "pairCellCertificates:64",
    "pairCellCertificates:10240"
  ],
  [
    "distinctNonselfFaceChecks:112",
    "distinctNonselfFaceChecks:17920"
  ]
];
const FULL_EXTRA_PINS=[
  [
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md",
    "36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/rows.ndjson",
    "786785b2597bcdf024e350ba89c129fb32115afed693169a6db3137c6bdca383"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/pieces.ndjson",
    "2c064a5956e7684868cbda7aa7e312ac609e07760bf67f1cf121c934d6d4c411"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/cover-manifest.json",
    "19fae257f7f36d858fa60d9031125b3f29dbb8780e944802699aab5292275f4c"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/comparison.json",
    "6bf2b50ef4f0b46f43ae77a9881f82a2f9d504d5df757bc0ad215deb8eac36c6"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/pilot-admission.json",
    "1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/launcher-stderr.log",
    "627a923d57d0c5b7c7472d526040a8c097616ce8dab314ac8540188c24aedbee"
  ],
  [
    ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/resource-observations.ndjson",
    "b51612a9a1689f54d54f89e416f390b2a36fec45e5859772f8755e6634ccf3dd"
  ],
  [
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json",
    "5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86"
  ]
];
const FULL_EXTRA_PIN_LINES="  \"reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md\": \"36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/rows.ndjson\": \"786785b2597bcdf024e350ba89c129fb32115afed693169a6db3137c6bdca383\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/pieces.ndjson\": \"2c064a5956e7684868cbda7aa7e312ac609e07760bf67f1cf121c934d6d4c411\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/cover-manifest.json\": \"19fae257f7f36d858fa60d9031125b3f29dbb8780e944802699aab5292275f4c\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/comparison.json\": \"6bf2b50ef4f0b46f43ae77a9881f82a2f9d504d5df757bc0ad215deb8eac36c6\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/pilot-admission.json\": \"1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/launcher-stderr.log\": \"627a923d57d0c5b7c7472d526040a8c097616ce8dab314ac8540188c24aedbee\",\n  \".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/resource-observations.ndjson\": \"b51612a9a1689f54d54f89e416f390b2a36fec45e5859772f8755e6634ccf3dd\",\n  \"reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json\": \"5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86\",\n";
const retarget=(s,pairs)=>{for(const[a,b]of pairs)s=s.replaceAll(a,b);return s;};
const frozen=(p,h)=>{const raw=readFileSync(p);assert.equal(digest(raw),h,p);return raw.toString("utf8");};
test("full composition differs from frozen pilot only by declared addresses scope census and resource bindings",()=>{
  const entry=frozen("scripts/eom/run-f6c-cached-root-cover-pilot.mjs","a218845bdd25b16a71dc247315a5fc06d158bc1a0c793e0a299621025ca32541");
  let expected=retarget(retarget(entry,FULL_COMMON_REPLACEMENTS),FULL_ENTRY_REPLACEMENTS);
  expected=expected.replace('});\nexport const check',FULL_EXTRA_PIN_LINES+'});\nexport const check');
  assert.equal(readFileSync(R.ENTRY,"utf8"),expected);
  const launcher=frozen("scripts/eom/launch-f6c-cached-root-cover-pilot.mjs","b89aaaf336c2969115d3549a086bee334d398c85f2748c9fdc53dac9d56acdba");
  assert.equal(readFileSync(R.LAUNCHER,"utf8"),retarget(retarget(launcher,FULL_COMMON_REPLACEMENTS),FULL_LAUNCHER_REPLACEMENTS));
});
test("all32 original operational obligations survive full scope retargeting unchanged",()=>{
  const prior=frozen("tests/f6c-cached-root-cover-pilot-launcher.test.js","ad50f3dcb230e3a5181c5ac205f55b29584689eb8a434a7adbd01cd23dc856d9").split("\n// Cached successor binding controls;")[0];
  assert.equal(prior.match(/^test\(/gmu)?.length,26);
  const actual=readFileSync("tests/f6c-cached-root-cover-full.test.js","utf8").split("\n// Full-scope binding/census controls;")[0];
  assert.equal(actual,retarget(prior,FULL_TEST_REPLACEMENTS));
  const process=frozen("tests/f6c-cached-root-cover-pilot-process.test.js","f0055410c58fbfce291c235a0cd03339a742923619fa1bc6063fe294fb1c5411");
  assert.equal(process.match(/^test\(/gmu)?.length,6);
  assert.equal(readFileSync("tests/f6c-cached-root-cover-full-process.test.js","utf8"),retarget(process,FULL_COMMON_REPLACEMENTS));
});
test("measured full resource rule and every frozen pilot input are mandatory source bindings",()=>{
  const bindings=new Map(R.planBindings(plan(),root).map(b=>[b.path,b.sha256]));
  for(const[p,h]of FULL_EXTRA_PINS){assert.equal(R.PINS[p],h);assert.equal(bindings.get(path.resolve(root,p)),h);}
  assert.equal(R.PINS[R.RESOURCE_PLAN],"daeb71bee6260c38a6b7e5e6237110216d9315807fe23602fbd7cfcdddc5866b");
  const resource=frozen(R.RESOURCE_PLAN,R.PINS[R.RESOURCE_PLAN]);
  assert.ok(resource.includes("160\\times 8.534247625=1365.47962"));
  // Exact integer arithmetic verifies the frozen planning numbers, not actual timing.
  assert.equal(160n*8534247625n,1365479620000n);
  assert.ok(1365479620000n<1800n*1000000000n);
  const bad=plan();bad.resourcePlan.sha256="0".repeat(64);
  assert.throws(()=>R.validatePlan(bad,root,"1".repeat(64),"1".repeat(64)));
});

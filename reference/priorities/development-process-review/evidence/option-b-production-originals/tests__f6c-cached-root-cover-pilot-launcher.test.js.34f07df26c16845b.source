import { f6cTestIdentities, selectedLaunchBindings } from './support/option-b-f6c-test-identities.mjs';
const F6C_IDENTITIES = f6cTestIdentities('tests/f6c-cached-root-cover-pilot-launcher.test.js', 50);
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
import * as R from "../scripts/eom/run-f6c-cached-root-cover-pilot.mjs";
import * as L from "../scripts/eom/launch-f6c-cached-root-cover-pilot.mjs";
import { currentOwnedGroup, descendantRecords } from "../scripts/eom/launch-subfield-circular-root-pilot.mjs";
const root=process.cwd(),digest=x=>createHash("sha256").update(x).digest("hex");
const sourceMapDigest=digest(readFileSync(R.SOURCE_MAP));
await R.initializeSourceBindings(root,sourceMapDigest);
const temp=()=>mkdtempSync(path.join(tmpdir(),"f6c-pilot-control-"));
const binding=(p,h="1".repeat(64))=>({path:p,sha256:h,bytes:1});
function plan() {
  const python=path.resolve(process.env.AAA_VENV??"../.venv","bin/python"),node=realpathSync(process.execPath);
  const sources=[R.CONSUMER,"scripts/eom/oracle/continuous_reception_roots_cached.py","scripts/eom/oracle/certified_history.py","scripts/eom/oracle/decimal_interval.py"];
  return {schema:"braid-program/f6c-cached-root-cover-pilot-launch.v2",scope:"pilot-cell-0",resourcePlan:binding(R.RESOURCE_PLAN,R.SOURCE_BINDINGS[R.RESOURCE_PLAN]),
    python,pythonRealPath:realpathSync(python),git:realpathSync("/usr/bin/git"),node,
    comparisonContract:{declarationSha256:R.SOURCE_BINDINGS["reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md"],verifierSha256:R.SOURCE_BINDINGS[R.COMPARISON],scope:"pilot-cell-0",
      subjectSourceBindings:sources.map(p=>binding(p,R.SOURCE_BINDINGS[p])),runtimeBindings:[binding(realpathSync(python)),binding(realpathSync("/usr/bin/git")),binding(path.resolve(python,"../../pyvenv.cfg"))]},
    operationalBindings:[R.ENTRY,R.LAUNCHER,R.OUTER,"/bin/ps","/usr/bin/memory_pressure",node].map(p=>binding(p,R.SOURCE_BINDINGS[p]??"1".repeat(64))),
    controlBindings:["tests/test_f6c_cached_continuous_reception_root_cover_preparation.py","tests/test_f6c_cached_continuous_reception_root_cover.py"].map(p=>binding(p,R.SOURCE_BINDINGS[p]))};
}
test("machine plan is pilot-only and binds complete frozen sources/environment",()=>{
  const p=plan();assert.equal(R.validatePlan(p,root,"1".repeat(64),"1".repeat(64)),p);
  for(const mutate of [p=>p.schema=p.schema.replace(".v2",".v1"),p=>p.scope="full",p=>p.comparisonContract.scope="full",p=>p.operationalBindings.pop(),
    p=>p.comparisonContract.subjectSourceBindings.pop(),p=>p.comparisonContract.runtimeBindings.pop(),
    p=>p.resourcePlan.sha256="0".repeat(64),p=>p.extra=true,p=>p.pythonRealPath=p.python,p=>p.controlBindings[0].sha256="0".repeat(64)]) {
    const bad=structuredClone(p);mutate(bad);assert.throws(()=>R.validatePlan(bad,root,"1".repeat(64),"1".repeat(64)));
  }
});
test("all frozen hashes and comparison schema match disk without reading scientific data",()=>{
  for(const [p,h] of Object.entries(R.SOURCE_BINDINGS))if(!p.startsWith(".local-data/")&&!p.startsWith("/"))assert.equal(digest(readFileSync(p)),h,p);
  assert.match(readFileSync(R.COMPARISON,"utf8"),/REPORT_SCHEMA = "braid-program\/f6c-continuous-reception-root-cover-conformance.v1"/);
});
test("source capture rejects replacement, symlinks, byte bound and overwrite",()=>{
  const dir=temp(),f=path.join(dir,"source");writeFileSync(f,"abc");
  assert.equal(R.readBound(f,digest("abc"),true).data.toString(),"abc");
  assert.throws(()=>R.readBound(f,"0".repeat(64)));assert.throws(()=>R.readBound(f,undefined,true,2));
  symlinkSync(f,path.join(dir,"alias"));assert.throws(()=>R.readBound(path.join(dir,"alias")));
  assert.throws(()=>R.writeNew(f,{overwrite:true}));assert.equal(readFileSync(f,"utf8"),"abc");
});
test("stage controls retain exact hash/manifest and one-cell-only arguments",()=>{
  const p=plan(),out=path.join(temp(),"run"),pb=binding("/fixture/plan");
  const a=R.stageSpec({stage:"consumer",plan:p,planBinding:pb,root,output:out,budget:"0.125"});
  assert.deepEqual(a.args.slice(0,4),["-I","-B","-c",R.PYTHON_BOOTSTRAP]);assert.equal(a.command,p.python);
  assert.equal(a.args[a.args.indexOf("--scope")+1],"pilot-cell-0");
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
  const manifest=R.writeNew(path.join(output,"subject/cover-manifest.json"),{accepted:false,scope:"pilot-cell-0",status:"conditional_complete",rowCount:64,cellCount:1,ordinaryNonselfRows:56,selfExclusionRows:8,pieceRecordCount:112,
    launchPlan:pb,rows,pieces,subjectSourceBindings:p.comparisonContract.subjectSourceBindings,runtimeBindings:p.comparisonContract.runtimeBindings});
  const completion={completed:true,accepted:false,h3EvidenceEligible:false,elapsedSeconds:1,scope:"pilot-cell-0",conditionalLibraryRows:64,pieceRecords:112,recordedGeometryPieceVisits:168,
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
  const report={schema:"braid-program/f6c-continuous-reception-root-cover-conformance.v1",accepted:true,scope:"pilot-cell-0",manifest:consumer.outputs[2],launchPlan:job.planBinding,verifier:{sha256:R.SOURCE_BINDINGS[R.COMPARISON]},
    rows:consumer.outputs[0],pieces:consumer.outputs[1],analysis:{accepted:false,conditionalEnclosuresConformant:true,cellCount:1,pairCellCertificates:64,ordinaryNonselfRows:56,selfExclusionRows:8,distinctNonselfFaceChecks:112,pieceRecordCount:112,recordedGeometryPieceVisits:168},
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
  assert.equal(R.fileOperation(active).path,path.join(out,"pilot-admission.json"));assert.throws(()=>R.fileOperation(active));
});
test("launcher CLI requires all exact hashes and rejects path traversal",()=>{
  const argv=["--out",".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/new","--plan","plan","--plan-sha256","1".repeat(64),"--launcher-sha256","2".repeat(64),"--entry-sha256","3".repeat(64),"--source-map-sha256",sourceMapDigest];
  assert.equal(L.parseArgs(argv).entrySha256,"3".repeat(64));assert.throws(()=>L.parseArgs(argv.slice(0,-2)));
  const bad=[...argv];bad[1]="a/../b";assert.throws(()=>L.parseArgs(bad));
});
test("source composition pins unchanged registered bootstrap and sequential stages",()=>{
  const src=readFileSync("scripts/eom/launch-f6c-cached-root-cover-pilot.mjs","utf8");
  assert.match(src,/for\(const stage of \["consumer","comparison"\]\)/);assert.match(src,/await outer\.superviseRegisteredPilot/);
  assert.match(src,/startedAtMs:began,limitMs:LIMIT_MS/);assert.match(src,/startupAbortInspection\(inspect,abort.signal\)/);
  assert.match(src,/await worker\(\{kind:"recheck",sources:\[\.\.\.sources,\.\.\.evidence,publication\]\}\)/);
  assert.match(src,/publicationRequires:/);assert.match(src,/post-completion deadline/);
});

// Cached successor binding controls; all preceding baseline obligations are intact.
const CACHED_PATH_REPLACEMENTS=[
  [
    "scripts/eom/run-f6c-root-cover-pilot.mjs",
    "scripts/eom/run-f6c-cached-root-cover-pilot.mjs"
  ],
  [
    "scripts/eom/launch-f6c-root-cover-pilot.mjs",
    "scripts/eom/launch-f6c-cached-root-cover-pilot.mjs"
  ],
  [
    "scripts/eom/prepare-f6c-continuous-reception-root-cover.py",
    "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py"
  ],
  [
    "scripts/eom/verify-f6c-continuous-reception-root-cover.py",
    "scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py"
  ],
  [
    "tests/test_f6c_continuous_reception_root_cover_preparation.py",
    "tests/test_f6c_cached_continuous_reception_root_cover_preparation.py"
  ],
  [
    "tests/test_f6c_continuous_reception_root_cover.py",
    "tests/test_f6c_cached_continuous_reception_root_cover.py"
  ],
  [
    "scripts/eom/oracle/continuous_reception_roots.py",
    "scripts/eom/oracle/continuous_reception_roots_cached.py"
  ],
  [
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md",
    "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md"
  ],
  [
    "braid-program/f6c-root-cover-pilot-launch.v2",
    "braid-program/f6c-cached-root-cover-pilot-launch.v2"
  ],
  [
    "braid-program/f6c-root-cover-pilot-admission.v1",
    "braid-program/f6c-cached-root-cover-pilot-admission.v1"
  ]
];
const CACHED_HASH_REPLACEMENTS=[
  [
    F6C_IDENTITIES[0],
    F6C_IDENTITIES[1]
  ],
  [
    F6C_IDENTITIES[2],
    F6C_IDENTITIES[3]
  ],
  [
    F6C_IDENTITIES[4],
    F6C_IDENTITIES[5]
  ],
  [
    F6C_IDENTITIES[6],
    F6C_IDENTITIES[7]
  ],
  [
    F6C_IDENTITIES[8],
    F6C_IDENTITIES[9]
  ],
  [
    F6C_IDENTITIES[10],
    F6C_IDENTITIES[11]
  ]
];
const CACHED_EXTRA_PINS=F6C_IDENTITIES[12];
const CACHED_EXPECTED_PINS={
  "scripts/eom/launch-subfield-circular-root-pilot.mjs": F6C_IDENTITIES[13],
  "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py": F6C_IDENTITIES[14],
  "scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py": F6C_IDENTITIES[15],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md": F6C_IDENTITIES[16],
  "tests/test_f6c_cached_continuous_reception_root_cover_preparation.py": F6C_IDENTITIES[17],
  "tests/test_f6c_cached_continuous_reception_root_cover.py": F6C_IDENTITIES[18],
  "scripts/eom/oracle/continuous_reception_roots_cached.py": F6C_IDENTITIES[19],
  "scripts/eom/oracle/certified_history.py": F6C_IDENTITIES[20],
  "scripts/eom/oracle/decimal_interval.py": F6C_IDENTITIES[21],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-predeclaration.md": F6C_IDENTITIES[22],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md": F6C_IDENTITIES[23],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md": F6C_IDENTITIES[24],
  "tests/test_eom_continuous_reception_roots.py": F6C_IDENTITIES[25],
  "scripts/eom/verify-f6c-accepted-frame-reconstruction.py": F6C_IDENTITIES[26],
  "scripts/eom/verify-f6c-retained-history-guards.py": F6C_IDENTITIES[27],
  ".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json": F6C_IDENTITIES[28],
  ".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json": F6C_IDENTITIES[29],
  ".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json": F6C_IDENTITIES[30],
  "tests/test_eom_continuous_reception_roots_cached.py": F6C_IDENTITIES[31],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md": F6C_IDENTITIES[32],
  "scripts/eom/oracle/continuous_reception_roots.py": F6C_IDENTITIES[33],
  "scripts/eom/verify-f6c-continuous-reception-root-cover.py": F6C_IDENTITIES[34],
  "tests/test_f6c_continuous_reception_root_cover.py": F6C_IDENTITIES[35],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md": F6C_IDENTITIES[36],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md": F6C_IDENTITIES[37]
};
const CACHED_REGEX_REPLACEMENT=["/reduce-prescribed-acceleration-response\\.py|(?:run|launch)-f6c-root-cover-pilot\\.mjs|prepare-f6c-continuous-reception-root-cover\\.py/u","/reduce-prescribed-acceleration-response\\.py|(?:run|launch)-f6c(?:-cached)?-root-cover-pilot\\.mjs|prepare-f6c(?:-cached)?-continuous-reception-root-cover\\.py/u"];
const replacePaths=source=>{for(const[a,b]of CACHED_PATH_REPLACEMENTS)source=source.split(a).join(b);return source;};
// These are historical construction checks against the pre-B source generation.
// Preserve their original hashes and transformations; retrieve bytes without execution.
const constructionBaseline=JSON.parse(readFileSync("reference/priorities/development-process-review/contracts/option-b-root-cover-baseline.json"));
const frozen=(p,h)=>{const bytes=execFileSync("git",["show",`${constructionBaseline.commit}:${p}`]);assert.equal(digest(bytes),h,p);return bytes.toString("utf8");};
test("cached composition retains its exact historical pre-B construction delta",()=>{
  const oldEntry=frozen("scripts/eom/run-f6c-root-cover-pilot.mjs",F6C_IDENTITIES[38]);
  let expected=replacePaths(oldEntry);
  for(const[a,b]of CACHED_HASH_REPLACEMENTS){assert.equal(expected.split(a).length,2);expected=expected.replace(a,b);}
  const marker=F6C_IDENTITIES[39];
  assert.equal(expected.split(marker).length,2);expected=expected.replace(marker,marker+CACHED_EXTRA_PINS);
  assert.equal(frozen(R.ENTRY,F6C_IDENTITIES[40]),expected);
  const oldLauncher=frozen("scripts/eom/launch-f6c-root-cover-pilot.mjs",F6C_IDENTITIES[41]);
  expected=replacePaths(oldLauncher);
  const[a,b]=CACHED_REGEX_REPLACEMENT;assert.equal(expected.split(a).length,2);expected=expected.replace(a,b);
  assert.equal(frozen(R.LAUNCHER,F6C_IDENTITIES[42]),expected);
  // The historical table is checked against its original source generation.
  const historicalEntry=frozen(R.ENTRY,F6C_IDENTITIES[40]);
  for(const [p,h] of Object.entries(CACHED_EXPECTED_PINS))
    assert.ok(historicalEntry.includes(JSON.stringify(h)),p);
  assert.deepEqual(R.SOURCE_BINDINGS,selectedLaunchBindings('cached-root-cover'));
});
test("historical 32 entry/launcher/process obligations retain exact retargeting",()=>{
  const unit=frozen("tests/f6c-root-cover-pilot.test.js",F6C_IDENTITIES[43]);
  const proc=frozen("tests/f6c-root-cover-pilot-process.test.js",F6C_IDENTITIES[44]);
  assert.equal((unit.match(/^test\(/gmu)??[]).length,26);
  assert.equal((proc.match(/^test\(/gmu)??[]).length,6);
  const actual=frozen("tests/f6c-cached-root-cover-pilot-launcher.test.js",F6C_IDENTITIES[45]);
  assert.equal(actual.slice(0,actual.indexOf("\n// Cached successor binding controls;")),replacePaths(unit));
  assert.equal(frozen("tests/f6c-cached-root-cover-pilot-process.test.js",F6C_IDENTITIES[46]),replacePaths(proc));
});
test("old or mixed launch bindings cannot select the cached composition",()=>{
  for(const mutate of [
    p=>p.schema="braid-program/f6c-root-cover-pilot-launch.v2",
    p=>p.comparisonContract.declarationSha256=F6C_IDENTITIES[47],
    p=>p.comparisonContract.verifierSha256=F6C_IDENTITIES[48],
    p=>p.comparisonContract.subjectSourceBindings[0].path="scripts/eom/prepare-f6c-continuous-reception-root-cover.py",
    p=>p.comparisonContract.subjectSourceBindings[1].path="scripts/eom/oracle/continuous_reception_roots.py",
    p=>p.controlBindings[0].path="tests/test_f6c_continuous_reception_root_cover_preparation.py",
  ]){const p=plan();mutate(p);assert.throws(()=>R.validatePlan(p,root,"1".repeat(64),"1".repeat(64)));}
});
test("all20 comparison fixed bindings occur in actual preflight closure, including prior resource return",()=>{
  const text=readFileSync(R.COMPARISON,"utf8"),decl=/^DECLARATION = "([^"]+)"$/mu.exec(text)[1],h=/^DECLARATION_SHA = "([^"]+)"$/mu.exec(text)[1];
  const block=text.split("FIXED = (\n")[1].split("\n)\nKNOT_SHA")[0];
  const fixed=block.trim().split("\n").map(line=>JSON.parse("["+line.trim().slice(1,-2).replace(/\bDECLARATION_SHA\b/gu,JSON.stringify(h)).replace(/\bDECLARATION\b/gu,JSON.stringify(decl))+"]"));
  assert.equal(fixed.length,20);
  const currentPlan=plan();
  currentPlan.operationalBindings=currentPlan.operationalBindings.map(b=>[R.ENTRY,R.LAUNCHER].includes(b.path)?binding(b.path,digest(readFileSync(b.path))):b);
  const bindings=new Map(R.planBindings(currentPlan,root).map(b=>[b.path,b.sha256]));
  for(const[role,p,hash]of fixed){assert.equal(R.SOURCE_BINDINGS[p],hash,role);assert.equal(bindings.get(path.resolve(root,p)),hash,role);}
  assert.equal(R.SOURCE_BINDINGS["reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md"],F6C_IDENTITIES[49]);
});
test("cached and baseline pilot addresses share exclusion and the unchanged lock lane",()=>{
  assert.equal(R.LANE,".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827");
  for(const command of ["run-f6c-root-cover-pilot.mjs","launch-f6c-root-cover-pilot.mjs","prepare-f6c-continuous-reception-root-cover.py","run-f6c-cached-root-cover-pilot.mjs","launch-f6c-cached-root-cover-pilot.mjs","prepare-f6c-cached-continuous-reception-root-cover.py","reduce-prescribed-acceleration-response.py"]){
    const own={pid:1,ppid:0,command:"synthetic-coordinator"};
    assert.throws(()=>L.assertNoCompetingPilot([own,{pid:2,ppid:0,command}],1),command);
    L.assertNoCompetingPilot([own,{pid:2,ppid:1,command}],1);
  }
  assert.match(readFileSync(R.LAUNCHER,"utf8"),/reserveLock\(path\.join\(lane,"\.pilot\.lock"\)/u);
});

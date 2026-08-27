import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { admitBuild, finalizeBuild, parseResource, readBound, writeNew } from "../scripts/eom/launch-f5-prehistory-handoff-build.mjs";
const digest = x => createHash("sha256").update(x).digest("hex");

test("resource admission has separate launch and running thresholds", () => {
  assert.equal(parseResource("System-wide memory free percentage: 40%\n", 64n*1024n**3n, true).accepted, true);
  assert.equal(parseResource("System-wide memory free percentage: 20%\n", 16n*1024n**3n, false).accepted, true);
  for (const [text, disk, launch] of [["System-wide memory free percentage: 39%", 64n*1024n**3n, true],
    ["System-wide memory free percentage: 19%", 64n*1024n**3n, false],
    ["System-wide memory free percentage: 99%", 16n*1024n**3n-1n, false],
    ["System-wide memory free percentage: 101%", 64n*1024n**3n, true],
    ["System-wide memory free percentage: 40%\nSystem-wide memory free percentage: 40%", 64n*1024n**3n, true]])
    assert.throws(() => parseResource(text, disk, launch));
});
test("bounded binding and exclusive output reject substitutions", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"f5-build-control-")), file=path.join(dir,"file");
  writeFileSync(file,"sample");
  assert.equal(readBound(file,digest("sample"),true).data.toString(),"sample");
  assert.throws(()=>readBound(file,"0".repeat(64)));
  symlinkSync(file,path.join(dir,"link"));assert.throws(()=>readBound(path.join(dir,"link")));
  assert.throws(()=>writeNew(file,{overwrite:true}));assert.equal(readFileSync(file,"utf8"),"sample");
});
test("synthetic build admission requires exact gate and completion census", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"f5-build-admission-control-"));
  const receipt={schema:"braid-program/f5-prehistory-handoff-build.v1",status:"build-recorded-pending-independent-review",
    accepted:false,rootCalls:0,dataLoaded:false,eomExecuted:false,evolutionAuthorized:false,h3EvidenceEligible:false,
    sourcesBefore:[],sourcesAfter:[],toolsBefore:[],toolsAfter:[],headerDependenciesBefore:[],headerDependenciesAfter:[],
    externalLibrariesBefore:[],externalLibrariesAfter:[],discoveryToolsBefore:[],built:{},producerSources:{},dependencyUnits:[],runtimeDependencies:[]};
  const log=writeNew(path.join(dir,"stage.log"),{synthetic:true});
  receipt.stages=[{code:0,signal:null,timedOut:false,interrupted:false,processGroupClosed:true,descendantsAfterClose:false,
    command:"synthetic",args:["--help"],log}];
  const build=writeNew(path.join(dir,"preparation.json"),receipt);
  const stdout=writeNew(path.join(dir,"stdout.log"),{completed:true,accepted:false,status:receipt.status,elapsedSeconds:1,receipt:build});
  const gate={requestedCommand:"synthetic",requestedArgs:["--help"],acknowledged:true,measurement:{code:0,signal:null}};
  const job={stdout,buildOutput:dir,gates:[gate]};
  // Synthetic receipts establish plumbing only; actual launch supplies frozen captured source/build bytes.
  assert.equal(admitBuild(job).gates,1);
  assert.throws(()=>admitBuild({...job,gates:[]}));
  assert.throws(()=>admitBuild({...job,gates:[{...gate,requestedArgs:["--inspect"]}]}));
  assert.throws(()=>admitBuild({...job,buildOutput:dir+"wrong"}));
});
test("final publication enforces deadline and does not overwrite", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"f5-build-final-control-"));
  const log=writeNew(path.join(dir,"log"),{synthetic:true});
  const job={output:dir,receipt:{accepted:false,stdoutLog:log,stderrLog:log},sources:[],deadlineNanoseconds:"0"};
  assert.throws(()=>finalizeBuild(job),/deadline/);
  const active={...job,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)};
  assert.ok(finalizeBuild(active).sha256);assert.throws(()=>finalizeBuild(active));
});
test("finalization keeps monitoring and stores captured source closure", () => {
  const source=readFileSync("scripts/eom/launch-f5-prehistory-handoff-build.mjs","utf8");
  assert.match(source,/receipt\.operationalSourceBindings = \[self, \.\.\.captures\]/);
  const tail=source.slice(source.indexOf("receipt = await running;"));
  assert.ok(tail.indexOf("clearInterval(timer)")>tail.indexOf("await workerAdmission"));
  assert.match(tail,/finalAbort\.signal/);
  assert.match(tail,/resourceObservations: \[\.\.\.observations\]/);
  assert.match(tail,/process\.off\("SIGINT", interrupt\)/);
});

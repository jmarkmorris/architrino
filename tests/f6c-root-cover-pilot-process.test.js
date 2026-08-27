// Synthetic process plumbing only. No Python/scientific data or mathematics runs.
import test from "node:test";
import assert from "node:assert/strict";
import cp from "node:child_process";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
const root=process.cwd(),digest=b=>createHash("sha256").update(b).digest("hex");
const outer=readFileSync("scripts/eom/launch-abc-enclosed-root-pilot.mjs");
const self=readFileSync("scripts/eom/launch-f6c-root-cover-pilot.mjs");
const entryPath="scripts/eom/run-f6c-root-cover-pilot.mjs";
const lane=".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827";
function entrySource(mode) {
  const program=mode==="child-failure"?"process.exit(7)":["lost-monitor","log-failure"].includes(mode)?"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)":"process.stdout.write(JSON.stringify({completed:true,accepted:false,synthetic:true})+'\\n')";
  return Buffer.from([
    "import {spawn} from 'node:child_process';import{mkdirSync,readFileSync,realpathSync}from'node:fs';",
    "import path from'node:path';import{fileURLToPath}from'node:url';",
    "import * as U from "+JSON.stringify(pathToFileURL(path.join(root,entryPath)).href)+";",
    "export const LANE="+JSON.stringify(lane)+";export const clean=U.clean,readBound=U.readBound,writeNew=U.writeNew,equal=U.equal;",
    "export function fileOperation(job){",
    " if(job.kind==='preflight')return{plan:{node:realpathSync(process.execPath)},planBinding:{path:job.planPath,sha256:job.planSha256,bytes:1},sources:[]};",
    " if(job.kind==='recheck')return U.checkBindings(job.sources);",
    " if(job.kind==='finalize'){"+(mode==="late-publication"?"const until=Date.now()+2500;while(Date.now()<until){};":"")+"return U.writeNew(path.join(job.output,'pilot-admission.json'),job.record);}",
    " if(job.kind==='admit'){",
    "  const completion=JSON.parse(readFileSync(job.stdout.path,'utf8')),out=job.output;let outputs;",
    "  if(job.stage==='consumer'){mkdirSync(path.join(out,'subject'));outputs=['rows.ndjson','pieces.ndjson','cover-manifest.json'].map(n=>U.writeNew(path.join(out,'subject',n),{synthetic:true,accepted:false}));}",
    "  else outputs=[U.writeNew(path.join(out,'comparison.json'),{synthetic:true,accepted:false})];",
    "  return{accepted:true,h3EvidenceEligible:false,completion,outputs,completionLog:U.clean(U.readBound(job.stdout.path)),resources:{stderr:U.clean(U.readBound(path.join(out,job.stage+'-process/runner-stderr.log')))}};",
    " }throw Error('unknown synthetic operation');}",
    "if(import.meta.url.startsWith('file:')&&process.argv[1]===fileURLToPath(import.meta.url)){",
    " const child=spawn(process.execPath,['-e',"+JSON.stringify(program)+"],{cwd:process.cwd(),detached:true,stdio:['ignore','pipe','pipe']});",
    " child.stdout.on('data',x=>process.stdout.write(x));child.stderr.on('data',x=>process.stderr.write(x));",
    " const code=await new Promise((r,j)=>{child.once('error',j);child.once('close',r)});if(code!==0)throw Error('synthetic child failed');}",
  ].join("\n"));
}
async function runFixture(mode) {
  const dir=realpathSync(mkdtempSync(path.join(tmpdir(),"f6c-registered-control-"))),entry=entrySource(mode);
  mkdirSync(path.join(dir,lane),{recursive:true});mkdirSync(path.join(dir,"scripts/eom"),{recursive:true});
  writeFileSync(path.join(dir,entryPath),"throw Error('disk source must not execute');\n");
  const original=cp.execFile,originalWrite=fs.writeSync;let psCalls=0;
  cp.execFile=function(command,args,options,callback){
    if(command==="/usr/bin/memory_pressure"){
      const child={pid:-1000};setImmediate(()=>callback(null,"System-wide memory free percentage: 100%\n"));return child;
    }
    if(command==="/bin/ps"){
      psCalls++;
      if(mode==="lost-monitor"&&psCalls>=6){setImmediate(()=>callback(new Error("synthetic lost monitor")));return {pid:-2000};}
      if(mode==="startup-interruption"&&psCalls===1)return original.call(this,command,args,options,(error,text)=>{process.emit("SIGTERM");callback(error,text);});
    }
    return original.call(this,command,args,options,callback);
  };
  fs.writeSync=function(fd,bytes,...args){
    if(mode==="log-failure"&&psCalls>=6&&Buffer.isBuffer(bytes)&&bytes.toString().includes('"kind":"aggregate-rss"'))throw new Error("synthetic ENOSPC monitor log");
    return originalWrite.call(this,fd,bytes,...args);
  };
  syncBuiltinESMExports();
  try {
    const module=await import("data:text/javascript;base64,"+self.toString("base64")),began=performance.now();
    const operation=module.launchCaptured({root:dir,options:{output:path.join(lane,"attempt"),plan:path.join(dir,"fake-plan"),planSha256:"1".repeat(64),launcherSha256:digest(self)},
      self:{path:path.join(root,"scripts/eom/launch-f6c-root-cover-pilot.mjs"),sha256:digest(self),bytes:self.length,data:self},
      entry:{path:path.join(dir,entryPath),sha256:digest(entry),bytes:entry.length,data:entry},outerBytes:outer,began,
      deadlineNanoseconds:String(process.hrtime.bigint()+1800000000000n)});
    if(["child-failure","lost-monitor","log-failure","startup-interruption"].includes(mode)) {
      await assert.rejects(operation);const reject=JSON.parse(readFileSync(path.join(dir,lane,"attempt/pilot-rejection.json")));
      assert.equal(reject.accepted,false);
      if(mode==="startup-interruption")assert.equal(reject.stages.length,0);
      else {
        assert.equal(reject.stages.length,1);
        if(["lost-monitor","log-failure"].includes(mode))assert.equal(reject.stages[0].gates.some(g=>g.target?.pid),true);
        if(mode==="lost-monitor"){
          assert.equal(reject.stages[0].processesClosed,false);assert.equal(reject.stages[0].cancellationObservedPidsAbsent,true);
        }else if(mode==="log-failure") {
          // The one-shot startup-abort guard may reject the first cleanup
          // inspection. Frozen fallback cancels the authenticated gate and
          // reports absence separately; never promote that to verified census.
          assert.equal(reject.stages[0].processesClosed===true||reject.stages[0].cancellationObservedPidsAbsent===true,true);
        }else assert.equal(reject.stages[0].processesClosed,true);
        for(const gate of reject.stages[0].gates)if(gate.target?.pid)assert.throws(()=>process.kill(gate.target.pid,0));
      }
      assert.equal(existsSync(path.join(dir,lane,"attempt/comparison-process")),false);
      assert.equal(existsSync(path.join(dir,lane,".pilot.lock")),false);return;
    }
    const result=await operation;
    assert.equal(result.accepted,true);assert.equal(result.processesClosed,true);assert.equal(result.workerAndMonitorClosed,true);
    assert.equal(result.maximumSampledAggregateRSSBytes>0,true);assert.equal(result.maximumSampleGapMs<=1000,true);
    assert.equal(result.finalObservationToClosureMs<=1000,true);assert.equal(existsSync(path.join(dir,lane,".pilot.lock")),false);
    const receipt=JSON.parse(readFileSync(result.receipt.path));assert.deepEqual(receipt.stages.map(x=>x.stage),["consumer","comparison"]);
    assert.equal(receipt.stages.every(x=>x.process.processesClosed&&x.process.gates.length===1),true);
    assert.equal(receipt.stages[0].process.gates[0].requestedCommand,process.execPath);
  } finally {cp.execFile=original;fs.writeSync=originalWrite;syncBuiltinESMExports();}
}
test("two captured synthetic stages register and close separately before final admission",()=>runFixture("pass"));
test("first synthetic target failure closes owned groups and prevents comparison dispatch",()=>runFixture("child-failure"));
test("slow final publication remains sampled through captured worker closure",()=>runFixture("late-publication"));
test("startup interruption launches no target and releases its owned lock",()=>runFixture("startup-interruption"));
test("lost process monitoring cancels a stubborn owned target with honest unverified closure",()=>runFixture("lost-monitor"));
test("monitor log failure cancels a stubborn owned target before any comparison",()=>runFixture("log-failure"));

// Explicitly synthetic process plumbing: no Python, G calculation or EOM runs.
import test from 'node:test';
import assert from 'node:assert/strict';
import cp from 'node:child_process';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { syncBuiltinESMExports } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const root=process.cwd(),digest=b=>createHash('sha256').update(b).digest('hex');
const outer=readFileSync('scripts/eom/launch-subfield-circular-root-pilot.mjs');
const self=readFileSync('scripts/eom/launch-prescribed-response-pilot.mjs');
const entryPath='scripts/eom/run-prescribed-response-pilot.mjs';
const lane='.local-data/braid-analysis',shared=lane+'/f6c-continuous-reception-root-cover-20260827';
function entrySource(mode){
  const program=mode==='child-failure'?'process.exit(7)': ['lost-monitor','log-failure','host-failure'].includes(mode)?"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)":"process.stdout.write(JSON.stringify({completed:true,accepted:false,synthetic:true,elapsedSeconds:0})+'\\n')";
  return Buffer.from([
    "import{spawn}from'node:child_process';import{mkdirSync,readFileSync,realpathSync}from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';",
    'import * as U from '+JSON.stringify(pathToFileURL(path.join(root,entryPath)).href)+';',
    'export const LANE='+JSON.stringify(lane)+';export const clean=U.clean,readBound=U.readBound,writeNew=U.writeNew,equal=U.equal,EXECUTION_SCOPE=U.EXECUTION_SCOPE,FALSE_CLAIMS=U.FALSE_CLAIMS;',
    'export function fileOperation(job){',
    " if(job.kind==='preflight')return{plan:{node:realpathSync(process.execPath)},planBinding:{path:job.planPath,sha256:job.planSha256,bytes:1},sources:[]};",
    " if(job.kind==='recheck')return U.checkBindings(job.sources);",
    " if(job.kind==='prepare-publication'){if(job.closedProcess.accepted!==true||job.compute.accepted!==true||job.execution.outputBytes!==0)throw Error('synthetic compute not closed');return U.writeNew(job.output+'-outer/publisher-job.json',{synthetic:true,execution:job.execution});}",
    " if(job.kind==='finalize'){ "+(mode==='late-publication'?"const until=Date.now()+1500;while(Date.now()<until){};":"")+"return U.writeNew(job.output+'-outer/pilot-admission.json',job.record);}",
    " if(job.kind==='admit'){",
    "  const completion=JSON.parse(readFileSync(job.stdout.path,'utf8'));let outputs;",
    "  if(job.stage==='compute'){mkdirSync(job.output);outputs=[U.writeNew(path.join(job.output,'private-candidate.json'),{synthetic:true,accepted:false})];}",
    "  else {if(!job.publicationJob||job.compute.accepted!==true)throw Error('synthetic prior closure missing');outputs=[U.writeNew(path.join(job.output,'response.json'),{synthetic:true,accepted:false})];}",
    "  return{accepted:true,h3EvidenceEligible:false,stage:job.stage,completion,outputs,completionLog:"+(mode==='wrong-stdout'?"{...job.stdout,sha256:'0'.repeat(64)}":"job.stdout")+"};",
    " }throw Error('unknown synthetic operation');}",
    "if(import.meta.url.startsWith('file:')&&process.argv[1]===fileURLToPath(import.meta.url)){",
    " const child=spawn(process.execPath,['-e',"+JSON.stringify(program)+"],{cwd:process.cwd(),detached:true,stdio:['ignore','pipe','pipe']});",
    " child.stdout.on('data',x=>process.stdout.write(x));child.stderr.on('data',x=>process.stderr.write(x));",
    " const code=await new Promise((r,j)=>{child.once('error',j);child.once('close',r)});if(code!==0)throw Error('synthetic child failed');}",
  ].join('\n'));
}
async function runFixture(mode){
  const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'prescribed-registered-control-'))),entry=entrySource(mode),data=path.join(dir,lane,'prescribed-response-attempt'),ops=data+'-outer';
  mkdirSync(path.join(dir,shared),{recursive:true});mkdirSync(path.join(dir,'scripts/eom'),{recursive:true});
  writeFileSync(path.join(dir,entryPath),"throw Error('uncaptured disk entry must not execute');\n");
  const original=cp.execFile,originalWrite=fs.writeSync,originalOpen=fs.openSync;let psCalls=0,hostCalls=0;
  cp.execFile=function(command,args,options,callback){
    if(command==='/usr/bin/memory_pressure'){
      hostCalls++;const child={pid:-1000};setImmediate(()=>callback(null,'System-wide memory free percentage: 100%\n'));return child;
    }
    if(command==='/bin/ps'){
      psCalls++;
      if(mode==='lost-monitor'&&psCalls>=6){setImmediate(()=>callback(new Error('synthetic lost monitor')));return{pid:-2000};}
      if(mode==='startup-interruption'&&psCalls===1)return original.call(this,command,args,options,(error,text)=>{process.emit('SIGTERM');callback(error,text);});
    }
    return original.call(this,command,args,options,callback);
  };
  fs.writeSync=function(fd,bytes,...args){
    if(mode==='log-failure'&&psCalls>=6&&Buffer.isBuffer(bytes)&&bytes.toString().includes('"kind":"aggregate-rss"'))throw Error('synthetic ENOSPC monitor log');
    return originalWrite.call(this,fd,bytes,...args);
  };
  fs.openSync=function(filename,...args){if(mode==='reservation-failure'&&filename===path.join(ops,'launcher-stderr.log'))throw Error('synthetic ENOSPC initial log');return originalOpen.call(this,filename,...args);};
  syncBuiltinESMExports();
  const sigint=process.listenerCount('SIGINT'),sigterm=process.listenerCount('SIGTERM');
  try{
    const module=await import('data:text/javascript;base64,'+self.toString('base64')),began=performance.now();
    const operation=module.launchCaptured({root:dir,options:{output:data,plan:path.join(dir,'fake-plan'),planSha256:'1'.repeat(64),launcherSha256:digest(self)},
      self:{path:path.join(root,'scripts/eom/launch-prescribed-response-pilot.mjs'),sha256:digest(self),bytes:self.length,data:self},
      entry:{path:path.join(dir,entryPath),sha256:digest(entry),bytes:entry.length,data:entry},outerBytes:outer,began,
      deadlineNanoseconds:String(process.hrtime.bigint()+1800000000000n)});
    if(['child-failure','lost-monitor','log-failure','startup-interruption','wrong-stdout','reservation-failure'].includes(mode)){
      await assert.rejects(operation);assert.equal(existsSync(path.join(ops,'publisher-process')),false);assert.equal(existsSync(path.join(dir,shared,'.pilot.lock')),false);
      if(mode!=='reservation-failure'){
        const rejected=JSON.parse(readFileSync(path.join(ops,'pilot-rejection.json')));assert.equal(rejected.accepted,false);
        if(mode==='startup-interruption')assert.equal(rejected.stages.length,0);
        else if(mode!=='wrong-stdout'){
          assert.equal(rejected.stages.length,1);
          for(const gate of rejected.stages[0].gates)if(gate.target?.pid)assert.throws(()=>process.kill(gate.target.pid,0));
          if(mode==='lost-monitor'){assert.equal(rejected.stages[0].processesClosed,false);assert.equal(rejected.stages[0].cancellationObservedPidsAbsent,true);}
          else assert.equal(rejected.stages[0].processesClosed===true||rejected.stages[0].cancellationObservedPidsAbsent===true,true);
        }
      }
      return;
    }
    const result=await operation;assert.equal(result.accepted,true);assert.equal(result.processesClosed,true);assert.equal(result.workerAndMonitorClosed,true);
    assert.equal(result.maximumSampledAggregateRSSBytes>0,true);assert.equal(result.maximumSampleGapMs<=1000,true);assert.equal(result.finalObservationToClosureMs<=1000,true);
    assert.equal(existsSync(path.join(dir,shared,'.pilot.lock')),false);assert.equal(result.receipt.path,path.join(ops,'pilot-admission.json'));
    const receipt=JSON.parse(readFileSync(result.receipt.path)),job=JSON.parse(readFileSync(path.join(ops,'publisher-job.json')));
    assert.deepEqual(receipt.stages.map(s=>s.stage),['compute','publisher']);assert.equal(receipt.stages.every(s=>s.process.processesClosed&&s.process.gates.length===1),true);
    assert.equal(job.execution.outputBytes,0);assert.equal(job.execution.publicationComplete,true);assert.equal(job.execution.elapsedSeconds<result.elapsedSeconds,true);
    assert.equal(receipt.externalWholeAttemptAdmissionRequired,true);assert.equal(receipt.claims.physicalStrengthChosen,false);
    assert.equal(receipt.stages[0].process.gates[0].requestedCommand,process.execPath);assert.equal(hostCalls>=3,true);
  }finally{cp.execFile=original;fs.writeSync=originalWrite;fs.openSync=originalOpen;syncBuiltinESMExports();assert.equal(process.listenerCount('SIGINT'),sigint);assert.equal(process.listenerCount('SIGTERM'),sigterm);}
}
test('synthetic compute closes before private job and publisher, then whole admission',()=>runFixture('pass'));
test('first target failure closes owned groups without publisher',()=>runFixture('child-failure'));
test('slow final publication remains sampled while worker is active',()=>runFixture('late-publication'));
test('startup interruption launches no target and releases owned lock',()=>runFixture('startup-interruption'));
test('lost monitor cancels stubborn target and preserves unverified census',()=>runFixture('lost-monitor'));
test('monitor sink failure cancels target and prevents publisher',()=>runFixture('log-failure'));
test('wrong completion binding prevents second stage',()=>runFixture('wrong-stdout'));
test('initial log ENOSPC leaves no timer, listener or process',()=>runFixture('reservation-failure'));

// Complete synthetic operational composition. Real captured Python wrapper and
// registered groups run, but mathematical admission/targets are explicitly fake.
import test from 'node:test';
import assert from 'node:assert/strict';
import cp from 'node:child_process';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {existsSync,mkdirSync,mkdtempSync,readFileSync,realpathSync,writeFileSync} from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=realpathSync(process.cwd()),hash=b=>createHash('sha256').update(b).digest('hex');
const outer=readFileSync('scripts/eom/launch-subfield-circular-root-pilot.mjs');
const helper=readFileSync('scripts/eom/launch-prescribed-response-pilot.mjs');
const self=readFileSync('scripts/eom/launch-f6c-refined-acceleration-pilot.mjs');
const entryPath='scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
const lane='.local-data/braid-analysis/f6c-refined-acceleration-20260827';
const lockLane='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827';
const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
function pythonSource(){return Buffer.from([
 'import hashlib,json,os,pathlib,signal,sys,time',
 'output,stage,mode=sys.argv[1:4];data=pathlib.Path(output);ops=pathlib.Path(output+"-outer")',
 'assert ops.is_dir()',
 'if mode=="child-failure":sys.exit(7)',
 'if mode in ("lost-monitor","log-failure","broken-diagnostic"):',
 ' signal.signal(signal.SIGTERM,signal.SIG_IGN)',
 ' if mode=="broken-diagnostic":(ops/"synthetic-target.json").write_text(json.dumps({"pid":os.getpid(),"pgid":os.getpgrp()}))',
 ' while True:time.sleep(.1)',
 'names=("range.json",)',
 'if stage=="consumer":',
 ' assert not data.exists();data.mkdir();targets=[data/name for name in names]',
 'else:',
 ' assert all((data/name).is_file() for name in names);targets=[ops/"comparison.json"]',
 'outputs=[]',
 'for target in targets:',
 ' raw=(json.dumps({"syntheticOnly":True,"accepted":False,"name":target.name})+"\\n").encode()',
 ' with target.open("xb") as stream:stream.write(raw)',
 ' outputs.append({"path":str(target),"sha256":hashlib.sha256(raw).hexdigest(),"bytes":len(raw)})',
 'if mode=="checker-failure" and stage=="comparison":sys.exit(8)',
 'print(json.dumps({"completed":True,"accepted":False,"syntheticOnly":True,"outputs":outputs}),flush=True)',
].join('\n'));}
function entrySource(mode,program,digest){return Buffer.from([
  "import{readFileSync,realpathSync}from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';",
  'import * as U from '+JSON.stringify(pathToFileURL(path.join(root,entryPath)).href)+';',
  'export const LANE=U.LANE,SHARED_LOCK_LANE=U.SHARED_LOCK_LANE,SCOPE=U.SCOPE,CENSUS=U.CENSUS;',
  'export const outputPaths=U.outputPaths,clean=U.clean,readBound=U.readBound,writeNew=U.writeNew,equal=U.equal;',
  'export function fileOperation(job){',
  " if(job.kind==='preflight')return{plan:{syntheticOnly:true},planBinding:{path:job.planPath,sha256:job.planSha256,bytes:1},sources:[]};",
  " if(job.kind==='recheck')return U.checkBindings(job.sources);",
  " if(job.kind==='finalize'){",
  mode==='slow-publication'?"  const until=Date.now()+2000;while(Date.now()<until){};":"",
  mode==='publication-failure'?"  U.writeNew(path.join(job.output+'-outer','partial-admission.json'),{accepted:false,syntheticOnly:true});throw Error('synthetic late publication failure');":"",
  "  return U.writeNew(path.join(job.output+'-outer','pilot-admission.json'),job.record);}",
  " if(job.kind==='admit'){",
  "  const completion=JSON.parse(readFileSync(job.stdout.path,'utf8'));if(!completion.syntheticOnly)throw Error('not synthetic');U.checkBindings(completion.outputs);",
  "  const stderr=U.clean(U.readBound(path.join(job.output+'-outer',job.stage+'-process/runner-stderr.log')));",
  "  const events=readFileSync(stderr.path,'utf8').trim().split('\\n').map(line=>JSON.parse(line));",
  "  const one=kind=>{const found=events.filter(x=>x.kind===kind);if(found.length!==1)throw Error('CPU event census');return found[0];};",
  "  const python=one('f6c-refined-range-python-process-resources'),entry=one('f6c-refined-range-entry-process-resources');",
  "  if(!(python.userSeconds>=0&&python.systemSeconds>=0&&python.maximumIndividualResidentBytes>0&&entry.resourceUsage.userCPUTime>=0))throw Error('real resource event missing');",
  "  return{accepted:true,h3EvidenceEligible:false,mathematicalAuthority:'synthetic process plumbing only',completion,outputs:completion.outputs,",
  mode==='wrong-stdout'?"   completionLog:{...job.stdout,sha256:'a'.repeat(64)},":"   completionLog:job.stdout,",
  "   resources:{stderr,python,entry}};}",
  " throw Error('unknown synthetic operation');}",
  "if(import.meta.url.startsWith('file:')&&process.argv[1]===fileURLToPath(import.meta.url)){",
  " const args=process.argv.slice(2),get=k=>args[args.indexOf(k)+1];",
  ' await U.runSingleStage({command:'+JSON.stringify(python)+",args:['-I','-B','-c',U.PYTHON_BOOTSTRAP,"+JSON.stringify(program)+','+JSON.stringify(digest)+",get('--out'),get('--stage'),"+JSON.stringify(mode)+']});',
  " console.error(JSON.stringify({kind:'f6c-refined-range-entry-process-resources',resourceUsage:process.resourceUsage()}));}",
].join('\n'));}
async function runFixture(mode){
  const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-refinement-registered-control-')));
  mkdirSync(path.join(dir,lane),{recursive:true});mkdirSync(path.join(dir,lockLane),{recursive:true});mkdirSync(path.join(dir,'scripts/eom'),{recursive:true});
  const program=path.join(dir,'synthetic.py'),programBytes=pythonSource();writeFileSync(program,programBytes);
  const entry=entrySource(mode,program,hash(programBytes));writeFileSync(path.join(dir,entryPath),"throw Error('uncaptured disk entry must never run');\n");
  const original=cp.execFile,originalWrite=fs.writeSync;let psCalls=0,diagnosticTimer;
  cp.execFile=function(command,args,options,callback){
    if(command==='/usr/bin/memory_pressure'){setImmediate(()=>callback(null,'System-wide memory free percentage: 100%\n'));return {pid:-1000};}
    if(command==='/bin/ps'){
      psCalls++;
      if(mode==='lost-monitor'&&psCalls>=6){setImmediate(()=>callback(Error('synthetic monitor lost')));return {pid:-2000};}
      if(mode==='startup-interruption'&&psCalls===1)return original.call(this,command,args,options,(error,text)=>{process.emit('SIGTERM');callback(error,text);});
    }
    return original.call(this,command,args,options,callback);
  };
  fs.writeSync=function(fd,bytes,...args){
    if(mode==='log-failure'&&psCalls>=6&&Buffer.isBuffer(bytes)&&bytes.toString().includes('"kind":"aggregate-rss"'))throw Error('synthetic monitor ENOSPC');
    return originalWrite.call(this,fd,bytes,...args);
  };syncBuiltinESMExports();
  const output=path.join(dir,lane,'attempt'),ops=output+'-outer';
  try{
    const L=await import('data:text/javascript;base64,'+self.toString('base64')),began=performance.now();
    const operation=L.launchCaptured({root:dir,options:{output,plan:path.join(dir,'fake-plan'),planSha256:'1'.repeat(64),launcherSha256:hash(self),python,git:'/usr/bin/git'},
      self:{path:path.join(root,'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs'),sha256:hash(self),bytes:self.length,data:self},
      entry:{path:path.join(dir,entryPath),sha256:hash(entry),bytes:entry.length,data:entry},outerBytes:outer,helperBytes:helper,began,deadlineNanoseconds:String(process.hrtime.bigint()+1800000000000n)});
    if(mode==='broken-diagnostic')diagnosticTimer=setInterval(()=>{const targetFile=path.join(ops,'synthetic-target.json');if(!existsSync(targetFile))return;clearInterval(diagnosticTimer);
      const target=JSON.parse(readFileSync(targetFile));process.once('message',message=>{assert.equal(message,'reader-closed');console.error('synthetic active-target diagnostic');});process.send({started:true,target,output,ops,lock:path.join(dir,lockLane,'.pilot.lock')});},10);
    if(!['pass','slow-publication'].includes(mode)){
      await assert.rejects(operation,mode==='broken-diagnostic'?/EPIPE/:undefined);const rejection=JSON.parse(readFileSync(path.join(ops,'pilot-rejection.json')));assert.equal(rejection.accepted,false);
      const expectedStages={'child-failure':1,'checker-failure':2,'publication-failure':2,'startup-interruption':0,'lost-monitor':1,'log-failure':1,'wrong-stdout':1,'broken-diagnostic':1};
      assert.equal(rejection.stages.length,expectedStages[mode],'intended failure stage must actually be exercised');
      const expectedFailure={'child-failure':/runner did not exit cleanly/,'checker-failure':/runner did not exit cleanly/,'publication-failure':/synthetic late publication/,
        'startup-interruption':/interrupted/,'lost-monitor':/interruption/,'log-failure':/interruption/,'wrong-stdout':/fresh supervisor logs differ/,'broken-diagnostic':/interruption|runner did not exit/};
      assert.match(rejection.failure,expectedFailure[mode]);
      if(mode==='startup-interruption'){assert.equal(rejection.stages.length,0);assert.equal(existsSync(output),false);}
      for(const stage of rejection.stages)for(const gate of stage.gates){
        for(const identity of [gate.identity,gate.target])if(identity?.pid)assert.throws(()=>process.kill(identity.pid,0));
        if(['lost-monitor','log-failure','broken-diagnostic'].includes(mode)){assert.ok(gate.target?.pid,'stubborn target actually started');assert.equal(stage.cancellationObservedPidsAbsent,true);}
      }
      if(['child-failure','lost-monitor','log-failure','wrong-stdout','startup-interruption','broken-diagnostic'].includes(mode))assert.equal(existsSync(path.join(ops,'comparison-process')),false);
      if(mode==='broken-diagnostic'){assert.match(rejection.diagnosticFailure,/EPIPE/);assert.equal(existsSync(path.join(ops,'pilot-admission.json')),false);}
      if(mode==='publication-failure'){assert.equal(rejection.stages.length,2);assert.equal(existsSync(path.join(ops,'partial-admission.json')),true);}
      assert.equal(existsSync(path.join(dir,lockLane,'.pilot.lock')),false);return;
    }
    const result=await operation;assert.equal(result.accepted,true);assert.equal(result.processesClosed,true);assert.equal(result.workerAndMonitorClosed,true);assert.equal(result.lockReleased,true);
    assert.ok(result.maximumSampledAggregateRSSBytes>0);assert.ok(result.maximumSampleGapMs<=1000);assert.ok(result.finalObservationToClosureMs<=1000);
    assert.equal(existsSync(path.join(dir,lockLane,'.pilot.lock')),false);
    const receipt=JSON.parse(readFileSync(result.receipt.path));assert.deepEqual(receipt.stages.map(s=>s.stage),['consumer','comparison']);
    for(const s of receipt.stages){assert.equal(s.process.processesClosed,true);assert.equal(s.process.gates.length,1);assert.equal(s.process.gates[0].requestedCommand,python);
      for(const gate of s.process.gates)for(const identity of [gate.identity,gate.target,...gate.knownMembers])if(identity?.pid)assert.throws(()=>process.kill(identity.pid,0));
      assert.deepEqual(s.process.gates[0].requestedArgs.slice(0,3),['-I','-B','-c']);assert.ok(s.admission.resources.python.maximumIndividualResidentBytes>0);assert.ok(s.admission.resources.entry.resourceUsage.maxRSS>0);}
    assert.deepEqual(receipt.stages[0].admission.outputs.map(b=>b.path),['range.json'].map(p=>path.join(output,p)));assert.equal(receipt.census.pairRows,64);assert.equal(receipt.accelerationEvaluated,true);assert.equal(receipt.rootsEvaluated,false);assert.equal(receipt.stages[1].admission.outputs[0].path,path.join(ops,'comparison.json'));
  }finally{clearInterval(diagnosticTimer);cp.execFile=original;fs.writeSync=originalWrite;syncBuiltinESMExports();}
}
test('captured launcher worker entry and Python wrapper close two synthetic stages with measured CPU',()=>runFixture('pass'));
test('first Python failure closes owned groups and leaves data absent without checker dispatch',()=>runFixture('child-failure'));
test('checker failure after publication cannot promote its existing synthetic file',()=>runFixture('checker-failure'));
test('slow final publication stays observed through worker termination',()=>runFixture('slow-publication'));
test('late final publication failure preserves failed attempt and closed stage identities',()=>runFixture('publication-failure'));
test('startup interruption creates no target and releases owned common lock',()=>runFixture('startup-interruption'));
test('lost monitor cancels stubborn Python and prevents checker dispatch',()=>runFixture('lost-monitor'));
test('monitor sink failure cancels stubborn Python and prevents checker dispatch',()=>runFixture('log-failure'));
test('fresh stdout binding mismatch prevents comparison and retains closed first stage',()=>runFixture('wrong-stdout'));

async function closedDiagnosticChild(program){
  const child=cp.spawn(process.execPath,['--input-type=module','-e',program],{stdio:['ignore','pipe','pipe']});
  let out='',timedOut=false,exitCheck;child.stdout.on('data',x=>out+=x);
  const closed=new Promise((resolve,reject)=>{child.once('close',(code,signal)=>resolve({code,signal}));child.once('error',reject);});
  const exited=new Promise(resolve=>child.once('exit',(code,signal)=>{
    try{assert.throws(()=>process.kill(child.pid,0));}catch(error){exitCheck=error;}
    // Parent read-end closure is distinct from the already observed child exit
    // and PID absence. Never drain/close it to make the child's write succeed.
    child.stderr.destroy();resolve({code,signal});
  }));
  const timer=setTimeout(()=>{timedOut=true;child.kill('SIGKILL');},3000);
  let result;try{const exit=await exited;result=await closed;assert.deepEqual(result,exit);}finally{clearTimeout(timer);}
  if(exitCheck)throw exitCheck;assert.equal(timedOut,false,'bounded failure epilogue stranded process');
  assert.equal(result.code,1);assert.equal(result.signal,null);assert.equal(out,'');
}
test('real unread diagnostic pipe fails final drain then closes without a success completion',async()=>{
  const source=pathToFileURL(path.join(root,'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs')).href;
  await closedDiagnosticChild(`import{drainDiagnostics,failedCLICompletion}from${JSON.stringify(source)};process.stderr.write(Buffer.alloc(1024*1024));const began=performance.now()-1799900;try{await drainDiagnostics({began,lastSampleStartedMs:performance.now()});process.stdout.write('incorrect-pass');}catch(error){await failedCLICompletion(error,{began});}`);
});
test('real unread diagnostics close on early failure without a success completion',async()=>{
  const source=pathToFileURL(path.join(root,'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs')).href;
  await closedDiagnosticChild(`import{failedCLICompletion}from${JSON.stringify(source)};process.stderr.write(Buffer.alloc(1024*1024));await failedCLICompletion(Error('synthetic failure'),{began:performance.now()-1799900});`);
});
test('real active-target diagnostic EPIPE cancels owned group releases lock and emits no accepted completion',async()=>{
 const program=[
  "import assert from 'node:assert/strict';import cp from 'node:child_process';import fs from 'node:fs';",
  "import{createHash}from'node:crypto';import{existsSync,mkdirSync,mkdtempSync,readFileSync,realpathSync,writeFileSync}from'node:fs';",
  "import{syncBuiltinESMExports}from'node:module';import{tmpdir}from'node:os';import path from'node:path';import{pathToFileURL}from'node:url';",
  'const root='+JSON.stringify(root)+',hash=b=>createHash("sha256").update(b).digest("hex");',
  'const outer=readFileSync('+JSON.stringify(path.join(root,'scripts/eom/launch-subfield-circular-root-pilot.mjs'))+');',
  'const helper=readFileSync('+JSON.stringify(path.join(root,'scripts/eom/launch-prescribed-response-pilot.mjs'))+');',
  'const self=readFileSync('+JSON.stringify(path.join(root,'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs'))+');',
  'const entryPath='+JSON.stringify(entryPath)+',lane='+JSON.stringify(lane)+',lockLane='+JSON.stringify(lockLane)+',python='+JSON.stringify(python)+';',
  pythonSource.toString(),entrySource.toString(),runFixture.toString(),
  'const L=await import('+JSON.stringify(pathToFileURL(path.join(root,'scripts/eom/launch-f6c-refined-acceleration-pilot.mjs')).href)+');',
  "try{await runFixture('broken-diagnostic');await new Promise(resolve=>process.send({checked:true},resolve));",
  "await L.failedCLICompletion(Error('expected handled EPIPE'),{began:performance.now()-1799900});}",
  "catch(error){await new Promise(resolve=>process.send({testFailure:error.stack},resolve));process.exit(2);}",
 ].join('\n');
 const child=cp.spawn(process.execPath,['--input-type=module','-e',program],{stdio:['ignore','pipe','pipe','ipc']});
 let started,checked=false,testFailure,out='',timedOut=false;
 child.stdout.on('data',b=>out+=b);child.stderr.resume();
 child.on('message',message=>{if(message.started){started=message;child.stderr.destroy();child.send('reader-closed');}if(message.checked)checked=true;if(message.testFailure)testFailure=message.testFailure;});
 const timer=setTimeout(()=>{timedOut=true;child.kill('SIGKILL');},7000);
 let result;
 try{result=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}));});}
 finally{clearTimeout(timer);if(started)try{process.kill(started.target.pid,0);process.kill(-started.target.pgid,'SIGKILL');}catch{}}
 assert.equal(timedOut,false);assert.equal(testFailure,undefined,testFailure);assert.ok(started,'stubborn target was actually running before real pipe closure');
 assert.equal(checked,true);assert.deepEqual(result,{code:1,signal:null});assert.equal(out,'');
 assert.throws(()=>process.kill(child.pid,0));assert.throws(()=>process.kill(started.target.pid,0));assert.throws(()=>process.kill(-started.target.pgid,0));
 assert.equal(existsSync(started.lock),false);assert.equal(existsSync(path.join(started.ops,'comparison-process')),false);
 const rejected=JSON.parse(readFileSync(path.join(started.ops,'pilot-rejection.json')));assert.equal(rejected.accepted,false);assert.match(rejected.diagnosticFailure,/EPIPE/);
 assert.equal(existsSync(path.join(started.ops,'pilot-admission.json')),false);
});

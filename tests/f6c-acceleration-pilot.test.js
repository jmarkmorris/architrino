// Synthetic metadata/process controls only. No accepted history or range is evaluated.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,readFileSync,realpathSync,statSync,symlinkSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {EventEmitter} from 'node:events';
import {PassThrough} from 'node:stream';
import * as E from '../scripts/eom/run-f6c-acceleration-pilot.mjs';
import * as L from '../scripts/eom/launch-f6c-acceleration-pilot.mjs';
const root=realpathSync(process.cwd()),hash=b=>createHash('sha256').update(b).digest('hex'),H='a'.repeat(64);
const helperBytes=readFileSync(E.HELPERS),helpers=await L.reviewedHelpers(helperBytes);
const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const pythonReal=realpathSync(python),node=realpathSync(process.execPath),git='/synthetic/git';
const binding=(p,sha256=H,bytes=1)=>({path:p,sha256,bytes});
const falseFlags=names=>Object.fromEntries(names.map(n=>[n,false]));
const write=(p,v)=>{mkdirSync(path.dirname(p),{recursive:true});return E.writeNew(p,v);};
function directory(){const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-range-ops-control-')));mkdirSync(path.join(dir,E.LANE),{recursive:true});return dir;}
function planFixture(){return {schema:'braid-program/f6c-continuous-reception-acceleration-launch.v1',scope:E.SCOPE,
  consumer:binding(E.CONSUMER,E.PINS[E.CONSUMER]),controls:binding(E.CONSUMER_TESTS,E.PINS[E.CONSUMER_TESTS]),
  declaration:binding(E.DECLARATION,E.PINS[E.DECLARATION]),rangeVerifier:binding(E.CHECKER,E.CHECKER_SHA),
  runtimeBindings:[binding(pythonReal),binding(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg')),binding(git)],
  operationalBindings:[E.ENTRY,E.LAUNCHER,E.TESTS,E.PROCESS_TESTS,E.HELPERS,E.OUTER,E.CHECKER_TESTS,'/bin/ps','/usr/bin/memory_pressure',node].map(p=>binding(p,E.PINS[p]??H)),
  limits:{...E.LIMITS},priorCoverClosure:{authority:'externally-reviewed-caller-observation',ownerSha256:E.FIXED[9][2],admissionSha256:E.FIXED[5][2],matchingFreshCompletionObserved:true,exitCode:0,elapsedSeconds:'8.534247625',processesClosed:true,independentAuditAccepted:true}};}

test('all scientific implementation/control pins remain the separately accepted source generation',()=>{
  for(const p of [E.CONSUMER,E.CONSUMER_TESTS,E.DECLARATION,E.CHECKER,E.CHECKER_TESTS,E.HELPERS,E.OUTER,...E.FIXED.filter(([,p])=>!p.startsWith('.local-data')).map(([,p])=>p)])
    assert.equal(hash(readFileSync(p)),E.PINS[p],p);
  assert.equal(E.FIXED.length,16);assert.equal(E.CHECKER_SHA,'cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299');
});
test('closed plan has no invented runtime/default fields and exact operational closure',()=>{
  const plan=planFixture();
  // The Git path is explicit and checked against its real filesystem identity.
  const actualGit=realpathSync('/usr/bin/git');plan.runtimeBindings[2]=binding(actualGit);
  assert.equal(E.validatePlan(plan,root,H,H,python,actualGit),plan);
  for(const mutate of [p=>p.limits.inclusiveSeconds++,p=>p.scope='full',p=>p.python=python,
    p=>p.consumer.sha256=H,p=>p.rangeVerifier.sha256=H,p=>p.priorCoverClosure.exitCode=false,
    p=>p.operationalBindings.pop(),p=>p.operationalBindings.push(p.operationalBindings[0]),
    p=>p.runtimeBindings.splice(1,1),p=>p.priorCoverClosure.independentAuditAccepted=false]){
    const changed=structuredClone(plan);mutate(changed);assert.throws(()=>E.validatePlan(changed,root,H,H,python,actualGit));
  }
  const bindings=E.planBindings(plan,root);assert.equal(new Set(bindings.map(b=>b.path)).size,bindings.length);
  for(const [role,p,h] of E.FIXED)assert.equal(bindings.find(b=>b.path===path.join(root,p)).sha256,h,role);
});
test('duplicate JSON keys unsafe numbers malformed UTF8 and excessive nesting fail closed',()=>{
  for(const s of ['{"a":1,"a":2}','{"x":1e999}','{"x":9007199254740993}','{} true','['.repeat(130)+']'.repeat(130)])assert.throws(()=>E.decode(Buffer.from(s)));
  assert.throws(()=>E.decode(Buffer.from([255])));
  assert.equal(E.decode(Buffer.from('{"lexeme":"-0.000"}')).lexeme,'-0.000');
});
test('bounded source read and write preserve exact bytes and reject symlink/overwrite',()=>{
  const dir=directory(),p=path.join(dir,'file'),b=write(p,{synthetic:true});assert.deepEqual(E.readBound(p,b.sha256),b);
  assert.throws(()=>E.readBound(p,H));assert.throws(()=>E.readBound(p,b.sha256,true,1));assert.throws(()=>E.writeNew(p,{}));
  const link=path.join(dir,'link');symlinkSync(p,link);assert.throws(()=>E.readBound(link,b.sha256));
  assert.equal(L.captureBootstrapSource(p,b.sha256).sha256,b.sha256);
  assert.throws(()=>L.captureBootstrapSource(p,H));
});
test('pure helper capture refuses changed bytes and exposes only operational functions used here',async()=>{
  await assert.rejects(L.reviewedHelpers(Buffer.concat([helperBytes,Buffer.from('\n')])));
  for(const name of ['selectOwnedRows','acceptRSS','parseHostResource','runFileWorker','reserveLock','releaseLock','flushCompletion'])assert.equal(typeof helpers[name],'function');
});
test('data/outer siblings are distinct and stage CLI preserves original candidate and deadline',()=>{
  const dir=directory(),output=path.join(dir,E.LANE,'new'),plan=planFixture(),planBinding=binding(path.join(dir,'plan'));
  const paths=E.outputPaths(dir,output);assert.equal(paths.operations,output+'-outer');assert.equal(paths.candidate,path.join(output,'range.json'));
  const common={plan,root:dir,output,planBinding,python,git,budget:'12.345678901'};
  const consumer=E.stageSpec({...common,stage:'consumer'});
  assert.deepEqual(consumer.args.slice(0,3),['-I','-B','-c']);assert.equal(consumer.command,python);
  assert.equal(consumer.args[consumer.args.indexOf('--out-dir')+1],output);
  const candidate=binding(paths.candidate),checker=E.stageSpec({...common,stage:'comparison',candidate});
  assert.equal(checker.args[checker.args.indexOf('--candidate-sha256')+1],H);
  assert.equal(checker.args[checker.args.indexOf('--out')+1],paths.comparison);
  assert.deepEqual(checker.args.slice(-2),['--budget-seconds','12.345678901']);
  assert.throws(()=>E.stageSpec({...common,stage:'comparison',candidate:binding(path.join(dir,'wrong'))}));
  assert.throws(()=>E.stageSpec({...common,stage:'consumer',budget:'0'}));
  assert.throws(()=>E.outputPaths(dir,path.join(output,'subject')));
});
test('captured Python wrapper reports real target CPU separately and rejects changed source',()=>{
  const dir=directory(),p=path.join(dir,'synthetic.py'),bytes=Buffer.from('print("synthetic-only")\n');writeFileSync(p,bytes);
  const result=spawnSync(python,['-I','-B','-c',E.PYTHON_BOOTSTRAP,p,hash(bytes)],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr);assert.equal(result.stdout,'synthetic-only\n');
  const measured=JSON.parse(result.stderr.trim());assert.equal(measured.kind,'f6c-range-python-process-resources');
  for(const k of ['userSeconds','systemSeconds','waitedChildUserSeconds','waitedChildSystemSeconds'])assert.ok(Number.isFinite(measured[k])&&measured[k]>=0);
  assert.ok(measured.maximumIndividualResidentBytes>0);
  const bad=spawnSync(python,['-I','-B','-c',E.PYTHON_BOOTSTRAP,p,H],{encoding:'utf8',timeout:5000});assert.notEqual(bad.status,0);assert.equal(bad.stdout,'');
});
test('metadata inventory closes lazy large-integer division dependencies without scientific imports',()=>{
  const after=String.raw`
# Distinct bounded arithmetic operands exercise the public operation again.
checked_quotient=(10**21000+11)//(10**16000+13)
late=set()
for module in tuple(sys.modules.values()):
 for attribute in ('__file__','__cached__'):
  filename=getattr(module,attribute,None)
  if isinstance(filename,str):
   resolved=pathlib.Path(filename).resolve()
   if resolved.is_file() and resolved not in files:late.add(str(resolved))
helper=sys.modules.get('_pylong')
helper_paths={}
for attribute in ('__file__','__cached__'):
 filename=getattr(helper,attribute,None)
 if type(filename) is str:
  resolved=pathlib.Path(filename).resolve()
  helper_paths[attribute]={'path':str(resolved),'exists':resolved.is_file()}
print(json.dumps({'postExerciseUnlistedFiles':sorted(late),'observedHelperPaths':helper_paths}))
`;
  const result=spawnSync(python,['-I','-B','-c',E.PYTHON_RUNTIME_INVENTORY+after],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr);const [record,closure]=result.stdout.trim().split('\n').map(x=>JSON.parse(x));
  assert.equal(record.scientificDataLoaded,false);assert.equal(record.scientificModulesExecuted,false);
  assert.ok(record.files.some(p=>p.endsWith('/__future__.py')));assert.ok(record.files.includes(pythonReal));
  assert.ok(record.files.some(p=>p.endsWith('/_pylong.py')),'lazy integer-division source must be inventoried');
  assert.ok(closure.observedHelperPaths.__file__.exists);assert.ok(closure.observedHelperPaths.__cached__.path.endsWith('.pyc'));
  for(const observed of Object.values(closure.observedHelperPaths))assert.equal(record.files.includes(observed.path),observed.exists,'include every existing helper source/cache, never invent an absent cache');
  assert.deepEqual(closure.postExerciseUnlistedFiles,[]);
  assert.ok(record.files.every(p=>!p.includes('/scripts/eom/')));
});

function admissionFixture(stage){
  const dir=directory(),output=path.join(dir,E.LANE,'synthetic'),paths=E.outputPaths(dir,output),plan=planFixture();mkdirSync(paths.operations);
  const sources=E.FIXED.map(([,p])=>write(path.join(dir,p),{syntheticFixedBytes:true}));
  const fixed=Object.fromEntries(E.FIXED.map(([role,p])=>[role,sources.find(b=>b.path===path.join(dir,p))]));
  const planBinding=write(path.join(dir,'plan.json'),plan),subjectSources=Object.fromEntries(['consumer','controls','declaration','rangeVerifier'].map(k=>[k,{...plan[k],path:path.join(dir,plan[k].path)}]));
  const candidateRecord={schema:'braid-program/f6c-continuous-reception-acceleration-candidate.v1',scope:E.SCOPE,accepted:false,status:'conditional-range-candidate',
    census:E.CENSUS,fixedBindings:fixed,launchPlan:planBinding,consumer:subjectSources.consumer,declaration:plan.declaration,rangeVerifier:plan.rangeVerifier,
    priorCoverClosure:plan.priorCoverClosure,runtimeBindings:plan.runtimeBindings,operationalBindings:plan.operationalBindings,
    claims:falseFlags(E.CANDIDATE_FLAGS),ranges:{claims:falseFlags(E.RANGE_FLAGS)}};
  const candidate=write(paths.candidate,candidateRecord);
  const report={schema:'braid-program/f6c-continuous-reception-acceleration-conformance.v1',scope:E.SCOPE,accepted:true,
    authority:'independent original-mapping and exact-rational conditional range containment only',analysis:E.ANALYSIS,
    candidate,launchPlan:planBinding,verifier:subjectSources.rangeVerifier,subjectSources,fixedBindings:fixed,
    executionBindings:[...plan.runtimeBindings,...plan.operationalBindings].map(b=>({...b,path:path.resolve(dir,b.path)})),
    priorCoverClosure:plan.priorCoverClosure,referenceClaims:falseFlags(E.RANGE_FLAGS),candidateClaims:falseFlags(E.CANDIDATE_FLAGS),
    publicationRequires:'matching fresh successful completion, externally observed inclusive deadline and owned-process closure',elapsedSecondsBeforePublication:0.01};
  const outputBinding=stage==='consumer'?candidate:write(paths.comparison,report);
  const completion={completed:true,accepted:stage==='comparison',scope:E.SCOPE,h3EvidenceEligible:false,
    elapsedSeconds:0.02,externalInclusiveDeadlineAndProcessClosureRequired:true,output:outputBinding,
    ...(stage==='consumer'?{conditionalCells:1,pairRows:64,ordinaryPairs:56,selfZeros:8,members:8,independentComparisonRequired:true,
      metricsAvailable:false,scoreAuthorized:false,processUserSeconds:0.01,processSystemSeconds:0,maximumIndividualProcessResidentBytes:10000}
      :{analysis:E.ANALYSIS,eomExecuted:false})};
  const processDir=path.join(paths.operations,stage+'-process'),stdout=write(path.join(processDir,'runner-stdout.log'),completion);
  const resource=[{kind:'f6c-range-python-process-resources',userSeconds:0.01,systemSeconds:0,waitedChildUserSeconds:0,waitedChildSystemSeconds:0,maximumIndividualResidentBytes:10000},
    {kind:'f6c-range-entry-process-resources',resourceUsage:{userCPUTime:1,systemCPUTime:2,maxRSS:10000}}];
  writeFileSync(path.join(processDir,'runner-stderr.log'),resource.map(r=>JSON.stringify(r)+'\n').join(''));
  const job={root:dir,output,stage,plan,planBinding,python,git,candidate:stage==='comparison'?candidate:null,stdout,sources};
  const spec=E.stageSpec({...job,budget:'10'});
  job.processReceipt={accepted:false,processesClosed:true,exit:{code:0,signal:null},gates:[{acknowledged:true,target:{pid:123},measurement:{code:0,signal:null},requestedCommand:spec.command,requestedArgs:spec.args}]};
  return {job,paths,completion,record:stage==='consumer'?candidateRecord:report,outputBinding};
}
test('synthetic consumer admission needs exact closed gate candidate census and binding chain',()=>{
  const f=admissionFixture('consumer');const got=E.admitStage(f.job);assert.equal(got.accepted,true);assert.equal(got.mathematicalAuthority,'none; candidate pending independent comparison');
  for(const mutate of [j=>j.processReceipt.processesClosed=false,j=>j.processReceipt.gates.push(j.processReceipt.gates[0]),
    j=>j.processReceipt.gates[0].requestedArgs[0]='-B',j=>j.planBinding.sha256=H]){const j=structuredClone(f.job);mutate(j);assert.throws(()=>E.admitStage(j));}
});
test('synthetic checker admission binds original candidate complete analysis and unpromoted flags',()=>{
  const f=admissionFixture('comparison');assert.equal(E.admitStage(f.job).accepted,true);
  const wrong=structuredClone(f.job);wrong.candidate.sha256=H;assert.throws(()=>E.admitStage(wrong));
  const changed={...f.record,referenceClaims:{...f.record.referenceClaims,metrics_available:true}};
  writeFileSync(f.outputBinding.path,JSON.stringify(changed)+'\n');assert.throws(()=>E.admitStage(f.job));
});
test('stage piping uses one detached registered target and rejects failure and log overflow',async()=>{
  for(const mode of ['fail','overflow']){let called=0,killed=false;
    const spawnImpl=(_command,_args,opts)=>{called++;assert.equal(opts.detached,true);assert.deepEqual(opts.stdio,['ignore','pipe','pipe']);
      const child=new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.kill=()=>{killed=true;setImmediate(()=>child.emit('close',null,'SIGTERM'));};
      setImmediate(()=>{child.stdout.emit('data',Buffer.alloc(mode==='overflow'?E.LOG_LIMIT+1:1));if(mode==='fail')child.emit('close',7,null);});return child;};
    await assert.rejects(E.runSingleStage({command:'synthetic',args:[]},{spawnImpl,out:new PassThrough(),err:new PassThrough()}));assert.equal(called,1);if(mode==='overflow')assert.equal(killed,true);
  }
});
test('metadata timeout waits for killed child closure',async()=>{
  let closed=false;const spawnImpl=()=>{const c=new EventEmitter();c.stdout=new PassThrough();c.stderr=new PassThrough();c.kill=()=>{setTimeout(()=>{closed=true;c.emit('close',null,'SIGKILL');},5);};return c;};
  await assert.rejects(E.runSingleStage({command:'synthetic',args:[]},{spawnImpl,timeoutMs:1}));assert.equal(closed,true);
});
test('shared exclusion recognizes old/cached/full/root/range and both F5 stages',()=>{
  for(const command of ['launch-f6c-cached-root-cover-full.mjs','verify-f6c-cached-continuous-reception-root-cover.py',
    'launch-prescribed-response-pilot.mjs','publish-prescribed-acceleration-response.py','prepare-f6c-continuous-reception-acceleration.py','verify-f6c-continuous-reception-acceleration.py']){
    assert.throws(()=>L.assertNoCompetitor([{pid:10,ppid:1,command:'own'},{pid:20,ppid:1,command}],10));
    assert.doesNotThrow(()=>L.assertNoCompetitor([{pid:10,ppid:1,command:'own'},{pid:20,ppid:10,command}],10));
  }
});
test('explicit runtime launch options reject extras missing values unsafe hash and traversal',()=>{
  const args=['--out','child','--plan','plan','--plan-sha256',H,'--launcher-sha256',H,'--entry-sha256',H,'--python',python,'--git-binary','/usr/bin/git'];
  assert.equal(L.parseArgs(args).python,python);assert.throws(()=>L.parseArgs(args.concat('--extra','x')));assert.throws(()=>L.parseArgs(args.slice(0,-2)));
  const bad=[...args];bad[1]='../child';assert.throws(()=>L.parseArgs(bad));
});
test('reused safeguards enforce first-to-last RSS interval host thresholds and stdout flush',async()=>{
  const state={beganMs:0,lastSampleMs:null,maximumSampleGapMs:0,maximumSampledRSSBytes:0,samples:0};
  assert.throws(()=>helpers.acceptRSS({...state},[{rssBytes:100}],1001,900));
  assert.throws(()=>helpers.acceptRSS({...state},[{rssBytes:2*1024**3}],1,0));
  assert.equal(helpers.parseHostResource('System-wide memory free percentage: 40%\n',64n*1024n**3n,true).freePercent,40);
  assert.throws(()=>helpers.parseHostResource('System-wide memory free percentage: 39%\n',64n*1024n**3n,true));
  const stream=new PassThrough();stream.resume();await helpers.flushCompletion({accepted:false,operationalLogBytes:0},{began:performance.now(),lastSampleStartedMs:performance.now(),stream});
  const stalled=new PassThrough();stalled.write=()=>false;
  await assert.rejects(helpers.flushCompletion({accepted:false},{began:performance.now()-1799990,lastSampleStartedMs:performance.now(),stream:stalled}));assert.equal(stalled.destroyed,true);
});
test('captured file worker timeout is bounded and finalization requires complete closed stages',async()=>{
  const controller=new AbortController();await assert.rejects(helpers.runFileWorker({},Buffer.from('export function fileOperation(){while(true){}}'),10,controller.signal));
  assert.throws(()=>E.fileOperation({kind:'finalize',deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n),record:{accepted:true,processesClosed:false,stages:[]}}));
});
test('final diagnostics drain waits for queued writes and rejects stalled or late callbacks',async()=>{
  const stream=new PassThrough();stream.resume();let callback;
  stream.write=(_bytes,cb)=>{callback=cb;return false;};
  let done=false;const started=performance.now();const promise=L.drainDiagnostics({stream,began:started,lastSampleStartedMs:started}).then(()=>{done=true;});
  await new Promise(resolve=>setImmediate(resolve));assert.equal(done,false);callback();await promise;
  const stalled=new PassThrough();stalled.write=()=>false;
  await assert.rejects(L.drainDiagnostics({stream:stalled,began:performance.now()-1799990,lastSampleStartedMs:performance.now()}));assert.equal(stalled.destroyed,true);
  const late=new PassThrough();let now=1;late.write=(_b,cb)=>{now=1002;cb();return true;};
  await assert.rejects(L.drainDiagnostics({stream:late,began:0,lastSampleStartedMs:0,clock:()=>now}));assert.equal(late.destroyed,true);
});
test('final diagnostics EPIPE and callback failures reject and close only owned stream',async()=>{
  for(const mode of ['event','callback','throw']){
    const stream=new PassThrough();stream.write=(_bytes,callback)=>{const error=Object.assign(Error('synthetic EPIPE'),{code:'EPIPE'});
      if(mode==='throw')throw error;setImmediate(()=>mode==='event'?stream.emit('error',error):callback(error));return false;};
    await assert.rejects(L.drainDiagnostics({stream,began:performance.now(),lastSampleStartedMs:performance.now()}));assert.equal(stream.destroyed,true);
  }
});
test('late durable final publication returns no admissible result and never overwrites earlier data',()=>{
  const dir=directory(),p=path.join(dir,'publication');let calls=0;
  assert.throws(()=>E.writeNew(p,{accepted:true,syntheticOnly:true,publicationRequires:'fresh successful completion'},1024,()=>{if(++calls===3)throw Error('synthetic post-fsync deadline');}));
  assert.equal(JSON.parse(readFileSync(p)).syntheticOnly,true);assert.throws(()=>E.writeNew(p,{accepted:false}));
});
test('failed attempt diagnostic epilogue cannot strand an unread stderr stream',async()=>{
  for(const mode of ['stalled','throw','epipe','expired']){
    const stream=new PassThrough();stream.write=(_b,cb)=>{if(mode==='throw')throw Error('write failed');if(mode==='epipe')setImmediate(()=>cb(Error('EPIPE')));return false;};
    await L.terminalFailure(Error('original failure'),{stream,began:performance.now()-(mode==='expired'?1800001:1799990)});
    assert.equal(stream.destroyed,true);
  }
});
test('CLI failure epilogue invokes only nonzero exit after bounded diagnostics or sink throw',async()=>{
  for(const mode of ['stalled','throw']){
    const stream=new PassThrough();let called=false;stream.write=()=>{if(mode==='throw')throw Error('sink failed');return false;};
    await L.failedCLICompletion(Error('prior closed attempt failure'),{stream,began:performance.now()-1799990,exit:code=>{called=true;assert.equal(code,1);assert.equal(stream.destroyed,true);}});
    assert.equal(called,true);
  }
});
test('failed stage projection retains unresolved process identities and cleanup failures without closure promotion',()=>{
  const source={stage:'consumer',process:{processesClosed:false,runner:{pid:4101,pgid:4101,started:'synthetic'},exit:{code:null,signal:'SIGKILL'},
    failure:'target did not finish',cleanupFailure:'process observation unavailable',cancellationObservedPidsAbsent:false,cancellationUnverifiedPids:[4101,4102],
    gates:[{identity:{pid:4102,pgid:4102},target:{pid:4103,pgid:4102},acknowledged:true}]}};
  const result=L.rejectedStageSummaries([source])[0];
  for(const field of ['processesClosed','runner','exit','failure','cleanupFailure','cancellationObservedPidsAbsent','cancellationUnverifiedPids','gates'])assert.deepEqual(result[field],source.process[field]);
  assert.equal(result.processesClosed,false);assert.equal(result.accepted,undefined);
  const absent=L.rejectedStageSummaries([{stage:'comparison',process:{}}])[0];assert.equal(absent.processesClosed,false);assert.equal(absent.cleanupFailure,null);assert.equal(absent.cancellationUnverifiedPids,null);
});

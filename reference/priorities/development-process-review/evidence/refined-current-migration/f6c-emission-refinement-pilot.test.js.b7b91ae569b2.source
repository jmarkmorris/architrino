// Synthetic metadata/process controls only. No accepted history or range is evaluated.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,readFileSync,realpathSync,statSync,symlinkSync,truncateSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {EventEmitter} from 'node:events';
import {PassThrough} from 'node:stream';
import * as E from '../scripts/eom/run-f6c-emission-refinement-pilot.mjs';
import * as L from '../scripts/eom/launch-f6c-emission-refinement-pilot.mjs';
const root=realpathSync(process.cwd()),hash=b=>createHash('sha256').update(b).digest('hex'),H='a'.repeat(64);
const helperBytes=readFileSync(E.HELPERS),helpers=await L.reviewedHelpers(helperBytes);
const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const pythonReal=realpathSync(python),node=realpathSync(process.execPath),git='/synthetic/git';
const binding=(p,sha256=H,bytes=1)=>({path:p,sha256,bytes});
const falseFlags=names=>Object.fromEntries(names.map(n=>[n,false]));
const write=(p,v)=>{mkdirSync(path.dirname(p),{recursive:true});return E.writeNew(p,v);};
function directory(){const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-refinement-ops-control-')));mkdirSync(path.join(dir,E.LANE),{recursive:true});return dir;}
function planFixture(){return {schema:'braid-program/f6c-emission-refinement-launch.v1',scope:E.SCOPE,
 ...Object.fromEntries(Object.entries(E.NAMED).map(([k,p])=>[k,binding(p,E.PINS[p])])),
 subjectSourceBindings:E.SUBJECT_PATHS.map(p=>binding(p,E.PINS[p])),
 runtimeBindings:[binding(pythonReal),binding(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg')),binding(git)],
 operationalBindings:[E.ENTRY,E.LAUNCHER,E.TESTS,E.PROCESS_TESTS,E.HELPERS,E.OUTER,'/bin/ps','/usr/bin/memory_pressure',node].map(p=>binding(p,E.PINS[p]??H)),
 limits:{...E.LIMITS},priorCoverClosure:{authority:'externally-reviewed-caller-observation',ownerSha256:E.FIXED[9][2],admissionSha256:E.FIXED[5][2],matchingFreshCompletionObserved:true,exitCode:0,elapsedSeconds:'8.534247625',processesClosed:true,independentAuditAccepted:true}};}

test('all scientific implementation/control pins remain their separately frozen source generations',()=>{
  for(const p of [...Object.values(E.NAMED),...E.SUBJECT_PATHS,E.HELPERS,E.OUTER,...E.FIXED.filter(([,p])=>!p.startsWith('.local-data')).map(([,p])=>p)])
    assert.equal(hash(readFileSync(p)),E.PINS[p],p);
  assert.equal(E.FIXED.length,16);assert.equal(E.SUBJECT_PATHS.length,15);assert.equal(E.PINS['tests/test_eom_decimal_interval.py'],'22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44');
});
test('closed plan has no invented runtime/default fields and exact operational closure',()=>{
  const plan=planFixture();
  // The Git path is explicit and checked against its real filesystem identity.
  const actualGit=realpathSync('/usr/bin/git');plan.runtimeBindings[2]=binding(actualGit);
  assert.equal(E.validatePlan(plan,root,H,H,python,actualGit),plan);
  for(const mutate of [p=>p.limits.inclusiveSeconds++,p=>p.scope='full',p=>p.python=python,
    p=>p.producer.sha256=H,p=>p.verifier.sha256=H,p=>p.priorCoverClosure.exitCode=false,
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
test('four data outputs and outer sibling are distinct and stages bind original manifest plus deadline',()=>{
 const dir=directory(),output=path.join(dir,E.LANE,'new'),plan=planFixture(),planBinding=binding(path.join(dir,'plan'));
 const paths=E.outputPaths(dir,output);assert.equal(paths.operations,output+'-outer');assert.deepEqual(paths.dataFiles,['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'].map(p=>path.join(output,p)));
 const common={plan,root:dir,output,planBinding,python,git,budget:'12.345678901'};
 const producer=E.stageSpec({...common,stage:'producer'});assert.deepEqual(producer.args.slice(0,3),['-I','-B','-c']);assert.equal(producer.command,python);
 assert.equal(producer.args[producer.args.indexOf('--out-dir')+1],output);assert.equal(producer.args[producer.args.indexOf('--git-binary')+1],git);
 const manifest=binding(paths.manifest),checker=E.stageSpec({...common,stage:'comparison',manifest});
 assert.equal(checker.args[checker.args.indexOf('--manifest-sha256')+1],H);assert.equal(checker.args[checker.args.indexOf('--out')+1],paths.comparison);
 assert.deepEqual(checker.args.slice(-2),['--budget-seconds','12.345678901']);
 assert.throws(()=>E.stageSpec({...common,stage:'comparison',manifest:binding(path.join(dir,'wrong'))}));
 assert.throws(()=>E.stageSpec({...common,stage:'producer',budget:'0'}));assert.throws(()=>E.stageSpec({...common,stage:'consumer'}));
 assert.throws(()=>E.outputPaths(dir,path.join(output,'subject')));
});
test('captured Python wrapper reports real target CPU separately and rejects changed source',()=>{
  const dir=directory(),p=path.join(dir,'synthetic.py'),bytes=Buffer.from('print("synthetic-only")\n');writeFileSync(p,bytes);
  const result=spawnSync(python,['-I','-B','-c',E.PYTHON_BOOTSTRAP,p,hash(bytes)],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,result.stderr);assert.equal(result.stdout,'synthetic-only\n');
  const measured=JSON.parse(result.stderr.trim());assert.equal(measured.kind,'f6c-refinement-python-process-resources');
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
 const planBinding=write(path.join(dir,'plan.json'),plan),named=Object.fromEntries(Object.keys(E.NAMED).map(k=>[k,{...plan[k],path:path.join(dir,plan[k].path)}]));
 const restrictions=[];for(let i=0;i<8;i++)for(let j=0;j<8;j++)if(i!==j)restrictions.push({receiverIndex:i,transmitterIndex:j,receiverId:E.IDS[i],transmitterId:E.IDS[j],lower:'-8',upper:'-0.05',lowerQueryIndex:null,upperQueryIndex:null});
 const streams=['queries','rows','pieces'].map(k=>write(paths[k],{syntheticOnly:true,role:k}));
 const manifestRecord={schema:'braid-program/f6c-emission-refinement-cover.v1',scope:E.SCOPE,status:'conditional_complete',accepted:false,
 launchPlan:planBinding,producer:named.producer,fixedBindings:fixed,subjectSourceBindings:plan.subjectSourceBindings,
 executionBindings:[...plan.runtimeBindings,...plan.operationalBindings].map(b=>({...b,path:path.resolve(dir,b.path)})),priorCoverClosure:plan.priorCoverClosure,
 members:E.IDS.map((id,i)=>({id,pathKey:i+1,polarity:i%2?-1:1})),knotSha256:'11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c',
 retainedDomain:{lower:'-8',upper:'0.13',precision:90},receptionDomain:{lower:'0',upper:'0.001',precision:90},originalEmissionDomain:{lower:'-8',upper:'-0.05',precision:90},
 precision:90,speedUpper:'0.85',clearanceLower:'0.27',algorithm:E.ALGORITHM,restrictions,census:E.CENSUS,
 queries:streams[0],rows:streams[1],pieces:streams[2],libraryFlags:falseFlags(E.ROOT_FLAGS),claims:falseFlags(E.CLAIM_FLAGS)};
 const manifest=write(paths.manifest,manifestRecord);
 const analysis={accepted:false,conditionalQueryReplayConformant:true,conditionalFinalCoverConformant:true,queryCount:3584,pairCount:56,rowCount:64,ordinaryNonselfRows:56,selfExclusionRows:8,pieceRecordCount:112,finalStrictFaceChecks:112,oldestBoundaryChecks:56,recordedGeometryPieceVisits:1,restrictions,claims:falseFlags(E.PURE_FLAGS)};
 const report={schema:'braid-program/f6c-emission-refinement-conformance.v1',scope:E.SCOPE,status:'conditional-comparison-complete',accepted:true,
 authority:'independent original-byte query replay and conditional final-cover containment only',manifest,queries:streams[0],rows:streams[1],pieces:streams[2],
 launchPlan:planBinding,verifier:named.verifier,sourceBindings:named,fixedBindings:fixed,executionBindings:manifestRecord.executionBindings,subjectSourceBindings:plan.subjectSourceBindings,priorCoverClosure:plan.priorCoverClosure,analysis,candidateClaims:falseFlags(E.CLAIM_FLAGS),
 publicationRequires:'matching fresh successful completion, externally observed inclusive deadline and owned-process closure',elapsedSecondsBeforePublication:0.01};
 const outputBinding=stage==='producer'?manifest:write(paths.comparison,report);
 const completion={completed:true,accepted:stage==='comparison',scope:E.SCOPE,h3EvidenceEligible:false,eomExecuted:false,elapsedSeconds:0.02,
 ...(stage==='producer'?{conditionalCoverPrepared:true,externalWholeAttemptAdmissionRequired:true,producer:named.producer,launchPlan:planBinding,
 outputs:[...streams,manifest],census:E.CENSUS,recordedGeometryPieceVisits:1}:{output:outputBinding,analysis,externalInclusiveDeadlineAndProcessClosureRequired:true})};
 const processDir=path.join(paths.operations,stage+'-process'),stdout=write(path.join(processDir,'runner-stdout.log'),completion);
 const resource=[{kind:'f6c-refinement-python-process-resources',userSeconds:.01,systemSeconds:0,waitedChildUserSeconds:0,waitedChildSystemSeconds:0,maximumIndividualResidentBytes:10000},
 {kind:'f6c-refinement-entry-process-resources',resourceUsage:{userCPUTime:1,systemCPUTime:2,maxRSS:10000}}];
 writeFileSync(path.join(processDir,'runner-stderr.log'),resource.map(r=>JSON.stringify(r)+'\n').join(''));
 const job={root:dir,output,stage,plan,planBinding,python,git,manifest:stage==='comparison'?manifest:null,stdout,sources};
 const spec=E.stageSpec({...job,budget:'10'});job.processReceipt={accepted:false,processesClosed:true,exit:{code:0,signal:null},gates:[{acknowledged:true,target:{pid:123},measurement:{code:0,signal:null},requestedCommand:spec.command,requestedArgs:spec.args}]};
 return {job,paths,completion,record:stage==='producer'?manifestRecord:report,outputBinding,manifestRecord,analysis,streams};
}
function replaceRecord(f,mutate){
 const record=structuredClone(f.record);mutate(record);
 const bytes=Buffer.from(JSON.stringify(record)+'\n');writeFileSync(f.outputBinding.path,bytes);
 const bound={path:f.outputBinding.path,sha256:hash(bytes),bytes:bytes.length};const completion=structuredClone(f.completion);
 if(f.job.stage==='producer')completion.outputs[3]=bound;else completion.output=bound;
 const log=Buffer.from(JSON.stringify(completion)+'\n');writeFileSync(f.job.stdout.path,log);return {...f.job,stdout:{path:f.job.stdout.path,sha256:hash(log),bytes:log.length}};
}
test('synthetic producer admission needs exact closed gate four-file census and binding chain',()=>{
 const f=admissionFixture('producer'),got=E.admitStage(f.job);assert.equal(got.accepted,true);assert.equal(got.outputs.length,4);assert.equal(got.outputs.at(-1).path,f.paths.manifest);
 assert.equal(got.mathematicalAuthority,'none; cover pending independent comparison');
 for(const mutate of [j=>j.processReceipt.processesClosed=false,j=>j.processReceipt.gates.push(j.processReceipt.gates[0]),j=>j.processReceipt.gates[0].requestedArgs[0]='-B',j=>j.planBinding.sha256=H]){
 const j=structuredClone(f.job);mutate(j);assert.throws(()=>E.admitStage(j));}
});
test('synthetic checker admission binds original streams complete replay and copied candidate claims',()=>{
 const f=admissionFixture('comparison');assert.equal(E.admitStage(f.job).accepted,true);
 const wrong=structuredClone(f.job);wrong.manifest.sha256=H;assert.throws(()=>E.admitStage(wrong));
 assert.throws(()=>E.admitStage(replaceRecord(f,r=>r.candidateClaims.metricsAvailable=true)));
});
test('rebound malformed manifest census domain algorithm and restrictions never acquire authority',()=>{
 for(const mutate of [r=>r.census.queries--,r=>r.algorithm.upperQueriesPerPair++,r=>r.receptionDomain.upper='0.002',
 r=>r.subjectSourceBindings.pop(),r=>r.members[1].polarity=1,r=>r.libraryFlags.execution_authorized=true,r=>r.restrictions.pop(),
 r=>r.restrictions[0].transmitterIndex=0,r=>r.restrictions[0].lowerQueryIndex=32,r=>r.restrictions[0].upperQueryIndex=0,
 r=>r.queries.sha256=H,r=>r.claims.independentComparisonPassed=true]){
 const f=admissionFixture('producer');assert.throws(()=>E.admitStage(replaceRecord(f,mutate)));
 }
});
test('rebound checker changed count stream binding restriction or authority fails closed',()=>{
 for(const mutate of [r=>r.analysis.queryCount--,r=>r.analysis.oldestBoundaryChecks=0,r=>r.rows.sha256=H,r=>r.analysis.restrictions[0].lower='-7',
 r=>r.sourceBindings.verifier.sha256=H,r=>r.subjectSourceBindings.pop(),r=>r.analysis.claims.premiseTruthAuthenticated=true,
 r=>{r.claims=r.candidateClaims;delete r.candidateClaims;},r=>r.elapsedSecondsBeforePublication=1]){
 const f=admissionFixture('comparison');assert.throws(()=>E.admitStage(replaceRecord(f,mutate)));
 }
});
test('each original stream is rehashed and truncation is rejected before either admission',()=>{
 for(const stage of ['producer','comparison'])for(const role of ['queries','rows','pieces']){
 const f=admissionFixture(stage);writeFileSync(f.paths[role],'null\n');assert.throws(()=>E.admitStage(f.job));
 }
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
  for(const command of ['launch-f6c-emission-refinement-pilot.mjs','prepare-f6c-emission-refinement.py','verify-f6c-emission-refinement.py','launch-f6c-cached-root-cover-full.mjs','verify-f6c-cached-continuous-reception-root-cover.py',
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
  const source={stage:'producer',process:{processesClosed:false,runner:{pid:4101,pgid:4101,started:'synthetic'},exit:{code:null,signal:'SIGKILL'},
    failure:'target did not finish',cleanupFailure:'process observation unavailable',cancellationObservedPidsAbsent:false,cancellationUnverifiedPids:[4101,4102],
    gates:[{identity:{pid:4102,pgid:4102},target:{pid:4103,pgid:4102},acknowledged:true}]}};
  const result=L.rejectedStageSummaries([source])[0];
  for(const field of ['processesClosed','runner','exit','failure','cleanupFailure','cancellationObservedPidsAbsent','cancellationUnverifiedPids','gates'])assert.deepEqual(result[field],source.process[field]);
  assert.equal(result.processesClosed,false);assert.equal(result.accepted,undefined);
  const absent=L.rejectedStageSummaries([{stage:'comparison',process:{}}])[0];assert.equal(absent.processesClosed,false);assert.equal(absent.cleanupFailure,null);assert.equal(absent.cancellationUnverifiedPids,null);
});
test('exact subject15 and operational9 closure rejects missing decimal controls and contradictory duplicates',()=>{
 const plan=planFixture(),actualGit=realpathSync('/usr/bin/git');plan.runtimeBindings[2]=binding(actualGit);
 assert.equal(plan.subjectSourceBindings.length,15);assert.equal(plan.operationalBindings.length,9);
 const missing=structuredClone(plan);missing.subjectSourceBindings=missing.subjectSourceBindings.filter(b=>b.path!=='tests/test_eom_decimal_interval.py');
 assert.throws(()=>E.validatePlan(missing,root,H,H,python,actualGit));
 const duplicate=structuredClone(plan);duplicate.subjectSourceBindings.find(b=>b.path===E.PRODUCER).bytes++;
 assert.throws(()=>E.planBindings(duplicate,root));
 assert.deepEqual(E.ALGORITHM,{lowerQueriesPerPair:32,upperQueriesPerPair:32,order:'receiver-major;lower32;reset;upper32'});
 assert.equal(E.CENSUS.queries,E.CENSUS.ordinaryPairs*64);
});
test('private four-file publication monitor rejects repeat folders foreign files symlinks and oversized files',async()=>{
 // Test-only exports expose private monitoring, never launch or mathematical authority.
 const text=readFileSync(E.LAUNCHER,'utf8')+'\nexport {privateProducerFiles,privateCandidates};\n';
 const monitor=await import('data:text/javascript;base64,'+Buffer.from(text).toString('base64'));
 const good=directory(),folder=path.join(good,'.emission-private-fixture');mkdirSync(folder);
 for(const name of ['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'])write(path.join(folder,name),{syntheticOnly:true});
 assert.doesNotThrow(()=>monitor.privateProducerFiles(good));
 const repeat=directory();mkdirSync(path.join(repeat,'.emission-private-a'));mkdirSync(path.join(repeat,'.emission-private-b'));
 assert.throws(()=>monitor.privateProducerFiles(repeat));
 const foreign=directory();mkdirSync(path.join(foreign,'.emission-private-a'));write(path.join(foreign,'.emission-private-a','unlisted'),{});
 assert.throws(()=>monitor.privateProducerFiles(foreign));
 const linked=directory();symlinkSync(folder,path.join(linked,'.emission-private-a'));assert.throws(()=>monitor.privateProducerFiles(linked));
 const large=directory();mkdirSync(path.join(large,'.emission-private-a'));const file=path.join(large,'.emission-private-a','queries.ndjson');writeFileSync(file,'');truncateSync(file,E.FILE_LIMIT+1);
 assert.throws(()=>monitor.privateProducerFiles(large));
 const comparison=directory(),privateFile=path.join(comparison,'.emission-comparison-private-a');write(privateFile,{syntheticOnly:true});
 assert.doesNotThrow(()=>monitor.privateCandidates(comparison,'.emission-comparison-private-'));
 symlinkSync(privateFile,path.join(comparison,'.emission-comparison-private-b'));assert.throws(()=>monitor.privateCandidates(comparison,'.emission-comparison-private-'));
});
test('source capture and shutdown algorithms retain the accepted range generation',()=>{
 const current=readFileSync(E.ENTRY,'utf8'),old=readFileSync('scripts/eom/run-f6c-acceleration-pilot.mjs','utf8');
 const section=(text,from,to)=>text.slice(text.indexOf(from),text.indexOf(to));
 for(const [start,end] of [['export function readBound','export function checkBindings'],['export function checkBindings','export function writeNew'],['export function writeNew','function binding']])
  assert.equal(section(current,start,end),section(old,start,end));
 assert.equal(section(current,'export async function runSingleStage','function resourceEvents'),section(old,'export async function runSingleStage','const falseClaims'));
 const a=readFileSync(E.LAUNCHER,'utf8'),b=readFileSync('scripts/eom/launch-f6c-acceleration-pilot.mjs','utf8');
 assert.equal(section(a,'export async function drainDiagnostics','export function diagnosticGuard'),section(b,'export async function drainDiagnostics','export async function launchCaptured'));
 assert.equal(a.includes('rootsEvaluated:false'),false);assert.ok(a.includes('accelerationEvaluated:false'));
});
test('attempt diagnostic guard retains first async or callback failure and remains attached through cleanup',async()=>{
 for(const mode of ['event','callback','throw']){
  const stream=new PassThrough(),baseline=stream.listenerCount('error'),guard=L.diagnosticGuard(stream),first=Error('first diagnostic error'),second=Error('second diagnostic error');let seen;
  guard.bind(error=>{seen=error;});
  stream.write=(_bytes,callback)=>{if(mode==='throw')throw first;setImmediate(()=>{if(mode==='event'){stream.emit('error',first);callback();}else callback(first);});return false;};
  guard.write(Buffer.from('synthetic'));await new Promise(resolve=>setImmediate(resolve));
  assert.equal(seen,first);assert.equal(guard.failure,first);assert.throws(()=>guard.check(),/first diagnostic/);
  stream.emit('error',second);assert.equal(guard.failure,first);assert.ok(stream.listenerCount('error')>baseline);
  await assert.rejects(guard.close(performance.now()),/first diagnostic/);await new Promise(resolve=>setImmediate(resolve));assert.equal(stream.listenerCount('error'),baseline);
 }
});
test('diagnostic guard waits for queued callbacks and bounds stalled failed cleanup without leaking healthy listeners',async()=>{
 const stream=new PassThrough(),baseline=stream.listenerCount('error'),guard=L.diagnosticGuard(stream);let callback,closed=false;
 stream.write=(_bytes,cb)=>{callback=cb;return false;};guard.write(Buffer.from('queued'));
 const pending=guard.close(performance.now()).then(()=>{closed=true;});await new Promise(resolve=>setImmediate(resolve));assert.equal(closed,false);callback();await pending;
 assert.equal(stream.listenerCount('error'),baseline);
 const stalled=new PassThrough(),watch=L.diagnosticGuard(stalled);stalled.write=()=>false;watch.write(Buffer.from('stalled'));
 await assert.rejects(watch.close(performance.now()-1799990),/diagnostic cleanup deadline/);assert.equal(stalled.destroyed,true);
});

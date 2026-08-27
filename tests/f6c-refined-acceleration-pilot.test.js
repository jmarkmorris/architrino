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
import * as E from '../scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
import * as L from '../scripts/eom/launch-f6c-refined-acceleration-pilot.mjs';
const root=realpathSync(process.cwd()),hash=b=>createHash('sha256').update(b).digest('hex'),H='a'.repeat(64);
const helperBytes=readFileSync(E.HELPERS),helpers=await L.reviewedHelpers(helperBytes);
const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const pythonReal=realpathSync(python),node=realpathSync(process.execPath),git='/synthetic/git';
const binding=(p,sha256=H,bytes=1)=>({path:p,sha256,bytes});
const falseFlags=names=>Object.fromEntries(names.map(n=>[n,false]));
const write=(p,v)=>{mkdirSync(path.dirname(p),{recursive:true});return E.writeNew(p,v);};
function directory(){const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-range-ops-control-')));mkdirSync(path.join(dir,E.LANE),{recursive:true});return dir;}
function planFixture(){return {schema:'braid-program/f6c-refined-acceleration-launch.v1',scope:E.SCOPE,
 ...Object.fromEntries(Object.entries(E.NAMED).map(([k,p])=>[k,binding(p,E.PINS[p])])),
 runtimeBindings:[binding(pythonReal),binding(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg')),binding(git)],
 operationalBindings:[E.ENTRY,E.LAUNCHER,E.TESTS,E.PROCESS_TESTS,E.HELPERS,E.OUTER,'/bin/ps','/usr/bin/memory_pressure',node].map(p=>binding(p,E.PINS[p]??H)),
 limits:{...E.LIMITS},priorRefinementClosure:{...E.PRIOR_CLOSURE}};}

test('all scientific implementation/control pins remain the separately accepted source generation',()=>{
  for(const p of [...Object.values(E.NAMED),E.HELPERS,E.OUTER,...E.FIXED.filter(([,p])=>!p.startsWith('.local-data')).map(([,p])=>p)])
    assert.equal(hash(readFileSync(p)),E.PINS[p],p);
  assert.equal(E.FIXED.length,16);assert.equal(E.CHECKER_SHA,'3f49831a2e63d2526125c1585c1250330079fa423986ec1b36901bb3cecde6ae');
});
test('closed plan has no invented runtime/default fields and exact operational closure',()=>{
  const plan=planFixture();
  // The Git path is explicit and checked against its real filesystem identity.
  const actualGit=realpathSync('/usr/bin/git');plan.runtimeBindings[2]=binding(actualGit);
  assert.equal(E.validatePlan(plan,root,H,H,python,actualGit),plan);
  for(const mutate of [p=>p.limits.inclusiveSeconds++,p=>p.scope='full',p=>p.python=python,
    p=>p.consumer.sha256=H,p=>p.verifier.sha256=H,p=>p.priorRefinementClosure.exitCode=false,
    p=>p.operationalBindings.pop(),p=>p.operationalBindings.push(p.operationalBindings[0]),
    p=>p.runtimeBindings.splice(1,1),p=>p.priorRefinementClosure.independentAuditAccepted=false]){
    const changed=structuredClone(plan);mutate(changed);assert.throws(()=>E.validatePlan(changed,root,H,H,python,actualGit));
  }
  const rows=E.FIXED.map(([,p,h])=>({path:path.join(root,p),sha256:h}));assert.equal(E.mergeBindings([...rows,...rows]).length,16);
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
  const measured=JSON.parse(result.stderr.trim());assert.equal(measured.kind,'f6c-refined-range-python-process-resources');
  for(const k of ['userSeconds','systemSeconds','waitedChildUserSeconds','waitedChildSystemSeconds'])assert.ok(Number.isFinite(measured[k])&&measured[k]>=0);
  assert.ok(measured.maximumIndividualResidentBytes>0);
  const bad=spawnSync(python,['-I','-B','-c',E.PYTHON_BOOTSTRAP,p,H],{encoding:'utf8',timeout:5000});assert.notEqual(bad.status,0);assert.equal(bad.stdout,'');
});
test('metadata inventory source keeps the public lazy-dependency exercise without executing science',()=>{
 assert.match(E.PYTHON_RUNTIME_INVENTORY,/import __future__/);assert.match(E.PYTHON_RUNTIME_INVENTORY,/\(10\*\*20000\+1\)\/\/\(10\*\*15000\+3\)/);assert.match(E.PYTHON_RUNTIME_INVENTORY,/scientificDataLoaded.*False/);
});

function admissionFixture(stage){
 const dir=directory(),output=path.join(dir,E.LANE,'synthetic'),paths=E.outputPaths(dir,output),plan=planFixture();mkdirSync(paths.operations);
 const all=E.mergeBindings([...E.FIXED,...E.REFINED,...E.PRIOR_OPERATIONS].map(([,p])=>({path:path.join(dir,p),sha256:H})));
 const sources=all.map(b=>write(b.path,{syntheticFixedBytes:true}));
 const map=items=>Object.fromEntries(items.map(([role,p])=>[role,sources.find(b=>b.path===path.join(dir,p))]));
 const fixed=map(E.FIXED),refined=map(E.REFINED),priorOperations=map(E.PRIOR_OPERATIONS);
 const planBinding=write(path.join(dir,'plan.json'),plan),subjectSources=Object.fromEntries(Object.keys(E.NAMED).map(k=>[k,{...plan[k],path:path.resolve(dir,plan[k].path)}]));
 const candidateRecord={schema:'braid-program/f6c-refined-acceleration-candidate.v1',scope:E.SCOPE,accepted:false,status:'conditional-range-candidate',
  census:E.CENSUS,ancestryBindings:fixed,refinementBindings:refined,sourceBindings:subjectSources,launchPlan:planBinding,
  consumer:subjectSources.consumer,declaration:subjectSources.declaration,verifier:subjectSources.verifier,
  priorRefinementClosure:plan.priorRefinementClosure,runtimeBindings:plan.runtimeBindings,operationalBindings:plan.operationalBindings,
  projection:{syntheticOnly:true},claims:falseFlags(E.CANDIDATE_FLAGS),ranges:{claims:falseFlags(E.RANGE_FLAGS)},publicationRequires:E.CANDIDATE_PUBLICATION};
 const candidate=write(paths.candidate,candidateRecord);
 const report={schema:'braid-program/f6c-refined-acceleration-conformance.v1',scope:E.SCOPE,accepted:true,
  authority:'source-bound independent refined projection and conditional rational range containment only',analysis:E.ANALYSIS,
  candidate,launchPlan:planBinding,verifier:subjectSources.verifier,sourceBindings:subjectSources,ancestryBindings:fixed,refinementBindings:refined,priorOperationalBindings:priorOperations,
  priorOperationalObservations:{prepublicationHostObservations:19,finalHostObservations:20,prepublicationRssSamples:954,finalRssSamples:955,finalLogBytes:499829,wholeCompletionSource:'external declaration observation, not these logs'},
  executionBindings:[...plan.runtimeBindings,...plan.operationalBindings].map(b=>({...b,path:path.resolve(dir,b.path)})),
  priorRefinementClosure:plan.priorRefinementClosure,referenceClaims:falseFlags(E.RANGE_FLAGS),candidateClaims:falseFlags(E.CANDIDATE_FLAGS),
  publicationRequires:'matching fresh successful completion, externally observed inclusive deadline and owned-process closure',elapsedSecondsBeforePublication:.01};
 const outputBinding=stage==='consumer'?candidate:write(paths.comparison,report);
 const completion={completed:true,accepted:stage==='comparison',scope:E.SCOPE,h3EvidenceEligible:false,eomExecuted:false,
  elapsedSeconds:.02,externalInclusiveDeadlineAndProcessClosureRequired:true,output:outputBinding,
  ...(stage==='consumer'?{conditionalCells:1,pairRows:64,ordinaryPairs:56,selfZeros:8,members:8,independentComparisonRequired:true,
   metricsAvailable:false,scoreAuthorized:false,processUserSeconds:.01,processSystemSeconds:0,maximumIndividualProcessResidentBytes:10000,rootsEvaluated:false,accelerationEvaluated:true}
   :{analysis:E.ANALYSIS})};
 const processDir=path.join(paths.operations,stage+'-process'),stdout=write(path.join(processDir,'runner-stdout.log'),completion);
 const resource=[{kind:'f6c-refined-range-python-process-resources',userSeconds:.01,systemSeconds:0,waitedChildUserSeconds:0,waitedChildSystemSeconds:0,maximumIndividualResidentBytes:10000},
  {kind:'f6c-refined-range-entry-process-resources',resourceUsage:{userCPUTime:1,systemCPUTime:2,maxRSS:10000}}];
 writeFileSync(path.join(processDir,'runner-stderr.log'),resource.map(r=>JSON.stringify(r)+'\n').join(''));
 const job={root:dir,output,stage,plan,planBinding,python,git,candidate:stage==='comparison'?candidate:null,stdout,sources};
 const spec=E.stageSpec({...job,budget:'10'});
 job.processReceipt={accepted:false,processesClosed:true,exit:{code:0,signal:null},gates:[{acknowledged:true,target:{pid:123},measurement:{code:0,signal:null},requestedCommand:spec.command,requestedArgs:spec.args}]};
 return {job,paths,completion,record:stage==='consumer'?candidateRecord:report,outputBinding};
}
function replaceRecord(f,mutate){
 const record=structuredClone(f.record);mutate(record);const bytes=Buffer.from(JSON.stringify(record)+'\n');writeFileSync(f.outputBinding.path,bytes);
 const completion=structuredClone(f.completion);completion.output={path:f.outputBinding.path,sha256:hash(bytes),bytes:bytes.length};
 const log=Buffer.from(JSON.stringify(completion)+'\n');writeFileSync(f.job.stdout.path,log);
 return {...f.job,stdout:{path:f.job.stdout.path,sha256:hash(log),bytes:log.length}};
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
test('rebound candidate census source maps and authority must retain exact refined contract',()=>{
 for(const mutate of [r=>r.census.pieceRecords--,r=>r.census.pairRows--,r=>delete r.projection,r=>r.sourceBindings.comparisonCore.sha256=H,
  r=>r.ancestryBindings.export.sha256=H,r=>r.refinementBindings.manifest.sha256=H,r=>r.priorRefinementClosure.elapsedSeconds='8.534247625',
  r=>r.claims.independentRangeComparisonPassed=true,r=>r.ranges.claims.root_coverage_established=true,r=>r.publicationRequires='accepted file alone']){
  const f=admissionFixture('consumer');assert.throws(()=>E.admitStage(replaceRecord(f,mutate)));
 }
});
test('rebound checker needs exact snake-case analysis fifteen false flags and separate prior logs',()=>{
 for(const mutate of [r=>r.analysis.pair_rows--,r=>r.analysis.compared_pair_components--,r=>r.analysis.compared_member_intervals--,
  r=>r.analysis.source_authenticated=true,r=>r.analysis.physical_realization_established=true,r=>r.referenceClaims.accepted=true,
  r=>r.priorOperationalBindings.launcherLog.sha256=H,r=>r.priorOperationalObservations.finalRssSamples--,
  r=>r.refinementBindings.rows.sha256=H,r=>r.elapsedSecondsBeforePublication=1,r=>r.candidateClaims.metricsAvailable=true]){
  const f=admissionFixture('comparison');assert.throws(()=>E.admitStage(replaceRecord(f,mutate)));
 }
 assert.equal(E.PURE_FLAGS.length,15);assert.equal(E.RANGE_FLAGS.length,10);assert.equal(E.CANDIDATE_FLAGS.length,8);
});
test('all prior source lists and logs retained without replacing historical stage semantics',()=>{
 const stages=labels=>labels.map(stage=>({stage,process:{accepted:true,processesClosed:true,exit:{code:0,signal:null},stdoutLog:binding('/logs/'+stage+'.out'),stderrLog:binding('/logs/'+stage+'.err')}}));
 const receipt={accepted:true,processesClosed:true,sourceBindings:Array.from({length:202},(_,i)=>binding('/sources/'+i)),stages:stages(['producer','comparison'])};
 assert.equal(E.priorAdmissionBindings(receipt,'refined',root).length,206);
 for(const mutate of [r=>r.sourceBindings.pop(),r=>r.sourceBindings.push(r.sourceBindings[0]),r=>r.stages[0].stage='consumer',r=>r.stages[1].process.accepted=false,r=>delete r.stages[0].process.stderrLog]){
  const r=structuredClone(receipt);mutate(r);assert.throws(()=>E.priorAdmissionBindings(r,'refined',root));
 }
 const broad={...receipt,sourceBindings:[binding('/old/source')],stages:stages(['consumer','comparison'])};
 assert.equal(E.priorAdmissionBindings(broad,'broad',root).length,5);assert.throws(()=>E.priorAdmissionBindings(broad,'other',root));
 assert.throws(()=>E.mergeBindings([binding('/a'),binding('/a','b'.repeat(64))]));
});
test('metadata admission string class is explicit and other bounded structures never widen',()=>{
 for(const [kind,n]of [['data',8192],['operational-receipt',131072]]){
  assert.equal(E.decode(Buffer.from(JSON.stringify('x'.repeat(n))),E.FILE_LIMIT,kind).length,n);
  assert.throws(()=>E.decode(Buffer.from(JSON.stringify('x'.repeat(n+1))),E.FILE_LIMIT,kind));
 }
 assert.throws(()=>E.decode(Buffer.from('{}'),100,'unknown'));
 for(const value of [{['x'.repeat(4097)]:0},Array(20001).fill(0),Object.fromEntries(Array.from({length:10001},(_,i)=>[i,0]))])assert.throws(()=>E.decode(Buffer.from(JSON.stringify(value))));
 assert.throws(()=>E.decode(Buffer.from('['.repeat(25)+'0'+']'.repeat(25))));
});
test('captured current-entry provenance command fits the fixed admission class without a launch',async t=>{
 const outer=await import('../scripts/eom/launch-abc-enclosed-root-pilot.mjs'),entry=readFileSync(E.ENTRY),lengths=[];
 for(const stage of ['consumer','comparison']){
  const output=path.join(root,E.LANE,'synthetic-command-length'),planPath=path.join(root,'reference/priorities/braid-program/evidence/synthetic-refined-range-launch.v1.json');
  const args=['--plan',planPath,'--plan-sha256',H,'--entry-sha256',hash(entry),'--launcher-sha256',H,'--stage',stage,'--out',output,'--deadline-ns','99999999999999999999','--candidate-sha256',stage==='consumer'?'none':H,'--python',python,'--git-binary',realpathSync('/usr/bin/git')];
  // Literal serialization of frozen outer412–414: bounded placeholders stand
  // for port/secret and prospective paths, never an executed operation.
  const payload={root,entry:E.ENTRY,args,sources:[{path:E.ENTRY,sha256:hash(entry),bytes:entry.toString('base64')}],port:65535,secret:'a'.repeat(64),gateSource:outer.ABC_GATE_SOURCE,gateSha256:hash(outer.ABC_GATE_SOURCE),limitMs:E.LIMIT_MS};
  const command=[process.execPath,'-e',outer.ABC_BOOTSTRAP_SOURCE,Buffer.from(JSON.stringify(payload)).toString('base64')].join(' ');lengths.push(command.length);
  assert.ok(command.length<=131072);assert.equal(E.decode(Buffer.from(JSON.stringify({command})),E.FILE_LIMIT,'operational-receipt').command,command);
  assert.throws(()=>E.decode(Buffer.from(JSON.stringify({command}))));
 }
 t.diagnostic('Prospective synthetic-path provenance command characters: '+lengths.join(', ')+'; actual plan paths still require prelaunch measurement.');
});
test('private single-candidate publication monitoring rejects repeats symlinks and oversized files',async()=>{
 const raw=readFileSync(E.LAUNCHER);const monitor=await import('data:text/javascript;base64,'+Buffer.concat([raw,Buffer.from('\nexport{privateCandidates};')]).toString('base64'));
 for(const prefix of ['.refined-range-private-','.refined-range-comparison-private-']){
  const dir=directory(),p=path.join(dir,prefix+'one');write(p,{syntheticOnly:true});assert.doesNotThrow(()=>monitor.privateCandidates(dir,prefix));
  write(path.join(dir,prefix+'two'),{});assert.throws(()=>monitor.privateCandidates(dir,prefix));
  const alias=directory();symlinkSync(p,path.join(alias,prefix+'link'));assert.throws(()=>monitor.privateCandidates(alias,prefix));
  const huge=directory(),large=path.join(huge,prefix+'large');write(large,{});truncateSync(large,E.FILE_LIMIT+1);assert.throws(()=>monitor.privateCandidates(huge,prefix));
 }
});
test('diagnostic lifetime and failed-cleanup helper sections preserve the frozen89b safety generation',()=>{
 const current=readFileSync(E.LAUNCHER,'utf8'),old=readFileSync('scripts/eom/launch-f6c-emission-refinement-pilot.mjs','utf8');
 const section=(text,start,end)=>text.slice(text.indexOf(start),text.indexOf(end));
 assert.equal(section(current,'export async function drainDiagnostics','export async function launchCaptured'),section(old,'export async function drainDiagnostics','export async function launchCaptured'));
 assert.ok(current.includes('accelerationEvaluated:true,rootsEvaluated:false'));
 const entry=readFileSync(E.ENTRY,'utf8'),oldEntry=readFileSync('scripts/eom/run-f6c-acceleration-pilot.mjs','utf8');
 assert.equal(section(entry,'export function readBound','export function checkBindings'),section(oldEntry,'export function readBound','export function checkBindings'));
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
  for(const command of ['launch-f6c-refined-acceleration-pilot.mjs','prepare-f6c-refined-acceleration.py','verify-f6c-refined-acceleration.py','launch-f6c-emission-refinement-pilot.mjs','prepare-f6c-emission-refinement.py','launch-f6c-cached-root-cover-full.mjs','verify-f6c-cached-continuous-reception-root-cover.py',
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

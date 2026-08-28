// Synthetic operation controls only; no ignored histories or numerical modules.
// Full composition fixtures replace binding constants and Python subjects only.
// The original coordinator, file worker, registered gate and admission execute.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {existsSync,linkSync,mkdtempSync,mkdirSync,readFileSync,readdirSync,realpathSync,renameSync,rmSync,statSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {Writable} from 'node:stream';
import * as C from '../scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs';
const root=realpathSync(process.cwd()),python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const hash=b=>createHash('sha256').update(b).digest('hex'),bind=p=>({path:p,sha256:hash(readFileSync(p)),bytes:statSync(p).size});
const load=async([p,h])=>{const b=readFileSync(path.join(root,p));assert.equal(hash(b),h);return import('data:text/javascript;base64,'+b.toString('base64'));};
const H=await load(C.PINS.helpers),D=await load(C.PINS.diagnostics),pause=ms=>new Promise(r=>setTimeout(r,ms));
const absent=pid=>{try{process.kill(pid,0);return false;}catch(e){return e.code==='ESRCH';}};
const temp=()=>realpathSync(mkdtempSync(path.join(tmpdir(),'parent-ops-test.')));
const put=(p,b,options)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,b,options);};
test('scope and closed19/27/14 fields preserve all limits and flags',()=>{
 assert.equal(C.PLAN_KEYS.length,19);assert.equal(C.MANIFEST_KEYS.length,27);assert.equal(C.COMPLETION_KEYS.length,14);
 assert.equal(C.parentScope(1),'original-parent-1-emission-refinement');assert.equal(C.operationScope(1),'operational-original-parent1-refinement-completion-only');assert.equal(C.LIMIT,1800000);assert.equal(C.FILE,67108864);assert.equal(C.LOG,16777216);
 assert.deepEqual(C.CENSUS,{cells:1,members:8,queries:3584,pairRows:64,ordinaryPairs:56,selfZeros:8,pieceRecords:112});assert.ok(Object.values(C.CLAIMS).every(v=>v===false));
});
test('parser rejects NUL bindings duplicate keys unsafe integers and trailing JSON',()=>{
 for(const raw of ['{"x":1,"x":2}','{"a":{"x":0,"x":0}}','null null','[NaN]','[9007199254740993]','{"a":1,}'])assert.throws(()=>C.parseJSON(Buffer.from(raw)));
 assert.deepEqual(C.parseJSON(Buffer.from('{"a":0.0,"b":[1e-6,true,null,"-0"]}\n')),{a:0,b:[.000001,true,null,'-0']});
 assert.throws(()=>C.binding({path:'bad\0name',sha256:'a'.repeat(64),bytes:1},root));assert.throws(()=>C.binding({path:'a/../b',sha256:'a'.repeat(64),bytes:1},root));
});
test('CLI has no default output or generation',()=>{
 const v=['--plan','/p','--plan-sha256','a'.repeat(64),'--self-sha256','b'.repeat(64),'--out','/o','--python','/py','--git','/git'];
 assert.equal(C.parseArgs(v).output,'/o');assert.throws(()=>C.parseArgs(v.slice(2)));assert.throws(()=>C.parseArgs([...v.slice(0,-2),'--out','x']));
});
test('duration bridge transfers only remaining time without epoch comparison',()=>{
 assert.deepEqual(C.remainingDuration('9000000000000',8999000000000n),{originalNodeDeadlineNanoseconds:'9000000000000',entryBudgetStampNanoseconds:'8999000000000',remainingNanoseconds:'1000000000',seconds:'1.000000000'});
 for(const now of[9000000000000n,9000000000001n,1n])assert.throws(()=>C.remainingDuration('9000000000000',now));
});
test('captured Python bootstrap runs exact bytes and reports actual usage',()=>{
 const dir=temp();try{const p=path.join(dir,'target.py');put(p,"print('synthetic target complete')\n");
  const r=spawnSync(python,['-I','-B','-c',C.PYTHON_BOOTSTRAP,'producer',p,bind(p).sha256],{encoding:'utf8',timeout:2000});
  assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/synthetic target/);assert.ok(JSON.parse(r.stderr).maximumIndividualResidentBytes>0);
  const bad=spawnSync(python,['-I','-B','-c',C.PYTHON_BOOTSTRAP,'producer',p,'f'.repeat(64)],{encoding:'utf8',timeout:2000});assert.notEqual(bad.status,0);assert.equal(bad.stdout,'');
 }finally{rmSync(dir,{recursive:true});}
});
test('metadata inventory exercises public integer division without science',()=>{
 const s=C.PYTHON_RUNTIME_INVENTORY.replace("print(json.dumps([str(p)for p in sorted(files)]))",`
assert '_pylong' in sys.modules
assert pathlib.Path(sys.modules['_pylong'].__file__).resolve() in files
assert not any('f6c' in k or 'continuous_reception' in k for k in sys.modules)
(10**21000+1)//(10**16000+3)
for m in tuple(sys.modules.values()):
 for k in ('__file__','__cached__'):
  v=getattr(m,k,None)
  if isinstance(v,str)and pathlib.Path(v).is_file():assert pathlib.Path(v).resolve() in files
print('metadata-only')
`);
 const r=spawnSync(python,['-I','-B','-c',s],{encoding:'utf8',timeout:5000});assert.equal(r.status,0,r.stderr);assert.equal(r.stdout.trim(),'metadata-only');
});
test('immutable RSS and host helpers enforce original thresholds',()=>{
 const state=()=>({beganMs:0,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0});
 assert.throws(()=>H.acceptRSS(state(),[{rssBytes:2*1024**3}],1,0));assert.throws(()=>H.acceptRSS(state(),[{rssBytes:1}],1001,1000));
 assert.equal(H.parseHostResource('System-wide memory free percentage: 40%\n',64n*1024n**3n,true).freePercent,40);
 assert.throws(()=>H.parseHostResource('System-wide memory free percentage: 39%\n',64n*1024n**3n,true));assert.throws(()=>H.parseHostResource('System-wide memory free percentage: 20%\n',15n*1024n**3n,false));
});
test('competitors include every existing numerical lane but exclude owned children',()=>{
 const own={pid:10,ppid:1,command:'coordinator'},child={pid:11,ppid:10,command:'prepare-f6c-parent-emission-refinement.py'};C.noCompetitor([own,child],10);
 for(const command of ['run-f6c-parent-emission-refinement-pilot.mjs','verify-f6c-parent-emission-refinement.py','launch-f6c-emission-refinement-pilot.mjs','reduce-prescribed-acceleration-response.py','eom_native_evolution_fixture_cli','f6c-single-leaf-diagnostic-20260827/a/coordinator.mjs'])assert.throws(()=>C.noCompetitor([own,{pid:20,ppid:1,command}],10));
});
test('worker deadline precedes file access',()=>assert.throws(()=>C.fileOperation({kind:'recheck',sources:[],deadlineNanoseconds:'1'}),/deadline/));
test('exclusive publication and changed-hash rejection preserve prior bytes',()=>{
 const dir=temp();try{const p=path.join(dir,'a');C.writeNew(p,{accepted:false});assert.throws(()=>C.writeNew(p,{accepted:true}));assert.equal(JSON.parse(readFileSync(p)).accepted,false);assert.throws(()=>C.readBound(p,'f'.repeat(64)));}
 finally{rmSync(dir,{recursive:true});}
});
test('four private/public aliases count once and extra links fail',()=>{
 const dir=temp();try{const out=path.join(dir,'data'),hidden=path.join(out,'.parent-emission-private-x');mkdirSync(hidden,{recursive:true});
  for(const n of ['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json']){put(path.join(hidden,n),'{}\n');linkSync(path.join(hidden,n),path.join(out,n));}
  assert.equal(C.inspectCandidate(out,true).bytes,12);linkSync(path.join(out,'rows.ndjson'),path.join(dir,'third'));assert.throws(()=>C.inspectCandidate(out,true));
 }finally{rmSync(dir,{recursive:true});}
});
test('final stdout and active diagnostic errors reject',async()=>{
 let clock=0;const s=new Writable({write(_c,_e,cb){clock=1001;cb();}});await assert.rejects(H.flushCompletion({accepted:true},{began:0,lastSampleStartedMs:0,stream:s,clock:()=>clock}),/gap/);
 const t=new Writable({write(_c,_e,cb){cb(Error('synthetic EPIPE'));}}),g=D.diagnosticGuard(t);let cause;g.bind(e=>cause=e);g.write('x');await pause(10);assert.match(cause.message,/EPIPE/);await assert.rejects(g.close(performance.now()),/EPIPE/);
});
test('failed process summaries preserve uncertain closure',()=>{
 const r=D.rejectedStageSummaries([{stage:'producer',process:{processesClosed:false,cancellationUnverifiedPids:[99],cleanupFailure:'inspection lost'}}])[0];assert.equal(r.processesClosed,false);assert.deepEqual(r.cancellationUnverifiedPids,[99]);
});

function originalMetadata(){
 const tokens=Array.from({length:161},(_,n)=>n<=100?String(n/1000):String(.1+(n-100)/2000));
 tokens[3]='0.0030000000000000001';tokens[4]='0.0040000000000000001';tokens[158]='0.129';tokens[159]='0.1295';tokens[160]='0.13';
 const segments=[...Array(1600).fill(null),...tokens.slice(0,-1).map((startTime,n)=>({startTime,endTime:tokens[n+1]}))];
 return{schema:'braid-program/f6c-retained-history-export.v1',fieldSpeed:'1',acceptedFrames:tokens.filter((_,n)=>n%2===0).map(time=>({time})),retainedHistories:Array.from({length:8},()=>({segments:structuredClone(segments)}))};
}
function fixture(mode,parentIndex=1){
 const dir=temp(),output=path.join(dir,C.LANE,'pilot-parent-'+parentIndex+'-synthetic'),selfPath=path.join(dir,C.SELF),controlPath=path.join(dir,C.CONTROL);
 mkdirSync(path.join(dir,C.LANE),{recursive:true});mkdirSync(path.dirname(path.join(dir,C.LOCK)),{recursive:true});put(controlPath,'synthetic controls\n');
 for(const[p]of Object.values(C.PINS))put(path.join(dir,p),readFileSync(path.join(root,p)));
 const fake={NAMED:structuredClone(C.NAMED),DEPENDENCIES:structuredClone(C.DEPENDENCIES),ORIGINAL:structuredClone(C.ORIGINAL)};
 for(const spec of Object.values(fake))for(const[k,v]of Object.entries(spec)){const p=path.join(dir,v[0]);put(p,'synthetic-'+k+'\n');v[1]=bind(p).sha256;if(v.length>2)v[2]=bind(p).bytes;}
 const exportPath=path.join(dir,fake.ORIGINAL.export[0]);put(exportPath,JSON.stringify(originalMetadata())+'\n');fake.ORIGINAL.export[1]=bind(exportPath).sha256;
 const owner=path.join(dir,'reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md');put(owner,'synthetic versioned owner\n');
 const git=path.join(dir,'git-fixture');put(git,'#!/bin/sh\nexit 0\n',{mode:0o700});
 const metadata=JSON.stringify({CLAIMS:C.CLAIMS,LIBRARY_FLAGS:C.LIBRARY_FLAGS,CENSUS:C.CENSUS,CALLS:C.CALLS,ALGORITHM:C.ALGORITHM,PUBLICATION:C.PUBLICATION_REQUIRES,NAMED:Object.keys(C.NAMED)});
 const subject=String.raw`import argparse,hashlib,json,os,pathlib,resource,signal,sys,tempfile,time
M=json.loads(${JSON.stringify(metadata)});mode=${JSON.stringify(mode)};root=pathlib.Path(${JSON.stringify(dir)})
p=argparse.ArgumentParser()
for k in ('repo-root','plan','plan-sha256','producer-sha256','out-dir','git-binary','verifier-sha256','manifest','manifest-sha256','out','budget-seconds'):p.add_argument('--'+k)
a=p.parse_args();plan=json.loads(pathlib.Path(a.plan).read_bytes());producer=a.out_dir is not None
assert 0<float(a.budget_seconds)<=1800
def enc(v):return(json.dumps(v,sort_keys=True,separators=(',',':'))+'\n').encode()
def b(path):
 raw=pathlib.Path(path).read_bytes();return dict(path=str(path),sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
launch=b(a.plan);out=pathlib.Path(a.out_dir)if producer else pathlib.Path(a.manifest).parent
if producer:
 assert not out.exists()and pathlib.Path(str(out)+'-outer').is_dir()
 (root/'target-started.json').write_text(json.dumps(dict(pid=os.getpid(),pgid=os.getpgrp())))
 if mode=='stubborn':
  signal.signal(signal.SIGTERM,signal.SIG_IGN)
  while True:time.sleep(.05)
 if mode=='producer-fail':raise SystemExit(9)
 out.mkdir();hidden=pathlib.Path(tempfile.mkdtemp(prefix='.parent-emission-private-',dir=out))
 for name in ('queries.ndjson','rows.ndjson','pieces.ndjson'):
  (hidden/name).write_bytes(b'{}\n');os.link(hidden/name,out/name)
 rows=[b(out/n)for n in ('queries.ndjson','rows.ndjson','pieces.ndjson')]
 subject=sorted([plan[k]for k in M['NAMED']]+list(plan['dependencies'].values()),key=lambda x:x['path'])
 index=plan['parentIndex'];frame=index//2;export=json.loads(pathlib.Path(plan['originalBindings']['export']['path']).read_bytes());segment=export['retainedHistories'][0]['segments'][1600+index]
 parent=dict(parentIndex=index,frameIndex=frame,frame=dict(lower=export['acceptedFrames'][frame]['time'],upper=export['acceptedFrames'][frame+1]['time'],precision=90),reception=dict(lower=segment['startTime'],upper=segment['endTime'],precision=90),oldestTime='-8')
 if mode=='wrong-parent':parent['parentIndex']=(index+1)%160
 if mode=='wrong-frame':parent['frameIndex']=(frame+1)%80
 if mode=='wrong-lexeme':parent['reception']['upper']+='0'
 packet=dict(schema='braid-program/f6c-parent-emission-refinement-cover.v1',scope=plan['scope'],status='conditional_complete',accepted=False,
 launchPlan=launch,producer=plan['producer'],verifier=plan['verifier'],declaration=plan['declaration'],parent=parent,members=[dict(id=str(i))for i in range(8)],
 originalBindings=plan['originalBindings'],acceptanceOwner=plan['acceptanceOwner'],priorCoverClosure=plan['priorCoverClosure'],historicalSourceBindings=[plan['originalBindings']['fullEntry']],
 subjectSourceBindings=subject,runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],algorithm=M['ALGORITHM'],restrictions=[{}for _ in range(56)],census=M['CENSUS'],helperCalls=M['CALLS'],
 queries=rows[0],rows=rows[1],pieces=rows[2],libraryFlags=M['LIBRARY_FLAGS'],claims=M['CLAIMS'],publicationRequires=M['PUBLICATION'])
 if mode=='wrong-census':packet['census']['queries']=1
 (hidden/'cover-manifest.json').write_bytes(enc(packet));os.link(hidden/'cover-manifest.json',out/'cover-manifest.json')
 u=resource.getrusage(resource.RUSAGE_SELF)
 print(json.dumps(dict(completed=True,accepted=False,scope=packet['scope'],parentIndex=index,outputs=rows+[b(out/'cover-manifest.json')],census=packet['census'],helperCalls=M['CALLS'],elapsedSeconds=.01,
 processUserSeconds=u.ru_utime,processSystemSeconds=u.ru_stime,maximumIndividualProcessResidentBytes=u.ru_maxrss,independentComparisonRequired=True,externalInclusiveDeadlineAndProcessClosureRequired=True,claims=M['CLAIMS'])),flush=True)
else:
 prior=json.loads((root/'target-started.json').read_text())
 try:os.kill(prior['pid'],0)
 except ProcessLookupError:pass
 else:raise AssertionError('producer target still alive')
 (root/'comparison-started').write_text('yes')
 if mode=='checker-fail':raise SystemExit(10)
 packet=json.loads(pathlib.Path(a.manifest).read_bytes())
 allb=[plan[k]for k in M['NAMED']]+list(plan['dependencies'].values())+list(plan['originalBindings'].values())+[plan['acceptanceOwner'],launch]+plan['runtimeBindings']+plan['operationalBindings']+[packet[k]for k in ('queries','rows','pieces')]+[b(a.manifest)]
 sources=sorted({x['path']:x for x in allb}.values(),key=lambda x:x['path'])
 analysis=dict(accepted=False,conditional_query_replay_conformant=True,conditional_final_cover_conformant=True,query_count=3584,pair_count=56,row_count=64,ordinary_nonself_rows=56,self_exclusion_rows=8,piece_record_count=112,final_strict_face_checks=112,oldest_boundary_checks=56,claims=list(M['CLAIMS'].items()))
 if mode=='wrong-analysis':analysis['conditional_final_cover_conformant']=False
 if mode=='wrong-source':sources.pop()
 report=dict(schema='braid-program/f6c-parent-emission-refinement-conformance.v1',scope=packet['scope'],accepted=True,authority='synthetic only',
 manifest=b(a.manifest),queries=packet['queries'],rows=packet['rows'],pieces=packet['pieces'],launchPlan=launch,verifier=plan['verifier'],sourceBindings=sources,
 historicalSourceBindings=packet['historicalSourceBindings'],originalBindings=packet['originalBindings'],acceptanceOwner=packet['acceptanceOwner'],priorCoverClosure=packet['priorCoverClosure'],
 parent=packet['parent'],analysis=analysis,candidateClaims=M['CLAIMS'],publicationRequires=M['PUBLICATION'],elapsedSecondsBeforePublication=.01)
 target=pathlib.Path(a.out)
 with tempfile.NamedTemporaryFile(dir=target.parent,prefix='.parent-refinement-comparison-private-',delete=False)as f:f.write(enc(report));hidden=f.name
 os.link(hidden,target)
 print(json.dumps(dict(completed=True,accepted=True,scope=packet['scope'],output=b(target),elapsedSecondsBeforeCompletion=.02,publicationRequires=M['PUBLICATION'])),flush=True)
`;
 for(const k of ['producer','verifier']){const p=path.join(dir,fake.NAMED[k][0]);put(p,subject);fake.NAMED[k][1]=bind(p).sha256;}
 let source=readFileSync(path.join(root,C.SELF),'utf8');
 for(const[name,spec]of Object.entries(fake))source=source.replace(new RegExp('export const '+name+'=Object\\.freeze\\([^\\n]+\\);'),'export const '+name+'=Object.freeze('+JSON.stringify(spec)+');');
 // Deterministic fixture host; no observed host-resource result is asserted.
 source=source.replace("const probe=(command,args,timeout,maxBuffer)=>{","const probe=(command,args,timeout,maxBuffer)=>{if(command==='/usr/bin/memory_pressure')return Promise.resolve({text:'System-wide memory free percentage: 100%\\n',pid:-1});");
 if(mode==='stubborn')source=source.replace("const sample=rows=>{const value=","const sample=rows=>{if(active)diagnostics.write(Buffer.alloc(8192,120));const value=");
 put(selfPath,source);
 const plan={schema:'braid-program/f6c-parent-emission-refinement-launch.v1',scope:C.parentScope(parentIndex),parentIndex};
 for(const[k,[p]]of Object.entries(fake.NAMED))plan[k]=bind(path.join(dir,p));
 for(const key of ['dependencies','originalBindings'])plan[key]=Object.fromEntries(Object.entries(fake[key==='dependencies'?'DEPENDENCIES':'ORIGINAL']).map(([k,[p]])=>[k,bind(path.join(dir,p))]));
 plan.acceptanceOwner=bind(owner);plan.priorCoverClosure={authority:'versioned-acceptance-owner-declaration-not-fresh-observation',originalCallerSession:'13512',finalCompletionChunk:'c21aa7',exitCode:0,elapsedSeconds:'862.951823625',processesClosed:true,independentAuditAccepted:true};
 plan.runtimeBindings=[realpathSync(python),path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'),git].map(bind);
 plan.operationalBindings=[selfPath,controlPath,...Object.values(C.PINS).map(([p])=>path.join(dir,p)),realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'].map(bind);
 plan.limits=C.LIMITS;const planPath=path.join(dir,'plan.json');put(planPath,JSON.stringify(plan)+'\n');
 return{dir,output,selfPath,planPath,selfSha:hash(source),planSha:bind(planPath).sha256,git,source,plan};
}
test('metadata plan exact8 operational bindings rejects changed scope/caps/source',async()=>{
 const f=fixture('success');try{const M=await import('data:text/javascript;base64,'+Buffer.from(f.source).toString('base64')),a={root:f.dir,selfSha:f.selfSha,python,git:f.git};
  assert.equal(M.validatePlan(f.plan,a).plan.operationalBindings.length,8);
  for(const change of[p=>p.parentIndex=0,p=>p.limits={...p.limits,inclusiveSeconds:1801},p=>p.operationalBindings.pop(),p=>p.producer.sha256='f'.repeat(64),p=>p.runtimeBindings.push(p.runtimeBindings[0])]){const p=structuredClone(f.plan);change(p);assert.throws(()=>M.validatePlan(p,a));}
 }finally{rmSync(f.dir,{recursive:true});}
});
async function runFixture(mode,parentIndex=1,change=null,verifyLayout=null){
 const f=fixture(mode,parentIndex);
 if(change){const before=f.source;f.source=change(before,f);assert.notEqual(f.source,before);put(f.selfPath,f.source);f.selfSha=hash(f.source);const entry=f.plan.operationalBindings.find(b=>b.path===f.selfPath);Object.assign(entry,bind(f.selfPath));put(f.planPath,JSON.stringify(f.plan)+'\n');f.planSha=bind(f.planPath).sha256;}
 const child=spawn(process.execPath,[f.selfPath,'--plan',f.planPath,'--plan-sha256',f.planSha,'--self-sha256',f.selfSha,'--out',f.output,'--python',python,'--git',f.git],{cwd:f.dir,detached:true,stdio:['ignore','pipe','pipe']});
 const chunks=[],errors=[];child.stdout.on('data',b=>chunks.push(b));if(mode!=='stubborn')child.stderr.on('data',b=>errors.push(b));
 let timedOut=false;const closed=once(child,'close'),timer=setTimeout(()=>{timedOut=true;child.kill('SIGTERM');},12000);let target;
 try{
  if(mode==='stubborn'){const end=performance.now()+8000;while(!existsSync(path.join(f.dir,'target-started.json'))&&performance.now()<end&&child.exitCode===null)await pause(10);
   assert.ok(existsSync(path.join(f.dir,'target-started.json')),'actual target started');target=JSON.parse(readFileSync(path.join(f.dir,'target-started.json')));child.stderr.destroy();}
  const [code]=await closed;assert.equal(timedOut,false,'test fallback timeout must not produce the claimed result');
  if(change){
   assert.notEqual(code,0);const text=Buffer.concat(chunks).toString();if(text)assert.equal(JSON.parse(text).completed,true);
   const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','terminal-rejection.json')));assert.equal(rejection.accepted,false);assert(rejection.invalidates.sha256);
   assert.match(rejection.failure,verifyLayout?/identity|changed source|layout|census|hardlinks|ENOENT/:/identity|changed source/,'injected change actually reached final recheck');
   if(!verifyLayout){const hidden=readdirSync(f.output).find(n=>n.startsWith('.parent-emission-private-'));assert(hidden);assert.equal(readdirSync(path.join(f.output,hidden)).length,4);}
   for(const name of ['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json']){
    if(mode==='foreign-output'&&name==='rows.ndjson')assert.equal(readFileSync(path.join(f.output,name),'utf8'),'foreign replacement\n');
    else assert.equal(existsSync(path.join(f.output,name)),false);
   }
   assert.equal(existsSync(path.join(f.output+'-outer','comparison.json')),false);
   if(!verifyLayout)assert.equal(readdirSync(f.output+'-outer').filter(n=>n.startsWith('.parent-refinement-comparison-private-')).length,1);
   const operation=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json')));
   if(verifyLayout)verifyLayout(f,operation,rejection,text);
   for(const stage of operation.stages)for(const gate of stage.process.gates)assert(absent(gate.target.pid),'owned stage target absent before fixture cleanup');
   const observed=JSON.parse(readFileSync(path.join(f.dir,'target-started.json')));assert(absent(observed.pid));assert(absent(-observed.pgid));assert(absent(child.pid));assert(absent(-child.pid));
  }else if(mode==='success'){
   assert.equal(code,0,Buffer.concat(errors).toString());const done=JSON.parse(Buffer.concat(chunks));assert.equal(done.accepted,true);assert.equal(done.processesClosed,true);assert.equal(done.lockReleased,true);
   const record=JSON.parse(readFileSync(done.operation.path));assert.deepEqual(record.stages.map(x=>x.stage),['producer','comparison']);
   assert(!Object.hasOwn(done,'finalSourceBindings'));assert(!Object.hasOwn(done,'finalSourceIdentities'));assert(!Object.hasOwn(done,'ownedOutputs'));assert(!Object.hasOwn(done,'finalLayout'));
   assert(record.stages.every(s=>!Object.hasOwn(s.process.admission,'sourceIdentities')),'internal identity guards do not add historical receipt fields');
   assert.equal(done.parentIndex,parentIndex);assert.equal(record.parentIndex,parentIndex);assert.equal(done.scope,C.operationScope(parentIndex));
   for(const s of record.stages){assert.equal(s.process.exit.code,0);assert.equal(s.process.gates.length,1);assert.equal(absent(s.process.gates[0].target.pid),true);assert.deepEqual(s.process.stdoutLog,s.process.admission.completionLog);}
   assert.ok(existsSync(path.join(f.dir,'comparison-started')));
  }else{
   assert.notEqual(code,0);assert.equal(Buffer.concat(chunks).length,0,'no successful coordinator output');assert.equal(existsSync(path.join(f.output+'-outer','operation.json')),false);
   const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));
   if(mode==='stubborn')assert.match(rejection.failure,/EPIPE|broken pipe/u,'actual diagnostic sink failure caused cancellation');
   if(mode.startsWith('wrong-'))assert.equal(rejection.stages.at(-1).process.exit.code,0,'semantic rejection follows successful target');
   if(['producer-fail','wrong-parent','wrong-census','stubborn'].includes(mode))assert.equal(existsSync(path.join(f.dir,'comparison-started')),false);
   for(const s of rejection.stages)for(const g of s.process.gates??[])if(g.target?.pid)assert.equal(absent(g.target.pid),true,'failed target gone');
  }
  assert.equal(existsSync(path.join(f.dir,C.LOCK)),false,'lock released');if(target){assert.equal(absent(target.pid),true);assert.throws(()=>process.kill(-target.pgid,0),e=>e.code==='ESRCH');}
 }finally{
  clearTimeout(timer);if(!absent(child.pid)){child.kill('SIGTERM');await pause(1000);if(!absent(child.pid))process.kill(-child.pid,'SIGKILL');await closed;}rmSync(f.dir,{recursive:true});
 }
}
for(const[mode,label]of[['success','captured coordinator-worker-two registered Python stages'],['producer-fail','producer failure prevents checker'],['checker-fail','checker failure forbids final acceptance'],['wrong-parent','wrong original parent after real output'],['wrong-census','wrong query census after real output'],['wrong-analysis','negative conditional comparison'],['wrong-source','omitted complete source closure'],['stubborn','active target EPIPE closes group and lock']])
 test(label,{timeout:15000},()=>runFixture(mode));
for(const index of [0,2,159])test('source-derived selected parent '+index+' through both closed stages',{timeout:15000},()=>runFixture('success',index));
for(const mode of ['wrong-parent','wrong-frame','wrong-lexeme'])test('parent2 rejects '+mode+' after successful producer',{timeout:15000},()=>runFixture(mode,2));
test('all parent indices and exact original endpoint metadata',()=>{
 const original=originalMetadata();for(let n=0;n<160;n++){assert.equal(C.parentScope(n),'original-parent-'+n+'-emission-refinement');assert.equal(C.originalParentMetadata(original,n).frameIndex,Math.floor(n/2));}
 assert.deepEqual(C.originalParentMetadata(original,2),{parentIndex:2,frameIndex:1,frame:{lower:'0.002',upper:'0.0040000000000000001',precision:90},reception:{lower:'0.002',upper:'0.0030000000000000001',precision:90},oldestTime:'-8'});
 for(const n of [null,true,false,-1,160,2.1,'2'])assert.throws(()=>C.originalParentMetadata(original,n));
 for(const change of [o=>o.retainedHistories[1].segments[1602].endTime='0.003',o=>o.acceptedFrames[2].time='0.004',o=>o.retainedHistories.pop()]){const o=structuredClone(original);change(o);assert.throws(()=>C.originalParentMetadata(o,2));}
});
test('owned retraction preserves foreign replacement and all private bytes',()=>{
 const dir=temp();try{
  const privatePath=path.join(dir,'private'),publicPath=path.join(dir,'public');put(privatePath,'original');linkSync(privatePath,publicPath);
  const s=statSync(publicPath),owner={path:publicPath,dev:String(s.dev),ino:String(s.ino)};
  put(publicPath+'.swap','foreign');renameSync(publicPath+'.swap',publicPath);C.retractOwnedOutputs([owner]);
  assert.equal(readFileSync(publicPath,'utf8'),'foreign');assert.equal(readFileSync(privatePath,'utf8'),'original');
 }finally{rmSync(dir,{recursive:true});}
});
for(const [label,target,kind,point]of [
 ['source after cleanup',f=>JSON.stringify(f.plan.dependencies.rootLibrary.path),'replace','before'],
 ['source after stdout',f=>JSON.stringify(f.plan.dependencies.rootLibrary.path),'replace','after'],
 ['candidate after stdout',f=>JSON.stringify(path.join(f.output,'queries.ndjson')),'append','after'],
 ['comparison after stdout',f=>JSON.stringify(path.join(f.output+'-outer','comparison.json')),'append','after'],
 ['operation after stdout',f=>JSON.stringify(path.join(f.output+'-outer','operation.json')),'append','after'],
 ['launcher log after stdout',()=>"result.logs[0].path",'append','after'],
 ['resource log after stdout',()=>"result.logs[1].path",'append','after'],
 ['launcher log inode after stdout',()=>"result.logs[0].path",'replace','after'],
 ['resource log inode after stdout',()=>"result.logs[1].path",'replace','after'],
 ['foreign candidate after stdout',f=>JSON.stringify(path.join(f.output,'rows.ndjson')),'foreign','after'],
])test('final integrity: '+label,{timeout:15000},()=>runFixture(kind==='foreign'?'foreign-output':'success',2,(source,f)=>{
 const action=kind==='append'?"const fd=openSync(target,'a');try{writeSync(fd,Buffer.from(' '));fsyncSync(fd);}finally{closeSync(fd);}":
  "const bytes="+(kind==='foreign'?"Buffer.from('foreign replacement\\n')":"readBound(target,undefined,true).data")+",other=target+'.swap';const fd=openSync(other,'wx');try{writeSync(fd,bytes);fsyncSync(fd);}finally{closeSync(fd);}renameSync(other,target);";
 const injection='{const target='+target(f)+';'+action+'}';
 source=source.replace('import {closeSync,','import {renameSync,closeSync,');
 const at=point==='before'?'C.checkBindings(result.finalSourceBindings,finalLive,result.finalSourceIdentities);':'diagnostics.check();await diagnostics.close(began);';
 assert(source.includes(at));return source.replace(at,point==='before'?injection+at:at+injection);
}));
for(const [label,kind,point]of [
 ['candidate directory renamed after stdout','candidate-rename','after'],
 ['candidate same-prefix directory renamed after stdout','candidate-prefix','after'],
 ['candidate directory renamed before stdout','candidate-rename','before'],
 ['comparison private name changed after stdout','comparison-rename','after'],
 ['comparison same-prefix private name changed after stdout','comparison-prefix','after'],
 ['comparison private name changed before stdout','comparison-rename','before'],
 ['candidate private file name changed after stdout','private-file','after'],
 ['candidate third link after stdout','candidate-link','after'],
 ['comparison third link after stdout','comparison-link','after'],
 ['foreign candidate directory entry after stdout','candidate-extra','after'],
 ['foreign operation directory entry after stdout','operation-extra','after'],
 ['renamed private evidence with foreign public replacement','foreign-output','after'],
])test('final layout: '+label,{timeout:15000},()=>runFixture(kind==='foreign-output'?'foreign-output':'success',2,(source,f)=>{
 const actions={
  'candidate-rename':"renameSync(hidden,path.join(out,'changed-private-directory'));",
  'candidate-prefix':"renameSync(hidden,path.join(out,'.parent-emission-private-renamed'));",
  'comparison-rename':"renameSync(comparison,path.join(ops,'changed-private-comparison'));",
  'comparison-prefix':"renameSync(comparison,path.join(ops,'.parent-refinement-comparison-private-renamed'));",
  'private-file':"renameSync(path.join(hidden,'queries.ndjson'),path.join(hidden,'changed-private-query'));",
  'candidate-link':"linkSync(path.join(out,'queries.ndjson'),path.join(path.dirname(out),'foreign-third-link'));",
  'comparison-link':"linkSync(path.join(ops,'comparison.json'),path.join(path.dirname(out),'foreign-third-link'));",
  'candidate-extra':"writeNew(path.join(out,'foreign-layout-file'),{foreign:true});",
  'operation-extra':"writeNew(path.join(ops,'foreign-layout-file'),{foreign:true});",
  'foreign-output':"renameSync(hidden,path.join(out,'changed-private-directory'));const p=path.join(out,'rows.ndjson'),fd=openSync(p+'.swap','wx');try{writeSync(fd,Buffer.from('foreign replacement\\n'));fsyncSync(fd);}finally{closeSync(fd);}renameSync(p+'.swap',p);",
 };
 const injection='{const out='+JSON.stringify(f.output)+",ops=out+'-outer',hidden=path.join(out,readdirSync(out).find(n=>n.startsWith('.parent-emission-private-'))),comparison=path.join(ops,readdirSync(ops).find(n=>n.startsWith('.parent-refinement-comparison-private-')));const publicPaths=['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'].map(n=>path.join(out,n)).concat(path.join(ops,'comparison.json'));const before=publicPaths.map(p=>({owner:outputOwner(p),binding:clean(readBound(p))}));"+actions[kind]+(kind==='foreign-output'?'':"check(same(before,publicPaths.map(p=>({owner:outputOwner(p),binding:clean(readBound(p))}))),'synthetic public bytes/inodes unchanged');")+'}';
 source=source.replace('import {closeSync,','import {renameSync,linkSync,closeSync,');
 const at=point==='before'?'C.checkBindings(result.finalSourceBindings,finalLive,result.finalSourceIdentities);':'diagnostics.check();await diagnostics.close(began);';
 assert(source.includes(at));return source.replace(at,point==='before'?injection+at:at+injection);
},(f,operation,_rejection,stdout)=>{
 assert.equal(Boolean(stdout),point==='after','layout failure occurs at the declared pre/poststdout boundary');
 const names=readdirSync(f.output),hidden=kind==='candidate-rename'||kind==='foreign-output'?'changed-private-directory':names.find(n=>n.startsWith('.parent-emission-private-'));
 assert(hidden);assert.equal(readdirSync(path.join(f.output,hidden)).length,4);
 for(const b of operation.stages[0].process.admission.outputs){const name=path.basename(b.path),p=path.join(f.output,hidden,kind==='private-file'&&name==='queries.ndjson'?'changed-private-query':name);assert.equal(bind(p).sha256,b.sha256);assert.equal(bind(p).bytes,b.bytes);}
 const ops=f.output+'-outer',privateComparison=kind==='comparison-rename'?'changed-private-comparison':readdirSync(ops).find(n=>n.startsWith('.parent-refinement-comparison-private-'));
 assert(privateComparison);const expected=operation.stages[1].process.admission.outputs.at(-1);assert.equal(bind(path.join(ops,privateComparison)).sha256,expected.sha256);
 if(kind.endsWith('-link'))assert(existsSync(path.join(path.dirname(f.output),'foreign-third-link')),'foreign extra hardlink retained');
 if(kind.endsWith('-extra'))assert.deepEqual(JSON.parse(readFileSync(path.join(kind==='candidate-extra'?f.output:ops,'foreign-layout-file'))),{foreign:true});
}));

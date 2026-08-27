// Synthetic operation controls only; no ignored histories or numerical modules.
// Full composition fixtures replace binding constants and Python subjects only.
// The original coordinator, file worker, registered gate and admission execute.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {existsSync,linkSync,mkdtempSync,mkdirSync,readFileSync,realpathSync,rmSync,statSync,writeFileSync} from 'node:fs';
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
 assert.equal(C.SCOPE,'original-parent-1-emission-refinement');assert.equal(C.LIMIT,1800000);assert.equal(C.FILE,67108864);assert.equal(C.LOG,16777216);
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

function fixture(mode){
 const dir=temp(),output=path.join(dir,C.LANE,'pilot-parent-1-synthetic'),selfPath=path.join(dir,C.SELF),controlPath=path.join(dir,C.CONTROL);
 mkdirSync(path.join(dir,C.LANE),{recursive:true});mkdirSync(path.dirname(path.join(dir,C.LOCK)),{recursive:true});put(controlPath,'synthetic controls\n');
 for(const[p]of Object.values(C.PINS))put(path.join(dir,p),readFileSync(path.join(root,p)));
 const fake={NAMED:structuredClone(C.NAMED),DEPENDENCIES:structuredClone(C.DEPENDENCIES),ORIGINAL:structuredClone(C.ORIGINAL)};
 for(const spec of Object.values(fake))for(const[k,v]of Object.entries(spec)){const p=path.join(dir,v[0]);put(p,'synthetic-'+k+'\n');v[1]=bind(p).sha256;if(v.length>2)v[2]=bind(p).bytes;}
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
 parent=dict(parentIndex=1,frameIndex=0,reception=dict(lower='0.001',upper='0.002',precision=90),oldestTime='-8')
 if mode=='wrong-parent':parent['parentIndex']=0
 packet=dict(schema='braid-program/f6c-parent-emission-refinement-cover.v1',scope='original-parent-1-emission-refinement',status='conditional_complete',accepted=False,
 launchPlan=launch,producer=plan['producer'],verifier=plan['verifier'],declaration=plan['declaration'],parent=parent,members=[dict(id=str(i))for i in range(8)],
 originalBindings=plan['originalBindings'],acceptanceOwner=plan['acceptanceOwner'],priorCoverClosure=plan['priorCoverClosure'],historicalSourceBindings=[plan['originalBindings']['fullEntry']],
 subjectSourceBindings=subject,runtimeBindings=plan['runtimeBindings'],operationalBindings=plan['operationalBindings'],algorithm=M['ALGORITHM'],restrictions=[{}for _ in range(56)],census=M['CENSUS'],helperCalls=M['CALLS'],
 queries=rows[0],rows=rows[1],pieces=rows[2],libraryFlags=M['LIBRARY_FLAGS'],claims=M['CLAIMS'],publicationRequires=M['PUBLICATION'])
 if mode=='wrong-census':packet['census']['queries']=1
 (hidden/'cover-manifest.json').write_bytes(enc(packet));os.link(hidden/'cover-manifest.json',out/'cover-manifest.json')
 u=resource.getrusage(resource.RUSAGE_SELF)
 print(json.dumps(dict(completed=True,accepted=False,scope=packet['scope'],parentIndex=1,outputs=rows+[b(out/'cover-manifest.json')],census=packet['census'],helperCalls=M['CALLS'],elapsedSeconds=.01,
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
 const plan={schema:'braid-program/f6c-parent-emission-refinement-launch.v1',scope:C.SCOPE,parentIndex:1};
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
async function runFixture(mode){
 const f=fixture(mode),child=spawn(process.execPath,[f.selfPath,'--plan',f.planPath,'--plan-sha256',f.planSha,'--self-sha256',f.selfSha,'--out',f.output,'--python',python,'--git',f.git],{cwd:f.dir,detached:true,stdio:['ignore','pipe','pipe']});
 const chunks=[],errors=[];child.stdout.on('data',b=>chunks.push(b));if(mode!=='stubborn')child.stderr.on('data',b=>errors.push(b));
 let timedOut=false;const closed=once(child,'close'),timer=setTimeout(()=>{timedOut=true;child.kill('SIGTERM');},12000);let target;
 try{
  if(mode==='stubborn'){const end=performance.now()+8000;while(!existsSync(path.join(f.dir,'target-started.json'))&&performance.now()<end&&child.exitCode===null)await pause(10);
   assert.ok(existsSync(path.join(f.dir,'target-started.json')),'actual target started');target=JSON.parse(readFileSync(path.join(f.dir,'target-started.json')));child.stderr.destroy();}
  const [code]=await closed;assert.equal(timedOut,false,'test fallback timeout must not produce the claimed result');
  if(mode==='success'){
   assert.equal(code,0,Buffer.concat(errors).toString());const done=JSON.parse(Buffer.concat(chunks));assert.equal(done.accepted,true);assert.equal(done.processesClosed,true);assert.equal(done.lockReleased,true);
   const record=JSON.parse(readFileSync(done.operation.path));assert.deepEqual(record.stages.map(x=>x.stage),['producer','comparison']);
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

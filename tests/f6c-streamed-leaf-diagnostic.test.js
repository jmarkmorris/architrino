// Synthetic transport/lifecycle controls plus an explicit genuine stationary
// adapter/driver bridge. No original histories or actual-data numerical work.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {existsSync,mkdtempSync,mkdirSync,readFileSync,realpathSync,rmSync,statSync,writeFileSync,renameSync,linkSync,openSync,closeSync,ftruncateSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {Writable} from 'node:stream';
import * as C from '../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const root=realpathSync(process.cwd()),python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const hash=x=>createHash('sha256').update(x).digest('hex');
const bind=p=>({path:p,sha256:hash(readFileSync(p)),bytes:statSync(p).size});
const load=async([p,h])=>{const raw=readFileSync(path.join(root,p));assert.equal(hash(raw),h);return import('data:text/javascript;base64,'+raw.toString('base64'));};
const H=await load(C.PINS.helpers),D=await load(C.PINS.diagnostics);
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const absent=pid=>{try{process.kill(pid,0);return false;}catch(e){return e.code==='ESRCH';}};
let runtime;
function runtimeBindings(){
 if(runtime)return runtime;
 const result=spawnSync(python,['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:10000,maxBuffer:1024**2});
 assert.equal(result.status,0,result.stderr.slice(-1000));
 const paths=[...JSON.parse(result.stdout),path.resolve(path.dirname(path.dirname(python)),'pyvenv.cfg'),'/usr/bin/git',realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'];
 runtime=[...new Set(paths)].map(bind);return runtime;
}
const adapterFake=String.raw`import contextlib,dataclasses,hashlib,pathlib,types
SOURCES=()
@dataclasses.dataclass(frozen=True)
class SourceBinding:
 path:str
 sha256:str
 bytes:int
@dataclasses.dataclass(frozen=True)
class ArchivedSource:
 role:str
 original:SourceBinding
 archive:SourceBinding
@dataclasses.dataclass(frozen=True)
class ParentClosure:
 owner:SourceBinding
 operation:SourceBinding
 original_caller_session:str
 final_completion_chunk:str
 exit_code:int
 elapsed_seconds:str
 processes_closed:bool
 independent_audit_accepted:bool
 authority:str
@dataclasses.dataclass(frozen=True)
class ParentRefinement:
 parent_index:int
 plan:SourceBinding
 manifest:SourceBinding
 comparison:SourceBinding
 operation:SourceBinding
 launcher_log:SourceBinding
 resource_log:SourceBinding
 closure:ParentClosure
 archived_sources:tuple
@contextlib.contextmanager
def open_adapter(root,**kw):
 source=pathlib.Path(__file__)
 histories=tuple(types.SimpleNamespace(segments=(None,)*1760)for _ in range(8))
 a=types.SimpleNamespace(context={'synthetic':'not-original-data'},provenance=((str(source),hashlib.sha256(source.read_bytes()).hexdigest(),source.stat().st_size),),
 histories=histories,frames=tuple(range(81)),parents=tuple(range(160)),
 historical_owner_archives=tuple(dict.fromkeys(r for d in kw['parent_refinements']for r in d.archived_sources)),
 call_counts=dict(projections=0,evaluations=0,residuals=0,root_queries=0,emission_refinements=0),
 geometry_accounting=dict(restriction_calls=0,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))
 extras=[]
 for d in kw['parent_refinements']:
  extras.extend(getattr(d,k)for k in ('plan','manifest','comparison','operation','launcher_log','resource_log'))
  extras.extend(r.archive for r in d.archived_sources)
 a.provenance=tuple(dict.fromkeys(a.provenance+tuple((b.path,b.sha256,b.bytes)for b in extras)))
 if MODE=='archive-runtime':
  import sys
  m=types.ModuleType('_archive_is_not_executing_source');m.__file__=kw['parent_refinements'][0].archived_sources[0].archive.path;sys.modules[m.__name__]=m
 if MODE=='runtime-in-provenance':
  import sys
  p=pathlib.Path(sys.modules['_pylong'].__file__);raw=p.read_bytes()
  a.provenance+=((str(p),hashlib.sha256(raw).hexdigest(),len(raw)),)
 try:yield a
 finally:
  if MODE=='cleanup-replacement':
   replacement=source.with_suffix('.swap');replacement.write_bytes(source.read_bytes());replacement.replace(source)
`;
const driverFake=String.raw`import dataclasses,fractions,pathlib,types,time,os,signal,sys
@dataclasses.dataclass(frozen=True)
class Claims:
 accepted:bool=False
 physical_claim_established:bool=False
@dataclasses.dataclass(frozen=True)
class Request:
 context:object
 frame_index:int
 domain:object
 generation:int
 path:tuple
 node_neighborhoods:tuple
@dataclasses.dataclass(frozen=True)
class Response:
 request:object
 members:tuple
@dataclasses.dataclass(frozen=True)
class Provision:
 schema:str
 scope:str
 context:object
 source_provenance:tuple
 response:object
 ranges:tuple
 correlated_residuals:tuple
 call_counts:tuple
 geometry_accounting:tuple
 history_state_evaluations:tuple
 claims:object
@dataclasses.dataclass(frozen=True)
class Evaluation:
 response:object
 cell:object
 witnesses:tuple
 diagnostics:tuple
 integral_width:fractions.Fraction
 peak_upper_squared:fractions.Fraction
class LeafResponseSession:
 def __init__(self,adapter):
  if MODE=='late-runtime':
   m=types.ModuleType('_unbound_fixture_runtime');m.__file__=EXTRA;sys.modules[m.__name__]=m
  self.a=adapter;self.integral_reference=types.SimpleNamespace(Claims=Claims)
  self.gk_protocol=types.SimpleNamespace(MAX_EVALUATED_LEAVES=3280,request=lambda state:next((x.request for x in state.leaves if x.evaluation is None),None))
  self.state=types.SimpleNamespace(plan={'context':adapter.context,'synthetic':True},status='pending',aggregate=None,next_generation=160,split_counts=(1,)*80,
   leaves=tuple(types.SimpleNamespace(request=Request(adapter.context,n//2,{'lower':str(n),'upper':str(n+1)},n,(n%2,),({}, {}, {})),evaluation=None)for n in range(160)),evaluations=())
 def provide(self,state,progress):
  assert state is self.state
  with open(EVENTS,'a')as file:file.write('provide\n');file.flush();os.fsync(file.fileno())
  if MODE=='stubborn':
   signal.signal(signal.SIGTERM,signal.SIG_IGN);pathlib.Path(PID).write_text(str(os.getpid()))
   while True:time.sleep(.05)
  for k,n in zip(self.a.call_counts,(4,4,8,0,0)):self.a.call_counts[k]+=n
  for k,n in zip(self.a.geometry_accounting,(4,4,40,4)):self.a.geometry_accounting[k]+=n
  progress('range',4,4);progress('residual',8,8)
  request=self.gk_protocol.request(state);response=Response(request,tuple({'label':str(n)}for n in range(8)))
  ranges=tuple(dict(cell={'rows':[{'token':'01.000'}]*64},ranges={'rows':[{'token':'01.000'}]*64})for _ in range(4))
  return Provision('braid-program/f6c-leaf-provision.v1','synthetic-only',self.a.context,self.a.provenance,response,ranges,({},)*8,tuple(self.a.call_counts.items()),tuple(self.a.geometry_accounting.items()),(7,9,11,13),Claims())
 def advance(self,provision):
  evaluation=Evaluation(provision.response,{},(),(),fractions.Fraction(1,3),fractions.Fraction(2,3))
  done=self.state.evaluations+(evaluation,)
  leaves=tuple(types.SimpleNamespace(request=l.request,evaluation=evaluation if l.request is provision.response.request or MODE=='exhausted'else l.evaluation)for l in self.state.leaves)
  self.state=types.SimpleNamespace(plan=self.state.plan,status='unresolved'if MODE=='exhausted'else'pending',aggregate=None,next_generation=160,split_counts=(1,)*80,leaves=leaves,evaluations=done)
  return self.state
`;
function fixture(mode='normal',maximum=2){
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-stream-'))),output=path.join(dir,C.LANE,'synthetic');
 mkdirSync(path.dirname(output),{recursive:true});mkdirSync(path.dirname(path.join(dir,C.LOCK)),{recursive:true});
 const entry=path.join(dir,C.SELF),controls=path.join(dir,C.CONTROL);mkdirSync(path.dirname(entry),{recursive:true});mkdirSync(path.dirname(controls),{recursive:true});writeFileSync(controls,'synthetic controls\n');
 const events=path.join(dir,'events'),pidfile=path.join(dir,'target.pid'),pins={};
 for(const[key,[rel,digest]]of Object.entries(C.PINS)){
  const filename=path.join(dir,rel);mkdirSync(path.dirname(filename),{recursive:true});
  let raw;
  if(key==='adapter')raw='MODE='+JSON.stringify(mode)+'\n'+adapterFake;
  else if(key==='diagnostic')raw='MODE='+JSON.stringify(mode)+'\nEVENTS='+JSON.stringify(events)+'\nPID='+JSON.stringify(pidfile)+'\nEXTRA='+JSON.stringify(path.join(dir,'unbound.py'))+'\n'+driverFake;
  else if(['helpers','outer','diagnostics','transport','codec','storage','stream'].includes(key)){raw=readFileSync(path.join(root,rel));assert.equal(hash(raw),digest);}
  else raw='synthetic metadata only\n';
  writeFileSync(filename,raw);pins[key]=[rel,hash(raw)];
 }
 let source=readFileSync(path.join(root,C.SELF),'utf8').replace(/export const PINS=Object.freeze\([\s\S]*?\n\);/u,'export const PINS=Object.freeze('+JSON.stringify(pins)+');');
 // Formatting is intentionally robust to a one-line closing brace.
 if(source.includes(C.PINS.adapter[1]))source=source.replace(/export const PINS=Object.freeze\([\s\S]*?\n\}\);/u,'export const PINS=Object.freeze('+JSON.stringify(pins)+');');
 assert(!source.includes(C.PINS.adapter[1]),'fixture source pins replaced');
 if(mode==='postpublish')source=source.replace("after_close_recheck();publication.verify();publication.close();live()","after_close_recheck();publication.verify();publication.close();live()\n  bad=pathlib.Path(bindings['diagnostic']['path']);replacement=bad.with_suffix('.swap');replacement.write_bytes(bad.read_bytes());replacement.replace(bad)");
 if(mode==='module-cleanup')source=source.replace("finally:require(sys.modules.get(name)is m,'module identity');del sys.modules[name]","finally:\n   require(sys.modules.get(name)is m,'module identity');del sys.modules[name]\n   if b['path'].endswith('f6c_single_leaf_diagnostic.py'):\n    bad=pathlib.Path(b['path']);other=bad.with_suffix('.swap');other.write_bytes(bad.read_bytes());other.replace(bad)");
 if(mode==='final-cleanup')source=source.replace("if(closed){live();H.admitFinalObservation(rss,performance.now());}","if(closed)throw Error('synthetic final cleanup');");
 if(mode==='poststdout')source=source.replace('C.checkBindings(result.finalSourceBindings,finalLive,result.finalSourceIdentities);finalLive();',"throw Error('synthetic poststdout failure');");
 if(mode==='trailing')source=source.replace('framing=session.finish();sealed=publication.seal();','framing=session.finish();publication.private_path.open(\'ab\').write(b\'{}\\n\');sealed=publication.seal();');
 writeFileSync(entry,source);
 writeFileSync(path.join(dir,'unbound.py'),'# explicit unbound fixture module\n');
 const bindings={coordinator:bind(entry),controls:bind(controls),...Object.fromEntries(Object.entries(pins).map(([k,[p]])=>[k,bind(path.join(dir,p))]))};
 const runtimeList=runtimeBindings().map(x=>({...x}));
 if(mode==='missing-runtime'||mode==='runtime-in-provenance')runtimeList.splice(runtimeList.findIndex(b=>b.path.endsWith('/_pylong.py')),1);
 const spec={schema:'braid-program/f6c-streamed-leaf-invocation.v1',scope:C.SCOPE,root:dir,output,python,git:'/usr/bin/git',bindings,runtimeBindings:runtimeList,parentRefinements:[],maxAdvances:maximum,limits:C.LIMITS};
 if(mode==='archives'||mode==='shared-archives'||mode==='archive-runtime'){
  const prior={};for(const k of['plan','manifest','comparison','operation','launcher_log','resource_log']){const p=path.join(dir,'prior-'+k);writeFileSync(p,'prior '+k);prior[k]=bind(p);}
  const archive=path.join(dir,mode==='archive-runtime'?'scripts/eom/archived-owner.py':'owner-archive');writeFileSync(archive,'prior-v1');const ar=bind(archive),original={...ar,path:bindings.readiness.path};
  spec.parentRefinements=[{parent_index:1,...prior,closure:{owner:bindings.readiness,operation:prior.operation,original_caller_session:'9158',final_completion_chunk:'1eda87',exit_code:0,elapsed_seconds:'261.94229158400003',processes_closed:true,independent_audit_accepted:true,authority:'attributed-versioned-acceptance-owner-not-fresh-process-observation'},archived_sources:[{role:'acceptanceOwner',original,archive:ar}]}];
  if(mode==='shared-archives'){
   const next=structuredClone(spec.parentRefinements[0]);next.parent_index=2;next.closure.original_caller_session='12345';next.closure.final_completion_chunk='abc123';next.closure.elapsed_seconds='3.125';
   for(const k of ['plan','manifest','comparison','operation','launcher_log','resource_log']){const p=path.join(dir,'second-'+k);writeFileSync(p,'second '+k);next[k]=bind(p);}
   next.closure.operation=next.operation;spec.parentRefinements.push(next);
  }
 }
 const specPath=path.join(dir,'invocation.json');writeFileSync(specPath,JSON.stringify(spec)+'\n');
 // check-ignore needs only a portable ignored synthetic checkout, never repo outputs.
 for(const args of [['init','-q',dir],['-C',dir,'config','core.hooksPath','/dev/null']])assert.equal(spawnSync('/usr/bin/git',args,{encoding:'utf8'}).status,0);
 writeFileSync(path.join(dir,'.gitignore'),'.local-data/\n');
 return{dir,output,entry,events,pidfile,spec,specPath,specSha:bind(specPath).sha256,selfSha:bindings.coordinator.sha256,source};
}
async function runFixture(f,{interrupt=false,epipe=false}={}){
 const child=spawn(process.execPath,[f.entry,'--spec',f.specPath,'--spec-sha256',f.specSha,'--self-sha256',f.selfSha],{cwd:f.dir,stdio:['ignore','pipe','pipe']});
 let out='',err='';child.stdout.on('data',b=>{out+=b;assert(out.length<2*1024**2,'bounded completion');});
 if(!epipe)child.stderr.on('data',b=>{err+=b;if(err.length>4*1024**2)err=err.slice(-(1024**2));});
 const timer=setTimeout(()=>child.kill('SIGKILL'),20000);
 const close=once(child,'close');
 try{
  if(interrupt||epipe){
   for(let n=0;n<1000&&!existsSync(f.pidfile)&&child.exitCode===null;n++)await pause(10);
   assert(existsSync(f.pidfile),'owned target actually started: '+err.slice(-500));
   if(epipe)child.stderr.destroy();else child.kill('SIGTERM');
  }
  const[code,signal]=await close;assert.equal(signal,null,'coordinator not timeout killed');
  return{code,out,err,childPid:child.pid};
 }finally{clearTimeout(timer);}
}
function cleanup(f){rmSync(f.dir,{recursive:true,force:true});}
function alterFixture(f,change){
 const before=readFileSync(f.entry,'utf8'),after=change(before);assert.notEqual(after,before,'specific bounded injection applied');
 writeFileSync(f.entry,after);f.spec.bindings.coordinator=bind(f.entry);writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');
 f.selfSha=f.spec.bindings.coordinator.sha256;f.specSha=bind(f.specPath).sha256;
}

test('reviewed dependencies remain byte-exact',()=>{
 for(const[k,[p,h]]of Object.entries(C.PINS)){if(k==='readiness'){assert.equal(h,null);assert(existsSync(path.join(root,p)));}else assert.equal(hash(readFileSync(path.join(root,p))),h);}
 assert(C.PYTHON.length<65536);
});
test('genuine two-refined-parent provider connects to frozen stream and codec',()=>{
 const script=String.raw`import hashlib,json,pathlib,sys,types
root=pathlib.Path(sys.argv[1]);pins=json.loads(sys.argv[2])
def load(name,role):
 rel,digest=pins[role];p=root/rel;raw=p.read_bytes();assert hashlib.sha256(raw).hexdigest()==digest
 m=types.ModuleType(name);m.__file__=str(p);sys.modules[name]=m;exec(compile(raw,str(p),'exec'),m.__dict__)
 assert p.read_bytes()==raw;return m
f=load('genuine_stream_driver_fixture','diagnosticControls')
s=load('genuine_stream_session','stream');c=load('genuine_stream_codec','codec')
adapter,_=f.genuine_session_adapter(refined_indices=(0,1))
metadata=dict(scope='synthetic-two-refined-parents',spec={},sourceBindings={},runtimeBindings=[],pythonBodySha256='b'*64,clockTransfer={},publicationRequires='external admission')
lines=[];session=s.StreamedLeafSession(adapter,f.D,c,metadata,lines.append)
assert adapter.parents[0].refined is True and adapter.parents[1].refined is True
for index in range(2):
 summary=session.advance();assert(summary['evaluated_count'],summary['pending_count'])==(index+1,159-index)
receipt=session.finish();assert receipt['completed_pairs']==2
decoder=c.StreamDecoder();decoded=[decoder.feed(line)for line in lines];decoder.finish()
for index in range(2):
 value=decoded[2*index+1]['value'];request=value['response']['request']
 assert request['generation']==index and request['frame_index']==0 and request['path']==[index]
 assert len(value['ranges'])==4 and len(value['correlated_residuals'])==8
 for record in value['ranges']:
  assert record['cell']['cell_index']==index
 assert adapter.parents[index].refined is True
assert(adapter.call_counts['projections'],adapter.call_counts['evaluations'],adapter.call_counts['residuals'])==(8,8,16)
assert adapter.call_counts['root_queries']==adapter.call_counts['emission_refinements']==0
assert summary['aggregate_is_none'] is True
print(json.dumps(dict(completedPairs=2,evaluations=8,residuals=16,originalData=False)))
`;
 const result=spawnSync(python,['-I','-B','-c',script,root,JSON.stringify(C.PINS)],{cwd:root,encoding:'utf8',timeout:30000,maxBuffer:1024**2});
 assert.equal(result.status,0,result.stderr.slice(-3000));assert.deepEqual(JSON.parse(result.stdout),{completedPairs:2,evaluations:8,residuals:16,originalData:false});
});
test('original-clock duration rejects renewal and exhaustion',()=>{
 assert.equal(C.remainingDuration('2000000000',1000000000n).remainingNanoseconds,'1000000000');
 for(const now of[2000000000n,2000000001n,-1800000000000n])assert.throws(()=>C.remainingDuration('2000000000',now));
});
test('literal Python duration supports unrelated clock epochs',()=>{
 const prefix=C.PYTHON.split('def identity')[0];
 const body=prefix+"\nassert local_deadline('1000000000',lambda:10)==11\nassert local_deadline('1000000000',lambda:9000000)==9000001\n";
 const r=spawnSync(python,['-I','-B','-c',body],{encoding:'utf8',timeout:2000});assert.equal(r.status,0,r.stderr);
});
test('canonical spec rejects duplicate and trailing records',()=>{
 for(const raw of['{"a":1,"a":2}\n','{}\n{}\n',' {}\n'])assert.throws(()=>C.decodeSpec(Buffer.from(raw)));
 assert.deepEqual(C.decodeSpec(Buffer.from('{"a":1}\n')),{a:1});
});
test('read identity catches byte-identical path replacement',()=>{
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-identity-')));try{
  const p=path.join(dir,'source');writeFileSync(p,'abc');const b=C.readBound(p,hash('abc'));
  writeFileSync(p+'.swap','abc');renameSync(p+'.swap',p);
  assert.throws(()=>C.checkBindings([C.clean(b)],()=>{},{[p]:b.identity}),/identity/);
 }finally{rmSync(dir,{recursive:true});}
});
test('closed spec caps and parent selection reject before target creation',()=>{
 const f=fixture();try{
  const ModuleSource=f.source.replace(/if\(import.meta.url.startsWith\('file:'\)[\s\S]*$/u,'');
  // Pure validator imported from its captured source; no CLI starts.
  return import('data:text/javascript;base64,'+Buffer.from(ModuleSource).toString('base64')).then(M=>{
   M.validateSpec(f.spec,f.selfSha);
   for(const mutate of[
    s=>s.maxAdvances=0,s=>s.maxAdvances=3281,s=>s.maxAdvances=1.5,s=>s.maxAdvances=true,
    s=>s.limits.scientificBytes++,s=>s.limits.wallSeconds++,s=>s.parentRefinements=[{parent_index:2}],s=>s.extra=true,
    s=>s.runtimeBindings.push(s.runtimeBindings[0]),s=>s.output+='/child']){
    const s=structuredClone(f.spec);mutate(s);assert.throws(()=>M.validateSpec(s,f.selfSha));
   }
  }).finally(()=>cleanup(f));
 }catch(e){cleanup(f);throw e;}
});
test('fresh metadata inventory includes existing lazy integer helper without science',()=>{
 const records=runtimeBindings();assert(records.some(b=>b.path.endsWith('/_pylong.py')));
 assert(records.some(b=>b.path===realpathSync(python)));assert(records.some(b=>b.path.endsWith('/pyvenv.cfg')));
});
test('shared competitor guard excludes only own descendants',()=>{
 const own={pid:10,ppid:1,command:'node coordinator'},child={pid:11,ppid:10,command:'run-f6c-streamed-leaf-diagnostic.mjs'};
 C.noCompetitor([own,child],10);
 for(const command of['run-f6c-streamed-leaf-diagnostic.mjs','run-f6c-parent-emission-refinement-pilot.mjs','prepare-f6c-refined-acceleration.py','eom_native_evolution_fixture_cli'])assert.throws(()=>C.noCompetitor([own,{pid:20,ppid:1,command}],10));
});
test('unique inode quota does not double count one hard-linked stream',()=>{
 const dir=mkdtempSync(path.join(os.tmpdir(),'f6c-layout-'));try{
  const d=path.join(dir,'.leaf-stream-private-test');mkdirSync(d);const p=path.join(d,'leaf-evidence.ndjson');writeFileSync(p,'data\n');linkSync(p,path.join(dir,'leaf-evidence.ndjson'));
  const state=C.inspectStreamLayout(dir);assert.equal(state.bytes,5);assert(state.owner);
  writeFileSync(path.join(dir,'extra'),'x');assert.throws(()=>C.inspectStreamLayout(dir));
 }finally{rmSync(dir,{recursive:true});}
});
test('retraction preserves a foreign public replacement and private prefix',()=>{
 const dir=mkdtempSync(path.join(os.tmpdir(),'f6c-retract-'));try{
  const d=path.join(dir,'.leaf-stream-private-test');mkdirSync(d);const p=path.join(d,'leaf-evidence.ndjson'),pub=path.join(dir,'leaf-evidence.ndjson');writeFileSync(p,'data\n');linkSync(p,pub);
  const {owner}=C.inspectStreamLayout(dir);writeFileSync(pub+'.swap','foreign');renameSync(pub+'.swap',pub);
  assert.equal(C.retractStream(owner),false);assert.equal(readFileSync(pub,'utf8'),'foreign');assert.equal(readFileSync(p,'utf8'),'data\n');
 }finally{rmSync(dir,{recursive:true});}
});
test('growing private data is charged before public-link creation',()=>{
 const dir=mkdtempSync(path.join(os.tmpdir(),'f6c-quota-'));try{
  const d=path.join(dir,'.leaf-stream-private-test');mkdirSync(d);const p=path.join(d,'leaf-evidence.ndjson');
  const fd=openSync(p,'wx');try{ftruncateSync(fd,C.FILE+1);}finally{closeSync(fd);}
  assert.throws(()=>C.inspectStreamLayout(dir),/quota/);
 }finally{rmSync(dir,{recursive:true});}
});
test('frozen observer limits and final observation gap remain unchanged',()=>{
 const s=()=>({beganMs:0,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0});
 assert.throws(()=>H.acceptRSS(s(),[{rssBytes:2*1024**3}],1,0));assert.throws(()=>H.acceptRSS(s(),[{rssBytes:1}],1001,1000));
 assert.throws(()=>H.parseHostResource('System-wide memory free percentage: 39%\n',64n*1024n**3n,true));
 assert.throws(()=>H.parseHostResource('System-wide memory free percentage: 20%\n',15n*1024n**3n,false));
});
test('attempt-lifetime diagnostic guard retains asynchronous EPIPE',async()=>{
 const stream=new Writable({write(_c,_e,cb){cb(Error('synthetic EPIPE'));}}),guard=D.diagnosticGuard(stream);let cause;
 guard.bind(e=>cause=e);guard.write('x');await pause(10);assert.match(cause.message,/EPIPE/);await assert.rejects(guard.close(performance.now()),/EPIPE/);
});
test('late final stdout callback cannot accept an expired observation',async()=>{
 let clock=0;const stream=new Writable({write(_c,_e,cb){clock=1001;cb();}});
 await assert.rejects(H.flushCompletion({accepted:true},{began:0,lastSampleStartedMs:0,stream,clock:()=>clock}),/gap/);
});
test('worker expires before reading source and admission requires closed target',()=>{
 assert.throws(()=>C.fileOperation({kind:'recheck',sources:[],deadlineNanoseconds:'1'}),/deadline/);
 for(const proc of[{accepted:true},{accepted:false,processesClosed:false},{accepted:false,processesClosed:true,exit:{code:1,signal:null}}])
  assert.throws(()=>C.fileOperation({kind:'admit',processReceipt:proc,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)}));
});
for(const mode of['normal','exhausted','archives','shared-archives']){
 test('actual captured Python + frozen stream/codec/publication: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);assert.equal(r.code,0,r.err.slice(-2000));const done=JSON.parse(r.out);
   assert.equal(done.accepted,true);assert.equal(done.physicalClaims,false);assert.equal(done.processesClosed,true);assert.equal(done.lockReleased,true);
   const op=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json'))),completion=op.process.admission.completion;
   assert.deepEqual(completion.historicalOwnerArchives,C.archiveRelations(f.spec));
   assert.equal(completion.completedAdvances,mode==='exhausted'?1:2);assert.equal(completion.stopReason,mode==='exhausted'?'no-outstanding-request':'explicit-maximum');
   assert.equal(completion.callCounts.projections,4*completion.completedAdvances);
   assert.equal(readFileSync(f.events,'utf8').trim().split('\n').length,completion.completedAdvances);
   const stream=path.join(f.output,'leaf-evidence.ndjson');assert.equal(C.scanStream(stream,bind(stream).sha256).pairs,completion.completedAdvances);
   assert.equal(C.inspectStreamLayout(f.output).bytes,statSync(stream).size);
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
for(const mode of['missing-runtime','runtime-in-provenance','archive-runtime','late-runtime','cleanup-replacement','module-cleanup','postpublish','trailing','final-cleanup']){
 test('literal Python rejects and preserves only private evidence: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);assert.equal(r.code,1);assert.equal(r.out,'');assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   if(mode==='missing-runtime'||mode==='runtime-in-provenance'||mode==='archive-runtime'||mode==='late-runtime'){
    assert(!existsSync(f.events),'missing runtime stopped before first provide');
    const errors=readFileSync(path.join(f.output+'-outer','process','runner-stderr.log'),'utf8');assert.match(errors,/runtime outside declared inventory/);
   }
   else {assert(existsSync(f.events));assert(existsSync(f.output));}
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
for(const epipe of[false,true]){
 test('active stubborn synthetic target is reaped after '+(epipe?'diagnostic EPIPE':'cancellation'),async()=>{
  const f=fixture('stubborn');try{
   const r=await runFixture(f,{interrupt:!epipe,epipe});assert.equal(r.code,1);assert.equal(r.out,'');
   const pid=Number(readFileSync(f.pidfile,'utf8'));assert(absent(pid),'owned target absent before fixture cleanup');
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
test('poststdout failure is exit1, retracts public stream and invalidates operation',async()=>{
 const f=fixture('poststdout');try{
  const r=await runFixture(f);assert.equal(r.code,1);assert.equal(JSON.parse(r.out).completed,true);
  assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
  const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','terminal-rejection.json')));
  assert.equal(rejection.accepted,false);assert(rejection.invalidates.sha256);
  assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
 }finally{cleanup(f);}
});
for(const mode of ['monitor','private-growth']){
 test('active '+mode+' rejection retains first failure after owned cancellation',async()=>{
  const f=fixture('stubborn');try{
   const expected=mode==='monitor'?'synthetic active monitor failure':'quota';
   if(mode==='monitor')alterFixture(f,s=>s.replace('const table=async()=>{','const table=async()=>{if(existsSync('+JSON.stringify(f.pidfile)+"))throw Error('synthetic active monitor failure');"));
   else{
    const p=f.spec.bindings.diagnostic.path,old=f.spec.bindings.diagnostic.sha256;
    const source=readFileSync(p,'utf8').replace("if MODE=='stubborn':","if MODE=='stubborn':\n   target=next(pathlib.Path("+JSON.stringify(f.output)+").glob('.leaf-stream-private-*/leaf-evidence.ndjson'))\n   with target.open('r+b')as file:file.truncate(67108865)");
    writeFileSync(p,source);f.spec.bindings.diagnostic=bind(p);alterFixture(f,s=>s.replaceAll(old,f.spec.bindings.diagnostic.sha256));
   }
   const r=await runFixture(f);assert.equal(r.code,1);assert.equal(r.out,'');
   assert(existsSync(f.pidfile),r.err.slice(-2000));const pid=Number(readFileSync(f.pidfile,'utf8'));assert(absent(pid));assert(absent(-pid));assert(absent(r.childPid));
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));assert.match(rejection.failure,new RegExp(expected));
  }finally{cleanup(f);}
 });
}
for(const index of [0,1])for(const replacement of [false,true]){
 test('final bound log '+index+' '+(replacement?'identity replacement':'append')+' after stdout rejects',async()=>{
  const f=fixture();try{
   const mutation=replacement?"const raw=readBound(target,undefined,true).data,other=target+'.swap';{const fd=openSync(other,'wx');try{writeSync(fd,raw);fsyncSync(fd);}finally{closeSync(fd);}}renameSync(other,target);":"const fd=openSync(target,'a');try{writeSync(fd,Buffer.from(' '));fsyncSync(fd);}finally{closeSync(fd);}";
   alterFixture(f,s=>s.replace('diagnostics.check();await diagnostics.close(began);','diagnostics.check();await diagnostics.close(began);{const target=result.logs['+index+'].path;'+mutation+'}').replace('import {closeSync,','import {renameSync,closeSync,'));
   const r=await runFixture(f);assert.equal(r.code,1,r.err.slice(-1000));assert(r.out,r.err.slice(-2000));assert.equal(JSON.parse(r.out).completed,true);
   assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
   const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','terminal-rejection.json')));assert.equal(rejection.accepted,false);assert(rejection.invalidates.sha256);
   const published=JSON.parse(r.out).logs[index];
   if(replacement)assert.equal(bind(published.path).sha256,published.sha256,'replacement preserved exact bytes');
   else assert.notEqual(bind(published.path).sha256,published.sha256,'append changed bound bytes');
   assert.match(rejection.failure,replacement?/identity/:/changed source/);
  }finally{cleanup(f);}
 });
}

// Synthetic transport/lifecycle controls plus an explicit genuine stationary
// adapter/driver bridge. No original histories or actual-data numerical work.
// Every whole-process fixture uses the unchanged owned supervisor with a hard
// deadline. Conditional stdout never substitutes for externally observed exit
// and group closure. Unresolved fixture directories are retained.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync,execFile} from 'node:child_process';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {existsSync,mkdtempSync,mkdirSync,readFileSync,realpathSync,rmSync,rmdirSync,statSync,statfsSync,writeFileSync,renameSync,linkSync,openSync,closeSync,ftruncateSync} from 'node:fs';
import os from 'node:os';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {Writable} from 'node:stream';
const C=await import("../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs");
const root=realpathSync(process.cwd()),python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const hash=x=>createHash('sha256').update(x).digest('hex');
const bind=p=>({path:p,sha256:hash(readFileSync(p)),bytes:statSync(p).size});
const load=async p=>import('data:text/javascript;base64,'+readFileSync(path.join(root,p)).toString('base64'));
const Common=await import('../scripts/eom/f6c-bounded-operation.mjs');
const H=await load(C.OPERATIONS.helpers),D=await load(C.OPERATIONS.diagnostics),O=await load(C.OPERATIONS.outer);
const dependencyBytes=(key,rel)=>readFileSync(path.join(root,rel));
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const absent=pid=>{try{process.kill(pid,0);return false;}catch(e){return e.code==='ESRCH';}};

const rejectedExit=r=>assert(r.code!==0||r.signal!==null,'actual nonzero/terminated exit, never successful completion');
const replaceOnce=(source,needle,replacement,label)=>{
 assert.equal(source.split(needle).length,2,label+' exact single source boundary');
 return source.replace(needle,replacement);
};
const conditionalCompletion=done=>{
 assert.equal(done.accepted,false);assert.equal(done.completed,false);
 assert.equal(done.scope,'conditional-operational-completion');assert.equal(done.mode,'streamed-leaf');
 assert.equal(done.ordinaryProcessesClosed,true);assert.equal(Object.hasOwn(done,'processesClosed'),false);
 for(const key of ['workersAndMonitorsClosed','lockReleased','wholeGuardClosed','physicalClaims','wholeHistoryMetrics','rootsEvaluated','eomExecuted'])assert.equal(done[key],false,key);
 assert.deepEqual(done.terminalClosure,{status:'pending-external-exit',requiredExitCode:0,lock:'held',wholeGuard:'armed'});
 assert.equal(done.failure,null);
};


test('fresh source selection checks declared transport without executing an authority',()=>{
 // Deliberately tiny in-memory transport records, not checker-accepted evidence.
 const rows=new Map(),payloads=new Map(),base='/independent-fresh-transport';
 const put=(name,value)=>{const data=Buffer.from(JSON.stringify(value)+'\n'),b={path:base+'/'+name,sha256:hash(data),bytes:data.length};rows.set(b.path,b);payloads.set(b.path,data);return b;};
 const paths={...C.PARENT_EVIDENCE_PATHS,...C.PARENT_CLOSURE_PATHS};
 for(const relative of Object.values(paths)){const b={path:path.join(base,relative),sha256:'b'.repeat(64),bytes:1};rows.set(b.path,b);}
 const authority=rows.get(path.join(base,C.PARENT_CLOSURE_PATHS.instrument));
 const controls=rows.get(path.join(base,C.PARENT_CLOSURE_PATHS.controls));
 const owner=put('current-owner',{synthetic:true}),archive=put('consumed-owner',{synthetic:true});
 const declaration=put('declaration',{synthetic:true}),operation=put('operation',{synthetic:true});
 const invocation=put('invocation',{publicationAliases:[]}),finalCaller=put('final-caller',{synthetic:true});
 const observation=put('observation',{synthetic:true});
 const evidence=put('evidence',{controls,processObservation:observation,sourceIdentities:[],outputIdentities:[]});
 const snapshot=put('snapshot',{instrument:authority,operation,invocation,closure:{evidence,finalCaller},parents:[]});
 const inventory=put('inventory',{schema:'braid-program/accepted-parent-evidence-inventory.v2',
  objects:[{memberName:'owners/'+owner.sha256,role:'acceptanceOwner',parentIndex:null,original:owner,physicalPath:archive.path,identity:{synthetic:true}}],
  parents:[{parentIndex:3}],currentAcceptanceOwner:{binding:owner},family:{},numericalSettings:{declaration}});
 const selection={inventory,closures:[{binding:snapshot,expected_instrument:authority}],expected_authority:[authority],package:null,sourceBindings:[...rows.values()]};
 const spec={root:base,parentRefinements:[],acceptedParentEvidence:[selection],bindings:{readiness:owner},runtimeBindings:[]};
 let reads=0;const read=(p,h)=>{reads++;const data=payloads.get(p);assert(data,'no executable or filesystem read');assert.equal(hash(data),h);return{data,bytes:data.length};};
 const result=C.freshEvidenceInputs(spec,read);assert(reads>0);assert.equal(result.sources.length,rows.size);
 assert.deepEqual(result.executingSources.sort(),['reader','parser','instrument'].map(k=>path.join(base,paths[k])).sort());
 for(const role of ['instrument','controls']){
  for(const change of ['missing','path']){
   const bad=structuredClone(spec),p=path.join(base,paths[role]),list=bad.acceptedParentEvidence[0].sourceBindings,index=list.findIndex(b=>b.path===p);
   if(change==='missing')list.splice(index,1);else if(change==='hash')list[index].sha256='f'.repeat(64);else list[index].path+='.renamed';
   assert.throws(()=>C.freshEvidenceInputs(bad,()=>{throw Error('read before pin rejection');}),new RegExp('fixed fresh '+role));
  }
 }
 for(const changed of [{...authority,path:base+'/unreviewed.py'}]){
  const bad=structuredClone(spec);bad.acceptedParentEvidence[0].expected_authority=[changed];
  assert.throws(()=>C.freshEvidenceInputs(bad,()=>{throw Error('read before authority rejection');}),/externally fixed fresh authority/);
 }
});

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
class EvidencePackage:
 package:SourceBinding
 inventory:SourceBinding
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
@contextlib.contextmanager
def open_adapter(root,**kw):
 source=pathlib.Path(__file__)
 histories=tuple(types.SimpleNamespace(segments=(None,)*1760)for _ in range(8))
 a=types.SimpleNamespace(context={'synthetic':'not-original-data'},provenance=((str(source),hashlib.sha256(source.read_bytes()).hexdigest(),source.stat().st_size),),
 histories=histories,frames=tuple(range(81)),parents=tuple(range(160)),fresh_provenance=(),
 call_counts=dict(projections=0,evaluations=0,residuals=0,root_queries=0,emission_refinements=0),
 geometry_accounting=dict(restriction_calls=0,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))
 extras=[]
 for d in kw['parent_refinements']:
  extras.extend(getattr(d,k)for k in ('plan','manifest','comparison','operation','launcher_log','resource_log'))
 if kw['evidence_package']is not None:
  package=kw['evidence_package'];inventory=__import__('json').loads(pathlib.Path(package.inventory.path).read_bytes())
  replaced={str(root/e['physicalPath'])for p in inventory['parents']for e in (*p['entries'],p['archivedOwner'])}
  extras=[b for b in extras if b.path not in replaced]+[package.package,package.inventory]
  if MODE=='package-runtime':
   import sys
   m=types.ModuleType('_inert_package_member_not_code');m.__file__=next(iter(replaced));sys.modules[m.__name__]=m
 a.provenance=tuple(dict.fromkeys(a.provenance+tuple((b.path,b.sha256,b.bytes)for b in extras)))
 if MODE=='source-count-overflow':
  extra=[]
  for index in range(400):
   p=root/f'extra-source-{index}';p.write_bytes(b'x');extra.append((str(p),hashlib.sha256(b'x').hexdigest(),1))
  a.provenance+=tuple(extra)
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
function fixture(mode='normal',maximum=2,{launchFree=40,runFree=40,launchDisk=64n*1024n**3n,runDisk=64n*1024n**3n}={}){
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-stream-'))),output=path.join(dir,C.LANE,'synthetic');
 const supervisor=path.join(dir,'scripts/dev/owned-compute-supervisor.mjs');mkdirSync(path.dirname(supervisor),{recursive:true});writeFileSync(supervisor,readFileSync(path.join(root,'scripts/dev/owned-compute-supervisor.mjs')));
 mkdirSync(path.dirname(output),{recursive:true});mkdirSync(path.dirname(path.join(dir,C.LOCK)),{recursive:true});
 const entry=path.join(dir,C.SELF),controls=path.join(dir,C.CONTROL);mkdirSync(path.dirname(entry),{recursive:true});mkdirSync(path.dirname(controls),{recursive:true});writeFileSync(controls,'synthetic controls\n');
 const events=path.join(dir,'events'),pidfile=path.join(dir,'target.pid'),paths={};
 const wholeEntry=path.join(dir,C.OPERATIONS.operationCoordinator);let wholeSource;
 for(const[key,rel]of Object.entries({...C.INPUT_PATHS,...C.OPERATIONS})){
  const filename=path.join(dir,rel);mkdirSync(path.dirname(filename),{recursive:true});
  let raw;
  if(key==='adapter')raw='MODE='+JSON.stringify(mode)+'\n'+adapterFake;
  else if(key==='diagnostic')raw='MODE='+JSON.stringify(mode)+'\nEVENTS='+JSON.stringify(events)+'\nPID='+JSON.stringify(pidfile)+'\nEXTRA='+JSON.stringify(path.join(dir,'unbound.py'))+'\n'+driverFake;
  else if(['helpers','outer','diagnostics','transport','codec','storage','stream','operationCoordinator'].includes(key)){raw=dependencyBytes(key,rel);}
  else raw='synthetic metadata only\n';
  if(key==='operationCoordinator'){
   // Only the copied coordinator's host-observation inputs are synthetic.
   // Its canonical file instance, actual worker/process/clock/RSS/lock paths,
   // and the real helper's 40/20%,64/16GiB threshold parser remain intact.
   // An external real-host-admitted watcher is still required for execution.
   wholeSource=raw.toString();
   wholeSource=replaceOnce(wholeSource,"await lifetimeProbe(s,'/usr/bin/memory_pressure',[],2000,1048576,s.phase)",
    `({text:'System-wide memory free percentage: '+(launch?${launchFree}:${runFree})+'%\\n'})`,'synthetic C memory input');
   wholeSource=replaceOnce(wholeSource,'statfsSync(s.root,{bigint:true})',
    `({bavail:launch?${launchDisk}n:${runDisk}n,bsize:1n})`,'synthetic C disk input');
   assert(wholeSource.includes('s.H.parseHostResource(result.text,disk.bavail*disk.bsize,launch)'),'unchanged real threshold admission');
   if(mode==='final-cleanup')wholeSource=replaceOnce(wholeSource,
    'checkMode();captureUnion([...s.sourceMap.values()],s.sourceIdentities,()=>s.live());',
    "throw Error('synthetic final cleanup');",'ordinary cleanup boundary');
   if(mode==='poststdout')wholeSource=replaceOnce(wholeSource,
    "s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');restoreLifetimeStderr(s);terminal();",
    "s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');throw Error('synthetic poststdout failure');",'poststdout boundary');
   if(launchFree<40||runFree<20||launchDisk<64n*1024n**3n||runDisk<16n*1024n**3n){
    wholeSource=replaceOnce(wholeSource,"import {closeSync,constants,","import {writeFileSync,closeSync,constants,",'host failure witness import');
    wholeSource=replaceOnce(wholeSource,"s.H.parseHostResource(result.text,disk.bavail*disk.bsize,launch)","(()=>{try{return s.H.parseHostResource(result.text,disk.bavail*disk.bsize,launch);}catch(e){writeFileSync("+JSON.stringify(path.join(dir,'host-failure.json'))+",JSON.stringify({message:e.message,launch}));throw e;}})()",'unchanged host guard witnessed at rejection');
   }
   raw=wholeSource;
  }
  writeFileSync(filename,raw);paths[key]=rel;
 }
 let source=readFileSync(path.join(root,C.SELF),'utf8')+'\n// Disposable fixture module namespace '+JSON.stringify(dir)+'\n';
 if(mode==='postpublish')source=source.replace("after_close_recheck();publication.verify();publication.close();live()","after_close_recheck();publication.verify();publication.close();live()\n  bad=pathlib.Path(bindings['diagnostic']['path']);replacement=bad.with_suffix('.swap');replacement.write_bytes(bad.read_bytes());replacement.replace(bad)");
 if(mode==='module-cleanup')source=source.replace("finally:require(sys.modules.get(name)is m,'module identity');del sys.modules[name]","finally:\n   require(sys.modules.get(name)is m,'module identity');del sys.modules[name]\n   if b['path'].endswith('f6c_single_leaf_diagnostic.py'):\n    bad=pathlib.Path(b['path']);other=bad.with_suffix('.swap');other.write_bytes(bad.read_bytes());other.replace(bad)");
 if(mode==='trailing')source=source.replace('framing=session.finish();sealed=publication.seal();','framing=session.finish();publication.private_path.open(\'ab\').write(b\'{}\\n\');sealed=publication.seal();');
 writeFileSync(entry,source);
 writeFileSync(path.join(dir,'unbound.py'),'# explicit unbound fixture module\n');
 const bindings={coordinator:bind(entry),controls:bind(controls),...Object.fromEntries(Object.entries(paths).map(([k,p])=>[k,bind(path.join(dir,p))]))};
 const runtimeList=runtimeBindings().map(x=>({...x}));
 if(mode==='source-hardlink'){
  const alias=path.join(dir,'adapter-hardlink');linkSync(bindings.adapter.path,alias);runtimeList.push(bind(alias));
 }
 if(mode==='missing-runtime'||mode==='runtime-in-provenance')runtimeList.splice(runtimeList.findIndex(b=>b.path.endsWith('/_pylong.py')),1);
 const spec={schema:'braid-program/f6c-streamed-leaf-invocation.v6',scope:C.SCOPE,root:dir,output,python,git:'/usr/bin/git',bindings,runtimeBindings:runtimeList,parentRefinements:[],evidencePackage:null,acceptedParentEvidence:[],continuation:null,maxAdvances:maximum,limits:C.LIMITS};
 const specPath=path.join(dir,'invocation.json');writeFileSync(specPath,JSON.stringify(spec)+'\n');
 // check-ignore needs only a portable ignored synthetic checkout, never repo outputs.
 for(const args of [['init','-q',dir],['-C',dir,'config','core.hooksPath','/dev/null']])assert.equal(spawnSync('/usr/bin/git',args,{encoding:'utf8',env:Object.fromEntries(Object.entries(process.env).filter(([n])=>!/^GIT_(DIR|WORK_TREE|INDEX_FILE|PREFIX|COMMON_DIR)$/u.test(n)))}).status,0);
 writeFileSync(path.join(dir,'.gitignore'),'.local-data/\n');
 return{dir,output,entry,wholeEntry,wholeSource,wholeSha:bindings.operationCoordinator.sha256,events,pidfile,spec,specPath,specSha:bind(specPath).sha256,selfSha:bindings.coordinator.sha256,source};
}
function packageFixture(mode='package'){
 // Tiny synthetic transport only; these bytes are not a valid evidence package
 // and the fake adapter is not an independent package-content checker.
 const f=fixture(mode),parents=[],descriptors=[],roles=['plan','manifest','comparison','operation','launcher_log','resource_log','queries','rows','pieces','producer_stdout','producer_stderr','comparison_stdout','comparison_stderr'];
 for(const parentIndex of [1,2]){
  const entries=roles.map(role=>{const physicalPath=`evidence/p${parentIndex}/${role}`,p=path.join(f.dir,physicalPath);mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,`synthetic ${parentIndex} ${role}\n`);const b=bind(p);return{role,physicalPath,logicalBinding:b,sha256:b.sha256,bytes:b.bytes};});
  const physicalPath=`evidence/owner${parentIndex}`,p=path.join(f.dir,physicalPath);writeFileSync(p,`synthetic owner${parentIndex}\n`);const b=bind(p);
  const archivedOwner={role:'acceptanceOwner',physicalPath,logicalBinding:{...b,path:f.spec.bindings.readiness.path},sha256:b.sha256,bytes:b.bytes};
  parents.push({parentIndex,entries,archivedOwner});const prior=Object.fromEntries(entries.slice(0,6).map(e=>[e.role,e.logicalBinding]));
  descriptors.push({parent_index:parentIndex,...prior,closure:{owner:f.spec.bindings.readiness,operation:prior.operation,original_caller_session:'1',final_completion_chunk:'test',exit_code:0,elapsed_seconds:'1',processes_closed:true,independent_audit_accepted:true,authority:'attributed-versioned-acceptance-owner-not-fresh-process-observation'}});
 }
 const inventory={schema:'braid-program/f6c-lossless-packaging-expectations.v1',parents,observedEligibleBytes:parents.flatMap(p=>[...p.entries,p.archivedOwner]).reduce((n,e)=>n+e.bytes,0)};
 const selection={};
 for(const[k,rel]of Object.entries(C.PACKAGE_PATHS)){
  const p=path.join(f.dir,rel);mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,k==='inventory'?JSON.stringify(inventory)+'\n':'# synthetic package metadata\n');selection[k]=bind(p);
 }
 const packagePath=path.join(f.dir,C.LANE,'synthetic-inert-package');writeFileSync(packagePath,'synthetic adapter transport only\n');selection.package=bind(packagePath);
 f.spec.bindings.coordinator=bind(f.entry);f.selfSha=f.spec.bindings.coordinator.sha256;f.spec.parentRefinements=descriptors;f.spec.evidencePackage=selection;
 writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');f.specSha=bind(f.specPath).sha256;return f;
}
function enrollObserved(rows,rootPid,known){
 const ids=new Set([rootPid,...known.keys()]),groups=new Set([...known.values()].map(r=>r.pgid));
 let changed=true;while(changed){changed=false;for(const r of rows)if(ids.has(r.pid)||ids.has(r.ppid)||groups.has(r.pgid)){
  if(!ids.has(r.pid)){ids.add(r.pid);changed=true;}groups.add(r.pgid);
  const previous=known.get(r.pid);assert(!previous||previous.started===r.started,'observed PID birth changed');known.set(r.pid,r);
 }}
}
// Known graph and reparented-group controls precede any host observation.
{
 const known=new Map();enrollObserved([{pid:10,ppid:1,pgid:10,started:'a'},{pid:11,ppid:10,pgid:11,started:'b'},{pid:12,ppid:11,pgid:11,started:'c'},{pid:99,ppid:1,pgid:99,started:'z'}],10,known);
 assert.deepEqual([...known.keys()],[10,11,12]);enrollObserved([{pid:13,ppid:1,pgid:11,started:'d'}],10,known);assert(known.has(13));
 assert.throws(()=>enrollObserved([{pid:11,ppid:1,pgid:11,started:'reused'}],10,known),/birth/);
}
const observeTable=()=>new Promise((resolve,reject)=>execFile('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,comm='],{encoding:'utf8',timeout:1000,maxBuffer:8*1024**2,env:{...process.env,LC_ALL:'C'}},(error,raw)=>{
 if(error){reject(error);return;}try{resolve(raw.trim().split('\n').map(line=>{const m=/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.{24})\s+(\S+)\s+(.+)$/u.exec(line);assert(m,'complete external process row');return{pid:Number(m[1]),ppid:Number(m[2]),pgid:Number(m[3]),started:m[4].replace(/\s+/gu,' '),command:m[6]};}));}catch(e){reject(e);}
}));

async function resumeOriginalStoppedGates(f,observed,controls={spawnSync,realpathSync,absent,pause,writeFileSync,signal:(pid,value)=>process.kill(pid,value)}){
 const {spawnSync,realpathSync,absent,pause,writeFileSync,signal}=controls;
 const ids=[...observed.keys()];if(!ids.length)return;
 const read=()=>{const r=spawnSync('/bin/ps',['-ww','-p',ids.join(','),'-o','pid=,ppid=,pgid=,lstart=,stat=,command='],{encoding:'utf8',maxBuffer:32*1024**2,timeout:2000});assert([0,1].includes(r.status));return r.stdout.trim();};
 const parse=raw=>raw?raw.split('\n').map(line=>{const m=/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(.{24})\s+(\S+)\s+(.+)$/u.exec(line);assert(m,'complete retained cleanup row');return{pid:+m[1],ppid:+m[2],pgid:+m[3],started:m[4].replace(/\s+/gu,' '),state:m[5],command:m[6]};}):[];
 assert.deepEqual(parse('10 1 10 Mon Sep 14 02:15:58 2026 T node x')[0],{pid:10,ppid:1,pgid:10,started:'Mon Sep 14 02:15:58 2026',state:'T',command:'node x'});
 const raw=read(),rows=parse(raw);if(!rows.length)return;
 for(const row of rows){const original=observed.get(row.pid);assert(original&&original.started===row.started&&original.pgid===row.pgid,'original cleanup birth and group');}
 const gates=rows.filter(row=>row.pid===row.pgid&&row.state.includes('T')&&row.command.includes(' -e '));
 assert(gates.length,'remaining processes lack an original stopped gate');
 for(const gate of gates){
  const marker=gate.command.indexOf(' -e '),encoded=gate.command.slice(gate.command.lastIndexOf(' ')+1),code=gate.command.slice(marker+4,gate.command.lastIndexOf(' '));
  assert.equal(realpathSync(gate.command.slice(0,marker)),realpathSync(process.execPath));
  assert.equal(code,O.SUBFIELD_CIRCULAR_GATE_SOURCE.replace(/\n/gu,' '),'exact admitted gate code');
  const payload=JSON.parse(Buffer.from(encoded,'base64').toString());
  assert.deepEqual(Object.keys(payload).sort(),['args','command','cwd','gateSha256','port','registrationLimitMs','secret']);
  assert(Number.isSafeInteger(payload.port)&&payload.port>0&&payload.port<=65535);assert(typeof payload.secret==='string'&&payload.secret.length>0);assert(Number.isSafeInteger(payload.registrationLimitMs)&&payload.registrationLimitMs>0&&payload.registrationLimitMs<=10000);
  assert.equal(payload.gateSha256,hash(O.SUBFIELD_CIRCULAR_GATE_SOURCE));assert.equal(payload.command,python);assert.equal(payload.cwd,f.dir);
  assert.equal(payload.args.length,9);assert(payload.args.every(x=>typeof x==='string'));assert.deepEqual(payload.args.slice(0,6),['-I','-B','-c',C.PYTHON,f.specPath,f.specSha]);assert(payload.args.slice(6,8).every(x=>/^\d+$/u.test(x)));assert.equal(payload.args[8],hash(C.PYTHON));
  assert(rows.some(row=>row.ppid===gate.pid&&row.pgid===gate.pgid),'original enrolled gate descendant');
 }
 assert.equal(read(),raw,'full original rows unchanged before gate resumption');
 for(const gate of gates)signal(gate.pid,'SIGCONT');
 for(let n=0;n<100&&ids.some(pid=>!absent(pid));n++)await pause(50);
 assert(ids.every(pid=>absent(pid)),'original descendants absent after gate control-loss cleanup');
 writeFileSync(path.join(f.dir,'failed-fixture-closure.json'),JSON.stringify({resumedGates:gates.map(({pid,pgid,started})=>({pid,pgid,started})),allOriginallyObservedAbsent:true,originalFailurePreserved:true})+'\n');
}


test('failed fixture cleanup authenticates original stopped gate before existing control-loss resumption',async()=>{
 const f={dir:'/known-fixture',specPath:'/known-fixture/invocation.json',specSha:'a'.repeat(64)},born='Mon Sep 14 02:15:58 2026';
 const payload={port:1234,secret:'known',registrationLimitMs:1000,gateSha256:hash(O.SUBFIELD_CIRCULAR_GATE_SOURCE),command:python,cwd:f.dir,args:['-I','-B','-c',C.PYTHON,f.specPath,f.specSha,'10000','1000',hash(C.PYTHON)]};
 const command=process.execPath+' -e '+O.SUBFIELD_CIRCULAR_GATE_SOURCE.replace(/\n/gu,' ')+' '+Buffer.from(JSON.stringify(payload)).toString('base64');
 const raw='10 1 10 '+born+' T '+command+'\n11 10 10 '+born+' T '+python+' '+f.specPath+'\n';
 const known=new Map([[10,{pid:10,pgid:10,started:born}],[11,{pid:11,pgid:10,started:born}]]);
 for(const bad of[false,'birth','payload','code','literal-whitespace','extra-key','replacement']){
  let signaled=false,calls=0,receipt;
  const source=bad==='payload'?raw.replace(Buffer.from(JSON.stringify(payload)).toString('base64'),Buffer.from(JSON.stringify({...payload,cwd:'/foreign'})).toString('base64')):bad==='code'?raw.replace('const cp=','const xx='):bad==='literal-whitespace'?raw.replace("'node:child_process'","'node:child_process '"):bad==='extra-key'?raw.replace(Buffer.from(JSON.stringify(payload)).toString('base64'),Buffer.from(JSON.stringify({...payload,extra:true})).toString('base64')):raw;
  const controls={spawnSync:()=>({status:0,stdout:++calls>1&&bad==='replacement'?source.replace(' T ',' S '):source}),realpathSync:x=>x,absent:()=>signaled,pause:async()=>{},writeFileSync:(_p,x)=>{receipt=JSON.parse(x);},signal:(pid,value)=>{assert.equal(pid,10);assert.equal(value,'SIGCONT');signaled=true;}};
  const selected=new Map(known);if(bad==='birth')selected.set(10,{...known.get(10),started:'changed'});
  if(bad){await assert.rejects(resumeOriginalStoppedGates(f,selected,controls));assert.equal(signaled,false);}
  else{await resumeOriginalStoppedGates(f,selected,controls);assert.equal(signaled,true);assert.equal(receipt.originalFailurePreserved,true);}
 }
});

async function runFixture(f,{interrupt=false,epipe=false}={}){
 try{
 if(epipe){
  const closed=path.join(f.dir,'stderr-closed'),observed=path.join(f.dir,'epipe-observed.json');
  alterWholeFixture(f,source=>{
   source=replaceOnce(source,'import {closeSync,constants,','import {writeFileSync,closeSync,constants,','EPIPE witness import');
   return replaceOnce(source,'installLifetimeStderr(s);s.diagnostics=',
    'installLifetimeStderr(s);{const trigger=setInterval(()=>{if(existsSync('+JSON.stringify(closed)+')){clearInterval(trigger);process.stderr.write("synthetic EPIPE control\\n",error=>writeFileSync('+JSON.stringify(observed)+',JSON.stringify({code:error?.code??null})));}},10);trigger.unref();}s.diagnostics=',
    'one diagnostic write after externally witnessed pipe closure');
  });
 }

 // The test harness allows startup/teardown margin under full-suite load.
 // Production control/work/K deadlines (120/90/75 seconds), 1-second
 // observation bound, resource limits, and 1-second termination grace remain unchanged.
 // A separate owner bounds the complete coordinator process group.
 // The adapter and registered guards retain their own stronger obligations.
 const {runOwned}=await import(pathToFileURL(path.join(f.dir,'scripts/dev/owned-compute-supervisor.mjs')));
 const hostText=await new Promise((resolve,reject)=>execFile('/usr/bin/memory_pressure',[],{encoding:'utf8',timeout:2000,maxBuffer:1024**2},(e,out)=>e?reject(e):resolve(out)));
 const disk=statfsSync(f.dir,{bigint:true});H.parseHostResource(hostText,disk.bavail*disk.bsize,true);
 const wrapper=path.join(f.dir,'fixture-envelope.mjs'),pidPath=path.join(f.dir,'coordinator.pid');
 const args=[f.wholeEntry,'--streamed','--spec',f.specPath,'--spec-sha256',f.specSha,'--caller-sha256',f.selfSha,'--self-sha256',f.wholeSha];
 writeFileSync(wrapper,`import {spawn} from 'node:child_process';import {writeFileSync,existsSync} from 'node:fs';
 const child=spawn(process.execPath,${JSON.stringify(args)},{stdio:['ignore','pipe','pipe']});
 writeFileSync(${JSON.stringify(pidPath)},String(child.pid));
 child.stdout.pipe(process.stdout);child.stderr.pipe(process.stderr);
 child.on('close',(code,signal)=>{process.exitCode=code??1;});
 ${interrupt||epipe?`const timer=setInterval(()=>{if(existsSync(${JSON.stringify(f.pidfile)})){clearInterval(timer);${epipe?"child.stderr.destroy();writeFileSync("+JSON.stringify(path.join(f.dir,'stderr-closed'))+",'closed');":"child.kill('SIGTERM');"}}else if(child.exitCode!==null)clearInterval(timer);},10);`:''}
 `);
 f.started=true;
 const observed=new Map();let observing=true,observationFailure;
 const observer=(async()=>{try{while(observing){if(existsSync(pidPath))enrollObserved(await observeTable(),Number(readFileSync(pidPath,'utf8')),observed);await pause(50);}}catch(e){observationFailure=e;}})();
 let lease,ownerFailure;try{lease=await runOwned(['--owner-task',process.env.CODEX_SESSION_ID??'streamed-fixture','--deadline-seconds','30','--termination-grace-seconds','1','--heartbeat-seconds','5','--',process.execPath,wrapper]);}catch(error){ownerFailure=error;}finally{observing=false;await observer;}
 if(ownerFailure){try{assert(absent(Number(readFileSync(pidPath,'utf8'))),'coordinator control owner absent before resuming original gate');await resumeOriginalStoppedGates(f,observed);}catch(cleanupError){writeFileSync(path.join(f.dir,'failed-fixture-cleanup-error.txt'),String(cleanupError.stack));console.error('FAILED FIXTURE CLEANUP '+f.dir+' '+cleanupError.stack);}throw ownerFailure;}
 if(observationFailure)throw observationFailure;
 const out=readFileSync(lease.stdoutPath,'utf8'),err=readFileSync(lease.stderrPath,'utf8');
 assert.equal(lease.processGroupClosed,true,'external owner must observe group closure');
 const childPid=Number(readFileSync(pidPath,'utf8'));
 assert(absent(childPid),'coordinator absent before cleanup');
 if(existsSync(f.pidfile)){
  const target=Number(readFileSync(f.pidfile,'utf8'));
  for(let n=0;n<500&&(!absent(target)||!absent(-target));n++)await pause(10);
  assert(absent(target)&&absent(-target),'registered target and group closed before cleanup');
 }
 for(let n=0;n<100&&[...observed.values()].some(r=>!absent(r.pid)||!absent(-r.pgid));n++)await pause(50);
 assert(observed.size>0,'external ownership observer actually saw coordinator');
 for(const row of observed.values())assert(absent(row.pid)&&absent(-row.pgid),'observed process/group remains: '+row.pid);
 writeFileSync(path.join(f.dir,'external-closure.json'),JSON.stringify({processGroupClosed:lease.processGroupClosed,status:lease.status,exitCode:lease.exitCode,exitSignal:lease.exitSignal,observed:[...observed.values()],allObservedAbsent:true,mathematicalAcceptance:false})+'\n');
 f.closed=true;
 if(process.env.AAA_RETAIN_FIXTURES==='1')console.error('retained fixture '+f.dir);
 return{code:lease.exitCode,signal:lease.exitSignal,out,err,childPid,lease};
 }catch(error){f.failure=error;throw error;}
}
function cleanup(f){assert(!f.started||f.closed,'unresolved fixture retained for investigation: '+f.dir+'; original failure: '+(f.failure?.stack??'not recorded'));if(process.env.AAA_RETAIN_FIXTURES!=='1')rmSync(f.dir,{recursive:true,force:true});}
function alterFixture(f,change){
 const before=readFileSync(f.entry,'utf8'),after=change(before);assert.notEqual(after,before,'specific bounded injection applied');
 writeFileSync(f.entry,after);f.spec.bindings.coordinator=bind(f.entry);writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');
 f.source=after;f.selfSha=f.spec.bindings.coordinator.sha256;f.specSha=bind(f.specPath).sha256;
}
function alterWholeFixture(f,change){
 const before=readFileSync(f.wholeEntry,'utf8'),after=change(before),old=f.wholeSha;
 assert.notEqual(after,before,'specific shared-coordinator injection applied');
 writeFileSync(f.wholeEntry,after);f.wholeSource=after;f.spec.bindings.operationCoordinator=bind(f.wholeEntry);
 f.wholeSha=f.spec.bindings.operationCoordinator.sha256;

 writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');f.specSha=bind(f.specPath).sha256;
}

test('current runtime dependencies exist and bootstrap stays bounded',()=>{
 for(const[k,p]of Object.entries(C.INPUT_PATHS))assert(existsSync(path.join(root,p)));
 assert(C.PYTHON.length<65536);
});
test('genuine two-refined-parent provider connects to frozen stream and codec',()=>{
 const script=String.raw`import hashlib,json,pathlib,sys,types
root=pathlib.Path(sys.argv[1]);paths=json.loads(sys.argv[2])
sys.path.insert(0,str(root/'tests'))
def load(name,role):
 p=root/paths[role];raw=p.read_bytes()
 m=types.ModuleType(name);m.__file__=str(p);sys.modules[name]=m;exec(compile(raw,str(p),'exec'),m.__dict__)
 return m
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
 const result=spawnSync(python,['-I','-B','-c',script,root,JSON.stringify(C.INPUT_PATHS)],{cwd:root,encoding:'utf8',timeout:30000,maxBuffer:1024**2});
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
  const ModuleSource=f.source;
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
test('complete input union includes combined runtime, metadata and invocation bounds',()=>{
 const b=(i,bytes=1)=>({path:'/private/tmp/union-'+i,sha256:'a'.repeat(64),bytes});
 const records=Array.from({length:512},(_,i)=>b(i));assert.equal(C.boundedSourceUnion(records).length,512);
 assert.equal(C.boundedSourceUnion([...records,records[0]]).length,512);
 assert.throws(()=>C.boundedSourceUnion([...records,b('invocation')]),/complete physical/);
 assert.equal(C.boundedSourceUnion([b(0,1024**3)]).length,1);
 assert.throws(()=>C.boundedSourceUnion([b(0,1024**3),b('runtime')]),/complete physical/);
 assert.throws(()=>C.boundedSourceUnion([b(0),{...b(0),sha256:'b'.repeat(64)}]),/conflicting/);
});
test('publication retains original inode through callbacks and preserves foreign replacements',()=>{
 for(const afterWrite of [false,true]){
  const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-publication-identity-')));
  try{
   const file=path.join(dir,'receipt.json'),retained=path.join(dir,'retained-original'),value={accepted:false},raw=JSON.stringify(value)+'\n';let changed=false;
   assert.throws(()=>C.writeNew(file,value,()=>{
    if(!changed&&existsSync(file)&&(!afterWrite||statSync(file).size===Buffer.byteLength(raw))){changed=true;renameSync(file,retained);writeFileSync(file,raw);}
   }),/original publication/);
   assert(changed);assert.equal(readFileSync(file,'utf8'),raw);assert(existsSync(retained));
  }finally{rmSync(dir,{recursive:true});}
 }
});
test('publication identity option preserves default three-field transport and original five-field identity',()=>{
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-publication-return-')));
 try{
  const value={accepted:false},raw=JSON.stringify(value)+'\n';
  for(const option of [undefined,false,true]){
   const file=path.join(dir,String(option)+'.json'),b=C.writeNew(file,value,()=>{},option);
   const expected={path:file,sha256:hash(raw),bytes:Buffer.byteLength(raw)};
   if(option===true){
    const s=statSync(file,{bigint:true});assert.deepEqual(b,{...expected,identity:[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':')});
    assert.deepEqual(C.clean(b),expected);
    const original=path.join(dir,'retained-original');renameSync(file,original);writeFileSync(file,raw);
    assert.throws(()=>C.checkBindings([C.clean(b)],()=>{},{[file]:b.identity}),/identity/);
    assert.equal(readFileSync(file,'utf8'),raw);assert.equal(readFileSync(original,'utf8'),raw);
   }else assert.deepEqual(b,expected);
  }
 }finally{rmSync(dir,{recursive:true});}
});
test('publication identity option rejects non-Booleans before opening an output',()=>{
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-publication-option-')));
 try{
  for(const [index,option]of [null,0,1,'true',{},new Boolean(true)].entries()){
   const file=path.join(dir,index+'.json');let callbacks=0;
   assert.throws(()=>C.writeNew(file,{accepted:false},()=>{callbacks++;},option),/exact publication identity option/);
   assert.equal(callbacks,0);assert(!existsSync(file));
  }
 }finally{rmSync(dir,{recursive:true});}
});
test('publication file-worker returns original identity without promoting the operation',()=>{
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-publication-ipc-')));
 try{
  const file=path.join(dir,'operation.json'),record={accepted:false,scope:'conditional-operational-completion'};
  const result=C.fileOperation({kind:'publish',filename:file,record,sources:[],sourceIdentities:{},deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)});
  assert.deepEqual(Object.keys(result).sort(),['bytes','identity','path','sha256']);
  assert.equal(result.identity,C.readBound(file).identity);assert.equal(JSON.parse(readFileSync(file)).accepted,false);
 }finally{rmSync(dir,{recursive:true});}
});
test('competitor coverage includes coordinated F5, F6c packaging and EOM measurement tools',()=>{
 const commands=['run-f5-ordinary-evolution.mjs','run-f6c-evidence-packaging.mjs','f6c-bounded-operation.mjs','eom_f5_enclosed_root_cli','eom_borg_shadow_cli','eom_recursive_block_benchmark_cli','attractor-ensemble-harness'];
 for(const command of commands){
  assert.throws(()=>C.noCompetitor([{pid:2,ppid:1,command}],10),/competing/);
  C.noCompetitor([{pid:11,ppid:10,command}],10);
 }
});
test('every late publication callback preserves original identity and foreign evidence',()=>{
 for(const ordinal of [2,3,4,5,6]){
  const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-publication-callback-')));
  try{
   const file=path.join(dir,'receipt.json'),original=path.join(dir,'original'),raw='{"accepted":false}\n';let calls=0,replaced=false;
   assert.throws(()=>C.writeNew(file,{accepted:false},()=>{
    if(++calls===ordinal){renameSync(file,original);writeFileSync(file,raw);replaced=true;}
   }),/original publication|changed source/);
   assert(replaced,'specified callback reached');assert.equal(readFileSync(file,'utf8'),raw);assert(existsSync(original));
  }finally{rmSync(dir,{recursive:true});}
 }
});
test('package selection preserves logical descriptors and removes only admitted physical inputs',async()=>{
 const f=packageFixture();try{
  const M=await import('data:text/javascript;base64,'+Buffer.from(f.source).toString('base64'));
  const original=JSON.stringify(f.spec.parentRefinements),sources=M.validateSpec(f.spec,f.selfSha),routes=M.packageInputs(f.spec).routes;
  assert.equal(routes.size,28);assert.equal(JSON.stringify(f.spec.parentRefinements),original);
  for(const p of routes.keys())assert(!sources.some(b=>b.path===p),'loose payload not recaptured');
  for(const b of Object.values(f.spec.evidencePackage))assert(sources.some(s=>s.path===b.path&&s.sha256===b.sha256));
  assert(sources.some(b=>b.path===f.spec.bindings.readiness.path));
  for(const mutate of[
   s=>delete s.evidencePackage,s=>s.evidencePackage=[],s=>s.evidencePackage.extra=true,
   s=>s.evidencePackage.package.bytes=C.FILE+1,s=>s.evidencePackage.package.path=s.bindings.adapter.path,
   s=>s.evidencePackage.reader.path+='.renamed',s=>s.evidencePackage.readerControls.path+='.renamed',
   s=>s.evidencePackage.inventory.sha256='a'.repeat(64),s=>s.evidencePackage.inventory.bytes++,
   s=>s.parentRefinements[0].plan.sha256='a'.repeat(64),s=>s.parentRefinements[0].manifest.bytes++]){
   const spec=structuredClone(f.spec);mutate(spec);assert.throws(()=>M.validateSpec(spec,f.selfSha));
  }
 }finally{cleanup(f);}
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
test('final layout preserves original directory names and identities, not only public bytes',()=>{
 for(const mode of['valid-rename','invalid-rename','output-rename','private-replacement','private-file-rename','extra-link','foreign-public']){
  const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-final-layout-')));try{
   const out=path.join(dir,'output'),priv=path.join(out,'.leaf-stream-private-original');mkdirSync(priv,{recursive:true});
   const p=path.join(priv,'leaf-evidence.ndjson'),pub=path.join(out,'leaf-evidence.ndjson');writeFileSync(p,'data\n');linkSync(p,pub);
   const original=C.inspectStreamLayout(out),b=C.readBound(pub),identities={[pub]:b.identity};
   C.checkFinalStreamLayout(out,original.layout);let kept=p;
   if(mode==='valid-rename'||mode==='invalid-rename'||mode==='foreign-public'){
    const moved=path.join(out,mode==='invalid-rename'?'invalid-private-name':'.leaf-stream-private-renamed');renameSync(priv,moved);kept=path.join(moved,'leaf-evidence.ndjson');
   }else if(mode==='output-rename'){
    const moved=out+'.original';renameSync(out,moved);mkdirSync(out);renameSync(path.join(moved,'.leaf-stream-private-original'),priv);renameSync(path.join(moved,'leaf-evidence.ndjson'),pub);rmdirSync(moved);
   }else if(mode==='private-replacement'){
    const moved=priv+'.original';renameSync(priv,moved);mkdirSync(priv);renameSync(path.join(moved,'leaf-evidence.ndjson'),p);rmdirSync(moved);
   }else if(mode==='private-file-rename'){kept=p+'.renamed';renameSync(p,kept);}
   else if(mode==='extra-link')linkSync(p,path.join(dir,'extra-alias'));
   if(mode==='foreign-public'){writeFileSync(pub+'.swap','foreign\n');renameSync(pub+'.swap',pub);}
   if(mode==='valid-rename'||mode==='invalid-rename')C.checkBindings([{path:pub,sha256:b.sha256,bytes:b.bytes}],()=>{},identities);
   assert.throws(()=>C.checkFinalStreamLayout(out,original.layout),/layout|census|inode|alias/);
   assert.equal(C.retractStream(original.owner),mode!=='foreign-public');
   assert.equal(readFileSync(kept,'utf8'),'data\n');
   if(mode==='foreign-public')assert.equal(readFileSync(pub,'utf8'),'foreign\n');else assert(!existsSync(pub));
  }finally{rmSync(dir,{recursive:true});}
 }
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
test('synthetic host inputs reach unchanged real threshold admission',async()=>{
 const f=fixture('normal',1,{launchFree:40,runFree:20,runDisk:16n*1024n**3n});try{
  const r=await runFixture(f);assert.equal(r.code,0,r.err.slice(-1500));
  const completion=JSON.parse(r.out);conditionalCompletion(completion);const operation=JSON.parse(readFileSync(completion.operation.path));
  const hosts=operation.hostObservationsBeforePublication;assert(hosts.some(x=>x.atLaunch&&x.freePercent===40&&x.availableDiskBytes===String(64n*1024n**3n)));
  assert(hosts.some(x=>!x.atLaunch&&x.freePercent===20&&x.availableDiskBytes===String(16n*1024n**3n)));
  assert(existsSync(f.events));assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
 }finally{cleanup(f);}
});
for(const [name,inputs,started] of[
 ['launch-memory',{launchFree:39},false],['running-memory',{runFree:19},true],
 ['launch-disk',{launchDisk:64n*1024n**3n-1n},false],['running-disk',{runDisk:16n*1024n**3n-1n},true]]){
 test('synthetic low '+name+' is rejected by unchanged host guard',async()=>{
  const f=fixture('normal',1,inputs);try{
   const r=await runFixture(f);assert.equal(r.code,1);assert.equal(r.out,'');assert.match(JSON.parse(readFileSync(path.join(f.dir,'host-failure.json'))).message,/host memory\/disk resource stop/);
   assert.equal(existsSync(f.events),started,'launch failure precedes provide; later failure follows target');
   assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
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
  assert.throws(()=>C.fileOperation({kind:'admit',processReceipt:proc,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)}),/closed registered target/);
});
for(const mode of['normal','exhausted']){
 test('actual captured Python + frozen stream/codec/publication: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);assert.equal(r.code,0,r.err.slice(-2000));const done=JSON.parse(r.out);
   conditionalCompletion(done); // Only the observed exit0 and actual absent lock finish the conditional wire.
   const op=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json'))),completion=op.process.admission.completion;
   assert.equal(op.schema,'braid-program/f6c-streamed-leaf-operation.v2');assert.equal(op.accepted,false);assert.equal(op.scope,'conditional-operational-completion');
   assert.equal(completion.completedAdvances,mode==='exhausted'?1:2);assert.equal(completion.stopReason,mode==='exhausted'?'no-outstanding-request':'explicit-maximum');
   assert.equal(completion.callCounts.projections,4*completion.completedAdvances);
   assert.equal(readFileSync(f.events,'utf8').trim().split('\n').length,completion.completedAdvances);
   const stream=path.join(f.output,'leaf-evidence.ndjson');assert.equal(C.scanStream(stream,bind(stream).sha256).pairs,completion.completedAdvances);
   assert.equal(C.inspectStreamLayout(f.output).bytes,statSync(stream).size);
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
for(const mode of ['package','package-runtime']){
 test('synthetic package transport keeps source/runtime distinction: '+mode,async()=>{
  const f=packageFixture(mode);try{
   const result=await runFixture(f);
   assert.equal(result.code,mode==='package'?0:1,result.err.slice(-2000));
   if(mode==='package'){
    conditionalCompletion(JSON.parse(result.out));
    const operation=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json')));
    const completion=operation.process.admission.completion;
    const routes=JSON.parse(readFileSync(f.spec.evidencePackage.inventory.path)).parents.flatMap(p=>[...p.entries,p.archivedOwner]).map(e=>path.join(f.dir,e.physicalPath));
    assert(completion.historicalSourceBindings.some(b=>b.path===f.spec.evidencePackage.package.path));
    assert(!completion.historicalSourceBindings.some(b=>routes.includes(b.path)));
   }else assert(readFileSync(path.join(f.output+'-outer','process/runner-stderr.log'),'utf8').includes('runtime outside declared inventory'));
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(result.childPid));
  }finally{cleanup(f);}
 });
}
for(const mode of['missing-runtime','runtime-in-provenance','late-runtime','source-count-overflow','source-hardlink','cleanup-replacement','module-cleanup','postpublish','trailing','final-cleanup']){
 test('literal Python rejects and preserves only private evidence: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);
   if(mode==='postpublish'){
    // Source replacement rejects publication. Ordinary certified cleanup may
    // release the lock; deadline fallback must retain unresolved ownership.
    rejectedExit(r);assert.equal(r.lease.processGroupClosed,true);
    const errors=readFileSync(path.join(f.output+'-outer','process','runner-stderr.log'),'utf8');
    assert.match(errors,/original postcleanup source replaced/);
    if(r.code===1){
     const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));
     assert.equal(rejection.ordinaryProcessesClosed,true);
     assert.equal(rejection.cleanupFailure,null);
     assert(!existsSync(path.join(f.dir,C.LOCK)),'certified failed cleanup releases its lock');
    }else{
     assert.equal(r.lease.status,'timed_out');
     assert(existsSync(path.join(f.dir,C.LOCK)),'uncertified cleanup retains its lock');
    }
   }else assert.equal(r.code,1);
   assert.equal(r.out,'');assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   if(mode==='missing-runtime'||mode==='runtime-in-provenance'||mode==='late-runtime'){
    assert(!existsSync(f.events),'missing runtime stopped before first provide');
    const errors=readFileSync(path.join(f.output+'-outer','process','runner-stderr.log'),'utf8');assert.match(errors,/runtime outside declared inventory/);
   }
   else if(mode==='source-count-overflow'){
    assert(!existsSync(f.events));const errors=readFileSync(path.join(f.output+'-outer','process','runner-stderr.log'),'utf8');assert.match(errors,/complete physical source union bounds|physical source hardlink alias/);
   }
   else if(mode==='source-hardlink'){
    assert(!existsSync(f.events),'combined C capture rejects the declared alias before a provider');
    assert(!existsSync(path.join(f.output+'-outer','process')),'shared pre-provider union rejects before registered launch');
    const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));assert.match(rejection.failure,/physical source hardlink alias/);
   }
   else {assert(existsSync(f.events));assert(existsSync(f.output));}
   if(mode!=='postpublish')assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
for(const epipe of[false,true]){
 test('active stubborn synthetic target is reaped after '+(epipe?'diagnostic EPIPE':'cancellation'),async()=>{
  const f=fixture('stubborn');try{
   const r=await runFixture(f,{interrupt:!epipe,epipe});rejectedExit(r);assert.equal(r.out,'');
   if(epipe)assert.equal(JSON.parse(readFileSync(path.join(f.dir,'epipe-observed.json'))).code,'EPIPE','actual post-close diagnostic write failed with EPIPE');
   const pid=Number(readFileSync(f.pidfile,'utf8'));assert(absent(pid),'owned target absent before fixture cleanup');
   assert.equal(existsSync(path.join(f.dir,C.LOCK)),epipe,'failed diagnostic closure retains the exact lock');assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
test('poststdout failure is exit1, retracts public stream and invalidates operation',async()=>{
 const f=fixture('poststdout');try{
  const r=await runFixture(f);assert.equal(r.code,1);conditionalCompletion(JSON.parse(r.out));
  assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
  const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));
  assert.equal(rejection.accepted,false);assert(rejection.invalidates.sha256);
  assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
 }finally{cleanup(f);}
});
for(const stage of ['cleanup','prestdout','poststdout'])for(const validName of [false,true]){
 test('original private directory rename rejects at '+stage+' with '+(validName?'valid':'invalid')+' new name',async()=>{
  const f=fixture();try{
   const mutation=`renameSync(path.dirname(s.streamOwner.privatePath),path.join(path.dirname(s.streamOwner.publicPath),${JSON.stringify(validName?'.leaf-stream-private-renamed':'invalid-private-name')}));`;
   alterWholeFixture(f,s=>{
    s=replaceOnce(s,'import {closeSync,constants,','import {renameSync,closeSync,constants,','synthetic rename import');
    const anchor=stage==='cleanup'?'checkMode();captureUnion([...s.sourceMap.values()],s.sourceIdentities,()=>s.live());':stage==='prestdout'?'terminal();\n    const result=':"s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');restoreLifetimeStderr(s);terminal();";
    return replaceOnce(s,anchor,stage==='poststdout'?anchor.replace('terminal();',mutation+'terminal();'):mutation+anchor,'specific shared final boundary');
   });
   const r=await runFixture(f);rejectedExit(r);
   if(stage==='poststdout')conditionalCompletion(JSON.parse(r.out));else assert.equal(r.out,'');
   // The repaired original-layout rule forbids unlink after a directory rename.
   // Both aliases and the unresolved lock are evidence, not cleanup authority.
   assert(existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   const kept=path.join(f.output,validName?'.leaf-stream-private-renamed':'invalid-private-name','leaf-evidence.ndjson');assert(statSync(kept).size>0);
   assert(!existsSync(path.join(f.output+'-outer','rejection.json')),'invalid layout cannot authorize another publication');
   assert(existsSync(path.join(f.dir,C.LOCK)),'unresolved original layout retains lock');assert(absent(r.childPid));
   const operation=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json')));assert.equal(operation.process.processesClosed,true);
   for(const gate of operation.process.gates){assert(Number.isInteger(gate.target.pid));assert(absent(gate.target.pid));}
  }finally{cleanup(f);}
 });
}
for(const mode of ['monitor','private-growth']){
 test('active '+mode+' rejection retains first failure after owned cancellation',async()=>{
  const f=fixture('stubborn');try{
   const expected=mode==='monitor'?'synthetic active monitor failure':'quota';
   if(mode==='monitor')alterWholeFixture(f,s=>replaceOnce(s,'async function lifetimeTable(s,phase=s.phase,context=null){',
    'async function lifetimeTable(s,phase=s.phase,context=null){if(phase===\'work\'&&existsSync('+JSON.stringify(f.pidfile)+"))throw Error('synthetic active monitor failure');",'active ordinary observer failure'));
   else{
    const p=f.spec.bindings.diagnostic.path;
    const source=readFileSync(p,'utf8').replace("if MODE=='stubborn':","if MODE=='stubborn':\n   target=next(pathlib.Path("+JSON.stringify(f.output)+").glob('.leaf-stream-private-*/leaf-evidence.ndjson'))\n   with target.open('r+b')as file:file.truncate(67108865)");
    assert.notEqual(source,readFileSync(p,'utf8'),'specific private-growth injection applied');
    writeFileSync(p,source);f.spec.bindings.diagnostic=bind(p);

    writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');f.specSha=bind(f.specPath).sha256;
   }
   const r=await runFixture(f);rejectedExit(r);assert.equal(r.out,'');
   assert(existsSync(f.pidfile),r.err.slice(-2000));const pid=Number(readFileSync(f.pidfile,'utf8'));assert(absent(pid));assert(absent(-pid));assert(absent(r.childPid));
   assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   if(mode==='private-growth'){
    assert(existsSync(path.join(f.dir,C.LOCK)),'over-quota layout retains original lock');
    assert.throws(()=>C.inspectStreamLayout(f.output),/quota/);
    assert(!existsSync(path.join(f.output+'-outer','rejection.json')),'over-quota layout cannot authorize another publication');
   }else{assert(!existsSync(path.join(f.dir,C.LOCK)));const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));assert.match(rejection.failure,new RegExp(expected));}
  }finally{cleanup(f);}
 });
}
for(const index of [0,1])for(const replacement of [false,true]){
 test('final bound log '+index+' '+(replacement?'identity replacement':'append')+' after stdout rejects',async()=>{
  const f=fixture();try{
   const mutation=replacement?"const raw=readBound(target,undefined,true).data,other=target+'.swap';{const fd=openSync(other,'wx');try{writeSync(fd,raw);fsyncSync(fd);}finally{closeSync(fd);}}renameSync(other,target);":"const fd=openSync(target,'a');try{writeSync(fd,Buffer.from(' '));fsyncSync(fd);}finally{closeSync(fd);}";
   alterWholeFixture(f,s=>{
    s=replaceOnce(s,'import {closeSync,constants,','import {renameSync,closeSync,constants,','synthetic log rename import');
    const anchor="s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');restoreLifetimeStderr(s);terminal();";
    return replaceOnce(s,anchor,anchor.replace('terminal();','{const target='+(index===0?'s.logPath':'s.rssPath')+';'+mutation+'}terminal();'),'poststdout log mutation');
   });
   const r=await runFixture(f);rejectedExit(r);assert(r.out,r.err.slice(-2000));conditionalCompletion(JSON.parse(r.out));
   assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));assert.equal(existsSync(path.join(f.dir,C.LOCK)),replacement,'replaced output identity blocks census and exact lock release');assert(absent(r.childPid));
   const expectedPath=path.join(f.output+'-outer',index===0?'launcher-stderr.log':'resource-observations.ndjson');
   const published=JSON.parse(r.out).outputBindings.find(b=>b.path===expectedPath);assert(published,'exact previously bound operational log');
   if(replacement)assert.equal(bind(published.path).sha256,published.sha256,'replacement preserved exact bytes');
   else assert.notEqual(bind(published.path).sha256,published.sha256,'append changed bound bytes');
   if(replacement)assert(!existsSync(path.join(f.output+'-outer','rejection.json')),'replaced output forbids new failure publication');
   else{
    const rejection=JSON.parse(readFileSync(path.join(f.output+'-outer','rejection.json')));assert.equal(rejection.accepted,false);assert(rejection.invalidates.sha256);
    assert.match(rejection.failure,/source changed|changed source|hash mismatch/);
   }
  }finally{cleanup(f);}
 });
}

// Synthetic transport/lifecycle controls plus an explicit genuine stationary
// adapter/driver bridge. No original histories or actual-data numerical work.
// SOURCE-ONLY MIGRATION: whole-process fixtures are NOT RUN READY. A separately
// reviewed bounded external ending/closure envelope is still required for the
// negative cases whose original lock and whole guard intentionally remain held.
// Keep every case: this fail-closed guard is neither test.skip nor a passing run.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn,spawnSync} from 'node:child_process';
import {once} from 'node:events';
import {createHash} from 'node:crypto';
import {existsSync,mkdtempSync,mkdirSync,readFileSync,realpathSync,rmSync,rmdirSync,statSync,writeFileSync,renameSync,linkSync,openSync,closeSync,ftruncateSync} from 'node:fs';
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
const WHOLE_PROCESS_FIXTURES_READY=false;
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

test('fresh closure authority is the separately accepted pure checker generation',()=>{
 const prefix='.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/';
 assert.deepEqual(C.FRESH_CLOSURE_PINS,{
  instrument:[prefix+'independent_parent_batch_closure.py','3eefbb8767a0337024066f8949770fbf47f39edc308aaf598372cf95b3dba223'],
  controls:[prefix+'independent_parent_batch_closure_controls.py','f45ccfb0ff9609fe267f25c1ba2521ec58134f9caf7d128b09e0adfde9e6a979'],
  contract:[prefix+'fresh-parent-batch-closure-validator-expectations.md','7132bcf6db99bef0b2255418f656e3fb5900eb23fac9d1400d294d5ba8fd2eed'],
 });
});

test('fresh source selection checks pinned transport without executing an authority',()=>{
 // Deliberately tiny in-memory transport records, not checker-accepted evidence.
 const rows=new Map(),payloads=new Map(),base='/independent-fresh-transport';
 const put=(name,value)=>{const data=Buffer.from(JSON.stringify(value)+'\n'),b={path:base+'/'+name,sha256:hash(data),bytes:data.length};rows.set(b.path,b);payloads.set(b.path,data);return b;};
 const pins={...C.FRESH_EVIDENCE_PINS,...C.FRESH_CLOSURE_PINS};
 for(const [relative,sha256]of Object.values(pins)){const b={path:path.join(base,relative),sha256,bytes:1};rows.set(b.path,b);}
 const authority=rows.get(path.join(base,C.FRESH_CLOSURE_PINS.instrument[0]));
 const controls=rows.get(path.join(base,C.FRESH_CLOSURE_PINS.controls[0]));
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
 const result=C.freshEvidenceInputs(spec,read);assert(reads>0);assert.equal(result.sources.length,rows.size);assert.deepEqual(result.archives,[{role:'acceptanceOwner',original:owner,archive}]);
 assert.deepEqual(result.executingSources.sort(),['reader','parser','instrument'].map(k=>path.join(base,pins[k][0])).sort());
 for(const role of ['instrument','controls','contract']){
  for(const change of ['missing','hash','path']){
   const bad=structuredClone(spec),p=path.join(base,pins[role][0]),list=bad.acceptedParentEvidence[0].sourceBindings,index=list.findIndex(b=>b.path===p);
   if(change==='missing')list.splice(index,1);else if(change==='hash')list[index].sha256='f'.repeat(64);else list[index].path+='.renamed';
   assert.throws(()=>C.freshEvidenceInputs(bad,()=>{throw Error('read before pin rejection');}),new RegExp('fixed fresh '+role));
  }
 }
 for(const changed of [{...authority,sha256:'a'.repeat(64)},{...authority,path:base+'/unreviewed.py'}]){
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
 histories=histories,frames=tuple(range(81)),parents=tuple(range(160)),fresh_provenance=(),
 historical_owner_archives=tuple(dict.fromkeys(r for d in kw['parent_refinements']for r in d.archived_sources)),
 call_counts=dict(projections=0,evaluations=0,residuals=0,root_queries=0,emission_refinements=0),
 geometry_accounting=dict(restriction_calls=0,completed_restrictions=0,history_state_evaluations=0,restricted_projections=0))
 extras=[]
 for d in kw['parent_refinements']:
  extras.extend(getattr(d,k)for k in ('plan','manifest','comparison','operation','launcher_log','resource_log'))
  extras.extend(r.archive for r in d.archived_sources)
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
function fixture(mode='normal',maximum=2,{launchFree=40,runFree=40,launchDisk=64n*1024n**3n,runDisk=64n*1024n**3n}={}){
 const dir=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-stream-'))),output=path.join(dir,C.LANE,'synthetic');
 mkdirSync(path.dirname(output),{recursive:true});mkdirSync(path.dirname(path.join(dir,C.LOCK)),{recursive:true});
 const entry=path.join(dir,C.SELF),controls=path.join(dir,C.CONTROL);mkdirSync(path.dirname(entry),{recursive:true});mkdirSync(path.dirname(controls),{recursive:true});writeFileSync(controls,'synthetic controls\n');
 const events=path.join(dir,'events'),pidfile=path.join(dir,'target.pid'),pins={};
 const wholeEntry=path.join(dir,C.PINS.operationCoordinator[0]);let wholeSource;
 for(const[key,[rel,digest]]of Object.entries(C.PINS)){
  const filename=path.join(dir,rel);mkdirSync(path.dirname(filename),{recursive:true});
  let raw;
  if(key==='adapter')raw='MODE='+JSON.stringify(mode)+'\n'+adapterFake;
  else if(key==='diagnostic')raw='MODE='+JSON.stringify(mode)+'\nEVENTS='+JSON.stringify(events)+'\nPID='+JSON.stringify(pidfile)+'\nEXTRA='+JSON.stringify(path.join(dir,'unbound.py'))+'\n'+driverFake;
  else if(['helpers','outer','diagnostics','transport','codec','storage','stream','operationCoordinator'].includes(key)){raw=readFileSync(path.join(root,rel));assert.equal(hash(raw),digest);}
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
    "s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');terminal();",
    "s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');throw Error('synthetic poststdout failure');",'poststdout boundary');
   raw=wholeSource;
  }
  writeFileSync(filename,raw);pins[key]=[rel,hash(raw)];
 }
 let source=readFileSync(path.join(root,C.SELF),'utf8').replace(/export const PINS=Object.freeze\([\s\S]*?\n\);/u,'export const PINS=Object.freeze('+JSON.stringify(pins)+');');
 // Formatting is intentionally robust to a one-line closing brace.
 if(source.includes(C.PINS.adapter[1]))source=source.replace(/export const PINS=Object.freeze\([\s\S]*?\n\}\);/u,'export const PINS=Object.freeze('+JSON.stringify(pins)+');');
 assert(!source.includes(C.PINS.adapter[1]),'fixture source pins replaced');
 if(mode==='postpublish')source=source.replace("after_close_recheck();publication.verify();publication.close();live()","after_close_recheck();publication.verify();publication.close();live()\n  bad=pathlib.Path(bindings['diagnostic']['path']);replacement=bad.with_suffix('.swap');replacement.write_bytes(bad.read_bytes());replacement.replace(bad)");
 if(mode==='module-cleanup')source=source.replace("finally:require(sys.modules.get(name)is m,'module identity');del sys.modules[name]","finally:\n   require(sys.modules.get(name)is m,'module identity');del sys.modules[name]\n   if b['path'].endswith('f6c_single_leaf_diagnostic.py'):\n    bad=pathlib.Path(b['path']);other=bad.with_suffix('.swap');other.write_bytes(bad.read_bytes());other.replace(bad)");
 if(mode==='trailing')source=source.replace('framing=session.finish();sealed=publication.seal();','framing=session.finish();publication.private_path.open(\'ab\').write(b\'{}\\n\');sealed=publication.seal();');
 writeFileSync(entry,source);
 writeFileSync(path.join(dir,'unbound.py'),'# explicit unbound fixture module\n');
 const bindings={coordinator:bind(entry),controls:bind(controls),...Object.fromEntries(Object.entries(pins).map(([k,[p]])=>[k,bind(path.join(dir,p))]))};
 const runtimeList=runtimeBindings().map(x=>({...x}));
 if(mode==='source-hardlink'){
  const alias=path.join(dir,'adapter-hardlink');linkSync(bindings.adapter.path,alias);runtimeList.push(bind(alias));
 }
 if(mode==='missing-runtime'||mode==='runtime-in-provenance')runtimeList.splice(runtimeList.findIndex(b=>b.path.endsWith('/_pylong.py')),1);
 const spec={schema:'braid-program/f6c-streamed-leaf-invocation.v4',scope:C.SCOPE,root:dir,output,python,git:'/usr/bin/git',bindings,runtimeBindings:runtimeList,parentRefinements:[],evidencePackage:null,acceptedParentEvidence:[],continuation:null,maxAdvances:maximum,limits:C.LIMITS};
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
  descriptors.push({parent_index:parentIndex,...prior,closure:{owner:f.spec.bindings.readiness,operation:prior.operation,original_caller_session:'1',final_completion_chunk:'test',exit_code:0,elapsed_seconds:'1',processes_closed:true,independent_audit_accepted:true,authority:'attributed-versioned-acceptance-owner-not-fresh-process-observation'},archived_sources:[{role:'acceptanceOwner',original:archivedOwner.logicalBinding,archive:b}]});
 }
 const inventory={schema:'braid-program/f6c-lossless-packaging-expectations.v1',parents,observedEligibleBytes:parents.flatMap(p=>[...p.entries,p.archivedOwner]).reduce((n,e)=>n+e.bytes,0)};
 const pins={},selection={};
 for(const[k,[rel]]of Object.entries(C.PACKAGE_PINS)){
  const p=path.join(f.dir,rel);mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,k==='inventory'?JSON.stringify(inventory)+'\n':'# synthetic package metadata\n');selection[k]=bind(p);pins[k]=[rel,selection[k].sha256];
 }
 const packagePath=path.join(f.dir,C.LANE,'synthetic-inert-package');writeFileSync(packagePath,'synthetic adapter transport only\n');selection.package=bind(packagePath);
 f.source=f.source.replace(/export const PACKAGE_PINS=Object.freeze\([\s\S]*?\n\}\);/u,'export const PACKAGE_PINS=Object.freeze('+JSON.stringify(pins)+');');
 assert(!f.source.includes(C.PACKAGE_PINS.inventory[1]),'synthetic independent inventory pins');writeFileSync(f.entry,f.source);
 f.spec.bindings.coordinator=bind(f.entry);f.selfSha=f.spec.bindings.coordinator.sha256;f.spec.parentRefinements=descriptors;f.spec.evidencePackage=selection;
 writeFileSync(f.specPath,JSON.stringify(f.spec)+'\n');f.specSha=bind(f.specPath).sha256;return f;
}
async function runFixture(f,{interrupt=false,epipe=false}={}){
 assert.equal(WHOLE_PROCESS_FIXTURES_READY,true,'NOT RUN READY: independent bounded negative-ending and complete external closure envelope required');
 const child=spawn(process.execPath,[f.wholeEntry,'--streamed','--spec',f.specPath,'--spec-sha256',f.specSha,'--caller-sha256',f.selfSha,'--self-sha256',f.wholeSha],{cwd:f.dir,stdio:['ignore','pipe','pipe']});
 let out='',err='';child.stdout.on('data',b=>{out+=b;assert(out.length<2*1024**2,'bounded completion');});
 if(!epipe)child.stderr.on('data',b=>{err+=b;if(err.length>4*1024**2)err=err.slice(-(1024**2));});
 // The removed old20s parent-only kill was not descendant/guard closure.
 // Do not enable this fixture until the root-owned external ending is reviewed.
 const close=once(child,'close');
 if(interrupt||epipe){
  for(let n=0;n<1000&&!existsSync(f.pidfile)&&child.exitCode===null;n++)await pause(10);
  assert(existsSync(f.pidfile),'owned target actually started: '+err.slice(-500));
  if(epipe)child.stderr.destroy();else child.kill('SIGTERM');
 }
 const[code,signal]=await close;
 return{code,signal,out,err,childPid:child.pid};
}
function cleanup(f){rmSync(f.dir,{recursive:true,force:true});}
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
 alterFixture(f,source=>replaceOnce(source,old,f.wholeSha,'exact copied C source pin'));
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
   s=>s.evidencePackage.reader.sha256='a'.repeat(64),s=>s.evidencePackage.readerControls.sha256='a'.repeat(64),
   s=>s.evidencePackage.inventory.sha256='a'.repeat(64),s=>s.evidencePackage.inventory.bytes++,
   s=>s.parentRefinements[0].plan.sha256='a'.repeat(64),s=>s.parentRefinements[0].manifest.bytes++,
   s=>s.parentRefinements[1].archived_sources[0].archive.sha256='a'.repeat(64)]){
   const spec=structuredClone(f.spec);mutate(spec);assert.throws(()=>M.validateSpec(spec,f.selfSha));
  }
 }finally{cleanup(f);}
});
test('parent-two historical wrapper routes require the exact original plan and six literal tuples',async()=>{
 const expected={
  producer:['scripts/eom/prepare-f6c-parent-emission-refinement.py','ff488499f2737860034602ce9559c3ebc817aa8413b827007fb31027815679d2',58397],
  producerControls:['tests/test_f6c_parent_emission_refinement_preparation.py','517cc307251611177ec19cc5d71938a4086806f48583bcf8e3f2d04e9afb8d9f',43836],
  verifier:['scripts/eom/verify-f6c-parent-emission-refinement.py','53595cc12589ab56c73a1613922bba2739704cbc78465e3d646d5ae6a43813db',46615],
  verifierControls:['tests/test_f6c_parent_emission_refinement_verification.py','889d8721d2b51520c0fef78f6a954f9b510cbb46fdf9019205199dfa3658b5a9',42419],
  operationalEntry:['scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs','462247cf723339dbdc9ce9b4b897720cd4edcedc9b85c22b70694c41663f5c1b',56022],
  operationalControls:['tests/f6c-parent-emission-refinement-pilot.test.js','dd88eae5729d8ecc5947a27966edb215074d12687f3b5cd0bfc3be69d0400bc1',33303]
 };
 assert.deepEqual(C.PARENT_TWO_ARCHIVE_SOURCES,expected);
 const f=fixture();try{
  const M=await import('data:text/javascript;base64,'+Buffer.from(f.source).toString('base64'));
  const b=(name,h='a'.repeat(64),bytes=1)=>({path:path.join(f.dir,'declared',name),sha256:h,bytes});
  const d={parent_index:2};for(const role of ['plan','manifest','comparison','operation','launcher_log','resource_log'])d[role]=b(role);
  d.plan={path:path.join(f.dir,'reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-2-emission-refinement-launch.v2.json'),sha256:'928dbe46bd133ad7bfc26b21e34368afabedcbf09b310066393d3b58588f7b0e',bytes:51509};
  d.closure={owner:f.spec.bindings.readiness,operation:d.operation,original_caller_session:'12345',final_completion_chunk:'abc123',exit_code:0,elapsed_seconds:'3.125',processes_closed:true,independent_audit_accepted:true,authority:'attributed-versioned-acceptance-owner-not-fresh-process-observation'};
  d.archived_sources=Object.entries(expected).map(([role,[p,h,n]])=>({role,original:{path:path.join(f.dir,p),sha256:h,bytes:n},archive:b('parent2-'+role,h,n)}));
  const spec={...structuredClone(f.spec),parentRefinements:[d]},before=JSON.stringify(spec);
  const observed=M.validateSpec(spec,f.selfSha);assert.equal(JSON.stringify(spec),before);
  for(const r of d.archived_sources){assert(observed.some(b=>b.path===r.archive.path));assert(!observed.some(b=>b.path===r.original.path));}
  for(const mutate of [s=>s.parentRefinements[0].parent_index=1,s=>s.parentRefinements[0].parent_index=3,s=>s.parentRefinements[0].plan.path+='.other',s=>s.parentRefinements[0].plan.sha256='b'.repeat(64),s=>s.parentRefinements[0].plan.bytes++,s=>s.parentRefinements[0].archived_sources[0].original.sha256=C.ARCHIVE_SOURCES.producer[1],s=>s.parentRefinements[0].archived_sources[0].archive.path=s.bindings.adapter.path]){
   const bad=structuredClone(spec);mutate(bad);assert.throws(()=>M.validateSpec(bad,f.selfSha));
  }
 }finally{cleanup(f);}
});
test('generic descriptors preserve exact archives, derived inventory and invocation-bound readiness',async()=>{
 const f=fixture();try{
  const M=await import('data:text/javascript;base64,'+Buffer.from(f.source).toString('base64'));
  const b=(name,h='a'.repeat(64),bytes=1)=>({path:path.join(f.dir,'declared',name),sha256:h,bytes});
  const make=index=>{
   const d={parent_index:index};for(const role of ['plan','manifest','comparison','operation','launcher_log','resource_log'])d[role]=b(index+'-'+role);
   d.closure={owner:f.spec.bindings.readiness,operation:d.operation,original_caller_session:'12345',final_completion_chunk:'abc123',exit_code:0,elapsed_seconds:'3.125',processes_closed:true,independent_audit_accepted:true,authority:'attributed-versioned-acceptance-owner-not-fresh-process-observation'};
   d.archived_sources=[];return d;
  };
  const first=make(1),second=make(2),last=make(159);
  const oldOwner=(h,archive)=>({role:'acceptanceOwner',original:{path:f.spec.bindings.readiness.path,sha256:h,bytes:17},archive:b(archive,h,17)});
  first.archived_sources=[oldOwner('7'.repeat(64),'owner-seven')];second.archived_sources=[oldOwner('2'.repeat(64),'owner-two')];
  for(const[role,[p,h,n]]of Object.entries(C.ARCHIVE_SOURCES)){
   const r={role,original:{path:path.join(f.dir,p),sha256:h,bytes:n},archive:b('archive-'+role,h,n)};
   first.archived_sources.push(r);second.archived_sources.push(structuredClone(r));
  }
  const spec=structuredClone(f.spec);spec.parentRefinements=[first,second,last];
  const observed=M.validateSpec(spec,f.selfSha),relations=M.archiveRelations(spec);
  assert.equal(relations.length,8);assert.equal(observed.length,Object.keys(spec.bindings).length+spec.runtimeBindings.length+18+8);
  assert.deepEqual(relations,[...first.archived_sources,second.archived_sources[0]]);
  for(const r of relations){assert(observed.some(b=>b.path===r.archive.path));if(r.role!=='acceptanceOwner')assert(!observed.some(b=>b.path===r.original.path));}
  const before=JSON.stringify(spec);M.validateSpec(spec,f.selfSha);assert.equal(JSON.stringify(spec),before);
  for(const elapsed of ['0.0001','+1800','18e2','1e-999']){const s=structuredClone(spec);s.parentRefinements[1].closure.elapsed_seconds=elapsed;M.validateSpec(s,f.selfSha);}
  for(const index of [0,-1,160,true,1.5,'2',null]){const s=structuredClone(spec);s.parentRefinements[1].parent_index=index;assert.throws(()=>M.validateSpec(s,f.selfSha));}
  const mutations=[
   s=>s.parentRefinements.reverse(),s=>s.parentRefinements.splice(1,0,structuredClone(s.parentRefinements[0])),
   s=>s.parentRefinements[0].archived_sources.push(s.parentRefinements[0].archived_sources[0]),
   s=>s.parentRefinements[0].archived_sources[0].role='runtime',
   s=>s.parentRefinements[0].archived_sources[1].original.sha256='e'.repeat(64),
   s=>s.parentRefinements[0].archived_sources[1].original.bytes++,
   s=>s.parentRefinements[0].archived_sources[1].archive.path=s.bindings.adapter.path,
   s=>s.parentRefinements[0].archived_sources[1].archive.path=s.runtimeBindings[0].path,
   s=>s.parentRefinements[0].archived_sources[1].archive.path=s.parentRefinements[2].plan.path,
   s=>s.parentRefinements[1].archived_sources[1].archive.path+='-conflict',
   s=>s.parentRefinements[1].archived_sources[0].archive.path=s.parentRefinements[0].archived_sources[0].archive.path,
   s=>s.parentRefinements[1].closure.owner.sha256='e'.repeat(64),
   s=>s.parentRefinements[1].closure.operation={...s.parentRefinements[1].closure.operation,sha256:'e'.repeat(64)},
   s=>s.parentRefinements[1].closure.processes_closed=1,
   s=>s.parentRefinements[1].closure.independent_audit_accepted=false,
   s=>s.parentRefinements[1].closure.exit_code=false,
   s=>s.parentRefinements[1].closure.original_caller_session=12345,
   s=>s.parentRefinements[1].closure.final_completion_chunk='x\n',
  ];
  for(const[index,mutate]of mutations.entries()){const s=structuredClone(spec);mutate(s);assert.throws(()=>M.validateSpec(s,f.selfSha),undefined,'mutation '+index);}
  for(const elapsed of ['0','-1','1800.00000000000000000000000000001','NaN','Infinity','0x1','1e1001','1e-1001',3.125]){
   const s=structuredClone(spec);s.parentRefinements[1].closure.elapsed_seconds=elapsed;assert.throws(()=>M.validateSpec(s,f.selfSha));
  }
  const reordered=structuredClone(spec);const old=reordered.parentRefinements[1].archived_sources[1].archive;
  reordered.parentRefinements[1].archived_sources[1].archive={bytes:old.bytes,sha256:old.sha256,path:old.path};
  assert.deepEqual(M.archiveRelations(reordered),relations);M.validateSpec(reordered,f.selfSha);
  const changed=structuredClone(f.spec);changed.bindings.readiness={...changed.bindings.readiness,sha256:'d'.repeat(64),bytes:999};M.validateSpec(changed,f.selfSha);
  changed.bindings.adapter.sha256='d'.repeat(64);assert.throws(()=>M.validateSpec(changed,f.selfSha));
  assert(!existsSync(f.output));assert(!existsSync(f.events));
 }finally{cleanup(f);}
});
test('fresh metadata inventory includes existing lazy integer helper without science',()=>{
 const records=runtimeBindings();assert(records.some(b=>b.path.endsWith('/_pylong.py')));
 assert(records.some(b=>b.path===realpathSync(python)));assert(records.some(b=>b.path.endsWith('/pyvenv.cfg')));
});
test('two explicit nonexecuting ancestry documents retain exact historical tuples',async()=>{
 const f=fixture('archives');try{
  const M=await import('data:text/javascript;base64,'+Buffer.from(f.source).toString('base64'));
  const spec=structuredClone(f.spec),d=spec.parentRefinements[0];
  for(const[role,[p,h,n]]of Object.entries(C.ANCESTRY_ARCHIVE_SOURCES)){
   d.archived_sources.push({role,original:{path:path.join(f.dir,p),sha256:h,bytes:n},archive:{path:path.join(f.dir,'document-'+role),sha256:h,bytes:n}});
  }
  const sources=M.validateSpec(spec,f.selfSha);
  assert.equal(M.archiveRelations(spec).length,3);
  for(const r of d.archived_sources.slice(1))assert(sources.some(b=>b.path===r.archive.path));
  for(const mutate of[
   s=>s.parentRefinements[0].archived_sources[1].role='mathematicalReference',
   s=>s.parentRefinements[0].archived_sources[1].original.sha256='a'.repeat(64),
   s=>s.parentRefinements[0].archived_sources[1].original.bytes++,
   s=>s.parentRefinements[0].archived_sources[1].archive.path=s.bindings.adapter.path,
   s=>s.parentRefinements[0].archived_sources[1].archive.path=s.parentRefinements[0].archived_sources[1].original.path,
   s=>s.parentRefinements[0].archived_sources[2].archive.path=s.parentRefinements[0].archived_sources[1].archive.path,
   s=>s.parentRefinements[0].archived_sources.push(s.parentRefinements[0].archived_sources[1]),
  ]){const bad=structuredClone(spec);mutate(bad);assert.throws(()=>M.validateSpec(bad,f.selfSha));}
 }finally{cleanup(f);}
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
   const r=await runFixture(f);assert.equal(r.code,1);assert.equal(r.out,'');assert.match(r.err,/host memory\/disk resource stop/);
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
  assert.throws(()=>C.fileOperation({kind:'admit',processReceipt:proc,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)}));
});
for(const mode of['normal','exhausted','archives','shared-archives']){
 test('actual captured Python + frozen stream/codec/publication: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);assert.equal(r.code,0,r.err.slice(-2000));const done=JSON.parse(r.out);
   conditionalCompletion(done); // Only the observed exit0 and actual absent lock finish the conditional wire.
   const op=JSON.parse(readFileSync(path.join(f.output+'-outer','operation.json'))),completion=op.process.admission.completion;
   assert.equal(op.schema,'braid-program/f6c-streamed-leaf-operation.v2');assert.equal(op.accepted,false);assert.equal(op.scope,'conditional-operational-completion');
   assert.deepEqual(completion.historicalOwnerArchives,C.archiveRelations(f.spec));
   assert.equal(completion.completedAdvances,mode==='exhausted'?1:2);assert.equal(completion.stopReason,mode==='exhausted'?'no-outstanding-request':'explicit-maximum');
   assert.equal(completion.callCounts.projections,4*completion.completedAdvances);
   assert.equal(readFileSync(f.events,'utf8').trim().split('\n').length,completion.completedAdvances);
   const stream=path.join(f.output,'leaf-evidence.ndjson');assert.equal(C.scanStream(stream,bind(stream).sha256).pairs,completion.completedAdvances);
   if(mode==='shared-archives'){
    const decode=String.raw`import hashlib,json,pathlib,sys,types
p=pathlib.Path(sys.argv[1]);raw=p.read_bytes();assert hashlib.sha256(raw).hexdigest()==sys.argv[2]
m=types.ModuleType('exact_frozen_header_decoder');exec(compile(raw,str(p),'exec'),m.__dict__)
d=m.StreamDecoder()
with pathlib.Path(sys.argv[3]).open('rb')as source:
 first=d.feed(next(source))
 for line in source:d.feed(line)
d.finish();h=first['header'];print(json.dumps(dict(spec=h['spec'],archives=h['sourceBindings']['historicalOwnerArchives'],accepted=h['accepted'])))
`;
    const result=spawnSync(python,['-I','-B','-c',decode,path.join(root,C.PINS.codec[0]),C.PINS.codec[1],stream],{encoding:'utf8',timeout:3000,maxBuffer:1024**2});
    assert.equal(result.status,0,result.stderr);const header=JSON.parse(result.stdout);
    assert.deepEqual(header.spec,{binding:bind(f.specPath),maxAdvances:f.spec.maxAdvances,parentRefinements:f.spec.parentRefinements,evidencePackage:f.spec.evidencePackage,acceptedParentEvidence:f.spec.acceptedParentEvidence});
    assert.deepEqual(header.archives,C.archiveRelations(f.spec));assert.equal(header.archives.length,1);assert.equal(header.accepted,false);
   }
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
    assert.deepEqual(completion.historicalOwnerArchives,C.archiveRelations(f.spec));
   }else assert(readFileSync(path.join(f.output+'-outer','process/runner-stderr.log'),'utf8').includes('runtime outside declared inventory'));
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(result.childPid));
  }finally{cleanup(f);}
 });
}
for(const mode of['missing-runtime','runtime-in-provenance','archive-runtime','late-runtime','source-count-overflow','source-hardlink','cleanup-replacement','module-cleanup','postpublish','trailing','final-cleanup']){
 test('literal Python rejects and preserves only private evidence: '+mode,async()=>{
  const f=fixture(mode);try{
   const r=await runFixture(f);assert.equal(r.code,1);assert.equal(r.out,'');assert(!existsSync(path.join(f.output,'leaf-evidence.ndjson')));
   if(mode==='missing-runtime'||mode==='runtime-in-provenance'||mode==='archive-runtime'||mode==='late-runtime'){
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
   assert(!existsSync(path.join(f.dir,C.LOCK)));assert(absent(r.childPid));
  }finally{cleanup(f);}
 });
}
for(const epipe of[false,true]){
 test('active stubborn synthetic target is reaped after '+(epipe?'diagnostic EPIPE':'cancellation'),async()=>{
  const f=fixture('stubborn');try{
   const r=await runFixture(f,{interrupt:!epipe,epipe});rejectedExit(r);assert.equal(r.out,'');
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
    const anchor=stage==='cleanup'?'checkMode();captureUnion([...s.sourceMap.values()],s.sourceIdentities,()=>s.live());':stage==='prestdout'?'terminal();\n    const result=':"s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');terminal();";
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
   alterWholeFixture(f,s=>{
    s=replaceOnce(s,'import {closeSync,constants,','import {renameSync,closeSync,constants,','synthetic log rename import');
    const anchor="s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');terminal();";
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

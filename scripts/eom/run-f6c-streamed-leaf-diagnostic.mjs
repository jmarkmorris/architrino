// Source-bound streamed evidence connection; no numerical method or new solver.
// CLI: node scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs --spec ABS --spec-sha256 SHA --self-sha256 SHA
// The separately reviewed canonical JSON spec fixes every source/runtime byte
// BEFORE admission. This file is also the captured registered entry and file
// worker. Only the --registered branch can spawn its one Python target.
import {spawn,execFile} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,openSync,
  readSync,readdirSync,realpathSync,statfsSync,writeSync,unlinkSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const SELF='scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
export const CONTROL='tests/f6c-streamed-leaf-diagnostic.test.js';
export const LANE='.local-data/braid-analysis/f6c-streamed-leaf-diagnostic-20260827';
export const LOCK='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock';
export const SCOPE='source-bound-streamed-leaf-diagnostic';
export const LIMIT=1800000,FILE=64*1024**2,LOG=16*1024**2;
export const PYTHON_RUNTIME_INVENTORY=String.raw`import __future__,argparse,contextlib,dataclasses,decimal,fractions,hashlib,itertools,json,math,os,pathlib,re,resource,signal,stat,subprocess,sys,tempfile,time,types,weakref
from collections.abc import Mapping
from typing import Any
argparse.ArgumentParser(add_help=False)
(10**20000+1)//(10**15000+3)
paths={pathlib.Path(sys.executable).resolve()}
for module in tuple(sys.modules.values()):
 for key in ('__file__','__cached__'):
  value=getattr(module,key,None)
  if type(value)is str:
   p=pathlib.Path(value).resolve()
   if p.is_file():paths.add(p)
print(json.dumps(sorted(map(str,paths))))
`;
export const CLOCK_POLICY='supplementary-Python-duration-guard; original-Node-deadline-authoritative';
export function remainingDuration(deadline,now=process.hrtime.bigint()){
  check(typeof deadline==='string'&&/^[0-9]{1,20}$/u.test(deadline)&&typeof now==='bigint','bounded Node deadline');
  const remaining=BigInt(deadline)-now;check(remaining>0n&&remaining<=1800000000000n,'positive original remaining duration');
  return {originalNodeDeadlineNanoseconds:deadline,entryBudgetStampNanoseconds:String(now),remainingNanoseconds:String(remaining),policy:CLOCK_POLICY};
}
export const FALSE_FLAGS='accepted source_bytes_authenticated frame_identity_authenticated premise_truth_authenticated historical_trajectory_identity_established root_coverage_established gauss_kronrod_completed subdivision_allowance_verified three_rung_agreement_established execution_authorized eom_executed metrics_available score_authorized h3_evidence_eligible physical_claim_established'.split(' ');
export const PINS=Object.freeze({
 "adapter": [
  "scripts/eom/f6c_variable_cell_adapter.py",
  "42f2ff25ec3cedb0e04254cfe1d604946d6593aa360a254e7abe6955783367aa"
 ],
 "adapterControls": [
  "tests/test_f6c_variable_cell_adapter.py",
  "e4a8c694d978354793b8c99c1c0eeaa16ef5bb6d8250fa265f0b046d53434383"
 ],
 "diagnostic": [
  "scripts/eom/f6c_single_leaf_diagnostic.py",
  "087443710e476cab134986a83e45b5d04d470762ea413e899721eac588097bd4"
 ],
 "diagnosticControls": [
  "tests/test_f6c_single_leaf_diagnostic.py",
  "438ac35a5c6818d85195308fdd2f986569ea13164318876e2897d80fe2cde75b"
 ],
 "stream": [
  "scripts/eom/f6c_streamed_leaf_session.py",
  "4127eed0de63d39e96de41cc17615cf35130aa8b33e347a4268c6feb0a862d5c"
 ],
 "streamControls": [
  "tests/test_f6c_streamed_leaf_session.py",
  "242baa1db7c9a225e2cba8aaf50930c93694a1cb49d4fe19691e5947561dd02d"
 ],
 "codec": [
  "scripts/eom/f6c_leaf_evidence_codec.py",
  "371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f"
 ],
 "codecControls": [
  "tests/test_f6c_leaf_evidence_codec.py",
  "af39c302680ce1a9d55c5539dfa3084f20132a12113d9b6285d6abbec074c648"
 ],
 "storage": [
  "scripts/eom/f6c_leaf_stream_publication.py",
  "5a638da1aa91ce80b9dcdfe503f4e2193a981c43e903719e4e18b5bb17c9658e"
 ],
 "storageControls": [
  "tests/test_f6c_leaf_stream_publication.py",
  "b1c8e0a789ec2215d12a20e601dfc5175df3516c450373a624c8049b060d49ae"
 ],
 "readiness": [
  "reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md",
  null
 ],
 "transport": [
  "scripts/eom/verify-f6c-refined-acceleration.py",
  "3f49831a2e63d2526125c1585c1250330079fa423986ec1b36901bb3cecde6ae"
 ],
 "helpers": [
  "scripts/eom/launch-prescribed-response-pilot.mjs",
  "a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9"
 ],
 "outer": [
  "scripts/eom/launch-abc-enclosed-root-pilot.mjs",
  "5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa"
 ],
 "diagnostics": [
  "scripts/eom/launch-f6c-emission-refinement-pilot.mjs",
  "89b23af09f57aa50e3ebfc0780189f2f0d1a409a7e13004af0cb48167894b944"
 ]
});
// Readiness alone is selected by the reviewed invocation. Historical wrapper
// tuples are metadata, never instructions execute/import or runtime exemptions.
export const ARCHIVE_SOURCES=Object.freeze({
 producer:['scripts/eom/prepare-f6c-parent-emission-refinement.py','492882b63f074fd46253ee92974524c4fd6b43ae6190db23797c307251ed8544',57641],
 producerControls:['tests/test_f6c_parent_emission_refinement_preparation.py','06cd99bc1f74c3b7dead6089ef20f468f7be8af41ae6702f45ec85d83a1a36ab',40808],
 verifier:['scripts/eom/verify-f6c-parent-emission-refinement.py','0bb16c232736c895c4f3e38a75e2a0562084710ffdba2503b3ab4457216127fc',46134],
 verifierControls:['tests/test_f6c_parent_emission_refinement_verification.py','92da2b09c629ecbc0fdcdddac9de69353da0e29795e0b1d3bf2d23a05a9a26f7',39696],
 operationalEntry:['scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs','398d604f9e5f8a5d85247df0d619c23726c727980881d185d3cc61545df563f6',48579],
 operationalControls:['tests/f6c-parent-emission-refinement-pilot.test.js','231427f4a98561b8a4377a0a4894e7f7be31ffa8d5f77966d86f77daada4a3e0',20889]
});
const check=(yes,message)=>{if(!yes)throw Error(message);};
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const url=raw=>'data:text/javascript;base64,'+Buffer.from(raw).toString('base64');
const keys=(v,names)=>check(v&&Object.getPrototypeOf(v)===Object.prototype&&Object.keys(v).sort().join('|')===[...names].sort().join('|'),'closed fields');
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export const clean=({data,identity,...record})=>record;
export function readBound(filename,expected,collect=false,limit=collect?FILE:1024**3,live=()=>{}){
  live();check(path.isAbsolute(filename)&&path.resolve(filename)===filename&&realpathSync(filename)===filename,'canonical regular source');
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try{const before=fstatSync(fd,{bigint:true}),identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
    check(before.isFile()&&before.size>=0n&&before.size<=BigInt(limit),'bounded regular file');
    const digest=createHash('sha256'),buffer=Buffer.alloc(65536),chunks=[];let count=0;
    while(count<Number(before.size)){live();const n=readSync(fd,buffer,0,Math.min(buffer.length,Number(before.size)-count),count);check(n>0,'truncated file');count+=n;digest.update(buffer.subarray(0,n));if(collect)chunks.push(Buffer.from(buffer.subarray(0,n)));}
    check(readSync(fd,buffer,0,1,count)===0,'grown file');const hash=digest.digest('hex');
    check(identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&(!expected||hash===expected),'changed source');live();
    return{path:filename,sha256:hash,bytes:count,identity:identity(before),...(collect?{data:Buffer.concat(chunks)}:{})};
  }finally{closeSync(fd);}
}
function binding(b){keys(b,['path','sha256','bytes']);check(typeof b.path==='string'&&!b.path.includes('\0')&&path.isAbsolute(b.path)&&path.resolve(b.path)===b.path&&/^[a-f0-9]{64}$/u.test(b.sha256)&&Number.isSafeInteger(b.bytes)&&b.bytes>0&&b.bytes<=1024**3,'source binding');}
export function checkBindings(records,live=()=>{},identities={}){return records.map(b=>{binding(b);const actual=readBound(b.path,b.sha256,false,1024**3,live);check(actual.bytes===b.bytes&&(!identities[b.path]||actual.identity===identities[b.path]),'source bytes/original identity');return clean(actual);});}
export function decodeSpec(raw){check(raw.length>0&&raw.length<=1024**2,'spec byte bound');const value=JSON.parse(raw.toString());check(Buffer.from(JSON.stringify(value)+'\n').equals(raw),'canonical JSON only; duplicate/extra/trailing syntax rejected');return value;}
export const LIMITS=Object.freeze({wallSeconds:1800,aggregateRSSBytes:2147483648,rssPollMs:250,maximumRSSGapMs:1000,heartbeatSeconds:15,hostProbeSeconds:2,startFreePercent:40,startDiskBytes:68719476736,stopFreePercent:20,stopDiskBytes:17179869184,scientificBytes:67108864,combinedLogBytes:16777216});
const bindingKey=b=>[b.path,b.sha256,b.bytes];
const equalBinding=(a,b)=>same(bindingKey(a),bindingKey(b));
export function archiveRelations(spec){
 const out=[],seen=new Set();
 for(const r of spec.parentRefinements.flatMap(v=>v.archived_sources)){
  const key=JSON.stringify([r.role,...bindingKey(r.original),...bindingKey(r.archive)]);
  if(!seen.has(key)){
   const copy=b=>({path:b.path,sha256:b.sha256,bytes:b.bytes});
   out.push({role:r.role,original:copy(r.original),archive:copy(r.archive)});seen.add(key);
  }
 }
 return out;
}
function elapsedToken(token){
 check(typeof token==='string'&&token.length>0&&token.length<=1152,'bounded elapsed token');
 const m=/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:[eE]([+-]?\d+))?$/u.exec(token);check(m,'decimal elapsed token');
 const fraction=m[3]??m[4]??'',digits=(m[2]??'')+fraction,exp=m[5]??'0',significantExponent=exp.replace(/^[+-]?0*/u,'')||'0';
 check(digits.length<=1024&&significantExponent.length<=4&&Math.abs(Number(exp))<=1000,'elapsed format bound');
 const exponent=Number(exp)-fraction.length;check(Math.abs(exponent)<=1000,'elapsed decimal exponent');
 const n=BigInt(digits);check(m[1]!=='-'&&n>0n&&(exponent>=0?n*10n**BigInt(exponent)<=1800n:n<=1800n*10n**BigInt(-exponent)),'positive elapsed at most1800s');
}
function descriptorBindings(spec){
 const out=[],originals=new Map(),targets=new Map();let previous=0;
 const forbidden=new Set([...Object.values(spec.bindings),...spec.runtimeBindings].map(b=>b.path));
 for(const [p]of Object.values(ARCHIVE_SOURCES))forbidden.add(path.join(spec.root,p));
 for(const d of spec.parentRefinements){
  keys(d,['parent_index','plan','manifest','comparison','operation','launcher_log','resource_log','closure','archived_sources']);
  check(Number.isInteger(d.parent_index)&&d.parent_index>previous&&d.parent_index<160,'sorted unique original parents1..159');previous=d.parent_index;
  for(const k of ['plan','manifest','comparison','operation','launcher_log','resource_log']){binding(d[k]);out.push(d[k]);}
  keys(d.closure,['owner','operation','original_caller_session','final_completion_chunk','exit_code','elapsed_seconds','processes_closed','independent_audit_accepted','authority']);
  const c=d.closure;binding(c.owner);binding(c.operation);check(equalBinding(c.owner,spec.bindings.readiness)&&equalBinding(c.operation,d.operation),'explicit current closure owner');
  check(typeof c.original_caller_session==='string'&&/^[0-9]{1,32}$/u.test(c.original_caller_session)&&typeof c.final_completion_chunk==='string'&&/^[a-zA-Z0-9_-]{1,128}$/u.test(c.final_completion_chunk)&&c.exit_code===0&&c.processes_closed===true&&c.independent_audit_accepted===true&&c.authority==='attributed-versioned-acceptance-owner-not-fresh-process-observation','attributed accepted closure only');elapsedToken(c.elapsed_seconds);
  check(Array.isArray(d.archived_sources)&&d.archived_sources.length<=7,'bounded explicit archives');const roles=new Set();
  for(const r of d.archived_sources){
   keys(r,['role','original','archive']);binding(r.original);binding(r.archive);
   check(typeof r.role==='string'&&!roles.has(r.role),'unique archive role');roles.add(r.role);
   if(r.role==='acceptanceOwner')check(r.original.path===spec.bindings.readiness.path&&!equalBinding(r.original,spec.bindings.readiness),'historical owner distinct from current');
   else{
    check(Object.hasOwn(ARCHIVE_SOURCES,r.role),'known historical role');const[p,h,n]=ARCHIVE_SOURCES[r.role];
    check(r.original.path===path.join(spec.root,p)&&r.original.sha256===h&&r.original.bytes===n,'exact historical source tuple');
   }
   check(r.archive.path!==r.original.path&&!forbidden.has(r.archive.path)&&r.archive.sha256===r.original.sha256&&r.archive.bytes===r.original.bytes,'byte-identical explicit nonalias archive');
   const key=JSON.stringify(bindingKey(r.original)),relation=JSON.stringify([r.role,...bindingKey(r.original),...bindingKey(r.archive)]);
   check(!originals.has(key)||originals.get(key)===relation,'conflicting shared historical mapping');
   check(!targets.has(r.archive.path)||targets.get(r.archive.path)===key,'ambiguous physical archive');
   originals.set(key,relation);targets.set(r.archive.path,key);out.push(r.archive);
  }
 }
 for(const d of spec.parentRefinements)for(const k of ['plan','manifest','comparison','operation','launcher_log','resource_log'])check(!targets.has(d[k].path),'archive aliases selected evidence');
 return out;
}
function uniqueBindings(records){
 const out=new Map();for(const b of records){binding(b);const prior=out.get(b.path);check(!prior||equalBinding(prior,b),'conflicting source generation');if(!prior)out.set(b.path,b);}return [...out.values()];
}
export function validateSpec(s,selfSha){
 keys(s,['schema','scope','root','output','python','git','bindings','runtimeBindings','parentRefinements','maxAdvances','limits']);
 check(s.schema==='braid-program/f6c-streamed-leaf-invocation.v1'&&s.scope===SCOPE,'fixed streamed diagnostic scope');
 check(typeof s.root==='string'&&path.isAbsolute(s.root)&&realpathSync(s.root)===s.root&&typeof s.output==='string'&&path.dirname(s.output)===path.join(s.root,LANE)&&path.resolve(s.output)===s.output&&/^[a-z0-9][a-z0-9-]{0,95}$/u.test(path.basename(s.output)),'fresh canonical direct-child lane');
 keys(s.bindings,['coordinator','controls',...Object.keys(PINS)]);for(const b of Object.values(s.bindings))binding(b);
 check(s.bindings.coordinator.path===path.join(s.root,SELF)&&s.bindings.coordinator.sha256===selfSha&&s.bindings.controls.path===path.join(s.root,CONTROL),'executing connection and controls');
 for(const[k,[p,h]]of Object.entries(PINS))check(s.bindings[k].path===path.join(s.root,p)&&(k==='readiness'||s.bindings[k].sha256===h),'fixed reviewed '+k);
 check(Number.isInteger(s.maxAdvances)&&s.maxAdvances>=1&&s.maxAdvances<=3280&&same(s.limits,LIMITS),'unchanged explicit bounds');
 check(Array.isArray(s.parentRefinements)&&s.parentRefinements.length<=159,'explicit bounded parent selection');
 check(Array.isArray(s.runtimeBindings)&&s.runtimeBindings.length>0&&s.runtimeBindings.length<=256,'fresh bounded runtime census');s.runtimeBindings.forEach(binding);
 const all=[...Object.values(s.bindings),...s.runtimeBindings];check(new Set(all.map(b=>b.path)).size===all.length,'duplicate source/runtime');
 for(const p of[s.python,s.git])check(typeof p==='string'&&path.isAbsolute(p)&&path.resolve(p)===p,'explicit executable');
 for(const p of[realpathSync(s.python),path.join(path.dirname(path.dirname(s.python)),'pyvenv.cfg'),s.git,realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'])check(all.some(b=>b.path===p),'runtime executable/config absent');
 return uniqueBindings([...all,...descriptorBindings(s)]);
}

export function writeNew(filename,value,live=()=>{}){
  live();const raw=Buffer.from(JSON.stringify(value)+'\n');check(raw.length<=FILE,'publication64MiB');
  const fd=openSync(filename,'wx',0o600);try{let n=0;while(n<raw.length){live();const wrote=writeSync(fd,raw,n);check(wrote>0,'short write');n+=wrote;}fsyncSync(fd);}finally{closeSync(fd);}
  const d=openSync(path.dirname(filename),'r');try{fsyncSync(d);}finally{closeSync(d);}live();return clean(readBound(filename,sha(raw),false,FILE,live));
}
export function noCompetitor(table,ownPid){
  const own=new Set([ownPid]);let changed;do{changed=false;for(const row of table)if(own.has(row.ppid)&&!own.has(row.pid)){own.add(row.pid);changed=true;}}while(changed);
  const pattern=/(?:run|launch)-.*(?:root|response|refinement|acceleration|streamed-leaf)|(?:prepare|verify|reduce)-f6c|(?:reduce|publish)-prescribed-acceleration|f6c-single-leaf-diagnostic-20260827.*coordinator\.mjs|eom_native_.*(?:cli|fixture)/u;
  check(!table.some(row=>!own.has(row.pid)&&pattern.test(row.command)),'competing numerical program');
}
export function enrollProbe(probes,command,pid){if(command==='/bin/ps')probes.add(pid);}

// Bound Python target. Source is part of the captured coordinator SHA, and its
// own SHA is recorded independently in the completion. No ambient subject import.
export const PYTHON=String.raw`import __future__,contextlib,dataclasses,fractions,hashlib,json,math,os,pathlib,resource,signal,stat,sys,time,types
def require(v,m):
 if not v:raise ValueError(m)
def local_deadline(token,clock=time.monotonic):
 require(type(token)is str and 0<len(token)<=13 and token.isascii()and token.isdigit(),'bounded remaining duration')
 value=int(token);require(0<value<=1800000000000,'positive remaining duration')
 began=clock();deadline=began+value/1000000000;require(began<deadline<=began+1800,'local duration');return deadline
def identity(s):return(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
def closed(v,names):require(type(v)is dict and set(v)==set(names),'closed fields')
def execute(spec_path,spec_sha,node_deadline,remaining,body_sha):
 deadline=local_deadline(remaining)
 require(type(node_deadline)is str and 0<len(node_deadline)<=20 and node_deadline.isascii()and node_deadline.isdigit(),'Node clock identity')
 clock_transfer=dict(originalNodeDeadlineNanoseconds=node_deadline,entryBudgetStampNanoseconds=str(int(node_deadline)-int(remaining)),remainingNanoseconds=remaining,policy='supplementary-Python-duration-guard; original-Node-deadline-authoritative')
 def live():require(time.monotonic()<deadline,'supplementary Python deadline')
 originals={}
 def read(p,digest,limit=67108864):
  live();p=pathlib.Path(p);require(p.is_absolute()and str(p)==str(p.resolve()),'canonical captured source')
  fd=os.open(p,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
  try:
   s=os.fstat(fd);require(stat.S_ISREG(s.st_mode)and 0<s.st_size<=limit,'bounded source');key=str(p)
   if key in originals:require(originals[key][1]==identity(s),'original source replaced')
   left=s.st_size;parts=[];h=hashlib.sha256()
   while left:
    live();part=os.read(fd,min(65536,left));require(part,'early EOF');left-=len(part);parts.append(part);h.update(part)
   require(not os.read(fd,1)and h.hexdigest()==digest and identity(s)==identity(os.fstat(fd))==identity(p.lstat()),'source changed')
   originals.setdefault(key,(digest,identity(s)));live();return b''.join(parts)
  finally:os.close(fd)
 @contextlib.contextmanager
 def module(b):
  raw=read(b['path'],b['sha256']);name='_streamed_leaf_'+b['sha256'];require(name not in sys.modules,'module collision')
  m=types.ModuleType(name);m.__file__=b['path'];sys.modules[name]=m
  try:exec(compile(raw,m.__file__,'exec',dont_inherit=True),m.__dict__);yield m
  finally:require(sys.modules.get(name)is m,'module identity');del sys.modules[name]
 raw=read(spec_path,spec_sha,1048576);spec=json.loads(raw);bindings=spec['bindings'];root=pathlib.Path(spec['root'])
 require(raw==(json.dumps(spec,separators=(',',':'),ensure_ascii=False)+'\n').encode(),'canonical invocation bytes')
 # Supported bounded integer arithmetic activates the lazy runtime helper.
 (10**20000+1)//(10**15000+3)
 publication=None;files={};source_paths=set();prior_signal=None;provenance=();archives=[]
 def progress(stage,done,total):
  live();print(json.dumps(dict(kind='streamed-leaf-progress',stage=stage,done=done,total=total,accepted=False)),file=sys.stderr,flush=True);live()
 def heartbeat(*_):
  progress('heartbeat',0,0);signal.setitimer(signal.ITIMER_REAL,min(15,max(.000001,deadline-time.monotonic())))
 try:
  prior_signal=signal.signal(signal.SIGALRM,heartbeat);signal.setitimer(signal.ITIMER_REAL,min(15,max(.000001,deadline-time.monotonic())))
  with contextlib.ExitStack()as captures:
   with module(bindings['transport'])as transport:
    BoundFile=transport.BoundFile;runtime_paths=transport.runtime_paths
    def capture(b):
     closed(b,('path','sha256','bytes'));key=b['path']
     if key in files:require(files[key].binding()==b,'conflicting source generation');return
     f=captures.enter_context(BoundFile(key,b['sha256'],limit=1073741824,live=live))
     require(f.initial.st_size==b['bytes'],'captured size')
     if key in originals:require(originals[key]==(b['sha256'],identity(f.initial)),'capture replaced original')
     originals.setdefault(key,(b['sha256'],identity(f.initial)));files[key]=f
    capture(dict(path=spec_path,sha256=spec_sha,bytes=len(raw)))
    for b in [*bindings.values(),*spec['runtimeBindings']]:capture(b)
    def recheck():
     for f in files.values():f.recheck()
     live()
    allowed={pathlib.Path(b['path'])for b in spec['runtimeBindings']}
    def runtime_check():
     require(runtime_paths(source_paths)<=allowed,'runtime outside declared inventory');live()
    def after_close_recheck():
     # Reopen against the ORIGINAL identities, not merely equal replacement bytes.
     for key,(digest,initial)in originals.items():
      with BoundFile(key,digest,limit=1073741824,live=live)as f:require(identity(f.initial)==initial,'original postcleanup source replaced')
     runtime_check();live()
    with module(bindings['adapter'])as A,module(bindings['diagnostic'])as D,module(bindings['stream'])as S,module(bindings['codec'])as C,module(bindings['storage'])as P:
     source_paths.update(bindings[k]['path']for k in ('adapter','diagnostic','stream','codec','storage','transport'))
     # Only the adapter's actually loaded captured module roles are code.
     # Historical source files (including .py archives) confer no runtime bypass.
     executing_roles={'mapping','decoder','rootComparison','acceleration','integral','correlated','gk','geometry','captureHelper','geometryHistory','geometryRoots','geometryIntervals'}
     executing_sources={str(root/p)for role,p,_ in A.SOURCES if role in executing_roles}
     def binding(v):
      closed(v,('path','sha256','bytes'));return A.SourceBinding(**v)
     def descriptor(v):
      closed(v,('parent_index','plan','manifest','comparison','operation','launcher_log','resource_log','closure','archived_sources'))
      require(type(v['parent_index'])is int and 1<=v['parent_index']<160,'explicit original parent index')
      require(type(v['archived_sources'])is list and len(v['archived_sources'])<=7,'bounded historical relations')
      c=v['closure'];closed(c,('owner','operation','original_caller_session','final_completion_chunk','exit_code','elapsed_seconds','processes_closed','independent_audit_accepted','authority'))
      closure=A.ParentClosure(**{**c,'owner':binding(c['owner']),'operation':binding(c['operation'])})
      relations=[]
      for r in v['archived_sources']:
       closed(r,('role','original','archive'));relations.append(A.ArchivedSource(r['role'],binding(r['original']),binding(r['archive'])))
      return A.ParentRefinement(v['parent_index'],**{k:binding(v[k])for k in ('plan','manifest','comparison','operation','launcher_log','resource_log')},closure=closure,archived_sources=tuple(relations))
     require(type(spec['parentRefinements'])is list and len(spec['parentRefinements'])<=159,'bounded explicit refinements')
     selected=tuple(descriptor(v)for v in spec['parentRefinements'])
     indices=tuple(v.parent_index for v in selected);require(indices==tuple(sorted(set(indices))),'sorted unique original parent indices')
     expected_archives=[];seen_archives=set()
     for d in selected:
      for r in d.archived_sources:
       key=(r.role,r.original.path,r.original.sha256,r.original.bytes,r.archive.path,r.archive.sha256,r.archive.bytes)
       if key not in seen_archives:seen_archives.add(key);expected_archives.append(dataclasses.asdict(r))
     archive_paths={r['archive']['path']for r in expected_archives}
     with A.open_adapter(root,adapter_sha256=bindings['adapter']['sha256'],controls_sha256=bindings['adapterControls']['sha256'],closure_owner_sha256=bindings['readiness']['sha256'],deadline=deadline,parent_refinements=selected)as adapter:
      provenance=tuple(adapter.provenance)
      require(0<len(provenance)<=512 and len({p for p,_,_ in provenance})==len(provenance),'unique captured source census')
      for p,h,n in provenance:
       capture(dict(path=p,sha256=h,bytes=n))
       if p in executing_sources and p not in archive_paths:source_paths.add(p)
      require(len(adapter.histories)==8 and all(len(h.segments)==1760 for h in adapter.histories)and len(adapter.frames)==81 and len(adapter.parents)==160,'actual metadata census')
      require(all(adapter.call_counts[k]==0 for k in ('projections','evaluations','residuals','root_queries','emission_refinements'))and all(v==0 for v in adapter.geometry_accounting.values()),'metadata zero numerical calls')
      archives=S.to_wire(adapter.historical_owner_archives)
      require(archives==expected_archives,'exact unique historical archive relations')
      metadata=dict(sources=len(provenance),members=8,segmentsPerMember=1760,frames=81,parents=160,projections=0,evaluations=0,residuals=0,restrictions=0,historyStateEvaluations=0)
      runtime_check();recheck();progress('metadata',1,1)
      publication=P.LeafStreamPublication(spec['output'],C,deadline=deadline,byte_limit=67108864,live=live)
      header_spec=dict(binding=dict(path=spec_path,sha256=spec_sha,bytes=len(raw)),maxAdvances=spec['maxAdvances'],parentRefinements=spec['parentRefinements'])
      metadata_wire=dict(scope=spec['scope'],spec=header_spec,sourceBindings=dict(files=bindings,historicalOwnerArchives=archives),runtimeBindings=spec['runtimeBindings'],pythonBodySha256=body_sha,clockTransfer=clock_transfer,publicationRequires='fresh matching successful process completion and independent mathematical comparison; no metric authority')
      session=S.StreamedLeafSession(adapter,D,C,metadata_wire,publication.write,byte_limit=67108864,live=live)
      runtime_check();recheck()
      maximum=spec['maxAdvances'];require(type(maximum)is int and 1<=maximum<=3280,'explicit original bounded advance count')
      final_state=None;completed=0
      for index in range(maximum):
       if final_state is not None and final_state['next_request']is None:break
       def local_progress(stage,done,total):
        require((stage=='range'and total==4 and 1<=done<=4)or(stage=='residual'and total==8 and 1<=done<=8),'provider progress census')
        progress(stage,index*total+done,maximum*total)
       final_state=session.advance(local_progress);completed+=1;runtime_check();progress('advance',completed,maximum)
      require(completed>=1 and (completed==maximum or final_state['next_request']is None),'declared stopping boundary')
      stop_reason='no-outstanding-request'if final_state['next_request']is None else'explicit-maximum'
      framing=session.finish();sealed=publication.seal();stream_accounting=session.accounting
      require(framing['complete']is True and framing['accepted']is False and framing['completed_pairs']==completed and sealed.pairs==completed and sealed.records==2*completed+2,'codec EOF and pair census')
      calls={k:adapter.call_counts[k]for k in ('projections','evaluations','residuals','root_queries','emission_refinements')}
      geometry=dict(adapter.geometry_accounting)
      require(calls==dict(projections=4*completed,evaluations=4*completed,residuals=8*completed,root_queries=0,emission_refinements=0),'exact bounded call census')
      require(all(geometry[k]==4*completed for k in ('restriction_calls','completed_restrictions','restricted_projections'))and geometry['history_state_evaluations']>=4*completed,'observed geometry census')
      runtime_check();recheck()
     # Adapter final recheck and private namespace teardown precede publication.
     runtime_check();recheck()
    runtime_check();recheck()
   # All captured modules have closed; their retained methods remain exactly
   # source-bound. No ambient import or new numerical call occurs here.
   runtime_check();recheck();after_close_recheck()
   output=publication.publish();publication.verify();recheck();runtime_check()
  # All original descriptors closed: replacement by identical bytes still fails.
  after_close_recheck();publication.verify();publication.close();live()
  signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,prior_signal);prior_signal=None
  after_close_recheck();publication.verify()
  completion=dict(completed=True,accepted=False,scope=spec['scope'],output=dataclasses.asdict(output),completedAdvances=completed,stopReason=stop_reason,finalState=final_state,
   callCounts=calls,geometryAccounting=geometry,streamAccounting=stream_accounting,publicationAccounting=dataclasses.asdict(publication.accounting),metadataCensus=metadata,
   historicalSourceBindings=[dict(path=p,sha256=h,bytes=n)for p,h,n in provenance],historicalOwnerArchives=archives,sourceIdentities={p:':'.join(map(str,v[1]))for p,v in originals.items()},
   adapterContextClosed=True,pythonBodySha256=body_sha,clockTransfer=clock_transfer,externalWholeAttemptAdmissionRequired=True,codecEOFValidated=True,
   rootsEvaluated=False,eomExecuted=False,metricsAvailable=False,scoreAuthorized=False)
  print(json.dumps(completion,separators=(',',':')),flush=True);live()
  usage=resource.getrusage(resource.RUSAGE_SELF)
  print(json.dumps(dict(kind='streamed-leaf-python-resources',userSeconds=usage.ru_utime,systemSeconds=usage.ru_stime,maximumIndividualResidentBytes=usage.ru_maxrss if sys.platform=='darwin'else usage.ru_maxrss*1024)),file=sys.stderr,flush=True)
  after_close_recheck();publication.verify();live()
 except BaseException:
  if publication is not None:publication.reject()
  raise
 finally:
  if prior_signal is not None:signal.setitimer(signal.ITIMER_REAL,0);signal.signal(signal.SIGALRM,prior_signal)
  if publication is not None:publication.close()
if __name__=='__main__':execute(*sys.argv[1:])
`;

export async function registered(specPath,specSha,selfSha,deadline){
  const live=()=>check(process.hrtime.bigint()<BigInt(deadline),'registered entry deadline');live();
  const record=readBound(specPath,specSha,true,1024**2,live),spec=decodeSpec(record.data);checkBindings(validateSpec(spec,selfSha),live);
  check(import.meta.url.startsWith('file:')&&fileURLToPath(import.meta.url)===spec.bindings.coordinator.path,'captured registered entry path');
  const body=sha(PYTHON);check(PYTHON.length<65536,'bounded embedded Python');
  // Sample only after preflight, immediately before registering the target.
  // Never renew the original absolute Node deadline or grant a fresh1800s.
  const clockTransfer=remainingDuration(deadline);
  await new Promise((resolve,reject)=>{
    const child=spawn(spec.python,['-I','-B','-c',PYTHON,specPath,specSha,deadline,clockTransfer.remainingNanoseconds,body],{cwd:spec.root,detached:true,stdio:['ignore','pipe','pipe']});
    child.stdout.pipe(process.stdout);child.stderr.pipe(process.stderr);child.once('error',reject);
    child.once('close',(code,signal)=>code===0&&!signal?resolve():reject(Error('registered Python failed '+code+'/'+signal)));
  });
  checkBindings(validateSpec(spec,selfSha),live);console.error(JSON.stringify({kind:'streamed-leaf-entry-resources',clockTransfer,resourceUsage:process.resourceUsage()}));live();
}

export function inspectStreamLayout(output){
 if(!existsSync(output))return {bytes:0,owner:null,layout:null,published:false};
 const dir=lstatSync(output,{bigint:true});check(dir.isDirectory()&&!dir.isSymbolicLink(),'raw output directory');
 const names=readdirSync(output),privates=names.filter(n=>n.startsWith('.leaf-stream-private-'));
 check(names.every(n=>n==='leaf-evidence.ndjson'||n.startsWith('.leaf-stream-private-'))&&privates.length<=1,'stream output census');
 const seen=new Set();let total=0,owner=null,layout=null;
 if(privates.length){
  const d=path.join(output,privates[0]),ds=lstatSync(d,{bigint:true});check(ds.isDirectory()&&!ds.isSymbolicLink(),'private stream directory');
  const inner=readdirSync(d);check(inner.length<=1&&inner.every(n=>n==='leaf-evidence.ndjson'),'private stream census');
  if(inner.length){
   const p=path.join(d,inner[0]),s=lstatSync(p,{bigint:true});check(s.isFile()&&s.nlink>=1n&&s.nlink<=2n&&s.size<=BigInt(FILE),'private stream inode/quota');
   owner={privatePath:p,publicPath:path.join(output,'leaf-evidence.ndjson'),dev:String(s.dev),ino:String(s.ino)};
   // Directory timestamps legitimately change during publication. Retain their
   // original names/dev/ino, alongside the stream inode, without freezing time.
   layout={outputPath:output,outputDev:String(dir.dev),outputIno:String(dir.ino),privateName:privates[0],privateDev:String(ds.dev),privateIno:String(ds.ino),...owner};
   seen.add(s.dev+':'+s.ino);total+=Number(s.size);
  }
 }
 if(names.includes('leaf-evidence.ndjson')){
  const s=lstatSync(path.join(output,'leaf-evidence.ndjson'),{bigint:true});
  check(owner&&s.isFile()&&String(s.dev)===owner.dev&&String(s.ino)===owner.ino&&s.nlink===2n,'public is owned private alias');
  const key=s.dev+':'+s.ino;if(!seen.has(key))total+=Number(s.size);
 }
 check(total<=FILE,'aggregate unique-inode scientific quota');return{bytes:total,owner,layout,published:names.includes('leaf-evidence.ndjson')};
}
export function checkFinalStreamLayout(output,original,live=()=>{}){
 live();const observed=inspectStreamLayout(output);
 check(original&&observed.owner&&observed.published&&same(observed.layout,original),'original published stream layout changed');
 live();return observed;
}
export function retractStream(owner){
 if(!owner)return false;
 try{
  const s=lstatSync(owner.publicPath,{bigint:true});
  if(s.isFile()&&String(s.dev)===owner.dev&&String(s.ino)===owner.ino){
   unlinkSync(owner.publicPath);const fd=openSync(path.dirname(owner.publicPath),'r');try{fsyncSync(fd);}finally{closeSync(fd);}return true;
  }
 }catch(e){if(e.code!=='ENOENT')throw e;}
 return false;
}
export function scanStream(filename,expected,live=()=>{}){
 // Structural framing only. The captured original Python codec owns decoding
 // and exact reconstruction; this observer is not a second codec or oracle.
 const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
 try{
  const before=fstatSync(fd,{bigint:true}),id=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
  check(before.isFile()&&before.size>0n&&before.size<=BigInt(FILE),'bounded stream');
  const hash=createHash('sha256'),prefix=createHash('sha256'),buffer=Buffer.alloc(65536);
  let pending=Buffer.alloc(0),offset=0,records=0,pairs=0,prefixBytes=0,footer=false;
  const record=line=>{
   live();check(line.length>1&&line.at(-1)===10,'complete stream line');const value=JSON.parse(line.toString());
   if(records===0){keys(value,['kind','schema','shared','header']);check(value.kind==='header'&&value.schema==='braid-program/f6c-leaf-evidence-stream.v1','codec stream header');}
   else if(value.kind==='footer'){
    keys(value,['kind','complete','accepted','provisions','transitions','prefix_bytes','prefix_sha256','summary']);
    check(records%2===1&&value.complete===true&&value.accepted===false&&value.provisions===pairs&&value.transitions===pairs&&value.prefix_bytes===prefixBytes&&value.prefix_sha256===prefix.digest('hex'),'exact stream prefix/EOF');footer=true;
   }else{
    keys(value,['kind','index','dag']);check(!footer&&value.kind===(records%2?'provision':'transition')&&value.index===pairs,'alternating stream record census');
    if(value.kind==='transition')pairs++;
   }
   check(!footer||value.kind==='footer','record after EOF');if(!footer){prefix.update(line);prefixBytes+=line.length;}hash.update(line);records++;
  };
  while(offset<Number(before.size)){
   live();const n=readSync(fd,buffer,0,Math.min(buffer.length,Number(before.size)-offset),offset);check(n>0,'stream early EOF');offset+=n;
   pending=Buffer.concat([pending,buffer.subarray(0,n)]);let newline;
   while((newline=pending.indexOf(10))>=0){check(!footer,'data after footer');record(pending.subarray(0,newline+1));pending=pending.subarray(newline+1);}
   check(pending.length<=FILE,'line quota');
  }
  check(readSync(fd,buffer,0,1,offset)===0&&pending.length===0&&footer&&records===2*pairs+2,'complete stream EOF');
  const digest=hash.digest('hex');check(digest===expected&&id(before)===id(fstatSync(fd,{bigint:true}))&&id(before)===id(lstatSync(filename,{bigint:true})),'stream replaced/changed');
  return {path:filename,sha256:digest,bytes:offset,pairs,records,identity:id(before)};
 }finally{closeSync(fd);}
}
export function fileOperation(job){
 const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'file worker deadline');live();
 if(job.kind==='preflight'){
  const captured=readBound(job.specPath,job.specSha,true,1024**2,live),spec=decodeSpec(captured.data);
  const records=[...validateSpec(spec,job.selfSha),clean(captured)],actual=records.map(b=>readBound(b.path,b.sha256,false,1024**3,live));
  actual.forEach((r,n)=>check(r.bytes===records[n].bytes,'source size'));
  return{spec,sources:actual.map(clean),sourceIdentities:Object.fromEntries(actual.map(b=>[b.path,b.identity])),specBinding:clean(captured)};
 }
 if(job.kind==='recheck')return checkBindings(job.sources,live,job.sourceIdentities);
 if(job.kind==='admit'){
  const proc=job.processReceipt;
  check(proc.accepted===false&&proc.processesClosed===true&&proc.exit?.code===0&&proc.exit?.signal===null&&proc.gates?.length===1,'closed registered target');
  const gate=proc.gates[0];check(gate.retired&&gate.acknowledged&&gate.measurement?.code===0&&gate.measurement?.signal===null,'retired successful gate');
  const args=gate.requestedArgs;check(Array.isArray(args)&&args.length===9&&typeof args[7]==='string'&&/^[0-9]{1,13}$/u.test(args[7]),'closed target arguments');
  const duration=BigInt(args[7]);check(duration>0n&&duration<=1800000000000n,'transferred duration');
  const transfer=remainingDuration(job.deadlineNanoseconds,BigInt(job.deadlineNanoseconds)-duration);
  check(gate.target&&gate.requestedCommand===job.spec.python&&same(args,['-I','-B','-c',PYTHON,job.specBinding.path,job.specBinding.sha256,job.deadlineNanoseconds,transfer.remainingNanoseconds,sha(PYTHON)]),'captured target identity');
  const raw=readBound(job.stdout.path,job.stdout.sha256,true,LOG,live).data;
  check(raw.at(-1)===10&&raw.toString().trim().split('\n').length===1,'one fresh stdout completion');
  const done=JSON.parse(raw);
  keys(done,['completed','accepted','scope','output','completedAdvances','stopReason','finalState','callCounts','geometryAccounting','streamAccounting','publicationAccounting','metadataCensus','historicalSourceBindings','historicalOwnerArchives','sourceIdentities','adapterContextClosed','pythonBodySha256','clockTransfer','externalWholeAttemptAdmissionRequired','codecEOFValidated','rootsEvaluated','eomExecuted','metricsAvailable','scoreAuthorized']);
  check(done.completed===true&&done.accepted===false&&done.scope===SCOPE&&done.adapterContextClosed===true&&done.codecEOFValidated===true&&done.externalWholeAttemptAdmissionRequired===true,'conditional framed completion');
  for(const k of['rootsEvaluated','eomExecuted','metricsAvailable','scoreAuthorized'])check(done[k]===false,'authority promotion');
  check(done.pythonBodySha256===sha(PYTHON)&&same(done.clockTransfer,transfer),'body/clock transfer');
  const n=done.completedAdvances;check(Number.isInteger(n)&&n>=1&&n<=job.spec.maxAdvances,'bounded explicit advances');
  keys(done.finalState,['status','aggregate_is_none','next_generation','split_counts','leaf_count','evaluated_count','pending_count','next_request']);
  check(done.finalState.evaluated_count===n&&((done.stopReason==='explicit-maximum'&&n===job.spec.maxAdvances&&done.finalState.next_request!==null)||(done.stopReason==='no-outstanding-request'&&done.finalState.next_request===null)),'actual stopping reason');
  check(same(done.callCounts,{projections:4*n,evaluations:4*n,residuals:8*n,root_queries:0,emission_refinements:0}),'exact numerical call census');
  keys(done.geometryAccounting,['restriction_calls','completed_restrictions','history_state_evaluations','restricted_projections']);
  check(['restriction_calls','completed_restrictions','restricted_projections'].every(k=>done.geometryAccounting[k]===4*n)&&Number.isSafeInteger(done.geometryAccounting.history_state_evaluations)&&done.geometryAccounting.history_state_evaluations>=4*n,'actual geometry counters');
  const historical=done.historicalSourceBindings;check(Array.isArray(historical)&&historical.length>0&&historical.length<=512&&new Set(historical.map(b=>b.path)).size===historical.length,'captured historical census');historical.forEach(binding);
  check(same(done.metadataCensus,{sources:historical.length,members:8,segmentsPerMember:1760,frames:81,parents:160,projections:0,evaluations:0,residuals:0,restrictions:0,historyStateEvaluations:0}),'fresh original metadata');
  check(same(done.historicalOwnerArchives,archiveRelations(job.spec)),'exact explicit archive relations');
  const combined=uniqueBindings([...job.sources,...historical]);
  keys(done.sourceIdentities,combined.map(b=>b.path));
  check(Object.values(done.sourceIdentities).every(v=>typeof v==='string'&&/^[0-9]+:[0-9]+:[0-9]+:[0-9]+:[0-9]+$/u.test(v)),'original source identities');
  for(const[p,id]of Object.entries(job.sourceIdentities))check(done.sourceIdentities[p]===id,'source replaced since preflight');
  checkBindings(combined,live,done.sourceIdentities);
  keys(done.output,['path','sha256','bytes','pairs','records','accepted']);
  check(done.output.path===path.join(job.output,'leaf-evidence.ndjson')&&done.output.accepted===false&&done.output.pairs===n&&done.output.records===2*n+2,'single exact stream output');
  const layout=inspectStreamLayout(job.output),stream=scanStream(done.output.path,done.output.sha256,live);
  check(layout.owner&&layout.bytes===stream.bytes&&stream.bytes===done.output.bytes&&stream.pairs===n&&stream.records===2*n+2,'unique-inode stream/EOF identity');
  const ac=done.streamAccounting,pc=done.publicationAccounting;
  keys(ac,['status','completed_pairs','attempted_records','attempted_bytes','acknowledged_records','acknowledged_bytes','pending_record']);
  keys(pc,['status','attempted_records','attempted_bytes','written_bytes','durable_records','durable_bytes','descriptor_closed']);
  check(ac.status==='finished'&&ac.completed_pairs===n&&ac.pending_record===null&&ac.attempted_records===stream.records&&ac.acknowledged_records===stream.records&&ac.attempted_bytes===stream.bytes&&ac.acknowledged_bytes===stream.bytes,'codec acknowledgements');
  check(pc.status==='published'&&pc.descriptor_closed===true&&pc.attempted_records===stream.records&&pc.durable_records===stream.records&&[pc.attempted_bytes,pc.written_bytes,pc.durable_bytes].every(v=>v===stream.bytes),'durable stream receipts');
  const stderr=readBound(path.join(job.output+'-outer','process/runner-stderr.log'),undefined,true,LOG,live);
  const events=stderr.data.toString().split('\n').flatMap(line=>{try{return[JSON.parse(line)];}catch{return[];}});
  const entry=events.filter(e=>e.kind==='streamed-leaf-entry-resources');
  check(entry.length===1&&same(entry[0].clockTransfer,transfer),'closed entry CPU/clock event');
  return{accepted:true,h3EvidenceEligible:false,scope:'operational-streamed-leaf-completion-only',completion:done,completionLog:job.stdout,outputs:[{path:stream.path,sha256:stream.sha256,bytes:stream.bytes}],historicalSourceBindings:historical,sourceIdentities:{...done.sourceIdentities,[stream.path]:stream.identity},streamOwner:layout.owner,mathematicalAuthority:false};
 }
 if(job.kind==='publish'){checkBindings(job.sources,live,job.sourceIdentities);return writeNew(job.filename,job.record,live);}
 throw Error('unknown worker operation');
}

function namedSize(filename,limit){if(!existsSync(filename))return 0;const s=lstatSync(filename);check(s.isFile()&&s.size<=limit,'named file limit/type');return s.size;}
export async function coordinate({specPath,specSha,selfSha,began,deadlineNanoseconds,diagnostics}){
  const root=realpathSync(process.cwd()),self=readBound(path.join(root,SELF),selfSha,true,1024**2);
  check(import.meta.url===url(self.data),'coordinator executes captured generation');
  const helper=readBound(path.join(root,PINS.helpers[0]),PINS.helpers[1],true,1024**2),outerSource=readBound(path.join(root,PINS.outer[0]),PINS.outer[1],true,1024**2);
  const H=await import(url(helper.data)),outer=await import(url(outerSource.data));
  const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),hostRecords=[];
  const rss={beganMs:began,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0};
  let failure,lock,timer,deadlineTimer,rssJob,hostJob,logFD,rssFD,active=false,receipt,publication,spec,output,ops,pre,closed=false,rawOwner=null,rawLayout=null,finalSources,finalIdentities;
  const logTotal={bytes:0},rssTotal={bytes:0},originalError=console.error;
  const remaining=()=>Math.floor(LIMIT-(performance.now()-began));
  const live=()=>{check(!failure&&!abort.signal.aborted,failure?.message??'interrupted');check(remaining()>0,'inclusive1800s');};
  const fail=e=>{failure??=e;abort.abort(e);if(active)process.emit('SIGTERM');};diagnostics.bind(fail);
  const worker=job=>H.runFileWorker({...job,deadlineNanoseconds},self.data,remaining(),abort.signal);
  const logs=()=>['runner-stdout.log','runner-stderr.log'].map(n=>path.join(ops,'process',n));
  const poll=()=>{if(!ops)return;const total=logTotal.bytes+rssTotal.bytes+logs().reduce((n,p)=>n+namedSize(p,LOG),0);check(total<=LOG,'combined16MiB logs');
    if(output){const observed=inspectStreamLayout(output);if(observed.owner){check(!rawLayout||same(rawLayout,observed.layout),'private stream replaced');rawOwner??=observed.owner;rawLayout??=observed.layout;}else check(!rawOwner,'private stream removed');}};
  const log=x=>{const raw=Buffer.from((typeof x==='string'?x:JSON.stringify(x))+'\n');H.boundedLogAppend(logFD,raw,logTotal);diagnostics.write(raw);poll();};
  const probe=(command,args,timeout,maxBuffer)=>{
    const p=new Promise((resolve,reject)=>{const child=execFile(command,args,{timeout,killSignal:'SIGKILL',maxBuffer,encoding:'utf8',env:{...process.env,LC_ALL:'C'}},(error,text)=>{probes.delete(child.pid);error?reject(error):resolve({text,pid:child.pid});});enrollProbe(probes,command,child.pid);});
    pending.add(p);p.finally(()=>pending.delete(p)).catch(()=>{});return p;
  };
  const table=async()=>{const start=performance.now(),r=await probe('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,args='],500,8*1024**2),rows=H.parseObservation(r.text).filter(x=>x.pid!==r.pid);Object.defineProperty(rows,'sampleStartedMs',{value:start});return rows;};
  const sample=rows=>{const value=H.acceptRSS(rss,H.selectOwnedRows(rows,process.pid,owners,outer,probes),performance.now(),rows.sampleStartedMs);H.boundedLogAppend(rssFD,Buffer.from(JSON.stringify({kind:'aggregate-rss',elapsedSeconds:(performance.now()-began)/1000,...value})+'\n'),rssTotal);poll();};
  const inspect=async()=>{const rows=await table();if(!abort.signal.aborted)try{sample(rows);}catch(e){fail(e);throw e;}return rows.map(({rssBytes,...r})=>r);};
  const host=async launch=>{const result=await probe('/usr/bin/memory_pressure',[],2000,1024**2),disk=statfsSync(root,{bigint:true}),value={kind:'host-resource',elapsedSeconds:(performance.now()-began)/1000,...H.parseHostResource(result.text,disk.bavail*disk.bsize,launch)};hostRecords.push(value);log(value);};
  const stop=async()=>{clearInterval(timer);clearTimeout(deadlineTimer);if(rssJob)await rssJob;if(hostJob)await hostJob;await Promise.allSettled([...pending]);};
  const interrupt=()=>{if(!abort.signal.aborted)fail(Error('operator interrupted'));};
  try{
    // Only this tiny metadata read precedes live monitoring; its elapsed time
    // is charged by acceptRSS's first observation and the original began clock.
    spec=decodeSpec(readBound(specPath,specSha,true,1024**2).data);validateSpec(spec,selfSha);output=spec.output;ops=output+'-outer';
    check(!existsSync(output)&&!existsSync(ops),'fresh output and operation sibling');mkdirSync(ops,{mode:0o700});
    logFD=openSync(path.join(ops,'launcher-stderr.log'),'wx',0o600);rssFD=openSync(path.join(ops,'resource-observations.ndjson'),'wx',0o600);
    console.error=(...v)=>{try{log(v.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' '));}catch(e){fail(e);}};
    process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);deadlineTimer=setTimeout(()=>fail(Error('wall deadline')),remaining());
    let nextHost=performance.now()+15000;
    timer=setInterval(()=>{try{check(rss.lastSampleMs===null||performance.now()-rss.lastSampleStartedMs<=1000,'lost RSS monitor');
      if(!rssJob)rssJob=table().then(r=>{if(!abort.signal.aborted)sample(r);}).catch(fail).finally(()=>{rssJob=undefined;});
      if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});log({kind:'streamed-leaf-heartbeat',elapsedSeconds:(performance.now()-began)/1000,accepted:false});}poll();
    }catch(e){fail(e);}},250);
    const initial=await table();sample(initial);noCompetitor(initial,process.pid);lock=H.reserveLock(path.join(root,LOCK),initial.find(r=>r.pid===process.pid));
    pre=await worker({kind:'preflight',specPath,specSha,selfSha});
    for(const target of [output,ops])await probe(spec.git,['check-ignore','-q','--',path.relative(root,target)],2000,4096);
    await host(true);live();
    active=true;
    try{receipt=await outer.superviseRegisteredPilot({root,entry:SELF,args:['--registered',specPath,specSha,selfSha,deadlineNanoseconds],
      sources:[{path:SELF,sha256:selfSha,bytes:self.data}],output:path.join(ops,'process'),startedAtMs:began,limitMs:LIMIT,heartbeatMs:15000,
      inspectProcesses:H.startupAbortInspection(inspect,abort.signal),admit:({receipt:processReceipt,signal})=>{poll();return H.runFileWorker({kind:'admit',processReceipt,output,spec:pre.spec,specBinding:pre.specBinding,
        sources:pre.sources,sourceIdentities:pre.sourceIdentities,stdoutPath:path.join(ops,'process/runner-stdout.log'),deadlineNanoseconds},self.data,remaining(),signal);}});
    }catch(e){receipt=e.outerReceipt;throw e;}finally{active=false;}
    check(receipt.accepted&&receipt.processesClosed&&receipt.admission?.accepted,'closed admitted target');
    poll();check(same(rawOwner,receipt.admission.streamOwner),'admitted original stream owner');checkFinalStreamLayout(output,rawLayout,live);
    const sources=uniqueBindings([...pre.sources,...receipt.admission.historicalSourceBindings,...receipt.admission.outputs,receipt.stdoutLog,receipt.stderrLog]),sourceIdentities=receipt.admission.sourceIdentities;
    await worker({kind:'recheck',sources,sourceIdentities});sample(await table());await host(false);live();
    const record={schema:'braid-program/f6c-streamed-leaf-operation.v1',accepted:true,scope:'operational-streamed-leaf-completion-only',process:receipt,invocation:pre.specBinding,
      sourceBindings:pre.sources,observationsBeforePublication:{...rss},hostObservationsBeforePublication:hostRecords,
      elapsedSecondsBeforePublication:(performance.now()-began)/1000,publicationRequires:'matching fresh caller exit0 and wholeelapsed after final source/log hashing and closed workers/monitors/lock/stdio',
      physicalClaims:false,wholeHistoryMetrics:false,rootsEvaluated:false,eomExecuted:false};
    publication=await worker({kind:'publish',filename:path.join(ops,'operation.json'),record,sources,sourceIdentities});
    await worker({kind:'recheck',sources:[...sources,publication],sourceIdentities});sample(await table());live();await stop();live();
    H.releaseLock(lock);lock=undefined;for(const fd of[logFD,rssFD])fsyncSync(fd);
    const capturedLogs=['launcher-stderr.log','resource-observations.ndjson'].map(n=>readBound(path.join(ops,n),undefined,false,LOG,live));
    const logBindings=capturedLogs.map(clean),logIdentities=Object.fromEntries(capturedLogs.map(b=>[b.path,b.identity]));
    const final={completed:true,accepted:true,scope:'operational-streamed-leaf-completion-only',operation:publication,outputs:receipt.admission.outputs,logs:logBindings,
      processesClosed:true,workersAndMonitorsClosed:true,lockReleased:true,maximumSampledRSSBytes:rss.maximumSampledRSSBytes,samples:rss.samples,maximumSampleGapMs:rss.maximumSampleGapMs,
      finalObservationToClosureMs:H.admitFinalObservation(rss,performance.now()),lastSampleStartedMs:rss.lastSampleStartedMs,
      elapsedSeconds:(performance.now()-began)/1000,coordinatorResourceUsage:process.resourceUsage(),physicalClaims:false,wholeHistoryMetrics:false,rootsEvaluated:false,eomExecuted:false};
    final.operationalLogBytes=logTotal.bytes+rssTotal.bytes+logs().reduce((n,p)=>n+namedSize(p,LOG),0);
    final.streamOwner=rawOwner;final.finalStreamLayout=rawLayout;final.finalSourceBindings=[...sources,publication,...logBindings];final.finalSourceIdentities={...sourceIdentities,...logIdentities};
    closed=true;return final;
  }catch(e){fail(e);await stop();try{retractStream(rawOwner);}catch{}if(ops&&existsSync(ops))try{writeNew(path.join(ops,'rejection.json'),{completed:false,accepted:false,failure:String((failure??e).message),invalidates:publication??null,
      processesClosed:receipt?.processesClosed??false,cleanupFailure:receipt?.cleanupFailure??null,cancellationUnverifiedPids:receipt?.cancellationUnverifiedPids??null,process:receipt??null});}catch{}throw failure??e;
  }finally{
    try{
      await stop();if(lock)H.releaseLock(lock);console.error=originalError;process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
      if(logFD!==undefined)closeSync(logFD);if(rssFD!==undefined)closeSync(rssFD);diagnostics.check();
      if(closed){live();H.admitFinalObservation(rss,performance.now());checkFinalStreamLayout(output,rawLayout,live);}
    }catch(error){
      // A throw from finally prevents delivery of the returned result to main.
      // Retract here as well, so that late cleanup cannot strand its public link.
      try{retractStream(rawOwner);}catch{}
      if(publication)try{writeNew(path.join(ops,'terminal-rejection.json'),{completed:false,accepted:false,failure:String(error.message),invalidates:publication,scope:'failed-final-cleanup-no-authority'});}catch{}
      throw error;
    }
  }
}

async function main(){
  const began=performance.now(),deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n),v=process.argv.slice(2);
  if(v[0]==='--registered'){check(v.length===5,'registered arguments');return registered(...v.slice(1));}
  check(v.length===6&&v[0]==='--spec'&&v[2]==='--spec-sha256'&&v[4]==='--self-sha256','closed coordinator CLI');
  const root=realpathSync(process.cwd()),lifetime=readBound(path.join(root,PINS.diagnostics[0]),PINS.diagnostics[1],true,1024**2),D=await import(url(lifetime.data));
  const diagnostics=D.diagnosticGuard();
  let result;
  try{
    const self=readBound(path.join(root,SELF),v[5],true,1024**2),C=await import(url(self.data));result=await C.coordinate({specPath:v[1],specSha:v[3],selfSha:v[5],began,deadlineNanoseconds,diagnostics});
    const H=await import(url(readBound(path.join(root,PINS.helpers[0]),PINS.helpers[1],true,1024**2).data));
    await D.drainDiagnostics({began,lastSampleStartedMs:result.lastSampleStartedMs});diagnostics.check();result.elapsedSeconds=(performance.now()-began)/1000;
    const finalLive=()=>check(performance.now()-began<LIMIT&&performance.now()-result.lastSampleStartedMs<=1000,'final source/stdio deadline/gap');
    C.checkBindings(result.finalSourceBindings,finalLive,result.finalSourceIdentities);
    C.checkFinalStreamLayout(path.dirname(result.streamOwner.publicPath),result.finalStreamLayout,finalLive);
    const {streamOwner,finalStreamLayout,finalSourceBindings,finalSourceIdentities,...wire}=result;
    await H.flushCompletion(wire,{began,lastSampleStartedMs:result.lastSampleStartedMs});diagnostics.check();await diagnostics.close(began);
    C.checkBindings(result.finalSourceBindings,finalLive,result.finalSourceIdentities);C.checkFinalStreamLayout(path.dirname(result.streamOwner.publicPath),result.finalStreamLayout,finalLive);finalLive();
  }catch(e){
    if(result)try{retractStream(result.streamOwner);writeNew(path.join(path.dirname(result.operation.path),'terminal-rejection.json'),{completed:false,accepted:false,failure:String(e.message),invalidates:result.operation,scope:'failed-final-publication-no-authority'});}catch{}
    await D.failedCLICompletion(e,{began});
  }
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e);process.exitCode=1;});

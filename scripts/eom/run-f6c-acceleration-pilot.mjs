/** Operational adapter only: captured consumer -> closed candidate -> checker.
 * fileOperation never imports or evaluates scientific Python. The external
 * registered supervisor owns process-group closure and whole-attempt admission.
 * The data child is absent until the consumer creates it; logs/receipt/checker
 * output occupy its exclusive -outer sibling. No retry or resumed input exists.
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, openSync,
  readSync, realpathSync, writeSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export let HISTORICAL;
export const BRIDGE='scripts/eom/execute-f6c-acceleration.py';
export const BRIDGE_TESTS='tests/test_f6c_acceleration_execution.py';
export const ENTRY='scripts/eom/run-f6c-acceleration-pilot.mjs';
export const LAUNCHER='scripts/eom/launch-f6c-acceleration-pilot.mjs';
export const TESTS='tests/f6c-acceleration-pilot.test.js';
export const PROCESS_TESTS='tests/f6c-acceleration-pilot-process.test.js';
export const HELPERS='scripts/eom/launch-prescribed-response-pilot.mjs';
export const OUTER='scripts/eom/launch-subfield-circular-root-pilot.mjs';
export const CONSUMER='scripts/eom/prepare-f6c-continuous-reception-acceleration.py';
export const CONSUMER_TESTS='tests/test_f6c_continuous_reception_acceleration_preparation.py';
export const DECLARATION='reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md';
export const CHECKER='scripts/eom/verify-f6c-continuous-reception-acceleration.py';
export const CHECKER_TESTS='tests/test_f6c_continuous_reception_acceleration.py';
// Separately authored checker and controls, independently accepted before this
// operational generation. No subject or mathematical reference is altered.
export let CHECKER_SHA;
export let CHECKER_TESTS_SHA;
export const LANE='.local-data/braid-analysis/f6c-continuous-reception-acceleration-20260827';
export const SHARED_LOCK_LANE='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827';
export const SCOPE='cached-pilot-cell-0-range';
export const LIMIT_MS=1800000, FILE_LIMIT=64*1024**2, LOG_LIMIT=16*1024**2;
export const LIMITS=Object.freeze({inclusiveSeconds:1800,maximumAggregateRssBytes:2*1024**3,
  maximumRssSampleGapMs:1000,heartbeatSeconds:15,admissionFreeMemoryPercent:40,
  admissionDiskBytes:64*1024**3,stopFreeMemoryBelowPercent:20,stopDiskBelowBytes:16*1024**3,
  hostObservationSeconds:15,hostObservationTimeoutSeconds:2,maximumScientificFileBytes:FILE_LIMIT,
  maximumOutputFileBytes:FILE_LIMIT,maximumCombinedLogBytes:LOG_LIMIT,serialWorkers:1,eomWorkers:0});
export const CENSUS=Object.freeze({cells:1,pairRows:64,ordinaryPairs:56,selfZeros:8,members:8,pieceRecords:112});
export const ANALYSIS=Object.freeze({...CENSUS,comparedPairComponents:192,comparedMemberIntervals:80});
export const RANGE_FLAGS=Object.freeze(['accepted','premise_truth_authenticated','source_bytes_authenticated',
  'root_coverage_established','subject_membership_established','historical_trajectory_identity_established',
  'execution_authorized','metrics_available','score_authorized','h3_evidence_eligible']);
export const CANDIDATE_FLAGS=Object.freeze(['historicalTrajectoryIdentityEstablished','metricsAvailable','scoreAuthorized',
  'h3EvidenceEligible','eomExecuted','rootsEvaluated','independentRangeComparisonPassed','executionAuthorized']);
const base='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/';
export let FIXED;
export const SOURCE_MAP = "reference/priorities/development-process-review/contracts/option-b-f6c-acceleration-sources.jsonld";
const SOURCE_READER = "scripts/equation-mapping/current-source-manifest.mjs";
export let EVIDENCE_PINS;
export let SOURCE_BINDINGS;
let sourceRecords, sourceMapBinding;
let productionAdmission;
export async function initializeSourceBindings(root, expectedMapDigest) {
 const heldIdentities=new Map();
 const fileIdentity=p=>{const v=lstatSync(p,{bigint:true});return [v.dev,v.ino,v.size,v.mtimeNs,v.ctimeNs].join(':');};
 const checkReadIdentities=()=>{for(const [p,expected] of heldIdentities)check(fileIdentity(p)===expected,'selected production source replaced: '+p);};
 const readSelected=(p,...args)=>{
   check(realpathSync(p)===p,'canonical production source required');
   const before=fileIdentity(p);
   check(!heldIdentities.has(p)||heldIdentities.get(p)===before,'selected production source replaced: '+p);
   heldIdentities.set(p,before);const value=readBound(p,...args);
   check(fileIdentity(p)===before,'selected production source replaced during capture: '+p);return value;
 };

  SOURCE_BINDINGS = undefined; sourceRecords = undefined; sourceMapBinding = undefined;
  check(hash(expectedMapDigest), "externally selected source-map digest required");
  check(realpathSync(root) === root, "canonical Option B repository root required");
  const readSource = (filename,...args) => {check(realpathSync(filename) === filename,"source symlink or path escape");return readSelected(filename,...args);};
  const captured = readSource(path.join(root, SOURCE_MAP), expectedMapDigest, true, 1024**2);
  const metadata = JSON.parse(captured.data);
  const readers = metadata["@graph"]?.filter(row => row.role === "manifest-reader" && row.binding?.path === SOURCE_READER);
  check(readers?.length === 1 && hash(readers[0].binding.sha256), "exact manifest reader identity required");
  const reader = readSource(path.join(root, SOURCE_READER), readers[0].binding.sha256, true, 1024**2);
  const module = await import("data:text/javascript;base64," + reader.data.toString("base64"));
  const admitted = module.admit(captured.data, {root, readBound:readSource, scope:"f6c-acceleration-pilot-current-source"});

 const productionPath='scripts/eom/f6c-production-admission.mjs';
 const productionBinding=admitted.bindings.find(b=>path.resolve(b.path)===path.join(root,productionPath));
 check(productionBinding,'selected F6c production admission helper required');
 const productionCapture=readSelected(productionBinding.path,productionBinding.sha256,true,1024**2);
 const productionModule=await import('data:text/javascript;base64,'+productionCapture.data.toString('base64'));
 productionAdmission=await productionModule.admitF6cProduction({root,consumer:ENTRY,bindings:admitted.bindings,
   readBound:(p,h,collect)=>readSelected(p,h,collect,1024**3),
   check:()=> (checkReadIdentities(),checkOperationalBindings([clean(captured),clean(reader),clean(productionCapture),...admitted.bindings]))});
 initializeProductionIdentities(productionAdmission.identities(ENTRY));
  // Capture-to-use closure: reject a manifest or reader replaced while validating.
  checkBindings([clean(captured), clean(reader), ...admitted.bindings]);
  sourceRecords = admitted.bindings; sourceMapBinding = clean(captured);
  SOURCE_BINDINGS = Object.freeze({...admitted.pins, ...EVIDENCE_PINS});
  return {sourceMap:sourceMapBinding, sources:sourceRecords};
}
function requireSourceBindings() {
  check(SOURCE_BINDINGS && sourceRecords && sourceMapBinding, "Option B source admission required");
}

export const check=(ok,message)=>{if(!ok)throw new Error(message);};
export const sha=b=>createHash('sha256').update(b).digest('hex');
export const clean=({data,...b})=>b;
export const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/u.test(x);
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,x[k]])):x);
export const equal=(a,b)=>canonical(a)===canonical(b);
const closed=(o,fields,label)=>check(o&&typeof o==='object'&&!Array.isArray(o)&&equal(Object.keys(o).sort(),[...fields].sort()),'closed '+label+' required');
const positive=(n,max)=>Number.isSafeInteger(n)&&n>0&&n<=max;
const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');

// Metadata parser with duplicate-key, Unicode, finite-number and depth limits.
export function decode(bytes,limit=FILE_LIMIT) {
  check(Buffer.isBuffer(bytes)&&bytes.length>0&&bytes.length<=limit,'bounded JSON bytes');
  const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);let at=0,nodes=0;
  const space=()=>{while(/[\x20\t\r\n]/u.test(text[at]??'!'))at++;};
  function string(){const start=at++;while(at<text.length){const c=text[at++];if(c==='"')return JSON.parse(text.slice(start,at));if(c==='\\')at++;}throw Error('unterminated string');}
  function item(depth){check(depth<=128&&++nodes<=1000000,'JSON structure limit');space();const c=text[at];if(c==='"')return string();
    if(c==='{'||c==='['){at++;const object=c==='{',result=object?Object.create(null):[],seen=new Set();space();if(text[at]===(object?'}':']')){at++;return result;}
      while(true){space();let key;if(object){check(text[at]==='"','JSON key');key=string();check(!seen.has(key),'duplicate JSON key');seen.add(key);space();check(text[at++]===':','JSON colon');}
        const v=item(depth+1);if(object)result[key]=v;else result.push(v);space();const end=text[at++];if(end===(object?'}':']'))return result;check(end===',','JSON delimiter');}}
    const m=/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/u.exec(text.slice(at));check(m,'JSON token');at+=m[0].length;const v=JSON.parse(m[0]);
    check(typeof v!=='number'||(Number.isFinite(v)&&(!Number.isInteger(v)||Number.isSafeInteger(v))),'unsafe JSON number');return v;}
  const value=item(0);space();check(at===text.length,'trailing JSON bytes');return value;
}
export function readBound(filename,expected,collect=false,limit=collect?FILE_LIMIT:1024**3,live=()=>{}) {
  check(typeof filename==='string'&&path.isAbsolute(filename)&&path.resolve(filename)===filename,'canonical absolute input');
  check(expected===undefined||hash(expected),'expected hash');live();check(realpathSync(filename)===filename,'symlink input');
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try{const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size>=0n&&before.size<=BigInt(limit),'regular input byte bound');
    const digest=createHash('sha256'),buffer=Buffer.alloc(65536),chunks=[];let count=0;
    while(count<Number(before.size)){live();const n=readSync(fd,buffer,0,Math.min(buffer.length,Number(before.size)-count),count);check(n>0,'truncated input');count+=n;digest.update(buffer.subarray(0,n));if(collect)chunks.push(Buffer.from(buffer.subarray(0,n)));}
    const value=digest.digest('hex');check(identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename&&(!expected||value===expected),'changed input/hash: '+filename);live();
    return {path:filename,sha256:value,bytes:count,...(collect?{data:Buffer.concat(chunks)}:{})};
  }finally{closeSync(fd);}
}
function checkOperationalBindings(items,live=()=>{}) {return items.map(b=>{const actual=readBound(b.path,b.sha256,false,b.path.endsWith('.json')||b.path.endsWith('.ndjson')?FILE_LIMIT:1024**3,live);check(b.bytes===undefined||actual.bytes===b.bytes,'binding byte count');return clean(actual);});}
export function writeNew(filename,value,limit=FILE_LIMIT,live=()=>{}) {
  live();check(realpathSync(path.dirname(filename))===path.dirname(filename),'canonical output parent');const bytes=Buffer.from(JSON.stringify(value)+'\n');check(bytes.length<=limit,'output byte limit');
  const fd=openSync(filename,'wx',0o600);try{let at=0;while(at<bytes.length){live();const n=writeSync(fd,bytes,at);check(n>0,'short output write');at+=n;}fsyncSync(fd);}finally{closeSync(fd);}
  const directory=openSync(path.dirname(filename),'r');try{fsyncSync(directory);}finally{closeSync(directory);}live();return clean(readBound(filename,sha(bytes),false,limit,live));
}
function binding(b){closed(b,['path','sha256','bytes'],'binding');check(typeof b.path==='string'&&b.path.length>0&&b.path.length<4096&&hash(b.sha256)&&positive(b.bytes,1024**3),'bounded binding');}
function bindings(rows){check(Array.isArray(rows)&&rows.length>0&&rows.length<=256,'bounded binding list');rows.forEach(binding);check(new Set(rows.map(b=>b.path)).size===rows.length,'duplicate binding path');}
const absolute=(b,root)=>({...b,path:path.resolve(root,b.path)});
export function validatePlan(plan,root,launcherSha,entrySha,python,git) {
  requireSourceBindings();
  check(hash(CHECKER_SHA)&&hash(CHECKER_TESTS_SHA),'independent checker review/pins incomplete');
  closed(plan,['schema','scope','consumer','controls','declaration','rangeVerifier','runtimeBindings','operationalBindings','limits','priorCoverClosure','declarationInput','executionBridge','historicalInputs'],'plan');
  check(plan.schema==='braid-program/f6c-continuous-reception-acceleration-launch.v2'&&plan.scope===SCOPE&&equal(plan.limits,LIMITS),'fixed scope/limits');
  for(const [key,p] of [['consumer',CONSUMER],['controls',CONSUMER_TESTS],['declaration',DECLARATION],['rangeVerifier',CHECKER]]){binding(plan[key]);check(plan[key].path===p&&plan[key].sha256===SOURCE_BINDINGS[p],'reviewed subject/checker binding');}
  binding(plan.executionBridge);check(plan.executionBridge.path===BRIDGE&&plan.executionBridge.sha256===SOURCE_BINDINGS[BRIDGE],'reviewed bridge required');
  const route=plan.declarationInput;closed(route,['originalPath','path','sha256','bytes'],'declaration route');
  const {originalPath,...physical}=route;binding(physical);
  check(originalPath===DECLARATION&&physical.sha256===SOURCE_BINDINGS[DECLARATION]&&physical.bytes===plan.declaration.bytes,'original declaration identity');
  check(!path.isAbsolute(physical.path)&&path.normalize(physical.path)===physical.path&&!physical.path.split('/').includes('..')&&physical.path.startsWith('reference/')&&physical.path.endsWith('.source'),'nonexecuting declaration archive');
  check(Array.isArray(plan.historicalInputs)&&plan.historicalInputs.length===HISTORICAL.length,'exact historical theorem routes');
  plan.historicalInputs.forEach((r,i)=>{closed(r,['role','originalPath','path','sha256','bytes'],'historical route');const [role,p,h,n]=HISTORICAL[i];check(r.role===role&&r.originalPath===p&&r.sha256===h&&r.bytes===n,'original theorem identity');check(typeof r.path==='string'&&!path.isAbsolute(r.path)&&path.normalize(r.path)===r.path&&!r.path.split('/').includes('..')&&r.path.startsWith('reference/')&&r.path.endsWith('.source'),'nonexecuting theorem archive');});
  check(new Set([plan.declarationInput.path,...plan.historicalInputs.map(r=>r.path)]).size===HISTORICAL.length+1,'conflicting archive routes');
  bindings(plan.runtimeBindings);bindings(plan.operationalBindings);
  check(plan.operationalBindings.filter(b=>equal(b,plan.executionBridge)).length===1,'bridge execution census');
  check(realpathSync(root)===root&&hash(entrySha)&&hash(launcherSha),'canonical reviewed composition');
  check(path.isAbsolute(python)&&path.resolve(python)===python&&path.isAbsolute(git)&&realpathSync(git)===git,'explicit interpreter/Git invocation');
  const runtime=plan.runtimeBindings.map(b=>path.resolve(root,b.path));
  check(runtime.includes(realpathSync(python))&&runtime.includes(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'))&&runtime.includes(git),'shared interpreter/venv/Git absent');
  const node=realpathSync(process.execPath);
  const ops=[BRIDGE,BRIDGE_TESTS,ENTRY,LAUNCHER,TESTS,PROCESS_TESTS,HELPERS,OUTER,CHECKER_TESTS,'/bin/ps','/usr/bin/memory_pressure',node];
  check(equal(plan.operationalBindings.map(b=>b.path).sort(),ops.sort()),'exact operational source/control closure');
  for(const b of plan.operationalBindings){const expected=b.path===ENTRY?entrySha:b.path===LAUNCHER?launcherSha:SOURCE_BINDINGS[b.path];if(expected)check(b.sha256===expected,'operational generation differs');}
  check(equal(plan.priorCoverClosure,{authority:'externally-reviewed-caller-observation',ownerSha256:SOURCE_BINDINGS[FIXED[9][1]],admissionSha256:SOURCE_BINDINGS[FIXED[5][1]],
    matchingFreshCompletionObserved:true,exitCode:0,elapsedSeconds:'8.534247625',processesClosed:true,independentAuditAccepted:true}),'prior externally observed closure');return plan;
}
export function planBindings(plan,root) {
  requireSourceBindings();
  const rows=[sourceMapBinding,...sourceRecords,...FIXED.map(([role,p,h])=>{const r=plan.historicalInputs.find(r=>r.role===role);return r?{path:path.join(root,r.path),sha256:r.sha256,bytes:r.bytes}:{path:path.join(root,p),sha256:h};}),...['consumer','controls','rangeVerifier'].map(k=>absolute(plan[k],root)),absolute({path:plan.declarationInput.path,sha256:plan.declarationInput.sha256,bytes:plan.declarationInput.bytes},root),
    ...plan.runtimeBindings.map(b=>absolute(b,root)),...plan.operationalBindings.map(b=>absolute(b,root))],map=new Map();
  for(const row of rows){const old=map.get(row.path);check(!old||(old.sha256===row.sha256&&(old.bytes===undefined||row.bytes===undefined||old.bytes===row.bytes)),'conflicting binding');map.set(row.path,{...old,...row});}return [...map.values()];
}
export function remainingSeconds(deadline){const ns=BigInt(deadline)-process.hrtime.bigint();check(ns>0n&&ns<=1800000000000n,'remaining inclusive deadline');return `${ns/1000000000n}.${String(ns%1000000000n).padStart(9,'0')}`;}
export function outputPaths(root,output){check(path.dirname(output)===path.join(root,LANE)&&realpathSync(path.dirname(output))===path.dirname(output),'canonical direct output child');return {candidate:path.join(output,'range.json'),operations:output+'-outer',comparison:path.join(output+'-outer','comparison.json')};}
export const PYTHON_BOOTSTRAP=String.raw`import os,sys,stat,hashlib,resource as _accounting,json as _json
import base64 as _production_base64,types as _production_types
_production_envelope=__import__('json').loads(sys.argv[3]);sys.argv.pop(3)
assert set(_production_envelope)=={'root','target','identities','bridgePath','bridgeSha256','bridgeSource'}
_production_bridge_raw=_production_base64.b64decode(_production_envelope['bridgeSource'],validate=True)
assert hashlib.sha256(_production_bridge_raw).hexdigest()==_production_envelope['bridgeSha256']
_production_bridge=_production_types.ModuleType('_f6c_admitted_production_bridge')
_production_bridge.__file__=os.path.join(_production_envelope['root'],_production_envelope['bridgePath'])
sys.modules[_production_bridge.__name__]=_production_bridge
exec(compile(_production_bridge_raw,_production_bridge.__file__,'exec',dont_inherit=True),_production_bridge.__dict__)
OPTION_B_PRODUCTION_IDENTITIES=tuple(_production_envelope['identities'])
for _production_name in ('production_identities','production_source_pair','production_recheck','production_historical_record','production_runtime_binding','production_original_source_binding'):
 globals()[_production_name]=getattr(_production_bridge,_production_name)
assert production_identities(os.path.join(_production_envelope['root'],_production_envelope['target']))==OPTION_B_PRODUCTION_IDENTITIES
filename,expected=sys.argv[1:3];sys.argv=[filename,*sys.argv[3:]]
fd=os.open(filename,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
try:
 before=os.fstat(fd);assert stat.S_ISREG(before.st_mode) and 0<before.st_size<=67108864
 parts=[];size=0
 while size<before.st_size:
  part=os.read(fd,min(65536,before.st_size-size));assert part;parts.append(part);size+=len(part)
 raw=b''.join(parts);after=os.fstat(fd);current=os.stat(filename,follow_symlinks=False)
 identity=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
 assert identity(before)==identity(after)==identity(current) and hashlib.sha256(raw).hexdigest()==expected
finally:os.close(fd)
globals()['__file__']=filename
exec(compile(raw,filename,'exec',dont_inherit=True),globals())
_self=_accounting.getrusage(_accounting.RUSAGE_SELF);_children=_accounting.getrusage(_accounting.RUSAGE_CHILDREN)
print(_json.dumps({'kind':'f6c-range-python-process-resources','userSeconds':_self.ru_utime,'systemSeconds':_self.ru_stime,'waitedChildUserSeconds':_children.ru_utime,'waitedChildSystemSeconds':_children.ru_stime,'maximumIndividualResidentBytes':_self.ru_maxrss if sys.platform=='darwin' else _self.ru_maxrss*1024}),file=sys.stderr,flush=True)
`;
export const PYTHON_RUNTIME_INVENTORY=String.raw`import __future__,argparse,contextlib,dataclasses,decimal,fractions,hashlib,itertools,json,os,pathlib,re,resource,signal,stat,subprocess,sys,tempfile,time,types,collections.abc,typing
argparse.ArgumentParser().parse_args([])
# Metadata only: bounded public integer division loads its lazy stdlib helper
# before the file census. No scientific module, history or reference is used.
inventory_quotient=(10**20000+1)//(10**15000+3)
files={pathlib.Path(sys.executable).resolve()}
for module in tuple(sys.modules.values()):
 for key in ('__file__','__cached__'):
  value=getattr(module,key,None)
  if type(value) is str:
   p=pathlib.Path(value).resolve()
   if p.is_file():files.add(p)
print(json.dumps({'schema':'braid-program/f6c-acceleration-python-runtime-inventory.v1','scientificDataLoaded':False,'scientificModulesExecuted':False,'pythonInvocation':sys.executable,'pythonRealPath':str(pathlib.Path(sys.executable).resolve()),'files':[str(p) for p in sorted(files)]}))
`;
export function stageSpec({stage,plan,planBinding,root,output,python,git,candidate,budget}) {
  requireSourceBindings();
  check(stage==='consumer'||stage==='comparison','unknown stage');check(typeof budget==='string'&&/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(budget)&&Number(budget)>0&&Number(budget)<=1800,'positive stage budget');
  const paths=outputPaths(root,output);
  const args=['-I','-B','-c',PYTHON_BOOTSTRAP,path.join(root,BRIDGE),SOURCE_BINDINGS[BRIDGE],productionAdmission.pythonEnvelope(BRIDGE),'--stage',stage,'--bridge-sha256',SOURCE_BINDINGS[BRIDGE],'--plan',planBinding.path,'--plan-sha256',planBinding.sha256,'--out',stage==='consumer'?paths.candidate:paths.comparison];
  if(stage==='consumer')args.push('--git-binary',git);
  else{binding(candidate);check(candidate.path===paths.candidate,'preceding exact candidate required');args.push('--candidate',candidate.path,'--candidate-sha256',candidate.sha256);}
  args.push('--budget-seconds',budget);return {command:python,args};
}
export async function runSingleStage(spec,{root=process.cwd(),out=process.stdout,err=process.stderr,spawnImpl=spawn,timeoutMs}={}) {
  check(timeoutMs===undefined||(Number.isInteger(timeoutMs)&&timeoutMs>0&&timeoutMs<=5000),'metadata timeout');
  const child=spawnImpl(spec.command,spec.args,{cwd:root,detached:true,stdio:['ignore','pipe','pipe']});let count=0,failure,timer;
  const forward=stream=>bytes=>{count+=bytes.length;if(count>LOG_LIMIT){failure??=Error('combined stage log limit');child.kill('SIGTERM');return;}try{stream.write(bytes);}catch(error){failure??=error;child.kill('SIGTERM');}};
  child.stdout.on('data',forward(out));child.stderr.on('data',forward(err));
  if(timeoutMs!==undefined)timer=setTimeout(()=>{failure??=Error('metadata timeout');child.kill('SIGKILL');},timeoutMs);
  let result;try{result=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}));});}finally{clearTimeout(timer);}
  check(!failure&&result.code===0&&result.signal===null,failure?.message??'target did not close cleanly');return {completed:true,accepted:false,logBytes:count};
}
const falseClaims=(o,names)=>{closed(o,names,'claim set');check(names.every(k=>o[k]===false),'promoted claim');};
function sourceMap(job){const byPath=new Map(job.sources.map(b=>[b.path,b]));return Object.fromEntries(FIXED.map(([role,p])=>{const r=job.plan.historicalInputs.find(r=>r.role===role);const b=byPath.get(path.join(job.root,r?.path??p));check(b,'missing fixed source');return [role,{...b,path:path.join(job.root,p)}];}));}
function resourceEvents(filename){const raw=readBound(filename,undefined,true,LOG_LIMIT),events=raw.data.toString('utf8').split('\n').flatMap(line=>{try{return [JSON.parse(line)];}catch{return [];}});
  const one=kind=>{const matches=events.filter(x=>x?.kind===kind);check(matches.length===1,'single resource event required');return matches[0];};
  const python=one('f6c-range-python-process-resources'),entry=one('f6c-range-entry-process-resources');
  for(const k of ['userSeconds','systemSeconds','waitedChildUserSeconds','waitedChildSystemSeconds'])check(Number.isFinite(python[k])&&python[k]>=0,'finite Python CPU');
  check(positive(python.maximumIndividualResidentBytes,Number.MAX_SAFE_INTEGER),'individual Python RSS');
  check(entry.resourceUsage&&['userCPUTime','systemCPUTime','maxRSS'].every(k=>Number.isSafeInteger(entry.resourceUsage[k])&&entry.resourceUsage[k]>=0),'entry resource event');
  return {python,entry,stderr:clean(raw),scope:'Python lifetime self and waited-child CPU; entry self CPU; individual RSS, not aggregate memory'};}
export function admitStage(job) {
  const {stage,processReceipt,plan,planBinding,root,output}=job,paths=outputPaths(root,output);
  check(processReceipt.accepted===false&&processReceipt.processesClosed===true&&processReceipt.exit?.code===0&&processReceipt.exit.signal===null,'fresh registered closure required');
  check(processReceipt.gates?.length===1,'one registered target');const gate=processReceipt.gates[0],args=gate.requestedArgs;
  check(Array.isArray(args)&&args.at(-2)==='--budget-seconds','actual stage budget absent');const spec=stageSpec({...job,budget:args.at(-1)});
  check(gate.acknowledged===true&&gate.target&&gate.measurement?.code===0&&gate.measurement.signal===null&&gate.requestedCommand===spec.command&&equal(args,spec.args),'gate target/arguments differ');
  const stdout=job.stdout??clean(readBound(job.stdoutPath,undefined,false,LOG_LIMIT));const raw=readBound(stdout.path,stdout.sha256,true,LOG_LIMIT);check(raw.bytes===stdout.bytes,'stdout byte count');
  const lines=raw.data.toString('utf8').trim().split('\n');check(lines.length===1,'one fresh completion');const completion=decode(Buffer.from(lines[0]),LOG_LIMIT);
  check(completion.completed===true&&completion.scope===SCOPE&&completion.h3EvidenceEligible===false&&Number.isFinite(completion.elapsedSeconds)&&completion.elapsedSeconds>=0&&completion.elapsedSeconds<1800&&completion.externalInclusiveDeadlineAndProcessClosureRequired===true,'fresh completion scope/deadline');
  binding(completion.output);check(completion.output.bytes<=FILE_LIMIT,'output size');checkBindings([completion.output]);
  const record=decode(readBound(completion.output.path,completion.output.sha256,true).data),fixed=sourceMap(job);
  if(stage==='consumer'){
    check(completion.accepted===false&&completion.output.path===paths.candidate&&completion.conditionalCells===1&&completion.pairRows===64&&completion.ordinaryPairs===56&&completion.selfZeros===8&&completion.members===8&&completion.independentComparisonRequired===true&&completion.metricsAvailable===false&&completion.scoreAuthorized===false,'consumer completion');
    for(const k of ['processUserSeconds','processSystemSeconds'])check(Number.isFinite(completion[k])&&completion[k]>=0,'consumer measured CPU');
    check(positive(completion.maximumIndividualProcessResidentBytes,Number.MAX_SAFE_INTEGER),'consumer measured RSS');
    check(record.schema==='braid-program/f6c-continuous-reception-acceleration-candidate.v1'&&record.scope===SCOPE&&record.accepted===false&&record.status==='conditional-range-candidate'&&equal(record.census,CENSUS),'complete unpromoted candidate');
    check(equal(record.launchPlan,planBinding)&&equal(record.fixedBindings,fixed)&&equal(record.consumer,absolute(plan.consumer,root))&&equal(record.declaration,plan.declaration)&&equal(record.rangeVerifier,plan.rangeVerifier)&&equal(record.priorCoverClosure,plan.priorCoverClosure)&&equal(record.runtimeBindings,plan.runtimeBindings)&&equal(record.operationalBindings,plan.operationalBindings),'candidate source chain');
    falseClaims(record.claims,CANDIDATE_FLAGS);falseClaims(record.ranges?.claims,RANGE_FLAGS);
  }else{
    check(completion.accepted===true&&completion.output.path===paths.comparison&&completion.eomExecuted===false&&equal(completion.analysis,ANALYSIS),'checker completion');
    check(record.schema==='braid-program/f6c-continuous-reception-acceleration-conformance.v1'&&record.accepted===true&&record.scope===SCOPE&&record.authority==='independent original-mapping and exact-rational conditional range containment only'&&equal(record.analysis,ANALYSIS),'conditional range comparison');
    const subjectSources=Object.fromEntries(['consumer','controls','declaration','rangeVerifier'].map(k=>[k,absolute(plan[k],root)]));
    check(equal(record.candidate,job.candidate)&&equal(record.launchPlan,planBinding)&&equal(record.verifier,subjectSources.rangeVerifier)&&equal(record.subjectSources,subjectSources)&&equal(record.fixedBindings,fixed)&&equal(record.executionBindings,[...plan.runtimeBindings,...plan.operationalBindings].map(b=>absolute(b,root)))&&equal(record.priorCoverClosure,plan.priorCoverClosure),'checker source/candidate chain');
    check(record.publicationRequires==='matching fresh successful completion, externally observed inclusive deadline and owned-process closure','checker external admission boundary');
    check(Number.isFinite(record.elapsedSecondsBeforePublication)&&record.elapsedSecondsBeforePublication>=0&&record.elapsedSecondsBeforePublication<=completion.elapsedSeconds,'checker publication timing');
    falseClaims(record.referenceClaims,RANGE_FLAGS);falseClaims(record.candidateClaims,CANDIDATE_FLAGS);
  }
  const resources=resourceEvents(path.join(paths.operations,stage+'-process/runner-stderr.log'));checkBindings(job.sources);
  return {accepted:true,h3EvidenceEligible:false,stage,completion,completionLog:stdout,resources,outputs:[completion.output],
    mathematicalAuthority:stage==='comparison'?'frozen independent conditional range-output conformance only':'none; candidate pending independent comparison'};
}
export function fileOperation(job) {
  const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'inclusive file operation deadline');live();
  if(job.kind==='preflight'){
    const captured=readBound(job.planPath,job.planSha256,true,1024**2,live),plan=decode(captured.data,1024**2);
    validatePlan(plan,job.root,job.launcherSha256,job.entrySha256,job.python,job.git);
    const sources=checkBindings([...planBindings(plan,job.root),clean(captured)],live);return {plan,planBinding:clean(captured),sources};}
  if(job.kind==='recheck')return checkBindings(job.sources,live);
  if(job.kind==='admit'){const result=admitStage(job);live();return result;}
  if(job.kind==='finalize'){check(job.record.accepted===true&&job.record.processesClosed===true&&job.record.stages?.length===2,'completed two-stage admission');checkBindings(job.sources,live);checkBindings(job.evidence,live);return writeNew(path.join(job.output+'-outer','pilot-admission.json'),job.record,1024**2,live);}
  throw Error('unknown file operation');
}
async function main(argv){
  if(argv[0]==='--runtime-inventory'){check(argv.length===2&&path.isAbsolute(argv[1]),'explicit shared Python inventory invocation');return runSingleStage({command:argv[1],args:['-I','-B','-c',PYTHON_RUNTIME_INVENTORY]},{timeoutMs:5000});}
  const v={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!v[argv[i]],'unique stage argument');v[argv[i]]=argv[i+1];}
  closed(v,['--source-map-sha256','--plan','--plan-sha256','--entry-sha256','--launcher-sha256','--stage','--out','--deadline-ns','--candidate-sha256','--python','--git-binary'],'stage arguments');
  const root=realpathSync(process.cwd());
  await initializeSourceBindings(root,v['--source-map-sha256']);
  const p=readBound(path.resolve(v['--plan']),v['--plan-sha256'],true,1024**2),plan=decode(p.data,1024**2);
  validatePlan(plan,root,v['--launcher-sha256'],v['--entry-sha256'],v['--python'],v['--git-binary']);const sources=[...planBindings(plan,root),clean(p)];checkBindings(sources);
  const output=path.resolve(v['--out']),paths=outputPaths(root,output),stage=v['--stage'];check(realpathSync(paths.operations)===paths.operations,'canonical owned operations sibling');
  const candidate=stage==='comparison'?clean(readBound(paths.candidate,v['--candidate-sha256'])):null;
  check(stage!=='consumer'||(v['--candidate-sha256']==='none'&&!existsSync(output)),'consumer requires absent original output');
  await runSingleStage(stageSpec({stage,plan,planBinding:clean(p),root,output,python:v['--python'],git:v['--git-binary'],candidate,budget:remainingSeconds(v['--deadline-ns'])}));
  checkBindings(sources);remainingSeconds(v['--deadline-ns']);console.error(JSON.stringify({kind:'f6c-range-entry-process-resources',resourceUsage:process.resourceUsage()}));
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});

let OPTION_B_PRODUCTION_IDENTITIES;
export function initializeProductionIdentities(values) {
  if (!Array.isArray(values) || values.length !== 31 || values.some(value => typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value))) throw Error("exact admitted production identity census required");
  if (OPTION_B_PRODUCTION_IDENTITIES && JSON.stringify(OPTION_B_PRODUCTION_IDENTITIES) !== JSON.stringify(values)) throw Error("production identity generation already initialized");
  OPTION_B_PRODUCTION_IDENTITIES = Object.freeze([...values]);
  HISTORICAL=[["rootTheorem","reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md",OPTION_B_PRODUCTION_IDENTITIES[0],28340],["reconstructionTheorem","reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md",OPTION_B_PRODUCTION_IDENTITIES[1],21031]];
  CHECKER_SHA=OPTION_B_PRODUCTION_IDENTITIES[2];
  CHECKER_TESTS_SHA=OPTION_B_PRODUCTION_IDENTITIES[3];
  FIXED=Object.freeze([
  ['export','.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json',OPTION_B_PRODUCTION_IDENTITIES[4]],
  ['reconstruction','.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json',OPTION_B_PRODUCTION_IDENTITIES[5]],
  ['guards','.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json',OPTION_B_PRODUCTION_IDENTITIES[6]],
  ['manifest',base+'subject/cover-manifest.json',OPTION_B_PRODUCTION_IDENTITIES[7]],
  ['comparison',base+'comparison.json',OPTION_B_PRODUCTION_IDENTITIES[8]],
  ['admission',base+'pilot-admission.json',OPTION_B_PRODUCTION_IDENTITIES[9]],
  ['rows',base+'subject/rows.ndjson',OPTION_B_PRODUCTION_IDENTITIES[10]],
  ['pieces',base+'subject/pieces.ndjson',OPTION_B_PRODUCTION_IDENTITIES[11]],
  ['priorPlan','reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json',OPTION_B_PRODUCTION_IDENTITIES[12]],
  ['priorClosureOwner','reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md',OPTION_B_PRODUCTION_IDENTITIES[13]],
  ['reference','scripts/eom/oracle/continuous_reception_acceleration.py',OPTION_B_PRODUCTION_IDENTITIES[14]],
  ['referenceControls','tests/test_eom_continuous_reception_acceleration.py',OPTION_B_PRODUCTION_IDENTITIES[15]],
  ['referenceProof','reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md',OPTION_B_PRODUCTION_IDENTITIES[16]],
  ['memberPredeclaration','reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md',OPTION_B_PRODUCTION_IDENTITIES[17]],
  ['rootTheorem','reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md',OPTION_B_PRODUCTION_IDENTITIES[18]],
  ['reconstructionTheorem','reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md',OPTION_B_PRODUCTION_IDENTITIES[19]],
].map(Object.freeze));
  EVIDENCE_PINS = Object.freeze({
  ".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json": OPTION_B_PRODUCTION_IDENTITIES[20],
  ".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json": OPTION_B_PRODUCTION_IDENTITIES[21],
  ".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json": OPTION_B_PRODUCTION_IDENTITIES[22],
  ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/cover-manifest.json": OPTION_B_PRODUCTION_IDENTITIES[23],
  ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/comparison.json": OPTION_B_PRODUCTION_IDENTITIES[24],
  ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/pilot-admission.json": OPTION_B_PRODUCTION_IDENTITIES[25],
  ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/rows.ndjson": OPTION_B_PRODUCTION_IDENTITIES[26],
  ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/subject/pieces.ndjson": OPTION_B_PRODUCTION_IDENTITIES[27],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json": OPTION_B_PRODUCTION_IDENTITIES[28],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md": OPTION_B_PRODUCTION_IDENTITIES[29],
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md": OPTION_B_PRODUCTION_IDENTITIES[30]
});
}

export function checkBindings(...args){productionAdmission?.check();return checkOperationalBindings(...args);}

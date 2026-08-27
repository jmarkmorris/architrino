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

export const ENTRY='scripts/eom/run-f6c-acceleration-pilot.mjs';
export const LAUNCHER='scripts/eom/launch-f6c-acceleration-pilot.mjs';
export const TESTS='tests/f6c-acceleration-pilot.test.js';
export const PROCESS_TESTS='tests/f6c-acceleration-pilot-process.test.js';
export const HELPERS='scripts/eom/launch-prescribed-response-pilot.mjs';
export const OUTER='scripts/eom/launch-abc-enclosed-root-pilot.mjs';
export const CONSUMER='scripts/eom/prepare-f6c-continuous-reception-acceleration.py';
export const CONSUMER_TESTS='tests/test_f6c_continuous_reception_acceleration_preparation.py';
export const DECLARATION='reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-predeclaration.md';
export const CHECKER='scripts/eom/verify-f6c-continuous-reception-acceleration.py';
export const CHECKER_TESTS='tests/test_f6c_continuous_reception_acceleration.py';
// Separately authored checker and controls, independently accepted before this
// operational generation. No subject or mathematical reference is altered.
export const CHECKER_SHA='cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299';
export const CHECKER_TESTS_SHA='be741dccccd90c349849b19dc15df1acd4ea5752ec6f8a9e98e7ae14013c52c6';
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
export const FIXED=Object.freeze([
  ['export','.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json','f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1'],
  ['reconstruction','.local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json','7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43'],
  ['guards','.local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json','86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880'],
  ['manifest',base+'subject/cover-manifest.json','19fae257f7f36d858fa60d9031125b3f29dbb8780e944802699aab5292275f4c'],
  ['comparison',base+'comparison.json','6bf2b50ef4f0b46f43ae77a9881f82a2f9d504d5df757bc0ad215deb8eac36c6'],
  ['admission',base+'pilot-admission.json','1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee'],
  ['rows',base+'subject/rows.ndjson','786785b2597bcdf024e350ba89c129fb32115afed693169a6db3137c6bdca383'],
  ['pieces',base+'subject/pieces.ndjson','2c064a5956e7684868cbda7aa7e312ac609e07760bf67f1cf121c934d6d4c411'],
  ['priorPlan','reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-pilot-launch.v1.json','5f5afcced38878828d65e0c5482f1764092f6449c2cba36ac6b99a1bbf9f9f86'],
  ['priorClosureOwner','reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md','daeb71bee6260c38a6b7e5e6237110216d9315807fe23602fbd7cfcdddc5866b'],
  ['reference','scripts/eom/oracle/continuous_reception_acceleration.py','abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8'],
  ['referenceControls','tests/test_eom_continuous_reception_acceleration.py','26b7c5455a57da5beba6e7fd32a0b7bfbc8e1f32630b663c55a33273e8cc1823'],
  ['referenceProof','reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-acceleration-reference.md','c1a5358e1d887fab5b4753368dc14ec59ed220294f42d2afa4ac40f962ee537f'],
  ['memberPredeclaration','reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md','c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853'],
  ['rootTheorem','reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md','f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68'],
  ['reconstructionTheorem','reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md','6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936'],
].map(Object.freeze));
export const PINS=Object.freeze({...Object.fromEntries(FIXED.map(([,p,h])=>[p,h])),
  [CONSUMER]:'dca5f5b3b42b42347b0b6b49a8974663169171e2293c1eca9c4b4a8c7646a53e',
  [CONSUMER_TESTS]:'616a4e9c464e95607140dd90b47a8288ae73183f74faa0cc5078b81b8c8767c8',
  [DECLARATION]:'3ef8fb9020bae71833b1e06a119672b49a4beb5395f697dcb3d037d088e7891e',
  [OUTER]:'5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa',
  [HELPERS]:'a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9',
  [CHECKER]:CHECKER_SHA,[CHECKER_TESTS]:CHECKER_TESTS_SHA,
  '/usr/bin/memory_pressure':'a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56'});
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
export function checkBindings(items,live=()=>{}) {return items.map(b=>{const actual=readBound(b.path,b.sha256,false,b.path.endsWith('.json')||b.path.endsWith('.ndjson')?FILE_LIMIT:1024**3,live);check(b.bytes===undefined||actual.bytes===b.bytes,'binding byte count');return clean(actual);});}
export function writeNew(filename,value,limit=FILE_LIMIT,live=()=>{}) {
  live();check(realpathSync(path.dirname(filename))===path.dirname(filename),'canonical output parent');const bytes=Buffer.from(JSON.stringify(value)+'\n');check(bytes.length<=limit,'output byte limit');
  const fd=openSync(filename,'wx',0o600);try{let at=0;while(at<bytes.length){live();const n=writeSync(fd,bytes,at);check(n>0,'short output write');at+=n;}fsyncSync(fd);}finally{closeSync(fd);}
  const directory=openSync(path.dirname(filename),'r');try{fsyncSync(directory);}finally{closeSync(directory);}live();return clean(readBound(filename,sha(bytes),false,limit,live));
}
function binding(b){closed(b,['path','sha256','bytes'],'binding');check(typeof b.path==='string'&&b.path.length>0&&b.path.length<4096&&hash(b.sha256)&&positive(b.bytes,1024**3),'bounded binding');}
function bindings(rows){check(Array.isArray(rows)&&rows.length>0&&rows.length<=256,'bounded binding list');rows.forEach(binding);check(new Set(rows.map(b=>b.path)).size===rows.length,'duplicate binding path');}
const absolute=(b,root)=>({...b,path:path.resolve(root,b.path)});
export function validatePlan(plan,root,launcherSha,entrySha,python,git) {
  check(hash(CHECKER_SHA)&&hash(CHECKER_TESTS_SHA),'independent checker review/pins incomplete');
  closed(plan,['schema','scope','consumer','controls','declaration','rangeVerifier','runtimeBindings','operationalBindings','limits','priorCoverClosure'],'plan');
  check(plan.schema==='braid-program/f6c-continuous-reception-acceleration-launch.v1'&&plan.scope===SCOPE&&equal(plan.limits,LIMITS),'fixed scope/limits');
  for(const [key,p] of [['consumer',CONSUMER],['controls',CONSUMER_TESTS],['declaration',DECLARATION],['rangeVerifier',CHECKER]]){binding(plan[key]);check(plan[key].path===p&&plan[key].sha256===PINS[p],'reviewed subject/checker binding');}
  bindings(plan.runtimeBindings);bindings(plan.operationalBindings);
  check(realpathSync(root)===root&&hash(entrySha)&&hash(launcherSha),'canonical reviewed composition');
  check(path.isAbsolute(python)&&path.resolve(python)===python&&path.isAbsolute(git)&&realpathSync(git)===git,'explicit interpreter/Git invocation');
  const runtime=plan.runtimeBindings.map(b=>path.resolve(root,b.path));
  check(runtime.includes(realpathSync(python))&&runtime.includes(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'))&&runtime.includes(git),'shared interpreter/venv/Git absent');
  const node=realpathSync(process.execPath);
  const ops=[ENTRY,LAUNCHER,TESTS,PROCESS_TESTS,HELPERS,OUTER,CHECKER_TESTS,'/bin/ps','/usr/bin/memory_pressure',node];
  check(equal(plan.operationalBindings.map(b=>b.path).sort(),ops.sort()),'exact operational source/control closure');
  for(const b of plan.operationalBindings){const expected=b.path===ENTRY?entrySha:b.path===LAUNCHER?launcherSha:PINS[b.path];if(expected)check(b.sha256===expected,'operational generation differs');}
  check(equal(plan.priorCoverClosure,{authority:'externally-reviewed-caller-observation',ownerSha256:PINS[FIXED[9][1]],admissionSha256:PINS[FIXED[5][1]],
    matchingFreshCompletionObserved:true,exitCode:0,elapsedSeconds:'8.534247625',processesClosed:true,independentAuditAccepted:true}),'prior externally observed closure');return plan;
}
export function planBindings(plan,root) {
  const rows=[...FIXED.map(([,p,h])=>({path:path.join(root,p),sha256:h})),...['consumer','controls','declaration','rangeVerifier'].map(k=>absolute(plan[k],root)),
    ...plan.runtimeBindings.map(b=>absolute(b,root)),...plan.operationalBindings.map(b=>absolute(b,root))],map=new Map();
  for(const row of rows){const old=map.get(row.path);check(!old||(old.sha256===row.sha256&&(old.bytes===undefined||row.bytes===undefined||old.bytes===row.bytes)),'conflicting binding');map.set(row.path,{...old,...row});}return [...map.values()];
}
export function remainingSeconds(deadline){const ns=BigInt(deadline)-process.hrtime.bigint();check(ns>0n&&ns<=1800000000000n,'remaining inclusive deadline');return `${ns/1000000000n}.${String(ns%1000000000n).padStart(9,'0')}`;}
export function outputPaths(root,output){check(path.dirname(output)===path.join(root,LANE)&&realpathSync(path.dirname(output))===path.dirname(output),'canonical direct output child');return {candidate:path.join(output,'range.json'),operations:output+'-outer',comparison:path.join(output+'-outer','comparison.json')};}
export const PYTHON_BOOTSTRAP=String.raw`import os,sys,stat,hashlib,resource as _accounting,json as _json
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
  check(stage==='consumer'||stage==='comparison','unknown stage');check(typeof budget==='string'&&/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(budget)&&Number(budget)>0&&Number(budget)<=1800,'positive stage budget');
  const paths=outputPaths(root,output),source=stage==='consumer'?CONSUMER:CHECKER,digest=stage==='consumer'?PINS[CONSUMER]:plan.rangeVerifier.sha256;
  const args=['-I','-B','-c',PYTHON_BOOTSTRAP,path.join(root,source),digest,'--plan',planBinding.path,'--plan-sha256',planBinding.sha256,
    stage==='consumer'?'--consumer-sha256':'--verifier-sha256',digest];
  if(stage==='consumer')args.push('--out-dir',output,'--git-binary',git);
  else{binding(candidate);check(candidate.path===paths.candidate,'preceding exact candidate required');args.push('--candidate',candidate.path,'--candidate-sha256',candidate.sha256,'--out',paths.comparison);}
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
function sourceMap(job){const byPath=new Map(job.sources.map(b=>[b.path,b]));return Object.fromEntries(FIXED.map(([role,p])=>{const b=byPath.get(path.join(job.root,p));check(b,'missing fixed source');return [role,b];}));}
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
  closed(v,['--plan','--plan-sha256','--entry-sha256','--launcher-sha256','--stage','--out','--deadline-ns','--candidate-sha256','--python','--git-binary'],'stage arguments');
  const root=realpathSync(process.cwd()),p=readBound(path.resolve(v['--plan']),v['--plan-sha256'],true,1024**2),plan=decode(p.data,1024**2);
  validatePlan(plan,root,v['--launcher-sha256'],v['--entry-sha256'],v['--python'],v['--git-binary']);const sources=[...planBindings(plan,root),clean(p)];checkBindings(sources);
  const output=path.resolve(v['--out']),paths=outputPaths(root,output),stage=v['--stage'];check(realpathSync(paths.operations)===paths.operations,'canonical owned operations sibling');
  const candidate=stage==='comparison'?clean(readBound(paths.candidate,v['--candidate-sha256'])):null;
  check(stage!=='consumer'||(v['--candidate-sha256']==='none'&&!existsSync(output)),'consumer requires absent original output');
  await runSingleStage(stageSpec({stage,plan,planBinding:clean(p),root,output,python:v['--python'],git:v['--git-binary'],candidate,budget:remainingSeconds(v['--deadline-ns'])}));
  checkBindings(sources);remainingSeconds(v['--deadline-ns']);console.error(JSON.stringify({kind:'f6c-range-entry-process-resources',resourceUsage:process.resourceUsage()}));
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});

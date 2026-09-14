/** Nonmathematical composition: captured producer -> closed four-file cover -> checker.
 * A pure comparison cannot grant source/runtime/operation authority. This layer
 * binds those identities without evaluating histories, roots, or acceleration.
 * Frozen generic helpers and registered process supervision remain unchanged.
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, openSync,
  readSync, realpathSync, writeSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';


export const ENTRY='scripts/eom/run-f6c-emission-refinement-pilot.mjs';
export const LAUNCHER='scripts/eom/launch-f6c-emission-refinement-pilot.mjs';
export const TESTS='tests/f6c-emission-refinement-pilot.test.js';
export const PROCESS_TESTS='tests/f6c-emission-refinement-pilot-process.test.js';
export const HELPERS='scripts/eom/launch-prescribed-response-pilot.mjs';
export const OUTER='scripts/eom/launch-abc-enclosed-root-pilot.mjs';
export const PRODUCER='scripts/eom/prepare-f6c-emission-refinement.py';
export const PRODUCER_TESTS='tests/test_f6c_emission_refinement_preparation.py';
export const CHECKER='scripts/eom/verify-f6c-emission-refinement.py';
export const CHECKER_TESTS='tests/test_f6c_emission_refinement.py';
export const DECLARATION='reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-predeclaration.md';
export const COMPARISON='scripts/eom/oracle/f6c_emission_refinement_conformance.py';
export const COMPARISON_TESTS='tests/test_f6c_emission_refinement_conformance.py';
export const LANE='.local-data/braid-analysis/f6c-emission-refinement-20260827';
export const SHARED_LOCK_LANE='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827';
export const SCOPE='pilot-cell-0-emission-refinement';
export const LIMIT_MS=1800000,FILE_LIMIT=64*1024**2,LOG_LIMIT=16*1024**2;
export const LIMITS=Object.freeze({inclusiveSeconds:1800,maximumAggregateRssBytes:2*1024**3,
 maximumRssSampleGapMs:1000,heartbeatSeconds:15,admissionFreeMemoryPercent:40,
 admissionDiskBytes:64*1024**3,stopFreeMemoryBelowPercent:20,stopDiskBelowBytes:16*1024**3,
 hostObservationSeconds:15,hostObservationTimeoutSeconds:2,maximumScientificFileBytes:FILE_LIMIT,
 maximumOutputFileBytes:FILE_LIMIT,maximumCombinedLogBytes:LOG_LIMIT,serialWorkers:1,eomWorkers:0});
export const CENSUS=Object.freeze({cells:1,members:8,queries:3584,pairRows:64,ordinaryPairs:56,selfZeros:8,pieceRecords:112});
export const PURE_FLAGS=Object.freeze(['accepted','referenceGenerationAuthenticated','originalSourceAuthenticated',
 'original1760PieceCensusAuthenticated','premiseTruthAuthenticated','subjectMembershipEstablished',
 'historicalTrajectoryIdentityEstablished','executionAuthorized','eomExecuted','h3EvidenceEligible',
 'metricsAvailable','scoreAuthorized','equilibriumEstablished','retentionEstablished','physicalRealizationEstablished']);
export const NAMED=Object.freeze({declaration:DECLARATION,producer:PRODUCER,producerControls:PRODUCER_TESTS,
 verifier:CHECKER,verifierControls:CHECKER_TESTS,comparisonReference:COMPARISON,comparisonReferenceControls:COMPARISON_TESTS});
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

export const SUBJECT_PATHS=Object.freeze([PRODUCER,PRODUCER_TESTS,DECLARATION,
 'scripts/eom/oracle/continuous_reception_roots_cached.py','tests/test_eom_continuous_reception_roots_cached.py',
 'scripts/eom/oracle/certified_history.py','scripts/eom/oracle/decimal_interval.py','tests/test_eom_decimal_interval.py',
 'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','tests/test_f6c_cached_continuous_reception_root_cover.py',
 COMPARISON,COMPARISON_TESTS,'reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md',
 'scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py','tests/test_f6c_cached_continuous_reception_root_cover_preparation.py']);
export const PINS=Object.freeze({...Object.fromEntries(FIXED.map(([,p,h])=>[p,h])),
 // Separately authored frozen generations; actual launch requires independent review.
 [PRODUCER]:'bb9e1a287552483f7ad0fc1431162c1fbdb2da84fd862bc9b1c4799eef993600',
 [PRODUCER_TESTS]:'c238f49b3316e43244ee0db3fdf3263b2390b4f6f91a67f6a6b7133ccfff000b',
 [CHECKER]:'1b3e39eea14c2a21be76ab2a3fe2bdbcc055b5a73325d03de9734c79a8017c33',
 [CHECKER_TESTS]:'1d3af80d89834b31968cfe5dd7fb016bb0ac4eee6ce77fbabaeea21a9a905bc7',
 [DECLARATION]:'53f3398ba083218948c9efd93f10db09cbf5d617bc0270988f5adea24c48f037',
 [COMPARISON]:'ec0eaaeae3da4ffb597ac92ff3ac1a5700a8cf88916144a7d994912270c4157a',
 [COMPARISON_TESTS]:'bac7357186fb05c5b7ea35154c5564e7527075a9a94177a8b600f9a02119adb5',
 [HELPERS]:'a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9',
 [OUTER]:'5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa',
 'scripts/eom/oracle/continuous_reception_roots_cached.py':'daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf',
 'tests/test_eom_continuous_reception_roots_cached.py':'a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb',
 'scripts/eom/oracle/certified_history.py':'ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7',
 'scripts/eom/oracle/decimal_interval.py':'fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a',
 'tests/test_eom_decimal_interval.py':'22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44',
 'scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py':'19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132',
 'tests/test_f6c_cached_continuous_reception_root_cover.py':'2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117',
 'reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md':'798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3',
 'scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py':'af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386',
 'tests/test_f6c_cached_continuous_reception_root_cover_preparation.py':'9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427',
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

export function validatePlan(plan,root,launcherSha,entrySha,python,git){
 check(Object.values(NAMED).every(p=>hash(PINS[p])),'separate producer/checker review/pins incomplete');
 closed(plan,['schema','scope',...Object.keys(NAMED),'subjectSourceBindings','runtimeBindings','operationalBindings','limits','priorCoverClosure'],'plan');
 check(plan.schema==='braid-program/f6c-emission-refinement-launch.v1'&&plan.scope===SCOPE&&equal(plan.limits,LIMITS),'fixed scope/limits');
 for(const [key,p] of Object.entries(NAMED)){binding(plan[key]);check(plan[key].path===p&&plan[key].sha256===PINS[p],'reviewed named binding');}
 for(const rows of [plan.subjectSourceBindings,plan.runtimeBindings,plan.operationalBindings])bindings(rows);
 check(equal(plan.subjectSourceBindings.map(b=>b.path).sort(),[...SUBJECT_PATHS].sort()),'exact subject source/control closure');
 for(const b of plan.subjectSourceBindings)check(b.sha256===PINS[b.path],'subject source generation differs');
 check(realpathSync(root)===root&&hash(entrySha)&&hash(launcherSha),'canonical reviewed composition');
 check(path.isAbsolute(python)&&path.resolve(python)===python&&path.isAbsolute(git)&&realpathSync(git)===git,'explicit interpreter/Git invocation');
 const runtime=plan.runtimeBindings.map(b=>path.resolve(root,b.path));
 check(runtime.includes(realpathSync(python))&&runtime.includes(path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'))&&runtime.includes(git),'shared interpreter/venv/Git absent');
 const ops=[ENTRY,LAUNCHER,TESTS,PROCESS_TESTS,HELPERS,OUTER,'/bin/ps','/usr/bin/memory_pressure',realpathSync(process.execPath)];
 check(equal(plan.operationalBindings.map(b=>b.path).sort(),ops.sort()),'exact operational closure');
 for(const b of plan.operationalBindings){const expected=b.path===ENTRY?entrySha:b.path===LAUNCHER?launcherSha:PINS[b.path];if(expected)check(b.sha256===expected,'operational generation differs');}
 check(equal(plan.priorCoverClosure,{authority:'externally-reviewed-caller-observation',ownerSha256:PINS[FIXED[9][1]],admissionSha256:PINS[FIXED[5][1]],matchingFreshCompletionObserved:true,exitCode:0,elapsedSeconds:'8.534247625',processesClosed:true,independentAuditAccepted:true}),'prior externally observed closure');
 return plan;
}
export function planBindings(plan,root){
 const rows=[...FIXED.map(([,p,h])=>({path:path.join(root,p),sha256:h})),...Object.keys(NAMED).map(k=>absolute(plan[k],root)),
 ...plan.subjectSourceBindings.map(b=>absolute(b,root)),...plan.runtimeBindings.map(b=>absolute(b,root)),...plan.operationalBindings.map(b=>absolute(b,root))],map=new Map();
 for(const row of rows){const old=map.get(row.path);check(!old||(old.sha256===row.sha256&&(old.bytes===undefined||row.bytes===undefined||old.bytes===row.bytes)),'conflicting binding');map.set(row.path,{...old,...row});}return [...map.values()];
}
export function remainingSeconds(deadline){const ns=BigInt(deadline)-process.hrtime.bigint();check(ns>0n&&ns<=1800000000000n,'remaining inclusive deadline');return String(ns/1000000000n)+'.'+String(ns%1000000000n).padStart(9,'0');}
export function outputPaths(root,output){check(path.dirname(output)===path.join(root,LANE)&&realpathSync(path.dirname(output))===path.dirname(output),'canonical direct output child');
 const dataFiles=['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'].map(p=>path.join(output,p));
 return {dataFiles,queries:dataFiles[0],rows:dataFiles[1],pieces:dataFiles[2],manifest:dataFiles[3],operations:output+'-outer',comparison:path.join(output+'-outer','comparison.json')};
}
export function stageSpec({stage,plan,planBinding,root,output,python,git,manifest,budget}){
 check(stage==='producer'||stage==='comparison','unknown stage');check(typeof budget==='string'&&/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(budget)&&Number(budget)>0&&Number(budget)<=1800,'positive stage budget');
 const paths=outputPaths(root,output),source=stage==='producer'?PRODUCER:CHECKER,digest=PINS[source];
 const args=['-I','-B','-c',PYTHON_BOOTSTRAP,path.join(root,source),digest,'--repo-root',root,'--plan',planBinding.path,'--plan-sha256',planBinding.sha256,
 stage==='producer'?'--producer-sha256':'--verifier-sha256',digest];
 if(stage==='producer')args.push('--out-dir',output,'--git-binary',git);
 else{binding(manifest);check(manifest.path===paths.manifest,'preceding exact manifest required');args.push('--manifest',manifest.path,'--manifest-sha256',manifest.sha256,'--out',paths.comparison);}
 args.push('--budget-seconds',budget);return {command:python,args};
}
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
print(_json.dumps({'kind':'f6c-refinement-python-process-resources','userSeconds':_self.ru_utime,'systemSeconds':_self.ru_stime,'waitedChildUserSeconds':_children.ru_utime,'waitedChildSystemSeconds':_children.ru_stime,'maximumIndividualResidentBytes':_self.ru_maxrss if sys.platform=='darwin' else _self.ru_maxrss*1024}),file=sys.stderr,flush=True)
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
print(json.dumps({'schema':'braid-program/f6c-emission-refinement-python-runtime-inventory.v1','scientificDataLoaded':False,'scientificModulesExecuted':False,'pythonInvocation':sys.executable,'pythonRealPath':str(pathlib.Path(sys.executable).resolve()),'files':[str(p) for p in sorted(files)]}))
`;
export async function runSingleStage(spec,{root=process.cwd(),out=process.stdout,err=process.stderr,spawnImpl=spawn,timeoutMs}={}) {
  check(timeoutMs===undefined||(Number.isInteger(timeoutMs)&&timeoutMs>0&&timeoutMs<=5000),'metadata timeout');
  const child=spawnImpl(spec.command,spec.args,{cwd:root,detached:true,stdio:['ignore','pipe','pipe']});let count=0,failure,timer;
  const forward=stream=>bytes=>{count+=bytes.length;if(count>LOG_LIMIT){failure??=Error('combined stage log limit');child.kill('SIGTERM');return;}try{stream.write(bytes);}catch(error){failure??=error;child.kill('SIGTERM');}};
  child.stdout.on('data',forward(out));child.stderr.on('data',forward(err));
  if(timeoutMs!==undefined)timer=setTimeout(()=>{failure??=Error('metadata timeout');child.kill('SIGKILL');},timeoutMs);
  let result;try{result=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}));});}finally{clearTimeout(timer);}
  check(!failure&&result.code===0&&result.signal===null,failure?.message??'target did not close cleanly');return {completed:true,accepted:false,logBytes:count};
}
function resourceEvents(filename){const raw=readBound(filename,undefined,true,LOG_LIMIT),events=raw.data.toString('utf8').split('\n').flatMap(line=>{try{return [JSON.parse(line)];}catch{return [];}});
  const one=kind=>{const matches=events.filter(x=>x?.kind===kind);check(matches.length===1,'single resource event required');return matches[0];};
  const python=one('f6c-refinement-python-process-resources'),entry=one('f6c-refinement-entry-process-resources');
  for(const k of ['userSeconds','systemSeconds','waitedChildUserSeconds','waitedChildSystemSeconds'])check(Number.isFinite(python[k])&&python[k]>=0,'finite Python CPU');
  check(positive(python.maximumIndividualResidentBytes,Number.MAX_SAFE_INTEGER),'individual Python RSS');
  check(entry.resourceUsage&&['userCPUTime','systemCPUTime','maxRSS'].every(k=>Number.isSafeInteger(entry.resourceUsage[k])&&entry.resourceUsage[k]>=0),'entry resource event');
  return {python,entry,stderr:clean(raw),scope:'Python lifetime self and waited-child CPU; entry self CPU; individual RSS, not aggregate memory'};}

export const CLAIM_FLAGS=Object.freeze(['historicalTrajectoryIdentityEstablished','metricsAvailable','scoreAuthorized','h3EvidenceEligible','eomExecuted','independentComparisonPassed','executionAuthorized']);
export const ROOT_FLAGS=Object.freeze(['premise_truth_authenticated','subject_membership_established','execution_authorized','metrics_available','h3_evidence_eligible']);
export const ALGORITHM=Object.freeze({lowerQueriesPerPair:32,upperQueriesPerPair:32,order:'receiver-major;lower32;reset;upper32'});
export const IDS=Object.freeze(['0+','0-','1+','1-','2+','2-','3+','3-']);
export const MANIFEST_KEYS=Object.freeze('schema scope status accepted launchPlan producer fixedBindings subjectSourceBindings executionBindings priorCoverClosure members knotSha256 retainedDomain receptionDomain originalEmissionDomain precision speedUpper clearanceLower algorithm restrictions census queries rows pieces libraryFlags claims'.split(' '));
const publicationRequires='matching fresh successful completion, externally observed inclusive deadline and owned-process closure';
const falseClaims=(value,keys)=>{closed(value,keys,'false claims');check(keys.every(k=>value[k]===false),'unpromoted authority required');};
function sourceMap(job){const byPath=new Map(job.sources.map(b=>[b.path,b]));return Object.fromEntries(FIXED.map(([role,p])=>{const b=byPath.get(path.join(job.root,p));check(b,'missing fixed source');return [role,b];}));}
function restrictions(value){
 check(Array.isArray(value)&&value.length===56,'complete pair restrictions');let index=0;
 for(let i=0;i<8;i++)for(let j=0;j<8;j++)if(i!==j){const r=value[index++];
  closed(r,['receiverIndex','transmitterIndex','receiverId','transmitterId','lower','upper','lowerQueryIndex','upperQueryIndex'],'restriction');
  check(r.receiverIndex===i&&r.transmitterIndex===j&&r.receiverId===IDS[i]&&r.transmitterId===IDS[j],'receiver-major nonself restriction order');
  for(const k of ['lower','upper'])check(typeof r[k]==='string'&&r[k].length<=40&&/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(r[k]),'bounded exact restriction token');
  // Arithmetic ordering and face truth belong to the independent checker.
  for(const [k,offset] of [['lowerQueryIndex',0],['upperQueryIndex',32]])check(r[k]===null||(Number.isSafeInteger(r[k])&&r[k]>=(index-1)*64+offset&&r[k]<(index-1)*64+offset+32),'retained query index');
 }
}
function manifestRecord(job,raw){
 const {root,plan,planBinding}=job,record=decode(raw.data);closed(record,MANIFEST_KEYS,'manifest');
 check(record.schema==='braid-program/f6c-emission-refinement-cover.v1'&&record.scope===SCOPE&&record.status==='conditional_complete'&&record.accepted===false,'conditional cover manifest');
 check(equal(record.launchPlan,planBinding)&&equal(record.producer,absolute(plan.producer,root))&&equal(record.fixedBindings,sourceMap(job))&&equal(record.subjectSourceBindings,plan.subjectSourceBindings)&&equal(record.executionBindings,[...plan.runtimeBindings,...plan.operationalBindings].map(b=>absolute(b,root)))&&equal(record.priorCoverClosure,plan.priorCoverClosure),'manifest source chain');
 check(equal(record.census,CENSUS)&&equal(record.algorithm,ALGORITHM)&&record.precision===90&&record.speedUpper==='0.85'&&record.clearanceLower==='0.27'&&record.knotSha256==='11acd09b692fe175861d0f9478b5d1763c18e088682a0c6a16fc29d65453075c','fixed cover controls');
 for(const [key,lower,upper] of [['retainedDomain','-8','0.13'],['receptionDomain','0','0.001'],['originalEmissionDomain','-8','-0.05']])
  check(equal(record[key],{lower,upper,precision:90}),'unchanged domain');
 check(Array.isArray(record.members)&&record.members.length===8&&record.members.every((m,i)=>m.id===IDS[i]&&m.pathKey===i+1&&m.polarity===(i%2?-1:1)),'original member identity census');
 restrictions(record.restrictions);falseClaims(record.libraryFlags,ROOT_FLAGS);falseClaims(record.claims,CLAIM_FLAGS);
 const paths=outputPaths(root,job.output);
 for(const role of ['queries','rows','pieces']){binding(record[role]);check(record[role].path===paths[role]&&record[role].bytes<=FILE_LIMIT,'exact original stream path/size');}
 return record;
}
function analysisRecord(value,manifest){
 closed(value,'accepted conditionalQueryReplayConformant conditionalFinalCoverConformant queryCount pairCount rowCount ordinaryNonselfRows selfExclusionRows pieceRecordCount finalStrictFaceChecks oldestBoundaryChecks recordedGeometryPieceVisits restrictions claims'.split(' '),'analysis');
 check(value.accepted===false&&value.conditionalQueryReplayConformant===true&&value.conditionalFinalCoverConformant===true,'conditional independent comparison');
 for(const [key,n] of Object.entries({queryCount:3584,pairCount:56,rowCount:64,ordinaryNonselfRows:56,selfExclusionRows:8,pieceRecordCount:112,finalStrictFaceChecks:112,oldestBoundaryChecks:56}))check(value[key]===n,'complete comparison census');
 check(Number.isSafeInteger(value.recordedGeometryPieceVisits)&&value.recordedGeometryPieceVisits>=0&&equal(value.restrictions,manifest.restrictions),'comparison restrictions/visits');
 falseClaims(value.claims,PURE_FLAGS);
}
export function admitStage(job){
 const {stage,processReceipt,plan,planBinding,root,output}=job,paths=outputPaths(root,output);
 check(processReceipt.accepted===false&&processReceipt.processesClosed===true&&processReceipt.exit?.code===0&&processReceipt.exit.signal===null,'fresh registered closure required');
 check(processReceipt.gates?.length===1,'one registered target');const gate=processReceipt.gates[0],args=gate.requestedArgs;
 check(Array.isArray(args)&&args.at(-2)==='--budget-seconds','actual stage budget absent');const spec=stageSpec({...job,budget:args.at(-1)});
 check(gate.acknowledged===true&&gate.target&&gate.measurement?.code===0&&gate.measurement.signal===null&&gate.requestedCommand===spec.command&&equal(args,spec.args),'gate target/arguments differ');
 const stdout=job.stdout??clean(readBound(job.stdoutPath,undefined,false,LOG_LIMIT)),raw=readBound(stdout.path,stdout.sha256,true,LOG_LIMIT);check(raw.bytes===stdout.bytes,'stdout byte count');
 const lines=raw.data.toString('utf8').trim().split('\n');check(lines.length===1,'one fresh completion');const completion=decode(Buffer.from(lines[0]),LOG_LIMIT);
 check(completion.completed===true&&completion.scope===SCOPE&&completion.h3EvidenceEligible===false&&completion.eomExecuted===false&&Number.isFinite(completion.elapsedSeconds)&&completion.elapsedSeconds>=0&&completion.elapsedSeconds<1800,'fresh completion scope/deadline');
 let outputs,manifestBinding,manifest;
 if(stage==='producer'){
  closed(completion,'completed accepted scope conditionalCoverPrepared externalWholeAttemptAdmissionRequired producer launchPlan outputs census recordedGeometryPieceVisits elapsedSeconds h3EvidenceEligible eomExecuted'.split(' '),'producer completion');
  check(completion.accepted===false&&completion.conditionalCoverPrepared===true&&completion.externalWholeAttemptAdmissionRequired===true&&equal(completion.census,CENSUS)&&equal(completion.producer,absolute(plan.producer,root))&&equal(completion.launchPlan,planBinding),'unpromoted producer completion');
  check(Number.isSafeInteger(completion.recordedGeometryPieceVisits)&&completion.recordedGeometryPieceVisits>=0,'producer geometry piece census');
  bindings(completion.outputs);check(equal(completion.outputs.map(b=>b.path),paths.dataFiles)&&completion.outputs.every(b=>b.bytes<=FILE_LIMIT),'exact four outputs with manifest last');
  outputs=completion.outputs;checkBindings(outputs);manifestBinding=outputs[3];
  manifest=manifestRecord(job,readBound(manifestBinding.path,manifestBinding.sha256,true));
  check(equal(outputs.slice(0,3),['queries','rows','pieces'].map(k=>manifest[k])),'producer manifest/stream byte chain');
 }else{
  closed(completion,'completed accepted scope output analysis elapsedSeconds h3EvidenceEligible eomExecuted externalInclusiveDeadlineAndProcessClosureRequired'.split(' '),'checker completion');
  check(completion.accepted===true&&completion.externalInclusiveDeadlineAndProcessClosureRequired===true,'checker external completion');
  binding(completion.output);check(completion.output.path===paths.comparison&&completion.output.bytes<=FILE_LIMIT,'checker output path/size');outputs=[completion.output];checkBindings(outputs);
  binding(job.manifest);check(job.manifest.path===paths.manifest,'original preceding manifest');manifestBinding=job.manifest;
  const original=readBound(manifestBinding.path,manifestBinding.sha256,true);check(original.bytes===manifestBinding.bytes,'manifest byte count');manifest=manifestRecord(job,original);
  analysisRecord(completion.analysis,manifest);
  const record=decode(readBound(completion.output.path,completion.output.sha256,true).data);
  closed(record,'schema scope status accepted authority manifest queries rows pieces launchPlan verifier sourceBindings fixedBindings executionBindings subjectSourceBindings priorCoverClosure analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split(' '),'checker receipt');
  check(record.schema==='braid-program/f6c-emission-refinement-conformance.v1'&&record.scope===SCOPE&&record.status==='conditional-comparison-complete'&&record.accepted===true&&record.authority==='independent original-byte query replay and conditional final-cover containment only'&&equal(record.analysis,completion.analysis),'conditional checker receipt');
  const named=Object.fromEntries(Object.keys(NAMED).map(k=>[k,absolute(plan[k],root)]));
  check(equal(record.manifest,manifestBinding)&&equal(record.launchPlan,planBinding)&&equal(record.verifier,named.verifier)&&equal(record.sourceBindings,named)&&equal(record.fixedBindings,sourceMap(job))&&equal(record.executionBindings,[...plan.runtimeBindings,...plan.operationalBindings].map(b=>absolute(b,root)))&&equal(record.subjectSourceBindings,plan.subjectSourceBindings)&&equal(record.priorCoverClosure,plan.priorCoverClosure),'checker source/original chain');
  for(const k of ['queries','rows','pieces'])check(equal(record[k],manifest[k]),'checker original stream differs');
  falseClaims(record.candidateClaims,CLAIM_FLAGS);
  check(record.publicationRequires===publicationRequires&&Number.isFinite(record.elapsedSecondsBeforePublication)&&record.elapsedSecondsBeforePublication>=0&&record.elapsedSecondsBeforePublication<=completion.elapsedSeconds,'checker publication boundary');
 }
 const evidence=[manifestBinding,...['queries','rows','pieces'].map(k=>manifest[k]),...outputs,stdout];
 checkBindings(evidence);const resources=resourceEvents(path.join(paths.operations,stage+'-process/runner-stderr.log'));checkBindings(job.sources);
 return {accepted:true,h3EvidenceEligible:false,stage,completion,completionLog:stdout,resources,outputs,census:CENSUS,
  mathematicalAuthority:stage==='comparison'?'frozen independent conditional query replay and final-cover conformance only':'none; cover pending independent comparison'};
}
export function fileOperation(job){
 const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'inclusive file operation deadline');live();
 if(job.kind==='preflight'){const captured=readBound(job.planPath,job.planSha256,true,1024**2,live),plan=decode(captured.data,1024**2);
  validatePlan(plan,job.root,job.launcherSha256,job.entrySha256,job.python,job.git);
  return {plan,planBinding:clean(captured),sources:checkBindings([...planBindings(plan,job.root),clean(captured)],live)};}
 if(job.kind==='recheck')return checkBindings(job.sources,live);
 if(job.kind==='admit'){const result=admitStage(job);live();return result;}
 if(job.kind==='finalize'){check(job.record.accepted===true&&job.record.processesClosed===true&&job.record.stages?.length===2,'completed two-stage admission');checkBindings(job.sources,live);checkBindings(job.evidence,live);return writeNew(path.join(job.output+'-outer','pilot-admission.json'),job.record,1024**2,live);}
 throw Error('unknown file operation');
}
async function main(argv){
 if(argv[0]==='--runtime-inventory'){check(argv.length===2&&path.isAbsolute(argv[1]),'explicit shared Python inventory invocation');return runSingleStage({command:argv[1],args:['-I','-B','-c',PYTHON_RUNTIME_INVENTORY]},{timeoutMs:5000});}
 const v={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!v[argv[i]],'unique stage argument');v[argv[i]]=argv[i+1];}
 closed(v,['--plan','--plan-sha256','--entry-sha256','--launcher-sha256','--stage','--out','--deadline-ns','--manifest-sha256','--python','--git-binary'],'stage arguments');
 const root=realpathSync(process.cwd()),p=readBound(path.resolve(v['--plan']),v['--plan-sha256'],true,1024**2),plan=decode(p.data,1024**2);
 validatePlan(plan,root,v['--launcher-sha256'],v['--entry-sha256'],v['--python'],v['--git-binary']);const sources=[...planBindings(plan,root),clean(p)];checkBindings(sources);
 const output=path.resolve(v['--out']),paths=outputPaths(root,output),stage=v['--stage'];check(realpathSync(paths.operations)===paths.operations,'canonical owned operations sibling');
 const manifest=stage==='comparison'?clean(readBound(paths.manifest,v['--manifest-sha256'])):null;
 check(stage!=='producer'||(v['--manifest-sha256']==='none'&&!existsSync(output)),'producer requires absent original output');
 await runSingleStage(stageSpec({stage,plan,planBinding:clean(p),root,output,python:v['--python'],git:v['--git-binary'],manifest,budget:remainingSeconds(v['--deadline-ns'])}));
 checkBindings(sources);remainingSeconds(v['--deadline-ns']);console.error(JSON.stringify({kind:'f6c-refinement-entry-process-resources',resourceUsage:process.resourceUsage()}));
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});

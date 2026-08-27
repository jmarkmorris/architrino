// One explicitly selected original-parent refinement, then independent comparison.
// This captured module is the coordinator, registered entry and file worker.
// No automatic campaign, restart, mathematical implementation or new authority.
import {spawn,execFile} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,openSync,
 readSync,readdirSync,realpathSync,statfsSync,writeSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const SELF='scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs';
export const CONTROL='tests/f6c-parent-emission-refinement-pilot.test.js';
export const LANE='.local-data/braid-analysis/f6c-parent-emission-refinement-20260827';
export const LOCK='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock';
export function parentScope(index){check(Number.isInteger(index)&&index>=0&&index<160,'bounded original parent index');return `original-parent-${index}-emission-refinement`;}
export function operationScope(index){parentScope(index);return `operational-original-parent${index}-refinement-completion-only`;}
export const LIMIT=1800000,FILE=64*1024**2,LOG=16*1024**2;
export const LIBRARY_FLAGS=Object.freeze({premise_truth_authenticated:false,subject_membership_established:false,execution_authorized:false,metrics_available:false,h3_evidence_eligible:false});
export const PINS=Object.freeze({
 helpers:['scripts/eom/launch-prescribed-response-pilot.mjs','a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9'],
 outer:['scripts/eom/launch-abc-enclosed-root-pilot.mjs','5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa'],
 diagnostics:['scripts/eom/launch-f6c-emission-refinement-pilot.mjs','89b23af09f57aa50e3ebfc0780189f2f0d1a409a7e13004af0cb48167894b944'],
});
export const NAMED=Object.freeze({"declaration":["reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md","652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733"],"producer":["scripts/eom/prepare-f6c-parent-emission-refinement.py","492882b63f074fd46253ee92974524c4fd6b43ae6190db23797c307251ed8544"],"producerControls":["tests/test_f6c_parent_emission_refinement_preparation.py","06cd99bc1f74c3b7dead6089ef20f468f7be8af41ae6702f45ec85d83a1a36ab"],"proposalReference":["scripts/eom/f6c_parent_emission_refinement.py","1517575f3df783af36d2bf2b758d19427e8ec85247efec892783716c263b7c27"],"proposalReferenceControls":["tests/test_f6c_parent_emission_refinement.py","f1650b5e73a06ecd7ed05bff10ba97949b42aa5330e84fb3514c2f868eff0fc2"],"verifier":["scripts/eom/verify-f6c-parent-emission-refinement.py","0bb16c232736c895c4f3e38a75e2a0562084710ffdba2503b3ab4457216127fc"],"verifierControls":["tests/test_f6c_parent_emission_refinement_verification.py","92da2b09c629ecbc0fdcdddac9de69353da0e29795e0b1d3bf2d23a05a9a26f7"],"comparisonReference":["scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py","ffe91ad7cbfe4e41bf92203fe73b4195e0ad1437176dace9d12751e68aa2cbec"],"comparisonReferenceControls":["tests/test_f6c_parent_emission_refinement_conformance.py","18c21d6e84d0d6ae7e3b4ea35861a75b38d362d8aad1e0cc14715cea167a5a04"]});
export const DEPENDENCIES=Object.freeze({"transport":["scripts/eom/verify-f6c-refined-acceleration.py","3f49831a2e63d2526125c1585c1250330079fa423986ec1b36901bb3cecde6ae"],"transportControls":["tests/test_f6c_refined_acceleration.py","4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a"],"scientificDecoder":["scripts/eom/oracle/f6c_refined_acceleration_conformance.py","63db48f604d0b1abdf61f0efcb3894feac9d30a25af26a4d96f01bda6522e2a2"],"scientificDecoderControls":["tests/test_f6c_refined_acceleration_conformance.py","3fb6eabd03a56b982f2601f11b535c60208f03df519e41ea29d4ba018a0e531e"],"productionHelper":["scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py","af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386"],"productionHelperControls":["tests/test_f6c_cached_continuous_reception_root_cover_preparation.py","9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427"],"historyReference":["scripts/eom/oracle/certified_history.py","ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7"],"decimalReference":["scripts/eom/oracle/decimal_interval.py","fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a"],"decimalControls":["tests/test_eom_decimal_interval.py","22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44"],"rootLibrary":["scripts/eom/oracle/continuous_reception_roots_cached.py","daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"],"rootControls":["tests/test_eom_continuous_reception_roots_cached.py","a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb"],"independentRootReference":["scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py","19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132"],"independentRootControls":["tests/test_f6c_cached_continuous_reception_root_cover.py","2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117"],"cacheEquivalence":["reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md","798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3"]});
export const ORIGINAL=Object.freeze({"export":[".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json","f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1"],"reconstruction":[".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json","7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43"],"guards":[".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json","86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880"],"fullEntry":["scripts/eom/run-f6c-cached-root-cover-full.mjs","1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b"],"fullRows":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/rows.ndjson","28491edb2f1faec7adf248f535d29a1600b8bd69f5a46706fd26dbb3eb848b5c",22585784],"fullPieces":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/pieces.ndjson","b3a2ddf2c8cd5b586ef7b374eee94afc395f63496c849ec574e71bf1f487a9ab",7505144],"fullManifest":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/cover-manifest.json","61b0cdfad85696a0b5ead7df838119c9005a28656e9ac3daa26df139054410e2",42922],"fullComparison":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/comparison.json","1c423aece2009a2d7d0852e9558c16464c640abbc5bea3743211af3805b6eed2",43377],"fullAdmission":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json","8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f",332567],"fullLauncherLog":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/launcher-stderr.log","b976d8deb556d8faba5a3aff73a09b77ec26c6da84e42726167eec4ec7a43314",30969],"fullResourceLog":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/resource-observations.ndjson","66eb0cfa1811d0a834d18d3bd8e749a941e1964f7276898b80a4e12136d69d03",1710278],"fullPlan":["reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-launch.v1.json","5dd7e27084a2e8e5b2c3ed8daf8cf66248a437108710ce91281977e728197ddc",45282]});
export const PLAN_KEYS=Object.freeze(["schema","scope","parentIndex","declaration","producer","producerControls","proposalReference","proposalReferenceControls","verifier","verifierControls","comparisonReference","comparisonReferenceControls","dependencies","originalBindings","acceptanceOwner","priorCoverClosure","runtimeBindings","operationalBindings","limits"]);
export const MANIFEST_KEYS=Object.freeze(["schema","scope","status","accepted","launchPlan","producer","verifier","declaration","parent","members","originalBindings","acceptanceOwner","priorCoverClosure","historicalSourceBindings","subjectSourceBindings","runtimeBindings","operationalBindings","algorithm","restrictions","census","helperCalls","queries","rows","pieces","libraryFlags","claims","publicationRequires"]);
export const COMPLETION_KEYS=Object.freeze(["completed","accepted","scope","parentIndex","outputs","census","helperCalls","elapsedSeconds","processUserSeconds","processSystemSeconds","maximumIndividualProcessResidentBytes","independentComparisonRequired","externalInclusiveDeadlineAndProcessClosureRequired","claims"]);
export const CLAIMS=Object.freeze({"accepted":false,"referenceGenerationAuthenticated":false,"originalSourceAuthenticated":false,"original1760PieceCensusAuthenticated":false,"premiseTruthAuthenticated":false,"subjectMembershipEstablished":false,"historicalTrajectoryIdentityEstablished":false,"executionAuthorized":false,"eomExecuted":false,"h3EvidenceEligible":false,"metricsAvailable":false,"scoreAuthorized":false,"equilibriumEstablished":false,"retentionEstablished":false,"physicalRealizationEstablished":false});
export const CENSUS=Object.freeze({"cells":1,"members":8,"queries":3584,"pairRows":64,"ordinaryPairs":56,"selfZeros":8,"pieceRecords":112});
export const CALLS=Object.freeze({"build":1,"queries":3584,"cover":1});
export const ALGORITHM=Object.freeze({"lowerQueriesPerPair":32,"upperQueriesPerPair":32,"upperSearchRestartsFromOriginal":true,"receptionSubdivision":false,"automaticRetry":false});
export const PUBLICATION_REQUIRES=Object.freeze("fresh successful completion, independent parent refinement comparison, external inclusive deadline and closed owned processes");
export const LIMITS=Object.freeze({"inclusiveSeconds":1800,"maximumAggregateRssBytes":2147483648,"maximumRssSampleGapMs":1000,"heartbeatSeconds":15,"admissionFreeMemoryPercent":40,"admissionDiskBytes":68719476736,"stopFreeMemoryBelowPercent":20,"stopDiskBelowBytes":17179869184,"hostObservationSeconds":15,"hostObservationTimeoutSeconds":2,"maximumScientificFileBytes":67108864,"maximumOutputFileBytes":67108864,"maximumCombinedLogBytes":16777216,"serialWorkers":1,"eomWorkers":0});

const check=(v,m)=>{if(!v)throw Error(m);};
export const sha=raw=>createHash('sha256').update(raw).digest('hex');
const url=raw=>'data:text/javascript;base64,'+Buffer.from(raw).toString('base64');
export const clean=({data,identity,...b})=>b;
export function keys(v,names){check(v&&Object.getPrototypeOf(v)===Object.prototype&&Object.keys(v).sort().join('|')===[...names].sort().join('|'),'closed fields');}
export function same(a,b){
 if(a===b)return true;if(a===null||b===null||typeof a!==typeof b)return false;
 if(Array.isArray(a))return Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>same(v,b[i]));
 return typeof a==='object'&&!Array.isArray(b)&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>Object.hasOwn(b,k)&&same(a[k],b[k]));
}
export function parseJSON(raw){
 check(Buffer.isBuffer(raw)&&raw.length>0&&raw.length<=FILE,'bounded JSON');
 const s=new TextDecoder('utf-8',{fatal:true}).decode(raw);let i=0,nodes=0;
 const ws=()=>{while(i<s.length&&/\s/u.test(s[i])){check(' \t\r\n'.includes(s[i]),'JSON whitespace');i++;}};
 const str=()=>{const at=i++;let escaped=false;while(i<s.length){const ch=s[i++];if(ch==='"'&&!escaped){const v=JSON.parse(s.slice(at,i));check(Buffer.byteLength(v)<=131072,'JSON string bound');return v;}if(ch==='\\'&&!escaped)escaped=true;else escaped=false;}throw Error('unclosed JSON string');};
 const value=depth=>{check(++nodes<=1000000&&depth<=64,'JSON structural bound');ws();const ch=s[i];
  if(ch==='"')return str();
  if(ch==='{'||ch==='['){i++;ws();const object=ch==='{',v=object?{}:[],end=object?'}':']';if(s[i]===end){i++;return v;}
   for(let count=0;;count++){check(count<20000,'JSON container bound');ws();let k;if(object){check(s[i]==='"','JSON object key');k=str();check(!Object.hasOwn(v,k),'duplicate JSON key');ws();check(s[i++]===':','JSON colon');}
    const item=value(depth+1);if(object)Object.defineProperty(v,k,{value:item,enumerable:true,writable:true,configurable:true});else v.push(item);ws();const sep=s[i++];if(sep===end)return v;check(sep===',','JSON separator');}}
  for(const [token,v]of [['true',true],['false',false],['null',null]])if(s.startsWith(token,i)){i+=token.length;return v;}
  const m=/-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/u.exec(s.slice(i));check(m&&m.index===0&&m[0].length<=1100,'JSON number');i+=m[0].length;const v=Number(m[0]);check(Number.isFinite(v)&&(!Number.isInteger(v)||Number.isSafeInteger(v)),'JSON finite safe number');return v;};
 const result=value(0);ws();check(i===s.length,'JSON trailing input');return result;
}
export function readBound(filename,expected,collect=false,limit=collect?FILE:1024**3,live=()=>{}){
 live();check(path.isAbsolute(filename)&&path.resolve(filename)===filename&&realpathSync(filename)===filename,'canonical source');
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
export function binding(b,root){
 keys(b,['path','sha256','bytes']);check(typeof b.path==='string'&&b.path.length>0&&b.path.length<=2048&&!b.path.includes('\0')&&/^[a-f0-9]{64}$/u.test(b.sha256)&&Number.isSafeInteger(b.bytes)&&b.bytes>0&&b.bytes<=1024**3,'binding fields');
 const p=path.isAbsolute(b.path)?b.path:path.join(root,b.path);check(path.isAbsolute(p)&&path.resolve(p)===p&&!b.path.split('/').includes('..'),'canonical binding spelling');
 return {...b,path:p};
}
export function checkBindings(records,live=()=>{},identities={}){return records.map(b=>{const actual=readBound(b.path,b.sha256,false,1024**3,live);check(actual.bytes===b.bytes,'bound size');if(Object.hasOwn(identities,b.path))check(actual.identity===identities[b.path],'original source identity');return actual;});}
export function uniqueBindings(records){
 const m=new Map();for(const b of records){if(m.has(b.path))check(same(m.get(b.path),b),'mixed source generation');else m.set(b.path,b);}return [...m.values()].sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
}
export function originalParentMetadata(exported,index){
 parentScope(index);check(exported?.schema==='braid-program/f6c-retained-history-export.v1'&&exported.fieldSpeed==='1','original export metadata');
 check(Array.isArray(exported.acceptedFrames)&&exported.acceptedFrames.length===81&&Array.isArray(exported.retainedHistories)&&exported.retainedHistories.length===8,'original metadata census');
 const frameIndex=Math.floor(index/2),times=exported.acceptedFrames.map(f=>f.time);
 check(times.every(t=>typeof t==='string'&&t.length>0&&t.length<=1100),'original frame tokens');
 let selected;
 for(const h of exported.retainedHistories){
  check(Array.isArray(h.segments)&&h.segments.length===1760,'original1760 segments');
  for(let f=0;f<80;f++)check(h.segments[1600+2*f].startTime===times[f]&&h.segments[1601+2*f].endTime===times[f+1]&&h.segments[1600+2*f].endTime===h.segments[1601+2*f].startTime,'original frame/cell lexical incidence');
  const segment=h.segments[1600+index],reception={lower:segment.startTime,upper:segment.endTime,precision:90};
  check(typeof reception.lower==='string'&&typeof reception.upper==='string','original reception tokens');
  if(selected)check(same(selected,reception),'original member reception lexemes');else selected=reception;
 }
 return{parentIndex:index,frameIndex,frame:{lower:times[frameIndex],upper:times[frameIndex+1],precision:90},reception:selected,oldestTime:'-8'};
}
export function validatePlan(input,{root,selfSha,python,git}){
 keys(input,PLAN_KEYS);check(input.schema==='braid-program/f6c-parent-emission-refinement-launch.v1'&&input.scope===parentScope(input.parentIndex),'selected original parent scope');
 check(same(input.limits,LIMITS),'unchanged operational limits');
 check(same(input.priorCoverClosure,{authority:'versioned-acceptance-owner-declaration-not-fresh-observation',originalCallerSession:'13512',finalCompletionChunk:'c21aa7',exitCode:0,elapsedSeconds:'862.951823625',processesClosed:true,independentAuditAccepted:true}),'original full-cover closure premise');
 keys(input.dependencies,Object.keys(DEPENDENCIES));keys(input.originalBindings,Object.keys(ORIGINAL));
 const plan={...input,dependencies:{},originalBindings:{}};
 for(const [source,target,spec]of [[input,plan,NAMED],[input.dependencies,plan.dependencies,DEPENDENCIES],[input.originalBindings,plan.originalBindings,ORIGINAL]])
  for(const[k,[p,h,size]]of Object.entries(spec)){const b=binding(source[k],root);check(b.path===path.join(root,p)&&(!h||b.sha256===h)&&(!size||b.bytes===size),'fixed '+k);target[k]=b;}
 plan.acceptanceOwner=binding(input.acceptanceOwner,root);check(plan.acceptanceOwner.path===path.join(root,'reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'),'versioned acceptance owner');
 for(const key of ['runtimeBindings','operationalBindings']){check(Array.isArray(input[key])&&input[key].length>0&&input[key].length<=512,'bounded inventory');plan[key]=input[key].map(b=>binding(b,root));}
 const requiredOps=[SELF,CONTROL,...Object.values(PINS).map(x=>x[0]),realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'].map(p=>path.resolve(root,p));
 check(plan.operationalBindings.length===requiredOps.length&&requiredOps.every(p=>plan.operationalBindings.some(b=>b.path===p)),'exact8 operational bindings');
 for(const[p,h]of Object.values(PINS))check(plan.operationalBindings.some(b=>b.path===path.join(root,p)&&b.sha256===h),'immutable operational helper');
 check(plan.operationalBindings.some(b=>b.path===path.join(root,SELF)&&b.sha256===selfSha),'executing composition generation');
 for(const p of [python,git])check(typeof p==='string'&&path.isAbsolute(p)&&path.resolve(p)===p,'explicit interpreter/Git');
 for(const p of [realpathSync(python),path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'),git])check(plan.runtimeBindings.some(b=>b.path===p),'runtime executable/config absent');
 const subjects=[...Object.keys(NAMED).map(k=>plan[k]),...Object.values(plan.dependencies)];
 const current=[...subjects,...plan.runtimeBindings,...plan.operationalBindings];check(new Set(current.map(b=>b.path)).size===current.length,'duplicate current source/runtime');
 return {plan,sources:uniqueBindings([...current,...Object.values(plan.originalBindings),plan.acceptanceOwner]),subjects:subjects.sort((a,b)=>a.path<b.path?-1:1)};
}
export function remainingDuration(deadline,now=process.hrtime.bigint()){
 check(typeof deadline==='string'&&/^[0-9]{1,20}$/u.test(deadline)&&typeof now==='bigint','bounded original Node deadline');
 const left=BigInt(deadline)-now;check(left>0n&&left<=1800000000000n,'original remaining duration');
 return{originalNodeDeadlineNanoseconds:deadline,entryBudgetStampNanoseconds:String(now),remainingNanoseconds:String(left),seconds:String(left/1000000000n)+'.'+String(left%1000000000n).padStart(9,'0')};
}
export const PYTHON_RUNTIME_INVENTORY=String.raw`import __future__,argparse,contextlib,dataclasses,decimal,fractions,hashlib,itertools,json,math,os,pathlib,re,resource,signal,stat,subprocess,sys,tempfile,time,types,weakref,collections.abc,typing
# Public bounded arithmetic activates CPython's lazily imported integer helper.
(10**20000+1)//(10**15000+3)
p=argparse.ArgumentParser();p.add_argument('--probe');p.parse_args([])
files={pathlib.Path(sys.executable).resolve()}
for m in tuple(sys.modules.values()):
 for k in ('__file__','__cached__'):
  v=getattr(m,k,None)
  if isinstance(v,str):
   f=pathlib.Path(v).resolve()
   if f.is_file():files.add(f)
print(json.dumps([str(p)for p in sorted(files)]))
`;
export const PYTHON_BOOTSTRAP=String.raw`import hashlib,os,pathlib,resource,sys,time
stage,filename,digest=sys.argv[1:4];sys.argv=[filename,*sys.argv[4:]]
def read():
 p=pathlib.Path(filename);assert p==p.resolve();fd=os.open(p,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
 try:
  a=os.fstat(fd);assert 0<a.st_size<=1048576;left=a.st_size;parts=[]
  while left:
   b=os.read(fd,min(65536,left));assert b;parts.append(b);left-=len(b)
  assert not os.read(fd,1);raw=b''.join(parts);ident=lambda s:(s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
  assert ident(a)==ident(os.fstat(fd))==ident(os.stat(p,follow_symlinks=False))and hashlib.sha256(raw).hexdigest()==digest;return raw
 finally:os.close(fd)
raw=read();exec(compile(raw,filename,'exec',dont_inherit=True),dict(__name__='__main__',__file__=filename));assert read()==raw
u=resource.getrusage(resource.RUSAGE_SELF)
print(__import__('json').dumps(dict(kind='parent-refinement-python-resources',stage=stage,userSeconds=u.ru_utime,systemSeconds=u.ru_stime,maximumIndividualResidentBytes=u.ru_maxrss if sys.platform=='darwin'else u.ru_maxrss*1024)),file=sys.stderr,flush=True)
`;
export function stageSpec(stage,context,budget){
 const {plan,planBinding,output,root,python,git}=context;check(['producer','comparison'].includes(stage),'serial stage name');
 const role=stage==='producer'?'producer':'verifier',args=['--repo-root',root,'--plan',planBinding.path,'--plan-sha256',planBinding.sha256];
 if(stage==='producer')args.push('--producer-sha256',plan[role].sha256,'--out-dir',output,'--git-binary',git);
 else{check(context.manifest,'prior closed producer manifest required');args.push('--verifier-sha256',plan[role].sha256,'--manifest',context.manifest.path,'--manifest-sha256',context.manifest.sha256,'--out',output+'-outer/comparison.json');}
 args.push('--budget-seconds',budget.seconds);
 return {command:python,args:['-I','-B','-c',PYTHON_BOOTSTRAP,stage,plan[role].path,plan[role].sha256,...args]};
}
export async function registered(stage,planPath,planSha,selfSha,output,python,git,deadline,manifestSha='none'){
 const root=realpathSync(process.cwd()),live=()=>check(process.hrtime.bigint()<BigInt(deadline),'registered original deadline');live();
 const planFile=readBound(planPath,planSha,true,1024**2,live),pre=validatePlan(parseJSON(planFile.data),{root,selfSha,python,git});checkBindings(pre.sources,live);
 check(import.meta.url.startsWith('file:')&&fileURLToPath(import.meta.url)===path.join(root,SELF),'captured registered entry path');
 const context={...pre,root,output,python,git,planBinding:clean(planFile)};
 if(stage==='comparison')context.manifest=clean(readBound(path.join(output,'cover-manifest.json'),manifestSha,false,FILE,live));else check(manifestSha==='none','producer has no prior manifest');
 const budget=remainingDuration(deadline),target=stageSpec(stage,context,budget);
 console.error(JSON.stringify({kind:'parent-refinement-entry-budget',stage,budget}));
 await new Promise((resolve,reject)=>{const child=spawn(target.command,target.args,{cwd:root,detached:true,stdio:['ignore','pipe','pipe']});child.stdout.pipe(process.stdout);child.stderr.pipe(process.stderr);child.once('error',reject);child.once('close',(code,signal)=>code===0&&!signal?resolve():reject(Error('registered Python failed '+code+'/'+signal)));});
 checkBindings(pre.sources,live);console.error(JSON.stringify({kind:'parent-refinement-entry-resources',stage,budget,resourceUsage:process.resourceUsage()}));live();
}
export function noCompetitor(table,pid){
 const own=new Set([pid]);let changed;do{changed=false;for(const r of table)if(own.has(r.ppid)&&!own.has(r.pid)){own.add(r.pid);changed=true;}}while(changed);
 const pattern=/(?:run|launch)-.*(?:root|response|refinement|acceleration)|(?:prepare|verify|reduce)-f6c|(?:reduce|publish)-prescribed-acceleration|f6c-single-leaf-diagnostic-20260827.*coordinator\.mjs|eom_native_.*(?:cli|fixture)/u;
 check(!table.some(r=>!own.has(r.pid)&&pattern.test(r.command)),'competing numerical program');
}
export function writeNew(filename,value,live=()=>{}){
 live();const raw=Buffer.from(JSON.stringify(value)+'\n');check(raw.length<=FILE,'publication64MiB');
 const fd=openSync(filename,'wx',0o600);try{let at=0;while(at<raw.length){live();const n=writeSync(fd,raw,at);check(n>0,'short write');at+=n;}fsyncSync(fd);}finally{closeSync(fd);}
 const d=openSync(path.dirname(filename),'r');try{fsyncSync(d);}finally{closeSync(d);}live();return clean(readBound(filename,sha(raw),false,FILE,live));
}
function regular(filename,limit=FILE){const s=lstatSync(filename);check(s.isFile()&&s.size<=limit&&!s.isSymbolicLink(),'bounded regular output');return s;}
export function inspectCandidate(output,complete=false){
 if(!existsSync(output)){check(!complete,'candidate absent');return{bytes:0,bindings:[]};}
 check(lstatSync(output).isDirectory()&&realpathSync(output)===output,'canonical candidate directory');
 const names=readdirSync(output),publicNames=['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'];
 const privateNames=names.filter(n=>n.startsWith('.parent-emission-private-'));
 check(privateNames.length<=1&&names.every(n=>publicNames.includes(n)||privateNames.includes(n)),'closed candidate layout');
 const inodes=new Map(),bindings=[];
 for(const n of names){const p=path.join(output,n);
  if(privateNames.includes(n)){check(lstatSync(p).isDirectory()&&realpathSync(p)===p,'private directory');const inner=readdirSync(p);check(inner.every(n=>publicNames.includes(n))&&(!complete||inner.length===4),'private file census');
   for(const f of inner){const s=regular(path.join(p,f));inodes.set(s.dev+':'+s.ino,s.size);}}
  else{const s=regular(p);inodes.set(s.dev+':'+s.ino,s.size);check(privateNames.length===1,'public file requires owned private generation');
   const hidden=regular(path.join(output,privateNames[0],n));check(s.dev===hidden.dev&&s.ino===hidden.ino&&s.nlink===2&&hidden.nlink===2,'public/private identity during monitoring');}
 }
 if(complete){check(names.length===5&&privateNames.length===1&&publicNames.every(n=>names.includes(n)),'complete four public files');
  for(const n of publicNames){const p=path.join(output,n),a=regular(p),b=regular(path.join(output,privateNames[0],n));check(a.dev===b.dev&&a.ino===b.ino&&a.nlink===2&&b.nlink===2,'private/public exact hardlinks');bindings.push(clean(readBound(p,undefined,false,FILE)));}}
 const bytes=[...inodes.values()].reduce((a,b)=>a+b,0);check(bytes<=FILE,'aggregate candidate64MiB');
 return{bytes,bindings};
}
export function checkProcess(receipt,stage,context,stderr){
 check(receipt.accepted===false&&receipt.processesClosed===true&&receipt.exit?.code===0&&!receipt.exit.signal&&receipt.gates?.length===1,'closed pre-admission process');
 const gate=receipt.gates[0];check(gate.retired===true&&gate.acknowledged===true&&gate.target&&gate.measurement?.code===0&&!gate.measurement.signal,'one retired measured registered target');
 const events=stderr.toString('utf8').split('\n').filter(Boolean).map(s=>parseJSON(Buffer.from(s)));
 const one=kind=>{const a=events.filter(x=>x.kind===kind);check(a.length===1&&a[0].stage===stage,'one stage resource/budget event');return a[0];};
 const before=one('parent-refinement-entry-budget'),after=one('parent-refinement-entry-resources'),usage=one('parent-refinement-python-resources');
 check(same(before.budget,after.budget),'unchanged stage budget');
 const budget=remainingDuration(before.budget.originalNodeDeadlineNanoseconds,BigInt(before.budget.entryBudgetStampNanoseconds));
 check(same(budget,before.budget)&&budget.originalNodeDeadlineNanoseconds===context.deadlineNanoseconds,'original duration bridge');
 const target=stageSpec(stage,context,budget);check(gate.requestedCommand===target.command&&same(gate.requestedArgs,target.args),'registered exact target/arguments');
 check([usage.userSeconds,usage.systemSeconds,usage.maximumIndividualResidentBytes].every(x=>Number.isFinite(x)&&x>=0)&&Number.isSafeInteger(usage.maximumIndividualResidentBytes),'actual Python usage');
 check([after.resourceUsage?.userCPUTime,after.resourceUsage?.systemCPUTime,after.resourceUsage?.maxRSS].every(x=>Number.isSafeInteger(x)&&x>=0),'actual entry usage');
 return {budget,python:usage,entry:after.resourceUsage};
}
export function fileOperation(job){
 const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'worker original deadline');live();
 if(job.kind==='recheck')return checkBindings(job.sources,live,job.sourceIdentities);
 if(job.kind==='publish'){checkBindings(job.sources,live,job.sourceIdentities);return writeNew(job.filename,job.record,live);}
 if(job.kind==='preflight'){
  const b=readBound(job.planPath,job.planSha,true,1024**2,live),pre=validatePlan(parseJSON(b.data),job);const sources=uniqueBindings([...pre.sources,clean(b)]),captured=checkBindings(sources,live);
  const sourceIdentities=Object.fromEntries(captured.map(b=>[b.path,b.identity]));
  const original=readBound(pre.plan.originalBindings.export.path,pre.plan.originalBindings.export.sha256,true,FILE,live);
  check(original.identity===sourceIdentities[original.path],'original export identity');
  const parentMetadata=originalParentMetadata(parseJSON(original.data),pre.plan.parentIndex);
  return {...pre,sources,sourceIdentities,parentMetadata,planBinding:clean(b)};
 }
 check(job.kind==='admit','known worker operation');const context=job.context,{plan,output}=context;
 checkBindings(context.sources,live,context.sourceIdentities);const stdout=readBound(job.stdout.path,job.stdout.sha256,true,LOG,live);check(stdout.bytes===job.stdout.bytes,'fresh stdout binding');
 check(stdout.data.toString().split('\n').filter(Boolean).length===1,'exactly one fresh completion');const done=parseJSON(stdout.data);
 const stderr=readBound(job.stderrPath,undefined,true,LOG,live),resources=checkProcess(job.processReceipt,job.stage,context,stderr.data);
 const layout=inspectCandidate(output,true);const manifestBinding=layout.bindings[3],manifest=parseJSON(readBound(manifestBinding.path,manifestBinding.sha256,true,FILE,live).data);
 keys(manifest,MANIFEST_KEYS);check(manifest.schema==='braid-program/f6c-parent-emission-refinement-cover.v1'&&manifest.scope===parentScope(plan.parentIndex)&&manifest.status==='conditional_complete'&&manifest.accepted===false&&same(manifest.census,CENSUS)&&same(manifest.helperCalls,CALLS)&&same(manifest.claims,CLAIMS)&&same(manifest.libraryFlags,LIBRARY_FLAGS),'candidate disposition/census/flags');
 check(Array.isArray(manifest.members)&&manifest.members.length===8&&Array.isArray(manifest.restrictions)&&manifest.restrictions.length===56,'complete candidate members/restrictions');
 for(const[k,v]of Object.entries({launchPlan:context.planBinding,producer:plan.producer,verifier:plan.verifier,declaration:plan.declaration,originalBindings:plan.originalBindings,acceptanceOwner:plan.acceptanceOwner,priorCoverClosure:plan.priorCoverClosure,subjectSourceBindings:context.subjects,runtimeBindings:plan.runtimeBindings,operationalBindings:plan.operationalBindings,algorithm:ALGORITHM,publicationRequires:PUBLICATION_REQUIRES}))check(same(manifest[k],v),'manifest binding '+k);
 check(Object.entries(context.parentMetadata).every(([k,v])=>same(manifest.parent?.[k],v)),'selected original parent metadata identity');
 for(let i=0;i<3;i++)check(same(manifest[['queries','rows','pieces'][i]],layout.bindings[i]),'actual candidate stream binding');
 check(Array.isArray(manifest.historicalSourceBindings)&&manifest.historicalSourceBindings.length>0&&manifest.historicalSourceBindings.length<=512,'historical source closure');checkBindings(manifest.historicalSourceBindings.map(b=>binding(b,context.root)),live);
 let outputs=layout.bindings,capturedSourceBindings=manifest.historicalSourceBindings;
 if(job.stage==='producer'){
  keys(done,COMPLETION_KEYS);check(done.completed===true&&done.accepted===false&&done.scope===parentScope(plan.parentIndex)&&done.parentIndex===plan.parentIndex&&same(done.outputs,outputs)&&same(done.census,CENSUS)&&same(done.helperCalls,CALLS)&&same(done.claims,CLAIMS)&&done.independentComparisonRequired===true&&done.externalInclusiveDeadlineAndProcessClosureRequired===true,'producer fresh completion');
  check([done.elapsedSeconds,done.processUserSeconds,done.processSystemSeconds,done.maximumIndividualProcessResidentBytes].every(x=>Number.isFinite(x)&&x>=0)&&done.elapsedSeconds<1800,'producer measured resources');
 }else{
  keys(done,['completed','accepted','scope','output','elapsedSecondsBeforeCompletion','publicationRequires']);check(done.completed===true&&done.accepted===true&&done.scope===parentScope(plan.parentIndex)&&done.publicationRequires===PUBLICATION_REQUIRES&&Number.isFinite(done.elapsedSecondsBeforeCompletion)&&done.elapsedSecondsBeforeCompletion>=0&&done.elapsedSecondsBeforeCompletion<1800,'comparison fresh completion');
  const b=binding(done.output,context.root);check(b.path===output+'-outer/comparison.json','comparison output path');const raw=readBound(b.path,b.sha256,true,FILE,live);check(raw.bytes===b.bytes,'comparison bytes');const report=parseJSON(raw.data);
  keys(report,'schema scope accepted authority manifest queries rows pieces launchPlan verifier sourceBindings historicalSourceBindings originalBindings acceptanceOwner priorCoverClosure parent analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split(' '));
  check(report.schema==='braid-program/f6c-parent-emission-refinement-conformance.v1'&&report.scope===parentScope(plan.parentIndex)&&report.accepted===true&&report.analysis?.accepted===false&&same(report.candidateClaims,CLAIMS)&&same(report.manifest,manifestBinding)&&same(report.launchPlan,context.planBinding)&&same(report.verifier,plan.verifier)&&same(report.parent,manifest.parent)&&same(report.historicalSourceBindings,manifest.historicalSourceBindings),'conditional comparison/source identity');
  check(report.analysis.conditional_query_replay_conformant===true&&report.analysis.conditional_final_cover_conformant===true,'positive conditional comparison');
  check(Array.isArray(report.analysis.claims)&&report.analysis.claims.length===Object.keys(CLAIMS).length&&same(Object.fromEntries(report.analysis.claims),CLAIMS),'unchanged pure comparison authority flags');
  for(const [k,v]of Object.entries({query_count:3584,pair_count:56,row_count:64,ordinary_nonself_rows:56,self_exclusion_rows:8,piece_record_count:112,final_strict_face_checks:112,oldest_boundary_checks:56}))check(report.analysis[k]===v,'comparison census '+k);
  check(report.publicationRequires===PUBLICATION_REQUIRES&&Number.isFinite(report.elapsedSecondsBeforePublication)&&report.elapsedSecondsBeforePublication>=0&&report.elapsedSecondsBeforePublication<1800,'comparison publication boundary');
  for(const k of ['queries','rows','pieces','originalBindings','acceptanceOwner','priorCoverClosure'])check(same(report[k],manifest[k]),'comparison binding '+k);
  check(Array.isArray(report.sourceBindings)&&report.sourceBindings.length>0&&report.sourceBindings.length<=1024,'comparison full source closure');
  const reported=report.sourceBindings.map(b=>binding(b,context.root));check(new Set(reported.map(b=>b.path)).size===reported.length,'unique comparison source closure');
  for(const b of uniqueBindings([...context.sources,...manifest.historicalSourceBindings,...layout.bindings]))check(reported.some(v=>same(v,b)),'comparison omits original/current source or candidate');
  capturedSourceBindings=uniqueBindings([...manifest.historicalSourceBindings,...reported]);checkBindings(capturedSourceBindings,live);
  const privateNames=readdirSync(output+'-outer').filter(n=>n.startsWith('.parent-refinement-comparison-private-'));check(privateNames.length===1,'one private comparison');const hidden=path.join(output+'-outer',privateNames[0]),a=regular(b.path),z=regular(hidden);check(a.dev===z.dev&&a.ino===z.ino&&a.nlink===2&&z.nlink===2,'comparison same-inode publication');outputs=[...outputs,b];
 }
 const finalCaptured=checkBindings(uniqueBindings([...context.sources,...capturedSourceBindings,...outputs,clean(stdout),clean(stderr)]),live,context.sourceIdentities);
 const sourceIdentities=Object.fromEntries(finalCaptured.map(b=>[b.path,b.identity]));live();
 return{accepted:true,h3EvidenceEligible:false,stage:job.stage,authority:'operational-source-and-fresh-completion-admission-only',completion:done,completionLog:clean(stdout),stderrLog:clean(stderr),outputs,manifest:manifestBinding,historicalSourceBindings:manifest.historicalSourceBindings,capturedSourceBindings,sourceIdentities,resources};
}

function namedSize(filename,limit){if(!existsSync(filename))return 0;return regular(filename,limit).size;}
export function pollOutputs(output,ops,logTotal,rssTotal){
 const processLogs=['producer','comparison'].flatMap(s=>['runner-stdout.log','runner-stderr.log'].map(n=>path.join(ops,s+'-process',n)));
 const logBytes=logTotal.bytes+rssTotal.bytes+processLogs.reduce((n,p)=>n+namedSize(p,LOG),0)+['rejection.json','terminal-rejection.json'].reduce((n,p)=>n+namedSize(path.join(ops,p),LOG),0);
 check(logBytes<=LOG,'combined16MiB logs');const candidate=inspectCandidate(output);
 const privateNames=readdirSync(ops).filter(n=>n.startsWith('.parent-refinement-comparison-private-'));
 check(privateNames.length<=1,'one private comparison attempt');
 for(const n of [...privateNames,'comparison.json','operation.json'])namedSize(path.join(ops,n),FILE);
 if(existsSync(path.join(ops,'comparison.json'))){check(privateNames.length===1,'public comparison requires private generation');const a=regular(path.join(ops,'comparison.json')),b=regular(path.join(ops,privateNames[0]));check(a.dev===b.dev&&a.ino===b.ino&&a.nlink===2&&b.nlink===2,'comparison alias during monitoring');}
 return {logBytes,candidateBytes:candidate.bytes};
}
export async function coordinate({planPath,planSha,selfSha,output,python,git,began,deadlineNanoseconds,diagnostics}){
 const root=realpathSync(process.cwd()),self=readBound(path.join(root,SELF),selfSha,true,1024**2);
 check(import.meta.url===url(self.data),'coordinator executes captured generation');
 const helper=readBound(path.join(root,PINS.helpers[0]),PINS.helpers[1],true,1024**2),outerSource=readBound(path.join(root,PINS.outer[0]),PINS.outer[1],true,1024**2);
 const H=await import(url(helper.data)),outer=await import(url(outerSource.data));
 const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),hostRecords=[],stages=[];
 const rss={beganMs:began,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0};
 let failure,lock,timer,deadlineTimer,rssJob,hostJob,logFD,rssFD,active=false,publication,pre,closed=false,ops;
 let currentStage='preflight';const logTotal={bytes:0},rssTotal={bytes:0},originalError=console.error;
 const remaining=()=>Math.floor(LIMIT-(performance.now()-began));
 const live=()=>{check(!failure&&!abort.signal.aborted,failure?.message??'interrupted');check(remaining()>0,'inclusive1800s');};
 const fail=e=>{failure??=e;abort.abort(failure);if(active)process.emit('SIGTERM');};diagnostics.bind(fail);
 const worker=job=>H.runFileWorker({...job,deadlineNanoseconds},self.data,remaining(),abort.signal);
 const poll=()=>ops?pollOutputs(output,ops,logTotal,rssTotal):null;
 const log=x=>{const raw=Buffer.from((typeof x==='string'?x:JSON.stringify(x))+'\n');H.boundedLogAppend(logFD,raw,logTotal);diagnostics.write(raw);poll();};
 const probe=(command,args,timeout,maxBuffer)=>{
  const p=new Promise((resolve,reject)=>{const child=execFile(command,args,{timeout,killSignal:'SIGKILL',maxBuffer,encoding:'utf8',env:{...process.env,LC_ALL:'C'}},(error,text)=>{probes.delete(child.pid);error?reject(error):resolve({text,pid:child.pid});});if(command==='/bin/ps')probes.add(child.pid);});
  pending.add(p);p.finally(()=>pending.delete(p)).catch(()=>{});return p;
 };
 const table=async()=>{const start=performance.now(),r=await probe('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,args='],500,8*1024**2),rows=H.parseObservation(r.text).filter(x=>x.pid!==r.pid);Object.defineProperty(rows,'sampleStartedMs',{value:start});return rows;};
 const sample=rows=>{const value=H.acceptRSS(rss,H.selectOwnedRows(rows,process.pid,owners,outer,probes),performance.now(),rows.sampleStartedMs);H.boundedLogAppend(rssFD,Buffer.from(JSON.stringify({kind:'aggregate-rss',stage:currentStage,elapsedSeconds:(performance.now()-began)/1000,...value})+'\n'),rssTotal);poll();};
 const inspect=async()=>{const rows=await table();if(!abort.signal.aborted)try{sample(rows);}catch(e){fail(e);throw e;}return rows.map(({rssBytes,...r})=>r);};
 const host=async launch=>{const result=await probe('/usr/bin/memory_pressure',[],2000,1024**2),disk=statfsSync(root,{bigint:true}),value={kind:'host-resource',elapsedSeconds:(performance.now()-began)/1000,...H.parseHostResource(result.text,disk.bavail*disk.bsize,launch)};hostRecords.push(value);log(value);};
 const stop=async()=>{clearInterval(timer);clearTimeout(deadlineTimer);if(rssJob)await rssJob;if(hostJob)await hostJob;await Promise.allSettled([...pending]);};
 const interrupt=()=>{if(!abort.signal.aborted)fail(Error('operator interrupted'));};
 try{
  // Only bounded plan/composition metadata precedes monitoring; its time and
  // first RSS gap are charged to the original clock, never a refreshed budget.
  const raw=readBound(planPath,planSha,true,1024**2);validatePlan(parseJSON(raw.data),{root,selfSha,python,git});
  check(path.isAbsolute(output)&&path.resolve(output)===output&&path.dirname(output)===path.join(root,LANE)&&realpathSync(path.dirname(output))===path.dirname(output)&&/^pilot-parent-1-[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(path.basename(output)),'canonical parent1 output lane');
  ops=output+'-outer';check(!existsSync(output)&&!existsSync(ops),'fresh output and operation sibling');mkdirSync(ops,{mode:0o700});
  logFD=openSync(path.join(ops,'launcher-stderr.log'),'wx',0o600);rssFD=openSync(path.join(ops,'resource-observations.ndjson'),'wx',0o600);
  console.error=(...v)=>{try{log(v.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' '));}catch(e){fail(e);}};
  process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);deadlineTimer=setTimeout(()=>fail(Error('wall deadline')),Math.max(1,remaining()));
  let nextHost=performance.now()+15000;
  timer=setInterval(()=>{try{check(rss.lastSampleMs===null||performance.now()-rss.lastSampleStartedMs<=1000,'lost RSS monitor');
   if(!rssJob)rssJob=table().then(r=>{if(!abort.signal.aborted)sample(r);}).catch(fail).finally(()=>{rssJob=undefined;});
   if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});log({kind:'parent-refinement-heartbeat',stage:currentStage,elapsedSeconds:(performance.now()-began)/1000,accepted:false});}poll();
  }catch(e){fail(e);}},250);
  const initial=await table();sample(initial);noCompetitor(initial,process.pid);
  check(realpathSync(path.dirname(path.join(root,LOCK)))===path.dirname(path.join(root,LOCK)),'canonical shared lock lane');lock=H.reserveLock(path.join(root,LOCK),initial.find(r=>r.pid===process.pid));
  pre=await worker({kind:'preflight',root,selfSha,python,git,planPath,planSha});
  for(const target of [output,ops])await probe(git,['check-ignore','-q','--',path.relative(root,target)],2000,4096);
  await host(true);live();
  let manifest;
  for(const stage of ['producer','comparison']){
   currentStage=stage;live();const context={...pre,root,output,python,git,deadlineNanoseconds,...(manifest?{manifest}:{})};
   const stageOutput=path.join(ops,stage+'-process');let receipt;active=true;
   try{
    receipt=await outer.superviseRegisteredPilot({root,entry:SELF,
     args:['--registered',stage,planPath,planSha,selfSha,output,python,git,deadlineNanoseconds,manifest?.sha256??'none'],
     sources:[{path:SELF,sha256:selfSha,bytes:self.data}],output:stageOutput,startedAtMs:began,limitMs:LIMIT,heartbeatMs:15000,
     inspectProcesses:H.startupAbortInspection(inspect,abort.signal),
     admit:({receipt:processReceipt,signal})=>H.runFileWorker({kind:'admit',stage,context,processReceipt,stdoutPath:path.join(stageOutput,'runner-stdout.log'),stderrPath:path.join(stageOutput,'runner-stderr.log'),deadlineNanoseconds},self.data,remaining(),signal)});
   }catch(e){if(e.outerReceipt)stages.push({stage,process:e.outerReceipt});throw e;}finally{active=false;}
   stages.push({stage,process:receipt});
   check(receipt.accepted===true&&receipt.processesClosed===true&&receipt.admission?.accepted===true&&same(receipt.stdoutLog,receipt.admission.completionLog),'closed stage and exact fresh completion');
   await worker({kind:'recheck',sources:uniqueBindings([...pre.sources,...receipt.admission.capturedSourceBindings,...receipt.admission.outputs,receipt.stdoutLog,receipt.stderrLog])});
   manifest=receipt.admission.manifest;sample(await table());live();
  }
  currentStage='publication';
  const finalStage=stages[1].process,allSources=uniqueBindings([...pre.sources,...stages.flatMap(s=>[...s.process.admission.capturedSourceBindings,...s.process.admission.outputs,s.process.stdoutLog,s.process.stderrLog])]);
  await worker({kind:'recheck',sources:allSources});sample(await table());await host(false);live();
  const record={schema:'braid-program/f6c-parent-emission-refinement-operation.v1',accepted:true,scope:OP_SCOPE,parentIndex:1,plan:pre.planBinding,sourceBindings:pre.sources,stages,
   observationsBeforePublication:{...rss},hostObservationsBeforePublication:hostRecords,elapsedSecondsBeforePublication:(performance.now()-began)/1000,
   publicationRequires:'matching fresh caller exit0 and whole-attempt deadline/RSS checks after final source/log hashing and closed workers/monitors/lock/stdio',
   claims:CLAIMS,accelerationEvaluated:false,eomExecuted:false,wholeHistoryMetrics:false};
  publication=await worker({kind:'publish',filename:path.join(ops,'operation.json'),record,sources:allSources});
  await worker({kind:'recheck',sources:[...allSources,publication]});sample(await table());live();await stop();live();
  H.releaseLock(lock);lock=undefined;for(const fd of [logFD,rssFD])fsyncSync(fd);
  const logBindings=['launcher-stderr.log','resource-observations.ndjson'].map(n=>clean(readBound(path.join(ops,n),undefined,false,LOG,live)));
  const sizes=poll(),final={completed:true,accepted:true,scope:OP_SCOPE,parentIndex:1,operation:publication,outputs:finalStage.admission.outputs,logs:logBindings,census:CENSUS,helperCalls:CALLS,
   processesClosed:true,workersAndMonitorsClosed:true,lockReleased:true,maximumSampledRSSBytes:rss.maximumSampledRSSBytes,samples:rss.samples,maximumSampleGapMs:rss.maximumSampleGapMs,
   finalObservationToClosureMs:H.admitFinalObservation(rss,performance.now()),lastSampleStartedMs:rss.lastSampleStartedMs,
   elapsedSeconds:(performance.now()-began)/1000,coordinatorResourceUsage:process.resourceUsage(),candidateBytes:sizes.candidateBytes,operationalLogBytes:sizes.logBytes,
   claims:CLAIMS,accelerationEvaluated:false,eomExecuted:false,wholeHistoryMetrics:false};
  closed=true;return final;
 }catch(e){
  fail(e);await stop();
  if(ops&&existsSync(ops))try{writeNew(path.join(ops,'rejection.json'),{completed:false,accepted:false,failure:String(failure.message),stageFailure:String(e.message),invalidates:publication??null,
   stages:stages.map(s=>({stage:s.stage,process:s.process})),processesClosed:stages.length>0&&stages.every(s=>s.process.processesClosed===true),claims:CLAIMS});}catch{}
  throw failure;
 }finally{
  let cleanupFailure;try{await stop();}catch(e){cleanupFailure=e;}
  try{if(lock)H.releaseLock(lock);}catch(e){cleanupFailure??=e;}
  console.error=originalError;process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
  for(const fd of [logFD,rssFD])if(fd!==undefined)try{closeSync(fd);}catch(e){cleanupFailure??=e;}
  diagnostics.check();if(cleanupFailure)throw cleanupFailure;
  if(closed){live();H.admitFinalObservation(rss,performance.now());}
 }
}
export function parseArgs(v){
 check(v.length===12,'closed coordinator CLI');const result={};
 for(let i=0;i<v.length;i+=2){check(['--plan','--plan-sha256','--self-sha256','--out','--python','--git'].includes(v[i])&&!Object.hasOwn(result,v[i])&&typeof v[i+1]==='string'&&v[i+1],'unique paired arguments');result[v[i]]=v[i+1];}
 check(/^[a-f0-9]{64}$/u.test(result['--plan-sha256'])&&/^[a-f0-9]{64}$/u.test(result['--self-sha256']),'explicit source hashes');
 return{planPath:result['--plan'],planSha:result['--plan-sha256'],selfSha:result['--self-sha256'],output:result['--out'],python:result['--python'],git:result['--git']};
}
async function main(){
 const began=performance.now(),deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n),v=process.argv.slice(2);
 if(v[0]==='--registered'){check(v.length===10,'registered arguments');return registered(...v.slice(1));}
 const options=parseArgs(v),root=realpathSync(process.cwd()),lifetime=readBound(path.join(root,PINS.diagnostics[0]),PINS.diagnostics[1],true,1024**2),D=await import(url(lifetime.data)),diagnostics=D.diagnosticGuard();
 let result;
 try{
  const self=readBound(path.join(root,SELF),options.selfSha,true,1024**2),C=await import(url(self.data));result=await C.coordinate({...options,began,deadlineNanoseconds,diagnostics});
  const H=await import(url(readBound(path.join(root,PINS.helpers[0]),PINS.helpers[1],true,1024**2).data));
  await D.drainDiagnostics({began,lastSampleStartedMs:result.lastSampleStartedMs});diagnostics.check();result.elapsedSeconds=(performance.now()-began)/1000;
  await H.flushCompletion(result,{began,lastSampleStartedMs:result.lastSampleStartedMs});diagnostics.check();await diagnostics.close(began);
  check(performance.now()-began<LIMIT&&performance.now()-result.lastSampleStartedMs<=1000,'postflush deadline/gap');
 }catch(e){
  if(result)try{writeNew(path.join(path.dirname(result.operation.path),'terminal-rejection.json'),{completed:false,accepted:false,failure:String(e.message),invalidates:result.operation,scope:'failed-final-publication-no-authority'});}catch{}
  await D.failedCLICompletion(e,{began});
 }
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e);process.exitCode=1;});

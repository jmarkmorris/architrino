// Thin ordered parent producer/comparison composition for the frozen generic
// operation coordinator. No monitor loop, numerical implementation or retry.
// CLI: registered stages only. Use f6c-bounded-operation.mjs for the operation.
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
 helpers:['scripts/eom/launch-prescribed-response-pilot.mjs','9eb1afb84a175b143020610c153f9fef6dabb50efce9f956991feca3fbc0d5c2'],
 outer:['scripts/eom/launch-subfield-circular-root-pilot.mjs','cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48'],
 diagnostics:['scripts/eom/launch-f6c-emission-refinement-pilot.mjs','7a1f5571827225d1529f73a3f0b905be75e81e2f7d11c2670b697e0599d65e71'],
});
export const NAMED=Object.freeze({"declaration":["reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-emission-refinement-reference.md","652d77241f9b5c082e7d15e2bb62328f346760548f9f13e4ffe7562c4cad0733"],"producer":["scripts/eom/prepare-f6c-parent-emission-refinement.py",null],"producerControls":["tests/test_f6c_parent_emission_refinement_preparation.py",null],"proposalReference":["scripts/eom/f6c_parent_emission_refinement.py","1517575f3df783af36d2bf2b758d19427e8ec85247efec892783716c263b7c27"],"proposalReferenceControls":["tests/test_f6c_parent_emission_refinement.py","f1650b5e73a06ecd7ed05bff10ba97949b42aa5330e84fb3514c2f868eff0fc2"],"verifier":["scripts/eom/verify-f6c-parent-emission-refinement.py",null],"verifierControls":["tests/test_f6c_parent_emission_refinement_verification.py",null],"comparisonReference":["scripts/eom/oracle/f6c_parent_emission_refinement_conformance.py","ffe91ad7cbfe4e41bf92203fe73b4195e0ad1437176dace9d12751e68aa2cbec"],"comparisonReferenceControls":["tests/test_f6c_parent_emission_refinement_conformance.py","18c21d6e84d0d6ae7e3b4ea35861a75b38d362d8aad1e0cc14715cea167a5a04"]});
export const DEPENDENCIES=Object.freeze({"transport":["scripts/eom/verify-f6c-refined-acceleration.py","b5ac487c1004976c346bce9dfe451ae82def1087c79102c5e4894ea69eac11e2"],"transportControls":["tests/test_f6c_refined_acceleration.py","4d8bc9e7eaf1166a7c8e42133d3a3e8812c3f228c1fb13c9215994338972f72a"],"scientificDecoder":["scripts/eom/oracle/f6c_refined_acceleration_conformance.py","63db48f604d0b1abdf61f0efcb3894feac9d30a25af26a4d96f01bda6522e2a2"],"scientificDecoderControls":["tests/test_f6c_refined_acceleration_conformance.py","3fb6eabd03a56b982f2601f11b535c60208f03df519e41ea29d4ba018a0e531e"],"productionHelper":["scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py","af53f5af2f9dd7eda4869af2a7533f869f4e3866003c90bf9a8487b2e5636386"],"productionHelperControls":["tests/test_f6c_cached_continuous_reception_root_cover_preparation.py","9abc7c3a80ad670e7bc7ad9f94a95f1fcd8924de425991032d6d26bba3372427"],"historyReference":["scripts/eom/oracle/certified_history.py","ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7"],"decimalReference":["scripts/eom/oracle/decimal_interval.py","fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a"],"decimalControls":["tests/test_eom_decimal_interval.py","22242cb7335cdddeb56416b8584793972195ee1aa6b460d8a43ea6baeb693b44"],"rootLibrary":["scripts/eom/oracle/continuous_reception_roots_cached.py","daa4cc227cb8685de673fc400d817a19666b4fc7323e6c3a56f475a463b23acf"],"rootControls":["tests/test_eom_continuous_reception_roots_cached.py","a5ac7c8b26c5d0a193f20305f4bdbad93939756780bdaefd9cbf569f42a487eb"],"independentRootReference":["scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py","19c57e9b638b0beb866c86b061b2325f9567add2a85608f0c42ef1f7612d9132"],"independentRootControls":["tests/test_f6c_cached_continuous_reception_root_cover.py","2fd2080b3b4facdc80b85cdc65610c2bfeefdd8eab5f7234e207d3d4908bc117"],"cacheEquivalence":["reference/priorities/braid-program/evidence/2026-08-27-f6c-call-local-state-cache-equivalence.md","798858e87058b5a1a2d478c89edad3154a2e4993f3c14cab089b4aabf3434ee3"]});
export const ORIGINAL=Object.freeze({"export":[".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json","f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1"],"reconstruction":[".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json","7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43"],"guards":[".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json","86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880"],"fullEntry":["scripts/eom/run-f6c-cached-root-cover-full.mjs","373930ca36ca50067b0df37a48ed96cd34527d912af2f6696d6c4d4992a99bb0"],"fullRows":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/rows.ndjson","28491edb2f1faec7adf248f535d29a1600b8bd69f5a46706fd26dbb3eb848b5c",22585784],"fullPieces":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/pieces.ndjson","b3a2ddf2c8cd5b586ef7b374eee94afc395f63496c849ec574e71bf1f487a9ab",7505144],"fullManifest":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/subject/cover-manifest.json","61b0cdfad85696a0b5ead7df838119c9005a28656e9ac3daa26df139054410e2",42922],"fullComparison":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/comparison.json","1c423aece2009a2d7d0852e9558c16464c640abbc5bea3743211af3805b6eed2",43377],"fullAdmission":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json","8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f",332567],"fullLauncherLog":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/launcher-stderr.log","b976d8deb556d8faba5a3aff73a09b77ec26c6da84e42726167eec4ec7a43314",30969],"fullResourceLog":[".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/resource-observations.ndjson","66eb0cfa1811d0a834d18d3bd8e749a941e1964f7276898b80a4e12136d69d03",1710278],"fullPlan":["reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-launch.v1.json","5dd7e27084a2e8e5b2c3ed8daf8cf66248a437108710ce91281977e728197ddc",45282]});
export const PLAN_KEYS=Object.freeze(["schema","scope","parentIndex","declaration","producer","producerControls","proposalReference","proposalReferenceControls","verifier","verifierControls","comparisonReference","comparisonReferenceControls","dependencies","originalBindings","acceptanceOwner","priorCoverClosure","runtimeBindings","operationalBindings","historicalDocumentRoutes","limits"]);
export const MANIFEST_KEYS=Object.freeze(["schema","scope","status","accepted","launchPlan","producer","verifier","declaration","parent","members","originalBindings","acceptanceOwner","priorCoverClosure","historicalSourceBindings","subjectSourceBindings","runtimeBindings","operationalBindings","algorithm","restrictions","census","helperCalls","queries","rows","pieces","libraryFlags","claims","publicationRequires"]);
export const COMPLETION_KEYS=Object.freeze(["completed","accepted","scope","parentIndex","outputs","publicationRecords","census","helperCalls","elapsedSeconds","processUserSeconds","processSystemSeconds","maximumIndividualProcessResidentBytes","independentComparisonRequired","externalInclusiveDeadlineAndProcessClosureRequired","claims"]);
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
 keys(input,PLAN_KEYS);check(input.schema==='braid-program/f6c-parent-emission-refinement-launch.v2'&&input.scope===parentScope(input.parentIndex),'selected original parent scope');
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
 plan.historicalDocumentRoutes=historicalRoutes(input.historicalDocumentRoutes,root);
 const current=[...subjects,...plan.runtimeBindings,...plan.operationalBindings];check(new Set(current.map(b=>b.path)).size===current.length,'duplicate current source/runtime');
 return {plan,sources:uniqueBindings([...current,...Object.values(plan.originalBindings),plan.acceptanceOwner,...plan.historicalDocumentRoutes.map(r=>r.physical)]),subjects:subjects.sort((a,b)=>a.path<b.path?-1:1)};
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
  assert ident(a)==ident(os.fstat(fd))==ident(os.stat(p,follow_symlinks=False))and hashlib.sha256(raw).hexdigest()==digest;return raw,ident(a)
 finally:os.close(fd)
raw,original_identity=read();exec(compile(raw,filename,'exec',dont_inherit=True),dict(__name__='__main__',__file__=filename));assert read()==(raw,original_identity)
u=resource.getrusage(resource.RUSAGE_SELF)
print(__import__('json').dumps(dict(kind='parent-refinement-python-resources',stage=stage,userSeconds=u.ru_utime,systemSeconds=u.ru_stime,maximumIndividualResidentBytes=u.ru_maxrss if sys.platform=='darwin'else u.ru_maxrss*1024)),file=sys.stderr,flush=True)
`;
export function stageSpec(stage,context,budget){
 const {plan,planBinding,output,root,python,git}=context;check(['producer','comparison'].includes(stage),'serial stage name');
 const role=stage==='producer'?'producer':'verifier',args=['--repo-root',root,'--plan',planBinding.path,'--plan-sha256',planBinding.sha256];
 if(stage==='producer')args.push('--producer-sha256',plan[role].sha256,'--out-dir',output,'--git-binary',git);
 else{check(context.manifest,'prior closed producer manifest required');args.push('--verifier-sha256',plan[role].sha256,'--manifest',context.manifest.path,'--manifest-sha256',context.manifest.sha256,'--out',output+'-outer/comparison.json');}
 args.push('--budget-seconds',budget.seconds,'--operation-plan',context.operationPlanBinding.path,'--operation-plan-sha256',context.operationPlanBinding.sha256,'--scientific-bytes-already',String(context.scientificBytesAlready),'--maximum-stage-output-bytes',String(context.maximumStageOutputBytes));
 return {command:python,args:['-I','-B','-c',PYTHON_BOOTSTRAP,stage,plan[role].path,plan[role].sha256,...args]};
}
export function inspectCandidate(output,complete=false,live=()=>{}){
 live();check(realpathSync(output)===output&&lstatSync(output).isDirectory(),'canonical candidate');
 const names=readdirSync(output),publicNames=['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'],bindings=[],inodes=new Map();
 for(const n of names){const known=publicNames.includes(n)||publicNames.some(p=>n.startsWith(p+'.partial.')&&/^[a-f0-9]{32}$/u.test(n.slice((p+'.partial.').length)));check(known,'unknown candidate output');}
 for(const name of publicNames){
  const hidden=names.filter(n=>n.startsWith(name+'.partial.')&&/^[a-f0-9]{32}$/u.test(n.slice((name+'.partial.').length)));
  check(hidden.length<=1&&(!complete||hidden.length===1),'one private path per role');
  for(const n of [...hidden,...(names.includes(name)?[name]:[])]){const f=path.join(output,n),st=lstatSync(f);check(st.isFile()&&!st.isSymbolicLink()&&st.size<=FILE,'bounded regular output');inodes.set(st.dev+':'+st.ino,st.size);}
  if(names.includes(name)){check(hidden.length===1,'public requires private');const a=lstatSync(path.join(output,name)),b=lstatSync(path.join(output,hidden[0]));check(a.dev===b.dev&&a.ino===b.ino&&a.nlink===2&&b.nlink===2,'exact public/private inode');bindings.push(clean(readBound(path.join(output,name),undefined,false,FILE,live)));}
 }
 check(!complete||names.length===8&&bindings.length===4,'complete eight-file candidate');const bytes=[...inodes.values()].reduce((a,b)=>a+b,0);check(bytes<=FILE,'candidate64MiB');return{bytes,bindings};
}
function checkPublications(records,outputs,live){
 check(Array.isArray(records)&&records.length===outputs.length,'original publication records');
 for(let i=0;i<records.length;i++){const r=records[i];keys(r,['binding','privatePath','identity']);check(same(r.binding,outputs[i]),'original publication binding');const prefix=r.binding.path+'.partial.';
  check(typeof r.privatePath==='string'&&r.privatePath.startsWith(prefix)&&/^[a-f0-9]{32}$/u.test(r.privatePath.slice(prefix.length)),'exact private publication path');
  check(Array.isArray(r.identity)&&r.identity.length===5&&r.identity.every(v=>typeof v==='string'&&/^(?:0|[1-9][0-9]*)$/u.test(v)),'original publication identity');
  for(const p of [r.binding.path,r.privatePath]){const a=readBound(p,r.binding.sha256,false,FILE,live);check(a.bytes===r.binding.bytes&&a.identity===r.identity.join(':'),'original producer FD generation');}
 }
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
function admitParent(job){
 const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'worker original deadline');live();
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
 check(Array.isArray(manifest.historicalSourceBindings)&&manifest.historicalSourceBindings.length>0&&manifest.historicalSourceBindings.length<=512,'historical source closure');checkBindings(manifest.historicalSourceBindings.map(b=>physicalSource(binding(b,context.root),plan)),live);
 let outputs=layout.bindings,capturedSourceBindings=manifest.historicalSourceBindings;
 if(job.stage==='producer'){
  keys(done,COMPLETION_KEYS);check(done.completed===true&&done.accepted===false&&done.scope===parentScope(plan.parentIndex)&&done.parentIndex===plan.parentIndex&&same(done.outputs,outputs)&&same(done.census,CENSUS)&&same(done.helperCalls,CALLS)&&same(done.claims,CLAIMS)&&done.independentComparisonRequired===true&&done.externalInclusiveDeadlineAndProcessClosureRequired===true,'producer fresh completion');
  checkPublications(done.publicationRecords,outputs,live);
  check([done.elapsedSeconds,done.processUserSeconds,done.processSystemSeconds,done.maximumIndividualProcessResidentBytes].every(x=>Number.isFinite(x)&&x>=0)&&done.elapsedSeconds<1800,'producer measured resources');
 }else{
  keys(done,['completed','accepted','scope','output','publicationRecord','elapsedSecondsBeforeCompletion','publicationRequires']);check(done.completed===true&&done.accepted===true&&done.scope===parentScope(plan.parentIndex)&&done.publicationRequires===PUBLICATION_REQUIRES&&Number.isFinite(done.elapsedSecondsBeforeCompletion)&&done.elapsedSecondsBeforeCompletion>=0&&done.elapsedSecondsBeforeCompletion<1800,'comparison fresh completion');
  const b=binding(done.output,context.root);check(b.path===output+'-outer/comparison.json','comparison output path');checkPublications([done.publicationRecord],[b],live);const raw=readBound(b.path,b.sha256,true,FILE,live);check(raw.bytes===b.bytes,'comparison bytes');const report=parseJSON(raw.data);
  keys(report,'schema scope accepted authority manifest queries rows pieces launchPlan verifier sourceBindings historicalSourceBindings originalBindings acceptanceOwner priorCoverClosure parent analysis candidateClaims publicationRequires elapsedSecondsBeforePublication'.split(' '));
  check(report.schema==='braid-program/f6c-parent-emission-refinement-conformance.v1'&&report.scope===parentScope(plan.parentIndex)&&report.accepted===true&&report.analysis?.accepted===false&&same(report.candidateClaims,CLAIMS)&&same(report.manifest,manifestBinding)&&same(report.launchPlan,context.planBinding)&&same(report.verifier,plan.verifier)&&same(report.parent,manifest.parent)&&same(report.historicalSourceBindings,manifest.historicalSourceBindings),'conditional comparison/source identity');
  check(report.analysis.conditional_query_replay_conformant===true&&report.analysis.conditional_final_cover_conformant===true,'positive conditional comparison');
  check(Array.isArray(report.analysis.claims)&&report.analysis.claims.length===Object.keys(CLAIMS).length&&same(Object.fromEntries(report.analysis.claims),CLAIMS),'unchanged pure comparison authority flags');
  for(const [k,v]of Object.entries({query_count:3584,pair_count:56,row_count:64,ordinary_nonself_rows:56,self_exclusion_rows:8,piece_record_count:112,final_strict_face_checks:112,oldest_boundary_checks:56}))check(report.analysis[k]===v,'comparison census '+k);
  check(report.publicationRequires===PUBLICATION_REQUIRES&&Number.isFinite(report.elapsedSecondsBeforePublication)&&report.elapsedSecondsBeforePublication>=0&&report.elapsedSecondsBeforePublication<1800,'comparison publication boundary');
  for(const k of ['queries','rows','pieces','originalBindings','acceptanceOwner','priorCoverClosure'])check(same(report[k],manifest[k]),'comparison binding '+k);
  check(Array.isArray(report.sourceBindings)&&report.sourceBindings.length>0&&report.sourceBindings.length<=1024,'comparison full source closure');
  const reported=report.sourceBindings.map(b=>binding(b,context.root));check(new Set(reported.map(b=>b.path)).size===reported.length,'unique comparison source closure');
  for(const b of uniqueBindings([...context.sources,...manifest.historicalSourceBindings.map(b=>physicalSource(b,plan)),...layout.bindings]))check(reported.some(v=>same(v,b)),'comparison omits original/current source or candidate');
  capturedSourceBindings=uniqueBindings([...manifest.historicalSourceBindings.map(b=>physicalSource(b,plan)),...reported]);checkBindings(capturedSourceBindings,live);
  outputs=[...outputs,b];
 }
 const finalCaptured=checkBindings(uniqueBindings([...context.sources,...capturedSourceBindings.map(b=>physicalSource(b,plan)),...outputs,clean(stdout),clean(stderr)]),live,context.sourceIdentities);
 const sourceIdentities=Object.fromEntries(finalCaptured.map(b=>[b.path,b.identity]));live();
 return{accepted:true,h3EvidenceEligible:false,stage:job.stage,authority:'operational-source-and-fresh-completion-admission-only',completion:done,completionLog:clean(stdout),stderrLog:clean(stderr),outputs,manifest:manifestBinding,historicalSourceBindings:manifest.historicalSourceBindings,capturedSourceBindings,sourceIdentities,resources};
}

export const COORDINATOR=Object.freeze(['scripts/eom/f6c-bounded-operation.mjs','5428e4b89736730cdae1671f39b3fd5b0067be781fbfb8cda774347a9890b885']);
export function historicalRoutes(rows,root){
 check(Array.isArray(rows)&&rows.length<=2,'bounded consumed historical routes');
 const allowed={'c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853':16985,'46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef':13021},seen=new Set(),hashes=new Set();
 return rows.map(r=>{keys(r,['original','physical']);const original=binding(r.original,root),physical=binding(r.physical,root);
  check(allowed[original.sha256]===original.bytes&&original.path.startsWith(path.join(root,'reference/priorities/braid-program/evidence')+'/')&&/\.(?:md|json)$/u.test(original.path),'allowlisted historical document tuple');
  check(original.path!==physical.path&&original.sha256===physical.sha256&&original.bytes===physical.bytes&&!seen.has(original.path)&&!hashes.has(original.sha256),'distinct lossless archive route');seen.add(original.path);hashes.add(original.sha256);return{original,physical};});
}
export function physicalSource(b,plan){
 const row=plan.historicalDocumentRoutes.find(r=>r.original.path===b.path);
 if(!row)return b;check(same(row.original,b),'exact historical original tuple');return row.physical;
}
function batchSources(plan){return uniqueBindings([...plan.sources,plan.hookModule,plan.hookControls,...plan.stages.flatMap(s=>[s.entry,...s.sources,...s.runtimeBindings])]);}
async function coordinator(plan){
 const b=batchSources(plan).find(b=>b.path===path.join(plan.root,COORDINATOR[0]));check(b&&b.sha256===COORDINATOR[1],'frozen generic coordinator');
 const source=readBound(b.path,b.sha256,true,1048576);check(source.bytes===b.bytes,'coordinator bytes');return import(url(source.data));
}
export function makeBatchPlan({root,operationDirectory,parents,pythonCommand,git,hookModule,hookControls,sources,runtimeBindings,closureReserveBytes}){
 // Data-only construction: no source capture, host observation or execution.
 const configuration={schema:'braid-program/f6c-parent-emission-refinement-batch.v1',pythonCommand,git,parents,runtimeBindings,closureReserveBytes};
 const stages=parents.flatMap(p=>['producer','comparison'].map(role=>({id:'parent-'+p.parentIndex+'-'+role,entry:hookModule,args:['--registered',role,'--parent',String(p.parentIndex)],sources:[],runtimeBindings})));
 const outputDirectories=parents.flatMap(p=>[p.output,p.output+'-outer']);
 const publicationAliases=parents.flatMap(p=>[...['queries.ndjson','rows.ndjson','pieces.ndjson','cover-manifest.json'].map(n=>({publicPath:path.join(p.output,n),privateDirectory:p.output,privatePrefix:n+'.partial.'})),
  {publicPath:path.join(p.output+'-outer','comparison.json'),privateDirectory:p.output+'-outer',privatePrefix:'comparison.json.partial.'}]);
 return{schema:'braid-program/f6c-bounded-operation-plan.v1',root,operationDirectory,outputDirectories,publicationAliases,sources,hookModule,hookControls,configuration,stages};
}
export function makeParentPlans({template,indices,sourceBindings,runtimeBindings,operationalBindings,acceptanceOwner,historicalDocumentRoutes}){
 // Pure data derivation. The externally bound original template carries all
 // unchanged mathematical, history and closure tokens. No filesystem lookup,
 // frame interpolation, fixture strength or scientific evaluation occurs.
 keys(template,template.schema==='braid-program/f6c-parent-emission-refinement-launch.v1'?PLAN_KEYS.filter(k=>k!=='historicalDocumentRoutes'):PLAN_KEYS);
 check(['braid-program/f6c-parent-emission-refinement-launch.v1','braid-program/f6c-parent-emission-refinement-launch.v2'].includes(template.schema)&&same(template.limits,LIMITS),'frozen parent template');
 check(Array.isArray(indices)&&indices.length>0&&indices.length<=8&&indices.every((v,i)=>Number.isInteger(v)&&v>=0&&v<160&&(i===0||indices[i-1]<v)),'ordered bounded selected parents');
 check(Array.isArray(sourceBindings)&&Array.isArray(runtimeBindings)&&Array.isArray(operationalBindings),'externally bound current sources');
 const wrappers=['producer','producerControls','verifier','verifierControls'];
 const current=Object.fromEntries(wrappers.map(role=>{const rows=sourceBindings.filter(b=>b.path.endsWith('/'+NAMED[role][0]));check(rows.length===1,'one explicit current '+role);return[role,{...rows[0],path:NAMED[role][0]}];}));
 for(const [role,[p,h]] of Object.entries(NAMED))if(!wrappers.includes(role))check(template[role].path===p&&template[role].sha256===h,'frozen mathematical template '+role);
 return indices.map(parentIndex=>({...structuredClone(template),schema:'braid-program/f6c-parent-emission-refinement-launch.v2',scope:parentScope(parentIndex),parentIndex,
  ...structuredClone(current),runtimeBindings:structuredClone(runtimeBindings),operationalBindings:structuredClone(operationalBindings),acceptanceOwner:structuredClone(acceptanceOwner),historicalDocumentRoutes:structuredClone(historicalDocumentRoutes)}));
}
export function validateBatch(plan){
 const c=plan.configuration;keys(c,['schema','pythonCommand','git','parents','runtimeBindings','closureReserveBytes']);
 check(c.schema==='braid-program/f6c-parent-emission-refinement-batch.v1'&&Array.isArray(c.parents)&&c.parents.length>0&&c.parents.length<=8,'bounded explicit parent batch');
 check(c.pythonCommand===path.resolve(plan.root,process.env.AAA_VENV??'../.venv','bin/python'),'shared-venv command');
 check(typeof c.git==='string'&&path.isAbsolute(c.git)&&realpathSync(c.git)===c.git,'canonical bound Git');
 check(Number.isSafeInteger(c.closureReserveBytes)&&c.closureReserveBytes>=1048576&&c.closureReserveBytes<=16*1024**2,'explicit bounded closure reserve');
 let previous=-1;const paths=new Set();for(const p of c.parents){keys(p,['parentIndex','plan','output','producerMaximumBytes','comparisonMaximumBytes']);parentScope(p.parentIndex);check(p.parentIndex>previous,'strict unique parent order');previous=p.parentIndex;binding(p.plan,plan.root);
  for(const role of ['producerMaximumBytes','comparisonMaximumBytes'])check(Number.isSafeInteger(p[role])&&p[role]>0&&p[role]<=FILE,'positive bounded per-stage allocation');
  check(typeof p.output==='string'&&path.dirname(p.output)===path.join(plan.root,LANE)&&path.resolve(p.output)===p.output&&new RegExp('^pilot-parent-'+p.parentIndex+'-[A-Za-z0-9][A-Za-z0-9._-]*$','u').test(path.basename(p.output))&&!paths.has(p.output),'declared direct parent output');paths.add(p.output);}
 check(plan.hookModule.path===path.join(plan.root,SELF)&&plan.hookControls.path===path.join(plan.root,CONTROL),'captured parent hook/control');
 check(Array.isArray(c.runtimeBindings)&&c.runtimeBindings.length>0,'explicit full stage runtime');
 const expected=makeBatchPlan({root:plan.root,operationDirectory:plan.operationDirectory,parents:c.parents,pythonCommand:c.pythonCommand,git:c.git,hookModule:plan.hookModule,hookControls:plan.hookControls,sources:plan.sources,runtimeBindings:c.runtimeBindings,closureReserveBytes:c.closureReserveBytes});
 for(const field of ['outputDirectories','publicationAliases','stages'])check(same(plan[field],expected[field]),'exact declared batch '+field);
 const all=batchSources(plan);check(all.length<=512&&all.reduce((n,b)=>n+b.bytes,0)<=1024**3,'original source union caps');
 for(const b of c.parents.map(p=>p.plan))check(all.some(v=>same(v,b)),'per-parent plan globally bound');
 check(c.runtimeBindings.some(b=>b.path===realpathSync(process.execPath))&&c.runtimeBindings.some(b=>b.path===realpathSync(c.pythonCommand))&&c.runtimeBindings.some(b=>b.path===path.resolve(path.dirname(c.pythonCommand),'../pyvenv.cfg'))&&c.runtimeBindings.some(b=>b.path===c.git),'Node/Python/venv/Git bound');
 // Three common publications and fourteen file paths per parent are known
 // without estimating bytes or runtime. Operation failure never shortens list.
 check(3+14*c.parents.length<=512,'declared output path bound');
 check(c.parents.reduce((n,p)=>n+p.producerMaximumBytes+p.comparisonMaximumBytes,c.closureReserveBytes)<=FILE,'all declared stage allocations preserve shared closure reserve');
 return c;
}
function parentContext(plan,item,operationPlanBinding,deadlineNanoseconds){
 const c=validateBatch(plan),live=()=>check(process.hrtime.bigint()<BigInt(deadlineNanoseconds),'original operation deadline');
 const f=readBound(item.plan.path,item.plan.sha256,true,1048576,live);check(f.bytes===item.plan.bytes,'per-parent plan bytes');
 const pre=validatePlan(parseJSON(f.data),{root:plan.root,selfSha:plan.hookModule.sha256,python:c.pythonCommand,git:c.git});check(pre.plan.parentIndex===item.parentIndex,'selected parent plan');
 const original=readBound(pre.plan.originalBindings.export.path,pre.plan.originalBindings.export.sha256,true,FILE,live);
 const admission=readBound(pre.plan.originalBindings.fullAdmission.path,pre.plan.originalBindings.fullAdmission.sha256,true,FILE,live);
 const historical=parseJSON(admission.data).sourceBindings;check(Array.isArray(historical)&&historical.length===198,'complete historical ancestry');
 const all=batchSources(plan),required=uniqueBindings([...pre.sources,item.plan,...historical.map(b=>physicalSource(binding(b,plan.root),pre.plan))]);
 for(const b of required)check(all.some(v=>same(v,b)),'undisclosed original/current source '+b.path);
 for(const route of pre.plan.historicalDocumentRoutes)check(historical.some(b=>same(binding(b,plan.root),route.original)),'unused historical document route');
 const expectedRuntime=uniqueBindings([...pre.plan.runtimeBindings,...c.runtimeBindings.filter(b=>b.path===realpathSync(process.execPath))]);check(same(uniqueBindings(c.runtimeBindings),expectedRuntime),'exact parent/stage runtime set');
 const sources=uniqueBindings([...all,...(operationPlanBinding?[operationPlanBinding]:[])]),captured=checkBindings(sources,live);
 return{...pre,sources,sourceIdentities:Object.fromEntries(captured.map(b=>[b.path,b.identity])),root:plan.root,output:item.output,python:c.pythonCommand,git:c.git,planBinding:clean(f),operationPlanBinding,deadlineNanoseconds,parentMetadata:originalParentMetadata(parseJSON(original.data),item.parentIndex)};
}
export function parseRegisteredArgs(args){
 check(Array.isArray(args)&&args.length===10,'closed registered batch arguments');const result={};
 for(let i=0;i<args.length;i+=2){check(['--registered','--parent','--operation-plan-binding','--operation-deadline-ns','--operation-prior-stdout'].includes(args[i])&&!Object.hasOwn(result,args[i]),'unique known batch flag');result[args[i]]=args[i+1];}
 check(['producer','comparison'].includes(result['--registered'])&&/^(?:0|[1-9][0-9]{0,2})$/u.test(result['--parent']),'registered parent/role');parentScope(Number(result['--parent']));
 check(/^[0-9]{1,32}$/u.test(result['--operation-deadline-ns']),'original deadline');return result;
}
function priorCompletion(prior,expectedId,live){
 keys(prior,['stageId','stdoutLog']);check(prior.stageId===expectedId,'exact preceding parent stage');
 const b=binding(prior.stdoutLog,'/'),f=readBound(b.path,b.sha256,true,LOG,live);check(f.bytes===b.bytes&&f.data.toString().split('\n').filter(Boolean).length===1,'one closed prior completion');return parseJSON(f.data);
}
export async function registeredBatch(args){
 const flags=parseRegisteredArgs(args),operationPlanBinding=binding(parseJSON(Buffer.from(flags['--operation-plan-binding'])),'/'),deadline=flags['--operation-deadline-ns'],prior=parseJSON(Buffer.from(flags['--operation-prior-stdout']));
 const live=()=>check(process.hrtime.bigint()<BigInt(deadline),'original registered deadline');live();
 const p=readBound(operationPlanBinding.path,operationPlanBinding.sha256,true,1048576,live);check(p.bytes===operationPlanBinding.bytes,'original operation plan size');
 const plan=parseJSON(p.data),C=await coordinator(plan);C.validatePlan(plan,realpathSync(process.cwd()));const c=validateBatch(plan),index=Number(flags['--parent']),role=flags['--registered'],position=c.parents.findIndex(p=>p.parentIndex===index);check(position>=0,'declared parent');
 const item=c.parents[position],context=parentContext(plan,item,operationPlanBinding,deadline);
 check(import.meta.url.startsWith('file:')&&fileURLToPath(import.meta.url)===path.join(plan.root,SELF),'registered current entry');
 if(role==='producer'){
  if(position===0)check(prior===null,'first producer has no predecessor');
  else{const previous=c.parents[position-1],done=priorCompletion(prior,'parent-'+previous.parentIndex+'-comparison',live);check(done.completed===true&&done.accepted===true&&done.scope===parentScope(previous.parentIndex),'closed previous comparison');}
  const census=C.outputCensus(plan);check(census.scientificBytes+item.producerMaximumBytes+item.comparisonMaximumBytes+c.closureReserveBytes<=FILE&&census.files.length+14<=512,'remaining complete-parent allocations, closure reserve and output paths');
 }else{
  const done=priorCompletion(prior,'parent-'+index+'-producer',live);check(done.completed===true&&done.accepted===false&&done.parentIndex===index&&done.scope===parentScope(index)&&Array.isArray(done.outputs)&&done.outputs.length===4,'preceding producer identity');
  context.manifest=binding(done.outputs[3],plan.root);check(context.manifest.path===path.join(item.output,'cover-manifest.json'),'exact preceding manifest');checkPublications(done.publicationRecords,done.outputs,live);
 }
 context.scientificBytesAlready=C.outputCensus(plan).scientificBytes;
 context.maximumStageOutputBytes=item[role+'MaximumBytes'];
 check(context.scientificBytesAlready+context.maximumStageOutputBytes+c.closureReserveBytes+(role==='producer'?item.comparisonMaximumBytes:0)<=FILE,'stage allocation preserves comparison/closure reserve');
 const budget=remainingDuration(deadline),target=stageSpec(role,context,budget);console.error(JSON.stringify({kind:'parent-refinement-entry-budget',stage:role,budget,operationPlanBinding,scientificBytesAlready:context.scientificBytesAlready,maximumStageOutputBytes:context.maximumStageOutputBytes}));
 const {spawn}=await import('node:child_process');
 await new Promise((resolve,reject)=>{const child=spawn(target.command,target.args,{cwd:plan.root,detached:true,stdio:['ignore','pipe','pipe']});child.stdout.pipe(process.stdout);child.stderr.pipe(process.stderr);child.once('error',reject);child.once('close',(code,signal)=>code===0&&!signal?resolve():reject(Error('registered Python failed '+code+'/'+signal)));});
 checkBindings(context.sources,live,context.sourceIdentities);console.error(JSON.stringify({kind:'parent-refinement-entry-resources',stage:role,budget,resourceUsage:process.resourceUsage()}));live();
}
export function coordinatorAdmission(result,stdoutLog){
 // The coordinator owns the authenticated completionLog fields. Keep the
 // inner admission's independently reread binding check, then omit that field
 // at this hook boundary so the coordinator can attach its original identity.
 check(same(result.completionLog,stdoutLog)&&!Object.hasOwn(result,'completionLogIdentity'),'exact coordinator-owned completion binding');
 const {completionLog,...admission}=result;return admission;
}
export async function fileOperation(job){
 const C=await coordinator(job.plan),c=validateBatch(job.plan),live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'original batch deadline');live();
 if(job.kind==='preflight'){
  for(const item of c.parents)parentContext(job.plan,item,null,job.deadlineNanoseconds);
  // Global source and inode closure is independently enforced by C before and
  // after this pure hook, and again before each registered stage.
  return{accepted:true,h3EvidenceEligible:false,numericalCalls:0};
 }
 const admit=(stage,previousStages)=>{
  const match=/^parent-([0-9]+)-(producer|comparison)$/u.exec(stage.id);check(match,'declared stage identifier');const index=Number(match[1]),role=match[2],item=c.parents.find(p=>p.parentIndex===index);check(item,'declared selected parent');
  const stagePath=path.join(job.plan.operationDirectory,'stages',stage.id),stderrPath=path.join(stagePath,'runner-stderr.log');
  const stderr=readBound(stderrPath,undefined,true,LOG,live),events=stderr.data.toString().split('\n').filter(Boolean).map(l=>parseJSON(Buffer.from(l))),entry=events.filter(e=>e.kind==='parent-refinement-entry-budget');
  check(entry.length===1,'single entry original plan binding');const operationPlanBinding=binding(entry[0].operationPlanBinding,job.plan.root);
  const operation=readBound(operationPlanBinding.path,operationPlanBinding.sha256,true,1048576,live);check(operation.bytes===operationPlanBinding.bytes&&same(parseJSON(operation.data),job.plan),'executed original batch plan');
  const context=parentContext(job.plan,item,operationPlanBinding,job.deadlineNanoseconds);
  check(Number.isSafeInteger(entry[0].scientificBytesAlready)&&entry[0].scientificBytesAlready>=0&&entry[0].scientificBytesAlready<FILE,'global scientific baseline');context.scientificBytesAlready=entry[0].scientificBytesAlready;
  context.maximumStageOutputBytes=item[role+'MaximumBytes'];check(entry[0].maximumStageOutputBytes===context.maximumStageOutputBytes,'exact declared stage allocation');
  if(role==='comparison'){const previous=previousStages.at(-1);check(previous?.id==='parent-'+index+'-producer'&&previous.process.accepted&&previous.process.processesClosed,'closed correct producer');
   const done=priorCompletion({stageId:previous.id,stdoutLog:previous.process.stdoutLog},previous.id,live);checkPublications(done.publicationRecords,done.outputs,live);context.manifest=done.outputs[3];}
  const processReceipt=stage.process,stdout=stage.stdoutLog??processReceipt.stdoutLog;
  const result=admitParent({kind:'admit',stage:role,context,stdout,stderrPath,processReceipt:{...processReceipt,accepted:false},deadlineNanoseconds:job.deadlineNanoseconds});
  const newBytes=(role==='producer'?result.outputs:[result.outputs.at(-1)]).reduce((n,b)=>n+b.bytes,0);check(newBytes<=context.maximumStageOutputBytes,'actual bytes within declared stage allowance');
  check(context.scientificBytesAlready+context.maximumStageOutputBytes+c.closureReserveBytes+(role==='producer'?item.comparisonMaximumBytes:0)<=FILE,'retained stage/comparison/closure allocation');
  if(job.kind==='admit')check(context.scientificBytesAlready+newBytes===C.outputCensus(job.plan).scientificBytes,'exact complete global scientific accounting');
  for(const b of result.capturedSourceBindings){const physical=physicalSource(b,context.plan);check(context.sources.some(v=>same(v,physical))||result.outputs.some(v=>same(v,physical)),'new source outside global declared union');}
  return{...result,parentIndex:index,runtimeBindings:c.runtimeBindings,numericalCalls:role==='producer'?3584:0};
 };
 if(job.kind==='admit'){const result=admit({id:job.stageId,process:job.processReceipt,stdoutLog:job.stdoutLog},job.previousStages);live();return coordinatorAdmission(result,job.stdoutLog);}
 check(job.kind==='final'&&job.stages.length===job.plan.stages.length,'all declared parent stages closed');
 for(let i=0;i<job.stages.length;i++){const stage=job.stages[i];check(stage.id===job.plan.stages[i].id&&stage.process.accepted&&stage.process.processesClosed&&stage.process.admission.accepted,'complete ordered closed batch');admit(stage,job.stages.slice(0,i));}
 live();return{accepted:true,h3EvidenceEligible:false,parents:c.parents.map(p=>p.parentIndex),wholeHistoryMetrics:false};
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 registeredBatch(process.argv.slice(2)).catch(e=>{console.error(JSON.stringify({completed:false,accepted:false,failure:String(e.message).slice(0,4096),retainedOutputs:true}));process.exitCode=1;});
}

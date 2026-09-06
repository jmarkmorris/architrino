// Source-bound streamed evidence connection; no numerical method or new solver.
// Public execution is through the fixed streamed mode of f6c-bounded-operation.mjs.
// The separately reviewed canonical JSON spec fixes every source/runtime byte
// BEFORE admission. This file is also the captured registered entry and file
// worker. Only the --registered branch can spawn its one Python target.
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,openSync,
  readSync,readdirSync,realpathSync,statfsSync,writeSync,unlinkSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

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
 "operationCoordinator": [
  "scripts/eom/f6c-bounded-operation.mjs",
  "d89bc20d6026ec5893047490a75aabe6f441a88a44b2a4e04c2baf2ae51678c4"
 ],
 "operationCoordinatorControls": [
  "tests/f6c-bounded-operation.test.js",
  "0738e5134680c2cd0e927b764e5a65ab9b13b3a8e87b65048b56384bc7ae3302"
 ],
 "adapter": [
  "scripts/eom/f6c_variable_cell_adapter.py",
  "3ac5d1bfba780e41954ddda02120581a2ed4e6f17e3a07cdd058eed5063cec14"
 ],
 "adapterControls": [
  "tests/test_f6c_variable_cell_adapter.py",
  "9cf5aae2bcfd5fecd1e3a73855eee86b0c16b19164056f5ce745a4b4b1973a7c"
 ],
 "diagnostic": [
  "scripts/eom/f6c_single_leaf_diagnostic.py",
  "88b8fece4d8facc4943b01ebb5eb1cac2fe1061fecc86cae157a5d3ba4658a1e"
 ],
 "diagnosticControls": [
  "tests/test_f6c_single_leaf_diagnostic.py",
  "7a665b6ca9bb3bea918732f3a5aea7aba1afda71d3c87b0805a90c96e7719697"
 ],
 "stream": [
  "scripts/eom/f6c_streamed_leaf_session.py",
  "12503e98995464abdca6b1c54616c27797f7ba8849d12217e8677fab7825e46a"
 ],
 "streamControls": [
  "tests/test_f6c_streamed_leaf_session.py",
  "10088b235bce2c46f91d212ca4bc12158393330ac772e367e012b1945a863542"
 ],
 "continuation": [
  "scripts/eom/f6c_leaf_continuation.py",
  "b98cce1a5dc1a1e3903146de39e8ff25d4bae996bd9bcd99ca4205fcb2ee6b0a"
 ],
 "continuationControls": [
  "tests/test_f6c_leaf_continuation.py",
  "ec3e156d1d1f71729c6649cbaf43db40779d873e37cfa0d1dd223966bde91743"
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
  "99faec36ec8c0837d14b96eb77e92aecc90e933a7d9da09b9b4c0996c1bdf537"
 ],
 "helpers": [
  "scripts/eom/launch-prescribed-response-pilot.mjs",
  "9eb1afb84a175b143020610c153f9fef6dabb50efce9f956991feca3fbc0d5c2"
 ],
 "outer": [
  "scripts/eom/launch-subfield-circular-root-pilot.mjs",
  "cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48"
 ],
 "diagnostics": [
  "scripts/eom/launch-f6c-emission-refinement-pilot.mjs",
  "7a1f5571827225d1529f73a3f0b905be75e81e2f7d11c2670b697e0599d65e71"
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
// Only this exact accepted parent-two plan selects its old wrapper generation.
// These files are nonexecuting historical evidence, never current code aliases.
export const PARENT_TWO_ARCHIVE_PLAN=Object.freeze(['reference/priorities/braid-program/evidence/2026-08-27-f6c-parent-2-emission-refinement-launch.v2.json','928dbe46bd133ad7bfc26b21e34368afabedcbf09b310066393d3b58588f7b0e',51509]);
export const PARENT_TWO_ARCHIVE_SOURCES=Object.freeze({
 producer:['scripts/eom/prepare-f6c-parent-emission-refinement.py','ff488499f2737860034602ce9559c3ebc817aa8413b827007fb31027815679d2',58397],
 producerControls:['tests/test_f6c_parent_emission_refinement_preparation.py','517cc307251611177ec19cc5d71938a4086806f48583bcf8e3f2d04e9afb8d9f',43836],
 verifier:['scripts/eom/verify-f6c-parent-emission-refinement.py','53595cc12589ab56c73a1613922bba2739704cbc78465e3d646d5ae6a43813db',46615],
 verifierControls:['tests/test_f6c_parent_emission_refinement_verification.py','889d8721d2b51520c0fef78f6a954f9b510cbb46fdf9019205199dfa3658b5a9',42419],
 operationalEntry:['scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs','462247cf723339dbdc9ce9b4b897720cd4edcedc9b85c22b70694c41663f5c1b',56022],
 operationalControls:['tests/f6c-parent-emission-refinement-pilot.test.js','dd88eae5729d8ecc5947a27966edb215074d12687f3b5cd0bfc3be69d0400bc1',33303]
});
function historicalArchiveSources(d,root){
 const[p,h,n]=PARENT_TWO_ARCHIVE_PLAN;
 return d.parent_index===2&&d.plan.path===path.join(root,p)&&d.plan.sha256===h&&d.plan.bytes===n?PARENT_TWO_ARCHIVE_SOURCES:ARCHIVE_SOURCES;
}
export const ANCESTRY_ARCHIVE_SOURCES=Object.freeze({
 memberPredeclaration:['reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md','c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853',16985],
 fullResourcePlan:['reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md','46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef',13021]
});
export const PACKAGE_PINS=Object.freeze({
 reader:['scripts/eom/f6c_evidence_package.py','9d888682514f23652b39bfaa53fdfb3ceab66e6ba88cf34222c156d226764ad6'],
 readerControls:['tests/test_f6c_evidence_package.py','36fff6d7113a1df53d84a914c255a59b268d9707e26b917d08d1d05b274dc4ac'],
 inventory:['tests/fixtures/f6c-lossless-packaging-expectations.v1.json','811885700af0c25da4c03464aaf30617964ed66555e5cb14fd10700a14c8fd12']
});
export const FRESH_EVIDENCE_PINS=Object.freeze({
 reader:PACKAGE_PINS.reader,readerControls:PACKAGE_PINS.readerControls,
 parser:['scripts/eom/f6c_parent_evidence_inventory.py','d69db22ad20881a94a950102e70d438792493fa52efde666575bc53100bd784b'],
 parserControls:['tests/test_f6c_parent_evidence_inventory.py','369091d5a0996fb547a70ba8e9aa8b3fe5570cf046863872bfaeb491bd0cf551'],
 schema:['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/generic-inventory-v2-closed-schema-expectations.md','856c05077241bf9c28d75c21fcb50beac0afd23546c4bbbad9be7abd5d0f6710']
});
// Independently accepted pure checker, not an inventory-selected I/O issuer.
// Every actual batch still requires complete independently observed closure.
export const FRESH_CLOSURE_PINS=Object.freeze({
 instrument:['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure.py','3eefbb8767a0337024066f8949770fbf47f39edc308aaf598372cf95b3dba223'],
 controls:['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure_controls.py','f45ccfb0ff9609fe267f25c1ba2521ec58134f9caf7d128b09e0adfde9e6a979'],
 contract:['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/fresh-parent-batch-closure-validator-expectations.md','7132bcf6db99bef0b2255418f656e3fb5900eb23fac9d1400d294d5ba8fd2eed'],
});
export const CONTINUATION_MATH=Object.freeze([
 ['scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py','e0e063ce268cfd54e8a9ce618fb7da3caca0a9756000d7602ed9ae2abc6b0fd9',41336],
 ['scripts/eom/verify-f6c-continuous-reception-acceleration.py','32fd13cfffb66265d783fee7b870c40c6caf0293587b7397751e08ae0371d1f2',42580],
 ['scripts/eom/oracle/f6c_residual_integral_supremum.py','fc170a91b2747923bda89ef00b58d529c98bf96b01cc7b2c05c035042fc79c5a',20129],
 ['scripts/eom/oracle/f6c_gk13_protocol.py','a70a15481f793e913440628068f9c53bab611fe9d92f36206a401c01e91478eb',24388],
 ['scripts/eom/oracle/f6c_correlated_residual_enclosure.py','b86907236e849124f3fa9c6bcad0f65492ecc6fbeb1b51a27438655c45b037b1',7830],
 ['scripts/eom/f6c_leaf_evidence_codec.py','371f6eff5a7a50514816b9af04c98fdae18084cc364b35b565fc53acae76a79f',22926],
]);
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
export function boundedSourceUnion(records){
 const sources=uniqueBindings(records);check(sources.length<=512&&sources.reduce((n,b)=>n+b.bytes,0)<=1024**3,'complete physical source union bounds');return sources;
}
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
 for(const r of freshEvidenceInputs(spec).archives){
  const key=JSON.stringify([r.role,...bindingKey(r.original),...bindingKey(r.archive)]);
  if(!seen.has(key)){out.push(r);seen.add(key);}
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
 for(const [p]of Object.values({...ARCHIVE_SOURCES,...ANCESTRY_ARCHIVE_SOURCES}))forbidden.add(path.join(spec.root,p));
 for(const d of spec.parentRefinements){
  keys(d,['parent_index','plan','manifest','comparison','operation','launcher_log','resource_log','closure','archived_sources']);
  check(Number.isInteger(d.parent_index)&&d.parent_index>previous&&d.parent_index<160,'sorted unique original parents1..159');previous=d.parent_index;
  for(const k of ['plan','manifest','comparison','operation','launcher_log','resource_log']){binding(d[k]);out.push(d[k]);}
  keys(d.closure,['owner','operation','original_caller_session','final_completion_chunk','exit_code','elapsed_seconds','processes_closed','independent_audit_accepted','authority']);
  const c=d.closure;binding(c.owner);binding(c.operation);check(equalBinding(c.owner,spec.bindings.readiness)&&equalBinding(c.operation,d.operation),'explicit current closure owner');
  check(typeof c.original_caller_session==='string'&&/^[0-9]{1,32}$/u.test(c.original_caller_session)&&typeof c.final_completion_chunk==='string'&&/^[a-zA-Z0-9_-]{1,128}$/u.test(c.final_completion_chunk)&&c.exit_code===0&&c.processes_closed===true&&c.independent_audit_accepted===true&&c.authority==='attributed-versioned-acceptance-owner-not-fresh-process-observation','attributed accepted closure only');elapsedToken(c.elapsed_seconds);
  check(Array.isArray(d.archived_sources)&&d.archived_sources.length<=9,'bounded explicit archives');const roles=new Set();
  for(const r of d.archived_sources){
   keys(r,['role','original','archive']);binding(r.original);binding(r.archive);
   check(typeof r.role==='string'&&!roles.has(r.role),'unique archive role');roles.add(r.role);
   if(r.role==='acceptanceOwner')check(r.original.path===spec.bindings.readiness.path&&!equalBinding(r.original,spec.bindings.readiness),'historical owner distinct from current');
   else{
    const allowed={...historicalArchiveSources(d,spec.root),...ANCESTRY_ARCHIVE_SOURCES};
    check(Object.hasOwn(allowed,r.role),'known historical role');const[p,h,n]=allowed[r.role];
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
export function packageInputs(spec){
 const e=spec.evidencePackage;if(e===null)return {sources:[],routes:new Map()};
 keys(e,['package','reader','readerControls','inventory']);for(const b of Object.values(e))binding(b);
 for(const[k,[p,h]]of Object.entries(PACKAGE_PINS))check(e[k].path===path.join(spec.root,p)&&e[k].sha256===h,'fixed package '+k);
 check(e.package.bytes<=FILE&&e.package.path.startsWith(path.join(spec.root,'.local-data/braid-analysis')+'/'),'bounded package evidence lane');
 const captured=readBound(e.inventory.path,e.inventory.sha256,true,1024**2);check(captured.bytes===e.inventory.bytes,'package inventory bytes');
 const inventory=JSON.parse(captured.data.toString()),routes=new Map();
 check(inventory.schema==='braid-program/f6c-lossless-packaging-expectations.v1'&&same(inventory.parents.map(p=>p.parentIndex),[1,2]),'fixed accepted package inventory');
 for(const parent of inventory.parents)for(const entry of [...parent.entries,parent.archivedOwner]){
  binding(entry.logicalBinding);check(typeof entry.physicalPath==='string'&&!path.isAbsolute(entry.physicalPath)&&path.normalize(entry.physicalPath)===entry.physicalPath&&!entry.physicalPath.split('/').includes('..'),'exact package physical route');
  const b={path:path.join(spec.root,entry.physicalPath),sha256:entry.sha256,bytes:entry.bytes};binding(b);
  check(!routes.has(b.path)&&b.sha256===entry.logicalBinding.sha256&&b.bytes===entry.logicalBinding.bytes,'unique unchanged package route');routes.set(b.path,b);
 }
 check(routes.size===28&&[...routes.values()].reduce((n,b)=>n+b.bytes,0)===inventory.observedEligibleBytes,'complete package census');
 const direct=[...Object.values(spec.bindings),...spec.runtimeBindings,...Object.values(e)];
 check(direct.every(b=>!routes.has(b.path))&&new Set(Object.values(e).map(b=>b.path)).size===4,'package cannot replace current code/runtime/approval or itself');
 return {sources:Object.values(e),routes};
}
export function freshEvidenceInputs(spec,read=readBound){
 const selections=spec.acceptedParentEvidence;
 check(Array.isArray(selections)&&selections.length<=159,'mandatory bounded v4 fresh evidence array');
 if(selections.length===0)return {sources:[],routes:new Map(),archives:[],executingSources:[]};
 check(Object.keys(FRESH_CLOSURE_PINS).sort().join('|')==='contract|controls|instrument','fresh closure authority not yet independently admitted');
 const pins={...FRESH_EVIDENCE_PINS,...FRESH_CLOSURE_PINS},all=[],routes=new Map(),archives=[],executingSources=[];
 const inventoryKeys=new Set(),closureKeys=new Set(),parentIndices=new Set(spec.parentRefinements.map(p=>p.parent_index));parentIndices.add(0);
 let metadataBytes=0;
 for(const selection of selections){
  keys(selection,['inventory','closures','expected_authority','package','sourceBindings']);binding(selection.inventory);
  check(selection.inventory.bytes<=16*1024**2&&!inventoryKeys.has(JSON.stringify(bindingKey(selection.inventory))),'bounded unique fresh inventory');
  inventoryKeys.add(JSON.stringify(bindingKey(selection.inventory)));
  check(Array.isArray(selection.closures)&&selection.closures.length>0&&selection.closures.length<=159
   &&Array.isArray(selection.expected_authority)&&selection.expected_authority.length===1
   &&Array.isArray(selection.sourceBindings)&&selection.sourceBindings.length>0&&selection.sourceBindings.length<=512,'closed bounded fresh source selections');
  const advertised=boundedSourceUnion(selection.sourceBindings),byPath=new Map(advertised.map(b=>[b.path,b])),used=new Set();
  check(advertised.length===selection.sourceBindings.length,'unique fresh physical source declarations');
  const need=b=>{binding(b);const known=byPath.get(b.path);check(known&&equalBinding(known,b),'required fresh physical source absent or conflicting');used.add(b.path);return b;};
  const json=(b,maximum=16*1024**2)=>{need(b);check(b.bytes<=maximum,'fresh metadata byte limit');const f=read(b.path,b.sha256,true,maximum);check(f.bytes===b.bytes,'fresh metadata byte count');return JSON.parse(f.data.toString());};
  for(const [role,[relative,h]]of Object.entries(pins)){
   const b=byPath.get(path.join(spec.root,relative));check(b&&b.sha256===h,'fixed fresh '+role);need(b);
   if(['reader','parser','instrument'].includes(role))executingSources.push(b.path);
  }
  const authority=selection.expected_authority[0];binding(authority);
  check(authority.path===path.join(spec.root,FRESH_CLOSURE_PINS.instrument[0])&&authority.sha256===FRESH_CLOSURE_PINS.instrument[1],'externally fixed fresh authority');need(authority);
  metadataBytes+=selection.inventory.bytes;
  for(const c of selection.closures){keys(c,['binding','expected_instrument']);binding(c.binding);binding(c.expected_instrument);
   check(c.binding.bytes<=16*1024**2&&equalBinding(c.expected_instrument,authority)&&!closureKeys.has(JSON.stringify(bindingKey(c.binding))),'unique independently fixed fresh closure');
   closureKeys.add(JSON.stringify(bindingKey(c.binding)));metadataBytes+=c.binding.bytes;
  }
  check(metadataBytes<=FILE&&closureKeys.size<=159,'joint fresh metadata bounds');
  const inventory=json(selection.inventory);
  check(inventory.schema==='braid-program/accepted-parent-evidence-inventory.v2'&&Array.isArray(inventory.objects)&&inventory.objects.length>0&&inventory.objects.length<=4096
   &&Array.isArray(inventory.parents)&&inventory.parents.length>0&&inventory.parents.length<=159,'explicit closed v2 inventory');
  const represented=new Map();
  for(const obj of inventory.objects){
   keys(obj,['memberName','role','parentIndex','original','physicalPath','identity']);binding(obj.original);
   const physical={...obj.original,path:obj.physicalPath};binding(physical);const key=JSON.stringify(bindingKey(obj.original));
   check(!represented.has(key),'unique inventory original tuple');represented.set(key,physical);
   if(obj.role==='acceptanceOwner'){
    check(obj.original.path===spec.bindings.readiness.path&&physical.path!==obj.original.path,'explicit historical consumption archive');
    archives.push({role:'acceptanceOwner',original:obj.original,archive:physical});
   }else check(physical.path===obj.original.path,'nonowner physical redirect forbidden');
   if(selection.package===null)need(physical);
   else {const prior=routes.get(physical.path);check(!prior||equalBinding(prior,physical),'conflicting generic package route');routes.set(physical.path,physical);}
  }
  if(selection.package!==null){binding(selection.package);check(selection.package.bytes<=FILE&&selection.package.path.startsWith(path.join(spec.root,'.local-data/braid-analysis')+'/'),'explicit bounded fresh package');need(selection.package);}
  const logical=b=>{binding(b);const physical=represented.get(JSON.stringify(bindingKey(b)));if(physical){if(selection.package===null)need(physical);return;}need(b);};
  need(inventory.currentAcceptanceOwner.binding);check(equalBinding(inventory.currentAcceptanceOwner.binding,spec.bindings.readiness),'direct current fresh approval');
  for(const b of Object.values(inventory.family))logical(b);logical(inventory.numericalSettings.declaration);
  for(const p of inventory.parents){check(Number.isInteger(p.parentIndex)&&p.parentIndex>0&&p.parentIndex<160&&!parentIndices.has(p.parentIndex),'overlapping fresh original parent');parentIndices.add(p.parentIndex);}
  for(const c of selection.closures){
   const snapshot=json(c.binding);check(equalBinding(snapshot.instrument,authority),'snapshot independent instrument');
   logical(snapshot.operation);need(snapshot.invocation);need(snapshot.closure.evidence);need(snapshot.closure.finalCaller);
   const receipt=json(snapshot.closure.evidence),operationPlan=json(snapshot.invocation);
   need(receipt.controls);need(receipt.processObservation);
   check(Array.isArray(receipt.sourceIdentities)&&receipt.sourceIdentities.length<=512&&Array.isArray(receipt.outputIdentities)&&receipt.outputIdentities.length<=512
    &&Array.isArray(operationPlan.publicationAliases)&&operationPlan.publicationAliases.length<=512,'bounded fresh complete identity inventories');
   for(const row of receipt.sourceIdentities)logical(row.binding);
   const outputs=new Map();for(const row of receipt.outputIdentities){keys(row,['binding','identity']);binding(row.binding);check(!outputs.has(row.binding.path),'unique recorded output path');outputs.set(row.binding.path,row);}
   const privatePaths=new Set(),publicPaths=new Set(operationPlan.publicationAliases.map(a=>a.publicPath));
   check(publicPaths.size===operationPlan.publicationAliases.length,'unique declared public publication paths');
   for(const alias of operationPlan.publicationAliases){
    keys(alias,['publicPath','privateDirectory','privatePrefix']);const pub=outputs.get(alias.publicPath);check(pub,'declared public output identity');
    const prefix=path.join(alias.privateDirectory,alias.privatePrefix),matches=[...outputs.values()].filter(r=>r.binding.path!==pub.binding.path&&r.binding.path.startsWith(prefix)&&/^[a-f0-9]{32}$/u.test(r.binding.path.slice(prefix.length)));
    check(matches.length===1,'exact retained private output alias');const priv=matches[0];
    check(!publicPaths.has(priv.binding.path)&&priv.binding.sha256===pub.binding.sha256&&priv.binding.bytes===pub.binding.bytes&&same(priv.identity,pub.identity)&&!privatePaths.has(priv.binding.path),'original publication identity alias');privatePaths.add(priv.binding.path);
   }
   for(const row of outputs.values())if(!privatePaths.has(row.binding.path))logical(row.binding);
   for(const p of snapshot.parents){for(const b of Object.values(p.roles))logical(b);logical(p.acceptanceOwner);logical(p.comparisonInstrument);}
  }
  check(used.size===advertised.length,'unused fresh physical source declaration');all.push(...advertised);
 }
 const sources=boundedSourceUnion(all),direct=[...Object.values(spec.bindings),...spec.runtimeBindings];
 check(direct.every(b=>!routes.has(b.path)),'generic package cannot replace current code/runtime/approval');
 return {sources,routes,archives,executingSources:[...new Set(executingSources)]};
}
// Historical segments remain immutable evidence. This admission only checks
// attributed acceptance, exact source routes and the closed chain; the Python
// continuation module independently replays the frozen mathematical protocol.
function inspectContinuation(spec,read,requireDeclaredSources){
 const c=spec.continuation;if(c===null)return {sources:[],segments:[],inheritedPairs:0};
 keys(c,['schema','segments','archives','sourceBindings']);
 check(c.schema==='braid-program/f6c-stream-continuation-inputs.v1'&&Array.isArray(c.segments)&&c.segments.length>0&&c.segments.length<=160,'bounded accepted segment chain');
 check(Array.isArray(c.archives)&&c.archives.length<=512&&Array.isArray(c.sourceBindings),'explicit historical source routes');
 const routes=new Map(),used=new Set(),sources=[],segments=[],seen=new Set(),packaged=packageInputs(spec),fresh=freshEvidenceInputs(spec,read);
 for(const [p,b]of fresh.routes){const old=packaged.routes.get(p);check(!old||equalBinding(old,b),'conflicting continuation package route');packaged.routes.set(p,b);}
 packaged.sources=boundedSourceUnion([...packaged.sources,...fresh.sources]);
 const key=b=>JSON.stringify(bindingKey(b));
 for(const r of c.archives){keys(r,['original','archive']);binding(r.original);binding(r.archive);
  check(r.original.path!==r.archive.path&&r.original.sha256===r.archive.sha256&&r.original.bytes===r.archive.bytes&&r.archive.path.startsWith(path.join(spec.root,'.local-data/braid-analysis')+'/')&&!routes.has(key(r.original)),'unique exact nonexecuting archive');routes.set(key(r.original),r.archive);
 }
 // Every historical reference has the same exact-tuple storage route, including
 // old adapter/control bindings repeated inside the parent identity receipt.
 // The documents retain their original logical bindings; only capture moves.
 const add=b=>{binding(b);const archive=routes.get(key(b));if(archive)used.add(key(b));const physical=archive??b;sources.push(physical);boundedSourceUnion(sources);return physical;};
 const json=b=>{const physical=add(b);check(b.bytes<=FILE,'bounded acceptance metadata');const a=read(physical.path,physical.sha256,true,FILE);check(a.bytes===b.bytes,'accepted metadata bytes');return JSON.parse(a.data.toString());};
 let total=0,previous=null,authority=null;
 const artifactRoles=['stream','operation','invocation','finalCaller','numericalReceipt','operationalReceipt','independentAudit','acceptanceReceipt'];
 for(const entry of c.segments){
  keys(entry,['acceptance','parents','parentAcceptance']);binding(entry.acceptance);binding(entry.parents);binding(entry.parentAcceptance);
  check(!seen.has(key(entry.acceptance)),'repeated or cyclic acceptance');seen.add(key(entry.acceptance));
  const a=json(entry.acceptance);
  check(a.schema==='braid-program/f6c-stream-segment-independent-acceptance.v2'&&a.accepted===true&&a.completeEOF===true&&a.independentNumericalConformance===true&&a.processClosure===true,'independently accepted closed segment required');
  check(same(a.predecessor,previous),'exact preceding accepted stream and declaration');
  const n=a.segment;check(n&&Number.isInteger(n.localPairs)&&n.localPairs>0&&n.inheritedPairs===total&&n.totalPairs===total+n.localPairs&&n.records===2*n.localPairs+2&&n.totalPairs<=3280,'preserved global logical budget');
  check(a.finalState?.evaluated_count===n.totalPairs&&a.streamFraming?.complete===true&&a.streamFraming.finalLF===true&&a.streamFraming.provisions===n.localPairs&&a.streamFraming.transitions===n.localPairs,'complete accepted pair census');
  for(const role of artifactRoles)add(a[role]);
  check(a.stream.bytes<=FILE,'bounded inherited stream');
  const invocation=json(a.invocation),operation=json(a.operation),accepted=json(a.acceptanceReceipt),numeric=json(a.numericalReceipt),operational=json(a.operationalReceipt),wireRecord=json(a.finalCaller);
  check(equalBinding(operation.invocation,a.invocation)&&operation.accepted===true&&operation.process?.accepted===true&&operation.process.processesClosed===true,'closed original operation and invocation');
  check(operation.process.exit?.code===0&&operation.process.exit.signal===null&&operation.process.admission?.accepted===true&&operation.process.gates?.length===1&&operation.process.gates.every(g=>g.retired===true&&g.acknowledged===true&&g.measurement?.code===0&&g.measurement.signal===null),'successful closed original registered gate');
  check(accepted.accepted===true&&numeric.accepted===true&&operational.accepted===true,'all independent receipts accepted');
  check(accepted.numericalReceiptSha256===a.numericalReceipt.sha256&&accepted.operationalReceiptSha256===a.operationalReceipt.sha256&&accepted.finalCallerToolRecordSha256===a.finalCaller.sha256,'independent acceptance crosslinks');
  const auditLinks=['independentAuditSha256','transportOnlyV3AuditSha256'].filter(k=>Object.hasOwn(accepted,k));
  check(auditLinks.length>0&&auditLinks.every(k=>accepted[k]===a.independentAudit.sha256),'accepted independent audit identity');
  check(numeric.rawSha256===a.stream.sha256&&numeric.rawBytes===a.stream.bytes&&numeric.invocationSha256===a.invocation.sha256&&numeric.operationSha256===a.operation.sha256,'independent numerical subject crosslinks');
  check(Array.isArray(numeric.requests)&&numeric.requests.length===n.localPairs&&numeric.requests.every((r,i)=>r.requestIndex===i),'independent numerical coverage of every inherited pair');
  check(same(numeric.decodedStreamReceipt,{accepted:false,bytes:a.stream.bytes,complete:true,pairs:n.localPairs,sha256:a.stream.sha256}),'independent complete stream decoding');
  check(wireRecord.toolResult?.exit_code===0&&typeof wireRecord.toolResult.output==='string','observed successful original caller exit');
  const finals=wireRecord.toolResult.output.split('\n').filter(Boolean).map(line=>JSON.parse(line)).filter(v=>v.completed===true);
  check(finals.length===1,'one original final completion');const final=finals[0];
  check(final.accepted===true&&final.processesClosed===true&&final.workersAndMonitorsClosed===true&&final.lockReleased===true&&equalBinding(final.operation,a.operation)&&final.outputs.length===1&&equalBinding(final.outputs[0],a.stream),'original final wire source and closure');
  check(operational.remainingOwnedMatches?.length===0&&operational.lockAbsent===true,'independent original process absence');
  check(a.measuredProcessClosure?.finalCallerExitCode===0&&a.measuredProcessClosure.lockAbsent===true,'attributed independent process closure');
  const currentAuthority={context:a.context,history:a.history,mathematicalSettings:a.mathematicalSettings,mathematicalBindings:a.mathematicalBindings};
  if(authority===null)authority=currentAuthority;else check(same(currentAuthority,authority),'unchanged history and mathematical setting across segments');
  check(a.context?.field_speed==='1'&&a.context.coupling==='10.304229970992187'&&a.context.ruler==='0.5320012303229503'&&a.history?.historicalTrajectoryIdentityEstablished===false,'unchanged conditional normalized family');
  check(same(a.mathematicalBindings,CONTINUATION_MATH.map(([p,sha256,bytes])=>({path:path.join(spec.root,p),sha256,bytes}))),'complete frozen mathematical inventory');
  for(const b of a.mathematicalBindings)add(b);
  add(a.history.retainedHistory);add(a.history.reconstruction);add(a.mathematicalSettings.settingsDeclaration);
  for(const b of Object.values(a.reviewerBindings))add(b);
  const sourceProof=a.originalSourceClosure;
  check(sourceProof?.everyOriginalIdentityAndHashRechecked===true&&sourceProof.bindingsJsonPointer==='/completePhysicalSourceUnion'&&sourceProof.identitiesJsonPointer==='/process/admission/completion/sourceIdentities'&&equalBinding(sourceProof.identitiesInventory,a.operation),'explicit historical source closure inventories');
  const inventory=json(sourceProof.bindingsInventory),oldSources=boundedSourceUnion(inventory.completePhysicalSourceUnion);
  check(oldSources.length===sourceProof.count&&oldSources.reduce((n,b)=>n+b.bytes,0)===sourceProof.bytes,'historical full source union');
  const identities=operation.process.admission.completion.sourceIdentities;
  keys(identities,oldSources.map(b=>b.path));
  check(oldSources.every(b=>typeof identities[b.path]==='string'&&/^[0-9]+:[0-9]+:[0-9]+:[0-9]+:[0-9]+$/u.test(identities[b.path])),'historical physical identities complete');
  for(const b of oldSources){
   const archive=routes.get(key(b)),member=packaged.routes.get(b.path);
   check(!(archive&&member),'ambiguous historical storage route');
   if(archive){used.add(key(b));add(archive);}
   else if(member){check(equalBinding(member,b),'package member exact original bytes');}
   else {add(b);const actual=read(b.path,b.sha256,false,1024**3);check(actual.bytes===b.bytes&&actual.identity===identities[b.path],'unmapped historical source changed');}
  }
  const header=json(a.reviewerBindings.frozenHeader).expectedHeaderStatic;
  check(header&&equalBinding(header.spec.binding,a.invocation)&&same(header.spec.parentRefinements,invocation.parentRefinements)&&same(header.sourceBindings.files,invocation.bindings)&&same(header.runtimeBindings,invocation.runtimeBindings),'original frozen header bindings');
  if(invocation.schema==='braid-program/f6c-streamed-leaf-invocation.v4')check(Object.hasOwn(header.spec,'acceptedParentEvidence')&&Object.hasOwn(header.spec,'evidencePackage')&&same(header.spec.acceptedParentEvidence,invocation.acceptedParentEvidence)&&same(header.spec.evidencePackage,invocation.evidencePackage),'exact historical v4 evidence selection');
  const parents=json(entry.parents),parentAcceptance=json(entry.parentAcceptance);
  keys(parentAcceptance,['schema','accepted','scope','invocation','descriptors','parents','comparisonParents','metadataReceipt','monitorReceipt','instrument','producerInstrument','adapter','adapterControls','context','historyFrameParentSha256','parentCount','rowsPerParent','refinedIndices','providerCalls','sourceClosed','claims']);
  check(parentAcceptance.accepted===true&&equalBinding(parentAcceptance.parents,entry.parents)&&equalBinding(parentAcceptance.invocation,a.invocation),'independent original-parent snapshot acceptance');
  check(parentAcceptance.schema==='braid-program/f6c-original-parent-snapshot-acceptance.v1'&&parentAcceptance.scope==='independent-original-parent-identity-only-not-numerical-acceptance'&&parentAcceptance.providerCalls===0&&parentAcceptance.sourceClosed===true&&parentAcceptance.parentCount===160&&parentAcceptance.rowsPerParent===64&&same(parentAcceptance.context,a.context)&&/^[a-f0-9]{64}$/u.test(parentAcceptance.historyFrameParentSha256),'closed independent parent identity scope');
  check(same(parentAcceptance.claims,{numericalAcceptance:false,metrics:false,physicalClaims:false,h3EvidenceEligible:false}),'parent identity is not numerical acceptance');
  for(const role of ['descriptors','comparisonParents','metadataReceipt','monitorReceipt','instrument','producerInstrument','adapter','adapterControls'])add(parentAcceptance[role]);
  check(parentAcceptance.instrument.path===path.join(spec.root,'.local-data/braid-analysis/f6c-whole-history-20260828/packaging-review/parent-snapshot-acceptance.mjs')&&parentAcceptance.instrument.sha256==='075d7b0210521d4b9c5c31f30be47121010974cddf4c0519a91fcdafdcaa6c7e'&&parentAcceptance.instrument.bytes===5381,'frozen independent parent-snapshot acceptance instrument');
  check(same(json(parentAcceptance.descriptors),invocation.parentRefinements)&&equalBinding(parentAcceptance.adapter,invocation.bindings.adapter)&&equalBinding(parentAcceptance.adapterControls,invocation.bindings.adapterControls),'original parent descriptors and adapter generation');
  check(parentAcceptance.comparisonParents.sha256===entry.parents.sha256&&parentAcceptance.comparisonParents.bytes===entry.parents.bytes,'independent matching original-parent copies');
  const parentMetadata=json(parentAcceptance.metadataReceipt),parentMonitor=json(parentAcceptance.monitorReceipt);
  check(parentMetadata.accepted===true&&parentMetadata.sourceClosed===true&&parentMetadata.numericalCalls===0&&parentMetadata.identicalParents===true&&parentMetadata.identicalHistoryFramesContext===true&&equalBinding(parentMetadata.spec,a.invocation),'matching independent parent metadata');
  check(parentMonitor.exit?.code===0&&parentMonitor.exit.signal===null&&parentMonitor.numericalCalls===0,'closed successful independent parent metadata monitor');
  check(Array.isArray(parents)&&parents.length===160&&parents.every((p,i)=>p.index===i&&Array.isArray(p.rows)&&p.rows.length===64),'complete original-parent snapshot');
  check(same(parents.filter(p=>p.refined===true).map(p=>p.index),parentAcceptance.refinedIndices),'accepted original refinement selection');
  const consumed=a.segment.coveredOriginalParents;check(Array.isArray(consumed)&&consumed.every(i=>Number.isInteger(i)&&i>=0&&i<160),'declared consumed original parents');
  for(const d of a.consumedParentBindings.explicitDescriptors){
   if(!consumed.includes(d.parent_index))continue;
   const current=spec.parentRefinements.find(p=>p.parent_index===d.parent_index);check(current,'consumed parent refinement missing');
   for(const role of ['plan','manifest','comparison','operation','launcher_log','resource_log'])check(equalBinding(current[role],d[role]),'consumed parent logical evidence changed');
  }
  const frozenMath=new Set(a.mathematicalBindings.map(key));check([...routes.keys()].every(k=>!frozenMath.has(k)),'frozen mathematics cannot be rerouted to another generation');
  segments.push({entry,acceptance:a,expectedHeader:header,sourceIdentities:identities});
  previous={stream:a.stream,acceptance:entry.acceptance};total=n.totalPairs;
 }
 check(used.size===routes.size,'unused historical archive route');
 const union=boundedSourceUnion([...sources,...packaged.sources]);
 if(requireDeclaredSources)check(same([...union].sort((a,b)=>a.path.localeCompare(b.path)),[...boundedSourceUnion(c.sourceBindings)].sort((a,b)=>a.path.localeCompare(b.path))),'declared continuation physical union differs');
 return {sources:union,segments,inheritedPairs:total,authority};
}
export function continuationInputs(spec,read=readBound){return inspectContinuation(spec,read,true);}
export function prepareContinuation(spec,read=readBound){
 // Data preparation only. validateSpec always verifies the resulting exact list.
 if(spec.continuation===null)return null;
 const result=inspectContinuation(spec,read,false);
 return {...structuredClone(spec.continuation),sourceBindings:result.sources};
}
export function validateSpec(s,selfSha){
 keys(s,['schema','scope','root','output','python','git','bindings','runtimeBindings','parentRefinements','evidencePackage','acceptedParentEvidence','continuation','maxAdvances','limits']);
 check(s.schema==='braid-program/f6c-streamed-leaf-invocation.v4'&&s.scope===SCOPE,'fixed streamed diagnostic scope');
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
 const packaged=packageInputs(s),descriptors=descriptorBindings(s),fresh=freshEvidenceInputs(s);
 const physical=descriptors.filter(b=>{const route=packaged.routes.get(b.path);if(!route)return true;check(equalBinding(route,b),'packaged descriptor generation differs');return false;});
 const continuation=continuationInputs(s);
 check(s.maxAdvances+continuation.inheritedPairs<=3280,'inherited evaluations remain spent');
 return boundedSourceUnion([...all,...physical,...packaged.sources,...fresh.sources,...continuation.sources]);
}

export function writeNew(filename,value,live=()=>{},includeIdentity=false){
  check(typeof includeIdentity==='boolean','exact publication identity option');
  live();const raw=Buffer.from(JSON.stringify(value)+'\n');check(raw.length<=FILE,'publication64MiB');
  const directory=path.dirname(filename),parent=lstatSync(directory,{bigint:true}),inode=s=>[s.dev,s.ino].join(':'),identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
  check(parent.isDirectory()&&realpathSync(directory)===directory,'canonical publication directory');let completed;
  const fd=openSync(filename,'wx',0o600);try{const original=fstatSync(fd,{bigint:true});let n=0;while(n<raw.length){live();const wrote=writeSync(fd,raw,n);check(wrote>0,'short write');n+=wrote;}fsyncSync(fd);completed=fstatSync(fd,{bigint:true});
   check(inode(original)===inode(completed)&&identity(completed)===identity(lstatSync(filename,{bigint:true})),'original publication inode replaced');
  }finally{closeSync(fd);}
  const d=openSync(directory,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{check(inode(fstatSync(d,{bigint:true}))===inode(parent),'publication parent replaced');fsyncSync(d);}finally{closeSync(d);}
  live();const result=readBound(filename,sha(raw),false,FILE,live);check(result.identity===identity(completed)&&identity(lstatSync(filename,{bigint:true}))===identity(completed)&&inode(lstatSync(directory,{bigint:true}))===inode(parent),'original publication changed after close');return includeIdentity?{...clean(result),identity:identity(completed)}:clean(result);
}
export function noCompetitor(table,ownPid){
  const own=new Set([ownPid]);let changed;do{changed=false;for(const row of table)if(own.has(row.ppid)&&!own.has(row.pid)){own.add(row.pid);changed=true;}}while(changed);
  const pattern=/(?:run|launch)-(?:f5|f6c)|(?:run|launch)-.*(?:root|response|refinement|acceleration|streamed-leaf)|(?:prepare|verify|reduce)-f6c|(?:reduce|publish)-prescribed-acceleration|f6c-single-leaf-diagnostic-20260827.*coordinator\.mjs|f6c-bounded-operation\.mjs|eom_(?:native_.*(?:cli|fixture)|f5_enclosed_root_cli|borg_shadow_cli|recursive_block_benchmark_cli)|attractor-ensemble-harness/u;
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
 publication=None;files={};source_inodes={};source_paths=set();prior_signal=None;provenance=();archives=[]
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
     require(type(b['bytes'])is int and b['bytes']>0 and len(files)<512 and sum(f.initial.st_size for f in files.values())+b['bytes']<=1073741824,'complete physical source union bounds')
     f=captures.enter_context(BoundFile(key,b['sha256'],limit=1073741824,live=live))
     require(f.initial.st_size==b['bytes'],'captured size')
     inode=(f.initial.st_dev,f.initial.st_ino);require(inode not in source_inodes,'physical source hardlink alias');source_inodes[inode]=key
     if key in originals:require(originals[key]==(b['sha256'],identity(f.initial)),'capture replaced original')
     originals.setdefault(key,(b['sha256'],identity(f.initial)));files[key]=f
    capture(dict(path=spec_path,sha256=spec_sha,bytes=len(raw)))
    for b in [*bindings.values(),*spec['runtimeBindings'],*(spec['evidencePackage']or{}).values(),*(spec['continuation']or{}).get('sourceBindings',[]),*(b for e in spec['acceptedParentEvidence']for b in e['sourceBindings'])]:capture(b)
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
      require(type(v['archived_sources'])is list and len(v['archived_sources'])<=9,'bounded historical relations')
      c=v['closure'];closed(c,('owner','operation','original_caller_session','final_completion_chunk','exit_code','elapsed_seconds','processes_closed','independent_audit_accepted','authority'))
      closure=A.ParentClosure(**{**c,'owner':binding(c['owner']),'operation':binding(c['operation'])})
      relations=[]
      for r in v['archived_sources']:
       closed(r,('role','original','archive'));relations.append(A.ArchivedSource(r['role'],binding(r['original']),binding(r['archive'])))
      return A.ParentRefinement(v['parent_index'],**{k:binding(v[k])for k in ('plan','manifest','comparison','operation','launcher_log','resource_log')},closure=closure,archived_sources=tuple(relations))
     require(type(spec['parentRefinements'])is list and len(spec['parentRefinements'])<=159,'bounded explicit refinements')
     selected=tuple(descriptor(v)for v in spec['parentRefinements'])
     package_selection=None
     if spec['evidencePackage']is not None:
      e=spec['evidencePackage'];closed(e,('package','reader','readerControls','inventory'))
      package_selection=A.EvidencePackage(binding(e['package']),binding(e['inventory']))
      require(e['reader']['path']==str(root/'scripts/eom/f6c_evidence_package.py'),'canonical package reader runtime source')
      executing_sources.add(e['reader']['path'])
     require(type(spec['acceptedParentEvidence'])is list and len(spec['acceptedParentEvidence'])<=159,'mandatory bounded fresh evidence selection')
     fresh_selected=[];fresh_advertised=set();fresh_owner_archives=[]
     for e in spec['acceptedParentEvidence']:
      closed(e,('inventory','closures','expected_authority','package','sourceBindings'))
      require(type(e['closures'])is list and 0<len(e['closures'])<=159 and type(e['expected_authority'])is list and len(e['expected_authority'])==1,'explicit immutable fresh authority selections')
      closures=[]
      for c in e['closures']:
       closed(c,('binding','expected_instrument'));closures.append(A.AdmittedClosure(binding(c['binding']),binding(c['expected_instrument'])))
      fresh_selected.append(A.AcceptedParentEvidence(binding(e['inventory']),tuple(closures),tuple(binding(v)for v in e['expected_authority']),None if e['package']is None else binding(e['package'])))
      fresh_advertised.update((b['path'],b['sha256'],b['bytes'])for b in e['sourceBindings'])
      inventory_file=files[e['inventory']['path']];inventory_raw,inventory_hash=inventory_file.scan(True)
      require(inventory_hash==e['inventory']['sha256'],'fresh inventory source changed')
      inventory=json.loads(inventory_raw)
      for obj in inventory['objects']:
       if obj['role']=='acceptanceOwner':fresh_owner_archives.append(dict(role='acceptanceOwner',original=obj['original'],archive=dict(path=obj['physicalPath'],sha256=obj['original']['sha256'],bytes=obj['original']['bytes'])))
     if fresh_selected:
      executing_sources.update(str(root/p)for role,p,_ in (*A.PACKAGE_SOURCES[:2],*A.PARENT_INVENTORY_SOURCES,*A.FRESH_CLOSURE_SOURCES)if role in ('reader','parser','instrument'))
     indices=tuple(v.parent_index for v in selected);require(indices==tuple(sorted(set(indices))),'sorted unique original parent indices')
     expected_archives=[];seen_archives=set()
     for d in selected:
      for r in d.archived_sources:
       key=(r.role,r.original.path,r.original.sha256,r.original.bytes,r.archive.path,r.archive.sha256,r.archive.bytes)
       if key not in seen_archives:seen_archives.add(key);expected_archives.append(dataclasses.asdict(r))
     for r in fresh_owner_archives:
      key=(r['role'],r['original']['path'],r['original']['sha256'],r['original']['bytes'],r['archive']['path'],r['archive']['sha256'],r['archive']['bytes'])
      if key not in seen_archives:seen_archives.add(key);expected_archives.append(r)
     archive_paths={r['archive']['path']for r in expected_archives}
     with A.open_adapter(root,adapter_sha256=bindings['adapter']['sha256'],controls_sha256=bindings['adapterControls']['sha256'],closure_owner_sha256=bindings['readiness']['sha256'],deadline=deadline,parent_refinements=selected,evidence_package=package_selection,accepted_parent_evidence=tuple(fresh_selected))as adapter:
      provenance=tuple(adapter.provenance)
      require(0<len(provenance)<=512 and len({p for p,_,_ in provenance})==len(provenance),'unique captured source census')
      for p,h,n in provenance:
       capture(dict(path=p,sha256=h,bytes=n))
       if p in executing_sources and p not in archive_paths:source_paths.add(p)
      fresh_actual=tuple(adapter.fresh_provenance)
      require(len(fresh_actual)<=512 and len({p for p,_,_ in fresh_actual})==len(fresh_actual)
       and set(fresh_actual)<=set(provenance)and fresh_advertised==set(fresh_actual),'exact advertised and consumed fresh physical source union')
      require(len(adapter.histories)==8 and all(len(h.segments)==1760 for h in adapter.histories)and len(adapter.frames)==81 and len(adapter.parents)==160,'actual metadata census')
      require(all(adapter.call_counts[k]==0 for k in ('projections','evaluations','residuals','root_queries','emission_refinements'))and all(v==0 for v in adapter.geometry_accounting.values()),'metadata zero numerical calls')
      archives=S.to_wire(adapter.historical_owner_archives)
      require(archives==expected_archives,'exact unique historical archive relations')
      metadata=dict(sources=len(provenance),members=8,segmentsPerMember=1760,frames=81,parents=160,projections=0,evaluations=0,residuals=0,restrictions=0,historyStateEvaluations=0)
      runtime_check();recheck();progress('metadata',1,1)
      prefix=None;continuation_module=None;inherited_pairs=0;restoration_ns=0;continuation_metadata=None
      if spec['continuation']is not None:
       continuation_module=captures.enter_context(module(bindings['continuation']))
       source_paths.add(bindings['continuation']['path'])
       archive_routes={(r['original']['path'],r['original']['sha256'],r['original']['bytes']):r['archive']for r in spec['continuation']['archives']}
       require(len(archive_routes)==len(spec['continuation']['archives']),'unique exact continuation archive routes')
       def physical_source(b):return archive_routes.get((b['path'],b['sha256'],b['bytes']),b)
       def source_bytes(b):
        physical=physical_source(b)
        require(physical['path']in files and files[physical['path']].binding()==physical,'captured continuation source required')
        f=files[physical['path']];raw,digest=f.scan(True);require(digest==b['sha256'],'continuation bytes changed');f.check_path();return raw
       def source_json(b):return json.loads(source_bytes(b))
       def source_lines(b):
        physical=physical_source(b)
        require(physical['path']in files and files[physical['path']].binding()==physical,'captured inherited stream required')
        f=files[physical['path']];os.lseek(f.fd,0,os.SEEK_SET);left=f.initial.st_size;pending=b''
        while left:
         live();chunk=os.read(f.fd,min(65536,left));require(chunk,'inherited stream truncated');left-=len(chunk);pending+=chunk
         while b'\n'in pending:
          line,pending=pending.split(b'\n',1);yield line+b'\n'
         require(len(pending)<=67108864,'inherited line limit')
        require(not pending and not os.read(f.fd,1),'inherited EOF');f.recheck()
       first_acceptance=source_json(spec['continuation']['segments'][0]['acceptance'])
       authority={k:first_acceptance[k]for k in ('context','history','mathematicalSettings','mathematicalBindings')}
       def segments():
        # At most one old segment's expanded parents/header are retained here.
        # The entire chain is authenticated above, never materialized at once.
        for entry in spec['continuation']['segments']:
         accepted_bytes=source_bytes(entry['acceptance']);accepted=json.loads(accepted_bytes)
         operation=source_json(accepted['operation'])
         expected_header=source_json(accepted['reviewerBindings']['frozenHeader'])['expectedHeaderStatic']
         expected_header={**expected_header,'clockTransfer':operation['process']['admission']['completion']['clockTransfer']}
         require(authority=={k:accepted[k]for k in authority},'unchanged continuation authority')
         for b in [*accepted['mathematicalBindings'],accepted['history']['retainedHistory'],accepted['history']['reconstruction']]:
          require((b['path'],b['sha256'],b['bytes'])in provenance,'current logical mathematical/history source differs')
         yield continuation_module.Segment(accepted['stream'],source_lines(accepted['stream']),expected_header,source_json(entry['parents']),entry['acceptance'],accepted_bytes)
       restore_started=time.monotonic_ns()
       prefix=continuation_module.replay(adapter,D,C,S,segments(),expected_authority=authority,live=live)
       restoration_ns=time.monotonic_ns()-restore_started;continuation_metadata=prefix.metadata;inherited_pairs=continuation_metadata['inheritedPairs']
       require(all(adapter.call_counts[k]==0 for k in ('projections','evaluations','residuals','root_queries','emission_refinements'))and all(v==0 for v in adapter.geometry_accounting.values()),'restoration performed provider work')
       runtime_check();recheck();progress('restoration',inherited_pairs,inherited_pairs)
      publication=P.LeafStreamPublication(spec['output'],C,deadline=deadline,byte_limit=67108864,live=live)
      header_spec=dict(binding=dict(path=spec_path,sha256=spec_sha,bytes=len(raw)),maxAdvances=spec['maxAdvances'],parentRefinements=spec['parentRefinements'],evidencePackage=spec['evidencePackage'],acceptedParentEvidence=spec['acceptedParentEvidence'])
      metadata_wire=dict(scope=spec['scope'],spec=header_spec,sourceBindings=dict(files=bindings,historicalOwnerArchives=archives),runtimeBindings=spec['runtimeBindings'],pythonBodySha256=body_sha,clockTransfer=clock_transfer,publicationRequires='fresh matching successful process completion and independent mathematical comparison; no metric authority')
      session=S.StreamedLeafSession(adapter,D,C,metadata_wire,publication.write,byte_limit=67108864,live=live,**({}if prefix is None else dict(continuation=continuation_module,prefix=prefix)))
      runtime_check();recheck()
      maximum=spec['maxAdvances'];require(type(maximum)is int and 1<=maximum<=3280-inherited_pairs,'explicit original bounded advance count')
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
  completion=dict(completed=True,accepted=False,scope=spec['scope'],output=dataclasses.asdict(output),completedAdvances=completed,inheritedPairs=inherited_pairs,replayedGKEvaluations=inherited_pairs,restorationNanoseconds=str(restoration_ns),continuation=continuation_metadata,stopReason=stop_reason,finalState=final_state,
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
  const records=boundedSourceUnion([...validateSpec(spec,job.selfSha),clean(captured)]),actual=records.map(b=>readBound(b.path,b.sha256,false,1024**3,live));
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
  keys(done,['completed','accepted','scope','output','completedAdvances','inheritedPairs','replayedGKEvaluations','restorationNanoseconds','continuation','stopReason','finalState','callCounts','geometryAccounting','streamAccounting','publicationAccounting','metadataCensus','historicalSourceBindings','historicalOwnerArchives','sourceIdentities','adapterContextClosed','pythonBodySha256','clockTransfer','externalWholeAttemptAdmissionRequired','codecEOFValidated','rootsEvaluated','eomExecuted','metricsAvailable','scoreAuthorized']);
  check(done.completed===true&&done.accepted===false&&done.scope===SCOPE&&done.adapterContextClosed===true&&done.codecEOFValidated===true&&done.externalWholeAttemptAdmissionRequired===true,'conditional framed completion');
  for(const k of['rootsEvaluated','eomExecuted','metricsAvailable','scoreAuthorized'])check(done[k]===false,'authority promotion');
  check(done.pythonBodySha256===sha(PYTHON)&&same(done.clockTransfer,transfer),'body/clock transfer');
  const n=done.completedAdvances;check(Number.isInteger(n)&&n>=1&&n<=job.spec.maxAdvances,'bounded explicit advances');
  keys(done.finalState,['status','aggregate_is_none','next_generation','split_counts','leaf_count','evaluated_count','pending_count','next_request']);
  const inherited=continuationInputs(job.spec).inheritedPairs;
  check(done.inheritedPairs===inherited&&done.replayedGKEvaluations===inherited&&typeof done.restorationNanoseconds==='string'&&/^[0-9]{1,16}$/u.test(done.restorationNanoseconds),'separate inherited replay and new-work accounting');
  if(inherited===0)check(done.continuation===null&&done.restorationNanoseconds==='0','fresh invocation has no restoration');
  else check(done.continuation?.inheritedPairs===inherited&&done.continuation.replayedInitialState.evaluated_count===inherited,'actual restored frontier');
  check(done.finalState.evaluated_count===inherited+n&&inherited+n<=3280&&((done.stopReason==='explicit-maximum'&&n===job.spec.maxAdvances&&done.finalState.next_request!==null)||(done.stopReason==='no-outstanding-request'&&done.finalState.next_request===null)),'actual stopping reason');
  check(same(done.callCounts,{projections:4*n,evaluations:4*n,residuals:8*n,root_queries:0,emission_refinements:0}),'exact numerical call census');
  keys(done.geometryAccounting,['restriction_calls','completed_restrictions','history_state_evaluations','restricted_projections']);
  check(['restriction_calls','completed_restrictions','restricted_projections'].every(k=>done.geometryAccounting[k]===4*n)&&Number.isSafeInteger(done.geometryAccounting.history_state_evaluations)&&done.geometryAccounting.history_state_evaluations>=4*n,'actual geometry counters');
  const historical=done.historicalSourceBindings;check(Array.isArray(historical)&&historical.length>0&&historical.length<=512&&new Set(historical.map(b=>b.path)).size===historical.length,'captured historical census');historical.forEach(binding);
  check(same(done.metadataCensus,{sources:historical.length,members:8,segmentsPerMember:1760,frames:81,parents:160,projections:0,evaluations:0,residuals:0,restrictions:0,historyStateEvaluations:0}),'fresh original metadata');
  check(same(done.historicalOwnerArchives,archiveRelations(job.spec)),'exact explicit archive relations');
  const combined=boundedSourceUnion([...job.sources,...historical]);
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
 if(job.kind==='publish'){checkBindings(job.sources,live,job.sourceIdentities);return writeNew(job.filename,job.record,live,true);}
 throw Error('unknown worker operation');
}

export async function coordinate({specPath,specSha,selfSha,self,began,deadlineNanoseconds,lifetime}){
  // The single canonical file-C instance owns the private lifetime registry.
  // This captured mode never mints a guard or installs another observer.
  const root=realpathSync(process.cwd()),owner=readBound(path.join(root,PINS.operationCoordinator[0]),PINS.operationCoordinator[1],false,1024**2);
  const C=await import(pathToFileURL(owner.path).href);C.assertLifetime(lifetime);
  const live=()=>lifetime.live();
  check(lifetime.coordinator?.path===owner.path&&lifetime.coordinator.sha256===owner.sha256&&lifetime.coordinator.bytes===owner.bytes&&lifetime.coordinator.identity===owner.identity,'original canonical lifetime owner');
  check(lifetime.began===began&&lifetime.deadlineNanoseconds===deadlineNanoseconds,'unchanged whole-attempt clock');
  check(self&&self.path===path.join(root,SELF)&&self.sha256===selfSha&&Buffer.isBuffer(self.data)&&sha(self.data)===selfSha&&self.bytes===self.data.length&&import.meta.url===url(self.data),'exact captured caller generation');
  checkBindings([clean(owner),clean(self)],live,{[owner.path]:owner.identity,[self.path]:self.identity});
  let rawOwner=null,rawLayout=null,publication=null;
  try{
    const capturedSpec=readBound(specPath,specSha,true,1024**2,live),spec=decodeSpec(capturedSpec.data);
    // Full evidence/continuation validation stays in the observed file worker.
    keys(spec,['schema','scope','root','output','python','git','bindings','runtimeBindings','parentRefinements','evidencePackage','acceptedParentEvidence','continuation','maxAdvances','limits']);
    check(spec.schema==='braid-program/f6c-streamed-leaf-invocation.v4'&&spec.scope===SCOPE&&spec.root===root,'fixed streamed invocation');
    check(typeof spec.output==='string'&&path.dirname(spec.output)===path.join(root,LANE)&&path.resolve(spec.output)===spec.output&&/^[a-z0-9][a-z0-9-]{0,95}$/u.test(path.basename(spec.output)),'fixed streamed output');
    keys(spec.bindings,['coordinator','controls',...Object.keys(PINS)]);
    check(Array.isArray(spec.runtimeBindings)&&spec.runtimeBindings.length>0&&spec.runtimeBindings.length<=256,'bounded runtime declaration');
    const declared=boundedSourceUnion([...Object.values(spec.bindings),...spec.runtimeBindings]);
    check(equalBinding(spec.bindings.coordinator,clean(self))&&equalBinding(spec.bindings.operationCoordinator,clean(owner)),'exact caller and C declarations');
    const minimalPaths=[spec.git,realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'];
    const minimal=minimalPaths.map(p=>{check(typeof p==='string'&&path.isAbsolute(p)&&path.resolve(p)===p,'canonical observer executable');const b=declared.find(v=>v.path===p);check(b,'declared initial executable');const a=readBound(p,b.sha256,false,1024**3,live);check(a.bytes===b.bytes,'initial executable byte count');return a;});
    const initial=[self,owner,capturedSpec,...minimal];
    lifetime.bindSources({sources:initial.map(clean),identities:Object.fromEntries(initial.map(b=>[b.path,b.identity]))});
    const output=spec.output,ops=output+'-outer';
    const poll=()=>{const observed=inspectStreamLayout(output);if(observed.owner){check(!rawLayout||same(rawLayout,observed.layout),'private stream replaced');rawOwner??=observed.owner;rawLayout??=observed.layout;}else check(!rawOwner,'private stream removed');return observed;};
    await lifetime.startStreamed({output,operationDirectory:ops,git:spec.git,poll,
      failureFinalize:(_error,cleanupLive)=>{
        cleanupLive();const observed=poll();cleanupLive();
        // Validate the original public/private directory identities before an
        // owned alias can be removed; a changed layout supplies no authority.
        check(!rawOwner||same(observed.layout,rawLayout),'original failure-publication layout');
        const removed=observed.published&&rawOwner?retractStream(rawOwner):false;
        cleanupLive();return{retraction:removed?{...rawOwner,removed:true}:null,rejection:null};}});
    const worker=(job,options)=>lifetime.fileWorker(job,self.data,options);
    const pre=await worker({kind:'preflight',specPath,specSha,selfSha});
    check(same(pre.spec,spec)&&equalBinding(pre.specBinding,clean(capturedSpec)),'same consumed invocation');
    lifetime.bindSources({sources:pre.sources,identities:pre.sourceIdentities});
    const receipt=await lifetime.runRegistered({entry:SELF,args:['--registered',specPath,specSha,selfSha,deadlineNanoseconds],
      sources:[{path:SELF,sha256:selfSha,bytes:self.data}],output:path.join(ops,'process'),
      admit:({receipt:processReceipt,signal})=>{poll();return worker({kind:'admit',processReceipt,output,spec:pre.spec,specBinding:pre.specBinding,
        sources:pre.sources,sourceIdentities:pre.sourceIdentities,stdoutPath:path.join(ops,'process/runner-stdout.log')},{signal});}});
    check(receipt.accepted&&receipt.processesClosed&&receipt.admission?.accepted,'closed admitted target');
    poll();check(same(rawOwner,receipt.admission.streamOwner),'admitted original stream owner');checkFinalStreamLayout(output,rawLayout,live);
    const sources=uniqueBindings([...pre.sources,...receipt.admission.historicalSourceBindings,...receipt.admission.outputs,receipt.stdoutLog,receipt.stderrLog]);
    const sourceIdentities={...receipt.admission.sourceIdentities};
    lifetime.bindSources({sources,identities:sourceIdentities});
    await worker({kind:'recheck',sources,sourceIdentities});
    const snapshot=await lifetime.checkpoint({host:true});live();
    const record={schema:'braid-program/f6c-streamed-leaf-operation.v2',accepted:false,scope:'conditional-operational-completion',process:receipt,invocation:pre.specBinding,
      sourceBindings:pre.sources,observationsBeforePublication:snapshot.rss,hostObservationsBeforePublication:snapshot.hosts,
      elapsedSecondsBeforePublication:(performance.now()-began)/1000,
      publicationRequires:'conditional terminal wire plus independently observed actual exit0, original source/output identities, complete process closure and absent exact lock',
      physicalClaims:false,wholeHistoryMetrics:false,rootsEvaluated:false,eomExecuted:false};
    const created=await worker({kind:'publish',filename:path.join(ops,'operation.json'),record,sources,sourceIdentities});
    keys(created,['path','sha256','bytes','identity']);publication=clean(created);
    check(typeof created.identity==='string'&&/^(?:0|[1-9][0-9]*)(?::(?:0|[1-9][0-9]*)){4}$/u.test(created.identity)&&BigInt(created.identity.split(':')[2])===BigInt(created.bytes),'original publication identity transport');
    sourceIdentities[publication.path]=created.identity;
    const finalSources=uniqueBindings([...sources,publication]);
    lifetime.bindSources({sources:finalSources,identities:sourceIdentities});
    await worker({kind:'recheck',sources:finalSources,sourceIdentities});
    await lifetime.checkpoint();
    return await lifetime.finish({
      wire:{mode:'streamed-leaf',operation:publication,outputs:receipt.admission.outputs,physicalClaims:false,wholeHistoryMetrics:false,rootsEvaluated:false,eomExecuted:false},
      finalCheck:finalLive=>{checkBindings(finalSources,finalLive,sourceIdentities);checkFinalStreamLayout(output,rawLayout,finalLive);}
    });
  }catch(error){lifetime.fail(error);throw error;}
}

async function main(){
  const v=process.argv.slice(2);
  if(v[0]==='--registered'){check(v.length===5,'registered arguments');return registered(...v.slice(1));}
  throw Error('Direct streamed execution is disabled; use scripts/eom/f6c-bounded-operation.mjs with its reviewed streamed-mode invocation.');
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e);process.exitCode=1;});

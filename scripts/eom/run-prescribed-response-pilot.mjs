/** Operational entry only. The outer watcher owns resource observations, fresh
 * process-group closure and whole-attempt admission. No response mathematics is
 * implemented or executed by fileOperation. Fixed sources are not discovered.
 *
 * Worker protocol: preflight -> recheck -> admit(compute) -> prepare-publication
 * -> recheck -> admit(publisher) -> finalize -> recheck. The outer watcher MUST
 * compare each returned completionLog with its freshly closed stdoutLog, and
 * rehash its final receipt after successful monitor/worker/process cleanup.
 * Data directory is absent before compute; operational files live in its
 * exclusively reserved sibling `${output}-outer`. No automatic retry exists.
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync, openSync,
  readSync, realpathSync, writeSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ENTRY = 'scripts/eom/run-prescribed-response-pilot.mjs';
export const ENTRY_TESTS = 'tests/prescribed-response-pilot-entry.test.js';
export const LAUNCH_TESTS = 'tests/prescribed-response-pilot-launch.test.js';
export const PROCESS_TESTS = 'tests/prescribed-response-pilot-process.test.js';
export const LAUNCHER = 'scripts/eom/launch-prescribed-response-pilot.mjs';
export const OUTER = 'scripts/eom/launch-subfield-circular-root-pilot.mjs';
export const CONSUMER = 'scripts/eom/reduce-prescribed-acceleration-response.py';
export const PUBLISHER = 'scripts/eom/publish-prescribed-acceleration-response.py';
export const LANE = '.local-data/braid-analysis';
export const LIMIT_MS = 1800000, LOG_LIMIT = 16*1024**2, FILE_LIMIT = 64*1024**2, OUTPUT_LIMIT = 8*1024**2;
export const LIMITS = Object.freeze({wallSeconds:1800, heartbeatSeconds:15, rssSampleIntervalSeconds:1,
  residentBytes:2*1024**3, outputBytes:OUTPUT_LIMIT, logBytes:LOG_LIMIT});
export const EXECUTION_SCOPE = 'completed-compute-stage-through-private-candidate-publication-and-process-closure';
export const SUBJECT = Object.freeze({scope:'f5-release', campaignId:'f5-enclosed-root-restart-20260826-v1',
  runId:'prepared-20260827-v1', receptionTime:'0', quantity:'G_i', fieldSpeed:'1', symbolicStrength:'K=kappa*q0^2'});
export const FALSE_CLAIMS = Object.freeze(['physicalStrengthChosen','eomExecuted','evolutionAuthorized',
  'braidMetricsComputed','scoreAuthorized','retentionEstablished','h3EvidenceEligible','premiseTruthAuthenticated',
  'analyticTrajectoryIdentityEstablished']);
// Metadata-only separate invocation, never imported by the compute stage. The
// outer plan binds the returned existing files and keeps OS/shared-cache trust
// explicit. This inventory neither imports a scientific module nor loads data.
export const PYTHON_RUNTIME_INVENTORY = String.raw`import argparse,ast,contextlib,datetime,decimal,fractions,hashlib,json,math,os,pathlib,re,resource,signal,stat,struct,sys,tempfile,time,types,dataclasses,typing,collections.abc
argparse.ArgumentParser().parse_args([])
paths={pathlib.Path(sys.executable).resolve()}
for module in tuple(sys.modules.values()):
 for key in ('__file__','__cached__'):
  value=getattr(module,key,None)
  if isinstance(value,str):
   p=pathlib.Path(value).resolve()
   if p.is_file():paths.add(p)
print(json.dumps({'schema':'braid-program/prescribed-response-python-runtime-inventory.v1','scientificDataLoaded':False,'scientificModulesExecuted':False,'pythonInvocation':sys.executable,'pythonRealPath':str(pathlib.Path(sys.executable).resolve()),'files':[str(p) for p in sorted(paths)]}))
`;
const restart = '.local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/';
export const ORIGINALS = Object.freeze([
  ['rootPacket',restart+'root-ladder-20260827-v2/rung-8.json','a430d035d41ad32c89224f1a068c0a2a7947b9e44849f76280e1aa43a86b9052'],
  ['rootLedger',restart+'root-ladder-20260827-v2/ledger-reduction.json','37b934854075b500239a733df1b5e70a7ff355f0e56bbdc382adad952288a3a5'],
  ['historyManifest',restart+'prepared-20260827-v1/history-manifest.json','5c665fcd7eee92a105fd958929ee443e4eeaea6afc0222935739aad2622a1725'],
  ['nominalConformance',restart+'prepared-20260827-v1/nominal-history-conformance.json','f862a7148a0a00b3bde5fbb0d164156fce2dbfc161597b0cdaa182457f3741e0'],
  ['apiConformance',restart+'prepared-20260827-v1/api-domain-conformance.json','440deb996eaeb646b7863e9276fb937f9897c11fdbd56fed11a32efb269fe746'],
  ['reviewedBuild',restart+'root-ladder-20260827-v2/reviewed-build.json','5c8a9c36804b8bfed45b7f98834c0c104e758465ca0d19402bf0c328d81f9710'],
  ['approvedSource','reference/priorities/braid-program/configurations/phase-varying-prescribed-display-history.v3.json','e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb'],
  ['scientificFixture','reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json','bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344'],
  ['predeclaration','reference/priorities/braid-program/evidence/2026-08-27-prescribed-acceleration-response-predeclaration.md','c08d7f53616fc2843b3a192f7e3c10229f9a9fe7abc1a8670ddb1706d95756ef'],
  ['reference','scripts/eom/oracle/prescribed_acceleration_response.py','e630c2f4c48c9fcfc56866166e8b5977d70ab83c6ca3f2b08ad9ea4f3f5e910c'],
  ['referenceTests','tests/test_prescribed_acceleration_response.py','4b0e66feb308544aa6294b126a05f6a3c9fbb403580e8193d3140a7b52c370f1'],
  ['consumer',CONSUMER,'af7884573f834994dd18803e345d052de7f09d7ca87b543eea22214e6ef8d02f'],
  ['consumerTests','tests/test_prescribed_acceleration_response_consumer.py','2d97ad74c5a4ad1c33bf587ea4050cf4f028179e55ba1c817404714346cdb6d1'],
  ['pythonExecutable',null,null],
  ['scripts/eom/oracle/decimal_interval.py','scripts/eom/oracle/decimal_interval.py','fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a'],
  ['scripts/eom/oracle/certified_history.py','scripts/eom/oracle/certified_history.py','ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7'],
  ['scripts/eom/oracle/continuous_reception_roots.py','scripts/eom/oracle/continuous_reception_roots.py','f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c'],
  ['scripts/eom/oracle/reference_kernel.py','scripts/eom/oracle/reference_kernel.py','a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6'],
  ['scripts/eom/oracle/certified_acceleration.py','scripts/eom/oracle/certified_acceleration.py','62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83'],
].map(row=>Object.freeze(row)));
export const PINS = Object.freeze({...Object.fromEntries(ORIGINALS.filter(r=>r[1]).map(r=>[r[1],r[2]])),
  [OUTER]:'cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48',
  [PUBLISHER]:'4d67564c4ddc56ac616c334aeb43c2005028727bc97423d2ce35545497c30556',
  'tests/test_prescribed_acceleration_response_publication.py':'c5805819a7e54f68b4ad63757752afd48efba8c2d01f7caed7ace3b048bb7dd1'});
export const check = (ok,message)=>{if(!ok)throw new Error(message);};
export const sha = bytes=>createHash('sha256').update(bytes).digest('hex');
export const clean = ({data,...binding})=>binding;
const hash = x=>typeof x==='string'&&/^[a-f0-9]{64}$/u.test(x);
const canonical = value=>JSON.stringify(value,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)
  ?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
export const equal = (a,b)=>canonical(a)===canonical(b);
const closed = (v,fields,label)=>check(v&&typeof v==='object'&&!Array.isArray(v)&&
  equal(Object.keys(v).sort(),[...fields].sort()),'closed '+label+' required');
const positive = (x,max)=>Number.isSafeInteger(x)&&x>0&&x<=max;
const id = s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
const url = bytes=>'data:text/javascript;base64,'+Buffer.from(bytes).toString('base64');

// Closed metadata parser: reject duplicate keys before JSON.parse loses them.
export function decode(bytes,limit=FILE_LIMIT) {
  check(Buffer.isBuffer(bytes)&&bytes.length<=limit,'bounded JSON bytes required');
  const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);let at=0,nodes=0;
  const space=()=>{while(/[\x20\t\r\n]/u.test(text[at]??'!'))at++;};
  function string(){const start=at++;while(at<text.length){const c=text[at++];if(c==='"')return JSON.parse(text.slice(start,at));if(c==='\\')at++;}throw new Error('unterminated JSON string');}
  function item(depth){check(depth<=128&&++nodes<=1000000,'bounded JSON structure');space();const c=text[at];
    if(c==='"')return string();
    if(c==='{'||c==='['){at++;const object=c==='{',result=object?Object.create(null):[],seen=new Set();space();
      if(text[at]===(object?'}':']')){at++;return result;}
      while(true){space();let key;if(object){check(text[at]==='"','JSON key required');key=string();check(!seen.has(key),'duplicate JSON key');seen.add(key);space();check(text[at++]===':','JSON colon required');}
        const value=item(depth+1);if(object)result[key]=value;else result.push(value);space();const end=text[at++];if(end===(object?'}':']'))return result;check(end===',','JSON delimiter required');}
    }
    const match=/^(?:true|false|null|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/u.exec(text.slice(at));check(match,'invalid JSON token');at+=match[0].length;const v=JSON.parse(match[0]);
    check(typeof v!=='number'||(Number.isFinite(v)&&(!Number.isInteger(v)||Number.isSafeInteger(v))),'nonfinite/unsafe JSON number');return v;
  }
  const value=item(0);space();check(at===text.length,'trailing JSON bytes');return value;
}
export function readBound(filename,expected,collect=false,limit=collect?FILE_LIMIT:1024**3,live=()=>{}) {
  check(typeof filename==='string'&&path.isAbsolute(filename)&&path.resolve(filename)===filename,'canonical absolute input required');
  check(expected===undefined||hash(expected),'expected SHA required');live();
  check(realpathSync(filename)===filename,'symlinked input refused');
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try{const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size>=0n&&before.size<=BigInt(limit),'bounded regular input');
    const buffer=Buffer.alloc(65536),digest=createHash('sha256'),chunks=[];let count=0;
    while(count<Number(before.size)){live();const n=readSync(fd,buffer,0,Math.min(buffer.length,Number(before.size)-count),count);check(n>0,'input truncated');count+=n;digest.update(buffer.subarray(0,n));if(collect)chunks.push(Buffer.from(buffer.subarray(0,n)));}
    const digestHex=digest.digest('hex');check(id(before)===id(fstatSync(fd,{bigint:true}))&&id(before)===id(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename&&(!expected||expected===digestHex),'input generation/hash differs: '+filename);live();
    return {path:filename,sha256:digestHex,bytes:count,...(collect?{data:Buffer.concat(chunks)}:{})};
  }finally{closeSync(fd);}
}
export function checkBindings(rows,live=()=>{}) {return rows.map(row=>{const got=readBound(row.path,row.sha256,false,row.path.endsWith('.json')?FILE_LIMIT:1024**3,live);check(got.bytes===row.bytes,'binding byte census differs');return got;});}
export function writeNew(filename,value,limit=FILE_LIMIT,live=()=>{}) {
  live();check(realpathSync(path.dirname(filename))===path.dirname(filename),'canonical publication parent required');
  const bytes=Buffer.from(JSON.stringify(value)+'\n');check(bytes.length<=limit,'publication size bound');const fd=openSync(filename,'wx',0o600);
  try{let at=0;while(at<bytes.length){live();const n=writeSync(fd,bytes,at);check(n>0,'publication made no progress');at+=n;}fsyncSync(fd);}finally{closeSync(fd);}
  const directory=openSync(path.dirname(filename),'r');try{fsyncSync(directory);}finally{closeSync(directory);}live();
  return readBound(filename,sha(bytes),false,limit,live);
}
function binding(row,role=false){closed(row,role?['role','path','sha256','bytes']:['path','sha256','bytes'],'file binding');
  check(typeof row.path==='string'&&path.isAbsolute(row.path)&&path.resolve(row.path)===row.path&&hash(row.sha256)&&positive(row.bytes,1024**3),'exact bounded binding');}
function bindingList(rows,role=false){check(Array.isArray(rows)&&rows.length>0&&rows.length<=4096,'bounded binding list');for(const b of rows)binding(b,role);check(new Set(rows.map(b=>b.path)).size===rows.length,'duplicate binding path');}
export function validatePlan(plan,root,launcherSha,entrySha) {
  closed(plan,['schema','scope','originalBindings','operationalBindings','runtimeBindings','python','pythonRealPath','node','limits','platformTrust'],'machine plan');
  check(plan.schema==='braid-program/prescribed-response-pilot-launch.v1'&&plan.scope==='f5-release'&&equal(plan.limits,LIMITS),'fixed first-pilot scope/limits');
  check(plan.platformTrust==='host OS and macOS shared-cache libraries; explicitly listed file-backed runtime dependencies only','explicit platform trust required');
  check(realpathSync(root)===root&&hash(launcherSha)&&hash(entrySha),'canonical reviewed composition required');
  for(const key of ['python','pythonRealPath','node'])check(typeof plan[key]==='string'&&path.isAbsolute(plan[key])&&path.resolve(plan[key])===plan[key],'absolute runtime path');
  check(realpathSync(plan.python)===plan.pythonRealPath&&realpathSync(plan.node)===plan.node&&plan.node===realpathSync(process.execPath),'runtime invocation differs');
  bindingList(plan.originalBindings,true);check(plan.originalBindings.length===19,'exact nineteen original bindings');
  ORIGINALS.forEach(([role,file,digest],i)=>{const b=plan.originalBindings[i];check(b.role===role&&b.path===(file?path.join(root,file):plan.pythonRealPath)&&(!digest||b.sha256===digest)&&b.bytes<=FILE_LIMIT,'frozen original role/path/hash differs');});
  check(plan.originalBindings.slice(0,8).reduce((n,b)=>n+b.bytes,0)<=256*1024**2,'scientific input total bound');
  bindingList(plan.runtimeBindings);bindingList(plan.operationalBindings);
  const python=plan.originalBindings[13],cfg=path.join(path.dirname(path.dirname(plan.python)),'pyvenv.cfg');
  check(plan.runtimeBindings.some(b=>equal(b,cleanRole(python)))&&plan.runtimeBindings.some(b=>b.path===cfg),'shared venv binary/config missing');
  const ops=[ENTRY,ENTRY_TESTS,LAUNCH_TESTS,PROCESS_TESTS,LAUNCHER,OUTER,PUBLISHER,'tests/test_prescribed_acceleration_response_publication.py'].map(p=>path.join(root,p)).concat([plan.node,'/bin/ps','/usr/bin/memory_pressure']);
  check(equal(plan.operationalBindings.map(b=>b.path).sort(),ops.sort()),'operational source closure differs');
  for(const b of plan.operationalBindings){const local=path.relative(root,b.path),expected=local===ENTRY?entrySha:local===LAUNCHER?launcherSha:PINS[local];if(expected)check(b.sha256===expected,'operational source hash differs');}
  return plan;
}
const cleanRole = ({role,...b})=>b;
export function planBindings(plan,root) {
  const map=new Map();for(const row of [...plan.originalBindings.map(cleanRole),...plan.operationalBindings,...plan.runtimeBindings]){
    const prev=map.get(row.path);check(!prev||equal(prev,row),'conflicting repeated source binding');map.set(row.path,row);}
  return [...map.values()];
}
export function remainingSeconds(deadline) {const ns=BigInt(deadline)-process.hrtime.bigint();check(ns>0n&&ns<=1800000000000n,'remaining stage deadline');return `${ns/1000000000n}.${String(ns%1000000000n).padStart(9,'0')}`;}
function outputLane(root,output){check(path.dirname(output)===path.join(root,LANE)&&/^prescribed-response-[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(path.basename(output))&&realpathSync(path.dirname(output))===path.dirname(output),'direct canonical data lane required');return output+'-outer';}
export function stageSpec({stage,plan,root,output,budget,publicationJob,launcherSha256}) {
  check(stage==='compute'||stage==='publisher','unknown response stage');outputLane(root,output);
  check(typeof budget==='string'&&/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(budget)&&Number(budget)>0&&Number(budget)<=1800,'positive bounded stage budget');
  check(hash(launcherSha256),'reviewed watcher hash required');
  const args=['-I','-B',path.join(root,stage==='compute'?CONSUMER:PUBLISHER),'--repo-root',root,'--watcher-sha256',launcherSha256];
  if(stage==='compute')args.push('--consumer-sha256',PINS[CONSUMER],'--consumer-tests-sha256',PINS['tests/test_prescribed_acceleration_response_consumer.py'],
    '--python-sha256',plan.originalBindings[13].sha256,'--out-dir',output);
  else{binding(publicationJob);check(publicationJob.path===output+'-outer/publisher-job.json','original publisher job required');
    args.push('--publisher-sha256',PINS[PUBLISHER],'--job',publicationJob.path,'--job-sha256',publicationJob.sha256);}
  args.push('--budget-seconds',budget);return {command:plan.python,args};
}
export async function runSingleStage(spec,{root=process.cwd(),out=process.stdout,err=process.stderr,spawnImpl=spawn}={}) {
  let total=0,failure;const child=spawnImpl(spec.command,spec.args,{cwd:root,detached:true,stdio:['ignore','pipe','pipe']});
  const forward=stream=>chunk=>{total+=chunk.length;if(total>LOG_LIMIT){failure??=new Error('combined stage log limit');child.kill('SIGTERM');return;}
    try{stream.write(chunk);}catch(e){failure??=e;child.kill('SIGTERM');}};
  child.stdout.on('data',forward(out));child.stderr.on('data',forward(err));
  const result=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}));});
  check(!failure&&result.code===0&&result.signal===null,failure?.message??'stage process did not exit successfully');
  return {completed:true,accepted:false,logBytes:total}; // NEVER asserts descendants closed.
}
function completionLog(b,live){binding(b);check(b.bytes<=LOG_LIMIT,'bounded stdout');const captured=readBound(b.path,b.sha256,true,LOG_LIMIT,live);check(captured.bytes===b.bytes,'stdout byte count');
  const lines=captured.data.toString('utf8').trim().split('\n');check(lines.length===1,'one fresh stdout completion');return decode(Buffer.from(lines[0]),LOG_LIMIT);}
function processClosure(job){const p=job.processReceipt;check(p?.accepted===false&&p.processesClosed===true&&p.exit?.code===0&&p.exit.signal===null&&Array.isArray(p.gates)&&p.gates.length===1,'fresh external group closure required');
  const g=p.gates[0],a=g.requestedArgs;check(g.acknowledged===true&&g.target&&g.measurement?.code===0&&g.measurement.signal===null&&Array.isArray(a)&&a.at(-2)==='--budget-seconds','one successful registered target required');
  const expected=stageSpec({...job,budget:a.at(-1)});check(g.requestedCommand===expected.command&&equal(a,expected.args),'exact registered stage arguments required');}
function referenceMetadata(reference){check(reference?.schema==='braid-program/prescribed-acceleration-response-reference.v1'&&reference.accepted===false&&reference.arithmeticComplete===true&&reference.scope==='f5-release'&&
  reference.campaignId===SUBJECT.campaignId&&reference.runId===SUBJECT.runId&&reference.receptionTime==='0'&&equal(reference.searchedInterval,['-1','0'])&&
  reference.decimalPrecision===90&&reference.nativePrecisionBits===53&&reference.newRootSearches===0&&equal(reference.failures,[])&&
  equal(reference.claims,Object.fromEntries(FALSE_CLAIMS.map(k=>[k,false])))&&
  equal(reference.census,{members:12,segments:12384,orderedPairs:144,ordinaryRoots:132,selfExclusions:12})&&
  equal(reference.interpretations,['source-decimal','frozen-binary64'])&&
  equal(reference.sourceHashes,ORIGINALS.slice(0,8).map(([role,,sha256])=>({role,sha256})))&&
  reference.members?.length===12&&reference.contributions?.length===132&&reference.selfExclusions?.length===12&&reference.responses?.length===12,'complete conditional reference metadata required');}
function candidateData(b,job,live){binding(b);check(b.path===path.join(job.output,'private-candidate.json')&&b.bytes<=OUTPUT_LIMIT,'fixed private candidate path');
  const raw=readBound(b.path,b.sha256,true,OUTPUT_LIMIT,live);check(raw.bytes===b.bytes,'candidate bytes differ');const candidate=decode(raw.data,OUTPUT_LIMIT);
  closed(candidate,['schema','accepted','admissible','subject','bindings','referenceResult','referenceResultSha256','watcherSha256'],'private candidate');
  check(candidate.schema==='braid-program/prescribed-acceleration-response-private.v1'&&candidate.accepted===false&&candidate.admissible===false&&
    equal(candidate.subject,SUBJECT)&&equal(candidate.bindings,job.plan.originalBindings)&&candidate.watcherSha256===job.launcherSha256,'candidate generation/scope mismatch');
  referenceMetadata(candidate.referenceResult);
  // Reference serialization contains only exact strings/integers and ASCII keys.
  const refJSON=canonical(candidate.referenceResult).replace(/[\u007f-\uffff]/gu,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'));
  check(hash(candidate.referenceResultSha256)&&sha(Buffer.from(refJSON))===candidate.referenceResultSha256,'conditional reference hash differs');return candidate;
}
function authenticateContext(job,live){
  validatePlan(job.plan,job.root,job.launcherSha256,job.entrySha256);binding(job.planBinding);
  const plan=readBound(job.planBinding.path,job.planBinding.sha256,true,1024**2,live);
  check(plan.bytes===job.planBinding.bytes&&equal(decode(plan.data,1024**2),job.plan),'original machine plan differs');
  const expected=[...planBindings(job.plan,job.root),job.planBinding];
  check(equal(job.sources,expected),'complete original/context binding census required');checkBindings(expected,live);
}
export function admitStage(job,live=()=>{}) {
  processClosure(job);authenticateContext(job,live);binding(job.stdout);const completion=completionLog(job.stdout,live);
  check(completion.completed===true&&completion.accepted===false&&Number.isFinite(completion.elapsedSeconds)&&completion.elapsedSeconds>=0&&completion.elapsedSeconds<1800,'fresh successful conditional completion required');
  let outputs;
  if(job.stage==='compute'){
    closed(completion,['completed','accepted','candidate','referenceResultSha256','elapsedSeconds'],'compute completion');
    const candidate=candidateData(completion.candidate,job,live);check(completion.referenceResultSha256===candidate.referenceResultSha256,'compute completion reference differs');outputs=[completion.candidate];
    check(!existsSync(path.join(job.output,'rejection.json')),'compute rejection present');
  }else{
    closed(completion,['completed','accepted','publicationPrepared','output','jobSha256','embeddedExecutionScope','externalWholeAttemptAdmissionRequired','elapsedSeconds'],'publisher completion');
    check(completion.publicationPrepared===true&&completion.externalWholeAttemptAdmissionRequired===true&&completion.embeddedExecutionScope===EXECUTION_SCOPE&&completion.jobSha256===job.publicationJob.sha256,'publisher completion authority differs');
    const pj=readBound(job.publicationJob.path,job.publicationJob.sha256,true,OUTPUT_LIMIT,live);check(pj.bytes===job.publicationJob.bytes,'publication job bytes differ');const publication=decode(pj.data,OUTPUT_LIMIT);
    validatePublicationJob(publication,job);
    const candidate=candidateData(publication.candidate,job,live);binding(completion.output);check(completion.output.path===path.join(job.output,'response.json')&&completion.output.bytes<=OUTPUT_LIMIT,'final response identity required');
    const raw=readBound(completion.output.path,completion.output.sha256,true,OUTPUT_LIMIT,live);check(raw.bytes===completion.output.bytes,'published byte count differs');const final=decode(raw.data,OUTPUT_LIMIT);
    closed(final,['schema','accepted','status','subject','bindings','referenceResult','execution','claims','newRootSearches','failures'],'final response');
    check(final.schema==='braid-program/prescribed-acceleration-response.v1'&&final.accepted===true&&final.status==='accepted-prescribed-response-enclosure'&&
      equal(final.subject,candidate.subject)&&equal(final.bindings,candidate.bindings)&&equal(final.referenceResult,candidate.referenceResult)&&
      equal(final.claims,Object.fromEntries(FALSE_CLAIMS.map(k=>[k,false])))&&final.newRootSearches===0&&equal(final.failures,[])&&
      equal(final.execution,{...publication.execution,outputBytes:raw.bytes}),'published payload differs from closed compute');outputs=[completion.output];
  }
  checkBindings(job.sources,live);live();return {accepted:true,h3EvidenceEligible:false,stage:job.stage,completion,completionLog:job.stdout,outputs,
    authority:'mechanical source-bound stage admission only; external whole-attempt admission required'};
}
export function validateComputeExecution(execution,completion,watcherSha){
  closed(execution,['startedAt','elapsedSeconds','exitCode','processesClosed','heartbeatSeconds','maximumSampledGroupRssBytes',
    'rssSampleIntervalSeconds','outputBytes','logBytes','watcherSha256','publicationComplete'],'closed-compute observations');
  check(typeof execution.startedAt==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/u.test(execution.startedAt)&&
    Number.isFinite(execution.elapsedSeconds)&&execution.elapsedSeconds>=completion.elapsedSeconds&&execution.elapsedSeconds<1800&&
    execution.exitCode===0&&execution.processesClosed===true&&execution.publicationComplete===true&&execution.heartbeatSeconds===15&&
    Number.isFinite(execution.rssSampleIntervalSeconds)&&execution.rssSampleIntervalSeconds>0&&execution.rssSampleIntervalSeconds<=1&&
    positive(execution.maximumSampledGroupRssBytes,2*1024**3-1)&&Number.isSafeInteger(execution.logBytes)&&execution.logBytes>=0&&execution.logBytes<=LOG_LIMIT&&
    execution.outputBytes===0&&execution.watcherSha256===watcherSha,'actual closed-compute observations required');
}
function validatePublicationJob(pj,job){closed(pj,['schema','embeddedExecutionScope','candidate','completion','execution','expectedBindings','watcherSha256','output'],'publication job');
  check(pj.schema==='braid-program/prescribed-response-publication-job.v1'&&pj.embeddedExecutionScope===EXECUTION_SCOPE&&
    equal(pj.expectedBindings,job.plan.originalBindings)&&pj.watcherSha256===job.launcherSha256&&pj.output===path.join(job.output,'response.json')&&
    equal(pj.candidate,pj.completion.candidate)&&equal(pj.completion,job.compute.completion),'original completed-compute job required');
  validateComputeExecution(pj.execution,pj.completion,job.launcherSha256);
}
export function fileOperation(job){const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'inclusive file-operation deadline');live();
  if(job.kind==='preflight'){
    const own=readBound(path.join(job.root,ENTRY),job.entrySha256,true,1024**2,live);check(import.meta.url===url(own.data),'captured entry worker required');
    const p=readBound(job.planPath,job.planSha256,true,1024**2,live),plan=decode(p.data,1024**2);validatePlan(plan,job.root,job.launcherSha256,job.entrySha256);
    outputLane(job.root,job.output);check(!existsSync(job.output)&&realpathSync(job.output+'-outer')===job.output+'-outer','new data/sibling operational directory required');
    const sources=checkBindings([...planBindings(plan,job.root),clean(p)],live);return {plan,planBinding:clean(p),sources};
  }
  if(job.kind==='recheck')return checkBindings(job.sources,live);
  if(job.kind==='admit'){const result=admitStage(job,live);live();return result;}
  if(job.kind==='prepare-publication'){
    check(job.compute?.accepted===true&&job.compute.stage==='compute'&&job.closedProcess?.accepted===true&&job.closedProcess.processesClosed===true&&
      equal(job.closedProcess.stdoutLog,job.compute.completionLog)&&equal(job.closedProcess.admission,job.compute),'outer admitted compute required');
    authenticateContext(job,live);
    candidateData(job.compute.outputs[0],job,live);checkBindings([job.compute.completionLog,...job.sources],live);
    const payload={schema:'braid-program/prescribed-response-publication-job.v1',embeddedExecutionScope:EXECUTION_SCOPE,
      candidate:job.compute.outputs[0],completion:job.compute.completion,execution:job.execution,expectedBindings:job.plan.originalBindings,
      watcherSha256:job.launcherSha256,output:path.join(job.output,'response.json')};validatePublicationJob(payload,job);
    const binding=writeNew(job.output+'-outer/publisher-job.json',payload,OUTPUT_LIMIT,live);live();return binding;
  }
  if(job.kind==='finalize'){
    const r=job.record;check(r?.schema==='braid-program/prescribed-response-pilot-admission.v1'&&r.accepted===true&&r.scope==='f5-release'&&r.processesClosed===true&&
      r.embeddedExecutionScope===EXECUTION_SCOPE&&r.externalWholeAttemptAdmissionRequired===true&&
      Array.isArray(r.stages)&&equal(r.stages.map(s=>s.stage),['compute','publisher'])&&
      r.stages.every(s=>s.process.accepted===true&&s.process.processesClosed===true&&s.admission.accepted===true&&equal(s.process.stdoutLog,s.admission.completionLog))&&
      Number.isFinite(r.elapsedSecondsBeforePublication)&&r.elapsedSecondsBeforePublication>=0&&r.elapsedSecondsBeforePublication<1800&&
      equal(r.claims,Object.fromEntries(FALSE_CLAIMS.map(k=>[k,false]))),'externally completed two-stage admission required');
    authenticateContext(job,live);checkBindings(job.evidence,live);const result=writeNew(job.output+'-outer/pilot-admission.json',r,FILE_LIMIT,live);live();return result;
  }
  throw new Error('unknown file operation');
}
export async function stageMain(argv){const values={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!Object.hasOwn(values,argv[i]),'unique paired stage arguments');values[argv[i]]=argv[i+1];}
  check(equal(Object.keys(values).sort(),['--plan','--plan-sha256','--entry-sha256','--launcher-sha256','--stage','--out','--deadline-ns','--publication-job-sha256'].sort()),'closed stage arguments');
  const root=process.cwd(),own=readBound(path.join(root,ENTRY),values['--entry-sha256'],true,1024**2);check(import.meta.url===url(own.data),'captured operational entry required');
  const p=readBound(values['--plan'],values['--plan-sha256'],true,1024**2),plan=decode(p.data,1024**2);validatePlan(plan,root,values['--launcher-sha256'],values['--entry-sha256']);
  const output=values['--out'],stage=values['--stage'];outputLane(root,output);const sources=[...planBindings(plan,root),clean(p)];
  checkBindings(sources,()=>remainingSeconds(values['--deadline-ns']));
  let publicationJob;
  if(stage==='compute')check(values['--publication-job-sha256']==='none'&&!existsSync(output),'compute requires fresh absent data directory');
  else {check(stage==='publisher'&&realpathSync(output)===output,'publisher data directory required');publicationJob=readBound(output+'-outer/publisher-job.json',values['--publication-job-sha256'],false,OUTPUT_LIMIT);}
  await runSingleStage(stageSpec({stage,plan,root,output,publicationJob,launcherSha256:values['--launcher-sha256'],budget:remainingSeconds(values['--deadline-ns'])}));
  checkBindings(sources,()=>remainingSeconds(values['--deadline-ns']));remainingSeconds(values['--deadline-ns']);
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const argv=process.argv.slice(2),digest=argv[argv.indexOf('--entry-sha256')+1];
  Promise.resolve().then(()=>{const own=readBound(fileURLToPath(import.meta.url),digest,true,1024**2);return import(url(own.data));})
    .then(m=>m.stageMain(argv)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});
}

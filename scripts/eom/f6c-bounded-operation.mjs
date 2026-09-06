/** Source-bound serial operations with one inclusive resource/process budget.
 *
 * The canonical CLI owns one genuine live capability, required by both exported
 * operational entrypoints. --plan and fixed --streamed use the unchanged
 * 1800-second maximum; exact --control-plan selects only the reviewed 120-second
 * contraction. Imports are inert; neither a Boolean nor a deadline mints a guard.
 * The entry captures this module and its frozen public dependencies. The JSON
 * plan declares stage entry/args/source/runtime bindings, pure file-operation
 * hooks, fresh output directories and explicit publication aliases. It cannot
 * change limits. Hooks execute in a captured worker, not the monitoring loop.
 * They must implement fileOperation({kind:'preflight'|'admit'|'final',plan,...})
 * and return accepted:true,h3EvidenceEligible:false. Admission receives stdoutLog
 * captured by the existing runFileWorker stdoutPath seam before the outer
 * receipt finalizes its log fields; both bindings are compared after return.
 * Admission additionally
 * returns runtimeBindings exactly matching that stage's frozen inventory.
 * Hooks authenticate scientific content/runtime completeness; this coordinator
 * supplies operational supervision, not independent scientific acceptance.
 *
 * Failed private bytes are retained; only the reviewed original streamed public
 * alias may be explicitly retracted. Conditional stdout leaves lock/whole-guard
 * closure pending. Independent actual exit0 and original source/process/lock
 * checks complete that boundary; no numerical work or resume is hidden.
 */
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {registerHooks} from 'node:module';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,
  openSync,readSync,readdirSync,realpathSync,statfsSync,unlinkSync,writeSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Worker} from 'node:worker_threads';

export const SELF='scripts/eom/f6c-bounded-operation.mjs';
export const CONTROLS='tests/f6c-bounded-operation.test.js';
export const LIMITS=Object.freeze({inclusiveMilliseconds:1800000,aggregateRSSBytes:2147483648,
  rssPollMilliseconds:250,maximumRSSGapMilliseconds:1000,heartbeatMilliseconds:15000,
  scientificBytes:67108864,combinedLogBytes:16777216,sourceFiles:512,sourceBytes:1073741824,
  outputFiles:512,serialWorkers:1,startFreePercent:40,startDiskBytes:68719476736,
  stopFreePercent:20,stopDiskBytes:17179869184});
export const PINS=Object.freeze({
  helpers:['scripts/eom/launch-prescribed-response-pilot.mjs','9eb1afb84a175b143020610c153f9fef6dabb50efce9f956991feca3fbc0d5c2'],
  outer:['scripts/eom/launch-subfield-circular-root-pilot.mjs','cd5b892440cba141f6aeac72fbef07f7febdc8fe28b18e813cf0d73be0633a48'],
  diagnostics:['scripts/eom/launch-f6c-emission-refinement-pilot.mjs','7a1f5571827225d1529f73a3f0b905be75e81e2f7d11c2670b697e0599d65e71'],
});
const check=(ok,message)=>{if(!ok)throw Error(message);};
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const url=raw=>'data:text/javascript;base64,'+Buffer.from(raw).toString('base64');
const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
export const clean=({data,identity:ignored,...binding})=>binding;
const keys=(o,k)=>check(o&&Object.getPrototypeOf(o)===Object.prototype&&Object.keys(o).sort().join('|')===[...k].sort().join('|'),'closed object fields');
const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
const equal=(a,b)=>canonical(a)===canonical(b);
const absolute=p=>check(typeof p==='string'&&p.length>0&&p.length<=2048&&!p.includes('\0')&&!p.includes('\\')&&p.startsWith('/')&&path.resolve(p)===p&&!p.startsWith('//'),'canonical absolute path');
const beneath=(p,d)=>p.startsWith(d+path.sep);
const hashToken=h=>check(typeof h==='string'&&/^[a-f0-9]{64}$/u.test(h),'explicit expected SHA-256 required');

export function readBound(filename,expected,collect=false,limit=LIMITS.sourceBytes,live=()=>{}){
  absolute(filename);check(realpathSync(filename)===filename,'source symlink alias');live();
  const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|constants.O_NOFOLLOW);
  try{
    const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size>=0n&&before.size<=BigInt(limit),'bounded regular file');
    const hash=createHash('sha256'),parts=[],buffer=Buffer.allocUnsafe(65536);let bytes=0;
    for(;;){live();const n=readSync(fd,buffer,0,buffer.length,bytes);if(!n)break;bytes+=n;check(BigInt(bytes)<=before.size,'source grew');hash.update(buffer.subarray(0,n));if(collect)parts.push(Buffer.from(buffer.subarray(0,n)));}
    const digest=hash.digest('hex');check(BigInt(bytes)===before.size&&(!expected||digest===expected)&&identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename,'source changed/replaced/hash mismatch');
    return {path:filename,sha256:digest,bytes,identity:identity(before),...(collect?{data:Buffer.concat(parts)}:{})};
  }finally{closeSync(fd);}
}

export function binding(b){
  keys(b,['path','sha256','bytes']);absolute(b.path);
  check(typeof b.sha256==='string'&&/^[a-f0-9]{64}$/u.test(b.sha256)&&Number.isSafeInteger(b.bytes)&&b.bytes>0&&b.bytes<=LIMITS.sourceBytes,'source binding');return b;
}

export function sourceUnion(bindings){
  check(Array.isArray(bindings)&&bindings.length<=4096,'bounded source declarations');
  const result=new Map();
  for(const b of bindings){binding(b);check(!result.has(b.path)||equal(result.get(b.path),b),'conflicting source generation');result.set(b.path,{...b});}
  const values=[...result.values()];check(values.length<=LIMITS.sourceFiles&&values.reduce((n,b)=>n+b.bytes,0)<=LIMITS.sourceBytes,'physical source count/bytes');return values;
}

export function validatePlan(plan,root){
  const v2=plan?.schema==='braid-program/f6c-bounded-operation-plan.v2';
  keys(plan,['schema','root','operationDirectory','outputDirectories','publicationAliases','sources','hookModule','hookControls','configuration','stages',...(v2?['priorArtifacts']:[])]);
  absolute(root);check(root===realpathSync(root)&&plan.root===root&&(v2||plan.schema==='braid-program/f6c-bounded-operation-plan.v1'),'plan root/schema');
  absolute(plan.operationDirectory);check(Array.isArray(plan.outputDirectories)&&plan.outputDirectories.length>0&&plan.outputDirectories.length<=16,'output directories');
  const dirs=[plan.operationDirectory,...plan.outputDirectories];
  for(const d of dirs){absolute(d);check(beneath(d,path.join(root,'.local-data/braid-analysis')),'owned output lane');}
  check(new Set(dirs).size===dirs.length&&!dirs.some(a=>dirs.some(b=>a!==b&&beneath(a,b))),'overlapping output directories');
  validatePriorDeclarations(plan,dirs);
  binding(plan.hookModule);binding(plan.hookControls);check(plan.hookModule.bytes<=1024**2&&plan.hookControls.bytes<=1024**2,'bounded hook sources');
  check(Array.isArray(plan.sources)&&Array.isArray(plan.stages)&&plan.stages.length>0&&plan.stages.length<=160,'bounded serial stages');
  const ids=new Set();
  for(const s of plan.stages){
    keys(s,['id','entry','args','sources','runtimeBindings']);binding(s.entry);
    check(typeof s.id==='string'&&/^[a-z][a-z0-9-]{0,63}$/u.test(s.id)&&!ids.has(s.id),'unique stage id');ids.add(s.id);
    check(s.entry.bytes<=1024**2&&beneath(s.entry.path,root),'bounded stage entry');
    check(Array.isArray(s.args)&&s.args.length<=58&&s.args.every(a=>typeof a==='string'&&a.length<=65536&&!a.includes('\0')&&!a.startsWith('--operation-deadline-ns')&&!a.startsWith('--operation-prior-stdout')&&!a.startsWith('--operation-plan-binding'))&&s.args.reduce((n,a)=>n+Buffer.byteLength(a)+1,0)<=57344,'inert bounded stage arguments; operation transport reserved');
    check(Array.isArray(s.sources)&&Array.isArray(s.runtimeBindings)&&s.runtimeBindings.length>0,'explicit stage runtime capture');
  }
  check(Array.isArray(plan.publicationAliases)&&plan.publicationAliases.length<=512,'publication alias declarations');
  for(const a of plan.publicationAliases){
    keys(a,['publicPath','privateDirectory','privatePrefix']);absolute(a.publicPath);absolute(a.privateDirectory);
    check(plan.outputDirectories.some(d=>beneath(a.publicPath,d))&&plan.outputDirectories.some(d=>a.privateDirectory===d||beneath(a.privateDirectory,d))&&typeof a.privatePrefix==='string'&&/^[a-zA-Z0-9._-]{1,128}$/u.test(a.privatePrefix),'scoped publication alias');
  }
  const sources=sourceUnion([...plan.sources,plan.hookModule,plan.hookControls,...plan.stages.flatMap(s=>[s.entry,...s.sources,...s.runtimeBindings])]);
  check(sources.every(b=>!dirs.some(d=>b.path===d||beneath(b.path,d))),'output cannot consume/replace original source');
  // Each observer is itself an explicitly captured runtime, not ambient tooling.
  for(const required of [realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'])check(sources.some(b=>b.path===required),'missing bound observer runtime '+required);
  return sources;
}

export function captureUnion(bindings,identities={},live=()=>{}){
  const sources=sourceUnion(bindings),seen=new Set(),captured=[];
  for(const b of sources){const c=readBound(b.path,b.sha256,false,LIMITS.sourceBytes,live);check(c.bytes===b.bytes&&(!identities[b.path]||identities[b.path]===c.identity),'source size/original identity');const inode=c.identity.split(':').slice(0,2).join(':');check(!seen.has(inode),'physical source hardlink alias');seen.add(inode);captured.push(c);}
  return {sources:captured.map(clean),identities:Object.fromEntries(captured.map(b=>[b.path,b.identity]))};
}

export function originalIdentities(captured){
  const result={};
  for(const c of captured){binding(clean(c));check(typeof c.identity==='string'&&/^[0-9]+:[0-9]+:[0-9]+:[0-9]+:[0-9]+$/u.test(c.identity),'captured source identity required');check(!Object.hasOwn(result,c.path)||result[c.path]===c.identity,'conflicting original source identity');result[c.path]=c.identity;}
  return result;
}

export function noCompetitor(table,ownPid){
  const own=new Set([ownPid]);let changed;do{changed=false;for(const row of table)if(own.has(row.ppid)&&!own.has(row.pid)){own.add(row.pid);changed=true;}}while(changed);
  const program=/(?:run|launch)-(?:f5|f6c)|(?:prepare|verify|reduce)-(?:f5|f6c)|(?:reduce|publish)-prescribed-acceleration|eom_native_.*(?:cli|fixture)|f6c-bounded-operation/u;
  check(!table.some(row=>!own.has(row.pid)&&program.test(row.command)),'competing numerical or packaging operation');
}

export function stageArguments(args,prior,deadlineNanoseconds,planBinding){
  check(Array.isArray(args)&&args.every(a=>typeof a==='string'&&!a.includes('\0')&&!a.startsWith('--operation-deadline-ns')&&!a.startsWith('--operation-prior-stdout')&&!a.startsWith('--operation-plan-binding')),'reserved stage argument collision');
  check(typeof deadlineNanoseconds==='string'&&/^[0-9]{1,32}$/u.test(deadlineNanoseconds),'original deadline token');
  if(prior!==null){keys(prior,['stageId','stdoutLog']);check(typeof prior.stageId==='string'&&/^[a-z][a-z0-9-]{0,63}$/u.test(prior.stageId),'prior stage identity');binding(prior.stdoutLog);check(prior.stdoutLog.bytes<=LIMITS.combinedLogBytes,'prior stdout bound');}
  binding(planBinding);check(planBinding.bytes<=1048576,'bounded operation plan');const planText=canonical(planBinding);check(Buffer.byteLength(planText)<=4096,'bounded plan binding transport');
  const serialized=canonical(prior);check(Buffer.byteLength(serialized)<=4096,'bounded immediate prior record');
  const result=[...args,'--operation-deadline-ns',deadlineNanoseconds,'--operation-prior-stdout',serialized,'--operation-plan-binding',planText];
  check(result.length<=64&&result.reduce((n,a)=>n+Buffer.byteLength(a)+1,0)<=65536,'complete registered argument count/bytes');return result;
}

function validatePriorDeclarations(plan,dirs=[plan.operationDirectory,...plan.outputDirectories]){
  const v2=plan.schema==='braid-program/f6c-bounded-operation-plan.v2';
  check(v2||plan.schema==='braid-program/f6c-bounded-operation-plan.v1','prior accounting plan schema');
  check(v2?Array.isArray(plan.priorArtifacts)&&plan.priorArtifacts.length<=512:!Object.hasOwn(plan,'priorArtifacts'),'versioned prior artifact declaration');
  const selected=v2?plan.priorArtifacts:[],seen=new Set();
  for(const item of selected){keys(item,['path','classification']);absolute(item.path);
    check(['scientific','log'].includes(item.classification)&&!seen.has(item.path),'unique classified prior artifact');seen.add(item.path);
    check(!dirs.some(d=>item.path===d||beneath(item.path,d)),'prior artifact overlaps current output root');
  }
  return selected;
}

export function derivePriorContext(plan,capturedSources,identities){
  const selected=validatePriorDeclarations(plan),sources=sourceUnion(capturedSources),byPath=new Map(sources.map(b=>[b.path,b]));
  check(identities&&Object.getPrototypeOf(identities)===Object.prototype,'captured prior identity map');
  const artifacts=[],inodes=new Set();let scientificBytes=0,retainedLogBytes=0;
  for(const item of selected){const b=byPath.get(item.path);check(b&&Object.hasOwn(identities,b.path),'prior artifact absent from captured source closure');
    const token=identities[b.path];validatePublicationIdentity(token,b.bytes);const inode=token.split(':').slice(0,2).join(':');
    check(!inodes.has(inode),'prior artifact physical alias');inodes.add(inode);
    artifacts.push(Object.freeze({...b,identity:token,classification:item.classification}));
    if(item.classification==='log')retainedLogBytes+=b.bytes;else scientificBytes+=b.bytes;
  }
  check(scientificBytes<=LIMITS.scientificBytes&&retainedLogBytes<=LIMITS.combinedLogBytes,'prior artifact byte limits');
  return Object.freeze({artifacts:Object.freeze(artifacts),pathCount:artifacts.length,physicalFiles:inodes.size,scientificBytes,retainedLogBytes});
}

function applyPriorContext(plan,current,prior,live=()=>{}){
  keys(prior,['artifacts','pathCount','physicalFiles','scientificBytes','retainedLogBytes']);
  check(Array.isArray(prior.artifacts)&&prior.artifacts.length<=512,'bounded prior context');
  const sources=[],identities={};
  for(const a of prior.artifacts){keys(a,['path','sha256','bytes','identity','classification']);
    sources.push({path:a.path,sha256:a.sha256,bytes:a.bytes});check(!Object.hasOwn(identities,a.path),'duplicate prior context artifact');identities[a.path]=a.identity;}
  // Recalculate only from the immutable captured facts, never replacement files
  // or caller-supplied totals. The operational context itself remains unchanged.
  check(equal(derivePriorContext(plan,sources,identities),prior),'prior context differs from exact derived artifacts');
  const inodes=new Set();
  for(const a of prior.artifacts){live();const st=lstatSync(a.path,{bigint:true});
    check(st.isFile()&&!st.isSymbolicLink()&&realpathSync(a.path)===a.path&&identity(st)===a.identity,'original prior artifact changed/replaced');
    inodes.add(a.identity.split(':').slice(0,2).join(':'));
  }
  check(current.files.every(f=>!inodes.has(f.inode)),'current output aliases prior artifact');
  const scientificBytes=current.scientificBytes+prior.scientificBytes,retainedLogBytes=current.retainedLogBytes+prior.retainedLogBytes,
    logBytes=current.logBytes+prior.retainedLogBytes,combinedOutputPaths=current.files.length+prior.pathCount,combinedPhysicalFiles=current.physicalFiles+prior.physicalFiles;
  check(combinedOutputPaths<=LIMITS.outputFiles&&scientificBytes<=LIMITS.scientificBytes&&logBytes<=LIMITS.combinedLogBytes,'combined prior/current path or byte limit');
  live();return {...current,priorArtifacts:prior,currentScientificBytes:current.scientificBytes,currentRetainedLogBytes:current.retainedLogBytes,currentLogBytes:current.logBytes,
    scientificBytes,retainedLogBytes,logBytes,combinedOutputPaths,combinedPhysicalFiles};
}

export function outputCensus(plan,observed=new Map(),priorContext=undefined){
  check(plan.schema!=='braid-program/f6c-bounded-operation-plan.v2'||priorContext!==undefined,'v2 requires captured prior context');
  const current=censusOutputs(plan,observed);
  if(priorContext!==undefined)return applyPriorContext(plan,current,priorContext);
  const {retainedLogBytes,...result}=current;return result;
}

function censusOutputs(plan,observed,{live=()=>{},logPaths,streamOwner=null,retractedAlias=null,outwardBytes=0}={}){
  live();const files=[],directories=[],logs=new Set(logPaths??['launcher-stderr.log','resource-observations.ndjson',...plan.stages.flatMap(s=>['runner-stdout.log','runner-stderr.log'].map(n=>'stages/'+s.id+'/'+n))].map(n=>path.join(plan.operationDirectory,n)));
  const walk=directory=>{
    if(!existsSync(directory))return;
    const ds=lstatSync(directory,{bigint:true});check(ds.isDirectory()&&realpathSync(directory)===directory,'output directory alias/type');const inode=[ds.dev,ds.ino].join(':');
    check(!observed.has('directory:'+directory)||observed.get('directory:'+directory)===inode,'owned directory replaced');observed.set('directory:'+directory,inode);directories.push({path:directory,inode});check(directories.length<=512,'output directory bound');
    for(const name of readdirSync(directory)){live();const p=path.join(directory,name),s=lstatSync(p,{bigint:true});check(!s.isSymbolicLink(),'output symlink');if(s.isDirectory()){walk(p);continue;}check(s.isFile(),'regular output required');check(files.length<LIMITS.outputFiles,'output file count');
      const inode=[s.dev,s.ino].join(':');check(!observed.has(p)||observed.get(p)===inode,'owned output replaced');observed.set(p,inode);
      files.push({path:p,inode,bytes:Number(s.size),identity:identity(s),classification:logs.has(p)?'log':'scientific'});
    }
  };
  for(const d of [plan.operationDirectory,...plan.outputDirectories])walk(d);
  const current=new Set([...files.map(f=>f.path),...directories.map(d=>'directory:'+d.path)]);for(const p of observed.keys())check(current.has(p)||(retractedAlias?.removed===true&&p===retractedAlias.publicPath),'owned output disappeared');
  const groups=new Map();for(const f of files){if(!groups.has(f.inode))groups.set(f.inode,[]);groups.get(f.inode).push(f);}
  let scientificBytes=0,logBytes=outwardBytes,retainedLogBytes=0;
  for(const group of groups.values()){
    const first=group[0];check(group.every(f=>f.bytes===first.bytes&&f.classification===first.classification),'output alias differs');
    if(group.length>1){
      const ordinary=group.length===2&&plan.publicationAliases.some(a=>group.some(f=>f.path===a.publicPath)&&group.some(f=>f.path!==a.publicPath&&path.dirname(f.path)===a.privateDirectory&&path.basename(f.path).startsWith(a.privatePrefix)&&/^[a-f0-9]{32}$/u.test(path.basename(f.path).slice(a.privatePrefix.length))));
      const streamed=streamOwner&&group.length===2&&group.some(f=>f.path===streamOwner.publicPath)&&group.some(f=>f.path===streamOwner.privatePath)&&first.inode===streamOwner.dev+':'+streamOwner.ino;
      check(ordinary||streamed,'undeclared output hardlink alias');
    }
    if(first.classification==='log'){logBytes+=first.bytes;retainedLogBytes+=first.bytes;}else scientificBytes+=first.bytes;
  }
  check(scientificBytes<=LIMITS.scientificBytes&&logBytes<=LIMITS.combinedLogBytes,'aggregate scientific/log byte limit');
  live();return {files,directories,scientificBytes,retainedLogBytes,logBytes,physicalFiles:groups.size};
}

export function captureOutputs(census,live=()=>{}){
  return census.files.map(f=>{const captured=readBound(f.path,undefined,false,f.classification==='log'?LIMITS.combinedLogBytes:LIMITS.scientificBytes,live);check(captured.bytes===f.bytes&&captured.identity===f.identity,'final output hash/identity capture changed');return captured;});
}

export function checkOutputs(bindings,live=()=>{}){
  for(const b of bindings){const now=readBound(b.path,b.sha256,false,LIMITS.scientificBytes,live);check(now.bytes===b.bytes&&now.identity===b.identity,'final output binding changed');}
}

export function writeNew(filename,value,live=()=>{},includeIdentity=false){
  check(typeof includeIdentity==='boolean','exact Boolean publication identity option');
  const raw=Buffer.from(JSON.stringify(value)+'\n');check(raw.length<=LIMITS.scientificBytes,'bounded operation receipt');
  absolute(filename);check(realpathSync(path.dirname(filename))===path.dirname(filename),'receipt directory symlink');
  const parent=lstatSync(path.dirname(filename),{bigint:true}),fd=openSync(filename,'wx',0o600);let created,completed;
  const same=()=>{const now=lstatSync(filename,{bigint:true}),dir=lstatSync(path.dirname(filename),{bigint:true});check(now.dev===created.dev&&now.ino===created.ino&&!now.isSymbolicLink()&&dir.dev===parent.dev&&dir.ino===parent.ino&&realpathSync(filename)===filename,'created receipt replaced');};
  try{created=fstatSync(fd,{bigint:true});let at=0;while(at<raw.length){live();same();const n=writeSync(fd,raw,at,Math.min(65536,raw.length-at));check(n>0,'receipt write stalled');at+=n;}fsyncSync(fd);same();completed=identity(fstatSync(fd,{bigint:true}));}finally{closeSync(fd);}
  const d=openSync(path.dirname(filename),constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{fsyncSync(d);}finally{closeSync(d);}
  const result=readBound(filename,sha(raw),false,LIMITS.scientificBytes,live);same();check(result.identity===completed,'receipt changed at publication');return includeIdentity?{...clean(result),identity:completed}:clean(result);
}

export async function pureHook(operation){
  // Worker-local restrictions prevent accidental child creation in metadata
  // hooks. Frozen source review and the final owned-process census are separate
  // obligations; these guards are not an adversarial JavaScript sandbox.
  const forbidden=new Set(['child_process','worker_threads','cluster']);
  const guard=registerHooks({resolve(specifier,context,next){check(!forbidden.has(specifier.replace(/^node:/u,'')),'file hook cannot create processes/workers');return next(specifier,context);}});
  const originalBinding=process.binding,originalBuiltin=process.getBuiltinModule,originalDlopen=process.dlopen;
  process.binding=function(name){check(!['spawn_sync','process_wrap','worker'].includes(name),'file hook low-level spawn denied');return originalBinding.call(process,name);};
  process.getBuiltinModule=function(name){check(!forbidden.has(name.replace(/^node:/u,'')),'file hook process builtin denied');return originalBuiltin.call(process,name);};
  process.dlopen=()=>{throw Error('file hook native loading denied');};
  try{return await operation();}finally{guard.deregister();process.binding=originalBinding;process.getBuiltinModule=originalBuiltin;process.dlopen=originalDlopen;}
}

export async function closeUnexpectedProcesses({lifetime}){
  assertLifetime(lifetime);return cleanupLifetimeProcesses(LIFETIME_STATE.get(lifetime));
}

export async function fileOperation(job){
  const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'original operation deadline');
  live();
  if(job.kind==='capture')return captureUnion(job.sources,job.identities,live);
  if(job.kind==='publish'){
    captureUnion(job.sources,job.identities,live);
    const raw=Buffer.from(JSON.stringify(job.record)+'\n');check(outputCensus(job.plan,new Map(),job.priorContext).scientificBytes+raw.length<=LIMITS.scientificBytes,'receipt plus scientific output limit');
    const result=writeNew(job.filename,job.record,live,true);captureUnion(job.sources,job.identities,live);return result;
  }
  if(job.kind==='hook'){
    captureUnion(job.sources,job.identities,live);
    const c=readBound(job.plan.hookModule.path,job.plan.hookModule.sha256,true,1024**2,live);
    let completion;
    if(job.payload.kind==='admit'){
      binding(job.stdout);check(job.stdout.path===path.join(job.plan.operationDirectory,'stages',job.payload.stageId,'runner-stdout.log'),'exact worker-captured admission stdout');
      completion=readBound(job.stdout.path,job.stdout.sha256,false,LIMITS.combinedLogBytes,live);check(completion.bytes===job.stdout.bytes,'admission stdout byte count');
    }
    const result=await pureHook(async()=>{const hook=await import(url(c.data));check(typeof hook.fileOperation==='function','pure source-bound hook entry');return hook.fileOperation({...job.payload,...(completion?{stdoutLog:clean(completion)}:{}),plan:job.plan,deadlineNanoseconds:job.deadlineNanoseconds});});
    check(result?.accepted===true&&result?.h3EvidenceEligible===false,'hook did not accept bounded operation');
    captureUnion(job.sources,job.identities,live);
    if(completion){checkOutputs([completion],live);check(!Object.hasOwn(result,'completionLog')&&!Object.hasOwn(result,'completionLogIdentity'),'reserved completion binding fields');return {...result,completionLog:clean(completion),completionLogIdentity:completion.identity};}
    return result;
  }
  throw Error('unknown bounded file operation');
}

// PRIVATE SOURCE CANDIDATE: complete-lifetime implementation is not admitted
// until its source, literal controls and actual process closure are reviewed.
const LIVE_LIFETIMES=new WeakSet(),LIFETIME_STATE=new WeakMap();
const STREAMED='scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const DEFAULT_PROFILE=Object.freeze({name:'default',inclusiveMilliseconds:1800000,workMilliseconds:1770000,kWorkMilliseconds:1755000});
const CONTROL_PROFILE=Object.freeze({name:'fixed-control-plan',inclusiveMilliseconds:120000,workMilliseconds:90000,kWorkMilliseconds:75000});
const LOCK_PATH='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock';
const WHOLE_GUARD_SOURCE=String.raw`const{parentPort,workerData}=require('node:worker_threads');
const p=workerData.owner,w=BigInt(workerData.work),e=BigInt(workerData.end);
if(!Number.isSafeInteger(p)||p<=1||!(w<e))throw Error('invalid self guard');
let requested=false;
function tick(){const n=process.hrtime.bigint();if(n>=e){process.kill(p,'SIGKILL');return;}
 if(n>=w&&!requested){requested=true;process.kill(p,'SIGTERM');}
 const next=requested?e:w;setTimeout(tick,Math.max(1,Math.min(100,Number((next-n)/1000000n))));}
parentPort.postMessage({kind:'whole-guard-ready',owner:p,work:workerData.work,end:workerData.end});tick();`;

export function assertLifetime(lifetime){
  check(LIVE_LIFETIMES.has(lifetime),'actual canonical C-owned live capability required');
  const s=LIFETIME_STATE.get(lifetime);
  check(s&&s.guardReady&&!s.guardExited&&!s.finished&&s.self,'inactive/unbound whole-attempt guard');
  s.live('cleanup');return lifetime;
}

function makeLifetime(began,deadlineNanoseconds,control=false){
  check(typeof control==='boolean','fixed internal budget selection');
  const profile=control?CONTROL_PROFILE:DEFAULT_PROFILE;
  const root=path.resolve(process.cwd()),workEnd=began+profile.workMilliseconds,end=began+profile.inclusiveMilliseconds,kWorkEnd=began+profile.kWorkMilliseconds;
  const abort=new AbortController(),pending=new Set(),probeRecords=[],known=new Map(),owners=new Map();
  const sourceMap=new Map(),sourceIdentities={},observed=new Map(),hosts=[],samples=[],signals=[];
  const rss={beganMs:began,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0};
  const s={root,began,deadlineNanoseconds,profile,workEnd,end,kWorkEnd,abort,pending,probeRecords,known,owners,
    sourceMap,sourceIdentities,observed,hosts,samples,signals,rss,guardReady:false,guardExited:false,
    guardTerminating:false,finished:false,failure:null,ambiguity:null,activeK:false,phase:'work',
    logBytes:0,wireBytes:0,outwardStderrBytes:0,stderrPending:0,stderrFailure:null,layout:null,lock:null,lockReleased:false,workerStarts:0,workerClosureFailures:[],registeredStarts:0};
  const live=(phase='work')=>{
    check(['work','cleanup'].includes(phase),'finite lifetime phase');
    check(!s.guardExited&&!s.finished,'no action after whole guard exit');
    const now=performance.now(),cutoff=phase==='cleanup'?Math.min(end,s.activeK?workEnd:Infinity):Math.min(workEnd,s.activeK?kWorkEnd:Infinity);
    check(now<cutoff&&process.hrtime.bigint()<BigInt(deadlineNanoseconds),'original whole/nested deadline');
    if(phase==='work')check(!s.failure&&!abort.signal.aborted,s.failure?.message??'attempt interrupted');
  };
  const remainingMs=(phase='work',maximum=Infinity,context=null)=>{
    live(phase);let cutoff=phase==='cleanup'?Math.min(end,s.activeK?workEnd:Infinity):Math.min(workEnd,s.activeK?kWorkEnd:Infinity);
    if(context){
      check(typeof context.cleanup==='boolean'&&Number.isFinite(context.remainingMs)&&context.remainingMs>0&&
        context.originalDeadlineMs===workEnd&&context.workDeadlineMs===kWorkEnd,'exact K inspection context');
      cutoff=Math.min(cutoff,context.cleanup?context.originalDeadlineMs:context.workDeadlineMs);
      maximum=Math.min(maximum,context.remainingMs);
    }
    const n=Math.floor(Math.min(maximum,cutoff-performance.now(),Number(BigInt(deadlineNanoseconds)-process.hrtime.bigint())/1e6));
    check(n>0,'no original remaining allowance');return n;
  };
  const boundedEvidence=value=>{
    let raw;try{raw=JSON.stringify(value);}catch{return{complete:false,reason:'evidence serialization failed'};}
    if(Buffer.byteLength(raw)>950*1024)return{complete:false,truncated:true,reason:'bounded evidence exceeded',rows:[]};
    return JSON.parse(raw);
  };
  const fail=error=>{
    const e=error instanceof Error?error:Error(String(error));
    if(e.ambiguousGroup&&!s.ambiguity)s.ambiguity=boundedEvidence(e.ambiguousGroup);
    if(!s.failure){s.failure=e;s.phase='cleanup';s.firstFailure={message:String(e.message).slice(0,4096),elapsedMilliseconds:performance.now()-began,
      evidence:boundedEvidence(e.ambiguousGroup??{rows:s.lastRows??[],complete:true})};abort.abort(e);
      if(s.activeK)process.emit('SIGTERM');}
  };
  const track=p=>{pending.add(p);p.then(()=>pending.delete(p),()=>pending.delete(p));return p;};
  const bounded=async(start,label,phase='work',maximum=Infinity,context=null)=>{
    const ms=remainingMs(phase,maximum,context);let timer;
    const actual=track(Promise.resolve().then(()=>{live(phase);return start();}));
    try{const value=await Promise.race([actual,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error(label+' exceeded original allowance')),ms);})]);live(phase);return value;}
    finally{clearTimeout(timer);}
  };
  const interrupt=()=>fail(Error('whole-attempt interruption'));
  process.on('SIGTERM',interrupt);process.on('SIGINT',interrupt);
  // The hrtime observation precedes performance; downward rounding cannot
  // extend either original cutoff across the independent monotonic epochs.
  const bridgeHr=process.hrtime.bigint(),bridgePerformance=performance.now();
  const workNs=bridgeHr+BigInt(Math.floor((workEnd-bridgePerformance)*1e6));
  const computedEnd=bridgeHr+BigInt(Math.floor((end-bridgePerformance)*1e6));
  const endNs=computedEnd<BigInt(deadlineNanoseconds)?computedEnd:BigInt(deadlineNanoseconds);
  check(workNs>bridgeHr&&endNs>workNs,'guard starts before original work cutoff');
  s.guardRecord={sourceSha256:sha(WHOLE_GUARD_SOURCE),owner:process.pid,bridgeHrNanoseconds:String(bridgeHr),
    budgetProfile:profile.name,activeInclusiveMilliseconds:profile.inclusiveMilliseconds,bridgePerformanceMilliseconds:bridgePerformance,workNanoseconds:String(workNs),endNanoseconds:String(endNs),
    interpreterAndStaticLoadingIncluded:false};
  const guard=new Worker(WHOLE_GUARD_SOURCE,{eval:true,execArgv:[],workerData:{owner:process.pid,work:String(workNs),end:String(endNs)}});
  s.guard=guard;
  const guardExit=new Promise(resolve=>guard.once('exit',code=>{s.guardExited=true;s.guardRecord.exit={code,at:performance.now()};
    if(!s.guardTerminating){
      // A departed guard protects no subsequent cleanup. This path is local
      // state plus self exit only: no fail()/abort callbacks or external action.
      s.failure??=Error('whole guard exited prematurely');s.phase='cleanup';s.unexpectedGuardExit=true;
      s.firstFailure??={message:'whole guard exited prematurely',elapsedMilliseconds:performance.now()-began,evidence:{guardExit:code,ordinaryClosureUnverified:true}};
      process.exit(125);return;
    }
    resolve(code);}));
  guard.on('error',fail);
  const ready=new Promise((resolve,reject)=>{
    guard.once('error',reject);guard.once('exit',()=>{if(!s.guardReady)reject(Error('whole guard closed before ready'));});
    guard.once('message',m=>{try{check(equal(m,{kind:'whole-guard-ready',owner:process.pid,work:String(workNs),end:String(endNs)}),'exact armed whole guard acknowledgment');
      live();s.guardReady=true;s.guardRecord.readyAt=performance.now();resolve();}catch(e){fail(e);reject(e);}});
  });
  Object.assign(s,{live,remainingMs,bounded,track,fail,guardExit,interrupt,boundedEvidence});
  const capability=Object.freeze({began,deadlineNanoseconds,
    get coordinator(){return s.self?Object.freeze({...clean(s.self),identity:s.self.identity}):null;},
    signal:abort.signal,live,remainingMs,fail,
    startStreamed:options=>startStreamedLifetime(s,options),
    bindSources:options=>bindLifetimeSources(s,options),
    fileWorker:(job,bytes,options={})=>lifetimeFileWorker(s,job,bytes,options),
    runRegistered:options=>lifetimeRegistered(s,options),
    checkpoint:options=>lifetimeCheckpoint(s,options),
    log:value=>lifetimeLog(s,value),
    finish:options=>finishLifetime(s,options),reject:error=>rejectLifetime(s,error)});
  s.capability=capability;LIVE_LIFETIMES.add(capability);LIFETIME_STATE.set(capability,s);
  s.ready=()=>bounded(()=>ready,'whole guard readiness','work',1000);return s;
}

function bindLifetimeSources(s,{sources,identities={}}){
  s.live();check(Array.isArray(sources)&&identities&&Object.getPrototypeOf(identities)===Object.prototype,'explicit source union and identity map');
  const merged=sourceUnion([...s.sourceMap.values(),...sources]),ids={...s.sourceIdentities};
  for(const [p,i]of Object.entries(identities)){const b=merged.find(b=>b.path===p);check(b,'unused original identity');validatePublicationIdentity(i,b.bytes);check(!Object.hasOwn(ids,p)||ids[p]===i,'original source identity cannot change');ids[p]=i;}
  const captured=captureUnion(merged,ids,()=>s.live());
  for(const b of captured.sources){s.sourceMap.set(b.path,b);s.sourceIdentities[b.path]=captured.identities[b.path];}
  return{sources:captured.sources,identities:{...s.sourceIdentities}};
}

function lifetimeCensus(s){
  s.live(s.phase);if(!s.layout){const current={files:[],directories:[],scientificBytes:0,retainedLogBytes:0,logBytes:s.outwardStderrBytes+s.wireBytes,physicalFiles:0};
    return s.priorContext?applyPriorContext(s.plan,current,s.priorContext,()=>s.live(s.phase)):current;}
  if(s.modePoll){const value=s.modePoll();check(value&&typeof value.then!=='function','synchronous reviewed layout check required');
    if(value.owner){check(!s.streamOwner||equal(s.streamOwner,value.owner),'original stream owner changed');check(!s.streamLayout||equal(s.streamLayout,value.layout),'original stream layout changed');s.streamOwner??=structuredClone(value.owner);s.streamLayout??=structuredClone(value.layout);}
    else check(!s.streamOwner,'original private stream disappeared');s.live(s.phase);}
  const current=censusOutputs(s.layout,s.observed,{live:()=>s.live(s.phase),logPaths:s.logPaths,
    streamOwner:s.mode==='streamed'?s.streamOwner:null,retractedAlias:s.retractedAlias,outwardBytes:s.wireBytes+s.outwardStderrBytes});
  return s.priorContext?applyPriorContext(s.plan,current,s.priorContext,()=>s.live(s.phase)):current;
}

function lifetimeLog(s,value){
  s.live(s.phase);const raw=Buffer.from((typeof value==='string'?value:JSON.stringify(value))+'\n');
  check(raw.length<=1048576,'bounded operational message');
  check(lifetimeCensus(s).logBytes+raw.length*(s.logFD!==undefined?2:1)<=LIMITS.combinedLogBytes,'retained plus outward mirror allowance before either copy');
  if(s.logFD!==undefined)appendLifetimeLog(s,s.logFD,raw,s.logTotal);
  s.diagnostics.write(raw);
  s.live(s.phase);
}

function appendLifetimeLog(s,fd,raw,total){
  s.live(s.phase);check(raw.length<=1048576&&lifetimeCensus(s).logBytes+raw.length<=LIMITS.combinedLogBytes,'joint log allowance before write');
  const before=fstatSync(fd,{bigint:true});check(s.observed.get(fd===s.logFD?s.logPath:s.rssPath)===[before.dev,before.ino].join(':'),'original log descriptor');
  s.H.boundedLogAppend(fd,raw,total);s.live(s.phase);lifetimeCensus(s);
}

function installLifetimeStderr(s){
  check(!s.stderrOriginal,'one scoped stderr observer');const stream=process.stderr,original=stream.write;
  s.stderrOriginal=original;
  const wrapped=function(chunk,encoding,callback){
    check(this===stream,'fixed coordinator stderr channel');
    if(typeof encoding==='function'){callback=encoding;encoding=undefined;}
    check(callback===undefined||typeof callback==='function','stderr callback type');
    check(typeof chunk==='string'||Buffer.isBuffer(chunk)||chunk instanceof Uint8Array,'bounded stderr payload type');
    const count=typeof chunk==='string'?Buffer.byteLength(chunk,encoding):chunk.byteLength;
    s.live(s.phase);check(Number.isSafeInteger(count)&&count>=0&&count<=1048576&&lifetimeCensus(s).logBytes+count<=LIMITS.combinedLogBytes,'joint outward stderr allowance');
    s.outwardStderrBytes+=count;s.stderrPending++;let settled=false;
    const complete=error=>{
      if(settled)return;settled=true;s.stderrPending--;
      if(error){s.stderrFailure??=String(error.message);s.fail(error);}
      try{s.live(s.phase);}catch(e){s.stderrFailure??=String(e.message);s.fail(e);}
      if(callback)try{callback(error);}catch(e){s.stderrFailure??=String(e.message);s.fail(e);}
      try{s.live(s.phase);}catch(e){s.stderrFailure??=String(e.message);s.fail(e);}
    };
    let accepted;
    try{accepted=original.call(stream,chunk,encoding,complete);}
    catch(e){s.stderrFailure??=String(e.message);s.fail(e);throw e;}
    // A post-write failure does not complete an outstanding actual callback.
    s.live(s.phase);return accepted;
  };
  s.stderrWrapper=wrapped;stream.write=wrapped;
}

function restoreLifetimeStderr(s){
  check(s.stderrPending===0&&!s.stderrFailure,'actual outward stderr callbacks unresolved');
  if(s.stderrOriginal){check(process.stderr.write===s.stderrWrapper,'scoped stderr observer replaced');process.stderr.write=s.stderrOriginal;s.stderrOriginal=null;}
}

function ownedLifetimeRows(s,table){
  check(table.some(r=>r.pid===process.pid),'whole owner absent from complete table');
  try{
    for(const owner of s.owners.values())s.outer.currentOwnedGroup(table,owner);
    for(const old of s.known.values()){
      const row=table.find(r=>r.pid===old.pid);
      if(row&&(row.started!==old.started||row.pgid!==old.pgid)){const e=Error('retained descendant changed identity');e.ambiguousGroup={original:old,rows:[row],complete:true};throw e;}
    }
    const rooted=s.outer.descendantRecords(table,process.pid,[]),extra=[];
    for(const row of rooted)if(row.pid!==process.pid&&row.pid===row.pgid&&!s.owners.has(row.pgid))s.owners.set(row.pgid,{identity:{...row},knownMembers:[{...row}],retired:false});
    for(const owner of s.owners.values())extra.push(...s.outer.currentOwnedGroup(table,owner));
    const selected=new Map([...rooted,...extra,...table.filter(r=>s.known.has(r.pid)&&s.known.get(r.pid).started===r.started&&s.known.get(r.pid).pgid===r.pgid)].map(r=>[r.pid,r]));
    let changed;do{changed=false;for(const r of table)if(!selected.has(r.pid)&&selected.has(r.ppid)){selected.set(r.pid,r);changed=true;}}while(changed);
    for(const row of selected.values())if(row.pid!==process.pid)s.known.set(row.pid,{...row});
    check(s.known.size<=4096,'bounded retained process identities');return[...selected.values()];
  }catch(e){s.fail(e);throw e;}
}

function lifetimeSample(s,table,started){
  const rows=ownedLifetimeRows(s,table),now=performance.now();
  s.lastRows=rows;
  for(const probe of s.probeRecords){const row=table.find(r=>r.pid===probe.pid&&r.ppid===process.pid);if(row&&!probe.birth)probe.birth={...row};}
  let value;
  try{value=s.H.acceptRSS(s.rss,rows,now,started);}catch(e){s.fail(e);value={resourceFailure:String(e.message),processes:rows};}
  const record={kind:'aggregate-rss',elapsedSeconds:(now-s.began)/1000,...value};
  if(s.rssFD!==undefined)appendLifetimeLog(s,s.rssFD,Buffer.from(JSON.stringify(record)+'\n'),s.rssTotal);
  check(s.samples.length<8192,'bounded RSS receipt history');s.samples.push({elapsedSeconds:record.elapsedSeconds,aggregateResidentBytes:value.aggregateResidentBytes??null,resourceFailure:value.resourceFailure??null});
  return rows;
}

async function lifetimeProbe(s,command,args,maximum,maxBytes,phase=s.phase,context=null){
  s.live(phase);const binding=s.sourceMap.get(command);check(binding,'observer command not in exact source union');
  const current=readBound(command,binding.sha256,false,LIMITS.sourceBytes,()=>s.live(phase));check(current.bytes===binding.bytes&&current.identity===s.sourceIdentities[command],'original observer executable changed');
  const duration=s.remainingMs(phase,maximum,context),started=performance.now();
  const record={command,args:[...args],startedMilliseconds:started,deadlineMilliseconds:started+duration,closed:false,stdoutBytes:0,stderrBytes:0,stdoutDroppedBytes:0,stderrDroppedBytes:0};
  check(s.probeRecords.length<16384,'bounded probe count');s.probeRecords.push(record);
  // No timeout/maxBuffer numeric-PID kill fallback. A rejected deadline race
  // leaves the actual close promise pending and its partial evidence retained.
  const child=spawn(command,args,{cwd:s.root,stdio:['ignore','pipe','pipe'],env:{...process.env,LC_ALL:'C'}});record.pid=child.pid;
  let stdout='',stderr='',streamError;const parts={stdout:[],stderr:[]};
  const data=(which,raw)=>{const count=which+'Bytes',dropped=which+'DroppedBytes';record[count]+=raw.length;let appended=false;
    try{s.live('cleanup');if(record[count]>maxBytes){record[dropped]+=raw.length;s.fail(Error('observer byte cap'));return;}
      check(parts[which].length<4096,'bounded observer buffer chunk count');parts[which].push(Buffer.from(raw));appended=true;s.live('cleanup');
      // Sticky work failure is reported only after bounded available evidence
      // has been retained; it cannot suppress a valid cleanup observation.
      if(phase==='work')try{s.live('work');}catch(e){s.fail(e);}
    }catch(e){if(!appended)record[dropped]+=raw.length;s.fail(e);}};
  child.stdout.on('data',raw=>data('stdout',raw));child.stderr.on('data',raw=>data('stderr',raw));
  child.stdout.on('error',e=>{streamError=e;s.fail(e);});child.stderr.on('error',e=>{streamError=e;s.fail(e);});
  const actual=s.track(new Promise((resolve,reject)=>{
    child.once('error',e=>{record.spawnError=String(e.message);streamError=e;s.fail(e);});
    child.once('close',(code,signal)=>{record.closed=true;record.exit={code,signal};record.closedMilliseconds=performance.now();
      try{s.live('cleanup');}catch(e){record.rawFailure={complete:false,reason:'close arrived after applicable original deadline',availableBufferedBytes:parts.stdout.reduce((n,b)=>n+b.length,0)+parts.stderr.reduce((n,b)=>n+b.length,0)};s.fail(e);reject(e);return;}
      const stdoutRaw=Buffer.concat(parts.stdout),stderrRaw=Buffer.concat(parts.stderr);
      record.stdoutSha256=sha(stdoutRaw);record.stderrSha256=sha(stderrRaw);record.hashScope='exact retained raw buffer; dropped bytes excluded';
      record.stdoutRetainedBytes=stdoutRaw.length;record.stderrRetainedBytes=stderrRaw.length;
      const retainedFailure=reason=>({stdoutBase64:stdoutRaw.subarray(0,4096).toString('base64'),stderrBase64:stderrRaw.subarray(0,4096).toString('base64'),reason,
        complete:record.stdoutDroppedBytes===0&&record.stderrDroppedBytes===0&&stdoutRaw.length<=4096&&stderrRaw.length<=4096});
      record.rawFailure=code===0&&!signal&&!streamError?null:retainedFailure('observer exit/stream failure');
      let table;
      try{s.live('cleanup');check(code===0&&signal===null&&!streamError&&!record.stdoutDroppedBytes&&!record.stderrDroppedBytes,'observer failed/incomplete');
        stdout=new TextDecoder('utf-8',{fatal:true}).decode(stdoutRaw);stderr=new TextDecoder('utf-8',{fatal:true}).decode(stderrRaw);
        if(command==='/bin/ps'){
          table=s.H.parseObservation(stdout);check(table.length>0&&table.length<=65536,'complete bounded process rows');
          lifetimeSample(s,table,started);record.validTableObserved=true;
        }
      }catch(e){record.rawFailure??=retainedFailure(String(e.message));s.fail(e);streamError??=e;}
      try{if(s.rssFD!==undefined)appendLifetimeLog(s,s.rssFD,Buffer.from(JSON.stringify({kind:'observer-process-close',...record})+'\n'),s.rssTotal);
        s.live('cleanup');check(!streamError,'observer closed with invalid/incomplete evidence');resolve({text:stdout,stderr,pid:child.pid,started,record,table});}catch(e){s.fail(e);reject(e);}});
  }));
  return s.bounded(()=>actual,'observer close',phase,duration,context);
}

async function lifetimeTable(s,phase=s.phase,context=null){
  const result=await lifetimeProbe(s,'/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,args='],500,8*1024**2,phase,context);
  check(Array.isArray(result.table)&&result.record.validTableObserved,'actual complete table observation required');s.live(phase);return result.table;
}

async function lifetimeHost(s,launch){
  const result=await lifetimeProbe(s,'/usr/bin/memory_pressure',[],2000,1048576,s.phase);
  const record={elapsedSeconds:(performance.now()-s.began)/1000,atLaunch:launch,stdout:result.text};s.hosts.push(record);
  try{s.live(s.phase);const disk=statfsSync(s.root,{bigint:true});s.live(s.phase);Object.assign(record,s.H.parseHostResource(result.text,disk.bavail*disk.bsize,launch));}catch(e){record.failure=String(e.message);s.fail(e);throw e;}
  lifetimeLog(s,{kind:'host-resource',...record});return record;
}

async function initializeLifetime(s,selfSha){
  s.live();hashToken(selfSha);check(realpathSync(s.root)===s.root&&import.meta.url===pathToFileURL(path.join(s.root,SELF)).href,'one canonical file-C owner');
  s.self=readBound(path.join(s.root,SELF),selfSha,true,1048576,()=>s.live());
  s.deps=Object.fromEntries(Object.entries(PINS).map(([k,[p,h]])=>[k,readBound(path.join(s.root,p),h,true,1048576,()=>s.live())]));
  s.H=await s.bounded(()=>import(url(s.deps.helpers.data)),'captured helper import');
  s.outer=await s.bounded(()=>import(url(s.deps.outer.data)),'captured K import');
  s.D=await s.bounded(()=>import(url(s.deps.diagnostics.data)),'captured diagnostics import');
  installLifetimeStderr(s);s.diagnostics=s.D.diagnosticGuard();s.diagnostics.bind(s.fail);
  const captured=[s.self,...Object.values(s.deps)];bindLifetimeSources(s,{sources:captured.map(clean),identities:originalIdentities(captured)});
}

async function startLifetimeAccounting(s,layout){
  s.live();check(!s.layout,'one output layout per whole attempt');
  for(const p of[layout.operationDirectory,...layout.outputDirectories])check(!existsSync(p)&&realpathSync(path.dirname(p))===path.dirname(p),'fresh canonical output directory');
  for(const p of['/bin/ps','/usr/bin/memory_pressure',realpathSync(process.execPath)])check(s.sourceMap.has(p),'bound observer/runtime required before observation');
  const before=lifetimeCensus(s);check((before.combinedOutputPaths??before.files.length)+2<=LIMITS.outputFiles,'two initial log paths fit combined allowance');
  s.layout=layout;mkdirSync(layout.operationDirectory,{mode:0o700});
  const dir=lstatSync(layout.operationDirectory,{bigint:true});s.observed.set('directory:'+layout.operationDirectory,[dir.dev,dir.ino].join(':'));
  s.logTotal={bytes:0};s.rssTotal={bytes:0};
  const openLog=name=>{const p=path.join(layout.operationDirectory,name),fd=openSync(p,'wx',0o600);
    try{const st=fstatSync(fd,{bigint:true});s.observed.set(p,[st.dev,st.ino].join(':'));return fd;}catch(e){closeSync(fd);throw e;}};
  s.logPath=path.join(layout.operationDirectory,'launcher-stderr.log');s.rssPath=path.join(layout.operationDirectory,'resource-observations.ndjson');
  s.logFD=openLog('launcher-stderr.log');s.rssFD=openLog('resource-observations.ndjson');
  s.originalError=console.error;console.error=(...items)=>{try{lifetimeLog(s,items.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' '));}catch(e){s.fail(e);}};
  const table=await lifetimeTable(s);noCompetitor(table,process.pid);
  const lockPath=path.join(s.root,LOCK_PATH),parent=readDirectoryIdentity(path.dirname(lockPath));
  const selfRow=table.find(r=>r.pid===process.pid);check(Number.isSafeInteger(selfRow?.pid)&&selfRow.pid>0&&typeof selfRow.started==='string','original lock self birth');
  s.lockReservation={path:lockPath,parent,self:{pid:selfRow.pid,started:selfRow.started},status:'pending'};
  try{
    s.live();const reserved=writeNew(lockPath,{pid:selfRow.pid,started:selfRow.started},()=>s.live(),true);
    keys(reserved,['path','sha256','bytes','identity']);validatePublicationIdentity(reserved.identity,reserved.bytes);
    s.lock={...reserved,parent};s.lockReservation.status='complete';
  }catch(e){s.lockReservation.status=e.code==='EEXIST'?'occupied-unowned':'failed-original-unresolved';throw e;}
  check(equal(readDirectoryIdentity(parent.path),parent),'original lock parent changed during reserve');
  s.nextHost=performance.now()+15000;
  s.timer=setInterval(()=>{
    try{s.live(s.phase);
      if(s.rss.lastSampleStartedMs===undefined||performance.now()-s.rss.lastSampleStartedMs>1000)s.fail(Error('lost whole-attempt observation'));
      // A failed gap is sticky, but does not suppress fresh valid cleanup data.
      s.live(s.phase);
      if(!s.rssJob)s.rssJob=lifetimeTable(s,s.phase).catch(s.fail).finally(()=>{s.rssJob=null;});
      if(performance.now()>=s.nextHost&&!s.hostJob){s.nextHost=performance.now()+15000;s.hostJob=lifetimeHost(s,false).catch(s.fail).finally(()=>{s.hostJob=null;});lifetimeLog(s,{kind:'whole-attempt-heartbeat',elapsedSeconds:(performance.now()-s.began)/1000,accepted:false});}
      lifetimeCensus(s);
    }catch(e){s.fail(e);}
  },250);
  await lifetimeHost(s,true);s.live();
}

function readDirectoryIdentity(p){const st=lstatSync(p,{bigint:true});check(st.isDirectory()&&realpathSync(p)===p,'canonical original directory');return{path:p,device:String(st.dev),inode:String(st.ino)};}

async function startStreamedLifetime(s,{output,operationDirectory,git,poll,failureFinalize}){
  s.live();check(s.mode==='streamed'&&path.dirname(output)===path.join(s.root,'.local-data/braid-analysis/f6c-streamed-leaf-diagnostic-20260827')&&operationDirectory===output+'-outer','fixed streamed output lane');
  check(typeof poll==='function'&&typeof failureFinalize==='function','reviewed mode callbacks required');
  check(typeof git==='string'&&s.sourceMap.has(git),'exact bound git role required');
  s.modePoll=poll;s.failureFinalize=failureFinalize;s.streamOutput=output;
  s.logPaths=['launcher-stderr.log','resource-observations.ndjson','rejection.json','process/runner-stdout.log','process/runner-stderr.log'].map(n=>path.join(operationDirectory,n));
  await startLifetimeAccounting(s,{operationDirectory,outputDirectories:[output],publicationAliases:[],stages:[]});
  for(const target of[output,operationDirectory])await lifetimeProbe(s,git,['check-ignore','-q','--',path.relative(s.root,target)],2000,4096);
}

function validatePublicationIdentity(token,bytes){
  check(typeof token==='string'&&/^(?:0|[1-9][0-9]*)(?::(?:0|[1-9][0-9]*)){4}$/u.test(token)&&token.split(':')[2]===String(bytes),'original canonical five-field publication identity');
}

function capturedOutputIdentities(outputs){
  check(Array.isArray(outputs)&&outputs.length<=LIMITS.outputFiles,'bounded captured output identities');const result={};
  for(const output of outputs){
    keys(output,['path','sha256','bytes','identity']);absolute(output.path);hashToken(output.sha256);
    check(Number.isSafeInteger(output.bytes)&&output.bytes>=0&&output.bytes<=LIMITS.scientificBytes,'nonnegative captured output bytes');
    validatePublicationIdentity(output.identity,output.bytes);check(!Object.hasOwn(result,output.path),'duplicate captured output path');result[output.path]=output.identity;
  }
  return result;
}

function rememberPublication(s,result){
  // Pure validation and original-identity insertion precede every callback,
  // await and pathname observation at this receiving boundary.
  keys(result,['path','sha256','bytes','identity']);const b=binding(clean(result));validatePublicationIdentity(result.identity,b.bytes);
  const merged=sourceUnion([...s.sourceMap.values(),b]);
  check(!s.sourceIdentities[b.path]||s.sourceIdentities[b.path]===result.identity,'original publication identity conflict');
  s.sourceMap.set(b.path,b);s.sourceIdentities[b.path]=result.identity;
  const inode=result.identity.split(':').slice(0,2).join(':');
  check(!s.observed.has(b.path)||s.observed.get(b.path)===inode,'publication replaced before original identity delivery');s.observed.set(b.path,inode);
  const captured=captureUnion(merged,s.sourceIdentities,()=>s.live());
  check(captured.identities[b.path]===result.identity,'original publication changed');return result;
}

function preflightNewOutput(s,filename,bytes){
  s.live(s.phase);absolute(filename);check(s.layout&&beneath(filename,s.layout.operationDirectory),'fixed operational publication lane');
  check(Number.isSafeInteger(bytes)&&bytes>0&&bytes<=LIMITS.scientificBytes&&!existsSync(filename),'fresh bounded operation output');
  const census=lifetimeCensus(s);check((census.combinedOutputPaths??census.files.length)<LIMITS.outputFiles,'output path allowance before creation');
  const log=s.logPaths.includes(filename);
  check(log?census.logBytes+bytes<=LIMITS.combinedLogBytes:census.scientificBytes+bytes<=LIMITS.scientificBytes,'joint output bytes before creation');
  s.live(s.phase);return census;
}

function lifetimeFileWorker(s,job,bytes,{signal=s.abort.signal}={}){
  s.live();const allowed=s.mode==='streamed'?s.caller:s.self;
  check(allowed&&Buffer.isBuffer(bytes)&&bytes.equals(allowed.data)&&s.sourceMap.get(allowed.path)?.sha256===allowed.sha256,'exact bound active-mode file worker');
  if(job.kind==='publish'){
    check(job.filename===path.join(s.layout.operationDirectory,'operation.json'),'fixed operation publication pathname');
    preflightNewOutput(s,job.filename,Buffer.byteLength(JSON.stringify(job.record)+'\n'));
  }
  const signalBoth=signal===s.abort.signal?signal:AbortSignal.any([signal,s.abort.signal]);
  s.workerStarts++;
  const worker=s.H.runFileWorker({...job,deadlineNanoseconds:s.deadlineNanoseconds,priorContext:s.priorContext},bytes,s.remainingMs(),signalBoth);
  const actual=s.track(worker.then(result=>job.kind==='publish'?rememberPublication(s,result):result,error=>{
    // H does not distinguish a rejected operation from rejected termination.
    // Conservatively retain uncertainty; settled is not a closed-worker proof.
    s.workerClosureFailures.push({kind:job.kind,message:String(error.message).slice(0,4096)});s.fail(error);throw error;
  }));
  return s.bounded(()=>actual,'complete file worker including termination');
}

async function lifetimeRegistered(s,{entry,args,sources,output,admit}){
  s.live();check(!s.activeK&&typeof admit==='function','one serial registered stage');
  const absoluteEntry=path.join(s.root,entry),bound=s.sourceMap.get(absoluteEntry);
  check(bound&&Array.isArray(args)&&Array.isArray(sources)&&sources.length===1&&sources[0].path===entry&&sources[0].sha256===bound.sha256&&Buffer.isBuffer(sources[0].bytes)&&sha(sources[0].bytes)===bound.sha256,'bound registered source');
  if(s.mode==='streamed')check(entry===STREAMED&&equal(args,['--registered',s.streamSpec.path,s.streamSpec.sha256,s.caller.sha256,s.deadlineNanoseconds])&&output===path.join(s.layout.operationDirectory,'process'),'fixed streamed registered command');
  else check(s.activeStage&&s.activeStage.entry.path===absoluteEntry&&equal(args,s.activeStageArgs)&&output===path.join(s.layout.operationDirectory,'stages',s.activeStage.id),'exact active declared serial-plan stage');
  const before=lifetimeCensus(s);check((before.combinedOutputPaths??before.files.length)+2<=LIMITS.outputFiles,'two registered log paths fit combined allowance');
  s.activeK=true;
  s.registeredStarts++;
  try{
    const actual=s.track(s.outer.superviseRegisteredPilot({root:s.root,entry,args,sources,output,admit,
      startedAtMs:s.began,limitMs:s.profile.workMilliseconds,heartbeatMs:15000,
      inspectProcesses:async context=>{
        const phase=context?.cleanup?'cleanup':'work';s.remainingMs(phase,500,context);
        const rows=await lifetimeTable(s,phase,context);s.remainingMs(phase,500,context);return rows.map(({rssBytes,...r})=>r);
      }}));
    actual.then(receipt=>{if(receipt.guardClosed===true)s.activeK=false;else s.kClosureFailure='K guard closure not observed';},error=>{
      if(error.outerReceipt?.guardClosed===true)s.activeK=false;else s.kClosureFailure='Rejected K guard closure unresolved';
    });
    const receipt=await s.bounded(()=>actual,'complete direct K call');
    check(receipt.accepted&&receipt.processesClosed&&receipt.guardClosed===true,'registered target and K guard closure required');s.registeredReceipts??=[];s.registeredReceipts.push(receipt);return receipt;
  }catch(e){if(e.outerReceipt){s.registeredReceipts??=[];s.registeredReceipts.push(e.outerReceipt);}s.fail(e);throw e;}
}

async function lifetimeCheckpoint(s,{host=false}={}){
  s.live();await lifetimeTable(s);if(host)await lifetimeHost(s,false);s.live();
  const census=lifetimeCensus(s);
  return structuredClone({rss:s.rss,hosts:s.hosts,census,sourceBindings:[...s.sourceMap.values()],sourceIdentities:s.sourceIdentities});
}

function ordinaryRows(s,table){
  return ownedLifetimeRows(s,table).filter(r=>r.pid!==process.pid&&!s.probeRecords.some(p=>p.closed&&p.birth&&p.pid===r.pid&&p.birth.started===r.started&&p.birth.pgid===r.pgid));
}

async function signalLifetimeRow(s,expected,name){
  s.live('cleanup');check(!s.ambiguity,'ambiguous ownership cannot authorize signals');
  const table=await lifetimeTable(s,'cleanup'),rows=ordinaryRows(s,table),row=rows.find(r=>r.pid===expected.pid);
  if(!row)return false;
  check(row.started===expected.started&&row.pgid===expected.pgid,'fresh original birth/group required for every signal');
  s.live('cleanup');const record={pid:row.pid,started:row.started,pgid:row.pgid,signal:name,at:performance.now(),sent:false};s.signals.push(record);
  try{process.kill(row.pid,name);record.sent=true;}catch(e){if(e.code!=='ESRCH')throw e;}
  s.live('cleanup');return record.sent;
}

async function cleanupLifetimeProcesses(s){
  s.live('cleanup');check(!s.ambiguity,'sticky ambiguity prevents cleanup authority');
  let rows=ordinaryRows(s,await lifetimeTable(s,'cleanup'));
  for(let pass=0;rows.length;pass++){
    check(pass<8,'bounded unexpected-descendant cleanup did not settle');
    for(const row of rows)await signalLifetimeRow(s,row,'SIGSTOP');
    rows=ordinaryRows(s,await lifetimeTable(s,'cleanup'));
    for(const row of rows){await signalLifetimeRow(s,row,'SIGTERM');await signalLifetimeRow(s,row,'SIGCONT');}
    if(pass>0)for(const row of rows)await signalLifetimeRow(s,row,'SIGKILL');
    await s.bounded(()=>new Promise(resolve=>setTimeout(resolve,Math.min(25,s.remainingMs('cleanup')))),'cleanup observation spacing','cleanup',26);
    rows=ordinaryRows(s,await lifetimeTable(s,'cleanup'));
  }
  return{ordinaryProcessesClosed:true,known:[...s.known.values()]};
}

async function stopLifetimeObservations(s,phase){
  clearInterval(s.timer);s.timer=null;
  for(const p of[s.rssJob,s.hostJob])if(p)await s.bounded(()=>p,'observer job closure',phase);
  const pending=[...s.pending];if(pending.length)await s.bounded(()=>Promise.allSettled(pending),'all original pending callbacks',phase);
  check(s.pending.size===0&&s.probeRecords.every(p=>p.closed)&&s.workerClosureFailures.length===0,'every file worker/probe promise must actually close without unresolved termination');
}

function checkLifetimeLock(s){
  s.live(s.phase);check(s.lock&&!s.lockReleased&&!s.ambiguity,'owned unresolved-free lock required');
  check(equal(readDirectoryIdentity(s.lock.parent.path),s.lock.parent),'original lock parent replaced');
  const current=readBound(s.lock.path,s.lock.sha256,false,4096,()=>s.live(s.phase));
  check(current.bytes===s.lock.bytes&&current.identity===s.lock.identity,'exact original lock bytes/five identities changed');
}

function releaseLifetimeLock(s){
  checkLifetimeLock(s);s.live(s.phase);unlinkSync(s.lock.path);s.lockReleased=true;
  // Release occurred; any later failure must not recreate or claim retention.
  const fd=openSync(s.lock.parent.path,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);
  try{const st=fstatSync(fd,{bigint:true});check(String(st.dev)===s.lock.parent.device&&String(st.ino)===s.lock.parent.inode,'released lock parent changed');fsyncSync(fd);}finally{closeSync(fd);}
  s.live(s.phase);check(!existsSync(s.lock.path),'lock absence changed after exact release');
}

function closeLifetimeLogs(s){
  for(const key of['logFD','rssFD'])if(s[key]!==undefined){const fd=s[key];fsyncSync(fd);closeSync(fd);s[key]=undefined;}
  if(s.originalError){console.error=s.originalError;s.originalError=null;}
}

function checkModeWire(s,wire){
  if(s.mode==='streamed'){
    keys(wire,['mode','operation','outputs','physicalClaims','wholeHistoryMetrics','rootsEvaluated','eomExecuted']);
    check(wire.mode==='streamed-leaf'&&wire.physicalClaims===false&&wire.wholeHistoryMetrics===false&&wire.rootsEvaluated===false&&wire.eomExecuted===false,'closed streamed mode facts');
    binding(wire.operation);check(Array.isArray(wire.outputs)&&wire.outputs.length===1,'one declared stream output');wire.outputs.forEach(binding);
  }else{
    keys(wire,['mode','operation','h3EvidenceEligible','physicalClaims']);check(wire.mode==='serial-plan'&&wire.h3EvidenceEligible===false&&wire.physicalClaims===false,'closed serial mode facts');binding(wire.operation);
  }
}

function probeSummary(s){
  return{count:s.probeRecords.length,closed:s.probeRecords.filter(p=>p.closed).length,
    stdoutBytes:s.probeRecords.reduce((n,p)=>n+p.stdoutBytes,0),stderrBytes:s.probeRecords.reduce((n,p)=>n+p.stderrBytes,0),
    maximumElapsedMilliseconds:s.probeRecords.reduce((n,p)=>Math.max(n,(p.closedMilliseconds??performance.now())-p.startedMilliseconds),0),
    unresolved:s.probeRecords.filter(p=>!p.closed).map(p=>({pid:p.pid??null,birth:p.birth??null,command:p.command,startedMilliseconds:p.startedMilliseconds})),
    completeRecordsPath:s.rssPath??null};
}

async function finishLifetime(s,{wire,finalCheck}){
  s.live();checkModeWire(s,wire);s.publication=wire.operation;check(typeof finalCheck==='function','fixed final source/layout callback');
  const checkMode=()=>{s.live();const value=finalCheck(()=>s.live());check(!value||typeof value.then!=='function','synchronous final check');s.live();};
  try{
    check(!s.activeK&&!s.ambiguity,'ordinary registered work unresolved');
    await stopLifetimeObservations(s,'work');
    const table=await lifetimeTable(s);check(ordinaryRows(s,table).length===0&&!s.ambiguity,'fresh ordinary process absence');
    check(s.pending.size===0&&s.probeRecords.every(p=>p.closed)&&s.workerClosureFailures.length===0,'ordinary probe/worker closure');
    checkMode();captureUnion([...s.sourceMap.values()],s.sourceIdentities,()=>s.live());
    await s.bounded(()=>s.D.drainDiagnostics({began:s.began,lastSampleStartedMs:s.rss.lastSampleStartedMs,clock:()=>{s.live();return performance.now();}}),'diagnostic drain');
    s.diagnostics.check();check(s.stderrPending===0&&!s.stderrFailure,'actual outward stderr callback closure before conditional wire');closeLifetimeLogs(s);
    const census=lifetimeCensus(s),outputs=captureOutputs(census,()=>s.live());
    const finalSources=[...s.sourceMap.values()],finalIdentities={...s.sourceIdentities};
    const terminal=()=>{s.live();s.H.admitFinalObservation(s.rss,performance.now());checkMode();captureUnion(finalSources,finalIdentities,()=>s.live());checkOutputs(outputs,()=>s.live());checkLifetimeLock(s);s.live();s.H.admitFinalObservation(s.rss,performance.now());};
    terminal();
    const result={...wire,accepted:false,completed:false,scope:'conditional-operational-completion',ordinaryProcessesClosed:true,
      workersAndMonitorsClosed:false,lockReleased:false,wholeGuardClosed:false,
      terminalClosure:{status:'pending-external-exit',requiredExitCode:0,lock:'held',wholeGuard:'armed'},failure:null,
      elapsedSeconds:(performance.now()-s.began)/1000,budget:{profile:s.profile.name,activeInclusiveMilliseconds:s.profile.inclusiveMilliseconds,beganMilliseconds:s.began,kWorkEndMilliseconds:s.kWorkEnd,workEndMilliseconds:s.workEnd,endMilliseconds:s.end,originalNodeDeadlineNanoseconds:s.deadlineNanoseconds},
      wholeGuard:{...s.guardRecord},maximumSampledRSSBytes:s.rss.maximumSampledRSSBytes,maximumSampleGapMs:s.rss.maximumSampleGapMs,samples:s.rss.samples,
      finalObservationToClosureMs:s.H.admitFinalObservation(s.rss,performance.now()),sourceBindings:finalSources,sourceIdentities:finalIdentities,
      outputBindings:outputs.map(clean),outputIdentities:capturedOutputIdentities(outputs),scientificBytes:census.scientificBytes,operationalLogBytes:census.logBytes,
      retainedLogBytes:census.retainedLogBytes,outwardStderrSubmittedBytes:s.outwardStderrBytes,stderrCallbacksPending:s.stderrPending,stderrDeliveryScope:'submitted bytes conservatively charged; completed callbacks do not prove receiver consumption',
      physicalOutputFiles:census.physicalFiles,outputPaths:census.files.length,hostObservations:structuredClone(s.hosts),observerProcesses:probeSummary(s),coordinatorResourceUsage:process.resourceUsage(),
      ...(s.priorContext?{priorArtifacts:s.priorContext,currentScientificBytes:census.currentScientificBytes,currentRetainedLogBytes:census.currentRetainedLogBytes,currentLogBytes:census.currentLogBytes,
        combinedOutputPaths:census.combinedOutputPaths,combinedPhysicalFiles:census.combinedPhysicalFiles}:{})};
    result.conditionalStdoutBytes=0;result.combinedLogBytesIncludingConditionalStdout=census.logBytes;
    let raw;for(let pass=0;pass<8;pass++){raw=Buffer.from(JSON.stringify(result)+'\n');if(result.conditionalStdoutBytes===raw.length)break;result.conditionalStdoutBytes=raw.length;result.combinedLogBytesIncludingConditionalStdout=census.logBytes+raw.length;}
    raw=Buffer.from(JSON.stringify(result)+'\n');check(raw.length===result.conditionalStdoutBytes&&raw.length<=1048576,'bounded exact conditional wire bytes');s.wireBytes+=raw.length;
    check(census.logBytes+raw.length<=LIMITS.combinedLogBytes,'conditional stdout charged once to joint logs');
    try{await s.bounded(()=>s.H.flushCompletion(result,{began:s.began,lastSampleStartedMs:s.rss.lastSampleStartedMs,clock:()=>{s.live();return performance.now();}}),'conditional stdout close','work',Math.max(1,Math.floor(1000-(performance.now()-s.rss.lastSampleStartedMs))));}
    catch(e){s.terminalFlushFailed=true;throw e;}
    s.diagnostics.check();await s.bounded(()=>s.diagnostics.close(s.began),'diagnostic callback closure');restoreLifetimeStderr(s);terminal();
    check(s.pending.size===0&&!s.activeK&&!s.ambiguity,'ordinary callbacks closed before lock release');releaseLifetimeLock(s);
    // Final asynchronous action. No source read, probe, lock I/O or publication
    // is legal after observed guard exit, even if a fixed local check fails.
    s.live();s.guardTerminating=true;const allowance=s.remainingMs();let timer;
    const termination=s.guard.terminate();
    try{await Promise.race([Promise.all([termination,s.guardExit]),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('whole guard exit exceeded original work allowance')),allowance);})]);}
    finally{clearTimeout(timer);}
    check(s.guardExited&&s.lockReleased&&performance.now()<s.workEnd&&!s.failure,'fixed final whole-attempt check');s.H.admitFinalObservation(s.rss,performance.now());
    s.finished=true;LIVE_LIFETIMES.delete(s.capability);process.off('SIGINT',s.interrupt);process.off('SIGTERM',s.interrupt);
    return{conditionalWire:result,terminalClosureObserved:true};
  }catch(e){s.fail(e);throw e;}
}

async function rejectLifetime(s,error){
  s.fail(error);if(s.guardExited||s.finished)return{accepted:false,ordinaryProcessesClosed:false,lockReleased:s.lockReleased,lateFailure:true};
  s.phase='cleanup';let cleanup,finalizer,closed=false;
  try{
    cleanup=await cleanupLifetimeProcesses(s);await stopLifetimeObservations(s,'cleanup');
    const table=await lifetimeTable(s,'cleanup');closed=!s.ambiguity&&!s.terminalFlushFailed&&ordinaryRows(s,table).length===0&&s.pending.size===0&&s.probeRecords.every(p=>p.closed)&&s.workerClosureFailures.length===0&&!s.activeK;
    if(s.failureFinalize&&!s.lockReleased){
      finalizer=await s.bounded(()=>s.failureFinalize(s.failure,()=>s.live('cleanup')),'owned failure finalizer','cleanup');
      keys(finalizer,['retraction','rejection']);
      if(finalizer.retraction){const {removed,...owner}=finalizer.retraction;check(removed===true&&equal(owner,s.streamOwner),'exact original public alias retraction');
        const st=lstatSync(owner.privatePath,{bigint:true});check(String(st.dev)===owner.dev&&String(st.ino)===owner.ino&&!existsSync(owner.publicPath),'retained private bytes and actual alias removal');s.retractedAlias={...finalizer.retraction};}
      if(finalizer.rejection)binding(finalizer.rejection);lifetimeCensus(s);
    }
  }catch(e){s.cleanupFailure=String(e.message);closed=false;}
  clearInterval(s.timer);
  if(s.layout&&!s.lockReleased){try{
    s.live('cleanup');const record={completed:false,accepted:false,failure:String(s.failure.message).slice(0,4096),firstFailure:s.firstFailure,ambiguity:s.ambiguity,
      ordinaryProcessesClosed:closed,lockReleased:false,wholeGuardClosed:false,invalidates:s.publication??null,cleanupFailure:s.cleanupFailure??null,retainedOutputs:true,
      retractedAlias:s.retractedAlias??null,probeRecords:s.probeRecords,signals:s.signals,pendingCallbacks:s.pending.size,workerClosureFailures:s.workerClosureFailures,kClosureFailure:s.kClosureFailure??null,lockReservation:s.lockReservation??null,stderrPending:s.stderrPending,stderrFailure:s.stderrFailure,guard:s.guardRecord,
      ...(s.priorContext?{priorArtifacts:s.priorContext,outputCensus:lifetimeCensus(s)}:{})};
    const raw=Buffer.from(JSON.stringify(record)+'\n'),filename=path.join(s.layout.operationDirectory,'rejection.json');
    check(s.logPaths.includes(filename),'failure journal remains a charged retained log');preflightNewOutput(s,filename,raw.length);
    writeNew(filename,record,()=>s.live('cleanup'));lifetimeCensus(s);
  }catch(e){s.rejectionFailure=String(e.message);closed=false;}}
  try{if(s.diagnostics)await s.bounded(()=>s.diagnostics.close(s.began),'failed diagnostic closure','cleanup');closeLifetimeLogs(s);restoreLifetimeStderr(s);}catch(e){s.cleanupFailure??=String(e.message);closed=false;}
  // Failure never becomes operational acceptance. Release is allowed only for
  // complete, unambiguous actual cleanup; otherwise original ownership remains.
  if(closed&&s.lock&&!s.lockReleased&&!s.ambiguity)try{releaseLifetimeLock(s);}catch(e){s.cleanupFailure??=String(e.message);closed=false;}
  const noOrdinaryWorkStarted=s.workerStarts===0&&s.registeredStarts===0&&s.probeRecords.length===0&&!s.layout&&!s.lock;
  return{accepted:false,ordinaryProcessesClosed:closed,lockReleased:s.lockReleased,wholeGuardClosed:false,cleanupFailure:s.cleanupFailure??null,
    safeEarlyExit:noOrdinaryWorkStarted||(closed&&(!s.lock||s.lockReleased)&&s.lockReservation?.status!=='failed-original-unresolved'&&!s.ambiguity&&!s.activeK&&s.pending.size===0&&s.workerClosureFailures.length===0)};
}

export async function runBoundedOperation({planPath,planSha256,selfSha256,began,deadlineNanoseconds,lifetime}){
  assertLifetime(lifetime);const s=LIFETIME_STATE.get(lifetime);
  hashToken(planSha256);hashToken(selfSha256);
  check(s.mode==='plan'&&s.self.sha256===selfSha256&&began===s.began&&deadlineNanoseconds===s.deadlineNanoseconds,'same authenticated whole-attempt owner');
  return coordinate({root:s.root,self:s.self,planPath,planSha256,began,deadlineNanoseconds,lifetime});
}

export function parseArguments(argv){
  check(Array.isArray(argv)&&argv.length===6&&argv[0]==='--plan'&&argv[2]==='--plan-sha256'&&argv[4]==='--self-sha256','usage: --plan ABS --plan-sha256 SHA --self-sha256 SHA');
  absolute(argv[1]);hashToken(argv[3]);hashToken(argv[5]);return {planPath:argv[1],planSha256:argv[3],selfSha256:argv[5]};
}

export async function coordinate({root,self,planPath,planSha256,began,deadlineNanoseconds,lifetime}){
  assertLifetime(lifetime);const s=LIFETIME_STATE.get(lifetime);
  check(root===s.root&&self===s.self&&began===s.began&&deadlineNanoseconds===s.deadlineNanoseconds&&s.mode==='plan','one canonical serial operation owner');
  s.live();const p=readBound(planPath,planSha256,true,1048576,()=>s.live()),plan=JSON.parse(p.data.toString());
  check(Buffer.from(canonical(plan)+'\n').equals(p.data),'canonical plan JSON required');
  const declared=validatePlan(plan,root);check(declared.some(b=>b.path===path.join(root,CONTROLS)),'bound coordinator controls required');
  s.plan=plan;s.logPaths=['launcher-stderr.log','resource-observations.ndjson','rejection.json',...plan.stages.flatMap(stage=>['runner-stdout.log','runner-stderr.log'].map(n=>'stages/'+stage.id+'/'+n))].map(n=>path.join(plan.operationDirectory,n));
  bindLifetimeSources(s,{sources:[...declared,clean(p)],identities:originalIdentities([p])});
  if(plan.schema==='braid-program/f6c-bounded-operation-plan.v2')s.priorContext=derivePriorContext(plan,[...s.sourceMap.values()],s.sourceIdentities);
  await startLifetimeAccounting(s,plan);
  const pre=await lifetimeFileWorker(s,{kind:'capture',sources:[...s.sourceMap.values()],identities:{...s.sourceIdentities}},self.data);
  await lifetimeFileWorker(s,{kind:'hook',plan,sources:pre.sources,identities:pre.identities,payload:{kind:'preflight'}},self.data);
  for(const d of plan.outputDirectories){s.live();mkdirSync(d,{mode:0o700});const st=lstatSync(d,{bigint:true});s.observed.set('directory:'+d,[st.dev,st.ino].join(':'));}
  const stages=[],closedStdout=[];
  for(const stage of plan.stages){
    s.live();await lifetimeFileWorker(s,{kind:'capture',sources:pre.sources,identities:pre.identities},self.data);
    const entry=readBound(stage.entry.path,stage.entry.sha256,true,1048576,()=>s.live()),previous=stages.at(-1);
    let prior=null;if(previous){check(previous.process.accepted&&previous.process.processesClosed&&previous.process.admission?.accepted,'closed admitted prior stage');checkOutputs([closedStdout.at(-1)],()=>s.live());prior={stageId:previous.id,stdoutLog:clean(closedStdout.at(-1))};}
    const args=stageArguments(stage.args,prior,deadlineNanoseconds,clean(p));
    s.activeStage=stage;s.activeStageArgs=args;
    let receipt;try{receipt=await lifetimeRegistered(s,{entry:path.relative(root,stage.entry.path),args,
      sources:[{path:path.relative(root,stage.entry.path),sha256:stage.entry.sha256,bytes:entry.data}],output:path.join(plan.operationDirectory,'stages',stage.id),
      admit:({receipt:processReceipt,signal})=>lifetimeFileWorker(s,{kind:'hook',plan,sources:pre.sources,identities:pre.identities,
        stdoutPath:path.join(plan.operationDirectory,'stages',stage.id,'runner-stdout.log'),payload:{kind:'admit',stageId:stage.id,processReceipt,previousStages:stages}},self.data,{signal})});
    }catch(e){if(e.outerReceipt)stages.push({id:stage.id,process:e.outerReceipt});throw e;}
    check(receipt.accepted&&receipt.processesClosed&&receipt.admission?.accepted&&equal(sourceUnion(receipt.admission.runtimeBindings),sourceUnion(stage.runtimeBindings)),'closed stage/exact runtime');
    check(receipt.stdoutLog.path===path.join(plan.operationDirectory,'stages',stage.id,'runner-stdout.log')&&equal(receipt.stdoutLog,receipt.admission.completionLog),'authenticated closed stage stdout');
    const stdout=readBound(receipt.stdoutLog.path,receipt.stdoutLog.sha256,false,LIMITS.combinedLogBytes,()=>s.live());
    check(stdout.bytes===receipt.stdoutLog.bytes&&stdout.identity===receipt.admission.completionLogIdentity,'original closed stdout identity');
    closedStdout.push(stdout);stages.push({id:stage.id,process:receipt});await lifetimeCheckpoint(s);
  }
  await lifetimeFileWorker(s,{kind:'hook',plan,sources:pre.sources,identities:pre.identities,payload:{kind:'final',stages}},self.data);
  await lifetimeFileWorker(s,{kind:'capture',sources:pre.sources,identities:pre.identities},self.data);checkOutputs(closedStdout,()=>s.live());
  const before=await lifetimeCheckpoint(s,{host:true});
  const record={schema:'braid-program/f6c-bounded-operation.v2',accepted:false,ordinaryChecksPassed:true,wholeClosurePending:true,scope:'ordinary-operation-pending-whole-attempt',
    plan:clean(p),stages,sources:pre.sources,limits:LIMITS,resourceObservationsBeforePublication:before.rss,hostObservations:before.hosts,
    outputCensus:before.census,elapsedSecondsBeforePublication:(performance.now()-began)/1000,
    publicationRequires:'conditional stdout plus independent exact exit0/source/process/lock closure; no scientific authority',h3EvidenceEligible:false,physicalClaims:false};
  const published=await lifetimeFileWorker(s,{kind:'publish',plan,filename:path.join(plan.operationDirectory,'operation.json'),record,sources:pre.sources,identities:pre.identities},self.data);
  const publication=clean(published);s.publication=publication;
  return finishLifetime(s,{wire:{mode:'serial-plan',operation:publication,h3EvidenceEligible:false,physicalClaims:false},
    finalCheck:()=>{captureUnion(pre.sources,pre.identities,()=>s.live());checkOutputs(closedStdout,()=>s.live());}});
}

function parseWholeArguments(argv){
  if(argv[0]==='--control-plan')return{mode:'plan',control:true,...parseArguments(['--plan',...argv.slice(1)])};
  if(argv[0]!=='--streamed')return{mode:'plan',...parseArguments(argv)};
  check(argv.length===9&&argv[1]==='--spec'&&argv[3]==='--spec-sha256'&&argv[5]==='--caller-sha256'&&argv[7]==='--self-sha256',
    'usage: --streamed --spec ABS --spec-sha256 SHA --caller-sha256 SHA --self-sha256 SHA');
  absolute(argv[2]);for(const i of[4,6,8])hashToken(argv[i]);
  return{mode:'streamed',specPath:argv[2],specSha:argv[4],callerSha:argv[6],selfSha256:argv[8]};
}

async function wholeAttemptMain(){
  // First executable entry body. Interpreter, source loading and static imports
  // precede this boundary and require the external original invocation record.
  const entryHr=process.hrtime.bigint(),began=performance.now();
  // This sole pre-authentication token inspection can only contract the limit.
  // It is immutable even if the subsequent complete argument parse rejects.
  const control=process.argv[2]==='--control-plan',inclusiveMilliseconds=control?120000:1800000;
  const deadlineNanoseconds=String(entryHr+BigInt(inclusiveMilliseconds)*1000000n);
  let s;
  try{
    s=makeLifetime(began,deadlineNanoseconds,control);await s.ready();
    const options=parseWholeArguments(process.argv.slice(2));check(Boolean(options.control)===control,'unchanged first-token budget selection');s.mode=options.mode;await initializeLifetime(s,options.selfSha256);
    if(options.mode==='plan')await runBoundedOperation({...options,began,deadlineNanoseconds,lifetime:s.capability});
    else{
      s.live();const caller=readBound(path.join(s.root,STREAMED),options.callerSha,true,1048576,()=>s.live());
      const spec=readBound(options.specPath,options.specSha,true,1048576,()=>s.live()),decoded=JSON.parse(spec.data.toString());
      check(decoded.root===s.root&&equal(decoded.bindings?.coordinator,clean(caller)),'external caller binding agrees with invocation');
      s.caller=caller;s.streamSpec=spec;bindLifetimeSources(s,{sources:[clean(caller),clean(spec)],identities:originalIdentities([caller,spec])});
      const module=await s.bounded(()=>import(url(caller.data)),'captured fixed streamed caller import');
      check(typeof module.coordinate==='function','fixed streamed orchestration entry');
      await module.coordinate({specPath:options.specPath,specSha:options.specSha,selfSha:options.callerSha,self:caller,began,deadlineNanoseconds,lifetime:s.capability});
      check(s.finished&&s.guardExited&&s.lockReleased,'caller returned without shared final closure');
    }
  }catch(error){
    let rejection;
    if(s&&!s.guardExited&&!s.finished)try{rejection=await rejectLifetime(s,error);}catch{}
    // Never discard the original self guard while ordinary closure or owned
    // lock cleanup is unresolved. It retains its original TERM/KILL instants.
    if(!s||s.finished||rejection?.safeEarlyExit)process.exit(1);
    process.exitCode=1;
  }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  wholeAttemptMain().catch(()=>{process.exitCode=1;});
}

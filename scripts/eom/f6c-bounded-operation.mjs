/** Source-bound serial operations with one inclusive resource/process budget.
 *
 * runBoundedOperation({planPath,planSha256,selfSha256,began,deadlineNanoseconds})
 * captures this module and its frozen public supervision dependencies. The JSON
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
 * Failed outputs are always retained. A returned completion is still conditional
 * on the caller's independently observed exit0 and whole elapsed time. The direct
 * CLI only supplies that original start; no numerical work or resume is hidden.
 */
import {execFile} from 'node:child_process';
import {createHash} from 'node:crypto';
import {registerHooks} from 'node:module';
import {closeSync,constants,existsSync,fstatSync,fsyncSync,lstatSync,mkdirSync,
  openSync,readSync,readdirSync,realpathSync,statfsSync,writeSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

export const SELF='scripts/eom/f6c-bounded-operation.mjs';
export const CONTROLS='tests/f6c-bounded-operation.test.js';
export const LIMITS=Object.freeze({inclusiveMilliseconds:1800000,aggregateRSSBytes:2147483648,
  rssPollMilliseconds:250,maximumRSSGapMilliseconds:1000,heartbeatMilliseconds:15000,
  scientificBytes:67108864,combinedLogBytes:16777216,sourceFiles:512,sourceBytes:1073741824,
  outputFiles:512,serialWorkers:1,startFreePercent:40,startDiskBytes:68719476736,
  stopFreePercent:20,stopDiskBytes:17179869184});
export const PINS=Object.freeze({
  helpers:['scripts/eom/launch-prescribed-response-pilot.mjs','a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9'],
  outer:['scripts/eom/launch-abc-enclosed-root-pilot.mjs','5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa'],
  diagnostics:['scripts/eom/launch-f6c-emission-refinement-pilot.mjs','89b23af09f57aa50e3ebfc0780189f2f0d1a409a7e13004af0cb48167894b944'],
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
  keys(plan,['schema','root','operationDirectory','outputDirectories','publicationAliases','sources','hookModule','hookControls','configuration','stages']);
  absolute(root);check(root===realpathSync(root)&&plan.root===root&&plan.schema==='braid-program/f6c-bounded-operation-plan.v1','plan root/schema');
  absolute(plan.operationDirectory);check(Array.isArray(plan.outputDirectories)&&plan.outputDirectories.length>0&&plan.outputDirectories.length<=16,'output directories');
  const dirs=[plan.operationDirectory,...plan.outputDirectories];
  for(const d of dirs){absolute(d);check(beneath(d,path.join(root,'.local-data/braid-analysis')),'owned output lane');}
  check(new Set(dirs).size===dirs.length&&!dirs.some(a=>dirs.some(b=>a!==b&&beneath(a,b))),'overlapping output directories');
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

export function outputCensus(plan,observed=new Map()){
  const files=[],directories=[],logs=new Set(['launcher-stderr.log','resource-observations.ndjson',...plan.stages.flatMap(s=>['runner-stdout.log','runner-stderr.log'].map(n=>'stages/'+s.id+'/'+n))].map(n=>path.join(plan.operationDirectory,n)));
  const walk=directory=>{
    if(!existsSync(directory))return;
    const ds=lstatSync(directory,{bigint:true});check(ds.isDirectory()&&realpathSync(directory)===directory,'output directory alias/type');const inode=[ds.dev,ds.ino].join(':');
    check(!observed.has('directory:'+directory)||observed.get('directory:'+directory)===inode,'owned directory replaced');observed.set('directory:'+directory,inode);directories.push({path:directory,inode});
    for(const name of readdirSync(directory)){const p=path.join(directory,name),s=lstatSync(p,{bigint:true});check(!s.isSymbolicLink(),'output symlink');if(s.isDirectory()){check(directories.length<512,'output directory bound');walk(p);continue;}check(s.isFile(),'regular output required');check(files.length<LIMITS.outputFiles,'output file count');
      const inode=[s.dev,s.ino].join(':');check(!observed.has(p)||observed.get(p)===inode,'owned output replaced');observed.set(p,inode);
      files.push({path:p,inode,bytes:Number(s.size),identity:identity(s),classification:logs.has(p)?'log':'scientific'});
    }
  };
  for(const d of [plan.operationDirectory,...plan.outputDirectories])walk(d);
  const current=new Set([...files.map(f=>f.path),...directories.map(d=>'directory:'+d.path)]);for(const p of observed.keys())check(current.has(p),'owned output disappeared');
  const groups=new Map();for(const f of files){if(!groups.has(f.inode))groups.set(f.inode,[]);groups.get(f.inode).push(f);}
  let scientificBytes=0,logBytes=0;
  for(const group of groups.values()){
    const first=group[0];check(group.every(f=>f.bytes===first.bytes&&f.classification===first.classification),'output alias differs');
    if(group.length>1)check(group.length===2&&plan.publicationAliases.some(a=>group.some(f=>f.path===a.publicPath)&&group.some(f=>f.path!==a.publicPath&&path.dirname(f.path)===a.privateDirectory&&path.basename(f.path).startsWith(a.privatePrefix)&&/^[a-f0-9]{32}$/u.test(path.basename(f.path).slice(a.privatePrefix.length)))),'undeclared output hardlink alias');
    if(first.classification==='log')logBytes+=first.bytes;else scientificBytes+=first.bytes;
  }
  check(scientificBytes<=LIMITS.scientificBytes&&logBytes<=LIMITS.combinedLogBytes,'aggregate scientific/log byte limit');
  return {files,directories,scientificBytes,logBytes,physicalFiles:groups.size};
}

export function captureOutputs(census,live=()=>{}){
  return census.files.map(f=>{const captured=readBound(f.path,undefined,false,f.classification==='log'?LIMITS.combinedLogBytes:LIMITS.scientificBytes,live);check(captured.bytes===f.bytes&&captured.identity===f.identity,'final output hash/identity capture changed');return captured;});
}

export function checkOutputs(bindings,live=()=>{}){
  for(const b of bindings){const now=readBound(b.path,b.sha256,false,LIMITS.scientificBytes,live);check(now.bytes===b.bytes&&now.identity===b.identity,'final output binding changed');}
}

export function writeNew(filename,value,live=()=>{}){
  const raw=Buffer.from(JSON.stringify(value)+'\n');check(raw.length<=LIMITS.scientificBytes,'bounded operation receipt');
  absolute(filename);check(realpathSync(path.dirname(filename))===path.dirname(filename),'receipt directory symlink');
  const parent=lstatSync(path.dirname(filename),{bigint:true}),fd=openSync(filename,'wx',0o600),created=fstatSync(fd,{bigint:true});let completed;
  const same=()=>{const now=lstatSync(filename,{bigint:true}),dir=lstatSync(path.dirname(filename),{bigint:true});check(now.dev===created.dev&&now.ino===created.ino&&!now.isSymbolicLink()&&dir.dev===parent.dev&&dir.ino===parent.ino&&realpathSync(filename)===filename,'created receipt replaced');};
  try{let at=0;while(at<raw.length){live();same();const n=writeSync(fd,raw,at,Math.min(65536,raw.length-at));check(n>0,'receipt write stalled');at+=n;}fsyncSync(fd);same();completed=identity(fstatSync(fd,{bigint:true}));}finally{closeSync(fd);}
  const d=openSync(path.dirname(filename),constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{fsyncSync(d);}finally{closeSync(d);}
  const result=readBound(filename,sha(raw),false,LIMITS.scientificBytes,live);same();check(result.identity===completed,'receipt changed at publication');return clean(result);
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

export async function closeUnexpectedProcesses({inspect,select,ownPid,signal=(pid,s)=>process.kill(pid,s),clock=()=>performance.now(),delay=ms=>new Promise(r=>setTimeout(r,ms))}){
  // Called only after the registered kernel and file workers stop. Capture and
  // freeze verified individual descendants, never the coordinator's shared
  // process group. Fresh birth identity is rechecked before every later signal.
  const known=new Map(),key=r=>[r.pid,r.started,r.pgid,r.command].join('|');
  const rows=async()=>{const table=await inspect();for(const r of select(table)){check(r.pid!==ownPid,'refuse coordinator signal');known.set(key(r),r);}return table.filter(r=>r.pid!==ownPid&&known.has(key(r)));};
  const send=(r,s)=>{try{signal(r.pid,s);}catch(e){if(e.code!=='ESRCH')throw e;}};
  let active=await rows(),previous='';
  for(let pass=0;active.length;pass++){
    check(pass<8,'unexpected descendant census did not settle');for(const r of active)send(r,'SIGSTOP');
    const signature=active.map(key).sort().join('\n');if(signature===previous)break;previous=signature;active=await rows();
  }
  active=await rows();for(const r of active){send(r,'SIGTERM');send(r,'SIGCONT');}
  const grace=clock()+5000,end=grace+2000;
  while((active=await rows()).length){check(clock()<end,'unexpected owned processes remain after cleanup');if(clock()>=grace)for(const r of active)send(r,'SIGKILL');await delay(25);}
  return {processesClosed:true,unexpectedProcesses:[...known.values()]};
}

export async function fileOperation(job){
  const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'original operation deadline');
  live();
  if(job.kind==='capture')return captureUnion(job.sources,job.identities,live);
  if(job.kind==='publish'){
    captureUnion(job.sources,job.identities,live);
    const raw=Buffer.from(JSON.stringify(job.record)+'\n');check(outputCensus(job.plan).scientificBytes+raw.length<=LIMITS.scientificBytes,'receipt plus scientific output limit');
    const result=writeNew(job.filename,job.record,live);captureUnion(job.sources,job.identities,live);return result;
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

export async function runBoundedOperation({planPath,planSha256,selfSha256,began,deadlineNanoseconds}){
  hashToken(planSha256);hashToken(selfSha256);
  check(Number.isFinite(began)&&began<=performance.now()&&performance.now()-began<LIMITS.inclusiveMilliseconds,'original begin required');
  check(typeof deadlineNanoseconds==='string'&&/^[0-9]+$/u.test(deadlineNanoseconds)&&BigInt(deadlineNanoseconds)>process.hrtime.bigint()&&BigInt(deadlineNanoseconds)<=process.hrtime.bigint()+1800000000000n,'original fixed deadline required');
  const root=realpathSync(process.cwd()),self=readBound(path.join(root,SELF),selfSha256,true,1024**2),captured=await import(url(self.data));
  return captured.coordinate({root,self,planPath,planSha256,began,deadlineNanoseconds});
}

export function parseArguments(argv){
  check(Array.isArray(argv)&&argv.length===6&&argv[0]==='--plan'&&argv[2]==='--plan-sha256'&&argv[4]==='--self-sha256','usage: --plan ABS --plan-sha256 SHA --self-sha256 SHA');
  absolute(argv[1]);hashToken(argv[3]);hashToken(argv[5]);return {planPath:argv[1],planSha256:argv[3],selfSha256:argv[5]};
}

export async function coordinate({root,self,planPath,planSha256,began,deadlineNanoseconds}){
  check(import.meta.url===url(self.data)&&sha(self.data)===self.sha256,'captured coordinator generation required');
  const deps=Object.fromEntries(Object.entries(PINS).map(([k,[p,h]])=>[k,readBound(path.join(root,p),h,true,1024**2)]));
  const H=await import(url(deps.helpers.data)),outer=await import(url(deps.outer.data)),D=await import(url(deps.diagnostics.data)),diagnostics=D.diagnosticGuard();
  const abort=new AbortController(),owners=new Map(),probes=new Set(),pending=new Set(),observed=new Map(),hostObservations=[],stages=[],closedStdout=[];
  const rss={beganMs:began,lastSampleMs:null,samples:0,maximumSampleGapMs:0,maximumSampledRSSBytes:0};
  let failure,plan,pre,logFD,rssFD,lock,timer,deadlineTimer,rssJob,hostJob,active=false,publication,finalSources,finalIdentities,finalCensus,finalOutputBindings,closed=false;
  const logTotal={bytes:0},rssTotal={bytes:0},originalError=console.error;
  const remaining=()=>Math.floor(Math.min(LIMITS.inclusiveMilliseconds-(performance.now()-began),Number(BigInt(deadlineNanoseconds)-process.hrtime.bigint())/1e6));
  const live=()=>check(!failure&&!abort.signal.aborted&&remaining()>0,failure?.message??'original inclusive deadline/interruption');
  const fail=e=>{failure??=e;abort.abort(failure);if(active)process.emit('SIGTERM');};diagnostics.bind(fail);
  const worker=job=>H.runFileWorker({...job,deadlineNanoseconds},self.data,remaining(),abort.signal);
  const poll=()=>plan?outputCensus(plan,observed):null;
  const log=value=>{const raw=Buffer.from((typeof value==='string'?value:JSON.stringify(value))+'\n');H.boundedLogAppend(logFD,raw,logTotal);diagnostics.write(raw);poll();};
  const probe=(command,args,timeout,maxBuffer)=>{
    const p=new Promise((resolve,reject)=>{const child=execFile(command,args,{timeout,killSignal:'SIGKILL',maxBuffer,encoding:'utf8',env:{...process.env,LC_ALL:'C'}},(error,text)=>{probes.delete(child.pid);error?reject(error):resolve({text,pid:child.pid});});if(command==='/bin/ps')probes.add(child.pid);});
    pending.add(p);p.finally(()=>pending.delete(p)).catch(()=>{});return p;
  };
  const table=async()=>{const start=performance.now(),r=await probe('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,rss=,args='],500,8*1024**2),rows=H.parseObservation(r.text).filter(x=>x.pid!==r.pid);Object.defineProperty(rows,'sampleStartedMs',{value:start});return rows;};
  const sample=rows=>{const value=H.acceptRSS(rss,H.selectOwnedRows(rows,process.pid,owners,outer,probes),performance.now(),rows.sampleStartedMs);H.boundedLogAppend(rssFD,Buffer.from(JSON.stringify({kind:'aggregate-rss',elapsedSeconds:(performance.now()-began)/1000,...value})+'\n'),rssTotal);poll();};
  const inspect=async()=>{const rows=await table();if(!abort.signal.aborted)try{sample(rows);}catch(e){fail(e);throw e;}return rows.map(({rssBytes,...r})=>r);};
  const host=async launch=>{const r=await probe('/usr/bin/memory_pressure',[],2000,1024**2),disk=statfsSync(root,{bigint:true}),record={kind:'host-resource',elapsedSeconds:(performance.now()-began)/1000,...H.parseHostResource(r.text,disk.bavail*disk.bsize,launch)};hostObservations.push(record);log(record);};
  const stop=async()=>{clearInterval(timer);clearTimeout(deadlineTimer);if(rssJob)await rssJob;if(hostJob)await hostJob;await Promise.allSettled([...pending]);};
  const interrupt=()=>{if(!abort.signal.aborted)fail(Error('operator interrupted bounded operation'));};
  try{
    const p=readBound(planPath,planSha256,true,1024**2);plan=JSON.parse(p.data.toString());check(Buffer.from(canonical(plan)+'\n').equals(p.data),'canonical plan JSON required');
    const declared=validatePlan(plan,root),controls=declared.find(b=>b.path===path.join(root,CONTROLS));check(controls,'bound coordinator controls required');
    const sources=sourceUnion([...declared,clean(self),clean(p),...Object.values(deps).map(clean)]);
    const observers=[];for(const name of ['/bin/ps','/usr/bin/memory_pressure']){const b=sources.find(s=>s.path===name),captured=readBound(name,b.sha256,false,1024**2);check(captured.bytes===b.bytes,'observer executable size');observers.push(captured);}
    const firstIdentities=originalIdentities([self,p,...Object.values(deps),...observers]);
    const dirs=[plan.operationDirectory,...plan.outputDirectories];for(const d of dirs)check(!existsSync(d)&&realpathSync(path.dirname(d))===path.dirname(d),'fresh canonical output directory');
    mkdirSync(plan.operationDirectory,{mode:0o700});{const s=lstatSync(plan.operationDirectory,{bigint:true});observed.set('directory:'+plan.operationDirectory,[s.dev,s.ino].join(':'));}
    logFD=openSync(path.join(plan.operationDirectory,'launcher-stderr.log'),'wx',0o600);{const s=fstatSync(logFD,{bigint:true});observed.set(path.join(plan.operationDirectory,'launcher-stderr.log'),[s.dev,s.ino].join(':'));}
    rssFD=openSync(path.join(plan.operationDirectory,'resource-observations.ndjson'),'wx',0o600);{const s=fstatSync(rssFD,{bigint:true});observed.set(path.join(plan.operationDirectory,'resource-observations.ndjson'),[s.dev,s.ino].join(':'));}
    console.error=(...v)=>{try{log(v.map(x=>typeof x==='string'?x:JSON.stringify(x)).join(' '));}catch(e){fail(e);}};
    process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);deadlineTimer=setTimeout(()=>fail(Error('inclusive operation deadline')),remaining());
    let nextHost=performance.now()+15000;
    timer=setInterval(()=>{try{check(rss.lastSampleMs===null||performance.now()-rss.lastSampleStartedMs<=1000,'lost aggregate RSS observation');if(!rssJob)rssJob=table().then(r=>{if(!abort.signal.aborted)sample(r);}).catch(fail).finally(()=>{rssJob=undefined;});
      if(performance.now()>=nextHost&&!hostJob){nextHost=performance.now()+15000;hostJob=host(false).catch(fail).finally(()=>{hostJob=undefined;});log({kind:'bounded-operation-heartbeat',elapsedSeconds:(performance.now()-began)/1000,closedStages:stages.map(s=>s.id),accepted:false});}poll();}catch(e){fail(e);}},250);
    const initial=await table();sample(initial);noCompetitor(initial,process.pid);
    const lockPath=path.join(root,'.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock');check(realpathSync(path.dirname(lockPath))===path.dirname(lockPath),'canonical shared lock');lock=H.reserveLock(lockPath,initial.find(r=>r.pid===process.pid));
    pre=await worker({kind:'capture',sources,identities:firstIdentities});await worker({kind:'hook',plan,sources:pre.sources,identities:pre.identities,payload:{kind:'preflight'}});
    for(const d of plan.outputDirectories){mkdirSync(d,{mode:0o700});const s=lstatSync(d,{bigint:true});observed.set('directory:'+d,[s.dev,s.ino].join(':'));}await host(true);live();
    for(const stage of plan.stages){
      live();await worker({kind:'capture',sources:pre.sources,identities:pre.identities});
      const capturedEntry=readBound(stage.entry.path,stage.entry.sha256,true,1024**2,live);let receipt;active=true;
      const previous=stages.at(-1);let prior=null;
      if(previous){check(previous.process.accepted&&previous.process.processesClosed&&previous.process.admission?.accepted,'closed admitted prior stage required');checkOutputs([closedStdout.at(-1)],live);prior={stageId:previous.id,stdoutLog:clean(closedStdout.at(-1))};}
      const args=stageArguments(stage.args,prior,deadlineNanoseconds,clean(p));
      try{receipt=await outer.superviseRegisteredPilot({root,entry:path.relative(root,stage.entry.path),args,
        sources:[{path:path.relative(root,stage.entry.path),sha256:stage.entry.sha256,bytes:capturedEntry.data}],output:path.join(plan.operationDirectory,'stages',stage.id),startedAtMs:began,limitMs:1800000,heartbeatMs:15000,
        inspectProcesses:H.startupAbortInspection(inspect,abort.signal),admit:({receipt:processReceipt,signal})=>H.runFileWorker({kind:'hook',plan,sources:pre.sources,identities:pre.identities,stdoutPath:path.join(plan.operationDirectory,'stages',stage.id,'runner-stdout.log'),
          payload:{kind:'admit',stageId:stage.id,processReceipt,previousStages:stages},deadlineNanoseconds},self.data,remaining(),signal)});
      }catch(e){if(e.outerReceipt)stages.push({id:stage.id,process:e.outerReceipt});throw e;}finally{active=false;}
      check(receipt.accepted&&receipt.processesClosed&&receipt.admission?.accepted&&equal(sourceUnion(receipt.admission.runtimeBindings),sourceUnion(stage.runtimeBindings)),'closed stage and exact runtime capture required');
      check(receipt.stdoutLog.path===path.join(plan.operationDirectory,'stages',stage.id,'runner-stdout.log')&&equal(receipt.stdoutLog,receipt.admission.completionLog),'final outer log matches worker-captured completion');
      const stdout=readBound(receipt.stdoutLog.path,receipt.stdoutLog.sha256,false,LIMITS.combinedLogBytes,live);check(stdout.bytes===receipt.stdoutLog.bytes&&stdout.identity===receipt.admission.completionLogIdentity,'closed stdout byte count/original identity');closedStdout.push(stdout);
      stages.push({id:stage.id,process:receipt});poll();sample(await table());
    }
    await worker({kind:'hook',plan,sources:pre.sources,identities:pre.identities,payload:{kind:'final',stages}});
    await worker({kind:'capture',sources:pre.sources,identities:pre.identities});checkOutputs(closedStdout,live);sample(await table());await host(false);live();
    const record={schema:'braid-program/f6c-bounded-operation.v1',accepted:true,scope:'operational-completion-only',plan:clean(p),stages,sources:pre.sources,limits:LIMITS,resourceObservationsBeforePublication:{...rss},hostObservations,
      outputCensus:poll(),elapsedSecondsBeforePublication:(performance.now()-began)/1000,publicationRequires:'fresh caller exit0 after final source/stdio/lock closure; no scientific authority',h3EvidenceEligible:false,physicalClaims:false};
    publication=await worker({kind:'publish',plan,filename:path.join(plan.operationDirectory,'operation.json'),record,sources:pre.sources,identities:pre.identities});
    const captured=await worker({kind:'capture',sources:sourceUnion([...pre.sources,publication]),identities:pre.identities});finalSources=captured.sources;finalIdentities=captured.identities;
    sample(await table());live();await stop();live();
    const finalTable=await table();sample(finalTable);const unexpected=H.selectOwnedRows(finalTable,process.pid,owners,outer,probes).filter(r=>r.pid!==process.pid);
    check(unexpected.length===0,'unexpected owned descendants after stage/worker closure');H.releaseLock(lock);lock=undefined;
    for(const fd of [logFD,rssFD])fsyncSync(fd);finalCensus=poll();finalOutputBindings=captureOutputs(finalCensus,live);
    const terminal=()=>{live();H.admitFinalObservation(rss,performance.now());check(equal(outputCensus(plan),finalCensus),'final output layout changed');captureUnion(finalSources,finalIdentities,live);checkOutputs(finalOutputBindings,live);checkOutputs(closedStdout,live);H.admitFinalObservation(rss,performance.now());};
    await D.drainDiagnostics({began,lastSampleStartedMs:rss.lastSampleStartedMs});diagnostics.check();terminal();
    const result={completed:true,accepted:true,scope:'operational-completion-only',operation:publication,processesClosed:true,workersAndMonitorsClosed:true,lockReleased:true,
      elapsedSeconds:(performance.now()-began)/1000,maximumSampledRSSBytes:rss.maximumSampledRSSBytes,maximumSampleGapMs:rss.maximumSampleGapMs,samples:rss.samples,
      finalObservationToClosureMs:H.admitFinalObservation(rss,performance.now()),scientificBytes:finalCensus.scientificBytes,operationalLogBytes:finalCensus.logBytes,
      physicalOutputFiles:finalCensus.physicalFiles,outputBindings:finalOutputBindings.map(clean),coordinatorResourceUsage:process.resourceUsage(),h3EvidenceEligible:false,physicalClaims:false};
    await H.flushCompletion(result,{began,lastSampleStartedMs:rss.lastSampleStartedMs});diagnostics.check();await diagnostics.close(began);terminal();closed=true;return result;
  }catch(e){
    fail(e);await stop();let unexpectedCleanup;try{unexpectedCleanup=await closeUnexpectedProcesses({inspect:table,select:rows=>H.selectOwnedRows(rows,process.pid,owners,outer,probes).filter(r=>r.pid!==process.pid),ownPid:process.pid});}catch(cleanup){unexpectedCleanup={processesClosed:false,failure:String(cleanup.message)};}
    if(plan&&existsSync(plan.operationDirectory))try{const failureRecord={completed:false,accepted:false,failure:String(failure.message).slice(0,4096),invalidates:publication??null,stages:D.rejectedStageSummaries(stages.map(s=>({stage:s.id,process:s.process}))),unexpectedCleanup,retainedOutputs:true};
      const raw=Buffer.from(JSON.stringify(failureRecord)+'\n');if(outputCensus(plan).scientificBytes+raw.length<=LIMITS.scientificBytes)writeNew(path.join(plan.operationDirectory,'rejection.json'),failureRecord);}catch{}
    throw Object.assign(failure,{operationDirectory:plan?.operationDirectory,retainedOutputs:true,stages,unexpectedCleanup});
  }finally{
    let cleanup;try{await stop();}catch(e){cleanup=e;}
    try{if(lock)H.releaseLock(lock);}catch(e){cleanup??=e;}
    console.error=originalError;process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
    for(const fd of [logFD,rssFD])if(fd!==undefined)try{closeSync(fd);}catch(e){cleanup??=e;}
    try{if(!closed)await diagnostics.close(began);else{live();H.admitFinalObservation(rss,performance.now());check(equal(outputCensus(plan),finalCensus),'final cleanup layout changed');}}catch(e){cleanup??=e;}
    if(cleanup){if(publication)try{const record={completed:false,accepted:false,failure:String(cleanup.message).slice(0,4096),invalidates:publication,retainedOutputs:true};if(outputCensus(plan).scientificBytes+Buffer.byteLength(JSON.stringify(record)+'\n')<=LIMITS.scientificBytes)writeNew(path.join(plan.operationDirectory,'terminal-rejection.json'),record);}catch{}
      throw Object.assign(cleanup,{operationDirectory:plan?.operationDirectory,retainedOutputs:true,invalidates:publication??null});}
  }
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const began=performance.now(),deadlineNanoseconds=String(process.hrtime.bigint()+1800000000000n);
  try{await runBoundedOperation({...parseArguments(process.argv.slice(2)),began,deadlineNanoseconds});}
  catch(error){
    // Existing bounded failure/stdio handling owns nonzero CLI termination.
    // A damaged failure helper must not strand this process on a blocked pipe.
    try{const [p,h]=PINS.diagnostics,D=await import(url(readBound(path.join(realpathSync(process.cwd()),p),h,true,1048576).data));await D.failedCLICompletion(error,{began});}
    catch{process.exit(1);}
  }
}

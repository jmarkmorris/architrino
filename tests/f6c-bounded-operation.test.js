// Tiny inert controls only: no registered subprocesses or numerical dispatch.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,renameSync,linkSync,symlinkSync,
  rmSync,realpathSync,lstatSync,truncateSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as fs from 'node:fs';
import {EventEmitter} from 'node:events';
import {runInNewContext} from 'node:vm';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';

const digest=raw=>createHash('sha256').update(raw).digest('hex');
const b=p=>({path:p,sha256:'a'.repeat(64),bytes:1});
const actual=p=>({path:p,sha256:digest(readFileSync(p)),bytes:lstatSync(p).size});
function fixture(t){
  const root=realpathSync(mkdtempSync(path.join(os.tmpdir(),'f6c-operation-controls-')));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  const lane=path.join(root,'.local-data/braid-analysis');mkdirSync(lane,{recursive:true});
  const plan={schema:'braid-program/f6c-bounded-operation-plan.v1',root,operationDirectory:path.join(lane,'outer'),outputDirectories:[path.join(lane,'data')],publicationAliases:[],
    sources:[b(realpathSync(process.execPath)),b('/bin/ps'),b('/usr/bin/memory_pressure')],hookModule:b(path.join(root,'hooks.mjs')),hookControls:b(path.join(root,'hook-test.js')),configuration:{},
    stages:[{id:'producer',entry:b(path.join(root,'entry.mjs')),args:['--fixed'],sources:[],runtimeBindings:[b(realpathSync(process.execPath))]}]};
  return {root,lane,plan};
}

test('immutable exact resource limits and inert stage plan',t=>{
  const {root,plan}=fixture(t);
  assert.equal(Object.isFrozen(C.LIMITS),true);
  assert.deepEqual([C.LIMITS.inclusiveMilliseconds,C.LIMITS.aggregateRSSBytes,C.LIMITS.rssPollMilliseconds,C.LIMITS.maximumRSSGapMilliseconds,C.LIMITS.scientificBytes,C.LIMITS.combinedLogBytes,C.LIMITS.serialWorkers],
    [1800000,2147483648,250,1000,67108864,16777216,1]);
  assert.ok(C.validatePlan(plan,root).length>0);
  for(const mutate of [p=>p.limits={},p=>p.stages[0].runtimeBindings=[],p=>p.stages.push(p.stages[0]),p=>p.stages[0].id='../escape',p=>p.stages[0].args=[1],p=>p.stages[0].args=['--operation-deadline-ns','1'],p=>p.outputDirectories=[p.operationDirectory],p=>p.outputDirectories=[root],p=>p.sources=[],p=>p.stages[0].entry.bytes=1048577]){
    const p=structuredClone(plan);mutate(p);assert.throws(()=>C.validatePlan(p,root));
  }
});

test('source union retains exact generations and unchanged physical limits',()=>{
  const one=b('/some/source');assert.equal(C.sourceUnion([one,one]).length,1);
  for(const value of [{...one,bytes:0},{...one,bytes:true},{...one,bytes:1073741825},{...one,path:'/some/../source'},{...one,path:'//some/source'},{...one,sha256:'wrong'}])assert.throws(()=>C.sourceUnion([value]));
  assert.throws(()=>C.sourceUnion([one,{...one,sha256:'b'.repeat(64)}]));
  assert.throws(()=>C.sourceUnion(Array.from({length:513},(_,n)=>b('/source/'+n))));
  assert.throws(()=>C.sourceUnion([{...one,bytes:1073741824},{...one,path:'/second'}]));
});

test('source capture rejects source replacement and duplicate hardlinks',t=>{
  const {root}=fixture(t),p=path.join(root,'source.dat');writeFileSync(p,'one');
  const captured=C.captureUnion([actual(p)]);assert.equal(captured.sources.length,1);
  renameSync(p,p+'.preserved');writeFileSync(p,'one');
  assert.throws(()=>C.captureUnion(captured.sources,captured.identities));
  const alias=p+'.alias';linkSync(p,alias);assert.throws(()=>C.captureUnion([actual(p),actual(alias)]),/hardlink/u);
  const symlink=p+'.symlink';symlinkSync(p,symlink);assert.throws(()=>C.readBound(symlink,digest(Buffer.from('one'))));
  assert.equal(readFileSync(p+'.preserved','utf8'),'one');
});

test('first plan/self/helper captures remain original through later capture',t=>{
  const {root}=fixture(t),p=path.join(root,'source.mjs');writeFileSync(p,'original');const first=C.readBound(p,actual(p).sha256,true);
  const identities=C.originalIdentities([first,first]);assert.equal(identities[p],first.identity);
  assert.throws(()=>C.originalIdentities([first,{...first,identity:'1:2:3:4:5'}]),/conflicting/u);
  renameSync(p,p+'.preserved');writeFileSync(p,'original');assert.throws(()=>C.captureUnion([C.clean(first)],identities),/original identity/u);
});

test('every physical output counted and only explicit publication alias accepted',t=>{
  const {plan}=fixture(t),dir=plan.outputDirectories[0];mkdirSync(plan.operationDirectory);mkdirSync(dir);
  const pub=path.join(dir,'package.bin'),privatePath=pub+'.partial.'+'a'.repeat(32);writeFileSync(privatePath,'bytes');linkSync(privatePath,pub);
  assert.throws(()=>C.outputCensus(plan),/undeclared/u);
  plan.publicationAliases=[{publicPath:pub,privateDirectory:dir,privatePrefix:'package.bin.partial.'}];
  const c=C.outputCensus(plan);assert.equal(c.scientificBytes,5);assert.equal(c.physicalFiles,1);assert.equal(c.files.length,2);
  writeFileSync(path.join(plan.operationDirectory,'launcher-stderr.log'),'log');
  assert.equal(C.outputCensus(plan).logBytes,3);
  writeFileSync(path.join(dir,'otherwise-unlisted.txt'),'all');assert.equal(C.outputCensus(plan).scientificBytes,8);
  const captured=C.captureOutputs(C.outputCensus(plan));C.checkOutputs(captured);
  writeFileSync(pub,'BYTES');assert.throws(()=>C.checkOutputs(captured));
});

test('output count, byte, disappearance, directory and symlink controls',t=>{
  const {plan}=fixture(t),dir=plan.outputDirectories[0];mkdirSync(plan.operationDirectory);mkdirSync(dir);
  const p=path.join(dir,'payload'),observed=new Map();writeFileSync(p,'old');C.outputCensus(plan,observed);
  renameSync(p,p+'.preserved');writeFileSync(p,'old');assert.throws(()=>C.outputCensus(plan,observed),/replaced/u);
  const link=path.join(dir,'link');symlinkSync(p,link);assert.throws(()=>C.outputCensus(plan),/symlink/u);rmSync(link);
  truncateSync(p,67108865);assert.throws(()=>C.outputCensus(plan),/byte limit/u);truncateSync(p,1);
  writeFileSync(path.join(plan.operationDirectory,'launcher-stderr.log'),'');truncateSync(path.join(plan.operationDirectory,'launcher-stderr.log'),16777217);assert.throws(()=>C.outputCensus(plan),/byte limit/u);
});

test('empty stage logs hash successfully without becoming valid source bindings',t=>{
  const {root}=fixture(t),p=path.join(root,'empty.log');writeFileSync(p,'');
  const value=C.readBound(p,digest(Buffer.alloc(0)));assert.equal(value.bytes,0);assert.throws(()=>C.binding(C.clean(value)));
});

test('output directory identity and finite file census are retained',t=>{
  const {plan}=fixture(t);mkdirSync(plan.operationDirectory);mkdirSync(plan.outputDirectories[0]);const observed=new Map();C.outputCensus(plan,observed);
  renameSync(plan.outputDirectories[0],plan.outputDirectories[0]+'.preserved');mkdirSync(plan.outputDirectories[0]);assert.throws(()=>C.outputCensus(plan,observed),/directory replaced/u);
  for(let n=0;n<513;n++)writeFileSync(path.join(plan.outputDirectories[0],String(n)),'x');assert.throws(()=>C.outputCensus(plan),/file count/u);
});

test('registered descendants are distinguished from competing science',()=>{
  const rows=[{pid:10,ppid:1,command:'coordinator'},{pid:11,ppid:10,command:'run-f6c-synthetic-child'},{pid:12,ppid:11,command:'eom_native_test_cli'}];
  C.noCompetitor(rows,10);assert.throws(()=>C.noCompetitor([...rows,{pid:20,ppid:1,command:'run-f5-evolution'}],10));
  assert.throws(()=>C.noCompetitor([...rows,{pid:20,ppid:1,command:'f6c-bounded-operation'}],10));
});

test('prior stdout dataflow binds one predecessor and counts appended arguments',()=>{
  const prior={stageId:'producer',stdoutLog:b('/private/tmp/producer/runner-stdout.log')},plan=b('/private/tmp/plan.json');
  const args=C.stageArguments(['--registered','reader'],prior,'123',plan);assert.equal(args.length,8);assert.deepEqual(JSON.parse(args.at(-3)),prior);assert.deepEqual(JSON.parse(args.at(-1)),plan);
  assert.equal(C.stageArguments([],null,'123',plan).at(-3),'null');
  assert.throws(()=>C.stageArguments(['--operation-prior-stdout'],null,'123',plan));
  assert.throws(()=>C.stageArguments(['--operation-deadline-ns=4'],null,'123',plan));
  assert.throws(()=>C.stageArguments(['--operation-plan-binding'],null,'123',plan));
  assert.throws(()=>C.stageArguments(Array(59).fill('x'),null,'123',plan));
  assert.throws(()=>C.stageArguments(['x'.repeat(65536)],null,'123',plan));
  assert.throws(()=>C.stageArguments([],{...prior,accepted:true},'123',plan));
});

test('write-once operation receipt retains foreign bytes and obeys deadline callback',t=>{
  const {root}=fixture(t),p=path.join(root,'operation.json');C.writeNew(p,{accepted:false});const raw=readFileSync(p);
  assert.throws(()=>C.writeNew(p,{accepted:true}));assert.deepEqual(readFileSync(p),raw);
  const partial=path.join(root,'partial.json');assert.throws(()=>C.writeNew(partial,{accepted:false},()=>{throw Error('deadline');}));assert.ok(lstatSync(partial).isFile());
});

test('production entries reject absent or invented actual lifetime before any work',async()=>{
  for(const lifetime of [undefined,null,{},Object.freeze({began:1,deadlineNanoseconds:'1',live(){}})]){
    assert.throws(()=>C.assertLifetime(lifetime),/canonical C-owned/u);
    await assert.rejects(C.runBoundedOperation({lifetime}),/canonical C-owned/u);
    await assert.rejects(C.coordinate({lifetime}),/canonical C-owned/u);
    await assert.rejects(C.closeUnexpectedProcesses({lifetime}),/canonical C-owned/u);
  }
});

test('direct CLI has exact flags, absolute plan and explicit hashes',()=>{
  assert.deepEqual(C.parseArguments(['--plan','/private/tmp/plan.json','--plan-sha256','a'.repeat(64),'--self-sha256','b'.repeat(64)]),{planPath:'/private/tmp/plan.json',planSha256:'a'.repeat(64),selfSha256:'b'.repeat(64)});
  for(const args of [[],['--help'],['--plan','relative','--plan-sha256','a'.repeat(64),'--self-sha256','b'.repeat(64)],['--plan','/tmp/p','--plan-sha256','bad','--self-sha256','b'.repeat(64)]])assert.throws(()=>C.parseArguments(args));
});

test('created receipt cannot be replaced with byte-identical foreign output',t=>{
  const {root}=fixture(t),p=path.join(root,'operation.json');let once=false;
  assert.throws(()=>C.writeNew(p,{accepted:false},()=>{if(!once){once=true;renameSync(p,p+'.preserved');writeFileSync(p,'{"accepted":false}\n');}}),/replaced/u);
  assert.equal(readFileSync(p,'utf8'),'{"accepted":false}\n');assert.ok(lstatSync(p+'.preserved').isFile());
});

test('one public file cannot satisfy both sides of a publication alias',t=>{
  const {plan}=fixture(t),dir=plan.outputDirectories[0];mkdirSync(dir);mkdirSync(plan.operationDirectory);
  const pub=path.join(dir,'partial.'+'a'.repeat(32));writeFileSync(pub,'x');linkSync(pub,path.join(plan.operationDirectory,'foreign-hardlink'));
  plan.publicationAliases=[{publicPath:pub,privateDirectory:dir,privatePrefix:'partial.'}];assert.throws(()=>C.outputCensus(plan),/undeclared/u);
});

test('pure hook guards block ordinary and low-level process creation',async()=>{
  for(const name of ['node:child_process','node:worker_threads','node:cluster'])await assert.rejects(C.pureHook(()=>import(name)),/cannot create/u);
  await assert.rejects(C.pureHook(()=>process.binding('spawn_sync')),/denied/u);
  await assert.rejects(C.pureHook(()=>process.getBuiltinModule('child_process')),/denied/u);
  assert.equal(await C.pureHook(async()=>({accepted:true})).then(x=>x.accepted),true);
});

test('renewed-clock cleanup interface has no unguarded fallback',async()=>{
  let called=false;
  await assert.rejects(C.closeUnexpectedProcesses({inspect:async()=>{called=true;return[];},select:x=>x,ownPid:1,clock:()=>0,delay:async()=>{},signal:()=>{called=true;}}),/canonical C-owned/u);
  assert.equal(called,false);
});

// Source-fragment controls execute only these actual inert function bodies with
// literal clocks/actions and explicit fake handles. They do not import a K
// candidate, start a Worker/child, or establish measured lifecycle closure.
const source=readFileSync(new URL('../scripts/eom/f6c-bounded-operation.mjs',import.meta.url),'utf8');
const fragment=(start,end)=>{const a=source.indexOf(start),z=source.indexOf(end,a+start.length);assert.ok(a>=0&&z>a);return source.slice(a,z);};
const checked=(ok,message)=>{if(!ok)throw Error(message);};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const exactKeys=(o,wanted)=>assert.deepEqual(Object.keys(o).sort(),[...wanted].sort());

test('writer optional original identity is exact and default binding remains clean',t=>{
  const {root}=fixture(t),p=path.join(root,'ordinary.json'),q=path.join(root,'identified.json');
  exactKeys(C.writeNew(p,{accepted:false}),['path','sha256','bytes']);
  const result=C.writeNew(q,{accepted:false},()=>{},true),st=lstatSync(q,{bigint:true});
  exactKeys(result,['path','sha256','bytes','identity']);
  assert.equal(result.identity,[st.dev,st.ino,st.size,st.mtimeNs,st.ctimeNs].join(':'));
  assert.deepEqual(C.clean(result),actual(q));
  const lock=path.join(root,'lock');C.writeNew(lock,{pid:100,started:'R'},()=>{},true);
  assert.equal(readFileSync(lock,'utf8'),'{"pid":100,"started":"R"}\n');
});

test('writer rejects every non-Boolean option before opening output',t=>{
  const {root}=fixture(t);let n=0;
  for(const option of [null,0,1,'true',{},new Boolean(true)]){
    const p=path.join(root,'invalid-'+n++);assert.throws(()=>C.writeNew(p,{},()=>{},option),/Boolean/u);assert.equal(fs.existsSync(p),false);
  }
});

test('initial output fstat exception closes original descriptor and retains path',t=>{
  const {root}=fixture(t),p=path.join(root,'stat-failure.json');let opened,closes=0;
  const code=fragment('export function writeNew(', '\nexport async function pureHook').replace(/^export /u,'');
  const write=runInNewContext(code+'\nwriteNew',{Buffer,LIMITS:C.LIMITS,path,constants:fs.constants,check:checked,absolute:()=>{},realpathSync,
    lstatSync,openSync:(...args)=>(opened=fs.openSync(...args)),fstatSync:()=>{throw Error('injected original stat');},
    closeSync:fd=>{assert.equal(fd,opened);closes++;fs.closeSync(fd);},writeSync:fs.writeSync,fsyncSync:fs.fsyncSync,readBound:C.readBound,sha:digest,identity:()=>{},clean:C.clean});
  assert.throws(()=>write(p,{}),/injected original stat/u);assert.equal(closes,1);assert.ok(lstatSync(p).isFile());assert.throws(()=>fs.fstatSync(opened),{code:'EBADF'});
});

test('publication original token is inserted before first observation and cannot be replaced',()=>{
  const code=fragment('function validatePublicationIdentity(', '\nfunction lifetimeFileWorker');
  const result={path:'/fixture/output.json',sha256:'a'.repeat(64),bytes:40,identity:'7:11:40:31:37'};
  let current=result.identity,observations=0;
  const captureUnion=(bindings,ids,live)=>{assert.equal(ids[result.path],result.identity);observations++;live();assert.equal(current,ids[result.path],'original publication mismatch');return{sources:bindings,identities:ids};};
  const remember=runInNewContext(code+'\nrememberPublication',{check:checked,keys:exactKeys,binding:C.binding,clean:C.clean,sourceUnion:C.sourceUnion,captureUnion});
  const state=()=>({sourceMap:new Map(),sourceIdentities:{},observed:new Map(),live(){assert.equal(this.sourceIdentities[result.path],result.identity);}});
  const s=state();assert.deepEqual(remember(s,result),result);assert.equal(observations,1);
  for(const identity of ['7:12:40:31:37','7:11:40:32:37','7:11:40:31:38']){current=identity;const rejected=state();assert.throws(()=>remember(rejected,result),/original publication mismatch/u);assert.equal(rejected.sourceIdentities[result.path],result.identity);}
  for(const identity of [null,12,'7:11:41:31:37','07:11:40:31:37','7:11:40:31','7:11:40:31:37:9'])assert.throws(()=>remember(state(),{...result,identity}));
  assert.throws(()=>remember(state(),{...result,extra:true}));
});

function inertLifetime(control=false){
  const clock={now:1001.125},events=new EventEmitter(),workers=[],exits=[];
  const process={pid:100,cwd:()=>'/fixture',hrtime:{bigint:()=>5000000000n},on:events.on.bind(events),emit:events.emit.bind(events),exit:code=>{exits.push(code);throw Object.assign(Error('literal self exit'),{code});}};
  class FakeWorker extends EventEmitter{constructor(code,options){super();this.code=code;this.options=options;workers.push(this);}}
  const make=runInNewContext(fragment('function makeLifetime(', '\nfunction bindLifetimeSources')+'\nmakeLifetime',{
    path,performance:{now:()=>clock.now},process,AbortController,Buffer,Worker:FakeWorker,
    DEFAULT_PROFILE:Object.freeze({name:'default',inclusiveMilliseconds:1800000,workMilliseconds:1770000,kWorkMilliseconds:1755000}),
    CONTROL_PROFILE:Object.freeze({name:'fixed-control-plan',inclusiveMilliseconds:120000,workMilliseconds:90000,kWorkMilliseconds:75000}),WHOLE_GUARD_SOURCE:'inert-not-executed',
    LIVE_LIFETIMES:new WeakSet(),LIFETIME_STATE:new WeakMap(),check:checked,equal:same,sha:digest,setTimeout,clearTimeout});
  return{clock,workers,exits,s:make(1000,control?'125000000000':'1805000000000',control)};
}

test('literal inherited clock cutoffs and conservative bridge use no real worker',()=>{
  const {clock,workers,s}=inertLifetime();assert.equal(workers.length,1);
  assert.equal(workers[0].options.workerData.work,'1774998875000');assert.equal(workers[0].options.workerData.end,'1804998875000');
  s.activeK=true;clock.now=1755999;assert.doesNotThrow(()=>s.live());clock.now=1756000;assert.throws(()=>s.live(),/deadline/u);
  clock.now=1770999;assert.doesNotThrow(()=>s.live('cleanup'));assert.equal(s.remainingMs('cleanup'),1);clock.now=1771000;assert.throws(()=>s.live('cleanup'),/deadline/u);
  s.activeK=false;clock.now=1770999;assert.doesNotThrow(()=>s.live());clock.now=1771000;assert.throws(()=>s.live(),/deadline/u);
  clock.now=1800999;assert.doesNotThrow(()=>s.live('cleanup'));assert.equal(s.remainingMs('cleanup'),1);clock.now=1801000;assert.throws(()=>s.live('cleanup'),/deadline/u);
});

test('ready acknowledgment is exact and failure never turns back into work success',async()=>{
  const {workers,s}=inertLifetime();assert.equal(s.guardReady,false);
  const data=workers[0].options.workerData;workers[0].emit('message',{kind:'whole-guard-ready',...data});await s.ready();assert.equal(s.guardReady,true);
  s.fail(Error('first'));const first=s.failure;assert.throws(()=>s.live(),/first/u);assert.doesNotThrow(()=>s.live('cleanup'));
  // Supply a plain hostile record through the same-realm error constructor so
  // the fragment control does not confuse VM realm conversion with evidence.
  const second=new first.constructor('second');second.ambiguousGroup={rows:[{pid:303}],complete:true};s.fail(second);
  assert.equal(s.failure,first);assert.equal(s.ambiguity.rows[0].pid,303);
});

test('full H worker promise remains pending through termination and rejected closure stays unresolved',async()=>{
  const run=runInNewContext(fragment('function lifetimeFileWorker(', '\nasync function lifetimeRegistered')+'\nlifetimeFileWorker',
    {Buffer,AbortSignal,check:checked,rememberPublication:()=>{throw Error('not a publication control');}});
  const make=()=>{const {s}=inertLifetime(),bytes=Buffer.from('literal controlled source');s.mode='streamed';s.caller={path:'/fixture/caller.mjs',sha256:digest(bytes),data:bytes};s.sourceMap.set(s.caller.path,{path:s.caller.path,sha256:s.caller.sha256,bytes:bytes.length});return{s,bytes};};
  const positive=make();let finish;positive.s.H={runFileWorker:()=>new Promise(resolve=>{finish=resolve;})};
  const pending=run(positive.s,{kind:'capture'},positive.bytes);assert.ok(positive.s.pending.size>0);finish({captured:true});assert.equal((await pending).captured,true);assert.equal(positive.s.pending.size,0);
  const negative=make();let reject;negative.s.H={runFileWorker:()=>new Promise((_,fail)=>{reject=fail;})};
  const failed=run(negative.s,{kind:'capture'},negative.bytes);reject(Error('termination uncertain'));await assert.rejects(failed,/termination uncertain/u);
  assert.equal(negative.s.workerClosureFailures.length,1);assert.equal(negative.s.pending.size,0);
  const stop=runInNewContext(fragment('async function stopLifetimeObservations(', '\nfunction checkLifetimeLock')+'\nstopLifetimeObservations',{clearInterval,check:checked});
  await assert.rejects(stop(negative.s,'cleanup'),/unresolved termination/u);
});

test('fixed control profile contracts every nested cutoff without altering science limits',()=>{
  const {clock,workers,s}=inertLifetime(true);assert.equal(C.LIMITS.inclusiveMilliseconds,1800000);
  assert.equal(s.profile.name,'fixed-control-plan');assert.equal(Object.isFrozen(s.profile),true);
  assert.deepEqual([s.kWorkEnd,s.workEnd,s.end],[76000,91000,121000]);
  assert.equal(workers[0].options.workerData.work,'94998875000');assert.equal(workers[0].options.workerData.end,'124998875000');
  s.activeK=true;clock.now=75999;assert.doesNotThrow(()=>s.live());clock.now=76000;assert.throws(()=>s.live(),/deadline/u);
  clock.now=90999;assert.equal(s.remainingMs('cleanup'),1);clock.now=91000;assert.throws(()=>s.live('cleanup'),/deadline/u);
  s.activeK=false;clock.now=120999;assert.equal(s.remainingMs('cleanup'),1);clock.now=121000;assert.throws(()=>s.live('cleanup'),/deadline/u);
});

test('finite control CLI accepts no arbitrary duration or mixed-mode fallback',()=>{
  const parse=runInNewContext(fragment('function parseWholeArguments(', '\nasync function wholeAttemptMain')+'\nparseWholeArguments',
    {parseArguments:C.parseArguments,absolute:()=>{},hashToken:h=>assert.match(h,/^[a-f0-9]{64}$/u),check:checked});
  const fixed=['--control-plan','/fixture/plan.json','--plan-sha256','a'.repeat(64),'--self-sha256','b'.repeat(64)];
  const parsed=parse(fixed);assert.equal(parsed.mode,'plan');assert.equal(parsed.control,true);assert.equal(parsed.planPath,'/fixture/plan.json');
  for(const bad of [fixed.slice(0,-1),[...fixed,'--duration','120'],['--control-plan=120',...fixed.slice(1)],['--plan',...fixed.slice(1),'--control-plan'],['--control-plan','--streamed',...fixed.slice(2)]])assert.throws(()=>parse(bad));
  const main=fragment('async function wholeAttemptMain(){','\nif(process.argv[1]');
  assert.ok(main.indexOf('entryHr=process.hrtime.bigint()')<main.indexOf("process.argv[2]==='--control-plan'"));
  assert.ok(main.indexOf("process.argv[2]==='--control-plan'")<main.indexOf('makeLifetime('));
  assert.ok(main.indexOf('await s.ready()')<main.indexOf('parseWholeArguments('));
});

test('actual unexpected guard-exit event marks local failure and only exits self',()=>{
  const {workers,exits,s}=inertLifetime();let aborted=0;s.activeK=true;s.lock={path:'/fixture/held-lock'};
  s.abort.signal.addEventListener('abort',()=>aborted++);
  assert.throws(()=>workers[0].emit('exit',1),{code:125});assert.deepEqual(exits,[125]);assert.equal(aborted,0);
  assert.equal(s.guardExited,true);assert.equal(s.unexpectedGuardExit,true);assert.equal(s.lock.path,'/fixture/held-lock');assert.equal(s.lockReleased,false);
});

test('scoped stderr charges outward copies and waits for actual callbacks',()=>{
  const writes=[],callbacks=[],stream={write(chunk,encoding,callback){writes.push({chunk,encoding});callbacks.push(callback);return false;}};
  const original=stream.write;
  const api=runInNewContext(fragment('function installLifetimeStderr(', '\nfunction ownedLifetimeRows')+'\n({installLifetimeStderr,restoreLifetimeStderr})',
    {process:{stderr:stream},Buffer,Uint8Array,LIMITS:C.LIMITS,check:checked,lifetimeCensus:s=>({logBytes:s.retained+s.outwardStderrBytes})});
  const s={retained:100,outwardStderrBytes:0,stderrPending:0,stderrFailure:null,phase:'work',live(){},fail(error){this.failure=error;}};
  api.installLifetimeStderr(s);let delivered=0;
  assert.equal(stream.write('x'.repeat(100),'utf8',()=>delivered++),false);assert.equal(s.retained+s.outwardStderrBytes,200);assert.equal(s.stderrPending,1);
  assert.equal(writes[0].encoding,'utf8');assert.equal(writes[0].chunk,'x'.repeat(100));assert.throws(()=>api.restoreLifetimeStderr(s),/callbacks unresolved/u);
  callbacks.shift()();assert.equal(delivered,1);assert.equal(s.stderrPending,0);api.restoreLifetimeStderr(s);assert.equal(stream.write,original);
  const edge={...s,retained:16777116,outwardStderrBytes:0,stderrOriginal:null,stderrWrapper:null};api.installLifetimeStderr(edge);
  stream.write(Buffer.alloc(100));assert.equal(edge.retained+edge.outwardStderrBytes,16777216);assert.throws(()=>stream.write('x'),/allowance/u);
  callbacks.shift()();api.restoreLifetimeStderr(edge);
});

test('verified empty output log has an identity without becoming a positive-byte source',()=>{
  const helper=runInNewContext(fragment('function validatePublicationIdentity(', '\nfunction rememberPublication')+'\ncapturedOutputIdentities',
    {check:checked,keys:exactKeys,absolute:p=>assert.equal(p,'/fixture/runner-stderr.log'),hashToken:h=>assert.match(h,/^[a-f0-9]{64}$/u),LIMITS:C.LIMITS});
  const row={path:'/fixture/runner-stderr.log',sha256:'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',bytes:0,identity:'7:11:0:31:37'};
  assert.equal(helper([row])[row.path],'7:11:0:31:37');assert.throws(()=>C.originalIdentities([row]),/source binding/u);
  for(const bad of [{...row,bytes:-1},{...row,bytes:false},{...row,identity:'7:11:1:31:37'},{...row,sha256:'bad'}])assert.throws(()=>helper([bad]));
  assert.throws(()=>helper([row,row]),/duplicate/u);
});

test('lost RSS gap remains failure while a bounded cleanup observation is scheduled',async()=>{
  const start='  s.timer=setInterval(()=>{',end='\n  },250);';let body=fragment(start,end).slice(start.length);
  // fragment excludes its end marker, so this is only the actual callback body.
  const events=[],s={phase:'work',rss:{lastSampleStartedMs:0},nextHost:5000,
    live(phase){events.push(['live',phase]);},fail(error){this.phase='cleanup';this.failure=error;events.push(['failure']);}};
  const tick=runInNewContext('(s)=>{'+body+'\n}',{performance:{now:()=>2001},Error,check:checked,lifetimeTable:async(_,phase)=>{events.push(['table',phase]);return[];},lifetimeHost:async()=>{},lifetimeLog:()=>{},lifetimeCensus:()=>({})});
  tick(s);assert.match(s.failure.message,/lost whole-attempt/u);assert.ok(events.some(([kind,phase])=>kind==='table'&&phase==='cleanup'));await s.rssJob;
});

test('publication and raw rejection log quotas reject before output creation',()=>{
  let census={files:[],scientificBytes:0,logBytes:0};
  const preflight=runInNewContext(fragment('function preflightNewOutput(', '\nfunction lifetimeFileWorker')+'\npreflightNewOutput',
    {check:checked,absolute:p=>assert.ok(p.startsWith('/fixture/outer/')),beneath:(p,d)=>p.startsWith(d+'/'),existsSync:()=>false,LIMITS:C.LIMITS,lifetimeCensus:()=>census});
  const s={phase:'cleanup',live(){},layout:{operationDirectory:'/fixture/outer'},logPaths:['/fixture/outer/rejection.json']};
  census={files:Array(511),scientificBytes:67108863,logBytes:16777215};
  assert.doesNotThrow(()=>preflight(s,'/fixture/outer/operation.json',1));assert.doesNotThrow(()=>preflight(s,'/fixture/outer/rejection.json',1));
  assert.throws(()=>preflight(s,'/fixture/outer/operation.json',2),/bytes before/u);assert.throws(()=>preflight(s,'/fixture/outer/rejection.json',2),/bytes before/u);
  census={files:Array(512),scientificBytes:0,logBytes:0};assert.throws(()=>preflight(s,'/fixture/outer/operation.json',1),/path allowance/u);
  const rejection=fragment('async function rejectLifetime(', '\nexport async function runBoundedOperation');
  assert.ok(rejection.indexOf('preflightNewOutput(s,filename,raw.length)')<rejection.indexOf('writeNew(filename,record'));
});

test('v2 prior declaration is closed and may name its already captured plan',t=>{
  const {root,plan}=fixture(t),p=path.join(root,'plan.json');
  const v2={...plan,schema:'braid-program/f6c-bounded-operation-plan.v2',priorArtifacts:[{path:p,classification:'scientific'}]};
  assert.ok(C.validatePlan(v2,root).length>0);
  const captured={...b(p),bytes:71},ids={[p]:'7:11:71:31:37'};
  assert.throws(()=>C.derivePriorContext(v2,[],{}),/absent from captured/u);
  const context=C.derivePriorContext(v2,[captured],ids);
  assert.equal(context.scientificBytes,71);assert.equal(context.pathCount,1);assert.equal(context.artifacts[0].identity,ids[p]);
  assert.ok(Object.isFrozen(context)&&Object.isFrozen(context.artifacts)&&Object.isFrozen(context.artifacts[0]));
  for(const mutate of [v=>delete v.priorArtifacts,v=>v.priorArtifacts[0].bytes=0,v=>v.priorArtifacts[0].classification='other',
    v=>v.priorArtifacts.push({...v.priorArtifacts[0]}),v=>v.priorArtifacts[0].path=v.operationDirectory+'/prior',v=>v.schema='unknown']){
    const invalid=structuredClone(v2);mutate(invalid);assert.throws(()=>C.validatePlan(invalid,root));
  }
  assert.throws(()=>C.validatePlan({...plan,priorArtifacts:[]},root));
  assert.deepEqual(C.derivePriorContext(plan,[],{}),{artifacts:[],pathCount:0,physicalFiles:0,scientificBytes:0,retainedLogBytes:0});
});

test('prior context derives literal byte totals and rejects aliases and uncaptured identities',()=>{
  const plan={schema:'braid-program/f6c-bounded-operation-plan.v2',operationDirectory:'/fixture/outer',outputDirectories:['/fixture/data'],
    priorArtifacts:[{path:'/fixture/old-science',classification:'scientific'},{path:'/fixture/old-log',classification:'log'}]};
  const sources=[{...b('/fixture/old-science'),bytes:4194304},{...b('/fixture/old-log'),bytes:8388608}],ids={'/fixture/old-science':'7:11:4194304:31:37','/fixture/old-log':'7:12:8388608:31:37'};
  const c=C.derivePriorContext(plan,sources,ids);assert.deepEqual([c.pathCount,c.physicalFiles,c.scientificBytes,c.retainedLogBytes],[2,2,4194304,8388608]);
  assert.throws(()=>C.derivePriorContext(plan,sources,{...ids,'/fixture/old-log':'7:11:8388608:31:37'}),/physical alias/u);
  assert.throws(()=>C.derivePriorContext(plan,sources,{}),/captured/u);
  assert.throws(()=>C.derivePriorContext(plan,sources,{...ids,'/fixture/old-log':'7:12:1:31:37'}),/identity/u);
  const overflow=[{...sources[0],bytes:67108865},sources[1]];
  assert.throws(()=>C.derivePriorContext(plan,overflow,{...ids,'/fixture/old-science':'7:11:67108865:31:37'}),/byte limits/u);
});

test('prior files remain inputs across repeated census and exact generation checks',t=>{
  const {root,plan}=fixture(t),prior=path.join(root,'prior.json');writeFileSync(prior,'prior');
  const v2={...plan,schema:'braid-program/f6c-bounded-operation-plan.v2',priorArtifacts:[{path:prior,classification:'scientific'}]},captured=C.captureUnion([actual(prior)]),context=C.derivePriorContext(v2,captured.sources,captured.identities);
  mkdirSync(plan.operationDirectory);mkdirSync(plan.outputDirectories[0]);const current=path.join(plan.outputDirectories[0],'current');writeFileSync(current,'new');
  assert.throws(()=>C.outputCensus(v2),/requires captured prior/u);
  for(let n=0;n<100;n++){const c=C.outputCensus(v2,new Map(),context);assert.deepEqual(c.files.map(f=>f.path),[current]);assert.equal(c.scientificBytes,8);assert.equal(c.currentScientificBytes,3);assert.equal(c.combinedOutputPaths,2);assert.equal(c.combinedPhysicalFiles,2);}
  const outputs=C.captureOutputs(C.outputCensus(v2,new Map(),context));assert.deepEqual(outputs.map(f=>f.path),[current]);
  for(const changed of [{...context,scientificBytes:0},{...context,pathCount:-1},{...context,physicalFiles:0},
    {...context,artifacts:[]},{...context,artifacts:[...context.artifacts,...context.artifacts]},
    {...context,artifacts:[{...context.artifacts[0],classification:'log'}]}])assert.throws(()=>C.outputCensus(v2,new Map(),changed));
  renameSync(prior,prior+'.preserved');writeFileSync(prior,'prior');assert.throws(()=>C.outputCensus(v2,new Map(),context),/prior artifact changed/u);
  const symlink=path.join(root,'linked');symlinkSync(prior,symlink);assert.throws(()=>C.captureUnion([actual(symlink)]),/symlink/u);
  const empty={...v2,priorArtifacts:[]},zero=C.derivePriorContext(empty,[],{});assert.equal(C.outputCensus(empty,new Map(),zero).scientificBytes,3);
});

test('literal combined limits include old bytes and current outward traffic without accumulation',()=>{
  const plan={schema:'braid-program/f6c-bounded-operation-plan.v2',operationDirectory:'/fixture/outer',outputDirectories:['/fixture/data'],
    priorArtifacts:[{path:'/fixture/old-science',classification:'scientific'},{path:'/fixture/old-log',classification:'log'}]};
  const sources=[{...b('/fixture/old-science'),bytes:4194304},{...b('/fixture/old-log'),bytes:8388608}],ids={'/fixture/old-science':'7:11:4194304:31:37','/fixture/old-log':'7:12:8388608:31:37'};
  const prior=C.derivePriorContext(plan,sources,ids),plain=x=>JSON.parse(JSON.stringify(x));
  const combine=runInNewContext(fragment('function applyPriorContext(', '\nexport function outputCensus')+'\napplyPriorContext',{
    check:checked,keys:exactKeys,LIMITS:C.LIMITS,equal:(a,b)=>{try{assert.deepEqual(plain(a),plain(b));return true;}catch{return false;}},
    derivePriorContext:(p,s,i)=>C.derivePriorContext(plain(p),plain(s),plain(i)),
    lstatSync:p=>({isFile:()=>true,isSymbolicLink:()=>false,token:ids[p]}),realpathSync:p=>p,identity:st=>st.token});
  const current={files:[],directories:[],scientificBytes:62914560,retainedLogBytes:4194304,logBytes:8388608,physicalFiles:0};
  for(let n=0;n<100;n++){const c=combine(plan,current,prior);assert.equal(c.scientificBytes,67108864);assert.equal(c.retainedLogBytes,12582912);assert.equal(c.logBytes,16777216);assert.equal(c.currentLogBytes,8388608);}
  assert.throws(()=>combine(plan,{...current,scientificBytes:62914561},prior),/combined/u);
  assert.throws(()=>combine(plan,{...current,logBytes:8388609},prior),/combined/u);
  assert.throws(()=>combine(plan,{...current,files:[{inode:'7:11'}]},prior),/aliases prior/u);
});

test('combined path reserve precedes initial logs, publication and registered logs',()=>{
  let census={files:Array(501),combinedOutputPaths:511,scientificBytes:0,logBytes:0};
  const preflight=runInNewContext(fragment('function preflightNewOutput(', '\nfunction lifetimeFileWorker')+'\npreflightNewOutput',
    {check:checked,absolute:()=>{},beneath:()=>true,existsSync:()=>false,LIMITS:C.LIMITS,lifetimeCensus:()=>census});
  const state={phase:'work',live(){},layout:{operationDirectory:'/fixture/outer'},logPaths:[]};
  assert.doesNotThrow(()=>preflight(state,'/fixture/outer/operation.json',1));
  census={...census,files:Array(502),combinedOutputPaths:512};assert.throws(()=>preflight(state,'/fixture/outer/operation.json',1),/path allowance/u);
  const start=fragment('async function startLifetimeAccounting(', '\nfunction readDirectoryIdentity');
  assert.ok(start.indexOf('two initial log paths fit combined allowance')<start.indexOf('mkdirSync(layout.operationDirectory'));
  assert.ok(start.indexOf('two initial log paths fit combined allowance')<start.indexOf("s.logFD=openLog('launcher-stderr.log')"));
  const registered=fragment('async function lifetimeRegistered(', '\nasync function lifetimeCheckpoint');
  assert.ok(registered.indexOf('two registered log paths fit combined allowance')<registered.indexOf('s.outer.superviseRegisteredPilot'));
  for(const prior of [510,511,512])assert.equal(prior+2<=512,prior===510);
  const worker=fragment('function lifetimeFileWorker(', '\nasync function lifetimeRegistered');
  assert.match(worker,/runFileWorker\(\{\.\.\.job,deadlineNanoseconds:s\.deadlineNanoseconds,priorContext:s\.priorContext\}/u);
  assert.match(fragment('export async function fileOperation(', '\n// PRIVATE SOURCE CANDIDATE'),/outputCensus\(job\.plan,new Map\(\),job\.priorContext\)/u);
});

// Tiny inert controls only: no registered subprocesses or numerical dispatch.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,renameSync,linkSync,symlinkSync,
  rmSync,realpathSync,lstatSync,truncateSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
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

test('production entry rejects missing original start/deadline before any work',async()=>{
  await assert.rejects(C.runBoundedOperation({}),/SHA-256/u);
  await assert.rejects(C.runBoundedOperation({selfSha256:'a'.repeat(64),planSha256:'b'.repeat(64)}),/begin/u);
  await assert.rejects(C.runBoundedOperation({selfSha256:'a'.repeat(64),planSha256:'b'.repeat(64),began:performance.now(),deadlineNanoseconds:'0'}),/deadline/u);
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

test('unexpected-process cleanup only signals verified births and excludes own PID',async()=>{
  let alive=true,clock=0;const signals=[],r={pid:2,ppid:1,pgid:2,started:'original',command:'synthetic'};
  const result=await C.closeUnexpectedProcesses({inspect:async()=>alive?[r]:[],select:rows=>rows,ownPid:1,clock:()=>clock,delay:async ms=>{clock+=ms;},signal:(pid,s)=>{signals.push([pid,s]);if(s==='SIGTERM')alive=false;}});
  assert.equal(result.processesClosed,true);assert.ok(signals.some(([,s])=>s==='SIGSTOP'));assert.ok(signals.every(([pid])=>pid===2));
  await assert.rejects(C.closeUnexpectedProcesses({inspect:async()=>[{...r,pid:1}],select:rows=>rows,ownPid:1}),/coordinator signal/u);
});

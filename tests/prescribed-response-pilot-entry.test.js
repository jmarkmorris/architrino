// Synthetic operational plumbing only; no response, history or root evaluation.
import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, symlinkSync,
  writeFileSync, renameSync, existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as E from '../scripts/eom/run-prescribed-response-pilot.mjs';

const ROOT=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const clone=value=>structuredClone(value),H='a'.repeat(64),EH='b'.repeat(64),LH='c'.repeat(64);
function fixture(t){
  const root=realpathSync(mkdtempSync(path.join(os.tmpdir(),'prescribed-entry-controls-')));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  mkdirSync(path.join(root,E.LANE),{recursive:true});
  const output=path.join(root,E.LANE,'prescribed-response-synthetic');mkdirSync(output+'-outer');
  const python=path.resolve(process.env.AAA_VENV??path.join(ROOT,'../.venv'),'bin/python');
  const pythonRealPath=realpathSync(python),node=realpathSync(process.execPath);
  const originalBindings=E.ORIGINALS.map(([role,p,sha256])=>({role,path:p?path.join(root,p):pythonRealPath,sha256:sha256??H,bytes:100}));
  const runtimeBindings=[{path:pythonRealPath,sha256:H,bytes:100},{path:path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'),sha256:H,bytes:100}];
  const operationalBindings=[E.ENTRY,E.ENTRY_TESTS,E.LAUNCH_TESTS,E.PROCESS_TESTS,E.LAUNCHER,E.OUTER,E.PUBLISHER,'tests/test_prescribed_acceleration_response_publication.py']
    .map(p=>({path:path.join(root,p),sha256:p===E.ENTRY?EH:p===E.LAUNCHER?LH:E.PINS[p]??H,bytes:100}))
    .concat([node,'/bin/ps','/usr/bin/memory_pressure'].map(p=>({path:p,sha256:H,bytes:100})));
  const plan={schema:'braid-program/prescribed-response-pilot-launch.v1',scope:'f5-release',originalBindings,operationalBindings,
    runtimeBindings,python,pythonRealPath,node,limits:{...E.LIMITS},
    platformTrust:'host OS and macOS shared-cache libraries; explicitly listed file-backed runtime dependencies only'};
  return {root,output,plan,entrySha256:EH,launcherSha256:LH,deadlineNanoseconds:String(process.hrtime.bigint()+60000000000n)};
}
function specJob(t,stage='compute'){
  const f=fixture(t),publicationJob={path:f.output+'-outer/publisher-job.json',sha256:H,bytes:100};
  const job={...f,stage,publicationJob};const spec=E.stageSpec({...job,budget:'100.123456789'});
  job.processReceipt={accepted:false,processesClosed:true,exit:{code:0,signal:null},gates:[{acknowledged:true,target:{pid:1},measurement:{code:0,signal:null},requestedCommand:spec.command,requestedArgs:spec.args}]};
  return {job,spec};
}
function measured(){return {startedAt:'2026-08-27T12:00:00Z',elapsedSeconds:5,exitCode:0,processesClosed:true,
  heartbeatSeconds:15,maximumSampledGroupRssBytes:1048576,rssSampleIntervalSeconds:0.5,outputBytes:0,logBytes:200,
  watcherSha256:LH,publicationComplete:true};}

test('closed first-pilot machine plan validates metadata only',t=>{
  const f=fixture(t);assert.equal(E.validatePlan(f.plan,f.root,LH,EH),f.plan);
  assert.equal(f.plan.originalBindings.length,19);assert.equal(E.planBindings(f.plan,f.root).length,31);
});
test('fixed original role order, paths, source hashes and complete census',t=>{
  const f=fixture(t);
  for(const mutate of [p=>p.originalBindings.pop(),p=>p.originalBindings.reverse(),p=>p.originalBindings[0].sha256=H,
    p=>p.originalBindings[0].path='/other/packet.json',p=>p.originalBindings[13].path='/other/python',
    p=>p.originalBindings[0].bytes=64*1024**2+1]){
    const p=clone(f.plan);mutate(p);assert.throws(()=>E.validatePlan(p,f.root,LH,EH));
  }
});
test('no altered scope, hidden strength, unknown fields or relaxed limits',t=>{
  const f=fixture(t);for(const mutate of [p=>p.scope='abc',p=>p.K=1,p=>p.limits.wallSeconds=1801,
    p=>p.limits.residentBytes++,p=>p.limits.rssSampleIntervalSeconds=2,p=>delete p.platformTrust]){
    const p=clone(f.plan);mutate(p);assert.throws(()=>E.validatePlan(p,f.root,LH,EH));}
});
test('operational generation and shared runtime context are mandatory',t=>{
  const f=fixture(t);for(const mutate of [p=>p.operationalBindings.pop(),p=>p.operationalBindings.push({...p.operationalBindings[0]}),
    p=>p.operationalBindings.find(b=>b.path.endsWith(E.PUBLISHER)).sha256=H,p=>p.runtimeBindings.pop(),
    p=>p.pythonRealPath='/unknown/python',p=>p.node='/unknown/node']){
    const p=clone(f.plan);mutate(p);assert.throws(()=>E.validatePlan(p,f.root,LH,EH));}
});
test('repeated binding path may not contradict size or hash',t=>{
  const f=fixture(t);f.plan.runtimeBindings[0].bytes++;
  assert.throws(()=>E.planBindings(f.plan,f.root),/conflicting/);
});
test('compute command is one isolated direct Python source with fixed inputs',t=>{
  const {job,spec}=specJob(t);assert.equal(spec.command,job.plan.python);
  assert.deepEqual(spec.args.slice(0,3),['-I','-B',path.join(job.root,E.CONSUMER)]);
  assert.equal(spec.args[spec.args.indexOf('--consumer-sha256')+1],E.PINS[E.CONSUMER]);
  assert.equal(spec.args[spec.args.indexOf('--out-dir')+1],job.output);
  assert.equal(spec.args[spec.args.indexOf('--watcher-sha256')+1],LH);
  assert.equal(spec.args.includes('--coupling'),false);assert.equal(spec.args.includes('--strength'),false);
});
test('publisher command consumes exact sibling job hash, not a new compute',t=>{
  const {job,spec}=specJob(t,'publisher');assert.deepEqual(spec.args.slice(0,3),['-I','-B',path.join(job.root,E.PUBLISHER)]);
  assert.equal(spec.args[spec.args.indexOf('--job')+1],job.publicationJob.path);
  assert.equal(spec.args[spec.args.indexOf('--job-sha256')+1],H);
  assert.equal(spec.args.includes('--consumer-sha256'),false);
});
test('stage budget, output lane and job location fail closed',t=>{
  const {job}=specJob(t,'publisher');for(const budget of ['0','-1','1800.1','NaN','1e-1000',''])assert.throws(()=>E.stageSpec({...job,budget}));
  for(const output of ['/tmp/prescribed-response-x',path.join(job.root,E.LANE,'nested/prescribed-response-x'),path.join(job.root,E.LANE,'not-response')])assert.throws(()=>E.stageSpec({...job,budget:'1',output}));
  assert.throws(()=>E.stageSpec({...job,budget:'1',publicationJob:{...job.publicationJob,path:job.output+'/publisher-job.json'}}));
  assert.throws(()=>E.stageSpec({...job,budget:'1',stage:'retry'}));
});
test('remaining budget cannot be exhausted or exceed the original cap',()=>{
  assert.throws(()=>E.remainingSeconds('0'));assert.throws(()=>E.remainingSeconds(String(process.hrtime.bigint()+1801000000000n)));
  const value=E.remainingSeconds(String(process.hrtime.bigint()+1000000000n));assert(Number(value)>0&&Number(value)<=1);
});
test('every child is detached and piped; entry never claims group closure',async()=>{
  const child=new EventEmitter();child.stdout=new EventEmitter();child.stderr=new EventEmitter();child.kill=()=>{};
  let invocation;const written=[];
  const pending=E.runSingleStage({command:'/test/python',args:['synthetic']},{root:'/test',out:{write:c=>written.push(c.toString())},err:{write:c=>written.push(c.toString())},
    spawnImpl:(...a)=>{invocation=a;return child;}});
  child.stdout.emit('data',Buffer.from('completion'));child.stderr.emit('data',Buffer.from('heartbeat'));child.emit('close',0,null);
  const result=await pending;assert.deepEqual(invocation[2],{cwd:'/test',detached:true,stdio:['ignore','pipe','pipe']});
  assert.deepEqual(result,{completed:true,accepted:false,logBytes:19});assert.equal('processesClosed' in result,false);
  assert.deepEqual(written,['completion','heartbeat']);
});
test('stage abnormal exit and log overflow cannot become successful',async()=>{
  for(const overflow of [false,true]){
    const c=new EventEmitter();c.stdout=new EventEmitter();c.stderr=new EventEmitter();let killed=false;c.kill=()=>{killed=true;};
    const p=E.runSingleStage({command:'synthetic',args:[]},{spawnImpl:()=>c,out:{write(){}},err:{write(){}}});
    if(overflow)c.stdout.emit('data',Buffer.alloc(E.LOG_LIMIT+1));c.emit('close',overflow?0:1,null);
    await assert.rejects(p);assert.equal(killed,overflow);
  }
});
test('lost gate, unsuccessful exit, changed command and unclosed groups rejected before files',t=>{
  const {job}=specJob(t);for(const mutate of [j=>j.processReceipt.processesClosed=false,j=>j.processReceipt.accepted=true,
    j=>j.processReceipt.gates=[],j=>j.processReceipt.gates.push({...j.processReceipt.gates[0]}),j=>j.processReceipt.gates[0].acknowledged=false,
    j=>j.processReceipt.gates[0].measurement.code=1,j=>j.processReceipt.gates[0].requestedArgs[0]='-O',j=>j.processReceipt.exit.signal='SIGTERM']){
    const j=clone(job);mutate(j);assert.throws(()=>E.admitStage(j));}
});
test('closed compute measurements required without invented output length',()=>{
  const c={elapsedSeconds:4};E.validateComputeExecution(measured(),c,LH);
  for(const [field,value] of [['elapsedSeconds',3],['elapsedSeconds',1800],['maximumSampledGroupRssBytes',0],['maximumSampledGroupRssBytes',2*1024**3],
    ['rssSampleIntervalSeconds',1.01],['heartbeatSeconds',10],['processesClosed',false],['publicationComplete',false],['exitCode',1],
    ['outputBytes',123],['watcherSha256',H],['logBytes',E.LOG_LIMIT+1]]){
    assert.throws(()=>E.validateComputeExecution({...measured(),[field]:value},c,LH),field);}
  assert.throws(()=>E.validateComputeExecution({...measured(),unknown:true},c,LH));
});
test('strict JSON rejects duplicate keys at any depth, trailing data and nonfinite values',()=>{
  for(const s of ['{"a":1,"a":2}','{"a":{"b":0,"b":1}}','[1,]','{"a":1,}','null {}','NaN','1e999','9007199254740993','"bad\nstring"'])assert.throws(()=>E.decode(Buffer.from(s)),s);
  assert.throws(()=>E.decode(Buffer.from([0xff])));assert.throws(()=>E.decode(Buffer.from('{}'),1));
  assert.equal(E.decode(Buffer.from('{"__proto__":4,"x":[true,null,"\\u0030"]}')).__proto__,4);
  assert.deepEqual(JSON.parse(JSON.stringify(E.decode(Buffer.from('{"x":[true,null,"\\u0030"]}')))),{x:[true,null,'0']});
});
test('strict JSON has a finite nesting bound',()=>assert.throws(()=>E.decode(Buffer.from('['.repeat(130)+'0'+']'.repeat(130))),/bounded/));
test('regular same-file bytes and exact SHA/size are checked',t=>{
  const {root}=fixture(t),p=path.join(root,'source');writeFileSync(p,'original');const b=E.readBound(p,E.sha(Buffer.from('original')),true);
  assert.equal(b.data.toString(),'original');assert.equal(b.bytes,8);assert.deepEqual(E.checkBindings([E.clean(b)]),[E.clean(b)]);
  assert.throws(()=>E.readBound(p,H));assert.throws(()=>E.checkBindings([{...E.clean(b),bytes:9}]));assert.throws(()=>E.readBound(p,undefined,true,2));
});
test('symlink, nonregular input and same-byte inode substitution fail',t=>{
  const {root}=fixture(t),p=path.join(root,'source'),link=path.join(root,'link');writeFileSync(p,'original');symlinkSync(p,link);
  assert.throws(()=>E.readBound(link));assert.throws(()=>E.readBound(root));let calls=0;
  assert.throws(()=>E.readBound(p,undefined,true,E.FILE_LIMIT,()=>{calls++;if(calls===2){renameSync(p,p+'.old');writeFileSync(p,'original');}}),/generation/);
});
test('source change during capture and expired capture deadline fail',t=>{
  const {root}=fixture(t),p=path.join(root,'source');writeFileSync(p,'original');let calls=0;
  assert.throws(()=>E.readBound(p,undefined,true,E.FILE_LIMIT,()=>{if(++calls===2)writeFileSync(p,'mutated!');}),/generation/);
  assert.throws(()=>E.readBound(p,undefined,true,E.FILE_LIMIT,()=>{throw Error('synthetic expired');}),/expired/);
});
test('exclusive durable mechanical publication never overwrites',t=>{
  const {root}=fixture(t),p=path.join(root,'control.json');const b=E.writeNew(p,{synthetic:true,accepted:false});
  assert.equal(E.readBound(p,b.sha256).bytes,b.bytes);assert.throws(()=>E.writeNew(p,{changed:true}));
  assert.equal(JSON.parse(readFileSync(p)).synthetic,true);
});
test('late publication fails without an admissible successful worker result',t=>{
  const {root}=fixture(t),p=path.join(root,'late-control.json');let n=0;
  assert.throws(()=>E.writeNew(p,{synthetic:true,accepted:false},1024,()=>{if(++n===3)throw Error('late fsync');}),/late/);
  // An incomplete/late immutable file is preserved; outer admission MUST reject
  // a missing worker result, late closure, or failed final hash. It is not proof.
  assert(existsSync(p));assert.equal(JSON.parse(readFileSync(p)).accepted,false);
});
test('file operation rejects expired deadline and incomplete final authority',()=>{
  assert.throws(()=>E.fileOperation({kind:'recheck',sources:[],deadlineNanoseconds:'0'}));
  assert.throws(()=>E.fileOperation({kind:'finalize',record:{accepted:true},deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)}));
});
test('publication cannot begin from an unclosed or unauthenticated compute',()=>{
  for(const compute of [null,{accepted:false},{accepted:true,stage:'compute'}])assert.throws(()=>E.fileOperation({kind:'prepare-publication',compute,deadlineNanoseconds:String(process.hrtime.bigint()+1000000000n)}));
});
test('all frozen source pins still match; entry imports no science or F6c module',()=>{
  for(const p of [E.CONSUMER,E.PUBLISHER,'tests/test_prescribed_acceleration_response_consumer.py','tests/test_prescribed_acceleration_response_publication.py',
    'scripts/eom/oracle/prescribed_acceleration_response.py'])assert.equal(E.sha(readFileSync(path.join(ROOT,p))),E.PINS[p]);
  const source=readFileSync(path.join(ROOT,E.ENTRY),'utf8');assert(!source.includes('evaluate_response('));
  assert(!/from ['"][^'"]*f6c/u.test(source));assert(!source.includes('proof_package('));
});
test('runtime inventory is metadata-only with explicit F5 standard-library closure',()=>{
  for(const module of ['ast','datetime','dataclasses','struct','decimal','fractions','typing'])assert(E.PYTHON_RUNTIME_INVENTORY.includes(module));
  assert(!E.PYTHON_RUNTIME_INVENTORY.includes('oracle'));assert(!E.PYTHON_RUNTIME_INVENTORY.includes('evaluate_response'));
  assert(E.PYTHON_RUNTIME_INVENTORY.includes("'scientificDataLoaded':False"));
  assert(E.PYTHON_RUNTIME_INVENTORY.includes("'scientificModulesExecuted':False"));
});

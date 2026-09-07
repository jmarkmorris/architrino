// Independent literal protocol controls. No coordinator or producer imports.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync,writeFileSync,renameSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {verifyClosure,capture,parseProcessTable} from '../scripts/eom/verify-f6c-bounded-operation-closure.mjs';
const h=raw=>createHash('sha256').update(raw).digest('hex');
const bind=(p,raw=Buffer.from('x'))=>({path:p,sha256:h(raw),bytes:raw.length});
export function fixture(){
 const coordinator={path:'/repo/scripts/eom/f6c-bounded-operation.mjs',sha256:'f3bbaf59b3fec7340a3b68097d6745fef589c777273558a71cfd8744cfeeb13a',bytes:81416};
 const invocation={schema:'braid-program/observed-bounded-invocation.v1',root:'/repo',coordinator,node:bind('/node'),plan:bind('/plan'),control:true};
 const lease={status:'completed',exitCode:0,exitSignal:null,processGroupClosed:true,error:null,stopReason:null,cwd:'/repo',command:'/node',args:[coordinator.path,'--control-plan','/plan','--plan-sha256',invocation.plan.sha256,'--self-sha256',coordinator.sha256],targetIdentity:{pid:10,pgid:10,started:'Mon Sep 7 01:00:00 2026'}};
 const runtime=[invocation.node],log=bind('/repo/operation/stage-stdout.log');
 const plan={schema:'braid-program/f6c-bounded-operation-plan.v1',root:'/repo',operationDirectory:'/repo/operation',stages:[{id:'first',runtimeBindings:runtime}]};
 const process={accepted:true,processesClosed:true,exit:{code:0,signal:null},signals:[],gates:[],runner:{pid:11,pgid:11,started:'Mon Sep 7 01:00:00 2026'},stdoutLog:log,
  guardClosed:true,rootGuard:{acknowledged:true},stdoutDroppedBytes:0,stderrDroppedBytes:0,admission:{accepted:true,h3EvidenceEligible:false,completionLog:log,runtimeBindings:runtime}};
 const sources=[coordinator,invocation.node,invocation.plan],operation={schema:'braid-program/f6c-bounded-operation.v2',accepted:false,ordinaryChecksPassed:true,wholeClosurePending:true,scope:'ordinary-operation-pending-whole-attempt',plan:invocation.plan,h3EvidenceEligible:false,physicalClaims:false,stages:[{id:'first',process}],sources};
 operation.limits={inclusiveMilliseconds:1800000,aggregateRSSBytes:2147483648,rssPollMilliseconds:250,maximumRSSGapMilliseconds:1000,heartbeatMilliseconds:15000,scientificBytes:67108864,combinedLogBytes:16777216,sourceFiles:512,sourceBytes:1073741824,outputFiles:512,serialWorkers:1,startFreePercent:40,startDiskBytes:68719476736,stopFreePercent:20,stopDiskBytes:17179869184};
 const operationRaw=Buffer.from(JSON.stringify(operation)+'\n'),operationBinding=bind('/repo/operation/operation.json',operationRaw);
 const resourceRaw=Buffer.from('{"kind":"observer-process-close","pid":12,"closed":true,"exit":{"code":0,"signal":null},"stdoutDroppedBytes":0,"stderrDroppedBytes":0}\n');
 const resource=bind('/repo/operation/resource-observations.ndjson',resourceRaw),outputs=[operationBinding,resource,log];
 const ids=rows=>Object.fromEntries(rows.map((b,i)=>[b.path,'1:'+(i+2)+':'+b.bytes+':4:5']));
 const wire={mode:'serial-plan',scope:'conditional-operational-completion',accepted:false,completed:false,ordinaryProcessesClosed:true,lockReleased:false,wholeGuardClosed:false,workersAndMonitorsClosed:false,failure:null,
  terminalClosure:{status:'pending-external-exit',requiredExitCode:0,lock:'held',wholeGuard:'armed'},wholeGuard:{owner:10,activeInclusiveMilliseconds:120000},budget:{activeInclusiveMilliseconds:120000},h3EvidenceEligible:false,physicalClaims:false,stderrCallbacksPending:0,
  observerProcesses:{count:1,closed:1,unresolved:[],completeRecordsPath:resource.path},operation:operationBinding,sourceBindings:sources,sourceIdentities:ids(sources),outputBindings:outputs,outputIdentities:ids(outputs)};
 Object.assign(wire,{samples:2,maximumSampledRSSBytes:1048576,maximumSampleGapMs:250,finalObservationToClosureMs:10,scientificBytes:100,combinedLogBytesIncludingConditionalStdout:4096,physicalOutputFiles:3,outputPaths:3,hostObservations:[{atLaunch:true,freePercent:60,availableDiskBytes:'100000000000'},{atLaunch:false,freePercent:60,availableDiskBytes:'100000000000'}]});
 const observation={lock:{path:'/repo/.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/.pilot.lock',absent:true},processes:[{pid:99,pgid:99}]};
 const read=(b,{expectedIdentity}={})=>({...b,identity:expectedIdentity,data:b.path===operationBinding.path?operationRaw:resourceRaw});
 return{invocation,lease,elapsedMilliseconds:1000,wire,operation,plan,observation,read};
}
test('literal positive: external closure is a distinct non-scientific result',()=>{
 const f=fixture(),original=structuredClone(f.wire),r=verifyClosure(f);
 assert.equal(r.schema,'braid-program/f6c-bounded-operation-external-closure.v1');assert.equal(r.accepted,true);
 assert.equal(r.mathematicalAcceptance,false);assert.equal(r.h3EvidenceEligible,false);
 assert.deepEqual(f.wire,original);assert.equal(f.wire.accepted,false);
});
test('pending-only, bad exit, late completion, guard and lock gaps reject',()=>{
 const mutations=[f=>f.lease.status='running',f=>f.lease.exitCode=1,f=>f.lease.exitSignal='SIGTERM',f=>f.lease.processGroupClosed=false,
  f=>f.elapsedMilliseconds=120000,f=>f.observation.lock.absent=false,f=>f.wire.wholeGuard.owner=99,f=>f.wire.wholeGuardClosed=true,
  f=>f.wire.observerProcesses.closed=0,f=>f.wire.stderrCallbacksPending=1,f=>f.operation.accepted=true,f=>f.wire.accepted=true];
 for(const mutate of mutations){const f=fixture();mutate(f);assert.throws(()=>verifyClosure(f));}
});
test('wrong invocation, incomplete stage and substituted sources/outputs reject',()=>{
 const mutations=[f=>f.lease.args[2]='/foreign',f=>f.invocation.coordinator.sha256='0'.repeat(64),f=>f.operation.stages=[],f=>f.operation.stages[0].process.accepted=false,
  f=>f.wire.sourceBindings.pop(),f=>delete f.wire.sourceIdentities['/node'],f=>f.wire.outputBindings.pop(),f=>f.operation.plan={...f.operation.plan,bytes:3},
  f=>f.read=()=>({identity:'replacement',data:Buffer.from('{}')}),f=>f.wire.observerProcesses.count=2];
 for(const mutate of mutations){const f=fixture();mutate(f);assert.throws(()=>verifyClosure(f));}
});
test('escaped stage/observer processes and retained owned groups reject',()=>{
 for(const row of [{pid:10,pgid:10},{pid:11,pgid:80},{pid:12,pgid:81},{pid:90,pgid:11}]){
  const f=fixture();f.observation.processes.push(row);assert.throws(()=>verifyClosure(f));
 }
});
test('resource, host capacity, missing guard acknowledgement and log loss reject',()=>{
 for(const mutate of [f=>f.operation.limits.serialWorkers=2,f=>f.wire.maximumSampledRSSBytes=2147483649,f=>f.wire.maximumSampleGapMs=1001,f=>f.wire.finalObservationToClosureMs=1001,f=>f.wire.samples=0,f=>f.wire.scientificBytes=67108865,f=>f.wire.hostObservations=[],f=>f.wire.hostObservations[0].freePercent=39,f=>f.wire.hostObservations[1].availableDiskBytes='1',f=>f.operation.stages[0].process.rootGuard.acknowledged=false,f=>f.operation.stages[0].process.stdoutDroppedBytes=1]){
  const f=fixture();mutate(f);assert.throws(()=>verifyClosure(f));
 }
});
test('real same-descriptor capture rejects wrong bytes and identical replacement',t=>{
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'external-closure-file-')));t.after(()=>rmSync(dir,{recursive:true}));
 const p=path.join(dir,'evidence');writeFileSync(p,'abc');const b=bind(p,Buffer.from('abc')),first=capture(b,{collect:true});assert.equal(first.data.toString(),'abc');
 assert.throws(()=>capture({...b,sha256:'0'.repeat(64)}));renameSync(p,p+'.old');writeFileSync(p,'abc');assert.throws(()=>capture(b,{expectedIdentity:first.identity}));
});
test('process snapshot parser requires complete unambiguous identity rows',()=>{
 const row=' 99 1 99 Mon Sep  7 01:02:03 2026 Ss /bin/test\n';assert.deepEqual(parseProcessTable(row)[0],{pid:99,ppid:1,pgid:99,started:'Mon Sep 7 01:02:03 2026',state:'Ss',command:'/bin/test'});
 for(const raw of ['',row+row,'99 1 99 truncated\n'])assert.throws(()=>parseProcessTable(raw));
});

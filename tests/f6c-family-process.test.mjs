// Host-supervised captured-worker routing; no scientific stage or shared lock.
// The common coordinator's full serial lifecycle has its separate process suite.
import test from 'node:test';
import assert from 'node:assert/strict';
import workerThreads from 'node:worker_threads';
import {syncBuiltinESMExports} from 'node:module';
import {createHash} from 'node:crypto';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,realpathSync,existsSync} from 'node:fs';
import path from 'node:path';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
const {LOCK}=await import("../scripts/eom/verify-f6c-bounded-operation-closure.mjs");
const Parent=await import("../scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs");
const Packaging=await import("../scripts/eom/run-f6c-evidence-packaging.mjs");
import {runFileWorker} from '../scripts/eom/launch-prescribed-response-pilot.mjs';
const root=realpathSync(process.cwd()),hash=raw=>createHash('sha256').update(raw).digest('hex');
const bind=p=>{const raw=readFileSync(p);return{path:p,sha256:hash(raw),bytes:raw.length};};
const records=path.join(root,'.local-data/braid-analysis');
async function observedWorker(job,bytes){
 const Original=workerThreads.Worker,observed=[];let result,failure;
 workerThreads.Worker=class extends Original{
  constructor(...args){super(...args);const record={threadId:this.threadId,exitObserved:false};observed.push({worker:this,record});this.once('exit',code=>{record.exitObserved=true;record.exitCode=code;});}
 };
 syncBuiltinESMExports();
 try{try{result=await runFileWorker(job,bytes,5000,new AbortController().signal);}catch(error){failure=error;}}
 finally{workerThreads.Worker=Original;syncBuiltinESMExports();}
 assert.equal(observed.length,1,'exactly one real captured worker');
 for(const{worker,record}of observed){assert(record.threadId>0);assert.equal(record.exitObserved,true,'exit observed before helper settled');assert.equal(worker.threadId,-1,'worker actually terminated');}
 return{result,failure,workers:observed.map(o=>o.record)};
}
const literal='export function fileOperation(){return{accepted:true,h3EvidenceEligible:false,literal:true}}';
test('known literal traverses captured coordinator pureHook and fully terminated worker before actual consumers',async()=>{
 mkdirSync(records,{recursive:true});const dir=mkdtempSync(path.join(records,'family-known-')),p=path.join(dir,'hook.mjs');writeFileSync(p,literal,{flag:'wx'});
 const plan={root,sources:[],hookModule:bind(p),hookControls:bind(p),stages:[]};
 const captured=C.captureUnion([...[],bind(p)]);
 const observed=await observedWorker({root,kind:'hook',plan,sources:captured.sources,identities:captured.identities,payload:{kind:'preflight'},deadlineNanoseconds:String(process.hrtime.bigint()+5000000000n)},readFileSync(path.join(root,C.SELF)));
 assert.equal(observed.failure,undefined);assert.deepEqual(observed.result,{accepted:true,h3EvidenceEligible:false,literal:true});
});
for(const [name,M,boundary]of[['parent',Parent,'closed fields'],['packaging',Packaging,'closed packaging configuration']])for(const mode of['selected'])test(name+' actual captured hook stops at '+mode+' boundary',async t=>{
 mkdirSync(records,{recursive:true});const dir=mkdtempSync(path.join(records,'family-'+name+'-'));t.diagnostic('Retained consumer routing: '+dir);
 const hook=bind(path.join(root,M.SELF)),controls=bind(path.join(root,M.CONTROL));
 const plan={root,sources:[bind(path.join(root,C.SELF))],hookModule:hook,hookControls:controls,configuration:{},stages:[]};
 const captured=C.captureUnion([...plan.sources,hook,controls]);
 const observed=await observedWorker({root,kind:'hook',plan,sources:captured.sources,identities:captured.identities,payload:{kind:'preflight'},deadlineNanoseconds:String(process.hrtime.bigint()+5000000000n)},readFileSync(path.join(root,C.SELF)));
 const expected=boundary;
 assert.equal(observed.failure?.message,expected,'actual hook must reach the selected boundary');assert.equal(observed.result,undefined);
 assert(!existsSync(path.join(root,LOCK)),'metadata worker creates no shared lock');
 writeFileSync(path.join(dir,'routing.json'),JSON.stringify({schema:'f6c-consumer-routing/v1',consumer:name,mode,expectedBoundary:expected,observedFailure:observed.failure.message,workers:observed.workers,scientificAcceptance:false,scientificStageStarted:false,coordinator:bind(path.join(root,C.SELF)),hook})+'\n',{flag:'wx'});
});

import { nextTestIdentities } from './support/option-b-next-test-identities.mjs';
const NEXT_TEST_SHA = nextTestIdentities("tests/option-b-f6c-coordinator-process.test.mjs", 2);
// Host-dependent synthetic operational controls. No numerical producer or oracle.
// Retain runtime records under the ignored evidence owner for external inspection.
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,realpathSync,statSync,existsSync} from 'node:fs';
import path from 'node:path';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
import {LOCK} from '../scripts/eom/verify-f6c-bounded-operation-closure.mjs';
const exec=promisify(execFile),root=realpathSync(process.cwd());
const hash=b=>createHash('sha256').update(b).digest('hex');
const bind=p=>({path:p,sha256:hash(readFileSync(p)),bytes:statSync(p).size});
const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
const hook=`import {readFileSync} from 'node:fs';
export async function fileOperation(job){
 if(job.kind==='admit'){
  if(readFileSync(job.stdoutLog.path,'utf8')!=='{"completed":true,"synthetic":true}\\n')throw Error('synthetic completion mismatch');
  return {accepted:true,h3EvidenceEligible:false,runtimeBindings:job.plan.stages.find(s=>s.id===job.stageId).runtimeBindings};
 }
 return {accepted:true,h3EvidenceEligible:false};
}
`;

test('known literal synthetic hook accepts only its declared completion',async()=>{
 const module=await import('data:text/javascript;base64,'+Buffer.from(hook).toString('base64'));
 assert.deepEqual(await module.fileOperation({kind:'preflight'}),{accepted:true,h3EvidenceEligible:false});
 const lane=path.join(root,'.local-data/braid-analysis');mkdirSync(lane,{recursive:true});
 const dir=mkdtempSync(path.join(lane,'option-b-closure-known-')),stdout=path.join(dir,'stdout.log');
 const job={kind:'admit',stdoutLog:{path:stdout},stageId:'synthetic',plan:{stages:[{id:'synthetic',runtimeBindings:[]}]}};
 writeFileSync(stdout,'{"completed":true,"synthetic":true}\n',{flag:'wx'});
 assert.deepEqual(await module.fileOperation(job),{accepted:true,h3EvidenceEligible:false,runtimeBindings:[]});
 writeFileSync(stdout,'{"completed":true,"synthetic":false}\n');
 await assert.rejects(module.fileOperation(job),/synthetic completion mismatch/);
 assert.equal(canonical({z:[true,null],a:1}),' {"a":1,"z":[true,null]}'.trim());
 assert.equal(hash('abc'),NEXT_TEST_SHA[0]);
});

test('current serial coordinator closes through the independently selected observer',async t=>{
 const lane=path.join(root,'.local-data/braid-analysis');mkdirSync(lane,{recursive:true});
 const dir=mkdtempSync(path.join(lane,'option-b-current-closure-'));
 t.diagnostic('Retained synthetic operational records: '+dir);
 const entry=path.join(dir,'entry.mjs'),hookPath=path.join(dir,'hook.mjs');
 writeFileSync(entry,'console.log(JSON.stringify({completed:true,synthetic:true}));\n',{flag:'wx'});
 writeFileSync(hookPath,hook,{flag:'wx'});
 const map=bind(path.join(root,C.SOURCE_MAP)),selected=await C.initializeSourceBindings(root,map.sha256);
 const node=bind(realpathSync(process.execPath)),supervisor=bind(path.join(root,'scripts/dev/owned-compute-supervisor.mjs'));
 const plan={schema:'braid-program/f6c-bounded-operation-plan.v1',root,
  operationDirectory:path.join(dir,'operation'),outputDirectories:[path.join(dir,'data')],publicationAliases:[],
  sources:C.sourceUnion([...selected.sources,node,bind('/bin/ps'),bind('/usr/bin/memory_pressure'),supervisor]),
  hookModule:bind(hookPath),hookControls:bind(path.join(root,'tests/option-b-f6c-coordinator-process.test.mjs')),
  configuration:{synthetic:true},stages:[{id:'synthetic',entry:bind(entry),args:[],sources:[],runtimeBindings:[node]}]};
 const planPath=path.join(dir,'plan.json');writeFileSync(planPath,canonical(plan)+'\n',{flag:'wx'});
 const observer=bind(path.join(root,'scripts/eom/observe-parent-batch.mjs'));
 const checker=bind(path.join(root,'scripts/eom/verify-f6c-bounded-operation-closure.mjs'));
 assert.equal(checker.sha256,NEXT_TEST_SHA[1],'independently reviewed frozen checker');
 const coordinator=bind(path.join(root,C.SELF)),out=path.join(dir,'observer');
 const args=['--control','--plan',planPath,'--plan-sha256',bind(planPath).sha256,
  '--self-sha256',observer.sha256,'--checker-sha256',checker.sha256,'--coordinator-sha256',coordinator.sha256,
  '--source-map-sha256',map.sha256,'--out-directory',out,'--owner-task',process.env.CODEX_SESSION_ID??'option-b-current-closure-controls'];
 const result=await exec(node.path,[observer.path,...args],{cwd:root,timeout:135000,maxBuffer:1048576});
 const message=JSON.parse(result.stdout);assert.equal(message.accepted,true);assert.equal(message.mathematicalAcceptance,false);
 const receipt=JSON.parse(readFileSync(message.receipt.path));
 assert.equal(receipt.schema,'braid-program/f6c-bounded-operation-external-closure.v2');
 assert.equal(receipt.accepted,true);assert.equal(receipt.processesClosed,true);assert.equal(receipt.lockReleased,true);assert.equal(receipt.wholeGuardClosed,true);
 assert.deepEqual(receipt.invocation.sourceMap,map);assert.deepEqual(receipt.invocation.coordinator,coordinator);
 assert(!existsSync(path.join(root,LOCK)));
 for(const flag of ['--source-map-sha256','--coordinator-sha256']){
  const bad=[...args];bad[bad.indexOf(flag)+1]='0'.repeat(64);
  bad[bad.indexOf('--out-directory')+1]=path.join(dir,flag.slice(2));
  await assert.rejects(exec(node.path,[observer.path,...bad],{cwd:root,timeout:10000,maxBuffer:1048576}),/hash|binding|mismatch/);
  assert(!existsSync(path.join(dir,flag.slice(2))),'wrong external identity rejects before observer dispatch/output');
 }
});

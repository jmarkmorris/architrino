// Real inert workload controls. No historical code or numerical campaign runs.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,realpathSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {main as observe} from '../../../../../scripts/eom/observe-parent-batch.mjs';
const root=realpathSync(process.cwd());
const sha=b=>createHash('sha256').update(b).digest('hex');
const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
assert.equal(canonical({z:[1,true],a:'x'}),'{"a":"x","z":[1,true]}');
console.log('Known canonical JSON control passed before target.');
const binding=p=>{const bytes=readFileSync(p);return{path:p,sha256:sha(bytes),bytes:bytes.length};};
const base=path.join(root,'.local-data/braid-analysis');mkdirSync(base,{recursive:true});
const result=[];
for(const fail of [false,true]){
 const dir=mkdtempSync(path.join(base,'external-observer-control-'));
 const entry=path.join(dir,'entry.mjs'),hook=path.join(dir,'hook.mjs');
 writeFileSync(entry,fail?"throw Error('intentional synthetic stage failure');\n":"console.log(JSON.stringify({completed:true,synthetic:true}));\n");
 writeFileSync(hook,"import {readFileSync} from 'node:fs';\nexport async function fileOperation(job){if(job.kind==='admit'){if(readFileSync(job.stdoutLog.path,'utf8')!=='{\"completed\":true,\"synthetic\":true}\\n')throw Error('synthetic completion mismatch');return {accepted:true,h3EvidenceEligible:false,runtimeBindings:job.plan.stages.find(s=>s.id===job.stageId).runtimeBindings};}return {accepted:true,h3EvidenceEligible:false};}\n");
 const node=binding(realpathSync(process.execPath));
 const plan={schema:'braid-program/f6c-bounded-operation-plan.v1',root,operationDirectory:path.join(dir,'operation'),outputDirectories:[path.join(dir,'data')],publicationAliases:[],
 sources:[node,binding('/bin/ps'),binding('/usr/bin/memory_pressure'),binding(path.join(root,'tests/f6c-bounded-operation.test.js')),binding(path.join(root,'scripts/dev/owned-compute-supervisor.mjs'))],
 hookModule:binding(hook),hookControls:binding(path.join(root,'tests/f6c-bounded-operation-closure.test.js')),configuration:{synthetic:true},
 stages:[{id:'synthetic',entry:binding(entry),args:[],sources:[],runtimeBindings:[node]}]};
 const planPath=path.join(dir,'plan.json');writeFileSync(planPath,canonical(plan)+'\n');
 const out=path.join(dir,'observer'),args=['--plan',planPath,'--plan-sha256',binding(planPath).sha256,'--self-sha256',binding(path.join(root,'scripts/eom/observe-parent-batch.mjs')).sha256,
 '--checker-sha256',binding(path.join(root,'scripts/eom/verify-f6c-bounded-operation-closure.mjs')).sha256,'--out-directory',out,'--owner-task',process.env.CODEX_SESSION_ID??process.env.CODEX_THREAD_ID,'--control'];
 let receipt,error;
 try{receipt=await observe(args);}catch(e){error=e.message;}
 if(fail){assert.ok(error);assert.equal(existsSync(path.join(out,'closure.json')),false);}
 else assert.ok(receipt?.accepted,error);
 result.push({control:fail?'intentional-stage-failure':'normal-return',passed:true,directory:dir,error:error??null,elapsedMilliseconds:receipt?.elapsedMilliseconds??null});
 console.log(JSON.stringify(result.at(-1)));
}
writeFileSync(new URL('real-observer-controls.json',import.meta.url),JSON.stringify(result,null,2)+'\n');

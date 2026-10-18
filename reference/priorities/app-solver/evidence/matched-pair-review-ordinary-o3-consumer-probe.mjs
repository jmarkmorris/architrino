// Independently authored interface probe. It supplies documents; no numerical
// truth is inferred from those documents. All physical fixture inputs use c_f=1.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const [subject, data, output] = process.argv.slice(2);
const {createEomV2HttpClient} = await import(pathToFileURL(path.resolve(subject,'src/apps/shared/EomV2HttpClient.js')));
const record = await import(pathToFileURL(path.resolve(subject,'scripts/eom/EomResponseRecord.mjs')));
const {createEomV2ProcessClient} = await import(pathToFileURL(path.resolve(subject,'scripts/eom/EomV2ProcessClient.mjs')));
const read = name => JSON.parse(fs.readFileSync(path.join(data,'wire-v3',name),'utf8'));
const inspection = read('v3-inspect.stdout');
const response = read('v3-evolve-whole.stdout');
const history = z => ({kind:'cubic',segments:[{start:'-20',end:'0',coefficients:[['0','0','0','0'],['0','0','0','0'],[z,'0','0','0']],positionErrors:['0','0','0'],velocityErrors:['0','0','0']}]});
const request = {schema:'eom_evolution_request/v3',runId:'o3-run',model:{fieldSpeed:'1',coupling:'0.001'},interval:{start:'0',end:'0.0625'},paths:[{pathId:'receiver',charge:'1',history:history('0')},{pathId:'plus',charge:'1',history:history('10')},{pathId:'minus',charge:'-1',history:history('11')}],numerics:{initialStep:'0.0078125',minimumStep:'0.0078125'},execution:{method:'canonical_validated_far_step_evolution/v1',positionIncrementBudget:'0.000001',velocityIncrementBudget:'0.000001',pairPolicy:'canonical_whole_step_piecewise_tube/v1',groups:[['plus','minus']],maximumAcceptedSteps:8}};
const sorted = v => Array.isArray(v)?v.map(sorted):v && typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,sorted(v[k])])):v;
const digest = v => createHash('sha256').update(JSON.stringify(sorted(v))).digest('hex');
const browser = async (req, model, result, mode='evolve', options={}) => {
  const calls=[];
  const fetchImpl = async (url, init) => {
    calls.push({url,body:init?.body?JSON.parse(init.body):null});
    return {ok:true,status:200,text:async()=>JSON.stringify(url.endsWith('/inspect')?model:result),json:async()=>({})};
  };
  const client=createEomV2HttpClient({fetchImpl});
  try { const value=mode==='evolve'?await client.evolve(req,options):await client.resume(req,{schema:'probe-checkpoint'},'0.0625',options); return {accepted:true,schema:value.schema,calls}; }
  catch(e){return {accepted:false,error:e.message,code:e.code??null,calls};}
};
const bind = (req,res) => {try {record.assertEomExecutionBinding(JSON.stringify({operation:'evolve',request:req}),res);return {accepted:true};}catch(e){return {accepted:false,code:e.code,message:e.message};}};
fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,'request.json'),JSON.stringify(request,null,2)+'\n');
assert.equal(createHash('sha256').update('abc').digest('hex'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.equal(digest(response.execution),response.executionDigest);
assert.equal(bind(request,response).accepted,true);
const known=await browser(request,inspection,response);
assert.equal(known.accepted,true);
assert.equal(known.calls.filter(c=>c.url.endsWith('/evolve')).length,1);
console.log('KNOWN SHA abc, genuine execution digest/binding, and genuine v3 browser run PASS before targets.');
const rows=[];
const target=async(name,fn)=>{const result=await fn();rows.push({name,...result});console.log('TARGET '+name+' '+JSON.stringify(result));};
await target('v2 inspection on v3 request launches before refusal',()=>browser(request,{...inspection,schema:'eom_inspection/v2'},response));
const different=structuredClone(request);different.execution.pairPolicy='disabled';different.execution.groups=[];
await target('request disables grouping but inspection and response both group',()=>browser(different,inspection,response));
const limit=structuredClone(request);limit.execution.maximumAcceptedSteps=2;
await target('request declares two but inspection and response declare eight',()=>browser(limit,inspection,response));
await target('matching uncomputed digest in inspection and response',()=>browser(request,{...inspection,executionDigest:'0'.repeat(64)},{...response,executionDigest:'0'.repeat(64)}));
await target('runtime override option on browser resume',()=>browser(request,inspection,response,'resume',{runtime:{threadCount:4}}));
const defaults=structuredClone(request);delete defaults.execution.pairPolicy;delete defaults.execution.groups;
await target('process binding accepts nondefault undeclared grouping',async()=>bind(defaults,response));
await target('binding admits unknown successful response schema',async()=>bind(request,{...response,schema:'eom_evolution_response/v99'}));
// Actual process-client behavior with a fixed response-only stub. No solver
// computation or checkpoint claim is made by this probe.
const values={known:{...response,checkpoint:{...response.checkpoint,durable:false}},unknown:{...response,schema:'eom_evolution_response/v99',checkpoint:{...response.checkpoint,durable:false}}};
fs.writeFileSync(path.join(output,'stub-values.json'),JSON.stringify(values));
const executable=path.join(output,'response-only-stub.mjs');
fs.writeFileSync(executable,'#!/usr/bin/env node\nimport fs from "node:fs";\nimport path from "node:path";\nimport {fileURLToPath} from "node:url";\nlet input="";for await(const chunk of process.stdin)input+=chunk;\nconst request=JSON.parse(input).request;\nconst values=JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)),"stub-values.json"),"utf8"));\nprocess.stdout.write(JSON.stringify(request.runId==="unknown-schema"?values.unknown:values.known));\n',{mode:0o700});
const processClient=createEomV2ProcessClient({binaryPath:executable,checkpointRoot:path.join(output,'checkpoints'),recordRoot:path.join(output,'records'),timeoutMs:2000});
const knownProcess=await processClient.execute(JSON.stringify({operation:'evolve',request}),{retainRecord:false});
assert.equal(knownProcess.schema,'eom_evolution_response/v3');
console.log('KNOWN real process-client call to response-only stub accepts genuine v3 document before its schema target.');
await target('nonretaining process client admits unknown successful evolution schema',async()=>{try{const value=await processClient.execute(JSON.stringify({operation:'evolve',request:{...request,runId:'unknown-schema'}}),{retainRecord:false});return {accepted:true,schema:value.schema};}catch(e){return {accepted:false,code:e.code,message:e.message};}});
await processClient.dispose();
fs.writeFileSync(path.join(output,'probe-results.json'),JSON.stringify({request,rows},null,2)+'\n');

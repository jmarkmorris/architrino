// Independent request-version/runtime route checks, known cases before targets.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const [subject,output]=process.argv.slice(2);
const {createEomV2HttpClient}=await import(pathToFileURL(path.resolve(subject,'src/apps/shared/EomV2HttpClient.js')));
const helpers=await import(pathToFileURL(path.resolve(subject,'scripts/eom/EomResponseRecord.mjs')));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const old='.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/';
const request2=read(old+'wire-envelopes/evolve-three-path.json').request;
const inspect2=read(old+'wire-outputs/inspect-three-path.stdout');
const response2=read(old+'wire-outputs/evolve-three-path.stdout');
const request3=read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/reviewer-o3-consumer-probe/request.json');
const inspect3=read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-v3/v3-inspect.stdout');
const response3=read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-v3/v3-evolve-whole.stdout');
const call=async(request,inspection,response,options={})=>{
  const calls=[];
  const fetchImpl=async(url,init)=>{calls.push({url,body:JSON.parse(init.body)});return{ok:true,status:200,text:async()=>JSON.stringify(url.endsWith('/inspect')?inspection:response)};};
  try{await createEomV2HttpClient({fetchImpl}).evolve(request,options);return{accepted:true,calls};}catch(e){return{accepted:false,code:e.code,message:e.message,calls};}
};
const checked=(request,response)=>{try{const raw=JSON.stringify({operation:'evolve',request});helpers.assertEomResponseSchema(raw,response);helpers.assertEomExecutionBinding(raw,response);return{accepted:true};}catch(e){return{accepted:false,code:e.code,message:e.message};}};
assert.equal((await call(request2,inspect2,response2)).accepted,true);
assert.equal((await call(request3,inspect3,response3)).accepted,true);
assert.equal(checked(request2,response2).accepted,true);
console.log('KNOWN v2 and v3 browser runs and v2 Node schema/binding PASS before version/runtime targets.');
const future={...request2,schema:'eom_evolution_request/v99'};
const rows=[{case:'unsupported request version accepted as v2 browser',...await call(future,inspect2,response2)},
  {case:'unsupported request version mapped to v2 Node',...checked(future,response2)},
  {case:'runtime override on evolve silently omitted',...await call(request3,inspect3,response3,{runtime:{threadCount:4}})}];
fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(path.join(output,'inputs.json'),JSON.stringify({request2,request3,future},null,2));
fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(rows,null,2));
for(const r of rows)console.log(JSON.stringify({case:r.case,accepted:r.accepted,code:r.code,launches:r.calls?.filter(c=>!c.url.endsWith('/inspect')).length,runtime:r.calls?.find(c=>c.url.endsWith('/evolve'))?.body?.runtime}));

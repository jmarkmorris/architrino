// Operational admission only; no scientific target is executed.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import * as E from '../scripts/eom/run-f6c-emission-refinement-pilot.mjs';
import * as R from '../scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
import * as EL from '../scripts/eom/launch-f6c-emission-refinement-pilot.mjs';
import * as RL from '../scripts/eom/launch-f6c-refined-acceleration-pilot.mjs';
const root=realpathSync(process.cwd()),sha=b=>createHash('sha256').update(b).digest('hex');
const reader='scripts/equation-mapping/current-source-manifest.mjs';
const put=(p,b)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,b);};
function fixture(C){
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'option-b-f6c-paired-'))),doc=JSON.parse(readFileSync(C.SOURCE_MAP));
 for(const row of doc['@graph'].filter(r=>r['@type']==='Source')){
  const bytes=row.binding.path===reader?readFileSync(reader):Buffer.from('// inert known source: '+row.binding.path+'\n');
  put(path.join(dir,row.binding.path),bytes);row.binding.sha256=sha(bytes);
 }
 const save=()=>{const raw=Buffer.from(JSON.stringify(doc,null,2)+'\n');put(path.join(dir,C.SOURCE_MAP),raw);return sha(raw);};
 return {dir,doc,save,digest:save(),close:()=>rmSync(dir,{recursive:true,force:true})};
}
test('known inert paired fixtures admit exact source closures before repository targets',async()=>{
 for(const C of [E,R]){const f=fixture(C);try{const a=await C.initializeSourceBindings(f.dir,f.digest);assert.equal(a.sources.length,C===E?9:7);assert.equal(a.sourceMap.path,path.join(f.dir,C.SOURCE_MAP));assert.equal(Object.keys(C.SOURCE_BINDINGS).length,C===E?9:7);assert.equal(C.PINS[C.HELPERS],undefined);assert.equal(C.PINS[C.OUTER],undefined);}finally{f.close();}}
});
for(const [C,L,label]of [[E,EL,'emission'],[R,RL,'refined']]){
 test(label+' rejects missing digest, changed map and source substitutions and clears prior admission',async()=>{
  const f=fixture(C);try{
   await C.initializeSourceBindings(f.dir,f.digest);
   await assert.rejects(C.initializeSourceBindings(f.dir));assert.equal(C.SOURCE_BINDINGS,undefined);
   await assert.rejects(C.initializeSourceBindings(f.dir,'0'.repeat(64)));
   for(const target of [C.ENTRY,C.LAUNCHER,C.TESTS,C.PROCESS_TESTS,C.HELPERS,C.OUTER,...(C===E?[C.BRIDGE,C.BRIDGE_TESTS]:[]),reader,C.SOURCE_MAP]){
    const p=path.join(f.dir,target),bytes=readFileSync(p);writeFileSync(p,Buffer.concat([bytes,Buffer.from('\n')]));
    await assert.rejects(C.initializeSourceBindings(f.dir,f.digest));assert.equal(C.SOURCE_BINDINGS,undefined);writeFileSync(p,bytes);
   }
  }finally{f.close();}
 });
 test(label+' newly selected malformed roles, missing source and foreign profile cannot admit',async()=>{
  for(const mutate of [d=>d.scope='wrong',d=>d['@graph'].find(r=>r.binding?.path===C.HELPERS).role='independent-reference',d=>d['@graph'].splice(d['@graph'].findIndex(r=>r.binding?.path===C.TESTS),1),d=>d['@graph'].find(r=>r.binding?.path===C.ENTRY).role='current-source',d=>d['@graph'].splice(d['@graph'].findIndex(r=>r.kind==='checks'),1)]){
   const f=fixture(C);try{mutate(f.doc);await assert.rejects(C.initializeSourceBindings(f.dir,f.save()));}finally{f.close();}
  }
 });
 test(label+' map and reader are rechecked after graph traversal',async()=>{
  for(const target of [C.SOURCE_MAP,reader]){const f=fixture(C);let calls=0;try{
   await assert.rejects(C.initializeSourceBindings(f.dir,f.digest,()=>{if(++calls===10){const p=path.join(f.dir,target);writeFileSync(p,Buffer.concat([readFileSync(p),Buffer.from('\n')]));}}));
   assert.equal(C.SOURCE_BINDINGS,undefined);
  }finally{f.close();}}
 });
 test(label+' repository map admits current operational bytes and rejects wrong entry or launcher selection',async()=>{
  const digest=sha(readFileSync(C.SOURCE_MAP)),a=await C.initializeSourceBindings(root,digest);
  assert.equal(a.sources.length,C===E?9:7);for(const b of a.sources)assert.equal(sha(readFileSync(b.path)),b.sha256);
  for(const args of [[undefined,root,'0'.repeat(64),C.SOURCE_BINDINGS[C.ENTRY]], [undefined,root,C.SOURCE_BINDINGS[C.LAUNCHER],'0'.repeat(64)]])assert.throws(()=>C.validatePlan(...args),/selected entry\/launcher/);
  const args=['--out','child','--plan','plan','--plan-sha256',digest,'--launcher-sha256',C.SOURCE_BINDINGS[C.LAUNCHER],'--entry-sha256',C.SOURCE_BINDINGS[C.ENTRY],'--python','/explicit/python','--git-binary','/usr/bin/git'];
  assert.throws(()=>L.parseArgs(args));assert.equal(L.parseArgs([...args,'--source-map-sha256',digest]).sourceMapSha256,digest);
 });
 test(label+' actual stage CLI rejects omitted or substituted selection before loading a plan or science',()=>{
  const digest=sha(readFileSync(C.SOURCE_MAP));
  const args=['--plan','absent-plan','--plan-sha256',digest,'--entry-sha256',digest,'--launcher-sha256',digest,'--stage',C===E?'producer':'consumer','--out','absent-output','--deadline-ns',String(process.hrtime.bigint()+1000000000n),C===E?'--manifest-sha256':'--candidate-sha256','none','--python','/explicit/python','--git-binary','/usr/bin/git'];
  for(const extra of [[],['--source-map-sha256','0'.repeat(64)]]){const run=spawnSync(process.execPath,[C.ENTRY,...args,...extra],{cwd:root,encoding:'utf8',timeout:3000});assert.equal(run.status,1);assert.match(run.stderr,/closed stage arguments|changed input\/hash/);assert.doesNotMatch(run.stderr,/absent-plan/);}
 });
 test(label+' captured file worker requires map selection and rechecks current sources',async()=>{
  const digest=sha(readFileSync(C.SOURCE_MAP));await C.initializeSourceBindings(root,digest);
  const H=await L.reviewedHelpers(readFileSync(C.HELPERS),C.SOURCE_BINDINGS[C.HELPERS]);
  const bytes=readFileSync(C.ENTRY),base={kind:'recheck',root,sourceMapSha256:digest,sources:[],deadlineNanoseconds:String(process.hrtime.bigint()+5000000000n)};
  assert.deepEqual(await H.runFileWorker(base,bytes,2000,new AbortController().signal),[]);
  for(const change of [{sourceMapSha256:undefined},{sourceMapSha256:'0'.repeat(64)},{root:root+'/absent'}])await assert.rejects(H.runFileWorker({...base,...change},bytes,2000,new AbortController().signal));
  await assert.rejects(H.runFileWorker(base,Buffer.concat([bytes,Buffer.from('\n')]),2000,new AbortController().signal),/executing entry generation/);
 });
}

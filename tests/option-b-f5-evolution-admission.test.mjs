import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdirSync,mkdtempSync,readFileSync,realpathSync,renameSync,rmSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {admitF5Sources,EVOLUTION_MAP,EVOLUTION_ROLES} from '../scripts/eom/f5-current-source-admission.mjs';
const root=realpathSync(process.cwd()),sha=b=>createHash('sha256').update(b).digest('hex');
const selected=()=>sha(readFileSync(path.join(root,EVOLUTION_MAP)));
const put=(p,b)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,b);};
function fixture(){const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f5-evolution-map-')));for(const p of [EVOLUTION_MAP,...Object.keys(EVOLUTION_ROLES)])put(path.join(dir,p),readFileSync(path.join(root,p)));return {dir,close:()=>rmSync(dir,{recursive:true,force:true})};}
test('known captured evolution metadata retains the original scientific predicate before controls',async()=>{
 const a=await admitF5Sources(root,selected(),{},'evolution');a.requireBindings(a.sources);
 const B=await a.importModule('scripts/eom/f5-batch-admission.mjs');
 const original=JSON.parse(readFileSync('reference/priorities/braid-program/evidence/2026-08-27-f5-ordinary-evolution-declaration.v1.json'));
 const current=structuredClone(original);current.operationalAdmission={mode:'registered-batch-v1'};
 current.sourceBindings.push(...a.sources.filter(b=>!current.sourceBindings.some(r=>path.resolve(root,r.path)===b.path)));
 assert.doesNotThrow(()=>B.assertScientificGeneration(original,current));
 for(const change of [d=>{d.campaignDeadline='2099-01-01';},d=>{d.scientificConditions.fieldSpeed='2';},d=>{d.sourceBindings.find(b=>b.path.endsWith('verify-f5-ordinary-evolution.py')).sha256='0'.repeat(64);}]){const d=structuredClone(current);change(d);assert.throws(()=>B.assertScientificGeneration(original,d));}
 const ordinary=await a.importModule('scripts/eom/run-f5-ordinary-evolution.mjs');await ordinary.initializeEvolution(a);
 assert.equal(typeof ordinary.makePreparedRequest,'function');a.recheck();
});
test('current evolution binding omissions and role/map substitutions fail closed',async()=>{
 const a=await admitF5Sources(root,selected(),{},'evolution');
 assert.throws(()=>a.requireBindings(a.sources.slice(1)),/operational selection/);
 assert.throws(()=>a.requireBindings(a.sources.map((b,i)=>i?b:{...b,sha256:'0'.repeat(64)})),/operational selection/);
 await assert.rejects(admitF5Sources(root,undefined,{},'evolution'),/externally/);
 await assert.rejects(admitF5Sources(root,'0'.repeat(64),{},'evolution'),/digest/);
 const f=fixture();try{const doc=JSON.parse(readFileSync(path.join(f.dir,EVOLUTION_MAP)));doc['@graph'].find(r=>r.binding?.path==='scripts/eom/run-f5-ordinary-evolution.mjs').role='independent-reference';const bytes=Buffer.from(JSON.stringify(doc));put(path.join(f.dir,EVOLUTION_MAP),bytes);await assert.rejects(admitF5Sources(f.dir,sha(bytes),{},'evolution'),/role census/);}finally{f.close();}
});
test('ordinary, batch and gate direct CLIs reject unselected helper before its top level executes',()=>{
 const f=fixture();try{const marker=path.join(f.dir,'executed');put(path.join(f.dir,'scripts/eom/f5-current-source-admission.mjs'),"import fs from 'node:fs';fs.writeFileSync("+JSON.stringify(marker)+",'forbidden');");
 for(const [entry,args]of [['run-f5-ordinary-evolution.mjs',['--help']],['run-f5-complete-evaluator-batch.mjs',['--plan','absent','--phase','serial']],['f5-registered-stage-gate.mjs',['{}']]]){
  const r=spawnSync(process.execPath,[path.join(f.dir,'scripts/eom',entry),...args,'--source-map-sha256',selected()],{cwd:f.dir,encoding:'utf8',timeout:5000});
  assert.equal(r.status,1,entry+': '+r.stderr);assert.match(r.stderr,/bootstrap source digest/);assert.equal(existsSync(marker),false);assert.equal(r.stdout,'');
 }}finally{f.close();}
});
test('selected captured child supports help metadata and rejects same-byte replacement with original identities',async()=>{
 const a=await admitF5Sources(root,selected(),{},'evolution'),args=['--help','--source-map-sha256',selected()];
 const good=spawnSync(process.execPath,a.invocation('scripts/eom/run-f5-ordinary-evolution.mjs',args),{cwd:root,encoding:'utf8',timeout:5000});
 assert.equal(good.status,0,good.stderr);assert.match(good.stdout,/Usage:/);
 for(const p of [EVOLUTION_MAP,'scripts/eom/run-f5-ordinary-evolution.mjs','scripts/eom/f5-registered-stage-gate.mjs']){
  const f=fixture();try{const b=await admitF5Sources(f.dir,selected(),{},'evolution'),invocation=b.invocation('scripts/eom/run-f5-ordinary-evolution.mjs',args),target=path.join(f.dir,p);put(target+'.new',readFileSync(target));renameSync(target+'.new',target);
   const rejected=spawnSync(process.execPath,invocation,{cwd:f.dir,encoding:'utf8',timeout:5000});assert.equal(rejected.status,1);assert.match(rejected.stderr,/original source identity/);assert.equal(rejected.stdout,'');
  }finally{f.close();}
 }
});

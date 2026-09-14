import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync,spawnSync} from 'node:child_process';
import {beginBorgRuntimeAdmission,BORG_RUNTIME_MAP,BORG_OUTPUT_MAP,BORG_RUNTIME_SELECTION,BORG_FAMILIES} from '../scripts/borg/selected-runtime-admission.mjs';
import {prepareRuntimeAssets} from '../scripts/prepare-runtime-assets.mjs';
import {decode,validate,sha256} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {changesBetween} from '../scripts/equation-mapping/current-source-transition.mjs';
import {compareSourceManifests} from '../scripts/equation-mapping/current-source-impact.mjs';
const root=fs.realpathSync(new URL('../',import.meta.url));
const proofPath='reference/priorities/development-process-review/evidence/option-b-borg-runtime-transfer.json';
function fixture(t){
 const dir=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'borg-selected-runtime-')));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const selection=decode(fs.readFileSync(BORG_RUNTIME_SELECTION)),accepted=decode(fs.readFileSync(selection.acceptedBaseline)),graph=decode(fs.readFileSync(BORG_RUNTIME_MAP));
 const paths=new Set([BORG_RUNTIME_SELECTION,BORG_RUNTIME_MAP,selection.acceptedBaseline,selection.transition,accepted.historicalProof.path,...graph['@graph'].filter(r=>r.binding).map(r=>r.binding.path)]);
 for(const p of paths){fs.mkdirSync(path.dirname(path.join(dir,p)),{recursive:true});fs.copyFileSync(p,path.join(dir,p));}
 return{dir,selection,run:()=>beginBorgRuntimeAdmission({root:dir,selection})};
}

test('original data generators contracts browser APIs and historical F5 selections remain exact',()=>{
 const proof=decode(fs.readFileSync(proofPath));
 const retainedF5=new Map([['reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld','reference/priorities/development-process-review/evidence/option-b-batch-test-predecessors/f5-operational-sources.jsonld'],['reference/priorities/development-process-review/contracts/option-b-f5-evolution-sources.jsonld','reference/priorities/development-process-review/evidence/option-b-batch-test-predecessors/f5-evolution-sources.jsonld']]);
 for(const row of proof.unchanged){const original=execFileSync('git',['show',proof.originCommit+':'+row.path]);assert.equal(sha256(original),row.sha256);assert.deepEqual(fs.readFileSync(retainedF5.get(row.path)??row.path),original,row.path);} // Original F5 selections stay historical; current operational selections have separate admission.
 for(const row of proof.projections)assert.equal(sha256(fs.readFileSync(row.path)),row.sha256);
});

test('source-only setup reconstructs selected projections before synchronous browser imports',t=>{
 const f=fixture(t);assert.doesNotThrow(f.run);
 for(const p of Object.values(BORG_FAMILIES))assert.equal(fs.existsSync(path.join(f.dir,p)),false);
 for(const id of Object.keys(BORG_FAMILIES)){
  const prepared=prepareRuntimeAssets({rootDir:f.dir,familyId:id,mode:'write',log:()=>{}});assert.equal(prepared.length,1);assert.equal(typeof prepared.verifyBorgPublished,'function');
  assert.equal(prepareRuntimeAssets({rootDir:f.dir,familyId:id,mode:'check',log:()=>{}})[0].id,id);
 }
 const code=`import assert from 'node:assert/strict';globalThis.fetch=()=>{throw Error('No asynchronous initialization')};const c=await import('./src/apps/borg/BorgAssemblyRecordCatalog.js');const b=await import('./src/apps/borg/BorgCertifiedBudgets.js');assert.ok(Object.isFrozen(c.BORG_ASSEMBLY_RECORD_CATALOG));assert.ok(Object.isFrozen(b.BORG_CERTIFIED_BUDGET_PRESETS));console.log('BROWSER_READY');`;
 const actual=spawnSync(process.execPath,['--input-type=module','-e',code],{cwd:f.dir,encoding:'utf8',timeout:10000});assert.equal(actual.status,0,actual.stdout+actual.stderr);assert.match(actual.stdout,/BROWSER_READY/);
});

test('real setup rejects changed selected sources and missing selection before generating',t=>{
 const f=fixture(t);assert.doesNotThrow(f.run);
 const prepare=()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'write',log:()=>{}});
 for(const p of ['src/apps/borg/data/assembly-record-catalog.v2.json','src/apps/borg/data/certified-budget-identities.v1.json','scripts/borg/build-assembly-record-catalog.mjs','src/apps/borg/BorgCertifiedBudgets.js']){
  const filename=path.join(f.dir,p),bytes=fs.readFileSync(filename);fs.appendFileSync(filename,' ');assert.throws(prepare,/Stale binding/);assert.equal(fs.existsSync(path.join(f.dir,BORG_FAMILIES['borg-catalog'])),false);fs.writeFileSync(filename,bytes);
 }
 const selected=path.join(f.dir,BORG_RUNTIME_SELECTION);fs.renameSync(selected,selected+'.absent');assert.throws(prepare,/ENOENT/);fs.renameSync(selected+'.absent',selected);
 const p=path.join(f.dir,'src/apps/borg/data/assembly-record-catalog.v2.json');
 assert.throws(()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'write',log:()=>fs.appendFileSync(p,' ')}),/Identity|Stale/);
});

test('projection and source replacement reject through final generation and published-byte checks',t=>{
 const f=fixture(t);
 for(const id of Object.keys(BORG_FAMILIES))prepareRuntimeAssets({rootDir:f.dir,familyId:id,mode:'write',log:()=>{}});
 const admission=f.run();for(const id of Object.keys(BORG_FAMILIES))admission.verifyFamily(id);
 // An independent copied output first passes; later changed browser bytes fail.
 const output=path.join(f.dir,'site');fs.mkdirSync(output);
 const graph=validate(decode(fs.readFileSync(BORG_OUTPUT_MAP)));
 for(const r of graph.sources.values())if(r.binding.path.startsWith('src/')||Object.values(BORG_FAMILIES).includes(r.binding.path)){const p=path.join(output,r.binding.path);fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(path.join(f.dir,r.binding.path),p);}
 admission.verifyPublished(output);
 const browser=path.join(output,'src/apps/borg/BorgAssemblyRecordCatalog.js');fs.appendFileSync(browser,' ');assert.throws(()=>admission.verifyPublished(output),/Stale binding/);
 const projection=path.join(f.dir,BORG_FAMILIES['borg-catalog']);fs.copyFileSync(projection,projection+'.new');fs.renameSync(projection+'.new',projection);assert.throws(admission.check,/Original identity replaced/);
 const current=f.run(),bytes=fs.readFileSync(projection);fs.appendFileSync(projection,' ');assert.throws(()=>current.verifyFamily('borg-catalog'),/Stale binding/);fs.writeFileSync(projection,bytes);
 const selected=f.run(),source=path.join(f.dir,'src/apps/borg/BorgCertifiedBudgets.js');fs.copyFileSync(source,source+'.new');fs.renameSync(source+'.new',source);assert.throws(selected.check,/Original identity replaced/);
});

test('graph-valid payload and operational successors remain protected or ungranted',t=>{
 const f=fixture(t);assert.doesNotThrow(f.run);
 const mapPath=path.join(f.dir,BORG_RUNTIME_MAP),reviewPath=path.join(f.dir,f.selection.transition),original=fs.readFileSync(mapPath),review=fs.readFileSync(reviewPath);
 for(const [p,reason] of [['src/apps/borg/data/certified-budget-identities.v1.json',/Protected scientific\/reference\/reader selection/],['scripts/borg/selected-runtime-admission.mjs',/Operational refresh not eligible/]]){
  const before=decode(original),after=structuredClone(before),r=after['@graph'].find(r=>r.binding?.path===p);r.revisionId+='-new';r.binding.sha256='0'.repeat(64);after.revisionId+='-new';
  for(const e of after['@graph'].filter(e=>e.from===r['@id']||e.to===r['@id'])){if(e.from===r['@id'])e.fromRevision=r.revisionId;if(e.to===r['@id'])e.toRevision=r.revisionId;e.revisionId+='-new';}
  validate(after);const transition=decode(review);transition.profiles[0].changes=changesBetween(before,after);fs.writeFileSync(mapPath,JSON.stringify(after));transition.profiles[0].sha256=sha256(fs.readFileSync(mapPath));fs.writeFileSync(reviewPath,JSON.stringify(transition));
  assert.throws(()=>beginBorgRuntimeAdmission({root:f.dir,selection:{...f.selection,transitionSha256:sha256(fs.readFileSync(reviewPath))}}),reason);fs.writeFileSync(mapPath,original);fs.writeFileSync(reviewPath,review);
 }
});

test('standard dependency query propagates both projections to every declared direct consumer',async()=>{
 const before=decode(fs.readFileSync(BORG_OUTPUT_MAP)),graph=validate(before),proof=decode(fs.readFileSync(proofPath));assert.equal((await compareSourceManifests(before,before)).status,'unchanged');
 for(const [family,wrapper] of [['borg-catalog','BorgAssemblyRecordCatalog.js'],['borg-budget-identities','BorgCertifiedBudgets.js']]){
  const after=structuredClone(before),r=after['@graph'].find(r=>r.binding?.path===BORG_FAMILIES[family]);r.binding.sha256='0'.repeat(64);r.revisionId+='-new';
  for(const e of after['@graph'].filter(e=>e.from===r['@id']||e.to===r['@id'])){if(e.from===r['@id'])e.fromRevision=r.revisionId;if(e.to===r['@id'])e.toRevision=r.revisionId;e.revisionId+='-new';}
  const impact=await compareSourceManifests(before,after);assert.equal(impact.status,'review-required');
  for(const p of proof.consumers.filter(p=>fs.readFileSync(p,'utf8').includes(wrapper)))assert.ok(impact.affected.includes([...graph.sources.values()].find(r=>r.binding.path===p)['@id']),p);
 }
});

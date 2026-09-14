import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {prepareRuntimeAssets} from '../scripts/prepare-runtime-assets.mjs';

const OUTPUTS={
 'borg-catalog':'content/generated/borg/assembly-record-catalog.v2.js',
 'borg-budget-identities':'content/generated/borg/certified-budget-identities.v1.js',
};
function fixture(t){
 const dir=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'runtime-asset-preparation-')));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 // Source-only fixture: no selected-source records or generated outputs.
 const sources=[
  'package.json','scripts/config/generated-runtime-assets.json',
  'scripts/borg/build-assembly-record-catalog.mjs','scripts/borg/build-certified-budget-identities.mjs',
  'src/apps/borg/BorgAssemblyRecordCatalog.js','src/apps/borg/BorgAssemblyRecordCatalogContract.js',
  'src/apps/borg/BorgCertifiedBudgets.js','src/apps/borg/BorgCertifiedBudgetIdentityContract.js',
  'src/apps/borg/data/assembly-record-catalog.v2.json','src/apps/borg/data/certified-budget-identities.v1.json',
 ];
 for(const source of sources){const target=path.join(dir,source);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(new URL('../'+source,import.meta.url),target);}
 return{dir};
}

test('source-only setup reconstructs projections before synchronous browser imports',t=>{
 const f=fixture(t);
 for(const p of Object.values(OUTPUTS))assert.equal(fs.existsSync(path.join(f.dir,p)),false);
 for(const id of Object.keys(OUTPUTS)){
  const prepared=prepareRuntimeAssets({rootDir:f.dir,familyId:id,mode:'write',log:()=>{}});assert.equal(prepared.length,1);assert.equal(Object.hasOwn(prepared,'verifyBorgPublished'),false);
  assert.equal(prepareRuntimeAssets({rootDir:f.dir,familyId:id,mode:'check',log:()=>{}})[0].id,id);
 }
 const code=`import assert from 'node:assert/strict';globalThis.fetch=()=>{throw Error('No asynchronous initialization')};const c=await import('./src/apps/borg/BorgAssemblyRecordCatalog.js');const b=await import('./src/apps/borg/BorgCertifiedBudgets.js');assert.ok(Object.isFrozen(c.BORG_ASSEMBLY_RECORD_CATALOG));assert.ok(Object.isFrozen(b.BORG_CERTIFIED_BUDGET_PRESETS));console.log('BROWSER_READY');`;
 const actual=spawnSync(process.execPath,['--input-type=module','-e',code],{cwd:f.dir,encoding:'utf8',timeout:10000});assert.equal(actual.status,0,actual.stdout+actual.stderr);assert.match(actual.stdout,/BROWSER_READY/);
});

test('setup accepts source edits without a selection while retaining generated freshness checks',t=>{
 const f=fixture(t);
 const prepare=()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'write',log:()=>{}});
 for(const p of ['src/apps/borg/data/assembly-record-catalog.v2.json','src/apps/borg/data/certified-budget-identities.v1.json','scripts/borg/build-assembly-record-catalog.mjs','src/apps/borg/BorgCertifiedBudgets.js']){
  const filename=path.join(f.dir,p),bytes=fs.readFileSync(filename);fs.appendFileSync(filename,' ');assert.doesNotThrow(prepare);fs.writeFileSync(filename,bytes);
 }
 assert.equal(fs.existsSync(path.join(f.dir,'reference/priorities/development-process-review')),false);assert.doesNotThrow(prepare);
 const p=path.join(f.dir,'src/apps/borg/data/assembly-record-catalog.v2.json');
 assert.doesNotThrow(()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'write',log:()=>fs.appendFileSync(p,' ')}));
 const output=path.join(f.dir,OUTPUTS['borg-catalog']);fs.appendFileSync(output,' ');
 assert.throws(()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'check',log:()=>{}}),/projection missing or stale/);
 assert.doesNotThrow(prepare);
 assert.doesNotThrow(()=>prepareRuntimeAssets({rootDir:f.dir,familyId:'borg-catalog',mode:'check',log:()=>{}}));
 fs.writeFileSync(p,'invalid JSON');assert.throws(prepare,/JSON/);
});

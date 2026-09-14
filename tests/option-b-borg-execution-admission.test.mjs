import {copyProductionFixture} from './support/option-b-production-fixtures.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {pathToFileURL} from 'node:url';
import {decode,sha256} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {beginBorgConsumerAdmission,BORG_RUNTIME_MAP,BORG_OUTPUT_MAP,BORG_RUNTIME_SELECTION,BORG_FAMILIES} from '../scripts/borg/selected-runtime-admission.mjs';
const ROOT=fs.realpathSync(new URL('../',import.meta.url));
const CLIENT='scripts/eom/BorgNativeEomProcessClient.mjs';
function fixture(t){
 const dir=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'borg-execution-admission-')));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 copyProductionFixture(ROOT,dir);
 const selection=decode(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_SELECTION))),accepted=decode(fs.readFileSync(path.join(ROOT,selection.acceptedBaseline))),graph=decode(fs.readFileSync(path.join(ROOT,BORG_RUNTIME_MAP)));
 const files=new Set(['package.json',BORG_RUNTIME_SELECTION,BORG_RUNTIME_MAP,BORG_OUTPUT_MAP,selection.acceptedBaseline,selection.transition,accepted.historicalProof.path,...graph['@graph'].filter(r=>r.binding).map(r=>r.binding.path),...Object.values(BORG_FAMILIES)]);
 for(const p of files){fs.mkdirSync(path.dirname(path.join(dir,p)),{recursive:true});fs.copyFileSync(path.join(ROOT,p),path.join(dir,p));}
 return{dir,selection,admit:consumer=>beginBorgConsumerAdmission({root:dir,consumer})};
}
test('Borg scientific preparation and execution consumers require all selected inputs',t=>{
 const f=fixture(t);f.admit(CLIENT).check();
 for(const p of ['src/apps/borg/BorgCertifiedBudgets.js',BORG_FAMILIES['borg-budget-identities'],CLIENT,'src/apps/borg/BorgEomShadowRunner.js']){
  const filename=path.join(f.dir,p),original=fs.readFileSync(filename);fs.appendFileSync(filename,' ');assert.throws(()=>f.admit(CLIENT),/Stale binding/);fs.writeFileSync(filename,original);
 }
 assert.throws(()=>f.admit('scripts/not-selected.mjs'),/Unselected Borg consumer/);
 fs.unlinkSync(path.join(f.dir,BORG_RUNTIME_SELECTION));assert.throws(()=>f.admit(CLIENT),/ENOENT/);
});
test('Borg retained captures reject same-byte source projection and selection replacement',t=>{
 for(const p of [CLIENT,BORG_FAMILIES['borg-budget-identities'],BORG_RUNTIME_SELECTION]){
  const f=fixture(t),admission=f.admit(CLIENT);admission.check();const filename=path.join(f.dir,p);fs.copyFileSync(filename,filename+'.new');fs.renameSync(filename+'.new',filename);assert.throws(admission.check,/Original identity replaced/);
 }
});
test('actual Borg client rejects unselected executable before protocol probe and retains executable through requests',async t=>{
 const f=fixture(t),binary=path.join(f.dir,'fixture-binary'),marker=path.join(f.dir,'spawned');
 const source='#!/bin/sh\nif [ "$1" = "print-protocol-version" ]; then printf "EOM_BORG_NATIVE_V11\\n"; else touch "'+marker+'"; fi\n';
 fs.writeFileSync(binary,source,{mode:0o700});
 const {createBorgNativeEomProcessClient}=await import(pathToFileURL(path.join(f.dir,CLIENT)).href);
 assert.throws(()=>createBorgNativeEomProcessClient({binaryPath:binary}),/requires admitted build provenance/);assert.equal(fs.existsSync(marker),false);
 const client=createBorgNativeEomProcessClient({binaryPath:binary,executableBinding:{path:binary,sha256:sha256(source)}});t.after(()=>client.dispose());
 assert.equal(client.protocolMagic,'EOM_BORG_NATIVE_V11');assert.equal(fs.existsSync(marker),false);
 fs.copyFileSync(binary,binary+'.new');fs.renameSync(binary+'.new',binary);
 await assert.rejects(client.evolveRetainedHistories({}),/Original identity replaced/);assert.equal(fs.existsSync(marker),false);
});
test('selected development build fixture binds source generation and denies changed executable',async t=>{
 const f=fixture(t),binary=path.join(f.dir,'fixture-binary'),source='#!/bin/sh\nprintf "EOM_BORG_NATIVE_V11\\n"\n';fs.writeFileSync(binary,source,{mode:0o700});
 const record={schema:'borg-eom-development-build/v1',buildSucceeded:true,scientificAcceptance:false,executionAuthorized:false,sourceSelection:f.selection,sourceMapSha256:sha256(fs.readFileSync(path.join(f.dir,BORG_RUNTIME_MAP))),executable:{path:binary,sha256:sha256(source)},toolchain:{path:binary,sha256:sha256(source)}};
 const bytes=JSON.stringify(record);fs.writeFileSync(binary+'.option-b-build.json',bytes);fs.writeFileSync(binary+'.option-b-selection.json',JSON.stringify({schema:'borg-eom-build-selection/v1',record:path.basename(binary)+'.option-b-build.json',recordSha256:sha256(bytes)}));
 const {retainBorgExecutable}=await import(pathToFileURL(path.join(f.dir,'scripts/eom/BorgExecutableAdmission.mjs')).href);
 const admission=retainBorgExecutable({binaryPath:binary});admission.check();fs.appendFileSync(binary,' ');assert.throws(admission.check,/Stale binding/);
 fs.writeFileSync(binary,source);
 const originalOpen=fs.openSync,originalRead=fs.readFileSync,selectorPath=binary+'.option-b-selection.json';let selectorFd,changed=false;
 fs.openSync=function(filename,...args){const fd=originalOpen.call(fs,filename,...args);if(filename===selectorPath)selectorFd=fd;return fd;};
 fs.readFileSync=function(filename,...args){const raw=originalRead.call(fs,filename,...args);if(filename===selectorFd&&!changed){changed=true;fs.writeFileSync(selectorPath+'.replacement',raw);fs.renameSync(selectorPath+'.replacement',selectorPath);}return raw;};
 try{assert.throws(()=>retainBorgExecutable({binaryPath:binary}),/Executable selection (?:replaced|changed during first read)/);assert.equal(changed,true);}finally{fs.openSync=originalOpen;fs.readFileSync=originalRead;}

});

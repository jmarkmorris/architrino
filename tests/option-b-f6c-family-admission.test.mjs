import {copyProductionFixture,expectedPhysicalPaths} from './support/option-b-production-fixtures.mjs';
import {loadProductionTestModule,originalProductionTestSource} from './support/option-b-production-hosts.mjs';
import { nextTestIdentities } from './support/option-b-next-test-identities.mjs';
const NEXT_TEST_SHA = nextTestIdentities("tests/option-b-f6c-family-admission.test.mjs", 3);
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
const Parent=await loadProductionTestModule(import.meta.url,"scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs");
const Packaging=await loadProductionTestModule(import.meta.url,"scripts/eom/run-f6c-evidence-packaging.mjs");
const Stream=await loadProductionTestModule(import.meta.url,"scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs");
const root=realpathSync(process.cwd()),reader='scripts/equation-mapping/current-source-manifest.mjs';
const hash=raw=>createHash('sha256').update(raw).digest('hex');
const bind=p=>{const raw=readFileSync(p);return{path:p,sha256:hash(raw),bytes:raw.length};};
function fixture(t){
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'b-f6c-family-')));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 copyProductionFixture(root,dir);
 const doc=JSON.parse(readFileSync(path.join(root,C.SOURCE_MAP)));
 for(const row of doc['@graph'].filter(r=>r['@type']==='Source')){
  const p=path.join(dir,row.binding.path),raw=readFileSync(path.join(root,row.binding.path));
  mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,raw);row.binding.sha256=hash(raw);
 }
 const map=path.join(dir,C.SOURCE_MAP);mkdirSync(path.dirname(map),{recursive:true});writeFileSync(map,JSON.stringify(doc,null,2)+'\n');
 const sources=[...doc['@graph'].filter(r=>r['@type']==='Source').map(r=>bind(path.join(dir,r.binding.path))),bind(map)];
 const plan={root:dir,sources,hookModule:sources[0],hookControls:sources[1],stages:[]};
 const spec={root:dir,bindings:{...Object.fromEntries(Object.entries(Stream.OPERATIONS).map(([k,p])=>[k,bind(path.join(dir,p))])),sourceMap:bind(map),manifestReader:bind(path.join(dir,reader))}};
 return{dir,map,doc,plan,spec,sources};
}
test('selected family admits complete operational and production closure before current target checks',async t=>{
 const f=fixture(t);
 for(const M of[Parent,Packaging])assert.deepEqual((await M.admitOperationalSources(f.plan)).sourceAdmission.sources.map(b=>b.path).sort(),expectedPhysicalPaths(f.dir,C.SOURCE_MAP));
 assert.deepEqual((await Stream.admitOperationalSources(f.spec)).sources.map(b=>b.path).sort(),expectedPhysicalPaths(f.dir,C.SOURCE_MAP));
});
test('current family reuses the common selection without changing scientific or historical declarations',async()=>{
 const admission=await C.initializeSourceBindings(root,bind(path.join(root,C.SOURCE_MAP)).sha256);
 const plan={root,sources:admission.sources,hookModule:admission.sources[0],hookControls:admission.sources[1],stages:[]};
 for(const M of[Parent,Packaging])assert.deepEqual((await M.admitOperationalSources(plan)).sourceAdmission.sourceMap,admission.sourceMap);
 const spec={root,bindings:{...Object.fromEntries(Object.entries(Stream.OPERATIONS).map(([k,p])=>[k,bind(path.join(root,p))])),sourceMap:admission.sourceMap,manifestReader:bind(path.join(root,reader))}};
 assert.deepEqual((await Stream.admitOperationalSources(spec)).sourceMap,admission.sourceMap);
 const baseline=JSON.parse(readFileSync(path.join(root,'reference/priorities/development-process-review/contracts/option-b-f6c-family-baseline.json')));
 for(const [M,filename]of[[Parent,Parent.SELF],[Packaging,Packaging.SELF],[Stream,Stream.SELF]]){
  const row=baseline.sources.find(b=>b.path===filename);
  for(const k of['NAMED','DEPENDENCIES','ORIGINAL','PACKAGE_PINS','GENERIC_PINS','FRESH_CLOSURE_PINS'])if(row[k])assert.deepEqual(M[k],row[k],filename+' '+k);
  if(M!==Parent){const pins=structuredClone(row.PINS);if(M===Stream)for(const k of Object.keys(Stream.OPERATIONS))delete pins[k];assert.deepEqual(M.PINS,pins);}
 }
 const literal=(source,name)=>{const match=source.match(new RegExp('export\\s+const\\s+'+name+'\\s*=\\s*String\\.raw`([^`]+)`'));assert.ok(match,'original Python literal');return match[1];};
 assert.equal(literal('export const PYTHON=String.raw`known`;','PYTHON'),'known');
 for(const [M,name,expected] of [[Stream,'PYTHON',NEXT_TEST_SHA[0]],[Parent,'PYTHON_BOOTSTRAP',NEXT_TEST_SHA[1]],[Packaging,'PYTHON',NEXT_TEST_SHA[2]]]){
  assert.equal(hash(literal(originalProductionTestSource(M.SELF).toString(),name)),expected);
  assert.equal(typeof M[name],'string');
 }
});
test('parent and packaging reject omitted map, helper, reader, changed map and missing external selection',async t=>{
 for(const M of[Parent,Packaging])for(const p of[C.SOURCE_MAP,reader,...Object.values(C.DEPENDENCIES)]){
  const f=fixture(t);f.plan.sources=f.plan.sources.filter(b=>b.path!==path.join(f.dir,p));
  f.plan.hookModule=f.plan.sources.find(b=>b.path===path.join(f.dir,C.SELF));f.plan.hookControls=f.plan.hookModule;
  await assert.rejects(M.admitOperationalSources(f.plan));
 }
 for(const M of[Parent,Packaging]){const f=fixture(t);writeFileSync(f.map,readFileSync(f.map)+' ');await assert.rejects(M.admitOperationalSources(f.plan),/hash mismatch/);}
});
test('streamed capture requires map, reader and every exact operational binding',async t=>{
 for(const role of['sourceMap','manifestReader',...Object.keys(Stream.OPERATIONS)]){
  const f=fixture(t);delete f.spec.bindings[role];await assert.rejects(Stream.admitOperationalSources(f.spec));
  const g=fixture(t);g.spec.bindings[role].sha256='0'.repeat(64);await assert.rejects(Stream.admitOperationalSources(g.spec));
 }
 const f=fixture(t);f.spec.bindings.sourceMap.bytes++;await assert.rejects(Stream.admitOperationalSources(f.spec),/size/);
});
test('newly selected maps still reject missing coverage, wrong role and foreign scope in all three callers',async t=>{
 for(const mutate of[d=>d.scope='foreign',d=>d['@graph'].find(r=>r.role==='current-source').role='independent-reference',d=>d['@graph']=d['@graph'].filter(r=>!(r.kind==='checks'&&r.to.endsWith(encodeURIComponent(C.DEPENDENCIES.helpers))))]){
  const f=fixture(t);mutate(f.doc);writeFileSync(f.map,JSON.stringify(f.doc,null,2)+'\n');const selected=bind(f.map);
  f.plan.sources=f.plan.sources.map(b=>b.path===f.map?selected:b);f.spec.bindings.sourceMap=selected;
  for(const M of[Parent,Packaging])await assert.rejects(M.admitOperationalSources(f.plan));await assert.rejects(Stream.admitOperationalSources(f.spec));
 }
});
test('public hook and registered entry reject missing admission before scientific preparation or execution',async t=>{
 const f=fixture(t),deadlineNanoseconds=String(process.hrtime.bigint()+5000000000n);f.plan.sources=f.plan.sources.filter(b=>b.path!==f.map);
 for(const M of[Parent,Packaging])await assert.rejects(M.fileOperation({kind:'preflight',plan:f.plan,deadlineNanoseconds}),/source map/);
 const p=path.join(f.dir,'plan.json');writeFileSync(p,JSON.stringify(f.plan));await assert.rejects(Packaging.registered('producer',bind(p),deadlineNanoseconds,null),/source map/);
 delete f.spec.bindings.sourceMap;const s=path.join(f.dir,'spec.json');writeFileSync(s,JSON.stringify(f.spec)+'\n');
 await assert.rejects(Stream.fileOperation({kind:'preflight',specPath:s,specSha:bind(s).sha256,selfSha:'a'.repeat(64),deadlineNanoseconds}));
 await assert.rejects(Stream.registered(s,bind(s).sha256,'a'.repeat(64),deadlineNanoseconds));
});
test('admission never renews the deadline',async t=>{
 const f=fixture(t),expired=()=>{throw Error('original deadline expired');};
 for(const M of[Parent,Packaging])await assert.rejects(M.admitOperationalSources(f.plan,expired),/original deadline/);
 await assert.rejects(Stream.admitOperationalSources(f.spec,expired),/original deadline/);
});

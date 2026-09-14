import {copyProductionFixture,expectedPhysicalPaths,productionFixturePaths,actualBinding} from './support/option-b-production-fixtures.mjs';
import {loadProductionTestModule} from './support/option-b-production-hosts.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,realpathSync,rmSync,renameSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
const {verifyCurrentSelection}=await loadProductionTestModule(import.meta.url,"scripts/eom/verify-f6c-bounded-operation-closure.mjs");
import {runFileWorker} from '../scripts/eom/launch-prescribed-response-pilot.mjs';
const root=realpathSync(process.cwd()),hash=raw=>createHash('sha256').update(raw).digest('hex');
const reader='scripts/equation-mapping/current-source-manifest.mjs';
function fixture(t){
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'b-f6c-admission-')));t.after(()=>rmSync(dir,{recursive:true,force:true}));
 copyProductionFixture(root,dir);
 const doc=JSON.parse(readFileSync(path.join(root,C.SOURCE_MAP)));
 for(const row of doc['@graph'].filter(r=>r['@type']==='Source')){
  const p=path.join(dir,row.binding.path),raw=readFileSync(path.join(root,row.binding.path));
  mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,raw);row.binding.sha256=hash(raw);
 }
 const map=path.join(dir,C.SOURCE_MAP);mkdirSync(path.dirname(map),{recursive:true});
 const save=()=>{const raw=Buffer.from(JSON.stringify(doc,null,2)+'\n');writeFileSync(map,raw);return hash(raw);};
 return{dir,doc,map,save,digest:save()};
}
test('selected fixture admits the complete operational and production physical closure',async t=>{
 const f=fixture(t),isolated=await import('../scripts/eom/f6c-bounded-operation.mjs?fixture='+encodeURIComponent(f.dir)),r=await isolated.initializeSourceBindings(f.dir,f.digest);
 assert.deepEqual(r.sources.map(b=>b.path).sort(),expectedPhysicalPaths(f.dir,C.SOURCE_MAP));assert.equal(Object.keys(r.dependencies).length,3);assert.equal(r.sourceMap.sha256,f.digest);
});
test('current coordinator graph and independent selector agree on actual selected source coverage',async()=>{
 const raw=readFileSync(path.join(root,C.SOURCE_MAP)),r=await C.initializeSourceBindings(root,hash(raw));
 const b=p=>r.sources.find(b=>b.path===path.join(root,p));
 const invocation={schema:'braid-program/observed-bounded-invocation.v2',root,coordinator:b(C.SELF),node:{path:'/selected/node',sha256:'a'.repeat(64),bytes:1},plan:{path:'/selected/plan',sha256:'b'.repeat(64),bytes:1},control:true,sourceMap:r.sourceMap};
 const selected=verifyCurrentSelection(invocation);assert.deepEqual(selected.map(b=>b.path).sort(),JSON.parse(raw)['@graph'].filter(r=>r['@type']==='Source').map(row=>path.join(root,row.binding.path)).sort());assert.deepEqual(r.sources.map(b=>b.path).sort(),expectedPhysicalPaths(root,C.SOURCE_MAP));
 assert.equal(Object.hasOwn(C,'PINS'),false);
});
test('missing external digest, source-byte mutation, map-byte mutation and changed reader reject',async t=>{
 const f=fixture(t);await assert.rejects(C.initializeSourceBindings(f.dir));
 writeFileSync(path.join(f.dir,C.DEPENDENCIES.helpers),'changed');await assert.rejects(C.initializeSourceBindings(f.dir,f.digest));
 const g=fixture(t);writeFileSync(g.map,readFileSync(g.map)+' ');await assert.rejects(C.initializeSourceBindings(g.dir,g.digest));
 const h=fixture(t);writeFileSync(path.join(h.dir,reader),'throw Error("must not execute");');await assert.rejects(C.initializeSourceBindings(h.dir,h.digest),/hash mismatch/);
});
test('missing helper coverage, wrong profile and incorrect role reject even with newly selected map digest',async t=>{
 for(const mutate of [d=>d.scope='other',d=>d['@graph'].find(r=>r.role==='current-source').role='independent-reference',d=>d['@graph']=d['@graph'].filter(r=>!(r.kind==='checks'&&r.to.endsWith(encodeURIComponent(C.DEPENDENCIES.helpers))))]){
  const f=fixture(t);mutate(f.doc);await assert.rejects(C.initializeSourceBindings(f.dir,f.save()));
 }
});
test('capture-to-use recheck rejects identical-byte helper replacement',async t=>{
 const f=fixture(t),p=path.join(f.dir,C.DEPENDENCIES.helpers);let visits=0;
 await assert.rejects(C.initializeSourceBindings(f.dir,f.digest,()=>{
  // Replacement after initial helper capture, during a subsequent file capture.
  if(++visits===22){const raw=readFileSync(p);renameSync(p,p+'.original');writeFileSync(p,raw);}
 }));
});
test('actual metadata worker requires the externally selected source-admission context',async()=>{
 const signal=new AbortController().signal;
 assert.deepEqual(await runFileWorker({},Buffer.from('export function fileOperation(){return {literal:true}}'),5000,signal),{literal:true});
 const bytes=readFileSync(path.join(root,C.SELF));
 const sourceMapSha256=hash(readFileSync(path.join(root,C.SOURCE_MAP)));
 const job={kind:'capture',root,sourceMapSha256,sources:[],identities:{},deadlineNanoseconds:String(process.hrtime.bigint()+5000000000n)};
 await assert.rejects(runFileWorker({...job,sourceMapSha256:undefined},bytes,5000,signal),/explicit expected SHA-256 required/);
 await assert.rejects(runFileWorker(job,bytes,5000,signal),/Worker requires selected operational map/);
 const map=actualBinding(path.join(root,C.SOURCE_MAP));
 const result=await runFileWorker({...job,sources:[map]},bytes,5000,signal);
 const expected=expectedPhysicalPaths(root,C.SOURCE_MAP);
 assert.deepEqual(result.sources.map(b=>b.path).sort(),expected);assert.equal(result.sources.length,Object.keys(result.identities).length);
 await assert.rejects(runFileWorker({...job,sources:[{...map,sha256:'0'.repeat(64)}]},bytes,5000,signal),/hash mismatch/);
});

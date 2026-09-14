import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {CONTEXT, NS, sha256, validate} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {beginProductionAdmission, captureProductionIdentities, PRODUCTION_PROFILE, PRODUCTION_MANIFEST, PRODUCTION_SELECTION, PRODUCTION_IDENTITIES, PRODUCTION_ORIGINALS} from '../scripts/equation-mapping/production-source-records.mjs';

const consumer = 'fixture/host.mjs';
const values = () => ({schema:'option-b-production-identities/v1',algorithm:'SHA-256',role:'original-identities-preserve-individual-applicability',byConsumer:{[consumer]:['a'.repeat(64)]}});
test('FIRST known original identity record is immutable and malformed records reject', () => {
  const captured = captureProductionIdentities(Buffer.from(JSON.stringify(values())), consumer);
  assert.deepEqual(captured, ['a'.repeat(64)]); assert.ok(Object.isFrozen(captured));
  for (const alter of [x=>x.role='current',x=>x.extra=true,x=>x.byConsumer[consumer]=[],x=>x.byConsumer[consumer]=['no digest'],x=>x.byConsumer['../escape']=['a'.repeat(64)]]) {
    const x=values(); alter(x); assert.throws(()=>captureProductionIdentities(Buffer.from(JSON.stringify(x)), consumer));
  }
  assert.throws(()=>captureProductionIdentities(Buffer.from('{"schema":1,"schema":2}'), consumer));
});
function fixture(t, {removeDependency, versions = false, nonidentity = false} = {}) {
  const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'production-records-')));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const put=(p,value)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),typeof value==='string'?value:JSON.stringify(value));};
  const archive='fixture/original.source';
  put(consumer,'current source');put(archive,'original source');put(PRODUCTION_IDENTITIES,values());
  const entry={path:archive,sha256:sha256('original source')}, extra=[];
  if(versions){put('fixture/older.source','older source');entry.versions={[sha256('older source')]:{path:'fixture/older.source',sha256:sha256('older source')}};extra.push('fixture/older.source');}
  const originals={[consumer]:entry};
  if(nonidentity){put('fixture/CMakeLists.txt','current CMake');extra.push('fixture/CMakeLists.txt');originals['fixture/CMakeLists.txt']={path:archive,sha256:sha256('original source')};}
  put(PRODUCTION_ORIGINALS,{schema:'option-b-production-original-sources/v1',role:'historical-source-generations-not-current-acceptance',sources:originals});
  const rows=[consumer,archive,PRODUCTION_IDENTITIES,PRODUCTION_ORIGINALS,...extra].map((p,i)=>({'@id':NS+'fixture/'+i,'@type':'Source',revisionId:'fixture',role:i===0?'admission':'scientific-control',binding:{path:p,selector:{kind:'whole'},contract:'fixed-byte-selection/v1',sha256:sha256(fs.readFileSync(path.join(root,p)))}}));
  const edges=rows.slice(1).map((r,i)=>({'@id':NS+'fixture/edge/'+i,'@type':'Relationship',revisionId:'fixture',kind:'dependsOn',from:rows[0]['@id'],fromRevision:'fixture',to:r['@id'],toRevision:'fixture',role:'known-input'}));
  edges.push(...rows.map((r,i)=>({'@id':NS+'fixture/check/'+i,'@type':'Relationship',revisionId:'fixture',kind:'checks',from:rows[0]['@id'],fromRevision:'fixture',to:r['@id'],toRevision:'fixture',role:'known-admission'})));
  const graph={'@context':CONTEXT,schemaVersion:'current-source-manifest/v1',scope:PRODUCTION_PROFILE,repository:'https://github.com/jmarkmorris/architrino.git',baseline:{commit:'1'.repeat(40),entry:consumer,authority:'operator-directed-existing-A-transfer'},revisionId:'fixture','@graph':[...rows,...edges.filter(e=>!(e.kind==='dependsOn'&&e.to===rows.find(r=>r.binding.path===removeDependency)?.['@id']))]};
  validate(graph);put(PRODUCTION_MANIFEST,graph);
  const proof='fixture/proof.json',accepted='fixture/accepted.json',transition='fixture/transition.json';put(proof,{known:true});
  put(accepted,{schema:'accepted-current-source-baseline/v1',historicalProof:{path:proof,sha256:sha256(fs.readFileSync(path.join(root,proof)))},profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,manifestRaw:fs.readFileSync(path.join(root,PRODUCTION_MANIFEST),'utf8'),historicalEvidenceBindings:[],operationalRefreshEligibility:[]}]});
  put(transition,{schema:'reviewed-current-source-transition/v1',predecessorSha256:sha256(fs.readFileSync(path.join(root,accepted))),reviewReference:'known fixture',profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,sha256:sha256(fs.readFileSync(path.join(root,PRODUCTION_MANIFEST))),changes:[]}]});
  const selection={acceptedBaseline:accepted,acceptedBaselineSha256:sha256(fs.readFileSync(path.join(root,accepted))),transition,transitionSha256:sha256(fs.readFileSync(path.join(root,transition)))};
  put(PRODUCTION_SELECTION,selection);return {root,selection,put,archive};
}
test('known selected host captures original and current bytes before lifetime replacement controls', t => {
  const f=fixture(t),admission=beginProductionAdmission({...f,consumer});
  assert.deepEqual(admission.identities(),['a'.repeat(64)]);
  assert.deepEqual(admission.sourcePair(consumer),{original:'original source',current:'current source',identities:['a'.repeat(64)]});
  const p=path.join(f.root,consumer);fs.copyFileSync(p,p+'.replacement');fs.renameSync(p+'.replacement',p);
  assert.throws(()=>admission.check());assert.throws(()=>admission.sourcePair(consumer));
});
test('known earlier source generation and nonidentity source preserve distinct provenance', t => {
  const f=fixture(t,{versions:true,nonidentity:true}),a=beginProductionAdmission({...f,consumer});
  assert.equal(a.sourcePair(consumer,sha256('older source')).original,'older source');
  assert.deepEqual(a.originalSourceBinding(consumer,sha256('older source')), {path:path.join(f.root,'fixture/older.source'),sha256:sha256('older source'),bytes:Buffer.byteLength('older source')});
  assert.equal(a.sourcePair(consumer).original,'original source');
  assert.throws(()=>a.sourcePair(consumer,'f'.repeat(64)),/generation missing/);
  assert.equal(a.originalSourceBindingIfPresent('fixture/unmigrated.py','f'.repeat(64)),null);
  assert.throws(()=>a.originalSourceBindingIfPresent(consumer,'f'.repeat(64)),/generation missing/);
  assert.deepEqual(a.sourcePair('fixture/CMakeLists.txt').identities,[]);
  assert.throws(()=>a.identities('fixture/CMakeLists.txt'),/identity owner missing/);
});
test('graph membership alone does not grant original index or archive access', t => {
  for(const target of [PRODUCTION_ORIGINALS,'fixture/original.source']){
    const f=fixture(t,{removeDependency:target}),a=beginProductionAdmission({...f,consumer});
    assert.equal(a.identities().length,1);
    assert.throws(()=>a.sourcePair(consumer),/consumer dependency required/);
  }
  const f=fixture(t,{nonidentity:true,removeDependency:'fixture/CMakeLists.txt'}),a=beginProductionAdmission({...f,consumer});
  assert.throws(()=>a.sourcePair('fixture/CMakeLists.txt'),/consumer dependency required/);
});
test('known selection rejects missing altered and replaced anchors and records', t => {
  const f=fixture(t);assert.equal(beginProductionAdmission({...f,consumer}).identities().length,1);
  assert.throws(()=>beginProductionAdmission({...f,consumer,selection:{...f.selection,transitionSha256:'0'.repeat(64)}}));
  for(const relative of [PRODUCTION_IDENTITIES,PRODUCTION_ORIGINALS,f.archive,consumer]){
    const p=path.join(f.root,relative),raw=fs.readFileSync(p);fs.appendFileSync(p,' ');assert.throws(()=>beginProductionAdmission({...f,consumer}));fs.writeFileSync(p,raw);
  }
  const admitted=beginProductionAdmission({...f,consumer}),p=path.join(f.root,PRODUCTION_SELECTION);
  fs.copyFileSync(p,p+'.new');fs.renameSync(p+'.new',p);assert.throws(()=>admitted.check());
  fs.unlinkSync(p);assert.throws(()=>beginProductionAdmission({...f,consumer}));
});

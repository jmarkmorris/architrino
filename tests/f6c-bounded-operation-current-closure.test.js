// Literal protocol construction; no coordinator, manifest reader or producer import.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fixture} from './f6c-bounded-operation-closure.test.js';
import {verifyClosure,verifyCurrentSelection} from '../scripts/eom/verify-f6c-bounded-operation-closure.mjs';
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const bind=(path,raw)=>({path,sha256:sha(raw),bytes:raw.length});
const ns='https://architrino.com/knowledge/current-source/';
function currentFixture(changeDocument=()=>{}){
 const f=fixture();f.invocation.schema='braid-program/observed-bounded-invocation.v2';
 f.invocation.coordinator.sha256='1'.repeat(64);
 const entries=[['scripts/eom/f6c-bounded-operation.mjs','admission','1'],['scripts/equation-mapping/current-source-manifest.mjs','manifest-reader','2'],['scripts/example.mjs','current-source','3']];
 const sources=entries.map(([path,role,h])=>({'@id':ns+encodeURIComponent(path),'@type':'Source',revisionId:'v1',role,binding:{path,sha256:h.repeat(64),selector:{kind:'whole'},contract:'fixed-byte-selection/v1'}}));
 const edges=sources.slice(1).map((s,i)=>({'@id':ns+'edge/'+i,'@type':'Relationship',revisionId:'v1',kind:'checks',from:sources[0]['@id'],fromRevision:'v1',to:s['@id'],toRevision:'v1',role:'admission'}));
 const document={'@context':{'@vocab':ns,from:{'@type':'@id'},to:{'@type':'@id'}},schemaVersion:'current-source-manifest/v1',scope:'f6c-bounded-operation-current-source',repository:'https://github.com/jmarkmorris/architrino.git',baseline:{commit:'a'.repeat(40),entry:entries[0][0],authority:'operator-directed-existing-A-transfer'},revisionId:'v1','@graph':[...sources,...edges]};
 changeDocument(document);
 const mapRaw=Buffer.from(JSON.stringify(document,null,2)+'\n');
 f.invocation.sourceMap=bind('/repo/reference/priorities/development-process-review/contracts/option-b-f6c-bounded-operation-sources.jsonld',mapRaw);
 f.expectedInvocation=structuredClone(f.invocation);
 f.lease.args=[f.invocation.coordinator.path,'--control-plan',f.invocation.plan.path,'--plan-sha256',f.invocation.plan.sha256,'--self-sha256',f.invocation.coordinator.sha256,'--source-map-sha256',f.invocation.sourceMap.sha256];
 f.wire.sourceBindings.push(f.invocation.sourceMap,...entries.slice(1).map(([p,,h])=>({path:'/repo/'+p,sha256:h.repeat(64),bytes:1})));
 f.wire.sourceIdentities=Object.fromEntries(f.wire.sourceBindings.map((b,i)=>[b.path,`1:${i+2}:${b.bytes}:4:5`]));
 const operationRaw=Buffer.from(JSON.stringify(f.operation)+'\n');
 f.wire.operation=bind('/repo/operation/operation.json',operationRaw);f.wire.outputBindings[0]=f.wire.operation;
 const originalRead=f.read;
 f.read=(b,options={})=>({...originalRead(b,options),...(b.path===f.invocation.sourceMap.path?{data:mapRaw}:b.path===f.wire.operation.path?{data:operationRaw}:{})});
 return f;
}
const verify=f=>verifyClosure(f,{expectedInvocation:f.expectedInvocation});
test('known current literal: selected map and closed operation yield only operational v2 acceptance',()=>{
 const f=currentFixture();assert.equal(verifyCurrentSelection(f.expectedInvocation,{read:f.read}).length,3);
 const r=verify(f);assert.equal(r.schema,'braid-program/f6c-bounded-operation-external-closure.v2');assert.equal(r.accepted,true);assert.equal(r.mathematicalAcceptance,false);assert.equal(f.wire.accepted,false);
});
test('current invocation requires a separate external expectation and rejects self-reported substitutions',()=>{
 assert.throws(()=>verifyClosure(currentFixture()),/independently selected/);
 for(const mutate of [f=>f.invocation.coordinator.sha256='4'.repeat(64),f=>f.invocation.control=false,f=>f.invocation.sourceMap.sha256='4'.repeat(64),f=>f.invocation.node.path='/other-node',f=>f.invocation.plan.path='/other-plan',f=>f.lease.args.pop(),f=>f.lease.args.push('--extra'),f=>f.lease.args[8]='0'.repeat(64)]){
  const f=currentFixture();mutate(f);assert.throws(()=>verify(f));
 }
});
test('current admission preserves process, resource, lock, exit and non-scientific predicates',()=>{
 for(const mutate of [f=>f.lease.exitCode=1,f=>f.lease.processGroupClosed=false,f=>f.observation.lock.absent=false,f=>f.observation.processes.push({pid:12,pgid:99}),f=>f.elapsedMilliseconds=120000,f=>f.wire.maximumSampleGapMs=1001,f=>f.wire.hostObservations[0].freePercent=39,f=>f.operation.limits.serialWorkers=2,f=>f.wire.accepted=true,f=>f.operation.physicalClaims=true]){
  const f=currentFixture();mutate(f);assert.throws(()=>verify(f));
 }
});
test('current closure requires selected map, reader and dependencies in captured source and operation coverage',()=>{
 for(const target of ['sourceMap','reader','helper']){
  const f=currentFixture(),p=target==='sourceMap'?f.invocation.sourceMap.path:target==='reader'?'/repo/scripts/equation-mapping/current-source-manifest.mjs':'/repo/scripts/example.mjs';
  f.wire.sourceBindings=f.wire.sourceBindings.filter(b=>b.path!==p);delete f.wire.sourceIdentities[p];assert.throws(()=>verify(f));
 }
 const f=currentFixture();f.wire.sourceBindings.at(-1).sha256='5'.repeat(64);assert.throws(()=>verify(f));
});
test('independent selected graph contract rejects wrong profile, roles, paths, revisions and missing checks',()=>{
 for(const mutate of [d=>d.scope='other-profile',d=>d['@graph'][0].role='current-source',d=>d['@graph'][1].role='current-source',d=>d['@graph'][2].binding.path='../outside',d=>d['@graph'].pop(),d=>d['@graph'].at(-1).toRevision='stale',d=>d['@graph'].push(structuredClone(d['@graph'][0])),d=>d['@graph'][0].binding.sha256='8'.repeat(64),d=>d.extra=true]){
  const f=currentFixture(mutate);assert.throws(()=>verifyCurrentSelection(f.expectedInvocation,{read:f.read}));
 }
});
test('selected raw bytes and duplicate JSON member names cannot be hidden by parse normalization',()=>{
 const f=currentFixture(),read=f.read;
 const raw=read(f.expectedInvocation.sourceMap).data;
 f.read=(b,o)=>({...read(b,o),...(b.path===f.expectedInvocation.sourceMap.path?{data:Buffer.concat([raw,Buffer.from(' ')])}:{})});assert.throws(()=>verify(f));
 const duplicated=Buffer.from(raw.toString().replace('"revisionId": "v1",','"revisionId": "discarded",\n  "revisionId": "v1",'));
 const selection={...f.expectedInvocation,sourceMap:bind(f.expectedInvocation.sourceMap.path,duplicated)};
 assert.throws(()=>verifyCurrentSelection(selection,{read:()=>({data:duplicated})}),/canonical selected manifest/);
});

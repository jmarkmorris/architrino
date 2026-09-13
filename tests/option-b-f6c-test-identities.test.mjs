import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { captureF6cTestIdentities, loadF6cTestIdentities, manifestPath, payloadPath, selectionPath } from './support/option-b-f6c-test-identities.mjs';
import { decode, sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { compareSourceManifests } from '../scripts/equation-mapping/current-source-impact.mjs';
const pilot = 'tests/f6c-cached-root-cover-pilot-launcher.test.js';
const full = 'tests/f6c-cached-root-cover-full.test.js';
const known = () => ({ schema:'option-b-f6c-test-identities/v1', authority:'operator-directed-exact-expectation-transfer', originCommit:'1'.repeat(40), claimBoundary:'Synthetic shape control only', consumers:Object.fromEntries([pilot,full].map(p=>[p,{sourceSha256:'2'.repeat(64),values:['3'.repeat(64)]}])) });
function reconstruct(source, entry) {
  assert.ok(source.startsWith(entry.prefix));
  source = source.slice(entry.prefix.length);
  for (const repair of entry.repairs ?? []) {
    assert.equal(source.split(repair.after).length, 2);
    source = source.replace(repair.after, repair.before);
  }
  return source.replace(/F6C_IDENTITIES\[(\d+)\]/gu, (_,i) => {
    assert.ok(entry.tokens[Number(i)]); return entry.tokens[Number(i)].raw;
  });
}
test('FIRST known string reader and inverse substitution controls precede repository use',()=>{
  const raw=Buffer.from(JSON.stringify(known()));
  assert.deepEqual(captureF6cTestIdentities(raw,pilot,1),['3'.repeat(64)]);
  assert.ok(Object.isFrozen(captureF6cTestIdentities(raw,pilot,1)));
  assert.equal(reconstruct('prefix const x=F6C_IDENTITIES[0];',{prefix:'prefix ',tokens:[{raw:'"original"'}]}),'const x="original";');
  for(const mutate of [r=>r.schema='unknown',r=>r.authority='self-approved',r=>r.extra=true,r=>delete r.consumers[full],r=>r.consumers[pilot].values=[3],r=>r.consumers[pilot].values=['missing'],r=>r.consumers[pilot].sourceSha256='bad']){
    const r=known();mutate(r);assert.throws(()=>captureF6cTestIdentities(Buffer.from(JSON.stringify(r)),pilot,1));
  }
  assert.throws(()=>captureF6cTestIdentities(raw,pilot,2));
  assert.throws(()=>captureF6cTestIdentities(raw,'tests/wrong.js',1));
  assert.throws(()=>captureF6cTestIdentities(Buffer.from('{"schema":1,"schema":2}'),pilot,1));
});
test('selected graph admits exact original expectations and retains every original assertion',()=>{
  const selection=decode(fs.readFileSync(selectionPath));
  const proof=decode(fs.readFileSync('reference/priorities/development-process-review/evidence/option-b-f6c-test-transfer.json'));
  for(const [p,entry] of Object.entries(proof.consumers)){
    const original=execFileSync('git',['show',`${proof.originCommit}:${p}`],{encoding:'utf8'});
    assert.equal(sha256(original),entry.sourceSha256);
    assert.equal(reconstruct(fs.readFileSync(p,'utf8'),entry),original);
    const values=loadF6cTestIdentities({selection,consumer:p,count:entry.tokens.length});
    entry.tokens.forEach((token,i)=>{
      assert.equal(original.slice(token.offset,token.offset+token.raw.length),token.raw);
      // Only a retained complete string literal is evaluated, in an empty context.
      assert.match(token.raw,/^(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*')$/u);
      assert.equal(values[i],vm.runInNewContext(token.raw,Object.create(null),{timeout:100}));
    });
  }
});
function fixture(t){
 const root=fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(),'f6c-test-graph-')));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const selection=decode(fs.readFileSync(selectionPath)),accepted=decode(fs.readFileSync(selection.acceptedBaseline));
 const graph=decode(fs.readFileSync(manifestPath));
 const files=new Set([selection.acceptedBaseline,selection.transition,accepted.historicalProof.path,manifestPath,...graph['@graph'].filter(r=>r.binding).map(r=>r.binding.path)]);
 for(const p of files){fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.copyFileSync(p,path.join(root,p));}
 return {root,selection,graph,run:(overrides={})=>loadF6cTestIdentities({root,selection,consumer:pilot,count:50,...overrides})};
}
test('known admitted baseline precedes missing wrong stale payload source and same-byte replacement controls',t=>{
 const f=fixture(t);assert.equal(f.run().length,50);
 assert.throws(()=>f.run({selection:undefined}));
 assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:'0'.repeat(64)}}));
 for(const p of [payloadPath,pilot,'tests/support/option-b-f6c-test-identities.mjs']){
  const filename=path.join(f.root,p),raw=fs.readFileSync(filename);
  fs.appendFileSync(filename,' ');assert.throws(()=>f.run(),/Stale binding/);fs.writeFileSync(filename,raw);
  fs.renameSync(filename,filename+'.missing');assert.throws(()=>f.run());fs.renameSync(filename+'.missing',filename);
 }
 assert.throws(()=>f.run({beforeFinalCheck:()=>{const p=path.join(f.root,payloadPath);fs.copyFileSync(p,p+'.replacement');fs.renameSync(p+'.replacement',p);}}),/Original identity replaced/);
});
test('existing graph libraries traverse declared test-to-payload dependencies and expose removed edges',async()=>{
 const before=decode(fs.readFileSync(manifestPath));
 assert.equal((await compareSourceManifests(before,before)).status,'unchanged');
 const next=structuredClone(before),payload=next['@graph'].find(r=>r.binding?.path===payloadPath);
 payload.revisionId+='-changed';payload.binding.sha256='0'.repeat(64);next.revisionId+='-changed';
 for(const edge of next['@graph'].filter(r=>r.to===payload['@id'])){edge.toRevision=payload.revisionId;edge.revisionId+='-changed';}
 next['@graph']=next['@graph'].filter(r=>!(r.kind==='dependsOn'&&r.to===payload['@id']));
 const impact=await compareSourceManifests(before,next);
 for(const p of [pilot,full])assert.ok(impact.affected.includes(before['@graph'].find(r=>r.binding?.path===p)['@id']));
 assert.ok(impact.selectedChecks.length);assert.ok(impact.removed.length);
});
test('selected predecessor rejects proposed dependency removal role substitution and protected expectation refresh',t=>{
 const f=fixture(t);assert.equal(f.run().length,50);
 const mapFile=path.join(f.root,manifestPath),transitionFile=path.join(f.root,f.selection.transition);
 const mapRaw=fs.readFileSync(mapFile),transitionRaw=fs.readFileSync(transitionFile);
 for(const mutate of [
  d=>d['@graph'].splice(d['@graph'].findIndex(r=>r.kind==='dependsOn'),1),
  d=>{d['@graph'][1].role='current-source';d['@graph'][1].revisionId+='-role';},
  d=>{d['@graph'][1].binding.sha256='0'.repeat(64);d['@graph'][1].revisionId+='-refresh';for(const e of d['@graph'].filter(r=>r.to===d['@graph'][1]['@id'])){e.toRevision=d['@graph'][1].revisionId;e.revisionId+='-refresh';}},
 ]){
  const candidate=decode(mapRaw);mutate(candidate);candidate.revisionId+='-candidate';
  fs.writeFileSync(mapFile,JSON.stringify(candidate));
  const transition=decode(transitionRaw);transition.profiles[0].sha256=sha256(fs.readFileSync(mapFile));
  fs.writeFileSync(transitionFile,JSON.stringify(transition));
  assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:sha256(fs.readFileSync(transitionFile))}}));
  fs.writeFileSync(mapFile,mapRaw);fs.writeFileSync(transitionFile,transitionRaw);
 }
 assert.equal(f.run().length,50);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync, spawnSync} from 'node:child_process';
import {captureBatchIdentities, loadBatchTestIdentities, BATCH_MANIFEST, BATCH_SELECTION, BATCH_PAYLOAD, BATCH_ORIGINALS} from '../scripts/equation-mapping/batch-test-records.mjs';
import {decode, validate, sha256} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {compareSourceManifests} from '../scripts/equation-mapping/current-source-impact.mjs';
const consumer='tests/potential-live-timespace-pipeline-contract.test.js';
const known=()=>({schema:'option-b-batch-test-identities/v1',algorithm:'SHA-256',role:'original-test-expectations-preserve-individual-applicability',byConsumer:{'tests/known.js':['1'.repeat(64)]}});
const raw=x=>Buffer.from(JSON.stringify(x));
test('known expectation schema accepts original values and rejects malformed or ambiguous records',()=>{
  assert.deepEqual(captureBatchIdentities(raw(known()),'tests/known.js'),['1'.repeat(64)]);
  assert.ok(Object.isFrozen(captureBatchIdentities(raw(known()),'tests/known.js')));
  for(const mutate of [d=>d.extra=true,d=>d.role='current-source',d=>d.algorithm='MD5',d=>d.byConsumer['tests/known.js']=[],d=>d.byConsumer['tests/known.js']=['A'.repeat(64)],d=>d.byConsumer['../outside']=['1'.repeat(64)]]){const d=known();mutate(d);assert.throws(()=>captureBatchIdentities(raw(d),'tests/known.js'));}
  assert.throws(()=>captureBatchIdentities(Buffer.from('{"schema":1,"schema":2}'),'tests/known.js'),/Duplicate/);
  assert.throws(()=>captureBatchIdentities(raw(known()),'tests/missing.js'));
});
function fixture(t){
 const root=fs.realpathSync(fs.mkdtempSync(path.join(tmpdir(),'batch-test-records-')));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const selection=decode(fs.readFileSync(BATCH_SELECTION)),accepted=decode(fs.readFileSync(selection.acceptedBaseline)),graph=decode(fs.readFileSync(BATCH_MANIFEST));
 const paths=new Set([BATCH_SELECTION,BATCH_MANIFEST,selection.acceptedBaseline,selection.transition,accepted.historicalProof.path,...[...validate(graph).sources.values()].map(r=>r.binding.path)]);
 for(const p of paths){fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.copyFileSync(p,path.join(root,p));}
 fs.writeFileSync(path.join(root,'package.json'),'{"type":"module"}');
 return {root,selection,graph,run:(options={})=>loadBatchTestIdentities({root,selection,consumer,...options})};
}
test('all original values and historical test sources remain exact against Git',()=>{
 const record=decode(fs.readFileSync(BATCH_PAYLOAD)),original=decode(fs.readFileSync(BATCH_ORIGINALS)),proof=decode(fs.readFileSync('reference/priorities/development-process-review/evidence/option-b-batch-test-transfer.json'));
 assert.equal(Object.keys(record.byConsumer).length,29);assert.deepEqual(Object.keys(record.byConsumer),proof.consumers);
 for(const p of proof.consumers){const git=execFileSync('git',['show',proof.originCommit+':'+p],{encoding:'utf8'});assert.equal(original.sources[p],git,p);assert.equal(sha256(git),proof.originalBindings.find(r=>r.path===p).sha256);for(const expected of record.byConsumer[p])assert.ok(git.includes(expected),'Original literal required: '+p);}
});
test('selected batch admits every consumer then rejects missing changed and replaced inputs',t=>{
 const f=fixture(t),data=decode(fs.readFileSync(BATCH_PAYLOAD));
 for(const p of Object.keys(data.byConsumer))assert.deepEqual(f.run({consumer:p}),data.byConsumer[p]);
 for(const p of [BATCH_PAYLOAD,BATCH_ORIGINALS,'scripts/equation-mapping/batch-test-records.mjs','tests/option_b_batch_records.py',consumer]){
  const filename=path.join(f.root,p),bytes=fs.readFileSync(filename);fs.writeFileSync(filename,Buffer.concat([bytes,Buffer.from(' ')]));assert.throws(()=>f.run());fs.writeFileSync(filename,bytes);
 }
 assert.throws(()=>f.run({selection:{}}));assert.throws(()=>f.run({consumer:'tests/not-selected.js'}));
 const source=path.join(f.root,consumer);assert.throws(()=>f.run({beforeFinalCheck:()=>{const bytes=fs.readFileSync(source);fs.renameSync(source,source+'.prior');fs.writeFileSync(source,bytes);}}));
});
test('historical bytes and current control bytes are independently captured before return',t=>{
 const f=fixture(t),target='tests/test_f6c_variable_cell_adapter.py';
 const pair=f.run({originalSource:target});assert.equal(pair.original,decode(fs.readFileSync(BATCH_ORIGINALS)).sources[target]);assert.equal(pair.current,fs.readFileSync(target,'utf8'));assert.notEqual(pair.current,pair.original);
 assert.throws(()=>f.run({originalSource:'scripts/not-a-test.py'}));
 const filename=path.join(f.root,BATCH_ORIGINALS);assert.throws(()=>f.run({originalSource:target,beforeFinalCheck:()=>{fs.renameSync(filename,filename+'.old');fs.copyFileSync(filename+'.old',filename);}}));
});
test('actual Python bridge passes then rejects changed current target and missing selection',t=>{
 const f=fixture(t);const python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python');
 const code="import sys;from pathlib import Path;sys.path.insert(0,str(Path(sys.argv[1])/'tests'));from option_b_batch_records import batch_identities;print(len(batch_identities(Path(sys.argv[1])/'tests/test_f6c_variable_cell_adapter.py')))";
 const run=()=>spawnSync(python,['-c',code,f.root],{encoding:'utf8',timeout:30000});let r=run();assert.equal(r.status,0,r.stderr);
 fs.appendFileSync(path.join(f.root,'tests/test_f6c_variable_cell_adapter.py'),'\n');r=run();assert.notEqual(r.status,0);assert.match(r.stderr,/admission|mismatch/i);
 fs.rmSync(path.join(f.root,BATCH_SELECTION));r=run();assert.notEqual(r.status,0);
});
test('standard graph query propagates expectation changes to every declared consumer',async()=>{
 const graph=decode(fs.readFileSync(BATCH_MANIFEST)),changed=structuredClone(graph),p=changed['@graph'].find(r=>r.binding?.path===BATCH_PAYLOAD);p.binding.sha256='1'.repeat(64);p.revisionId='candidate-change';for(const e of changed['@graph']){if(e.from===p['@id']){e.fromRevision=p.revisionId;e.revisionId='candidate-change';}if(e.to===p['@id']){e.toRevision=p.revisionId;e.revisionId='candidate-change';}}changed.revisionId='candidate-change';
 const result=await compareSourceManifests(graph,changed);assert.equal(result.status,'review-required');for(const consumer of Object.keys(decode(fs.readFileSync(BATCH_PAYLOAD)).byConsumer)){const row=graph['@graph'].find(r=>r.binding?.path===consumer);assert.ok(result.affected.includes(row['@id']),consumer);}
});

test('Python retained closure rejects identical-byte replacement between source uses',t=>{
 const f=fixture(t),python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python');
 const code="import sys;from pathlib import Path;root=Path(sys.argv[1]);sys.path.insert(0,str(root/'tests'));from option_b_batch_records import batch_test_sources;target='tests/test_f6c_variable_cell_adapter.py';first=batch_test_sources(root,'tests/test_f6c_single_leaf_diagnostic.py',target);p=root/target;raw=p.read_bytes();p.rename(str(p)+'.old');p.write_bytes(raw);batch_test_sources(root,'tests/test_f6c_single_leaf_diagnostic.py',target)";
 const result=spawnSync(python,['-c',code,f.root],{encoding:'utf8',timeout:30000});assert.notEqual(result.status,0);assert.match(result.stderr,/identity|replaced/i);
});

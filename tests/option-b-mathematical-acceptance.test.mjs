import { copyControlledFixtureTree } from './support/option-b-controlled-fixture-tree.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import { knownHashAnswers as admittedKnownHashAnswers } from '../scripts/equation-mapping/controlled-fixture-records.mjs';
const knownAnswers = admittedKnownHashAnswers("tests/option-b-mathematical-acceptance.test.mjs");
import acceptanceSelection from '../scripts/equation-mapping/fixtures/mathematical-acceptance-selection.json' with {type:'json'};
import {preflight} from '../scripts/equation-mapping/dependency-map-reader.mjs';
import {ACCEPTANCE_PATH,loadAcceptedMathematicalMaps,runTrial} from '../scripts/equation-mapping/check-moving-single-root-map.mjs';

const root=fs.realpathSync(path.resolve(import.meta.dirname,'..'));
const sha=raw=>createHash('sha256').update(raw).digest('hex');
// Published known answer and hand graph controls run before any real acceptance.
assert.equal(knownAnswers.schema,'known-hash-answers/v1');
assert.equal(sha('abc'),knownAnswers.sha256.abc);
await preflight();
const acceptanceRaw=fs.readFileSync(path.join(root,ACCEPTANCE_PATH));
const acceptance=JSON.parse(acceptanceRaw),selected=acceptanceSelection.acceptance.sha256;
assert.equal(acceptanceSelection.acceptance.path,ACCEPTANCE_PATH);
assert.equal(sha(acceptanceRaw),selected);
const manifest=JSON.parse(fs.readFileSync(path.join(root,acceptance.reviewManifest.path)));
const finitePath=acceptance.maps.find(row=>row.scope==='finite-ledger-superposition-only').path;
function temporary(t,prefix='option-b-math-') {
  const directory=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),prefix)));
  t.after(()=>fs.rmSync(directory,{recursive:true,force:true}));return directory;
}
function fixture(t) {
  const directory=temporary(t);
  // Read-only access to the existing accepted Git objects; no Git writes,
  // repository creation, branch, or linked worktree is used by these controls.
  fs.symlinkSync(path.join(root,'.git'),path.join(directory,'.git'));
  fs.symlinkSync(path.join(root,'node_modules'),path.join(directory,'node_modules'));
  for(const name of new Set([...Object.keys(manifest.files),ACCEPTANCE_PATH,acceptance.reviewManifest.path,acceptance.executionReport.path,
    'scripts/equation-mapping/current-source-manifest.mjs','scripts/equation-mapping/fixtures/known-hash-answers.json',
    'scripts/equation-mapping/fixtures/mathematical-acceptance-selection.json'])) {
    const filename=path.join(directory,name);fs.mkdirSync(path.dirname(filename),{recursive:true});fs.copyFileSync(path.join(root,name),filename);
  }
  copyControlledFixtureTree(root, directory);
  return {directory,write(name,value){const raw=Buffer.from(JSON.stringify(value)+'\n');fs.writeFileSync(path.join(directory,name),raw);return sha(raw);}};
}

test('known controls precede actual accepted exact B predecessors; historical approval stays historical',()=>{
  const state=loadAcceptedMathematicalMaps({cwd:root,acceptanceSha256:selected});
  assert.equal(state.selection.status,'operator-accepted');assert.equal(state.maps.size,2);
  for(const row of acceptance.maps) {
    assert.equal(sha(state.files.get(row.path)),row.sha256);
    assert.equal(state.maps.get(row.path).scope,row.scope);
    assert.equal(state.maps.get(row.path).approval,'not-granted');
  }
  assert.equal(manifest.approval,'not-granted');state.recheck();
  const historicalReport=JSON.parse(fs.readFileSync(path.join(root,acceptance.executionReport.path)));
  assert.equal(historicalReport.authority,'report-only; existing A checks unchanged');
  const knownLiteral=/sha256\(Buffer\.from\('abc'\)\) === '([a-f0-9]{64})'/u;
  const control="sha256(Buffer.from('abc')) === '"+knownAnswers.sha256.abc+"'";
  assert.equal(control.match(knownLiteral)?.[1],knownAnswers.sha256.abc);
  const oldReader=state.files.get('scripts/equation-mapping/dependency-map-reader.mjs').toString();
  assert.equal(oldReader.match(knownLiteral)?.[1],knownAnswers.sha256.abc,'external known answer preserves independently retained original literal');
});

test('missing external selection, wrong digest, scope, commit, map census or review artifacts fail closed',t=>{
  assert.throws(()=>loadAcceptedMathematicalMaps({cwd:root}),/Externally selected/);
  assert.throws(()=>loadAcceptedMathematicalMaps({cwd:root,acceptanceSha256:'0'.repeat(64)}),/binding mismatch/);
  for(const mutate of [a=>a.status='not-granted',a=>a.scope='production',a=>a.reviewedCommit='0'.repeat(40),
    a=>a.maps.pop(),a=>a.maps[1]=a.maps[0],a=>a.maps[0].sha256='0'.repeat(64),
    a=>a.reviewManifest.sha256='0'.repeat(64),a=>a.executionReport.path='../outside.json']) {
    const f=fixture(t),changed=structuredClone(acceptance);mutate(changed);
    const digest=f.write(ACCEPTANCE_PATH,changed);
    assert.throws(()=>loadAcceptedMathematicalMaps({cwd:f.directory,acceptanceSha256:digest}));
  }
  const f=fixture(t);fs.unlinkSync(path.join(f.directory,acceptance.reviewManifest.path));
  assert.throws(()=>loadAcceptedMathematicalMaps({cwd:f.directory,acceptanceSha256:selected}));
});

test('selected copies must agree with reviewed execution and exact commit, not current candidates',t=>{
  const f=fixture(t),changedManifest=structuredClone(manifest),changedAcceptance=structuredClone(acceptance);
  const report=JSON.parse(fs.readFileSync(path.join(root,acceptance.executionReport.path)));
  changedManifest.files['package.json']='0'.repeat(64);report.candidate.inputs=changedManifest.files;
  changedAcceptance.reviewManifest.sha256=f.write(acceptance.reviewManifest.path,changedManifest);
  report.reviewManifest.sha256=changedAcceptance.reviewManifest.sha256;
  changedAcceptance.executionReport.sha256=f.write(acceptance.executionReport.path,report);
  const digest=f.write(ACCEPTANCE_PATH,changedAcceptance);
  assert.throws(()=>loadAcceptedMathematicalMaps({cwd:f.directory,acceptanceSha256:digest}),/Reviewed commit file mismatch/);
  const g=fixture(t);fs.writeFileSync(path.join(g.directory,finitePath),'current candidate is not a baseline');
  const state=loadAcceptedMathematicalMaps({cwd:g.directory,acceptanceSha256:selected});
  assert.equal(sha(state.files.get(finitePath)),acceptance.maps.find(row=>row.path===finitePath).sha256);
});

test('duplicate acceptance keys, symlink substitution and same-byte replacement reject',t=>{
  const f=fixture(t),raw=acceptanceRaw.toString().replace('"status":','"status":"not-granted","status":');
  fs.writeFileSync(path.join(f.directory,ACCEPTANCE_PATH),raw);
  assert.throws(()=>loadAcceptedMathematicalMaps({cwd:f.directory,acceptanceSha256:sha(raw)}),/Duplicate JSON key/);
  for(const name of [ACCEPTANCE_PATH,acceptance.reviewManifest.path,acceptance.executionReport.path]) {
    const g=fixture(t),state=loadAcceptedMathematicalMaps({cwd:g.directory,acceptanceSha256:selected}),filename=path.join(g.directory,name);
    fs.copyFileSync(filename,filename+'.replacement');fs.renameSync(filename+'.replacement',filename);
    assert.throws(()=>state.recheck(),/Input changed/);
    fs.renameSync(filename,filename+'.retained');fs.symlinkSync(filename+'.retained',filename);
    assert.throws(()=>loadAcceptedMathematicalMaps({cwd:g.directory,acceptanceSha256:selected}),/Noncanonical/);
  }
});

test('actual report-only loader consumes both accepted B predecessors without approving candidates',async t=>{
  const outputDirectory=temporary(t,'option-b-math-report-');
  const result=await runTrial({cwd:root,outputDirectory,acceptanceSha256:selected});
  assert.notEqual(result.status,'error',result.error);assert.equal(result.approval,'not-granted');
  assert.equal(result.authority,'report-only B-to-B comparison; unchanged scientific checks; no production or scientific approval');
  assert.equal(result.baseline.commit,acceptance.reviewedCommit);
  assert.equal(result.baseline.acceptance.sha256,selected);
  for(const chain of Object.values(result.chains)) {
    assert.equal(chain.baseline,'operator-accepted-exact-predecessor');
    assert.equal(chain.rawMapDiffersFromAcceptedBaseline,false);assert.equal(chain.approval,'not-granted');
    assert.deepEqual(chain.changedRelations,[]);
  }
  assert.deepEqual(result.executedChecks.map(row=>[row.label,row.status]),[
    ['scientific-check','pass'],['prose-check','pass'],['existing-scientific-test','pass'],['finite-ledger-polynomial-check','pass']]);
  const missing=await runTrial({cwd:root,outputDirectory,acceptanceSha256:''});
  assert.equal(missing.status,'error');assert.equal(missing.executedChecks.length,0);
  assert.equal(fs.existsSync(path.join(outputDirectory,'review-manifest.json')),false);
  assert.equal(JSON.parse(fs.readFileSync(path.join(outputDirectory,'report.json'))).status,'error');
});

test('actual finite successor deletion preserves old B downstream obligation, never self-baselines',async t=>{
  const f=fixture(t),finite=JSON.parse(fs.readFileSync(path.join(f.directory,finitePath)));
  const removed=finite['@graph'].find(row=>row['@type']==='Relationship' && row['@id'].endsWith('dependsOn-gradient-linearity-proof-per-row-gradient-premise'));
  assert.ok(removed);finite['@graph']=finite['@graph'].filter(row=>row!==removed);f.write(finitePath,finite);
  const result=await runTrial({cwd:f.directory,outputDirectory:path.join(f.directory,'outputs'),acceptanceSha256:selected});
  assert.equal(result.status,'review-required',result.error);
  const chain=result.chains['finite-ledger-superposition'];
  assert.equal(chain.baseline,'operator-accepted-exact-predecessor');assert.equal(chain.approval,'not-granted');
  assert.deepEqual(chain.removedRelations,[removed['@id']]);assert.deepEqual(chain.selectedChecks,['finite-ledger-polynomial-check']);
  assert.equal(chain.rawMapDiffersFromAcceptedBaseline,true);
});

test('CLI requires external selection and rejects duplicate selection flags',t=>{
  const outputDirectory=temporary(t),cli=path.join(root,'scripts/equation-mapping/check-moving-single-root-map.mjs');
  const env={...process.env};delete env.OPTION_B_MATHEMATICAL_ACCEPTANCE_SHA256;
  const result=spawnSync(process.execPath,[cli,'--output-dir',outputDirectory],{cwd:root,env,encoding:'utf8',timeout:10000});
  assert.equal(result.status,1);assert.match(result.stdout,/Externally selected/);
  const duplicate=spawnSync(process.execPath,[cli,'--acceptance-sha256',selected,'--acceptance-sha256',selected],{cwd:root,env,encoding:'utf8',timeout:10000});
  assert.equal(duplicate.status,1);assert.match(duplicate.stderr,/Usage/);
});

test('executable comparison loader and reader contain no literal expected SHA tokens',()=>{
  for(const name of ['check-moving-single-root-map.mjs','dependency-map-reader.mjs']) {
    const source=fs.readFileSync(path.join(root,'scripts/equation-mapping',name),'utf8');
    assert.equal(/['"](?:[a-f0-9]{64}|[a-f0-9]{40})['"]/u.test(source),false,name);
  }
});

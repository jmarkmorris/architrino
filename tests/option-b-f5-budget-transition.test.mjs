import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,mkdtempSync,writeFileSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {decode,validate} from '../scripts/equation-mapping/current-source-manifest.mjs';

const sha=b=>createHash('sha256').update(b).digest('hex');
const recordPath='reference/priorities/development-process-review/contracts/option-b-f5-budget-transition.json';
const budgetPaths=[
 'src/apps/borg/data/certified-budget-identities.v1.json',
 'src/apps/borg/BorgCertifiedBudgetIdentityContract.js',
 'content/generated/borg/certified-budget-identities.v1.js',
 'scripts/borg/build-certified-budget-identities.mjs',
];
function delta(before,after){
 const old=new Map(before.map(row=>[row['@id'],row])),next=new Map(after.map(row=>[row['@id'],row]));
 assert.equal(old.size,before.length);assert.equal(next.size,after.length);
 return [...new Set([...old.keys(),...next.keys()])].sort().flatMap(id=>{
  const a=old.get(id)??null,b=next.get(id)??null;
  return JSON.stringify(a)===JSON.stringify(b)?[]:[{id,before:a,after:b}];
 });
}

test('FIRST hand-authored graph delta identifies change, addition, deletion and unchanged row',()=>{
 const a=[{'@id':'a',value:1},{'@id':'b',value:2},{'@id':'c',value:3}];
 const b=[{'@id':'a',value:4},{'@id':'b',value:2},{'@id':'d',value:5}];
 assert.deepEqual(delta(a,b),[
  {id:'a',before:a[0],after:b[0]},
  {id:'c',before:a[2],after:null},
  {id:'d',before:null,after:b[2]},
 ]);
});

test('reviewed family record binds exact predecessor copies, successor maps and narrow graph changes',()=>{
 const record=decode(readFileSync(recordPath));
 assert.equal(record.schema,'option-b-f5-budget-transfer/v1');
 assert.equal(record.scientificExecutionAuthorized,false);
 assert.equal(record.historicalRenewalAuthorized,false);
 assert.equal(record.operationalEligibilityGranted,false);
 assert.deepEqual(record.maps.map(m=>m.profile),['build','evolution']);
 for(const m of record.maps){
  const beforeRaw=readFileSync(m.predecessor.retainedPath),afterRaw=readFileSync(m.successor.path);
  assert.equal(sha(beforeRaw),m.predecessor.sha256);assert.equal(sha(afterRaw),m.successor.sha256);
  const before=decode(beforeRaw),after=decode(afterRaw);validate(before);validate(after);
  for(const key of Object.keys(before).filter(k=>!['@graph','revisionId'].includes(k)))assert.deepEqual(after[key],before[key]);
  assert.notEqual(before.revisionId,after.revisionId);
  const changes=delta(before['@graph'],after['@graph']);assert.deepEqual(changes,m.changes);
  const changedSources=changes.filter(c=>c.before&&c.after?.['@type']==='Source');
  assert.deepEqual(changedSources.map(c=>c.after.binding.path).sort(),m.profile==='build'?['scripts/eom/f5-current-source-admission.mjs']:[
   'scripts/eom/f5-current-source-admission.mjs','scripts/eom/run-f5-ordinary-evolution.mjs',
   'src/apps/borg/BorgCertifiedBudgets.js','tests/option-b-f5-evolution-admission.test.mjs',
  ].sort());
  for(const c of changes){
   assert.ok(c.after,'no source/edge removal');
   if(c.before)assert.notEqual(c.before.revisionId,c.after.revisionId,'changed row revision');
   if(c.before&&c.after['@type']==='Source'){
    assert.notEqual(c.before.binding.sha256,c.after.binding.sha256);
    assert.deepEqual({...c.after,revisionId:c.before.revisionId,binding:{...c.after.binding,sha256:c.before.binding.sha256}},c.before);
   }
   if(c.before&&c.after['@type']==='Relationship')assert.deepEqual({...c.after,revisionId:c.before.revisionId,fromRevision:c.before.fromRevision,toRevision:c.before.toRevision},c.before);
  }
  const additions=changes.filter(c=>!c.before&&c.after['@type']==='Source').map(c=>c.after);
  assert.deepEqual(additions.map(r=>r.binding.path).sort(),m.profile==='build'?[]:[...budgetPaths].sort());
  for(const row of additions)assert.equal(row.role,'scientific-contract');
  const addedEdges=changes.filter(c=>!c.before&&c.after['@type']==='Relationship');
  assert.equal(addedEdges.length,additions.length);
  for(const row of additions)assert.equal(addedEdges.filter(c=>c.after.to===row['@id']&&c.after.kind==='checks').length,1);
 }
 for(const b of record.protectedBindings)assert.equal(sha(readFileSync(b.path)),b.sha256,b.path);
 const evolution=record.maps[1];
 const oldBudget=decode(readFileSync(evolution.predecessor.retainedPath))['@graph'].find(r=>r.binding?.path==='src/apps/borg/BorgCertifiedBudgets.js');
 for(const [index,p] of record.historicalBudgetOwners.entries()){
  const old=decode(readFileSync(p));
  const bindings=old[['sourceBindings','bindings'][index]];
  assert.ok(bindings.some(b=>b.path.endsWith('src/apps/borg/BorgCertifiedBudgets.js')&&b.sha256===oldBudget.binding.sha256));
 }
 assert.equal(sha(readFileSync(record.circularReleaseInventory.path)),record.circularReleaseInventory.afterSha256);
 assert.deepEqual(record.circularReleaseInventory.addedScientificSources,budgetPaths);
});

test('circular release metadata inventories all four budget sources and rejects omission before publication',t=>{
 const root=realpathSync(mkdtempSync(path.join(tmpdir(),'f5-budget-release-')));t.after(()=>rmSync(root,{recursive:true,force:true}));
 const put=(p,data)=>{mkdirSync(path.dirname(path.join(root,p)),{recursive:true});writeFileSync(path.join(root,p),data);};
 const freezer='scripts/eom/freeze-planar-three-binary-circular-release-bindings.mjs';
 put(freezer,readFileSync(freezer));
 for(const p of ['scripts/eom/prepare-planar-three-binary-circular-release.mjs','scripts/eom/run-planar-three-binary-circular-release.mjs',
  'scripts/eom/check-planar-three-binary-circular-release.py','scripts/eom/prepare-ordinary-evolution-request.mjs',
  'scripts/eom/BorgNativeEomProcessClient.mjs','src/apps/borg/BorgCertifiedBudgets.js',...budgetPaths,'src/eom/synthetic.txt'])put(p,'synthetic metadata only\n');
 put('prepared/handoff.json','{}');put('binary','not an executable');
 for(const rung of ['coarse','medium','fine'])put('prepared/'+rung+'-request.json',JSON.stringify({transportRequest:{runId:'b1-3-circular-'+rung+'-v1'},wire:{utf8:'synthetic',sha256:sha('synthetic'),bytes:9}}));
 const run=out=>spawnSync(process.execPath,[path.join(root,freezer),'--prepared',path.join(root,'prepared'),'--binary',path.join(root,'binary'),'--out',path.join(root,out)],{cwd:root,encoding:'utf8',timeout:5000});
 const good=run('positive.json');assert.equal(good.status,0,good.stderr);
 const captured=JSON.parse(readFileSync(path.join(root,'positive.json')));assert.equal(captured.executionAuthorized,false);
 for(const p of budgetPaths)assert.equal(captured.bindings.filter(b=>b.path===path.join(root,p)&&b.role==='scientific-source').length,1);
 for(const p of budgetPaths){rmSync(path.join(root,p));const bad=run('missing.json');assert.equal(bad.status,1);assert.match(bad.stderr,/ENOENT/);put(p,'synthetic metadata only\n');}
});

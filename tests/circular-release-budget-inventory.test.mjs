import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdirSync,mkdtempSync,writeFileSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const budgetPaths=[
 'src/apps/borg/data/certified-budget-identities.v1.json',
 'src/apps/borg/BorgCertifiedBudgetIdentityContract.js',
 'content/generated/borg/certified-budget-identities.v1.js',
 'scripts/borg/build-certified-budget-identities.mjs',
];

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

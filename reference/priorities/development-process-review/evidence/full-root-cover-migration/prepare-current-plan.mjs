// Metadata capture only; no scientific stage is invoked.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,realpathSync,statfsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),out=path.dirname(new URL(import.meta.url).pathname);
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known SHA-256 case passed before target capture.');
const bind=p=>{const raw=readFileSync(p);return{path:p,sha256:sha(raw),bytes:raw.length};};
const python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python');
const observations=[];
for(const cached of ['-cached']) {
 const R=await import(pathToFileURL(path.join(root,`scripts/eom/run-f6c${cached}-root-cover-full.mjs`)));
 const L=await import(pathToFileURL(path.join(root,R.LAUNCHER)));
 const literal='System-wide memory free percentage: 40%\n';
 assert.equal(L.parseHostResource(literal,64n*1024n**3n,true).freePercent,40);
 assert.throws(()=>L.parseHostResource(literal,63n*1024n**3n,true));
 assert.throws(()=>L.parseHostResource('System-wide memory free percentage: 39%\n',64n*1024n**3n,true));
 console.log('Known host parser threshold cases passed before host observation: '+R.ENTRY);
 const host=execFileSync('/usr/bin/memory_pressure',[],{encoding:'utf8',timeout:2000,maxBuffer:1024**2,env:{...process.env,LC_ALL:'C'}});
 writeFileSync(path.join(out,`memory-pressure${cached}.stdout.log`),host);
 const disk=statfsSync(root,{bigint:true}),available=disk.bavail*disk.bsize;
 const observed=L.parseHostResource(host,available,true);
 const inventory=JSON.parse(execFileSync(python,['-I','-B','-c',R.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:5000,maxBuffer:1024**2}));
 assert.equal(inventory.scientificDataLoaded,false);assert.equal(inventory.scientificModulesExecuted,false);
 const old=JSON.parse(readFileSync(`reference/priorities/braid-program/evidence/2026-08-27-f6c${cached}-root-cover-full-launch.v1.json`));
 const plan={...old,schema:`braid-program/f6c${cached}-root-cover-full-launch.v2`,python,pythonRealPath:realpathSync(python),node:realpathSync(process.execPath),git:realpathSync('/usr/bin/git')};
 plan.resourcePlan=bind(R.RESOURCE_PLAN);
 plan.comparisonContract={...old.comparisonContract,declarationSha256:R.PINS[`reference/priorities/braid-program/evidence/2026-08-27-f6c${cached?'-cached-root-cover':'-continuous-reception-root-cover'}-predeclaration.md`],verifierSha256:R.PINS[R.COMPARISON],subjectSourceBindings:old.comparisonContract.subjectSourceBindings.map(b=>bind(b.path)),runtimeBindings:[...new Set([...inventory.files,plan.git,path.resolve(python,'../../pyvenv.cfg')])].sort().map(bind)};
 plan.controlBindings=old.controlBindings.map(b=>bind(b.path));
 plan.operationalBindings=[R.ENTRY,R.LAUNCHER,R.OUTER,'/bin/ps','/usr/bin/memory_pressure',plan.node].map(bind);
 R.validatePlan(plan,root,bind(R.LAUNCHER).sha256,bind(R.ENTRY).sha256);
 const bindings=R.checkBindings(R.planBindings(plan,root));
 for(const mutate of [p=>p.schema=old.schema,p=>p.operationalBindings.find(b=>b.path===R.OUTER).sha256='35f00bb0b97a045447f3053ed2705bddceaa62d1ebdd522e9f6eb44943215826',p=>p.operationalBindings.find(b=>b.path==='/usr/bin/memory_pressure').sha256='a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56',p=>p.scope='pilot-cell-0']){const bad=structuredClone(plan);mutate(bad);assert.throws(()=>R.validatePlan(bad,root,bind(R.LAUNCHER).sha256,bind(R.ENTRY).sha256));}
 const destination=path.join(out,`f6c${cached}-root-cover-full-launch.v2.json`);
 writeFileSync(destination,JSON.stringify(plan,null,2)+'\n');
 observations.push({entry:R.ENTRY,plan:bind(destination),bindings,hostObserver:bind('/usr/bin/memory_pressure'),observed,scientificCalls:0,mixedGenerationRejections:4});
}
writeFileSync(path.join(out,'current-plan-validation.json'),JSON.stringify(observations,null,2)+'\n');
console.log(JSON.stringify(observations.map(r=>({entry:r.entry,bindings:r.bindings.length,host:r.observed,scientificCalls:0}))));

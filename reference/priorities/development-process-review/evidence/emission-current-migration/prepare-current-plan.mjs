// Capture current execution identities without launching a numerical stage.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,realpathSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import * as E from '../../../../../scripts/eom/run-f6c-emission-refinement-pilot.mjs';
const root=process.cwd(),out=path.dirname(new URL(import.meta.url).pathname);
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known SHA-256 abc passed before target capture.');
const bind=p=>{const b=readFileSync(p);return{path:p,sha256:sha(b),bytes:b.length};};
const python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python'),git=realpathSync('/usr/bin/git');
const inventory=JSON.parse(execFileSync(python,['-I','-B','-c',E.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:5000}));
const original=JSON.parse(readFileSync('reference/priorities/braid-program/evidence/2026-08-27-f6c-emission-refinement-launch.v1.json'));
const declarationInput={originalPath:E.DECLARATION,...bind('reference/priorities/development-process-review/evidence/variable-cell-migration/'+path.basename(E.DECLARATION)+'.source')};
assert.equal(declarationInput.sha256,E.PINS[E.DECLARATION]);
const historicalInputs=E.HISTORICAL.map(([role,originalPath,sha256,bytes])=>({role,originalPath,sha256,bytes,path:'reference/priorities/development-process-review/evidence/source-recovery/'+path.basename(originalPath)+'.source'}));
const source=p=>p===E.DECLARATION?{path:p,sha256:declarationInput.sha256,bytes:declarationInput.bytes}:bind(p);
const plan={...original,historicalInputs,priorCoverClosure:{...original.priorCoverClosure,ownerSha256:E.FIXED[9][2]},schema:'braid-program/f6c-emission-refinement-launch.v2',executionBridge:bind(E.BRIDGE),declarationInput,
 ...Object.fromEntries(Object.entries(E.NAMED).map(([k,p])=>[k,source(p)])),subjectSourceBindings:E.SUBJECT_PATHS.map(source),
 runtimeBindings:[...new Set([...inventory.files,git,path.resolve(python,'../../pyvenv.cfg')])].sort().map(bind),
 operationalBindings:[E.BRIDGE,E.SUPPORT,E.BRIDGE_TESTS,E.ENTRY,E.LAUNCHER,E.TESTS,E.PROCESS_TESTS,E.HELPERS,E.OUTER,'/bin/ps','/usr/bin/memory_pressure',realpathSync(process.execPath)].map(bind)};
E.validatePlan(plan,root,bind(E.LAUNCHER).sha256,bind(E.ENTRY).sha256,python,git);
const bindings=E.checkBindings(E.planBindings(plan,root));
const destination=path.join(out,'emission-launch.v2.json');writeFileSync(destination,JSON.stringify(plan,null,2)+'\n');
const results=[];
for(const stage of ['producer','comparison']){
 const stdout=execFileSync(python,['-I','-B','-c',E.PYTHON_BOOTSTRAP,path.join(root,E.BRIDGE),E.PINS[E.BRIDGE],'--check-plan','--stage',stage,'--bridge-sha256',E.PINS[E.BRIDGE],'--plan',destination,'--plan-sha256',bind(destination).sha256,'--out',path.join(out,'unused'),'--budget-seconds','30'],{encoding:'utf8',timeout:35000});
 results.push(JSON.parse(stdout));
}
writeFileSync(path.join(out,'current-plan-validation.json'),JSON.stringify({bindings,results,scientificCalls:0},null,2)+'\n');
console.log(JSON.stringify({bindings:bindings.length,results,scientificCalls:0}));

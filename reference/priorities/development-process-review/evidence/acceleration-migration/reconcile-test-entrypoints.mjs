// Discovery only. No recorded entrypoint is executed by this instrument.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {selectTestFiles} from '../../../../../scripts/run-test-sweep.mjs';
import {runChecks} from '../../../../../scripts/check-content-integrity.mjs';
const digest=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
function registrations(source){
 const withoutComments=source.replace(/#[^\n]*/g,'');
 return [...withoutComments.matchAll(/add_test\s*\(\s*NAME\s+(\S+)\s+COMMAND\s+([^)]*)\)/g)].map(m=>({name:m[1],command:m[2].trim().split(/\s+/)}));
}
function captureGate(checks){
 const invocations=[];
 const result=runChecks({...(checks?{checks}:{}),execute:(command,args)=>{invocations.push({command,args});return {status:0};},log:()=>{},error:()=>{}});
 // These synthetic statuses describe traversal only and are never retained as test results.
 return {invocations,omitted:result.skipped.map(({label,reason})=>({label,reason})),reportingOnly:result.passed.filter(r=>r.reporting).map(r=>r.label)};
}
assert.deepEqual(registrations('# add_test(NAME fake COMMAND ignored)\nadd_test(\n NAME case_one COMMAND cli all\n)'),[{name:'case_one',command:['cli','all']}]);
const known=captureGate([{name:'one',args:['known-only']},{name:'omit',args:['never'],skipWhen:()=>true,skipReason:'known exclusion'}]);
assert.deepEqual(known.invocations.map(r=>r.args),[['known-only']]);assert.equal(known.omitted.length,1);
console.log('Known CMake registration and nonexecuting gate-capture controls passed before repository selection.');
const inventoryPath=new URL('../test-coverage-inventory.json',import.meta.url);
const inventory=JSON.parse(readFileSync(inventoryPath));
const normal=selectTestFiles(),slow=selectTestFiles({slow:true});
assert.equal(new Set([...normal,...slow]).size,normal.length+slow.length);
const selected=new Set([...normal,...slow]);
const outside=inventory.candidates.filter(r=>r.kind==='javascript-test'&&!selected.has(r.path)).map(r=>r.path);
const undiscovered=[...selected].filter(p=>!inventory.candidates.some(r=>r.path===p));
const gate=captureGate();
const cmake=registrations(readFileSync('src/eom/CMakeLists.txt','utf8'));
assert.equal(cmake.length,7,'CMake owner changed; manually reconcile registrations');
const packageScripts=JSON.parse(readFileSync('package.json')).scripts;
const sources=['scripts/run-test-sweep.mjs','scripts/config/test-sweep-slow-list.json','scripts/check-content-integrity.mjs','package.json','src/eom/CMakeLists.txt','.github/workflows/content-integrity.yml','.github/workflows/pages.yml'];
const report={measuredAt:new Date().toISOString(),boundary:'Entrypoint discovery only, no test pass statuses. Dynamic test skips, scientific prerequisites and standalone CLI dispositions remain open.',sourceBindings:sources.map(path=>({path,sha256:digest(path)})),node:{normal,slow,outside,undiscovered},contentIntegrity:{...gate,execution:'injected recording callback only; no child process spawned'},packageScripts,ctest:cmake,github:[{workflow:'.github/workflows/content-integrity.yml',job:'validate-content',environment:'Ubuntu; Node 22',commands:['npm audit --package-lock-only --audit-level=moderate --omit=dev','node scripts/check-content-integrity.mjs'],status:'not-run-for-current-changes'},{workflow:'.github/workflows/pages.yml',job:'build',environment:'Ubuntu; Node 22',commands:['node scripts/check-content-integrity.mjs','node --test tests/pages-image-assets.test.js','node --test tests/runtime-asset-fresh-checkout.test.js','node scripts/build-static-site.mjs --out .tmp/site','node scripts/borg/verify-assembly-record-byte-identity.mjs --check'],additionalActions:['upload Pages artifact'],status:'not-run-for-current-changes'},{workflow:'.github/workflows/pages.yml',job:'deploy',requires:'Successful main build on push or workflow_dispatch; ARCHITRINO_PAGES_DEPLOY_ENABLED true; Pages publishing mode workflow',status:'not-applicable-before-authorized-main-publication'}]};
writeFileSync(new URL('../test-entrypoint-reconciliation.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({normal:normal.length,slow:slow.length,outside,undiscovered,gateInvocations:gate.invocations.length,omitted:gate.omitted,ctest:cmake.length}));

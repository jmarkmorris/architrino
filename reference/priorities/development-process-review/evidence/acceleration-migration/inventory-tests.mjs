// Candidate inventory only: classification controls precede repository discovery.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const classify=p=>{
 if(p.endsWith('.source')||p.includes('/evidence/'))return null;
 if(/\.test\.(js|mjs|cjs|ts|tsx)$/.test(p))return 'javascript-test';
 if(/(^|\/)(test_[^/]+|[^/]+_test)\.py$/.test(p))return 'python-test';
 if(/(^|\/)CMakeLists\.txt$/.test(p))return 'cmake-registration';
 if(/^scripts\/(.*\/)?(check-|validate-)[^/]+\.(mjs|js|py|sh)$/.test(p))return 'standalone-check-candidate';
 if(/^\.github\/workflows\/[^/]+\.ya?ml$/.test(p))return 'github-workflow';
 return null;
};
for(const [p,expected] of [['tests/a.test.js','javascript-test'],['tests/x/test_a.py','python-test'],['src/eom/CMakeLists.txt','cmake-registration'],['scripts/check-a.mjs','standalone-check-candidate'],['.github/workflows/pages.yml','github-workflow'],['reference/evidence/test_a.py',null],['tests/a.test.js.source',null],['src/example.py',null]])assert.equal(classify(p),expected);
console.log('Known positive and excluded path classifications passed before repository inventory.');
const paths=[...new Set(execFileSync('git',['ls-files','-c','-o','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean))].sort();
const candidates=paths.map(path=>({path,kind:classify(path)})).filter(r=>r.kind);
const slow=JSON.parse(readFileSync('scripts/config/test-sweep-slow-list.json')).entries.map(r=>r.path);
for(const r of candidates){r.status='not-yet-reconciled';if(r.kind==='javascript-test')r.nodeSweepSelection=r.path.startsWith('tests/')&&/\.test\.(js|mjs)$/.test(r.path)?slow.includes(r.path)?'slow':'normal':'outside-current-sweep';}
const report={measuredAt:new Date().toISOString(),instrument:'git ls-files -c -o --exclude-standard -z plus known-case-tested path classification',boundary:'Candidate filenames only. CMake registrations, package scripts, nested entrypoints, test-level skips and workflow jobs require semantic reconciliation before this is complete coverage.',candidates};
writeFileSync(new URL('../test-coverage-inventory.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({candidates:candidates.length,counts:Object.fromEntries([...new Set(candidates.map(r=>r.kind))].map(k=>[k,candidates.filter(r=>r.kind===k).length]))}));

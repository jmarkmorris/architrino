import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {CONTEXT,NS,sha256,validate} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {PRODUCTION_PROFILE,PRODUCTION_MANIFEST,PRODUCTION_SELECTION,PRODUCTION_IDENTITIES,PRODUCTION_ORIGINALS} from '../scripts/equation-mapping/production-source-records.mjs';
const ROOT=fs.realpathSync(new URL('../',import.meta.url));
const PYTHON=path.resolve(process.env.AAA_VENV??path.join(ROOT,'../.venv'),'bin/python');
const READER='scripts/equation-mapping/production-source-records.mjs';
const BRIDGE='scripts/eom/production_source_records.py';
const consumer='fixture/host.py';
function fixture(t){
 const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'production-python-bootstrap-')));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const put=(p,value)=>{const filename=path.join(root,p);fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value));};
 const identities={schema:'option-b-production-identities/v1',algorithm:'SHA-256',role:'original-identities-preserve-individual-applicability',byConsumer:{[consumer]:['a'.repeat(64)]}};
 put(consumer,'current host');put('fixture/original.source','original host');put(PRODUCTION_IDENTITIES,identities);
 put(PRODUCTION_ORIGINALS,{schema:'option-b-production-original-sources/v1',role:'historical-source-generations-not-current-acceptance',sources:{[consumer]:{path:'fixture/original.source',sha256:sha256('original host')}}});
 const roles=new Map([[READER,'admission'],['scripts/equation-mapping/current-source-manifest.mjs','manifest-reader'],['scripts/equation-mapping/current-source-transition.mjs','manifest-reader'],[BRIDGE,'scientific-control'],[consumer,'current-source'],['fixture/original.source','scientific-control'],[PRODUCTION_IDENTITIES,'scientific-control'],[PRODUCTION_ORIGINALS,'scientific-control']]);
 for(const p of [READER,BRIDGE,...[...roles.keys()].filter(p=>p.includes('current-source-'))])put(p,fs.readFileSync(path.join(ROOT,p)));
 const rows=[...roles].map(([p,role],i)=>({'@id':NS+'bootstrap/'+i,'@type':'Source',revisionId:'known-bootstrap',role,binding:{path:p,selector:{kind:'whole'},contract:'fixed-byte-selection/v1',sha256:sha256(fs.readFileSync(path.join(root,p)))}}));
 const edges=[];const edge=(from,to,kind)=>edges.push({'@id':NS+'bootstrap/edge/'+edges.length,'@type':'Relationship',revisionId:'known-bootstrap',kind,from:from['@id'],fromRevision:from.revisionId,to:to['@id'],toRevision:to.revisionId,role:'known-bootstrap-input'});
 for(const row of rows.slice(1))edge(rows[0],row,'checks');
 const host=rows.find(r=>r.binding.path===consumer);for(const row of rows.filter(r=>r!==host))edge(host,row,'dependsOn');
 const graph={'@context':CONTEXT,schemaVersion:'current-source-manifest/v1',scope:PRODUCTION_PROFILE,repository:'https://github.com/jmarkmorris/architrino.git',baseline:{commit:'1'.repeat(40),entry:READER,authority:'operator-directed-existing-A-transfer'},revisionId:'known-bootstrap','@graph':[...rows,...edges]};
 validate(graph);put(PRODUCTION_MANIFEST,graph);put('fixture/proof.json',{known:true});
 const accepted='fixture/accepted.json',transition='fixture/transition.json';
 put(accepted,{schema:'accepted-current-source-baseline/v1',historicalProof:{path:'fixture/proof.json',sha256:sha256(fs.readFileSync(path.join(root,'fixture/proof.json')))},profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,manifestRaw:fs.readFileSync(path.join(root,PRODUCTION_MANIFEST),'utf8'),historicalEvidenceBindings:[],operationalRefreshEligibility:[]}]});
 put(transition,{schema:'reviewed-current-source-transition/v1',predecessorSha256:sha256(fs.readFileSync(path.join(root,accepted))),reviewReference:'known bootstrap fixture',profiles:[{name:PRODUCTION_PROFILE,manifestPath:PRODUCTION_MANIFEST,sha256:sha256(fs.readFileSync(path.join(root,PRODUCTION_MANIFEST))),changes:[]}]});
 put(PRODUCTION_SELECTION,{acceptedBaseline:accepted,acceptedBaselineSha256:sha256(fs.readFileSync(path.join(root,accepted))),transition,transitionSha256:sha256(fs.readFileSync(path.join(root,transition)))});
 return{root,put,run(body,env={}){const code=`import sys\nfrom pathlib import Path\nroot=Path(${JSON.stringify(root)})\nsys.path.insert(0,str(root/'scripts/eom'))\nimport production_source_records as m\nconsumer=root/${JSON.stringify(consumer)}\n`+body;return spawnSync(PYTHON,['-B','-c',code],{cwd:root,env:{...process.env,...env},encoding:'utf8',timeout:15000});}};
}
const passes=(result)=>assert.equal(result.status,0,result.stderr||result.stdout);
const load=s=>import('data:text/javascript;base64,'+Buffer.from(s).toString('base64'));
const sha=sha256;
const readSource=p=>fs.readFileSync(process.env.OPTION_B_CIRCULAR_CANDIDATE_ROOT?path.join(process.env.OPTION_B_CIRCULAR_CANDIDATE_ROOT,p.replaceAll('/','__')+'.candidate'):path.join(ROOT,p),'utf8');

test('circular CLI authenticates captured engine and rejects cache, byte and inode replacement',async()=>{
const cleanup=[],f=fixture({after:fn=>cleanup.push(fn)});
try{
 const bootstrap=(await load(readSource('scripts/eom/reduce-subfield-circular-root-ledger.mjs').slice(readSource('scripts/eom/reduce-subfield-circular-root-ledger.mjs').indexOf('async function captureProductionAdmission('))+'\nexport{captureProductionAdmission};')).captureProductionAdmission;
 const admitted=await bootstrap(f.root,'fixture/host.py');assert.deepEqual(admitted.identities(),['a'.repeat(64)]);admitted.check();
 const reader=path.join(f.root,'scripts/equation-mapping/production-source-records.mjs'),raw=fs.readFileSync(reader);
 fs.writeFileSync(reader,"export const beginProductionAdmission=()=>({identities:()=>['FABRICATED_CACHE'],check(){}});");await import((await import('node:url')).pathToFileURL(reader).href);fs.writeFileSync(reader,raw);const recaptured=await bootstrap(f.root,'fixture/host.py');assert.deepEqual(recaptured.identities(),['a'.repeat(64)]);
 fs.writeFileSync(reader+'.new',raw);fs.renameSync(reader+'.new',reader);assert.throws(()=>recaptured.check(),/replaced/);
 fs.writeFileSync(reader,raw+'\nthrow Error("UNTRUSTED_READER_EXECUTED");');await assert.rejects(bootstrap(f.root,'fixture/host.py'),/Authenticated bootstrap bytes differ/);
 console.log('Known engine fixture + bootstrap mutation/replacement controls passed');
}finally{for(const fn of cleanup)fn();}
});
test('circular reducer requires admitted identities and retains original archive inode',async()=>{

const source=readSource('src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs');const reducer=await load(source+'\nexport {fileContext};');assert.deepEqual(reducer.subfieldCircularExactDecimal('1.25'),{n:125n,d:100n});
const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'circular-archive-control-')));try{fs.mkdirSync(path.join(root,'src'));fs.writeFileSync(path.join(root,'src/code.mjs'),'current source');fs.writeFileSync(path.join(root,'archived.source'),'original source');const expected=sha('original source');assert.throws(()=>reducer.fileContext(root),/admitted reducer identities/);reducer.initializeProductionIdentities(Array(13).fill('a'.repeat(64)),[{logicalPath:'src/code.mjs',path:path.join(root,'archived.source'),sha256:expected,bytes:15}]);const files=reducer.fileContext(root);assert.equal(files.bound({path:'src/code.mjs',sha256:expected}).toString(),'original source');files.recheck();assert.equal(files.substitutions[0].logicalPath,'src/code.mjs');fs.writeFileSync(path.join(root,'replacement'),'original source');fs.renameSync(path.join(root,'replacement'),path.join(root,'archived.source'));assert.throws(()=>files.recheck(),/inode changed/);console.log('Known exact decimal + deferred identity/archive/original inode controls passed');}finally{fs.rmSync(root,{recursive:true,force:true});}

});

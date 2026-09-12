import test from 'node:test';
import {spawnSync} from 'node:child_process';
import {Worker} from 'node:worker_threads';
import {writeNew,admitBuild} from '../scripts/eom/launch-f5-prehistory-handoff-build.mjs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdirSync,mkdtempSync,readFileSync,realpathSync,renameSync,rmSync,writeFileSync,existsSync,chmodSync,statSync} from 'node:fs';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {admitF5Sources,capture,SOURCE_MAP,ROLES,selectedArgs} from '../scripts/eom/f5-current-source-admission.mjs';
import {bootstrapF5 as builderBootstrap,snapshot as enclosedSnapshot} from '../scripts/eom/prepare-f5-enclosed-root-build.mjs';
import {snapshot as handoffSnapshot} from '../scripts/eom/prepare-f5-prehistory-handoff-build.mjs';
import {initializeF5Sources} from '../scripts/eom/launch-f5-prehistory-handoff-build.mjs';
const root=realpathSync(process.cwd()),sha=b=>createHash('sha256').update(b).digest('hex');
const put=(p,b)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,b);};
function fixture(){
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'option-b-f5-')));
 for(const p of [SOURCE_MAP,...Object.keys(ROLES)])put(path.join(dir,p),readFileSync(path.join(root,p)));
 const doc=JSON.parse(readFileSync(path.join(dir,SOURCE_MAP)));
 const save=()=>{const b=Buffer.from(JSON.stringify(doc,null,2)+'\n');put(path.join(dir,SOURCE_MAP),b);return sha(b);};
 return {dir,doc,save,close:()=>rmSync(dir,{recursive:true,force:true})};
}
test('known abc source capture before admission targets',()=>{
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f5-known-')));
 try{const p=path.join(dir,'known');put(p,'abc');assert.equal(capture(p,'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad').bytes,3);}
 finally{rmSync(dir,{recursive:true,force:true});}
});
test('selected current F5 map preserves supported build snapshots and captured worker admission',async()=>{
 const digest=sha(readFileSync(path.join(root,SOURCE_MAP))),a=await admitF5Sources(root,digest);
 a.recheck();
 const prepared=await a.importModule("scripts/eom/prepare-f5-enclosed-root.mjs");
 assert.equal(typeof prepared.runWatched,"function");
 const buildHelpers=await a.importModule("scripts/eom/prepare-subfield-circular-root.mjs");
 assert.equal(typeof buildHelpers.compileInput,"function");
 for(const [entry,snapshot]of [['prepare-f5-enclosed-root-build.mjs',enclosedSnapshot],['prepare-f5-prehistory-handoff-build.mjs',handoffSnapshot]]){
  const p='scripts/eom/'+entry,rows=snapshot(a.pins[p],a);assert(rows.some(r=>r.path===p));assert(rows.some(r=>r.path==='src/eom/src/History.cpp'));
 }
 const worker=await initializeF5Sources(root,digest,a.identities);worker.recheck();
 assert.equal(worker.sourceMap.sha256,digest);assert.deepEqual(Object.keys(worker.pins).sort(),Object.keys(ROLES).sort());
});
test('missing and wrong external selections reject before an executable capability is requested',async()=>{
 const f=fixture();try{await assert.rejects(admitF5Sources(f.dir),/externally selected/);await assert.rejects(admitF5Sources(f.dir,'0'.repeat(64)),/digest/);}
 finally{f.close();}
 assert.throws(()=>selectedArgs(['--out','x']),/externally selected/);
 assert.throws(()=>selectedArgs(['--source-map-sha256','a'.repeat(64),'--source-map-sha256','b'.repeat(64)]),/one explicit/);
});
test('source substitution, role substitution and missing graph coverage reject',async()=>{
 for(const mode of ['source','role','edge']){
  const f=fixture();try{
   let digest=sha(readFileSync(path.join(f.dir,SOURCE_MAP)));
   const entry='scripts/eom/prepare-f5-enclosed-root-build.mjs';
   if(mode==='source')put(path.join(f.dir,entry),'changed');
   if(mode==='role'){f.doc['@graph'].find(r=>r.binding?.path===entry).role='independent-reference';digest=f.save();}
   if(mode==='edge'){f.doc['@graph'].splice(f.doc['@graph'].findIndex(r=>r.kind==='checks'),1);digest=f.save();}
   await assert.rejects(admitF5Sources(f.dir,digest));
  }finally{f.close();}
 }
});
test('byte-identical map and helper replacements cannot renew original worker identities',async()=>{
 for(const p of [SOURCE_MAP,'scripts/eom/prepare-f5-enclosed-root.mjs']){
  const f=fixture();try{
   const digest=sha(readFileSync(path.join(f.dir,SOURCE_MAP))),a=await admitF5Sources(f.dir,digest),target=path.join(f.dir,p),bytes=readFileSync(target);
   put(target+'.replacement',bytes);renameSync(target+'.replacement',target);
   assert.equal(sha(readFileSync(target)),sha(bytes));assert.throws(()=>a.recheck(),/original/);
   await assert.rejects(admitF5Sources(f.dir,digest,a.identities),/original/);
   await assert.rejects(builderBootstrap(f.dir,digest,a.identities),/original/);
  }finally{f.close();}
 }
});

test('supported direct CLIs reject substituted admission code before its top level executes',()=>{
 const f=fixture();try{
  const digest=sha(readFileSync(path.join(f.dir,SOURCE_MAP))),marker=path.join(f.dir,'unselected-admission-executed');
  const p=path.join(f.dir,'scripts/eom/f5-current-source-admission.mjs');
  put(p,"import fs from 'node:fs';fs.writeFileSync("+JSON.stringify(marker)+",'forbidden');throw Error('unselected code ran');");
  const selected=['--source-map-sha256',digest],base='.local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/';
  const rootArgs=['--preparation',base+'absent','--api-proof',base+'absent-proof','--out',base+'not-created',...selected];
  const cases=[
   ['prepare-f5-enclosed-root-build.mjs',['--out','.local-data/braid-analysis/f5-enclosed-root-current-build/none','--python',process.execPath,'--builder-sha256',sha(readFileSync(path.join(f.dir,'scripts/eom/prepare-f5-enclosed-root-build.mjs'))),...selected]],
   ['prepare-f5-prehistory-handoff-build.mjs',['--out','.local-data/braid-analysis/f5-prehistory-handoff-build-20260827/none','--python',process.execPath,'--builder-sha256',sha(readFileSync(path.join(f.dir,'scripts/eom/prepare-f5-prehistory-handoff-build.mjs'))),...selected]],
   ['launch-f5-prehistory-handoff-build.mjs',['--out','.local-data/braid-analysis/f5-prehistory-handoff-build-20260827/none','--python',process.execPath,'--launcher-sha256',sha(readFileSync(path.join(f.dir,'scripts/eom/launch-f5-prehistory-handoff-build.mjs'))),...selected]],
   ['run-f5-enclosed-root.mjs',rootArgs],
   ['run-current-f5-enclosed-root.mjs',['--admission','absent','--admission-sha256','a'.repeat(64),...rootArgs]],
   ['run-f5-current-handoff.mjs',['--plan','absent','--plan-sha256','a'.repeat(64),'--bridge-sha256','b'.repeat(64),'--out','absent','--owner-task','metadata-control','--node-sha256',sha(readFileSync(process.execPath)),'--node-bytes',String(statSync(process.execPath).size),...selected]],
   ['prepare-f5-original-input-tree.mjs',['--out-root',path.join(f.dir,'.local-data/f5-original-input-trees/none'),...selected]],
  ];
  for(const [entry,args]of cases){
   const result=spawnSync(process.execPath,[path.join(f.dir,'scripts/eom',entry),...args],{cwd:f.dir,encoding:'utf8',timeout:5000});
   assert.equal(result.status,1,entry+': '+result.stderr);assert.match(result.stderr,/F5 bootstrap source digest\/original identity changed/,entry);
   assert.equal(existsSync(marker),false,entry);assert.equal(result.stdout,'',entry);
  }
 }finally{f.close();}
});
test('current Python handoff retains real runtime inventory with external admission and no scientific data',()=>{
 const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
 const entry=path.join(root,'scripts/eom/execute-f5-prehistory-handoff.py'),digest=sha(readFileSync(path.join(root,SOURCE_MAP)));
 const args=['-I','-B',entry,'--runtime-inventory','--node',realpathSync(process.execPath),'--node-sha256',sha(readFileSync(process.execPath)),'--node-bytes',String(statSync(process.execPath).size),'--source-map-sha256',digest];
 const result=spawnSync(python,args,{cwd:root,encoding:'utf8',timeout:15000});
 assert.equal(result.status,0,result.stderr.slice(-2000));
 const report=JSON.parse(result.stdout);assert.equal(report.schema,'braid-program/f5-current-python-runtime.v1');assert.equal(report.scientificDataLoaded,false);
 assert(report.files.includes(realpathSync(process.execPath)));
 assert(report.files.includes(realpathSync(python)));assert(report.files.length>0);
 const rejected=spawnSync(python,[...args.slice(0,-1),'0'.repeat(64)],{cwd:root,encoding:'utf8',timeout:5000});
 assert.equal(rejected.status,1);assert.equal(rejected.stdout,'');assert.match(rejected.stderr,/capture hash differs/);
});

test('captured file worker admits known build metadata, then rejects omitted map and substituted gates',async()=>{
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f5-selected-worker-')));
 try{
  const digest=sha(readFileSync(path.join(root,SOURCE_MAP))),a=await admitF5Sources(root,digest);
  const log=writeNew(path.join(dir,'stage.log'),{synthetic:true});
  const receipt={sourceMap:a.sourceMap,schema:'braid-program/f5-prehistory-handoff-build.v1',status:'build-recorded-pending-independent-review',
   accepted:false,rootCalls:0,dataLoaded:false,eomExecuted:false,evolutionAuthorized:false,h3EvidenceEligible:false,
   sourcesBefore:[],sourcesAfter:[],headerDependenciesAfter:[],built:{},producerSources:{},dependencyUnits:[],
   stages:[{code:0,signal:null,timedOut:false,interrupted:false,processGroupClosed:true,descendantsAfterClose:false,command:'synthetic',args:['--help'],log}]};
  const build=writeNew(path.join(dir,'preparation.json'),receipt),stdout=writeNew(path.join(dir,'stdout'),{completed:true,accepted:false,status:receipt.status,elapsedSeconds:1,receipt:build});
  const gate={requestedCommand:'synthetic',requestedArgs:['--help'],acknowledged:true,measurement:{code:0,signal:null}};
  const plain={stdout,buildOutput:dir,gates:[gate]};
  assert.equal(admitBuild(plain).gates,1,'known metadata case before captured worker use');
  const bytes=a.bytes('scripts/eom/launch-f5-prehistory-handoff-build.mjs');
  const run=job=>new Promise((resolve,reject)=>{
   const worker=new Worker("const {parentPort,workerData}=require('node:worker_threads');import('data:text/javascript;base64,'+Buffer.from(workerData.bytes).toString('base64')).then(m=>m.selectedBuildOperation(workerData.job)).then(value=>parentPort.postMessage({value})).catch(e=>parentPort.postMessage({failure:e.message}));",{eval:true,execArgv:[],workerData:{bytes,job}});
   let message;const timeout=setTimeout(()=>{worker.terminate();reject(Error('worker deadline'));},5000);
   worker.once('message',m=>{message=m;});worker.once('error',reject);
   worker.once('exit',code=>{clearTimeout(timeout);code===0&&message?resolve(message):reject(Error('worker closure '+code));});
  });
  const job={...plain,root,sourceMapSha256:digest,identities:a.identities};
  assert.equal((await run(job)).value.gates,1);
  assert.match((await run({...job,sourceMapSha256:undefined})).failure,/externally selected/);
  assert.match((await run({...job,gates:[{...gate,requestedArgs:['--inspect']}]})).failure,/stage\/gate closure/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

test('Python admission rejects wrong Node capability, omitted census and same-byte Node replacement',()=>{
 const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python'),entry=path.join(root,'scripts/eom/execute-f5-prehistory-handoff.py');
 const digest=sha(readFileSync(path.join(root,SOURCE_MAP))),dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f5-node-capability-')));
 try{
  const invoke=(node,hash,size)=>spawnSync(python,['-I','-B',entry,'--runtime-inventory','--node',node,'--node-sha256',hash,'--node-bytes',String(size),'--source-map-sha256',digest],{cwd:root,encoding:'utf8',timeout:15000});
  const node=realpathSync(process.execPath),wrong=invoke(node,'0'.repeat(64),statSync(node).size);
  assert.equal(wrong.status,1);assert.equal(wrong.stdout,'');assert.match(wrong.stderr,/capture hash differs/);
  const omitted=path.join(dir,'empty-node');put(omitted,"#!/bin/sh\nprintf '%s' '{\"sources\":[],\"identities\":{}}'\n");chmodSync(omitted,0o700);
  const empty=invoke(omitted,sha(readFileSync(omitted)),statSync(omitted).size);
  assert.equal(empty.status,1);assert.equal(empty.stdout,'');assert.match(empty.stderr,/omits independent operational census/);
  const replaced=path.join(dir,'replaced-node');
  put(replaced,'#!/bin/sh\n/bin/cp "$0" "$0.next"\n/bin/mv "$0.next" "$0"\nexec '+JSON.stringify(node)+' "$@"\n');chmodSync(replaced,0o700);
  const before=sha(readFileSync(replaced)),replacement=invoke(replaced,before,statSync(replaced).size);
  assert.equal(sha(readFileSync(replaced)),before);assert.equal(replacement.status,1);assert.equal(replacement.stdout,'');assert.match(replacement.stderr,/changed or replaced/);
 }finally{rmSync(dir,{recursive:true,force:true});}
});

// Author transport controls only. Independent expectations/instruments remain
// separately frozen; no numerical provider or actual retained history executes.
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync,realpathSync,readFileSync,renameSync,writeFileSync,existsSync,fstatSync} from 'node:fs';
import {tmpdir} from 'node:os';
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import path from 'node:path';
import * as P from '../scripts/eom/prepare-f6c-parent-refinement-batch.mjs';
import * as C from '../scripts/eom/f6c-bounded-operation.mjs';
import * as B from '../scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs';
const root=realpathSync(process.cwd()),sha=raw=>createHash('sha256').update(raw).digest('hex');
const bind=(p,h='a'.repeat(64),bytes=1)=>({path:p,sha256:h,bytes});
const abs=b=>({...b,path:path.resolve(root,b.path)});
function fixture(){
 const pythonCommand=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python'),git=realpathSync('/usr/bin/git');
 const runtimeBindings=[bind(realpathSync(pythonCommand)),bind(path.resolve(path.dirname(pythonCommand),'../pyvenv.cfg')),bind(git)];
 const operationalBindings=[B.SELF,B.CONTROL,...Object.values(B.PINS).map(([p])=>p),realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'].map(p=>bind(path.resolve(root,p),Object.values(B.PINS).find(([x])=>x===p)?.[1]??'a'.repeat(64)));
 const originalBindings=Object.fromEntries(Object.entries(B.ORIGINAL).map(([k,[p,h,n]])=>[k,bind(p,h,n??1)]));
 const template={schema:'braid-program/f6c-parent-emission-refinement-launch.v1',scope:B.parentScope(2),parentIndex:2,...Object.fromEntries(Object.entries(B.NAMED).map(([k,[p,h]])=>[k,bind(p,h??'a'.repeat(64))])),dependencies:Object.fromEntries(Object.entries(B.DEPENDENCIES).map(([k,[p,h]])=>[k,bind(p,h)])),originalBindings,acceptanceOwner:bind('reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md'),priorCoverClosure:{authority:'versioned-acceptance-owner-declaration-not-fresh-observation',originalCallerSession:'13512',finalCompletionChunk:'c21aa7',exitCode:0,elapsedSeconds:'862.951823625',processesClosed:true,independentAuditAccepted:true},runtimeBindings,operationalBindings,limits:structuredClone(B.LIMITS)};
 const c={schema:'braid-program/f6c-parent-refinement-batch-preparation.v1',root,template:bind('/synthetic/template.json'),coordinator:bind(path.join(root,P.COORDINATOR[0]),P.COORDINATOR[1]),composition:operationalBindings[0],compositionControls:operationalBindings[1],preparationControls:bind(path.join(root,P.CONTROLS)),expectations:bind(path.join(root,P.EXPECTATIONS[0]),P.EXPECTATIONS[1]),sources:[],sourceIdentities:{},runtimeBindings,operationalBindings,acceptanceOwner:abs(template.acceptanceOwner),historicalDocumentRoutes:[],pythonCommand,git,operationDirectory:path.join(root,'.local-data/braid-analysis/synthetic-batch-operation'),parents:[3,4,5].map(parentIndex=>({parentIndex,output:path.join(root,B.LANE,'pilot-parent-'+parentIndex+'-synthetic-preparation'),producerMaximumBytes:8388608,comparisonMaximumBytes:4194304})),closureReserveBytes:4194304};
 const historical=Array.from({length:198},(_,i)=>bind('/synthetic/historical-'+i)),logs=Array.from({length:4},(_,i)=>bind('/synthetic/log-'+i));
 const admission={schema:'braid-program/f6c-cached-root-cover-full-admission.v1',scope:'full',accepted:true,processesClosed:true,sourceBindings:historical,stages:['consumer','comparison'].map((stage,i)=>({stage,process:{accepted:true,processesClosed:true,stdoutLog:logs[2*i],stderrLog:logs[2*i+1]}}))};
 const named=Object.keys(B.NAMED).map(k=>abs(template[k])),dependencies=Object.values(template.dependencies).map(abs),originals=Object.values(originalBindings).map(abs);
 c.sources=C.sourceUnion([c.template,c.coordinator,c.composition,c.compositionControls,c.preparationControls,c.expectations,c.acceptanceOwner,bind(path.join(root,P.CORRECTION[0]),P.CORRECTION[1]),...named,...dependencies,...originals,...runtimeBindings,...operationalBindings,...historical,...logs]);
 c.sourceIdentities=Object.fromEntries(c.sources.map((b,i)=>[b.path,'1:'+(i+1)+':'+b.bytes+':3:4']));
 const times=Array.from({length:161},(_,n)=>String(n/1000));times[3]='0.0030000000000000001';
 const segments=[...Array(1600).fill(null),...times.slice(0,-1).map((startTime,i)=>({startTime,endTime:times[i+1]}))];
 const exported={schema:'braid-program/f6c-retained-history-export.v1',fieldSpeed:'1',acceptedFrames:times.filter((_,n)=>n%2===0).map(time=>({time})),retainedHistories:Array.from({length:8},()=>({segments:structuredClone(segments)}))};
 return{configuration:c,template,admission,exported,self:bind(path.join(root,P.SELF)),configurationBinding:bind('/synthetic/configuration.json'),outDirectory:path.join(root,'.local-data/braid-analysis/synthetic-preparation'),C,B};
}
test('exact CLI flags and hashes; captured imports do not execute CLI',()=>{
 const a=['--configuration','/a','--configuration-sha256','a'.repeat(64),'--self-sha256','b'.repeat(64),'--out-directory','/b'];assert.equal(P.parseArguments(a).outDirectory,'/b');
 for(const v of [a.slice(2),[...a,'--other','x'],a.map(x=>x==='/a'?'/a/../b':x),a.map(x=>x==='a'.repeat(64)?undefined:x)])assert.throws(()=>P.parseArguments(v));
});
test('pure plan preparation yields original3/4/5 tokens and40MiB commitment',()=>{
 const f=fixture(),before=structuredClone(f.configuration),r=P.derivePlans(f);assert.deepEqual(f.configuration,before);
 assert.deepEqual(r.metadata.map(p=>p.parentIndex),[3,4,5]);assert.equal(r.metadata[0].reception.lower,'0.0030000000000000001');assert.equal(r.records.length,4);assert.equal(r.batch.stages.length,6);
 assert.equal(r.batch.configuration.parents.reduce((n,p)=>n+p.producerMaximumBytes+p.comparisonMaximumBytes,r.batch.configuration.closureReserveBytes),41943040);
 for(const x of r.records){assert.equal(x.binding.sha256,sha(x.raw));assert.equal(x.raw.toString(),P.canonical(x.value)+'\n');}
 assert.ok(r.sources.some(b=>b.path===f.configurationBinding.path));assert.ok(r.sources.some(b=>b.path===f.self.path));assert.ok(!r.sources.some(b=>b.path===r.batchBinding.path));
});
test('closed source/configuration/identity/schema/census mutations reject',()=>{
 const mutations=[f=>f.configuration.extra=1,f=>f.configuration.parents.reverse(),f=>f.configuration.parents[0].parentIndex=true,f=>delete f.configuration.sourceIdentities[f.configuration.sources[0].path],f=>f.configuration.sourceIdentities[f.configuration.sources[0].path]='1:2',f=>f.configuration.coordinator.sha256='b'.repeat(64),f=>f.configuration.sources.pop(),f=>f.admission.sourceBindings.pop(),f=>f.configuration.parents[0].producerMaximumBytes=67108864,f=>f.configuration.runtimeBindings.push(bind('/undeclared')),f=>f.template.proposalReference.sha256='c'.repeat(64)];
 for(const mutate of mutations){const f=fixture();mutate(f);assert.throws(()=>P.derivePlans(f));}
});
test('only actually consumed exact historical document routes admit',()=>{
 const f=fixture(),original=bind(path.join(root,'reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md'),'46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef',13021),physical={...original,path:'/synthetic/archived-resource.md'};
 const prior=f.admission.sourceBindings[0];f.admission.sourceBindings[0]=original;f.configuration.sources=f.configuration.sources.filter(b=>b.path!==prior.path);delete f.configuration.sourceIdentities[prior.path];f.configuration.sources.push(physical);f.configuration.sourceIdentities[physical.path]='1:999:13021:3:4';f.configuration.historicalDocumentRoutes=[{original,physical}];
 assert.equal(P.derivePlans(f).batch.configuration.parents.length,3);
 const unused={original:bind(path.join(root,'reference/priorities/braid-program/evidence/unused.md'),'c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853',16985),physical:bind('/synthetic/unused.md','c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853',16985)};
 f.configuration.historicalDocumentRoutes.push(unused);f.configuration.sources.push(unused.physical);f.configuration.sourceIdentities[unused.physical.path]='1:998:16985:3:4';assert.throws(()=>P.derivePlans(f));
});
test('expanded runtime cannot exceed downstream one-MiB plan consumer bound',()=>{
 const f=fixture();for(let i=0;i<85;i++){const b=bind('/synthetic/runtime/'+i+'-'+('x'.repeat(1800)));f.configuration.runtimeBindings.push(b);f.configuration.sources.push(b);f.configuration.sourceIdentities[b.path]='1:'+(1000+i)+':1:3:4';}
 assert.ok(Buffer.byteLength(P.canonical(f.configuration))<1048576);assert.throws(()=>P.derivePlans(f),/consumer plan byte limit/);
});
const record=(directory,name,value)=>{const raw=Buffer.from(P.canonical(value)+'\n');return{raw,binding:{path:path.join(directory,name),sha256:sha(raw),bytes:raw.length}};};
test('exclusive publication retains original descriptors until closure',()=>{
 const directory=path.join(realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-preparation-control-'))),'outputs'),p=new P.Publication(directory,C,()=>{}),r=record(directory,'one.json',{x:1});
 try{const b=p.write(r),fd=p.records[0].fd;assert.ok(fstatSync(fd).isFile());assert.equal(readFileSync(r.binding.path).toString(),'{"x":1}\n');p.verify();p.close();assert.throws(()=>fstatSync(fd));p.verify();assert.equal(b.bytes,8);assert.throws(()=>new P.Publication(directory,C,()=>{}));}finally{p.close();}
});
test('byte-identical replacement and final callback replacement reject and retain',()=>{
 for(const final of [false,true]){const directory=path.join(realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-preparation-rejection-'))),'outputs');let attack=false,armed=false;
  const r=record(directory,'one.json',{x:1}),p=new P.Publication(directory,C,()=>{if(armed&&!attack){attack=true;renameSync(r.binding.path,r.binding.path+'.original');writeFileSync(r.binding.path,r.raw);}});
  try{p.write(r);if(final)p.close();armed=true;assert.throws(()=>p.verify());assert.ok(existsSync(r.binding.path+'.original'));assert.deepEqual(readFileSync(r.binding.path+'.original'),r.raw);assert.deepEqual(readFileSync(r.binding.path),r.raw);}finally{p.close();}}
});
test('deadline/callback failures retain bytes and close all owned descriptors',()=>{
 const directory=path.join(realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-preparation-deadline-'))),'outputs');let stop=false;const p=new P.Publication(directory,C,()=>{if(stop)throw Error('synthetic original deadline');});
 const r=record(directory,'one.json',{x:1});try{p.write(r);const fd=p.records[0].fd;stop=true;assert.throws(()=>p.verify());p.close();assert.throws(()=>fstatSync(fd));assert.deepEqual(readFileSync(r.binding.path),r.raw);}finally{p.close();}
});
test('post-open fstat failure closes unregistered file and directory descriptors',()=>{
 const originalOpen=fs.openSync,originalStat=fs.fstatSync;let captured,fail=false,failingPath=null;
 fs.openSync=(...args)=>{const fd=originalOpen(...args);captured=fd;if(args[0]===failingPath)fail=true;return fd;};fs.fstatSync=(...args)=>{if(fail)throw Error('injected fstat failure');return originalStat(...args);};syncBuiltinESMExports();
 try{const base=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-preparation-fstat-'))),directory=path.join(base,'outputs');failingPath=directory;assert.throws(()=>new P.Publication(directory,C,()=>{}));assert.throws(()=>originalStat(captured));fail=false;failingPath=null;
  const next=path.join(base,'next'),p=new P.Publication(next,C,()=>{}),r=record(next,'one.json',{x:1});try{failingPath=r.binding.path;assert.throws(()=>p.write(r));assert.throws(()=>originalStat(captured));assert.ok(existsSync(r.binding.path));}finally{fail=false;p.close();}
 }finally{fs.openSync=originalOpen;fs.fstatSync=originalStat;syncBuiltinESMExports();}
});

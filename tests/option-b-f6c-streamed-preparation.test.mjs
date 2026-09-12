// Data-only fixture preparation. No scientific target, histories or Python
// scientific modules execute; only the existing Python runtime inventory runs.
import test from 'node:test';
import assert from 'node:assert/strict';
import cp from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
import {createHash} from 'node:crypto';
import {existsSync,lstatSync,mkdirSync,mkdtempSync,readFileSync,realpathSync,renameSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import * as C from '../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
import {prepare,admitPreparationSources,parseArgs} from '../scripts/eom/prepare-f6c-streamed-leaf-invocation.mjs';
const root=realpathSync(process.cwd()),sha=b=>createHash('sha256').update(b).digest('hex');
const python=path.resolve(process.env.AAA_VENV??path.join(root,'../.venv'),'bin/python');
const put=(p,b)=>{mkdirSync(path.dirname(p),{recursive:true});writeFileSync(p,b);};
function replaceSameBytes(filename){
 const before=readFileSync(filename),inode=lstatSync(filename,{bigint:true}).ino;
 writeFileSync(filename+'.replacement',before);renameSync(filename+'.replacement',filename);
 assert.equal(sha(readFileSync(filename)),sha(before));
 assert.notEqual(lstatSync(filename,{bigint:true}).ino,inode);
}
function replacePins(source,pins){const begin=source.indexOf('export const PINS=Object.freeze('),end=source.indexOf('\n});',begin);assert(begin>=0&&end>begin);return source.slice(0,begin)+'export const PINS=Object.freeze('+JSON.stringify(pins)+');'+source.slice(end+4);}
function fixture(){
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'f6c-v6-preparation-'))),pins={};
 for(const [role,[p]]of Object.entries(C.PINS)){const bytes=Buffer.from('deliberately nonexecutable scientific fixture '+role+'\n');put(path.join(dir,p),bytes);pins[role]=[p,role==='readiness'?null:sha(bytes)];}
 const raw=replacePins(readFileSync(path.join(root,C.SELF),'utf8'),pins);
 put(path.join(dir,C.SELF),raw);put(path.join(dir,C.CONTROL),'inert streamed control fixture\n');
 const doc=JSON.parse(readFileSync(path.join(root,C.SOURCE_MAP)));
 for(const row of doc['@graph'].filter(r=>r['@type']==='Source')){const bytes=readFileSync(path.join(root,row.binding.path));put(path.join(dir,row.binding.path),bytes);row.binding.sha256=sha(bytes);}
 const saveMap=()=>{const bytes=Buffer.from(JSON.stringify(doc,null,2)+'\n');put(path.join(dir,C.SOURCE_MAP),bytes);return sha(bytes);};
 const options={root:dir,coordinatorSha256:sha(raw),sourceMapSha256:saveMap(),python,descriptors:[],readinessSha256:sha(readFileSync(path.join(dir,C.PINS.readiness[0]))),output:path.join(dir,C.LANE,'metadata-only'),maxAdvances:1};
 mkdirSync(path.dirname(options.output),{recursive:true});
 return {dir,doc,options,saveMap,close:()=>rmSync(dir,{recursive:true,force:true})};
}
async function observed(fn){
 const original=cp.spawnSync,calls=[];
 cp.spawnSync=(command,args,...rest)=>{calls.push({command,args});return original(command,args,...rest);};syncBuiltinESMExports();
 try{return await fn(calls);}finally{cp.spawnSync=original;syncBuiltinESMExports();}
}
test('known replacement fixture is exact before constructing current metadata fixtures',()=>{
 assert.equal(replacePins('before\nexport const PINS=Object.freeze({\n old:1\n});\nafter',{new:2}),'before\nexport const PINS=Object.freeze({"new":2});\nafter');
 assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
 const dir=mkdtempSync(path.join(tmpdir(),'f6c-known-replacement-'));
 try{const p=path.join(dir,'known');put(p,'abc');replaceSameBytes(p);assert.equal(readFileSync(p,'utf8'),'abc');}finally{rmSync(dir,{recursive:true,force:true});}
});
test('known current v6 metadata fixture passes unchanged validator with zero numerical calls',async()=>{
 const f=fixture();try{await observed(async calls=>{
  const spec=await prepare(f.options),M=await import('data:text/javascript;base64,'+readFileSync(path.join(f.dir,C.SELF)).toString('base64'));
  assert.equal(M.PYTHON,C.PYTHON,'embedded scientific target remains unchanged');
  const admitted=await M.admitOperationalSources(spec),sources=M.validateSpec(spec,f.options.coordinatorSha256,admitted);
  assert.equal(spec.schema,'braid-program/f6c-streamed-leaf-invocation.v6');assert.equal(spec.historicalEvidence,null);assert.equal(spec.continuation,null);
  for(const key of ['sourceMap','manifestReader',...Object.keys(C.OPERATIONS)])assert(sources.some(b=>b.path===spec.bindings[key].path&&b.sha256===spec.bindings[key].sha256));
  assert.equal(spec.bindings.sourceMap.sha256,f.options.sourceMapSha256);
  assert.equal(calls.length,1);assert.equal(calls[0].command,python);assert.deepEqual(calls[0].args,['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY]);
  assert.equal(calls.filter(c=>c.args.includes(C.PYTHON)).length,0);assert.equal(existsSync(f.options.output),false);
  for(const schema of ['braid-program/f6c-streamed-leaf-invocation.v4','braid-program/f6c-streamed-leaf-invocation.v5'])assert.throws(()=>M.validateSpec({...spec,schema},f.options.coordinatorSha256,admitted),/fixed streamed/);
 });}finally{f.close();}
});
test('missing or wrong external coordinator/map selection rejects before Python discovery',async()=>{
 const f=fixture();try{await observed(async calls=>{
  for(const change of [{coordinatorSha256:undefined},{sourceMapSha256:undefined},{coordinatorSha256:'0'.repeat(64)},{sourceMapSha256:'0'.repeat(64)}])await assert.rejects(prepare({...f.options,...change}),/explicit .*Sha256|hash mismatch|expected hash|source changed|changed source/);
  assert.equal(calls.length,0);
 });}finally{f.close();}
});
test('wrong map role or changed selected dependency rejects before Python discovery',async()=>{
 for(const mode of ['role','bytes']){const f=fixture();try{await observed(async calls=>{
  if(mode==='role'){f.doc['@graph'].find(r=>r.binding?.path===C.OPERATIONS.helpers).role='independent-reference';f.options.sourceMapSha256=f.saveMap();}
  else put(path.join(f.dir,C.OPERATIONS.helpers),'changed operational helper');
  await assert.rejects(prepare(f.options));assert.equal(calls.length,0);
 });}finally{f.close();}}
});
test('frozen scientific mismatch and malformed historical transport reject without Python',async()=>{
 for(const mode of ['science','history']){const f=fixture();try{await observed(async calls=>{
  if(mode==='science')put(path.join(f.dir,C.PINS.adapter[0]),'changed scientific fixture');
  else f.options.historicalEvidence={selection:{schema:'invented',routes:[]},sourceBindings:[]};
  await assert.rejects(prepare(f.options));assert.equal(calls.length,0);
 });}finally{f.close();}}
});
test('metadata-only admission exposes the exact caller-selected map without Python',async()=>{
 const f=fixture();try{await observed(async calls=>{const a=await admitPreparationSources(f.options);assert.equal(a.sourceMap.sha256,f.options.sourceMapSha256);assert.equal(a.bindings.coordinator.sha256,f.options.coordinatorSha256);assert.equal(calls.length,0);});}finally{f.close();}
});
test('explicit historical transport is retained as data without inferring acceptance',async()=>{
 const f=fixture();try{
  const p=path.join(f.dir,'retained.source'),raw=Buffer.from('retained metadata fixture\n');put(p,raw);
  const physical={path:p,sha256:sha(raw),bytes:raw.length},original={...physical,path:path.join(f.dir,'historical-original')};
  const historicalEvidence={selection:{schema:'braid-program/variable-cell-historical-evidence.v1',routes:[{original,physical}]},sourceBindings:[physical]};
  const spec=await prepare({...f.options,historicalEvidence});assert.deepEqual(spec.historicalEvidence,historicalEvidence);assert.equal(Object.hasOwn(spec,'accepted'),false);
 }finally{f.close();}
});
test('source map changed during runtime inventory is rejected by final source checks',async()=>{
 const f=fixture(),original=cp.spawnSync;let calls=0;
 try{
  cp.spawnSync=(...args)=>{calls++;const result=original(...args);put(path.join(f.dir,C.SOURCE_MAP),'changed after source admission');return result;};syncBuiltinESMExports();
  await assert.rejects(prepare(f.options),/changed source/);assert.equal(calls,1);assert.equal(existsSync(f.options.output),false);
 }finally{cp.spawnSync=original;syncBuiltinESMExports();f.close();}
});
function cliArgs(f){
 const descriptors=path.join(f.dir,'descriptors.json');put(descriptors,'[]\n');
 return ['--root',f.dir,'--python',python,'--descriptors',descriptors,'--descriptors-sha256',sha(readFileSync(descriptors)),'--readiness-sha256',f.options.readinessSha256,'--output',f.options.output,'--max-advances','1','--out',path.join(f.dir,'prepared.json'),'--coordinator-sha256',f.options.coordinatorSha256,'--source-map-sha256',f.options.sourceMapSha256];
}
test('CLI retains closed argument rules, explicit digest selection and write-once metadata publication',()=>{
 const f=fixture();try{
  const args=cliArgs(f);assert.equal(parseArgs(args)['--source-map-sha256'],f.options.sourceMapSha256);
  for(const bad of [args.slice(0,-2),[...args,'--extra','x'],[...args,'--historical-evidence','absent'],[...args,'--source-map-sha256',f.options.sourceMapSha256]])assert.throws(()=>parseArgs(bad));
  const entry=path.join(root,'scripts/eom/prepare-f6c-streamed-leaf-invocation.mjs');
  const first=cp.spawnSync(process.execPath,[entry,...args],{encoding:'utf8',timeout:15000});assert.equal(first.status,0,first.stderr.slice(-1500));
  const report=JSON.parse(first.stdout);assert.equal(report.numericalCalls,0);assert.equal(report.independentlyAdmitted,false);
  const before=readFileSync(report.spec.path);assert.equal(JSON.parse(before).schema,'braid-program/f6c-streamed-leaf-invocation.v6');
  const second=cp.spawnSync(process.execPath,[entry,...args],{encoding:'utf8',timeout:15000});assert.equal(second.status,1);assert.deepEqual(readFileSync(report.spec.path),before);
 }finally{f.close();}
});

for(const [role,relative]of [['map',C.SOURCE_MAP],['streamed module',C.SELF]])test(`original ${role} identity survives metadata inventory and final CLI publication`,async()=>{
 const f=fixture(),original=cp.spawnSync;let calls=0;
 try{
  cp.spawnSync=(command,args,...rest)=>{
   assert.equal(command,python);assert.deepEqual(args,['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY]);calls++;
   const result=original(command,args,...rest);replaceSameBytes(path.join(f.dir,relative));return result;
  };syncBuiltinESMExports();
  await assert.rejects(prepare(f.options),/source bytes\/original identity/);
  assert.equal(calls,1);assert.equal(existsSync(f.options.output),false);
 }finally{cp.spawnSync=original;syncBuiltinESMExports();f.close();}
 // Exercise the real CLI both before publication and inside the write-once
 // publication seam. The latter leaves rejected metadata, never a success report.
 for(const seam of ['inventory','publication']){
  const g=fixture();try{
   const args=cliArgs(g),out=path.join(g.dir,'prepared.json');
   const preload=`import assert from 'node:assert/strict';
import cp from 'node:child_process';
import fs,{readFileSync,writeFileSync,renameSync,lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {syncBuiltinESMExports} from 'node:module';
const sha=b=>createHash('sha256').update(b).digest('hex');
${replaceSameBytes.toString()}
let inventories=0,replaced=false;
const replace=()=>{assert.equal(inventories,1);assert.equal(replaced,false);replaceSameBytes(${JSON.stringify(path.join(g.dir,relative))});replaced=true;console.error('same-byte replacement verified');};
const spawn=cp.spawnSync;cp.spawnSync=(command,args,...rest)=>{
 assert.equal(command,${JSON.stringify(python)});assert.deepEqual(args,${JSON.stringify(['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY])});
 inventories++;const result=spawn(command,args,...rest);if(${JSON.stringify(seam)}==='inventory')replace();return result;
};
const open=fs.openSync;fs.openSync=(filename,...rest)=>{const fd=open(filename,...rest);if(${JSON.stringify(seam)}==='publication'&&filename===${JSON.stringify(out)}&&rest[0]==='wx')replace();return fd;};
syncBuiltinESMExports();`;
   const result=cp.spawnSync(process.execPath,['--import','data:text/javascript;base64,'+Buffer.from(preload).toString('base64'),path.join(root,'scripts/eom/prepare-f6c-streamed-leaf-invocation.mjs'),...args],{encoding:'utf8',timeout:15000});
   assert.equal(result.status,1,result.stderr.slice(-2000));assert.equal(result.stdout,'');
   assert.match(result.stderr,/same-byte replacement verified/);assert.match(result.stderr,/source bytes\/original identity/);
   assert.equal(existsSync(out),seam==='publication');assert.equal(existsSync(g.options.output),false);
  }finally{g.close();}
 }
});

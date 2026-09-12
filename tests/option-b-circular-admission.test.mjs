import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, renameSync, rmSync, symlinkSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import {CIRCULAR_SOURCE_MAP, CIRCULAR_SOURCE_ROLES, CIRCULAR_SOURCE_SCOPE} from '../scripts/eom/run-current-subfield-circular-root-pilot.mjs';
import {pilotFileOperation} from '../scripts/eom/run-subfield-circular-root-pilot.mjs';
const root=realpathSync(process.cwd()), sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const url=bytes=>'data:text/javascript;base64,'+bytes.toString('base64');
// Synthetic external selection: copied files, explicit selected map bytes. No
// build, history, EOM call, or scientific acceptance is performed by this fixture.
function fixture(t) {
  const directory=realpathSync(mkdtempSync(path.join(tmpdir(),'option-b-circular-')));
  t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const map=JSON.parse(readFileSync(path.join(root,CIRCULAR_SOURCE_MAP)));
  for(const row of map['@graph'].filter(row=>row['@type']==='Source')) {
    const filename=path.join(directory,row.binding.path);mkdirSync(path.dirname(filename),{recursive:true});
    copyFileSync(path.join(root,row.binding.path),filename);row.binding.sha256=sha(readFileSync(filename));
  }
  const filename=path.join(directory,CIRCULAR_SOURCE_MAP);mkdirSync(path.dirname(filename),{recursive:true});
  const save=()=>{const raw=Buffer.from(JSON.stringify(map)+'\n');writeFileSync(filename,raw);return sha(raw);};
  const digest=save();
  return {directory,map,filename,digest,save,async loader(){return import(url(readFileSync(path.join(directory,'scripts/eom/run-current-subfield-circular-root-pilot.mjs'))));}};
}

test('known SHA and explicit copied-family fixture admit before rejection probes',async t=>{
  assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const f=fixture(t), module=await f.loader(), state=await module.loadCircularSourceMap(f.directory,f.digest);
  assert.equal(state.sources.length,22);assert.equal(state.bindings.length,23);state.recheck();
  assert.equal(state.sourceMap.sha256,f.digest);
  for(const row of state.sources) assert.ok(Buffer.isBuffer(row.bytes));
  for(const row of state.bindings) assert.deepEqual(Object.keys(row.identity),['dev','ino','size','mtimeMs','ctimeMs']);
  assert.equal(CIRCULAR_SOURCE_ROLES['scripts/eom/launch-subfield-circular-root-pilot.mjs'],'launcher');
});

test('actual repository manifest admits without fixture hash refresh',async()=>{
  const module=await import(url(readFileSync(path.join(root,'scripts/eom/run-current-subfield-circular-root-pilot.mjs'))));
  const digest=sha(readFileSync(path.join(root,CIRCULAR_SOURCE_MAP)));
  const state=await module.loadCircularSourceMap(root,digest);
  assert.equal(state.sources.length,22);assert.equal(state.bindings.length,23);state.recheck();
});

test('fresh capture rejects same-byte rename before admission returns',async t=>{
  const f=fixture(t),module=await f.loader();
  await module.loadCircularSourceMap(f.directory,f.digest);
  const read=fs.readFileSync;
  let replaced=false;
  fs.readFileSync=function(filename,...args){
    const data=read.call(this,filename,...args);
    if(typeof filename==='number'&&!replaced){
      replaced=true;copyFileSync(f.filename,f.filename+'.replacement');renameSync(f.filename+'.replacement',f.filename);
    }
    return data;
  };
  syncBuiltinESMExports();
  try {await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest),/changed/);assert.equal(replaced,true);}
  finally {fs.readFileSync=read;syncBuiltinESMExports();}
});

test('stage binding admits literal good first then rejects same-byte directory and path replacement',t=>{
  const directory=realpathSync(mkdtempSync(path.join(tmpdir(),'option-b-circular-stage-')));
  t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const keys=['dev','ino','size','mtimeMs','ctimeMs'];
  const identity=stat=>Object.fromEntries(keys.map(key=>[key,stat[key]]));
  for(const mode of ['directory','path']) {
    const parent=path.join(directory,mode),filename=path.join(parent,'source.mjs');
    mkdirSync(parent);writeFileSync(filename,'abc');
    const original=identity(fs.lstatSync(filename)),record={path:filename,
      sha256:'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',bytes:3,identity:original};
    const inspect=()=>pilotFileOperation({kind:'files',root:directory,files:[record]});
    assert.deepEqual(inspect(),[{path:filename,realPath:filename,sha256:record.sha256,bytes:3}]);
    t.diagnostic(mode+': literal abc binding passed before replacement control');
    const read=fs.readSync;let replaced=false;
    fs.readSync=function(fd,...args){
      const count=read.call(this,fd,...args);
      if(!replaced){
        replaced=true;
        if(mode==='directory') {
          renameSync(parent,parent+'.retained');mkdirSync(parent);
          copyFileSync(path.join(parent+'.retained','source.mjs'),filename);
          assert.deepEqual(identity(fs.fstatSync(fd)),original,'directory replacement preserves opened descriptor metadata');
        } else {
          copyFileSync(filename,filename+'.replacement');renameSync(filename+'.replacement',filename);
        }
        assert.equal(readFileSync(filename,'utf8'),'abc');
        assert.equal(realpathSync(filename),filename);
        assert.notEqual(fs.lstatSync(filename).ino,original.ino);
      }
      return count;
    };
    syncBuiltinESMExports();
    try {
      assert.throws(inspect,mode==='directory'?/original circular binding path identity changed/:/binding changed while reading|binding path identity changed/);
      assert.equal(replaced,true);
    } finally {fs.readSync=read;syncBuiltinESMExports();}
  }
});

test('inherited stage census cannot omit bindings or hide conflicting duplicate identities',async t=>{
  const f=fixture(t),module=await f.loader(),state=await module.loadCircularSourceMap(f.directory,f.digest);
  await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest,state.bindings.slice(1)),/complete inherited/);
  const changed=structuredClone(state.bindings[0]);changed.identity.ino++;
  await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest,[...state.bindings,changed]),/identity changed/);
});

test('external digest, scope, graph census, source role and captured initializer are mandatory',async t=>{
  const f=fixture(t), module=await f.loader();
  await assert.rejects(module.loadCircularSourceMap(f.directory),/externally selected/);
  await assert.rejects(module.loadCircularSourceMap(f.directory,'0'.repeat(64)),/digest/);
  const original=structuredClone(f.map);
  for(const mutate of [map=>map.scope='another-profile',map=>map['@graph'].find(row=>row.role==='launcher').role='current-source',
    map=>map['@graph']=map['@graph'].filter(row=>row.binding?.path!=='scripts/eom/prepare-current-subfield-circular-prior.mjs'),
    map=>map.baseline.entry='scripts/eom/run-subfield-circular-root-pilot.mjs']) {
    Object.assign(f.map,structuredClone(original));mutate(f.map);
    await assert.rejects(module.loadCircularSourceMap(f.directory,f.save()));
  }
  Object.assign(f.map,original);const digest=f.save();
  const raw=readFileSync(f.filename).toString().replace('"scope":','"scope":"duplicate","scope":');writeFileSync(f.filename,raw);
  await assert.rejects(module.loadCircularSourceMap(f.directory,sha(raw)),/Duplicate JSON key/);
  f.save();const entry=f.map['@graph'].find(row=>row.role==='admission');
  writeFileSync(path.join(f.directory,entry.binding.path),readFileSync(path.join(f.directory,entry.binding.path))+'\n// selected successor\n');
  entry.binding.sha256=sha(readFileSync(path.join(f.directory,entry.binding.path)));
  await assert.rejects(module.loadCircularSourceMap(f.directory,f.save()),/captured circular initializer differs/);
  assert.notEqual(digest,f.save());
});

test('source substitutions and identical-byte replacements cannot renew first identities',async t=>{
  for(const relative of [CIRCULAR_SOURCE_MAP,'scripts/equation-mapping/current-source-manifest.mjs',
    'scripts/eom/run-current-subfield-circular-root-pilot.mjs','scripts/eom/prepare-f5-enclosed-root.mjs']) {
    const f=fixture(t), module=await f.loader(), state=await module.loadCircularSourceMap(f.directory,f.digest);
    const filename=path.join(f.directory,relative), backup=filename+'.replacement';
    copyFileSync(filename,backup);renameSync(backup,filename);
    assert.throws(()=>state.recheck(),/identity changed/);
    await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest,state.bindings),/inherited circular source identity changed/);
  }
  const f=fixture(t), module=await f.loader(), state=await module.loadCircularSourceMap(f.directory,f.digest);
  const filename=path.join(f.directory,'scripts/eom/prepare-f5-enclosed-root.mjs');writeFileSync(filename,'// changed\n');
  assert.throws(()=>state.recheck(),/digest/);
  await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest),/digest/);
});

test('symbolic source substitutions fail closed even when target bytes match',async t=>{
  const f=fixture(t), module=await f.loader();
  const filename=path.join(f.directory,'scripts/eom/run-subfield-circular-root-pilot.mjs');
  renameSync(filename,filename+'.retained');symlinkSync(filename+'.retained',filename);
  await assert.rejects(module.loadCircularSourceMap(f.directory,f.digest),/canonical/);
});

test('actual legacy and current CLI routes reject absent map selection before creating output',t=>{
  const f=fixture(t), base='.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/control';
  for(const entry of ['launch-subfield-circular-root-pilot','run-subfield-circular-root-pilot','run-subfield-circular-root-rung','dispatch-subfield-circular-root-ladder',
    'run-current-subfield-circular-root-pilot','run-current-subfield-circular-root-rung','prepare-current-subfield-circular-prior','prepare-current-subfield-circular-ladder','prepare-subfield-circular-root']) {
    const result=spawnSync(process.execPath,[path.join(f.directory,'scripts/eom',entry+'.mjs'),'--out',base],{cwd:f.directory,encoding:'utf8',timeout:4000});
    assert.equal(result.status,1,entry+': '+result.stderr);assert.equal(result.signal,null,entry);assert.equal(existsSync(path.join(f.directory,base)),false);
  }
});

test('canonical map scope remains the externally agreed circular scope',()=>{
  assert.equal(CIRCULAR_SOURCE_SCOPE,'subfield-circular-current-operation');
});

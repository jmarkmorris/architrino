// Explicit successor bindings for the independently reviewed generic enclosure.
// Original manifest, handoff, request/wire bytes and historical binary survive.
import {createHash} from 'node:crypto';
import {constants,openSync,closeSync,fstatSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const SELF=fileURLToPath(import.meta.url), ROOT=resolve(dirname(SELF),'../..');
const OUT=resolve(ROOT,'.local-data/ring-followup/t04');
const CONTROL=resolve(OUT,'bindings-known.json');
const sha=b=>createHash('sha256').update(b).digest('hex');
function capture(path,role){
  path=resolve(ROOT,path);const fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW);
  try{const a=fstatSync(fd);assert(a.isFile()&&a.size<=512*1024*1024);
    const data=readFileSync(fd),b=fstatSync(fd);assert.equal(data.length,a.size);
    assert.equal(a.size,b.size);assert.equal(a.mtimeMs,b.mtimeMs);assert.equal(a.ctimeMs,b.ctimeMs);
    return {path,role,bytes:data.length,sha256:sha(data)};
  }finally{closeSync(fd);}
}
function known(){
  assert.equal(sha(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  mkdirSync(resolve(ROOT,'.tmp/ring-followup/t04/bindings-control'),{recursive:true});
  const p=resolve(ROOT,'.tmp/ring-followup/t04/bindings-control/abc');writeFileSync(p,'abc');
  const row=capture(p,'analytical-hash-control');assert.equal(row.bytes,3);assert.equal(row.sha256,sha(Buffer.from('abc')));
  mkdirSync(OUT,{recursive:true});writeFileSync(CONTROL,JSON.stringify({passed:true,instrumentSha256:sha(readFileSync(SELF)),returned:row})+'\n');
  console.log('Known SHA256/file capture passed before successor target.');
}
function target(){
  const control=JSON.parse(readFileSync(CONTROL));assert(control.passed);assert.equal(control.instrumentSha256,sha(readFileSync(SELF)));
  const base=resolve(ROOT,'.local-data/ring-exploration/eom-release/manifest-complete.json');
  const original=JSON.parse(readFileSync(base));assert.equal(original.executionAuthorized,false);assert.equal(original.reviewStatus,'pending');
  const changed=resolve(ROOT,'src/eom/src/CertifiedAcceleration.cpp'),bindings=[],changes=[];
  for(const old of original.bindings){
    const current=capture(old.path,old.role);
    if(old.path===changed){
      assert.notEqual(current.sha256,old.sha256);changes.push({path:old.path,priorBytes:old.bytes,priorSha256:old.sha256,currentBytes:current.bytes,currentSha256:current.sha256});bindings.push(current);
    }else{assert.equal(current.bytes,old.bytes,`unexpected byte change: ${old.path}`);assert.equal(current.sha256,old.sha256,`unexpected digest change: ${old.path}`);
      bindings.push({...old,role:old.role==='eom-executable'?'historical-eom-executable':old.role});}
  }
  assert.equal(changes.length,1);
  const additions=[
    ['.tmp/ring-followup/t04/build/eom_borg_shadow_cli','eom-executable'],
    ['.tmp/ring-followup/t04/build/eom_native_acceleration_fixture_cli','known-case-executable'],
    ['.tmp/ring-followup/t04/enclosure-fixture','known-case-executable'],
    ['scripts/eom/ring_t04_enclosure_followup_diagnostic.py','repair-instrument'],
    ['scripts/eom/ring_t04_enclosure_followup_fixture.cpp','repair-instrument'],
    ['scripts/eom/ring_t04_enclosure_followup_build.mjs','repair-instrument'],
    ['scripts/eom/ring_t04_enclosure_followup_checks.mjs','repair-instrument'],
    ['scripts/eom/ring_t04_enclosure_followup_regression.py','repair-instrument'],
    ['tests/test_eom_native_acceleration.py','unchanged-oracle-test'],
    ['reference/priorities/master-equation-closure/braid-program/analysis/ring-t04-enclosure-followup-2026-10-03.md','repair-proof'],
    ['.local-data/ring-followup/t04/diagnostic/known.json','known-control'],
    ['.local-data/ring-followup/t04/diagnostic/target.json','local-diagnostic'],
    ['.local-data/ring-followup/t04/diagnostic/production-known.json','known-control'],
    ['.local-data/ring-followup/t04/diagnostic/production-target.json','local-diagnostic'],
    ['.local-data/ring-followup/t04/checks-final/known.json','known-control'],
    ['.local-data/ring-followup/t04/checks-final/target.json','unchanged-oracle-receipt'],
    ['.local-data/ring-followup/t04/checks-final/fixture-process/stdout.json','unchanged-oracle-packet'],
    ['.local-data/ring-followup/t04/checks-final/regression-process/stderr.log','unchanged-oracle-result'],
    ['.local-data/ring-followup/t04/build/target.json','fresh-build-receipt'],
    [SELF,'successor-freezer'],[CONTROL,'known-freezer-control'],[base,'historical-manifest']];
  const seen=new Set(bindings.map(b=>b.path));
  for(const [p,role] of additions){const row=capture(p,role);if(!seen.has(row.path)){bindings.push(row);seen.add(row.path);}}
  for(const request of original.requests){const current=capture(request.path,'unchanged-request');assert.equal(current.sha256,request.sha256);assert.equal(current.bytes,request.bytes);
    const raw=JSON.parse(readFileSync(request.path));assert.equal(raw.wire.sha256,request.wireSha256);assert.equal(raw.wire.bytes,request.wireBytes);assert.equal(sha(raw.wire.utf8),request.wireSha256);}
  const result={...original,bindings,successor:{purpose:'Generic implicit-root sharp acceleration enclosure; original requests and error balls unchanged',baseManifestSha256:sha(readFileSync(base)),changes}};
  const bytes=Buffer.from(JSON.stringify(result,null,2)+'\n'),path=resolve(OUT,'manifest.json');writeFileSync(path,bytes,{flag:'wx',mode:0o600});
  console.log(JSON.stringify({path,bytes:bytes.length,sha256:sha(bytes),bindings:bindings.length,changedScientificSources:changes.length,executionAuthorized:false}));
}
const args=process.argv.slice(2);
if(args.length===2&&args[0]==='--stage'&&args[1]==='known')known();
else if(args.length===2&&args[0]==='--stage'&&args[1]==='target')target();
else throw new Error('usage: --stage known|target');

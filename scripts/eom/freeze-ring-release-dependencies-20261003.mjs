// Candidate-specific supplement. Preserve the original freezer and manifest.
import { createHash } from 'node:crypto';
import { constants, openSync, closeSync, fstatSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const SELF=fileURLToPath(import.meta.url), ROOT=resolve(dirname(SELF),'../..');
const CONTROL=resolve(ROOT,'.local-data/ring-exploration/eom-control/supplement-freezer-known.json');
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const dependencies=[
  'scripts/eom/run-f5-ordinary-evolution.mjs',
  'scripts/eom/f5-registered-stage-gate.mjs',
  'scripts/eom/f5-batch-admission.mjs',
  'scripts/eom/launch-prescribed-response-pilot.mjs',
  'scripts/eom/launch-subfield-circular-root-pilot.mjs',
  'scripts/eom/data/f5-history-evidence.json',
  'scripts/eom/BorgExecutableAdmission.mjs',
  'src/apps/borg/BorgDisplayHostMemoryEnvelope.js',
  'src/apps/borg/BorgCausalHistoryRetention.js',
  'src/apps/borg/BorgEomWakeBoundaryProducts.js',
  'src/documentation/ResearchSourcePaths.mjs',
  'src/documentation/ResearchSourceLocations.mjs',
  'src/documentation/research-source-locations.json',
  'scripts/eom/oracle/certified_history.py',
  'scripts/eom/oracle/decimal_interval.py',
  'scripts/eom/__init__.py',
  'scripts/eom/oracle/__init__.py',
  '.local-data/ring-exploration/eom-control/known.json',
  '.local-data/ring-exploration/eom-control/acceleration.json',
];

function capture(path,role){
  path=resolve(path);
  const fd=openSync(path,constants.O_RDONLY|constants.O_NOFOLLOW);
  try{
    const before=fstatSync(fd);assert(before.isFile()&&before.size<=512*1024*1024);
    const bytes=readFileSync(fd),after=fstatSync(fd);
    assert.equal(bytes.length,before.size);assert.equal(before.size,after.size);
    assert.equal(before.mtimeMs,after.mtimeMs);assert.equal(before.ctimeMs,after.ctimeMs);
    return {role,path,bytes:bytes.length,sha256:digest(bytes)};
  }finally{closeSync(fd);}
}

function known(){
  assert.equal(digest(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const dir=resolve(ROOT,'.tmp/ring-exploration/freezer-control');mkdirSync(dir,{recursive:true});
  const p=resolve(dir,'abc.txt');writeFileSync(p,'abc');
  const row=capture(p,'known-fixture');assert.equal(row.bytes,3);assert.equal(row.sha256,digest(Buffer.from('abc')));
  writeFileSync(CONTROL,JSON.stringify({passed:true,instrumentSha256:digest(readFileSync(SELF)),control:'SHA256 abc and three-byte regular-file capture',returned:row},null,2)+'\n');
  console.log('Supplemental freezer known control PASS');
}

function target(base,out){
  const control=JSON.parse(readFileSync(CONTROL));assert(control.passed);
  assert.equal(control.instrumentSha256,digest(readFileSync(SELF)));
  const bytes=readFileSync(base),original=JSON.parse(bytes);
  assert.equal(original.schema,'braid-program/b1-3-circular-release-binding-manifest.v1');
  assert.equal(original.executionAuthorized,false);assert.equal(original.reviewStatus,'pending');
  const bindings=original.bindings.slice(),seen=new Set(bindings.map(x=>x.path));
  for(const row of original.bindings){const now=capture(row.path,row.role);assert.equal(now.bytes,row.bytes);assert.equal(now.sha256,row.sha256);}
  for(const relative of dependencies){const row=capture(resolve(ROOT,relative),relative.startsWith('.local-data/')?'known-control-provenance':'scientific-source');if(!seen.has(row.path)){bindings.push(row);seen.add(row.path);}}
  for(const p of [SELF,CONTROL,resolve(base)]){const row=capture(p,'supplement-provenance');if(!seen.has(row.path)){bindings.push(row);seen.add(row.path);}}
  const manifest={...original,bindings,supplement:{baseManifestSha256:digest(bytes),purpose:'bind inspected transitive launch and independent-check dependencies; does not authorize execution'}};
  const output=Buffer.from(JSON.stringify(manifest,null,2)+'\n');writeFileSync(out,output,{flag:'wx',mode:0o600});
  console.log(JSON.stringify({path:resolve(out),bytes:output.length,sha256:digest(output),bindings:bindings.length,executionAuthorized:false}));
}

const args=process.argv.slice(2);
if(args.length===2&&args[0]==='--stage'&&args[1]==='known')known();
else if(args.length===6&&args[0]==='--stage'&&args[1]==='target'&&args[2]==='--base'&&args[4]==='--out')target(resolve(args[3]),resolve(args[5]));
else throw new Error('usage: --stage known | --stage target --base MANIFEST --out FRESH_MANIFEST');

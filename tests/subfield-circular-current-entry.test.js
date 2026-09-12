import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {parseCurrentCircularArgs} from '../scripts/eom/run-current-subfield-circular-root-pilot.mjs';
import {circularFixture} from './option-b-circular-fixture.mjs';
const entry='scripts/eom/run-current-subfield-circular-root-pilot.mjs';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
test('current entry parser admits exact known shape and rejects extra or escaping options',()=>{
 const args=['--profile','p','--profile-sha256','a'.repeat(64),'--out','.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/control','--source-map-sha256','b'.repeat(64)];
 assert.equal(parseCurrentCircularArgs(args)['--profile'],'p');
 assert.throws(()=>parseCurrentCircularArgs([...args,'--extra','x']));
 assert.throws(()=>parseCurrentCircularArgs([...args.slice(0,5),'../escape']));
});
test('captured entry rejects invalid profile and promptly closes startup guard before any workload',async t=>{
 const fixture=await circularFixture(t);
 const dir=realpathSync(mkdtempSync(path.join(tmpdir(),'circular-entry-control-')));
 try {
  const profile=path.join(dir,'profile.json'); const bytes=JSON.stringify({schema:'invalid-known-control',sources:{entry:{sha256:sha(readFileSync(entry))}}});writeFileSync(profile,bytes);
  const child=spawn(process.execPath,[path.join(fixture.root,entry),'--profile',profile,'--profile-sha256',sha(bytes),'--out','.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/invalid-control','--source-map-sha256',fixture.digest],{stdio:['ignore','pipe','pipe']});
  let errors='';child.stdout.resume();child.stderr.on('data',data=>errors+=data);
  let timer; const result=await new Promise((resolve,reject)=>{timer=setTimeout(()=>{child.kill('SIGKILL');reject(Error('startup guard failed prompt close'));},3000);child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}));}).finally(()=>clearTimeout(timer));
  assert.deepEqual(result,{code:1,signal:null});assert.match(errors,/profile authority/);
 } finally {rmSync(dir,{recursive:true});}
});

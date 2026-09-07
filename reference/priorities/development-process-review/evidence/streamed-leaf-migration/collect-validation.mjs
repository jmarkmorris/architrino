// Preserve exact owned-run outputs. No TAP reclassification or inferred passes.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const out=path.dirname(new URL(import.meta.url).pathname),rows=[];
for(const runId of ['1ded2fb9-8313-4929-89c7-e321ba4a3852','5c45ee5c-61af-45c4-95b8-3a5d455fd3f9','2df622ff-f53d-4db8-99f7-a1aa0fb8826a','4d36fc21-ca74-4cb7-ab19-cb77319e5081','103d9d3a-f6b0-4c1b-b17a-112a22148b2c','ccb05766-fcea-4b0b-804a-6115bd8db577','0dc235f6-7dd3-422e-a5c3-cad96ab2948d','78d6d30b-4fd9-475d-acd7-c7918eb3d146','7598e34b-ba33-4d1c-9a14-3d67210ae72c','7b8e843d-8009-494c-a307-785bfb608da8','483015ff-0495-4acf-8868-1edc9cd5a347']){
 const lease=JSON.parse(readFileSync('.local-data/owned-compute/leases/'+runId+'.json'));
 assert(lease.finishedAtUtc&&lease.processGroupClosed===true,'run must be closed before capture');
 const logs={};for(const which of ['stdout','stderr']){const b=readFileSync(lease[which+'Path']),file=runId+'.'+which+'.log';writeFileSync(path.join(out,file),b);logs[which]={file,sha256:sha(b),bytes:b.length};}
 rows.push({runId,status:lease.status,command:lease.command,args:lease.args,exitCode:lease.exitCode,exitSignal:lease.exitSignal,elapsedWallSeconds:lease.elapsedWallSeconds,processGroupClosed:lease.processGroupClosed,logs});
}
writeFileSync(path.join(out,'validation-runs.json'),JSON.stringify({knownCase:'SHA-256 abc passed before capture',runs:rows},null,2)+'\n');
const extract=s=>[...s.matchAll(/^retained fixture (\/[^\n]+)$/gm)].map(m=>m[1]);
assert.deepEqual(extract('retained fixture /tmp/example\nnot a record\n'),['/tmp/example']);
const fixtures=[];
for(const directory of extract(readFileSync(path.join(out,'483015ff-0495-4acf-8868-1edc9cd5a347.stdout.log'),'utf8'))){
 const p=path.join(directory,'external-closure.json');assert(existsSync(p),'final fixture must retain external observation');
 const b=readFileSync(p),record=JSON.parse(b);assert(record.allObservedAbsent===true&&record.processGroupClosed===true);fixtures.push({directory,sha256:sha(b),bytes:b.length,record});
}
writeFileSync(path.join(out,'fixture-closures.json'),JSON.stringify({knownCase:'literal fixture-line control passed before extracting final fixture paths',scope:'external test observation only; no scientific acceptance',fixtures},null,2)+'\n');
console.log(JSON.stringify({runs:rows.length,finalObservedFixtures:fixtures.length}));

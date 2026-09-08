import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const fields=['runId','status','command','args','cwd','startedAtUtc','finishedAtUtc','elapsedWallSeconds','exitCode','exitSignal','error','stopReason','processGroupClosed'];
const select=r=>Object.fromEntries(fields.filter(k=>k in r).map(k=>[k,r[k]]));
assert.deepEqual(select({runId:'known',status:'failed',secret:'excluded'}),{runId:'known',status:'failed'});
console.log('Known digest and field-selection controls passed before leases.');
const ids=['d90c4bba-beba-4e29-845b-a85b15837f52','b2cdc0ba-8675-40dc-b966-f07605a98dd2','1de57d47-c0be-4d78-8b98-343c5b1a902d','89a9023b-dc53-477e-b02f-0872b781f11f','6d133a31-d782-4298-8acb-a1ec218d1a6d','a79fd6f0-602d-4472-800e-82d509608a99','31cbb915-8fe3-4428-9cc3-c9059b9e103f','47393bd9-03a6-447a-8266-c18094ecce0a','7003641d-643a-435a-b24a-b4cdf7142c2d','49e84cb7-59c5-465d-917e-f5d88b6acda3','8ee2039d-15c6-4423-8d34-459c820f30b4'];
const out='reference/priorities/development-process-review/evidence/f5-remaining-callers';
const rows=ids.map(id=>{
 const r=JSON.parse(fs.readFileSync(`.local-data/owned-compute/leases/${id}.json`));const result=select(r);
 result.logs={}; for(const kind of ['stdout','stderr']){const b=fs.readFileSync(r[`${kind}Path`]);fs.writeFileSync(`${out}/${id}.${kind}.log`,b);result.logs[kind]={sha256:sha(b),bytes:b.length};}return result;
});
fs.writeFileSync(`${out}/runs.json`,JSON.stringify(rows,null,2)+'\n');
const root='.local-data/f5-original-input-trees/recovery-20260908-c';fs.copyFileSync(`${root}/f5-original-input-tree.json`,`${out}/execution-tree.json`);
const actual='.local-data/f5-original-input-trees/recovery-20260908-b/actual-interpolation.json';const b=fs.readFileSync(actual),r=JSON.parse(b);fs.writeFileSync(`${out}/interpolation-result.json`,JSON.stringify({path:actual,sha256:sha(b),bytes:b.length,status:r.status,accepted:r.accepted,instrument:r.instrument,sourceChecks:r.sourceChecks,enclosure:r.enclosure,falsifiers:r.falsifiers,boundary:'Actual unchanged instrument execution. The original receipt digest remains distinct; current instrument identity and renamed config path are the only differences by diff -u.'},null,2)+'\n');

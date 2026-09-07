import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const fields=['runId','status','command','args','cwd','requestedAtUtc','startedAtUtc','finishedAtUtc','elapsedWallSeconds','exitCode','exitSignal','processGroupClosed','stopReason'];
const select=r=>Object.fromEntries(fields.filter(k=>k in r).map(k=>[k,r[k]]));
assert.deepEqual(select({status:'completed',control:{token:'must-not-copy'}}),{status:'completed'});
console.log('Known capture case passed before target: only named fields, no control token.');
const runs=process.argv.slice(2).map(id=>{
 assert.match(id,/^[a-f0-9-]{36}$/);
 const r=JSON.parse(readFileSync('.local-data/owned-compute/leases/'+id+'.json'));
 assert.ok(['completed','failed','timed_out'].includes(r.status),'only final runs');
 const item=select(r);
 for(const stream of ['stdout','stderr']){const file=id+'.'+stream+'.log';writeFileSync(new URL(file,import.meta.url),readFileSync(r[stream+'Path']));item[stream]=file;}
 return item;
});
writeFileSync(new URL('validation-runs.json',import.meta.url),JSON.stringify({knownCase:'passed before target',runs},null,2)+'\n');
console.log(JSON.stringify(runs.map(r=>({status:r.status,exitCode:r.exitCode,processGroupClosed:r.processGroupClosed})),null,2));

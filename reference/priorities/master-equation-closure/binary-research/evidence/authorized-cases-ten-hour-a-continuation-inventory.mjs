import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function inventory(rows,left,limit){
 left=Q.of(left);limit=Q.of(limit);let cursor=left;const selected=[];
 for(let j=0;j<rows.length;j++){const z=rows[j],a=Q.of(z.left),b=Q.of(z.right);assert(a.cmp(b)<0);if(b.cmp(left)<=0)continue;if(a.cmp(limit)>=0)break;assert(a.cmp(cursor)===0,'touching coverage');const end=b.cmp(limit)>0?limit:b;selected.push({index:j+1,left:a.toString(),right:end.toString(),restricted:end.cmp(b)!==0});cursor=end;}
 assert(cursor.cmp(limit)===0,'complete requested coverage');return {count:selected.length,first:selected[0],last:selected.at(-1),left:left.toString(),limit:limit.toString()};
}
const fixture=[{left:'0',right:'1'},{left:'1',right:'2'},{left:'2',right:'3'}];const k=inventory(fixture,1,'5/2');assert(k.count===2&&k.last.restricted&&k.last.right==='5/2');assert.throws(()=>inventory([fixture[0],fixture[2]],0,3),/touching/);assert.throws(()=>inventory(fixture,0,4),/coverage/);
const known={passed:true,cases:['two remaining cells from 1 to 5/2 with last restriction','gap rejected','missing tail rejected']};
if(process.argv.includes('--known')){console.log(JSON.stringify(known));process.exit(0);}
const path='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-coordinator/b03-E-incoming-strongest-composed-v1.json.jsonl';assert(sha(path)==='f1dfe60ce012fa4678fdd4a27ff871497bcc5dcf2a2a65bc306e6d4ecdd52ca1');
const rows=fs.readFileSync(path,'utf8').trim().split('\n').map(JSON.parse),before=inventory(rows,'1995735772371699/35184372088832','119/2'),after=inventory(rows,'7983431761321363/140737488355328','119/2');
console.log(JSON.stringify({knownFirst:known,sourceSHA:sha(new URL(import.meta.url)),defectSHA:sha(path),rows:rows.length,lastFace:rows.at(-1).right,before,after,scope:'read-only original defect inventory, no receiving calculation'},null,2));

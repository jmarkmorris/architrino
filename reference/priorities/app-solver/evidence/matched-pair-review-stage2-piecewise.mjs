import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
// Separately authored analytical reference; no production history evaluator.
function binary(x) {
  assert(Number.isFinite(x));
  if (x === 0) return [0n,1n];
  const d=new DataView(new ArrayBuffer(8)); d.setFloat64(0,Math.abs(x));
  const b=d.getBigUint64(0), e=Number((b>>52n)&2047n);
  const m=(b&((1n<<52n)-1n))+(e?1n<<52n:0n), p=e?e-1075:-1074;
  const n=x<0?-m:m;
  return p>=0?[n<<BigInt(p),1n]:[n,1n<<BigInt(-p)];
}
const le=(a,b)=>a[0]*b[1]<=b[0]*a[1];
function contains(box,q) {assert(le(binary(box[0]),q)&&le(q,binary(box[1])), 'exact reference escaped');}
contains([-0.25,-0.25],[-1n,4n]);
contains([0.001,0.002],[17n,10125n]);
assert.throws(()=>contains([0,0],[17n,10125n]),/escaped/);
assert.deepEqual(binary(-0.25),[-4503599627370496n,18014398509481984n]);
console.log('Known exact -1/4, rational 17/10125, escaping interval and signed binary conversion passed BEFORE target reads.');
const [moduleFile,snapshotFile,joinFile,output]=process.argv.slice(2);
assert(output);
const rows=p=>fs.readFileSync(p,'utf8').trim().split('\n').map(JSON.parse);
const staticQ=[320000000n,15999992000001n], quadraticQ=[17n,10125n];
let moduleChecks=0, snapshotChecks=0;
for(const m of rows(moduleFile)) {
  if(m.status!=='certified_enclosed') continue;
  const q=m.control.includes('quadratic')?quadraticQ:staticQ;
  contains(m.acceleration[0],[0n,1n]); contains(m.acceleration[1],[0n,1n]); contains(m.acceleration[2],q);
  assert.equal(m.history_grade,'exact_piecewise_cubic');
  assert.equal(m.cell_boundaries[0],m.emission_lower);
  assert.equal(m.cell_boundaries.at(-1),m.reception_time);
  assert(m.cell_boundaries.every((x,i,a)=>i===0||Number(a[i-1])<Number(x)));
  moduleChecks++;
}
for(const s of rows(snapshotFile)) {
  assert.equal(s.status,'certified_complete');
  const q=s.case.startsWith('known-')?[-1n,4n]:s.case.includes('quadratic')?quadraticQ:staticQ;
  const receiver=s.receiver_totals.find(x=>x.receiver==='receiver'); assert(receiver);
  contains(receiver.acceleration[2],q); snapshotChecks++;
}
const join=rows(joinFile); assert.equal(join.length,1);
const s=join[0]; assert.equal(s.status,'certified_complete');
const g=s.groups.find(g=>g.receiver_path_id==='receiver'&&g.status==='certified_enclosed'); assert(g);
assert.deepEqual(g.cell_boundaries,['-15','-13','-12.5','0']);
assert.equal(g.leader_last_segment,1); assert.equal(g.follower_last_segment,1);
contains(g.acceleration[2],quadraticQ);
contains(s.receiver_totals.find(x=>x.receiver==='receiver').acceleration[2],quadraticQ);
const files=[moduleFile,snapshotFile,joinFile];
const receipt={recordedAt:new Date().toISOString(),knownBeforeTarget:true,moduleChecks,snapshotChecks,nontrivialJoinChecks:1,exactJoinAcceleration:'17/10125',files:files.map(path=>({path,sha256:createHash('sha256').update(fs.readFileSync(path)).digest('hex')}))};
fs.writeFileSync(output,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'}); console.log(JSON.stringify(receipt));

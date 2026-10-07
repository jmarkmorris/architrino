// Independent exact arithmetic adjunct to the analytical review. No subject imports.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const self = fileURLToPath(import.meta.url);
const digest = createHash('sha256').update(readFileSync(self)).digest('hex');
const gcd = (a,b) => b === 0n ? (a < 0n ? -a : a) : gcd(b,a%b);
function R(n,d=1n) { n=BigInt(n); d=BigInt(d); assert.notEqual(d,0n); if(d<0n){n=-n;d=-d;} const g=gcd(n,d); return [n/g,d/g]; }
const add=(a,b)=>R(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const neg=a=>R(-a[0],a[1]);
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>R(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>R(a[0]*b[1],a[1]*b[0]);
const sq=a=>mul(a,a);
const str=a=>`${a[0]}/${a[1]}`;
const sum=a=>a.reduce(add,R(0));
const dot=(a,b)=>sum(a.map((v,i)=>mul(v,b[i])));
const vsub=(a,b)=>a.map((v,i)=>sub(v,b[i]));
const scale=(a,t)=>a.map(v=>mul(v,t));
const inv=a=>scale(a,div(R(1),dot(a,a)));
function virial(points,charges) {
 const rows=[];
 for(let i=0;i<points.length;i++) for(let j=0;j<points.length;j++) if(i!==j) {
  const displacement=vsub(points[i],points[j]);
  const acceleration=scale(inv(displacement),R(charges[i]*charges[j]));
  rows.push(dot(points[i],acceleration));
 }
 return {value:sum(rows),rows:rows.length};
}
const mode=process.argv[2];
if(mode==='controls') {
 assert.deepEqual(add(R(1,2),R(1,3)),R(5,6));
 assert.deepEqual(div(R(-2,3),R(4,9)),R(-3,2));
 assert.deepEqual(sub(R(3),R(7,2)),R(-1,2));
 assert.deepEqual(mul(R(14,15),R(5,7)),R(2,3));
 const y=[R(1),R(0)], z=[R(0),R(2)];
 const lhs=dot(vsub(inv(z),inv(y)),vsub(inv(z),inv(y)));
 const rhs=div(dot(vsub(z,y),vsub(z,y)),mul(dot(z,z),dot(y,y)));
 assert.deepEqual(lhs,R(5,4)); assert.deepEqual(rhs,R(5,4));
 const binary=virial([[R(1),R(0)],[R(-1),R(0)]],[1,-1]);
 assert.deepEqual(binary.value,R(-1)); assert.equal(binary.rows,2);
 console.log(JSON.stringify({mode,passed:true,instrumentSha256:digest,controls:{rationalArithmetic:'passed',perpendicularInversionSquared:str(lhs),staticNeutralBinaryVirial:str(binary.value),directedBinaryRows:binary.rows}},null,2));
} else if(mode==='target') {
 const control=JSON.parse(readFileSync(process.argv[3],'utf8'));
 assert.equal(control.mode,'controls'); assert.equal(control.passed,true); assert.equal(control.instrumentSha256,digest);
 const lo=[R(1),R(6,5),R(8,5)], hi=[R(1),R(7,5),R(9,5)];
 const omega=R(9,1000), maxSpeed=mul(omega,hi[2]), floor=sub(R(1),maxSpeed);
 const member=[]; for(let a=0;a<3;a++) for(const s of [1,-1]) member.push({a,s,x:[mul(R(s),lo[a]),R(0)]});
 const counts={sameBinary:0,cross12:0,cross13:0,cross23:0};
 for(const i of member) for(const j of member) if(i!==j) {
  if(i.a===j.a) counts.sameBinary++;
  else counts[`cross${Math.min(i.a,j.a)+1}${Math.max(i.a,j.a)+1}`]++;
 }
 assert.deepEqual(counts,{sameBinary:6,cross12:8,cross13:8,cross23:8});
 const staticCheck=virial(member.map(p=>p.x),member.map(p=>p.s));
 assert.equal(staticCheck.rows,30); assert.deepEqual(staticCheck.value,R(-3));
 const pairBounds=[]; for(let a=0;a<3;a++) for(let b=a+1;b<3;b++) pairBounds.push(div(mul(hi[a],lo[b]),sub(lo[b],hi[a])));
 const coefficient=add(mul(R(2),sum(hi)),mul(R(16),sum(pairBounds)));
 const error=div(mul(omega,coefficient),floor);
 const inertia=mul(R(2),sum(hi.map(sq)));
 const circular=mul(sq(omega),inertia);
 const margin=sub(R(3),add(error,circular)); assert.ok(margin[0]>0n);
 console.log(JSON.stringify({mode,passed:true,instrumentSha256:digest,controlReceipt:process.argv[3],directedCounts:counts,staticSixMemberCheck:{rows:staticCheck.rows,virial:str(staticCheck.value)},pairBounds:pairBounds.map(str),maxSpeed:str(maxSpeed),sourceClockFloor:str(floor),coefficient:str(coefficient),inertiaUpper:str(inertia),delayCorrectionUpper:str(error),circularUpper:str(circular),strictMargin:str(margin)},null,2));
} else { throw new Error('Use controls, or target <control-receipt.json>'); }

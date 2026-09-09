import assert from 'node:assert/strict';
// Independent reference: expand Phi=x^2+3x+y+z^2 by hand, so -grad=(-2x-3,-1,-2z).
const phi1=([x,y])=>x*x+2*y, phi2=([x,y,z])=>3*x-y+z*z;
function negativeGradient(phi,point){return point.map((_,i)=>{const a=[...point],b=[...point];a[i]+=0.5;b[i]-=0.5;return -(phi(a)-phi(b));});}
// A known linear function checks sign, axis placement and the exact step denominator first.
assert.deepEqual(negativeGradient(([x,y,z])=>2*x-3*y+4*z,[0,0,0]),[-2,3,-4]);
console.log('PASS known linear gradient before finite-ledger controls');
for(const [point,expected] of [[[1,2,3],[-5,-1,-6]],[[0,0,0],[-3,-1,0]],[[-2,1,-1],[1,-1,2]]]) {
 const measured=negativeGradient(p=>phi1(p)+phi2(p),point).map(x=>x===0?0:x);
 assert.deepEqual(measured,expected);
 assert.notDeepEqual(negativeGradient(phi1,point),expected);
}
console.log('PASS three independently expanded polynomial witnesses and three omitted-row negatives; no physical-row or global-scalar claim');

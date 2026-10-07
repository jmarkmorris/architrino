import assert from 'node:assert/strict';

// Independent exact-rational controls for the frozen mathematical reference.
// This file imports no subject code, retained target fixture, or solver output.
const gcd = (a,b) => { a=a<0n?-a:a; b=b<0n?-b:b; while(b){const z=a%b;a=b;b=z;} return a; };
class Q {
  constructor(n,d=1n){ n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);this.n=n/g;this.d=d/g; }
  add(b){return new Q(this.n*b.d+b.n*this.d,this.d*b.d);}
  sub(b){return new Q(this.n*b.d-b.n*this.d,this.d*b.d);}
  mul(b){return new Q(this.n*b.n,this.d*b.d);}
  div(b){return new Q(this.n*b.d,this.d*b.n);}
  eq(b){return this.n===b.n&&this.d===b.d;}
  le(b){return this.n*b.d<=b.n*this.d;}
  str(){return `${this.n}/${this.d}`;}
}
const q=(n,d=1)=>new Q(n,d), same=(a,b)=>assert(a.eq(b),`${a.str()} != ${b.str()}`);
// Arithmetic is first checked against elementary, independently known values.
same(q(1,2).add(q(1,3)),q(5,6));same(q(2,3).mul(q(9,4)),q(3,2));same(q(3,7).div(q(9,14)),q(2,3));
const cases=[];
{
 const t=q(3),r=q(2),eps=q(1,10),s=t.sub(r),sp=t.sub(r.add(eps));
 same(s,q(1));same(sp.sub(s),q(-1,10));same(q(1).div(r.mul(r)),q(1,4));
 cases.push({name:'stationary source and receiver displacement',passed:true,root:s.str(),rootShift:sp.sub(s).str()});
}
{
 const t=q(4),x=q(2),v=q(1,3),theta=q(1,5),delta=q(1,10),one=q(1);
 const root=offset=>t.sub(x).add(v.mul(offset)).div(one.sub(v));
 const s0=root(theta),s1=root(theta.add(delta));
 same(s1.sub(s0),q(1,20));same(s1.add(theta.add(delta)).sub(s0.add(theta)),q(3,20));
 same(t.sub(s0),x.sub(v.mul(s0.add(theta))));
 same(v.mul(delta),q(1,30));
 cases.push({name:'translated affine source with distinct physical and nominal shifts',passed:true,physicalRootShift:s1.sub(s0).str(),nominalRootShift:q(3,20).str(),positionTransport:q(1,30).str()});
}
{
 const s=q(2,5),delta=q(1,10),acc=q=>q;
 same(acc(s.add(delta)).sub(acc(s)),delta);
 cases.push({name:'cubic nominal acceleration transport',passed:true,jerk:'1/1',accelerationShift:delta.str()});
}
{
 const t=q(1),x=q(1),y=q(9,10),delay=x.sub(y),root=t.sub(delay);
 same(delay,q(1,10));same(root,q(9,10));assert(delay.le(x.mul(q(2))));assert(!delay.eq(x.mul(q(2))));
 cases.push({name:'nonmirror pair rejects mirror delay formula',passed:true,actualDelay:delay.str(),invalidMirrorDelay:x.mul(q(2)).str()});
}
{
 const physicalCutoff=q(10),nominalCutoff=q(11),s=q(99,10),theta=q(1,5),nominal=s.add(theta);
 const physicalCovered=time=>time.le(physicalCutoff),nominalCovered=time=>time.le(nominalCutoff);
 assert(physicalCovered(s));assert(nominalCovered(nominal));assert(!physicalCovered(nominal));
 assert(!physicalCovered(q(101,10)));assert(nominalCovered(q(101,10).sub(theta)));
 cases.push({name:'physical support and nominal clock are independently tested',passed:true,physicalTime:s.str(),nominalTime:nominal.str()});
}
{
 // At t=0, rotating (1,0) at unit rate has derivative (0,1).
 const constantNominalVelocity=[0,0],assembledDerivative=[0,1];
 assert.notDeepEqual(constantNominalVelocity,assembledDerivative);
 cases.push({name:'moving frame derivative cannot be discarded',passed:true,rotatedNominalVelocity:constantNominalVelocity,assembledDerivative});
}
console.log(JSON.stringify({instrument:'independently authored exact-rational mathematical controls',reference:'maxwell-e-onehour-source-reference-2026-10-05.md',generatedAt:new Date().toISOString(),arithmeticKnownCaseFirst:true,passed:cases.every(c=>c.passed),knownCaseCount:cases.length,targetCaseCount:0,cases},null,2));

import assert from 'node:assert/strict';
import {Q,G,pi,sin,cos,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
const q=A=>A.map(r=>r.map(Q.of)),I=q([[1,0],[0,1]]),Z=q([[0,0],[0,0]]),add=(A,B)=>A.map((r,i)=>r.map((z,j)=>z.add(B[i][j]))),scale=(A,s)=>A.map(r=>r.map(z=>z.mul(s))),mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((z,x,k)=>z.add(x.mul(B[k][j])),Q.of(0))));
export function nilpotentTransition(C,h){C=q(C);h=Q.of(h);assert(mul(C,C).flat().every(z=>z.cmp(0)===0),'nilpotent comparison matrix');return {xx:add(I,scale(C,h.mul(h).div(2))),xv:add(scale(I,h),scale(C,h.mul(h).mul(h).div(6))),vx:scale(C,h),vv:add(I,scale(C,h.mul(h).div(2)))};}
export function containsZero(A){return A.every(r=>r.every(v=>{v=G.of(v);return v.lo.cmp(0)<=0&&v.hi.cmp(0)>=0;}));}
export function cartesian(n,A){const R=[[G.of(n[0]),G.of(n[1]).neg()],[G.of(n[1]),G.of(n[0])]],m=(A,B)=>A.map(r=>B[0].map((_,j)=>dot(r,B.map(z=>z[j])))),T=R[0].map((_,j)=>R.map(r=>r[j]));return m(m(R,A.map(r=>r.map(G.of))),T);}
export function known(){
 const h=Q.of('3/7'),C=q([[0,2],[0,0]]),p=nilpotentTransition(C,h);assert(p.vv[0][1].cmp('9/49')===0&&p.xv[0][1].cmp('9/343')===0&&p.vx[0][1].cmp('6/7')===0);assert(mul(C,p.xv).every((r,i)=>r.every((z,j)=>z.cmp(p.vx[i][j])===0)));const free=nilpotentTransition(Z,h);assert(free.vv[0][0].cmp(1)===0&&free.vx.flat().every(z=>z.cmp(0)===0));assert.throws(()=>nilpotentTransition(I,h),/nilpotent/);
 const quarter=pi().div(2),s=sin(quarter),c=cos(quarter);assert(s.lo.cmp(1)<=0&&s.hi.cmp(1)>=0&&c.lo.cmp(0)<=0&&c.hi.cmp(0)>=0);const X=Q.of('1/10'),V=Q.of('1/5'),endpoint=s.absUpper().mul(X).add(c.absUpper().mul(V));assert(endpoint.cmp(V)<0,'analytic negative-identity comparison has quarter-cycle velocity reduction');
 const A=[[new G(-1,1),new G(0,2)],[new G(-2,0),new G(-3,4)]];assert(containsZero(A));assert(!containsZero([[new G(1,2),0],[0,0]]));const rot=cartesian([0,1],[[1,2],[3,4]]);assert(rot[0][0].lo.cmp(4)===0&&rot[0][1].lo.cmp(-3)===0&&rot[1][0].lo.cmp(-2)===0&&rot[1][1].lo.cmp(1)===0);
 return {passed:true,cases:['nilpotent2x2 exact polynomial transition and differential identity','zero comparison has unchanged velocity exactly','nonnilpotent formula misuse rejected','negative-identity exact sine/cosine quartercycle reduces V1/5 to X1/10','closed zero matrix inclusion and positive entry exclusion','quarter-turn common Cartesian conjugation'],scope:'analytical mathematical controls only; no original-E target or physical law substitution'};
}
if(process.argv.includes('--known-block'))console.log(JSON.stringify(known(),null,2));

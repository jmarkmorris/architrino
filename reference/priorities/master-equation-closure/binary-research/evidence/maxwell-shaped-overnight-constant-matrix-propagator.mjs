// Constant-generator comparison controls only; no binary trajectory target.
import assert from 'node:assert/strict';
import {Q,G,sin,pi} from './maxwell-shaped-overnight-grid-interval.mjs';
import {I} from './maxwell-shaped-overnight-exact-interval.mjs';
const zero=n=>Array.from({length:n},()=>Array.from({length:n},()=>Q.of(0))),identity=n=>zero(n).map((r,i)=>r.map((z,j)=>Q.of(i===j?1:0)));
const matmul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,a,k)=>s.add(Q.of(a).mul(B[k][j])),Q.of(0))));
const normInf=A=>A.reduce((m,r)=>{const z=r.reduce((s,x)=>s.add(Q.of(x).abs()),Q.of(0));return m.cmp(z)>0?m:z;},Q.of(0));
const factorial=n=>{let z=1n;for(let j=2;j<=n;j++)z*=BigInt(j);return new Q(z);};
function qpow(a,n){let z=Q.of(1);for(let j=0;j<n;j++)z=z.mul(a);return z;}
export function exponentialBox(B,T,N=24){
  B=B.map(r=>r.map(Q.of));T=G.of(T);assert(Number.isSafeInteger(N)&&N>=0&&T.lo.cmp(0)>=0&&B.length>0&&B.every(r=>r.length===B.length));
  const a=normInf(B).mul(T.hi);assert(a.cmp(N+2)<0,'geometric Taylor tail ratio');
  let power=identity(B.length),time=new G(1),sum=power.map(r=>r.map(G.of));
  for(let k=1;k<=N;k++){power=matmul(power,B);time=time.mul(T).div(k);sum=sum.map((r,i)=>r.map((z,j)=>z.add(time.mul(power[i][j]))));}
  const tail=qpow(a,N+1).div(factorial(N+1)).div(Q.of(1).sub(a.div(N+2)));
  return {matrix:sum.map(r=>r.map(z=>z.add(new G(tail.neg(),tail)))),tail};
}
export function absoluteForcingBound(B,h,N=24){h=Q.of(h);const P=exponentialBox(B,new G(0,h),N);return {matrix:P.matrix.map(r=>r.map(z=>z.absUpper().mul(h))),tail:P.tail};}
export function constantForcingBox(B,f,T,N=24){assert(f.length===B.length);const aug=B.map((r,i)=>[...r,f[i]]).concat([Array.from({length:B.length+1},()=>0)]),P=exponentialBox(aug,T,N);return {vector:P.matrix.slice(0,-1).map(r=>r.at(-1)),tail:P.tail};}
// Independent scalar solution of x''=a x: closed hyperbolic/harmonic
// blocks and constant acceleration response; no matrix exponent routine.
function scalarReference(a,t,j){a=Q.of(a);t=Q.of(t);const w=a.mul(t.mul(t));let sum=Q.of(0);for(let k=0;k<=40;k++)sum=sum.add(qpow(w,k).mul(qpow(t,j)).div(factorial(2*k+j)));
  const q=w.abs(),tail=qpow(q,41).mul(qpow(t,j)).div(factorial(82+j)).div(Q.of(1).sub(q.div((83+j)*(84+j))));return new I(sum.sub(tail),sum.add(tail));}
const encloses=(got,ref)=>assert(got.lo.cmp(ref.lo)<=0&&got.hi.cmp(ref.hi)>=0,'matrix encloses independently evaluated exact block');
export function knownConstantMatrix(){
  const B=[[0,0,1,0],[0,0,0,1],['.25',0,0,0],[0,'-.125',0,0]],h=Q.of('.1'),P=exponentialBox(B,new G(h)),p=scalarReference('.25',h,0),q=scalarReference('.25',h,1),c=scalarReference('-.125',h,0),s=scalarReference('-.125',h,1);
  for(const [i,j,v]of [[0,0,p],[0,2,q],[2,0,q.mul('.25')],[2,2,p],[1,1,c],[1,3,s],[3,1,s.mul('-.125')],[3,3,c]])encloses(P.matrix[i][j],v);
  const f=[0,0,'.3','-.4'],F=constantForcingBox(B,f,new G(h));for(const [i,v]of [[0,scalarReference('.25',h,2).mul('.3')],[2,q.mul('.3')],[1,scalarReference('-.125',h,2).mul('-.4')],[3,s.mul('-.4')]])encloses(F.vector[i],v);
  const Z=exponentialBox([[0,0],[0,0]],new G(0,h)),Az=absoluteForcingBound([[0,0],[0,0]],h);for(let i=0;i<2;i++)for(let j=0;j<2;j++){assert(Z.matrix[i][j].lo.cmp(i===j?1:0)===0&&Z.matrix[i][j].hi.cmp(i===j?1:0)===0);assert(Az.matrix[i][j].cmp(i===j?h:0)===0);}
  // A full-period sine kernel has zero signed integral but admits changing
  // forcing with positive work integral. Quarter signs expose the shortcut.
  assert(sin(pi().div(2)).lo.cmp('.999999999999')>0&&sin(pi().mul(3).div(2)).hi.cmp('-.999999999999')<0);
  const whole=absoluteForcingBound(B,h);assert(whole.matrix[0][2].cmp(0)>0&&whole.matrix[1][3].cmp(0)>0);
  return {passed:true,cases:['stationary signed AX hyperbolic block','stationary signed AX harmonic block','nonzero exact constant acceleration forcing in both blocks','zero generator exact identity/absolute integral','opposite harmonic quarter signs: variable forcing cannot use signed full-period cancellation'],N:24,h:h.toString(),tail:P.tail.toString(),forcingTail:F.tail.toString(),production:'absolute whole-time exponential kernel; constant forcing column is control only'};
}
if(import.meta.url===new URL(process.argv[1],'file:').href||process.argv.includes('--known'))console.log(JSON.stringify(knownConstantMatrix(),null,2));

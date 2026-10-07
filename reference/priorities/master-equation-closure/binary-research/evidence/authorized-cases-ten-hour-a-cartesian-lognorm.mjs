// Four-dimensional exact PSD/lognorm subject. No physical family/target admission.
import assert from 'node:assert/strict';
import {Q,G,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
const mv=(A,v)=>A.map(r=>dot(r,v));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>dot(r,B.map(z=>z[j]))));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>G.of(x).sub(B[i][j])));
function determinant(A){if(A.length===1)return Q.of(A[0][0]);return A[0].reduce((z,x,j)=>{const term=Q.of(x).mul(determinant(A.slice(1).map(r=>r.filter((_,k)=>k!==j))));return j%2?z.sub(term):z.add(term);},Q.of(0));}
export function psd4(A){
 assert(A.length===4&&A.every(r=>r.length===4));for(let i=0;i<4;i++)for(let j=0;j<4;j++)assert(Q.of(A[i][j]).cmp(A[j][i])===0,'symmetric rational matrix');
 const minors=[];for(let mask=1;mask<16;mask++){const indices=[0,1,2,3].filter(j=>mask&(1<<j)),value=determinant(indices.map(i=>indices.map(j=>Q.of(A[i][j]))));minors.push({mask,value});}
 return {passed:minors.every(z=>z.value.cmp(0)>=0),minors};
}
export function lognorm4(S){
 assert(S.length===4&&S.every(r=>r.length===4));
 const midpoint=S.map(r=>r.map(x=>G.of(x).lo.add(G.of(x).hi).div(2))),radii=S.flat().map(x=>G.of(x).hi.sub(G.of(x).lo).div(2)),radius=length(radii).hi,max=(a,b)=>a.cmp(b)>=0?a:b;
 const certify=alpha=>psd4(midpoint.map((r,i)=>r.map((x,j)=>i===j?Q.of(alpha).sub(x):x.neg()))),sums=midpoint.map((r,i)=>r[i].add(r.reduce((z,x,j)=>j===i?z:z.add(x.abs()),Q.of(0))));
 let upper=sums.reduce(max).add('1/1000000000000'),lower=midpoint.map((r,i)=>r[i]).reduce(max);assert(certify(upper).passed);
 for(let k=0;k<50;k++){const mid=lower.add(upper).div(2);if(certify(mid).passed)upper=mid;else lower=mid;}
 const proof=certify(upper);assert(proof.passed);return {mu:upper.add(radius),alpha:upper,radius,midpoint,minors:proof.minors,scope:'interval symmetric perturbation Frobenius radius plus exact15-principal-minor PSD certificate'};
}
export function block(Bq,BH,U,alpha,n,nu){
 assert([Bq,BH,U].every(A=>A.length===2&&A.every(r=>r.length===2)));assert(n.length===2&&Q.of(nu).cmp(0)>0);const t=[G.of(n[1]).neg(),G.of(n[0])],A=t.map(x=>n.map(y=>G.of(alpha).mul(x).mul(y))),E=A.map((r,i)=>r.map((x,j)=>new G(i===j?1:0).sub(x))),EBq=mm(E,Bq),UE=mm(U,E),C=sub(BH,mm(UE,Bq)),M=[...EBq.map((r,i)=>[...r.map(x=>x.neg()),...E[i].map(x=>x.mul(nu))]),...C.map((r,i)=>[...r.map(x=>x.div(nu)),...UE[i]])],S=M.map((r,i)=>r.map((x,j)=>x.add(M[j][i]).div(2)));
 return {A,E,EBq,UE,C,M,S,rankOnePremise:'n is the one true nominal unit ray at each reception; alpha varies only on its velocity segment'};
}
export function exactForcing(E,U,fq,fH,nu){const Eq=mv(E,fq),UEq=mv(U,Eq);return [...Eq.map(x=>x.mul(nu).neg()),...fH.map((x,i)=>G.of(x).sub(UEq[i]))];}
export function known(){
 const m=A=>A.map(r=>r.map(x=>new G(x))),r=A=>A.map(z=>z.map(Q.of)),zero=m([[0,0],[0,0]]),I=m([[1,0],[0,1]]),near=(x,y)=>assert(x.lo.cmp(y)<=0&&x.hi.cmp(y)>=0&&x.hi.sub(x.lo).cmp('1/1000000000000000000')<0);
 assert(psd4(r([[1,2,0,0],[2,4,0,0],[0,0,0,0],[0,0,0,0]])).passed);assert(!psd4(r([[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]])).passed);
 const stat=block(zero,m([['1/4',0],[0,'-1/8']]),zero,0,[1,0],'1/2'),mu=lognorm4(stat.S);assert(mu.mu.cmp('1/2')>=0&&mu.mu.sub('1/2').cmp('1/1000000000000')<0);
 const shear=block(m([[3,0],[0,5]]),m([[7,0],[0,11]]),m([[0,1],[2,0]]),2,[1,0],1),expected=[[-3,0,1,0],[6,-5,-2,1],[13,-5,-2,1],[-6,11,2,0]];shear.M.forEach((row,i)=>row.forEach((x,j)=>near(x,expected[i][j])));exactForcing(shear.E,m([[0,1],[2,0]]),[1,2],[3,4],1).forEach((x,j)=>near(x,[-1,0,3,2][j]));
 const neg=lognorm4(m([[-4,0,0,0],[0,-3,0,0],[0,0,-2,0],[0,0,0,-1]]));assert(neg.mu.cmp(-1)>=0&&neg.mu.sub(-1).cmp('1/1000000000000')<0);
 const skew=m([[0,2,0,0],[-2,0,0,0],[0,0,0,2],[0,0,-2,0]]);const rot=stat.M.map((row,i)=>row.map((x,j)=>x.add(skew[i][j]))),sym=rot.map((row,i)=>row.map((x,j)=>x.add(rot[j][i]).div(2)));sym.forEach((row,i)=>row.forEach((x,j)=>near(x,stat.S[i][j].lo)));
 return {passed:true,cases:['all15 principal minors rank-one PSD and zero-diagonal offdiagonal rejection','stationary range2 atnu1/2 has exact lognorm1/2','noncommuting U/E synthetic full4x4 matrix','synthetic forcing(-1,0,3,2)','negative diagonal lognorm-1','common2vector skew cancellation'],scope:'algebraic known controls; no receiving family or stability claim'};
}
if(process.argv.includes('--known-cartesian-lognorm'))console.log(JSON.stringify(known(),null,2));

// Signed comparison-clock spatial transport; no actual source jerk imported.
import assert from 'node:assert/strict';
import {Q,G,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
import {directedSensitivity,matrixNormUpper,directedSensitivityKnown} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {exponentialBox,knownConstantMatrix} from './maxwell-shaped-overnight-constant-matrix-propagator.mjs';
const mv=(M,z)=>M.map(row=>dot(row,z));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s.add(G.of(x).mul(B[k][j])),new G(0))));
const outer=(a,b)=>a.map(x=>b.map(y=>G.of(x).mul(y)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>G.of(x).add(B[i][j])));
const neg=A=>A.map(r=>r.map(x=>G.of(x).neg()));
const sub=(A,B)=>add(A,neg(B));
const scale=(A,s)=>A.map(r=>r.map(x=>G.of(x).mul(s)));
const eye=()=>[[new G(1),new G(0)],[new G(0),new G(1)]];
const mid=x=>G.of(x).lo.add(G.of(x).hi).div(2);
export function signedSpatial(r,comparisonV,comparisonA,comparisonJ,actualU,law){
  const d=directedSensitivity(r,comparisonV,comparisonA,actualU,law);
  assert(d.D.lo.cmp(0)>0,'comparison clock denominator');
  const clock=add(eye(),scale(outer(comparisonV,d.n),new G(1).div(d.D)));
  const jets=mv(d.Fv,comparisonA).map((x,k)=>x.add(mv(d.Fa,comparisonJ)[k]));
  const AX=sub(mm(d.Fr,clock),scale(outer(jets,d.n),new G(1).div(d.D)));
  return {AX,translation:neg(AX),K:d.Fu,Dclock:d.D,R:d.R,partials:d};
}
const block=(M,i,j)=>M.slice(i,i+2).map(r=>r.slice(j,j+2));
const generator=(AX,K)=>[[0,0,1,0],[0,0,0,1],...AX.map((r,i)=>[...r,...K[i]])].map(r=>r.map(Q.of));
export function midpointGenerator(AX,K){return generator(AX.map(r=>r.map(mid)),K.map(r=>r.map(mid)));}
export function signedNormStep({AX,K,B,h,initial,proposed,sourcePosition,sourceVelocity,sourceAcceleration,Lv,La,defect,N=24}){
  h=Q.of(h);assert(h.cmp(0)>0);B=B.map(r=>r.map(Q.of));assert(B.length===4&&B.every(r=>r.length===4));
  const RX=matrixNormUpper(sub(AX,block(B,2,0))),RK=matrixNormUpper(sub(K,block(B,2,2))),LX=matrixNormUpper(AX);
  const g=RX.mul(proposed.x).add(RK.mul(proposed.v)).add(LX.mul(sourcePosition)).add(Q.of(Lv).mul(sourceVelocity)).add(Q.of(La).mul(sourceAcceleration)).add(defect);
  const whole=exponentialBox(B,new G(0,h),N),end=exponentialBox(B,new G(h),N);
  const norms=P=>({xx:matrixNormUpper(block(P,0,0)),xv:matrixNormUpper(block(P,0,2)),vx:matrixNormUpper(block(P,2,0)),vv:matrixNormUpper(block(P,2,2))});
  const W=norms(whole.matrix),E=norms(end.matrix);
  const bound=C=>({x:C.xx.mul(initial.x).add(C.xv.mul(initial.v)).add(h.mul(W.xv).mul(g)),v:C.vx.mul(initial.x).add(C.vv.mul(initial.v)).add(h.mul(W.vv).mul(g))});
  const wholeErrors=bound(W),endpointErrors=bound(E),passed=wholeErrors.x.cmp(proposed.x)<0&&wholeErrors.v.cmp(proposed.v)<0;
  return {RX,RK,LX,g,wholeBlocks:W,endpointBlocks:E,wholeErrors,endpointErrors,tail:whole.tail,passed};
}
const encloses=(a,b)=>assert(G.of(a).lo.cmp(b)<=0&&G.of(a).hi.cmp(b)>=0);
export function knownSignedSpatial(){
  const staticRow=signedSpatial([2,0],[0,0],[0,0],[0,0],[0,0],'full');
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){const q=i===j?(i===0?'.25':'-.125'):0;encloses(staticRow.AX[i][j],q);encloses(staticRow.translation[i][j],Q.of(q).neg());}
  const affine=signedSpatial(['2.5',0],['.2',0],[0,0],[0,0],[0,0],'E');encloses(affine.AX[0][0],'.24');encloses(affine.AX[1][1],'-.12');encloses(affine.translation[0][0],'-.24');
  const J=signedSpatial([2,0],[0,0],[0,0],[0,'.05'],[0,0],'E');encloses(J.AX[1][0],'-.025');
  const A=signedSpatial([2,0],[0,0],[0,'.03'],[0,0],[0,0],'full');encloses(A.AX[0][1],'-.0075');encloses(A.AX[1][0],'-.015');encloses(A.K[0][1],'.015');encloses(A.K[1][0],'-.015');
  const AX=[[new G(0),new G(0)],[new G(0),new G(0)]],K=AX,B=midpointGenerator(AX,K),step=signedNormStep({AX,K,B,h:'.1',initial:{x:Q.of('.2'),v:Q.of('.3')},proposed:{x:Q.of('.25'),v:Q.of('.35')},sourcePosition:0,sourceVelocity:0,sourceAcceleration:0,Lv:0,La:0,defect:'.4'});
  assert(step.passed&&step.RX.cmp('.000000000002')<0&&step.RK.cmp('.000000000002')<0);assert(step.endpointErrors.x.cmp('.234')>=0&&step.endpointErrors.x.cmp('.235')<0);assert(step.endpointErrors.v.cmp('.34')>=0&&step.endpointErrors.v.cmp('.340001')<0);
  const rejected=signedNormStep({AX,K,B,h:'.1',initial:{x:Q.of('.2'),v:Q.of('.3')},proposed:{x:Q.of('.23'),v:Q.of('.33')},sourcePosition:0,sourceVelocity:0,sourceAcceleration:0,Lv:0,La:0,defect:'.4'});assert(!rejected.passed);
  return {passed:true,cases:['static signed receiving/translation matrices','affine comparison-clock matrix and negative translation','delayed sourceJ transverse entry','transverse sourceA signed AX and receiving skew','zero signed generator entire-time forcing norm','failed first-escape envelope'],sensitivity:directedSensitivityKnown(),constantMatrix:knownConstantMatrix()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(knownSignedSpatial(),null,2));

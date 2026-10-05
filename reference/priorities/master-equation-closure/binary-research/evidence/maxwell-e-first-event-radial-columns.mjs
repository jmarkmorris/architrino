// Complete-family directional columns; no target application in this module.
import assert from 'node:assert/strict';
import {Q,G,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
import {normUpper,matrixNormUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {physicalDirection} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
const min=(a,b)=>Q.of(a).cmp(b)<=0?Q.of(a):Q.of(b),cross=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));
export function radialColumns(clock,qCurrent,qSource,Cx){
  const column=q=>{const nc=physicalDirection(q),inRay=[dot(clock.n,nc),cross(clock.n,nc)],value=clock.AX.map(row=>dot(row,inRay));return {bound:min(Cx,normUpper(value)),direction:inRay,value};};
  const current=column(qCurrent),source=column(qSource);
  return {Ct:current.bound,Cs:source.bound,currentDirection:current.direction,sourceDirection:source.direction,currentValue:current.value,sourceValue:source.value};
}
export function radialForcing(delta,Cx,Cs,Hv,B,sr,su,sa,r,b,a,psi){
  for(const z of [delta,Cx,Cs,Hv,B,sr,su,sa,r,b,a,psi])assert(Q.of(z).cmp(0)>=0,'nonnegative complete radial-source forcing');
  const sourceRadial=min(Cx,Q.of(Cs).add(Q.of(Cx).mul(psi))),position=sourceRadial.mul(sr).add(Q.of(Cx).mul(r).mul(psi));
  const velocity=Q.of(su).add(Q.of(b).mul(psi)),acceleration=Q.of(sa).add(Q.of(a).mul(psi));
  return {forcing:Q.of(delta).add(position).add(Q.of(Hv).mul(velocity)).add(Q.of(B).mul(acceleration)),sourceRadial,position,velocity,acceleration};
}
export function radialKnown(){
  const matrix=[[new G('.25'),new G(0)],[new G(0),new G('-.125')]],Cx=matrixNormUpper(matrix),x=radialColumns({AX:matrix,n:[new G(1),new G(0)]},[0,2],[2,0],Cx);
  assert(x.Ct.cmp('.125')>=0&&x.Ct.cmp('.125000000001')<0&&x.Cs.cmp('.25')>=0&&x.Cs.cmp('.250000000001')<0);
  const y=radialColumns({AX:matrix,n:[new G(0),new G(1)]},[-2,0],[0,2],Cx);assert(y.Ct.cmp(x.Ct)===0&&y.Cs.cmp(x.Cs)===0);
  const rank=[[new G('.3'),new G('.4')],[new G(0),new G(0)]],d=radialColumns({AX:rank,n:[new G(1),new G(0)]},[2,0],[0,2],matrixNormUpper(rank));assert(d.Ct.cmp('.3')>=0&&d.Ct.cmp('.300000000001')<0&&d.Cs.cmp('.4')>=0&&d.Cs.cmp('.400000000001')<0);
  const q=Q.of,z=radialForcing(q('.01'),q('.5'),q('.2'),q('.3'),q('.4'),q('.1'),q('.2'),q('.3'),q(2),q(3),q(4),q('.1'));
  assert(z.sourceRadial.cmp('.25')===0&&z.position.cmp('.125')===0&&z.forcing.cmp('.565')===0);
  assert.throws(()=>radialColumns({AX:matrix,n:[new G(1),new G(0)]},[0,0],[2,0],Cx),/positive range/);
  assert.throws(()=>radialForcing(q(0),q(1),q(1),q(1),q(1),q(0),q(0),q(0),q(1),q(1),q(1),q('-.1')),/nonnegative/);
  return {passed:true,cases:['static perpendicular receiving column1/8 versus full1/4','quarter-turn ray/radial covariance','known rank-one columns3/10 and2/5 versus norm1/2','actual source radial phase correction and complete forcing113/200','zero radial axis and negative phase rejected']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(radialKnown()));

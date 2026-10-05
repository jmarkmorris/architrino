// Independently derived true-unit-ray source-speed enclosure in nominal root clock.
// Original rootBox and all earlier references remain unchanged.
import assert from 'node:assert/strict';
import {Q,G,add,mul,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {rootBox as originalRootBox} from './maxwell-shaped-overnight-directed-defect.mjs';
const max=(a,b)=>Q.of(a).cmp(b)>=0?Q.of(a):Q.of(b),min=(a,b)=>Q.of(a).cmp(b)<=0?Q.of(a):Q.of(b);
function intersect(a,b){const lo=max(a.lo,b.lo),hi=min(a.hi,b.hi);assert(lo.cmp(hi)<=0,'independently enclosing root families overlap');return new G(lo,hi);}
export function unitClockDenominator(r,sourceVelocity){
  const R=length(r);assert(R.lo.cmp(0)>0,'positive complete root range');
  const naive=new G(1).add(dot(mul(r,new G(1).div(R)),sourceVelocity)),speed=normUpper(sourceVelocity),physical=new G(Q.of(1).sub(speed),Q.of(1).add(speed));
  return {D:intersect(naive,physical),naive,speed,R};
}
export function rootBox(history,T,X,seed,width,sourcePositionError=Q.of(0),iterations=6){
  T=G.of(T);width=Q.of(width);seed=Q.of(seed);const error=new G(Q.of(sourcePositionError).neg(),sourcePositionError),sx=S=>history.box(S,0).map(z=>z.add(error)),gap=S=>T.sub(S).sub(length(add(X,sx(S))));let bracket=new G(seed.sub(width),seed.add(width));
  const gl=gap(new G(bracket.lo)),gh=gap(new G(bracket.hi));assert(gl.lo.cmp(0)>0&&gh.hi.cmp(0)<0,'root faces must bracket EVERY parameter in box');
  for(let j=0;j<iterations;j++){const c=bracket.lo.add(bracket.hi).div(2),r=add(X,sx(bracket)),{D}=unitClockDenominator(r,history.box(bracket,1));assert(D.lo.cmp(0)>0,'physical nominal root denominator positive');bracket=intersect(bracket,new G(c).add(gap(new G(c)).div(D)));}
  return bracket;
}
export function known(){
  const simple=unitClockDenominator([new G('.2',2),new G(0)],[new G('-.2'),new G(0)]);assert(simple.naive.lo.cmp(0)<0&&simple.D.lo.cmp('.799999999999')>0&&simple.D.lo.cmp('.8')<=0);
  const history={box:(S,n)=>n===0?[new G('.2').sub(G.of(S).mul('.2')),new G(0)]:n===1?[new G('-.2'),new G(0)]:[new G(0),new G(0)]},T=new G(0),X=[new G('.2',2),new G(0)];
  assert.throws(()=>originalRootBox(history,T,X,'-1.6','1.3',Q.of(0),3),/root denominator positive/);
  const S=rootBox(history,T,X,'-1.6','1.3',Q.of(0),3);assert(S.lo.cmp('-2.75')<=0&&S.hi.cmp('-.5')>=0&&S.hi.sub(S.lo).cmp('2.251')<0);
  const stationary={box:(_S,n)=>[new G(n===0?1:0),new G(0)]},p=rootBox(stationary,new G(0),[new G(1),new G(0)],-2,'.01');assert(p.lo.cmp(-2)<=0&&p.hi.cmp(-2)>=0&&p.hi.sub(p.lo).cmp('.000000000001')<0);
  assert.throws(()=>rootBox(stationary,T,[new G(1),new G(0)],-2,'.0000000000000000000000001',Q.of('.1')),/root faces/);
  return {passed:true,cases:['true unit direction D4/5 despite negative Cartesian interval D','independent complete affine root family[-11/4,-1/2] with original bound failure','stationary exact root-2','insufficient every-parameter face bracket rejected'],affineRoot:S.out(),naiveD:simple.naive.out(),physicalD:simple.D.out()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(known()));

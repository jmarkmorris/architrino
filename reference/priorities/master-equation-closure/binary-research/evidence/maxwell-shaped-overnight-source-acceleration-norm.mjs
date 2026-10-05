// Exact planar source-A norm geometry; no actual sourceA contribution discarded.
import assert from 'node:assert/strict';
import {Q,G,dot,length,mul} from './maxwell-shaped-overnight-grid-interval.mjs';
export function sourceAccelerationNorm(r,v,u,law){
  assert(['E','full'].includes(law)&&r.length===2&&v.length===2&&u.length===2);
  const R=length(r);assert(R.lo.cmp(0)>0);const n=mul(r,new G(1).div(R)),D=new G(1).sub(dot(n,v));assert(D.lo.cmp(0)>0);
  const vt=n[0].mul(v[1]).sub(n[1].mul(v[0])),Dr=new G(1).sub(dot(n,u)),ut=n[0].mul(u[1]).sub(n[1].mul(u[0]));
  const source=D.sq().add(vt.sq()),receiver=Dr.sq().add(ut.sq()),E=source.sqrt().div(R.mul(D).mul(D).mul(D)),full=source.mul(receiver).sqrt().div(R.mul(D).mul(D).mul(D));
  return {norm:law==='E'?E:full,E,full,R,D,Dr,vt,ut};
}
const encloses=(a,b)=>assert(a.lo.cmp(b.lo)<=0&&a.hi.cmp(b.hi)>=0);
export function knownSourceAccelerationNorm(){
  const stationary=sourceAccelerationNorm([2,0],[0,0],[0,0],'E');assert(stationary.norm.lo.cmp('.5')<=0&&stationary.norm.hi.cmp('.5')>=0&&stationary.norm.hi.cmp('.50000000001')<0);
  const full=sourceAccelerationNorm([2,0],[0,0],['.2','.3'],'full'),fullRef=new G(73).sqrt().div(20);encloses(full.norm,fullRef);
  const transverse=sourceAccelerationNorm([2,0],['.2','.3'],[0,0],'E'),transverseRef=new G(73).sqrt().mul(125).div(1280);encloses(transverse.norm,transverseRef);
  const rotated=sourceAccelerationNorm([0,2],['-.3','.2'],['-.3','.2'],'full');const unrotated=sourceAccelerationNorm([2,0],['.2','.3'],['.2','.3'],'full');assert(rotated.norm.lo.cmp(unrotated.norm.hi)<=0&&rotated.norm.hi.cmp(unrotated.norm.lo)>=0);
  assert.throws(()=>sourceAccelerationNorm([0,0],[0,0],[0,0],'E'));assert.throws(()=>sourceAccelerationNorm([2,0],[1,0],[0,0],'full'));
  return {passed:true,cases:['stationary E exact1/2','stationary source full sqrt73/20','transverse source E125sqrt73/1280','quarter-turn invariance','zero range and zero transmitterD rejected'],stationary:stationary.norm.out(),full:full.norm.out(),transverse:transverse.norm.out(),scope:'planar exact operator norm; general3D product only upperbound'};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(knownSourceAccelerationNorm(),null,2));

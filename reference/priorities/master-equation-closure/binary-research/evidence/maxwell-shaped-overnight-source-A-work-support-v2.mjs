// Section55 planar Euclidean source-A error support; K=cf=1, opposite polarity.
// Other actual r/sourceV/receivingU uncertainties must remain in whole input boxes.
import assert from 'node:assert/strict';
import {Q,G,dot,sub} from './maxwell-shaped-overnight-grid-interval.mjs';
import {directedSensitivity,directedSensitivityKnown} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
const cross=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));
export function sourceAWorkSupport(r,v,aNom,u,error,law='full'){
  assert(law==='E'||law==='full','selected Maxwell law');
  assert([r,v,aNom,u].every(z=>Array.isArray(z)&&z.length===2),'planar physical input boxes');
  error=Q.of(error);assert(error.cmp(0)>=0,'nonnegative Euclidean sourceA error');
  const d=directedSensitivity(r,v,aNom,u,'E');
  assert(d.R.lo.cmp(0)>0&&d.D.lo.cmp(0)>0,'ordinary source domain');
  const ut=cross(d.n,u),vt=cross(d.n,v),coefficient=ut.sq().sqrt().mul(d.D.sq().add(vt.sq()).sqrt()).mul(2).div(d.R.mul(d.D.mul(d.D).mul(d.D))),
    nominal=dot(u,d.F).mul(2),slack=coefficient.hi.mul(error),work=new G(nominal.lo.sub(slack),nominal.hi.add(slack));
  return {law,nominal,coefficient,slack,work,scope:'actual full work equals E at identical inputs; all other input/root uncertainties retained; nominalA at entire actual emission support'};
}
export function sourceAWorkKnown(){
  const old=directedSensitivityKnown(),base=sourceAWorkSupport([2,0],[0,0],[0,0],['.2','.3'],'.03');
  assert(base.nominal.lo.cmp('-.1')<=0&&base.nominal.hi.cmp('-.1')>=0);
  assert(base.coefficient.lo.cmp('.3')<=0&&base.coefficient.hi.cmp('.3')>=0);
  assert(base.work.lo.cmp('-.109')<=0&&base.work.hi.cmp('-.091')>=0);
  const collinear=sourceAWorkSupport([2,0],['.2','.3'],[0,0],['.2',0],'.1','E');assert(collinear.slack.cmp(0)===0,'longitudinal receiver cancels sourceA work');
  const affine=sourceAWorkSupport([2,0],['.2','.3'],[0,0],['.1','.4'],'.1'),expected=new G(73).sqrt().mul(5).div(64);
  assert(affine.coefficient.lo.cmp(expected.hi)<=0&&affine.coefficient.hi.cmp(expected.lo)>=0);
  const nominal=dot(['.1','.4'],directedSensitivity([2,0],['.2','.3'],[0,0],['.1','.4'],'E').F).mul(2);
  for(const [a,delta] of [[['.1',0],'0.0234375'],[[0,'.1'],'0.0625']]){
    const z=dot(['.1','.4'],directedSensitivity([2,0],['.2','.3'],a,['.1','.4'],'E').F).mul(2).sub(nominal);
    assert(z.lo.cmp(delta)<=0&&z.hi.cmp(delta)>=0,'analytical signed sourceA work derivative');
  }
  let rejected=false;try{sourceAWorkSupport([2,0],[0,0],[0,0],[0,0],'-.1');}catch{rejected=true;}assert(rejected);
  return {passed:true,priorKnown:old,cases:['static work -.1 and Euclidean sourceA slack .009','longitudinal receiver cancels sourceA work','affine exact support norm 5sqrt73/64','sourceAx/Ay work changes 3/128 and1/16','negative error rejected']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(sourceAWorkKnown()));

// Exact cumulative integral of complete whole-cell angular-error densities.
// Maxima of source X/V/A still use their separate closed-face census.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
function firstFace(rows,t){let lo=0,hi=rows.length;while(lo<hi){const j=(lo+hi)>>1;if(rows[j].t.cmp(t)<0)lo=j+1;else hi=j;}return lo;}
export function prefixFace(previous,right,omega){assert(right.cmp(previous.t)>0&&Q.of(omega).cmp(0)>=0);return Q.of(previous.angularPrefix).add(right.sub(previous.t).mul(omega));}
function primitive(rows,t,pastOmega){t=Q.of(t);assert(t.cmp(-6)>0&&t.cmp(rows.at(-1).t)<=0,'entire finite angular history is completed');assert(Q.of(pastOmega).cmp(0)>=0);if(t.cmp(0)<=0)return {value:t.mul(pastOmega),face:0};const j=firstFace(rows,t);assert(j>0&&j<rows.length&&rows[j].t.cmp(rows[j-1].t)>0&&Q.of(rows[j].omega).cmp(0)>=0);const value=Q.of(rows[j-1].angularPrefix).add(t.sub(rows[j-1].t).mul(rows[j].omega));return {value,face:j};}
export function completedIntegral(rows,left,right,pastOmega){left=Q.of(left);right=Q.of(right);assert(left.cmp(right)<=0);const a=primitive(rows,left,pastOmega),b=primitive(rows,right,pastOmega),value=b.value.sub(a.value);assert(value.cmp(0)>=0,'nonnegative complete angular integral');return {value,leftFace:a.face,rightFace:b.face};}
export function angularWindow(rows,S,T,trialOmega,pastOmega){
  assert(T.lo.cmp(rows.at(-1).t)===0&&T.hi.cmp(T.lo)>=0,'exact receiving faces');assert(S.lo.cmp(-6)>0&&S.hi.cmp(T.lo)<=0,'whole completed source guard');assert(Q.of(trialOmega).cmp(0)>=0);
  const past=completedIntegral(rows,S.lo,T.lo,pastOmega),receiving=T.hi.sub(T.lo).mul(trialOmega),psi=past.value.add(receiving);
  return {psi,left:S.lo,right:T.hi,parts:[{method:'exact completed primitive',leftFace:past.leftFace,rightFace:past.rightFace,value:past.value},{method:'exact receiving trial',left:T.lo,right:T.hi,value:receiving}]};
}
export function known(){
  const q=Q.of,rows=[{t:q(0),omega:q(0),angularPrefix:q(0)}];
  for(const [t,w] of [[1,'.1'],[2,'.2'],[3,'.05']]){const right=q(t),omega=q(w);rows.push({t:right,omega,angularPrefix:prefixFace(rows.at(-1),right,omega)});}
  assert(completedIntegral(rows,q('.5'),q('1.5'),q('.4')).value.cmp('3/20')===0);
  assert(completedIntegral(rows,q('.2'),q('.7'),q('.4')).value.cmp('1/20')===0);
  assert(completedIntegral(rows,q(1),q(1),q('.4')).value.cmp(0)===0);
  const first=rows.slice(0,3),window=angularWindow(first,new G('-.5','-.4'),{lo:q(2),hi:q('2.5')},q('.3'),q('.4'));assert(window.psi.cmp('13/20')===0);
  const grid=[{t:q(0),omega:q(0),angularPrefix:q(0)}];for(const [t,w] of [['1/3','.1'],['2/3','.2']]){const right=q(t),omega=q(w);grid.push({t:right,omega,angularPrefix:prefixFace(grid.at(-1),right,omega)});}
  assert(completedIntegral(grid,q('1/6'),q('1/2'),q('.4')).value.cmp('1/20')===0);
  assert(angularWindow(grid,new G('.5'),{lo:q('2/3'),hi:q(1)},q('.3'),q('.4')).psi.cmp('2/15')===0);
  const initial=grid.slice(0,1);assert(angularWindow(initial,new G(0),{lo:q(0),hi:q(0)},q('.3'),q('.4')).psi.cmp(0)===0);
  assert.throws(()=>completedIntegral(rows,q(0),q(4),q('.4')),/completed/);
  assert.throws(()=>angularWindow(first,new G(1),new G('2','2.5'),q('-.1'),q('.4')));
  return {passed:true,cases:['two partial completed endpoint cells3/20','same completed cell1/20','zero-length closed seam0','negative supplied past plus complete bins/receiving13/20','non-grid two-partial integral1/20 and receiving2/15','zero receiving interval0','uncompleted history and negative density rejected'],lastPrefix:rows.at(-1).angularPrefix.toString()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(known()));

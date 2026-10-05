// Section57 exact geometric speed-square integral; accepted conditional cells only.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
export function incomingWorkSum(Tc,initialSpeedLower,rows){
  Tc=Q.of(Tc);initialSpeedLower=Q.of(initialSpeedLower);assert(initialSpeedLower.cmp(0)>=0&&initialSpeedLower.cmp(1)<0,'strict initial lower speed');
  let time=Tc,lower=initialSpeedLower.mul(initialSpeedLower),minWork=null,first=null;const sums=[];
  for(const row of rows){const left=Q.of(row.left),right=Q.of(row.right),h=Q.of(row.dt),w=G.of(row.work).lo;assert(left.cmp(time)===0&&right.cmp(left)>0&&h.cmp(right.sub(left))===0,'exact contiguous accepted cells');lower=lower.add(h.mul(w));time=right;minWork=minWork===null||w.cmp(minWork)<0?w:minWork;sums.push({t:time.toString(),speedSquaredLower:lower.toString(),workLower:w.toString()});if(first===null&&lower.cmp(1)>0)first={t:time.toString(),speedSquaredLower:lower.toString(),minimumWork:minWork.toString(),transverse:minWork.cmp(0)>0};}
  return {reached:time.toString(),speedSquaredLower:lower.toString(),first,minimumWork:minWork?.toString()??null,sums,scope:'conditional actual incoming identity; external complete actual prefix/root/source/error cylinder admission required; no postevent actual integration'};
}
export function workSumKnown(){
  const row=(left,right,work)=>({left,right,dt:Q.of(right).sub(left).toString(),work:new G(work).out()}),r=incomingWorkSum(0,'.5',[row(0,'.5',2)]);assert(r.first.t==='1/2'&&r.first.speedSquaredLower==='5/4'&&r.first.transverse);
  const n=incomingWorkSum(0,'.5',[row(0,'.1',-1),row('.1','.2',2)]);assert(n.first===null&&n.speedSquaredLower==='7/20');
  let rejected=false;try{incomingWorkSum(0,'.5',[row('.1','.2',2)]);}catch{rejected=true;}assert(rejected);
  return {passed:true,cases:['exact initial1/4 plus work2 overhalf gives5/4','negative work conservative sum7/20','noncontiguous cell rejected']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(workSumKnown()));

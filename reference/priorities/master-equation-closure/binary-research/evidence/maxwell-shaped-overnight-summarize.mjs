import assert from 'node:assert/strict';
import fs from 'node:fs';
import {segment,norm,dot} from './maxwell-shaped-overnight-history-instrument.mjs';
function summarize(knots){
  let phase=0,next=2*Math.PI,maxRadius=0,minRadius=Infinity,positiveRadialSamples=0,negativeRadialSamples=0;
  const returns=[];
  for(let i=0;i<knots.length;i++){
    const q=knots[i],r=norm(q.x),vr=dot(q.x,q.v)/r;
    maxRadius=Math.max(maxRadius,r);minRadius=Math.min(minRadius,r);
    if(vr>1e-12)positiveRadialSamples++;if(vr< -1e-12)negativeRadialSamples++;
    if(i===0)continue;
    const p=knots[i-1],inc=Math.atan2(p.x[0]*q.x[1]-p.x[1]*q.x[0],dot(p.x,q.x)),old=phase;phase+=inc;
    if(phase>=next){
      assert(inc>0&&inc<Math.PI,'unwrapping assumption');
      const s=segment(p,q);let lo=p.t,hi=q.t;
      for(let k=0;k<55&&hi-lo>1e-10;k++){
        const m=(lo+hi)/2,x=s.at(m).x,d=Math.atan2(p.x[0]*x[1]-p.x[1]*x[0],dot(p.x,x));if(old+d<next)lo=m;else hi=m;
      }
      const t=(lo+hi)/2,jet=s.at(t),rr=norm(jet.x),prev=returns.at(-1);
      returns.push({turn:Math.round(next/(2*Math.PI)),t,r:rr,rCubed:rr**3,speed:norm(jet.v),vR:dot(jet.x,jet.v)/rr,
        meanCubicRadiusSlope:prev?(rr**3-prev.rCubed)/(t-prev.t):null});next+=2*Math.PI;
    }
  }
  return {unwrappedAngle:phase,turns:phase/(2*Math.PI),minKnotRadius:minRadius,maxKnotRadius:maxRadius,positiveRadialSamples,negativeRadialSamples,returns};
}
// Known control first: four complete circles of radius two and speed .2.
const control=Array.from({length:65},(_,i)=>{const theta=i*Math.PI/8,t=theta*10;return {t,x:[2*Math.cos(theta),2*Math.sin(theta)],v:[-.2*Math.sin(theta),.2*Math.cos(theta)],a:[-.02*Math.cos(theta),-.02*Math.sin(theta)]};});
const known=summarize(control);assert(known.returns.length===4&&Math.abs(known.turns-4)<1e-12);assert(known.returns.every(q=>Math.abs(q.r-2)<1e-10));
console.log(JSON.stringify({knownControl:'four circles radius2 speed.2',turns:known.turns,returns:known.returns.length,passed:true}));
for(const input of process.argv.slice(2)){
  const record=JSON.parse(fs.readFileSync(input)),result={input,case:record.specification,...summarize(record.knots)};
  const output=input.replace(/\.history\.json$/,'.cycles.json');assert(output!==input&&!fs.existsSync(output),'unique retained cycle output');fs.writeFileSync(output,JSON.stringify(result,null,2));
  console.log(JSON.stringify({...result,returns:result.returns.slice(0,8)}));
}

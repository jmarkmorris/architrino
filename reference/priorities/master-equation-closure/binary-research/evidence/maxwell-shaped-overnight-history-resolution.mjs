// Separate retained-history-grid refinement for the frozen RK4 subject.
import assert from 'node:assert/strict';
import {History,segment,norm,sub} from './maxwell-shaped-overnight-history-instrument.mjs';
export class CoarseSourceHistory extends History {
  constructor(past,launch,stride){super(past,launch);assert(Number.isInteger(stride)&&stride>0);this.stride=stride;this.coarseSegments=[];}
  at(t){
    if(t<=0||this.coarseSegments.length===0||t>this.coarseSegments.at(-1).right.t)return super.at(t);
    let lo=0,hi=this.coarseSegments.length-1;
    while(lo<hi){const m=(lo+hi)>>1;if(this.coarseSegments[m].right.t<t)lo=m+1;else hi=m;}
    return this.coarseSegments[lo].at(t);
  }
  append(knot){
    const stepIndex=this.knots.length;
    let coarse;
    if(stepIndex%this.stride===0){
      coarse=segment(this.knots[stepIndex-this.stride],knot);assert(coarse.speedBound<1,'coarse retained interpolant speed ceiling');
    }
    const fine=super.append(knot);
    if(coarse){this.coarseSegments.push(coarse);this.speedBound=Math.max(this.speedBound,coarse.speedBound);}
    return fine;
  }
}
export function historyResolutionKnownControl(){
  const exact=t=>({t,x:[1+.1*t+.001*t**5,0],v:[.1+.005*t**4,0],a:[.02*t**3,0]});
  const past={speedBound:.1,at:t=>({x:[1+.1*t,0],v:[.1,0],a:[0,0]})};
  const h=new CoarseSourceHistory(past,exact(0),4);
  for(let i=1;i<=20;i++)h.append(exact(i*.1));
  let error=0;for(let i=1;i<200;i++){const t=i*.01,p=h.at(t),q=exact(t);for(const key of ['x','v','a'])error=Math.max(error,norm(sub(p[key],q[key])));}
  assert(h.coarseSegments.length===5&&error<1e-11);
  return {case:'independent fine/coarse grid on exact quintic, stride4',coarseSegments:h.coarseSegments.length,maxJetError:error,passed:true};
}

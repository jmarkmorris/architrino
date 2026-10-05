// Thin same-E prefix application of the already frozen physical-direction/angular kernel.
import assert from 'node:assert/strict';
import {Q,G,add,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {frameClockInputs,frameClockKnown} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {rootBox} from './maxwell-shaped-overnight-directed-defect.mjs';
import {initialSourceWindow} from './maxwell-shaped-overnight-directed-majorant-checked.mjs';
export {initialSourceWindow};
const expand=(a,e)=>a.map(z=>G.of(z).add(new G(Q.of(e).neg(),e))),neg=a=>a.map(z=>G.of(z).neg());
export function tubeCoefficients(history,T,seed,law,rx,rv,px,pv,pa){
  assert(law==='E','this application retains E only');for(const q of [rx,rv,px,pv,pa])assert(Q.of(q).cmp(0)>=0);
  const speed=normUpper(history.box(T,1)).add(rv),clearance=length(history.box(T,0)).lo.sub(rx);assert(speed.cmp(1)<0&&clearance.cmp(0)>0,'unconditional subfield and clearance tube domain before actual-unit kernel');
  const window=initialSourceWindow(T,seed,rx,px);assert(window.lo.cmp(-6)>0&&window.hi.cmp(T.lo)<0,'entire finite old-source initial face bracket');
  const U=expand(history.box(T,1),rv),X=expand(history.box(T,0),rx),width=T.hi.sub(T.lo).mul(4).add('0.00000001').add(Q.of(rx).add(px).mul(10)),S=rootBox(history,T,X,seed,width,px,3);assert(S.lo.cmp(-6)>0);
  const nominalX=history.box(S,0),v=neg(history.box(S,1)),a=neg(history.box(S,2)),j=neg(history.box(S,3)),r=add(X,expand(nominalX,px)),c=frameClockInputs(r,v,a,j,U,pv,pa,law);
  return {...c,S,speed,clearance,initialSourceWindow:window};
}
export function signedClockKnown(){const known=frameClockKnown(),s=frameClockInputs([2,0],[0,0],[0,0],[0,0],[0,0],0,0,'E');assert(s.Cx.cmp('.25')>=0&&s.Cx.cmp('.250000000001')<0&&s.B.cmp('.5')>=0&&s.B.cmp('.500000000001')<0);return {passed:true,cases:['unchanged independently derived angular kernel controls','E stationary Cx1/4 delayedA1/2','strict receiver/clearance domain required before actual-unit kernel'],kernel:known};}
if(process.argv.includes('--known'))console.log(JSON.stringify(signedClockKnown()));

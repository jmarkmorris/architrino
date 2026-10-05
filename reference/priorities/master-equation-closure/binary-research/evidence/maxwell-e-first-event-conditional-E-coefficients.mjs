// E-only receiving-velocity independence under the separately frozen stopping theorem.
// Actual partner/self census is a theorem premise; this adapter does not choose roots.
import assert from 'node:assert/strict';
import {Q,G,add,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {unitFrameField,frameClockKnown} from './maxwell-shaped-overnight-unit-frame-clock-angular.mjs';
import {normUpper,matrixNormUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {rootBox,known as rootFloorKnown} from './maxwell-e-first-event-root-speed-floor.mjs';
import {initialSourceWindow} from './maxwell-shaped-overnight-directed-majorant-checked.mjs';
export {initialSourceWindow};
const expand=(a,e)=>a.map(z=>G.of(z).add(new G(Q.of(e).neg(),e))),neg=a=>a.map(z=>G.of(z).neg());
export function conditionalFrame(r,v,a,j,u,pv,pa){
 for(const e of [pv,pa])assert(Q.of(e).cmp(0)>=0);
 const clock=unitFrameField(r,v,a,j,u,'E',false),offset=unitFrameField(r,expand(v,pv),expand(a,pa),j,u,'E',false);
 return {Cx:matrixNormUpper(clock.AX),Hv:matrixNormUpper(offset.Fv),B:matrixNormUpper(offset.Fa),Cu:Q.of(0),D:offset.D,Dclock:clock.D,R:clock.R,clock,offset};
}
export function tubeCoefficients(history,T,seed,law,rx,rv,px,pv,pa){
 assert(law==='E','conditional stopping theorem is E only');for(const e of [rx,rv,px,pv,pa])assert(Q.of(e).cmp(0)>=0);
 const speed=normUpper(history.box(T,1)).add(rv),clearance=length(history.box(T,0)).lo.sub(rx);assert(clearance.cmp(0)>0,'positive clearance in conditional receiving cylinder');
 const window=initialSourceWindow(T,seed,rx,px);assert(window.lo.cmp(-6)>0&&window.hi.cmp(T.lo)<0,'entire conditional initial source bracket strictly completed');
 const U=expand(history.box(T,1),rv),X=expand(history.box(T,0),rx),width=T.hi.sub(T.lo).mul(4).add('0.00000001').add(Q.of(rx).add(px).mul(10)),S=rootBox(history,T,X,seed,width,px,3);assert(S.lo.cmp(-6)>0&&S.hi.cmp(T.lo)<0);
 const nominalX=history.box(S,0),v=neg(history.box(S,1)),a=neg(history.box(S,2)),j=neg(history.box(S,3)),r=add(X,expand(nominalX,px)),c=conditionalFrame(r,v,a,j,U,pv,pa);
 return {...c,S,speed,clearance,initialSourceWindow:window,receivingDomain:'conditional no-prior-unit-event; unclipped E coefficient family'};
}
export function signedClockKnown(){
 const matrices=['F','AX','Fv','Fa','K'];const tuple=[[2,0],['.2','.1'],['.03','-.04'],['.05','.06']];
 const ref=conditionalFrame(...tuple,[0,0],'.001','.01');for(const u of [[7,-9],[new G(-10,11),new G(-20,30)]]){const z=conditionalFrame(...tuple,u,'.001','.01');for(const side of ['clock','offset'])for(const key of matrices)assert.deepEqual(z[side][key].map(x=>Array.isArray(x)?x.map(v=>v.out()):x.out()),ref[side][key].map(x=>Array.isArray(x)?x.map(v=>v.out()):x.out()),'E response and complete matrices independent receiving U');}
 const s=conditionalFrame([2,0],[0,0],[0,0],[0,0],[7,-9],0,0);assert(s.Cx.cmp('.25')>=0&&s.Cx.cmp('.250000000001')<0&&s.B.cmp('.5')>=0&&s.B.cmp('.500000000001')<0);
 assert.throws(()=>conditionalFrame([2,0],[1,0],[0,0],[0,0],[7,-9],0,0),/positive source clock/);
 return {passed:true,cases:['independently known E receiver-independence of response,AX,Fv,Fa,K over superunit point and full box','stationary Cx1/4 delayedA1/2 without receiver clipping','zero source denominator rejected'],kernel:frameClockKnown(),rootFloor:rootFloorKnown()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(signedClockKnown()));

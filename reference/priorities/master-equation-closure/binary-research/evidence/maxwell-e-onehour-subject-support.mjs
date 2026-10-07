// Prospective separate support instrument. Target use requires frozen theorem/reference admission.
import assert from 'node:assert/strict';
import {Q,G,add,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {receiving} from './maxwell-e-first-event-neutral-radial-receiver-family-v4.mjs';
import {rootBox,unitClockDenominator} from './maxwell-e-first-event-root-speed-floor.mjs';
import {neutralFamily} from './maxwell-e-first-event-neutral-nominal-receiver-coefficients.mjs';
import {conditionalFrame} from './maxwell-e-first-event-conditional-E-coefficients.mjs';
const expand=(a,e)=>a.map(z=>G.of(z).add(new G(Q.of(e).neg(),e)));
const neg=a=>a.map(z=>G.of(z).neg());
export function mirrorUpper(T,rMin,left){T=G.of(T);rMin=Q.of(rMin);left=Q.of(left);assert(rMin.cmp(0)>0,'independently prescribed positive receiving radius');const upper=T.hi.sub(rMin);assert(upper.cmp(left)<0,'actual mirror source upper face strictly completed');return upper;}
export function lowerResidual(history,T,rx,s,px){T=G.of(T);return T.sub(new G(s)).sub(length(add(receiving(history.box(T,0),rx),expand(history.box(new G(s),0),px))));}
export function comparisonBracket(T,seed,rx,px,physicalSupport=null){
 T=G.of(T);let width=T.hi.sub(T.lo).mul(4).add('0.00000001').add(Q.of(rx).add(px).mul(10));if(physicalSupport)for(const face of [physicalSupport.lo,physicalSupport.hi]){const needed=Q.of(face).sub(seed).abs().add('0.00000001');if(needed.cmp(width)>0)width=needed;}return {width,bracket:new G(Q.of(seed).sub(width),Q.of(seed).add(width))};
}
export function clockFamily(history,T,seed,rx,rv,px,pv,pa,physicalSupport=null){
 T=G.of(T);[rx,rv,px,pv,pa]=[rx,rv,px,pv,pa].map(Q.of);assert([rx,rv,px,pv,pa].every(z=>z.cmp(0)>=0));
 const clearance=length(history.box(T,0)).lo.sub(rx);assert(clearance.cmp(0)>0);
 const {width,bracket}=comparisonBracket(T,seed,rx,px,physicalSupport);assert(bracket.lo.cmp(-6)>0,'prescribed nominal comparison support past face');
 const X=receiving(history.box(T,0),rx),U=expand(history.box(T,1),rv),gap=s=>T.sub(new G(s)).sub(length(add(X,expand(history.box(new G(s),0),px)))),leftGap=gap(bracket.lo),rightGap=gap(bracket.hi),initialRay=add(X,expand(history.box(bracket,0),px)),initialClock=unitClockDenominator(initialRay,history.box(bracket,1)),bracketCertificate={J:bracket.out(),leftGap:leftGap.out(),rightGap:rightGap.out(),range:initialClock.R.out(),Dclock:initialClock.D.out()};
 assert(leftGap.lo.cmp(0)>0&&rightGap.hi.cmp(0)<0,'complete nominal bracket face signs');assert(initialClock.D.lo.cmp(0)>0,'complete initial nominal denominator');const S=rootBox(history,T,X,seed,width,px,3),r=add(X,expand(history.box(S,0),px));
 const c=neutralFamily(r,neg(history.box(S,1)),neg(history.box(S,2)),neg(history.box(S,3)),U,pv,pa);
 assert(c.R.lo.cmp(0)>0&&c.D.lo.cmp(0)>0&&c.Dclock.lo.cmp(0)>0,'complete nominal and offset chart');
 return {...c,S,speed:normUpper(history.box(T,1)).add(rv),clearance,initialSourceWindow:bracket,clockBracket:bracket,bracketCertificate};
}
export function physicalFamily(history,T,certified,rx,rv,px,pv,pa){
 T=G.of(T);const S=certified.S,X=receiving(history.box(T,0),rx),U=expand(history.box(T,1),rv),r=add(X,expand(history.box(S,0),px)),c=conditionalFrame(r,neg(history.box(S,1)),neg(history.box(S,2)),neg(history.box(S,3)),U,pv,pa);
 assert(c.R.lo.cmp(0)>0&&c.D.lo.cmp(0)>0&&c.Dclock.lo.cmp(0)>0,'complete physical E comparison chart');
 return {...c,S,initialSourceWindow:certified.initialSourceWindow};
}
export function known(){
 assert(mirrorUpper(new G(5,'51/10'),2,5).cmp('31/10')===0);
 assert.throws(()=>mirrorUpper(new G(5,7),2,5),/strictly completed/);
 assert.throws(()=>mirrorUpper(new G(5),0,5),/positive receiving/);
 const h={box:(_t,n)=>[new G(n===0?2:0),new G(0)]};
 const l=lowerResidual(h,new G(4),'1/10',-1,0);assert(l.lo.cmp('9/10')<=0&&l.hi.cmp('11/10')>=0&&l.lo.cmp(0)>0);
 const c=clockFamily(h,new G(4),0,'1/10',0,0,0,0);assert(c.S.lo.cmp('-1/10')<=0&&c.S.hi.cmp('1/10')>=0&&c.S.hi.sub(c.S.lo).cmp('.200000000001')<0);
 const e=physicalFamily(h,new G(4),c,'1/10',7,0,0,0);assert(e.B.cmp('10/39')>=0&&e.B.cmp('27/100')<0);
 // The prescribed comparison bracket can cross a completed-history boundary while its roots stay causal.
 const across=clockFamily(h,new G(4),0,'1/10',0,'2/5',0,0);assert(across.clockBracket.hi.cmp(4)>0&&across.S.hi.cmp(4)<0);
 const later=clockFamily(h,new G('100.1'), '96.1',0,0,'3.95',0,0,new G(96,'98.1'));assert(later.S.hi.cmp('100.05')>=0&&later.S.hi.cmp(100)>0&&later.R.lo.cmp(0)>0&&later.D.lo.cmp(1)===0);assert(lowerResidual(h,new G(4),0,1,0).hi.cmp(0)<0);
 return {passed:true,cases:['exact mirror upper31/10; equality and nonpositive radius rejected','stationary exact lower residual[9/10,11/10]','stationary translated family[-1/10,1/10]','physical E acceleration-column exact range includes10/39','prescribed search bracket crosses receiver face while certified roots remain causal','nominal translated root100.05 exceeds completed cursor100; actual root96.1 remains inP[96,98.1]','failed physical lower residual negative rejected by comparison' ],scope:'method controls only; original target not invoked'};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(known(),null,2));

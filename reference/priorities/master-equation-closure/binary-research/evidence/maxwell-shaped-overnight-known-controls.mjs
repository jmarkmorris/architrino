import assert from 'node:assert/strict';
import {History,knownControls,step,diagnostic,norm,sub} from './maxwell-shaped-overnight-history-instrument.mjs';

// Recorded analytical controls precede all binary targets in this file.
const algebra=knownControls();
const a0=-.25,delta=.1;
// Cutoff H(u)=10u^3-15u^4+6u^5 with u=(S+delta)/delta.
// For S<=-delta the complete supplied mirror histories are held at +/-1.
const past={speedBound:.1,at:S=>{
  if(S<=-delta)return {x:[1,0],v:[0,0],a:[0,0]};
  const u=(S+delta)/delta,H=10*u**3-15*u**4+6*u**5,Hp=(30*u*u-60*u**3+30*u**4)/delta,Hpp=(60*u-180*u*u+120*u**3)/delta**2;
  return {x:[1+a0*S*S*H/2,0],v:[a0*(S*H+S*S*Hp/2),0],a:[a0*(H+2*S*Hp+S*S*Hpp/2),0]};
}};
// For 0<=T<=.5 roots sample S<-.1, so exact equation is y''=-1/y^2,
// y=q+1, y(0)=2,y'(0)=0. Multiplication by y' gives
// y'^2=2(1/y-1/2); elementary integration gives the time(y) below.
const timeOfY=y=>2*(Math.acos(Math.sqrt(y/2))+Math.sqrt((y/2)*(1-y/2)));
let lo=1,hi=2;for(let k=0;k<80;k++){const m=(lo+hi)/2;if(timeOfY(m)>.5)lo=m;else hi=m;}
const y=(lo+hi)/2,reference={x:[y-1,0],v:[-Math.sqrt(2*(1/y-.5)),0]};
const refinements=[];
for(const h of [.025,.0125,.00625]){
  const history=new History(past,{t:0,x:[1,0],v:[0,0],a:[a0,0]});
  const initial=diagnostic(history,history.knots[0],'E');assert(initial.equationDefect<1e-14);
  for(let k=0;k<Math.round(.5/h);k++)step(history,'E',h);
  const last=history.knots.at(-1),d=diagnostic(history,last,'E'),error={position:norm(sub(last.x,reference.x)),velocity:norm(sub(last.v,reference.v))};
  assert(d.S<-.1&&error.position<1e-8&&error.velocity<1e-8);
  refinements.push({h,error,final:d});
}
console.log(JSON.stringify({knownControls:algebra,firstWindowAnalyticalReference:{equation:'y second derivative = -1/y^2; y(0)=2; y prime(0)=0',time:.5,...reference},refinements,passed:true},null,2));

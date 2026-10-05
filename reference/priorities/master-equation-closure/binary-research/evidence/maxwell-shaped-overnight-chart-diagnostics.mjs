// Frozen-subject chart diagnostics; no edits to the subject response/history.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {History,geometry,norm,dot} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-preparation.mjs';
function neutralGain(g,u){
  const vt=g.n[0]*g.v[1]-g.n[1]*g.v[0],ut=g.n[0]*u[1]-g.n[1]*u[0],Dr=1-dot(g.n,u);
  const E=Math.hypot(g.D,vt)/(g.R*g.D**3),full=E*Math.hypot(Dr,ut);
  return {E,full,Dr,sourceTransverseVelocity:vt,receiverTransverseVelocity:ut};
}
// At n=(1,0),v=0,R=2: B_E maps (a_x,a_y) to (0,-a_y/2).
// L_u maps that image to (-.3*a_y/2,-.8*a_y/2).
const known=neutralGain({n:[1,0],v:[0,0],D:1,R:2},[.2,.3]);
assert(known.E===.5&&Math.abs(known.full-Math.hypot(.15,.4))<1e-15);
console.log(JSON.stringify({knownControl:'rank-one delayed-acceleration matrix at stationary source',...known,passed:true}));
for(const input of process.argv.slice(2)){
  const saved=JSON.parse(fs.readFileSync(input)),s=saved.specification,law=s.equation.includes('E+M')?'full':'E';
  assert(!s.family,'this diagnostic freezes original preparation family only');
  const prep=preparation(s.beta,law),history=new History(prep.past,saved.knots[0]);
  for(const knot of saved.knots.slice(1))history.append(knot);
  let maxGain=0,maxGainTime=0,maxDelayedA=0,minD=Infinity,minR=Infinity,minDelay=Infinity,maxSourceJerkBound=0,maxSpeed=0;
  for(const seg of history.segments){
    const h=seg.right.t-seg.left.t;
    const controls=Array.from({length:3},(_,j)=>seg.coeff.map(c=>{
      if(j===0)return 6*c[3]/h**3;
      if(j===1)return (6*c[3]+12*c[4])/h**3;
      return (6*c[3]+24*c[4]+60*c[5])/h**3;
    }));maxSourceJerkBound=Math.max(maxSourceJerkBound,...controls.map(norm));
  }
  const stride=10,rows=[];
  for(let i=0;i<saved.knots.length;i+=stride){
    const q=saved.knots[i],g=geometry(history,q.x,q.t),gain=neutralGain(g,q.v);
    if(gain[law]>maxGain){maxGain=gain[law];maxGainTime=q.t;}
    maxDelayedA=Math.max(maxDelayedA,norm(g.a));minD=Math.min(minD,g.D);minR=Math.min(minR,g.R);minDelay=Math.min(minDelay,q.t-g.S);maxSpeed=Math.max(maxSpeed,norm(q.v));
    rows.push({t:q.t,...gain,R:g.R,D:g.D,sourceAccelerationNorm:norm(g.a)});
  }
  const result={input,frozenCase:s,sampling:'every tenth integration knot; not a whole-interval root enclosure',maxGain,maxGainTime,maxDelayedA,minD,minR,minDelay,maxSpeed,
    completeInterpolantSpeedBound:history.speedBound,maxFutureJerkBernsteinBound:maxSourceJerkBound,pastJerkConservativeBound:s.beta*s.omega**2+9*norm(s.da)/s.delta,
    sourceAccelerationMatrix:'B_E=-(D P+v_perp n transpose)/(R D^3); full=L_u B_E',rows,scope:'measured chart and polynomial diagnostics, not a continuous error tube'};
  const out=input.replace(/\.history\.json$/,'.chart.json');assert(out!==input&&!fs.existsSync(out));fs.writeFileSync(out,JSON.stringify(result,null,2));
  console.log(JSON.stringify({...result,rows:undefined}));
}

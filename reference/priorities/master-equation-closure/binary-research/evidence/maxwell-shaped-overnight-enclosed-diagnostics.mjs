// Polar diagnostics from independently assessed whole-bin Euclidean error tubes.
// The comparison history is not itself identified with the exact launched solution.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,dot,length,pi,knownGrid} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';

const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const extend=(x,e)=>G.of(x).add(new G(Q.of(e).neg(),e));
const max=(a,b)=>Q.of(a).cmp(b)>0?Q.of(a):Q.of(b);
const det=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));

export function polar(q,u,p,v){
  p=Q.of(p);v=Q.of(v);assert(p.cmp(0)>=0&&v.cmp(0)>=0);
  const rc=length(q),wc=length(u),r=new G(rc.lo.sub(p),rc.hi.add(p));
  assert(r.lo.cmp(0)>0,'positive actual radius required');
  const speed=new G(max(0,wc.lo.sub(v)),wc.hi.add(v));
  const eta=rc.hi.mul(v).add(wc.hi.mul(p)).add(p.mul(v));
  const radialNumerator=extend(dot(q,u),eta),tangentNumerator=extend(det(q,u),eta);
  return {r,speed,radial:radialNumerator.div(r),tangent:tangentNumerator.div(r),
          angularRate:tangentNumerator.div(r.sq()),eta,tangentNumerator};
}

function smallAtan(x){
  x=Q.of(x);assert(x.abs().cmp('.5')<=0);let term=x,sum=x;
  for(let k=1;k<=80;k++){term=term.mul(x).mul(x);sum=k%2?sum.sub(term.div(2*k+1)):sum.add(term.div(2*k+1));}
  const rem=term.mul(x).mul(x).abs().div(163);
  return new G(sum.sub(rem),sum.add(rem));
}
function atanPoint(x){
  x=Q.of(x);if(x.cmp(0)<0)return atanPoint(x.neg()).neg();
  if(x.cmp(2)>0)return pi().div(2).sub(atanPoint(new Q(1n).div(x)));
  if(x.cmp('.5')>0)return pi().div(4).add(smallAtan(x.sub(1).div(x.add(1))));
  return smallAtan(x);
}
const atan=x=>new G(atanPoint(G.of(x).lo).lo,atanPoint(G.of(x).hi).hi);
export function quadrantAngle(q){
  const [x,y]=q.map(G.of);
  if(x.lo.cmp(0)>0)return atan(y.div(x));
  assert(x.hi.cmp(0)<0,'angle box crosses vertical axis');
  if(y.lo.cmp(0)>0)return pi().sub(atan(y.div(x.neg())));
  assert(y.hi.cmp(0)<0,'angle box crosses negative axis');
  return pi().neg().add(atan(y.neg().div(x.neg())));
}

function binding(tube,bytes,spec){
  assert(tube.firstFailure===null,'only complete no-failure tube admitted');
  assert(tube.inputSHA===digest(bytes),'tube/reference byte binding');
  assert(tube.law===(spec.equation.includes('E+M')?'full':'E'),'tube/reference equation binding');
}
const contains=(x,y)=>{assert(x.lo.cmp(y)<=0&&x.hi.cmp(y)>=0);};
export function known(){
  const grid=knownGrid(),p=polar([3,4],['-.8','.6'],0,0);
  contains(p.r,5);contains(p.speed,1);contains(p.radial,0);contains(p.tangent,1);contains(p.angularRate,'.2');
  const negative=polar([3,4],['.8','-.6'],0,0);contains(negative.tangent,-1);
  const changed=polar([3,4],['-.8','.6'],'.01','.01'),actual=polar(['3.01',4],['-.8','.61'],0,0);
  for(const key of ['r','speed','radial','tangent','angularRate']){
    assert(changed[key].lo.cmp(actual[key].lo)<=0&&changed[key].hi.cmp(actual[key].hi)>=0);
  }
  contains(changed.eta instanceof Q?new G(changed.eta):changed.eta,'.0601');
  for(const [q,m] of [[[1,1],1],[[-1,1],3],[[-1,-1],-3],[[1,-1],-1]]){
    const a=quadrantAngle(q),expected=pi().mul(m).div(4);assert(a.lo.cmp(expected.hi)<=0&&a.hi.cmp(expected.lo)>=0);
  }
  assert(digest(Buffer.from('abc'))==='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const t={firstFailure:null,inputSHA:digest(Buffer.from('abc')),law:'E'};
  binding(t,Buffer.from('abc'),{equation:'Sections 7 E'});
  assert.throws(()=>binding(t,Buffer.from('abd'),{equation:'Sections 7 E'}));
  assert.throws(()=>binding(t,Buffer.from('abc'),{equation:'Sections 8 E+M'}));
  return {passed:true,grid,cases:['3-4-5 polar geometry','signed tangent','nonzero known Euclidean perturbation',
    'four exact arctangent quadrants','known SHA abc and wrong-input/law rejection']};
}

if(process.argv[1]?.endsWith('maxwell-shaped-overnight-enclosed-diagnostics.mjs')){
  const args=Object.fromEntries(process.argv.slice(2).filter((x,j)=>j%2===0).map((x,j)=>[x.slice(2),process.argv[3+2*j]]));
  const controls=known();console.log(JSON.stringify({known:controls,targetReads:0}));
  if(args.tube){
    assert(args.out&&!fs.existsSync(args.out),'new output required');
    const tubeBytes=fs.readFileSync(args.tube),tube=JSON.parse(tubeBytes),bytes=fs.readFileSync(tube.input),j=JSON.parse(bytes);
    binding(tube,bytes,j.specification);
    const history=new ExactReferenceHistory(j.knots,j.specification),rowBytes=fs.readFileSync(args.tube+'.jsonl'),
      rows=rowBytes.toString().trim().split('\n').map(JSON.parse),horizon=Q.of(tube.horizon),dt=Q.of(tube.dt);
    assert(rows.length===tube.bins);let prior=Q.of(0),minTangent=null,minYAfterFirst=null,firstX=null;
    for(let k=0;k<rows.length;k++){
      const row=rows[k],right=Q.of(row.t);assert(right.cmp(prior)>0&&right.sub(prior).cmp(dt)<=0);
      const T=new G(prior,right),q=history.box(T,0),u=history.box(T,1),a=polar(q,u,row.x,row.v);
      if(minTangent===null||a.tangent.lo.cmp(minTangent)<0)minTangent=a.tangent.lo;
      if(k===0)firstX=q[0].lo.sub(row.x);
      else {const y=q[1].lo.sub(row.x);if(minYAfterFirst===null||y.cmp(minYAfterFirst)<0)minYAfterFirst=y;}
      prior=right;
    }
    assert(prior.cmp(horizon)===0,'entire receiving partition required');
    const final=rows.at(-1),q=history.box(new G(horizon),0),u=history.box(new G(horizon),1),p=polar(q,u,final.x,final.v),
      qActual=q.map(z=>extend(z,final.x)),phaseBranch=minTangent.cmp(0)>0&&firstX.cmp(0)>0&&minYAfterFirst.cmp(0)>0;
    const result={knownFirst:controls,tube:args.tube,tubeSHA:digest(tubeBytes),rowsSHA:digest(rowBytes),
      input:tube.input,inputSHA:digest(bytes),law:tube.law,horizon:horizon.toString(),bins:rows.length,
      radius:p.r.out(),separation:p.r.mul(2).out(),speed:p.speed.out(),radialVelocity:p.radial.out(),
      tangentialVelocity:p.tangent.out(),angularRate:p.angularRate.out(),
      phaseRadians:phaseBranch?quadrantAngle(qActual).out():null,
      phaseBranchProof:{increasing:minTangent.cmp(0)>0,minTangentialVelocity:minTangent.toString(),
        firstBinXLower:firstX.toString(),laterYLower:minYAfterFirst.toString(),branchZeroToPi:phaseBranch},
      contractionBelowInitial:p.r.hi.cmp('25/9')<0,
      actualFinalBin:{S:final.S,range:final.R,D:final.D},
      grade:'derived diagnostic corollary of independently accepted exact original tube; not binding or terminal fate'};
    fs.writeFileSync(args.out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
  }
}

// Polar diagnostics from independently assessed whole-bin Euclidean error tubes.
// The comparison history is not itself identified with the exact launched solution.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,dot,length,pi,knownGrid} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {jetBox} from './maxwell-shaped-overnight-exact-interval.mjs';

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

// The scientific receiver interval fixes its polynomial pieces before grid inflation.
// An outward arithmetic face is never admitted as a new scientific/source endpoint.
export function receiverBox(history,left,right,n){
  left=Q.of(left);right=Q.of(right);
  assert(left.cmp(0)>=0&&right.cmp(left)>=0&&right.cmp(history.knots.at(-1).t)<=0);
  let out=null,j=history.index(left);
  for(;j<history.knots.length-1;j++){
    const a=max(left,history.knots[j].t),last=Q.of(history.knots[j+1].t),b=right.cmp(last)<0?right:last;
    if(a.cmp(b)>0)break;
    const T=new G(a,b),z=jetBox(history.segment(j),T.lo,T.hi,n).map(G.of);
    out=out?out.map((x,k)=>new G(x.lo.cmp(z[k].lo)<0?x.lo:z[k].lo,x.hi.cmp(z[k].hi)>0?x.hi:z[k].hi)):z;
    if(last.cmp(right)>=0)break;
  }
  assert(out,'complete exact receiving support');return out;
}

export function unwrapPhase(integral,principal){
  integral=G.of(integral);principal=G.of(principal);const p=pi(),period=p.mul(2);
  assert(principal.lo.cmp(p.hi.neg())>=0&&principal.hi.cmp(p.hi)<=0,'principal angle required');
  const bound=integral.absUpper().add(p.hi).div(period.lo),K=(bound.n+bound.d-1n)/bound.d+1n;
  assert(K<=100000n,'declared bounded winding enumeration exceeded');const candidates=[];
  for(let k=-K;k<=K;k++){
    const shifted=principal.add(period.mul(new Q(k))),lo=max(integral.lo,shifted.lo),hi=integral.hi.cmp(shifted.hi)<0?integral.hi:shifted.hi;
    if(lo.cmp(hi)<=0)candidates.push({winding:k.toString(),phase:new G(lo,hi).out()});
  }
  assert(candidates.length,'phase integration and endpoint inconsistent');
  return {integratedPhase:integral.out(),principalPhase:principal.out(),candidates,uniqueWinding:candidates.length===1,
    phase:candidates.length===1?candidates[0].phase:integral.out()};
}

function binding(tube,bytes,spec){
  assert(tube.firstFailure===null,'only complete no-failure tube admitted');
  assert(!tube.completedPrefix,'whole-launch receipt required; partial continuation must first be stitched and assessed');
  assert(tube.inputSHA===digest(bytes),'tube/reference byte binding');
  assert(tube.law===(spec.equation.includes('E+M')?'full':'E'),'tube/reference equation binding');
}
function sourceAccelerationNorm(history,S,error){
  const norm=length(history.box(S,2));return new G(max(0,norm.lo.sub(error)),norm.hi.add(error));
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
  assert.throws(()=>binding({...t,completedPrefix:{face:'38'}},Buffer.from('abc'),{equation:'Sections 7 E'}));
  const source=sourceAccelerationNorm({box:()=>[new G(0),new G('.25')]},new G(-2),Q.of('.01'));
  contains(source,'.24');contains(source,'.26');
  const ppi=pi(),positive=unwrapPhase(ppi.mul(9).div(4),ppi.div(4)),negativeWinding=unwrapPhase(ppi.mul(-7).div(4),ppi.div(4));
  assert(positive.uniqueWinding&&positive.candidates[0].winding==='1');
  assert(negativeWinding.uniqueWinding&&negativeWinding.candidates[0].winding==='-1');
  const ambiguous=unwrapPhase(new G(0,ppi.hi.mul(4)),new G(0));assert(!ambiguous.uniqueWinding&&ambiguous.candidates.length>=3);
  assert.throws(()=>unwrapPhase(new G(1,2),new G(0)),/inconsistent/);
  const end=new Q(1n,3n),nonGrid=new ExactReferenceHistory([
    {t:0,x:[1,0],v:[0,0],a:[2,0]},{t:end,x:[new Q(10n,9n),0],v:[new Q(2n,3n),0],a:[2,0]}],
    {r:1,omega:0,delta:'.1'});
  contains(receiverBox(nonGrid,end,end,0)[0],new Q(10n,9n));contains(receiverBox(nonGrid,0,end,1)[0],new Q(2n,3n));
  return {passed:true,grid,cases:['3-4-5 polar geometry','signed tangent','nonzero known Euclidean perturbation',
    'four exact arctangent quadrants','known SHA abc and wrong-input/law/partial-continuation rejection',
    'known source acceleration norm with nonzero source error','positive/negative exact winding and ambiguous winding',
    'inconsistent phase rejection','exact non-grid receiving endpoint with outward arithmetic extension']};
}

if(process.argv[1]?.endsWith('maxwell-shaped-overnight-enclosed-diagnostics-v3.mjs')){
  const args=Object.fromEntries(process.argv.slice(2).filter((x,j)=>j%2===0).map((x,j)=>[x.slice(2),process.argv[3+2*j]]));
  const controls=known(),producerSHA=digest(fs.readFileSync(process.argv[1]));console.log(JSON.stringify({known:controls,producerSHA,targetReads:0}));
  if(args.tube){
    assert(args.out&&!fs.existsSync(args.out),'new output required');
    const tubeBytes=fs.readFileSync(args.tube),tube=JSON.parse(tubeBytes),bytes=fs.readFileSync(tube.input),j=JSON.parse(bytes);
    binding(tube,bytes,j.specification);
    const history=new ExactReferenceHistory(j.knots,j.specification),rowBytes=fs.readFileSync(args.tube+'.jsonl'),
      rows=rowBytes.toString().trim().split('\n').map(JSON.parse),horizon=Q.of(tube.horizon);
    assert(rows.length===tube.bins);let prior=Q.of(0),minTangent=null,minYAfterFirst=null,firstX=null,phaseIntegral=new G(0);
    for(let k=0;k<rows.length;k++){
      const row=rows[k],right=Q.of(row.t);assert(right.cmp(prior)>0,'strict exact receiving endpoint order');
      const q=receiverBox(history,prior,right,0),u=receiverBox(history,prior,right,1),a=polar(q,u,row.x,row.v);
      phaseIntegral=phaseIntegral.add(a.angularRate.mul(right.sub(prior)));
      if(minTangent===null||a.tangent.lo.cmp(minTangent)<0)minTangent=a.tangent.lo;
      if(k===0)firstX=q[0].lo.sub(row.x);
      else {const y=q[1].lo.sub(row.x);if(minYAfterFirst===null||y.cmp(minYAfterFirst)<0)minYAfterFirst=y;}
      prior=right;
    }
    assert(prior.cmp(horizon)===0,'entire receiving partition required');
    const final=rows.at(-1),q=receiverBox(history,horizon,horizon,0),u=receiverBox(history,horizon,horizon,1),p=polar(q,u,final.x,final.v),
      qActual=q.map(z=>extend(z,final.x)),phaseBranch=minTangent.cmp(0)>0&&firstX.cmp(0)>0&&minYAfterFirst.cmp(0)>0;
    const phase=unwrapPhase(phaseIntegral,quadrantAngle(qActual));
    const sourceS=new G(final.S.lo,final.S.hi);
    assert(sourceS.lo.cmp(-6)>0&&sourceS.hi.cmp(horizon)<0,'certified completed relevant source support');
    const sourceAError=max(tube.final.prefixA,tube.pastMismatch[2]),sourceANorm=sourceAccelerationNorm(history,sourceS,sourceAError),
      delay=new G(horizon).sub(sourceS),range=new G(final.R.lo,final.R.hi),
      rootRange=new G(max(delay.lo,range.lo),delay.hi.cmp(range.hi)<0?delay.hi:range.hi);
    const result={knownFirst:controls,producerSHA,tube:args.tube,tubeSHA:digest(tubeBytes),rowsSHA:digest(rowBytes),
      input:tube.input,inputSHA:digest(bytes),law:tube.law,horizon:horizon.toString(),bins:rows.length,declaredReceivingWidth:tube.dt,
      radius:p.r.out(),separation:p.r.mul(2).out(),speed:p.speed.out(),radialVelocity:p.radial.out(),
      tangentialVelocity:p.tangent.out(),angularRate:p.angularRate.out(),
      phaseRadians:phase.phase,phaseUnwrapping:phase,
      phaseBranchProof:{increasing:minTangent.cmp(0)>0,minTangentialVelocity:minTangent.toString(),
        firstBinXLower:firstX.toString(),laterYLower:minYAfterFirst.toString(),branchZeroToPi:phaseBranch},
      contractionBelowInitial:p.r.hi.cmp('25/9')<0,
      actualFinalBin:{S:final.S,range:final.R,D:final.D},
      actualEndpoint:{delayAndRange:rootRange.out(),S:new G(horizon).sub(rootRange).out(),
        delayedSourceAccelerationNorm:sourceANorm.out(),sourceAccelerationError:sourceAError.toString(),
        sourceAccelerationInventory:'global accepted whole-prefix error plus supplied-past mismatch; complete final-bin S box'},
      grade:'derived diagnostic corollary of independently accepted exact original tube; not binding or terminal fate'};
    fs.writeFileSync(args.out,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
  }
}

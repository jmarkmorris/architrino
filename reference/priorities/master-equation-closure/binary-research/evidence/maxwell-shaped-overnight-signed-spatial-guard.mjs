// Contract-checking successor; frozen signed algebra/propagator source unchanged.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {signedNormStep,midpointGenerator,knownSignedSpatial} from './maxwell-shaped-overnight-signed-spatial-transport.mjs';
export function guardedSignedStep(p){
  assert(p.B.length===4&&p.B.every(r=>r.length===4));
  for(let i=0;i<2;i++)for(let j=0;j<4;j++)assert(Q.of(p.B[i][j]).cmp(j===i+2?1:0)===0,'exact derivative-compatible top generator blocks');
  for(const z of [p.h,p.initial.x,p.initial.v,p.proposed.x,p.proposed.v,p.sourcePosition,p.sourceVelocity,p.sourceAcceleration,p.Lv,p.La,p.defect])assert(Q.of(z).cmp(0)>=0,'nonnegative norm/forcing inputs');
  return signedNormStep(p);
}
export function knownSignedGuard(){
  const zero=[[new G(0),new G(0)],[new G(0),new G(0)]],B=midpointGenerator(zero,zero),p={AX:zero,K:zero,B,h:'.1',initial:{x:Q.of('.2'),v:Q.of('.3')},proposed:{x:Q.of('.25'),v:Q.of('.35')},sourcePosition:0,sourceVelocity:0,sourceAcceleration:0,Lv:0,La:0,defect:'.4'};
  assert(guardedSignedStep(p).passed);
  const bad=B.map(r=>r.slice());bad[0][0]=Q.of(1);assert.throws(()=>guardedSignedStep({...p,B:bad}),/top generator/);
  assert.throws(()=>guardedSignedStep({...p,sourceAcceleration:'-.01'}),/nonnegative/);
  assert.throws(()=>guardedSignedStep({...p,initial:{x:Q.of('-.2'),v:Q.of('.3')}}),/nonnegative/);
  return {passed:true,predecessor:knownSignedSpatial(),cases:['correct top derivative-compatible generator','wrong top generator rejected','negative delayed-A budget rejected','negative initial norm rejected']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(knownSignedGuard(),null,2));

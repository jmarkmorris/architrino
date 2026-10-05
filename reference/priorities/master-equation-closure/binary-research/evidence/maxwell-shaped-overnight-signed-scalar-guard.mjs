// Caller MUST bind the actual selected E/full Maxwell response and its
// independently derived Fu=0/skew identity. Box overlap cannot prove skew.
// Frozen predecessor remains arithmetic only; no arbitrary-K cancellation.
import assert from 'node:assert/strict';
import {G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {signedScalarStep,knownSignedScalar} from './maxwell-shaped-overnight-signed-scalar-step.mjs';
export function maxwellSignedScalarStep(law,p){
  assert(['E','full'].includes(law),'selected E/full receiver velocity identity required');
  const K=p.K.map(r=>r.map(G.of));
  const containsZero=z=>z.lo.cmp(0)<=0&&z.hi.cmp(0)>=0;
  assert(K.length===2&&K.every(r=>r.length===2));
  if(law==='E')assert(K.flat().every(containsZero),'E zero derivative must be enclosed');
  else assert(containsZero(K[0][0])&&containsZero(K[1][1])&&containsZero(K[0][1].add(K[1][0])),'full skew identity must be enclosed');
  // These necessary enclosure checks do not certify an arbitrary actual K.
  // The caller's exact selected-response Fu identity is a separate premise.
  return signedScalarStep(p);
}
export function knownSignedScalarGuard(){
  const zero=[[new G(0),new G(0)],[new G(0),new G(0)]],K=[[new G(0),new G(-1)],[new G(1),new G(0)]],p={AX:zero,K,h:'.1',initial:{x:'.2',v:'.3'},proposed:{x:'.25',v:'.35'},px:0,pv:0,pa:0,Lv:0,La:0,defect:'.4'};
  assert(maxwellSignedScalarStep('full',p).passed);assert(maxwellSignedScalarStep('E',{...p,K:zero}).passed);
  assert.throws(()=>maxwellSignedScalarStep('arbitrary',p),/identity required/);assert.throws(()=>maxwellSignedScalarStep('E',p),/zero derivative/);assert.throws(()=>maxwellSignedScalarStep('full',{...p,K:[[new G(1),new G(0)],[new G(0),new G(1)]]}),/skew identity/);
  return {passed:true,predecessor:knownSignedScalar(),cases:['selected full skew identity','selected E zero identity','arbitrary derivative law rejected','incompatible E/full derivative boxes rejected'],callerPremise:'exact selected-response identity, not inferred from interval box overlap'};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(knownSignedScalarGuard(),null,2));

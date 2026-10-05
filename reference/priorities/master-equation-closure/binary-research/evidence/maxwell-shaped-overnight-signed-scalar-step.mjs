// Signed-clock scalar norm consequence with complete delayed sourceA retained.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {matrixNormUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {positiveDirected,directedMajorantKnown} from './maxwell-shaped-overnight-directed-majorant.mjs';
export function signedScalarStep({AX,K,h,initial,proposed,px,pv,pa,Lv,La,defect}){
  for(const M of [AX,K])assert(M.length===2&&M.every(r=>r.length===2));
  for(const z of [h,initial.x,initial.v,proposed.x,proposed.v,px,pv,pa,Lv,La,defect])assert(Q.of(z).cmp(0)>=0,'nonnegative norm/forcing budgets');
  h=Q.of(h);assert(h.cmp(0)>0);const C=matrixNormUpper(AX),Ku=matrixNormUpper(K),c=C.mul(px).add(Q.of(Lv).mul(pv)).add(Q.of(La).mul(pa)).add(defect),raw=positiveDirected(Q.of(initial.x),Q.of(initial.v),C,Q.of(0),c,h),next={x:new G(raw.x).hi,v:new G(raw.v).hi},acceleration=C.mul(proposed.x).add(Ku.mul(proposed.v)).add(c);
  return {C,Ku,c,next,acceleration,passed:next.x.cmp(proposed.x)<0&&next.v.cmp(proposed.v)<0};
}
export function knownSignedScalar(){
  const AX=[[new G(0),new G(0)],[new G(0),new G(0)]],K=[[new G(0),new G(-1)],[new G(1),new G(0)]],p={AX,K,h:'.1',initial:{x:'.2',v:'.3'},proposed:{x:'.25',v:'.35'},px:'.01',pv:'.02',pa:'.03',Lv:2,La:3,defect:'.27'},s=signedScalarStep(p);assert(s.passed&&s.next.x.cmp('.234')>=0&&s.next.x.cmp('.234000000001')<0&&s.next.v.cmp('.34')>=0&&s.next.v.cmp('.340000000001')<0);assert(s.acceleration.cmp('.75')>=0&&s.acceleration.cmp('.75000000001')<0,'receiving skew still retained in sourceA inventory');
  assert.throws(()=>signedScalarStep({...p,pa:'-.03'}),/nonnegative/);const rejected=signedScalarStep({...p,proposed:{x:'.23',v:'.33'}});assert(!rejected.passed);
  return {passed:true,cases:['zero spatial coefficient with exact sourceV/sourceA/defect forcing','skew absent from velocity norm but retained in acceleration inventory','negative sourceA budget rejected','failed whole-cell envelope rejected'],majorant:directedMajorantKnown()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(knownSignedScalar(),null,2));

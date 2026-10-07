import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {mirrorUpper,lowerResidual,clockFamily,physicalFamily} from './maxwell-e-onehour-subject-support.mjs';
import {neutralFrame} from './maxwell-e-first-event-neutral-nominal-receiver-coefficients.mjs';
const contains=(z,x)=>assert(z.lo.cmp(x)<=0&&z.hi.cmp(x)>=0,`missing exact ${x}`);
const cases=[];
// The independent exact answer is established first: stationary +/-1/5 has delay2/5.
const stationary={box:(_T,n)=>[new G(n===0?'1/5':0),new G(0)]};
const point=clockFamily(stationary,new G('41/100'),'1/100',0,0,0,0,0);
contains(point.S,'1/100');assert(point.S.hi.sub(point.S.lo).cmp('1/1000000000')<0);
cases.push({name:'known stationary unique root1/100 before adversarial families',passed:true,S:point.S.out()});
// Same geometry as subject theorem Section7, scaled to fit unchanged nominal lower cutoff-6.
const physical=new G(0,'21/100');
assert(mirrorUpper(new G('41/100'),'1/5','2/5').cmp('21/100')===0);
const actualLower=lowerResidual(stationary,new G('41/100'),0,0,0);contains(actualLower,'1/100');assert(actualLower.lo.cmp(0)>0);
const family=clockFamily(stationary,new G('41/100'),'1/100',0,0,'79/200',0,0,physical);
// Offset -79/200 makes range1/200, hence exact prescribed clock81/200=.405>cursor.4.
contains(family.S,'81/200');assert(family.S.hi.cmp('2/5')>0);assert(physical.hi.cmp('2/5')<0);
assert(family.initialSourceWindow.lo.cmp(physical.lo)<=0&&family.initialSourceWindow.hi.cmp(physical.hi)>=0);
assert(family.R.lo.cmp(0)>0&&family.D.lo.cmp(0)>0);
cases.push({name:'translated nominal root81/200 retained beyond cursor2/5 while physical support ends21/100',passed:true,P:physical.out(),C:family.S.out(),J:family.initialSourceWindow.out(),range:family.R.out()});
// Restricting prescribed data to the physical cursor must be rejected by full nominal queries.
const limited={box:(T,n)=>{T=G.of(T);assert((T.lo.cmp('41/100')===0&&T.hi.cmp('41/100')===0)||T.hi.cmp('2/5')<=0,'nominal coverage absent');return stationary.box(T,n);}};
assert.throws(()=>clockFamily(limited,new G('41/100'),'1/100',0,0,'79/200',0,0,physical),/nominal coverage absent/);
cases.push({name:'missing prescribed nominal coverage rejected',passed:true});
// Fully nominal velocity offset family reaches D=0 although its center is stationary.
assert.throws(()=>clockFamily(stationary,new G('41/100'),'1/100',0,0,0,1,0),/positive transformed source clock|complete nominal and offset chart/);
cases.push({name:'zero source denominator in replacement family rejected',passed:true});
// Incorrect physical upper faces and lower signs must not become certificates.
assert.throws(()=>mirrorUpper(new G('41/100'),'1/100','2/5'),/strictly completed/);
assert(lowerResidual(stationary,new G('41/100'),0,'1/50',0).hi.cmp(0)<0);
cases.push({name:'physical cursor equality rejected and bad lower face has negative residual',passed:true});
// Independent signed-source algebra: n=(1,0),R=2,v=0,a=(0,3/100),u=(1/5,0).
// E=(-1/4,3/200); H=(-3/10,3/1000), H_a,tt=1/10. These follow from B=diag(0,1/2).
const transformed=neutralFrame([2,0],[0,0],[0,'3/100'],[0,0],['1/5',0]);
contains(transformed.H.F[0],'-3/10');contains(transformed.H.F[1],'3/1000');contains(transformed.H.Fa[1][1],'1/10');
const physicalE=physicalFamily({box:(_T,n)=>n===0?[new G(1),new G(0)]:n===2?[new G(0),new G('-3/100')]:[new G(0),new G(0)]},new G(2),{S:new G(0),initialSourceWindow:new G(0)},0,0,0,0,0);
contains(physicalE.clock.F[0],'-1/4');contains(physicalE.clock.F[1],'3/200');
cases.push({name:'physical and transformed delayed acceleration retained with independently derived values',passed:true,E:physicalE.clock.F.map(z=>z.out()),H:transformed.H.F.map(z=>z.out())});
console.log(JSON.stringify({generatedAt:new Date().toISOString(),grade:'known-case implementation comparison against frozen mathematical reference and explicit elementary extensions',passed:true,knownCaseCount:cases.length,targetCaseCount:0,cases},null,2));

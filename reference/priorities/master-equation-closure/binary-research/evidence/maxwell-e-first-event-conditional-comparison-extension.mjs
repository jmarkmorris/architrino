// Arbitrary C2,1 test extension of immutable original comparison; never a full E solution.
import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {Q,G,add,sub,mul} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {rootBox} from './maxwell-e-first-event-root-speed-floor.mjs';
import {directedSensitivity} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
import {dot} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
export function cubicKnot(p,t,j){t=Q.of(t);const s=t.sub(p.t),s2=s.mul(s),s3=s2.mul(s);return {t:t.toString(),x:p.x.map((x,k)=>Q.of(x).add(Q.of(p.v[k]).mul(s)).add(Q.of(p.a[k]).mul(s2).div(2)).add(Q.of(j[k]).mul(s3).div(6)).toString()),v:p.v.map((v,k)=>Q.of(v).add(Q.of(p.a[k]).mul(s)).add(Q.of(j[k]).mul(s2).div(2)).toString()),a:p.a.map((a,k)=>Q.of(a).add(Q.of(j[k]).mul(s)).toString())};}
export function comparisonDerivative(r,v,a,j,u,A){const d=directedSensitivity(r,v,a,u,'E'),sigma=new G(1).sub(dot(d.n,u)).div(d.D),mv=(m,z)=>m.map(row=>dot(row,z));return add(add(mv(d.Fr,sub(u,mul(v,sigma))),mv(d.Fv,mul(a,sigma))),add(mv(d.Fa,mul(j,sigma)),mv(d.Fu,A)));}
export function known(){
 const p={t:0,x:[2,3],v:['.1','.2'],a:['.4','-.3']},j=['.6','1.2'],end=cubicKnot(p,1,j);assert.deepEqual(end,{t:'1',x:['12/5','13/4'],v:['4/5','1/2'],a:['1','9/10']});
 const ref=new ExactReferenceHistory([p,cubicKnot(p,'.3',j),end],{r:2,omega:0,delta:'.1'}),expected=[['2.1125','3.0875'],['.375','.2'],['.7','.3'],j];for(let n=0;n<4;n++)ref.box(new G('.5'),n).forEach((z,k)=>assert(z.lo.cmp(expected[n][k])<=0&&z.hi.cmp(expected[n][k])>=0));
 assert.deepEqual(cubicKnot(p,0,j),{t:'0',x:['2','3'],v:['1/10','1/5'],a:['2/5','-3/10']});
 const d=comparisonDerivative([2,0],[0,0],[0,0],[0,0],['.2','.3'],['-.25',0]);d.forEach((z,k)=>assert(z.lo.cmp(['.05','-.0375'][k])<=0&&z.hi.cmp(['.05','-.0375'][k])>=0));const s=comparisonDerivative([2,0],[0,0],[0,0],[0,'.05'],[0,0],[0,0]);s.forEach((z,k)=>assert(z.lo.cmp([0,'.025'][k])<=0&&z.hi.cmp([0,'.025'][k])>=0));
 return {passed:true,cases:['exact matching cubic C2 jets and non-grid Hermite representation','physical jets0..3 independently known polynomial','stationary E chain rule and delayed-source-J contribution'],grade:'comparison construction only'};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(!args.input){console.log(JSON.stringify({knownFirst:known()},null,2));process.exit(0);}
const knownFirst=known();assert(args.out&&!fs.existsSync(args.out)&&sha(args.input)==='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495');
const saved=JSON.parse(fs.readFileSync(args.input));assert(saved.specification.K===1&&saved.specification.cf===1&&saved.specification.beta===.3);const ref=new ExactReferenceHistory(saved.knots,saved.specification),p=saved.knots.at(-1),T0=Q.of(p.t),Tf=Q.of('59.57'),end=Q.of('59.58'),step=Q.of('1/1000');assert(T0.cmp('59.5')>0&&T0.cmp(Tf)<0);
const S=rootBox(ref,new G(T0),p.x.map(G.of),'59.103146','.01',Q.of(0),8);assert(S.lo.cmp('58.95')>0&&S.hi.cmp('59.35')<0&&S.hi.cmp('59.5')<0);const jet=comparisonDerivative(add(p.x.map(G.of),ref.box(S,0)),mul(ref.box(S,1),-1),mul(ref.box(S,2),-1),mul(ref.box(S,3),-1),p.v.map(G.of),p.a.map(G.of)),J=jet.map(z=>z.lo.add(z.hi).div(2));
const knots=[...saved.knots];for(let t=T0.add(step);t.cmp(end)<0;t=t.add(step))knots.push(cubicKnot(p,t,J));knots.push(cubicKnot(p,end,J));const output={specification:saved.specification,knots};fs.writeFileSync(args.out,JSON.stringify(output),{flag:'wx'});
const receipt={knownFirst,input:args.input,inputSHA:sha(args.input),output:args.out,outputSHA:sha(args.out),sourceSHA:sha(new URL(import.meta.url)),preservedOriginalKnots:saved.knots.length,knots:knots.length,T0:T0.toString(),Tf:Tf.toString(),end:end.toString(),step:step.toString(),jetSource:S.out(),jetBox:jet.map(z=>z.out()),J:J.map(z=>z.toString()),physicalPastIdentical:true,grade:'arbitrary incoming partner-response test curve; own comparison self roots are irrelevant to actual census under separately proved stopping hypothesis; no actual future or event claim'};fs.writeFileSync(args.out+'.receipt.json',JSON.stringify(receipt,null,2),{flag:'wx'});console.log(JSON.stringify(receipt));

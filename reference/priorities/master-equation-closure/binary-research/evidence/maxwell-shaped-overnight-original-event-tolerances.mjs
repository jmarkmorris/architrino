// Conditional input tolerance certificate; actual original tube is an external premise.
// No new preparation, compatibility patch, or outgoing response is defined.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {Q,G,knownGrid,add,sub,mul,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory,knownReference} from './maxwell-shaped-overnight-exact-reference-history.mjs';
const one=new G(1),outVec=a=>a.map(x=>x.out());
const expand=(a,e)=>a.map(x=>G.of(x).add(new G(Q.of(e).neg(),e)));
function response({R,n,D,v,a},u){const b=sub(n,v),E=mul(add(mul(b,one.sub(dot(v,v))),mul(sub(mul(b,dot(n,a)),mul(a,D)),R)),one.div(R.sq().mul(D).mul(D).mul(D))),M=sub(mul(n,dot(u,E)),mul(E,dot(u,n)));return {E:mul(E,-1),full:mul(add(E,M),-1)};}
function known(){const grid=knownGrid(),poly=knownReference();let g={R:new G(2),n:[one,new G(0)],D:one,v:[new G(0),new G(0)],a:[new G(0),new G(0)]},u=[new G('.2'),new G('.3')],z=response(g,u);assert(z.E[0].lo.cmp('-.25')===0&&z.E[0].hi.cmp('-.25')===0&&z.E[1].lo.cmp(0)===0);g.a=[new G(0),new G('.03')];z=response(g,u);assert(z.full[0].lo.cmp('-.2455')<=0&&z.full[0].hi.cmp('-.2455')>=0&&z.full[1].lo.cmp('.012')<=0&&z.full[1].hi.cmp('.012')>=0);return {grid,polynomial:{...poly,history:undefined},responses:['signed stationary E (-.25,0)','signed transverse accelerated full (-.2455,.012)'],passed:true};}
const knownFirst=known();console.log(JSON.stringify({knownFirst,stage:'known-before-target'}));
if(process.argv.includes('--known'))process.exit(0);
const input='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/b03-full-checked-event999-h0.00125.history.json';
const output='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-incoming-tolerances.json';
assert(!fs.existsSync(output),'preserve retained outputs');
const bytes=fs.readFileSync(input),raw=JSON.parse(bytes),p=raw.knots.at(-1),ref=new ExactReferenceHistory(raw.knots,raw.specification);
const T0=Q.of(p.t),dt=Q.of('.001'),ex=Q.of('.00001'),ev=Q.of('.00001'),hx=Q.of('.00102'),hv=Q.of('.01002'),sourceErrors={x:'.00001',v:'.00001',a:'.0001'};
const T=new G(T0,T0.add(dt)),X=expand(p.x.map(G.of),hx),U=expand(p.v.map(G.of),hv),initialS=new G('37.6178','37.6298');
const sourceBox=(S,n)=>expand(ref.box(G.of(S),n),[sourceErrors.x,sourceErrors.v,sourceErrors.a][n]);
function gap(S){return length(add(X,sourceBox(new G(S),0))).sub(T.sub(S));}
const left=gap(initialS.lo),right=gap(initialS.hi);assert(left.hi.cmp(0)<0&&right.lo.cmp(0)>0,'uniform root bracket with true prefix errors');
let alo=initialS.lo,ahi=initialS.hi,blo=initialS.lo,bhi=initialS.hi;
for(let j=0;j<42;j++){const am=alo.add(ahi).div(2);if(gap(am).hi.cmp(0)<0)alo=am;else ahi=am;const bm=blo.add(bhi).div(2);if(gap(bm).lo.cmp(0)>0)bhi=bm;else blo=bm;}
const S=new G(alo,bhi),sourceX=sourceBox(S,0),sourceV=mul(sourceBox(S,1),-1),sourceA=mul(sourceBox(S,2),-1),range=add(X,sourceX),R=length(range),n=mul(range,one.div(R)),D=one.sub(dot(n,sourceV)),z=response({R,n,D,v:sourceV,a:sourceA},U),work=dot(U,z.E).mul(2),A=length(z.full),sourceSpeed=length(sourceV),centerSpeed=length(p.v.map(G.of)),vMinus=centerSpeed.lo.sub(ev),vPlus=centerSpeed.hi.add(ev),sep=length(p.x.map(G.of)).lo.sub(hx).mul(2);
assert(S.hi.cmp(T0)<0&&sourceSpeed.hi.cmp(1)<0&&R.lo.cmp(0)>0&&D.lo.cmp(0)>0);
const velocitySlack=hv.sub(ev).sub(A.hi.mul(dt)),positionSlack=hx.sub(ex).sub(dt),eventSlack=vMinus.mul(vMinus).add(work.lo.mul(dt)).sub(1),upperEvent=T0.add(one.lo.sub(vMinus.mul(vMinus)).div(work.lo)),lowerEvent=T0.add(one.lo.sub(vPlus.mul(vPlus)).div(A.hi.mul(2)));
const receipt={knownFirst,grade:'conditional derived finite input-tolerance certificate; actual original history tube not supplied',case:{law:'full',beta:.3,K:1,cf:1,input,SHA256:crypto.createHash('sha256').update(bytes).digest('hex'),T0:p.t,x:p.x,u:p.v,delta:dt.num(),endpointErrors:{x:ex.num(),v:ev.num()},sourceErrors,requiredActualPrefix:'complete original C2,1 strict-subfield history through T0; entire true source X/V/A errors on declared I',sourceInitialWindow:initialS.out(),receiverRadii:{x:hx.num(),v:hv.num()}},sourceWindow:S.out(),gapLeft:left.out(),gapRight:right.out(),X:outVec(X),U:outVec(U),sourceX:outVec(mul(sourceX,-1)),sourceV:outVec(sourceV),sourceA:outVec(sourceA),R:R.out(),D:D.out(),sourceSpeed:sourceSpeed.out(),signedE:outVec(z.E),signedFull:outVec(z.full),work:work.out(),accelerationNorm:A.out(),vMinus:vMinus.num(),vPlus:vPlus.num(),separationFloor:sep.num(),velocitySlack:velocitySlack.num(),positionSlack:positionSlack.num(),eventSlack:eventSlack.num(),conditionalEvent:[lowerEvent.num(),upperEvent.num()],passed:work.lo.cmp(0)>0&&velocitySlack.cmp(0)>0&&positionSlack.cmp(0)>0&&eventSlack.cmp(0)>0&&sep.cmp(0)>0};
fs.writeFileSync(output,JSON.stringify(receipt,null,2),{flag:'wx'});console.log(JSON.stringify(receipt,null,2));assert(receipt.passed,'declared conditional cylinder failed');

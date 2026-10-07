// Retained-receipt postprocessing only: no history or root evaluation.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,length} from './maxwell-shaped-overnight-grid-interval.mjs';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const vec=x=>x.map(z=>z instanceof G?z:z&&typeof z==='object'&&'lo'in z?new G(z.lo,z.hi):new G(z));
const norm=x=>length(vec(x)).hi;
export function pieceMagnitude(p,T){
 const a=Q.of(p.a),b=Q.of(p.b),h=b.sub(a),m=a.add(b).div(2),w=Q.of(T).sub(m);assert(h.cmp(0)>0&&Q.of(T).cmp(b)>=0);
 const direct=h.mul(norm(p.dmid)),variation=h.mul(h).div(4).mul(norm(p.derivative));
 return {magnitudeOne:direct.add(variation),magnitudeTwo:w.mul(direct.add(variation)),pieceOne:norm(p.one),pieceTwo:norm(p.two),pieceOneLower:length(vec(p.one)).lo,pieceTwoLower:length(vec(p.two)).lo};
}
function known(){
 const tight=(a,b)=>{a=Q.of(a);b=Q.of(b);assert(a.cmp(b)>=0&&a.sub(b).cmp('1/100000000000000000000')<0);};
 const affine=pieceMagnitude({a:0,b:1,dmid:[0,0],derivative:[2,0],one:[0,0],two:['-1/6',0]},1);
 tight(affine.magnitudeOne,'1/2');tight(affine.magnitudeTwo,'1/4');tight(affine.pieceOne,0);tight(affine.pieceTwo,'1/6');
 const constant=pieceMagnitude({a:0,b:1,dmid:[3,4],derivative:[0,0],one:[3,4],two:['3/2',2]},1);
 tight(constant.magnitudeOne,5);tight(constant.magnitudeTwo,'5/2');tight(constant.pieceOne,5);tight(constant.pieceTwo,'5/2');
 const positive=pieceMagnitude({a:0,b:1,dmid:[2,0],derivative:[2,0],one:[2,0],two:['5/6',0]},1);
 tight(positive.magnitudeOne,'5/2');tight(positive.pieceOne,2);
 const cancellationLower=length(vec(['-1/4',0])).lo.add(length(vec(['1/4',0])).lo).sub(norm([0,0]));assert(cancellationLower.cmp('1/2')<=0&&cancellationLower.cmp('499999/1000000')>0);
 return {passed:true,cases:['affine cancellation: magnitude1/2 versus signed0','constant non-cancellation vector(3,4): both5','positive affine: magnitude5/2 versus signed2 without sign cancellation','two affine half-piece primitives certify cancellation1/2']};
}
const encode=x=>x instanceof Q?x.toString():Array.isArray(x)?x.map(encode):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).map(([k,v])=>[k,encode(v)])):x;
if(process.argv[1]===new URL(import.meta.url).pathname){
 const args={};for(let i=2;i<process.argv.length;i++)if(process.argv[i].startsWith('--'))args[process.argv[i].slice(2)]=process.argv[i+1];assert(args.out&&!fs.existsSync(args.out));
 if(process.argv.includes('--known'))fs.writeFileSync(args.out,JSON.stringify({time:new Date().toISOString(),sourceSHA:sha(new URL(import.meta.url)),...known()},null,2)+'\n',{flag:'wx'});
 else{
  const k=JSON.parse(fs.readFileSync(args.knownReceipt));assert(k.passed&&k.sourceSHA===sha(new URL(import.meta.url)));
  const r=JSON.parse(fs.readFileSync(args.input));assert(r.sourceSHA==='2b2bafac334605370c28365eac247e33c328fe7ffbee085cf1b544b2e921f35b'&&r.cells.length===128);
  let M1=Q.of(0),M2=Q.of(0),P1=Q.of(0),P2=Q.of(0),PL1=Q.of(0),PL2=Q.of(0),count=0;
  for(const c of r.cells){assert(c.pieces.length===8);for(const p of c.pieces){const z=pieceMagnitude(p,r.T);M1=M1.add(z.magnitudeOne);M2=M2.add(z.magnitudeTwo);P1=P1.add(z.pieceOne);P2=P2.add(z.pieceTwo);PL1=PL1.add(z.pieceOneLower);PL2=PL2.add(z.pieceTwoLower);count++;}}
  const S1=norm(r.I1),S2=norm(r.I2),rv=Q.of(r.velocityRadius),rx=Q.of(r.positionRadius);
  const result={scope:'postprocessing same retained1024pieces; no new residual/root evaluation',sourceSHA:sha(new URL(import.meta.url)),inputSHA:sha(args.input),knownSHA:sha(args.knownReceipt),count,T:r.T,M1,M2,P1,P2,PL1,PL2,S1,S2,velocityRadius:rv,positionRadius:rx,magnitudeV:rv.add(M1),magnitudeX:rx.add(M2),pieceTriangleV:rv.add(P1),pieceTriangleX:rx.add(P2),signedV:r.V,signedX:r.X,oldV:r.oldV,oldX:r.oldX,betweenPieceBoundDifferenceV:P1.sub(S1),betweenPieceBoundDifferenceX:P2.sub(S2),guaranteedCancellationLowerV:PL1.sub(S1),guaranteedCancellationLowerX:PL2.sub(S2)};
  fs.writeFileSync(args.out,JSON.stringify(encode(result),null,2)+'\n',{flag:'wx'});
 }
}

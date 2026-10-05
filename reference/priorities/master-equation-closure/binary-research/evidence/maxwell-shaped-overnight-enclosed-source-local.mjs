// Sharpen only a source-A diagnostic; preserve its assessed polar/phase ancestor.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q,G,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {known as polarKnown} from './maxwell-shaped-overnight-enclosed-diagnostics-v3.mjs';
import {localSourceInventory,indexedInventoryKnown} from './maxwell-shaped-overnight-local-source-inventory-indexed.mjs';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const max=(a,b)=>Q.of(a).cmp(b)>=0?Q.of(a):Q.of(b);
export function localSourceNorm(history,S,rows,m){
  S=G.of(S);assert(S.lo.cmp(-6)>0,'declared supplied-past coverage');
  const inventory=localSourceInventory(rows,S,m),n=length(history.box(S,2));
  return {inventory,norm:new G(max(0,n.lo.sub(inventory.a)),n.hi.add(inventory.a))};
}
export function known(){
  const base=polarKnown(),indexed=indexedInventoryKnown(),q=Q.of;
  const rows=[{t:q(0),x:q(0),v:q(0),a:q(1)},
    {t:q(1),x:q(1),v:q(1),a:q(10)},
    {t:q(2),x:q(2),v:q(2),a:q(2)},
    {t:q(3),x:q(3),v:q(3),a:q(100)}];
  const m={past:[q('.1'),q('.2'),q(20)],initialA:q(1)};
  const history={box:()=>[new G(0),new G('.25')]};
  const inside=localSourceNorm(history,new G('1.1','1.9'),rows,m);
  assert(inside.inventory.a.cmp(2)===0&&inside.inventory.bins.join(',')==='2');
  assert(inside.norm.lo.cmp(0)===0&&inside.norm.hi.cmp('2.25')>=0);
  const seam=localSourceNorm(history,new G(1),rows,m);
  assert(seam.inventory.a.cmp(10)===0&&seam.inventory.bins.join(',')==='1,2');
  const past=localSourceNorm(history,new G('-.1','.1'),rows,m);
  assert(past.inventory.a.cmp(20)===0);
  assert.throws(()=>localSourceNorm(history,new G('2.9','3.1'),rows,m),/completed/);
  assert.throws(()=>localSourceNorm(history,new G(-6),rows,m),/coverage/);
  return {passed:true,base,indexed,cases:['local whole-bin A excludes unrelated later spike',
    'both closed source-seam bins retained','past-crossing A retained',
    'uncompleted and undeclared past support rejected']};
}
const args=Object.fromEntries(process.argv.slice(2).filter((x,j)=>j%2===0).map((x,j)=>[x.slice(2),process.argv[3+2*j]]));
const controls=known();console.log(JSON.stringify({known:controls,targetReads:0}));
if(args.diagnostic){
  assert(args.out&&!fs.existsSync(args.out),'fresh diagnostic required');
  const db=fs.readFileSync(args.diagnostic),d=JSON.parse(db),tb=fs.readFileSync(d.tube),tube=JSON.parse(tb),
    rb=fs.readFileSync(d.tube+'.jsonl'),rows=rb.toString().trim().split('\n').map(JSON.parse),
    ib=fs.readFileSync(tube.input),j=JSON.parse(ib);
  assert(d.input===tube.input&&d.tubeSHA===hash(tb)&&d.rowsSHA===hash(rb)&&d.inputSHA===hash(ib)&&tube.inputSHA===hash(ib),'ancestor input/row bindings');
  assert(tube.firstFailure===null&&!tube.completedPrefix,'admitted complete launch prefix required');
  assert(rows.length===tube.bins&&d.bins===tube.bins&&d.horizon===tube.horizon&&d.law===tube.law,'ancestor case identity');
  assert(d.producerSHA===hash(fs.readFileSync(new URL('./maxwell-shaped-overnight-enclosed-diagnostics-v3.mjs',import.meta.url))),'frozen diagnostic source');
  let left=Q.of(0);for(const row of rows){assert(Q.of(row.t).cmp(left)>0);left=Q.of(row.t);}
  assert(left.cmp(tube.horizon)===0&&JSON.stringify(d.actualFinalBin.S)===JSON.stringify(rows.at(-1).S),'complete partition and source box');
  const initial={t:'0/1',x:tube.initialErrors[0],v:tube.initialErrors[1],a:tube.initialErrors[2]},
    S=new G(d.actualFinalBin.S.lo,d.actualFinalBin.S.hi),receivingLeft=Q.of(rows.length>1?rows.at(-2).t:0);
  assert(S.hi.cmp(receivingLeft)<0,'source is strictly completed before final receiving bin');
  const m={past:tube.pastMismatch.map(Q.of),initialA:Q.of(initial.a)},
    local=localSourceNorm(new ExactReferenceHistory(j.knots,j.specification),S,[initial,...rows],m);
  const dependencies=['maxwell-shaped-overnight-enclosed-diagnostics-v3.mjs',
    'maxwell-shaped-overnight-local-source-inventory-indexed.mjs',
    'maxwell-shaped-overnight-local-source-inventory.mjs',
    'maxwell-shaped-overnight-exact-reference-cached.mjs',
    'maxwell-shaped-overnight-grid-interval.mjs'];
  const result={...d,knownFirst:controls,producerSHA:hash(fs.readFileSync(process.argv[1])),
    dependencyHashes:Object.fromEntries(dependencies.map(p=>[p,hash(fs.readFileSync(new URL(p,import.meta.url)))])),
    predecessor:{path:args.diagnostic,SHA:hash(db),producerSHA:d.producerSHA},
    actualEndpoint:{...d.actualEndpoint,delayedSourceAccelerationNorm:local.norm.out(),
      sourceAccelerationError:local.inventory.a.toString(),
      sourceAccelerationInventory:'every closed intersecting completed source bin; whole final-bin S box; past/initial error if crossed',
      sourceBins:local.inventory.bins},
    grade:'conditional diagnostic corollary of independently admitted actual prefix and assessed ancestor; no new fate'};
  fs.writeFileSync(args.out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
  console.log(JSON.stringify({out:args.out,sourceBins:local.inventory.bins.length,sourceAError:local.inventory.a.toString(),sourceANorm:local.norm.out()}));
}

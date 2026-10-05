// Separate late8fold receiving refinement; same immutable complete comparison/kernel.
import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
import {FourthReferenceHistory,refinedDefectCell,secondOrderKnown} from './maxwell-e-first-event-second-order-memoized-v2.mjs';
import {History,geometry} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-preparation.mjs';
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex'),min=(a,b)=>Q.of(a).cmp(b)<0?Q.of(a):Q.of(b);
export function selected(row,threshold){return Q.of(row.right).cmp(threshold)>0;}
export function partition(a,b,n=8){a=Q.of(a);b=Q.of(b);assert(Number.isInteger(n)&&n>0&&n<=64&&a.cmp(b)<0);return Array.from({length:n},(_,k)=>({left:a.add(b.sub(a).mul(k).div(n)),right:a.add(b.sub(a).mul(k+1).div(n))}));}
export function known(){
  assert(selected({left:'54',right:'56'},55)&&selected({left:'55',right:'56'},55)&&!selected({left:'54',right:'55'},55));
  const p=partition('1/3','2/3');assert(p.length===8&&p[0].left.cmp('1/3')===0&&p.at(-1).right.cmp('2/3')===0);
  for(let j=1;j<p.length;j++)assert(p[j-1].right.cmp(p[j].left)===0);
  assert(min(4,1).cmp(1)===0&&min(4,9).cmp(4)===0);
  const p64=partition('1/3','2/3',64);assert(p64.length===64&&p64[0].left.cmp('1/3')===0&&p64.at(-1).right.cmp('2/3')===0);for(let j=0;j<64;j++){assert(p64[j].right.sub(p64[j].left).cmp('1/192')===0);if(j)assert(p64[j-1].right.cmp(p64[j].left)===0);}let rejected=false;try{partition(0,1,65);}catch{rejected=true;}assert(rejected);
  return {passed:true,cases:['exact64fold non-dyadic partition and each1/192 width','65fold rejected','exact late receiving threshold inclusion','cell ending at threshold excluded','exact non-grid eight-cell partition','parent/child minimum'],kernel:secondOrderKnown()};
}
const knownFirst=known(),args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
if(!args.input){console.log(JSON.stringify({knownFirst,targetReads:0}));process.exit(0);}
assert(args.parent&&args.out&&!fs.existsSync(args.out)&&!fs.existsSync(args.out+'.jsonl'));
const input=fs.readFileSync(args.input),data=JSON.parse(input),parent=JSON.parse(fs.readFileSync(args.parent)),parentRows=fs.readFileSync(args.parent+'.jsonl'),
  law=data.specification.equation.includes('E+M')?'full':'E';
assert(data.specification.beta===.3&&data.specification.K===1&&data.specification.cf===1);
assert(parent.input===args.input&&parent.inputSHA===digest(input)&&parent.law===law&&parent.firstFailure===null,'same complete input bytes and equation required');
const threshold=Q.of(55),rows=parentRows.toString().trim().split('\n').map(JSON.parse).filter(row=>selected(row,threshold)&&(!args.profileEnd||Q.of(row.left).cmp(args.profileEnd)<0)),
  history=new FourthReferenceHistory(data.knots,data.specification),nominal=new History(preparation(.3,law).past,data.knots[0]);
for(const knot of data.knots.slice(1))nominal.append(knot);
const kernelURL=new URL('./maxwell-e-first-event-second-order-memoized-v2.mjs',import.meta.url),spec={case:'original beta3/10 exact comparison; coarsened comparison fixed late8fold receiving defect refinement',
  knownFirst,input:args.input,inputSHA:digest(input),parent:args.parent,parentRowsSHA:digest(parentRows),law,profileEnd:args.profileEnd??null,receivingThreshold:threshold.toString(),selectionRule:'parent.right>55; retain complete selected parent including any crossing cell',
  selectedParentCells:rows.map(x=>({left:x.left,right:x.right,source:x.source??x.S,bound:x.bound})),subdivision:8,kernelSHA:digest(fs.readFileSync(kernelURL)),
  producerSHA:digest(fs.readFileSync(new URL(import.meta.url))),grade:'directed same-curve defect refinement, not exact-launch tube'};
fs.writeFileSync(args.out+'.specification.json',JSON.stringify(spec,null,2));
const began=Date.now(),deadline=Date.parse(args.deadline??'2026-10-05T21:47:16Z');let lastHeartbeat=began,firstFailure=null,cells=0,improved=0,maximum=null,lastCompleted=null;
console.log(JSON.stringify({event:'launch',pid:process.pid,law,parents:rows.length,knownPassed:true}));
try{for(const parentCell of rows){for(const child of partition(parentCell.left,parentCell.right,8)){
  assert(Date.now()<deadline,'owned refinement deadline');const midpoint=child.left.add(child.right).div(2).num(),q=nominal.at(midpoint),seed=geometry(nominal,q.x,midpoint).S,
    d=refinedDefectCell(history,child.left,child.right,seed,law),bound=min(parentCell.bound,d.bound),
    row={left:child.left.toString(),right:child.right.toString(),bound:bound.toString(),childBound:d.bound.toString(),parentBound:parentCell.bound,
      parentLeft:parentCell.left,parentRight:parentCell.right,source:d.S.out(),D:d.D.out(),R:d.R.out(),method:d.method,jumpTerm:d.jumpTerm?.toString(),jumps:d.jumps};
  fs.appendFileSync(args.out+'.jsonl',JSON.stringify(row)+'\n');cells++;if(d.bound.cmp(parentCell.bound)<0)improved++;
  if(maximum===null||bound.cmp(maximum)>0)maximum=bound;lastCompleted=child.right.toString();
  if(Date.now()-lastHeartbeat>=15000){console.log(JSON.stringify({event:'heartbeat',pid:process.pid,cells,improved,t:child.right.num(),wallSeconds:(Date.now()-began)/1000,rssMB:process.memoryUsage().rss/1048576}));lastHeartbeat=Date.now();}
}}}catch(e){firstFailure={message:e.message,stack:e.stack};}
const result={...spec,cells,improved,maximum:maximum?.toString(),lastCompleted,firstFailure,wallSeconds:(Date.now()-began)/1000,rssMB:process.memoryUsage().rss/1048576};
fs.writeFileSync(args.out,JSON.stringify(result,null,2));console.log(JSON.stringify({...result,knownFirst:undefined,selectedParentCells:undefined}));if(firstFailure)process.exitCode=1;

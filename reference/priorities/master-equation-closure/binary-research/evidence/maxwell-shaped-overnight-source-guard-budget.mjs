// Frozen whole-bin completed-source budget extraction; no equation evaluation.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
const max=(a,b)=>Q.of(a).cmp(b)>=0?Q.of(a):Q.of(b);
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export function sourceGuardBudget(rows,left,right,budgets){
 left=Q.of(left);right=Q.of(right);assert(left.cmp(0)>0&&right.cmp(left)>=0,'positive closed source guard');
 assert(rows.length&&Q.of(rows[0].t).cmp(0)>0,'first completed receiving face positive');
 let old=Q.of(0),oldX=Q.of(0),oldV=Q.of(0);const selected=[];let x=Q.of(0),v=Q.of(0),a=Q.of(0);
 for(let i=0;i<rows.length;i++){
  const r=rows[i],end=Q.of(r.t);assert(end.cmp(old)>0,'exact strict receiving partition');
  assert(Q.of(r.x).cmp(oldX)>=0&&Q.of(r.v).cmp(oldV)>=0&&Q.of(r.a).cmp(0)>=0,'positive whole-bin error inventory');
  if(end.cmp(left)>=0&&old.cmp(right)<=0){selected.push(i);x=max(x,r.x);v=max(v,r.v);a=max(a,r.a);}
  old=end;oldX=Q.of(r.x);oldV=Q.of(r.v);
 }
 assert(old.cmp(right)>=0,'entire guard completed');assert(selected.length,'closed guard has intersected bins');
 const actual={x,v,a},passed=Object.fromEntries(['x','v','a'].map(k=>[k,actual[k].cmp(budgets[k])<=0]));
 return {left:left.toString(),right:right.toString(),firstBin:selected[0],lastBin:selected.at(-1),bins:selected.length,bounds:Object.fromEntries(Object.entries(actual).map(([k,z])=>[k,z.toString()])),budgets:Object.fromEntries(Object.entries(budgets).map(([k,z])=>[k,Q.of(z).toString()])),passed,allBudgetsPass:Object.values(passed).every(Boolean),scope:'whole-bin errors on every closed intersection; no trajectory or event admission by extraction alone'};
}
export function guardKnown(){
 const rows=[{t:'1',x:'1',v:'2',a:'9'},{t:'2',x:'2',v:'3',a:'4'},{t:'3',x:'3',v:'4',a:'7'}],budget={x:3,v:4,a:9};
 const seam=sourceGuardBudget(rows,1,1,budget);assert(seam.bins===2&&Q.of(seam.bounds.a).cmp(9)===0&&Q.of(seam.bounds.x).cmp(2)===0);
 const interior=sourceGuardBudget(rows,'6/5','9/5',budget);assert(interior.bins===1&&Q.of(interior.bounds.a).cmp(4)===0);
 const broad=sourceGuardBudget(rows,'9/10','21/10',budget);assert(broad.bins===3&&broad.allBudgetsPass);
 assert(!sourceGuardBudget(rows,'6/5','9/5',{...budget,a:3}).allBudgetsPass);
 for(const [r,l,h]of [[rows,2,4],[[rows[0],rows[0]],1,1],[[rows[0],{...rows[1],x:'0'}],1,1]]){assert.throws(()=>sourceGuardBudget(r,l,h,budget));}
 return {passed:true,cases:['closed seam includes both adjacent bins','interior excludes outside acceleration spike','wide guard covers all intersections','budget failure explicit','uncompleted guard rejected','duplicate face rejected','nonmonotone position majorant rejected']};
}
const args=Object.fromEntries(process.argv.slice(2).reduce((a,x,j,z)=>x.startsWith('--')?[...a,[x.slice(2),z[j+1]]]:a,[]));
const known=guardKnown();if(!args.result){console.log(JSON.stringify(known));process.exit(0);}
assert(args.rows&&args.out&&!fs.existsSync(args.out),'fresh output and complete row file required');
const result=JSON.parse(fs.readFileSync(args.result)),rows=fs.readFileSync(args.rows,'utf8').trim().split('\n').filter(Boolean).map(s=>JSON.parse(s));
assert(rows.length===result.bins,'complete result row inventory');assert(rows.length,'nonempty prefix');
for(const k of ['t','x','v','a','prefixA'])assert(Q.of(rows.at(-1)[k]).cmp(result.final[k])===0,'result terminal identity');
const summary=sourceGuardBudget(rows,args.left??'1871/50',args.right??'3781/100',{x:args.x??'1/1000',v:args.v??'1/1000',a:args.a??'1/100'});
const receipt={knownFirst:known,result:args.result,resultSHA:hash(args.result),rows:args.rows,rowsSHA:hash(args.rows),inputSHA:result.inputSHA,defectSHA:result.defectSHA,law:result.law,requestedHorizon:result.horizon,completedFace:result.final.t,firstFailure:result.firstFailure,...summary};
fs.writeFileSync(args.out,JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt));

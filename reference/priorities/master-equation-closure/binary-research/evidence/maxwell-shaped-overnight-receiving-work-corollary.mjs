// Section57 exact postprocessing of independently assessed accepted receiving cells.
// Root/field/error first-escape admission is an external premise, not inferred here.
import assert from 'node:assert/strict';
import fs from 'node:fs';import crypto from 'node:crypto';
import {Q,G,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {ExactReferenceHistory,cacheKnown} from './maxwell-shaped-overnight-exact-reference-cached.mjs';
import {incomingWorkSum,workSumKnown} from './maxwell-shaped-overnight-incoming-work-sum-v2.mjs';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
export function known(){assert.equal(hash(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');return {passed:true,sum:workSumKnown(),history:cacheKnown(),cases:['known SHA abc','accepted-cell exactwork sum and negative control']};}
const knownFirst=known();console.log(JSON.stringify({knownFirst,targetReads:0}));
if(process.argv.includes('--known'))process.exit(0);
const args=Object.fromEntries(process.argv.slice(2).map((x,k,a)=>x.startsWith('--')?[x.slice(2),a[k+1]]:null).filter(Boolean));
if(args.receipt){
  assert(args.out&&!fs.existsSync(args.out),'fresh corollary output');
  const rb=fs.readFileSync(args.receipt),r=JSON.parse(rb),pb=fs.readFileSync(r.case.prefix),p=JSON.parse(pb),rowsBytes=fs.readFileSync(r.case.prefix+'.jsonl'),ib=fs.readFileSync(r.case.input),j=JSON.parse(ib),Tc=Q.of(r.case.Tc);
  assert(r.case.inputSHA===hash(ib)&&r.case.prefixSHA===hash(pb)&&r.case.prefixRowsSHA===hash(rowsBytes)&&p.inputSHA===hash(ib),'same complete actual-prefix/history bytes');
  assert(p.firstFailure===null&&p.horizon===r.case.Tc&&p.law===r.case.law&&r.case.initialErrors.x===p.final.x&&r.case.initialErrors.v===p.final.v,'actual checkpoint budgets');
  assert(r.acceptedCells===r.rows.length,'only accepted rows');assert(Tc.cmp(j.knots.at(-1).t)<0,'checkpoint lies in retained exact comparison');
  const ref=new ExactReferenceHistory(j.knots,j.specification),speed=length(ref.box(new G(Tc),1)),initial=speed.lo.sub(r.case.initialErrors.v),ell=initial.cmp(0)>0?initial:Q.of(0),sum=incomingWorkSum(Tc,ell,r.rows);
  assert(sum.reached===r.reached,'accepted endpoint identity');if(r.failure)assert(r.failure.left===r.reached,'failed candidate excluded');
  const result={knownFirst,grade:'conditional exact-work corollary of independently admitted actual prefix and accepted receiving cylinders',ancestor:{path:args.receipt,SHA:hash(rb)},case:r.case,initialSpeedLower:ell.toString(),initialComparisonSpeed:speed.out(),...sum,source:'inherited wholecell signedEwork; fullsameinputidentity; no new field/root/history evaluation',passed:sum.first!==null};
  fs.writeFileSync(args.out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({...result,sums:undefined},null,2));
}

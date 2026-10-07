import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';

function q(s){
  const m=/^(-?)(\d+)(?:\.(\d+))?$/.exec(String(s));assert(m);
  return [(m[1]?-1n:1n)*BigInt(m[2]+(m[3]||'')),10n**BigInt((m[3]||'').length)];
}
const add=(a,b)=>[a[0]*b[1]+b[0]*a[1],a[1]*b[1]];
const neg=a=>[-a[0],a[1]];
const sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>[a[0]*b[0],a[1]*b[1]];
const div=(a,b)=>{assert(b[0]>0n);return[a[0]*b[1],a[1]*b[0]]};
const lt=(a,b)=>a[0]*b[1]<b[0]*a[1];
const eq=(a,b)=>a[0]*b[1]===b[0]*a[1];
const sq=a=>mul(a,a);
assert(eq(add(q('.1'.replace(/^\./,'0.')),q('0.2')),q('0.3')));
assert(eq(div(q(1),q(2)),q('0.5')));
assert(lt(q('-0.1'),q(0))&&!lt(q(1),q(1)));
assert(lt(q(2),sq(q('1.415')))&&lt(sq(q('1.414')),q(2)));
const controls={knownPassed:true,cases:['exact decimal sum','exact rational division','signed strict ordering','known square-root bracketing']};
console.log(JSON.stringify(controls));
if(process.argv.includes('--known-only'))process.exit(0);
assert(process.argv.includes('--target'));
const r=q('2.559210616145'),rsLo=q('2.55921061613'),a=div(r,q(10000)),c=mul(a,q('1.3'));
const lead=q('0.000176960670384'),radialLo=q('2.5592106107'),correction=q('0.000000005406333');
assert(lt(mul(sq(a),div(q(153),q(320))),sq(lead)));
assert(lt(sq(radialLo),sub(sq(rsLo),div(sq(c),q(4)))));
assert(lt(div(sq(c),mul(q(4),add(rsLo,radialLo))),correction));
const upper=q('0.000176966092');
assert(lt(add(add(lead,q('0.000000000015')),correction),upper));
const input='.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference/e-square-audit-v1.json';
const bytes=fs.readFileSync(input),old=JSON.parse(bytes);
assert(old.passed&&old.knownFirst&&old.independentCrossProduct);
const settings=[['10','0.0003691085315','0.0000151763'],['12','0.0005162529406','0.00016232075'],['15','0.0008962742090','0.00054234202']];
const rows=settings.map(([T,lower,budget])=>{
  const row=old.rows.find(x=>x.T===T);assert(row);
  // The deliberately coarser bound also absorbs 1e-50, far exceeding the
  // inherited 90-digit point-subtraction rounding in the reference receipt.
  assert(lt(add(q(lower),q('0.00000000000000000000000000000000000000000000000001')),q(row.rmsLower)));
  assert(lt(q(budget),sub(q(lower),mul(q(2),upper))));
  return{T,trialRmsLower:lower,positionErrorBudget:budget};
});
console.log(JSON.stringify({passed:true,knownFirst:controls,claim:'exact rational verification of geometric planning bounds only',initialUpper:'0.000176966092',observableSha256:createHash('sha256').update(bytes).digest('hex'),rows},null,2));

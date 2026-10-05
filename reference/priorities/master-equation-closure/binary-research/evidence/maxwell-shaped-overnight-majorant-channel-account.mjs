// Bound-channel accounting; never trajectory-error attribution or source ablation.
import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
const names=['initialX','initialV','sourceX','sourceV','sourceA','comparisonDefect','upwardRounding'];
function transfer(x,v,C,c,h){[x,v,C,c,h]=[x,v,C,c,h].map(Q.of);const d=Q.of(1).sub(h.mul(h).mul(C));assert(d.cmp(0)>0);return {x:x.add(h.mul(v)).add(h.mul(h).mul(c)).div(d),v:v.add(h.mul(C).mul(x)).add(h.mul(c)).div(d)};}
function advance(z,C,c,h){const lo=transfer(z.x.lo,z.v.lo,C,c,h),hi=transfer(z.x.hi,z.v.hi,C,c,h);return {x:new G(lo.x,hi.x),v:new G(lo.v,hi.v)};}
const zero=()=>({x:new G(0),v:new G(0)}),knownA=transfer('.01','.02',2,'.03','.1'),knownB=transfer('.02','.03',2,'.04','.1'),knownSum=transfer('.03','.05',2,'.07','.1');assert(knownA.x.add(knownB.x).cmp(knownSum.x)===0&&knownA.v.add(knownB.v).cmp(knownSum.v)===0);assert(knownSum.x.cmp(new Q(357n,9800n))===0&&knownSum.v.cmp(new Q(63n,980n))===0);
const oneThird=new Q(1n,3n),pulse=new G(oneThird).hi.sub(oneThird);assert(pulse.cmp(0)>=0&&pulse.cmp('0.000000000000000000000001')<0);
const knownFirst={passed:true,cases:['exact positive-transfer additivity','known rational forced transfer','nonnegative upward third-grid pulse']};console.log(JSON.stringify({knownFirst,stage:'known-before-target'}));if(process.argv.includes('--known'))process.exit(0);
const input='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-broad.json',output='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-full-test-event-broad-channel-account.json';assert(!fs.existsSync(output));const bytes=fs.readFileSync(input),r=JSON.parse(bytes);assert(!r.passed&&r.terminal==='declared error tube failed');
let channels=Object.fromEntries(names.map(n=>[n,zero()]));channels.initialX.x=new G(Q.of('.005'));channels.initialV.v=new G(Q.of('.01'));let incoming={x:Q.of('.005'),v:Q.of('.01')},t=Q.of('38.3'),lastAccepted=null,rejectedCandidate=null;
for(let k=0;k<r.rows.length;k++){
 const row=r.rows[k],co=row.exactCoefficients,C=Q.of(co.Cx),h=Q.of(co.dt),forces={initialX:Q.of(0),initialV:Q.of(0),sourceX:C.mul('.005'),sourceV:Q.of(co.Lv).mul('.005'),sourceA:Q.of(co.La).mul('.03'),comparisonDefect:Q.of(co.defect),upwardRounding:Q.of(0)},totalForce=Object.values(forces).reduce((a,b)=>a.add(b),Q.of(0)),raw=transfer(incoming.x,incoming.v,C,totalForce,h),next={x:Q.of(row.exactErrors.x),v:Q.of(row.exactErrors.v)},round={x:next.x.sub(raw.x),v:next.v.sub(raw.v)};
 for(const key of ['x','v'])assert(round[key].cmp(0)>=0&&round[key].cmp('0.000000000000000000000001')<0);
 for(const n of names){channels[n]=advance(channels[n],C,forces[n],h);if(n==='upwardRounding')for(const key of ['x','v'])channels[n][key]=channels[n][key].add(new G(round[key]));}
 const sums={x:new G(0),v:new G(0)};for(const n of names)for(const key of ['x','v'])sums[key]=sums[key].add(channels[n][key]);for(const key of ['x','v'])assert(sums[key].lo.cmp(next[key])<=0&&sums[key].hi.cmp(next[key])>=0,'account contains retained exact total');
 t=t.add(h);const snapshot={cell:k+1,time:t.toString(),total:{x:next.x.toString(),v:next.v.toString()},channels:Object.fromEntries(names.map(n=>[n,{x:channels[n].x.out(),v:channels[n].v.out(),velocitySharePercent:channels[n].v.div(next.v).mul(100).out()}])),sum:{x:sums.x.out(),v:sums.v.out()}};
 if(k<r.rows.length-1)lastAccepted=snapshot;else rejectedCandidate=snapshot;incoming=next;
}
const result={knownFirst,input,SHA256:crypto.createHash('sha256').update(bytes).digest('hex'),grade:'validated channel account of a fixed conditional proof bound; no actual error/fate attribution',lastAccepted,rejectedCandidate,passed:true};fs.writeFileSync(output,JSON.stringify(result,null,2),{flag:'wx'});console.log(JSON.stringify(result,null,2));

// Measured support feasibility only; original true-history errors are not supplied.
// Section 26 freezes law, preparation, receipt inputs and checkpoints before use.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {History,knownControls,diagnostic,norm,dot,add,evaluate} from './maxwell-shaped-overnight-history-instrument.mjs';
import {preparation} from './maxwell-shaped-overnight-preparation.mjs';
const owner='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/';
const out='.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight-equation-domain/original-event-support-screen.json';
const known=knownControls();
const stationaryGap=(S)=>norm(add([1,0],[1,0]))-(3-S);
assert(stationaryGap(0)===-1&&stationaryGap(1)===0&&stationaryGap(2)===1);
known.push({case:'stationary mirror pair; receiving T3/radius1; gap S-1',passed:true});
console.log(JSON.stringify({known,passed:true,stage:'known-before-target'}));
if(process.argv.includes('--known'))process.exit(0);
assert(!fs.existsSync(out),'do not overwrite a retained target');
const cases=[];
for(const law of ['E','full']){
  const input=owner+`b03-${law}-checked-event999-h0.00125.history.json`;
  const raw=JSON.parse(fs.readFileSync(input,'utf8'));
  const prep=preparation(.3,law),history=new History(prep.past,raw.knots[0]);
  for(const knot of raw.knots.slice(1))history.append(knot);
  const final=raw.knots.at(-1).t;
  const checkpoints=law==='E'?[35,37,58,final]:[35,37,final];
  const rows=checkpoints.map(t=>{
    const j=history.at(t),k={t,...j},d=diagnostic(history,k,law,2e-14);
    const a=evaluate(history,j.x,j.v,t,law,2e-14).aNow;
    return {x:j.x,v:j.v,retainedA:j.a,selectedA:a,signedWork:2*dot(j.v,a),...d};
  });
  const j=history.at(final),endpointGaps=[35,37].map(S=>({S,gap:norm(add(j.x,history.at(S).x))-(final-S)}));
  cases.push({law,beta:.3,K:1,cf:1,input,completePreparation:prep.specification,rows,finalEndpointGaps:endpointGaps});
}
fs.writeFileSync(out,JSON.stringify({grade:'measured central retained-curve support screen; no exact-launch tube or event certificate',known,cases},null,2),{flag:'wx'});
console.log(JSON.stringify({out,cases},null,2));

// Restriction only: no response, root or error inequality is recomputed.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');

export function restrictPrefix(subject,rows,horizon,assessment,hashes){
  const H=Q.of(horizon),L=Q.of(subject.final.t);
  assert(assessment.acceptedPrefix===true,'independently assessed prefix required');
  assert(Q.of(assessment.initialFace).cmp(0)===0&&!subject.completedPrefix,'complete launch inventory required');
  assert(assessment.law===subject.law,'assessment law binding');
  for(const key of ['subjectSHA','rowsSHA','inputSHA'])assert(assessment[key]===hashes[key],`assessment ${key} binding`);
  assert(subject.inputSHA===hashes.inputSHA,'complete comparison byte binding');
  assert(Q.of(assessment.lastCovered).cmp(L)===0,'assessed covered endpoint');
  assert(rows.length===subject.bins&&rows.length>0,'complete completed-bin inventory');
  assert(H.cmp(0)>0&&H.cmp(L)<=0,'horizon within assessed coverage');
  let prior=Q.of(0);const kept=[];
  for(const row of rows){
    const right=Q.of(row.t);assert(right.cmp(prior)>0,'strict completed receiving partition');
    for(const key of ['x','v','a','prefixA'])assert(Q.of(row[key]).cmp(0)>=0,'nonnegative error');
    assert(Q.of(row.prefixA).cmp(row.a)>=0,'whole-prefix acceleration error');
    assert(Q.of(row.D.lo).cmp(0)>0&&Q.of(row.R.lo).cmp(0)>0&&Q.of(row.radiusLower).cmp(0)>0,'positive ordinary-domain geometry');
    assert(Q.of(row.speedUpper).cmp(1)<0,'strict receiving-speed margin');
    for(const key of ['S','initialSourceWindow'])assert(Q.of(row[key].hi).cmp(prior)<0,'strict completed source reach');
    if(prior.cmp(H)<0){
      const end=right.cmp(H)>0?H:right;
      kept.push({...row,t:end.toString(),restriction:{parentCellLeft:prior.toString(),parentCellRight:right.toString(),boundsUnchanged:true}});
    }
    prior=right;
  }
  assert(prior.cmp(L)===0&&Q.of(kept.at(-1).t).cmp(H)===0,'exact complete restricted coverage');
  const finalRow=kept.at(-1),final=Object.fromEntries(['t','x','v','a','prefixA'].map(key=>[key,finalRow[key]]));
  const result={...subject,horizon:H.toString(),bins:kept.length,totalBins:kept.length,final,firstFailure:null,
    restriction:{parentResultSHA:hashes.subjectSHA,parentRowsSHA:hashes.rowsSHA,assessmentSHA:hashes.assessmentSHA,
      parentRequestedHorizon:subject.horizon,parentCoveredEndpoint:L.toString(),inheritedFailure:subject.firstFailure,
      scope:'unchanged whole-bin bounds restricted to independently assessed completed launch prefix; no later coverage'},
    grade:'derived restriction of independently accepted original-prefix certificate; inherited extension failure preserved'};
  return {result,rows:kept};
}

export function known(){
  assert(digest(Buffer.from('abc'))==='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const hashes={subjectSHA:'subject',rowsSHA:'rows',inputSHA:'input',assessmentSHA:'review'},
    rows=[1,2,3].map(t=>({t:String(t),x:'.01',v:'.02',a:'.03',prefixA:'.04',S:{lo:'-2',hi:'-1'},
      initialSourceWindow:{lo:'-3',hi:'-.5'},D:{lo:'.5',hi:'1.5'},R:{lo:'1',hi:'6'},radiusLower:'1',speedUpper:'.5'})),
    failure={message:'next proof box rejected',lastCompleted:'3'},subject={law:'full',inputSHA:'input',horizon:'4',bins:3,
      final:{t:'3'},firstFailure:failure},assessment={acceptedPrefix:true,...hashes,lastCovered:'3',initialFace:'0',law:'full'};
  const clipped=restrictPrefix(subject,rows,'3/2',assessment,hashes);
  assert(clipped.rows.length===2&&Q.of(clipped.rows.at(-1).t).cmp('3/2')===0);
  assert(clipped.rows.at(-1).x===rows[1].x&&clipped.result.restriction.inheritedFailure===failure);
  assert(clipped.result.restriction.parentRequestedHorizon==='4'&&clipped.result.firstFailure===null);
  assert(restrictPrefix(subject,rows,2,assessment,hashes).rows.length===2);
  assert.throws(()=>restrictPrefix(subject,rows,4,assessment,hashes),/coverage/);
  assert.throws(()=>restrictPrefix(subject,rows,2,{...assessment,acceptedPrefix:false},hashes));
  assert.throws(()=>restrictPrefix(subject,rows,2,{...assessment,rowsSHA:'wrong'},hashes));
  assert.throws(()=>restrictPrefix(subject,rows,2,{...assessment,initialFace:1},hashes));
  assert.throws(()=>restrictPrefix(subject,[rows[1],rows[0],rows[2]],2,assessment,hashes));
  assert.throws(()=>restrictPrefix(subject,[{...rows[0],speedUpper:'1'},...rows.slice(1)],2,assessment,hashes));
  return {passed:true,cases:['SHA abc','exact interior clipping and face clipping','verbatim bound preservation',
    'explicit inherited failure','outside coverage rejection','unaccepted/wrong hash/nonzero initial face rejection',
    'unordered row rejection','failed strict-domain rejection']};
}

if(process.argv[1]?.endsWith('maxwell-shaped-overnight-prefix-restriction.mjs')){
  const args=Object.fromEntries(process.argv.slice(2).filter((x,j)=>j%2===0).map((x,j)=>[x.slice(2),process.argv[3+2*j]]));
  const controls=known(),producerSHA=digest(fs.readFileSync(process.argv[1]));console.log(JSON.stringify({known:controls,producerSHA,targetReads:0}));
  if(args.subject){
    assert(args.out&&!fs.existsSync(args.out)&&!fs.existsSync(args.out+'.jsonl'),'fresh result and row paths required');
    assert(args.assessment&&args.horizon,'assessment and frozen horizon required');
    const subjectBytes=fs.readFileSync(args.subject),subject=JSON.parse(subjectBytes),rowBytes=fs.readFileSync(args.subject+'.jsonl'),
      rows=rowBytes.toString().trim().split('\n').map(JSON.parse),inputBytes=fs.readFileSync(subject.input),
      reviewBytes=fs.readFileSync(args.assessment),assessment=JSON.parse(reviewBytes),
      hashes={subjectSHA:digest(subjectBytes),rowsSHA:digest(rowBytes),inputSHA:digest(inputBytes),assessmentSHA:digest(reviewBytes)},
      restricted=restrictPrefix(subject,rows,args.horizon,assessment,hashes);
    restricted.result.restriction.parentResult=args.subject;restricted.result.restriction.assessment=args.assessment;
    restricted.result.restriction.adapterSHA=producerSHA;restricted.result.restriction.knownFirst=controls;
    fs.writeFileSync(args.out+'.jsonl',restricted.rows.map(row=>JSON.stringify(row)).join('\n')+'\n');
    fs.writeFileSync(args.out,JSON.stringify(restricted.result,null,2)+'\n');
    console.log(JSON.stringify({out:args.out,horizon:restricted.result.horizon,bins:restricted.rows.length,inheritedFailure:subject.firstFailure}));
  }
}

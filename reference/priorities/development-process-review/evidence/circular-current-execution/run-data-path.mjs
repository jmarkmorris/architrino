// Bounded manifest/analytic-proof/EOF transport probe. No pair command is sent.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { runWatched } from '../../../../../scripts/eom/prepare-f5-enclosed-root.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known SHA-256 control passed before target bindings.');
const root=process.cwd(),base=path.join(root,'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/current-data-path-20260908');
const review=JSON.parse(readFileSync('reference/priorities/development-process-review/evidence/circular-current-execution/v3-build-review.json'));
const bound=p=>{const raw=readFileSync(p);return{path:p,sha256:hash(raw),bytes:raw.length};};
assert.equal(bound(review.preparation.path).sha256,review.preparation.sha256);
const exe=path.resolve(review.executable.path);assert.equal(bound(exe).sha256,review.executable.sha256);
const proof=path.join(root,'scripts/eom/verify-subfield-circular-history.mjs');
assert.equal(bound(proof).sha256,'b2fc83aa828ac9f175d7c3ae7bf43b66fcda54a702de6f2f80812852aebd5f38');
mkdirSync(base);const manifest=path.join(base,'history-manifest.json'),conformance=path.join(base,'conformance.json'),rows=path.join(base,'zero-rows.ndjson');
const candidate='coincident-midpoint-common-frequency';const options=['--repo-root',root,'--candidate',candidate,'--rung','2','--phase','0'];
const began=performance.now(),stages=[];let failure;
try{
 for(const [stage,command,args]of[
  ['manifest',exe,['manifest',...options,'--out',manifest]],
  ['independent-whole-manifest-proof',process.execPath,[proof,'--manifest',manifest,'--rung','2','--phase','0','--out',conformance]],
  ['serve-eof-no-pairs',exe,['serve',...options,'--out',rows,'--history-manifest',manifest,'--conformance',conformance]]]){
  const remaining=120000-(performance.now()-began);assert.ok(remaining>0);
  const logPath=path.join(base,stage+'.log');console.log(JSON.stringify({stage,status:'starting',rootRequests:0}));
  const result=await runWatched(command,args,{cwd:root,stage,logPath,limitMs:remaining,heartbeatMs:15000});
  stages.push({...result,log:bound(logPath)});assert.equal(result.code,0);assert.equal(result.processGroupClosed,true);
 }
 const result=JSON.parse(readFileSync(conformance));assert.equal(result.accepted,true);assert.equal(result.actualCarrierValidated,true);assert.equal(result.h3EvidenceEligible,false);
 const text=readFileSync(path.join(base,'serve-eof-no-pairs.log'),'utf8');
 assert.match(text,/"event":"prepared"/);assert.match(text,/"event":"stopped"/);assert.doesNotMatch(text,/"event":"row-started"/);
 assert.equal(readFileSync(rows).length,0);assert.equal(bound(exe).sha256,review.executable.sha256);
}catch(e){failure=e.message;throw e;}finally{
 writeFileSync(path.join(base,'data-path-review.json'),JSON.stringify({schema:'development-process-review/circular-current-data-path.v1',
  completed:!failure,failure,build:review.preparation,executable:review.executable,stages,
  elapsedSeconds:(performance.now()-began)/1000,rootRequests:0,rootPilotAccepted:false,phaseLedgerAccepted:false,h3EvidenceEligible:false,
  claimBoundary:'Current manifest and analytic proof plus EOF-only serve protocol. No exact-pair calculation or full pilot/ledger admission.'},null,2)+'\n');
}

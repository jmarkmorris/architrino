import test from 'node:test';
import assert from 'node:assert/strict';
import {PLAN,quotedDigest,appendixPaths,validateCoverage,validateDocument} from '../scripts/equation-mapping/check-current-source-dispositions.mjs';
const known=()=>({path:'known.js',disposition:'retained',owner:'known independent control',reason:'fixture identity',roles:[{binding:'literal',targets:['abc'],meaning:'known hash answer',selection:'fixed',consumer:'control',independentCheck:'published SHA answer'}]});
test('known quoted digest and appendix controls reject long decimal false positives',()=>{
 assert.equal(quotedDigest('"'+'a'.repeat(64)+'"'),true);
 assert.equal(quotedDigest("'"+'0'.repeat(64)+"'"),true);
 assert.equal(quotedDigest('"0.'+'1'.repeat(90)+'"'),false);
 assert.equal(quotedDigest('"'+'a'.repeat(65)+'"'),false);
 assert.deepEqual(appendixPaths('heading\n## Exact candidate-file census\n- [known.js](../known.js)\n'),['known.js']);
 assert.throws(()=>appendixPaths('no appendix'));
});
test('every original and discovered candidate needs an explicit final disposition',()=>{
 assert.equal(validateCoverage(['known.js'],[known()],{liveCandidates:['known.js']}).dispositionRows,1);
 assert.throws(()=>validateCoverage(['absent.js'],[known()]),/Unclassified/);
 assert.throws(()=>validateCoverage(['known.js'],[known()],{liveCandidates:['new.js']}),/Unclassified/);
 assert.throws(()=>validateCoverage(['known.js'],[known(),known()]),/Duplicate/);
 for(const patch of [{disposition:'pending'},{owner:''},{reason:''},{roles:[]},{roles:[{}]},{path:'../escape'}])
  assert.throws(()=>validateCoverage(['known.js'],[{...known(),...patch}]));
});
test('document preserves exact original census separately from discovered owners',()=>{
 const document={schema:'option-b-remaining-binding-dispositions/v1',appendix:PLAN,candidateCount:1,candidates:[known()],additionalOwners:[]};
 assert.equal(validateDocument(['known.js'],document).discoveryFiles,1);
 for(const patch of [{schema:'other'},{appendix:'other'},{candidateCount:2},{candidates:[],additionalOwners:[known()]}])assert.throws(()=>validateDocument(['known.js'],{...document,...patch}));
 for(const field of ['binding','targets','meaning','selection','consumer','independentCheck']){
  const row=known();delete row.roles[0][field];assert.throws(()=>validateCoverage(['known.js'],[row]));
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {PLAN,quotedDigest,appendixPaths,validateCoverage,validateDocument,validatePresence,fileState,validateDecisionAnchor} from '../scripts/equation-mapping/check-current-source-dispositions.mjs';
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
 const document={schema:'option-b-remaining-binding-dispositions/v2',appendix:PLAN,candidateCount:1,candidates:[known()],additionalOwners:[]};
 assert.equal(validateDocument(['known.js'],document).discoveryFiles,1);
 for(const patch of [{schema:'other'},{appendix:'other'},{candidateCount:2},{candidates:[],additionalOwners:[known()]}])assert.throws(()=>validateDocument(['known.js'],{...document,...patch}));
 for(const field of ['binding','targets','meaning','selection','consumer','independentCheck']){
  const row=known();delete row.roles[0][field];assert.throws(()=>validateCoverage(['known.js'],[row]));
 }
});

const retired=()=>({...known(),disposition:'retired',reason:'Known responsibility moved to successor',retirement:{authority:'operator-approved',decision:'decision.md#known-retirement',outcome:'replaced',replacements:['successor.js'],verification:'Known successor preserves the original obligation'}});
test('known retirement preserves census and requires explicit authority, outcome and replacement',()=>{
 const row=retired();
 assert.equal(validateCoverage(['known.js'],[row]).retiredRows,1);
 const doc={schema:'option-b-remaining-binding-dispositions/v2',appendix:PLAN,candidateCount:1,candidates:[row],additionalOwners:[]};
 assert.equal(validateDocument(['known.js'],doc).discoveryFiles,1);
 assert.throws(()=>validateDocument(['known.js'],{...doc,schema:'option-b-remaining-binding-dispositions/v1'}),/schema/);
 for(const patch of [{retirement:undefined},{retirement:{}},{retirement:{...row.retirement,authority:'self-approved'}},{retirement:{...row.retirement,decision:'decision.md'}},{retirement:{...row.retirement,decision:'../decision.md#known'}},{retirement:{...row.retirement,decision:'decision.md#known#extra'}},{retirement:{...row.retirement,verification:''}},{retirement:{...row.retirement,replacements:[]}},{retirement:{...row.retirement,replacements:['known.js']}},{retirement:{...row.retirement,replacements:['successor.js','successor.js']}},{retirement:{...row.retirement,replacements:['../escape']}},{retirement:{...row.retirement,replacements:['dir\\escape']}},{retirement:{...row.retirement,outcome:'ended'}}])
  assert.throws(()=>validateCoverage(['known.js'],[{...row,...patch}]));
 assert.throws(()=>validateCoverage(['known.js'],[row],{liveCandidates:['known.js']}),/still a live candidate/);
 assert.throws(()=>validateCoverage(['known.js'],[row],{liveCandidates:['unknown.js']}),/Unclassified/);
 assert.throws(()=>validateCoverage(['known.js'],[row,{...retired(),path:'successor.js',retirement:{...row.retirement,outcome:'ended',replacements:[]}}]),/replacement is retired/);
 assert.throws(()=>validateCoverage(['known.js'],[{...known(),retirement:row.retirement}]),/Live disposition/);
 assert.equal(validateCoverage(['known.js'],[{...row,retirement:{...row.retirement,outcome:'ended',replacements:[]}}]).retiredRows,1);
});
test('retirement requires absent old files and regular canonical decisions and replacements',t=>{
 const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'option-b-retirement-')));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 const row=retired(),state=p=>fileState(root,p),read=p=>fs.readFileSync(path.join(root,p),'utf8');
 fs.writeFileSync(path.join(root,'decision.md'),'# Known retirement\n');
 fs.writeFileSync(path.join(root,'successor.js'),'// known successor\n');
 validatePresence([row],state,read);
 // A removed live file is still an error; a retired file reappearing without a hash is also an error.
 assert.throws(()=>validatePresence([known()],state,read),/absent/);
 fs.writeFileSync(path.join(root,'known.js'),'// no digest\n');
 assert.throws(()=>validatePresence([row],state,read),/still present/);
 fs.unlinkSync(path.join(root,'known.js'));
 fs.symlinkSync('missing.js',path.join(root,'known.js'));
 assert.throws(()=>validatePresence([row],state,read),/still present/);
 fs.unlinkSync(path.join(root,'known.js'));
 fs.renameSync(path.join(root,'successor.js'),path.join(root,'actual.js'));
 assert.throws(()=>validatePresence([row],state,read),/replacement file absent/);
 fs.symlinkSync('actual.js',path.join(root,'successor.js'));
 assert.throws(()=>validatePresence([row],state,read),/noncanonical/);
 fs.unlinkSync(path.join(root,'successor.js'));
 fs.mkdirSync(path.join(root,'successor.js'));
 assert.throws(()=>validatePresence([row],state,read),/noncanonical/);
 fs.rmdirSync(path.join(root,'successor.js'));
 fs.renameSync(path.join(root,'actual.js'),path.join(root,'successor.js'));
 fs.unlinkSync(path.join(root,'decision.md'));
 assert.throws(()=>validatePresence([row],state,read),/decision/);
});
test('decision anchors reject absent, duplicate and example-only sections',()=>{
 validateDecisionAnchor('# Known retirement\n','known-retirement');
 assert.throws(()=>validateDecisionAnchor('# Different\n','known-retirement'),/uniquely/);
 assert.throws(()=>validateDecisionAnchor('# Known retirement\n## Known retirement\n','known-retirement'),/uniquely/);
 for(const source of ['```md\n# Known retirement\n```\n','~~~~\n# Known retirement\n~~~\n','<!--\n# Known retirement\n-->\n'])
  assert.throws(()=>validateDecisionAnchor(source,'known-retirement'),/uniquely/);
 validateDecisionAnchor('```md\n# Known retirement\n```\n## Known retirement\n','known-retirement');
 assert.throws(()=>validateDecisionAnchor('```\n<!--\n```\n<!-- -->\n```\n# Known retirement\n```\n','known-retirement'),/uniquely/);
 assert.throws(()=>validateDecisionAnchor('<!-- --># Known retirement\n','known-retirement'),/uniquely/);
 validateDecisionAnchor('<!--\n```\n-->\n# Known retirement\n','known-retirement');
});
test('non-directory ancestors are errors, not proof of retirement',t=>{
 const root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'option-b-retirement-')));
 t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
 fs.writeFileSync(path.join(root,'parent'),'not a directory');
 assert.throws(()=>fileState(root,'parent/old.js'),{code:'ENOTDIR'});
});

#!/usr/bin/env node
// Inventory accounting only: semantic role acceptance belongs to the named
// independent review. This check does not authenticate scientific results.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

export const ROOT=path.resolve(fileURLToPath(new URL('../../',import.meta.url)));
export const PLAN='reference/priorities/development-process-review/analysis/option-b-remaining-migration-plan.md';
export const DISPOSITIONS='reference/priorities/development-process-review/evidence/option-b-remaining-binding-dispositions.json';
export const quotedDigest=source=>/(?<=["'])[a-f0-9]{64}(?=["'])/u.test(source);
export function appendixPaths(source){
 const appendix=source.split('## Exact candidate-file census\n');
 assert.equal(appendix.length,2,'Exact migration discovery appendix required');
 const paths=[...appendix[1].matchAll(/^- \[([^\]\n]+)\]\([^\n]+\)$/gmu)].map(m=>m[1]);
 assert.ok(paths.length>0,'Empty migration discovery appendix');
 assert.equal(new Set(paths).size,paths.length,'Duplicate discovery path');return paths;
}
const text=x=>typeof x==='string'&&x.trim().length>0;
export function validateCoverage(discovery,rows,{liveCandidates=[]}={}){
 assert.ok(Array.isArray(rows),'Disposition rows required');
 const seen=new Map();
 for(const row of rows){
  assert.ok(text(row.path)&&!path.isAbsolute(row.path)&&!row.path.split('/').some(p=>p==='..'||p===''),'Canonical disposition path required');
  assert.ok(!seen.has(row.path),'Duplicate disposition: '+row.path);seen.set(row.path,row);
  assert.ok(['migrated','retained','out-of-scope'].includes(row.disposition),'Unresolved disposition: '+row.path);
  assert.ok(text(row.owner)&&text(row.reason),'Named owner and reason required: '+row.path);
  assert.ok(Array.isArray(row.roles)&&row.roles.length>0,'Explicit binding roles required: '+row.path);
  for(const role of row.roles){
   assert.ok(role&&['binding','meaning','selection','consumer','independentCheck'].every(key=>text(role[key])),'Complete role evidence required: '+row.path);
   assert.ok(Array.isArray(role.targets)&&role.targets.length>0&&role.targets.every(text),'Explicit role targets required: '+row.path);
  }
 }
 for(const p of new Set([...discovery,...liveCandidates]))assert.ok(seen.has(p),'Unclassified candidate: '+p);
 return {discoveryFiles:discovery.length,liveCandidateFiles:liveCandidates.length,dispositionRows:rows.length,
  authority:'inventory-accounting-only; role correctness requires independent review'};
}
export function validateDocument(discovery,document,options={}){
 assert.equal(document?.schema,'option-b-remaining-binding-dispositions/v1','Disposition schema required');
 assert.equal(document.appendix,PLAN,'Exact discovery owner required');
 assert.equal(document.candidateCount,discovery.length,'Exact discovery count required');
 assert.ok(Array.isArray(document.candidates)&&Array.isArray(document.additionalOwners),'Separate candidate and additional-owner arrays required');
 assert.deepEqual(document.candidates.map(row=>row.path),discovery,'Exact ordered discovery census required');
 return validateCoverage(discovery,[...document.candidates,...document.additionalOwners],options);
}
export function inspectCoverage({root=ROOT,document}={}){
 // Known controls run first, including the long-decimal false-positive case.
 assert.ok(quotedDigest('"'+'a'.repeat(64)+'"'));
 assert.equal(quotedDigest('"0.'+'1'.repeat(90)+'"'),false);
 assert.deepEqual(appendixPaths('## Exact candidate-file census\n- [known.js](known.js)\n'),['known.js']);
 validateCoverage(['known.js'],[{path:'known.js',disposition:'retained',owner:'known control',reason:'fixed fixture',roles:[{binding:'literal',targets:['abc'],meaning:'known control',selection:'fixed',consumer:'control',independentCheck:'known SHA answer'}]}]);
 const discovery=appendixPaths(fs.readFileSync(path.join(root,PLAN),'utf8'));
 assert.equal(discovery.length,157,'Original finite discovery census changed');
 document??=JSON.parse(fs.readFileSync(path.join(root,DISPOSITIONS),'utf8'));
 const listing=execFileSync('rg',['--files','scripts','src','apps','.github','.githooks','tests','-g','*.{mjs,js,py,sh,cpp,h,hpp,ts,tsx,yml,yaml}'],{cwd:root,encoding:'utf8'});
 const liveCandidates=listing.trim().split('\n').filter(Boolean).filter(p=>quotedDigest(fs.readFileSync(path.join(root,p),'utf8')));
 const rows=[...(document.candidates??[]),...(document.additionalOwners??[])];
 const report=validateDocument(discovery,document,{liveCandidates});
 for(const row of rows)assert.ok(fs.existsSync(path.join(root,row.path)),'Disposition owner file absent: '+row.path);
 return {...report,claimBoundary:'No launch, scientific, publication or universal repository-health acceptance.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{assert.equal(process.argv.length,2,'No implicit refresh options');console.log(JSON.stringify(inspectCoverage(),null,2));}
 catch(error){console.error('[option-b-dispositions] '+error.message);process.exitCode=1;}
}

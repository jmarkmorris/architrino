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
const canonicalPath=p=>text(p)&&!path.isAbsolute(p)&&!/[\\\0#]/u.test(p)&&!p.split('/').some(part=>['','.', '..'].includes(part));
export function validateCoverage(discovery,rows,{liveCandidates=[]}={}){
 assert.ok(Array.isArray(rows),'Disposition rows required');
 const seen=new Map();
 for(const row of rows){
  assert.ok(canonicalPath(row.path),'Canonical disposition path required');
  assert.ok(!seen.has(row.path),'Duplicate disposition: '+row.path);seen.set(row.path,row);
  assert.ok(['migrated','retained','out-of-scope','retired'].includes(row.disposition),'Unresolved disposition: '+row.path);
  assert.ok(text(row.owner)&&text(row.reason),'Named owner and reason required: '+row.path);
  assert.ok(Array.isArray(row.roles)&&row.roles.length>0,'Explicit binding roles required: '+row.path);
  for(const role of row.roles){
   assert.ok(role&&['binding','meaning','selection','consumer','independentCheck'].every(key=>text(role[key])),'Complete role evidence required: '+row.path);
   assert.ok(Array.isArray(role.targets)&&role.targets.length>0&&role.targets.every(text),'Explicit role targets required: '+row.path);
  }
  if(row.disposition==='retired'){
   const r=row.retirement;
   assert.ok(r&&r.authority==='operator-approved','Retirement authority required: '+row.path);
   assert.ok(text(r.decision),'Retirement decision required: '+row.path);
   const [decision,anchor,...extra]=r.decision.split('#');
   assert.ok(canonicalPath(decision)&&text(anchor)&&extra.length===0,'Exact retirement decision anchor required: '+row.path);
   assert.ok(['replaced','ended'].includes(r.outcome)&&text(r.verification),'Retirement outcome and verification required: '+row.path);
   assert.ok(Array.isArray(r.replacements)&&r.replacements.every(canonicalPath),'Canonical retirement replacements required: '+row.path);
   assert.equal(new Set(r.replacements).size,r.replacements.length,'Duplicate retirement replacement: '+row.path);
   assert.ok(!r.replacements.includes(row.path),'Self retirement replacement: '+row.path);
   assert.equal(r.replacements.length>0,r.outcome==='replaced','Retirement replacement/outcome mismatch: '+row.path);
   assert.ok(!liveCandidates.includes(row.path),'Retired path is still a live candidate: '+row.path);
  }else assert.equal(row.retirement,undefined,'Live disposition cannot carry retirement: '+row.path);
 }
 for(const row of rows.filter(row=>row.disposition==='retired'))for(const replacement of row.retirement.replacements)
  assert.notEqual(seen.get(replacement)?.disposition,'retired','Retirement replacement is retired: '+replacement);
 for(const p of new Set([...discovery,...liveCandidates]))assert.ok(seen.has(p),'Unclassified candidate: '+p);
 return {discoveryFiles:discovery.length,liveCandidateFiles:liveCandidates.length,dispositionRows:rows.length,retiredRows:rows.filter(row=>row.disposition==='retired').length,
  authority:'inventory-accounting-only; role correctness requires independent review'};
}
export function validateDocument(discovery,document,options={}){
 assert.equal(document?.schema,'option-b-remaining-binding-dispositions/v2','Disposition schema required');
 assert.equal(document.appendix,PLAN,'Exact discovery owner required');
 assert.equal(document.candidateCount,discovery.length,'Exact discovery count required');
 assert.ok(Array.isArray(document.candidates)&&Array.isArray(document.additionalOwners),'Separate candidate and additional-owner arrays required');
 assert.deepEqual(document.candidates.map(row=>row.path),discovery,'Exact ordered discovery census required');
 return validateCoverage(discovery,[...document.candidates,...document.additionalOwners],options);
}
// Filesystem checks complement the review declarations; they do not grant approval.
export function fileState(root,relative){
 const filename=path.join(root,relative);
 try{
  const stat=fs.lstatSync(filename);
  return {exists:true,regular:stat.isFile(),canonical:stat.isFile()&&fs.realpathSync(filename)===filename};
 }catch(error){if(error.code==='ENOENT')return {exists:false};throw error;}
}
// Decision records use plain ASCII ATX headings; reject ambiguous sections.
// Ignore examples in fenced code and HTML comments, not merely matching text.
export function validateDecisionAnchor(source,anchor){
 let fence=null,comment=false,count=0;
 for(const line of source.split(/\r?\n/u)){
  if(fence){if(new RegExp('^ {0,3}'+fence.char+'{'+fence.length+',}\\s*$','u').test(line))fence=null;continue;}
  const opening=!comment&&/^ {0,3}(`{3,}|~{3,})/u.exec(line);
  if(opening){fence={char:opening[1][0],length:opening[1].length};continue;}
  // Comment syntax inside a fence is literal. Outside fences, exclude every
  // comment-bearing line so removing comments cannot manufacture a heading.
  let offset=0,commentLine=comment;
  while(offset<line.length){
   const at=line.indexOf(comment?'-->':'<!--',offset);
   if(at<0)break;
   offset=at+(comment?3:4);comment=!comment;commentLine=true;
  }
  if(commentLine)continue;
  const heading=/^#{1,6} +([A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*) *$/u.exec(line);
  if(heading&&heading[1].toLowerCase().replace(/ +/gu,'-')===anchor)count++;
 }
 assert.equal(count,1,'Retirement decision anchor must resolve uniquely: '+anchor);
}
export function validatePresence(rows,state,read){
 const required=p=>{const s=state(p);assert.ok(s.exists&&s.regular&&s.canonical,'Live disposition/decision/replacement file absent or noncanonical: '+p);};
 for(const row of rows){
  if(row.disposition!=='retired'){required(row.path);continue;}
  assert.equal(state(row.path).exists,false,'Retired file still present: '+row.path);
  const [decision,anchor]=row.retirement.decision.split('#');
  required(decision);
  validateDecisionAnchor(read(decision),anchor);
  for(const replacement of row.retirement.replacements)required(replacement);
 }
}
export function inspectCoverage({root=ROOT,document}={}){
 root=fs.realpathSync(root);
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
 validatePresence(rows,p=>fileState(root,p),p=>fs.readFileSync(path.join(root,p),'utf8'));
 return {...report,claimBoundary:'No launch, scientific, publication or universal repository-health acceptance.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{assert.equal(process.argv.length,2,'No implicit refresh options');console.log(JSON.stringify(inspectCoverage(),null,2));}
 catch(error){console.error('[option-b-dispositions] '+error.message);process.exitCode=1;}
}

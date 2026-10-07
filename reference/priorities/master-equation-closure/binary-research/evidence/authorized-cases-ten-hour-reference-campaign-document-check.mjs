import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';
import katex from 'katex';
import {mathSpans} from '../../../../../scripts/lib/markdown-math-spans.mjs';
import {extractMarkdownLinks} from '../../../../../scripts/lib/markdown-link-audit.mjs';

const SELF=fileURLToPath(import.meta.url), DIR=path.dirname(SELF);
const PREFIX='authorized-cases-ten-hour-', BASE=PREFIX+'reference-campaign-document';
const ROOT='reference/priorities/master-equation-closure';
const LOCAL='.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const lines=b=>{const s=b.toString();return s.length?s.split('\n').length-(s.endsWith('\n')?1:0):0;};
const blank=s=>s.replace(/[^\r\n]/g,' ');
function codeMask(raw){
  const code=[];marked.walkTokens(marked.lexer(raw),t=>{if(t.type==='code'||t.type==='codespan')code.push(t.raw);});
  let s=raw;for(const q of code.sort((a,b)=>b.length-a.length))s=s.split(q).join(blank(q));return s;
}
function inspect(raw,file,exists=fs.existsSync){
  const defects=[],warnings=[],codeFree=codeMask(raw),spans=mathSpans(codeFree);
  const lineAt=i=>raw.slice(0,i).split('\n').length;
  for(const s of spans){try{katex.renderToString(s.body,{throwOnError:true,strict:false,displayMode:codeFree.startsWith('$$',s.start)||codeFree.startsWith('\\[',s.start)});}catch(e){defects.push({type:'math',line:lineAt(s.start),message:e.message});}}
  let prose=codeFree;for(const s of [...spans].reverse())prose=prose.slice(0,s.start)+blank(prose.slice(s.start,s.end))+prose.slice(s.end);
  const links=[];marked.walkTokens(marked.lexer(prose),t=>{if(t.type==='link'||t.type==='image')links.push({target:t.href,raw:t.raw});});
  let local=0,anchors=0;
  for(const l of links){
    if(/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(l.target))continue;
    local++;const [base,fragment]=l.target.split('#');if(fragment)anchors++;
    let dest;try{dest=base?path.resolve(path.dirname(file),decodeURIComponent(base.split('?')[0])):path.resolve(file);}catch{defects.push({type:'link-encoding',target:l.target});continue;}
    if(!exists(dest))defects.push({type:'missing-link-file',target:l.target,resolved:dest});
  }
  // Unpaired delimiters are diagnostics, not automatic TeX errors (currency is possible).
  for(const x of prose.matchAll(/(?<!\\)\$|\\[\[(]/g))warnings.push({type:'unpaired-math-delimiter-candidate',line:lineAt(x.index),token:x[0]});
  for(const [i,s] of raw.split('\n').entries()){
    if(/[ \t]+$/.test(s))defects.push({type:'trailing-whitespace',line:i+1});
    if(s.includes('\r'))defects.push({type:'carriage-return',line:i+1});
  }
  if(raw&&!raw.endsWith('\n'))defects.push({type:'missing-final-newline',line:raw.split('\n').length});
  return {mathSpans:spans.length,links:links.length,localLinks:local,anchorLinksNotValidated:anchors,defects,warnings};
}
function writeNew(p,obj){assert(!fs.existsSync(p),`Preserve existing ${p}`);fs.writeFileSync(p,JSON.stringify(obj,null,2)+'\n');}
function known(){
  const fixture='# Known\n\n[good](exists.md) [bad](missing.md) [anchor](exists.md#known)\n\n`[example](ignored.md) $\\badcommand$`\n\n~~~md\n[example](ignored.md) $\\badcommand$\n~~~\n\n```md\n[example](ignored.md)\n```\n\n    [indented](ignored.md)\n\n$F[q](t)$ and $x^2$ and \\(y+1\\).\n\n$$\\frac{1}{$$\n';
  const result=inspect(fixture,'/fixture/test.md',p=>p==='/fixture/exists.md');
  assert.equal(result.links,3);assert.equal(result.localLinks,3);assert.equal(result.anchorLinksNotValidated,1);
  assert.equal(result.mathSpans,4);assert.equal(result.defects.filter(x=>x.type==='math').length,1);
  assert.deepEqual(result.defects.filter(x=>x.type==='missing-link-file').map(x=>x.target),['missing.md']);
  assert.deepEqual(extractMarkdownLinks(codeMask('~~~\n[x](bad)\n~~~\n$F[q](t)$\n`[x](bad)`\n[x](good.md)')).map(x=>x.target),['good.md']);
  const refs=inspect('[ref][r]\n\n[r]: exists.md\n','/fixture/test.md',()=>true);assert.equal(refs.links,1);
  assert(inspect('$x\ntrailing \n','/fixture/test.md',()=>true).warnings.length===1);
  assert(inspect('bad\t\n','/fixture/test.md',()=>true).defects.some(x=>x.type==='trailing-whitespace'));
  const out={passed:true,time:new Date().toISOString(),instrumentSha256:sha(fs.readFileSync(SELF)),controls:['backtick, tilde, indented and inline code excluded','math application not a link','legitimate and broken local link distinguished','reference links retained','malformed TeX rejected','trailing whitespace and unmatched math diagnostic detected'],anchors:'Counted only; no renderer-aligned anchor implementation established.'};
  writeNew(path.join(DIR,BASE+'-known.json'),out);console.log(JSON.stringify(out));
}
function target(label){
  assert(/^[a-z0-9-]+$/.test(label));const knownPath=path.join(DIR,BASE+'-known.json');const kr=JSON.parse(fs.readFileSync(knownPath));assert(kr.passed&&kr.instrumentSha256===sha(fs.readFileSync(SELF)));
  const cmd=['--files','--hidden','--no-ignore','-g',PREFIX+'*',ROOT];
  const files=execFileSync('rg',cmd,{encoding:'utf8'}).trim().split('\n').filter(Boolean).sort();assert(files.every(f=>path.basename(f).startsWith(PREFIX)));
  const inventory=files.map(file=>{const b=fs.readFileSync(file);return {file,bytes:b.length,lines:lines(b),sha256:sha(b),extension:path.extname(file).toLowerCase()};});
  const documents=inventory.filter(x=>x.extension==='.md').map(x=>({...x,...inspect(fs.readFileSync(x.file,'utf8'),x.file)}));
  const machine=inventory.filter(x=>['.json','.jsonl','.ndjson','.csv','.tsv'].includes(x.extension));
  const changed=inventory.filter(x=>sha(fs.readFileSync(x.file))!==x.sha256).map(x=>x.file);
  const now=execFileSync('rg',cmd,{encoding:'utf8'}).trim().split('\n').filter(Boolean).sort();
  const additions=now.filter(f=>!files.includes(f)),removed=files.filter(f=>!now.includes(f));
  const summary={files:inventory.length,markdown:documents.length,bytes:inventory.reduce((s,x)=>s+x.bytes,0),lines:inventory.reduce((s,x)=>s+x.lines,0),mathSpans:documents.reduce((s,x)=>s+x.mathSpans,0),links:documents.reduce((s,x)=>s+x.links,0),localLinks:documents.reduce((s,x)=>s+x.localLinks,0),anchorLinksNotValidated:documents.reduce((s,x)=>s+x.anchorLinksNotValidated,0),defects:documents.flatMap(x=>x.defects.map(d=>({file:x.file,...d}))),warnings:documents.flatMap(x=>x.warnings.map(d=>({file:x.file,...d}))),machineFiles:machine.length,machineBytes:machine.reduce((s,x)=>s+x.bytes,0),machineLines:machine.reduce((s,x)=>s+x.lines,0),machineIndividualThresholds:machine.filter(x=>x.bytes>=(x.file.includes('/evidence/')?1048576:10485760)||x.lines>=(x.file.includes('/evidence/')?25000:100000)),changedDuringRead:changed,addedDuringRead:additions,removedDuringRead:removed};
  fs.mkdirSync(LOCAL,{recursive:true});const verbose=path.join(LOCAL,BASE+'-'+label+'-inventory.json');
  const full={time:new Date().toISOString(),scope:ROOT+'/**/'+PREFIX+'*; exact basename prefix; all current native files, not Git tracked-only',inventoryCommand:['rg',...cmd],instrumentSha256:kr.instrumentSha256,knownReceiptSha256:sha(fs.readFileSync(knownPath)),summary,inventory,documents,machine};writeNew(verbose,full);
  const b=fs.readFileSync(verbose),compact={time:full.time,scope:full.scope,instrumentSha256:kr.instrumentSha256,knownReceiptSha256:full.knownReceiptSha256,summary,verbose:{path:verbose,sha256:sha(b),bytes:b.length,lines:lines(b)},reproduction:`node ${path.relative(process.cwd(),SELF)} target NEW_UNIQUE_LABEL`,limitations:['Corpus syntax/binding validation only, not proof acceptance.','External links not fetched; local link files checked, anchors counted but not validated.','Machine footprint is the selected current working-tree prefix collection only, not whole-priority, staged-index or branch-growth retention compliance.','Snapshot precedes creation of this compact receipt and any later closeout note; later writes require another snapshot.']};
  const receipt=path.join(DIR,BASE+'-'+label+'-receipt.json');writeNew(receipt,compact);console.log(JSON.stringify({receipt,...summary},null,2));
}
if(process.argv[2]==='known')known();else{assert.equal(process.argv[2],'target');target(process.argv[3]);}

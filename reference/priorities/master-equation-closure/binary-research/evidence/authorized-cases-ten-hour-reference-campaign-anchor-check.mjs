import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {marked} from 'marked';
import {mathSpans} from '../../../../../scripts/lib/markdown-math-spans.mjs';
import {normalizeMarkdownKey,extractMarkdownSection,parseMarkdownHeading} from '../../../../../src/services/MarkdownPolicyService.js';
const SELF=fileURLToPath(import.meta.url),DIR=path.dirname(SELF),BASE='authorized-cases-ten-hour-reference-campaign-anchor';
const ROOT='reference/priorities/master-equation-closure',LOCAL='.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/reference';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const blank=s=>s.replace(/[^\r\n]/g,' ');
function codeMask(raw){const code=[];marked.walkTokens(marked.lexer(raw),t=>{if(t.type==='code'||t.type==='codespan')code.push(t.raw);});let s=raw;for(const q of code.sort((a,b)=>b.length-a.length))s=s.split(q).join(blank(q));return s;}
function links(raw){let s=codeMask(raw);for(const m of [...mathSpans(s)].reverse())s=s.slice(0,m.start)+blank(s.slice(m.start,m.end))+s.slice(m.end);const out=[];marked.walkTokens(marked.lexer(s),t=>{if(t.type==='link'&&!/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(t.href)&&t.href.includes('#'))out.push({href:t.href,line:raw.slice(0,s.indexOf(t.raw)).split('\n').length});});return out;}
function assess(raw,fragment){const key=normalizeMarkdownKey(fragment),section=extractMarkdownSection(raw,fragment),real=[];for(const [i,line] of codeMask(raw).split(/\r?\n/).entries()){const h=parseMarkdownHeading(line);if(h&&normalizeMarkdownKey(h.title)===key)real.push({line:i+1,...h});}return {fragment,key,matched:!!section,selectedTitle:section?.title??null,realMatches:real,status:!section?'no-reader-section-match':real.length===0?'fenced-or-inline-artifact':real.length>1?'ambiguous-first-match':'unique-reader-section-match'};}
function write(p,v){assert(!fs.existsSync(p));fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');}
const knownPath=path.join(DIR,BASE+'-known.json');
if(process.argv[2]==='known'){
 assert.equal(assess('## Alpha, beta!\nx\n','alpha-beta').status,'unique-reader-section-match');
 const rep=assess('## Same\nfirst\n## Same\nsecond\n','same');assert.equal(rep.status,'ambiguous-first-match');assert.equal(extractMarkdownSection('## Same\nfirst\n## Same\nsecond','same').body,'first');
 assert.equal(assess('<a id="custom"></a>\n## Actual\nx\n','custom').status,'no-reader-section-match');
 assert.equal(assess('## Actual {#custom}\nx\n','custom').status,'no-reader-section-match');
 assert.equal(assess('## Energy $E^2$ & phase\nx\n','energy-e-2-phase').status,'unique-reader-section-match');
 assert.equal(assess('## 7.4 Result\nx\n','74-result').status,'no-reader-section-match');
 assert.equal(assess('#### Deep\nx\n','deep').status,'no-reader-section-match');
 assert.equal(assess('```md\n## Fake\nx\n```\n','fake').status,'fenced-or-inline-artifact');
 assert.deepEqual(links('```md\n[x](bad.md#x)\n```\n`[x](bad.md#x)`\n$F[q](t)$\n[good](good.md#yes)\n').map(x=>x.href),['good.md#yes']);
 const receipt={time:new Date().toISOString(),passed:true,instrumentSha256:sha(fs.readFileSync(SELF)),policySha256:sha(fs.readFileSync('src/services/MarkdownPolicyService.js')),controls:['actual helper punctuation and math normalization','first repeated heading selected and flagged','explicit HTML and attribute IDs unsupported','decimal-heading mismatch detected','level-four unsupported','actual helper fenced-heading false match detected','fenced/inline link examples and math applications excluded']};write(knownPath,receipt);console.log(JSON.stringify(receipt));
}else{
 assert.equal(process.argv[2],'target');const label=process.argv[3];assert(/^[a-z0-9-]+$/.test(label));const kr=JSON.parse(fs.readFileSync(knownPath));assert(kr.passed&&kr.instrumentSha256===sha(fs.readFileSync(SELF))&&kr.policySha256===sha(fs.readFileSync('src/services/MarkdownPolicyService.js')));
 const files=execFileSync('rg',['--files','--hidden','--no-ignore','-g','authorized-cases-ten-hour-*.md',ROOT],{encoding:'utf8'}).trim().split('\n').sort();const inventory=files.map(file=>({file,sha256:sha(fs.readFileSync(file))}));const rows=[];
 for(const {file} of inventory){for(const link of links(fs.readFileSync(file,'utf8'))){const p=link.href.indexOf('#'),base=link.href.slice(0,p),fragment=decodeURIComponent(link.href.slice(p+1));if(!fragment)continue;const target=base?path.normalize(path.join(path.dirname(file),decodeURIComponent(base.split('?')[0]))):file;const raw=fs.readFileSync(target,'utf8');rows.push({source:file,line:link.line,href:link.href,target,targetSha256:sha(raw),...assess(raw,fragment)});}}
 const result={time:new Date().toISOString(),instrumentSha256:kr.instrumentSha256,knownSha256:sha(fs.readFileSync(knownPath)),policySha256:kr.policySha256,scope:ROOT+'/**/authorized-cases-ten-hour-*.md',markdownFiles:files.length,links:rows.length,uniqueTargets:new Set(rows.map(r=>r.target+'#'+r.fragment)).size,statusCounts:Object.fromEntries([...new Set(rows.map(r=>r.status))].map(s=>[s,rows.filter(r=>r.status===s).length])),changedSources:inventory.filter(i=>i.sha256!==sha(fs.readFileSync(i.file))).map(i=>i.file),inventory,rows};
 const out=path.join(LOCAL,BASE+'-'+label+'.json');write(out,result);console.log(JSON.stringify({out,sha256:sha(fs.readFileSync(out)),links:result.links,uniqueTargets:result.uniqueTargets,statusCounts:result.statusCounts,defects:rows.filter(r=>r.status!=='unique-reader-section-match'),changedSources:result.changedSources},null,2));
}

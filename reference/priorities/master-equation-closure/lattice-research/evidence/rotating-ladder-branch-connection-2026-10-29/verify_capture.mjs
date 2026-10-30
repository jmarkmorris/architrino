import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import katex from 'katex';

const decode=s=>s.replace(/&(amp|lt|gt|quot|#x27);/g,(_,k)=>({amp:'&',lt:'<',gt:'>',quot:'"','#x27':"'"}[k]));
const links=s=>[...s.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'').matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)].map(m=>m[1]);
const maths=s=>[...s.matchAll(/\$\$([\s\S]*?)\$\$|(?<![\\$])\$(?!\$)([^$\n]+?)\$(?!\$)/g)].map(m=>({text:m[1]??m[2],displayMode:m[1]!==undefined}));
assert.equal(decode('&lt;b&gt;&amp;lt;&#x27;&quot;'),'<b>&lt;\'"');
assert.deepEqual(links('[yes](ok.md)\n```md\n[no](missing.md)\n```\n'),['ok.md']);
assert.equal(maths('$x^2$\n$$y=1$$').length,2);
for(const m of maths('$x^2$\n$$y=1$$'))katex.renderToString(m.text,{displayMode:m.displayMode,throwOnError:true});
console.log('Known decoding, fenced-link and math controls passed before target reads.');

const here=path.dirname(new URL(import.meta.url).pathname),analysis=path.resolve(here,'../../analysis');
const capture=JSON.parse(fs.readFileSync(path.join(here,'visual-capture.json'),'utf8'));
const fragment=fs.readFileSync(path.join(analysis,'rotating-ladder-motions.fragment.html'));
assert.equal(crypto.createHash('sha256').update(fragment).digest('hex'),capture.sourceSha256);
const exported=fs.readFileSync(path.join(analysis,'rotating-ladder-motions.html'),'utf8');
const encoded=exported.match(/data-srcdoc="([\s\S]*?)"/);assert.ok(encoded);
assert.ok(decode(encoded[1]).includes(fragment.toString().trim()));
let linkCount=0,mathCount=0;
for(const name of ['rotating-ladder-visual-guide.md','rotating-ladder-branch-connection-2026-10-29.md']){
 const content=fs.readFileSync(path.join(analysis,name),'utf8');
 for(const link of links(content)){
  if(/^[a-z]+:/i.test(link)||link.startsWith('#'))continue;
  assert.ok(fs.existsSync(path.resolve(analysis,decodeURIComponent(link.split('#')[0]))),`${name}: ${link}`);linkCount++;
 }
 for(const m of maths(content)){katex.renderToString(m.text,{displayMode:m.displayMode,throwOnError:true});mathCount++;}
 assert.ok(!/[ \t]+$/m.test(content),`Trailing whitespace: ${name}`);
}
console.log(JSON.stringify({sourceFragmentSha256:capture.sourceSha256,standaloneContainsOriginalFragment:true,
 localLinksResolve:linkCount,mathSpansRender:mathCount,
 scope:'Export fidelity, local link existence and KaTeX parsing; browser appearance and science are outside this check.'},null,2));

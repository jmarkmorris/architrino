import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../../..');
const require=createRequire(import.meta.url),katex=require(path.join(root,'node_modules/katex'));
const {mathSpans}=await import(path.join(root,'scripts/lib/markdown-math-spans.mjs'));
const {extractMarkdownLinks}=await import(path.join(root,'scripts/lib/markdown-link-audit.mjs'));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const option=name=>process.argv.find(a=>a.startsWith(name+'='))?.slice(name.length+1);
const prefix=option('--prefix')??'authorized-cases-ten-hour-e-propagation-';
assert(/^authorized-cases-ten-hour-e-[a-z0-9-]*$/.test(prefix),'subject E prefix required');
const matches=name=>name.startsWith(prefix)&&name.endsWith('.md');
assert(matches(prefix+'known.md')&&!matches('reference-'+prefix+'known.md')&&!matches(prefix+'known.py'));
const receipt=path.join(root,'.tmp/authorized-cases-ten-hour/d/e-document-known.json');
const control='Text $x^2$ and `code $excluded$`.\n$$\\frac12$$\n[real](real.md)\n```md\n[example](missing.md)\n```';
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.deepEqual(mathSpans(control).map(x=>x.body),['x^2','\\frac12']);
assert.deepEqual(extractMarkdownLinks(control).map(x=>x.target),['real.md']);
katex.renderToString('\\frac12',{throwOnError:true});
assert.throws(()=>katex.renderToString('\\undefinedcommandhere',{throwOnError:true}));
if(process.argv.includes('--known')){
 const r={knownPassed:true,time:new Date().toISOString(),controls:['known SHA256','math/code separation','links/fenced examples separation','valid/invalid TeX']};
 fs.writeFileSync(receipt,JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify(r));process.exit(0);
}
assert(process.argv.includes('--target'));assert(JSON.parse(fs.readFileSync(receipt,'utf8')).knownPassed);
const base='reference/priorities/master-equation-closure/braid-program/',results=[];
for(const dir of ['analysis','evidence'])for(const name of fs.readdirSync(path.join(root,base,dir)).filter(matches).sort()){
 const file=path.join(root,base,dir,name),body=fs.readFileSync(file,'utf8'),spans=mathSpans(body);
 for(const s of spans)katex.renderToString(s.body,{throwOnError:true,displayMode:['$$','\\['].includes(body.slice(s.start,s.bodyStart))});
 let links=0;
 for(const l of extractMarkdownLinks(body)){
  if(/^[a-z][a-z0-9+.-]*:/i.test(l.target)||l.target.startsWith('#'))continue;
  assert(fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(l.target.split('#')[0]))),`${name}:${l.line}: missing ${l.target}`);links++;
 }
 results.push({file:path.relative(root,file),sha256:sha(body),mathSpans:spans.length,existingLocalLinkFiles:links});
}
const r={passed:true,time:new Date().toISOString(),knownReceipt:path.relative(root,receipt),boundary:'TeX syntax and local link-file existence only; no link-anchor or mathematical correctness claim',results};
const output=path.resolve(root,option('--output')??path.join(base,'evidence/authorized-cases-ten-hour-e-propagation-document-validation.json'));
assert(output.startsWith(root+path.sep),'output must remain in repository');
fs.writeFileSync(output,JSON.stringify(r,null,2)+'\n');console.log(JSON.stringify({passed:true,files:results.length,mathSpans:results.reduce((s,r)=>s+r.mathSpans,0),links:results.reduce((s,r)=>s+r.existingLocalLinkFiles,0)}));

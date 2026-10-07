import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../../..');
const require=createRequire(import.meta.url);
const katex=require(path.join(root,'node_modules/katex'));
const {mathSpans}=await import(path.join(root,'scripts/lib/markdown-math-spans.mjs'));
const {extractMarkdownLinks}=await import(path.join(root,'scripts/lib/markdown-link-audit.mjs'));
const sha=text=>crypto.createHash('sha256').update(text).digest('hex');
const scratch=path.join(root,'.tmp/authorized-cases-ten-hour/d');
const receipt=path.join(scratch,'document-known.json');
const control='Text $x^2$ and `code $excluded$`.\n$$\\frac12$$\n[real](real.md)\n```md\n[example](missing.md)\n```';
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.deepEqual(mathSpans(control).map(s=>s.body),['x^2','\\frac12']);
assert.deepEqual(extractMarkdownLinks(control).map(s=>s.target),['real.md']);
katex.renderToString('\\frac12',{throwOnError:true});
assert.throws(()=>katex.renderToString('\\undefinedcommandhere',{throwOnError:true}));
if(process.argv.includes('--known')){
  fs.mkdirSync(scratch,{recursive:true});
  const known={knownPassed:true,controls:['published SHA256 abc','math extractor excludes inline code','link extractor excludes fenced examples','valid TeX accepted','invalid TeX rejected'],time:new Date().toISOString()};
  fs.writeFileSync(receipt,JSON.stringify(known,null,2)+'\n');
  console.log(JSON.stringify(known));
  process.exit(0);
}
assert(process.argv.includes('--target'),'explicit --known or --target required');
assert.equal(JSON.parse(fs.readFileSync(receipt,'utf8')).knownPassed,true,'separate known run must precede target');
const base='reference/priorities/master-equation-closure/binary-research/analysis/';
const inputs={
  'slow-binary-wider-regime.md':'d8fc54a977a7aef6aabe9af3c645fad3aa8f34db841025413d33033e3c41d689',
  'slow-binary-wider-regime-independent-adjudication.md':'94f279458db71131c0f83879745d380313e1b6627e84a62523675706d4716640',
  'historical-binary-exact-source-binding.md':'dffd06a20c0a7df9774e6267586677d39fedd691f9ce62f071187b09f0f92a6b',
  'historical-binary-source-binding-independent-adjudication.md':'e9ab245a34696bd996499a1d83744cd49af199d0391403aca988bd007d05c0dc',
  'authorized-cases-ten-hour-d-common-center-control.md':'35b4b9975ae9185b968f27aac4ba1dc17865c0eb9e00a00e8c1b6c2b8f4e95b0',
  'authorized-cases-ten-hour-d-center-variation.md':'3c502ae4f8e3b7d2d883a8f03f1e3beca5a0e775cc622b937cc71d10dba2cadd',
  'authorized-cases-ten-hour-reference-d-center-adjudication.md':'0d6660883657323f98f400aaaa6a6fe5f55e55cf958849242706240bc82ccba2'
};
const preserved=[];
for(const [name,expected] of Object.entries(inputs)){
  const observed=sha(fs.readFileSync(path.join(root,base,name)));
  assert.equal(observed,expected,`protected input changed: ${name}`);
  preserved.push({file:base+name,sha256:observed});
}
const owner='content/markdown/aaa/dynamics/master-equation.md';
assert.equal(sha(fs.readFileSync(path.join(root,owner))),'8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f');
preserved.push({file:owner,sha256:sha(fs.readFileSync(path.join(root,owner)))});
const names=fs.readdirSync(path.join(root,base)).filter(n=>/^authorized-cases-ten-hour-d-(?:primary|followup)-.*\.md$/.test(n)).sort();
const results=[];
for(const name of names){
  const file=path.join(root,base,name),body=fs.readFileSync(file,'utf8'),spans=mathSpans(body);
  for(const span of spans){
    const delimiter=body.slice(span.start,span.bodyStart);
    katex.renderToString(span.body,{throwOnError:true,displayMode:delimiter==='$$'||delimiter==='\\['});
  }
  let links=0;
  for(const link of extractMarkdownLinks(body)){
    if(/^[a-z][a-z0-9+.-]*:/i.test(link.target)||link.target.startsWith('#'))continue;
    const target=decodeURIComponent(link.target.split('#')[0]);
    assert(fs.existsSync(path.resolve(path.dirname(file),target)),`${name}:${link.line}: missing ${target}`);
    links++;
  }
  results.push({file:base+name,sha256:sha(body),mathSpans:spans.length,existingLocalLinkFiles:links});
}
const result={passed:true,time:new Date().toISOString(),boundary:'TeX syntax, local link-file existence and named input preservation only; anchors and mathematics not certified',knownReceipt:path.relative(root,receipt),preserved,results};
fs.writeFileSync(path.join(root,'reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-ten-hour-d-primary-document-validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));

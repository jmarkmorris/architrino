import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { marked } from 'marked';
import katex from 'katex';

// Document validation only. Independently hand-derived rational controls below
// check the arithmetic in the frozen references, not an evolved target.
const spans = s => [...s.matchAll(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$|(?<![\\$])\$(?!\$)(?:\\.|[^$\n])*?(?<!\\)\$(?!\$)/g)].map(m => m[0]);
const links = s => {
  const out=[];
  for (const t of marked.lexer(spans(s).reduce((r,m)=>r.replace(m,''),s))) marked.walkTokens([t], q=>{if(q.type==='link')out.push(q.href);});
  return out;
};
const headings=s=>{const out=[];marked.walkTokens(marked.lexer(s),q=>{if(q.type==='heading')out.push(q.text.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/gu,'-'));});return out;};
const render=s=>{const n=s.startsWith('$$')?2:1;return katex.renderToString(s.slice(n,-n),{throwOnError:true,strict:false,displayMode:n===2});};
const eq=(a,b,c,d)=>a*d===b*c;
assert(eq(1n,2n,2n,4n)); assert(!eq(1n,2n,3n,4n));
assert.deepEqual(links('[yes](known.md)\n~~~\n[no](bad.md)\n~~~\n$C[q](t)$'),['known.md']);
assert.equal(spans('$x$\n$$y$$').length,2);
spans('$x$\n$$y$$').forEach(render);
render('$$x=1\\tag{K}$$');
assert.throws(()=>render('$\\frac{1}{$'));
assert.deepEqual(headings("# Audit the manuscript's results"),['audit-the-manuscripts-results']);
console.log('Known document and rational-comparison controls passed before reference checks.');
assert(eq(1152n*9n**4n*7n**8n,343n*7n**4n*5n**8n,52907904n,390625n));
assert(52907904n<136n*390625n);
assert(eq(1152n*49n,343n*25n,1152n,175n));
assert(1152n<7n*175n);
assert(eq(9n**2n*8n*37n,7n**3n*32n,2997n,1372n));
assert(2n*2997n<5n*1372n);
assert(eq(3n*73n,584n*3n,1n,8n));
assert(5n*3n*16n<584n);
const files=process.argv.slice(2);
if(!files.length)throw Error('Supply explicit reference document paths.');
const results=files.map(file=>{
  const raw=fs.readFileSync(file,'utf8');
  assert(!/[ \t]+$/m.test(raw));
  const math=spans(raw); math.forEach(render);
  const targets=links(raw);
  for(const href of targets){
    if(/^https?:/.test(href))continue;
    const [p,frag]=href.split('#'),dest=path.resolve(path.dirname(file),p);
    assert(fs.existsSync(dest),'Missing link '+href);
    if(frag&&dest.endsWith('.md'))assert(headings(fs.readFileSync(dest,'utf8')).includes(frag),'Missing anchor '+href);
  }
  return {file,sha256:crypto.createHash('sha256').update(raw).digest('hex'),math:math.length,links:targets.length};
});
console.log(JSON.stringify({passed:true,time:new Date().toISOString(),scope:'Markdown links, KaTeX syntax, and exact rational constants only; no numerical trajectory or subject acceptance',results},null,2));

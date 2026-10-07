import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import katex from 'katex';

// Adapted from the established elongated-history document checker; document scope only.
const spans = s => [...s.matchAll(/(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$|(?<![\\$])\$(?!\$)(?:\\.|[^$\n])*?(?<!\\)\$(?!\$)|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g)].map(m => m[0]);
const parsed = raw => {
  const links = [], headings = [];
  const mathless = spans(raw).reduce((text, span) => text.replace(span, ''), raw);
  marked.walkTokens(marked.lexer(mathless), token => {
    if (token.type === 'link') links.push(token.href);
    if (token.type === 'heading') headings.push(token.text);
  });
  return { links, headings };
};
const slug = s => s.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/gu, '-');
const render = s => {
  const n = s.startsWith('$$') || s.startsWith('\\') ? 2 : 1;
  return katex.renderToString(s.slice(n, -n), { throwOnError: true, strict: false, displayMode: s.startsWith('$$') || s.startsWith('\\[') });
};

assert.deepEqual(parsed('# Known\n[x](a.md)\n~~~\n[x](bad.md)\n~~~'), { links: ['a.md'], headings: ['Known'] });
assert.deepEqual(parsed('$C[q](t)$'), { links: [], headings: [] });
assert.equal(spans('$x$ $$y$$ \\(z\\) \\[w\\]').length, 4);
for (const s of spans('$x$ $$y$$ \\(z\\) \\[w\\]')) render(s);
assert.throws(() => render('$\\frac{1}{$'));
render('$$x\\tag{1}$$');
assert.throws(() => render('$x\\tag{1}$'));
console.log('KNOWN CONTROLS PASS: fenced links, math links, delimiters, display tags and invalid TeX.');

for (const file of process.argv.slice(2)) {
  const raw = fs.readFileSync(file, 'utf8');
  assert.equal(/[ \t]+$/m.test(raw), false, `${file}: trailing whitespace`);
  for (const s of spans(raw)) render(s);
  let links = 0, fragments = 0;
  for (const href of parsed(raw).links) {
    if (/^[a-z]+:/i.test(href)) continue;
    const [relative, fragment] = href.split('#');
    const destination = path.resolve(path.dirname(file), relative);
    assert.ok(fs.existsSync(destination), `${file}: ${href}`);
    links++;
    if (fragment) {
      fragments++;
      const content = fs.readFileSync(destination, 'utf8');
      assert.ok(parsed(content).headings.map(slug).includes(fragment) || content.includes(`id="${fragment}"`), `${file}: ${href}`);
    }
  }
  console.log(JSON.stringify({ file, math: spans(raw).length, links, fragments, scope: 'TeX syntax, trailing whitespace and local Markdown destinations only; no scientific acceptance.' }));
}

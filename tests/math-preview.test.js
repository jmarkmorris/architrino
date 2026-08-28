import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { renderPreview, selectSection, writePreview, servePreview } from "../.agents/skills/math-preview/scripts/render-preview.mjs";

const mathCount = (html) => [...html.matchAll(/class="katex"/g)].length;
const fixture = (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "math-preview-test-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
};

test("all four delimiters render while literal code and currency remain literal", () => {
  const source = String.raw`# Mathematics

$T$ and \(\mathbf X_i(T)\).

$$
\frac{d\mathbf X}{dT}=\mathbf V
$$

\[
\sum_{i=1}^N q_i=0
\]

Use \$5 or $10 as currency; $20 is another price.

` + '`$literal$` and ``a ` $alsoLiteral$``.\n\n```tex\n$notMath$\n\\[notMath\\]\n```\n\n    $indentedCode$\n\n> ~~~tex\n> $quotedCode$\n> ~~~\n';
  const { html, receipt } = renderPreview(source);
  assert.equal(receipt.mathExpressions, 4);
  assert.equal(mathCount(html), 4);
  assert.equal([...html.matchAll(/class="katex-display"/g)].length, 2);
  assert.match(html, /<code>\$literal\$<\/code>/);
  assert.match(html, /\$alsoLiteral\$/);
  assert.match(html, /\$notMath\$/);
  assert.match(html, /\$quotedCode\$/);
  assert.match(html, /\$indentedCode\$/);
  assert.match(html, /\$10 as currency; \$20/);
});

test("math survives Markdown tables, including vertical bars and meaningful scripts", () => {
  const { html, receipt } = renderPreview(String.raw`| Symbol | Meaning |
| --- | --- |
| $|x|$ | Absolute value |
| $\Delta_{r\leftarrow t}$ | Causal delay |
| $\hat{\mathbf X}_i$ | Unit direction |
| $\left\|\mathbf V\right\|$ | Speed |
`);
  assert.equal(receipt.mathExpressions, 4);
  assert.equal(mathCount(html), 4);
  assert.equal([...html.matchAll(/<td>/g)].length, 8);
  assert.match(html, /<annotation encoding="application\/x-tex">\|x\|<\/annotation>/);
  assert.match(html, /\\Delta_\{r\\leftarrow t\}/);
  assert.match(html, /\\hat\{\\mathbf X\}_i/);
});

test("currency signs cannot swallow a following formula", () => {
  const { html, receipt } = renderPreview('Prices $10 and $20, followed by $T$. Another $5, then $x$.');
  assert.equal(receipt.mathExpressions, 2);
  assert.equal(mathCount(html), 2);
  assert.match(html, /Prices \$10 and \$20/);
  assert.match(html, /Another \$5/);
  assert.equal(renderPreview('$2 x + 1$').receipt.mathExpressions, 1);
});

test("section selection includes children and rejects absent or ambiguous headings", () => {
  const source = '# Document\n\n## First\n$T$\n### Child\n$X$\n## Second\n$Y$\n';
  assert.equal(selectSection(source, 'First'), '## First\n$T$\n### Child\n$X$\n');
  const { html, receipt } = renderPreview(source, { section: 'First' });
  assert.equal(receipt.mathExpressions, 2);
  assert.match(html, /href="#section-1"/);
  assert.match(html, /id="section-1"/);
  assert.doesNotMatch(html, /Second/);
  assert.throws(() => selectSection(source, 'Missing'), /found 0/);
  assert.throws(() => selectSection(source + '\n## First\nAgain\n', 'First'), /found 2/);
});

test("invalid math fails rather than silently replacing or dropping the expression", () => {
  assert.throws(() => renderPreview('$\\unknownPreviewCommand{x}$'), /Math expression 1 failed/);
  assert.throws(() => renderPreview(String.raw`\[x`), /Unclosed math delimiter/);
  assert.throws(() => renderPreview('$x'), /Unclosed math delimiter/);
  assert.throws(() => renderPreview('$$x'), /Unclosed math delimiter/);
});

test("the preview embeds fonts and does not execute HTML or fetch document images", () => {
  const { html, receipt } = renderPreview('<script>alert(1)</script>\n\n![External diagram](https://example.test/a.png)\n\n[Source](file:///private/notes)\n\n$T$', { title: '<unsafe>' });
  assert.match(html, /data:font\/woff2;base64,/);
  assert.doesNotMatch(html, /url\(fonts\//);
  assert.doesNotMatch(html, /<script|<img|href="file:|src="https:/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /<title>&lt;unsafe&gt;<\/title>/);
  assert.equal(receipt.omittedImages, 1);
  assert.match(html, /Image omitted: External diagram/);
  assert.match(html, /default-src 'none'/);
});

test("both themes render and invalid theme names fail", () => {
  const purple = renderPreview('$T$').html;
  const light = renderPreview('$T$', { theme: 'light' }).html;
  assert.match(purple, /--paper:#4b0082;--ink:#ffffff/);
  assert.match(light, /--paper:#fdfdfd;--ink:#4b0082/);
  assert.throws(() => renderPreview('$T$', { theme: 'invalid' }), /Theme/);
});

test("writing preserves sources and existing unrelated files, and can refresh owned outputs", (t) => {
  const directory = fixture(t);
  const input = path.join(directory, 'source.md');
  const output = path.join(directory, 'preview.html');
  fs.writeFileSync(input, '# Test\n$T$\n');
  const before = fs.readFileSync(input);
  const receipt = writePreview({ input, output });
  assert.deepEqual(fs.readFileSync(input), before);
  assert.equal(receipt.mathExpressions, 1);
  assert.match(fs.readFileSync(output, 'utf8'), new RegExp(receipt.sourceSha256));
  const first = fs.readFileSync(output);
  fs.writeFileSync(input, '$\\unknownPreviewCommand$');
  assert.throws(() => writePreview({ input, output }), /failed/);
  assert.deepEqual(fs.readFileSync(output), first);
  fs.writeFileSync(input, '$X$');
  writePreview({ input, output });
  assert.notDeepEqual(fs.readFileSync(output), first);
  const unrelated = path.join(directory, 'unrelated.html');
  fs.writeFileSync(unrelated, 'Leave this alone');
  assert.throws(() => writePreview({ input, output: unrelated }), /unrelated/);
  assert.equal(fs.readFileSync(unrelated, 'utf8'), 'Leave this alone');
  const alias = path.join(directory, 'source-alias.html');
  fs.linkSync(input, alias);
  assert.throws(() => writePreview({ input, output: alias }), /source/);
});

function request(url, { method = 'GET', headers = {}, route } = {}) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const req = http.request({ hostname: target.hostname, port: target.port, path: route ?? target.pathname, method, headers }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', reject);
    req.end();
  });
}

test("loopback server exposes only its registered preview and reflects explicit refreshes", async (t) => {
  const directory = fixture(t);
  const input = path.join(directory, 'source.md');
  const output = path.join(directory, 'preview.html');
  fs.writeFileSync(input, '# First\n$T$');
  writePreview({ input, output });
  const { server, url } = await servePreview(output);
  try {
    assert.equal(server.address().address, '127.0.0.1');
    const response = await request(url);
    assert.equal(response.status, 200);
    assert.match(response.body, /First/);
    assert.equal(response.headers['cache-control'], 'no-store');
    assert.equal((await request(url, { method: 'HEAD' })).body, '');
    assert.equal((await request(url, { method: 'POST' })).status, 405);
    assert.equal((await request(url, { route: '/source.md' })).status, 404);
    assert.equal((await request(url, { route: '/../source.md' })).status, 404);
    assert.equal((await request(url, { headers: { Host: 'untrusted.example' } })).status, 403);
    assert.equal((await request(url, { headers: { Origin: 'https://untrusted.example' } })).status, 403);
    fs.writeFileSync(input, '# Refreshed\n$X$');
    writePreview({ input, output });
    assert.match((await request(url)).body, /Refreshed/);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

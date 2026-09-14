import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { verifyPagesPayload } from '../scripts/check-pages-build.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pages-payload-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (name, contents) => { fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), contents); };
  write('index.html', '<link href="./style.css"><script type="module" src="./app.js?v=1"></script>');
  write('app.js', 'import { value } from "./data.js";');
  write('data.js', 'export const value = 1;');
  write('style.css', '@font-face { src: url("./font.woff2") format("woff2"), url("./font.woff") format("woff"); }');
  write('font.woff2', 'fixture');
  return root;
}

test('known complete payload follows HTML, module and CSS dependencies', t => {
  const result = verifyPagesPayload(fixture(t), { entrypoints: ['index.html'], checkRuntime: false });
  assert.equal(result.localResources, 5);
  assert.deepEqual(result.externalResourcesNotFetched, []);
});

test('missing transitive module and font fail the copied payload check', t => {
  for (const missing of ['data.js', 'font.woff2']) {
    const root = fixture(t);
    fs.rmSync(path.join(root, missing));
    assert.throws(() => verifyPagesPayload(root, { entrypoints: ['index.html'], checkRuntime: false }), error => error.message.includes(missing));
  }
});

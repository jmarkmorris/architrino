import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { captureF5OriginalInputs, prepareF5OriginalInputTree, readF5RegularBytes, verifyF5OriginalInputTree } from '../scripts/eom/prepare-f5-original-input-tree.mjs';

import {SOURCE_MAP} from '../scripts/eom/f5-current-source-admission.mjs';
const sourceMapSha256=createHash('sha256').update(readFileSync(SOURCE_MAP)).digest('hex');
test('regular-byte capture passes a known byte and digest control before real inputs', () => {
  const dir = realpathSync(mkdtempSync(path.join(tmpdir(), 'f5-input-control-')));
  try {
    const filename = path.join(dir, 'known');
    writeFileSync(filename, 'abc');
    const bytes = readF5RegularBytes(filename);
    assert.deepEqual(bytes, Buffer.from('abc'));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    symlinkSync(filename, path.join(dir, 'alias'));
    assert.throws(() => readF5RegularBytes(path.join(dir, 'alias')), /symlinked input/);
    assert.throws(() => readF5RegularBytes(dir), /regular file/);
    if (process.platform !== 'win32') {
      const fifo = path.join(dir, 'fifo');
      execFileSync('mkfifo', [fifo], { timeout: 1000 });
      assert.throws(() => readF5RegularBytes(fifo), /regular file/);
    }
  } finally { rmSync(dir, { recursive: true }); }
});

test('exact original routes reject byte substitutions, false sizes and path traversal', () => {
  const routes = JSON.parse(readFileSync('reference/priorities/development-process-review/evidence/final-validation/f5-original-input-availability.json'));
  const captured = captureF5OriginalInputs(process.cwd(), routes);
  assert.equal(captured.length, 5);
  const dir = realpathSync(mkdtempSync(path.join(tmpdir(), 'f5-route-control-')));
  try {
    const copied = routes.map((row, i) => ({ ...row, physicalPath: `input-${i}` }));
    captured.forEach((row, i) => writeFileSync(path.join(dir, `input-${i}`), row.bytes));
    assert.equal(captureF5OriginalInputs(dir, copied).length, 5);
    const wrongSize = structuredClone(copied); wrongSize[0].bytes++;
    assert.throws(() => captureF5OriginalInputs(dir, wrongSize), /original bytes differ/);
    const traversal = structuredClone(copied); traversal[0].physicalPath = '../outside';
    assert.throws(() => captureF5OriginalInputs(dir, traversal), /noncanonical relative path/);
    writeFileSync(path.join(dir, 'input-0'), 'substituted original');
    assert.throws(() => captureF5OriginalInputs(dir, copied), /original bytes differ/);
  } finally { rmSync(dir, { recursive: true }); }
});

test('missing, duplicate, wrong-identity and unsafe destinations cannot create an execution root', async () => {
  assert.throws(() => captureF5OriginalInputs(process.cwd(), []), /census/);
  assert.throws(() => captureF5OriginalInputs(process.cwd(), Array(5).fill({ originalPath: 'duplicate' })), /census/);
  assert.throws(() => captureF5OriginalInputs(process.cwd(), Array.from({ length: 5 }, (_, i) => ({ originalPath: String(i) }))), /identity/);
  for (const destination of ['/tmp/f5-disallowed', '.local-data/f5-original-input-trees', '.local-data/f5-original-input-trees/a/b']) {
    await assert.rejects(prepareF5OriginalInputTree(destination,process.cwd(),sourceMapSha256), /direct child/);
  }
});

test('execution-root check rejects omitted census and changed captured bytes', async () => {
  const destination = `.local-data/f5-original-input-trees/mutation-control-${randomUUID()}`;
  const record = await prepareF5OriginalInputTree(destination,process.cwd(),sourceMapSha256);
  try {
    assert.deepEqual(await verifyF5OriginalInputTree(destination,process.cwd(),sourceMapSha256), record);
    await assert.rejects(prepareF5OriginalInputTree(destination,process.cwd(),sourceMapSha256), /already exists/);
    const filename = path.join(destination, 'f5-original-input-tree.json');
    const omitted = structuredClone(record); omitted.files.pop();
    writeFileSync(filename, JSON.stringify(omitted));
    await assert.rejects(verifyF5OriginalInputTree(destination,process.cwd(),sourceMapSha256), /record differs/);
    writeFileSync(filename, JSON.stringify(record));
    writeFileSync(path.join(destination, record.files[0].logicalPath), 'changed captured source');
    await assert.rejects(verifyF5OriginalInputTree(destination,process.cwd(),sourceMapSha256), /file changed/);
  } finally { rmSync(destination, { recursive: true }); }
});

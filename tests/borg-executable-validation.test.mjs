import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createBorgNativeEomProcessClient } from '../scripts/eom/BorgNativeEomProcessClient.mjs';
import { retainBorgExecutable } from '../scripts/eom/BorgExecutableAdmission.mjs';

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'borg-executable-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const binaryPath = path.join(dir, 'fixture-binary');
  const source = '#!/bin/sh\nprintf "EOM_BORG_NATIVE_V11\\n"\n';
  fs.writeFileSync(binaryPath, source, { mode: 0o700 });
  return { binaryPath, sha256: createHash('sha256').update(source).digest('hex') };
}

test('ordinary Borg client accepts compatible executable without source graph or build selectors', async t => {
  const { binaryPath } = fixture(t);
  const client = createBorgNativeEomProcessClient({ binaryPath });
  t.after(() => client.dispose());
  assert.equal(client.protocolMagic, 'EOM_BORG_NATIVE_V11');
  assert.equal(client.workerPid, null);
});

test('explicit reviewed executable binding rejects changed artifact bytes before requests', async t => {
  const { binaryPath, sha256 } = fixture(t);
  const client = createBorgNativeEomProcessClient({ binaryPath, executableBinding: { path: binaryPath, sha256 } });
  t.after(() => client.dispose());
  fs.appendFileSync(binaryPath, '# changed\n');
  await assert.rejects(client.evolveRetainedHistories({}), /Reviewed executable bytes differ/);
  assert.equal(client.workerPid, null);
});

test('executable validation preserves file, permission and reviewed path checks', t => {
  const { binaryPath, sha256 } = fixture(t);
  assert.throws(() => retainBorgExecutable({ binaryPath: binaryPath + '-missing' }), /ENOENT/);
  assert.throws(() => retainBorgExecutable({ binaryPath, executableBinding: { path: binaryPath + '-other', sha256 } }), /Reviewed executable path differs/);
  fs.chmodSync(binaryPath, 0o600);
  assert.throws(() => retainBorgExecutable({ binaryPath }), /EACCES/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

async function fixture(t, mode = 'success') {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'borg-build-preparation-')));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'scripts/eom'), { recursive: true });
  const helper = path.join(root, 'scripts/eom/prepare-borg-native-binary.mjs');
  fs.copyFileSync(fileURLToPath(new URL('../scripts/eom/prepare-borg-native-binary.mjs', import.meta.url)), helper);
  const log = path.join(root, 'calls.jsonl');
  const cmakePath = path.join(root, 'cmake');
  fs.writeFileSync(cmakePath, `#!${process.execPath}
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({args, cwd:process.cwd()}) + '\\n');
if (${JSON.stringify(mode)} === 'configure-failure' && args[0] === '-S') process.exit(7);
if (args[0] === '--build') {
  if (${JSON.stringify(mode)} === 'build-failure') process.exit(8);
  fs.mkdirSync(args[1], { recursive: true });
  if (${JSON.stringify(mode)} !== 'missing-output') fs.writeFileSync(path.join(args[1], 'eom_borg_shadow_cli'), '#!/bin/sh\\nexit 0\\n', {mode:0o700});
}
`, { mode: 0o700 });
  return { root, cmakePath, buildDirectory: path.join(root, 'build'), log, ...(await import(pathToFileURL(helper).href)) };
}

test('development build configures and builds with eight workers without source graph or selector files', async t => {
  const f = await fixture(t);
  const binary = f.prepareBorgNativeBinary(f);
  assert.equal(binary, path.join(f.buildDirectory, 'eom_borg_shadow_cli'));
  assert.deepEqual(fs.readdirSync(f.buildDirectory), ['eom_borg_shadow_cli']);
  const calls = fs.readFileSync(f.log, 'utf8').trim().split('\n').map(JSON.parse);
  assert.deepEqual(calls, [
    { args: ['-S', path.join(f.root, 'src/eom'), '-B', f.buildDirectory, '-DCMAKE_BUILD_TYPE=Release'], cwd: f.root },
    { args: ['--build', f.buildDirectory, '--target', 'eom_borg_shadow_cli', '--parallel', '8'], cwd: f.root },
  ]);
});

for (const mode of ['configure-failure', 'build-failure', 'missing-output']) {
  test(`development build rejects ${mode}`, async t => {
    const f = await fixture(t, mode);
    assert.throws(() => f.prepareBorgNativeBinary(f), /Borg build failed|ENOENT/);
    const calls = fs.readFileSync(f.log, 'utf8').trim().split('\n');
    assert.equal(calls.length, mode === 'configure-failure' ? 1 : 2);
  });
}

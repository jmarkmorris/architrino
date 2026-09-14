#!/usr/bin/env node
// Local development build only; no scientific release is authorized.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));

export function prepareBorgNativeBinary({ buildDirectory = path.join(ROOT, '.tmp/eom-native-dev'), cmakePath } = {}) {
  if (!cmakePath) {
    const directories = [...String(process.env.PATH ?? '').split(path.delimiter), '/opt/homebrew/bin', '/usr/local/bin'];
    cmakePath = directories.map(directory => path.join(directory, 'cmake')).find(filename => fs.existsSync(filename));
  }
  assert.ok(cmakePath, 'cmake executable required');
  cmakePath = fs.realpathSync(cmakePath);
  buildDirectory = path.resolve(buildDirectory);
  const invoke = args => {
    const result = spawnSync(cmakePath, args, { cwd: ROOT, encoding: 'utf8' });
    assert.equal(result.status, 0, result.error?.message || result.stderr || result.stdout || 'Borg build failed');
  };
  invoke(['-S', path.join(ROOT, 'src/eom'), '-B', buildDirectory, '-DCMAKE_BUILD_TYPE=Release']);
  invoke(['--build', buildDirectory, '--target', 'eom_borg_shadow_cli', '--parallel', '8']);
  const binaryPath = path.join(buildDirectory, 'eom_borg_shadow_cli');
  assert.ok(fs.statSync(binaryPath).isFile(), 'Borg build must produce a regular executable');
  fs.accessSync(binaryPath, fs.constants.X_OK);
  return binaryPath;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  assert.ok(args.length === 0 || (args.length === 2 && args[0] === '--build-directory'), 'usage: --build-directory DIR');
  process.stdout.write(prepareBorgNativeBinary({ buildDirectory: args[1] }) + '\n');
}

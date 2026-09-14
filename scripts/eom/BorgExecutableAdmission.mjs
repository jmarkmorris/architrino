// An explicit scientific launch may bind an executable artifact. Ordinary local
// development requires an executable and the client's protocol compatibility check.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

export function retainBorgExecutable({ binaryPath, executableBinding } = {}) {
  binaryPath = path.resolve(binaryPath);
  if (executableBinding) {
    assert.deepEqual(Object.keys(executableBinding).sort(), ['path', 'sha256']);
    assert.equal(path.resolve(executableBinding.path), binaryPath, 'Reviewed executable path differs');
    assert.match(executableBinding.sha256, /^[a-f0-9]{64}$/u, 'Reviewed executable SHA-256 required');
  }
  const check = () => {
    assert.ok(fs.statSync(binaryPath).isFile(), 'Borg executable must be a regular file');
    fs.accessSync(binaryPath, fs.constants.X_OK);
    if (executableBinding) {
      const actual = createHash('sha256').update(fs.readFileSync(binaryPath)).digest('hex');
      assert.equal(actual, executableBinding.sha256, 'Reviewed executable bytes differ');
    }
  };
  check();
  return Object.freeze({ check });
}

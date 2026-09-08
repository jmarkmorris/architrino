import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {runTestFiles} from '../scripts/run-test-sweep.mjs';

test('sweep files reach their assertions without overlapping a shared exclusive resource', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'sweep-execution-'));
  const lock = path.join(directory, 'exclusive.lock');
  const events = path.join(directory, 'events.log');
  // The child runner is a standalone CLI, not a worker of this parent test run.
  const execute = (command, args, options) => {
    const env = {...options.env};
    delete env.NODE_TEST_CONTEXT;
    return spawnSync(command, args, {...options, env});
  };
  const files = ['first', 'second'].map(name => {
    const filename = path.join(directory, name + '.test.cjs');
    writeFileSync(filename, `const test=require('node:test');
const fs=require('node:fs');
test(${JSON.stringify(name)},async()=>{
 const lock=${JSON.stringify(lock)},events=${JSON.stringify(events)};
 const fd=fs.openSync(lock,'wx');
 try {
  fs.appendFileSync(events,${JSON.stringify('start '+name+'\n')});
  await new Promise(resolve=>setTimeout(resolve,300));
  fs.appendFileSync(events,${JSON.stringify('end '+name+'\n')});
 } finally {fs.closeSync(fd);fs.unlinkSync(lock);}
});\n`);
    return filename;
  });
  try {
    // Establish that this fixture rejects a competing owner before testing the runner.
    writeFileSync(lock, 'known competing owner');
    const blocked = runTestFiles([files[0]], {testTimeoutMs: 5000, stdio: 'pipe', execute});
    assert.equal(blocked.status, 1);
    assert.match(blocked.stdout.toString(), /EEXIST/);
    rmSync(lock);
    const result = runTestFiles(files, {testTimeoutMs: 5000, stdio: 'pipe', execute});
    assert.equal(result.status, 0, result.stdout.toString() + result.stderr.toString());
    assert.equal(readFileSync(events, 'utf8'), 'start first\nend first\nstart second\nend second\n');
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
});

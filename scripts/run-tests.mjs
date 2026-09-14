#!/usr/bin/env node

// Run only the files explicitly selected for the agreed task. No discovery,
// slow rotation, or automatic asset preparation; see reference/op/testing-regime.md.
import { spawnSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const USAGE = 'Usage: npm test -- [--list] [--test-timeout=120000] tests/<affected-file>.test.js [...]\nSelect the files agreed for this task. Prepare only their required inputs separately; npm test does not generate runtime assets.';

export function runTestFiles(files, { testTimeoutMs = 120_000, execute = spawnSync, stdio = 'inherit', listOnly = false } = {}) {
  if (!files.length) throw new Error(USAGE);
  if (!Number.isInteger(testTimeoutMs) || testTimeoutMs <= 0) {
    throw new Error('--test-timeout must be a positive integer number of milliseconds');
  }
  for (const file of files) {
    if (file.startsWith('-') || /[*?\[\]{}]/u.test(file) || !/\.(?:js|mjs|cjs)$/u.test(file)) {
      throw new Error(`Select an explicit JavaScript file, not an option, directory or glob: ${file}`);
    }
    if (!statSync(path.resolve(ROOT_DIR, file)).isFile()) throw new Error(`Not a file: ${file}`);
  }
  if (listOnly) return files;
  return execute(process.execPath, ['--test', '--test-concurrency=1', `--test-timeout=${testTimeoutMs}`, ...files], {
    cwd: ROOT_DIR,
    env: process.env,
    stdio,
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    let testTimeoutMs = 120_000;
    const files = [];
    for (const arg of args) {
      if (arg === '--list') continue;
      if (arg.startsWith('--test-timeout=')) testTimeoutMs = Number(arg.slice('--test-timeout='.length));
      else files.push(arg);
    }
    if (args.includes('--list')) {
      for (const file of runTestFiles(files, { testTimeoutMs, listOnly: true })) console.log(file);
    } else {
      const startedAt = Date.now();
      const result = runTestFiles(files, { testTimeoutMs });
      if (result.error) throw result.error;
      const status = result.status ?? 1;
      console.log(`[tests] ${files.length} explicitly selected file(s): exit ${status} after ${((Date.now() - startedAt) / 1000).toFixed(1)}s`);
      process.exitCode = status;
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

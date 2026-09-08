// Explicit historical-input selection; never silently substitutes live scientific inputs.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareF5OriginalInputTree, verifyF5OriginalInputTree, F5_INPUT_TREE_TESTS } from './eom/prepare-f5-original-input-tree.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const selection = process.argv[2];
if (process.argv.length !== 3 || !['f5', 'fold'].includes(selection)) {
  console.error('usage: node scripts/run-historical-input-tests.mjs f5|fold');
  process.exitCode = 2;
} else {
  const venv = path.resolve(process.env.AAA_VENV || path.join(root, '../.venv'));
  const env = { ...process.env, AAA_VENV: venv, VIRTUAL_ENV: venv };
  const run = (command, args, cwd = root) => {
    console.log(JSON.stringify({ command, args, cwd, selection, scientificAcceptance: false }));
    const result = spawnSync(command, args, { cwd, env, stdio: 'inherit', timeout: 300000 });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`historical selection child failed: ${result.status ?? result.signal}`);
  };
  try {
    run(path.join(venv, 'bin/python'), ['--version']);
    if (selection === 'fold') {
      run(process.execPath, ['reference/priorities/development-process-review/evidence/owner-failure-recovery/run-original-fold-regression.mjs']);
    } else {
      const destination = path.join(root, '.local-data/f5-original-input-trees', `coverage-${Date.now()}-${process.pid}`);
      prepareF5OriginalInputTree(destination, root);
      verifyF5OriginalInputTree(destination, root);
      try {
        run(process.execPath, ['--test', '--test-concurrency=1', ...F5_INPUT_TREE_TESTS.filter(name => name.endsWith('.js'))], destination);
        run(path.join(venv, 'bin/python'), ['-B', '-m', 'unittest', 'discover', '-s', 'tests', '-p', 'test_f5_*conformance.py'], destination);
      } finally {
        verifyF5OriginalInputTree(destination, root);
        console.log(JSON.stringify({ executionRoot: destination, postExecutionInputTreeChecked: true }));
      }
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

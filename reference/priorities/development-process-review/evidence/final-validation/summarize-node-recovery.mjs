// Native TAP summary and diagnostic extraction. Controls precede target reads.
import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

function failures(text) {
  return [...text.matchAll(/^([ \t]*)not ok \d+ - (.+)\r?\n\1  ---\r?\n([\s\S]*?)^\1  \.\.\./gm)].map(m => ({
    test: m[2], location: m[3].match(/^\s*location: '(.*)'$/m)?.[1] ?? null,
    error: m[3].match(/^\s*error: (.*)$/m)?.[1] ?? null,
    diagnostic: m[3],
  }));
}
function summary(text) {
  const result = {};
  for (const key of ['tests', 'pass', 'fail', 'cancelled', 'skipped', 'todo', 'duration_ms']) {
    const matches = [...text.matchAll(new RegExp('^# ' + key + ' ([0-9.]+)$', 'gm'))];
    assert.equal(matches.length, 1, 'single native terminal summary required: ' + key);
    result[key] = Number(matches[0][1]);
  }
  return result;
}
const known = "not ok 1 - first\n  ---\n  location: 'tests/one.test.js:3:1'\n  error: known\n  ...\n    not ok 2 - nested\n      ---\n      location: 'tests/two.test.js:4:1'\n      error: second\n      ...\n";
assert.deepEqual(failures(known).map(r => [r.test, r.location, r.error]), [
  ['first', 'tests/one.test.js:3:1', 'known'], ['nested', 'tests/two.test.js:4:1', 'second'],
]);
assert.deepEqual(failures('ok 1 - success\n'), []);
assert.equal(summary('# tests 3\n# pass 1\n# fail 1\n# cancelled 0\n# skipped 1\n# todo 0\n# duration_ms 12\n').skipped, 1);
assert.throws(() => summary('incomplete log'), /terminal summary/);
const sha = raw => createHash('sha256').update(raw).digest('hex');
assert.equal(sha(Buffer.from('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known top-level and nested failures, successful exclusion, skipped summary, incomplete summary and SHA controls passed before target reads.');
const [runId, output] = process.argv.slice(2);
assert.ok(runId && output, 'run ID and output path required');
const lease = JSON.parse(readFileSync(`.local-data/owned-compute/leases/${runId}.json`));
assert.ok(['completed', 'failed'].includes(lease.status), 'completed execution required');
const raw = readFileSync(lease.stdoutPath), text = raw.toString();
const rows = failures(text), native = summary(text);
const result = {
  runId, command: [lease.command, ...lease.args], summary: native, failures: rows,
  failedFiles: [...new Set(rows.map(r => r.location?.replace(/:\d+:\d+$/, '')).filter(Boolean))].sort(),
  skippedResults: text.split('\n').filter(line => /^\s*ok \d+ .*# SKIP\b/.test(line)),
  diagnosticCount: rows.length, nativeFailureCount: native.fail,
  log: {path: lease.stdoutPath, sha256: sha(raw), bytes: raw.length},
  terminal: {status: lease.status, exitCode: lease.exitCode, processGroupClosed: lease.processGroupClosed, elapsedWallSeconds: lease.elapsedWallSeconds},
  boundary: 'The recorded command defines the Node selection in the shared working checkout. Concurrent documentation edits occurred; this is not an exact final-candidate publication receipt. Native totals and extracted diagnostic blocks are separate quantities; parent failures may duplicate nested failures.',
};
writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({summary: native, failedFiles: result.failedFiles.length, diagnostics: rows.length}));

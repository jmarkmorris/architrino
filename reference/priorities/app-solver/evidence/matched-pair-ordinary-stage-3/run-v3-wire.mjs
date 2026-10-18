// O3 wire qualification through the real eom-v2 CLI, c_f = 1. Writes one JSON
// line per case to stdout; raw responses and checkpoints go to <out>.
// Usage: node run-v3-wire.mjs <eom_borg_shadow_cli> <out dir>
import { spawnSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const [bin, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const seg = z => ({ kind: 'cubic', segments: [{ start: '-20', end: '0', coefficients: [['0','0','0','0'],['0','0','0','0'],[z,'0','0','0']], positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] }] });
const moving = (z, v) => ({ kind: 'cubic', segments: [{ start: '-20', end: '0', coefficients: [['0','0','0','0'],['0','0','0','0'],[z,v,'0','0']], positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] }] });
const execution = (maximum, extra = {}) => ({ method: 'canonical_validated_far_step_evolution/v1', positionIncrementBudget: '0.000001', velocityIncrementBudget: '0.000001', pairPolicy: 'canonical_whole_step_piecewise_tube/v1', groups: [['plus','minus']], maximumAcceptedSteps: maximum, ...extra });
const three = () => [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'plus', charge: '1', history: seg('10') }, { pathId: 'minus', charge: '-1', history: seg('11') }];
const v3 = (maximum, over = {}) => ({ schema: 'eom_evolution_request/v3', runId: 'o3-run', model: { fieldSpeed: '1', coupling: '0.001' }, interval: { start: '0', end: '0.0625' }, paths: three(), numerics: { initialStep: '0.0078125', minimumStep: '0.0078125' }, execution: execution(maximum), ...over });
function call(name, envelope, file, raw) {
  const input = raw ?? JSON.stringify(envelope);
  const args = file === undefined ? ['eom-v2'] : ['eom-v2', '--checkpoint-file', file];
  const r = spawnSync(bin, args, { input, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
  fs.writeFileSync(path.join(out, `${name}.stdout`), r.stdout);
  fs.writeFileSync(path.join(out, `${name}.stderr`), r.stderr);
  const doc = JSON.parse(r.stdout);
  return { doc, stderr: r.stderr, exit: r.status };
}
const row = o => console.log(JSON.stringify(o));
const summary = (name, d, extra = {}) => row({ case: name, schema: d.schema, code: d.code ?? null, error: d.error ?? null, status: d.status ?? null,
  accepted: d.acceptedStepCount ?? null, rejected: d.rejectedStepCount ?? null, end: d.acceptedCoverage?.end ?? null, halt: d.halt?.code ?? null,
  executionDigest: d.executionDigest ?? null, modelDigest: d.modelDigest ?? null, checkpointSchema: d.checkpoint?.schema ?? null, durable: d.checkpoint?.durable ?? null,
  storageFailure: d.checkpoint?.storageFailure ?? null, checkpointDigest: d.checkpoint?.digest ?? null, validated: d.validated ? { recordStatus: d.validated.recordStatus, workerCount: d.validated.workerCount, identityBasis: d.validated.identityBasis ?? null, replayedSteps: d.validated.replayedSteps ?? null, replayedRejectedSteps: d.validated.replayedRejectedSteps ?? null, attemptCount: d.validated.attemptCount } : null,
  admission: d.admission ?? null, resources: d.resources ?? null, histories: d.checkpoint?.data?.histories ? JSON.stringify(d.checkpoint.data.histories).length : null, historiesDigest: d.checkpoint?.data?.histories ? d.checkpoint.data.histories.map(h => h.fingerprint).join(',') : null, ...extra });
const cp = name => path.join(out, `${name}.checkpoint.json`);
// v3 inspect, evolve, resume.
const inspect = call('v3-inspect', { operation: 'inspect', request: v3(8) });
summary('v3-inspect', inspect.doc);
const whole = call('v3-evolve-whole', { operation: 'evolve', request: v3(8) }, cp('whole'));
summary('v3-evolve-whole', whole.doc, { progress: whole.stderr.split('\n').filter(l => l.includes('eom_progress/v2')).length, ready: whole.stderr.includes('eom_ready/v2') });
const two = call('v3-evolve-limit-two', { operation: 'evolve', request: v3(2) }, cp('two'));
summary('v3-evolve-limit-two', two.doc);
const twoCheckpoint = JSON.parse(fs.readFileSync(cp('two'), 'utf8'));
const resumed = call('v3-resume-from-two', { operation: 'resume', request: v3(2), checkpoint: twoCheckpoint, endTime: '0.0625' }, cp('resumed'));
summary('v3-resume-from-two', resumed.doc);
const resumed6 = call('v3-resume-from-two-limit-six', { operation: 'resume', request: v3(6), checkpoint: twoCheckpoint, endTime: '0.0625' }, cp('resumed6'));
summary('v3-resume-from-two-limit-six', resumed6.doc);
const workers = call('v3-resume-from-two-workers', { operation: 'resume', request: v3(2), checkpoint: twoCheckpoint, endTime: '0.0625', runtime: { threadCount: 4 } }, cp('resumed-workers'));
summary('v3-resume-from-two-workers', workers.doc);
// Durable failure: accepted coverage is returned, not durable.
const nodir = call('v3-evolve-unwritable-checkpoint', { operation: 'evolve', request: v3(8) }, path.join(out, 'absent', 'x.json'));
summary('v3-evolve-unwritable-checkpoint', nodir.doc);
// Refusals.
const refusals = {
  'v3-missing-execution': { operation: 'evolve', request: (() => { const r = v3(8); delete r.execution; return r; })() },
  'v3-missing-maximum-accepted-steps': { operation: 'evolve', request: v3(8, { execution: (() => { const e = execution(8); delete e.maximumAcceptedSteps; return e; })() }) },
  'v3-zero-maximum-accepted-steps': { operation: 'evolve', request: v3(0) },
  'v3-unknown-execution-key': { operation: 'evolve', request: v3(8, { execution: execution(8, { speedClamp: true }) }) },
  'v3-unknown-method': { operation: 'evolve', request: v3(8, { execution: execution(8, { method: 'validated' }) }) },
  'v3-missing-initial-step': { operation: 'evolve', request: v3(8, { numerics: { minimumStep: '0.0078125' } }) },
  'v3-missing-coupling': { operation: 'evolve', request: v3(8, { model: { fieldSpeed: '1' } }) },
  'v3-ordinary-control-root-tolerance': { operation: 'evolve', request: v3(8, { numerics: { initialStep: '0.0078125', minimumStep: '0.0078125', rootTolerance: '0.000000001' } }) },
  'v3-ordinary-control-max-step-attempts': { operation: 'evolve', request: v3(8, { numerics: { initialStep: '0.0078125', minimumStep: '0.0078125', maxStepAttempts: 5 } }) },
  'v3-bound-over-memory': { operation: 'evolve', request: v3(1000000, { resources: { memoryBytes: 1048576 }, numerics: { initialStep: '1.5', minimumStep: '0.0001' }, interval: { start: '0', end: '3' }, execution: { ...execution(1000000), pairPolicy: 'disabled', groups: [] }, paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'source', charge: '1', history: moving('-9', '0.5') }] }) },
  'v3-domain-refused-origin': { operation: 'evolve', request: v3(8, { execution: { ...execution(8), pairPolicy: 'disabled', groups: [] }, paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'source', charge: '1', history: moving('10', '2') }] }) },
  'v2-request-with-execution': { operation: 'evolve', request: v3(8, { schema: 'eom_evolution_request/v2' }) },
  'v2-envelope-with-runtime': { operation: 'evolve', request: (() => { const r = v3(8, { schema: 'eom_evolution_request/v2' }); delete r.execution; return r; })(), runtime: { threadCount: 2 } },
  'v3-evolve-with-runtime': { operation: 'evolve', request: v3(8), runtime: { threadCount: 2 } },
  'v3-runtime-unknown-key': { operation: 'resume', request: v3(2), checkpoint: twoCheckpoint, endTime: '0.0625', runtime: { threadCount: 2, extra: 1 } },
  'v3-runtime-worker-zero': { operation: 'resume', request: v3(2), checkpoint: twoCheckpoint, endTime: '0.0625', runtime: { threadCount: 0 } },
  'v3-resume-changed-execution': { operation: 'resume', request: v3(2, { execution: { ...execution(2), pairPolicy: 'disabled', groups: [] } }), checkpoint: twoCheckpoint, endTime: '0.0625' },
};
for (const [name, envelope] of Object.entries(refusals)) summary(name, call(name, envelope).doc);
summary('v3-duplicate-execution-key', call('v3-duplicate-execution-key', null, undefined,
  JSON.stringify({ operation: 'evolve', request: v3(8) }).replace('"maximumAcceptedSteps":8', '"maximumAcceptedSteps":8,"maximumAcceptedSteps":9')).doc);
// SIGUSR1 cancellation at an accepted boundary, then resume to the end.
const adaptive = (maximum) => v3(maximum, { runId: 'o3-cancel', resources: { memoryBytes: 2147483648 }, numerics: { initialStep: '1.5', minimumStep: '0.0001' }, interval: { start: '0', end: '3' }, execution: { ...execution(maximum), pairPolicy: 'disabled', groups: [] }, paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'source', charge: '1', history: moving('-9', '0.5') }] });
await new Promise(resolve => {
  const child = spawn(bin, ['eom-v2', '--checkpoint-file', cp('cancel')]);
  let stdout = '', stderr = '', signalled = false;
  child.stdout.on('data', d => { stdout += d; });
  child.stderr.on('data', d => { stderr += d; if (!signalled && stderr.includes('eom_progress/v2')) { signalled = true; child.kill('SIGUSR1'); } });
  child.on('close', () => {
    fs.writeFileSync(path.join(out, 'v3-cancel.stdout'), stdout);
    fs.writeFileSync(path.join(out, 'v3-cancel.stderr'), stderr);
    summary('v3-cancel-after-first-progress', JSON.parse(stdout), { signalled });
    resolve();
  });
  child.stdin.end(JSON.stringify({ operation: 'evolve', request: adaptive(300) }));
});
const cancelCheckpoint = JSON.parse(fs.readFileSync(cp('cancel'), 'utf8'));
summary('v3-resume-after-cancel', call('v3-resume-after-cancel', { operation: 'resume', request: adaptive(300), checkpoint: cancelCheckpoint, endTime: '3' }, cp('after-cancel')).doc);
summary('v3-uninterrupted-adaptive', call('v3-uninterrupted-adaptive', { operation: 'evolve', request: adaptive(300) }, cp('adaptive')).doc);

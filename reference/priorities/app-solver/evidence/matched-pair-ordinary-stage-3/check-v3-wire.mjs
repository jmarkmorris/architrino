// Checks the O3 wire run, c_f = 1. Known first: the frozen v2 envelopes
// differ from the O0 baseline only at reviewed identity paths, plus the one
// declared change (the old v3 rejection envelope). Then every v3 outcome.
// Usage: node check-v3-wire.mjs <o3 scratch dir>
import fs from 'node:fs';
import path from 'node:path';
const dir = process.argv[2];
const rows = []; let ok = true;
const check = (name, passed, detail = '') => { rows.push({ check: name, passed: !!passed, detail: String(detail) }); console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}  [${detail}]`); ok &&= !!passed; return !!passed; };
const comparison = fs.readFileSync(path.join(dir, 'default-comparison.txt'), 'utf8');
const summary = JSON.parse(comparison.slice(comparison.indexOf('{'), comparison.lastIndexOf('}') + 1));
console.log('Known cases, before any target');
const known = check('known: frozen defaults differ only at reviewed paths, plus the declared v3-rejection envelope',
  /PASS  known: a file against itself is identical/.test(comparison) && summary.identical === 72 && summary.projected.length === 11 && summary.missing.length === 0
  && summary.different.length === 1 && summary.different[0].file === 'wire-outputs/reject-request-v3.stdout',
  `${summary.identical} identical, ${summary.projected.length} projected, different: ${summary.different.map(d => d.file)}`);
const v3reject = JSON.parse(fs.readFileSync(path.join(dir, 'wire-outputs/reject-request-v3.stdout'), 'utf8'));
check('known: the declared change is the old v3 envelope now refused for lacking execution', v3reject.code === 'invalid_request' && /execution object/.test(v3reject.error), v3reject.error);
const caps = summary.projected.find(p => p.file === 'wire-outputs/capabilities.stdout');
check('known: capabilities differ only by build identity; nothing new is advertised', caps && caps.removed.every(p => p.startsWith('/build/')), caps?.removed);
if (!known) { console.log('KNOWN CASE FAILED'); process.exit(2); }
console.log('\nTargets');
const r = Object.fromEntries(fs.readFileSync(path.join(dir, 'wire-v3.jsonl'), 'utf8').trim().split('\n').map(l => JSON.parse(l)).map(x => [x.case, x]));
const doc = name => JSON.parse(fs.readFileSync(path.join(dir, 'wire-v3', name + '.stdout'), 'utf8'));
const inspect = r['v3-inspect'];
check('inspection v3 is control-only: preflight not run, no certified domain, bound reported as an estimate',
  inspect.schema === 'eom_inspection/v3' && inspect.admission.originPreflight === 'not_run' && inspect.admission.certifiedDomain === false
  && inspect.resources.maximumAcceptedSteps === 8 && /not a measured/.test(inspect.resources.estimateKind));
check('execution digest: inspection and evolution agree', inspect.executionDigest && inspect.executionDigest === r['v3-evolve-whole'].executionDigest);
const whole = r['v3-evolve-whole'];
check('evolve v3: completed, eight steps, v9 checkpoint written durably, recorded, progress and readiness on stderr',
  whole.status === 'completed' && whole.accepted === 8 && whole.checkpointSchema === 'eom_provider_checkpoint/v9' && whole.durable === true
  && whole.validated.recordStatus === 'recorded' && whole.progress === 8 && whole.ready);
const file = JSON.parse(fs.readFileSync(path.join(dir, 'wire-v3/whole.checkpoint.json'), 'utf8'));
check('the durable v9 file equals the checkpoint the response reports', JSON.stringify(file) === JSON.stringify(doc('v3-evolve-whole').checkpoint.data) && file.digest === whole.checkpointDigest);
check('per-invocation declared limit: two steps, diagnostic halt, durable v9', r['v3-evolve-limit-two'].halt === 'diagnostic_accepted_step_limit_reached' && r['v3-evolve-limit-two'].accepted === 2 && r['v3-evolve-limit-two'].durable);
check('resume v3 from two with limit six equals the uninterrupted run',
  r['v3-resume-from-two-limit-six'].status === 'completed' && r['v3-resume-from-two-limit-six'].accepted === 8
  && r['v3-resume-from-two-limit-six'].historiesDigest === whole.historiesDigest && r['v3-resume-from-two-limit-six'].validated.identityBasis === 'expected_controls'
  && r['v3-resume-from-two-limit-six'].validated.replayedSteps === 2);
check('resume with runtime.threadCount 4 equals the one-worker resume and reports four workers',
  r['v3-resume-from-two-workers'].validated.workerCount === 4 && r['v3-resume-from-two-workers'].historiesDigest === r['v3-resume-from-two'].historiesDigest
  && r['v3-resume-from-two-workers'].accepted === r['v3-resume-from-two'].accepted);
check('SIGUSR1 cancellation halts at an accepted boundary with a durable v9',
  r['v3-cancel-after-first-progress'].signalled && r['v3-cancel-after-first-progress'].halt === 'cancelled_at_accepted_boundary' && r['v3-cancel-after-first-progress'].durable);
check('resume after cancellation equals the uninterrupted run, with replayed rejections',
  r['v3-resume-after-cancel'].status === 'completed' && r['v3-resume-after-cancel'].historiesDigest === r['v3-uninterrupted-adaptive'].historiesDigest
  && r['v3-resume-after-cancel'].accepted === 214 && r['v3-resume-after-cancel'].rejected === 42
  && r['v3-resume-after-cancel'].validated.replayedRejectedSteps === r['v3-cancel-after-first-progress'].rejected);
check('storage failure keeps accepted coverage and is not durable',
  r['v3-evolve-unwritable-checkpoint'].status === 'completed' && r['v3-evolve-unwritable-checkpoint'].durable === false && /open failed/.test(r['v3-evolve-unwritable-checkpoint'].storageFailure));
const expected = {
  'v3-missing-execution': 'invalid_request', 'v3-missing-maximum-accepted-steps': 'invalid_request', 'v3-zero-maximum-accepted-steps': 'invalid_request',
  'v3-unknown-execution-key': 'unknown_request_field', 'v3-unknown-method': 'unsupported_execution_policy', 'v3-missing-initial-step': 'invalid_request',
  'v3-missing-coupling': 'invalid_request', 'v3-ordinary-control-root-tolerance': 'unsupported_execution_policy', 'v3-ordinary-control-max-step-attempts': 'unsupported_execution_policy',
  'v3-bound-over-memory': 'request_budget_exhausted', 'v3-domain-refused-origin': 'unsupported_validated_domain', 'v2-request-with-execution': 'unknown_request_field',
  'v2-envelope-with-runtime': 'unknown_request_field', 'v3-evolve-with-runtime': 'unknown_request_field', 'v3-runtime-unknown-key': 'unknown_request_field',
  'v3-runtime-worker-zero': 'request_budget_exhausted', 'v3-resume-changed-execution': 'checkpoint_execution_mismatch', 'v3-duplicate-execution-key': 'duplicate_json_key' };
const wrong = Object.entries(expected).filter(([k, v]) => r[k]?.schema !== 'eom_error/v2' || r[k]?.code !== v).map(([k]) => `${k}:${r[k]?.code}`);
check('every strictness, overlap, limit, domain, runtime and identity refusal has its expected code', wrong.length === 0, `${Object.keys(expected).length} requests; ${wrong}`);
check('overlapping ordinary controls are refused by name, not given silent precedence',
  /root_tolerance/.test(r['v3-ordinary-control-root-tolerance'].error) && /max_step_attem/.test(r['v3-ordinary-control-max-step-attempts'].error));
check('a bound over resources.memoryBytes is refused with the bound and the declared limit reported', /bound of \d+ bytes for maximumAcceptedSteps 1000000/.test(r['v3-bound-over-memory'].error));
const passed = rows.filter(x => x.passed).length;
console.log(`\n${passed} of ${rows.length} checks passed.`);
fs.writeFileSync(path.join(dir, 'o3-wire-check.json'), JSON.stringify({ schema: 'ordinary_integration_o3_wire_check/v1', all_passed: ok, rows }, null, 1) + '\n');
process.exit(ok ? 0 : 1);

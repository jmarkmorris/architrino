// Genuine O3 end-to-end run, c_f = 1: the actual service (byte-identical to
// live), the candidate process client and browser client, and the O3 CLI,
// over a local HTTP port. Writes one JSON line per check.
// Usage: node run-end-to-end.mjs <eom_borg_shadow_cli> <out dir>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createEomV2Service } from './scripts/dev/EomV2Service.mjs';
import { createEomV2HttpClient } from './src/apps/shared/EomV2HttpClient.js';
const [bin, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const checkpointRoot = path.resolve(out, 'checkpoints'), recordRoot = path.resolve(out, 'records');
const service = createEomV2Service({ prepareBinary: () => path.resolve(bin), checkpointRoot, recordRoot });
const server = http.createServer(async (req, res) => { if (!(await service.serve(req, res))) { res.writeHead(404); res.end(); } });
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const fetchImpl = (url, init) => fetch(base + url, init);
const client = createEomV2HttpClient({ fetchImpl });
const rows = []; let ok = true;
const check = (name, passed, detail = '') => { rows.push({ check: name, passed: !!passed, detail: String(detail) }); console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}  [${detail}]`); ok &&= !!passed; };
const seg = (z, v = '0') => ({ kind: 'cubic', segments: [{ start: '-20', end: '0', coefficients: [['0','0','0','0'],['0','0','0','0'],[z,v,'0','0']], positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] }] });
const grouped = (runId, maximum) => ({ schema: 'eom_evolution_request/v3', runId, model: { fieldSpeed: '1', coupling: '0.001' }, interval: { start: '0', end: '0.0625' },
  paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'plus', charge: '1', history: seg('10') }, { pathId: 'minus', charge: '-1', history: seg('11') }],
  numerics: { initialStep: '0.0078125', minimumStep: '0.0078125' },
  execution: { method: 'canonical_validated_far_step_evolution/v1', positionIncrementBudget: '0.000001', velocityIncrementBudget: '0.000001', pairPolicy: 'canonical_whole_step_piecewise_tube/v1', groups: [['plus','minus']], maximumAcceptedSteps: maximum } });
const adaptive = runId => ({ schema: 'eom_evolution_request/v3', runId, model: { fieldSpeed: '1', coupling: '0.001' }, interval: { start: '0', end: '3' }, resources: { memoryBytes: 2147483648 },
  paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'source', charge: '1', history: seg('-9', '0.5') }],
  numerics: { initialStep: '1.5', minimumStep: '0.0001' },
  execution: { method: 'canonical_validated_far_step_evolution/v1', positionIncrementBudget: '0.000001', velocityIncrementBudget: '0.000001', maximumAcceptedSteps: 300 } });
const keep = (name, value) => fs.writeFileSync(path.join(out, name + '.json'), JSON.stringify(value, null, 1));
const caught = async fn => { try { return { value: await fn() }; } catch (e) { return { error: e.message, code: e.code ?? null, retainedFailure: e.retainedFailure ?? null }; } };

console.log('Known cases, before any target');
const v2Envelope = JSON.parse(fs.readFileSync('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-envelopes/evolve-three-path.json', 'utf8'));
const v2 = await caught(() => client.evolve(v2Envelope.request));
keep('known-v2-evolve', v2);
check('known: a v2 run through the actual service and clients is unchanged in kind', v2.value?.schema === 'eom_evolution_response/v2' && v2.value.status === 'completed', v2.value?.status ?? v2.error);
const caps = await (await fetchImpl('/api/eom/v2/capabilities')).json();
keep('capabilities', caps);
check('known: capabilities answer and advertise no execution method', caps.schema === 'eom_equation_capabilities/v1' && !('executionMethods' in caps));

console.log('\nTargets');
const inspection = await caught(() => client.inspect(grouped('e2e-whole', 8)));
keep('v3-inspect', inspection);
check('v3 inspect through the service: control-only, preflight not run', inspection.value?.schema === 'eom_inspection/v3' && inspection.value.admission.originPreflight === 'not_run' && inspection.value.admission.certifiedDomain === false);
const whole = await caught(() => client.evolveRecord(grouped('e2e-whole', 8)));
keep('v3-evolve-record', whole);
const w = whole.value;
check('v3 evolve-record: completed, durable v9 checkpoint with an identity, record view with sampled attempts',
  w?.schema === 'eom_evolution_response/v3' && w.status === 'completed' && w.acceptedStepCount === 8 && w.checkpoint?.durable === true && w.checkpoint.schema === 'eom_provider_checkpoint/v9'
  && typeof w.checkpoint.id === 'string' && w.record?.schema === 'eom_record_view/v1' && w.record.validatedAttempts?.originalCount === 8, whole.error ?? w?.checkpoint?.id);
if (w?.record?.artifact) {
  const raw = Buffer.from(await (await fetchImpl(`/api/eom/v2/records/${w.record.artifact.id}/raw`)).arrayBuffer());
  const marker = JSON.parse(fs.readFileSync(path.join(recordRoot, `${w.record.artifact.id}.complete.json`), 'utf8'));
  const rawDoc = JSON.parse(raw.toString('utf8'));
  check('complete raw record retained and served: bytes and SHA-256 match the artifact, complete marker written, full attempt log in raw',
    raw.length === w.record.artifact.bytes && createHash('sha256').update(raw).digest('hex') === w.record.artifact.sha256 && marker.complete === true && marker.bytes === raw.length
    && rawDoc.validated.attempts.length === 8 && rawDoc.schema === 'eom_evolution_response/v3', `${raw.length} bytes`);
  const stored = await (await fetchImpl(`/api/eom/v2/checkpoints/${w.checkpoint.id}`)).json();
  check('the durable checkpoint read back through the service is the reported v9', stored.digest === w.checkpoint.digest && stored.schema === 'eom_provider_checkpoint/v9');
}
// Cancellation through the browser client's abort, on the longer run.
const progress = [];
const controller = new AbortController();
const cut = await caught(() => client.evolveRecord(adaptive('e2e-cancel'), { signal: controller.signal, onProgress: p => { progress.push(p); controller.abort(); } }));
keep('v3-cancel', { ...cut, progress });
const c = cut.value;
check('cancellation through the service: progress observed, then an accepted boundary with a durable v9 and accepted coverage',
  progress.length >= 1 && progress[0].schema === 'eom_progress/v2' && c?.status === 'halted' && c.halt?.code === 'cancelled_at_accepted_boundary' && c.checkpoint?.durable === true
  && c.acceptedCoverage?.end !== '0', `${progress.length} progress events; ${c?.status} ${c?.halt?.code} at ${c?.acceptedCoverage?.end}; ${cut.error ?? ''}`);
const uninterrupted = await caught(() => client.evolveRecord(adaptive('e2e-uninterrupted')));
keep('v3-uninterrupted', uninterrupted);
if (c?.checkpoint?.id) {
  const checkpoint = await client.readCheckpoint(c.checkpoint.id);
  const resumed = await caught(() => client.resumeRecord(adaptive('e2e-cancel'), checkpoint, '3', { runtime: { threadCount: 2 } }));
  keep('v3-resume-record', resumed);
  const r = resumed.value;
  check('resume-record with runtime.threadCount 2 through the service equals the uninterrupted run, with replayed rejections and the worker count reported',
    r?.status === 'completed' && r.acceptedStepCount === uninterrupted.value?.acceptedStepCount && r.rejectedStepCount === uninterrupted.value?.rejectedStepCount
    && JSON.stringify(r.checkpoint.data.histories) === JSON.stringify(uninterrupted.value?.checkpoint.data.histories)
    && r.validated.workerCount === 2 && r.validated.replayedRejectedSteps === c.rejectedStepCount && r.record?.schema === 'eom_record_view/v1',
    `${r?.acceptedStepCount}/${r?.rejectedStepCount} against ${uninterrupted.value?.acceptedStepCount}/${uninterrupted.value?.rejectedStepCount}; ${resumed.error ?? ''}`);
}
// Refusals and failures.
const noLimit = grouped('e2e-no-limit', 8); delete noLimit.execution.maximumAcceptedSteps;
const clientRefused = await caught(() => client.evolve(noLimit));
check('the browser client refuses a v3 request without a declared limit before anything is sent', clientRefused.code === 'execution_binding_mismatch', clientRefused.error);
const serverRefused = await fetchImpl('/api/eom/v2/evolve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(noLimit) });
const serverBody = await serverRefused.json();
check('the service returns the strict decoder refusal for the same request', serverRefused.status === 400 && serverBody.code === 'invalid_request' && /maximumAcceptedSteps/.test(serverBody.error), serverBody.error);
const v2Runtime = await caught(() => client.resume(v2Envelope.request, {}, '1', { runtime: { threadCount: 2 } }));
check('a runtime override on a v2 resume is refused, not dropped', v2Runtime.code === 'unsupported_runtime_override', v2Runtime.error);
const domain = grouped('e2e-domain', 8); domain.execution.pairPolicy = 'disabled'; domain.execution.groups = []; domain.paths = [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'source', charge: '1', history: seg('10', '2') }];
const domainRefused = await caught(() => client.evolve(domain));
check('a domain-refused origin is reported as the service error, with nothing evolved', /unsupported_validated_domain/.test(domainRefused.error ?? '') || domainRefused.code === 'unsupported_validated_domain', domainRefused.error);
await service.dispose();
server.close();
const passed = rows.filter(x => x.passed).length;
console.log(`\n${passed} of ${rows.length} checks passed.`);
fs.writeFileSync(path.join(out, 'o3-end-to-end-check.json'), JSON.stringify({ schema: 'ordinary_integration_o3_end_to_end/v1', all_passed: ok, rows }, null, 1) + '\n');
process.exit(ok ? 0 : 1);

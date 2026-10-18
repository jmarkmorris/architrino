// O3 consumer checks, c_f = 1. Known cases first: the stricter projection
// leaves every retained v2 evolution view, including Surface's, byte for
// byte as the live projection makes it. Then v3 projection, refusal of
// unknown schemas, execution binding and the browser client.
// Usage: node check-o3-consumers.mjs <o3 scratch dir with wire-v3/>
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as live from '../../../scripts/eom/EomResponseRecord.mjs';
import * as next from './scripts/eom/EomResponseRecord.mjs';
import { createEomV2HttpClient } from './src/apps/shared/EomV2HttpClient.js';
const dir = process.argv[2];
const rows = [];
let ok = true;
const check = (name, passed, detail = '') => { rows.push({ check: name, passed: !!passed, detail: String(detail) }); console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}  [${detail}]`); ok &&= !!passed; return !!passed; };
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const artifact = { id: 'known', bytes: 1, sha256: 'known', durable: true };

console.log('Known cases, before any target');
const v2Files = ['.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/evolve-three-path.stdout',
  '.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/evolve-canonical.stdout',
  '.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/evolve-surface.stdout',
  ...fs.readdirSync('.local-data/eom/surface-stage-e-2026-10-11/records').filter(n => n.endsWith('.json') && !n.endsWith('.complete.json')).map(n => '.local-data/eom/surface-stage-e-2026-10-11/records/' + n)];
let parity = 0, considered = 0;
for (const file of v2Files) {
  const payload = read(file);
  if (payload.schema !== 'eom_evolution_response/v2') continue;
  considered += 1;
  if (JSON.stringify(live.createEomResponseView(structuredClone(payload), artifact)) === JSON.stringify(next.createEomResponseView(structuredClone(payload), artifact))) parity += 1;
}
let known = check('known: every retained v2 evolution view, Surface included, is byte-identical under the new projection', parity === considered && considered >= 3, `${parity} of ${considered}`);
const small = next.createEomResponseView({ schema: 'eom_evolution_response/v2', surfaceDiagnostics: [{ pathId: 'p0', reception: ['0', '1'] }], ledgers: { pointRoots: [1, 2] }, publishedExtensions: [] }, { sha256: 'known' });
known &&= check('known: the Surface stage E fixture view assertions hold', small.record.ledgerCounts.pointRoots === 2 && small.surfaceDiagnostics.length === 1 && small.ledgers === undefined);
const error = { schema: 'eom_error/v2', status: 'rejected', code: 'x', error: 'x' };
known &&= check('known: an error document passes through unchanged', next.createEomResponseView(error, artifact) === error);
if (!known) { console.log('KNOWN CASE FAILED; no target evaluated.'); process.exit(2); }

console.log('\nTargets');
for (const schema of ['eom_inspection/v2', 'eom_inspection/v3', 'eom_equation_capabilities/v1', 'eom_cancel_request/v2']) {
  const doc = { schema };
  check(`${schema} passes through unchanged`, next.createEomResponseView(doc, artifact) === doc);
}
let refused = null;
try { next.createEomResponseView({ schema: 'eom_evolution_response/v4' }, artifact); } catch (e) { refused = e.code; }
check('an unknown evolution schema is refused, raw evidence retained', refused === 'record_projection_unsupported', refused);
const adaptive = read(path.join(dir, 'wire-v3/v3-uninterrupted-adaptive.stdout'));
const view = next.createEomResponseView(structuredClone(adaptive), artifact);
const original = adaptive.validated.attempts, shown = view.validated.attempts;
const stride = Math.ceil(original.length / 128);
check('v3 view: the attempt log is a stride sample of original rows, never interpolated, last row kept, count recorded',
  shown.every((rowValue, i) => JSON.stringify(rowValue) === JSON.stringify(i === shown.length - 1 ? original.at(-1) : original[i * stride]))
  && JSON.stringify(shown.at(-1)) === JSON.stringify(original.at(-1)) && view.record.validatedAttempts.originalCount === original.length
  && view.record.validatedAttempts.displayedCount === shown.length && shown.length <= 129,
  `${original.length} rows, ${shown.length} shown, stride ${stride}`);
check('v3 view: under 12 MiB, v2 ledgers projected away and counted, ledger totals kept',
  Buffer.byteLength(JSON.stringify(view)) <= next.EOM_RECORD_VIEW_LIMIT && view.ledgers === undefined && view.record.ledgerCounts.steps === adaptive.ledgers.steps.length
  && JSON.stringify(view.validated.ledgerTotals) === JSON.stringify(adaptive.validated.ledgerTotals), `${Buffer.byteLength(JSON.stringify(view))} bytes`);
const big = structuredClone(adaptive);
big.validated.attempts = Array.from({ length: 200000 }, (_, i) => original[i % original.length]);
const bigView = next.createEomResponseView(big, artifact);
check('v3 view of a 200000-row log stays bounded and keeps the last row', bigView.validated.attempts.length <= 129 && JSON.stringify(bigView.validated.attempts.at(-1)) === JSON.stringify(big.validated.attempts.at(-1)), `${bigView.validated.attempts.length} rows shown`);

// Execution binding, against the request the wire run sent.
const seg = z => ({ kind: 'cubic', segments: [{ start: '-20', end: '0', coefficients: [['0','0','0','0'],['0','0','0','0'],[z,'0','0','0']], positionErrors: ['0','0','0'], velocityErrors: ['0','0','0'] }] });
const request = { schema: 'eom_evolution_request/v3', runId: 'o3-run', model: { fieldSpeed: '1', coupling: '0.001' }, interval: { start: '0', end: '0.0625' },
  paths: [{ pathId: 'receiver', charge: '1', history: seg('0') }, { pathId: 'plus', charge: '1', history: seg('10') }, { pathId: 'minus', charge: '-1', history: seg('11') }],
  numerics: { initialStep: '0.0078125', minimumStep: '0.0078125' },
  execution: { method: 'canonical_validated_far_step_evolution/v1', positionIncrementBudget: '0.000001', velocityIncrementBudget: '0.000001', pairPolicy: 'canonical_whole_step_piecewise_tube/v1', groups: [['plus','minus']], maximumAcceptedSteps: 8 } };
const raw = JSON.stringify({ operation: 'evolve', request });
const whole = read(path.join(dir, 'wire-v3/v3-evolve-whole.stdout'));
const binding = (rawRequest, payload) => { try { next.assertEomExecutionBinding(rawRequest, payload); return 'bound'; } catch (e) { return e.code; } };
check('binding: the genuine v3 response binds, including the server digest recomputed in Node', binding(raw, whole) === 'bound');
check('binding: a changed executionDigest is refused', binding(raw, { ...whole, executionDigest: '0'.repeat(64) }) === 'execution_binding_mismatch');
check('binding: a changed reported execution is refused', binding(raw, { ...whole, execution: { ...whole.execution, pairPolicy: 'disabled' } }) === 'execution_binding_mismatch');
check('binding: a different declared limit is refused', binding(raw, { ...whole, resources: { ...whole.resources, maximumAcceptedSteps: 9 } }) === 'execution_binding_mismatch');
check('binding: a v2 response to a v3 request is refused', binding(raw, { ...whole, schema: 'eom_evolution_response/v2' }) === 'execution_binding_mismatch');
check('binding: a v3 response to a v2 request is refused', binding(JSON.stringify({ operation: 'evolve', request: { ...request, schema: 'eom_evolution_request/v2' } }), whole) === 'execution_binding_mismatch');
check('binding: v2 traffic is untouched', binding(JSON.stringify({ operation: 'evolve', request: { ...request, schema: 'eom_evolution_request/v2' } }), read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/evolve-three-path.stdout')) === 'bound');

// Browser client with a stubbed service.
const inspection = read(path.join(dir, 'wire-v3/v3-inspect.stdout'));
const browser = async (inspectDoc, responseDoc, req) => {
  const fetchImpl = async (url) => ({ ok: true, status: 200, text: async () => JSON.stringify(url.endsWith('/inspect') ? inspectDoc : responseDoc), json: async () => ({}) });
  try { await createEomV2HttpClient({ fetchImpl }).evolve(req); return 'accepted'; } catch (e) { return e.message.slice(0, 40); }
};
check('browser: a v3 run with matching inspection and response is accepted', await browser(inspection, whole, request) === 'accepted');
check('browser: a v3 response with another executionDigest is refused', await browser(inspection, { ...whole, executionDigest: '0'.repeat(64) }, request) !== 'accepted');
check('browser: a v2 response to a v3 request is refused', await browser(inspection, { ...whole, schema: 'eom_evolution_response/v2' }, request) !== 'accepted');
check('browser: a v3 request with a v2 inspection is refused', await browser({ ...inspection, schema: 'eom_inspection/v2' }, whole, request) !== 'accepted');
const v2Response = read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/evolve-three-path.stdout');
const v2Inspection = read('.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-outputs/inspect-three-path.stdout');
check('browser: a v2 run is still accepted as before', await browser(v2Inspection, v2Response, { runId: v2Response.runId, schema: 'eom_evolution_request/v2' }) === 'accepted');
check('browser: a v3 response to a v2 request is refused', await browser(v2Inspection, { ...whole, runId: v2Response.runId, modelDigest: v2Response.modelDigest, resolvedModel: v2Response.resolvedModel }, { runId: v2Response.runId, schema: 'eom_evolution_request/v2' }) !== 'accepted');
const passed = rows.filter(r => r.passed).length;
console.log(`\n${passed} of ${rows.length} checks passed.`);
fs.writeFileSync(path.join(dir, 'o3-consumer-check.json'), JSON.stringify({ schema: 'ordinary_integration_o3_consumer_check/v1', all_passed: ok, rows }, null, 1) + '\n');
process.exit(ok ? 0 : 1);

// Presentation projection of a retained EOM result. No numerical evolution.
import { createHash } from 'node:crypto';
import { EOM_V3_REQUEST, canonicalJson, eomRequestVersion, expectedEomExecution } from '../../src/apps/shared/EomExecutionIdentity.js';
export const EOM_RECORD_VIEW_LIMIT = 12 * 1024 * 1024;
// Supported documents that are not evolution responses pass through
// unchanged. Any other schema is refused; its raw bytes stay retained.
const EOM_PASSTHROUGH_SCHEMAS = new Set(['eom_error/v2', 'eom_inspection/v2', 'eom_inspection/v3', 'eom_equation_capabilities/v1', 'eom_cancel_request/v2']);
export function createEomResponseView(payload, artifact, options = {}) {
  if (![undefined, "inline", "reference"].includes(options.checkpointMode)) throw new Error("Unsupported checkpoint presentation mode.");
  if (payload.schema === 'eom_evolution_response/v3') return createEomV3View(payload, artifact, options);
  if (payload.schema !== 'eom_evolution_response/v2') {
    if (EOM_PASSTHROUGH_SCHEMAS.has(payload.schema)) return payload;
    throw Object.assign(new Error(`EOM projection does not support schema ${payload.schema}; complete raw evidence remains retained.`), { code: 'record_projection_unsupported' });
  }
  return projectEvolution(payload, artifact, options);
}
// The v3 view: the v2 projection of every v2 field, and the validated
// attempt log sampled by stride, never interpolated, with its last row and
// original count. The complete log stays in the raw artifact.
function createEomV3View(payload, artifact, options) {
  const attempts = payload.validated?.attempts ?? [];
  const stride = Math.max(1, Math.ceil(attempts.length / 128));
  const shown = [];
  for (let i = 0; i < attempts.length; i += stride) shown.push(attempts[i]);
  if (attempts.length && shown.at(-1) !== attempts.at(-1)) shown.push(attempts.at(-1));
  const view = projectEvolution({ ...payload, validated: { ...payload.validated, attempts: shown } }, artifact, options);
  view.record.validatedAttempts = { originalCount: attempts.length, displayedCount: shown.length,
    sampling: 'stride sample of the complete attempt log; never interpolated; last row kept; complete log retained in the raw artifact' };
  if (Buffer.byteLength(JSON.stringify(view)) > EOM_RECORD_VIEW_LIMIT) throw Object.assign(new Error('EOM playback view exceeds 12 MiB; complete raw evidence remains retained.'), { code: 'record_view_budget_exhausted' });
  return view;
}
// The supported response schemas of each operation, by request version.
// Every route checks them, retained or not; error documents are always
// supported.
const EOM_RESPONSE_SCHEMAS = {
  v2: { evolve: 'eom_evolution_response/v2', resume: 'eom_evolution_response/v2', inspect: 'eom_inspection/v2' },
  v3: { evolve: 'eom_evolution_response/v3', resume: 'eom_evolution_response/v3', inspect: 'eom_inspection/v3' },
};
export function assertEomResponseSchema(rawRequest, payload) {
  const fail = message => { throw Object.assign(new Error(`EOM response schema: ${message}.`), { code: 'unsupported_response_schema' }); };
  let envelope;
  try { envelope = JSON.parse(rawRequest); } catch { fail('the request is not readable JSON'); }
  if (payload?.schema === 'eom_error/v2') return;
  const operation = envelope?.operation;
  if (operation === 'capabilities') { if (payload?.schema !== 'eom_equation_capabilities/v1') fail(`capabilities answered by ${payload?.schema}`); return; }
  if (operation === 'validate-cancel') { if (payload?.schema !== 'eom_cancel_request/v2') fail(`cancel validation answered by ${payload?.schema}`); return; }
  if (!['evolve', 'resume', 'inspect'].includes(operation)) fail(`unsupported operation ${operation}`);
  let version;
  try { version = eomRequestVersion(envelope?.request); } catch (error) { fail(error.message); }
  const expected = EOM_RESPONSE_SCHEMAS[version][operation];
  if (payload?.schema !== expected) fail(`a ${version} ${operation} answered by ${payload?.schema}`);
}
// A v3 evolution or inspection must report exactly the normalized execution
// its v3 request declares, every default included, with that execution's
// digest and the declared per-invocation limit.
export function assertEomExecutionBinding(rawRequest, payload) {
  const fail = message => { throw Object.assign(new Error(`EOM execution binding: ${message}.`), { code: 'execution_binding_mismatch' }); };
  let request;
  let operation;
  try { const envelope = JSON.parse(rawRequest); request = envelope?.request; operation = envelope?.operation; } catch { fail('the request is not readable JSON'); }
  if (['evolve', 'resume', 'inspect'].includes(operation)) { try { eomRequestVersion(request); } catch (error) { fail(error.message); } }
  const v3Response = payload?.schema === 'eom_evolution_response/v3' || payload?.schema === 'eom_inspection/v3';
  if (request?.schema !== EOM_V3_REQUEST) { if (v3Response) fail('a v3 document answers a request that is not v3'); return; }
  if (payload?.schema === 'eom_error/v2') return;
  if (!v3Response) fail(`a v3 request was answered by ${payload?.schema}`);
  const expected = expectedEomExecution(request);
  const digest = createHash('sha256').update(canonicalJson(expected.execution)).digest('hex');
  if (canonicalJson(payload.execution) !== canonicalJson(expected.execution)) fail('the reported execution is not the normalized execution the request declares');
  if (payload.executionDigest !== digest) fail('executionDigest is not the digest of the declared execution');
  if (payload.resources?.maximumAcceptedSteps !== expected.maximumAcceptedSteps) fail('maximumAcceptedSteps differs from the request');
}
function projectEvolution(payload, artifact, options) {
  const grouped = new Map();
  for (const row of payload.surfaceDiagnostics ?? []) {
    const rows = grouped.get(row.pathId) ?? []; rows.push(row); grouped.set(row.pathId, rows);
  }
  const diagnostics = [];
  for (const rows of grouped.values()) {
    const stride = Math.max(1, Math.ceil(rows.length / 128));
    for (let i = 0; i < rows.length; i += stride) diagnostics.push(rows[i]);
    if (rows.length && diagnostics.at(-1) !== rows.at(-1)) diagnostics.push(rows.at(-1));
  }
  const { ledgers, surfaceDiagnostics, ...rest } = payload;
  const solutions = ledgers?.surfaceSolutions ?? [];
  const geometry = solutions.flatMap(row => row.geometry ?? []);
  const maximum = (rows,key) => rows.length ? rows.reduce((value,row)=>Math.max(value,Number(row[key])),0).toString() : null;
  if (options.checkpointMode === "reference" && rest.checkpoint?.durable && rest.checkpoint.id) {
    rest.checkpoint = { ...rest.checkpoint, data: null, retrieval: "solver-host", href: `/api/eom/v2/checkpoints/${encodeURIComponent(rest.checkpoint.id)}` };
  }
  const view = { ...rest, surfaceDiagnostics: diagnostics,
    record: { schema: 'eom_record_view/v1', artifact, diagnostics: 'sampled receiver-total interval records; never interpolated',
      acceptedSurface: {certificateCount:solutions.length, certifiedCount:solutions.filter(row=>row.certified && (row.geometry ?? []).every(g=>g.certified)).length,
        maximumDistance:maximum(geometry,'maximumDistance'),maximumTangentVelocity:maximum(geometry,'maximumTangentVelocity')},
      originalDiagnosticCount: surfaceDiagnostics?.length ?? 0, displayedDiagnosticCount: diagnostics.length,
      ledgerCounts: Object.fromEntries(Object.entries(ledgers ?? {}).map(([key, rows]) => [key, rows.length])),
      ledgerPolicy: 'complete ledgers retained in the raw artifact; omitted from playback view' } };
  if (Buffer.byteLength(JSON.stringify(view)) > EOM_RECORD_VIEW_LIMIT) throw Object.assign(new Error('EOM playback view exceeds 12 MiB; complete raw evidence remains retained.'), { code: 'record_view_budget_exhausted' });
  return view;
}

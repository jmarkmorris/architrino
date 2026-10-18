// Presentation projection of a retained EOM result. No numerical evolution.
import { createHash } from 'node:crypto';
export const EOM_RECORD_VIEW_LIMIT = 12 * 1024 * 1024;
// Supported documents that are not evolution responses pass through
// unchanged. Any other schema is refused; its raw bytes stay retained.
const EOM_PASSTHROUGH_SCHEMAS = new Set(['eom_error/v2', 'eom_inspection/v2', 'eom_inspection/v3', 'eom_equation_capabilities/v1', 'eom_cancel_request/v2']);
export function createEomResponseView(payload, artifact) {
  if (payload.schema === 'eom_evolution_response/v3') return createEomV3View(payload, artifact);
  if (payload.schema !== 'eom_evolution_response/v2') {
    if (EOM_PASSTHROUGH_SCHEMAS.has(payload.schema)) return payload;
    throw Object.assign(new Error(`EOM projection does not support schema ${payload.schema}; complete raw evidence remains retained.`), { code: 'record_projection_unsupported' });
  }
  return projectEvolution(payload, artifact);
}
// The v3 view: the v2 projection of every v2 field, and the validated
// attempt log sampled by stride, never interpolated, with its last row and
// original count. The complete log stays in the raw artifact.
function createEomV3View(payload, artifact) {
  const attempts = payload.validated?.attempts ?? [];
  const stride = Math.max(1, Math.ceil(attempts.length / 128));
  const shown = [];
  for (let i = 0; i < attempts.length; i += stride) shown.push(attempts[i]);
  if (attempts.length && shown.at(-1) !== attempts.at(-1)) shown.push(attempts.at(-1));
  const view = projectEvolution({ ...payload, validated: { ...payload.validated, attempts: shown } }, artifact);
  view.record.validatedAttempts = { originalCount: attempts.length, displayedCount: shown.length,
    sampling: 'stride sample of the complete attempt log; never interpolated; last row kept; complete log retained in the raw artifact' };
  if (Buffer.byteLength(JSON.stringify(view)) > EOM_RECORD_VIEW_LIMIT) throw Object.assign(new Error('EOM playback view exceeds 12 MiB; complete raw evidence remains retained.'), { code: 'record_view_budget_exhausted' });
  return view;
}
const sortedJson = value => Array.isArray(value) ? value.map(sortedJson)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, sortedJson(value[key])])) : value;
// A v3 evolution response must answer a v3 request, report the execution
// that request declared, and carry that execution's digest; a v3 request
// must not be answered by a v2 response.
export function assertEomExecutionBinding(rawRequest, payload) {
  const fail = message => { throw Object.assign(new Error(`EOM execution binding: ${message}.`), { code: 'execution_binding_mismatch' }); };
  let request;
  try { request = JSON.parse(rawRequest)?.request; } catch { fail('the request is not readable JSON'); }
  const v3Request = request?.schema === 'eom_evolution_request/v3';
  if (payload?.schema === 'eom_evolution_response/v2' && v3Request) fail('a v3 request was answered by a v2 response');
  if (payload?.schema !== 'eom_evolution_response/v3') return;
  if (!v3Request || !request.execution) fail('a v3 response answers a request that is not v3');
  const digest = createHash('sha256').update(JSON.stringify(sortedJson(payload.execution))).digest('hex');
  if (digest !== payload.executionDigest) fail('executionDigest is not the digest of the reported execution');
  for (const [key, value] of Object.entries(request.execution)) {
    if (key === 'maximumAcceptedSteps') continue;
    if (JSON.stringify(sortedJson(value)) !== JSON.stringify(sortedJson(payload.execution?.[key]))) fail(`execution.${key} differs from the request`);
  }
  if (payload.resources?.maximumAcceptedSteps !== request.execution.maximumAcceptedSteps) fail('maximumAcceptedSteps differs from the request');
}
function projectEvolution(payload, artifact) {
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

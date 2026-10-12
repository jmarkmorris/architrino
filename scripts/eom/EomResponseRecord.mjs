// Presentation projection of a retained EOM result. No numerical evolution.
export const EOM_RECORD_VIEW_LIMIT = 12 * 1024 * 1024;
export function createEomResponseView(payload, artifact) {
  if (payload.schema !== 'eom_evolution_response/v2') return payload;
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

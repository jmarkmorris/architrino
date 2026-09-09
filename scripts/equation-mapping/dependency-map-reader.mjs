import crypto from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import jsonld from 'jsonld';
import { Store, Parser, DataFactory } from 'n3';
import { QueryEngine } from '@comunica/query-sparql-rdfjs';

export const NS = 'https://example.invalid/option-b-corrected/';
export const CONTEXT = { '@vocab': NS, kind: { '@type': '@vocab' }, fromObject: { '@type': '@id' }, toObject: { '@type': '@id' } };
export const HISTORICAL = 'reference/priorities/development-process-review/evidence/option-b-corrected-candidate';
export const MAP_PATH = 'reference/priorities/master-equation-closure/contracts/moving-single-root-dependencies.jsonld';
export const BASELINE_COMMIT = '83da8fb83f984e36ac44279e5399e219e887953e';
export const sha256 = raw => crypto.createHash('sha256').update(raw).digest('hex');
const kinds = new Set(['dependsOn', 'verifies', 'checks', 'usesInput', 'generatedBy']);
const types = new Set(['Assumption', 'EquationOccurrence', 'Derivation', 'CalculationSpecification', 'Result', 'CheckObligation', 'CalculationRun']);
const objectKeys = ['@id', '@type', 'alias', 'revisionId', 'sourceBindings', 'scope'];
const relationKeys = ['@id', '@type', 'revisionId', 'kind', 'fromObject', 'fromRevision', 'toObject', 'toRevision', 'role', 'meaning', 'justifications'];
function requireValue(condition, message) { if (!condition) throw new Error(message); }
function keys(value, expected) {
  requireValue(value && typeof value === 'object' && !Array.isArray(value), 'Expected object');
  requireValue(isDeepStrictEqual(Object.keys(value).sort(), [...expected].sort()), 'Unsupported or missing fields');
}
function text(value) { requireValue(typeof value === 'string' && value.length > 0, 'Expected nonempty text'); }
function iri(value) { text(value); requireValue(/^https:\/\/[^\s<>"{}|^`\\]+$/u.test(value), 'Invalid identity'); }
export function safePath(value) {
  text(value); requireValue(!value.startsWith('/') && !value.includes('\\') && !value.includes('\0') && value.split('/').every(x => x && x !== '..' && x !== '.'), 'Unsafe source path');
  return value;
}
export function select(files, binding) {
  keys(binding, ['path', 'selector', 'contract', 'sha256']);
  safePath(binding.path);
  requireValue(binding.contract === 'fixed-byte-selection/v1', 'Unknown binding contract');
  requireValue(/^[a-f0-9]{64}$/u.test(binding.sha256), 'Invalid digest');
  const raw = files.get(binding.path); requireValue(Buffer.isBuffer(raw), `Missing source: ${binding.path}`);
  const selector = binding.selector;
  if (selector.kind === 'whole') { keys(selector, ['kind']); return raw; }
  if (selector.kind === 'lines') {
    keys(selector, ['kind', 'first', 'last']);
    const { first, last } = selector;
    // Byte ranges preserve CRLF exactly; the final unterminated line is retained.
    const offsets = [0]; for (let i = 0; i < raw.length; i++) if (raw[i] === 10) offsets.push(i + 1);
    const count = offsets.at(-1) === raw.length ? offsets.length - 1 : offsets.length;
    requireValue(Number.isInteger(first) && Number.isInteger(last) && first >= 1 && first <= last && last <= count, 'Line bounds');
    return raw.subarray(offsets[first - 1], offsets[last] ?? raw.length);
  }
  requireValue(selector.kind === 'literal', 'Unknown selector'); keys(selector, ['kind', 'text']); text(selector.text);
  const needle = Buffer.from(selector.text); const index = raw.indexOf(needle);
  requireValue(index >= 0 && raw.indexOf(needle, index + 1) < 0, 'Missing or ambiguous literal'); return needle;
}
export function bindingsOf(document) { return document['@graph'].flatMap(r => r.sourceBindings ?? r.justifications ?? []); }
export function sourcePaths(document) { return [...new Set(bindingsOf(document).map(b => safePath(b.path)))].sort(); }

// This fixed migration preserves the reviewed pilot's scientific records and IDs.
// It resolves four historical artifact paths; it does not approve new bytes.
export function migrateReviewedPilot(pilot) {
  const result = structuredClone(pilot); result['@context'] = CONTEXT; result.schemaVersion = 'option-b-map/v1';
  for (const b of bindingsOf(result)) if (!b.path.includes('/')) b.path = `${HISTORICAL}/${b.path}`;
  return result;
}
export async function validate(files, document) {
  keys(document, ['@context', 'schemaVersion', 'scope', 'approval', 'sourceCommit', '@graph']);
  requireValue(isDeepStrictEqual(document['@context'], CONTEXT), 'Unsupported context');
  requireValue(document.schemaVersion === 'option-b-map/v1' && ['moving-single-root-only', 'finite-ledger-superposition-only'].includes(document.scope) && document.approval === 'not-granted', 'Unsupported schema, scope or approval');
  requireValue(/^[a-f0-9]{40}$/u.test(document.sourceCommit), 'Invalid source commit');
  requireValue(Array.isArray(document['@graph']) && document['@graph'].length > 0, 'Empty graph');
  const objects = new Map(), relations = new Map(), aliases = new Set(), ids = new Set();
  for (const row of document['@graph']) {
    const relationship = row['@type'] === 'Relationship'; keys(row, relationship ? relationKeys : objectKeys);
    iri(row['@id']); text(row.revisionId); requireValue(!ids.has(row['@id']), 'Duplicate identity'); ids.add(row['@id']);
    if (relationship) { text(row.role); text(row.meaning); relations.set(row['@id'], row); }
    else {
      requireValue(types.has(row['@type']), 'Unknown object type'); text(row.alias); text(row.scope);
      requireValue(!aliases.has(row.alias), 'Duplicate alias'); aliases.add(row.alias); objects.set(row['@id'], row);
    }
    const bindings = row.sourceBindings ?? row.justifications;
    requireValue(Array.isArray(bindings) && bindings.length > 0, 'Missing source bindings');
    for (const binding of bindings) requireValue(sha256(select(files, binding)) === binding.sha256, `Stale binding: ${row['@id']}`);
  }
  const triples = new Set();
  for (const row of relations.values()) {
    requireValue(row.kind.startsWith(NS) && kinds.has(row.kind.slice(NS.length)), 'Unknown relation');
    for (const side of ['from', 'to']) requireValue(objects.has(row[`${side}Object`]) && objects.get(row[`${side}Object`]).revisionId === row[`${side}Revision`], 'Dangling or stale endpoint');
    const from = objects.get(row.fromObject), to = objects.get(row.toObject);
    if (row.kind === NS + 'checks') requireValue(from['@type'] === 'CheckObligation', 'checks source type');
    if (row.kind === NS + 'usesInput') requireValue(from['@type'] === 'CalculationRun', 'usesInput source type');
    if (row.kind === NS + 'generatedBy') requireValue(from['@type'] === 'Result' && to['@type'] === 'CalculationRun', 'generation endpoint types');
    const triple = JSON.stringify([row.kind, row.fromObject, row.toObject]); requireValue(!triples.has(triple), 'Duplicate relation'); triples.add(triple);
  }
  // No network loader, remote source, SERVICE clause, entailment, or query input.
  const nquads = await jsonld.toRDF(document, { format: 'application/n-quads', safe: true, documentLoader: async () => { throw new Error('External context prohibited'); } });
  const records = new Store(new Parser({ format: 'N-Quads' }).parse(nquads));
  const impact = new Store();
  for (const row of relations.values()) if (row.kind !== NS + 'checks') impact.addQuad(DataFactory.namedNode(row.fromObject), DataFactory.namedNode(NS + 'impactInput'), DataFactory.namedNode(row.toObject));
  return { objects, relations, records, impact };
}
export async function affected(snapshot, seeds) {
  const result = new Set(seeds); if (!seeds.size) return result;
  for (const seed of seeds) iri(seed);
  const engine = new QueryEngine();
  const stream = await engine.queryBindings(`SELECT DISTINCT ?x WHERE { VALUES ?seed { ${[...seeds].map(x => `<${x}>`).join(' ')} } ?x <${NS}impactInput>+ ?seed }`, { sources: [snapshot.impact] });
  for (const row of await stream.toArray()) result.add(row.get('x').value);
  return result;
}
export async function compare(baseFiles, base, files, current) {
  requireValue(base.scope === current.scope, 'Cross-scope comparison prohibited');
  const old = await validate(baseFiles, base), now = await validate(files, current);
  const oldRows = new Map(base['@graph'].map(r => [r['@id'], r]));
  for (const row of current['@graph']) {
    const prior = oldRows.get(row['@id']);
    requireValue(!prior || isDeepStrictEqual(prior, row) || prior.revisionId !== row.revisionId, 'Version reuse');
  }
  const changed = (a, b) => [...new Set([...a.keys(), ...b.keys()])].filter(k => !isDeepStrictEqual(a.get(k), b.get(k)));
  const changedObjects = changed(old.objects, now.objects), changedRelations = changed(old.relations, now.relations);
  const seeds = new Set(changedObjects);
  for (const id of changedRelations) for (const row of [old.relations.get(id), now.relations.get(id)]) if (row) seeds.add(row.kind === NS + 'checks' ? row.toObject : row.fromObject);
  const impact = new Set([...await affected(old, seeds), ...await affected(now, seeds)]);
  const changedFiles = changed(baseFiles, files).sort();
  const selected = new Set();
  for (const row of [...old.relations.values(), ...now.relations.values()]) if (row.kind === NS + 'checks' && (impact.has(row.toObject) || changedFiles.length)) selected.add(row.fromObject);
  const objects = new Map([...old.objects, ...now.objects]); const aliases = ids => [...ids].map(id => objects.get(id)?.alias ?? id).sort();
  return { consistency: 'pass', review: changedFiles.length || !isDeepStrictEqual(base, current) ? 'required' : 'unchanged-relative-to-selected-baseline', approval: 'not-granted', changedFiles, changedObjects: aliases(changedObjects), changedRelations: changedRelations.sort(), removedRelations: [...old.relations.keys()].filter(k => !now.relations.has(k)).sort(), addedRelations: [...now.relations.keys()].filter(k => !old.relations.has(k)).sort(), affected: aliases(impact), selectedChecks: aliases(selected), objects: now.objects.size, relationships: now.relations.size };
}
export function compareDisplayedResult(text, output) {
  const matches = [...text.matchAll(/Across five step refinements, the largest component residual was \$(\d+\.\d+)\\times10\^\{(-?\d+)\}\$/gu)];
  requireValue(matches.length === 1, 'Expected exactly one displayed maximum');
  const [, mantissa, exponentText] = matches[0], exponent = Number(exponentText);
  const displayed = Number(mantissa) * 10 ** exponent, tolerance = 10 ** (exponent - mantissa.split('.')[1].length) / 2;
  const actual = output.maximumAbsoluteResidualAcrossRows; requireValue(Number.isFinite(actual) && Number.isFinite(displayed) && tolerance > 0, 'Invalid residual');
  return { status: Math.abs(displayed - actual) <= tolerance ? 'pass' : 'reject', displayed, actual, tolerance, coverage: 'one displayed maximum only' };
}
export async function preflight() {
  requireValue(sha256(Buffer.from('abc')) === 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'SHA control');
  const raw = Buffer.from('one\r\ntwo\nthree'), files = new Map([['known.txt', raw]]);
  const binding = { path: 'known.txt', selector: { kind: 'lines', first: 1, last: 1 }, contract: 'fixed-byte-selection/v1', sha256: sha256(Buffer.from('one\r\n')) };
  requireValue(select(files, binding).equals(Buffer.from('one\r\n')), 'CRLF control');
  const fixture = { '@context': CONTEXT, schemaVersion: 'option-b-map/v1', scope: 'moving-single-root-only', approval: 'not-granted', sourceCommit: '0'.repeat(40), '@graph': [] };
  for (const alias of ['a', 'b', 'c', 'test']) fixture['@graph'].push({ '@id': NS + alias, '@type': alias === 'test' ? 'CheckObligation' : 'Assumption', alias, revisionId: '1', scope: 'known control', sourceBindings: [binding] });
  for (const [kind, from, to] of [['dependsOn', 'b', 'a'], ['dependsOn', 'c', 'b'], ['checks', 'test', 'c']]) fixture['@graph'].push({ '@id': NS + kind + from + to, '@type': 'Relationship', revisionId: '1', kind: NS + kind, fromObject: NS + from, fromRevision: '1', toObject: NS + to, toRevision: '1', role: 'control', meaning: 'known hand graph', justifications: [binding] });
  requireValue(isDeepStrictEqual([...await affected(await validate(files, fixture), new Set([NS + 'a']))].sort(), ['a', 'b', 'c'].map(x => NS + x)), 'Hand graph closure');
  const removed = structuredClone(fixture); removed['@graph'] = removed['@graph'].filter(x => x['@id'] !== NS + 'dependsOnba');
  const report = await compare(files, fixture, files, removed);
  requireValue(isDeepStrictEqual(report.affected, ['b', 'c']) && isDeepStrictEqual(report.selectedChecks, ['test']), 'Deleted dependency control');
  const missingCoverage = structuredClone(fixture); missingCoverage['@graph'].pop();
  requireValue(isDeepStrictEqual((await compare(files, fixture, files, missingCoverage)).selectedChecks, ['test']), 'Deleted coverage control');
  let rejected = false; try { await validate(new Map([['known.txt', Buffer.from('bad')]]), fixture); } catch { rejected = true; } requireValue(rejected, 'Stale control');
  const display = 'Across five step refinements, the largest component residual was $2.12\\times10^{-12}$';
  requireValue(compareDisplayedResult(display, { maximumAbsoluteResidualAcrossRows: 2.12e-12 }).status === 'pass' && compareDisplayedResult(display, { maximumAbsoluteResidualAcrossRows: 1 }).status === 'reject', 'Result controls');
  for (const value of ['', display + display]) { rejected = false; try { compareDisplayedResult(value, { maximumAbsoluteResidualAcrossRows: 1 }); } catch { rejected = true; } requireValue(rejected, 'Display uniqueness control'); }
  return 'passed: SHA, byte selector, hand closure, deleted dependency/coverage, stale binding, displayed match/wrong/missing/duplicate';
}

// A new chain has no accepted predecessor. Never compare it to itself as approval.
export async function inspectNewChain(files, document) {
  const snapshot = await validate(files, document);
  return { consistency: 'pass', review: 'required', approval: 'not-granted', baseline: 'not-established', objects: snapshot.objects.size, relationships: snapshot.relations.size,
    addedObjects: [...snapshot.objects.values()].map(row => row.alias).sort(),
    addedRelations: [...snapshot.relations.keys()].sort(),
    selectedChecks: [...new Set([...snapshot.relations.values()].filter(row => row.kind === NS + 'checks').map(row => snapshot.objects.get(row.fromObject).alias))].sort(),
    limitation: 'Entire new chain requires review; deleted-edge comparison requires a separately accepted predecessor. No current-map self-baseline is used.' };
}

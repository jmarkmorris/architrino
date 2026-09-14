import { isDeepStrictEqual } from 'node:util';
import jsonld from 'jsonld';
import { Store, Parser, DataFactory } from 'n3';
import { QueryEngine } from '@comunica/query-sparql-rdfjs';
import { NS, validate } from './current-source-manifest.mjs';

async function snapshot(document) {
  const graph = validate(document);
  const quads = await jsonld.toRDF(document, { format: 'application/n-quads', safe: true, documentLoader: async () => { throw Error('External contexts prohibited'); } });
  const records = new Store(new Parser({ format: 'N-Quads' }).parse(quads)), impact = new Store();
  for (const edge of graph.edges) if (edge.kind === 'dependsOn') impact.addQuad(DataFactory.namedNode(edge.from), DataFactory.namedNode(NS + 'input'), DataFactory.namedNode(edge.to));
  return { ...graph, records, impact };
}
export async function compareSourceManifests(previous, current) {
  if (previous.scope !== current.scope || previous.repository !== current.repository) throw Error('Cross-scope comparison');
  const old = await snapshot(previous), now = await snapshot(current);
  const metadataChanged = !isDeepStrictEqual(Object.fromEntries(Object.entries(previous).filter(([k]) => k !== '@graph')), Object.fromEntries(Object.entries(current).filter(([k]) => k !== '@graph')));
  const a = new Map(previous['@graph'].map(r => [r['@id'], r])), b = new Map(current['@graph'].map(r => [r['@id'], r]));
  const changed = [...new Set([...a.keys(), ...b.keys()])].filter(id => !isDeepStrictEqual(a.get(id), b.get(id)));
  for (const id of changed) if (a.has(id) && b.has(id) && a.get(id).revisionId === b.get(id).revisionId) throw Error('Revision reuse');
  const seeds = new Set();
  for (const id of changed) for (const row of [a.get(id), b.get(id)].filter(Boolean)) {
    if (row['@type'] === 'Source') seeds.add(id);
    else { seeds.add(row.from); seeds.add(row.to); }
  }
  const affected = new Set(seeds), engine = new QueryEngine();
  for (const graph of [old, now]) for (const seed of seeds) {
    // N3 terms serialize fixed validated source IDs; no user-written query text.
    if (!/^https:\/\/[^\s<>"{}|^`\\]+$/u.test(seed)) throw Error('Unsafe query identity');
    const results = await engine.queryBindings(`SELECT DISTINCT ?x WHERE { ?x <${NS}input>+ <${seed}> }`, { sources: [graph.impact] });
    for (const row of await results.toArray()) affected.add(row.get('x').value);
  }
  const checks = new Set([...old.edges, ...now.edges].filter(e => e.kind === 'checks' && affected.has(e.to)).map(e => e.from));
  for (const source of [...old.sources.values(), ...now.sources.values()]) if (source.role === 'admission' && affected.has(source['@id'])) checks.add(source['@id']);
  return { status: changed.length || metadataChanged ? 'review-required' : 'unchanged', metadataChanged, changed: changed.sort(), removed: [...a.keys()].filter(k => !b.has(k)).sort(), added: [...b.keys()].filter(k => !a.has(k)).sort(), affected: [...affected].sort(), selectedChecks: [...checks].sort(), authority: 'declared-dependency-impact-only' };
}

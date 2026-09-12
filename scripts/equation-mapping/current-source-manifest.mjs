// Captured by digest before execution. Built-ins only: usable from a data URL.
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import path from 'node:path';

export const NS = 'https://architrino.com/knowledge/current-source/';
export const CONTEXT = { '@vocab': NS, from: { '@type': '@id' }, to: { '@type': '@id' } };
export const sha256 = raw => createHash('sha256').update(raw).digest('hex');
const demand = (ok, message) => { if (!ok) throw Error(message); };
const keys = (o, expected) => demand(o && !Array.isArray(o) && isDeepStrictEqual(Object.keys(o).sort(), expected.split(' ').sort()), 'Malformed record fields');
const text = s => typeof s === 'string' && s.length > 0;
export function safePath(p) {
  demand(text(p) && !p.includes('\\') && !p.includes('\0') && !p.startsWith('/') && p.split('/').every(x => x && x !== '.' && x !== '..'), 'Unsafe source path');
  return p;
}

// Parse twice intentionally: the first pass preserves duplicate member names.
export function decode(raw) {
  demand(Buffer.isBuffer(raw) && raw.length > 0 && raw.length <= 1024 ** 2, 'Manifest byte bound');
  const source = new TextDecoder('utf-8', { fatal: true }).decode(raw);
  let at = 0;
  const space = () => { while (/[\x20\t\r\n]/u.test(source[at] ?? '!')) at++; };
  const string = () => {
    const start = at++;
    while (at < source.length) { const c = source[at++]; if (c === '"') return JSON.parse(source.slice(start, at)); if (c === '\\') at++; }
    throw Error('Unterminated JSON string');
  };
  function visit(depth) {
    demand(depth < 64, 'Manifest depth bound'); space(); const c = source[at];
    if (c === '"') { string(); return; }
    if (c === '{' || c === '[') {
      const object = c === '{', end = object ? '}' : ']'; at++; space();
      const seen = new Set(); if (source[at] === end) { at++; return; }
      while (true) {
        space();
        if (object) { demand(source[at] === '"', 'JSON key'); const key = string(); demand(!seen.has(key), 'Duplicate JSON key'); seen.add(key); space(); demand(source[at++] === ':', 'JSON colon'); }
        visit(depth + 1); space(); const sep = source[at++]; if (sep === end) return; demand(sep === ',', 'JSON separator');
      }
    }
    const match = /^(?:null|true|false|-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/u.exec(source.slice(at));
    demand(match, 'JSON value'); at += match[0].length;
  }
  visit(0); space(); demand(at === source.length, 'Trailing JSON bytes'); return JSON.parse(source);
}

export function validate(document) {
  keys(document, '@context schemaVersion scope repository baseline revisionId @graph');
  demand(isDeepStrictEqual(document['@context'], CONTEXT) && document.schemaVersion === 'current-source-manifest/v1', 'Unknown manifest schema/context');
  demand(text(document.scope) && text(document.revisionId) && document.repository === 'https://github.com/jmarkmorris/architrino.git', 'Manifest scope/repository');
  keys(document.baseline, 'commit entry authority'); safePath(document.baseline.entry);
  demand(/^[a-f0-9]{40}$/u.test(document.baseline.commit) && document.baseline.authority === 'operator-directed-existing-A-transfer', 'Baseline identity/authority');
  demand(Array.isArray(document['@graph']) && document['@graph'].length > 0, 'Empty graph');
  const sources = new Map(), edges = [], ids = new Set(), paths = new Set(), triples = new Set();
  for (const row of document['@graph']) {
    demand(text(row['@id']) && row['@id'].startsWith(NS) && !ids.has(row['@id']) && text(row.revisionId), 'Duplicate/invalid identity or revision'); ids.add(row['@id']);
    if (row['@type'] === 'Source') {
      keys(row, '@id @type revisionId role binding'); keys(row.binding, 'path selector contract sha256'); keys(row.binding.selector, 'kind');
      safePath(row.binding.path); demand(!paths.has(row.binding.path), 'Ambiguous source path'); paths.add(row.binding.path);
      demand(row.binding.selector.kind === 'whole' && row.binding.contract === 'fixed-byte-selection/v1' && /^[a-f0-9]{64}$/u.test(row.binding.sha256), 'Unsupported selector or digest');
      demand(['current-source', 'independent-reference', 'scientific-control', 'scientific-contract', 'resource-plan', 'admission', 'launcher', 'manifest-reader'].includes(row.role), 'Unknown source role'); sources.set(row['@id'], row);
    } else {
      keys(row, '@id @type revisionId kind from fromRevision to toRevision role');
      demand(row['@type'] === 'Relationship' && ['dependsOn', 'checks'].includes(row.kind) && text(row.role), 'Unknown relationship'); edges.push(row);
    }
  }
  for (const edge of edges) {
    demand(sources.get(edge.from)?.revisionId === edge.fromRevision && sources.get(edge.to)?.revisionId === edge.toRevision, 'Missing or stale endpoint');
    const triple = JSON.stringify([edge.kind, edge.from, edge.to]); demand(!triples.has(triple), 'Duplicate relationship'); triples.add(triple);
    if (edge.kind === 'checks') demand(sources.get(edge.from).role === 'admission', 'Invalid check endpoint');
  }
  demand([...sources.values()].filter(r => r.role === 'admission').length === 1, 'One admission source required');
  const admission = [...sources.values()].find(r => r.role === 'admission');
  for (const row of sources.values()) if (row !== admission) demand(edges.some(e => e.kind === 'checks' && e.from === admission['@id'] && e.to === row['@id']), 'Missing admission coverage');
  return { sources, edges };
}

export function admit(raw, { root, readBound, scope }) {
  const document = decode(raw), graph = validate(document);
  demand(document.scope === scope, 'Wrong manifest scope');
  const bindings = [...graph.sources.values()].map(row => {
    const filename = path.resolve(root, row.binding.path);
    const { data, ...record } = readBound(filename, row.binding.sha256, false);
    return record;
  });
  const pins = Object.fromEntries([...graph.sources.values()].filter(r => !['admission', 'launcher', 'manifest-reader'].includes(r.role)).map(r => [r.binding.path, r.binding.sha256]));
  return { pins: Object.freeze(pins), bindings, document };
}

// Protected original identities and source generations selected through the B engine.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {captureSet, inspectCurrentSources} from './current-source-transition.mjs';
import {decode, validate, safePath, sha256} from './current-source-manifest.mjs';

export const PRODUCTION_PROFILE = 'production-source-records';
export const PRODUCTION_MANIFEST = 'reference/priorities/development-process-review/contracts/option-b-production-sources.jsonld';
export const PRODUCTION_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-production-selection.json';
export const PRODUCTION_IDENTITIES = 'scripts/equation-mapping/fixtures/production-source-identities.json';
export const PRODUCTION_ORIGINALS = 'reference/priorities/development-process-review/evidence/option-b-production-original-sources.json';
export const PRODUCTION_HISTORICAL = 'reference/priorities/development-process-review/evidence/option-b-production-historical-records.json';
const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const closed = (value, names) => {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), 'Record required');
  assert.deepEqual(Object.keys(value).sort(), names.split(' ').sort(), 'Closed production record required');
};
export function captureProductionIdentities(raw, target) {
  const data = decode(raw);
  closed(data, 'schema algorithm role byConsumer');
  assert.equal(data.schema, 'option-b-production-identities/v1');
  assert.equal(data.algorithm, 'SHA-256');
  assert.equal(data.role, 'original-identities-preserve-individual-applicability');
  assert.ok(data.byConsumer && typeof data.byConsumer === 'object' && !Array.isArray(data.byConsumer));
  for (const [name, values] of Object.entries(data.byConsumer)) {
    safePath(name);
    assert.ok(Array.isArray(values) && values.length > 0, 'Nonempty original identity list required');
    for (const value of values) assert.match(value, /^[a-f0-9]{64}$/u, 'Original SHA-256 identity required');
  }
  assert.ok(Object.hasOwn(data.byConsumer, target), 'Selected identity owner missing');
  return Object.freeze([...data.byConsumer[target]]);
}

export function beginProductionAdmission({root = ROOT, selection, consumer, beforeFinalCheck} = {}) {
  root = fs.realpathSync(root);
  safePath(consumer);
  const captures = captureSet(root);
  // A selected file is an external anchor; it is never synthesized from target bytes.
  const anchorPath = path.join(root, PRODUCTION_SELECTION);
  assert.equal(fs.realpathSync(anchorPath), anchorPath, 'Canonical production selection required');
  const anchorFd = fs.openSync(anchorPath, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
  const identity = stat => [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].map(String);
  let selectionBytes, anchorIdentity;
  try {
    const stat = fs.fstatSync(anchorFd, {bigint: true});
    assert.ok(stat.isFile(), 'Regular production selection required');
    anchorIdentity = identity(stat);
    selectionBytes = fs.readFileSync(anchorFd);
    assert.deepEqual(identity(fs.fstatSync(anchorFd, {bigint: true})), anchorIdentity, 'Selection changed during first read');
  } finally { fs.closeSync(anchorFd); }
  const external = decode(selectionBytes);
  selection ??= external;
  closed(selection, 'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  assert.deepEqual(selection, external, 'Production selection differs from external anchor');
  const anchorCheck = () => {
    assert.deepEqual(identity(fs.lstatSync(anchorPath, {bigint: true})), anchorIdentity, 'Selection replaced after first read');
    captures.capture(PRODUCTION_SELECTION, sha256(selectionBytes));
  };
  anchorCheck();
  let sources, graph, payload;
  inspectCurrentSources({root, ...selection, requiredProfiles: [PRODUCTION_PROFILE], beforeFinalCheck: () => {
    const accepted = decode(captures.capture(selection.acceptedBaseline, selection.acceptedBaselineSha256));
    captures.capture(accepted.historicalProof.path, accepted.historicalProof.sha256);
    const transition = decode(captures.capture(selection.transition, selection.transitionSha256));
    const profile = transition.profiles.find(p => p.name === PRODUCTION_PROFILE);
    assert.equal(profile.manifestPath, PRODUCTION_MANIFEST);
    const document = decode(captures.capture(PRODUCTION_MANIFEST, profile.sha256));
    assert.equal(document.scope, PRODUCTION_PROFILE);
    graph = validate(document);
    sources = new Map([...graph.sources.values()].map(row => [row.binding.path, row]));
    for (const row of sources.values()) captures.capture(row.binding.path, row.binding.sha256);
    const caller = sources.get(consumer), record = sources.get(PRODUCTION_IDENTITIES);
    assert.ok(caller, 'Selected production consumer required');
    assert.equal(record?.role, 'scientific-control', 'Protected original identities required');
    assert.ok(graph.edges.some(e => e.kind === 'dependsOn' && e.from === caller['@id'] && e.to === record['@id']), 'Selected consumer-to-record dependency required');
    payload = captures.capture(PRODUCTION_IDENTITIES, record.binding.sha256);
    const data = decode(payload);
    for (const owner of Object.keys(data.byConsumer ?? {})) assert.ok(sources.has(owner), 'Complete production identity owner census required');
    beforeFinalCheck?.();
    captures.check(); anchorCheck();
  }});
  const check = () => { anchorCheck(); captures.check(); };
  // A dependency may pass through the selected record reader or index. Merely
  // appearing elsewhere in the graph does not grant this caller access.
  const dependency = target => {
    safePath(target);
    assert.ok(sources.has(target), 'Selected target required');
    const wanted = sources.get(target)['@id'], seen = new Set(), pending = [sources.get(consumer)['@id']];
    while (pending.length) {
      const current = pending.pop();
      if (current === wanted) return;
      if (seen.has(current)) continue;
      seen.add(current);
      for (const edge of graph.edges) if (edge.kind === 'dependsOn' && edge.from === current) pending.push(edge.to);
    }
    assert.fail(`Selected consumer dependency required: ${target}`);
  };
  const identities = (target = consumer) => {
    dependency(target);
    const values = captureProductionIdentities(payload, target);
    check(); return values;
  };
  const originalBindings = new Map();
  // Pairing authenticates two generations, not mathematical equivalence. Only
  // the default predecessor has this batch's exact representation-transfer
  // proof; older versions retain their own execution/applicability contract.
  const sourcePair = (target, expectedOriginalSha) => {
    dependency(target); dependency(PRODUCTION_ORIGINALS);
    const index = sources.get(PRODUCTION_ORIGINALS), current = sources.get(target);
    assert.equal(index?.role, 'scientific-control', 'Protected original-source index required');
    assert.ok(current, 'Selected current source required');
    const record = decode(captures.capture(PRODUCTION_ORIGINALS, index.binding.sha256));
    closed(record, 'schema role sources');
    assert.equal(record.schema, 'option-b-production-original-sources/v1');
    assert.equal(record.role, 'historical-source-generations-not-current-acceptance');
    const entry = record.sources[target];
    closed(entry, Object.hasOwn(entry ?? {}, 'versions') ? 'path sha256 versions' : 'path sha256');
    let original = entry;
    if (expectedOriginalSha != null) {
      assert.match(expectedOriginalSha, /^[a-f0-9]{64}$/u, 'Original SHA-256 required');
      if (entry.sha256 !== expectedOriginalSha) original = entry.versions?.[expectedOriginalSha];
      assert.ok(original, 'Selected original generation missing');
      assert.equal(original.sha256, expectedOriginalSha, 'Original generation mismatch');
    }
    if (original !== entry) closed(original, 'path sha256');
    dependency(original.path);
    const archive = sources.get(original.path);
    assert.equal(archive?.role, 'scientific-control', 'Protected historical source required');
    assert.equal(archive.binding.sha256, original.sha256, 'Original source binding mismatch');
    const originalRaw = captures.capture(original.path, original.sha256);
    originalBindings.set(target + '\0' + (expectedOriginalSha ?? ''), Object.freeze({path: path.join(root, original.path), sha256: original.sha256, bytes: originalRaw.length}));
    const utf8 = new TextDecoder('utf-8', {fatal: true});
    const values = Object.hasOwn(decode(payload).byConsumer, target) ? identities(target) : Object.freeze([]);
    const result = Object.freeze({original: utf8.decode(captures.capture(original.path, original.sha256)), current: utf8.decode(captures.capture(target, current.binding.sha256)), identities: values});
    check(); return result;
  };
  const originalSourceBinding = (target, expectedOriginalSha) => {
    sourcePair(target, expectedOriginalSha);
    check();
    return originalBindings.get(target + '\0' + (expectedOriginalSha ?? ''));
  };
  const originalSourceBindingIfPresent = (target, expectedOriginalSha) => {
    safePath(target); dependency(PRODUCTION_ORIGINALS);
    const index = sources.get(PRODUCTION_ORIGINALS);
    assert.equal(index.role, 'scientific-control');
    const record = decode(captures.capture(PRODUCTION_ORIGINALS, index.binding.sha256));
    closed(record, 'schema role sources');
    assert.equal(record.schema, 'option-b-production-original-sources/v1');
    assert.equal(record.role, 'historical-source-generations-not-current-acceptance');
    if (!Object.hasOwn(record.sources, target)) { check(); return null; }
    return originalSourceBinding(target, expectedOriginalSha);
  };
  const historicalRecord = name => {
    assert.match(name, /^[a-z0-9-]+$/u, 'Historical record name required');
    dependency(PRODUCTION_HISTORICAL);
    const index = sources.get(PRODUCTION_HISTORICAL);
    assert.equal(index?.role, 'scientific-control');
    const data = decode(captures.capture(PRODUCTION_HISTORICAL, index.binding.sha256));
    closed(data, 'schema records');
    assert.equal(data.schema, 'option-b-production-historical-records/v1');
    const selected = data.records[name]; closed(selected, 'path sha256'); safePath(selected.path);
    dependency(selected.path);
    const row = sources.get(selected.path);
    assert.equal(row?.role, 'scientific-control');
    assert.equal(row.binding.sha256, selected.sha256);
    const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
    const result = freeze(decode(captures.capture(selected.path, selected.sha256)));
    check(); return result;
  };
  check();
  // The capture set includes every selected source and all five selection
  // anchors; callers merge these physical facts into their existing limits.
  const capturedSources = () => captures.snapshot();
  return Object.freeze({identities, sourcePair, originalSourceBinding, originalSourceBindingIfPresent, historicalRecord, capturedSources, check});
}

const admitted = new Map();
export function productionAdmission(url) {
  const consumer = url.startsWith('file:') ? path.relative(ROOT, fileURLToPath(url)).split(path.sep).join('/') : url;
  if (!admitted.has(consumer)) admitted.set(consumer, beginProductionAdmission({consumer}));
  admitted.get(consumer).check();
  return admitted.get(consumer);
}
export const productionIdentities = (url, target) => productionAdmission(url).identities(target);
export const productionSourcePair = (url, target, expectedOriginalSha) => productionAdmission(url).sourcePair(target, expectedOriginalSha);
export function productionRecheck() { for (const record of admitted.values()) record.check(); }

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const request = decode(fs.readFileSync(0));
  closed(request, 'root selection consumer target operation expectedOriginalSha');
  assert.ok(['identities', 'sourcePair', 'originalSourceBinding', 'originalSourceBindingIfPresent', 'historicalRecord', 'capturedSources', 'check'].includes(request.operation), 'Unknown production record operation');
  const admission = beginProductionAdmission(request);
  const result = request.operation === 'check' ? true : admission[request.operation](request.target ?? undefined, request.expectedOriginalSha);
  admission.check(); process.stdout.write(JSON.stringify(result));
}

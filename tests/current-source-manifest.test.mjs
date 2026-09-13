import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTEXT, NS, sha256, decode, validate, admit } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { compareSourceManifests } from '../scripts/equation-mapping/current-source-impact.mjs';
import knownHashes from '../scripts/equation-mapping/fixtures/known-hash-answers.json' with { type: 'json' };
const ABC_SHA = knownHashes.sha256.abc;
assert.match(ABC_SHA, /^[a-f0-9]{64}$/u);

export function knownManifest() {
  const source = (id, role) => ({ '@id': NS + id, '@type': 'Source', revisionId: '1', role, binding: { path: id + '.txt', selector: { kind: 'whole' }, contract: 'fixed-byte-selection/v1', sha256: ABC_SHA } });
  const edge = (kind, from, to) => ({ '@id': NS + kind + '-' + from + '-' + to, '@type': 'Relationship', revisionId: '1', kind, from: NS + from, fromRevision: '1', to: NS + to, toRevision: '1', role: 'known dependency' });
  return { '@context': CONTEXT, schemaVersion: 'current-source-manifest/v1', scope: 'known', repository: 'https://github.com/jmarkmorris/architrino.git', baseline: { commit: '1'.repeat(40), entry: 'check.txt', authority: 'operator-directed-existing-A-transfer' }, revisionId: '1', '@graph': [source('check', 'admission'), source('a', 'current-source'), source('b', 'independent-reference'), edge('dependsOn', 'a', 'b'), edge('checks', 'check', 'a'), edge('checks', 'check', 'b')] };
}
test('known abc, fixed source census and explicit check coverage', () => {
  assert.equal(sha256('abc'), ABC_SHA);
  const m = knownManifest(), raw = Buffer.from(JSON.stringify(m));
  assert.deepEqual(decode(raw), m); assert.equal(validate(m).sources.size, 3);
  const visited = [];
  const result = admit(raw, { root: '/fixture', scope: 'known', readBound: (path, expected) => { visited.push(path); assert.equal(expected, sha256('abc')); return { path, sha256: expected, bytes: 3 }; } });
  assert.deepEqual(visited, ['/fixture/check.txt', '/fixture/a.txt', '/fixture/b.txt']);
  assert.deepEqual(Object.keys(result.pins), ['a.txt', 'b.txt']);
});
test('malformed, ambiguous, wrong selectors, missing coverage and changed relationships fail closed', () => {
  for (const mutate of [m => m.extra = 1, m => m['@context'] = 'https://remote.invalid/context', m => m['@graph'].push(m['@graph'][0]), m => m['@graph'][1].binding.path = '../a', m => m['@graph'][1].binding.path = 'check.txt', m => m['@graph'][1].binding.selector.kind = 'lines', m => m['@graph'].pop(), m => m['@graph'][3].toRevision = '2', m => m['@graph'][3].kind = 'guessed', m => m['@graph'].splice(1, 1)]) {
    const m = knownManifest(); mutate(m); assert.throws(() => validate(m));
  }
  for (const value of ['{"a":1,"a":2}', '{"a":1,"\\u0061":2}', '{"a":1}{}', '[] garbage']) assert.throws(() => decode(Buffer.from(value)));
  assert.throws(() => admit(Buffer.from(JSON.stringify(knownManifest())), { root: '/fixture', scope: 'wrong' }), /scope/);
  assert.throws(() => admit(Buffer.from(JSON.stringify(knownManifest())), { root: '/fixture', scope: 'known', readBound: () => { throw Error('stale bytes'); } }), /stale/);
});

test('hand graph old/new closure preserves deleted, added and changed dependencies', async () => {
  const before = knownManifest();
  assert.deepEqual((await compareSourceManifests(before, before)).selectedChecks, []);
  const removed = structuredClone(before); removed['@graph'].splice(3, 1);
  const result = await compareSourceManifests(before, removed);
  assert.equal(result.status, 'review-required'); assert.equal(result.removed.length, 1);
  assert.deepEqual(result.affected, [NS + 'a', NS + 'b']);
  assert.deepEqual(result.selectedChecks, [NS + 'check']);
  assert.equal((await compareSourceManifests(removed, before)).added.length, 1);
  const changed = structuredClone(before); changed['@graph'][2].binding.sha256 = '0'.repeat(64);
  await assert.rejects(compareSourceManifests(before, changed), /Revision reuse/);
  changed['@graph'][2].revisionId = '2';
  for (const edge of changed['@graph'].filter(e => e.to === NS + 'b')) { edge.toRevision = '2'; edge.revisionId = '2'; }
  assert.deepEqual((await compareSourceManifests(before, changed)).selectedChecks, [NS + 'check']);
  const wrong = structuredClone(before); wrong['@graph'][3].role = 'changed relationship'; wrong['@graph'][3].revisionId = '2';
  assert.equal((await compareSourceManifests(before, wrong)).status, 'review-required');
  const checkChanged = structuredClone(before);
  checkChanged['@graph'][0].binding.sha256 = '0'.repeat(64);
  checkChanged['@graph'][0].revisionId = '2';
  for (const edge of checkChanged['@graph'].filter(e => e.from === NS + 'check')) { edge.fromRevision = '2'; edge.revisionId = '2'; }
  assert.deepEqual((await compareSourceManifests(before, checkChanged)).selectedChecks, [NS + 'check']);
  const baselineChanged = structuredClone(before); baselineChanged.baseline.commit = '2'.repeat(40);
  const baselineResult = await compareSourceManifests(before, baselineChanged);
  assert.equal(baselineResult.status, 'review-required'); assert.equal(baselineResult.metadataChanged, true);
});

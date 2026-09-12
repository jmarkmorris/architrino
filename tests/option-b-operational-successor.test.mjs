import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTEXT, NS, sha256 } from '../scripts/equation-mapping/current-source-manifest.mjs';
import { CIRCULAR_SUCCESSOR as S, circularSuccessor } from '../scripts/equation-mapping/check-current-source-maps.mjs';

// Hand-built nonexecuting reference, before any real successor is selected.
function fixture() {
  const roles = [[S.entry, 'admission'], [S.path, 'launcher'], ['scripts/equation-mapping/current-source-manifest.mjs', 'manifest-reader']];
  const sources = roles.map(([path, role]) => ({'@id':NS+encodeURIComponent(path),'@type':'Source',revisionId:'known/1',role,
    binding:{path,selector:{kind:'whole'},contract:'fixed-byte-selection/v1',sha256:sha256('abc')}}));
  const edges = sources.slice(1).map((row,i) => ({'@id':NS+'known-check-'+i,'@type':'Relationship',revisionId:'known/1',kind:'checks',
    from:sources[0]['@id'],fromRevision:'known/1',to:row['@id'],toRevision:'known/1',role:'known byte check'}));
  return {'@context':CONTEXT,schemaVersion:'current-source-manifest/v1',scope:S.scope,
    repository:'https://github.com/jmarkmorris/architrino.git',baseline:{commit:'1'.repeat(40),entry:S.entry,authority:'operator-directed-existing-A-transfer'},
    revisionId:'known/1','@graph':[...sources,...edges]};
}
const raw = value => Buffer.from(JSON.stringify(value));
test('known independent abc fixture admits only the declared operational successor', () => {
  assert.equal(sha256('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  const seen=[];
  assert.equal(circularSuccessor(raw(fixture()),S.previous,p=>{seen.push(p);return Buffer.from('abc');}),sha256('abc'));
  assert.deepEqual(seen,[S.entry,S.path,'scripts/equation-mapping/current-source-manifest.mjs']);
});
test('successor cannot redefine original source, role, scope, reader or coverage', () => {
  assert.throws(()=>circularSuccessor(raw(fixture()),'0'.repeat(64),()=>Buffer.from('abc')),/Original/);
  for(const mutate of [m=>m.scope='another-profile',m=>m.baseline.entry='scripts/other.mjs',
    m=>m['@graph'][0].binding.path='scripts/other.mjs',m=>m['@graph'][1].role='current-source',
    m=>m['@graph'][1].binding.path='scripts/scientific-oracle.py',m=>m['@graph'][2].binding.path='scripts/other-reader.mjs',
    m=>m['@graph'].pop(),m=>m['@graph'].push(m['@graph'][1]),m=>m['@graph'][1].binding.sha256='0'.repeat(64)]) {
    const m=fixture();mutate(m);assert.throws(()=>circularSuccessor(raw(m),S.previous,()=>Buffer.from('abc')));
  }
  assert.throws(()=>circularSuccessor(raw(fixture()),S.previous,()=>Buffer.from('changed')),/Stale successor/);
  assert.throws(()=>circularSuccessor(Buffer.from('{"scope":"a","scope":"b"}'),S.previous,()=>Buffer.from('abc')),/Duplicate/);
});

import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';

function canonical(v) {
  if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
  if (v !== null && typeof v === 'object') return '{' + Object.keys(v).sort().map(
    k => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
const sha = v => crypto.createHash('sha256').update(v).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.equal(canonical({b:2,a:'x'}),'{"a":"x","b":2}');
assert.notEqual(sha(canonical({b:2,a:'x'})),sha(canonical({b:3,a:'x'})));
console.log('KNOWN SHA-256 abc, sorted JSON, changed value PASS; before checkpoint targets');

const [baseline, candidate] = process.argv.slice(2);
if (!baseline || !candidate) throw Error('two checkpoint directories required');
for (const name of ['evolve-canonical.checkpoint.json','evolve-three-path.checkpoint.json',
                    'evolve-surface.checkpoint.json']) {
  let prior;
  for (const [label,dir] of [['baseline',baseline],['candidate',candidate]]) {
    const cp=JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
    const {digest,...unsealed}=cp;
    assert.equal(sha(canonical(unsealed)),digest);
    console.log(`PASS ${label} ${name}: complete checkpoint digest independently recomputed`);
    const request=structuredClone(cp.preparation);
    delete request.interval; delete request.runId;
    if (cp.resolvedModel.legacyModelFingerprint !== null) {
      assert.equal(sha(canonical({request,model:cp.resolvedModel,
        legacyNumerics:cp.resolvedModel.legacyModelFingerprint})),cp.binding);
      console.log(`PASS ${label} ${name}: binding independently recomputed`);
    } else {
      console.log(`LIMIT ${label} ${name}: Surface binding not recomputed from null legacy-model field`);
    }
    if (prior) {
      assert.equal(canonical(cp.preparation),canonical(prior.preparation));
      assert.equal(cp.resolvedModel.legacyModelFingerprint,prior.resolvedModel.legacyModelFingerprint);
      const model=structuredClone(cp.resolvedModel), old=structuredClone(prior.resolvedModel);
      for (const k of ['sourceDigest','buildDigest','configurationDigest']) {
        assert.equal(typeof model.build[k],'string');
        assert.equal(typeof old.build[k],'string');
        delete model.build[k]; delete old.build[k];
      }
      assert.equal(canonical(model),canonical(old));
      console.log(`PASS ${name}: identical preparation and model outside named build identities`);
    }
    prior=cp;
  }
}

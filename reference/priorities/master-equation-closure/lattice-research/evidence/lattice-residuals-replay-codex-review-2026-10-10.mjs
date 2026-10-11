// Codex's read-only audit of Claude's replay outputs, not an interval evaluator.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function diff(a, b, path = '') {
  if (Object.is(a, b)) return [];
  if (a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b)) {
    const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
    return keys.flatMap(k => !(k in a) || !(k in b) ? [`${path}/${k}:missing`] : diff(a[k], b[k], `${path}/${k}`));
  }
  return [path || '/'];
}
assert.equal(sha(Buffer.from('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.deepEqual(diff({a:[1,2]}, {a:[1,2]}), []);
assert.deepEqual(diff({a:2.5}, {a:2.5000000000000004}), ['/a']);
assert.deepEqual(diff({a:1}, {a:1,b:0}), ['/b:missing']);
assert.deepEqual(diff([1], [1,2]), ['/1:missing']);
assert.deepEqual(diff({seconds:1}, {seconds:2}), ['/seconds']);
console.log('Known cases PASS before target reads: SHA-256, equality, float ULP, missing key, array length, timer detection.');
if (process.argv[2] === 'known') process.exit(0);
const base = '.local-data/master-equation-closure/';
const old = base + 'next-event/';
const fresh = base + 'lattice-residuals-replay-2026-10-10/';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const hash = p => sha(fs.readFileSync(p));
const result = {instrument_sha256:hash(import.meta.filename), known_cases:'PASS', scope:'Output identity and provenance, not independent interval correctness', comparisons:[], references:[], relocations:[]};
for (const [a,b,metadata] of [
  ['residual/residual-polynomial.json','residual/residual-polynomial.json',[]],
  ['continuation/prefix-refinement4.json','prefix/prefix-refinement4.json',[]],
  ['continuation/event-comparison.json','event-comparison/event-comparison.json',['/residual','/residual_sha256','/refined_errors_sha256']]
]) {
  const changes = diff(read(old+a), read(fresh+b));
  const science = changes.filter(p => !p.endsWith('/seconds') && !metadata.includes(p));
  assert.deepEqual(science, []);
  result.comparisons.push({accepted:a,fresh:b,accepted_sha256:hash(old+a),fresh_sha256:hash(fresh+b),scientific_differences:science,timer_differences:changes.filter(p => p.endsWith('/seconds')).length,metadata_differences:changes.filter(p => metadata.includes(p))});
}
for (const [a,b] of [['continuation/prefix-refinement4.npz','prefix/prefix-refinement4.npz'],['continuation/source-boxes.npz','subject-controls/source-boxes.npz'],['continuation/early-prefix.npz','subject-controls/early-prefix.npz']]) {
  assert.equal(hash(old+a),hash(fresh+b));
  result.comparisons.push({accepted:a,fresh:b,byte_equal:true,sha256:hash(fresh+b)});
}
const event = read(fresh+'event-comparison/event-comparison.json');
const eReceipt = read(fresh+'event-comparison/replay-target-receipt.json');
assert.equal(event.residual_sha256,hash(fresh+'residual/residual-polynomial.json'));
assert.equal(eReceipt.fresh_inputs.residual_sha256,event.residual_sha256);
assert.equal(eReceipt.fresh_inputs.refined_errors_sha256,hash(fresh+'prefix/prefix-refinement4.npz'));
const refs = read(fresh+'independent/summary.json');
assert.equal(refs.rows.length,15);
for (const row of refs.rows) {
  assert.equal(row.known.exit,0); assert.equal(row.known.result,'PASS'); assert.equal(row.target.exit,0);
  assert.equal(row.sha256,hash(old+'independent/'+row.script));
  const paths = row.target.differs_from_retained_original_at;
  assert.ok(paths.every(p => p.endsWith('/seconds') || p.startsWith('/inputs/')));
  result.references.push({script:row.script,known:'PASS',target_exit:0,difference_paths:paths});
}
for (const sub of ['residual','prefix','event-comparison']) {
  const k = read(fresh+sub+'/replay-known-receipt.json'), t = read(fresh+sub+'/replay-target-receipt.json');
  assert.equal(k.result,'PASS'); assert.equal(t.result,'completed'); assert.equal(k.wrapper_sha256,t.wrapper_sha256);
  const prefix = 'reference/priorities/master-equation-closure/lattice-research/evidence/lattice-residuals-replay-';
  assert.equal(t.wrapper_sha256,hash(prefix+sub+'-2026-10-10.py'));
  const sourceHashes = sub === 'prefix' ? t.authenticated_sources_and_here_inputs : t.authenticated_sources;
  assert.ok(sourceHashes);
  for (const [p,h] of Object.entries(sourceHashes)) assert.equal(hash(p),h);
  for (const [name,entry] of Object.entries(t.relocated_analysis_modules)) {
    const path = 'reference/priorities/master-equation-closure/analysis/'+name;
    const blob = execFileSync('git',['--no-optional-locks','show','308002c7b^:'+path]);
    const livePath = path.replace('/analysis/','/lattice-research/analysis/');
    assert.equal(sha(blob),entry.pre_move_sha256); assert.equal(hash(livePath),entry.live_sha256);
    if (entry.recorded_sha256) assert.equal(sha(blob),entry.recorded_sha256);
    const x=blob.toString('utf8').split('\n'),y=fs.readFileSync(livePath,'utf8').split('\n');
    assert.equal(x.length,y.length);
    const changed=[];
    for (let i=0;i<x.length;i++) if (x[i]!==y[i]) {
      assert.ok(x[i].includes('ROOT=') || x[i].includes('ROOT ='));
      assert.equal(x[i].replace(/parents\[(\d+)\]/g,(_,n)=>`parents[${Number(n)+1}]`),y[i]); changed.push(i+1);
    }
    assert.deepEqual(changed,entry.root_index_lines);
    if (!result.relocations.some(r=>r.name===name)) result.relocations.push({name,changed_lines:changed,pre_move_sha256:sha(blob),live_sha256:hash(livePath)});
  }
}
const pBefore = fs.readFileSync('.tmp/lattice-residuals-replay-2026-10-10/preserved-before.sha256');
const pAfter = fs.readFileSync('.tmp/lattice-residuals-replay-2026-10-10/preserved-after.sha256');
assert.ok(pBefore.equals(pAfter));
result.preservation={listings_equal:true,listing_sha256:sha(pBefore),line_count:pBefore.toString('utf8').trim().split('\n').length};
result.result='PASS';
console.log(JSON.stringify(result,null,2));

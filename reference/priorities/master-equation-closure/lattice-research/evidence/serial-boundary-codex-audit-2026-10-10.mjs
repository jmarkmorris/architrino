import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const sha = p => digest(fs.readFileSync(p));
function delta(a, b, p = '') {
  if (Object.is(a, b)) return [];
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return [p];
    return a.flatMap((v, i) => delta(v, b[i], `${p}/${i}`));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    return [...new Set([...Object.keys(a), ...Object.keys(b)])].sort().flatMap(k => Object.hasOwn(a, k) && Object.hasOwn(b, k) ? delta(a[k], b[k], `${p}/${k}`) : [`${p}/${k}`]);
  }
  return [p];
}
function rootOnly(a, b) {
  const before=a.split('\n'),after=b.split('\n');
  if(before.length!==after.length) return false;
  let changed=0;
  for(let i=0;i<before.length;i++) if(before[i]!==after[i]) {
    if(!/\bROOT=/.test(before[i]) || before[i].replace(/parents\[(\d+)\]/g,(_,n)=>`parents[${Number(n)+1}]`)!==after[i]) return false;
    changed++;
  }
  return changed===1;
}
function known() {
  assert.equal(digest(Buffer.from('abc')), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  assert.deepEqual(delta({a:[1,2.5]}, {a:[1,2.5000000000000004]}), ['/a/1']);
  assert.deepEqual(delta({a:1}, {a:1,b:2}), ['/b']);
  assert.deepEqual(delta([1], [1,2]), ['']);
  assert.deepEqual(delta({a:1}, {a:1}), []);
  assert(rootOnly('ROOT=HERE.parents[3]\nx=4\n', 'ROOT=HERE.parents[4]\nx=4\n'));
  assert(rootOnly('ROOT=Path(__file__).resolve().parents[4]\n', 'ROOT=Path(__file__).resolve().parents[5]\n'));
  assert(rootOnly('HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[3]\n', 'HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]\n'));
  assert(!rootOnly('ROOT=HERE.parents[3]\nx=4\n', 'ROOT=HERE.parents[4]\nx=5\n'));
  console.log('KNOWN PASS: abc digest, float ULP, missing key, length change, equality and allowed/refused relocation cases; no target read.');
}
known();
if (process.argv[2] === 'known') process.exit(0);
assert.equal(process.argv[2], 'audit');
const fresh = '.local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10';
const old = '.local-data/master-equation-closure/first-class-boundary';
let checked = 0;
for (const l of fs.readFileSync(`${fresh}/receipts.sha256`, 'utf8').trim().split('\n')) {
  const m = l.match(/^([a-f0-9]{64})\s+(.+)$/); assert(m);
  assert.equal(sha(`${fresh}/${m[2]}`), m[1], m[2]); checked++;
}
assert.equal(checked,43);
assert.equal(fs.readFileSync(`${fresh}/retention/preserved-before.sha256`,'utf8'),fs.readFileSync(`${fresh}/retention/preserved-after.sha256`,'utf8'));
for (const l of fs.readFileSync(`${fresh}/retention/preserved-after.sha256`,'utf8').trim().split('\n')) {
  const m=l.match(/^([a-f0-9]{64})\s+(.+)$/); assert(m); assert.equal(sha(m[2]),m[1],m[2]);
}
const comparisons = [
 ['selected-check/selected-residual.json','selected-check/selected-residual.json',['/source_sha256','/known/source_sha256','/seconds']],
 ['independent/stationary-domain-target.json','reference/stationary-domain-target.json',[]],
 ['independent/stopped-reference-target.json','reference/stopped-reference-target.json',['/inputs','/instrument_sha256']],
 ['independent/event-reference-target.json','reference/event-reference-target.json',['/residual_sha256','/subject_sha256','/stopped_reference_sha256','/instrument_sha256']],
 ['history/endpoint.json','history/endpoint.json',['/seconds','/known/inherited/frozen_interval_sha256']]
];
const differences = {};
for (const [a,b,allow] of comparisons) {
  const ds=delta(read(`${old}/${a}`),read(`${fresh}/${b}`));
  assert.deepEqual(ds.filter(x=>!allow.some(y=>x===y||x.startsWith(y+'/'))),[],b);
  differences[b]=ds;
}
const receipt=read(`${fresh}/selected-check/reproduction-target-receipt.json`);
for(const [name,info] of Object.entries(receipt.loaded_analysis_modules)) {
  const prior=execFileSync('git',['show',`308002c7b^:reference/priorities/master-equation-closure/analysis/${name}`]);
  const live=fs.readFileSync(`reference/priorities/master-equation-closure/lattice-research/analysis/${name}`);
  assert.equal(digest(prior),info.pre_move_sha256,name); assert.equal(digest(live),info.live_sha256,name);
  assert(rootOnly(prior.toString(),live.toString()),name);
}
assert.equal(Object.keys(receipt.loaded_analysis_modules).length,9);
for(const [p,h] of Object.entries(receipt.input_sha256)) assert.equal(sha(p),h,p);
const residual=read(`${fresh}/selected-check/selected-residual.json`);
assert.equal(residual.g,16);assert.equal(residual.c_f,1);
assert.equal(residual.residual_bins.length,32);assert.equal(residual.generated_edges.length,328);assert.equal(residual.source_points.length,836);
const time=s=>s.includes('/')?s.split('/').map(Number).reduce((a,b)=>a/b):Number(s);
residual.residual_bins.forEach((r,i)=>{assert.equal(time(r.from),5+i/512);assert.equal(time(r.through),5+(i+1)/512)});
assert.deepEqual(residual.per_receiver_residual,[0,1].map(i=>Math.max(...residual.residual_bins.map(r=>r.residual[i]))));
const event=read(`${fresh}/reference/event-reference-target.json`);
const stopped=read(`${fresh}/reference/stopped-reference-target.json`);
assert.deepEqual(event.event_interval,['5121/1024','10339/2048']);
assert.equal(event.residual_sha256,sha(`${fresh}/selected-check/selected-residual.json`));
assert.equal(event.stopped_reference_sha256,sha(`${fresh}/reference/stopped-reference-target.json`));
assert.equal(event.endpoint_sha256,sha(`${old}/history/endpoint.json`));
assert(event.all_environmental_position_upper_at_5121_1024<1/16);
assert.equal(event.receiver_results[0].crossing_contradiction_by,'10339/2048');
assert(event.receiver_results[0].vertical_position_lower_at_H>1/16);
assert(event.receiver_results[1].continuous_vertical_velocity_lower>0 && event.receiver_results[1].continuous_vertical_acceleration_lower>0);
assert(stopped.global_speed<1/2 && stopped.target_radius<1/16 && stopped.jerk<65536);
for(const [p,h] of Object.entries(stopped.inputs)) assert.equal(sha(p),h,p);
const hist=read(`${fresh}/history/endpoint.json`);
assert.equal(hist.all_endpoint_rows.length,1350);
assert.equal(hist.known.inherited.frozen_interval_sha256,'b209d412f25b7ea89803578b5c82213c29da627a76bbb81b2cb054a1e21d1de9');
for(const id of ['127d3b39-9dc6-4f94-b587-6621c1317be1','9100423a-0c6c-4f81-9eed-58eae08b4285']) {
  const s=read(`${fresh}/retention/leases/${id}.status.json`);
  assert.equal(s.classification,'terminal');assert.equal(s.lease.status,'completed');assert.equal(s.lease.exitCode,0);assert.equal(s.lease.processGroupClosed,true);
}
assert.equal(read(`${fresh}/retention/closeout.json`).status,'clear');
console.log(JSON.stringify({result:'PASS',manifestFiles:checked,modules:9,comparisons:differences,cells:32,edges:328,sources:836,endpointRows:1350,eventInterval:event.event_interval,claimBoundary:'Read-only evidence/byte audit; no independent interval residual evaluation.'},null,2));

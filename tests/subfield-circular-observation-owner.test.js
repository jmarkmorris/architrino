import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {captureCircularFile, createCircularObservationOwner, parseCircularObservation} from '../src/prescribed-path-analysis/SubfieldCircularObservationOwner.mjs';

const root = process.cwd(), original = path.join(root, 'scripts/eom/observe-subfield-circular-processes.py');
const python = path.resolve(process.env.AAA_VENV ?? '../.venv', 'bin/python');
const sample = ' 101 100 101 Tue Sep 8 12:00:00 2026 R 20 /bin/ps\n';
test('process parser passes known identity and byte conversion before actual probes', () => {
  assert.deepEqual(parseCircularObservation(sample), [{pid:101,ppid:100,pgid:101,started:'Tue Sep 8 12:00:00 2026',state:'R',residentBytes:20480,command:'/bin/ps'}]);
  assert.throws(() => parseCircularObservation('broken'), /malformed/);
  assert.throws(() => parseCircularObservation(sample + sample), /unique/);
});

function fixture(injection = '', transform = value => value, overrides = {}) {
  const directory = realpathSync(mkdtempSync(path.join(tmpdir(), 'circular-observer-'))), helper = path.join(directory, 'probe.py');
  const source = readFileSync(original, 'utf8');
  const anchor = '    duration = plan["durationMs"] / 1000';
  assert.equal(source.split(anchor).length, 2);
  writeFileSync(helper, transform(source.replace(anchor, injection + anchor)));
  const began = performance.now(), controller = new AbortController();
  const owner = createCircularObservationOwner({python, helper, sources:[captureCircularFile(helper)], root,
    began, completionEnd:began + 15000, signal:controller.signal, maximumProbeMs:500,...overrides});
  const context = () => ({remainingMs:3000,originalDeadlineMs:began+15000,workDeadlineMs:began+12000,cleanup:false});
  return {directory,helper,owner,context,controller};
}
test('actual probes bind runtime, birth, wait4 closure and nonzero resource accounting', async () => {
  const f = fixture();
  try {
    const first = await f.owner.initialize();
    assert.equal(first.schema, 'circular-observer-runtime.v1');
    assert(first.runtime.some(row => /\/Python\.framework\/.*\/Python$|\/libpython[^/]*$/u.test(row.path)), 'actual linked libpython must be captured before ps');
    const rows = await f.owner.inspect(f.context()); assert(rows.some(row => row.pid === process.pid));
    const receipt = await f.owner.finish();
    assert.equal(receipt.closed, true); assert.equal(receipt.probes.length, 2);
    assert(receipt.totalProbeCPUUpperBoundSeconds > 0);
    for (const row of receipt.probes) assert(row.closed);
    const row = receipt.probes[1]; assert(row.psClosed); assert(row.psResourceUsage.maximumResidentBytes > 0); assert(row.identity.started);
  } finally { rmSync(f.directory, {recursive:true}); }
});
test('stubborn TERM is escalated through actual exit and close', async () => {
  const f = fixture('    if plan.get("mode") == "table":\n        signal.signal(signal.SIGTERM, signal.SIG_IGN)\n        time.sleep(5)\n');
  try {
    await f.owner.initialize(); await assert.rejects(f.owner.inspect(f.context()), /observer/);
    assert.equal(f.owner.snapshot().probes.at(-1).escalated, true);
    assert.equal(f.owner.snapshot().probes.at(-1).closed, true);
  } finally { rmSync(f.directory,{recursive:true}); }
});
test('final serialization remains inside the helper deadline', async () => {
  const f = fixture('', source => source.replace('        print(json.dumps(result), flush=True)', '        time.sleep(5)\n        print(json.dumps(result), flush=True)'));
  try {
    await f.owner.initialize(); await assert.rejects(f.owner.inspect(f.context()), /observer/);
    assert.equal(f.owner.snapshot().probes.at(-1).closed, true);
  } finally { rmSync(f.directory,{recursive:true}); }
});
test('unexpected cache artifact rejects cleanup and final admission', async () => {
  const f = fixture('    if plan.get("mode") == "table":\n        with open(os.path.join(sys.pycache_prefix, "unexpected"), "w") as output: output.write("x")\n');
  try {
    await f.owner.initialize(); await assert.rejects(f.owner.inspect(f.context()), /cache/);
    await assert.rejects(f.owner.finish(), /cache/);
    assert.equal(f.owner.snapshot().probes.at(-1).closed, true);
  } finally { rmSync(f.directory,{recursive:true}); }
});
test('runtime inventory enforces resident ceiling before any table probe', async () => {
  const f = fixture('',undefined,{maximumSampledResidentBytes:1});
  try {
    await assert.rejects(f.owner.initialize(), /ceiling/);
    assert.equal(f.owner.snapshot().probes.length,1);
  } finally { rmSync(f.directory,{recursive:true}); }
});
for (const [name, injection] of [
  ['blocked', '    if plan.get("mode") == "table": time.sleep(5)\n'],
  ['failed', '    if plan.get("mode") == "table": raise ValueError("synthetic probe failure")\n'],
  ['output-growth', '    if plan.get("mode") == "table":\n        sys.stdout.write("x" * (20 * 1024 * 1024)); sys.stdout.flush()\n'],
]) test(name + ' probe rejects after actual child/stream closure and retains cost', async () => {
  const f = fixture(injection);
  try {
    await f.owner.initialize(); await assert.rejects(f.owner.inspect(f.context()), /observer/);
    await assert.rejects(f.owner.finish(), /observer/);
    const receipt = f.owner.snapshot(), row = receipt.probes.at(-1);
    assert.equal(row.closed, true); assert(row.wallSeconds > 0); assert(row.cpuUpperBoundSeconds > 0); assert(receipt.failure);
    if (name === 'output-growth') assert(row.droppedBytes > 0);
  } finally { rmSync(f.directory, {recursive:true}); }
});
test('interruption cancels actual open probe and rejects admission', async () => {
  const f = fixture('    if plan.get("mode") == "table": time.sleep(5)\n');
  try {
    await f.owner.initialize(); const actual = f.owner.inspect(f.context());
    setTimeout(() => f.controller.abort(Error('synthetic interrupt')), 50);
    await assert.rejects(actual, /observer/); await assert.rejects(f.owner.finish(), /observer/);
    assert.equal(f.owner.snapshot().probes.at(-1).cancellation, 'owner-interrupted');
  } finally { rmSync(f.directory, {recursive:true}); }
});
test('changed source rejects before another probe and at final recheck', async () => {
  const f = fixture();
  try {
    await f.owner.initialize(); writeFileSync(f.helper, 'changed source');
    assert.throws(() => f.owner.inspect(f.context()), /hash differs/);
    await assert.rejects(f.owner.finish(), /hash differs/);
    assert.equal(f.owner.snapshot().probes.length, 1);
  } finally { rmSync(f.directory, {recursive:true}); }
});
test('changed captured runtime dependency rejects before ps and final admission', async()=>{
  const directory=realpathSync(mkdtempSync(path.join(tmpdir(),'circular-runtime-control-')));
  const library=path.join(directory,'known-runtime-dependency');writeFileSync(library,'known runtime bytes');
  const f=fixture('',source=>source.replace('    paths = {os.path.realpath(sys.executable)}',`    paths = {os.path.realpath(sys.executable), ${JSON.stringify(library)}}`));
  try {
    const inventory=await f.owner.initialize();assert(inventory.runtime.some(row=>row.path===library));
    writeFileSync(library,'changed runtime bytes');
    assert.throws(()=>f.owner.inspect(f.context()),/hash differs/);
    await assert.rejects(f.owner.finish(),/hash differs/);
    assert.equal(f.owner.snapshot().probes.length,1);
  } finally {rmSync(f.directory,{recursive:true});rmSync(directory,{recursive:true});}
});

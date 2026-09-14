// Whole-entry owner for the current circular pilot; numerical predicates remain
// in the captured, independently reviewed runner and shared supervision module.
import {createHash} from 'node:crypto';
import {closeSync, constants, existsSync, fstatSync, lstatSync, mkdirSync, openSync, readFileSync, realpathSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Worker} from 'node:worker_threads';
import {cpus} from 'node:os';

const PATHS = Object.freeze({
  entry: 'scripts/eom/run-current-subfield-circular-root-pilot.mjs',
  observationOwner: 'src/prescribed-path-analysis/SubfieldCircularObservationOwner.mjs',
  observerHelper: 'scripts/eom/observe-subfield-circular-processes.py',
  supervisor: 'scripts/eom/launch-subfield-circular-root-pilot.mjs',
  runner: 'scripts/eom/run-subfield-circular-root-pilot.mjs',
});
const BASE = '.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const demand = (value, message) => { if (!value) throw Error(message); };
const dataURL = bytes => 'data:text/javascript;base64,' + Buffer.from(bytes).toString('base64');

export const CIRCULAR_SOURCE_MAP = 'reference/priorities/development-process-review/contracts/option-b-circular-sources.jsonld';
export const CIRCULAR_SOURCE_SCOPE = 'subfield-circular-current-operation';
// Paths and roles are code obligations; selected revisions belong to the map.
export const CIRCULAR_SOURCE_ROLES = Object.freeze({
  [PATHS.entry]: 'admission',
  [PATHS.supervisor]: 'launcher',
  [PATHS.runner]: 'current-source',
  [PATHS.observationOwner]: 'current-source',
  [PATHS.observerHelper]: 'current-source',
  'scripts/eom/run-current-subfield-circular-root-rung.mjs': 'current-source',
  'scripts/eom/run-subfield-circular-root-rung.mjs': 'current-source',
  'scripts/eom/dispatch-subfield-circular-root-ladder.mjs': 'current-source',
  'scripts/eom/prepare-current-subfield-circular-prior.mjs': 'current-source',
  'scripts/eom/prepare-current-subfield-circular-ladder.mjs': 'current-source',
  'scripts/eom/prepare-subfield-circular-root.mjs': 'current-source',
  'scripts/eom/prepare-f5-enclosed-root.mjs': 'current-source',
  'src/prescribed-path-analysis/SubfieldCircularPhaseProcess.mjs': 'current-source',
  'src/prescribed-path-analysis/SubfieldCircularPhaseLedgerWorker.mjs': 'current-source',
  'src/prescribed-path-analysis/SubfieldCircularMemoryOwner.mjs': 'current-source',
  'scripts/eom/observe-subfield-circular-memory.py': 'current-source',
  'src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs': 'independent-reference',
  'scripts/eom/reduce-subfield-circular-root-ledger.mjs': 'independent-reference',
  'scripts/eom/verify-subfield-circular-history.mjs': 'independent-reference',
  'src/eom/native/eom_subfield_circular_root_cli.cpp': 'current-source',
  'src/eom/CMakeLists.txt': 'current-source',
  'scripts/equation-mapping/current-source-manifest.mjs': 'manifest-reader',
});

export async function loadCircularSourceMap(root, expected, originalBindings = []) {
  demand(/^[a-f0-9]{64}$/u.test(expected ?? ''), 'externally selected circular source-map digest required');
  root = realpathSync(root);
  const originals = new Map();
  demand(Array.isArray(originalBindings), 'circular original bindings required');
  const inheritedPaths = originalBindings.map(row=>path.resolve(root,row.path));
  const requiredPaths = [CIRCULAR_SOURCE_MAP,...Object.keys(CIRCULAR_SOURCE_ROLES)].map(relative=>path.join(root,relative));
  // Only a first bootstrap may carry the two files needed to load this module.
  // Every later stage transports the entire original map/reader/source census.
  if(originalBindings.length) demand(originalBindings.length===2
    ? new Set(inheritedPaths).size===2 && [CIRCULAR_SOURCE_MAP,PATHS.entry].every(relative=>inheritedPaths.includes(path.join(root,relative)))
    : requiredPaths.every(filename=>inheritedPaths.includes(filename)) && inheritedPaths.every(filename=>requiredPaths.includes(filename)),
    'complete inherited circular source identities required');
  const capture = (filename,digest) => {
    const record = readIdentity(filename,digest), original = originals.get(filename);
    const inherited = originalBindings.filter(row=>path.resolve(root,row.path)===filename);
    demand(inherited.every(row=>row.sha256===digest && JSON.stringify(row.identity)===JSON.stringify(record.identity)), 'inherited circular source identity changed');
    demand(!original || JSON.stringify(original.identity)===JSON.stringify(record.identity), 'circular original source identity changed');
    if (!original) originals.set(filename,record);
    return record;
  };
  const mapPath = path.join(root, CIRCULAR_SOURCE_MAP), raw = capture(mapPath, expected).data;
  const preliminary = JSON.parse(raw), readerPath = 'scripts/equation-mapping/current-source-manifest.mjs';
  const readers = preliminary['@graph']?.filter(row => row['@type'] === 'Source' && row.role === 'manifest-reader');
  demand(readers?.length === 1 && readers[0].binding.path === readerPath, 'exact circular manifest reader required');
  const readerBytes = capture(path.join(root, readerPath), readers[0].binding.sha256).data;
  const reader = await import(dataURL(readerBytes));
  const captured = new Map();
  const state = reader.admit(raw, {root, scope:CIRCULAR_SOURCE_SCOPE, readBound(filename, digest) {
    const {data,identity} = capture(filename, digest), record = {path:filename,sha256:digest,bytes:data.length,identity};
    captured.set(path.relative(root,filename), {...record,data}); return {...record,data};
  }});
  const rows = state.document['@graph'].filter(row => row['@type'] === 'Source');
  demand(rows.length === Object.keys(CIRCULAR_SOURCE_ROLES).length && rows.every(row =>
    CIRCULAR_SOURCE_ROLES[row.binding.path] === row.role), 'exact circular source-role closure required');
  demand(state.document.baseline.entry === PATHS.entry, 'circular baseline entry differs');
  if (import.meta.url.startsWith('data:')) demand(import.meta.url===dataURL(captured.get(PATHS.entry).data), 'captured circular initializer differs from map');
  else demand(sha(read(fileURLToPath(import.meta.url)))===captured.get(PATHS.entry).sha256, 'loaded circular initializer differs from map');
  const bindings = [...state.bindings, {path:mapPath,sha256:expected,bytes:raw.length,identity:originals.get(mapPath).identity}];
  const recheck = () => { for (const row of bindings) capture(row.path,row.sha256); };
  recheck();
  return {sourceMap:{path:CIRCULAR_SOURCE_MAP,sha256:expected}, bindings, recheck,
    identityArgs:['--source-identities',Buffer.from(JSON.stringify(bindings)).toString('base64')],
    source(relative) { demand(captured.has(relative), 'undeclared circular source'); return captured.get(relative); },
    sources:[...captured].map(([relative,row])=>({path:relative,sha256:row.sha256,bytes:row.data,identity:row.identity}))};
}

function readIdentity(filename, digest) {
  demand(realpathSync(filename) === path.resolve(filename), 'canonical current-launch input required');
  const fd = openSync(filename, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const before = fstatSync(fd); demand(before.isFile() && before.size <= 2 * 1024 ** 2, 'bounded regular current-launch source required');
    const bytes = readFileSync(fd), after = fstatSync(fd);
    demand(bytes.length === before.size && after.size === before.size && before.mtimeMs === after.mtimeMs && before.ctimeMs === after.ctimeMs,
      'current-launch source changed during capture');
    demand(!digest || sha(bytes) === digest, 'current-launch input digest differs');
    const identity = Object.fromEntries(['dev','ino','size','mtimeMs','ctimeMs'].map(key=>[key,before[key]]));
    demand(before.dev===after.dev && before.ino===after.ino, 'current-launch descriptor changed');
    const current = lstatSync(filename);
    demand(current.isFile() && Object.keys(identity).every(key=>current[key]===identity[key]), 'current-launch path identity changed during capture');
    return {data:bytes,identity};
  } finally { closeSync(fd); }
}
function read(filename,digest) { return readIdentity(filename,digest).data; }

export function parseCurrentCircularArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i += 2) {
    demand(['--profile','--profile-sha256','--out','--source-map-sha256'].includes(argv[i]) && argv[i+1] && !options[argv[i]], 'current pilot requires profile, output and source-map selection');
    options[argv[i]] = argv[i+1];
  }
  demand(Object.keys(options).length === 4 && ['--profile-sha256','--source-map-sha256'].every(key=>/^[0-9a-f]{64}$/u.test(options[key]??'')), 'complete reviewed profile and source map required');
  demand(path.dirname(options['--out']) === BASE && /^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(path.basename(options['--out'])), 'fresh direct circular output child required');
  return options;
}

function startGuard(began, deadlineNanoseconds) {
  const controller = new AbortController();
  const worker = new Worker(`const{parentPort,workerData}=require('node:worker_threads');
    let ownedGroup=false;
    parentPort.on('message',m=>{if(m==='group-leader-observed')ownedGroup=true;});
    const end=BigInt(workerData.end),work=end-25000000000n;
    function poll(){const now=process.hrtime.bigint();
      if(now>=end){try{process.kill(ownedGroup?-process.pid:process.pid,'SIGKILL')}catch{process.exit(125)}return;}
      if(now>=work)parentPort.postMessage('work-deadline');
      setTimeout(poll,Math.max(1,Math.min(100,Number(end-now)/1e6)));}
    parentPort.postMessage('ready');poll();`, {eval:true,execArgv:[],workerData:{end:deadlineNanoseconds}});
  let exited = false, terminating = false, ready = false;
  const exit = new Promise(resolve => worker.once('exit', code => {
    exited = true; resolve(code);
    if (!terminating) { controller.abort(Error('whole-entry guard exited unexpectedly')); process.exit(125); }
  }));
  worker.on('message', message => { if (message === 'work-deadline') controller.abort(Error('whole-entry work deadline exhausted')); });
  const initialized = new Promise((resolve, reject) => {
    worker.once('error', reject);
    worker.once('message', message => { demand(message === 'ready', 'whole-entry guard readiness differs'); ready = true; resolve(); });
  });
  const interrupt = () => controller.abort(Error('current circular owner interrupted'));
  process.on('SIGINT', interrupt); process.on('SIGTERM', interrupt);
  return {controller, initialized, armGroup: () => worker.postMessage('group-leader-observed'),
    check: () => demand(ready && !exited && performance.now() - began < 1800000, 'whole-entry guard/deadline unavailable'),
    async close() { terminating = true; await worker.terminate(); await exit; demand(exited, 'whole-entry guard close unobserved');
      process.off('SIGINT', interrupt); process.off('SIGTERM', interrupt); },
  };
}

async function admissionWorker(source, job, end, signal) {
  const worker = new Worker(`const{parentPort,workerData}=require('node:worker_threads');
    (async()=>{const module=await import('data:text/javascript;base64,'+Buffer.from(workerData.source).toString('base64'));
    parentPort.postMessage({result:await module.outerWorkerOperation(workerData.job)});})().catch(e=>parentPort.postMessage({failure:e.message}));`,
    {eval:true,execArgv:[],workerData:{source,job}});
  let timer, interrupted;
  try {
    return await new Promise((resolve, reject) => {
      interrupted = () => reject(signal.reason ?? Error('admission interrupted'));
      signal.addEventListener('abort', interrupted, {once:true}); if (signal.aborted) interrupted();
      timer = setTimeout(() => reject(Error('admission exceeded original work allowance')), Math.max(1,end-performance.now()));
      worker.once('error', reject); worker.once('exit', code => reject(Error(`admission worker exited without result: ${code}`)));
      worker.once('message', message => message.failure ? reject(Error(message.failure)) : resolve(message.result));
    });
  } finally { await worker.terminate(); clearTimeout(timer); signal.removeEventListener('abort', interrupted); }
}

export async function runCurrentCircularPilot({root, options, began, deadlineNanoseconds, guard}) {
  try {
  guard.check();
  const admission = await loadCircularSourceMap(root,options['--source-map-sha256']);
  const profilePath = path.resolve(root, options['--profile']), profileBytes = read(profilePath, options['--profile-sha256']);
  const profile = JSON.parse(profileBytes);
  demand(profile.schema === 'circular-current-launch-profile.v1' && profile.limitMs === 1800000 && profile.h3EvidenceEligible === false,
    'current pilot profile authority/limit differs');
  demand(profile.sources && Object.keys(profile.sources).sort().join('|') === Object.keys(PATHS).sort().join('|'), 'current pilot source-role census differs');
  const captured = {};
  for (const [role, filename] of Object.entries(PATHS)) {
    const binding = profile.sources[role];
    demand(binding.path === filename && /^[0-9a-f]{64}$/u.test(binding.sha256), 'current source role/path differs');
    demand(binding.sha256 === admission.source(filename).sha256, 'profile differs from selected circular map');
    captured[role] = {path:path.join(root,filename), sha256:binding.sha256, data:read(path.join(root,filename),binding.sha256)};
  }
  demand(import.meta.url === dataURL(captured.entry.data), 'current entry must execute captured reviewed bytes');
  demand(profile.python === path.resolve(root,process.env.AAA_VENV ?? '../.venv','bin/python'), 'shared venv execution path required');
  demand(process.execArgv.length === 0 && !Object.keys(process.env).some(key=>
    (key.startsWith('DYLD_') || ['NODE_OPTIONS','NODE_PATH','LD_PRELOAD','LD_LIBRARY_PATH'].includes(key)) && process.env[key]),
    'runtime injection options are not allowed');
  demand(profile.node?.path === process.execPath, 'Node runtime capability path differs');
  const observationModule = await import(dataURL(captured.observationOwner.data));
  const supervisor = await import(dataURL(captured.supervisor.data));
  guard.check();
  const output = path.resolve(root,options['--out']);
  demand(!existsSync(output), 'current circular output already exists');
  const parent = path.dirname(output); mkdirSync(parent,{recursive:true}); demand(realpathSync(parent) === parent, 'symlinked current output parent');
  mkdirSync(output);
  const completionEnd = began + profile.limitMs;
  const owner = observationModule.createCircularObservationOwner({python:profile.python, helper:captured.observerHelper.path,
    sources:[...Object.values(captured), ...admission.bindings, {path:profilePath,sha256:options['--profile-sha256']}], root,began,completionEnd,
    signal:guard.controller.signal});
  guard.workloadStarted = true;
  let processReceipt, failure, observationReceipt, published;
  try {
    await owner.initialize();
    const table = await owner.inspect({remainingMs:2000, originalDeadlineMs:completionEnd, workDeadlineMs:completionEnd-25000, cleanup:false});
    demand(table.some(row => row.pid === process.pid && row.pgid === process.pid), 'current entry must run in its own owned process group');
    guard.armGroup(); guard.check();
    processReceipt = await supervisor.superviseRegisteredPilot({root,entry:PATHS.runner,
      args:['--out',path.relative(root,path.join(output,'pilot')),'--runner-sha256',captured.runner.sha256,'--source-map-sha256',options['--source-map-sha256'],...admission.identityArgs],
      sources:[{path:PATHS.runner,sha256:captured.runner.sha256,bytes:captured.runner.data}],
      output:path.join(output,'supervision'),startedAtMs:began,limitMs:profile.limitMs-10000,
      inspectProcesses: context => { admission.recheck(); return owner.inspect(context); },
      admit: ({receipt,remainingMs,signal}) => admissionWorker(captured.supervisor.data,
        {root,pilotOutput:path.join(output,'pilot'),runnerBytes:captured.runner.data,runnerSha256:captured.runner.sha256,gates:receipt.gates,sourceMapSha256:options['--source-map-sha256'],sourceBindings:admission.bindings},
        Math.min(completionEnd-25000,performance.now()+remainingMs),signal)});
    observationReceipt = await owner.finish(); admission.recheck(); guard.check();
    demand(processReceipt.accepted && processReceipt.processesClosed && processReceipt.guardClosed && observationReceipt.closed &&
      !guard.controller.signal.aborted, 'joint circular closure incomplete');
    const receipt = {schema:'circular-current-pilot-admission.v1',accepted:true,h3EvidenceEligible:false,sourceMap:admission.sourceMap,sourceBindings:admission.bindings,
      rootExecutionAuthorized:false,laterLadderAuthorized:false,process:processReceipt,observations:observationReceipt,
      currentEntryResourceUsageBeforePublication:process.resourceUsage(),
      wholeEntryCPUUpperBoundSeconds:profile.limitMs / 1000 * cpus().length,
      wholeEntryCPUUpperBoundBasis:'Original full deadline times logical CPU count, including final serialization and publication tail; not measured consumption.',
      platformBoundary:'macOS kernel and shared-cache /System and /usr/lib libraries are trusted platform dependencies; non-system Node libraries are byte-bound.',
      elapsedThroughObserverClosureSeconds:(performance.now()-began)/1000,
      profile:{path:profilePath,sha256:options['--profile-sha256']},
      publicationRequires:'This conditional file and stdout require the exact owner process to exit zero before its original deadline; no scientific authority.'};
    const bytes = Buffer.from(JSON.stringify(receipt)+'\n'); demand(bytes.length <= 64 * 1024 ** 2, 'current admission receipt exceeds storage bound');
    const filename = path.join(output,'current-admission.json');
    owner.recheck(); admission.recheck(); guard.check(); writeFileSync(filename,bytes,{flag:'wx'});
    demand(sha(readFileSync(filename)) === sha(bytes), 'current admission changed after publication');
    owner.recheck(); admission.recheck(); guard.check();
    published = {path:filename,sha256:sha(bytes),bytes:bytes.length};
    await new Promise((resolve,reject) => process.stdout.write(JSON.stringify({accepted:true,h3EvidenceEligible:false,
      admission:published,terminalClosure:'pending-exact-owner-exit-zero',deadlineNanoseconds})+'\n',error=>error?reject(error):resolve()));
    owner.recheck(); admission.recheck(); guard.check();
  } catch (error) { failure = error; processReceipt ??= error.outerReceipt; }
  if (failure) {
    const rejected = {accepted:false,h3EvidenceEligible:false,failure:failure.message,
      invalidates:published??null,process:processReceipt??null,observations:owner.snapshot()};
    guard.check(); writeFileSync(path.join(output,'current-rejection.json'),JSON.stringify(rejected)+'\n',{flag:'wx'});
    const probesClosed = owner.snapshot().probes.every(row=>row.closed);
    if (probesClosed && (!processReceipt || processReceipt.processesClosed === true)) await guard.close();
    throw failure;
  }
  await guard.close();
  // Only local checks follow observed guard close. Publication is already
  // flushed and stays conditional on the external exact zero-exit result.
  demand(process.hrtime.bigint() < BigInt(deadlineNanoseconds), 'current owner exit deadline exceeded');
  } catch (error) {
    if (!guard.workloadStarted) await guard.close();
    throw error;
  }
}

async function main() {
  const began = performance.now(), deadlineNanoseconds = String(process.hrtime.bigint()+1800000000000n);
  const guard = startGuard(began,deadlineNanoseconds);
  await guard.initialized;
  let entered = false;
  try {
    const options = parseCurrentCircularArgs(process.argv.slice(2));
    const root = realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..'));
    const profile = JSON.parse(read(path.resolve(root,options['--profile']),options['--profile-sha256']));
    const self = read(path.join(root,PATHS.entry),profile.sources?.entry?.sha256);
    const captured = await import(dataURL(self)); entered = true;
    await captured.runCurrentCircularPilot({root,options,began,deadlineNanoseconds,guard});
  } catch (error) {
    if (!entered) await guard.close();
    console.error(error.stack); process.exitCode = 1;
  }
}
if (import.meta.url.startsWith('file:') && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

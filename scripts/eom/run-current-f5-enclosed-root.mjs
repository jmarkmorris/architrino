// Current execution transport; the original API and ledger instruments are unchanged.
import { createHash } from 'node:crypto';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as f5Fs from "node:fs";
import * as f5Crypto from "node:crypto";
// Bootstrap uses Node builtins only; no repository module runs before selection.
export async function bootstrapF5(root, sourceMapSha256, originalIdentities = {}) {
  if (!/^[a-f0-9]{64}$/u.test(sourceMapSha256 ?? "")) throw Error("externally selected F5 source-map digest required");
  const capture = (filename, expected) => {
    if (f5Fs.realpathSync(filename) !== filename) throw Error("canonical F5 bootstrap source required");
    const fd = f5Fs.openSync(filename, f5Fs.constants.O_RDONLY | f5Fs.constants.O_NOFOLLOW | f5Fs.constants.O_NONBLOCK);
    try {
      const before = f5Fs.fstatSync(fd, {bigint:true});
      const identity = s => [s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(":");
      if (!before.isFile() || before.size <= 0n || before.size > 1024n**2n) throw Error("bounded F5 bootstrap source");
      const data = f5Fs.readFileSync(fd), sha256 = f5Crypto.createHash("sha256").update(data).digest("hex");
      if (sha256 !== expected || identity(before) !== identity(f5Fs.fstatSync(fd,{bigint:true})) || identity(before) !== identity(f5Fs.lstatSync(filename,{bigint:true}))) throw Error("F5 bootstrap source digest/original identity changed");
      if (Object.hasOwn(originalIdentities,filename) && originalIdentities[filename] !== identity(before)) throw Error("F5 original bootstrap identity changed");
      return {data,identity:identity(before),path:filename};
    } finally {f5Fs.closeSync(fd);}
  };
  const mapPath = path.join(root,"reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld");
  const map = capture(mapPath,sourceMapSha256), admissionPath = "scripts/eom/f5-current-source-admission.mjs";
  const rows = JSON.parse(map.data)["@graph"]?.filter(r=>r.role==="admission"&&r.binding?.path===admissionPath);
  if (rows?.length !== 1 || !/^[a-f0-9]{64}$/u.test(rows[0].binding.sha256)) throw Error("exact F5 admission module selection required");
  const helper = capture(path.join(root,admissionPath),rows[0].binding.sha256);
  const module = await import("data:text/javascript;base64,"+helper.data.toString("base64"));
  return module.admitF5Sources(root,sourceMapSha256,{...originalIdentities,[map.path]:map.identity,[helper.path]:helper.identity});
}

// Historical API applicability, not a current execution selector.
const API_SUBJECT_BINDINGS = [{"path":"src/eom/native/eom_f5_enclosed_root_cli.cpp","sha256":"9f7661f4000174d631d4c60f7078e124d77ae9b2ddba6af36197f13096095f81"},{"path":"src/eom/CMakeLists.txt","sha256":"e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd"},{"path":"src/eom/src/History.cpp","sha256":"cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5"},{"path":"src/eom/src/Interval.cpp","sha256":"5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5"},{"path":"src/eom/include/architrino/eom/History.hpp","sha256":"0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3"},{"path":"src/eom/include/architrino/eom/Interval.hpp","sha256":"880a98273244c65f85ebcce2e08026a177c4af633633b8e29078948b54143dd9"}];

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export function checkBinding(record, root) {
  if (!record || typeof record.path !== 'string' || !/^[a-f0-9]{64}$/.test(record.sha256)) throw new Error('invalid binding');
  const filename = path.resolve(root, record.path), bytes = readFileSync(filename);
  if (digest(bytes) !== record.sha256 || (record.bytes !== undefined && bytes.length !== record.bytes) ||
      (record.realPath && realpathSync(filename) !== record.realPath)) throw new Error(`bound bytes or target changed: ${filename}`);
  return { ...record, path: filename };
}
function checkCapability(record, root) {
  if (!record || typeof record.path !== 'string' || !path.isAbsolute(record.path)) throw new Error('invalid capability path');
  const filename = path.resolve(root, record.path);
  if (!realpathSync(filename)) throw new Error(`capability unavailable: ${filename}`);
  return { ...record, path: filename };
}
export function validateAdmission(admission) {
  if (admission?.schema !== 'braid-program/f5-current-build-admission.v1' || admission.accepted !== true ||
      !path.isAbsolute(admission.buildRoot ?? '') || !same(admission.originalApiBindings, API_SUBJECT_BINDINGS) ||
      admission.currentApiBindings?.length !== 6 || new Set(admission.currentApiBindings.map(x => x.path)).size !== 6 ||
      !admission.evidence?.length) throw new Error('complete independent current-build admission required');
  for (const old of API_SUBJECT_BINDINGS) {
    const current = admission.currentApiBindings.find(x => x.path === old.path);
    if (!current || !/^[a-f0-9]{64}$/.test(current.sha256)) throw new Error('current API census differs');
    if (!['src/eom/native/eom_f5_enclosed_root_cli.cpp', 'src/eom/CMakeLists.txt'].includes(old.path) && current.sha256 !== old.sha256)
      throw new Error('API arithmetic source changed beyond reviewed applicability');
  }
}
export function executionCopy(original, copy, root) {
  if (!copy || copy.sha256 !== original.sha256 || copy.bytes !== original.bytes) throw new Error('execution copy differs from captured build');
  const relative = path.relative(root, path.resolve(root, copy.path));
  if (!relative || relative.split(path.sep).includes('..') || path.isAbsolute(relative)) throw new Error('execution copy must be inside the explicit input root');
  return { ...copy, path: relative };
}
export function currentBuildAdmission(admissionPath, admissionSha256, operational) {
  return ({ root, preparationInput, apiInput }) => {
    if (!operational) throw new Error("explicit current F5 operational admission required");
    operational.recheck();
    if (process.platform !== 'darwin') throw new Error('reviewed macOS runtime required');
    for (const key of Object.keys(process.env))
      if (key.startsWith('DYLD_') || ['LD_PRELOAD', 'LD_LIBRARY_PATH', 'NODE_OPTIONS', 'NODE_PATH'].includes(key))
        throw new Error(`injected current execution environment: ${key}`);
    const admissionBinding = checkBinding({ path: path.resolve(admissionPath), sha256: admissionSha256 }, root);
    const admission = JSON.parse(readFileSync(admissionBinding.path, 'utf8'));
    validateAdmission(admission);
    const dependencies = [admissionBinding];
    const add = (record, base = admission.buildRoot) => { const bound = checkBinding(record, base); dependencies.push(bound); return bound; };
    const expectedInputs = [[admission.preparation, preparationInput.binding], [admission.apiProof, apiInput.binding],
      [admission.manifest, preparationInput.value.historyManifest], [admission.nominal, preparationInput.value.conformance]];
    for (const [reviewed, actual] of expectedInputs) {
      const checked = add(reviewed);
      if (checked.path !== path.resolve(root, actual.path) || checked.sha256 !== actual.sha256) throw new Error('review refers to different proof inputs');
    }
    admission.evidence.forEach(record => add(record));
    for (const current of admission.currentApiBindings) {
      add(current, root); add(current);
    }
    const buildBinding = add(admission.build);
    const build = JSON.parse(readFileSync(buildBinding.path, 'utf8'));
    if (build.schema !== 'braid-program/f5-enclosed-root-current-build.v1' || build.status !== 'build-recorded-pending-independent-review' ||
        build.accepted !== false || !build.stages?.length || !build.buildDriver?.make || !build.buildDriver?.shell)
      throw new Error('complete captured current build required');
    if (!build.sourcesBefore?.length || !same(build.sourcesBefore, build.sourcesAfter)) throw new Error('incomplete authored source census');
    for (const stage of build.stages) {
      if (stage.code !== 0 || stage.signal || stage.timedOut || stage.interrupted || !stage.processGroupClosed || stage.descendantsAfterClose)
        throw new Error('build stage did not close successfully');
      add(stage.log);
    }
    build.discoveryToolsBefore.forEach(record => checkCapability(record, admission.buildRoot));
    build.dependencyUnits.forEach(unit => { add(unit.beforeDependencyFile); add(unit.actualDependencyFile); });
    Object.values(build.built).forEach(record => add(record));
    checkCapability(build.buildDriver.make, admission.buildRoot); checkCapability(build.buildDriver.shell, admission.buildRoot);
    checkCapability(build.pythonRuntime, admission.buildRoot);
    for (const runtime of build.runtimeDependencies ?? [])
      if (runtime.status !== 'runtime-capability') throw new Error('unknown runtime capability boundary');
    const actualCompiler = checkCapability(build.compiler, admission.buildRoot);
    const executingNode = build.toolsBefore.find(record => realpathSync(path.resolve(admission.buildRoot, record.path)) === realpathSync(process.execPath));
    if (!executingNode) throw new Error('executing Node runtime absent from reviewed tool census');
    checkCapability(executingNode, admission.buildRoot);
    const relative = record => ({ ...record, path: path.relative(root, path.resolve(admission.buildRoot, record.path)) });
    const localBuilt = ['executable', 'library'].map(name => {
      const copy = executionCopy(build.built[name], admission.executionArtifacts?.[name], root);
      add(copy, root);
      return copy;
    });
    const toolchain = { built: localBuilt,
      externalLibraries: (build.externalLibrariesAfter ?? []).map(relative), compiler: actualCompiler };
    operational.recheck(); dependencies.push(...operational.sources);
    return { toolchainInput: { binding: buildBinding, value: build }, toolchain, actualCompiler, dependencies,
      adapterSourceSha256: admission.currentApiBindings.find(x => x.path === 'src/eom/native/eom_f5_enclosed_root_cli.cpp').sha256,
      applicability: { admission: admissionBinding, originalApiProof: admission.apiProof, boundary: 'reviewed configuration-path and build-test-selection changes only; original API receipt preserved' } };
  };
}
export async function main(argv) {
  const args = [], current = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (['--admission', '--admission-sha256'].includes(argv[i])) {
      if (current[argv[i]] || !argv[i + 1]) throw new Error('duplicate or missing admission argument');
      current[argv[i]] = argv[i + 1];
    } else args.push(argv[i], argv[i + 1]);
  }
  if (!current['--admission'] || !/^[a-f0-9]{64}$/.test(current['--admission-sha256'] ?? '')) throw new Error('exact independently reviewed admission required');
  const selected = args.filter((_,i)=>i%2===0).filter(x=>x==="--source-map-sha256");
  if(selected.length!==1)throw Error("one externally selected F5 source-map digest required");
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
  const operational=await bootstrapF5(root,args[args.indexOf("--source-map-sha256")+1]);
  const {runF5}=await operational.importModule("scripts/eom/run-f5-enclosed-root.mjs");
  const result=await runF5(args, { admitCurrentBuild: currentBuildAdmission(current['--admission'], current['--admission-sha256'],operational) });
  operational.recheck();return result;
}
if (import.meta.url.startsWith("file:") && !new URL(import.meta.url).search && process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });

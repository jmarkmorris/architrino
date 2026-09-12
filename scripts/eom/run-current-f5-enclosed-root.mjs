// Current execution transport; the original API and ledger instruments are unchanged.
import { createHash } from 'node:crypto';
import { readFileSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { API_SUBJECT_BINDINGS, runF5 } from './run-f5-enclosed-root.mjs';
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
export function currentBuildAdmission(admissionPath, admissionSha256) {
  return ({ root, preparationInput, apiInput }) => {
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
    dependencies.push(checkBinding({ path: fileURLToPath(import.meta.url), sha256: digest(readFileSync(fileURLToPath(import.meta.url))) }, root));
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
  return runF5(args, { admitCurrentBuild: currentBuildAdmission(current['--admission'], current['--admission-sha256']) });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });

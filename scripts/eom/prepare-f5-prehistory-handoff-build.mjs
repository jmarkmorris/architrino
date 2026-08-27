// Build identity only: no F5 data, root calls, or evolution requests are loaded.
import { accessSync, closeSync, constants, existsSync, fsyncSync, mkdirSync,
  openSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compileInput, fileBinding, makeDependencies,
  requireSameBindings, resolvedInvocation } from "./prepare-abc-enclosed-root.mjs";
import { runWatched, scopedPath } from "./prepare-f5-enclosed-root.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SELF = "scripts/eom/prepare-f5-prehistory-handoff-build.mjs";
const WRAPPER = "scripts/eom/prepare-f5-prehistory-handoff.py";
const INSPECTOR = "src/eom/native/eom_f5_prehistory_inspector.cpp";
const BASE = ".local-data/braid-analysis/f5-prehistory-handoff-build-20260827/";
export const SOURCE_OWNERS = Object.freeze({
  "src/eom/src/History.cpp": "cd732843db488de66798953278d1e3b15151163c826b9d5b93eed98363a8b4c5",
  "src/eom/src/Interval.cpp": "5da66e8473f78439dbb075857918af85b7789b2749e5046c83d9b58d944023a5",
  "src/eom/include/architrino/eom/Decimal.hpp": "8126e685d9be5a2d4935d29eaa12d1aa995822781c198d48d809c0f0b6ddad7f",
  "src/eom/include/architrino/eom/History.hpp": "0e326f15c70a0b0dc5786b1c14a2f2378324754c28cc597b92d82c0c1da3c8f3",
  "src/eom/src/CoupledEvolution.cpp": "88935fa4410f626d25200597a2fb5ba1ad4cb7a8c68324cf452affd4643c9194",
});
const PINNED = Object.freeze({
  ...SOURCE_OWNERS,
  [WRAPPER]: "4c9a5d724cb4d0e24fa35dd3cefed661448d0ff69077171f9d6adc869f8a079c",
  [INSPECTOR]: "b9aeb71f6ca48d77e6b22e2ba06b0adb91884b4569399d4c6fc1acd642298b36",
  "tests/test_f5_prehistory_handoff_producer.py": "ec1d99b6919fd2c666dd1dd157388f9577f054070744db3e38a4cc4b56062770",
  "scripts/eom/verify-f5-prehistory-handoff.py": "6c94b0ca16dfe20bed4841a547adca349f2f36cdd5ec04211341d6b060032a68",
  "tests/test_f5_prehistory_handoff.py": "111e828c8ea3c26996ce51c83496ff7850d48b52cf7e874982c67e882ad6cadf",
  "scripts/eom/prepare-abc-enclosed-root.mjs": "bbe06d12742578ba8cce6f8f55751d4d9e6a8b83404ee998fd48b6f6dbc27905",
  "scripts/eom/prepare-f5-enclosed-root.mjs": "ba154c0a8c63bd390ae1e16de005fd5d52000fedec352619b60b9465a2f813f5",
  "src/eom/CMakeLists.txt": "e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd",
});
const absolute = (value) => path.isAbsolute(value) ? value : path.join(ROOT, value);
export function minimalBinding(filename) {
  const record = fileBinding(filename);
  return { path: absolute(record.path), sha256: record.sha256, bytes: record.bytes };
}
function jsonNew(filename, value) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
  const fd = openSync(filename, "wx");
  try { writeFileSync(fd, bytes); fsyncSync(fd); } finally { closeSync(fd); }
  if (!readFileSync(filename).equals(bytes)) throw new Error("build publication readback differs");
}
function syncFile(filename) {
  const fd = openSync(filename, "r+");
  try { fsyncSync(fd); } finally { closeSync(fd); }
}
export function parseArgs(argv) {
  const values = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!["--out", "--python", "--builder-sha256"].includes(argv[i]) || !argv[i + 1] || values[argv[i]])
      throw new Error("expected --out NEW-DIRECTORY --python ABSOLUTE-VENV-PYTHON --builder-sha256 SHA");
    values[argv[i]] = argv[i + 1];
  }
  if (Object.keys(values).length !== 3 || !path.isAbsolute(values["--python"]) ||
      !/^[a-f0-9]{64}$/u.test(values["--builder-sha256"] ?? "")) throw new Error("incomplete build arguments");
  return { output: scopedPath(values["--out"], BASE), python: values["--python"], sha: values["--builder-sha256"] };
}
export function snapshot(builderSha) {
  const files = new Set([SELF, ...Object.keys(PINNED)]);
  const visit = (relative) => {
    for (const entry of readdirSync(absolute(relative), { withFileTypes: true })) {
      const next = `${relative}/${entry.name}`;
      if (entry.isSymbolicLink()) throw new Error(`symlinked EOM source: ${next}`);
      if (entry.isDirectory()) visit(next);
      else if (entry.isFile()) files.add(next);
      else throw new Error(`nonregular EOM source: ${next}`);
    }
  };
  visit("src/eom/src"); visit("src/eom/include");
  const records = [...files].sort().map(fileBinding);
  for (const [filename, expected] of Object.entries({ ...PINNED, [SELF]: builderSha }))
    if (records.find((record) => record.path === filename)?.sha256 !== expected)
      throw new Error(`reviewed source drift: ${filename}`);
  return records;
}
function resolveTool(name) {
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!directory) continue;
    const filename = path.resolve(directory, name);
    try { accessSync(filename, constants.X_OK); if (statSync(filename).isFile()) return realpathSync(filename); }
    catch { /* Continue the declared PATH search. */ }
  }
  throw new Error(`required build tool unavailable: ${name}`);
}
function cacheField(cache, name) {
  const result = cache.match(new RegExp(`^${name}:(?:FILEPATH|PATH|STRING)=(.+)$`, "mu"))?.[1];
  if (!result) throw new Error(`missing CMake field: ${name}`);
  return result;
}

export async function prepare(argv) {
  const { output, python, sha } = parseArgs(argv);
  if (existsSync(output) || process.platform !== "darwin") throw new Error("fresh exclusive directory on the reviewed macOS host required");
  for (const key of Object.keys(process.env))
    if (key.startsWith("DYLD_") || ["LD_PRELOAD", "LD_LIBRARY_PATH", "CPATH", "CPLUS_INCLUDE_PATH", "C_INCLUDE_PATH"].includes(key))
      throw new Error(`injected build/runtime environment: ${key}`);
  const started = performance.now();
  const remaining = () => {
    const ms = 1_800_000 - (performance.now() - started);
    if (!(ms > 0)) throw new Error("inclusive build deadline exceeded");
    return ms;
  };
  const receipt = { schema: "braid-program/f5-prehistory-handoff-build.v1", status: "incomplete",
    accepted: false, sourceOwners: SOURCE_OWNERS, rootCalls: 0, dataLoaded: false, eomExecuted: false,
    evolutionAuthorized: false, h3EvidenceEligible: false, startedAt: new Date().toISOString(),
    sourcesBefore: snapshot(sha), stages: [], outputDirectory: output };
  mkdirSync(path.dirname(output), { recursive: true }); mkdirSync(output);
  const build = path.join(output, "build"), dependencies = path.join(output, "dependencies");
  mkdirSync(build); mkdirSync(dependencies);
  const watched = async (stage, command, args, cwd = ROOT) => {
    const log = path.join(output, `${stage}.log`);
    const result = await runWatched(command, args, { cwd, stage, logPath: log, limitMs: remaining(), heartbeatMs: 15000 });
    syncFile(log);
    receipt.stages.push({ ...result, cwd, log: fileBinding(log) });
    return readFileSync(log, "utf8").trim();
  };
  try {
    const cmake = resolveTool("cmake"), xcrun = resolveTool("xcrun"), swVers = resolveTool("sw_vers");
    receipt.discoveryToolsBefore = [process.execPath, python, cmake, xcrun, swVers].map(fileBinding);
    const tool = async (name) => {
      const filename = await watched(`resolve-${name.replaceAll("+", "p")}`, xcrun, ["--find", name]);
      return resolvedInvocation(filename);
    };
    const compiler = resolvedInvocation(await tool("clang++"), true), ar = await tool("ar"),
      ranlib = await tool("ranlib"), linker = await tool("ld"), otool = await tool("otool");
    const sdk = realpathSync(await watched("sdk", xcrun, ["--show-sdk-path"]));
    receipt.toolsBefore = [...new Set([process.execPath, python, cmake, xcrun, swVers, compiler, ar, ranlib, linker, otool])].sort().map(fileBinding);
    receipt.compiler = { ...fileBinding(compiler), sdk, driverMode: "g++",
      resourceDirectory: realpathSync(await watched("compiler-resource-dir", compiler, ["--driver-mode=g++", "-print-resource-dir"])),
      version: await watched("compiler-version", compiler, ["--driver-mode=g++", "--version"]) };
    receipt.systemVersion = await watched("system-version", swVers, []);
    receipt.cmakeVersion = await watched("cmake-version", cmake, ["--version"]);
    receipt.pythonRuntime = { ...minimalBinding(python), resolvedPath: realpathSync(python),
      version: await watched("python-version", python, ["-I", "-B", "--version"]) };
    await watched("configure", cmake, ["-S", absolute("src/eom"), "-B", build,
      "-DCMAKE_BUILD_TYPE=Release", "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON", "-DCMAKE_PREFIX_PATH=/opt/homebrew",
      `-DCMAKE_CXX_COMPILER=${compiler}`, "-DCMAKE_CXX_COMPILER_ARG1=--driver-mode=g++",
      `-DCMAKE_AR=${ar}`, `-DCMAKE_RANLIB=${ranlib}`, `-DCMAKE_LINKER=${linker}`, `-DCMAKE_OSX_SYSROOT=${sdk}`,
      "-DEOM_ENABLE_SANITIZERS=OFF", "-DCMAKE_CXX_FLAGS=", "-DCMAKE_CXX_FLAGS_RELEASE=-O3 -DNDEBUG",
      "-DCMAKE_STATIC_LINKER_FLAGS=", "-DCMAKE_EXE_LINKER_FLAGS="]);
    const cachePath = path.join(build, "CMakeCache.txt"), commandsPath = path.join(build, "compile_commands.json");
    const cache = readFileSync(cachePath, "utf8");
    if (realpathSync(cacheField(cache, "CMAKE_CXX_COMPILER")) !== compiler) throw new Error("configured compiler differs");
    const externalPaths = ["MPFR_LIBRARY", "GMP_LIBRARY"].map((key) => cacheField(cache, key));
    receipt.externalLibrariesBefore = externalPaths.map(fileBinding);
    const compile = JSON.parse(readFileSync(commandsPath)).filter((entry) => entry.file.startsWith(absolute("src/eom/src/")))
      .map((entry) => compileInput(entry, compiler)).sort((a, b) => a.source.localeCompare(b.source));
    const expected = receipt.sourcesBefore.filter((record) => record.path.startsWith("src/eom/src/") && record.path.endsWith(".cpp"));
    if (compile.length !== expected.length || new Set(compile.map((entry) => entry.source)).size !== compile.length ||
        expected.some((record) => !compile.some((entry) => entry.source === absolute(record.path)))) throw new Error("translation-unit census differs");
    const args = [...compile[0].args];
    for (const directory of [cacheField(cache, "MPFR_INCLUDE_DIR"), "/opt/homebrew/include"])
      if (!args.includes(`-I${directory}`)) args.push(`-I${directory}`);
    // Commands are passed as argument arrays; no shell interprets them.
    receipt.manualCompileArguments = args;
    const units = [...compile, { source: absolute(INSPECTOR), directory: ROOT, args }];
    receipt.dependencyUnits = [];
    for (const [index, unit] of units.entries()) {
      const filename = path.join(dependencies, `before-${index}.d`);
      await watched(`dependencies-${index}`, compiler, [...unit.args, "-M", "-MF", filename, "-MT", "handoff_dependency", unit.source], unit.directory);
      receipt.dependencyUnits.push({ source: unit.source, directory: unit.directory,
        beforeDependencyFile: fileBinding(filename), files: makeDependencies(readFileSync(filename, "utf8"), unit.directory) });
    }
    const headerPaths = [...new Set(receipt.dependencyUnits.flatMap((unit) => unit.files))].sort();
    receipt.headerDependenciesBefore = headerPaths.map(fileBinding);
    const configured = [cachePath, commandsPath].map(fileBinding);
    requireSameBindings(receipt.sourcesBefore, snapshot(sha), "precompile sources");
    requireSameBindings(receipt.toolsBefore, receipt.toolsBefore.map((record) => fileBinding(record.path)), "precompile tools");
    await watched("librarybuild", cmake, ["--build", build, "--target", "eom_native", "--parallel", "2", "--verbose"]);
    const executable = path.join(build, "eom_f5_prehistory_inspector"), library = path.join(build, "libeom_native.a");
    const inspectorDep = path.join(dependencies, "inspector-actual.d");
    await watched("inspectorlink", compiler, [...args, "-MD", "-MF", inspectorDep, "-MT", "handoff_inspector",
      absolute(INSPECTOR), library, ...externalPaths, "-pthread", `-fuse-ld=${linker}`, "-v", "-o", executable]);
    for (const [index, unit] of units.entries()) {
      const filename = index < compile.length ? `${unit.output}.d` : inspectorDep;
      const files = makeDependencies(readFileSync(filename, "utf8"), unit.directory);
      requireSameBindings(receipt.dependencyUnits[index].files, files, "actual compiler dependencies");
      receipt.dependencyUnits[index].actualDependencyFile = fileBinding(filename);
    }
    requireSameBindings(configured, [cachePath, commandsPath].map(fileBinding), "configured build commands");
    receipt.producerSources = { wrapper: minimalBinding(WRAPPER), inspector: minimalBinding(INSPECTOR) };
    receipt.built = { executable: minimalBinding(executable), library: minimalBinding(library),
      cmakeCache: minimalBinding(cachePath), compileCommands: minimalBinding(commandsPath), inspectorDependencyFile: minimalBinding(inspectorDep) };
    receipt.runtimeDependencies = [];
    const queue = [executable, ...externalPaths], scanned = new Set();
    while (queue.length) {
      const filename = realpathSync(queue.shift());
      if (scanned.has(filename)) continue;
      scanned.add(filename);
      const listing = await watched(`runtime-dependencies-${scanned.size}`, otool, ["-L", filename]);
      for (const match of listing.matchAll(/^\s+(.+?) \(compatibility version/gmu)) {
        const requested = match[1];
        if (!path.isAbsolute(requested)) throw new Error(`unresolved runtime dependency: ${requested}`);
        if (existsSync(requested)) {
          const record = fileBinding(requested);
          receipt.runtimeDependencies.push({ consumer: filename, requested, status: "file-hashed", ...record });
          if (!scanned.has(record.realPath)) queue.push(requested);
        } else if (requested.startsWith("/usr/lib/") || requested.startsWith("/System/Library/"))
          receipt.runtimeDependencies.push({ consumer: filename, requested, status: "platform-dyld-shared-cache-not-file-hashable", systemVersion: receipt.systemVersion });
        else throw new Error(`unreadable runtime dependency: ${requested}`);
      }
    }
    await watched("help-control", executable, ["--help"]);
    receipt.sourcesAfter = snapshot(sha);
    receipt.toolsAfter = receipt.toolsBefore.map((record) => fileBinding(record.path));
    receipt.headerDependenciesAfter = headerPaths.map(fileBinding);
    receipt.externalLibrariesAfter = externalPaths.map(fileBinding);
    for (const [before, after, label] of [[receipt.sourcesBefore, receipt.sourcesAfter, "sources"],
      [receipt.toolsBefore, receipt.toolsAfter, "tools"], [receipt.headerDependenciesBefore, receipt.headerDependenciesAfter, "headers"],
      [receipt.externalLibrariesBefore, receipt.externalLibrariesAfter, "external libraries"]]) requireSameBindings(before, after, label);
    requireSameBindings(receipt.discoveryToolsBefore, receipt.discoveryToolsBefore.map((record) => fileBinding(record.path)), "discovery tools");
    for (const record of Object.values(receipt.built)) requireSameBindings(record, minimalBinding(record.path), "built file");
    for (const record of receipt.runtimeDependencies.filter((item) => item.status === "file-hashed")) {
      const current = fileBinding(record.path);
      if (current.sha256 !== record.sha256 || current.realPath !== record.realPath || current.bytes !== record.bytes) throw new Error("runtime dependency changed");
    }
    for (const stage of receipt.stages) requireSameBindings(stage.log, fileBinding(stage.log.path), "stage log");
    remaining(); receipt.status = "build-recorded-pending-independent-review";
    receipt.dependencyBoundary = "Compiler-reported sources/headers and file-backed runtime dependencies are hash-bound. Explicitly listed macOS shared-cache system libraries are platform-trusted, not file-hashed.";
  } catch (error) {
    receipt.status = "failed"; receipt.error = error.message;
    if (error.processResult) receipt.failedProcess = error.processResult;
    throw error;
  } finally {
    receipt.elapsedBeforePublication = (performance.now() - started) / 1000;
    jsonNew(path.join(output, "preparation.json"), receipt);
    const fd = openSync(output, "r");
    try { fsyncSync(fd); } finally { closeSync(fd); }
  }
  remaining();
  const completion = { completed: true, accepted: false, status: receipt.status,
    receipt: minimalBinding(path.join(output, "preparation.json")), elapsedSeconds: (performance.now() - started) / 1000 };
  console.log(JSON.stringify(completion));
  remaining(); // Fresh successful closure remains mandatory even after stdout.
  return completion;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  prepare(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });

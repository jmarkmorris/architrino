// Build provenance only. This script prepares no histories, invokes no root
// calls, and grants no scientific or root-execution authority.
import { createHash } from "node:crypto";
import { accessSync, closeSync, constants, existsSync, fsyncSync, mkdirSync,
  openSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runWatched, scopedPath } from "./prepare-f5-enclosed-root.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SELF = "scripts/eom/prepare-subfield-circular-root.mjs";
const SUPERVISOR = "scripts/eom/prepare-f5-enclosed-root.mjs";
const SUBJECT = "src/eom/native/eom_subfield_circular_root_cli.cpp";
const BASE = ".local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/";
const PINNED = Object.freeze({
  [SUBJECT]: "42dc7eaa74a36f019ff126215754785f9b8418dd998d9850c2c70dc5cb03bd41",
  "src/eom/CMakeLists.txt": "e4b3a8bdfc91c756eb00e4c37e872bcbebfe1f7b406a551e3aa630f8818d2bdd",
  [SUPERVISOR]: "4380a302ec39f8307415a7f4340c1ef0f3bb4766c378a853133f89b45c34a3a9",
});
const CANDIDATES = ["coincident-midpoint-common-frequency", "coincident-midpoint-equal-radius-common-frequency", "coincident-midpoint-3-2-1-frequency", "phase-compensated-equal-geometry", "axially-separated-common-frequency", "axially-separated-equal-radius-common-frequency", "axially-separated-3-2-1-frequency", "axial-transverse-coincident-axis-interior", "high-axial-coincident-axis-interior", "planar-common-center-three-binary", "coincident-center-two-component-circular-co-rotating", "coincident-center-two-component-circular-counter-rotating", "coaxial-separated-two-component-circular-co-rotating", "coaxial-separated-two-component-circular-counter-rotating", "coaxial-separated-two-planar-braid-co-rotating", "coaxial-separated-two-planar-braid-counter-rotating"];
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const absolute = (filename) => path.isAbsolute(filename) ? filename : path.join(ROOT, filename);
const local = (filename) => filename.startsWith(`${ROOT}/`) ? path.relative(ROOT, filename) : filename;

export function fileBinding(filename) {
  const full = absolute(filename), realPath = realpathSync(full);
  if (!statSync(realPath).isFile()) throw new Error(`binding is not a regular file: ${filename}`);
  const bytes = readFileSync(realPath);
  return { path: local(full), realPath, sha256: hash(bytes), bytes: bytes.length };
}

function writeJson(filename, value) {
  const fd = openSync(filename, "wx");
  try { writeFileSync(fd, `${JSON.stringify(value, null, 2)}\n`); fsyncSync(fd); }
  finally { closeSync(fd); }
}

function syncLog(filename) {
  const fd = openSync(filename, "r+");
  try { fsyncSync(fd); } finally { closeSync(fd); }
}

export function requireSameBindings(before, after, label) {
  if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error(`${label} changed across build`);
}

export function sourceSnapshot() {
  const files = [SELF, SUPERVISOR, SUBJECT, "src/eom/CMakeLists.txt"];
  function visit(relative) {
    for (const entry of readdirSync(path.join(ROOT, relative), { withFileTypes: true })) {
      const next = `${relative}/${entry.name}`;
      if (entry.isSymbolicLink()) throw new Error(`symlinked EOM source is not admitted: ${next}`);
      if (entry.isDirectory()) visit(next);
      else if (entry.isFile()) files.push(next);
      else throw new Error(`nonregular EOM source: ${next}`);
    }
  }
  visit("src/eom/src"); visit("src/eom/include");
  const records = files.sort().map(fileBinding);
  for (const [filename, digest] of Object.entries(PINNED)) {
    if (records.find((record) => record.path === filename)?.sha256 !== digest) throw new Error(`reviewed source drift: ${filename}`);
  }
  return records;
}

export function referenceSnapshot() {
  const subject = readFileSync(path.join(ROOT, SUBJECT), "utf8");
  if (hash(Buffer.from(subject)) !== PINNED[SUBJECT]) throw new Error("reviewed adapter drift");
  // Extract only the literal binding table from the independently reviewed,
  // hash-pinned carrier. No reference module or proof formula is executed.
  const table = subject.match(/kSources\{\{([\s\S]*?)\}\};/u)?.[1];
  const rows = [...(table ?? "").matchAll(/\{"([^"]+)", "([^"]+)", "([a-f0-9]{64})"\}/gu)];
  if (rows.length !== 7) throw new Error("frozen adapter reference table differs");
  const records = rows.map(([, id, filename, digest]) => {
    const record = fileBinding(filename);
    if (record.sha256 !== digest) throw new Error(`frozen reference drift: ${filename}`);
    return { id, ...record };
  });
  const reference = JSON.parse(readFileSync(absolute(records.find((record) => record.id === "root-reference").path)));
  if (reference.accepted !== true || reference.normalizedFieldSpeed !== "1" || reference.results?.length !== 16 ||
      reference.results.some((row, index) => row.id !== CANDIDATES[index] || row.passed !== true)) throw new Error("frozen candidate census differs");
  for (const row of reference.results) {
    if (path.isAbsolute(row.sourcePath) || !row.sourcePath.startsWith("reference/priorities/braid-program/configurations/") ||
        row.sourcePath.split("/").includes("..")) throw new Error("candidate path escapes frozen source lane");
    const record = fileBinding(row.sourcePath);
    if (record.sha256 !== row.sourceSha256) throw new Error(`frozen candidate drift: ${row.id}`);
    records.push({ id: `candidate-source:${row.id}`, ...record });
  }
  return records.sort((a, b) => a.path.localeCompare(b.path));
}

// CMake emits a POSIX-quoted command on this macOS host. Parse tokens without
// invoking a shell or permitting substitutions/redirections.
export function commandTokens(command) {
  const result = [];
  let token = "", quote = null, begun = false;
  for (let index = 0; index < command.length; index++) {
    const c = command[index];
    if (quote) {
      if (c === quote) quote = null;
      else if (c === "\\" && quote === '"') {
        if (++index >= command.length) throw new Error("unterminated command escape");
        token += command[index];
      } else token += c;
    } else if (c === "'" || c === '"') { quote = c; begun = true; }
    else if (/\s/u.test(c)) { if (begun) { result.push(token); token = ""; begun = false; } }
    else if (c === "\\") {
      if (++index >= command.length) throw new Error("unterminated command escape");
      token += command[index]; begun = true;
    } else {
      if (/[|;&<>`$]/u.test(c)) throw new Error("shell operators are not admitted in compile commands");
      token += c; begun = true;
    }
  }
  if (quote) throw new Error("unterminated command quote");
  if (begun) result.push(token);
  return result;
}

export function makeDependencies(text, directory) {
  const flattened = text.replace(/\\\r?\n/gu, " ");
  const colon = flattened.indexOf(":");
  if (colon < 0) throw new Error("dependency file has no target separator");
  const tokens = [];
  let token = "";
  for (let index = colon + 1; index < flattened.length; index++) {
    const c = flattened[index];
    if (c === "\\") {
      if (++index >= flattened.length) throw new Error("unterminated dependency escape");
      token += flattened[index];
    } else if (/\s/u.test(c)) { if (token) { tokens.push(token); token = ""; } }
    else if (c === "$" && flattened[index + 1] === "$") { token += "$"; index++; }
    else token += c;
  }
  if (token) tokens.push(token);
  if (!tokens.length) throw new Error("dependency list is empty");
  return [...new Set(tokens.map((filename) => path.resolve(directory, filename)))].sort();
}

export function compileInput(entry, compiler) {
  const tokens = entry.arguments ?? commandTokens(entry.command);
  if (!Array.isArray(tokens) || realpathSync(tokens[0]) !== compiler) throw new Error("compile command does not use resolved real compiler");
  const args = [], source = path.resolve(entry.directory, entry.file);
  let output, sawCompile = false, sawSource = false;
  for (let index = 1; index < tokens.length; index++) {
    const token = tokens[index];
    if (token === "-o") {
      if (output || !tokens[index + 1]) throw new Error("invalid compiler output option");
      output = path.resolve(entry.directory, tokens[++index]);
    } else if (token === "-c") sawCompile = true;
    else if (path.resolve(entry.directory, token) === source) sawSource = true;
    else args.push(token);
  }
  if (!output || !sawCompile || !sawSource || !args.includes("-ffp-contract=off") ||
      !args.includes("--driver-mode=g++") || args.some((arg) => /fast-math|Ofast/u.test(arg))) throw new Error("unexpected EOM compile contract");
  return { directory: entry.directory, source, output, args };
}

export function parsePrepareSubfieldCircularArgs(argv) {
  if (argv.length !== 2 || argv[0] !== "--out" || !argv[1]) throw new Error("Usage: node scripts/eom/prepare-subfield-circular-root.mjs --out <new-sub-field circular-run-directory>");
  return scopedPath(argv[1], BASE);
}

function resolveTool(name) {
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    if (!directory) continue;
    const filename = path.resolve(directory, name);
    try { accessSync(filename, constants.X_OK); if (statSync(filename).isFile()) return realpathSync(filename); }
    catch { /* Try the next declared PATH entry. */ }
  }
  throw new Error(`required build tool unavailable: ${name}`);
}

export function resolvedInvocation(filename, realExecutable = false) {
  if (!path.isAbsolute(filename)) throw new Error("resolved tool must have an absolute path");
  // Multicall tools such as Apple's ranlib -> libtool select their operation
  // from argv[0]. Preserve that invocation name; fileBinding still hashes the
  // underlying real executable. Clang alone gets explicit g++ driver mode.
  return realExecutable ? realpathSync(filename) : filename;
}

function cacheField(cache, name) {
  const value = cache.match(new RegExp(`^${name}:(?:FILEPATH|PATH|STRING)=(.+)$`, "mu"))?.[1];
  if (!value) throw new Error(`missing CMake cache identity: ${name}`);
  return value;
}

export async function prepareSubfieldCircular(argv) {
  const output = parsePrepareSubfieldCircularArgs(argv);
  if (existsSync(output)) throw new Error("output already exists; fresh exclusive run directory required");
  if (process.platform !== "darwin") throw new Error("this recorded-build procedure currently targets the declared macOS host");
  for (const variable of ["LD_PRELOAD", "DYLD_INSERT_LIBRARIES", "DYLD_LIBRARY_PATH", "DYLD_FRAMEWORK_PATH"]) {
    if (process.env[variable]) throw new Error(`injected dynamic-library environment is inadmissible: ${variable}`);
  }
  const began = performance.now();
  const receipt = { schema: "braid-program/subfield-circular-root-build.v1", status: "incomplete",
    authority: "recorded-build-identity-pending-independent-review", rootExecutionAuthorized: false,
    h3EvidenceEligible: false, historiesPrepared: false, rootCalls: 0,
    startedAt: new Date().toISOString(), outputDirectory: path.relative(ROOT, output),
    sourceIdentityScope: "observed-before-and-after-build-bytes; operational JavaScript is not a mathematical oracle",
    sourcesBefore: sourceSnapshot(), referencesBefore: referenceSnapshot(), stages: [] };
  mkdirSync(path.dirname(output), { recursive: true }); mkdirSync(output);
  const build = path.join(output, "build"), dependencies = path.join(output, "dependencies");
  mkdirSync(build); mkdirSync(dependencies);
  const remaining = () => {
    const value = 1_800_000 - (performance.now() - began);
    if (value <= 0) throw new Error("end-to-end build preparation deadline exceeded");
    return value;
  };
  const watched = async (stage, command, args, cwd = ROOT) => {
    const logPath = path.join(output, `${stage}.log`), startedAt = new Date().toISOString();
    try {
      const result = await runWatched(command, args, { cwd, stage, logPath, limitMs: remaining(), heartbeatMs: 15000 });
      syncLog(logPath);
      const record = { ...result, cwd, startedAt, finishedAt: new Date().toISOString(), log: fileBinding(logPath) };
      receipt.stages.push(record); return readFileSync(logPath, "utf8").trim();
    } catch (error) {
      if (existsSync(logPath)) syncLog(logPath);
      receipt.failedProcess = { ...(error.processResult ?? {}), stage, command, args, cwd, startedAt,
        finishedAt: new Date().toISOString(), ...(existsSync(logPath) ? { log: fileBinding(logPath) } : {}) };
      throw error;
    }
  };
  try {
    writeJson(path.join(output, "sources-before.json"), receipt.sourcesBefore);
    writeJson(path.join(output, "references-before.json"), receipt.referencesBefore);
    const cmake = resolveTool("cmake"), xcrun = resolveTool("xcrun");
    const systemVersionTool = resolveTool("sw_vers");
    receipt.discoveryToolsBefore = [process.execPath, cmake, xcrun, systemVersionTool].map(fileBinding);
    const tool = async (name) => {
      const resolved = await watched(`resolve-${name.replaceAll("+", "p")}`, xcrun, ["--find", name]);
      if (!path.isAbsolute(resolved)) throw new Error(`tool resolver did not return an absolute ${name} path`);
      return resolvedInvocation(resolved);
    };
    const compiler = resolvedInvocation(await tool("clang++"), true), ar = await tool("ar"),
      ranlib = await tool("ranlib"), linker = await tool("ld"), otool = await tool("otool");
    const sdk = realpathSync(await watched("resolve-sdk", xcrun, ["--show-sdk-path"]));
    const resourceDirectory = realpathSync(await watched("compiler-resource-dir", compiler, ["--driver-mode=g++", "-print-resource-dir"]));
    receipt.toolsBefore = [...new Set([process.execPath, cmake, xcrun, otool, systemVersionTool, compiler, ar, ranlib, linker])].sort().map(fileBinding);
    receipt.compiler = { ...fileBinding(compiler), driverMode: "g++", sdk, resourceDirectory,
      version: await watched("compiler-version", compiler, ["--driver-mode=g++", "--version"]) };
    receipt.cmakeVersion = await watched("cmake-version", cmake, ["--version"]);
    receipt.systemVersion = await watched("system-version", systemVersionTool, []);
    writeJson(path.join(output, "tools-before.json"), receipt.toolsBefore);
    await watched("configure", cmake, ["-S", path.join(ROOT, "src/eom"), "-B", build,
      "-DCMAKE_BUILD_TYPE=Release", "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON", "-DCMAKE_PREFIX_PATH=/opt/homebrew",
      `-DCMAKE_CXX_COMPILER=${compiler}`, "-DCMAKE_CXX_COMPILER_ARG1=--driver-mode=g++",
      `-DCMAKE_AR=${ar}`, `-DCMAKE_RANLIB=${ranlib}`, `-DCMAKE_LINKER=${linker}`, `-DCMAKE_OSX_SYSROOT=${sdk}`,
      "-DCMAKE_CXX_FLAGS=", "-DCMAKE_CXX_FLAGS_RELEASE=-O3 -DNDEBUG", "-DCMAKE_STATIC_LINKER_FLAGS=", "-DCMAKE_EXE_LINKER_FLAGS="]);
    const cacheFile = path.join(build, "CMakeCache.txt"), commandsFile = path.join(build, "compile_commands.json");
    const cache = readFileSync(cacheFile, "utf8");
    if (realpathSync(cacheField(cache, "CMAKE_CXX_COMPILER")) !== compiler) throw new Error("CMake compiler differs from resolved executable");
    const externalPaths = ["MPFR_LIBRARY", "GMP_LIBRARY"].map((name) => cacheField(cache, name));
    receipt.externalLibrariesBefore = externalPaths.map(fileBinding);
    const mpfrInclude = cacheField(cache, "MPFR_INCLUDE_DIR");
    const commands = JSON.parse(readFileSync(commandsFile));
    const compile = commands.filter((entry) => entry.file.startsWith(path.join(ROOT, "src/eom/src/")))
      .map((entry) => compileInput(entry, compiler)).sort((a, b) => a.source.localeCompare(b.source));
    const expectedSources = receipt.sourcesBefore.filter((record) => record.path.startsWith("src/eom/src/") && record.path.endsWith(".cpp"));
    if (compile.length !== expectedSources.length || new Set(compile.map((entry) => entry.source)).size !== compile.length ||
        expectedSources.some((record) => !compile.some((entry) => entry.source === absolute(record.path)))) throw new Error("compile command source census differs");
    const manualArgs = [...compile[0].args];
    if (!manualArgs.includes(`-I${mpfrInclude}`)) manualArgs.push(`-I${mpfrInclude}`);
    const subject = { source: path.join(ROOT, SUBJECT), directory: ROOT, args: manualArgs };
    const units = [...compile, subject];
    receipt.dependencyUnits = [];
    for (const [index, unit] of units.entries()) {
      const dep = path.join(dependencies, `before-${index}.d`);
      await watched(`dependencies-${index}`, compiler,
        [...unit.args, "-M", "-MF", dep, "-MT", "subfield_circular_dependency", unit.source], unit.directory);
      const files = makeDependencies(readFileSync(dep, "utf8"), unit.directory);
      receipt.dependencyUnits.push({ source: local(unit.source), directory: unit.directory,
        beforeDependencyFile: fileBinding(dep), files });
    }
    const headerPaths = [...new Set(receipt.dependencyUnits.flatMap((unit) => unit.files))].sort();
    receipt.headerDependenciesBefore = headerPaths.map(fileBinding);
    writeJson(path.join(output, "header-dependencies-before.json"), receipt.headerDependenciesBefore);
    writeJson(path.join(output, "external-libraries-before.json"), receipt.externalLibrariesBefore);
    const configured = [cacheFile, commandsFile].map(fileBinding);
    requireSameBindings(receipt.sourcesBefore, sourceSnapshot(), "source snapshot before compilation");
    requireSameBindings(receipt.referencesBefore, referenceSnapshot(), "reference snapshot before compilation");
    requireSameBindings(receipt.toolsBefore, receipt.toolsBefore.map((record) => fileBinding(record.path)), "toolchain before compilation");
    await watched("librarybuild", cmake, ["--build", build, "--target", "eom_native", "--parallel", "2", "--verbose"]);
    const executable = path.join(build, "eom_subfield_circular_root_cli"), library = path.join(build, "libeom_native.a");
    const manualDependencyFile = path.join(dependencies, "adapter-actual.d");
    await watched("adapterlink", compiler, [...manualArgs, "-MD", "-MF", manualDependencyFile,
      "-MT", "subfield_circular_adapter", subject.source, library, ...externalPaths, "-pthread", `-fuse-ld=${linker}`, "-v", "-o", executable]);
    for (const [index, unit] of units.entries()) {
      const actualFile = index < compile.length ? `${unit.output}.d` : manualDependencyFile;
      const files = makeDependencies(readFileSync(actualFile, "utf8"), unit.directory);
      if (JSON.stringify(files) !== JSON.stringify(receipt.dependencyUnits[index].files)) throw new Error(`actual compiler dependencies differ: ${unit.source}`);
      receipt.dependencyUnits[index].actualDependencyFile = fileBinding(actualFile);
    }
    requireSameBindings(configured, [cacheFile, commandsFile].map(fileBinding), "configured build commands");
    receipt.built = { executable: fileBinding(executable), library: fileBinding(library),
      cmakeCache: fileBinding(cacheFile), compileCommands: fileBinding(commandsFile),
      manualDependencyFile: fileBinding(manualDependencyFile) };
    receipt.runtimeDependencies = [];
    const queue = [executable, ...externalPaths], scanned = new Set();
    while (queue.length) {
      const filename = realpathSync(queue.shift());
      if (scanned.has(filename)) continue;
      scanned.add(filename);
      const text = await watched(`runtime-dependencies-${scanned.size}`, otool, ["-L", filename]);
      for (const match of text.matchAll(/^\s+(.+?) \(compatibility version/gmu)) {
        const requested = match[1];
        if (!path.isAbsolute(requested)) throw new Error(`unresolved dynamic dependency: ${requested}`);
        if (existsSync(requested)) {
          const record = fileBinding(requested);
          receipt.runtimeDependencies.push({ consumer: local(filename), requested, status: "file-hashed", ...record });
          if (!scanned.has(record.realPath)) queue.push(requested);
        } else if (requested.startsWith("/usr/lib/") || requested.startsWith("/System/Library/")) {
          receipt.runtimeDependencies.push({ consumer: local(filename), requested,
            status: "platform-dyld-shared-cache-not-file-hashable", systemVersion: receipt.systemVersion });
        } else throw new Error(`dynamic dependency cannot be read: ${requested}`);
      }
    }
    await watched("help-control", executable, ["--help"]);
    receipt.sourcesAfter = sourceSnapshot(); receipt.referencesAfter = referenceSnapshot();
    receipt.toolsAfter = receipt.toolsBefore.map((record) => fileBinding(record.path));
    receipt.headerDependenciesAfter = headerPaths.map(fileBinding);
    receipt.externalLibrariesAfter = externalPaths.map(fileBinding);
    for (const [before, after, label] of [[receipt.sourcesBefore, receipt.sourcesAfter, "sources"],
      [receipt.referencesBefore, receipt.referencesAfter, "references"], [receipt.toolsBefore, receipt.toolsAfter, "tools"],
      [receipt.headerDependenciesBefore, receipt.headerDependenciesAfter, "headers"],
      [receipt.externalLibrariesBefore, receipt.externalLibrariesAfter, "external libraries"]]) requireSameBindings(before, after, label);
    requireSameBindings(receipt.discoveryToolsBefore, receipt.discoveryToolsBefore.map((record) => fileBinding(record.path)), "discovery tools");
    for (const record of Object.values(receipt.built)) requireSameBindings([record], [fileBinding(record.path)], "built artifact");
    for (const record of receipt.runtimeDependencies.filter((item) => item.status === "file-hashed")) {
      const current = fileBinding(record.path);
      if (record.sha256 !== current.sha256 || record.realPath !== current.realPath || record.bytes !== current.bytes) throw new Error("runtime dependency changed");
    }
    for (const stage of receipt.stages) requireSameBindings([stage.log], [fileBinding(stage.log.path)], "stage log");
    writeJson(path.join(output, "sources-after.json"), receipt.sourcesAfter);
    writeJson(path.join(output, "references-after.json"), receipt.referencesAfter);
    writeJson(path.join(output, "tools-after.json"), receipt.toolsAfter);
    writeJson(path.join(output, "header-dependencies-after.json"), receipt.headerDependenciesAfter);
    writeJson(path.join(output, "external-libraries-after.json"), receipt.externalLibrariesAfter);
    remaining(); receipt.status = "build-recorded-pending-independent-review";
    receipt.dependencyBoundary = "Every compiler-reported source/header dependency and file-backed external runtime dependency is hash-bound. macOS shared-cache system libraries are platform-trusted and explicitly listed without invented file hashes.";
    return receipt;
  } catch (error) {
    receipt.status = "failed"; receipt.error = error.message; throw error;
  } finally {
    receipt.finishedAt = new Date().toISOString(); receipt.elapsedWallSeconds = (performance.now() - began) / 1000;
    writeJson(path.join(output, "preparation.json"), receipt);
    console.log(JSON.stringify({ status: receipt.status, outputDirectory: receipt.outputDirectory,
      elapsedWallSeconds: receipt.elapsedWallSeconds, h3EvidenceEligible: false, rootExecutionAuthorized: false }));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  prepareSubfieldCircular(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}

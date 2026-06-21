#!/usr/bin/env node

import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createSolverAppBridgeClient } from "../src/solver/app/SolverAppBridge.mjs";

const args = process.argv.slice(2);
const allowedArgs = new Set(["--write", "--check", "--print", "--help"]);
const unknownArgs = args.filter((arg) => !allowedArgs.has(arg));

if (args.includes("--help")) {
  printUsage(0);
}
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}

const wantsWrite = args.includes("--write");
const wantsPrint = args.includes("--print");
const wantsCheck = args.includes("--check") || (!wantsWrite && !wantsPrint);

const rootDir = process.cwd();
const buildRoot = path.join(rootDir, ".tmp", "solver-build");
const manifestPath = path.join(buildRoot, "solver-package-manifest.json");
const manifestRelPath = ".tmp/solver-build/solver-package-manifest.json";

const packageArtifacts = [
  {
    role: "wasm-loader",
    kind: "emscripten-es-module-loader",
    path: ".tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "wasm-binary",
    kind: "webassembly-binary",
    path: ".tmp/solver-build/wasm/architrino_solver_wasm_smoke.wasm",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-bridge-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverAppBridge.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "absolute-history-root-runtime",
    kind: "javascript-module",
    path: "src/solver/app/AbsoluteHistoryRootRuntime.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-adapters-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverAppAdapters.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-bridge-client-resolver-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverAppBridgeClientResolver.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "baseline-comparison-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverBaselineComparison.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "worker-bridge-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverAppWorkerBridge.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "worker-runtime",
    kind: "javascript-module",
    path: "src/solver/app/SolverAppWorkerRuntime.mjs",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-bridge-types",
    kind: "typescript-declarations",
    path: "src/solver/app/SolverAppBridgeContract.d.ts",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-adapters-types",
    kind: "typescript-declarations",
    path: "src/solver/app/SolverAppAdapters.d.ts",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-bridge-client-resolver-types",
    kind: "typescript-declarations",
    path: "src/solver/app/SolverAppBridgeClientResolver.d.ts",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "worker-bridge-types",
    kind: "typescript-declarations",
    path: "src/solver/app/SolverAppWorkerBridge.d.ts",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "worker-runtime-types",
    kind: "typescript-declarations",
    path: "src/solver/app/SolverAppWorkerRuntime.d.ts",
    packageTarget: "browser-app-runtime",
  },
  {
    role: "app-bridge-schema",
    kind: "json-schema",
    path: "src/contracts/solver-app-bridge/v1/schema.json",
    packageTarget: "browser-app-runtime",
  },
];

const bannedPackagePathPatterns = [
  /\.o$/u,
  /\.obj$/u,
  /\.bc$/u,
  /\.wasm\.o$/u,
  /(^|\/)CMakeFiles(\/|$)/u,
  /(^|\/)CMakeCache\.txt$/u,
  /(^|\/)cmake_install\.cmake$/u,
  /(^|\/)build\.ninja$/u,
  /(^|\/)\.ninja_/u,
  /(^|\/)compile_commands\.json$/u,
  /(^|\/)libarchitrino_solver_core\.a$/u,
];

const packageCapabilitySummary = await readPackageCapabilitySummary();
const manifest = buildManifest(packageCapabilitySummary);
const renderedManifest = `${JSON.stringify(manifest, null, 2)}\n`;

if (wantsWrite) {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, renderedManifest);
  console.log(`wrote ${manifestRelPath}`);
}

if (wantsCheck) {
  if (!fs.existsSync(manifestPath)) {
    fail(`Package manifest missing: ${manifestRelPath}. Run with --write first.`);
  }
  const currentManifest = fs.readFileSync(manifestPath, "utf8");
  if (currentManifest !== renderedManifest) {
    fail(`Package manifest is stale: ${manifestRelPath}. Run with --write.`);
  }
  console.log(`checked ${manifestRelPath}`);
}

if (wantsPrint) {
  process.stdout.write(renderedManifest);
}

function buildManifest(packageCapabilities) {
  const roles = new Set();
  const artifactPaths = new Set();
  const artifacts = packageArtifacts.map((artifact) => {
    if (roles.has(artifact.role)) {
      fail(`Duplicate package artifact role: ${artifact.role}`);
    }
    roles.add(artifact.role);
    if (artifactPaths.has(artifact.path)) {
      fail(`Duplicate package artifact path: ${artifact.path}`);
    }
    artifactPaths.add(artifact.path);
    assertPackagePathAllowed(artifact.path);
    const absolutePath = path.join(rootDir, artifact.path);
    if (!fs.existsSync(absolutePath)) {
      fail(`Package artifact missing: ${artifact.path}`);
    }
    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) {
      fail(`Package artifact is not a file: ${artifact.path}`);
    }
    if (stat.size <= 0) {
      fail(`Package artifact is empty: ${artifact.path}`);
    }
    return {
      role: artifact.role,
      kind: artifact.kind,
      path: artifact.path,
      packageTarget: artifact.packageTarget,
      bytes: stat.size,
      sha256: sha256File(absolutePath),
    };
  });

  assertRuntimeModuleDependenciesIncluded(artifacts);

  const wasmCache = readCmakeCache(path.join(buildRoot, "wasm", "CMakeCache.txt"));
  const nativeCache = readCmakeCache(path.join(buildRoot, "native", "CMakeCache.txt"));
  const solverVersion = wasmCache.CMAKE_PROJECT_VERSION || nativeCache.CMAKE_PROJECT_VERSION || "unknown";
  const contractSchema = readJson("src/contracts/solver-app-bridge/v1/schema.json");
  const schemaVersions = createSchemaVersionSummary(contractSchema, packageCapabilities);
  assertPackageCapabilitySummary(packageCapabilities);

  return {
    schema: "architrino-solver-package-manifest.v1",
    packageName: "architrino-solver",
    packageTarget: "browser-app-runtime",
    packageStatus: "smoke-runtime-artifact-set",
    solverVersion,
    apiVersions: {
      appBridge: readJsExportedString(
        "src/solver/app/SolverAppBridge.mjs",
        "SOLVER_APP_BRIDGE_API_VERSION"
      ),
      appBridgeClientResolver: readJsExportedString(
        "src/solver/app/SolverAppBridgeClientResolver.mjs",
        "SOLVER_APP_BRIDGE_CLIENT_RESOLVER_VERSION"
      ),
      appAdapters: readJsExportedString(
        "src/solver/app/SolverAppAdapters.mjs",
        "SOLVER_APP_ADAPTERS_VERSION"
      ),
      appWorker: readJsExportedString(
        "src/solver/app/SolverAppWorkerBridge.mjs",
        "SOLVER_APP_WORKER_PROTOCOL_VERSION"
      ),
      workerRuntime: readJsExportedString(
        "src/solver/app/SolverAppWorkerRuntime.mjs",
        "SOLVER_APP_WORKER_RUNTIME_VERSION"
      ),
      contractSchema: contractSchema.$id,
    },
    schemaVersions,
    build: {
      buildRoot: ".tmp/solver-build",
      emCache: formatBuildPath(process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache")),
      wasmBuildType: wasmCache.CMAKE_BUILD_TYPE || null,
      nativeBuildType: nativeCache.CMAKE_BUILD_TYPE || null,
      nativeCxxCompiler: nativeCache.CMAKE_CXX_COMPILER || null,
      boostIncludeDir:
        wasmCache.ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR ||
        nativeCache.ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR ||
        null,
      wasmEnabled: wasmCache.ARCHITRINO_SOLVER_BUILD_WASM === "ON",
    },
    toolchain: createToolchainSummary({ nativeCache, wasmCache }),
    runtimeCapabilities: packageCapabilities,
    packagingPolicy: {
      finalRuntimeArtifactsOnly: true,
      packageObjectFiles: false,
      packageStaticLibraries: false,
      packageCmakeScratch: false,
      intermediateArtifactPatterns: bannedPackagePathPatterns.map((pattern) => pattern.source),
    },
    entrypoints: {
      wasmLoader: ".tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs",
      wasmBinary: ".tmp/solver-build/wasm/architrino_solver_wasm_smoke.wasm",
      appBridgeModule: "src/solver/app/SolverAppBridge.mjs",
      appBridgeClientResolverModule: "src/solver/app/SolverAppBridgeClientResolver.mjs",
      workerBridgeModule: "src/solver/app/SolverAppWorkerBridge.mjs",
      workerRuntimeModule: "src/solver/app/SolverAppWorkerRuntime.mjs",
      appAdaptersModule: "src/solver/app/SolverAppAdapters.mjs",
      contractSchema: "src/contracts/solver-app-bridge/v1/schema.json",
    },
    artifacts,
  };
}

async function readPackageCapabilitySummary() {
  const client = createSolverAppBridgeClient();
  try {
    const capabilities = await client.capabilities();
    return summarizePackageCapabilities(capabilities);
  } finally {
    await client.dispose();
  }
}

function summarizePackageCapabilities(capabilities) {
  return {
    probeRuntime: "build-host-node",
    browserDependentFlags: [
      "storageSupport.supportsOpfs",
      "threadingSupport.browserWorker",
      "appBridge.workerModel.browserWorkerAvailable",
      "appBridge.storageFallbacks.durableBrowserTargetAvailable",
    ],
    enabledPrecisionPaths: capabilities.precisionPaths,
    outputLayouts: capabilities.outputLayouts,
    binaryLayouts: capabilities.binaryLayouts,
    storageSupport: capabilities.storage,
    threadingSupport: capabilities.threading,
    appBridge: {
      schema: capabilities.appBridge.schema,
      denseDataTransport: capabilities.appBridge.denseDataTransport,
      workerModel: capabilities.appBridge.workerModel,
      storageFallbacks: capabilities.appBridge.storageFallbacks,
      appAdapters: capabilities.appBridge.appAdapters.map((adapter) => ({
        appId: adapter.appId,
        runKinds: adapter.runKinds,
      })),
    },
    schemas: {
      appBridgeCapabilities: capabilities.appBridge.schema,
      precisionRouting: capabilities.appBridge.precisionRouting.schema,
      statusTaxonomy: capabilities.appBridge.statusTaxonomy.schema,
      streamQueries: capabilities.appBridge.streamQueries.schema,
      workPackets: capabilities.appBridge.workPackets.schema,
      numericSerialization: capabilities.numericSerialization.schema,
      errorBudgetPropagation: capabilities.errorBudgetPropagation.schema,
      validation: capabilities.validation.schema,
    },
    numericTypes: capabilities.numericSerialization.descriptors.map((descriptor) => ({
      numericType: descriptor.numericType,
      appBufferSafe: descriptor.appBufferSafe,
      authoritativeStorageSafe: descriptor.authoritativeStorageSafe,
    })),
    errorBudgetStages: capabilities.errorBudgetPropagation.stages.map((stage) => stage.stage),
    statusTaxonomy: {
      schema: capabilities.appBridge.statusTaxonomy.schema,
      codeCount: capabilities.appBridge.statusTaxonomy.codes.length,
      severities: capabilities.appBridge.statusTaxonomy.severities,
      categories: uniqueSorted(capabilities.appBridge.statusTaxonomy.codes.map((entry) => entry.category)),
    },
  };
}

function createSchemaVersionSummary(contractSchema, packageCapabilities) {
  return {
    packageManifest: "architrino-solver-package-manifest.v1",
    contractSchema: contractSchema.$id,
    appBridgeCapabilities: packageCapabilities.schemas.appBridgeCapabilities,
    precisionRouting: packageCapabilities.schemas.precisionRouting,
    statusTaxonomy: packageCapabilities.schemas.statusTaxonomy,
    streamQueries: packageCapabilities.schemas.streamQueries,
    workPackets: packageCapabilities.schemas.workPackets,
    numericSerialization: packageCapabilities.schemas.numericSerialization,
    errorBudgetPropagation: packageCapabilities.schemas.errorBudgetPropagation,
    validation: packageCapabilities.schemas.validation,
    binaryLayouts: packageCapabilities.binaryLayouts.schema,
  };
}

function createToolchainSummary({ nativeCache, wasmCache }) {
  const nativeCxxCompiler = nativeCache.CMAKE_CXX_COMPILER || null;
  return {
    generator: nativeCache.CMAKE_GENERATOR || wasmCache.CMAKE_GENERATOR || null,
    makeProgram: nativeCache.CMAKE_MAKE_PROGRAM || wasmCache.CMAKE_MAKE_PROGRAM || null,
    nativeCxxCompiler,
    nativeCxxCompilerAr: nativeCache.CMAKE_CXX_COMPILER_AR || null,
    nativeCxxCompilerRanlib: nativeCache.CMAKE_CXX_COMPILER_RANLIB || null,
    versions: {
      nativeCxxCompiler: nativeCxxCompiler ? readCommandVersion(nativeCxxCompiler, ["--version"]) : null,
      cmake: readCommandVersion(["/opt/homebrew/bin/cmake", "cmake"], ["--version"]),
      ninja: readCommandVersion(["/opt/homebrew/bin/ninja", "ninja"], ["--version"]),
      emcc: readCommandVersion(["/opt/homebrew/bin/emcc", "emcc"], ["--version"]),
      emxx: readCommandVersion(["/opt/homebrew/bin/em++", "em++"], ["--version"]),
      emcmake: readCommandVersion(["/opt/homebrew/bin/emcmake", "emcmake"], ["cmake", "--version"]),
    },
  };
}

function assertPackageCapabilitySummary(packageCapabilities) {
  if (!packageCapabilities.enabledPrecisionPaths.includes("extended_precision")) {
    fail("Package manifest must include enabled precision paths");
  }
  if (!packageCapabilities.outputLayouts.includes("path_segment.v1")) {
    fail("Package manifest must include binary output layouts");
  }
  if (
    !packageCapabilities.binaryLayouts ||
    !packageCapabilities.binaryLayouts.layouts.some(
      (layout) => layout.layout === "path_segment.v1" && layout.rowSizeBytes === 96
    )
  ) {
    fail("Package manifest must include binary layout row sizes");
  }
  if (!packageCapabilities.threadingSupport || !("browserWorker" in packageCapabilities.threadingSupport)) {
    fail("Package manifest must include threading support");
  }
  if (!packageCapabilities.storageSupport || !packageCapabilities.storageSupport.supportsCallerBuffer) {
    fail("Package manifest must include storage support");
  }
  if (packageCapabilities.statusTaxonomy.codeCount < 1) {
    fail("Package manifest must include status taxonomy metadata");
  }
}

function assertRuntimeModuleDependenciesIncluded(artifacts) {
  const artifactPathSet = new Set(artifacts.map((artifact) => artifact.path));
  for (const artifact of artifacts) {
    if (artifact.kind !== "javascript-module") {
      continue;
    }
    const imports = findRelativeRuntimeImports(artifact.path);
    for (const importedPath of imports) {
      if (!artifactPathSet.has(importedPath)) {
        fail(`${artifact.path} imports ${importedPath}, but it is not listed in the package manifest`);
      }
    }
  }
}

function findRelativeRuntimeImports(relPath) {
  const source = fs.readFileSync(path.join(rootDir, relPath), "utf8");
  const imports = [];
  const importPattern = /\b(?:import|export)\s+(?:[^"'()]*?\s+from\s+)?["'](\.[^"']+)["']/gu;
  for (const match of source.matchAll(importPattern)) {
    const resolved = normalizeRelPath(path.join(path.dirname(relPath), match[1]));
    if (resolved.startsWith("src/solver/app/") && resolved.endsWith(".mjs")) {
      imports.push(resolved);
    }
  }
  return imports;
}

function assertPackagePathAllowed(relPath) {
  for (const pattern of bannedPackagePathPatterns) {
    if (pattern.test(relPath)) {
      fail(`Intermediate build artifact cannot be packaged: ${relPath}`);
    }
  }
}

function readCmakeCache(cachePath) {
  if (!fs.existsSync(cachePath)) {
    return {};
  }
  const values = {};
  const text = fs.readFileSync(cachePath, "utf8");
  for (const line of text.split(/\r?\n/u)) {
    const match = line.match(/^([^:#=]+):[^=]*=(.*)$/u);
    if (match) {
      values[match[1]] = match[2];
    }
  }
  return values;
}

function readJsExportedString(relPath, exportName) {
  const source = fs.readFileSync(path.join(rootDir, relPath), "utf8");
  const pattern = new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*"([^"]+)"`, "u");
  const match = source.match(pattern);
  if (!match) {
    fail(`Unable to read exported string ${exportName} from ${relPath}`);
  }
  return match[1];
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relPath), "utf8"));
}

function readCommandVersion(commands, commandArgs) {
  const candidates = Array.isArray(commands) ? commands : [commands];
  for (const command of candidates) {
    const result = spawnSync(command, commandArgs, {
      cwd: rootDir,
      encoding: "utf8",
      env: {
        ...process.env,
        EM_CACHE: process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache"),
      },
    });
    if (result.error || result.status !== 0) {
      continue;
    }
    const output = `${result.stdout || ""}\n${result.stderr || ""}`;
    const firstLine = output
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .find(Boolean);
    if (firstLine) {
      return firstLine;
    }
  }
  return null;
}

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function normalizeRelPath(relPath) {
  return relPath.split(path.sep).join("/");
}

function formatBuildPath(filePath) {
  const resolvedPath = path.resolve(rootDir, filePath);
  const relPath = path.relative(rootDir, resolvedPath);
  if (relPath && !relPath.startsWith("..") && !path.isAbsolute(relPath)) {
    return normalizeRelPath(relPath);
  }
  return filePath;
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort();
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-solver-package-manifest.mjs [--write|--check|--print]");
  console.log("  Writes or checks the app-runtime solver package manifest under .tmp/solver-build/.");
  process.exit(exitCode);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

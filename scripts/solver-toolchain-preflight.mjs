#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const wantsJson = args.has("--json");
const wantsHelp = args.has("--help");
const unknownArgs = [...args].filter((arg) => !["--json", "--help"].includes(arg));

if (wantsHelp) {
  printUsage(0);
}
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}

const rootDir = process.cwd();
const defaultEmCache = path.join(rootDir, ".tmp", "solver-emcache");
const emCache = process.env.EM_CACHE || defaultEmCache;
fs.mkdirSync(emCache, { recursive: true });

const checks = [
  createToolCheck("clang++", {
    envName: "ARCHITRINO_SOLVER_CXX",
    preferred: ["/opt/homebrew/opt/llvm/bin/clang++", "/usr/bin/clang++"],
    versionArgs: ["--version"],
  }),
  createToolCheck("cmake", {
    preferred: ["/opt/homebrew/bin/cmake"],
    versionArgs: ["--version"],
  }),
  createToolCheck("ninja", {
    preferred: ["/opt/homebrew/bin/ninja"],
    versionArgs: ["--version"],
  }),
  createToolCheck("emcc", {
    preferred: ["/opt/homebrew/bin/emcc"],
    versionArgs: ["--version"],
    env: { EM_CACHE: emCache },
  }),
  createToolCheck("em++", {
    preferred: ["/opt/homebrew/bin/em++"],
    versionArgs: ["--version"],
    env: { EM_CACHE: emCache },
  }),
  createToolCheck("emcmake", {
    preferred: ["/opt/homebrew/bin/emcmake"],
    versionArgs: ["cmake", "--version"],
    env: { EM_CACHE: emCache },
  }),
];

const packages = [
  createBrewPackageCheck("boost"),
  createBrewPackageCheck("gmp"),
  createBrewPackageCheck("mpfr"),
  createBrewPackageCheck("libomp"),
  createBrewPackageCheck("llvm"),
  createBrewPackageCheck("emscripten"),
];

const summary = {
  ok: checks.every((check) => check.ok) && packages.every((pkg) => pkg.ok),
  rootDir,
  emCache,
  emCacheSource: process.env.EM_CACHE ? "environment" : "repo-default",
  tools: checks,
  packages,
};

if (wantsJson) {
  console.log(`${JSON.stringify(summary, null, 2)}\n`);
} else {
  printHumanSummary(summary);
}

process.exit(summary.ok ? 0 : 1);

function printUsage(exitCode) {
  console.log("Usage: node scripts/solver-toolchain-preflight.mjs [--json]");
  console.log("  Verifies the local C++/WebAssembly solver toolchain and writable EM_CACHE.");
  process.exit(exitCode);
}

function createToolCheck(name, options = {}) {
  const envPath = options.envName ? process.env[options.envName] : null;
  const candidates = [envPath, ...(options.preferred || []), name].filter(Boolean);
  const resolvedPath = resolveExecutable(candidates);
  if (!resolvedPath) {
    return {
      kind: "tool",
      name,
      ok: false,
      path: null,
      version: null,
      error: `Unable to resolve ${name}`,
    };
  }

  const version = runVersion(resolvedPath, options.versionArgs || ["--version"], options.env);
  return {
    kind: "tool",
    name,
    ok: version.ok,
    path: resolvedPath,
    version: version.output,
    error: version.ok ? null : version.error,
  };
}

function createBrewPackageCheck(name) {
  const prefix = run("brew", ["--prefix", name]);
  const version = run("brew", ["list", "--versions", name]);
  return {
    kind: "brew-package",
    name,
    ok: prefix.status === 0 && version.status === 0,
    prefix: prefix.status === 0 ? prefix.stdout.trim() : null,
    version: version.status === 0 ? version.stdout.trim() : null,
    error: prefix.status === 0 && version.status === 0 ? null : `Homebrew package ${name} not found`,
  };
}

function resolveExecutable(candidates) {
  for (const candidate of candidates) {
    if (candidate.includes("/")) {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
      continue;
    }
    const resolved = run("command", ["-v", candidate], { shell: true });
    if (resolved.status === 0 && resolved.stdout.trim()) {
      return resolved.stdout.trim();
    }
  }
  return null;
}

function runVersion(command, args, extraEnv = {}) {
  const result = run(command, args, {
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
  if (result.status !== 0) {
    return {
      ok: false,
      output: null,
      error: (result.stderr || result.stdout || `exit ${result.status}`).trim(),
    };
  }
  return {
    ok: true,
    output: firstUsefulLine(result.stdout),
    error: null,
  };
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    encoding: "utf8",
    ...options,
  });
  return {
    status: result.status ?? 1,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

function firstUsefulLine(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean) || "";
}

function printHumanSummary(result) {
  console.log("architrino solver toolchain preflight");
  console.log(`root: ${result.rootDir}`);
  console.log(`EM_CACHE: ${result.emCache} (${result.emCacheSource})`);
  console.log("");
  console.log("tools:");
  result.tools.forEach((tool) => {
    console.log(`- ${tool.name}: ${tool.ok ? "ok" : "missing"}${tool.path ? ` at ${tool.path}` : ""}`);
    if (tool.version) {
      console.log(`  ${tool.version}`);
    }
    if (tool.error) {
      console.log(`  error: ${tool.error}`);
    }
  });
  console.log("");
  console.log("packages:");
  result.packages.forEach((pkg) => {
    console.log(`- ${pkg.name}: ${pkg.ok ? pkg.version : "missing"}${pkg.prefix ? ` at ${pkg.prefix}` : ""}`);
  });
  console.log("");
  console.log(`summary: ${result.ok ? "ok" : "failed"}`);
}

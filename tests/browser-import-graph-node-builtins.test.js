import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Browser-served entry modules must never reach a `node:` builtin (or bare
// package) import anywhere in their static import graph. Node-based unit tests
// cannot catch this class of regression: `node:crypto` resolves fine under the
// test runner but hard-fails module loading in the browser, leaving the app
// with a blank canvas. This exact failure shipped when the
// prescribed-path-analysis barrel (index.mjs) grew campaign/database exports
// that import node:crypto and the Lorentz Geometry and Photon runtimes
// imported the barrel.

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BROWSER_ENTRY_MODULES = [
  "src/apps/borg/main.js",
  "src/apps/borg/library/main.js",
  "src/apps/braid-search/main.js",
  "src/apps/ideal-braid/main.js",
  "src/apps/photon/main.js",
];

const IMPORT_SPECIFIER_PATTERN =
  /(?:^|\n)\s*(?:import|export)\s[^;]*?from\s*["']([^"']+)["']|(?:^|\n)\s*import\s*["']([^"']+)["']/g;

function collectStaticImportSpecifiers(source) {
  const specifiers = [];
  for (const match of source.matchAll(IMPORT_SPECIFIER_PATTERN)) {
    const specifier = match[1] ?? match[2];
    if (specifier) {
      specifiers.push(specifier);
    }
  }
  return specifiers;
}

function walkBrowserImportGraph(entryRelativePath) {
  const visited = new Set();
  const violations = [];
  const stack = [path.resolve(repoRoot, entryRelativePath)];
  while (stack.length > 0) {
    const modulePath = stack.pop();
    if (visited.has(modulePath)) {
      continue;
    }
    visited.add(modulePath);
    const source = readFileSync(modulePath, "utf8");
    for (const specifier of collectStaticImportSpecifiers(source)) {
      if (specifier.startsWith("node:")) {
        violations.push({
          module: path.relative(repoRoot, modulePath),
          specifier,
        });
        continue;
      }
      if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
        violations.push({
          module: path.relative(repoRoot, modulePath),
          specifier: `bare specifier ${specifier}`,
        });
        continue;
      }
      const resolved = path.resolve(path.dirname(modulePath), specifier);
      if (existsSync(resolved)) {
        stack.push(resolved);
      }
    }
  }
  return { visited, violations };
}

for (const entry of BROWSER_ENTRY_MODULES) {
  test(`browser entry ${entry} import graph stays free of node builtins and bare specifiers`, () => {
    const { visited, violations } = walkBrowserImportGraph(entry);
    assert.ok(visited.size > 1, `expected ${entry} to have a resolvable import graph`);
    assert.deepEqual(
      violations,
      [],
      `browser-unsafe imports reached from ${entry}:\n${violations
        .map((v) => `  ${v.module} -> ${v.specifier}`)
        .join("\n")}`
    );
  });
}

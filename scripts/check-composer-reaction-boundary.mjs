#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

function normalizeRelativePath(value) {
  return toPosixPath(value).replace(/\/+/g, "/").replace(/\/$/, "");
}

function collectFiles(rootDir, relativeDir) {
  const absoluteDir = path.join(rootDir, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const files = [];
  const stack = [absoluteDir];
  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      if (!/\.(?:[cm]?js|json)$/iu.test(entry.name)) {
        continue;
      }
      files.push(absolutePath);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function collectSpecifierMatches(sourceText) {
  const matches = [];
  const staticPattern = /\b(?:import|export)\b[\s\S]*?\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']/gmu;
  const dynamicPattern = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/gmu;

  for (const match of sourceText.matchAll(staticPattern)) {
    const specifier = match[1] ?? match[2];
    if (specifier) {
      matches.push(specifier);
    }
  }
  for (const match of sourceText.matchAll(dynamicPattern)) {
    const specifier = match[1];
    if (specifier) {
      matches.push(specifier);
    }
  }
  return matches;
}

function resolveImportTarget(filePath, specifier) {
  if (!specifier.startsWith(".")) {
    return null;
  }
  const resolvedPath = path.resolve(path.dirname(filePath), specifier);
  return resolvedPath;
}

function isInsideDir(filePath, directoryPath) {
  const relative = path.relative(directoryPath, filePath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export function findComposerReactionBoundaryViolations(options = {}) {
  const rootDir = path.resolve(options.rootDir ?? process.cwd());
  const composerDir = normalizeRelativePath(options.composerDir ?? "src/apps/composer");
  const reactionDir = normalizeRelativePath(options.reactionDir ?? "src/apps/reaction");
  const composerRoot = path.join(rootDir, composerDir);
  const reactionRoot = path.join(rootDir, reactionDir);
  const files = [
    ...collectFiles(rootDir, composerDir),
    ...collectFiles(rootDir, reactionDir),
  ];

  const violations = [];

  for (const filePath of files) {
    const sourceText = fs.readFileSync(filePath, "utf8");
    const specifiers = collectSpecifierMatches(sourceText);
    const sourceRole = isInsideDir(filePath, composerRoot)
      ? "composer"
      : isInsideDir(filePath, reactionRoot)
        ? "reaction"
        : null;

    if (!sourceRole) {
      continue;
    }

    for (const specifier of specifiers) {
      const targetPath = resolveImportTarget(filePath, specifier);
      if (!targetPath) {
        continue;
      }

      const targetRole = isInsideDir(targetPath, composerRoot)
        ? "composer"
        : isInsideDir(targetPath, reactionRoot)
          ? "reaction"
          : null;

      if (!targetRole || targetRole === sourceRole) {
        continue;
      }

      violations.push({
        file: normalizeRelativePath(path.relative(rootDir, filePath)),
        specifier,
        target: normalizeRelativePath(path.relative(rootDir, targetPath)),
        sourceRole,
        targetRole,
      });
    }
  }

  return {
    rootDir,
    composerDir,
    reactionDir,
    filesScanned: files.length,
    violations,
  };
}

function printResult(result) {
  if (result.violations.length === 0) {
    console.log(
      `composer/reaction boundary check passed (${result.filesScanned} files scanned across ${result.composerDir} and ${result.reactionDir})`
    );
    return;
  }

  console.error("composer/reaction boundary check failed:");
  for (const violation of result.violations) {
    console.error(
      `- ${violation.file} imports ${violation.specifier} -> ${violation.target} (${violation.sourceRole} -> ${violation.targetRole})`
    );
  }
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const result = findComposerReactionBoundaryViolations();
  printResult(result);
  if (result.violations.length > 0) {
    process.exit(1);
  }
}

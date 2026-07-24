#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT_DIR = path.resolve(
  fileURLToPath(new URL("..", import.meta.url)),
);

function argumentValue(name) {
  const prefix = `${name}=`;
  const argument = process.argv.slice(2).find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : null;
}

const ROOT_DIR = path.resolve(argumentValue("--root") ?? DEFAULT_ROOT_DIR);
const VALIDATION_DIR = path.resolve(
  argumentValue("--markdown-root") ??
    path.join(ROOT_DIR, "content/markdown/aaa/validation/simulations"),
);
const SCRIPT_REFERENCE =
  /\bscripts\/[A-Za-z0-9._/-]+\.(?:mjs|js|json|py)\b/g;
const NOT_IMPLEMENTED_MARKER =
  /\*\*Implementation status:\*\*\s*not implemented/i;

function markdownFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return markdownFiles(absolutePath);
      }
      return entry.isFile() && entry.name.endsWith(".md")
        ? [absolutePath]
        : [];
    });
}

function lineNumberAt(text, offset) {
  return text.slice(0, offset).split("\n").length;
}

function isDeclaredPlannedPath(lines, lineNumber) {
  const zeroBasedLine = lineNumber - 1;
  const nearbyStart = Math.max(0, zeroBasedLine - 12);
  return lines
    .slice(nearbyStart, zeroBasedLine + 1)
    .some((line) => NOT_IMPLEMENTED_MARKER.test(line));
}

const failures = [];
const plannedMissing = [];
let referenceCount = 0;

for (const markdownPath of markdownFiles(VALIDATION_DIR)) {
  const text = fs.readFileSync(markdownPath, "utf8");
  const lines = text.split("\n");
  for (const match of text.matchAll(SCRIPT_REFERENCE)) {
    referenceCount += 1;
    const referencedPath = match[0];
    const absoluteTarget = path.join(ROOT_DIR, referencedPath);
    if (fs.existsSync(absoluteTarget)) {
      continue;
    }

    const line = lineNumberAt(text, match.index);
    const record = {
      markdownPath: path.relative(ROOT_DIR, markdownPath),
      line,
      referencedPath,
    };
    if (isDeclaredPlannedPath(lines, line)) {
      plannedMissing.push(record);
    } else {
      failures.push(record);
    }
  }
}

for (const record of plannedMissing) {
  console.log(
    `[validation-script-paths] planned missing: ${record.markdownPath}:${record.line} -> ${record.referencedPath}`,
  );
}

if (failures.length > 0) {
  for (const record of failures) {
    console.error(
      `[validation-script-paths] missing: ${record.markdownPath}:${record.line} -> ${record.referencedPath}`,
    );
  }
  console.error(
    `[validation-script-paths] failed: ${failures.length} undeclared missing script path(s)`,
  );
  process.exit(1);
}

console.log(
  `[validation-script-paths] passed: ${referenceCount} reference(s), ${plannedMissing.length} explicitly planned missing path(s)`,
);

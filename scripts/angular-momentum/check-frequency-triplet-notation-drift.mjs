#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const recursiveTargets = [
  {
    label: "AAA authored markdown",
    relativePath: "content/markdown/aaa",
    extensions: new Set([".md"]),
    patterns: createCanonicalSurfacePatterns(),
  },
  {
    label: "priority markdown",
    relativePath: "reference/priorities",
    extensions: new Set([".md"]),
    patterns: createCanonicalSurfacePatterns(),
  },
  {
    label: "generated iOS textbook package",
    relativePath: "apps/ios/ArchitrinoReader/GeneratedTextbookPackage",
    extensions: new Set([".html", ".json", ".md"]),
    patterns: createCanonicalSurfacePatterns(),
  },
];

const fileTargets = [
  {
    label: "tri-binary offset family runner",
    relativePath: "scripts/angular-momentum/tri-binary-offset-family-runner.mjs",
    patterns: [
      ...createCanonicalSurfacePatterns(),
      ...createIdentifierPatterns([
        ["legacy", "Order"],
        ["legacy", "Label"],
        ["legacy", "Values"],
        ["family", "Legacy", "Relation"],
        ["legacy", "Relation"],
      ]),
    ],
  },
];

const findings = [];
let filesScanned = 0;

for (const target of recursiveTargets) {
  const files = collectFiles(target.relativePath, target.extensions);
  for (const relativePath of files) {
    filesScanned += 1;
    scanFile(relativePath, target.patterns, target.label);
  }
}

for (const target of fileTargets) {
  if (!fs.existsSync(path.join(rootDir, target.relativePath))) {
    findings.push({
      relativePath: target.relativePath,
      label: target.label,
      patternLabel: "missing notation audit target",
      lineNumber: 1,
      excerpt: "required file is missing",
    });
    continue;
  }
  filesScanned += 1;
  scanFile(target.relativePath, target.patterns, target.label);
}

if (findings.length) {
  console.error("[frequency-triplet-notation] legacy notation drift detected:");
  for (const finding of findings) {
    console.error(
      `- ${finding.relativePath}:${finding.lineNumber}: ${finding.patternLabel} in ${finding.label}: ${finding.excerpt}`
    );
  }
  process.exit(1);
}

console.log(
  `[frequency-triplet-notation] scanned ${filesScanned} files; canonical I:M:O notation is clean`
);

function createCanonicalSurfacePatterns() {
  return [
    {
      label: "legacy triplet order label",
      pattern: /\bO\s*:\s*M\s*:\s*I\b/g,
    },
    {
      label: "legacy triplet tuple label",
      pattern: /\(\s*O\s*,\s*M\s*,\s*I\s*\)/g,
    },
    {
      label: "ambiguous bare IMO frequency label",
      pattern: /\bIMO\s*=\s*\(/g,
    },
    {
      label: "unlabeled outer-normalized middle-hinge tuple",
      pattern: /\(\s*f\s*-\s*1\s*,\s*f\s*,\s*f\s*\+\s*2\s*\)/g,
    },
    {
      label: "unlabeled outer-normalized symmetric-control tuple",
      pattern: /\(\s*f\s*-\s*1\s*,\s*f\s*,\s*f\s*\+\s*1\s*\)/g,
    },
  ];
}

function createIdentifierPatterns(partsList) {
  return partsList.map((parts) => ({
    label: "legacy runner identifier",
    pattern: new RegExp(`\\b${escapeRegExp(parts.join(""))}\\b`, "g"),
  }));
}

function collectFiles(relativeDir, extensions) {
  const absoluteDir = path.join(rootDir, relativeDir);
  if (!fs.existsSync(absoluteDir)) {
    return [];
  }

  const result = [];
  const stack = [absoluteDir];
  while (stack.length) {
    const currentDir = stack.pop();
    const entries = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const absolutePath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolutePath);
        continue;
      }
      if (!entry.isFile() || !extensions.has(path.extname(entry.name))) {
        continue;
      }
      result.push(toPosixPath(path.relative(rootDir, absolutePath)));
    }
  }

  return result.sort((left, right) => left.localeCompare(right));
}

function scanFile(relativePath, patterns, label) {
  const absolutePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const lines = source.split(/\r?\n/);

  for (const [lineIndex, line] of lines.entries()) {
    for (const patternConfig of patterns) {
      patternConfig.pattern.lastIndex = 0;
      if (!patternConfig.pattern.test(line)) {
        continue;
      }
      findings.push({
        relativePath,
        label,
        patternLabel: patternConfig.label,
        lineNumber: lineIndex + 1,
        excerpt: line.trim(),
      });
    }
  }
}

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

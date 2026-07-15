#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const recursiveTargets = [
  {
    label: "AAA authored markdown",
    relativePath: "content/markdown/aaa",
    extensions: new Set([".md"]),
  },
  {
    label: "priority markdown",
    relativePath: "reference/priorities",
    extensions: new Set([".md"]),
  },
];

const findings = [];
let filesScanned = 0;

const directPatterns = [
  {
    label: "legacy Positrino/Electrino slash shorthand",
    pattern: /\b[PE]\s*\/\s*[PE]\b/g,
  },
  {
    label: "legacy single-letter polarity transition",
    pattern: /\b[EP]\s*(?:→|->)\s*[EP]\b/g,
  },
  {
    label: "legacy polarity-indexed charge variable",
    pattern: /\bq_(?:[PE]|\{[PE]\})\b/g,
  },
  {
    label: "legacy P-axis class shorthand",
    pattern: /P\^\+|P\^-|P\^\{m\}/g,
  },
  {
    label: "legacy polarity-type prose shorthand",
    pattern: /\b[EP]-(?:type|dominant)\b/g,
  },
  {
    label: "legacy paired polarity inventory",
    pattern: /\b\d+\s*P\s*[,/]\s*\d+\s*E\b|\b\d+\s*E\s*[,/]\s*\d+\s*P\b/g,
  },
  {
    label: "legacy numeric polarity transition",
    pattern: /\b\d+\s*[PE]\s*(?:→|↔|->|<->|\\to|\\leftrightarrow)\s*\d+\s*[PE]\b/g,
  },
  {
    label: "deprecated pro/anti photon or near-photon pair label",
    pattern:
      /\b(?:coaxial contra-rotating|near-photon|near-planar|planarized)\s+pro\/anti\b|\bpro\/anti\s+(?:planar|braid[- ]pair)\b/gi,
  },
  {
    label: "deprecated pro-braid or anti-braid conjugation shorthand",
    pattern: /\b(?:pro|anti)-braid\b/gi,
    scope: "AAA authored markdown",
    excludePaths: new Set([
      "content/markdown/aaa/archie/comparative-glossary.md",
      "content/markdown/aaa/archie/terminology-usage.md",
    ]),
  },
];

const compactCountPattern = /\b\d+[PE]\b/g;
const compactCountContextPattern =
  /\b(?:A_\{\\Sigma\}|A_\{\\mathrm\{sh\}\}|active inventory|active axial layer|axial inventory|axial pattern|Composition|Constituent inventory table|Gen|Generation|payload|polarity inventory|released|Route|weak-active|weak-coupling-triad)\b/i;

for (const target of recursiveTargets) {
  const files = collectFiles(target.relativePath, target.extensions);
  for (const relativePath of files) {
    filesScanned += 1;
    scanFile(relativePath, target.label);
  }
}

if (findings.length) {
  console.error("[polarity-notation] legacy polarity notation drift detected:");
  for (const finding of findings) {
    console.error(
      `- ${finding.relativePath}:${finding.lineNumber}: ${finding.patternLabel} in ${finding.label}: ${finding.excerpt}`
    );
  }
  console.error(
    "[polarity-notation] Use epsilon polarity inventories such as $5\\epsilon_+ + 1\\epsilon_-$ or $A_{\\Sigma}=3\\epsilon_-$."
  );
  process.exit(1);
}

console.log(
  `[polarity-notation] scanned ${filesScanned} files; polarity inventory and braid-conjugation terminology are clean`
);

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

function scanFile(relativePath, label) {
  const absolutePath = path.join(rootDir, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const lines = source.split(/\r?\n/);
  let inFence = false;

  for (const [lineIndex, rawLine] of lines.entries()) {
    if (/^\s*(```|~~~)/.test(rawLine)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }

    const line = stripInlineCode(rawLine);
    if (!line.trim()) {
      continue;
    }

    for (const patternConfig of directPatterns) {
      if (patternConfig.scope && patternConfig.scope !== label) {
        continue;
      }
      if (patternConfig.excludePaths?.has(relativePath)) {
        continue;
      }
      patternConfig.pattern.lastIndex = 0;
      if (!patternConfig.pattern.test(line)) {
        continue;
      }
      findings.push({
        relativePath,
        label,
        patternLabel: patternConfig.label,
        lineNumber: lineIndex + 1,
        excerpt: rawLine.trim(),
      });
    }

    compactCountPattern.lastIndex = 0;
    if (compactCountContextPattern.test(line) && compactCountPattern.test(line)) {
      findings.push({
        relativePath,
        label,
        patternLabel: "legacy compact polarity count in inventory context",
        lineNumber: lineIndex + 1,
        excerpt: rawLine.trim(),
      });
    }
  }
}

function stripInlineCode(value) {
  return value.replace(/`[^`]*`/g, "");
}

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

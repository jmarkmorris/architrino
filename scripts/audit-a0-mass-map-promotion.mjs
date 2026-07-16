#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOTS = ["content/markdown/aaa", "reference/priorities/braid-archive/braid-mass-response-map"];
const MARKDOWN_EXTENSIONS = new Set([".md"]);
const rootDir = process.cwd();
const args = process.argv.slice(2);
const wantsHelp = args.includes("--help") || args.includes("-h");
const strict = args.includes("--strict");
const targetArgs = args.filter((arg) => !arg.startsWith("-"));

if (wantsHelp) {
  console.log("Usage: node scripts/audit-a0-mass-map-promotion.mjs [--strict] [path ...]");
  console.log(
    "Scans AAA and mass-map priority markdown for premature promotion of A0 mass-map outputs before the Tier gates pass."
  );
  process.exit(0);
}

const roots = targetArgs.length ? targetArgs : DEFAULT_ROOTS;

const outputPatterns = [
  {
    id: "a0-shielding-promoted",
    pattern: /\\zeta\(A_0\)|zeta\(A_0\)|shielding coefficient for \$A_0\$/i,
  },
  {
    id: "a0-energy-promoted",
    pattern: /E_\{\\text\{internal\}\}\(A_0\)|internal energy ledger for \$A_0\$/i,
  },
  {
    id: "a0-response-promoted",
    pattern: /\\mathcal\{M\}_\{\\text\{sea\}\}\^\{ab\}|medium-response tensor for \$A_0\$/i,
  },
];

const promotionPattern =
  /\b(?:is|are|was|were|has been|have been|now)\s+(?:accepted|validated|closed|proved|derived|computed|extracted|established|known)\b|\b(?:accepted|validated|closed|proved)\s+(?:A_0|\$A_0\$|branch|attractor|mass-map)\b/i;
const guardPattern =
  /\b(not|until|only after|after Tier|begins only after|passes only if|computed from the accepted branch without|must|target|protocol|gate|open|closure target|required outputs|fails if|not an|not yet|before any|pending|roadmap|placeholder|diagnostic|scaffold|may seed)\b/i;

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "");
}

function shouldInclude(relativePath) {
  return MARKDOWN_EXTENSIONS.has(path.extname(relativePath));
}

function walkFiles(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) {
    return shouldInclude(relativePath) ? [normalizePath(relativePath)] : [];
  }
  if (!stat.isDirectory()) {
    return [];
  }
  const result = [];
  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  for (const entry of entries) {
    const child = normalizePath(path.join(relativePath, entry.name));
    if (entry.isDirectory()) {
      result.push(...walkFiles(child));
    } else if (entry.isFile() && shouldInclude(child)) {
      result.push(child);
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function contextFor(lines, index, radius = 2) {
  const start = Math.max(0, index - radius);
  const end = Math.min(lines.length, index + radius + 1);
  return lines.slice(start, end).join("\n");
}

const findings = [];

for (const root of roots) {
  for (const filePath of walkFiles(normalizePath(root))) {
    const absolutePath = path.join(rootDir, filePath);
    const lines = fs.readFileSync(absolutePath, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const outputPattern of outputPatterns) {
        if (!outputPattern.pattern.test(line)) {
          continue;
        }
        const context = contextFor(lines, index);
        if (!promotionPattern.test(context) || guardPattern.test(context)) {
          continue;
        }
        findings.push({
          rule: outputPattern.id,
          file: filePath,
          line: index + 1,
          text: line.trim(),
        });
      }
    });
  }
}

if (!findings.length) {
  console.log("A0 mass-map promotion audit passed: no premature promotion patterns found.");
  process.exit(0);
}

console.log(`A0 mass-map promotion audit found ${findings.length} issue(s):`);
for (const finding of findings) {
  console.log(`- ${finding.file}:${finding.line} [${finding.rule}] ${finding.text}`);
}

process.exit(strict ? 1 : 0);

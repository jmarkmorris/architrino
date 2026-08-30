#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(
    "Usage: node scripts/check-reader-facing-publication-boundary.mjs [path ...]"
  );
  console.log(
    "Checks authored reader-facing Markdown text for raw content digests and unmistakable internal workflow scaffolding; URLs and link targets are permitted."
  );
  process.exit(0);
}

const targetArgs = args.filter((arg) => !arg.startsWith("-"));
const targets = targetArgs.length
  ? targetArgs.map((target) => path.resolve(process.cwd(), target))
  : [path.join(REPO_ROOT, "content/markdown/aaa")];

const RULES = [
  {
    id: "raw-content-digest",
    pattern: /\b[0-9a-f]{64}\b/iu,
    message:
      "Raw content hashes belong in validation or data-availability records, not ordinary corpus prose.",
  },
  {
    id: "internal-closure-prompt",
    pattern: /^\s*Closure goal:\s*/iu,
    message: "Operator prompts must not be published as textbook prose.",
  },
  {
    id: "internal-document-status",
    pattern: /^\s*#{1,6}\s+Document Status\s*$/iu,
    message: "Priority status scaffolding must be kept separate from the publication-ready document before promotion.",
  },
  {
    id: "internal-outstanding-work",
    pattern: /^\s*#{1,6}\s+Outstanding Work\s*$/iu,
    message: "Priority work queues must remain outside reader-facing corpus prose.",
  },
  {
    id: "internal-operator-deferral",
    pattern: /^\s*#{1,6}\s+Deferred by operator decision\b/iu,
    message: "Operator decisions belong in priority or audit records, not textbook prose.",
  },
];

function markdownFiles(target) {
  if (!fs.existsSync(target)) {
    throw new Error(`publication-boundary target does not exist: ${target}`);
  }
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    return path.extname(target) === ".md" ? [target] : [];
  }
  if (!stat.isDirectory()) {
    return [];
  }
  const files = [];
  for (const entry of fs.readdirSync(target, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...markdownFiles(child));
    } else if (entry.isFile() && path.extname(entry.name) === ".md") {
      files.push(child);
    }
  }
  return files;
}

function displayPath(file) {
  const relative = path.relative(REPO_ROOT, file);
  return relative && !relative.startsWith("..") ? relative : file;
}

function textOutsideUrls(line) {
  return line
    .replace(/\]\(\s*(?:<[^>]+>|[^\s)]+)/gu, "](")
    .replace(/\]\[[^\]]*\]/gu, "]")
    .replace(/^\s{0,3}\[[^\]]+\]:\s*(?:<[^>]+>|\S+)/gu, "")
    .replace(/\b(?:href|src|id|name)\s*=\s*(?:"[^"]*"|'[^']*')/giu, "")
    .replace(/\b(?:https?|ftp):\/\/[^\s<>]+/giu, "");
}

const files = [...new Set(targets.flatMap(markdownFiles))].sort((a, b) =>
  a.localeCompare(b)
);
const findings = [];

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/u);
  for (const [index, line] of lines.entries()) {
    for (const rule of RULES) {
      const text = rule.id === "raw-content-digest" ? textOutsideUrls(line) : line;
      if (rule.pattern.test(text)) {
        findings.push({ file, line: index + 1, rule });
      }
    }
  }
}

if (findings.length) {
  console.error(
    `Reader-facing publication boundary: ${findings.length} violation(s) across ${files.length} Markdown files.`
  );
  for (const finding of findings) {
    console.error(
      `${displayPath(finding.file)}:${finding.line} [${finding.rule.id}] ${finding.rule.message}`
    );
  }
  process.exit(1);
}

console.log(
  `Reader-facing publication boundary: passed across ${files.length} Markdown files.`
);

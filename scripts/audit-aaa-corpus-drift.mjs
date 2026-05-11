#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOTS = ["content/markdown/aaa"];
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const includeArchie = args.includes("--include-archie");
const wantsHelp = args.includes("--help") || args.includes("-h");
const targetArgs = args.filter((arg) => !arg.startsWith("-"));
const rootDir = process.cwd();

if (wantsHelp) {
  console.log("Usage: node scripts/audit-aaa-corpus-drift.mjs [--strict] [--include-archie] [path ...]");
  console.log("Scans AAA markdown for recurring terminology drift and closure-overclaim patterns.");
  process.exit(0);
}

const rules = [
  {
    id: "substrate-field-wake-drift",
    description: "Substrate-level field wording that usually wants wake/causal-wake language.",
    pattern:
      /\b(field structures|field dynamics|external fields|emitted field|experienced field|emitter field|wake field|field shell|field front)\b/i,
    suggestion: "Use wake, causal wake, wake structure, or effective field after naming the level.",
  },
  {
    id: "quantum-bridge-overclaim",
    description: "Quantum bridge language that often states an open closure target as a finished result.",
    pattern:
      /\b(guaranteeing|must scale strictly|absolute upper bound|will exhibit|all standard quantum)\b/i,
    pathPattern: /\/theory-bridges\//,
    suggestion: "State as a closure target, candidate signature, or conditional result unless a derivation is local.",
  },
  {
    id: "planck-speed-closure",
    description: "Planck-alignment speed wording that may conflate component speed and combined forward speed.",
    pattern:
      /v_\{text\{eff\}\}.*\\to c_f|combined forward-sector effective speed approaches|v_eff.*to c_f/i,
    suggestion: "Separate component-speed saturation from the combined-speed Mach-wedge condition.",
  },
  {
    id: "noether-sea-hyphen-standalone",
    description: "Noether-Sea should be hyphenated only before a following noun.",
    pattern: /Noether-Sea(?=\s*($|[.,;:)\]}]))/,
    suggestion: "Use Noether Sea as the standalone noun; reserve Noether-Sea for compound modifiers.",
  },
];

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "");
}

function shouldSkip(relativePath) {
  if (includeArchie) {
    return false;
  }
  return relativePath.startsWith("content/markdown/aaa/archie/");
}

function walkMarkdown(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) {
    return relativePath.endsWith(".md") && !shouldSkip(relativePath) ? [relativePath] : [];
  }
  if (!stat.isDirectory()) {
    return [];
  }
  const result = [];
  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }
    const child = normalizePath(path.join(relativePath, entry.name));
    if (entry.isDirectory()) {
      result.push(...walkMarkdown(child));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md") && !shouldSkip(child)) {
      result.push(child);
    }
  }
  return result;
}

const roots = targetArgs.length ? targetArgs.map(normalizePath) : DEFAULT_ROOTS;
const files = [...new Set(roots.flatMap(walkMarkdown))].sort((a, b) => a.localeCompare(b));
const findings = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(rootDir, file), "utf8");
  const lines = text.split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    for (const rule of rules) {
      if (rule.pathPattern && !rule.pathPattern.test(`/${file}`)) {
        continue;
      }
      if (!rule.pattern.test(line)) {
        continue;
      }
      findings.push({
        file,
        line: index + 1,
        rule: rule.id,
        description: rule.description,
        suggestion: rule.suggestion,
        text: line.trim(),
      });
    }
  }
}

if (!findings.length) {
  console.log(`AAA corpus drift audit: no findings across ${files.length} markdown files.`);
  process.exit(0);
}

console.log(`AAA corpus drift audit: ${findings.length} finding(s) across ${files.length} markdown files.`);
for (const finding of findings) {
  console.log("");
  console.log(`${finding.file}:${finding.line} [${finding.rule}]`);
  console.log(`  ${finding.description}`);
  console.log(`  ${finding.text}`);
  console.log(`  Suggestion: ${finding.suggestion}`);
}

process.exit(strict ? 1 : 0);

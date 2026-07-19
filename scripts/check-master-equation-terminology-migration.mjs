#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

// These are current reader/explanatory surfaces. Historical priority records,
// frozen evidence, generated artifacts, and machine-contract identifiers are
// deliberately outside this audit and are dispositioned separately.
const SCAN_TARGETS = [
  "content/markdown/aaa",
  "reference/archie",
  "content/scenes",
  "src/apps/equation-mapping/EquationMappingData.js",
  "src/eom/README.md",
];

const TEXT_EXTENSIONS = new Set([".js", ".json", ".md", ".mjs", ".txt"]);

const FORBIDDEN_PATTERNS = [
  {
    pattern: /T_\{\\mathrm\{em\}\}/g,
    label: "T_{\\mathrm{em}}",
    reason: "use T_t for transmitter emission time",
  },
  {
    pattern: /\bD_s\b/g,
    label: "D_s",
    reason: "use D_t for the transmitter-side factor",
  },
  {
    pattern: /\bD_T\b/g,
    label: "D_T",
    reason: "use D_r for the receiver-side factor",
  },
  {
    pattern: /\breceiver-normal\b/gi,
    label: "receiver-normal",
    reason: "name the receiver-side role or receiver-weighted acceleration explicitly",
  },
  {
    pattern: /\bsource-normal\b/gi,
    label: "source-normal",
    reason: "name the transmitter-side role explicitly",
  },
  {
    pattern: /W\^\{\\mathrm\{rec\}\}/g,
    label: "W^{\\mathrm{rec}}",
    reason: "use W^{\\mathrm{acc}} for the receiver-weighted acceleration factor",
  },
];

const REQUIRED_DEFINITIONS = [
  {
    file: "content/markdown/aaa/archie/mathematics-terminology.md",
    snippets: ["T_t", "T_r", "D_t", "D_r", "W^{\\mathrm{acc}}"],
  },
  {
    file: "content/markdown/aaa/archie/terminology-usage.md",
    snippets: ["\\frac{dT_t}{dT_r}=\\frac{D_r}{D_t}"],
  },
  {
    file: "content/markdown/aaa/dynamics/master-equation.md",
    snippets: ["T_t", "T_r", "D_t", "D_r", "W^{\\mathrm{acc}}"],
  },
];

const findings = [];

for (const target of SCAN_TARGETS) {
  const targetPath = path.join(ROOT_DIR, target);
  if (!fs.existsSync(targetPath)) continue;
  scanPath(targetPath);
}

for (const requirement of REQUIRED_DEFINITIONS) {
  const absolutePath = path.join(ROOT_DIR, requirement.file);
  const text = fs.readFileSync(absolutePath, "utf8");
  for (const snippet of requirement.snippets) {
    if (!text.includes(snippet)) {
      findings.push({
        file: requirement.file,
        line: 1,
        label: snippet,
        reason: "required current terminology definition is missing",
      });
    }
  }
}

if (findings.length > 0) {
  console.error("[master-equation-terminology] failed");
  for (const finding of findings) {
    console.error(`${finding.file}:${finding.line}: ${finding.reason}: ${finding.label}`);
  }
  process.exit(1);
}

console.log("[master-equation-terminology] passed");

function scanPath(targetPath) {
  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(targetPath, { withFileTypes: true })) {
      scanPath(path.join(targetPath, entry.name));
    }
    return;
  }

  if (!TEXT_EXTENSIONS.has(path.extname(targetPath))) return;
  const text = fs.readFileSync(targetPath, "utf8");
  const file = path.relative(ROOT_DIR, targetPath);
  for (const rule of FORBIDDEN_PATTERNS) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) {
      findings.push({
        file,
        line: lineNumberAt(text, match.index ?? 0),
        label: rule.label,
        reason: rule.reason,
      });
    }
  }
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

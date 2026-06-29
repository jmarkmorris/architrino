#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const SELF_PATH = fileURLToPath(import.meta.url);

const SCAN_TARGETS = [
  "content/markdown/aaa",
  "content/generated/markdown/textbook/reading-copies",
  "reference/priorities",
  "reference/outreach",
  "reference/entourage/cody/prompts",
  "scripts",
  "src",
  "tests",
  "apps/ios/ArchitrinoReader/GeneratedTextbookPackage",
  "README-op.md",
];

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".swift",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

const FORBIDDEN_SNIPPETS = [
  "current-law",
  "current Master EOM",
  "under the current Master EOM",
  "under the current law",
  "current per-hit EOM",
  "current-law baseline",
  "current-law acceleration",
  "source-normal branch strength",
  "source-normal force magnitude",
  "source-normal force evidence",
  "source-normal proof evidence",
  "source-normal closure evidence",
  "circular-interval-certificate-report",
  "circular_interval_certificate",
  "circular-tail-full-signed-proof",
  "circular-tail-positive-sine-proof",
  "circular-tail-integration-notes",
  "spiral-branch-chart-certificate",
  "spiral-branch-chart-interval-report",
  "spiral-vp1-current-interval-rows",
  "spiral-a1-current-interval-rows",
  "spiral-a1-interval-report",
  "spiral_branch_chart_certificate",
  "spiral_a1_finite_memory_transport",
  "spiral-a1-admissible-profile-bounds",
  "spiral-a1-finite-memory-transport-sampled-report",
  "spiral-a1-radial-transport-jet-report",
  "spiral-a1-retained-memory-profile",
  "spiral-a1-retained-memory-transport-lemma",
  "spiral-a1-nonconstant-time-law-chart",
  "spiral-a1-second-variation-remainder-bound",
  "spiral-a1-outward-constants-certificate-target",
  "nested-shell-braid-motion-model-eom-accepted",
  "{r_{ij}(t;s)^2\\,|J_{ij}(t;s)|}",
  "{r_{ij}(t,s)^2\\,|J_{ij}(t,s)|}",
  "{r_{ij}^2(t;t_0)\\,|J_{ij}(t;t_0)|}",
  "{r_{ij}^2(t;t_0)|J_{ij}(t;t_0)|}",
  "{r_{ij}^2(t,s)|J_{ij}(t,s)|}",
  "{r^2|J_{o'\\leftarrow o}(t;t_0)|}",
  "{r_{o'o,\\alpha}^{2}|J_{o'o,\\alpha}|}",
  "{r_{ia}^2(t;s)|J_{ia}(t;s)|}",
  "{r_{\\mathbf{x}j}^2\\left|J_{\\mathbf{x}j}\\right|}",
  "{r_{\\mathbf{x}j}^2(t;t_0)\\left|J_{\\mathbf{x}j}(t;t_0)\\right|}",
  "\\cos^2(\\tilde{\\delta}_{p,m}/2)\\,|J_{p,m}|",
  "\\sin^2(\\tilde{\\delta}_{s,m}/2)\\,|J_{s,m}|",
  "jacobianWeight",
  "r^2|J|",
].map((snippet) => ({
  snippet,
  reason: reasonForSnippet(snippet),
}));

const FORBIDDEN_CODE_PATTERNS = [
  {
    pattern: /pair\.force_sign\s*\/\s*\([^;]*Math\.abs\(jacobian\)[^;]*\)/gs,
    snippet: "pair.force_sign / (... Math.abs(jacobian) ...)",
    reason: "source-normal Jacobian cannot be used as force/action branch strength",
  },
  {
    pattern:
      /1\s*\/\s*\(\s*distance\s*\*\s*distance\s*\*\s*Math\.abs\([^)]*jacobian[^)]*\)\s*\)/gs,
    snippet: "1 / (distance * distance * Math.abs(...jacobian...))",
    reason: "torque/force diagnostics must consume receiver-normal branchWeight",
  },
  {
    pattern: /1\s*\/\s*\(\s*root\.y\s*\*\s*root\.y\s*\*\s*root\.jacobian\s*\)/g,
    snippet: "1 / (root.y * root.y * root.jacobian)",
    reason: "exposure weights must use receiver-normal branch_weight",
  },
];

function reasonForSnippet(snippet) {
  if (snippet.includes("current")) {
    return "temporal EOM wording forbidden by receiver-normal changeover";
  }
  if (snippet.includes("J") || snippet.includes("source-normal")) {
    return "missing receiver-normal branch-strength denominator";
  }
  return "purged inactive artifact name";
}

const findings = [];

for (const target of SCAN_TARGETS) {
  const targetPath = path.join(ROOT_DIR, target);
  if (!fs.existsSync(targetPath)) continue;
  scanPath(targetPath);
}

if (findings.length > 0) {
  console.error("[receiver-normal-clean-slate] failed");
  for (const finding of findings) {
    console.error(
      `${finding.file}:${finding.line}: ${finding.reason}: ${finding.snippet}`,
    );
  }
  process.exit(1);
}

console.log("[receiver-normal-clean-slate] passed");

function scanPath(entryPath) {
  if (entryPath === SELF_PATH) return;

  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath)) {
      if (shouldSkipName(child)) continue;
      scanPath(path.join(entryPath, child));
    }
    return;
  }

  if (!stat.isFile()) return;
  if (!TEXT_EXTENSIONS.has(path.extname(entryPath))) return;

  const text = fs.readFileSync(entryPath, "utf8");
  for (const { snippet, reason } of FORBIDDEN_SNIPPETS) {
    let start = 0;
    while (true) {
      const index = text.indexOf(snippet, start);
      if (index === -1) break;
      findings.push({
        file: path.relative(ROOT_DIR, entryPath),
        line: lineNumberAt(text, index),
        reason,
        snippet,
      });
      start = index + snippet.length;
    }
  }
  for (const { pattern, snippet, reason } of FORBIDDEN_CODE_PATTERNS) {
    pattern.lastIndex = 0;
    let match = pattern.exec(text);
    while (match) {
      findings.push({
        file: path.relative(ROOT_DIR, entryPath),
        line: lineNumberAt(text, match.index),
        reason,
        snippet,
      });
      match = pattern.exec(text);
    }
  }
}

function lineNumberAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

function shouldSkipName(name) {
  return (
    name === ".git" ||
    name === "node_modules" ||
    name === ".DS_Store" ||
    name === "dist" ||
    name === "build"
  );
}

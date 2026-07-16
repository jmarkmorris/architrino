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
  "reference/archie",
  "reference/entourage/archie/prompts",
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
  "active Master EOM",
  "under the current Master EOM",
  "current Master-Equation",
  "active Master-Equation",
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
  "certified positive speed-ratio zero enclosure",
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
  "eta_r^2|J",
  "\\eta_r(u)^2|J",
  "\\eta_r^{-2}|J",
  "eta_r^{-2}|J",
  "eta_a^2|J_a|",
  "\\eta_a^2|J_a|",
  "|J_a|^{-1}",
  "|J_u|^{-1}",
  "|J_r^\\nu|^{-1}",
  "|J_r^{\\nu}|^{-1}",
  "\\omega_r^\\nu=\\eta_r^{-2}|J",
  "neutralReceiverNormalFields",
  "receiverNormalNumerator: sourceNormalDenominator",
].map((snippet) => ({
  snippet,
  reason: reasonForSnippet(snippet),
}));

const FORBIDDEN_CODE_PATTERNS = [
  {
    pattern: /\b(?:current|active)\s+Master\s+EOM\b/g,
    snippet: "current/active Master EOM",
    reason: "temporal Master EOM wording forbidden by receiver-normal changeover",
  },
  {
    pattern: /\b(?:current|active)\s+Master-Equation\b/g,
    snippet: "current/active Master-Equation",
    reason:
      "temporal Master-Equation wording forbidden by receiver-normal changeover",
  },
  {
    pattern: /certified\s+positive\s+speed-ratio\s+zero\s+enclosure/g,
    snippet: "certified positive speed-ratio zero enclosure",
    reason: "stale theta3minus quotient evidence must be historical diagnostic only",
  },
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
  {
    pattern: /strength:\s*normalizeUnitNumber\(\s*link\.weight/gs,
    snippet: "strength: normalizeUnitNumber(link.weight ...)",
    reason: "wake-link display weight cannot fabricate delayed-hit force strength",
  },
  {
    pattern: /solverHit\?\.strength\s*\?\?\s*fallback\.strength/g,
    snippet: "solverHit?.strength ?? fallback.strength",
    reason: "missing delayed-hit receiver-normal evidence must fail closed",
  },
  {
    pattern: /solverHit\?\.receiverNormal(?:Numerator|Factor|CrossingFactor|StatusCode)\s*\?\?\s*fallback\.receiverNormal/gs,
    snippet: "solverHit?.receiverNormal... ?? fallback.receiverNormal...",
    reason: "missing receiver-normal fields cannot be filled from local fallback",
  },
  {
    pattern: /force[^.\n]{0,120}(?:contains|uses|weighted by|contribution uses)[^.\n]{0,120}1\s*\/\s*\|J/gi,
    snippet: "force contains/uses 1/|J",
    reason: "source-normal inverse-Jacobian factors are diagnostic/coarea rows, not force/action strength",
  },
  {
    pattern: /root-front(?:\s|-)(?:law|force-derivative|force derivative)[^\n.]*J_a(?![^\n.]*W\^\{\\mathrm\{rec\}\})/g,
    snippet: "root-front force-derivative wording without W^{\\mathrm{rec}}",
    reason: "root-front force derivative wording must carry receiver-normal branch strength",
  },
];

const FORBIDDEN_TEX_FORCE_DENOMINATOR_PATTERNS = [
  {
    startPattern: /\\frac/g,
    snippet: "\\frac{...}{...\\eta^2|J|...}",
    reason:
      "multiline TeX force denominators must use receiver-normal branch strength, not source-normal |J|",
  },
];

const TEX_FORCE_DENOMINATOR_WINDOW = 900;

const TEX_ETA_SQUARED_JACOBIAN_PRODUCT_PATTERN =
  /(?:\\eta|eta_)[\s\S]{0,220}?(?:\^\s*(?:\{2\}|2)|(?:\)|\\right\))\s*\^\s*(?:\{2\}|2))[\s\S]{0,220}?(?:\|J|\\left\|J|\\lvert\s*J)/;

const TEX_FORCE_CONTEXT_PATTERN =
  /(?:\\widehat\s*\{\\mathbf\{[Rr]\}\}|\\mathbf\{f\}|\\widetilde\s*\{\\mathbf\{F\}\}|\\mathbf\{F\}|force|per-root|line-of-action)/i;

const TEX_ALLOWED_DIAGNOSTIC_CONTEXT_PATTERN =
  /(?:receiver-normal-restart-required|restart-required|diagnostic|coarea|root-flux|root flux|diagnostics-only|diagnostic-only)/i;

function reasonForSnippet(snippet) {
  if (snippet.includes("current") || snippet.includes("active Master")) {
    return "temporal EOM wording forbidden by receiver-normal changeover";
  }
  if (snippet.includes("J") || snippet.includes("source-normal")) {
    return "missing receiver-normal branch-strength denominator";
  }
  return "purged inactive artifact name";
}

if (process.argv.includes("--self-test")) {
  runSelfTest();
  process.exit(0);
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
  scanText(text, path.relative(ROOT_DIR, entryPath), findings);
}

function scanText(text, relativeFile, targetFindings) {
  for (const { snippet, reason } of FORBIDDEN_SNIPPETS) {
    let start = 0;
    while (true) {
      const index = text.indexOf(snippet, start);
      if (index === -1) break;
      targetFindings.push({
        file: relativeFile,
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
      targetFindings.push({
        file: relativeFile,
        line: lineNumberAt(text, match.index),
        reason,
        snippet,
      });
      match = pattern.exec(text);
    }
  }
  for (const { startPattern, reason } of FORBIDDEN_TEX_FORCE_DENOMINATOR_PATTERNS) {
    startPattern.lastIndex = 0;
    let match = startPattern.exec(text);
    while (match) {
      const index = match.index;
      if (isForbiddenTexForceDenominator(text, index)) {
        targetFindings.push({
          file: relativeFile,
          line: lineNumberAt(text, index),
          reason,
          snippet: compactSnippet(
            text.slice(index, index + TEX_FORCE_DENOMINATOR_WINDOW),
          ),
        });
      }
      match = startPattern.exec(text);
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

function isForbiddenTexForceDenominator(text, index) {
  const formulaWindow = texFormulaWindow(text, index);
  if (!TEX_ETA_SQUARED_JACOBIAN_PRODUCT_PATTERN.test(formulaWindow)) {
    return false;
  }
  if (!TEX_FORCE_CONTEXT_PATTERN.test(formulaWindow)) {
    return false;
  }

  const diagnosticContext = text.slice(
    Math.max(0, index - 1200),
    Math.min(text.length, index + TEX_FORCE_DENOMINATOR_WINDOW),
  );
  return !TEX_ALLOWED_DIAGNOSTIC_CONTEXT_PATTERN.test(diagnosticContext);
}

function texFormulaWindow(text, index) {
  const displayClose = text.indexOf("$$", index);
  const windowEnd =
    displayClose === -1
      ? index + TEX_FORCE_DENOMINATOR_WINDOW
      : Math.min(displayClose, index + TEX_FORCE_DENOMINATOR_WINDOW);
  return text.slice(index, windowEnd);
}

function compactSnippet(snippet) {
  const collapsed = snippet.replace(/\s+/g, " ").trim();
  if (collapsed.length <= 180) return collapsed;
  return `${collapsed.slice(0, 177)}...`;
}

function runSelfTest() {
  const cases = [
    {
      name: "active multiline eta-jacobian force denominator fails",
      text: [
        "$$",
        "\\mathbf{f}_u",
        "=",
        "\\frac{",
        "\\sigma_i\\sigma_j\\widehat{\\mathbf{R}}_u",
        "}{",
        "\\eta_u(\\lambda)^2|J_u(\\lambda)|",
        "}.",
        "$$",
      ].join("\n"),
      expectedFindings: 1,
    },
    {
      name: "diagnostic multiline eta-jacobian force denominator passes",
      text: [
        "Receiver-normal status: `receiver-normal-restart-required`.",
        "The old source-normal diagnostic row is",
        "$$",
        "\\mathbf{f}_u",
        "=",
        "\\frac{",
        "\\sigma_i\\sigma_j\\widehat{\\mathbf{R}}_u",
        "}{",
        "\\eta_u(\\lambda)^2|J_u(\\lambda)|",
        "}.",
        "$$",
      ].join("\n"),
      expectedFindings: 0,
    },
    {
      name: "parenthesized multiline eta-jacobian force denominator fails",
      text: [
        "$$",
        "\\mathbf{f}_u",
        "=",
        "\\frac{",
        "\\widehat{\\mathbf{R}}_u",
        "}{",
        "(\\eta_u(\\lambda))^2|J_u(\\lambda)|",
        "}.",
        "$$",
      ].join("\n"),
      expectedFindings: 1,
    },
    {
      name: "receiver-normal force row passes",
      text:
        "$$\\mathbf{f}_u=\\sigma_i\\sigma_j\\eta_u^{-2}W_u^{\\mathrm{rec}}\\widehat{\\mathbf{R}}_u.$$",
      expectedFindings: 0,
    },
    {
      name: "root-chart newton denominator passes",
      text: "$$\\eta_c+\\frac{G(\\eta_c;\\alpha)}{J(Q;\\alpha)}.$$",
      expectedFindings: 0,
    },
  ];

  let failed = false;
  for (const testCase of cases) {
    const selfTestFindings = [];
    scanText(testCase.text, `self-test/${testCase.name}.md`, selfTestFindings);
    if (selfTestFindings.length !== testCase.expectedFindings) {
      failed = true;
      console.error(
        `[receiver-normal-clean-slate:self-test] ${testCase.name}: expected ${testCase.expectedFindings}, got ${selfTestFindings.length}`,
      );
      for (const finding of selfTestFindings) {
        console.error(
          `${finding.file}:${finding.line}: ${finding.reason}: ${finding.snippet}`,
        );
      }
    }
  }

  if (failed) {
    process.exit(1);
  }
  console.log("[receiver-normal-clean-slate:self-test] passed");
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

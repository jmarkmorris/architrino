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
  "src/apps/photon",
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
  {
    pattern: /\bacceleration rows?\b/gi,
    label: "acceleration row",
    reason: "name the actual acceleration contribution or acceleration law",
  },
  {
    pattern: /\b(?:receiver|reception) time \$T\$|\breceiver[^.\n]{0,40} at (?:absolute )?time \$T\$/g,
    label: "role-specific reception T",
    reason: "use T_r when T labels the receiver reception event",
    includeFiles: [/^(content\/markdown\/aaa|reference\/archie)\//],
  },
  {
    pattern: /\b(?:past|prior|earlier) source positions?\b/gi,
    label: "source position used as causal-hit role",
    reason: "use transmitter position for the past emission event",
    includeFiles: [/^(content\/markdown\/aaa|reference\/archie)\//],
    excludeFiles: [
      "content/markdown/aaa/philosophy-history/treasure-physics-overlooked.md",
      "reference/archie/childrens-books/production/generation-manifest.json",
    ],
  },
  {
    pattern: /\bsource architrinos?\b|\bsource-(?:tagged|identity)\b|\bsource re-enters\b|\b(?:source and receiver|receiver and source) (?:worldlines?|velocities?)\b/gi,
    label: "source used as causal-hit role",
    reason: "use transmitter when naming the architrino at the emission event",
    includeFiles: [/^(content\/markdown\/aaa|reference\/archie)\//],
    excludeFiles: ["content/markdown/aaa/archie/comparative-glossary.md"],
  },
  {
    pattern: /\b(?:ordinary|canonical per-hit|received branch|outer|inner self-hit|exterior-coupling|beyond-threshold interior|self-hit interior) rows?\b/gi,
    label: "unexplained row jargon",
    reason: "name the actual contribution, branch, record, or ledger entry",
    includeFiles: [/^(content\/markdown\/aaa|reference\/archie)\//],
  },
  {
    pattern: /\bsame-source\b/gi,
    label: "same-source",
    reason: "use same-transmitter for causal-hit identity",
    includeFiles: [/^(content\/markdown\/aaa|reference\/archie)\//],
    excludeFiles: ["content/markdown/aaa/spacetime/black-holes.md"],
  },
  {
    pattern: /\(T[;,]\s*T_t\)|T_t\s*<\s*T\b|T\s*-\s*T_t\b/g,
    label: "reception T beside T_t",
    reason: "use T_r when T is the receiver reception event",
    includeFiles: ["content/markdown/aaa/dynamics/master-equation.md"],
  },
  {
    pattern: /\b(?:moving|stationary|uniformly moving) sources?\b|\bsource(?:'s)? (?:path|orbit|velocity|identity|distance)\b|\bsource and receiver\b|\breceiver and source\b|\bsource-to-receiver\b|\bsource motion\b|\bsources? \$j\b/gi,
    label: "source used as causal-hit role",
    reason: "use transmitter for the architrino at the emission event",
    includeFiles: ["content/markdown/aaa/dynamics/master-equation.md"],
  },
  {
    pattern: /\b(?:Source count|Max source|Missed sources|No catch-up sources|nearest source|Absolute source history)\b/g,
    label: "source role in Photon UI",
    reason: "use transmitter in causal-hit UI labels while preserving source-named machine fields",
    includeFiles: [/^src\/apps\/photon\//],
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
  {
    file: "content/markdown/aaa/archie/comparative-glossary.md",
    snippets: [
      "Simple-Root Placeholder ($S(T_r)$)",
      "Reception Time ($T_r$)",
      "Root-Playback Derivative ($dT_t/dT_r$)",
      "Ledger Row",
    ],
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
    if (rule.includeFiles && !rule.includeFiles.some((entry) => matchesFileRule(file, entry))) {
      continue;
    }
    if (rule.excludeFiles?.some((entry) => matchesFileRule(file, entry))) {
      continue;
    }
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

function matchesFileRule(file, rule) {
  return typeof rule === "string" ? file === rule : rule.test(file);
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

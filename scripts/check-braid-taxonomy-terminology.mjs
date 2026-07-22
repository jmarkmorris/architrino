#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

export const MIGRATED_SCAN_TARGETS = [
  "content/markdown/aaa/noether-braid",
  "content/markdown/aaa/archie/comparative-glossary.md",
  "content/markdown/aaa/archie/mathematics-terminology.md",
  "content/markdown/aaa/archie/terminology-usage.md",
  "content/markdown/aaa/spacetime/proper-time-and-time-dilation.md",
  "content/markdown/aaa/reactions/mode-taxonomy.md",
  "content/markdown/aaa/foundations/emergence-of-structure.md",
  "content/markdown/aaa/assemblies/bosons/electroweak-bosons.md",
  "content/markdown/aaa/cosmology/dark-matter.md",
  "content/markdown/aaa/cosmology/CMB.md",
  "content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md",
];

const CORPUS_SCAN_TARGETS = ["content/markdown/aaa"];

export const RETIRED_BRAID_NAME_TOKENS = Object.freeze([
  "spindle",
  "drum",
  "shell",
  "nested",
  "cap",
  "uniaxial",
  "triaxial",
]);

const RETIRED_BRAID_NAME_PATTERN = RETIRED_BRAID_NAME_TOKENS.join("|");
const BRAID_NAME_CONTEXT_PATTERN = "braid|family|member|candidate|variant";

export const TERMINOLOGY_RULES = [
  {
    id: "legacy-named-braid-family",
    label: "legacy named braid family",
    pattern: new RegExp(
      `\\b(?:nested[ -]+shell|symmetric[ -]+shell)(?:[ -]+(?:${BRAID_NAME_CONTEXT_PATTERN}))?\\b|` +
        `\\b(?:${RETIRED_BRAID_NAME_PATTERN})[ -]+(?:${BRAID_NAME_CONTEXT_PATTERN})\\b|` +
        `\\b(?:${BRAID_NAME_CONTEXT_PATTERN})[ -]+(?:${RETIRED_BRAID_NAME_PATTERN})\\b`,
      "gi",
    ),
    replacement:
      "use the applicable family/member identifier, such as A1, A2, B1, or C1",
  },
  {
    id: "legacy-braid-name-token",
    label: "older braid-name token requiring contextual review",
    pattern: new RegExp(`(?<!\\\\)\\b(?:${RETIRED_BRAID_NAME_PATTERN})\\b`, "gi"),
    replacement:
      "use a family/member identifier when the token names a braid geometry; retain it only when the local non-taxonomy meaning is explicit",
    auditOnly: true,
  },
  {
    id: "positional-binary-role",
    label: "fixed inner/middle/outer binary role",
    pattern: /\b(?:inner|middle|outer)[ -]+binar(?:y|ies)\b/gi,
    replacement:
      "use the persistent binary index and state any radius or branch-derived role separately",
  },
  {
    id: "positional-radius-triplet",
    label: "inner/middle/outer radius triplet",
    pattern: /\binner\s*(?:\/|:)\s*middle\s*(?:\/|:)\s*outer\b/gi,
    replacement: "use the indexed coordinates R_1, R_2, and R_3",
  },
  {
    id: "imo-triplet",
    label: "I:M:O triplet notation",
    pattern: /\bI\s*(?::|\/|\{:\})\s*M\s*(?::|\/|\{:\})\s*O\b/g,
    replacement: "use persistent indexed rows 1:2:3",
  },
  {
    id: "hml-triplet",
    label: "H/M/L ordered triplet notation",
    pattern: /\b(?:HML|HLM)\b|\bH\s*(?::|\/|\{:\})\s*[ML]\s*(?::|\/|\{:\})\s*[LM]\b/g,
    replacement:
      "use persistent binary indices; do not encode a high/middle/low order in the identity",
  },
  {
    id: "positional-coordinate-symbol",
    label: "inner/middle/outer coordinate symbol",
    pattern:
      /(?:\\omega|omega|[Rrfvw])_\{?(?:\\(?:mathrm|text)\{)?(?:inner|middle|outer)\b/gi,
    replacement: "use an indexed coordinate such as R_a, f_a, or omega_a",
  },
  {
    id: "imo-coordinate-symbol",
    label: "I/M/O coordinate symbol",
    pattern: /\b(?:R|r|f|v|w)_(?:\{?[IMO]\}?)\b|\\omega_(?:\{?[IMO]\}?)/g,
    replacement: "use a persistent indexed coordinate such as R_a or f_a",
  },
  {
    id: "fixed-derived-role",
    label: "fixed positional dynamical role",
    pattern:
      /\binner[ -]+self-hit\b|\bmiddle[ -]+(?:hinge|fulcrum|field-speed)\b|\bouter[ -]+(?:boundary|exterior-coupling)\b/gi,
    replacement:
      "name the persistent binary index and grade the role as a branch-derived diagnostic",
  },
  {
    id: "retired-axis-polarity",
    label: "retired axis-neutral/axis-polarized label",
    pattern: /\baxis[ -]+(?:neutral|polari[sz]ed)\b/gi,
    replacement:
      "omit this dimension; the current taxonomy admits neutral binaries only",
  },
  {
    id: "retired-dressing-name",
    label: "retired Thomson dressing name",
    pattern: /\bThomson[ -]+dressing(?:[ -]+mechanism)?\b/gi,
    replacement: "use Accessory Configuration",
  },
];

const REQUIRED_DEFINITIONS = [
  {
    file: "content/markdown/aaa/noether-braid/braid-taxonomy.md",
    snippets: [
      "persistent record identities, not a sorting by radius, frequency, speed, or any derived dynamical role",
      "does not relabel the binaries",
    ],
  },
  {
    file: "content/markdown/aaa/noether-braid/braid-mathematics.md",
    snippets: [
      "An **Accessory Configuration** is a declared set of six architrinos",
      "may lie inside the braid's effective envelope, cross that envelope, or lie outside it",
    ],
  },
  {
    file: "content/markdown/aaa/archie/mathematics-terminology.md",
    snippets: ["| Accessory Configuration |", "inside, across, or outside the braid envelope"],
  },
];

export function scanTextForBraidTaxonomyTerminology(
  source,
  relativePath = "<memory>",
  { includeAuditOnly = true } = {},
) {
  const findings = [];
  const lines = source.split(/\r?\n/);
  let inFence = false;

  for (const [lineIndex, rawLine] of lines.entries()) {
    if (/^\s*(```|~~~)/.test(rawLine)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || /^\s*\[[^\]]+\]:\s*/.test(rawLine)) {
      continue;
    }

    const prose = stripNonProseMarkdown(rawLine);
    if (!prose.trim()) {
      continue;
    }

    const strictMatchRanges = [];
    for (const rule of TERMINOLOGY_RULES) {
      if (rule.auditOnly && !includeAuditOnly) {
        continue;
      }
      rule.pattern.lastIndex = 0;
      for (const match of prose.matchAll(rule.pattern)) {
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;
        if (
          rule.auditOnly &&
          strictMatchRanges.some(
            ([strictStart, strictEnd]) => matchStart < strictEnd && matchEnd > strictStart,
          )
        ) {
          continue;
        }
        findings.push({
          relativePath,
          lineNumber: lineIndex + 1,
          ruleId: rule.id,
          label: rule.label,
          replacement: rule.replacement,
          match: match[0],
          excerpt: rawLine.trim(),
        });
        if (!rule.auditOnly) {
          strictMatchRanges.push([matchStart, matchEnd]);
        }
      }
    }
  }

  return findings;
}

export function scanBraidTaxonomyTerminology({
  rootDir = ROOT_DIR,
  scope = "migrated",
  checkRequiredDefinitions = scope === "migrated",
  includeAuditOnly = false,
} = {}) {
  if (!new Set(["migrated", "corpus"]).has(scope)) {
    throw new Error(`unsupported braid-terminology scan scope: ${scope}`);
  }

  const targets = scope === "migrated" ? MIGRATED_SCAN_TARGETS : CORPUS_SCAN_TARGETS;
  const files = collectMarkdownFiles(rootDir, targets);
  const findings = [];

  for (const relativePath of files) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    findings.push(
      ...scanTextForBraidTaxonomyTerminology(source, relativePath, {
        includeAuditOnly,
      }),
    );
  }

  if (checkRequiredDefinitions) {
    findings.push(...findMissingDefinitions(rootDir));
  }

  return { scope, files, findings };
}

function collectMarkdownFiles(rootDir, targets) {
  const files = [];
  const seen = new Set();

  for (const target of targets) {
    const absoluteTarget = path.join(rootDir, target);
    if (!fs.existsSync(absoluteTarget)) {
      continue;
    }
    const stack = [absoluteTarget];
    while (stack.length) {
      const current = stack.pop();
      const stat = fs.statSync(current);
      if (stat.isDirectory()) {
        const entries = fs
          .readdirSync(current, { withFileTypes: true })
          .sort((left, right) => right.name.localeCompare(left.name));
        for (const entry of entries) {
          stack.push(path.join(current, entry.name));
        }
        continue;
      }
      if (!current.endsWith(".md")) {
        continue;
      }
      const relativePath = toPosixPath(path.relative(rootDir, current));
      if (!seen.has(relativePath)) {
        seen.add(relativePath);
        files.push(relativePath);
      }
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function findMissingDefinitions(rootDir) {
  const findings = [];
  for (const requirement of REQUIRED_DEFINITIONS) {
    const absolutePath = path.join(rootDir, requirement.file);
    if (!fs.existsSync(absolutePath)) {
      findings.push({
        relativePath: requirement.file,
        lineNumber: 1,
        ruleId: "missing-required-definition",
        label: "missing required terminology file",
        replacement: "restore the canonical terminology definition",
        match: requirement.file,
        excerpt: requirement.file,
      });
      continue;
    }
    const source = fs.readFileSync(absolutePath, "utf8");
    for (const snippet of requirement.snippets) {
      if (!source.includes(snippet)) {
        findings.push({
          relativePath: requirement.file,
          lineNumber: 1,
          ruleId: "missing-required-definition",
          label: "missing required terminology definition",
          replacement: "restore the canonical terminology definition",
          match: snippet,
          excerpt: snippet,
        });
      }
    }
  }
  return findings;
}

function stripNonProseMarkdown(value) {
  return value
    .replace(/`[^`]*`/g, "")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/<https?:\/\/[^>]+>/g, "");
}

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

function runCli() {
  const args = new Set(process.argv.slice(2));
  if (args.has("--help")) {
    console.log("Usage: node scripts/check-braid-taxonomy-terminology.mjs [--scope migrated|corpus] [--report]");
    console.log("Default: strict migrated-scope regression check. Use --scope corpus --report to inventory all remaining stragglers, including standalone older braid-name tokens, without failing.");
    return;
  }

  const scopeIndex = process.argv.indexOf("--scope");
  const scope = scopeIndex >= 0 ? process.argv[scopeIndex + 1] : "migrated";
  const reportOnly = args.has("--report");
  const result = scanBraidTaxonomyTerminology({
    scope,
    includeAuditOnly: reportOnly,
  });

  if (result.findings.length > 0) {
    console.error(
      `[braid-taxonomy-terminology] ${result.findings.length} straggler(s) in ${result.files.length} ${scope}-scope files:`,
    );
    for (const finding of result.findings) {
      console.error(
        `- ${finding.relativePath}:${finding.lineNumber}: ${finding.label}; ${finding.replacement}: ${finding.excerpt}`,
      );
    }
    if (!reportOnly) {
      process.exitCode = 1;
    }
    return;
  }

  console.log(
    `[braid-taxonomy-terminology] scanned ${result.files.length} ${scope}-scope files; no terminology stragglers found`,
  );
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runCli();
}

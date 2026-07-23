#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

export const MIGRATED_SCAN_TARGETS = ["content/markdown/aaa"];

const CORPUS_SCAN_TARGETS = ["content/markdown/aaa"];

const BORG_PRESCRIBED_CONFIG_DIRECTORY =
  "reference/priorities/braid-program/configurations";
const BORG_READER_SURFACES = Object.freeze([
  "src/apps/borg/BorgAssemblyViewControls.js",
  "borg.html",
]);
const CERTIFICATION_READER_SURFACES = Object.freeze([
  "src/apps/borg/BorgAssemblyViewControls.js",
  "src/apps/assembly-explorer/AssemblyConfigurationExplorerRuntime.js",
]);
const A1_PUBLIC_DISPLAY_SURFACES = Object.freeze([
  "README.md",
  "ideal-braid.html",
  "content/scenes/archie/applications.json",
  "content/scenes/archie/ideal_braid.json",
  "content/scenes/scenes_index.json",
  "content/graph/scene_graph.json",
  "scripts/config/foundational-impact-contracts.json",
  "src/apps/ideal-braid/IdealBraidPathPotentialProfile.js",
  "src/apps/ideal-braid/IdealBraidRuntime.js",
]);

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
    id: "eigen-braid-certificate-status",
    label: "eigen-braid used as certificate status",
    pattern:
      /\b(?:certified|retained)[ -]+eigen[ -]+braid\b|\beigen[ -]+braid[ -]+status\b/gi,
    replacement:
      "use candidate braid or certified braid; reserve eigen-braid spectrum for the discrete-mode theorem target",
  },
  {
    id: "taxonomy-member-identifier",
    label: "taxonomy member identifier requiring local coordinate ownership",
    pattern: /\b(?:A1(?:\.[1-4])?|A2|A3(?:\.[1-4])?|B1(?:\.[1-4])?|C[1-6])\b/g,
    replacement:
      "retain only when the local passage states the defining coordinates or explicitly delegates them to the canonical member definition; otherwise use Noether braid, candidate braid, or prescribed braid geometry",
    auditOnly: true,
  },
  {
    id: "taxonomy-family-identifier",
    label: "taxonomy family identifier requiring local geometry ownership",
    pattern: /\bFamily[ -]?[ABC]\b/gi,
    replacement:
      "retain only when the local passage states or explicitly delegates the defining family geometry",
    auditOnly: true,
  },
  {
    id: "ideal-braid-name",
    label: "noncanonical ideal braid display label",
    pattern: /\bideal[ -]+(?:Noether[ -]+)?braid\b/gi,
    replacement:
      "use A1 Lorentz Geometry for the public app/display name; retain only a concrete historical title, quoted text, stable machine contract, route, filename, or unrelated mathematical ideality",
  },
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
    pattern:
      /\b(?:inner|middle|outer)(?:[ -]+[a-z]+){0,3}[ -]+binar(?:y|ies)\b|\bbinar(?:y|ies)(?:[ -]+[a-z]+){0,3}[ -]+(?:inner|middle|outer)\b/gi,
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
    id: "legacy-shielding-role-code",
    label: "inner/middle/outer shielding role code",
    pattern: /(?<![A-Za-z0-9_])(?:IMO|IM-|I--)(?![A-Za-z0-9_])/g,
    replacement:
      "use the literal persistent-index support vector, such as (1,1,1), (1,1,0), or (1,0,0), without assigning radius roles",
  },
  {
    id: "hml-triplet",
    label: "H/M/L ordered triplet notation",
    pattern: /\b(?:HML|HLM)\b|\bH\s*(?::|\/|,|\{:\})\s*[ML]\s*(?::|\/|,|\{:\})\s*[LM]\b/g,
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
    pattern: /\b(?:R|r|f|v|w)_(?:[IMO]\b|\{[IMO]\})|\\omega_(?:[IMO]\b|\{[IMO]\})/g,
    replacement: "use a persistent indexed coordinate such as R_a or f_a",
  },
  {
    id: "fixed-derived-role",
    label: "fixed positional dynamical role",
    pattern:
      /\binner[ -]+self-hit\b|\bmiddle[ -]+(?:hinge|fulcrum|field-speed)\b|\bouter[ -]+exterior-coupling\b/gi,
    replacement:
      "name the persistent binary index and grade the role as a branch-derived diagnostic",
  },
  {
    id: "positional-support-role-audit",
    label: "inner/middle/outer support or layer phrase requiring ownership review",
    pattern:
      /\b(?:inner|middle|outer)[ -]+(?:layer|orbit|envelope|site|ledger|channel|tier|support|engine|binary|axis)\b/gi,
    replacement:
      "use a persistent index for braid identity, retain only an explicit display, boundary, historical, or independently defined non-taxonomy meaning",
    auditOnly: true,
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
    snippets: [
      "| Accessory Configuration |",
      "inside, across, or outside the braid envelope",
      "| eigen-braid spectrum |",
      "Membership in the eigen-braid spectrum does not certify a braid",
    ],
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
          rule.id === "ideal-braid-name" &&
          relativePath === "content/markdown/aaa/archie/research-notebook.md" &&
          rawLine.trim() === "## 2026-06-10: Ideal Noether Braid Lorentz Geometry App"
        ) {
          continue;
        }
        if (
          rule.id === "positional-radius-triplet" &&
          /do not (?:encode|use|assign)\s*$/i.test(prose.slice(Math.max(0, matchStart - 32), matchStart))
        ) {
          continue;
        }
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

  if (scope === "migrated") {
    const borg = scanBorgPrescribedTaxonomyTerminology({ rootDir });
    files.push(...borg.files.filter((relativePath) => !files.includes(relativePath)));
    findings.push(...borg.findings);
    const a1PublicDisplay = scanA1PublicDisplayTerminology({ rootDir });
    files.push(
      ...a1PublicDisplay.files.filter((relativePath) => !files.includes(relativePath)),
    );
    findings.push(...a1PublicDisplay.findings);
    const certificationDisplay = scanCertificationDisplayTerminology({ rootDir });
    files.push(
      ...certificationDisplay.files.filter((relativePath) => !files.includes(relativePath)),
    );
    findings.push(...certificationDisplay.findings);
    files.sort((left, right) => left.localeCompare(right));
  }

  if (checkRequiredDefinitions) {
    findings.push(...findMissingDefinitions(rootDir));
  }

  return { scope, files, findings };
}

export function scanA1PublicDisplayText(source, relativePath = "<memory>") {
  const findings = [];
  const pattern = /\bideal\s+(?:Noether\s+)?braid\b/gi;
  for (const [lineIndex, rawLine] of source.split(/\r?\n/).entries()) {
    for (const match of rawLine.matchAll(pattern)) {
      findings.push({
        relativePath,
        lineNumber: lineIndex + 1,
        ruleId: "ideal-braid-public-display",
        label: "noncanonical ideal braid public display label",
        replacement: "use A1 Lorentz Geometry while preserving machine contracts",
        match: match[0],
        excerpt: rawLine.trim(),
      });
    }
  }
  return findings;
}

export function scanA1PublicDisplayTerminology({ rootDir = ROOT_DIR } = {}) {
  const files = [...A1_PUBLIC_DISPLAY_SURFACES];
  const findings = [];
  for (const relativePath of files) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    findings.push(...scanA1PublicDisplayText(source, relativePath));
  }
  return { files: files.sort((left, right) => left.localeCompare(right)), findings };
}

export function scanCertificationDisplayTerminology({ rootDir = ROOT_DIR } = {}) {
  const files = [...CERTIFICATION_READER_SURFACES];
  const findings = [];
  const pattern =
    /\b(?:certified|retained)[ -]+eigen[ -]+braid\b|\beigen[ -]+braid[ -]+status\b/gi;
  for (const relativePath of files) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    for (const [lineIndex, rawLine] of source.split(/\r?\n/).entries()) {
      for (const match of rawLine.matchAll(pattern)) {
        findings.push({
          relativePath,
          lineNumber: lineIndex + 1,
          ruleId: "eigen-braid-certificate-status",
          label: "eigen-braid used as certificate status",
          replacement:
            "use Braid certification in UI; reserve eigen-braid spectrum for the discrete-mode theorem target",
          match: match[0],
          excerpt: rawLine.trim(),
        });
      }
    }
  }
  return { files: files.sort((left, right) => left.localeCompare(right)), findings };
}

export function scanBorgReaderFacingValue(value, relativePath, field) {
  if (typeof value !== "string") return [];
  const findings = [];
  const pattern = new RegExp(
    `\\b(?:${RETIRED_BRAID_NAME_PATTERN}|extreme[ -]+tilt)\\b`,
    "gi",
  );
  for (const match of value.matchAll(pattern)) {
    findings.push({
      relativePath,
      lineNumber: 1,
      ruleId: "retired-borg-candidate-label",
      label: "retired Borg candidate terminology",
      replacement: "use the canonical A/B/C taxonomy identifier and technical coordinates",
      match: match[0],
      excerpt: `${field}: ${value}`,
    });
  }
  const certificateStatusPattern =
    /\b(?:certified|retained)[ -]+eigen[ -]+braid\b|\beigen[ -]+braid[ -]+status\b/gi;
  for (const match of value.matchAll(certificateStatusPattern)) {
    findings.push({
      relativePath,
      lineNumber: 1,
      ruleId: "eigen-braid-certificate-status",
      label: "eigen-braid used as certificate status",
      replacement:
        "use Braid certification in UI; reserve eigen-braid spectrum for the discrete-mode theorem target",
      match: match[0],
      excerpt: `${field}: ${value}`,
    });
  }
  return findings;
}

export function scanBorgPrescribedTaxonomyTerminology({ rootDir = ROOT_DIR } = {}) {
  const files = [];
  const findings = [];
  const catalogPath = "src/apps/borg/BorgBraidRecordCatalog.js";
  const catalogSource = fs.readFileSync(path.join(rootDir, catalogPath), "utf8");
  files.push(catalogPath);
  for (const match of catalogSource.matchAll(/\blabel:\s*"([^"]+)"/g)) {
    findings.push(...scanBorgReaderFacingValue(match[1], catalogPath, "catalog label"));
  }

  const configDirectory = path.join(rootDir, BORG_PRESCRIBED_CONFIG_DIRECTORY);
  for (const filename of fs.readdirSync(configDirectory).sort()) {
    if (!filename.endsWith(".json")) continue;
    const relativePath = `${BORG_PRESCRIBED_CONFIG_DIRECTORY}/${filename}`;
    const parsed = JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
    if (parsed.schema !== "prescribed-braid-spec.v1") continue;
    files.push(relativePath);
    const values = [
      ["source title", parsed.label],
      ["provenance description", parsed.provenanceDescription],
      ["family label", parsed.taxonomy?.familyLabel],
      ["member label", parsed.taxonomy?.memberLabel],
      ["instantiation label", parsed.taxonomy?.instantiationLabel],
      ["display label", parsed.taxonomy?.displayLabel],
      ...((parsed.illustrativeCoordinates?.choices ?? []).map((value, index) =>
        [`illustrative coordinate description ${index + 1}`, value])),
    ];
    for (const [field, value] of values) {
      findings.push(...scanBorgReaderFacingValue(value, relativePath, field));
    }
  }

  for (const relativePath of BORG_READER_SURFACES) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    files.push(relativePath);
    const readerText = relativePath.endsWith(".html")
      ? source.replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ")
      : [...source.matchAll(/(?:"([^"\n]*)"|'([^'\n]*)'|`([^`\n]*)`)/g)]
        .map((match) => match[1] ?? match[2] ?? match[3] ?? "")
        .join("\n");
    findings.push(...scanBorgReaderFacingValue(readerText, relativePath, "UI string"));
  }

  return { files: files.sort((left, right) => left.localeCompare(right)), findings };
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
    console.log("Default: strict migrated-scope regression check, including the approved A1 Lorentz Geometry display name. Use --scope corpus --report to inventory audit-only member, family, and standalone retired-name candidates without failing.");
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

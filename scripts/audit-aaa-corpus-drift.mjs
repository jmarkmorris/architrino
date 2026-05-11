#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOTS = ["content/markdown/aaa"];
const DEFAULT_SURFACE_ROOTS = [
  "reference/op/entourage-checkpoint.md",
  "reference/entourage/roles-og-entourage",
  "reference/entourage/roles-geometry-dynamics",
  "content/scenes",
  "src",
];
const MARKDOWN_EXTENSIONS = new Set([".md"]);
const SURFACE_EXTENSIONS = new Set([".md", ".json", ".js", ".mjs", ".html", ".css"]);
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const includeArchie = args.includes("--include-archie");
const surfaceMode = args.includes("--surface");
const wantsHelp = args.includes("--help") || args.includes("-h");
const targetArgs = args.filter((arg) => !arg.startsWith("-"));
const rootDir = process.cwd();

if (wantsHelp) {
  console.log(
    "Usage: node scripts/audit-aaa-corpus-drift.mjs [--strict] [--include-archie] [--surface] [path ...]"
  );
  console.log(
    "Scans AAA markdown, or with --surface scans reference/app/scene surfaces, for recurring terminology drift and closure-overclaim patterns."
  );
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
    id: "mass-drag-language",
    description: "Older mass/inertia language that can misstate ordinary drag as the mass mechanism.",
    pattern:
      /\b(Mass as Drag|drag coefficient|Spacetime Drag|null-drag|Noether Sea drag|drag on the Sea|frictional interaction|Frictional Heating)\b/i,
    suggestion:
      "Use shielded internal causal history, medium-dressed response, or dissipative failure-channel language as appropriate.",
  },
  {
    id: "primitive-mass-bookkeeping",
    description: "Primitive dynamics should not use particle-specific substrate mass notation.",
    pattern:
      /\bm_i\s*(?:\\dot|\\ddot|\\mathbf|is the inertial parameter)|\\frac\{1\}\{2\}\s*m_i|m_i\\dot|m_i\\,\\mathbf/i,
    pathPattern: /\/(dynamics|interactions)\//,
    suggestion:
      "Use the acceleration-first law or the universal bookkeeping constant \\mu_{\\text{arch}}, not particle-specific substrate mass.",
  },
  {
    id: "stale-speed-symbol-vf",
    description: "Older field-speed notation that should use the canonical speed symbol.",
    pattern: /\bV_f\b/,
    suggestion: "Use c_f for primitive wake propagation speed unless a local symbol table explicitly defines another quantity.",
  },
  {
    id: "stale-noether-core-nucleus",
    description: "Older fermion-dictionary wording that calls the Noether core a nucleus.",
    pattern: /\b(Tri-Binary Nucleus|Nucleus Type|Nucleus:|from the Nucleus)\b/i,
    pathPattern: /\/assemblies\/fermions\/quantum-number-mapping\.md$/,
    suggestion: "Use Noether core, core type, or core as the canonical assembly term.",
  },
  {
    id: "gauge-quantization-overclaim",
    description: "Gauge/quantization language that overstates an open closure target as complete derivation.",
    pattern: /The Standard Model asserts this;.*derives it|correspond exactly to the SM particle spectrum/i,
    suggestion: "State the result as a stability-selection or closure target unless the local derivation is complete.",
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
  {
    id: "aaa-theory-name-drift",
    description: "Loose theory-name wording in authored AAA prose.",
    pattern: /\b(architrino framework|architrino theory|Architrino Assembly Architecture)\b/i,
    suggestion:
      "Use the stylized theory name $\\mathbb{A}\\mathbb{A}\\mathbb{A}$ unless referring to a literal title, path, or code identifier.",
  },
  {
    id: "reader-prose-working-note-language",
    description: "Conversational working-note language in reader-facing prose.",
    pattern:
      /\b(Here I|Let(?:'|’)s|Let me|I recommend|we should|we need|smart antenna|fluffy atom|architrino weather|architrino breeze|chaotic mess|rigid rock|Take one large)\b/i,
    suggestion:
      "Rewrite as formal, reader-ready prose with scoped claims and explicit closure-target language.",
  },
  {
    id: "reader-prose-placeholder-language",
    description: "Placeholder or checklist wording left in reader-facing AAA prose.",
    pattern: /\b(placeholder|stub|previously empty|Suggested Refinements|Immediate Next Steps)\b/i,
    suggestion:
      "Promote to a scoped purpose, status, closure-target, or missing-material section rather than leaving implementation-note language.",
  },
];

const surfaceRules = [
  {
    id: "surface-causal-delay-rword",
    description: "Legacy causal-delay wording in active reference or app surfaces.",
    pattern: /\b(retarded|retardation|retard)\b/i,
    suggestion: "Use path history, causal wake surface, causal isochron, delayed, or causal-delay wording.",
  },
  {
    id: "surface-aether-bridge-drift",
    description: "Aether wording in active guidance can blur the Noether Sea with historical ether concepts.",
    pattern:
      /\b(spacetime[- ]aether|aether[- ]assembly|aether assemblies|aether density|aether response|aether coupling|aether gradients|aether dynamics|aether parameters|aether simulations|aether language|aether sea|background aether)\b/i,
    suggestion:
      "Use Noether Sea, Noether-Sea response, Noether-Sea state, or Noether-core density unless the passage is explicitly historical.",
  },
  {
    id: "surface-density-delay-notation",
    description: "Older density or refractive-index notation on reference/app surfaces.",
    pattern:
      /\\rho_\{\\text\{vac\}\}|\\rho_\{\\rm\s+aether\}|\\rho_\{vac\}|rho_vac|\bn\(x\)|refractive index (?:field|model)|Spacetime medium density/i,
    suggestion:
      "Use \\rho_{\\text{core}}(\\mathbf{x},t) for physical Noether-core density, n(\\mathbf{x},t) for normalized density, and \\chi_{\\text{sea}} for delay.",
  },
  {
    id: "surface-mass-drag-language",
    description: "Mass or Lorentz language that can misstate ordinary drag as the mechanism.",
    pattern: /\b(Lorentzian Conspiracy|medium drag|push through sea|Noether Sea drag|drag on the Sea)\b/i,
    suggestion:
      "Use preferred-frame suppression, medium-dressed response, shielding, and trapped internal causal history as appropriate.",
  },
  {
    id: "surface-spacetime-medium-standalone",
    description: "Scene or app labels should keep Noether Sea primary and spacetime medium bridge-only.",
    pattern: /"(?:(?:label)?title|sceneName)"\s*:\s*"Spacetime Medium"/,
    suggestion: "Use Noether Sea as the visible ontology label; reserve spacetime medium for bridge explanations.",
  },
  {
    id: "surface-generation-transition-decay",
    description: "Generation navigation should not be labeled as a physical decay.",
    pattern: /\b(Decay to Gen|updateDecayHover|decayHover|DecayHover)\b/,
    suggestion: "Use generation-transition wording for navigation and reserve decay for fixed Standard Model labels.",
  },
  {
    id: "surface-beta-reaction-label",
    description: "AAA-native scene labels should translate generic beta-decay wording to beta reaction.",
    pattern: /\b(beta[- ]?decay|[A-Z][a-z]?\d+\s+decay)\b/i,
    suggestion: "Use beta reaction for native AAA scene language; keep beta decay only as an explicit Standard Model label.",
  },
];

const surfaceSharedRuleIds = new Set([
  "substrate-field-wake-drift",
  "mass-drag-language",
  "noether-sea-hyphen-standalone",
]);

function normalizePath(value) {
  return String(value).replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "");
}

function shouldSkip(relativePath) {
  if (includeArchie) {
    return false;
  }
  return relativePath.startsWith("content/markdown/aaa/archie/");
}

function shouldIncludeFile(relativePath) {
  const extension = path.extname(relativePath);
  const allowedExtensions = surfaceMode ? SURFACE_EXTENSIONS : MARKDOWN_EXTENSIONS;
  return allowedExtensions.has(extension) && !shouldSkip(relativePath);
}

function walkFiles(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) {
    return shouldIncludeFile(relativePath) ? [relativePath] : [];
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
      result.push(...walkFiles(child));
      continue;
    }
    if (entry.isFile() && shouldIncludeFile(child)) {
      result.push(child);
    }
  }
  return result;
}

const roots = targetArgs.length
  ? targetArgs.map(normalizePath)
  : surfaceMode
    ? DEFAULT_SURFACE_ROOTS
    : DEFAULT_ROOTS;
const activeRules = surfaceMode
  ? [...rules.filter((rule) => surfaceSharedRuleIds.has(rule.id)), ...surfaceRules]
  : rules;
const files = [...new Set(roots.flatMap(walkFiles))].sort((a, b) => a.localeCompare(b));
const findings = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(rootDir, file), "utf8");
  const lines = text.split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    for (const rule of activeRules) {
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
  console.log(`AAA corpus drift audit: no findings across ${files.length} files.`);
  process.exit(0);
}

console.log(`AAA corpus drift audit: ${findings.length} finding(s) across ${files.length} files.`);
for (const finding of findings) {
  console.log("");
  console.log(`${finding.file}:${finding.line} [${finding.rule}]`);
  console.log(`  ${finding.description}`);
  console.log(`  ${finding.text}`);
  console.log(`  Suggestion: ${finding.suggestion}`);
}

process.exit(strict ? 1 : 0);

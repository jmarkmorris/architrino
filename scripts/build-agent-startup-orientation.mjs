#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const OUTPUT_PATH = "reference/op/agent-startup-orientation.generated.md";

const SOURCE_PATHS = [
  "AGENTS.md",
  "README.md",
  ".githooks/pre-commit",
  ".githooks/pre-push",
  "scripts/check-content-integrity.mjs",
  "reference/op/README.md",
  "reference/op/codex-goal-seeking-prompt-template.md",
  "reference/op/codex-multiprompt.md",
  "reference/op/theory-orientation.md",
  "reference/op/source-mining-best-practice.md",
  "reference/op/codex-pr-branch.md",
  "reference/priorities/README.md",
  "reference/entourage/archie/prompts/README.md",
  "reference/entourage/archie/prompts/corpus-advancement-pass.md",
  "reference/entourage/archie/prompts/corpus-reviewer.md",
  "reference/entourage/archie/prompts/integrator-reviewer.md",
  "reference/entourage/archie/prompts/review-comment-assessor.md",
  "reference/entourage/archie/prompts/review-closure-verifier.md",
  "reference/entourage/archie/prompts/core-geometry-theorem-reviewer.md",
  "reference/entourage/archie/prompts/priority-lane-resume.md",
  "content/markdown/aaa/archie/academic-style-guide.md",
  "content/markdown/aaa/archie/mathematics-style-guide.md",
  "content/markdown/aaa/archie/mathematics-terminology.md",
  "content/markdown/aaa/archie/terminology-usage.md",
  "content/markdown/aaa/archie/comparative-glossary.md",
];

const WORKFLOWS = [
  {
    name: "Default thread startup",
    use: "Choose the smallest live procedure that fits the requested work, then read only the linked files needed for that procedure.",
    read: [
      "reference/op/README.md",
      "reference/op/codex-goal-seeking-prompt-template.md",
      "selected specialized procedure",
    ],
    live: "Use the live source files when the task asks about policy, exact command order, branch state, validation, or source authority.",
  },
  {
    name: "Corpus advancement",
    use: "Turn corpus, priority, or source signals into concrete mathematical artifacts and safe scoped edits when authority allows.",
    read: [
      "reference/entourage/archie/prompts/corpus-advancement-pass.md",
      "reference/op/theory-orientation.md",
      "relevant priority or corpus files",
    ],
    live: "Read the full protocol before running advancement, because it owns modes, edit authority, handoff shape, and priority action prompts.",
  },
  {
    name: "Source mining",
    use: "Acquire and map source material into current AAA terminology, claim levels, proof routes, and corpus or priority destinations.",
    read: [
      "reference/entourage/archie/prompts/corpus-advancement-pass.md",
      "reference/op/source-mining-best-practice.md",
      "source-family addendum",
    ],
    live: "Use the guide for acquisition details, traceability, mining history, and source-family rules.",
  },
  {
    name: "Fable corpus review",
    use: "Prepare a review-only pass across a directory in scene or textbook order, one file per turn.",
    read: [
      "reference/entourage/archie/prompts/corpus-reviewer.md",
      "reference/op/theory-orientation.md",
      "style and terminology guides listed by the prompt",
    ],
    live: "Read the live target file and nearby canon before raising file-specific findings.",
  },
  {
    name: "Fable comment integration",
    use: "Classify review comments, integrate the valid ones, run an independent closure-quality review, and stage larger issues in priorities.",
    read: [
      "reference/entourage/archie/prompts/integrator-reviewer.md",
      "target document",
      "nearby corpus and style authorities",
    ],
    live: "Review comments are input, not authority; verify against live canon before editing.",
  },
  {
    name: "Priority lane resume",
    use: "Resume a named priority workstream from live state and make the next scoped progress step.",
    read: [
      "reference/entourage/archie/prompts/priority-lane-resume.md",
      "reference/priorities/README.md",
      "lane tracker, brainstorming.md, and work-log.md",
    ],
    live: "Do not rely on memory for queue state; read the lane tracker and owning packet.",
  },
  {
    name: "Core geometry theorem review",
    use: "Request concentrated mathematical review of one theorem target, equation stack, branch certificate, or proof gap.",
    read: [
      "reference/entourage/archie/prompts/core-geometry-theorem-reviewer.md",
      "the exact theorem or packet under review",
      "nearby foundation, dynamics, and terminology files",
    ],
    live: "Use live equations and local notation before making proof or closure claims.",
  },
  {
    name: "Branch, commit, push, and PR",
    use: "Run the explicit branch/PR process, including validation, scoped staging, push, PR state checks, and rollover when requested.",
    read: [
      "reference/op/codex-pr-branch.md",
      ".githooks/pre-commit",
      ".githooks/pre-push",
    ],
    live: "Always re-read the live procedure before publishing or regenerating; command order and required checks are policy.",
  },
];

const PROMPT_INDEX = [
  {
    path: "reference/entourage/archie/prompts/corpus-advancement-pass.md",
    use: "Shared AAA corpus advancement protocol.",
  },
  {
    path: "reference/entourage/archie/prompts/corpus-reviewer.md",
    use: "Review an operator-provided corpus directory, one file per turn.",
  },
  {
    path: "reference/entourage/archie/prompts/integrator-reviewer.md",
    use: "Integrate Fable review comments and perform a full target-document closure review.",
  },
  {
    path: "reference/entourage/archie/prompts/review-comment-assessor.md",
    use: "Assess pasted review comments against current repo canon without editing.",
  },
  {
    path: "reference/entourage/archie/prompts/review-closure-verifier.md",
    use: "Verify whether another agent's edits resolved a specific review without editing.",
  },
  {
    path: "reference/entourage/archie/prompts/core-geometry-theorem-reviewer.md",
    use: "Review one theorem target, equation stack, branch certificate, or proof gap.",
  },
  {
    path: "reference/entourage/archie/prompts/priority-lane-resume.md",
    use: "Resume an existing priority workstream and make the next scoped progress step.",
  },
];

const args = new Set(process.argv.slice(2));
const wantsHelp = args.has("--help") || args.has("-h");
const wantsWrite = args.has("--write");
const wantsCheck = args.has("--check");
const unknownArgs = [...args].filter(
  (arg) => !["--check", "--write", "--help", "-h"].includes(arg)
);

if (wantsHelp) {
  printUsage(0);
}
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}
if (wantsWrite && wantsCheck) {
  console.error("Use either --check or --write, not both.");
  printUsage(2);
}

const mode = wantsWrite ? "write" : "check";
const generated = buildOrientationMarkdown();
const absoluteOutputPath = path.join(ROOT_DIR, OUTPUT_PATH);

if (mode === "write") {
  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, generated, "utf8");
  console.log(`[agent-startup-orientation] wrote ${OUTPUT_PATH}`);
  process.exit(0);
}

if (!fs.existsSync(absoluteOutputPath)) {
  console.error(`[agent-startup-orientation] missing ${OUTPUT_PATH}`);
  console.error("Run: node scripts/build-agent-startup-orientation.mjs --write");
  process.exit(1);
}

const current = fs.readFileSync(absoluteOutputPath, "utf8");
if (current !== generated) {
  console.error(`[agent-startup-orientation] ${OUTPUT_PATH} is stale`);
  console.error("Run: node scripts/build-agent-startup-orientation.mjs --write");
  process.exit(1);
}

console.log(`[agent-startup-orientation] ${OUTPUT_PATH} is current`);

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-agent-startup-orientation.mjs [--check|--write]");
  console.log(`  --check   Validate ${OUTPUT_PATH} against current startup sources (default)`);
  console.log(`  --write   Regenerate ${OUTPUT_PATH}`);
  process.exit(exitCode);
}

function buildOrientationMarkdown() {
  const sourceRows = SOURCE_PATHS.map((sourcePath) => sourceMetadata(sourcePath));
  const lines = [
    "# Agent Startup Orientation",
    "",
    "<!-- Generated by scripts/build-agent-startup-orientation.mjs. Do not edit by hand. -->",
    "",
    "This generated target is a compact orientation layer for Codex, Fable, and other repo agents. It reduces startup context by routing agents to the smallest live procedure that fits the task.",
    "",
    "This file is not the authority. If this file conflicts with a source file, the source file wins. Re-read the live source whenever exact policy, command order, proof status, notation, branch state, or edit authority matters.",
    "",
    "## Fast Startup Rule",
    "",
    "1. Read this file first for routing.",
    "2. Pick exactly one workflow card unless the operator/developer explicitly combines workflows.",
    "3. Read the live files named by that card before editing, reviewing, publishing, or making proof-status claims.",
    "4. Keep generated artifacts read-only unless the operator/developer requested regeneration, fix-drift, or the final branch/PR process.",
    "",
    "## Workflow Cards",
    "",
    "| Workflow | Use When | Minimal Live Read | Live Re-Read Trigger |",
    "| --- | --- | --- | --- |",
    ...WORKFLOWS.map((workflow) =>
      [
        workflow.name,
        workflow.use,
        workflow.read.map((entry) => sourceLink(entry)).join("<br>"),
        workflow.live,
      ]
        .map(tableCell)
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |")
    ),
    "",
    "## Standing Rules",
    "",
    "- Start substantive prompts with `Closure goal:` and avoid addressing an agent by name.",
    "- Treat dirty worktree state as normal ambient state; do not revert unrelated changes.",
    "- Prefer hard mathematical artifacts over broad prose cleanup in theory-facing work.",
    "- Classify claims as ontology, derivation or closure target, effective summary, or speculation before promotion.",
    "- Use established project terminology; do not introduce a new term when a canonical term already exists.",
    "- Do not link from `content/markdown/aaa` to `reference/priorities`; promote or restate priority material in corpus prose when it belongs there.",
    "- For ordinary edits, edit canonical sources first and run check-only validation when needed.",
    "- Use generator `--write` commands only for explicit regeneration, explicit fix-drift, or the final `codex-pr-branch.md` branch/PR process.",
    "",
    "## Prompt Index",
    "",
    "| Prompt | Use |",
    "| --- | --- |",
    ...PROMPT_INDEX.map((prompt) => `| ${sourceLink(prompt.path)} | ${tableCell(prompt.use)} |`),
    "",
    "## Validation And Regeneration",
    "",
    "Check this generated target:",
    "",
    "```bash",
    "node scripts/build-agent-startup-orientation.mjs --check",
    "```",
    "",
    "Regenerate it only during explicit regeneration, fix-drift, or final branch/PR flow:",
    "",
    "```bash",
    "node scripts/build-agent-startup-orientation.mjs --write",
    "```",
    "",
    "The full content-integrity gate includes this check.",
    "",
    "## Source Fingerprints",
    "",
    "A source hash change means this target should be regenerated and then skimmed for whether the compact guidance still reflects the live policy.",
    "",
    "| Source | Lines | SHA-256 |",
    "| --- | ---: | --- |",
    ...sourceRows.map((row) => `| ${sourceLink(row.path)} | ${row.lines} | \`${row.hash}\` |`),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function sourceMetadata(sourcePath) {
  const absolutePath = path.join(ROOT_DIR, sourcePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing source file: ${sourcePath}`);
  }
  const text = fs.readFileSync(absolutePath, "utf8");
  const hash = crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
  const lines = text.length ? text.split(/\r?\n/).length : 0;
  return { path: sourcePath, hash, lines };
}

function sourceLink(sourcePath) {
  if (!SOURCE_PATHS.includes(sourcePath) && !PROMPT_INDEX.some((row) => row.path === sourcePath)) {
    return tableCell(sourcePath);
  }
  const outputDir = path.posix.dirname(OUTPUT_PATH);
  const href = path.posix.relative(outputDir, sourcePath);
  return `[${sourcePath}](${href})`;
}

function tableCell(value) {
  return String(value)
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .trim();
}

Un-sequester high-quality theory from `reference/priorities/**` and memory into `content/markdown/aaa` at its honest claim grade — promoting explanatory structure that recovers observed or previously theorized physics, anticipating closure without ever claiming it, and stating plainly where the theory stands and what it means.

# Corpus Promotion Pass (Aggressive but Honest)

Operator-facing output from this prompt follows [the operator explanation standard](../../../op/operator-explanation-standard.md), which is the sole authority for audience, explanation density, response length, structure, register, question format, and live priority capture.

Use this prompt when the operator judges that the corpus is lagging its own best thinking: substantial insight has accumulated in priority brainstorming files, work logs, memory, and closeouts that is of higher quality than some material already in the authored chapters, and conservative promotion is starving the reader-facing theory. This is the shared [Convergence Campaign](convergence-campaign.md) protocol run with the promotion bias turned up. Apply that protocol's shared rules; this file adds the promotion philosophy and guardrails.

## Why aggressive

- The braid chapters are explicitly an investigation, not settled doctrine. Sequestering every derived structure until the whole program closes is the wrong default: it hides results that already explain physics, and much sequestered material is of higher quality than early corpus content it would replace or extend.
- Explanatory promise identifies material worth preparing; a recovery claim requires the derivation or independent evidence that actually establishes it. A conditional derivation or bounded measured result can be promoted at its supported grade while global existence or closure remains open. The prose names those conditions and does not infer empirical recovery from resemblance or narrative coherence.
- The goal is to let the corpus say, honestly, where the theory is and what it means: what it now explains, what it anticipates, and what remains open — rather than withholding until a certainty that may never be formally declared.

## What "honest" means (non-negotiable)

Aggressive promotion never means overclaiming. Preserve every claim-level discipline:

- Label each promoted claim: ontology, derivation (possibly conditional), effective summary, or speculation. A conditional derivation must name its condition (for example, "conditional on a retained object").
- Never claim closure, proof, or retention that has not been established. Anticipate closure with an explicit "where we are and what it means" framing; do not assert it.
- Gate a speculative conclusion under any existing empirical gate in the owning chapter, rather than promoting it as doctrine.
- Distinguish what the substrate law forces (analytic) from what is measured on a prescribed family (numerical) from what is a candidate mechanism (speculation).
- Own refuted or withdrawn ideas. A promotion pass may also retire corpus text that a later result has falsified.

## Procedure

1. Pick a lane, or scan several: read its `reference/priorities/**/brainstorming.md`, `work-log.md`, and the relevant memory files. Read live state; do not rely on memory of the queue.
2. Triage every substantive item into one of: promote now at honest grade, convert to a named theorem or closure target, stage for operator discussion (a new theory leap, terminology policy, or broad ontology claim), or reject (duplicate, too speculative, or lower value than core work).
3. For each promote-now item: identify the owning `content/markdown/aaa` location and verify that the document or passage is already reader-ready. Complete any remaining preparation and review before promotion: definitions, derivations, evidence, assumptions, open proof burden, honest claim grading, and academic exposition in the intended teaching order. Frame conclusions conditionally where existence or closure is open. Promotion moves or integrates the prepared material; it does not require writing it anew. Preserve ready prose, with only necessary placement, link, and navigation adjustments.
4. Keep internal cross-links within the reader-facing corpus; do not link authored chapters to `reference/priorities`. Before promotion, verify that the prepared document is self-contained and excludes document-status blocks, ownership, workstreams, tasks, packets, queues, gates, operator decisions, agent dialogue, closure prompts, internal paths, raw content hashes, process receipts, resource telemetry, Research Office workflow, and Specialist names. Keep that material in separate working records. External references are governed by the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review); promoting an insight does not automatically qualify every source in its research history for publication.
5. Reconcile the authorized current staging note with a dated promotion pointer and retain any residual open question. Preserve historical evidence and append-only chronology. Persistent memory changes require an explicit operator request and the memory system's permitted update mechanism; corpus promotion does not authorize rewriting a memory file.
6. Verify (below) and report.

## Discipline

- Do not edit owned engines in a promotion pass.
- KaTeX `$...$` with balanced delimiters; follow the existing notation of the chapter.
- Run `node scripts/check-reader-facing-publication-boundary.mjs` and `node scripts/validate-content.mjs --check --strict`; Codex also runs `git diff --check`, while agents barred from git use the applicable non-git checks. Report observed generator drift with the exact repair command supplied by the failing generator. Do not run `--write` unless the operator asks or the task is in the authorized final PR flow; do not prescribe unrelated export regeneration.
- Keep the write set scoped; treat a dirty multi-agent worktree as normal and do not revert unrelated changes.

## Promotion record

Keep promoted destinations and claim grades, prepared explanations, target/discussion dispositions, deferred material and reasons, and validation results in the authorized owner. The operator explanation standard governs the response; the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) governs writing style.

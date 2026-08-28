Closure goal: Un-sequester high-quality theory from `reference/priorities/**` and memory into `content/markdown/aaa` at its honest claim grade — promoting explanatory structure that recovers observed or previously theorized physics, anticipating closure without ever claiming it, and stating plainly where the theory stands and what it means.

# Corpus Promotion Pass (Aggressive but Honest)

Use this prompt when the operator judges that the corpus is lagging its own best thinking: substantial insight has accumulated in priority brainstorming files, work logs, memory, and closeouts that is of higher quality than some material already in the authored chapters, and conservative promotion is starving the reader-facing theory. This is the shared [Convergence Campaign](convergence-campaign.md) protocol run with the promotion bias turned up. Apply that protocol's shared rules; this file adds the promotion philosophy and guardrails.

## Why aggressive

- The braid chapters are explicitly an investigation, not settled doctrine. Sequestering every derived structure until the whole program closes is the wrong default: it hides results that already explain physics, and much sequestered material is of higher quality than early corpus content it would replace or extend.
- Explanatory power is itself evidence. When a mechanism recovers an observed fact (parity violation, neutrino handedness, Lorentz contraction, a spectral ladder) or a previously theorized characteristic, that recovery is a legitimate, promotable result at derivation or effective grade — even while the global existence or closure proof is open.
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
3. For each promote-now item: identify the owning `content/markdown/aaa` chapter; write the substance as reader-facing prose at its honest grade; frame it conditional or gated where existence or closure is open; add a short status note on where it stands and what it would mean, where that helps the reader.
4. Keep internal cross-links within the reader-facing corpus; do not link authored chapters to `reference/priorities`. Restate the needed substance inside the chapter instead, without Research Office workflow or Specialist names. External references are governed by the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review); promoting an insight does not automatically qualify every source in its research history for publication.
5. Reconcile the source note. After a successful promotion, do not leave the pre-promotion text verbatim in the `brainstorming.md` or memory file. Replace it with a short dated pointer (`→ promoted to <chapter> (<date>), grade <X>`) or delete it. This prevents drift between the corpus and the staging copy and prevents a later pass from re-promoting the same material. Preserve any residual open sub-question that was not promoted.
6. Verify (below) and report.

## Discipline

- Do not edit owned engines in a promotion pass.
- KaTeX `$...$` with balanced delimiters; follow the existing notation of the chapter.
- Run `node scripts/validate-content.mjs --check --strict` and `git diff --check`. Report generator drift with the exact `node scripts/build-scene-graph.mjs --write` and `node scripts/build-textbook-md-pdf.mjs --write` commands; do not run `--write` unless the operator asks or the task is in final PR flow.
- Keep the write set scoped; treat a dirty multi-agent worktree as normal and do not revert unrelated changes.

## Report

End with: what was promoted and at what claim grade; the "where we are and what it means" statements added; what was converted to a target or staged for discussion; what was intentionally left sequestered and why; validation results; and a `Closure goal:` line naming the next promotion step.

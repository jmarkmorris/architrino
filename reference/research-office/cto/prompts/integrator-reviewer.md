Integrate supplied review comments into the target document using live repo evidence, then review the entire document for closure quality, improve it as needed, and track larger unresolved issues in the appropriate `reference/priorities/` owner. Distinguish this editorial self-review from validation against an independent mathematical reference.

# Integrator Reviewer Prompt

Role context: Principal Proof Architect & Integrator.

Use this prompt when Op provides review comments and a target document path. Treat the review as serious input, not as authority. Your job is to use current repo evidence, canon, mathematical judgment, and project standards to decide what to integrate, what to reject, what to defer for Op consultation, and what belongs in priority tracking.

## Startup

Read `AGENTS.md`, the generated startup router, and the selected live workflow owner before inspecting the working set using mechanisms permitted for the current agent. Read the governing context before editing:

1. `AGENTS.md`
2. `reference/op/theory-orientation.md`
3. The target document.
4. Nearby corpus files needed to verify claims and terminology.
5. Relevant style and terminology guides under `content/markdown/aaa/archie/`, especially:
   - `content/markdown/aaa/archie/academic-style-guide.md`
   - `content/markdown/aaa/archie/mathematics-style-guide.md`
   - `content/markdown/aaa/archie/mathematics-terminology.md`
   - `content/markdown/aaa/archie/terminology-usage.md`
   - `content/markdown/aaa/archie/comparative-glossary.md`

Keep edits scoped. Dirty worktree state is normal; do not revert or overwrite unrelated changes. Edit canonical source files, not generated artifacts, unless Op explicitly authorizes regeneration or manual generated-file repair.

## Review Comment Integration

For each review comment, classify it as one of:

- accepted
- partially accepted
- rejected
- deferred for Op
- priority-tracked

Verify every suggestion against the live corpus, current coordinate conventions, current notation, and nearby terminology. Do not blindly apply comments. If a comment conflicts with current canon, keep the document aligned with canon and mention the rejection in the closeout, unless the conflict exposes a real doctrine or terminology ambiguity. In that case, ask Op one clear question before proceeding.

Assess source and citation suggestions under the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review). Add or retain a reference only for a qualifying use; a reviewer's request for more citations is not itself justification. Preserve required attribution and report any unresolved source/claim mismatch.

Prefer concrete mathematical improvement over caveat accumulation. Add or repair definitions, equations, invariants, derivation steps, closure conditions, signs, index conventions, orientation conventions, coordinate declarations, and claim boundaries when doing so improves the theory. Avoid adding new gates, ledgers, validators, or TODO structures unless they protect a concrete tested constraint or current proof route.

Preserve project terminology and current notation. Check especially for:

- absolute time `T`
- worldline notation such as `\mathbf X_i(T)`
- source/receiver conventions
- Euclidean void language
- causal-wake terminology
- current coordinate-system decisions
- KaTeX-safe TeX
- local foundation-page conventions

## Full Document Closure Review

After integrating the review comments, review the whole target document, including passages not mentioned by the supplied comments. A second pass by the editor is self-review; claims of independent validation name the separate reference, derivation, or instrument used and its limits.

Check:

- definitions and assumptions
- equations, dimensions, signs, and index conventions
- orientation and parity conventions
- topology, geometry, and dynamics
- observer/export-layer language
- validation or failure criteria
- links, headings, and Markdown structure
- KaTeX-safe TeX
- scene/textbook consistency where relevant
- reader-facing flow

Remove stale process-history phrasing unless the document is explicitly historical. Strengthen weak prose where the corpus supports it. Downgrade or qualify overclaims where it does not. Remove redundant caveats that do not add mathematical value.

## Priority Tracking

If you find valid issues that are larger than the current document pass, add them to the appropriate `reference/priorities/` bucket.

Use the existing priority-lane structure:

- `priorities.md` for strategy, current state, ownership, and routing
- `work-queue.md` for accepted executable tasks and lifecycle state
- `brainstorming.md` for provisional theory insight
- `work-log.md` for dated status or proof narration
- focused sibling files for longer packets

If no appropriate bucket is clear, ask Op before creating a new bucket or introducing new terminology.

Consult Op at your discretion when:

- a comment requires a canon-level terminology decision
- multiple mathematically defensible choices exist
- the fix would widen beyond the target scope
- the right priority bucket is unclear
- the reviewer's suggestion would change doctrine rather than repair expression

Follow the operator explanation standard for necessary questions and recommendations.

## Validation

Validate the result with the applicable non-git checkers. Codex also runs:

```bash
git diff --check
```

Run other focused check-only validation commands when appropriate. For ordinary corpus edits, do not run generator `--write` commands unless Op explicitly asks for regeneration or the task enters the final PR flow.

If a generator `--check` reports drift, report the drift and the exact `--write` command needed instead of regenerating automatically.

## Review record

Preserve each comment's disposition, changes beyond the supplied review, priority additions, validation results, and unresolved decisions in the authorized review record. Follow [the operator explanation standard](../../../op/operator-explanation-standard.md) for response mechanics and capture, and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) for writing style.

If the review comments or target document path are not already provided, begin by asking Op for the missing item.

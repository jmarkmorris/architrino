Closure goal: replace end-of-response recaps and the retired bright5 pattern with a mandatory inline `Plainly:` explanation standard across all operator-facing agent output.

# Inline Plain-Explanation Standard — Implementation Plan

Status: EXECUTED 2026-07-24 (steps 1–6 done; generated-artifact regeneration deferred to the PR process — `node scripts/archie-service/build-full-corpus-source-index.mjs --write` and `node scripts/export-ios-textbook-package.mjs --write`)

Operator decisions:

1. Bright5 is removed entirely — style-guide section, shorthand, and agent memory.
2. Inline format is labeled `Plainly:` interludes.
3. The standard applies to all operator-facing output: chat responses, Codex adjudications, findings reports, closeouts, and milestone reports. Textbook corpus prose keeps its own academic standard.

## Diagnosis (why prior guidance failed)

Three mechanisms produced summaries instead of inline explanation:

1. The Bright First Reader pattern (`bright5`) in [academic-style-guide.md](../../../../content/markdown/aaa/archie/academic-style-guide.md) is a textbook *section-entry ordering* rule. It governs how a corpus section introduces ideas; it says nothing about agent-to-operator communication, so invoking it in chat produced inconsistent results.
2. The AP-STEM guidance was captured as an *end-of-response recap* requirement. Agents complied literally: full jargon-dense analysis, one accessible paragraph at the end.
3. AGENTS.md's comprehension bullet ("plain language before the mathematics; define terms in one clause") is a soft rule surrounded by hard, checkable rules (`Closure goal:` line, claim grading, falsifiers). Agents satisfy the checkable rules and discharge the soft one with topic sentences. Nothing anywhere requires *interleaved* explanation, so none appears.

The fix follows the same lesson as the rules that do work: make the requirement concrete, positional, and greppable.

## The standard (target content for the new owner document)

Create `reference/op/operator-explanation-standard.md` as the single detailed authority. Core rules:

**Audience.** A high-school AP STEM senior or a university sophomore EE whose calculus, linear algebra, ODEs, signals and systems, feedback, and basic numerics may be rusty. Everyday and EE-course vocabulary (feedback loop, noise floor, bookkeeping, settling, signal cancellation) is fair ground; everything else is defined where it is used.

**Unit rule.** Every technical unit in operator-facing output is immediately followed by a `Plainly:` passage. A technical unit is any of: a displayed equation or equation stack, a derivation step, a dense results table or ledger, a jargon-dense paragraph, a code or measurement block, or a claim-grading/falsifier statement whose meaning is not self-evident.

**Content of a `Plainly:` passage.** It explains, it does not summarize. It says what the object is, what just happened, and why it matters, in plain vocabulary. Every symbol that appears in the preceding unit is named in words. It introduces no new claims. Its length is proportional to the unit it explains — a ten-line derivation does not get a one-line gloss.

**Cadence rule.** Never more than three consecutive technical paragraphs without a `Plainly:` interlude. Length of the total response is explicitly not a constraint; completeness of inline explanation outranks brevity.

**Closing recap.** Retained but demoted: a short "The recap, plainly:" section may close a substantive response, but it is a complement to inline explanation, never a substitute. A response whose only plain-language content is the closing recap is non-compliant.

**Self-check.** Before sending, scan the response for undefined jargon and unexplained symbols; verify every technical unit has its `Plainly:` neighbor.

**Worked example.** The standard document embeds one short before/after example (a jargon-dense adjudication paragraph, then the same paragraph with its `Plainly:` interlude) so agents pattern-match instead of interpreting.

**Scope.** All operator-facing output from any agent in this repo: chat, adjudications, findings, closeouts, milestone and completion reports, and generated/recommended prompts' reporting sections. Not `content/markdown/aaa` corpus prose, which keeps the academic style guide.

## Execution steps

### 1. Create the owner document

- Write `reference/op/operator-explanation-standard.md` with the content above.
- Add it to the procedure index in [reference/op/README.md](../../../op/README.md).

### 2. Wire into AGENTS.md

In the Operator/Developer Communication section, replace the current comprehension bullet ("State the finding in plain language before the mathematics...") with:

- a one-line statement of the unit rule and cadence rule (`Plainly:` interlude after every technical unit; never more than three technical paragraphs without one), and
- a pointer to `reference/op/operator-explanation-standard.md` as the detailed authority.

Keep the existing one-clause-definition rule; it is subsumed but harmless as reinforcement.

### 3. Wire into the Codex template

In [codex-goal-seeking-prompt-template.md](../../../op/codex-goal-seeking-prompt-template.md):

- Operator/Developer Communication section: replace the plain-language bullets with the unit rule, cadence rule, and pointer to the standard.
- Reporting section: state that milestone and completion reports follow the operator-explanation standard, so dispatched Codex threads inherit it without the operator re-asking.

Check [codex-multiprompt.md](../../../op/codex-multiprompt.md) and [entourage-prompt-template.md](../../../op/entourage-prompt-template.md) for parallel communication sections and apply the same pointer if present.

### 4. Remove bright5 (full inventory, verified 2026-07-24)

| Location | Action |
| --- | --- |
| `content/markdown/aaa/archie/academic-style-guide.md` § Bright First Reader Pattern | Delete the section. The Core Aim section already carries the ordered-entry idea for corpus prose (claim → structure → equation → symbol meanings → open questions); no replacement text needed. Sweep the guide for dangling references to the section or the `bright5` shorthand. |
| `reference/priorities/archie/work-log.md` (2026-07-05 entry) | Leave the historical entry — the log's subject is history. Add a new dated entry recording the removal and pointing to the new standard. |
| `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/references/academic-style-guide.{md,html}` | Generated artifacts. Do not hand-edit. Regenerate in the final branch/PR process per AGENTS.md generated-artifacts policy, or report the exact `--write` command if outside that process. |
| `content/generated/source-index/local-full-corpus-snapshot.v1.json` | Same generated-artifact policy. |

Also sweep repo-wide for links to the deleted section anchor (`#bright-first-reader-pattern`).

### 5. Agent memory hygiene (Claude side, outside repo)

- Delete the `bright5-explanation-directive` memory.
- Rewrite `end-adjudications-with-accessible-recap` into the inline standard: inline `Plainly:` interludes are the requirement; the closing recap is optional garnish.
- Update the memory index.

(Executed 2026-07-24 alongside this plan.)

### 6. Verification

- Grep sweep: `bright5` and `Bright First Reader` appear only in the work-log history entries and (until regeneration) generated artifacts.
- Link check: no document links to the deleted style-guide section.
- Generator `--check` for the source index and iOS package reports the expected drift, with the `--write` command recorded for the PR process.
- Acceptance test, behavioral: the next substantive adjudication response is checked against the standard — every equation block and dense paragraph has its `Plainly:` neighbor, and the response is compliant even with the closing recap deleted.

## Why this should work where the last two attempts did not

The two failed attempts were an ordering rule for the wrong audience (bright5) and a positional rule aimed at the wrong position (end recap). This attempt copies the enforcement shape of the rules agents already follow reliably in this repo: a named marker (`Plainly:`) that is visible and greppable, a positional requirement (immediately after each technical unit), a cadence bound (three paragraphs), a single owner document, and inheritance into every Codex dispatch through the goal-seeking template. An agent cannot claim compliance without producing the markers, and the operator can audit compliance at a glance.

Closure goal: execute steps 1–4 and 6 (step 5 already done), then regenerate generated artifacts in the PR process.

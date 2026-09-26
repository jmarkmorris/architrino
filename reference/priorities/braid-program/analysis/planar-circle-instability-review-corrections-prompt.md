# Assignment: complete the planar-instability proof corrections

## Objective

Bring the Braid Program's circular-instability documents into line with the [2026-09-26 reassessment](planar-circle-instability-review-reassessment.md) of the independent review. Finish the map-level theorem source check, integrate the positions-only estimate with its local hypotheses, record the analytic confinement bound with an explicitly uncertified numerical winding diagnostic, and index the result where the program's live state is read. The linear calculation already proves at least one growing real mode; the floating-point count does not establish uniqueness, simplicity, the absence of other center roots, or the dimension of the unstable manifold.

This is a bounded editing assignment for the existing local checkout at `/Users/markmorris/vibe/architrino`. Read its live `AGENTS.md`, the startup router, and the [core geometry theorem review procedure](../../../office-of-research/cto/prompts/core-geometry-theorem-reviewer.md) before working. Write operator-facing prose under the [operator explanation standard](../../../op/operator-explanation-standard.md) and the academic style guide it imports.

## Instrument disposition

Use the reduced form of Step 3 unless the dispatch explicitly includes retention and controlled reruns of the scratch instruments. Their current owner is the ignored folder `.tmp/planar-circle-independent-review/`; they are not durable repository evidence. The reassessment corrects the unsupported historical claim that every instrument passed an independent known case before its target. Retaining or rerunning them does not by itself certify the count. This assignment does not include a new spectral-certification campaign, regular test, or recurring obligation.

## Read these files

1. [The reassessment](planar-circle-instability-review-reassessment.md), in full. It is the specification for this assignment, and its Sections 3.1 to 3.3 contain the mathematics to be integrated.
2. [The nonlinear instability proof](planar-circle-nonlinear-instability.md), especially the header, §4, and §6.
3. [The growing-mode analysis](planar-circle-growing-mode.md), especially §3 and §4.
4. [Manuscript §9.3.3 and §9.3.4](../manuscript.md#933-a-growing-antipodal-planar-mode).
5. [Braid Program priorities](../priorities.md), especially the "Research ownership — 2026-09-26" section.
6. The historical [independent review](../../dormant-deferred/field-speed-ceiling/analysis/planar-circle-instability-independent-review.md), for context only.
7. The survey by Hartung, Krisztin, Walther, and Wu, *Functional differential equations with state-dependent delays: theory and applications* (<https://aimath.org/WWN/variabletimelag/sur0b.pdf>), Sections 3.2, 3.4, and 3.5, and its bibliography entries [45], [99], [135], and [175].

## Fixed scope

- Use only the sharp Master Equation, the authorized field-speed ceiling with least-change projection of the complete sum, zero self response at and below field speed, and $c_f=c_a=1$. Add no smoothing, reception rule, or standard-physics premise.
- Preserve the analytically supported linear calculation and distinguish it from the measured diagnostics. Keep the physical all-past instability claim conditional on the map-level theorem until its source and hypotheses are checked. If a derivation or theorem application fails review, report the exact failure rather than forcing the requested conclusion.
- Sections 9.3.5 and 9.3.6 of the manuscript, the braking and departure analyses, and their scripts and receipts belong to the separate [escape review assignment](sharp-circle-escape-claude-review-prompt.md). Do not edit them.
- Do not edit anything under `reference/priorities/dormant-deferred/`, including the historical review and the historical ceiling priorities. The reorganization parked that directory as history.
- Preserve concurrent work. Re-read each exact passage immediately before patching it.

## Step 1: a checked citation for the map-level unstable manifold

The backward-orbit construction in proof §4 invokes a local unstable-manifold theorem for a $C^1$ map on a Banach space without naming a source that has been read.

1. Obtain and read one of the map-level references the survey's Section 3.5 cites. Prefer Krisztin, Walther, and Wu (1999), Appendix I, because the survey takes its stable-manifold Theorem I.2 from it. The alternatives are Chow and Lu (1988), Hale and Lin (1986), and Neugebauer (1988).
2. Identify the precise unstable-manifold statement: its theorem number, the hypotheses on the map and on the spectral splitting of its derivative, and how it characterizes the manifold through backward orbits with geometric decay.
3. Verify each hypothesis for the time-$a$ map $F_a$ at the circle in a local chart of the solution manifold. Use survey Theorem 3.2.1 ($F_a$ is $C^1$), relation 3.4.1 (its derivative is the linearized time map, with spectrum contained in $\{0\}\cup\{e^{za}:z\in\sigma(G)\}$), and the finite-dimensional unstable generalized eigenspace. The analytically established positive characteristic root supplies an actual expanding eigenmode. Use the whole expanding spectral subspace and its complementary spectrum in the closed unit disk; its dimension need not be known. Do not use the floating-point winding count to assert a single simple eigenvalue or a one-dimensional manifold.
4. Rewrite the relevant paragraph of proof §4 to cite that theorem by number with its hypotheses checked. Remove the phrases "sufficiently long time step $a>h$" and "compact spectral structure" unless the source read requires them and you verify them. Choose a fixed $a>0$ satisfying the theorem actually read; do not impose or remove additional time-step restrictions from recall.
5. If no reference can be obtained or read, do not substitute a citation from memory. Record in proof §4 that the map-level theorem remains an open citation obligation, naming the four candidate sources, and report this as the blocker.

## Step 2: the positions-only corollary

Add the lemma and consequence of the reassessment's Section 3.2 to proof §6. Replace the sentence stating that a positions-only corollary "additionally needs a position-to-velocity/heading estimate" with the estimate itself. Keep the statement exact:

- window length $2h$ with $h=4$;
- the product norm $|(p,\alpha)|=|p|+|\alpha|$ and history norm $\|x\|_{C^1}=\sup|x|+\sup|x'|$;
- histories in a sufficiently small local neighborhood throughout the window, a finite positive bound $M_2>0$, and a uniform Lipschitz constant $L$ for the solution histories and the phase equilibria being compared;
- the common local heading lift with $|\alpha-\alpha_\gamma|\le\pi$, and the treatment of $\varepsilon=0$ by a limit;
- the modulus $\omega(\varepsilon)=2\sqrt{\varepsilon M_2}+2\varepsilon/h+\varepsilon$;
- the sufficient small-departure scale $\varepsilon=c\eta^2$ for a sufficiently small constant $c>0$, without asserting a sharp scaling law or trajectory growth rate.

Check the Taylor step and the chord inequality $|e(a)-e(b)|\ge(2/\pi)|a-b|$ for $|a-b|\le\pi$ yourself before writing. Explain why the chosen complete backward solution has the whole preceding window in the local domain, why constants are uniform on a small phase arc, and why other phases are already separated in position. State the instability corollary conditionally if Step 1 remains unresolved. Report any error found in the estimate rather than transcribing it.

## Step 3: record the analytic bound and numerical-count limitation

**Full form, only when retention and controlled reruns are included in the dispatch.**

1. Inspect `root-bound.mjs`, `argprinciple.mjs`, and `fd-linearization.mjs` in `.tmp/planar-circle-independent-review/` before retaining reviewed versions under `scripts/field-speed-ceiling/` with a `planar-circle-` prefix. Give each a one-line header stating that it is an explicit-use research instrument and naming the independent known case it actually runs. The current `root-bound.mjs` executes no such control, and the current winding script's two target rectangles have no independently established census. Correct those control gaps before any target rerun; a label or recomputation of the same target coefficients is insufficient.
2. Do not modify `scripts/field-speed-ceiling/planar-circle-growing-mode.mjs`. The finite-difference script is its independent reference and must not change in the same edit as its subject.
3. Run and record each independently known case before its target. For winding, use analytic functions with specified root counts, such as polynomials enclosing zero, one, and multiple roots, rather than unproved regions of the target $F$. Record the controls, their expected answers, commands, outputs, and Node version in a new receipt at `reference/priorities/braid-program/evidence/planar-circle-spectrum-count-receipt.md`. State what each control covers and what it leaves unchecked. Do not wire the scripts into a test suite or describe floating arithmetic as certification.
4. Add a short subsection to the growing-mode analysis with the derived bound (every root with $\operatorname{Re}z\ge0$ satisfies $|z|<3$), its coefficients, and the exact rational enclosure argument from the reassessment. Report the observed winding at measured diagnostic grade with the instrument and receipt. Say that it is consistent with the simple phase root and one simple positive root, while the exact count, positive-root multiplicity, other center roots, and manifold dimension remain uncertified. A certificate requires nonvanishing enclosures along the entire contour and validated total argument change; pointwise interval evaluations of $|F|$ alone would not establish the count.
5. Keep the proof header's caution that the numerical spectrum count is not a global spectral certificate. Add a link to the analytic bound and diagnostic if useful, and preserve the remark that instability needs only one positive root. Neither retention nor an ordinary floating-point rerun closes the count-certification question.

**Reduced form, the default.** Add the analytic bound and its rational enclosure proof to the growing-mode analysis as a derived result. If the historical winding is mentioned, identify it as a previously reported floating-point diagnostic whose source remains only in ignored scratch storage and whose known-case validation is incomplete. Do not claim the source has disappeared without checking. No rerun or new receipt is needed to state the analytic bound. Leave the proof header's count caution unchanged, and do not infer root multiplicity or manifold dimension.

## Step 4: manuscript and priorities

1. In [manuscript §9.3.3](../manuscript.md#933-a-growing-antipodal-planar-mode), state the analytic confinement bound. Mention the winding diagnostic only with its limits from Step 3; do not state an exact count, simplicity of the positive root, or a manifold dimension.
2. In [manuscript §9.3.4](../manuscript.md#934-nonlinear-instability-on-the-active-planar-boundary), add the positions-only consequence at the local scope of the proof's new lemma. Cite the theorem found and verified in Step 1, or state explicitly that the physical all-past construction and its corollary retain that open source obligation.
3. Add a link to the reassessment next to the existing independent-review link in §9.3.4 and in the proof header.
4. Add or update the current entry in [Braid Program priorities](../priorities.md) within "Research ownership — 2026-09-26", avoiding a duplicate if another agent has already added it. State the local nonlinear-instability result within the antipodal active-boundary class at the grade established in Step 1, including the checked-source obligation if unresolved, and identify the integrated positions-only estimate. Keep the optional complete spectral certificate separate from the requirements of the instability argument. State that no post-departure fate follows. Link the proof, manuscript §9.3.4, the review, and the reassessment; keep the entry to one paragraph and do not rerank the queue.
5. Append a dated entry to the Braid Program [work log](../work-log.md) listing the files changed and the checks run.

## Checks and deliverable

- Run `node .tmp/collinear-comparison/check-document.mjs` on each edited Markdown file if that checker still exists. Record that it passed its own positive and negative controls first. If it is gone, check relative links and KaTeX delimiters by a stated method, and state the method's scope.
- Do not stage, commit, push, regenerate generated artifacts, or edit controlled canon.

Report in plain language:

- the theorem cited in Step 1, with number and verified hypotheses, or the exact reason it could not be checked;
- whether the Step 2 lemma was confirmed or needed repair;
- which form of Step 3 was carried out, with a receipt path only if an instrument rerun was included, and why the winding remains a diagnostic;
- the list of files changed.

State the strongest conclusion now justified. End with the smallest useful next action and its reason.

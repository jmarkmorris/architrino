# CRW-005 Causal Set and Delay Geometry Review — Independent Evidence Report, 2026-09-11

**Current disposition:** the [owner-authorized repair closeout](#owner-authorized-repair-closeout--2026-09-11) below supersedes the proposed dispositions for CRW-005 item 7. The original report and its snapshot-specific observations are preserved as historical evidence. The closeout records bounded chapter repair, not scientific acceptance.

## Scope, source identity, and disposition

This is a report-only independent review of [Causal Set and Delay Geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md). It addresses the delayed root-set geometry, causal wake-surface intersection, local transversality, uniqueness versus global multiplicity, the field-speed threshold, self-hits, the Heaviside endpoint convention, and the speedboat analogy. It is evidence for HQ adjudication; it is not acceptance, correction, theory closure, or EOM-solver certification. No source chapter, tracker, generated artifact, or other file was edited.

The assigned source was read completely with `nl -ba`; it has 43 newline-terminated lines and current SHA-256 `fbd729f5d908fb4b0f94d98e8c3fa48be4e5443ce078093c7edc62f9309cda50` at the review snapshot. The source is currently modified in the shared checkout by concurrent work; its live diff is the terminology migration from the retired wake-surface wording to `causal wake surface` plus the corresponding math/analogy wording. The CRW-005 status board still marks this chapter unread, and the sole report destination did not exist before this write. The current bytes, not the historical baseline or generated reading copies, control the line references below.

The review used the [architrino-review skill](../../../../.agents/skills/architrino-review/SKILL.md), its [live instruction owner](../../../op/skills/skill-architrino-review.md), the [Corpus Reviewer procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md), [Theory Orientation](../../../op/theory-orientation.md), About Architrino, the current Archie style and terminology guides, the relevant definitions and interfaces in the seven foundation anchors named by the review procedure, the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), the geometry/dynamics role packet, and the live field-speed regular-chart owners. Those owners were used as canon and review lenses, not as substitutes for independent derivation. The report records four demonstrated findings (D1–D4), three open obligations or unsupported generalizations (O1–O3), and three editorial/source issues (E1–E3). All dispositions remain proposed.

## Demonstrated findings

### D1 — The opening root-set equation and wake radius omit the symbolic field-speed factor

**Reference and severity:** high; lines 3–7 and 20–22, especially the displayed definition of `\mathcal C_o(T_r)` at lines 5–8 and the radius statement at line 22, compared with the `F` definition at line 21 and the canonical root condition in [Master Equation, lines 1516–1532](../../../../content/markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions).

**Claim grade: derived.** The displayed root set uses

$$
\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=T_r-T_t,
$$

but the same chapter immediately defines the causal function with

$$
F(T_t;T_r)=\|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|-c_f(T_r-T_t).
$$

For a stationary transmitter at distance $R>0$ from a fixed receiver, the equation in the root-set display selects $T_t=T_r-R$, whereas the canonical equation and line 21 select $T_t=T_r-R/c_f$. These are different emission events whenever $c_f\ne1$. The same omission appears in line 22, where the physical wake radius is called $\Delta=T_r-T_t$ instead of $c_f\Delta$. The chapter's later statement that numerical runs use $c_f=1$ does not make the preceding symbolic root-set definition correct when the chapter keeps $c_f$ explicit in $F$ and discusses field-speed thresholds.

**Smallest repair or disposition:** insert $c_f(T_r-T_t)$ in the displayed root-set equation and call the forward wake radius $c_f\Delta$. If a normalized-only version is intended, state $c_f=1$ before the opening equation and remove the symbolic claim from that passage; the current owners favor retaining symbolic $c_f$ wherever its dependence matters.

**Operator-checkable falsifier:** re-evaluate the stationary-source derivation above from the corrected source text. A symbolic derivation showing that both displayed equations select the same $T_t$ for arbitrary $c_f>0$ would overturn D1; equality only at the normalized value $c_f=1$ would not.

### D2 — Strict sub-field speed proves at most one root, not existence of a root

**Reference and severity:** medium; lines 12–14 and 28–29, especially line 14's closing phrase “the causal root is unique.”

**Claim grade: derived.** For $s_1<s_2$ on a searched interval, the reverse triangle inequality gives

$$
F(s_2;T_r)-F(s_1;T_r)
\ge c_f(s_2-s_1)-\|\mathbf X_o(s_2)-\mathbf X_o(s_1)\|.
$$

If a continuous history satisfies $\|\mathbf V_o\|<c_f$ throughout the interval, the right-hand side is strictly positive, so $F$ is strictly increasing. This proves that the root set contains at most one element. It does not prove that $F$ changes sign or that a root is present. The chapter itself uses the correct weaker wording “at most one causal root exists” at line 29, but line 14 changes that to an unconditional uniqueness statement.

An independent normalized check uses $c_f=1$, $T_r=0$, a fixed receiver at the origin, a stationary transmitter at $\mathbf X_o(s)=(2,0,0)$, and searched interval $s\in[-0.5,-0.1]$. Then $\|\mathbf V_o\|=0<1$ and $F(s;0)=2+s\in[1.5,1.9]$, so the root set is empty even though $F$ is strictly increasing. This is a root-existence counterexample, not a claim about an evolved many-body trajectory.

**Smallest repair or disposition:** say “there is at most one causal root; if a root is known to lie in the declared bracket, it is unique.” Add a bracket/sign condition or an explicitly supplied root when existence is needed.

**Operator-checkable falsifier:** on the stated stationary example, a valid root in $[-0.5,-0.1]$ would overturn the counterexample. A proof that the chapter's searched interval always carries an endpoint sign change would discharge the missing existence condition for that declared interval, but would not make strict monotonicity itself an existence theorem.

### D3 — Equality at the field speed is a characteristic-family case, not strict super-field-speed multiplicity

**Reference and severity:** medium; the heading and wording at lines 28–29, the clarification at line 14, and the strict “exceed” language at lines 39 and 43.

**Claim grade: derived.** The source correctly writes $\|\mathbf V_o\|\ge c_f$ in the body at line 29 and says tangency can occur at equality at line 14, but the heading “Multiple roots (require super-field-speed)” and the speedboat conclusion “without exceeding $c_w$” blur the equality stratum with the strict $v>c_f$ regime. With normalized $c_f=1$, take a fixed receiver at $\mathbf X_{o'}(0)=\mathbf0$ and a same-transmitter path $\mathbf X_o(s)=-s\mathbf e$ for $s\in[-2,0]$. Its speed is exactly one, not greater than one, and

$$
F(s;0)=\|\mathbf0-(-s\mathbf e)\|-(0-s)=(-s)-(-s)=0
$$

for every $s\in[-2,0)$. Thus four distinct emission times, and in fact a continuum, satisfy the fixed-reception root condition without any strict super-field-speed segment. This is a characteristic nonisolated root family, not four ordinary transverse branches. The live field-speed owner makes this exact distinction: strict super-field speed is the necessary interval-history condition for a simple noncoincident self-root, while equality can produce a degenerate characteristic family.

The converse is also important: a speed excursion above one is not sufficient for a self-hit. For example, on a finite searched interval choose $c_f=1$, fixed receiver $\mathbf0$ at $T_r=0$, and a transmitter path $\mathbf X_o(s)=(10+2s)\mathbf e$ for $s\in[-2,-1]$. Its speed is two, but $F(s;0)=10+2s+s=10+3s\in[4,7]$, so there is no root in that interval. Speed is a regime warning; root existence and branch admissibility remain separate.

**Smallest repair or disposition:** replace the heading with “Field-speed and super-field-speed multiplicity” and state: $v<c_f$ gives monotone at-most-one-root behavior; $v=c_f$ can give a nonisolated characteristic family; $v>c_f$ permits folds or isolated self-hit roots but does not guarantee them. In the analogy, replace “without exceeding” with “without a strict super-field-speed segment, an isolated transverse multi-hit pattern is excluded; equality can instead produce a degenerate characteristic ride.”

**Operator-checkable falsifier:** a complete root census for the equality path showing no positive-delay roots would overturn the displayed counterexample. A strict-super-speed path with a certified simple self-root would establish possibility, not sufficiency; a universal sufficiency proof would be needed to remove the second counterexample.

### D4 — The implicit-function-theorem claim omits the regularity and positive-range hypotheses it needs

**Reference and severity:** medium; lines 24–26, especially line 25's invocation of the implicit function theorem.

**Claim grade: derived for the missing hypotheses; the derivative formula itself is correct.** At a positive-delay root, $r=c_f(T_r-T_t)>0$, and direct differentiation gives

$$
\partial_{T_t}F=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_o(T_t)=D_t.
$$

If the paths are $C^1$ on a neighborhood of the root and $D_t\ne0$, the implicit function theorem gives a local $C^1$ branch $T_t(T_r)$. The assigned chapter states only a local speed condition and a nonzero derivative; it does not state the $C^1$ neighborhood, positive-range domain for $\hat{\mathbf r}$, or a branch neighborhood on which the derivative remains nonzero. The live regular-chart theorem supplies these as explicit floors and history hypotheses, so they cannot be silently inherited from the one-line simulation note. The result also remains local: it says nothing about global root completeness, a fold, a characteristic interval, a history-window edge, or continuation after a singular event.

**Smallest repair or disposition:** add “for $C^1$ paths on a neighborhood with positive range and $|D_t|$ bounded away from zero” and replace “near $T_r$” with “near a specified root $(T_{r,*},T_{t,*})$.” State that global continuation requires a separate chart and event rule.

**Operator-checkable falsifier:** a source-level declaration before line 25 that all paths are $C^1$ with a positive-range and transversality neighborhood would remove the specification defect. A pair of histories satisfying those stated hypotheses but lacking the claimed local branch would refute the mathematical result itself; no such pair was found or needed for this report.

## Open obligations and unsupported generalizations

### O1 — The root set needs an explicit boundary between kinematic roots and admitted acceleration rows

**Reference and severity:** medium; lines 3–16 and 20–33.

**Claim grade: inferred from the source/canon boundary.** The displayed $\mathcal C_o(T_r)$ is a kinematic set of equality solutions. The canonical Master Equation admits an ordinary contribution only after positive delay/range, a simple-root or declared caustic treatment, transmitter-side transversality/weight control, complete active-root accounting, and the applicable self-hit/event conditions. The chapter discusses transversality and mollification, but it does not explicitly say whether a degenerate root, a characteristic interval, or an unregularized positive-delay self-root belongs to $\mathcal C_o$ while remaining inactive in the acceleration sum. Without that distinction, “possibly multi-valued set” can be read as an already admitted ledger.

**Smallest repair or disposition:** name $\mathcal C_o$ the kinematic root set and define a separate ordinary/admitted subset, or state in one sentence that all roots remain candidates until the canonical branch conditions and complete ledger are certified. Keep nonordinary continuation outside this chapter's acceptance boundary.

**Operator-checkable falsifier:** a complete local definition elsewhere, explicitly incorporated by link and notation, that maps every root in the displayed set to either an admitted row or a named inactive/nonordinary disposition would discharge the obligation.

### O2 — Speed and looping are possibility indicators, not a global multiplicity or self-hit criterion

**Reference and severity:** medium; lines 12–16, 28–29, and 35–43.

**Claim grade: inferred.** The source uses “may,” “can,” and “likely,” which preserves some caution, but the loop language and the four-hit maneuver still invite a global trajectory reading. The strict sub-field monotonicity proof rules out multiple roots even for a curved or looping transmitter history if its speed remains below $c_f$. Conversely, the normalized super-speed example in D3 has no root. A complete self-hit claim additionally needs the same-transmitter equality, positive separation or declared core control, a nonzero Jacobian/transversality floor, retained transmitter-side acceleration weight, and root-ledger completeness.

The four-hit passage is also a different object from fixed-time multiplicity. Four successive ridge crossings would mean four receiver events $T_{r,1},\ldots,T_{r,4}$, each with its own root ledger; it would not by itself mean that one fixed $\mathcal C_o(T_r)$ has four elements. The passage supplies no explicit $C^1$ path, emission times, reception times, or residuals from which four roots can be independently checked.

**Smallest repair or disposition:** retain the boat passage as an intuition or prescribed-path target and label it explicitly as four successive reception events, not a simultaneous four-root set. If the chapter is intended to claim an example rather than an analogy, supply the path, the four root equations at their respective reception times, all other-root exclusions, and the branch floors.

**Operator-checkable falsifier:** an explicit normalized $c_f=1$ path and timing record with four distinct positive-delay simple self-roots, plus a complete inactive-root census at each reception event, would discharge the example obligation. A sub-field-speed loop with multiple roots would overturn the monotonicity boundary and would require checking the root-function hypotheses.

### O3 — Endpoint exclusion does not define continuation through folds, characteristic intervals, or the mollified zero-range limit

**Reference and severity:** high; lines 31–33 and 38–43.

**Claim grade: measured for the stated boundary; inferred for the remaining obligation.** The identity $r=c_f(T_r-T_t)$ correctly proves that an exact sharp root with $r=0$ must have zero delay, and the strict $T_t<T_r$ convention excludes that diagonal. The live Master Equation likewise says that this endpoint exclusion does not certify a finite transition when a nontrivial same-transmitter root is born there. The chapter's sentence that a mollified symmetric limit “must be verified” is therefore appropriately cautious, but it leaves unresolved the regulator, branch update, event ownership, and continuation rule. A Heaviside endpoint convention cannot select a future history after a fold or characteristic family.

**Smallest repair or disposition:** preserve this as an open continuation boundary. State explicitly that $H(0)=0$ is only an endpoint admission convention; fold transit, nonisolated positive-delay roots, near-diagonal regularization, and post-event history require separate declared maps and convergence evidence.

**Operator-checkable falsifier:** an independently derived continuation theorem or regulator-limit certificate that supplies the outgoing retained history, root census, and response through the named singular stratum would discharge the corresponding obligation. A finite value of one mollified sample would not be sufficient.

## Editorial and source issues

### E1 — The backward-sphere equivalence is described as the forward wake surface

**Reference and severity:** medium; lines 20–22 and the speedboat explanation at line 36.

**Claim grade: derived for the provenance distinction; editorial for the repair.** The equality is symmetric as a distance equation, so saying that the transmitter emission point lies on a sphere centered at the receiver is a valid backward-sphere reformulation. It is not the forward causal wake surface emitted by the transmitter. The canonical geometry has a sphere centered at $\mathbf X_o(T_t)$ with receiver point $\mathbf X_{o'}(T_r)$ on that surface. The center matters for the later line-of-action and self-hit interpretation.

**Smallest repair or disposition:** write “the receiver lies on the causal wake surface of radius $c_f\Delta$ centered at the transmitter's emission point; equivalently, the emission point lies on the backward sphere centered at the receiver.”

**Operator-checkable falsifier:** a source convention that explicitly defines “causal wake surface” as the receiver-centered backward locus would remove the terminology concern, but it would need to be reconciled with the Master Equation's fixed emission-center transport and line-of-action derivation.

### E2 — The Heaviside symbol is invoked without showing the kernel or separating it from the strict root domain

**Reference and severity:** low/medium; lines 21, 32, and 33.

**Claim grade: measured for the source syntax; derived for the redundancy.** The root set already has $T_t<T_r$, while `H(T_r-T_t)` appears at line 21 without a displayed integral or wake-density kernel in which it acts. The current canonical owner writes the same endpoint convention alongside the strict inequality, so the intended exclusion is understood. In this chapter alone, however, $H(0)=0$ does not specify the positive-delay support of a finite-width kernel and does not do the mathematical work of proving that positive-delay $r=0$ roots are impossible; that latter fact follows directly from the equality.

**Smallest repair or disposition:** either remove `H(T_r-T_t)` from the root-set sentence and state that the strict inequality is the sharp-domain convention, or define $H$ in the actual distributional wake expression and state how the declared mollifier preserves positive-delay support. Keep the direct $r=c_f\Delta$ argument.

**Operator-checkable falsifier:** a local displayed kernel or linked owner contract showing exactly where $H$ multiplies the propagation measure and how its value at zero is retained under the regulator would resolve E2.

### E3 — Generated reading surfaces retain an older source snapshot

**Reference and severity:** low; generated [dynamics reading copy, lines 8314–8318](../../../../content/generated/markdown/textbook/reading-copies/dynamics.md) and generated [source-index snapshot, entry around line 25231](../../../../content/generated/source-index/local-full-corpus-snapshot.v1.json), compared with the live source lines 3–7, 20–22, and 36.

**Claim grade: measured.** The live authored source uses `causal wake surface`, while the generated reading copy and source-index payload still contain the older terminology and the older normalized root text. This is generated drift, not an additional authored-chapter mathematical finding. The generated artifacts are outside the sole write destination and were not edited.

**Smallest repair or disposition:** leave the generated artifacts unchanged for the authorized generated-drift owner; when regeneration is authorized, run the relevant check first and then its declared `--write` command, followed by the corresponding checks. Do not manually repair generated bytes in this review.

**Operator-checkable falsifier:** a current generator check showing no drift, or a regenerated output whose source payload exactly matches the current authored chapter, would close E3.

## Preserved claims and non-findings

- The root equality is the correct kinematic relation once the symbolic $c_f$ factor is present; the current source's later $F$ definition has that factor.
- The derivative $\partial_{T_t}F=c_f-\hat{\mathbf r}\cdot\mathbf V_o(T_t)$ is correct at a positive-range root. A nonzero derivative supports a local branch only with the regularity hypotheses in D4.
- Strict sub-field speed gives strict root-function monotonicity and therefore at most one root on the searched interval. This is a local/global root-count fact, not an existence or global trajectory theorem.
- The interval-speed argument correctly makes strict sub-field-speed history incompatible with a nontrivial self-hit. Exceeding or reaching $c_f$ is not sufficient for a self-hit; the source and the canonical self-interaction owner preserve that distinction.
- Exact sharp $r=0$ roots cannot occur at positive delay because $r=c_f(T_r-T_t)$. The unresolved question is the finite-width or post-event continuation near the excluded diagonal, not this algebraic identity.
- The speedboat passage is explicitly labeled an analogy and acknowledges that real water wakes have different propagation behavior. It is not being treated as a substrate premise or as independent evidence for four self-hits.
- No standard-physics law, mass, force, spacetime, or conservation principle was imported as a substrate premise. The comparison to water wakes remains an explicitly labeled analogy.

## Validation receipt

All commands ran in `/Users/markmorris/vibe/architrino`. No Python, generator `--write`, solver run, stage, commit, push, reset, stash, or worktree operation was used.

| Command or instrument | Result and scope |
| --- | --- |
| `test -r AGENTS.md` followed by full startup reads | Checkout readable; `AGENTS.md`, generated router, selected review owner, review skill owner, foundation/technical owners, and the assigned 43-line chapter were read. |
| `git --no-optional-locks status --short --untracked-files=all` and scoped ownership searches | Shared checkout is dirty in unrelated concurrent work; the assigned chapter is modified by concurrent work; the requested report path was absent before writing. This is not a whole-tree cleanliness claim. |
| Textbook TOC traversal for `content/markdown/aaa/validation/simulations/action-energy` | The assigned chapter appears in the live traversal after Action Model Comparison, Analytic Baselines, Attraction, and Background and Simple Action. The explicit single-chapter assignment controls this report's scope. |
| `sha256sum` and `wc -l` on the assigned source | Current source identity recorded above: 43 lines and the stated SHA-256. This binds findings to the live snapshot, not to generated copies. |
| Independent Node known-case check | Passed before target examples: with $c_f=1$, a stationary transmitter at $x=2$ and receiver at $x=0$, $T_r=0$, the known root $T_t=-2$ gives $D_t=1$. This validates the small instrument's distance/root and Jacobian formulas only. |
| Independent Node counterexample check | Passed after the known case: the sub-field stationary search has no root on $[-0.5,-0.1]$, while the exact-speed path $X(s)=-s$ has four sampled roots on a fixed reception event. These are prescribed kinematic checks, not EOM evolution evidence. |
| `node scripts/build-agent-startup-orientation.mjs --check` | Exit 1: the generated startup router is stale; the command reported the exact authorized repair `node scripts/build-agent-startup-orientation.mjs --write`. No write was run. This is a pre-existing/generated-state result, not a report failure. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: 199 Markdown files and 4,661 display equations were scanned; the generated equation registry is stale. No write was run. This does not invalidate the source equation parse or prove any equation. |
| `node scripts/build-textbook-md-pdf.mjs --check` | Exit 1: seven generated reading copies reported drift; the check reported zero errors and zero warnings. No generated output was written. This is generated drift only. |
| `node scripts/validate-content.mjs --check --strict` | The current rerun exits 0 with zero errors, zero warnings, and 30 notes across 1,637 audited Markdown files. A transient earlier rerun during the shared-checkout review exited 1 because an unrelated untracked `reference/priorities/aaa-corpus-rewrite/adjudication-agenda.md` briefly contributed six broken relative links; none pointed to this report or the assigned chapter, and no repair was made here. The current pass establishes the repository's strict content check at final measurement, not mathematical correctness or generated-artifact freshness. |
| Known-case-first report checker using `parseCorpusDisplayEquations` and vendored KaTeX | Exit 0: fixture pass preceded target parsing; the report has 5 display blocks, 97 math expressions, 9 local file links, all 10 required finding IDs, no forbidden control characters, and the assigned source hash/count markers match the live source. File-target resolution and TeX parsing passed; heading-fragment semantics and browser rendering are not established by this instrument. |

The report itself was checked with a known-case-first Node instrument that parses display and inline math using the repository's canonical equation parser and vendored KaTeX, resolves relative Markdown file links, checks required headings/IDs and ordinary whitespace, and verifies the assigned-source hash/count markers. The fixture pass was completed before the report target was parsed. The instrument establishes source-level structure, link resolution, TeX parseability, and identity binding; it does not prove the root theorems, regulator limits, or browser rendering.

## Residual limits

This review did not run the EOM solver, evolve a delayed history, certify an all-root numerical ledger, prove a continuation selector, or claim a physical self-hit. The prescribed paths used in the independent checks are mathematical counterexamples or boundary witnesses. No stability conclusion was drawn, and no linearization about an unverified equilibrium was used. The report does not assess every claim in the linked Master Equation or field-speed owners; it uses only the relevant root, transversality, self-hit, and continuation interfaces.

The source chapter's current hash is bound to the snapshot above. A source-hash change, a new owner decision about the field-speed equality stratum, or a supplied independent continuation certificate requires HQ to reassess the affected findings before any repair is accepted.

## Next HQ adjudication boundary

HQ should first decide D1 and D2 because they affect the chapter's symbolic root definition and the exact meaning of “unique.” It should then decide D3 and D4 together with O1–O3, preserving the separation between regular local branch facts, fixed-time root multiplicity, successive trajectory events, and unresolved singular continuation. E1–E3 are editorial/source dispositions and must not be promoted into theory acceptance or solver certification.

## Owner-authorized repair closeout — 2026-09-11

### Authority, inspected state, and changed files

The CRW-005 item 7 implementation assignment explicitly authorized repairs to the chapter and this report. The applicable procedure was the [Integrator Reviewer](../../../office-of-research/cto/prompts/integrator-reviewer.md), selected through the live review skill owner. The assignment reserves shared-record integration to HQ. No status board, priority list, queue, work log, other chapter, generated file, or software implementation was edited by this owner. No staging, commit, push, reset, stash, regeneration, or worktree operation was performed.

**Claim grade: measured.** Before editing, `git diff --` and `git diff --cached --` scoped to the two authorized paths returned no changes, and `sha256sum` identified the chapter as `fbd729f5d908fb4b0f94d98e8c3fa48be4e5443ce078093c7edc62f9309cda50`, identical to the original report's 43-line review snapshot. The report's pre-edit SHA-256 was `18e8354068eb1e8fa88f295224bd2ddc7a33ead4c71c0fb99a3bdde5de55f2a0`. The original report's statement that the chapter was concurrently modified describes its earlier review session; it is not the implementation session's opening Git state.

The two changed files are:

- [Causal Set and Delay Geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md): corrected geometry, definitions, derivations, and proposal boundaries. The final chapter has 58 newline-terminated lines and SHA-256 `a8f8afda3c4b744d8e5b894773eca75d377d8b551beead1b6cfac2685109583f`, measured with `wc -l` and `sha256sum` after the receiver-crossing repair. Its existing equation identifier `corpus-equation-9435e7c724a2ce9d` is retained.
- This evidence report: current-disposition pointer and dated closeout appended around the preserved independent review. Original counterexamples and historical validation observations remain intact.

These identity measurements are falsified by different bytes at the stated paths when rechecked. A subsequent chapter hash change requires review of the actual diff before reusing this receipt.

### Dependency and mathematical verification boundary

The source/canon check used the [Master Equation's self-hit regime](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime), [self-hit condition](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-condition), and [conventions and exclusions](../../../../content/markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions); the [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md#propagation-and-causal-set-delayed-only); and the [transmitter/receiver terminology owner](../../../../content/markdown/aaa/archie/terminology-usage.md#transmitter-and-receiver-event-usage). Academic, mathematical-terminology, comparative-glossary, and About Architrino source policies were also consulted for the edited exposition.

The [field-speed geometry owner's monotonicity and rigidity analysis](../../field-speed-ceiling/analysis/mathematics-geometry-dynamical-system.md#root-monotonicity-under-the-ceiling) and [regular-chart history-to-ledger theorem](../../field-speed-ceiling/analysis/regular-chart-history-to-ledger-well-posedness.md) were read as bounded dependency evidence. The latter is explicitly conditional inside the proposed constrained-response model. Its velocity ceiling, positive receiver-factor floor, and model-specific event dispositions were not adopted as canonical premises. The chapter retains the canonical unsigned transmitter weight and signed receiver playback, and derives its elementary branch statements directly from the distance-delay equation.

A read-only analytical worker re-derived the interval-speed necessity and checked the full repaired chapter. This was useful editorial verification; model agreement is not counted as an independent mathematical reference. The independent references for the stated kinematic conclusions are the reverse triangle inequality, the equality case of the path-length bound, the implicit function theorem with its local hypotheses, and the explicit prescribed paths below. No EOM evolution or numerical all-root certificate was produced.

### Finding-by-finding dispositions

| ID | Disposition | Implemented repair and remaining boundary |
| --- | --- | --- |
| D1 | ✓ Accepted repair | Restored symbolic $c_f$ in the opening root set and wake radius. Both the root set and $F=0$ now select $T_t=T_r-R/c_f$ for stationary separation $R>0$. All numerical examples set $c_f=1$. |
| D2 | ✓ Accepted repair | Replaced unconditional uniqueness and “usually one” with at-most-one on the declared connected searched interval; gave the reverse-triangle proof, a separate closed-bracket existence condition, and the normalized empty-window counterexample. No all-past existence assertion remains. |
| D3 | ✓ Accepted repair | Separated strict sub-field monotonicity, the possible exact-speed characteristic family, and super-field loss of monotonicity. Added the self-history equality argument showing that a simple positive-delay self-root needs a strict super-field segment. Preserved a genuine same-transmitter super-speed example with no positive-delay root. Equality at one instant is not asserted to create a whole root interval. |
| D4 | ✓ Accepted repair | Declared $C^1$ paths near a specified positive-delay root and a nonzero emission derivative; positive range follows at that root, and continuity supplies smaller positive range, delay, and derivative floors. The conclusion is a local $C^1$ root branch, with higher smoothness conditional on smoother paths. A separately certified uniform chart and continuation remain outside this elementary theorem. |
| O1 | ✓ Accepted boundary repair; underlying certification open | Named the set kinematic and separated membership from ordinary acceleration admission. Linked and stated branch conditions, controlled transmitter weight, active/inactive root accounting, and self-hit/event requirements. Degenerate or nonisolated roots are not admitted into an ordinary finite branch sum by this note. |
| O2 | ✓ Accepted boundary repair; four-event construction unproved | Retained the boat maneuver as a guessed prescribed-path proposal with four distinct reception events and a separate full root census at each event. Required explicit path/times, positive ranges, simple emission roots, and receiver transversality for the proposed transverse ridge crossings. Speed, loop shape, and crossing count are not evidence of dynamical realization. |
| O3 | ✓ Accepted open-obligation disposition | Retained exact diagonal exclusion and the direct $r=c_f\Delta$ proof. Explicitly left fold passage, characteristic-family response, diagonal birth, finite-width kernel support/limits, and outgoing-history selection unresolved. Endpoint convention is not a continuation rule. |
| E1 | ✓ Accepted editorial/geometric repair | Located the forward wake center at the transmitter's emission position. Kept the receiver-centered backward sphere only as the equivalent root-search geometry, with the same radius $c_f\Delta$. |
| E2 | ✓ Accepted editorial/definitional repair | Removed the unattached Heaviside factor from the root definition. Defined the endpoint convention in the singular-case discussion and linked its canonical owner. Positive-delay zero-range exclusion follows from the root equality; the finite-width support/limit remains separately declared and unproved here. |
| E3 | ○ Deferred generated-artifact work; disposition complete | Check-only runs confirm stale reading copies, equation registry, and full-corpus source-index output. Generated files remain outside this owner's write authority. Exact commands and paths are recorded below for the authorized regeneration owner; generated freshness is not claimed. |

**Claim grade: derived for D1–D4 and the geometric identities; inferred for the sufficiency of these edits as a bounded review disposition.** The original finding-specific counterexamples and falsifiers remain applicable to the corrected definitions and are refined below. O1–O3 are resolved as explicit chapter boundaries; the underlying research questions remain open. E1–E2 are local expression repairs, and E3 is a deferred materialization task. These categories must not be collapsed into one scientific completion claim.

### Additional full-document repairs and analytical refinements

The editorial self-review removed three unsupported boat claims: ridges emitted from a moving transmitter are not concentric; no supplied timing record fixes an outermost-first crossing order; and tighter loops or longer sprints have no demonstrated monotone effect on crossing likelihood. The maneuver now keeps the useful proposed sequence without asserting those outcomes. The external water-wave and Causal Set Theory detours were shortened to the local object and analogy boundary; no external mechanism is used as a substrate premise. Observer-level causal-order and metric recovery, dynamic realization, and stability are explicitly outside the local conclusions.

The original D3 super-speed witness excludes roots only in its declared remote search window. The repaired chapter adds the stronger same-path witness $\mathbf X_o(s)=-2s\mathbf e$ on $[-2,0]$, with $\mathbf X_o(0)=\mathbf0$, $\|\mathbf e\|=1$, and $c_f=1$. Here $F(s;0)=-s>0$ for every negative $s$ in the entire retained interval. This is an exact kinematic no-root result for that path, not evidence about an evolved trajectory or any omitted past. A zero at a negative $s$ in that interval would falsify it.

For the strict-speed necessity, let $\mathbf n$ denote the displacement direction at a positive-delay self-root. If $\|\mathbf V_o\|\le c_f$ on the full interval, the continuous integrand $c_f-\mathbf n\cdot\mathbf V_o$ is nonnegative and has zero integral, since the displacement is $c_f\Delta\mathbf n$. It therefore vanishes everywhere. The norm bound then forces $\mathbf V_o=c_f\mathbf n$ throughout, giving a straight characteristic interval and $D_t=0$. A $C^1$ self-history obeying that speed bound with a positive-delay root having $D_t\ne0$ would falsify the claim. Strict super-speed is necessary for a simple self-root, not sufficient.

The final full-document analytical check distinguished two derivatives in the boat proposal. $D_t\ne0$ certifies a simple emission-time root. For a fixed marked emission, $\partial_{T_r}F=-D_r$, so $D_r\ne0$ is a sufficient transverse reception-crossing condition. This extra condition is stated only for the proposed transverse maneuver; it does not become a general acceleration-admission rule or a multiplier of $W^{\mathrm{acc}}$. The signed playback identity is derived locally in the chapter. A nonzero fixed-emission reception derivative without a local sign change of the $C^1$ root function would falsify this crossing criterion.

### Validation and generated-state receipt

All commands ran in the existing checkout. The required first `git diff --check` passed. The first `node scripts/validate-content.mjs --check --strict` run exited 0 with 0 errors, 0 warnings, and 30 notes across 1,638 audited repository Markdown files; this preceded the final receiver-crossing sentence and closeout append. Final-source checks are recorded below after those edits.

| Check-only command | Measured result and exact regeneration handoff |
| --- | --- |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: 199 Markdown files and 4,666 display equations scanned; five missing canonical source links and stale `content/generated/equation-mapping/corpus-equations.json`. Reported IDs: `corpus-equation-64ee29567fb2e6aa`, `corpus-equation-6e68e862aa5efb32`, `corpus-equation-9c165fd0ccf57a2d`, `corpus-equation-67dbbbe3118e6154`, `corpus-equation-817cee980597181e`. The chapter retains its distinct existing identifier. Required authorized command: `node scripts/build-equation-mapping-corpus.mjs --write`, then its `--check`. This owner did not attribute the five other IDs to a specific edit or author. |
| `node scripts/build-textbook-md-pdf.mjs --check` | Exit 1: drift in `content/generated/markdown/textbook/reading-copies/architrino-textbook.md`, `content/generated/markdown/textbook/reading-copies/dynamics.md`, and `content/generated/markdown/textbook/reading-copies/noether-sea-and-effective-spacetime.md`; 0 errors and 0 warnings. Required authorized command: `node scripts/build-textbook-md-pdf.mjs --write`, then its `--check`. |
| `node scripts/archie-service/build-full-corpus-source-index.mjs --check` | Exit 1: full-corpus snapshot drift at `content/generated/source-index/local-full-corpus-snapshot.v1.json`. Required authorized command: `node scripts/archie-service/build-full-corpus-source-index.mjs --write`, then its `--check`. |

The generated checks establish a stale materialized state at their measurement time, not a defect in the repaired theorem statements. Their whole-corpus outputs include concurrent edits and are not a source-specific attribution. No generator `--write` or manual generated-file edit was performed. The startup-router failure recorded in the original review remains historical evidence; it was not rerun or represented as a current measurement in this repair pass.

### Unresolved obligations and reopening conditions

1. **Root completeness and admission:** supply an independently checked retained-history census, including active roots, inactive gaps, memory boundaries, same-record weights, and any event-specific dispositions before using a candidate set as an acceleration record. A found omitted root or failed branch bound reopens the affected admission claim.
2. **Four-event realization:** supply the explicit normalized path and timing record with four transverse reception events and their complete censuses. Then separately establish agreement with the delayed acceleration law. A failed equality, root floor, or acceleration balance rejects that candidate; no boat sketch is an existence certificate.
3. **Singular continuation:** derive the regulator or event rule with an outgoing history, root census, and response limit for the particular fold, characteristic family, or diagonal birth. A finite mollified sample does not discharge the obligation. A verified independent continuation theorem would permit revising only its covered boundary.
4. **Effective recovery and stability:** any causal-order, metric, stability, solver-certification, or empirical claim needs its own derivation or acceptance evidence. None follows from local kinematic root facts or this chapter disposition.
5. **Generated surfaces:** rerun the named checks after an authorized regeneration pass. E3 closes only when the corresponding materialized outputs pass; the authored chapter repair does not certify their freshness.

**Bounded completion:** CRW-005 item 7 is complete at the authorized chapter-review and finding-disposition level, supported by the final-source validation receipt below: D1–D4 and E1–E2 are repaired; O1–O3 retain explicit open mathematical boundaries; E3 is assigned an exact deferred regeneration disposition. HQ owns the shared status update. No theory closure, global root completeness, physical self-hit, causal-order or metric recovery, stability, solver certification, or empirical acceptance is claimed.

### Final-source validation receipt

**Claim grade: measured.** The following checks cover the repaired chapter and dated closeout; they establish only their stated scope. A failed rerun on the same bytes would overturn the corresponding pass. A later source change or concurrent whole-repository change requires inspecting the difference before comparing results.

| Command or instrument | Final result and limits |
| --- | --- |
| `git diff --check` | Exit 0, no whitespace errors in the current working diff. |
| `node scripts/validate-content.mjs --check --strict` | Exit 0, 0 errors, 0 warnings, 30 notes; 391 scene files, 199 corpus Markdown files, and 1,638 repository Markdown files audited. This is content/link/index validation, not mathematical correctness or generated-output freshness. |
| `node --input-type=module` with the inline known-case-first Node instrument recorded in this task's execution transcript | Exit 0. Before reading either target, a known fixture returned exactly one display and one inline expression while ignoring fenced and inline code; vendored KaTeX accepted the valid expressions and rejected an invalid command. The numerical helper then passed the independent stationary-source root and derivative case before evaluating the target examples. |
| Focused source parsing using `parseCorpusDisplayEquations` from `scripts/build-equation-mapping-corpus.mjs` and `loadVendoredCommonJsBundle` from `scripts/load-vendored-commonjs-bundle.mjs` | Chapter: 1 display, 92 math expressions. Report: 5 displays, 127 math expressions. Every extracted expression passed vendored KaTeX with `throwOnError: true` and `strict: "error"`; no forbidden control characters were found. The existing chapter equation ID, final chapter hash, and all ten disposition rows passed assertions. This validates the extracted TeX and source structure, not browser layout or heading-fragment semantics. |
| Normalized prescribed-path arithmetic within the same known-case-first instrument | The empty-window endpoint residuals were 1.5 and 1.9. At four sample emission times, the exact-speed family returned zero root residual and zero transmitter derivative; the doubled-speed same-path example returned the positive residual given by its written identity. Sampling checks arithmetic only; the complete interval conclusions follow from the explicit analytic formulas and inequalities above. |
| `git diff --numstat --` scoped to the chapter and report; full chapter diff self-review | The chapter diff contained 39 inserted and 24 removed lines. The report diff contained additions only, preserving the original review text. These measurements describe this owner's two files, not all concurrent changes in the checkout. |

No Python, EOM solver run, all-root numerical certification, or rendered-browser inspection was used. The required content and whitespace checks pass; the separately reported generated checks fail for recorded drift, so this is not an overall repository-health pass.

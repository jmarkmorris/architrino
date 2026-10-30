# OPS-031 — Topological charge and sea-coupling review — 2026-10-28

This report completes whole-chapter reviews of due-list sequences 31–33. Two new bounded correction groups are proposed: TC28-01 (medium, mathematical implication) and MEX28-01 (low, naming only). No corpus repair is implemented. This receipt does not reopen CRW-005 or the separately deferred Molecular Exclusion findings F1–F6.

## Scope and preserved source identity

All 600 source lines were read, by `wc -l` and complete source reads of the three chapters. Copies are preserved under `.tmp/ops-031-oct28/core/`; SHA-256 identifies the reviewed bytes, rather than a last editor or a causal attribution. The review followed live AGENTS.md, generated startup routing, the architrino-review skill, the corpus-reviewer owner, and the periodic-document-review procedure. Parent coordination owns coverage/control updates.

| Sequence | Whole reviewed chapter | Lines | SHA-256 |
| --- | --- | ---: | --- |
| 31 | [Noether Braid Topological Charge](../../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md) | 363 | `a34ea3690f85e2edd088a6cd29ef4b43b897e0dce0408f50e09caa2f2528b15f` |
| 32 | [Noether Sea Pro/Anti Coupling](../../../../content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md) | 103 | `b5c69b1a1149a7fd2b5a08fb312f94a21cb2de569213032ab1b5cf29d57d0ea5` |
| 33 | [Molecular Exclusion and Noether Sea Response](../../../../content/markdown/aaa/spacetime/molecular-exclusion-and-noether-sea-response.md) | 134 | `034f83bc1d92c3cf7737c994150a6366871926a41ae8ec29765888a33e1d821d` |

This is a mathematical/editorial review of those complete chapters, with bounded companion checks; it is not a whole-review claim for every linked owner, a current external-data audit, a physical branch certificate, or a fresh scientific computation. Independent references below are explicit algebra and geometric counterexamples. Agreement between models or reviewers is not used as scientific evidence. No model adoption or measured productivity/burden conclusion is made.

## TC28-01 — Frame degeneracy does not establish phase collapse

Severity: medium. Classification: demonstrated unsupported implication; missed propagation of an already corrected distinction. Target: Topological Charge, source line 213, following its selected determinant admission floor.

Before:

> When this floor fails, the three phases no longer supply an independent return chart, so $c_1$ must be suspended rather than compared across the degeneracy.

Proposed after:

> When this floor fails, the selected rank-three oriented-frame chart is inadmissible, so its $c_1$ export must be suspended pending a separately certified continuation or lower-rank chart. Dependence of the retained plane normals alone does not show that phase variables collapse or that recurrence or frequency lock is lost.

The existing admission rule is retained. The defect is the additional inference from dependence of plane normals to loss of independent phase coordinates. [Configuration Space, Angular-Momentum Frame](../../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md#angular-momentum-frame), source lines 184–199, and [Three-Binary 4:2:1 Frequency Lock](../../../../content/markdown/aaa/noether-braid/three-binary-4-2-1-frequency-lock.md), source lines 194 and 703, distinguish loss of frame conditioning from planar paths, phase collapse, or loss of recurrence/locking. Those passages were inspected directly; last-touch identity is not used to assign the cause of the missed propagation.

Independent reference, derived at prescribed-geometry grade: take three circular paths with unit normals $\mathbf e_x$, $\mathbf e_y$, and $(\mathbf e_x+\mathbf e_y)/\sqrt2$. Their normal determinant vanishes. Each circle still admits its independently specified phase parameter. Assigning commensurate rates $1,2,4$ additionally supplies recurrence in this prescribed example despite the dependent normals. This is a counterexample to the geometry-only implication, not an EOM solution or a certified physical branch. A positive determinant floor can legitimately restrict this chapter's chosen chart without proving that every other phase chart fails outside that domain.

Falsifier: an additional theorem establishing phase-map rank loss from the declared branch assumptions could justify the stronger implication on that domain. The determinant admission rule alone is insufficient. Owner follow-up: the existing Noether braid chapter owner can apply the one-paragraph replacement after operator acceptance; no relaxation of admission or new invariant is proposed.

## MEX28-01 — Six theory-name tokens in ordinary prose

Severity: low. Classification: naming-only violation of AGENTS.md's formal theory-name rule. Native `rg -n '\bAAA\b'` finds six bare tokens in Molecular Exclusion, on lines 3 (two), 5, 61, 111, and 121. These are ordinary theory references, outside literal paths, code, or interoperability exceptions.

| Source line | Exact before fragment | Proposed after fragment |
| --- | --- | --- |
| 3, first | `not an AAA derivation of chemistry` | `not an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of chemistry` |
| 3, second | `a future map from AAA assembly and medium primitives` | `a future map from $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly and medium primitives` |
| 5 | `The exploratory AAA question` | `The exploratory $\mathbb{A}\mathbb{A}\mathbb{A}$ question` |
| 61 | `A possible AAA mapping` | `A possible $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping` |
| 111 | `not AAA-level mechanisms` | `not $\mathbb{A}\mathbb{A}\mathbb{A}$-level mechanisms` |
| 121 | `not an AAA premise` | `not an $\mathbb{A}\mathbb{A}\mathbb{A}$ premise` |

Independent reference: the explicit naming requirement in AGENTS.md, checked against the six source occurrences. Falsifier: an applicable documented exception for these ordinary prose tokens. The bounded replacement changes no equation, comparison datum, coupling hypothesis, or scientific conclusion.

The [Molecular Exclusion September review](../../aaa-corpus-rewrite/evidence/crw-005-molecular-exclusion-review-2026-09-11.md) and its [work-queue disposition](../../aaa-corpus-rewrite/work-queue.md) explicitly retain F1–F6 as deferred and reopenable, with F7's exploratory framing accepted. Those historical findings concern biological examples, domain, excluded-volume meaning, propagation, notation, and sources; this naming-only group neither accepts nor repairs them. Their reopening conditions remain a new operator-authorized bounded repair pass or relevant upstream assembly evidence. CRW-005 remains closed at its recorded review/disposition scope.

## Whole-chapter dispositions and independent checks

Topological Charge: read the definitions, root-module and signed-fold accounting, return-degree construction, chart assumptions, candidate charge, admissibility, transformations, comparison interpretation, and open obligations. The chapter distinguishes the return-map degree pair from a curvature/Chern integral and does not infer a physical classification merely from candidate labels. Rank and signed-event algebra is conditional on its declared regular roots, retained record set, and admissible continuation; the review does not certify those conditions for an actual assembly. TC28-01 is the sole new substantive correction found in this whole chapter. Falsifier for the no-change portions: a retained admissible example violating the stated degree/signed-root bookkeeping, or a passage using those conditional definitions as an established physical result.

Pro/Anti Coupling: read the orientation convention, population domain, three equations, imbalance bound, four-member motif, effective phenomenology, related descriptions, and claim scope. No new actionable correction was found. Complementary labels are explicitly insufficient for antiparallel paths/cancellation, equal counts are insufficient for transparency/stability, and four is explicitly not minimal for count balance. The physical orientation invariant and coupling law remain hypotheses to derive. Falsifier: an unconditional dynamical or transparency conclusion inferred solely from the displayed density identities, absent additional retained-history evidence.

Molecular Exclusion: read the exploratory framing, nitrogen union estimate, air-density examples, kinetic regime, coupling separation, excluded-volume levels, transmission comparisons, and fixed-background distinction. The ideal gas law, Bondi spheres, mean-free-path estimate and ordinary material examples are effective comparisons, not premises of an architrino-level derivation. The text correctly separates packing, Knudsen regime, and channel coupling; no molecular-to-substrate derivation is claimed. Existing deferred source/model issues are preserved, not declared resolved. MEX28-01 is the sole new correction group.

An independent spherical-cap construction, $h=r-d/2$ and $V_\cap=2\pi h^2(r-h/3)$, was checked first on coincident unit spheres ($4\pi/3$) and touching unit spheres (zero). Only after those known controls passed was the declared nitrogen example evaluated by Node arithmetic: overlap $7.64454$ cubic angstroms, union $23.55252$ cubic angstroms, molar core $14.18366$ cubic centimeters. Effective ideal-gas arithmetic at $298$ kelvin and $101325$ pascals gives molar volume $24453.09509$ cubic centimeters, occupancy $0.05800$ percent, number density $2.46273\times10^{19}$ per cubic centimeter, and spacing $3.43712$ nanometers. This supports the displayed rounded occupancy/spacing estimate under the declared convention; it does not independently establish the radii, current atmospheric composition, biological assertions, mean-free-path source, or a Noether sea response. No wake-speed parameter is instantiated in this effective comparison calculation. Falsifier: different declared radii/overlap convention or thermodynamic inputs; the arithmetic is not universal excluded volume.

## Previous-repair and actual no-change rechecks

These samples use the actual [September Pro/Anti review](../../aaa-corpus-rewrite/evidence/crw-005-noether-sea-pro-anti-coupling-review-2026-09-11.md) and its accepted F1–F6 disposition in the [CRW work queue](../../aaa-corpus-rewrite/work-queue.md), rather than inventing prior no-change decisions. Current source passages were read directly.

1. Accepted repair F1 survives. The present imbalance paragraph distinguishes the signed density difference from the full ambient balance diagnostic and preserves independent neutral-pairing and orientation/polarization terms. Independent algebra: equal population densities give zero difference, while neutral residual zero and orientation residual norm equal to its positive scale give diagnostic square one. This counterassignment is not an evolved sea. Correctness, usefulness, and the organizing hypothesis survive at their separate scopes; the hypothesis is not proved. Falsifier: renewed identification of the full diagnostic with normalized signed density without the missing reduction theorem.
2. Accepted repair F3 survives. The population paragraph requires classified orientations, identical normalized smoothing and resolved-contribution exclusion, and positive reference density. For separately supplied signs $o_s=\pm1$, the projections $\rho_\pm=\sum_s W_\ell(\mathbf X-\mathbf X_s)(1\pm o_s)/2$ add to the selected carrier density and differ by the signed projection; positive reference density makes $n$ defined. The repair exposes rather than hides unresolved classification. Falsifier: assigning unresolved carriers a sign by convention, unmatched projection rules, or a zero reference density.
3. Actual previous no-change survives. The September review's opening explicitly retained the three displayed equations as consistent definitions on a declared two-class population. Those equations still define total density, positive-reference normalization and signed difference. For nonnegative $a,b$, $a+b$ and $a-b$ invert as $a=((a+b)+(a-b))/2$, $b=((a+b)-(a-b))/2$, giving the stated absolute bound; fractional imbalance requires positive total. This independently rechecks the retained algebra, not physical balance or stability. Falsifier: a mismatch in definitions/domain or a promotion of that algebra into a stability theorem.

## Validation, remaining scope, and handoff

The unchanged existing `.tmp/ops-031-effective-proposal-oct12/validate.mjs` was run with its known math/code/blockquote/fenced-link and valid/invalid TeX controls before the three targets. Its singleton/fair-bit controls also passed. It checked KaTeX parsing and local file existence: Topological Charge 132 math spans, 22 displays/viewer links, 37 local-file occurrences; Pro/Anti 27 spans, 3 displays/viewer links, 19 local-file occurrences; Molecular Exclusion 61 spans, 5 displays/viewer links, 15 local-file occurrences. This does not check link fragments, browser appearance, mathematical truth, external source currency, or physical acceptance. Independent arithmetic known controls and target results are recorded above.

Final `cmp` checks passed for all three source/frozen-copy pairs, and `shasum -a 256` still returned the table identities; `wc -l` confirmed 600 total lines. The existing validator also passed this receipt (26 math spans and nine local-file links). Scoped `git diff --check` and new-file `git diff --no-index --check /dev/null` produced no whitespace diagnostics; the latter returned its normal difference status 1. No source, reference instrument, generator, or scientific acceptance record was changed. Only this receipt and task scratch belong to this child review. Parent coordination must reconcile the interrupted earlier review and persist completed sequences 31–33, remaining cursor, owner routing and next due dates; this receipt alone does not advance a shared cursor. No deadline is declared completed by a sample. The two proposed groups await disposition and separate repair verification.

# OPS-031 — Entropy review, October 8, 2026

## Scope and source

The due priority-1 pass reads all 993 lines of [Entropy](../../../../content/markdown/aaa/dynamics/entropy.md), in textbook order after Energy. The source is unchanged from the accepted September 10 integration: `shasum -a 256` measures `bf462293a13b9c9b26376454361be6b146155dfcd1c46e08415adb9e66395f2c`, and the inspected copy is retained in `.tmp/ops-031-oct08/entropy-source.md`. Nearby Energy definitions and the historical ENT-1–ENT-14 dispositions were checked at their relevant claim scopes. No substantive source was edited, and CRW-005 remains closed.

The coordinator and a separate report-only reviewer both read the complete chapter. Independent support is the finite probability constructions and thermodynamic balance derivation below; agreement between reviewers is not that support. The same model lineage and October 4 evaluation remain applicable. No new-model comparison, superiority claim, measured review time or operator-burden estimate is supplied.

## ENT08-01 — Specify positive reference-bath temperature

**Disposition:** medium, proposed bounded comparison-domain clarification; not implemented. Lines 278–302 define availability and state an upper bound on useful work, but do not explicitly require the fixed bath temperature to be positive. The earlier entropy-energy derivative does not impose that sign. Energy's positive-temperature requirement at line 690 concerns its separate production diagnostic and does not establish the domain of this work bound.

**Before, line 290:**

> Here $S_{\mathcal Q,W}$ must be thermodynamic entropy for the same effective state and reservoir model. The usual work bound additionally assumes a closed material system, one fixed-temperature bath $T_R$, the first- and second-law thermal comparison, and a declared useful-work channel with control, reset, and boundary costs included. Under these assumptions,

**Proposed after:**

> Here $S_{\mathcal Q,W}$ must be thermodynamic entropy for the same effective state and reservoir model. The usual work bound additionally assumes a closed material system, one bath at fixed strictly positive temperature $T_R>0$, the first- and second-law thermal comparison, and a declared useful-work channel with control, reset, and boundary costs included. Under these assumptions,

The independent reference is the stated effective first- and second-law balance. Let $Q$ denote heat entering the material system, $W$ its net useful work output, and $\Delta S_{\mathrm{tot}}$ the combined entropy change of system and bath after the declared costs are included. Then $\Delta E=Q-W$ and $\Delta S_{\mathrm{tot}}=\Delta S-Q/T_R\ge0$. For fixed nonzero $T_R$ and $A=E-T_RS$, substitution gives

$$
W=-\Delta A-T_R\Delta S_{\mathrm{tot}}.
$$

Positive temperature makes the second term nonpositive, giving the printed upper bound. Negative temperature reverses that inference; zero temperature is outside this division-based derivation. The neighboring claim that increased entropy reduces availability at fixed energy also uses $T_R>0$, since $\partial A/\partial S=-T_R$. As a purely algebraic comparison with $c_f=1$ and chosen entropy/temperature units, $T_R=-1$, $\Delta E=\Delta S=0$ and $Q=W=1$ give $\Delta S_{\mathrm{tot}}=1$ and $\Delta A=0$: both declared balances hold while $W\le-\Delta A$ fails. This is not a constructed reservoir, admissible Architrino history or permission to investigate a negative-temperature scenario.

**Claim grade:** derived for the sign dependence under the declared effective balances; inferred for the need to make the comparison domain explicit. **Falsifier:** an applicable existing definition restricting this chapter's reference bath to strictly positive temperature would remove the omission, or a different declared heat/work convention would require re-derivation. No such shared restriction was located by the scoped `rg` search of Energy and Entropy. The smallest repair changes one phrase and preserves every equation and link. The [corpus owner's referral](../../aaa-corpus-rewrite/work-queue.md#ops-031--october-8-entropy-referral) retains the decision.

## ENT08-02 — Distinguish temperature from absolute time

**Disposition:** low, demonstrated notation mismatch; proposed and not implemented. The same-record tuple at line 743 uses bare $T$ for temperature. The [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md) reserves bare $T$ for absolute time and requires a distinguishing temperature subscript. The accompanying prose makes the intended meaning recoverable, so this does not change a mathematical result.

**Before:** the second tuple entry is `T,\,`.

**Proposed after:** the second tuple entry is `T_{\mathrm{temp}},\,`.

**Claim grade:** measured by direct comparison of the tuple with the guide's notation rule. **Falsifier:** an accepted exception covering this tuple, or an interpretation as absolute time compatible with its temperature explanation, would remove the mismatch. The equation's viewer identity and all other tuple entries must remain. This is a bounded notation proposal, not authority to regenerate the equation registry today.

## Retrospective checks and retained results

1. **Accepted ENT-1, lines 91–147: survives.** Four equal-probability histories give record/conditional entropies $(0,\log4)$ for a constant record, $(\log2,\log2)$ for two equal fibers and $(\log4,0)$ for the exact record. The separate reviewer also used six equiprobable histories partitioned into groups of sizes 3, 2 and 1: outcome entropy $1.0114042647$ plus conditional entropy $0.7803552045$ equals $\log6$. Direct finite counting and the chain rule establish the opposite refinement directions. Correctness and the original distinction survive; the worked example makes the distinction useful. A same-measure finite partition violating that chain rule would overturn this check.
2. **Accepted ENT-11, lines 850–872: survives.** For binary reset error probability $p=0.1$, direct evaluation gives residual entropy $h(p)=-p\log p-(1-p)\log(1-p)=0.3250829734$, rather than $p$. Subtracting that residual from the initial fair-bit entropy gives $0.3680642072$ in dimensionless entropy units. The corrected bound preserves the initial-minus-final account and explicitly excludes accessible side information. Correctness, meaning and explanatory usefulness survive. A changed initial distribution, accessible correlated copy or different reset-error model would change the comparison rather than contradict this scoped calculation.
3. **Previous no-change kinetic conjugacy in Energy: survives at claim scope.** The October 6–7 disposition uses $P'=K'/s$ and $\ell=sP-K$. Direct differentiation gives $\ell'=P+sP'-K'=P$ on its declared domain. This checks the retained algebra, not a conserved global delayed-history charge. Correctness and meaning are preserved; no further explanation is needed for this already-defined construction. A domain where the stated derivative relation fails would reopen that disposition. This adds no Energy whole-chapter credit.

The fixed-measure refinement distinction, conditional receiver fiber, signed response trace, net-versus-gross work distinction, correlation correction, finite-edge injection bound, coding overhead, transported-reference condition, map-change subtraction and compatible horizon-label count retain their stated conditional scopes. The finite reference script `.tmp/crw005-entropy-review/mathematical-checks.mjs` was preserved and rerun: its singleton/fair-bit and equality controls pass before its examples. It reproduces the chart-only subtraction, correlated-copy marginal change, compatible two-patch count, signed trace, gross/net work, nonadditive optimizations, reset entropy and reference-rescaling constructions. These are finite algebraic checks, not physical realizations.

An apparent concern about deterministic evolution preserving entropy was rejected: the chapter already requires invertibility and a preserved reference measure, with quasi-invariance explicitly distinguished. An apparent area-law inference from crossing-edge capacity was also rejected: the injection assumption and separate positive entropy-density obligation are stated explicitly. No introduced substantive regression is established by these checks; the newly noted positive-temperature omission is present in the unchanged September 10 source, so it is not attributed to the recent repair batches or an editor.

Thermodynamic reduction, physical preparation weights, quantum factorization and Born recovery, candidate assembly mass, horizon-label realization, positive area density and the proposed common boundary functional remain existing scientific obligations. This pass does not solve them or add new experiments. External references retain the September review's recorded verification boundaries; no fresh full-source audit or browser layout/navigation check is claimed.

## Validation and coverage

The preserved `.tmp/crw005-entropy-fixes/validate.mjs` passes its quoted-math, link, display-parser, KaTeX and alignment fixtures before checking this target. It accepts 306 math expressions, 54 display equations, 54 viewer identities and 70 local-file occurrences. The 10 historical formula changes are measured against the preserved pre-September-integration snapshot, not changes made today. The preserved `check-links-order.mjs` passes its TOC/heading controls first, resolves all 11 Markdown fragment occurrences and places Entropy before Binary Dynamics. Viewer navigation and whole-repository validation are not established by these checks.

This receipt adds one whole priority-1 path: 12 of 15 early chapters complete, with Binary Dynamics, Causal Action Functional and Effective Lagrangian remaining. Total whole-path coverage becomes 34: 12 early, 8 core, 10 supporting and 4 validation. Next early reservation is Binary Dynamics October 9–10; Causal Action October 11, Effective Lagrangian October 12 and October 13 buffer remain. Core resumes October 12, supporting October 13 and validation October 22. Full-cycle deadlines remain October 13, December 13, March 13 and September 13. No sample completes a cycle; substantial-derivation carryover is still the schedule risk.

Final `cmp` returns exit 0 against the preserved chapter snapshot, and `shasum -a 256` returns the same source hash. Empty `comm -3` between sorted live Markdown paths from `rg --files` and launch JSON paths from `jq` verifies the same 199-path population. The dated `.tmp/ops-031-oct08/validate-records.mjs` passes math/code/fenced-link and valid/invalid KaTeX controls before the two new receipts, accepting 36 expressions and three local paths. Its singleton/fair-bit and failed-equality controls precede retrospective arithmetic and the positive/negative bath algebraic witnesses, which pass. Scoped `git diff --check` passes for the four changed existing control records. New receipt whitespace checks use `git diff --no-index --check /dev/null`; exit 1 with no diagnostics denotes the new-file difference. No generated write, publication or substantive corpus edit occurred.

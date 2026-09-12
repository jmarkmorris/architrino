# CRW-005-17 — Units and Constants review and bounded repair

## Scope and disposition

**✓ Done — complete chapter review and bounded repair, 2026-09-12.** The assigned [Units and Constants chapter](../../../../content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md) has seven demonstrated findings, UC-1 through UC-7, repaired and reviewed below. Completion concerns this document's definitions, mathematical implications, and claim boundaries. It does not establish a physical assembly, a stable binary, solver certification, conserved physical energy, a regulator-independent limit, or particle calibration. Shared HQ status integration remains with the coordinator.

The exclusive durable write targets are the chapter and this report. The explicit assignment authorizes repair and supersedes the review-only default in the [corpus review procedure](../../../office-of-research/cto/prompts/corpus-reviewer.md). The live [CRW-005 procedure](../work-queue.md#crw-005--independent-post-conversion-assurance-review) supplies evidence coverage; the current [review board](../corpus-review-status.md) and assignment control item 17. The older scope/count prose in the work-queue entry is historical context, not a reason to skip this fresh review. No shared HQ record, other chapter, controlled guide, generated artifact, or software source was edited by this task. No Git publication or worktree operation was performed. Disposable checks and receipts are in `.tmp/crw005-units-review/`.

Claim grade: measured for the source inventory and validation results, with instruments named below; derived for the algebra and geometric counterexamples; inferred for the bounded editorial dispositions. Falsifier: a changed source snapshot, failing stated calculation, unresolved listed defect, or a resolving hypothesis in the cited original passage reopens the affected disposition.

## Source identity and comparison

The entire 103-line incoming chapter was inspected using `nl -ba` and `cat`. Scoped `git --no-optional-locks status --short -- <chapter> <report>` produced no entries before editing; the report was absent. `shasum -a 256` measured the incoming chapter as `e8318f1f229e8bffe35478e299e319a27160088fd2d42c1e5e5f402658e64f2a`. The scratch snapshot `before.md` preserves those bytes for focused comparison. The repaired chapter hash is `a3161b0d24837c5788c036bff1eb5fea2ceb03cff6315e2f38ae2f5f38d53313` by `shasum -a 256`; it has 109 source lines by `nl -ba`.

The pre-campaign source was read with `git show 897fe1aa7:content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md`, and its entire difference from the incoming chapter was inspected with `git diff 897fe1aa7 -- <chapter>`. The normalization, assembly-scaling, general self-hit-onset, memory, and tolerance passages already appear in that historical source. The conversion changed the opening, headings, terminology, spacing, and concluding restatement; it did not introduce those mathematical passages. This establishes presence in those two inspected states, not a first-cause attribution to any commit or author. All seven existing displays and viewer IDs are preserved in the current repair, as measured by the focused parser below.

The live authorities actually used for substantive claims were:

| Authority | Inspected location and role | SHA-256 measured during review |
| --- | --- | --- |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Lines 83–163: continuous history integral, simple-root weight, and playback; 654 onward: auxiliary regulator; 981–1036: boundary and root regularity; 1216–1258: self-hit interval-speed lemma; 1755–1816: historical direction, continuous emission, and dimensions. | `bb7357868a4f900aa566b8a43107d111dcd435cab677361f9bba3dceaadb384b` |
| [Parameter Ledger](../../../../content/markdown/aaa/validation/parameter-ledger.md) | Lines 77–94: symbol ownership; 228–289: regulator status, dimensions, and natural two-body scales; 379–401: charge reconstruction and its non-derivation boundary. | `685bafb5d5d9abc06efb9c8c40c180e33b4c043fabc565cbcbc64e8b682cdb52` |
| [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md) | Uniform circular self-root geometry and lines 1069–1124: uncertified maximum-curvature state, conditional reference radius/period, and natural units. | `0e22955268c871d1756e15a298b2c054e1f525c6a8d3f9d2764b83977d066d2d` |
| [Numerical Recipe and Stability](../../../../content/markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md) | Entire recipe: root isolation, complementary-domain exclusion, error bounds, continuous emission, mollifier support, core separation, and distinct convergence/stability obligations. | `a1aee0ecc7edff25896ddab493415301afb0783058f7d73c47d7b13952a8633e` |

Foundations and the academic, mathematical, and terminology authorities were consulted for the substrate layer, coordinate conventions, and reader-ready exposition. The neighboring [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) was read for comparison, but its broad impulsive/smoothing wording was not treated as proof over the actual continuous-emission law or the more precise current numerical recipe. That neighboring chapter remains outside this task's repair scope. The Master Equation's early floor-warning prose at line 163 also does not override its explicit simple-root and boundary hypotheses: failure of a chosen positive margin is not the equation saying the derivative vanishes.

A read-only mathematical review ran alongside implementation under the assignment label **CRW-005-17 mathematical review**, immutable subagent ID `/root/units_math_audit`. It inspected the incoming snapshot and supplied the similarity, straight-history, and delayed-direction arguments. It ran no numerical instrument and edited no files. Its agreement supplies scrutiny; the displayed algebra and explicit counterexamples, rather than a second agent's agreement, supply independently checkable evidence. The chapter editor's final review remains self-review.

## Findings and repairs

### UC-1 — Unit normalization omits the conversion map and dimensional input scaling

**Severity:** medium. **Original locations:** lines 7–18 and 74–85. **Disposition:** ✓ Done — definitions and conversion conditions repaired at current lines 14–22 and 90.

The original equality joining dimensional wake speed, chosen units, and the number one does not explicitly distinguish a physical quantity from its numerical value. The statement that rescaling the two units leaves all dimensionless predictions invariant omits the simultaneous conversion of coupling, width, and reference geometry. Its intended physical invariance is valid; the missing conversion map makes it unsafe as numerical guidance.

From the unchanged acceleration law, the transmitter factor is dimensionless, so $[\kappa\epsilon^2/r^2]=\mathrm L\mathrm T^{-2}$ and therefore $[\kappa]=\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$. Choose $T_0=L_0/c_f$. The numerical wake speed is $c_fT_0/L_0=1$, and normalized velocity is $\mathbf V T_0/L_0$. Enlarging both units by $a>0$ at fixed polarity unit divides numerical coupling by $a$, since its length and time powers contribute $a^{-3}a^2=a^{-1}$. Numerical lengths, durations, and widths likewise divide by $a$; speeds do not. Holding numerical coupling and geometry fixed would describe a different dimensional system.

The coupling control is correct: $g_\kappa=\kappa\epsilon^2/(c_f^2L_\star)=R_*/L_\star$. It is preserved and explained, including $g_\kappa=1$ when $L_\star=R_*$. This is a reference-scale ratio rather than an independent dimensionless parameter of the bare two-body law. The repair also defines the previously unglossed transmitter/receiver roles and dimensional symbols.

Claim grade: derived for the dimensional exponents and conversion map. Falsifier: a different dimensional acceleration contract, or an explicit original conversion rule making all affected quantities transform consistently, would overturn the corresponding defect classification. Inspect the chapter's coupling equation and Parameter Ledger's dimensional row.

### UC-2 — Pointwise coupling scaling is promoted to an unsupported smallest/fastest assembly

**Severity:** high. **Original locations:** lines 21–22 and 38–39. **Disposition:** ✓ Done — fixed-history qualification, natural scales, and conditional similarity added at current lines 25–26 and 43–44.

The original text moves from linear dependence on coupling to a smallest sustainable orbit and a fastest natural frequency, then says stronger coupling favors tighter, faster structures. Linear dependence holds only while evaluating the same histories and regulator prescription. Evolved separations, weights, root sets, and stability need not remain fixed. Binary Dynamics explicitly treats the maximum-curvature reference radius and period as conditional outputs.

A direct similarity calculation supplies a stronger, checkable correction. Let $\alpha>0$ and let $\mathbf X_i(T)$ solve the bare sharp law with coupling $\kappa$. Set

$$
\mathbf X_i^{(\alpha)}(T)=\alpha\mathbf X_i(T/\alpha),
\qquad \kappa^{(\alpha)}=\alpha\kappa.
$$

The chain rule gives unchanged velocities and acceleration divided by $\alpha$. Scaling both emission and reception times multiplies each delayed distance and delay by $\alpha$, preserving the causal equality, direction, root identity, and transmitter weight. The right-hand side scales as

$$
\frac{\alpha\kappa\epsilon^2}{(\alpha r)^2}W^{\mathrm{acc}}\hat{\mathbf r}
=\frac1\alpha\frac{\kappa\epsilon^2}{r^2}W^{\mathrm{acc}}\hat{\mathbf r}.
$$

Thus a corresponding periodic solution, if one exists, has radius and period multiplied by $\alpha$ and frequency divided by $\alpha$. This invalidates the unsupported universal tighter/faster inference without importing a force, energy, or Kepler law. For a normalized mollifier of fixed shape, $\delta_{\alpha\eta}(\alpha g)=\alpha^{-1}\delta_\eta(g)$; the emission-time measure scales by $\alpha$, so the same result extends only if width, any core prescription, and all domain/boundary scales transform consistently. Fixed width changes $\eta/R_*$ and is a different regularized problem.

Claim grade: derived, conditional on an existing solution and the stated homogeneity/domain assumptions. The report and chapter make no existence, extremality, or stability claim. Falsifier: substitute the scaled paths into a declared kernel containing an additional unscaled dimensional parameter, or show failure of the chain-rule/root correspondence. That would defeat that family's similarity, not establish a universal coupling trend.

### UC-3 — Surface width is assigned excessive smoothing and stability authority

**Severity:** high. **Original locations:** lines 3, 9, 25–26, 30, and 73. **Disposition:** ✓ Done — regulator role, distance-gap definition, domain requirements, resolution scales, and limit boundary repaired at current lines 3, 9, 29–30, 34, and 78.

The original paragraph promises smooth pointwise quantities and numerical stability from a small wake width. Surface mollification smooths the causal distance-gap distribution. It does not automatically control inverse-square coincidence, retained-history regularity, numerical resolution, or an entire zero-width family. The original delta also uses an undefined $\Delta$; the repair supplies $\Delta T=T_r-T_t$ and keeps symbolic $c_f$ in the distance gap.

A direct coincidence witness uses $c_f=1$ and a prescribed straight self-history $\mathbf X(T)=T\mathbf e_x/2$. At reception time zero, $r=\Delta T/2$ and the gap is $-\Delta T/2$. Any fixed smooth nonnegative mollifier with $\delta_\eta(0)>0$ is bounded below by a positive constant near that endpoint. The magnitude of its history-integrand contribution then contains a positive constant times $1/(\Delta T)^2$, whose integral diverges near zero. Excluding the single zero-delay endpoint does not remove that neighborhood. This is a counterexample to automatic regularity from surface smoothing, not an evolved solution or a claim that every regulator diverges.

Away from zero derivatives, first-order changes of the gap give reception and emission traversal times $\eta/|D_r|$ and $\eta/|D_t|$. A small geometric ratio does not ensure the integration or quadrature resolves either scale. The repair requires a controlled contributing domain, a separation floor or separate core treatment, fixed-regulator numerical refinement, and a distinct regulator-limit study. Continuous uniform emission already gives an acceleration function on smooth simple-root branches; no physical pulse train is introduced. A resolved finite-width result remains finite-model evidence even before a sharp-limit theorem exists.

Claim grade: derived for the endpoint lower-bound counterexample and traversal-scale calculation; inferred for the repair's numerical-scope disposition. Falsifier: a specified domain/core prescription that bounds the complete contributing integrand defeats that particular coincidence witness; an independent stability/convergence theorem covering the proposed discretization and refinement family would support a stronger numerical claim. Width alone supplies neither condition.

### UC-4 — A circular speed threshold is presented as a general self-hit switch

**Severity:** high. **Original location:** line 57. **Disposition:** ✓ Done — history-dependent criterion, counterexample, and circular scope made explicit at current line 62.

For $c_f=1$, uniform straight motion $\mathbf X(T)=2T\mathbf e_x$ has self-distance $2\Delta T$ and causal gap $\Delta T>0$ for every positive delay. Its speed is above one everywhere, but it has no nontrivial self root. Consequently the speed boundary alone cannot identify a self-hit onset.

For a uniform circle, let $u=\omega\Delta T/2>0$. The chord condition instead becomes $u=s|\sin u|$. For $s\le1$, the strict inequality $|\sin u|<u$ excludes a positive root. For $s>1$, $s\sin u-u$ is positive immediately to the right of zero and negative at $u=\pi$; continuity gives a principal positive root between them. At $s=1$ the onset is the excluded zero-delay limit, not an admitted positive-delay hit. A finite memory window may still omit the root. These are prescribed-history geometry statements, not acceleration-balance or stability evidence.

The general necessary interval-speed condition comes from the triangle inequality: chord length cannot exceed integrated speed. Equality with no super-wake-speed segment is the degenerate straight wake-speed case under smooth simple-root assumptions. A currently sub-wake-speed receiver can therefore still encounter roots from earlier history.

Claim grade: derived. Falsifier: a positive delay satisfying $2\Delta T=\Delta T$ for the stated straight history, or a failure of the circular chord/continuity argument on its stated complete history. Inspect the exact causal-root equality, not only sampled speeds.

### UC-5 — Retained lookback coverage is left ambiguous as a completeness condition

**Severity:** medium. **Original locations:** lines 65 and 103. **Disposition:** ✓ Done — scope, empty-set convention, canonical history symbol, support margins, and omitted-history boundary added at current lines 70 and 109.

The inequality between stored horizon and longest active lookback is correct as a necessary coverage condition. It does not certify that all relevant roots have been found. For a stationary transmitter at zero and receiver at distance one, with $c_f=1$, the full causal root has delay one. A search retaining only horizon $1/2$ finds no root; assigning its empty retained maximum zero makes the inequality pass while omitting the full contribution. The defect is the missing completeness qualification, not the inequality itself.

The repair uses $H_{\mathrm{hist}}$, the Parameter Ledger's history-horizon symbol, defines the maximum over the declared scan, and reserves the zero maximum for a certified empty set. It requires boundary/domain evidence or an explicitly finite-memory model or bounded omitted contribution. Finite-width support and interpolation need their own margins; a Gaussian tail cannot be declared absent merely because it falls outside a finite stored interval. The diagnostic window must be positive.

Claim grade: derived for the stationary-root example; inferred for the missing-scope finding. Falsifier: an independently established exhaustive lookback bound covering the admitted full-history model would remove this limitation. Inspect the search domain and omitted-tail evidence, not only the maximum in the found-root list.

### UC-6 — Root variables are undefined and a finite derivative threshold is called a caustic

**Severity:** medium. **Original locations:** lines 86–103, particularly line 95. **Disposition:** ✓ Done — history and derivative definitions, conditioning/error limits, unresolved roots, and boundary events repaired at current lines 100–101 and 109.

The original formula leaves the history function, index roles, and $J$ undefined. Its nonzero tolerance test then calls a small derivative a branch-birth or caustic zone and contrasts that with an ordinary stable branch. A threshold miss need not be a zero derivative, and root regularity is not a dynamical stability criterion.

For the stated distance-gap residual, define $\phi_k(u)=\mathbf X_k(T_r+u)$, with $i$ the receiver and $j$ the transmitter. Differentiation in delay gives $\partial_{\Delta T}g=-D_t$. With $T_\star=L_\star/c_f$, the chapter's explicit local normalization is

$$
J=\frac{\partial(g/L_\star)}{\partial(\Delta T/T_\star)}=-\frac{D_t}{c_f}.
$$

This is the normalized delay derivative; the normalized emission-time derivative has the opposite sign. The original absolute-value test concealed this distinction. Both $J$ and its tolerance are dimensionless.

An exact witness sets $c_f=L_\star=T_\star=1$, receiver position $1/4$ at reception zero, and transmitter history $X_j(T)=3T/4$. For positive delay, $g(\Delta T)=(1-\Delta T)/4$, so the root at one is simple with $J=-1/4$. Choosing the warning tolerance $\varepsilon_J=1/2$ triggers the warning without a singular root or fold. A stationary transmitter and a receiver whose distance passes through a fixed history horizon give a separate boundary entry/exit with $J=-1$.

The original residual condition says “only when,” so it is retained as necessary rather than misreported as a false sufficiency theorem. The repair supplies the missing acceptance bounds: existence and isolation, interpolation/evaluation uncertainty, and an interval-wide derivative floor. The mean-value theorem gives normalized root-time error at most $(\varepsilon_{\mathrm{root}}+\varepsilon_g)/j_{\min}$ when the certified floor is $j_{\min}>0$ and the normalized gap error is bounded by $\varepsilon_g$. The linear witness attains this bound: at delay two the residual magnitude is $1/4$, the floor is $1/4$, and the root-time error is one. Genuine nearby roots are unresolved when the separation tolerance cannot distinguish them; they must not be discarded or merged. Interior folds require actual derivative zero and the nondegeneracy conditions, while boundary events are recorded separately.

Claim grade: derived for the derivative, witnesses, and error bound; measured by source inspection for absent definitions. Falsifier: a resolving original definition or an additional original hypothesis forcing every threshold miss to be a singular root; alternatively, an isolated-root example violating the stated mean-value bound with all error assumptions met. A computed stability spectrum would need a separately established EOM solution before it bears on physical stability.

### UC-7 — The opening collapses historical acceleration direction into current pair motion

**Severity:** medium. **Original locations:** lines 3, 33, and 36. **Disposition:** ✓ Done — direction relative to the emission point is explicit at current lines 25, 37, and 40.

The law is radial relative to the transmitter's past emission site. It does not establish increasing or decreasing present pair separation merely from the polarity sign. At $c_f=1$, take receiver position $X_i(0)=1$ and prescribed transmitter $X_j(T)=2+2T$. Emission time $T_t=-1$ gives emission site zero, delay one, distance one, and $D_t=-1$, hence an admitted simple geometrical root. Its unlike-polarity contribution points left toward zero while the transmitter's current site is at two, to the right. Another root exists for this history; the witness concerns this single per-hit direction and asserts no net pair trend or evolved solution.

The repair preserves the sign rule, positive weight, and sum over all roots, while tying attraction and repulsion to the historical line. Receiver-side playback remains $D_r/D_t$ and is not inserted as an extra acceleration weight.

Claim grade: derived. Falsifier: direct substitution into the stated causal equality or direction formula failing; a separate complete-history EOM proof for a restricted pair family could establish a current-separation trend, but would not turn that into a universal per-hit implication.

## Preserved claims and open obligations

The coupling control, speed ratio, circular speed factor, delay/window ratio, normalized width, root residual, and reporting tuple remain mathematically unchanged. The charge relation remains an observer-level normalization target, with the inspected Parameter Ledger explicitly stating its fuller map and $Z_e=1$ convention. No external empirical value, law of standard physics, or new particle identification was used as a substrate premise. No external literature source or URL is added; the original derivations and inspected local authorities support these bounded corrections under [About Architrino's source policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution).

| Status | Open obligation | Evidence needed and checkable reopening condition |
| --- | --- | --- |
| ○ Open — OUC-1 | Existence, selection, and stability of the candidate smallest/fastest binary or other assembly. | An admitted complete-history solution, vector acceleration balance, and independently validated continuation and stability bounds in Binary Dynamics. A failed returned history, unbalanced acceleration, or unstable admitted perturbation defeats the candidate. Natural units alone decide none of these. |
| ○ Open — OUC-2 | Finite-width existence and the claimed surface/core removal limits. | A declared kernel, contributing domain, coincidence treatment, discretization-error control, and uniform continuation/convergence argument for each removed regulator. A divergent endpoint contribution or failure under a resolved refinement sequence defeats the relevant claim. |
| ○ Open — OUC-3 | Root completeness and full-history equivalence of a numerical branch scan. | Certified root isolation and complementary-domain exclusion over the claimed history, with boundary support and omitted-tail control. Finding an omitted admissible root or unbounded discarded contribution defeats completeness. No actual solver run is certified by this review. |
| ○ Open — OUC-4 | Physical conserved accounts and observer-level mass, charge, or particle calibration. | An independently derived compatible charge/boundary account and a demonstrated assembly-to-observer map. Constancy reconstructed from the same acceleration history, or reuse of a measured particle benchmark as input, does not establish those recoveries. These tasks stay with the existing dynamics and calibration authorities. |

## Validation receipt

The disposable mathematical checker `node .tmp/crw005-units-review/check-math.mjs` first passed a known dimension-vector addition, exact fraction equality, and intentionally failing equality fixture, and printed that pass before running target calculations. It then passed two dimensional exponent checks and the fixed-history/similarity, consistent-unit-conversion, straight self-gap, simple-root conditioning/error, finite-history, and per-hit direction calculations at $c_f=1$. The explicit algebra and counterexamples above are the mathematical references; this checker is an arithmetic implementation check, not an independent physical oracle or a solver validation. Its output is retained in `math-check.txt`.

The focused document checker `node .tmp/crw005-units-review/validate.mjs <chapter> <report>` first verifies known positive and negative math/KaTeX, link/anchor, canonical display-parser, and fenced/inline-code exclusion cases before reading its targets. It then renders all extracted chapter/report expressions with the vendored KaTeX bundle, checks local file targets and Markdown fragments, and compares the seven chapter displays and viewer IDs against the incoming snapshot. The generated registry is read only to check those IDs, source paths, and formulae, not to claim fresh generated context. Final counts and strict-validator results are recorded in the completion entry below.

An initial `node scripts/validate-content.mjs --check --strict` after the chapter repair returned exit 0, zero errors, zero warnings, and 30 informational notes. It discovered 391 scene files and 199 corpus Markdown files and audited 1,639 repository Markdown files at that moment. These counts describe that invocation in a concurrent checkout; they are not a campaign completion inventory. Scoped `git diff --check -- <chapter> <report>` is the whitespace check. The final strict invocation follows creation and checking of this report.

The focused registry comparison finds seven stale source-line locations in `content/generated/equation-mapping/corpus-equations.json`: the chapter's original display lines 44, 51, 59, 67, 75, 87, and 97 now begin at lines 49, 56, 64, 72, 80, 92, and 103. All seven IDs and formulae still match. This is generated context/location drift following the source repair; it was not rewritten. The exact deferred command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`, only under the authorized regeneration/publication procedure. Other generated surfaces are not certified fresh by this scoped check.

### Final completion entry

**✓ Done — final source, report, and bounded mathematical checks passed.** The final focused run rendered 163 chapter expressions and 79 report expressions with vendored KaTeX; resolved 13 chapter local-link occurrences and 10 report local-link occurrences, including two Markdown fragments in each file; and preserved all seven chapter display equations and viewer IDs in order with matching generated-registry formulae. Known malformed-math and missing-anchor controls fail as expected before the targets are read. While adding the unmatched-delimiter control, a disposable checker edit produced a JavaScript syntax error before execution; the checker was corrected and its full known-case-first run passed. That failed invocation supplies no target result.

The final strict invocation, after report creation, was `node scripts/validate-content.mjs --check --strict`: exit 0, zero errors, zero warnings, and 30 informational notes. Scoped `git diff --check -- <chapter> <report>` passed for tracked differences; the new report is additionally checked with `git diff --no-index --check /dev/null <report>` because an untracked file is outside ordinary Git diff coverage. That no-index check returned the expected new-file difference status 1 with no whitespace diagnostics; the scoped tracked check returned 0. Final source hashing confirms the chapter digest recorded above. The mathematical checker also passed; all new numerical instantiations used normalized wake speed. The read-only reviewer inspected the repaired chapter and this report and found no remaining actionable issue; this is additional review, not a physical proof.

UC-1 through UC-7 are closed at bounded chapter-repair scope. OUC-1 through OUC-4 remain open at the stated scientific and numerical claim levels. The shared HQ board, priorities, queue, and work log were deliberately outside the assignment's write scope and require coordinator integration. No repository-wide failure was reported by the strict invocation. Generated context/location drift is retained above for its authorized owner. No browser layout, external-link reachability, complete generated-surface freshness, EOM evolution, or scientific closure is certified by these document checks.

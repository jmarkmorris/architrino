# OPS-031 — Action Model Comparison review, 2026-09-25

## Scope and disposition

This report-only pass covers all 433 lines of [Action Model Comparison](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md), the September 24 validation reservation carried forward to September 25. Whole-chapter coverage is complete; it is not certification of a solver, a global energy account, singular continuation, or the annual validation population. No corpus, shared tracker, historical receipt, or generated artifact was edited. CRW-005 remains closed as a completed document-review campaign.

The review found no newly demonstrated substantive mathematical defect. Two independently rechecked mathematical repairs survive. Some accepted editorial items E1–E3 remain incompletely implemented despite their broad historical closeout wording; these are referred under their existing IDs, not counted as a new campaign. Existing O1/O2 scientific and comparison obligations remain open. The new simple-root wording concern is a low-priority clarification, not evidence that a numerical implementation discards degenerate roots.

Measured source identity, by `shasum -a 256` before the full read: `f777f9554efd6d1b702ff426bbebc7a4ed2a90c1e82a22d57b402f82e7e61f4b`. `wc -l` returned 433. Scoped `git --no-optional-locks status --short -- <chapter> <receipt>` returned no entries before writing this receipt. The whole source was read in complete 1–250 and 250–433 ranges; a previous combined read was truncated and was not used as the coverage instrument. Line references below refer to those bytes.

The architrino-review skill, generated startup router, live corpus-reviewer, periodic-document-review owner, academic/math/terminology authorities, and nearby Architrino/Master Equation and regularization passages govern this pass. The review uses the same continuing model lineage as the earlier OPS-031 reviews; no materially different model was adopted, no comparative model trial was conducted, and no superiority claim is made. Independent support below is explicit mathematics and an inspected external mathematical source, not agreement with an earlier reviewer.

## Full-chapter coverage

| Source lines | Coverage and disposition |
| --- | --- |
| 1–27 | Primitive/continuum distinction, normalized wake speed, amplitude and source bookkeeping; neutrality remains the known O1 boundary-data issue. |
| 29–85 | Wave surrogate, point injection, source regularization, stopped-transmitter limit and stencil scope; no imported wave law is asserted as the substrate law. |
| 89–197 | Green kernel, moving-root collapse, stationary impulse, zero-speed limit; D2 repair survives. Simple-root restriction belongs to the collapse formula, with the low wording clarification below. |
| 203–256 | Transport density, continuity injection, canonical acceleration, signed polarities and continuous-root/impulse distinction; no extra receiver factor is present in the displayed law. |
| 258–294 | Gauss/Stokes residuals, discrepancy norm, conservative-channel scope; D1 repair survives. These diagnostics remain conditional on specified maps/domains. |
| 296–317 | Stationary switched-on comparison and method selection; interior/front distinction is correct and shared construction is not called independent validation. |
| 321–367 | Dynamics, causality, energy, numerical conditions, scaling, media and observables; O2 remains open and undefined hit-observable symbols remain part of E1. |
| 368–398 | Method pros/cons; bounded near-source weighting is retained; E1/E2/E3 residual wording and hierarchy gaps described below. |
| 402–422 | Recommendations, arrival-selector smoothing, CFL condition and assembly-claim exclusion; no new defect demonstrated. |
| 424–433 | Sibling map read in full; navigation supplies dependency context, not proof or instrument certification. |

## Preserved accepted-repair rechecks

### D2 — stationary impulse, survives

The [historical review](../../aaa-corpus-rewrite/evidence/crw-005-action-model-comparison-review-2026-09-11.md) identifies D2 and its accepted repair. The actual transition was inspected with `git show 969247319 -- <chapter>`, not inferred from its unrelated commit subject. The parent `969247319^` chapter hashes to `2877a5eb74db370395cd9aa1c7703c692e3d84f6e40e10c225edb8595c0a60f4`; the child `969247319c3e75962b9e380cf9c9bb060bab0db9` hashes to the current `f777f955...` value above, by `git show ... | shasum -a 256`. Thus the exact historical before/after sources remain preserved in Git.

Before, line 184 called the instantaneous impulse field `Q/(4πr)`. After, current line 184 retains the arrival delta and explicitly calls `Q/(4πr)` the time-integrated probe response:

$$
\phi(r,T)=\frac{Q}{4\pi r}\delta\!\left(T-T_{t,0}-\frac{r}{c_f}\right).
$$

Independent derivation: substitute the specified source impulse into the time convolution and pair the resulting distribution with a smooth test function $\psi$. The result is $Q\psi(T_{t,0}+r/c_f)/(4\pi r)$. A finite-valued function restricted to the single arrival instant instead integrates to zero. This distinguishes an impulse from its coefficient without using repository code or a prior verdict as an oracle. For the comparison kernel, Laurent Demanet's [Waves and Imaging notes](https://math.mit.edu/icg/resources/teaching/18.325-fall2012/notes325-nov25.pdf), §1.2.3, printed pages 28–30, equations (1.15)–(1.17), were opened and inspected this pass. Their Green distribution and zero-initial-data Duhamel formula support the mathematical comparison, not primitive dynamics.

Verdict: substantive correctness improved; the single-pulse meaning is preserved; the added integrated-response explanation is useful. Falsifier: a different distributional pairing from the stated convolution would overturn the conclusion. No introduced regression found in this repair.

### D1 — field agreement versus operator identities, survives

The same inspected transition preserves the old operator-residual formula and adds the direct discrepancy-norm explanation now at line 290. Before, the displayed maximum of Gauss/Stokes identity residuals was followed directly by the conservative-potential paragraph; after, the chapter explicitly says these identities do not measure field difference and supplies an $L^2$ discrepancy.

Independent check: on the unit cube, choose compared fields $(1,0,0)$ and zero. Opposite-face flux cancels; divergence, curl, and closed-loop circulation vanish, so both identity residuals vanish. The $L^2$ norm of the difference is one; the proposed normalized discrepancy is $1/(1+\varepsilon_{\mathrm{cmp}})>0$ in matched dimensionless comparison units. The repair correctly distinguishes the two diagnostics. These are reconstructed mathematical fields, not prescribed architrino forces. Numerical examples use $c_f=1$.

Verdict: substantive correctness improved, the useful operator checks are preserved, and the explanatory distinction is explicit. Falsifier: a nonzero exact Gauss/Stokes numerator for this constant field, or zero exact discrepancy norm, would overturn the argument. No introduced regression found in this repair.

## Existing items needing accurate current disposition

### E1 — accepted local-definition repair is partial, medium explanatory priority

Current line 356 still gives `hit histories` as $\{A(T_k),L(T_k)\}$ without defining the two observables or the sampling index locally. The same wording is present in `969247319^` by the inspected historical passage. The earlier E1 specifically requested these definitions. A whole-source read and targeted `rg` for their occurrences finds no explanatory definition in this chapter. Defining the polarity signs, coupling and floors did not complete this part of E1.

Line 397 also retains: “Must retain the transmitter-side factor and transmitter-side acceleration weight ... omits either one.” The correct displayed formula at lines 233–243 has one factor $W^{\mathrm{acc}}=c_f/|D_t|$. The live [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 85–146, distinguishes this from $D_r/D_t$ playback. Computing $D_t$ and recording its derived weight are separate records, not two acceleration multipliers. For a simple root with $c_f=1$, $D_t=1/2$, the weight is two; multiplying a second inverse denominator would give four. This is an ambiguity risk already identified by the historical E1/preservation notes, not evidence that the present equation or EOM solver does so.

Smallest referral: define $A$, $L$, and the recorded times with the intended observation map, and say explicitly that $D_t$ determines the single weight. Do not invent meanings for the observables. Falsifier: locate their definitions in the reviewed chapter or show that the sentence already specifies one factor unambiguously in its local context. Grade: measured for retained text/absence in this chapter; inferred for explanatory incompleteness. No introduced mathematical regression is claimed.

### E2 — performance qualification is partial, low residual priority

Lines 376 and 387 still say “Computationally heavy for many-particle dynamics” and “Costly when many receivers and transmitters are present.” Both are present before and after the inspected repair. Line 346 now correctly says actual wall time and memory must be profiled and no universal ranking follows. This global qualification limits the risk, but the accepted E2 request was to carry workload conditions into the summaries as well. No performance benchmark was run or located in this chapter.

Independent reason: counts of grid cells, receivers and roots do not specify implementations, matched error, time horizon or hardware; hence those counts cannot determine measured wall time. Smallest referral: attach the existing workload-dependent qualification to these remaining phrases, or read them explicitly as qualitative workload expectations. No new benchmark campaign is proposed. Falsifier: a declared matched-accuracy measurement supporting these particular rankings in the stated scope. Grade: measured wording, inferred residual incompleteness, not a new numerical finding or demonstrated regression.

### E3 — zero-delay correction survives; hierarchy repair is partial

Current line 331 correctly says zero delay is $T_r-T_t=0$, not emission epoch zero. The independent causal identity $r=c_f(T_r-T_t)$ with $c_f>0$ verifies it. For $c_f=1$, emission at zero and reception at two has $r=2$, a legitimate positive-delay geometry. This accepted substantive correction survives.

The actual repair diff changed both “Pros” and its first entry to the same two-space indentation at lines 371–372; lines 373–374 share it. The intended parent/child list relationship therefore remains absent in the source despite the historical receipt's statement that the malformed hierarchy was corrected. This is a low editorial incomplete repair, not a physical regression. Smallest referral: make “Pros” a parent and its three benefits sibling children, matching Method 2. Falsifier: a current source hierarchy encoding that relationship. No rendered visual review is claimed. Consolidating the several repeated method summaries remains optional; it is not being recast as a failed scientific repair.

## Open obligations and non-findings

O1 remains the known incomplete comparison-data prescription: line 23 calls global neutrality a default boundary condition. Neutral source inventory cannot select the homogeneous wave solution. For example, adding $\sin(kX^1-|k|T)$ with $c_f=1$ preserves the forced wave equation while changing initial data; neutrality is unchanged. The causal convolution implicitly chooses a particular outgoing response, whereas a finite-grid experiment still needs its own initial and boundary data. Route to the existing O1, not a new issue. Falsifier: explicit initial/boundary specifications covering the proposed comparison, with uniqueness in that class.

O2 remains the known energy and regulator obligation: a smooth scalar alone does not close its explicit-time/history and boundary exchanges, and mollifying an arrival delta alone does not remove an inverse-square origin singularity. Independently, $dU/dT=\partial_TU+\nabla U\cdot\mathbf V$ leaves the explicit-time term after spatial cancellation. The nearby [Well-posedness and regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), lines 1–35, explicitly retains origin/history controls. Existing references own this obligation; no new global energy proof is asserted or requested by this receipt.

O3's mathematical near-source warning is now accurately expressed at line 393: shorter chords are favored only with other factors fixed. The ratio $A_{\mathrm{far}}/A_{\mathrm{near}}=(W_{\mathrm{far}}/W_{\mathrm{near}})(r_{\mathrm{near}}/r_{\mathrm{far}})^2$ still shows why a population/tail theorem remains open. A declared cutoff is not itself such a bound. Preserve both the repaired prose and the unresolved scientific obligation.

Line 65 says the Green function ensures “only simple causal roots ... contribute.” Read literally, that confuses support with the domain of the simple-root collapse identity. However, lines 156, 330, 341 and 388 explicitly discuss simple-root reduction, tangencies, root floors and regulator conditions. No degenerate-root deletion algorithm is specified. Optional low clarification: “On a simple-root chart, the causal Green integral reduces to the sum over roots satisfying ...; degenerate roots require separate treatment.” This is not counted as a newly demonstrated substantive defect. It would become consequential if an implementation or downstream proof used it to delete caustic support.

Other unchanged statements checked directly: differentiating the distance gives $r'=-\hat{\mathbf r}\cdot\mathbf V_t$, so the moving-source absolute Jacobian is correct; integrating the spherical transport density cancels $4\pi r^2$ and returns its amplitude on positive-age shells; the switched-on stationary gradient comparison excludes its front distribution; and the canonical acceleration contains no receiver-speed multiplier. These checks do not certify self-consistent histories, convergence, energy conservation, or cost. The historical no-change normalization disposition also survives: converting the inspected wave kernel to time-delta convention gives $\delta(T-r/c_f)/(4\pi c_f^2r)$ for unit forcing, and the displayed $c_f^2S$ restores the chapter's kernel. This no-change claim is mathematical normalization only.

## Evidence limits and handoff

Dependency hashes by `shasum -a 256`: Master Equation `c06a7076562258bd3aa3e7987044535e11c07e16740dd811915531dc32f7a8ac`; Well-posedness and regularization `ac7c3706d43a6007e59b92a95d26d1a1d341c16caa0ed1cc1aeb75aaa9caf8a4`; historical action-model receipt `2ca293a8ee699dbe8d7b9e663fde08ad6636ae52562cfc5b84f4da0fdbe882a1`. Dependency reads were bounded passages, not additional whole-chapter coverage. No parser/checker was created, no solver run, no rendering or generated-registry audit performed, and no review duration or operator burden was measured. Existing functional equation links were not changed.

The source was not edited. The coordinator owns shared coverage and owner referrals: credit one full validation chapter and the two accepted-repair plus normalization no-change rechecks; carry E1–E3 as partial historical editorial closeout items and O1/O2/O3 as existing scientific/comparison obligations, without reopening CRW-005 or authorizing automatic source repair. No annual cycle completion is claimed. Snapshot drift, an independently demonstrated algebraic counterexample, or a missing local definition found in these exact bytes would require revising the corresponding scoped conclusion.

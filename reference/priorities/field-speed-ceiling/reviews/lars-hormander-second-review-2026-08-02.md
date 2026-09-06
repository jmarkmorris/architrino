# Lars Hörmander Second Review: Field-Speed Ceiling Mathematics Packet, Sections 1–11

**Review identifier:** `FSC-001-LH2-2026-08-02` **Reviewer lens:** [Lars Hörmander — Distributional Causal-Root Measure Analyst](../../../research-office/specialists/roles-geometry-dynamics/lars-hormander.md) **Review date:** 2026-08-02 **Review target:** [mathematics-geometry-dynamical-system.md](../analysis/mathematics-geometry-dynamical-system.md), Sections 1–11 only; Sections 12 and later are out of scope. **Prior review:** [FSC-001-LH-2026-07-31](lars-hormander-review-response-2026-07-31.md). Findings disposed there are not re-raised; this review addresses the substantially revised current text, especially Sections 10 and 11. **Claim level:** review findings only — nothing is adopted or advanced for the theory by this document.

## Scope and method

This review reads the packet in the distributional and microlocal lens: the typed source, receiver, and event measures of Sections 4–5 and their candidate Radon topology; where the coarea collapse of $\delta(g)$ is and is not defined; the wavefront-set reading of the characteristic strata; the truncated far-part weak-* limit program; parameterization independence of the proposed decompositions; and the propagation-of-singularities structure of the mirror chart.

Plainly: I checked whether the document's singular sums and limiting measures are legitimate mathematical objects, whether its proposed splittings depend on how you parameterize them, and whether its stated limit targets can exist in the spaces it names.

Concurrent second reviews by other specialists were captured on the same date. Findings below were derived independently within this lens before those files were consulted for overlap; where a defect is likely to be co-reported (notably LH2-1 and the stale cross-references in LH2-6), that is expected independent confirmation, and the operator should disposition each defect once.

## Verification record

All computations below were re-derived by hand and then checked numerically with an independently written script (system `python3`, standard-library math only, in the isolated Linux workspace; the shared repo venv is not mounted there). All numerics use normalized wake-speed units $c_f=1$. Claim grade for each line: `measured` by that instrument, against the document's displayed values; the instrument establishes agreement of independent arithmetic, not the document's modeling assumptions.

1. **Dottie constants (Section 11.1.1).** Bisection on $\cos x-x$ gives $\xi_0=0.7390851332151607$, $\theta=2\xi_0=1.4781702664303213$ rad $=84.69291766818584^\circ$, and $R_\ast/K=1/(4\xi_0(1+\sin\xi_0))=0.20211137351526115$. All three match the document to all printed digits.
2. **General-$\lambda$ circular binary (Section 11.1).** For $\lambda\in\{0.2,0.5,0.8,1.0\}$, a direct numerical positive-delay root search on the prescribed antipodal paths reproduces $\xi_\lambda=\lambda\cos\xi_\lambda$ to $10^{-16}$; finite-difference $D_t$ and $D_r$ match $c_f(1+\lambda\sin\xi_\lambda)$ and each other; the assembled vector row matches the displayed $\mathbf e_r$/$\mathbf e_\theta$ components (inward radial, forward tangential) to $10^{-9}$; the balance $|a_r(R_\ast)|=c_a^2/R_\ast$ holds to machine precision; and $R_{\ast,\lambda}$ is numerically strictly decreasing in $\lambda$ with endpoint $K/(4D(1+\sin D))$.
3. **Helical ansatz (Section 11.1.2).** Independent implementation with $u=0.6$, $v=0.8$: the delayed root returns the Dottie angle to $10^{-16}$; finite-difference $D_t=D_r$ match $v^2(1+\sin D)/c_f$; the numeric $\hat{\mathbf r}$ matches $(v/c_f)(D\mathbf e_r-\sin D\,\mathbf e_\theta)+(u/c_f)\mathbf e_z$ componentwise; $\mathbf A\mathbin{\cdot}\mathbf V_1$ matches $(C/c_f)(v^2\sin D-u^2)$; the numerically projected axial component equals the displayed formula and is strictly negative. The negative helix result is confirmed.
4. **Simple-branch total-variation transfer (Section 5).** On a constant sub-ceiling mirror chart ($w=0.6$), Simpson integration of the receiver-side density $\|\mathbf K\|/D_t\,dT$ and the source-side density $\|\mathbf K\|/D_r\,ds$ over matched branch windows agree to $10^{-16}$.
5. **Mirror coincidence-interval localization (Section 5).** The transferred density $K/(2c_f^2(T_{\mathrm c}-s)^2)$ integrates to $(K/2)(1/\rho-1/q_\ast)$ over $s\le T_{\mathrm c}-\rho$ (checked at $\rho=10^{-1},10^{-2},10^{-3}$): finite far part, $1/\rho$ divergence, and $\rho\cdot TV(\rho)\to K/2$.
6. **Fold negative control (Section 5).** The two coarea weights sum to $1/\sqrt{a\varepsilon}$ exactly ($a=2$, $\varepsilon=10^{-4}$: $70.710678119$).
7. **First transverse linearization (Section 10.7).** Central-difference first variation of the full projection map reproduces $\delta\mathbf A_{\mathrm{eff}} =-a_0[(\delta\mathbf y_r-\delta\mathbf y_t)/R+\delta\hat{\mathbf v}_r]$ term by term to $10^{-7}$, and the base effective acceleration is zero. I also re-derived Section 10.7's $ds/dT=2/(1-u(s))$ and the arrival identity $T=T_\ast+q_\ast$ by hand; both are correct.

Plainly: I rebuilt the document's key numbers and vector formulas from scratch, without reusing its algebra, and everything I tested agrees. The findings below are therefore not arithmetic complaints; they concern definitions, classifications, limit targets, and missing hypotheses.

## Findings

### LH2-1 — ERROR: the isolated-crossing rule and the event-stratum catalogue both admit the receiver-side frozen root as an active ordinary row, contradicting Section 10.9

Section 9 states, as the operative admission rule:

> "**Isolated-crossing reception rule.** An active ordinary reception is an isolated, positive-delay causal root with $D_t\ne0$."

and the event-stratum catalogue's first row reads:

> "| Regular isolated root | $g=0$, positive delay, and $D_t\ne0$. | Canonical ordinary acceleration contribution. |"

The receiver-side frozen root of Sections 9–10.9 satisfies every condition in both statements: on the prescribed straight-through outgoing chart, $g(T,s)=2s$, so $s=0$ is an isolated zero at each fixed $T$, the delay is positive, and $D_t=2\ne0$. As literally stated, the rule and catalogue row 1 therefore classify the frozen root as an active canonical ordinary row, while catalogue row 2 and the Swept-Source Reception Law ("record the branch as inactive and add no ordinary receiver row") classify the same object as nonordinary and inactive. Two proposed laws of the same document assign the same stratum opposite dispositions. Section 10.8 even warns against exactly the reading that the rule's own wording licenses ("If the frozen partner root is booked as an ordinary row merely because $D_t\ne0$ ...").

**Correct replacement.** Amend the rule to: "An active ordinary reception is an isolated, positive-delay causal root with $D_t\ne0$ **and $D_r\ne0$** (equivalently, a root at which the wakefront crosses the receiver worldline)." Amend catalogue row 1's condition to "$g=0$, positive delay, $D_t\ne0$, and $D_r\ne0$," so that rows 1 and 2 are disjoint strata. State explicitly that the Section 9 rule is superseded on the $D_r=0$ stratum by the Section 10.9 proposal.

Claim grade of this finding: `derived` (the frozen root's factors are computed in the document itself). Falsifier: exhibit a reading of the quoted rule text under which the frozen root fails one of its stated conditions; none exists, since $D_r$ does not appear in them.

Plainly: the document's newest law says the frozen root gets no acceleration row, but its older admission rule — still stated as the operative definition — says it gets one. Both cannot stand as written; the older rule needs the receiver-crossing clause added.

### LH2-2 — GAP: the candidate topology is declared on a receiver-time neighborhood that does not contain the delayed data the compared measures depend on

Section 5 declares: "For the proposed receiver-time measure analysis, use the following candidate topology on $U$," where $U$ is "a compact receiver-time neighborhood of $T_{\mathrm c}$," and its clauses control $\mathbf X_i^{(n)}$, $\mathbf V_i^{(n)}$, $D\mathbf V_i^{(n)}$, and $\mathsf E_j^{(n)}\!\restriction_U$ on $U$ (clause 2 explicitly on $\{j\}\times U\times\mathbb R^3$).

The ordinary receiver measures being compared at reception times $T\in U$ evaluate kernels and Jacobians at $(T,S^{(n)}(T))$, where the root time $S^{(n)}(T)$ generally lies outside $U$: the mirror channel's persistent partner branch has $s<T_\ast$ with $T_\ast$ potentially far below $T_{\mathrm c}$, and the far-part truncations $s\le T_{\mathrm c}-\rho$ extend over the whole retained history. Convergence of histories on $U$ places no constraint on the perturbed histories at those emission times, so the weak-* statements quantify over objects the declared topology does not determine. The document flags the missing moving-time trace limits, but this domain defect is separate and prior: even the fixed-time kernels are uncontrolled.

**Required repair.** Declare the path, velocity, and source convergences on a declared delay window $[T_{\mathrm c}-W,\;\sup U]$ containing every admitted root of every compared history (under the ceiling, the per-channel root census makes such a window constructible chart by chart), or on all of $(-\infty,\sup U]$ with a local topology, and say which.

Claim grade: `derived` (a definitional domain check). Falsifier: a proof that the clauses as written already determine the compared measures — for instance, a derivation showing every admitted root of every admissible perturbed history lies in $U$; the mirror chart's persistent pre-threshold branch already refutes that for small $U$.

Plainly: the convergence rules watch the paths only near the coincidence time, but the acceleration rows being compared are computed from emission events well before it. The rules must watch the whole stretch of history the rows actually use.

### LH2-3 — GAP: the pointwise factors in the compared measures are not functions of the topology's equivalence classes; a good-representative convention is missing

The topology's clause 1 takes $\mathbf V_i^{(n)}\to\mathbf V_i$ in $L^1(U)$ with $D\mathbf V_i$ a vector Radon measure, i.e. velocities are $BV$ objects defined up to null sets. The measures under comparison evaluate $D_t=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t(S(T))$, $D_r$, and the kernel direction at exact times — including at declared event times, where a $BV$ velocity may jump and its pointwise value is genuinely ambiguous. Until the formulation declares which representative is meant (e.g. the left-continuous representative for all path-history factors, and one-sided traces at declared event times), the objects $\boldsymbol{\mathsf R}^{\mathrm{ord},(n)}_{i\leftarrow j,T}$ are not well-defined functions of the data the topology compares, and the weak-* program of Section 5 is not yet a posed question.

This interacts with the guard: the left traces $\mathbf V_i(T_{\mathrm c}^{-})$ are used in the reset, so the left-continuous convention is the natural one, but it must be stated once, globally, for every factor.

Claim grade: `derived` (well-posedness bookkeeping). Falsifier: a proof that every factor entering the compared measures is continuous on the relevant charts for every admissible history, making the representative choice vacuous; the declared $BV$ solution class itself defeats this in general.

Plainly: a velocity that is only defined "almost everywhere" has no particular value at a single instant, yet the formulas plug in values at single instants. The document must say, once, which one-sided value is always meant.

### LH2-4 — GAP: the helix negative result silently assumes its two-label ledger census; the missing self-root exclusion has a one-line proof

Section 11.1.2 concludes that "the complete isolated two-label ordinary ledger retains a backward axial residual," and its falsifier clause contemplates "an omitted ordinary root," but the text never establishes the census: that each receiver's ledger on the helical chart contains exactly the one displayed partner row. The partner-root uniqueness follows from the displayed reduction to $\xi=|\cos\xi|$; the same-transmitter exclusion is used but not stated.

**Supplied closure.** For the helical path with $v>0$, the chord satisfies
$$
\|\mathbf X_i(T)-\mathbf X_i(S)\|^2
=
u^2(T-S)^2+4R^2\sin^2\!\left(\tfrac{\omega(T-S)}{2}\right)
<
u^2(T-S)^2+v^2(T-S)^2
=
c_f^2(T-S)^2
$$
for all $T>S$, using $\sin x<x$ for $x>0$. Hence there is no positive-delay same-transmitter root and no same-transmitter characteristic interval, and each two-label ledger is exactly the one partner row. This also shows the $u\to0$ limit degenerates continuously onto the planar chart's census.

Claim grade: `derived` (elementary strict inequality). Falsifier: a helical chart with $v>0$ and a self root, i.e. equality in the displayed strict inequality at some $T>S$; impossible since $\sin x<x$ is strict for $x>0$.

Plainly: the no-steady-helix conclusion needs to know the helix hears exactly one wake row. A curved path is always shorter than the wake distance, so it never re-meets its own wake; one line of trigonometry closes the gap and should be added.

### LH2-5 — IMPROVE: replace the vacuous boundary-direction continuity sentence in Section 8 with the sharp interface statement

Section 8 states:

> "If boundary directions $\hat{\mathbf v}^{(n)}\to\hat{\mathbf v}$, the effective responses converge exactly when the corresponding global transverse vectors and retained backward scalars converge."

The biconditional is true but empty: on the boundary stratum the map $(\hat{\mathbf v},\mathbf A)\mapsto \mathbf A-(\hat{\mathbf v}\mathbin{\cdot}\mathbf A)_+\hat{\mathbf v}$ is jointly continuous, so along boundary sequences with convergent inputs the "exactly when" clauses hold automatically. The statement worth recording is the genuine discontinuity of the full response across the interior–boundary interface: for $\|\mathbf V^{(n)}\|<c_a$ with $\mathbf V^{(n)}\to\mathbf V$, $\|\mathbf V\|=c_a$, and fixed $\mathbf A$ with $\hat{\mathbf v}\mathbin{\cdot}\mathbf A>0$, the interior responses converge to $\mathbf A$ while the boundary response is $\mathbf A-(\hat{\mathbf v}\mathbin{\cdot}\mathbf A)\hat{\mathbf v}$. That jump is the load-bearing fact for first-boundary-arrival limits, for the $c_a$-approach of sub-ceiling charts, and for any numerical scheme, and it is currently unstated.

**Replacement.** "The projection is jointly continuous in $(\hat{\mathbf v},\mathbf A)$ on the boundary stratum and trivially in the interior, but is discontinuous across the interface $\|\mathbf V\|=c_a$ wherever the raw forward component is strictly positive; regular solutions therefore reach the boundary with a jump in $\dot{\mathbf V}$, which is the expected onset of the constrained regime, not a defect."

Claim grade: `derived`. Falsifier: a sequence on the boundary stratum with convergent $\hat{\mathbf v}^{(n)}$, convergent $\mathbf A^{(n)}$, and divergent responses (contradicting joint continuity), or an interior-to- boundary sequence with $\hat{\mathbf v}\mathbin{\cdot}\mathbf A>0$ whose responses converge to the boundary value.

Plainly: as written, the sentence says "the answer converges when its parts converge," which says nothing. The interesting and true statement is that the response snaps when a path first touches the speed sphere, and that snap is by design.

### LH2-6 — IMPROVE: stale cross-references, a dangling definition sentence, and a missing provenance row

These are text defects with exact locations; none changes a result.

1. Section 10.3: "where $\mathcal P_{\mathbf V}$ is the finite-ledger tangent-cone response map in Section 3" — the response map is defined in Sections 7–8; Section 3 is the provenance map.
2. Section 10.3: "The path-speed-ceiling boundary-state co-moving root family from Section 7 is not included" — the co-moving family and its convention are in Sections 9 and 10.2, not Section 7.
3. Section 10.7: "The latter is not an ordinary same-transmitter root under Section 7" — same misdirected reference; should point to the Section 9 isolated-crossing convention (as amended per LH2-1).
4. Section 4: the sentence "At receiver event $(T_r,\mathbf X_r(T_r))$, define" is interrupted by the inserted source-history-measure paragraph and only resumes at the display for $\mathbf r_{r\leftarrow t}$; move the interpolated paragraph after the completed definition.
5. Section 3's provenance map still lists the binary program row as "$c_a=c_f$ only," while Section 11.1 now proves the general at-or-below-wake-speed compatibility theorem for all $\lambda\in(0,1]$; the map needs a row (or an amended regime column) for the general-$\lambda$ chart so the strongest derived result is not invisible to the provenance reader.

Claim grade: `derived` (text inspection). Falsifier: the quoted phrases resolving correctly against the current section numbering; they do not.

Plainly: two pointers still aim at old section numbers, one definition sentence got split by a later insertion, and the document's own status table has not caught up with its strongest new binary theorem.

### LH2-7 — IMPROVE: measure-notation hygiene in Section 5's receiver-time aggregation and the plateau-wake tail estimate

Two small precision items in otherwise correct passages.

1. The aggregation $\boldsymbol{\mathsf M}^{\mathrm{ord}}_i(B) =\int_B\sum_j\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}(1)\,dT$ pairs each source-time measure with the constant function $1$, but $\boldsymbol{\mathsf R}^{\mathrm{ord}}_{i\leftarrow j,T}$ was defined only against compactly supported test functions. Under the ceiling the root census makes the total mass finite (at most one root per ordered channel), so the pairing is legitimate — but that census is the reason, and one clause should say so: "the pairing with $1$ is defined because the admitted root set is finite with locally bounded weights on the declared chart." In the unbounded reference model the same notation would be undefined.
2. The tail estimate $\int_{r_0}^{R}r^{-2}\,dr=1/r_0-1/R$ converts an emission-time sum into a radius integral with unit density. At a fixed receiver event the root radius is $r=c_f(T-s)$, so $dr=c_f\,ds$ exactly and the conversion is clean for the family being estimated; but since elsewhere in the document the emission-time-to-receiver-time conversion carries $D$ factors, one sentence should state that this integral is a fixed-receiver-event radius integral with $dr=c_f\,ds$, so no Jacobian factor is being dropped.

Claim grade: `derived`. Falsifier: for item 1, a declared chart in this document with infinitely many admitted roots per channel (excluded by the classification theorem); for item 2, a fixed-receiver-event root family with $dr\ne c_f\,ds$ (excluded by $r=c_f(T-s)$ at fixed $T$).

Plainly: both formulas are right, but each quietly uses a fact proved elsewhere in the document; one clause each would make them self-supporting.

### LH2-8 — ADVANCE: no-finite-Radon endpoint limit theorem — the FSC-006 weak-* target, as typed, is unattainable on any closed endpoint neighborhood

Section 5 poses the prove-or-refute statement $\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i \stackrel{*}{\rightharpoonup} \boldsymbol{\mathsf M}^{\mathrm{coincidence}}_i$, with clause 3 of the topology requiring convergence "weak-* in its labeled finite vector-Radon space," and adds "A finite-Radon limit requires uniform local total-variation control. Failure of that bound ... refutes this candidate reduction." Within my lens I can sharpen "requires" into a theorem: for the mirror channel the bound provably fails for every admissible family that is consistent with the exact chart, so the target as typed is empty and should be retyped now rather than left open.

**Theorem (no finite-Radon endpoint limit; proof sketch).** Let $\{\mathfrak h^{(n)}\}$ be ceiling-admissible histories resolving the mirror coincidence stratum into ordinary simple roots, and suppose the single consistency hypothesis (H): on every compact subinterval $[T_{\mathrm c}-\rho_0,\,T_{\mathrm c}-\rho]$ of the open segment, the source-time densities of $\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i$ converge in $L^1$ to the exact transferred density, which Section 5 derived to be $K/(2c_f^2(T_{\mathrm c}-s)^2)$ (verified numerically above). If $\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i$ converged weak-* in the finite vector-Radon space of a closed neighborhood $N\ni T_{\mathrm c}$, the uniform-boundedness principle would give $\sup_n|\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i|(N)=M<\infty$. But (H) and lower semicontinuity of total variation on open sets give, for every $\rho>0$,
$$
\liminf_n\,
\left|\boldsymbol{\mathsf M}^{\mathrm{split},(n)}_i\right|
\!\left(\left[T_{\mathrm c}-\rho_0,\,T_{\mathrm c}-\rho\right]\right)
\ge
\frac{K}{2c_f^2}\left(\frac1\rho-\frac1{\rho_0}\right)
\xrightarrow[\rho\downarrow0]{}\infty,
$$
contradicting $M<\infty$. Hence no finite-Radon weak-* limit exists on any closed endpoint neighborhood; a fortiori $\boldsymbol{\mathsf M}^{\mathrm{coincidence}}_i$ is not obtainable as such a limit. The only escapes are: refuse (H) — i.e. claim admissible families whose near-coincidence rows do not converge to the exact chart's rows, which would itself refute the perturbative-splitting program; or change the space.

**Retargeting.** The correct FSC-006 statement is two-tiered: (i) convergence in the *local* weak-* topology of Radon measures on the open set $\{s<T_{\mathrm c}\}$ (there the truncated far parts are consistent restrictions of one locally finite density, and family-independence is a meaningful open question about (H)); plus (ii) an endpoint invariant in place of an endpoint measure — see LH2-9. Any object owning the endpoint itself must be a new typed event datum (atom, higher-order distribution after a declared subtraction, or terminal disposition), never a weak-* limit of the ordinary split parts in a finite-Radon space.

Claim grade: `derived conditional theorem sketch` — conditional on (H) and on the declared vector-Radon typing; the Banach–Steinhaus and semicontinuity steps are standard. Not advanced: nothing here supplies the event datum. Falsifier: an admissible perturbation family satisfying (H) whose split parts have uniformly bounded total variation on a closed neighborhood of $T_{\mathrm c}$ — impossible by the display above — or a demonstration that (H) is the wrong consistency requirement for the declared topology.

Plainly: the document asks whether the near-coincidence measures settle down to a finite limiting measure. Its own divergence calculation already answers no for any family that agrees with the exact geometry close to the endpoint. The productive question is convergence away from the endpoint plus a separate, finite fingerprint of how fast the endpoint diverges — which is the next finding.

### LH2-9 — ADVANCE: the endpoint variation residue is a parameterization-independent channel invariant and the right family-independence test

Section 5 derives $TV$ divergence "as $\rho\downarrow0$" but extracts no invariant from it. Define, for the mirror coincidence channel,
$$
\operatorname{res}_{i\leftarrow j}
=
\lim_{\rho\downarrow0}
\rho\cdot
\left|\boldsymbol{\mathsf M}^{\mathrm{split}}_{i\leftarrow j}\right|
\!\left(\left\{\,T_{\mathrm c}-\rho_0\le s\le T_{\mathrm c}-\rho\,\right\}\right)
=
\frac{K}{2c_f^2}
\qquad(=K/2\ \text{in}\ c_f=1),
$$
independent of $\rho_0$ and of $q_\ast$. Numerically verified above: $\rho\cdot TV(\rho)=0.450,\,0.495,\,0.4995$ at $\rho=10^{-1},10^{-2},10^{-3}$ with $K=1$.

**Why it is the right object.** (i) It is parameterization-independent: it is computed from the total-variation measure of a source-time vector measure, and total variation is intrinsic to the measure, not to any integration parameterization — exactly the invariance the Section 10 guard demands of "aggregates." (ii) It is computable per ordered channel and per polarity pair, since $K=\kappa|q_iq_j|$. (iii) It converts the FSC-006 family-independence clause into an operator-checkable test: an admissible perturbation family is *endpoint-consistent* iff its split parts satisfy $\rho_n\cdot TV^{(n)}(\rho_n)\to K/(2c_f^2)$ along every sequence $\rho_n\downarrow0$ chosen after $n\to\infty$ in the sense of the two-tier limit of LH2-8. A family with a different residue — or with none — is not an admissible resolution of the mirror stratum, which is a sharper refutation instrument than "loss of tightness."

**Lemma (residue stability; proof sketch).** If a perturbed channel's transferred density satisfies $f^{(n)}(s)=K/(2c_f^2)\,(T_{\mathrm c}-s)^{-2}(1+\epsilon_n(s))$ with $\epsilon_n\to0$ uniformly on $[T_{\mathrm c}-\rho_0,T_{\mathrm c}-\rho]$ for each fixed $\rho$, then the iterated limit of $\rho\cdot TV^{(n)}$ is $K/(2c_f^2)$: integrate, bound the error by $\sup|\epsilon_n|\cdot(1/\rho)$, and take $n\to\infty$ before $\rho\downarrow0$. The order of limits is essential and must be declared in FSC-006; the reversed order is the divergence of LH2-8.

Claim grade: `derived` for the exact-chart value and the stability lemma sketch; `proposed formulation target` for its adoption as the FSC-006 consistency test. Not advanced as theory. Falsifier: an admissible family satisfying LH2-8's (H) whose iterated-limit residue differs from $K/(2c_f^2)$; the stability lemma says this requires non-uniform $\epsilon_n$ on compacta, i.e. failure of (H) itself.

Plainly: the divergence at the endpoint has a clean strength — half the coupling, in wake units. Every honest approximation of the coincidence must show that same strength. That single number is a much easier thing to check than an abstract convergence clause, and it cannot be faked by reparameterizing.

### LH2-10 — ADVANCE: degenerate-root local-finiteness lemma, and the regime-2 collapse of the event catalogue

The catalogue's "degenerate isolated root" stratum ($D_t=0$, isolated, odd order $\ge3$) currently carries no measure verdict. The Section 5 transfer identity settles it wherever the receiver-side factor has a floor.

**Lemma (proof sketch).** Let a ceiling-admissible ordered channel have one isolated degenerate root at $(T_0,s_0)$ with range floor $r\ge r_{\min}>0$ and receiver floor $D_r\ge d>0$ on a compact branch window $B\ni T_0$. By root monotonicity the branch $S(T)$ is single-valued and nondecreasing through $T_0$, injective off a null set, and simple on $B\setminus\{T_0\}$. Apply the exact transfer identity on $B\setminus(T_0-\delta,T_0+\delta)$ and let $\delta\downarrow0$ by monotone convergence:
$$
\int_B\frac{\|\mathbf K\|}{D_t}\,dT
=
\int_{S(B)}\frac{\|\mathbf K\|}{D_r}\,ds
\le
\frac{\sup_B\|\mathbf K\|}{d}\,\bigl|S(B)\bigr|
<\infty .
$$
So the receiver-time measure is locally finite across the degenerate root: the $1/D_t$ blow-up is an integrable spike, a time-reparameterization artifact, not a measure obstruction. The stratum needs no event law for measure purposes at positive range with a receiver floor; only its *ownership* bookkeeping remains.

**Corollary (regime-2 collapse).** For $0<c_a<c_f$ every factor obeys $D_t,D_r\ge c_f-c_a>0$, so on any speed-admissible history: no degenerate roots exist at all, no characteristic intervals exist (rigidity forces transmitter speed $c_f$, excluded), no frozen branches exist ($D_r>0$), and no same-transmitter roots exist. The entire transmitter-side nonordinary catalogue is empty; the only surviving nonordinary dangers in regime 2 are cross-channel simultaneity and the zero-range approach to a partner coincidence (where $r\to0$ with the delay). Section 5's regime list states fragments of this; the full collapse should be stated as one sentence, because it means the lower-ceiling model's entire event problem is the coincidence problem and nothing else.

Claim grade: `derived` for both lemma and corollary, conditional on the stated floors; the lemma's monotone-convergence step and the corollary's floor arithmetic are elementary given the document's own transfer identity and rigidity theorem. Falsifier: a ceiling-admissible channel with $r\ge r_{\min}$, $D_r\ge d>0$, and divergent receiver-time variation across an isolated degenerate root — excluded by the display; or a regime-2 history exhibiting any catalogued transmitter-side nonordinary stratum — excluded by the floors.

Plainly: when the wake front still sweeps across the receiver, a momentarily grazing transmitter produces a tall but thin spike that integrates to something finite — no new law needed there. And below wake speed, every exotic geometry on the transmitter side is impossible outright: the only hard event left in that regime is two architrinos actually meeting.

### LH2-11 — ADVANCE: the joint pullback $\mathbf K\,\delta(g)$ exists on the frozen stratum, its receiver-time marginal is nonzero, and therefore the regular-chart-consistent extension is provably non-unique

Section 10.9 grades the swept-source law "proposed foundational refinement with derived regular-chart equivalence" and asserts the frozen-branch disposition is new data. Within my lens that assertion can be upgraded from a classification to a proof, by exhibiting the competing extension explicitly.

On the outgoing mirror chart, $g(T,s)=2s$ near the frozen stratum, so $\{g=0\}=\{s=0\}$ is a genuine hypersurface of the $(T,s)$ chart with $dg=(-D_r,D_t)=(0,2)\ne0$. The pullback criterion is satisfied: the distribution $u=\mathbf K\,\delta(g)$ is well-defined *jointly in $(T,s)$* on a neighborhood of the frozen stratum, with wavefront set in the conormal of $\{s=0\}$ (covectors along $ds$). Its receiver-time marginal — pairing with $\varphi(T)\otimes1$ — is
$$
\int
\varphi(T)\,
\frac{\mathbf K(T,0)}{D_t}\,dT ,
\qquad
\frac{\|\mathbf K(T,0)\|}{D_t}
=
\frac{K}{2c_f^2\,(T-T_{\mathrm c})^2}
\quad(c_f=1\ \text{units}),
$$
which is a locally finite nonzero density for $T>T_{\mathrm c}$, divergent only at the coincidence endpoint. Call this the *receiver-clock extension*. It agrees with the canonical ordinary measure on every regular branch (where the fixed-$T$ coarea collapse and the joint marginal coincide), and it is exactly the "booked as an ordinary row merely because $D_t\ne0$" continuation that Section 10.8 warns produces the nonintegrable zero-range row — now identified as a bona fide distributional object, not a naive mistake.

The swept-source (*source-clock*) extension also agrees with the canonical measure on every regular branch and assigns the frozen stratum zero. Hence: **two distinct extensions, both defined by intrinsic constructions, both restricting to the canonical measure on the entire regular domain, disagree exactly on $\{D_r=0,\ D_t\ne0\}$.** Regular-chart equivalence therefore cannot select the frozen disposition even in principle; the swept-source zero is free foundational data in the strongest sense — a choice *against* an existing well-defined conormal continuation, not a filling of a vacuum. The document's claim-grade is correct and is here strengthened to a proved non-uniqueness statement. It follows that any future derivation of the frozen-branch zero must produce a physical or variational selection principle (e.g. the received-history-clock absolute-continuity reading of 10.9, which the transfer identity makes parameterization-independent), never a distributional-uniqueness argument.

Claim grade: `derived` (pullback existence, marginal computation, and non-uniqueness), within the standard theory of pullbacks of distributions under submersions; nothing here selects either extension. Falsifier: a proof that one of the two displayed extensions fails to restrict to the canonical measure on some regular branch (the transfer identity $dS/D_r=dT/D_t$ excludes this for the source-clock extension; direct coarea evaluation excludes it for the receiver-clock marginal), or a third constraint in the current canon that distinguishes them — none is stated in Sections 1–11.

Plainly: mathematics offers two natural ways to keep billing the frozen wakefront — by the receiver's clock, which keeps charging forever, or by the source's clock, which stops charging because no new history arrives. Both are internally consistent with everything regular. The theory, not the mathematics, must choose; the document chose the source clock, and it is right to call that a postulate.

### LH2-12 — INSIGHT: the event-stratum catalogue is the vanishing pattern of $dg=(-D_r,D_t)$, and only the co-moving self family lies outside distribution theory

The Section 9 catalogue reads as a list of unrelated cases. In the $(T,s)$ incidence chart it is one object: the differential of the root function along its zero set.

| Stratum | $(D_r,D_t)$ on $\{g=0\}$ | Distributional status of $\mathbf K\,\delta(g)$ |
| --- | --- | --- |
| Regular simple root | $D_t\ne0$, $D_r\ne0$ | Defined jointly and fiberwise; marginal = canonical row. |
| Receiver-side frozen root | $D_t\ne0$, $D_r=0$ | Defined jointly; fixed-$T$ collapse defined; marginal locally finite off zero range; disposition free (LH2-11). |
| Degenerate isolated root | $D_t=0$, $D_r\ne0$ | Defined jointly ($dg\ne0$ via $dT$ component); fixed-$T$ collapse undefined; marginal locally finite at positive range (LH2-10). |
| Characteristic interval | $D_t=0$ on a segment, $D_r\ne0$ | Zero set contains a horizontal segment; joint pullback defined off the segment endpoints; marginal has a candidate finite atom at positive range, divergent at zero range. |
| Co-moving same-transmitter family | $g\equiv0$ on an open two-dimensional set | No hypersurface; $dg=0$; the pullback does not exist at all. Genuinely outside distribution theory. |

Three different failure modes are currently narrated together in the packet and should be separated, because they demand different kinds of repair: (i) *the distribution does not exist* — only the co-moving self family; (ii) *the distribution exists but the fixed-time collapse or the marginal is not finite* — degenerate roots at zero range, interval atoms at zero range; (iii) *everything exists but the law has not chosen among extensions* — the frozen stratum. Mode (i) needs typed bookkeeping outside measures (the document's inactive record is the right shape); mode (ii) needs finiteness hypotheses (floors), already partially supplied; mode (iii) needs a selection principle, and only mode (iii) is postulate territory.

Claim grade: `derived` reformulation of results already in Sections 5, 9, 10; the table adds no new admission or response. Falsifier: a catalogued stratum whose $(D_r,D_t)$ pattern or pullback status differs from the table — e.g. a co-moving family whose zero set fails to contain an open set (excluded by the straight-segment computation $g_{ii}\equiv0$), or a frozen stratum with $dg=0$ (excluded by $D_t\ne0$).

Plainly: one two-component arrow — how the root equation tilts in receiver time and in emission time — sorts every exotic case in the catalogue. Only the wake-riding-its-own-source case has no arrow at all, and that is the one case where the delta calculus genuinely has nothing to say.

### LH2-13 — INSIGHT: the mirror obstruction is a single corner of the incidence staircase touching the kernel's singular locus

Assemble the mirror channel's received-emission-time record across the whole encounter. In the $(T,s)$ chart the incidence set is a monotone staircase: the pre-threshold simple branch rises ($dS/dT=D_r/D_t>0$); at $T=T_{\mathrm c}$ the record jumps through the characteristic interval $[T_\ast,T_{\mathrm c})$ (verified: on that interval $r=c_f(T_{\mathrm c}-s)$, $D_r=2c_f$); after passage the frozen branch is a horizontal flat at height $s=T_{\mathrm c}$. The jump's upper endpoint and the flat's height coincide at the corner point $(T,s)=(T_{\mathrm c},T_{\mathrm c})$ — which lies *on the excluded zero-delay diagonal*, the singular locus $r=0$ of the kernel.

Every unresolved quantity in Sections 5 and 10 concentrates at that one point: the $TV$ divergence (the jump integrand $\propto(T_{\mathrm c}-s)^{-2}$ blows up only at the corner), the failed finite-Radon limit (LH2-8), the receiver-clock/source-clock disagreement (LH2-11's marginal diverges only approaching the corner), and the missing event atom (the candidate interval atom $\int\mathbf K/D_r\,ds$ is finite for any characteristic interval whose closure avoids the diagonal and diverges exactly when the interval abuts it). Conversely, an *interior* characteristic chord — transmitter running a straight $c_f$ chord aimed at a receiver event it never reaches, which the rigidity theorem permits — has a corner at positive range, and there the joint pullback yields a finite, direction-definite candidate atom with no divergence anywhere.

Structural consequence worth recording in the packet: the ceiling proposal has reduced its entire nonordinary-measure problem to the geometry of staircase corners, and the only divergent corners are those on the diagonal. An event law needs to own precisely: corners at positive range (finite candidate data exist), and diagonal corners (no finite candidate exists; terminal disposition or new typed datum required). This is a sharper and shorter statement of the "missing event-domain postulate" row of Section 3.

Claim grade: `derived` structural reformulation; the corner computations are the document's own, re-verified here. Falsifier: a mirror-channel singular quantity in Sections 5 or 10 whose divergence is *not* localized at $(T_{\mathrm c},T_{\mathrm c})$ — the far-part finiteness result and the transfer identity exclude the candidates on the open segment — or an interior characteristic chord whose candidate atom diverges despite a range floor (excluded by $r\ge r_{\min}$ and $D_r\ne0$ on a compact interval).

Plainly: draw the receiver's listening record as a staircase — rise, jump, flat. All the trouble in this whole chapter lives at the one stair corner that touches the forbidden zero-distance line. Corners away from that line come with a finite, well-defined candidate kick; the corner on it is the one true unsolved event.

## Summary table

| ID | Tag | One-line statement |
| --- | --- | --- |
| LH2-1 | ERROR | Isolated-crossing rule and catalogue row 1 admit the frozen root as ordinary, contradicting 10.9; add the $D_r\ne0$ clause. |
| LH2-2 | GAP | Candidate topology is declared on $U$ but the compared measures depend on delayed data outside $U$; declare a delay window. |
| LH2-3 | GAP | $BV$ velocities have no canonical pointwise values; declare the left-continuous representative for all factors and traces. |
| LH2-4 | GAP | Helix negative result assumes an unstated two-label census; one-line strict chord inequality supplied. |
| LH2-5 | IMPROVE | Replace the vacuous boundary-continuity sentence with the sharp interior–boundary interface discontinuity statement. |
| LH2-6 | IMPROVE | Stale "Section 3"/"Section 7" cross-references, split definition sentence in Section 4, missing general-$\lambda$ provenance row. |
| LH2-7 | IMPROVE | Justify the pairing with $1$ via the finite census; state the $dr=c_f\,ds$ conversion in the tail estimate. |
| LH2-8 | ADVANCE | No-finite-Radon endpoint limit theorem: the FSC-006 weak-* target as typed is provably empty; retarget to local convergence plus an endpoint invariant. |
| LH2-9 | ADVANCE | Endpoint variation residue $K/(2c_f^2)$ is a parameterization-independent channel invariant and the operator-checkable family-independence test. |
| LH2-10 | ADVANCE | Degenerate-root local-finiteness lemma via the transfer identity; corollary: regime $c_a<c_f$ collapses the whole transmitter-side nonordinary catalogue. |
| LH2-11 | ADVANCE | Joint pullback exists on the frozen stratum with nonzero marginal; regular-consistent extension is provably non-unique, so the swept-source zero is free data in the strongest sense. |
| LH2-12 | INSIGHT | The catalogue is the vanishing pattern of $dg=(-D_r,D_t)$; only the co-moving self family lies outside distribution theory; three failure modes need three repair types. |
| LH2-13 | INSIGHT | All mirror divergences localize at one staircase corner on the zero-delay diagonal; interior corners carry finite canonical candidate atoms. |

## Review boundary

Nothing in this review adopts a ceiling, a contact or event law, a continuation, a regulator-independent limit, or any physical claim. The ADVANCE items are theorem sketches and formulation targets offered to FSC-006/FSC-005 owners; each names its hypotheses, grade, and falsifier, and none is closed by this document. The ERROR and GAP findings carry exact replacement text or one-line closures. Findings of the 2026-07-31 review and its disposition matrix are not re-raised; where this review touches the same objects (topology, decomposition, weak-* target), it addresses only the new text and sharpens the queued FSC-006 target rather than reopening disposed items. Independent numerical verification used system `python3` in the isolated workspace with $c_f=1$ throughout; no git command was run and no other file was edited.

Closure goal: fix LH2-1 and LH2-6, adopt the LH2-8/LH2-9 retargeting of the FSC-006 weak-* statement (local topology on the open segment plus the endpoint residue test), and record the LH2-10 regime-2 collapse and LH2-11 non-uniqueness statement in the packet before any further continuation work on the mirror chart.




# Albert Einstein Field-Speed Ceiling Review

**Review identifier:** `FSC-001-AE-2026-08-01` **Reviewer:** Albert Einstein, using the existing [Albert Einstein specialist lens](../../../research-office/specialists/roles-geometry-dynamics/albert-einstein.md) **Review mode:** completed read-only relativity, invariance, and unification review of [mathematics-geometry-dynamical-system.md](mathematics-geometry-dynamical-system.md) **Captured:** 2026-08-01 **Response authority:** review findings only; no packet edit performed **Theory status:** no ceiling, event law, continuation, contact measure, retained assembly, or canonical change adopted or advanced

## Review scope and boundary

This review examined the complete constrained-response axiom, the minimal collinear partner-contact postulate, the typed measure interface, the event-stratum catalogue, the FSC-005/006/007 blockers, and the packet's relation to the Lorentz-recovery obligation. The prior [Hale](jack-k-hale-review-response-2026-07-31.md), [Hörmander](lars-hormander-review-response-2026-07-31.md), and [Thurston](bill-thurston-review-response-2026-08-01.md) responses were read first; findings below do not repeat their integrated corrections and are consistent with them unless a sharpening is explicitly stated.

The review goals were: improve the stated mathematics, remove blockers, and innovate. Findings 1–3 supply theorem-grade improvements with proofs. Findings 4–5 supply blocker-removing reformulations. Findings 6–8 supply proposed unifications and a preferred-frame research program. Every proposed object is graded where it is stated; nothing here changes canonical status.

Plainly: this is a working mathematician's review, not an acceptance. The first three findings are small theorems the packet can absorb directly; the rest are proposals with their proof burdens named.

## Part I — Improvements to the stated mathematics

### Finding 1 — The least-change clause is a theorem, not an independent clause

The packet, following the Hale and Thurston responses, treats the Euclidean arg-min selection as an irreducible clause of the proposed law, because the bare normal-cone inclusion does not select it pointwise. That is correct pointwise. But along a solution the selection is forced by two weaker and more primitive requirements. Consider, on an interval $I$ within a regular chart:

- (R1) **Radial reaction.** The constraint reaction lies in the Euclidean normal cone: a.e., $\dot{\mathbf V}=\mathbf A_{\mathrm{ord}}-\mathbf n$ with $\mathbf n\in N_{\mathcal B_{c_f}}(\mathbf V)$, i.e. $\mathbf n=\lambda\hat{\mathbf v}$, $\lambda\ge0$ at the boundary and $\mathbf n=\mathbf0$ in the interior.
- (R2) **Absolutely continuous velocity.** $\mathbf V$ is absolutely continuous on $I$ with $\mathbf V(T)\in\mathcal B_{c_f}$.

> **Theorem (minimal-selection).** Under (R1) and (R2), a.e. on $I$,
>
> $$
> \dot{\mathbf V}
> =
> \Pi_{T_{\mathcal B_{c_f}}(\mathbf V)}\!\left(\mathbf A_{\mathrm{ord}}\right)
> =
> \mathbf A_{\mathrm{ord}}
> -
> \bigl(\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}\bigr)_+
> \hat{\mathbf v}
> \quad\text{on }\{\|\mathbf V\|=c_f\},
> $$
>
> and $\dot{\mathbf V}=\mathbf A_{\mathrm{ord}}$ on the interior times.

*Proof.* Interior times give $N=\{0\}$. Let $E=\{T\in I:\|\mathbf V(T)\|=c_f\}$ and $\phi=\|\mathbf V\|^2$. Since $\phi$ is absolutely continuous, $\dot\phi=0$ a.e. on the level set $E$. At such times, $0=\mathbf V\mathbin{\cdot}\dot{\mathbf V} =c_f\,\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}-\lambda c_f$, so $\lambda=\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}$. Combined with $\lambda\ge0$, the boundary times where $\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}}<0$ form a null set, and a.e. on $E$, $\lambda= (\hat{\mathbf v}\mathbin{\cdot}\mathbf A_{\mathrm{ord}})_+$. $\square$

Plainly: if the reaction can only push straight inward and the velocity is not allowed to jump, then the reaction is forced to be exactly the minimum inward push that keeps the speed from growing. The arg-min does not need to be postulated separately; it follows.

Three consequences improve the axiom statement. First, the constitutive budget of the regular-chart law shrinks to (R1) plus (R2) plus the closed ball itself; the displayed arg-min becomes a derived property. Second, (R1) is metric-robust: for any isotropic (rotation-invariant) metric on the velocity ball, the orthogonal complement of the boundary tangent plane is still the radial line, so the selected response does not depend on choosing the Euclidean metric among isotropic ones. The real geometric input is the isotropy of the void, which the packet already owns. Third, (R2) is exactly the clause that a BV velocity with an inward atomic jump at the boundary would violate; this cleanly separates the regular-chart law from event laws, where atoms are decided (see Finding 7).

Claim grade: `derived` under (R1)–(R2); the proof is elementary and stated above. It is falsified by an absolutely continuous solution satisfying (R1) whose derivative differs from the projection on a positive-measure set.

Plainly: this does not contradict Hale or Thurston. They said the bare inclusion does not select the response at one instant, which is true. Along a non-jumping solution, however, the selection is unique, so the axiom can be restated with fewer independent clauses.

### Finding 2 — The constrained layer is classical; FSC-007 reduces to the ledger map

The projected dynamics has the exact form of an evolution inclusion governed by a maximal monotone operator: for a frozen ledger input $\mathbf f(T)=\mathbf A_{\mathrm{ord}}(T)$,

$$
\dot{\mathbf V}(T)+N_{\mathcal B_{c_f}}(\mathbf V(T))\ni\mathbf f(T),
\qquad
\mathbf V(0)=\mathbf V_0\in\mathcal B_{c_f}.
$$

The normal-cone map of a fixed closed convex set is maximal monotone, and this class of problems has a complete classical theory (Brezis-type evolution inclusions; equivalently Moreau's sweeping process with a fixed convex set; equivalently projected dynamical systems). For $\mathbf f\in L^1_{\mathrm{loc}}$ there is a unique absolutely continuous solution, it satisfies the minimal-selection formula of Finding 1 a.e., and the solution map is nonexpansive:

$$
\frac{d}{dT}\|\mathbf V_1-\mathbf V_2\|^2
=
2(\mathbf V_1-\mathbf V_2)\mathbin{\cdot}(\mathbf n_2-\mathbf n_1)
\le0
\;\Longrightarrow\;
\|\Delta\mathbf V(T)\|
\le
\|\Delta\mathbf V(0)\|
+
\int_0^T\|\Delta\mathbf f\|\,dT'.
$$

Plainly: the nonsmoothness of the boundary response is not a genuine obstacle. Once the incoming acceleration is treated as a given function of time, the capped velocity equation is a solved textbook problem with unique solutions and a stability estimate of constant one.

The consequence for FSC-007 is a decomposition. The full problem couples two layers: (A) the history-to-ledger map $\mathfrak h_T\mapsto\mathbf A_{\mathrm{ord}}(T)$, a state-dependent-delay object; and (B) the constrained velocity layer above. Layer (B) is closed by classical results and contributes Lipschitz constant one. Therefore FSC-007's entire remaining burden is the local Lipschitz continuity of layer (A) on a regular chart — precisely the branch-finiteness, $D_t$-floor, and root-separation obligations Hale already listed — after which a standard Picard iteration alternating (A) and (B) yields local existence and uniqueness. The nonexpansive estimate means the projection never worsens the contraction constant.

Claim grade: `derived reduction` (the layer-(B) theory is classical and its key estimate is displayed); the remaining layer-(A) obligations are unchanged and not advanced here. Falsified by an example where the frozen-ledger inclusion has two distinct absolutely continuous solutions from one initial value.

### Finding 3 — Ceiling self-regularization theorem: the cap tames its own root geometry

The packet's event-stratum catalogue treats folds, root accumulations, and multiple-branch coincidences as live strata that any complete model must own. For cap-admissible histories, most of that catalogue is empty, by a one-line mechanism the packet already displays but has not exploited: the transmitter-side factor obeys

$$
D_t
=
c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t
\ge
c_f-\|\mathbf V_t\|.
$$

> **Theorem (root monotonicity under the ceiling).** Suppose every transmitter velocity satisfies $\|\mathbf V_t(s)\|\le c_f$ for all $s\le T_r$. Then $\partial_sg_{r\leftarrow t}(T_r,s)=D_t\ge0$, so $s\mapsto g_{r\leftarrow t}(T_r,s)$ is nondecreasing and its zero set is connected: for each ordered channel the root set is a single point, a single characteristic interval, or empty. Nondegenerate folds ($D_t$ crossing zero transversally), two isolated roots in one channel, and root accumulation are all impossible. Moreover $\partial_{T_r}g=\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r-c_f\le0$, so the emission-time playback $dS/dT_r\ge0$ is never backward.

*Proof.* The displayed derivative identities are the packet's own; $\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t\le\|\mathbf V_t\|\le c_f$ gives monotonicity, and a nondecreasing function has a connected zero set. A fold requires $D_t<0$ on one side, hence a super-field-speed transmitter component along the line of sight, excluded by the cap. $\square$

Plainly: every complicated root pattern in the canonical unbounded model — double roots, folds, infinitely many self-hits — is manufactured by super-field-speed episodes. Inside the very model this packet proposes, those episodes do not exist, so the wake ledger is automatically simple: per transmitter, one crossing, or one co-moving grazing interval, or nothing.

This has three immediate uses. First, the event-stratum catalogue collapses for cap-admissible histories to exactly three types: simple root, characteristic interval, empty — which is precisely the pair of nonordinary geometries (same-transmitter co-moving interval, mirror-collinear partner interval) the packet already singles out. The proposed model is therefore closer to event-complete than its own catalogue suggests. Second, FSC-006's admissible perturbation class should be restricted to cap-admissible histories: within that class the fold normal form $g_\varepsilon(s)=a(s-s_0)^2-\varepsilon$ is not admissible (it needs $D_t<0$), so the two-branch $\varepsilon^{-1/2}$ total-variation obstruction does not arise from admissible perturbations. What survives is the single-branch degeneration $D_t\to0^+$, whose divergence is $1/D_t$ with no branch-pair bookkeeping — a strictly simpler limit problem. Third, positive playback everywhere excludes receiver-side wake caustics: no admissible history replays a transmitter's past out of order.

An independent numerical check (30 random smooth histories with speeds strictly below a sampled cap $v_{\mathrm{cap}}<1$ in $c_f=1$ units, float64, sampled diagnostic, not interval-certified) found zero violations of: monotone residual, exactly one root per distinct ordered channel, zero self roots, $D_t\ge c_f-v_{\mathrm{cap}}$ at the root, and the delay-horizon bound of Finding 5.

Claim grade: `derived` for the theorem (proof above, on the packet's own premises); `diagnostic` for the numerical check. Falsified by a cap-admissible history exhibiting two isolated roots in one ordered channel or a transversal fold.

One consequence must be flagged rather than celebrated: elsewhere in the corpus, multi-root richness from super-field-speed segments is a working resource (close-approach root multiplication, self-hit families). Under the ceiling that resource is structurally removed. Whether binding and assembly mechanisms survive on a one-root-per-channel ledger is a genuine physics question the compatibility decision should carry explicitly.

Plainly: the ceiling does not only constrain speed; it simplifies the whole causal bookkeeping. But some corpus mechanisms were built on the richness the ceiling deletes, and that trade must be examined, not assumed harmless.

## Part II — Blocker-removing reformulations

### Finding 4 — Effective-response topology: divergence in the projected-out cone is harmless

At a cap-state receiver, the response map factors. Writing $\mathbf A=a_\parallel\hat{\mathbf v}+\mathbf A_\perp$,

$$
\mathcal W_{\mathbf V}(\mathbf A)
=
\min(a_\parallel,0)\,\hat{\mathbf v}+\mathbf A_\perp
=
Q(\mathbf A),
\qquad
Q(\mathbf A)
:=
\bigl(\mathbf A_\perp,\ \min(a_\parallel,0)\bigr).
$$

The effective response depends on the forward component only through $\min(a_\parallel,0)$, which is Lipschitz-1 and bounded above by zero. Therefore a sequence of ledgers $\mathbf A^{(n)}$ whose transverse and backward parts converge produces a convergent effective response even when $a_\parallel^{(n)}\to+\infty$. Divergence purely in the projected-out cone is invisible to the dynamics.

> **Lemma (cap-aligned divergence stability).** Let $\mathbf A^{(n)}=\lambda_n\mathbf u_n+\mathbf B_n$ with $\lambda_n\to+\infty$, unit vectors $\mathbf u_n\to\hat{\mathbf v}$, and $\mathbf B_n\to\mathbf B$. Then $\mathcal W_{\mathbf V}(\mathbf A^{(n)})$ converges if and only if $\lambda_n\|\mathbf u_n^\perp\|$ converges, where $\mathbf u_n^\perp=\mathbf u_n-(\mathbf u_n\mathbin{\cdot}\hat{\mathbf v}) \hat{\mathbf v}$; in that case the limit is $\mathbf B_\perp+\lim\lambda_n\mathbf u_n^\perp$ (plus the backward part of $\mathbf B$). In particular exact collinearity ($\mathbf u_n^\perp\equiv\mathbf0$) is stable, and near-collinear divergence is stable exactly when the transverse misalignment vanishes faster than $1/\lambda_n$.

*Proof.* Direct computation from the displayed factorization; $\mathcal W(\lambda_n\mathbf u_n+\mathbf B_n) =\lambda_n\mathbf u_n^\perp+\text{(convergent terms)}$ once $a_\parallel^{(n)}>0$. $\square$

Plainly: the boundary rule throws away the forward push no matter how large it is. So an infinite forward push is not automatically a catastrophe — the catastrophe happens only if the diverging push tilts sideways too slowly, because then an infinite sideways remainder survives the projection.

This motivates reformulating FSC-006 in a quotient topology: require convergence of $Q(\mathbf A^{(n)}_{\mathrm{net}})$ — equivalently of the transverse and backward parts of the net ledger — rather than total-variation convergence of the raw receiver measure. The fold obstruction showed that raw TV control fails; this lemma shows raw TV control is stronger than the dynamics needs at cap-state receivers. The reformulated FSC-006 target is: prove or refute, for cap-admissible perturbations (Finding 3), convergence of the projected net response with the exact rate condition $\lambda_n\|\mathbf u_n^\perp\|\to\ell<\infty$ as the falsifiable hinge. The first transverse linearization in Section 12 of the packet is exactly the first-order computation of this misalignment rate and should be read as such.

Two boundaries. This helps only at receivers exactly on the cap; interior receivers take the identity response, so divergence there is real. And for FSC-005 the lemma sharpens rather than settles the question: the divergent zero-range row of the prescribed separating trace is longitudinal, so its disposition is decided by its sign. If it is speed-increasing it lies in the projected-out cone and the trace obstruction dissolves under the total-ledger response; if speed-decreasing it is retained divergently and the obstruction stands. The sign is fixed by the polarity product of the mirror pair, so FSC-005 should be posed sign-resolved from the start — consistent with the sign hypothesis Hörmander already required, now with a structural reason.

Claim grade: `derived` for the factorization and lemma; `proposed formulation` for the quotient-topology FSC-006 restatement. Falsified by a cap-admissible perturbation family with convergent transverse/backward net parts whose effective responses fail to converge.

### Finding 5 — The strict sub-wake ceiling: a regularized sibling worth solving first

All the remaining hard strata live at the exact degeneracy $c_{\mathrm{cap}}=c_f$: characteristic intervals, $D_t=0$ contact families, and MEC-007's threshold all require the architrino speed to reach the wake speed exactly. Consider the one-parameter sibling axiom with $\|\mathbf V\|\le c_{\mathrm{cap}}=(1-\epsilon)c_f$, $\epsilon>0$.

> **Theorem (strict sub-wake regularization).** If every architrino satisfies $\|\mathbf V\|\le(1-\epsilon)c_f$ for all time, then: (i) every ordered distinct channel has exactly one causal root, simple, with uniform floor $D_t\ge\epsilon c_f$; (ii) no self channel has any root; (iii) the root delay obeys the horizon bound $T_r-s_{\mathrm{root}}\le r_0/(\epsilon c_f)$, where $r_0$ is the current separation; (iv) the root time depends Lipschitz-continuously on the receiver time, with $dS/dT_r=(c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r)/D_t$ bounded between positive constants depending only on $\epsilon$.

*Proof.* (i) Monotonicity as in Finding 3 with strict floor; boundary values: $g\to r_0>0$ as $s\to T_r^-$, and $g\le r_0+(c_{\mathrm{cap}}-c_f)(T_r-s)\to-\infty$, so exactly one crossing, at delay at most $r_0/(c_f-c_{\mathrm{cap}})$, giving (iii). (ii) For the self channel, $r\le c_{\mathrm{cap}}(T_r-s)<c_f(T_r-s)$ strictly, so $g<0$ throughout. (iv) Implicit function theorem with the two uniform derivative floors. $\square$

Plainly: keep every architrino even slightly slower than its own wake, and the entire pathology budget disappears at once — each receiver hears each other architrino exactly once, never itself, never through a fold, and only over a finite, computable depth of past history.

Item (iii) deserves emphasis: it converts the state-dependent-delay problem from unbounded memory to a bounded delay horizon proportional to current separation, which places layer (A) of Finding 2 inside standard bounded-delay functional-differential theory. Hale's obligations 2 and 3 (branch finiteness, separation, transversality, Lipschitz root dependence) are discharged structurally rather than assumed. A complete existence-uniqueness theorem for the $\epsilon>0$ model is therefore a realistic near-term object, and the physical proposal $c_{\mathrm{cap}}=c_f$ can then be posed as the $\epsilon\to0$ limit of uniformly regular systems, with all difficulty concentrated in explicit $1/\epsilon$ constants instead of undefined strata.

Two honest costs. The sibling axiom introduces a new dimensionless scale $\epsilon$, which the current axiom is rightly proud of avoiding; if $\epsilon$ is only a mathematical regulator this is harmless scaffolding, but if it is physical it demands a value and a falsifier. And whether the physical ceiling is exactly $c_f$ is itself open: the corpus already keeps $c_f$, $c_{\mathrm{eff}}$, $c_\gamma$, and $c_0$ distinct until a closure proof identifies their regimes, and Lorentz recovery requires only that the emergent invariant speed govern observers, not that primitive paths ever attain the wake speed. In special relativity, massive worldlines approach and never reach the invariant speed. A strict sub-wake ceiling, or an asymptotically unattainable one (Finding 6), is at least as natural a recovery substrate as an attainable hard cap, and it is dramatically better posed.

Claim grade: `derived` for the theorem (proof above; independently spot-checked numerically per Finding 3); `proposed axiom variant` for the sibling model and its limit program. Falsified by a bounded-speed history violating any of (i)–(iv).

## Part III — Innovation and unification pressure

### Finding 6 — Embed the hard cap in a response-gain family; derive, do not decree

The hard projection is one member of the anisotropic-gain family

$$
\mathbf A_{\mathrm{eff}}
=
\alpha_\parallel(\|\mathbf V\|)\,a_\parallel\hat{\mathbf v}
+
\alpha_\perp(\|\mathbf V\|)\,\mathbf A_\perp,
$$

with the cap as the discontinuous member $\alpha_\parallel=\mathbb 1[\|\mathbf V\|<c_f\ \text{or}\ a_\parallel<0]$, $\alpha_\perp=1$. The observer-level velocity dynamics of special relativity is another member: at fixed applied ledger, $\alpha_\parallel=(1-\|\mathbf V\|^2/c_f^2)^{3/2}$ and $\alpha_\perp=(1-\|\mathbf V\|^2/c_f^2)^{1/2}$ — the $\gamma^{-3}$ and $\gamma^{-1}$ gains of longitudinal and transverse inertia. For bounded ledgers, the boundary is unreachable in finite time exactly when

$$
\int^{c_f}\frac{dv}{\alpha_\parallel(v)}=\infty,
$$

which the relativistic member satisfies. This yields a clean design trichotomy for any response family: exact interior recovery on the open ball forces $\alpha_\parallel\equiv1$ below the cap, hence finite-time boundary arrival (per MEC-007's conditional input), hence a mandatory event-law layer; whereas any smooth gain with a divergent reachability integral eliminates the boundary and every event-law obligation at the price of modifying the interior law at all speeds (by $O(\|\mathbf V\|^2/c_f^2)$ for the relativistic member).

Plainly: the packet chose "keep the canonical law exactly, pay with boundary event laws." Relativity, read as an effective velocity dynamics, made the opposite choice: "let inertia grow with speed, never touch the boundary, owe no event law." Both are members of one family, and the packet should say which trade it is making and why.

The unification pressure is this: in $\mathbb{A}\mathbb{A}\mathbb{A}$, inertia is emergent — a dressed architrino's response to an applied ledger is mediated by its entourage and sea. If the dressing calculation produces an effective anisotropic gain that steepens near $c_f$, then the ceiling is not a new primitive at all; it is the large-$\gamma$ signature of the same wake bookkeeping that generates mass, and the correct primitive-level statement may be either no cap (with the cap emerging at assembly level) or a cap that is never dynamically reached. The proposed derivation target is: compute the effective $(\alpha_\parallel,\alpha_\perp)$ of a dressed architrino from its declared entourage ledger, and determine which family member the theory actually produces. A bare straight sub-cap path receives no self row (Finding 3), so this is intrinsically an assembly/sea calculation, which is where the corpus expects inertia to live anyway.

Claim grade: `proposed unification target` with one `derived` support (the reachability criterion, an elementary ODE comparison). It is speculative as physics until the dressing calculation exists; it is falsified as a program if dressed response gains come out isotropic and speed-independent.

### Finding 7 — One parsimony principle can own both proposed laws

The packet currently carries two independently proposed laws: the least-change regular response and the zero-impulse collinear event coefficient. Finding 1 reduced the first to (R1) radial reaction plus (R2) no velocity atoms. The same parsimony extends to events:

> **Velocity-atom minimization (proposed consolidation).** Among event dispositions compatible with the constraint, the guard, and the retained ledger, select the one minimizing the total velocity atom $\sum_i\|\Delta\mathbf V_{i}\|$.

On regular charts this principle reproduces the least-change response (Finding 1: the minimizing atom is zero and absolute continuity holds). At the exact mirror-collinear contact it selects $\Delta\mathbf V_{i,\mathrm{contact}}=\mathbf0$ — the packet's postulate — provided the zero atom is compatible with some continuation, which is precisely the open right-hand-history obligation. The principle also adjudicates the label-exchange ambiguity the packet has not yet named: the pass-through one-jet ($\mathbf V_i^+=\mathbf V_i^-$) and the bounce ($\mathbf V_i^+=-\mathbf V_i^-$, equivalent to pass-through with labels swapped) produce identical unlabeled traces but physically different futures, because the two labels carry opposite polarity and later receivers read provenance from the wakes. Zero atom selects pass-through uniquely. If FSC-005 eventually proves the zero atom incompatible with every admissible continuation, the principle degrades gracefully: select the minimal-norm compatible atom, which then becomes a derived, not chosen, event coefficient.

Plainly: instead of two separate decrees — "project minimally during motion" and "no kick at contact" — one rule says: never change velocity by more than the constraint forces. Both decrees follow, and the rule even decides that the two architrinos pass through each other rather than bounce, because a bounce is a maximal velocity jump wearing a symmetric disguise.

An event-law covariance requirement should accompany any such principle: every event disposition must be equivariant under the isometry group of the void, absolute-time translation, and polarity-preserving label permutation. The proposed collinear reset satisfies this; the requirement usefully constrains all future nonordinary dispositions and costs nothing.

Claim grade: `proposed foundational consolidation`. Not adopted; its proof burden is exactly the existing right-hand-history obligation, plus a uniqueness argument that the minimizer is well defined per event class. It is falsified if two admissible dispositions tie at minimal atom yet produce different continuations with no further selector.

### Finding 8 — Preferred-frame leakage: the silent-ceiling dichotomy and a first computable residual

The cap sphere is defined on absolute velocity, so the proposed law is frame-anisotropic at the primitive level in the crudest possible way. The recovery obligation is therefore not optional. Two structural results frame it.

First, the **silent-ceiling lemma**: by exact interior recovery, any history whose constituents remain strictly inside the ball is a canonical history — the capped and canonical models are indistinguishable on it. Hence every observable consequence of the ceiling, including every preferred-frame leakage channel, localizes on the saturation set $\{T:\exists\,i,\ \|\mathbf V_i(T)\|=c_f\}$. This is trivial to prove and valuable to state: it says leakage phenomenology is not diffuse but is carried entirely by cap-touching episodes, and (per MEC-007's conditional input) close encounters generically produce such episodes, so the ceiling is not observationally silent.

Second, a first computable residual exists with the machinery already in the packet, and I propose it as the next diagnostic object (candidate FSC-008): the **drifting mirror encounter**. Repeat the Section 12 collinear analysis for a mirror pair whose center of symmetry translates at velocity $w\hat{\mathbf e}$, $0<w<c_f$, along the encounter axis. In the absolute frame the two partners are no longer symmetric: their delayed geometries, cap-arrival times, cap-segment durations, and coincidence events differ fore and aft. The leakage residual is the deviation of this solution family from the image of the rest solution under the theory's candidate emergent boost map (whatever the Lorentz-recovery program supplies for it). Its leading $O(w/c_f)$ term is a concrete, collinear, conditional calculation of exactly the kind Section 12 already performs — no new mathematical objects are required, only the drifted root equations. A nonvanishing residual with no compensating sea/dressing mechanism is the failure mode this entire architecture must eventually exclude; computing it early tells the program how large a burden the Noether-sea suppression story must carry.

Plainly: a theory with an absolute frame does not get to postpone the question "why does no experiment see the frame?" The cheapest honest start is to take the one encounter this packet already solves, push it sideways at drift $w$, and measure exactly how asymmetric the mathematics becomes. That asymmetry is the debt the emergent-relativity account must pay off.

Claim grade: `derived` for the silent-ceiling lemma (immediate from interior recovery plus Finding 2 uniqueness on regular charts); `proposed diagnostic target` for the drifting-mirror residual. The lemma is falsified by an interior-only history whose capped and canonical evolutions differ.

## Recommended queue impact

These are recommendations to the operator, not queue edits.

1. Restate the complete constrained-response axiom with (R1)–(R2) primitive and the arg-min displayed as the derived minimal-selection theorem (Finding 1); record the isotropic-metric robustness note.
2. Split FSC-007 into the classical constrained layer (cite the maximal monotone / sweeping-process reduction, Finding 2) and the ledger-map Lipschitz obligation, which becomes the sole open item.
3. Add the ceiling self-regularization theorem (Finding 3) to the packet and restrict FSC-006's admissible perturbation class to cap-admissible histories, retargeting the obstruction analysis from the fold pair to the single-branch $D_t\to0^+$ degeneration.
4. Reformulate FSC-006 convergence in the effective-response quotient topology (Finding 4) and pose FSC-005 sign-resolved.
5. Open the strict sub-wake sibling model (Finding 5) as a parallel theorem track: prove full well-posedness at fixed $\epsilon>0$, then study the $\epsilon\to0$ limit; carry the new-scale caveat explicitly.
6. Record the response-gain family and the dressed-gain derivation target (Finding 6) in brainstorming or as a named unification target; record the velocity-atom-minimization consolidation (Finding 7) as a candidate replacement for the two-law axiom budget.
7. Queue the drifting-mirror leakage diagnostic (Finding 8, candidate FSC-008) after FSC-006/007; it consumes only existing collinear machinery.
8. Add to the compatibility decision the flagged corpus consequence of Finding 3: the ceiling structurally removes super-field-speed root multiplicity, and any assembly mechanism relying on it must be re-derived or explicitly exempted.

## Review boundary

No packet file was edited. No ceiling, event law, contact measure, continuation, conservation account, Lorentz result, retained assembly, MEC advancement, or closure-score movement is adopted or implied. The three theorems stated here (minimal selection, root monotonicity, strict sub-wake regularization) are supplied with complete elementary proofs on the packet's own premises and await independent checking before integration; the numerical spot-check is a float64 sampled diagnostic, not a certificate. All Part III items are proposals whose proof burdens are named where they are stated.

Closure goal: integrate the minimal-selection and self-regularization theorems to shrink the axiom budget and the event-stratum catalogue, then retarget FSC-006 in the effective-response topology on cap-admissible perturbations before posing any continuation or well-posedness review.

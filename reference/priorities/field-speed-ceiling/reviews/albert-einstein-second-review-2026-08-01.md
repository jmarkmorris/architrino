# Albert Einstein Second Field-Speed Ceiling Review

**Review identifier:** `FSC-001-AE2-2026-08-01` **Reviewer:** Albert Einstein, using the existing [Albert Einstein specialist lens](../../../research-office/specialists/roles-geometry-dynamics/albert-einstein.md) **Review mode:** completed read-only second review of the post-integration [mathematics packet](../analysis/mathematics-geometry-dynamical-system.md), against the [first-review response](albert-einstein-review-response-2026-08-01.md) and the full packet directory **Captured:** 2026-08-01 **Response authority:** review findings only; no packet edit performed **Theory status:** no ceiling, event law, continuation, contact measure, Lorentz result, retained assembly, or canonical change adopted or advanced

## Review scope and boundary

This second pass examined the integrated minimal-selection theorem, the frozen-ledger constrained layer, the cap-admissible root-monotonicity theorem, the revised FSC-006/007 targets, the retained brainstorming alternates, the [endpoint reanalysis](../analysis/capped-collinear-endpoint-reanalysis.md), the [FSC-005 theorem target](../analysis/near-contact-separating-trace-incompatibility-theorem-target.md), and the response's rejection of the first review's quotient lemma.

Findings 0.1–0.2 concern the integration itself. Findings 1–3 are new theorem-grade mathematics with proofs. Findings 4–5 are blocker-removing program reformulations. Findings 6–7 are structural observations for the recovery obligation. Every proposed object is graded where stated.

Plainly: the editor integrated the first review honestly and caught two real errors in it. This pass concedes those errors, repairs what survives them, and then supplies three new results that further shrink the packet's unknown territory — most importantly, a complete classification of the nonordinary strata the closed model can actually produce.

## Part 0 — Integration audit

### Finding 0.1 — The Finding-4 rejection is correct; here is the exact survivor

The response's rotating-vector counterexample is valid: convergence of the scalar $\lambda_n\|\mathbf u_n^\perp\|$ does not give a limiting transverse vector, and the first review's limit formula wrongly retained a finite backward summand that the projection in fact removes whenever the net radial component is positive. Both errors are conceded without reservation. The response is also right on the deeper point: the proposed response has no domain on an infinite raw ledger, so no quotient construction may replace FSC-006's raw-measure obligation.

What survives is strictly weaker and strictly finite. At a cap-state receiver with unit direction $\hat{\mathbf v}$, the response factors exactly:

$$
\mathcal W_{\mathbf V}(\mathbf A)
=
\min(a_\parallel,0)\,\hat{\mathbf v}
+
\mathbf A_\perp,
\qquad
a_\parallel=\hat{\mathbf v}\mathbin{\cdot}\mathbf A,
$$

and $\mathcal W_{\mathbf V}$ is $1$-Lipschitz in $\mathbf A$: $\|\mathcal W(\mathbf A)-\mathcal W(\mathbf B)\|^2 =|\min(a_\parallel,0)-\min(b_\parallel,0)|^2 +\|\mathbf A_\perp-\mathbf B_\perp\|^2 \le\|\mathbf A-\mathbf B\|^2$. Consequently, along any family of complete finite ledgers at cap-state receivers with $\hat{\mathbf v}^{(n)}\to \hat{\mathbf v}$, the effective responses converge if and only if the transverse vectors $\mathbf A^{(n)}_\perp$ and the backward scalars $\min(a^{(n)}_\parallel,0)$ converge — the forward scalar may diverge to $+\infty$ with no effect. Each object in this statement is a finite ledger; no infinite-ledger domain is invoked, and the limit is a limit of finite effective responses, a diagnostic with no dynamical status of its own.

Claim grade: `derived` (three-line computation above). One useful corollary for FSC-005: its refutation route "the effective response nevertheless defines a finite vector Radon measure" holds if and only if the leading $\delta^{-2}$ coefficient $\mathbf b_i$ lies in the closed forward ray cone — zero transverse part and nonnegative radial part — since $\mathbf p_i=\mathcal P_{\mathbf V_i}(\mathbf b_i)=\mathbf0$ exactly then. The per-channel sign lemma is therefore not one lemma among eight; it is the single decisive hinge, and the factorization says nothing else can rescue or doom the trace at leading order.

Plainly: my first formulation claimed a size condition could control a direction, and the editor's rotating arrow refutes that. The honest residue is smaller: the boundary rule ignores how large the forward push is, so along any family of legitimate finite ledgers, only the sideways vector and the braking scalar decide convergence. For FSC-005 that means everything reduces to the sign and direction of one leading coefficient.

### Finding 0.2 — Integration is faithful; four small corrections

The minimal-selection theorem, frozen-ledger layer, root-monotonicity theorem, cap-admissible FSC-006 restriction, and brainstorming alternates are integrated accurately with correct scope labels. Four residual items:

1. **Weaken the differentiability hypothesis.** Root monotonicity is stated for a differentiable retained transmitter history, but the packet's own solution concept guarantees only Lipschitz paths with $BV$ velocities. The theorem holds for Lipschitz paths with $\operatorname{ess\,sup}\|\mathbf V_t\|\le c_f$: $g$ is then locally Lipschitz in $s$ with $\partial_sg=D_t\ge0$ a.e., and a locally Lipschitz function with nonnegative a.e. derivative is nondecreasing. The hypothesis should match the solution class.
2. **$D_r\ge0$ is derivable, not hypothetical.** The packet states positive playback conditionally, "if $D_r\ge0$." Under the closed domain the receiver is also capped, so $D_r=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r \ge c_f-\|\mathbf V_r\|\ge0$ automatically. On cap-admissible histories, nonnegative playback at simple roots is unconditional. The conditional phrasing should be kept only where one trace is prescribed outside the closed model.
3. **Supply the frozen-ledger existence construction in-document.** The uniqueness and contraction estimates are proved by the displayed monotonicity, but existence currently rests on unnamed external theory. The repo's evidence norms favor a named construction: the catching-up scheme $\mathbf V_{k+1} =\Pi_{\mathcal B_{c_f}}\!\bigl(\mathbf V_k +\int_{T_k}^{T_{k+1}}\mathbf f\,dT\bigr)$ produces equi-Lipschitz interpolants (the ball projection is nonexpansive), the same monotonicity estimate shows the interpolants are Cauchy in $C^0$ as the step vanishes, and the limit satisfies the inclusion. Five lines close the layer without external authority.
4. **The fold row of the event catalogue is empty in the closed model.** A transversal fold needs $D_t$ to change sign — already excluded. But more is true on a $C^2$ chart: at an isolated degenerate root, $g'\ge0$ with $g'(s_0)=0$ makes $s_0$ an interior minimum of $g'$, so $g''(s_0)=0$. The catalogue's fold stratum ($D_t=0$ with nonzero second derivative) is therefore empty for cap-admissible histories; the generic degenerate isolated root is a cubic grazing root, $g'(s_0)=g''(s_0)=0$, $g'''(s_0)>0$. The catalogue should record this replacement (see Finding 1 for what the grazing geometry means).

Claim grade: `derived` for all four (arguments displayed). Falsifiers: a Lipschitz cap-admissible history violating monotonicity; a cap-admissible simple root with $D_r<0$; failure of the catching-up limit to satisfy the inclusion; a cap-admissible $C^2$ history with an isolated root at which $D_t=0$ and $g''\ne0$.

Plainly: the theorems went in correctly. The four fixes are: state them for the paths the model actually allows, stop assuming what the cap already proves about the receiver, prove the one imported existence fact on the spot, and delete an event type that the ceiling makes impossible.

## Part I — New theorems

### Finding 1 — Characteristic-interval rigidity: the nonordinary strata are completely classified

The packet treats the general nonordinary event law as an open-ended obligation over an unbounded catalogue. Under the ceiling, that catalogue collapses to two exactly-characterized geometries.

> **Theorem (characteristic-interval rigidity).** Let the transmitter history be Lipschitz and cap-admissible, and fix a receiver event $(T_r,\mathbf X_r(T_r))$. If the channel root set contains a nondegenerate interval $[s_1,s_2]$, then on that interval the transmitter traverses the straight chord toward the point $\mathbf X_r(T_r)$ at exactly speed $c_f$:
>
> $$
> \mathbf V_t(s)
> =
> c_f\,\hat{\mathbf r}(s)
> \quad\text{a.e. on }[s_1,s_2],
> $$
>
> with $\hat{\mathbf r}(s)$ the unit vector from $\mathbf X_t(s)$ to $\mathbf X_r(T_r)$, which is constant along the motion. Conversely, every such exact-aim cap-speed chord with one point on the wakefront yields $g\equiv0$ on the whole segment.

*Proof.* From $g\equiv0$, the range satisfies $\rho(s)=\|\mathbf X_r(T_r)-\mathbf X_t(s)\|=c_f(T_r-s)$, so $\rho'(s)=-c_f$ a.e. But $\rho'(s)=-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t \ge-\|\mathbf V_t\|\ge-c_f$, with equality forcing $\mathbf V_t=c_f\hat{\mathbf r}$. Motion at constant speed directly toward a fixed point follows the straight chord, so $\hat{\mathbf r}$ is constant. For the converse, $\rho(s)=\rho(s_1)-c_f(s-s_1)$ gives $g(s)=g(s_1)=0$ identically. $\square$

Combined with root monotonicity, this closes the classification. For a cap-admissible Lipschitz history, the per-channel root set at any receiver event is exactly one of:

1. **empty**;
2. **one simple root** ($D_t>0$) — the ordinary row;
3. **one grazing root** — isolated, $D_t(s_0)=0$: the transmitter is momentarily at exact cap speed aimed exactly at the receiver event position (cubic tangency generically, by Finding 0.2 item 4); or
4. **one rigid characteristic interval** — the transmitter holds exact cap speed on a straight chord aimed exactly at the receiver event position for a finite emission time.

The self co-moving family is the instance of stratum 4 in which the aim point lies on the transmitter's own forward path; the mirror-collinear partner interval is the instance in which the aim point is the coincidence position. The packet's two proposed conventions therefore do not treat two examples from an open zoo; they treat the only two symmetric instances of the only interval geometry the closed model admits. The "missing event-domain postulate" row of the provenance table can be upgraded: what is missing is a declared disposition for strata 3 and 4 (including their endpoint transitions), and nothing else. An independent numerical check (exact-aim chord reproduces $g\equiv0$ to machine zero over the whole interval; the same geometry at speed $0.999\,c_f$ collapses to exactly one simple root; float64 sampled diagnostic) found no violation.

Claim grade: `derived` under the stated cap-admissibility and Lipschitz hypotheses, with the complete proof above. Falsified by a cap-admissible history whose channel root set at some receiver event is a nondegenerate interval on which the transmitter is not an exact-aim cap-speed chord, or is disconnected.

Plainly: for a whole stretch of emissions to stay glued to one receiver event, the transmitter must fly straight at the receiver's meeting point at exactly wake speed, like an arrow riding its own bow wave toward a marked spot. Anything less instantly reduces the family to a single crossing. So the event law does not face an unbounded bestiary — it faces exactly one rigid geometry, plus its momentary grazing version.

### Finding 2 — Total-variation transfer: the FSC-006 divergence is the zero-range endpoint, not $D_t\to0^+$

FSC-006's central worry is that the receiver-time measure of a single branch blows up as $D_t\to0^+$. The blow-up is a parameterization effect, made exact by a one-line change of variables.

> **Lemma (TV transfer).** On a simple-root branch $S(T)$ over a receiver-time window $B$, with $dS/dT=D_r/D_t$,
>
> $$
> \int_B\frac{\|\mathbf K\|}{D_t}\,dT
> =
> \int_{S(B)}\frac{\|\mathbf K\|}{D_r}\,dS.
> $$

*Proof.* Substitute $dT=(D_t/D_r)\,dS$ in the coarea weight. $\square$

The receiver-time total variation of a branch is therefore controlled by the emission-side integral with the receiver-side Jacobian. On a window where the kernel is bounded ($r\ge r_{\min}>0$) and the receiver-side factor has a floor ($D_r\ge d_r>0$ — automatic with margin for head-on geometries, e.g. $D_r=2c_f$ in the mirror chart), the branch TV is bounded by $\sup\|\mathbf K\|\cdot|S(B)|/d_r$, **uniformly in $D_t$**. The transmitter-side degeneration $D_t\to0^+$, by itself, costs nothing. An independent numerical check on generic sub-cap paths reproduces the identity to relative error $6\times10^{-9}$ (float64 sampled diagnostic).

Apply this to the mirror-contact family. On the contact interval the range is $r=c_f(T_{\mathrm c}-s)$, so the transferred density is $\|\mathbf K\|/D_r\sim K/\bigl(2c_f^2(T_{\mathrm c}-s)^2\bigr)$: integrable on $\{s\le T_{\mathrm c}-\rho\}$ for every $\rho>0$ and divergent only in the endpoint tail $s\to T_{\mathrm c}^-$, i.e. at vanishing range. The divergence of the candidate contact measure is thereby **localized**: it comes entirely from the zero-range emissions, and not at all from the characteristic degeneration. This suggests splitting FSC-006 into:

- **(a) Far-part convergence theorem (provable now).** For cap-admissible families converging in the packet's declared candidate topology, with range floor $\rho$ and $D_r$ floor on the window, the truncated split measures converge weak-* to the atom at $T_{\mathrm c}$ with vector coefficient $\int_{\{r\ge\rho\}}\mathbf K(T_{\mathrm c},s)/D_r(s)\,ds$ — by uniform TV (above), collapse of the branch image $T^{(n)}(S)\to T_{\mathrm c}$, and dominated convergence (the $L^1$ velocity convergence in the declared topology supplies an a.e.-convergent subsequence; uniqueness of the limit then removes the subsequence). Labels and channels stay separate throughout.
- **(b) Zero-range tail disposition (the real problem).** The $\rho\to0$ divergence of the far coefficient is the same inverse-square zero-range geometry that drives FSC-005's $\delta^{-2}$ obstruction. FSC-006's unresolved content and FSC-005's unresolved content are one problem — the zero-range problem — viewed through two instruments: the raw receiver measure before the event, the effective response after it.

Claim grade: `derived` for the lemma and the localization computation; `proposed formulation` for the (a)/(b) split and the far-part theorem, whose proof sketch is displayed but whose integration into FSC-006 belongs to the operator. Falsified by a cap-admissible single-branch family with range and $D_r$ floors whose receiver-time TV is unbounded, or by a far-part limit that depends on the perturbation family.

Plainly: measured in the receiver's clock, the wake rows look like they explode as the geometry goes characteristic. Measured along the emission history, the same content is perfectly finite unless the two architrinos are actually at vanishing distance. So the packet's two hardest open items are secretly the same item: what happens at vanishing range. Everything else about the contact measure is now within reach of ordinary analysis.

### Finding 3 — FSC-007 skeleton: the branch inventory is automatic and the root map is stable

The response correctly leaves FSC-007's open burden at the history-to-ledger map. Two structural facts shrink that burden, and one estimate starts it.

First, root monotonicity makes the "fixed finite branch inventory" assumption automatic on cap-admissible charts: each ordered channel carries at most one root, so the ledger has at most $N-1$ rows per receiver, and the chart datum reduces to which channels are active plus floors — no separate branch-counting hypothesis is needed. Second, the required Lipschitz root dependence on the history is a two-line consequence of the $D_t$ floor:

> **Lemma (root stability).** Let two cap-admissible histories $h,h'$ agree at the receiver time and satisfy $\|h'-h\|_\infty=\sup\|\mathbf X'-\mathbf X\|$ on the delay window, and let both have a simple root in the channel with $D_t\ge d_{\min}$ between the roots. Then
>
> $$
> |S'-S|
> \le
> \frac{2\,\|h'-h\|_\infty}{d_{\min}}.
> $$

*Proof.* $|g(T,S';h)|=|g(T,S';h)-g(T,S';h')| \le\|\mathbf X'_r-\mathbf X_r\|(T)+\|\mathbf X'_t-\mathbf X_t\|(S') \le2\|h'-h\|_\infty$, and $g(T,\cdot\,;h)$ has derivative $\ge d_{\min}$ between $S$ and $S'$. $\square$

With the root map stable, each row is a $C^1$ function of $(\mathbf X_r(T),\mathbf X_t(S),\mathbf V_t(S))$ on the chart $\{r\ge r_{\min},\,D_t\ge d_{\min},\,\|\mathbf V_t\|\le c_f\}$, with a gradient bound $C_0(\kappa q^2,c_f,r_{\min},d_{\min})$; composing with the lemma and a chart a-priori acceleration bound $A_{\max}$ (self-consistently supplied by the ledger bound on a short interval) gives the ledger map a Lipschitz constant $L=L(N,C_0,c_f,A_{\max},d_{\min})$ from the $C^0$-position, $C^0$-velocity history norm on the bounded delay window. The FSC-007 proof plan is then: (i) prove the row-gradient bound $C_0$ explicitly; (ii) close the Picard iteration alternating the ledger map with the already-unique frozen-ledger layer (constant one), on an interval length below $1/L$, with the a-priori $A_{\max}$ verified at the fixed point; (iii) handle channel-activation changes at the chart boundary as chart exits, not as events. Only (i) and (ii) involve real work, and both are standard.

Claim grade: `derived` for the two displayed facts; `proposed theorem program` for the skeleton. Falsified by a cap-admissible chart on which the displayed root-stability bound fails, or by a fixed-point argument that requires more than the listed floors.

Plainly: the delayed system's scariest feature — not even knowing how many wake rows exist — is gone: the cap fixes the count. The next scariest — whether a small change of history wildly moves the reception times — is bounded by the transversality floor. What remains for FSC-007 is careful but routine: bound one gradient, run one contraction.

## Part II — Program reformulations

### Finding 4 — Reorganize FSC-006/FSC-005 around the zero-range problem

Given Findings 1–2, the recommended shape of the queue's head is:

1. FSC-006a: prove the far-part convergence theorem (Finding 2a) in the declared topology — a bounded, reviewable, likely-positive result that would give the program its first finite, parameterization-independent contact-adjacent measure.
2. FSC-006b/FSC-005: pose the zero-range problem once, jointly: leading $\delta^{-2}$ coefficient, both ordered channels, sign lemma (decisive by Finding 0.1), no-leading-cancellation, and the raw-measure tail — with the rigidity theorem guaranteeing no other nonordinary geometry can interleave.
3. FSC-007: execute the skeleton of Finding 3 in parallel; it shares no dependency with the zero-range problem.

Claim grade: `proposed queue reformulation`; the operator owns ranking.

### Finding 5 — The event-law obligation is now two dispositions, not a postulate family

By the classification of Finding 1, a complete closed-domain event layer needs exactly: a disposition for grazing roots (stratum 3), a disposition for rigid aimed intervals (stratum 4) covering both the self and partner instances and their endpoint transitions, and the cross-channel simultaneity bookkeeping the monotonicity theorem explicitly leaves open. The "Nonordinary Contact Admission and Event Postulate" can be restated with this finite scope, and the provenance table's `missing event-domain postulate` row can name the two strata instead of an open class. This is a statement about the size of the obligation, not about its resolution.

Claim grade: `derived scope reduction` conditional on Finding 1's hypotheses. Falsified with Finding 1.

Plainly: before, the packet owed an event law for "whatever nonordinary geometry may exist." Now it owes exactly two rulings. That is the difference between an open frontier and a short list.

## Part III — Structural observations

### Finding 6 — MEC-007 is the ceiling's falsifiability gate

The response rightly rejects "close encounters generically saturate" as unproved while MEC-007 is `Awaiting verification`. The clean statement is a dichotomy the program should carry explicitly: by interior recovery, the closed and open models coincide on every history that never saturates; hence if canonical sub-cap data never reach $c_f$ in finite time, the ceiling has no realized consequence and is unfalsifiable within the theory's own dynamics, while if MEC-007-type finite-time saturation is verified, the entire event layer becomes physical and the preferred-frame residual (FSC-008) becomes mandatory. Either way, MEC-007's verification is not merely an input to Section 12; it is the gate deciding whether the ceiling is physics or bookkeeping. Its priority inside this program should reflect that.

Claim grade: `derived dichotomy` from interior recovery plus frozen-ledger uniqueness on regular charts; the generic-saturation question itself remains entirely with MEC-007.

### Finding 7 — The zero-range problem is one-sided

Combining the endpoint reanalysis with the response factorization: on the incoming cap segment the divergent partner geometry is forward (speed-increasing) and is annihilated by the projection — the effective dynamics is finite all the way to coincidence. On any separating trace the same zero-range geometry is backward (speed-reducing) and is fully retained. The singular difficulty of the mirror encounter therefore lives entirely on the outgoing side: approach is effectively regular, departure is not. This asymmetry is not time-reversal symmetric — as expected, since the delayed ledger reads only the past — and it sharpens where any continuation law must act: not at the contact atom (the proposed zero coefficient is consistent with the incoming side), but in the first instant of separation.

Claim grade: `derived observation` conditional on the endpoint reanalysis's conditional inputs and sign computations. Falsified by a same-record census reversing the incoming-forward or outgoing-backward sign.

Plainly: falling together is easy — the rule that ignores forward pushes absorbs the blow-up. Coming apart is the hard part, because the same blow-up then points backward, where the rule must keep it. Whatever law eventually governs separation carries the whole remaining difficulty of this encounter.

## Recommended queue impact

Recommendations only; the operator owns disposition.

1. Apply the four small corrections of Finding 0.2 (Lipschitz hypothesis, derived $D_r\ge0$, in-document catching-up existence, empty fold row plus grazing stratum) to the mathematics packet.
2. Integrate the characteristic-interval rigidity theorem (Finding 1) and restate the event-domain obligation with its two-strata scope (Finding 5).
3. Add the TV-transfer lemma and divergence localization (Finding 2); split FSC-006 into the provable far-part theorem and the jointly-posed zero-range problem with FSC-005 (Finding 4).
4. Record the corrected effective-response factorization (Finding 0.1) as the finite-ledger diagnostic it is, superseding the rejected quotient lemma, and note its corollary inside the FSC-005 target: the sign lemma is the decisive hinge.
5. Adopt the FSC-007 skeleton (Finding 3) as the theorem plan: row-gradient bound, then Picard closure; the branch-inventory assumption may be deleted as automatic.
6. Carry the MEC-007 falsifiability-gate dichotomy (Finding 6) in the priorities document, and the one-sidedness observation (Finding 7) in the endpoint reanalysis.

## Review boundary

No packet file was edited. The first review's quotient lemma stands rejected; its two errors are conceded and the corrected finite-ledger factorization is supplied with proof. The rigidity theorem, TV-transfer lemma, root-stability lemma, and classification corollary are proved above on the packet's own premises and were independently spot-checked numerically (float64 sampled diagnostics, not certificates); they await independent verification before integration. No ceiling, event law, contact measure, continuation, conservation account, Lorentz result, retained assembly, MEC advancement, or closure-score movement is adopted or implied.

Closure goal: integrate the rigidity classification and TV-transfer localization so that FSC-006 reduces to the far-part theorem plus one jointly-posed zero-range problem, then run the FSC-007 skeleton to its contraction argument.

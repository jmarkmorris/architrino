# Independent Adjudication of the Same-Transmitter Delay Floor

## Disposition and scope

**Accept the reciprocal-delay variation bound and the uniform positive self-delay floor on the candidate's stated regular solution class. Accept the fixed-reception quantifier correction, retaining the additional quadratic restriction for incoming moving receptions with a $C^2$ endpoint. Reject extending either result to universal populated self-birth exclusion.** The proof below reconstructs the estimate from the canonical causal constraint and acceleration row, including the backward continuation needed to make the floor uniform across different root branches.

The reviewed subject is [Same-Transmitter Reachability Under the Sharp EOM](mec-008-self-channel-reachability.md), frozen before adjudication. The [current effort contract](../work-queue.md#effort-contracts) assigns this file as the exclusive durable output. The reviewed subject, canonical sources, existing reference instruments, queue, trackers, and synthesis documents are read-only. This report supplies a mathematical acceptance recommendation for the bounded theorem; it does not change MEC lifecycle status or select an admissible population class.

| Claim under review | Verdict | Grade and exact boundary |
| --- | --- | --- |
| Exact reciprocal-delay identity | **Accept** | **Derived** on each positive-delay simple self-root graph; either sign of transmitter factor and zero delay derivative are included. |
| Integrated variation estimate | **Accept** | **Derived** for a complete sharp-EOM receiver equation, a common forward cone, bounded emission and reception velocities, locally absolutely continuous receiver velocity, and an integrable opposing remainder. |
| One floor for every recent root | **Accept** | **Derived** on the stated finite reception interval with complete, finite, simple recent-root sections, regular initial/cutoff sections, and a positive initial minimum delay. No uniform root count or transmitter-factor margin is needed. |
| Isolated regular self-diagonal approach | **Accept exclusion** | **Derived** when the preceding hypotheses hold; uniformly bounded remainder row counts, positive ranges, and transmitter margins are sufficient for the opposing integral bound. |
| Vanishing quadratic and cubic coefficients at one fixed reception | **Accept** | **Derived necessary conditions**, not sufficient conditions for roots or an EOM solution. |
| Same coefficient conditions for arbitrary moving receptions | **Reject** | The endpoint-speed condition survives under continuous velocity. Incoming $C^2$ sequences also require zero endpoint speed derivative. Cubic vanishing does not follow on the unrestricted $C^4$ velocity domain. |
| Actual self-birth supplied by stationary mirror release or distinct-label contact | **Reject** | Their retained conclusions do not contain an evolving same-label positive-delay sequence approaching zero. |
| All admitted finite or infinite populations avoid self-diagonal approach | **Unresolved** | The theorem supplies neither a bound for all opposing remainders nor continuation through all singular self-root lineages, nor finite endpoint velocity for every admitted evolution. |

Each acceptance is supported by a derivation below. Each rejection identifies the missing implication rather than asserting the opposite physical outcome. The final falsifier table specifies observations that would overturn the bounded conclusions.

## Canonical geometry and solution hypotheses

Fix one persistent label $i$. Its position is $\mathbf X(T)$ and its velocity is $\mathbf V(T)$ in absolute time. Work throughout with normalized wake speed $c_f=1$. For an earlier emission $s<T$ by that same label, define the delay $\delta=T-s$ and the causal residual

$$
F(T,s)=\|\mathbf X(T)-\mathbf X(s)\|-(T-s).
$$

A self root has $F(T,s)=0$ and $\delta>0$. On such a root the range equals $\delta$ and the emission-to-reception unit vector is

$$
\mathbf n=\frac{\mathbf X(T)-\mathbf X(s)}{\delta}.
$$

The [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) fixes the self polarity as positive and assigns the regular self row

$$
\mathbf A_s=\frac{K_i}{\delta^2|D_t|}\mathbf n,
\qquad
K_i=\kappa|q_i|^2>0,
\qquad
D_t=1-\mathbf n\cdot\mathbf V(s),
\qquad
D_r=1-\mathbf n\cdot\mathbf V(T).
$$

Here $q_i$ is the label's fixed polarity magnitude with its sign, $K_i$ is its positive self coupling, $D_t$ is the emission-time derivative of the residual, and $D_r$ controls reception playback. The row is postulated input; the estimates derived from it are conditional mathematical consequences. No force, primitive mass, conserved account, or external physics law enters the argument.

For a single recent-root graph, assume a continuously differentiable path on all its emission-to-reception intervals and $D_t\ne0$ on its interior. Assume that the actual receiver equation retains every admitted row and can be written

$$
\dot{\mathbf V}=\mathbf S+\mathbf R,
\qquad
\mathbf S(T)=\sum_{0<T-s<\delta_0}\mathbf A_s(T),
$$

where $\delta_0>0$ is a fixed recent-delay cutoff and $\mathbf R$ is the actual sum of all remaining partner and older self rows. A canonical infinite sum would need its own justified meaning; this decomposition does not supply one. For the theorem under review, recent-root sections are finite. Receiver velocity is locally absolutely continuous, so on every compact reception interval its derivative integrates to its velocity change and the EOM holds almost everywhere. The remainder is locally integrable.

The quantitative hypotheses use a fixed unit vector $\mathbf e$ and constants $M>0$ and $c>0$:

$$
\|\mathbf V(T)\|\le M,
\qquad
\|\mathbf V(s)\|\le M,
\qquad
\mathbf e\cdot\mathbf n\ge c
$$

for every recent chord considered. Thus all recent self rows have a positive component along one fixed direction. Define the projected receiver velocity and the opposing part of the actual remainder by

$$
P(T)=\mathbf e\cdot\mathbf V(T),
\qquad
b(T)=\max\{0,-\mathbf e\cdot\mathbf R(T)\}.
$$

The endpoint estimate assumes $\int b\,dT\le B<\infty$ over the full reception interval. It requires only this negative projection to have a finite integral; the remainder need not have a uniform pointwise bound. Neither $\mathbf R$ nor $b$ is an adjustable cancelling term or a physical account. They are determined by the same complete receiver equation.

## Independent reciprocal-delay derivation

At positive range, differentiation at fixed values of the other argument gives

$$
F_s=1-\mathbf n\cdot\mathbf V(s)=D_t,
\qquad
F_T=\mathbf n\cdot\mathbf V(T)-1=-D_r.
$$

The implicit-function theorem therefore gives a continuously differentiable emission graph and its signed playback:

$$
s'(T)=\frac{D_r}{D_t},
\qquad
\delta'(T)=1-s'(T)
=\frac{\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]}{D_t}.
$$

Multiplying the absolute numerator by the canonical row magnitude yields

$$
\|\mathbf A_s\|\,
\big|\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]\big|
=\frac{K_i|\delta'|}{\delta^2}
=K_i\left|(\delta^{-1})'\right|.
$$

This identity does not divide by the velocity difference. It remains valid when the delay is momentarily stationary, because both sides then vanish. Negative $D_t$ changes signed playback but not the positive self-row magnitude. A receiver playback turning point $D_r=0$ is also harmless. Only $D_t=0$ removes the simple-root hypothesis.

The velocity bound gives $|\mathbf n\cdot[\mathbf V(T)-\mathbf V(s)]|\le2M$. Hence

$$
\|\mathbf A_s\|\ge\frac{K_i}{2M}\left|(\delta^{-1})'\right|.
$$

Every recent row has $\mathbf e\cdot\mathbf A_s\ge c\|\mathbf A_s\|$. Summing all recent rows cannot diminish this component, so any tracked one satisfies

$$
\frac{cK_i}{2M}\left|(\delta^{-1})'\right|
\le\mathbf e\cdot\mathbf S
=P'-\mathbf e\cdot\mathbf R
\le P'+b
\quad\text{almost everywhere}.
$$

There is no sign assumption on $P'$ alone. The nonnegative quantity is $P'+b$, which must accommodate the recent self contribution. Absolute continuity now permits integration on any compact portion $[T_1,T_2]$ of the graph:

$$
\frac{cK_i}{2M}
\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})
\le P(T_2)-P(T_1)+\int_{T_1}^{T_2}b(T)\,dT.
$$

Here total variation is the integral of the absolute derivative on that compact interval. It counts every reversal of delay, rather than only the net delay change. Since $|P|\le M$, the candidate's uniform constant is correct:

$$
\operatorname{Var}_{[T_1,T_2]}(\delta^{-1})\le C,
\qquad
C=\frac{2M}{cK_i}(2M+B).
$$

For any two points on one connected recent-root graph, variation bounds their reciprocal-delay difference. Therefore

$$
\delta(T)\ge\left[\delta(T_0)^{-1}+C\right]^{-1}>0.
$$

The estimate works in either reception direction. In particular, it excludes both disappearance into the diagonal at a later endpoint and emergence from the diagonal at an earlier endpoint, while all stated hypotheses hold on the incident graph. It assumes neither bounded acceleration nor acceleration continuity at the endpoint.

**Claim grade: derived.** This independently reconstructs the candidate's constants and signs. A complete canonical simple-root solution obeying these bounds but violating the displayed integrated inequality would falsify the result; a large sampled row alone would not.

## Why the floor is uniform across root branches

The preceding argument anchors each graph at one of its own positive delays. That alone cannot exclude a sequence on different graphs whose anchor delays tend to zero. The candidate adds the correct provenance hypotheses to prevent this escape.

Fix a finite interval $I=[a,T_*)$. Assume $\mathbf X\in C^1([a-\delta_0,T_*))$ and the velocity, cone, EOM, and remainder conditions above on that domain. At every reception in $I$, require the **complete** root set with $0<\delta\le\delta_0$ to be finite and every such root to be simple. This universal requirement includes limiting roots at interior reception times, roots at the initial section $T=a$, and roots at the cutoff $\delta=\delta_0$; it cannot be replaced by regularity of only the sampled or currently followed roots. If the initial recent section is nonempty, let $\delta_{\mathrm{in}}>0$ be its minimum delay; otherwise set $\delta_{\mathrm{in}}=\delta_0$.

Choose any recent root at a reception $T_0>a$. The implicit-function theorem gives a unique local graph. Continue its connected portion in $0<\delta<\delta_0$ backward to its earliest endpoint $\alpha\ge a$. The following alternatives exhaust the possible endpoints.

1. **The initial section is reached.** If $\alpha=a$ and the limiting delay is positive and below cutoff, continuity of $F$ places it in the complete initial census. Its delay is at least $\delta_{\mathrm{in}}$.
2. **The cutoff is reached.** If the limiting delay equals $\delta_0$, the graph has an entrance anchor of exactly that size. Tangential contact with the cutoff causes no problem. Each connected excursion below the cutoff can be anchored separately.
3. **An endpoint is alleged at the diagonal.** The one-graph estimate from $T_0$ bounds $\delta^{-1}$ by $\delta(T_0)^{-1}+C$ on the entire backward portion, so this alternative is impossible.
4. **An interior positive-delay endpoint is alleged.** On compact backward intervals, $\delta^{-1}$ is continuously differentiable and has uniformly bounded total variation. Its absolute derivative therefore has finite integral to $\alpha$, giving a unique finite limit. Since $\delta<\delta_0$, that reciprocal limit is also at least $\delta_0^{-1}>0$. Thus the delay has a positive limit $d\le\delta_0$. If $\alpha>a$ and $d<\delta_0$, continuity gives $F(\alpha,\alpha-d)=0$. The complete-census assumption makes this limiting root simple. The implicit-function theorem extends the same graph through it, contradicting maximality.

The historical domain is sufficient throughout this argument: $s=T-\delta\ge a-\delta_0$. No branch can disappear through an unrecorded history boundary. A divergent derivative of playback would not defeat the endpoint argument if its positive-delay limit were still simple; continuity and the implicit-function theorem decide that case directly.

Consequently every recent graph has an entrance anchor with delay at least

$$
\delta_{\mathrm{entry}}=\min\{\delta_{\mathrm{in}},\delta_0\}.
$$

Apply the integrated estimate to the interval from that entrance to the selected root and pass to the entrance limit. The same constants apply to every graph, giving

$$
\boxed{
\delta(T)\ge\delta_{\min}
=\left[\delta_{\mathrm{entry}}^{-1}
+\frac{2M}{cK_i}(2M+B)\right]^{-1}>0.
}
$$

Roots exactly at cutoff satisfy this inequality trivially. A sequence changing root identity, or infinitely many successive cutoff entrances, cannot evade a constant independent of branch identity. The theorem does not require a uniform upper bound on root count as $T\uparrow T_*$. It also does not assume a uniform lower bound on $|D_t|$ at the excluded terminal reception.

**Claim grade: derived.** The uniform-floor theorem is accepted as written, with the interpretation of complete-census regularity made explicit above. The proof supplies separation of delay from the self diagonal; it is not a lower bound on present-coordinate distance between distinct labels.

## Births, folds, and accumulation limits

| Geometry or event | Consequence under the theorem |
| --- | --- |
| A simple graph approaches $\delta=0$ at either end | Excluded by its variation bound, even before the uniform entrance argument. |
| A branch enters the recent region through $\delta_0$ | Included, with cutoff delay as its entrance anchor. |
| A positive-delay transmitter fold, $D_t=0$, occurs inside $I$ | Outside the theorem's complete simple-census hypothesis. Simplicity only away from the event is insufficient for the uniform theorem. |
| Multiple roots merge or split at positive delay | At a non-simple limiting root, the same exclusion from hypotheses applies. No event rule is supplied. |
| Roots form a continuum or accumulate in a reception section | Outside the finite simple-census hypothesis. A limit at positive delay would itself have zero emission derivative if distinct roots accumulate there. |
| Infinitely many roots or cutoff entrances appear only as $T\uparrow T_*$ | Not automatically excluded from the hypotheses; every root still obeys the same positive delay floor. This establishes no finite root count or continuation at $T_*$. |
| Root branches have ever smaller delays immediately after separate positive-delay births | The one-branch estimate alone does not compare their entrance delays; the uniform theorem disallows the interior birth events through its complete-census requirement. |
| All regularity hypotheses fail only at the excluded terminal time | The established delay floor still holds on $[a,T_*)$; other terminal singularities remain possible. |

Positive-delay folds deserve a separate distinction. With additional smoothness and a transverse generic fold, the local residual has leading form $A(T-T_f)+B(s-s_f)^2/2$, with $A B\ne0$. On the side with roots, $|D_t|$ scales as $|T-T_f|^{1/2}$ at positive range. The corresponding row can therefore have an integrable $|T-T_f|^{-1/2}$ singularity. This conditional local calculation explains why pointwise divergence does not itself exclude a fold or establish its continuation. It does not extend the theorem through a fold, resolve a higher degeneracy, or prescribe an EOM event law.

**Claim grade: derived** for the table's logical coverage and this stated generic-fold scaling. A finite-root census containing an interior non-simple root does not satisfy the theorem merely because the singular reception has measure zero. A hypothetical extension through independently certified folds needs its own lineage and entry-delay argument.

## Finite endpoint velocity and the common cone

Suppose an actual same-label sequence has $T_n\to T_*$, $\delta_n\to0$, and continuous velocity limit $\mathbf V_*$. Assume the whole shrinking chord interval lies on the side or sides where this limit holds. Since the path is the integral of its velocity,

$$
\mathbf n_n=\frac1{\delta_n}\int_{T_n-\delta_n}^{T_n}\mathbf V(u)\,du
\longrightarrow\mathbf V_*.
$$

Each $\mathbf n_n$ is a unit vector. Therefore $\|\mathbf V_*\|=1$. This is an endpoint condition forced by root geometry, not a universal velocity ceiling.

Set $\mathbf e=\mathbf V_*$. Given $0<\eta<1$, endpoint continuity supplies a neighborhood where $\|\mathbf V(u)-\mathbf e\|<\eta$. For every root chord contained in it,

$$
\mathbf e\cdot\mathbf n
=\frac1\delta\int_{T-\delta}^T\mathbf e\cdot\mathbf V(u)\,du
\ge1-\eta,
\qquad
\|\mathbf V(u)\|\le1+\eta.
$$

Thus one may choose a sufficiently late $a$ and sufficiently small $\delta_0$ with $a-\delta_0$ still in that neighborhood, then use $c=1-\eta$ and $M=1+\eta$. The direction is fixed, so no derivative of $\mathbf e$ enters the projected equation. Bounded speed without an endpoint direction would not by itself supply this common cone.

For a finite population, a sufficient quantitative remainder condition is a uniform bound $N_R$ on its number of remaining rows, range at least $r_0>0$ for every such row, transmitter magnitude at least $d_0>0$, and coupling magnitude at most $K_{\max}$. The triangle inequality gives

$$
b(T)\le\|\mathbf R(T)\|
\le\frac{N_RK_{\max}}{r_0^2d_0},
\qquad
B\le\frac{N_RK_{\max}(T_*-a)}{r_0^2d_0}.
$$

All these are uniform hypotheses on actual rows of the evolving solution. Finite label count alone does not bound root multiplicity, range, or transmitter factors. Under these conditions and the regular recent-root census, an isolated same-label diagonal approach is excluded. The candidate's expression “all other rows uniformly regular” is accepted in precisely this quantified sense.

For a connected simple root approaching zero with finite endpoint velocity, the integrated inequality also gives the necessary compensation bound

$$
\int_{T_1}^{T_2}b(T)\,dT
\ge\frac{cK_i}{2M}
\left|\delta(T_2)^{-1}-\delta(T_1)^{-1}\right|-2M.
$$

Such a branch would need an infinite opposing integral from the actual remainder. This necessary condition neither constructs that remainder nor proves its impossibility on all admitted populations. Recent self rows cannot supply it because their projections are positive. Cancellation between different receivers in a population-wide vector sum says nothing about this receiver-local inequality.

**Claim grade: derived** for the averaging, cone, regular-remainder estimate, and necessary compensation bound. Global exclusion remains **unresolved** where the remainder bound, root lineage, or finite continuous velocity limit is unavailable. Reject any inference from a failed solver run, pointwise large acceleration, or an unrelated population summation obstruction to universal self-channel exclusion.

## Fixed reception versus joint moving reception

The [current chord passage](coincide-or-not.md#same-transmitter-local-chord-expansion) fixes reception and expands only the delay. To check its coefficients independently, first expand the displacement divided by delay:

$$
\frac{\mathbf X(T)-\mathbf X(T-\delta)}\delta
=\mathbf V-\frac12\mathbf A\delta+\frac16\mathbf J\delta^2+O(\delta^3),
$$

where $\mathbf A=\dot{\mathbf V}$ and $\mathbf J=\dot{\mathbf A}$ at reception. Squaring gives

$$
\left\|\frac{\mathbf X(T)-\mathbf X(T-\delta)}\delta\right\|^2
=v^2-(\mathbf V\cdot\mathbf A)\delta
+\left(\frac{\|\mathbf A\|^2}{4}+\frac{\mathbf V\cdot\mathbf J}{3}\right)\delta^2
+O(\delta^3),
$$

with speed $v=\|\mathbf V\|>0$. Matching the square of $v+u_1\delta+u_2\delta^2$ to this expression yields the candidate's coefficients directly:

$$
\frac{G(T,\delta)}\delta
=v(T)-1-\frac{v'(T)}2\delta+C_3(T)\delta^2+O(\delta^3),
$$

$$
C_3(T)=\frac{\|\mathbf A\|^2}{8v}
+\frac{\mathbf V\cdot\mathbf J}{6v}
-\frac{(\mathbf V\cdot\mathbf A)^2}{8v^3}.
$$

Here $G(T,\delta)$ is chord length minus delay, and $v'=\mathbf V\cdot\mathbf A/v$. At one fixed reception, a sequence of positive roots with delays tending to zero forces successively $v=1$, $v'=0$, and $C_3=0$, by dividing the residual by its successive powers of delay. Conversely, those vanishing coefficients do not guarantee any root; higher terms or nonlocal geometry still decide. The candidate's fixed-reception test is correct.

For moving receptions, the equation is instead $G(T_n,\delta_n)=0$. The term $v(T_n)-1$ also tends to zero and can cancel delay terms. The endpoint-speed averaging argument remains valid without higher derivatives. In the existing mirror normal form, a conditional smooth crossing with $a_*=v'(T_*)>0$ yields

$$
0=a_*\left(h-\frac\delta2\right)+o(|h|+\delta),
\qquad h=T-T_*.
$$

For outgoing receptions $h>0$, this gives $\delta=2h+o(h)$ despite nonzero quadratic coefficient at the endpoint. This uses only the leading consequence of the [existing conditional mirror topology](../../../office-of-research/research-history/review-packets/master-equation-field-speed-first-boundary-self-root-topology-2026-07-29.md#transverse-local-normal-form-and-singularity). It is not a prescribed outgoing trajectory adopted as an EOM solution. Under $C^2$ regularity, the small-$o$ remainder is the sufficient statement used here.

For incoming receptions $h<0$, the same leading relation proves more. Since

$$
\left|h-\frac\delta2\right|=|h|+\frac\delta2
\ge\frac{|h|+\delta}{2},
$$

a nonzero $a_*$ cannot be cancelled by $o(|h|+\delta)$. Hence an incoming moving-root sequence with a $C^2$ endpoint does require $v'(T_*)=0$, equivalently $\mathbf V_*\cdot\mathbf A_*=0$. Qualifying the old passage must preserve this valid incoming quadratic restriction.

The cubic restriction is different even on the incoming side. Set $\epsilon=T_*-T>0$ and suppose the $C^4$ endpoint coefficients satisfy

$$
v(T)=1+b\epsilon^2+o(\epsilon^2),
\qquad
v'(T)=-2b\epsilon+o(\epsilon),
\qquad
b>0.
$$

For candidate delays $\delta=z\epsilon$, the residual divided by $\delta\epsilon^2$ converges uniformly for $z$ in any compact positive interval to

$$
Q(z)=b+bz+C_3(T_*)z^2.
$$

At $v_*=1$ and $v'_* =0$, differentiation of speed gives $v''_* =\|\mathbf A_*\|^2+\mathbf V_*\cdot\mathbf J_*=2b$, so

$$
C_3(T_*)=\frac b3-\frac{\|\mathbf A_*\|^2}{24}.
$$

Thus $b>0$ and $C_3(T_*)<0$ are compatible endpoint coefficients whenever $\|\mathbf A_*\|^2>8b$. For instance, their consistency is expressed without selecting a trajectory by choosing $\mathbf A_*\perp\mathbf V_*$ and $\mathbf V_*\cdot\mathbf J_*=2b-\|\mathbf A_*\|^2$. These are kinematic derivative conditions, not EOM initial data or a population construction.

The polynomial $Q$ is positive at zero and negative for sufficiently large positive $z$, with a simple positive crossing. Choose fixed positive $z_-<z_+$ on opposite sides of that crossing. Uniform convergence preserves their opposite residual signs for all sufficiently small $\epsilon$, and the intermediate value theorem then yields a geometric root with $z_-\epsilon<\delta<z_+\epsilon$ in any $C^4$ germ having those coefficients. This verifies the candidate's compatibility claim and shows why cubic vanishing cannot be required of general incoming moving sequences. It supplies no sharp-EOM solution: the dynamical theorem would still demand failure of at least one of its exclusion hypotheses for such a root sequence on an actual evolution.

The conditional speed-bound result also survives. If $\|\mathbf V(u)\|\le1$ on the whole chord, then

$$
\left\|\int_{T-\delta}^T\mathbf V(u)\,du\right\|
\le\int_{T-\delta}^T\|\mathbf V(u)\|\,du\le\delta.
$$

Equality forces speed one and a common velocity direction throughout that interval by continuity and equality in the projection onto the chord direction. It is a straight exact-speed segment, with $D_t=0$, outside the simple-root class. The incoming cubic compatibility calculation has $v(T)>1$ and does not contradict this bounded-history rigidity. No global speed bound is introduced.

**Claim grade: derived** for the expansion, successive fixed-reception tests, moving-reception qualifications, incoming quadratic necessity, cubic compatibility, and conditional rigidity. These are path-geometry statements. EOM existence and admissibility are separate obligations.

## Preserved minimal controls and evidence independence

The accepted [MEC-007 stationary mirror result](mirror-close-approach-causal-root-boundary.md) remains an input. For either label, use the inward coordinate $x$ and inward speed $u$. Its complete incoming history has $0\le u<1$ before its first speed-one endpoint. Consequently every earlier emission obeys

$$
x(T)-x(s)-(T-s)=\int_s^T[u(v)-1]\,dv<0
\qquad(s<T\le T_*).
$$

The actual incoming self census is empty, including at the endpoint. The accepted field-speed arrival at positive separation therefore supplies no incoming self-root sequence. No new numerical endpoint estimate or oracle replay is claimed here.

On the existing conditional mirror self graph, set $w_-=1-u(s)>0$ and $w_+=u(T)-1>0$. Substituting its fixed inward normal into the independently derived identity gives

$$
D_t=w_-,
\qquad
\delta'=\frac{w_-+w_+}{w_-},
\qquad
A_s\,dT=\frac{K_i}{\delta^2(w_-+w_+)}\,d\delta.
$$

This is the unchanged [mirror obstruction's exact measure](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md#exact-acceleration-measure-identity). Since $w_-+w_+\to0$ and all local rows point inward, the measure has divergent inward integral at birth. The comparison checks normalization, sign, and orientation against a prior analytical reference; the new general theorem is accepted on its independently shown proof, not by repeating a prior author's verdict.

The existing circular geometric control independently checks the cubic normalization: $2R\sin(\delta/(2R))=\delta-\delta^3/(24R^2)+O(\delta^5)$ at speed one. Its acceleration magnitude is $1/R$, reproducing $-\|\mathbf A\|^2/24$ for the cubic coefficient. This closed form tests the chord expansion and supplies no EOM circular solution.

The previously accepted [finite distinct-label contact adjudication](mec-008-independent-adjudication.md#why-the-same-transmitter-acceptance-target-is-not-reached) remains at its established channel scope. Equal present coordinates of distinct labels do not identify their self channels. None of these controls constructs the missing EOM-evolved same-label sequence, and this review introduces no new prescribed future as a reachability instrument.

## Exact proposed integration text

The following text is proposed for coordinator integration; no shared owner is edited here.

**Theorem disposition:**

> Independent adjudication accepts the reciprocal-delay variation estimate and the uniform positive self-delay floor on the stated regular sharp-EOM solution class. The hypotheses are bounded velocity on all recent chord intervals, a common forward cone for every recent self row, locally absolutely continuous receiver velocity, an integrable negative projection of the actual remaining acceleration, complete finite simple recent-root sections, and regular initial and cutoff sections with positive entrance delay. The floor is uniform across branches without assuming a uniform root count or transmitter-factor margin. It excludes an isolated regular same-label diagonal approach under these hypotheses. It does not exclude every populated self-channel event or supply continuation through folds, other singular lineages, uncontrolled opposing remainders, or endpoints without a finite continuous velocity limit.

**Replacement for the unqualified vanishing-coefficient conclusion in the chord section:**

> In normalized wake-speed units $c_f=1$, at one fixed reception time $T$, positive-delay self roots accumulating at zero require $v(T)=1$, $\mathbf V(T)\cdot\mathbf A(T)=0$, and $C_3(T)=0$. These are necessary conditions from the first three coefficients of the $C^4$ chord residual, not sufficient conditions for roots. A sequence with moving reception times instead satisfies the joint equation $G(T_n,\delta_n)=0$. If velocity has a continuous endpoint limit on the shrinking chord intervals, then $\|\mathbf V_*\|=1$. For incoming receptions $T_n<T_*$ and a $C^2$ endpoint, it also follows that $\mathbf V_*\cdot\mathbf A_*=0$; for general moving receptions this additional condition does not follow. On the unrestricted $C^4$ velocity domain, cubic vanishing is not necessary for an incoming moving sequence, because the reception-dependent speed and quadratic terms can balance a nonzero cubic coefficient. The separately stated one-sided speed-bound rigidity result remains conditional on its whole-history speed bound.

**Compact replacement for the repeated chord summary and claim-register entry:**

> Fixed-reception self-root accumulation requires speed one and vanishing quadratic and cubic chord coefficients. Moving-reception accumulation requires the joint residual equation and, with continuous endpoint velocity, speed one; incoming $C^2$ accumulation additionally requires zero endpoint speed derivative. Cubic vanishing is not a general moving-reception necessity. These geometric conditions do not establish EOM reachability, a universal speed ceiling, or global self-channel exclusion.

In the frozen `coincide-or-not.md`, the affected locations are lines 1624 and 1634 in the chord explanation, its claim-grade/falsifier paragraph at 1663, the adjudication summary at 1790, deliverable 6 at 1807, and the claim-register row at 1859, located by `rg -n` for the repeated coefficient assertions. The displayed expansion and the bounded-history curvature inequalities are retained. At line 1663, the fixed-coefficient falsifier must likewise specify one fixed reception; moving-sequence falsifiers must state the endpoint regularity and side of approach. These locations are snapshot references, not instructions to overwrite concurrent edits.

**Preserved status boundary:**

> MEC-007 remains accepted on its stationary mirror input. Its incoming EOM reaches a root-free field-speed endpoint at positive separation; its conditional newborn self geometry gives an unchanged-law continuation obstruction. Neither that endpoint nor the accepted finite distinct-label contact is an actual same-label positive-delay sequence approaching zero. General MEC-008 self-channel reachability or exclusion remains unresolved outside the independently accepted regular delay-floor class.

## Falsifiers and remaining obligations

| Accepted or unresolved statement | Operator-checkable falsifier or needed evidence |
| --- | --- |
| Exact root and delay identities | A differentiable positive-delay root of the unchanged canonical residual with $D_t\ne0$ for which direct differentiation disagrees with $s'=D_r/D_t$ or the absolute reciprocal-delay identity. |
| Cone integration bound | A complete canonical receiver equation satisfying the declared common cone, velocity bounds, absolute continuity, and opposing integral bound but violating the displayed projected integral inequality. The full remainder must be supplied, not omitted rows. |
| Uniform floor | A root below $\delta_{\min}$ while every reception section and all backward limiting roots satisfy the declared finite/simple census, history coverage, initial minimum, and cutoff conditions. An interior fold or missing root defeats the hypotheses rather than falsifying the theorem. |
| Fixed-reception coefficient necessity | One $C^4$ path at one fixed reception with arbitrarily small positive roots and a nonzero first, quadratic, or cubic leading coefficient. |
| Incoming quadratic necessity | An incoming moving-root sequence with a genuine $C^2$ endpoint, speed one, and nonzero endpoint speed derivative. |
| Cubic compatibility | Failure of the displayed squared-chord expansion, speed-derivative identity, uniform scaled residual, or its opposite-sign intermediate-value argument. A failure to realize those jets as a sharp-EOM history is not a counterexample to their geometric compatibility. |
| Global self-channel question | Either an actual EOM-preserved same-label sequence with complete root provenance outside the exclusion class, or a class-wide proof controlling all remaining singular lineages, opposing projections, and velocity endpoints. Neither is supplied here. |

The strongest accepted foothold is the uniform regular delay-floor theorem. Its unresolved complement is explicit: simultaneous singular opposing rows, singular self-root lineage not covered by the complete simple census, and velocity endpoints lacking the required limit. No member of that complement is claimed to exist merely because the theorem does not cover it.

## Frozen inputs and validation record

The subject and reference identities were measured with `shasum -a 256`, copied under `.tmp/mec008-self-delay-adjudication/frozen/`, and checked before drafting with `shasum -a 256 -c .tmp/mec008-self-delay-adjudication/input-sha256.txt`. This fixes the mathematical reference boundary without changing shared file permissions or shared source bytes. The following paths are relative to the repository root.

| Frozen input | SHA-256 |
| --- | --- |
| `AGENTS.md` | `248f07e14349c3601fc74106f7219ceae4184e7ef2f9405ee9c1ebd634ae1476` |
| `reference/priorities/master-equation-closure/work-queue.md` | `945987b92c01c250ad0ac2f1a675c0c436fbcddc39eea551475afb4d5325dbf0` |
| `reference/priorities/master-equation-closure/analysis/mec-008-self-channel-reachability.md` | `c06af3bd6ea3f0a8591db14a4eb0c518f63c94204a8980179b39cbe0b9d446ec` |
| `content/markdown/aaa/dynamics/master-equation.md` | `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865` |
| `reference/priorities/master-equation-closure/analysis/coincide-or-not.md` | `c98ef7e2a9baa274ac8f61ae655e536f53fe694a93b8d1f30b32b65dd3ae2e7c` |
| `reference/priorities/master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md` | `00db04b895b4b22eec7103bbb424d22b423e56ef1701b48c5da23f20a1e90781` |
| `reference/priorities/master-equation-closure/analysis/mec-008-independent-adjudication.md` | `30a11666d60bc26e830980e2c8c963dc9a9e59df2824caee5b8c880fe0a452c8` |
| `reference/office-of-research/research-history/review-packets/master-equation-field-speed-first-boundary-self-root-topology-2026-07-29.md` | `5a4fcb571f4d27a775c0aa28d4f6a70a6dd5084209cf2dbbb56a095dbbf44352` |
| `reference/office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md` | `b68a3abb1e022876399ec6a303ce6de9c28c8e5309813f31c7b04f47ab2acd35` |
| `reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md` | `be1e5fb35ba705830df5fb4b240d6eade499da6e30816374608dd3a524d0ce34` |
| `reference/priorities/master-equation-closure/evidence/mec-007-stationary-mirror-incoming-oracle.v1.json` | `7ee71e43d1b0e9dadd19e6241d04788b58ec33b6cacc94a2bd5bcb2a50d5c05d` |
| `scripts/eom/stationary-mirror-incoming-oracle.py` | `e60336c1d5bfa6ccd1796fb661dd24f694aae19165766e7d9ac76cc01799bf1d` |
| `tests/test_mec007_stationary_mirror_incoming_oracle.py` | `b33dc89d8c8b4a7273ca48f41df49700648ef1a91f9fa31715be8f7387aa155b` |
| `.tmp/mec008-self-channel-reachability/check-document.mjs` | `6d4eb78ca0065b50a7300435de82dd089381f169f3890dcdb23f7a2fb2f96967` |

Before a target document check, the existing document instrument was copied unchanged to this task's scratch directory and run with `node .tmp/mec008-self-delay-adjudication/check-document.mjs --known`. It returned exactly two mathematical expressions, one display, and one existing file link while ignoring fenced and inline code; its negative controls rejected bad TeX, an unmatched dollar, a missing file, and trailing whitespace. The pass was recorded in `known-controls.json` before checking this report. Its scope is dollar delimiters, KaTeX syntax, file-target existence, terminology, and whitespace; neither mathematics nor fragment anchors are certified by it.

Measured document verification: `node .tmp/mec008-self-delay-adjudication/check-document.mjs reference/priorities/master-equation-closure/analysis/mec-008-self-delay-independent-adjudication.md` accepted the report's dollar delimiters, KaTeX syntax, eight relative file links, terminology, and whitespace. The six distinct fragment targets were separately located by exact-heading `rg -n` in their destination files. `git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/mec-008-self-delay-independent-adjudication.md` emitted no whitespace diagnostics; its exit 1 identifies the new-file difference. The manifest recheck returned `OK` for all fourteen listed inputs after drafting, including the reviewed subject, shared queue, canonical EOM, and existing oracles. Final receipts are retained in this task's scratch directory.

The independent mathematical references in this report are explicit residual differentiation, integration of the projected complete EOM, the backward implicit-function argument, squared-chord coefficient matching, the existing mirror measure, and the exact circular chord. The report was also read back against those equations; that inspection corrected two differential-spacing markup errors that syntax acceptance alone did not identify. Structural checks are not mathematical acceptance. No new EOM numerical run, oracle acceptance, Python result, event law, or infinite-population existence result is claimed.

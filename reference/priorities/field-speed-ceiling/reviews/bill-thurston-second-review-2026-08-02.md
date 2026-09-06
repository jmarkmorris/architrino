# Bill Thurston Second Review: Field-Speed Ceiling Mathematics, Sections 1--11

**Review identifier:** `FSC-001-BT2-2026-08-02` **Reviewer lens:** [William Thurston specialist lens](../../../research-office/specialists/roles-geometry-dynamics/bill-thurston.md) **Review date:** 2026-08-02 **Review target:** [mathematics-geometry-dynamical-system.md](../analysis/mathematics-geometry-dynamical-system.md), Sections 1--11 only; Sections 12+ are out of scope. **Prior review:** [first Thurston review and response, 2026-08-01](bill-thurston-review-response-2026-08-01.md). Findings disposed there are not re-raised. **Claim level:** review findings only --- nothing is adopted or advanced by this document.

## Scope and method

This review reads the current text from the top of the document through the end of Section 11, with attention to the material written or revised since the first review: the event-stratum catalogue and per-channel classification in Section 9, the swept-source reception proposal in Section 10.9, and the circular-binary program in Sections 11.1--11.2 (the at-or-below-wake-speed family, the equal-speed Dottie specialization, the orthogonally translating helix, and the retuning sketch). The lens is geometric: characteristic and contact geometry of the wake hypersurfaces, the topology of the root and event sets, rigidity of degenerate strata, and the discipline of not promoting a low-dimensional picture to a theorem without the missing hypotheses.

Plainly: I re-read the whole in-scope text, but I concentrated on the parts that are new since my last review, and I looked specifically at the shapes --- where the causal roots live, how they can degenerate, and whether every degenerate shape has a declared name and rule.

## Independent verification record

All numerics use normalized wake-speed units $c_f=1$. The following document computations were independently recomputed (30-digit arithmetic, separate code path from any repository instrument):

1. Dottie root $\xi_0=0.7390851332151606\ldots$, full delay $\theta=2\xi_0=1.4781702664303213$ rad $=84.6929176682^\circ$: **confirmed** to the printed digits.
2. Equal-speed compatible radius $R_\ast=K/\bigl(4\xi_0(1+\sin\xi_0)\bigr)\approx0.20211137351526113\,K$: **confirmed** (document prints $0.20211137351526115$; the discrepancy is one unit in the seventeenth digit, i.e. last-digit rounding, not an error).
3. Section 11.1 root factors: for $\lambda\in\{0.3,0.7,1\}$ the root of $\xi=\lambda\cos\xi$ was found and $D_t$, $D_r$ were evaluated directly from the prescribed antipodal paths by differentiating $g$; both equal $c_f(1+\lambda\sin\xi_\lambda)$ to 12 digits, and the range equals $2R\cos\xi_\lambda$. **Confirmed.**
4. Section 11.1.2 helix: for $u\in\{0.2,0.6,0.95\}$ the delayed root has the Dottie half-angle to 12 digits; the displayed $\hat{\mathbf r}$ decomposition, $D_t=D_r=(v^2/c_f)(1+\sin D)$, the raw velocity-parallel component $(C/c_f)(v^2\sin D-u^2)$, and the effective axial component formula were all reproduced from the raw geometry; the axial residual is strictly negative in every case. **Confirmed.**
5. Monotone decrease of $R_{\ast,\lambda}$ across $\lambda\in\{0.05,\ldots,1\}$: **confirmed**, together with the small-$\lambda$ asymptotics reported in finding BT2-8.
6. The Section 10.9 straight-through chart: $g(T,s)=2s$, frozen root $S(T)=0$, $D_t=2$, $D_r=0$; and the sign pattern of $g$ on the eternal exact-$c_f$ mirror history used in finding BT2-4. **Confirmed.**
7. The two monotonicity inequalities $\partial_s g=D_t\ge0$ and $\partial_T g=-D_r\le0$ were sampled at 200 random points on a smooth sub-ceiling two-path history with no violations.

Plainly: I recomputed the named constants, the root factors of both circular charts, and the helix's negative axial result from scratch, and they all come out exactly as the document states. The one three-digit-looking mismatch in $R_\ast$ is only the last decimal digit.

**No mathematical error was found in Sections 1--11.** Every checked derivation in the new Sections 10.9 and 11 material is correct as stated on its declared chart. The findings below are therefore gaps, improvements, contributed results, and structural observations, plus one citation-integrity defect.

## Findings

### BT2-1 --- IMPROVE: stale internal cross-references in Section 10

Section 10.3 states: "where $\mathcal P_{\mathbf V}$ is the finite-ledger tangent-cone response map in Section 3. The path-speed-ceiling boundary-state co-moving root family from Section 7 is not included in $\mathcal C_{\mathrm{ord}}(T)$ as an ordinary root." Section 3 is the provenance and status map; the response map is defined in Section 7 and evaluated in Section 8. The co-moving family and the isolated-crossing reception rule live in Section 9, not Section 7. Section 10.7 repeats the defect: "The latter is not an ordinary same-transmitter root under Section 7."

Correct replacements: "in Sections 7--8" for the response map, and "under the Section 9 isolated-crossing rule" for both co-moving-family references. These appear to be relics of an earlier numbering before the current Sections 5--6 were inserted.

Claim grade: `measured` (direct inspection of the current text). Falsifier: open the document and find that the cited section numbers already match the current headings.

Plainly: two sentences point the reader at the wrong section numbers, almost certainly because sections were renumbered after they were written. The math they invoke is fine; the signposts are stale.

### BT2-2 --- GAP: the frozen-root catalogue row conflates a pointwise tangency with an interval condition

The Section 9 catalogue row reads: "Receiver-side frozen root: $g=0$, positive delay, $D_t\ne0$, $D_r=0$, and the selected emission time is locally constant as receiver time advances." The two clauses after the last comma are not equivalent to $D_r=0$ at one event, and the row as written merges two distinct strata:

1. **Isolated receiver-side tangency.** $D_r(T_0)=0$ at an isolated receiver time with $S(T)$ still strictly increasing through $T_0$. Since $dS/dT=D_r/D_t$, the clock has a critical point but is not locally constant. This stratum exists only on the equality boundary ($D_r=0$ forces $\|\mathbf V_r\|=c_f$ with exact-recede alignment) and is dynamically harmless: by the identity $dS/D_r=dT/D_t$, the receiver-time density of the swept-source measure is $\mathbf K/D_t$, which stays finite there, so no ordinary-row weight diverges from the tangency itself.
2. **Frozen interval.** $S(T)$ constant on a nondegenerate receiver-time interval, equivalently $D_r\equiv0$ along it. This is the stratum Section 10.9 actually treats, and it is rigid (finding BT2-3).

The catalogue should split the row, because the two strata have different dispositions: the isolated tangency needs no new law (its swept measure is the canonical one in the $D_t$-density form), while the frozen interval carries the proposed inactive disposition. Separately, Section 10.9's sentence "A jump or singular component of the received-history clock is a separately typed nonordinary event" names strata that have no row in the Section 9 catalogue at all; the catalogue and 10.9 should agree on the stratum inventory (see BT2-9).

Claim grade: `derived` for the nonequivalence and the finite $D_t$-density at an isolated tangency; `inferred` for the recommendation. Falsifier: a proof that $D_r=0$ at one receiver time already forces $S$ locally constant on a ceiling-admissible chart (it does not: an interior zero of the nonnegative continuous function $D_r(\cdot)$ along the branch need not persist).

Plainly: touching a wavefront for one instant and riding it for a while are different events. The table currently describes them with one row, and only the riding case actually needs the new rule; the touch is already covered by the ordinary accounting written the right way.

### BT2-3 --- ADVANCE: receiver-side frozen-interval rigidity theorem (dual to characteristic-interval rigidity)

Section 9 proves that a transmitter-side characteristic interval forces a straight exact-aim chord at speed $c_f$. The mirror statement for the frozen stratum is absent and is provable in three lines; it completes the degenerate-stratum classification symmetrically.

> **Theorem (frozen-interval rigidity).** Let speeds obey $\|\mathbf V\|\le c_a\le c_f$, and let a root branch of one ordered channel satisfy $S(T)\equiv s_0$ on a nondegenerate interval $[T_1,T_2]$. Then the receiver travels the interval at exactly $c_f$ on the straight ray pointing radially away from the frozen emission point $\mathbf p=\mathbf X_t(s_0)$; in particular $c_a=c_f$ and $D_r\equiv0$. Conversely, every straight exact-recede $c_f$ ray from $\mathbf p$ freezes the branch.

Proof sketch. Write $\rho(T)=\|\mathbf X_r(T)-\mathbf p\|$. The frozen root equation is $\rho(T)=c_f(T-s_0)$, so $\rho'=c_f$ almost everywhere. But $\rho'=\hat{\boldsymbol\rho}\mathbin{\cdot}\mathbf V_r\le\|\mathbf V_r\|\le c_a\le c_f$, so equality holds throughout: $\|\mathbf V_r\|=c_f$ and $\mathbf V_r=c_f\hat{\boldsymbol\rho}$ almost everywhere. Differentiating $\mathbf X_r-\mathbf p=\rho\hat{\boldsymbol\rho}$ then gives $\rho\,d\hat{\boldsymbol\rho}/dT=\mathbf V_r-\rho'\hat{\boldsymbol\rho}=\mathbf0$ with $\rho>0$, so $\hat{\boldsymbol\rho}$ is constant: a straight ray. The converse is direct substitution. $\square$

Two corollaries sharpen Sections 10.8--10.9:

1. **The frozen escape is rigid.** The straight-through candidate is the *only* continuation that keeps the coincidence-time front frozen. Any absolutely continuous continuation that bends or slows on a positive-measure set breaks the equality chain, forces $D_r>0$ there, and re-admits the partner channel as a sweeping branch.
2. **Late unfreezing is finite.** If the deviation first occurs at $T_3>T_{\mathrm c}$, the newly swept partner emissions begin at $s=T_{\mathrm c}$ with range $r=c_f(T_3-T_{\mathrm c})>0$ (in the mirror chart with coincidence at $T_{\mathrm c}=0$: a receiver that drops to speed $w<1$ at $T_3$ picks up the sweeping root $s=(1-w)(T-T_3)/2$ with range near $T_3>0$), so the re-admitted rows are ordinary and finite. Only a deviation *at* the coincidence itself meets the zero-range endpoint. This gives the breather discussion in Section 10.9 a precise dichotomy: lawful slowdown strictly after coincidence re-couples the pair through finite ordinary rows; the singular obstruction is confined to the event time.

Claim grade: `derived` (proof above; the corollary computation was verified in the $c_f=1$ chart). Falsifier: a ceiling-admissible history with a frozen root branch on a nondegenerate interval whose receiver path is curved, is slower than $c_f$, or is not radial from the frozen emission point.

Plainly: riding a single wavefront for any stretch of time is only possible one way --- running dead straight, at exactly wake speed, directly away from where that front was born. The moment the rider bends or slows, the fronts start washing over it again; and if that happens any time after the coincidence, the renewed contributions are ordinary and finite rather than singular.

### BT2-4 --- ADVANCE: the per-channel root portrait is a monotone staircase; strict-gap global root theorem

The document's per-channel results (monotone zero set at fixed $T$, rigidity, branch slope $dS/dT=D_r/D_t$, frozen branch) are all faces of one global object that deserves to be named. For one ordered channel define the **incidence variety**

$$
\Sigma
=
\{(T,s):\ s<T,\ g(T,s)=0\}
\subset\mathbb R^2 .
$$

Under the ceiling $\|\mathbf V\|\le c_a\le c_f$ for both paths, $g$ is nondecreasing in $s$ (the document's Section 9 argument) and nonincreasing in $T$ by the same reverse-triangle argument applied to the receiver: $r(T_2,s)\le r(T_1,s)+c_f(T_2-T_1)$ gives $g(T_2,s)-g(T_1,s)\le0$. Hence $\partial_sg=D_t\ge0$ and $\partial_Tg=-D_r\le0$ hold globally, and $\Sigma$ is a **monotone staircase**: the set-valued map $T\mapsto\{s:(T,s)\in\Sigma\}$ is monotone nondecreasing, each fiber is empty, a point, or an interval, vertical segments of $\Sigma$ are exactly the exact-aim transmitter chords (characteristic intervals, Section 9 rigidity), and horizontal segments are exactly the exact-recede receiver rays (frozen intervals, BT2-3). If two roots $(T,s)$ and $(T,s')$ share a receiver time, the whole segment between them is in $\Sigma$; if $(T,s)$ and $(T',s')$ with $T'>T$, $s'<s$ were both roots, two-variable monotonicity forces $g=0$ on the connecting rectangle edges, collapsing to the degenerate strata. So no ordinary branch can ever cross back.

Plainly: draw reception time to the right and emission time upward. Everything this channel can ever do is one non-backtracking staircase curve: rising stretches are ordinary reception, flat stretches are wavefront-riding, and vertical jumps are whole intervals of emissions arriving at one instant.

The mirror encounter of Sections 10.7 and 10.9 has an exactly computable portrait, worth adding as a labeled figure-in-words: a rising branch sweeping the pre-threshold history (slope $2/(1-u(s))$), one vertical segment at $T=T_{\mathrm c}$ owning the ceiling-interval emissions $[T_\ast,T_{\mathrm c})$, and then the horizontal frozen ray $S\equiv T_{\mathrm c}$. I also verified the instructive **eternal** exact-$c_f$ mirror chart ($\mathbf X_1=T\mathbf e$, $\mathbf X_2=-T\mathbf e$ for all $T$): there $g(T,s)=-2c_fT$ for all $s<T<0$, so the incoming channel has *no root at any pre-coincidence time* --- every past emission arrives simultaneously at the coincidence event as one vertical segment, after which the frozen ray begins. An empty root interval over an open set of receiver times is thus realizable at the equality boundary and should be listed as a lawful portrait feature.

For the strict gap $c_a<c_f$ the portrait trivializes globally:

> **Strict-gap global root theorem.** Let all paths be complete for all past time with speeds $\le c_a<c_f$, and fix a receiver event with $r(T,T)>0$ for the given ordered channel. Then that channel has **exactly one** root; it is simple, with $c_f-c_a\le D_t,D_r\le c_f+c_a$, and the branch satisfies
>
> $$
> \frac{c_f-c_a}{c_f+c_a}
> \le
> \frac{dS}{dT}
> \le
> \frac{c_f+c_a}{c_f-c_a}.
> $$

Proof sketch. Existence: $g(T,s)\le r(T,T)+ (c_a-c_f)(T-s)\to-\infty$ as $s\to-\infty$, while $g(T,s)\to r(T,T)>0$ as $s\uparrow T$; continuity gives a root. Uniqueness and simplicity: $D_t\ge c_f-c_a>0$ wherever $r>0$, so $g$ is strictly increasing in $s$. The $D_r$ bounds are the same speed estimate on the receiver side; the slope bounds follow from $dS/dT=D_r/D_t$. $\square$

This upgrades the document's "at most $N-1$ ordinary distinct-transmitter roots" to "exactly $N-1$, all simple, at every reception time" in the $c_a<c_f$ regime (away from equal-time coincidence), and the explicit slope bounds are exactly the uniform transversality and Lipschitz ingredients the FSC-007 history-to-ledger program needs on strict-gap charts. Characteristic intervals and degenerate roots are *impossible* below equality, since both require $D_t=0$.

Claim grade: `derived` (proofs above; monotonicity inequalities sampled numerically with no violations). Falsifier: an eternal strict-gap history with an empty ordered channel at a positive-separation receiver event, a channel with two separated roots, or a branch slope outside the displayed bounds.

Plainly: below the equality boundary the causal bookkeeping is as clean as it could possibly be --- every receiver always hears every other architrino exactly once, the connection never degenerates, and how fast the heard-history clock runs is pinned between two explicit bounds. All of the hard geometry is confined to the equality boundary, and the staircase picture says precisely which three shapes it can take there.

### BT2-5 --- GAP: the helix negative result uses an unproven ledger census

Section 11.1.2 concludes "the complete isolated two-label ordinary ledger retains a backward axial residual," and its falsifier clause contemplates "an omitted ordinary root," but the text never proves the census it relies on: that the helical chart has exactly one partner root and no same-transmitter root. Both proofs are one line and should be inserted:

1. **Partner uniqueness.** Every positive-delay partner root satisfies $v\Delta=2R|\cos\xi|$ with $\xi=\omega\Delta/2$, i.e. $\xi=|\cos\xi|$, so $\xi\le1<\pi/2$ and the root is the unique Dottie angle. (The displayed reduction "reduces to $\xi=\cos\xi$" silently drops the absolute value; the $\xi\le1$ argument is what removes it, exactly as Section 11.1 does for the planar family.)
2. **No self root.** The helical chord obeys $\|\mathbf X(T)-\mathbf X(S)\|^2=u^2\Delta^2+4R^2\sin^2(\omega\Delta/2) <u^2\Delta^2+v^2\Delta^2=c_f^2\Delta^2$ for $\Delta>0$, since $2R\sin(\omega\Delta/2)<R\omega\Delta=v\Delta$. So $g_{ii}<0$ on the whole past and the self channel is empty.

Without these, the negative result's premise ("complete") is asserted rather than derived on this chart, even though it is true.

Claim grade: `derived` (the two supplied proofs close the gap). Falsifier: a positive-delay root of the helical chart with $\xi>1$, or a self root, either of which would contradict the displayed inequalities.

Plainly: the no-steady-helix conclusion is right, but the text forgot to show that the two rows it summed are the only rows there are. Both missing checks are one sentence each; they should be on the page since the section's own falsifier invokes them.

### BT2-6 --- ADVANCE: the orthogonal axis is the only rigid uniform translation, so the helix negative is class-complete

Section 11.1.2 closes by saying the result "does not exclude a binary with other labels, a nonuniform midpoint path, or a different event or response law," leaving the impression that other *uniform* translations remain open. They do not:

> **Lemma (rigid-translation exhaustiveness).** For a rigidly rotating antipodal pair with midpoint translating uniformly at velocity $\mathbf u\ne\mathbf0$, both labels move at constant speed if and only if $\mathbf u$ is orthogonal to the rotation plane.

Proof: $\|\mathbf u+v\,\mathbf e_\theta(T)\|^2=\|\mathbf u\|^2+v^2 +2v\,\mathbf u\mathbin{\cdot}\mathbf e_\theta(T)$, and $\mathbf u\mathbin{\cdot}\mathbf e_\theta(T)$ is constant in $T$ iff the in-plane component of $\mathbf u$ vanishes (for $v>0$), since $\mathbf e_\theta$ sweeps the full unit circle of the plane. $\square$

Any in-plane drift therefore makes the path speed oscillate, so the configuration cannot sit identically on the ceiling boundary and the constant boundary-speed chart does not even exist; the projection would switch on and off within each turn, which is a different (nonuniform) problem. Combined with Section 11.1.2, this yields the clean class statement: **within rigidly translating constant-boundary-speed two-label circular charts, the non-translating binary is the only survivor** of the proposed response law. The section should claim exactly this, which is stronger than "this particular ansatz."

Claim grade: `derived`. Falsifier: a uniform translation with nonzero in-plane component under which $\|\mathbf u+v\mathbf e_\theta(T)\|$ is constant.

Plainly: if you slide the spinning pair sideways within its own plane, each member alternately runs faster and slower during a turn, so it cannot stay pinned at the speed ceiling at all. Sliding along the axis was the only uniform drift worth testing, it was tested, and it fails --- so the resting binary is the whole story for this family.

### BT2-7 --- ADVANCE: interior-circle exclusion lemma --- the boundary-speed family is forced, not chosen

Section 11.1 opens: "This is a ceiling-boundary-speed family: the candidate circle runs at $\|\mathbf V_i\|=R|\omega|=c_a$, not at an arbitrary speed below $c_a$." As written this reads as a choice of chart. It is a theorem:

> **Lemma (no interior uniform circle).** Under the proposed law with ceiling $c_a\le c_f$, no prescribed two-label antipodal uniform circular history with speed $w=R|\omega|<c_a$ satisfies the constrained equation.

Proof sketch: strictly inside the ball the response is the identity, so the full raw partner row must equal the centripetal acceleration. But the delayed partner root at speed $w$ has half-angle $\xi_w$ solving $\xi=(w/c_f)\cos\xi$ with $\xi_w>0$, and the raw row's velocity-parallel component $a_\theta=K\sin\xi_w/\bigl(4R^2\cos^2\xi_w(1+(w/c_f)\sin\xi_w)\bigr)$ is strictly positive (forward), while a uniform circle needs zero tangential acceleration. Contradiction. $\square$

So under this proposal, uniform two-label circles can exist *only* on the ceiling boundary, where the projection is available to remove the forward slant. This also states precisely why the canonical unbounded model has no exact uniform circular binary: the delay slant is unremovable there. The lemma converts the family's framing sentence from a stipulation into a derived boundary-selection statement --- the strongest kind of sentence this section can carry.

Claim grade: `derived`. Falsifier: an interior-speed uniform antipodal circle whose complete two-label ledger has zero tangential component, i.e. a root of $\xi=(w/c_f)\cos\xi$ with $\sin\xi_w=0$ at $w>0$.

Plainly: away from the ceiling nothing is allowed to erase the forward lean that causal delay puts into the pull, and a circle cannot tolerate any forward lean forever. Only on the ceiling does the proposed rule wipe that lean away. So the circles were never a menu choice --- the boundary is the only place they can live, and that is worth saying as a theorem.

### BT2-8 --- ADVANCE: small-$\lambda$ closure of the compatible-radius family

The family $R_{\ast,\lambda}$ is proved strictly decreasing, but its $\lambda\to0$ end is left ungrounded. Expanding the root $\xi_\lambda=\lambda-\lambda^3/2+O(\lambda^5)$ of $\xi=\lambda\cos\xi$ gives $\cos\xi_\lambda(1+\lambda\sin\xi_\lambda)=1+\tfrac{\lambda^2}{2} -\tfrac58\lambda^4+O(\lambda^6)$, hence

$$
R_{\ast,\lambda}
=
\frac{K}{4c_a^2}
\left(
1-\frac{\lambda^2}{2}+\frac{7}{8}\lambda^4+O(\lambda^6)
\right).
$$

Numerical check ($c_f=1$, $K=1$): at $\lambda=0.05$, $4c_a^2R_\ast=0.9987554$ versus $1-\lambda^2/2=0.99875$; at $\lambda=0.1$, $0.99508586$ versus $0.9950875$ from the $\lambda^4$ series; at $\lambda=0.2$, $0.9813008$ versus $0.9814$. The leading term $R_\ast=K/(4c_a^2)$ is exactly the delay-free inverse-square balance $K/(2R)^2=c_a^2/R$, so the family interpolates analytically from the undelayed circular balance at $\lambda\to0$ to the Dottie chart at $\lambda=1$, with the first causal-delay correction $-\lambda^2/2$. This ties Section 11.1 quantitatively to the sub-field circular benchmark and gives an operator-checkable series.

Claim grade: `derived` (series verified numerically to the displayed orders). Falsifier: evaluate $4c_a^2R_{\ast,\lambda}/K$ at small $\lambda$ and find a deviation from $1-\lambda^2/2+\tfrac78\lambda^4$ larger than $O(\lambda^6)$.

Plainly: when the orbit speed is tiny compared to wake speed, the delay hardly matters and the compatible radius is just the classic inverse-square balance; the formula above says exactly how fast the delay correction turns on as the speed ratio grows, all the way up to the Dottie endpoint.

### BT2-9 --- INSIGHT: the swept-source law is a Lebesgue decomposition of the received-history clock

Section 10.9's law enumerates cases (sweeping branch, frozen branch, "jump or singular component") as separate clauses. The staircase portrait (BT2-4) shows these are the components of one canonical object. On each ordered channel the received-history clock $S(T)$ is monotone nondecreasing under the ceiling, so $dS$ is a Lebesgue--Stieltjes measure with the unique decomposition

$$
dS
=
S'(T)\,dT
+
dS_{\mathrm{jump}}
+
dS_{\mathrm{sc}} .
$$

The swept-source proposal is then one sentence: *the receiver measure is $(\mathbf K/D_r)\,dS$ on $\{D_r>0\}$, componentwise.* The absolutely continuous part reproduces the canonical ordinary measure ($dS/D_r=dT/D_t$); constancy sets carry $dS=0$, so the frozen disposition "record as inactive, add no row" is not an extra clause but the statement that the clock does not advance; a jump of $S$ is exactly a characteristic-interval arrival --- in the mirror chart the clock jumps across $[T_\ast,T_{\mathrm c})$ at $T=T_{\mathrm c}$, and the mass of that jump atom, $\int\mathbf K/D_r$ over the jumped emission interval with $D_r=2c_f$, *is* the FSC-006 zero-range endpoint object. So Sections 10.7, 10.9, and the FSC-006 measure question are one statement about one monotone function, and the event-law decision is precisely the disposition of the jump component.

The decomposition also exposes an unlisted stratum: a **singular-continuous clock** ($S$ continuous, nonconstant, $S'=0$ almost everywhere --- a devil's-staircase reception, requiring $D_t=0$ on a Cantor set of exact-aim tangencies). Nothing in Sections 9--10 excludes it for merely $C^\infty$ histories, and it has no catalogue row; Section 10.9's "singular component" phrase acknowledges it without typing it. Either add the row, or exclude it by hypothesis: on real-analytic nonstationary charts $D_t(\cdot)$ along the branch is analytic, so its zero set is isolated points or full intervals, and the singular-continuous component vanishes. A declared analyticity or finite-stratification hypothesis is the clean fix and costs nothing on the charts the document actually uses.

Claim grade: `derived` for the componentwise equivalences on their stated domains; `inferred` for the recommendation that the law be restated this way; the singular-continuous possibility is an unexcluded case, not a constructed example. Falsifier: a channel under the ceiling whose clock $S(T)$ fails to be monotone (this would break the whole reformulation and would also contradict the BT2-4 inequalities), or a proof that smooth ceiling-admissible histories already exclude the singular-continuous component.

Plainly: think of each channel as a tape head reading the partner's recorded history. The proposal's cases are just the three ways a monotone playback clock can behave --- running (ordinary reception), paused (riding a front), or skipping (a whole stretch of tape arriving at one instant) --- and the unresolved coincidence measure is exactly the size of the skip. One exotic fourth behavior, a clock that creeps forward while almost always paused, is still unmentioned and should be either named or ruled out.

### BT2-10 --- INSIGHT: $D_t=D_r$ on both circular charts is a time-reversal symmetry, and its failure is diagnostic

Both new charts report the equality $D_t=D_r$ --- Section 11.1 with value $c_f(1+\lambda\sin\xi_\lambda)$ and Section 11.1.2 with value $(v^2/c_f)(1+\sin D)$ --- verified here to 12 digits. This is not an accident of the algebra. Each prescribed history is invariant under an orientation-reversing isometry-plus-time-reversal that exchanges the reception event $(r,T)$ with the emission event $(t,S)$ of the root chord (reflection across the perpendicular bisector plane of the chord composed with $T\mapsto T+S-\,\cdot\,$, which maps each label's path onto its partner's reversed path and reverses the chord direction). Since $D_t=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t$ and $D_r=c_f-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_r$ are swapped by that exchange, invariance forces $D_t=D_r$. The frozen straight-through chart, by contrast, is causally one-sided and has $D_t=2$, $D_r=0$: maximal asymmetry.

The equality is therefore a symmetry certificate, and its failure is a cheap diagnostic. Any future chart claimed to be time-reversal-symmetric in this exchange sense (equal-radius binaries, symmetric braid strands) must show $D_t=D_r$ at every root; a computed inequality immediately localizes either a broken symmetry in the prescription or an error in the root factors. Unequal radii, unequal speeds, or polarity-asymmetric response histories should generically split $D_t\ne D_r$, and the split direction (which factor is larger) records which endpoint of the chord is "catching up." Recording this as a one-line check in the cycle diagnostics would cost nothing.

Claim grade: `derived` for the symmetry mechanism on the two displayed charts (and numerically confirmed); `inferred` as a general diagnostic proposal. Falsifier: a chart invariant under the described chord-exchange symmetry whose correctly computed root factors nevertheless differ.

Plainly: on these symmetric orbits, emitting and receiving are mirror images of each other, so the two bookkeeping factors have to match --- and they do, to twelve digits. That match is worth keeping as a free consistency alarm: whenever a supposedly symmetric configuration shows unequal factors, either the configuration is not actually symmetric or something upstream is wrong.

## Summary table

| Finding | Tag | One-line statement |
| --- | --- | --- |
| BT2-1 | IMPROVE | Fix stale "Section 3"/"Section 7" cross-references in 10.3 and 10.7 to Sections 7--8 and 9. |
| BT2-2 | GAP | Split the frozen-root catalogue row: isolated receiver tangency (harmless, finite $D_t$-density) versus frozen interval (rigid, inactive). |
| BT2-3 | ADVANCE | Frozen-interval rigidity theorem: riding one front $\Leftrightarrow$ straight exact-recede $c_f$ ray; unfreezing after coincidence re-couples finitely. |
| BT2-4 | ADVANCE | Root portrait: per-channel incidence variety is a monotone staircase; strict-gap regime has exactly $N-1$ simple roots with explicit slope bounds. |
| BT2-5 | GAP | Helix ledger census (partner uniqueness, no self root) is used but unproven; both one-line proofs supplied. |
| BT2-6 | ADVANCE | Orthogonal-axis translation is the unique constant-speed rigid translation; the helix negative is class-complete. |
| BT2-7 | ADVANCE | No interior uniform circle exists; the ceiling-boundary-speed family is forced by the forward delay slant, not chosen. |
| BT2-8 | ADVANCE | $R_{\ast,\lambda}=\tfrac{K}{4c_a^2}(1-\tfrac{\lambda^2}{2}+\tfrac78\lambda^4+\cdots)$; the family closes onto the delay-free inverse-square balance. |
| BT2-9 | INSIGHT | Swept-source law $=$ Lebesgue decomposition of the monotone clock $S(T)$; jump atom $=$ FSC-006 endpoint object; singular-continuous stratum untyped. |
| BT2-10 | INSIGHT | $D_t=D_r$ on both circular charts is a chord-exchange time-reversal symmetry; keep the equality as a standing symmetry diagnostic. |

## Claim boundary

This review verifies stated computations and contributes candidate lemmas and reformulations inside the proposed partial model. It does not adopt or advance any field-speed ceiling, event law, continuation, contact measure, retained assembly, stability claim, or physical realization, and it does not change FSC-005/006/007 status. Every contributed result above is conditional on the same proposed foundational law the document itself declines to adopt, and each carries its own falsifier. No repository file other than this review was created or modified, and no successor review was started.

Closure goal: fold BT2-2/BT2-5 gap closures and the BT2-3/BT2-4 rigidity and staircase theorems into the packet's event-stratum and root-census sections, then let FSC-006 pose its jump-atom measure question directly on the received-history clock decomposition.

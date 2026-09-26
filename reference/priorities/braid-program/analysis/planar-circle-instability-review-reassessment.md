# Reassessment of the planar-instability review after the research reorganization

**Date:** 2026-09-26. **Author:** Claude, the author of the [2026-09-16 independent review](../../dormant-deferred/field-speed-ceiling/analysis/planar-circle-instability-independent-review.md); evidence-grade and lemma corrections integrated by Codex on 2026-09-26. **Grade:** derived estimates under the stated local hypotheses; reported floating-point diagnostics with the validation limits in Sections 3.3 and 5. The physical nonlinear-instability argument retains the checked-source obligation in Section 3.1. **Scope:** the sharp Master Equation partner row, the authorized field-speed ceiling with least-change projection of the complete sum, zero self response at and below field speed, $c_f=c_a=1$, isolated antipodal opposite-polarity pair. No smoothing or additional reception rule enters.

This note re-evaluates the earlier review against the current state of its subject. The review itself is preserved unchanged in the historical ceiling directory. Where this note corrects the review, the correction is stated explicitly and supersedes it.

## 1. What the reorganization changed

On 2026-09-26 the field-speed-ceiling directory was parked under `dormant-deferred`. The circular-binary work, including the three planar derivations, moved to the Braid Program, and the regular-chart theorem moved to Master-Equation Closure. The migration record lists these moves in its [path map](research-reorganization-completion.md). The manuscript sections formerly numbered 5.3.1 to 5.3.4 are now [§9.3.1 to §9.3.4](../manuscript.md#93-planar-perturbations-and-the-ellipse-question), with legacy anchors preserved. Two new numerical subsections, §9.3.5 and §9.3.6, follow them.

The reorganization preserved the governing equations in the first-variation and growing-mode analyses. The nonlinear proof was revised after the review to integrate its corrections. The questions here concern those integrations and the earlier review's remaining mathematical and evidence obligations; the corrected verdicts are stated in Section 6.

## 2. Status of each correction the review requested

| Requested correction | Current state | Assessment |
| --- | --- | --- |
| State the unstable-manifold step instead of citing Stumpf's introductory remark | Integrated in [proof §4](planar-circle-nonlinear-instability.md#4-recovering-admissible-all-past-histories) as a backward-orbit construction for the time-$a$ map, with patching and continuous dependence | Correct route. **Still open:** the map-level unstable-manifold theorem is invoked without a source that has been read and checked (Section 3.1). |
| Qualify Stumpf's Theorem 4.1 as instability on the solution manifold | Integrated in proof §3 and §4 and in manuscript §9.3.4 | Done and correct. |
| State that the reduced antipodal evolution is the physical evolution by regular-chart uniqueness | Integrated in proof §5 and manuscript §9.3.4 | Done and correct. |
| Make the manuscript's quantifier existential | Manuscript §9.3.4 now says "there exist admissible antipodal planar disturbances, arbitrarily small in the stated history norm" | Done and correct. |
| Record the measured count of unstable roots | Proof header records that "the finite-window numerical spectrum count is not a global spectral certificate" | Correct caution, still required. Section 3.3 adds an analytic confinement bound; the winding count remains an uncertified diagnostic. |
| Add the position-level reading of $C^1$ instability | Proof §6 states that a positions-only corollary "additionally needs a position-to-velocity/heading estimate" | The proof is right and **the review was wrong** to call this an elementary Lipschitz consequence (Section 3.2). The missing estimate is supplied below. |

Two sentences newly added to proof §4 go beyond what the cited survey states in the passages read: the choice $a>h$ and the phrase "compact spectral structure". The replacement should use the survey's stated facts: the time map is $C^1$ (Theorem 3.2.1), its derivative is the linearized time map with spectrum contained in $\{0\}\cup\{e^{za}:z\in\sigma(G)\}$ (relation 3.4.1), and the unstable generalized eigenspace is finite-dimensional. The analytically established positive characteristic root supplies an actual expanding eigenmode. These facts support a nonempty expanding spectral subspace and a complementary spectrum in the closed unit disk, without fixing that subspace's dimension. Any additional restriction on $a$ must come from the map-level theorem actually checked in Section 3.1.

## 3. Corrections and strengthenings

### 3.1. The map-level unstable-manifold theorem still needs a checked source

Both the review's Section 4.3 and the revised proof rely on a local unstable-manifold theorem for a $C^1$ map on an open subset of a Banach space. The needed statement concerns a fixed point, a finite-dimensional spectral subspace of the derivative lying outside a circle of radius $\rho>1$, and the rest of the spectrum inside a disk of radius less than $\rho$. Its exact hypotheses must be checked against the chosen source. The review named Hirsch, Pugh, and Shub and Chow and Lu as sources without having read them. That was a citation offered on recall, and it should not be carried forward as checked.

The survey's Section 3.5 attributes its local invariant manifolds for $C^1$ maps on Banach spaces to four references. They are Hale and Lin (1986), Chow and Lu (1988), Neugebauer (1988), and Krisztin, Walther, and Wu (1999). The last is the source of the survey's stable-manifold Theorem I.2. The obligation is therefore concrete: read one of these, identify the precise unstable-manifold statement, and confirm its hypotheses and its characterization by backward orbits with geometric decay. Until then, the physical all-past construction is a proof route conditional on that mathematical input, not a completed source verification. The numerical winding count is not a substitute for it.

### 3.2. Positions-only instability, with the estimate the review omitted

The review claimed that the Lipschitz property (L) alone turns $C^1$ departure into positional departure. That is incorrect. Property (L) bounds the derivative of the whole state, position $p$ and heading $\alpha$, by the $C^0$ distance of the whole state, which includes heading. Positional closeness does not by itself control heading. The missing estimate follows from a bound on the second derivative of position and an interpolation inequality. Its use as an instability corollary is conditional on the all-past construction in Section 3.1.

**Lemma.** Write $x=(p,\alpha)$ and use the product norm $|x|=|p|+|\alpha|$, with $\|x\|_{C^1}=\sup|x|+\sup|x'|$ on a history interval. Let a solution have histories $x_\tau$ in a sufficiently small neighborhood $U$ of the proof for every $\tau$ in $W=[\tau_1-2h,\tau_1]$, where $h=4$. Choose a finite positive bound $M_2>0$ for $|p''|$ there and a uniform constant $L$ such that $|f(x_\tau)-f(\phi_\gamma)|\le L\|x_\tau-\phi_\gamma\|_{C^0}$ for the histories and constant phase equilibria $\phi_\gamma=(p_\gamma,\alpha_\gamma)\in U$ under consideration. Suppose $p_\gamma=Q(\gamma)(1,0)$, $\alpha_\gamma=\pi/2+\gamma$ belongs to the same local heading lift, $|\alpha(\tau)-\alpha_\gamma|\le\pi$ on $W$, and, for some $\varepsilon>0$,

$$
|p(\tau)-p_\gamma|\le\varepsilon\qquad\text{for all }\tau\in W .
$$

Then the $C^1$ distance of the final state segment from the equilibrium $(p_\gamma,\alpha_\gamma)$ is at most $(1+L)\bigl(\varepsilon+\tfrac\pi2\omega(\varepsilon)\bigr)$, where $\omega(\varepsilon)=2\sqrt{\varepsilon M_2}+2\varepsilon/h+\varepsilon$.

*Proof.* A finite $M_2$ exists after shrinking $U$: $p''=\alpha'\mathcal Je(\alpha)-\mathcal Jp'$, and the continuous local equation bounds both $\alpha'$ and $p'$. Its continuous extension of the derivative to $C^0$ variations gives the stated Lipschitz estimate on a sufficiently small convex neighborhood. Put $g=p-p_\gamma$. For $\tau\in W$ and $0<\delta\le h$, at least one of $[\tau,\tau+\delta]$ and $[\tau-\delta,\tau]$ lies in $W$. Taylor's integral remainder on that interval gives $|g'(\tau)|\le2\varepsilon/\delta+M_2\delta/2$. Choose $\delta=\min\{h,2\sqrt{\varepsilon/M_2}\}$. If the second argument is smaller, the bound is $2\sqrt{\varepsilon M_2}$; otherwise $M_2h/2\le\sqrt{\varepsilon M_2}$, giving the common upper bound $|p'(\tau)|\le2\sqrt{\varepsilon M_2}+2\varepsilon/h$. The kinematic equation holds both on the solution and at the equilibrium, so $e(\alpha)-e(\alpha_\gamma)=p'+\mathcal J(p-p_\gamma)$, and hence $|e(\alpha)-e(\alpha_\gamma)|\le\omega(\varepsilon)$. For $|a-b|\le\pi$, the chord inequality $|e(a)-e(b)|\ge(2/\pi)|a-b|$ gives $|\alpha-\alpha_\gamma|\le\tfrac\pi2\omega(\varepsilon)$ on $W$. The full state is therefore within $\varepsilon+\tfrac\pi2\omega(\varepsilon)$ of the equilibrium in $C^0$ on $W$. Every history segment ending in $[\tau_1-h,\tau_1]$ lies in $W$, and property (L) bounds the state derivative at its endpoint by $L$ times that $C^0$ distance. Taking both suprema proves the stated $C^1$ bound. The zero-error case follows by applying the estimate for every $\varepsilon>0$ and taking the limit. $\square$

**Consequence, conditional on the all-past instability construction.** That construction supplies histories arbitrarily close to the circle which later reach $C^1$ distance $\eta>0$ from the phase family while staying in the local domain up to the chosen endpoint. The departure point can be chosen on the local unstable manifold, so its preceding window also stays there. By the lemma, positions on the preceding window of length $2h=8$ cannot stay within $\varepsilon$ of any single phase-shifted circle whenever $(1+L)\bigl(\varepsilon+\tfrac\pi2\omega(\varepsilon)\bigr)<\eta$. The constants can be chosen uniformly on a small local phase arc by rotation symmetry. The other phase circles are already separated in position from a sufficiently small neighborhood of the base circle. Thus the conclusion concerns positions alone. For sufficiently small $\eta$, choosing $\varepsilon=c\eta^2$ with a sufficiently small constant $c>0$ is a sufficient observable departure scale; this estimate does not establish a sharp scaling law or a trajectory growth rate.

### 3.3. An analytic spectral bound and an uncertified numerical count

The review's argument-principle computation covered a finite window, and the proof header correctly declined to call it a global spectral certificate. An analytic bound confines every root in the closed right half-plane to that window. This resolves the outer-domain question only; it does not certify the numerical count inside. Use $F$, $N$, and $M$ from the [growing-mode derivation](planar-circle-growing-mode.md#1-rotating-coordinates-and-the-speed-constraint), with $C=D$, $S=\sin D$, and $J=1+S$. For $\operatorname{Re}z\ge0$ one has $|E|=|e^{-2Dz}|\le1$, $|M|\le2S|z|+2C$, and $|N|\le2C|z|+2S$. Termwise triangle inequalities then give

$$
|F(z)+z^3|\le a_2|z|^2+a_1|z|+a_0,
$$

$$
a_2=\frac CJ+\frac SC,\qquad a_1=1+\frac{|1-2S|\,S}{C^2}+\frac3J,\qquad a_0=\frac CJ+\frac SC+\frac{|1-2S|}{C}+\frac{3S}{CJ}.
$$

The numerical coefficient values are unnecessary for a proof. Alternating Taylor bounds give $\cos(0.73)\ge1-0.73^2/2>0.73$ and $\cos(0.75)\le1-0.75^2/2+0.75^4/24<0.75$. Since $x-\cos x$ is strictly increasing on this interval, $0.73<C=D<0.75$. Sine is increasing there; the bounds $\sin(0.73)\ge0.73-0.73^3/6>0.66$ and $\sin(0.75)\le0.75-0.75^3/6+0.75^5/120<0.69$ yield $0.66<S<0.69$, $J>1.66$, and $|1-2S|<0.38$. Consequently the exact rational upper bounds

$$
a_2<\frac{0.75}{1.66}+\frac{0.69}{0.73}<1.40,\qquad
a_1<1+\frac{0.38\cdot0.69}{0.73^2}+\frac3{1.66}<3.31,
$$

$$
a_0<1.40+\frac{0.38}{0.73}+\frac{3\cdot0.69}{0.73\cdot1.66}<3.64
$$

hold, where every terminating decimal denotes its exact rational value. For $r\ge3$, put $P(r)=r^3-1.40r^2-3.31r-3.64$. Then $P(3)=0.83>0$, $P'(3)=15.29>0$, and $P''(r)=6r-2.80>0$. Hence $r^3>a_2r^2+a_1r+a_0$ for all $r\ge3$, contradicting the displayed bound if $F(z)=0$. Thus **every characteristic root with nonnegative real part satisfies $|z|<3$**. This is a derived exclusion; it uses neither random sampling nor numerical winding.

The earlier `argprinciple.mjs` computation sampled the boundary of $-0.5\le\operatorname{Re}z\le3$, $|\operatorname{Im}z|\le40$, a rectangle containing this closed right-half-plane root region, and reported winding approximately two. This is a measured floating-point diagnostic, with the control limitations in Section 5. It is consistent with the simple phase root $z=0$ and one simple positive real root near $0.41017$. It does **not** prove that there are exactly two roots in the rectangle, that the positive root is simple or unique, that no other center root exists, or that the unstable manifold is one-dimensional. The exact facts are $F'(0)=1$ and the sign argument in the growing-mode derivation, which establish a simple phase root and at least one positive real characteristic root. Those facts suffice for the existing instability route, subject to Section 3.1, without a complete count.

A root-count certificate would require a justified nonvanishing enclosure for $F$ along the entire contour and a validated computation of its total argument change, including bounds that prevent unresolved winding between samples. Pointwise interval evaluations of $|F|$ alone would not establish that count. No such certificate was produced here, and obtaining one is a separate optional investigation rather than a premise of the local instability argument.

## 4. The new departure subsections

Sections 9.3.5 and 9.3.6 of the manuscript are outside the review's original scope. Their escape argument has its own [review assignment](sharp-circle-escape-claude-review-prompt.md), and nothing here pre-empts its resulting review. They do bear on one statement in the review. The review reported an exploratory run from the supplied radius $1.001R_\ast$ that left the band $[0.5,1.5]R_\ast$ near $t/R_\ast\approx15.7$ with the active branch intact. That is consistent with §9.3.5, which follows the same history further to ceiling release. The review's exploratory run is now superseded by §9.3.5 and adds nothing beyond it.

## 5. Reported numerical checks and corrected validation account

The numerical instruments are plain Node scripts in the ignored scratch folder `.tmp/planar-circle-independent-review/`. Source inspection for this correction establishes that the earlier statement "each passed a known case before its target run" was unsupported. The values below are retained as previously reported diagnostics, not newly rerun measurements or independent certification of the analytical claims.

- **Root bound** (`root-bound.mjs`). The source prints the target's floating-point coefficients and then immediately samples 200,000 random target points. It contains no executed independent known-case check before those samples. The previously reported lack of violations and maximum ratio of approximately 0.95 are sampling diagnostics, not validation of the instrument or the bound. Section 3.3 now proves the bound using exact rational enclosures independently of this script.
- **Winding count** (`argprinciple.mjs`). The source labels two rectangles of the same target function as known cases, but their claimed root counts have not been independently established. The labels do not supply a known-case validation. Its reported winding near two remains diagnostic; a future run must first pass a genuinely known function, such as a polynomial with an analytically specified root count.
- **Departure cross-check** (`departure-cross.mjs`). This is the review's own heading-coordinate integrator, reported as written independently of the submitted `sharp-circle-departure.mjs`, with its radius guards widened. The current scratch source runs the $1.001R_\ast$ and $0.999R_\ast$ inputs only; it does not execute an exact-circle control before them. This inspection cannot establish whether another earlier version passed that control. For the $1.001R_\ast$ input, the reported forward raw component becomes nonpositive at $t/R_\ast\approx19.910$ at radius $2.87232R_\ast$, at steps $2\times10^{-3}$, $10^{-3}$, and $5\times10^{-4}$. These values agree with §9.3.5's $19.910$ and $2.8723R_\ast$ at the printed precision. The agreement remains provisional numerical evidence because the stated control ordering is not documented by the retained source.
- **Contracting input.** For the $0.999R_\ast$ input, the finest step reaches the $0.01R_\ast$ guard near $t/R_\ast\approx16.4415$, against the manuscript's $16.4406$. At the two coarser steps, this instrument instead reports the forward component turning nonpositive at radii $0.014$ to $0.020R_\ast$. That regime is under-resolved in this instrument, whose delay there is only about 0.02. This result neither confirms nor contradicts §9.3.5's statement that the forward component stays positive to the guard. It does indicate that the statement is sensitive to resolution, which is worth checking in any review of the contracting run.

Limits: floating point throughout, a fixed-step integrator with cubic history interpolation, no directed rounding, and scratch-only instrument retention. Neither step refinement nor agreement at printed precision is a rigorous error bound. The corrected analytical statements above do not depend on these runs.

## 6. Current verdicts

| Item | Verdict after reassessment |
| --- | --- |
| Initial radial response | Verified; unchanged. |
| Delayed linearized equation | Verified; unchanged. |
| Growing linear mode | Derived existence of at least one positive real characteristic root; derived exclusion of nonnegative-real-part roots with $|z|\ge3$. Exact count and positive-root multiplicity remain unproved by the floating-point diagnostics. |
| Admissibility of the heading formulation | Verified; unchanged. |
| Local nonlinear instability | The solution-manifold instability input is checked; the physical all-past proof route remains conditional on a read and checked map-level unstable-manifold theorem. No count or dimension assertion is needed. |
| Instability modulo circular phase | Conditional on that all-past construction. Section 3.2 supplies the derived positions-only estimate with explicit local hypotheses, correcting the review's unsupported Lipschitz-only argument. |

The strongest unconditional spectral conclusions here are a growing real mode and the analytic confinement bound. With the map-level theorem applied under verified hypotheses, the existing construction yields Lyapunov instability modulo circular phase within smooth antipodal planar histories on the active boundary, which also prevents stability in any larger admissible class containing it. The lemma then makes this local departure visible in positions. The dimension of the unstable manifold is not certified by this review. Nothing here establishes the subsequent fate of a departing history.

## 7. Remaining changes

The [implementation prompt](planar-circle-instability-review-corrections-prompt.md) specifies a future integration: check the map-level citation, replace the unsupported spectral phrasing in proof §4, add the positions lemma to proof §6, record the analytic spectral bound while preserving the numerical-count caution, and align the manuscript and live priority entry with those claim grades. These changes have not been made to the primary proof or instrument files by this reassessment correction. A complete spectral certificate is optional and separate; it is not the remaining prerequisite for the instability argument.

**Falsifiers.** A validated characteristic root with $\operatorname{Re}z\ge0$ and $|z|\ge3$, or an invalid step in the explicit coefficient inequalities, would refute the bound in Section 3.3; a small floating-point residual alone would not establish such a root. An exact solution satisfying all of the lemma's local-domain, heading-lift, derivative-bound, and norm hypotheses whose positions stay within $\varepsilon$ of one phase circle on $W$ while its final $C^1$ distance exceeds the displayed bound would refute Section 3.2. A discrepancy between independently controlled departure runs would call the reported numerical agreement into question, but refinement spread alone is not an error bound for either run. Failure of a hypothesis of the map-level theorem once read would block the physical all-past construction.

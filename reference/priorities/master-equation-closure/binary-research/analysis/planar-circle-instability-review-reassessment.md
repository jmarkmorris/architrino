# Reassessment of the planar-instability review after the research reorganization

**Date:** 2026-09-26. **Author:** Claude, the author of the [2026-09-16 independent review](../evidence/planar-circle-instability-independent-review.md); evidence-grade and lemma corrections and original-source verification integrated by Codex on 2026-09-26. **Grade:** derived local nonlinear instability and estimates under the stated model and local-history hypotheses; reported floating-point diagnostics with the validation limits in Sections 3.3 and 5. Section 3.1 records the completed original-theorem check. **Scope:** the sharp Master Equation partner row, the authorized field-speed ceiling with least-change projection of the complete sum, zero self response at and below field speed, $c_f=c_a=1$, isolated antipodal opposite-polarity pair. No smoothing or additional reception rule enters.

This note re-evaluates the earlier review against the current state of its subject. The review itself is preserved unchanged in the historical ceiling directory. Where this note corrects the review, the correction is stated explicitly and supersedes it.

## 1. What the reorganization changed

On 2026-09-26 the field-speed-ceiling directory was parked under `dormant-deferred`. The circular-binary work, including the three planar derivations, moved to the Braid Program, and the regular-chart theorem moved to Master-Equation Closure. The migration record lists these moves in its [path map](../../braid-program/analysis/research-reorganization-completion.md). The manuscript sections formerly numbered 5.3.1 to 5.3.4 are now [§9.3.1 to §9.3.4](../manuscript.md#13-planar-perturbations-and-the-ellipse-question), with legacy anchors preserved. Two new numerical subsections, §9.3.5 and §9.3.6, follow them.

The reorganization preserved the governing equations in the first-variation and growing-mode analyses. The nonlinear proof was revised after the review to integrate its corrections. The questions here concern those integrations and the earlier review's remaining mathematical and evidence obligations; the corrected verdicts are stated in Section 6.

The later binary-directory extraction renumbered this circular chapter again: all historical §9.3.x references in this record correspond to current binary-manuscript §1.3.x, with their link targets preserved. The current departure references below use that numbering; earlier review-history labels retain their original section identity.

## 2. Status of each correction the review requested

| Requested correction | Current state | Assessment |
| --- | --- | --- |
| State the unstable-manifold step instead of citing Stumpf's introductory remark | Integrated in [proof §4](planar-circle-nonlinear-instability.md#4-recovering-admissible-all-past-histories) as a backward-orbit construction for the time-$a$ map, with patching and continuous dependence | Complete: original KWW Theorem I.3, pp. 168–169, and its standing hypotheses have been read and checked (Section 3.1). |
| Qualify Stumpf's Theorem 4.1 as instability on the solution manifold | Integrated in proof §3 and §4 and in manuscript §9.3.4 | Done and correct. |
| State that the reduced antipodal evolution is the physical evolution by regular-chart uniqueness | Integrated in proof §5 and manuscript §9.3.4 | Done and correct. |
| Make the manuscript's quantifier existential | Manuscript §9.3.4 now says "there exist admissible antipodal planar disturbances, arbitrarily small in the stated history norm" | Done and correct. |
| Record the measured count of unstable roots | The proof header retains the numerical-count caution; [growing-mode §3.1](planar-circle-growing-mode.md#31-analytic-confinement-of-nonnegative-real-part-roots) and manuscript §9.3.3 contain the analytic confinement proof | The outer-domain exclusion is derived; the winding count remains an uncertified diagnostic. |
| Add the position-level reading of $C^1$ instability | The independently checked position-to-history lemma is integrated in [proof §6](planar-circle-nonlinear-instability.md#6-exact-scope-of-the-conclusion) and manuscript §9.3.4 | The estimate and all-past instability corollary are derived under their explicit local hypotheses. **The original review was wrong** to call the estimate an elementary Lipschitz consequence. |

The integration replaced proof §4's unsupported choice $a>h$ and phrase "compact spectral structure" with the survey's stated facts: the fixed-time map is $C^1$ (Theorem 3.2.1), its derivative is the linearized time map with spectrum contained in $\{0\}\cup\{e^{za}:z\in\sigma(G)\}$ (relation 3.4.1), and the unstable generalized eigenspace is finite-dimensional. The analytically established positive characteristic root supplies an actual expanding eigenmode. The original-theorem application additionally states the stable/center/unstable split and its strict stable and unstable spectral gaps. KWW Theorem I.3 applies with the neutral phase direction retained, without fixing the unstable space's dimension.

## 3. Corrections and strengthenings

<a id="31-the-map-level-unstable-manifold-theorem-still-needs-a-checked-source"></a>
### 3.1. The map-level unstable-manifold theorem is checked

The source obligation is discharged by original-page inspection of Krisztin, Walther and Wu, *Shape, Smoothness, and Invariant Stratification of an Attracting Set for Delayed Monotone Positive Feedback*, Fields Institute Monographs 11 (1999), DOI 10.1090/fim/011, **Appendix I, Theorem I.3, pp. 168–169**, with standing hypotheses and equivalent norms on pp. 167–168. The [publisher contents](https://pubs.ams.org/ebooks/fim/011/) identify Appendix I as pp. 167–172. The public [Google Books preview](https://books.google.com/books?id=dZRjVZkPG2YC&pg=PA168) displayed the original pages, which were read visually rather than relying on search snippets or mixed preview OCR. Two independent read-only reviewers also inspected all three page images and checked the application. The earlier bounded access failure is superseded by this successful route.

The [primary proof §4](planar-circle-nonlinear-instability.md#4-recovering-admissible-all-past-histories) contains the complete application. Its checked ingredients are:

| Original hypothesis or conclusion | Application to the circular history |
| --- | --- |
| A local $C^1$ map on an open Banach-space domain, fixing the base point | A fixed $a>0$ gives $H=K\circ F_a\circ R$ on a chart of the compatible-history manifold; survey Theorem 3.2.1 supplies differentiability. |
| Closed invariant stable, center and unstable subspaces | Survey §3.4 and relation 3.4.1 supply the split for $DH(0)$; center and unstable spaces are finite-dimensional, and the proved positive root makes the latter nonempty. The phase direction remains in the center space. |
| A number $\lambda<1$ exceeding both stable spectral radius and unstable inverse spectral radius | Finiteness of the generator spectrum to the right of each vertical line gives a strict stable gap $\delta_s>0$; the finite unstable spectrum gives $\delta_u>0$. Choose $\max\{e^{-a\delta_s},e^{-a\delta_u}\}<\lambda<1$. |
| Theorem I.1 equivalent norms | They give $\|\mathcal L_u^{-1}\|_u<\lambda$ and $\|\mathcal L_{sc}\|_{sc}<1/\lambda$. This permits center spectrum; it does not require the complement to contract. |
| Theorem I.3(i)–(iii), tangent graph and contracting restricted inverse | The graph has backward iterates bounded geometrically by $\alpha_u^j$ for $0<\alpha_u<\lambda$, hence satisfies the theorem's negative-index condition $\lambda^{-j}\xi_{-j}\to0$. No inverse of the full map is used. |
| Transfer from discrete iterates to histories | The local chart inverse and survey Proposition 3.5.3 transfer convergence to the $C^1$ history norm and intermediate times; forward uniqueness and endpoint compatibility patch the pieces into an all-past solution. |

The original theorem requires neither a globally defined nonlinear map nor higher differentiability. Its allowance for center spectrum resolves the obstacle in Hale–Lin's theorem below. The local graph and its restricted inverse preserve the actual time-map trajectories; no rescaling of the nonlinear map or removal of phase is performed. The resulting physical histories and fixed-phase positional consequence are derived in proof §§4–6. This checks a published mathematical input and its application, rather than independently reproving all of Appendix I.

The other inspected sources retain these distinct roles:

| Source actually checked | Statement and applicability |
| --- | --- |
| Hale and Lin, [*Symbolic dynamics and nonlinear semiflows*](https://xblin.math.ncsu.edu/preprint/symbolicdynamics.pdf), Theorem 3.1, pp. 233–234; proof through p. 235 | The original theorem constructs an unstable graph and contracting inverse on it without assuming the full map invertible. Its linear splitting requires equivalent norms with $\|A\|,\|B^{-1}\|<\lambda<1$. The circular phase has time-map eigenvalue one, so the complementary block fails this strict-contraction hypothesis. This theorem does not directly close the present argument. |
| Krisztin, [*Unstable sets of periodic orbits and the global attractor for delayed feedback*](https://www.math.u-szeged.hu/~krisztin/pdf_files/tk_43.pdf), internal p. 7 | The author explicitly applies Krisztin–Walther–Wu (1999), Appendix I, **Theorem I.3**, allowing a zero characteristic real part in the complement and producing backward iterates with geometric decay. This verifies the theorem-number lead and its relevance. It does not reproduce the original theorem's complete hypotheses. |
| Hartung–Krisztin–Walther–Wu, [survey §§3.2–3.5](https://aimath.org/WWN/variabletimelag/sur0b.pdf) | Theorem 3.2.1, relation 3.4.1 and §3.4, printed pp. 35–37, support the local chart, spectral mapping, finite center/unstable spaces and strict stable gap. Proposition 3.5.3 controls intermediate times. The original KWW theorem now supplies the map-level unstable construction. |

The three inspected images are retained for local source verification under `.local-data/braid-analysis/planar-circle-kww-source-2026-09-26/`; they are not tracked publication assets. SHA-256 inspection gives the identities below. Public page locators and these identities make the source check reproducible without publishing the images or session-specific asset URLs.

| Local filename | Original printed page | SHA-256 |
| --- | --- | --- |
| `page-167.png` | 167 | `68935308e3dd58ae8ba555a6238c69793fa2a1531ba002af465b236f38707d85` |
| `page-168.png` | 168 | `e806fae20f7b9f71fd6fddd7222c11cf28c946397c3eb23b9990909d177310a7` |
| `page-169.png` | 169 | `9229951a4c4737e109f19ea84ab88927c62ff630187ed8cae8f1addc690c8719` |

### 3.2. Positions-only instability, with the estimate the review omitted

The review claimed that the Lipschitz property (L) alone turns $C^1$ departure into positional departure. That is incorrect. Property (L) bounds the derivative of the whole state, position $p$ and heading $\alpha$, by the $C^0$ distance of the whole state, which includes heading. Positional closeness does not by itself control heading. The missing estimate follows from a bound on the second derivative of position and an interpolation inequality. Its instability corollary uses the completed all-past construction in Section 3.1.

**Lemma.** Write $x=(p,\alpha)$ and use the product norm $|x|=|p|+|\alpha|$, with $\|x\|_{C^1}=\sup|x|+\sup|x'|$ on a history interval. Let a solution have histories $x_\tau$ in a sufficiently small neighborhood $U$ of the proof for every $\tau$ in $W=[\tau_1-2h,\tau_1]$, where $h=4$. Choose a finite positive bound $M_2>0$ for $|p''|$ there and a uniform constant $L$ such that $|f(x_\tau)-f(\phi_\gamma)|\le L\|x_\tau-\phi_\gamma\|_{C^0}$ for the histories and constant phase equilibria $\phi_\gamma=(p_\gamma,\alpha_\gamma)\in U$ under consideration. Suppose $p_\gamma=Q(\gamma)(1,0)$, $\alpha_\gamma=\pi/2+\gamma$ belongs to the same local heading lift, $|\alpha(\tau)-\alpha_\gamma|\le\pi$ on $W$, and, for some $\varepsilon>0$,

$$
|p(\tau)-p_\gamma|\le\varepsilon\qquad\text{for all }\tau\in W .
$$

Then the $C^1$ distance of the final state segment from the equilibrium $(p_\gamma,\alpha_\gamma)$ is at most $(1+L)\bigl(\varepsilon+\tfrac\pi2\omega(\varepsilon)\bigr)$, where $\omega(\varepsilon)=2\sqrt{\varepsilon M_2}+2\varepsilon/h+\varepsilon$.

*Proof.* A finite $M_2$ exists after shrinking $U$: $p''=\alpha'\mathcal Je(\alpha)-\mathcal Jp'$, and the continuous local equation bounds both $\alpha'$ and $p'$. Its continuous extension of the derivative to $C^0$ variations gives the stated Lipschitz estimate on a sufficiently small convex neighborhood. Put $g=p-p_\gamma$. For $\tau\in W$ and $0<\delta\le h$, at least one of $[\tau,\tau+\delta]$ and $[\tau-\delta,\tau]$ lies in $W$. Taylor's integral remainder on that interval gives $|g'(\tau)|\le2\varepsilon/\delta+M_2\delta/2$. Choose $\delta=\min\{h,2\sqrt{\varepsilon/M_2}\}$. If the second argument is smaller, the bound is $2\sqrt{\varepsilon M_2}$; otherwise $M_2h/2\le\sqrt{\varepsilon M_2}$, giving the common upper bound $|p'(\tau)|\le2\sqrt{\varepsilon M_2}+2\varepsilon/h$. The kinematic equation holds both on the solution and at the equilibrium, so $e(\alpha)-e(\alpha_\gamma)=p'+\mathcal J(p-p_\gamma)$, and hence $|e(\alpha)-e(\alpha_\gamma)|\le\omega(\varepsilon)$. For $|a-b|\le\pi$, the chord inequality $|e(a)-e(b)|\ge(2/\pi)|a-b|$ gives $|\alpha-\alpha_\gamma|\le\tfrac\pi2\omega(\varepsilon)$ on $W$. The full state is therefore within $\varepsilon+\tfrac\pi2\omega(\varepsilon)$ of the equilibrium in $C^0$ on $W$. Every history segment ending in $[\tau_1-h,\tau_1]$ lies in $W$, and property (L) bounds the state derivative at its endpoint by $L$ times that $C^0$ distance. Taking both suprema proves the stated $C^1$ bound. The zero-error case follows by applying the estimate for every $\varepsilon>0$ and taking the limit. $\square$

**Consequence of the all-past instability construction.** That construction supplies histories arbitrarily close to the circle which later reach $C^1$ distance $\eta>0$ from the phase family while staying in the local domain up to the chosen endpoint. The departure point can be chosen on the local unstable manifold, so its preceding window also stays there. By the lemma, positions on the preceding window of length $2h=8$ cannot stay within $\varepsilon$ of any single phase-shifted circle whenever $(1+L)\bigl(\varepsilon+\tfrac\pi2\omega(\varepsilon)\bigr)<\eta$. The constants can be chosen uniformly on a small local phase arc by rotation symmetry. The other phase circles are already separated in position from a sufficiently small neighborhood of the base circle. Thus the conclusion concerns positions alone. For sufficiently small $\eta$, choosing $\varepsilon=c\eta^2$ with a sufficiently small constant $c>0$ is a sufficient observable departure scale; this estimate does not establish a sharp scaling law or a trajectory growth rate.

### 3.3. An analytic spectral bound and an uncertified numerical count

The analytic confinement inequality below repeats the argument in the subject's growing-mode proof; its second presentation is not an independently authored proof. The sampled numerical check is already classified as uncontrolled in Section 5. The exclusion stands on its explicit rational inequalities, whose correctness can be assessed directly.

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

The earlier `argprinciple.mjs` computation sampled the boundary of $-0.5\le\operatorname{Re}z\le3$, $|\operatorname{Im}z|\le40$, a rectangle containing this closed right-half-plane root region, and reported winding approximately two. This is a measured floating-point diagnostic, with the control limitations in Section 5. It is consistent with the simple phase root $z=0$ and one simple positive real root near $0.41017$. It does **not** prove that there are exactly two roots in the rectangle, that the positive root is simple or unique, that no other center root exists, or that the unstable manifold is one-dimensional. The exact facts are $F'(0)=1$ and the sign argument in the growing-mode derivation, which establish a simple phase root and at least one positive real characteristic root. Those facts suffice for the checked instability route in Section 3.1 without a complete count.

A root-count certificate would require a justified nonvanishing enclosure for $F$ along the entire contour and a validated computation of its total argument change, including bounds that prevent unresolved winding between samples. Pointwise interval evaluations of $|F|$ alone would not establish that count. No such certificate was produced here, and obtaining one is a separate optional investigation rather than a premise of the local instability argument.

## 4. The new departure subsections

Sections 1.3.5 and 1.3.6 of the current binary manuscript (formerly 9.3.5 and 9.3.6) are outside the review's original scope. Their escape argument has its own [review assignment](sharp-circle-escape-claude-review-prompt.md), and nothing here pre-empts its resulting review. They do bear on one statement in the review. The review reported an exploratory run from the supplied radius $1.001R_\ast$ that left the band $[0.5,1.5]R_\ast$ near $t/R_\ast\approx15.7$ with the active branch intact. That is consistent with §1.3.5, which follows the same history further to ceiling release. The review's exploratory run is now superseded by §1.3.5 and adds nothing beyond it.

## 5. Reported numerical checks and corrected validation account

The eight original Node instruments remain in `.tmp/planar-circle-independent-review/` and have been copied byte-for-byte to the ignored retained-evidence owner `.local-data/braid-analysis/planar-circle-independent-review-2026-09-26/`. The [tracked retention receipt](../evidence/planar-circle-review-instrument-retention.md) binds the inventory, hashes, replay context and control limitations. Source inspection establishes that the earlier statement "each passed a known case before its target run" was unsupported. The values below are previously reported diagnostics, not newly rerun measurements or independent certification of the analytical claims. Retention preserves the sources without silently upgrading their evidence grade or installing new regular tests.

- **Root bound** (`root-bound.mjs`). The source prints the target's floating-point coefficients and then immediately samples 200,000 random target points. It contains no executed independent known-case check before those samples. The previously reported lack of violations and maximum ratio of approximately 0.95 are sampling diagnostics, not validation of the instrument or the bound. Section 3.3 now proves the bound using exact rational enclosures independently of this script.
- **Winding count** (`argprinciple.mjs`). The source labels two rectangles of the same target function as known cases, but their claimed root counts have not been independently established. The labels do not supply a known-case validation. Its reported winding near two remains diagnostic; a future run must first pass a genuinely known function, such as a polynomial with an analytically specified root count.
- **Departure cross-check** (`departure-cross.mjs`). This is the review's own heading-coordinate integrator, reported as written independently of the submitted `sharp-circle-departure.mjs`, with its radius guards widened. The current scratch source runs the $1.001R_\ast$ and $0.999R_\ast$ inputs only; it does not execute an exact-circle control before them. This inspection cannot establish whether another earlier version passed that control. For the $1.001R_\ast$ input, the reported forward raw component becomes nonpositive at $t/R_\ast\approx19.910$ at radius $2.87232R_\ast$, at steps $2\times10^{-3}$, $10^{-3}$, and $5\times10^{-4}$. These values agree with §9.3.5's $19.910$ and $2.8723R_\ast$ at the printed precision. The agreement remains provisional numerical evidence because the stated control ordering is not documented by the retained source.
- **Contracting input.** For the $0.999R_\ast$ input, the finest step reaches the $0.01R_\ast$ guard near $t/R_\ast\approx16.4415$, against the manuscript's $16.4406$. At the two coarser steps, this instrument instead reports the forward component turning nonpositive at radii $0.014$ to $0.020R_\ast$. The changing stop event demonstrates resolution sensitivity in this exploratory fixed-step instrument; a delay of about 0.02 alone is not an error estimate. The adaptive subject run uses a different numerical procedure, so these diagnostics neither refute nor certify its sign history. The [escape review's received resolution question](sharp-circle-escape-independent-review.md#35-contracting-input-separate-resolution-question) now distinguishes its positive evaluated states from a continuous-time positivity claim and specifies controlled comparisons at shared radii through the existing guard.

Limits: floating point throughout, a fixed-step integrator with cubic history interpolation, and no directed rounding or whole-contour winding validation. Instrument sources are locally retained with a tracked identity receipt; that is not a separately verified backup. Neither step refinement nor agreement at printed precision is a rigorous error bound. The corrected analytical statements above do not depend on these runs.

## 6. Current verdicts

| Item | Verdict after reassessment |
| --- | --- |
| Initial radial response | Verified; unchanged. |
| Delayed linearized equation | Verified; unchanged. |
| Growing linear mode | Derived existence of at least one positive real characteristic root; derived exclusion of nonnegative-real-part roots with $|z|\ge3$. Exact count and positive-root multiplicity remain unproved by the floating-point diagnostics. |
| Admissibility of the heading formulation | Verified; unchanged. |
| Local nonlinear instability | Derived in the stated active-boundary antipodal planar class. Original KWW Theorem I.3 and its hypotheses are checked in Section 3.1, completing the physical all-past construction. No count or dimension assertion is needed. |
| Instability modulo circular phase | Derived by transversality to the phase curve. Section 3.2 supplies the positional-window consequence under explicit local hypotheses, correcting the review's unsupported Lipschitz-only argument. |

The derived spectral conclusions are a growing real mode and the analytic confinement bound. Applying the checked map-level theorem yields Lyapunov instability modulo circular phase within smooth antipodal planar histories on the active boundary, which also prevents stability in any larger admissible class containing it. The lemma makes this local departure visible in positions. The dimension of the unstable manifold is not certified by this review. Nothing here establishes the subsequent fate of a departing history or transfers the result to the uncapped equation.

## 7. Integration disposition and remaining obligations

| Requested action | Disposition on 2026-09-26 |
| --- | --- |
| Decide whether to keep the count scripts | Keep all eight originals unchanged in the local evidence owner, with a tracked identity and control receipt. Do not promote unchecked exploratory instruments into the regular scripts folder. No target rerun was needed for the independent analytic proof. |
| Check the unstable-manifold citation | Complete: original KWW Theorem I.3, pp. 168–169, and setup pp. 167–168 read and independently checked against the local map, spectral split, equivalent norms and backward construction. |
| Trim proof §4 | Replaced unsupported time-step and compactness language with inspected survey facts and the explicit original-theorem application, including both spectral gaps. |
| Add the positions lemma | Taylor and chord steps independently verified and integrated in proof §6. The completed all-past construction supplies the positional instability corollary. |
| Record a complete eigenvalue count | **Not accepted as established.** The derived $|z|<3$ bound is integrated in growing-mode §3.1. The historical winding remains diagnostic, and the proof header retains its caution. A whole-contour count certificate is an optional separate investigation. |
| Align manuscript and links | §§9.3.3–9.3.4 contain the bound, lemma consequence and derived local claim grade, with links to this reassessment and the primary proof. |
| Update live status | [Braid Program priorities](../priorities.md#research-ownership--2026-09-26) and the [source-check work-log entry](../../braid-program/work-log.md#2026-09-26--original-unstable-manifold-theorem-checked) capture the completed result. Historical ceiling priorities remain preserved. |
| Hand off contracting-run sensitivity | The escape review now owns the separate resolution question in §3.5. The departure analysis and manuscript distinguish sampled positivity from continuous certification; no new trajectory run was performed. |

The [source-check assignment](planar-circle-instability-review-corrections-prompt.md) is complete. The optional complete spectral certificate and contracting-run comparison remain separate investigations; neither is a prerequisite for the local instability result.

**Falsifiers.** A validated characteristic root with $\operatorname{Re}z\ge0$ and $|z|\ge3$, or an invalid step in the explicit coefficient inequalities, would refute the bound in Section 3.3; a small floating-point residual alone would not establish such a root. An exact solution satisfying all of the lemma's local-domain, heading-lift, derivative-bound, and norm hypotheses whose positions stay within $\varepsilon$ of one phase circle on $W$ while its final $C^1$ distance exceeds the displayed bound would refute Section 3.2. A discrepancy between independently controlled departure runs would call the reported numerical agreement into question, but refinement spread alone is not an error bound for either run. An invalid hypothesis check for the original map-level theorem would invalidate the physical all-past construction.

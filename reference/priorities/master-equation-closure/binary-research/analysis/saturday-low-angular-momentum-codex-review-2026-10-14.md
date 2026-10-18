# Independent review of low and sign-changing relative angular momentum — October 14

## Current disposition

**Period estimates and bounded-separation exclusion independently accepted; LJ1–LJ3 and README remainder resolved.** The [subject](saturday-low-angular-momentum-2026-10-14.md), first reviewed at 26,208 bytes and SHA-256 `83d27fb243e371948fb51ead643603716c890135a088a5a69d418bbd6fd934c0`, supplies useful estimates through small positive J, zeros and arbitrary sign changes without singular inverse-J weights. Separate hand reconstruction supports Lemma 0, Proposition U, Theorems L/Z, the separation exclusion and the exact zero-rate formula with its error bound. The interpretation of the zero formula incorrectly turns a necessary size comparison into a direction criterion; its lead also gives the wrong upward-crossing inequality. The recurrence/chart and scalar sign claims need their exact domains stated.

The scenario remains complete planar opposite-unit pairs under the unchanged Master Equation, unit reduced coupling, $c_f=1$, positive separation and whole-past speed bound $0<w<1/3$, ordinary partner roots and no positive-delay own roots. No external conservation law, mass, force, mirror symmetry or frozen common velocity is introduced. General repeating solutions with large separation, signed correlations and radial travel remain open. After the corrections, both selected task-3 domains can close at bounded scope; no minimum time spend or general-periodicity proof is required.

## Coverage and evidence

The complete subject, evidence README, instrument, shared checkpoint and supervisor record are read. Current manuscript Section 9 through 9.5 and the full periodicity queue entry supply the receiving context. The accepted row/component, strength-difference, radial and signed-breathing results retain the fourteen exact dependency identities recorded at release; the review checks them against those records before requesting corrections. The canonical row and all-root obligations retain the inspected source identity. The two earlier campaign stages remain accepted and are not reopened or rerun.

The separately authored [isqrt/Fraction reference](../evidence/saturday-lowj-codex-review-2026-10-14/lowj_reference.py) imports no peer code. Integer square-root controls and hand coefficient controls pass before every target, followed by one short shared-venv execution that exits zero. It bounds the irrational input by a proved squared decimal bracket, independently of the peer's bisection. All five decimal directions in each of four table rows pass; additional checks confirm the closest-approach value, uniform error ratio, zero-product size display and signs of D at $8/75$ and .11 using both upper and lower bounds. This verifies arithmetic on the separately reconstructed formulas, not evolution or existence of a history. The retained peer supervisor records completed exit-zero execution and a closed process group; peer reports owned-compute clear, while wider live census remains unknown.

## Independent derivation of the period bounds

Let the relative vector be $\mathbf r$, with positive length r, and set $J=\mathbf r\times\dot{\mathbf r}$ using the fixed orientation of its plane. Differentiating its length gives

$$
\ddot r=\frac{|\dot{\mathbf r}|^2-\dot r^2}{r}+\hat{\mathbf r}\cdot\ddot{\mathbf r}
=\frac{J^2}{r^3}-A_r.
$$

This chart divides only by positive r. Relative recurrence with an orientation-preserving planar rotation makes r, its derivative and J periodic. The integrals of $\dot J$, $J\dot J$ and $\ddot r$ therefore vanish. The accepted inward-row bounds give

$$
\int_0^T\frac{J^2}{r^3}\,dt=\int_0^T A_r\,dt\ge c_-\int_0^T\frac{dt}{r^2}>0.
$$

At minimum r, $\ddot r\ge0$ implies $J^2\ge c_-r$. Since $|J|\le2wr$, the separation floor and closest-approach bound follow without a sign hypothesis. An everywhere-strict inequality $J^2<c_-r$ contradicts the period integral; identically zero J and an everywhere-small absolute J are excluded. This supplies no global bound on the minimum of J.

Write $I_2=\int r^{-2}dt$, $I_1=\int r^{-1}dt$, $Q=\int d^2dt$ and $L_d=\int|d|dt$, where $d=J/r$. For $J\ge0$, the radial identity and $0\le d\le2w$ give $I_2\le(2w/c_-)\Theta$. Integrating the actual rate $\dot J=\mu J+r\delta P_\perp+re_J$ and substituting $2r^2\delta=P_\parallel+\zeta$ gives

$$
\alpha\Theta\le K_1+wz_0 I_1+e I_2,\qquad
D\Theta\le K_1+wz_0I_1\le(w^2+wz_0)I_1.
$$

Here $|P_\parallel P_\perp|\le|\mathbf P|^2/2\le2w^2$, and $e=c_3+wc$ contains the actual-row curvature allowances. With positive D, this yields Theorem L and its weighted mean. Positivity of the radial integral prevents a zero denominator or $\Theta=0$ in this nonnegative-J class.

For arbitrary signs, multiply the actual rate by J before integrating. Since $\mu J^2\ge\alpha d^2$, the same substitution gives

$$
\alpha Q\le K_2+wz_0L_d+e\int\frac{|d|}{r}dt.
$$

Cauchy–Schwarz, the radial identity and the floor imply

$$
\int\frac{|d|}{r}dt\le\sqrt{Q I_2}
\le\frac{Q}{\sqrt{c_-r_{\min}}}\le\frac{2w}{c_-}Q.
$$

Thus $DQ\le K_2+wz_0L_d\le(w^2+wz_0)L_d$ and $Q\le kL_d$. Cauchy–Schwarz once more gives $L_d^2\le TQ\le TkL_d$; $L_d>0$ follows from the radial identity. Therefore the stated unweighted means and reciprocal-separation mean follow. Since $r^{-2}\ge r_{\max}^{-2}$, they imply

$$
r_{\max}\ge\frac{\sqrt{c_-r_{\min}}}{k}\ge\frac{c_-}{2wk}.
$$

All steps are regular at J=0 and transfer no sign between different weights. The primitive inequalities also prove S1–S5 as sufficient contradictions; they do not furnish new independently bounded correlations or an upper separation bound. The positive-J and arbitrary-sign results are distinct even where their final size bound agrees.

## Constants, speed interval and asymptotics

The independent reference confirms the four table rows at speeds $1/10$, $1/20$, $1/100$, $1/1000$, including the conservative separation exclusions 139.229, 5110.7, 930130 and 993000000. It also confirms $e(.1)/(2(.1)^2)<199.441$ as a numerical bound on a size comparison, not a crossing-direction threshold. Its upper enclosure proves $D(.11)<0$, whereas the lower enclosure alone cannot prove negativity.

The displayed formulas additionally settle the interval interpretation analytically: $\alpha=(1-w)^2/(1+w)$ is strictly decreasing; $c_-=2\alpha\sqrt{1-w^2}$ is decreasing; $c_3$, the prefactor and bracket of c, e and $2we/c_-$ are increasing and positive for $0<w<1/3$. Hence D is strictly decreasing. The certified endpoints imply $D>0$ throughout $(0,8/75]$ and $D<0$ throughout $[.11,1/3)$. This is a separate mathematical proof using endpoint enclosures, not interpolation of the peer's scan; the transition inside the gap is not located here. Since $\alpha,c_3\to1$, $c\to4$, $z_0=O(w^3)$ and $c_-\to2$, $D=1+O(w)$, $k=w^2(1+O(w))$ and $w^3c_-/(2wk)\to1$. These expansions are properties of the explicit sufficient constants and do not prove any large-separation solution.

## Zero-rate law and its interpretation

At a zero of J, $b_1=b_2=b$, $P_\perp=2b$ and $\zeta_0=P_\parallel[(1-b^2)^{-1/2}-1]$. Direct substitution in the two actual pointwise inputs gives

$$
\dot J=\frac{P_\parallel b}{rS}+E,\qquad |E|\le\frac e{r^2},\qquad S=\sqrt{1-b^2}>0.
$$

Consequently $P_\parallel b>eS/r$ implies $\dot J>0$, and $P_\parallel b<-eS/r$ implies $\dot J<0$. A zero followed by negative J necessarily has $P_\parallel b\le eS/r$; a zero followed by positive J necessarily has $P_\parallel b\ge-eS/r$. A tangency requires the product inside that band. A sign-changing periodic J has a zero followed by each sign, but either derivative can be zero; this proves neither a transverse crossing nor exclusion of flat zero intervals.

The size cap $|P_\parallel b|\le2w^2$ cannot imply that the actual product lies outside the band. A large r merely makes a fixed error band narrower; it does not fix direction at a product that remains zero or small. The displayed condition $r>eS/(2w^2)$ is only necessary for a product satisfying this cap to be outside the band, not sufficient for a zero of an actual solution to have a certified direction. At a zero, the stronger purely kinematic cap $|P_\parallel b|\le2|b|\sqrt{w^2-b^2}\le w^2$ is also available; incorporating it is optional and does not repair the logical issue by itself. The exact rate formula and Proposition X(i)–(iii) are supported; X(iv), the lead's upward inequality and the direction interpretation require correction.

## Required corrections

1. **LJ1 — Correct the crossing interpretation everywhere.** The sufficient direction test is the actual-product inequality $P_\parallel b>eS/r$ or $P_\parallel b<-eS/r$. Large separation alone gives no direction. Reclassify $eS/(2w^2)$ and its 199.441 display as only a necessary feasibility/size comparison under the coarse cap; the instrument's existing `rcross_up` field can remain frozen with that explanatory boundary. In Result item 5, state that the upward case requires $P_\parallel b\ge-eS/r$, not “the opposite inequality” to the downward positive-band bound. Keep the exact formula, tangency and one-sided-zero conditions. Revise the prose that claims a reversal necessarily changes the common-velocity orientation beyond the band: actual opposite outside-band products certify opposite derivatives, while within-band zeros and zero derivatives remain unclassified. Apply the same scope in README and supersede the shared checkpoint by the correction receipt; do not edit the old entry.
2. **LJ2 — State regularity and recurrence domains accurately.** Only a sign-changing zero reverses the turning direction; an arbitrary zero, tangency or zero interval need not. The chart singularity belongs to inverse-J formulas, not to the Cartesian period equations. Specify the proper rotation as orientation preserving on the fixed motion plane when asserting J is T-periodic; a spatial proper rotation can reverse the plane's orientation. Alternatively explain the doubled-period treatment in that case. Keep identically zero, isolated/tangent and flat-interval cases separate and do not add a transverse-crossing assumption to X(iii).
3. **LJ3 — Separate scalar sign proof from the grid.** The peer instrument encloses D from below, so a negative lower bound by itself does not certify $D(.11)<0$. Either state only the measured lower-bound scan and withdraw unsupported continuous language, or incorporate the independent upper endpoint enclosure and monotonicity proof above, with attribution to this review/reference. The four table rows and mean/separation theorems are independently confirmed unchanged. Keep the transition gap and optimality open. No peer rerun or instrument edit is needed.

Correct only the released subject and README, preserving all accepted dependencies, instrument and outputs. Return one consolidated corrected-byte/coverage receipt and stop. No new scientific target is assigned. The late completion of priority reading remains honestly dated; it is not backdated or treated as a mathematical refutation. Once corrected bytes verify, the selected two-domain stage can complete with large-separation correlations, radial travel, actual repeating examples and general periodicity still open. A valid complete solution violating an accepted bound or satisfying the strict separation predicate would reopen the affected theorem; a failure of a sufficient predicate alone would not.

## Corrected-source verification and README remainder — October 14

Full corrected subject reading resolves LJ1–LJ3 at 30,229 bytes, `21d0693ec78356ba1cc358692891ec5c61a6fc9cf4ec728a180b67266e9ea3f8`. The actual-product sign tests, negative upward band, zero-type distinctions, motion-plane orientation/doubled period and attributed scalar sign proof now have their required scopes. Known-first hash/link/KaTeX checks render all 400 subject and 63 README spans, match fourteen accepted binary dependencies and nine frozen instrument/output/reference identities, with no rerun or history evaluation. Corrected source and first corrected README are retained separately.

One LJ1 explanation remains incorrect in README `09d9e748b1549dbefb0d5ac40dd6461cd678f2a9544d31ed4ff43db85b6de6b8`: its first instrument bullet calls $e/(2w^2)$ a necessary condition for direction tests at a zero. The actual necessary condition is $r>eS/(2w^2)$ with $S=\sqrt{1-b^2}$, as the corrected subject states. The frozen field encloses $e/(2w^2)$, which is an upper bound on that b-dependent necessary comparison and is not itself a necessary lower separation cutoff. Because $S\le1$, replacing $eS$ by its upper bound e makes the proposed necessary cutoff stronger without proof. The LJ1 corrections paragraph also omits S when calling the number necessary. Correct both explanatory passages only; keep the subject, instrument, outputs and independent reference frozen. No extra science or rerun is assigned. Full stage disposition waits for that final README correction.

## Final corrected-byte disposition — October 14

**Task 3 independently accepted at bounded derived scope; both selected domains reviewed and resolved.** Full corrected subject reading and final README reading resolve LJ1–LJ3 plus the S-factor remainder. Subject 30,229 bytes at `21d0693ec78356ba1cc358692891ec5c61a6fc9cf4ec728a180b67266e9ea3f8` is unchanged from the verified correction. Final README 7,038 bytes at `6b4d30e4d7e2a0362493ef20c486273a485922b9ace15ed70b9899a7982ec598` states the actual necessary comparison $r>eS/(2w^2)$ and treats the frozen $e/(2w^2)$ field solely as an upper display. It supplies no necessary $r>199.441$ cutoff or sufficient direction. Subject direction tests, one-sided zero conditions, plane orientation/doubled period and scalar sign proof have their required domains.

Known-first hash/link/KaTeX checks render all 400 subject and 69 final README spans without error, match fourteen accepted binary dependencies and nine frozen instrument/output/reference identities, and retain all first/corrected versions. The independent isqrt/Fraction reference and its original pass remain unchanged; no rerun or history evaluation occurs. The peer reports stopped/owned-compute clear, with wider live census unknown.

Accepted: regular Cartesian/time-period identities, exclusion of uniformly small absolute J, separately weighted nonnegative-J and sign-free mean estimates, bounded-separation exclusion through 139.229 at speed .1 and 5110.7 at .05, and the actual zero-rate formula with correctly scoped sufficient direction tests. The scalar D proof is valid on its stated exterior intervals; its transition gap and coefficient optimality remain open. None assumes mirror symmetry, a constant common velocity or a conserved quantity. The relative-return chart uses an orientation-preserving plane rotation or doubled period.

The mean/correlation and separation statements supply no upper separation bound, unconditional radial-travel control, actual repeating solution or general-periodicity exclusion. Wide, slowly turning recurrence, actual common-motion correlations K1/K2, in-band and flat-zero behavior remain open science rather than unresolved review. Both prior stages retain their accepted scope and frozen evidence. All three operator-selected stages are now resolved at bounded research-and-review scope; no further science is assigned by this disposition.

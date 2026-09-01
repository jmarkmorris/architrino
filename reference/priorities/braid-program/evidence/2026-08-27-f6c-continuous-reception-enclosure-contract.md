# asymmetric counter-breathing representative Continuous-Reception Enclosure Contract

Status: conditional mathematical artifact, pending independent review, 2026-08-27. No asymmetric counter-breathing representative continuous-reception premise is certified here, no measurement is performed, and no execution is authorized.

## Scope And Existing Consumer

**Claim grade: derived, conditional.** This document proves a finite-history route from uniformly bounded, continuously differentiable member paths to complete causal-root coverage and outward acceleration bounds over a whole reception-time interval. Its direct consumer is the existing [asymmetric counter-breathing representative normalized member-acceleration predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md), which supplies `M05` and `M06` to the [frozen metric normalization](../candidate-weighted-score-packet.md#frozen-metric-normalization). It does not amend either metric, the refinement ladder, or the stopping rules.

Plainly: the missing capability is to bound the law between evaluation times, not just at selected times. The theorem below describes sufficient conditions for that capability; it does not report that the selected asymmetric counter-breathing representative history meets them.

We work in normalized wake-speed units with $c_f=1$. The derivation uses only the $\mathbb{A}\mathbb{A}\mathbb{A}$ delayed-history residual and sharp acceleration expression implemented by the frozen references. It imports no observer-level physical law. The retained domain is $[T_{\min},T_{\max}]=[-8,0.13]$, and the measurement domain is $I=[0,0.13]$. Completeness below always means completeness inside this finite retained domain, never absence of contributions from an unretained earlier past.

Plainly: the wake travels one distance unit per time unit. Every statement is limited to the saved history; it says nothing about history earlier than its oldest saved point.

## Frozen Subject And Reference Boundary

The subject remains the refined Stage B record identified by the [durable manifest](2026-08-27-f6c-refined-stage-b-manifest.json) and [durable summary](2026-08-27-f6c-refined-stage-b-summary.json). Their SHA-256 digests are, respectively, `cbd4fa5392298c3fb72a86c247daa0081f33aa6b39f2982ef5348ca0cd50830b` and `9e053c214e2d09544a488957dde7d59de40ee15937b8c056ef7d56d24eb40d3d`. The [data-export handoff](2026-08-27-braid-search-launch-readiness.md#bp-010-reference-blocker) binds `.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json` at SHA-256 `f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1`. This is a provenance reference, not a new data-validation result from this document.

Plainly: the theorem is attached to the already preserved calculation and its separately checked export. It neither substitutes another asymmetric counter-breathing representative geometry nor repeats the export check as if it were new evidence.

The export preserves eight labeled paths, each with 1,600 prehistory segments and 160 evolved segments, totaling 14,080 segments. Its 648 accepted-frame rows represent 81 eight-member frames and therefore 80 adjacent accepted-frame intervals. The path-key order is `(1,2,3,4,5,6,7,8)` with labels `(0+,0-,1+,1-,2+,2-,3+,3-)`. Original coefficient, endpoint, per-axis error, scalar error, and polarity tokens remain authoritative. In particular, the recorded polarity magnitudes are the decimal literal `0.1666666666666666666666666666666667`, not an exact replacement by $1/6$, and the coupling is the literal `10.304229970992187`.

Plainly: the law-side history has 160 evolved pieces per member, while the independent curvature calculation has 80 frame-to-frame pieces. Those are different records with different jobs; neither may silently replace the other.

The unchanged reference generation is:

| Owner | SHA-256 | Existing obligation |
| --- | --- | --- |
| [certified_acceleration.py](../../../../scripts/eom/oracle/certified_acceleration.py) | `62787f1bb0d14329c0ad1f3586ef1f1cbeb666fe8c11f8831f7ad761d7c42b83` | Directed acceleration reconstruction from certified roots at one reception time |
| [reference_kernel.py](../../../../scripts/eom/oracle/reference_kernel.py) | `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6` | Independently authored delayed residual, normal factors, and sharp expression |
| [certified_history.py](../../../../scripts/eom/oracle/certified_history.py) | `ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7` | Polynomial position/velocity intervals and scalar-reception root certification |
| [decimal_interval.py](../../../../scripts/eom/oracle/decimal_interval.py) | `fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a` | Directed decimal interval arithmetic |

Plainly: these hashes identify the exact mathematical instruments being extended in scope, not edited. Their present interfaces prove results at one receiver time; the new argument must supply the missing whole-interval reasoning.

`certify_causal_roots` takes a scalar `reception_time`. In `certified_acceleration.py`, `_geometry` likewise fixes the receiver time, although `_history_state_over` can split and enclose a transmitter interval across stored pieces. `PiecewisePolynomialHistory.state_interval` itself requires a single piece. A future thin interval consumer must split every receiver and transmitter interval at all relevant stored boundaries and enclose the union. It must not label a collection of scalar certificates as a continuous-reception certificate, fabricate a scalar certificate for an interval, or bypass the present scalar certificate's preconditions.

Plainly: the existing arithmetic can bound polynomial pieces, but its current root certificate does not cover a moving receiver. A wrapper must prove that additional coverage explicitly.

## Conditional History Premises

For each member $i$, let $\mathbf X_i:[T_{\min},T_{\max}]\to\mathbb R^3$ be one continuously differentiable position history, with $\mathbf V_i=\mathbf X_i'$. At every time, the same position history and its derivative must lie inside the original position and velocity error enclosures of every applicable stored segment. At a shared endpoint this means satisfying both adjacent segments. Labels, polarity, and ownership are fixed throughout. An admissible family means all such jointly compatible histories; its nonemptiness and the represented subject's membership are separate required premises.

Plainly: position and velocity must belong to one actual path, not to unrelated choices from two boxes. Even finding one mathematically possible path inside the boxes would not by itself show that it is the solver's represented path or a solution of the law.

For a closed reception cell $I_r=[a_r,b_r]\subset I$, assume the following bounds hold for those same histories, uniformly over the stated domains:

1. **Common history:** the preceding globally $C^1$ histories exist and the subject being enclosed belongs to that family. Here $C^1$ means that position has a continuous first derivative.
2. **Sub-field speed:** for each member $j$, $\lVert\mathbf V_j(T)\rVert\le V_{j,\max}<1$ throughout $[T_{\min},b_r]$; $V_{j,\max}$ is a fixed bound, not a sampled maximum.
3. **Nonself clearance:** for each $i\ne j$, $\lVert\mathbf X_i(T_r)-\mathbf X_j(T_r)\rVert\ge\delta_{ij}>0$ for every $T_r\in I_r$.
4. **Oldest-boundary sign:** the delayed residual defined below has a strictly negative uniform upper bound at $T_t=T_{\min}$ for each nonself pair and every $T_r\in I_r$.
5. **Faithful enclosure:** every numerical bound used below contains the exact original-decimal histories and uncertainties, with directed arithmetic at the predeclared 90-decimal-digit precision, complete time/segment coverage, and no omitted member or pair.

Plainly: these conditions require a coherent saved path, speeds below the wake speed, separation of distinct members, a causal crossing inside the saved past, and reliable arithmetic over every time in the interval. None can be established by checking a few frames alone.

**Application status: all five premises remain unverified for asymmetric counter-breathing representative in this artifact.** The exact join tests in `PiecewisePolynomialHistory.from_segments` admit overlapping endpoint position and velocity envelopes. They do not prove that a single globally $C^1$ path realizes all those envelopes. The export's successful identity and token preservation does not discharge this mathematical existence or subject-membership requirement. A nominal cubic chain with unequal endpoint values cannot simply be declared $C^1$ because the discrepancies are small.

Plainly: a small mismatch is still a mismatch. Error allowances may permit a compatible path, but that compatibility has to be demonstrated without enlarging the allowances.

## Finite-History Root Completeness

Define the delayed residual for receiver $i$, transmitter $j$, reception time $T_r$, and emission time $T_t\le T_r$ by

$$
g_{ij}(T_r,T_t)=\lVert\mathbf X_i(T_r)-\mathbf X_j(T_t)\rVert-(T_r-T_t).
$$

Plainly: the residual compares the receiver-to-emitter distance with the distance a unit-speed wake travels during the delay. A zero is an arrival at the receiver.

For $T_{t,1}<T_{t,2}\le T_r$, the reverse triangle inequality and the integrated speed bound give

$$
\begin{aligned}
g_{ij}(T_r,T_{t,2})-g_{ij}(T_r,T_{t,1})
&\ge (T_{t,2}-T_{t,1})-\lVert\mathbf X_j(T_{t,2})-\mathbf X_j(T_{t,1})\rVert\\
&\ge (1-V_{j,\max})(T_{t,2}-T_{t,1})>0.
\end{aligned}
$$

Plainly: as emission time advances, the wake's available travel distance shrinks faster than the transmitter can move. The residual therefore increases strictly, even at an off-root point where the displacement happens to vanish and differentiating its norm would be invalid.

For $i\ne j$, continuity, the strictly negative oldest-boundary value, and $g_{ij}(T_r,T_r)\ge\delta_{ij}>0$ imply exactly one root $T_{t,ij}(T_r)$ in $(T_{\min},T_r)$. This follows from the intermediate value theorem for existence and strict monotonicity for uniqueness. The retained complement contains no other root, and neither retained boundary is a root. This conclusion holds separately for every $T_r\in I_r$ because its premises are uniform.

Plainly: each distinct-member pair contributes one arrival from the saved past at every receiver time in the cell, not merely at a selected receiver time. The proof does not search or characterize any earlier, unsaved past.

For a self pair, with $T_t<T_r$,

$$
g_{ii}(T_r,T_t)\le -(1-V_{i,\max})(T_r-T_t)<0.
$$

Plainly: a member moving slower than its wake cannot catch a positive-delay wake it emitted itself. The coincident zero-delay endpoint is excluded by the frozen $H(0)=0$ convention, so the self row has no ordinary root; no singular sharp expression is evaluated at that endpoint.

## Root Transport And Positive Delay

At the unique nonself root, let $R_{ij}=T_r-T_{t,ij}(T_r)>0$, let $\widehat{\mathbf r}_{ij}=(\mathbf X_i(T_r)-\mathbf X_j(T_{t,ij}(T_r)))/R_{ij}$, and define the transmitter and receiver normal factors by

$$
D_{t,ij}=1-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(T_{t,ij}(T_r)),\qquad
D_{r,ij}=1-\widehat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r).
$$

Plainly: the positive delay is also the arrival distance. The two normal factors compare the wake speed with each member's velocity projected along that arrival direction; the transmitter factor controls the sharp acceleration weight, while their ratio describes how emission time changes with receiver time.

The unit direction and the speed bounds imply $D_{t,ij}\in[1-V_{j,\max},1+V_{j,\max}]$ and $D_{r,ij}\in[1-V_{i,\max},1+V_{i,\max}]$. The residual is continuously differentiable near a root because its distance is nonzero, and its emission derivative is $D_{t,ij}>0$. The implicit function theorem therefore gives

$$
\frac{dT_{t,ij}}{dT_r}=\frac{D_{r,ij}}{D_{t,ij}},\qquad
0<\frac{1-V_{i,\max}}{1+V_{j,\max}}
\le\frac{dT_{t,ij}}{dT_r}
\le\frac{1+V_{i,\max}}{1-V_{j,\max}}.
$$

Plainly: the emission time moves continuously forward as the receiver time moves forward, with a bounded rate. Local root curves agree wherever they meet because the root is unique, so they form one curve across the reception cell; endpoint derivatives are understood from inside the cell.

Same-time clearance also bounds the positive delay away from zero:

$$
\begin{aligned}
\delta_{ij}
&\le\lVert\mathbf X_i(T_r)-\mathbf X_j(T_r)\rVert\\
&\le R_{ij}+\lVert\mathbf X_j(T_{t,ij}(T_r))-\mathbf X_j(T_r)\rVert
\le(1+V_{j,\max})R_{ij},\\
R_{ij}&\ge\frac{\delta_{ij}}{1+V_{j,\max}}>0.
\end{aligned}
$$

Plainly: a separated receiver and transmitter cannot produce an arbitrarily small delay while the transmitter remains slower than the wake. This permits separated receiver/emitter time boxes in a sufficiently fine exact covering, but does not promise that finite-precision interval evaluation will certify those boxes within the predeclared resource limit.

## Uniform Root Boxes, Not Scalar Samples

Choose an emission interval $I_t=[a_t,b_t]$ with $T_{\min}\le a_t<b_t<a_r$. An interval evaluation of $g_{ij}(I_r,\{a_t\})$ must include every receiver time in $I_r$ at the fixed lower emission face; similarly for the upper face. Accept a root box only if the directed bounds prove

$$
\sup g_{ij}(I_r,\{a_t\})<0,\qquad
\inf g_{ij}(I_r,\{b_t\})>0.
$$

Plainly: the entire lower face must lie before the arrival and the entire upper face after it. Endpoint samples in receiver time do not establish either statement. Together with the monotonicity proof, these strict signs place exactly one root inside the emission interval for every receiver time in the cell.

A scalar certificate or the root-transport estimate may propose a box, but neither substitutes for its uniform justification. A complete covering must include every reception cell, all 56 ordered nonself pairs, and all eight self exclusions. Subdivision at a stored segment boundary retains the same root identity; it does not create an additional arrival. No uncovered time sliver, unresolved face, or retained-boundary contact is counted as a pass. Speed, clearance, oldest-boundary, and face bounds must apply to the same admissible histories and exact source generation.

Plainly: the pair count is 64 ordered receiver/transmitter combinations, including the eight explicitly empty self cases. Saving many correct point results still leaves a gap unless every intervening receiver time is covered.

## Outward Sharp Acceleration Enclosure

For a certified nonself box, let $\mathcal X_i(I_r)$ and $\mathcal V_i(I_r)$ enclose the receiver's position and velocity, and define the corresponding transmitter boxes on $I_t$. These are componentwise boxes: each coordinate lies between its stated endpoints. Form them by directed polynomial evaluation on every intersected original segment, including its original error bounds, then take the componentwise interval hull of the pieces. A scalar error maximum may be used only as an outward enlargement of the preserved per-axis bounds, never as a replacement for their source identity.

Plainly: the enclosure keeps every possible coordinate value from every saved piece touched by the time interval. Taking the smallest box containing those pieces can lose sharpness, but cannot omit a permitted value.

At the roots inside the box, define

$$
\begin{aligned}
\mathcal D_{ij}&=\mathcal X_i(I_r)-\mathcal X_j(I_t),\\
\mathcal R_{ij}&=\operatorname{norm}(\mathcal D_{ij})\cap(I_r-I_t)
\cap\left[\frac{\delta_{ij}}{1+V_{j,\max}},\infty\right),\\
\mathcal N_{ij}&=\mathcal D_{ij}/\mathcal R_{ij},\\
\mathcal D_{t,ij}&=\left(1-\mathcal N_{ij}\cdot\mathcal V_j(I_t)\right)
\cap[1-V_{j,\max},1+V_{j,\max}].
\end{aligned}
$$

Plainly: displacement, distance, direction, and transmitter factor each enclose their values at every enclosed arrival. Intersecting two valid bounds keeps all true root values and may tighten the result. The distance is positive because every emission precedes every reception in this box; any empty intersection is an inconsistency or a failed enclosure, not permission to discard a root.

The distance/delay intersection is valid **only after root coverage has been proved**. Uniform face signs must evaluate the original unrestricted distance-minus-delay residual. Intersecting distance with delay while testing a face would impose the root equation before proving it and invalidate the sign test. The acceleration consumer must additionally verify that the lower endpoint of $\lvert\mathcal D_{t,ij}\rvert$ meets the frozen `transmitter_factor_floor` of `1e-24`; mathematical positivity alone does not establish that implementation threshold.

Plainly: one may use the arrival equation to sharpen values at arrivals, but not to manufacture evidence that an arrival exists. The existing numerical safety floor also remains a separate required check.

Let $\kappa$ be the exact recorded coupling and $q_i,q_j$ the exact recorded signed polarity literals. The unchanged sharp expression and its interval extension are

$$
\mathbf A_{ij}(T_r)
=\frac{\kappa q_iq_j\,[\mathbf X_i(T_r)-\mathbf X_j(T_{t,ij}(T_r))]}{R_{ij}^{3}\lvert D_{t,ij}\rvert},\qquad
\mathbf A_{ij}(T_r)\in\mathcal A_{ij}
:=\frac{\kappa q_iq_j\,\mathcal D_{ij}}{\mathcal R_{ij}^{3}\lvert\mathcal D_{t,ij}\rvert}.
$$

Plainly: the acceleration uses the signed polarity product, the displacement direction, inverse-square distance, and the transmitter-side arrival weight. There is no receiver-factor multiplier. The receiver factor appeared only in the root-transport derivative, not in this frozen acceleration formula.

Every exact root value lies in the corresponding input box; the denominators are separated from zero; and directed interval addition, multiplication, division, norm, and intersection preserve inclusion. This proves the stated acceleration enclosure, even though treating correlated quantities as independent intervals can widen it. Summing the seven nonself boxes gives each member's total $\mathcal A_i=\sum_{j\ne i}\mathcal A_{ij}$; the self contribution is the separately proved empty-root zero. The 64-row ownership record remains explicit. This argument applies to the sharp expression only, not a softened core or finite-width replacement.

Plainly: ordinary interval arithmetic may overestimate the answer, but it cannot miss a permitted sharp acceleration when its inputs and denominators are certified. All seven distinct-member contributions must be included for each receiver; cancellation across different receivers cannot replace their individual results.

## Existing RMS And Peak Consumer

Let $\mathbf H_i$ denote the unique Cartesian cubic Hermite interpolant on each adjacent accepted-frame interval, fixed by that interval's two exported endpoint positions and rates. The predeclared history-required acceleration is its analytically differentiated $\mathbf H_i''$ on that interval. This construction is independent of the stored law-side cubic chain. This artifact does not assert that $\mathbf H_i$ equals any admissible retained-history path, replace the stored chain with $\mathbf H_i$, or certify their representation agreement. The predeclaration owns their distinct roles in the comparison; any additional identification requires its own justification, not a notation change here.

Plainly: the left side of the comparison comes from differentiating the saved frame-to-frame geometry, while the right side reevaluates the law from the saved delayed history. This theorem supplies bounds for the latter; it does not silently reconcile differences between the two representations.

On a reception cell lying within one accepted-frame interval, enclose the Hermite second derivative analytically and form the normalized residual box

$$
\mathcal B_i(I_r)=L_0\left(\mathcal H_i''(I_r)-\mathcal A_i(I_r)\right),\qquad
L_0=0.5320012303229503.
$$

Plainly: the residual box contains the difference between the independently reconstructed required acceleration and every law-side acceleration allowed by the retained-history bounds, scaled by the unchanged release ruler. A cell crossing a frame knot is split before differentiating the appropriate Hermite pieces.

Let $Q_i(I_r)$ enclose the squared Euclidean norm of that residual box, using directed squares and sums and a nonnegative lower bound. The existing dimensionless-time normalization reduces, after the change of variable $T_r=T_0\widehat t$, to

$$
R_{\mathrm{RMS}}^2=\frac{1}{8(0.13)}\sum_{i=1}^{8}\int_0^{0.13}\lVert\mathbf r_i(T_r)\rVert^2\,dT_r,\qquad
\int_{a_r}^{b_r}\lVert\mathbf r_i(T_r)\rVert^2\,dT_r\in(b_r-a_r)Q_i(I_r).
$$

Plainly: changing clocks cancels the same clock factor from the integral and its averaging interval, so the metric is unchanged. Multiplying a whole-cell squared-residual bound by the cell duration gives a rigorous integral enclosure; summing the cells and taking an outward square root encloses RMS.

This range bound is a rigorous enclosure available to the predeclared interval Gauss--Kronrod method, not authorization to replace that method or its resource rule. A difference between two point-quadrature estimates alone is not a proven remainder. A future consumer must show how its quadrature enclosure contains the true integral, for example by a validated remainder bounded using the whole-cell range. It may not assume unproved high derivatives across stored or accepted-frame knots. The bound above remains valid without such derivatives.

Plainly: agreement between two numerical estimates does not bound what happened between their sample times. The whole-cell enclosure provides the missing rigorous check, although it may be too wide to meet the requested accuracy.

For a fixed interpretation of the peak at frame knots, an upper bound is the maximum of the norm upper bounds over all members and all covered cells. A lower bound can come from any independently enclosed point value's norm lower bound; that point is only a witness for the lower bound, never coverage for the upper bound. The existing $10^{-6}$ enclosure widths, 20 subdivisions per accepted-frame interval, and three-rung agreement rule remain unchanged. Stored uncertainty may leave a nonzero width even as cells shrink, so neither successful convergence nor a cost bound follows from this theorem.

Plainly: an observed large value can prove the peak is at least that large, but only complete interval coverage can prove it is no larger elsewhere. If the boxes cannot become tight enough under the existing limits, the measurement remains unavailable.

### Proposed Knot Interpretation — Pending Review

An accepted-frame Hermite chain is $C^1$ when the same saved endpoint values and rates are shared, but its second derivative need not agree across a frame knot. The proposed precise interpretation is to take the peak over the closure of every individual accepted-frame interval, including both one-sided second-derivative limits at a shared knot. This equals the supremum over the interiors of the finitely many pieces together with the outer endpoint limits. It does not average the two limits or select an arbitrary side. Finite knot-value choices do not change the RMS integral.

Plainly: two neighboring fitted curves can meet with the same position and velocity but different curvature. For the peak, the proposal counts both limiting curvatures; for the integral, changing values at finitely many isolated times contributes no area.

**Claim grade: proposed interpretation, not an accepted amendment.** Independent review must resolve this convention against the existing `M05/M06` owner before a peak measurement adopts it. This document leaves the predeclaration and both metric definitions untouched. It makes no claim about a physical impulse at an interpolation knot.

Plainly: the curvature convention is exposed for a decision, not silently baked into a reported score.

## Smallest Next Proof Artifact

Before constructing a measurement instrument, first test the exact export against necessary common-history compatibility conditions and the proposed whole-history speed and clearance bounds. A certified contradiction can stop this route early; an inconclusive interval bound does not prove that the underlying history violates it. This preliminary inspection does not itself supply global compatibility, subject membership, roots, or acceleration measurements.

Plainly: check whether the saved data can support the proposed proof before building the machinery that would use it. A definite inconsistency and a bound that is merely too loose must be reported differently.

The next concrete artifact is a source-bound **global $C^1$ retained-history compatibility proof for the eight exported paths**, using the unchanged original per-axis and scalar error tokens. A sufficient constructive route would exhibit common endpoint positions and derivatives plus explicit within-segment correction polynomials, and prove that each corrected position and its derivative remain inside every corresponding original enclosure over the whole segment. Shared endpoint variables must satisfy both adjacent pieces, including the prehistory/evolved join. Another proof of the same existence and enclosure statement is acceptable; local endpoint overlap alone is not.

Plainly: the immediate mathematical task is to connect all saved pieces into coherent paths without spending more error allowance than the record actually contains. A feasible construction proves compatibility, not that the constructed path obeys the equation of motion.

The proof must also distinguish a nonempty admissible family from evidence that the represented subject lies in it. If the export's uncertainty semantics cannot supply that membership premise, the claim remains conditional and the measurement does not acquire trajectory authority. Uniform speed, clearance, and boundary-sign calculations may be developed as conditional box facts, but they do not replace this missing common-history premise. After compatibility and membership are established at the required grade, the next bounded calculation is the uniform guard and root-box covering on this exact history, followed by the existing residual consumer; no new candidate gate or general solver framework is proposed.

Plainly: a path that fits the boxes is not automatically the path the original calculation represented. The evidence must say what those boxes guarantee before using them to certify that calculation.

## Falsifiers And Fail-Closed Boundaries

- **Conditional theorem falsifier:** exhibit histories satisfying all stated common-history, uniform-speed, clearance, and strict boundary premises but having a missing or additional retained nonself root, a positive-delay self root, a root-transport derivative outside the derived bounds, or an exact sharp acceleration outside a faithfully constructed interval box.
- **Application rejection or unresolved premise:** incompatible original position/velocity constraints, unproved subject membership, a speed upper bound reaching one, unproved positive clearance, a non-strict retained-boundary or face bound, an empty interval intersection, a factor bound below the frozen floor, missing time/segment/pair coverage, or an identity/hash mismatch. A loose speed bound reaching one is failure to prove the premise, not evidence that the subject actually exceeds the wake speed.
- **Measurement failure:** inability to reach the predeclared RMS or peak enclosure width, incomplete rung coverage, or unreviewed knot semantics leaves the affected metric unavailable. It is not a zero residual, favorable score, or a negative result about the entire asymmetric counter-breathing representative geometry family.

Plainly: a true counterexample would refute the conditional mathematics. Most practical failures instead mean the supplied record or instrument has not met its premises; they must remain visible as missing evidence.

No claim is made here about retained braid, equilibrium, binding, stability, return, complete infinite-past history, physical realization, particle identity, recovery of observer-level physics, general EOM solver correctness, or a measured runtime. The frozen references, geometry, predeclaration, scores, and candidate status are unchanged.

Closure goal: independently review this finite-history conditional theorem, then establish global retained-path compatibility and subject membership before attempting uniform asymmetric counter-breathing representative acceleration measurement.

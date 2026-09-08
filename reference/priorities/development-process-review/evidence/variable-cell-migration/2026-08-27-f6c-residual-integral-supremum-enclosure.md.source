# F6c Residual Integral and Supremum Enclosure

Status: definition and conditional proof, pending independent review, 2026-08-27. No software, numerical evaluation, execution plan, metric or score is supplied by this artifact.

## Scope and unchanged consumer

**Claim grade: derived, conditional.** Complete whole-cell bounds on the eight members' squared acceleration residuals imply enclosures of their integrals, normalized RMS and peak. An exact polynomial subtraction also gives a derivative-free remainder identity for a later validated interval Gauss–Kronrod calculation. The direct consumer is the existing [normalized member-acceleration predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md), whose quadrature method, global enclosure-width threshold, subdivision allowance, three-rung requirement and historical subject remain unchanged. This is a mathematical component of that existing obligation, not another gate or ledger.

Plainly: the proof explains how bounds valid between sample times can bound the full average and maximum. It does not calculate those quantities or replace the measurement recipe.

The [continuous-reception enclosure contract](2026-08-27-f6c-continuous-reception-enclosure-contract.md), SHA-256 `f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68`, owns finite-retained-history root completeness and the sharp acceleration enclosure. The [accepted-frame reconstruction](2026-08-27-f6c-accepted-frame-history-reconstruction.md) owns the fixed future and anchored-past family. The [refined-cover projection](2026-08-27-f6c-refined-cover-acceleration-projection.md), SHA-256 `c491ada9b781d7aedf20a9f49b0a2dca92f4f5985660c1de56b83686976aab9d`, preserves the same family and numerical literals when using pair-specific emission intervals. The member predeclaration remains at SHA-256 `c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853`.

Plainly: the input is the already defined residual of the already defined family. This document does not alter the histories, uncertainty allowances, root law or normalization.

The unchanged [range reference](../../../../scripts/eom/oracle/continuous_reception_acceleration.py), SHA-256 `abfc21f29d8bdd984118b1e0ba0cb62b88a081a75a961052eb11f31ea7bdd7b8`, returns each member's residual vector and nonnegative `squared_norm` interval for one complete positive-width reception cell. Its [independent comparison](../../../../scripts/eom/verify-f6c-continuous-reception-acceleration.py), SHA-256 `cc26f5a45d0e09a472e3066d0d62ae8192492a7c3e0ab18a3658781a0274b299`, and [refined projection core](../../../../scripts/eom/oracle/f6c_refined_acceleration_conformance.py), SHA-256 `63db48f604d0b1abdf61f0efcb3894feac9d30a25af26a4d96f01bda6522e2a2`, remain unchanged. These references provide cell-range inputs, not the integral or supremum implementation described here. Their source, premise and execution claims do not become true merely through aggregation.

Plainly: a mathematical result can be used as input without promoting its authority. The future consumer still has to authenticate the actual records and their complete coverage.

## Fixed family and piecewise residual

We work in normalized wake-speed units with $c_f=1$, in absolute time $T$ and the Euclidean void. Put $B=0.13$ for the measurement duration. The original 81 accepted-frame times are denoted by $0=F_0<F_1<\cdots<F_{80}=B$; they are the exact original decimal values, not a generated uniform grid. Their 80 adjacent frame intervals are distinct from the 160 original evolved-history cells. On frame $n$, $\mathbf H_{i,n}$ is the unique Cartesian cubic fixed by member $i$'s two original endpoint positions and rates. At a shared frame endpoint the saved position and rate are common; the second derivatives need not agree. Indices $i=1,\ldots,8$ retain the exact label order `(0+,0-,1+,1-,2+,2-,3+,3-)` and path keys `(1,2,3,4,5,6,7,8)`.

Plainly: the future interpolation uses the saved frame boundaries and all eight persistent identities. A stored-history cell is not a new frame, and a curvature from one frame cannot be used on its neighbor.

Let $\mathcal F_H$ be the nonempty family of globally $C^1$ histories obtained by joining every admissible anchored past to the fixed accepted-frame future $\mathbf H$. Here $C^1$ means that position and its first derivative are continuous. All histories lie within the original position and velocity allowances; no particular past is selected. Assume the unchanged uniform-speed, clearance, finite-history root-completeness and strict-denominator premises for this same family on the retained domain $[-8,B]$. The coupling is the original literal `10.304229970992187`, signed polarity magnitudes are `0.1666666666666666666666666666666667`, and the ruler is $L_0=0.5320012303229503$. No literal is replaced by a nearby exact fraction or a different candidate's value.

Plainly: the proof covers every permitted anchored past with the same fixed future. It assumes the existing root and enclosure premises; it does not establish them again or identify that family with the historical EOM trajectory.

For $X\in\mathcal F_H$, write $\mathbf A_i(T;X)$ for the complete finite-history sharp acceleration from the unchanged law, including all seven nonself contributions and the independently excluded self-root zero. Define the frame-specific residual $\boldsymbol\rho_{i,n}$ and its squared norm $f_{i,n}$ by

$$
\boldsymbol\rho_{i,n}(T;X)
=L_0\left(\mathbf H_{i,n}''(T)-\mathbf A_i(T;X)\right),
\qquad
f_{i,n}(T;X)=\|\boldsymbol\rho_{i,n}(T;X)\|^2
\quad (F_n\le T\le F_{n+1})
$$

Plainly: the squared residual is the nonnegative squared size of the difference between required curvature and law-side acceleration, in the unchanged dimensionless units. It is a member-level quantity; cancellation between different members cannot reduce it.

The root theorem makes each ordinary root continuous in reception time, and the sharp expression is continuous where its distance and transmitter-factor denominators stay positive. Hence $\mathbf A_i(\cdot;X)$ is continuous for each fixed $X$. On each closed frame, $\mathbf H_{i,n}''$ is affine, so $f_{i,n}(\cdot;X)$ is continuous, bounded and integrable. This requires no higher derivative of the admissible past. At a frame knot, the two frame-specific values mean their respective one-sided limits, not an averaged or arbitrarily assigned value.

Plainly: each piece has an ordinary area and a maximum. Different limiting curvatures at a join do not create an impulse, and no smoothness beyond the stated histories is assumed.

## Exact coverage and input obligations

For each original frame $n$, let $\mathcal P_n$ be a finite ordered partition into positive-width closed cells $J=[a_J,b_J]$. Its endpoints are exact rationals interpreted from original time tokens or explicitly declared derived subdivisions. The first endpoint is $F_n$, the last is $F_{n+1}$, and each cell's upper endpoint equals the next cell's lower endpoint exactly. Cell interiors are disjoint, and their union is the entire frame. Shared endpoints are covered on both sides; there is no duplicate positive-duration cell, hole, omitted singleton boundary or cell crossing an original frame knot. This defines a possible mathematical partition, not permission to generate subdivisions.

Plainly: every instant is accounted for, and no time interval is counted twice. Keeping a shared endpoint in both neighboring closed cells adds no duration to an integral and preserves both limits for the peak.

Every cell has exactly eight squared-residual bounds in the fixed member order, each attached to its original frame, family, normalization and authenticated source generation. A missing member, extra or repeated cell, changed time token, mismatched frame side or mixed source generation invalidates the complete-partition premise. If independently produced member partitions differ, a common exact refinement can describe the proof, but every inherited or recomputed bound must remain valid on its declared subset and any executable refinement must obey its separately settled allowance. A shorter input prefix can support only a labeled partial-domain enclosure, never a full-horizon result with missing contributions set to zero.

Plainly: bounds from different histories or different frame sides cannot be combined just because their interval endpoints look similar. A complete result requires complete, consistently identified input.

For each $i,n,J$, assume finite exact endpoints satisfying

$$
Q_{iJ}=[\ell_{iJ},u_{iJ}],
\qquad
0\le\ell_{iJ}\le u_{iJ},
\qquad
f_{i,n}(T;X)\in Q_{iJ}
\quad\text{for every }X\in\mathcal F_H\text{ and every }T\in J
$$

Plainly: each interval must contain that member's squared residual throughout its whole cell, for every history in the same family. A collection of point samples does not provide this premise. Zero and equal endpoints are permitted; reversed, nonfinite or negative squared-norm endpoints are not valid inputs here.

The original history and root-piece coverage obligations remain upstream: all relevant closed intersections, including knot singletons, all 56 ordered nonself pairs and eight self exclusions, strict denominator bounds, and no unsupported reuse of a different pair's emission interval. The integral partition does not replace those records. Parent-cell bounds may be inherited by a contained reception cell because a universal statement remains true on a subset; this alone does not tighten a bound or authorize new source records.

Plainly: dividing the measurement interval cannot repair a missing root or create more accurate input. The same source and mathematical obligations follow every smaller interval.

## Complete integral and RMS enclosure

Define each member's integrated squared residual $S_i(X)$ and the total $S(X)$ by

$$
S_i(X)=\sum_{n=0}^{79}\int_{F_n}^{F_{n+1}} f_{i,n}(T;X)\,dT,
\qquad
S(X)=\sum_{i=1}^{8}S_i(X)
$$

Plainly: integration first measures each member's squared mismatch over the full duration, then the eight nonnegative contributions are added. Isolated frame endpoints have zero duration and are not extra integral terms.

For $h_J=b_J-a_J>0$, define the cell enclosure $\mathcal I^{\rm range}_{iJ}=h_JQ_{iJ}$ and sum intervals by adding their lower endpoints and their upper endpoints. Then

$$
\mathcal S_i=\sum_{n=0}^{79}\sum_{J\in\mathcal P_n}h_JQ_{iJ},
\qquad
\mathcal S=\sum_{i=1}^{8}\mathcal S_i=[S_-,S_+],
\qquad
S_i(X)\in\mathcal S_i,\quad S(X)\in\mathcal S
$$

Plainly: duration times a whole-cell value bound encloses the area on that cell. Adding all such areas gives the integrated residual bounds; their endpoints need not be attainable together for the enclosure to be valid.

**Proof.** Fix any one $X\in\mathcal F_H$. On each cell, integrating $\ell_{iJ}\le f_{i,n}(T;X)\le u_{iJ}$ gives $h_J\ell_{iJ}\le\int_J f_{i,n}\le h_Ju_{iJ}$. Exact partition additivity and the finite member sum prove the stated inclusions. Since $X$ was arbitrary, both conclusions hold for every member of the family. No exchange of an integral with an optimization over histories is made.

Plainly: the argument holds for one coherent history at a time and then for all of them. Treating different cells independently can widen the final interval but cannot exclude a permitted history's value.

The unchanged clock is $T_0=L_0$ and the dimensionless duration is $\Delta\widehat t=B/T_0$. Changing variables in the predeclared RMS integral gives

$$
R_{\rm RMS}(X)^2
=\frac{1}{8(B/T_0)}\sum_i\frac{1}{T_0}
\sum_n\int_{F_n}^{F_{n+1}}f_{i,n}(T;X)\,dT
=\frac{S(X)}{8B}
$$

Plainly: the clock conversion divides both the integral and the averaging duration by the same factor, so it cancels. The ruler is already present inside the residual and is not applied again.

Nonnegativity and monotonicity of the square root therefore give the full-horizon enclosure

$$
\mathcal R_{\rm RMS}
=\left[\sqrt{\frac{S_-}{8B}},\sqrt{\frac{S_+}{8B}}\right],
\qquad
R_{\rm RMS}(X)\in\mathcal R_{\rm RMS}
\quad(X\in\mathcal F_H)
$$

Plainly: take the square root only after adding all eight members' integrated squared residuals and dividing by the full averaging duration. Replacing $B=0.13$ by the duration of cell zero would define another diagnostic, not this RMS.

## Peak enclosure and optional lower witnesses

Define the same predeclared peak using frame-specific closed pieces:

$$
R_{\rm peak}(X)
=\max_{1\le i\le8}\max_{0\le n<80}
\max_{T\in[F_n,F_{n+1}]}\sqrt{f_{i,n}(T;X)}
$$

Plainly: the peak is the largest residual magnitude of any member anywhere in the interval. Both limits at an internal frame knot are retained, and only the inward limit is used at each outer endpoint.

For each fixed history, continuity on each closed frame implies that this maximum equals the supremum over the open frame interiors with their endpoint limits. It also equals the essential supremum, which ignores sets of zero duration: values arbitrarily near a positive maximum occur on a positive-length part of at least one frame; the identically zero case is immediate. This is the already resolved [peak-evaluation convention](2026-08-27-braid-search-launch-readiness.md#bp-010-reference-blocker), not a new convention. Arbitrary isolated spikes would change a pointwise supremum and are outside the defined residual. Physical impulses are likewise outside these continuous law-side and piecewise classical-curvature hypotheses.

Plainly: an endpoint maximum is approached from within its frame, so including its limit does not add a hidden event. Assigning an unrelated value at a knot would change the object being measured.

Set the uniform lower bound $P_-$ and complete-cover upper bound $P_+$ to

$$
P_-=\max_{i,n,J\in\mathcal P_n}\sqrt{\ell_{iJ}},
\qquad
P_+=\max_{i,n,J\in\mathcal P_n}\sqrt{u_{iJ}}
$$

Plainly: every cell's lower endpoint is valid everywhere on that nonempty cell and therefore supplies a lower bound on the global peak. The maximum of all upper endpoints covers the peak everywhere. A zero lower bound is valid but need not be informative.

Optionally, a lower witness names an exact member, original frame side and time $T_w$ in that frame and supplies a proved bound $0\le w_-\le f_{i,n}(T_w;X)$ for every $X\in\mathcal F_H$. Replacing $P_-$ by the maximum of itself and all $\sqrt{w_-}$ preserves

$$
R_{\rm peak}(X)\in[P_-,P_+]
\quad\text{for every }X\in\mathcal F_H
$$

Plainly: one correctly bounded time can raise the lower bound on the peak, but cannot provide its upper bound. A value known only for one selected past does not bound every past; it cannot serve as this uniform witness. No point-evaluation API is created or authorized by this mathematical option.

**Proof and branch-and-bound invariant.** For any fixed $X$, each cell is nonempty, so its uniform lower bound is no greater than the peak; each witness bounds an actual piece value for that same $X$. Complete coverage bounds every piece value above by $P_+$. Consequently a cell whose norm upper bound is at most an already established uniform global lower bound cannot raise the global peak bound and need not receive further peak refinement. Its existing coverage and upper bound must remain in the complete record; marking it inactive for further refinement is not omission or replacement by zero. Splitting a cell preserves the argument only when the children cover it exactly and their bounds are valid for the same history family.

Plainly: a search may stop refining a region that is already proved unable to exceed the established lower bound. It must keep the proof covering that region, and it cannot discard a region merely because sampled values look small.

## Polynomial subtraction and a rigorous remainder

Fix one member, original frame and integration cell $J=[a,b]$; suppress their indices and write $f(T;X)$ for its squared residual. Choose any fixed finite polynomial $p(T)=\sum_{m=0}^{d}c_m(T-a)^m$ with exact rational coefficients $c_m$ and nonnegative integer degree bound $d$. It is an auxiliary approximation to the scalar integrand, not a replacement path or law. It may be selected from previously available information, but once used, its coefficients and all subsequent bounds must refer to that one polynomial for every history being enclosed. Its exact integral is

$$
I_p=\int_a^b p(T)\,dT
=\sum_{m=0}^{d}\frac{c_m(b-a)^{m+1}}{m+1}
$$

Plainly: a finite polynomial has an exactly calculable area. Its degree and coefficients are not chosen here, and its use does not approximate or modify the accepted-frame curve.

Let $\mathcal C_J$ be any finite exact positive-width partition of $J$. Suppose each interval $E_C$ encloses $f(T;X)-p(T)$ for every $T\in C$ and every $X\in\mathcal F_H$. These residual bounds may be obtained without derivatives: if $Q_C$ encloses $f$ and $\mathcal P_C$ encloses the exact polynomial over $C$, then $E_C=Q_C-\mathcal P_C$ is valid by interval subtraction. The difference can have either sign. A tighter construction requires its own inclusion proof, not sampled agreement. Then

$$
\int_J f(T;X)\,dT
=I_p+\sum_{C\in\mathcal C_J}\int_C\bigl(f(T;X)-p(T)\bigr)\,dT
\in\mathcal I^{\rm sur}:=I_p+\sum_{C\in\mathcal C_J}|C|E_C
$$

Plainly: subtract the same polynomial everywhere, bound the remaining error throughout every subinterval, and add its exact area back. This proves an integral enclosure without assuming any second or higher derivative of the residual function.

The identity follows from linearity and exact partition additivity. Integration of the two endpoints of each $E_C$ proves inclusion. Consequently the intersection $\mathcal I^{\rm sur}\cap\mathcal I^{\rm range}\cap[0,\infty)$ is another valid enclosure of this same member-cell integral. An empty intersection is inconsistent input or arithmetic and must fail explicitly; it is not a zero integral, permission to drop the cell, or permission to enlarge a source allowance. Valid refined member-cell integral bounds can replace $h_JQ_{iJ}$ in the finite sums above. Integral-only bounds cannot replace pointwise bounds in the peak calculation.

Plainly: independent bounds on the same area may sharpen each other, but incompatible bounds expose a failure. A small area does not rule out a brief peak.

For the later quadrature connection, let $K_J[g]=\sum_{\alpha=1}^{M}\omega_\alpha g(\xi_\alpha)$ denote any one fixed finite quadrature functional, with exact real nodes $\xi_\alpha\in J$ and exact real weights $\omega_\alpha$. The nodes, weights, number $M$, their numerical enclosures and their association with an actual Gauss–Kronrod rule are not selected here. No positivity or polynomial-exactness property is silently assumed. For this fixed rule, the exact remainder identity is

$$
\int_J f-K_J[f]
=I_p-K_J[p]
+\int_J(f-p)-K_J[f-p]
$$

Plainly: the true quadrature error splits into the known polynomial's quadrature error and the error for the residual after subtraction. The formula is valid even when the rule does not integrate the chosen polynomial exactly.

If independently justified intervals $\mathcal K_f$, $\mathcal K_p$ and $\mathcal K_e$ enclose $K_J[f]$, $K_J[p]$ and $K_J[f-p]$ respectively for every admitted history, the preceding residual bounds give

$$
\mathcal E_K
=I_p-\mathcal K_p
+\sum_{C\in\mathcal C_J}|C|E_C-\mathcal K_e,
\qquad
\int_J f\in\mathcal K_f+\mathcal E_K
$$

Plainly: the interval on the left encloses the quadrature remainder, and adding it to the enclosed quadrature value encloses the true area. Errors in the nodes, weights and node-value bounds must already be included; treating correlated terms independently is safe but can make the result wider.

Only a separately proved exactness property may set $I_p-K_J[p]$ to zero. With uncertain weights, signed interval multiplication must enclose their full products; no positive-weight shortcut is assumed. The intersection of the quadrature-plus-remainder interval, the polynomial-subtraction interval, the whole-cell range interval and nonnegativity remains valid if nonempty. Agreement between a Gauss estimate and a Kronrod estimate does not itself supply any of these remainder premises. The polynomial may improve bounds, leave them unchanged or worsen them; the identities alone promise no improvement.

Plainly: this supplies a valid route for the future quadrature proof, not a numerical rule or an error estimate based only on two agreeing sample formulas.

## Numerical and execution boundaries left unchanged

The proofs use exact interval endpoints, durations, polynomial coefficients, sums and products. A numerical reference must enclose those operations faithfully at the existing 90-decimal-digit precision, including outward square roots and any outward representation of nonrational nodes or weights. Decimal display rounding cannot enter an acceptance comparison as though exact. The global stopping quantities remain the widths of the final RMS and peak intervals, each at most $10^{-6}$; neither squared-RMS width nor one leaf's width is a substitute. Equality at the threshold is permitted by the existing “at most” rule. An input collection can satisfy the inclusion theorem while failing this numerical target.

Plainly: a valid enclosure and a sufficiently narrow enclosure are separate outcomes. The tolerance belongs to the final reported magnitude, not an intermediate sum or selected cell.

The member predeclaration's “20 subdivisions per accepted-frame interval” remains unresolved as an executable counting rule: total split events versus depth, the treatment of mandatory history-knot divisions, and accounting when RMS and peak share work are not settled here. This artifact adopts none of those interpretations and supplies no per-member, per-pair or per-existing-cell reset. It selects no Gauss–Kronrod order, node rule, surrogate degree, scheduling priority or witness policy. Those details belong to a separately reviewed executable protocol before measurement; the conditional inclusions do not depend on choosing them now.

Plainly: the mathematics can be reviewed without silently spending a larger subdivision allowance or choosing another numerical experiment.

The current range API requires positive-width cells; the optional mathematical witnesses and abstract quadrature nodes do not authorize a zero-width call, fabricate a scalar root certificate or add a node-point API. A future method must justify how its actual permitted calls enclose the declared nodes and all intervening times, preserving original frame-side and root-piece coverage. Pure range aggregation is a rigorous bound available to the required interval Gauss–Kronrod method, not permission to replace that method. No existing source, checker, control, resource cap or uncertainty token is changed.

Plainly: a mathematical point in a proof does not create software that can certify that point. The eventual implementation must respect the interfaces it actually has.

Current cell-zero refinement and acceleration records do not supply the other 159 cells' refined acceleration bounds or all 80 accepted-frame integrals. Previously accepted broad root coverage is sufficient as a root-domain premise for a valid range calculation, but does not by itself provide residual ranges or numerical tightness. This theorem neither requires blanket emission refinement of all cells nor authorizes it. It makes no prediction from a one-cell acceleration cost or from a separate emission-refinement cost. The unchanged three-rung EOM/history/root-tolerance ladder and same-generation requirements remain separate from this fixed-family proof.

Plainly: the next full-interval measurement needs complete actual inputs and its own reviewed execution. One useful cell cannot stand in for the rest of the history or for the finer evolution rungs.

The enclosures above mean that each fixed history $X\in\mathcal F_H$ has its own RMS and peak inside the reported common intervals. They do not assert that interval endpoints are attained, that one favorable past works on every cell, or that the historical EOM trajectory belongs to this family with curvature equal to $\mathbf H''$. A wide enclosure does not prove a wide spread of actual family values; nevertheless, genuine variation across allowed pasts can prevent a uniformly narrow enclosure even after time subdivision. No convergence, $10^{-6}$ feasibility, equilibrium, retention, historical-trajectory identity, metric availability, score transfer, H3 promotion or execution authority follows from these conditional inclusions.

Plainly: uncertainty can remain because the family contains different pasts, or simply because interval bounds are conservative. Neither case permits choosing the convenient value or relabeling a family diagnostic as a historical score.

## Acceptance falsifiers and next use

Independent review should reject this theorem if an integrable, piecewise-continuous eight-member residual satisfying the stated uniform cell bounds and exact coverage has an integral, RMS or peak outside the claimed interval; if a valid finite polynomial and residual enclosure violate the subtraction or quadrature-remainder identity; or if the stated peak convention fails for a continuous law-side acceleration and the original piecewise Hermite curvature. Exact constant and polynomial integrands, sign-changing subtraction residuals, zero-width value intervals, frame-side jumps, and a peak attained only as an endpoint limit provide direct independently calculable cases. No executable test is run by this document.

Plainly: a counterexample must satisfy the premises and escape the resulting bound. Ordinary exact integrals and one-sided limits are enough to test the proof independently of the acceleration producer.

A future consumer must instead report invalid or unresolved input for missing members, an incomplete or overlapping positive-duration partition, an incorrect frame side, changed family or normalization, unsupported uniform or nodal bounds, an empty intersection, nonfinite arithmetic, or unverified source identity. Exhausting a settled subdivision allowance without the required global width leaves the measurement unavailable; it is neither a zero residual nor a negative result about every F6c history. Historical metric use still requires the owner’s subject and refinement obligations, not only a passing pure aggregation.

Plainly: failure to prove a measurement is different from proving that a history violates the law. Both outcomes must keep their actual scope.

The next use of this single artifact is independent mathematical review before a separate pure aggregation/remainder reference is authored. A later protocol must settle the currently unspecified algorithm and allowance semantics and independently validate the actual implementation before any measurement. No additional obligation ledger is introduced, and no existing owner is edited by this definition.

Closure goal: independently review the complete-partition integral, RMS, peak and residual-remainder inclusions while preserving the fixed F6c family and all unresolved execution choices.

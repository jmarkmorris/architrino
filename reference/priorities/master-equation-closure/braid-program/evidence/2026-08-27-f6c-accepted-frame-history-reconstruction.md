# asymmetric counter-breathing representative Accepted-Frame History Reconstruction

Status: conditional mathematical reconstruction, pending independent review, 2026-08-27. This artifact defines a reconstructed history family; it does not identify the historical exact EOM trajectory, discharge the numerical containment premises, authorize execution, or supply a score.

## Scope And Fixed Sources

**Claim grade: derived, conditional.** The [asymmetric counter-breathing representative member-acceleration predeclaration](2026-08-26-f6c-normalized-member-acceleration-predeclaration.md) already defines the history-required acceleration by differentiating the cubic Hermite interpolant between adjacent accepted frames. This document makes that interpolant an explicit future-history object and gives sufficient conditions for attaching an admissible prehistory to it. The result is containment in the original full-history enclosure family, not equality with the historical EOM trajectory.

Plainly: the saved frames determine one particular smooth fitted future path. The mathematical question here is whether that path can be connected to an allowed saved past without leaving any original error allowance.

The original-byte source is `.local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json`, SHA-256 `f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1`. Its identity, original coefficients, error tokens, frame values, and provenance remain unchanged. The prior [continuous-reception conditional theorem](2026-08-27-f6c-continuous-reception-enclosure-contract.md) is bound at SHA-256 `f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68`. This document supplies a possible explicit reconstructed object for that theorem; it does not replace any of its uniform speed, clearance, boundary-sign, or root-coverage premises.

Plainly: both the data and the earlier theorem have fixed identities. A new name for the fitted path cannot turn the earlier theorem's unverified conditions into established facts.

All numerical instantiations use $c_f=1$. There are eight persistent members, with labels `(0+,0-,1+,1-,2+,2-,3+,3-)` in path-key order `(1,2,3,4,5,6,7,8)`. Each member has 1,600 stored prehistory pieces on $[-8,0]$ and 160 stored evolved pieces on $[0,0.13]$. The 81 accepted frames determine 80 frame-to-frame intervals. The original signed polarity literals and coupling remain source data; no parameter, geometry, error bound, or normalization is adjusted by this reconstruction.

Plainly: the proposed construction changes no saved number. It asks whether a precisely defined path fits the allowances already attached to those numbers.

## The Fixed Accepted-Frame Future

Let $F_0=0<F_1<\cdots<F_{80}=0.13$ denote the exact accepted-frame time tokens, interpreted as rational numbers. For member $i$, let $\mathbf P_{i,n}$ and $\mathbf W_{i,n}$ be its exact saved position and velocity vectors at frame $n$. These are the exported `acceptedFrames[n].members` coordinate literals, not reconstructed manifest coordinates or nominal retained-segment endpoints. The frame-time notation leaves the predeclaration's normalization clock $T_0$ unchanged.

Plainly: the frame times, positions, and rates are the literal saved frame data. In the formulas below, the letter $F$ labels those frame times so the predeclaration's normalization clock keeps its original meaning.

For $h_n=F_{n+1}-F_n>0$ and $z=(T-F_n)/h_n\in[0,1]$, define

$$
\begin{aligned}
\mathbf H_i(T)
={}&(2z^3-3z^2+1)\mathbf P_{i,n}
 +(z^3-2z^2+z)h_n\mathbf W_{i,n}\\
&+(-2z^3+3z^2)\mathbf P_{i,n+1}
 +(z^3-z^2)h_n\mathbf W_{i,n+1}.
\end{aligned}
$$

Plainly: this is the unique cubic on one frame interval that meets the two saved positions and the two saved velocities. The interval duration converts velocity into the position units used by the cubic coefficients.

The four endpoint identities are

$$
\mathbf H_i(F_n)=\mathbf P_{i,n},\quad
\mathbf H_i'(F_n)=\mathbf W_{i,n},\quad
\mathbf H_i(F_{n+1})=\mathbf P_{i,n+1},\quad
\mathbf H_i'(F_{n+1})=\mathbf W_{i,n+1}.
$$

Plainly: neighboring frame cubics use the same saved position and velocity at their shared frame. They therefore join with continuous position and first derivative, giving one $C^1$ future path on the entire measured interval; second derivatives need not agree at frame knots.

For exact polynomial comparison, each coordinate can equivalently be written as $H(T)=c_0+c_1u+c_2u^2+c_3u^3$, where $u=T-F_n$ and

$$
c_0=P_n,\qquad c_1=W_n,\qquad
c_2=\frac{3(P_{n+1}-P_n)}{h_n^2}-\frac{2W_n+W_{n+1}}{h_n},\qquad
c_3=\frac{2(P_n-P_{n+1})}{h_n^3}+\frac{W_n+W_{n+1}}{h_n^2}.
$$

Plainly: this is the same Hermite curve expressed in powers of elapsed time within one frame interval. Every coefficient is determined by exact rational arithmetic; replacing it with a rounded decimal would define a different curve unless the rounding were separately enclosed.

The frame-derived curve is a definition, not an assertion that the original trajectory passes exactly through error-free frames. The recorded `positionErrorBound` remains provenance; it is not added to or subtracted from the defined frame centers. No velocity error is invented for a frame. The original retained-segment position and velocity allowances instead determine whether this fixed curve is an allowed reconstruction.

Plainly: choosing the saved centers defines the fitted curve exactly. The next check asks whether that choice fits the independently recorded history allowances; it does not declare the historical calculation exact.

## Original Enclosures And Anchored Prehistories

For each stored piece $j$ of member $i$, let $\mathbf C_{i,j}$ be its exact nominal cubic on the closed interval $J_{i,j}$. Let $\varepsilon^x_{i,j,k}$ and $\varepsilon^v_{i,j,k}$ be its original nonnegative per-axis position and velocity radii, where $k\in\{1,2,3\}$. The source also supplies scalar radii, each at least its three corresponding axis radii. They are componentwise allowances in the frozen history interface, not Euclidean vector radii. All constraints below retain both source forms.

Plainly: each stored cubic has a permitted coordinate error and a permitted velocity-coordinate error. A candidate path must stay within those original allowances throughout each piece, including its endpoints.

Let $\mathcal E_i$ be the original family of $C^1$ paths $\mathbf X_i:[-8,0.13]\to\mathbb R^3$ satisfying the following inequalities for every applicable piece and every coordinate, and also the analogous inequalities using the original scalar radii:

$$
\left|X_{i,k}(T)-C_{i,j,k}(T)\right|\le\varepsilon^x_{i,j,k},\qquad
\left|X_{i,k}'(T)-C_{i,j,k}'(T)\right|\le\varepsilon^v_{i,j,k},\qquad T\in J_{i,j},
$$

Plainly: membership means one path and its own derivative satisfy every saved piece. At a shared endpoint both pieces' conditions apply; overlapping boxes alone do not demonstrate such a path.

Define $\mathcal P_i^{\mathbf H}$ to be the family of $C^1$ paths $\mathbf Y_i:[-8,0]\to\mathbb R^3$ satisfying all 1,600 original prehistory-piece constraints and the exact release anchors

$$
\mathbf Y_i(0)=\mathbf H_i(0)=\mathbf P_{i,0},\qquad
\mathbf Y_i'(0)=\mathbf H_i'(0)=\mathbf W_{i,0}.
$$

Plainly: the allowed past must end at the fitted future's exact release position and velocity. The release anchor is not the midpoint of the last prehistory cubic and first evolved cubic, and it is not an assumed equality between their nominal endpoints.

This anchored family is not asserted nonempty here. Existence of an unanchored or midpoint-joined full-history witness does not establish $\mathcal P_i^{\mathbf H}\ne\varnothing$: the release target has changed, and the last prehistory correction must be checked against that fixed target.

Plainly: an earlier successful way of joining the pieces may have chosen a slightly different release point. It cannot certify the newly fixed release anchor without another exact check.

## Conditional Concatenation Theorem

Assume, for each member $i$, that $\mathcal P_i^{\mathbf H}$ is nonempty and that $\mathbf H_i,\mathbf H_i'$ satisfy every original evolved-piece position and velocity constraint on $[0,0.13]$, including all closed endpoints. For any choice $\mathbf Y_i\in\mathcal P_i^{\mathbf H}$, define

$$
\mathbf X_i^{\mathrm{rec}}(T)=
\begin{cases}
\mathbf Y_i(T),&-8\le T\le0,\\
\mathbf H_i(T),&0\le T\le0.13.
\end{cases}
$$

Plainly: use an allowed anchored past before release and the fixed frame-derived curve afterward. The two definitions give the same position and velocity at release, so there is no ambiguity at their meeting point.

**Theorem.** Under these two containment hypotheses, $\mathbf X_i^{\mathrm{rec}}\in\mathcal E_i$. Consequently the eight-member reconstructed family, consisting of these concatenations with the unchanged persistent identities and polarities, is a nonempty subset of the original eight-member full-history enclosure family.

Plainly: if the anchored past exists and the fitted future fits, their combination is one of the histories already permitted by the saved full-history allowances. This proves a subset relation, not equality between all possible histories and the reconstruction.

**Proof.** The prehistory is $C^1$ by definition. The future is $C^1$ by the shared-frame endpoint identities. At release, the exact anchors make both position and first derivative agree, so the concatenation is $C^1$ on the full closed retained interval, with one-sided endpoint derivatives at $-8$ and $0.13$. Prehistory constraints hold by membership in $\mathcal P_i^{\mathbf H}$, and evolved constraints hold by hypothesis. At release both sets hold. There are finitely many members, so choosing one admissible prehistory for each produces an eight-member element of the full enclosure family.

Plainly: all requirements are checked on the past, on the future, and at their shared boundary. Nothing in this proof asserts that the constructed path solves the Master Equation or coincides with the historical EOM trajectory.

## A Sufficient Exact Anchored-Prehistory Construction

For one member, write the original prehistory knots as $s_0=-8<s_1<\cdots<s_{1600}=0$, and let $\mathbf C_j$ be the nominal cubic on $[s_j,s_{j+1}]$. Choose shared position and velocity targets at each knot as follows: at $s_0$, retain the first cubic's nominal position and derivative; at each internal knot, use the arithmetic mean of the exact left and right nominal endpoint positions, and separately their exact derivatives; at $s_{1600}=0$, use $\mathbf H_i(0)$ and $\mathbf H_i'(0)$ exactly. All endpoint evaluations and means are rational calculations from the original decimal tokens.

Plainly: this fixes a concrete candidate past. Most joins use the earlier midpoint rule, but the last endpoint is forced to meet the frame-derived future. It is a sufficient construction to test, not the only possible admissible past.

On one coordinate of one piece with duration $h>0$, let $e_0,e_1$ be target minus nominal position at its two endpoints, and $d_0,d_1$ be target minus nominal derivative there. Add the unique cubic correction with those endpoint values and derivatives. In the Bernstein basis on the normalized interval $z\in[0,1]$, its position controls and derivative controls are

$$
\begin{aligned}
\mathbf b^x&=(e_0,\ e_0+hd_0/3,\ e_1-hd_1/3,\ e_1),\\
\mathbf b^v&=(d_0,\ 3(e_1-e_0)/h-d_0-d_1,\ d_1).
\end{aligned}
$$

Plainly: the four position controls and three velocity controls describe the correction throughout the piece. They are coordinatewise lists, not spatial vectors. The derivative controls follow by taking three times successive position-control differences and dividing by the interval duration.

Bernstein basis functions are nonnegative and sum to one on the normalized interval. Therefore, if every absolute position control is at most the piece's original position radius, and every absolute derivative control is at most its original velocity radius, the whole corrected piece and its derivative stay inside those allowances. Perform both the per-axis and scalar-radius comparisons. Zero allowance requires exact zero controls; equality is allowed. Shared targets make neighboring corrected pieces agree in position and derivative, and the final target gives the required release anchor.

Plainly: each correction value is a weighted average of its controls, so it cannot exceed their largest allowed magnitude. Checking all controls proves the entire piece fits, rather than checking only selected times.

The final prehistory piece must pass with its anchored, not midpoint, endpoint defects. A failed control rejects this sufficient construction, not every possible anchored prehistory. In particular, unequal adjacent radii can permit a non-midpoint join while rejecting the arithmetic mean. No radius may be enlarged to make this test pass, and no correction may be silently rounded into a replacement history file.

Plainly: failure means this particular candidate past has not been proved to fit. It does not justify changing the saved error budget or declaring that every allowed past is impossible.

## A Sufficient Exact Test For The Fixed Future

Intersect each accepted-frame interval with each applicable stored evolved interval and retain every positive-width intersection $[a,b]$. Their union must cover $[0,0.13]$ exactly for each member, without a gap or omitted endpoint. Verify the source's frame-knot alignment with stored evolved endpoints before using the expected 160 positive-width cells per member. Shared endpoints remain covered from both applicable stored pieces. If a frame knot requires an extra split, split explicitly rather than evaluating the wrong frame cubic across it.

Plainly: every comparison uses one fixed frame cubic and one fixed stored cubic over a common interval. Coverage is part of the proof; a good result on selected intervals is not full containment.

To compare different polynomial origins exactly, take a scalar cubic $p(u)=c_0+c_1u+c_2u^2+c_3u^3$ originally centered at $T=o$. On the common cell, put $w=T-a$ and $\Delta=a-o$. The translated coefficients in powers of $w$ are

$$
\widetilde c_0=p(\Delta),\qquad
\widetilde c_1=c_1+2c_2\Delta+3c_3\Delta^2,\qquad
\widetilde c_2=c_2+3c_3\Delta,\qquad
\widetilde c_3=c_3.
$$

Plainly: both cubics must use the same time origin before their coefficients are subtracted. These exact translations preserve the polynomial; comparing unshifted coefficient lists would compare different functions of time.

Translate the frame cubic and stored cubic to $a$, subtract them, and write the coordinate difference as $d_0+d_1w+d_2w^2+d_3w^3$. With $\ell=b-a>0$, the Bernstein controls of this difference and its time derivative are

$$
\begin{aligned}
\mathbf b^x={}&\left(d_0,\ d_0+\frac{\ell d_1}{3},\ d_0+\frac{2\ell d_1}{3}+\frac{\ell^2d_2}{3},\ d_0+\ell d_1+\ell^2d_2+\ell^3d_3\right),\\
\mathbf b^v={}&\left(d_1,\ d_1+\ell d_2,\ d_1+2\ell d_2+3\ell^2d_3\right).
\end{aligned}
$$

Plainly: the first list bounds the position difference across the whole comparison cell; the second bounds the velocity difference. The latter differentiates with respect to actual time, not normalized cell position, so no interval-duration factor is missing.

The same nonnegative-weight argument proves containment if every position control fits the applicable original position allowance and every derivative control fits its velocity allowance, coordinate by coordinate and against both radius forms. All arithmetic can be exact rational arithmetic; no samples, approximate extrema, or floating-point error estimates are needed for this sufficient test. A failing Bernstein control can be a conservative false negative for containment. An exact point where the fixed future exceeds an original allowance would be a genuine containment counterexample; the two outcomes must not be conflated.

Plainly: passing these control bounds proves the fixed future fits. Failing them may only mean that this simple bounding method is too wide; it does not by itself prove the future leaves an allowed box.

## Evidence And Interpretation Boundary

The coordinator's reported ad-hoc future-H containment and anchored-prehistory checks are **preliminary, not accepted evidence**. This document does not independently reproduce them, report their approximate ratios as results, or mark either anchored-prehistory existence or future containment as discharged. The ordinary midpoint compatibility calculation, even if separately accepted, has a different endpoint construction and does not substitute for the anchored proof.

Plainly: the preliminary calculation is a reason to pursue this precise check, not a completed premise of the theorem.

The reconstructed future is fixed, but the anchored prehistory family need not contain only one path. Different admissible pasts can give different delayed accelerations even though they share the same release position and velocity. A constructive prehistory is a witness of nonemptiness, not a uniqueness theorem or permission to select a past because it produces a favorable residual. The existing continuous-reception theorem still requires uniform guard and root-box coverage for whichever reconstructed object or family a later authorized calculation actually uses.

Plainly: fixing the future does not erase the law's dependence on the saved past. The calculation must state which complete history, or which bounded family of histories, it is evaluating.

Using $\mathbf H_i''$ on the history-required side is already predeclared. Interpreting the law-side future as this same fixed $\mathbf H_i$, with an anchored prehistory or prehistory family, is a further reconstruction interpretation. **An operator-approved interpretation or explicit bridge is required before this construction can support score use.** This document does not make that choice, amend `M05/M06`, replace their original subject, or establish exact EOM trajectory membership. It grants no EOM execution, acceleration measurement, score update, or refinement authorization.

Plainly: the same fitted curve can make the two sides of a reconstructed comparison well defined, but adopting that reconstructed comparison for the existing scores is a separate decision. Mathematical containment alone does not make the decision.

The existing peak-at-knot convention remains unresolved except to the extent its current owner separately resolves it; this artifact does not select a side, average the two curvatures, or amend the previously proposed one-sided-limit interpretation. The frozen normalization, interval quadrature, peak enclosure, three-rung refinement, and stopping rules remain unchanged. No equilibrium, stability, retention, return, physical-realization, or general solver-correctness claim follows from this construction.

Plainly: this work identifies a path and proves a possible containment route. It does not settle the measurement's outstanding interpretation or promote the path to a physical or solver-validation result.

## Next Concrete Proof And Falsifiers

The next artifact is one original-byte-bound **anchored prehistory and accepted-frame future containment proof for all eight members**. It must independently check the 12,800 prehistory pieces with the eight exact release anchors, all 640 accepted-frame cubics, and every common cell covering the 1,280 stored evolved pieces. It must preserve original identities, decimal tokens, radii, and the two frozen source bindings above; report exact worst control-to-allowance ratios and any failed condition; and distinguish anchored construction failure from proof that no anchored history exists. No roots or acceleration measurements are needed for this containment proof.

Plainly: the next calculation is a finite exact comparison of saved polynomial data with the explicitly defined reconstruction. Its output should say whether this particular anchored construction fits, without doing any dynamics.

The conditional concatenation theorem is falsified by a demonstrated concatenation satisfying both stated hypotheses but failing a full-history enclosure or $C^1$ condition. Its proposed sufficient constructions are falsified by an exact interior escape despite every relevant Bernstein control satisfying the original radii. An altered source hash, missing interval or member, wrong polynomial origin, rounded anchor, or undisclosed radius enlargement instead invalidates the application. A correct reconstructed-history containment proof still says nothing by itself about equality with the historical exact EOM trajectory.

Plainly: the mathematics has a direct counterexample test. Most practical failures instead show that a required input or comparison was missing or changed; neither kind of result may be disguised as historical trajectory identity.

Closure goal: independently review this reconstructed-object theorem, then prove anchored prehistory and fixed-future containment without changing the original trajectory or score authority.

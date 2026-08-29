# Shared-Circle Assemblies

A shared-circle assembly is a prescribed collection of architrinos whose worldlines remain on one common circle. The chart provides a direct bridge from the two-body circular benchmark to many-member rings while keeping braid taxonomy separate from circular appearance. A shared-circle record becomes a named Noether-braid locus only when its member inventory, polarity pairing, centers, axes, frequencies, and circulation satisfy that braid's exact coordinate contract.

This chapter studies the planar rigid co-rotating subchart under the default uncapped Master Equation. It includes sub-field-speed and super-field-speed motion; the wake speed is not imposed as a ceiling on member speed. The established results concern prescribed acceleration balance. They do not establish formation, binding, retention, stability, release survival, physical identity, or scientific acceptance.

Plainly: putting several architrinos on the same rotating circle defines a useful dynamics chart, not a new particle family. The chart can intersect an existing braid family without absorbing every ring into that family.

## The Rigid Co-Rotating Chart

Choose a fixed center $\mathbf C$, an oriented orthonormal planar basis $(\hat{\mathbf e}_1,\hat{\mathbf e}_2)$, a radius $R > 0$, an angular rate $\Omega\ne 0$, and $2N$ distinct fixed phases $\phi_k$. The worldlines are $\mathbf X_k(T)=\mathbf C+R[\cos(\Omega T+\phi_k)\hat{\mathbf e}_1+\sin(\Omega T+\phi_k)\hat{\mathbf e}_2]$ for $k\in\{0,\ldots,2N-1\}$. A balanced $N{:}N$ polarity word assigns $N$ sites each polarity, so $q_k\in\{+\epsilon,-\epsilon\}$ and $\sum_k q_k=0$. The speed coordinate is $\beta_f=|\Omega|R/c_f$; every numerical result below uses normalized units with $c_f=1$.

The phase gaps and polarity word are part of the geometry. A global phase shift only rotates the whole record and may be removed. Global polarity conjugation leaves every receiver-transmitter polarity product unchanged. Reflection is a valid reduction only together with the applicable circulation reversal and only after that covariance is checked.

Plainly: all labels travel at the same constant speed and keep the same cyclic order. What can still change from one record to another is the angular spacing and the placement of the two polarities around the circle.

The regular subchart sets $\phi_k=k\pi/N$. Its alternating polarity class is $q_k=(-1)^k\epsilon$. Antipodal labels differ by $N$, so the alternating class obeys $q_{k+N}=(-1)^Nq_k$. Odd $N$ therefore gives opposite-polarity antipodes, while even $N$ gives like-polarity antipodes.

Plainly: an alternating regular ring is a collection of neutral antipodal pairs only when $N$ is odd. Hexagons and decagons pass that pairing test; squares, octagons, dodecagons, and regular 24-gons do not.

The nonuniform fixed-phase subchart keeps the same circle, angular rate, and cyclic order while allowing unequal positive phase gaps whose sum is $2\pi$. It excludes equal-time coordinate coincidence. This chart is broader than the regular polygon and must be searched separately; a regular solution does not prove that the optimum or the only solution is regular.

Plainly: regular polygons are symmetry landmarks inside a larger fixed-phase chart. A search that stops at those landmarks has not tested every shared-circle arrangement.

## Collision-Free Winding Constraint

For continuous labeled paths on one fixed nondegenerate circle, one common labelwise return period and no pairwise coincidence force every label to have the same signed winding number. If $\theta_i$ is a continuous angular lift, then $w_i=[\theta_i(P)-\theta_i(0)]/(2\pi)$ is an integer. The difference $\theta_i-\theta_j$ cannot cross $2\pi\mathbb Z$ without a coincidence, so its endpoint change cannot be a nonzero multiple of $2\pi$; hence $w_i=w_j$.

> Claim grade: derived. The proof is the collision-free shared-circle winding lemma. Falsifier: exhibit continuous labeled paths on one fixed nondegenerate circle, with one common labelwise period and no coincidence, whose continuous lifts have unequal winding numbers. The full proof appears in [Binary Dynamics](binary-dynamics.md#collision-free-shared-circle-winding-lemma).

Plainly: labels may speed up, slow down, or reverse temporarily, but they cannot finish different net numbers of laps without a collision, loss of labelwise return, or departure from the fixed circle. Rigid co-rotation is one especially simple way to satisfy this topological restriction.

## Complete Causal-Root Balance

Rigid rotational covariance reduces each directed receiver-transmitter causal condition to the dimensionless root equation $2\beta_f|\sin[(\phi_r-\phi_t+s\chi)/2]|-\chi=0$ on $0<\chi\leq2\beta_f$, where $s\in\{-1,+1\}$ records circulation sense and $\chi=|\Omega|(T_r-T_t)$. The finite upper bound follows from the maximum chord length $2R$. Partitioning the absolute-sine curve at its zeros and stationary points gives single-hump intervals, so all ordinary roots can be enumerated without relying on a coarse history grid.

The canonical ledger includes every admissible cross-transmitter root and every nontrivial same-transmitter root, but excludes the coincident self root. Each hit is evaluated at the transmitter's emission site with acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$. A fold with vanishing $D_t$, an incomplete root census, a collision, or unresolved root accumulation lies outside the ordinary chart and blocks a balance verdict.

Plainly: older causal hits count. A ring cannot be tested by keeping only the newest emission from each member, and a numerical minimum is not accepted when the causal-root ledger is incomplete.

The prescribed circular acceleration is $\ddot{\mathbf X}_k=-\Omega^2(\mathbf X_k-\mathbf C)$. For each receiver define the residual $\boldsymbol{\mathcal R}_k=\mathbf A_k^{\mathrm{ME}}+\Omega^2(\mathbf X_k-\mathbf C)$. Acceleration balance requires zero radial, tangential, and out-of-plane residual for every receiver, together with one compatible positive physical scale. Rotational covariance permits one-phase search reductions only after the complete ledger transforms covariantly; the final check still evaluates every label and a full cycle.

Plainly: every member must receive exactly the inward acceleration required by its circle. Cancellation of the assembly total, or a small residual for one favored receiver, is not enough.

## Exact Taxonomy Intersections

The $N=1$ regular alternating record is the neutral antipodal two-body circular benchmark. It is a binary dynamics chart, not a six-worldline Noether braid.

The shared-circle chart intersects B1.3 exactly when $N=3$ and the six members can be partitioned into three opposite-polarity antipodal pairs with one common center, one common axis, one common frequency, one common circulation sense, and $h_a=0$, $\rho_a=R_a$ for every binary. Within that intersection, equal radii are already supplied by the shared circle. The regular alternating hexagon is the further phase-symmetric point whose three positive-endpoint phases may be chosen as $0$, $2\pi/3$, and $4\pi/3$.

B1.3 and the shared-circle chart are not interchangeable. General B1.3 permits three independent radii, and a B1.3 record with unequal radii does not lie on one common circle. General shared-circle assemblies may have any balanced inventory size and need not possess three neutral antipodal binaries, so most shared-circle records are not B1.3.

Plainly: the overlap is exact but narrow. The verified hexagon belongs to both descriptions; the other tested inventories remain shared-circle assemblies, and unequal-radius B1.3 remains outside this chapter's chart.

A twelve-worldline $6{:}6$ shared-circle record does not become Family C from its member count alone. Family C requires a declared fixed-point-free map into six neutral binaries and strictly ordered axial coordinates on its coaxial chart. The tested planar regular alternating $6{:}6$ ring has like-polarity antipodes and one common axial coordinate, so it is outside Family C. In particular, it cannot be C5 or C6, whose two B1.3 component centers must have positive axial separation. The 24-member $12{:}12$ ring lies outside both the six-member B1.3 inventory and the twelve-worldline Family-C inventory.

Plainly: taxonomy follows the coordinate record, not visual resemblance or arithmetic decomposition. A large ring may be compared with a braid locus without being renamed as that braid.

## Verified Bounded Landscape

The current complete-root evidence gives the following prescribed acceleration-balanced regular alternating loci under the uncapped Master Equation with $c_f=1$. The table compares inventory sizes; its $N=3$ row is one member of the more detailed equal-radius B1.3 sequence recorded below. The $N=1$ row is the first binary all-root simple-chart candidate on $1<\beta_f<20$. The $N=2$ through $N=6$ campaign scanned $0.05\leq\beta_f\leq20$ and enumerated every balanced regular polarity class modulo the proven symmetries. The $N=12$ extension tested only the one regular alternating 24-gon on the same bounded speed interval.

| $N$ | Members | Regular alternating taxonomy | $\beta_f$ | $R/R_*$ | Directed roots | Maximum full residual | Verdict |
| ---: | ---: | --- | ---: | ---: | ---: | ---: | --- |
| 1 | 2 | Neutral antipodal binary benchmark | 3.070356625390253 | 0.08694167347390959 | 8 | $6.153430859539067\times10^{-13}$ | Balanced candidate on the simple-root chart |
| 2 | 4 | Shared-circle assembly outside B1.3 | 2.1472456589006224 | 0.4161828083090951 | 24 | $5.366541004644862\times10^{-13}$ | Balanced candidate |
| 3 | 6 | Equal-radius phase-symmetric B1.3 locus | 2.974307176117306 | 0.5617317000713459 | 72 | $7.62510728881475\times10^{-14}$ | Balanced candidate |
| 4 | 8 | Shared-circle assembly outside B1.3 | 1.6595117714602787 | 1.7441728749235372 | 80 | $2.8634872251132037\times10^{-12}$ | Balanced candidate |
| 5 | 10 | Shared-circle assembly outside B1.3 | 1.5556550244378213 | 2.7040642782802484 | 120 | $7.644554186576438\times10^{-12}$ | Balanced candidate |
| 6 | 12 | Shared-circle assembly outside B1.3 and Family C | 1.484095961562689 | 3.842971035530748 | 168 | $1.8199219995557143\times10^{-11}$ | Balanced candidate |
| 12 | 24 | Shared-circle assembly outside B1.3 and Family C | 1.290840841384326 | 13.982496760466805 | 624 | $5.858187577303801\times10^{-10}$ | Balanced candidate in one tested class |

> Claim grade: measured. `PlanarCoRotatingRingBalance` supplies the complete prescribed-path ledgers. The unchanged `CircularSelfHitBinaryAnalysis` independently checks the same-transmitter roots, and the unchanged generic `AnalyticalBraidEvaluator` independently checks the cross-transmitter roots and acceleration contributions for the promoted many-member candidates. The $N=1$ specialization is independently compared with the circular-binary instrument. Falsifier: a missing or displaced causal root, a failed independent comparison, an incompatible receiver scale, a topology change under refinement, or a residual outside the declared tolerance overturns the corresponding row.

Plainly: the table reports exact regular candidates, not a ranking of physical assemblies. A lower speed, larger scale, or smaller residual does not imply greater stability or greater physical importance.

### Equal-Radius B1.3 Velocity Search

Holding the B1.3 overlap at the regular alternating hexagon fixes the endpoint phases at multiples of $\pi/3$ and leaves the dimensionless speed $\beta_f$ and compatible scale $R/R_*$ to be solved. A bounded expanding search on $0.05\leq\beta_f\leq20$ found the following eighteen independently checked prescribed acceleration-balance configurations. The topology labels identify ordered complete-root intervals in this one-dimensional speed chart; they are not additional braid-family labels.

| Topology interval | $\beta_f$ | $R/R_*$ | Directed roots | Fold events |
| --- | ---: | ---: | ---: | ---: |
| T02 | 1.82643096465468 | 0.9759764318013546 | 48 | 0 |
| T04 | 2.9743071761172937 | 0.5617317000713791 | 72 | 0 |
| T06 | 4.0660862333053585 | 0.40115175261583064 | 96 | 0 |
| T08 | 5.1388081743445575 | 0.3128385708119867 | 120 | 0 |
| T10 | 6.202638876028293 | 0.25659243817707383 | 144 | 0 |
| T12 | 7.261566125492824 | 0.21755043977610197 | 168 | 0 |
| T14 | 8.317491541162603 | 0.1888427476080863 | 192 | 0 |
| T16 | 9.371441912067647 | 0.16683753598619847 | 216 | 0 |
| T18 | 10.424022006485146 | 0.14942962741954627 | 240 | 0 |
| T20 | 11.47561180217534 | 0.13531315446217912 | 264 | 0 |
| T22 | 12.526462307704469 | 0.12363456932869378 | 288 | 0 |
| T24 | 13.576746118826815 | 0.11381220617793866 | 312 | 0 |
| T26 | 14.626585878372042 | 0.10543592214393649 | 336 | 0 |
| T28 | 15.676071159345868 | 0.09820817501749826 | 360 | 0 |
| T30 | 16.725268924157813 | 0.09190784253664142 | 384 | 0 |
| T32 | 17.774230245157778 | 0.08636715760100132 | 408 | 0 |
| T34 | 18.82299475976613 | 0.08145652726640888 | 432 | 0 |
| T36 | 19.871593704659002 | 0.07707425407357736 | 456 | 0 |

> Claim grade: measured. The `run-b13-velocity-search.mjs` instrument used complete emission-site, all-causal-root ledgers, a primary root tolerance of $2\times10^{-13}$, a tightened root tolerance of $2\times10^{-14}$, a balance tolerance of $2\times10^{-8}$, and tangential bisection to $2\times10^{-13}$. The separately authored `verify-b13-velocity-solutions.mjs` instrument checked all eighteen rows with the unchanged `AnalyticalBraidEvaluator` for cross-transmitter acceleration and the unchanged `CircularSelfHitBinaryAnalysis` for same-transmitter roots and acceleration. Its tolerances were $2\times10^{-7}$ for cross acceleration and independent balance, $2\times10^{-9}$ for self acceleration, and $4\times10^{-10}$ for self-root location; the observed maxima were respectively $3.637030232539473\times10^{-8}$, $2.6856177678495606\times10^{-9}$, $3.5166314305001833\times10^{-14}$, and $9.237055564881302\times10^{-14}$. The search record has SHA-256 `406379db93e051453a2df97ba6a2f9ccff1241c2222fd777117fd96fe8833c81`; the independent-check record has SHA-256 `4e7305575b543ae1079ce104c8d347ca2ec3883b1299ab4a3796ee6d709e711c`. A missing or displaced causal root, a nonzero fold on a reported row, a failed topology match under tightening, an incompatible scale, or an independent residual outside these tolerances overturns that row.

Plainly: the second instrument rebuilt the two kinds of acceleration contribution through unchanged reference paths and found every reported balance inside its declared error limits. The T04 row and the inventory table's $N=3$ row are the same numerical locus under separate refinements, which accounts for their last-digit differences.

#### Circular Root Ledger and Fold Signs

Let $\Delta$ be the fixed receiver-minus-transmitter phase offset and let $\varphi = |\Omega|(T_r-T_t) > 0$ be the angular delay of one causal hit. On the common circle, the chord condition reduces exactly to

$$
\varphi
=
2\beta_f\left|\sin\left(\frac{\Delta+\varphi}{2}\right)\right|
\qquad
0 < \varphi \leq 2\beta_f
$$

Plainly: the left side is how far the ring turns while the wake travels; the right side is the same travel time obtained from the chord length in units with $c_f=1$. Every circular causal root is a solution of this one scalar equation.

For a receiver at phase zero, transmitter channel $j\in\{0,\ldots,5\}$ has $\Delta_j=-j\pi/3$ and polarity product $p_j=(-1)^j$. Write

$$
\frac{\Delta_j+\varphi}{2}
=
k\pi+v
\qquad
0 < v < \pi
$$

and define $m=6k+j$. All six phase channels then obey one integer-level equation,

$$
F_{\beta_f}(v)
:=
\beta_f\sin v-v
=
\frac{m\pi}{6}
\qquad
p_j=(-1)^m
$$

Plainly: the six transmitter channels are one root lattice with level spacing $\pi/6$. Moving up one integer level reverses polarity, so the level number carries both the root geometry and the alternating sign.

For one root, put $D=1-\beta_f\cos v$. Its exact radial and tangential acceleration projections at the receiver are

$$
a_r^{(m,v)}
=
\frac{(-1)^m}{4\sin v\,|D|}
\qquad
a_t^{(m,v)}
=
\frac{(-1)^m\cos v}{4\sin^2v\,|D|}
$$

Plainly: these two expressions determine whether each delayed hit contributes inward or outward acceleration and whether it advances or opposes the prescribed circular motion.

Ordering the root births by speed gives fold boundaries indexed by $q=0,1,2,\ldots$, with

$$
\beta_q=\sec\xi_q
\qquad
\tan\xi_q-\xi_q=\frac{q\pi}{6}
\qquad
0 \leq \xi_q < \frac{\pi}{2}
$$

Plainly: a fold is the speed at which a pair of causal-root solutions first touches into existence. The auxiliary angle $\xi_q$ locates that tangency, and the hexagon's six phase steps produce the increment $\pi/6$ in the ordered boundary equation.

Let $M(\beta_f)=\tan\xi-\xi$, where $\beta_f=\sec\xi$. Immediately above the $q$th fold, the newborn pair contributes

$$
N_t(\beta_f)
=
\frac{(-1)^q}
{2\sqrt{2}\,\beta_q^{3/2}\sqrt{M(\beta_f)-q\pi/6}}
\left(1+o(1)\right)
$$

Plainly: an odd-$q$ opposite-polarity birth sends the one-sided tangential ledger to $-\infty$, while an even-$q$ like-polarity or same-transmitter birth sends it to $+\infty$. This local sign is derived; it does not say that the ledger is monotone throughout either neighboring interval.

The boundary at $q=0$, where $\beta_0=1$, is the special same-transmitter onset and adds one root in each of six diagonal channels. Every ordinary boundary with $q \geq 1$ is a generic fold on six symmetry-related directed channels, and each channel gains two roots. Thus an ordinary transition adds twelve directed roots. Consecutive observed balances lie after successive odd folds, so their ledgers differ by two transitions and twenty-four directed roots. This exact root-topology indexing is a prescribed-chart example of the finite algebraic structure used by the broader [eigen-braid spectrum](../noether-braid/braid-mathematics.md#the-eigen-braid-spectrum) target; it does not establish a retained spectrum.

Plainly: roots arrive as six matched pairs after the special first onset. The local sign now explains why an odd fold creates the downward crossing opportunity used by the observed balance ladder, but it does not exclude additional zeros elsewhere in an interval.

Define $A_q=\pi(q+3)/6$. Expanding the boundary equation as $\xi_q\to\pi/2$ gives

$$
\beta_q
=
A_q-\frac{1}{2A_q}+O\left(A_q^{-3}\right)
$$

Plainly: every other fold boundary approaches a spacing of $\pi/3$. The balance-to-fold calculation below strengthens this boundary result into an asymptotic expansion for the balance sequence itself.

> Claim grade: derived for the circular root equation, unified integer-level ledger, exact root projections, fold parameterization, local odd/even newborn-pair sign, ordinary $+12$ rule, and fold-boundary asymptotic. A contrary chord reduction, a phase channel that fails the integer-level map, a fold with the wrong polarity or one-sided divergence, or a regular-hexagon boundary with a different six-channel or local two-root multiplicity overturns the corresponding statement.

#### Bounded Numerical Zero Census

The `analyze-b13-ladder-completeness.mjs` instrument partitioned $0.05\leq\beta_f\leq20$ into all thirty-seven open topology intervals, excluded fold boundaries by explicit one-sided insets, and evaluated 199,555 points with maximum grid gap $9.99998947368421\times10^{-5}$. It bisected every detected tangential sign change and refined every sampled local minimum of the absolute tangential residual. Exactly eighteen sign-changing zeros were detected, all inward and all in T02, T04, through T36. The fine search between the 72-root and 96-root balances traversed T04, the entire 84-root T05 interval, and the relevant part of T06 without detecting an additional zero.

Plainly: this was a much denser search than the first velocity sweep and it recovered the same eighteen balances. In particular, it found no extra balance between the second and third rows of the table.

> Claim grade: measured bounded numerical result, not interval-certified exhaustiveness. The scan used root tolerance $2\times10^{-14}$, fold tolerance $2\times10^{-12}$, refinement root tolerance $2\times10^{-15}$, and the fail-closed fold policy. Its record has SHA-256 `9b5635bf6450fbcfe366a64a628e3d2b3cc271ff50e68b03279989d4206129b9`; the evaluated `PlanarCoRotatingRingBalance.mjs` subject has SHA-256 `79121e80ca2206a702eaa80c5622d27872c28a545c7ca8e52dc9d8df4012abc6`. A newly resolved sign change, an even-multiplicity zero between samples, a missed fold neighborhood, or a topology mismatch under refinement falsifies numerical completeness. Because the finite grid does not exclude such an even-multiplicity zero, all thirty-seven intervals remain unresolved at interval-certificate grade.

Plainly: “eighteen detected” is exact for this declared grid and refinement procedure. It is not a proof that the continuous tangential function has only eighteen zeros.

The local odd/even fold sign does not close this global gap. A one-sided divergence fixes the ledger's sign arbitrarily close to a boundary, but interval-certified exhaustiveness still requires outward-rounded monotonicity or a zero-count argument over the whole open interval.

Plainly: knowing how the curve leaves each fold does not prove how many times it can turn and cross zero before the next fold.

#### High-Precision Continuation

The independently authored high_precision_b13_oracle.py instrument imports no subject code and solves the scalar root ledger, phase-channel acceleration projections, and radial scale at 100 decimal digits. It accepted all eighteen next even classes T38 through T72. Across those rows, $\beta_f$ increases from $20.920052031568546207\ldots$ to $38.733400877661225379\ldots$, $R/R_*$ decreases from $0.073139414324807692\ldots$ to $0.039155202037418725\ldots$, and the directed-root count advances by twenty-four per row from 480 to 888.

Plainly: the independently accepted ladder now contains thirty-six consecutive even topology classes, with eighteen high-precision balances extending the original eighteen beyond speed 20.

> Claim grade: independently measured prescribed acceleration balance. The oracle used 100 decimal digits, absolute root tolerance $10^{-85}$, absolute tangential-balance tolerance $10^{-70}$, and a predeclared minimum transversality of $10^{-4}$. All eighteen rows passed; the smallest observed transversality was $0.008604304539572234\ldots$, the largest root residual was $8.43773690482795\times10^{-86}$, and the largest absolute tangential residual was $1.974\times10^{-94}$. Separate 120-digit evaluations of T38 and T72 changed $\beta_f$ by less than $4.84\times10^{-89}$ and the compatible radius by less than $4.77\times10^{-92}$. The record has SHA-256 60d3ff7bf9d8e4399a44f749459e8244388f5c063bf897a138b3937841924a18; a second full run reproduced the JSON and its non-GUI SVG byte for byte, with SVG SHA-256 008d0c9f54f2ddf3debeb9aec38cb559c12c64b50795d72950bb5a95d75b8dd2. A failed residual, transversality, topology, directed-root count, precision-escalation, or deterministic-rerun check overturns the affected measured claim.

Plainly: this is independent high-precision evidence that the next eighteen prescribed balances exist. It remains evidence about constrained circular acceleration balance, not release survival, retention, binding, stability, a physical spectrum, or scientific acceptance.

#### Derived High-Speed Ladder

Across all thirty-six independently accepted points, faster prescribed motion pairs monotonically with a smaller compatible radius. Define

$$
C(\beta_f)
\equiv
\beta_f\frac{R}{R_*}
$$

Pairing the old rising and descending roots on the integer-level lattice gives the limiting tangential and radial backgrounds

$$
B_t
=
\frac{1}{2(\pi/6)^2}
\sum_{l=1}^{\infty}\frac{(-1)^{l+1}}{l^2}
=
\frac32
\qquad
B_r
=
\frac{1}{2(\pi/6)}
\sum_{l=1}^{\infty}\frac{(-1)^l}{l}
=
-\frac{3\log 2}{\pi}
$$

Plainly: the complete alternating ledger makes the old roots approach a positive tangential background of $3/2$ and a finite inward radial correction of $-3\log 2/\pi$. Sixfold summation cancels $\sqrt{3}$ at this order, while the alternating harmonic sum introduces $\log 2$.

At an odd fold, the negative newborn pair balances the old-root tangential background at

$$
\beta_{\mathrm{bal}}-\beta_q
=
\frac{1}{18\beta_q^3}
+o\left(\beta_q^{-3}\right)
$$

Plainly: each high-speed balance lies just above its odd fold. The gap shrinks as the inverse cube of speed, with leading coefficient $1/18$.

The newborn radial contribution and the old-root radial background then give

$$
C(\beta_f)
=
\frac32+\frac{3\log 2}{\pi\beta_f}
+o\left(\beta_f^{-1}\right)
\qquad
\frac{R}{R_*}
=
\frac{3}{2\beta_f}
+\frac{3\log 2}{\pi\beta_f^2}
+o\left(\beta_f^{-2}\right)
$$

Plainly: $C_\infty=3/2$ and the next coefficient $3\log 2/\pi$ are derived, not fitted. Compatible radius is inversely proportional to speed at leading order, with a positive inverse-square correction.

For ladder index $n\geq1$, let $A_n=\pi(n+1)/3$. The balance speed, adjacent spacing, and compatible radius have the expansions

$$
\beta_n
=
A_n-\frac{1}{2A_n}-\frac{17}{72A_n^3}
+o\left(A_n^{-3}\right)
$$

$$
\Delta\beta_n
=
\frac{\pi}{3}
+\frac{3}{2\pi(n+1)^2}
-\frac{3}{2\pi(n+1)^3}
+o\left(n^{-3}\right)
$$

$$
\frac{R_n}{R_*}
=
\frac{9}{2\pi(n+1)}
+\frac{27\log 2}{\pi^3(n+1)^2}
+o\left(n^{-2}\right)
$$

Plainly: the balance spacing approaches $\pi/3$ from above, and the radius falls like $1/(n+1)$. Writing the sequence by ladder index restores explicit powers of $\pi$ even though the leading speed-scaled radius is the rational constant $3/2$.

> Claim grade: derived. The derivation record has SHA-256 2d36cadd03f3fe92cf73690cccf4e4e5722ea6106bc5234c38e64bef22600b54. Its proof uses the exact integer-level root ledger, endpoint pairing, alternating-series tail bounds, the odd-fold newborn-pair expansion, and the complete radial acceleration sum. A failure of the unified ledger to reproduce the six-channel root count, a nonvanishing upper-level remainder, a high-precision sequence for which $\beta_f^3(\beta_{\mathrm{bal}}-\beta_q)$ fails to approach $1/18$, or accepted values that fail either displayed scale limit overturns the corresponding result. Higher coefficients remain unclaimed because the endpoint expansion becomes nonuniform in the level index and may introduce logarithmic corrections.

Plainly: the leading high-speed law and its first correction are now mathematical results. The proof does not establish one and only one balance in every topology interval.

The separate binary64 extension through $\beta_f=105.76222509672797$ remains exploratory beyond the independently accepted T72 row: only 44 of its 100 direct six-receiver rows met the original vector tolerance, and the generic independent evaluator lost convergence near high folds. Its decimal regression coefficients are not used as exact constants or as evidence for additional balances.

Plainly: the independently accepted continuation ends at T72. Farther double-precision rows remain useful only as discovery hints until an independent calculation meets its own numerical gates.

For $N=2$ through $N=6$, every other regular polarity class is a bounded negative on $0.05\leq\beta_f\leq20$: one class for $N=2$, two for $N=3$, six for $N=4$, twelve for $N=5$, and thirty-four for $N=6$. The regular search therefore closes the declared polarity census only on that bounded speed interval. The nonuniform fixed-phase searches found no additional nonregular solution but do not cover their multidimensional domains; those charts remain unresolved. The dedicated equal-radius antipodal-neutral B1.3 phase search found the regular hexagon and left unequal phases unresolved. The velocity search above held those regular phases fixed. Unequal B1.3 radii were not searched.

Plainly: the negative rows reject only the tested regular polarity words below speed 20. They say nothing global about faster, variable-speed, breathing, eccentric, nonplanar, or freely evolving assemblies.

## Dynamical Boundary

Acceleration balance makes a prescribed ring a legitimate initial-history candidate for further testing. It does not show that the EOM solver will retain the circle after release. Stability analysis is meaningful only after an ordinary evolution preserves the relevant balanced branch with complete history, controlled root transitions, and a nontrivial return record.

The next genuine blocker is therefore a separately frozen EOM-solver evolution from a balanced locus with complete retained prehistory, unchanged coupling, guarded root continuity, and a candidate-specific return or escape decision. Broader geometric closure separately requires controlled coverage of unequal phase gaps and, for B1.3, unequal binary radii.

Plainly: the chapter closes the taxonomy bridge and records the bounded acceleration-balance landscape. It does not promote any ring from prescribed geometry to a retained physical assembly.

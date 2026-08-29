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

The current complete-root evidence gives the following prescribed acceleration-balanced regular alternating loci under the uncapped Master Equation with $c_f=1$. The $N=1$ row is the first binary all-root simple-chart candidate on $1<\beta_f<20$. The $N=2$ through $N=6$ campaign scanned $0.05\leq\beta_f\leq20$ and enumerated every balanced regular polarity class modulo the proven symmetries. The $N=12$ extension tested only the one regular alternating 24-gon on the same bounded speed interval.

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

For $N=2$ through $N=6$, every other regular polarity class is a bounded negative on $0.05\leq\beta_f\leq20$: one class for $N=2$, two for $N=3$, six for $N=4$, twelve for $N=5$, and thirty-four for $N=6$. The regular search therefore closes the declared polarity census only on that bounded speed interval. The nonuniform fixed-phase searches found no additional nonregular solution but do not cover their multidimensional domains; those charts remain unresolved. The dedicated equal-radius antipodal-neutral B1.3 phase search retains the regular hexagon and leaves unequal phases unresolved. Unequal B1.3 radii were not searched.

Plainly: the negative rows reject only the tested regular polarity words below speed 20. They say nothing global about faster, variable-speed, breathing, eccentric, nonplanar, or freely evolving assemblies.

## Dynamical Boundary

Acceleration balance makes a prescribed ring a legitimate initial-history candidate for further testing. It does not show that the EOM solver will retain the circle after release. Stability analysis is meaningful only after an ordinary evolution preserves the relevant balanced branch with complete history, controlled root transitions, and a nontrivial return record.

The next genuine blocker is therefore a separately frozen EOM-solver evolution from a balanced locus with complete retained prehistory, unchanged coupling, guarded root continuity, and a candidate-specific return or escape decision. Broader geometric closure separately requires controlled coverage of unequal phase gaps and, for B1.3, unequal binary radii.

Plainly: the chapter closes the taxonomy bridge and records the bounded acceleration-balance landscape. It does not promote any ring from prescribed geometry to a retained physical assembly.

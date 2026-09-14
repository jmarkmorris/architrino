# $A_0$ Tier 0 Result Interpretation: Reduced Branch Search

This note explains the mathematical information supplied by a reduced $A_0$ branch search. The symbol $A_0$ names one proposed neutral reference assembly: six architrinos, the polarity-bearing point transceivers of $\mathbb{A}\mathbb{A}\mathbb{A}$, arranged as three neutral binaries, each an electrino paired with a positrino, on the coincident-midpoint orthogonal-axis chart. The mass program in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate) uses it as one calibration-free candidate for the first mass-map output; it is a candidate to test, not an established object. The note is a companion to the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](run-protocols.md), and the convergence standards in [Convergence Tests](convergence-tests.md).

The certificate protocol proceeds in four tiers. Tier 0 is the reduced branch search treated here: a prescribed family of six worldlines, called a carrier chart, is sampled without evolving the dynamics, and the delayed root equations are solved on it. Tier 1 continues a surviving chart under direct delayed dynamics with the causal-wake-surface width $\eta>0$ still active; Tier 2 extracts internal energy and far-field shielding; Tier 3 probes the Noether sea response. Tier 0 tests whether a reduced branch chart satisfies the geometric and numerical conditions for continuation. It does not establish that the branch is physically realized, stable under the full delayed dynamics, or sufficient to support a mass-map claim.

A candidate geometry can satisfy preliminary consistency conditions without being a physical attractor, a closed cycle of the delayed dynamics to which nearby histories return. The distinction separates a useful search result from evidence for a stable assembly.

Tier 0 is not an attractor proof. It specifies consistency conditions for a reduced carrier chart before Tier 1 $\eta > 0$ continuation, where $\eta$ is the regulator width that gives each causal wake surface a small thickness so that root crossings and near-fold events remain computable; the regulator is defined in the [Master Equation](../../dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation). Any future output must be read together with the mass thesis in [Particle Masses](../../assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../dynamics/energy.md), the dynamics baseline in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and the closure bookkeeping in [Parameter Ledger](../parameter-ledger.md).

No computed branch-search result is reported here. The conditions below define a proposed analysis and the limits of any result obtained from it. Every numerical instantiation of these conditions uses normalized wake-speed units with $c_f=1$; the symbol $c_f$ is kept in the definitions below so that the dependence stays visible.

## Interpretation of a Candidate

A preliminary analysis distinguishes reduced coordinates, active causal roots, residual errors, and uncomputed dynamical quantities. A causal root is an earlier emission event whose expanding wake surface reaches the receiver exactly at the evaluation time; it is active when it contributes an admitted acceleration on the chart. Global rotations, the common closed-cycle phase, and permitted discrete relabelings must not be counted as distinct physical configurations. Excluded instantaneous self roots must not count as active interactions. Each residual requires a value or an explicit statement that it has not been evaluated.

Satisfying the preliminary conditions makes a geometry eligible for direct delayed-dynamics analysis. It does not establish an attractor, compute the far-field shielding factor $\zeta(A_0)$, the ratio of the leading isotropic part of the assembly's far-field wake to the naive constituent sum as defined in [Energy](../../dynamics/energy.md#apparent-energy-and-shielding), validate the internal energy $E_{\text{internal}}(A_0)$, or derive the Noether sea inertial-response tensor $\mathcal{M}_{\text{sea}}^{ab}$.

Tier 0 is a search over a declared finite domain: a carrier family, a sampling grid, an interaction basis, tolerances, a near-zero self-root threshold, and one value of $\eta$. Its negative results are measured statements about that domain. Failure of a compact coordinate chart does not falsify every possible $A_0$ branch; it excludes that chart on its tested carrier family, basis, and tolerances. An empty candidate set is likewise evidence only that this domain contains no candidate, and only once the search instrument has returned the known answer on a case whose root ledger is derived independently, for example the uniform circular binary whose self-hit threshold and delay equation are derived in [Binary Dynamics](../../dynamics/binary-dynamics.md#circular-self-hit-threshold-at-the-wake-speed); a search that has not passed such a case cannot distinguish an empty domain from a defective instrument. A revised chart must specify its geometry, equality relations, adjustable parameters, held-out residual tests, phase convention, and excluded benchmarks before fitting. A successful coordinate test still supplies no evolved history.

## Quotient-Coordinate Row

The reduced coordinate $z_\Lambda$ describes the geometry after quotienting away global rotations, the common $S^1_{\mathbf{k}}$ phase gauge, and allowed discrete relabelings $\Gamma_\Lambda$ that preserve polarity assignment, layer roles, speed ordering, and the [causal-root](../../foundations/architrino.md) branch class identifying which earlier emissions reach the receiver. Quotienting means that two carrier representatives related by one of these operations count as the same geometry. The rotations form the group $SO(3)$ of rigid rotations of the Euclidean void. The phase gauge $S^1_{\mathbf{k}}$ is the freedom to shift the time origin along the closed cycle, a single circle's worth of freedom because all three layers advance together over the return period $P_{\mathbf{k}}$ indexed by the winding vector $\mathbf{k}=(k_1,k_2,k_3)$. The relabelings $\Gamma_\Lambda$ are the finite set of index permutations that leave the declared chart data unchanged. The subscript $\Lambda$ names the branch class of the candidate, its winding integers and active-root classes, recorded in the table below. The word gauge here means a redundancy of the chart description; it is not the effective gauge symmetry of the observer-level Standard Model record. A layer is one of the three binaries regarded as a stratum of the reduced chart.

For this protocol only, the source-record layer aliases map to persistent indices by
$$
I\leftrightarrow1,\qquad M\leftrightarrow2,\qquad O\leftrightarrow3.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf884bbe20f012b6)

Persistent indices identify the binaries. The aliases describe the declared radial role on this one chart, with $I$ the smallest declared radius, $M$ the intermediate, and $O$ the largest, and do not relabel the taxonomy; the persistent indices $a\in\{1,2,3\}$ carry no radius, speed, or channel meaning of their own.

| Geometric information | Meaning |
| --- | --- |
| Radius ratios | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, where $R_a$ is the declared radius of binary $a$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| Period ratios | $P_I/P_M$ and $P_M/P_O$, where $P_I,P_M,P_O$ are the cycle periods for the declared layer aliases, so time-scale separation is checked alongside radius separation |
| Binary-2 speed offset | $(s_2-c_f)/c_f$ in the declared chart, where $s_a$ is the constituent speed of binary $a$ relative to the Euclidean void; with $c_f=1$ this is $s_2-1$, and its declared tolerance is the sense in which $s_M\approx c_f$ below |
| Ellipticity | the departure of each layer's path from a circle, and whether Tier 0 used a shared scalar chart with one ellipticity value for all three layers |
| Plane-normal Gram matrix | $G_{\ell m}$, the pairwise dot products of the unit normals to the three binary planes after quotient reduction; on the orthogonal-axis chart the target is the identity matrix, and departures record axis misalignment |
| Orientation | $\chi_N$, the sign of the signed volume spanned by the three plane normals (their triple product), with a nondegenerate status when that volume is nonzero and a degenerate status when the normals are coplanar |
| Circulation orientation | $H_1,H_2,H_3$, the circulation sense of each binary about its own plane normal, one sign per persistent index, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| Relative phase | $\Phi_{\text{rel}}$ status, the phase offsets between layers that remain after removing the common $S^1_{\mathbf{k}}$ phase origin; a gauge-fixed zero-offset representative alone does not establish the full phase quotient |
| Branch class | $[\Lambda]$ data from winding integers (the number of cycles each layer completes over $P_{\mathbf{k}}$), inter-layer closure, active and raw root classes, and excluded roots; the representative is not yet a certified discrete quotient |
| Removed symmetries | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| Coordinate degeneracy | Failure of the proposed coordinate to distinguish the relevant geometric configurations after symmetry reduction |

The quotient row is not a new dynamical assumption. It is the coordinate audit that prevents a raw carrier chart, a gauge choice, and a branch class from being mistaken for three independent pieces of physics.

## Near-Zero Self-Root Policy

The preliminary analysis distinguishes raw self-root sightings from active self-hit branches. A self root is a causal root whose transmitter and receiver are the same architrino: the worldline has re-entered its own earlier wake surface. A raw self root whose delay lies at or below the configured near-zero threshold is recorded but excluded from the active ledger as an instantaneous self-kick.

This policy extends the canonical convention $H(0)=0$, which excludes the coincident-time root $T_t=T_r$ exactly, to the resolution of the chart: a root whose delay cannot be separated from zero at the chart's sampling resolution is treated as that excluded coincident root. The reason the exclusion matters is geometric. A self root of delay $\Delta_{\text{self}}=T_r-T_t$ has separation $r=c_f\Delta_{\text{self}}$, so a near-zero delay places the receiver almost on top of its own emission site, where the inverse-square factor of the per-hit acceleration is unbounded; the [Master Equation](../../dynamics/master-equation.md#self-hit-condition) admits a self-hit contribution only on a retained branch with positive separation or explicit regularization data. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted. A chart that passes with a raw root excluded has passed as a truncated chart, and whether the excluded root is real remains an open question for that chart.

The threshold is not independent of the speed tolerance. On an exact circular layer of radius $R$ and constituent speed $s$, with $c_f=1$, a same-transmitter root exists only for $s>1$, and its smallest delay is $\Delta_{\text{self}}=R\delta_s/s$, where the delay angle solves $\delta_s=2s\sin(\delta_s/2)$; for $s=1+\mu$ with small $\mu>0$ this gives $\Delta_{\text{self}}\approx2R\sqrt{6\mu}$. The leading self root of the near-field-speed layer therefore approaches zero delay as the square root of the speed excess, and a near-zero threshold $\Delta_{\mathrm{thr}}$ excludes it whenever $\mu<(\Delta_{\mathrm{thr}}/2R)^2/6$. The threshold and the binary-2 speed tolerance must be declared together, and this square-root sensitivity is the mechanism by which raw sightings crowd the threshold on that layer. The delay equation and its threshold are derived in [Binary Dynamics](../../dynamics/binary-dynamics.md#circular-self-hit-threshold-at-the-wake-speed).

The specified fold-layer diagnostic, the treatment of the layer whose declared speed sits near the onset of its own self root, where the principal circular self root approaches a degenerate grazing endpoint at zero delay and separation, with vanishing transmitter-side factor $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}_t$ and hence a singular per-hit weight $c_f/\lvert D_t\rvert$, may preserve locked self-root contributions, contributions held at their sampled root keys rather than re-solved, as a candidate transition, but it does not by itself establish self-hit closure. This circular onset is not a generic interior fold: for $f(\delta_s,s)=2s\sin(\delta_s/2)-\delta_s$, both $\partial_{\delta_s}f$ and $\partial_{\delta_s}^2f$ vanish at $(\delta_s,s)=(0,1)$, and the event lies on the excluded coincident endpoint. It requires its own regularization and error control; the interior-fold finite-impulse argument cannot be imported from $D_t=0$ alone. A candidate recorded under the fold-layer diagnostic label must satisfy the declared residual conditions in a corrected one-period branch-equation calculation; the non-symmetry Floquet gap $\Delta_{\mathbf{k}}$, defined under Floquet Stability below, and persistence under $\eta$ refinement require additional analysis.

## Residual Semantics

A residual is the numerical mismatch between what the carrier chart asserts and what the delayed root equations return on it, measured against a declared tolerance. The complete residual vector is
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae45d430bea6eace)

Each component has a stated tolerance and interpretation. An uncomputed component is explicitly identified as uncomputed, not assigned zero.

The Tier 0 residual surface deliberately includes entries that are not computed at Tier 0:

| Residual | Tier 0 interpretation |
| --- | --- |
| $\mathcal{R}_{\text{state}}$ | Carrier-chart return mismatch over one declared period $P_{\mathbf{k}}$ |
| $\mathcal{R}_{\text{root}}$ | Active root defect on candidate causal-root branches: the residual of the causal-root condition on each admitted root |
| $\mathcal{R}_{\text{phase}}$ | Integer layer-winding mismatch: the departure of each layer's accumulated phase over $P_{\mathbf{k}}$ from its integer winding |
| $\mathcal{R}_{E}$ | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering, recording on which side of $c_f$ each layer falls |
| $\mathcal{R}_{\text{avg}}$ | Diagnostic size of the interaction terms assigned to the averaging channel, those claimed to average out over the cycle |
| $\mathcal{R}_{\text{lock}}$ | Diagnostic fraction or defect of selected locking terms, the interaction terms claimed to hold the layers in their declared frequency relation |
| $\mathcal{R}_{\text{leak}}$ | Far-field leakage placeholder for the wake terms that survive cancellation at large distance, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without implying that Tier 0 has done Tier 1 or Tier 2 work. A bounded residual establishes the chart's self-consistency under the instrument that solved its roots, at the declared tolerance; it is not independent evidence that the roots are correct, because the same root solver produced both the chart and its residual. Correctness of the solver rests on the independently derived known case named above, and the residual tolerances are declared protocol constants rather than derived quantities.

## Floquet Stability

Tier 0 does not construct the monodromy operator, which describes perturbation evolution over one period: it maps a small perturbation of the candidate at the start of one return period $P_{\mathbf{k}}$ to the perturbation one period later. Floquet theory, the linear theory of perturbations about a periodic solution, reads stability from the eigenvalues of that operator, the multipliers: perturbations shrink when every multiplier that does not belong to an exact symmetry direction lies strictly inside the unit circle. The non-symmetry Floquet gap $\Delta_{\mathbf{k}}$ is the margin by which the largest such multiplier lies inside that circle. It is therefore uncomputed at Tier 0, not zero and not positive. Because the dynamics are delayed, the perturbed state is a history segment, so the operator acts on history perturbations and must include the variation of the root delays with the state; a finite projection of it supplies a numerical diagnostic, not a certificate.

A stability conclusion requires Tier 1 to construct the return map and evaluate the gap after excluding symmetry modes. The gap has a referent only for a candidate that itself returns under the full delayed acceleration law on the same retained history, that is, only once $\mathcal{R}_{\text{state}}$ and $\mathcal{R}_{\text{root}}$ are bounded on the evolved cycle rather than on the prescribed carrier. A spectrum computed about a carrier that the dynamics do not occupy has no dynamical referent, whatever its sign: it is void, neither a measured instability nor a measured stability. On an actual returning candidate, a computed $\Delta_{\mathbf{k}}\le0$ fails the attractor criterion stated in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), which requires every non-symmetry multiplier inside the unit circle with numerical error controlled.

## Preliminary Consistency Conditions

The reduced geometry must have nondegenerate quotient coordinates, retain its declared radius and period separation, satisfy $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ within tolerance, and close its layer windings over $P_{\mathbf{k}}$, meaning that each layer returns to its phase after its integer number of cycles within the declared return period. State-return, center-drift, and active-root residuals must be bounded by their declared tolerances. Partner, self, and inter-layer active root classes, whose transmitter is respectively the receiver's binary partner, the receiver itself, or an architrino of another layer, must be accounted for, and active separator roots require an explicit continuation rule. A separator is a boundary of the root structure at which roots are created, annihilated, or leave the retained history, classified in the [Master Equation](../../dynamics/master-equation.md#separator-taxonomy); a root sitting on one cannot be carried across it by the ordinary simple-root formula.

A candidate fails the corresponding test if coordinate degeneracy, scale collapse, incorrect speed ordering, open phase closure, excessive carrier or root residuals, uncontrolled averaging or locking errors, unresolved separator singularities, or an incomplete active-root inventory remains. Excluded instantaneous roots cannot establish self-hit closure. Missing energy or stability calculations remain explicit limitations.

## Scope of the Preliminary Result

Tier 0 can only answer a finite branch-search question: does this reduced carrier chart have an active root ledger, controlled chart residuals, and no unresolved near-zero self-root obstruction?

It cannot answer the attractor question, because that requires Tier 1 direct delayed dynamics and a positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$. It cannot answer the mass-map question, because that requires Tier 2 energy and shielding extraction. It cannot answer the inertial-response question, because that requires Tier 3 acceleration and gradient probes for $\mathcal{M}_{\text{sea}}^{ab}$.

The safe reading is therefore:

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{eligible for Tier 1 continuation}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2ce658272c030da8)

not

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{accepted } A_0 \text{ attractor}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-04837b449761ec48)

These implications distinguish preliminary geometric consistency from dynamical and mass-map results. The negative direction is bounded the same way: a Tier 0 failure or an empty candidate set means that this chart, on this search domain, did not earn a continuation run; it does not establish that no $A_0$ branch exists.

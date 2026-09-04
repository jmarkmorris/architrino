# $A_0$ Tier 0 Result Interpretation: Reduced Branch Search

This note explains the mathematical information supplied by a reduced $A_0$ branch search. It is a companion to the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](run-protocols.md), and the convergence standards in [Convergence Tests](convergence-tests.md).

Tier 0 tests whether a reduced branch chart satisfies the geometric and numerical conditions for continuation. It does not establish that the branch is physically realized, stable under the full delayed dynamics, or sufficient to support a mass-map claim.

A candidate geometry can satisfy preliminary consistency conditions without being a physical attractor. The distinction separates a useful search result from evidence for a stable assembly.

Tier 0 is not an attractor proof. It specifies consistency conditions for a reduced carrier chart before Tier 1 $\eta > 0$ continuation. Any future output must be read together with the mass thesis in [Particle Masses](../../assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../dynamics/energy.md), the dynamics baseline in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and the closure bookkeeping in [Parameter Ledger](../parameter-ledger.md).

No computed branch-search result is reported here. The conditions below define a proposed analysis and the limits of any result obtained from it.

## Interpretation of a Candidate

A preliminary analysis distinguishes reduced coordinates, active causal roots, residual errors, and uncomputed dynamical quantities. Global rotations, the common closed-cycle phase, and permitted discrete relabelings must not be counted as distinct physical configurations. Excluded instantaneous self roots must not count as active interactions. Each residual requires a value or an explicit statement that it has not been evaluated.

Satisfying the preliminary conditions makes a geometry eligible for direct delayed-dynamics analysis. It does not establish an attractor, compute $\zeta(A_0)$, validate $E_{\text{internal}}(A_0)$, or derive $\mathcal{M}_{\text{sea}}^{ab}$.

Failure of a compact coordinate chart does not falsify every possible $A_0$ branch. A revised chart must specify its geometry, equality relations, adjustable parameters, held-out residual tests, phase convention, and excluded benchmarks before fitting. A successful coordinate test still supplies no evolved history.

## Quotient-Coordinate Row

The reduced coordinate $z_\Lambda$ describes the geometry after quotienting away global rotations, the common $S^1_{\mathbf{k}}$ phase gauge, and allowed discrete relabelings $\Gamma_\Lambda$ that preserve polarity assignment, layer roles, speed ordering, and the [causal-root](../../foundations/architrino.md) branch class identifying which earlier emissions reach the receiver.

For this protocol only, the source-record layer aliases map to persistent indices by
$$
I\leftrightarrow1,\qquad M\leftrightarrow2,\qquad O\leftrightarrow3.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf884bbe20f012b6)

Persistent indices identify the binaries. The aliases describe the declared radial role on this one chart and do not relabel the taxonomy.

| Geometric information | Meaning |
| --- | --- |
| Radius ratios | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| Period ratios | $P_I/P_M$ and $P_M/P_O$, where $P_I,P_M,P_O$ are the cycle periods for the declared layer aliases, so time-scale separation is checked alongside radius separation |
| Binary-2 speed offset | $(s_2-c_f)/c_f$ in the declared chart |
| Ellipticity | layer ellipticity data and whether Tier 0 used a shared scalar chart |
| Plane-normal Gram matrix | $G_{\ell m}$ values for the quotient-reduced binary-plane normals |
| Orientation | $\chi_N$, the triple product, and a nondegenerate or degenerate status |
| Circulation orientation | $H_1,H_2,H_3$ persistent-index handedness labels, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| Relative phase | $\Phi_{\text{rel}}$ status after removing the common $S^1_{\mathbf{k}}$ phase origin; a gauge-fixed zero-offset representative alone does not establish the full phase quotient |
| Branch class | $[\Lambda]$ data from winding integers, inter-layer closure, active and raw root classes, and excluded roots; the representative is not yet a certified discrete quotient |
| Removed symmetries | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| Coordinate degeneracy | Failure of the proposed coordinate to distinguish the relevant geometric configurations after symmetry reduction |

The quotient row is not a new dynamical assumption. It is the coordinate audit that prevents a raw carrier chart, a gauge choice, and a branch class from being mistaken for three independent pieces of physics.

## Near-Zero Self-Root Policy

The preliminary analysis distinguishes raw self-root sightings from active self-hit branches. A raw self root whose delay lies at the configured near-zero threshold is recorded but excluded from the active ledger as an instantaneous self-kick.

This policy follows the canonical convention $H(0)=0$: an instantaneous self-kick is not an active causal hit. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted.

The specified fold-layer diagnostic may preserve locked self-root contributions as a candidate transition, but it does not by itself establish self-hit closure. A fold-layer candidate must satisfy the declared residual conditions in a corrected one-period branch-equation calculation; $\Delta_{\mathbf{k}}$ and persistence under $\eta$ refinement require additional analysis.

## Residual Semantics

The complete residual vector is
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
| $\mathcal{R}_{\text{state}}$ | Carrier-chart return mismatch over one declared period |
| $\mathcal{R}_{\text{root}}$ | Active root defect on candidate causal-root branches |
| $\mathcal{R}_{\text{phase}}$ | Integer layer-winding mismatch |
| $\mathcal{R}_{E}$ | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering |
| $\mathcal{R}_{\text{avg}}$ | Diagnostic size of terms claimed to average out |
| $\mathcal{R}_{\text{lock}}$ | Diagnostic fraction or defect of selected locking terms |
| $\mathcal{R}_{\text{leak}}$ | Far-field leakage placeholder, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without pretending that Tier 0 has done Tier 1 or Tier 2 work.

## Floquet Stability

Tier 0 does not construct the monodromy operator, which describes perturbation evolution over one period. The non-symmetry Floquet gap $\Delta_{\mathbf{k}}$ is therefore uncomputed, not zero and not positive. A stability conclusion requires Tier 1 to construct the return map and evaluate the gap after excluding symmetry modes. A computed $\Delta_{\mathbf{k}}\le0$ fails the stated attractor criterion.

## Preliminary Consistency Conditions

The reduced geometry must have nondegenerate quotient coordinates, retain its declared radius and period separation, satisfy $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ within tolerance, and close its layer windings over $P_{\mathbf{k}}$. State-return, center-drift, and active-root residuals must be bounded. Partner, self, and inter-layer active root classes must be accounted for, and active separator roots require an explicit continuation rule.

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

These implications distinguish preliminary geometric consistency from dynamical and mass-map results.

# OpenAlex Baseline for Master-Equation Closure

## Query Scope

Queried: 2026-05-18.

Method: OpenAlex `works` searches were sorted by `cited_by_count:desc`, following the OpenAlex guidance that work lists and searches can be ordered by citation count. The source lanes were chosen from the rank-1 workstream, not from a generic keyword search:

- delayed functional dynamics, state-dependent delays, and neutral functional equations;
- direct-action / action-at-a-distance electrodynamics as the closest historical delayed-interaction baseline;
- Lorentz, preferred-frame, PPN, and effective-metric recovery tests.

OpenAlex method references:

- [How do I find the most cited publications?](https://help.openalex.org/hc/en-us/articles/27219504981655-How-do-I-find-the-most-cited-publications)
- [List works - OpenAlex Developers](https://developers.openalex.org/api-reference/works/list-works)

Citation counts below are OpenAlex `cited_by_count` values at query time. They are prioritization signals, not claims that every highly cited work should become a closure target.

## Selected Top Publications

### Delayed Functional Dynamics

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

### Direct-Action And Delayed Electrodynamics

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

### Lorentz, PPN, Preferred-Frame, And Effective-Metric Recovery

All selected rows in this lane were mined on May 19, 2026 and moved to the completed-mining ledger in [chapter-authoring](../chapter-authoring/chapter-authoring.md#mining-completed). The retained synthesis is below.

## Source Signals And Outcomes

1. History-space discipline from functional differential equations.
   Outcome: edited now in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). The new state-dependent delay compatibility condition makes $\mathfrak{B}$ a local history-chart object, not only a finite root table.

2. State-dependent delay smoothness.
   Outcome: edited now in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). Active root offsets $s_\ell(\phi)$ must be $C^1$ functions of retained histories on a chart tube while Jacobian floors and inactive gaps remain positive.

3. Neutral functional equation warning.
   Outcome: converted into a theorem target here, not yet promoted as settled corpus prose. If a branch-reduced law depends on delayed velocities through $J^{-1}$, Noether wake increments, or boundary terms, then the proof packet must declare whether the functional is delayed-state, derivative-sensitive, or neutral-type on the retained history chart and provide the corresponding continuity estimate.

4. Direct-action electrodynamics.
   Outcome: comparison tool only. The safe AAA linkage is action-level accounting: conservation and radiation-like bookkeeping must be read through wake-history Noether increments, not through local mechanical energy alone. Advanced absorber ontology and time-symmetric action are not imported.

5. Direct-action radiation/reaction provenance.
   Outcome: converted into a theorem-target residual, not imported as source ontology. A radiation, damping, or reaction claim must close energy transfer through the same retained branch rows, endpoint convention, Jacobian floors, inactive gaps, and Noether wake-history charge used by the force residual.

6. Almost-circular direct-action orbit literature.
   Outcome: linkage to `circular_asymptotics`. This source family strengthens the local expectation that circular delayed two-body claims require branchwise asymptotics, Jacobian-floor control, and finite-root accounting before any no-go or existence theorem is promoted.

7. Lorentz/GR empirical baseline.
   Outcome: already mostly represented in the Lorentz/GR bridge contract. The OpenAlex sweep confirms that the baseline should remain PPN plus preferred-frame leakage plus direct two-way anisotropy tests, not a single qualitative statement that Lorentz behavior emerges.

8. Lorentz coefficient discipline.
   Outcome: split the bridge residual into moving-assembly contraction, clock retuning, two-way preferred-frame anisotropy, Cassini/Shapiro $\gamma_{\mathrm{PPN}}$, the PPN decision vector, SME-style leakage projection, and high-energy channel speed splitting. These are projections of one branch/medium record, not interchangeable tests.

9. Analogue-gravity baseline.
   Outcome: comparison framework. It supports the corpus distinction between "effective metric can emerge from a medium" and "this specific Noether-Sea constitutive map has been derived." No new requirement card is needed because [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) already has the ADM/Cartan coefficient rows and shared-record residual.

10. False positives and rejected source directions.
   Outcome: rejected for this pass. Broad OpenAlex queries pulled in ecology, population dynamics, Planck cosmology, $f(R)$ gravity, entropic gravity, laser-plasma acceleration, and QCD. These may be useful elsewhere, but they do not improve the rank-1 master-equation closure route more than the native delayed-dynamics, direct-action, and Lorentz-test lanes above.

## Concrete Mathematical Advance

The source sweep sharpens the branch-chart closure object into a local history-manifold theorem target.

Solution-manifold target. A retained branch chart does not evolve on arbitrary $C^1$ histories. It evolves on the compatibility manifold
$$
\mathcal{X}_{\mathfrak{B}}
=
\left\{
\phi\in\mathcal{U}_{\mathfrak{B}}:
\dot{\phi}(0)=\mathcal{G}_{\mathfrak{B}}(\phi)
\right\},
$$
with tangent histories satisfying
$$
\dot{\psi}(0)=D\mathcal{G}_{\mathfrak{B}}(\phi)\psi.
$$
This is the chart-level version of the solution-manifold warning: monodromy, branch continuation, and Floquet rows must differentiate the certified branch map on compatible histories, not on a free ambient history space.

Definition target. For a retained branch chart $\mathfrak{B}$ with memory horizon $h$, define a chart tube
$$
\mathcal{U}_{\mathfrak{B}}
\subset
C^1([-h,0],(\mathbb{R}^3)^N)
$$
around the returned history segment. Each active root row $\ell=(i,j,t,t_{0,\ell})$ is represented by an emission offset $s_\ell(\phi)\in[-h,0)$ satisfying
$$
F_\ell(\phi,s_\ell(\phi))
=
\|\phi_i(0)-\phi_j(s_\ell(\phi))\|
-c_f(0-s_\ell(\phi))
=0.
$$
The branch chart is history-compatible when
$$
|\partial_sF_\ell(\phi,s_\ell(\phi))|
\ge c_f\nu_J>0
$$
for every active row, every inactive complement keeps a positive gap, and the maps
$$
\phi\mapsto
\left(
s_\ell(\phi),
\hat{\mathbf r}_\ell(\phi),
J_\ell(\phi),
\mathbf a_\ell(\phi)
\right)
$$
are $C^1$ on $\mathcal{U}_{\mathfrak{B}}$. This is the exact compatibility condition that lets the Master EOM be treated as a locally replayable delayed functional system rather than a one-time root enumeration.

Neutral-dependence target. If the reduced chart functional uses delayed source velocities or wake-boundary derivatives, add a declared derivative-sensitive component
$$
\mathcal{N}_{\mathfrak{B}}:
\mathcal{U}_{\mathfrak{B}}
\to
\mathbb{R}^{3N}
$$
and prove a chart-local estimate of the form
$$
\|\mathcal{N}_{\mathfrak{B}}(\phi)-\mathcal{N}_{\mathfrak{B}}(\psi)\|
\le
L
\left(
\|\phi-\psi\|_{C^1([-h,0])}
+\sum_\ell |s_\ell(\phi)-s_\ell(\psi)|
\right),
$$
with constants stable under the declared $\eta$ and $\epsilon_c$ refinement schedule. Without this estimate, a branch may pass a pointwise root ledger while still failing as a well-posed local delayed functional equation.

Radiation/reaction provenance target. Direct-action comparison sources sharpen the conservation pullback into the residual
$$
\mathcal{R}^{(\eta)}_{\mathrm{prov}}(W)=
\Delta_W\!\left(K_\mu+E_{\mathrm{wake,eff}}^{(\eta)}\right)
+\mathcal{F}_{\partial W}^{(\eta)}
+\mathcal{Q}_{\mathrm{sea/heat}}^{(\eta)}
-\int_W\sum_i \mathbf{v}_i\cdot\mathbf{R}_i^{(\eta)}\,dt .
$$
Radiation, damping, or reaction claims pass only when this residual tends to zero on the same retained branch rows, endpoint convention, Jacobian floors, inactive gaps, and Noether wake-history charge used by the force residual.

Lorentz/GR bridge residual target. For a bridge parameter record $\theta$, branch class $q$, and window $W$, use the split residual
$$
\mathcal{R}_{\mathrm{Lor/GR}}(\theta,q;W)
=
\left(
R_{\parallel}^{(q)},
R_T^{(q)},
\sup_{\beta_\star,\vartheta}|\Delta_{\mathrm{tw,PF}}^{(q)}|,
R_{\mathrm{Cassini}},
\mathbf{p}_{\mathrm{PPN}},
\Pi_{\mathrm{SME}}^{\mathrm{eff}}(\theta),
\delta c_A(E)/c_0
\right),
$$
where
$$
R_{\mathrm{Cassini}}
=
\frac{(\gamma_{\mathrm{eff}}-1)-2.1\times10^{-5}}{2.3\times10^{-5}},
\qquad
\mathbf{p}_{\mathrm{PPN}}
=
(\gamma_{\mathrm{eff}}-1,\beta_{\mathrm{eff}}-1,\alpha_1,\alpha_2,\alpha_3).
$$
The point of the residual is separation: moving-assembly closure, two-way anisotropy, weak-field PPN recovery, SME-style leakage, and high-energy channel splitting are all required projections of the same record.

## Initial AAA Linkages

| Target | Linkage | Status |
| --- | --- | --- |
| [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) | Add state-dependent delay compatibility to the branch-chart closure object. | Edited now. |
| [effective-lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md) | Direct-action sources support keeping action-level wake-history charges separate from force-only diagnostics. | High-value follow-up only if the action kernel is revised again. |
| [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md) | Mansouri-Sexl and modern resonator tests reinforce the need to separate synchronization conventions, moving-assembly deformation, clock retuning, and two-way leakage. | Already mostly represented; no edit needed in this pass. |
| [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) | Will, Cassini, and analogue-gravity baselines support the existing shared-record ADM/Cartan residual rather than a scalar-delay metric shortcut. | Already represented; no edit needed in this pass. |
| [ppn-parameters](../../../content/markdown/aaa/spacetime/ppn-parameters.md) | Will, Bertotti-Iess-Tortora, and Kostelecky/Bailey define the empirical coefficient baseline for $\gamma_{\mathrm{PPN}}$, $\beta_{\mathrm{PPN}}$, and $\alpha_i$. | Candidate audit target after moving-assembly extraction advances. |
| [constraint-ledger](../../../content/markdown/aaa/validation/constraint-ledger.md) | Modern Michelson-Morley, resonator, atom-clock, and SME bounds remain the acceptance surface for preferred-frame hiding. | Existing gate is sufficient; do not add another gate. |

## Next Use

Use this baseline when advancing the rank-1 workstream:

1. For `circular_asymptotics`, consume the circular derivative-sensitive branch-history packet now added to [master-equation-closure](master-equation-closure.md): partner and self rows must report delayed-state root equations, derivative-sensitive branch weights, Jacobian floors, root-transport residuals, signed radial/tangential residuals, sampled finite-band branch-table status, executable certificate status, interval-certificate status, and Jacobian-null finite-crossing status before a bare-kernel circular verdict is promoted. The high-speed equal-magnitude residual obstruction is now promoted to [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), and the finite-band numerical plus outward-rounded interval support certificate now passes with stable active-root ledgers, a trig-free residual backend, checked root-bracket rows, and a complete finite-band inactive-gap ledger; the remaining use is theorem-grade closure of the same table with an analytic high-speed tail remainder.
2. For `spiral_branch_chart_test`, consume the VP-1 history-compatibility row now added to [master-equation-closure](master-equation-closure.md): $C^1$ root-offset dependence, inactive-gap persistence, and root-transport residual must pass before the radial-turn and weighted tangential-drive verdicts are interpreted.
3. For `lorentz_gr_bridge`, keep the empirical baseline split into moving-assembly extraction, two-way anisotropy, PPN coefficients, and SME-style preferred-frame leakage; do not treat any one of those as a substitute for the others.

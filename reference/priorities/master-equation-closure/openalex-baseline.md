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

| OpenAlex work | Publication | Year | Cited by | AAA-relevant baseline |
| --- | --- | ---: | ---: | --- |
| [W2079871064](https://openalex.org/W2079871064) | Jack K. Hale, *Theory of Functional Differential Equations* | 1977 | 6854 | History-space formulation and local solution theory are the baseline for treating the Master EOM as more than an instantaneous root list. |
| [W1607633954](https://openalex.org/W1607633954) | Hale and Verduyn Lunel, *Introduction to Functional Differential Equations* | 1993 | 5673 | Standard reference for finite-memory delayed dynamics, semigroups, stability, and well-posedness discipline. |
| [W2047017331](https://openalex.org/W2047017331) | Kolmanovskii and Myshkis, *Introduction to the Theory and Applications of Functional Differential Equations* | 1999 | 1595 | Broad FDE toolkit for delayed systems with applications and stability burdens. |
| [W1550341792](https://openalex.org/W1550341792) | Bellen and Zennaro, *Numerical Methods for Delay Differential Equations* | 2003 | 972 | Numerical DDE baseline for convergence, interpolation, and residual reporting in simulation packets. |
| [W2045256358](https://openalex.org/W2045256358) | R. D. Driver, *Ordinary and Delay Differential Equations* | 1977 | 858 | Classic source for turning delayed equations into controlled history problems. |
| [W1535375949](https://openalex.org/W1535375949) | Hartung, Krisztin, Walther, and Wu, "Functional Differential Equations with State-Dependent Delays" | 2006 | 312 | Closest baseline for root-dependent delay maps, solution manifolds, and smoothness requirements. |
| [W1988906184](https://openalex.org/W1988906184) | Walther, "The solution manifold and C1-smoothness for differential equations with state-dependent delay" | 2003 | 166 | Directly relevant to branch charts: active roots must depend smoothly on retained histories, not merely solve at one time. |
| [W1982830050](https://openalex.org/W1982830050) | Hale, "Strong stabilization of neutral functional differential equations" | 2002 | 252 | Neutral-type warning for branch laws whose reduced formulas depend on delayed velocities or derivative-sensitive boundary terms. |

### Direct-Action And Delayed Electrodynamics

| OpenAlex work | Publication | Year | Cited by | AAA-relevant baseline |
| --- | --- | ---: | ---: | --- |
| [W2043777936](https://openalex.org/W2043777936) | Wheeler and Feynman, "Interaction with the Absorber as the Mechanism of Radiation" | 1945 | 1262 | Direct interparticle interaction and radiation accounting are the historical comparison baseline; advanced absorber ontology is not imported. |
| [W2090853324](https://openalex.org/W2090853324) | Wheeler and Feynman, "Classical Electrodynamics in Terms of Direct Interparticle Action" | 1949 | 984 | Confirms that action-level bookkeeping is the right comparison tier for delayed interparticle laws. |
| [W2036889612](https://openalex.org/W2036889612) | Hoyle and Narlikar, "Cosmology and action-at-a-distance electrodynamics" | 1995 | 101 | Useful as a global-boundary warning: radiation and reaction closure cannot be read from local mechanical energy alone. |
| [W2065112792](https://openalex.org/W2065112792) | Kerner, "Hamiltonian Formulation of Action-at-a-Distance in Electrodynamics" | 1962 | 53 | Supports the priority of action/Hamiltonian structure over ad hoc force-only conservation language. |
| [W2066322325](https://openalex.org/W2066322325) | Andersen and von Baeyer, "Almost Circular Orbits in Classical Action-at-a-Distance Electrodynamics" | 1972 | 31 | Directly adjacent to the current circular-asymptotics lane, though the AAA force law and self-hit structure are native and different. |
| [W1973687901](https://openalex.org/W1973687901) | Andersen and von Baeyer, "Solutions of the Two-Body Problem in Classical Action-at-a-Distance Electrodynamics: Straight-Line Motion" | 1972 | 22 | Comparison source for finite two-body solution classes under direct delayed interaction. |

### Lorentz, PPN, Preferred-Frame, And Effective-Metric Recovery

| OpenAlex work | Publication | Year | Cited by | AAA-relevant baseline |
| --- | --- | ---: | ---: | --- |
| [W2166436681](https://openalex.org/W2166436681) | Clifford M. Will, "The Confrontation between General Relativity and Experiment" | 2014 | 3826 | Primary PPN and GR-test baseline for weak-field closure. |
| [W2128828294](https://openalex.org/W2128828294) | Colladay and Kostelecky, "Lorentz-violating extension of the standard model" | 1998 | 2385 | Baseline for field-level Lorentz-violation parameter discipline. |
| [W2154120281](https://openalex.org/W2154120281) | Bertotti, Iess, and Tortora, "A test of general relativity using radio links with the Cassini spacecraft" | 2003 | 1978 | Concrete Shapiro / $\gamma_{\mathrm{PPN}}$ benchmark already named in the priority workstream. |
| [W2163842679](https://openalex.org/W2163842679) | Kostelecky, "Gravity, Lorentz violation, and the standard model" | 2004 | 1353 | Gravity-side Lorentz-violation framework for preferred-frame leakage language. |
| [W2149558418](https://openalex.org/W2149558418) | Coleman and Glashow, "High-energy tests of Lorentz invariance" | 1999 | 1150 | High-energy Lorentz-test pressure; useful as constraint context, not as AAA mechanism. |
| [W3037613900](https://openalex.org/W3037613900) | Barcelo, Liberati, and Visser, "Analogue Gravity" | 2005 | 1151 | Confirms effective-metric emergence from a medium is a legitimate comparison class, but not a proof of the AAA constitutive map. |
| [W2110067346](https://openalex.org/W2110067346) | Mattingly, "Modern Tests of Lorentz Invariance" | 2005 | 1065 | Survey baseline for modern Lorentz-invariance tests and energy-dependent leakage. |
| [W2125169989](https://openalex.org/W2125169989) | Mansouri and Sexl, "A test theory of special relativity: I. Simultaneity and clock synchronization" | 1977 | 441 | Kinematic test-theory baseline for separating synchronization conventions from dynamical contraction and clock retuning. |
| [W1976919665](https://openalex.org/W1976919665) | Muller, Herrmann, Braxmaier, Schiller, and Peters, "Modern Michelson-Morley Experiment using Cryogenic Optical Resonators" | 2003 | 306 | Two-way anisotropy benchmark for preferred-frame hiding. |
| [W2048532920](https://openalex.org/W2048532920) | Herrmann et al., "Rotating optical cavity experiment testing Lorentz invariance at the 10^-17 level" | 2009 | 186 | Confirms the current workstream's sub-$10^{-17}$ leakage scale. |

## Source Signals And Outcomes

1. History-space discipline from functional differential equations.
   Outcome: edited now in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). The new state-dependent delay compatibility condition makes $\mathfrak{B}$ a local history-chart object, not only a finite root table.

2. State-dependent delay smoothness.
   Outcome: edited now in [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md). Active root offsets $s_\ell(\phi)$ must be $C^1$ functions of retained histories on a chart tube while Jacobian floors and inactive gaps remain positive.

3. Neutral functional equation warning.
   Outcome: converted into a theorem target here, not yet promoted as settled corpus prose. If a branch-reduced law depends on delayed velocities through $J^{-1}$, Noether wake increments, or boundary terms, then the proof packet must declare whether the functional is delayed-state, derivative-sensitive, or neutral-type on the retained history chart and provide the corresponding continuity estimate.

4. Direct-action electrodynamics.
   Outcome: comparison tool only. The safe AAA linkage is action-level accounting: conservation and radiation-like bookkeeping must be read through wake-history Noether increments, not through local mechanical energy alone. Advanced absorber ontology and time-symmetric action are not imported.

5. Almost-circular direct-action orbit literature.
   Outcome: linkage to `circular_asymptotics`. This source family strengthens the local expectation that circular delayed two-body claims require branchwise asymptotics, Jacobian-floor control, and finite-root accounting before any no-go or existence theorem is promoted.

6. Lorentz/GR empirical baseline.
   Outcome: already mostly represented in the Lorentz/GR bridge contract. The OpenAlex sweep confirms that the baseline should remain PPN plus preferred-frame leakage plus direct two-way anisotropy tests, not a single qualitative statement that Lorentz behavior emerges.

7. Analogue-gravity baseline.
   Outcome: comparison framework. It supports the corpus distinction between "effective metric can emerge from a medium" and "this specific Noether-Sea constitutive map has been derived." No new requirement card is needed because [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) already has the ADM/Cartan coefficient rows and shared-record residual.

8. False positives and rejected source directions.
   Outcome: rejected for this pass. Broad OpenAlex queries pulled in ecology, population dynamics, Planck cosmology, $f(R)$ gravity, entropic gravity, laser-plasma acceleration, and QCD. These may be useful elsewhere, but they do not improve the rank-1 master-equation closure route more than the native delayed-dynamics, direct-action, and Lorentz-test lanes above.

## Concrete Mathematical Advance

The source sweep sharpens the branch-chart closure object into a local history-manifold theorem target.

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

1. For `circular_asymptotics`, consume the circular derivative-sensitive branch-history packet now added to [master-equation-closure](master-equation-closure.md): partner and self rows must report delayed-state root equations, derivative-sensitive branch weights, Jacobian floors, root-transport residuals, signed radial/tangential residuals, sampled finite-band branch-table status, executable certificate status, interval-certificate status, and Jacobian-null finite-crossing status before a bare-kernel circular verdict is promoted. The high-speed equal-magnitude residual obstruction is now promoted to [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md), and the finite-band numerical certificate now passes; the remaining use is directed-rounding interval proof of the same table plus an analytic high-speed tail remainder.
2. For `spiral_branch_chart_test`, consume the VP-1 history-compatibility row now added to [master-equation-closure](master-equation-closure.md): $C^1$ root-offset dependence, inactive-gap persistence, and root-transport residual must pass before the radial-turn and weighted tangential-drive verdicts are interpreted.
3. For `lorentz_gr_bridge`, keep the empirical baseline split into moving-assembly extraction, two-way anisotropy, PPN coefficients, and SME-style preferred-frame leakage; do not treat any one of those as a substitute for the others.

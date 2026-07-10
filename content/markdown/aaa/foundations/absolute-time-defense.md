# Absolute Time Defense

This chapter states why absolute time is the theory's fundamental evolution parameter. The key distinction is simple but load-bearing: absolute time is the variable used by the [master equation](../dynamics/master-equation.md); a simultaneity slice is the complete substrate state at one value of that variable; proper time is the derived readout of a physical clock assembly.

The teaching sequence is deliberately layered. First comes the ontological claim about absolute time and the Euclidean void. Then comes the dynamical claim about universe-state evolution on those simultaneity slices. Only after those claims are fixed does the chapter introduce proper time, clock-rate extraction, and relativistic observer inferences. It is the argumentative companion to [Ontology](./ontology.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

## The Case for Absolute Time ($T$)

1. **Fundamental evolution parameter**: Absolute time $T$ is the unique evolution parameter of the master equation.
2. **Product substrate**: The kinematic background is the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$ with clock projection $\pi_T:\mathcal{M}\to\mathbb{R}$.
3. **Unique foliation**: The simultaneity slice at fixed $T_\ast$ is the level set
   $$
   \Sigma_{T_\ast} = \pi_T^{-1}(\{T_\ast\}) = \{T_\ast\}\times \mathbb{R}^3
   $$
4. **Substrate clock form**: The substrate clock form $dT$ is exact, closed, and nowhere vanishing as the pullback from the $\mathbb{R}$ factor. Together with the chosen orientation of increasing $T$, it fixes the tangent planes to the slices $\Sigma_T$; foliation ambiguity is absent at the substrate level rather than removed by coordinate gauge.
5. **Derived clock time**: Proper time $\tau$ is not fundamental; it is a derived functional of Noether braid internal phase dynamics.

The list separates what exists at the substrate level from what embedded observers can read. Absolute time, the Euclidean void, and the slices $\Sigma_T$ are substrate commitments. Proper time, clock synchronization, and relativistic simultaneity judgments are effective readouts produced by assemblies embedded in the Noether sea. The defense of absolute time therefore does not deny observed clock dilation; it relocates clock dilation from fundamental temporal ontology to derived assembly dynamics.

A useful comparison with relativistic block-universe arguments is the distinction between absolute time, the substrate-level simultaneity slice, and the observer-readable present. Absolute time $T$ is fundamental. The complete slice $\mathbb{U}_{\text{now}}\equiv S(T)$ is substrate-level: it is the full universe state at one value of $T$, not a clock reading available to embedded observers. Special relativity correctly removes any observer-accessible global three-space: a Physical Observer cannot synchronize distant records into one public present without using clocks, rulers, and signal conventions that must themselves satisfy Lorentz tests. The observer-facing obligation is therefore to show why attempts to read the absolute foliation through matter clocks, photon synchronization, CMB rest-frame comparison, or gravitational channels collapse to an effective Lorentz or metric reconstruction with preferred-frame leakage below the declared bounds.

A cosmological frame such as the CMB rest frame can be a useful effective foliation for data reduction, but it is not absolute time itself and does not expose the substrate clock form. It supplies a large-scale observer record only after photon transport, source evolution, and receiver cadence are modeled; it cannot by itself license an exact observer-readable global present.

## Absolute Time, Global Foliation, and Proper Time

**Absolute time $T$ and universe state**
- The $\mathbb{U}_{\text{now}}$ perspective indexes the exact microstate as $S(T)$ on each slice $\Sigma_T$.
- On each $\Sigma_T$, the spatial metric is Euclidean: $h_{ij}=\delta_{ij}$.
- Absolute time is substrate structure, not a coordinate gauge choice.

At this level, $\mathbb{U}_{\text{now}}\equiv S(T)$ is not an observer's reconstruction of events. It is the complete ontic universe state on a simultaneity slice, including constituent positions, velocities, polarities, path-history data, and any branch information required by the delayed dynamics. Observers infer only a coarse-grained portion of this state through clocks, rulers, signals, and records.

Because the master equation is path-history dependent, the complete state on a slice is not merely an instantaneous Markov projection. The precise schematic form is
$$
S(T)
=
\big(
X(T),
H_T,
\mathcal{N}_{\mathrm{sea}}(T,\cdot),
\mathcal{B}_T
\big)
$$
where $X(T)$ contains instantaneous architrino and assembly data, $H_T$ is the path-history and provenance ledger, $\mathcal{N}_{\mathrm{sea}}$ is the retained Noether sea state, and $\mathcal{B}_T$ records the active branch chart or regularization data. Determinism applies to this complete history state, not to a history-free slice projection.

The branch-chart entry is not an observer bookkeeping choice imported into the substrate. $\mathcal{B}_T$ is ontic only insofar as it records which attractor basin, active causal-root labels, and regularization regime the deterministic history $H_T$ actually occupies. A different analyst may choose different coordinates for describing that branch, but cannot choose a different occupied basin without changing $S(T)$ itself.

**Deterministic evolution and basin selection**
- The delay-differential master equation is deterministic: where the declared branch chart or regularization makes the evolution well posed, a fully specified $\mathbb{U}_{\text{now}}\equiv S(T_\ast)$, including the required path-history and provenance ledger, generates a unique trajectory $S(T)$ for $T>T_\ast$.
- Apparent branching is multistability, not stochastic evolution: near separatrices, infinitesimal perturbations in initial microstate direct trajectories into different attractor basins.
- Therefore the correct statement is basin selection under deterministic flow, not a "distribution of allowed configurations" from one exact state.

This is a claim about the exact substrate flow, not about practical prediction. A finite observer may lack the path-history resolution needed to know which basin the system occupies, but that ignorance is inferential. It does not convert a single exact state into many simultaneous ontic futures.

**Proper time $\tau$ for physical observers**

Physical clocks are Noether braid assemblies. Their ticks are internal limit-cycle phase advances, so the primary definition is phase extraction, not an arbitrary scalar fit:
$$
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}},
\qquad
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
=
\frac{
\Omega_{\mathcal A}
\left(
\mathbf{w},
\mathcal{N}_{\mathrm{sea}},
R_{\mathcal A},
H_{\mathcal A}
\right)
}{
\Omega_{\mathcal A}^{(0)}
}
$$
Here $\varphi_{\mathcal A}$ is the declared clock phase, $\Omega_{\mathcal A}^{(0)}$ is its rest-branch reference rate, $R_{\mathcal A}$ is the clock assembly orientation and geometry record, and $H_{\mathcal A}$ is the relevant path-history ledger. Both $\Omega_{\mathcal A}$ and $\Omega_{\mathcal A}^{(0)}$ are phase rates per unit effective time $t_{\mathrm{eff}}$, so the ratio is dimensionless. The relative velocity entering the clock channel is
$$
w^i_{\mathcal A}
=
\frac{dx^i_{\mathcal A,\mathrm{eff}}}{dt_{\mathrm{eff}}}
-
u^i_{\mathrm{sea,eff}}
$$
is velocity relative to the local Noether sea flow in the observer-level bookkeeping map for the clock worldline $x^i_{\mathcal A,\mathrm{eff}}(t_{\mathrm{eff}})$.

This phase extraction is admissible only on a clock branch whose internal return map retains a hyperbolic attracting limit cycle with a unique rotation number. In plain terms, the assembly must keep returning to the same countable cycle before it can function as a clock. More explicitly, let $P_{\mathcal A}$ be the Poincare return map on the retained clock branch and let $\tilde P_{\mathcal A}$ be a lift of its action on the invariant phase circle. The clock rotation number is
$$
\rho_{\mathcal A}
=
\lim_{n\to\infty}
\frac{\tilde P_{\mathcal A}^{\,n}(\theta)-\theta}{n}
\quad \mathrm{mod}\ 1
$$
defined mod 1 through the choice of lift. When $P_{\mathcal A}$ restricted to the retained clock circle is an orientation-preserving homeomorphism, this limit exists and is independent of $\theta$; that invertibility is the real hypothesis. If the restriction is only degree-one and non-invertible, the rotation set can be an interval rather than a point, and clock validity requires it to collapse to a point. The clock-validity domain is the parameter region where $P_{\mathcal A}$ restricted to the clock circle is topologically conjugate to a rigid rotation, or reduces to a unique normally hyperbolic periodic orbit with a well-defined phase advance. In that regime $\varphi_{\mathcal A}$ can be chosen continuously and $\Omega_{\mathcal A}$ is a branch observable. If the moving or dressed branch loses normal hyperbolicity through a saddle-node of cycles, torus breakdown, quasiperiodic transition, loss of return-map invertibility with an open rotation interval, or collapse of the cycle-stability floor, then a single rotation number no longer exists and $d\tau_{\mathcal A}$ is undefined for that branch. That event is a clock-failure mode, not a new proper-time law; in simulation it appears as a Floquet or Lyapunov-spectrum sign change in the transverse clock-cycle directions.

In the Noether-braid clock class, this is the observer-side use of the [candidate and certified braid](../noether-braid/noether-braid-configuration-space.md#candidate-and-certified-braids) distinction. A physical clock is an admitted branch whose retained record returns under the delayed return map, modulo only true neutral symmetries, with a positive non-symmetry Floquet margin. Its declared clock phase $\varphi_{\mathcal A}$ is the rotation coordinate of that relative periodic orbit. Thus the clock-validity certificate can be written schematically as
$$
\mathcal R_{\mathrm{cert}}(\mathcal A)
\le
\epsilon_{\mathrm{cert}},
\qquad
\Delta_{\mathrm{Floquet}}^{\perp}(\mathcal A)>0.
$$
The certificate condition is open: a normally hyperbolic phase-locked cycle with positive Floquet margin persists under small perturbations of the dressing and retained record, which is why certified clocks are robust standards rather than fine-tuned branches. Loss of this certificate is the clock instance of branch de-certification: the phase coordinate ceases to be single-valued, and $d\tau_{\mathcal A}$ is not exported.

The same condition has a memory-boundary form. A valid clock branch must replay the retained path-history window over one return, so that the memory-corrected symplectic flux has no secular remainder:
$$
\oint_{\mathrm{return}}
\omega_{\mathrm{mem},\partial[-h,0]}
=
O(\epsilon_{\omega}).
$$
This is the clock-sector reading of the branch-symplectic-promotion condition in [Effective Lagrangian](../dynamics/effective-lagrangian.md#effective-hamiltonian-domain-gate). A branch that leaks energy, symplectic area, or wake momentum through the memory boundary per cycle may still be a transient oscillator, but it is not a stable proper-time standard because its rotation number drifts.

The full local Noether sea state is the retained state record $\mathcal{N}_{\mathrm{sea}}$, for example
$$
\mathcal{N}_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
n,
u^i_{\text{sea}},
Q_{ij},
\sigma_{ij},
\nabla\rho_{\text{NS}},
\ldots
\right)
$$
The scalar $\chi_{\text{sea}}(\mathbf X,T)\equiv c_f/c_{\text{eff}}(\mathbf X,T)$ is only the Noether sea delay factor extracted for a specified channel. It is not the full Noether sea state.

A broad constitutive expression $d\tau=F(\cdots)dt_{\mathrm{eff}}$ may still be used as a schematic summary after the clock channel has been declared, but the closure target is the extracted phase functional above. Proper time is not a free scalar function assigned independently of assembly dynamics.

The integral clock-frequency form is

$$
\tau(t_{\mathrm{eff},1})-\tau(t_{\mathrm{eff},0})=\int_{t_{\mathrm{eff},0}}^{t_{\mathrm{eff},1}}\frac{\omega_{\text{clk}}(t_{\mathrm{eff}})}{\omega_0}\,dt_{\mathrm{eff}}
$$

where $\omega_{\text{clk}}(t_{\mathrm{eff}})$ is the phase rate extracted from the declared Noether braid clock channel and $\omega_0$ is its rest-branch reference frequency; this is the integral form of the same phase extraction, with $\omega_{\text{clk}}=\Omega_{\mathcal A}$ and $\omega_0=\Omega_{\mathcal A}^{(0)}$ on the declared branch. The dependencies hidden in $\omega_{\text{clk}}$ are the local causal-root ledger, the relevant path-history data, and the same Noether sea state variables used by the clock/ruler metric handoff.

This definition avoids assigning proper time as an independent scalar, but it does not by itself prove relativity-compatible clock behavior. The non-circular closure statement is stronger: after phase extraction, all admitted low-energy clock and ruler assemblies in a tested comparison class must reduce to the same observer-level clock/ruler map. Equivalently, for each clock assembly $\mathcal A$,
$$
A_{\mathcal A}
=
A+\delta A_{\mathcal A},
\qquad
B_{ij}^{(\mathcal A)}
=
B_{ij}+\delta B_{ij}^{(\mathcal A)}
$$
with the assembly-dependent remainders bounded by the clock-comparison, composition, and Lorentz-test rows below. The residual universality condition can be written schematically as
$$
\epsilon_{\mathrm{univ}}
\equiv
\sup_{\mathcal A,\mathcal B}
\max\left(
\left|
\frac{A_{\mathcal A}}{A_{\mathcal B}}-1
\right|,
\frac{
\left\|
B^{(\mathcal A)}-B^{(\mathcal B)}
\right\|
}{
\left\|
B^{(\mathcal B)}
\right\|
}
\right)
$$
with $\epsilon_{\mathrm{univ}}$ forced below the relevant residual ceilings for the comparison being made. The proposed mechanism is primitive-wake commonality: atomic, nuclear, and mechanical clocks are all architrino assemblies whose stable translating branches are solved from the same causal-wake law, causal-root ledger grammar, and Noether sea state. A moving branch should therefore deform its closed return cycles, clock periods, and ruler scales together rather than receiving separate Lorentz factors by definition.

A useful sufficient-condition target is connected-moduli dressing. Let $\mathfrak M_{\mathrm{clk}}$ denote the retained moduli component for the admitted low-energy clock and ruler branches in a comparison class, and let $\Phi_\lambda$ be the Noether sea dressing flow on that component. If all admitted clock branches lie in one connected component of $\mathfrak M_{\mathrm{clk}}$, and if the generator $D_{\mathrm{dress}}$ of $\Phi_\lambda$ preserves the topological branch labels carried by the causal-root ledger and framing data, then clock universality reduces to the failure of dressing and branch-label transport to commute:
$$
\epsilon_{\mathrm{univ}}
=
O\!\left(
\sup_{\mathcal A\in\mathfrak M_{\mathrm{clk}}}
\left\|
[D_{\mathrm{dress}},D_{\mathrm{br}}]_{\mathcal A}
\right\|
\right)
+
O(\epsilon_{\mathrm{chart}})
$$
Here $D_{\mathrm{br}}$ denotes transport along the retained branch-label flow and $\epsilon_{\mathrm{chart}}$ collects declared chart and regularization remainders. This is not yet a proof of universality; it states the topological route by which a single dressing map could move every admitted clock and ruler branch together.

This is the clock-side analogue of the mass-map universality residual $\mathcal R_{\alpha}$ in [Energy](../dynamics/energy.md#emergent-inertia-mass-from-shielded-energy). Both are flatness conditions over the connected component of realized assembly moduli: $\epsilon_{\mathrm{univ}}$ tests whether clock and ruler functionals $(A,B_{ij})$ are transported together, while $\mathcal R_{\alpha}$ tests whether the exposed inertial coefficient is transported together. If compared species lie in one connected dressed certified-braid component, the two residuals should be controlled by the same holonomy and chart remainders. If they lie in disconnected assembly topological charge sectors, composition-dependent clock leakage and mass-map non-universality can become one inter-class obstruction rather than two unrelated failures.

The dressing caveat is essential. The simple common-wake argument works only after the Noether sea dressing map descends to a shared clock/ruler channel. If one apparatus samples $c_\star=c_{\text{eff}}^{(1)}$ and another samples a different dressed channel $c_\star=c_{\text{eff}}^{(2)}$ without a common reduction to the same $A$ and $B_{ij}$, the mismatch is not hidden by the definition of $\tau$. It appears as $\Delta_{\mathcal A}^{\mathrm{comp}}$, $\Delta_{\mathcal A}^{\mathrm{ori}}$, or $\Delta_{\mathcal A}^{\mathrm{PF}}$ and must be carried as a failure pressure on the Lorentz-closure program. The clock universality row is therefore one component of the structural-integrity common-limit closure in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure), not a standalone proper-time definition.

The low-energy Lorentz-closure target for a declared clock branch has the form
$$
\frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
=
A(\mathcal{N}_{\mathrm{sea}})
\sqrt{
1-
\frac{
B_{ij}(\mathcal{N}_{\mathrm{sea}})w^iw^j
}{
c_0^2
}
}
\left[
1
+
\Delta_{\mathcal A}^{\mathrm{ori}}
+
\Delta_{\mathcal A}^{\mathrm{comp}}
+
\Delta_{\mathcal A}^{\mathrm{PF}}
+
O(w^4/c_0^4)
\right]
$$
The residuals record orientation leakage, composition dependence, and preferred-frame leakage. They must be bounded by clock-comparison and Lorentz-test rows rather than hidden inside the constitutive function. The leading orientation row should be read as the trace-free quadrupole of the clock branch's framed trajectory bundle, not as an independent nuisance. If $Q_{\mathcal A}^{ij}$ is the symmetric trace-free framing tensor
$$
Q_{\mathcal A}^{ij}
=
\left\langle
\hat n^i\hat n^j
-
\frac{1}{3}h^{ij}
\right\rangle_{\mathcal A}^{\mathrm{frame}}
$$
then the lowest anisotropic clock response has the schematic form
$$
\Delta_{\mathcal A}^{\mathrm{ori}}(\hat{\mathbf n})
=
\lambda_{\mathcal A}
Q_{\mathcal A}^{ij}
\left(
\hat n_i\hat n_j
-
\frac{1}{3}h_{ij}
\right)
+
O_{\ell\ge4}
$$
The same $Q_{\mathcal A}^{ij}$ is the matter-response source constrained by Hughes-Drever-type anisotropy tests, so the clock orientation row and the inertial-response anisotropy row are two exports of one branch certificate.

For Noether braid candidates, [Noether Braid Configuration Space](../noether-braid/noether-braid-configuration-space.md#frame-orthogonality-and-framing-anisotropy) supplies the corresponding geometric order parameter. The theorem target is sharper than near-orthogonality alone: $|D_{\mathrm{plane}}|\to1$ suppresses the non-orthogonal-frame part of the trace-free framing quadrupole $Q_{\mathcal A}^{ij}$, while small total $\|Q_{\mathcal A}\|$ also requires near-degenerate retained spectral weights, shielding, or branch averaging in the same frame extraction. If those conditions close for a clock assembly, the strict orientation row, Hughes-Drever matter anisotropy, scalar-mass anisotropy, and translating-loop Lorentz period anisotropy become different projections of one $\ell=2$ framing-isotropy condition rather than separately tuned residuals.

The residual budget is not symmetric. The defense is most exposed in the composition channel: $\Delta_{\mathcal A}^{\mathrm{comp}}$ is the residual that can survive if two stable clock species sample inequivalent dressed $c_{\text{eff}}$ channels even after each has an internally consistent phase definition. The common-channel reduction must therefore prove that atomic, nuclear, mechanical, and material clock/ruler assemblies descend to the same $A$ and $B_{ij}$ in the tested regime, or else carry the mismatch as a failed universality row. Once that reduction holds, $\Delta_{\mathcal A}^{\mathrm{ori}}$ and $\Delta_{\mathcal A}^{\mathrm{PF}}$ become branch-geometry and medium-drift leakage rows bounded by the orientation, two-way anisotropy, and PPN tests below.

The composition row has a topological floor when clock species live in disconnected dressed components. Let $\mathfrak M_{\mathrm{clk}}^{(a)}$ and $\mathfrak M_{\mathrm{clk}}^{(b)}$ be the retained moduli components containing two compared clock species. If there is a continuous dressing path between them that preserves the certified-braid certificate and the relevant assembly topological charge data, then $\Delta_{\mathcal A}^{\mathrm{comp}}$ is bounded by the holonomy and chart error along that path. If every such path crosses a phase-lock jump, root-fold sector change, $D_{\mathrm{plane}}=0$ frame wall, or memory-boundary failure, then the composition residual has an irreducible inter-component floor. The defense fails in that case unless the compared species are removed from the same clock-universality class.

These scales are experimental requirements and bookkeeping ceilings, not framework-predicted amplitudes by themselves:

| Residual | Meaning | Required low-energy ceiling | Framework-predicted scale |
| --- | --- | --- | --- |
| $\Delta_{\mathcal A}^{\mathrm{ori}}$ | Orientation leakage in clock/ruler response | typically $10^{-16}\text{--}10^{-18}$, with the strictest resonator rows at the $10^{-18}$ scale | Must be computed from branch-chart, hierarchy, dressing, and regularization residuals; no value is predicted by the phase definition alone. |
| $\Delta_{\mathcal A}^{\mathrm{comp}}$ | Composition dependence across atomic, nuclear, mechanical, or material clock/ruler assemblies | bounded at the clock-comparison/equivalence-test scale, represented here by $|\Delta_{\mathcal A}^{\mathrm{comp}}|\lesssim10^{-13}$ unless a sharper row is declared | Must descend from a common $A$ and $B_{ij}$ after dressing; channel-dependent $c_{\text{eff}}$ maps contribute directly to this residual. |
| $\Delta_{\mathcal A}^{\mathrm{PF}}$ | Preferred-frame leakage from the Euclidean-void rest frame into observer observables | projected into the two-way anisotropy and PPN rows below unless a sharper channel-specific bound is declared | Must be traced to named branch-chart, medium-drift, or dressing terms rather than fitted as an independent nuisance. |

Required emergent limits:
- Speed convention: $c_f$ is the primitive wake speed used inside delayed-root equations. Observer-level clock limits use the declared channel speed $c_\star$ from the [transverse causal budget lemma](../noether-braid/braid-mathematics.md#transverse-causal-budget-lemma): $c_\star=c_{\text{eff}}(\mathbf{X},t)$ for Noether sea dressed clocks and rulers, with $c_0\equiv c_{\text{eff}}(\infty)$ in the weak homogeneous comparison. In this sense $c_0$ is the deformation-invariant fixed point of the dressing flow as $\mathcal{N}_{\mathrm{sea}}$ approaches the homogeneous neutral background, not a second primitive speed. Set $c_\star=c_f$ only for a primitive branch chart, or after deriving that a specific internal limit-cycle branch is governed directly by the undressed wake speed.
- Homogeneous medium, low velocities:
  $$
  \frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}} \approx \sqrt{1 - \|\mathbf{w}\|^2/c_\star^2},
  \qquad c_\star=c_0 \text{ in the weak homogeneous observer branch}
  $$
  In the weak homogeneous sea-rest branch, $u^i_{\text{sea}}=0$, so $\mathbf{w}=\mathbf{v}$.
- Weak field, low velocities, after the clock-channel potential has been matched to the Newtonian benchmark:
  $$
  \Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_0^2),
  \qquad
  \frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}} \approx \sqrt{1 + 2\Phi_{\text{eff}}/c_0^2 - \|\mathbf{w}\|^2/c_0^2}
  $$
  Here $\Phi_N$ is the conventional negative Newtonian potential. If a positive PPN potential $U_N\ge0$ is used, set
  $$
  \Phi_N=-U_N
  $$
  so the first-order clock expansion reads
  $$
  \frac{d\tau_{\mathcal A}}{dt_{\mathrm{eff}}}
  \approx
  1+\frac{\Phi_N}{c_0^2}
  -\frac{\|\mathbf{w}\|^2}{2c_0^2}
  =
  1-\frac{U_N}{c_0^2}
  -\frac{\|\mathbf{w}\|^2}{2c_0^2}
  $$

**Speed convention table**

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a Noether sea state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a specified dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed used in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration and dressing-flow fixed-point target |

These symbols must not be identified unless the local regime and derivation have been stated.

**Preferred-frame leakage closure**

The operational two-way photon-speed diagnostic is
$$
c_{2w}(\hat{\mathbf n})
=
\frac{2L}{T_+(\hat{\mathbf n})+T_-(\hat{\mathbf n})}
$$
In ordinary low-energy conditions its anisotropy must fit
$$
\frac{c_{2w}(\hat{\mathbf n})-c_0}{c_0}
=
\zeta_0
+
\zeta_{ij}^{\mathrm{TF}}
\left(
\hat n^i\hat n^j-\frac{1}{3}\delta^{ij}
\right)
+
\cdots
$$
with the trace-free anisotropy below the current hard-wall row in the constraint ledger, presently of order $|\zeta_{ij}^{\mathrm{TF}}|\lesssim10^{-17}$ and, for the strictest cavity rows, at the $10^{-18}$ scale. The PPN export must also pass the componentwise bound vector
$$
\left(
|\gamma_{\mathrm{PPN}}-1|,
|\beta_{\mathrm{PPN}}-1|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|
\right)
\le
\left(
2.3\times10^{-5},
8\times10^{-5},
4\times10^{-5},
2\times10^{-9},
4\times10^{-20}
\right)
$$
Any screening mechanism must be included before exporting the observer-level PPN and Lorentz-test coefficients. The exported coefficients themselves must pass the ledger bounds. Preferred-frame hiding is therefore a numerical closure condition, not a prose reassurance.

The trace-free coefficient $\zeta_{ij}^{\mathrm{TF}}$ is the photon-channel projection of the Noether sea framing quadrupole. It is parallel to, but not identical with, the matter framing tensor $Q_{\mathcal A}^{ij}$ above: matter leakage tests the retained assembly framing, while photon and PPN leakage test the sea-response framing sampled by the signal channel. Translation and rotation invariance forbid leading $\ell=1$ preferred-axis leakage in the homogeneous rest branch, so the first dangerous rows are $\ell=2$ trace-free projections. The preferred-frame budget is therefore a collection of framing-isotropy conditions on matter assemblies and on the Noether sea response, with the two-way photon row measuring the sea-side quadrupole.

**Effective metric handoff**

The clock/ruler handoff to effective metric language can be written locally as
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt_{\mathrm{eff}}^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
\left(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\right)
$$
The metric handoff is admissible only on branches where
$$
A>0,
\qquad
B_{ij}=B_{ji},
\qquad
B_{ij}\xi^i\xi^j>0
\quad
\text{for }\xi\ne0
$$
These inequalities have a physical meaning. $A>0$ says the declared clock phase remains monotone in absolute time, so the branch still supplies a usable clock. Positive-definite $B_{ij}$ says the local ruler/signal compliance remains an ordinary spatial quadratic form, so one observer-level light cone can be exported from the branch. The handoff fails when a stable clock limit cycle is lost, when a separator or branch-chart transition makes the causal-root ledger discontinuous, when a Jacobian floor collapses, or when a strong-field channel becomes dispersive, birefringent, or multi-valued enough that no single $B_{ij}$ represents the local response. In those regimes the effective metric description is suspended and the analysis must return to finite branch data, as in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md#causal-root-ledger-progression-as-a-lorentz-prediction) and the strong-field continuation criteria in [Singularity Resolution](../spacetime/singularity-resolution.md).

Equivalently, the metric handoff is a local-invertibility claim. Let the reduced clock/ruler branch map be written schematically as
$$
\Psi_{\mathrm{cr}}
:
(\mathcal{B}_t,H_t,\mathcal{N}_{\mathrm{sea}})
\longmapsto
(A,B_{ij}).
$$
On a regular branch, $\Psi_{\mathrm{cr}}$ has the fixed rank needed to export one clock rate and one positive spatial quadratic response. The failure set is the branch-fold locus
$$
\mathfrak{F}_{\mathrm{cr}}
=
\{
\operatorname{rank}D\Psi_{\mathrm{cr}}
<
\operatorname{rank}_{\mathrm{reg}}
\}
$$
The conditioning face of the same admissibility condition is a singular-value floor:
$$
\sigma_{\min}
\left(
D\Psi_{\mathrm{cr}}\big|_{\mathrm{reg}}
\right)
\ge
\sigma_{\mathrm{cr}}>0.
$$
The inequalities $A>0$ and $B_{ij}\succ0$ are the positivity face of this condition, while the rank and singular-value bounds are the local-invertibility face. A branch can therefore fail metric export either by losing clock/ruler positivity or by becoming so ill-conditioned that the effective metric is locally multivalued under small retained-record perturbations.

For a generic finite-dimensional retained branch chart, the regular clock/ruler region is the open complement of a stratified failure set. Its top stratum is expected to be codimension one: a fold hypersurface across which $\Psi_{\mathrm{cr}}$ loses local invertibility and the metric handoff must be suspended. Higher-codimension strata correspond to cusp, multiple-fold, or simultaneous clock/ruler degeneracies. The preceding list gives coordinate descriptions of the same loss of one-to-one branch structure. This is the clock/ruler version of the fold and non-degeneracy-floor discipline used for causal-root charts in [Master Equation](../dynamics/master-equation.md#causal-time-map-and-root-topology).

Define the Lorentzian observer metric by
$$
ds_{\mathrm{eff}}^2=-c_0^2d\tau^2
$$
With $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$, the exported components are
$$
g^{\mathrm{eff}}_{00}
=
-A^2+\frac{1}{c_0^2}B_{ij}u^i_{\mathrm{sea,eff}}u^j_{\mathrm{sea,eff}}
$$
$$
g^{\mathrm{eff}}_{0i}
=
-\frac{1}{c_0}B_{ij}u^j_{\mathrm{sea,eff}}
$$
and
$$
g^{\mathrm{eff}}_{ij}
=
B_{ij}
$$
Photon-channel closure then reads the null condition of this observer-level quadratic form, with $c_\gamma$ derived from the same Noether sea state rather than assigned independently:
$$
\frac{dx_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}}
=
u^i_{\mathrm{sea,eff}}
+
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})\hat k^i
$$
$$
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})
=
\frac{c_0A}{\sqrt{B_{ij}\hat k^i\hat k^j}}
$$
The weak homogeneous branch requires $A\to1$, $B_{ij}\to\delta_{ij}$, and $u^i_{\mathrm{sea,eff}}\to0$.

The same-record rule is stricter than using one symbol $\mathcal{N}_{\mathrm{sea}}$ in several equations. The clock/ruler map must consume the same Noether sea response record that supplies $G_{\mathrm{eff}}$ in the gravity inventory, $c_{\text{eff}}$ in the matter limiting-speed and mass-shell rows, and $c_\gamma$ in the photon channel:
$$
\Theta_{\mathrm{sea}}
\longmapsto
\left(
A,\,
B_{ij},\,
G_{\mathrm{eff}},\,
c_{\text{eff}},\,
c_\gamma
\right).
$$
If these projections require separate sea records or independently tuned response tensors, the effective metric is fitted rather than derived. The closure burden is therefore one sea-constitutive object with clock, ruler, gravity, matter-speed, and photon projections, not a separate clock-sector construction.

**Key point**

Relativity of simultaneity and time dilation are emergent observer-level effects of assembly dynamics. The $\mathbb{U}_{\text{now}}$ formalism evolves in absolute time $T$; proper time $\tau$ is a derived clock functional. The closure burden is therefore not to remove the preferred foliation, but to derive clock, ruler, and signal behavior that bounds preferred-frame leakage to the required precision in the effective observer sector.

The converse is a hard falsifiability wall. The defense fails if $\Delta_{\mathcal A}^{\mathrm{comp}}$ cannot be driven to the declared clock-comparison ceiling by a common-channel reduction. A sharp topological obstruction is disconnected clock moduli: if physically realized clock species occupy different deformation classes of the Noether braid atlas and no shared dressing path identifies their $A$ and $B_{ij}$ maps, then the composition residual is irreducible rather than a small correction. The defense also fails if a stable low-energy clock or ruler species retains orientation or preferred-frame leakage after branch-chart, dressing, and regularization terms have been accounted for, with residuals exceeding the relevant cavity or two-way anisotropy row, in particular at the $10^{-18}$ scale for the strictest resonator comparisons. Such leakage would not be an alternate interpretation of proper time; it would be a failed Lorentz-closure branch.

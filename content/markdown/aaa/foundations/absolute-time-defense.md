# Absolute Time Defense

This chapter states the substrate-level case for absolute time as the fundamental evolution parameter of the theory. Its purpose is to distinguish the exact absolute-time variable used by the [master equation](../dynamics/master-equation.md) from the derived proper time read out by physical clock assemblies, and to show why the framework treats foliation as real structure rather than coordinate gauge.

The teaching sequence is deliberately layered. First comes the ontological claim about absolute time and the Euclidean void. Then comes the dynamical claim about universe-state evolution. Only after those substrate claims are fixed does the chapter introduce proper time, clock-rate extraction, and relativistic observer inferences. It is the argumentative companion to [Foundational Ontology](./ontology.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

## The Case for Absolute Time ($t$)

1. **Fundamental evolution parameter**: Absolute time $t$ is the unique evolution parameter of the master equation.
2. **Product substrate**: The kinematic background is the product manifold $\mathcal{M} = \mathbb{R} \times \mathbb{R}^3$ with clock projection $\pi_t:\mathcal{M}\to\mathbb{R}$.
3. **Unique foliation**: The simultaneity slice at fixed $t_0$ is the level set
   $$
   \Sigma_{t_0} = \pi_t^{-1}(\{t_0\}) = \{t_0\}\times \mathbb{R}^3.
   $$
4. **Substrate clock form**: The substrate clock form $dt$ is exact, closed, and nowhere vanishing as the pullback from the $\mathbb{R}$ factor. Together with the chosen orientation of increasing $t$, it fixes the tangent planes to the slices $\Sigma_t$; foliation ambiguity is absent at the substrate level rather than removed by coordinate gauge.
5. **Derived clock time**: Proper time $\tau$ is not fundamental; it is a derived functional of tri-binary internal phase dynamics.

The list separates ontology from effective description. Absolute time, the Euclidean void, and the slices $\Sigma_t$ are substrate commitments. Proper time, clock synchronization, and relativistic simultaneity judgments are effective readouts produced by assemblies embedded in the Noether Sea. The defense of absolute time therefore does not deny observed clock dilation; it relocates clock dilation from fundamental temporal ontology to derived assembly dynamics.

## Absolute Time, Global Foliation, and Proper Time

**Absolute time $t$ and universe state**
- The $\mathbb{U}_{\text{now}}$ perspective indexes the exact microstate as $S(t)$ on each slice $\Sigma_t$.
- On each $\Sigma_t$, the spatial metric is Euclidean: $h_{ij}=\delta_{ij}$.
- Absolute time is substrate structure, not a coordinate gauge choice.

At this level, $\mathbb{U}_{\text{now}}\equiv S(t)$ is not an observer's reconstruction of events. It is the complete ontic universe state on a simultaneity slice, including constituent positions, velocities, polarities, path-history data, and any branch information required by the delayed dynamics. Observers may infer only a coarse-grained portion of this state through clocks, rulers, signals, and records.

Because the master equation is path-history dependent, the complete state on a slice is not merely an instantaneous Markov projection. The precise schematic form is
$$
\mathbb{U}_{\text{now}}(t)
\equiv
S(t)
=
\big(
X(t),
H_t,
\mathcal{N}_{\mathrm{sea}}(t,\cdot),
\mathcal{B}_t
\big),
$$
where $X(t)$ contains instantaneous architrino and assembly data, $H_t$ is the path-history and provenance ledger, $\mathcal{N}_{\mathrm{sea}}$ is the retained Noether-Sea state, and $\mathcal{B}_t$ records the active branch chart or regularization data. Determinism applies to this complete history state, not to a history-free slice projection.

**Deterministic evolution and basin selection**
- The delay-differential master equation is deterministic: where the declared branch chart or regularization makes the evolution well posed, a fully specified $\mathbb{U}_{\text{now}}\equiv S(t_0)$, including the required path-history and provenance ledger, generates a unique trajectory $S(t)$ for $t>t_0$.
- Apparent branching is multistability, not stochastic evolution: near separatrices, infinitesimal perturbations in initial microstate direct trajectories into different attractor basins.
- Therefore the correct statement is basin selection under deterministic flow, not a "distribution of allowed configurations" from one exact state.

This is a claim about the exact substrate flow, not about practical prediction. A finite observer may lack the path-history resolution needed to know which basin the system occupies, but that ignorance is inferential. It does not convert a single exact state into many simultaneous ontic futures.

**Proper time $\tau$ for physical observers**

Physical clocks are tri-binary assemblies; ticks correspond to internal limit-cycle phase evolution. The primary definition is therefore phase extraction, not an arbitrary scalar fit:
$$
d\tau_{\mathcal A}
=
\frac{d\varphi_{\mathcal A}}{\Omega_{\mathcal A}^{(0)}},
\qquad
\frac{d\tau_{\mathcal A}}{dt}
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
}.
$$
Here $\varphi_{\mathcal A}$ is the declared clock phase, $\Omega_{\mathcal A}^{(0)}$ is its rest-branch reference rate, $R_{\mathcal A}$ is the clock assembly orientation and geometry record, $H_{\mathcal A}$ is the relevant path-history ledger, and
$$
w^i_{\mathcal A}
=
\frac{dX^i_{\mathcal A}}{dt}
-
u^i_{\text{sea}}
$$
is velocity relative to the local Noether-Sea flow in the observer-level bookkeeping map for the clock worldline $X^i_{\mathcal A}(t)$.

The full local Noether-Sea state is the retained state record $\mathcal{N}_{\mathrm{sea}}$, for example
$$
\mathcal{N}_{\mathrm{sea}}
=
\left(
\rho_{\text{core}},
n,
u^i_{\text{sea}},
Q_{ij},
\sigma_{ij},
\nabla\rho_{\text{core}},
\ldots
\right).
$$
The scalar $\chi_{\text{sea}}(\mathbf{x},t)\equiv c_f/c_{\text{eff}}(\mathbf{x},t)$ is only the Noether-Sea delay factor extracted for a specified channel. It is not the full Noether-Sea state.

A broad constitutive expression $d\tau=F(\cdots)dt$ may still be used as a schematic summary after the clock channel has been declared, but the closure target is the extracted phase functional above. Proper time is not a free scalar function assigned independently of assembly dynamics.

The integral clock-frequency form is

$$
\tau(t_1)-\tau(t_0)=\int_{t_0}^{t_1}\frac{\omega_{\text{clk}}(s)}{\omega_0}\,ds,
$$

where $\omega_{\text{clk}}(s)$ is the phase rate extracted from the declared tri-binary clock channel and $\omega_0$ is its rest-branch reference frequency. The dependencies hidden in $\omega_{\text{clk}}$ are the local causal-root ledger, the relevant path-history data, and the same Noether-Sea state variables used by the clock/ruler metric handoff.

The low-energy Lorentz-closure target for a declared clock branch has the form
$$
\frac{d\tau_{\mathcal A}}{dt}
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
\right].
$$
The residuals record orientation leakage, composition dependence, and preferred-frame leakage. They must be bounded by clock-comparison and Lorentz-test rows rather than hidden inside the constitutive function.
In ordinary low-energy clock branches, the target scale is
$$
|\Delta_{\mathcal A}^{\mathrm{ori}}|
\lesssim
10^{-16}\text{--}10^{-18},
\qquad
|\Delta_{\mathcal A}^{\mathrm{comp}}|
\lesssim
10^{-13},
$$
with $\Delta_{\mathcal A}^{\mathrm{PF}}$ projected into the two-way anisotropy and PPN rows below unless a sharper channel-specific bound is declared.

Required emergent limits:
- Speed convention: $c_f$ is the primitive wake speed used inside delayed-root equations. Observer-level clock limits use the declared channel speed $c_\star$ from the [transverse causal budget lemma](../noether-swarm/nested-shell-swarm-dynamics.md#transverse-causal-budget-lemma): $c_\star=c_{\text{eff}}(\mathbf{X},t)$ for Noether-Sea dressed clocks and rulers, with $c_0\equiv c_{\text{eff}}(\infty)$ in the weak homogeneous comparison. Set $c_\star=c_f$ only for a primitive branch chart, or after deriving that a specific internal limit-cycle branch is governed directly by the undressed wake speed.
- Homogeneous medium, low velocities:
  $$
  \frac{d\tau_{\mathcal A}}{dt} \approx \sqrt{1 - \|\mathbf{w}\|^2/c_\star^2},
  \qquad c_\star=c_0 \text{ in the weak homogeneous observer branch}.
  $$
  In the weak homogeneous sea-rest branch, $u^i_{\text{sea}}=0$, so $\mathbf{w}=\mathbf{v}$.
- Weak field, low velocities, after the clock-channel potential has been matched to the Newtonian benchmark:
  $$
  \Phi_{\text{eff}}=\Phi_N+O(\Phi_N^2/c_0^2),
  \qquad
  \frac{d\tau_{\mathcal A}}{dt} \approx \sqrt{1 + 2\Phi_{\text{eff}}/c_0^2 - \|\mathbf{w}\|^2/c_0^2}.
  $$
  Here $\Phi_N$ is the conventional negative Newtonian potential. If a positive PPN potential $U_N\ge0$ is used, set
  $$
  \Phi_N=-U_N,
  $$
  so the first-order clock expansion reads
  $$
  \frac{d\tau_{\mathcal A}}{dt}
  \approx
  1+\frac{\Phi_N}{c_0^2}
  -\frac{\|\mathbf{w}\|^2}{2c_0^2}
  =
  1-\frac{U_N}{c_0^2}
  -\frac{\|\mathbf{w}\|^2}{2c_0^2}.
  $$

**Speed convention table**

| Symbol | Meaning | Status |
| --- | --- | --- |
| $c_f$ | Primitive causal-wake propagation speed relative to the Euclidean void | fundamental |
| $c_\gamma(\mathcal{N}_{\mathrm{sea}},\hat{\mathbf{k}})$ | Photon-channel speed in a Noether-Sea state and direction | derived |
| $c_{\text{eff}}$ | Effective signal or clock-channel speed for a specified dressed branch | derived/contextual |
| $c_\star$ | Local comparison speed used in a declared clock, ruler, or signal branch | branch-dependent |
| $c_0$ | Measured low-energy invariant light speed in weak homogeneous conditions | empirical calibration |

These symbols must not be identified unless the local regime and derivation have been stated.

**Preferred-frame leakage closure**

The operational two-way photon-speed diagnostic is
$$
c_{2w}(\hat{\mathbf n})
=
\frac{2L}{T_+(\hat{\mathbf n})+T_-(\hat{\mathbf n})}.
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
\cdots,
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
\right).
$$
Any screening mechanism must be included before exporting the observer-level PPN and Lorentz-test coefficients. The exported coefficients themselves must pass the ledger bounds. Preferred-frame hiding is therefore a numerical closure condition, not a prose reassurance.

**Effective metric handoff**

The clock/ruler handoff to effective metric language can be written locally as
$$
d\tau^2
=
A^2(\mathcal{N}_{\mathrm{sea}})\,dt^2
-
\frac{1}{c_0^2}
B_{ij}(\mathcal{N}_{\mathrm{sea}})
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$
The metric handoff is admissible only on branches where
$$
A>0,
\qquad
B_{ij}=B_{ji},
\qquad
B_{ij}\xi^i\xi^j>0
\quad
\text{for }\xi\ne0.
$$
Define the Lorentzian observer metric by
$$
ds_{\mathrm{eff}}^2=-c_0^2d\tau^2.
$$
With $x^0=c_0t$, the exported components are
$$
g^{\mathrm{eff}}_{00}
=
-A^2+\frac{1}{c_0^2}B_{ij}u^i_{\text{sea}}u^j_{\text{sea}},
$$
$$
g^{\mathrm{eff}}_{0i}
=
-\frac{1}{c_0}B_{ij}u^j_{\text{sea}},
$$
and
$$
g^{\mathrm{eff}}_{ij}
=
B_{ij}.
$$
Photon-channel closure then reads the null condition of this observer-level quadratic form, with $c_\gamma$ derived from the same Noether-Sea state rather than assigned independently:
$$
\dot x^i
=
u^i_{\text{sea}}
+
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})\hat k^i,
$$
$$
c_\gamma^{\mathrm{rel}}(\hat{\mathbf{k}})
=
\frac{c_0A}{\sqrt{B_{ij}\hat k^i\hat k^j}}.
$$
The weak homogeneous branch requires $A\to1$, $B_{ij}\to\delta_{ij}$, and $u^i_{\text{sea}}\to0$.

**Key point**

Relativity of simultaneity and time dilation are emergent observer-level effects of assembly dynamics. The $\mathbb{U}_{\text{now}}$ formalism evolves in absolute time $t$; proper time $\tau$ is a derived clock functional. The closure burden is therefore not to remove the preferred foliation, but to derive clock, ruler, and signal behavior that bounds preferred-frame leakage to the required precision in the effective observer sector.

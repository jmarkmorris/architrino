# Pressure-Dependent Noether Sea Constitutive Response Near Atoms

This priority packet is a report and derivation scaffold, not reader-facing canon. It captures a pressure-dependent Noether sea constitutive response near atoms, with heavy atoms in metallic lattices, especially iron and nickel under core pressure, as the first strong test case.

## Claim Level

- **Status:** candidate constitutive law with two-material replay scaffold.
- **Main claim:** local atomic and lattice pressure should retune the surrounding Noether sea through one shared record for normalized Noether braid density $n(\mathbf{x},t)$, delay factor $\chi_{\text{sea}}(\mathbf{x},t)$, effective speed $c_{\text{eff}}(\mathbf{x},t)$, Noether sea cadence factor $\Gamma_N(\mathbf{x},t)$, and assembly strain.
- **Open burden:** coefficients must be derived from an accepted Noether braid branch, pressure-sensitive packing geometry, and the medium-response tensor probe. Any mass-facing coefficient must additionally consume receiver-normal branch strength from same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$ rows, not H39/theta3minus quotient certificates or old shell-braid force residues. The first density-side modulus target is staged in [Noether sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md). Until then this packet supplies a falsifiable ansatz, not a promoted theorem.
- **Promotion targets:** [Noether sea](../../../content/markdown/aaa/spacetime/noether-sea.md), [Nested Shell Braid Geometry](../../../content/markdown/aaa/noether-braid/nested-shell-braid-geometry.md), [Atomic Structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md), [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), and [Parameter Ledger](../../../content/markdown/aaa/validation/parameter-ledger.md) after branch and validation support exists.

## Source Signals

- [Noether sea](../../../content/markdown/aaa/spacetime/noether-sea.md) already fixes $n(\mathbf{x},t)=\rho_{\text{NS}}(\mathbf{x},t)/\rho_{\text{NS},0}$, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, and the Noether braid cadence distribution $f_N(\nu,\mathbf{x},t)$.
- [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) already gives the geometry extraction target
  $$
  \ln\Gamma_N
  =
  \mathbf{b}_N\cdot
  \left(
  \ln n,\ln\chi_{\text{sea}},\ln\lambda,-\ln\xi,\ln(R_{\text{core}}/R_{\text{core},0})
  \right)^T
  +\mathcal{R}_{\Gamma}.
  $$
- [Atomic Structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md) already requires atomic calculations to distinguish resolved matter assemblies from the complementary local Noether sea record inside the same atomic window.
- [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) and [Condensed Matter and Medium Transport](condensed-matter-medium-transport.md) already separate reversible medium-dressed inertial response from dissipative resistance through $\mathcal{R}_{\text{tr}}$, and carry the Earth-core iron guardrail that ordinary planetary differentiation has no iron-nucleus source term.
- [Noether Braid Scaling and Packing Scaffold](../braid-dyadic-lock/noether-braid-scaling-and-packing.md) supplies the current priority-side packing estimate, including packing-limited center density and oblate-envelope support-function contact conditions.

## External Source-Mining Constraints

The Tier 2 condensed-matter and analogue-gravity sources do not add a new pressure ontology. They constrain how the candidate law may be written.

1. Analogue-gravity reviews and Visser's acoustic-metric derivation show that an effective metric for perturbations can be a constitutive object built algebraically from medium density, flow, and signal speed. The pressure packet should mirror this discipline: $n$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\Gamma_N$, $S_{ij}$, and $\mathcal{M}_{\text{sea}}^{ab}$ must come from one local pressure-state record, not from observable-local coefficient rows.
2. Volovik-style $^3$He-A examples are useful only because they carry explicit gap nodes, quasiparticle spectra, and order-parameter textures. The Noether sea pressure law may use emergent-medium comparison language only when the Noether braid branch record and stability gaps are declared.
3. Topological-defect and vortex-unbinding sources convert pressure-induced structural changes into a threshold statement: a winding, defect, dislocation, edge, or branch invariant can change only when the effective order-parameter map is declared and the branch passes through a gap-closing or transport-threshold event.

The last point adds a guardrail to the pressure law. Let $\mathcal{I}_{\mathrm{def}}$ denote any retained effective defect or topological branch label extracted from a declared projection of $\theta_{\mathrm{sea}}$ or $\mathcal{B}_{\mathrm{lat}}$. A smooth branch-preserving pressure replay must keep

$$
\Delta\mathcal{I}_{\mathrm{def}}=0.
$$

If a pressure step requires

$$
\Delta\mathcal{I}_{\mathrm{def}}\ne0,
$$

then the row is no longer a smooth constitutive perturbation. It must be routed as a branch transition, defect creation/annihilation, or transport-threshold event:

$$
\Delta\mathcal{I}_{\mathrm{def}}\ne0
\quad\Longrightarrow\quad
\Delta_{\mathbf{k}}\to0
\quad\text{or}\quad
\mathcal{R}_{\text{tr}}\ge\mathcal{R}_{\text{tr},*}.
$$

This keeps Noether sea response separate from ordinary dissipative drag and prevents pressure coefficients from hiding a topological or structural phase change.

## Claim Map

| Bucket | Candidate claim |
| --- | --- |
| Ontology | Atoms and lattices are matter assemblies embedded in the Noether sea, not sources of fundamental void deformation. |
| Derivation/closure target | One pressure response record should determine $n$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\Gamma_N$, strain, and $\mathcal{M}_{\text{sea}}^{ab}$ without separate coefficients per observable. |
| Effective summary | Heavy metallic lattices are useful high-pressure probes because they combine large local atomic loading, close coordination, and anisotropic strain channels. |
| Speculation | Iron and nickel may be unusually sensitive because their dense cores and metallic coordination produce a large local pressure-loading functional; this is a test hypothesis, not canon. |

## Local Pressure-Loading Variable

Work on a coarse-graining scale $\ell$ satisfying the atomic-window logic in [Atomic Structure](../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md): large enough to average many ambient Noether sea cores, but small enough not to erase the atomic or lattice environment being tested.

Define a dimensionless pressure-loading record

$$
\Pi_\ell(\mathbf{x},t)
=
\frac{P_\ell(\mathbf{x},t)}{K_{\text{sea}}},
$$

where $K_{\text{sea}}$ is the pressure scale of the Noether sea compressive response to be derived. A minimal atomic-lattice source model is

$$
P_\ell(\mathbf{x},t)
=
P_*
\sum_A
C_A(t)
\left(\frac{Z_A}{Z_*}\right)^{\eta_Z}
K_\ell\!\left(\mathbf{x}-\mathbf{R}_A(t)\right)
+P_{\text{ext}}^{(\ell)}(\mathbf{x},t).
$$

Here $A$ labels atoms or nuclei in the local material cell, $Z_A$ is nuclear charge, $C_A$ is a dimensionless local coordination/compression factor, $K_\ell$ is a normalized smoothing kernel, $P_{\text{ext}}^{(\ell)}$ is externally applied pressure or lattice stress resolved at scale $\ell$, and $\eta_Z$ is a scaling exponent to be derived or falsified. Iron and nickel are first-test cases because $Z_A$ is high enough to amplify the local term while metallic coordination keeps $C_A$ large and structured.

This pressure-loading variable is not a new substance. It is a compact way to feed local matter assembly loading into the existing Noether sea response variables.

## Candidate Constitutive Law

### 1. Packing-Limited Density Response

Let $n_{\max}^{\mathrm{obl}}(\lambda,\xi,\mathcal{O})$ be the normalized local packing ceiling for oblate Noether braid envelopes, with $\mathcal{O}$ recording the orientation distribution. A useful first law is

$$
\frac{\partial \ln n}{\partial \Pi_\ell}
=
\kappa_n
\left(
1-\frac{n}{n_{\max}^{\mathrm{obl}}(\lambda,\xi,\mathcal{O})}
\right),
$$

so weak pressure gives

$$
\ln n(\mathbf{x},t)
\approx
\kappa_n\Pi_\ell(\mathbf{x},t)
$$

while near packing saturation the density response stiffens. The oblate ceiling is estimated by

$$
n_{\max}^{\mathrm{obl}}
\approx
\frac{
\phi_{\mathrm{obl}}(\xi,\mathcal{O})
}{
\rho_{\text{NS},0}\,
\frac{4\pi}{3}\xi R_{\perp,0}^3\lambda^3
},
$$

where $\phi_{\mathrm{obl}}$ is the packing fraction for the declared envelope shapes and orientations. This ties the local pressure response to Noether braid geometry rather than to an unconstrained scalar density increase.

### 2. Strain, Delay, and Effective Speed

Let $S_{ij}(\mathbf{x},t)$ be the local assembly-strain tensor extracted from envelope deformation and lattice loading. Split it into trace and deviatoric parts:

$$
S_{ij}
=
\frac{1}{3}S^k{}_k h_{ij}
+S_{ij}^{\mathrm{dev}}.
$$

For positive compressive loading, the first branch-preserving estimate is

$$
\Delta\ln\lambda
\approx
-\kappa_\lambda\Pi_\ell,
\qquad
\Delta\ln\xi
\approx
-\kappa_\xi\Pi_\ell^{\parallel-\perp},
$$

where $\Pi_\ell^{\parallel-\perp}$ is the anisotropic pressure component along the local principal-strain axes. The Noether sea delay factor then has the shared-record form

$$
\ln\chi_{\text{sea}}(\mathbf{x},t;\hat{\mathbf{k}})
=
a_n\ln n
+a_\lambda(-\ln\lambda)
+a_\xi(-\ln\xi)
+a_S\,\hat{k}^iS_{ij}^{\mathrm{dev}}\hat{k}^j
+\mathcal{R}_{\chi}.
$$

The corresponding effective speed is

$$
c_{\text{eff}}(\mathbf{x},t;\hat{\mathbf{k}})
=
\frac{c_f}{\chi_{\text{sea}}(\mathbf{x},t;\hat{\mathbf{k}})}.
$$

In an isotropic weak cell, $S_{ij}^{\mathrm{dev}}\to0$ and the direction label drops out. In a stressed single crystal or anisotropic lattice, the same law predicts a directional residual controlled by $\hat{k}^iS_{ij}^{\mathrm{dev}}\hat{k}^j$.

### 3. Local Cadence Shift

The local Noether sea cadence factor should consume the same density, delay, and geometry record:

$$
\ln\Gamma_N
=
b_n\ln n
+b_\chi\ln\chi_{\text{sea}}
+b_\lambda\ln\lambda
-b_\xi\ln\xi
+b_R\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
+\mathcal{R}_{\Gamma}^{P}.
$$

The homogeneous moving-core Lorentz branch fixes the coefficient multiplying $-\ln\xi$ to $1$ up to preferred-frame leakage. Equivalently, the clock-rate factor is $C_N=\Gamma_N^{-1}$, so the metric-subclass clock row has the opposite sign for the isotropic coefficients. Pressure-response tests therefore constrain the remaining isotropic combination of $b_n$, $b_\chi$, $b_\lambda$, and $b_R$ unless the tested material branch also produces a resolved anisotropic shape response.

Since

$$
\Gamma_N
=
\frac{\Omega_{N0}}{\Omega_N},
$$

the local cadence shift is

$$
\frac{\Delta\Omega_N}{\Omega_{N0}}
\approx
-\ln\Gamma_N
$$

to first order. The expected sign in dense, delay-dominated cells is $\ln\Gamma_N>0$, meaning the local Noether sea cadence is stretched and $\Omega_N$ is lowered relative to the weak homogeneous reference. If a fixed-speed compression branch dominates instead, the sign may reverse locally; that reversal must be logged as a branch distinction, not absorbed into a free coefficient.

### 4. Medium-Response Tensor Handoff

The mass-map tensor should inherit the same pressure response:

$$
\mathcal{M}_{\text{sea}}^{ab}(\mathbf{x},t)
=
\frac{\chi_{\text{sea}}^2}{c_f^2}
\left(
h^{ab}
+m_S S_{\mathrm{dev}}^{ab}
\right)
+\mathcal{R}_{\mathcal{M}}^{ab}.
$$

Thus the homogeneous isotropic limit recovers

$$
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

The internal momentum response remains the existing mass-map target,

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}.
$$

This keeps pressure-sensitive condensed-matter response inside the same medium-dressed inertia program instead of turning it into ordinary drag.

## Receiver-Normal Constitutive Dependency

This constitutive law may feed scalar mass response only after the pressure
state and the mass-facing exposure row are bound to the same retained
receiver-normal branch record. The required record contains

$$
\theta_{\mathrm{sea}},
\qquad
E_{\text{internal}}(A),
\qquad
M_{0,\mathrm{rec}}^{\mathrm{src}}(A),
\qquad
\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A),
\qquad
\{D_s,D_t,W^{\mathrm{rec}}\}_{\rho\in\mathfrak{R}_{A}^{\mathrm{ret}}}.
$$

The theorem target is a same-record descent statement: perturb one accepted
retained branch by a declared subthreshold pressure row, recompute
$D_s$, $D_t$, $W^{\mathrm{rec}}$, $\theta_{\mathrm{sea}}$,
$M_{0,\mathrm{rec}}^{\mathrm{src}}$, $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}$,
and $\mathcal{M}_{+}^{ab}$ on the same branch identity, and verify that the
finite-difference scalar trace is explained by the receiver-normal
mass-response equation. If the replay needs a separate observable-local
coefficient, an H39/theta3minus quotient row, a source-normal-only force weight,
or an unlogged transport channel, the result is `receiver_normal_intake_missing`
or `loss_channel_unlogged`, not a pressure-mass coefficient.

The concrete simulation target is
`retained_pressure_row_receiver_normal_simulation/v0`. For this constitutive
packet, the target is admissible only when one retained pressure row supplies:

| Intake field | Same-record requirement |
| --- | --- |
| `retained_branch_identity` | accepted branch id, accepted history segment, source path, quotient chart, retained root-row identity, and retained pressure-row id |
| `receiver_normal_weight_record` | recomputed $D_s$, $D_t$, and $W^{\mathrm{rec}}$ for the retained roots used by the mass-facing exposure and pressure response |
| `energy_exposure_record` | $E_{\text{internal}}(A)$, $\zeta_{0}^{\mathrm{rec}}$, $M_{0,\mathrm{rec}}^{\mathrm{src}}(A)$, and $\mathcal{Z}_{\mathrm{tf,rec}}^{ab}(A)$ descending through the same exposure quotient |
| `pressure_record` | $\Pi$, $A$, $s_n$, $Q_{\chi}^{ab}$, $S_{\mathrm{dev}}^{ab}$, retained direction, and pressure step size |
| `noether_sea_response_record` | $\theta_{\mathrm{sea}}$, $C_{\chi}^{\mathrm{iso}}$, $C_{\chi}^{\mathrm{aniso}}$, $m_S$, $\mathcal{M}_{+}^{ab}$, reversible-domain row, and null-sector bounds |
| `trace_validation` | finite-difference $m_{\mathrm{tr}}^{\mathrm{rec}}(\Delta P)-m_{\mathrm{tr}}^{\mathrm{rec}}(0)$ compared to the receiver-normal pressure trace equation |

The current reading is `defer with blocker`: no accepted retained branch row
currently binds these records. Fe/Cr, Ni/Co, Earth-core iron, toy pressure,
Hessian, H39/theta3minus, or empirical rows may screen or falsify side
conditions, but they remain non-evidence for pressure-mass response until this
same-row receiver-normal intake exists.

## Heavy Metallic Lattice Test Case

In an iron or nickel lattice under external or internal core pressure, the candidate predicts a correlated response:

$$
\delta\ln\chi_{\text{sea}},
\quad
\delta\ln\Gamma_N,
\quad
\delta\mathcal{M}_{\text{sea}}^{ab},
\quad
\delta S_{ij}
\quad
\text{all scale with}
\quad
\delta\Pi_\ell
$$

using one coefficient record. The rough scaling expectation is

$$
\delta\ln\Gamma_N
\sim
\left(
b_n\kappa_n
+b_\chi a_n\kappa_n
+b_\chi a_\lambda\kappa_\lambda
+\cdots
\right)
C_A
\left(\frac{Z_A}{Z_*}\right)^{\eta_Z}
\delta P_{\text{ext}}/K_{\text{sea}}.
$$

The useful comparison is not merely "high pressure changes spectra." Standard condensed-matter physics already expects many pressure shifts. The $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is narrower: after ordinary electronic, magnetic, thermal, and elastic corrections, any remaining Noether sea residual must follow one shared pressure-loading record across cadence, signal-delay, strain, and inertial-response channels.

## Earth-Core Iron Residual Packet

Earth-core iron is the boundary case where the pressure law must remain disciplined. The standard correction is retained: most iron in Earth predates Earth accretion, then segregates into the core during planetary differentiation. Core pressure and temperature may stabilize metallic branches, change transport, and retune already existing iron-bearing assemblies, but they do not by themselves create iron nuclei. The ordinary planetary branch therefore keeps

$$
\partial_t \mathcal{N}_{\mathrm{Fe}}
+
\nabla\cdot\mathbf{J}_{\mathrm{Fe}}
=
S_{\mathrm{Fe}}^{\mathrm{nuc}},
\qquad
S_{\mathrm{Fe}}^{\mathrm{nuc}}=0.
$$

Here $\mathcal{N}_{\mathrm{Fe}}$ is the number density of iron nuclei and $\mathbf{J}_{\mathrm{Fe}}$ is their segregation flux. Any nonzero $S_{\mathrm{Fe}}^{\mathrm{nuc}}$ is a separate nuclear-reaction provenance claim; it must preserve nuclear inventory, charge, energy, momentum, and medium-provenance bookkeeping before it can enter this pressure packet.

For an Earth-core iron replay, use the state record

$$
\Theta_{\oplus\mathrm{Fe}}
=
\left(
\mathcal{N}_{\mathrm{Fe}},
\mathbf{J}_{\mathrm{Fe}},
P,T,\Phi_{\mathrm{eff}},
\mathcal B_{\mathrm{lat}},
\theta_{\mathrm{sea}},
M_{\mathrm{sh}},
\mathcal{R}_{\text{tr}}
\right),
$$

with

$$
\theta_{\mathrm{sea}}
=
\left(
\rho_{\text{NS}},
n,
\chi_{\text{sea}},
\Gamma_N,
\lambda,
\xi,
\mathbf{u}_{\text{sea}},
S_{ij},
\mathcal{M}_{\text{sea}}^{ab}
\right).
$$

The quantified residual packet is

$$
\mathcal{Q}_{\oplus\mathrm{Fe}}
=
w_S
\left(
\frac{S_{\mathrm{Fe}}^{\mathrm{nuc}}}{\epsilon_S}
\right)^2
+
w_J
\left\lVert
\frac{
\mathbf{J}_{\mathrm{Fe}}
+
D_{\mathrm{Fe}}\nabla\!\left[
\mu_{\mathrm{Fe}}
+
M_{\mathrm{sh}}\Phi_{\mathrm{eff}}
\right]
}{\epsilon_J}
\right\rVert^2
+
w_G
\left[
\frac{
\left[
\Delta G_{\mathrm{Fe}}^{\mathrm{metal/silicate}}
\right]_+
}{\epsilon_G}
\right]^2
+
w_\Gamma
\left(
\frac{
\ln\Gamma_N-\mathbf{b}_N\cdot\mathbf{g}_N
}{\epsilon_\Gamma}
\right)^2
+
w_{\text{tr}}
\left[
\frac{
\left[
\mathcal{R}_{\text{tr}}-\mathcal{R}_{\text{tr},*}
\right]_+
}{\epsilon_{\text{tr}}}
\right]^2,
$$

where $[x]_+\equiv\max(x,0)$ and

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\chi_{\text{sea}},\,
\ln\lambda,\,
-\ln\xi,\,
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
\right)^T.
$$

The source term enforces the no-new-iron guardrail. The segregation term tests whether existing iron-bearing assemblies follow the density-sorting functional. The phase term tests whether the metallic branch is favored over a silicate comparison after standard condensed-matter corrections. The cadence term tests whether the same Noether sea record that drives pressure response also supplies $\Gamma_N$. The transport term blocks ordinary drag below threshold and requires any above-threshold loss to be logged as excitation, heating, radiation-like shedding, or branch transition.

| Residual component | Already constrained by the corpus | Requires simulation or data bridge |
| --- | --- | --- |
| Source conservation | $S_{\mathrm{Fe}}^{\mathrm{nuc}}=0$ for ordinary planetary differentiation; nonzero source requires reaction provenance. | Any actual iron-producing reaction mechanism, including nuclear inventory and energy-momentum bookkeeping. |
| Segregation | The allowed functional is a flux down chemical, gravitational, and medium-response potential for existing iron assemblies. | $D_{\mathrm{Fe}}$, $\mu_{\mathrm{Fe}}(P,T,\theta_{\mathrm{sea}})$, Earth-interior profiles, and covariance tolerances. |
| Metallic phase preference | $\Delta G_{\mathrm{Fe}}^{\mathrm{metal/silicate}}=\Delta G_{\mathrm{std}}+\delta G_{\mathrm{sea}}$ and the dense-medium condition $\partial_n\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}<0$. | Ordinary phase corrections, $\delta G_{\mathrm{sea}}$ coefficients, lattice branch records, and pressure-temperature data. |
| Cadence and clock response | $b_\xi=1$ on the homogeneous moving-core branch and $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ in the weak static endpoint branch. | Individual isotropic coefficients, pressure-dependent $\mathbf{g}_N$ extraction, and branch-specific $\mathcal{R}_{\Gamma}^{P}$ tolerances. |
| Transport threshold | $\mathcal{R}_{\text{tr}}<\mathcal{R}_{\text{tr},*}$ means reversible retuning with no ordinary drag; above threshold requires a logged channel. | The quantitative form of $\mathcal{R}_{\text{tr}}$, its critical value, and stability-gap inputs for iron-rich material branches. |

Acceptance requires all five components to use one shared $\theta_{\mathrm{sea}}$ record, not separate observable-specific medium parameters. Demotion is appropriate if the pressure residual can be fit only with material-specific rows and no branch transition. Failure is required if the packet needs unlogged iron-nucleus creation, hides transmutation inside $\delta G_{\mathrm{sea}}$, mixes $n$ with $\chi_{\text{sea}}$, predicts ordinary drag below $\mathcal{R}_{\text{tr},*}$, or violates clock/signal, birefringence, dispersion, preferred-frame, or transport null bounds.

The Fe/Cr replay below tests only the shared pressure-response row for a heavy/control material pair. It does not validate Earth-core iron until the source, segregation, phase, cadence, and transport components of $\mathcal{Q}_{\oplus\mathrm{Fe}}$ are supplied with real material and Earth-interior records.

## Assumptions

1. The response is branch-preserving below the transport threshold $\mathcal{R}_{\text{tr},*}$.
2. The coarse-graining scale $\ell$ resolves the atomic or lattice environment while averaging enough ambient Noether sea cores to define $n$, $\chi_{\text{sea}}$, and $S_{ij}$.
3. The same pressure record feeds the clock/cadence channel, signal-speed channel, strain channel, and mass-response tensor.
4. The coefficients are environment-local but not observable-local: a coefficient may depend on branch class and material state, but it may not be refit separately for spectral, clock, propagation, and transport tests.
5. Below threshold, no ordinary dissipative drag term is allowed. Irreversible heating, radiation, or branch transitions must be routed through $\mathcal{R}_{\text{tr}}$ and the event ledger.

## Falsification Tests

1. **Shared-coefficient failure:** pressure-dependent spectroscopy, signal-delay, strain, and inertial-response data require mutually incompatible coefficient rows for the same material state.
2. **Fe/Ni scaling failure:** iron and nickel under matched lattice pressure show no residual scaling with $C_A(Z_A/Z_*)^{\eta_Z}$ after standard electronic, magnetic, thermal, and elastic corrections, while the same law requires a nonzero heavy-atom response.
3. **Directional-strain failure:** a uniaxially stressed single crystal shows no direction-correlated residual proportional to $\hat{k}^iS_{ij}^{\mathrm{dev}}\hat{k}^j$ in the channels where the law predicts anisotropy.
4. **Transport-threshold failure:** a branch-preserving sample below $\mathcal{R}_{\text{tr},*}$ exhibits ordinary dissipative drag, or a sample above threshold sheds energy without a logged excitation, heating, radiation, or branch-transition channel.
5. **Metric/null-result failure:** the pressure response predicts photon dispersion, birefringence, preferred-frame leakage, PPN drift, or clock/signal mismatch above the validation bounds already owned by the gravity and Lorentz gates.
6. **Branch-sign failure:** measured pressure response reverses sign without a corresponding branch transition, separator crossing, or lattice-state change in the retained record.

## Two-Material Pressure Replay Scaffold

The first replay should not try to fit all condensed matter. It should test whether one heavy metallic pressure case and one lighter neighboring-metal control can share the same coefficient row after ordinary material corrections are subtracted.

The default symbolic pair is

$$
H=\mathrm{Fe},
\qquad
L=\mathrm{Cr},
$$

when the goal is a bcc transition-metal comparison with a lighter neighboring control. The alternate close-packed pair is

$$
H=\mathrm{Ni},
\qquad
L=\mathrm{Co},
$$

when the goal is a high-coordination comparison. These are replay labels, not a canon claim that chromium or cobalt is uniquely correct. A replay packet may replace the control if it gives a better match in phase, magnetic state, isotope purity, or pressure range.

For each material $M\in\{H,L\}$ and pressure step $r$, declare the corrected pressure record

$$
\mathbf{q}_{M,r}
=
\left(
\Delta\Pi_{M,r},\,
\Delta\Pi_{M,r}^{\parallel-\perp},\,
\Delta\ln n_{\max,M,r}^{\mathrm{obl}},\,
C_M\left(\frac{Z_M}{Z_*}\right)^{\eta_Z}\frac{\Delta P_{\mathrm{ext},M,r}}{K_{\text{sea}}}
\right)^T.
$$

Here $\Delta\Pi_{M,r}$ is the isotropic pressure-loading increment, $\Delta\Pi_{M,r}^{\parallel-\perp}$ is the anisotropic loading increment, and $\Delta\ln n_{\max,M,r}^{\mathrm{obl}}$ records packing-ceiling changes from $\lambda$, $\xi$, and orientation. The last entry isolates the heavy-atom scaling hypothesis.

The observable residual vector is the material-corrected channel record

$$
\mathbf{y}_{M,r}
=
\mathbf{y}_{M,r}^{\mathrm{raw}}
-\mathbf{y}_{M,r}^{\mathrm{std}},
$$

where $\mathbf{y}^{\mathrm{std}}$ contains ordinary electronic, magnetic, thermal, and elastic corrections. The retained Noether sea residual channels are

$$
\mathbf{y}_{M,r}
=
\left(
\delta\ln\Gamma_N,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln(c_{\text{eff}}/c_f),\,
\delta\mathcal{M}_{0},\,
\delta\mathcal{M}_{2},\,
\delta S_{\mathrm{dev}}
\right)^T_{M,r}.
$$

$\delta\mathcal{M}_{0}$ is the isotropic component of the medium-response tensor perturbation, $\delta\mathcal{M}_{2}$ is the leading directional or quadrupolar component, and $\delta S_{\mathrm{dev}}$ is the retained deviatoric strain channel.

The replay asks whether one matrix $B_P$ maps both materials:

$$
\widehat{\mathbf{y}}_{M,r}
=
B_P\mathbf{q}_{M,r}.
$$

The shared-row residual is

$$
\mathcal{R}_{\mathrm{row}}
=
\min_{B_P}
\sum_{M\in\{H,L\}}
\sum_r
\left\|
\mathbf{y}_{M,r}-B_P\mathbf{q}_{M,r}
\right\|_{\Sigma_{M,r}^{-1}}^2.
$$

To prevent a hidden material-specific fit, compare against a separated fit:

$$
\mathcal{R}_{\mathrm{sep}}
=
\min_{B_H,B_L}
\sum_{M\in\{H,L\}}
\sum_r
\left\|
\mathbf{y}_{M,r}-B_M\mathbf{q}_{M,r}
\right\|_{\Sigma_{M,r}^{-1}}^2,
$$

and define

$$
\mathcal{R}_{\mathrm{split}}
=
\left[
\frac{\mathcal{R}_{\mathrm{row}}-\mathcal{R}_{\mathrm{sep}}}
{\nu_{\mathrm{dof}}+\varepsilon}
-\epsilon_{\mathrm{split}}
\right]_+.
$$

The pressure law survives this replay only if

$$
\mathcal{R}_{\mathrm{row}}\le\epsilon_{\mathrm{row}},
\qquad
\mathcal{R}_{\mathrm{split}}=0,
$$

and the null-result residuals remain below their sector bounds:

$$
\mathcal{R}_{\mathrm{null}}^{P}
=
\max\left(
\mathcal{R}_{\mathrm{biref}},
\mathcal{R}_{\gamma\mathrm{disp}},
\mathcal{R}_{\mathrm{LV}},
\mathcal{R}_{\mathrm{clksig}},
\mathcal{R}_{\mathrm{tr}}
\right)
\le
\epsilon_P.
$$

The first discriminating heavy/control scaling is the pressure slope ratio for any retained channel $Y$:

$$
\mathcal{A}_{Y}^{H/L}
\equiv
\frac{
\partial Y_H/\partial P_{\mathrm{ext},H}
}{
\partial Y_L/\partial P_{\mathrm{ext},L}
}.
$$

For the cadence channel in the weak, branch-preserving, delay-dominated limit, the candidate predicts

$$
\mathcal{A}_{\Gamma}^{H/L}
\approx
\frac{
C_H Z_H^{\eta_Z}
\left(1-n_H/n_{\max,H}^{\mathrm{obl}}\right)
}{
C_L Z_L^{\eta_Z}
\left(1-n_L/n_{\max,L}^{\mathrm{obl}}\right)
}
\cdot
\frac{K_{\text{sea},L}}{K_{\text{sea},H}},
$$

up to the shared coefficient combination multiplying $\delta\ln\Gamma_N$. The same inferred $\eta_Z$ and packing factor must also work for the $\chi_{\text{sea}}$, $c_{\text{eff}}$, strain, and tensor-response channels. If Fe/Cr or Ni/Co needs a different $\eta_Z$ per channel, the Noether sea pressure law fails as a shared constitutive response.

### Replay Packet Fields

| Field | Meaning |
| --- | --- |
| `material_id` | `Fe`, `Cr`, `Ni`, `Co`, or another declared material label |
| `phase_label` | crystal phase, magnetic state, isotope choice, and pressure range |
| `Z` | nuclear charge used only inside the declared heavy-atom scaling term |
| `C_A` | coordination/compression factor for the selected material state |
| `P_ext` | applied pressure or equivalent lattice pressure record |
| `strain_principal` | three principal strain entries used to form $\Pi_\ell^{\parallel-\perp}$ and $S_{ij}^{\mathrm{dev}}$ |
| `packing_record` | $\lambda$, $\xi$, $\mathcal{O}$, and $n_{\max}^{\mathrm{obl}}$ inputs |
| `standard_corrections` | ordinary electronic, magnetic, thermal, and elastic corrections subtracted into $\mathbf{y}^{\mathrm{std}}$ |
| `residual_channels` | $\delta\ln\Gamma_N$, $\delta\ln\chi_{\text{sea}}$, $\delta\ln(c_{\text{eff}}/c_f)$, $\delta\mathcal{M}_{0}$, $\delta\mathcal{M}_{2}$, and $\delta S_{\mathrm{dev}}$ |
| `null_bounds` | birefringence, dispersion, preferred-frame, clock/signal, and transport-threshold tolerances |

### Replay Reading

- **Pass:** $\mathcal{R}_{\mathrm{row}}\le\epsilon_{\mathrm{row}}$, $\mathcal{R}_{\mathrm{split}}=0$, and $\mathcal{R}_{\mathrm{null}}^{P}\le\epsilon_P$. The pressure law remains a viable Noether sea constitutive candidate.
- **Demote:** the residual channels can be fit only by material-specific rows $B_H$ and $B_L$. The effect should be treated as ordinary material-specific condensed-matter correction unless a branch transition explains the split.
- **Fail:** any fit that passes pressure residuals by violating birefringence, dispersion, preferred-frame, clock/signal, or transport-threshold bounds is rejected by the shared closure record.
- **Bound-only result:** if the residual channels are consistent with zero, the replay still gives upper bounds on $a_S$, $m_S$, $\eta_Z$, and the pressure sensitivity of $\Gamma_N$.

The first scaffold-only worked packet is [Fe/Cr Toy Pressure Replay](pressure-replay-fe-cr-toy.md). It generates a two-material table from one declared row pair, reports $\mathcal{A}_{\Gamma}^{\mathrm{Fe/Cr}}\approx1.140$ for the toy inputs, and keeps the result explicitly below empirical-validation status. The related segregation-side packet is [Fe/Silicate Dense-Medium Segregation](fe-silicate-dense-medium-segregation.md), which asks whether an iron-rich metallic phase has lower relative medium-response cost than a silicate phase as $n$ increases, without introducing an iron-nucleus source term.

The Fe/Cr toy row now has an executable static-response bridge in `scripts/spacetime/static-response-vector-toy-model.mjs`. The bridge projects the isotropic pressure part into $\delta\mathbf{g}^{P}=(\delta\ln n,\delta\ln\chi_{\text{sea}},\delta\ln\lambda,\delta\ln R)$, checks $b\cdot\delta\mathbf{g}^{P}=\delta\ln\Gamma_N$, checks the inverse clock-rate row, and carries anisotropic pressure terms as residuals rather than hiding them inside the isotropic $\Gamma_N$ row.

The first empirical replay handoff is [Metallic-Lattice Pressure Replay Data Schema](pressure-replay-metallic-lattice-data-schema.md). It locks the material-state record, observable extractor, covariance model, shared-row fit, heavy-scaling scan, and null-sector bounds before any Fe/Cr or Ni/Co data are interpreted.

The first empty empirical packet is [Fe/Cr Empirical Pressure Replay Skeleton](pressure-replay-fe-cr-empirical-skeleton.md). It chooses Fe/Cr as the provisional first pair from the local priority stack, marks every missing material input explicitly, and keeps the current reading at `bound_only`.

The coefficient-side closure packet is [Pressure-Response Coefficient Closure](pressure-response-coefficient-closure.md). It derives the branch-conditional isotropic and anisotropic pressure combinations for $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\Gamma_N$, and $\mathcal{M}_{\text{sea}}^{ab}$, and records the null-sector bounds that prevent the replay from fitting separate observable-local pressure rows.

The density-modulus packet is [Noether sea Pressure Modulus and Packing Headroom](noether-sea-pressure-modulus-and-packing-headroom.md). It derives $K_{\mathrm{pack}}=K_{\text{sea}}/\kappa_n$, $s_n=1-n/n_{\max}^{\mathrm{obl}}$, a packing-limited pressure law, and support-function scaling targets for dense metallic replay rows.

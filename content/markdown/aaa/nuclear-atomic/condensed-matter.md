# Condensed Matter

This chapter states the condensed-matter closure target for medium-level behavior in the Noether Sea. Its current focus is Noether-Sea transport: the distinction between reversible inertial response, true resistance, and threshold behavior when matter moves through a densely coupled background of cores.

This note bridges [Atomic Structure](atomic-structure.md), [Particle Masses](../assemblies/particle-masses.md), [Spacetime Assemblies](../spacetime/spacetime-assemblies.md), and [Medium Exclusion Volume](../spacetime/medium-exclusion-volume.md), since all four depend on how the background medium stores stress and permits transport.

At present this is a closure target rather than a finished derivation. The residual and its critical value must still be extracted from stable assembly dynamics, Noether-Sea constitutive response, and the relevant stability diagnostics.

## Noether-Sea Transport

The condensed-matter claim is not that ordinary matter feels a continuous dissipative drag from the Noether Sea. In the validated weak regime, a stable assembly should move by reversible retuning: its internal causal ledger and local Noether-Sea coupling deform, store stress, and return that stress without opening a net loss channel.

### Transport Residual and Critical Surface

The useful diagnostic is a transport residual:

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr}}\!\left(
\mathbf{V}_{\text{cm}},
\mathbf{a}_{\text{cm}},
\rho_{\text{core}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
\Delta_{\mathbf{k}}
\right).
$$

Here $\mathbf{V}_{\text{cm}}$ and $\mathbf{a}_{\text{cm}}$ record center-of-mass transport, $\rho_{\text{core}}$ and $\chi_{\text{sea}}$ record the local Noether-Sea state, $\mathcal{M}_{\text{sea}}^{ab}$ records the medium-response tensor, and $\Delta_{\mathbf{k}}$ records the relevant non-symmetry stability gap. The equation defines the diagnostic target; it does not yet prove the constitutive form of $\mathcal{R}_{\text{tr}}$.

The critical surface is

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr},*}.
$$

It separates three regimes:

| Regime | Meaning |
| --- | --- |
| $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ | Reversible medium-dressed inertial response; no ordinary drag term is allowed. |
| $\mathcal{R}_{\text{tr}}\approx\mathcal{R}_{\text{tr},*}$ | Onset of medium excitation, action shedding, or branch instability. |
| $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ | Dissipative transport, radiation-like shedding, medium heating, or structural transition must be logged. |

### Reversible Response Below Threshold

Below the critical surface, the response belongs to the mass and inertia program rather than to a friction law. The closure target is that the assembly's shielded internal ledger contributes an internal momentum response of the form

$$
p_{\text{int}}^a
\approx
\alpha\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}.
$$

This is the condensed-matter version of medium-dressed inertial response. The Noether Sea may shape the response tensor, the local delay factor, and the stability margin, but it must not drain energy from a stable bound state merely because that state is moving through the medium.

### Earth-Core Iron as a Boundary Case

Earth-core iron is a useful correction case because it separates three levels that are easy to collapse. In standard geophysics and nucleosynthesis, most iron in Earth formed before Earth accreted, then became incorporated during accretion and segregated into the core during planetary differentiation. The high pressure and temperature of the core stabilize metallic phases and alter transport, electronic, and elastic response. They do not, by themselves, create iron nuclei.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation should therefore treat Earth-core iron as density sorting, metallic phase response, Noether-Sea strain, local clock and transport modification, and possible branch-preserving retuning of already existing iron assemblies. It should not treat the core as an iron-nucleus production site unless a separate reaction-provenance mechanism is derived. A compact guardrail is

$$
\partial_t \mathcal{N}_{\mathrm{Fe}}
+
\nabla\cdot\mathbf{J}_{\mathrm{Fe}}
=
S_{\mathrm{Fe}}^{\mathrm{nuc}},
\qquad
S_{\mathrm{Fe}}^{\mathrm{nuc}}=0
$$

for ordinary planetary differentiation. Here $\mathcal{N}_{\mathrm{Fe}}$ is the number density of iron nuclei and $\mathbf{J}_{\mathrm{Fe}}$ is their segregation flux. A nonzero $S_{\mathrm{Fe}}^{\mathrm{nuc}}$ would be a nuclear-reaction claim, not a condensed-matter pressure claim; it would have to preserve proton, neutron, charge, energy, momentum, and medium-provenance bookkeeping in the same spirit as [BBN Constraints](../cosmology/BBN-constraints.md) and [Nuclear Binding](nuclear-binding.md).

The pressure-side bridge may instead use a segregation functional of the form

$$
\mathbf{J}_{\mathrm{Fe}}
=
-D_{\mathrm{Fe}}\nabla\!\left[
\mu_{\mathrm{Fe}}(P,T,\theta_{\mathrm{sea}})
+
M_{\mathrm{sh}}(A_{\mathrm{Fe}};\theta_{\mathrm{sea}})\Phi_{\mathrm{eff}}
\right],
$$

where $\theta_{\mathrm{sea}}$ denotes the local Noether-Sea state record, including $\rho_{\text{core}}$, $\chi_{\text{sea}}$, $\mathcal{M}_{\text{sea}}^{ab}$, and strain data. The term $M_{\mathrm{sh}}(A_{\mathrm{Fe}};\theta_{\mathrm{sea}})$ is the medium-dressed exposed mass response of an iron assembly, not a new nuclear species. In this form the reason iron sinks is not that the center creates iron, but that existing iron-bearing assemblies minimize the relevant chemical, gravitational, and medium-response potential in dense planetary interiors.

The sharper equilibrium hypothesis is that the iron-rich metallic branch is compatible with higher normalized Noether-core density than a silicate branch at the same pressure and temperature. Let

$$
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
=
\mu_{\mathrm{Fe}}^{\mathrm{metal}}
\left(
n,P,T,\mathcal B_{\mathrm{lat}}
\right)
-
\mu_{\mathrm{silicate}}
\left(
n,P,T,\mathcal B_{\mathrm{sil}}
\right).
$$

Then the dense-medium preference condition is

$$
\frac{\partial}{\partial n}
\Delta\mu_{\mathrm{Fe/silicate}}^{\mathrm{metal}}
<
0
$$

along the planetary-interior branch, with $n=\rho_{\text{core}}/\rho_{\text{core},0}$. This does not say that Noether-Sea density creates iron. It says that, after iron already exists, the metallic iron branch may reduce relative chemical and medium-response cost as ambient Noether-core density increases. In ordinary terms, iron-rich material sinks because it is dense; in the native theory, density must eventually be derived from assembly packing, exclusion-volume response, metallic bonding, pressure response, and Noether-Sea coupling.

The metallic-phase side can be written as

$$
\Delta G_{\mathrm{Fe}}^{\mathrm{metal/silicate}}
=
\Delta G_{\mathrm{std}}(P,T)
+
\delta G_{\mathrm{sea}}\!\left(
\rho_{\text{core}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
S_{ij}
\right).
$$

The $\delta G_{\mathrm{sea}}$ term is admissible as a medium-response correction to phase stability, conductivity, elastic response, or transport. It is not admissible as a hidden transmutation channel. Branch-preserving retuning of an iron assembly must keep the nuclear inventory fixed, for example $\Delta Z_{\mathrm{Fe}}=0$ and $\Delta A_{\mathrm{Fe}}=0$, while any cadence, envelope, or transport change remains subordinate to the clock and retuning programs in [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md) and [Retuning-Map Toy Model](../validation/simulations/retuning-map-toy-model.md).

The corresponding closure residual is

$$
\mathcal{R}_{\oplus\mathrm{Fe}}
=
\mathcal{R}_{\mathrm{source}}
+
\mathcal{R}_{\mathrm{seg}}
+
\mathcal{R}_{\mathrm{phase}}
+
\mathcal{R}_{\Gamma}
+
\mathcal{R}_{\text{tr}}.
$$

The source term enforces the no-new-iron guardrail, the segregation and phase terms test the density-sorting and metallic-response claims, $\mathcal{R}_{\Gamma}$ tests the local clock-cadence handoff, and $\mathcal{R}_{\text{tr}}$ tests whether transport remains reversible or crosses into logged excitation, heating, radiation-like shedding, or branch transition. The bridge fails if it requires unlogged iron-nucleus creation, independent medium parameters for phase and clock behavior, or an ordinary drag channel below the transport threshold.

### Threshold Crossing and Failure Modes

Crossing $\mathcal{R}_{\text{tr},*}$ is the point at which reversible transport stops being the adequate description. Above threshold, some transported energy or action must route into an explicit channel: medium excitation, radiation-like transport, local heating, action shedding, or branch transition. For the dynamical bookkeeping of those channels, see [Energy](../dynamics/energy.md) and [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md).

The main failure modes are therefore sharp. If $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ still produces ordinary dissipative drag in stable atoms, the framework loses chemical stability. If $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ occurs without a logged excitation, radiation, heating, or branch-transition channel, the energy ledger is incomplete. If the threshold cannot be expressed in terms of assembly motion, local Noether-Sea state, medium response, and stability gap data, the medium-transport picture has not matured into a usable transport closure.

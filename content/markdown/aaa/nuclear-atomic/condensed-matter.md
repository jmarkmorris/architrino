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

Below the critical surface, the response belongs to the mass and inertia program rather than to a friction law. The assembly's shielded internal ledger contributes an internal momentum response of the form

$$
p_{\text{int}}^a
\approx
\alpha\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}.
$$

This is the condensed-matter version of medium-dressed inertial response. The Noether Sea may shape the response tensor, the local delay factor, and the stability margin, but it must not drain energy from a stable bound state merely because that state is moving through the medium.

### Threshold Crossing and Failure Modes

Crossing $\mathcal{R}_{\text{tr},*}$ is the point at which reversible transport stops being the adequate description. Above threshold, some transported energy or action must route into an explicit channel: medium excitation, radiation-like transport, local heating, action shedding, or branch transition. For the dynamical bookkeeping of those channels, see [Energy](../dynamics/energy.md) and [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md).

The main failure modes are therefore sharp. If $\mathcal{R}_{\text{tr}} < \mathcal{R}_{\text{tr},*}$ still produces ordinary dissipative drag in stable atoms, the framework loses chemical stability. If $\mathcal{R}_{\text{tr}} > \mathcal{R}_{\text{tr},*}$ occurs without a logged excitation, radiation, heating, or branch-transition channel, the energy ledger is incomplete. If the threshold cannot be expressed in terms of assembly motion, local Noether-Sea state, medium response, and stability gap data, the medium-transport picture has not matured into a usable transport closure.

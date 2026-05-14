# Condensed Matter and Medium Transport

This detailed priority file supports [Noether-Core Stability and First Mass Map](mass-map.md). It covers the medium-transport opportunity in [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md).

## Core Opportunity

The condensed-matter note is small, but it protects a crucial distinction: inertia is not ordinary dissipative resistance. A stable assembly moving through the Noether Sea should carry medium-dressed inertial response in the weak regime, while true resistance appears only when transport excites additional medium modes, sheds action, or crosses a stability threshold.

The useful threshold object is a transport residual:

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

Below threshold, the response is reversible retuning:

$$
p_{\text{int}}^a
\approx
\alpha\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}.
$$

Above threshold, some transported energy must enter excitation, radiation, medium heating, or branch transition channels.

## Critical Transport Gate

Define a critical surface

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr},*}.
$$

The gate separates:

| Regime | Meaning |
| --- | --- |
| $\mathcal{R}_{\text{tr}}<\mathcal{R}_{\text{tr},*}$ | reversible medium-dressed inertial response; no ordinary drag term. |
| $\mathcal{R}_{\text{tr}}\approx\mathcal{R}_{\text{tr},*}$ | onset of medium excitation, action shedding, or branch instability. |
| $\mathcal{R}_{\text{tr}}>\mathcal{R}_{\text{tr},*}$ | dissipative transport, radiation, or structural transition must be logged. |

## Promotion Targets

| Target $\mathbb{A}\mathbb{A}\mathbb{A}$ file | Promotion condition |
| --- | --- |
| [condensed-matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) | The superfluid Noether-Sea analogy is recast as a critical-transport gate with variables and failure modes. |
| [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md) | Inertia remains a medium-dressed response of shielded internal energy, not dissipative drag. |
| [energy](../../../content/markdown/aaa/dynamics/energy.md) | Transport work, excitation, and radiation channels share one ledger rather than separate vocabularies. |
| [radiation](../../../content/markdown/aaa/reactions/radiation.md) | Radiation begins only after a closure residual routes through a shedding channel. |

## Priority Boundary

This packet should not become a broad condensed-matter workstream yet. Its immediate value is to protect the mass-map and radiation programs from confusing reversible inertial response with resistance.

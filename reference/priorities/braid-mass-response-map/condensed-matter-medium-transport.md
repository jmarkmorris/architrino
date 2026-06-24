# Condensed Matter and Medium Transport

This detailed priority file supports [Noether-Core Stability and First Mass Map](braid-mass-response-map.md). It covers the medium-transport opportunity in [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md).

## Core Opportunity

The condensed-matter note is small, but it protects a crucial distinction: inertia is not ordinary dissipative resistance. A stable assembly moving through the Noether sea should carry medium-dressed inertial response in the weak regime, while true resistance appears only when transport excites additional medium modes, sheds action, or crosses a stability threshold.

The useful threshold object is a transport residual:

$$
\mathcal{R}_{\text{tr}}
=
\mathcal{R}_{\text{tr}}\!\left(
\mathbf{V}_{\text{cm}},
\mathbf{a}_{\text{cm}},
\rho_{\text{NS}},
\chi_{\text{sea}},
\mathcal{M}_{\text{sea}}^{ab},
\Delta_{\mathbf{k}}
\right).
$$

Below threshold, the response is reversible retuning:

$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b}.
$$

Above threshold, some transported energy must enter excitation, radiation, medium heating, or branch transition channels.

When the threshold is crossed, this packet consumes the shared [residual-routing event-ledger theorem](../braid-nested-shell-causal-closure/residual-routing-event-ledger.md). It owns $\mathcal{R}_{\text{tr}}$, the transport thresholds, and condensed-matter benchmark failures; the shared packet owns the general channel-routing and ledger contract.

## Critical Transport Surface

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

## Reversible/Loss Channel Split

The replay object should separate medium-dressed response from transport loss before any material fit is interpreted. For a transported assembly or material cell over a row interval $r\to r+1$, write the transport energy update as

$$
\Delta E_{\mathrm{tr},r}
=
\Delta E_{\mathrm{rev},r}
+
\Delta E_{\mathrm{exc},r}
+
\Delta E_{\mathrm{heat},r}
+
\Delta E_{\mathrm{rad},r}
+
\Delta E_{\mathrm{branch},r}
+
\Delta E_{\mathrm{rem},r}.
$$

Here $\Delta E_{\mathrm{rev},r}$ is stored-and-returned medium response, while the remaining terms are logged excitation, heating, radiation-like shedding, branch-transition, and remnant channels. The no-drag rule below threshold is therefore the row condition

$$
\mathcal{R}_{\text{tr},r}<\mathcal{R}_{\text{tr},*}
\quad\Longrightarrow\quad
\Delta E_{\mathrm{exc},r}
+
\Delta E_{\mathrm{heat},r}
+
\Delta E_{\mathrm{rad},r}
+
\Delta E_{\mathrm{branch},r}
=0
$$

up to the declared uncertainty of the replay. A row with nonzero loss-channel energy below threshold is not a mass-map refinement; it is a transport failure. A row above threshold may still be physically admissible, but it cannot be used as a branch-preserving inertial or segregation row unless the event ledger names the opened channel:

$$
\mathcal{R}_{\text{tr},r}\ge\mathcal{R}_{\text{tr},*}
\quad\Longrightarrow\quad
\Delta E_{\mathrm{exc},r}
+
\Delta E_{\mathrm{heat},r}
+
\Delta E_{\mathrm{rad},r}
+
\Delta E_{\mathrm{branch},r}
+
\Delta E_{\mathrm{rem},r}
\text{ is declared.}
$$

This turns the transport residual into a proof/simulation gate. The reversible response tensor $\mathcal{M}_{\text{sea}}^{ab}$ may dress $p_{\text{int}}^a$ below threshold, but it cannot hide an unlogged scalar drag coefficient. Conversely, observed heating, phonon creation, radiation, or structural change above threshold should be routed as a loss-channel event rather than absorbed into the inertial coefficient.

## Reversible Symmetric Response Lemma

Promotion status: the reader-facing version of this lemma was promoted into [Condensed Matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) on May 20, 2026. The coefficient extraction for $\mathcal{M}_{+}^{ab}$ remains priority-side and depends on the medium-response probe.

Split the medium-response tensor into symmetric and antisymmetric parts:

$$
\mathcal{M}_{\text{sea}}^{ab}
=
\mathcal{M}_{+}^{ab}
+
\mathcal{M}_{-}^{ab},
\qquad
\mathcal{M}_{\pm}^{ab}
=
\frac{1}{2}
\left(
\mathcal{M}_{\text{sea}}^{ab}
\pm
\mathcal{M}_{\text{sea}}^{ba}
\right).
$$

Below the transport threshold, the reversible kinetic scalar for a transported assembly is

$$
K_{\mathrm{rev}}
=
\frac{1}{2}
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
V_{\text{cm},a}\mathcal{M}_{+}^{ab}V_{\text{cm},b}.
$$

The antisymmetric part cannot contribute because

$$
V_{\text{cm},a}\mathcal{M}_{-}^{ab}V_{\text{cm},b}=0.
$$

Therefore the below-threshold momentum and directional mass readout are

$$
p_{\mathrm{rev}}^{a}
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{+}^{ab}V_{\text{cm},b},
\qquad
m_{\mathrm{eff}}(\hat v;A,\theta_{\mathrm{sea}})
=
\alpha_{\mathrm{m}}\zeta(A)E_{\text{internal}}(A)\,
\hat v_a\mathcal{M}_{+}^{ab}(\theta_{\mathrm{sea}})\hat v_b.
$$

Proof route: every reversible scalar energy quadratic in $V_{\text{cm}}$ contracts a velocity covector with the response tensor and the same velocity again. The contraction is symmetric in the two velocity factors, so the antisymmetric tensor part cancels identically. Any measured or simulated antisymmetric residue must therefore be reported as orientation, circulation, Hall-like transverse response, transport loss, or event-ledger residue, not as scalar rest mass.

## Tier 2 Source-Mining Addendum

The condensed-matter, analogue-gravity, and topological-defect source family sharpens this packet in three concrete ways.

| Source signal | Extracted structure | Use in this packet |
| --- | --- | --- |
| Analogue gravity in flowing media: [Barcelo/Liberati/Visser](https://arxiv.org/abs/gr-qc/0505065) and [Visser acoustic black holes](https://arxiv.org/abs/gr-qc/9712010) | Linear perturbations see an effective metric algebraically determined by density, flow velocity, and signal speed, while the underlying medium obeys its own non-Einstein dynamics. | Treat $g_{\mu\nu}^{\text{eff}}$ and $\mathcal{M}_{\text{sea}}^{ab}$ as constitutive readouts of one Noether sea state record, not as independent metric or drag laws. |
| Volovik-style emergent-medium examples: [Induced Gravity in Superfluid $^3$He](https://arxiv.org/abs/cond-mat/9806010) and [field theory in $^3$He](https://arxiv.org/abs/cond-mat/9812381) | Gap nodes, order-parameter textures, and quasiparticle spectra can generate effective gauge/metric behavior only after the condensed-matter order parameter is specified. | Use emergent-medium language only when the Noether braid branch record, orientation record, and stability gap are explicit. Do not import unsupported `superfluid` language into the Noether sea. |
| Topological defects and vortices: [Mermin](https://doi.org/10.1103/RevModPhys.51.591), [Kosterlitz-Thouless](https://doi.org/10.1088/0022-3719/6/7/010), and superconducting vortex-pair tests such as [Beasley/Mooij/Orlando](https://doi.org/10.1103/PhysRevLett.42.1165) | Defect stability is controlled by an order-parameter target space, winding or homotopy class, stiffness, and a critical unbinding or branch-opening threshold. | Admit a topological or vortex-like transport claim only as a branch-transition or effective-material recovery target, never as a generic Noether sea drag term. |

The safe topological-defect test is therefore not a new medium ontology. It is an admissibility condition for any claimed defect channel. A source-level order-parameter comparison must exhibit a projection from the retained branch record to an effective target space,

$$
\pi:\Theta_{\mathrm{sea}}\longrightarrow Q\in\mathcal{Q},
$$

and a loop or surface invariant such as

$$
\mathcal{I}_\gamma
=
\left[Q|_\gamma\right]\in\pi_1(\mathcal{Q}),
\qquad
\nu_\gamma
=
\frac{1}{2\pi}\oint_\gamma d\varphi
\in\mathbb Z.
$$

The invariant may change only when the relevant material or Noether sea branch ceases to be the same branch. In this packet the conservative routing rule is

$$
\Delta\mathcal{I}_\gamma\ne0
\quad\Longrightarrow\quad
\Delta_{\mathbf{k}}\to0
\quad\text{or}\quad
\mathcal{R}_{\text{tr}}\ge\mathcal{R}_{\text{tr},*}.
$$

Thus a defect, vortex, dislocation, edge mode, or quantized transport analogy can sharpen the threshold test, but it cannot become a hidden dissipative force below the critical surface.

## Promotion Targets

| Target $\mathbb{A}\mathbb{A}\mathbb{A}$ file | Promotion condition |
| --- | --- |
| [condensed-matter](../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md) | The unsupported medium analogy is recast as a transport residual with variables, a critical surface, and failure modes. |
| [particle-masses](../../../content/markdown/aaa/assemblies/particle-masses.md) | Inertia remains a medium-dressed response of shielded internal energy, not dissipative drag. |
| [energy](../../../content/markdown/aaa/dynamics/energy.md) | Transport work, excitation, and radiation channels share one ledger rather than separate vocabularies. |
| [radiation](../../../content/markdown/aaa/reactions/radiation.md) | Radiation begins only after a closure residual routes through a shedding channel. |

## Priority Boundary

This packet should not become a broad condensed-matter workstream yet. Its immediate value is to protect the mass-map and radiation programs from confusing reversible inertial response with resistance.

# Radiation Gate C Benchmarks

This detailed priority file supports [Tri-Binary Causal Closure](tri-binary-causal-closure.md). It captures the missing priority coverage for [Radiation](../../../content/markdown/aaa/reactions/radiation.md), [Atomic Transition Radiation](../../../content/markdown/aaa/reactions/atomic-transition-radiation.md), [Bremsstrahlung](../../../content/markdown/aaa/reactions/bremsstrahlung.md), and [Synchrotron Cascades](../../../content/markdown/aaa/reactions/synchrotron.md).

## Core Opportunity

Radiation Gate C is where local assembly relaxation must recover validated electromagnetic and QED-like benchmarks. The local object is not "energy loss" as a primitive field emission. It is a routed closure residual:

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma(t),
\mathcal{C}_{o'j}(t),
J_{o'j},
\rho_{\text{core}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t)
\right).
$$

A resolved event must then close an event ledger:

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{core remnant}}
+
\Delta E_{\text{rxn}}.
$$

The high-value theorem target is to derive the routing functional that decides when the residual retunes, when it becomes a coaxial contra-rotating pro/anti planar pair, and when it routes into non-radiative medium or reaction channels.

For photon-producing routes, Gate C is the predicate
$$
\operatorname{GateC}_{\gamma}(\mathsf e)
=
\operatorname{Ledger}_{\gamma}(\mathsf e)
\wedge
\operatorname{Trans}_{\gamma}(\mathsf e)
\wedge
\operatorname{Bench}_{\gamma}(\mathsf e).
$$
Here $\operatorname{Ledger}_{\gamma}$ requires $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after photon output, recoil, remnant, medium update, and provenance rows are included. The transversality row is
$$
\operatorname{Trans}_{\gamma}(\mathsf e)
\Longleftrightarrow
\left\|
P_{\parallel,\hat{\mathbf{k}}}
\Pi_{\gamma}\mathcal{L}_A(\mathsf e)
\right\|_{\gamma}
\le
\epsilon_{\gamma,\parallel},
$$
so any longitudinal response must cancel, remain unexposed below tolerance, or route to a material or massive-vector channel rather than a free photon. $\operatorname{Bench}_{\gamma}$ is the benchmark recovery row for the selected event family: atomic transition, bremsstrahlung, synchrotron, Compton-like scattering, pair channel, or blackbody/thermal radiation.

The photon-specific Gate C factor does not replace the shared residual-routing predicate. A photon-producing radiation event is promotable only when

$$
\operatorname{Promote}_{\mathrm{rad},\gamma}(\mathsf e)
=
\operatorname{Replay}_{\mathrm{rad}}(\mathsf e)
\wedge
\operatorname{Route}_{\mathrm{rad}}(\mathsf e)
\wedge
\operatorname{Compat}_{\mathrm{rad}}(\mathsf e)
\wedge
\operatorname{GateC}_{\gamma}(\mathsf e)
\wedge
\operatorname{Accept}_{\mathrm{rad}}(\theta_{\mathsf e}).
$$

Thus Gate C is the radiation-sector specialization of the shared residual-routing contract, with photon-specific ledger, transversality, and benchmark rows added after replayability, route admissibility, and channel compatibility are satisfied.

For a declared benchmark family $b$, Gate C should export a normalized row vector rather than a narrative pass:

$$
\mathbf{R}_{\gamma,b}(\mathsf e)
=
\left(
\frac{\Delta_E}{E_b+\varepsilon},
\frac{\|\Delta_{\mathbf{p}}\|}{p_b+\varepsilon},
\frac{\|\Delta_{\mathbf{J}}\|}{J_b+\varepsilon},
\frac{\left\|P_{\parallel,\hat{\mathbf{k}}}\Pi_{\gamma}\mathcal{L}_A(\mathsf e)\right\|_{\gamma}}{\epsilon_{\gamma,\parallel}},
R_{\mathrm{bench},b},
R_{\mathrm{replay},b}
\right).
$$

Here $E_b$, $p_b$, and $J_b$ are declared benchmark scales for the selected family, not fitted recovery knobs. $R_{\mathrm{bench},b}$ is the family-specific residual, such as Larmor/Lienard power, Compton shift, pair threshold, or Planck occupation. $R_{\mathrm{replay},b}$ vanishes only when the same residual definition, channel boundary, and Noether-Sea variables replay across the selected event panel without retuning. The Gate C acceptance target is

$$
\left\|\mathbf{R}_{\gamma,b}(\mathsf e)\right\|_{\infty}
\le
1
$$

after photon Gate A supplies the admissible massless branch and photon Gate B supplies the transverse ledger. This row vector is the first population target for the packet: an event family is not closed by matching one scalar benchmark if energy, momentum, angular momentum, transversality, provenance, or replayability still fails.

This packet is the first worked case for the shared [residual-routing event-ledger theorem](residual-routing-event-ledger.md). It owns the radiation-specific residual, channel list, benchmark recoveries, and failure modes; the shared packet owns the common routing and event-ledger contract.

Radiation channel visibility also consumes the shared [exposure-quotient theorem](../mass-map/exposure-quotient-theorem.md). This packet owns the radiation-specific emission/absorption handoff; the shared exposure packet owns the projection/quotient rule that decides which internal residual route becomes a visible photon channel, material update, or non-radiative response.

## Benchmark Gate Table

| Benchmark | Required recovery | Failure mode |
| --- | --- | --- |
| Larmor/Lienard limit | Recover $P\propto\|\mathbf{a}\|^2$ in the weak nonrelativistic limit, with relativistic clock/ruler conversion routed through the effective metric program. | Power law requires a separate phenomenological radiation-reaction term. |
| Bremsstrahlung | Recover free-free scaling, screening/form-factor corrections, and recoil from one event record. | Emissivity and cross-section need incompatible Noether-Sea variables. |
| Synchrotron | Recover $\nu_c\propto\gamma^2B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ in the effective magnetic-state map. | The $\gamma^2$ frequency scaling is absent or the effective $B$ map changes between curvature and emission. |
| Atomic transitions | Close basin-transition records with energy, momentum, angular momentum, recoil, medium excitation, and photon Gate A/B handoff data. | Line emission is treated as automatic rather than as a planar-mode gate. |
| Pair channels | Recover pair thresholds and provenance without unbalanced creation from nothing. | Pair production lacks source inventory, momentum ledger, or Noether-core recruitment. |
| Compton-like scattering | Recover Compton shift, Thomson limit, and Klein-Nishina correction as one Gate C vertex. | Frequency change becomes untracked loss rather than closed recoil and photon provenance. |
| Blackbody recovery | Recover Planck occupation, zero effective photon chemical potential, thermalization depth, and redshift handoff without retuning the Noether-Sea map. | CMB or thermal radiation requires per-observable photon loading. |

## Failure-Code Map

Radiation Gate C reuses the shared residual-routing failure codes. Radiation-local codes name existing Gate C factors rather than adding new gates.

| Gate C failure | Failure code | Predicate blocked |
| --- | --- | --- |
| Same recorded state produces different residuals, channel boundaries, or replay rows. | `residual.replay_failure` | $\operatorname{Replay}_{\mathrm{rad}}$ |
| A photon, retuning, medium, remnant, or reaction route is selected while its boundary test fails. | `route.boundary_failure` | $\operatorname{Route}_{\mathrm{rad}}$ |
| Selected channels require incompatible remnant states, Noether-Sea updates, provenance records, or duplicate inventory. | `route.channel_incompatibility` | $\operatorname{Compat}_{\mathrm{rad}}$ |
| Energy, momentum, or angular momentum remains nonzero after all named outputs are included. | `event.ledger_residual` | $\operatorname{Ledger}_{\gamma}$ |
| Polarity, architrino inventory, source identity, emission time, causal-root branch, or branch-Jacobian provenance fails. | `event.inventory_provenance_failure` | $\operatorname{Ledger}_{\gamma}$ |
| Medium heating, recoil, retained excitation, or remnant deformation is used as an implicit loss term. | `event.medium_remnant_failure` | $\operatorname{Ledger}_{\gamma}$ |
| A claimed free photon has $\left\|P_{\parallel,\hat{\mathbf{k}}}\Pi_{\gamma}\mathcal{L}_A(\mathsf e)\right\|_{\gamma}>\epsilon_{\gamma,\parallel}$ with no material, massive-vector, or remnant route. | `radiation.longitudinal_leak` | $\operatorname{Trans}_{\gamma}$ |
| The family row vector has $\left\|\mathbf{R}_{\gamma,b}(\mathsf e)\right\|_{\infty}>1$. | `radiation.benchmark_residual` | $\operatorname{Bench}_{\gamma}$ |

## First Atomic-Transition Row

The first concrete Gate C population target should be one atomic transition event before the packet generalizes to continuum radiation. For a transition $\mathsf e_{a}:i\to f+\gamma+Y$ with residual non-photon outputs $Y$, the ledger row is

$$
E_i-E_f
=
h\nu
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{med}}
+
\Delta E_{\text{rem}}
$$

with vector rows

$$
\mathbf{p}_i-\mathbf{p}_f
=
\mathbf{p}_{\gamma}
+
\Delta \mathbf{p}_{\text{recoil}}
+
\Delta \mathbf{p}_{\text{med}}
+
\Delta \mathbf{p}_{\text{rem}},
$$

and

$$
\mathbf{J}_i-\mathbf{J}_f
=
\mathbf{J}_{\gamma}
+
\Delta \mathbf{J}_{\text{recoil}}
+
\Delta \mathbf{J}_{\text{med}}
+
\Delta \mathbf{J}_{\text{rem}}.
$$

The photon row must also carry

$$
E_{\gamma}=h\nu,
\qquad
\|\mathbf{p}_{\gamma}\|=\frac{h\nu}{c_\gamma},
\qquad
m_{\gamma}^{2}=0,
$$

plus the Gate A/B handoff fields $(\hat{\mathbf{k}},\hat{\mathbf{e}}_{\gamma},\phi_{\text{geom}},d,\delta_\gamma)$ when the planar-pair branch is used. This row is a theorem target, not a fitted spectroscopy model: the event passes only if the line energy, recoil, medium update, remnant state, photon branch, and replay residual all close in the same event record.

## Photon Attenuation Data Panel

The photon cross-section source row is routed here as a finite benchmark panel rather than left as a broad source-mining queue. A Gate C material event should eventually choose a small declared material/energy panel from photon attenuation data and test
$$
I/I_0=\exp[-(\mu/\rho)x]
$$
alongside component routing for scattering, photoelectric absorption, pair or triplet production, recoil, remnant state, and medium update rows. The table values are benchmark targets only; they are not substrate ontology and they should not be mined exhaustively material by material before a concrete Gate C event family exists.

## Minimal Gate Functional

The radiation pages already suggest a planar-mode nucleation gate. Promote that into a theorem target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{core}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}.
$$

The proof burden is not to fit $\mathcal{S}_{\gamma,*}$. It is to derive the local drive $\mathcal{S}_{\gamma}$ from causal-wake strain, root-branch data, Noether-Sea coupling, and return-map separatrices. The threshold $E_{\gamma,\min}$ is only a branch-local photon-nucleation threshold for a declared event family; it must either be derived from Gate A/C coupling or removed if the Gate A free-space branch has no stable floor.

## Promotion Path

1. Define $\mathcal{R}_{\Theta}$ from the delayed root/Jacobian ledger in a driven assembly.
2. Define excitation basins and separatrices for retuning, internal excitation, planar-mode nucleation, and reaction/dissociation.
3. Close one atomic transition ledger with explicit $E$, $\mathbf{p}$, and $\mathcal{J}$ records.
4. Extend the same event record to bremsstrahlung and synchrotron limits.
5. Only after those pass, promote blackbody and cosmology-facing photon-loading claims into CMB and BBN closure.

## Related Priority Routes

- Residual-routing and event-ledger closure are owned by [residual-routing-event-ledger](residual-routing-event-ledger.md).
- Sector visibility and exposure/quotient closure are owned by [exposure-quotient-theorem](../mass-map/exposure-quotient-theorem.md).
- Photon Gate A and Gate B remain upstream gates in [Tri-Binary Causal Closure Synthesis](rest-mass-proper-time-relativity-synthesis.md) and [Angular Momentum and Spin Closure](../angular-momentum-spin/angular-momentum-spin.md).
- Reaction and cosmology provenance should be checked against [cosmology-closure](../cosmology-closure/cosmology-closure.md) and [strong-field-closure](../strong-field-closure/strong-field-closure.md).

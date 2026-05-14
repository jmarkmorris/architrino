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

## Minimal Gate Functional

The radiation pages already suggest a planar-mode nucleation gate. Promote that into a theorem target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{core}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}.
$$

The proof burden is not to fit $\mathcal{S}_{\gamma,*}$. It is to derive the local drive $\mathcal{S}_{\gamma}$ from causal-wake strain, root-branch data, Noether-Sea coupling, and return-map separatrices. The minimum photon cost $E_{\gamma,\min}$ must either be derived or removed if the Gate A free-space branch has no stable floor.

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

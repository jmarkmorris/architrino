# Master-Equation Closure

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `53.84`
- Cost: `6.0`
- ROI: `8.97`
- Status: `blocked-on-new-causal-wake-construction`

## Task Queue

1. `causal_wake_update_law` — Derive the smallest independently evolving wake state, with state variables and emission, propagation, reception, and boundary updates declared before evolution. On regular charts the update must reduce to the canonical transmitter-side acceleration without reading future receiver history or defining the wake from a conservation residual. Status: `blocked-on-new-Architrino-native-construction`. Evidence and obstruction packets: [Independent Causal Wake-State Closure](independent-causal-wake-state-closure.md) and [Independent Causal Wake-State Minimum and Obstruction](analysis-independent-causal-wake-state.md).
2. `finite_coincident_same_transmitter_transition` — Derive a finite, unique, open-neighborhood continuation through complete coincident same-transmitter root birth on the state update from item 1. The continuation must not be an event-only patch or depend on regulator path. Status: `blocked-on-item-1`; accept only jointly with item 3. Negative controls: [source-density fold and coincident-birth analysis](../app-eom/analysis-source-density-fold-and-coincident-birth.md) and [minimal causal wake-state analysis](../app-eom/analysis-minimal-causal-wake-state-model.md).
3. `same_update_conserved_accounts` — Derive Architrino-native motion, wake, and boundary accounts for energy, momentum, and angular momentum on exactly the causal retained-history update used by items 1 and 2. The account maps must be fixed before evolution and may not import mass-based single-architrino formulas or be defined as whatever cancels the residual. Status: `blocked-on-item-1`; accept only jointly with item 2.

## Scope

This workstream owns only the three coupled obligations above: the causal wake
update law, the finite coincident same-transmitter transition, and all three
conserved accounts on that same update. A certified braid belongs to the Braid
Program, while observer-level recovery belongs to its downstream theory lanes.
Neither is a Master Equation closure task.

The live global blocker is not another receiver-weighted branch certificate.
It is the absence of one Architrino-native causal state update that both crosses
coincident same-transmitter birth finitely and supplies non-circular conserved
accounts. Root topology, inactive gaps, finite-memory bounds, transmitter-side
floors, and signed playback remain necessary geometry. They do not determine
the missing wake state or its accounts.

## Joint Closure Target

The candidate complete causal state at absolute time $T$ has the form

$$
\mathcal S_T
=
\left(\{\mathcal H_i^T\}_{i=1}^{N},\mathcal W_T\right),
$$

where $\mathcal H_i^T$ is the retained path history and $\mathcal W_T$ is the
smallest independently evolving wake state. Independence means that
$\mathcal W_T$ is not reconstructed after the fact as whatever value cancels a
motion-account residual. Its variables, emission rule, propagation rule,
reception rule, and boundary rule must be declared before evolution.

The required causal update is

$$
\left(\mathcal S_{T+\Delta T},\Phi_{\partial}[T,T+\Delta T]\right)
=
\mathcal U_{\Delta T}(\mathcal S_T),
$$

with no future receiver path as input. On every certified regular chart it must
reduce to

$$
\mathbf A_i(T)
=
\sum_j\sum_{T_t\in\mathcal C_{ij}(T)}
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^{2}|D_{t,ij}|}
\hat{\mathbf r}_{ij}.
$$

At coincident same-transmitter birth it must instead produce a unique accepted
post-transition state with

$$
\int_{T_0}^{T_0+\epsilon}\|\mathbf A_{ii}(T)\|\,dT<\infty
$$

for some certified $\epsilon>0$, without inserting an unowned event-only patch.
The same update must derive motion and wake accounts satisfying

$$
\Delta E_{\mathrm{motion}}+\Delta E_{\mathcal W}+\Phi_E=0,
$$

$$
\Delta\mathbf P_{\mathrm{motion}}+\Delta\mathbf P_{\mathcal W}
+\boldsymbol\Phi_P=\mathbf 0,
$$

$$
\Delta\mathbf L_{\mathrm{motion}}+\Delta\mathbf L_{\mathcal W}
+\boldsymbol\Phi_L=\mathbf 0.
$$

The motion maps in these equations are themselves derivation targets; they may
not be imported as single-architrino mass, $m\mathbf v$, or $\tfrac12mv^2$.

Acceptance fails if the wake state reads future reception data, is defined from
the conservation residual it must explain, changes the regular simple-root law,
requires an undeclared observer-level field law, leaves the coincident transition
regulator-path dependent, or closes only one of the three conserved accounts.

## Current Authority And Revocation Boundary

| Packet class | Current disposition |
| --- | --- |
| [Receiver-normal branch-strength certificate](history/receiver-normal-branch-strength-certificate.md), [receiver-normal restart ledger](history/receiver-normal-master-equation-restart-ledger.md), and [receiver-normal wake-action factor](history/receiver-normal-wake-action-factor.md) | Revoked as current acceleration, action, or promotion authority and isolated under `history/`. Do not populate or cite their receiver-weighted certificate targets as current evidence. |
| [Detailed branch-closure program](branch-closure-program.md), [A1 restart](spiral-a1-restart.md), and [VP-1 restart](spiral-vp1-restart.md) | Root geometry may survive. Every acceleration, action, power, force-balance, stability, outward-constant, or pass/fail conclusion depending on $|D_r/D_t|$ must be recomputed with transmitter-side acceleration and separate playback. |
| A1 and VP-1 root-window, inactive-gap, finite-memory, Jacobian, and root-transport packets | Preserve certified root identities, retained intervals, history coverage, $D_t$ floors, and $D_r/D_t$ playback within their declared reach. Remove receiver-weighted acceleration dependencies before reuse. |
| [Pressure-dependent Noether sea constitutive response](pressure-dependent-noether-sea-constitutive-response.md) | Retain as a derivation target, but replace its receiver-weighted intake with accepted transmitter-side branch records and the wake-state variables derived by item 1. |
| Canonical Master Equation and `master_eom_binding/v1` EOM records | Current authority on the certified regular domain. Receiver-side factors remain required for signed playback, not acceleration magnitude. |
| Numerical evidence produced under the removed acceleration law | Historical only. It may test instrumentation or topology within its declared reach, but it cannot support a current physical branch, stability, action, or recovery claim without recomputation. |

## Preserved Topology And Interval Evidence

The following packets remain separate because each owns distinct mathematical
geometry rather than an accepted receiver-weighted physical verdict:

- A1 root windows, inactive gaps, Jacobian floor, self-coincidence clearance, and finite-memory bound: [spiral-a1-root-window-certificate.md](spiral-a1-root-window-certificate.md).
- A1 differentiated root identity and transport residual: [spiral-a1-root-transport-interval-proof.md](spiral-a1-root-transport-interval-proof.md).
- VP-1 sampled active-root continuation and Jacobian margins: [spiral-vp1-root-jacobian-proof.md](spiral-vp1-root-jacobian-proof.md).
- VP-1 finite-memory, self-coincidence, inactive-complement, and transport setup: [spiral-vp1-inactive-memory-proof.md](spiral-vp1-inactive-memory-proof.md).
- VP-1 outward interval active tubes and inactive gaps: [spiral-vp1-interval-root-gap-proof.md](spiral-vp1-interval-root-gap-proof.md).
- VP-1 analytic root-transport identity: [spiral-vp1-root-transport-interval-proof.md](spiral-vp1-root-transport-interval-proof.md).

These packets may seed a transmitter-side rebuild only after every use of
$D_r/D_t$ has been classified as playback rather than acceleration strength.

## Promotion Map

| Task | Primary corpus destination | Gate |
| --- | --- | --- |
| `independent_causal_wake_state_closure` | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) and [Energy](../../../content/markdown/aaa/dynamics/energy.md) | One independently reconstructed causal update derives its wake variables, regular-domain reduction, finite coincident same-transmitter transition, and all three conserved accounts without residual-defined bookkeeping. |
| `certified_eigen_braid` | [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md), [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md), and [Energy](../../../content/markdown/aaa/dynamics/energy.md) | One replayable retained branch closes root, memory, acceleration, wake-state, returned-section, and stability records under refinement. |
| `spiral_branch_chart_test` | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) | One VP-1 or A1 candidate reports retained topology, transmitter-side radial/tangential aggregation, separate signed playback, and negative controls. |
| `lorentz_gr_bridge` | [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Moving-assembly and shared medium-response packets close without per-observable retuning or preferred-frame leakage above bound. |

## Dependencies

- The EOM solver supplies retained histories, certified transmitter-side acceleration records, signed playback, and fail-closed singular-event records. It does not invent the missing wake state.
- The coincident-birth and conservation-obstruction analyses in `../app-eom/` define negative controls for item 1.
- Mass, quantum, spin, cosmology, and reaction programs may consume an accepted branch certificate but may not infer closure from its existence.

## Related Priorities

- [Quantum closure](../quantum-closure/priorities.md)
- [Strong-field closure](../strong-field-closure/priorities.md)
- [Cosmology closure](../cosmology-closure/priorities.md)
- [Equation mapping](../equation-mapping/priorities.md)

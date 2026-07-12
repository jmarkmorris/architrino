# Master-Equation Closure and Certified Eigen-Braid Root

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `42.32`
- Cost: `6.0`
- ROI: `7.05`
- Status: `active`

## Receiver-Normal Restart Rule

The receiver-normal Master EOM branch-strength row is the receiver-normal factor
$W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$. The restart ledger is
[receiver-normal-master-equation-restart-ledger.md](receiver-normal-master-equation-restart-ledger.md),
and the local identity packet is
[receiver-normal-wake-action-factor.md](receiver-normal-wake-action-factor.md).
The minimum restarted force/action certificate is
[receiver-normal-branch-strength-certificate.md](receiver-normal-branch-strength-certificate.md).
Retained root labels, inactive gaps, finite-memory rows, source-normal
transversality floors, and root-transport rows may survive as conditional
topology inputs. Force-balance, action, power, Noether wake-history, A1 outward
constants, and generated pass/fail certificates must restart with same-record
$D_T/D_s$ branch-strength rows.

The policy is proof-process restart, not verdict repair. Any proof route that
used a force/action row lacking same-record $D_T$ starts over at the first
receiver-normal branch table. Earlier topology rows may be re-used only as
conditional inputs after they are rebound to the same $D_s$, $D_T$, and
$W^{\mathrm{rec}}$ record. No previous no-go, margin, constant, or pass/fail
verdict is inherited.

## Task Queue

1. `certified_eigen_braid` — Exhibit one certified eigen-braid branch with a populated retained packet: dual-mollified law, signed causal-root complex $(C_+,C_-)$, positive Jacobian floor $\nu_J>0$, inactive-gap and finite-memory rows, bounded $\mathcal R_{\mathrm{EOM}}$ and $\mathcal R_{\mathrm{per}}$, closed energy/action and Noether wake-history rows, and a projected non-symmetry Floquet or Conley margin. Status: `active`. Depends on: none.
2. `receiver_normal_branch_strength_certificate` — Upgrade the accepted
   analytic row-shape certificate into the first branch-family same-record
   branch-strength certificate with retained root id, source/receiver ids,
   $D_s$, $D_T$, $W^{\mathrm{rec}}$, first derivative rows
   $D_vD_s,D_vD_T,D_vW^{\mathrm{rec}}$, radial/tangential projection rows,
   aggregation row, scalar statistic row, source artifact hash, regulator
   state, and fail-closed negative controls. H39/theta3minus attempts must pass
   through `h39-receiver-normal-retained-record-preimage-row/v0` before any
   provider-object row can be consumed by this certificate. Status:
   `branch-family-fixture-accepted; domain-branch-family-restart-active`;
   analytic row-shape and linear moving-receiver branch-family fixture accepted.
   Depends on: none.
3. `spiral_branch_chart_test` — Rebuild the variable-pitch spiral branch-chart
   test from the receiver-normal Master EOM. Root-topology subrows may survive
   only as conditional geometry inputs; radial, tangential, action, power, and
   pass/fail rows must restart from same-record $D_s$, $D_T$, and
   $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ intervals before any promotion.
   Status: `active-restart`. Depends on: none.
4. `a1_outward_constants_handoff` — Emit an A1 outward-constants contract only
   after the retained A1 chart has same-box $D_s$, $D_T$, and
   $W^{\mathrm{rec}}$ rows. Status: `active-restart`; superseded sampled ladders,
   finite-difference repair searches, and generated pass/fail sidecars are
   purged as force/action evidence. Depends on: `spiral_branch_chart_test`.
5. `lorentz_gr_bridge` — Close the Lorentz and weak-field GR bridge from the coarse-grained delayed medium. Status: `pending`. Depends on: `certified_eigen_braid`.
6. `lorentz_test_residual_handoff` — Export RMS, PPN, and SME-style residual rows from the Lorentz/GR bridge packet. Status: `pending`. Depends on: `lorentz_gr_bridge`.
7. `emission_flux_jacobian_conservation` — Prove that source-provenanced constant causal-wake emission over an expanding wake surface preserves emitted polarity weight and supplies the source-normal denominator on a simple-root chart, without importing legacy potential-sphere language or treating the wake as an autonomous field substance. Status: `priority-only; receiver-normal action-factor audit added`. Notes: active force/action rows must use receiver-normal branch strength $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$, while accumulated action, power, and wake-history rows must declare the receiver-normal factor $ds_\ell/dt=(c_f-\hat{\mathbf r}\cdot\mathbf v_i)/(c_f-\hat{\mathbf r}\cdot\mathbf v_j)$ on the same retained record; see [receiver-normal-wake-action-factor](receiver-normal-wake-action-factor.md). Depends on: dual-mollified law; branch promotion depends on the retained branch-chart packet.
8. `binary_perturbation_projection_classifier` — Split finite binary perturbations into radial and tangential projection rows, then decide whether the response is same-branch phase, radius/cadence retuning, or branch transition. Status: `priority-only`. Depends on: `certified_eigen_braid`.
9. `topological_causal_root_ledger_proof_target` — Work out whether causal-root topology on a neutral 3-torus can supply an EOM-independent closed-ledger admissibility theorem: roots persist as winding-labeled retained path-history records, root counts change only through declared boundary strata, and every boundary contribution is absent, paired, or routed into the same retained source record before any downstream EOM consumer may use the row. Status: `priority-only theorem target; executable-diagnostic-chain-active`. The current chain has separate priority-only diagnostics for topological roots, photon constituent root routing, near-$c_f$ middle-hinge root-status routing, same-retained-history source-record contract, Noether sea handoff compatibility, wake-history event pullback, action-boundary pullback, and the closed-ledger compositor. The source-record contract checks that root topology, Noether handoff, photon route artifact and sample rows, middle-hinge route artifact and sample rows, event pullback, and action pullback name the same retained history before the boundary equation is evaluated; it now includes an `eom-label-decoy-without-topological-ledger` negative control proving that an EOM or force-law label cannot replace the topology-native active root ledger object. The photon route diagnostic fails closed until every constituent absolute speed above $c_f$ has a self-hit, partner-hit, caustic, or inactive-root route on the same retained source record; the middle-hinge diagnostic fails closed until every `1` or `C` word sample has a same-record self-hit/inactive-root or caustic/finite-$\eta$ route without literal-communication semantics. Both route diagnostics now emit `route_evidence_summary` so missing, synthetic, toy, and accepted-for-branch-retention route evidence stay distinct. The compositor now fails first on $\partial\mathcal{R}^{\mathrm{act}}$ route population in the default fixture; `--route-replay-fixtures` advances that row to action-boundary blockers only at priority-only fixture level and reports `accepted_route_evidence_status: not_accepted_for_branch_retention`; wake-history, action, and Noether medium-response rows now expose `accepted_evidence_summary` and remain `not_accepted_for_wake_history_closure`, `not_accepted_for_action_closure`, and `not_accepted_for_medium_response_closure` until their rows carry same-record accepted evidence ids and derivation proof objects; the compositor now reports `cross_sector_acceptance_status` and `branch_retention_status` so priority-only row logic cannot be mistaken for branch retention, and sector validators reject accepted-summary drift before compositor consumption; see [topological-causal-root-ledger-proof-target](topological-causal-root-ledger-proof-target.md). Depends on: none for the topology-native ledger layer; downstream branch promotion still depends on an accepted branch consumer such as `certified_eigen_braid`.

10. `dressed_electron_global_drain_scope_decision` — Decide whether the next native retained-object program should test the 12-architrino dressed electron before extending bare-neutral-scaffold flutter and global angular-momentum-drain conclusions to charged matter. The discussion must fix the minimum dressed inventory, which bare-scaffold results survive, and the retained-record outputs required before implementation or corpus promotion. Status: `discussion-scoped`. Depends on: none for the decision; implementation depends on an authorized dressed-object packet and the retained-history runner.

## Scope

Keep dynamics, geometry, and mapping centered on [master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md). This workstream now also carries the Lorentz / metric / clock / ruler bridge to GR and the deep closure burden for quantum and core dynamics.

This file remains the control surface for the workstream. No sibling detailed priority file is needed yet; if the program grows, the natural split is one action-kernel / Noether-boundary packet, one circular/spiral closure packet, and one Lorentz/GR bridge packet.

## Closure Reprioritization 2026-06-22

The workstream root is the first certified eigen-braid. The causal-action theorem spine, signed delay-map theorem pack, circular obstruction, and forward-root-starvation propositions give the architecture a closed grammar, but they do not yet exhibit a stable assembly. Every downstream coefficient program inherits that absence: mass, Lorentz/GR coefficients, quantum Born weights, spin-statistics, and cosmology can develop forms and residual routing, but they cannot promote coefficient-level derivations until at least one retained eigen-braid exists.

The immediate target is not a source-normal circular or spiral no-go. Circular
and spiral rows that do not carry receiver-normal branch strength are topology
or transversality diagnostics only. The preferred constructive search is still a
collinear breather or a non-circular signed-sheet branch with $s\ge\pi/2$, where
the negative self-sheet can supply an internal tangential cancellation channel.
The branch-level cohomology target is
$$
[\omega_T]
+
[\omega_{\mathrm{recoil}}]
+
[\omega_{\partial W}]
+
[\omega_{\mathrm{multi}}]
=
0,
$$
on the same retained row set. A candidate that cancels only a pointwise tangential residual without closing this cohomology balance remains a search hit, not a certified eigen-braid.

The current priority order is:

| Milestone | Priority | Closure object | Why it moves first |
| :--- | :---: | :--- | :--- |
| M0 | P0 | Certified eigen-braid packet | Root blocker for all coefficient programs; no stable assembly is currently certified. |
| M3 | P0 red-team | Spin-statistics $\mathbb{Z}_2$ holonomy wall | Highest-risk falsification node for fermionic antisymmetry; a negative result reshapes the matter sector. |
| M2 | P1 analytic | Curvature-bounded no-proliferation lemma | Needed so finite branch certificates cannot hide uncontrolled self-root accumulation. |
| M1 | P1 consolidation | Branch-symplectic-promotion certificate | One certificate should serve binary closure, doubling-frequency return, effective Hamiltonian promotion, and eigen-braid testing. |
| M5 | P2 geometry | $|D_{\mathrm{plane}}|\to1\Rightarrow\|Q_{\mathcal A}\|\to0$ | Converts Lorentz, equivalence-principle, and anisotropy rows into one framing-isotropy theorem after a branch exists. |
| M4 | P2 derived coefficients | Mass map and $\mathcal R_\alpha(A,A')$ across two species | Requires at least two certified eigen-braids, so it is decisive but downstream of M0. |

Form-level mappings may be claimed now only with their inherited blockers. The GR bridge owns the effective metric and weak clock form; the quantum bridge owns the Madelung/Hamilton-Jacobi and Bohr-Sommerfeld forms; the cosmology bridge owns transport-redshift constraints and tired-light exclusion. None of those rows derives its coefficients until the eigen-braid, Noether sea response, and mass-map dependencies close.

## Foundation/Dynamics Impact 2026-06-21

The updated [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) promotes the causal-root complex, singular-stratum routing, local-to-global branch-chart gluing target, finite-continuation cardinality, starvation scale for forward partner rows, and finite-window wake-escapement boundary identity into the core closure grammar. A local residual or pointwise branch trace is not enough unless the retained chart also reports signed root-complex data, fold versus higher-stratum routing, finite memory, overlap/gluing consistency where a global claim is made, and boundary wake-history charges on the same retained row set.

Practical condition: active proof and simulation packets should treat retained
root topology as conditional geometry only. Force, action, power, wake-history,
and pass/fail rows restart under the receiver-normal Master EOM and need
same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ evidence.

## Foundation/Dynamics Impact 2026-06-22

The [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) refinement sharpens the same closure burden. A promoted branch certificate should report the branch-chart local inverse data behind $\mathfrak B(\Gamma,\mathcal S;h,\eta,\epsilon_c)$, the $H^0$ global-section count for finite continuation, any $\check H^1$ gluing obstruction, separate $\eta$ versus $\epsilon_c$ regulator status, finite-window degree changes caused by memory-boundary starvation, and any $\ell=2$ quadrupole leakage $Q_A$ when a moving-loop Lorentz checkpoint is used.

Practical condition: use `force_action_restart_required` wherever a row
uses branch strength. Existing circular, spiral, A1, transport, finite-collar,
and action-kernel rows may survive only as topology or analytic setup when they
do not supply a force/action conclusion. The promotion threshold is higher: no
branch chart is theorem-level until local reconstruction conditioning, gluing,
regulator separation, memory-boundary degree bookkeeping, no-proliferation
scope, and receiver-normal branch strength are reported on the same retained row
set.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `certified_eigen_braid` | This file, [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md), [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md), [binary-dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), and the active proof-program packets | [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md), [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md), [energy](../../../content/markdown/aaa/dynamics/energy.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md) | One replayable retained branch packet reports the same causal-root ledger, signed-degree refinement, Noether wake-history charges, finite-memory window, group-velocity/response-center row, assembly topological charge, and positive non-symmetry stability margin under refinement. |
| `receiver_normal_branch_strength_certificate` | [receiver-normal-branch-strength-certificate](receiver-normal-branch-strength-certificate.md), [receiver-normal-master-equation-restart-ledger](receiver-normal-master-equation-restart-ledger.md), [receiver-normal-wake-action-factor](receiver-normal-wake-action-factor.md), and [branch-provider-evidence-report](../app-solver/branch-provider-evidence-report.md) | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) and the active proof-program packet that emits the first domain branch-family row | The accepted analytic row-shape certificate, the linear moving-receiver branch-family fixture, and the priority-only first-derivative artifact target are populated. Promotion for A1, VP-1, breather, circular, eigen-braid, H39/theta3minus, or assembly closure still requires that packet's retained branch family to report same-record $D_s$, $D_T$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_T$, reconstructed $D_vW^{\mathrm{rec}}$, projection, aggregation, scalar statistic, artifact hash, regulator state, and fail-closed negative controls. H39 provider-object rows must first satisfy `h39-receiver-normal-retained-record-preimage-row/v0`. |
| `circular_asymptotics` | This file | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) | Higher-winding circular rows restart from same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ intervals before any self-force or tangential no-go is promoted. |
| `spiral_branch_chart_test` | [receiver-normal-branch-strength-certificate](receiver-normal-branch-strength-certificate.md), [spiral-vp1-drive-verdict-proof](spiral-vp1-drive-verdict-proof.md), [spiral-vp1-tangential-interval-proof](spiral-vp1-tangential-interval-proof.md), [spiral-vp1-radial-branch-interval-proof](spiral-vp1-radial-branch-interval-proof.md), [spiral-a1-drive-interval-target](spiral-a1-drive-interval-target.md), [spiral-a1-gamma-force-ratio-decision](spiral-a1-gamma-force-ratio-decision.md), [spiral-a1-kinematic-gamma-closure](spiral-a1-kinematic-gamma-closure.md), and [spiral-a1-tangential-compatibility-no-go](spiral-a1-tangential-compatibility-no-go.md) | [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) and [doubling-frequency-lock](../braid-doubling-frequency-lock/priorities.md) | One admissible variable-pitch candidate must report retained root topology plus same-record $D_s$, $D_T$, $W^{\mathrm{rec}}$, radial, tangential, aggregation, and negative-control rows before any drive verdict is promoted. |
| `lorentz_gr_bridge` | [lorentz-gr-bridge-handoff](lorentz-gr-bridge-handoff.md) | [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Moving Noether braid contraction and clock retuning are extracted first; only after that independent moving-assembly packet closes may coarse-grained medium response be used for weak-field GR and PPN targets. |
| `lorentz_test_residual_handoff` | [lorentz-test-residual-handoff](lorentz-test-residual-handoff.md) | [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [lorentz-invariance-test-suite](../cross-theory-mapping/lorentz-invariance-test-suite.md) | RMS, PPN, and SME-style residual rows are exported only after the Lorentz/GR bridge supplies one shared branch, clock, ruler, signal, and medium-response artifact. |

## Completed Kernel Handoff

`characteristic_tail_noether_closure` is closed at the local action-kernel level. [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md) now fixes the endpoint-clear normalized delayed-interior characteristic-tail kernel, proves the receiver-gradient identity
$$
D_{ij}K_{\mathrm{eff}}^{(\eta)}
=
-
\frac{\delta_\eta(g)}{r^2},
$$
and defines the corresponding energy, momentum, and angular-momentum wake-history increments across a time cut. [effective-lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md) and [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics) now consume that kernel as the available action-level repair rather than as a missing Noether-boundary placeholder.

This completion does not certify a branch or terminal label. Downstream consumers must still pull the increments back to their retained branch charts and prove closure of $K_{\mu}+E_{\mathrm{wake,eff}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake,eff}}^{(\eta)}$, and $\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake,eff}}^{(\eta)}$ with the same root-ledger, memory-depth, and Jacobian-floor conditions used by the Master EOM. The corpus now states this as a concrete branch-chart conservation test rather than as an open handoff phrase: the required output is the retained-chart pullback of the three Noether totals, with exact wake-history charges separated from work-integral and torque-projection diagnostics.

`spiral_turning_conditions` remains active only as retained-root topology and turn-center context. The A1 and VP-1 drive rows are receiver-normal restart targets: active-root counts, inactive gaps, finite-memory bounds, source-normal floors, and root-transport rows may still constrain the branch chart, but radial, tangential, and action pass/fail rows require same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ intervals before they can count as Master EOM evidence. The active priority is to rebuild the retained spiral branch table with receiver-normal branch-strength rows, then decide whether finite-collar radial closure or tangential transport is admissible in the canonical receiver-normal row.

The A1 finite-collar continuation restarts. The next usable artifact is not a
finite-difference repair search or sampled remainder ladder; it is a
receiver-normal branch table that binds the retained roots to $D_s$, $D_T$, and
$W^{\mathrm{rec}}$ on the same boxes. Only after that table exists should A1
outward constants, radial closure, or tangential transport be redriven.

## Live Targets

- First branch-family receiver-normal branch-strength certificate for a
  retained branch candidate, using the accepted analytic row-shape certificate
  as the minimum row contract.
- First certified eigen-braid packet for a six-body Noether braid branch, preferably a collinear breather or non-circular signed-sheet branch rather than the bare circular MCB.
- Numerical branch-chart evaluation of the normalized delayed-interior characteristic-tail kernel and its Noether wake-history boundary terms under the stated pullback contract.
- Bare-void branch response tensor for isolated assemblies, computed from branch-chart momentum susceptibility before Noether sea dressing.
- Full 3D translating three-binary NFDE / DDE control for emergent $\gamma$-scaling.
- Transfer-operator and invariant-measure control for Born-rule emergence.
- Exact 6-body core stability and shielding extraction for the first-principles mass program.
- Binary perturbation-response classification: on a retained binary chart, decide whether a finite perturbation is absorbed as same-branch phase response, same-regime radius/cadence retuning, or a branch transition.
- Emission-flux/Jacobian conservation: show that constant source-provenanced causal-wake emission over a wake surface supplies the source-normal denominator on simple-root charts while preserving emitted polarity weight; the receiver-normal Master EOM branch row then uses $W^{\mathrm{rec}}/r^2$.

## Emission-Flux / Jacobian Conservation Target

Source-mining intake 2026-06-26. Legacy "potential sphere" language is not current terminology, but it preserves one useful proof pressure: constant source emission per unit absolute time must become the branch density actually used by the Master EOM after the receiver samples an expanding causal wake surface. The 2019 legacy post [The Point Potential Model](https://architrino.wordpress.com/2019/06/24/idealized-neoclassical-model/) is the source provenance for this target: its constant-rate emitter and receiver-intersection picture translates to a source-provenanced causal-wake measure, not to an autonomous field inventory.

Let source $j$ emit a polarity-weighted causal-wake measure over absolute emission time $s$ with source weight $q_j\,ds$. On a receiver event $(i,t)$, use the same causal constraint
$$
g_{ij}(t,s)
=
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|
-c_f(t-s)
$$
and a dual-mollified wake-surface measure
$$
d\mu_{ij}^{(\eta,\epsilon_c)}
=
q_j\,
\frac{\delta_\eta(g_{ij}(t,s))}
{r_{ij}^2(t,s)+\epsilon_c^2}
\,ds.
$$
The local event-force proof target is to show that, on a simple-root chart with
$$
\left|\partial_s g_{ij}(t,s_\ell)\right|\ge c_f\nu_J>0,
$$
the limit $\eta\to0$, $\epsilon_c\to0$ gives the retained branch density
$$
\sum_{s_\ell\in\mathcal C_{ij}(t)}
q_j\,
\frac{1}
{r_{ij}^2(t,s_\ell)\left|\partial_s g_{ij}(t,s_\ell)\right|}
$$
up to the same normalization convention that absorbs the factor of $c_f$ into $\kappa$. This is the source-normal conservation meaning of the branch law: constant emission cadence is not a separate force assumption, while source motion changes the received density through the causal-root Jacobian.

Receiver-normal action audit. The branch density above is not by itself the
receiver-worldline action rate. On a retained smooth branch $s=s_\ell(t)$,
$$
\frac{ds_\ell}{dt}
=
\frac{c_f-\hat{\mathbf r}_{ij}(t,s_\ell)\cdot\mathbf v_i(t)}
{c_f-\hat{\mathbf r}_{ij}(t,s_\ell)\cdot\mathbf v_j(s_\ell)}
$$
so a source-emission cadence mapped to a moving receiver path carries a
receiver-normal numerator. Rows that consume action, power, wake-history
charge, or finite-window conservation must include this factor on the same
retained branch chart.

Promotion conditions:

- Use only `causal wake`, `source history`, `simple-root chart`, and `Jacobian` terminology.
- Keep wake substance-level status fixed: the wake is source-provenanced causal structure, not an autonomous field inventory.
- Report the emitted-weight preservation statement before any branch acceleration row consumes the density.
- Route fold or caustic cases to the existing finite-crossing and dual-mollified chart machinery rather than applying the simple-root collapse at $J=0$.
- Do not promote this target into reader-facing prose until the proof has a declared regulator limit, active-root floor, and finite-memory window.

## Binary Perturbation Response Target

Source-mining intake 2026-06-26. Legacy binary-adaptation language is useful only as a theorem and simulation target: a binary should not merely be described as adapting when energy is added or removed. The retained chart must say which response class actually occurred.

Let $\Gamma_{\mathrm{bin}}$ be an accepted two-architrino binary history on returned section $\mathcal S$ with active root set $\mathcal A_{\mathrm{bin}}$, positive Jacobian floor $\nu_J$, inactive-root gaps, finite memory depth, radius/cadence rows $(R,\omega)$, and returned-section residual $\mathcal R_{\mathrm{ret}}$. For an admissible finite perturbation $p$ with declared amplitude, injection phase, injection time, and support width, define the perturbed returned-section residual by
$$
\mathcal R_{\mathrm{bin}}(p)
=
P_{\mathcal S}(\Gamma_{\mathrm{bin}}^p)-\Gamma_{\mathrm{bin}}.
$$
The perturbation should also be split by projection on the retained chart:

$$
v_r(p)=\mathbf v(p)\cdot\hat{\mathbf r},
\qquad
\mathbf v_\perp(p)
=
\mathbf v(p)-v_r(p)\hat{\mathbf r},
$$

with response rows

$$
\Delta R(p),\quad
\Delta\omega(p),\quad
\Delta\phi(p),\quad
\Delta\mathcal A_{\mathrm{bin}}(p).
$$

The radial row tests radius change, over-compression, and branch-transition pressure. The tangential row tests phase response, cadence retuning, emission timing, and source-history bookkeeping. A scalar force or energy response is not enough unless these projection rows state which branch variable absorbed the perturbation.

The response classification target is:

| Response class | Required condition |
| --- | --- |
| Same-branch phase response | $\mathcal A_{\mathrm{bin}}$, $\nu_J$, inactive gaps, finite memory depth, and $(R,\omega)$ remain inside the declared chart tolerance, while $\mathcal R_{\mathrm{bin}}(p)$ is absorbed by a phase offset $\Delta\phi$ on the same branch. |
| Same-regime radius/cadence retuning | The root ledger and speed-regime identity remain unchanged, but closure requires new rows $(R',\omega')$ with a declared work/action increment and no loss of the Jacobian or inactive-gap floors. |
| Branch transition | The perturbation changes the active root ledger, self-hit/partner-hit split, speed-regime identity, finite-memory window, returned-section stability, or inactive-gap/Jacobian-floor status beyond tolerance. |

This same classifier can serve as a measurement bridge. Legacy eigenstate-transition language should translate to a concrete retained-chart outcome: phase response on the same branch, radius/cadence retuning inside the same speed regime, or an actual branch transition with a changed active-root ledger and event record. A measurement claim is not promoted merely because a state label changes; it needs the event ledger, projection rows, and post-event branch record.

The local-potential summary remains secondary to the causal-root stream. A useful diagnostic is

$$
\mathcal R_{\mathrm{stream}\to\Phi}
=
\left\|
\mathbf F_{\mathrm{root}}
-\mathbf F_{\nabla\Phi_\eta}
\right\|_W,
$$

where $\mathbf F_{\mathrm{root}}$ is computed from the retained causal roots, Jacobian rows, and source-history weights, while $\mathbf F_{\nabla\Phi_\eta}$ is any smoothed potential-gradient summary over the same window $W$. A local potential surface may be used only when this residual is small under the declared regulator and branch chart; it is not a substitute for the root stream.

The first simulation packet should scan perturbation amplitude, injection phase, injection time, and support width on one retained binary chart, then report which of the three response classes survives refinement. This is not a new gate; it is a concrete way to turn finite-energy binary response into branch-chart mathematics before any life, agency, or assembly-evolution analogy is promoted.

## Current Receiver-Normal Footholds

- New circular self-hit branches are born at $\tan\xi=\xi$.
- Each such branch is born on a Jacobian-null surface.
- Circular self-branch count grows only linearly.
- The circular and spiral source-normal branch tables survive only as topology, root-count, inactive-gap, finite-memory, and transversality diagnostics.
- No circular, VP-1, or A1 tangential/radial no-go is active as Master EOM evidence until its branch rows are redriven with same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}=\lvert D_T/D_s\rvert$ intervals.
- Circular and spiral generated certificate artifacts are purged from the
  active workstream. Any replacement runner must emit same-record $D_s$, $D_T$,
  $W^{\mathrm{rec}}$, aggregation, and negative-control rows.

## Breather Certificate Routing Gate

Use the collinear-breather certificate as the smallest finite-root-ledger test for the master-equation stack. A full pass validates the certificate pattern, not particle stability. A seed/pre-ledger failure rejects only the chosen candidate or itinerary. A branch-chart failure is a stronger obstruction: higher-dimensional closure claims must then add no-proliferation, Jacobian-floor, inactive-gap, and memory-depth controls before leaning on finite root ledgers. A monodromy failure means the branch may close as an integer ledger but cannot be used as an attractor. A topology failure blocks global branch-sum reasoning across folds until the dual-mollified $\eta>0$ well-posedness and continuity package is tightened.

## Chapter State To Preserve

- The null separatrix and Jacobian-null surface now function as an amplitude wall for the self branch, not by themselves as a proof of circular closure.
- The exact partner-only circular formulas may be used as geometry identities,
  but circular tangential-positivity or no-go statements require
  receiver-normal branch-strength rows before they count as Master EOM evidence.
- The non-circular spiral benchmark now retains the variable-pitch extension, corrected partner Jacobian, and self-branch Frenet analogue as root-geometry diagnostics. Radial-turn and weighted tangential-drive tests restart from receiver-normal branch strength.

## Parallel Tracks

- Circular closure: rebuild higher-winding circular rows with same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$, then decide whether any no-go or existence claim survives.
- Spiral closure: rebuild variable-pitch radial and tangential rows with same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$, then compare candidates without importing source-normal verdicts.

## Circular Work Order

Status update. The circular branch-history packet is topology-only. Its root
brackets, inactive gaps, finite-memory rows, and Jacobian-null finite-crossing
criteria remain diagnostic. The circular task is to redrive the same retained
branches with receiver-normal branch strength before asserting any circular
no-go, existence result, or non-circular baseline obstruction.

1. Preserve the checked root-bracket inclusion rows and inactive-gap ledger as topology diagnostics.
2. Recompute every partner and self branch with same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$.
3. Rebuild circular radial and tangential residuals from receiver-normal rows only.
4. Do not import circular finite-band passes or tail constants into the
   receiver-normal Master EOM.
5. Use the rebuilt circular result as a baseline only after the receiver-normal row passes negative controls.

## Circular Derivative-Sensitive Branch-History Packet

Purpose. This packet converts `circular_asymptotics` from a pointwise circular root count into a retained-history branch chart. It consumes the delayed-functional mining synthesis by requiring every circular partner and self contribution to be classified as delayed-state, derivative-sensitive, or blocked by a Jacobian-null window before its force-balance residue is used.

History tube. Fix a symmetric circular two-body history $\Gamma_{\mathrm{circ}}(\beta)$ on a speed band $\mathcal{B}_{\beta}=[\beta_-,\beta_+]$ and memory horizon $h$. The retained circular chart is
$$
\mathcal{U}_{\mathrm{circ}}
\subset
C^1([-h,0],(\mathbb{R}^3)^2)
$$
around the translated history segment. Active branches are split as
$$
\mathcal{A}_{\mathrm{circ}}
=
\mathcal{A}_{p}\sqcup\mathcal{A}_{s},
$$
where $\mathcal{A}_{p}$ contains partner causal-delay roots and $\mathcal{A}_{s}$ contains self-hit roots. Each row $\alpha\in\mathcal{A}_{\mathrm{circ}}$ carries a phase offset $\xi_\alpha(\beta,\phi)$ satisfying
$$
F_\alpha(\beta,\xi_\alpha(\beta,\phi);\phi)=0.
$$
The chart is admissible on an interval $I\subset\mathcal{B}_{\beta}$ only if
$$
|\partial_\xi F_\alpha(\beta,\xi_\alpha;\phi)|
\ge
\nu_{\xi}>0
\quad
\text{for every active row,}
$$
and every inactive complement has a declared gap
$$
\inf_{\mathcal{G}^{\mathrm{inact}}_{\mathrm{circ}}}|F_\alpha|
\ge
g_{\mathrm{circ}}>0.
$$
The Jacobian-null windows are
$$
\mathcal{N}_{J,\varepsilon}
=
\{(\beta,\alpha): |J_\alpha(\beta)|\le\varepsilon_J\}.
$$
Rows inside $\mathcal{N}_{J,\varepsilon}$ are not theorem-grade branch-sum rows unless a dual-mollified finite-crossing packet supplies a bounded replacement for the singular $J_\alpha^{-1}$ weight.

Root transport. Each active circular row must report the phase-transport residual
$$
\mathcal{R}^{\mathrm{circ}}_{\mathrm{tr},\alpha}(\theta)
=
\left|
1-\frac{d\xi_\alpha}{d\theta}
-
\frac{1-\hat{\mathbf r}_\alpha\cdot \mathbf{v}_{i,\alpha}/c_f}{J_\alpha}
\right|.
$$
For the exactly symmetric circular ansatz, $\xi_\alpha$ is constant in the co-rotating coordinate, so this residual reduces to the analytic branchwise identity obtained by evaluating the displayed formula with $d\xi_\alpha/d\theta=0$. A circular row is usable only when $\sup_\theta\mathcal{R}^{\mathrm{circ}}_{\mathrm{tr},\alpha}(\theta)\le\varepsilon_{\mathrm{tr}}$ on the chart interval.

Branchwise classification.

| Circular object | Classification | Required report |
| --- | --- | --- |
| Partner root equation | Delayed-state on a fixed $C^1$ chart while $|J_p|\ge\nu_J$ and inactive gaps stay positive. | Root phase, branch label, memory depth, inactive gaps, and partner-side tangential sign. |
| Partner receiver-normal branch strength and transported force term | Derivative-sensitive because $D_{s,p}^{-1}$, $D_{T,p}$, and the transported source state depend on delayed velocity through the branch map. | $D_{s,p}$ floor, $D_{T,p}$ bound, $W_p^{\mathrm{rec}}$, $\mathcal{R}^{\mathrm{circ}}_{\mathrm{tr},p}$, radial projection, tangential projection, and contribution to the signed residuals. |
| Self-hit root equation | Delayed-state away from branch births; blocked at $\tan\xi=\xi$ birth windows until finite-crossing control is supplied. | Root phase, birth interval status, memory depth, inactive gaps, and whether the row is outside $\mathcal{N}_{J,\varepsilon}$. |
| Self-hit receiver-normal branch strength and higher-winding contribution | Derivative-sensitive away from $D_{s,s}=0$ because $D_{s,s}^{-1}$ and $D_{T,s}$ change the retained force budget and the large-$\beta$ asymptotics. | Signed radial term, signed tangential term, $D_{s,s}$ floor, $D_{T,s}$ bound, $W_s^{\mathrm{rec}}$, absolute tangential activity, positive-sine subchart residue, and full signed $|\sin\xi|$ chart residue. |
| Noether wake-history pullback | Derivative-sensitive theorem target; not neutral-type unless delayed acceleration or boundary-derivative dependence is introduced and a continuity estimate is proved. | Declare the functional norm, the delayed-velocity dependence, and whether any boundary term upgrades the packet to neutral-type. |

Circular residuals. Outside $\mathcal{N}_{J,\varepsilon}$, the packet must report the signed partner/self force-balance residuals
$$
\mathcal{R}^{\mathrm{circ}}_{T}
=
\sum_{\alpha\in\mathcal{A}_{p}}T_{p,\alpha}
+
\sum_{\alpha\in\mathcal{A}_{s}}T_{s,\alpha},
\qquad
\mathcal{R}^{\mathrm{circ}}_{R}
=
\sum_{\alpha\in\mathcal{A}_{p}}R_{p,\alpha}
+
\sum_{\alpha\in\mathcal{A}_{s}}R_{s,\alpha}
-R_{\mathrm{cent}},
$$
with declared tolerances
$$
|\mathcal{R}^{\mathrm{circ}}_{T}|\le\varepsilon_T,
\qquad
|\mathcal{R}^{\mathrm{circ}}_{R}|\le\varepsilon_R.
$$
Here $T_{\bullet,\alpha}$ and $R_{\bullet,\alpha}$ are the circular tangential and radial projections evaluated with the same receiver-normal branch strength, regulator, and history chart. A no-go verdict requires a sign-definite residual obstruction on every admissible chart interval. An existence verdict requires both residuals to close with positive source-normal denominator floor, positive inactive gaps, finite memory depth, bounded receiver-normal numerator, and no undeclared branch transition.

## Circular Receiver-Normal Rebuild Target

The large-$\beta$ residual computation, sampled finite-band table,
generated interval pass matrix, and tail constant packets are purged from the
active workstream. Circular closure now restarts from the analytic root
equations plus a new receiver-normal certificate that emits same-record $D_s$,
$D_T$, $W^{\mathrm{rec}}$, radial, tangential, aggregation, and
negative-control rows. Until that replacement exists, circular finite-band and
large-$\beta$ rows are not Master EOM evidence.

## Circular Jacobian-Null Finite-Crossing Packet

Scope. This packet controls the branch births at
$$
\tan\xi_n^\star=\xi_n^\star,
\qquad
\beta_n^\star=\sqrt{1+(\xi_n^\star)^2},
$$
without promoting the singular point itself as a circular closure. It applies to continuation or simulation passages through a birth window; an exact constant circular theorem at $\beta=\beta_n^\star$ remains blocked because the source-normal denominator vanishes and the receiver-normal branch strength is singular unless the same branch supplies a compensating $D_T$ zero.

Fold normal form. For
$$
\mu=\beta-\beta_n^\star>0,
$$
the two newborn self roots satisfy
$$
\xi_{n,\pm}(\beta)
=
\xi_n^\star
\pm
\sqrt{\frac{2\mu}{\beta_n^\star}}
+O(\mu),
$$
and
$$
J_{n,\pm}
=
\pm\,\xi_n^\star
\sqrt{\frac{2\mu}{\beta_n^\star}}
+O(\mu).
$$
Therefore there are constants $0<c_n<C_n<\infty$ and $\mu_n>0$ such that, on $0<\mu<\mu_n$,
$$
c_n\sqrt{\mu}
\le
|J_{n,\pm}|
\le
C_n\sqrt{\mu}.
$$
The source-normal denominator contributes an $O(\mu^{-1/2})$ factor to $W^{\mathrm{rec}}$ at fixed nonzero $r_n^\star$ when the receiver-normal numerator stays bounded away from zero. The action coarea density carries one additional source-normal factor and is not interchangeable with the receiver-normal force-law strength.

Finite-crossing condition. A dynamic passage through the fold is admissible only if the speed history crosses with a nonzero transverse rate
$$
\beta(t)=\beta_n^\star+\dot{\beta}_n(t_n)(t-t_n)+O((t-t_n)^2),
\qquad
|\dot{\beta}_n(t_n)|\ge b_n>0.
$$
For an excluded speed window $0<\mu\le\varepsilon_\beta$, the absolute branch impulse must be reported with a regulator-uniform bound
$$
\sup_{0<\eta\le\eta_0}
\int_{\{0<\beta(t)-\beta_n^\star\le\varepsilon_\beta\}}
\sum_{\pm}\|\mathbf{a}_{n,\pm}^{(\eta)}(t)\|\,dt
\le
B_{J,n}(\varepsilon_\beta),
$$
where the fold estimate gives the target scaling
$$
B_{J,n}(\varepsilon_\beta)
\le
\frac{2K_n}{b_n}\sqrt{\varepsilon_\beta}
+O(\varepsilon_\beta),
$$
for a declared local force constant $K_n$ depending on $R$, $q$, $\kappa$, and $\xi_n^\star$, but not on $\eta$. The same absolute budget must dominate the radial and tangential projections separately; signed cancellation may be used only after the absolute bound and branch labels have been certified.

Acceptance. A Jacobian-null window is usable in a theorem only in one of two ways:

1. Exclusion route: remove $\mathcal{N}_{J,\varepsilon}$ from the circular interval, prove the residual verdict on each remaining component, and carry the excluded-window statement explicitly in the theorem.
2. Finite-crossing route: supply the fold normal form, transverse crossing rate, regulator-uniform impulse bound, and post-crossing inactive-gap restoration. Then the passage may be used for continuation or simulation, but not as an exact constant-speed circular closure at $J=0$.

Failure modes. The packet fails if $\dot{\beta}_n=0$ at the fold, if the regulator-uniform impulse bound depends on the unresolved $\eta\to0$ schedule, if branch labels swap without a certified continuation map, if the self pair is counted without restoring inactive gaps after the window, or if a signed radial/tangential cancellation is asserted before the absolute finite-crossing budget is proved.

## Spiral Intuition To Preserve

- The circular ansatz hard-codes constant radius, constant speed, constant curvature, rigid branch geometry, and sign-definite tangential contributions.
- A true spiral introduces radial velocity, varying curvature, intersections between later tighter turns and earlier wider-turn wakes, changing Jacobian amplification, and the possibility of a turning point before singular continuation.
- The live question remains: does the symmetric delayed spiral admit a self-consistent limit cycle or radial turning point that the circular ansatz misses?
- The next concrete spiral target is the branch-chart certification test: enumerate admissible partner and self roots for one variable-pitch candidate, certify positive Jacobian floors and finite memory depth, test the radial turn inequality, and decide whether the weighted tangential sum can become negative without extra medium, three-binary, or multi-body structure.

## Branch-Chart Closure Object

Definition. For a candidate history $\Gamma=\{\mathbf{x}_i(t)\}_{i=1}^N$ on a returned section $\mathcal{S}$ with memory horizon $h$, shell width $\eta$, and core scale $\epsilon_c$, the master-equation branch-chart closure object is
$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{ret}},
\lambda_{\mathrm{sec}}
\right).
$$
Here $\mathcal{R}^{\mathrm{act}}$ is the finite list of active causal-root tuples $(i,j,\ell,t,t_{0,\ell})$ satisfying $F_t^{(ij)}(t_{0,\ell})=0$ and $0<t-t_{0,\ell}\le h$; $\mathcal{G}^{\mathrm{inact}}$ is the list of inactive complement intervals with certified gaps $g_a^{(ij)}=\inf_{I_a}|F_t^{(ij)}|$; $\nu_J=\inf_{\mathcal{R}^{\mathrm{act}}}|J_{ij}(t;t_{0,\ell})|$ is the active Jacobian floor; $h_{\mathrm{mem}}=\sup_{\mathcal{R}^{\mathrm{act}}}(t-t_{0,\ell})$ is the certified memory depth; $\mathcal{R}_{\mathrm{ret}}=P_{\mathcal{S}}(\Gamma)-\Gamma$ is the returned-section residual; and $\lambda_{\mathrm{sec}}$ is the non-symmetry stability margin of the returned section.

Condition. A branch chart is admissible for a local master-equation claim only when
$$
\nu_J>0,\qquad
\inf_{\mathcal{G}^{\mathrm{inact}}}g_a^{(ij)}>0,\qquad
h_{\mathrm{mem}}<h<\infty,\qquad
\|\mathcal{R}_{\mathrm{ret}}\|\le \varepsilon_{\mathrm{ret}},
$$
and either the section-anchored monodromy satisfies
$$
\rho(M_{\mathcal{S}}|_{E_\perp})\le 1-\lambda_{\mathrm{sec}}
\quad\text{with}\quad
\lambda_{\mathrm{sec}}>0,
$$
or a certified boundary-trapping budget replaces the spectral margin.

Proof route. The positive Jacobian floor gives simple-root persistence by the implicit-function theorem; the positive inactive gaps exclude unlisted causal roots on the chosen complements; the finite memory depth keeps the dual-mollified absolute-time law on a compact history window; and the returned-section residual plus section stability converts a root ledger into a controlled candidate cycle rather than only an integer branch count.

Projection handoff. Proof-program and simulation artifacts populate $\mathfrak{B}$ by projection; they do not redefine their native packet schemas. The handoff contract is:

| $\mathfrak{B}$ field | Upstream projection |
| --- | --- |
| $\mathcal{R}^{\mathrm{act}}$ | Copy the externally owned active root rows into the tuple list $(i,j,\ell,t,t_{0,\ell})$, preserving receiver, source, branch label, evaluation time, emission time, source class, and simple/fold status when present. |
| $\mathcal{G}^{\mathrm{inact}}$ | Emit the inactive complement intervals $I_a$ and the certified gaps $g_a^{(ij)}=\inf_{I_a}|F_t^{(ij)}|$ that exclude unlisted causal roots on the same memory window. |
| $\nu_J$ | Take the infimum of $|J_{ij}(t;t_{0,\ell})|$ over every active branch actually used in the branch-sum, including deep-past or ancestry branches when they contribute to the certified active ledger. |
| $h_{\mathrm{mem}}$ | Take the supremum of all retained active delays $t-t_{0,\ell}$ and compare it with the declared horizon $h$. |
| $\mathcal{R}_{\mathrm{ret}}$ | Project the proof-program return map, returned sample residuals, or simulation continuation residuals to one section residual $P_{\mathcal{S}}(\Gamma)-\Gamma$ with a declared norm and tolerance. |
| $\lambda_{\mathrm{sec}}$ | Use the symmetry-quotiented monodromy margin when available; if the proof-program certificate uses boundary trapping instead of spectral contraction, record the positive trapping budget as the replacement for the spectral margin. |

If one projection is unavailable, the corresponding field remains an explicit missing proof artifact for that candidate. This blocks local promotion through $\mathfrak{B}$, but it is not a new validation gate and does not authorize this workstream to edit or reinterpret the upstream proof-program or simulation artifacts.

## Bare-Void Response Tensor Target

Claim level. The bare-void response tensor is a priority theorem target for an accepted assembly branch chart. It is not primitive ontology, not a particle-specific mass parameter, not the polarity bookkeeping unit $q$, not the universal kinetic-proxy coefficient $\mu_{\text{arch}}$, not the shielding factor $\zeta(A)$, and not the Noether sea dressed mass-response tensor $\mathcal{M}_{\text{sea}}^{ab}$.

Definition target. Let $A$ be a finite assembly in Euclidean void with no surrounding Noether sea, and let $\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})$ be a $C^1$ family of returned branch charts generated by a small center-of-mass drift from a rest chart $\mathfrak{B}(\mathbf{0})$. The active root ledger, inactive complements, regulator $\eta$, memory horizon, and returned section must remain under the branch-chart projection contract on a drift ball $B_\delta(0)$, with positive Jacobian floor and positive inactive-root gaps throughout that ball. Pull back the branch-chart Noether momentum total
$$
P_{A,\mathrm{tot}}^a(\mathbf{V}_{\mathrm{cm}})
=
P_{\mathrm{mech},\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})}^a
+
P_{\mathrm{wake,eff},\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})}^{(\eta),a}.
$$
The theorem-target tensor is the drift susceptibility
$$
\mathcal{I}_{A,\mathrm{void}}^{ab}
\equiv
\left.
\frac{\partial P_{A,\mathrm{tot}}^a}
{\partial V_{\mathrm{cm},b}}
\right|_{\mathbf{V}_{\mathrm{cm}}=\mathbf{0}}.
$$

Interpretation. $\mathcal{I}_{A,\mathrm{void}}^{ab}$ measures how an accepted assembly's mechanical plus wake-history momentum changes under an infinitesimal center-of-mass drift in bare Euclidean void. It is an assembly-level branch response, not a fundamental architrino property. In a scalar isotropic subcase, the comparison target is
$$
\frac{1}{E_{\mathrm{internal}}(A)}
\mathcal{I}_{A,\mathrm{void}}^{ab}
\stackrel{?}{\longrightarrow}
\frac{h^{ab}}{c_f^2},
$$
where $c_f$ is the primitive field speed. This is only a bare-void comparison. It must not be substituted for the observer-facing $c_{\text{eff}}$ denominator in the mass roadmap until the Noether sea dressing map has been derived.

Proof burden. A proof packet for $\mathcal{I}_{A,\mathrm{void}}^{ab}$ must:

1. construct the drift family $\mathfrak{B}(\mathbf{V}_{\mathrm{cm}})$ with the same declared root-ledger identity, finite memory depth, regulator, returned section, and section-stability control as the rest chart;
2. prove persistence of active roots and inactive gaps on $B_\delta(0)$, including a positive Jacobian floor and no unlisted causal roots;
3. pull back $P_{\mathrm{mech}}+P_{\mathrm{wake,eff}}^{(\eta)}$ to the drift family and show differentiability at $\mathbf{V}_{\mathrm{cm}}=\mathbf{0}$;
4. separate regulator, memory-window, and branch-refinement dependence from the tensor coefficient by a controlled convergence statement;
5. report whether the response scalarizes to an isotropic coefficient or remains a genuine tensor with anisotropic residuals.

Relation to the mass map. If certified, $\mathcal{I}_{A,\mathrm{void}}^{ab}$ becomes a bare assembly susceptibility input to the mass-map program. It does not by itself produce observed mass. The Noether sea dressed tensor $\mathcal{M}_{\text{sea}}^{ab}$ still has to be derived from the surrounding medium response, shielding/exposure map, and observer-channel effective speed. In particular,
$$
\mathcal{M}_{\text{sea}}^{ab}
\neq
\frac{1}{E_{\mathrm{internal}}(A)}
\mathcal{I}_{A,\mathrm{void}}^{ab}
$$
unless a separate dressing theorem proves that the bare-void susceptibility passes unchanged through the Noether sea, which is not the current thesis.

Failure modes. The target fails for the candidate chart if no $C^1$ drift family with stable root-ledger identity exists, if a Jacobian floor or inactive-root gap closes, if the derivative depends on undeclared deep-past memory, regulator width, or root-ledger refinement, if the returned-section momentum balance has an uncontrolled boundary residual, if the response requires external Noether sea boundary data despite being advertised as bare void, or if isotropic scalarization is asserted while certified anisotropic tensor terms remain.

## Spiral Branch-Chart Test

Definition. For the symmetric variable-pitch spiral with $p(\theta)=-r'(\theta)/r(\theta)$, partner roots at receiver angle $\theta$ are the certified finite set
$$
\mathcal{P}(\theta)
=
\left\{
\Delta>0:
r(\theta)\Lambda_p(\theta,\Delta)=c_f(t(\theta)-t(\theta-\Delta)),
\ |J_{12}(\theta,\Delta)|\ge\nu_J
\right\},
$$
and self roots are the certified finite set
$$
\mathcal{S}(\theta)
=
\left\{
\Delta>0:
r(\theta)\Lambda_s(\theta,\Delta)=c_f(t(\theta)-t(\theta-\Delta)),
\ |J_{11}(\theta,\Delta)|\ge\nu_J
\right\}.
$$
The inactive complement is the remaining $\Delta$-domain in the finite memory interval $0 < t(\theta)-t(\theta-\Delta)\le h_{\mathrm{mem}}$, partitioned into intervals with positive causal-root gaps.

Condition. A radial turn corridor $I_\ast$ is admissible only if it contains a point $\theta_\ast$ with
$$
p(\theta_\ast)=0,\qquad p'(\theta_\ast)\le0,
$$
and the certified active roots satisfy the receiver-normal radial-turn inequality
$$
\mathcal{T}_r^{\mathrm{rec}}(\theta_\ast)
\equiv
r_\ast\dot\theta_\ast^2
-
\sum_{\Delta_p\in\mathcal{P}(\theta_\ast)}
\frac{\kappa |q_1q_2|\,W_{p}^{\mathrm{rec}}(1+\rho_p\cos\Delta_p)}
{r_\ast^2\Lambda_{p}^3}
+
\sum_{\Delta_s\in\mathcal{S}(\theta_\ast)}
\frac{\kappa q_1^2\,W_{s}^{\mathrm{rec}}(1-\rho_s\cos\Delta_s)}
{r_\ast^2\Lambda_{s}^3}
>0.
$$

Definition. The receiver-normal weighted tangential-drive diagnostic on a corridor $I_\ast$ is
$$
\mathcal{D}_T^{\mathrm{rec}}(I_\ast)
\equiv
\int_{I_\ast}w(\theta)
\left[
\sum_{\Delta_p\in\mathcal{P}(\theta)}
\frac{|q_1q_2|\,W_p^{\mathrm{rec}}(\theta,\Delta_p)S_T^p(\theta,\Delta_p)}
{\Lambda_p^3}
+
\sum_{\Delta_s\in\mathcal{S}(\theta)}
\frac{q_1^2\,W_s^{\mathrm{rec}}(\theta,\Delta_s)S_T^s(\theta,\Delta_s)}
{\Lambda_s^3}
\right]d\theta,
$$
where $w(\theta)\ge0$ is a declared quadrature weight on the returned section and every $W^{\mathrm{rec}}$ row is computed from the same retained root record as the numerator it weights.

Verdict. The bare isolated spiral remains undecided until an admissible radial turn corridor supplies $\mathcal{D}_T^{\mathrm{rec}}(I_\ast)$ with same-record $D_s$, $D_T$, and $W^{\mathrm{rec}}$ rows. Source-normal tangential signs are diagnostics only.

### Candidate VP-1 Branch-Chart Packet

The smallest current variable-pitch test packet is
$$
p(\theta)=-a\sin\theta,\qquad a=\frac{1}{10},
$$
with
$$
r(\theta)=R_\ast\exp(a(1-\cos\theta)),\qquad
t(\theta)=\frac{\theta}{\Omega},\qquad
\frac{\Omega R_\ast}{c_f}=b_\ast=\frac{7}{2}.
$$
Use the symmetric isolated pair
$$
\mathbf{x}_1(\theta)=r(\theta)\mathbf{e}_r(\theta),\qquad
\mathbf{x}_2(\theta)=-r(\theta)\mathbf{e}_r(\theta).
$$
The candidate radial-turn corridor is
$$
I_\ast=\left[-\frac{\pi}{6},\frac{\pi}{6}\right],\qquad
\theta_\ast=0,
$$
so $p(0)=0$ and $p'(0)=-a<0$.

For this packet,
$$
\rho(\theta,\Delta)
=
\frac{r(\theta-\Delta)}{r(\theta)}
=
\exp(a(\cos\theta-\cos(\theta-\Delta))),
\qquad
p_0=p(\theta-\Delta),
$$
and
$$
b(\theta)=\frac{\Omega r(\theta)}{c_f}
=
b_\ast\exp(a(1-\cos\theta)).
$$
The partner roots are the finite certified solutions of
$$
F_p(\theta,\Delta)\equiv
\Lambda_p(\theta,\Delta)-\frac{\Delta}{b(\theta)}=0,
\qquad
\Lambda_p=\sqrt{1+\rho^2+2\rho\cos\Delta},
$$
and the self roots are the finite certified solutions of
$$
F_s(\theta,\Delta)\equiv
\Lambda_s(\theta,\Delta)-\frac{\Delta}{b(\theta)}=0,
\qquad
\Lambda_s=\sqrt{1+\rho^2-2\rho\cos\Delta}.
$$
The candidate Jacobians are
$$
J_{12}
=
1+
\frac{b(\theta)\rho}{\Lambda_p}
\left[\sin\Delta-p_0(\cos\Delta+\rho)\right],
$$
and
$$
J_{11}
=
1-
\frac{b(\theta)\rho}{\Lambda_s}
\left[\sin\Delta+p_0(\rho-\cos\Delta)\right].
$$
The root domain is
$$
D_h=(0,4\pi],\qquad h=\frac{4\pi}{\Omega},
$$
with interval certification on $D_{\mathrm{cert}}=[\Delta_{\mathrm{co}},4\pi]$ for a declared $\Delta_{\mathrm{co}}>0$ and a separate excluded-coincidence clearance on $0<\Delta<\Delta_{\mathrm{co}}$.

The active-root Jacobian floor must satisfy
$$
\nu_J
=
\min\left\{
\inf_{\theta\in I_\ast,\ \Delta_p\in\mathcal{P}(\theta)}
|J_{12}(\theta,\Delta_p)|,
\inf_{\theta\in I_\ast,\ \Delta_s\in\mathcal{S}(\theta)}
|J_{11}(\theta,\Delta_s)|
\right\}
>0.
$$
The inactive complements of the certified root tubes must be partitioned into boxes $Q_a^p,Q_a^s$ with
$$
g_a^p=\inf_{Q_a^p}|F_p(\theta,\Delta)|>0,\qquad
g_a^s=\inf_{Q_a^s}|F_s(\theta,\Delta)|>0,
$$
and the excluded self-coincidence interval must satisfy
$$
\inf_{\theta\in I_\ast,\ 0<\Delta<\Delta_{\mathrm{co}}}
\frac{|F_s(\theta,\Delta)|}{\Delta}>0.
$$

#### VP-1 History-Compatibility Row

The VP-1 packet must also pass the state-dependent delay compatibility condition now promoted in the Master Equation. Let
$$
\mathcal{U}_{\mathrm{VP1}}
\subset
C^1([-h,0],(\mathbb{R}^3)^2)
$$
be a retained history tube around the candidate pair history on $I_\ast$. Every certified active root must be represented by a $C^1$ root-offset map
$$
\Delta_\alpha:I_\ast\times\mathcal{U}_{\mathrm{VP1}}\to D_h,
\qquad
\alpha\in\mathcal{A}_{\mathrm{VP1}},
$$
where $\mathcal{A}_{\mathrm{VP1}}$ indexes the retained partner and self root tubes. The maps must satisfy
$$
F_{\alpha}(\theta,\Delta_\alpha(\theta,\phi);\phi)=0,
\qquad
\left|\partial_\Delta F_{\alpha}(\theta,\Delta_\alpha(\theta,\phi);\phi)\right|
\ge \nu_{\Delta}>0,
$$
for all $\theta\in I_\ast$ and all $\phi\in\mathcal{U}_{\mathrm{VP1}}$, with the same active-root identities as the nominal VP-1 chart. The inactive boxes $Q_a^p,Q_a^s$ must retain positive interval gaps throughout the same tube:
$$
\inf_{\phi\in\mathcal{U}_{\mathrm{VP1}}}\inf_{Q_a^p}|F_p(\theta,\Delta;\phi)|>0,
\qquad
\inf_{\phi\in\mathcal{U}_{\mathrm{VP1}}}\inf_{Q_a^s}|F_s(\theta,\Delta;\phi)|>0.
$$

The root-transport residual is evaluated in the $\theta$ parametrization. Since $t=\theta/\Omega$ and an active emission time is $t_0=(\theta-\Delta_\alpha(\theta))/\Omega$, a simple root must satisfy
$$
\mathcal{R}_{\mathrm{tr},\alpha}(\theta)
\equiv
\left|
1-\frac{d\Delta_\alpha}{d\theta}
-
\frac{1-\hat{\mathbf r}_\alpha\cdot\mathbf{v}_{i,\alpha}/c_f}
{J_\alpha}
\right|
=0
$$
up to the declared interval or quadrature tolerance. The VP-1 certificate must therefore report
$$
\max_{\alpha\in\mathcal{A}_{\mathrm{VP1}}}
\sup_{\theta\in I_\ast}
\mathcal{R}_{\mathrm{tr},\alpha}(\theta)
\le \varepsilon_{\mathrm{tr}},
$$
alongside $\nu_J$, inactive-gap floors, the finite-memory bound, $\mathcal{T}_r(0)$, and $\mathcal{D}_T(I_\ast)$.

Classification. VP-1 is derivative-sensitive on the retained $C^1$ history chart because the transported root offsets depend on delayed source velocities and the current force rows also depend on receiver-normal motion through $D_T$. It should not be promoted as a neutral-type theorem unless a later Noether wake-history pullback introduces delayed acceleration or boundary-derivative dependence and supplies the corresponding continuity estimate. Failure of $C^1$ root-offset dependence, inactive-gap persistence, root-transport residuals, or same-record $D_T/D_s$ rows blocks the VP-1 branch chart before radial-turn and weighted tangential-drive verdicts are interpreted.

The finite-memory bound is supplied by
$$
\rho\le e^{2a},\qquad
\Lambda_{p,s}\le1+e^{2a},\qquad
b(\theta)\le b_\ast e^{2a}.
$$
Thus any retained root obeys
$$
\Delta\le b_\ast e^{2a}(1+e^{2a})<4\pi,
$$
and therefore
$$
h_{\mathrm{mem}}
\le
\frac{b_\ast e^{2a}(1+e^{2a})}{\Omega}
<h.
$$

Use the quadrature weight
$$
w(\theta)=\cos^2(3\theta),\qquad \theta\in I_\ast.
$$
Candidate VP-1 passes the bare isolated spiral test only if the certified chart has
$$
\mathcal{T}_r(0)>0
$$
and
$$
\mathcal{D}_T(I_\ast)\le-\varepsilon_T,\qquad \varepsilon_T>0.
$$
It fails if $\nu_J=0$, an inactive gap closes, near-coincidence self roots cannot be separated from $\Delta=0$, $h_{\mathrm{mem}}\ge h$, $\mathcal{T}_r(0)\le0$, or $\mathcal{D}_T(I_\ast)\ge0$. It also fails if the negative tangential verdict requires roots outside the certified chart. The comparison to circular asymptotics is only the circular obstruction: at $\theta_\ast=0$, both tangential numerators reduce to $\rho\sin\Delta$, so principal roots with $0<\Delta<\pi$ keep the circular positive-tangential sign.

## Promotion Lemma

Lemma. If a candidate history $\Gamma$ has a branch-chart closure object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ with positive active Jacobian floor, positive inactive-root gaps, finite memory depth, bounded returned-section residuals, and a stable returned section, then the candidate may support a master-equation closure claim on that chart.

Proof sketch. Positive floors make the branch list locally complete and differentiable; finite memory reduces the causal functional to the certified history window; bounded returned residuals put the candidate within the declared section tolerance; and section stability prevents the result from being only a transient root enumeration. The lemma does not prove global closure across folds, $\eta\to0$ limits, or other histories; it licenses promotion from a candidate ledger to a local theorem target.

## Maximum-Curvature Wall

Keep the maximum-curvature-wall question tied to both tracks. The Jacobian-null boundary amplifies the full self branch, so the tangential contribution also blows up. That is an obstruction, not yet a resolution.

## Lorentz And GR Bridge Program

- Treat the Lorentz / GR bridge as a two-stage theorem program:
  1. prove that moving Noether braid branches in the Noether sea realize $R_\parallel = R_\perp / \gamma$ and $T(v) = T_0 \gamma$ as a stable delayed-dynamics attractor rather than by tuning;
  2. coarse-grain the same causal medium into a constitutive response that yields $g_{\mu\nu}^{\mathrm{eff}}$, weak-field PPN closure, and suppressed preferred-frame leakage.
- Keep the two stages independent in proof order. The moving-assembly extraction uses the delayed root equations, branch admissibility, hierarchy averaging, and clock/ruler observables; weak-field PPN supplies downstream tests of the dressed medium response, not a prerequisite for extracting the homogeneous moving-assembly laws.
- Close $d\tau/dt = F(v,\rho,\Phi)$ and the substrate-to-metric functional.
- Derive the weak-field map from hit-density and medium variables to $g_{\mathrm{eff}}$ constraints in [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md) and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md).
- Derive the constitutive closure from the coarse-grained medium itself rather than postulating it:
  - take the continuum limit of the $\eta$-regularized delayed action and effective medium Lagrangian seriously;
  - declare the scaling-limit datum for any $\eta\to0^+$ claim: regulator family, scaling trajectory, observable maps, normalization or mixing rules, test-window class, convergence topology, and the uniform-control or reconstruction condition required by the promoted statement;
  - compute the relevant continuum stress-strain or equivalent constitutive variables of the causal medium;
  - derive the PPN numbers $\gamma$, $\beta$, and $\alpha_i$ to the Will benchmark rows: $|\gamma_{\mathrm{PPN}}-1|\le2.3\times10^{-5}$, $|\beta_{\mathrm{PPN}}-1|\le8\times10^{-5}$, $|\alpha_1|\le4\times10^{-5}$, $|\alpha_2|\le2\times10^{-9}$, and $|\alpha_3|\le4\times10^{-20}$;
  - recover the weak-field targets $\gamma_{\mathrm{eff}} = 1$, $\beta_{\mathrm{eff}} = 1$, and vanishing preferred-frame coefficients $\alpha_1$, $\alpha_2$, $\alpha_3$;
  - and show Shapiro delay and light-bending equivalence to GR at the advertised $10^{-5}$ level.

## Moving-Assembly Extraction Packet

The first Lorentz bridge object is a homogeneous moving-three-binary theorem target, not a PPN calculation. Fix a drift band
$$
\mathcal{D}_{\beta}=\{\,0\le\beta_f\le\beta_{\max}<1\,\},
\qquad
\beta_f=\frac{v}{c_f},
$$
and an admitted branch class $q$ with translated attractor family $\boldsymbol{\rho}^{\star}_q(s;\beta_f)$, positive active Jacobian floor, positive inactive-root gaps, finite memory depth, stable monodromy or certified trapping, and no undeclared branch transition inside the band. Primitive causal roots are always solved with the field speed $c_f$:
$$
\left\|\mathbf{x}_{o}(t)-\mathbf{x}_{j}(t_0)\right\|
=
c_f(t-t_0).
$$
The observer-channel speed $c_\star$ is declared only after the branch chart is chosen: $c_\star=c_f$ for a primitive wake chart and $c_\star=c_{\text{eff}}(\mathbf{x},t)$ for a Noether sea dressed clock/ruler channel. The photon specialization $c_\star=c_\gamma(\mathbf{x},t)$ is separate and remains a photon-channel closure target. With this convention
$$
\beta_\star=\frac{v}{c_\star},
\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-\beta_\star^2}}.
$$

Extract the moving shape from the cycle-averaged tensor
$$
Q_{ab}^{(q)}(v)
=
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i.
$$
Let $\hat{\mathbf e}_{\parallel}$ be the drift direction and let $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^a\hat e_{\parallel}^b$. The extracted semiaxes are
$$
a_{\parallel,q}(v)
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}(v)\hat e_{\parallel}^{b}},
\qquad
a_{\perp,q}(v)
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}(v)}.
$$
The clock period observable is extracted from a declared clock phase $\theta_{\mathrm{clk},q}$ on the same branch:
$$
T_q(v)
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
T_0=T_q(0).
$$

The moving-assembly residuals are
$$
R_{\parallel}^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)},
\qquad
R_T^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}
-
\gamma_\star(v).
$$
The extraction packet passes on $\mathcal{D}_{\beta}$ only if, for every retained drift speed,
$$
\left|R_{\parallel}^{(q)}(v)\right|
\le
C_{\parallel}\epsilon_{\mathrm{LV}}\beta_\star^2,
\qquad
\left|R_T^{(q)}(v)\right|
\le
C_T\epsilon_{\mathrm{LV}}\beta_\star^2,
$$
and the same branch chart gives the two-way leakage bound
$$
\Delta_{\mathrm{tw}}^{(q)}(\beta_\star,\theta)
=
\Delta_{\mathrm{tw,Lor}}(\beta_\star,\theta)
+
\Delta_{\mathrm{tw,PF}}^{(q)}(\beta_\star,\theta),
\qquad
\sup_{\mathcal{D}_{\beta},\theta}
\left|\Delta_{\mathrm{tw,PF}}^{(q)}\right|
\le
C_{\mathrm{tw}}\epsilon_{\mathrm{LV}}.
$$
Preferred-frame leakage may also appear as clock/shape sidebands, drift-dependent channel splitting $c_{\text{eff}}-c_f$, photon-channel splitting $c_\gamma-c_{\text{eff}}$, or weak-field coefficients $(\alpha_1,\alpha_2,\alpha_3)$ after metric dressing. Those downstream leakage terms may falsify the bridge, but they do not define the moving-assembly extraction.

Failure modes for this packet are concrete: no stable translated attractor on the drift band, loss of Jacobian floor or inactive-root gaps, unbounded memory depth, branch transition treated as smooth drift, residuals above the leakage bounds, a clock period and ruler semiaxis extracted from different branch ledgers, identification of $c_f$ with $c_\star$ without a dressing map, or Lorentz agreement obtained only by tuning a PPN coefficient or per-observable clock/ruler rule after the moving branch has been extracted.

## RMS/SME Residual Handoff

The Lorentz test suite consumes the moving-assembly packet through residual rows, not through a declaration that the observer sector is Lorentzian. For the same retained branch $q$, define
$$
\mathbf{R}_{\mathrm{RMS}}^{(q)}
=
\begin{pmatrix}
R_{\mathrm{MM}}^{(q)}\\
R_{\mathrm{KT}}^{(q)}\\
R_{\mathrm{IS}}^{(q)}
\end{pmatrix}
=
\begin{pmatrix}
\bar\delta^{(q)}-\bar\beta^{(q)}\\
\bar\beta^{(q)}-\bar\alpha^{(q)}\\
\bar\alpha^{(q)}
\end{pmatrix},
$$
where the barred coefficients are offsets from the special-relativistic Robertson-Mansouri-Sexl values in the homogeneous drift expansion. The theorem target is
$$
\mathbf{R}_{\mathrm{RMS}}^{(q)}=\mathbf{0}+O(\epsilon_{\mathrm{LV}})
$$
with the same branch also satisfying the two-way residual bound
$$
\sup_{\beta,\hat{\mathbf n}}
\left|\Delta_{\mathrm{tw}}^{(q)}(\beta,\hat{\mathbf n})\right|
\lesssim10^{-18}
$$
when projected into direct photon-sector cavity observables.

The weak-field metric export is the PPN vector
$$
\mathbf{p}_{\mathrm{PPN}}^{(q)}
=
\begin{pmatrix}
\gamma_{\mathrm{PPN}}^{(q)}-1\\
\beta_{\mathrm{PPN}}^{(q)}-1\\
\alpha_1^{(q)}\\
\alpha_2^{(q)}\\
\alpha_3^{(q)}
\end{pmatrix},
$$
which must be normalized against
$$
\mathbf{b}_{\mathrm{Will}}
=
\begin{pmatrix}
2.3\times10^{-5}\\
8\times10^{-5}\\
4\times10^{-5}\\
2\times10^{-9}\\
4\times10^{-20}
\end{pmatrix}.
$$
The bridge passes the source-mined weak-field row only if
$$
\left\|
\operatorname{diag}(\mathbf{b}_{\mathrm{Will}})^{-1}
\mathbf{p}_{\mathrm{PPN}}^{(q)}
\right\|_\infty
\le1.
$$

The SME-style export is a comparison projection:
$$
\mathbf{R}_{\mathrm{SME}}^{(q)}
=
\left(
\tilde\kappa_{e-}^{(q)},
\tilde\kappa_{o+}^{(q)},
\tilde\kappa_{\mathrm{tr}}^{(q)},
\bar{s}^{\mu\nu(q)},
\mathbf{c}_{\mathrm{matter}}^{(q)}
\right).
$$
These rows are not added to the substrate law. They are the coefficient-space shadow cast by the branch into the standard Sun-centered frame used by SME data tables. A successful master-equation bridge should report them even when every entry is consistent with zero, because absent rows are indistinguishable from untested leakage.

## Lorentz/GR Bridge Contract

Definition. The Lorentz/GR bridge theorem target is the packet
$$
\mathfrak{L}_{\mathrm{GR}}
=
\left(
\mathcal{C}_{\mathrm{mov}},
\mathcal{T}_{\mathrm{clk}},
\mathcal{K}_{\mathrm{med}},
\mathcal{G}_{\mathrm{eff}},
\mathcal{L}_{\mathrm{PF}}
\right),
$$
where $\mathcal{C}_{\mathrm{mov}}$ is the moving-assembly contraction law, $\mathcal{T}_{\mathrm{clk}}$ is the clock retuning law, $\mathcal{K}_{\mathrm{med}}$ is the coarse-grained medium constitutive response, $\mathcal{G}_{\mathrm{eff}}$ is the effective metric functional, and $\mathcal{L}_{\mathrm{PF}}$ is the preferred-frame leakage bound.

Condition. The moving-assembly contraction law is accepted on a declared drift band only when the translated attractor family has extracted semiaxes satisfying
$$
\mathcal{C}_{\mathrm{mov}}:\qquad
\frac{a_\parallel(v)}{a_\perp(v)}
=
\frac{1}{\gamma_\star(v)}+R_{\parallel}(v),
\qquad
|R_{\parallel}(v)|\le C_\parallel\epsilon_{\mathrm{LV}}\beta_\star^2.
$$

Condition. The clock retuning law is accepted on the same drift band only when the reference clock channel satisfies
$$
\mathcal{T}_{\mathrm{clk}}:\qquad
\frac{T(v)}{T_0}
=
\gamma_\star(v)+R_T(v),
\qquad
|R_T(v)|\le C_T\epsilon_{\mathrm{LV}}\beta_\star^2,
$$
with $c_\star=c_f$ for primitive branch charts and $c_\star=c_{\text{eff}}(\mathbf{x})$ for Noether sea dressed clock/ruler comparisons.

Definition. The coarse-grained medium constitutive response is the map
$$
\mathcal{K}_{\mathrm{med}}:
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}}),
$$
and it is admissible only if the same coefficients predict clock redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals without re-fitting per observable.

The coefficient-level weak-field target is not only the arrow above. Let
$$
\delta n\equiv n-1,\qquad
\delta\chi\equiv\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi\equiv\frac{\Phi_{\text{eff}}}{c_0^2},
$$
and let $\sigma_{ij}$ denote the retained stress projection from the continuum Noether sea record. The constitutive rows must have the form
$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\sigma)
+O(c_0^{-6},\epsilon_{\mathrm{LV}}),
$$
$$
\gamma_{ij}^{\mathrm{eff}}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}),
$$
$$
u^i_{\mathrm{sea,eff}}
=
B^i{}_j w^j\frac{U}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}),
$$
$$
\gamma_{ij}^{\mathrm{eff}}=\delta_{ab}e^a{}_i e^b{}_j.
$$
Here $w^i$ is the medium drift relative to the comparison frame and $U$ is the positive PPN potential. The lapse row supplies the clock-redshift and $\beta_{\mathrm{PPN}}$ coefficients, the spatial-compliance row supplies the shared Shapiro/lensing $\gamma_{\mathrm{PPN}}$ coefficient, and the shift row supplies the preferred-frame leakage coefficients. These rows remain theorem targets until derived from the same continuum Noether sea record that fixes $n$, $\chi_{\text{sea}}$, $\Phi_{\text{eff}}$, and stress.

Definition. The effective metric functional is
$$
\mathcal{G}_{\mathrm{eff}}[\mathcal{K}_{\mathrm{med}}]
:\qquad
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt_{\mathrm{eff}}^2
+
\gamma_{ij}^{\mathrm{eff}}\big(dx_{\mathrm{eff}}^i-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\big)\big(dx_{\mathrm{eff}}^j-u^j_{\mathrm{sea,eff}}dt_{\mathrm{eff}}\big),
$$
with weak-field acceptance condition
$$
(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_1,\alpha_2,\alpha_3)
=
(1,1,0,0,0)+O(\epsilon_{\mathrm{LV}}).
$$

Condition. The preferred-frame leakage bound is
$$
\mathcal{L}_{\mathrm{PF}}
\equiv
\max\left(
\mathcal{E}_{\text{shape}},
\mathcal{E}_{\text{clock}},
\sup_{\beta,\theta}|\Delta_{\text{tw}}(\beta,\theta)|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|,
|C_{Uv}|
\right)
\le
\epsilon_{\mathrm{LV}},
$$
with the empirical target below current Lorentz-violation bounds and with no special retuning of $\kappa$, $\eta$, or axial details between observables.

## Falsifier Ledger

Falsifier. A Jacobian-null wall falsifies a branch-chart promotion when $\nu_J=0$ on an active chart and no dual-mollified finite-crossing control supplies a bounded replacement for the branch-sum formula.

Falsifier. Infinite memory depth falsifies a finite closure packet when $h_{\mathrm{mem}}$ cannot be bounded inside the declared memory horizon or when returned-section residuals depend on untracked deep-past history.

Falsifier. Branch proliferation falsifies local closure when $\sup_{t,i,j}B^{\mathrm{active}}_{ij}(t)=\infty$ on the candidate chart or when unlisted active roots appear inside an inactive complement.

Falsifier. Tangential-drive sign obstruction falsifies the bare isolated spiral route only after every admissible radial turn corridor has a receiver-normal $\mathcal{D}_T^{\mathrm{rec}}(I_\ast)\ge0$ row or when the negative verdict requires roots outside the certified branch chart.

Falsifier. Regulator dependence falsifies promotion when the receiver-normal radial-turn verdict, receiver-normal tangential-drive verdict, contraction coefficients, or clock coefficients change under controlled $\eta\to0$ or $\epsilon_c\to0$ refinement rather than converging in the declared weak/integrated sense.

Falsifier. Preferred-frame leakage above bound falsifies the Lorentz/GR bridge when $\mathcal{L}_{\mathrm{PF}}>\epsilon_{\mathrm{LV}}$ on the calibration band or when the PPN vector fails $(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_1,\alpha_2,\alpha_3)=(1,1,0,0,0)+O(\epsilon_{\mathrm{LV}})$.

Falsifier. Ad hoc tuning falsifies the bridge when closure holds only for an isolated value of $\kappa$, a chosen regulator width $\eta$, or axial-structure-specific details rather than on an open admissible parameter family with fixed observable-extraction rules.

## Dependency Interface

Interface. The proof-program lane owns candidate histories, branch-chart certificates, monodromy diagnostics, returned-sample residuals, topology certificates, and pass/fail artifact files; this master-equation closure file consumes those rows only through $\mathfrak{B}$ and does not edit or redefine the proof-program artifacts.

Interface. The simulations lane owns run protocols, root ledgers, conservation-pullback rows, convergence plots, regularization sweeps, branch residuals, drift-response coefficients, and leakage estimates; this file consumes those outputs as numeric or interval inputs to $\mathfrak{B}$, $\mathfrak{L}_{\mathrm{GR}}$, and $\mathcal{I}_{A,\mathrm{void}}^{ab}$ and does not own the simulation artifacts.

Interface. The doubling-frequency-lock and angular-momentum lanes may consume the promotion lemma as a shared admissibility gate for phase-amplitude maps, root-ledger transactions, and conserved-functional claims, but this file does not certify doubling-frequency selection, spin closure, or angular-momentum partition rules.

Interface. Quantum closure may consume $\mathfrak{B}$ only as certified branch-chart input to its retained causal-wake state, coarse-graining map, and finite-$\eta$ flow or return map. $\mathfrak{B}$ does not supply an invariant measure, a basin partition, a Born-rule weight, a detector law, or a Bell-family probability table. Those remain quantum-side objects that must be derived from the transfer-operator packet after the branch data are retained.

Interface. Mass-map closure may consume $\mathfrak{B}$ only as Tier 0 / Tier 1 branch-certificate input: finite active roots, inactive gaps, Jacobian floor, memory depth, returned-section residual, and stability margin. After the bare-void response tensor target is certified, mass-map closure may consume $\mathcal{I}_{A,\mathrm{void}}^{ab}$ as a separate susceptibility input, but not as $\mathcal{M}_{\text{sea}}^{ab}$ or observed mass. $\mathfrak{B}$ does not supply $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, $\mathcal{M}_{\text{sea}}^{ab}$, or a particle-facing mass comparison. Those remain downstream Tier 2 / Tier 3 extraction objects after a stable branch has passed.

Interface falsifier. If a downstream basin weight, shielding coefficient, or response tensor changes under root-ledger refinement, inactive-gap refinement, memory-depth extension, or controlled $\eta$ refinement while the claimed upstream branch identity is held fixed, the handoff is under-specified and the downstream claim is blocked.

## Empirical Stakes

- The absolute-time and Euclidean-void ontology survives only if the exact compensation works at the relevant modern Lorentz-violation bound for each channel.
- The source-mined bounds are channel-specific: two-way photon orientation tests reach the $10^{-18}$ scale, while PPN preferred-frame rows range from $4\times10^{-5}$ for $\alpha_1$ to $4\times10^{-20}$ for $\alpha_3$.
- If the contraction or clock-slowing law requires ad hoc tuning of $\kappa$, $\eta$, or axial-structure-specific detail, the bridge fails.
- Match GR in the weak field first, then let strong-field deviations emerge as predictions rather than assertions.

## Longer-Tail Dynamics Program

1. Run a retained-branch simulation packet that evaluates the normalized Noether wake increments for energy, momentum, and angular momentum under the conservation-pullback contract.
2. $\eta \to 0$ existence and uniqueness theory for the exact shell model.
3. Controlled kinetic or coarse-grained equation from the master law.
4. Lorentz-suppression emergence for moving assemblies in the full dynamics, ideally independent of axial-layer details.
5. Effective magnetic and Lorentz-force emergence from assemblies.
6. Full attractor landscape for binaries and Noether braid branches.
7. Quantum closure from the master equation.

## Related Priorities

- [breather-proof](../proof-programs/breather-proof/priorities.md)
- [angular-momentum-spin](../braid-angular-momentum-spin/priorities.md)
- [mass-map](../braid-mass-response-map/priorities.md)
- [doubling-frequency-lock](../braid-doubling-frequency-lock/priorities.md)
- [quantum-closure](../quantum-closure/priorities.md)
- [strong-field-closure](../strong-field-closure/priorities.md)
- [cosmology-closure](../cosmology-closure/priorities.md)

## Related AAA Notes

- [master-equation](../../../content/markdown/aaa/dynamics/master-equation.md)
- [lorentz-kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [emergent-metric](../../../content/markdown/aaa/spacetime/emergent-metric.md)
- [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md)
- [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md)

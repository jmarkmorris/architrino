# Master-Equation Closure and Certified Eigen-Braid Root

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `63.47`
- Cost: `6.0`
- ROI: `10.58`
- Status: `active`

## Task Queue

1. `receiver_normal_branch_strength_certificate` — Populate `receiver_normal_branch_strength_certificate/v0` for one retained branch family with same-record $D_s$, $D_T$, $W^{\mathrm{rec}}$, retained-row aggregation, source artifact identity, regulator state, and fail-closed negative controls. Status: `active`; this is the first missing minimum evidence object. Depends on: none.
2. `certified_eigen_braid` — Exhibit one retained eigen-braid branch with the receiver-normal certificate, finite active-root ledger, inactive-gap and finite-memory rows, bounded EOM and returned-section residuals, closed action and Noether wake-history rows, and a positive non-symmetry stability margin. Status: `blocked-on-receiver-normal-certificate`. Depends on: `receiver_normal_branch_strength_certificate`.
3. `spiral_branch_chart_test` — Rebuild one VP-1 or A1 force/action row from retained topology plus same-box receiver-normal branch strength; do not inherit source-normal drive verdicts. Status: `active-restart`. Depends on: `receiver_normal_branch_strength_certificate`.
4. `a1_outward_constants_handoff` — Emit A1 outward constants only after the A1 restart packet carries same-box receiver-normal branch rows and accepted aggregation. Status: `blocked-on-spiral-branch-chart-test`. Depends on: `spiral_branch_chart_test`.
5. `emission_flux_jacobian_conservation` — Derive the simple-root emission-flux and receiver-time pullback using the same retained record, including $ds_\ell/dt=D_T/D_s$. Status: `priority-only`. Depends on: receiver-normal retained branch.
6. `binary_perturbation_projection_classifier` — Classify finite binary perturbations by radial response, tangential response, cadence/radius retuning, and branch transition on one accepted retained branch. Status: `priority-only`. Depends on: `certified_eigen_braid`.
7. `topological_causal_root_ledger_proof_target` — Refine the EOM-independent torus ledger theorem, boundary operator, and large-box limit without treating topology as force/action evidence. Status: `priority-only-theorem-target`. Depends on: none for the topology layer; downstream use depends on an accepted branch consumer.
8. `lorentz_gr_bridge` — Extract moving-assembly contraction and clock rows, then derive the shared Noether sea constitutive response and weak-field metric export. Status: `pending`. Depends on: `certified_eigen_braid`.
9. `lorentz_test_residual_handoff` — Export RMS, PPN, and SME-style residual rows from one shared branch, clock, ruler, signal, and medium-response record. Status: `pending`. Depends on: `lorentz_gr_bridge`.

## Scope

The workstream closes the receiver-normal Master EOM at retained-branch level, exhibits the first certified eigen-braid, and routes that accepted branch into action, stability, Lorentz/GR, and downstream coefficient programs. Standard-physics equations enter only as downstream recovery tests; they are not premises of the substrate dynamics.

The live blocker is the absence of one populated same-record receiver-normal branch-strength certificate. Retained root topology, inactive gaps, finite-memory bounds, source-normal transversality, and root-transport identities are conditional geometry inputs. They do not supply force balance, action, power, wake-history closure, or a pass/fail verdict without $D_T$ and $W^{\mathrm{rec}}$ on the same record.

## Current Evidence Object

For retained branch family $\mathcal A_{\mathcal B}$, the minimum branch row is
$$
D_{s,a}=c_f-\hat{\mathbf r}_a\cdot\mathbf v_j(s_a),
\qquad
D_{T,a}=c_f-\hat{\mathbf r}_a\cdot\mathbf v_i(t),
\qquad
W_a^{\mathrm{rec}}=\left|\frac{D_{T,a}}{D_{s,a}}\right|.
$$
The first accepted packet must bind those fields to the retained root id, source/receiver ids, time row, retained box, regulator state, geometry, radial/tangential projections, exact aggregation list, scalar statistic, source artifact hash, and negative controls. A derivative-consuming packet must additionally bind $D_vD_s$, $D_vD_T$, reconstructed $D_vW^{\mathrm{rec}}$, geometry derivatives, and the receiver-normal force-kernel derivative to that same record.

Acceptance falsifiers are immediate: missing or record-mismatched $D_T$; substitution of a source-normal diagnostic for $W^{\mathrm{rec}}$; branch-list mismatch between aggregation and the reported statistic; open source-normal floor; undeclared sign crossing; nonfinite geometry; or a derivative reconstructed from another record, box, regulator state, or artifact.

## Packet Routing

| Surface | Current role | Promotion state |
| --- | --- | --- |
| [Receiver-normal branch-strength certificate](receiver-normal-branch-strength-certificate.md) | Required schema and first-derivative reconstruction target. | `priority-only`; populate now. |
| [Receiver-normal restart ledger](receiver-normal-master-equation-restart-ledger.md) | Global disposition of earlier proof routes after the Master EOM correction. | `priority-only`; current routing authority. |
| [Receiver-normal wake-action factor](receiver-normal-wake-action-factor.md) | Local receiver-time pullback and action/wake-history target. | `priority-only`; blocked on accepted retained rows. |
| [Branch closure program](branch-closure-program.md) | Detailed circular/spiral branch mathematics, closure object, response tensor target, and falsifiers moved out of this tracker. | `priority-only`; preserve as technical program. |
| [A1 receiver-normal restart](spiral-a1-restart.md) | Consolidated A1 topology inputs, kinematic demand, force/action rows, and promotion rule. | `priority-only`; no A1 verdict. |
| [VP-1 receiver-normal restart](spiral-vp1-restart.md) | Consolidated VP-1 topology inputs, interval routing, force/action rows, and promotion rule. | `priority-only`; no VP-1 drive verdict. |
| [Topological causal-root ledger](topological-causal-root-ledger-proof-target.md) | EOM-independent theorem route for retained winding/root boundary accounting. | `priority-only`; not branch evidence. |
| [Lorentz/GR bridge](lorentz-gr-bridge-handoff.md) | Moving-assembly and Noether sea response dependency contract. | `defer with blocker`: certified branch required. |
| [Lorentz residual export](lorentz-test-residual-handoff.md) | RMS, PPN, and SME-style downstream residual contract. | `defer with blocker`: Lorentz/GR bridge required. |
| [Brainstorming](brainstorming.md) | Provisional mechanisms and proof ideas. | `priority-only`; promote only after derivation. |
| [Work log](work-log.md) | Dated status, failed paths, and handoffs. | Operational history only. |

## Preserved Topology And Interval Evidence

The following packets remain separate because each owns distinct mathematical evidence rather than restart narration:

- A1 root windows, inactive gaps, Jacobian floor, self-coincidence clearance, and finite-memory bound: [spiral-a1-root-window-certificate.md](spiral-a1-root-window-certificate.md).
- A1 differentiated root identity and transport residual contract: [spiral-a1-root-transport-interval-proof.md](spiral-a1-root-transport-interval-proof.md).
- VP-1 sampled active-root continuation and Jacobian margins: [spiral-vp1-root-jacobian-proof.md](spiral-vp1-root-jacobian-proof.md).
- VP-1 finite-memory, self-coincidence, inactive-complement, and transport setup: [spiral-vp1-inactive-memory-proof.md](spiral-vp1-inactive-memory-proof.md).
- VP-1 outward interval active-tube and inactive-gap rows: [spiral-vp1-interval-root-gap-proof.md](spiral-vp1-interval-root-gap-proof.md).
- VP-1 analytic root-transport identity: [spiral-vp1-root-transport-interval-proof.md](spiral-vp1-root-transport-interval-proof.md).

These packets may seed a receiver-normal rebuild only after their retained identities and boxes are rebound to the same $D_s$, $D_T$, and $W^{\mathrm{rec}}$ record.

## Promotion Map

| Task | Primary corpus destination | Gate |
| --- | --- | --- |
| `receiver_normal_branch_strength_certificate` | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) | One independently reproducible retained branch-family packet satisfies the same-record certificate and negative controls. |
| `certified_eigen_braid` | [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md), [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md), and [Energy](../../../content/markdown/aaa/dynamics/energy.md) | One replayable retained branch closes root, memory, action, wake-history, returned-section, and stability rows under refinement. |
| `spiral_branch_chart_test` | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) | One VP-1 or A1 candidate reports retained topology plus same-record receiver-normal radial/tangential aggregation and negative controls. |
| `lorentz_gr_bridge` | [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), and [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Moving-assembly and shared medium-response packets close without per-observable retuning or preferred-frame leakage above bound. |

## Dependencies

- Proof packets provide candidate histories, retained root charts, residuals, and stability rows; this lane consumes them without redefining their evidence.
- The EOM solver and simulation lanes provide independently reproducible retained records, interval rows, convergence data, and response coefficients.
- Mass, quantum, spin, cosmology, and reaction programs may consume an accepted branch certificate but may not infer their own closure from its existence.

## Related Priorities

- [Quantum closure](../quantum-closure/priorities.md)
- [Strong-field closure](../strong-field-closure/priorities.md)
- [Cosmology closure](../cosmology-closure/priorities.md)
- [Equation mapping](../equation-mapping/priorities.md)


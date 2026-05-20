# Minimal Candidate-Set Instance

Status. Priority instance for `tri_binary_partition_rule`, downstream of [finite-branch-candidate-set-packet.md](finite-branch-candidate-set-packet.md), [branch-selection-law-packet.md](branch-selection-law-packet.md), and [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). This file instantiates the finite retained candidate-set format around the clean minimal four-substep branch. It is priority material only and does not promote branch uniqueness, spinor closure, measurement response, or Bell recovery to theorem status.

Claim level. Defer with blocker. The packet shows how the solved reduced minimal branch enters a finite candidate audit trail. The algebraic scalar and vector rows inherited from the minimal certificate remain conditionally populated, but root replay, phase lock, torque consistency, normalized causal-wake pullback, section stability, retained energy routing, and non-minimal competitors are not yet evaluated. The retained candidate is therefore blocked rather than forbidden.

Promotion decision. Defer with blocker. Promote only after at least one finite retained candidate set has populated root, wake, torque, phase, stability, and routing rows, and after the deterministic branch-selection residual can compare all evaluable retained candidates.

## Instance Inputs

Fix the minimal transition window

$$
W_{\min}=[t_i,t_f],
$$

the reduced pre-branch chart $B_{\min}^-$, and the coupling datum

$$
\Gamma_{\min}
=
\left(
+1,
\Delta E_{\mathrm{tx}},
\Delta\mathbf J_{\mathrm{tx}},
\hat{\mathbf a},
\mathrm{Geom}_{\min}
\right).
$$

The retained budget is the smallest budget that can represent one continued branch word, one layer-retune block for each layer, and the two inner self-hit rows named by the reduced minimal certificate:

$$
N_{\min}
=
\left(
N_{\mathrm{act}}^{\min},
N_{\mathrm{inact}}^{\min},
N_{\mathrm{fold}}^{\min},
N_{\mathrm{sep}}^{\min},
N_{\mathrm{grp}}^{\min},
N_{\mathrm{route}}^{\min},
N_{\mathrm{box}}^{\min}
\right).
$$

The present instance does not assert that $N_{\min}$ is globally minimal. It is a local audit budget for replaying the already-solved reduced branch inside the finite-candidate-set contract.

## Candidate Set

The generated set for this reduced instance is

$$
\mathcal A_{N,\min}
\left(
B_{\min}^-,
\Gamma_{\min},
W_{\min}
\right)
=
\{\mathfrak a_{\min}\}.
$$

The retained candidate record is

$$
\mathfrak a_{\min}
=
\left(
B_{\min}^+,
\boldsymbol{\Delta I}_{\min},
\mathrm{core},
\mathfrak m_{B_{\min}^+},
\lambda_{\min},
\mathcal P_{\min}^{\mathrm{red}},
\mathcal Q_{\min}^{\mathrm{iso}},
\upsilon_{\min}
\right),
$$

with

$$
\boldsymbol{\Delta I}_{\min}
=
\left(
\Delta I_{\text{inner}}^{\min},
\Delta I_{\text{middle}}^{\min},
\Delta I_{\text{outer}}^{\min},
\Delta I_{\text{wake}}^{\min}
\right).
$$

The reduced certificate supplies the conditional algebraic rows

$$
\mathcal R_I^{B_{\min}}=0,
\qquad
\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0,
\qquad
\mathcal R_{\perp}^{B_{\min}}=\mathbf 0,
$$

under the fixed-normal, no-transport, no-retained-wake assumptions recorded in [minimal-four-substep-certificate-instance.md](minimal-four-substep-certificate-instance.md). Those rows identify the candidate. They do not make it evaluable for deterministic branch selection.

## Audit Partition

The instance audit partition is

$$
\mathcal A_{N,\min}^{\mathrm{eval}}=\varnothing,
\qquad
\mathcal A_{N,\min}^{\mathrm{blk}}=\{\mathfrak a_{\min}\},
\qquad
\mathcal A_{N,\min}^{\mathrm{excl}}=\varnothing.
$$

Equivalently,

$$
\upsilon_{\min}=\mathrm{blocked},
\qquad
\mathfrak a_{\min}\in\mathcal A_{N,\min}^{\mathrm{blk}}.
$$

The candidate is not locally excluded because no row proves an impossible branch, invalid parity, unsourced nonzero wake term, or forbidden routing event. It is blocked because the retained data needed by the branch-selection residual remain absent.

## Row Verdicts

| Row family | Instance value | Verdict |
| --- | --- | --- |
| Candidate identity | One reduced core candidate $\mathfrak a_{\min}$ is named. | Populated. |
| Scalar partition | $\mathcal R_I^{B_{\min}}=0$ in the reduced certificate. | Conditional pass. |
| Vector partition | $\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0$ in the reduced certificate. | Conditional pass. |
| Transverse bookkeeping | $\mathcal R_{\perp}^{B_{\min}}=\mathbf 0$ in the reduced certificate. | Conditional pass. |
| Root replay | Individual continued active-root rows are not supplied through the full retained chart. | Blocked. |
| Phase lock | Integer phase branches and branch-domain margins are not populated. | Blocked. |
| Torque consistency | The force, torque, wake, and partition row sets are not yet shown to be identical. | Blocked. |
| Causal-wake pullback | The normalized delayed-interior characteristic-tail angular-momentum increment is assumed away or routed, not retained. | Blocked. |
| Stability | Section stability and inactive-root gap margins are not populated. | Blocked. |
| Energy routing | The reduced energy-frequency residual is not paired with a declared route. | Blocked. |
| Non-minimal competitors | No finite family of competing retained generator words has been evaluated. | Blocked. |
| Local exclusion | No row proves contradiction or forbidden routing. | No exclusion. |

The deterministic branch-selection residual is therefore not evaluated:

$$
\mathcal R_{\mathrm{sel}}(\mathfrak a_{\min})
\quad
\text{is blocked, not passing.}
$$

## Use In The Workstream

This instance is useful because it makes the next branch-selection job concrete. The next successful pass must replace

$$
\mathcal A_{N,\min}^{\mathrm{eval}}=\varnothing
$$

with a nonempty finite candidate set whose row-lineage maps, interval payloads, quotient witnesses, and retained wake/routing rows all feed the same residual vector $\mathcal R_{\mathrm{sel}}$. Until then, the minimal four-substep branch remains a reduced diagnostic candidate rather than a selected physical branch.

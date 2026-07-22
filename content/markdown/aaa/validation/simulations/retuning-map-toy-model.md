# Retuning-Map Toy Model

This protocol documents the first arithmetic fixture for the cadence-scale retuning map introduced in [A1 Dynamics](../../noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis). The fixture is not a delayed-dynamics proof. It replays the constrained branch bookkeeping for an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction and reports whether the resulting increment can be treated as a same-branch retuning.

The toy model answers an accounting question before it answers a physics question. If a branch accepts one action-sized transaction, can the cadence, radius, scale, and speed rows be retuned without leaving the declared branch regime? Only after that arithmetic is clean does the harder delayed-dynamics proof become worth asking.

The purpose is narrow: turn the retuning scaffold into a machine-readable packet that outputs $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

## Runtime Artifact

Run the default mock packet with:

```text
node scripts/nested-shell-braid/retuning-map-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/nested-shell-braid/retuning-map-mock.json
```

and emits one result row per scenario. The packet is dimensionless: action increments are in units of $h$, speeds are compared to the declared $c_f$, and radius/cadence changes are reported as logarithmic increments plus reconstructed component changes.

## Replay Equation

On branch chart $q$, the toy state is

$$
\mathbf{y}_q
=
\left(
\ln\nu_1,\ln\nu_2,\ln\nu_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)^T
$$

Given a positive semidefinite retuning-cost matrix $\mathbf{K}^{\mathrm{ret}}_q$, the fixture solves

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h
$$

and the declared linearized branch constraints. The layer-speed diagnostics are then checked through

$$
\Delta\ln s_a
=
\Delta\ln R_a
+
\Delta\ln\nu_a,
\qquad
a\in\{1,2,3\}
$$

The script applies the source-record A1 speed gates:

$$
s_1'>c_f,
\qquad
\left|s_2'-c_f\right|\le\epsilon_2 c_f,
\qquad
s_3'<c_f
$$

The representative Noether braid cadence increment is

$$
\Delta\ln\nu_N
=
w_1\Delta\ln\nu_1
+
w_2\Delta\ln\nu_2
+
w_3\Delta\ln\nu_3,
\qquad
w_1+w_2+w_3=1
$$

For a local rate density $r_\sigma$ of accepted $\sigma$ transactions per braid, the first current estimate is

$$
J_\nu
=
\sum_{\sigma=\pm1}
f_N r_\sigma\Delta\nu_N^{(q,\sigma)}
+
O\!\left((\Delta\nu_N)^2\partial_\nu f_N\right)
$$

## Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `reference_state` | baseline $R_1,R_2,R_3,\lambda,\xi,\nu_N,s_1,s_2,s_3,c_f,\epsilon_2$ |
| `representative_cadence_weights` | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| `compliance_diagonal` | diagonal version of $\mathbf{K}^{\mathrm{ret}}_q$ |
| `action_gradient_h_per_log` | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| `constraints` | linearized branch constraints, each with coefficients and target |
| `f_N` | local Noether braid cadence-state distribution value |
| `partial_nu_f_N` | local slope used only to estimate the higher-order current remainder |
| `transactions` | accepted or control $\sigma$ transactions with wake action increment and local rate density |

This fixture intentionally starts with a diagonal compliance matrix. A later branch packet can replace it with a full matrix once the linearized return map supplies off-diagonal coupling.

## Output Diagnostics

The fixture reports:

| Output field | Meaning |
| --- | --- |
| `status` | `candidate` only when constraints and speed gates pass |
| `delta_y` | solved logarithmic retuning vector |
| `retuning_components` | $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ |
| `constraint_residual_max` | largest absolute residual in the declared linear constraints |
| `speed_gates` | post-retuning checks for the declared binary 1, 2, and 3 speed regimes |
| `J_nu.contribution` | $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$ for the transaction |
| `net_J_nu.value` | sum of transaction contributions in the scenario |
| `net_J_nu.higher_order_estimate` | magnitude estimate for the omitted $O((\Delta\nu_N)^2\partial_\nu f_N)$ term |

## Expected Mock Behavior

The default mock packet has two rows.

| Scenario | Expected behavior |
| --- | --- |
| `same_branch_plus_minus_balance` | Plus and minus one-$h$ retunings both pass the speed gates. Unequal local rates leave a small signed current, `net_J_nu.value` near `0.0017019`. |
| `middle_hinge_violation_control` | The linear action constraint solves, but the middle layer leaves the declared hinge tolerance. The row fails with `middle-hinge-violation`. |

These numbers are fixture expectations only. They validate arithmetic, packet shape, branch-gate reporting, and the current estimate. They do not validate a physical Noether braid branch.

## Failure Reading

The first failure modes are concrete:

| Diagnostic pattern | Meaning |
| --- | --- |
| nonzero `constraint_residual_max` above tolerance | the declared linearized branch constraints are not actually solved |
| `middle-hinge-violation` | compatibility diagnostic: binary 2 leaves the source-record field-speed tolerance |
| `inner-speed-regime-crossing` or `outer-speed-regime-crossing` | the transaction crosses a speed-regime boundary |
| large higher-order current estimate | the continuum current requires smaller steps, narrower bins, or a higher-order transport model |
| candidate branch with missing physical return-map source | the fixture is arithmetic only and must be replaced by a delayed-dynamics branch packet before promotion |

A promotable retuning packet must eventually replace the mock compliance matrix with a return-map-derived $\mathbf{K}^{\mathrm{ret}}_q$, preserve the same causal-root ledger, and keep the speed gates attached to the same branch state that supplies $\Delta\nu_N$.

# Retuning-Map Toy Model

This protocol documents the first arithmetic fixture for the cadence-scale retuning map introduced in [Nested Shell Braid Dynamics](../../noether-braid/explored-braid-geometries.md#cadence-scale-retuning-hypothesis). The fixture is not a delayed-dynamics proof. It replays the constrained branch bookkeeping for an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction and reports whether the resulting increment can be treated as a same-branch retuning.

The toy model answers an accounting question before it answers a physics question. If a branch accepts one action-sized transaction, can the cadence, radius, scale, and speed rows be retuned without leaving the declared branch regime? Only after that arithmetic is clean does the harder delayed-dynamics proof become worth asking.

The purpose is narrow: turn the retuning scaffold into a machine-readable packet that outputs $(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

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
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
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
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}
$$

The script applies the ordinary nested shell braid speed gates:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f
$$

The representative Noether braid cadence increment is

$$
\Delta\ln\nu_N
=
w_I\Delta\ln\nu_I
+
w_M\Delta\ln\nu_M
+
w_O\Delta\ln\nu_O,
\qquad
w_I+w_M+w_O=1
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
| `reference_state` | baseline $R_I,R_M,R_O,\lambda,\xi,\nu_N,s_I,s_M,s_O,c_f,\epsilon_M$ |
| `representative_cadence_weights` | weights $w_I,w_M,w_O$ used to extract $\Delta\nu_N$ |
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
| `retuning_components` | $(\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi)$ |
| `constraint_residual_max` | largest absolute residual in the declared linear constraints |
| `speed_gates` | post-retuning checks for inner, middle, and outer layer speed regimes |
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
| `middle-hinge-violation` | the retuning cannot be treated as a same-regime middle-hinge update |
| `inner-speed-regime-crossing` or `outer-speed-regime-crossing` | the transaction crosses a speed-regime boundary |
| large higher-order current estimate | the continuum current requires smaller steps, narrower bins, or a higher-order transport model |
| candidate branch with missing physical return-map source | the fixture is arithmetic only and must be replaced by a delayed-dynamics branch packet before promotion |

A promotable retuning packet must eventually replace the mock compliance matrix with a return-map-derived $\mathbf{K}^{\mathrm{ret}}_q$, preserve the same causal-root ledger, and keep the speed gates attached to the same branch state that supplies $\Delta\nu_N$.

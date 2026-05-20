# Field-Speed Head-On In-Flight Wake Audit Report

## Scope

This report records the first executable audit of the operator-proposed head-on field-speed seed:

- left Electrino at $x=-1$ with $v=+c_f$;
- right Positrino at $x=+1$ with $v=-c_f$;
- affine inbound prehistory from the countable-infinity idealization.

The audit is analytic. It does not evaluate the dual-mollified force integral and does not authorize a branch chart.

## Executed Command

```bash
node scripts/proof-programs/field-speed-head-on-root-audit.mjs --input reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_inflight_wake_input.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_inflight_wake_result.v0.json --pretty
```

## Result

The scanner returned:

| Field | Value |
| --- | --- |
| `status` | `degenerate_caustic_test_passed_fail_closed` |
| `claim_level` | `analytic root audit for affine field-speed head-on prehistory` |
| `candidate_cycle_authorized` | `false` |
| `branch_chart_authorized` | `false` |
| `updates_live_ledger` | `false` |
| `collision_time` | `1` |
| `partner_root_at_t0` | `no_partner_root_wake_in_flight` |
| `same_source_root_audit.simple_root_jacobian` | `0` |

## Mathematical Meaning

The normalized affine history is
$$
x_L(s)=-1+s,
\qquad
x_R(s)=1-s.
$$
At the audit time $t=0$, the partner wake has not reached the opposite particle. For the right-hand receiver, the left-source causal equation reduces to
$$
2- t-s = t-s,
$$
so the partner equation closes only at $t=1$. At that origin time, all active affine source times co-arrive. This is a caustic, not a regular simple-root branch.

The same-source causal equation is worse for branch-sum purposes. Along either affine field-speed history,
$$
|x_i(t)-x_i(s)|=c_f(t-s)
$$
for every $s<t$, and the simple-root Jacobian is $J=0$. The exact branch-sum law is therefore not a lawful way to compute the initial force.

## Capture Decision

Priority packet plus scoped corpus note. The test case is valuable because it proves that the tempting field-speed inbound seed is a separator-caustic boundary case. It should discipline future candidate generation: exact $v=c_f$ head-on history is not ordinary initial data unless a finite history horizon, shell width $\eta$, core scale $\epsilon_c$, and emission-cadence convention are declared and then converged.

The next executable step is a dual-mollified finite-history run over the same fixture. That run should measure whether the regularized same-source continuum and in-flight partner wake have a stable limit as $H\to\infty$ and $\eta,\epsilon_c\to0$ along a declared schedule.

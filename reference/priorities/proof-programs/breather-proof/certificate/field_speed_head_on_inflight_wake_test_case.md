# Field-Speed Head-On In-Flight Wake Test Case

## Scope

This packet records the normalized head-on test case:
$$
x_L(0)=-1,\qquad v_L(0)=+c_f,
$$
for the left Electrino, and
$$
x_R(0)=+1,\qquad v_R(0)=-c_f,
$$
for the right Positrino. It is a root-audit and future dual-mollified simulation input, not a candidate cycle and not a branch-chart authorization.

The useful point of the test is that the state tries to encode an inbound history from infinity. That intuition is mathematically dangerous unless the in-flight causal wakes are part of the state. The initial positions and velocities alone do not define the delayed system.

## Normalized Affine History

Use normalized units $c_f=1$ and set the audit time to $t=0$. The affine field-speed inbound history is
$$
x_L(s)=-1+s,
\qquad
x_R(s)=1-s,
\qquad
s\le0.
$$
More generally, with $x_0>0$,
$$
x_L(s)=-x_0+c_fs,
\qquad
x_R(s)=x_0-c_fs.
$$

This is the countable-infinity seed only after a discrete emission cadence is declared. In the continuous master-equation law it is an improper history integral. In both readings, the history must be truncated before any numerical run and then tested for convergence as the truncation is pushed deeper into the past.

## Partner Wake Is In Flight At The Audit Time

At a receiver time $t$ before the origin meeting, the right-hand receiver is at $x_R(t)=x_0-c_ft$. A past left-source point is $x_L(s)=-x_0+c_fs$. The partner causal equation is
$$
x_R(t)-x_L(s)
=
c_f(t-s).
$$
Substitution gives
$$
2x_0-c_f(t+s)=c_f(t-s),
$$
so
$$
t=\frac{x_0}{c_f}.
$$
Thus, for every $0\le t<x_0/c_f$, the affine partner equation has no root. At $t=x_0/c_f$, all source times on the affine active history co-arrive at the origin. In the normalized case, the partner caustic occurs at
$$
t=1.
$$

The in-flight interpretation is concrete. At $t=0$, every right-going wake emitted by the left Electrino along the affine field-speed prehistory lies at $x=-1$, not at the right Positrino at $x=+1$. Symmetrically, every left-going wake emitted by the right Positrino lies at $x=+1$. The partner wake has not reached the opposite particle.

## Same-Source Roots Are Degenerate

For the right Positrino on the same affine history,
$$
|x_R(t)-x_R(s)|
=
c_f(t-s)
$$
for every $s<t$. The left Electrino has the same property. Therefore the same-source root set is a continuum, not a finite list of simple roots.

The simple-root Jacobian also vanishes. On the right-hand history, the past source velocity is $-c_f$ and the receiver-to-source direction is negative, so
$$
J=1-\frac{v_R(s)\hat r}{c_f}
=
1-\frac{(-c_f)(-1)}{c_f}
=0.
$$
The branch-sum law is therefore invalid on this test. The only lawful next calculation is the dual-mollified finite-history integral with declared $\eta$, $\epsilon_c$, emission cadence if used, and history horizon $H$.

## Executable Artifacts

Input fixture:

- `field_speed_head_on_inflight_wake_input.v0.json`

Audit command:

```bash
node scripts/proof-programs/field-speed-head-on-root-audit.mjs --input reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_inflight_wake_input.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_inflight_wake_result.v0.json --pretty
```

The audit should return `status=degenerate_caustic_test_passed_fail_closed`, with `candidate_cycle_authorized=false`, `branch_chart_authorized=false`, and `updates_live_ledger=false`.

## Test Consequence

This is a good starting point precisely because it exposes a hard boundary of the proof program. It cannot be treated as ordinary initial data for a simple-root DDE. It is a separator-caustic test whose finite-history regularized version must answer three questions:

1. how the same-source continuum is regularized by $\eta$ and $\epsilon_c$;
2. how the partner in-flight wake enters before the origin caustic;
3. whether the countable or continuous deep-past limit converges before any recapture, origin-crossing, or branch-chart claim is made.

Failure to converge is a result: it would show that exact field-speed inbound history is not a lawful seed for the collinear breather certificate without a prior dephasing, curvature, held-release, or finite-width preparation mechanism.

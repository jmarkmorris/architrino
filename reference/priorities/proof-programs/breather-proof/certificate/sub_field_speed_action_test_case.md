# Sub-Field-Speed Partner-Only Action Test Case

## Scope

This packet adds the sub-field-speed comparison requested after the cosine packet was rejected as a prescribed-path diagnostic. It is a theory packet and executable test specification, not a new acceptance gate for the rejected cosine candidate.

The purpose is to test whether the collinear breather mechanism can close without a true field-speed separator. The test starts from the force law and solves the induced motion on the certified exterior partner chart; it does not prescribe a future path.

## Claim Level

Status: `analytic-baseline-promoted`

Promoted corpus targets:

- `content/markdown/aaa/proof-programs/collinear-breather.md`
- `content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md`

This packet proves two local facts:

1. the held-source release segment has an exact energy test for whether field speed is reached before the moving-source handoff;
2. the exterior affine delayed-partner branch has an exact phase invariant showing that field speed is approached only at the origin-layer limit, not at a finite exterior radius.

It does not prove a full sub-field-speed periodic breather.

## Held-Source Release Segment

If the right-hand coordinate is released from
$$
x(0)=x_0>0,
\qquad
\dot x(0)=0,
$$
after a long held history, then while the active partner emission still samples the held source, the action-generated ODE is
$$
\ddot x(t)
=
-\frac{g}{(x(t)+x_0)^2},
\qquad
g\equiv\kappa\epsilon^2.
$$
The exact energy identity is
$$
\frac{1}{2}\dot x^2-\frac{g}{x+x_0}
=
-\frac{g}{2x_0},
$$
so
$$
|\dot x|^2
=
2g\left(\frac{1}{x+x_0}-\frac{1}{2x_0}\right).
$$
The largest speed available before the origin in this held-source segment occurs at $x=0$:
$$
|\dot x|_{\max}^2=\frac{g}{x_0}.
$$
Therefore this segment reaches field speed before or at the origin only if
$$
c_f^2\le\frac{g}{x_0}.
$$
In normalized comparison units $g=1$ and $c_f=1$, any release from $x_0>1$ remains strictly sub-field-speed throughout the held-source ODE segment. In particular, $x_0=1.25$ does not reach field speed in this action-generated segment.

## Exterior Delayed-Partner Branch

After the partner source samples the moving history, the exterior affine branch uses
$$
x(s)\approx x(t)-v(t-s),
\qquad
v=\dot x(t),
\qquad
x(t)>0.
$$
The partner causal equation gives
$$
\tau_p=t-s=\frac{2x}{c_f+v},
\qquad
r_p=c_f\tau_p,
\qquad
J_p=1+\frac{v}{c_f}.
$$
The simple-root delayed force law becomes
$$
\ddot x
=
-\frac{g}{4x^2}
\left(1+\frac{\dot x}{c_f}\right),
\qquad
-c_f<\dot x<0.
$$
With
$$
\beta\equiv\frac{\dot x}{c_f},
\qquad
\alpha\equiv\frac{g}{4c_f^2},
$$
the exact phase invariant is
$$
\beta-\beta_0
-\ln\!\left(\frac{1+\beta}{1+\beta_0}\right)
=
\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
For a released branch with $\beta_0=0$,
$$
\beta-\ln(1+\beta)
=
\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
Since the left side diverges as $\beta\to-1^+$, no finite exterior radius $x>0$ reaches $\dot x=-c_f$ on this branch.

The explicit velocity branch is
$$
\beta_{\mathrm{in}}(x)
=
-1-\operatorname{W}_0\!\left(-e^{-(S(x)+1)}\right),
$$
where
$$
S(x)
=
\beta_0-\ln(1+\beta_0)
+\alpha\left(\frac{1}{x}-\frac{1}{x_0}\right).
$$
The time parametrization is
$$
t-t_0
=
\int_x^{x_0}\frac{d\xi}{-c_f\,\beta_{\mathrm{in}}(\xi)}.
$$

## Exact Self-Root Exclusion In The Sub-Field Limit

If a stored signed history satisfies
$$
|\dot x(t)|\le c_f-\sigma
$$
for some $\sigma>0$, then for any $s<t$ in that stored interval,
$$
|x(t)-x(s)|
\le
(c_f-\sigma)(t-s)
<
c_f(t-s).
$$
Therefore the exact same-side self-hit equation
$$
|x(t)-x(s)|=c_f(t-s)
$$
has no nontrivial root on that interval. The exact-root sub-field test is partner-only on the self side.

For the dual-mollified finite-width law, same-side self support can only lie in the near-diagonal collar
$$
c_f(t-s)-|x(t)-x(s)|\le\eta,
$$
and the strict speed margin implies
$$
0<t-s\le\frac{\eta}{\sigma}.
$$
Thus the finite-width self effect is a bounded collar contribution, not a simple-root branch. The sub-field-speed test must therefore compare:

1. the exact-root partner-only analytic branch above;
2. the dual-mollified partner branch with the same initial history;
3. the finite-width self-collar correction on $0<t-s\le\eta/\sigma$;
4. the returned-history residual of the resulting action-generated trajectory.

## Test Case Specification

Recommended normalized first run:

| Quantity | Value |
| --- | --- |
| $c_f$ | $1$ |
| $g=\kappa\epsilon^2$ | $1$ |
| $x_0$ | $1.25$ |
| $\dot x(0)$ | $0$ |
| $\eta$ | comparison values $0$, $0.02$ |
| $\epsilon_c$ | comparison value $0.05$ |
| $h$ | at least $2x_0/c_f$ for the held history, then extended to the candidate return window |

Expected analytic result for the held-source segment:
$$
|\dot x|_{\max}=\sqrt{\frac{1}{1.25}}\approx0.8944271909999159<c_f.
$$

Expected exterior delayed-partner result:
$$
\dot x(t)>-c_f
\qquad
\text{for every finite }x(t)>0
$$
on the affine exterior chart.

The full dual-mollified comparison is successful only if the action-generated trajectory remains bounded, returns to the inbound section, and keeps
$$
|\dot x(t)|<c_f
$$
with a strict margin after including the finite-width self-collar. It fails as a sub-field-speed breather if the action-generated trajectory crosses field speed, loses boundedness, fails to return, or requires a self-root branch outside the finite-width collar.

## Theory Consequence

This packet corrects the earlier heuristic interpretation of the cosine packet. A curve can be chosen to cross field speed, but the action-generated delayed partner chart does not force such a crossing at finite exterior radius. The field-speed separator is therefore not an input assumption for the sub-field-speed test. It is an outcome to be derived or ruled out by the master-equation force.

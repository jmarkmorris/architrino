# Octahedral Conditional Clock-Window Diagnostic

Promotion status: `priority-only`.

This packet revises the earlier bounded-speed successor row. The interval $[0.5,1.5]$ was an operator-suggested diagnostic window, not a theory constraint. The algebra below remains useful, but only conditionally: if a future branch declares a finite speed window

$$
\nu_-\le\nu_i(u)\le\nu_+,
$$

then the clock/length row must satisfy a necessary average-speed condition. Failure against one declared diagnostic window is not a speed-unconstrained rejection of the trace carrier.

## Conditional Average-Speed Lemma

Let a receiver speed profile obey

$$
\nu_-\le\nu_i(u)\le\nu_+
\qquad
(0\le u\le H),
$$

and suppose the clock/length row is

$$
\int_0^H\nu_i(u)\,du=L_i.
$$

Integrating the pointwise window gives

$$
\nu_-H
\le
L_i
\le
\nu_+H.
$$

Therefore any branch that declares this window must satisfy

$$
\boxed{
\nu_-
\le
\frac{L_i}{H}
\le
\nu_+.
}
$$

For the uniform trace-scaled octahedral carrier at fixed period,

$$
Y_i^s(\theta)=sY_i(\theta),
\qquad
H=2\pi,
\qquad
L_i(s)=2\pi s.
$$

The declared-window necessary condition reduces to

$$
\boxed{
\nu_-\le s\le\nu_+.
}
$$

At the coarse trace cancellation from [octahedral-diagonal-affine-zero-mean-solver](octahedral-diagonal-affine-zero-mean-solver.md),

$$
s_*\approx1.694464950788.
$$

For the diagnostic window $[\nu_-,\nu_+]=[0.5,1.5]$, the conditional upper-window margin is

$$
\boxed{
s_*-\nu_+
\approx
0.194464950788.
}
$$

This proves only

$$
\boxed{
\texttt{declared-speed-window-clock-diagnostic-failed}.
}
$$

It does not prove that all speed-unconstrained or period-rescaled trace carriers fail.

## Conditional Primitive Row

The physical unit-tangent speed primitive is

$$
A_i^s(u)
=
\Gamma
\int_0^u
\widehat T_i^s(\phi)\cdot F_i^s(\phi)\,d\phi,
\qquad
\nu_i(u)=\nu_{i,0}+A_i^s(u).
$$

At the same $37/240$ coarse trace point, the executable row gives

$$
A_{\min}\approx-0.933522195356,
\qquad
A_{\max}\approx0.108141863302,
$$

so

$$
A_{\max}-A_{\min}
\approx
1.041664058657.
$$

Against the same declared diagnostic window, the initial-speed interval is

$$
[
\nu_- - A_{\min},
\nu_+ - A_{\max}
]
\approx
[
1.433522195356,
1.391858136698
],
$$

with negative width

$$
\boxed{
\Delta\nu_0
\approx
-0.041664058657.
}
$$

Again, this is a conditional declared-window failure, not an imposed theory constraint.

## Period-Rescaled Follow-On

The speed-window diagnostic motivated the natural speed-unconstrained follow-on: allow

$$
Y_i(u)=s\,p_i(u/h),
\qquad
v=\frac{s}{h},
$$

and recompute the causal roots and speed-ODE mean directly. That follow-on begins in [octahedral-period-rescaled-trace-scan](octahedral-period-rescaled-trace-scan.md), is sharpened by [octahedral-period-rescaled-fold-chart](octahedral-period-rescaled-fold-chart.md), reaches the sampled all-root successor in [octahedral-fold-aware-multiroot-period-integral](octahedral-fold-aware-multiroot-period-integral.md), and is narrowed to a sign-certified zero bracket in [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md).

Its exact fixed-ledger scale law is

$$
\boxed{
\mathcal M_i^\nu(s,h)
=
\frac{1}{h}C_i(v)
=
\frac{v}{s}C_i(v).
}
$$

The follow-on does not impose a speed window. Its current strongest status is:

$$
\boxed{
\texttt{sign-certified-fold-aware-multiroot-period-integral-zero-bracket}.
}
$$

Thus the trace route is now disciplined by sampled simple-root positivity, analytic root-fold detection, and a sign-certified fold-aware multi-root zero bracket, not by the earlier diagnostic $[0.5,1.5]$ window.

## Live Successor Equation

If a future retained branch introduces live bounded-speed variables, the zero-mean functional must be assembled on one common causal-time ledger:

$$
\boxed{
\mathcal M_i^\nu(z)
=
\int_0^{H_*}
T_i(u;z)\cdot F_i^\nu(u;z)\,du.
}
$$

The scalar speed ODE can proceed only when

$$
\boxed{
\mathcal M_i^\nu(z)=0
\qquad
\text{for every receiver }i.
}
$$

For declared correction directions $v_\ell$, the same-ledger derivative matrix is

$$
\boxed{
B_{i\ell}
=
D_{v_\ell}\mathcal M_i^\nu(z_0).
}
$$

The first-order live successor equation is

$$
\boxed{
B\alpha=-\mathcal M^\nu(z_0),
\qquad
-\mathcal M^\nu(z_0)\in\operatorname{Range}B.
}
$$

This equation remains valid. What changed is the claim level: it is not justified by a fixed diagnostic speed window; it is justified only when a live branch chart declares speed variables and one ledger on which $B$ is actually computed.

## Executable Diagnostic

The executable diagnostic [octahedral-bounded-speed-successor-closure-row.mjs](../../../../scripts/neutral-braid/octahedral-bounded-speed-successor-closure-row.mjs) emits:

- the source trace candidate row;
- the conditional clock-window necessary condition;
- the conditional primitive interval row;
- the live bounded-speed range equation;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-bounded-speed-successor-closure-row.test.js](../../../../tests/neutral-braid-octahedral-bounded-speed-successor-closure-row.test.js) verifies the conditional diagnostic failure, non-retention fields, CLI validation, and claim-level guards.

## Retention Verdict

This packet must keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false}.
$$

The safe status is

$$
\boxed{
\texttt{declared-speed-window-clock-diagnostic-failed}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It records a valid conditional lemma and removes the mistaken interpretation that the diagnostic speed window is part of the theory. It should not be promoted into reader-facing AAA prose until a retained branch declares its speed variables and speed window, or until a speed-unconstrained trace result is interval-certified on a fixed root ledger.

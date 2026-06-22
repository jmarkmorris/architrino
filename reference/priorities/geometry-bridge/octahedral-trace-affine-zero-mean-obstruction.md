# Octahedral Trace-Affine Partner Row Certificate

Promotion status: `priority-only`.

This packet consumes [octahedral-affine-force-mean-derivative](octahedral-affine-force-mean-derivative.md). It was originally opened to test whether the finite trace-scaled carrier obstructs the first-order trace direction. The corrected conclusion is narrower and more useful: the antipodal partner subrow stays positive for every positive trace scale, but that subrow alone does not decide the total trace-scaled force mean because the cross-binary causal-root rows also move.

The total trace-scaled row is now solved in [octahedral-diagonal-affine-zero-mean-solver](octahedral-diagonal-affine-zero-mean-solver.md). This packet remains as the analytic partner-row certificate that explains why the finite zero-mean candidate is nontrivial: it must be supplied by the moving cross-binary rows, not by making the antipodal partner row vanish.

## Partner Root Under Uniform Trace Scaling

Let

$$
Y_s=sY,
\qquad
T_s=sT,
\qquad
s>0.
$$

For an antipodal partner pair on the same circular carrier, the deformed causal-root equation is

$$
\boxed{
G_s(y)
=
2s\cos\frac{y}{2}-y
=0.
}
$$

For every $s>0$,

$$
G_s(0)=2s>0,
\qquad
G_s(\pi)=-\pi<0,
$$

and

$$
\frac{dG_s}{dy}
=
-1-s\sin\frac{y}{2}<0
\qquad
(0<y<\pi).
$$

Thus there is a unique partner root

$$
y_s\in(0,\pi).
$$

The partner Jacobian is

$$
\boxed{
J_s
=
1+s\sin\frac{y_s}{2}
>0.
}
$$

The antipodal partner tangential mean under the same diagnostic force convention is

$$
\boxed{
m_{\mathrm{partner}}(s)
=
\frac{s^2\sin y_s}
{y_s^3\left(1+s\sin(y_s/2)\right)}.
}
$$

Because $0<y_s<\pi$, $\sin y_s>0$, and $J_s>0$, this proves

$$
\boxed{
m_{\mathrm{partner}}(s)>0
\qquad
\text{for every }s>0.
}
$$

This is not a no-go theorem for the total trace row. It proves only that a finite trace-scaled zero mean, if present, must arise from the cross-binary rows outweighing the positive partner row on the same sampled root ledger.

## Diagnostic Values

At $s=1$, the formula reproduces the fixed-speed positive partner mean:

$$
y_1\approx1.478170266430,
\qquad
J_1\approx1.673612029183,
$$

$$
m_{\mathrm{partner}}(1)
\approx0.184206996347,
\qquad
2\pi m_{\mathrm{partner}}(1)
\approx1.157406692930.
$$

The linear trace solve from the affine derivative predicts a zero at

$$
s_{\mathrm{lin}}
=
1+\alpha_{\mathrm{trace}}
\approx
4.24679501458.
$$

The partner row at that scale is still positive:

$$
y_{s_{\mathrm{lin}}}
\approx
2.535348495233,
\qquad
J_{s_{\mathrm{lin}}}
\approx
5.053180220246,
$$

$$
m_{\mathrm{partner}}(s_{\mathrm{lin}})
\approx
0.124783108441,
\qquad
2\pi m_{\mathrm{partner}}(s_{\mathrm{lin}})
\approx
0.784035393542.
$$

The limiting values also stay positive:

$$
\lim_{s\to0^+}m_{\mathrm{partner}}(s)=\frac14,
\qquad
\lim_{s\to\infty}m_{\mathrm{partner}}(s)=\frac1{\pi^2}.
$$

## Corrected Theory Consequence

The corrected status is

$$
\boxed{
\texttt{trace-affine-partner-row-positive-total-row-open}.
}
$$

This packet does not obstruct trace-only zero mean. It identifies the burden of any finite trace candidate: the cross-binary causal-root rows must become negative enough to cancel the positive partner subrow while maintaining a one-root ledger and a nonzero sampled Jacobian floor.

The finite total-row attempt is now classified by [octahedral-diagonal-affine-zero-mean-solver](octahedral-diagonal-affine-zero-mean-solver.md). The uniform trace subfamily reaches a coarse sampled six-row cancellation at

$$
s\approx1.694464950788.
$$

That cancellation is resolution-unstable under fixed-candidate reruns, so this partner certificate should not be read as supporting a retained trace-zero branch.

## Executable Diagnostic

The executable diagnostic [octahedral-trace-affine-zero-mean-obstruction.mjs](../../../scripts/neutral-swarm/octahedral-trace-affine-zero-mean-obstruction.mjs) emits:

- the analytic partner-root uniqueness and positivity certificate;
- the unit-scale partner-row check;
- the partner value at the linear trace-predicted zero scale;
- a positive-scale partner sample table;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-trace-affine-zero-mean-obstruction.test.js](../../../tests/neutral-swarm-octahedral-trace-affine-zero-mean-obstruction.test.js) verifies the partner root interval, positivity, the fixed-speed partner mean reproduction, the positive partner value at $s_{\mathrm{lin}}$, CLI validation, and the claim-level guard

$$
\texttt{retention=not\_retained}.
$$

## Retention Verdict

This packet keeps

$$
\boxed{
\texttt{retention=not\_retained}.
}
$$

It is a partner-row analytic certificate only. It does not certify the total trace row, bounded-speed live ledger, action row, event row, stability row, Noether row, observer export, or retained branch status.

## Promotion Decision

This packet remains `priority-only`. Its corrected content is useful supporting mathematics for the trace/diagonal zero-mean route, but it is not reader-facing emergent geometry because the branch is not retained and the total zero-mean attempt is resolution-unstable rather than interval-certified.

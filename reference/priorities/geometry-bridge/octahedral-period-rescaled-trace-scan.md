# Octahedral Period-Rescaled Trace Scan

Promotion status: `priority-only`.

This packet revises the period-rescaled trace route without imposing the earlier diagnostic speed window. The interval $[0.5,1.5]$ is not treated as a theory constraint here. The scan is instead a one-parameter trace-carrier diagnostic over positive speed ratios

$$
Y_i(u)=s\,p_i(\theta),
\qquad
\theta=\frac{u}{h},
\qquad
H=2\pi h,
\qquad
v=\frac{s}{h}.
$$

The finite trace candidate from [octahedral-diagonal-affine-zero-mean-solver](octahedral-diagonal-affine-zero-mean-solver.md) remains `not_retained` because its sampled zero is resolution-unstable. This packet asks a different question: can uniform period rescaling alone produce a zero speed-ODE mean on a fixed simple-root trace ledger?

## Fixed Simple-Root Reduction

For receiver $i$ and source $j$, the physical causal delay $y$ satisfies

$$
\boxed{
s
\left\|
p_i(\theta)-p_j\left(\theta-\frac{y}{h}\right)
\right\|
-y=0.
}
$$

Setting

$$
\delta=\frac{y}{h}
$$

gives the exact reduced equation

$$
\boxed{
v
\left\|
p_i(\theta)-p_j(\theta-\delta)
\right\|
-\delta=0,
\qquad
v=\frac{s}{h}.
}
$$

On any fixed simple-root sheet, the Jacobian is

$$
\boxed{
J_{ij}^{(v)}
=
1
-v\,p_j'(\theta-\delta_{ij})
\cdot
\widehat R_{ij}.
}
$$

The physical unit-tangent speed-ODE mean has the scale law

$$
\boxed{
\mathcal M_i^\nu(s,h)
=
\frac{1}{h}C_i(v)
=
\frac{v}{s}C_i(v).
}
$$

Therefore changing $s$ and $h$ at fixed $v$ cannot change the sign of the mean. A uniform period-rescaled trace zero requires either

$$
C_i(v)=0
$$

on the same simple-root sheet, or a controlled transition to a different root ledger. Partial sums after root-ledger failure are diagnostic only.

## Principal Partner Row

For the antipodal partner principal root, $\delta_v\in(0,\pi)$ is the unique solution of

$$
\boxed{
2v\cos\left(\frac{\delta_v}{2}\right)-\delta_v=0.
}
$$

The corresponding Jacobian factor is

$$
1+v\sin(\delta_v/2)>0,
$$

and the principal-partner period contribution is

$$
\boxed{
P(v;s)
=
\frac{
2\pi v\sin(\delta_v/2)
}{
s\,\delta_v^2
\left(1+v\sin(\delta_v/2)\right)
}
>0.
}
$$

Equivalently,

$$
P(v;h)
=
\frac{
2\pi\sin(\delta_v/2)
}{
h\,\delta_v^2
\left(1+v\sin(\delta_v/2)\right)
}.
$$

This is an analytic principal-partner subrow. It is not a proof of the full all-pairs mean after additional roots enter.

## Sampled Simple-Root Rows

The executable scan fixes the representative scale $s=1$ and samples positive $v=s/h$. Since $\mathcal M_i^\nu=(v/s)C_i(v)$, the sign of the sampled row is a sign test for the uniform trace family at that speed ratio.

| Speed ratio $v$ | Period ratio $h$ | Receiver mean $\min_i\mathcal M_i^\nu$ | Cross-binary residue max | Minimum $|J|$ | Status |
| --- | ---: | ---: | ---: | ---: | --- |
| $0.01$ | $100$ | $1.570691625040$ | $2.01\times10^{-10}$ | $0.992410963663$ | simple-root positive |
| $0.02$ | $50$ | $1.570377732394$ | $\le2\times10^{-12}$ | $0.984887427408$ | simple-root positive |
| $0.05$ | $20$ | $1.568189406976$ | $\le4\times10^{-12}$ | $0.962711431959$ | simple-root positive |
| $0.1$ | $10$ | $1.560499069620$ | $\le4\times10^{-12}$ | $0.927178133455$ | simple-root positive |
| $0.2$ | $5$ | $1.531556933994$ | $0$ | $0.862091916690$ | simple-root positive |
| $0.5$ | $2$ | $1.384962758677$ | $\le10^{-12}$ | $0.727434793332$ | simple-root positive |
| $1.0$ | $1$ | $1.157406692930$ | $0$ | $0.728516800007$ | simple-root positive |
| $1.5$ | $0.666666666667$ | $1.019301800324$ | $0.000001697769$ | $0.278701788202$ | simple-root positive |
| $1.6$ | $0.625$ | $1.001840524025$ | $0.002595224175$ | $0.148514806022$ | simple-root positive |
| $1.65$ | $0.606060606061$ | $0.949311172737$ | $0.040613343447$ | $0.082177715998$ | simple-root positive |
| $1.7$ | $0.588235294118$ | $0.789308084676$ | $0.191727821015$ | $0.086266782362$ | simple-root positive |

The sampled simple-root rows are all positive. The best sampled simple-root row is

$$
\boxed{
v=1.7,
\qquad
\min_i\mathcal M_i^\nu
\approx
0.789308084676.
}
$$

The safe sampled all-pairs claim is therefore

$$
\boxed{
\texttt{sampled-all-pairs-positive-on-tested-simple-root-speeds}.
}
$$

This is not an interval theorem in $v$, not a global period-rescaled trace rejection, and not retained branch status.

## Root-Ledger Boundary

At larger sampled speed ratios, the current one-root ledger fails before a retained zero-mean row appears. The first sampled failure is

$$
\boxed{
v=1.75,
\qquad
\text{first failure: receiver }1+\leftarrow 2+,
\qquad
\#\text{roots}=3.
}
$$

In general, when

$$
\#\left\{
\delta>0:
v\|p_i(\theta)-p_j(\theta-\delta)\|-\delta=0
\right\}
\ne1,
$$

or a Jacobian margin vanishes, the current all-pairs functional $C_i(v)$ is no longer certified on the same simple-root ledger. Partial sums after failed root rows do not prove positivity, do not prove a zero, and do not define a retained multi-root branch.

The successor packet [octahedral-period-rescaled-fold-chart](octahedral-period-rescaled-fold-chart.md) sharpens this sampled boundary. For the first failing cross-binary class it derives

$$
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0,
$$

with

$$
F_\delta
=
\frac{2\delta}{v^2}J.
$$

The $\kappa=+1$ continuum saddle-node onset occurs at

$$
\boxed{
v_c\approx1.704939069887.
}
$$

Thus the $v=1.75$ row is a sampled witness of a real root-fold boundary, not the analytic first onset itself.

The packet status is therefore

$$
\boxed{
\texttt{sampled-simple-root-trace-positive-root-ledger-boundary-detected}.
}
$$

## Consequence

The speed-unconstrained trace-period route is not closed by a chosen speed cap. It is narrowed by two intrinsic facts:

1. On sampled simple-root rows, uniform period rescaling keeps the all-pairs speed-ODE mean positive.
2. Past the sampled simple-root region, the one-root trace ledger itself fails, so a different multi-root branch chart would be required before any zero-mean claim could be meaningful.

Thus the next valid branch-retention attempt is not another fixed-window speed argument. The direct successor chain is [octahedral-period-rescaled-fold-chart](octahedral-period-rescaled-fold-chart.md), followed by [octahedral-fold-aware-multiroot-period-integral](octahedral-fold-aware-multiroot-period-integral.md) and [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md). The certificate upgrades the fold-aware zero bracket to a sign/regularity row, but it still needs a clock row, action/Noether row, event stability row, and observer-export row before it can become retained.

## Executable Diagnostic

The executable diagnostic [octahedral-period-rescaled-trace-scan.mjs](../../../scripts/neutral-swarm/octahedral-period-rescaled-trace-scan.mjs) emits:

- the speed-unconstrained period-rescaled root equation;
- the exact scale law $\mathcal M_i^\nu(s,h)=(1/h)C_i(v)$;
- the analytic principal-partner positivity row;
- sampled all-pairs period integrals on tested simple-root rows;
- the first sampled root-ledger failure row;
- the non-retention verdict.

The successor executables [octahedral-period-rescaled-fold-chart.mjs](../../../scripts/neutral-swarm/octahedral-period-rescaled-fold-chart.mjs), [octahedral-fold-aware-multiroot-period-integral.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-multiroot-period-integral.mjs), and [octahedral-fold-aware-zero-bracket-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-zero-bracket-certificate.mjs) own the analytic fold-onset refinement, sampled fold-aware zero bracket, and sign-certified zero bracket.

The companion test [neutral-swarm-octahedral-period-rescaled-trace-scan.test.js](../../../tests/neutral-swarm-octahedral-period-rescaled-trace-scan.test.js) verifies simple-root positivity, root-ledger boundary detection, the analytic partner row, the fixed-$v$ scale law, CLI validation, and claim-level guards.

## Retention Verdict

This packet must keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false}.
$$

The current safe status is

$$
\boxed{
\texttt{sampled-simple-root-trace-positive-root-ledger-boundary-detected}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it removes the imposed speed-window assumption, preserves the exact scale law, proves the principal-partner positivity row, and identifies the sampled root-ledger boundary. The successor chain now reaches a sign-certified fold-aware zero bracket, but this packet should not be promoted into reader-facing AAA prose until there is either an interval-certified simple-root result or a retained multi-root / live bounded-speed successor branch.

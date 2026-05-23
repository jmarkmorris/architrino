# Octahedral Fold-Aware Zero Bracket Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-multiroot-period-integral](octahedral-fold-aware-multiroot-period-integral.md). The predecessor reduced the symmetric fold-aware period mean to the antipodal-partner all-root sum and found a sampled zero near

$$
v_0\approx3.021564740248.
$$

This successor upgrades that row from a sampled bracket to a sign/regularity certificate on a narrow positive speed-ratio bracket. It does not impose the earlier $[0.5,1.5]$ diagnostic window. The speed ratio $v=s/h$ remains a positive trace-period parameter, not an admissibility band.

## Partner Root Coordinate

Set

$$
x=\frac{\delta}{2}.
$$

The antipodal-partner equation

$$
2v\left|\cos\frac{\delta}{2}\right|-\delta=0
$$

becomes two scalar sheet equations:

$$
\boxed{
x-v\cos x=0,
\qquad
x\in(0,\pi/2),
}
$$

and

$$
\boxed{
x+v\cos x=0,
\qquad
x\in(\pi/2,v),
\qquad
v<\pi.
}
$$

The positive-cosine sheet has one root because $x-v\cos x$ is strictly increasing on $(0,\pi/2)$. The negative-cosine sheet has a saddle-node at the minimum of $x+v\cos x$. Its fold condition is

$$
1-v\sin x=0,
\qquad
x+v\cos x=0,
$$

or

$$
\boxed{
x+\cot x=0,
\qquad
x\in(\pi/2,\pi).
}
$$

Numerically,

$$
x_{\mathrm{fold}}\approx2.798386045784,
\qquad
v_{\mathrm{fold}}=\frac{1}{\sin x_{\mathrm{fold}}}\approx2.971693870714.
$$

The certified bracket is

$$
\boxed{
3.02156\le v\le3.02157.
}
$$

It lies strictly above the secondary partner fold and below $\pi$:

$$
3.02156-v_{\mathrm{fold}}\approx0.049866129286,
\qquad
\pi-3.02157\approx0.120022653590.
$$

Therefore the antipodal partner has exactly three positive causal roots throughout the bracket: one positive-cosine root and two negative-cosine roots.

## Reduced Contribution Formula

For a partner root $x_\alpha=\delta_\alpha/2$, the root equation eliminates $v$ and gives the contribution

$$
\boxed{
P_\alpha
=
\frac{\pi\tan x_\alpha}
{2x_\alpha\left|1+x_\alpha\tan x_\alpha\right|}.
}
$$

The Jacobian in this coordinate is

$$
\boxed{
J_\alpha=1+x_\alpha\tan x_\alpha.
}
$$

The reduced fold-aware period mean is

$$
\boxed{
P_{\mathrm{all}}(v)=\sum_{\alpha=1}^{3}P_\alpha(v).
}
$$

The same sheet equations give the root-speed derivative

$$
\boxed{
\frac{dx_\alpha}{dv}
=
\frac{q_\alpha\cos x_\alpha}{J_\alpha}.
}
$$

Differentiating the reduced contribution formula therefore gives a direct transversality row for $dP_{\mathrm{all}}/dv$ on the regular three-root sheet.

This formula is used only after the predecessor's full-period cross-binary cancellation in the $\phi=2\tilde\theta-\delta$ coarea chart. The cancellation is a symmetric full-period statement; it is not a truncated-window or dropped-root rule.

## Sign Certificate

At the left endpoint,

$$
\begin{aligned}
P_{\mathrm{all}}(3.02156)
&\approx
-0.000034142221,\\
|J|_{\min}
&\approx
0.504350904958.
\end{aligned}
$$

At the right endpoint,

$$
\begin{aligned}
P_{\mathrm{all}}(3.02157)
&\approx
0.000037877962,\\
|J|_{\min}
&\approx
0.504400940758.
\end{aligned}
$$

The endpoint signs differ while the root count remains three and the endpoint Jacobians stay away from zero. Continuity on this regular sheet gives

$$
\boxed{
\exists v_0\in[3.02156,3.02157]
\quad\text{such that}\quad
P_{\mathrm{all}}(v_0)=0.
}
$$

The bisection estimate is

$$
\boxed{
v_0\approx3.021564740248.
}
$$

At this estimate,

$$
\delta_1\approx2.344688042275,
\qquad
\delta_2\approx5.240881784882,
\qquad
\delta_3\approx5.968461395446,
$$

and

$$
J_1\approx3.784863187953,
\qquad
J_2\approx-0.504374623800,
\qquad
J_3\approx0.526480599893.
$$

The resulting status is

$$
\boxed{
\texttt{sign-certified-fold-aware-multiroot-period-integral-zero-bracket}.
}
$$

The same root rows give

$$
\boxed{
\frac{dP_{\mathrm{all}}}{dv}(v_0)
\approx
7.202077954503>0.
}
$$

Thus the zero is simple on the reduced three-root sheet:

$$
\boxed{
\texttt{simple-zero-transversality-certified}.
}
$$

## Clock-Scale Gauge Lemma

The predecessor period-rescaled trace scan gives the exact scale law

$$
\boxed{
\mathcal M_i^\nu(s,h)
=
\frac{1}{h}C_i\!\left(\frac{s}{h}\right).
}
$$

Therefore the sign-certified zero is not a single absolute clock period. It is the projective ray

$$
\boxed{
s=v_0h,
\qquad
h>0.
}
$$

Along that ray,

$$
\mathcal M_i^\nu(v_0h,h)=0
$$

for the reduced symmetric fold-aware period row. This closes the scale-gauge status of the zero:

$$
\boxed{
\texttt{projective-zero-ray-certified-clock-normalization-open}.
}
$$

The result is mathematically stronger than a sampled scalar zero because it identifies the remaining clock freedom. It also explains why this packet cannot certify an absolute clock row: the trace-period zero fixes $v=s/h$, not $s$ and $h$ separately.

## Claim Boundary

This packet certifies a period-integral zero bracket for the reduced fold-aware trace route. It is not an outward-rounded interval theorem for every coarea chart endpoint and it is not a retained branch. The remaining blockers are:

- a chart-partition or interval-domain certificate for the cross-binary coarea conditioning factor $A_{\kappa,v}$ if the cancellation is reused outside the symmetric full-period row;
- a clock row;
- an action/Noether row;
- an event stability row;
- a bounded-speed live ledger if speed variables are declared;
- an observer-export row.

The packet must therefore keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false}.
$$

It closes only the zero-bracket existence, simple-zero transversality, and projective zero-ray steps:

$$
\texttt{certifies\_fold\_aware\_multiroot\_zero\_bracket=true},
\qquad
\texttt{certifies\_simple\_zero\_transversality=true},
\qquad
\texttt{certifies\_projective\_zero\_ray=true}.
$$

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-zero-bracket-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-zero-bracket-certificate.mjs) emits:

- the source fold-aware integral validation status;
- the partner root-count certificate in the $x=\delta/2$ coordinate;
- the endpoint sign certificate;
- the simple-zero transversality row;
- the projective zero-ray clock-scale gauge row;
- the zero-speed-ratio enclosure and bisection estimate;
- the non-retention verdict.

The companion test [neutral-swarm-octahedral-fold-aware-zero-bracket-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-zero-bracket-certificate.test.js) verifies source validation, absence of a speed-window assumption, three-root regularity, endpoint sign change, the zero estimate, CLI validation, and non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It is a stronger mathematical result than the sampled bracket because it supplies a concrete existence argument on a regular three-root sheet. It should not be promoted into reader-facing AAA prose as a retained branch until clock, action/Noether, event stability, live-speed if declared, and observer-export rows are certified on one branch chart.

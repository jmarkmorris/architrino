# Octahedral Fold-Aware Cross-Binary Source Atlas Quarter-Cell Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-source-atlas](octahedral-fold-aware-cross-binary-source-atlas.md). The predecessor identifies four cross-binary source rows, proves the two source-pair transports, and reduces them to two canonical $\kappa$ source classes. This packet uses that atlas to fix the exact quarter-cell topology and the source-atlas-aware formula targets for the remaining $C$, $m_Q$, and $M_Q$ interval proof.

It is a formula and quarter-cell reduction, not a coarea interval certificate. It does not certify the retained branch.

## Source-Atlas Formula

Let

$$
Q=\frac{H}{4}=\frac{\pi}{2},
\qquad
v_*\approx3.021564740248.
$$

For each canonical cross-binary source class,

$$
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0,
$$

and

$$
F_\delta
=
\frac{2\delta}{v^2}
-\cos(2\tilde\theta-\delta)
+\kappa\cos\delta
=
\frac{2\delta}{v^2}J.
$$

With

$$
\phi=2\tilde\theta-\delta,
$$

define the scalar source-row kernel

$$
B_\kappa(\phi,\delta)
=
-\frac12(\cos\phi+\kappa\cos\delta).
$$

For force sign $\sigma$, the canonical source scalar is

$$
s_{\kappa,\sigma}(\tilde\theta;v)
=
\sum_{\delta\in\mathcal R_{\kappa,v}^+(\tilde\theta)}
\frac{
2\sigma B_\kappa(2\tilde\theta-\delta,\delta)
}{
v\delta^2
\left|F_\delta(\tilde\theta,\delta)\right|
}.
$$

The representative quarter forcing is therefore reduced to

$$
\boxed{
f_\times(u)
=
s_{+,+}(u)
-s_{+,+}(u+Q)
+s_{-,+}(u)
-s_{-,+}(u+Q),
\qquad
0\le u<Q.
}
$$

The remaining profile quantities are exactly

$$
\boxed{
C_\times=\int_0^Q f_\times(q)\,dq,
\qquad
A(u)=\int_0^u f_\times(q)\,dq,
}
$$

and

$$
\boxed{
m_Q=\min_{0\le u\le Q}A(u),
\qquad
M_Q=\max_{0\le u\le Q}A(u).
}
$$

This packet certifies these as the source-atlas-aware interval targets. It does not enclose them.

## Fold Endpoint Equation

The fold endpoint equation used by the atlas is

$$
E_{\kappa,v}(\delta)
=
\left(\frac{2\delta}{v^2}+\kappa\cos\delta\right)^2
+
\left(2-\frac{\delta^2}{v^2}-\kappa\sin\delta\right)^2
-1.
$$

At $v_*$, the $\kappa=+1$ endpoints project to

$$
\theta_{3-}
\approx
0.997370655243,
\qquad
\theta_{2+}
\approx
1.159039827771,
$$

on the representative quarter domain, while the $\kappa=-1$ class has no fold endpoints.

Thus the certified ordering is

$$
\boxed{
0<\theta_{3-}<\theta_{2+}<Q.
}
$$

## Unified Quarter Cells

The four labeled source rows combine into three regular open quarter cells plus two fold endpoint rows:

| Cell | $\theta$ interval | $2+$ roots | $2-$ roots | $3+$ roots | $3-$ roots | cross roots |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| $I_1$ | $[0,\theta_{3-})$ | $1$ | $1$ | $1$ | $3$ | $6$ |
| $I_2$ | $(\theta_{3-},\theta_{2+})$ | $1$ | $1$ | $1$ | $1$ | $4$ |
| $I_3$ | $(\theta_{2+},Q)$ | $3$ | $1$ | $1$ | $1$ | $6$ |

The fold endpoint rows are:

| Endpoint | Source row | Transition |
| --- | --- | --- |
| $\theta_{3-}$ | $3-$ | three-root to one-root |
| $\theta_{2+}$ | $2+$ | one-root to three-root |

Consequently the next interval profile has the fixed decomposition

$$
\boxed{
C_\times
=
\sum_{r=1}^3
\int_{I_r} f_\times(\theta)\,d\theta,
}
$$

with $m_Q$ and $M_Q$ enclosed on the same three open cells plus the two fold endpoint limits.

The direct successor [octahedral-fold-aware-cross-binary-primitive-critical-atlas](octahedral-fold-aware-cross-binary-primitive-critical-atlas.md) consumes this partition and reduces the primitive-extrema search to the sampled candidate set

$$
\left\{
0,\ 
0.129625153956,\ 
\theta_{3-},\ 
1.133431464570,\ 
\theta_{2+},\ 
Q
\right\},
$$

while preserving that interval critical exhaustion and the interval values of $C_\times$, $m_Q$, and $M_Q$ remain open.

## Sampled Reference Payload

The predecessor sampled quarter profile remains only a reference payload. It records

$$
C_{\times,\mathrm{samp}}
\approx
-0.253586748150,
$$

$$
m_{Q,\mathrm{samp}}
\approx
-0.253586748150,
\qquad
M_{Q,\mathrm{samp}}
\approx
0.002551918775,
$$

and

$$
D_{\times,\mathrm{samp}}
\approx
0.129345292849.
$$

The sampled centered clock interval is

$$
2.892219447399
\lesssim
\nu^{\mathrm{clk}}
\lesssim
3.150910033097.
$$

These sampled values are not interval enclosures.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.mjs) emits:

- predecessor validation for the source atlas and sampled quarter-profile packet;
- no-fixed-speed-window reduction parameters;
- the source-atlas-aware formula for $f_\times$, $C_\times$, $m_Q$, and $M_Q$;
- the fold ordering $0<\theta_{3-}<\theta_{2+}<H/4$;
- three unified quarter cells with cross-root counts $[6,4,6]$;
- midpoint checks for the source-specific root counts;
- sampled reference payload values;
- non-retention and non-interval boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.test.js) verifies predecessor validation, speed-window removal, fold ordering, formula targets, the three-cell partition, midpoint root-count checks, sampled payload preservation, CLI emission, JSON validation, and non-retention claims.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_source\_atlas\_aware\_quarter\_profile\_formula\_reduction=true},
$$

$$
\texttt{certifies\_source\_atlas\_aware\_C\_m\_Q\_M\_Q\_targets=true},
$$

and

$$
\texttt{certifies\_source\_atlas\_quarter\_cell\_reduction=true}.
$$

It does not certify:

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-cross-binary-quarter-profile-formula-quarter-cell-reduction-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it fixes the source-atlas-aware formula and the exact three-cell topology for the remaining quarter-profile proof. Its direct successor adds the sampled primitive-critical atlas. Neither packet should be promoted into reader-facing AAA prose until the same cell partition and critical atlas are upgraded into interval critical exhaustion and interval enclosures for $C_\times$, $m_Q$, and $M_Q$.

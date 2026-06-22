# Octahedral Period-Rescaled Fold Chart

Promotion status: `priority-only`.

This packet is the direct successor to [octahedral-period-rescaled-trace-scan](octahedral-period-rescaled-trace-scan.md). It keeps the correction that the earlier $[0.5,1.5]$ speed window is not a theory constraint, and it sharpens the sampled root-ledger boundary into an analytic fold chart for the cross-binary causal roots.

The trace-period ansatz remains

$$
Y_i(u)=s\,p_i(\theta),
\qquad
\theta=\frac{u}{h},
\qquad
v=\frac{s}{h}.
$$

For a cross-binary row, the period-rescaled phase delay $\delta=y/h$ satisfies

$$
\boxed{
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0,
}
$$

where $\kappa\in\{+1,-1\}$ is the existing cross-binary class. This is the rigid octahedral cross-binary certificate with the replacement $y^2\mapsto\delta^2/v^2$.

## First Failing Row

For the sampled first failing row $1+\leftarrow2+$,

$$
p_{1+}(\theta)=(\cos\theta,\sin\theta,0),
\qquad
p_{2+}(\theta-\delta)=(0,\cos(\theta-\delta),\sin(\theta-\delta)),
$$

so

$$
\|p_{1+}(\theta)-p_{2+}(\theta-\delta)\|^2
=
2-\sin(2\theta-\delta)-\sin\delta.
$$

The reduced row is

$$
\boxed{
F_{+,v}(\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\theta-\delta)
+\sin\delta
=0.
}
$$

Its delay derivative is

$$
F_\delta
=
\frac{2\delta}{v^2}
-\cos(2\theta-\delta)
+\cos\delta,
$$

and the causal-root Jacobian obeys

$$
\boxed{
F_\delta
=
\frac{2\delta}{v^2}J.
}
$$

Thus root multiplication in this row is a causal-root fold:

$$
\boxed{
F=0,
\qquad
F_\delta=0.
}
$$

## Continuum Fold Onset

The cusp onset for a cross-binary class solves

$$
\boxed{
F=0,
\qquad
F_\delta=0,
\qquad
F_{\delta\delta}=0.
}
$$

For the first class $\kappa=+1$, the executable fold chart gives

$$
\boxed{
v_c^{(+)}
\approx
1.704939069887,
\qquad
\delta_c^{(+)}
\approx
1.952852903844,
\qquad
\tilde\theta_c^{(+)}
\approx
0.855314555384
\pmod{\pi}.
}
$$

The corresponding unit-trace physical delay is

$$
y_c^{(+)}
=
\frac{\delta_c^{(+)}}{v_c^{(+)}}
\approx
1.145409204549.
$$

For the second class $\kappa=-1$, the first onset is later:

$$
\boxed{
v_c^{(-)}
\approx
3.610041573883.
}
$$

The all-pairs simple-root ledger therefore cannot be a continuum one-root chart beyond

$$
\boxed{
v_c
=
v_c^{(+)}
\approx
1.704939069887.
}
$$

This sharpens the predecessor packet. Its first sampled failure at $v=1.75$ is a grid witness of a real continuum saddle-node onset, not a speed-window effect.

## Sampled Fold Window at $v=1.75$

At $v=1.75$, the $\kappa=+1$ fold endpoints are

| Endpoint | $\tilde\theta\pmod{\pi}$ | $\delta$ | $y=\delta/v$ | $F_{\delta\delta}$ | Type |
| --- | ---: | ---: | ---: | ---: | --- |
| entry | $0.882188731280$ | $1.660982044542$ | $0.949132596881$ | $-0.446086089048$ | three-root window entry |
| exit | $0.905049660225$ | $2.401947520184$ | $1.372541440105$ | $0.536931229295$ | three-root window exit |

The predecessor scan's sampled failing node has

$$
\theta
=
\frac{47(2\pi)}{73}
\approx
4.045338485444,
\qquad
\theta\pmod{\pi}
\approx
0.903745831855,
$$

which lies inside this analytic fold window. Its three phase-delay roots are

$$
\delta_1\approx1.294355780304,
\qquad
\delta_2\approx2.304825711803,
\qquad
\delta_3\approx2.485619153606,
$$

with Jacobian signs

$$
\boxed{
\operatorname{sgn}J(\delta_1,\delta_2,\delta_3)
=
(+,-,+).
}
$$

## Multi-Root Chart

After the $\kappa=+1$ onset, a same-ledger row cannot continue to use a one-root consumer checksum. The active root set must be phase-cell dependent:

$$
\boxed{
\mathcal A_{ij}(\theta,v)
=
\begin{cases}
\{\alpha_0\},
&
\tilde\theta\notin(\theta_-(v),\theta_+(v))\pmod{\pi},
\\[4pt]
\{\alpha_1,\alpha_2,\alpha_3\},
&
\tilde\theta\in(\theta_-(v),\theta_+(v))\pmod{\pi},
\end{cases}
}
$$

with roots ordered by

$$
0<\delta_{ij1}<\delta_{ij2}<\delta_{ij3}.
$$

The fold-aware dimensionless mean row is

$$
\boxed{
C_i^{\mathrm{fold}}(v)
=
\int_0^{2\pi}
\sum_{j\ne i}
\sum_{\alpha\in\mathcal A_{ij}(\theta,v)}
\frac{
\sigma_{ij}\,
T_i(\theta)\cdot\widehat R_{ij\alpha}(\theta,v)
}{
\delta_{ij\alpha}(\theta,v)^2
|J_{ij\alpha}(\theta,v)|
}
\,d\theta.
}
$$

Near a generic fold endpoint,

$$
F
\approx
F_\theta(\theta-\theta_f)
+
\frac12F_{\delta\delta}(\delta-\delta_f)^2,
$$

so the new root pair has square-root endpoint behavior and $|J|^{-1}$ has a square-root endpoint singularity in the $\theta$ projection. The successor packet [octahedral-fold-aware-multiroot-period-integral](octahedral-fold-aware-multiroot-period-integral.md) derives the cleaner $\phi=2\tilde\theta-\delta$ coarea chart, where this projection singularity is removed from the cross-binary diagnostic.

## Consequence

The one-root period-rescaled trace route is now narrowed by an analytic branch event:

$$
\boxed{
\texttt{analytic-cross-binary-fold-onset-charted}.
}
$$

This is stronger than the predecessor's sampled boundary row. It proves that the boundary is a saddle-node causal-root fold and gives the first continuum onset. It does not certify a retained multi-root branch.

The direct successor row is

$$
\boxed{
\texttt{sampled-fold-aware-multiroot-period-integral-zero-bracket-detected}.
}
$$

The direct follow-on [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md) upgrades the zero bracket to

$$
\boxed{
\texttt{sign-certified-fold-aware-multiroot-period-integral-zero-bracket}.
}
$$

That successor remains `not_retained`: it records a sign-certified period-integral zero bracket, not a retained branch.

## Executable Diagnostic

The executable diagnostic [octahedral-period-rescaled-fold-chart.mjs](../../../scripts/neutral-braid/octahedral-period-rescaled-fold-chart.mjs) emits:

- the reduced cross-binary phase-delay equation $F_{\kappa,v}=0$;
- the Jacobian relation $F_\delta=(2\delta/v^2)J$;
- the $\kappa=+1$ and $\kappa=-1$ cusp onsets;
- the $v=1.75$ fold window;
- the sampled failure witness and Jacobian signs;
- the fold-aware multi-root mean formula;
- the non-retention verdict.

The successor executables [octahedral-fold-aware-multiroot-period-integral.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-multiroot-period-integral.mjs) and [octahedral-fold-aware-zero-bracket-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-zero-bracket-certificate.mjs) own the coarea-chart reduction, cross-binary cancellation, sampled multi-root zero bracket, and sign-certified zero bracket.

The companion test [neutral-braid-octahedral-period-rescaled-fold-chart.test.js](../../../tests/neutral-braid-octahedral-period-rescaled-fold-chart.test.js) verifies the cusp numbers, the $v=1.75$ fold endpoints, the sampled failure witness, CLI validation, and claim-level guards.

## Retention Verdict

This packet must keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false},
\qquad
\texttt{certifies\_fold\_aware\_multiroot\_period\_integral=false}.
$$

The current safe status is

$$
\boxed{
\texttt{analytic-cross-binary-fold-onset-charted}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it replaces a sampled root-ledger boundary with a derived saddle-node chart and a continuum onset. Its successor chain now records a sign-certified fold-aware zero bracket, but promotion should still wait until the clock row, action/Noether row, event stability row, and observer-export row are certified on one retained branch chart.

# Octahedral Fold-Aware Multiroot Period Integral

Promotion status: `priority-only`.

This packet continues [octahedral-period-rescaled-fold-chart](octahedral-period-rescaled-fold-chart.md). The previous packet proved that the one-root period-rescaled trace ledger meets a cross-binary saddle-node onset at

$$
v_c^{(+)}
\approx
1.704939069887.
$$

This packet evaluates the next mathematical object: the fold-aware multi-root period integral after all positive causal roots are included. It does not reintroduce the earlier $[0.5,1.5]$ diagnostic speed window. The speed ratio

$$
v=\frac{s}{h}
$$

is a positive trace-period parameter, not an admissibility band.

## Cross-Binary Coarea Chart

The cross-binary fold row is

$$
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0.
$$

Set

$$
\phi=2\tilde\theta-\delta.
$$

Then the same root set is described by

$$
\boxed{
Q_{\kappa,v}(\delta)
=
\frac{\delta^2}{v^2}
+\kappa\sin\delta
=
2-\sin\phi.
}
$$

The relevant conditioning factor is

$$
\boxed{
A_{\kappa,v}(\delta)
=
\frac{2\delta}{v^2}
+\kappa\cos\delta.
}
$$

The $\theta$-chart singularity at a fold is a projection singularity. Since

$$
F_\delta\big|_{\theta}
=
A_{\kappa,v}(\delta)-\cos\phi,
$$

and

$$
\frac{d\tilde\theta}{d\phi}
=
\frac{F_\delta|_{\theta}}{2A_{\kappa,v}(\delta)},
$$

the apparent $1/|J|$ blow-up in $\theta$ is cancelled by the coarea factor in the $\phi$ chart when $A_{\kappa,v}$ stays away from zero. The certification coordinate for cross-binary folds is therefore not ordinary $\theta$ quadrature; it is the $\phi$ coarea chart.

## Cross-Binary Cancellation

For each receiver and each $\kappa$ class, the two cross-binary sources occur with opposite force signs and phase shifts differing by $\pi/2$ in $\tilde\theta$. Periodic integration over $[0,2\pi)$ therefore gives

$$
\boxed{
C_{i,\mathrm{cross}}^{\mathrm{fold}}(v)=0
}
$$

on the symmetric period-rescaled trace ledger, provided all active roots in the same coarea chart are included.

The fold-aware period integral reduces to the antipodal-partner all-root sum.

## Antipodal-Partner Multiroot Reduction

For the antipodal partner, the period-rescaled phase-delay roots satisfy

$$
\boxed{
2v\left|\cos\frac{\delta}{2}\right|-\delta=0.
}
$$

For each root $\delta_\alpha$, define

$$
q_\alpha
=
\operatorname{sgn}\left(\cos\frac{\delta_\alpha}{2}\right).
$$

The partner contribution is

$$
\boxed{
P_\alpha(v)
=
\frac{
2\pi v\,q_\alpha\sin(\delta_\alpha/2)
}{
\delta_\alpha^2
\left|
1+vq_\alpha\sin(\delta_\alpha/2)
\right|
}.
}
$$

The reduced fold-aware period integral is

$$
\boxed{
P_{\mathrm{all}}(v)
=
\sum_{\alpha}P_\alpha(v).
}
$$

The secondary antipodal-partner fold occurs when

$$
\boxed{
x+\cot x=0,
\qquad
x\in(\pi/2,\pi),
\qquad
\delta=2x,
\qquad
v=\frac{1}{\sin x}.
}
$$

Numerically,

$$
\boxed{
x\approx2.798386045784,
\qquad
\delta_{\mathrm{fold}}\approx5.596772091568,
\qquad
v_{\mathrm{fold}}\approx2.971693870714.
}
$$

At this speed, $J=0$, so the fold point itself is not a retained regular row.

## Sampled Zero Bracket

On the three-root partner sheet after the secondary fold, the executable diagnostic finds

$$
P_{\mathrm{all}}(3.02)\approx-0.011558515150,
\qquad
P_{\mathrm{all}}(3.025)\approx0.023458525737.
$$

The resulting sampled zero is

$$
\boxed{
v_0
\approx
3.021564740248.
}
$$

At $v_0$, the partner roots are

$$
\delta_1\approx2.344688042275,
\qquad
\delta_2\approx5.240881784882,
\qquad
\delta_3\approx5.968461395446,
$$

with

$$
J_1\approx3.784863187953,
\qquad
J_2\approx-0.504374623800,
\qquad
J_3\approx0.526480599893.
$$

The three contributions are

$$
P_1\approx0.840936900894,
\qquad
P_2\approx-0.682297707080,
\qquad
P_3\approx-0.158639193814,
$$

so

$$
\boxed{
P_1+P_2+P_3\approx0.
}
$$

This is the first trace-period route result that changes the mathematical status from a positive simple-root obstruction to a sampled fold-aware multi-root zero bracket:

$$
\boxed{
\texttt{sampled-fold-aware-multiroot-period-integral-zero-bracket-detected}.
}
$$

The direct successor [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md) upgrades this sampled row to

$$
\boxed{
\texttt{sign-certified-fold-aware-multiroot-period-integral-zero-bracket}
}
$$

by proving that $3.02156\le v\le3.02157$ stays on a regular three-root partner sheet and that $P_{\mathrm{all}}(v)$ changes sign across the bracket.

## Claim Boundary

This packet does not certify a retained branch. Its successor certifies the zero bracket as a sign/regularity row, but the route still lacks:

- an outward-rounded interval or chart-partition certificate for the cross-binary coarea conditioning domain if the cancellation is reused outside the symmetric full-period row;
- a clock row;
- an action/Noether row;
- an event stability row;
- a bounded-speed live ledger if speed variables are declared;
- an observer-export row.

The packet must therefore keep

$$
\texttt{retention=not\_retained},
\qquad
\texttt{retained\_branch=false},
\qquad
\texttt{certifies\_fold\_aware\_multiroot\_period\_integral=false}.
$$

## Executable Diagnostic

The executable diagnostic [octahedral-fold-aware-multiroot-period-integral.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-multiroot-period-integral.mjs) emits:

- the cross-binary cancellation rows by receiver and $\kappa$ class;
- the $\phi$ coarea chart for cross-binary fold certification;
- the antipodal-partner all-root equation;
- the secondary partner fold onset;
- the sampled zero bracket and its sign-certified successor packet;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-fold-aware-multiroot-period-integral.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-multiroot-period-integral.test.js) verifies cross-binary cancellation, the $\phi$ coarea chart marker, the secondary fold, the zero bracket, CLI validation, and the non-retention guards.

## Promotion Decision

This packet remains `priority-only`. It records a sampled fold-aware multi-root period-integral zero bracket, and its successor certifies the zero bracket as a sign/regularity row. Neither packet should be promoted into reader-facing AAA prose as a retained branch until the clock row, action/Noether row, event stability row, and observer-export row are certified on one retained branch chart.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair Scaled Stencil Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md). The predecessor separated the $\theta_{3-}^{-}$ remainder burden into a coalescing fold-pair part and a regular-root part. This packet tightens the fold-pair side by moving the two singular roots into the scaled chart

$$
p=\frac{\delta-\delta_f(\nu)}{y},
\qquad
\theta=\theta_{3-}(\nu)-y^2.
$$

It is a sampled/stencil certificate, not a directed-rounded interval proof.

## Scaled Fold-Pair Rows

For the two roots in the folded source term

$$
\texttt{-s_{\{+,+\}}(u+Q)}
$$

nearest $\delta_f(\nu)$, the sampled rows use

$$
\delta_\pm(y,\nu)
=
\delta_f(\nu)\pm \beta(\nu)y+y^2z_\pm(y,\nu).
$$

The first quadratic coefficient is tracked by

$$
\gamma(\nu)
=
\frac{
F_{\theta\delta}
-
\frac16F_{\delta\delta\delta}\beta^2
}{
F_{\delta\delta}
},
$$

so the diagnostic check is that $z_\pm$ stay bounded and close to $\gamma$ on the sampled collar. The scaled denominator row is

$$
J_\pm(y,\nu)
=
\frac{
F_\delta(\theta_{3-}(\nu)-y^2,\delta_\pm(y,\nu);\nu)
}{y}.
$$

The sample verifies the expected signs

$$
J_- > 0,
\qquad
J_+ < 0,
$$

and reconstructs the pair contribution without a singular $1/F_\delta$ expression:

$$
G_{\mathrm{pair}}
=
\sum_{\pm}
\frac{
4\sigma_*B(\theta,\delta_\pm)
}{
\nu\delta_\pm^2|J_\pm|
},
\qquad
\sigma_*=-1.
$$

The derivative-numerator row is still evaluated through the existing source derivative diagnostic,

$$
D_{\mathrm{pair}}=4y^3 f_{\mathrm{pair},\theta}',
$$

while the theorem-grade successor should compute it as $D_{\mathrm{pair}}=G_{\mathrm{pair}}-y\partial_yG_{\mathrm{pair}}$ in the scaled chart.

## Sampled Result

Across the same five speed samples and nineteen collar samples used by the predecessor, the packet certifies:

| Row | Sampled value |
| --- | ---: |
| sample count | $95$ |
| $\max |z_\pm|$ | $2.97447891747$ |
| $\max |z_\pm-\gamma|$ | $0.225146535728$ |
| $\min |J_\pm|$ | $0.77350681608$ |
| minimum pair-to-regular separation | $1.73277431787$ |
| $\max |R_G^{\mathrm{pair}}|/y^2$ | $0.171600721993$ |
| $\max |R_D^{\mathrm{pair}}|/y^2$ | $0.700161629591$ |
| maximum scaled $G_{\mathrm{pair}}$ reconstruction error | $3.76119968504\times10^{-11}$ |

The resulting status is

$$
\boxed{
\texttt{sampled-theta3minus-fold-pair-scaled-stencil-certified}.
}
$$

This is a theory advance because it converts the singular fold pair into bounded sampled variables. The coalescing roots no longer appear as two unstable ordinary-root contributions; they appear as a bounded $p$-chart with a nonzero scaled denominator $J_\pm$ and quadratic pair-remainder quotients.

The directed-rounded sampled-node successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md) replays these same $95$ speed/collar nodes with outward-rounded $z_\pm$ brackets, sign-definite $J_\pm$ intervals, and pair $G,D$ quotient enclosures. The root-tube cell-cover successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) then extends the Taylor-cancelled fold-pair root-tube and $J_\varepsilon$ sign replay to a finite speed/y cell cover. It does not close the fold-pair $G,D$ quotient-remainder bound, but it removes continuous root existence and nondegeneracy as the fold-pair bottleneck.

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-endpoint-bracket` | directed-rounded interval certified |
| `theta3minus.negative-fold-limit-L` | directed-rounded interval certified |
| `theta3minus.sampled-fold-pair-scaled-roots` | sampled-stencil certified |
| `theta3minus.sampled-fold-pair-quadratic-remainder-quotients` | sampled-stencil certified |
| `theta3minus.sampled-node-fold-pair-scaled-interval` | directed-rounded sampled-node certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md) |
| `theta3minus.fold-pair-root-tube-cell-cover` | directed-rounded finite speed/y cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) |
| `theta3minus.fold-pair-scaled-remainder` | directed-rounded open |
| `theta3minus.regular-root-remainder` | directed-rounded open |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

The remaining fold-pair successor should now intervalize the $G,D$ quotient remainder over the certified root tubes:

$$
\frac{R_G^{\mathrm{pair}}}{y^2},
\qquad
\frac{R_D^{\mathrm{pair}}}{y^2}.
$$

The parallel regular-root successor remains the ordinary root-sheet continuation bound for

$$
R_G^{\mathrm{reg}}=O(y),
\qquad
R_D^{\mathrm{reg}}=O(y^3).
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_sampled\_theta3minus\_fold\_pair\_scaled\_stencil=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=false},
$$

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
\qquad
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.mjs). It emits:

- scaled $p_\pm$ and $z_\pm$ rows for the two coalescing roots;
- scaled denominator rows $J_\pm=F_\delta/y$;
- pair-to-regular separation margins;
- $G_{\mathrm{pair}}$ reconstruction from the scaled source formula;
- pair quadratic quotient rows $|R_G^{\mathrm{pair}}|/y^2$ and $|R_D^{\mathrm{pair}}|/y^2$;
- explicit non-directed-rounded, non-`I1`, non-quadrature, and non-retention claim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.test.js) validates schema, no-fixed-speed-window discipline, scaled $p,z,J$ rows, pair-root identification, quadratic quotient thresholds, overclaim rejection, and CLI write/validate behavior.

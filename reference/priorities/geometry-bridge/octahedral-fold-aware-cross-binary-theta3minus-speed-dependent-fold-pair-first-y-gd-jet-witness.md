# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Jet Witness

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md). The predecessor certifies the fold-pair $G,D$ quotients on all positive-y cells of the certified $h_\varepsilon$ root graph and defers the first y cell because raw $y^{-2}$ division is invalid there. This packet supplies the sampled analytic first-y jet that explains the cancellation.

It is not a directed-rounded first-y-cell enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It converts the remaining first-y singularity from a structural unknown into a concrete coefficient-enclosure target. The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md) certifies the constant coefficient by directed-rounded speed-cell intervals, and [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md) certifies the next linear coefficient.

## Jet Coordinates

For speed $\nu$ and branch sign $\varepsilon\in\{-1,+1\}$, write

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+O(y^4),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3+O(y^4).
$$

Here $d=\delta_f(\nu)$, $\phi_f=\phi_f(\nu)$,

$$
\beta^2=\frac{2F_{\theta,f}}{F_{\delta\delta,f}},
$$

and

$$
\gamma
=
\frac{
F_{\theta\delta,f}
-F_{\delta\delta\delta,f}\beta^2/6
}{F_{\delta\delta,f}}.
$$

The executable witness solves $h_{0,\varepsilon}$ by forcing the $y^4$ coefficient of

$$
F(\tilde\theta_f-y^2,\delta_\varepsilon;\nu,+1)
$$

to vanish. The sampled values satisfy the predecessor tube membership:

$$
h_{0,-}\in[0.8,4.0],
\qquad
h_{0,+}\in[-2.2,0.2].
$$

## Cancellation Identities

Let

$$
B_\varepsilon
=
-\frac12(\cos\phi_\varepsilon+\cos\delta_\varepsilon),
\qquad
J_\varepsilon=\frac{F_\delta}{y}.
$$

The branch contribution is

$$
G_\varepsilon
=
\frac{4\sigma_*B_\varepsilon}
{\nu\delta_\varepsilon^2(-\varepsilon J_\varepsilon)},
\qquad
\sigma_*=-1.
$$

At $y=0$,

$$
J_\varepsilon(0)=\varepsilon\beta F_{\delta\delta,f},
\qquad
-\varepsilon J_\varepsilon(0)=\beta|F_{\delta\delta,f}|,
$$

so

$$
G_\varepsilon(0)
=
\frac{4\sigma_*B_f}
{\nu d^2\beta|F_{\delta\delta,f}|}
=
\frac{L}{2}.
$$

Therefore, for

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu),
$$

the constant cancellation is

$$
\boxed{P(0,\nu)=L(\nu).}
$$

The first branch coefficient is odd:

$$
G_\varepsilon'(0)=\varepsilon g_0\Lambda,
\qquad
g_0=\frac{L}{2},
$$

with

$$
\Lambda
=
\beta
\left[
\frac{\sin d-\sin\phi_f}{2B_f}
-\frac{2}{d}
-\frac{F_{\delta\delta\delta,f}}{3F_{\delta\delta,f}}
\right].
$$

Thus the pair cancels the first coefficient:

$$
\boxed{P'(0,\nu)=0.}
$$

The first-y-cell quotients should therefore be certified by the zero-safe identities

$$
Q_G^{\mathrm{pair}}(y,\nu)
=
\frac{P(y,\nu)-L(\nu)}{y^2}
=
\int_0^1(1-t)P''(ty,\nu)\,dt,
$$

and

$$
D_{\mathrm{pair}}=P-yP',
$$

so

$$
Q_D^{\mathrm{pair}}(y,\nu)
=
\frac{D_{\mathrm{pair}}-L}{y^2}
=
-\int_0^1tP''(ty,\nu)\,dt.
$$

At the constant quotient level this gives

$$
Q_D^{\mathrm{pair}}(0,\nu)
=
-Q_G^{\mathrm{pair}}(0,\nu).
$$

## Sampled Witness Result

The witness evaluates ordinary power-series jets at the $17$ speed-cell endpoints. Across those rows:

| Row | Certified sampled value |
| --- | ---: |
| speed samples | $17$ |
| branch samples | $34$ |
| all $h_0$ values inside predecessor tubes | `true` |
| maximum source-equation coefficient residual through $y^4$ | $4.1073811019\times10^{-12}$ |
| maximum $|P(0)-L|$ | $6.04322147879\times10^{-13}$ |
| maximum $|P'(0)|$ | $0$ |
| maximum $|D(0)-L|$ | $6.04322147879\times10^{-13}$ |
| maximum $|D'(0)|$ | $0$ |
| maximum $|Q_D(0)+Q_G(0)|$ | $0$ |
| sampled $Q_G(0)$ hull | $[0.0859299624971,0.0859809242715]$ |
| sampled $Q_D(0)$ hull | $[-0.0859809242715,-0.0859299624971]$ |

The status is

$$
\boxed{
\texttt{sampled-theta3minus-fold-pair-first-y-GD-jet-cancellation-witness-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_sampled\_first\_y\_GD\_jet\_cancellation=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_G\_quotient\_full\_cell\_cover=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_D\_quotient\_cell\_cover=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |
| `I1.regular-critical-exhaustion` | blocked by theta3minus fold-pair first-y enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.mjs). It emits:

- sampled branch $h_{0,\varepsilon}$ coefficients and predecessor-tube membership;
- source-equation jet residuals through $y^4$;
- branch $G_\varepsilon$ coefficients through $y^2$;
- pair $G$ and $D$ coefficients through $y^3$;
- $P(0)-L$, $P'(0)$, $D(0)-L$, $D'(0)$, and $Q_D(0)+Q_G(0)$ residuals;
- explicit open directed-rounded first-y enclosure, full quotient, remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.test.js) validates schema, no-fixed-speed-window discipline, sampled cancellation residuals, $h_0$ tube membership, overclaim rejection, and CLI write/validate behavior.

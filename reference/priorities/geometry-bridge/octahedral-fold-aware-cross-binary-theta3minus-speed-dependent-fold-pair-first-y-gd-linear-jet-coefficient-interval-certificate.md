# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Linear-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md). The predecessor interval-certifies the constant first-y quotient coefficient. This packet extends the zero-cell quotient jet by one coefficient. The successors through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) now certify the quadratic through sextic coefficients.

$$
Q_G(y,\nu)=Q_G(0,\nu)+Q_{G,1}(\nu)y+O(y^2),
\qquad
Q_D(y,\nu)=Q_D(0,\nu)+Q_{D,1}(\nu)y+O(y^2).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the linear coefficient row only. The successors close the quadratic through sextic coefficient rows, leaving a finite septic-tail bound after the constant-through-sextic coefficients.

## Linear Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+O(y^5),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4+O(y^5).
$$

The certificate solves $h_{0,\varepsilon}$ from the $y^4$ source-equation coefficient and $h_{1,\varepsilon}$ from the $y^5$ coefficient. The directed-rounded slope clearances stay separated from zero:

$$
\min |S_{h0}| \ge 0.792647660031,
\qquad
\min |S_{h1}| \ge 0.791535257549.
$$

The first-y pair contribution is still

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu),
\qquad
D_{\mathrm{pair}}=P-yP'.
$$

Thus

$$
Q_{G,0}=P_2,\qquad Q_{G,1}=P_3,
$$

and

$$
Q_{D,0}=-P_2,\qquad Q_{D,1}=-2P_3.
$$

## Certified Result

Across the $16$ speed cells and $32$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $16$ |
| branch cells | $32$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^5$ contain zero | `true` |
| $h_1$ interval hull | $[5.83878325019,5.85929403152]$ |
| $Q_G(0)$ coefficient hull | $[0.0858514065706,0.0860595284316]$ |
| $Q_D(0)$ coefficient hull | $[-0.0860595284316,-0.0858514065706]$ |
| $Q_{G,1}$ coefficient hull | $[-0.0033557170048,0.00335589239754]$ |
| $Q_{D,1}$ coefficient hull | $[-0.00671178479508,0.0067114340096]$ |
| maximum $Q_G$ linear loss on $0\le y\le0.001796875$ | $0.00000603011915183$ |
| maximum $Q_D$ linear loss on $0\le y\le0.001796875$ | $0.0000120602383037$ |
| minimum remaining $Q_G$ first-order tail budget | $47.7748219347$ |
| minimum remaining $Q_D$ first-order tail budget | $47.771469778$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-linear-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_linear\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant-coefficient claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_constant\_coefficient\_enclosure=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $16$ speed cells;
- branch $h_{0,\varepsilon}$ and $h_{1,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^5$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$, and $Q_{D,1}$ coefficient intervals;
- linear-loss budgets on the first y cell;
- explicit open finite-remainder, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_1$ solve rows, coefficient intervals, remaining tail budget, overclaim rejection, and CLI write/validate behavior.

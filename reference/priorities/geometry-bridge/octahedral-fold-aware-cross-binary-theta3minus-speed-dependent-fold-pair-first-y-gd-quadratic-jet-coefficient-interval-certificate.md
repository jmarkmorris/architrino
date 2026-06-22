# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Quadratic-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant and linear first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient. The successors through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) now certify the cubic through sextic coefficients:

$$
Q_G(y,\nu)=Q_G(0,\nu)+Q_{G,1}(\nu)y+Q_{G,2}(\nu)y^2+O(y^3),
\qquad
Q_D(y,\nu)=Q_D(0,\nu)+Q_{D,1}(\nu)y+Q_{D,2}(\nu)y^2+O(y^3).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the quadratic coefficient row only. The successors close the cubic through sextic coefficient rows, leaving a finite septic-tail bound after the constant-through-sextic coefficients.

## Quadratic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+O(y^6),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5+O(y^6).
$$

The certificate solves $h_{0,\varepsilon}$ from the $y^4$ source-equation coefficient, $h_{1,\varepsilon}$ from the $y^5$ coefficient, and $h_{2,\varepsilon}$ from the $y^6$ coefficient. The directed-rounded slope clearances stay separated from zero:

$$
\min |S_{h0}| \ge 0.792647660031,
\qquad
\min |S_{h1}| \ge 0.791535257549,
\qquad
\min |S_{h2}| \ge 0.731777762391.
$$

The pair contribution is

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu),
\qquad
D_{\mathrm{pair}}=P-yP'.
$$

If

$$
P=L+P_2y^2+P_3y^3+P_4y^4+O(y^5),
$$

then

$$
Q_{G,0}=P_2,\qquad Q_{G,1}=P_3,\qquad Q_{G,2}=P_4,
$$

and

$$
Q_{D,0}=-P_2,\qquad Q_{D,1}=-2P_3,\qquad Q_{D,2}=-3P_4.
$$

The executable row records the interval identities

$$
Q_{D,0}+Q_{G,0}\ni0,\qquad
Q_{D,1}+2Q_{G,1}\ni0,\qquad
Q_{D,2}+3Q_{G,2}\ni0.
$$

## Certified Result

Across the $16$ speed cells and $32$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $16$ |
| branch cells | $32$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^6$ contain zero | `true` |
| $h_2$ interval hull | $[-3.39731366714,3.41142338845]$ |
| $Q_G(0)$ coefficient hull | $[0.0858514065702,0.0860595284311]$ |
| $Q_D(0)$ coefficient hull | $[-0.0860595284311,-0.0858514065702]$ |
| $Q_{G,1}$ coefficient hull | $[-0.00335571700389,0.00335589239689]$ |
| $Q_{D,1}$ coefficient hull | $[-0.00671178479378,0.00671143400778]$ |
| $Q_{G,2}$ coefficient hull | $[-0.972631657911,-0.764364731379]$ |
| $Q_{D,2}$ coefficient hull | $[2.29309419414,2.91789497373]$ |
| maximum $Q_G$ linear loss on $0\le y\le0.001796875$ | $0.00000603011915066$ |
| maximum $Q_D$ linear loss on $0\le y\le0.001796875$ | $0.0000120602383013$ |
| maximum $Q_G$ quadratic loss on $0\le y\le0.001796875$ | $0.00000314039396384$ |
| maximum $Q_D$ quadratic loss on $0\le y\le0.001796875$ | $0.0000094211818915$ |
| minimum remaining $Q_G$ first-order tail budget | $47.7730753143$ |
| minimum remaining $Q_D$ first-order tail budget | $47.7662299172$ |
| minimum remaining $Q_G$ cubic-tail budget | $14796107.1068$ |
| minimum remaining $Q_D$ cubic-tail budget | $14793986.9747$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-quadratic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_quadratic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant and linear coefficient claims:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_constant\_coefficient\_enclosure=true},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_linear\_jet\_coefficient\_enclosure=true}.
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
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $16$ speed cells;
- branch $h_{0,\varepsilon}$, $h_{1,\varepsilon}$, and $h_{2,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^6$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$, $Q_{D,1}$, $Q_{G,2}$, and $Q_{D,2}$ coefficient intervals;
- linear-loss, quadratic-loss, first-order tail-budget, and cubic-tail-budget rows on the first y cell;
- explicit open cubic-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_2$ solve rows, coefficient intervals, remaining cubic-tail budget, overclaim rejection, and CLI write/validate behavior.

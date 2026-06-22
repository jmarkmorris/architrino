# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Cubic-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant, linear, and quadratic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient. The successors through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) now certify the quartic through sextic coefficients:

$$
Q_G(y,\nu)=Q_G(0,\nu)+Q_{G,1}(\nu)y+Q_{G,2}(\nu)y^2+Q_{G,3}(\nu)y^3+O(y^4),
\qquad
Q_D(y,\nu)=Q_D(0,\nu)+Q_{D,1}(\nu)y+Q_{D,2}(\nu)y^2+Q_{D,3}(\nu)y^3+O(y^4).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the cubic coefficient row only. The successors close the quartic through sextic coefficient rows, leaving a finite septic-tail bound after the constant-through-sextic coefficients.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Cubic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+O(y^7),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6+O(y^7).
$$

The certificate solves $h_{0,\varepsilon}$ from the $y^4$ source-equation coefficient, $h_{1,\varepsilon}$ from the $y^5$ coefficient, $h_{2,\varepsilon}$ from the $y^6$ coefficient, and $h_{3,\varepsilon}$ from the $y^7$ coefficient. The directed-rounded slope clearances stay separated from zero:

$$
\min |S_{h0}| \ge 0.792710296735,
\qquad
\min |S_{h1}| \ge 0.792571243816,
\qquad
\min |S_{h2}| \ge 0.785101335402,
\qquad
\min |S_{h3}| \ge 0.56339497028.
$$

The pair contribution is

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu),
\qquad
D_{\mathrm{pair}}=P-yP'.
$$

If

$$
P=L+P_2y^2+P_3y^3+P_4y^4+P_5y^5+O(y^6),
$$

then

$$
Q_{G,0}=P_2,\qquad Q_{G,1}=P_3,\qquad Q_{G,2}=P_4,\qquad Q_{G,3}=P_5,
$$

and

$$
Q_{D,0}=-P_2,\qquad Q_{D,1}=-2P_3,\qquad Q_{D,2}=-3P_4,\qquad Q_{D,3}=-4P_5.
$$

The executable row records the interval identities

$$
Q_{D,0}+Q_{G,0}\ni0,\qquad
Q_{D,1}+2Q_{G,1}\ni0,\qquad
Q_{D,2}+3Q_{G,2}\ni0,\qquad
Q_{D,3}+4Q_{G,3}\ni0.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^7$ contain zero | `true` |
| $h_3$ interval hull | $[-31.3074345924,-17.0318103498]$ |
| $Q_G(0)$ coefficient hull | $[0.085920143363,0.0859907501372]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859907501372,-0.085920143363]$ |
| $Q_{G,1}$ coefficient hull | $[-0.000419486540367,0.000419489280989]$ |
| $Q_{D,1}$ coefficient hull | $[-0.000838978561978,0.000838973080734]$ |
| $Q_{G,2}$ coefficient hull | $[-0.884509154374,-0.858164859378]$ |
| $Q_{D,2}$ coefficient hull | $[2.57449457813,2.65352746312]$ |
| $Q_{G,3}$ coefficient hull | $[-2.33229280147,2.30497148098]$ |
| $Q_{D,3}$ coefficient hull | $[-9.21988592393,9.32917120589]$ |
| maximum $Q_G$ linear loss on $0\le y\le0.001796875$ | $7.53769801777\times10^{-7}$ |
| maximum $Q_D$ linear loss on $0\le y\le0.001796875$ | $0.00000150753960355$ |
| maximum $Q_G$ quadratic loss on $0\le y\le0.001796875$ | $0.00000285586756997$ |
| maximum $Q_D$ quadratic loss on $0\le y\le0.001796875$ | $0.0000085676027099$ |
| maximum $Q_G$ cubic loss on $0\le y\le0.001796875$ | $1.35312111452\times10^{-8}$ |
| maximum $Q_D$ cubic loss on $0\le y\le0.001796875$ | $5.41248445807\times10^{-8}$ |
| minimum remaining $Q_G$ first-order tail budget | $47.8144126673$ |
| minimum remaining $Q_D$ first-order tail budget | $47.8107942638$ |
| minimum remaining $Q_G$ cubic-tail budget | $14808909.9649$ |
| minimum remaining $Q_D$ cubic-tail budget | $14807789.2858$ |
| minimum remaining $Q_G$ quartic-tail budget | $8241480328.28$ |
| minimum remaining $Q_D$ quartic-tail budget | $8240856646$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-cubic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_cubic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, and quadratic coefficient claims:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_constant\_coefficient\_enclosure=true},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_linear\_jet\_coefficient\_enclosure=true},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_quadratic\_jet\_coefficient\_enclosure=true}.
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
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by successor |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by successor |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$, $h_{1,\varepsilon}$, $h_{2,\varepsilon}$, and $h_{3,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^7$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$, $Q_{D,1}$, $Q_{G,2}$, $Q_{D,2}$, $Q_{G,3}$, and $Q_{D,3}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, first-order tail-budget, cubic-tail-budget, and quartic-tail-budget rows on the first y cell;
- explicit open quartic-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_3$ solve rows, coefficient intervals, remaining quartic-tail budget, overclaim rejection, and CLI write/validate behavior.

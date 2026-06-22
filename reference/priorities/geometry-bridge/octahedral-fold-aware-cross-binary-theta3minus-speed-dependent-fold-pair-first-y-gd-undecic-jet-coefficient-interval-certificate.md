# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Undecic-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant through decic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=\sum_{k=0}^{11}Q_{G,k}(\nu)y^k+O(y^{12}),
\qquad
Q_D(y,\nu)=\sum_{k=0}^{11}Q_{D,k}(\nu)y^k+O(y^{12}).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the undecic coefficient row only. The remaining fold-pair blocker is now a finite twelfth-order quotient tail bound after the constant through undecic coefficients.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Undecic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+h_{7,\varepsilon}y^{10}+h_{8,\varepsilon}y^{11}+h_{9,\varepsilon}y^{12}+h_{10,\varepsilon}y^{13}+h_{11,\varepsilon}y^{14}+O(y^{15}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9-h_{7,\varepsilon}y^{10}-h_{8,\varepsilon}y^{11}-h_{9,\varepsilon}y^{12}-h_{10,\varepsilon}y^{13}-h_{11,\varepsilon}y^{14}+O(y^{15}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

This avoids the false mixed high-order slope produced by subtracting large correlated source-coefficient intervals. The certificate solves $h_{0,\varepsilon}$ through $h_{11,\varepsilon}$ from the $y^4$ through $y^{15}$ source-equation coefficients. The directed-rounded slope clearance remains uniform:

$$
\min |S_\varepsilon| \ge 0.792719244976.
$$

The pair contribution is

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu),
\qquad
D_{\mathrm{pair}}=P-yP'.
$$

If

$$
P=L+\sum_{m=2}^{13}P_my^m+O(y^{14}),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le11.
$$

The executable row records the interval identities

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le11.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{15}$ contain zero | `true` |
| maximum absolute source-equation coefficient interval through $y^{15}$ | $5353.93825035$ |
| $h_9$ interval hull | $[2156.81713729,2275.44061464]$ |
| $h_{10}$ interval hull | $[-5716.60732585,5716.60732585]$ |
| $h_{11}$ interval hull | $[-12767.1736761,-8617.99168626]$ |
| $Q_G(0)$ coefficient hull | $[0.0859249422975,0.0859859475716]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859859475716,-0.0859249422975]$ |
| $Q_{G,10}$ coefficient hull | $[-2720.94809444,-2127.83770089]$ |
| $Q_{D,10}$ coefficient hull | $[23406.2147097,29930.4290388]$ |
| $Q_{G,11}$ coefficient hull | $[-1763.21366944,1763.21366944]$ |
| $Q_{D,11}$ coefficient hull | $[-21158.5640333,21158.5640333]$ |
| maximum $Q_G$ decic loss on $0\le y\le0.001796875$ | $9.54770343681\times10^{-25}$ |
| maximum $Q_D$ decic loss on $0\le y\le0.001796875$ | $1.05024737805\times10^{-23}$ |
| maximum $Q_G$ undecic loss on $0\le y\le0.001796875$ | $1.1117355009\times10^{-27}$ |
| maximum $Q_D$ undecic loss on $0\le y\le0.001796875$ | $1.33408260108\times10^{-26}$ |
| minimum remaining $Q_G$ eleventh-order-tail budget | $1.36272498234\times10^{29}$ |
| minimum remaining $Q_D$ eleventh-order-tail budget | $1.36263485752\times10^{29}$ |
| minimum remaining $Q_G$ twelfth-order-tail budget | $7.58386077131\times10^{31}$ |
| minimum remaining $Q_D$ twelfth-order-tail budget | $7.58335920705\times10^{31}$ |
| maximum absolute $Q_{D,11}+12Q_{G,11}$ identity interval | $42317.1280666$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-undecic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_undecic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, quintic, sextic, septic, octic, nonic, and decic coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-octic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-nonic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-decic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-undecic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twelfth-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by twelfth-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The direct positive-y quotient rows cannot be converted into the first-y tail bound by quotient subtraction; the required cancellation is lost in interval arithmetic near $y=0$. After this packet, the exact quotient-tail quantities are

$$
T_G^{(12)}
=
\frac{Q_G-A_{G,11}}{y^{12}}
=
\frac{P-L-y^2A_{G,11}}{y^{14}},
\qquad
T_D^{(12)}
=
\frac{Q_D-A_{D,11}}{y^{12}}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,11}}{y^{14}},
$$

where $A_{G,11}$ and $A_{D,11}$ are the certified undecic quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(12)}$ and $T_D^{(12)}$ with no raw division by a zero-touching $y$ interval.

The corresponding post-undecic root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le11}(y,\nu)+y^{12}E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells. The post-undecic proof target is

$$
\mathcal H_{\varepsilon,12}(y,E,\nu)
=
\frac{R_{\varepsilon,E}(y,\nu)}{y^{16}}
=
\frac{H_\varepsilon(y,h_{\varepsilon,\le11}+y^{12}E,\nu)}{y^{12}},
$$

interpreted by Taylor cancellation rather than raw division. This is the next missing zero-safe evaluator; the undecic packet closes one more coefficient row but does not close this finite tail tube.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-undecic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-undecic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{11,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{15}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$ through $Q_{G,11}$, and $Q_{D,1}$ through $Q_{D,11}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, quartic-loss, quintic-loss, sextic-loss, septic-loss, octic-loss, nonic-loss, decic-loss, undecic-loss, tail-budget, eleventh-order-tail-budget, and twelfth-order-tail-budget rows on the first y cell;
- explicit open finite-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-undecic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-undecic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_{11}$ solve rows, coefficient intervals, remaining post-undecic budget, overclaim rejection, and CLI write/validate behavior.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Decic-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-nonic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-nonic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant through nonic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=\sum_{k=0}^{10}Q_{G,k}(\nu)y^k+O(y^{11}),
\qquad
Q_D(y,\nu)=\sum_{k=0}^{10}Q_{D,k}(\nu)y^k+O(y^{11}).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the decic coefficient row only. The remaining fold-pair blocker is now a finite eleventh-order tail bound after the constant through decic coefficients.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Decic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+h_{7,\varepsilon}y^{10}+h_{8,\varepsilon}y^{11}+h_{9,\varepsilon}y^{12}+h_{10,\varepsilon}y^{13}+O(y^{14}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9-h_{7,\varepsilon}y^{10}-h_{8,\varepsilon}y^{11}-h_{9,\varepsilon}y^{12}-h_{10,\varepsilon}y^{13}+O(y^{14}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

This avoids the false mixed high-order slope produced by subtracting large correlated source-coefficient intervals. The certificate solves $h_{0,\varepsilon}$ through $h_{10,\varepsilon}$ from the $y^4$ through $y^{14}$ source-equation coefficients. The directed-rounded slope clearance remains uniform:

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
P=L+\sum_{m=2}^{12}P_my^m+O(y^{13}),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le10.
$$

The executable row records the interval identities

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le10.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{14}$ contain zero | `true` |
| maximum absolute source-equation coefficient interval through $y^{14}$ | $897.217669831$ |
| $h_9$ interval hull | $[2156.8171373,2275.44061463]$ |
| $h_{10}$ interval hull | $[-5716.60732578,5716.60732578]$ |
| $Q_G(0)$ coefficient hull | $[0.0859249422975,0.0859859475716]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859859475716,-0.0859249422975]$ |
| $Q_{G,9}$ coefficient hull | $[-49.5197525326,49.5197525326]$ |
| $Q_{D,9}$ coefficient hull | $[-495.197525326,495.197525326]$ |
| $Q_{G,10}$ coefficient hull | $[-2720.94809438,-2127.83770094]$ |
| $Q_{D,10}$ coefficient hull | $[23406.2147103,29930.4290382]$ |
| maximum $Q_G$ nonic loss on $0\le y\le0.001796875$ | $9.67028476273\times10^{-24}$ |
| maximum $Q_D$ nonic loss on $0\le y\le0.001796875$ | $9.67028476273\times10^{-23}$ |
| maximum $Q_G$ decic loss on $0\le y\le0.001796875$ | $9.54770343662\times10^{-25}$ |
| maximum $Q_D$ decic loss on $0\le y\le0.001796875$ | $1.05024737803\times10^{-23}$ |
| minimum remaining $Q_G$ tenth-order-tail budget | $2.44864645265\times10^{26}$ |
| minimum remaining $Q_D$ tenth-order-tail budget | $2.4484845096\times10^{26}$ |
| minimum remaining $Q_G$ eleventh-order-tail budget | $1.36272498234\times10^{29}$ |
| minimum remaining $Q_D$ eleventh-order-tail budget | $1.36263485752\times10^{29}$ |
| maximum absolute $Q_{D,10}+11Q_{G,10}$ identity interval | $6500.69511563$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-decic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_decic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, quintic, sextic, septic, octic, and nonic coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-eleventh-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by eleventh-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The direct positive-y quotient rows cannot be converted into the first-y tail bound by quotient subtraction; the required cancellation is lost in interval arithmetic near $y=0$. After this packet, the exact quotient-tail quantities are

$$
T_G^{(11)}
=
\frac{Q_G-A_{G,10}}{y^{11}}
=
\frac{P-L-y^2A_{G,10}}{y^{13}},
\qquad
T_D^{(11)}
=
\frac{Q_D-A_{D,10}}{y^{11}}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,10}}{y^{13}},
$$

where $A_{G,10}$ and $A_{D,10}$ are the certified decic quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(11)}$ and $T_D^{(11)}$ with no raw division by a zero-touching $y$ interval.

The corresponding post-decic root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le10}(y,\nu)+y^{11}E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells. The post-decic proof target is

$$
\mathcal H_{\varepsilon,11}(y,E,\nu)
=
\frac{R_{\varepsilon,E}(y,\nu)}{y^{15}}
=
\frac{H_\varepsilon(y,h_{\varepsilon,\le10}+y^{11}E,\nu)}{y^{11}},
$$

interpreted by Taylor cancellation rather than raw division. This is the next missing zero-safe evaluator; the decic packet closes one more coefficient row but does not close this finite tail tube.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{10,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{14}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$ through $Q_{G,10}$, and $Q_{D,1}$ through $Q_{D,10}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, quartic-loss, quintic-loss, sextic-loss, septic-loss, octic-loss, nonic-loss, decic-loss, tail-budget rows, and eleventh-order-tail-budget rows on the first y cell;
- explicit open finite-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-decic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_{10}$ solve rows, coefficient intervals, remaining post-decic budget, overclaim rejection, and CLI write/validate behavior.

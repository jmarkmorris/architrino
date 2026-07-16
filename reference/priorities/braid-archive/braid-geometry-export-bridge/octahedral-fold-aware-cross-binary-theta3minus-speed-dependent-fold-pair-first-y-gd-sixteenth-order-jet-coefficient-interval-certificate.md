# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Sixteenth-Order Jet Coefficient Interval Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-fifteenth-order-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-fifteenth-order-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant through fifteenth-order first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=\sum_{k=0}^{16}Q_{G,k}(\nu)y^k+O(y^{17}),
\qquad
Q_D(y,\nu)=\sum_{k=0}^{16}Q_{D,k}(\nu)y^k+O(y^{17}).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the sixteenth-order coefficient row only. The remaining fold-pair blocker is now a finite seventeenth-order quotient tail bound after the constant through sixteenth-order coefficients.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Sixteenth-Order Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+h_{7,\varepsilon}y^{10}+h_{8,\varepsilon}y^{11}+h_{9,\varepsilon}y^{12}+h_{10,\varepsilon}y^{13}+h_{11,\varepsilon}y^{14}+h_{12,\varepsilon}y^{15}+h_{13,\varepsilon}y^{16}+h_{14,\varepsilon}y^{17}+h_{15,\varepsilon}y^{18}+h_{16,\varepsilon}y^{19}+O(y^{20}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9-h_{7,\varepsilon}y^{10}-h_{8,\varepsilon}y^{11}-h_{9,\varepsilon}y^{12}-h_{10,\varepsilon}y^{13}-h_{11,\varepsilon}y^{14}-h_{12,\varepsilon}y^{15}-h_{13,\varepsilon}y^{16}-h_{14,\varepsilon}y^{17}-h_{15,\varepsilon}y^{18}-h_{16,\varepsilon}y^{19}+O(y^{20}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

The certificate solves $h_{0,\varepsilon}$ through $h_{16,\varepsilon}$ from the $y^4$ through $y^{20}$ source-equation coefficients. The directed-rounded slope clearance remains uniform:

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
P=L+\sum_{m=2}^{18}P_my^m+O(y^{19}),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le16.
$$

The executable row records the interval identities

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le16.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{20}$ contain zero | `true` |
| maximum absolute source-equation coefficient interval through $y^{20}$ | $40508315.7203$ |
| $h_{15}$ interval hull | $[-2822625.21673,2425285.72]$ |
| $h_{16}$ interval hull | $[-17271814.3662,17271814.3662]$ |
| $Q_{G,15}$ coefficient hull | $[-2235611.16493,2235611.16493]$ |
| $Q_{D,15}$ coefficient hull | $[-35769778.639,35769778.639]$ |
| $Q_{G,16}$ coefficient hull | $[-12656271.9864,14024649.6318]$ |
| $Q_{D,16}$ coefficient hull | $[-238419043.741,215156623.769]$ |
| maximum $Q_G$ sixteenth-order loss on $0\le y\le0.001796875$ | $1.65644828776\times10^{-37}$ |
| maximum $Q_D$ sixteenth-order loss on $0\le y\le0.001796875$ | $2.81596208919\times10^{-36}$ |
| minimum remaining $Q_G$ seventeenth-order-tail budget | $4.04856409799\times10^{45}$ |
| minimum remaining $Q_D$ seventeenth-order-tail budget | $4.0482963432\times10^{45}$ |
| maximum absolute $Q_{D,16}+17Q_{G,16}$ identity interval | $453575667.51$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-sixteenth-order-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_sixteenth\_order\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, quintic, sextic, septic, octic, nonic, decic, undecic, duodecic, tridecic, fourteenth-order, and fifteenth-order coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-duodecic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-tridecic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-fourteenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-fifteenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-sixteenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-seventeenth-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by seventeenth-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The sixteenth-order coefficient row proves the leading coefficient of the post-fifteenth-order tail, but it does not bound the continuous finite remainder. After this packet, the exact quotient-tail quantities are

$$
T_G^{(17)}
=
\frac{Q_G-A_{G,16}}{y^{17}}
=
\frac{P-L-y^2A_{G,16}}{y^{19}},
\qquad
T_D^{(17)}
=
\frac{Q_D-A_{D,16}}{y^{17}}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,16}}{y^{19}},
$$

where $A_{G,16}$ and $A_{D,16}$ are the certified sixteenth-order quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(17)}$ and $T_D^{(17)}$ with no raw division by a zero-touching $y$ interval.

The corresponding post-seventeenth-order root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le16}(y,\nu)+y^{17}E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells. The post-seventeenth-order proof target is

$$
\mathcal H_{\varepsilon,17}(y,E,\nu)
=
\frac{R_{\varepsilon,E}(y,\nu)}{y^{21}}
=
\frac{H_\varepsilon(y,h_{\varepsilon,\le16}+y^{17}E,\nu)}{y^{17}},
$$

interpreted by Taylor cancellation rather than raw division. This is the next missing zero-safe evaluator; the sixteenth-order packet closes one more coefficient row but does not close this finite tail tube.

The exact pair-tail identity is

$$
T_D^{(17)}=-18T_G^{(17)}-y\partial_yT_G^{(17)}.
$$

Thus a sufficient proof may certify $T_D^{(17)}$ directly or certify a correlated $T_G^{(17)}$ derivative bound:

$$
\sup|T_G^{(17)}| < B_{G,17},
\qquad
18\sup|T_G^{(17)}|+\sup|y\partial_yT_G^{(17)}| < B_{D,17}.
$$

The global budget floors emitted by this packet are

$$
B_{G,17}^{\min}=4.04856409799\times10^{45},
\qquad
B_{D,17}^{\min}=4.0482963432\times10^{45}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{16,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{20}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$ through $Q_{G,16}$, and $Q_{D,1}$ through $Q_{D,16}$ coefficient intervals;
- linear-loss through sixteenth-order-loss and seventeenth-order-tail-budget rows on the first y cell;
- explicit open finite-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sixteenth-order-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_{16}$ solve rows, coefficient intervals, remaining post-seventeenth-order budget, overclaim rejection, and CLI write/validate behavior.

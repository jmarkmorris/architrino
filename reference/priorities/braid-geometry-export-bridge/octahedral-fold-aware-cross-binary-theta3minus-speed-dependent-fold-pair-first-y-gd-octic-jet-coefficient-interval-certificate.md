# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Octic-Jet Coefficient Interval Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-septic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-septic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant through septic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=\sum_{k=0}^{8}Q_{G,k}(\nu)y^k+O(y^9),
\qquad
Q_D(y,\nu)=\sum_{k=0}^{8}Q_{D,k}(\nu)y^k+O(y^9).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the octic coefficient row only. The remaining fold-pair blocker is now a finite ninth-order tail bound after the constant through octic coefficients.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Octic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+h_{7,\varepsilon}y^{10}+h_{8,\varepsilon}y^{11}+O(y^{12}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9-h_{7,\varepsilon}y^{10}-h_{8,\varepsilon}y^{11}+O(y^{12}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

This avoids the false mixed high-order slope produced by subtracting large correlated source-coefficient intervals. The certificate solves $h_{0,\varepsilon}$ through $h_{8,\varepsilon}$ from the $y^4$ through $y^{12}$ source-equation coefficients. The directed-rounded slope clearance remains uniform:

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
P=L+\sum_{m=2}^{10}P_my^m+O(y^{11}),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le8.
$$

The executable row records the interval identities

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le8.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{12}$ contain zero | `true` |
| maximum source-equation coefficient width through $y^{12}$ | $25.1967642016$ |
| $h_7$ interval hull | $[-457.447173269,-453.781098735]$ |
| $h_8$ interval hull | $[-792.598844507,792.598844507]$ |
| $Q_G(0)$ coefficient hull | $[0.0859249422975,0.0859859475716]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859859475716,-0.0859249422975]$ |
| $Q_{G,7}$ coefficient hull | $[-1.39097067855,1.39097067855]$ |
| $Q_{D,7}$ coefficient hull | $[-11.1277654284,11.1277654284]$ |
| $Q_{G,8}$ coefficient hull | $[343.42104202,360.345310256]$ |
| $Q_{D,8}$ coefficient hull | $[-3243.1077923,-3090.78937818]$ |
| maximum $Q_G$ septic loss on $0\le y\le0.001796875$ | $8.41284795135\times10^{-20}$ |
| maximum $Q_D$ septic loss on $0\le y\le0.001796875$ | $6.73027836108\times10^{-19}$ |
| maximum $Q_G$ octic loss on $0\le y\le0.001796875$ | $3.91617242628\times10^{-20}$ |
| maximum $Q_D$ octic loss on $0\le y\le0.001796875$ | $3.52455518365\times10^{-19}$ |
| minimum remaining $Q_G$ septic-tail budget | $1420625752900000000$ |
| minimum remaining $Q_D$ septic-tail budget | $1420531798760000000$ |
| minimum remaining $Q_G$ octic-tail budget | $790609114656000000000$ |
| minimum remaining $Q_D$ octic-tail budget | $790556827135000000000$ |
| minimum remaining $Q_G$ ninth-order-tail budget | $4.39991159461\times10^{23}$ |
| minimum remaining $Q_D$ ninth-order-tail budget | $4.39962060319\times10^{23}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-octic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_octic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, quintic, sextic, and septic coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-ninth-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by ninth-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The direct positive-y quotient rows cannot be converted into the first-y tail bound by quotient subtraction; the required cancellation is lost in interval arithmetic near $y=0$. After this packet, the exact quotient-tail quantities are

$$
T_G^{(9)}
=
\frac{Q_G-A_{G,8}}{y^9}
=
\frac{P-L-y^2A_{G,8}}{y^{11}},
\qquad
T_D^{(9)}
=
\frac{Q_D-A_{D,8}}{y^9}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,8}}{y^{11}},
$$

where $A_{G,8}$ and $A_{D,8}$ are the certified octic quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(9)}$ and $T_D^{(9)}$ with no raw division by a zero-touching $y$ interval.

The corresponding post-octic root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le8}(y,\nu)+y^9E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells. The post-octic proof target is

$$
\mathcal H_{\varepsilon,9}(y,E,\nu)
=
\frac{R_{\varepsilon,E}(y,\nu)}{y^{13}}
=
\frac{H_\varepsilon(y,h_{\varepsilon,\le8}+y^9E,\nu)}{y^9},
$$

interpreted by Taylor cancellation rather than raw division. This is the next missing zero-safe evaluator; the octic packet closes one more coefficient row but does not close this finite tail tube.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-octic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-octic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{8,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{12}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$ through $Q_{G,8}$, and $Q_{D,1}$ through $Q_{D,8}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, quartic-loss, quintic-loss, sextic-loss, septic-loss, octic-loss, tail-budget rows, and ninth-order-tail-budget rows on the first y cell;
- explicit open finite-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-octic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-octic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_8$ solve rows, coefficient intervals, remaining post-octic budget, overclaim rejection, and CLI write/validate behavior.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Quintic-Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant, linear, quadratic, cubic, and quartic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=Q_G(0,\nu)+Q_{G,1}(\nu)y+Q_{G,2}(\nu)y^2+Q_{G,3}(\nu)y^3+Q_{G,4}(\nu)y^4+Q_{G,5}(\nu)y^5+O(y^6),
\qquad
Q_D(y,\nu)=Q_D(0,\nu)+Q_{D,1}(\nu)y+Q_{D,2}(\nu)y^2+Q_{D,3}(\nu)y^3+Q_{D,4}(\nu)y^4+Q_{D,5}(\nu)y^5+O(y^6).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the quintic coefficient row only. Its immediate successor is the sextic coefficient row, now certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.md). The live fold-pair blocker is now a finite septic-tail bound after the constant through sextic coefficients.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Quintic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+O(y^9),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8+O(y^9).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

This avoids the false mixed high-order slope produced by subtracting large correlated source-coefficient intervals. The certificate then solves $h_{0,\varepsilon}$ through $h_{5,\varepsilon}$ from the $y^4$ through $y^9$ source-equation coefficients. The directed-rounded slope clearance is uniform:

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
P=L+P_2y^2+P_3y^3+P_4y^4+P_5y^5+P_6y^6+P_7y^7+O(y^8),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le5.
$$

The executable row records the interval identities

$$
Q_{D,0}+Q_{G,0}\ni0,\qquad
Q_{D,1}+2Q_{G,1}\ni0,\qquad
Q_{D,2}+3Q_{G,2}\ni0,\qquad
Q_{D,3}+4Q_{G,3}\ni0,\qquad
Q_{D,4}+5Q_{G,4}\ni0,\qquad
Q_{D,5}+6Q_{G,5}\ni0.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^9$ contain zero | `true` |
| $h_4$ interval hull | $[-16.9906831352,16.9906831352]$ |
| $h_5$ interval hull | $[96.4156422581,96.5713366207]$ |
| $Q_G(0)$ coefficient hull | $[0.0859249422975,0.0859859475716]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859859475716,-0.0859249422975]$ |
| $Q_{G,1}$ coefficient hull | $[-0.00003102074991,0.00003102074991]$ |
| $Q_{D,1}$ coefficient hull | $[-0.00006204149982,0.00006204149982]$ |
| $Q_{G,2}$ coefficient hull | $[-0.871804598401,-0.870942601635]$ |
| $Q_{D,2}$ coefficient hull | $[2.6128278049,2.6154137952]$ |
| $Q_{G,3}$ coefficient hull | $[-0.00110046379174,0.00110046379174]$ |
| $Q_{D,3}$ coefficient hull | $[-0.00440185516697,0.00440185516697]$ |
| $Q_{G,4}$ coefficient hull | $[6.82399504228,6.84166645451]$ |
| $Q_{D,4}$ coefficient hull | $[-34.2083322726,-34.1199752114]$ |
| $Q_{G,5}$ coefficient hull | $[-0.0390934301671,0.0390934301671]$ |
| $Q_{D,5}$ coefficient hull | $[-0.234560581002,0.234560581002]$ |
| maximum $Q_G$ quartic loss on $0\le y\le0.001796875$ | $7.13236176333\times10^{-11}$ |
| maximum $Q_D$ quartic loss on $0\le y\le0.001796875$ | $3.56618088167\times10^{-10}$ |
| maximum $Q_G$ quintic loss on $0\le y\le0.001796875$ | $7.32306872966\times10^{-16}$ |
| maximum $Q_D$ quintic loss on $0\le y\le0.001796875$ | $4.39384123779\times10^{-15}$ |
| minimum remaining $Q_G$ quartic-tail budget | $8242012756.11$ |
| minimum remaining $Q_D$ quartic-tail budget | $8241467664.48$ |
| minimum remaining $Q_G$ quintic-tail budget | $4586859272960$ |
| minimum remaining $Q_D$ quintic-tail budget | $4586555917620$ |
| minimum remaining $Q_G$ sextic-tail budget | $2552686899740000$ |
| minimum remaining $Q_D$ sextic-tail budget | $2552518075900000$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-quintic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_quintic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, and quartic coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The direct positive-y quotient rows cannot be converted into the first-y tail bound by quotient subtraction; the required cancellation is lost in interval arithmetic near $y=0$. The finite successor must instead be zero-safe. After this packet, the exact tail quantities are

$$
T_G^{(6)}
=
\frac{Q_G-A_{G,5}}{y^6}
=
\frac{P-L-y^2A_{G,5}}{y^8},
\qquad
T_D^{(6)}
=
\frac{Q_D-A_{D,5}}{y^6}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,5}}{y^8},
$$

where $A_{G,5}$ and $A_{D,5}$ are the certified quintic quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(6)}$ and $T_D^{(6)}$ with no raw division by a zero-touching $y$ interval.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{5,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^9$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$, $Q_{D,1}$, $Q_{G,2}$, $Q_{D,2}$, $Q_{G,3}$, $Q_{D,3}$, $Q_{G,4}$, $Q_{D,4}$, $Q_{G,5}$, and $Q_{D,5}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, quartic-loss, quintic-loss, first-order tail-budget, cubic-tail-budget, quartic-tail-budget, quintic-tail-budget, and sextic-tail-budget rows on the first y cell;
- explicit open sextic-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_5$ solve rows, coefficient intervals, remaining sextic-tail budget, overclaim rejection, and CLI write/validate behavior.

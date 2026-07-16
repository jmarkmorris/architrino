# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Sextic-Jet Coefficient Interval Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant, linear, quadratic, cubic, quartic, and quintic first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=Q_G(0,\nu)+Q_{G,1}(\nu)y+Q_{G,2}(\nu)y^2+Q_{G,3}(\nu)y^3+Q_{G,4}(\nu)y^4+Q_{G,5}(\nu)y^5+Q_{G,6}(\nu)y^6+O(y^7),
\qquad
Q_D(y,\nu)=Q_D(0,\nu)+Q_{D,1}(\nu)y+Q_{D,2}(\nu)y^2+Q_{D,3}(\nu)y^3+Q_{D,4}(\nu)y^4+Q_{D,5}(\nu)y^5+Q_{D,6}(\nu)y^6+O(y^7).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the sextic coefficient row only. The remaining fold-pair blocker is now a finite septic-tail bound after the constant through sextic coefficients.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Sextic Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+O(y^{10}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9+O(y^{10}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

This avoids the false mixed high-order slope produced by subtracting large correlated source-coefficient intervals. The certificate then solves $h_{0,\varepsilon}$ through $h_{6,\varepsilon}$ from the $y^4$ through $y^{10}$ source-equation coefficients. The directed-rounded slope clearance is uniform:

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
P=L+P_2y^2+P_3y^3+P_4y^4+P_5y^5+P_6y^6+P_7y^7+P_8y^8+O(y^9),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le6.
$$

The executable row records the interval identities

$$
Q_{D,0}+Q_{G,0}\ni0,\qquad
Q_{D,1}+2Q_{G,1}\ni0,\qquad
Q_{D,2}+3Q_{G,2}\ni0,\qquad
Q_{D,3}+4Q_{G,3}\ni0,\qquad
Q_{D,4}+5Q_{G,4}\ni0,\qquad
Q_{D,5}+6Q_{G,5}\ni0,\qquad
Q_{D,6}+7Q_{G,6}\ni0.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{10}$ contain zero | `true` |
| maximum source-equation coefficient width through $y^{10}$ | $0.707592624489$ |
| $h_5$ interval hull | $[96.4156422581,96.5713366207]$ |
| $h_6$ interval hull | $[-113.732732609,113.732732609]$ |
| $Q_G(0)$ coefficient hull | $[0.0859249422975,0.0859859475716]$ |
| $Q_D(0)$ coefficient hull | $[-0.0859859475716,-0.0859249422975]$ |
| $Q_{G,1}$ coefficient hull | $[-0.0000310207499135,0.0000310207499135]$ |
| $Q_{D,1}$ coefficient hull | $[-0.000062041499827,0.000062041499827]$ |
| $Q_{G,2}$ coefficient hull | $[-0.871804598401,-0.870942601634]$ |
| $Q_{D,2}$ coefficient hull | $[2.6128278049,2.6154137952]$ |
| $Q_{G,3}$ coefficient hull | $[-0.00110046379186,0.00110046379186]$ |
| $Q_{D,3}$ coefficient hull | $[-0.00440185516745,0.00440185516745]$ |
| $Q_{G,4}$ coefficient hull | $[6.82399504228,6.84166645451]$ |
| $Q_{D,4}$ coefficient hull | $[-34.2083322726,-34.1199752114]$ |
| $Q_{G,5}$ coefficient hull | $[-0.0390934301711,0.0390934301711]$ |
| $Q_{D,5}$ coefficient hull | $[-0.234560581027,0.234560581027]$ |
| $Q_{G,6}$ coefficient hull | $[-50.0073387163,-49.5009883682]$ |
| $Q_{D,6}$ coefficient hull | $[346.506918577,350.051371014]$ |
| maximum $Q_G$ quintic loss on $0\le y\le0.001796875$ | $7.32306873042\times10^{-16}$ |
| maximum $Q_D$ quintic loss on $0\le y\le0.001796875$ | $4.39384123825\times10^{-15}$ |
| maximum $Q_G$ sextic loss on $0\le y\le0.001796875$ | $1.68322022623\times10^{-15}$ |
| maximum $Q_D$ sextic loss on $0\le y\le0.001796875$ | $1.17825415836\times10^{-14}$ |
| minimum remaining $Q_G$ quintic-tail budget | $4586859272960$ |
| minimum remaining $Q_D$ quintic-tail budget | $4586555917620$ |
| minimum remaining $Q_G$ sextic-tail budget | $2552686899740000$ |
| minimum remaining $Q_D$ sextic-tail budget | $2552518075890000$ |
| minimum remaining $Q_G$ septic-tail budget | $1420625752900000000$ |
| minimum remaining $Q_D$ septic-tail budget | $1420531798760000000$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-sextic-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_sextic\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, and quintic coefficient claims.

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
T_G^{(7)}
=
\frac{Q_G-A_{G,6}}{y^7}
=
\frac{P-L-y^2A_{G,6}}{y^9},
\qquad
T_D^{(7)}
=
\frac{Q_D-A_{D,6}}{y^7}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,6}}{y^9},
$$

where $A_{G,6}$ and $A_{D,6}$ are the certified sextic quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(7)}$ and $T_D^{(7)}$ with no raw division by a zero-touching $y$ interval. The corresponding root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le6}(y,\nu)+y^7E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{6,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{10}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$, $Q_{D,1}$, $Q_{G,2}$, $Q_{D,2}$, $Q_{G,3}$, $Q_{D,3}$, $Q_{G,4}$, $Q_{D,4}$, $Q_{G,5}$, $Q_{D,5}$, $Q_{G,6}$, and $Q_{D,6}$ coefficient intervals;
- linear-loss, quadratic-loss, cubic-loss, quartic-loss, quintic-loss, sextic-loss, first-order tail-budget, cubic-tail-budget, quartic-tail-budget, quintic-tail-budget, sextic-tail-budget, and septic-tail-budget rows on the first y cell;
- explicit open septic-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_6$ solve rows, coefficient intervals, remaining post-sextic budget, overclaim rejection, and CLI write/validate behavior.

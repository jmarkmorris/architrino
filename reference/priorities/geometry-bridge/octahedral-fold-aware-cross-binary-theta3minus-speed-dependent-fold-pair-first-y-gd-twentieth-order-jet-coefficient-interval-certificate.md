# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twentieth-Order Jet Coefficient Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-nineteenth-order-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-nineteenth-order-jet-coefficient-interval-certificate.md). The predecessor interval-certifies the constant through nineteenth-order first-y quotient coefficients. This packet extends the zero-cell quotient jet by one more coefficient:

$$
Q_G(y,\nu)=\sum_{k=0}^{20}Q_{G,k}(\nu)y^k+O(y^{21}),
\qquad
Q_D(y,\nu)=\sum_{k=0}^{20}Q_{D,k}(\nu)y^k+O(y^{21}).
$$

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the twentieth-order coefficient row only. The remaining fold-pair blocker is now a finite twenty-first-order quotient tail bound after the constant through twentieth-order coefficients.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Twentieth-Order Jet

For branch sign $\varepsilon\in\{-1,+1\}$, extend the first-y series coordinates to

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+h_{1,\varepsilon}y^4+h_{2,\varepsilon}y^5+h_{3,\varepsilon}y^6+h_{4,\varepsilon}y^7+h_{5,\varepsilon}y^8+h_{6,\varepsilon}y^9+h_{7,\varepsilon}y^{10}+h_{8,\varepsilon}y^{11}+h_{9,\varepsilon}y^{12}+h_{10,\varepsilon}y^{13}+h_{11,\varepsilon}y^{14}+h_{12,\varepsilon}y^{15}+h_{13,\varepsilon}y^{16}+h_{14,\varepsilon}y^{17}+h_{15,\varepsilon}y^{18}+h_{16,\varepsilon}y^{19}+h_{17,\varepsilon}y^{20}+h_{18,\varepsilon}y^{21}+h_{19,\varepsilon}y^{22}+h_{20,\varepsilon}y^{23}+O(y^{24}),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3-h_{1,\varepsilon}y^4-h_{2,\varepsilon}y^5-h_{3,\varepsilon}y^6-h_{4,\varepsilon}y^7-h_{5,\varepsilon}y^8-h_{6,\varepsilon}y^9-h_{7,\varepsilon}y^{10}-h_{8,\varepsilon}y^{11}-h_{9,\varepsilon}y^{12}-h_{10,\varepsilon}y^{13}-h_{11,\varepsilon}y^{14}-h_{12,\varepsilon}y^{15}-h_{13,\varepsilon}y^{16}-h_{14,\varepsilon}y^{17}-h_{15,\varepsilon}y^{18}-h_{16,\varepsilon}y^{19}-h_{17,\varepsilon}y^{20}-h_{18,\varepsilon}y^{21}-h_{19,\varepsilon}y^{22}-h_{20,\varepsilon}y^{23}+O(y^{24}).
$$

The solve uses the fold-local slope

$$
S_\varepsilon=\varepsilon\,\beta F_{\delta\delta}.
$$

The certificate solves $h_{0,\varepsilon}$ through $h_{20,\varepsilon}$ from the $y^4$ through $y^{24}$ source-equation coefficients. The directed-rounded slope clearance remains uniform:

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
P=L+\sum_{m=2}^{22}P_my^m+O(y^{23}),
$$

then

$$
Q_{G,k}=P_{k+2},
\qquad
Q_{D,k}=-(k+1)P_{k+2},
\qquad
0\le k\le20.
$$

The executable row records the interval identities

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le20.
$$

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch cells | $256$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^{24}$ contain zero | `true` |
| maximum absolute source-equation coefficient interval through $y^{24}$ | $51362111900$ |
| $h_{16}$ interval hull | $[-17271814.3749,17271814.3749]$ |
| $h_{17}$ interval hull | $[-92883974.2782,93984211.6442]$ |
| $h_{18}$ interval hull | $[-568070538.977,568070538.977]$ |
| $h_{19}$ interval hull | $[-3325906465.83,3328122906.34]$ |
| $h_{20}$ interval hull | $[-19920693403.7,19920693403.7]$ |
| $Q_{G,16}$ coefficient hull | $[-12656271.9938,14024649.6393]$ |
| $Q_{D,16}$ coefficient hull | $[-238419043.867,215156623.895]$ |
| $Q_{G,17}$ coefficient hull | $[-79605963.3999,79605963.3999]$ |
| $Q_{D,17}$ coefficient hull | $[-1432907341.2,1432907341.2]$ |
| $Q_{G,18}$ coefficient hull | $[-479224364.929,470834512.97]$ |
| $Q_{D,18}$ coefficient hull | $[-8945855746.42,9105262933.66]$ |
| $Q_{G,19}$ coefficient hull | $[-2834624757.73,2834624757.73]$ |
| $Q_{D,19}$ coefficient hull | $[-56692495154.6,56692495154.6]$ |
| $Q_{G,20}$ coefficient hull | $[-16890597222.4,16939304773.1]$ |
| $Q_{D,20}$ coefficient hull | $[-355725400235,354702541670]$ |
| maximum $Q_G$ seventeenth-order coefficient loss on $0\le y\le0.001796875$ | $1.68946551251\times10^{-39}$ |
| maximum $Q_D$ seventeenth-order coefficient loss on $0\le y\le0.001796875$ | $3.04103792252\times10^{-38}$ |
| maximum $Q_G$ eighteenth-order coefficient loss on $0\le y\le0.001796875$ | $1.8275130427\times10^{-41}$ |
| maximum $Q_D$ eighteenth-order coefficient loss on $0\le y\le0.001796875$ | $3.47227478114\times10^{-40}$ |
| maximum $Q_G$ nineteenth-order coefficient loss on $0\le y\le0.001796875$ | $1.94238375392\times10^{-43}$ |
| maximum $Q_D$ nineteenth-order coefficient loss on $0\le y\le0.001796875$ | $3.88476750785\times10^{-42}$ |
| maximum $Q_G$ twentieth-order coefficient loss on $0\le y\le0.001796875$ | $2.08570513004\times10^{-45}$ |
| maximum $Q_D$ twentieth-order coefficient loss on $0\le y\le0.001796875$ | $4.37998077307\times10^{-44}$ |
| minimum remaining $Q_G$ seventeenth-order-tail budget | $4.04856409799\times10^{45}$ |
| minimum remaining $Q_D$ seventeenth-order-tail budget | $4.0482963432\times10^{45}$ |
| minimum remaining $Q_G$ eighteenth-order-tail budget | $2.25311393279\times10^{48}$ |
| minimum remaining $Q_D$ eighteenth-order-tail budget | $2.25296492143\times10^{48}$ |
| minimum remaining $Q_G$ nineteenth-order-tail budget | $1.25390688434\times10^{51}$ |
| minimum remaining $Q_D$ nineteenth-order-tail budget | $1.25382395628\times10^{51}$ |
| minimum remaining $Q_G$ twentieth-order-tail budget | $6.97826439979\times10^{53}$ |
| minimum remaining $Q_D$ twentieth-order-tail budget | $6.9778028871\times10^{53}$ |
| minimum remaining $Q_G$ twenty-first-order-tail budget | $3.88355583988\times10^{56}$ |
| minimum remaining $Q_D$ twenty-first-order-tail budget | $3.88329899804\times10^{56}$ |
| maximum absolute $Q_{D,17}+18Q_{G,17}$ identity interval | $2865814682.11$ |
| maximum absolute $Q_{D,18}+19Q_{G,18}$ identity interval | $18051118680.1$ |
| maximum absolute $Q_{D,19}+20Q_{G,19}$ identity interval | $113384990309$ |
| maximum absolute $Q_{D,20}+21Q_{G,20}$ identity interval | $710427941905$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twentieth-order-jet-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twentieth\_order\_jet\_coefficient\_enclosure=true}.
$$

It also imports the predecessor constant, linear, quadratic, cubic, quartic, quintic, sextic, septic, octic, nonic, decic, undecic, duodecic, tridecic, fourteenth-order, fifteenth-order, sixteenth-order, seventeenth-order, eighteenth-order, and nineteenth-order coefficient claims.

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
| `theta3minus.fold-pair-first-y-GD-seventeenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-eighteenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-nineteenth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twentieth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation` | zero-safe symbolic cancellation certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-twenty-first-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by twenty-first-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Tail Target

The twentieth-order coefficient row proves the leading coefficient of the post-twentieth-order tail, but it does not bound the continuous finite remainder. After this packet, the exact quotient-tail quantities are

$$
T_G^{(21)}
=
\frac{Q_G-A_{G,20}}{y^{21}}
=
\frac{P-L-y^2A_{G,20}}{y^{23}},
\qquad
T_D^{(21)}
=
\frac{Q_D-A_{D,20}}{y^{21}}
=
\frac{D_{\mathrm{pair}}-L-y^2A_{D,20}}{y^{23}},
$$

where $A_{G,20}$ and $A_{D,20}$ are the certified twentieth-order quotient jets. A full first-y enclosure requires directed-rounded bounds on $T_G^{(21)}$ and $T_D^{(21)}$ with no raw division by a zero-touching $y$ interval.

The corresponding post-twentieth-order root-graph prerequisite is a finite directed-rounded tail tube

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le20}(y,\nu)+y^{21}E_\varepsilon(y,\nu)
$$

over the same first-y cell and speed cells. The post-twentieth-order proof target is

$$
\mathcal H_{\varepsilon,21}(y,E,\nu)
=
\frac{R_{\varepsilon,E}(y,\nu)}{y^{25}}
=
\frac{H_\varepsilon(y,h_{\varepsilon,\le20}+y^{21}E,\nu)}{y^{21}},
$$

interpreted by Taylor cancellation rather than raw division. Equivalently, introduce the shift operator $\operatorname{Shift}_n$ by first certifying that coefficients below $y^n$ contain zero and then dropping those powers symbolically. The successor target must evaluate

$$
T_G^{(21)}
=
\operatorname{Shift}_{23}\!\left(P-L-y^2A_{G,20}\right),
\qquad
T_D^{(21)}
=
\operatorname{Shift}_{23}\!\left(D_{\mathrm{pair}}-L-y^2A_{D,20}\right),
$$

and

$$
\mathcal H_{\varepsilon,21}
=
\operatorname{Shift}_{21}\!\left(H_\varepsilon(y,h_{\varepsilon,\le20}+y^{21}E,\nu)\right).
$$

The zero-safe shifted-tail cancellation part of this route is now certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.md). The remaining missing evaluator is the finite $E_\varepsilon$ root-tail tube and the resulting continuous bounds on $T_G^{(21)}$ and $T_D^{(21)}$.

The exact pair-tail identity is

$$
T_D^{(21)}=-22T_G^{(21)}-y\partial_yT_G^{(21)}.
$$

Thus a sufficient proof may certify $T_D^{(21)}$ directly or certify a correlated $T_G^{(21)}$ derivative bound:

$$
\sup|T_G^{(21)}| < B_{G,21},
\qquad
22\sup|T_G^{(21)}|+\sup|y\partial_yT_G^{(21)}| < B_{D,21}.
$$

The global budget floors emitted by this packet are

$$
B_{G,21}^{\min}=3.88355583988\times10^{56},
\qquad
B_{D,21}^{\min}=3.88329899804\times10^{56}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $128$ speed cells;
- branch $h_{0,\varepsilon}$ through $h_{20,\varepsilon}$ interval rows;
- source-equation coefficient containment through $y^{24}$;
- $Q_G(0)$, $Q_D(0)$, $Q_{G,1}$ through $Q_{G,20}$, and $Q_{D,1}$ through $Q_{D,20}$ coefficient intervals;
- linear-loss through twentieth-order-loss and twenty-first-order-tail-budget rows on the first y cell;
- explicit open finite-tail, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_{20}$ solve rows, coefficient intervals, remaining post-twenty-first-order budget, overclaim rejection, and CLI write/validate behavior.

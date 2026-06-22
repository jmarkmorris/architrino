# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Thirtieth-Order Post-U Successor Coefficient Certificate

Promotion status: `priority-only`.

This packet continues the twenty-ninth-order post-$U$ successor coefficient
row. It certifies the next zero-touching seed coefficient,
$h_{30,\varepsilon}$, and the induced thirtieth-order quotient coefficients
$Q_{G,30}$ and $Q_{D,30}$. It converts the constant term of the
thirtieth-order quotient tail into a directed-rounded coefficient row; the
remaining quotient tail begins at order $31$.

No fixed speed band is imposed. The certificate uses only the certified positive
speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Successor Coefficient Equation

The root graph is extended to

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{29}h_{k,\varepsilon}y^{k+3}
+h_{30,\varepsilon}y^{33}
+O(y^{34}).
$$

The coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{34}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le29}+y^{30}X_\varepsilon,\nu)
\right)
=
C_{30,\varepsilon}(\nu)
+S_{30,\varepsilon}(\nu)X_\varepsilon
+O(y),
$$

with

$$
S_{30,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
X_\varepsilon(0,\nu)=h_{30,\varepsilon}(\nu).
$$

This is a coefficient solve one row beyond the already-certified
$h_{29,\varepsilon}$ row. It does not by itself certify a finite
$X_\varepsilon$ root-tail tube or retained branch status.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{29}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{34}$ contain zero after the $h_{30}$ solve | `true` |
| maximum source coefficient residual interval witness | $2.98167260632\times10^{18}$ |
| minimum $h_{30}$ solve-slope clearance | $0.792719244976$ |
| $h_{30}$ interval hull | $[-1.15251558957\times10^{18},1.15251558957\times10^{18}]$ |
| $Q_{G,30}$ interval hull | $[-9.81794132784\times10^{17},9.81794749250\times10^{17}]$ |
| $Q_{D,30}$ interval hull | $[-3.04356372268\times10^{19},3.04356181163\times10^{19}]$ |
| maximum $Q_G$ thirtieth-order coefficient loss on $0\le y\le0.001796875$ | $4.24186356908\times10^{-65}$ |
| maximum $Q_D$ thirtieth-order coefficient loss on $0\le y\le0.001796875$ | $1.31497770641\times10^{-63}$ |
| maximum $|Q_{D,30}+31Q_{G,30}|$ interval witness | $6.08712553431\times10^{19}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=30$ contain zero | `true` |
| minimum remaining $Q_G$ thirty-first-order-tail budget | $1.10675310889\times10^{84}$ |
| minimum remaining $Q_D$ thirty-first-order-tail budget | $1.1066799073\times10^{84}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-thirtieth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_thirtieth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It also certifies the coefficient identity containment

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le30.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-twenty-ninth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirtieth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirty-first-order-successor-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by thirty-first-order successor tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

Subsequent status: the thirty-first-order successor coefficient packet now
certifies the $T_G^{(31)},T_D^{(31)}$ constant row. The live blocker has moved
to the coefficient-preserving thirty-second-order successor tail after
$T_G^{(31)}=Q_{G,31}+yT_G^{(32)}$.

## Successor Tail Coordinate

The predecessor $h_{29}$ coefficient packet left

$$
T_G^{(30)}
=
\operatorname{Shift}_{32}\!\left(
P-L-y^2A_{G,29}
\right).
$$

This packet certifies the constant coefficient of that shifted quotient:

$$
T_G^{(30)}
=
Q_{G,30}
+yT_G^{(31)}.
$$

Equivalently,

$$
A_{G,30}=A_{G,29}+Q_{G,30}y^{30},
\qquad
T_G^{(31)}
=
\operatorname{Shift}_{33}\!\left(
P-L-y^2A_{G,30}
\right),
$$

and

$$
A_{D,30}=A_{D,29}+Q_{D,30}y^{30},
\qquad
T_D^{(31)}
=
\operatorname{Shift}_{33}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,30}
\right).
$$

The next correlated identity is therefore

$$
T_D^{(31)}
=
-32T_G^{(31)}
-\mathcal D_y^{(X)}T_G^{(31)},
\qquad
\mathcal D_y^{(X)}=y\partial_y+\Xi_\varepsilon\partial_X.
$$

The new quotient-tail budget floors are

$$
B_{G,31}=1.10675310889\times10^{84},
\qquad
B_{D,31}=1.1066799073\times10^{84}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirtieth-order-post-u-successor-coefficient-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirtieth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{30}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{34}$ after the
  $h_{30}$ solve;
- induced $Q_{G,30}$ and $Q_{D,30}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,30}+31Q_{G,30}\ni0$;
- inherited $h_{29}$, $Q_{G,29}$, and $Q_{D,29}$ provenance;
- explicit open continuous tail, full quotient, scaled-remainder, `I1`, and
  retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirtieth-order-post-u-successor-coefficient-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirtieth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{30}$ and
$Q_{G,30},Q_{D,30}$ intervals, the $Q_D+31Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

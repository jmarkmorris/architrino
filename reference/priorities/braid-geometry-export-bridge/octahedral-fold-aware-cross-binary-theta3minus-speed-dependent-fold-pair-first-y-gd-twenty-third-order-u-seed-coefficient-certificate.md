# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Third-Order U-Seed Coefficient Certificate

Promotion status: `priority-only`.

This packet continues the finite $\operatorname{Shift}_{25}$ $E_\varepsilon$
root-tail tube and the twenty-second-order post-seed coefficient row. It
advances the zero-touching first-y blocker by switching to the sharper
post-seed coordinate

$$
E_\varepsilon(y,\nu)
=
h_{21,\varepsilon}(\nu)
+yh_{22,\varepsilon}(\nu)
+y^2U_\varepsilon(y,\nu),
$$

equivalently

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le22}(y,\nu)
+y^{23}U_\varepsilon(y,\nu).
$$

The certificate solves the seed value

$$
U_\varepsilon(0,\nu)=h_{23,\varepsilon}(\nu)
$$

and the induced twenty-third-order quotient coefficients
$Q_{G,23}$ and $Q_{D,23}$. It is not a finite
$U_\varepsilon(y,\nu)$ tube, not a continuous quotient-tail enclosure, and not
full $\theta_{3-}^{-}$ collar closure.

No fixed speed band is imposed. The certificate uses only the certified positive
speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## U-Seed Equation

The root graph is extended to

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{23}h_{k,\varepsilon}y^{k+3}
+O(y^{27}).
$$

The $U$ seed is the coefficient selected by the shifted source equation

$$
\operatorname{Shift}_{27}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le22}+y^{23}U,\nu)
\right)
=
C_{23,\varepsilon}(\nu)+S_{23,\varepsilon}(\nu)U+O(y),
$$

with

$$
S_{23,\varepsilon}=\varepsilon\beta F_{\delta\delta}.
$$

This is the first coefficient of the finite $U_\varepsilon$ tube, not the tube
itself.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| all source-equation coefficients $y^0$ through $y^{27}$ contain zero after the $h_{23}$ solve | `true` |
| maximum source coefficient residual interval witness | $1.09135996267\times10^{13}$ |
| minimum $h_{23}$ solve-slope clearance | $0.792719244976$ |
| $h_{23}$ interval hull | $[-4218031991090,4218902780690]$ |
| $Q_{G,23}$ interval hull | $[-3594155902090,3594155902090]$ |
| $Q_{D,23}$ interval hull | $[-86259741650100,86259741650100]$ |
| maximum $Q_G$ twenty-third-order coefficient loss on $0\le y\le0.001796875$ | $2.56748454409\times10^{-51}$ |
| maximum $Q_D$ twenty-third-order coefficient loss on $0\le y\le0.001796875$ | $6.1619629058\times10^{-50}$ |
| maximum $|Q_{D,23}+24Q_{G,23}|$ interval witness | $1.725194833\times10^{14}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=23$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-fourth-order-tail budget | $6.69384967266\times10^{64}$ |
| minimum remaining $Q_D$ twenty-fourth-order-tail budget | $6.69340696994\times10^{64}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-third-order-u-seed-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_third\_order\_u\_seed\_coefficient\_enclosure=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_root\_tail\_tube=false},
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
| `theta3minus.fold-pair-first-y-GD-twenty-second-order-post-seed-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift25-E-root-tail-tube` | directed-rounded positive-y certified |
| `theta3minus.fold-pair-first-y-GD-positive-GD-quotient-subcells` | directed-rounded positive-y certified |
| `theta3minus.fold-pair-first-y-GD-twenty-third-order-u-seed-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-fourth-order-U-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by the finite $U_\varepsilon$ tube and twenty-fourth-order $G,D$ tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Equation

With

$$
A_{G,23}(y,\nu)=\sum_{k=0}^{23}Q_{G,k}(\nu)y^k,
\qquad
A_{D,23}(y,\nu)=\sum_{k=0}^{23}Q_{D,k}(\nu)y^k,
$$

the next zero-safe tail is

$$
T_G^{(24)}
=
\operatorname{Shift}_{26}\!\left(
P-L-y^2A_{G,23}
\right),
\qquad
Q_G=A_{G,23}+y^{24}T_G^{(24)},
$$

and

$$
T_D^{(24)}
=
\operatorname{Shift}_{26}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,23}
\right),
\qquad
Q_D=A_{D,23}+y^{24}T_D^{(24)}.
$$

The correlated identity is now

$$
T_D^{(24)}
=
-25T_G^{(24)}
-y\partial_yT_G^{(24)}.
$$

The next executable closure target is therefore

$$
\sup_{0\le y\le0.001796875}|T_G^{(24)}|
<6.69384967266\times10^{64},
$$

$$
\sup_{0\le y\le0.001796875}|T_D^{(24)}|
<6.69340696994\times10^{64}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{23}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{27}$ after the
  $U$ seed solve;
- induced $Q_{G,23}$ and $Q_{D,23}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,23}+24Q_{G,23}\ni0$;
- explicit open finite-$U$-tube, finite-remainder, full quotient,
  scaled-remainder, `I1`, and retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-third-order-u-seed-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{23}$ and
$Q_{G,23},Q_{D,23}$ intervals, the $Q_D+24Q_G$ identity interval,
overclaim rejection, and CLI write/validate behavior.

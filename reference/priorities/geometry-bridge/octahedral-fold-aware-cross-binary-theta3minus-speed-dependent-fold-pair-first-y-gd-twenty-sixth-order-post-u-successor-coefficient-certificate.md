# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Sixth-Order Post-U Successor Coefficient Certificate

Promotion status: `priority-only`.

This packet continues the twenty-fifth-order post-$U$ successor coefficient
row. It certifies the next zero-touching seed coefficient,
$h_{26,\varepsilon}$, and the induced twenty-sixth-order quotient coefficients
$Q_{G,26}$ and $Q_{D,26}$. It does not close the finite successor root-tail
tube, the continuous quotient tail, or retained branch status.

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
+\sum_{k=0}^{25}h_{k,\varepsilon}y^{k+3}
+h_{26,\varepsilon}y^{29}
+O(y^{30}).
$$

The new coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{30}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le25}+y^{26}Z_\varepsilon,\nu)
\right)
=
C_{26,\varepsilon}(\nu)
+S_{26,\varepsilon}(\nu)Z_\varepsilon
+O(y),
$$

with

$$
S_{26,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
Z_\varepsilon(0,\nu)=h_{26,\varepsilon}(\nu).
$$

This is a coefficient solve beyond the post-$U$ row. It is not a finite
$Z_\varepsilon(y,\nu)$ tube and not a continuous $G,D$ tail enclosure.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{25}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{30}$ contain zero after the $h_{26}$ solve | `true` |
| maximum source coefficient residual interval witness | $2.34993657484\times10^{15}$ |
| minimum $h_{26}$ solve-slope clearance | $0.792719244976$ |
| $h_{26}$ interval hull | $[-908343826729000,908343826729000]$ |
| $Q_{G,26}$ interval hull | $[-773778357003000,773775566334000]$ |
| $Q_{D,26}$ interval hull | $[-20891940291000000,20892015639100000]$ |
| maximum $Q_G$ twenty-sixth-order coefficient loss on $0\le y\le0.001796875$ | $3.20686814548\times10^{-57}$ |
| maximum $Q_D$ twenty-sixth-order coefficient loss on $0\le y\le0.001796875$ | $8.65854399279\times10^{-56}$ |
| maximum $|Q_{D,26}+27Q_{G,26}|$ interval witness | $4.17839559301\times10^{16}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=26$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-seventh-order-tail budget | $1.15377790014\times10^{73}$ |
| minimum remaining $Q_D$ twenty-seventh-order-tail budget | $1.15370158828\times10^{73}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_sixth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_successor\_root\_tail\_tube=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
$$

$$
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-twenty-fifth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by finite successor tube and twenty-seventh-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The coefficient row exposes the correct next root-tail coordinate. Define

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le25}(y,\nu)
+y^{26}Z_\varepsilon(y,\nu),
$$

so that

$$
Z_\varepsilon(0,\nu)=h_{26,\varepsilon}(\nu).
$$

The finite successor tube should use the shifted residual

$$
R_{\varepsilon,31}(y,Z,\nu)
=
\operatorname{Shift}_{31}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le25}+y^{26}Z,\nu)
\right).
$$

The expected branch orientation is inherited from the fold-local slope

$$
\partial_ZR_{\varepsilon,31}=J_\varepsilon.
$$

After that finite next-successor $Z_\varepsilon$ tube is certified, the
quotient-tail successor is

$$
T_G^{(27)}
=
\operatorname{Shift}_{29}\!\left(
P-L-y^2A_{G,26}
\right),
\qquad
Q_G=A_{G,26}+y^{27}T_G^{(27)},
$$

and

$$
T_D^{(27)}
=
\operatorname{Shift}_{29}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,26}
\right),
\qquad
Q_D=A_{D,26}+y^{27}T_D^{(27)}.
$$

The correlated identity is

$$
T_D^{(27)}
=
-28T_G^{(27)}
-y\partial_yT_G^{(27)}.
$$

The next quotient-tail budget floors are

$$
B_{G,27}=1.15377790014\times10^{73},
\qquad
B_{D,27}=1.15370158828\times10^{73}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{26}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{30}$ after the
  $h_{26}$ solve;
- induced $Q_{G,26}$ and $Q_{D,26}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,26}+27Q_{G,26}\ni0$;
- inherited $h_{25}$, $Q_{G,25}$, and $Q_{D,25}$ provenance;
- explicit open finite successor tube, continuous tail, full quotient,
  scaled-remainder, `I1`, and retention rows.

The companion test
[neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{26}$ and
$Q_{G,26},Q_{D,26}$ intervals, the $Q_D+27Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

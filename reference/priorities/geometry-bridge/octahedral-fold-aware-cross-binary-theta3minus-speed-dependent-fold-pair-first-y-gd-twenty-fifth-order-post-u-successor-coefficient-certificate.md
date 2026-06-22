# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Fifth-Order Post-U Successor Coefficient Certificate

Promotion status: `priority-only`.

This packet continues the twenty-fourth-order post-$U$ coefficient row. It
certifies the next zero-touching seed coefficient, $h_{25,\varepsilon}$, and the
induced twenty-fifth-order quotient coefficients $Q_{G,25}$ and $Q_{D,25}$. It
does not close the finite successor root-tail tube, the continuous quotient
tail, or retained branch status.

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
+O(y^{29}).
$$

The new coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{29}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le24}+y^{25}Z_\varepsilon,\nu)
\right)
=
C_{25,\varepsilon}(\nu)
+S_{25,\varepsilon}(\nu)Z_\varepsilon
+O(y),
$$

with

$$
S_{25,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
Z_\varepsilon(0,\nu)=h_{25,\varepsilon}(\nu).
$$

This is a coefficient solve beyond the post-$U$ row. It is not a finite
$Z_\varepsilon(y,\nu)$ tube and not a continuous $G,D$ tail enclosure.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{24}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{29}$ contain zero after the $h_{25}$ solve | `true` |
| maximum source coefficient residual interval witness | $3.93736271176\times10^{14}$ |
| minimum $h_{25}$ solve-slope clearance | $0.792719244976$ |
| $h_{25}$ interval hull | $[-152196183760000,152188011264000]$ |
| $Q_{G,25}$ interval hull | $[-129647700798000,129647700798000]$ |
| $Q_{D,25}$ interval hull | $[-3370840220760000,3370840220760000]$ |
| maximum $Q_G$ twenty-fifth-order coefficient loss on $0\le y\le0.001796875$ | $2.9902774001\times10^{-55}$ |
| maximum $Q_D$ twenty-fifth-order coefficient loss on $0\le y\le0.001796875$ | $7.77472124027\times10^{-54}$ |
| maximum $|Q_{D,25}+26Q_{G,25}|$ interval witness | $6.74168044152\times10^{15}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=25$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-sixth-order-tail budget | $2.07319466431\times10^{70}$ |
| minimum remaining $Q_D$ twenty-sixth-order-tail budget | $2.07305754145\times10^{70}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-fifth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_fifth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
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
| `theta3minus.fold-pair-first-y-GD-twenty-fourth-order-post-U-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-fifth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift29-successor-root-tail-tube` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-twenty-sixth-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by finite successor tube and twenty-sixth-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The coefficient row exposes the correct next root-tail coordinate. Define

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le24}(y,\nu)
+y^{25}Z_\varepsilon(y,\nu),
$$

so that

$$
Z_\varepsilon(0,\nu)=h_{25,\varepsilon}(\nu).
$$

The finite successor tube should use the shifted residual

$$
R_{\varepsilon,29}(y,Z,\nu)
=
\operatorname{Shift}_{29}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le24}+y^{25}Z,\nu)
\right).
$$

The expected branch orientation is inherited from the fold-local slope

$$
\partial_ZR_{\varepsilon,29}=J_\varepsilon.
$$

After that finite $Z_\varepsilon$ tube is certified, the quotient-tail successor
is

$$
T_G^{(26)}
=
\operatorname{Shift}_{28}\!\left(
P-L-y^2A_{G,25}
\right),
\qquad
Q_G=A_{G,25}+y^{26}T_G^{(26)},
$$

and

$$
T_D^{(26)}
=
\operatorname{Shift}_{28}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,25}
\right),
\qquad
Q_D=A_{D,25}+y^{26}T_D^{(26)}.
$$

The correlated identity is

$$
T_D^{(26)}
=
-27T_G^{(26)}
-y\partial_yT_G^{(26)}.
$$

The next quotient-tail budget floors are

$$
B_{G,26}=2.07319466431\times10^{70},
\qquad
B_{D,26}=2.07305754145\times10^{70}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fifth-order-post-u-successor-coefficient-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fifth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{25}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{29}$ after the
  $h_{25}$ solve;
- induced $Q_{G,25}$ and $Q_{D,25}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,25}+26Q_{G,25}\ni0$;
- inherited $h_{24}$, $Q_{G,24}$, and $Q_{D,24}$ provenance;
- explicit open finite successor tube, continuous tail, full quotient,
  scaled-remainder, `I1`, and retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fifth-order-post-u-successor-coefficient-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fifth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{25}$ and
$Q_{G,25},Q_{D,25}$ intervals, the $Q_D+26Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Thirty-Second-Order Post-U Successor Coefficient Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues the coefficient-preserving post-$U$ successor row after
the certified $h_{31,\varepsilon}$ packet. It certifies the next zero-touching
seed coefficient, $h_{32,\varepsilon}$, and the induced thirty-second-order
quotient coefficients $Q_{G,32}$ and $Q_{D,32}$. It converts the constant term
of the $T_G^{(32)},T_D^{(32)}$ quotient tails into a directed-rounded
coefficient row; the remaining quotient tail begins at order $33$.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

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
+\sum_{k=0}^{31}h_{k,\varepsilon}y^{k+3}
+h_{32,\varepsilon}y^{35}
+O(y^{36}).
$$

The coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{36}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le31}+y^{32}X_{32,\varepsilon},\nu)
\right)
=
C_{32,\varepsilon}(\nu)
+S_{32,\varepsilon}(\nu)X_{32,\varepsilon}
+O(y),
$$

with

$$
S_{32,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
X_{32,\varepsilon}(0,\nu)=h_{32,\varepsilon}(\nu).
$$

This is a coefficient solve one row beyond the already-certified
$h_{31,\varepsilon}$ row. It does not by itself certify a finite
$X_{32,\varepsilon}$ root-tail tube or retained branch status.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{31}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{36}$ contain zero after the $h_{32}$ solve | `true` |
| maximum source coefficient residual interval witness | $1.06209247890\times10^{20}$ |
| minimum $h_{32}$ solve-slope clearance | $0.792719244976$ |
| $h_{32}$ interval hull | $[-4.10533911463\times10^{19},4.10533911463\times10^{19}]$ |
| $Q_{G,32}$ interval hull | $[-3.49722356695\times10^{19},3.49722268609\times10^{19}]$ |
| $Q_{D,32}$ interval hull | $[-1.15408348641\times10^{21},1.15408377709\times10^{21}]$ |
| maximum $Q_G$ thirty-second-order coefficient loss on $0\le y\le0.001796875$ | $4.87859897457\times10^{-69}$ |
| maximum $Q_D$ thirty-second-order coefficient loss on $0\le y\le0.001796875$ | $1.60993766161\times10^{-67}$ |
| maximum $|Q_{D,32}+33Q_{G,32}|$ interval witness | $2.30816726350\times10^{21}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=32$ contain zero | `true` |
| minimum remaining $Q_G$ thirty-third-order-tail budget | $3.42779639624\times10^{89}$ |
| minimum remaining $Q_D$ thirty-third-order-tail budget | $3.42756967887\times10^{89}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-thirty-second-order-post-U-successor-coefficient-certified}.
}
$$

Subsequent status: the thirty-third- through thirty-seventh-order post-$U$
successor coefficient packets now certify $h_{33,\varepsilon}$ through
$h_{37,\varepsilon}$ and the corresponding $Q_G,Q_D$ rows through
$Q_{D,37}+38Q_{G,37}\ni0$. The live blocker has moved from the
thirty-third-order successor tail to the coefficient-preserving
thirty-eighth-order successor tail, with budget floors
$B_{G,38}=1.82989295868\times10^{103}$ and
$B_{D,38}=1.82977192800\times10^{103}$.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_thirty\_second\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It also certifies the coefficient identity containment

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le32.
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
| `theta3minus.fold-pair-first-y-GD-thirty-first-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirty-second-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirty-third-order-successor-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by thirty-third-order successor tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The predecessor $h_{31}$ coefficient packet left

$$
T_G^{(32)}
=
\operatorname{Shift}_{34}\!\left(
P-L-y^2A_{G,31}
\right).
$$

This packet certifies the constant coefficient of that shifted quotient:

$$
T_G^{(32)}
=
Q_{G,32}
+yT_G^{(33)}.
$$

Equivalently,

$$
A_{G,32}=A_{G,31}+Q_{G,32}y^{32},
\qquad
T_G^{(33)}
=
\operatorname{Shift}_{35}\!\left(
P-L-y^2A_{G,32}
\right),
$$

and

$$
A_{D,32}=A_{D,31}+Q_{D,32}y^{32},
\qquad
T_D^{(33)}
=
\operatorname{Shift}_{35}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,32}
\right).
$$

The next correlated identity is therefore

$$
T_D^{(33)}
=
-34T_G^{(33)}
-\mathcal D_y^{(X_{33})}T_G^{(33)},
\qquad
\mathcal D_y^{(X_{33})}
=
y\partial_y+\Xi_\varepsilon\partial_{X_{33}}.
$$

The new quotient-tail budget floors are

$$
B_{G,33}=3.42779639624\times10^{89},
\qquad
B_{D,33}=3.42756967887\times10^{89}.
$$

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-second-order-post-u-successor-coefficient-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-second-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{32}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{36}$ after the
  $h_{32}$ solve;
- induced $Q_{G,32}$ and $Q_{D,32}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,32}+33Q_{G,32}\ni0$;
- inherited $h_{31}$, $Q_{G,31}$, and $Q_{D,31}$ provenance;
- explicit open continuous tail, full quotient, scaled-remainder, `I1`, and
  retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-second-order-post-u-successor-coefficient-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-second-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{32}$ and
$Q_{G,32},Q_{D,32}$ intervals, the $Q_D+33Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

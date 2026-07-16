# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Ninth-Order Post-U Successor Coefficient Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues the twenty-eighth-order post-$U$ successor coefficient
row. It certifies the next zero-touching seed coefficient,
$h_{29,\varepsilon}$, and the induced twenty-ninth-order quotient
coefficients $Q_{G,29}$ and $Q_{D,29}$. It converts the constant term of the
twenty-ninth-order quotient tail into a directed-rounded coefficient row; the
remaining quotient tail begins at order $30$.

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
+\sum_{k=0}^{28}h_{k,\varepsilon}y^{k+3}
+h_{29,\varepsilon}y^{32}
+O(y^{33}).
$$

The coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{33}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le28}+y^{29}V_\varepsilon,\nu)
\right)
=
C_{29,\varepsilon}(\nu)
+S_{29,\varepsilon}(\nu)V_\varepsilon
+O(y),
$$

with

$$
S_{29,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
V_\varepsilon(0,\nu)=h_{29,\varepsilon}(\nu).
$$

This is a coefficient solve one row beyond the already-certified
$h_{28,\varepsilon}$ row. It does not by itself certify a finite
$V_\varepsilon$ root-tail tube or retained branch status.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{28}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{33}$ contain zero after the $h_{29}$ solve | `true` |
| maximum source coefficient residual interval witness | $4.99584408557\times10^{17}$ |
| minimum $h_{29}$ solve-slope clearance | $0.792719244976$ |
| $h_{29}$ interval hull | $[-1.93106192270\times10^{17},1.93105617963\times10^{17}]$ |
| $Q_{G,29}$ interval hull | $[-1.64501288268\times10^{17},1.64501288268\times10^{17}]$ |
| $Q_{D,29}$ interval hull | $[-4.93503864803\times10^{18},4.93503864803\times10^{18}]$ |
| maximum $Q_G$ twenty-ninth-order coefficient loss on $0\le y\le0.001796875$ | $3.9553728496\times10^{-63}$ |
| maximum $Q_D$ twenty-ninth-order coefficient loss on $0\le y\le0.001796875$ | $1.18661185488\times10^{-61}$ |
| maximum $|Q_{D,29}+30Q_{G,29}|$ interval witness | $9.87007729606\times10^{18}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=29$ contain zero | `true` |
| minimum remaining $Q_G$ thirtieth-order-tail budget | $1.98869699254\times10^{81}$ |
| minimum remaining $Q_D$ thirtieth-order-tail budget | $1.98856545843\times10^{81}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-ninth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_ninth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It also certifies the coefficient identity containment

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le29.
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
| `theta3minus.fold-pair-first-y-GD-twenty-eighth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube` | directed-rounded positive-y certified by the separate $W_\varepsilon$ packet |
| `theta3minus.fold-pair-first-y-GD-twenty-ninth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-thirtieth-order-post-U-successor-coefficient` | directed-rounded interval certified by the successor packet |
| `theta3minus.fold-pair-first-y-GD-thirty-first-order-successor-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by thirty-first-order successor tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The predecessor $h_{28}$ coefficient packet left

$$
T_G^{(29)}
=
\operatorname{Shift}_{31}\!\left(
P-L-y^2A_{G,28}
\right).
$$

This packet certifies the constant coefficient of that shifted quotient:

$$
T_G^{(29)}
=
Q_{G,29}
+yT_G^{(30)}.
$$

Equivalently,

$$
A_{G,29}=A_{G,28}+Q_{G,29}y^{29},
\qquad
T_G^{(30)}
=
\operatorname{Shift}_{32}\!\left(
P-L-y^2A_{G,29}
\right),
$$

and

$$
A_{D,29}=A_{D,28}+Q_{D,29}y^{29},
\qquad
T_D^{(30)}
=
\operatorname{Shift}_{32}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,29}
\right).
$$

The next correlated identity is therefore

$$
T_D^{(30)}
=
-31T_G^{(30)}
-\mathcal D_y^{(V)}T_G^{(30)},
\qquad
\mathcal D_y^{(V)}=y\partial_y+\Xi_\varepsilon\partial_V.
$$

The new quotient-tail budget floors are

$$
B_{G,30}=1.98869699254\times10^{81},
\qquad
B_{D,30}=1.98856545843\times10^{81}.
$$

Subsequent status: the thirtieth-order successor coefficient packet now
certifies the constant term of this $T_G^{(30)},T_D^{(30)}$ row. The live
successor is therefore the thirty-first-order tail, not this thirtieth-order
constant coefficient.

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-ninth-order-post-u-successor-coefficient-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-ninth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{29}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{33}$ after the
  $h_{29}$ solve;
- induced $Q_{G,29}$ and $Q_{D,29}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,29}+30Q_{G,29}\ni0$;
- inherited $h_{28}$, $Q_{G,28}$, and $Q_{D,28}$ provenance;
- explicit open continuous tail, full quotient, scaled-remainder, `I1`, and
  retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-ninth-order-post-u-successor-coefficient-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-ninth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{29}$ and
$Q_{G,29},Q_{D,29}$ intervals, the $Q_D+30Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

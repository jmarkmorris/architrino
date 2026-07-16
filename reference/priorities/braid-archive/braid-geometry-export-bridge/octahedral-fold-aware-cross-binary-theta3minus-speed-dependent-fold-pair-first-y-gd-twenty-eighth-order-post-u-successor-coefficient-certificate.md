# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Eighth-Order Post-U Successor Coefficient Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues the twenty-seventh-order post-$U$ successor coefficient
row. It certifies the next zero-touching seed coefficient,
$h_{28,\varepsilon}$, and the induced twenty-eighth-order quotient
coefficients $Q_{G,28}$ and $Q_{D,28}$. It converts the constant term of the
twenty-eighth-order quotient tail into a directed-rounded coefficient row; the
remaining quotient tail begins at order $29$.

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
+\sum_{k=0}^{27}h_{k,\varepsilon}y^{k+3}
+h_{28,\varepsilon}y^{31}
+O(y^{32}).
$$

The coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{32}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le27}+y^{28}X_\varepsilon,\nu)
\right)
=
C_{28,\varepsilon}(\nu)
+S_{28,\varepsilon}(\nu)X_\varepsilon
+O(y),
$$

with

$$
S_{28,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
X_\varepsilon(0,\nu)=h_{28,\varepsilon}(\nu).
$$

This is a coefficient solve one row beyond the already-certified
$W_\varepsilon$ chart. It does not by itself certify a finite
$X_\varepsilon$ root-tail tube or retained branch status.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| predecessor $h_{27}$ artifact valid | `true` |
| all source-equation coefficients $y^0$ through $y^{32}$ contain zero after the $h_{28}$ solve | `true` |
| maximum source coefficient residual interval witness | $8.37062477418\times10^{16}$ |
| minimum $h_{28}$ solve-slope clearance | $0.792719244976$ |
| $h_{28}$ interval hull | $[-3.23553241084\times10^{16},3.23553241084\times10^{16}]$ |
| $Q_{G,28}$ interval hull | $[-2.75624779878\times10^{16},2.75624540089\times10^{16}]$ |
| $Q_{D,28}$ interval hull | $[-7.99311166258\times10^{17},7.99311861646\times10^{17}]$ |
| maximum $Q_G$ twenty-eighth-order coefficient loss on $0\le y\le0.001796875$ | $3.68823443529\times10^{-61}$ |
| maximum $Q_D$ twenty-eighth-order coefficient loss on $0\le y\le0.001796875$ | $1.06958798623\times10^{-59}$ |
| maximum $|Q_{D,28}+29Q_{G,28}|$ interval witness | $1.5986230279\times10^{18}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=28$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-ninth-order-tail budget | $3.57343990847\times10^{78}$ |
| minimum remaining $Q_D$ twenty-ninth-order-tail budget | $3.57320355812\times10^{78}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-eighth-order-post-U-successor-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_eighth\_order\_post\_u\_successor\_coefficient\_enclosure=true}.
$$

It also certifies the coefficient identity containment

$$
Q_{D,k}+(k+1)Q_{G,k}\ni0,
\qquad
0\le k\le28.
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
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube` | directed-rounded positive-y certified by the separate $W_\varepsilon$ packet |
| `theta3minus.fold-pair-first-y-GD-twenty-eighth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-ninth-order-post-U-successor-coefficient` | directed-rounded interval certified by the successor packet |
| `theta3minus.fold-pair-first-y-GD-thirtieth-order-successor-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by thirtieth-order successor tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Coordinate

The previous lower-cancellation packet licensed

$$
T_G^{(28)}
=
\operatorname{Shift}_{30}\!\left(
P-L-y^2A_{G,27}
\right).
$$

This packet certifies the constant coefficient of that shifted quotient:

$$
T_G^{(28)}
=
Q_{G,28}
+yT_G^{(29)}.
$$

Equivalently,

$$
A_{G,28}=A_{G,27}+Q_{G,28}y^{28},
\qquad
T_G^{(29)}
=
\operatorname{Shift}_{31}\!\left(
P-L-y^2A_{G,28}
\right),
$$

and

$$
A_{D,28}=A_{D,27}+Q_{D,28}y^{28},
\qquad
T_D^{(29)}
=
\operatorname{Shift}_{31}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,28}
\right).
$$

The next correlated identity is therefore

$$
T_D^{(29)}
=
-30T_G^{(29)}
-\mathcal D_y^{(X)}T_G^{(29)},
\qquad
\mathcal D_y^{(X)}=y\partial_y+\Xi_\varepsilon\partial_X.
$$

The new quotient-tail budget floors are

$$
B_{G,29}=3.57343990847\times10^{78},
\qquad
B_{D,29}=3.57320355812\times10^{78}.
$$

Subsequent status: the twenty-ninth-order successor coefficient packet now
certifies the constant term of this $T_G^{(29)},T_D^{(29)}$ row. The live
successor is therefore the thirtieth-order tail, not this twenty-ninth-order
constant coefficient.

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-eighth-order-post-u-successor-coefficient-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-eighth-order-post-u-successor-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{28}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{32}$ after the
  $h_{28}$ solve;
- induced $Q_{G,28}$ and $Q_{D,28}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,28}+29Q_{G,28}\ni0$;
- inherited $h_{27}$, $Q_{G,27}$, and $Q_{D,27}$ provenance;
- explicit open continuous tail, full quotient, scaled-remainder, `I1`, and
  retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-eighth-order-post-u-successor-coefficient-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-eighth-order-post-u-successor-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{28}$ and
$Q_{G,28},Q_{D,28}$ intervals, the $Q_D+29Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

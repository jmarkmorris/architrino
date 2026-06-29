# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Fourth-Order Post-U Coefficient Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues the $U$-seed coefficient solve and the finite
$\operatorname{Shift}_{27}$ $U_\varepsilon$ root-tail tube. It does not close
the continuous $U_\varepsilon$-coordinate quotient tail. Its advance is the next
zero-touching coefficient: $h_{24,\varepsilon}$ and the induced
twenty-fourth-order quotient coefficients $Q_{G,24}$ and $Q_{D,24}$.

No fixed speed band is imposed. The certificate uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Post-U Coefficient Equation

The root graph is extended to

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{24}h_{k,\varepsilon}y^{k+3}
+O(y^{28}).
$$

The new coefficient is selected by the shifted source equation

$$
\operatorname{Shift}_{28}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le23}+y^{24}H_{24,\varepsilon},\nu)
\right)
=
C_{24,\varepsilon}(\nu)
+S_{24,\varepsilon}(\nu)H_{24,\varepsilon}
+O(y),
$$

with

$$
S_{24,\varepsilon}=\varepsilon\beta F_{\delta\delta},
\qquad
H_{24,\varepsilon}(0,\nu)=h_{24,\varepsilon}(\nu).
$$

This is a coefficient solve beyond the $U$ seed, not a continuous
post-$U$-tail enclosure.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| all source-equation coefficients $y^0$ through $y^{28}$ contain zero after the $h_{24}$ solve | `true` |
| maximum source coefficient residual interval witness | $6.59712656008\times10^{13}$ |
| minimum $h_{24}$ solve-slope clearance | $0.792719244976$ |
| $h_{24}$ interval hull | $[-25502690592000,25502690592000]$ |
| $Q_{G,24}$ interval hull | $[-21722122111200,21723283979000]$ |
| $Q_{D,24}$ interval hull | $[-543082099475000,543053052779000]$ |
| maximum $Q_G$ twenty-fourth-order coefficient loss on $0\le y\le0.001796875$ | $2.78839485323\times10^{-53}$ |
| maximum $Q_D$ twenty-fourth-order coefficient loss on $0\le y\le0.001796875$ | $6.97098713308\times10^{-52}$ |
| maximum $|Q_{D,24}+25Q_{G,24}|$ interval witness | $1.08613515225\times10^{15}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=24$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-fifth-order-tail budget | $3.72527166308\times10^{67}$ |
| minimum remaining $Q_D$ twenty-fifth-order-tail budget | $3.72502527045\times10^{67}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-fourth-order-post-U-coefficient-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_fourth\_order\_post\_u\_coefficient\_enclosure=true}.
$$

It inherits the finite $\operatorname{Shift}_{27}$ $U_\varepsilon$ root-tail
tube from its predecessor, but the coefficient packet does not re-prove that
tube.

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_post\_u\_tail\_bound=false},
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
| `theta3minus.fold-pair-first-y-GD-twenty-third-order-u-seed-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift27-U-root-tail-tube` | directed-rounded finite tube certified by predecessor |
| `theta3minus.fold-pair-first-y-GD-twenty-fourth-order-post-U-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-fifth-order-post-U-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by twenty-fifth-order post-$U$ tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Successor Tail Equation

With

$$
A_{G,24}(y,\nu)=\sum_{k=0}^{24}Q_{G,k}(\nu)y^k,
\qquad
A_{D,24}(y,\nu)=\sum_{k=0}^{24}Q_{D,k}(\nu)y^k,
$$

the next zero-safe tail is

$$
T_G^{(25)}
=
\operatorname{Shift}_{27}\!\left(
P-L-y^2A_{G,24}
\right),
\qquad
Q_G=A_{G,24}+y^{25}T_G^{(25)},
$$

and

$$
T_D^{(25)}
=
\operatorname{Shift}_{27}\!\left(
D_{\mathrm{pair}}-L-y^2A_{D,24}
\right),
\qquad
Q_D=A_{D,24}+y^{25}T_D^{(25)}.
$$

The correlated identity is now

$$
T_D^{(25)}
=
-26T_G^{(25)}
-y\partial_yT_G^{(25)}.
$$

The next executable closure target is therefore

$$
\sup_{0\le y\le0.001796875}|T_G^{(25)}|
<3.72527166308\times10^{67},
$$

$$
\sup_{0\le y\le0.001796875}|T_D^{(25)}|
<3.72502527045\times10^{67}.
$$

The direct positive-y quotient rows do not close this zero-touching tail:
dividing their quotient bounds by $y^{24}$ or $y^{25}$ near the left endpoint
would reintroduce the zero-cell singularity and exceed the inherited budgets.
The successor must use a factored shifted evaluator for the removable
singularity, including the quotient/inverse-series remainder rather than raw
division by a zero-touching $y$ interval.

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.mjs).
It emits:

- directed-rounded $h_{24}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{28}$ after the
  $h_{24}$ solve;
- induced $Q_{G,24}$ and $Q_{D,24}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,24}+25Q_{G,24}\ni0$;
- inherited finite $\operatorname{Shift}_{27}$ $U_\varepsilon$ tube status as a
  predecessor dependency;
- explicit open continuous post-$U$ tail, full quotient, scaled-remainder,
  `I1`, and retention rows.

The companion test
[neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-fourth-order-post-u-coefficient-certificate.test.js)
validates schema, no-fixed-speed-window discipline, $h_{24}$ and
$Q_{G,24},Q_{D,24}$ intervals, the $Q_D+25Q_G$ identity interval, overclaim
rejection, and CLI write/validate behavior.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y Positive G/D Quotient Subcell Certificate

Promotion status: `priority-only`.

This packet continues the directed-rounded $h_\varepsilon$ root-graph quotient
cover and the finite $\operatorname{Shift}_{25}$ $E_\varepsilon$ root-tail tube
certificate. Its purpose is narrow: split the formerly deferred first-y cell and
certify the fold-pair $G,D$ quotient rows on the positive subcells only.

No fixed speed band is imposed. The certificate uses only

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Certified Result

The first-y cell is

$$
0\le y\le0.001796875.
$$

It is subdivided into $16$ subcells. The zero-touching subcell remains deferred;
the $15$ positive subcells are certified by the existing directed-rounded
$h_\varepsilon$ root contraction and correlated $L$ subtraction:

$$
Q_G=\frac{G_-+G_+-L}{y^2},
\qquad
Q_D=\frac{D_-+D_+-L}{y^2}.
$$

The directed-rounded result is:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| positive first-y subcells | $15$ |
| positive first-y quotient rows | $1920$ |
| zero-touching first-y rows left open | $128$ |
| all positive first-y $G,D$ quotient subcells certified | `true` |
| all rows avoid raw zero-cell division | `true` |
| minimum denominator positive clearance | $26.0019375273$ |
| minimum $J$ clearance | $0.791609023251$ |
| minimum $F_\delta$ clearance | $0.0000889771892857$ |
| maximum $|Q_G|$ interval upper bound | $8735.04896621$ |
| maximum $|Q_D|$ interval upper bound | $107206381.722$ |
| $Q_G$ interval hull | $[-8735.04896621,8727.35756168]$ |
| $Q_D$ interval hull | $[-107206381.722,13375096.7242]$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-positive-GD-quotient-subcells-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_positive\_GD\_quotient\_subcells=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_zero\_touching\_GD\_tail=false},
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
\qquad
\texttt{retained\_branch=false}.
$$

The remaining first-y blocker is now strictly the zero-touching continuous
post-seed $G,D$ tail bound. Positive first-y subcells are no longer part of that
blocker.

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-positive-gd-quotient-subcell-certificate.mjs).

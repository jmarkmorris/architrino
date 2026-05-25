# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-Seventh-Order Lower-Coefficient Cancellation Certificate

Promotion status: `priority-only`.

This packet records a coefficient-preserving lower-numerator cancellation
certificate for the next $C^1$ twenty-seventh-order first-y $G,D$ route. It
uses the existing
[twenty-sixth-order post-$U$ successor coefficient certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-sixth-order-post-u-successor-coefficient-certificate.md)
and proves the lower numerator coefficients through $y^{28}$ contain zero
before any $y^{29}$ division.

No fixed speed band is imposed. The certificate uses only the certified
positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Coefficient Target

The predecessor supplies pair coefficients through $y^{28}$:

$$
P(y)=\sum_{k=0}^{28}P_k y^k,
\qquad
D_{\mathrm{pair}}(y)=\sum_{k=0}^{28}D_k y^k,
$$

and quotient coefficients through index $26$:

$$
A_{G,26}(y)=\sum_{j=0}^{26}a_{G,j}y^j,
\qquad
A_{D,26}(y)=\sum_{j=0}^{26}a_{D,j}y^j.
$$

The lower numerator coefficients are certified for

$$
N_G=P-L-y^2A_{G,26},
\qquad
N_D=D_{\mathrm{pair}}-L-y^2A_{D,26}.
$$

For $0\le k\le28$, the artifact checks the coefficient intervals

$$
(N_G)_k=P_k-\mathbf 1_{k=0}L-\mathbf 1_{k\ge2}a_{G,k-2},
$$

and

$$
(N_D)_k=D_k-\mathbf 1_{k=0}L-\mathbf 1_{k\ge2}a_{D,k-2}.
$$

It also checks the correlated lower identity

$$
(N_D)_k=(1-k)(N_G)_k,
\qquad
0\le k\le28.
$$

This licenses the lower part of

$$
T_G^{(27)}=\operatorname{Shift}_{29}(P-L-y^2A_{G,26}),
$$

and

$$
T_D^{(27)}=\operatorname{Shift}_{29}(D_{\mathrm{pair}}-L-y^2A_{D,26})
$$

without dividing a zero-touching interval by $y^{29}$.

## Certified Result

Across all $128$ speed cells, the directed-rounded coefficient calculation
certifies:

| Row | Directed-rounded interval result |
| --- | ---: |
| imported $h_{26}$ coefficient artifact valid | `true` |
| missing coefficient data count | $0$ |
| $G$ lower coefficients $y^0$ through $y^{28}$ contain zero | `true` |
| $D$ lower coefficients $y^0$ through $y^{28}$ contain zero | `true` |
| lower $D/G$ identity coefficients $y^0$ through $y^{28}$ contain zero | `true` |
| raw $y$ inverse division before shift | `false` |
| $y^{29}$ division inside this artifact | `false` |

The global residual hulls are

$$
(N_G)_{0..28}
\subset
[-1.54755392334\times10^{15},1.54755392334\times10^{15}],
$$

$$
(N_D)_{0..28}
\subset
[-4.17839559301\times10^{16},4.17839559301\times10^{16}],
$$

and

$$
(N_D-(1-k)N_G)_{0..28}
\subset
[-8.35679118602\times10^{16},8.35679118602\times10^{16}].
$$

These intervals are wide because they preserve directed-rounded coefficient
uncertainty, but every coefficient interval contains zero. The certificate is
therefore a lower-cancellation certificate, not a numerical tail-size bound.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_coefficient\_preserving\_first\_y\_GD\_twenty\_seventh\_order\_lower\_numerator\_cancellation=true},
$$

$$
\texttt{certifies\_lower\_numerator\_cancellation\_through\_y28\_before\_y29\_division=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_C1\_twenty\_seventh\_order\_tail\_bound=false},
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_continuous\_successor\_tail\_bound=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_remainder\_bound=false},
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
| `theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation` | coefficient-preserving cancellation certified |
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-C1-successor-tail-bound` | blocked by coefficient-preserving twenty-eighth-order successor tail bound |

## Next Theorem Route

The previous broad positive-y $C^1$ attempt lost these cancellations by
enclosing $P$, $L$, and $A_{G,26}$ on a positive-y subcell before dividing by
$y^{29}$. This artifact closes the lower-coefficient part of that route. The
post-$U$ successor coefficient packet then certifies $h_{27}$ and the
$Q_{G,27},Q_{D,27}$ coefficient row. The remaining task is a
coefficient-preserving twenty-eighth-order successor-tail bound on the certified
root graph, with the root-tangent term retained in the $C^1$ derivative.

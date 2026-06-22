# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D C1 Twenty-Seventh-Order Tail-Bound Certificate

Promotion status: `priority-only`.

This packet records a rigorous obstruction for the broad C1 attempt at the
twenty-seventh-order first-y $G,D$ quotient-tail bound on the certified finite
$\operatorname{Shift}_{31}$ $W_\varepsilon$ root-tail tube. It does not certify
closure. It proves that this factored positive-y interval evaluator cannot
close the inherited twenty-seventh-order $D$ budget.

No fixed speed band is imposed. The attempt uses only the certified positive
speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## C1 Tail Model

The imported next-successor root-tail coordinate is

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le26}(y,\nu)
+y^{27}W_\varepsilon(y,\nu),
\qquad
W_\varepsilon(0,\nu)=h_{27,\varepsilon}(\nu)
$$

as a finite tube coordinate, not as a certified endpoint coefficient.

The finite predecessor certifies the shifted root residual

$$
R_{\varepsilon,31}(y,W,\nu)
=
\operatorname{Shift}_{31}\!\left(
F_\varepsilon(y,h_{\varepsilon,\le26}+y^{27}W,\nu)
\right)
$$

and the derivative orientation

$$
J_\varepsilon=\partial_WR_{\varepsilon,31}.
$$

The C1 attempt uses the root-tangent term

$$
\Xi_\varepsilon
=
-\frac{y\,\partial_yR_{\varepsilon,31}}{J_\varepsilon},
$$

and the tangent operator

$$
\mathcal D_y^{(W)}
=
y\partial_y+\Xi_\varepsilon\partial_W.
$$

The $G$ quotient is evaluated through the factored denominator

$$
G_\varepsilon(y,W,\nu)
=
\frac{2(\cos\phi_\varepsilon+\cos\delta_\varepsilon)}
{\nu\,\delta_\varepsilon^2J_{\varepsilon}^{\mathrm{abs}}},
\qquad
J_{\varepsilon}^{\mathrm{abs}}=-\varepsilon J_\varepsilon.
$$

The broad tail numerator is

$$
T_G^{(27)}
=
\operatorname{Shift}_{29}
\left(
P-L-y^2A_{G,26}
\right),
\qquad
Q_G=A_{G,26}+y^{27}T_G^{(27)}.
$$

The direct $D$ quotient through the unfactored $F_\delta$ denominator is not
used. The $D$ tail is bounded only by the correlated root-graph identity

$$
T_D^{(27)}
=
-28T_G^{(27)}
-\mathcal D_y^{(W)}T_G^{(27)}.
$$

This is the required C1 replacement for the invalid constant-$W$ derivative
approach.

## Certified Diagnostic

Across the $128$ speed cells and $15$ positive first-y subcells, the evaluator
checks $1920$ pair rows. It verifies:

| Row | Directed-rounded interval result |
| --- | ---: |
| imported $h_{26}$ coefficient artifact valid | `true` |
| imported finite $\operatorname{Shift}_{31}$ artifact valid | `true` |
| rows include $\Xi_\varepsilon$ | `true` |
| rows reject constant-$W$ derivative | `true` |
| rows avoid direct $D$ inverse through unfactored $F_\delta$ | `true` |
| rows avoid zero-touching $y$ division | `true` |
| minimum $|J_\varepsilon|$ clearance | $0.791609030534$ |

The inherited twenty-seventh-order budgets are

$$
B_{G,27}=1.15377790014\times10^{73},
\qquad
B_{D,27}=1.15370158828\times10^{73}.
$$

The identity already imposes the stricter $T_G$-only ceiling

$$
\frac{B_{D,27}}{28}=4.12036281529\times10^{71}
$$

before any derivative budget is spent.

The worst certified row is

$$
\texttt{speed.0.first-y-positive.1.pair},
\qquad
y\in[0.0001123046875,0.000224609375].
$$

On that row the broad shifted numerator enclosure is

$$
P-L-y^2A_{G,26}
\in
[-0.000110174944504,0.000110069113266]
$$

before division by $y^{29}$. The interval evaluator therefore returns

$$
\sup |T_G^{(27)}|
\le
3.80666108795\times10^{110},
$$

and

$$
\sup |\mathcal D_y^{(W)}T_G^{(27)}|
\le
4.03517714144\times10^{128}.
$$

Therefore the identity-bound enclosure is

$$
28\sup |T_G^{(27)}|
+\sup|\mathcal D_y^{(W)}T_G^{(27)}|
\le
4.03517714144\times10^{128}.
$$

The exact interval-certificate obstruction is

$$
4.03517714144\times10^{128}
-
1.15370158828\times10^{73}
>
0,
$$

reported by the artifact as

$$
\texttt{max\_Q\_D\_identity\_budget\_excess}
=
4.03517714144\times10^{128}.
$$

The large excess is a rigorous obstruction to this evaluator closing the row.
It is not a proof that the underlying twenty-seventh-order tail theorem is
false. It proves that broad positive-y interval subtraction loses the certified
lower-order cancellations before the $y^{29}$ division.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_rigorous\_C1\_tail\_bound\_obstruction=true}.
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
$$

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_quadrature=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-first-y-GD-twenty-sixth-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-shift31-next-successor-root-tail-tube` | directed-rounded positive-y certified |
| `theta3minus.fold-pair-first-y-GD-C1-twenty-seventh-order-tail-bound` | rigorous obstruction for this evaluator |
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-lower-coefficient-cancellation` | coefficient-preserving cancellation certified |
| `theta3minus.fold-pair-first-y-GD-twenty-seventh-order-post-U-successor-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-eighth-order-post-U-successor-coefficient` | directed-rounded interval certified by successor packet |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by coefficient-preserving twenty-ninth-order root-tangent Taylor quotient model |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Next Theorem Route

The obstruction identifies why the broad positive-y interval model failed. A
successor must preserve the cancellations through $y^{28}$ before dividing by
$y^{29}$.
The broad interval row computes

$$
\frac{P-L-y^2A_{G,26}}{y^{29}}
$$

after enclosing $P$, $L$, and $A_{G,26}$ on a positive-y subcell. That order is
too lossy. The lower-cancellation successor now certifies that the coefficients
$y^0$ through $y^{28}$ of $P-L-y^2A_{G,26}$ and
$D_{\mathrm{pair}}-L-y^2A_{D,26}$ contain zero before any $y^{29}$ division.
The post-$U$ successor coefficient packet then certifies $h_{27}$ and the
$Q_{G,27},Q_{D,27}$ coefficient row. The next successor coefficient packet
then certifies $h_{28}$ and the $Q_{G,28},Q_{D,28}$ coefficient row. The
remaining model must therefore enclose the twenty-ninth-order successor tail
through a coefficient-preserving Taylor or Taylor-inverse quotient model on the
successor root graph.

The derivative row must keep

$$
\Xi_\varepsilon
=
-\frac{y\,\partial_yR_{\varepsilon,31}}{J_\varepsilon}
$$

inside the model and must continue to avoid the direct $D$ quotient inverse
through the unfactored $F_\delta$ denominator.

## Executable Artifact

The executable packet is
[octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-c1-twenty-seventh-order-tail-bound-certificate.mjs).
It emits:

- the factored positive-y $G$ quotient-tail interval;
- the root-tangent interval $\Xi_\varepsilon$;
- the tangent-operator bound $\mathcal D_y^{(W)}T_G^{(27)}$;
- the $T_D^{(27)}$ identity-bound obstruction;
- explicit rejection of the constant-$W$ derivative route;
- explicit rejection of the direct $D$ quotient inverse through unfactored
  $F_\delta$;
- explicit rejection of zero-touching raw $y$ division.

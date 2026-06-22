# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Remainder Budget Scan

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md). The predecessor certified the moving fold endpoint and the negative limit

$$
L(\nu)\in[-0.192777102773,-0.192653693867].
$$

This packet measures the remaining theorem-grade burden by decomposing the sampled residuals in

$$
G(y,\nu)=L(\nu)+R_G(y,\nu),
\qquad
D(y,\nu)=L(\nu)+R_D(y,\nu)
$$

against the certified budget

$$
-L_+=0.192653693867.
$$

## Residual Decomposition

In the moving chart

$$
\theta=\theta_{3-}(\nu)-y^2,
$$

the total sampled residuals are

$$
R_G^{\mathrm{tot}}=G-L,
\qquad
R_D^{\mathrm{tot}}=D-L.
$$

The decomposition separates the coalescing fold-pair roots from the regular roots:

$$
R_G^{\mathrm{tot}}
=
R_G^{\mathrm{pair}}+R_G^{\mathrm{reg}},
\qquad
R_D^{\mathrm{tot}}
=
R_D^{\mathrm{pair}}+R_D^{\mathrm{reg}}.
$$

The coalescing fold pair is identified in the source term

$$
\texttt{-s_{\{+,+\}}(u+Q)}
$$

as the two roots nearest $\delta_f(\nu)$ in the three-root term of the source-root signature

$$
\texttt{1,3,1,1}.
$$

The third root in the same term is treated as regular. On the sampled grid, the minimum separation margin between the fold pair and that regular root is

$$
1.73277431787.
$$

## Sampled Budget Result

The executable scan uses the five certified speed samples

$$
\nu\in
\{3.02156,3.0215625,3.02156474025,3.0215675,3.02157\}
$$

and nineteen collar samples

$$
y\in
\{0.115,0.11,0.105,0.1,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.02,0.015,0.01,0.007,0.005,0.003,0.002,0.001\}.
$$

Across the $95$ sampled rows:

| Quantity | Maximum sampled absolute value | Certified budget ratio |
| --- | ---: | ---: |
| $R_G^{\mathrm{tot}}$ | $0.010702388525$ | $0.0555524698758$ |
| $R_D^{\mathrm{tot}}$ | $0.00016917145$ | $0.000878111634427$ |
| $R_G^{\mathrm{pair}}$ | $0.00099906856367$ | $0.0051858$ |
| $R_D^{\mathrm{pair}}$ | $0.000749301116826$ | $0.0038900$ |
| $R_G^{\mathrm{reg}}$ | $0.00970331996133$ | $0.0503667$ |
| $R_D^{\mathrm{reg}}$ | $0.000765733743826$ | $0.0039747$ |

The bottleneck is not the singular fold pair. It is the regular-root part of $R_G$ at the outer collar edge:

$$
\nu=3.02156,
\qquad
y=0.115,
\qquad
R_G^{\mathrm{tot}}\approx0.010702388525.
$$

The sampled slack against the certified $L$ budget is still

$$
0.181951305342.
$$

Thus the scan gives a quantitative work gauge: the sampled proof burden uses about $5.6\%$ of the certified negative-limit budget, with the derivative numerator $D$ using less than $0.1\%$.

## Sampled Scaling Split

The same rows also expose the scaling structure of the two remaining proof packets. On the sampled collar,

$$
|R_G^{\mathrm{pair}}|
\lesssim
0.171600721993\,y^2,
\qquad
|R_D^{\mathrm{pair}}|
\lesssim
0.700161629591\,y^2,
$$

while the regular-root part follows the nonfolded transport scale

$$
|R_G^{\mathrm{reg}}|
\lesssim
0.088020473482\,y,
\qquad
|R_D^{\mathrm{reg}}|
\lesssim
0.60177166028\,y^3.
$$

At the outer collar radius $y=0.115$, these sampled envelopes imply the diagnostic bounds

| Row | Sampled scale envelope | Implied outer-radius bound |
| --- | ---: | ---: |
| $R_G^{\mathrm{pair}}$ | $0.171600721993\,y^2$ | $0.00226941954836$ |
| $R_D^{\mathrm{pair}}$ | $0.700161629591\,y^2$ | $0.00925963755134$ |
| $R_G^{\mathrm{reg}}$ | $0.088020473482\,y$ | $0.0101223544504$ |
| $R_D^{\mathrm{reg}}$ | $0.60177166028\,y^3$ | $0.000915219473828$ |

This is the sharper theory advance from the scan. The singular pair should be certified in a scaled fold-pair chart with a quadratic remainder quotient. The regular roots should be certified by ordinary root-sheet continuation with a linear $R_G$ envelope and a cubic $R_D$ envelope. The regular-root $R_G$ envelope is the largest visible burden and explains why the bottleneck sits at the outer collar edge rather than near the fold.

## Closure Burndown

The local closure state is now:

| Row | Status |
| --- | --- |
| `theta3minus.fold-endpoint-bracket` | directed-rounded interval certified |
| `theta3minus.negative-fold-limit-L` | directed-rounded interval certified |
| `theta3minus.sampled-moving-collar-GD` | sampled certified |
| `theta3minus.sampled-total-remainder-budget` | sampled certified |
| `theta3minus.sampled-fold-pair-regular-decomposition` | sampled certified |
| `theta3minus.sampled-fold-pair-quadratic-remainder-scaling` | sampled certified |
| `theta3minus.sampled-regular-root-linear-cubic-remainder-scaling` | sampled certified |
| `theta3minus.sampled-fold-pair-scaled-stencil` | sampled-stencil certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md) |
| `theta3minus.sampled-node-fold-pair-scaled-interval` | directed-rounded sampled-node certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md) |
| `theta3minus.fold-pair-scaled-root-tube-cell-cover` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) |
| `theta3minus.fold-pair-h-root-graph-cell-cover` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.md) |
| `theta3minus.sampled-regular-root-stencil` | strict-sampled-stencil certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.md) |
| `theta3minus.sampled-node-regular-root-interval` | directed-rounded sampled-node certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md) |
| `theta3minus.regular-root-sheet-quotient-cell-cover` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) |
| `theta3minus.regular-root-complement-slab-exclusion` | directed-rounded hybrid raw-$F$/fold-$p$ certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder` | blocked by directed-rounded first-y-cell $G,D$ enclosure |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

This table is the current answer to how much work remains in the local collar row. The first-y cancellation is no longer structurally unknown, and its first seven quotient coefficients are no longer sampled only: directed-rounded coefficient intervals certify $Q_G(0)>0$, $Q_D(0)<0$, $Q_D(0)+Q_G(0)=0$ coefficient-level, $|Q_{G,1}|\le0.00335589239689$, $|Q_{D,1}|\le0.00671178479378$, $Q_{G,2}\in[-0.972631657911,-0.764364731379]$, $Q_{D,2}\in[2.29309419414,2.91789497373]$, $Q_{G,3}\in[-2.33229280147,2.30497148098]$, $Q_{D,3}\in[-9.21988592393,9.32917120589]$, $Q_{G,4}\in[6.82399504229,6.84166645451]$, $Q_{D,4}\in[-34.2083322726,-34.1199752114]$, $Q_{G,5}\in[-0.0390934301711,0.0390934301711]$, $Q_{D,5}\in[-0.234560581027,0.234560581027]$, $Q_{G,6}\in[-50.0073387163,-49.5009883682]$, and $Q_{D,6}\in[346.506918577,350.051371014]$. One directed-rounded fold-pair septic-tail enclosure remains before the collar can compose into `I1` regular critical exhaustion:

1. a directed-rounded first-y-cell $G,D$ septic-tail bound on the certified $h$ root graph, now preceded by sampled-stencil rows, directed-rounded sampled-node intervals, a directed-rounded root-tube cell cover, a directed-rounded $h$ root-graph cell cover, a directed-rounded positive-y $G,D$ quotient cover, the sampled first-y cancellation witness, the directed-rounded first-y constant-through-sextic coefficient intervals, and the hybrid regular-root complement closure.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_sampled\_theta3minus\_remainder\_budget\_feasibility=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
$$

$$
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-theta3minus-remainder-budget-feasibility-certified}.
}
$$

The successor row remains

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.mjs). It emits:

- total $R_G,R_D$ residual rows;
- fold-pair and regular-root residual decompositions;
- root-pair identification by nearest roots to $\delta_f(\nu)$;
- reconstruction checks for $R_G^{\mathrm{tot}}=R_G^{\mathrm{pair}}+R_G^{\mathrm{reg}}$ and $R_D^{\mathrm{tot}}=R_D^{\mathrm{pair}}+R_D^{\mathrm{reg}}$;
- a local closure burndown for the $\theta_{3-}^{-}$ collar.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.test.js) validates the residual budget, pair/regular decomposition, no-fixed-speed-window discipline, open interval-closure boundary, overclaim rejection, and CLI write/validate behavior.

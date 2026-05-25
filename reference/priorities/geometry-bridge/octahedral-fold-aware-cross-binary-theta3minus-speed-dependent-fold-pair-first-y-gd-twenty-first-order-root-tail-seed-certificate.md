# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Twenty-First-Order Root-Tail Seed Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twentieth-order-jet-coefficient-interval-certificate.md) and consumes the zero-safe setup from [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-shifted-tail-cancellation-certificate.md). It advances the first-y fold-pair $G,D$ branch by solving the first coefficient of the post-twentieth root-tail variable.

It is not a finite $E_\varepsilon(y,\nu)$ tube, not a continuous bound on $T_G^{(21)}$ or $T_D^{(21)}$, and not full $\theta_{3-}^{-}$ collar closure. It certifies the seed value $E_\varepsilon(0,\nu)=h_{21,\varepsilon}(\nu)$ and the induced twenty-first-order quotient coefficients $Q_{G,21}$ and $Q_{D,21}$ over the existing no-fixed-speed-window speed-cell domain.

No fixed speed band is imposed. The certificate uses only the certified positive speed-ratio zero enclosure

$$
\nu\in[3.02156,3.02157],
$$

subdivided into $128$ directed-rounded speed cells.

## Root-Tail Seed Equation

After the twentieth-order quotient jet, the root graph is written

$$
h_\varepsilon(y,\nu)
=
h_{\varepsilon,\le20}(y,\nu)+y^{21}E_\varepsilon(y,\nu).
$$

Equivalently, at the coefficient level,

$$
\delta_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2
+\sum_{k=0}^{21}h_{k,\varepsilon}y^{k+3}
+O(y^{25}).
$$

Substituting

$$
h_{\varepsilon,\le20}+y^{21}E
$$

into the source equation

$$
F_\varepsilon
=
\delta_\varepsilon^2/\nu^2-2+\sin\phi_\varepsilon+\sin\delta_\varepsilon
$$

gives the shifted seed equation

$$
\frac{F_\varepsilon(y,h_{\varepsilon,\le20}+y^{21}E,\nu)}{y^{25}}
=
C_{21,\varepsilon}(\nu)+S_{21,\varepsilon}(\nu)E+O(y).
$$

The certified coefficient solve is

$$
E_\varepsilon(0,\nu)
=
-\frac{C_{21,\varepsilon}(\nu)}{S_{21,\varepsilon}(\nu)}
=
h_{21,\varepsilon}(\nu),
$$

where the same fold-local slope

$$
S_{21,\varepsilon}=\varepsilon\beta F_{\delta\delta}
$$

is bounded away from zero on every branch row.

## Certified Result

Across the $128$ speed cells and $256$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $128$ |
| branch rows | $256$ |
| all source-equation coefficients $y^0$ through $y^{25}$ contain zero after the $h_{21}$ solve | `true` |
| $h_{21}$ interval hull | $[-118506150229,118431723907]$ |
| maximum $|h_{21}|$ interval radius witness | $1.18506150229\times10^{11}$ |
| $Q_{G,21}$ interval hull | $[-100935984646,100935984646]$ |
| $Q_{D,21}$ interval hull | $[-2220591662220,2220591662220]$ |
| maximum $Q_G$ twenty-first-order coefficient loss on $0\le y\le0.001796875$ | $2.23316708326\times10^{-47}$ |
| maximum $Q_D$ twenty-first-order coefficient loss on $0\le y\le0.001796875$ | $4.91296758318\times10^{-46}$ |
| maximum $|Q_{D,21}+22Q_{G,21}|$ interval witness | $4.44118332443\times10^{12}$ |
| all $Q_D+(k+1)Q_G$ coefficient identity intervals through $k=21$ contain zero | `true` |
| minimum remaining $Q_G$ twenty-second-order-tail budget | $2.16128325002\times10^{59}$ |
| minimum remaining $Q_D$ twenty-second-order-tail budget | $2.16114031195\times10^{59}$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-twenty-first-order-root-tail-seed-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_twenty\_first\_order\_root\_tail\_seed\_coefficient\_enclosure=true}.
$$

It also imports the predecessor twentieth-order coefficient claim and the shifted-tail cancellation setup. It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_finite\_root\_tail\_tube=false},
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
| `theta3minus.fold-pair-first-y-GD-twentieth-order-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-twenty-first-order-shifted-tail-cancellation` | zero-safe symbolic cancellation certified |
| `theta3minus.fold-pair-first-y-GD-twenty-first-order-root-tail-seed` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-finite-E-root-tail-tube` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-twenty-second-order-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by finite $E_\varepsilon$ tube and twenty-second-order tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.mjs). It emits:

- directed-rounded $h_{21}$ branch-row solves over the $128$ speed cells;
- $F_\varepsilon$ source coefficient containment through $y^{25}$ after the seed solve;
- induced $Q_{G,21}$ and $Q_{D,21}$ coefficient intervals;
- the correlated coefficient identity interval $Q_{D,21}+22Q_{G,21}\ni0$;
- explicit open finite-root-tail-tube, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-twenty-first-order-root-tail-seed-certificate.test.js) validates schema, no-fixed-speed-window discipline, $h_{21}$ and $Q_{G,21},Q_{D,21}$ intervals, the $Q_D+22Q_G$ identity interval, finite-tube overclaim rejection, and CLI write/validate behavior.

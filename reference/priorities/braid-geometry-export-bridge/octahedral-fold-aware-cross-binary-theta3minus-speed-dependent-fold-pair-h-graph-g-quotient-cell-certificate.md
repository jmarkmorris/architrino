# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair H-Graph G/D Quotient Cell Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md). The predecessor proves the fold-pair root tubes, the $h_\varepsilon$ root graph, and the $J_\varepsilon$ signs on the finite speed/y cell cover. This packet lifts the $G$ quotient and the direct source-derivative $D$ quotient onto that certified $h$ root graph for every cell with $y>0$. The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) now supplies the sampled analytic first-y cancellation witness.

It is not a full fold-pair $G,D$ quotient proof and it is not full $\theta_{3-}^{-}$ collar closure. It removes the positive-$y$ quotient singularity from the live blocker and identifies the remaining zero-cell jet problem. The positive-y $D$ intervals are deliberately conservative; they certify the direct formula is finite away from $y=0$, not the final margin needed for collar closure.

## H-Graph Quotient Formula

For branch sign $\varepsilon\in\{-1,+1\}$, use the certified $h$ chart

$$
z_\varepsilon=\gamma+yh_\varepsilon,
\qquad
r_\varepsilon=\varepsilon\beta+y z_\varepsilon,
\qquad
q_\varepsilon=r_\varepsilon+2y,
$$

so

$$
\delta_\varepsilon
=
\delta_f+y r_\varepsilon
=
\delta_f+\varepsilon\beta y+\gamma y^2+y^3h_\varepsilon,
\qquad
\phi_\varepsilon=\phi_f-yq_\varepsilon.
$$

The branch kernel is

$$
B_\varepsilon
=
-\frac12\left(\cos\phi_\varepsilon+\cos\delta_\varepsilon\right).
$$

The predecessor certifies

$$
J_- > 0,
\qquad
J_+ < 0,
$$

on the $h$ root graph, with $J_\varepsilon=F_\delta/y$. Therefore

$$
|J_\varepsilon|=(-\varepsilon)J_\varepsilon.
$$

With source coefficient $\sigma_*=-1$, the executable branch contribution is

$$
G_\varepsilon
=
\frac{4\sigma_*B_\varepsilon}
{\nu\delta_\varepsilon^2(-\varepsilon J_\varepsilon)}.
$$

The correlated local fold limit is evaluated on the same speed cell:

$$
L_{\mathrm{cell}}
=
\frac{8\sigma_*B_f}
{\nu\delta_f^2|F_{\delta\delta,f}|\beta},
\qquad
B_f=-\frac12(\cos\phi_f+\cos\delta_f).
$$

For cells with $y>0$, the directed-rounded quotient is

$$
Q_G^{\mathrm{pair}}
=
\frac{G_-+G_+-L_{\mathrm{cell}}}{y^2}.
$$

The first y cell touches $y=0$, so this packet does not compute this expression by raw division there.

For the direct source derivative, the executable also evaluates the regular implicit derivative formula on positive-y cells:

$$
\delta_\theta
=
-\frac{2\cos\phi}{F_\delta},
$$

$$
B_\theta
=
\sin\phi+\frac12(\sin\delta-\sin\phi)\delta_\theta,
$$

and

$$
D_\varepsilon
=
4y^3\sigma_*
\frac{2}{\nu}
\frac{d}{d\theta}
\left(
\frac{B_\varepsilon}{\delta_\varepsilon^2|F_\delta|}
\right).
$$

The positive-y derivative quotient is

$$
Q_D^{\mathrm{pair}}
=
\frac{D_-+D_+-L_{\mathrm{cell}}}{y^2}.
$$

## Cell Cover Result

The certificate uses the same speed enclosure and collar cover as the root-tube predecessor: $16$ speed cells and $64$ y cells on $0\le y\le0.115$. It emits quotient rows only for the $63$ cells per speed slice with positive lower y endpoint.

Across the cover:

| Row | Certified value |
| --- | ---: |
| speed cells | $16$ |
| y cells | $64$ |
| positive-y quotient cells | $1008$ |
| first-y cells deferred | $16$ |
| positive-y branch $G$ rows | $2016$ |
| positive-y branch $D$ rows | $2016$ |
| $h$ branch certification rows | $2048$ |
| minimum denominator positive clearance | $25.1505521458$ |
| minimum $|J_\varepsilon|$ clearance on positive-y rows | $0.762399320249$ |
| minimum $|F_\delta|$ clearance on positive-y $D$ rows | $0.00141189456366$ |
| minimum endpoint $H_\varepsilon$ clearance after attempted contraction | $3.94678055127\times10^{-7}$ |
| maximum attempted $h$ tube width | $2.4$ |
| maximum positive-y $|Q_G^{\mathrm{pair}}|$ interval upper endpoint | $551.144091578$ |
| maximum positive-y $|Q_D^{\mathrm{pair}}|$ interval upper endpoint | $433492.008192$ |
| zero-touching raw $y^{-2}$ divisions used | $0$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-h-graph-positive-y-GD-quotient-cell-cover-certified}.
}
$$

The quotient intervals are intentionally conservative near the first positive y cell. Their role is not yet to provide the final sharp sign margin. Their role is to prove that the root-graph substitution, source-derivative formula, and denominator signs are no longer the obstacle away from $y=0$.

## Remaining Zero-Cell Jet

For the first y cell, the finite quotient must be certified by Taylor cancellation, not by direct interval division. The branch-level form to certify is

$$
G_\varepsilon
=
g_0+\varepsilon y g_0\Lambda+y^2S_\varepsilon,
\qquad
g_0=\frac{L}{2},
$$

so the pair cancels the odd term:

$$
Q_G^{\mathrm{pair}}
=
S_-+S_+.
$$

The same first-cell jet should also feed the $D$ row. If

$$
P(y,\nu)=G_{\mathrm{pair}}(y,\nu),
$$

then the derivative-transport packet uses

$$
D_{\mathrm{pair}}
=
P-yP',
\qquad
Q_D^{\mathrm{pair}}
=
\frac{D_{\mathrm{pair}}-L}{y^2}.
$$

After proving $P(0,\nu)=L$ and $P'(0,\nu)=0$, the zero-safe form is

$$
Q_D^{\mathrm{pair}}
=
-\int_0^1 t\,P''(ty,\nu)\,dt.
$$

The required implicit-root identities on the $h$ graph are

$$
H_\varepsilon(y,h_\varepsilon,\nu)=0,
\qquad
H_h=J_\varepsilon,
$$

so

$$
h_y=-\frac{H_y}{J_\varepsilon},
$$

and, for an explicit second-jet route,

$$
h_{yy}
=
-\frac{H_{yy}+2H_{yh}h_y+H_{hh}h_y^2}{J_\varepsilon}.
$$

The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) verifies this cancellation at the sampled analytic-jet level, and the first-y coefficient chain now interval-certifies the constant-through-sextic quotient coefficients through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-sextic-jet-coefficient-interval-certificate.md). The precise remaining fold-pair blocker is the directed-rounded first-y-cell $G,D$ septic-tail bound on the already-certified $h$ root graph.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_h\_graph\_positive\_y\_G\_quotient\_cell\_cover=true}.
$$

It also may claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_h\_graph\_positive\_y\_D\_quotient\_cell\_cover=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_G\_quotient\_full\_cell\_cover=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_D\_quotient\_cell\_cover=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=false},
$$

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-h-root-graph-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md) |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |
| `I1.regular-critical-exhaustion` | blocked by theta3minus fold-pair quotient row |
| `representative-cross-binary-retention` | open |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.mjs). It emits:

- attempted $h$-root contractions with endpoint $H_\varepsilon$ signs and $J_\varepsilon$ signs;
- positive-y branch $G_\varepsilon$ intervals on the $h$ root graph;
- positive-y branch $D_\varepsilon$ intervals from the direct implicit source-derivative formula;
- correlated $L_{\mathrm{cell}}$ intervals;
- positive-y $Q_G^{\mathrm{pair}}$ and $Q_D^{\mathrm{pair}}$ interval enclosures;
- explicit first-y-cell deferral rows with no raw $y^{-2}$ division;
- explicit open full $G$, $D$, remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-h-graph-g-quotient-cell-certificate.test.js) validates schema, no-fixed-speed-window discipline, positive-y quotient counts, denominator and $J$ sign clearances, zero-cell raw-division exclusion, overclaim rejection, and CLI write/validate behavior.

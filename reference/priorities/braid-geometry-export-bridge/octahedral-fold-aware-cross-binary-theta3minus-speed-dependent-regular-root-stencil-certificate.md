# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Regular-Root Stencil Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record   and ^{\mathrm{rec}} are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md) and [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md). The predecessor scan showed that the largest visible $\theta_{3-}^{-}$ burden is the regular-root part of $R_G$ at the outer collar edge. This packet tightens that side with a stricter sampled/stencil grid and emits the directed-rounded backend targets needed for theorem-grade closure.

It is not a directed-rounded regular-root proof.

The finite-node directed-rounded successor is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md). It upgrades the same $8\times24$ stencil to regular-root brackets, fixed-sign $F_\delta$ intervals, and direct $R_G^{\mathrm{reg}}/y$ and $R_D^{\mathrm{reg}}/y^3$ quotient enclosures. The cell-cover successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) then extends the four named regular-sheet quotient rows to a directed-rounded speed/y cell cover. It still leaves regular-root complement-slab exclusion open.

The fold-pair side now has a sibling directed-rounded sampled-node replay in [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md). The two lanes should remain separated: the regular-root proof reserves the coalescing fold-pair cluster, while the fold-pair proof handles that cluster in the scaled $z_\pm,J_\pm$ chart.

## Regular-Root Scaling

In the moving chart

$$
\theta=\theta_{3-}(\nu)-y^2,
$$

the regular roots are all source roots except the two coalescing roots nearest $\delta_f(\nu)$ in

$$
\texttt{-s_{\{+,+\}}(u+Q)}.
$$

The sampled scale rows are

$$
R_G^{\mathrm{reg}}=O(y),
\qquad
R_D^{\mathrm{reg}}=O(y^3).
$$

The stricter grid uses eight speed samples and twenty-four collar samples, for $192$ sampled rows. It includes both certified speed endpoints, the center speed, $y=0.115$, and $y=0.001$.

## Sampled Result

The stricter stencil preserves the predecessor margins:

| Row | Sampled value |
| --- | ---: |
| speed rows | $8$ |
| $y$ rows per speed | $24$ |
| total sampled rows | $192$ |
| maximum combined budget ratio | $0.0555524698758$ |
| minimum certified budget slack | $0.181951305342$ |
| minimum pair-to-regular separation | $1.73277431787$ |
| $\max |R_G^{\mathrm{reg}}|$ | $0.00970331996133$ |
| $\max |R_D^{\mathrm{reg}}|$ | $0.000765733743826$ |
| $\max |R_G^{\mathrm{reg}}|/y$ | $0.088020473482$ |
| $\max |R_D^{\mathrm{reg}}|/y^3$ | $0.60177166028$ |

The resulting status is

$$
\boxed{
\texttt{sampled-theta3minus-regular-root-stencil-certified}.
}
$$

This packet closes the sampled search question for the regular-root side: the visible regular-root burden stays below the directed-rounded margin on a stricter grid, with the same scale law and root separation as the predecessor. It does not replace interval arithmetic.

## Directed-Rounded Backend Targets

The directed-rounded regular-root successor must prove:

- regular source-root tube isolation outside the reserved fold-pair cluster;
- fixed-sign $F_\delta$ intervals on all regular root sheets;
- complement-slab exclusion outside the regular tubes and the reserved fold-pair cluster;
- ordinary source-contribution interval enclosure for $R_G^{\mathrm{reg}}/y$;
- ordinary source-derivative numerator interval enclosure for $R_D^{\mathrm{reg}}/y^3$.

The worst sampled rows emitted for the backend are:

| Target | Speed | $y$ | Value |
| --- | ---: | ---: | ---: |
| $R_G^{\mathrm{reg}}$ | $3.02156$ | $0.115$ | $0.00970331996133$ |
| $R_D^{\mathrm{reg}}$ | $3.02156$ | $0.115$ | $0.000765733743826$ |

The regular-root proof should reserve the fold-pair cluster rather than trying to certify all roots as simple ordinary roots through $y=0$.

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.sampled-regular-root-linear-cubic-remainder-scaling` | strict-sampled-stencil certified |
| `theta3minus.regular-root-backend-targets` | emitted |
| `theta3minus.sampled-node-fold-pair-scaled-interval` | directed-rounded sampled-node certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md) |
| `theta3minus.sampled-node-regular-root-interval` | directed-rounded sampled-node certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md) |
| `theta3minus.regular-root-remainder` | continuous directed-rounded open |
| `theta3minus.fold-pair-scaled-remainder` | continuous directed-rounded open |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_strict\_sampled\_regular\_root\_remainder\_stencil=true},
$$

and

$$
\texttt{emits\_regular\_root\_interval\_backend\_targets=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
$$

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_normal\_form\_remainder=false},
\qquad
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
$$

$$
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.mjs). It emits:

- a stricter sampled/stencil replay of the regular-root remainder split;
- regular-root $R_G/y$ and $R_D/y^3$ scale summaries;
- pair-to-regular separation checks;
- directed-rounded backend target rows for regular-root interval closure;
- explicit non-directed-rounded, non-`I1`, non-quadrature, and non-retention claim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.test.js) validates schema, no-fixed-speed-window discipline, stricter grid shape, regular-root scaling thresholds, backend target emission, overclaim rejection, and CLI write/validate behavior.

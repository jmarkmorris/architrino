# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Regular-Root Cell Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.md). The predecessor certified regular-root brackets and quotient enclosures only at finite speed/y nodes. This packet upgrades the four named nonfolded regular source sheets to a directed-rounded speed/y cell cover in the moving collar

$$
\theta=\theta_{3-}(\nu)-y^2.
$$

It is not a fold-pair $G,D$ quotient proof and it is not full $\theta_{3-}^{-}$ collar closure.

## Regular Sheet Quotient Rows

The covered regular sheets are:

| Sheet | Root selection |
| --- | --- |
| $s_{+,+}(u)$ | root $0$ |
| $-s_{+,+}(u+Q)$ | root farthest from $\delta_f(\nu)$ |
| $s_{-,+}(u)$ | root $0$ |
| $-s_{-,+}(u+Q)$ | root $0$ |

For each regular sheet, the source equation is

$$
F(\tilde\theta,\delta;\nu,\kappa)
=
\frac{\delta^2}{\nu^2}-2+\sin(2\tilde\theta-\delta)+\kappa\sin\delta,
$$

with

$$
F_\delta=
\frac{2\delta}{\nu^2}-\cos(2\tilde\theta-\delta)+\kappa\cos\delta.
$$

The certificate encloses each sheet in a corner-root hull padded by $5\times10^{-5}$, proves opposite endpoint signs for $F$, and proves a fixed sign for $F_\delta$ on the whole sheet tube. The quotient rows are evaluated directly:

$$
\frac{R_G^{\mathrm{reg}}}{y}
=
2\sum_{j\in\mathcal R_{\mathrm{reg}}}
c_j\frac{2\sigma_j B_j}{\nu\delta_j^2|F_{\delta,j}|},
$$

and

$$
\frac{R_D^{\mathrm{reg}}}{y^3}
=
4\sum_{j\in\mathcal R_{\mathrm{reg}}}
c_j\partial_\theta
\left(
\frac{2\sigma_j B_j}{\nu\delta_j^2|F_{\delta,j}|}
\right),
$$

where

$$
B_j=-\frac12(\cos\phi_j+\kappa_j\cos\delta_j),
\qquad
\phi_j=2\tilde\theta_j-\delta_j.
$$

This avoids raw division by $y$ and therefore includes the cell touching $y=0$.

## Cell Cover Result

The certificate covers the speed enclosure with $16$ speed cells and the collar $0\le y\le0.115$ with $64$ y cells.

| Row | Certified value |
| --- | ---: |
| speed cells | $16$ |
| y cells | $64$ |
| speed/y cells | $1024$ |
| regular sheet cells | $4096$ |
| endpoint intervals | $8192$ |
| minimum endpoint $F$ clearance | $0.0000290544619118$ |
| minimum $|F_\delta|$ clearance | $0.581059952407$ |
| $\max |R_G^{\mathrm{reg}}/y|$ | $0.0880368563612$ |
| $\max |R_D^{\mathrm{reg}}/y^3|$ | $0.602156573611$ |
| implied outer $|R_G^{\mathrm{reg}}|$ bound | $0.0101242384815$ |
| implied outer $|R_D^{\mathrm{reg}}|$ bound | $0.000915804878891$ |
| regular-root budget ratio | $0.0525514890388$ |

The resulting status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-regular-root-cell-cover-certified}.
}
$$

This closes the regular-root sheet-quotient part of the moving collar. The successor complement-slab packet now closes the regular-root-side exclusion row by splitting the folded source into ordinary $F$ slabs outside the fold neighborhood and Taylor-cancelled fold-$p$ slabs inside it.

The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.md) certifies all regular-root complement slabs with minimum raw $F$ clearance $0.0000273284209642$ and minimum scaled fold-$p$ $F/y^2$ clearance $0.000252834825122$. The remaining collar burden is the fold-pair $G,D$ quotient over the certified $h$ root graph.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_regular\_root\_sheet\_quotient\_cell\_cover=true}.
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

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.sampled-node-regular-root-interval` | directed-rounded sampled-node certified |
| `theta3minus.regular-root-sheet-quotient-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.regular-root-complement-slab-exclusion` | directed-rounded hybrid certified by successor packet |
| `theta3minus.fold-pair-GD-quotient-root-graph` | open |
| `theta3minus.left-fold-collar-full-remainder` | blocked by fold-pair quotient row |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.mjs). It emits:

- directed-rounded endpoint $F$ signs on every named regular sheet tube;
- directed-rounded fixed-sign $F_\delta$ intervals on every sheet tube;
- direct quotient intervals for $R_G^{\mathrm{reg}}/y$ and $R_D^{\mathrm{reg}}/y^3$;
- explicit open fold-pair quotient, full collar, `I1`, quadrature, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.test.js) validates schema, no-fixed-speed-window discipline, cell counts, endpoint signs, $F_\delta$ signs, quotient bounds, budget ratio, overclaim rejection, and CLI write/validate behavior.

# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Regular-Root Sampled-Node Interval Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-stencil-certificate.md). The predecessor tightened the regular-root side on an $8\times24$ speed/collar stencil and emitted backend targets. This packet upgrades those same finite nodes to directed-rounded root brackets, fixed-sign $F_\delta$ intervals, and regular-root $G,D$ quotient enclosures.

It is not itself a continuous regular-root collar proof. The successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) now extends the named regular-sheet quotient bounds to a directed-rounded speed/y cell cover.

## Regular-Root Interval Row

The moving collar remains

$$
\theta=\theta_{3-}(\nu)-y^2,
\qquad
\nu\in[3.02156,3.02157].
$$

For each source term,

$$
F(\tilde\theta,\delta;\nu,\kappa)
=
\frac{\delta^2}{\nu^2}-2+\sin(2\tilde\theta-\delta)+\kappa\sin\delta.
$$

The regular-root set $\mathcal R_{\mathrm{reg}}$ contains every source root except the two roots nearest $\delta_f(\nu)$ in

$$
\texttt{-s_{\{+,+\}}(u+Q)}.
$$

Those two coalescing roots remain reserved for the fold-pair scaled chart. For each regular root the packet opens a symmetric $\delta$ interval of radius $10^{-8}$, proves endpoint sign change for $F$, and proves fixed-sign

$$
F_\delta
=
\frac{2\delta}{\nu^2}-\cos(2\tilde\theta-\delta)+\kappa\cos\delta.
$$

The certified quotient rows are

$$
\frac{R_G^{\mathrm{reg}}}{y}
=
2 f_\times^{\mathrm{reg}}(\theta_{3-}(\nu)-y^2;\nu),
$$

and

$$
\frac{R_D^{\mathrm{reg}}}{y^3}
=
4\partial_\theta f_\times^{\mathrm{reg}}(\theta_{3-}(\nu)-y^2;\nu).
$$

This direct regular-root source sum replaces the predecessor's cancellation-prone diagnostic row for the derivative quotient, which formed $R_D^{\mathrm{reg}}$ by subtracting the fold-pair contribution from a rounded total $D$ value at very small $y$.

## Result

Across the strict $8\times24$ stencil, the directed-rounded sampled-node replay emits:

| Row | Certified value |
| --- | ---: |
| speed/y sample nodes | $192$ |
| regular root intervals | $768$ |
| endpoint intervals | $1536$ |
| minimum endpoint $F$ clearance | $5.81121262222\times10^{-9}$ |
| minimum $|F_\delta|$ clearance | $0.581122092004$ |
| minimum pair-to-regular separation | $1.73277431787$ |
| $\max |R_G^{\mathrm{reg}}|/y$ interval upper | $0.0880204766762$ |
| $\max |R_D^{\mathrm{reg}}|/y^3$ interval upper | $0.601435162043$ |
| largest predecessor/direct $R_D^{\mathrm{reg}}/y^3$ drift | $3.98771028\times10^{-4}$ |
| largest regular-root outer-radius budget ratio | $0.0525417115789$ |

The resulting status is

$$
\boxed{
\texttt{directed-rounded-sampled-node-theta3minus-regular-root-interval-certified}.
}
$$

The regular-root $R_D/y^3$ interval upper is slightly lower than the predecessor stencil quotient because the new packet computes the regular derivative directly from the four retained regular source sheets instead of subtracting two nearly equal small $D$ rows after formatting. The packet therefore strengthens the regular-root lane and identifies the right continuous proof variable.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_sampled\_node\_regular\_root\_brackets=true},
$$

and

$$
\texttt{certifies\_directed\_rounded\_sampled\_node\_regular\_root\_GD\_quotient\_enclosures=true}.
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
| `theta3minus.sampled-regular-root-stencil` | sampled-stencil certified |
| `theta3minus.sampled-node-regular-root-brackets` | directed-rounded certified |
| `theta3minus.sampled-node-regular-root-GD-quotient-enclosures` | directed-rounded certified |
| `theta3minus.regular-root-sheet-quotient-cell-cover` | directed-rounded cell-cover certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) |
| `theta3minus.regular-root-complement-slab-exclusion` | open |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | directed-rounded open |
| `I1.regular-critical-exhaustion` | blocked by theta3minus remainder |
| `representative-cross-binary-retention` | open |

The remaining regular-root proof is no longer a finite-node or named-sheet quotient problem. It is the complement-slab exclusion row needed if the regular-root lane must also prove that no additional regular sheets can enter between the named tubes and the reserved fold-pair cluster.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.mjs). It emits:

- directed-rounded sampled-node endpoint brackets for all regular roots;
- sign-definite $F_\delta$ intervals on each regular source sheet;
- direct regular-root interval enclosures for $R_G^{\mathrm{reg}}/y$ and $R_D^{\mathrm{reg}}/y^3$;
- a predecessor/direct drift row for the derivative quotient;
- explicit open continuous-collar, fold-pair, `I1`, quadrature, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-sampled-node-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, root brackets, $F_\delta$ signs, quotient budgets, overclaim rejection, and CLI write/validate behavior.

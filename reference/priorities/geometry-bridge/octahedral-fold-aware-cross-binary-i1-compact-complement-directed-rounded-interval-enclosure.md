# Octahedral Fold-Aware Cross-Binary I1 Compact Complement Directed-Rounded Interval Enclosure

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan](octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.md). The predecessor sampled the two `I1` complements using a tight compact/collar split at $y_c=0.003$. The directed-rounded interval backend cannot yet certify the ordinary-$\theta$ source-root complement slabs that close to the fold. This packet therefore introduces the interval-safe split

$$
\theta=\theta_{3-}-y_c^2,
\qquad
y_c=0.115,
$$

so the certified right ordinary-$\theta$ core is

$$
[b_1,\theta_{3-}-0.115^2]
=
[0.145456970556,\;0.984145655243].
$$

This is a narrower claim than the sampled complement scan, but it is stronger on its certified domain: the forcing signs are enclosed by directed-rounded source-root interval arithmetic rather than by samples.

## Directed-Rounded Compact Rows

The packet uses only the certified positive speed-ratio enclosure

$$
3.02156\le\nu\le3.02157,
$$

with no speed band, speed window, speed minimum, or speed maximum. Each tile constructs source-root tubes from sampled root sheets, proves endpoint sign changes, proves fixed-sign $F_\delta$ intervals, excludes extra roots on the complement slabs, contracts the root sheets by monotonicity, and evaluates the zero-order source contribution interval for $f_\times$.

The certified rows are:

| Row | Interval | Expected sign | Certified tiles | Minimum forcing clearance |
| --- | ---: | ---: | ---: | ---: |
| `I1.left-complement.forcing-positive` | $[0,\;0.124678831905]$ | $+$ | $17$ | $0.0000935423817471$ |
| `I1.right-compact-complement.forcing-negative` | $[0.145456970556,\;0.984145655243]$ | $-$ | $49$ | $0.0001291384785$ |

Across the two compact rows, the interval backend emits $66$ certified tiles and no open compact tile. The weakest supporting source-root margins are:

$$
\min |F|_{\mathrm{endpoint}}
\approx
0.00525702757146,
$$

$$
\min |F_\delta|
\approx
0.0116607001463,
$$

and

$$
\min |F|_{\mathrm{complement\ slab}}
\approx
0.000071647454237.
$$

The bottleneck is no longer the bracket endpoint sign. It is the source-root complement-slab exclusion near the right ordinary-$\theta$ core endpoint, where the source atlas approaches the $\theta_{3-}$ fold.

## Fold-Collar Obstruction

The first attempted square-coordinate continuation exposed a sharper obstruction. A fixed collar written as

$$
\theta=\theta_{3-}-y^2
$$

is not uniformly tied to the left folded side across the certified speed enclosure. The sampled speed-endpoint fold locations are

$$
\theta_{3-}(3.02156)\approx0.997377676237,
\qquad
\theta_{3-}(3.02157)\approx0.997362865339.
$$

With the fixed reference $\theta_{3-}=0.997370655243$, the speed-fold crossing threshold is

$$
y_{\mathrm{cross}}
\approx
\sqrt{0.997370655243-0.997362865339}
\approx
0.00279103994955.
$$

Thus a fixed-fold finite probe can only be treated as staying on the left folded side after a guard such as $y\ge0.003$. The executable artifact records that guard and attempts the finite slab

$$
y\in[0.003,0.115],
$$

but the generic source-root complement-slab certificate remains open there. This is not a failed sign sample: the sampled $G$ and $D$ signs remain negative on the probe tiles. The failure is more structural. The ordinary source-root tube/complement backend is not the right proof mechanism close to a coalescing fold root. The successor must use a speed-dependent fold chart

$$
\theta=\theta_{3-}(\nu)-y^2
$$

and a normal-form remainder bound for $G$ and $D$.

## Claim Boundary

Closed here:

- directed-rounded positivity of $f_\times$ on $[0,a_1]$;
- directed-rounded negativity of $f_\times$ on $[b_1,\theta_{3-}-0.115^2]$;
- directed-rounded source-root isolation, fixed-sign $F_\delta$, and complement-slab exclusion on every certified compact tile;
- explicit localization of the remaining gap to a speed-dependent square-coordinate fold normal form.

Still open:

- directed-rounded normal-form remainder bounds for $\theta=\theta_{3-}(\nu)-y^2$ through the $\theta_{3-}^{-}$ collar;
- sampled/stencil predecessors for those bounds are now split into the fold-pair scaled chart, its directed-rounded sampled-node interval replay, its root-tube cell cover, the regular-root sampled-node interval replay, and the regular-root named-sheet quotient cell cover;
- finite fixed-fold interval slab certification on $y\in[0.003,0.115]$ by the generic source-root backend, which is currently open and not claimed;
- full `I1.right-complement.forcing-negative` through $\theta_{3-}$;
- full `I1` complement sign interval enclosures;
- `I1` regular critical-exhaustion composition;
- interval quadrature for $C_\times$, $m_Q$, and $M_Q$;
- retained branch status.

The packet may claim

$$
\texttt{certifies\_I1\_compact\_complement\_directed\_rounded\_interval\_enclosures=true}.
$$

It does not claim

$$
\texttt{certifies\_theta\_3minus\_left\_fold\_collar\_interval\_radius=false},
$$

$$
\texttt{certifies\_I1\_complement\_sign\_interval\_enclosures=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.mjs). It emits:

- finite directed-rounded tile covers for the two interval-safe compact rows;
- source-root endpoint, $F_\delta$, and complement-slab interval margins;
- contracted source-root sheet forcing intervals;
- a fold-collar residual row for $\theta_{3-}^{-}$;
- the fixed-fold speed-side guard with $y_{\mathrm{cross}}\approx0.00279103994955$;
- an explicitly open finite fixed-fold collar probe on $y\in[0.003,0.115]$;
- explicit non-retention and non-overclaim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.test.js) validates the compact interval signs, no-fixed-speed-window discipline, fold-collar residual, speed-fold crossing obstruction, CLI write/validate path, and overclaim rejection.

## Result

The result status is

$$
\texttt{source-atlas-aware-i1-compact-complement-directed-rounded-interval-enclosures-certified}.
$$

The next theorem-grade successor row is

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

The sampled speed-dependent successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md) now proves the moving-fold diagnostic signs on the sampled grid. The directed-rounded fold-limit successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.md) also proves the moving fold endpoint bracket and the negative limit $L(\nu)\le-0.192653693867$. The sampled budget successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md) shows that the remaining sampled $R_G,R_D$ burden uses only about $5.6\%$ of that certified margin and that the bottleneck is regular-root $R_G$ at $y=0.115$, not the coalescing fold pair. The fold-pair scaled-stencil successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-stencil-certificate.md) supplies bounded sampled $z_\pm$ and $J_\pm=F_\delta/y$ rows for the coalescing pair, the sampled-node interval successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-sampled-node-interval-certificate.md) upgrades those rows to directed-rounded $z_\pm$ brackets and pair $G,D$ quotient intervals at the same nodes, and the root-tube cell-cover successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md) extends the Taylor-cancelled fold-pair root-tube and $J_\varepsilon$ sign certificate to a finite speed/y cell cover. The regular-root cell-cover successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) extends the four named regular-sheet quotient rows to a directed-rounded speed/y cell cover. The theorem-grade successor should now close the fold-pair $G,D$ quotient-remainder bound over the certified root tubes and regular-root complement-slab exclusion for

$$
G(y)=2y f_\times(\theta_{3-}(\nu)-y^2),
\qquad
D(y)=G(y)-y\partial_yG(y),
$$

or equivalently the transported derivative numerator, on the whole collar. Once that collar row closes, the compact interval rows can compose with the `I1.f1` unique zero to close `I1` regular critical exhaustion.

The theorem target is staged in [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md).

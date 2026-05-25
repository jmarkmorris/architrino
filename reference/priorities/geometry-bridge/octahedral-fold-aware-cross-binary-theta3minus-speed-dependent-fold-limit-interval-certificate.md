# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Limit Interval Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-normal-form.md). The predecessor moved the $\theta_{3-}^{-}$ collar into the speed-dependent chart

$$
\theta=\theta_{3-}(\nu)-y^2
$$

and sampled negative $G,D$ signs there. This packet upgrades the first normal-form component from sampled to directed-rounded interval grade: it brackets the moving fold endpoint and proves that the square-limit constant $L(\nu)$ is strictly negative over the whole certified speed enclosure.

## Fold Endpoint Bracket

For the $\kappa=+1$ folded source row, write

$$
C(\nu,\delta)=\frac{2\delta}{\nu^2}+\cos\delta,
\qquad
S(\nu,\delta)=2-\frac{\delta^2}{\nu^2}-\sin\delta.
$$

The fold endpoint equation is

$$
E(\nu,\delta)=C(\nu,\delta)^2+S(\nu,\delta)^2-1=0.
$$

On the certified positive speed-ratio enclosure

$$
3.02156\le\nu\le3.02157,
$$

the directed-rounded bracket

$$
3.29632\le\delta_f(\nu)\le3.29639
$$

has certified endpoint signs

$$
E(\nu,3.29632)\in[-1.94527720452\times10^{-5},-1.72277338462\times10^{-6}],
$$

$$
E(\nu,3.29639)\in[2.54291494173\times10^{-6},2.02736562183\times10^{-5}],
$$

and the monotone derivative enclosure

$$
E_\delta(\nu,\delta)\in[0.31413536885,0.314323439649].
$$

Therefore the row has exactly one fold endpoint $\delta_f(\nu)$ inside this interval for every $\nu$ in the certified speed enclosure. No speed band, speed window, speed minimum, or speed maximum is imposed.

## Fold-Limit Interval

Using

$$
F_\theta=2C,
\qquad
F_{\delta\delta}=\frac{2}{\nu^2}-S-\sin\delta_f,
$$

$$
B_f=-\frac12(C+\cos\delta_f),
\qquad
\alpha=-\frac{2F_\theta}{F_{\delta\delta}},
$$

the fold-square limit is

$$
L(\nu)=
\frac{8\sigma B_f}
{\nu\delta_f^2|F_{\delta\delta}|\sqrt{|\alpha|}},
\qquad
\sigma=-1.
$$

The directed-rounded interval rows are:

| Quantity | Directed-rounded interval | Certified sign |
| --- | ---: | ---: |
| $\theta_{3-}(\nu)$ | $[0.997337212768,0.997404074048]$ | positive |
| $F_\theta$ | $[-0.531918158527,-0.531856350228]$ | $-$ |
| $F_{\delta\delta}$ | $[-0.590881077313,-0.59068287551]$ | $-$ |
| $B_f$ | $[0.626985485641,0.627006332801]$ | $+$ |
| $\alpha$ | $[-1.80102786311,-1.80021452928]$ | $-$ |
| $\beta=\sqrt{|\alpha|}$ | $[1.34172073446,1.34202379379]$ | positive |
| $L(\nu)$ | $[-0.192777102773,-0.192653693867]$ | $-$ |

This closes the sign of the limiting normal-form constant at interval grade:

$$
\boxed{
L_+=\sup_\nu L(\nu)\le -0.192653693867<0.
}
$$

## Remaining Remainder Target

The theorem-grade collar proof is now reduced to the remainder bounds

$$
G(y,\nu)=L(\nu)+R_G(y,\nu),
\qquad
D(y,\nu)=L(\nu)+R_D(y,\nu),
$$

with

$$
|R_G(y,\nu)|<0.192653693867,
\qquad
|R_D(y,\nu)|<0.192653693867
$$

on the moving collar. The remaining proof must split the remainders into:

- a scaled fold-pair normal-form remainder for the two coalescing `3-` source roots;
- regular-root remainder rows for all nonfolded source sheets;
- a scaled derivative numerator row for $D=G-y\partial_yG=4y^3f'_\theta$.

The important improvement is that the negative margin no longer comes from a sampled endpoint replay. The certificate supplies the interval target that the $R_G,R_D$ proof must beat.

The sampled successor [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-remainder-budget-scan.md) now measures that target. On its $95$-row speed/collar grid, the worst total residual is

$$
\max |R_G^{\mathrm{tot}}|\approx0.010702388525,
$$

which uses about $5.6\%$ of the certified margin, while

$$
\max |R_D^{\mathrm{tot}}|\approx0.00016917145.
$$

It also identifies the sampled bottleneck as the regular-root part of $R_G$ at $y=0.115$, not the coalescing fold pair. The successor scaling split gives fold-pair $O(y^2)$ rows and regular-root $O(y)$/$O(y^3)$ rows, so the directed-rounded proof can be separated into a scaled fold-pair normal form and an ordinary regular-root continuation estimate. The fold-pair scaled-stencil successor supplies the sampled $p,z,J$ chart rows, the sampled-node interval successor certifies directed-rounded $z_\pm$ brackets, $J_\pm$ signs, and pair $G,D$ quotient intervals at those nodes, the root-tube cell-cover successor certifies the Taylor-cancelled $K_\varepsilon$ endpoint signs and $J_\varepsilon$ signs on a finite speed/y cell cover, the h-graph quotient successor certifies the positive-y $G,D$ quotients on $1008$ cells without raw zero-cell $y^{-2}$ division, and the first-y coefficient chain now directed-rounded certifies the quotient coefficients through $Q_{G,6}$ and $Q_{D,6}$, with remaining septic-tail budget above $1420531798760000000$. The remaining fold-pair proof is now the directed-rounded first-y-cell $G,D$ septic-tail bound over the certified $h$ root graph. The regular-root sampled-node successor brackets all $768$ finite-node regular roots, the regular-root cell-cover successor extends the four named regular-sheet quotient rows to a directed-rounded speed/y cell cover with $\max |R_G^{\mathrm{reg}}|/y\le0.0880368563612$ and $\max |R_D^{\mathrm{reg}}|/y^3\le0.602156573611$, and the hybrid complement-slab successor closes the regular-root complement.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_theta3minus\_fold\_endpoint\_bracket=true},
$$

and

$$
\texttt{certifies\_directed\_rounded\_speed\_dependent\_fold\_limit\_L\_negative=true}.
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
\texttt{directed-rounded-theta3minus-fold-limit-interval-certified}.
}
$$

The sampled remainder-budget successor status is

$$
\texttt{sampled-theta3minus-remainder-budget-feasibility-certified}.
$$

The sampled fold-pair scaled-stencil successor status is

$$
\texttt{sampled-theta3minus-fold-pair-scaled-stencil-certified}.
$$

The directed-rounded sampled-node fold-pair successor status is

$$
\texttt{directed-rounded-sampled-node-theta3minus-fold-pair-scaled-interval-certified}.
$$

The directed-rounded fold-pair root-tube cell-cover successor status is

$$
\texttt{directed-rounded-theta3minus-fold-pair-scaled-root-tube-cell-cover-certified}.
$$

The sampled regular-root stencil successor status is

$$
\texttt{sampled-theta3minus-regular-root-stencil-certified}.
$$

The directed-rounded sampled-node regular-root successor status is

$$
\texttt{directed-rounded-sampled-node-theta3minus-regular-root-interval-certified}.
$$

The directed-rounded regular-root cell-cover successor status is

$$
\texttt{directed-rounded-theta3minus-regular-root-cell-cover-certified}.
$$

The successor row remains

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.mjs). It emits:

- directed-rounded signs for the fold endpoint bracket;
- directed-rounded positivity of $E_\delta$ over the fold bracket;
- directed-rounded intervals for $\theta_{3-}(\nu)$, $F_\theta$, $F_{\delta\delta}$, $B_f$, $\alpha$, $\beta$, and $L(\nu)$;
- explicit non-remainder, non-collar-closure, non-critical-exhaustion, and non-retention boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-limit-interval-certificate.test.js) validates the fold bracket, constant signs, negative $L$ interval, no-fixed-speed-window discipline, open remainder boundary, overclaim rejection, and CLI write/validate behavior.

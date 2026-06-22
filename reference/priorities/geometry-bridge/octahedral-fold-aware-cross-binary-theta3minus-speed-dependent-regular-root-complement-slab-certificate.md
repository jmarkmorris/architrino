# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Regular-Root Complement-Slab Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-cell-certificate.md) and [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.md). The predecessor regular-root packet proves the four named regular sheets and their quotient rows. This packet proves the regular-root complement exclusion with a hybrid chart: ordinary source-equation slabs outside the folded-source neighborhood, and a Taylor-cancelled fold-$p$ chart inside the folded-source neighborhood.

It is a regular-root-side closure result. It is not full $\theta_{3-}^{-}$ collar closure because the fold-pair $G,D$ quotient row is still open.

## Complement-Slab Predicate

For each speed/y cell in the moving collar

$$
\theta=\theta_{3-}(\nu)-y^2,
$$

the source equation is

$$
F(\tilde\theta,\delta;\nu,\kappa)
=
\frac{\delta^2}{\nu^2}-2+\sin(2\tilde\theta-\delta)+\kappa\sin\delta.
$$

The three nonfold source terms use ordinary $\delta$-slabs outside their certified regular-root tubes. The folded source term $-s_{+,+}(u+Q)$ splits into:

- ordinary $F$ slabs outside the bounded fold neighborhood

$$
\delta=\delta_f+yp,
\qquad
|p|\le 8;
$$

- fold-$p$ slabs inside $|p|\le 8$ outside the two protected fold-pair collars

$$
p_\varepsilon
=
\varepsilon\beta+yZ_\varepsilon,
\qquad
Z_-=[-3.0,-2.6],
\qquad
Z_+=[-3.05,-2.85],
$$

with a $0.001$ fold-$p$ collar padding.

Inside the fold-$p$ chart, the executable predicate is the Taylor-cancelled scaled equation

$$
\frac{F}{y^2}
=
A(p^2-\beta^2)-2\sin\phi_f\,yp-2\sin\phi_f\,y^2
+y^2\left[
\sin\phi_f\,q^4C_4(yq)+\sin\delta_f\,p^4C_4(yp)
\right]
+y\left[
-\cos\phi_f\,q^3S_3(yq)+\cos\delta_f\,p^3S_3(yp)
\right],
$$

where $q=p+2y$, $A=\tfrac12F_{\delta\delta}(\delta_f)$, $S_3(t)=(\sin t-t)/t^3$, and $C_4(t)=(\cos t-1+t^2/2)/t^4$. The leading fold-normal term $A(p^2-\beta^2)$ uses the certified fold relation $A\beta^2=2\cos\phi_f$ and removes the loose raw-source dependency at the fold.

## Cell Cover Result

The certificate covers the same $16\times64$ speed/y cover as the regular-root cell packet.

| Row | Certified value |
| --- | ---: |
| speed cells | $16$ |
| y cells | $64$ |
| speed/y cells | $1024$ |
| source-term cells | $4096$ |
| raw protected intervals | $5120$ |
| protected fold-$p$ intervals | $2048$ |
| complement slabs | $12288$ |
| attempted raw source-equation slabs | $9216$ |
| scaled fold-$p$ slabs | $3072$ |
| deferred fold-neighborhood slabs | $0$ |
| $\delta$ subcells used in raw slabs | $11902037$ |
| fold-$p$ subcells used in scaled slabs | $1634912$ |
| attempted raw slabs certified | `true` |
| scaled fold-$p$ slabs certified | `true` |
| all complement slabs certified | `true` |
| minimum raw-slab $F$ clearance | $0.0000273284209642$ |
| minimum scaled fold-$p$ $F/y^2$ clearance | $0.000252834825122$ |
| maximum $\delta$ subcell width | $0.00199999991037$ |
| maximum fold-$p$ subcell width | $0.00999991235675$ |
| maximum Taylor argument | $0.94645$ |

The resulting status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-regular-root-complement-slab-exclusion-certified}.
}
$$

The theorem-level meaning is precise: the regular-root side of the $\theta_{3-}^{-}$ collar has no additional roots outside the certified regular-root tubes and the protected fold-pair collars. The remaining collar burden is no longer the regular-root complement. It is the fold-pair $G,D$ quotient on the certified $h$-root graph.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_regular\_root\_nonfold\_and\_outer\_complement\_slab\_exclusion=true},
$$

$$
\texttt{certifies\_directed\_rounded\_regular\_root\_fold\_neighborhood\_scaled\_p\_exclusion=true},
\qquad
\texttt{certifies\_directed\_rounded\_regular\_root\_complement\_slab\_exclusion=true},
$$

$$
\texttt{certifies\_directed\_rounded\_regular\_root\_remainder=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
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

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.regular-root-sheet-quotient-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-scaled-root-tube-cell-cover` | directed-rounded cell-cover certified |
| `theta3minus.regular-root-complement-slab-exclusion` | directed-rounded hybrid raw-$F$/fold-$p$ certified |
| `theta3minus.regular-root-remainder-continuous-collar` | regular-root side closed |
| `theta3minus.fold-pair-GD-quotient-root-graph` | open |
| `theta3minus.left-fold-collar-full-remainder` | blocked by fold-pair quotient row |
| `I1.regular-critical-exhaustion` | blocked by theta3minus fold-pair quotient row |
| `representative-cross-binary-retention` | open |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.mjs). It emits:

- ordinary source-equation complement slabs for the three nonfold source terms;
- ordinary source-equation complement slabs for the folded source outside $|p|\le 8$;
- Taylor-cancelled fold-$p$ complement slabs inside $|p|\le 8$ outside the protected fold-pair collars;
- explicit regular-root complement closure and explicit open fold-pair quotient, full collar, `I1`, quadrature, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-regular-root-complement-slab-certificate.test.js) validates schema, no-fixed-speed-window discipline, hybrid slab counts, raw and scaled sign margins, overclaim rejection, and CLI write/validate behavior.

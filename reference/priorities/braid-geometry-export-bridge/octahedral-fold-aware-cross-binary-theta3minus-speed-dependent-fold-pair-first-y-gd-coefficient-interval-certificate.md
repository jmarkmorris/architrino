# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Coefficient Interval Certificate

Promotion status: `diagnostic-only; receiver-normal restart required`.

Receiver-normal quarantine. This packet is historical diagnostic material for root geometry or dependency provenance only. It is not force/action evidence and cannot support branch promotion until same-record $D_s$, $D_t$, and $W^{\mathrm{rec}}$ rows are regenerated and accepted.

This packet continues [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-jet-witness.md). The predecessor proves the sampled analytic cancellation mechanism in the first y cell. This packet upgrades the constant coefficient of that zero-cell quotient from sampled endpoint evidence to a directed-rounded speed-cell interval enclosure. The successors through [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) now certify the linear through quintic coefficients.

It is not a full first-y-cell remainder enclosure and it is not full $\theta_{3-}^{-}$ collar closure. It closes the coefficient row only:

$$
Q_G^{\mathrm{pair}}(0,\nu),
\qquad
Q_D^{\mathrm{pair}}(0,\nu).
$$

The remaining fold-pair blocker is now the directed-rounded septic-tail/enclosure for the first y cell after the constant-through-sextic coefficient rows.

## Intervalized Coefficient

For branch sign $\varepsilon\in\{-1,+1\}$, keep the first-y series coordinates

$$
\delta_\varepsilon
=
d+\varepsilon\beta y+\gamma y^2+h_{0,\varepsilon}y^3+O(y^4),
$$

and

$$
\phi_\varepsilon
=
\phi_f-\varepsilon\beta y-(\gamma+2)y^2-h_{0,\varepsilon}y^3+O(y^4).
$$

The certificate intervalizes the ordinary first-y series algebra over each speed cell. It solves an interval $h_{0,\varepsilon}$ row by forcing the $y^4$ source-equation coefficient to contain zero:

$$
0\in
[y^4]\,
F(\tilde\theta_f-y^2,\delta_\varepsilon;\nu,+1).
$$

Each resulting $h_{0,\varepsilon}$ interval remains inside the predecessor tubes

$$
h_{0,-}\in[0.8,4.0],
\qquad
h_{0,+}\in[-2.2,0.2].
$$

The branch contribution uses the zero-safe denominator

$$
G_\varepsilon
=
\frac{4\sigma_*B_\varepsilon}
{\nu\delta_\varepsilon^2(-\varepsilon J_\varepsilon)},
\qquad
J_\varepsilon=\frac{F_\delta}{y},
\qquad
\sigma_*=-1.
$$

The pair coefficient is then read from

$$
P(y,\nu)=G_-(y,\nu)+G_+(y,\nu).
$$

Since the preceding sampled witness supplies the identity

$$
D_{\mathrm{pair}}=P-yP',
$$

the coefficient relation is exact:

$$
[y^2]D_{\mathrm{pair}}
=
-[y^2]P.
$$

Thus the certificate encloses the constant quotient coefficients

$$
Q_G^{\mathrm{pair}}(0,\nu)=[y^2]P,
\qquad
Q_D^{\mathrm{pair}}(0,\nu)=-[y^2]P.
$$

## Certified Result

Across the $16$ speed cells and $32$ branch rows:

| Row | Directed-rounded interval result |
| --- | ---: |
| speed cells | $16$ |
| branch cells | $32$ |
| all $h_0$ intervals inside predecessor tubes | `true` |
| all source-equation coefficients through $y^4$ contain zero | `true` |
| all constant and first-order cancellation intervals contain zero | `true` |
| maximum $|P(0)-L|$ interval width witness | $2.07230992719\times10^{-6}$ |
| maximum $|P'(0)|$ interval width witness | $7.35060959248\times10^{-6}$ |
| maximum $|D(0)-L|$ interval width witness | $2.07230992721\times10^{-6}$ |
| maximum $|D'(0)|$ interval width witness | $5\times10^{-324}$ |
| $Q_G(0)$ coefficient hull | $[0.0858514065706,0.0860595284316]$ |
| $Q_D(0)$ coefficient hull | $[-0.0860595284316,-0.0858514065706]$ |
| minimum $Q_G(0)>0$ clearance | $0.0858514065706$ |
| minimum $Q_D(0)<0$ clearance | $0.0858514065706$ |
| exact $Q_D(0)+Q_G(0)$ coefficient residual | $0$ |

The status is

$$
\boxed{
\texttt{directed-rounded-theta3minus-fold-pair-first-y-GD-constant-coefficient-interval-certified}.
}
$$

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_constant\_coefficient\_enclosure=true}.
$$

It may also import the predecessor sampled claim:

$$
\texttt{certifies\_sampled\_first\_y\_GD\_jet\_cancellation=true}.
$$

It does not claim:

$$
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_remainder=false},
\qquad
\texttt{certifies\_directed\_rounded\_first\_y\_GD\_jet\_enclosure=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_G\_quotient\_full\_cell\_cover=false},
\qquad
\texttt{certifies\_directed\_rounded\_fold\_pair\_D\_quotient\_cell\_cover=false},
$$

$$
\texttt{certifies\_directed\_rounded\_fold\_pair\_scaled\_remainder=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Closure Burndown

| Row | Status |
| --- | --- |
| `theta3minus.fold-pair-h-graph-positive-y-GD-quotient` | directed-rounded cell-cover certified |
| `theta3minus.fold-pair-first-y-GD-jet-cancellation` | sampled analytic jet certified |
| `theta3minus.fold-pair-first-y-GD-constant-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-linear-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-linear-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quadratic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quadratic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-cubic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-cubic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quartic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quartic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-quintic-jet-coefficient` | directed-rounded interval certified by [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate](octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-quintic-jet-coefficient-interval-certificate.md) |
| `theta3minus.fold-pair-first-y-GD-sextic-jet-coefficient` | directed-rounded interval certified |
| `theta3minus.fold-pair-first-y-GD-septic-tail-bound` | directed-rounded open |
| `theta3minus.fold-pair-first-y-GD-directed-rounded-enclosure` | blocked by septic-tail bound |
| `theta3minus.fold-pair-scaled-remainder-continuous-collar` | blocked by directed-rounded first-y $G,D$ enclosure |

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.mjs). It emits:

- directed-rounded interval series rows over the $16$ speed cells;
- branch $h_{0,\varepsilon}$ interval rows with predecessor-tube membership;
- source-equation coefficient containment through $y^4$;
- $Q_G(0)$ and $Q_D(0)$ coefficient intervals;
- exact coefficient-level $Q_D(0)=-Q_G(0)$ identity;
- explicit open first-y remainder, full quotient, scaled-remainder, `I1`, and retention rows.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-coefficient-interval-certificate.test.js) validates schema, no-fixed-speed-window discipline, coefficient signs, $h_0$ tube membership, source-coefficient containment, overclaim rejection, and CLI write/validate behavior.
